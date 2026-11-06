/*
 * Liên thông Quyết định giải quyết bồi thường bị Sửa chữa, bổ sung -> Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường (prefix kpqd)
 * - Nguồn: hàng đợi 'btnn_kpqd_events_v1' do màn Quyết định giải quyết bồi thường ghi khi QĐ sửa chữa, bổ sung được ban hành
 *   (Lãnh đạo cấp cuối Ký duyệt hoặc Ký ngoài). Màn này áp từng sự kiện 01 lần khi tải trang (đánh dấu 'btnn_kpqd_applied_v1').
 * - Sửa chữa, bổ sung (chỉ khi thay đổi Số tiền / người yêu cầu / người nhận / phương thức chi trả):
 *   + Số tiền chi trả theo QĐ sau sửa chữa P = max(0, Tổng số tiền bồi thường − Số tiền đã tạm ứng); Số tiền đã tạm ứng = số đã chi tạm ứng thực tế, không đổi theo sửa chữa.
 *   + Đã cam kết: Hoàn thành = đã chi; Chờ chi trả đã chi một phần / Trả lại ngân sách nhà nước = Số tiền của bản ghi; Chờ thu hồi / Đã thu hồi = phần giữ lại.
 *   + Chênh lệch D = P − Đã cam kết:
 *     D > 0: giảm Số tiền phải thu hồi đang có (theo QĐ sửa chữa, bổ sung) trước; còn lại -> sửa bản ghi chưa chi (đưa về Chờ thông báo chi trả)
 *            hoặc tạo bản ghi chi thêm "Chờ thông báo chi trả" (QĐ chưa có bản ghi Chi trả: không tạo; bản ghi tạo khi QĐ Có hiệu lực theo số tiền mới).
 *     D = 0: bản ghi chưa chi -> Đã hủy.
 *     D < 0: bản ghi chưa chi -> Đã hủy; giảm Số tiền của bản ghi Chờ chi trả đã chi một phần (đủ thì Hoàn thành); trừ phần đã trả lại ngân sách nhà nước;
 *            còn lại -> Chờ thu hồi các khoản đã chi.
 *   + Tạm ứng (KH chốt 05/11/2026): không xét bản ghi Tạm ứng kinh phí (bỏ Bảng B: thu hồi tạm ứng thừa, Tạm dừng chi tạm ứng).
 *   + Số tiền phải chi trả còn lại bằng 0, không còn khoản chưa hoàn tất: hồ sơ GQBT Hoàn thành (kpqdScDone).
 *   + Chỉ thay đổi thông tin người nhận / phương thức: cập nhật bản ghi chưa chi, giữ trạng thái.
 * - Hủy QĐ: bản ghi kinh phí giữ trạng thái, bị chặn chi tiếp (quan_ly_kinh_phi_hlqd.js); QĐ mới sau Giải quyết lại: Bảng A, thu hồi tạm ứng vượt
 *   (khác Sửa chữa, bổ sung), Hoàn thành vụ việc (mục [gql] cuối tệp).
 * - Hiển thị: dòng phụ "Theo QĐ sửa chữa, bổ sung" dưới badge trạng thái (MH01, MH10, MH23); Khối Căn cứ thay đổi theo Quyết định tại MH10, MH23.
 */
var KPQD_EVT_KEY = 'btnn_kpqd_events_v1';
var KPQD_DONE_KEY = 'btnn_kpqd_applied_v1';
var KPQD_LBL = { sc: 'Theo QĐ sửa chữa, bổ sung', gql: 'Theo QĐ giải quyết lại' };
var KPQD_TYPE = { sc: 'Quyết định sửa chữa, bổ sung Quyết định giải quyết bồi thường', gql: 'Quyết định giải quyết bồi thường (giải quyết lại)' };
var KPQD_PAY = ['Chi trả tiền bồi thường', 'Cấp kinh phí bồi thường'];
var KPQD_UNPAID = ['Chờ thông báo chi trả', 'Đề nghị cấp bổ sung kinh phí', 'Chờ duyệt', 'Bị trả lại'];

function kpqdRead(k, fb) { try { var r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch (e) { return fb; } }
function kpqdWrite(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
function kpqdE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function kpqdN(v) { return typeof v === 'number' ? v : (Number(String(v == null ? '' : v).replace(/[^\d-]/g, '')) || 0); }
function kpqdFmt(n) { return (Number(n) || 0).toLocaleString('vi-VN'); }
function kpqdSt(p) { return typeof kpNormStatus === 'function' ? kpNormStatus(p.status) : p.status; }
function kpqdNow() { return typeof kptbNow === 'function' ? kptbNow() : new Date().toLocaleString('vi-VN'); }
function kpqdPaid(p) {
    var h = typeof kpPaidTotal === 'function' ? kpPaidTotal(p) : 0;
    return Math.max(h, kpqdN(p.payoutAmountReal), p.kptbPayment ? kpqdN(p.kptbPayment.amount) : 0);
}
function kpqdGot(p) {
    var r = p.recovery || {};
    if (Array.isArray(r.history)) return r.history.reduce(function (s, h) { return s + kpqdN(h && h.amount); }, 0);
    return kpqdN(r.amountRecovered);
}
// Số tiền phải thu hồi hiện tại của bản ghi theo QĐ sửa chữa, bổ sung
function kpqdNeed(p) { var r = p.recovery || {}; return r.amountAfter != null ? Math.max(0, kpqdPaid(p) - kpqdN(r.amountAfter)) : kpqdPaid(p); }
function kpqdIsPay(p) { return KPQD_PAY.indexOf(p.type) >= 0; }
function kpqdIsAdv(p) { return p.type === 'Cấp tạm ứng' || p.type === 'Đề nghị tạm ứng'; }
function kpqdRecovSc(p) { return !!(p.kpqd && p.kpqd.kind === 'sc' && p.recovery && p.recovery.amountAfter != null); }

// ---------- Ghi căn cứ, lịch sử ----------
function kpqdBasis(ev, p, before, after, extra) {
    var b = Object.assign({
        kind: ev.kind, label: KPQD_LBL[ev.kind], evId: ev.id, decisionType: KPQD_TYPE[ev.kind], decisionNo: ev.docNo || '', decisionDate: ev.docDate || '',
        file: ev.file || '', signMethod: ev.signMethod || '', baseDecNo: ev.decNo || '', baseDecDate: ev.decDate || '', content: ev.content || '',
        totalBefore: ev.before ? ev.before.total : null, totalAfter: ev.after ? ev.after.total : null,
        statusBefore: before, statusAfter: after, changedAt: kpqdNow(), claimCode: ev.claimCode, lan: ev.kind === 'sc' && ev.n ? ev.n : null
    }, extra || {});
    // [schl] Lịch sử thay đổi số tiền theo Quyết định: giữ mọi lần (Quyết định gốc + từng lần sửa chữa, bổ sung / Quyết định mới sau Giải quyết lại)
    if (!Array.isArray(p.kpqdLog)) {
        p.kpqdLog = p.kpqd ? [p.kpqd] : [];
        p.kpqdOrigin = { amount: b.amountBefore != null ? kpqdN(b.amountBefore) : kpqdN(p.amount), status: before || kpqdSt(p), decNo: ev.decNo || '', decDate: ev.decDate || '', total: (p.kptbDec && p.kptbDec.total != null && !(b.chiThem)) ? kpqdN(p.kptbDec.total) : (ev.before ? ev.before.total : null) };
    }
    p.kpqdLog.push(b);
    p.kpqd = b;
    return b;
}
// Khối Lịch sử thay đổi số tiền theo Quyết định (MH10, MH23): dòng Quyết định ban đầu + mỗi lần thay đổi theo Quyết định
function kpqdLogCard(item) {
    var log = Array.isArray(item.kpqdLog) && item.kpqdLog.length ? item.kpqdLog : (item.kpqd ? [item.kpqd] : []);
    if (!log.length) return '';
    var o = item.kpqdOrigin || {}, f0 = log[0] || {};
    var adv = typeof kpIsAdv === 'function' && kpIsAdv(item);
    var money = function (v) { return v == null || v === '' ? '-' : kpqdFmt(v); };
    var th = 'padding:6px 8px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;text-align:left;white-space:nowrap;';
    var td = 'padding:6px 8px;border:1px solid #e2e8f0;vertical-align:top;';
    var born = !!f0.chiThem; // bản ghi chi trả thêm: sinh ra từ lần sửa chữa, bổ sung / Quyết định mới, không có dòng Quyết định ban đầu
    var rows = born ? '' : '<tr><td style="' + td + '">Quyết định ban đầu</td><td style="' + td + '">Quyết định giải quyết bồi thường số ' + kpqdE(o.decNo || f0.baseDecNo || '-') + ((o.decDate || f0.baseDecDate) ? ' ngày ' + kpqdE(o.decDate || f0.baseDecDate) : '') + '</td>'
        + '<td style="' + td + 'text-align:right;">' + money(o.total != null ? o.total : f0.totalBefore) + '</td><td style="' + td + 'text-align:right;">' + money(o.amount != null ? o.amount : f0.amountBefore) + '</td>'
        + '<td style="' + td + '">' + kpqdE(o.status || f0.statusBefore || '-') + '</td><td style="' + td + '">-</td></tr>';
    log.forEach(function (b, i) {
        var ref = (b.kind === 'gql' ? 'Quyết định giải quyết bồi thường (giải quyết lại)' : 'QĐ sửa chữa, bổ sung') + (b.decisionNo ? ' số ' + b.decisionNo : '') + (b.decisionDate ? ' ngày ' + b.decisionDate : '');
        var amt;
        if (b.recoverChange) amt = '<span style="color:#b91c1c;">Số tiền phải thu hồi: ' + money(b.amountBefore) + ' → ' + money(b.amountAfter) + '</span>';
        else if (b.recoverNeed != null) amt = 'Đã chi ' + money(b.amountBefore) + '; giữ lại ' + money(b.amountAfter) + '<br><span style="color:#b91c1c;">Số tiền phải thu hồi: ' + money(b.recoverNeed) + '</span>';
        else if (b.chiThem) amt = money(b.amountAfter);
        else amt = b.amountAfter != null ? money(b.amountBefore) + ' → ' + money(b.amountAfter) : 'Không đổi';
        rows += '<tr><td style="' + td + '">Lần ' + (b.lan || (i + 1)) + '</td><td style="' + td + '">' + kpqdE(ref) + '</td>'
            + '<td style="' + td + 'text-align:right;">' + (b.totalBefore != null ? money(b.totalBefore) + ' → ' + money(b.totalAfter) : money(b.totalAfter)) + '</td>'
            + '<td style="' + td + 'text-align:right;">' + amt + '</td>'
            + '<td style="' + td + '">' + (b.chiThem ? kpqdE(b.statusAfter || '-') : kpqdE(b.statusBefore || '-') + ' → ' + kpqdE(b.statusAfter || '-')) + '</td><td style="' + td + 'white-space:nowrap;">' + kpqdE(b.changedAt || '') + '</td></tr>';
    });
    var body = '<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:12.5px;"><thead><tr>'
        + '<th style="' + th + '">Lần</th><th style="' + th + '">Quyết định làm căn cứ</th><th style="' + th + 'text-align:right;">Tổng số tiền bồi thường theo Quyết định (VNĐ)</th>'
        + '<th style="' + th + 'text-align:right;">' + (adv ? 'Số tiền của bản ghi (VNĐ)' : 'Số tiền chi trả của bản ghi (VNĐ)') + '</th><th style="' + th + '">Trạng thái</th><th style="' + th + '">Thời điểm</th>'
        + '</tr></thead><tbody>' + rows + '</tbody></table></div>';
    return typeof kpdtCard === 'function' ? kpdtCard('fa-clock-rotate-left', 'Lịch sử thay đổi số tiền theo Quyết định', body, 'kpqdLogCard') : body;
}
function kpqdHist(p, action, note) {
    if (!Array.isArray(p.kpdcHistory)) p.kpdcHistory = [];
    p.kpdcHistory.push({ at: kpqdNow(), userId: '', userName: 'Hệ thống', action: action, note: note });
}
// Bản ghi khác của Quyết định bị tác động (hủy, dừng chi) khi Quyết định giảm tiền: dòng Lịch sử xử lý ghi `Mã kinh phí thu hồi: ...` (link mở bản ghi Chờ thu hồi).
// Bản ghi tự chuyển Chờ thu hồi: thu hồi trên chính bản ghi, không ghi link.
function kpqdHistRecLink(p, recs) {
    var h = Array.isArray(p.kpdcHistory) ? p.kpdcHistory[p.kpdcHistory.length - 1] : null;
    recs = (recs || []).filter(function (r) { return r && r.code; });
    if (!h || !recs.length) return;
    h.note = String(h.note || '').replace(/\s*$/, '') + ' Mã kinh phí thu hồi: ' + recs.map(function (r) { return r.code; }).join(', ') + '.';
    h.links = (h.links || []).concat(recs.map(function (r) { return { id: r.id, code: r.code }; }));
}
// Liên kết bản ghi chi trả thêm với các bản ghi đã chốt chi của Quyết định (người dùng chốt 06/11/2026):
// - Bản ghi chi trả thêm: khối Căn cứ thay đổi trạng thái có bảng Bản ghi chi trả đã có (Mã kinh phí, Trạng thái, Số tiền đã chốt chi) và công thức
// - Bản ghi đã chốt chi: giữ trạng thái, số tiền; Lịch sử xử lý ghi thêm 01 dòng "Phát sinh bản ghi chi trả thêm"
function kpqdPriorRows(recs, cmt) {
    return recs.map(function (p) { return { id: p.id, code: p.code || '', status: kpqdSt(p), committed: Math.max(0, cmt(p)) }; });
}
function kpqdLinkPrior(rec, rows, why) {
    rows.forEach(function (r) {
        var p = (typeof proposalsList !== 'undefined' ? proposalsList : []).find(function (x) { return x && x.id === r.id; });
        if (!p) return;
        kpqdHist(p, 'Phát sinh bản ghi chi trả thêm', why + ': tạo bản ghi chi trả thêm ' + (rec.code || '') + ' (' + kpqdFmt(rec.amount) + ' đồng).');
        // Mã kinh phí của bản ghi chi trả thêm trong nội dung là link (kpdcHistInject)
        var h = p.kpdcHistory[p.kpdcHistory.length - 1]; h.linkId = rec.id; h.linkCode = rec.code || '';
    });
}
function kpqdRef(ev) { return KPQD_TYPE[ev.kind] + (ev.docNo ? ' số ' + ev.docNo : '') + (ev.docDate ? ' ngày ' + ev.docDate : '') + ' (Quyết định giải quyết bồi thường số ' + (ev.decNo || '-') + ', Mã hồ sơ GQBT ' + ev.claimCode + ')'; }
function kpqdCancelApprovals(p, reason) {
    var out = [];
    [['kptbApproval', 'Thông báo chi trả'], ['qdtuApproval', 'QĐ tạm ứng kinh phí']].forEach(function (x) {
        var ap = p[x[0]];
        if (ap && ap.pending) { ap.pending = null; ap.cancelled = { at: kpqdNow(), reason: reason }; out.push(x[1]); }
    });
    return out;
}
// Thu hồi Thông báo chi trả đã ký / phiếu trình đang chờ duyệt khi đưa bản ghi về Chờ thông báo chi trả
function kpqdResetNotice(p) {
    kpqdCancelApprovals(p, KPQD_LBL.sc);
    if (p.kptbNotice) { p.kptbNoticeRevoked = (p.kptbNoticeRevoked || []).concat([p.kptbNotice]); p.kptbNotice = null; }
    if (p.kptbApproval && !p.kptbApproval.pending) { p.kptbApprovalRevoked = p.kptbApproval; p.kptbApproval = null; }
}
function kpqdToRecover(ev, p, addNeed) {
    var st = kpqdSt(p), paid = kpqdPaid(p);
    var curNeed = st === 'Chờ thu hồi' && kpqdRecovSc(p) ? kpqdNeed(p) : 0;
    var need = Math.min(paid, curNeed + addNeed);
    var before = st === 'Chờ thu hồi' && p.kpqd && p.kpqd.statusBeforeRecover ? p.kpqd.statusBeforeRecover : st;
    p.status = 'Chờ thu hồi';
    p.recovery = Object.assign(p.recovery || {}, { basisDecisionNo: ev.docNo || '', basisDecisionDate: ev.docDate || '', amountAfter: paid - need });
    p.statusChangeBasis = { decisionType: KPQD_TYPE.sc, decisionNo: ev.docNo || '', decisionDate: ev.docDate || '', reason: ev.content || '', statusBefore: st, statusAfter: 'Chờ thu hồi', changedAt: kpqdNow(), amountAfter: paid - need };
    kpqdBasis(ev, p, st, 'Chờ thu hồi', { amountBefore: paid, amountAfter: paid - need, statusBeforeRecover: before, recoverNeed: need });
    kpqdHist(p, 'Chuyển Chờ thu hồi theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Trạng thái trước: ' + st + '. Số tiền đã chi: ' + kpqdFmt(paid) + ' đồng. Số tiền phải thu hồi: ' + kpqdFmt(need) + ' đồng.');
}

// ---------- Sửa chữa, bổ sung ----------
function kpqdInfoPatch(ev, p) {
    var a = ev.after || {};
    if (p.kptbDec) {
        p.kptbDec.nycName = a.nycName; p.kptbDec.nycAddress = a.nycAddress;
        p.kptbDec.recipient = JSON.parse(JSON.stringify(a.recipient || {}));
        p.kptbDec.payout = JSON.parse(JSON.stringify(a.payout || {}));
        p.kptbDec.total = a.total; p.kptbDec.advance = a.advance;
    }
    p.nycName = a.nycName || p.nycName;
}
function kpqdApplySc(list, ev) {
    var changed = [];
    var mark = function (p) { if (changed.indexOf(p) < 0) changed.push(p); };
    // [schl] advOnly: Quyết định chưa có bản ghi Chi trả tiền bồi thường khi Quyết định sửa chữa, bổ sung Có hiệu lực (bản ghi Chi trả vừa tạo theo số tiền mới)
    var pays = ev.advOnly ? [] : list.filter(function (p) { return p && kpqdIsPay(p) && (p.decId === ev.decId || (!p.decId && p.ycbtCode === ev.claimCode)) && kpqdSt(p) !== 'Đã hủy'; });
    var advs = list.filter(function (p) { return p && kpqdIsAdv(p) && p.ycbtCode === ev.claimCode; });
    var B = kpqdN(ev.after.total), adv = kpqdN(ev.after.advance);
    var unpaid = function (p) { var st = kpqdSt(p); return KPQD_UNPAID.indexOf(st) >= 0 || (st === 'Chờ chi trả' && kpqdPaid(p) === 0); };
    var U = pays.filter(unpaid), F = pays.filter(function (p) { return !unpaid(p); });
    // Chỉ đổi thông tin người nhận / phương thức chi trả: cập nhật bản ghi chưa chi, giữ trạng thái
    if (!ev.moneyChanged) {
        U.forEach(function (p) {
            kpqdInfoPatch(ev, p);
            kpqdBasis(ev, p, kpqdSt(p), kpqdSt(p));
            kpqdHist(p, 'Cập nhật theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Cập nhật thông tin người yêu cầu, người nhận tiền, phương thức chi trả; giữ trạng thái ' + kpqdSt(p) + '.');
            mark(p);
        });
    } else {
        // [KH chốt 05/11/2026] Sửa chữa, bổ sung không xét Tạm ứng kinh phí (bỏ Bảng B): bản ghi Tạm ứng giữ nguyên, chỉ so lệch với Chi trả tiền bồi thường.
        // Số tiền đã tạm ứng = tổng số đã chi tạm ứng thực tế của vụ việc (không đổi theo sửa chữa); vụ việc chưa có bản ghi Tạm ứng: theo số ghi trên Quyết định
        var advLive = advs.filter(function (p) { return kpqdSt(p) !== 'Đã hủy'; });
        var advPaidTotal = advLive.reduce(function (s, p) { return s + kpqdAdvPaid(p); }, 0);
        var P = Math.max(0, B - (advLive.length ? advPaidTotal : adv));
        // [schl] Quyết định chưa có bản ghi Chi trả trước khi sửa chữa (advOnly): bản ghi Chi trả vừa tạo khi Có hiệu lực
        // -> điều chỉnh Số tiền chi trả theo Số tiền phải chi trả; bằng 0 -> Đã hủy
        if (ev.advOnly) {
            list.filter(function (p) { return p && kpqdIsPay(p) && (p.decId === ev.decId || (!p.decId && p.ycbtCode === ev.claimCode)) && kpqdSt(p) !== 'Đã hủy' && unpaid(p); }).forEach(function (p) {
                var old = kpqdN(p.amount);
                if (P <= 0) { kpqdCancelUnpaid(ev, p, mark); return; }
                if (old === P) return;
                p.amount = P; if (p.kptbDec) p.kptbDec.net = P;
                kpqdBasis(ev, p, kpqdSt(p), kpqdSt(p), { amountBefore: old, amountAfter: P });
                kpqdHist(p, 'Cập nhật theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền chi trả từ ' + kpqdFmt(old) + ' thành ' + kpqdFmt(P) + ' đồng.');
                mark(p);
            });
        }
        // [người dùng chốt 06/11/2026] So Số tiền phải chi trả với Số tiền thực tế đã trả cho người được bồi thường (không theo Số tiền của bản ghi / Thông báo đã ký)
        var committed = function (p) {
            var st = kpqdSt(p), paid = kpqdPaid(p);
            if (st === 'Chờ thu hồi' || st === 'Đã thu hồi') return kpqdRecovSc(p) ? paid - kpqdNeed(p) : 0;
            if (st === 'Hoàn thành') return paid || kpqdN(p.amount);
            return paid; // Chờ chi trả đã chi một phần, Trả lại ngân sách nhà nước: số tiền đã thực trả
        };
        var G = F.filter(function (p) { return kpqdSt(p) === 'Chờ chi trả'; }); // bản ghi đang chi trả dở
        var D = P - F.reduce(function (s, p) { return s + committed(p); }, 0);
        if (D > 0) {
            F.forEach(function (p) { if (D > 0 && kpqdSt(p) === 'Chờ thu hồi' && kpqdRecovSc(p)) D = kpqdReduceRecover(ev, p, D, mark); });
        }
        // [người dùng chốt 06/11/2026] Không sửa thẳng số tiền của bản ghi đã có. Tổng đã cam kết = Số tiền thực trả
        // + phần còn phải chi của bản ghi đang chi dở + Số tiền của bản ghi chưa chi.
        // - Số tiền phải chi trả vượt Tổng đã cam kết: bản ghi giữ nguyên, chi tiếp; phần vượt tạo bản ghi chi trả thêm
        // - Số tiền phải chi trả trong Tổng đã cam kết: giảm phần còn phải chi (bản ghi chưa chi trước, rồi bản ghi đang chi dở), có lưu vết
        var live = G.concat(U);
        var remOf = function (p) { return Math.max(0, kpqdN(p.amount) - (G.indexOf(p) >= 0 ? kpqdPaid(p) : 0)); };
        var liveDone = false;
        if (D > 0) {
            var remAll = live.reduce(function (s, p) { return s + remOf(p); }, 0);
            if (D <= remAll) {
                var cut = remAll - D;
                U.slice().reverse().concat(G.slice().reverse()).forEach(function (p) {
                    if (cut <= 0) return;
                    var x = Math.min(cut, remOf(p)); if (x <= 0) return;
                    cut -= x; kpqdCutLive(ev, p, x, G.indexOf(p) >= 0, mark);
                });
                liveDone = true;
            } else {
                D -= remAll;
            }
        }
        if (liveDone) {
            // Đã xử lý trên các bản ghi đang có
        } else if (D > 0) {
            if (!ev.advOnly && typeof kptbBuildRecord === 'function') {
                // [scbs] Không còn bản ghi Chi trả chưa hủy (bản ghi chi trả thêm Đã hủy - Bảng A dòng 7) hoặc Quyết định không phát sinh chi trả: vẫn tạo bản ghi chi trả thêm
                var n = ev.n || 1;
                var tpl = pays[0] || list.find(function (p) { return p && kpqdIsPay(p) && (p.decId === ev.decId || (!p.decId && p.ycbtCode === ev.claimCode)); }) || null;
                var qdq = (kpqdRead('btnn_kptb_qd_issued_v1', []) || []).find(function (x) { return x && x.decId === ev.decId; }) || {};
                var tdec = (tpl && tpl.kptbDec) || {};
                var dec = Object.assign({}, { recipient: tdec.recipient, nycName: tdec.nycName || (tpl && tpl.nycName) || '' }, qdq, ev.after, { decId: ev.decId, claimCode: ev.claimCode, decNo: ev.decNo, issueDate: ev.decDate, unitName: (tpl && (((tpl.kptbDec || {}).unitName) || tpl.agency)) || qdq.unitName || '', net: D,
                    sourceLabel: 'QĐ sửa chữa, bổ sung' + (ev.docNo ? ' số ' + ev.docNo : '') + ' của Quyết định giải quyết bồi thường', at: kpqdNow() });
                var rec = kptbBuildRecord(dec, { id: 'P_TB_' + ev.decId + '_SCBS' + n, date: (ev.docDate || '') || (typeof kptbToday === 'function' ? kptbToday() : ''), nycRole: (tpl && tpl.nycRole) || 'Người bị thiệt hại' });
                rec.amount = D;
                if (tpl) { if (!rec.nycName) rec.nycName = tpl.nycName || ''; if (!rec.user) rec.user = tpl.user || ''; }
                var priorRows = kpqdPriorRows(F.concat(U), function (p) { return live.indexOf(p) >= 0 ? kpqdN(p.amount) : committed(p); }), priorTotal = priorRows.reduce(function (s, r) { return s + r.committed; }, 0);
                kpqdBasis(ev, rec, '', 'Chờ thông báo chi trả', { amountBefore: 0, amountAfter: D, chiThem: true, payable: P, priorRecs: priorRows, committedTotal: priorTotal });
                kpqdHist(rec, 'Tạo bản ghi chi trả thêm theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền chi trả thêm: ' + kpqdFmt(D) + ' đồng'
                    + (priorRows.length ? ' (= ' + kpqdFmt(P) + ' − đã chốt chi ' + kpqdFmt(priorTotal) + ' tại ' + priorRows.map(function (r) { return r.code; }).join(', ') + ').' : '.'));
                list.unshift(rec);
                mark(rec);
                kpqdLinkPrior(rec, priorRows, 'Theo ' + kpqdRef(ev) + ', Tổng số tiền bồi thường ' + kpqdFmt(ev.before ? ev.before.total : 0) + ' → ' + kpqdFmt(ev.after ? ev.after.total : 0));
                priorRows.forEach(function (r) { var p = list.find(function (x) { return x && x.id === r.id; }); if (p) mark(p); });
            }
        } else {
            // [liên kết thu hồi] Bản ghi Chi trả của Quyết định trước khi xử lý: Mã kinh phí, trạng thái trước, Số tiền đã chốt chi (bản ghi chưa chi: 0)
            var recBefore = F.concat(U).map(function (p) { return { id: p.id, code: p.code || '', statusBefore: kpqdSt(p), committed: U.indexOf(p) >= 0 ? 0 : Math.max(0, committed(p)) }; });
            var recTotal = recBefore.reduce(function (s, r) { return s + r.committed; }, 0);
            U.forEach(function (p) { if (kpqdN(p.amount) > 0) kpqdCancelUnpaid(ev, p, mark); });
            var R = -D;
            // Số tiền thực trả >= Số tiền phải chi trả: bản ghi đang chi dở dừng chi, Hoàn thành theo số đã trả (lưu vết)
            G.forEach(function (p) { kpqdFinishPartial(ev, p, mark, 'sc'); });
            // Số tiền thực trả > Số tiền phải chi trả: thu hồi phần thừa từ các khoản đã trả
            F.forEach(function (p) {
                if (R <= 0) return;
                var st = kpqdSt(p); if (st === 'Đã thu hồi' || (st === 'Chờ thu hồi' && !kpqdRecovSc(p))) return;
                var room = kpqdPaid(p) - (kpqdRecovSc(p) && st === 'Chờ thu hồi' ? kpqdNeed(p) : 0), x = Math.min(R, room); if (x <= 0) return;
                kpqdToRecover(ev, p, x); R -= x; mark(p);
            });
            // Gắn bảng Bản ghi chi trả của Quyết định (trạng thái trước → sau) vào mọi bản ghi bị tác động lần này; Mã kinh phí là link
            var recRows = recBefore.map(function (r) { var p = list.find(function (x) { return x && x.id === r.id; }); return Object.assign({}, r, { status: p ? kpqdSt(p) : r.statusBefore, need: p && kpqdSt(p) === 'Chờ thu hồi' && kpqdRecovSc(p) ? kpqdNeed(p) : 0 }); });
            var recCodes = recRows.filter(function (r) { return r.need > 0; }).map(function (r) { return { id: r.id, code: r.code }; });
            changed.forEach(function (p) {
                if (p.kpqd && p.kpqd.evId === ev.id && !recCodes.some(function (r) { return r.id === p.id; })) kpqdHistRecLink(p, recCodes);
            });
            changed.forEach(function (p) {
                if (!p.kpqd || p.kpqd.evId !== ev.id) return;
                p.kpqd.priorRecs = recRows; p.kpqd.committedTotal = recTotal; p.kpqd.payable = P; p.kpqd.recoverMode = true;
            });
        }
    }
    return changed;
}
// Số tiền đã tạm ứng thực tế của bản ghi Tạm ứng kinh phí (trừ phần phải thu hồi theo QĐ sửa chữa, bổ sung của dữ liệu cũ)
function kpqdAdvPaid(p) {
    var v = typeof kpAdvPaidOf === 'function' ? kpAdvPaidOf(p) : kpqdPaid(p);
    return Math.max(0, v - (kpqdRecovSc(p) ? kpqdNeed(p) : 0));
}
// Bản ghi Chờ chi trả đã chi một phần: dừng chi, Số tiền chi trả = số đã trả thực tế, chuyển Hoàn thành; ghi Lịch sử xử lý
function kpqdFinishPartial(ev, p, mark, kind) {
    var old = kpqdN(p.amount), paid = kpqdPaid(p), gq = kind === 'gql';
    p.amount = paid; if (p.kptbDec) p.kptbDec.net = paid; p.status = 'Hoàn thành';
    if (!kpqdN(p.payoutAmountReal)) p.payoutAmountReal = paid;
    kpqdBasis(ev, p, 'Chờ chi trả', 'Hoàn thành', { amountBefore: old, amountAfter: paid });
    kpqdHist(p, gq ? 'Hoàn thành theo QĐ giải quyết lại' : 'Hoàn thành theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + (gq ? kpqdGqlRef(ev) : kpqdRef(ev)) + '. Bản ghi đang chi trả đã trả thực tế ' + kpqdFmt(paid) + ' đồng, không còn phải chi tiếp theo Quyết định: dừng chi trả, Số tiền chi trả từ ' + kpqdFmt(old) + ' thành ' + kpqdFmt(paid) + ' đồng; trạng thái sau: Hoàn thành.');
    if (mark) mark(p);
}
// Giảm phần còn phải chi của bản ghi chưa chi / đang chi dở theo QĐ sửa chữa, bổ sung (lưu vết: Căn cứ, Lịch sử thay đổi số tiền, Lịch sử xử lý)
function kpqdCutLive(ev, p, x, partial, mark) {
    var st = kpqdSt(p), old = kpqdN(p.amount), nw = old - x, paid = partial ? kpqdPaid(p) : 0;
    if (!partial && nw <= 0) { kpqdCancelUnpaid(ev, p, mark); return; }
    if (partial && nw <= paid) { kpqdFinishPartial(ev, p, mark, 'sc'); return; }
    p.amount = nw; if (p.kptbDec) p.kptbDec.net = nw; kpqdInfoPatch(ev, p);
    if (!partial && ['Chờ duyệt', 'Chờ chi trả', 'Bị trả lại'].indexOf(st) >= 0) { kpqdResetNotice(p); p.status = 'Chờ thông báo chi trả'; }
    kpqdBasis(ev, p, st, kpqdSt(p), { amountBefore: old, amountAfter: nw });
    kpqdHist(p, 'Cập nhật theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền chi trả từ ' + kpqdFmt(old) + ' thành ' + kpqdFmt(nw) + ' đồng'
        + (partial ? ' (đã trả thực tế ' + kpqdFmt(paid) + ' đồng; tiếp tục chi trả ' + kpqdFmt(nw - paid) + ' đồng đến đủ Số tiền phải chi trả theo Quyết định)' : '') + '. Trạng thái trước: ' + st + '; trạng thái sau: ' + kpqdSt(p) + '.');
    mark(p);
}
function kpqdCancelUnpaid(ev, p, mark) {
    var st = kpqdSt(p);
    var c = kpqdCancelApprovals(p, KPQD_LBL[ev.kind]);
    p.status = 'Đã hủy';
    kpqdBasis(ev, p, st, 'Đã hủy', { amountBefore: kpqdN(p.amount) });
    kpqdHist(p, 'Hủy theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Trạng thái trước: ' + st + '.' + (c.length ? ' Hủy phiếu trình ' + c.join(', ') + ' đang chờ duyệt.' : ''));
    mark(p);
}
// Giảm Số tiền phải thu hồi (theo QĐ sửa chữa, bổ sung) của bản ghi; trả về phần còn lại chưa trừ
function kpqdReduceRecover(ev, p, amt, mark) {
    var need = kpqdNeed(p), got = kpqdGot(p), room = need - got, x = Math.min(amt, Math.max(0, room));
    if (x <= 0) return amt;
    var newNeed = need - x, paid = kpqdPaid(p);
    p.recovery.amountAfter = paid - newNeed;
    if (p.statusChangeBasis) p.statusChangeBasis.amountAfter = paid - newNeed;
    var before = 'Chờ thu hồi', back = p.kpqd && p.kpqd.statusBeforeRecover;
    if (newNeed === got) p.status = got > 0 ? 'Đã thu hồi' : (back || 'Hoàn thành');
    // Không còn phải thu hồi, chưa thu lần nào: bỏ dữ liệu thu hồi, trở về trạng thái trước khi chuyển Chờ thu hồi
    if (newNeed === 0 && got === 0) { delete p.recovery; delete p.statusChangeBasis; }
    kpqdBasis(ev, p, before, kpqdSt(p), { amountBefore: need, amountAfter: newNeed, statusBeforeRecover: back, recoverNeed: newNeed, recoverChange: true });
    kpqdHist(p, 'Cập nhật thu hồi theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền phải thu hồi từ ' + kpqdFmt(need) + ' thành ' + kpqdFmt(newNeed) + ' đồng; trạng thái sau: ' + kpqdSt(p) + '.');
    mark(p);
    return amt - x;
}

// ---------- Áp hàng đợi ----------
function kpqdApplyAll(list) {
    var q = kpqdRead(KPQD_EVT_KEY, []), done = kpqdRead(KPQD_DONE_KEY, []);
    if (!Array.isArray(q) || !q.length || !Array.isArray(list)) return 0;
    if (!Array.isArray(done)) done = [];
    var n = 0;
    q.forEach(function (ev) {
        if (!ev || !ev.id || done.indexOf(ev.id) >= 0) return;
        // Hủy QĐ không liên thông Kinh phí: chỉ áp sự kiện QĐ sửa chữa, bổ sung
        if (ev.kind !== 'sc') { done.push(ev.id); return; }
        var ch = kpqdApplySc(list, ev);
        kpqdScReopen(ev, ch);
        kpqdScDone(ev, ch);
        done.push(ev.id); n += ch.length || 0.5;
    });
    kpqdWrite(KPQD_DONE_KEY, done);
    return Math.ceil(n);
}
// [schl] Vụ việc Hoàn thành mà Quyết định sửa chữa, bổ sung Có hiệu lực phát sinh khoản chi trả thêm / Chờ thu hồi: Trạng thái Giải quyết YCBT về Chờ chi trả;
// vụ việc Hoàn thành lại khi các bản ghi Chi trả tiền bồi thường hoàn tất và không còn bản ghi Chờ thu hồi theo Quyết định (kpqdScTryComplete, kpCompleteClaim)
function kpqdScReopen(ev, changed) {
    var need = (changed || []).some(function (p) { var st = kpqdSt(p); return (kpqdIsPay(p) && st === 'Chờ thông báo chi trả') || st === 'Chờ thu hồi'; });
    if (!need) return false;
    var list = kpqdRead('claimsList', []);
    var c = Array.isArray(list) ? list.find(function (x) { return x && x.code === ev.claimCode; }) : null;
    if (!c || c.status !== 'Hoàn thành') return false;
    c.status = 'Chờ chi trả'; c.scReopen = true;
    if (!Array.isArray(c.timeline)) c.timeline = [];
    c.timeline.push({ title: 'Chờ chi trả', date: typeof kptbToday === 'function' ? kptbToday() : new Date().toLocaleDateString('vi-VN'), desc: 'Căn cứ: ' + kpqdRef(ev) + ' Có hiệu lực, phát sinh khoản chi trả thêm / thu hồi kinh phí. Trạng thái Giải quyết YCBT chuyển từ Hoàn thành sang Chờ chi trả.', status: 'completed' });
    kpqdWrite('claimsList', list);
    return true;
}
// Còn khoản chưa hoàn tất của vụ việc đã mở lại (trừ bản ghi đang xử lý): Chi trả tiền bồi thường chưa Hoàn thành / Trả lại ngân sách nhà nước, hoặc Chờ thu hồi theo Quyết định
function kpqdScOpen(claimCode, except) {
    if (typeof proposalsList === 'undefined') return false;
    return proposalsList.some(function (p) {
        if (!p || p === except || p.ycbtCode !== claimCode) return false;
        var st = kpqdSt(p);
        if (kpqdIsPay(p) && KPQD_GQL_PAY_DONE.indexOf(st) < 0) return true;
        return st === 'Chờ thu hồi' && !!p.kpqd;
    });
}
// [scbs] Bản ghi Chi trả chuyển Hoàn thành / Đã hủy / Đã thu hồi theo QĐ sửa chữa, bổ sung và vụ việc không còn khoản chưa hoàn tất: Hoàn thành chi trả (quy tắc 2b)
function kpqdScDone(ev, changed) {
    var hit = (changed || []).some(function (p) { var st = kpqdSt(p); return kpqdIsPay(p) && ['Hoàn thành', 'Đã hủy', 'Đã thu hồi'].indexOf(st) >= 0; });
    if (!hit || typeof proposalsList === 'undefined' || kpqdScOpen(ev.claimCode, null)) return false;
    var list = kpqdRead('claimsList', []);
    var c = Array.isArray(list) ? list.find(function (x) { return x && x.code === ev.claimCode; }) : null;
    if (!c || c.status !== 'Chờ chi trả') return false;
    if (c.scReopen) return kpqdScTryComplete(ev.claimCode, 'Hoàn tất chi trả theo ' + kpqdRef(ev));
    var done = proposalsList.filter(function (p) { return p && kpqdIsPay(p) && p.ycbtCode === ev.claimCode && ['Hoàn thành', 'Trả lại ngân sách nhà nước', 'Đã thu hồi'].indexOf(kpqdSt(p)) >= 0; });
    // [KH chốt 05/11/2026] Số tiền phải chi trả còn lại bằng 0, mọi bản ghi Chi trả chưa chi Đã hủy (chưa chi lần nào): hồ sơ GQBT Hoàn thành
    if (!done.length && typeof kpCompleteClaim === 'function') {
        var dt = typeof kptbToday === 'function' ? kptbToday() : new Date().toLocaleDateString('vi-VN');
        var advSum = proposalsList.filter(function (p) { return p && kpqdIsAdv(p) && p.ycbtCode === ev.claimCode && kpqdSt(p) !== 'Đã hủy'; }).reduce(function (s, p) { return s + kpqdAdvPaid(p); }, 0);
        kpCompleteClaim({ ycbtCode: ev.claimCode, code: ev.docNo || '' }, function (cl) {
            cl.timeline.push({ title: 'Hoàn thành chi trả tiền bồi thường', date: dt, desc: 'Căn cứ: ' + kpqdRef(ev) + ' Có hiệu lực: Số tiền phải chi trả bằng 0' + (advSum ? ' (đã tạm ứng ' + kpqdFmt(advSum) + ' đồng)' : '') + ', không còn khoản chi trả. Trạng thái Giải quyết YCBT chuyển Hoàn thành.', status: 'completed' });
            if (advSum) { cl.moneyPaid = true; cl.thucthiDate = dt; cl.thucthiNote = 'Không phát sinh chi trả; đã tạm ứng ' + kpqdFmt(advSum) + ' đồng.'; }
        });
        return true;
    }
    if (!done.length || typeof kpPayCompleteClaim !== 'function') return false;
    var paid = done.reduce(function (s, p) { return s + kpqdPaid(p) - (kpqdRecovSc(p) ? kpqdNeed(p) : 0); }, 0);
    kpPayCompleteClaim(done[0], typeof kptbToday === 'function' ? kptbToday() : new Date().toLocaleDateString('vi-VN'), paid);
    return true;
}
function kpqdScTryComplete(claimCode, note) {
    var list = kpqdRead('claimsList', []);
    var c = Array.isArray(list) ? list.find(function (x) { return x && x.code === claimCode; }) : null;
    if (!c || !c.scReopen || c.status !== 'Chờ chi trả' || kpqdScOpen(claimCode, null)) return false;
    c.status = 'Hoàn thành'; delete c.scReopen;
    if (!Array.isArray(c.timeline)) c.timeline = [];
    c.timeline.push({ title: 'Hoàn thành', date: typeof kptbToday === 'function' ? kptbToday() : new Date().toLocaleDateString('vi-VN'), desc: (note || 'Hoàn thành thu hồi theo QĐ sửa chữa, bổ sung') + '. Trạng thái Giải quyết YCBT chuyển Hoàn thành.', status: 'completed' });
    kpqdWrite('claimsList', list);
    try { if (window.BTNN_DVC) BTNN_DVC.record(c, 'VU_VIEC_HOAN_THANH', { caseStatusName: 'Hoàn thành', fileName: '' }); } catch (e) { /* mockup */ }
    return true;
}
window.kpqdScTryComplete = kpqdScTryComplete;
// Hoàn thành chi trả của vụ việc đã mở lại: chỉ chuyển Hoàn thành khi không còn khoản chưa hoàn tất
if (typeof kpCompleteClaim === 'function') {
    (function () {
        var orig = kpCompleteClaim;
        kpCompleteClaim = function (item) {
            if (item && item.ycbtCode) {
                var list = kpqdRead('claimsList', []);
                var c = Array.isArray(list) ? list.find(function (x) { return x && x.code === item.ycbtCode; }) : null;
                // [scbs] Vụ việc chưa từng Hoàn thành nhưng có bản ghi theo QĐ sửa chữa, bổ sung: chỉ Hoàn thành khi không còn khoản chưa hoàn tất
                if (c && !c.scReopen && kpqdIsPay(item) && proposalsList.some(function (p) { return p && p !== item && p.ycbtCode === item.ycbtCode && kpqdHas(p); }) && kpqdScOpen(item.ycbtCode, item)) return;
                if (c && c.scReopen) {
                    if (kpqdScOpen(item.ycbtCode, item)) return;
                    var r = orig.apply(this, arguments);
                    var l2 = kpqdRead('claimsList', []), c2 = Array.isArray(l2) ? l2.find(function (x) { return x && x.code === item.ycbtCode; }) : null;
                    if (c2) { delete c2.scReopen; kpqdWrite('claimsList', l2); }
                    return r;
                }
            }
            return orig.apply(this, arguments);
        };
    })();
}

// ---------- Hiển thị (trang Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường) ----------
function kpqdHas(item) { return !!item && !!item.kpqd && !!KPQD_LBL[item.kpqd.kind]; }
function kpqdSub(item) { return KPQD_LBL[item.kpqd.kind]; }
function kpqdBasisCard(item) {
    var b = item.kpqd || {};
    var fld = typeof kpdtFld === 'function' ? kpdtFld : function (l, v) { return '<div><b>' + l + '</b> ' + v + '</div>'; };
    var adv = typeof kpIsAdv === 'function' && kpIsAdv(item);
    var gq = b.kind === 'gql';
    var ref = (gq ? 'Quyết định giải quyết bồi thường' : 'QĐ sửa chữa, bổ sung') + (b.decisionNo ? ' số ' + b.decisionNo : '') + (b.decisionDate ? ' ngày ' + b.decisionDate : '');
    var body = '<div class="kpdt-grid">'
        + fld('Loại quyết định', kpqdE(b.decisionType))
        + fld('Quyết định làm căn cứ', kpqdE(ref))
        + fld(gq ? 'Quyết định giải quyết bồi thường đã bị hủy' : 'Quyết định giải quyết bồi thường', kpqdE((b.baseDecNo || '-') + (b.baseDecDate ? ' ngày ' + b.baseDecDate : '')))
        + fld('File quyết định', b.file ? '<i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> ' + kpqdE(b.file) + ' <button type="button" class="btn btn-secondary btn-sm" onclick="showToast(\'Giả lập mở tệp: ' + kpqdE(b.file).replace(/'/g, '') + '\', \'info\')"><i class="fa-solid fa-eye"></i> Xem file</button>' : '')
        + fld(gq ? 'Lý do hủy Quyết định' : 'Nội dung sửa chữa, bổ sung', kpqdE(b.content).replace(/\n/g, '<br>'), true)
        + (b.kind === 'sc' && b.totalBefore != null ? fld('Tổng số tiền bồi thường theo Quyết định trước / sau sửa chữa, bổ sung (VNĐ)', kpqdFmt(b.totalBefore) + ' → ' + kpqdFmt(b.totalAfter)) : '')
        + (b.amountAfter != null ? fld(b.recoverNeed != null ? 'Số tiền giữ lại trước / sau (VNĐ)' : (adv ? 'Số tiền của bản ghi trước / sau (VNĐ)' : 'Số tiền chi trả trước / sau (VNĐ)'), kpqdFmt(b.amountBefore) + ' → ' + kpqdFmt(b.amountAfter)) : '')
        + (b.recoverNeed != null ? fld('Số tiền đã chi / Số tiền phải thu hồi (VNĐ)', kpqdFmt(b.amountBefore) + ' / ' + kpqdFmt(b.recoverNeed)) : '')
        + (Array.isArray(b.priorRecs) && b.priorRecs.length ? kpqdPriorHtml(b) : '')
        + fld('Trạng thái trước', kpqdE(b.statusBefore))
        + fld('Thời điểm chuyển trạng thái', kpqdE(b.changedAt))
        + kpqdBornHtml(item, b, fld)
        + '</div>';
    return typeof kpdtCard === 'function' ? kpdtCard('fa-scale-balanced', 'Căn cứ thay đổi trạng thái', body, 'kpqdBasisCard') : body;
}
// Bản ghi chi trả thêm bị Quyết định sau tác động tiếp: hiển thị thêm Căn cứ tạo bản ghi (Quyết định, số tiền, bảng bản ghi đã có lúc tạo)
function kpqdBornHtml(item, b, fld) {
    var log = Array.isArray(item.kpqdLog) ? item.kpqdLog : [];
    var o = log.find(function (x) { return x && x.chiThem; });
    if (!o || o === b || (o.evId && o.evId === b.evId)) return '';
    var gq = o.kind === 'gql';
    var ref = (gq ? 'Quyết định giải quyết bồi thường (giải quyết lại)' : 'QĐ sửa chữa, bổ sung') + (o.decisionNo ? ' số ' + o.decisionNo : '') + (o.decisionDate ? ' ngày ' + o.decisionDate : '');
    return '<div class="kpdt-full" style="grid-column:1 / -1; border-top:1px dashed #cbd5e1; margin-top:6px; padding-top:10px; font-weight:700; color:var(--primary);">Căn cứ tạo bản ghi chi trả thêm</div>'
        + fld('Quyết định làm căn cứ', kpqdE(ref))
        + (o.totalBefore != null ? fld('Tổng số tiền bồi thường theo Quyết định trước / sau (VNĐ)', kpqdFmt(o.totalBefore) + ' → ' + kpqdFmt(o.totalAfter)) : (o.totalAfter != null ? fld('Tổng số tiền bồi thường theo Quyết định (VNĐ)', kpqdFmt(o.totalAfter)) : ''))
        + fld('Số tiền chi trả thêm (VNĐ)', kpqdFmt(o.amountAfter))
        + (Array.isArray(o.priorRecs) && o.priorRecs.length ? kpqdPriorHtml(o) : '')
        + fld('Thời điểm tạo', kpqdE(o.changedAt));
}
// Bảng Bản ghi chi trả đã có của Quyết định (bản ghi chi trả thêm); Mã kinh phí mở chi tiết bản ghi
function kpqdPriorHtml(b) {
    var th = 'style="padding:6px 8px; border:1px solid #E2E8F0; background:#F8FAFC; text-align:left;"', td = 'style="padding:6px 8px; border:1px solid #E2E8F0;"', tr = 'style="padding:6px 8px; border:1px solid #E2E8F0; text-align:right;"';
    var rows = b.priorRecs.map(function (r, i) {
        var link = r.code ? '<a href="javascript:void(0)" style="color:var(--primary-light); text-decoration:underline; font-weight:600;" onclick="kpdtOpen(\'' + kpqdE(r.id) + '\')">' + kpqdE(r.code) + '</a>' : '-';
        return '<tr><td ' + td + '>' + (i + 1) + '</td><td ' + td + '>' + link + '</td><td ' + td + '>' + kpqdE(r.status) + '</td><td ' + tr + '>' + kpqdFmt(r.committed) + '</td></tr>';
    }).join('');
    var D = kpqdN(b.amountAfter);
    if (b.recoverMode) {
        var rrows = b.priorRecs.map(function (r, i) {
            var link = r.code ? '<a href="javascript:void(0)" style="color:var(--primary-light); text-decoration:underline; font-weight:600;" onclick="kpdtOpen(\'' + kpqdE(r.id) + '\')">' + kpqdE(r.code) + '</a>' : '-';
            return '<tr><td ' + td + '>' + (i + 1) + '</td><td ' + td + '>' + link + '</td><td ' + td + '>' + kpqdE(r.statusBefore) + ' → ' + kpqdE(r.status) + '</td><td ' + tr + '>' + kpqdFmt(r.committed) + '</td><td ' + tr + '>' + (r.need ? kpqdFmt(r.need) : '-') + '</td></tr>';
        }).join('');
        var R = Math.max(0, kpqdN(b.committedTotal) - kpqdN(b.payable));
        return '<div class="kpdt-full" style="grid-column:1 / -1; margin-top:4px;"><span class="form-label">Bản ghi chi trả của Quyết định</span>'
            + '<table id="kpqdPriorTbl" style="width:100%; border-collapse:collapse; font-size:13px; margin-top:4px;"><thead><tr><th ' + th + '>STT</th><th ' + th + '>Mã kinh phí</th><th ' + th + '>Trạng thái trước → sau</th><th ' + th.replace('left', 'right') + '>Số tiền đã chốt chi (VNĐ)</th><th ' + th.replace('left', 'right') + '>Số tiền phải thu hồi (VNĐ)</th></tr></thead><tbody>' + rrows
            + '<tr style="font-weight:700; background:#f8fafc;"><td ' + td + ' colspan="3">Tổng</td><td ' + tr + '>' + kpqdFmt(b.committedTotal) + '</td><td ' + tr + '>' + kpqdFmt(R) + '</td></tr></tbody></table>'
            + '<div class="kpdt-words" style="font-style:normal; margin-top:6px;">Số tiền phải thu hồi = Tổng đã chốt chi ' + kpqdFmt(b.committedTotal) + ' − Số tiền phải chi trả ' + kpqdFmt(b.payable) + ' = <b>' + kpqdFmt(R) + '</b> đồng</div></div>';
    }
    return '<div class="kpdt-full" style="grid-column:1 / -1; margin-top:4px;"><span class="form-label">Bản ghi chi trả đã có của Quyết định</span>'
        + '<table id="kpqdPriorTbl" style="width:100%; border-collapse:collapse; font-size:13px; margin-top:4px;"><thead><tr><th ' + th + '>STT</th><th ' + th + '>Mã kinh phí</th><th ' + th + '>Trạng thái</th><th ' + th.replace('left', 'right') + '>Số tiền đã chốt chi (VNĐ)</th></tr></thead><tbody>' + rows
        + '<tr style="font-weight:700; background:#f8fafc;"><td ' + td + ' colspan="3">Tổng đã chốt chi</td><td ' + tr + '>' + kpqdFmt(b.committedTotal) + '</td></tr></tbody></table>'
        + '<div class="kpdt-words" style="font-style:normal; margin-top:6px;">Số tiền chi trả thêm = Số tiền phải chi trả ' + kpqdFmt(b.payable) + ' − Tổng đã chốt chi ' + kpqdFmt(b.committedTotal) + ' = <b>' + kpqdFmt(D) + '</b> đồng</div></div>';
}
function kpqdDecorateTable() {
    var tbody = document.getElementById('proposalsTableBody'); if (!tbody) return;
    Array.prototype.forEach.call(tbody.rows, function (tr) {
        if (tr.cells.length < 10) return;
        var code = tr.cells[1].innerText.trim();
        var item = proposalsList.find(function (p) { return p && p.code === code; });
        if (!kpqdHas(item)) return;
        var stCell = tr.cells[tr.cells.length - 2];
        if (!stCell.querySelector('.kpqd-sub')) stCell.insertAdjacentHTML('beforeend', '<div class="wf-sub kpqd-sub">' + kpqdSub(item) + '</div>');
    });
}
// MH24 - Tạo thông báo chi trả: QĐ đã có bản ghi chi trả thêm chưa lập Thông báo -> dùng lại bản ghi đó, không chặn trùng
(function () {
    if (typeof kpcdTbOf !== 'function') return;
    var orig = kpcdTbOf;
    kpcdTbOf = function (d, statuses) {
        if (statuses && statuses.indexOf('Hoàn thành') >= 0) {
            var pend = proposalsList.find(function (p) { return p && kpqdHas(p) && p.kpqd.kind === 'sc' && p.decId === d.id && ['Chờ thông báo chi trả', 'Đề nghị cấp bổ sung kinh phí', 'Bị trả lại'].indexOf(kpqdSt(p)) >= 0; });
            if (pend) return null;
        }
        return orig.apply(this, arguments);
    };
    if (typeof kpcdTbBuildDraft === 'function') {
        var ob = kpcdTbBuildDraft;
        kpcdTbBuildDraft = function () { var dr = ob.apply(this, arguments); if (dr && kpqdHas(dr) && dr.kpqd.chiThem && dr.kptbDec) { dr.kptbDec.net = dr.amount; } return dr; };
    }
})();
(function () {
    if (typeof proposalsList === 'undefined' || typeof renderProposalsTable !== 'function' || typeof syncFromLocalStorage !== 'function') return;
    var origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () {
        var r = origSync.apply(this, arguments);
        if (kpqdApplyAll(proposalsList)) saveProposalsToLocal();
        return r;
    };
    var origRender = renderProposalsTable;
    renderProposalsTable = function () { var r = origRender.apply(this, arguments); kpqdDecorateTable(); return r; };
    ['kpdtAdvBody', 'kpdtPayBody'].forEach(function (fn) {
        var orig = window[fn]; if (typeof orig !== 'function') return;
        window[fn] = function (item) { var h = orig.apply(this, arguments); return kpqdHas(item) ? kpqdBasisCard(item) + kpqdLogCard(item) + h : h; };
    });
    if (typeof kpdtStatusHtml === 'function') {
        var origSt = kpdtStatusHtml;
        kpdtStatusHtml = function (item) {
            var h = origSt.apply(this, arguments);
            return kpqdHas(item) ? h.replace(/<\/span>$/, '<div class="wf-sub kpqd-sub">' + kpqdSub(item) + '</div></span>') : h;
        };
    }
    window.addEventListener('load', function () {
        setTimeout(function () { try { if (kpqdApplyAll(proposalsList)) { saveProposalsToLocal(); renderProposalsTable(); } } catch (e) { console.error(e); } }, 0);
    });
})();

// ======================= [gql] Quyết định giải quyết bồi thường mới sau Giải quyết lại (Quyết định cũ Hủy quyết định) =======================
// - Thời điểm: Quyết định mới chuyển Có hiệu lực (hàng đợi 'btnn_kptb_qd_issued_v1') của vụ việc có Quyết định Hủy quyết định.
// - Chi trả theo Bảng A; Số tiền đã chốt chi trả gồm cả bản ghi của Quyết định đã hủy:
//   + Bản ghi chưa chi của Quyết định đã hủy -> Đã hủy (hủy phiếu trình đang chờ duyệt).
//   + Chờ chi trả đã chi một phần của Quyết định đã hủy (bị chặn chi tiếp): Số tiền chi trả = Số tiền đã chi thực tế, chuyển Hoàn thành; đã chốt = Số tiền đã chi.
//   + Hoàn thành / Trả lại ngân sách nhà nước / Chờ thu hồi theo QĐ sửa chữa, bổ sung: đã chốt như Bảng A.
//   + Chênh lệch D = Số tiền phải chi trả theo Quyết định mới - Số tiền đã chốt: D > 0 tạo 01 bản ghi Chi trả bằng D (Quyết định mới);
//     D < 0: bản ghi đã chi chuyển Chờ thu hồi phần thừa (tối đa bằng Số tiền đã chi); D = 0: không tạo bản ghi.
// - Tạm ứng (khác Sửa chữa, bổ sung - KH chốt 05/11/2026): Số tiền đã tạm ứng = số đã chi thực tế; tạm ứng đã chi vượt Tổng số tiền bồi thường của Quyết định mới -> Chờ thu hồi phần vượt, phân bổ lần lượt, tối đa bằng số đã chi.
// - Vụ việc không còn khoản chi thêm: không chênh lệch -> Hoàn thành ngay (không gửi Dịch vụ công); thừa tiền / thừa tạm ứng -> giữ Chờ chi trả,
//   Hoàn thành khi các bản ghi Chờ thu hồi theo QĐ giải quyết lại chuyển Đã thu hồi; còn bản ghi Chi trả chưa xong -> chưa Hoàn thành.
// - Nhãn "Theo QĐ giải quyết lại". Mỗi Quyết định mới áp dụng 01 lần ('btnn_kpqd_gql_done_v1').
var KPQD_GQL_DONE_KEY = 'btnn_kpqd_gql_done_v1';
var KPQD_GQL_PAY_DONE = ['Hoàn thành', 'Trả lại ngân sách nhà nước', 'Đã thu hồi', 'Đã hủy', 'Đã sung quỹ', 'Sung quỹ nhà nước'];
function kpqdGqlCancelledIds(claimCode) {
    var ids = [];
    var decs = kpqdRead('btnn_qd_gqbt_v2', []);
    (Array.isArray(decs) ? decs : []).forEach(function (d) { if (d && d.claimCode === claimCode && d.status === 'Hủy quyết định') ids.push(d.id); });
    var map = kpqdRead('btnn_qd_hieu_luc_v1', {}) || {};
    Object.keys(map).forEach(function (id) { var m = map[id]; if (m && m.claimCode === claimCode && m.status === 'Hủy quyết định' && ids.indexOf(id) < 0) ids.push(id); });
    return ids;
}
function kpqdGqlOld(list, dec, ids) {
    return list.filter(function (p) { return p && kpqdIsPay(p) && p.ycbtCode === dec.claimCode && p.decId !== dec.decId && (ids.indexOf(p.decId) >= 0 || !p.decId); });
}
function kpqdGqlRef(ev) { return 'Quyết định giải quyết bồi thường số ' + (ev.docNo || '-') + (ev.docDate ? ' ngày ' + ev.docDate : '') + ' (giải quyết lại; Mã hồ sơ GQBT ' + ev.claimCode + ')'; }
// Chuyển Chờ thu hồi thêm x đồng (bản ghi Chi trả / Tạm ứng đã chi)
function kpqdGqlToRecover(ev, p, x, why) {
    var st = kpqdSt(p), paid = kpqdPaid(p), cur = st === 'Chờ thu hồi' ? kpqdNeed(p) : 0, need = Math.min(paid, cur + x);
    p.status = 'Chờ thu hồi';
    p.recovery = Object.assign(p.recovery || {}, { basisDecisionNo: ev.docNo, basisDecisionDate: ev.docDate, amountAfter: paid - need });
    p.statusChangeBasis = { decisionType: KPQD_TYPE.gql, decisionNo: ev.docNo, decisionDate: ev.docDate, reason: why, statusBefore: st, statusAfter: 'Chờ thu hồi', changedAt: kpqdNow(), amountAfter: paid - need };
    kpqdBasis(ev, p, st, 'Chờ thu hồi', { amountBefore: paid, amountAfter: paid - need, statusBeforeRecover: st, recoverNeed: need });
    kpqdHist(p, 'Chuyển Chờ thu hồi theo QĐ giải quyết lại', 'Căn cứ: ' + kpqdGqlRef(ev) + '. ' + why + '. Trạng thái trước: ' + st + '. Số tiền đã chi: ' + kpqdFmt(paid) + ' đồng. Số tiền phải thu hồi: ' + kpqdFmt(need) + ' đồng.');
    return need - cur;
}
function kpqdGqlApply(list, dec, ids) {
    var old = kpqdGqlOld(list, dec, ids);
    var ev = { id: 'gql_' + dec.decId, kind: 'gql', decId: dec.decId, claimCode: dec.claimCode, docNo: dec.decNo || '', docDate: dec.issueDate || '', decNo: (old[0] && (old[0].baseDecisionNo || (old[0].kptbDec || {}).decNo)) || '', decDate: '', content: '' };
    var total = kpqdN(dec.total);
    // Số tiền đã tạm ứng = số đã chi tạm ứng thực tế của vụ việc (KH chốt 05/11/2026); chưa có bản ghi Tạm ứng: theo số ghi trên Quyết định
    var advLive = list.filter(function (p) { return p && kpqdIsAdv(p) && p.ycbtCode === dec.claimCode && kpqdSt(p) !== 'Đã hủy'; });
    var P = advLive.length ? Math.max(0, total - advLive.reduce(function (s, p) { return s + kpqdAdvPaid(p); }, 0)) : (typeof kptbNet === 'function' ? kptbNet(dec) : Math.max(0, total - kpqdN(dec.advance)));
    var committed = 0, paidRecs = [], ongoing = [], changed = 0;
    old.forEach(function (p) {
        var st = kpqdSt(p), paid = kpqdPaid(p);
        if (st === 'Đã hủy' || st === 'Đã thu hồi' || (st === 'Chờ thu hồi' && !kpqdRecovSc(p))) return;
        if (KPQD_UNPAID.indexOf(st) >= 0 || (st === 'Chờ chi trả' && paid === 0)) {
            var c = kpqdCancelApprovals(p, KPQD_LBL.gql);
            p.status = 'Đã hủy';
            kpqdBasis(ev, p, st, 'Đã hủy', { amountBefore: kpqdN(p.amount) });
            kpqdHist(p, 'Hủy theo QĐ giải quyết lại', 'Căn cứ: ' + kpqdGqlRef(ev) + '. Bản ghi của Quyết định đã bị hủy chưa chi. Trạng thái trước: ' + st + '.' + (c.length ? ' Hủy phiếu trình ' + c.join(', ') + ' đang chờ duyệt.' : ''));
            changed++;
            return;
        }
        // [người dùng chốt 06/11/2026] Tính theo số tiền thực tế đã trả cho người được bồi thường
        if (st === 'Chờ chi trả') { committed += paid; paidRecs.push(p); ongoing.push(p); return; }
        if (st === 'Chờ thu hồi') committed += kpqdPaid(p) - kpqdNeed(p);
        else if (st === 'Trả lại ngân sách nhà nước') committed += paid;
        else committed += paid || kpqdN(p.amount);
        paidRecs.push(p);
    });
    var D = P - committed;
    // Quyết định cũ đã bị hủy (bị chặn chi tiếp): bản ghi đang chi dở dừng chi, Hoàn thành theo số đã trả thực tế; phần còn thiếu tạo bản ghi của Quyết định mới
    ongoing.forEach(function (p) { kpqdFinishPartial(ev, p, null, 'gql'); changed++; });
    if (D > 0 && typeof kptbBuildRecord === 'function') {
        var d2 = Object.assign({}, dec, { net: D, sourceLabel: 'Quyết định giải quyết bồi thường số ' + (dec.decNo || '-') + ' (giải quyết lại)' });
        var rec = kptbBuildRecord(d2);
        rec.amount = D;
        if (rec.kptbDec) rec.kptbDec.net = D;
        var gtpl = paidRecs[0]; if (gtpl) { if (!rec.nycName) rec.nycName = gtpl.nycName || ''; if (!rec.user) rec.user = gtpl.user || ''; }
        var gqlRows = kpqdPriorRows(paidRecs, function (p) {
            var s = kpqdSt(p);
            if (s === 'Chờ thu hồi') return kpqdPaid(p) - kpqdNeed(p);
            if (s === 'Trả lại ngân sách nhà nước') return kpqdPaid(p);
            return kpqdPaid(p) || kpqdN(p.amount);
        });
        kpqdBasis(ev, rec, '', 'Chờ thông báo chi trả', { amountBefore: 0, amountAfter: D, chiThem: true, totalAfter: P, committed: committed, payable: P, priorRecs: gqlRows, committedTotal: committed });
        kpqdHist(rec, 'Tạo bản ghi chi trả theo QĐ giải quyết lại', 'Căn cứ: ' + kpqdGqlRef(ev) + '. Số tiền phải chi trả ' + kpqdFmt(P) + ' đồng, đã chốt chi trả ' + kpqdFmt(committed) + ' đồng; Số tiền chi trả ' + kpqdFmt(D) + ' đồng.');
        list.unshift(rec); changed++;
        kpqdLinkPrior(rec, gqlRows, 'Theo ' + kpqdGqlRef(ev));
    } else if (D < 0) {
        var R = -D;
        paidRecs.forEach(function (p) {
            if (R <= 0) return;
            var st = kpqdSt(p); if (st === 'Trả lại ngân sách nhà nước' && !(kpqdPaid(p) > 0)) return;
            var room = kpqdPaid(p) - (st === 'Chờ thu hồi' ? kpqdNeed(p) : 0), x = Math.min(R, room);
            if (x <= 0) return;
            R -= kpqdGqlToRecover(ev, p, x, 'Số tiền đã chốt chi trả vượt Số tiền phải chi trả theo Quyết định giải quyết bồi thường mới');
            changed++;
        });
    }
    // Tạm ứng vượt: tạm ứng đã chi vượt Tổng số tiền bồi thường của Quyết định mới (chỉ áp dụng Giải quyết lại)
    var advs = list.filter(function (p) { return p && kpqdIsAdv(p) && p.ycbtCode === dec.claimCode && kpqdPaid(p) > 0 && kpqdSt(p) !== 'Đã thu hồi' && !(kpqdSt(p) === 'Chờ thu hồi' && !(p.kpqd && p.kpqd.kind === 'gql')); });
    var advPaid = advs.reduce(function (s, p) { return s + kpqdPaid(p); }, 0);
    var advNeedNow = advs.reduce(function (s, p) { return s + (kpqdSt(p) === 'Chờ thu hồi' ? kpqdNeed(p) : 0); }, 0);
    var A = Math.max(0, advPaid - total) - advNeedNow;
    advs.forEach(function (p) {
        if (A <= 0) return;
        var room = kpqdPaid(p) - (kpqdSt(p) === 'Chờ thu hồi' ? kpqdNeed(p) : 0), x = Math.min(A, room);
        if (x <= 0) return;
        A -= kpqdGqlToRecover(ev, p, x, 'Số tiền tạm ứng đã chi vượt Tổng số tiền bồi thường theo Quyết định giải quyết bồi thường mới');
        changed++;
    });
    if (D <= 0) kpqdGqlTryComplete(dec.claimCode, D === 0 ? 'Quyết định giải quyết bồi thường số ' + (dec.decNo || '-') + ' (giải quyết lại) Có hiệu lực, không phát sinh khoản chi thêm' : '');
    return changed || 1;
}
// Vụ việc Chờ chi trả: không còn bản ghi Chi trả chưa xong, không còn bản ghi Chờ thu hồi theo QĐ giải quyết lại -> Hoàn thành (không gửi Dịch vụ công)
function kpqdGqlTryComplete(claimCode, note) {
    if (!claimCode || typeof proposalsList === 'undefined') return false;
    if (!kpqdGqlCancelledIds(claimCode).length) return false;
    var open = proposalsList.some(function (p) {
        if (!p || p.ycbtCode !== claimCode) return false;
        var st = kpqdSt(p);
        if (kpqdIsPay(p) && KPQD_GQL_PAY_DONE.indexOf(st) < 0) return true;
        return st === 'Chờ thu hồi' && !!p.kpqd && p.kpqd.kind === 'gql';
    });
    if (open) return false;
    var list = kpqdRead('claimsList', []);
    var c = Array.isArray(list) ? list.find(function (x) { return x && x.code === claimCode; }) : null;
    if (!c || c.status !== 'Chờ chi trả') return false;
    var d = typeof kptbToday === 'function' ? kptbToday() : new Date().toLocaleDateString('vi-VN');
    c.status = 'Hoàn thành';
    if (!Array.isArray(c.timeline)) c.timeline = [];
    c.timeline.push({ title: 'Hoàn thành', date: d, desc: (note || 'Hoàn thành thu hồi theo QĐ giải quyết lại') + '. Trạng thái Giải quyết YCBT chuyển Hoàn thành.', status: 'completed' });
    kpqdWrite('claimsList', list);
    try { if (window.BTNN_DVC) BTNN_DVC.record(c, 'VU_VIEC_HOAN_THANH', { caseStatusName: 'Hoàn thành', fileName: '' }); } catch (e) { /* mockup */ }
    return true;
}
window.kpqdGqlTryComplete = kpqdGqlTryComplete;
// Dữ liệu mẫu: Tạm ứng KP-2026-564 đã chi 100.000.000 của BT-2026-564 (QĐ QD-GQL3 Hủy quyết định); QĐ mới lớn hơn số đã tạm ứng
function kpqdGqlSeed(list) {
    if (list.some(function (p) { return p && p.code === 'KP-2026-564'; })) return 0;
    var tpl = list.find(function (p) { return p && kpqdIsAdv(p) && kpqdSt(p) === 'Hoàn thành' && kpqdPaid(p) > 0; });
    if (!tpl) return 0;
    var it = JSON.parse(JSON.stringify(tpl));
    ['recovery', 'statusChangeBasis', 'kpqd', 'kpdcHistory', 'statusBasis', 'kpdcNoRecover'].forEach(function (k) { delete it[k]; });
    Object.assign(it, { id: 'P_GQL_TU3', code: 'KP-2026-564', ycbtCode: 'BT-2026-564', vvCode: 'VVBT-2026-564', nycName: 'Trương Văn Bình', amount: 100000000, status: 'Hoàn thành', date: '20/07/2026', payoutAmountReal: 100000000, payoutDate: '25/07/2026', gqlSeed: 1 });
    if (Array.isArray(it.payHistory) && it.payHistory.length) it.payHistory = [Object.assign({}, it.payHistory[0], { amount: 100000000, payDate: '25/08/2026' })];
    if (it.kptbPayment) it.kptbPayment = Object.assign({}, it.kptbPayment, { amount: 100000000, payDate: '25/08/2026' });
    list.push(it);
    return 1;
}
(function () {
    if (typeof kptbImportAndSeed !== 'function' || typeof proposalsList === 'undefined') return;
    var prev = kptbImportAndSeed;
    kptbImportAndSeed = function () {
        var key = 'btnn_kptb_qd_issued_v1';
        var ch = kpqdGqlSeed(proposalsList);
        var q = kpqdRead(key, []), done = kpqdRead(KPQD_GQL_DONE_KEY, []);
        if (!Array.isArray(q)) q = [];
        if (!Array.isArray(done)) done = [];
        var masked = [];
        q.forEach(function (dec) {
            if (!dec || !dec.decId) return;
            if (done.indexOf(dec.decId) >= 0) { masked.push(dec.decId); return; }
            if (proposalsList.some(function (p) { return p && p.decId === dec.decId; })) return;
            var ids = kpqdGqlCancelledIds(dec.claimCode).filter(function (id) { return id !== dec.decId; });
            if (!ids.length) return;
            ch += kpqdGqlApply(proposalsList, dec, ids) || 0;
            done.push(dec.decId); masked.push(dec.decId);
        });
        var r;
        if (masked.length) {
            kpqdWrite(KPQD_GQL_DONE_KEY, done);
            // Quyết định đã xử lý theo Bảng A, B: không tạo thêm bản ghi Chi trả đầy đủ
            kpqdWrite(key, q.filter(function (d) { return !d || masked.indexOf(d.decId) < 0; }));
            try { r = prev.apply(this, arguments); } finally { kpqdWrite(key, q); }
        } else r = prev.apply(this, arguments);
        if (ch && typeof saveProposalsToLocal === 'function') saveProposalsToLocal();
        return r;
    };
})();
