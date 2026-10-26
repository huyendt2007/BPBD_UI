/*
 * Liên thông Đình chỉ giải quyết (Giải quyết yêu cầu bồi thường) -> Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường (prefix kpdc)
 * - Thời điểm: Quyết định đình chỉ giải quyết bồi thường (Mẫu 25/BTNN) được ban hành: Lãnh đạo cấp cuối Ký duyệt hoặc Ký ngoài ban hành
 *   (áp dụng cả vụ việc đình chỉ từ trạng thái Chờ thực thi). Không chặn đình chỉ vì lý do kinh phí.
 * - Bản ghi kinh phí của vụ việc (theo Mã hồ sơ GQBT = ycbtCode):
 *   + Đã chi (Hoàn thành hoặc Số tiền đã chi > 0) -> "Chờ thu hồi".
 *   + Đang dở, chưa chi đồng nào (Chờ lập đề nghị, Chờ thông báo chi trả, Đề nghị cấp bổ sung kinh phí, Chờ duyệt, Bị từ chối, Chờ chi trả) -> "Đã hủy";
 *     phiếu trình đang Chờ duyệt (Thông báo chi trả / QĐ tạm ứng) bị hủy theo (không còn ở tab Chờ xử lý của Lãnh đạo).
 *   + Đã hủy, Đã thu hồi, Chờ thu hồi, Sung quỹ nhà nước: giữ nguyên.
 * - Lưu căn cứ trên bản ghi kinh phí (statusBasis) + lịch sử (kpdcHistory); không phụ thuộc trang khác.
 * - Dùng chung 02 trang:
 *   + quan_ly_boi_thuong.html: gọi ngay khi ban hành Ký ngoài (bọc dcgqIssueOffline) / khi nhận kết quả Ký duyệt cấp cuối (kpdcOnApplied, gọi từ gqApplyRecord);
 *     ghi thẳng kho 'proposalsList' (nếu đã có).
 *   + quan_ly_kinh_phi_boi_thuong.html: khi tải trang rà vụ việc Đình chỉ giải quyết (claimsList + kho luồng BTNN_WF) để áp bù; dữ liệu mẫu;
 *     dòng phụ "Do đình chỉ giải quyết" dưới badge lưới; khối "Căn cứ thay đổi trạng thái" tại MH10 / MH23; lịch sử xử lý.
 */
var KPDC_SRC = 'dinhChi';
var KPDC_CASE_STATUS = 'Đình chỉ giải quyết';
var KPDC_KIND = 'Đình chỉ giải quyết bồi thường';
var KPDC_REASON = 'Vụ việc bị đình chỉ giải quyết theo Quyết định đình chỉ giải quyết bồi thường';
var KPDC_CANCEL = 'Đã hủy';
var KPDC_RECOVER = 'Chờ thu hồi';
var KPDC_SUB = 'Do đình chỉ giải quyết';
var KPDC_KEEP = ['Đã hủy', 'Đã thu hồi', 'Chờ thu hồi', 'Sung quỹ nhà nước', 'Đã sung quỹ'];

function kpdcE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function kpdcRead(key, fb) { try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
function kpdcNum(v) { return typeof v === 'number' ? v : (Number(String(v == null ? '' : v).replace(/[^\d]/g, '')) || 0); }
function kpdcNorm(st) { return st === 'Đã sung quỹ' ? 'Sung quỹ nhà nước' : (st === 'Chi trả một phần' ? 'Chờ chi trả' : st); }
function kpdcNow() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
}
// Số/Ngày quyết định hợp lệ (bỏ giá trị khung "     /QĐ-", "--")
function kpdcVal(v) { var s = String(v == null ? '' : v).trim(); return s && s !== '--' && s !== '-' && !/^\//.test(s) && !/^QĐ-?$/i.test(s) ? s : ''; }
function kpdcSignedName(name) { var s = String(name || ''); if (!s) return ''; return /_da_ky\.[^.]+$/i.test(s) ? s : s.replace(/\.[^.]+$/, '') + '_da_ky.pdf'; }

// ---------- Xác định "đã chi" / "đang dở" ----------
// Đã chi: Hoàn thành, hoặc Số tiền đã chi > 0 (Cập nhật chi trả: payoutAmountReal / kptbPayment.amount)
function kpdcPaidAmount(p) { return Math.max(kpdcNum(p.payoutAmountReal), p.kptbPayment ? kpdcNum(p.kptbPayment.amount) : 0); }
function kpdcIsPaid(p) { return p.status === 'Hoàn thành' || p.status === 'Chi trả một phần' || kpdcPaidAmount(p) > 0; }

// ---------- Căn cứ (Quyết định đình chỉ) ----------
function kpdcVvOf(claim) {
    var vv = String((claim && claim.maVuViec) || '').trim();
    if (/^VVBT-/i.test(vv)) return vv;
    try { var W = window.BTNN_WF; return (W && W.vuViecOf && W.vuViecOf(claim.code, { create: false })) || ''; } catch (e) { return ''; }
}
// claim: { code, maVuViec, dinhChi }; rec: hồ sơ luồng (module YCBT) nếu có
function kpdcBasisOf(claim, rec, at) {
    var dc = (claim && claim.dinhChi) || (rec && rec.gqData && rec.gqData.dinhChi) || {};
    var a = rec && rec.approval && rec.approval.kind === KPDC_KIND ? rec.approval : null;
    var sd = (a && a.signDoc) || {};
    var method = dc.signingMethod || sd.method || '';
    var file = dc.signedFile || (method === 'Ký số' ? kpdcSignedName(sd.signedFile || sd.file || dc.fileName) : (dc.fileName || sd.file || ''));
    return {
        source: KPDC_SRC, reason: KPDC_REASON, changedAt: at || kpdcNow(),
        decisionType: 'Quyết định đình chỉ giải quyết bồi thường',
        decisionNo: kpdcVal(dc.docNumber || sd.docNumber), decisionDate: kpdcVal(dc.docDate || sd.docDate),
        file: file ? { name: file, fileId: dc.signedFileId || '' } : null,
        signingMethod: method, canCu: dc.reasonText || '',
        claimCode: claim.code, vvCode: kpdcVvOf(claim)
    };
}

// ---------- Áp liên thông trên 01 danh sách bản ghi kinh phí; trả về các bản ghi đã đổi ----------
function kpdcApply(list, claim, rec) {
    if (!Array.isArray(list) || !claim || !claim.code) return [];
    var at = kpdcNow();
    var basis = null;
    var changed = [];
    list.forEach(function (p) {
        if (!p || p.ycbtCode !== claim.code) return;
        var st = kpdcNorm(p.status);
        if (KPDC_KEEP.indexOf(st) >= 0) return;
        if (p.statusBasis && p.statusBasis.source === KPDC_SRC) return;
        basis = basis || kpdcBasisOf(claim, rec, at);
        var paid = kpdcIsPaid(p);
        var after = paid ? KPDC_RECOVER : KPDC_CANCEL;
        // Hủy phiếu trình đang chờ duyệt (Thông báo chi trả / QĐ tạm ứng)
        var cancelled = [];
        [['kptbApproval', 'Thông báo chi trả'], ['qdtuApproval', 'QĐ tạm ứng kinh phí']].forEach(function (x) {
            var ap = p[x[0]];
            if (ap && ap.pending) { ap.pending = null; ap.cancelled = { at: at, reason: KPDC_REASON }; cancelled.push(x[1]); }
        });
        if (st === 'Chờ duyệt' && !cancelled.length) cancelled.push('Đề nghị kinh phí');
        p.statusBasis = Object.assign({}, basis, { statusBefore: st, statusAfter: after });
        p.status = after;
        if (!Array.isArray(p.kpdcHistory)) p.kpdcHistory = [];
        var note = 'Căn cứ: Quyết định đình chỉ giải quyết bồi thường' + (basis.decisionNo ? ' số ' + basis.decisionNo : '') + (basis.decisionDate ? ' ngày ' + basis.decisionDate : '')
            + ' (' + (basis.vvCode ? 'Mã vụ việc ' + basis.vvCode + ', ' : '') + 'Mã hồ sơ GQBT ' + claim.code + '). Trạng thái trước: ' + st + '.'
            + (paid ? ' Số tiền đã chi: ' + kpdcPaidAmount(p).toLocaleString('vi-VN') + ' đồng.' : '')
            + (cancelled.length ? ' Hủy phiếu trình ' + cancelled.join(', ') + ' đang chờ duyệt.' : '');
        p.kpdcHistory.push({ at: at, userId: '', userName: 'Hệ thống', action: paid ? 'Chuyển Chờ thu hồi do đình chỉ giải quyết' : 'Hủy do đình chỉ giải quyết', note: note });
        changed.push(p);
    });
    return changed;
}
// Áp trên kho 'proposalsList' (trang khác phân hệ Kinh phí). Kho chưa có: phân hệ Kinh phí tự áp bù khi tải trang.
function kpdcApplyStored(claim, rec) {
    var list = kpdcRead('proposalsList', null);
    if (!Array.isArray(list) || !list.length) return [];
    var ch = kpdcApply(list, claim, rec);
    if (ch.length) { try { localStorage.setItem('proposalsList', JSON.stringify(list)); } catch (e) { /* bỏ qua */ } }
    return ch;
}
function kpdcRecOf(code) { try { var W = window.BTNN_WF; return W && W.getRecord ? W.getRecord(code) : null; } catch (e) { return null; } }

// ---------- Trang Giải quyết yêu cầu bồi thường ----------
// Gọi từ gqApplyRecord khi nhận kết quả Ký duyệt cấp cuối (Loại trình Đình chỉ giải quyết bồi thường)
function kpdcOnApplied(c, r, st) {
    if (st !== KPDC_CASE_STATUS || !c) return;
    kpdcApplyStored(c, r || kpdcRecOf(c.code));
}
// Ký ngoài: Ban hành văn bản -> vụ việc "Đình chỉ giải quyết" -> áp liên thông ngay
(function () {
    if (typeof window.dcgqIssueOffline !== 'function') return;
    var orig = window.dcgqIssueOffline;
    window.dcgqIssueOffline = function () {
        var c = typeof dcgqClaim !== 'undefined' ? dcgqClaim : null;
        var res = orig.apply(this, arguments);
        if (c && c.status === KPDC_CASE_STATUS) kpdcApplyStored(c, kpdcRecOf(c.code));
        return res;
    };
})();

// ---------- Trang Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường ----------
function kpdcIsKpPage() { return typeof proposalsList !== 'undefined' && typeof renderProposalsTable === 'function' && typeof kpdtRender === 'function'; }

// Vụ việc Đình chỉ giải quyết đã ban hành Quyết định (có dữ liệu dinhChi): claimsList (màn Giải quyết YCBT ghi) + kho luồng BTNN_WF
function kpdcStoppedClaims() {
    var map = {};
    var claims = kpdcRead('claimsList', []);
    (Array.isArray(claims) ? claims : []).forEach(function (c) {
        if (c && c.code && c.status === KPDC_CASE_STATUS && c.dinhChi) map[c.code] = { claim: c, rec: null };
    });
    var recs = [];
    try { recs = (window.BTNN_WF && window.BTNN_WF.loadRecords()) || []; } catch (e) { recs = []; }
    recs.forEach(function (r) {
        if (!r || r.module !== 'YCBT' || !r.code || r.status !== KPDC_CASE_STATUS) return;
        var dc = r.gqData && r.gqData.dinhChi;
        if (!dc) return;
        if (map[r.code]) { map[r.code].rec = r; return; }
        map[r.code] = { claim: { code: r.code, maVuViec: r.maVuViec || '', dinhChi: dc }, rec: r };
    });
    return map;
}
function kpdcSyncAll() {
    var map = kpdcStoppedClaims();
    var n = 0;
    Object.keys(map).forEach(function (code) { n += kpdcApply(proposalsList, map[code].claim, map[code].rec).length; });
    return n;
}

// Dữ liệu mẫu: vụ việc Đình chỉ giải quyết BT-2026-407 (Ký số, có Số/Ngày QĐ), BT-2026-408 (Ký ngoài, không Số/Ngày QĐ);
// BT-2026-002 (Chờ thực thi): thêm 01 Thông báo chi trả đang Chờ duyệt để thử Đình chỉ -> hủy phiếu trình
function kpdcSeedBasis(code, vv, no, date, file, method, at, before, after) {
    return { source: KPDC_SRC, reason: KPDC_REASON, changedAt: at, decisionType: 'Quyết định đình chỉ giải quyết bồi thường', decisionNo: no, decisionDate: date,
        file: { name: file, fileId: '' }, signingMethod: method, canCu: '', claimCode: code, vvCode: vv, statusBefore: before, statusAfter: after };
}
function kpdcSeedHist(at, paid, note) {
    return [{ at: at, userId: '', userName: 'Hệ thống', action: paid ? 'Chuyển Chờ thu hồi do đình chỉ giải quyết' : 'Hủy do đình chỉ giải quyết', note: note }];
}
function kpdcSeed() {
    var added = 0;
    var has = function (id) { return proposalsList.some(function (p) { return p && p.id === id; }); };
    var f7 = 'Mau_25_BTNN_Quyet_dinh_dinh_chi_VVBT-2026-407_da_ky.pdf', f8 = 'QD_dinh_chi_giai_quyet_BT-2026-408_ky_ngoai.pdf';
    var base7 = { ycbtCode: 'BT-2026-407', nycName: 'Lâm Văn Tài', nycRole: 'Người bị thiệt hại', agency: 'UBND phường Tây Hồ', cqCap: 'UBND phường Tây Hồ', source: 'Ngân sách địa phương', user: 'Nguyễn Văn Chuyên Viên', files: [] };
    var list = [
        Object.assign({}, base7, {
            id: 'P_KPDC_S1', code: 'KP-2026-901', type: 'Cấp tạm ứng', amount: 35000000, date: '06/10/2026', status: KPDC_RECOVER,
            notes: 'Tạm ứng kinh phí bồi thường đã chi trả; vụ việc bị đình chỉ giải quyết nên chuyển Chờ thu hồi.',
            advApproveTinhThan: 20000000, advApproveKhac: 15000000, signMethod: 'Ký ngoài', docNo: '78/QĐ-UBND', docDate: '07/10/2026', signedFile: 'QD_tam_ung_BT-2026-407_ky_ngoai.pdf',
            approvedDate: '07/10/2026 10:00', approvedLeader: 'Võ Thanh Sơn', payoutDate: '09/10/2026', payoutAmountReal: 35000000, payoutMethod: 'Nhận qua chuyển khoản', payoutRecName: 'Lâm Văn Tài',
            statusBasis: kpdcSeedBasis('BT-2026-407', 'VVBT-2026-407', '25/QĐ-UBND', '15/10/2026', f7, 'Ký số', '15/10/2026 16:20', 'Hoàn thành', KPDC_RECOVER),
            kpdcHistory: kpdcSeedHist('15/10/2026 16:20', true, 'Căn cứ: Quyết định đình chỉ giải quyết bồi thường số 25/QĐ-UBND ngày 15/10/2026 (Mã vụ việc VVBT-2026-407, Mã hồ sơ GQBT BT-2026-407). Trạng thái trước: Hoàn thành. Số tiền đã chi: 35.000.000 đồng.')
        }),
        Object.assign({}, base7, {
            id: 'P_KPDC_S2', code: 'KP-2026-902', type: 'Cấp tạm ứng', amount: 15000000, date: '12/10/2026', status: KPDC_CANCEL,
            notes: 'Tạm ứng kinh phí bồi thường đợt 2 chưa chi trả; vụ việc bị đình chỉ giải quyết nên tự hủy.',
            advApproveTinhThan: 10000000, advApproveKhac: 5000000, signMethod: 'Ký ngoài', docNo: '84/QĐ-UBND', docDate: '13/10/2026', signedFile: 'QD_tam_ung_dot_2_BT-2026-407_ky_ngoai.pdf',
            approvedDate: '13/10/2026 09:30', approvedLeader: 'Võ Thanh Sơn', payoutMethod: 'Nhận qua chuyển khoản', payoutRecName: 'Lâm Văn Tài',
            statusBasis: kpdcSeedBasis('BT-2026-407', 'VVBT-2026-407', '25/QĐ-UBND', '15/10/2026', f7, 'Ký số', '15/10/2026 16:20', 'Chờ chi trả', KPDC_CANCEL),
            kpdcHistory: kpdcSeedHist('15/10/2026 16:20', false, 'Căn cứ: Quyết định đình chỉ giải quyết bồi thường số 25/QĐ-UBND ngày 15/10/2026 (Mã vụ việc VVBT-2026-407, Mã hồ sơ GQBT BT-2026-407). Trạng thái trước: Chờ chi trả.')
        }),
        {
            id: 'P_KPDC_S3', code: 'KP-2026-903', type: 'Cấp tạm ứng', ycbtCode: 'BT-2026-408', nycName: 'Trương Thị Mai', nycRole: 'Người bị thiệt hại', agency: 'UBND phường Thanh Xuân', cqCap: 'UBND phường Thanh Xuân',
            source: 'Ngân sách địa phương', user: 'Nguyễn Văn Chuyên Viên', files: [], amount: 40000000, date: '09/10/2026', status: KPDC_CANCEL,
            notes: 'Đề nghị tạm ứng chưa lập; vụ việc bị đình chỉ giải quyết (Ký ngoài) nên tự hủy.', advApproveTinhThan: 25000000, advApproveKhac: 15000000,
            statusBasis: kpdcSeedBasis('BT-2026-408', 'VVBT-2026-408', '', '', f8, 'Ký ngoài', '20/10/2026 10:15', 'Chờ lập đề nghị', KPDC_CANCEL),
            kpdcHistory: kpdcSeedHist('20/10/2026 10:15', false, 'Căn cứ: Quyết định đình chỉ giải quyết bồi thường (Mã vụ việc VVBT-2026-408, Mã hồ sơ GQBT BT-2026-408). Trạng thái trước: Chờ lập đề nghị.')
        }
    ];
    list.forEach(function (it) { if (!has(it.id)) { proposalsList.push(it); added++; } });
    // BT-2026-002: Thông báo chi trả Chờ duyệt (Loại trình Thông báo chi trả), dùng để thử Đình chỉ (Ký ngoài) tại màn Giải quyết YCBT
    if (!has('P_KPDC_S4') && typeof kptbBuildRecord === 'function' && typeof kptbLevels === 'function') {
        var dec = { decId: 'KPDC-S4', claimCode: 'BT-2026-002', nycName: 'Trần Thị B', nycAddress: 'Số 88 đường Lạch Tray, Ngô Quyền, Hải Phòng', unitId: '', unitName: 'Tòa án nhân dân TP. Hà Nội',
            decNo: '61/QĐ-TA', issueDate: '20/10/2026', total: 150000000, advance: 0, net: 150000000,
            recipient: { name: 'Trần Thị B', idNo: '002092003845', account: '190333444555', bank: 'Techcombank', branch: 'Chi nhánh Hải Phòng' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: 'TRẦN THỊ B', account: '190333444555', bank: 'Techcombank', branch: 'Chi nhánh Hải Phòng' }, at: '09:00 20/10/2026' };
        var levels = kptbLevels(dec.claimCode);
        if (levels.length) {
            var it = kptbBuildRecord(dec, { id: 'P_KPDC_S4', code: 'KP-2026-904', nycRole: 'Người thừa kế của người bị thiệt hại' });
            var assignees = levels.map(function (lv) { return lv.leaders[0] || ''; });
            it.kptbNotice = { signMethod: 'Ký số', docNo: '40/TB-TA', docDate: '22/10/2026', time: '', place: '', assignees: assignees, docFile: { name: 'Mau_32_BTNN_Thong_bao_chi_tra_BT-2026-002.doc', generated: true } };
            it.kptbApproval = { kind: 'Thông báo chi trả', path: levels.map(function (l) { return l.unitId; }), assignees: assignees, level: 0, steps: [], content: 'Kính trình Lãnh đạo ký Thông báo chi trả tiền bồi thường.', submittedBy: 'canbonv', submittedAt: '10:00 22/10/2026', pending: { since: '10:00 22/10/2026' } };
            it.status = 'Chờ duyệt';
            it.user = 'Nguyễn Văn Cán Bộ';
            it.kptbHistory.push({ at: '10:00 22/10/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Trình ký', note: 'Thông báo chi trả. Nội dung: Kính trình Lãnh đạo ký Thông báo chi trả tiền bồi thường.' });
            proposalsList.unshift(it);
            added++;
        }
    }
    return added;
}

// ---------- Hiển thị ----------
function kpdcIsDc(item) { return !!item && !!item.statusBasis && item.statusBasis.source === KPDC_SRC && [KPDC_CANCEL, KPDC_RECOVER].indexOf(item.status) >= 0; }
function kpdcClaimLink(code, label) {
    if (!code) return '';
    return '<a href="quan_ly_boi_thuong.html?id=' + encodeURIComponent(code) + '" target="_blank" rel="noopener" style="color:var(--primary-light); text-decoration:underline;">' + kpdcE(label || code) + '</a>';
}
var kpdcCurFile = null;
function kpdcFileAct(act) {
    var f = kpdcCurFile; if (!f) return;
    var blob = f.fileId && typeof tlktBlob === 'function' ? tlktBlob(f.fileId) : null;
    if (act === 'view') {
        if (blob && typeof btnnOpenUploadedFile === 'function') { btnnOpenUploadedFile({ name: f.name, raw: blob }); return; }
        showToast('Giả lập mở tệp: ' + f.name, 'info');
        return;
    }
    if (blob) { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = f.name; document.body.appendChild(a); a.click(); a.remove(); return; }
    showToast('Giả lập tải tệp: ' + f.name, 'info');
}
function kpdcBasisCard(item) {
    var b = item.statusBasis || {};
    kpdcCurFile = b.file && b.file.name ? b.file : null;
    var fld = function (label, v, full) { return '<div class="kpdt-fld' + (full ? ' kpdt-full' : '') + '"><span class="form-label">' + label + '</span><div class="kpdt-ro">' + (v === '' || v == null ? '-' : v) + '</div></div>'; };
    var file = kpdcCurFile
        ? '<div class="kpdt-file"><i class="fa-solid fa-file-pdf kpdt-file-ico"></i><div class="kpdt-file-info"><div class="kpdt-file-name">' + kpdcE(kpdcCurFile.name) + '</div><div class="kpdt-file-meta">Quyết định đình chỉ giải quyết bồi thường' + (b.signingMethod ? ' - ' + kpdcE(b.signingMethod === 'Ký ngoài' ? 'Bản ký ngoài' : 'Bản đã ký số') : '') + '</div></div>'
          + '<div class="kpdt-file-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="kpdcFileAct(\'view\')"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm" onclick="kpdcFileAct(\'download\')"><i class="fa-solid fa-download"></i> Tải file</button></div></div>'
        : '<div class="kpdt-ro">-</div>';
    var body = '<div class="kpdt-grid">'
        + fld('Mã vụ việc', b.vvCode ? kpdcClaimLink(b.claimCode, b.vvCode) : '')
        + fld('Mã hồ sơ GQBT', kpdcClaimLink(b.claimCode))
        + fld('Lý do', kpdcE(b.reason), true)
        + fld('Thời điểm chuyển trạng thái', kpdcE(b.changedAt))
        + fld('Trạng thái trước', kpdcE(b.statusBefore))
        + fld('Số quyết định', kpdcE(b.decisionNo))
        + fld('Ngày quyết định', kpdcE(b.decisionDate))
        + '<div class="kpdt-fld kpdt-full"><span class="form-label">File quyết định</span>' + file + '</div></div>';
    return kpdtCard('fa-scale-balanced', 'Căn cứ thay đổi trạng thái', body, 'kpdcBasisCard');
}
// Lịch sử xử lý: chèn dòng liên thông (mới nhất ở đầu) vào khối Lịch sử xử lý của trang chi tiết
function kpdcHistInject(html, item) {
    var list = (item.kpdcHistory || []).slice().reverse();
    if (!list.length) return html;
    var rows = list.map(function (h) { return '<div class="kpdt-hist-row"><span style="color:#64748b;">' + kpdcE(h.at) + '</span><span style="font-weight:600;">' + kpdcE(h.userName) + '</span><span><b>' + kpdcE(h.action) + '</b>' + (h.note ? ': ' + kpdcE(h.note) : '') + '</span></div>'; }).join('');
    var out = html.replace(/Lịch sử xử lý \((\d+)\)/, function (m, n) { return 'Lịch sử xử lý (' + (Number(n) + list.length) + ')'; });
    out = out.replace('<div style="color:#64748b;">Chưa có lịch sử.</div>', '');
    var key = '<div class="kpdt-card-body">';
    var i = out.indexOf(key);
    return i < 0 ? out : out.slice(0, i + key.length) + rows + out.slice(i + key.length);
}
function kpdcDecorateTable() {
    var tbody = document.getElementById('proposalsTableBody'); if (!tbody) return;
    Array.prototype.forEach.call(tbody.rows, function (tr) {
        if (tr.cells.length < 11) return; // Lưới MH01 11 cột: Trạng thái = cột kề cuối
        var code = tr.cells[1].innerText.trim();
        var item = proposalsList.find(function (p) { return p && p.code === code; });
        if (!kpdcIsDc(item)) return;
        var stCell = tr.cells[tr.cells.length - 2];
        if (!stCell.querySelector('.kpdc-sub')) stCell.insertAdjacentHTML('beforeend', '<div class="wf-sub kpdc-sub">' + KPDC_SUB + '</div>');
    });
}

// ---------- Bọc chức năng sẵn có của trang Kinh phí ----------
(function () {
    if (!kpdcIsKpPage()) return;
    var origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () {
        var r = origSync.apply(this, arguments);
        var n = kpdcSeed() + kpdcSyncAll();
        if (n) saveProposalsToLocal();
        return r;
    };
    var origRender = renderProposalsTable;
    renderProposalsTable = function () { var r = origRender.apply(this, arguments); kpdcDecorateTable(); return r; };
    var wrapBody = function (fn) {
        var orig = window[fn]; if (typeof orig !== 'function') return;
        window[fn] = function (item) { var h = orig.apply(this, arguments); return kpdcIsDc(item) ? kpdcBasisCard(item) + h : h; };
    };
    wrapBody('kpdtAdvBody');
    wrapBody('kpdtPayBody');
    var origHist = kpdtHistHtml;
    kpdtHistHtml = function (item) { var h = origHist.apply(this, arguments); return item && item.kpdcHistory ? kpdcHistInject(h, item) : h; };
    var origSt = kpdtStatusHtml;
    kpdtStatusHtml = function (item) {
        var h = origSt.apply(this, arguments);
        return kpdcIsDc(item) ? h.replace(/<\/span>$/, '<div class="wf-sub">' + KPDC_SUB + '</div></span>') : h;
    };
    // Tệp văn bản của bản ghi Đã hủy do đình chỉ: theo trạng thái trước khi hủy (dự thảo / đã ký / không có)
    var wrapFile = function (fn) {
        var orig = window[fn]; if (typeof orig !== 'function') return;
        window[fn] = function (item) {
            var args = Array.prototype.slice.call(arguments);
            if (item && item.status === KPDC_CANCEL && kpdcIsDc(item) && item.statusBasis.statusBefore) args[0] = Object.assign({}, item, { status: item.statusBasis.statusBefore });
            return orig.apply(this, args);
        };
    };
    wrapFile('kpdtAdvFile');
    wrapFile('kpdtPayFile');
})();
