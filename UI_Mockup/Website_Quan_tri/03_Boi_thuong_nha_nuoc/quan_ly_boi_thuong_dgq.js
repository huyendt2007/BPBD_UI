/*
 * Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường (Mẫu số 05/BTNN) - Giải quyết yêu cầu bồi thường (prefix dgq)
 * - Thao tác "Dừng giải quyết" (Thao tác khác MH01 / thanh thao tác MH05): chỉ ở trạng thái Cử người giải quyết bồi thường, Xác minh thiệt hại,
 *   Thương lượng, Chờ ban hành QĐ; trạng thái khác: mục mờ trong Thao tác khác, không hiển thị tại thanh thao tác MH05.
 * - Bố cục giống Popup Đình chỉ giải quyết (quan_ly_boi_thuong_dcgq.js): Hình thức ký (Ký số 02 bước | Ký ngoài), Thông tin dừng giải quyết,
 *   Tệp văn bản trình ký (Sinh văn bản theo mẫu 05/BTNN | Tải lên từ máy), Tài liệu ban hành / không ban hành kèm theo (tlktMount).
 * - Trình: Loại trình "Dừng giải quyết bồi thường" -> Chờ duyệt; Lãnh đạo Từ chối -> Bị trả lại (Cập nhật: điền lại dữ liệu lần trình trước);
 *   cấp cuối Ký duyệt / Ký ngoài ban hành -> "Dừng giải quyết" (trạng thái kết thúc, tab Vụ việc đã xử lý).
 * - Thu hồi kinh phí bồi thường đã chi (Thu hồi | Không thu hồi + Lý do): dùng chung gqth* (quan_ly_boi_thuong_dcgq.js), lưu dungGiaiQuyet / phiếu trình;
 *   liên thông Kinh phí theo lựa chọn (quan_ly_kinh_phi_kpdc.js, nguồn dungGiaiQuyet).
 * - Chỉ dừng nhánh Giải quyết bồi thường thiệt hại; nhánh Phục hồi danh dự giữ nguyên (như Đình chỉ giải quyết).
 * - Khối xem chi tiết "Thông tin dừng giải quyết": mở rộng quan_ly_boi_thuong_hdcv.js (HDCV_TYPES.dgq, hdcvEntries, hdcvEntryHtml).
 * - Dữ liệu mẫu: BT-2026-541 (Chờ duyệt), BT-2026-542 (Bị trả lại), BT-2026-543 (Dừng giải quyết - Ký số), BT-2026-544 (Dừng giải quyết - Ký ngoài);
 *   gộp theo Mã hồ sơ, theo phiên bản DGQ_SEED_VER.
 * Đặt sau quan_ly_boi_thuong_dcgq.js, quan_ly_boi_thuong_hdcv.js.
 */
var DGQ_KIND = 'Dừng giải quyết bồi thường'; // Loại trình (đồng nhất các Loại trình khác)
var DGQ_RESULT = 'Dừng giải quyết'; // Trạng thái vụ việc sau ban hành
var DGQ_FORM = 'Mẫu số 05/BTNN';
var DGQ_DOC_TITLE = 'Thông báo về việc dừng giải quyết yêu cầu bồi thường';
var DGQ_SOURCE = ['Cử người giải quyết bồi thường', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ'];
var DGQ_CONTENT_DEFAULT = 'Kính trình Lãnh đạo xem xét, ký duyệt Thông báo về việc dừng giải quyết yêu cầu bồi thường.';
var DGQ_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
var DGQ_SEED_VER = '20261027dgth';
var DGQ_SEED_KEY = 'btnn_dgq_seed_v';
// Căn cứ dừng giải quyết: điểm b, c, d, đ, e, g khoản 2 Điều 43 (nội dung theo DM_55) -> trả lại hồ sơ; khoản 4 Điều 43 -> chuyển hồ sơ
// (theo Bảng mapping Mẫu 05/BTNN; nội dung khoản 4 Điều 43 cần user xác nhận)
var DGQ_CAN_CU = [
    { code: 'DGQ_B', name: 'Thời hiệu yêu cầu bồi thường đã hết (Điểm b Khoản 2 Điều 43)', canCu: 'điểm b khoản 2', bp: 'tra' },
    { code: 'DGQ_C', name: 'Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước được quy định tại Chương II của Luật này (Điểm c Khoản 2 Điều 43)', canCu: 'điểm c khoản 2', bp: 'tra' },
    { code: 'DGQ_D', name: 'Người yêu cầu bồi thường không phải là người có quyền yêu cầu bồi thường theo quy định tại Điều 5 của Luật này (Điểm d Khoản 2 Điều 43)', canCu: 'điểm d khoản 2', bp: 'tra' },
    { code: 'DGQ_DD', name: 'Hồ sơ không đầy đủ theo quy định tại Điều 41 của Luật này mà người yêu cầu bồi thường không bổ sung trong thời hạn quy định tại khoản 3 Điều 42 của Luật này (Điểm đ Khoản 2 Điều 43)', canCu: 'điểm đ khoản 2', bp: 'tra' },
    { code: 'DGQ_E', name: 'Yêu cầu bồi thường đã được thực hiện theo quy định tại điểm a khoản 1 Điều 52 của Luật này và đã được Tòa án có thẩm quyền thụ lý theo thủ tục tố tụng dân sự (Điểm e Khoản 2 Điều 43)', canCu: 'điểm e khoản 2', bp: 'tra' },
    { code: 'DGQ_G', name: 'Yêu cầu bồi thường đã được Tòa án có thẩm quyền chấp nhận theo quy định tại khoản 1 Điều 55 của Luật này (Điểm g Khoản 2 Điều 43)', canCu: 'điểm g khoản 2', bp: 'tra' },
    { code: 'DGQ_K4', name: 'Thuộc trường hợp quy định tại khoản 4 Điều 43', canCu: 'khoản 4', bp: 'chuyen' }
];
var DGQ_BP_LABEL = { tra: 'Trả lại hồ sơ yêu cầu bồi thường cho người yêu cầu bồi thường', chuyen: 'Chuyển hồ sơ đến cơ quan có thẩm quyền giải quyết bồi thường' };
var dgqClaim = null, dgqDocSrc = 'gen', dgqOnlineFile = null, dgqOfflineFile = null, dgqAutoLyDo = '';

function dgqEl(id) { return document.getElementById(id); }
function dgqE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function dgqIsOffline() { var r = dgqEl('dgqSigningMethodOffline'); return !!(r && r.checked); }
function dgqClearErr(id) { var el = dgqEl(id); if (el) el.classList.remove('is-invalid'); var bx = dgqEl(id + 'Box'); if (bx) bx.classList.remove('is-invalid'); var er = dgqEl(id + 'Err'); if (er) er.style.display = 'none'; }
function dgqSetErr(id, msg) { var el = dgqEl(id); if (el) el.classList.add('is-invalid'); var bx = dgqEl(id + 'Box'); if (bx) { bx.classList.add('is-invalid'); el = bx.querySelector('.wf-utree-display') || el; } var er = dgqEl(id + 'Err'); if (er) { er.textContent = msg || 'Đây là trường bắt buộc'; er.style.display = 'block'; } return el; }
function dgqToday() { var d = new Date(), p2 = function (n) { return String(n).padStart(2, '0'); }; return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear(); }
function dgqVvCode(claim) { return (typeof claimVvCode === 'function' && claimVvCode(claim)) || claim.code; }
function dgqCaseStatus(claim) { return typeof gqldCaseStatus === 'function' ? gqldCaseStatus(claim) : claim.status; }
function dgqCanCuOf(code) { return DGQ_CAN_CU.filter(function (x) { return x.code === code; })[0] || null; }
// Lý do mặc định theo căn cứ: nội dung căn cứ bỏ phần (điểm, khoản), chữ đầu viết thường; khoản 4 Điều 43: cán bộ tự nhập
function dgqDefaultLyDo(code) {
    var c = dgqCanCuOf(code);
    if (!c || c.bp === 'chuyen') return '';
    var t = c.name.replace(/\s*\([^)]*\)\s*$/, '').trim();
    return t ? t.charAt(0).toLowerCase() + t.slice(1) : '';
}
// ##BienPhapXuLyTiepTheo##
function dgqBienPhapText(bp, coQuan) {
    if (bp === 'chuyen') return 'chuyển hồ sơ đến ' + (coQuan || '……') + ' để giải quyết';
    if (bp === 'tra') return 'trả lại hồ sơ yêu cầu bồi thường cho Ông/Bà (gửi kèm Thông báo này)';
    return '……';
}
// ##SoThongBaoThuLy## / ##NgayThongBaoThuLy##: Thông báo thụ lý (Mẫu 04/BTNN) đã ban hành của vụ việc
function dgqThuLy(claim) {
    var tb = (claim && claim.thongBaoThuLy) || {};
    var no = String(tb.soKyHieu || '').trim();
    if (/^\/?\s*TB-?\s*$/i.test(no)) no = '';
    var dt = String(tb.ngay || '').trim() || (typeof gqfxNgayThuLy === 'function' ? gqfxNgayThuLy(claim) : '');
    var m = String(dt).match(/\d{2}\/\d{2}\/\d{4}/);
    return { no: no, date: m ? m[0] : '' };
}
// ##TenCoQuanQuanLyNhaNuocBTNN##: cấp Trung ương -> Cục Bồi thường nhà nước - Bộ Tư pháp; cấp địa phương -> Sở Tư pháp tỉnh/thành phố
function dgqQlnn(unitId, issuer) {
    var W = typeof gqW === 'function' ? gqW() : null;
    if (/^(Bộ|Cục|Tòa án nhân dân tối cao|Viện kiểm sát nhân dân tối cao|Văn phòng Chính phủ|Thanh tra Chính phủ)/i.test(String(issuer || ''))) return 'Cục Bồi thường nhà nước - Bộ Tư pháp';
    try { var stp = W && W.stpOfUnit ? W.stpOfUnit(unitId) : ''; if (stp) return W.unitName(stp); } catch (e) { /* mockup */ }
    return 'Sở Tư pháp ……';
}
// ##ChucVuNguoiKy##: chức vụ đầu tiên theo Loại cơ quan [DM_57] của cơ quan ban hành trong DM_58, in hoa
function dgqChucVuKy(issuer) {
    var cv = '';
    try {
        var loai = typeof dcgqLoaiOfName === 'function' ? dcgqLoaiOfName(issuer) : '';
        if (loai && window.DM_LCQ) { var l = window.DM_LCQ.chucVuOf(loai); cv = l && l[0] ? l[0].name : ''; }
    } catch (e) { cv = ''; }
    return (cv || 'Thủ trưởng cơ quan').toUpperCase();
}
function dgqDocBaseName(claim) { return 'Mau_05_BTNN_Thong_bao_dung_giai_quyet_' + dgqVvCode(claim); }
// Cơ quan có thẩm quyền giải quyết bồi thường (căn cứ khoản 4 Điều 43): chọn từ cây đơn vị Cơ cấu tổ chức (BTNN_WF.mountUnitTree),
// giống ô chọn CQGQBT khác của Không thụ lý KTL_01; khóa đơn vị hiện tại của vụ việc
function dgqCqId() { var h = dgqEl('dgqCoQuanNhan'); return h ? String(h.value || '').trim() : ''; }
function dgqCqName(id) { var W = typeof gqW === 'function' ? gqW() : window.BTNN_WF; try { return id && W ? W.unitName(id) : ''; } catch (e) { return ''; } }
function dgqCqIdOfName(name) {
    var W = window.BTNN_WF; if (!name || !W) return '';
    try { var u = W.findRootUnitByName ? W.findRootUnitByName(name) : null; return (u && u.id) || ''; } catch (e) { return ''; }
}
function dgqCqMount(claim, selected) {
    var W = typeof gqW === 'function' ? gqW() : null;
    var box = dgqEl('dgqCoQuanNhanBox');
    if (!W || !box || typeof W.mountUnitTree !== 'function') return null;
    var rec = typeof gqRecord === 'function' ? gqRecord(claim) : null;
    var root = typeof gqClaimUnitId === 'function' ? gqClaimUnitId(claim, rec) : '';
    return W.mountUnitTree(box, {
        inputId: 'dgqCoQuanNhan', value: selected || '', disabledIds: [root, rec && rec.currentUnitId].filter(Boolean),
        placeholder: '-- Chọn cơ quan có thẩm quyền giải quyết bồi thường --',
        onChange: function (v) { if (v) dgqClearErr('dgqCoQuanNhan'); }
    });
}

// ---------- Văn bản Mẫu 05/BTNN ----------
// x: { canCuCode, lyDo, coQuanNhan, docNumber, docDate, thuLy: { no, date } }
function dgqBuildMau05(claim, x) {
    var p = gqDocParts(claim);
    var P = 'margin:6pt 0; text-align:justify; text-indent:1cm;';
    var dots = '……';
    var c = dgqCanCuOf(x.canCuCode);
    var issuer = gqE(p.issuer);
    var tl = x.thuLy || {};
    var lyDo = String(x.lyDo || '').trim().replace(/[.;,]+$/, '');
    return p.W.docHeaderHtml(p.unitId, DGQ_FORM, 'TB', { soKyHieu: x.docNumber, ngay: x.docDate })
        + '<p style="text-align:center; margin:18pt 0 6pt;"><b>THÔNG BÁO</b><br><b>Về việc dừng giải quyết yêu cầu bồi thường</b></p>'
        + '<p style="margin:6pt 0;">Kính gửi: ' + gqE(getClaimRequesterName(claim) || dots) + '</p>'
        + '<p style="margin:6pt 0;">Địa chỉ: ' + gqE(p.address || dots) + '</p>'
        + '<p style="' + P + '">Vụ việc yêu cầu bồi thường của Ông/Bà đã được ' + issuer + ' thụ lý và thông báo cho Ông/Bà theo Thông báo số ' + gqE(tl.no || dots) + ' ngày ' + gqE(tl.date || dots) + '. Tuy nhiên, trong quá trình thực hiện việc giải quyết yêu cầu bồi thường, ' + issuer + ' nhận thấy ' + (lyDo ? gqE(lyDo) : dots) + ' quy định tại ' + gqE(c ? c.canCu : dots) + ' Điều 43 Luật Trách nhiệm bồi thường của Nhà nước.</p>'
        + '<p style="' + P + '">Căn cứ quy định tại khoản 6 Điều 43 Luật Trách nhiệm bồi thường của Nhà nước (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16), ' + issuer + ' dừng việc giải quyết yêu cầu bồi thường và ' + gqE(dgqBienPhapText(c ? c.bp : '', x.coQuanNhan)) + './.</p>'
        + '<table style="width:100%; border-collapse:collapse; margin-top:18pt;"><tr>'
        + '<td style="width:50%; vertical-align:top; font-size:12pt;"><b><i>Nơi nhận:</i></b><br>- Như trên;<br>- ' + gqE(dgqQlnn(p.unitId, p.issuer)) + ' (để biết);<br>- Lưu: VT, HSVV.</td>'
        + '<td style="text-align:center; vertical-align:top;"><b>' + gqE(dgqChucVuKy(p.issuer)) + '</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i></td></tr></table>';
}
function dgqFormData() {
    var code = dgqEl('dgqCanCu').value;
    var c = dgqCanCuOf(code);
    return {
        canCuCode: code, canCuText: c ? c.name : '', canCu: c ? c.canCu : '', bienPhap: c ? c.bp : '',
        lyDo: dgqEl('dgqLyDo').value.trim(), coQuanNhanId: c && c.bp === 'chuyen' ? dgqCqId() : '', coQuanNhan: c && c.bp === 'chuyen' ? dgqCqName(dgqCqId()) : '',
        docNumber: dgqEl('dgqDocNumber').value.trim(), docDate: dgqEl('dgqDocDate').value.trim(), thuLy: dgqClaim ? dgqThuLy(dgqClaim) : {},
        thuHoi: typeof gqthData === 'function' ? gqthData('dgq').thuHoi : '', thuHoiReason: typeof gqthData === 'function' ? gqthData('dgq').thuHoiReason : ''
    };
}
function dgqBuildDoc() { return dgqClaim ? { html: dgqBuildMau05(dgqClaim, dgqFormData()), base: dgqDocBaseName(dgqClaim) } : null; }
function dgqBienPhapFull(x) { return x.bienPhap === 'chuyen' ? DGQ_BP_LABEL.chuyen + (x.coQuanNhan ? ': ' + x.coQuanNhan : '') : (x.bienPhap ? DGQ_BP_LABEL.tra : ''); }
function dgqReasonFull(x) { return x.canCuText + (x.lyDo ? '. Lý do: ' + x.lyDo : ''); }

// ---------- Giao diện ----------
function dgqField(id, label, req, ctrl, extraStyle) { return '<div class="gqx-field"' + (extraStyle ? ' style="' + extraStyle + '"' : '') + ' id="' + id + 'Group"><label class="form-label" for="' + id + '">' + label + (req ? '<span class="gqx-req">*</span>' : '') + '</label>' + ctrl + '<div id="' + id + 'Err" class="gqx-err">Đây là trường bắt buộc</div></div>'; }
function dgqEnsureModal() {
    if (dgqEl('modalDgq')) return;
    var opts = DGQ_CAN_CU.map(function (r) { return '<option value="' + r.code + '">' + dgqE(r.name) + '</option>'; }).join('');
    var card = function (val, title, desc, ico, off) {
        var rid = 'dgqSigningMethod' + (off ? 'Offline' : 'Online');
        return '<label class="sign-card' + (off ? '' : ' active') + '" id="dgqCardSign' + (off ? 'Offline' : 'Online') + '" for="' + rid + '">'
            + '<input type="radio" name="dgqSigningMethod" id="' + rid + '" value="' + val + '"' + (off ? '' : ' checked') + ' onchange="dgqToggleSigningMethod(\'' + val + '\')">'
            + '<div class="sign-card-content"><div class="sign-card-icon' + (off ? ' offline' : '') + '"><i class="fa-solid ' + ico + '"></i></div><div class="sign-card-text"><div class="sign-card-title">' + title + '</div><div class="sign-card-desc">' + desc + '</div></div></div>'
            + '<div class="sign-card-check"><i class="' + (off ? 'fa-regular fa-circle' : 'fa-solid fa-circle-check') + '"></i></div></label>';
    };
    var info = dgqField('dgqCanCu', 'Căn cứ dừng giải quyết', true, '<select id="dgqCanCu" class="form-control" onchange="dgqOnCanCu()"><option value="">-- Chọn căn cứ dừng giải quyết --</option>' + opts + '</select>')
        + dgqField('dgqLyDo', 'Lý do dừng giải quyết', true, '<textarea id="dgqLyDo" class="form-control" rows="3" maxlength="2000" placeholder="Nhập lý do dừng giải quyết..." oninput="dgqClearErr(\'dgqLyDo\'); dgqCount();"></textarea><div id="dgqLyDoCount" class="ktlx-counter">0/2000 ký tự</div>')
        + '<div class="gqx-field"><label class="form-label">Biện pháp xử lý hồ sơ</label><div id="dgqBienPhap" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 12px; font-size:13px; color:#334155;"></div></div>'
        + dgqField('dgqCoQuanNhan', 'Cơ quan có thẩm quyền giải quyết bồi thường', true, '<div id="dgqCoQuanNhanBox"></div>', 'display:none;')
        + '<div class="gqx-field" style="margin-bottom:0;"><label class="form-label">Thông báo thụ lý hồ sơ yêu cầu bồi thường</label><div id="dgqThuLyInfo" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 12px; font-size:13px; color:#334155;"></div></div>'
        // Thu hồi kinh phí bồi thường đã chi: chỉ hiển thị khi vụ việc có khoản kinh phí đã chi (dùng chung với Đình chỉ - quan_ly_boi_thuong_dcgq.js)
        + (typeof gqthHtml === 'function' ? gqthHtml('dgq') : '');
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modalDgq" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div id="dgqContainer" class="sticky-modal-container" style="background:#fff; width:850px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3);">'
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#fee2e2; color:#b91c1c; font-size:14px;"><i class="fa-solid fa-circle-minus"></i></span><span>TRÌNH KÝ THÔNG BÁO DỪNG GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Hồ sơ: <strong id="dgqClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người yêu cầu: <span id="dgqClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="dgqClaimAgency" style="font-weight:500; color:#475569;">--</span></div>'
        + '</div><button type="button" onclick="closeDgqModal()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        + '<div id="dgqStepperBar" class="ktl-stepper-fullwidth"><div id="dgqStep1Tab" class="ktl-step-tab active" onclick="dgqGoStep1()"><span class="ktl-step-badge" id="dgqStep1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>'
        + '<div class="ktl-stepper-sep"><i class="fa-solid fa-chevron-right"></i></div><div id="dgqStep2Tab" class="ktl-step-tab" onclick="dgqGoStep2()"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
        + '<div id="dgqStep1Body" class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div id="dgqReturnedAlertBlock" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;"><div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> HỒ SƠ BỊ LÃNH ĐẠO TRẢ VỀ YÊU CẦU CHỈNH SỬA</div><div style="font-size:12.5px; color:#92400e; line-height:1.5;">Lý do trả về: <strong id="dgqReturnedReason">--</strong><br>Người trả về: <span id="dgqReturnedOfficer">--</span> • Thời điểm: <span id="dgqReturnedDate">--</span></div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
        + card('online', 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', 'fa-file-signature', false)
        + card('offline', 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', 'fa-stamp', true)
        + '</div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-circle-minus"></i> Thông tin dừng giải quyết</div>' + info + '</div>'
        + '<div class="gqx-sec" id="dgqDocSection"><div class="gqx-sec-title" id="dgqDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>'
        + '<div id="dgqDocSrcGroup"><div class="doc-src-segmented"><button type="button" class="doc-src-seg-btn active" id="dgqSegBtnGen" onclick="dgqSetDocSrc(\'gen\')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 05/BTNN</span></button><button type="button" class="doc-src-seg-btn" id="dgqSegBtnUpload" onclick="dgqSetDocSrc(\'upload\')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button></div></div>'
        + '<div id="dgqDocMetaGroup" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:12px;"><div style="font-size:12px; font-weight:700; color:#334155; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:10px; display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu 05/BTNN</div>'
        + '<div class="gqx-grid2" style="margin-bottom:0;">' + dgqField('dgqDocNumber', 'Số, ký hiệu văn bản', true, '<input type="text" id="dgqDocNumber" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="dgqClearErr(\'dgqDocNumber\')">')
        + dgqField('dgqDocDate', 'Ngày văn bản', true, '<div class="gqx-date"><input type="text" id="dgqDocDate" class="form-control" placeholder="dd/mm/yyyy" onchange="dgqClearErr(\'dgqDocDate\')"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById(\'dgqDocDate\'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i></div>') + '</div></div>'
        + '<div id="dgqOnlineSection"><input type="file" id="dgqOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="dgqOnlineUpload(this)"><div id="dgqDocFileBox"></div><div id="dgqDocFileError" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div id="dgqOfflineSection" style="display:none;"><input type="file" id="dgqOfflineFileInput" accept=".pdf" style="display:none;" onchange="dgqOfflineUpload(this)">'
        + '<div id="dgqOfflineDrop" class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'dgqOfflineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="dgqDrop(event, true)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a></div><div class="ktlx-drop-sub">(Chỉ chấp nhận .pdf, tối đa 50MB)</div></div>'
        + '<div id="dgqOfflineFileRow" style="display:none;"></div><div id="dgqOfflineFileErr" class="gqx-err">' + DGQ_OFF_MSG + '</div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang trạng thái <strong>' + DGQ_RESULT + '</strong>.</div></div>'
        + '</div>'
        + '<div id="dgqTlkt"></div>'
        + '</div>'
        + '<div id="dgqStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative;">'
        + '<div style="flex:1; overflow-y:auto; overflow-x:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;"><div id="dgqA4Page" class="a4-document-page"><div id="dgqA4Content"></div></div></div>'
        + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; box-shadow:-4px 0 15px rgba(0,0,0,0.05); z-index:20;">'
        + '<div><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div><div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>'
        + '<div id="dgqSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>'
        + '<div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>'
        + '<div class="form-group" style="margin-bottom:0;"><label class="form-label" for="dgqSignContent" style="font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block;">Nội dung trình <span style="color:#dc2626;">*</span></label><textarea id="dgqSignContent" class="form-control" rows="4" style="font-size:13px;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="this.classList.remove(\'is-invalid\'); var e=document.getElementById(\'dgqSignContentErr\'); if(e) e.style.display=\'none\';"></textarea><div id="dgqSignContentErr" class="error-message" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</div></div>'
        + '</div></div>'
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;"><div style="display:flex; gap:10px; margin-left:auto;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeDgqModal()">Hủy bỏ</button>'
        + '<button id="dgqBtnSubmitOffline" type="button" class="btn btn-primary" onclick="dgqSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
        + '<button id="dgqBtnNextStep" type="button" class="btn btn-primary" onclick="dgqGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>'
        + '<button id="dgqBtnBackStep1" type="button" class="btn btn-secondary" onclick="dgqGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
        + '<button id="dgqBtnSubmitOnline" type="button" class="btn btn-primary" onclick="dgqSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; box-shadow:0 2px 6px rgba(22,163,74,0.3); font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>'
        + '</div></div></div></div>';
    document.body.appendChild(wrap.firstChild);
}
function dgqCount() { var t = dgqEl('dgqLyDo'), c = dgqEl('dgqLyDoCount'); if (t && c) c.textContent = (t.value || '').length + '/2000 ký tự'; }
// Chọn Căn cứ: điền Lý do mặc định (khi Lý do trống hoặc chưa sửa), cập nhật Biện pháp xử lý hồ sơ; khoản 4 Điều 43 -> hiển thị Cơ quan nhận hồ sơ
function dgqOnCanCu(keepLyDo) {
    dgqClearErr('dgqCanCu');
    var code = dgqEl('dgqCanCu').value;
    var c = dgqCanCuOf(code);
    var ta = dgqEl('dgqLyDo');
    if (!keepLyDo && (!ta.value.trim() || ta.value.trim() === dgqAutoLyDo)) { dgqAutoLyDo = dgqDefaultLyDo(code); ta.value = dgqAutoLyDo; if (ta.value) dgqClearErr('dgqLyDo'); }
    dgqCount();
    dgqEl('dgqBienPhap').innerHTML = c ? dgqE(DGQ_BP_LABEL[c.bp]) : '<span style="color:#64748b; font-style:italic;">Theo Căn cứ dừng giải quyết</span>';
    var isChuyen = !!c && c.bp === 'chuyen';
    dgqEl('dgqCoQuanNhanGroup').style.display = isChuyen ? '' : 'none';
    if (!isChuyen) dgqClearErr('dgqCoQuanNhan');
}
function dgqRenderThuLy() {
    var tl = dgqThuLy(dgqClaim);
    dgqEl('dgqThuLyInfo').innerHTML = tl.no || tl.date
        ? 'Thông báo thụ lý số <b>' + dgqE(tl.no || '……') + '</b> ngày <b>' + dgqE(tl.date || '……') + '</b> <span style="color:#64748b;">(tự động lấy theo vụ việc; điền vào Mẫu 05/BTNN)</span>'
        : '<span style="color:#64748b; font-style:italic;">Vụ việc chưa có Thông báo thụ lý hồ sơ đã ban hành: Số, ngày Thông báo thụ lý để dấu chấm.</span>';
}

// ---------- Mở / đóng ----------
// Mở từ Thao tác khác "Dừng giải quyết" hoặc "Cập nhật" hồ sơ Bị trả lại có Loại trình "Dừng giải quyết"
function openDgqModal(claimId) {
    var claim = gqClaim(claimId);
    if (!claim) return;
    var W = gqW();
    var rec = gqRecord(claim);
    var prev = rec && rec.status === 'Bị trả lại' && rec.approval && rec.approval.kind === DGQ_KIND ? rec.approval : null;
    if (!prev && DGQ_SOURCE.indexOf(dgqCaseStatus(claim)) < 0) { showToast('Trạng thái hồ sơ hiện tại không cho phép Dừng giải quyết.', 'error'); return; }
    dgqEnsureModal();
    gqFrameFull(true);
    dgqClaim = claim; dgqOnlineFile = null; dgqOfflineFile = null;
    var sd = (prev && prev.signDoc) || {};
    var ret = prev ? (rec.returned || {}) : null;
    dgqEl('dgqReturnedAlertBlock').style.display = prev ? 'block' : 'none';
    if (prev) {
        dgqEl('dgqReturnedReason').innerText = ret.reason || '--';
        dgqEl('dgqReturnedOfficer').innerText = (ret.by && W ? W.userName(ret.by) : '') || '--';
        dgqEl('dgqReturnedDate').innerText = ret.at || '--';
    }
    dgqEl('dgqClaimCode').innerText = dgqVvCode(claim) || '--';
    dgqEl('dgqClaimNYC').innerText = getClaimRequesterName(claim) || '--';
    dgqEl('dgqClaimAgency').innerText = claim.agency || '--';
    // Thông tin dừng giải quyết: lần trình trước (Bị trả lại) hoặc trống
    dgqEl('dgqCanCu').value = sd.canCuCode || '';
    dgqEl('dgqLyDo').value = sd.lyDo || '';
    dgqAutoLyDo = sd.lyDo ? '' : dgqDefaultLyDo(sd.canCuCode);
    dgqCqMount(claim, sd.coQuanNhanId || dgqCqIdOfName(sd.coQuanNhan));
    dgqOnCanCu(true);
    dgqRenderThuLy();
    if (typeof gqthRender === 'function') gqthRender('dgq', claim, prev ? sd : null);
    var today = dgqToday();
    dgqEl('dgqDocNumber').value = '     /TB-';
    dgqEl('dgqDocDate').value = today;
    ['dgqCanCu', 'dgqLyDo', 'dgqCoQuanNhan', 'dgqDocNumber', 'dgqDocDate'].forEach(dgqClearErr);
    if (typeof flatpickr !== 'undefined') { var di = dgqEl('dgqDocDate'); if (di._flatpickr) di._flatpickr.destroy(); flatpickr(di, { dateFormat: 'd/m/Y', allowInput: true, defaultDate: today, onChange: function () { dgqClearErr('dgqDocDate'); } }); }
    dgqEl('dgqSignContent').value = DGQ_CONTENT_DEFAULT;
    gqSignInit('dgq', claim, prev && Array.isArray(prev.assignees) ? prev.assignees : null);
    dgqOfflineRemove();
    dgqSetDocSrc('gen');
    // Trình lại: nguồn tệp, tệp tải lên, Số/Ngày văn bản, ô ký, Nội dung trình, Tài liệu đính kèm của lần trình trước
    tlktGqRestore('dgq', prev, {
        required: false,
        setSrc: function (src) { dgqSetDocSrc(src); },
        setFile: function (f) { dgqOnlineFile = f; dgqRenderDocBox(); },
        fields: [['dgqDocNumber', 'docNumber'], ['dgqDocDate', 'docDate']]
    });
    dgqEl('dgqSigningMethodOnline').checked = true;
    dgqToggleSigningMethod('online');
    dgqGoStep1();
    var modal = dgqEl('modalDgq');
    modal.style.display = 'flex'; modal.classList.add('active'); modal.classList.add('visible');
}
function closeDgqModal() {
    gqFrameFull(false);
    ktlxCancelConvert('dgq');
    var modal = dgqEl('modalDgq');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('active'); modal.classList.remove('visible'); }
    dgqClaim = null;
}
function dgqSetDocSrc(src) {
    dgqDocSrc = src === 'upload' ? 'upload' : 'gen';
    var isGen = dgqDocSrc === 'gen';
    dgqEl('dgqSegBtnGen').classList.toggle('active', isGen);
    dgqEl('dgqSegBtnUpload').classList.toggle('active', !isGen);
    dgqOnlineFile = null;
    ktlxCancelConvert('dgq');
    var fe = dgqEl('dgqDocFileError'); fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    dgqApplyDocMeta();
    dgqRenderDocBox();
}
function dgqApplyDocMeta() { dgqEl('dgqDocMetaGroup').style.display = (!dgqIsOffline() && dgqDocSrc === 'gen') ? '' : 'none'; }
function dgqToggleSigningMethod(method) {
    var isOnline = method === 'online';
    [['dgqCardSignOnline', isOnline], ['dgqCardSignOffline', !isOnline]].forEach(function (x) {
        var c = dgqEl(x[0]); c.classList.toggle('active', x[1]);
        var ico = c.querySelector('.sign-card-check i'); if (ico) ico.className = x[1] ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    dgqApplyDocMeta();
    if (!isOnline) ['dgqDocNumber', 'dgqDocDate'].forEach(dgqClearErr);
    var bar = dgqEl('dgqStepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !isOnline); bar.setAttribute('aria-hidden', isOnline ? 'false' : 'true');
    var show = function (id, on, disp) { var el = dgqEl(id); if (el) el.style.display = on ? (disp || 'block') : 'none'; };
    show('dgqDocSrcGroup', isOnline);
    show('dgqOnlineSection', isOnline);
    show('dgqOfflineSection', !isOnline);
    show('dgqBtnSubmitOffline', !isOnline, 'inline-flex');
    show('dgqBtnNextStep', isOnline, 'inline-flex');
    if (typeof tlktShow === 'function') tlktShow('dgq', isOnline);
    dgqEl('dgqDocSectionTitle').innerHTML = isOnline ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
}
function dgqRenderDocBox() {
    var box = dgqEl('dgqDocFileBox'); if (!box) return;
    if (dgqDocSrc === 'gen') {
        box.innerHTML = '<div class="gqx-file-empty"><div class="gqx-file-hint"><i class="fa-solid fa-file-circle-check" style="color:#2563eb; font-size:16px; margin-right:6px;"></i>Hệ thống tự động sinh Thông báo theo Mẫu 05/BTNN từ thông tin đang nhập.</div><div class="gqx-file-actions"><button type="button" class="btn-preview-doc" onclick="dgqPreview()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div></div>';
        return;
    }
    if (ktlxConverting.dgq) { box.innerHTML = '<div class="ktlx-converting"><span class="ktlx-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    var f = dgqOnlineFile;
    box.innerHTML = !f
        ? '<div class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'dgqOnlineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="dgqDrop(event, false)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a></div><div class="ktlx-drop-sub">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)</div></div>'
        : ktlxFileCardHtml(f.name, f.size, f.note, 'dgqOnlineView()', 'dgqOnlineRemove()');
}
function dgqDrop(e, offline) { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); var fs = e.dataTransfer && e.dataTransfer.files; if (fs && fs.length) (offline ? dgqOfflineUpload : dgqOnlineUpload)({ files: [fs[0]], value: '' }); }
// Kiểm tra Thông tin dừng giải quyết; trả về ô lỗi đầu tiên
function dgqValidateInfo() {
    var first = null;
    var mark = function (id, bad) { if (bad) { var el = dgqSetErr(id); first = first || el; } else dgqClearErr(id); };
    var c = dgqCanCuOf(dgqEl('dgqCanCu').value);
    mark('dgqCanCu', !c);
    mark('dgqLyDo', !dgqEl('dgqLyDo').value.trim());
    mark('dgqCoQuanNhan', !!c && c.bp === 'chuyen' && !dgqCqId());
    var thErr = typeof gqthValidate === 'function' ? gqthValidate('dgq') : null;
    return first || thErr;
}
function dgqValidateStep1() {
    var first = dgqValidateInfo();
    if (dgqDocSrc === 'gen') {
        var no = dgqEl('dgqDocNumber').value.trim(), dt = dgqEl('dgqDocDate').value.trim();
        if (!no) first = first || dgqSetErr('dgqDocNumber'); else dgqClearErr('dgqDocNumber');
        if (!dt) first = first || dgqSetErr('dgqDocDate');
        else if (typeof gqValidDateText === 'function' && !gqValidDateText(dt)) first = first || dgqSetErr('dgqDocDate', 'Ngày văn bản không hợp lệ (dd/mm/yyyy)');
        else dgqClearErr('dgqDocDate');
    }
    return first;
}
function dgqPreview() {
    var bad = dgqValidateStep1();
    if (bad) { bad.focus(); return; }
    var doc = dgqBuildDoc();
    if (doc) gqW().openDocTab(doc.html, doc.base);
}
function dgqOnlineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var fe = dgqEl('dgqDocFileError');
    var msg = ktlxCheckFile(file, ['.pdf', '.doc', '.docx']);
    if (msg) { fe.textContent = msg; fe.style.display = 'block'; showToast(msg, 'error'); return; }
    fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    var size = ktlxFmtSize(file.size);
    if (/\.docx?$/i.test(file.name)) {
        dgqOnlineFile = null; ktlxConverting.dgq = true; ktlxSetNextBusy('dgq', true); dgqRenderDocBox();
        var token = (ktlxConverting.dgqToken = (ktlxConverting.dgqToken || 0) + 1);
        setTimeout(function () {
            if (ktlxConverting.dgqToken !== token || !ktlxConverting.dgq) return;
            ktlxConverting.dgq = false; ktlxSetNextBusy('dgq', false);
            dgqOnlineFile = { name: file.name.replace(/\.docx?$/i, '.pdf'), size: size, source: 'uploaded', raw: file, note: 'Đã chuyển đổi từ ' + file.name };
            dgqRenderDocBox();
        }, 1200);
        return;
    }
    dgqOnlineFile = { name: file.name, size: size, source: 'uploaded', raw: file };
    dgqRenderDocBox();
}
function dgqOnlineView() { var f = dgqOnlineFile; if (!f) return; if (f.source === 'generated') gqW().openDocTab(f.bodyHtml, f.base); else gqOpenUploadedFile(f); }
function dgqOnlineRemove() { dgqOnlineFile = null; ktlxCancelConvert('dgq'); dgqRenderDocBox(); }
function dgqOfflineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var err = dgqEl('dgqOfflineFileErr'), drop = dgqEl('dgqOfflineDrop');
    var msg = ktlxCheckFile(file, ['.pdf']);
    if (msg) { err.textContent = msg; err.style.display = 'block'; drop.classList.add('is-error'); showToast(msg, 'error'); return; }
    dgqOfflineFile = { name: file.name, size: ktlxFmtSize(file.size), raw: file };
    var row = dgqEl('dgqOfflineFileRow');
    row.innerHTML = ktlxFileCardHtml(dgqOfflineFile.name, dgqOfflineFile.size, '', 'gqOpenUploadedFile(dgqOfflineFile)', 'dgqOfflineRemove()');
    row.style.display = 'block';
    drop.style.display = 'none'; drop.classList.remove('is-error');
    err.textContent = DGQ_OFF_MSG; err.style.display = 'none';
}
function dgqOfflineRemove() {
    dgqOfflineFile = null;
    var row = dgqEl('dgqOfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    var drop = dgqEl('dgqOfflineDrop'); if (drop) { drop.style.display = ''; drop.classList.remove('is-error'); }
    var err = dgqEl('dgqOfflineFileErr'); if (err) { err.textContent = DGQ_OFF_MSG; err.style.display = 'none'; }
}

// ---------- Bước ----------
function dgqGoStep1() {
    var c = dgqEl('dgqContainer'); c.style.width = '850px'; c.style.maxWidth = '96%'; c.style.height = 'auto';
    dgqEl('dgqStep1Tab').className = 'ktl-step-tab active';
    dgqEl('dgqStep1Badge').innerHTML = '1';
    dgqEl('dgqStep2Tab').className = 'ktl-step-tab';
    dgqEl('dgqStep1Body').style.display = 'block';
    dgqEl('dgqStep2Body').style.display = 'none';
    var off = dgqIsOffline();
    dgqEl('dgqBtnNextStep').style.display = off ? 'none' : 'inline-flex';
    dgqEl('dgqBtnSubmitOffline').style.display = off ? 'inline-flex' : 'none';
    dgqEl('dgqBtnBackStep1').style.display = 'none';
    dgqEl('dgqBtnSubmitOnline').style.display = 'none';
}
// Tiếp tục: kiểm tra Bước 1 -> Bước 2 (Kéo ô ký & chọn Lãnh đạo)
function dgqGoStep2() {
    if (!dgqClaim || dgqIsOffline()) return;
    if (ktlxConverting.dgq) { showToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    var first = dgqValidateStep1();
    if (dgqDocSrc !== 'gen' && !dgqOnlineFile) { dgqEl('dgqDocFileError').style.display = 'block'; first = first || dgqEl('dgqDocFileBox'); }
    var okT = typeof tlktValidate !== 'function' || tlktValidate('dgq');
    if (first || !okT) {
        if (first && first.focus) first.focus();
        showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'warning');
        return;
    }
    var content = dgqEl('dgqA4Content');
    if (dgqDocSrc === 'gen') {
        var doc = dgqBuildDoc();
        dgqOnlineFile = { name: doc.base + '.doc', size: Math.max(1, Math.round(doc.html.length / 1024)) + ' KB', source: 'generated', base: doc.base, bodyHtml: doc.html };
        content.innerHTML = doc.html;
    } else {
        content.innerHTML = '<div style="text-align:center; padding-top:320px; color:#475569;"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#94a3b8;"></i><div style="margin-top:12px; font-weight:700;">' + gqE(dgqOnlineFile.name) + '</div><div style="font-size:12.5px;">Văn bản tải lên từ máy - Mẫu 05/BTNN - ' + DGQ_DOC_TITLE + '</div></div>';
    }
    var c = dgqEl('dgqContainer'); c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh';
    dgqEl('dgqStep1Tab').className = 'ktl-step-tab completed';
    dgqEl('dgqStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    dgqEl('dgqStep2Tab').className = 'ktl-step-tab active';
    dgqEl('dgqStep1Body').style.display = 'none';
    dgqEl('dgqStep2Body').style.display = 'flex';
    dgqEl('dgqBtnNextStep').style.display = 'none';
    dgqEl('dgqBtnSubmitOffline').style.display = 'none';
    dgqEl('dgqBtnBackStep1').style.display = 'inline-flex';
    dgqEl('dgqBtnSubmitOnline').style.display = 'inline-flex';
    gqSignRefresh('dgq');
}

// ---------- Trình / Ban hành ----------
// Trạng thái trước khi dừng: trạng thái lúc trình / ban hành; trình lại sau "Bị trả lại": giữ trạng thái trước của lần trình đầu
function dgqPrevStatus(claim) {
    var st = dgqCaseStatus(claim);
    if (DGQ_SOURCE.indexOf(st) >= 0) return st;
    return (claim.dungGiaiQuyet && claim.dungGiaiQuyet.previousStatus) || '';
}
function dgqData(x) {
    return { canCuCode: x.canCuCode, canCuText: x.canCuText, canCu: x.canCu, lyDo: x.lyDo, bienPhap: x.bienPhap, bienPhapText: dgqBienPhapFull(x), coQuanNhan: x.coQuanNhan, coQuanNhanId: x.coQuanNhanId || '', thuLyNo: x.thuLy.no || '', thuLyDate: x.thuLy.date || '', thuHoi: x.thuHoi || '', thuHoiReason: x.thuHoiReason || '' };
}
// Ký số: trình Lãnh đạo Loại trình "Dừng giải quyết" -> "Chờ duyệt"; cấp cuối Ký duyệt -> "Dừng giải quyết" (dgqOnApplied)
function dgqSubmitOnline() {
    var claim = dgqClaim;
    if (!claim || !dgqOnlineFile) return;
    var sign = gqSignCollect('dgq');
    if (!sign) return;
    var x = dgqFormData();
    var prevSt = dgqPrevStatus(claim);
    var gen = dgqOnlineFile.source === 'generated';
    var fileName = dgqOnlineFile.name;
    var body = gen ? dgqOnlineFile.bodyHtml : '';
    var draftDoc = { source: gen ? 'generated' : 'uploaded', formNo: DGQ_FORM, docTitle: DGQ_DOC_TITLE, generatedName: gen ? fileName : '', uploadedName: gen ? '' : fileName, bodyHtml: body };
    var data = dgqData(x);
    var signDoc = Object.assign({ method: 'Ký số', file: gen ? dgqDocBaseName(claim) + '.pdf' : fileName, enableRoomSig: sign.enableNhay, sigCoords: sign.coords, docNumber: gen ? x.docNumber : '', docDate: gen ? x.docDate : '' }, data, tlktGqExtra('dgq', dgqOnlineFile, dgqDocSrc, sign.content));
    var res = gqSubmit(claim, DGQ_KIND, sign.content, [], { assignee: sign.assignees[0] || '', assignees: sign.assignees, reason: dgqReasonFull(x), resultStatus: DGQ_RESULT, draftDoc: draftDoc, signDoc: signDoc });
    if (!res || res.ok === false) { showToast(res ? res.message : 'Không trình được hồ sơ.', 'error'); return; }
    if (typeof dcgqTagHistory === 'function') dcgqTagHistory(claim, res.record, x);
    gqSaveData(claim, { dungGiaiQuyet: Object.assign({ docNumber: signDoc.docNumber, docDate: signDoc.docDate, fileName: fileName, bodyHtml: body, formNo: DGQ_FORM, signingMethod: 'Ký số', previousStatus: prevSt, submittedAt: gqNow() }, data) });
    closeDgqModal();
    gqAfterSubmit(claim, DGQ_KIND);
}
// Gọi từ gqApplyRecord khi vụ việc nhận trạng thái mới từ kho luồng: cấp cuối Ký duyệt Loại trình "Dừng giải quyết"
function dgqOnApplied(c, r, st) {
    var a = r && r.approval;
    if (!a || a.kind !== DGQ_KIND || st !== DGQ_RESULT) return;
    var sd = a.signDoc || {};
    var signed = typeof hdcvSignedName === 'function' ? hdcvSignedName(sd.file || '') : sd.file;
    var d = Object.assign({}, c.dungGiaiQuyet || {}, { signingMethod: 'Ký số', signedFile: signed, issuedAt: gqToday(), attachments: Array.isArray(sd.attachments) ? JSON.parse(JSON.stringify(sd.attachments)) : [] });
    if (!d.bodyHtml && a.draftDoc && a.draftDoc.bodyHtml) d.bodyHtml = a.draftDoc.bodyHtml;
    c.dungGiaiQuyet = d;
    c.slaStatus = 'danger';
    c.slaText = 'Vụ việc đã dừng giải quyết';
    try { gqSaveData(c, { dungGiaiQuyet: d }); } catch (e) { /* mockup */ }
}
// Ký ngoài: kiểm tra thông tin + tệp PDF đã ký -> popup xác nhận -> ban hành trực tiếp
function dgqSubmitOffline() {
    if (!dgqClaim) return;
    var first = dgqValidateInfo();
    if (!dgqOfflineFile) {
        var fErr = dgqEl('dgqOfflineFileErr'); fErr.textContent = DGQ_OFF_MSG; fErr.style.display = 'block';
        var drop = dgqEl('dgqOfflineDrop'); drop.classList.add('is-error'); first = first || drop;
    }
    if (first) { if (first.focus) first.focus(); return; }
    var overlay = dgqEl('customConfirmOverlay'), btnYes = dgqEl('customConfirmBtnYes'), btnNo = dgqEl('customConfirmBtnNo');
    var prevZ = overlay ? overlay.style.zIndex : '';
    var restore = function () { if (overlay) overlay.style.zIndex = prevZ; if (btnYes) btnYes.style.backgroundColor = ''; };
    showConfirmModal('Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Hồ sơ sẽ chuyển sang trạng thái "' + DGQ_RESULT + '". Bạn có chắc chắn muốn ban hành văn bản?',
        function () { restore(); dgqIssueOffline(); },
        { title: 'Xác nhận ban hành văn bản', btnYesText: 'Ban hành', btnYesClass: 'btn-success', btnNoText: 'Hủy bỏ' });
    if (overlay) overlay.style.zIndex = '10050';
    if (btnYes) btnYes.style.backgroundColor = '#16a34a';
    if (btnNo) btnNo.addEventListener('click', restore, { once: true });
}
function dgqIssueOffline() {
    var claim = dgqClaim;
    if (!claim || !dgqOfflineFile) return;
    var W = gqW();
    var x = dgqFormData();
    var file = dgqOfflineFile.name;
    var prevSt = dgqPrevStatus(claim);
    var title = 'Ban hành Thông báo dừng giải quyết yêu cầu bồi thường (Ký ngoài)';
    var thText = typeof dcgqThuHoiText === 'function' ? dcgqThuHoiText(x) : '';
    claim.status = DGQ_RESULT;
    claim.wfReturned = null;
    claim.slaStatus = 'danger';
    claim.slaText = 'Vụ việc đã dừng giải quyết';
    if (!Array.isArray(claim.timeline)) claim.timeline = [];
    claim.timeline.push({ title: title, date: gqToday(), desc: 'Ban hành văn bản Mẫu 05/BTNN - ' + DGQ_DOC_TITLE + ' đã ký ngoài hệ thống (' + file + '). ' + dgqReasonFull(x) + '.' + (thText ? ' ' + thText : '') + ' Hồ sơ chuyển từ [' + prevSt + '] sang trạng thái [' + DGQ_RESULT + '].', status: 'completed' });
    try {
        var rec = gqEnsureRecord(claim) || gqRecord(claim);
        if (rec && W) { rec.status = DGQ_RESULT; W.addHistory(rec, title, dgqReasonFull(x) + '. Văn bản đã ký: ' + file + '.' + (thText ? ' ' + thText : '')); W.upsertRecord(rec); }
    } catch (e) { /* mockup: bỏ qua lỗi luồng */ }
    gqSaveData(claim, { status: DGQ_RESULT, dungGiaiQuyet: Object.assign({ fileName: file, signedFile: file, formNo: DGQ_FORM, signingMethod: 'Ký ngoài', previousStatus: prevSt, issuedAt: gqNow(), attachments: typeof tlktGet === 'function' ? tlktGet('dgq') : [] }, dgqData(x)) });
    // Liên thông Tạm ứng kinh phí / Chi trả: xử lý như Đình chỉ giải quyết (quan_ly_kinh_phi_kpdc.js)
    if (typeof kpdcApplyStored === 'function') { try { kpdcApplyStored(claim, gqRecord(claim), 'dungGiaiQuyet'); } catch (e) { /* mockup */ } }
    closeDgqModal();
    saveClaimsToLocal();
    renderClaimsTable();
    var detail = document.getElementById('caseDetailSection');
    if (detail && detail.style.display === 'block' && selectedClaimId === claim.id) showCaseDetail(claim.id, false);
    showToast('Đã ban hành Thông báo dừng giải quyết (Ký ngoài) cho vụ việc ' + claimVvLabel(claim) + '. Hồ sơ chuyển sang trạng thái [' + DGQ_RESULT + '].', 'success');
}

// =====================================================================
// Khối xem chi tiết "Thông tin dừng giải quyết" (tab Chi tiết giải quyết bồi thường, khối Hoãn / Tạm đình chỉ / Đình chỉ - hdcv)
// =====================================================================
(function () {
    if (typeof HDCV_TYPES === 'undefined') return;
    HDCV_TYPES.dgq = { status: DGQ_RESULT, kind: DGQ_KIND, label: 'Thông tin dừng giải quyết', data: 'dungGiaiQuyet' };
    var origEntries = window.hdcvEntries, origHtml = window.hdcvEntryHtml;
    if (typeof origEntries === 'function') window.hdcvEntries = function (claim) {
        var out = origEntries.apply(this, arguments).filter(function (e) { return e.t !== 'dgq'; });
        try { var e = dgqEntry(claim); if (e) { e.owner = ((gqRecord(claim) || {}).rootUnitId) || ''; out.push(e); } } catch (er) { /* mockup */ }
        return out;
    };
    if (typeof origHtml === 'function') window.hdcvEntryHtml = function (e, withTitle) {
        return e && e.t === 'dgq' ? dgqEntryHtml(e, withTitle) : origHtml.apply(this, arguments);
    };
})();
// Entry: đã ban hành (Dừng giải quyết) | Chờ duyệt / Bị trả lại (phiếu trình Loại trình "Dừng giải quyết")
function dgqEntry(claim) {
    var st = canonicalClaimStatus(claim.status);
    var rec = typeof gqRecord === 'function' ? gqRecord(claim) : null;
    var a = rec && rec.approval;
    var d = claim.dungGiaiQuyet;
    if (st === DGQ_RESULT && d) {
        var sd = (a && a.kind === DGQ_KIND && a.signDoc) || {};
        var method = d.signingMethod || sd.method || '';
        var signed = d.signedFile || (method === 'Ký số' && typeof hdcvSignedName === 'function' ? hdcvSignedName(sd.file || d.fileName) : d.fileName);
        return {
            t: 'dgq', state: 'issued', signMode: method, docNo: d.docNumber || sd.docNumber || '', docDate: d.docDate || sd.docDate || '',
            canCu: d.canCuText || '', lyDo: d.lyDo || '', bienPhap: d.bienPhapText || '', thuHoi: d.thuHoi || sd.thuHoi || '', thuHoiReason: d.thuHoiReason || sd.thuHoiReason || '',
            file: signed ? { name: signed, size: '', fileId: '', bodyHtml: method === 'Ký số' ? (d.bodyHtml || (a && a.kind === DGQ_KIND && a.draftDoc ? a.draftDoc.bodyHtml : '') || '') : '' } : null,
            docs: hdcvRows(d.attachments || sd.attachments || [])
        };
    }
    if (!a || !rec) return null;
    var pend = st === 'Chờ duyệt' && rec.status === 'Chờ duyệt' && a.kind === DGQ_KIND;
    var rej = st === 'Bị trả lại' && rec.returned && rec.returned.kind === DGQ_KIND && a.kind === DGQ_KIND;
    if (!pend && !rej) return null;
    var s = a.signDoc || {}, dd = a.draftDoc || {};
    var draftName = (dd.source === 'uploaded' ? dd.uploadedName : dd.generatedName) || (s.docFileMeta && s.docFileMeta.name) || s.file || '';
    return {
        t: 'dgq', state: pend ? 'pending' : 'rejected', signMode: 'Ký số', docNo: s.docNumber || '', docDate: s.docDate || '',
        canCu: s.canCuText || '', lyDo: s.lyDo || '', bienPhap: s.bienPhapText || '', thuHoi: s.thuHoi || '', thuHoiReason: s.thuHoiReason || '',
        file: draftName ? { name: draftName, size: (s.docFileMeta && s.docFileMeta.size) || '', fileId: (s.docFileMeta && s.docFileMeta.keepId) || '', bodyHtml: dd.source === 'generated' ? (dd.bodyHtml || '') : '', draft: true } : null,
        docs: hdcvRows(s.attachments || []),
        rejectReason: rej ? rec.returned.reason || '' : ''
    };
}
function dgqEntryHtml(e, withTitle) {
    if (/^\/?\s*TB-?\s*$/i.test(String(e.docNo || '').trim())) e.docNo = '';
    var h = '<div class="hdcv-entry" data-hdcv-type="dgq">';
    var stTxt = e.state === 'pending' ? 'Chờ duyệt' : (e.state === 'rejected' ? 'Bị trả lại' : 'Đã ban hành');
    if (withTitle || e.state !== 'issued') h += '<div class="hdcv-sub">Dừng giải quyết yêu cầu bồi thường<small>(' + hdcvE(stTxt) + ')</small></div>';
    h += '<div class="hdcv-grid">' + hdcvField('Số văn bản', e.docNo) + hdcvField('Ngày văn bản', e.docDate) + hdcvField('Hình thức ký', e.signMode === 'Ký ngoài' ? 'Ký ngoài (Ban hành trực tiếp)' : (e.signMode ? 'Ký số trên hệ thống' : ''))
        + hdcvField('Căn cứ dừng giải quyết', e.canCu, true) + hdcvField('Lý do dừng giải quyết', e.lyDo, true) + hdcvField('Biện pháp xử lý hồ sơ', e.bienPhap, true);
    // Thu hồi kinh phí bồi thường đã chi: chỉ khi có lựa chọn (vụ việc có khoản kinh phí đã chi lúc trình / ban hành)
    if (e.thuHoi) h += hdcvField('Thu hồi kinh phí bồi thường đã chi', e.thuHoi) + (e.thuHoi === 'Không thu hồi' ? hdcvField('Lý do không thu hồi', e.thuHoiReason, true) : '');
    if (e.state === 'rejected') h += hdcvField('Lý do bị trả lại', e.rejectReason, true);
    h += '<div class="hdcv-f hdcv-full"><span class="hdcv-l">File Thông báo dừng giải quyết</span>' + hdcvFileHtml(e.file) + '</div>';
    h += typeof tlktSplitRender === 'function'
        ? tlktSplitRender(e.docs, { ownerUnit: e.owner || '' }, function (rows, title) { return '<div class="hdcv-f hdcv-full"><span class="hdcv-l">' + hdcvE(title) + '</span>' + hdcvDocsHtml(rows) + '</div>'; })
        : '<div class="hdcv-f hdcv-full"><span class="hdcv-l">Tài liệu đính kèm</span>' + hdcvDocsHtml(e.docs) + '</div>';
    return h + '</div></div>';
}

// =====================================================================
// Dữ liệu mẫu: BT-2026-541 Chờ duyệt (Thu hồi) | BT-2026-542 Bị trả lại | BT-2026-543 Dừng giải quyết (Ký số, Thu hồi) | BT-2026-544 Dừng giải quyết (Ký ngoài, Không thu hồi)
// =====================================================================
var DGQ_SEEDS = [
    { id: 'DGQ_CD', code: 'BT-2026-541', nyc: 'Tạ Quang Vinh', mode: 'submit', canCu: 'DGQ_B', prev: 'Xác minh thiệt hại', thuHoi: 'Thu hồi' },
    { id: 'DGQ_TC', code: 'BT-2026-542', nyc: 'Mai Thị Thanh Hương', mode: 'reject', canCu: 'DGQ_C', prev: 'Thương lượng', rejectReason: 'Đề nghị nêu rõ hành vi của người thi hành công vụ không thuộc phạm vi trách nhiệm bồi thường tại Chương II của Luật.' },
    { id: 'DGQ_KS', code: 'BT-2026-543', nyc: 'Lục Văn Thành', mode: 'approve', canCu: 'DGQ_D', prev: 'Chờ ban hành QĐ', thuHoi: 'Thu hồi' },
    { id: 'DGQ_KN', code: 'BT-2026-544', nyc: 'Công ty TNHH Thương mại Hòa Bình', mode: 'offline', canCu: 'DGQ_K4', prev: 'Cử người giải quyết bồi thường', coQuanId: 'UBND-HN', thuHoi: 'Không thu hồi', thuHoiReason: 'Khoản tạm ứng đã được chi cho thiệt hại có thật và sẽ được cơ quan có thẩm quyền giải quyết bồi thường xem xét khấu trừ.' }
];
function dgqSeedClaim(s, tpl) {
    var c = JSON.parse(JSON.stringify(tpl));
    ['specialStatusLogs', 'specialStatusPreviousStatus', 'hgqPrevStatus', 'dinhChi', 'hoanGiaiQuyet', 'tamDinhChi', 'tiepTucGiaiQuyet', 'dungGiaiQuyet', 'wfReturned', 'wfSynced', 'ctvvM26', 'transferTo', 'hdcvSeed'].forEach(function (k) { delete c[k]; });
    var today = dgqToday();
    var vvPref = 'VVBT-' + s.code.replace(/^BT-/, '');
    var vv = vvPref; try { if (window.BTNN_WF && BTNN_WF.uniqueVuViecFor) vv = BTNN_WF.uniqueVuViecFor(s.code, vvPref) || vvPref; } catch (e) { /* mockup */ }
    Object.assign(c, { id: s.id, code: s.code, maVuViec: vv, nyc: s.nyc, nycName: s.nyc, date: today, status: s.prev, dgqSeed: DGQ_SEED_VER, specialStatusLogs: [], slaStatus: 'normal', slaText: '' });
    c.thongBaoThuLy = { signingMethod: 'Ký số', issuedAt: today, soKyHieu: s.code.replace(/^BT-2026-/, '') + '/TB-STP', ngay: today, fileName: 'Thong_bao_thu_ly_' + s.code + '.pdf' };
    c.timeline = [
        { title: 'Tiếp nhận hồ sơ', date: today, desc: 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', status: 'completed' },
        { title: 'Cử người giải quyết bồi thường', date: today, desc: 'Ban hành Thông báo thụ lý số ' + c.thongBaoThuLy.soKyHieu + '. Hồ sơ chuyển sang trạng thái [Cử người giải quyết bồi thường].', status: 'completed' }
    ];
    if (s.prev !== 'Cử người giải quyết bồi thường') c.timeline.push({ title: s.prev, date: today, desc: 'Hồ sơ chuyển sang trạng thái [' + s.prev + '].', status: 'completed' });
    return c;
}
function dgqSeedX(s, c) {
    var cc = dgqCanCuOf(s.canCu);
    var lyDo = s.canCu === 'DGQ_K4' ? 'yêu cầu bồi thường thuộc thẩm quyền giải quyết của cơ quan khác' : dgqDefaultLyDo(s.canCu);
    return { canCuCode: s.canCu, canCuText: cc.name, canCu: cc.canCu, bienPhap: cc.bp, lyDo: lyDo, coQuanNhanId: s.coQuanId || '', coQuanNhan: s.coQuanId ? dgqCqName(s.coQuanId) : '', docNumber: s.mode === 'offline' ? '' : s.code.replace(/^BT-2026-/, '') + '/TB-STP', docDate: s.mode === 'offline' ? '' : dgqToday(), thuLy: dgqThuLy(c), thuHoi: s.thuHoi || '', thuHoiReason: s.thuHoiReason || '' };
}
function dgqSeed() {
    var W = typeof gqW === 'function' ? gqW() : null;
    if (!W || typeof claimsList === 'undefined') return false;
    var tpl = claimsList.find(function (c) { return c && c.id === 'HS1'; });
    if (!tpl) return false;
    var ver = ''; try { ver = localStorage.getItem(DGQ_SEED_KEY) || ''; } catch (e) { /* mockup */ }
    var reset = ver !== DGQ_SEED_VER;
    var done = false;
    DGQ_SEEDS.forEach(function (s) {
        var exist = claimsList.find(function (c) { return c && (c.code === s.code || c.id === s.id); });
        if (exist && !reset) return;
        if (exist) claimsList.splice(claimsList.indexOf(exist), 1);
        try { if (reset) W.removeRecord(s.code); } catch (e) { /* mockup */ }
        var c = dgqSeedClaim(s, tpl);
        claimsList.unshift(c);
        var me = W.getCurrentUserId();
        try {
            var rec = gqEnsureRecord(c);
            if (!rec) return;
            var x = dgqSeedX(s, c);
            var data = dgqData(x);
            var unit = rec.rootUnitId || '';
            var att = [{ name: 'Biên bản làm việc với người yêu cầu bồi thường', scope: 'issued', unit: unit, file: { id: '', name: 'Bien_ban_lam_viec_' + s.code + '.pdf', size: '214 KB' } }];
            if (s.mode !== 'offline') att.push({ name: 'Tờ trình đề xuất dừng giải quyết', scope: 'internal', unit: unit, file: { id: '', name: 'To_trinh_dung_giai_quyet_' + s.code + '.pdf', size: '168 KB' } });
            if (s.mode === 'offline') {
                var f = 'TB_dung_giai_quyet_' + s.code + '_ky_ngoai.pdf';
                c.status = DGQ_RESULT; c.slaStatus = 'danger'; c.slaText = 'Vụ việc đã dừng giải quyết';
                c.timeline.push({ title: 'Ban hành Thông báo dừng giải quyết yêu cầu bồi thường (Ký ngoài)', date: dgqToday(), desc: 'Văn bản đã ký ngoài hệ thống (' + f + '). ' + dgqReasonFull(x) + '. Hồ sơ chuyển từ [' + s.prev + '] sang trạng thái [' + DGQ_RESULT + '].', status: 'completed' });
                rec.status = DGQ_RESULT; W.addHistory(rec, 'Ban hành Thông báo dừng giải quyết yêu cầu bồi thường (Ký ngoài)', dgqReasonFull(x) + '. Văn bản đã ký: ' + f + '.'); W.upsertRecord(rec);
                gqRecMap[c.code] = rec;
                gqSaveData(c, { status: DGQ_RESULT, dungGiaiQuyet: Object.assign({ fileName: f, signedFile: f, formNo: DGQ_FORM, signingMethod: 'Ký ngoài', previousStatus: s.prev, issuedAt: dgqToday(), attachments: att }, data) });
                done = true;
                return;
            }
            var assignees = gqSignLevels(c).map(function (lv) { return (lv.leaders && lv.leaders[0] && lv.leaders[0].id) || ''; });
            var base = dgqDocBaseName(c);
            var body = ''; try { body = dgqBuildMau05(c, x); } catch (e) { body = ''; }
            var draftDoc = { source: 'generated', formNo: DGQ_FORM, docTitle: DGQ_DOC_TITLE, generatedName: base + '.doc', uploadedName: '', bodyHtml: body };
            var signDoc = Object.assign({ method: 'Ký số', file: base + '.pdf', enableRoomSig: true, sigCoords: [], docNumber: x.docNumber, docDate: x.docDate, docSrc: 'gen', docFileMeta: null, submitContent: DGQ_CONTENT_DEFAULT, attachments: att }, data);
            W.setCurrentUser(rec.chuTri);
            var res = W.submitForApproval(c.code, DGQ_KIND, DGQ_CONTENT_DEFAULT, [], { assignee: assignees[0] || '', assignees: assignees, reason: dgqReasonFull(x), resultStatus: DGQ_RESULT, draftDoc: draftDoc, signDoc: signDoc });
            if (!res || !res.ok) return;
            c.status = 'Chờ duyệt';
            c.timeline.push({ title: 'Trình Lãnh đạo: ' + DGQ_KIND, date: dgqToday(), desc: 'Trình Lãnh đạo ký duyệt ' + DGQ_DOC_TITLE + '. Hồ sơ chuyển sang trạng thái [Chờ duyệt].', status: 'active' });
            if (s.mode === 'reject' && assignees[0]) {
                W.setCurrentUser(assignees[0]);
                var rr = W.rejectApproval(c.code, s.rejectReason);
                if (rr && rr.ok) { c.status = 'Bị trả lại'; c.wfReturned = rr.record.returned || null; }
            }
            if (s.mode === 'approve') {
                for (var i = 0; i < 6; i++) {
                    var r0 = W.getRecord(c.code);
                    if (!r0 || r0.status !== 'Chờ duyệt' || !r0.approval) break;
                    var who = (r0.approval.assignees || [])[r0.approval.level] || assignees[r0.approval.level] || '';
                    if (!who) break;
                    W.setCurrentUser(who);
                    var ar = W.approve(c.code, 'Đồng ý ký duyệt.', '');
                    if (!ar || !ar.ok) break;
                }
            }
            try { gqRecMap[c.code] = W.getRecord(c.code); } catch (e) { /* mockup */ }
            gqSaveData(c, { dungGiaiQuyet: Object.assign({ docNumber: x.docNumber, docDate: x.docDate, fileName: base + '.doc', bodyHtml: body, formNo: DGQ_FORM, signingMethod: 'Ký số', previousStatus: s.prev, submittedAt: gqNow() }, data) });
            done = true;
        } catch (e) { if (window.console) console.error(e); } finally { if (W.getCurrentUserId() !== me) W.setCurrentUser(me); }
    });
    try { localStorage.setItem(DGQ_SEED_KEY, DGQ_SEED_VER); } catch (e) { /* mockup */ }
    // Nhận kết quả phê duyệt / từ chối của dữ liệu mẫu
    if (done && typeof gqRefreshClaimsFromWorkflow === 'function') gqRefreshClaimsFromWorkflow(false);
    return done;
}
function dgqInit() {
    var seeded = false;
    try { seeded = dgqSeed(); } catch (e) { if (window.console) console.error(e); }
    if (seeded) {
        try { saveClaimsToLocal(); } catch (e) { /* mockup */ }
        try { renderClaimsTable(); } catch (e) { /* mockup */ }
    }
}
if (document.readyState === 'complete') setTimeout(dgqInit, 0); else window.addEventListener('load', function () { setTimeout(dgqInit, 0); });
