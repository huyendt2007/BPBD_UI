/*
 * Popup Trình ký Quyết định tiếp tục giải quyết bồi thường (prefix ttgq, Mẫu số 23/BTNN) - Giải quyết yêu cầu bồi thường
 * Mở từ Thao tác khác "Tiếp tục giải quyết" (vụ việc Hoãn giải quyết / Tạm đình chỉ) hoặc "Cập nhật" hồ sơ Bị trả lại có Loại trình "Tiếp tục giải quyết bồi thường".
 * Bố cục giống Popup Không thụ lý / Hoãn giải quyết (quan_ly_boi_thuong_hgq.js):
 * - Bước 1: Hình thức ký (Ký số trên hệ thống | Ký ngoài (Ban hành trực tiếp)), Tệp văn bản trình ký (Sinh văn bản theo mẫu 23/BTNN | Tải lên từ máy),
 *   khối Số / Ngày QĐ hoãn hoặc tạm đình chỉ (mọi hình thức ký), khối Thông tin điền vào Mẫu 23/BTNN (Số, ký hiệu văn bản; Ngày văn bản; Căn cứ (4) nhập tự do; Nơi nhận), Tài liệu đính kèm (chỉ Ký số)
 *   -> Tiếp tục -> Bước 2: Kéo ô ký & chọn Lãnh đạo (Ký nháy theo Cấu hình luồng xử lý), Nội dung trình -> Trình Lãnh đạo
 * - Số / Ngày QĐ hoãn hoặc tạm đình chỉ: tự điền theo Quyết định hoãn / tạm đình chỉ đã ban hành của vụ việc (dữ liệu lưu khi ban hành tại hgq / hgqt); chưa có thì để trống, bắt buộc nhập
 * - Trình: vụ việc "Chờ duyệt", Loại trình "Tiếp tục giải quyết bồi thường"; cấp cuối Ký duyệt -> trạng thái trước khi Hoãn / Tạm đình chỉ (specialStatusPreviousStatus);
 *   Từ chối -> "Bị trả lại" (Cập nhật -> mở lại popup, điền lại dữ liệu lần trình trước)
 * - Ký ngoài: tải PDF đã ký -> xác nhận -> ban hành trực tiếp, vụ việc khôi phục ngay trạng thái trước
 * - Chỉ áp dụng nhánh Giải quyết bồi thường thiệt hại; nhánh Phục hồi danh dự (phddStatus) giữ nguyên
 * Dùng tiện ích của quan_ly_boi_thuong.html (gqW, gqClaim, gqRecord, gqSubmit, gqSign*, ktlx*, tlktGqRestore, tlktGqExtra), hgq* (quan_ly_boi_thuong_hgq.js) và dcgqHeadTitle (quan_ly_boi_thuong_dcgq.js).
 */
var TTGQ_KIND = 'Tiếp tục giải quyết bồi thường';
var TTGQ_FORM = 'Mẫu số 23/BTNN';
var TTGQ_DOC_TITLE = 'Quyết định tiếp tục giải quyết bồi thường';
var TTGQ_CONTENT = 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định tiếp tục giải quyết bồi thường.';
var TTGQ_NOI_NHAN_DEFAULT = '- Như Điều 3;\n- ......\n- Lưu: VT, HSVV.';
var TTGQ_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
// Loại quyết định trước theo Trạng thái vụ việc; (4) Căn cứ: ô nhập tự do, nhập thế nào lên mẫu như vậy
var TTGQ_LOAI = {
    hgq: { status: 'Hoãn giải quyết', word: 'hoãn', label: 'hoãn giải quyết bồi thường', data: 'hoanGiaiQuyet' },
    hgqt: { status: 'Tạm đình chỉ', word: 'tạm đình chỉ', label: 'tạm đình chỉ giải quyết bồi thường', data: 'tamDinhChi' }
};
var ttgqS = { claim: null, loai: 'hgq', restore: '', docSrc: 'gen', online: null, offline: null };

function ttgqEl(id) { return document.getElementById(id); }
function ttgqIsOffline() { var r = ttgqEl('ttgqSigningMethodOffline'); return !!(r && r.checked); }
function ttgqStatusOf(claim) { return typeof gqldCaseStatus === 'function' ? gqldCaseStatus(claim) : claim.status; }
function ttgqLoaiOfStatus(st) { return st === TTGQ_LOAI.hgq.status ? 'hgq' : (st === TTGQ_LOAI.hgqt.status ? 'hgqt' : ''); }
// Số QĐ hợp lệ: bỏ giá trị mặc định chưa nhập (VD "     /QĐ-")
function ttgqCleanNo(v) { var s = String(v || '').trim(); return /^\/?\s*QĐ-?\s*$/i.test(s) ? '' : s; }
// Quyết định hoãn / tạm đình chỉ đã ban hành gần nhất của vụ việc (lưu khi Ký duyệt cấp cuối / Ban hành Ký ngoài tại hgq / hgqt)
function ttgqPrevDecision(claim, loai) {
    var L = TTGQ_LOAI[loai];
    var logs = (Array.isArray(claim.specialStatusLogs) ? claim.specialStatusLogs : []).filter(function (l) { return l && l.type === L.status; });
    var log = logs[logs.length - 1] || {};
    var d = claim[L.data] || {};
    var src = ttgqCleanNo(log.docNo) ? { no: log.docNo, dt: log.docDate } : (ttgqCleanNo(d.docNumber) ? { no: d.docNumber, dt: d.docDate } : { no: '', dt: '' });
    var dt = String(src.dt || '').trim();
    return { docNo: ttgqCleanNo(src.no), docDate: hgqParse(dt) ? dt : '' };
}
// Trạng thái khôi phục khi tiếp tục giải quyết = trạng thái trước khi Hoãn / Tạm đình chỉ
function ttgqRestoreStatus(claim) {
    return claim.specialStatusPreviousStatus || ([].concat(claim.specialStatusLogs || []).reverse().filter(function (l) { return l && l.previousStatus; })[0] || {}).previousStatus || 'Xác minh thiệt hại';
}

// ---------- Văn bản Mẫu 23/BTNN ----------
function ttgqDocBaseName(claim) { return 'Mau_23_BTNN_Quyet_dinh_tiep_tuc_' + hgqVvCode(claim); }
function ttgqBuildMau23(claim, x) {
    var p = gqDocParts(claim);
    var P = 'margin:6pt 0; text-align:justify; text-indent:1cm;';
    var L = TTGQ_LOAI[x.loai] || TTGQ_LOAI.hgq;
    var nyc = gqE(getClaimRequesterName(claim) || '........');
    var so = x.prevNo ? gqE(x.prevNo) : '…/QĐ-……';
    var ngay = x.prevDate ? gqE(x.prevDate) : '…./…./…...';
    var nn = String(x.noiNhan || '').split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (!nn.length) nn = TTGQ_NOI_NHAN_DEFAULT.split('\n');
    var head = typeof dcgqHeadTitle === 'function' ? dcgqHeadTitle(p.issuer) : 'THỦ TRƯỞNG ' + String(p.issuer || '').toUpperCase();
    return p.W.docHeaderHtml(p.unitId, TTGQ_FORM, 'QĐ', { soKyHieu: x.docNumber, ngay: x.docDate })
        + '<p style="text-align:center; margin:18pt 0 6pt;"><b>QUYẾT ĐỊNH</b><br><b>Tiếp tục giải quyết bồi thường</b></p>'
        + '<p style="text-align:center; margin:6pt 0 12pt;"><b>' + gqE(head) + '</b></p>'
        + '<p style="' + P + '">Căn cứ ' + (x.canCu ? gqE(x.canCu) : '…..') + ' Luật Trách nhiệm bồi thường của Nhà nước năm 2017 số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16);</p>'
        + '<p style="' + P + '">Căn cứ Quyết định ' + gqE(L.word) + ' giải quyết yêu cầu bồi thường số ' + so + ', ngày ' + ngay + ' của ' + gqE(p.issuer || '........') + ';</p>'
        + '<p style="text-align:center; margin:10pt 0;"><b>QUYẾT ĐỊNH:</b></p>'
        + '<p style="' + P + '"><b>Điều 1.</b> Tiếp tục giải quyết yêu cầu bồi thường của Ông/Bà ' + nyc + '. Địa chỉ: ' + gqE(p.address || '........') + '.</p>'
        + '<p style="' + P + '"><b>Điều 2.</b> Quyết định này có hiệu lực kể từ ngày ký. Quyết định ' + gqE(L.word) + ' giải quyết yêu cầu bồi thường số ' + so + ' ngày ' + ngay + ' hết hiệu lực kể từ ngày Quyết định này có hiệu lực.</p>'
        + '<p style="' + P + '"><b>Điều 3.</b> Ông/Bà ' + nyc + ' và cơ quan, tổ chức, cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này./.</p>'
        + '<table style="width:100%; border-collapse:collapse; margin-top:18pt;"><tr>'
        + '<td style="width:50%; vertical-align:top; font-size:12pt;"><b><i>Nơi nhận:</i></b><br>' + nn.map(gqE).join('<br>') + '</td>'
        + '<td style="text-align:center; vertical-align:top;"><b>THỦ TRƯỞNG CƠ QUAN</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i></td></tr></table>';
}
function ttgqFormData() {
    return {
        loai: ttgqS.loai, canCu: ttgqEl('ttgqCanCu').value.trim(), prevNo: ttgqEl('ttgqPrevNo').value.trim(), prevDate: ttgqEl('ttgqPrevDate').value.trim(),
        docNumber: ttgqEl('ttgqDocNumber').value.trim(), docDate: ttgqEl('ttgqDocDate').value.trim(), noiNhan: ttgqEl('ttgqNoiNhan').value
    };
}
function ttgqBuildDoc() { var c = ttgqS.claim; return c ? { html: ttgqBuildMau23(c, ttgqFormData()), base: ttgqDocBaseName(c) } : null; }

// ---------- Giao diện ----------
function ttgqEnsureModal() {
    if (ttgqEl('modalttgq')) return;
    var card = function (val, title, desc, ico, off) {
        var rid = 'ttgqSigningMethod' + (off ? 'Offline' : 'Online');
        return '<label class="sign-card' + (off ? '' : ' active') + '" id="ttgqCardSign' + (off ? 'Offline' : 'Online') + '" for="' + rid + '">'
            + '<input type="radio" name="ttgqSigningMethod" id="' + rid + '" value="' + val + '"' + (off ? '' : ' checked') + ' onchange="ttgqToggleSigningMethod(\'' + val + '\')">'
            + '<div class="sign-card-content"><div class="sign-card-icon' + (off ? ' offline' : '') + '"><i class="fa-solid ' + ico + '"></i></div><div class="sign-card-text"><div class="sign-card-title">' + title + '</div><div class="sign-card-desc">' + desc + '</div></div></div>'
            + '<div class="sign-card-check"><i class="' + (off ? 'fa-regular fa-circle' : 'fa-solid fa-circle-check') + '"></i></div></label>';
    };
    // Quyết định hoãn / tạm đình chỉ trước: hiển thị ở mọi hình thức ký
    var prevSec = '<div class="gqx-sec" id="ttgqPrevSection"><div class="gqx-sec-title"><i class="fa-solid fa-file-lines"></i> <span id="ttgqPrevSecTitle">Quyết định hoãn giải quyết bồi thường</span></div>'
        + '<div class="gqx-grid2" style="margin-bottom:0;">' + hgqField('ttgqPrevNo', '<span id="ttgqPrevNoLabel">Số QĐ hoãn giải quyết bồi thường</span>', true, '<input type="text" id="ttgqPrevNo" class="form-control" maxlength="50" placeholder="Nhập số quyết định" oninput="hgqClearErr(\'ttgqPrevNo\')">')
        + hgqField('ttgqPrevDate', '<span id="ttgqPrevDateLabel">Ngày QĐ hoãn giải quyết bồi thường</span>', true, hgqDateCtrl('ttgqPrevDate', 'hgqClearErr(\'ttgqPrevDate\')')) + '</div></div>';
    var meta = '<div id="ttgqDocMetaGroup" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:12px;"><div style="font-size:12px; font-weight:700; color:#334155; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:10px; display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu 23/BTNN</div>'
        + '<div class="gqx-grid2" style="margin-bottom:10px;">' + hgqField('ttgqDocNumber', 'Số, ký hiệu văn bản', true, '<input type="text" id="ttgqDocNumber" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="hgqClearErr(\'ttgqDocNumber\')">')
        + hgqField('ttgqDocDate', 'Ngày văn bản', true, hgqDateCtrl('ttgqDocDate', 'hgqClearErr(\'ttgqDocDate\')')) + '</div>'
        + hgqField('ttgqCanCu', 'Căn cứ', true, '<textarea id="ttgqCanCu" class="form-control" rows="2" maxlength="500" style="resize:none; overflow:hidden;" placeholder="Nhập căn cứ tiếp tục giải quyết (điểm, khoản, điều)" oninput="hgqClearErr(\'ttgqCanCu\'); hgqAutoGrow(this)"></textarea>')
        + '<div class="gqx-field" style="margin-bottom:0;"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;"><label class="form-label" for="ttgqNoiNhan" style="margin-bottom:0;">Nơi nhận</label><span style="font-size:11.5px; color:#64748b;"><i class="fa-solid fa-circle-info"></i> Mỗi nơi nhận trên 01 dòng</span></div><textarea id="ttgqNoiNhan" class="form-control" rows="3" style="font-size:12.5px; line-height:1.5; resize:none; overflow:hidden;" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng..." oninput="hgqAutoGrow(this)"></textarea></div></div>';
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modalttgq" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div id="ttgqContainer" class="sticky-modal-container" style="background:#fff; width:850px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3);">'
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#dcfce7; color:#15803d; font-size:14px;"><i class="fa-solid fa-play"></i></span><span id="ttgqTitle">TRÌNH KÝ QUYẾT ĐỊNH TIẾP TỤC GIẢI QUYẾT BỒI THƯỜNG</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Hồ sơ: <strong id="ttgqClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người yêu cầu: <span id="ttgqClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="ttgqClaimAgency" style="font-weight:500; color:#475569;">--</span><span style="margin:0 6px;">•</span> Trạng thái: <span id="ttgqClaimStatus" style="font-weight:600; color:#b45309;">--</span></div>'
        + '</div><button type="button" onclick="closeTtgqModal()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        + '<div id="ttgqStepperBar" class="ktl-stepper-fullwidth"><div id="ttgqStep1Tab" class="ktl-step-tab active" onclick="ttgqGoStep1()"><span class="ktl-step-badge" id="ttgqStep1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>'
        + '<div class="ktl-stepper-sep"><i class="fa-solid fa-chevron-right"></i></div><div id="ttgqStep2Tab" class="ktl-step-tab" onclick="ttgqGoStep2()"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
        + '<div id="ttgqStep1Body" class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div id="ttgqReturnedAlertBlock" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;"><div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> HỒ SƠ BỊ LÃNH ĐẠO TRẢ VỀ YÊU CẦU CHỈNH SỬA</div><div style="font-size:12.5px; color:#92400e; line-height:1.5;">Lý do trả về: <strong id="ttgqReturnedReason">--</strong><br>Người trả về: <span id="ttgqReturnedOfficer">--</span> • Thời điểm: <span id="ttgqReturnedDate">--</span></div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
        + card('online', 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', 'fa-file-signature', false)
        + card('offline', 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', 'fa-stamp', true)
        + '</div></div>'
        + prevSec
        + '<div class="gqx-sec" id="ttgqDocSection"><div class="gqx-sec-title" id="ttgqDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>'
        + '<div id="ttgqDocSrcGroup"><div class="doc-src-segmented"><button type="button" class="doc-src-seg-btn active" id="ttgqSegBtnGen" onclick="ttgqSetDocSrc(\'gen\')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 23/BTNN</span></button><button type="button" class="doc-src-seg-btn" id="ttgqSegBtnUpload" onclick="ttgqSetDocSrc(\'upload\')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button></div></div>'
        + meta
        + '<div id="ttgqOnlineSection"><input type="file" id="ttgqOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="ttgqOnlineUpload(this)"><div id="ttgqDocFileBox"></div><div id="ttgqDocFileError" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div id="ttgqOfflineSection" style="display:none;"><input type="file" id="ttgqOfflineFileInput" accept=".pdf" style="display:none;" onchange="ttgqOfflineUpload(this)">'
        + '<div id="ttgqOfflineDrop" class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'ttgqOfflineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="ttgqDrop(event, true)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a></div><div class="ktlx-drop-sub">(Chỉ chấp nhận .pdf, tối đa 50MB)</div></div>'
        + '<div id="ttgqOfflineFileRow" style="display:none;"></div><div id="ttgqOfflineFileErr" class="gqx-err">' + TTGQ_OFF_MSG + '</div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và vụ việc chuyển về trạng thái trước khi hoãn giải quyết / tạm đình chỉ (<strong id="ttgqRestoreNote">--</strong>).</div></div>'
        + '</div>'
        + '<div id="ttgqTlkt"></div>'
        + '</div>'
        + '<div id="ttgqStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative;">'
        + '<div style="flex:1; overflow-y:auto; overflow-x:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;"><div id="ttgqA4Page" class="a4-document-page"><div id="ttgqA4Content"></div></div></div>'
        + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; box-shadow:-4px 0 15px rgba(0,0,0,0.05); z-index:20;">'
        + '<div><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div><div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>'
        + '<div id="ttgqSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>'
        + '<div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>'
        + '<div class="form-group" style="margin-bottom:0;"><label class="form-label" for="ttgqSignContent" style="font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block;">Nội dung trình <span style="color:#dc2626;">*</span></label><textarea id="ttgqSignContent" class="form-control" rows="4" style="font-size:13px;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="this.classList.remove(\'is-invalid\'); var e=document.getElementById(\'ttgqSignContentErr\'); if(e) e.style.display=\'none\';"></textarea><div id="ttgqSignContentErr" class="error-message" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</div></div>'
        + '</div></div>'
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;"><div style="display:flex; gap:10px; margin-left:auto;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeTtgqModal()">Hủy bỏ</button>'
        + '<button id="ttgqBtnSubmitOffline" type="button" class="btn btn-primary" onclick="ttgqSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
        + '<button id="ttgqBtnNextStep" type="button" class="btn btn-primary" onclick="ttgqGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>'
        + '<button id="ttgqBtnBackStep1" type="button" class="btn btn-secondary" onclick="ttgqGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
        + '<button id="ttgqBtnSubmitOnline" type="button" class="btn btn-primary" onclick="ttgqSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; box-shadow:0 2px 6px rgba(22,163,74,0.3); font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>'
        + '</div></div></div></div>';
    document.body.appendChild(wrap.firstChild);
}

// ---------- Mở / đóng ----------
// Mở từ Thao tác khác "Tiếp tục giải quyết" (Hoãn giải quyết / Tạm đình chỉ) hoặc "Cập nhật" hồ sơ Bị trả lại có Loại trình "Tiếp tục giải quyết bồi thường"
function openTtgqModal(claimId) {
    var claim = gqClaim(claimId);
    if (!claim) return;
    var W = gqW();
    var rec = gqRecord(claim);
    var prev = rec && rec.status === 'Bị trả lại' && rec.approval && rec.approval.kind === TTGQ_KIND ? rec.approval : null;
    var sd = (prev && prev.signDoc) || {};
    var loai = prev ? (sd.loai || 'hgq') : ttgqLoaiOfStatus(ttgqStatusOf(claim));
    if (!loai) { showToast('Chỉ tiếp tục giải quyết vụ việc ở trạng thái Hoãn giải quyết hoặc Tạm đình chỉ.', 'error'); return; }
    var L = TTGQ_LOAI[loai];
    ttgqEnsureModal();
    gqFrameFull(true);
    ttgqS.claim = claim; ttgqS.loai = loai; ttgqS.online = null; ttgqS.offline = null;
    ttgqS.restore = (prev && (sd.restoreStatus || prev.resultStatus)) || ttgqRestoreStatus(claim);
    var ret = prev ? (rec.returned || {}) : null;
    ttgqEl('ttgqReturnedAlertBlock').style.display = prev ? 'block' : 'none';
    if (prev) {
        ttgqEl('ttgqReturnedReason').innerText = ret.reason || '--';
        ttgqEl('ttgqReturnedOfficer').innerText = (ret.by && W ? W.userName(ret.by) : '') || '--';
        ttgqEl('ttgqReturnedDate').innerText = ret.at || '--';
    }
    ttgqEl('ttgqClaimCode').innerText = hgqVvCode(claim) || '--';
    ttgqEl('ttgqClaimNYC').innerText = getClaimRequesterName(claim) || '--';
    ttgqEl('ttgqClaimAgency').innerText = claim.agency || '--';
    ttgqEl('ttgqClaimStatus').innerText = prev ? 'Bị trả lại (' + L.status + ')' : L.status;
    ttgqEl('ttgqRestoreNote').innerText = ttgqS.restore;
    // Nhãn Số / Ngày QĐ theo loại quyết định trước
    ttgqEl('ttgqPrevSecTitle').innerText = 'Quyết định ' + L.label;
    ttgqEl('ttgqPrevNoLabel').innerText = 'Số QĐ ' + L.label;
    ttgqEl('ttgqPrevDateLabel').innerText = 'Ngày QĐ ' + L.label;
    // Tự điền theo Quyết định hoãn / tạm đình chỉ đã ban hành; chưa có -> để trống, bắt buộc nhập
    var pd = ttgqPrevDecision(claim, loai);
    var today = hgqToday();
    ttgqEl('ttgqCanCu').value = sd.canCu || '';
    ttgqEl('ttgqPrevNo').value = sd.prevNo || pd.docNo;
    ttgqEl('ttgqPrevDate').value = sd.prevDate || pd.docDate;
    hgqFlat('ttgqPrevDate', ttgqEl('ttgqPrevDate').value, function () { hgqClearErr('ttgqPrevDate'); });
    ttgqEl('ttgqDocNumber').value = '     /QĐ-';
    ttgqEl('ttgqDocDate').value = today;
    hgqFlat('ttgqDocDate', today, function () { hgqClearErr('ttgqDocDate'); });
    ttgqEl('ttgqNoiNhan').value = sd.noiNhan && sd.noiNhan.length ? sd.noiNhan.join('\n') : TTGQ_NOI_NHAN_DEFAULT;
    ['ttgqDocNumber', 'ttgqDocDate', 'ttgqCanCu', 'ttgqPrevNo', 'ttgqPrevDate'].forEach(hgqClearErr);
    ttgqEl('ttgqSignContent').value = TTGQ_CONTENT;
    gqSignInit('ttgq', claim, prev && Array.isArray(prev.assignees) ? prev.assignees : null);
    ttgqOfflineRemove();
    ttgqSetDocSrc('gen');
    tlktGqRestore('ttgq', prev, {
        required: false,
        setSrc: function (s) { ttgqSetDocSrc(s); },
        setFile: function (f) { ttgqS.online = f; ttgqRenderDocBox(); },
        fields: [['ttgqDocNumber', 'docNumber'], ['ttgqDocDate', 'docDate']]
    });
    ttgqEl('ttgqSigningMethodOnline').checked = true;
    ttgqToggleSigningMethod('online');
    ttgqGoStep1();
    var modal = ttgqEl('modalttgq');
    modal.style.display = 'flex'; modal.classList.add('active'); modal.classList.add('visible');
    hgqAutoGrow(ttgqEl('ttgqNoiNhan'));
    hgqAutoGrow(ttgqEl('ttgqCanCu'));
}
function closeTtgqModal() {
    gqFrameFull(false);
    ktlxCancelConvert('ttgq');
    var modal = ttgqEl('modalttgq');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('active'); modal.classList.remove('visible'); }
    ttgqS.claim = null;
}
function ttgqSetDocSrc(src) {
    ttgqS.docSrc = src === 'upload' ? 'upload' : 'gen';
    var isGen = ttgqS.docSrc === 'gen';
    ttgqEl('ttgqSegBtnGen').classList.toggle('active', isGen); ttgqEl('ttgqSegBtnUpload').classList.toggle('active', !isGen);
    ttgqS.online = null;
    ktlxCancelConvert('ttgq');
    var fe = ttgqEl('ttgqDocFileError'); fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    ttgqApplyDocMeta();
    ttgqRenderDocBox();
}
function ttgqApplyDocMeta() {
    var g = ttgqEl('ttgqDocMetaGroup');
    if (g) { g.style.display = (!ttgqIsOffline() && ttgqS.docSrc === 'gen') ? '' : 'none'; hgqAutoGrow(ttgqEl('ttgqNoiNhan')); }
}
function ttgqToggleSigningMethod(method) {
    var isOnline = method === 'online';
    [['ttgqCardSignOnline', isOnline], ['ttgqCardSignOffline', !isOnline]].forEach(function (x) {
        var c = ttgqEl(x[0]); c.classList.toggle('active', x[1]);
        var ico = c.querySelector('.sign-card-check i'); if (ico) ico.className = x[1] ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    ttgqApplyDocMeta();
    if (!isOnline) ['ttgqDocNumber', 'ttgqDocDate', 'ttgqCanCu'].forEach(hgqClearErr);
    var bar = ttgqEl('ttgqStepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !isOnline); bar.setAttribute('aria-hidden', isOnline ? 'false' : 'true');
    var show = function (id, on, disp) { var el = ttgqEl(id); if (el) el.style.display = on ? (disp || 'block') : 'none'; };
    show('ttgqDocSrcGroup', isOnline);
    show('ttgqOnlineSection', isOnline);
    show('ttgqOfflineSection', !isOnline);
    show('ttgqBtnSubmitOffline', !isOnline, 'inline-flex');
    show('ttgqBtnNextStep', isOnline, 'inline-flex');
    if (typeof tlktShow === 'function') tlktShow('ttgq', isOnline);
    ttgqEl('ttgqDocSectionTitle').innerHTML = isOnline ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
}
function ttgqRenderDocBox() {
    var box = ttgqEl('ttgqDocFileBox'); if (!box) return;
    if (ttgqS.docSrc === 'gen') {
        box.innerHTML = '<div class="gqx-file-empty"><div class="gqx-file-hint"><i class="fa-solid fa-file-circle-check" style="color:#2563eb; font-size:16px; margin-right:6px;"></i>Hệ thống tự động sinh Quyết định theo Mẫu 23/BTNN từ thông tin đang nhập.</div><div class="gqx-file-actions"><button type="button" class="btn-preview-doc" onclick="ttgqPreview()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div></div>';
        return;
    }
    if (ktlxConverting.ttgq) { box.innerHTML = '<div class="ktlx-converting"><span class="ktlx-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    var f = ttgqS.online;
    box.innerHTML = !f
        ? '<div class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'ttgqOnlineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="ttgqDrop(event, false)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a></div><div class="ktlx-drop-sub">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)</div></div>'
        : ktlxFileCardHtml(f.name, f.size, f.note, 'ttgqOnlineView()', 'ttgqOnlineRemove()');
}
function ttgqDrop(e, offline) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    var fs = e.dataTransfer && e.dataTransfer.files;
    if (fs && fs.length) (offline ? ttgqOfflineUpload : ttgqOnlineUpload)({ files: [fs[0]], value: '' });
}
// Số / Ngày QĐ hoãn hoặc tạm đình chỉ: bắt buộc ở mọi hình thức ký; trả về ô lỗi đầu tiên
function ttgqValidatePrev() {
    var first = null;
    if (!ttgqCleanNo(ttgqEl('ttgqPrevNo').value)) first = hgqFirst(first, 'ttgqPrevNo'); else hgqClearErr('ttgqPrevNo');
    var pd = ttgqEl('ttgqPrevDate').value.trim();
    if (!pd) first = hgqFirst(first, 'ttgqPrevDate');
    else if (!hgqParse(pd)) first = hgqFirst(first, 'ttgqPrevDate', 'Ngày không hợp lệ (dd/mm/yyyy)');
    else hgqClearErr('ttgqPrevDate');
    return first;
}
// Bước 1: Số / Ngày QĐ trước + khối Thông tin điền vào Mẫu 23/BTNN (chỉ khi Sinh văn bản theo mẫu); trả về ô lỗi đầu tiên
function ttgqValidateStep1() {
    var first = ttgqValidatePrev();
    if (ttgqS.docSrc !== 'gen') return first;
    var no = ttgqCleanNo(ttgqEl('ttgqDocNumber').value), dt = ttgqEl('ttgqDocDate').value.trim();
    if (!no) first = hgqFirst(first, 'ttgqDocNumber'); else hgqClearErr('ttgqDocNumber');
    if (!dt) first = hgqFirst(first, 'ttgqDocDate');
    else if (!hgqParse(dt)) first = hgqFirst(first, 'ttgqDocDate', 'Ngày văn bản không hợp lệ (dd/mm/yyyy)');
    else hgqClearErr('ttgqDocDate');
    if (!ttgqEl('ttgqCanCu').value.trim()) first = hgqFirst(first, 'ttgqCanCu'); else hgqClearErr('ttgqCanCu');
    return first;
}
function ttgqPreview() {
    var bad = ttgqValidateStep1();
    if (bad) { bad.focus(); return; }
    var doc = ttgqBuildDoc();
    if (doc) gqW().openDocTab(doc.html, doc.base);
}
function ttgqOnlineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var fe = ttgqEl('ttgqDocFileError');
    var msg = ktlxCheckFile(file, ['.pdf', '.doc', '.docx']);
    if (msg) { fe.textContent = msg; fe.style.display = 'block'; showToast(msg, 'error'); return; }
    fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    var size = ktlxFmtSize(file.size);
    if (/\.docx?$/i.test(file.name)) {
        ttgqS.online = null; ktlxConverting.ttgq = true; ktlxSetNextBusy('ttgq', true); ttgqRenderDocBox();
        var token = (ktlxConverting.ttgqToken = (ktlxConverting.ttgqToken || 0) + 1);
        setTimeout(function () {
            if (ktlxConverting.ttgqToken !== token || !ktlxConverting.ttgq) return;
            ktlxConverting.ttgq = false; ktlxSetNextBusy('ttgq', false);
            ttgqS.online = { name: file.name.replace(/\.docx?$/i, '.pdf'), size: size, source: 'uploaded', raw: file, note: 'Đã chuyển đổi từ ' + file.name };
            ttgqRenderDocBox();
        }, 1200);
        return;
    }
    ttgqS.online = { name: file.name, size: size, source: 'uploaded', raw: file };
    ttgqRenderDocBox();
}
function ttgqOnlineView() { var f = ttgqS.online; if (!f) return; if (f.source === 'generated') gqW().openDocTab(f.bodyHtml, f.base); else gqOpenUploadedFile(f); }
function ttgqOnlineRemove() { ttgqS.online = null; ktlxCancelConvert('ttgq'); ttgqRenderDocBox(); }
function ttgqOfflineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var err = ttgqEl('ttgqOfflineFileErr'), drop = ttgqEl('ttgqOfflineDrop');
    var msg = ktlxCheckFile(file, ['.pdf']);
    if (msg) { err.textContent = msg; err.style.display = 'block'; drop.classList.add('is-error'); showToast(msg, 'error'); return; }
    ttgqS.offline = { name: file.name, size: ktlxFmtSize(file.size), raw: file };
    var row = ttgqEl('ttgqOfflineFileRow');
    row.innerHTML = ktlxFileCardHtml(file.name, ttgqS.offline.size, '', 'gqOpenUploadedFile(ttgqS.offline)', 'ttgqOfflineRemove()');
    row.style.display = 'block';
    drop.style.display = 'none'; drop.classList.remove('is-error');
    err.textContent = TTGQ_OFF_MSG; err.style.display = 'none';
}
function ttgqOfflineRemove() {
    ttgqS.offline = null;
    var row = ttgqEl('ttgqOfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    var drop = ttgqEl('ttgqOfflineDrop'); if (drop) { drop.style.display = ''; drop.classList.remove('is-error'); }
    var err = ttgqEl('ttgqOfflineFileErr'); if (err) { err.textContent = TTGQ_OFF_MSG; err.style.display = 'none'; }
}

// ---------- Bước ----------
function ttgqGoStep1() {
    var c = ttgqEl('ttgqContainer'); c.style.width = '850px'; c.style.maxWidth = '96%'; c.style.height = 'auto';
    ttgqEl('ttgqStep1Tab').className = 'ktl-step-tab active';
    ttgqEl('ttgqStep1Badge').innerHTML = '1';
    ttgqEl('ttgqStep2Tab').className = 'ktl-step-tab';
    ttgqEl('ttgqStep1Body').style.display = 'block';
    ttgqEl('ttgqStep2Body').style.display = 'none';
    var off = ttgqIsOffline();
    ttgqEl('ttgqBtnNextStep').style.display = off ? 'none' : 'inline-flex';
    ttgqEl('ttgqBtnSubmitOffline').style.display = off ? 'inline-flex' : 'none';
    ttgqEl('ttgqBtnBackStep1').style.display = 'none';
    ttgqEl('ttgqBtnSubmitOnline').style.display = 'none';
    hgqAutoGrow(ttgqEl('ttgqNoiNhan'));
}
// Tiếp tục: kiểm tra Bước 1 -> Bước 2 (Kéo ô ký & chọn Lãnh đạo)
function ttgqGoStep2() {
    var S = ttgqS;
    if (!S.claim || ttgqIsOffline()) return;
    if (ktlxConverting.ttgq) { showToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    var first = ttgqValidateStep1();
    if (S.docSrc !== 'gen' && !S.online) { ttgqEl('ttgqDocFileError').style.display = 'block'; first = first || ttgqEl('ttgqDocFileBox'); }
    var okT = typeof tlktValidate !== 'function' || tlktValidate('ttgq');
    if (first || !okT) {
        if (first && first.focus) first.focus();
        showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'warning');
        return;
    }
    var content = ttgqEl('ttgqA4Content');
    if (S.docSrc === 'gen') {
        var doc = ttgqBuildDoc();
        S.online = { name: doc.base + '.doc', size: Math.max(1, Math.round(doc.html.length / 1024)) + ' KB', source: 'generated', base: doc.base, bodyHtml: doc.html };
        content.innerHTML = doc.html;
    } else {
        content.innerHTML = '<div style="text-align:center; padding-top:320px; color:#475569;"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#94a3b8;"></i><div style="margin-top:12px; font-weight:700;">' + gqE(S.online.name) + '</div><div style="font-size:12.5px;">Văn bản tải lên từ máy - ' + TTGQ_DOC_TITLE + '</div></div>';
    }
    var c = ttgqEl('ttgqContainer'); c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh';
    ttgqEl('ttgqStep1Tab').className = 'ktl-step-tab completed';
    ttgqEl('ttgqStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    ttgqEl('ttgqStep2Tab').className = 'ktl-step-tab active';
    ttgqEl('ttgqStep1Body').style.display = 'none';
    ttgqEl('ttgqStep2Body').style.display = 'flex';
    ttgqEl('ttgqBtnNextStep').style.display = 'none';
    ttgqEl('ttgqBtnSubmitOffline').style.display = 'none';
    ttgqEl('ttgqBtnBackStep1').style.display = 'inline-flex';
    ttgqEl('ttgqBtnSubmitOnline').style.display = 'inline-flex';
    gqSignRefresh('ttgq');
}

// ---------- Trình / Ban hành ----------
function ttgqReasonText(x) {
    var L = TTGQ_LOAI[x.loai] || TTGQ_LOAI.hgq;
    return 'Tiếp tục giải quyết sau ' + L.label + (x.prevNo ? ' (QĐ số ' + x.prevNo + (x.prevDate ? ' ngày ' + x.prevDate : '') + ')' : '') + (x.canCu ? '; căn cứ ' + x.canCu : '');
}
// Dữ liệu lưu: Số / Ngày QĐ trước theo ô trên form (mọi hình thức); Căn cứ, Số ký hiệu, Ngày văn bản, Nơi nhận chỉ khi Sinh văn bản theo mẫu
function ttgqData(gen) {
    var x = ttgqFormData();
    if (!gen) { x.canCu = ''; x.docNumber = ''; x.docDate = ''; x.noiNhan = ''; }
    return {
        loai: x.loai, canCu: x.canCu, prevNo: x.prevNo, prevDate: x.prevDate, docNumber: ttgqCleanNo(x.docNumber), docDate: x.docDate,
        noiNhan: String(x.noiNhan || '').split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean), restoreStatus: ttgqS.restore
    };
}
// Ký số: trình Lãnh đạo -> "Chờ duyệt"; cấp cuối Ký duyệt -> trạng thái trước khi Hoãn / Tạm đình chỉ (ttgqOnApplied)
function ttgqSubmitOnline() {
    var S = ttgqS;
    var claim = S.claim;
    if (!claim || !S.online) return;
    var sign = gqSignCollect('ttgq');
    if (!sign) return;
    var gen = S.online.source === 'generated';
    var fileName = S.online.name;
    var data = ttgqData(gen);
    var draftDoc = { source: gen ? 'generated' : 'uploaded', formNo: TTGQ_FORM, docTitle: TTGQ_DOC_TITLE, generatedName: gen ? fileName : '', uploadedName: gen ? '' : fileName, bodyHtml: gen ? S.online.bodyHtml : '' };
    var signDoc = Object.assign({ method: 'Ký số', file: gen ? ttgqDocBaseName(claim) + '.pdf' : fileName, enableRoomSig: sign.enableNhay, sigCoords: sign.coords }, data, tlktGqExtra('ttgq', S.online, S.docSrc, sign.content));
    var res = gqSubmit(claim, TTGQ_KIND, sign.content, [], { assignee: sign.assignees[0] || '', assignees: sign.assignees, reason: ttgqReasonText(data), resultStatus: S.restore, draftDoc: draftDoc, signDoc: signDoc });
    if (!res || res.ok === false) { showToast(res ? res.message : 'Không trình được hồ sơ.', 'error'); return; }
    gqSaveData(claim, { tiepTucGiaiQuyet: Object.assign({ fileName: fileName, formNo: TTGQ_FORM, signingMethod: 'Ký số', submittedAt: gqNow() }, data) });
    closeTtgqModal();
    gqAfterSubmit(claim, TTGQ_KIND);
}
// Ghi nhận kết quả (Ký duyệt cấp cuối / Ban hành Ký ngoài): lịch sử Tiếp tục giải quyết; nhánh Phục hồi danh dự giữ nguyên
function ttgqApplyResult(claim, d, method, file, oldStatus) {
    d = d || {};
    var L = TTGQ_LOAI[d.loai] || TTGQ_LOAI.hgq;
    claim.slaStatus = 'normal';
    claim.slaText = 'Tiếp tục xử lý tại bước ' + claim.status;
    if (!Array.isArray(claim.specialStatusLogs)) claim.specialStatusLogs = [];
    claim.specialStatusLogs.push({ type: 'Tiếp tục giải quyết', docNo: d.docNumber || '', docDate: d.docDate || '', signMode: method, startDate: gqToday(), endDate: '', previousStatus: oldStatus || L.status, reason: ttgqReasonText(d), files: file ? [{ name: file, size: '', url: '#' }] : [], createdAt: gqToday(), attachments: Array.isArray(d.attachments) ? JSON.parse(JSON.stringify(d.attachments)) : [] });
}
// Gọi từ gqApplyRecord khi vụ việc nhận trạng thái mới từ kho luồng (cấp cuối Ký duyệt phiếu trình "Tiếp tục giải quyết bồi thường")
function ttgqOnApplied(c, r, st) {
    var a = r && r.approval;
    if (!a || a.kind !== TTGQ_KIND || st === 'Chờ duyệt' || st === 'Bị trả lại') return;
    var sd = a.signDoc || {};
    ttgqApplyResult(c, sd, 'Ký số', sd.file || '', (TTGQ_LOAI[sd.loai] || TTGQ_LOAI.hgq).status);
}
// Ký ngoài: kiểm tra Số / Ngày QĐ trước, tệp PDF đã ký -> popup xác nhận -> ban hành trực tiếp
function ttgqSubmitOffline() {
    var S = ttgqS;
    if (!S.claim) return;
    var first = ttgqValidatePrev();
    if (!S.offline) {
        var fErr = ttgqEl('ttgqOfflineFileErr'); fErr.textContent = TTGQ_OFF_MSG; fErr.style.display = 'block';
        var drop = ttgqEl('ttgqOfflineDrop'); drop.classList.add('is-error'); first = first || drop;
    }
    if (first) { if (first.focus) first.focus(); return; }
    var overlay = ttgqEl('customConfirmOverlay'), btnYes = ttgqEl('customConfirmBtnYes'), btnNo = ttgqEl('customConfirmBtnNo');
    var prevZ = overlay ? overlay.style.zIndex : '';
    var restore = function () { if (overlay) overlay.style.zIndex = prevZ; if (btnYes) btnYes.style.backgroundColor = ''; };
    showConfirmModal('Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Vụ việc sẽ chuyển về trạng thái "' + S.restore + '". Bạn có chắc chắn muốn ban hành văn bản?',
        function () { restore(); ttgqIssueOffline(); },
        { title: 'Xác nhận ban hành văn bản', btnYesText: 'Ban hành', btnYesClass: 'btn-success', btnNoText: 'Hủy bỏ' });
    if (overlay) overlay.style.zIndex = '10050';
    if (btnYes) btnYes.style.backgroundColor = '#16a34a';
    if (btnNo) btnNo.addEventListener('click', restore, { once: true });
}
function ttgqIssueOffline() {
    var S = ttgqS;
    var claim = S.claim;
    if (!claim || !S.offline) return;
    var W = gqW();
    var file = S.offline.name;
    var data = ttgqData(false);
    // Ký ngoài: Tài liệu ban hành kèm theo (chỉ khối ban hành kèm theo)
    data.attachments = typeof tlktGet === 'function' ? tlktGet('ttgq') : [];
    var L = TTGQ_LOAI[data.loai];
    var oldSt = L.status;
    var newSt = S.restore;
    var title = 'Ban hành quyết định tiếp tục giải quyết bồi thường (Ký ngoài)';
    claim.status = newSt;
    claim.wfReturned = null;
    ttgqApplyResult(claim, data, 'Ký ngoài', file, oldSt);
    if (!Array.isArray(claim.timeline)) claim.timeline = [];
    claim.timeline.push({ title: title, date: gqToday(), desc: TTGQ_DOC_TITLE + ' đã ký ngoài hệ thống (' + file + '). Kết thúc trạng thái [' + oldSt + '], vụ việc quay lại [' + newSt + '].', status: 'active' });
    try {
        var rec = gqEnsureRecord(claim) || gqRecord(claim);
        if (rec && W) { rec.status = newSt; W.addHistory(rec, title, ttgqReasonText(data) + '. Văn bản đã ký: ' + file + '.'); W.upsertRecord(rec); }
    } catch (e) { /* mockup: bỏ qua lỗi luồng */ }
    gqSaveData(claim, { status: newSt, tiepTucGiaiQuyet: Object.assign({ fileName: file, signedFile: file, formNo: TTGQ_FORM, signingMethod: 'Ký ngoài', issuedAt: gqNow() }, data) });
    closeTtgqModal();
    saveClaimsToLocal();
    renderClaimsTable();
    var detail = document.getElementById('caseDetailSection');
    if (detail && detail.style.display === 'block' && selectedClaimId === claim.id) showCaseDetail(claim.id, false);
    showToast('Đã ban hành quyết định tiếp tục giải quyết bồi thường (Ký ngoài) cho vụ việc ' + claimVvLabel(claim) + '. Vụ việc chuyển về trạng thái [' + newSt + '].', 'success');
}
