/*
 * Liên thông Quyết định giải quyết bồi thường bị Sửa chữa, bổ sung / Hủy -> Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường (prefix kpqd)
 * - Nguồn: hàng đợi 'btnn_kpqd_events_v1' do màn Quyết định giải quyết bồi thường ghi khi QĐ sửa chữa, bổ sung / QĐ hủy được ban hành
 *   (Lãnh đạo cấp cuối Ký duyệt hoặc Ký ngoài). Màn này áp từng sự kiện 01 lần khi tải trang (đánh dấu 'btnn_kpqd_applied_v1').
 * - Sửa chữa, bổ sung (chỉ khi thay đổi Số tiền / người yêu cầu / người nhận / phương thức chi trả):
 *   + Số tiền chi trả theo QĐ sau sửa chữa P = max(0, Tổng số tiền bồi thường − Số tiền đã tạm ứng theo QĐ).
 *   + Đã cam kết: Hoàn thành = đã chi; Chờ chi trả đã chi một phần / Trả lại ngân sách nhà nước = Số tiền của bản ghi; Chờ thu hồi / Đã thu hồi = phần giữ lại.
 *   + Chênh lệch D = P − Đã cam kết:
 *     D > 0: giảm Số tiền phải thu hồi đang có (theo QĐ sửa chữa, bổ sung) trước; còn lại -> sửa bản ghi chưa chi (đưa về Chờ thông báo chi trả)
 *            hoặc tạo bản ghi chi thêm "Chờ thông báo chi trả" (QĐ chưa có bản ghi Chi trả: không tạo; bản ghi tạo khi QĐ Có hiệu lực theo số tiền mới).
 *     D = 0: bản ghi chưa chi -> Đã hủy.
 *     D < 0: bản ghi chưa chi -> Đã hủy; giảm Số tiền của bản ghi Chờ chi trả đã chi một phần (đủ thì Hoàn thành); trừ phần đã trả lại ngân sách nhà nước;
 *            còn lại -> Chờ thu hồi các khoản đã chi.
 *   + Tạm ứng: Tổng số tiền bồi thường sau sửa chữa nhỏ hơn Số tiền tạm ứng đã chi -> khoản tạm ứng đã chi chuyển Chờ thu hồi phần chênh lệch.
 *   + Chỉ thay đổi thông tin người nhận / phương thức: cập nhật bản ghi chưa chi, giữ trạng thái.
 * - Hủy QĐ: cả Tạm ứng và Chi trả của vụ việc: chưa chi -> Đã hủy (hủy phiếu trình đang chờ duyệt); đã chi -> Chờ thu hồi toàn bộ số đã chi;
 *   Chờ thu hồi theo QĐ sửa chữa, bổ sung -> thu hồi toàn bộ; Đã hủy, Đã thu hồi, Trả lại ngân sách nhà nước, Chờ thu hồi khác: giữ nguyên.
 * - Hiển thị: dòng phụ "Theo QĐ sửa chữa, bổ sung" / "Hủy QĐ" dưới badge trạng thái (MH01, MH10, MH23); Khối Căn cứ thay đổi theo Quyết định tại MH10, MH23.
 */
var KPQD_EVT_KEY = 'btnn_kpqd_events_v1';
var KPQD_DONE_KEY = 'btnn_kpqd_applied_v1';
var KPQD_LBL = { sc: 'Theo QĐ sửa chữa, bổ sung', huy: 'Hủy QĐ' };
var KPQD_TYPE = { sc: 'Quyết định sửa chữa, bổ sung Quyết định giải quyết bồi thường', huy: 'Quyết định hủy Quyết định giải quyết bồi thường' };
var KPQD_PAY = ['Chi trả tiền bồi thường', 'Cấp kinh phí bồi thường'];
var KPQD_UNPAID = ['Chờ thông báo chi trả', 'Đề nghị cấp bổ sung kinh phí', 'Chờ duyệt', 'Bị trả lại', 'Chờ lập đề nghị'];

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
        statusBefore: before, statusAfter: after, changedAt: kpqdNow(), claimCode: ev.claimCode
    }, extra || {});
    p.kpqd = b;
    return b;
}
function kpqdHist(p, action, note) {
    if (!Array.isArray(p.kpdcHistory)) p.kpdcHistory = [];
    p.kpdcHistory.push({ at: kpqdNow(), userId: '', userName: 'Hệ thống', action: action, note: note });
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
    var pays = list.filter(function (p) { return p && kpqdIsPay(p) && (p.decId === ev.decId || (!p.decId && p.ycbtCode === ev.claimCode)) && kpqdSt(p) !== 'Đã hủy'; });
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
        // Tạm ứng: thu hồi phần tạm ứng đã chi vượt Tổng số tiền bồi thường sau sửa chữa
        var advPaid = advs.filter(function (p) { return kpqdPaid(p) > 0; });
        var advPaidTotal = advPaid.reduce(function (s, p) { return s + kpqdPaid(p); }, 0);
        var advNeedNow = advPaid.reduce(function (s, p) { return s + (kpqdRecovSc(p) ? kpqdNeed(p) : 0); }, 0);
        var advNeedNew = Math.max(0, advPaidTotal - B);
        if (advNeedNew > advNeedNow) {
            var add = advNeedNew - advNeedNow;
            advPaid.forEach(function (p) {
                if (!add) return;
                var st = kpqdSt(p); if (st === 'Đã thu hồi' || (st === 'Chờ thu hồi' && !kpqdRecovSc(p))) return;
                var room = kpqdPaid(p) - (kpqdRecovSc(p) ? kpqdNeed(p) : 0), x = Math.min(add, room);
                if (x > 0) { kpqdToRecover(ev, p, x); add -= x; mark(p); }
            });
        } else if (advNeedNew < advNeedNow) {
            var less = advNeedNow - advNeedNew;
            advPaid.forEach(function (p) {
                if (!less || !kpqdRecovSc(p) || kpqdSt(p) !== 'Chờ thu hồi') return;
                less = kpqdReduceRecover(ev, p, less, mark);
            });
        }
        // Chi trả
        var P = Math.max(0, B - adv);
        var committed = function (p) {
            var st = kpqdSt(p);
            if (st === 'Chờ thu hồi' || st === 'Đã thu hồi') return kpqdRecovSc(p) ? kpqdPaid(p) - kpqdNeed(p) : 0;
            if (st === 'Trả lại ngân sách nhà nước') return p.kpqdCommitted != null ? kpqdN(p.kpqdCommitted) : kpqdN(p.amount);
            if (st === 'Hoàn thành') return kpqdPaid(p) || kpqdN(p.amount);
            return kpqdN(p.amount); // Chờ chi trả đã chi một phần: Thông báo chi trả đã ký theo Số tiền của bản ghi
        };
        var D = P - F.reduce(function (s, p) { return s + committed(p); }, 0);
        if (D > 0) {
            F.forEach(function (p) { if (D > 0 && kpqdSt(p) === 'Chờ thu hồi' && kpqdRecovSc(p)) D = kpqdReduceRecover(ev, p, D, mark); });
        }
        if (D > 0) {
            if (U.length) {
                var u = U[0], st0 = kpqdSt(u), old = kpqdN(u.amount);
                u.amount = D; kpqdInfoPatch(ev, u);
                if (u.kptbDec) u.kptbDec.net = D;
                if (old !== D && ['Chờ duyệt', 'Chờ chi trả', 'Bị trả lại'].indexOf(st0) >= 0) { kpqdResetNotice(u); u.status = 'Chờ thông báo chi trả'; }
                kpqdBasis(ev, u, st0, kpqdSt(u), { amountBefore: old, amountAfter: D });
                kpqdHist(u, 'Cập nhật theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền chi trả từ ' + kpqdFmt(old) + ' thành ' + kpqdFmt(D) + ' đồng. Trạng thái trước: ' + st0 + '; trạng thái sau: ' + kpqdSt(u) + '.');
                mark(u);
                U.slice(1).forEach(function (p) { kpqdCancelUnpaid(ev, p, mark); });
            } else if (pays.length && typeof kptbBuildRecord === 'function') {
                var n = ev.n || 1;
                var dec = Object.assign({}, ev.after, { decId: ev.decId, claimCode: ev.claimCode, decNo: ev.decNo, issueDate: ev.decDate, unitName: ((pays[0].kptbDec || {}).unitName) || pays[0].agency || '', net: D,
                    sourceLabel: 'QĐ sửa chữa, bổ sung' + (ev.docNo ? ' số ' + ev.docNo : '') + ' của Quyết định giải quyết bồi thường', at: kpqdNow() });
                var rec = kptbBuildRecord(dec, { id: 'P_TB_' + ev.decId + '_SCBS' + n, date: (ev.docDate || '') || (typeof kptbToday === 'function' ? kptbToday() : ''), nycRole: pays[0].nycRole || 'Người bị thiệt hại' });
                rec.amount = D;
                kpqdBasis(ev, rec, '', 'Chờ thông báo chi trả', { amountBefore: 0, amountAfter: D, chiThem: true });
                kpqdHist(rec, 'Tạo bản ghi chi trả thêm theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền chi trả thêm: ' + kpqdFmt(D) + ' đồng.');
                list.unshift(rec);
                mark(rec);
            }
        } else {
            U.forEach(function (p) { if (kpqdN(p.amount) > 0) kpqdCancelUnpaid(ev, p, mark); });
            var R = -D;
            // Chờ chi trả đã chi một phần: giảm Số tiền của bản ghi
            F.forEach(function (p) {
                if (R <= 0 || kpqdSt(p) !== 'Chờ chi trả') return;
                var room = kpqdN(p.amount) - kpqdPaid(p), x = Math.min(R, room); if (x <= 0) return;
                var old = kpqdN(p.amount); p.amount = old - x; R -= x;
                if (p.amount <= kpqdPaid(p)) p.status = 'Hoàn thành';
                kpqdBasis(ev, p, 'Chờ chi trả', kpqdSt(p), { amountBefore: old, amountAfter: p.amount });
                kpqdHist(p, 'Cập nhật theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền chi trả từ ' + kpqdFmt(old) + ' thành ' + kpqdFmt(p.amount) + ' đồng; trạng thái sau: ' + kpqdSt(p) + '.');
                mark(p);
            });
            // Trả lại ngân sách nhà nước: trừ phần đã trả lại ngân sách nhà nước (không thay đổi bản ghi)
            F.forEach(function (p) {
                if (R <= 0 || kpqdSt(p) !== 'Trả lại ngân sách nhà nước') return;
                var c = committed(p), room = c - kpqdPaid(p), x = Math.min(R, Math.max(0, room)); if (x <= 0) return;
                p.kpqdCommitted = c - x; R -= x;
            });
            // Còn lại: thu hồi các khoản đã chi
            F.forEach(function (p) {
                if (R <= 0) return;
                var st = kpqdSt(p); if (st === 'Đã thu hồi' || (st === 'Chờ thu hồi' && !kpqdRecovSc(p))) return;
                var room = kpqdPaid(p) - (kpqdRecovSc(p) && st === 'Chờ thu hồi' ? kpqdNeed(p) : 0), x = Math.min(R, room); if (x <= 0) return;
                if (st === 'Trả lại ngân sách nhà nước') p.kpqdCommitted = Math.max(0, committed(p) - x);
                kpqdToRecover(ev, p, x); R -= x; mark(p);
            });
        }
    }
    return changed;
}
function kpqdCancelUnpaid(ev, p, mark) {
    var st = kpqdSt(p);
    var c = kpqdCancelApprovals(p, KPQD_LBL[ev.kind]);
    p.status = 'Đã hủy';
    kpqdBasis(ev, p, st, 'Đã hủy', { amountBefore: kpqdN(p.amount) });
    kpqdHist(p, ev.kind === 'huy' ? 'Hủy do Hủy QĐ' : 'Hủy theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Trạng thái trước: ' + st + '.' + (c.length ? ' Hủy phiếu trình ' + c.join(', ') + ' đang chờ duyệt.' : ''));
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
    kpqdBasis(ev, p, before, kpqdSt(p), { amountBefore: need, amountAfter: newNeed, statusBeforeRecover: back, recoverNeed: newNeed });
    kpqdHist(p, 'Cập nhật thu hồi theo QĐ sửa chữa, bổ sung', 'Căn cứ: ' + kpqdRef(ev) + '. Số tiền phải thu hồi từ ' + kpqdFmt(need) + ' thành ' + kpqdFmt(newNeed) + ' đồng; trạng thái sau: ' + kpqdSt(p) + '.');
    mark(p);
    return amt - x;
}

// ---------- Hủy QĐ ----------
function kpqdApplyHuy(list, ev) {
    var changed = [];
    var mark = function (p) { if (changed.indexOf(p) < 0) changed.push(p); };
    list.forEach(function (p) {
        if (!p) return;
        var mine = (kpqdIsPay(p) && (p.decId === ev.decId || (!p.decId && p.ycbtCode === ev.claimCode))) || (kpqdIsAdv(p) && p.ycbtCode === ev.claimCode);
        if (!mine) return;
        var st = kpqdSt(p);
        if (['Đã hủy', 'Đã thu hồi', 'Trả lại ngân sách nhà nước'].indexOf(st) >= 0) return;
        if (st === 'Chờ thu hồi' && !kpqdRecovSc(p)) return;
        var paid = kpqdPaid(p);
        if (paid > 0) {
            p.status = 'Chờ thu hồi';
            p.recovery = Object.assign(p.recovery || {}, { basisDecisionNo: ev.docNo || '', basisDecisionDate: ev.docDate || '' });
            delete p.recovery.amountAfter;
            p.statusChangeBasis = { decisionType: KPQD_TYPE.huy, decisionNo: ev.docNo || '', decisionDate: ev.docDate || '', reason: ev.content || '', statusBefore: st, statusAfter: 'Chờ thu hồi', changedAt: kpqdNow() };
            kpqdBasis(ev, p, st, 'Chờ thu hồi', { amountBefore: paid, recoverNeed: paid });
            kpqdHist(p, 'Chuyển Chờ thu hồi do Hủy QĐ', 'Căn cứ: ' + kpqdRef(ev) + '. Trạng thái trước: ' + st + '. Số tiền đã chi: ' + kpqdFmt(paid) + ' đồng; thu hồi toàn bộ.');
            mark(p);
        } else {
            kpqdCancelUnpaid(ev, p, mark);
        }
    });
    return changed;
}

// ---------- Áp hàng đợi ----------
function kpqdApplyAll(list) {
    var q = kpqdRead(KPQD_EVT_KEY, []), done = kpqdRead(KPQD_DONE_KEY, []);
    if (!Array.isArray(q) || !q.length || !Array.isArray(list)) return 0;
    if (!Array.isArray(done)) done = [];
    var n = 0;
    q.forEach(function (ev) {
        if (!ev || !ev.id || done.indexOf(ev.id) >= 0) return;
        var ch = ev.kind === 'huy' ? kpqdApplyHuy(list, ev) : kpqdApplySc(list, ev);
        done.push(ev.id); n += ch.length || 0.5;
    });
    kpqdWrite(KPQD_DONE_KEY, done);
    return Math.ceil(n);
}

// ---------- Hiển thị (trang Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường) ----------
function kpqdHas(item) { return !!item && !!item.kpqd && !!KPQD_LBL[item.kpqd.kind]; }
function kpqdSub(item) { return KPQD_LBL[item.kpqd.kind]; }
function kpqdBasisCard(item) {
    var b = item.kpqd || {};
    var fld = typeof kpdtFld === 'function' ? kpdtFld : function (l, v) { return '<div><b>' + l + '</b> ' + v + '</div>'; };
    var adv = typeof kpIsAdv === 'function' && kpIsAdv(item);
    var ref = (b.kind === 'huy' ? 'QĐ hủy' : 'QĐ sửa chữa, bổ sung') + (b.decisionNo ? ' số ' + b.decisionNo : '') + (b.decisionDate ? ' ngày ' + b.decisionDate : '');
    var body = '<div class="kpdt-grid">'
        + fld('Loại quyết định', kpqdE(b.decisionType))
        + fld('Quyết định làm căn cứ', kpqdE(ref))
        + fld('Quyết định giải quyết bồi thường', kpqdE((b.baseDecNo || '-') + (b.baseDecDate ? ' ngày ' + b.baseDecDate : '')))
        + fld('File quyết định', b.file ? '<i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> ' + kpqdE(b.file) + ' <button type="button" class="btn btn-secondary btn-sm" onclick="showToast(\'Giả lập mở tệp: ' + kpqdE(b.file).replace(/'/g, '') + '\', \'info\')"><i class="fa-solid fa-eye"></i> Xem file</button>' : '')
        + fld(b.kind === 'huy' ? 'Lý do hủy Quyết định' : 'Nội dung sửa chữa, bổ sung', kpqdE(b.content).replace(/\n/g, '<br>'), true)
        + (b.kind === 'sc' && b.totalBefore != null ? fld('Tổng số tiền bồi thường theo Quyết định trước / sau sửa chữa, bổ sung (VNĐ)', kpqdFmt(b.totalBefore) + ' → ' + kpqdFmt(b.totalAfter)) : '')
        + (b.amountAfter != null ? fld(b.recoverNeed != null && b.kind === 'sc' ? 'Số tiền phải thu hồi trước / sau (VNĐ)' : (adv ? 'Số tiền của bản ghi trước / sau (VNĐ)' : 'Số tiền chi trả trước / sau (VNĐ)'), kpqdFmt(b.amountBefore) + ' → ' + kpqdFmt(b.amountAfter)) : '')
        + fld('Trạng thái trước', kpqdE(b.statusBefore))
        + fld('Thời điểm chuyển trạng thái', kpqdE(b.changedAt))
        + '</div>';
    return typeof kpdtCard === 'function' ? kpdtCard('fa-scale-balanced', 'Căn cứ thay đổi trạng thái', body, 'kpqdBasisCard') : body;
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
        window[fn] = function (item) { var h = orig.apply(this, arguments); return kpqdHas(item) ? kpqdBasisCard(item) + h : h; };
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
