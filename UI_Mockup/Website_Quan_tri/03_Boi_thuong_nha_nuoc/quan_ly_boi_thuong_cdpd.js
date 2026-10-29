/*
 * Tạo yêu cầu - Cán bộ chủ động phục hồi danh dự khi có đủ thông tin (prefix cdpd) - Giải quyết yêu cầu bồi thường
 * 1. Form Tạo yêu cầu: trường "Hình thức tạo hồ sơ" (Tiếp nhận yêu cầu bồi thường | Cán bộ chủ động phục hồi danh dự).
 *    Chọn "Cán bộ chủ động phục hồi danh dự": Loại yêu cầu khóa "Chỉ yêu cầu phục hồi danh dự"; Hình thức tiếp nhận hệ thống gán
 *    "Cán bộ chủ động phục hồi danh dự khi có đủ thông tin" (DM_25 - CAN_BO_PHUC_HOI_DANH_DU); Nguồn hồ sơ giữ "Tiếp nhận mới";
 *    ẩn Tìm nhanh XĐCQ, Ngày văn bản yêu cầu bồi thường, Yêu cầu khôi phục quyền, lợi ích khác; Tư cách khóa "Người bị thiệt hại";
 *    Văn bản làm căn cứ bắt buộc tối thiểu 01 dòng có tệp; không cho chọn vụ việc đang có hồ sơ chưa kết thúc.
 *    Không có Lưu nháp: nút "Trình Lãnh đạo" -> popup trình.
 * 2. Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự (hồ sơ chủ động): Ký số (Stepper 02 bước, CHỈ Tải lên từ máy,
 *    không sinh văn bản theo mẫu) / Ký ngoài (tải PDF đã ký, ban hành ngay). Nội dung trình "Chủ động phục hồi danh dự".
 *    Trình -> Chờ duyệt; Lãnh đạo từ chối -> Bị trả lại (Cập nhật: mở lại form + popup, điền sẵn, hiển thị lý do; Xóa hồ sơ: chỉ cán bộ tạo);
 *    cấp cuối Ký duyệt / Ký ngoài ban hành -> Đang phục hồi danh dự, tab Phục hồi danh dự ở Bước 2 (Bước 1 đã xong, Khối 1 hiển thị văn bản).
 *    Không qua Chờ tiếp nhận, Thông báo thụ lý (Mẫu 04/BTNN), Cử người giải quyết (Mẫu 06/BTNN); cán bộ tạo là cán bộ chủ trì.
 * 3. Lưới / bộ lọc / chi tiết: nhãn "Cán bộ chủ động PHDD" dưới Nguồn hồ sơ; bộ lọc Hình thức tiếp nhận có giá trị CAN_BO_PHUC_HOI_DANH_DU.
 * 4. Dữ liệu mẫu: 03 hồ sơ (Chờ duyệt, Bị trả lại, Đang phục hồi danh dự - Bước 2), gộp theo Mã hồ sơ, theo phiên bản CDPD_SEED_VER.
 * Dùng tiện ích sẵn có: gq*, ktlx*, tlkt*, ctvvm* (quan_ly_boi_thuong_ctvv.js), saveNewClaim, openInlineClaimForm.
 */
var CDPD_KIND = 'Chủ động phục hồi danh dự'; // Nội dung trình (Loại trình)
var CDPD_HTTN = (window.BTNN_WF && BTNN_WF.RECEIVE_METHODS && BTNN_WF.RECEIVE_METHODS.CAN_BO_PHUC_HOI_DANH_DU) || 'Cán bộ chủ động phục hồi danh dự khi có đủ thông tin';
var CDPD_DOC_TITLE = 'Thông báo tổ chức thực hiện phục hồi danh dự';
var CDPD_CONTENT_DEFAULT = 'Kính trình Lãnh đạo xem xét, ký duyệt Thông báo tổ chức thực hiện phục hồi danh dự (cán bộ chủ động phục hồi danh dự khi có đủ thông tin).';
var CDPD_REQ = 'Đây là trường bắt buộc';
var CDPD_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
var CDPD_VBCC_MSG = 'Vui lòng nhập tối thiểu 01 văn bản làm căn cứ có tệp đính kèm.';
var CDPD_VV_MSG = 'Vụ việc đang có hồ sơ giải quyết bồi thường chưa kết thúc. Vui lòng bổ sung yêu cầu phục hồi danh dự tại hồ sơ đang giải quyết.';
var CDPD_SEED_VER = '20261027cdpd2';
var CDPD_SEED_KEY = 'btnn_cdpd_seed_v';
var CDPD_NBTH = 'Người bị thiệt hại';

var cdpdHook = null;      // saveNewClaim đang chạy ở chế độ Cán bộ chủ động phục hồi danh dự
var cdpdOn = false;       // form đang ở chế độ Cán bộ chủ động phục hồi danh dự
var cdpdClaim = null, cdpdOnlineFile = null, cdpdOfflineFile = null;
var cdpdOrig = {};        // nội dung gốc của các nhãn đổi theo chế độ

function cdpdEl(id) { return document.getElementById(id); }
function cdpdE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function cdpdIs(claim) { return !!claim && (claim.cdpd === true || claim.hinhThucTiepNhan === CDPD_HTTN); }
// Loại yêu cầu = Chỉ yêu cầu phục hồi danh dự (mọi nguồn hồ sơ)
function cdpdHonorOnly(c) { try { return !!c && (typeof claimRequestKind === 'function' ? claimRequestKind(c) === 'honor' : c.requestType === 'honor'); } catch (e) { return false; } }
function cdpdShow(el, on, disp) { if (el) el.style.display = on ? (disp || '') : 'none'; }
function cdpdTodayText() { var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); }; return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear(); }
function cdpdNorm(s) { return typeof normalizeStatusText === 'function' ? normalizeStatusText(s) : String(s || '').toLowerCase().trim(); }
// Mã vụ việc của hồ sơ
function cdpdVvOf(c) { try { return (typeof claimVvCode === 'function' && claimVvCode(c)) || c.maVuViec || ''; } catch (e) { return c.maVuViec || ''; } }
// Hồ sơ đã kết thúc xử lý (Tab Đã xử lý)
function cdpdEnded(c) {
    try { var st = gqldCaseStatus(c); return (typeof GQLD_DONE_STATUSES !== 'undefined' ? GQLD_DONE_STATUSES : []).indexOf(st) >= 0; } catch (e) { return false; }
}
// Cán bộ đang đăng nhập là cán bộ tạo hồ sơ
function cdpdIsCreator(c) {
    var me = typeof getCurrentSimulatedOfficer === 'function' ? getCurrentSimulatedOfficer() : '';
    return !!c && !!me && cdpdNorm(c.cdpdCreatedBy || c.assignedOfficer) === cdpdNorm(me);
}
// Lưu dữ liệu nghiệp vụ của hồ sơ chủ động vào hồ sơ luồng (giữ khi tải lại trang)
function cdpdPersist(c) {
    try {
        gqSaveData(c, {
            cdpd: true, hinhThucTiepNhan: CDPD_HTTN, nguonHoSo: c.nguonHoSo || 'Tiếp nhận mới', requestType: 'honor', restoreHonor: true,
            cdpdCreatedBy: c.cdpdCreatedBy || '', cdpdCreatedById: c.cdpdCreatedById || '', cdpdDoc: c.cdpdDoc || null
        });
    } catch (e) { /* mockup */ }
}

function cdpdCss() {
    if (cdpdEl('cdpdCss')) return;
    var st = document.createElement('style');
    st.id = 'cdpdCss';
    st.textContent = [
        '.cdpd-mode { background:#ecfeff; border:1.5px solid #67e8f9; border-radius:8px; padding:14px 16px; margin-bottom:20px; }',
        '.cdpd-mode .cdpd-opts { display:flex; gap:22px; flex-wrap:wrap; padding-top:6px; }',
        '.cdpd-mode label { cursor:pointer; font-size:13px; font-weight:600; display:inline-flex; align-items:center; gap:6px; color:#0f172a; }',
        '.cdpd-mode .cdpd-note { margin-top:8px; font-size:12.5px; color:#0e7490; line-height:1.5; }',
        '.cdpd-badge { background:#cffafe; color:#0e7490; border:1px solid #67e8f9; white-space:nowrap; font-size:11px; }',
        '.cdpd-err { display:none; color:var(--danger-color, #dc2626); font-size:12px; margin-top:6px; }',
        '.cdpd-ret { display:none; background:#fef2f2; border:1px solid #fecaca; border-left:4px solid #dc2626; border-radius:8px; padding:12px 16px; margin-bottom:16px; font-size:13px; color:#7f1d1d; }',
        '.cdpd-m26-note { background:#ecfeff; border:1px solid #a5f3fc; border-radius:6px; padding:8px 12px; margin-bottom:10px; font-size:12.5px; color:#0e7490; }'
    ].join('\n');
    document.head.appendChild(st);
}

// =====================================================================
// 1. Form Tạo yêu cầu: Hình thức tạo hồ sơ
// =====================================================================
function cdpdEnsureFormUi() {
    cdpdCss();
    var panel = cdpdEl('inlineClaimFormPanel');
    if (!panel || cdpdEl('cdpdModeBlock')) return;
    var body = panel.querySelector('.inline-form-body');
    var block = document.createElement('div');
    block.id = 'cdpdModeBlock';
    block.className = 'cdpd-mode';
    block.innerHTML = '<span class="form-label" style="font-weight:700; color:#0e7490;">Hình thức tạo hồ sơ <span class="required">*</span></span>'
        + '<div class="cdpd-opts">'
        + '<label><input type="radio" name="cdpdModeRadio" value="tiepnhan" checked onchange="cdpdSetMode(false)"> Tiếp nhận yêu cầu bồi thường</label>'
        + '<label><input type="radio" name="cdpdModeRadio" value="cdpd" onchange="cdpdSetMode(true)"> <i class="fa-solid fa-ribbon" style="color:#0891b2;"></i> Cán bộ chủ động phục hồi danh dự</label>'
        + '</div>'
        + '<div class="cdpd-note" id="cdpdModeNote" style="display:none;"><i class="fa-solid fa-circle-info"></i> Hồ sơ do cán bộ chủ động lập khi có đủ thông tin để phục hồi danh dự cho người bị thiệt hại. '
        + 'Hồ sơ không qua Thông báo thụ lý (Mẫu 04/BTNN) và Cử người giải quyết bồi thường (Mẫu 06/BTNN); bấm <b>Trình Lãnh đạo</b> để trình Thông báo tổ chức thực hiện phục hồi danh dự '
        + '(tải lên từ máy hoặc ký ngoài). Văn bản được ký duyệt / ban hành thì hồ sơ chuyển sang bước Ý kiến phản hồi của tiến trình phục hồi danh dự.</div>'
        + '<div class="cdpd-ret" id="cdpdFormReturned"></div>';
    body.insertBefore(block, body.firstChild);
    // Hình thức tiếp nhận (chỉ đọc) khi chế độ Cán bộ chủ động phục hồi danh dự
    var sel = cdpdEl('claimHinhThucTiepNhan');
    if (sel && !cdpdEl('cdpdHttnText')) {
        var inp = document.createElement('input');
        inp.type = 'text'; inp.id = 'cdpdHttnText'; inp.className = 'form-control'; inp.disabled = true; inp.value = CDPD_HTTN;
        inp.title = 'Do hệ thống gán. Không cho phép thay đổi.'; inp.style.display = 'none';
        sel.parentNode.insertBefore(inp, sel.nextSibling);
    }
    // Lỗi Mã vụ việc đang có hồ sơ chưa kết thúc
    var pick = cdpdEl('claimVuViecPickGroup');
    if (pick && !cdpdEl('cdpdVvErr')) { var e1 = document.createElement('div'); e1.id = 'cdpdVvErr'; e1.className = 'cdpd-err'; e1.textContent = CDPD_VV_MSG; pick.appendChild(e1); }
    // Lỗi Văn bản làm căn cứ
    var vb = cdpdEl('claimVanBanCanCuSection');
    if (vb && !cdpdEl('cdpdVbccErr')) { var e2 = document.createElement('div'); e2.id = 'cdpdVbccErr'; e2.className = 'cdpd-err'; e2.textContent = CDPD_VBCC_MSG; vb.appendChild(e2); }
    // Nút cuối form: Hủy bỏ | Trình Lãnh đạo (không có Lưu nháp)
    var foot = panel.querySelector('.inline-form-footer');
    if (foot && !cdpdEl('cdpdFormButtons')) {
        var b = document.createElement('div');
        b.id = 'cdpdFormButtons';
        b.style.cssText = 'display:none; gap:10px; width:100%; justify-content:flex-end;';
        b.innerHTML = '<button class="btn btn-secondary" onclick="closeInlineClaimForm()">Hủy bỏ</button>'
            + '<button class="btn btn-primary" id="cdpdBtnSubmitForm" onclick="cdpdSubmitForm()"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>';
        foot.appendChild(b);
    }
    // Loại người yêu cầu đổi -> giữ Tư cách Người bị thiệt hại
    document.getElementsByName('claimNYCType').forEach(function (r) { r.addEventListener('change', function () { if (cdpdOn) setTimeout(cdpdLockRole, 0); }); });
}
function cdpdNycTitleEl() {
    var panel = cdpdEl('inlineClaimFormPanel');
    if (!panel) return null;
    if (cdpdOrig.nycEl) return cdpdOrig.nycEl;
    var found = null;
    panel.querySelectorAll('div').forEach(function (d) { if (!found && !d.children.length && /^THÔNG TIN CHI TIẾT NGƯỜI YÊU CẦU BỒI THƯỜNG$/.test(d.textContent.trim())) found = d; });
    if (found) { cdpdOrig.nycEl = found; cdpdOrig.nycText = found.textContent.trim(); }
    return found;
}
function cdpdLockRole() {
    var role = cdpdEl('claimNYCRole');
    if (!role) return;
    if (role.value !== CDPD_NBTH) {
        role.value = CDPD_NBTH;
        if (typeof toggleNbthBlock === 'function') toggleNbthBlock(CDPD_NBTH);
        if (typeof toggleDocsByRole === 'function') toggleDocsByRole(CDPD_NBTH);
    }
    role.disabled = true;
    role.title = 'Hồ sơ cán bộ chủ động phục hồi danh dự: thông tin người bị thiệt hại.';
}
// Chế độ form: on = Cán bộ chủ động phục hồi danh dự; isNew = Thêm mới (khôi phục giá trị mặc định khi bỏ chế độ)
function cdpdApplyMode(on, isNew) {
    cdpdOn = !!on;
    var show = cdpdShow;
    show(cdpdEl('cdpdModeNote'), on);
    // Loại yêu cầu: khóa Chỉ yêu cầu phục hồi danh dự
    document.getElementsByName('claimRequestType').forEach(function (r) {
        if (on) { r.checked = r.value === 'honor'; r.disabled = r.value !== 'honor'; }
        else r.disabled = false;
        var lb = r.closest('label'); if (lb) lb.style.opacity = (on && r.value !== 'honor') ? '0.45' : '';
    });
    if (on) handleRequestTypeChange('honor');
    else if (isNew) { document.getElementsByName('claimRequestType').forEach(function (r) { r.checked = r.value === 'both'; }); handleRequestTypeChange('both'); }
    // Tìm nhanh từ vụ việc Xác định CQGQBT
    if (on) show(cdpdEl('quickSearchContainer'), false); else if (typeof gqnlApplyQuickSearchVisibility === 'function') gqnlApplyQuickSearchVisibility();
    // Hình thức tiếp nhận: hệ thống gán, chỉ đọc
    var sel = cdpdEl('claimHinhThucTiepNhan'), txt = cdpdEl('cdpdHttnText');
    show(sel, !on); show(txt, on);
    if (on) cdpdSetHttnSelect();
    else if (isNew && typeof setClaimNguonHoSoField === 'function') setClaimNguonHoSoField('Tiếp nhận mới', 'Trực tiếp', false);
    // Ngày văn bản yêu cầu bồi thường: không áp dụng
    var dd = cdpdEl('claimRequestDocDate'); var ddg = dd ? dd.closest('.form-group') : null;
    show(ddg, !on);
    // Thông tin phục vụ báo cáo TT08 (Ngày thụ lý...): không áp dụng
    var tt = cdpdEl('tt08ReportingBlock');
    if (tt) { if (on) { if (tt.style.display !== 'none') tt.dataset.cdpdPrev = tt.style.display || 'block'; tt.style.display = 'none'; } else if (tt.dataset.cdpdPrev) { tt.style.display = tt.dataset.cdpdPrev; delete tt.dataset.cdpdPrev; } }
    // Yêu cầu khôi phục quyền, lợi ích hợp pháp khác: không áp dụng
    var other = cdpdEl('claimNeedOtherRestore'); var og = other ? other.closest('.form-group') : null;
    if (on && other) { other.checked = false; show(cdpdEl('claimOtherRestoreWrapper'), false); }
    show(og, !on);
    // Khối phục hồi danh dự: ẩn checkbox đề nghị, đổi tiêu đề
    var hs = cdpdEl('claimHonorSection');
    if (hs) {
        var head = hs.children[0];
        if (head && cdpdOrig.honorHead == null) cdpdOrig.honorHead = head.innerHTML;
        if (head) head.innerHTML = on ? '<i class="fa-solid fa-ribbon" style="font-size: 16px;"></i> HÌNH THỨC PHỤC HỒI DANH DỰ' : cdpdOrig.honorHead;
        var need = cdpdEl('claimNeedRestoreHonor'); var needRow = need ? need.closest('label') : null;
        if (needRow && needRow.parentNode) show(needRow.parentNode, !on);
        var dw = cdpdEl('claimRestoreHonorDescWrapper');
        if (dw && !cdpdOrig.honorLblEl) dw.querySelectorAll('div').forEach(function (d) { if (!cdpdOrig.honorLblEl && !d.children.length && /^Hình thức đề nghị phục hồi danh dự/.test(d.textContent.trim())) cdpdOrig.honorLblEl = d; });
        var lbl = cdpdOrig.honorLblEl || null;
        if (lbl && cdpdOrig.honorLbl == null) cdpdOrig.honorLbl = lbl.textContent;
        if (lbl) lbl.textContent = on ? 'Hình thức phục hồi danh dự (Điều 56):' : cdpdOrig.honorLbl;
        if (dw && on) { dw.style.borderTop = 'none'; dw.style.marginTop = '0'; dw.style.paddingTop = '0'; } else if (dw) { dw.style.borderTop = ''; dw.style.marginTop = ''; dw.style.paddingTop = ''; }
    }
    // Thông tin người bị thiệt hại: Tư cách khóa Người bị thiệt hại
    var nt = cdpdNycTitleEl();
    if (nt) nt.textContent = on ? 'THÔNG TIN NGƯỜI BỊ THIỆT HẠI' : cdpdOrig.nycText;
    // Nhãn "Loại người yêu cầu" -> "Loại người bị thiệt hại"
    var tg = cdpdEl('claimNYCTypeGroup'), tl = tg ? tg.previousElementSibling : null;
    if (tl && tl.classList.contains('form-label')) {
        if (cdpdOrig.nycTypeLbl == null) cdpdOrig.nycTypeLbl = tl.innerHTML;
        tl.innerHTML = on ? 'Loại người bị thiệt hại<span class="required">*</span>' : cdpdOrig.nycTypeLbl;
    }
    if (on) cdpdLockRole(); else { var role = cdpdEl('claimNYCRole'); if (role) { role.disabled = false; role.title = ''; } }
    // Văn bản làm căn cứ: bắt buộc
    var vt = document.querySelector('#claimVanBanCanCuSection .info-group-title');
    if (vt) {
        if (cdpdOrig.vbccTitle == null) cdpdOrig.vbccTitle = vt.innerHTML;
        vt.innerHTML = on ? 'Văn bản làm căn cứ phục hồi danh dự <span class="required">*</span>' : cdpdOrig.vbccTitle;
    }
    cdpdClearFormErr();
    // Tiêu đề form
    var title = document.querySelector('#inlineClaimFormPanel .inline-form-title');
    if (title && on) title.innerHTML = '<i class="fa-solid fa-ribbon"></i> ' + (editingClaimId ? 'CẬP NHẬT HỒ SƠ CHỦ ĐỘNG PHỤC HỒI DANH DỰ' : 'TẠO HỒ SƠ CHỦ ĐỘNG PHỤC HỒI DANH DỰ');
    else if (title && !on && !editingClaimId) title.innerHTML = '<i class="fa-solid fa-keyboard"></i> NHẬP LIỆU HỒ SƠ VỤ VIỆC';
    // Nút cuối form
    var fb = cdpdEl('cdpdFormButtons');
    if (on) {
        ['defaultFormButtons', 'rejectFlowButtonsContainer', 'bosungFlowButtonsContainer'].forEach(function (id) { var el = cdpdEl(id); if (el) { if (el.style.display !== 'none') el.dataset.cdpdPrev = el.style.display; el.style.display = 'none'; } });
        show(fb, true, 'flex');
    } else {
        show(fb, false);
        ['defaultFormButtons', 'rejectFlowButtonsContainer', 'bosungFlowButtonsContainer'].forEach(function (id) { var el = cdpdEl(id); if (el && el.dataset.cdpdPrev) { el.style.display = el.dataset.cdpdPrev; delete el.dataset.cdpdPrev; } });
    }
}
function cdpdSetMode(on) { cdpdApplyMode(on, !editingClaimId); }
// Hình thức tiếp nhận của hồ sơ = Cán bộ chủ động phục hồi danh dự khi có đủ thông tin
function cdpdSetHttnSelect() {
    var sel = cdpdEl('claimHinhThucTiepNhan'); if (!sel) return;
    if (!Array.from(sel.options).some(function (o) { return o.value === CDPD_HTTN; })) { var o = document.createElement('option'); o.value = CDPD_HTTN; o.textContent = CDPD_HTTN; sel.appendChild(o); }
    sel.value = CDPD_HTTN;
}
function cdpdClearFormErr() {
    ['cdpdVvErr', 'cdpdVbccErr'].forEach(function (id) { cdpdShow(cdpdEl(id), false); });
    var pk = cdpdEl('claimVuViecPick'); if (pk) pk.classList.remove('is-invalid');
    var tb = cdpdEl('claimVanBanCanCuTable'); if (tb) tb.style.outline = '';
}
// Sau khi mở form (Thêm mới / Cập nhật): dựng khối Hình thức tạo hồ sơ theo hồ sơ
function cdpdAfterOpenForm(id) {
    cdpdEnsureFormUi();
    var claim = id ? gqClaim(id) : null;
    var block = cdpdEl('cdpdModeBlock'); if (!block) return;
    var radios = document.getElementsByName('cdpdModeRadio');
    var ret = cdpdEl('cdpdFormReturned');
    cdpdShow(ret, false);
    if (!claim) {
        block.style.display = '';
        radios.forEach(function (r) { r.disabled = false; r.checked = r.value === 'tiepnhan'; });
        cdpdApplyMode(false, true);
    } else if (cdpdIs(claim)) {
        block.style.display = '';
        radios.forEach(function (r) { r.checked = r.value === 'cdpd'; r.disabled = true; });
        cdpdApplyMode(true, false);
        var rec = gqRecord(claim);
        if (rec && rec.status === 'Bị trả lại' && rec.returned) {
            var W = gqW();
            ret.innerHTML = '<div style="display:flex; align-items:center; gap:8px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> HỒ SƠ BỊ LÃNH ĐẠO TRẢ LẠI</div>'
                + '<div><b>Lý do bị trả lại:</b> ' + cdpdE(rec.returned.reason || '--') + '</div>'
                + '<div style="font-size:12px; margin-top:2px;">Người từ chối: ' + cdpdE((rec.returned.by && W ? W.userName(rec.returned.by) : '') || '--') + ' • Thời điểm: ' + cdpdE(rec.returned.at || '--') + '</div>';
            ret.style.display = 'block';
        }
    } else {
        block.style.display = 'none';
        cdpdApplyMode(false, false);
    }
}
// Trình Lãnh đạo: kiểm tra riêng của hồ sơ chủ động -> dùng kiểm tra và lưu của form (saveNewClaim) -> mở popup trình
function cdpdSubmitForm() {
    if (typeof clearClaimValidation === 'function') clearClaimValidation();
    cdpdClearFormErr();
    var first = null;
    // Vụ việc đã có Mã vụ việc: không cho chọn vụ việc đang có hồ sơ chưa kết thúc (dùng chức năng bổ sung phục hồi danh dự trong hồ sơ)
    if (!editingClaimId && typeof getClaimVuViecMode === 'function' && getClaimVuViecMode() === 'existing') {
        var vv = typeof readClaimVuViecInput === 'function' ? readClaimVuViecInput('claimVuViecPick') : '';
        var busy = vv ? claimsList.filter(function (c) { return c && cdpdVvOf(c) === vv && !cdpdEnded(c); }) : [];
        if (busy.length) {
            var pk = cdpdEl('claimVuViecPick'); if (pk) pk.classList.add('is-invalid');
            cdpdShow(cdpdEl('cdpdVvErr'), true, 'block');
            first = pk;
        }
    }
    // Văn bản làm căn cứ: tối thiểu 01 dòng có tệp
    var rows = typeof collectVanBanCanCuRows === 'function' ? collectVanBanCanCuRows() : [];
    if (!rows.some(function (r) { return r.file; })) {
        cdpdShow(cdpdEl('cdpdVbccErr'), true, 'block');
        var tb = cdpdEl('claimVanBanCanCuTable'); if (tb) tb.style.outline = '1px solid #dc2626';
        first = first || cdpdEl('claimVanBanCanCuSection');
    }
    if (first) {
        if (first.scrollIntoView) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (first.focus) first.focus();
        showToast(cdpdEl('cdpdVvErr').style.display === 'block' ? CDPD_VV_MSG : CDPD_VBCC_MSG, 'error');
        return;
    }
    // Ngày văn bản yêu cầu bồi thường không áp dụng: điền tạm để qua kiểm tra chung, xóa sau khi lưu
    var dd = cdpdEl('claimRequestDocDate'); var filled = false;
    if (dd && !dd.value.trim()) { dd.value = cdpdTodayText(); filled = true; }
    var adv = cdpdEl('claimNeedAdvance'); if (adv) adv.checked = false;
    var role = cdpdEl('claimNYCRole'); if (role) role.disabled = false;
    cdpdSetHttnSelect();
    var prev = editingClaimId ? gqClaim(editingClaimId) : null;
    cdpdHook = { editing: editingClaimId || null, prevLen: prev && Array.isArray(prev.timeline) ? prev.timeline.length : 0, filledDate: filled };
    try { saveNewClaim(); } finally {
        if (role && cdpdOn) role.disabled = true;
        // Không qua kiểm tra chung của form: giữ nguyên form, bỏ giá trị điền tạm
        if (cdpdHook) { if (filled && dd) dd.value = ''; cdpdHook = null; }
    }
}
// Form đã lưu (saveNewClaim gọi openTndModal): gắn dữ liệu hồ sơ chủ động, mở popup trình
function cdpdAfterFormSave(id, h) {
    var c = gqClaim(id); if (!c) return;
    var isNew = !h.editing;
    c.cdpd = true;
    c.hinhThucTiepNhan = CDPD_HTTN;
    c.nguonHoSo = 'Tiếp nhận mới';
    c.requestType = 'honor';
    c.restoreHonor = true;
    c.phddStarted = false;
    if (h.filledDate) c.requestDocDate = '';
    if (isNew) {
        c.cdpdCreatedBy = typeof getCurrentSimulatedOfficer === 'function' ? getCurrentSimulatedOfficer() : '';
        c.cdpdCreatedById = typeof gqActingUserId === 'function' ? gqActingUserId() : '';
        c.cdpdDraft = true;
        c.assignedOfficer = c.cdpdCreatedBy; // cán bộ tạo là cán bộ chủ trì
        c.timeline = [{ title: 'Tạo hồ sơ chủ động phục hồi danh dự', date: gqToday(), desc: 'Cán bộ chủ động lập hồ sơ phục hồi danh dự khi có đủ thông tin (Hình thức tiếp nhận: ' + CDPD_HTTN + ').', status: 'completed' }];
    } else {
        c.timeline = (c.timeline || []).slice(0, h.prevLen);
    }
    openCdpdModal(id);
}

// =====================================================================
// 2. Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự (hồ sơ chủ động) - chỉ Tải lên từ máy / Ký ngoài
// =====================================================================
function cdpdIsOffline() { var r = cdpdEl('cdpdSigningMethodOffline'); return !!(r && r.checked); }
function cdpdEnsureModal() {
    if (cdpdEl('modalCdpd')) return;
    var card = function (id, val, title, desc, ico, off, checked) {
        return '<label class="sign-card' + (checked ? ' active' : '') + '" id="' + id + '" for="cdpdSigningMethod' + (off ? 'Offline' : 'Online') + '">'
            + '<input type="radio" name="cdpdSigningMethod" id="cdpdSigningMethod' + (off ? 'Offline' : 'Online') + '" value="' + val + '"' + (checked ? ' checked' : '') + ' onchange="cdpdToggleSigningMethod(\'' + val + '\')">'
            + '<div class="sign-card-content"><div class="sign-card-icon' + (off ? ' offline' : '') + '"><i class="fa-solid ' + ico + '"></i></div><div class="sign-card-text"><div class="sign-card-title">' + title + '</div><div class="sign-card-desc">' + desc + '</div></div></div>'
            + '<div class="sign-card-check"><i class="' + (checked ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle') + '"></i></div></label>';
    };
    var drop = function (inputId, dropId, accept, onchange, ondrop, hint) {
        return '<input type="file" id="' + inputId + '" accept="' + accept + '" style="display:none;" onchange="' + onchange + '(this)">'
            + '<div id="' + dropId + '" class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'' + inputId + '\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="' + ondrop + '(event)">'
            + '<i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-title">Kéo thả tệp vào đây hoặc bấm để chọn tệp</div><div class="ktlx-drop-hint">' + hint + '</div></div>';
    };
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modalCdpd" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div id="modalCdpdContainer" class="sticky-modal-container" style="background:#fff; width:850px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3); transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">'
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#cffafe; color:#0891b2; font-size:14px;"><i class="fa-solid fa-ribbon"></i></span><span>TRÌNH KÝ THÔNG BÁO TỔ CHỨC THỰC HIỆN PHỤC HỒI DANH DỰ</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Hồ sơ cán bộ chủ động phục hồi danh dự<span style="margin:0 6px;">•</span>Mã vụ việc: <strong id="cdpdClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người bị thiệt hại: <span id="cdpdClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="cdpdClaimAgency" style="font-weight:600; color:#334155;">--</span></div>'
        + '</div><button type="button" onclick="closeCdpdModal(true)" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        + '<div id="cdpdStepperBar" class="ktl-stepper-fullwidth"><div id="cdpdStep1Tab" class="ktl-step-tab active" onclick="cdpdGoStep1()"><span class="ktl-step-badge" id="cdpdStep1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>'
        + '<div class="ktl-stepper-sep"><i class="fa-solid fa-chevron-right"></i></div><div id="cdpdStep2Tab" class="ktl-step-tab" onclick="cdpdGoStep2()"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
        + '<div id="cdpdStep1Body" class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div id="cdpdReturnedAlertBlock" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;"><div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> HỒ SƠ BỊ LÃNH ĐẠO TRẢ LẠI</div>'
        + '<div style="font-size:13px; color:#92400e;"><b>Lý do bị trả lại:</b> <span id="cdpdReturnedReason">--</span></div><div style="font-size:12px; color:#b45309; margin-top:2px;">Người từ chối: <span id="cdpdReturnedOfficer">--</span> • Thời điểm: <span id="cdpdReturnedDate">--</span></div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
        + card('cdpdCardSignOnline', 'online', 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', 'fa-file-signature', false, true)
        + card('cdpdCardSignOffline', 'offline', 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', 'fa-stamp', true, false)
        + '</div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-ribbon"></i> Thông tin phục hồi danh dự</div><div id="cdpdInfo" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px 12px; font-size:13px; color:#334155;"></div></div>'
        + '<div class="gqx-sec" id="cdpdDocSection"><div class="gqx-sec-title" id="cdpdDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>'
        + '<div id="cdpdOnlineSection"><div style="font-size:12.5px; color:#475569; margin-bottom:8px;"><i class="fa-solid fa-circle-info" style="color:#2563eb;"></i> Tải lên từ máy Thông báo tổ chức thực hiện phục hồi danh dự do cán bộ soạn thảo (hồ sơ chủ động không sinh văn bản theo mẫu).</div>'
        + '<input type="file" id="cdpdOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="cdpdOnlineUpload(this)"><div id="cdpdDocFileBox"></div><div id="cdpdDocFileError" class="gqx-err">' + CDPD_REQ + '</div></div>'
        + '<div id="cdpdOfflineSection" style="display:none;">' + drop('cdpdOfflineFileInput', 'cdpdOfflineDrop', '.pdf', 'cdpdOfflineUpload', 'cdpdDropOffline', 'Chỉ chấp nhận tệp .pdf, dung lượng tối đa 50MB')
        + '<div id="cdpdOfflineFileRow" style="display:none;"></div><div id="cdpdOfflineFileErr" class="gqx-err">' + CDPD_OFF_MSG + '</div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang bước Ý kiến phản hồi của tiến trình phục hồi danh dự.</div></div>'
        + '</div>'
        + '<div id="cdpdTlkt"></div>'
        + '</div>'
        + '<div id="cdpdStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative;">'
        + '<div style="flex:1; overflow-y:auto; overflow-x:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;"><div id="cdpdA4Page" class="a4-document-page"><div id="cdpdA4Content"></div></div></div>'
        + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; box-shadow:-4px 0 15px rgba(0,0,0,0.05); z-index:20;">'
        + '<div><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div><div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>'
        + '<div id="cdpdSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>'
        + '<div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>'
        + '<div class="form-group" style="margin-bottom:0;"><label class="form-label" for="cdpdSignContent" style="font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block;">Nội dung trình <span style="color:#dc2626;">*</span></label><textarea id="cdpdSignContent" class="form-control" rows="4" style="font-size:13px;" placeholder="Nhập nội dung trình Lãnh đạo..."></textarea><div id="cdpdSignContentErr" class="gqx-err">' + CDPD_REQ + '</div></div>'
        + '</div></div>'
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;"><div style="display:flex; gap:10px; margin-left:auto;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeCdpdModal(true)">Hủy bỏ</button>'
        + '<button id="cdpdBtnSubmitOffline" type="button" class="btn btn-primary" onclick="cdpdSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
        + '<button id="cdpdBtnNextStep" type="button" class="btn btn-primary" onclick="cdpdGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>'
        + '<button id="cdpdBtnBackStep1" type="button" class="btn btn-secondary" onclick="cdpdGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
        + '<button id="cdpdBtnSubmitOnline" type="button" class="btn btn-primary" onclick="cdpdSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; box-shadow:0 2px 6px rgba(22,163,74,0.3); font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình</button>'
        + '</div></div></div></div>';
    document.body.appendChild(wrap.firstChild);
}
function cdpdRenderInfo(claim) {
    var box = cdpdEl('cdpdInfo'); if (!box) return;
    var vic = typeof ctvvmVictim === 'function' ? ctvvmVictim(claim) : { name: getClaimRequesterName(claim), address: claim.address || '' };
    var forms = typeof ctvvmForms === 'function' ? ctvvmForms(claim) : { apology: !!claim.phddFormApology, news: !!claim.phddFormNews };
    var fText = [forms.apology ? 'Trực tiếp xin lỗi và cải chính công khai' : '', forms.news ? 'Đăng báo xin lỗi và cải chính công khai' : ''].filter(Boolean).join('; ');
    var vb = (typeof normalizeVanBanCanCuList === 'function' ? normalizeVanBanCanCuList(claim.vanBanCanCu) : []).filter(function (r) { return r.name || r.file; }).map(function (r) { return r.name || r.file; }).join('; ');
    var row = function (l, v) { return '<div><b style="color:#64748b; font-weight:600;">' + l + ':</b> ' + cdpdE(v || '--') + '</div>'; };
    box.innerHTML = row('Hình thức tiếp nhận', CDPD_HTTN) + row('Người bị thiệt hại', vic.name) + row('Địa chỉ', vic.address) + row('Văn bản làm căn cứ', vb)
        + row('Lĩnh vực', typeof getFieldGroupName === 'function' ? getFieldGroupName(claim.fieldGroup) : claim.fieldGroup) + row('Hình thức phục hồi danh dự', fText);
}
function openCdpdModal(claimId) {
    var claim = gqClaim(claimId);
    if (!claim) return;
    cdpdEnsureModal();
    if (typeof gqFrameFull === 'function') gqFrameFull(true);
    cdpdClaim = claim;
    cdpdOnlineFile = null; cdpdOfflineFile = null;
    var W = gqW();
    var rec = gqRecord(claim);
    var prev = rec && rec.status === 'Bị trả lại' && rec.approval && rec.approval.kind === CDPD_KIND ? rec.approval : null;
    var ret = prev ? (rec.returned || {}) : null;
    cdpdEl('cdpdReturnedAlertBlock').style.display = prev ? 'block' : 'none';
    if (prev) {
        cdpdEl('cdpdReturnedReason').innerText = ret.reason || '--';
        cdpdEl('cdpdReturnedOfficer').innerText = (ret.by && W ? W.userName(ret.by) : '') || '--';
        cdpdEl('cdpdReturnedDate').innerText = ret.at || '--';
    }
    cdpdEl('cdpdClaimCode').innerText = cdpdVvOf(claim) || claim.code || '--';
    cdpdEl('cdpdClaimNYC').innerText = getClaimRequesterName(claim) || '--';
    cdpdEl('cdpdClaimAgency').innerText = claim.agency || '--';
    cdpdRenderInfo(claim);
    cdpdEl('cdpdSignContent').value = CDPD_CONTENT_DEFAULT;
    gqSignInit('cdpd', claim, prev && Array.isArray(prev.assignees) ? prev.assignees : null);
    cdpdOfflineRemove();
    var fe = cdpdEl('cdpdDocFileError'); fe.textContent = CDPD_REQ; fe.style.display = 'none';
    if (typeof ktlxCancelConvert === 'function') ktlxCancelConvert('cdpd');
    // Trình lại sau khi bị trả lại: điền lại tệp, ô ký, Nội dung trình, Tài liệu đính kèm của lần trình trước
    tlktGqRestore('cdpd', prev, { required: false, setFile: function (f) { cdpdOnlineFile = f; } });
    cdpdRenderDocBox();
    cdpdEl('cdpdSigningMethodOnline').checked = true;
    cdpdToggleSigningMethod('online');
    cdpdGoStep1();
    var modal = cdpdEl('modalCdpd');
    modal.style.display = 'flex'; modal.classList.add('active'); modal.classList.add('visible');
}
// cancel = true: Hủy bỏ / Đóng. Hồ sơ mới chưa trình lần nào: bỏ hồ sơ tạm, quay lại form (giữ dữ liệu đã nhập)
function closeCdpdModal(cancel) {
    if (typeof gqFrameFull === 'function') gqFrameFull(false);
    if (typeof ktlxCancelConvert === 'function') ktlxCancelConvert('cdpd');
    var modal = cdpdEl('modalCdpd');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('active'); modal.classList.remove('visible'); }
    var c = cdpdClaim;
    cdpdClaim = null;
    if (cancel && c && c.cdpdDraft) {
        var idx = claimsList.indexOf(c);
        if (idx >= 0) claimsList.splice(idx, 1);
        try { var W = gqW(); if (W && W.unlinkVuViec) W.unlinkVuViec(c.code); } catch (e) { /* mockup */ }
        saveClaimsToLocal();
        var list = cdpdEl('subTabContentResolver'), detail = cdpdEl('caseDetailSection'), form = cdpdEl('inlineClaimFormPanel');
        if (list) list.style.display = 'none';
        if (detail) detail.style.display = 'none';
        if (form) form.style.display = 'flex';
        editingClaimId = null;
        cdpdApplyMode(true, true);
    }
}
function cdpdToggleSigningMethod(method) {
    var isOnline = method === 'online';
    [['cdpdCardSignOnline', isOnline], ['cdpdCardSignOffline', !isOnline]].forEach(function (x) {
        var c = cdpdEl(x[0]); c.classList.toggle('active', x[1]);
        var ico = c.querySelector('.sign-card-check i'); if (ico) ico.className = x[1] ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    // Stepper 02 bước chỉ khi Ký số
    var bar = cdpdEl('cdpdStepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !isOnline); bar.setAttribute('aria-hidden', isOnline ? 'false' : 'true');
    cdpdShow(cdpdEl('cdpdOnlineSection'), isOnline, 'block');
    cdpdShow(cdpdEl('cdpdOfflineSection'), !isOnline, 'block');
    cdpdShow(cdpdEl('cdpdBtnSubmitOffline'), !isOnline, 'inline-flex');
    cdpdShow(cdpdEl('cdpdBtnNextStep'), isOnline, 'inline-flex');
    // Ký số: Tài liệu ban hành kèm theo + Tài liệu không ban hành kèm theo; Ký ngoài: chỉ Tài liệu ban hành kèm theo
    if (typeof tlktShow === 'function') tlktShow('cdpd', isOnline);
    cdpdEl('cdpdDocSectionTitle').innerHTML = isOnline ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
}
function cdpdRenderDocBox() {
    var box = cdpdEl('cdpdDocFileBox'); if (!box) return;
    if (ktlxConverting.cdpd) { box.innerHTML = '<div class="ktlx-converting"><span class="ktlx-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    var f = cdpdOnlineFile;
    box.innerHTML = !f
        ? '<div class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'cdpdOnlineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="cdpdDropOnline(event)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-title">Kéo thả tệp vào đây hoặc bấm để chọn tệp</div><div class="ktlx-drop-hint">Chấp nhận .pdf, .doc, .docx (tệp Word tự chuyển sang PDF), dung lượng tối đa 50MB</div></div>'
        : ktlxFileCardHtml(f.name, f.size, f.note, 'cdpdOnlineView()', 'cdpdOnlineRemove()');
}
function cdpdDropOnline(e) { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); var fs = e.dataTransfer && e.dataTransfer.files; if (fs && fs.length) cdpdOnlineUpload({ files: [fs[0]], value: '' }); }
function cdpdDropOffline(e) { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); var fs = e.dataTransfer && e.dataTransfer.files; if (fs && fs.length) cdpdOfflineUpload({ files: [fs[0]], value: '' }); }
function cdpdOnlineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var fe = cdpdEl('cdpdDocFileError');
    var msg = ktlxCheckFile(file, ['.pdf', '.doc', '.docx']);
    if (msg) { fe.textContent = msg; fe.style.display = 'block'; showToast(msg, 'error'); return; }
    fe.textContent = CDPD_REQ; fe.style.display = 'none';
    var size = ktlxFmtSize(file.size);
    if (/\.docx?$/i.test(file.name)) {
        cdpdOnlineFile = null; ktlxConverting.cdpd = true; ktlxSetNextBusy('cdpd', true); cdpdRenderDocBox();
        var token = (ktlxConverting.cdpdToken = (ktlxConverting.cdpdToken || 0) + 1);
        setTimeout(function () {
            if (ktlxConverting.cdpdToken !== token || !ktlxConverting.cdpd) return;
            ktlxConverting.cdpd = false; ktlxSetNextBusy('cdpd', false);
            cdpdOnlineFile = { name: file.name.replace(/\.docx?$/i, '.pdf'), size: size, source: 'uploaded', raw: file, note: 'Đã chuyển đổi từ ' + file.name };
            cdpdRenderDocBox();
        }, 1200);
        return;
    }
    cdpdOnlineFile = { name: file.name, size: size, source: 'uploaded', raw: file };
    cdpdRenderDocBox();
}
function cdpdOnlineView() { if (cdpdOnlineFile) gqOpenUploadedFile(cdpdOnlineFile); }
function cdpdOnlineRemove() { cdpdOnlineFile = null; ktlxCancelConvert('cdpd'); cdpdRenderDocBox(); }
function cdpdOfflineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var err = cdpdEl('cdpdOfflineFileErr'), drop = cdpdEl('cdpdOfflineDrop');
    var msg = ktlxCheckFile(file, ['.pdf']);
    if (msg) { err.textContent = msg; err.style.display = 'block'; drop.classList.add('is-error'); showToast(msg, 'error'); return; }
    cdpdOfflineFile = { name: file.name, size: ktlxFmtSize(file.size), raw: file };
    var row = cdpdEl('cdpdOfflineFileRow');
    row.innerHTML = ktlxFileCardHtml(cdpdOfflineFile.name, cdpdOfflineFile.size, '', 'gqOpenUploadedFile(cdpdOfflineFile)', 'cdpdOfflineRemove()');
    row.style.display = 'block';
    drop.style.display = 'none'; drop.classList.remove('is-error');
    err.textContent = CDPD_OFF_MSG; err.style.display = 'none';
}
function cdpdOfflineRemove() {
    cdpdOfflineFile = null;
    var row = cdpdEl('cdpdOfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    var drop = cdpdEl('cdpdOfflineDrop'); if (drop) { drop.style.display = ''; drop.classList.remove('is-error'); }
    var err = cdpdEl('cdpdOfflineFileErr'); if (err) { err.textContent = CDPD_OFF_MSG; err.style.display = 'none'; }
}
function cdpdGoStep1() {
    var c = cdpdEl('modalCdpdContainer'); c.style.width = '850px'; c.style.maxWidth = '96%'; c.style.height = 'auto';
    cdpdEl('cdpdStep1Tab').className = 'ktl-step-tab active';
    cdpdEl('cdpdStep1Badge').innerHTML = '1';
    cdpdEl('cdpdStep2Tab').className = 'ktl-step-tab';
    cdpdEl('cdpdStep1Body').style.display = 'block';
    cdpdEl('cdpdStep2Body').style.display = 'none';
    var off = cdpdIsOffline();
    cdpdEl('cdpdBtnNextStep').style.display = off ? 'none' : 'inline-flex';
    cdpdEl('cdpdBtnSubmitOffline').style.display = off ? 'inline-flex' : 'none';
    cdpdEl('cdpdBtnBackStep1').style.display = 'none';
    cdpdEl('cdpdBtnSubmitOnline').style.display = 'none';
}
// Tiếp tục: kiểm tra tệp văn bản trình ký, Tài liệu đính kèm -> Bước 2
function cdpdGoStep2() {
    if (!cdpdClaim || cdpdIsOffline()) return;
    if (ktlxConverting.cdpd) { showToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    var first = null;
    if (!cdpdOnlineFile) { cdpdEl('cdpdDocFileError').style.display = 'block'; first = cdpdEl('cdpdDocFileBox'); }
    var okT = typeof tlktValidate !== 'function' || tlktValidate('cdpd');
    if (first || !okT) {
        if (first && first.scrollIntoView) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'warning');
        return;
    }
    cdpdEl('cdpdA4Content').innerHTML = '<div style="text-align:center; padding-top:320px; color:#475569;"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#94a3b8;"></i><div style="margin-top:12px; font-weight:700;">' + cdpdE(cdpdOnlineFile.name) + '</div><div style="font-size:12.5px;">Văn bản tải lên từ máy - Thông báo tổ chức thực hiện phục hồi danh dự</div></div>';
    var c = cdpdEl('modalCdpdContainer'); c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh';
    cdpdEl('cdpdStep1Tab').className = 'ktl-step-tab completed';
    cdpdEl('cdpdStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    cdpdEl('cdpdStep2Tab').className = 'ktl-step-tab active';
    cdpdEl('cdpdStep1Body').style.display = 'none';
    cdpdEl('cdpdStep2Body').style.display = 'flex';
    cdpdEl('cdpdBtnNextStep').style.display = 'none';
    cdpdEl('cdpdBtnSubmitOffline').style.display = 'none';
    cdpdEl('cdpdBtnBackStep1').style.display = 'inline-flex';
    cdpdEl('cdpdBtnSubmitOnline').style.display = 'inline-flex';
    gqSignRefresh('cdpd');
}
// Ký số: trình Lãnh đạo Nội dung trình "Chủ động phục hồi danh dự" -> Chờ duyệt
function cdpdSubmitOnline() {
    var claim = cdpdClaim;
    if (!claim || !cdpdOnlineFile) return;
    var sign = gqSignCollect('cdpd');
    if (!sign) return;
    var fileName = cdpdOnlineFile.name;
    var draftDoc = { source: 'uploaded', formNo: '', docTitle: CDPD_DOC_TITLE, generatedName: '', uploadedName: fileName, bodyHtml: '' };
    var signDoc = Object.assign({ method: 'Ký số', file: fileName, enableRoomSig: sign.enableNhay, sigCoords: sign.coords }, tlktGqExtra('cdpd', cdpdOnlineFile, 'upload', sign.content));
    var res = gqSubmit(claim, CDPD_KIND, sign.content, [], { assignee: sign.assignees[0] || '', assignees: sign.assignees, reason: CDPD_KIND, resultStatus: CASE_PHDD_PENDING_STATUS, draftDoc: draftDoc, signDoc: signDoc });
    if (!res || res.ok === false) { showToast(res ? res.message : 'Không trình được hồ sơ.', 'error'); return; }
    claim.cdpdDoc = {
        state: 'Chờ duyệt', method: 'Ký số', docSrc: 'upload', draftFile: fileName, draftFileId: signDoc.docFileMeta ? signDoc.docFileMeta.keepId : '',
        signFile: fileName, attachments: signDoc.attachments || [], submittedAt: gqNow()
    };
    delete claim.cdpdDraft;
    cdpdPersist(claim);
    closeCdpdModal(false);
    if (typeof isDetailEditMode !== 'undefined') isDetailEditMode = false;
    gqAfterSubmit(claim, CDPD_KIND);
}
// Ký ngoài: tệp PDF đã ký -> popup xác nhận -> ban hành trực tiếp
function cdpdSubmitOffline() {
    var claim = cdpdClaim;
    if (!claim) return;
    if (!cdpdOfflineFile) {
        var fErr = cdpdEl('cdpdOfflineFileErr'); fErr.textContent = CDPD_OFF_MSG; fErr.style.display = 'block';
        var drop = cdpdEl('cdpdOfflineDrop'); drop.classList.add('is-error'); drop.focus();
        return;
    }
    if (typeof tlktValidate === 'function' && !tlktValidate('cdpd')) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'warning'); return; }
    var overlay = cdpdEl('customConfirmOverlay'), btnYes = cdpdEl('customConfirmBtnYes'), btnNo = cdpdEl('customConfirmBtnNo');
    var prevZ = overlay ? overlay.style.zIndex : '';
    var restore = function () { if (overlay) overlay.style.zIndex = prevZ; if (btnYes) btnYes.style.backgroundColor = ''; };
    showConfirmModal('Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Hồ sơ chuyển sang trạng thái "Đang phục hồi danh dự" (bước Ý kiến phản hồi). Bạn có chắc chắn muốn ban hành văn bản?',
        function () { restore(); cdpdIssueOffline(); },
        { title: 'Xác nhận ban hành văn bản', btnYesText: 'Ban hành', btnYesClass: 'btn-success', btnNoText: 'Hủy bỏ' });
    if (overlay) overlay.style.zIndex = '10050';
    if (btnYes) btnYes.style.backgroundColor = '#16a34a';
    if (btnNo) btnNo.addEventListener('click', restore, { once: true });
}
function cdpdIssueOffline() {
    var claim = cdpdClaim;
    if (!claim || !cdpdOfflineFile) return;
    var keep = typeof tlktKeep === 'function' ? tlktKeep(cdpdOfflineFile.raw) : '';
    var atts = typeof tlktGet === 'function' ? tlktGet('cdpd') : [];
    var m26 = cdpdM26Issued(claim, { method: 'Ký ngoài', signedFile: cdpdOfflineFile.name, signedFileId: keep, signedSize: cdpdOfflineFile.size, issuedAt: gqNow(), attachments: atts });
    claim.cdpdDoc = { state: 'Đã ban hành', method: 'Ký ngoài', docSrc: 'upload', signedFile: cdpdOfflineFile.name, signedFileId: keep, attachments: atts, issuedAt: m26.issuedAt };
    delete claim.cdpdDraft;
    claim.wfReturned = null;
    if (!Array.isArray(claim.timeline)) claim.timeline = [];
    claim.timeline.push({ title: 'Ban hành Thông báo tổ chức thực hiện phục hồi danh dự (Ký ngoài)', date: gqToday(), desc: 'Ban hành văn bản đã ký ngoài hệ thống (' + cdpdOfflineFile.name + '). Hồ sơ chuyển sang trạng thái [Đang phục hồi danh dự] - bước Ý kiến phản hồi.', status: 'completed' });
    cdpdApplyIssued(claim, m26, '', '');
    // Hồ sơ luồng: tạo (hồ sơ mới) hoặc cập nhật trạng thái (hồ sơ Bị trả lại trình lại bằng Ký ngoài)
    try {
        var W = gqW();
        gqEnsureRecord(claim);
        var rec = gqRecord(claim);
        if (W && rec) {
            rec.status = CASE_PHDD_PENDING_STATUS;
            rec.returned = null;
            W.addHistory(rec, 'Ban hành Thông báo tổ chức thực hiện phục hồi danh dự (Ký ngoài)', 'Hồ sơ cán bộ chủ động phục hồi danh dự. Văn bản đã ký: ' + cdpdOfflineFile.name + '.', null, { kind: CDPD_KIND });
            W.upsertRecord(rec);
            if (typeof gqRecMap !== 'undefined') gqRecMap[claim.code] = rec;
        }
    } catch (e) { /* mockup */ }
    cdpdPersist(claim);
    closeCdpdModal(false);
    saveClaimsToLocal();
    renderClaimsTable();
    showToast('Đã ban hành Thông báo tổ chức thực hiện phục hồi danh dự (Ký ngoài) cho vụ việc ' + claimVvLabel(claim) + '. Hồ sơ chuyển sang trạng thái [Đang phục hồi danh dự].', 'success');
}
// Thông báo đã ban hành -> dữ liệu Khối 1 tab Phục hồi danh dự (cấu trúc ctvvM26, không có nội dung sinh theo mẫu)
function cdpdM26Issued(claim, o) {
    return Object.assign({
        state: 'Đã ban hành', method: 'Ký số', docSrc: 'upload', formNo: '', cdpd: true,
        docNumber: '', docDate: '', forms: { apology: false, news: false }, agency6: claim.agency || '', noiNhan: [],
        signedFile: '', signedSize: '', signedFileId: '', attachments: [], issuedAt: gqNow()
    }, o || {});
}
// Ban hành (Ký số cấp cuối / Ký ngoài): Bước 1 đã xong, nhánh Phục hồi danh dự sang Bước 2 (Ý kiến phản hồi); cán bộ tạo là cán bộ chủ trì
function cdpdApplyIssued(c, m26, signerName, signerTitle) {
    c.phddStarted = true;
    if (typeof ctvvmApplyIssued === 'function') ctvvmApplyIssued(c, m26, signerName, signerTitle);
    else { c.ctvvM26 = m26; setPhddStatus(c, 'Chờ phản hồi'); }
    var name = c.cdpdCreatedBy || c.assignedOfficer || '';
    if (name) {
        c.appointedOfficers = [{ userId: c.cdpdCreatedById || '', name: name, position: '', email: '', unit: c.agency || '', appointedAt: gqToday() }];
        c.assignedOfficer = name;
    }
}

// =====================================================================
// 3. Kết quả Lãnh đạo xử lý phiếu trình, Cập nhật / Xóa hồ sơ Bị trả lại, lưới, bộ lọc
// =====================================================================
function cdpdDelete(id) {
    var c = gqClaim(id);
    if (!c || !cdpdIs(c) || canonicalClaimStatus(c.status) !== 'Bị trả lại' || !cdpdIsCreator(c)) { showToast('Chỉ cán bộ tạo hồ sơ được xóa hồ sơ chủ động phục hồi danh dự ở trạng thái Bị trả lại.', 'error'); return; }
    showConfirmModal('Bạn có chắc chắn muốn xóa hồ sơ ' + claimVvLabel(c) + ' không?', function () {
        var idx = claimsList.indexOf(c);
        if (idx >= 0) claimsList.splice(idx, 1);
        try { var W = gqW(); if (W) { W.removeRecord(c.code); if (W.unlinkVuViec) W.unlinkVuViec(c.code); } if (typeof gqRecMap !== 'undefined') delete gqRecMap[c.code]; } catch (e) { /* mockup */ }
        saveClaimsToLocal();
        var detail = cdpdEl('caseDetailSection');
        if (detail && detail.style.display === 'block') { detail.style.display = 'none'; var list = cdpdEl('subTabContentResolver'); if (list) list.style.display = 'block'; }
        renderClaimsTable();
        showToast('Đã xóa hồ sơ chủ động phục hồi danh dự.', 'success');
    });
}
(function () {
    // Kết quả phê duyệt (đồng bộ từ hồ sơ luồng): Ký duyệt cấp cuối -> Đang phục hồi danh dự (Bước 2); Từ chối -> Bị trả lại
    var oApply = window.gqApplyRecord;
    if (typeof oApply === 'function') window.gqApplyRecord = function (c, r) {
        var a = r && r.approval;
        var mine = !!(c && a && a.kind === CDPD_KIND && cdpdIs(c));
        var approved = mine && a.done && r.status !== 'Chờ duyệt' && r.status !== 'Bị trả lại' && !(c.cdpdDoc && c.cdpdDoc.state === 'Đã ban hành');
        // Không ghi bước "Phê duyệt tiếp nhận hồ sơ - Bước 1" của luồng tiếp nhận thông thường
        if (approved) c.phddStarted = true;
        var res = oApply.apply(this, arguments);
        try {
            if (approved) {
                var W = gqW();
                var last = (a.steps || [])[a.steps.length - 1] || {};
                var u = W && last.userId ? W.getUser(last.userId) : null;
                var d = c.cdpdDoc || {};
                var m26 = cdpdM26Issued(c, {
                    method: 'Ký số', signedFile: String(d.signFile || (a.signDoc && a.signDoc.file) || 'Thong_bao_PHDD.pdf').replace(/\.[^.]+$/, '') + '_da_ky.pdf',
                    signedAt: last.at || gqNow(), issuedAt: last.at || gqNow(), signedBy: u ? u.name : '', signerTitle: u ? u.title : '',
                    draftFile: d.draftFile || '', attachments: d.attachments || (a.signDoc && a.signDoc.attachments) || []
                });
                c.cdpdDoc = Object.assign({}, d, { state: 'Đã ban hành', signedFile: m26.signedFile, signedBy: m26.signedBy, issuedAt: m26.issuedAt });
                cdpdApplyIssued(c, m26, u ? u.name : '', u ? u.title : '');
                cdpdPersist(c);
                res = true;
            } else if (mine && r.status === 'Bị trả lại' && !(c.cdpdDoc && c.cdpdDoc.state === 'Bị trả lại')) {
                var W2 = gqW(); var ret = r.returned || {};
                c.cdpdDoc = Object.assign({}, c.cdpdDoc || {}, { state: 'Bị trả lại', rejectReason: ret.reason || '', rejectBy: ret.by && W2 ? W2.userName(ret.by) : '', rejectAt: ret.at || '' });
                cdpdPersist(c);
                res = true;
            }
        } catch (e) { /* mockup */ }
        return res;
    };
    // Cập nhật hồ sơ Bị trả lại (Nội dung trình Chủ động phục hồi danh dự): mở lại form, Trình Lãnh đạo -> popup điền sẵn lần trình trước
    var oUpd = window.gqUpdateReturned;
    if (typeof oUpd === 'function') window.gqUpdateReturned = function (claimId) {
        var claim = gqClaim(claimId);
        var rec = claim ? gqRecord(claim) : null;
        if (rec && rec.returned && rec.returned.kind === CDPD_KIND) { openInlineClaimForm(claimId); return; }
        return oUpd.apply(this, arguments);
    };
    // Form: dựng khối Hình thức tạo hồ sơ sau khi mở
    var oOpen = window.openInlineClaimForm;
    if (typeof oOpen === 'function') window.openInlineClaimForm = function (id) {
        var r = oOpen.apply(this, arguments);
        try { cdpdAfterOpenForm(id || null); } catch (e) { if (window.console) console.error(e); }
        return r;
    };
    // Lưu form ở chế độ Cán bộ chủ động phục hồi danh dự: mở popup trình riêng thay cho Trình duyệt tiếp nhận hồ sơ (Mẫu 04/BTNN)
    var oTnd = window.openTndModal;
    if (typeof oTnd === 'function') window.openTndModal = function (claimId) {
        if (cdpdHook) { var h = cdpdHook; cdpdHook = null; cdpdAfterFormSave(claimId, h); return; }
        return oTnd.apply(this, arguments);
    };
    // Chuyển CQGQBT: hồ sơ Chỉ yêu cầu phục hồi danh dự không áp dụng (lưới cũ, mở popup trực tiếp)
    var oTrb = window.gqTransferBlockReason;
    if (typeof oTrb === 'function') window.gqTransferBlockReason = function (claim) {
        return cdpdHonorOnly(claim) ? 'Không áp dụng với hồ sơ Chỉ yêu cầu phục hồi danh dự' : oTrb.apply(this, arguments);
    };
    var oTrm = window.openGqTransferModal;
    if (typeof oTrm === 'function') window.openGqTransferModal = function (claimId) {
        var c = typeof gqClaim === 'function' ? gqClaim(claimId) : null;
        if (cdpdHonorOnly(c)) { showToast('Hồ sơ Chỉ yêu cầu phục hồi danh dự không có thao tác Chuyển CQGQBT.', 'warning'); return; }
        return oTrm.apply(this, arguments);
    };
    // Thao tác khác: Xóa hồ sơ (hồ sơ chủ động Bị trả lại, chỉ cán bộ tạo)
    var oDefs = window.gqldActionDefs;
    if (typeof oDefs === 'function') window.gqldActionDefs = function (item) {
        var d = oDefs.apply(this, arguments);
        // Loại yêu cầu "Chỉ yêu cầu phục hồi danh dự" (mọi nguồn, kể cả cán bộ chủ động): không có thao tác Chuyển CQGQBT
        // (ẩn tại cột Thao tác / Thao tác khác / thanh thao tác màn Xem chi tiết)
        if (cdpdHonorOnly(item) && d) ['main', 'more'].forEach(function (k) { if (Array.isArray(d[k])) d[k] = d[k].filter(function (a) { return a.key !== 'transfer'; }); });
        if (cdpdIs(item) && d && Array.isArray(d.more)) {
            d.more = d.more.concat([{ key: 'cdpdDelete', icon: 'fa-solid fa-trash', label: 'Xóa hồ sơ', allowed: d.st === 'Bị trả lại' && cdpdIsCreator(item), fn: "cdpdDelete('" + item.id + "');" }]);
        }
        return d;
    };
    // Tiêu đề văn bản tại màn Ký duyệt / Từ chối
    var oTitle = window.gqldDocTitle;
    if (typeof oTitle === 'function') window.gqldDocTitle = function (kind) {
        if (kind === CDPD_KIND) return 'THÔNG BÁO VỀ VIỆC TỔ CHỨC THỰC HIỆN PHỤC HỒI DANH DỰ';
        return oTitle.apply(this, arguments);
    };
    // Nhãn riêng dưới Nguồn hồ sơ (lưới, màn chi tiết)
    var oBadge = window.renderNguonHoSoBadge;
    if (typeof oBadge === 'function') window.renderNguonHoSoBadge = function (value, claim) {
        var h = oBadge.apply(this, arguments);
        if (claim && cdpdIs(claim)) h += '<div style="margin-top:4px;"><span class="badge cdpd-badge" title="Hình thức tiếp nhận: ' + cdpdE(CDPD_HTTN) + '"><i class="fa-solid fa-ribbon"></i> Cán bộ chủ động PHDD</span></div>';
        return h;
    };
    // Khối 1 tab Phục hồi danh dự: ghi chú văn bản trình khi tạo hồ sơ chủ động
    var oDec = window.ctvvM26Decorate;
    if (typeof oDec === 'function') window.ctvvM26Decorate = function (claim) {
        var r = oDec.apply(this, arguments);
        try {
            var p = cdpdEl('ctvvM26Panel');
            if (p && claim && claim.ctvvM26 && claim.ctvvM26.cdpd && !p.querySelector('.cdpd-m26-note')) {
                var n = document.createElement('div');
                n.className = 'cdpd-m26-note';
                n.innerHTML = '<i class="fa-solid fa-ribbon"></i> Văn bản trình khi cán bộ tạo hồ sơ chủ động phục hồi danh dự (' + cdpdE(claim.ctvvM26.method === 'Ký ngoài' ? 'Ký ngoài' : 'Tải lên từ máy, Ký số') + '); không sinh văn bản theo mẫu.';
                p.insertBefore(n, p.firstChild);
            }
        } catch (e) { /* mockup */ }
        return r;
    };
})();

// =====================================================================
// 4. Dữ liệu mẫu: 03 hồ sơ chủ động phục hồi danh dự
// =====================================================================
var CDPD_SEEDS = [
    { id: 'CDPD-521', code: 'BT-2026-521', nyc: 'Đinh Văn Tùng', birth: '12/03/1978', card: '001078012345', phone: '0912345601', ward: 'Phường Cầu Giấy', addr: 'Số 15 ngõ 82 Trần Cung', field: 'hình sự', hanhVi: 'Người tiến hành tố tụng ra quyết định khởi tố, bắt tạm giam ông Đinh Văn Tùng; sau đó cơ quan có thẩm quyền ra quyết định đình chỉ điều tra do không phạm tội.', vb: 'Quyết định đình chỉ điều tra số 12/QĐ-CSĐT ngày 02/10/2026', state: 'pending' },
    { id: 'CDPD-522', code: 'BT-2026-522', nyc: 'Lương Thị Hạnh', birth: '05/09/1985', card: '001185045678', phone: '0912345602', ward: 'Phường Đống Đa', addr: 'Số 7 phố Thái Hà', field: 'hình sự', hanhVi: 'Bà Lương Thị Hạnh bị khởi tố, truy tố; bản án phúc thẩm tuyên không phạm tội.', vb: 'Bản án hình sự phúc thẩm số 45/2026/HS-PT ngày 25/09/2026', state: 'reject', reason: 'Đề nghị bổ sung trong Thông báo dự kiến địa điểm tổ chức trực tiếp xin lỗi và cải chính công khai.' },
    { id: 'CDPD-523', code: 'BT-2026-523', nyc: 'Phạm Quang Huy', birth: '20/11/1970', card: '001070098765', phone: '0912345603', ward: 'Phường Hoàng Mai', addr: 'Số 22 đường Tam Trinh', field: 'thi hành án hình sự', hanhVi: 'Ông Phạm Quang Huy bị thi hành án phạt tù theo bản án đã bị hủy; cơ quan có thẩm quyền xác định ông thuộc trường hợp được bồi thường.', vb: 'Quyết định giám đốc thẩm số 08/2026/HS-GĐT ngày 18/09/2026', state: 'approve' }
];
function cdpdSeedClaim(s) {
    var agency = 'Sở Tư pháp TP. Hà Nội';
    var me = typeof getCurrentSimulatedOfficer === 'function' ? getCurrentSimulatedOfficer() : 'Nguyễn Văn Chuyên Viên';
    var today = gqToday();
    return {
        id: s.id, code: s.code, maVuViec: '', vuViecLienQuan: '', date: today, deadline: today, cdpd: true, cdpdSeed: CDPD_SEED_VER,
        cdpdCreatedBy: me, assignedOfficer: me, cdpdCreatedById: typeof gqActingUserId === 'function' ? gqActingUserId() : '',
        nguonHoSo: 'Tiếp nhận mới', hinhThucTiepNhan: CDPD_HTTN, requestType: 'honor', restoreHonor: true, phddStarted: false,
        phddFormApology: true, phddFormNews: s.state === 'approve', victimAlive: 'yes',
        fieldGroup: s.field, nyc: s.nyc, nycType: 'Cá nhân', nycRole: CDPD_NBTH, role: CDPD_NBTH, nycBirth: s.birth,
        nycCardType: 'CCCD', cardType: 'CCCD', nycCardNo: s.card, cardNo: s.card, nycCardPlace: 'Cục Cảnh sát QLHC về TTXH',
        nycPhone: s.phone, phone: s.phone, nycCountry: 'Việt Nam', nycTinhThanh: 'Hà Nội', nycPhuongXa: s.ward, nycAddressDetail: s.addr, address: s.addr,
        hanhVi: s.hanhVi, nhanQua: 'Danh dự, uy tín của người bị thiệt hại bị xâm phạm do hành vi của người thi hành công vụ.',
        notifyMethod: 'Qua dịch vụ bưu chính', notifyAddress: s.addr + ', ' + s.ward + ', Hà Nội',
        requestDocDate: '', applicableLaw: 'Luật Trách nhiệm bồi thường của Nhà nước năm 2017', agency: agency,
        vanBanCanCu: [{ name: s.vb, file: s.code + '_Van_ban_can_cu.pdf' }], files: [], officers: [], thietHaiList: [], totalNum: 0, advanceNum: 0,
        status: 'Chờ tiếp nhận',
        timeline: [{ title: 'Tạo hồ sơ chủ động phục hồi danh dự', date: today, desc: 'Cán bộ chủ động lập hồ sơ phục hồi danh dự khi có đủ thông tin (Hình thức tiếp nhận: ' + CDPD_HTTN + ').', status: 'completed' }]
    };
}
function cdpdSeed() {
    var W = gqW();
    if (!W || typeof claimsList === 'undefined') return false;
    var ver = ''; try { ver = localStorage.getItem(CDPD_SEED_KEY) || ''; } catch (e) { /* mockup */ }
    var reset = ver !== CDPD_SEED_VER;
    var done = false;
    CDPD_SEEDS.forEach(function (s) {
        var exist = claimsList.find(function (c) { return c && (c.code === s.code || c.id === s.id); });
        if (exist && !reset) return;
        if (exist) claimsList.splice(claimsList.indexOf(exist), 1);
        try { if (reset) W.removeRecord(s.code); } catch (e) { /* mockup */ }
        var c = cdpdSeedClaim(s);
        claimsList.unshift(c);
        var me = W.getCurrentUserId();
        try {
            var rec = gqEnsureRecord(c);
            if (!rec) return;
            c.maVuViec = rec.maVuViec || (W.vuViecOf ? W.vuViecOf(c.code) : '') || c.maVuViec;
            var assignees = gqSignLevels(c).map(function (lv) { return (lv.leaders && lv.leaders[0] && lv.leaders[0].id) || ''; });
            var file = 'Thong_bao_to_chuc_PHDD_' + s.code + '.pdf';
            var signDoc = { method: 'Ký số', file: file, enableRoomSig: true, sigCoords: [], docSrc: 'upload', docFileMeta: { name: file, size: '312 KB', note: '', keepId: '' }, submitContent: CDPD_CONTENT_DEFAULT, attachments: [] };
            var draftDoc = { source: 'uploaded', formNo: '', docTitle: CDPD_DOC_TITLE, generatedName: '', uploadedName: file, bodyHtml: '' };
            W.setCurrentUser(rec.chuTri);
            var res = W.submitForApproval(c.code, CDPD_KIND, CDPD_CONTENT_DEFAULT, [], { assignee: assignees[0] || '', assignees: assignees, reason: CDPD_KIND, resultStatus: CASE_PHDD_PENDING_STATUS, draftDoc: draftDoc, signDoc: signDoc });
            if (!res || !res.ok) return;
            c.status = 'Chờ duyệt';
            c.cdpdDoc = { state: 'Chờ duyệt', method: 'Ký số', docSrc: 'upload', draftFile: file, draftFileId: '', signFile: file, attachments: [], submittedAt: res.record.approval.submittedAt };
            c.timeline.push({ title: 'Trình Lãnh đạo: ' + CDPD_KIND, date: gqToday(), desc: 'Trình Lãnh đạo phê duyệt [' + CDPD_KIND + '] - Thông báo tổ chức thực hiện phục hồi danh dự (' + file + '). Hồ sơ chuyển sang trạng thái [Chờ duyệt].', status: 'active' });
            if (s.state === 'reject' && assignees[0]) { W.setCurrentUser(assignees[0]); W.rejectApproval(c.code, s.reason); }
            if (s.state === 'approve') {
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
            cdpdPersist(c);
            done = true;
        } catch (e) { if (window.console) console.error(e); } finally { if (W.getCurrentUserId() !== me) W.setCurrentUser(me); }
    });
    try { localStorage.setItem(CDPD_SEED_KEY, CDPD_SEED_VER); } catch (e) { /* mockup */ }
    // Nhận kết quả phê duyệt / từ chối của dữ liệu mẫu
    if (done && typeof gqRefreshClaimsFromWorkflow === 'function') gqRefreshClaimsFromWorkflow(false);
    return done;
}
// Bộ lọc Hình thức tiếp nhận: bổ sung giá trị Cán bộ chủ động phục hồi danh dự khi có đủ thông tin
function cdpdInitFilter() {
    var sel = cdpdEl('searchHinhThucTiepNhan');
    if (sel && !Array.from(sel.options).some(function (o) { return o.value === CDPD_HTTN; })) {
        var o = document.createElement('option'); o.value = CDPD_HTTN; o.textContent = CDPD_HTTN; sel.appendChild(o);
    }
}
function cdpdInit() {
    cdpdCss();
    cdpdInitFilter();
    var seeded = false;
    try { seeded = cdpdSeed(); } catch (e) { if (window.console) console.error(e); }
    if (seeded) {
        try { saveClaimsToLocal(); } catch (e) { /* mockup */ }
        try { renderClaimsTable(); } catch (e) { /* mockup */ }
    }
}
if (document.readyState === 'complete') setTimeout(cdpdInit, 0); else window.addEventListener('load', function () { setTimeout(cdpdInit, 0); });
