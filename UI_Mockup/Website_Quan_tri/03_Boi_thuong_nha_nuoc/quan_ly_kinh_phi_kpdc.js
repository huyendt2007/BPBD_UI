/*
 * Liên thông Đình chỉ giải quyết (Giải quyết yêu cầu bồi thường) -> Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường (prefix kpdc)
 * - Thời điểm: Quyết định đình chỉ giải quyết bồi thường (Mẫu 25/BTNN) được ban hành: Lãnh đạo cấp cuối Ký duyệt hoặc Ký ngoài ban hành
 *   (áp dụng mọi trạng thái nguồn được Đình chỉ, gồm cả Chờ chi trả và Hoàn thành; không giới hạn theo trạng thái vụ việc). Không chặn đình chỉ vì lý do kinh phí.
 * - Bản ghi kinh phí của vụ việc (theo Mã hồ sơ GQBT = ycbtCode):
 *   + Đã chi (Hoàn thành hoặc Số tiền đã chi > 0) -> "Chờ thu hồi".
 *   + Đang dở, chưa chi đồng nào (Chờ lập đề nghị, Chờ thông báo chi trả, Đề nghị cấp bổ sung kinh phí, Chờ duyệt, Bị trả lại, Chờ chi trả) -> "Đã hủy";
 *     phiếu trình đang Chờ duyệt (Thông báo chi trả / QĐ tạm ứng) bị hủy theo (không còn ở tab Chờ xử lý của Lãnh đạo).
 *   + Đã hủy, Đã thu hồi, Chờ thu hồi, Trả lại ngân sách nhà nước: giữ nguyên.
 *   + Đình chỉ / Dừng giải quyết chọn "Không thu hồi" (dinhChi.thuHoi / dungGiaiQuyet.thuHoi): khoản đã chi giữ nguyên trạng thái, ghi lịch sử "Không thu hồi do đình chỉ giải quyết bồi thường / do dừng giải quyết bồi thường. Lý do: ..."
 *     (đánh dấu kpdcNoRecover để không áp lại); khoản chưa chi vẫn Hủy. Không có lựa chọn (dữ liệu cũ) = Thu hồi. Áp dụng cả nguồn Dừng giải quyết.
 * - Lưu căn cứ trên bản ghi kinh phí (statusBasis) + lịch sử (kpdcHistory); không phụ thuộc trang khác.
 * - Dùng chung 02 trang:
 *   + quan_ly_boi_thuong.html: gọi ngay khi ban hành Ký ngoài (bọc dcgqIssueOffline) / khi nhận kết quả Ký duyệt cấp cuối (kpdcOnApplied, gọi từ gqApplyRecord);
 *     ghi thẳng kho 'proposalsList' (nếu đã có).
 *   + quan_ly_kinh_phi_boi_thuong.html: khi tải trang rà vụ việc Đình chỉ giải quyết (claimsList + kho luồng BTNN_WF) để áp bù; dữ liệu mẫu;
 *     dòng phụ "Do đình chỉ giải quyết" dưới badge lưới; khối "Căn cứ thay đổi trạng thái" tại MH10 / MH23; lịch sử xử lý.
 * - Dừng giải quyết (Thông báo dừng giải quyết yêu cầu bồi thường - Mẫu 05/BTNN) được ban hành: xử lý GIỐNG HỆT Đình chỉ giải quyết
 *   (nguồn 'dungGiaiQuyet', Lý do "Dừng giải quyết bồi thường", dòng phụ "Do dừng giải quyết bồi thường"); Ký ngoài gọi từ dgqIssueOffline.
 */
var KPDC_SRC = 'dinhChi';
var KPDC_CASE_STATUS = 'Đình chỉ giải quyết';
var KPDC_KIND = 'Đình chỉ giải quyết bồi thường';
var KPDC_REASON = 'Vụ việc bị đình chỉ giải quyết theo Quyết định đình chỉ giải quyết bồi thường';
var KPDC_CANCEL = 'Đã hủy';
var KPDC_RECOVER = 'Chờ thu hồi';
var KPDC_SUB = 'Do đình chỉ giải quyết';
var KPDC_KEEP = ['Đã hủy', 'Đã thu hồi', 'Chờ thu hồi', 'Trả lại ngân sách nhà nước', 'Đã sung quỹ', 'Sung quỹ nhà nước'];
var KPDC_NO_RECOVER = 'Không thu hồi';
var KPDC_NO_RECOVER_ACT = 'Không thu hồi kinh phí bồi thường đã chi';
// Nguồn liên thông: Đình chỉ giải quyết | Dừng giải quyết (cùng quy tắc tự hủy / Chờ thu hồi)
var KPDC_SOURCES = {
    dinhChi: { caseStatus: KPDC_CASE_STATUS, kind: KPDC_KIND, data: 'dinhChi', reason: KPDC_REASON, decisionType: 'Quyết định đình chỉ giải quyết bồi thường', sub: KPDC_SUB, act: 'đình chỉ giải quyết', noRecover: 'Không thu hồi do đình chỉ giải quyết bồi thường', doc: 'quyết định' },
    dungGiaiQuyet: { caseStatus: 'Dừng giải quyết', kind: 'Dừng giải quyết bồi thường', data: 'dungGiaiQuyet', reason: 'Dừng giải quyết bồi thường', decisionType: 'Thông báo dừng giải quyết yêu cầu bồi thường', sub: 'Do dừng giải quyết bồi thường', act: 'dừng giải quyết bồi thường', noRecover: 'Không thu hồi do dừng giải quyết bồi thường', doc: 'văn bản' }
};
function kpdcCfg(src) { return KPDC_SOURCES[src] || KPDC_SOURCES[KPDC_SRC]; }
function kpdcSrcOfStatus(st) { var k = Object.keys(KPDC_SOURCES).filter(function (x) { return KPDC_SOURCES[x].caseStatus === st; })[0]; return k || ''; }

function kpdcE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function kpdcRead(key, fb) { try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
function kpdcNum(v) { return typeof v === 'number' ? v : (Number(String(v == null ? '' : v).replace(/[^\d]/g, '')) || 0); }
function kpdcNorm(st) { return (st === 'Đã sung quỹ' || st === 'Sung quỹ nhà nước') ? 'Trả lại ngân sách nhà nước' : (st === 'Chi trả một phần' ? 'Chờ chi trả' : st); }
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
// Bản sao dữ liệu mẫu mặc định của phân hệ Kinh phí (các khoản đang hiệu lực: [id, Mã, Mã hồ sơ GQBT, Loại, Trạng thái, Số tiền đã chi])
// Dùng khi kho 'proposalsList' trống (người dùng chưa mở trang Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường): popup Đình chỉ / Dừng giải quyết
// vẫn xác định được khoản đã chi. Đồng bộ với seed quan_ly_kinh_phi_boi_thuong.js (v38_oct2026_kpdt) + kpdcSeed.
var KPDC_KP_SEED = [
    ['P_QDTU_S1', 'KP-2026-195', 'BT-2026-174', 'Cấp tạm ứng', 'Chờ duyệt', 0],
    ['P_TB_QD-HL4', 'KP-2026-194', 'BT-2026-194', 'Chi trả tiền bồi thường', 'Chờ duyệt', 0],
    ['P_TB_QD-HL3', 'KP-2026-193', 'BT-2026-193', 'Chi trả tiền bồi thường', 'Hoàn thành', 120000000],
    ['P_TB_QD-HL2', 'KP-2026-192', 'BT-2026-192', 'Chi trả tiền bồi thường', 'Chờ chi trả', 0],
    ['P_TB_QD-HL1', 'KP-2026-191', 'BT-2026-191', 'Chi trả tiền bồi thường', 'Chờ thông báo chi trả', 0],
    ['P_TB_KPTB-S6', 'KP-2026-104', 'BT-2023-041', 'Chi trả tiền bồi thường', 'Chờ chi trả', 0],
    ['P_TB_KPTB-S5', 'KP-2026-103', 'BT-2026-015', 'Chi trả tiền bồi thường', 'Chờ chi trả', 0],
    ['P_TB_KPTB-S4', 'KP-2026-102', 'BT-2026-034', 'Chi trả tiền bồi thường', 'Chờ duyệt', 0],
    ['P_TB_KPTB-S3', 'KP-2026-101', 'BT-2026-033', 'Chi trả tiền bồi thường', 'Đề nghị cấp bổ sung kinh phí', 0],
    ['P_TB_KPTB-S2', 'KP-2026-100', 'BT-2026-032', 'Chi trả tiền bồi thường', 'Chờ thông báo chi trả', 0],
    ['P_TB_KPTB-S1', 'KP-2026-099', 'BT-2026-031', 'Chi trả tiền bồi thường', 'Chờ thông báo chi trả', 0],
    ['P2', 'KP-2026-002', 'BT-2026-002', 'Cấp tạm ứng', 'Chờ chi trả', 0],
    ['P9', 'KP-2026-009', 'BT-2026-005', 'Cấp kinh phí bồi thường', 'Chờ chi trả', 0],
    ['P13', 'KP-2026-013', 'BT-2026-018', 'Cấp kinh phí bồi thường', 'Chờ chi trả', 0],
    ['P14', 'KP-2026-014', 'BT-2026-019', 'Cấp tạm ứng', 'Chờ chi trả', 0],
    ['P1', 'KP-2026-001', 'BT-2026-005', 'Cấp kinh phí bồi thường', 'Hoàn thành', 250000000],
    ['P10', 'KP-2026-010', 'BT-2026-015', 'Cấp tạm ứng', 'Hoàn thành', 50000000],
    ['P11', 'KP-2026-011', 'BT-2026-002', 'Cấp tạm ứng', 'Hoàn thành', 100000000],
    ['P12', 'KP-2026-012', 'BT-2026-011', 'Cấp kinh phí bồi thường', 'Hoàn thành', 300000000],
    ['P16', 'KP-2026-016', 'BT-2026-021', 'Cấp kinh phí bồi thường', 'Hoàn thành', 450000000],
    ['P17', 'KP-2026-017', 'BT-2026-022', 'Cấp tạm ứng', 'Hoàn thành', 85000000],
    ['P18', 'KP-2026-018', 'BT-2026-023', 'Cấp kinh phí bồi thường', 'Hoàn thành', 520000000],
    ['P19', 'KP-2026-019', 'BT-2026-024', 'Cấp kinh phí bồi thường', 'Hoàn thành', 175000000],
    ['P20', 'KP-2026-020', 'BT-2026-025', 'Cấp tạm ứng', 'Hoàn thành', 60000000],
    ['P96', 'KP-2026-096', 'BT-2026-015', 'Cấp tạm ứng', 'Chờ chi trả', 0],
    ['P97', 'KP-2026-097', 'BT-2026-028', 'Cấp tạm ứng', 'Chờ chi trả', 0],
    ['P_KPUX_1', 'KP-2026-121', 'BT-2026-061', 'Chi trả tiền bồi thường', 'Chờ chi trả', 0],
    ['P_KPUX_2', 'KP-2026-122', 'BT-2026-062', 'Chi trả tiền bồi thường', 'Chờ chi trả', 0],
    ['P_KPUX_3', 'KP-2026-123', 'BT-2023-047', 'Chi trả tiền bồi thường', 'Chờ chi trả', 0],
    ['P_KPUX_4', 'KP-2026-124', 'BT-2026-064', 'Chi trả tiền bồi thường', 'Hoàn thành', 92000000],
    ['P_KPDC_S4', 'KP-2026-904', 'BT-2026-002', 'Chi trả tiền bồi thường', 'Chờ duyệt', 0],
    ['P_KPDC_S6', 'KP-2026-906', 'BT-2026-541', 'Cấp tạm ứng', 'Hoàn thành', 25000000],
    ['P_KPDC_S9', 'KP-2026-909', 'BT-2026-504', 'Cấp tạm ứng', 'Hoàn thành', 30000000]
];
// Bản ghi kinh phí: kho 'proposalsList' nếu đã có, ngược lại dữ liệu mẫu mặc định
// Số / Ngày Quyết định tạm ứng kinh phí bồi thường (Ký ngoài) của các khoản tạm ứng mẫu đã ban hành: dùng cho bản sao trên
// và bổ sung (chỉ khi còn trống) vào bản ghi mẫu tại kpdcSeed -> Điều 3 Quyết định đình chỉ (Mẫu 25/BTNN) lấy đúng Số, ngày
var KPDC_ADV_DOC = {
    P2: ['52/QĐ-STP', '05/09/2026'], P10: ['48/QĐ-STP', '06/09/2026'], P11: ['55/QĐ-STP', '13/09/2026'],
    P17: ['63/QĐ-STP', '19/09/2026'], P20: ['66/QĐ-STP', '21/09/2026'],
    P96: ['96/QĐ-STC', '10/10/2026'], P97: ['118/QĐ-TA', '07/10/2026'], P_KPDC_S6: ['75/QĐ-STP', '08/10/2026'], P_KPDC_S9: ['76/QĐ-STP', '09/10/2026']
};
function kpdcProposals() {
    var list = kpdcRead('proposalsList', null);
    if (Array.isArray(list) && list.length) return list;
    return KPDC_KP_SEED.map(function (r) {
        var d = KPDC_ADV_DOC[r[0]] || [];
        return { id: r[0], code: r[1], ycbtCode: r[2], type: r[3], status: r[4], payoutAmountReal: r[5], docNo: d[0] || '', docDate: d[1] || '', kpdcFromSeed: true };
    });
}

// ---------- Căn cứ (Quyết định đình chỉ) ----------
function kpdcVvOf(claim) {
    var vv = String((claim && claim.maVuViec) || '').trim();
    if (/^VVBT-/i.test(vv)) return vv;
    try { var W = window.BTNN_WF; return (W && W.vuViecOf && W.vuViecOf(claim.code, { create: false })) || ''; } catch (e) { return ''; }
}
// claim: { code, maVuViec, dinhChi | dungGiaiQuyet }; rec: hồ sơ luồng (module YCBT) nếu có; src: 'dinhChi' (mặc định) | 'dungGiaiQuyet'
function kpdcBasisOf(claim, rec, at, src) {
    var cf = kpdcCfg(src);
    var dc = (claim && claim[cf.data]) || (rec && rec.gqData && rec.gqData[cf.data]) || {};
    var a = rec && rec.approval && rec.approval.kind === cf.kind ? rec.approval : null;
    var sd = (a && a.signDoc) || {};
    var method = dc.signingMethod || sd.method || '';
    var file = dc.signedFile || (method === 'Ký số' ? kpdcSignedName(sd.signedFile || sd.file || dc.fileName) : (dc.fileName || sd.file || ''));
    return {
        source: KPDC_SOURCES[src] ? src : KPDC_SRC, reason: cf.reason, changedAt: at || kpdcNow(),
        decisionType: cf.decisionType,
        decisionNo: kpdcVal(dc.docNumber || sd.docNumber), decisionDate: kpdcVal(dc.docDate || sd.docDate),
        file: file ? { name: file, fileId: dc.signedFileId || '' } : null,
        signingMethod: method, canCu: dc.reasonText || dc.canCuText || '',
        claimCode: claim.code, vvCode: kpdcVvOf(claim),
        // Thu hồi kinh phí bồi thường đã chi (chỉ Đình chỉ giải quyết): thiếu lựa chọn (dữ liệu cũ) = Thu hồi
        thuHoi: (dc.thuHoi || sd.thuHoi) === KPDC_NO_RECOVER ? KPDC_NO_RECOVER : 'Thu hồi',
        thuHoiReason: dc.thuHoiReason || sd.thuHoiReason || ''
    };
}

// Lịch sử bản ghi kinh phí khi Đình chỉ / Dừng giải quyết chọn Không thu hồi
function kpdcNoRecoverNote(b, claimCode, st) {
    return kpdcCfg(b.source).noRecover + '. Lý do: ' + (String(b.thuHoiReason || '').replace(/[.\s]+$/, '') || '-') + '. Căn cứ: ' + b.decisionType
        + (b.decisionNo ? ' số ' + b.decisionNo : '') + (b.decisionDate ? ' ngày ' + b.decisionDate : '')
        + ' (' + (b.vvCode ? 'Mã vụ việc ' + b.vvCode + ', ' : '') + 'Mã hồ sơ GQBT ' + claimCode + '). Giữ trạng thái: ' + st + '.';
}
// ---------- Áp liên thông trên 01 danh sách bản ghi kinh phí; trả về các bản ghi đã đổi ----------
function kpdcApply(list, claim, rec, src) {
    if (!Array.isArray(list) || !claim || !claim.code) return [];
    var cf = kpdcCfg(src);
    var at = kpdcNow();
    var basis = null;
    var changed = [];
    list.forEach(function (p) {
        if (!p || p.ycbtCode !== claim.code) return;
        var st = kpdcNorm(p.status);
        if (KPDC_KEEP.indexOf(st) >= 0) return;
        if (p.statusBasis && KPDC_SOURCES[p.statusBasis.source]) return;
        if (p.kpdcNoRecover) return;
        basis = basis || kpdcBasisOf(claim, rec, at, src);
        var paid = kpdcIsPaid(p);
        // Đình chỉ / Dừng giải quyết chọn Không thu hồi: khoản đã chi giữ nguyên trạng thái, chỉ ghi lịch sử
        if (paid && basis.thuHoi === KPDC_NO_RECOVER) {
            p.kpdcNoRecover = Object.assign({}, basis, { statusBefore: st, statusAfter: st });
            if (!Array.isArray(p.kpdcHistory)) p.kpdcHistory = [];
            p.kpdcHistory.push({ at: at, userId: '', userName: 'Hệ thống', action: KPDC_NO_RECOVER_ACT, note: kpdcNoRecoverNote(basis, claim.code, st) });
            changed.push(p);
            return;
        }
        var after = paid ? KPDC_RECOVER : KPDC_CANCEL;
        // Hủy phiếu trình đang chờ duyệt (Thông báo chi trả / QĐ tạm ứng)
        var cancelled = [];
        [['kptbApproval', 'Thông báo chi trả'], ['qdtuApproval', 'QĐ tạm ứng kinh phí']].forEach(function (x) {
            var ap = p[x[0]];
            if (ap && ap.pending) { ap.pending = null; ap.cancelled = { at: at, reason: cf.reason }; cancelled.push(x[1]); }
        });
        if (st === 'Chờ duyệt' && !cancelled.length) cancelled.push('Đề nghị kinh phí');
        p.statusBasis = Object.assign({}, basis, { statusBefore: st, statusAfter: after });
        p.status = after;
        if (!Array.isArray(p.kpdcHistory)) p.kpdcHistory = [];
        var note = 'Căn cứ: ' + cf.decisionType + (basis.decisionNo ? ' số ' + basis.decisionNo : '') + (basis.decisionDate ? ' ngày ' + basis.decisionDate : '')
            + ' (' + (basis.vvCode ? 'Mã vụ việc ' + basis.vvCode + ', ' : '') + 'Mã hồ sơ GQBT ' + claim.code + '). Trạng thái trước: ' + st + '.'
            + (paid ? ' Số tiền đã chi: ' + kpdcPaidAmount(p).toLocaleString('vi-VN') + ' đồng.' : '')
            + (cancelled.length ? ' Hủy phiếu trình ' + cancelled.join(', ') + ' đang chờ duyệt.' : '');
        p.kpdcHistory.push({ at: at, userId: '', userName: 'Hệ thống', action: (paid ? 'Chuyển Chờ thu hồi do ' : 'Hủy do ') + cf.act, note: note });
        changed.push(p);
    });
    return changed;
}
// Áp trên kho 'proposalsList' (trang khác phân hệ Kinh phí). Kho chưa có: phân hệ Kinh phí tự áp bù khi tải trang.
function kpdcApplyStored(claim, rec, src) {
    var list = kpdcRead('proposalsList', null);
    if (!Array.isArray(list) || !list.length) return [];
    var ch = kpdcApply(list, claim, rec, src);
    if (ch.length) { try { localStorage.setItem('proposalsList', JSON.stringify(list)); } catch (e) { /* bỏ qua */ } }
    return ch;
}
function kpdcRecOf(code) { try { var W = window.BTNN_WF; return W && W.getRecord ? W.getRecord(code) : null; } catch (e) { return null; } }

// ---------- Trang Giải quyết yêu cầu bồi thường ----------
// Gọi từ gqApplyRecord khi nhận kết quả Ký duyệt cấp cuối (Loại trình Đình chỉ giải quyết bồi thường / Dừng giải quyết bồi thường)
function kpdcOnApplied(c, r, st) {
    var src = kpdcSrcOfStatus(st);
    if (!src || !c) return;
    kpdcApplyStored(c, r || kpdcRecOf(c.code), src);
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

// Vụ việc Đình chỉ giải quyết / Dừng giải quyết đã ban hành văn bản (có dữ liệu dinhChi / dungGiaiQuyet): claimsList (màn Giải quyết YCBT ghi) + kho luồng BTNN_WF
function kpdcStoppedClaims() {
    var map = {};
    var claims = kpdcRead('claimsList', []);
    (Array.isArray(claims) ? claims : []).forEach(function (c) {
        var src = c && c.code ? kpdcSrcOfStatus(c.status) : '';
        if (src && c[kpdcCfg(src).data]) map[c.code] = { claim: c, rec: null, src: src };
    });
    var recs = [];
    try { recs = (window.BTNN_WF && window.BTNN_WF.loadRecords()) || []; } catch (e) { recs = []; }
    recs.forEach(function (r) {
        var src = r && r.module === 'YCBT' && r.code ? kpdcSrcOfStatus(r.status) : '';
        if (!src) return;
        var key = kpdcCfg(src).data;
        var dc = r.gqData && r.gqData[key];
        if (!dc) return;
        if (map[r.code]) { map[r.code].rec = r; return; }
        var claim = { code: r.code, maVuViec: r.maVuViec || '' }; claim[key] = dc;
        map[r.code] = { claim: claim, rec: r, src: src };
    });
    return map;
}
function kpdcSyncAll() {
    var map = kpdcStoppedClaims();
    var n = 0;
    Object.keys(map).forEach(function (code) { n += kpdcApply(proposalsList, map[code].claim, map[code].rec, map[code].src).length; });
    return n;
}

// Dữ liệu mẫu: vụ việc Đình chỉ giải quyết BT-2026-407 (Ký số, có Số/Ngày QĐ, chọn Thu hồi), BT-2026-408 (Ký ngoài, không Số/Ngày QĐ, chọn Không thu hồi: KP-2026-907 giữ Hoàn thành);
// BT-2026-002 (Chờ chi trả): thêm 01 Thông báo chi trả đang Chờ duyệt để thử Đình chỉ -> hủy phiếu trình
function kpdcSeedBasis(code, vv, no, date, file, method, at, before, after, src) {
    var cf = kpdcCfg(src);
    return { source: KPDC_SOURCES[src] ? src : KPDC_SRC, reason: cf.reason, changedAt: at, decisionType: cf.decisionType, decisionNo: no, decisionDate: date,
        file: { name: file, fileId: '' }, signingMethod: method, canCu: '', claimCode: code, vvCode: vv, statusBefore: before, statusAfter: after };
}
function kpdcSeedHist(at, paid, note, src) {
    return [{ at: at, userId: '', userName: 'Hệ thống', action: (paid ? 'Chuyển Chờ thu hồi do ' : 'Hủy do ') + kpdcCfg(src).act, note: note }];
}
// Mã vụ việc của hồ sơ mẫu theo sổ đăng ký dùng chung (chưa có: VVBT- cùng số)
function kpdcSeedVv(code) {
    try { var W = window.BTNN_WF; var v = W && W.vuViecOf ? W.vuViecOf(code, { create: false }) : ''; if (v) return v; } catch (e) { /* bỏ qua */ }
    return 'VVBT-' + String(code).replace(/^BT-/, '');
}
function kpdcSeed() {
    var added = 0;
    var has = function (id) { return proposalsList.some(function (p) { return p && p.id === id; }); };
    // Bổ sung Số / Ngày QĐ tạm ứng còn trống cho khoản tạm ứng mẫu (không ghi đè dữ liệu người dùng đã nhập)
    proposalsList.forEach(function (p) {
        var d = p && p.type === 'Cấp tạm ứng' && !p.docNo ? KPDC_ADV_DOC[p.id] : null;
        if (!d) return;
        p.docNo = d[0]; p.docDate = p.docDate || d[1]; p.signMethod = p.signMethod || 'Ký ngoài';
        added++;
    });
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
        },
        // BT-2026-408: Đình chỉ chọn "Không thu hồi" -> khoản tạm ứng đã chi giữ Hoàn thành, chỉ ghi lịch sử
        (function () {
            var b = kpdcSeedBasis('BT-2026-408', 'VVBT-2026-408', '', '', f8, 'Ký ngoài', '20/10/2026 10:15', 'Hoàn thành', 'Hoàn thành');
            b.thuHoi = KPDC_NO_RECOVER;
            b.thuHoiReason = 'Người yêu cầu bồi thường đã sử dụng khoản tạm ứng để khắc phục thiệt hại thực tế phát sinh; không có khả năng hoàn trả.';
            return {
                id: 'P_KPDC_S7', code: 'KP-2026-907', type: 'Cấp tạm ứng', ycbtCode: 'BT-2026-408', nycName: 'Trương Thị Mai', nycRole: 'Người bị thiệt hại', agency: 'UBND phường Thanh Xuân', cqCap: 'UBND phường Thanh Xuân',
                source: 'Ngân sách địa phương', user: 'Nguyễn Văn Chuyên Viên', files: [], amount: 20000000, date: '06/10/2026', status: 'Hoàn thành',
                notes: 'Tạm ứng kinh phí bồi thường đã chi trả; vụ việc bị đình chỉ giải quyết, Quyết định đình chỉ chọn Không thu hồi.',
                advApproveTinhThan: 12000000, advApproveKhac: 8000000, signMethod: 'Ký ngoài', docNo: '79/QĐ-UBND', docDate: '07/10/2026', signedFile: 'QD_tam_ung_BT-2026-408_ky_ngoai.pdf',
                approvedDate: '07/10/2026 14:00', approvedLeader: 'Bùi Quang Vinh', payoutDate: '09/10/2026', payoutAmountReal: 20000000, payoutMethod: 'Nhận qua chuyển khoản', payoutRecName: 'Trương Thị Mai',
                kpdcNoRecover: b,
                kpdcHistory: [{ at: '20/10/2026 10:15', userId: '', userName: 'Hệ thống', action: KPDC_NO_RECOVER_ACT, note: kpdcNoRecoverNote(b, 'BT-2026-408', 'Hoàn thành') }]
            };
        })()
    ];
    // Dừng giải quyết: BT-2026-543 (Dừng giải quyết - Ký số) tạm ứng đã chi -> Chờ thu hồi;
    // BT-2026-541 (Chờ duyệt Dừng giải quyết bồi thường) tạm ứng đã chi trả (Hoàn thành) -> chuyển Chờ thu hồi khi Lãnh đạo cấp cuối Ký duyệt
    var DGQ = 'dungGiaiQuyet', vv543 = kpdcSeedVv('BT-2026-543');
    var f543 = 'Mau_05_BTNN_Thong_bao_dung_giai_quyet_' + vv543 + '_da_ky.pdf';
    var baseDgq = { nycRole: 'Người bị thiệt hại', agency: 'Sở Tư pháp Hà Nội', cqCap: 'Sở Tư pháp Hà Nội', source: 'Ngân sách địa phương', user: 'Nguyễn Văn Chuyên Viên', files: [], type: 'Cấp tạm ứng', signMethod: 'Ký ngoài', approvedLeader: 'Võ Thanh Sơn', payoutMethod: 'Nhận qua chuyển khoản' };
    list.push(Object.assign({}, baseDgq, {
        id: 'P_KPDC_S5', code: 'KP-2026-905', ycbtCode: 'BT-2026-543', nycName: 'Lục Văn Thành', amount: 30000000, date: '05/10/2026', status: KPDC_RECOVER,
        notes: 'Tạm ứng kinh phí bồi thường đã chi trả; vụ việc bị dừng giải quyết nên chuyển Chờ thu hồi.',
        advApproveTinhThan: 18000000, advApproveKhac: 12000000, docNo: '72/QĐ-STP', docDate: '06/10/2026', signedFile: 'QD_tam_ung_BT-2026-543_ky_ngoai.pdf',
        approvedDate: '06/10/2026 09:00', payoutDate: '08/10/2026', payoutAmountReal: 30000000, payoutRecName: 'Lục Văn Thành',
        statusBasis: kpdcSeedBasis('BT-2026-543', vv543, '543/TB-STP', '22/10/2026', f543, 'Ký số', '22/10/2026 15:30', 'Hoàn thành', KPDC_RECOVER, DGQ),
        kpdcHistory: kpdcSeedHist('22/10/2026 15:30', true, 'Căn cứ: Thông báo dừng giải quyết yêu cầu bồi thường số 543/TB-STP ngày 22/10/2026 (Mã vụ việc ' + vv543 + ', Mã hồ sơ GQBT BT-2026-543). Trạng thái trước: Hoàn thành. Số tiền đã chi: 30.000.000 đồng.', DGQ)
    }));
    list.push(Object.assign({}, baseDgq, {
        id: 'P_KPDC_S6', code: 'KP-2026-906', ycbtCode: 'BT-2026-541', nycName: 'Tạ Quang Vinh', amount: 25000000, date: '07/10/2026', status: 'Hoàn thành',
        notes: 'Tạm ứng kinh phí bồi thường đã chi trả; vụ việc đang trình Dừng giải quyết bồi thường.',
        advApproveTinhThan: 15000000, advApproveKhac: 10000000, docNo: '75/QĐ-STP', docDate: '08/10/2026', signedFile: 'QD_tam_ung_BT-2026-541_ky_ngoai.pdf',
        approvedDate: '08/10/2026 10:00', payoutDate: '10/10/2026', payoutAmountReal: 25000000, payoutRecName: 'Tạ Quang Vinh'
    }));
    // BT-2026-544 (Dừng giải quyết - Ký ngoài) chọn "Không thu hồi": khoản tạm ứng đã chi giữ Hoàn thành, chỉ ghi lịch sử
    var b544 = kpdcSeedBasis('BT-2026-544', kpdcSeedVv('BT-2026-544'), '', '', 'TB_dung_giai_quyet_BT-2026-544_ky_ngoai.pdf', 'Ký ngoài', '23/10/2026 09:30', 'Hoàn thành', 'Hoàn thành', DGQ);
    b544.thuHoi = KPDC_NO_RECOVER;
    b544.thuHoiReason = 'Khoản tạm ứng đã được chi cho thiệt hại có thật và sẽ được cơ quan có thẩm quyền giải quyết bồi thường xem xét khấu trừ.';
    list.push(Object.assign({}, baseDgq, {
        id: 'P_KPDC_S8', code: 'KP-2026-908', ycbtCode: 'BT-2026-544', nycName: 'Công ty TNHH Thương mại Hòa Bình', amount: 40000000, date: '04/10/2026', status: 'Hoàn thành',
        notes: 'Tạm ứng kinh phí bồi thường đã chi trả; vụ việc bị dừng giải quyết, Thông báo dừng giải quyết chọn Không thu hồi.',
        advApproveTinhThan: 0, advApproveKhac: 40000000, docNo: '70/QĐ-STP', docDate: '05/10/2026', signedFile: 'QD_tam_ung_BT-2026-544_ky_ngoai.pdf',
        approvedDate: '05/10/2026 10:00', payoutDate: '07/10/2026', payoutAmountReal: 40000000, payoutRecName: 'Công ty TNHH Thương mại Hòa Bình',
        kpdcNoRecover: b544,
        kpdcHistory: [{ at: '23/10/2026 09:30', userId: '', userName: 'Hệ thống', action: KPDC_NO_RECOVER_ACT, note: kpdcNoRecoverNote(b544, 'BT-2026-544', 'Hoàn thành') }]
    }));
    // BT-2026-504 (Thương lượng): tạm ứng đã chi trả (Hoàn thành), dùng để thử Đình chỉ giải quyết chọn Thu hồi / Không thu hồi
    list.push(Object.assign({}, baseDgq, {
        id: 'P_KPDC_S9', code: 'KP-2026-909', ycbtCode: 'BT-2026-504', nycName: 'Phạm Thị Mai Anh', amount: 30000000, date: '08/10/2026', status: 'Hoàn thành',
        notes: 'Tạm ứng kinh phí bồi thường đã chi trả trong quá trình giải quyết bồi thường.',
        advApproveTinhThan: 10000000, advApproveKhac: 20000000, docNo: '76/QĐ-STP', docDate: '09/10/2026', signedFile: 'QD_tam_ung_BT-2026-504_ky_ngoai.pdf',
        approvedDate: '09/10/2026 10:00', payoutDate: '12/10/2026', payoutAmountReal: 30000000, payoutRecName: 'Phạm Thị Mai Anh'
    }));
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
function kpdcIsDc(item) { return !!item && !!item.statusBasis && !!KPDC_SOURCES[item.statusBasis.source] && [KPDC_CANCEL, KPDC_RECOVER].indexOf(item.status) >= 0; }
// Dòng phụ dưới trạng thái: theo nguồn liên thông (Do đình chỉ giải quyết / Do dừng giải quyết bồi thường)
function kpdcSubOf(item) { return kpdcCfg(item && item.statusBasis && item.statusBasis.source).sub; }
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
    var cf = kpdcCfg(b.source);
    kpdcCurFile = b.file && b.file.name ? b.file : null;
    var fld = function (label, v, full) { return '<div class="kpdt-fld' + (full ? ' kpdt-full' : '') + '"><span class="form-label">' + label + '</span><div class="kpdt-ro">' + (v === '' || v == null ? '-' : v) + '</div></div>'; };
    var file = kpdcCurFile
        ? '<div class="kpdt-file"><i class="fa-solid fa-file-pdf kpdt-file-ico"></i><div class="kpdt-file-info"><div class="kpdt-file-name">' + kpdcE(kpdcCurFile.name) + '</div><div class="kpdt-file-meta">' + kpdcE(b.decisionType || cf.decisionType) + (b.signingMethod ? ' - ' + kpdcE(b.signingMethod === 'Ký ngoài' ? 'Bản ký ngoài' : 'Bản đã ký số') : '') + '</div></div>'
          + '<div class="kpdt-file-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="kpdcFileAct(\'view\')"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm" onclick="kpdcFileAct(\'download\')"><i class="fa-solid fa-download"></i> Tải file</button></div></div>'
        : '<div class="kpdt-ro">-</div>';
    var body = '<div class="kpdt-grid">'
        + fld('Mã vụ việc', b.vvCode ? kpdcClaimLink(b.claimCode, b.vvCode) : '')
        + fld('Mã hồ sơ GQBT', kpdcClaimLink(b.claimCode))
        + fld('Lý do', kpdcE(b.reason), true)
        + fld('Thời điểm chuyển trạng thái', kpdcE(b.changedAt))
        + fld('Trạng thái trước', kpdcE(b.statusBefore))
        + fld('Số ' + cf.doc, kpdcE(b.decisionNo))
        + fld('Ngày ' + cf.doc, kpdcE(b.decisionDate))
        + '<div class="kpdt-fld kpdt-full"><span class="form-label">File ' + cf.doc + '</span>' + file + '</div></div>';
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
        if (tr.cells.length < 10) return; // Lưới MH01 10 cột: Trạng thái = cột kề cuối
        var code = tr.cells[1].innerText.trim();
        var item = proposalsList.find(function (p) { return p && p.code === code; });
        if (!kpdcIsDc(item)) return;
        var stCell = tr.cells[tr.cells.length - 2];
        if (!stCell.querySelector('.kpdc-sub')) stCell.insertAdjacentHTML('beforeend', '<div class="wf-sub kpdc-sub">' + kpdcSubOf(item) + '</div>');
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
        return kpdcIsDc(item) ? h.replace(/<\/span>$/, '<div class="wf-sub">' + kpdcSubOf(item) + '</div></span>') : h;
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
    // Áp bù lần cuối sau khi các add-on khác nạp dữ liệu mẫu (VD khoản chi trả mẫu của vụ việc Hoàn thành - quan_ly_kinh_phi_kpux.js)
    window.addEventListener('load', function () {
        setTimeout(function () {
            try { if (kpdcSyncAll()) { saveProposalsToLocal(); renderProposalsTable(); } } catch (e) { console.error(e); }
        }, 0);
    });
})();
