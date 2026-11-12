/*
 * Popup Chuyển CQGQBT (prefix ccq) - Giải quyết yêu cầu bồi thường
 * Bố cục giống Popup Trình ký Không thụ lý của Xác định CQGQBT / Tạm đình chỉ (quan_ly_boi_thuong_hgq.js):
 * - Bước 1: Hình thức ký (Ký số trên hệ thống | Ký ngoài (Ban hành trực tiếp)), thông tin vụ việc, Cơ quan tiếp nhận mới,
 *   Nội dung/Căn cứ chuyển, tệp văn bản chuyển cơ quan (tải lên), Tài liệu ban hành / không ban hành kèm theo
 *   -> Tiếp tục (Ký số) -> Bước 2: Thiết lập các cấp trình ký (cách đặt ô ký hiện có), Nội dung trình -> Trình Lãnh đạo
 * - Trình: vụ việc "Chờ duyệt", Loại trình "Chuyển CQGQBT"; cấp cuối Ký duyệt -> "Đã chuyển CQGQBT", tạo hồ sơ tại cơ quan tiếp nhận mới
 * - Ký ngoài: tải PDF đã ký -> xác nhận -> ban hành trực tiếp (Đã chuyển CQGQBT, tạo hồ sơ tại cơ quan tiếp nhận mới)
 * Dùng tiện ích sẵn có của quan_ly_boi_thuong.html (gqW, gqClaim, gqRecord, gqSubmit, gqSign*, ktlx*, tlktGqRestore, tlktGqExtra, gqMountTargetUnitTree).
 */
var CCQ_KIND = 'Chuyển CQGQBT';
var CCQ_RESULT = 'Đã chuyển CQGQBT';
var CCQ_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
var CCQ_CONTENT = 'Kính trình Lãnh đạo xem xét, ký duyệt văn bản chuyển hồ sơ sang cơ quan giải quyết bồi thường khác.';
var ccqS = { claim: null, online: null, offline: null };

function ccqEl(id) { return document.getElementById(id); }
function ccqIsOffline() { var r = ccqEl('ccqSigningMethodOffline'); return !!(r && r.checked); }
function ccqClearErr(id) { var el = ccqEl(id); if (el) el.classList.remove('is-invalid'); var er = ccqEl(id + 'Err'); if (er) er.style.display = 'none'; }
function ccqSetErr(id, msg) { var el = ccqEl(id); if (el) el.classList.add('is-invalid'); var er = ccqEl(id + 'Err'); if (er) { er.textContent = msg || 'Đây là trường bắt buộc'; er.style.display = 'block'; } return el; }
function ccqVvCode(claim) { return (typeof claimVvCode === 'function' && claimVvCode(claim)) || claim.code; }
function ccqField(id, label, req, ctrl) { return '<div class="gqx-field"><label class="form-label" for="' + id + '">' + label + (req ? '<span class="gqx-req">*</span>' : '') + '</label>' + ctrl + '<div id="' + id + 'Err" class="gqx-err">Đây là trường bắt buộc</div></div>'; }

function ccqEnsureModal() {
    if (ccqEl('modalccq')) return;
    var p = 'ccq';
    var card = function (val, title, desc, ico, off) {
        var rid = p + 'SigningMethod' + (off ? 'Offline' : 'Online');
        return '<label class="sign-card' + (off ? '' : ' active') + '" id="' + p + 'CardSign' + (off ? 'Offline' : 'Online') + '" for="' + rid + '">'
            + '<input type="radio" name="' + p + 'SigningMethod" id="' + rid + '" value="' + val + '"' + (off ? '' : ' checked') + ' onchange="ccqToggleSigningMethod(\'' + val + '\')">'
            + '<div class="sign-card-content"><div class="sign-card-icon' + (off ? ' offline' : '') + '"><i class="fa-solid ' + ico + '"></i></div><div class="sign-card-text"><div class="sign-card-title">' + title + '</div><div class="sign-card-desc">' + desc + '</div></div></div>'
            + '<div class="sign-card-check"><i class="' + (off ? 'fa-regular fa-circle' : 'fa-solid fa-circle-check') + '"></i></div></label>';
    };
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modalccq" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div id="ccqContainer" class="sticky-modal-container" style="background:#fff; width:850px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3);">'
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#e0f2fe; color:#0369a1; font-size:14px;"><i class="fa-solid fa-right-left"></i></span><span>Chuyển cơ quan giải quyết bồi thường</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Hồ sơ: <strong id="ccqClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người yêu cầu: <span id="ccqClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="ccqClaimAgency" style="font-weight:500; color:#475569;">--</span></div>'
        + '</div><button type="button" onclick="closeCcqModal()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        + '<div id="ccqStepperBar" class="ktl-stepper-fullwidth"><div id="ccqStep1Tab" class="ktl-step-tab active" onclick="ccqGoStep1()"><span class="ktl-step-badge" id="ccqStep1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>'
        + '<div class="ktl-stepper-sep"><i class="fa-solid fa-chevron-right"></i></div><div id="ccqStep2Tab" class="ktl-step-tab" onclick="ccqGoStep2()"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Thiết lập các cấp trình ký</span></div></div>'
        + '<div id="ccqStep1Body" class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div id="ccqReturnedAlertBlock" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;"><div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> Lý do bị trả lại</div><div style="font-size:12.5px; color:#92400e; line-height:1.5;">Lý do trả lại: <strong id="ccqReturnedReason">--</strong><br>Người trả lại: <span id="ccqReturnedOfficer">--</span> • Thời điểm trả lại: <span id="ccqReturnedDate">--</span></div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
        + card('online', 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', 'fa-file-signature', false)
        + card('offline', 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', 'fa-stamp', true)
        + '</div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-right-left"></i> Thông tin chuyển cơ quan giải quyết bồi thường</div>'
        + '<div id="ccqSummary" style="margin-bottom:12px;"></div>'
        + ccqField('gqTransferUnit', 'Cơ quan tiếp nhận mới', true, '<div id="gqTransferUnitBox"></div>')
        + ccqField('gqTransferContent', 'Nội dung/Căn cứ chuyển', true, '<textarea id="gqTransferContent" class="form-control" rows="4" maxlength="2000" placeholder="Nhập nội dung, căn cứ chuyển hồ sơ sang cơ quan giải quyết bồi thường khác" oninput="ccqClearErr(\'gqTransferContent\')"></textarea>')
        + '</div>'
        + '<div class="gqx-sec" id="ccqDocSection"><div class="gqx-sec-title" id="ccqDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>'
        + '<div id="ccqOnlineSection"><input type="file" id="ccqOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="ccqOnlineUpload(this)"><div id="ccqDocFileBox"></div><div id="ccqDocFileError" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div id="ccqOfflineSection" style="display:none;"><input type="file" id="ccqOfflineFileInput" accept=".pdf" style="display:none;" onchange="ccqOfflineUpload(this)">'
        + '<div id="ccqOfflineDrop" class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'ccqOfflineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="ccqDrop(event, true)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a></div><div class="ktlx-drop-sub">(Chỉ chấp nhận .pdf, tối đa 50MB)</div></div>'
        + '<div id="ccqOfflineFileRow" style="display:none;"></div><div id="ccqOfflineFileErr" class="gqx-err">' + CCQ_OFF_MSG + '</div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và vụ việc chuyển sang trạng thái <strong>' + CCQ_RESULT + '</strong>, hệ thống tạo hồ sơ tại cơ quan tiếp nhận mới.</div></div>'
        + '</div>'
        + '<div id="ccqTlkt"></div>'
        + '</div>'
        + '<div id="ccqStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative;">'
        + '<div style="flex:1; overflow-y:auto; overflow-x:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;"><div id="ccqA4Page" class="a4-document-page"><div id="ccqA4Content"></div></div></div>'
        + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; box-shadow:-4px 0 15px rgba(0,0,0,0.05); z-index:20;">'
        + '<div><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div><div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>'
        + '<div id="ccqSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>'
        + '<div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>'
        + '<div class="form-group" style="margin-bottom:0;"><label class="form-label" for="ccqSignContent" style="font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block;">Nội dung trình</label><textarea id="ccqSignContent" class="form-control" rows="4" style="font-size:13px;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="this.classList.remove(\'is-invalid\'); var e=document.getElementById(\'ccqSignContentErr\'); if(e) e.style.display=\'none\';"></textarea><div id="ccqSignContentErr" class="error-message" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</div></div>'
        + '</div></div>'
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;"><div id="ccqFooterMsg" style="color:#dc2626; font-size:12.5px;"></div><div style="display:flex; gap:10px; margin-left:auto;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeCcqModal()">Hủy bỏ</button>'
        + '<button id="ccqBtnSubmitOffline" type="button" class="btn btn-primary" onclick="ccqSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
        + '<button id="ccqBtnNextStep" type="button" class="btn btn-primary" onclick="ccqGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>'
        + '<button id="ccqBtnBackStep1" type="button" class="btn btn-secondary" onclick="ccqGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
        + '<button id="ccqBtnSubmitOnline" type="button" class="btn btn-primary" onclick="ccqSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; box-shadow:0 2px 6px rgba(22,163,74,0.3); font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>'
        + '</div></div></div></div>';
    document.body.appendChild(wrap.firstChild);
}

// ---------- Mở / đóng ----------
// Mở từ "Chuyển CQGQBT" hoặc "Cập nhật" hồ sơ Bị trả lại có Loại trình Chuyển CQGQBT
function ccqOpen(claimId) {
    var claim = gqClaim(claimId);
    if (!claim) return;
    var W = gqW();
    var rec = gqRecord(claim);
    var prev = rec && rec.status === 'Bị trả lại' && rec.approval && rec.approval.kind === CCQ_KIND ? rec.approval : null;
    var act = prev && prev.action ? prev.action : null;
    ccqEnsureModal();
    gqFrameFull(true);
    ccqS.claim = claim; ccqS.online = null; ccqS.offline = null;
    var ret = prev ? (rec.returned || {}) : null;
    ccqEl('ccqReturnedAlertBlock').style.display = prev ? 'block' : 'none';
    if (prev) {
        ccqEl('ccqReturnedReason').innerText = ret.reason || '--';
        ccqEl('ccqReturnedOfficer').innerText = (ret.by && W ? W.userName(ret.by) : '') || '--';
        ccqEl('ccqReturnedDate').innerText = ret.at || '--';
    }
    ccqEl('ccqClaimCode').innerText = ccqVvCode(claim) || '--';
    ccqEl('ccqClaimNYC').innerText = (typeof getClaimRequesterName === 'function' && getClaimRequesterName(claim)) || '--';
    ccqEl('ccqClaimAgency').innerText = claim.agency || '--';
    ccqEl('ccqSummary').innerHTML = typeof gqSummaryHtml === 'function' ? gqSummaryHtml(claim) : '';
    ccqEl('gqTransferContent').value = act ? (act.content || '') : '';
    ['gqTransferUnit', 'gqTransferContent'].forEach(ccqClearErr);
    ccqEl('ccqFooterMsg').innerText = '';
    if (typeof gqMountTargetUnitTree === 'function') gqMountTargetUnitTree(claim, act ? act.targetUnitId : '');
    ccqEl('ccqSignContent').value = CCQ_CONTENT;
    // [sn1] Bước 2 có khối Thông tin ban hành văn bản (Số, ký hiệu, Địa danh, Ngày văn bản; trình lại điền theo phiếu trình trước)
    gqSignInit('ccq', claim, prev && Array.isArray(prev.assignees) ? prev.assignees : null, { kind: CCQ_KIND });
    ccqOfflineRemove();
    ccqRenderDocBox();
    tlktGqRestore('ccq', prev, { required: false, setFile: function (f) { ccqS.online = f; ccqRenderDocBox(); } });
    ccqEl('ccqSigningMethodOnline').checked = true;
    ccqToggleSigningMethod('online');
    ccqGoStep1();
    var modal = ccqEl('modalccq');
    modal.style.display = 'flex'; modal.classList.add('active'); modal.classList.add('visible');
}
function closeCcqModal() {
    gqFrameFull(false);
    if (typeof ktlxCancelConvert === 'function') ktlxCancelConvert('ccq');
    var modal = ccqEl('modalccq');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('active'); modal.classList.remove('visible'); }
    ccqS.claim = null;
}
function ccqToggleSigningMethod(method) {
    var isOnline = method === 'online';
    [['ccqCardSignOnline', isOnline], ['ccqCardSignOffline', !isOnline]].forEach(function (x) {
        var c = ccqEl(x[0]); c.classList.toggle('active', x[1]);
        var ico = c.querySelector('.sign-card-check i'); if (ico) ico.className = x[1] ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    // Đổi sang Ký ngoài khi tệp đã chọn không phải .pdf: gỡ tệp đã chọn
    if (!isOnline && ccqS.online && !/\.pdf$/i.test(ccqS.online.name || '')) { ccqS.online = null; ccqRenderDocBox(); }
    var bar = ccqEl('ccqStepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !isOnline); bar.setAttribute('aria-hidden', isOnline ? 'false' : 'true');
    var show = function (id, on, disp) { var el = ccqEl(id); if (el) el.style.display = on ? (disp || 'block') : 'none'; };
    show('ccqOnlineSection', isOnline);
    show('ccqOfflineSection', !isOnline);
    show('ccqBtnSubmitOffline', !isOnline, 'inline-flex');
    show('ccqBtnNextStep', isOnline, 'inline-flex');
    if (typeof tlktShow === 'function') tlktShow('ccq', isOnline);
    ccqEl('ccqDocSectionTitle').innerHTML = isOnline ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
}
function ccqRenderDocBox() {
    var box = ccqEl('ccqDocFileBox'); if (!box) return;
    if (ktlxConverting.ccq) { box.innerHTML = '<div class="ktlx-converting"><span class="ktlx-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    var f = ccqS.online;
    box.innerHTML = !f
        ? '<div class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'ccqOnlineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="ccqDrop(event, false)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a></div><div class="ktlx-drop-sub">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)</div></div>'
        : ktlxFileCardHtml(f.name, f.size, f.note, 'ccqOnlineView()', 'ccqOnlineRemove()');
}
function ccqDrop(e, offline) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    var fs = e.dataTransfer && e.dataTransfer.files;
    if (fs && fs.length) (offline ? ccqOfflineUpload : ccqOnlineUpload)({ files: [fs[0]], value: '' });
}
function ccqOnlineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var fe = ccqEl('ccqDocFileError');
    var msg = ktlxCheckFile(file, ['.pdf', '.doc', '.docx']);
    if (msg) { fe.textContent = msg; fe.style.display = 'block'; showToast(msg, 'error'); return; }
    fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    var size = ktlxFmtSize(file.size);
    if (/\.docx?$/i.test(file.name)) {
        ccqS.online = null; ktlxConverting.ccq = true; ktlxSetNextBusy('ccq', true); ccqRenderDocBox();
        var token = (ktlxConverting.ccqToken = (ktlxConverting.ccqToken || 0) + 1);
        setTimeout(function () {
            if (ktlxConverting.ccqToken !== token || !ktlxConverting.ccq) return;
            ktlxConverting.ccq = false; ktlxSetNextBusy('ccq', false);
            ccqS.online = { name: file.name.replace(/\.docx?$/i, '.pdf'), size: size, source: 'uploaded', raw: file, note: 'Đã chuyển đổi từ ' + file.name };
            ccqRenderDocBox();
        }, 1200);
        return;
    }
    ccqS.online = { name: file.name, size: size, source: 'uploaded', raw: file };
    ccqRenderDocBox();
}
function ccqOnlineView() { if (ccqS.online) gqOpenUploadedFile(ccqS.online); }
function ccqOnlineRemove() { ccqS.online = null; if (typeof ktlxCancelConvert === 'function') ktlxCancelConvert('ccq'); ccqRenderDocBox(); }
function ccqOfflineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var err = ccqEl('ccqOfflineFileErr'), drop = ccqEl('ccqOfflineDrop');
    var msg = ktlxCheckFile(file, ['.pdf']);
    if (msg) { err.textContent = msg; err.style.display = 'block'; drop.classList.add('is-error'); showToast(msg, 'error'); return; }
    ccqS.offline = { name: file.name, size: ktlxFmtSize(file.size), raw: file };
    var row = ccqEl('ccqOfflineFileRow');
    row.innerHTML = ktlxFileCardHtml(file.name, ccqS.offline.size, '', 'gqOpenUploadedFile(ccqS.offline)', 'ccqOfflineRemove()');
    row.style.display = 'block';
    drop.style.display = 'none'; drop.classList.remove('is-error');
    err.textContent = CCQ_OFF_MSG; err.style.display = 'none';
}
function ccqOfflineRemove() {
    ccqS.offline = null;
    var row = ccqEl('ccqOfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    var drop = ccqEl('ccqOfflineDrop'); if (drop) { drop.style.display = ''; drop.classList.remove('is-error'); }
    var err = ccqEl('ccqOfflineFileErr'); if (err) { err.textContent = CCQ_OFF_MSG; err.style.display = 'none'; }
}
// Cơ quan tiếp nhận mới, Nội dung/Căn cứ chuyển: trả về ô lỗi đầu tiên
function ccqValidateInfo() {
    var first = null;
    if (!gqVal('gqTransferUnit')) { if (typeof gqMark === 'function') gqMark('gqTransferUnit', true); var e1 = ccqEl('gqTransferUnitErr'); if (e1) { if (e1.dataset.req) e1.textContent = e1.dataset.req; e1.style.display = 'block'; } first = ccqEl('gqTransferUnitBox'); }
    else {
        var e2 = ccqEl('gqTransferUnitErr');
        // [ro1] MSG-ERR-BTNN-LXL-007: cơ quan nhận (đơn vị gốc) chưa có tài khoản thuộc Nhóm Lãnh đạo -> chặn chuyển
        var Wc = gqW(), tid = gqVal('gqTransferUnit'), root = Wc ? (Wc.getRootId(tid) || tid) : '';
        if (Wc && Wc.leadersOfUnit && !Wc.leadersOfUnit(root).length) {
            if (e2) { if (!e2.dataset.req) e2.dataset.req = e2.textContent; e2.textContent = 'Đơn vị ' + Wc.unitName(root) + ' chưa có tài khoản thuộc Nhóm Lãnh đạo. Vui lòng liên hệ Quản trị hệ thống.'; e2.style.display = 'block'; }
            if (typeof gqMark === 'function') gqMark('gqTransferUnit', true);
            first = ccqEl('gqTransferUnitBox');
        } else if (e2) { if (e2.dataset.req) e2.textContent = e2.dataset.req; e2.style.display = 'none'; }
    }
    if (!gqVal('gqTransferContent')) first = first || ccqSetErr('gqTransferContent'); else ccqClearErr('gqTransferContent');
    return first;
}

// ---------- Bước ----------
function ccqGoStep1() {
    var c = ccqEl('ccqContainer'); c.style.width = '850px'; c.style.maxWidth = '96%'; c.style.height = 'auto';
    ccqEl('ccqStep1Tab').className = 'ktl-step-tab active';
    ccqEl('ccqStep1Badge').innerHTML = '1';
    ccqEl('ccqStep2Tab').className = 'ktl-step-tab';
    ccqEl('ccqStep1Body').style.display = 'block';
    ccqEl('ccqStep2Body').style.display = 'none';
    var off = ccqIsOffline();
    ccqEl('ccqBtnNextStep').style.display = off ? 'none' : 'inline-flex';
    ccqEl('ccqBtnSubmitOffline').style.display = off ? 'inline-flex' : 'none';
    ccqEl('ccqBtnBackStep1').style.display = 'none';
    ccqEl('ccqBtnSubmitOnline').style.display = 'none';
}
function ccqGoStep2() {
    if (!ccqS.claim || ccqIsOffline()) return;
    if (ktlxConverting.ccq) { showToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    var first = ccqValidateInfo();
    if (!ccqS.online) { ccqEl('ccqDocFileError').style.display = 'block'; first = first || ccqEl('ccqDocFileBox'); }
    var okT = typeof tlktValidate !== 'function' || tlktValidate('ccq');
    if (first || !okT) { if (first && first.focus) first.focus(); return; }
    ccqEl('ccqA4Content').innerHTML = '<div style="text-align:center; padding-top:320px; color:#475569;"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#94a3b8;"></i><div style="margin-top:12px; font-weight:700;">' + gqE(ccqS.online.name) + '</div><div style="font-size:12.5px;">Văn bản tải lên từ máy - Văn bản chuyển cơ quan giải quyết bồi thường</div></div>';
    var c = ccqEl('ccqContainer'); c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh';
    ccqEl('ccqStep1Tab').className = 'ktl-step-tab completed';
    ccqEl('ccqStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    ccqEl('ccqStep2Tab').className = 'ktl-step-tab active';
    ccqEl('ccqStep1Body').style.display = 'none';
    ccqEl('ccqStep2Body').style.display = 'flex';
    ccqEl('ccqBtnNextStep').style.display = 'none';
    ccqEl('ccqBtnSubmitOffline').style.display = 'none';
    ccqEl('ccqBtnBackStep1').style.display = 'inline-flex';
    ccqEl('ccqBtnSubmitOnline').style.display = 'inline-flex';
    gqSignRefresh('ccq');
}

// ---------- Trình / Ban hành ----------
// Tài liệu chuyển cùng hồ sơ: văn bản chuyển cơ quan + Tài liệu ban hành kèm theo (không chuyển Tài liệu không ban hành kèm theo)
function ccqTransferFiles(docName) {
    var list = typeof tlktGet === 'function' ? tlktGet('ccq') : [];
    var files = docName ? [{ name: docName }] : [];
    list.filter(function (d) { return d && d.scope !== 'internal'; }).forEach(function (d) { var n = (d.file && d.file.name) || d.name; if (n) files.push({ name: n }); });
    return files;
}
function ccqSubmitOnline() {
    var claim = ccqS.claim;
    if (!claim || !ccqS.online) return;
    var sign = gqSignCollect('ccq');
    if (!sign) return;
    var W = gqW();
    var unitId = gqVal('gqTransferUnit'), tc = gqVal('gqTransferContent');
    var fileName = ccqS.online.name;
    var files = ccqTransferFiles(fileName);
    var draftDoc = { source: 'uploaded', formNo: '', docTitle: 'Văn bản chuyển cơ quan giải quyết bồi thường', generatedName: '', uploadedName: fileName, bodyHtml: '' };
    // [sn1] Số, ký hiệu / Ngày văn bản theo khối Thông tin ban hành văn bản (Bước 2)
    var signDoc = Object.assign({ method: 'Ký số', file: fileName, enableRoomSig: sign.enableNhay, sigCoords: sign.coords, docNumber: sign.soKyHieu, docDate: sign.ngayVanBan }, tlktGqExtra('ccq', ccqS.online, 'upload', sign.content));
    var res = gqSubmit(claim, CCQ_KIND, sign.content, files, { assignee: sign.assignees[0] || '', assignees: sign.assignees, draftDoc: draftDoc, signDoc: signDoc, action: { type: 'transfer', targetUnitId: unitId, content: tc, files: files } });
    if (!res || res.ok === false) { ccqEl('ccqFooterMsg').innerText = res ? res.message : 'Không trình được hồ sơ.'; return; }
    gqSaveData(claim, { transferRequest: { via: CCQ_KIND, targetUnitId: unitId, targetName: W.unitName(unitId), content: tc, files: files, fileName: fileName, signingMethod: 'Ký số' } });
    closeCcqModal();
    gqAfterSubmit(claim, CCQ_KIND);
}
function ccqSubmitOffline() {
    if (!ccqS.claim) return;
    var first = ccqValidateInfo();
    if (!ccqS.offline) {
        var fErr = ccqEl('ccqOfflineFileErr'); fErr.textContent = CCQ_OFF_MSG; fErr.style.display = 'block';
        var drop = ccqEl('ccqOfflineDrop'); drop.classList.add('is-error'); first = first || drop;
    }
    if (typeof tlktValidate === 'function' && !tlktValidate('ccq')) first = first || ccqEl('ccqTlkt');
    if (first) { if (first.focus) first.focus(); return; }
    var overlay = ccqEl('customConfirmOverlay'), btnYes = ccqEl('customConfirmBtnYes'), btnNo = ccqEl('customConfirmBtnNo');
    var prevZ = overlay ? overlay.style.zIndex : '';
    var restore = function () { if (overlay) overlay.style.zIndex = prevZ; if (btnYes) btnYes.style.backgroundColor = ''; };
    showConfirmModal('Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Vụ việc sẽ chuyển sang trạng thái "' + CCQ_RESULT + '". Bạn có chắc chắn muốn ban hành văn bản?',
        function () { restore(); ccqIssueOffline(); },
        { title: 'Xác nhận ban hành văn bản', btnYesText: 'Ban hành', btnYesClass: 'btn-success', btnNoText: 'Hủy bỏ' });
    if (overlay) overlay.style.zIndex = '10050';
    if (btnYes) btnYes.style.backgroundColor = '#16a34a';
    if (btnNo) btnNo.addEventListener('click', restore, { once: true });
}
function ccqIssueOffline() {
    var claim = ccqS.claim;
    if (!claim || !ccqS.offline) return;
    var W = gqW();
    var unitId = gqVal('gqTransferUnit'), tc = gqVal('gqTransferContent');
    var file = ccqS.offline.name;
    var files = ccqTransferFiles(file);
    var newCode = '';
    try {
        var rec = gqEnsureRecord(claim) || gqRecord(claim);
        if (rec && W) {
            newCode = W.performTransfer(rec, { type: 'transfer', targetUnitId: unitId, content: tc, files: files }) || '';
            rec.status = CCQ_RESULT;
            W.addHistory(rec, 'Ban hành Chuyển CQGQBT (Ký ngoài)', 'Chuyển ' + W.unitName(unitId) + (newCode ? ' (hồ sơ ' + newCode + ')' : '') + '. Văn bản đã ký: ' + file + '.');
            W.upsertRecord(rec);
        }
    } catch (e) { /* mockup: bỏ qua lỗi luồng */ }
    claim.status = CCQ_RESULT;
    claim.wfReturned = null;
    if (!Array.isArray(claim.timeline)) claim.timeline = [];
    claim.timeline.push({ title: 'Ban hành Chuyển CQGQBT (Ký ngoài)', date: gqToday(), desc: 'Văn bản chuyển cơ quan đã ký ngoài hệ thống (' + file + '). Chuyển ' + (W ? W.unitName(unitId) : unitId) + (newCode ? ', tạo hồ sơ ' + newCode : '') + '. Vụ việc chuyển sang trạng thái [' + CCQ_RESULT + '].', status: 'active' });
    gqSaveData(claim, { status: CCQ_RESULT, transferRequest: { via: CCQ_KIND, targetUnitId: unitId, targetName: W ? W.unitName(unitId) : '', content: tc, files: files, fileName: file, signedFile: file, signingMethod: 'Ký ngoài', newCode: newCode, issuedAt: gqNow() } });
    closeCcqModal();
    saveClaimsToLocal();
    renderClaimsTable();
    var detail = document.getElementById('caseDetailSection');
    if (detail && detail.style.display === 'block' && selectedClaimId === claim.id) showCaseDetail(claim.id, false);
    showToast('Đã ban hành Chuyển CQGQBT (Ký ngoài) vụ việc ' + ccqVvCode(claim) + '. Trạng thái: ' + CCQ_RESULT + '.', 'success');
}

// Thay popup Chuyển CQGQBT cũ (quan_ly_boi_thuong.html) bằng popup 02 bước
window.openGqTransferModal = function (claimId) { ccqOpen(claimId); };
