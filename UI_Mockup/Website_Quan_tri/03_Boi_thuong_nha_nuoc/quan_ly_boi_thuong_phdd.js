/*
 * Tab "Phục hồi danh dự" - màn Xem chi tiết / Cập nhật vụ việc Giải quyết YCBT (prefix phdx)
 * 1. Thanh tiến trình (Thông báo / Phản hồi / Thực hiện / Hoàn thành): bấm Step -> cuộn tới khối tương ứng, mở rộng khối nếu đang thu gọn, nhấn mạnh ngắn.
 *    Step chưa tới: không cuộn, thông báo "Chưa đến bước này."
 * 2. Các khối 1, 2, 3 (và khối Hoãn phục hồi danh dự) thu gọn / mở rộng như tab "Chi tiết giải quyết bồi thường":
 *    khối của bước hiện tại mở, khối bước đã qua thu gọn, khối bước chưa tới ẩn. "Lịch sử xử lý" thu gọn / mở rộng (mặc định thu gọn).
 * 3. Khối "Hoãn phục hồi danh dự": danh sách các lần Hoãn / Tiếp tục (claim.phddHoanLogs);
 *    trạng thái Hoãn phục hồi danh dự + chế độ cập nhật: form "Tiếp tục thực hiện phục hồi danh dự" -> nhánh PHDD về bước trước khi hoãn.
 * Dùng tiện ích sẵn có: ctvvDocsMount / ctvvDocsValidate / ctvvDocsViewHtml (quan_ly_boi_thuong_ctvv.js), setPhddStatus, saveClaimsToLocal, showConfirmModal, showToast.
 */
var PHDX_HOAN = 'Hoãn phục hồi danh dự';
var PHDX_REQ = 'Đây là trường bắt buộc';
var PHDX_STEP_OF = { 'Mới': 1, 'Đang thực hiện': 1, 'Chờ phản hồi': 2, 'Hoãn phục hồi danh dự': 2, 'Từ chối phục hồi danh dự': 2, 'Yêu cầu bổ sung': 2, 'Chờ thực hiện': 3, 'Chờ thực thi': 3, 'Hoàn thành': 4 };
var PHDX_SECS = ['phddSection1', 'phddSection2', 'phddSection3'];

function phdxEl(id) { return document.getElementById(id); }
function phdxE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function phdxClaim() { try { return claimsList.find(function (c) { return c.id === selectedClaimId; }) || null; } catch (e) { return null; } }
function phdxSt(claim) { return claim ? (typeof phddCanonicalStatus === 'function' ? phddCanonicalStatus(claim.phddStatus) : claim.phddStatus) : ''; }
function phdxPad(n) { return String(n).padStart(2, '0'); }
function phdxToday() { var d = new Date(); return phdxPad(d.getDate()) + '/' + phdxPad(d.getMonth() + 1) + '/' + d.getFullYear(); }
function phdxNow() { var d = new Date(); return phdxToday() + ' ' + phdxPad(d.getHours()) + ':' + phdxPad(d.getMinutes()); }
function phdxUser(claim) { return (typeof getCurrentSimulatedOfficer === 'function' && getCurrentSimulatedOfficer()) || (claim && claim.assignedOfficer) || ''; }
function phdxValidDate(v) {
    var m = String(v || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return false;
    var d = new Date(+m[3], +m[2] - 1, +m[1]);
    return d.getFullYear() === +m[3] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[1];
}
// dd/mm/yyyy -> số yyyymmdd để so sánh (không hợp lệ: null)
function phdxDateNum(v) {
    if (!phdxValidDate(v)) return null;
    var m = String(v).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return +m[3] * 10000 + +m[2] * 100 + +m[1];
}
var PHDX_MSG_RANGE = 'Từ ngày không được lớn hơn Đến ngày'; // [MSG-ERR-VAL-007]
var PHDX_MSG_FUTURE = 'Ngày nhập vào không được lớn hơn ngày hiện tại'; // [MSG-ERR-VAL-008]

function phdxCss() {
    if (phdxEl('phdxCss')) return;
    var st = document.createElement('style');
    st.id = 'phdxCss';
    st.textContent = [
        '.phdx-sec { scroll-margin-top: 80px; }',
        '.phdx-head { cursor: pointer; user-select: none; pointer-events: auto; }',
        '.phdx-head .phdx-ico { margin-left: auto; font-size: 12px; color: #64748b; transition: transform .2s; }',
        '.phdx-sec:not(.phdx-collapsed) > .phdx-head .phdx-ico { transform: rotate(180deg); }',
        '.phdx-sec.phdx-collapsed > *:not(:first-child) { display: none !important; }',
        '.phdx-sec.phdx-collapsed > .phdx-head { border-bottom-color: transparent !important; margin-bottom: 0 !important; padding-bottom: 0 !important; }',
        '.phdx-sec.phdx-flash { box-shadow: 0 0 0 3px rgba(37, 99, 235, .45) !important; transition: box-shadow .3s; }',
        '.phdx-sec:focus { outline: none; }',
        '.phdd-stepper .phdx-step { cursor: pointer; }',
        '.phdd-stepper .phdx-step.phdx-off { cursor: not-allowed; }',
        '.phdd-stepper .phdx-step:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; border-radius: 6px; }',
        '.ctvv-hist-head { cursor: pointer; user-select: none; }',
        '.ctvv-hist-head .ctvv-hist-ico { margin-left: auto; transition: transform .2s; }',
        '.ctvv-hist-head.is-open .ctvv-hist-ico { transform: rotate(180deg); }',
        '.phdx-lan { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin-bottom: 12px; background: #fff; }',
        '.phdx-lan.is-open-hoan { border-color: #fcd34d; background: #fffbeb; }',
        '.phdx-lan-title { font-weight: 700; font-size: 13px; color: #1e293b; margin-bottom: 8px; }',
        '.phdx-sub { font-weight: 700; font-size: 12.5px; color: #334155; margin: 12px 0 6px; padding-top: 10px; border-top: 1px dashed #e2e8f0; }',
        '.phdx-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px 18px; font-size: 13px; line-height: 1.55; margin-bottom: 8px; }',
        '.phdx-grid > div > b { display: block; color: #64748b; font-weight: 600; font-size: 12px; }',
        '.phdx-grid .phdx-span2 { grid-column: span 2; }',
        '.phdx-grid .phdx-span4 { grid-column: span 4; }',
        '.phdx-form { border: 1px solid #bfdbfe; background: #f8fbff; border-radius: 8px; padding: 14px 16px; margin-top: 4px; }',
        '.phdx-form-title { font-weight: 700; font-size: 13px; color: #1e3a8a; margin-bottom: 10px; }',
        '.phdx-form .gqx-err { display: none; color: #dc2626; font-size: 12px; margin-top: 4px; }',
        '.phdx-form .form-control.is-invalid { border-color: #dc2626 !important; }',
        '.phdx-form textarea.form-control { font-family: inherit; }',
        '.phdx-form .phdx-foot { display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px; }',
        '@media (max-width: 900px) { .phdx-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .phdx-grid .phdx-span4 { grid-column: span 2; } }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
}

// ---------- Bước hiện tại của nhánh Phục hồi danh dự (1 Thông báo, 2 Phản hồi, 3 Thực hiện, 4 Hoàn thành) ----------
function phdxCurStep(claim) {
    var st = phdxSt(claim);
    if (PHDX_STEP_OF[st]) return PHDX_STEP_OF[st];
    // Trạng thái khác (VD dữ liệu cũ Đình chỉ giải quyết): suy theo dữ liệu đã có
    if (claim.phddStep4DateAct || claim.phddCompletedDate) return 4;
    if (claim.phddStep3Saved || claim.phddStep2Opinion) return 3;
    if (claim.phddStep1No) return 2;
    return 1;
}

// ---------- Thu gọn / mở rộng khối ----------
function phdxDecorate(sec) {
    if (!sec || sec.dataset.phdx) return;
    var head = sec.children[0];
    if (!head) return;
    sec.dataset.phdx = '1';
    sec.classList.add('phdx-sec');
    head.classList.add('phdx-head');
    head.title = 'Mở rộng / Thu gọn';
    head.addEventListener('click', function () { phdxToggle(sec.id); });
    head.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-chevron-down phdx-ico"></i>');
}
function phdxSetOpen(sec, open) { if (sec) sec.classList.toggle('phdx-collapsed', !open); }
function phdxToggle(id) { var sec = phdxEl(id); if (sec) phdxSetOpen(sec, sec.classList.contains('phdx-collapsed')); }

// ---------- Thanh tiến trình: bấm Step -> cuộn tới khối ----------
function phdxDecorateStepper() {
    [1, 2, 3, 4].forEach(function (n) {
        var el = phdxEl('phddStepIndicator' + n);
        if (!el || el.dataset.phdx) return;
        el.dataset.phdx = '1';
        el.classList.add('phdx-step');
        el.setAttribute('role', 'button');
        el.tabIndex = 0;
        el.addEventListener('click', function () { phdxGoStep(n); });
        el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); phdxGoStep(n); } });
    });
}
function phdxStepTarget(n) {
    if (n <= 3) return phdxEl('phddSection' + n);
    var bar = phdxEl('phddCompleteBar');
    return bar && bar.style.display !== 'none' ? bar : phdxEl('phddSection3');
}
function phdxGoStep(n) {
    var claim = phdxClaim(); if (!claim) return;
    if (n > phdxCurStep(claim)) { if (typeof showToast === 'function') showToast('Chưa đến bước này.', 'info'); return; }
    var t = phdxStepTarget(n);
    if (!t || t.style.display === 'none') return;
    if (t.classList.contains('phdx-sec')) phdxSetOpen(t, true);
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    try { t.focus({ preventScroll: true }); } catch (e) { /* mockup */ }
    t.classList.add('phdx-sec', 'phdx-flash');
    clearTimeout(t._phdxFlash);
    t._phdxFlash = setTimeout(function () { t.classList.remove('phdx-flash'); if (!t.dataset.phdx) t.classList.remove('phdx-sec'); }, 1600);
}

// ---------- Hiển thị khối theo bước: bước hiện tại mở, bước đã qua thu gọn, bước chưa tới ẩn ----------
function phdxApply(claim) {
    var cur = phdxCurStep(claim);
    var openN = Math.min(cur, 3);
    PHDX_SECS.forEach(function (id, i) {
        var sec = phdxEl(id); if (!sec) return;
        phdxDecorate(sec);
        var n = i + 1;
        sec.style.display = n <= cur ? '' : 'none';
        phdxSetOpen(sec, n === openN);
    });
    var bar = phdxEl('phddCompleteBar');
    if (bar && cur < 3) bar.style.display = 'none';
    [1, 2, 3, 4].forEach(function (n) {
        var el = phdxEl('phddStepIndicator' + n); if (!el) return;
        el.classList.toggle('phdx-off', n > cur);
        el.title = n > cur ? 'Chưa đến bước này' : 'Xem thông tin bước này';
    });
}

// ---------- Các lần Hoãn / Tiếp tục phục hồi danh dự ----------
function phdxOpenLog(claim) {
    var l = (claim && claim.phddHoanLogs) || [];
    var x = l[l.length - 1];
    return x && !x.resumeDate && !x.closed ? x : null;
}
function phdxLogs(claim) {
    if (!Array.isArray(claim.phddHoanLogs)) claim.phddHoanLogs = [];
    // Hoãn ghi nhận tại khối Ý kiến phản hồi (ý kiến "Đề nghị chưa thực hiện") chưa có lần hoãn: tạo lần hoãn từ ý kiến đã lưu
    // Không có Từ ngày / Đến ngày (Khối 2 không nhập thời gian hoãn)
    var files = typeof ctvvFromLegacy === 'function' ? ctvvFromLegacy(claim.phddStep2Files || []) : [];
    var open = phdxOpenLog(claim);
    if (phdxSt(claim) === PHDX_HOAN && !open) {
        var lan = claim.phddHoanLogs.length + 1;
        claim.phddHoanLogs.push({ src: 'step2', reason: claim.phddStep2DelayReason || '', fromDate: claim.phddStep2DelayFrom || '', toDate: claim.phddStep2DelayTo || '', files: files, by: phdxUser(claim), at: phdxNow(), prevStatus: 'Chờ phản hồi' });
        if (!Array.isArray(claim.phddTimeline)) claim.phddTimeline = [];
        var per = (claim.phddStep2DelayFrom || claim.phddStep2DelayTo) ? ' từ ngày ' + (claim.phddStep2DelayFrom || '-') + ' đến ngày ' + (claim.phddStep2DelayTo || '-') : '';
        claim.phddTimeline.push({ title: 'Hoãn phục hồi danh dự', date: claim.phddStep2ReceiveDate || phdxToday(), officer: phdxUser(claim), desc: 'Hoãn lần ' + lan + per + ' theo đề nghị của người bị thiệt hại. Trạng thái vụ việc: [Hoãn phục hồi danh dự].' });
    } else if (open && open.src === 'step2' && phdxSt(claim) === PHDX_HOAN) {
        // Cập nhật lại Khối 2 khi đang hoãn: lần hoãn đang mở lấy theo dữ liệu mới
        open.reason = claim.phddStep2DelayReason || '';
        open.fromDate = claim.phddStep2DelayFrom || '';
        open.toDate = claim.phddStep2DelayTo || '';
        open.files = files;
    } else if (open && phdxSt(claim) !== PHDX_HOAN) {
        // Đổi ý kiến tại Khối 2 (không còn tạm hoãn): lần hoãn kết thúc, không còn "đang hoãn"
        open.closed = true;
    }
    return claim.phddHoanLogs;
}
function phdxDocs(rows, title) {
    return typeof ctvvDocsViewHtml === 'function' ? ctvvDocsViewHtml(rows || [], { title: title }) : '';
}
function phdxF(label, value, cls) { return '<div' + (cls ? ' class="' + cls + '"' : '') + '><b>' + label + '</b>' + (value ? phdxE(value) : '-') + '</div>'; }
function phdxLogHtml(l, i, isOpen) {
    var h = '<div class="phdx-lan' + (isOpen ? ' is-open-hoan' : '') + '" id="phdxLan_' + (i + 1) + '">'
        + '<div class="phdx-lan-title">Lần ' + (i + 1) + ' – Đề nghị chưa thực hiện'
        + (l.resumeDate ? ' – Tiếp tục ngày ' + phdxE(l.resumeDate) : (isOpen ? ' (đang hoãn)' : '')) + '</div>'
        + '<div class="phdx-grid">'
        + phdxF('Lý do đề nghị chưa thực hiện', l.reason, 'phdx-span4')
        + phdxF('Bước trước khi hoãn', typeof phddStepLabel === 'function' ? phddStepLabel(l.prevStatus) : l.prevStatus)
        + phdxF('Người cập nhật', l.by)
        + phdxF('Thời điểm cập nhật', l.at, 'phdx-span2')
        + '</div>' + phdxDocs(l.files, 'Tài liệu kèm theo');
    if (l.resumeDate) {
        h += '<div class="phdx-sub">Tiếp tục thực hiện phục hồi danh dự</div><div class="phdx-grid">'
            + phdxF('Ngày tiếp tục', l.resumeDate)
            + phdxF('Người cập nhật', l.resumeBy)
            + phdxF('Thời điểm cập nhật', l.resumeAt, 'phdx-span2')
            + phdxF('Lý do / Nội dung tiếp tục', l.resumeReason, 'phdx-span4')
            + '</div>' + phdxDocs(l.resumeFiles, 'Tài liệu kèm theo');
    }
    return h + '</div>';
}
function phdxCanResume(claim) {
    if (!isDetailEditMode || phdxSt(claim) !== PHDX_HOAN || !phdxOpenLog(claim)) return false;
    try { if (typeof getCurrentSimulatedRole === 'function' && getCurrentSimulatedRole() === 'thu-truong') return false; } catch (e) { /* mockup */ }
    return true;
}
function phdxFormHtml() {
    var err = function (id) { return '<div id="' + id + 'Err" class="gqx-err">' + PHDX_REQ + '</div>'; };
    return '<div class="phdx-form" id="phdxResumeForm"><div class="phdx-form-title">Tiếp tục thực hiện phục hồi danh dự</div>'
        + '<div class="gqx-grid2" style="margin-bottom:12px;"><div class="gqx-field"><label class="form-label" for="phdxResumeDate">Ngày tiếp tục<span class="gqx-req">*</span></label>'
        + '<div class="gqx-date"><input type="text" id="phdxResumeDate" class="form-control" placeholder="dd/mm/yyyy" oninput="phdxClearErr(\'phdxResumeDate\')" onchange="phdxClearErr(\'phdxResumeDate\')">'
        + '<i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById(\'phdxResumeDate\'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i></div>' + err('phdxResumeDate') + '</div><div></div></div>'
        + '<div class="gqx-field" style="margin-bottom:12px;"><label class="form-label" for="phdxResumeReason">Lý do / Nội dung tiếp tục<span class="gqx-req">*</span></label>'
        + '<textarea id="phdxResumeReason" class="form-control" rows="3" maxlength="2000" placeholder="Nhập lý do / nội dung tiếp tục thực hiện phục hồi danh dự" oninput="phdxClearErr(\'phdxResumeReason\'); document.getElementById(\'phdxResumeReasonCount\').textContent=this.value.length+\'/2000 ký tự\';"></textarea>'
        + '<div id="phdxResumeReasonCount" class="ktlx-counter">0/2000 ký tự</div>' + err('phdxResumeReason') + '</div>'
        + '<div class="form-group" style="margin-bottom:0;"><span class="form-label">Tài liệu kèm theo</span><div id="phdxResumeDocs"></div></div>'
        + '<div class="phdx-foot"><button type="button" class="btn btn-primary btn-sm" id="phdxBtnResume" onclick="phdxResume()" style="display:inline-flex; align-items:center; gap:6px;"><i class="fa-solid fa-play"></i> Tiếp tục thực hiện phục hồi danh dự</button></div>'
        + '</div>';
}
function phdxRenderHoan(claim) {
    var s2 = phdxEl('phddSection2'); if (!s2) return;
    var sec = phdxEl('phdxHoanSection');
    if (!sec) {
        sec = document.createElement('div');
        sec.id = 'phdxHoanSection';
        sec.style.cssText = 'background: white; border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 20px; box-shadow: var(--box-shadow);';
        s2.parentNode.insertBefore(sec, s2.nextSibling);
    }
    var logs = phdxLogs(claim);
    if (!logs.length) { sec.style.display = 'none'; sec.innerHTML = ''; return; }
    var hoan = phdxSt(claim) === PHDX_HOAN;
    var open = phdxOpenLog(claim);
    sec.style.display = '';
    sec.classList.add('phdx-sec');
    sec.innerHTML = '<div class="phdx-head" title="Mở rộng / Thu gọn" onclick="phdxToggle(\'phdxHoanSection\')" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 15px;">'
        + '<h5 style="color: var(--primary-light); font-size: 14px; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 8px;">'
        + '<span style="background: var(--primary-light); color: white; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 10px;"><i class="fa-solid fa-pause"></i></span>'
        + 'HOÃN PHỤC HỒI DANH DỰ <span style="font-weight: 500; color: #64748b; font-size: 12.5px;">(' + logs.length + ' lần' + (hoan ? ', đang hoãn' : '') + ')</span></h5>'
        + '<i class="fa-solid fa-chevron-down phdx-ico"></i></div>'
        + '<div id="phdxHoanList">' + logs.map(function (l, i) { return phdxLogHtml(l, i, l === open); }).join('') + '</div>'
        + (phdxCanResume(claim) ? phdxFormHtml() : '');
    if (phdxEl('phdxResumeForm')) {
        var d = phdxEl('phdxResumeDate');
        d.value = phdxToday();
        if (typeof flatpickr !== 'undefined') flatpickr(d, { dateFormat: 'd/m/Y', allowInput: true, defaultDate: d.value, maxDate: 'today', onChange: function () { phdxClearErr('phdxResumeDate'); } });
        if (typeof ctvvDocsMount === 'function') ctvvDocsMount('phdx', 'phdxResumeDocs', [], { required: false, title: '' });
    }
    phdxSetOpen(sec, hoan);
}
function phdxSetErr(id, on, msg) {
    var el = phdxEl(id), er = phdxEl(id + 'Err');
    if (el) el.classList.toggle('is-invalid', !!on);
    if (er) { er.textContent = msg || PHDX_REQ; er.style.display = on ? 'block' : 'none'; }
}
function phdxClearErr(id) { phdxSetErr(id, false); }
// Tiếp tục thực hiện phục hồi danh dự: kiểm tra -> xác nhận -> nhánh PHDD về bước trước khi hoãn, vụ việc "Đang phục hồi danh dự", ghi lịch sử
function phdxResume() {
    var claim = phdxClaim();
    var log = phdxOpenLog(claim);
    if (!claim || !log || phdxSt(claim) !== PHDX_HOAN) return;
    var dEl = phdxEl('phdxResumeDate'), rEl = phdxEl('phdxResumeReason');
    var date = dEl ? dEl.value.trim() : '', reason = rEl ? rEl.value.trim() : '';
    // Ngày tiếp tục: bắt buộc; không lớn hơn ngày hiện tại
    var dateMsg = '';
    var dn = phdxDateNum(date), todayN = phdxDateNum(phdxToday());
    if (!date || dn === null) dateMsg = PHDX_REQ;
    else if (dn > todayN) dateMsg = PHDX_MSG_FUTURE;
    var badDate = !!dateMsg, badReason = !reason;
    phdxSetErr('phdxResumeDate', badDate, dateMsg);
    phdxSetErr('phdxResumeReason', badReason);
    if (badDate || badReason) { (badDate ? dEl : rEl).focus(); return; }
    if (typeof ctvvDocsValidate === 'function' && !ctvvDocsValidate('phdx', false)) return;
    var rows = (typeof CTVV_DOCS !== 'undefined' && CTVV_DOCS.phdx ? CTVV_DOCS.phdx.rows : []).filter(function (r) { return r.title && r.file; }).map(function (r) { return { title: r.title, file: r.file, size: r.size, fileId: r.fileId }; });
    var prev = log.prevStatus || 'Chờ phản hồi';
    var lan = claim.phddHoanLogs.indexOf(log) + 1;
    var code = typeof claimVvCode === 'function' ? claimVvCode(claim) : claim.code;
    showConfirmModal('Xác nhận tiếp tục thực hiện phục hồi danh dự cho vụ việc ' + code + '? Vụ việc chuyển sang trạng thái [Đang phục hồi danh dự].', function () {
        log.resumeDate = date;
        log.resumeReason = reason;
        log.resumeFiles = rows;
        log.resumeBy = phdxUser(claim);
        log.resumeAt = phdxNow();
        setPhddStatus(claim, prev);
        if (!Array.isArray(claim.phddTimeline)) claim.phddTimeline = [];
        claim.phddTimeline.push({ title: 'Tiếp tục phục hồi danh dự', date: date, officer: log.resumeBy, desc: 'Tiếp tục thực hiện phục hồi danh dự sau lần hoãn ' + lan + '. Lý do: ' + phdxE(reason) + '. Trạng thái vụ việc: [Đang phục hồi danh dự].' });
        if (!Array.isArray(claim.timeline)) claim.timeline = [];
        claim.timeline.push({ title: 'Tiếp tục phục hồi danh dự', date: date, desc: 'Tiếp tục thực hiện phục hồi danh dự sau lần hoãn ' + lan + '. Trạng thái vụ việc: [Đang phục hồi danh dự].', status: 'completed' });
        saveClaimsToLocal();
        showToast('Đã tiếp tục thực hiện phục hồi danh dự vụ việc ' + code + '. Vụ việc chuyển sang trạng thái [Đang phục hồi danh dự].', 'success');
        showCaseDetail(claim.id, true, 'phdd');
    }, { title: 'Tiếp tục thực hiện phục hồi danh dự', btnYesText: 'Xác nhận', btnYesClass: 'btn-primary' });
}
// Không còn dùng đường tắt cũ (chuyển thẳng, không nhập thông tin): mở màn Cập nhật phục hồi danh dự
window.gqldResumePhdd = function (id) { showCaseDetail(id, true, 'phdd'); };

// ---------- Lịch sử xử lý: bổ sung các mục Hoãn / Tiếp tục phục hồi danh dự; thu gọn / mở rộng (mặc định thu gọn) ----------
function phdxTimelineExtra(claim) {
    var box = phdxEl('phddTimelineContainer'); if (!box || !claim) return;
    var list = (claim.phddTimeline || []).filter(function (t) { return t && /^(Hoãn|Tiếp tục) phục hồi danh dự$/.test(t.title || ''); });
    list.forEach(function (ev) {
        box.insertAdjacentHTML('beforeend', '<div class="phdx-tl" style="display: flex; gap: 15px; position: relative;">'
            + '<div style="width: 18px; height: 18px; border-radius: 50%; background: #1e3a8a; display: flex; align-items: center; justify-content: center; z-index: 2; margin-top: 2px;"><div style="width: 8px; height: 8px; border-radius: 50%; background: white;"></div></div>'
            + '<div><div style="font-weight: 700; font-size: 13.5px; color: #1e293b;">' + phdxE(ev.title) + '</div>'
            + '<div style="display: flex; gap: 15px; margin-top: 4px; flex-wrap: wrap;">'
            + '<div style="font-size: 11.5px; color: #64748b;"><i class="fa-regular fa-calendar-days"></i> <strong>Ngày thực hiện:</strong> ' + phdxE(ev.date || '--') + '</div>'
            + '<div style="font-size: 11.5px; color: #64748b;"><i class="fa-solid fa-user-tie"></i> <strong>Cán bộ thực hiện:</strong> ' + phdxE(ev.officer || claim.assignedOfficer || '--') + '</div></div>'
            + '<div style="font-size: 13px; color: #475569; margin-top: 6px; line-height: 1.4;">' + ev.desc + '</div></div></div>');
    });
}
function phdxHistInit() {
    var head = phdxEl('phdxHistHead'), box = phdxEl('phddTimelineContainer');
    if (!head || !box) return;
    head.classList.remove('is-open');
    box.style.display = 'none';
}
function phdxToggleHistory() {
    var head = phdxEl('phdxHistHead'), box = phdxEl('phddTimelineContainer');
    if (!head || !box) return;
    var open = box.style.display === 'none';
    box.style.display = open ? 'flex' : 'none';
    head.classList.toggle('is-open', open);
}

// ---------- Khối 2 - ý kiến "Đề nghị chưa thực hiện": không nhập Từ ngày / Đến ngày ----------
// Không dựng ô Từ ngày / Đến ngày (phdxBeforeStep2 tự để trống khi không có ô); dữ liệu cũ đã lưu vẫn hiển thị ở các lần hoãn
var PHDX_DELAY_DATES = false;
function phdxDelayFields() {
    var g = phdxEl('phddStep2DelayGroup');
    if (!PHDX_DELAY_DATES) { var old = phdxEl('phdxDelayDates'); if (old) old.remove(); return; }
    if (!g || phdxEl('phdxDelayDates')) return;
    var fld = function (id, label) {
        return '<div class="form-group" style="margin-bottom:0;"><span class="form-label">' + label + '</span>'
            + '<input type="text" class="form-control" id="' + id + '" placeholder="dd/mm/yyyy" oninput="phdxClearErr(\'' + id + '\')" onchange="phdxClearErr(\'' + id + '\')">'
            + '<div id="' + id + 'Err" class="error-message" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;"></div></div>';
    };
    var wrap = document.createElement('div');
    wrap.id = 'phdxDelayDates';
    wrap.className = 'grid-2-cols';
    wrap.style.cssText = 'margin-top: 12px;';
    wrap.innerHTML = fld('editPhddStep2DelayFrom', 'Từ ngày') + fld('editPhddStep2DelayTo', 'Đến ngày');
    g.appendChild(wrap);
    if (typeof flatpickr !== 'undefined') ['editPhddStep2DelayFrom', 'editPhddStep2DelayTo'].forEach(function (id) {
        flatpickr(phdxEl(id), { dateFormat: 'd/m/Y', allowInput: true, onChange: function () { phdxClearErr(id); } });
    });
}
function phdxFillDelay() {
    var claim = phdxClaim();
    phdxDelayFields();
    [['editPhddStep2DelayFrom', 'phddStep2DelayFrom'], ['editPhddStep2DelayTo', 'phddStep2DelayTo']].forEach(function (p) {
        var el = phdxEl(p[0]); if (!el) return;
        var v = (claim && claim[p[1]]) || '';
        if (el._flatpickr) el._flatpickr.setDate(v || null, false, 'd/m/Y'); else el.value = v;
        if (!v) el.value = '';
        phdxClearErr(p[0]);
    });
}
// Kiểm tra + ghi Từ ngày / Đến ngày trước khi lưu Khối 2; false = có lỗi (đã tô đỏ, báo lỗi dưới ô, focus)
function phdxBeforeStep2() {
    var claim = phdxClaim(); if (!claim) return true;
    var opinion = (document.querySelector('input[name="editPhddStep2Opinion"]:checked') || {}).value;
    var fEl = phdxEl('editPhddStep2DelayFrom'), tEl = phdxEl('editPhddStep2DelayTo');
    if (opinion !== 'Đề nghị tạm hoãn' || !fEl || !tEl) { claim.phddStep2DelayFrom = ''; claim.phddStep2DelayTo = ''; return true; }
    var f = fEl.value.trim(), t = tEl.value.trim();
    var fn = phdxDateNum(f), tn = phdxDateNum(t);
    phdxClearErr('editPhddStep2DelayFrom'); phdxClearErr('editPhddStep2DelayTo');
    if (f && t && fn !== null && tn !== null && tn < fn) {
        phdxSetErr('editPhddStep2DelayTo', true, PHDX_MSG_RANGE);
        tEl.focus();
        return false;
    }
    claim.phddStep2DelayFrom = f;
    claim.phddStep2DelayTo = t;
    return true;
}
(function () {
    phdxDelayFields();
    var s2 = window.submitPhddStep2Opinion;
    if (typeof s2 === 'function') window.submitPhddStep2Opinion = function () { if (!phdxBeforeStep2()) return; return s2.apply(this, arguments); };
    var u2 = window.updatePhddStep2NoLock;
    if (typeof u2 === 'function') window.updatePhddStep2NoLock = function () {
        var btn = phdxEl('btnUpdatePhddStep2');
        if (btn && btn.innerHTML.indexOf('Lưu thông tin cập nhật') >= 0 && !phdxBeforeStep2()) return;
        return u2.apply(this, arguments);
    };
    // Nạp Từ ngày / Đến ngày theo dữ liệu vụ việc trước khi Khối 2 chuyển chế độ xem / nhập
    var d2 = window.setSection2InputsDisabled;
    if (typeof d2 === 'function') window.setSection2InputsDisabled = function () {
        try { phdxFillDelay(); } catch (e) { /* mockup */ }
        return d2.apply(this, arguments);
    };
})();

function phdxRender(claim) {
    if (!claim || !phdxEl('detailSubTabPhdd')) return;
    phdxCss();
    phdxDecorateStepper();
    phdxRenderHoan(claim);
    phdxApply(claim);
}
(function () {
    var oT = window.renderPhddTimeline;
    if (typeof oT === 'function') window.renderPhddTimeline = function (claim) {
        var r = oT.apply(this, arguments);
        try { phdxTimelineExtra(claim); } catch (e) { /* mockup */ }
        return r;
    };
    var rh = window.renderHonorRestorationTab;
    if (typeof rh === 'function') window.renderHonorRestorationTab = function (claim) {
        var r = rh.apply(this, arguments);
        try { phdxRender(claim); } catch (e) { /* mockup */ }
        return r;
    };
    var scd = window.showCaseDetail;
    if (typeof scd === 'function') window.showCaseDetail = function () {
        var r = scd.apply(this, arguments);
        try { phdxHistInit(); } catch (e) { /* mockup */ }
        return r;
    };
})();
