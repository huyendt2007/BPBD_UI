/*
 * Popup Trình duyệt Hoãn giải quyết bồi thường (prefix hgq, Mẫu số 22/BTNN) và
 * Popup Trình duyệt Tạm đình chỉ giải quyết bồi thường (prefix hgqt, chưa có mẫu văn bản: chỉ Tải lên từ máy) - Giải quyết yêu cầu bồi thường
 * Bố cục giống Popup Đình chỉ giải quyết (quan_ly_boi_thuong_dcgq.js) / Không thụ lý:
 * - Bước 1 (Form): Hình thức ký (Ký số trên hệ thống | Ký ngoài (Ban hành trực tiếp)), thông tin hoãn / tạm đình chỉ, Tệp văn bản trình ký, Tài liệu kèm theo (chỉ Ký số)
 *   -> nút Tiếp tục (Ký số) -> Bước 2 Trình duyệt: Kéo ô ký & chọn Lãnh đạo từng cấp, Nội dung trình -> Trình Lãnh đạo
 * - Trình: vụ việc "Chờ duyệt", Loại trình "Hoãn giải quyết bồi thường" / "Tạm đình chỉ giải quyết bồi thường";
 *   cấp cuối Ký duyệt -> "Hoãn giải quyết" / "Tạm đình chỉ"; Từ chối -> "Bị từ chối" (Cập nhật -> mở lại popup, điền lại dữ liệu lần trình trước)
 * - Ký ngoài: tải PDF đã ký -> xác nhận -> ban hành trực tiếp
 * - Chỉ áp dụng nhánh Giải quyết bồi thường thiệt hại (tiền); nhánh Phục hồi danh dự (phddStatus) giữ nguyên
 * Dùng tiện ích sẵn có của quan_ly_boi_thuong.html (gqW, gqClaim, gqRecord, gqSubmit, gqSign*, ktlx*, tlktGqRestore, tlktGqExtra) và dcgqHeadTitle (quan_ly_boi_thuong_dcgq.js).
 */
var HGQ_CFG = {
    hgq: {
        kind: 'Hoãn giải quyết bồi thường', result: 'Hoãn giải quyết', form: 'Mẫu số 22/BTNN', gen: true,
        title: 'TRÌNH DUYỆT HOÃN GIẢI QUYẾT BỒI THƯỜNG', icon: 'fa-circle-pause', iconBg: '#fef3c7', iconColor: '#b45309',
        infoTitle: 'Thông tin hoãn giải quyết', docTitle: 'Quyết định hoãn giải quyết bồi thường', base: 'Mau_22_BTNN_Quyet_dinh_hoan_',
        content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định hoãn giải quyết bồi thường.',
        sla: 'Tạm dừng tính thời hạn xử lý do phát sinh hoãn giải quyết'
    },
    hgqt: {
        kind: 'Tạm đình chỉ giải quyết bồi thường', result: 'Tạm đình chỉ', form: '', gen: false,
        title: 'TRÌNH DUYỆT TẠM ĐÌNH CHỈ GIẢI QUYẾT BỒI THƯỜNG', icon: 'fa-hand', iconBg: '#ffedd5', iconColor: '#c2410c',
        infoTitle: 'Thông tin tạm đình chỉ', docTitle: 'Quyết định tạm đình chỉ giải quyết bồi thường', base: 'Quyet_dinh_tam_dinh_chi_',
        content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định tạm đình chỉ giải quyết bồi thường.',
        sla: 'Tạm dừng tính thời hạn xử lý do tạm đình chỉ'
    }
};
var HGQ_NOI_NHAN_DEFAULT = '- Như Điều 4;\n- ......\n- Lưu: VT, HSVV.';
var HGQ_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
// Trạng thái được Hoãn / Tạm đình chỉ (theo cột Thao tác khác)
var HGQ_SOURCE = ['Yêu cầu bổ sung', 'Cử người giải quyết bồi thường', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ'];
var hgqS = { hgq: { claim: null, docSrc: 'gen', online: null, offline: null }, hgqt: { claim: null, docSrc: 'upload', online: null, offline: null } };

function hgqEl(id) { return document.getElementById(id); }
function hgqIsOffline(p) { var r = hgqEl(p + 'SigningMethodOffline'); return !!(r && r.checked); }
function hgqClearErr(id) { var el = hgqEl(id); if (el) el.classList.remove('is-invalid'); var er = hgqEl(id + 'Err'); if (er) er.style.display = 'none'; }
function hgqSetErr(id, msg) { var el = hgqEl(id); if (el) el.classList.add('is-invalid'); var er = hgqEl(id + 'Err'); if (er) { er.textContent = msg || 'Đây là trường bắt buộc'; er.style.display = 'block'; } return el; }
// Luôn đánh dấu ô lỗi (kể cả khi đã có ô lỗi trước), trả về ô lỗi đầu tiên
function hgqFirst(first, id, msg) { var el = hgqSetErr(id, msg); return first || el; }
function hgqToday() { var d = new Date(); var p2 = function (n) { return String(n).padStart(2, '0'); }; return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear(); }
function hgqParse(s) { var m = String(s || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); if (!m) return null; var d = new Date(+m[3], +m[2] - 1, +m[1]); return d.getDate() === +m[1] && d.getMonth() === +m[2] - 1 ? d : null; }
// Thời hạn hoãn (ngày) = số ngày từ Từ ngày đến Đến ngày, tính cả ngày đầu và ngày cuối
function hgqDays(from, to) { var a = hgqParse(from), b = hgqParse(to); if (!a || !b || b < a) return ''; return Math.round((b - a) / 86400000) + 1; }
function hgqAutoGrow(t) { if (!t) return; t.style.height = 'auto'; t.style.height = (t.scrollHeight + 2) + 'px'; }
function hgqVvCode(claim) { return (typeof claimVvCode === 'function' && claimVvCode(claim)) || claim.code; }

// ---------- Văn bản Mẫu 22/BTNN ----------
function hgqDocBaseName(p, claim) { return HGQ_CFG[p].base + hgqVvCode(claim); }
function hgqBuildMau22(claim, x) {
    var p = gqDocParts(claim);
    var P = 'margin:6pt 0; text-align:justify; text-indent:1cm;';
    var nyc = gqE(getClaimRequesterName(claim) || '........');
    var dots = '……';
    var reason = String(x.reason || '').trim().replace(/[.;,]+$/, '');
    var nn = String(x.noiNhan || '').split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (!nn.length) nn = HGQ_NOI_NHAN_DEFAULT.split('\n');
    var head = typeof dcgqHeadTitle === 'function' ? dcgqHeadTitle(p.issuer) : 'THỦ TRƯỞNG ' + String(p.issuer || '').toUpperCase();
    return p.W.docHeaderHtml(p.unitId, HGQ_CFG.hgq.form, 'QĐ', { soKyHieu: x.docNumber, ngay: x.docDate })
        + '<p style="text-align:center; margin:18pt 0 6pt;"><b>QUYẾT ĐỊNH</b><br><b>Hoãn giải quyết bồi thường</b></p>'
        + '<p style="text-align:center; margin:6pt 0 12pt;"><b>' + gqE(head) + '</b></p>'
        + '<p style="' + P + '">Căn cứ Điều 49 Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16);</p>'
        + '<p style="' + P + '">Xét đề nghị hoãn giải quyết yêu cầu bồi thường của Ông/Bà ' + nyc + ' ngày…/…/….,</p>'
        + '<p style="text-align:center; margin:10pt 0;"><b>QUYẾT ĐỊNH:</b></p>'
        + '<p style="' + P + '"><b>Điều 1.</b> Hoãn giải quyết yêu cầu bồi thường của Ông/Bà ' + nyc + ' vì ' + (reason ? gqE(reason) : dots) + '.</p>'
        + '<p style="' + P + '"><b>Điều 2.</b> Thời hạn hoãn là ' + (x.days !== '' && x.days != null ? gqE(String(x.days)) : dots) + ' ngày, từ ngày ' + gqE(x.fromDate || '…./…./…..') + ' đến ngày ' + gqE(x.toDate || '…./…./…..') + '.</p>'
        + '<p style="' + P + '"><b>Điều 3.</b> Quyết định này có hiệu lực kể từ ngày ký.</p>'
        + '<p style="' + P + '"><b>Điều 4.</b> Ông/Bà ' + nyc + ' và cơ quan, tổ chức, cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này./.</p>'
        + '<table style="width:100%; border-collapse:collapse; margin-top:18pt;"><tr>'
        + '<td style="width:50%; vertical-align:top; font-size:12pt;"><b><i>Nơi nhận:</i></b><br>' + nn.map(gqE).join('<br>') + '</td>'
        + '<td style="text-align:center; vertical-align:top;"><b>THỦ TRƯỞNG CƠ QUAN</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i></td></tr></table>';
}
function hgqFormData(p) {
    if (p === 'hgqt') return { reason: hgqEl('hgqtReason').value.trim(), date: hgqEl('hgqtDate').value.trim() };
    var from = hgqEl('hgqFromDate').value.trim(), to = hgqEl('hgqToDate').value.trim();
    return {
        reason: hgqEl('hgqReason').value.trim(), fromDate: from, toDate: to, days: hgqDays(from, to),
        docNumber: hgqEl('hgqDocNumber').value.trim(), docDate: hgqEl('hgqDocDate').value.trim(), noiNhan: hgqEl('hgqNoiNhan').value
    };
}
function hgqBuildDoc() { var c = hgqS.hgq.claim; return c ? { html: hgqBuildMau22(c, hgqFormData('hgq')), base: hgqDocBaseName('hgq', c) } : null; }

// ---------- Giao diện ----------
function hgqField(id, label, req, ctrl) { return '<div class="gqx-field"><label class="form-label" for="' + id + '">' + label + (req ? '<span class="gqx-req">*</span>' : '') + '</label>' + ctrl + '<div id="' + id + 'Err" class="gqx-err">Đây là trường bắt buộc</div></div>'; }
function hgqDateCtrl(id, onchange) { return '<div class="gqx-date"><input type="text" id="' + id + '" class="form-control" placeholder="dd/mm/yyyy" onchange="' + onchange + '" oninput="' + onchange + '"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById(\'' + id + '\'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i></div>'; }
function hgqEnsureModal(p) {
    if (hgqEl('modal' + p)) return;
    var cfg = HGQ_CFG[p];
    var card = function (val, title, desc, ico, off) {
        var rid = p + 'SigningMethod' + (off ? 'Offline' : 'Online');
        return '<label class="sign-card' + (off ? '' : ' active') + '" id="' + p + 'CardSign' + (off ? 'Offline' : 'Online') + '" for="' + rid + '">'
            + '<input type="radio" name="' + p + 'SigningMethod" id="' + rid + '" value="' + val + '"' + (off ? '' : ' checked') + ' onchange="hgqToggleSigningMethod(\'' + p + '\', \'' + val + '\')">'
            + '<div class="sign-card-content"><div class="sign-card-icon' + (off ? ' offline' : '') + '"><i class="fa-solid ' + ico + '"></i></div><div class="sign-card-text"><div class="sign-card-title">' + title + '</div><div class="sign-card-desc">' + desc + '</div></div></div>'
            + '<div class="sign-card-check"><i class="' + (off ? 'fa-regular fa-circle' : 'fa-solid fa-circle-check') + '"></i></div></label>';
    };
    var info;
    if (p === 'hgq') {
        info = hgqField('hgqReason', 'Lý do hoãn giải quyết', true, '<textarea id="hgqReason" class="form-control" rows="3" maxlength="2000" placeholder="Nhập lý do hoãn giải quyết..." oninput="hgqClearErr(\'hgqReason\'); document.getElementById(\'hgqReasonCount\').textContent=this.value.length+\'/2000 ký tự\';"></textarea><div id="hgqReasonCount" class="ktlx-counter">0/2000 ký tự</div>')
            + '<div class="gqx-grid2">' + hgqField('hgqFromDate', 'Từ ngày', true, hgqDateCtrl('hgqFromDate', 'hgqCalcDays()')) + hgqField('hgqToDate', 'Đến ngày', true, hgqDateCtrl('hgqToDate', 'hgqCalcDays()')) + '</div>'
            + '<div class="gqx-field" style="margin-bottom:0;"><label class="form-label" for="hgqDays">Thời hạn hoãn (ngày)</label><input type="text" id="hgqDays" class="form-control" readonly style="background:#f1f5f9;" placeholder="Hệ thống tự tính từ Từ ngày đến Đến ngày"></div>';
    } else {
        info = hgqField('hgqtReason', 'Lý do tạm đình chỉ', true, '<textarea id="hgqtReason" class="form-control" rows="3" maxlength="2000" placeholder="Nhập lý do tạm đình chỉ..." oninput="hgqClearErr(\'hgqtReason\'); document.getElementById(\'hgqtReasonCount\').textContent=this.value.length+\'/2000 ký tự\';"></textarea><div id="hgqtReasonCount" class="ktlx-counter">0/2000 ký tự</div>')
            + '<div class="gqx-grid2" style="margin-bottom:0;">' + hgqField('hgqtDate', 'Ngày tạm đình chỉ', true, hgqDateCtrl('hgqtDate', 'hgqClearErr(\'hgqtDate\')')) + '<div></div></div>';
    }
    var src = cfg.gen
        ? '<div id="' + p + 'DocSrcGroup"><div class="doc-src-segmented"><button type="button" class="doc-src-seg-btn active" id="' + p + 'SegBtnGen" onclick="hgqSetDocSrc(\'' + p + '\', \'gen\')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 22/BTNN</span></button><button type="button" class="doc-src-seg-btn" id="' + p + 'SegBtnUpload" onclick="hgqSetDocSrc(\'' + p + '\', \'upload\')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button></div></div>'
            + '<div id="hgqDocMetaGroup" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:12px;"><div style="font-size:12px; font-weight:700; color:#334155; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:10px; display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu 22/BTNN</div>'
            + '<div class="gqx-grid2" style="margin-bottom:10px;">' + hgqField('hgqDocNumber', 'Số, ký hiệu văn bản', true, '<input type="text" id="hgqDocNumber" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="hgqClearErr(\'hgqDocNumber\')">')
            + hgqField('hgqDocDate', 'Ngày văn bản', true, hgqDateCtrl('hgqDocDate', 'hgqClearErr(\'hgqDocDate\')')) + '</div>'
            + '<div class="gqx-field" style="margin-bottom:0;"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;"><label class="form-label" for="hgqNoiNhan" style="margin-bottom:0;">Nơi nhận</label><span style="font-size:11.5px; color:#64748b;"><i class="fa-solid fa-circle-info"></i> Mỗi nơi nhận trên 01 dòng</span></div><textarea id="hgqNoiNhan" class="form-control" rows="3" style="font-size:12.5px; line-height:1.5; resize:none; overflow:hidden;" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng..." oninput="hgqAutoGrow(this)"></textarea></div></div>'
        : '';
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modal' + p + '" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div id="' + p + 'Container" class="sticky-modal-container" style="background:#fff; width:850px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3);">'
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:' + cfg.iconBg + '; color:' + cfg.iconColor + '; font-size:14px;"><i class="fa-solid ' + cfg.icon + '"></i></span><span id="' + p + 'Title">' + cfg.title + '</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Hồ sơ: <strong id="' + p + 'ClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người yêu cầu: <span id="' + p + 'ClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="' + p + 'ClaimAgency" style="font-weight:500; color:#475569;">--</span></div>'
        + '</div><button type="button" onclick="closeHgqModal(\'' + p + '\')" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        + '<div id="' + p + 'StepperBar" class="ktl-stepper-fullwidth"><div id="' + p + 'Step1Tab" class="ktl-step-tab active" onclick="hgqGoStep1(\'' + p + '\')"><span class="ktl-step-badge" id="' + p + 'Step1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>'
        + '<div class="ktl-stepper-sep"><i class="fa-solid fa-chevron-right"></i></div><div id="' + p + 'Step2Tab" class="ktl-step-tab" onclick="hgqGoStep2(\'' + p + '\')"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
        + '<div id="' + p + 'Step1Body" class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div id="' + p + 'ReturnedAlertBlock" style="display:none; background:#fef2f2; border:1px solid #fecaca; border-left:4px solid #dc2626; border-radius:8px; padding:12px 16px; margin-bottom:14px;"><div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b91c1c; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> HỒ SƠ BỊ LÃNH ĐẠO TRẢ VỀ YÊU CẦU CHỈNH SỬA</div><div style="font-size:12.5px; color:#7f1d1d; line-height:1.5;">Lý do trả về: <strong id="' + p + 'ReturnedReason">--</strong><br>Người trả về: <span id="' + p + 'ReturnedOfficer">--</span> • Thời điểm: <span id="' + p + 'ReturnedDate">--</span></div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
        + card('online', 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', 'fa-file-signature', false)
        + card('offline', 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', 'fa-stamp', true)
        + '</div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid ' + cfg.icon + '"></i> ' + cfg.infoTitle + '</div>' + info + '</div>'
        + '<div class="gqx-sec" id="' + p + 'DocSection"><div class="gqx-sec-title" id="' + p + 'DocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>'
        + src
        + '<div id="' + p + 'OnlineSection"><input type="file" id="' + p + 'OnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="hgqOnlineUpload(\'' + p + '\', this)"><div id="' + p + 'DocFileBox"></div><div id="' + p + 'DocFileError" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div id="' + p + 'OfflineSection" style="display:none;"><input type="file" id="' + p + 'OfflineFileInput" accept=".pdf" style="display:none;" onchange="hgqOfflineUpload(\'' + p + '\', this)">'
        + '<div id="' + p + 'OfflineDrop" class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'' + p + 'OfflineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="hgqDrop(\'' + p + '\', event, true)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a></div><div class="ktlx-drop-sub">(Chỉ chấp nhận .pdf, tối đa 50MB)</div></div>'
        + '<div id="' + p + 'OfflineFileRow" style="display:none;"></div><div id="' + p + 'OfflineFileErr" class="gqx-err">' + HGQ_OFF_MSG + '</div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và vụ việc chuyển sang trạng thái <strong>' + cfg.result + '</strong>.</div></div>'
        + '</div>'
        + '<div id="' + p + 'Tlkt"></div>'
        + '</div>'
        + '<div id="' + p + 'Step2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative;">'
        + '<div style="flex:1; overflow-y:auto; overflow-x:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;"><div id="' + p + 'A4Page" class="a4-document-page"><div id="' + p + 'A4Content"></div></div></div>'
        + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; box-shadow:-4px 0 15px rgba(0,0,0,0.05); z-index:20;">'
        + '<div><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div><div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>'
        + '<div id="' + p + 'SignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>'
        + '<div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>'
        + '<div class="form-group" style="margin-bottom:0;"><label class="form-label" for="' + p + 'SignContent" style="font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block;">Nội dung trình <span style="color:#dc2626;">*</span></label><textarea id="' + p + 'SignContent" class="form-control" rows="4" style="font-size:13px;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="this.classList.remove(\'is-invalid\'); var e=document.getElementById(\'' + p + 'SignContentErr\'); if(e) e.style.display=\'none\';"></textarea><div id="' + p + 'SignContentErr" class="error-message" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</div></div>'
        + '</div></div>'
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;"><div style="display:flex; gap:10px; margin-left:auto;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeHgqModal(\'' + p + '\')">Hủy bỏ</button>'
        + '<button id="' + p + 'BtnSubmitOffline" type="button" class="btn btn-primary" onclick="hgqSubmitOffline(\'' + p + '\')" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
        + '<button id="' + p + 'BtnNextStep" type="button" class="btn btn-primary" onclick="hgqGoStep2(\'' + p + '\')" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>'
        + '<button id="' + p + 'BtnBackStep1" type="button" class="btn btn-secondary" onclick="hgqGoStep1(\'' + p + '\')" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
        + '<button id="' + p + 'BtnSubmitOnline" type="button" class="btn btn-primary" onclick="hgqSubmitOnline(\'' + p + '\')" style="display:none; background:#16a34a; border-color:#16a34a; box-shadow:0 2px 6px rgba(22,163,74,0.3); font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>'
        + '</div></div></div></div>';
    document.body.appendChild(wrap.firstChild);
}
function hgqCalcDays() {
    hgqClearErr('hgqFromDate'); hgqClearErr('hgqToDate');
    var n = hgqDays(hgqEl('hgqFromDate').value, hgqEl('hgqToDate').value);
    hgqEl('hgqDays').value = n === '' ? '' : String(n);
}
function hgqFlat(id, def, cb) {
    var el = hgqEl(id);
    if (typeof flatpickr === 'undefined' || !el) return;
    if (el._flatpickr) el._flatpickr.destroy();
    flatpickr(el, { dateFormat: 'd/m/Y', allowInput: true, defaultDate: def || null, onChange: cb });
}

// ---------- Mở / đóng ----------
// Mở từ Thao tác khác "Hoãn giải quyết" / "Tạm đình chỉ" hoặc "Cập nhật" hồ sơ Bị từ chối có Loại trình tương ứng
function openHgqModal(claimId) { hgqOpen('hgq', claimId); }
function openHgqtModal(claimId) { hgqOpen('hgqt', claimId); }
function hgqOpen(p, claimId) {
    var claim = gqClaim(claimId);
    if (!claim) return;
    var cfg = HGQ_CFG[p];
    var W = gqW();
    var rec = gqRecord(claim);
    var prev = rec && rec.status === 'Bị từ chối' && rec.approval && rec.approval.kind === cfg.kind ? rec.approval : null;
    var st = typeof gqldCaseStatus === 'function' ? gqldCaseStatus(claim) : claim.status;
    if (!prev && HGQ_SOURCE.indexOf(st) < 0) { showToast('Trạng thái hồ sơ hiện tại không cho phép ' + (p === 'hgq' ? 'Hoãn giải quyết' : 'Tạm đình chỉ') + '.', 'error'); return; }
    hgqEnsureModal(p);
    gqFrameFull(true);
    var S = hgqS[p];
    S.claim = claim; S.online = null; S.offline = null;
    var sd = (prev && prev.signDoc) || {};
    var ret = prev ? (rec.returned || {}) : null;
    hgqEl(p + 'ReturnedAlertBlock').style.display = prev ? 'block' : 'none';
    if (prev) {
        hgqEl(p + 'ReturnedReason').innerText = ret.reason || '--';
        hgqEl(p + 'ReturnedOfficer').innerText = (ret.by && W ? W.userName(ret.by) : '') || '--';
        hgqEl(p + 'ReturnedDate').innerText = ret.at || '--';
    }
    hgqEl(p + 'ClaimCode').innerText = hgqVvCode(claim) || '--';
    hgqEl(p + 'ClaimNYC').innerText = getClaimRequesterName(claim) || '--';
    hgqEl(p + 'ClaimAgency').innerText = claim.agency || '--';
    var today = hgqToday();
    if (p === 'hgq') {
        hgqEl('hgqReason').value = sd.reason || '';
        hgqEl('hgqReasonCount').textContent = hgqEl('hgqReason').value.length + '/2000 ký tự';
        hgqEl('hgqFromDate').value = sd.fromDate || today;
        hgqEl('hgqToDate').value = sd.toDate || '';
        hgqFlat('hgqFromDate', hgqEl('hgqFromDate').value, hgqCalcDays);
        hgqFlat('hgqToDate', hgqEl('hgqToDate').value, hgqCalcDays);
        hgqEl('hgqDocNumber').value = '     /QĐ-';
        hgqEl('hgqDocDate').value = today;
        hgqFlat('hgqDocDate', today, function () { hgqClearErr('hgqDocDate'); });
        hgqEl('hgqNoiNhan').value = sd.noiNhan && sd.noiNhan.length ? sd.noiNhan.join('\n') : HGQ_NOI_NHAN_DEFAULT;
        ['hgqReason', 'hgqFromDate', 'hgqToDate', 'hgqDocNumber', 'hgqDocDate'].forEach(hgqClearErr);
        hgqCalcDays();
    } else {
        hgqEl('hgqtReason').value = sd.reason || '';
        hgqEl('hgqtReasonCount').textContent = hgqEl('hgqtReason').value.length + '/2000 ký tự';
        hgqEl('hgqtDate').value = sd.date || today;
        hgqFlat('hgqtDate', hgqEl('hgqtDate').value, function () { hgqClearErr('hgqtDate'); });
        ['hgqtReason', 'hgqtDate'].forEach(hgqClearErr);
    }
    hgqEl(p + 'SignContent').value = cfg.content;
    gqSignInit(p, claim, prev && Array.isArray(prev.assignees) ? prev.assignees : null);
    hgqOfflineRemove(p);
    hgqSetDocSrc(p, cfg.gen ? 'gen' : 'upload');
    tlktGqRestore(p, prev, {
        required: false,
        setSrc: function (s) { if (cfg.gen) hgqSetDocSrc(p, s); },
        setFile: function (f) { S.online = f; hgqRenderDocBox(p); },
        fields: p === 'hgq' ? [['hgqDocNumber', 'docNumber'], ['hgqDocDate', 'docDate']] : []
    });
    hgqEl(p + 'SigningMethodOnline').checked = true;
    hgqToggleSigningMethod(p, 'online');
    hgqGoStep1(p);
    var modal = hgqEl('modal' + p);
    modal.style.display = 'flex'; modal.classList.add('active'); modal.classList.add('visible');
    if (p === 'hgq') hgqAutoGrow(hgqEl('hgqNoiNhan'));
}
function closeHgqModal(p) {
    gqFrameFull(false);
    ktlxCancelConvert(p);
    var modal = hgqEl('modal' + p);
    if (modal) { modal.style.display = 'none'; modal.classList.remove('active'); modal.classList.remove('visible'); }
    hgqS[p].claim = null;
}
function hgqSetDocSrc(p, src) {
    var S = hgqS[p];
    S.docSrc = HGQ_CFG[p].gen && src !== 'upload' ? 'gen' : 'upload';
    var isGen = S.docSrc === 'gen';
    if (HGQ_CFG[p].gen) { hgqEl(p + 'SegBtnGen').classList.toggle('active', isGen); hgqEl(p + 'SegBtnUpload').classList.toggle('active', !isGen); }
    S.online = null;
    ktlxCancelConvert(p);
    var fe = hgqEl(p + 'DocFileError'); fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    hgqApplyDocMeta(p);
    hgqRenderDocBox(p);
}
function hgqApplyDocMeta(p) {
    var g = hgqEl('hgqDocMetaGroup');
    if (p === 'hgq' && g) { g.style.display = (!hgqIsOffline('hgq') && hgqS.hgq.docSrc === 'gen') ? '' : 'none'; hgqAutoGrow(hgqEl('hgqNoiNhan')); }
}
function hgqToggleSigningMethod(p, method) {
    var isOnline = method === 'online';
    [[p + 'CardSignOnline', isOnline], [p + 'CardSignOffline', !isOnline]].forEach(function (x) {
        var c = hgqEl(x[0]); c.classList.toggle('active', x[1]);
        var ico = c.querySelector('.sign-card-check i'); if (ico) ico.className = x[1] ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    hgqApplyDocMeta(p);
    if (!isOnline && p === 'hgq') ['hgqDocNumber', 'hgqDocDate'].forEach(hgqClearErr);
    var bar = hgqEl(p + 'StepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !isOnline); bar.setAttribute('aria-hidden', isOnline ? 'false' : 'true');
    var show = function (id, on, disp) { var el = hgqEl(id); if (el) el.style.display = on ? (disp || 'block') : 'none'; };
    show(p + 'DocSrcGroup', isOnline);
    show(p + 'OnlineSection', isOnline);
    show(p + 'OfflineSection', !isOnline);
    show(p + 'BtnSubmitOffline', !isOnline, 'inline-flex');
    show(p + 'BtnNextStep', isOnline, 'inline-flex');
    if (typeof tlktShow === 'function') tlktShow(p, isOnline);
    hgqEl(p + 'DocSectionTitle').innerHTML = isOnline ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
}
function hgqRenderDocBox(p) {
    var box = hgqEl(p + 'DocFileBox'); if (!box) return;
    var S = hgqS[p];
    if (S.docSrc === 'gen') {
        box.innerHTML = '<div class="gqx-file-empty"><div class="gqx-file-hint"><i class="fa-solid fa-file-circle-check" style="color:#2563eb; font-size:16px; margin-right:6px;"></i>Hệ thống tự động sinh Quyết định theo Mẫu 22/BTNN từ thông tin đang nhập.</div><div class="gqx-file-actions"><button type="button" class="btn-preview-doc" onclick="hgqPreview()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div></div>';
        return;
    }
    if (ktlxConverting[p]) { box.innerHTML = '<div class="ktlx-converting"><span class="ktlx-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    var f = S.online;
    box.innerHTML = !f
        ? '<div class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'' + p + 'OnlineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="hgqDrop(\'' + p + '\', event, false)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a></div><div class="ktlx-drop-sub">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)</div></div>'
        : ktlxFileCardHtml(f.name, f.size, f.note, 'hgqOnlineView(\'' + p + '\')', 'hgqOnlineRemove(\'' + p + '\')');
}
function hgqDrop(p, e, offline) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    var fs = e.dataTransfer && e.dataTransfer.files;
    if (fs && fs.length) (offline ? hgqOfflineUpload : hgqOnlineUpload)(p, { files: [fs[0]], value: '' });
}
// Kiểm tra trường bắt buộc của thông tin hoãn / tạm đình chỉ; trả về ô lỗi đầu tiên
function hgqValidateInfo(p) {
    var first = null;
    if (p === 'hgqt') {
        if (!hgqEl('hgqtReason').value.trim()) first = hgqSetErr('hgqtReason'); else hgqClearErr('hgqtReason');
        var d = hgqEl('hgqtDate').value.trim();
        if (!d) first = hgqFirst(first,'hgqtDate');
        else if (!hgqParse(d)) first = hgqFirst(first,'hgqtDate', 'Ngày không hợp lệ (dd/mm/yyyy)');
        else hgqClearErr('hgqtDate');
        return first;
    }
    if (!hgqEl('hgqReason').value.trim()) first = hgqSetErr('hgqReason'); else hgqClearErr('hgqReason');
    var f = hgqEl('hgqFromDate').value.trim(), t = hgqEl('hgqToDate').value.trim();
    if (!f) first = hgqFirst(first,'hgqFromDate');
    else if (!hgqParse(f)) first = hgqFirst(first,'hgqFromDate', 'Ngày không hợp lệ (dd/mm/yyyy)');
    else hgqClearErr('hgqFromDate');
    if (!t) first = hgqFirst(first,'hgqToDate');
    else if (!hgqParse(t)) first = hgqFirst(first,'hgqToDate', 'Ngày không hợp lệ (dd/mm/yyyy)');
    else if (hgqParse(f) && hgqParse(t) < hgqParse(f)) first = hgqFirst(first,'hgqToDate', 'Đến ngày phải lớn hơn hoặc bằng Từ ngày');
    else hgqClearErr('hgqToDate');
    return first;
}
function hgqValidateStep1(p) {
    var first = hgqValidateInfo(p);
    if (p === 'hgq' && hgqS.hgq.docSrc === 'gen') {
        var no = hgqEl('hgqDocNumber').value.trim(), dt = hgqEl('hgqDocDate').value.trim();
        if (!no) first = hgqFirst(first,'hgqDocNumber'); else hgqClearErr('hgqDocNumber');
        if (!dt) first = hgqFirst(first,'hgqDocDate');
        else if (!hgqParse(dt)) first = hgqFirst(first,'hgqDocDate', 'Ngày văn bản không hợp lệ (dd/mm/yyyy)');
        else hgqClearErr('hgqDocDate');
    }
    return first;
}
function hgqPreview() {
    var bad = hgqValidateStep1('hgq');
    if (bad) { bad.focus(); return; }
    var doc = hgqBuildDoc();
    if (doc) gqW().openDocTab(doc.html, doc.base);
}
function hgqOnlineUpload(p, input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var S = hgqS[p];
    var fe = hgqEl(p + 'DocFileError');
    var msg = ktlxCheckFile(file, ['.pdf', '.doc', '.docx']);
    if (msg) { fe.textContent = msg; fe.style.display = 'block'; showToast(msg, 'error'); return; }
    fe.textContent = 'Đây là trường bắt buộc'; fe.style.display = 'none';
    var size = ktlxFmtSize(file.size);
    if (/\.docx?$/i.test(file.name)) {
        S.online = null; ktlxConverting[p] = true; ktlxSetNextBusy(p, true); hgqRenderDocBox(p);
        var token = (ktlxConverting[p + 'Token'] = (ktlxConverting[p + 'Token'] || 0) + 1);
        setTimeout(function () {
            if (ktlxConverting[p + 'Token'] !== token || !ktlxConverting[p]) return;
            ktlxConverting[p] = false; ktlxSetNextBusy(p, false);
            S.online = { name: file.name.replace(/\.docx?$/i, '.pdf'), size: size, source: 'uploaded', raw: file, note: 'Đã chuyển đổi từ ' + file.name };
            hgqRenderDocBox(p);
        }, 1200);
        return;
    }
    S.online = { name: file.name, size: size, source: 'uploaded', raw: file };
    hgqRenderDocBox(p);
}
function hgqOnlineView(p) { var f = hgqS[p].online; if (!f) return; if (f.source === 'generated') gqW().openDocTab(f.bodyHtml, f.base); else gqOpenUploadedFile(f); }
function hgqOnlineRemove(p) { hgqS[p].online = null; ktlxCancelConvert(p); hgqRenderDocBox(p); }
function hgqOfflineUpload(p, input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var err = hgqEl(p + 'OfflineFileErr'), drop = hgqEl(p + 'OfflineDrop');
    var msg = ktlxCheckFile(file, ['.pdf']);
    if (msg) { err.textContent = msg; err.style.display = 'block'; drop.classList.add('is-error'); showToast(msg, 'error'); return; }
    hgqS[p].offline = { name: file.name, size: ktlxFmtSize(file.size), raw: file };
    var row = hgqEl(p + 'OfflineFileRow');
    row.innerHTML = ktlxFileCardHtml(file.name, hgqS[p].offline.size, '', 'gqOpenUploadedFile(hgqS.' + p + '.offline)', 'hgqOfflineRemove(\'' + p + '\')');
    row.style.display = 'block';
    drop.style.display = 'none'; drop.classList.remove('is-error');
    err.textContent = HGQ_OFF_MSG; err.style.display = 'none';
}
function hgqOfflineRemove(p) {
    hgqS[p].offline = null;
    var row = hgqEl(p + 'OfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    var drop = hgqEl(p + 'OfflineDrop'); if (drop) { drop.style.display = ''; drop.classList.remove('is-error'); }
    var err = hgqEl(p + 'OfflineFileErr'); if (err) { err.textContent = HGQ_OFF_MSG; err.style.display = 'none'; }
}

// ---------- Bước ----------
function hgqGoStep1(p) {
    var c = hgqEl(p + 'Container'); c.style.width = '850px'; c.style.maxWidth = '96%'; c.style.height = 'auto';
    hgqEl(p + 'Step1Tab').className = 'ktl-step-tab active';
    hgqEl(p + 'Step1Badge').innerHTML = '1';
    hgqEl(p + 'Step2Tab').className = 'ktl-step-tab';
    hgqEl(p + 'Step1Body').style.display = 'block';
    hgqEl(p + 'Step2Body').style.display = 'none';
    var off = hgqIsOffline(p);
    hgqEl(p + 'BtnNextStep').style.display = off ? 'none' : 'inline-flex';
    hgqEl(p + 'BtnSubmitOffline').style.display = off ? 'inline-flex' : 'none';
    hgqEl(p + 'BtnBackStep1').style.display = 'none';
    hgqEl(p + 'BtnSubmitOnline').style.display = 'none';
    if (p === 'hgq') hgqAutoGrow(hgqEl('hgqNoiNhan'));
}
// Tiếp tục: kiểm tra Bước 1 -> Bước 2 Trình duyệt (Kéo ô ký & chọn Lãnh đạo)
function hgqGoStep2(p) {
    var S = hgqS[p], cfg = HGQ_CFG[p];
    if (!S.claim || hgqIsOffline(p)) return;
    if (ktlxConverting[p]) { showToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    var first = hgqValidateStep1(p);
    if (S.docSrc !== 'gen' && !S.online) { hgqEl(p + 'DocFileError').style.display = 'block'; first = first || hgqEl(p + 'DocFileBox'); }
    var okT = typeof tlktValidate !== 'function' || tlktValidate(p);
    if (first || !okT) {
        if (first && first.focus) first.focus();
        showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'warning');
        return;
    }
    var content = hgqEl(p + 'A4Content');
    if (S.docSrc === 'gen') {
        var doc = hgqBuildDoc();
        S.online = { name: doc.base + '.doc', size: Math.max(1, Math.round(doc.html.length / 1024)) + ' KB', source: 'generated', base: doc.base, bodyHtml: doc.html };
        content.innerHTML = doc.html;
    } else {
        content.innerHTML = '<div style="text-align:center; padding-top:320px; color:#475569;"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#94a3b8;"></i><div style="margin-top:12px; font-weight:700;">' + gqE(S.online.name) + '</div><div style="font-size:12.5px;">Văn bản tải lên từ máy - ' + gqE(cfg.docTitle) + '</div></div>';
    }
    var c = hgqEl(p + 'Container'); c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh';
    hgqEl(p + 'Step1Tab').className = 'ktl-step-tab completed';
    hgqEl(p + 'Step1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    hgqEl(p + 'Step2Tab').className = 'ktl-step-tab active';
    hgqEl(p + 'Step1Body').style.display = 'none';
    hgqEl(p + 'Step2Body').style.display = 'flex';
    hgqEl(p + 'BtnNextStep').style.display = 'none';
    hgqEl(p + 'BtnSubmitOffline').style.display = 'none';
    hgqEl(p + 'BtnBackStep1').style.display = 'inline-flex';
    hgqEl(p + 'BtnSubmitOnline').style.display = 'inline-flex';
    gqSignRefresh(p);
}

// ---------- Trình / Ban hành ----------
function hgqPrevStatus(claim) {
    var st = typeof gqldCaseStatus === 'function' ? gqldCaseStatus(claim) : claim.status;
    return HGQ_SOURCE.indexOf(st) >= 0 ? st : (claim.hgqPrevStatus || claim.specialStatusPreviousStatus || 'Xác minh thiệt hại');
}
function hgqReasonText(p, x) {
    return p === 'hgq' ? x.reason + ' (từ ngày ' + x.fromDate + ' đến ngày ' + x.toDate + ', ' + x.days + ' ngày)' : x.reason + ' (từ ngày ' + x.date + ')';
}
// Ký số: trình Lãnh đạo -> "Chờ duyệt"; cấp cuối Ký duyệt -> "Hoãn giải quyết" / "Tạm đình chỉ" (hgqOnApplied)
function hgqSubmitOnline(p) {
    var S = hgqS[p], cfg = HGQ_CFG[p];
    var claim = S.claim;
    if (!claim || !S.online) return;
    var sign = gqSignCollect(p);
    if (!sign) return;
    var x = hgqFormData(p);
    var gen = S.online.source === 'generated';
    var fileName = S.online.name;
    var prevSt = hgqPrevStatus(claim);
    var draftDoc = { source: gen ? 'generated' : 'uploaded', formNo: cfg.form, docTitle: cfg.docTitle, generatedName: gen ? fileName : '', uploadedName: gen ? '' : fileName, bodyHtml: gen ? S.online.bodyHtml : '' };
    var data = p === 'hgq'
        ? { reason: x.reason, fromDate: x.fromDate, toDate: x.toDate, days: x.days, docNumber: gen ? x.docNumber : '', docDate: gen ? x.docDate : '', noiNhan: gen ? String(x.noiNhan || '').split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean) : [] }
        : { reason: x.reason, date: x.date };
    var signDoc = Object.assign({ method: 'Ký số', file: gen ? hgqDocBaseName(p, claim) + '.pdf' : fileName, enableRoomSig: sign.enableNhay, sigCoords: sign.coords }, data, tlktGqExtra(p, S.online, S.docSrc, sign.content));
    var res = gqSubmit(claim, cfg.kind, sign.content, [], { assignee: sign.assignees[0] || '', assignees: sign.assignees, reason: hgqReasonText(p, x), resultStatus: cfg.result, draftDoc: draftDoc, signDoc: signDoc });
    if (!res || res.ok === false) { showToast(res ? res.message : 'Không trình được hồ sơ.', 'error'); return; }
    var patch = { hgqPrevStatus: prevSt };
    patch[p === 'hgq' ? 'hoanGiaiQuyet' : 'tamDinhChi'] = Object.assign({ fileName: fileName, formNo: cfg.form, signingMethod: 'Ký số', previousStatus: prevSt, submittedAt: gqNow() }, data);
    gqSaveData(claim, patch);
    closeHgqModal(p);
    gqAfterSubmit(claim, cfg.kind);
}
// Ghi nhận kết quả (Ký duyệt cấp cuối / Ban hành Ký ngoài): trạng thái trước để Tiếp tục giải quyết, lịch sử Hoãn / Tạm đình chỉ; nhánh Phục hồi danh dự giữ nguyên
function hgqApplyResult(claim, p, d, method, file) {
    var cfg = HGQ_CFG[p];
    var prevSt = (d && d.previousStatus) || claim.hgqPrevStatus || 'Xác minh thiệt hại';
    claim.specialStatusPreviousStatus = prevSt;
    claim.slaStatus = 'warning';
    claim.slaText = cfg.sla;
    if (!Array.isArray(claim.specialStatusLogs)) claim.specialStatusLogs = [];
    d = d || {};
    claim.specialStatusLogs.push({ type: cfg.result, docNo: d.docNumber || '', docDate: d.docDate || '', signMode: method, startDate: p === 'hgq' ? d.fromDate : d.date, endDate: p === 'hgq' ? d.toDate : '', previousStatus: prevSt, reason: d.reason || '', files: file ? [{ name: file, size: '', url: '#' }] : [], createdAt: gqToday() });
}
// Gọi từ gqApplyRecord khi vụ việc nhận trạng thái mới từ kho luồng
function hgqOnApplied(c, r, st) {
    var a = r && r.approval;
    if (!a) return;
    var p = a.kind === HGQ_CFG.hgq.kind ? 'hgq' : (a.kind === HGQ_CFG.hgqt.kind ? 'hgqt' : '');
    if (!p || st !== HGQ_CFG[p].result) return;
    var sd = a.signDoc || {};
    var d = Object.assign({}, sd, { previousStatus: c.hgqPrevStatus || a.prevStatus });
    hgqApplyResult(c, p, d, 'Ký số', sd.file || '');
}
// Ký ngoài: kiểm tra thông tin + tệp PDF đã ký -> popup xác nhận -> ban hành trực tiếp
function hgqSubmitOffline(p) {
    var S = hgqS[p], cfg = HGQ_CFG[p];
    if (!S.claim) return;
    var first = hgqValidateInfo(p);
    if (!S.offline) {
        var fErr = hgqEl(p + 'OfflineFileErr'); fErr.textContent = HGQ_OFF_MSG; fErr.style.display = 'block';
        var drop = hgqEl(p + 'OfflineDrop'); drop.classList.add('is-error'); first = first || drop;
    }
    if (first) { if (first.focus) first.focus(); return; }
    var overlay = hgqEl('customConfirmOverlay'), btnYes = hgqEl('customConfirmBtnYes'), btnNo = hgqEl('customConfirmBtnNo');
    var prevZ = overlay ? overlay.style.zIndex : '';
    var restore = function () { if (overlay) overlay.style.zIndex = prevZ; if (btnYes) btnYes.style.backgroundColor = ''; };
    showConfirmModal('Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Vụ việc sẽ chuyển sang trạng thái "' + cfg.result + '". Bạn có chắc chắn muốn ban hành văn bản?',
        function () { restore(); hgqIssueOffline(p); },
        { title: 'Xác nhận ban hành văn bản', btnYesText: 'Ban hành', btnYesClass: 'btn-success', btnNoText: 'Hủy bỏ' });
    if (overlay) overlay.style.zIndex = '10050';
    if (btnYes) btnYes.style.backgroundColor = '#16a34a';
    if (btnNo) btnNo.addEventListener('click', restore, { once: true });
}
function hgqIssueOffline(p) {
    var S = hgqS[p], cfg = HGQ_CFG[p];
    var claim = S.claim;
    if (!claim || !S.offline) return;
    var W = gqW();
    var x = hgqFormData(p);
    var file = S.offline.name;
    var prevSt = hgqPrevStatus(claim);
    var title = 'Ban hành ' + cfg.docTitle.charAt(0).toLowerCase() + cfg.docTitle.slice(1) + ' (Ký ngoài)';
    var data = p === 'hgq' ? { reason: x.reason, fromDate: x.fromDate, toDate: x.toDate, days: x.days } : { reason: x.reason, date: x.date };
    claim.status = cfg.result;
    claim.wfReturned = null;
    hgqApplyResult(claim, p, Object.assign({ previousStatus: prevSt }, data), 'Ký ngoài', file);
    if (!Array.isArray(claim.timeline)) claim.timeline = [];
    claim.timeline.push({ title: title, date: gqToday(), desc: cfg.docTitle + ' đã ký ngoài hệ thống (' + file + '). Lý do: ' + hgqReasonText(p, x) + '. Vụ việc chuyển từ [' + prevSt + '] sang trạng thái [' + cfg.result + '].', status: 'active' });
    try {
        var rec = gqEnsureRecord(claim) || gqRecord(claim);
        if (rec && W) { rec.status = cfg.result; W.addHistory(rec, title, 'Lý do: ' + hgqReasonText(p, x) + '. Văn bản đã ký: ' + file + '.'); W.upsertRecord(rec); }
    } catch (e) { /* mockup: bỏ qua lỗi luồng */ }
    var patch = { status: cfg.result, hgqPrevStatus: prevSt, specialStatusPreviousStatus: prevSt };
    patch[p === 'hgq' ? 'hoanGiaiQuyet' : 'tamDinhChi'] = Object.assign({ fileName: file, signedFile: file, formNo: cfg.form, signingMethod: 'Ký ngoài', previousStatus: prevSt, issuedAt: gqNow() }, data);
    gqSaveData(claim, patch);
    closeHgqModal(p);
    saveClaimsToLocal();
    renderClaimsTable();
    var detail = document.getElementById('caseDetailSection');
    if (detail && detail.style.display === 'block' && selectedClaimId === claim.id) showCaseDetail(claim.id, false);
    showToast('Đã ban hành ' + cfg.docTitle.charAt(0).toLowerCase() + cfg.docTitle.slice(1) + ' (Ký ngoài) cho vụ việc ' + claimVvLabel(claim) + '. Vụ việc chuyển sang trạng thái [' + cfg.result + '].', 'success');
}
