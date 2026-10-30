/*
 * Màn Xem chi tiết vụ việc - Giải quyết yêu cầu bồi thường (prefix ctvv)
 * 1. Tab "Chi tiết giải quyết bồi thường": hiển thị khối của các bước đã qua (thu gọn) + khối bước hiện tại (mở); "Lịch sử xử lý" thu gọn/mở rộng.
 * 2. Tên 03 tab cố định: Thông tin hồ sơ vụ việc | Chi tiết giải quyết bồi thường | Phục hồi danh dự.
 * 3. Tab "Phục hồi danh dự": bắt đầu từ thanh tiến trình; bước Thông báo: Trình ký Thông báo tổ chức thực hiện phục hồi danh dự (Mẫu số 26/BTNN);
 *    Thành phần tham gia tổ chức phục hồi danh dự: 02 bảng như Thương lượng.
 * 4. Bảng "Tài liệu đính kèm" đồng nhất (chuẩn màn Tham mưu kết quả xác định cơ quan giải quyết bồi thường):
 *    STT | Tên tài liệu, văn bản | File đính kèm | Thao tác (Xem file / Xóa - xóa thẳng); nút Thêm tài liệu dưới bảng;
 *    chế độ xem: Thao tác Xem file / Tải file, bảng rỗng thì không hiển thị.
 * Dùng tiện ích sẵn có của quan_ly_boi_thuong.html (gq*, ktlx*, tlkt*, pt*, phdd*) và btnn_tai_lieu_kem_theo.js.
 */
var CTVV_KIND = 'Thông báo tổ chức thực hiện phục hồi danh dự'; // Loại trình
var CTVV_FORM = 'Mẫu số 26/BTNN';
var CTVV_EXTS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
var CTVV_MAX = 50 * 1024 * 1024;
var CTVV_REQ = 'Đây là trường bắt buộc';
var CTVV_OFF_MSG = 'Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.';
var CTVV_CONTENT_DEFAULT = 'Kính trình Lãnh đạo xem xét, ký duyệt Thông báo về việc tổ chức thực hiện phục hồi danh dự.';
var CTVV_NOI_NHAN_DEFAULT = ['- Như trên;', '- Lưu: VT, HSVV.'];

function ctvvEl(id) { return document.getElementById(id); }
function ctvvE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function ctvvClaim() { return (typeof claimsList !== 'undefined' && claimsList.find(function (c) { return c.id === selectedClaimId; })) || null; }
function ctvvFmtSize(s) {
    if (s === undefined || s === null || s === '' || /^\s*-+\s*$/.test(String(s))) return '';
    var n = Number(s);
    if (isNaN(n)) return String(s);
    if (!n) return '';
    return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';
}
function ctvvIcon(name) {
    var ext = (String(name || '').match(/\.[^.]+$/) || [''])[0].toLowerCase();
    if (ext === '.pdf') return 'fa-solid fa-file-pdf tlkt-ico-pdf';
    if (ext === '.doc' || ext === '.docx') return 'fa-solid fa-file-word tlkt-ico-word';
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') return 'fa-solid fa-file-image tlkt-ico-img';
    return 'fa-solid fa-file-lines';
}
function ctvvCss() {
    if (typeof tlktCss === 'function') tlktCss();
    if (ctvvEl('ctvvCss')) return;
    var st = document.createElement('style');
    st.id = 'ctvvCss';
    st.textContent = [
        '.ctvv-docs { margin-top: 6px; }',
        // [pdtb] Bảng Tài liệu đính kèm: nhãn phía trên bảng, bảng rộng 100% khối (kể cả khi khối cha đã chuyển dạng "nhãn: giá trị" ở chế độ xem)
        '.form-group:has(.ctvv-docs) { display: block !important; }',
        '.form-group:has(.ctvv-docs) > .form-label { display: block !important; margin: 0 0 6px !important; }',
        '.ctvv-docs { width: 100%; flex: 1 0 100%; box-sizing: border-box; }',
        '.ctvv-docs .tlkt-wrap { border: 1px solid #e2e8f0; border-radius: 8px; overflow-x: auto; background: #fff; }',
        '.ctvv-docs .tlkt-table { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; }',
        '.ctvv-docs.tlkt-view-box .tlkt-table { min-width: 0; }',
        '.ctvv-docs .tlkt-table th, .ctvv-docs.tlkt-view-box .tlkt-table th { background: #f8fafc; color: #334155; font-weight: 600; padding: 9px 10px; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }',
        '.ctvv-docs .tlkt-table td, .ctvv-docs.tlkt-view-box .tlkt-table td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; color: #1e293b; }',
        '.ctvv-docs .tlkt-table td.pdtb-title { overflow-wrap: anywhere; }',
        '.ctvv-docs .tlkt-file.pdtb-file, .ctvv-docs.tlkt-view-box .tlkt-file.pdtb-file { display: flex; align-items: center; gap: 6px; min-width: 0; font-weight: 500; font-size: 12.5px; word-break: normal; }',
        '.ctvv-docs .pdtb-file > i { flex: none; font-size: 14px; }',
        '.ctvv-docs .pdtb-file .pdtb-fn { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
        '.ctvv-docs .pdtb-file small, .ctvv-docs.tlkt-view-box .pdtb-file small { flex: none; display: inline; color: #94a3b8; font-weight: 400; font-size: 11.5px; white-space: nowrap; }',
        '.ctvv-docs .tlkt-acts { display: inline-flex; gap: 8px; justify-content: center; }',
        '.ctvv-docs .tlkt-ib { width: 30px; height: 30px; font-size: 13px; }',
        '.ctvv-docs .tlkt-err.error-message { color: #dc2626; font-size: 11.5px; margin-top: 4px; }',
        '.ctvv-docs .tlkt-table input.tlkt-name.is-invalid { border-color: #dc2626; background: #fef2f2; }',
        '.ctvv-hist-head { cursor: pointer; user-select: none; }',
        '.ctvv-hist-head .ctvv-hist-ico { margin-left: auto; transition: transform .2s; }',
        '.ctvv-hist-head.is-open .ctvv-hist-ico { transform: rotate(180deg); }',
        '.ctvv-m26 { font-size: 13px; line-height: 1.6; }',
        '.ctvv-m26-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px 20px; margin-bottom: 10px; }',
        '.ctvv-m26-grid > div > b { display: block; color: #64748b; font-weight: 600; font-size: 12px; }',
        '.ctvv-m26-empty { background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px 16px; color: #475569; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }',
        '.ctvv-m26-file { display: flex; align-items: center; gap: 10px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; background: #fff; margin: 6px 0 10px; }',
        '.ctvv-m26-file .ctvv-m26-fn { font-weight: 600; color: #0f172a; word-break: break-all; }',
        '.ctvv-m26-file .tlkt-acts { margin-left: auto; }',
        '.ctvv-m26-badge { display: inline-block; font-size: 11.5px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }',
        '.ctvv-m26-badge.pending { background: #fef3c7; color: #92400e; }',
        '.ctvv-m26-badge.rejected { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }',
        '.ctvv-m26-badge.issued { background: #dcfce7; color: #166534; }',
        '.ctvv-m26-c7 { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin-bottom: 12px; }',
        '.ctvv-m26-c7 .ctvv-sub { font-size: 12px; font-weight: 700; color: #334155; margin: 2px 0 8px; }',
        '#phddSection1.ctvv-m26-on > *:not(:first-child):not(#ctvvM26Panel) { display: none !important; }',
        '#phddMultiUploadZone, #phddStep1FileStatusText, #phddStep2FileStatusText { display: none !important; }',
        '#phddStep1UploadContainer label.btn-upload-standard, #phddStep2DeclineUploadContainer label.btn-upload-standard { display: none !important; }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
}

// =====================================================================
// 1. Bảng Tài liệu đính kèm (nhập + chỉ xem) dùng chung
// =====================================================================
// rows: [{ title (Tên văn bản, căn cứ), file (tên tệp), size, fileId }]
var CTVV_DOCS = {};
function ctvvDocsMount(key, hostId, rows, opts) {
    opts = opts || {};
    CTVV_DOCS[key] = {
        hostId: hostId, rows: (rows || []).map(function (r) { return { title: r.title || '', file: r.file || '', size: r.size || '', fileId: r.fileId || '' }; }),
        required: !!opts.required, title: opts.title === undefined ? 'Tài liệu đính kèm' : opts.title,
        idp: opts.idp || ('ctvv_' + key + '_'), onSync: opts.onSync || null, minRow: opts.minRow !== false
    };
    ctvvDocsRender(key);
}
function ctvvDocsSync(key) {
    var s = CTVV_DOCS[key]; if (!s) return;
    s.rows.forEach(function (r, i) { var el = ctvvEl(s.idp + 'Name_' + i); if (el) r.title = el.value.trim(); });
    if (s.onSync) s.onSync(s.rows.map(function (r) { return Object.assign({}, r); }));
}
function ctvvDocsRender(key) {
    var s = CTVV_DOCS[key]; if (!s) return;
    var host = ctvvEl(s.hostId); if (!host) return;
    ctvvCss();
    if (!s.rows.length && s.minRow) s.rows = [{ title: '', file: '', size: '', fileId: '' }];
    var star = s.required ? '<span class="tlkt-req">*</span>' : '';
    var body = s.rows.map(function (r, i) {
        var fileCell = r.file
            ? pdtbFileHtml(r)
            : '<button type="button" class="tlkt-btn tlkt-btn-pri" id="' + s.idp + 'Btn_' + i + '" onclick="document.getElementById(\'' + s.idp + 'File_' + i + '\').click()"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button>';
        return '<tr data-doc-idx="' + i + '">'
            + '<td class="tlkt-c">' + (i + 1) + '</td>'
            + '<td><input type="text" class="tlkt-name" id="' + s.idp + 'Name_' + i + '" maxlength="500" value="' + ctvvE(r.title) + '" placeholder="Nhập tên tài liệu, văn bản" oninput="ctvvDocsOnName(\'' + key + '\',' + i + ')">'
            + '<div class="tlkt-err error-message" id="' + s.idp + 'NameErr_' + i + '" style="display:none;">' + CTVV_REQ + '</div></td>'
            + '<td class="tlkt-fc"><input type="file" id="' + s.idp + 'File_' + i + '" accept="' + CTVV_EXTS.join(',') + '" style="display:none;" onchange="ctvvDocsPick(\'' + key + '\',' + i + ',this)">' + fileCell
            + '<div class="tlkt-err error-message" id="' + s.idp + 'FileErr_' + i + '" style="display:none;">' + CTVV_REQ + '</div></td>'
            + '<td class="tlkt-c"><span class="tlkt-acts">'
            + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib' + (r.file ? '' : ' is-disabled') + '" title="Xem file" aria-label="Xem file" onclick="ctvvDocsView(\'' + key + '\',' + i + ')"><i class="fa-solid fa-eye"></i></button>'
            + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib tlkt-ib-del" id="' + s.idp + 'Del_' + i + '" title="Xóa" aria-label="Xóa" onclick="ctvvDocsDel(\'' + key + '\',' + i + ')"><i class="fa-solid fa-trash"></i></button>'
            + '</span></td></tr>';
    }).join('');
    host.innerHTML = '<div class="ctvv-docs tlkt-sec" id="ctvvDocs_' + key + '">'
        + (s.title ? '<div class="tlkt-sec-title"><i class="fa-solid fa-paperclip"></i> ' + ctvvE(s.title) + star + '</div>' : '')
        + '<div class="tlkt-wrap"><table class="tlkt-table"><thead><tr><th class="tlkt-c" style="width:50px;">STT</th><th>Tên tài liệu, văn bản' + star + '</th><th style="width:40%;">File đính kèm' + star + '</th><th class="tlkt-c" style="width:100px;">Thao tác</th></tr></thead><tbody>'
        + (body || '<tr><td colspan="4" class="tlkt-empty">Chưa có tài liệu. Bấm "Thêm tài liệu" để bổ sung.</td></tr>') + '</tbody></table></div>'
        + '<div class="tlkt-err error-message" id="' + s.idp + 'Err" style="display:none;">' + CTVV_REQ + '</div>'
        + '<div><button type="button" class="tlkt-btn tlkt-btn-add tlkt-add" id="' + s.idp + 'Add" onclick="ctvvDocsAdd(\'' + key + '\')"><i class="fa-solid fa-plus"></i> Thêm tài liệu</button></div>'
        + '<div class="tlkt-hint"><i class="fa-solid fa-circle-info"></i> Chấp nhận tệp ' + CTVV_EXTS.join(', ') + ' (tối đa 50MB/tệp).</div>'
        + '</div>';
}
function ctvvDocsSetErr(id, on, msg) { var e = ctvvEl(id); if (!e) return; if (msg) e.textContent = msg; e.style.display = on ? 'block' : 'none'; }
function ctvvDocsOnName(key, i) {
    var s = CTVV_DOCS[key]; if (!s) return;
    var el = ctvvEl(s.idp + 'Name_' + i); if (el) el.classList.remove('is-invalid');
    ctvvDocsSetErr(s.idp + 'NameErr_' + i, false); ctvvDocsSetErr(s.idp + 'Err', false);
    ctvvDocsSync(key);
}
function ctvvDocsAdd(key) {
    var s = CTVV_DOCS[key]; if (!s) return;
    ctvvDocsSync(key);
    s.rows.push({ title: '', file: '', size: '', fileId: '' });
    ctvvDocsRender(key); ctvvDocsSync(key);
}
function ctvvDocsPick(key, i, input) {
    var s = CTVV_DOCS[key]; if (!s) return;
    var f = input && input.files && input.files[0];
    if (!f || !s.rows[i]) return;
    ctvvDocsSync(key);
    var ext = (String(f.name).match(/\.[^.]+$/) || [''])[0].toLowerCase();
    var msg = CTVV_EXTS.indexOf(ext) < 0 ? 'Tệp không đúng định dạng. Chỉ chấp nhận ' + CTVV_EXTS.join(', ') + '.' : (f.size > CTVV_MAX ? 'Tệp vượt quá dung lượng cho phép (tối đa 50MB).' : '');
    input.value = '';
    if (msg) { ctvvDocsSetErr(s.idp + 'FileErr_' + i, true, msg); var b = ctvvEl(s.idp + 'Btn_' + i); if (b) b.classList.add('is-invalid'); return; }
    s.rows[i].file = f.name;
    s.rows[i].size = f.size;
    s.rows[i].fileId = typeof tlktKeep === 'function' ? tlktKeep(f) : '';
    if (!s.rows[i].title) s.rows[i].title = f.name.replace(/\.[^.]+$/, '');
    ctvvDocsRender(key);
    ctvvDocsSync(key);
}
// Xóa thẳng dòng tài liệu, không hỏi xác nhận
function ctvvDocsDel(key, i) {
    var s = CTVV_DOCS[key]; if (!s) return;
    ctvvDocsSync(key);
    s.rows.splice(i, 1);
    ctvvDocsRender(key);
    ctvvDocsSync(key);
}
function ctvvOpenDoc(r) {
    if (!r || !r.file) return;
    if (r.fileId && typeof tlktOpenFile === 'function') { tlktOpenFile({ id: r.fileId, name: r.file }); return; }
    if (typeof viewPhddMockFile === 'function') viewPhddMockFile(r.file);
}
function ctvvDownloadDoc(r) {
    if (!r || !r.file) return;
    var fallback = function (ok) { if (!ok) showToast('Tệp mẫu [' + r.file + '] không có nội dung để tải.', 'info'); };
    if (r.fileId && typeof tlktDownloadFile === 'function') { tlktDownloadFile({ id: r.fileId, name: r.file }, fallback); return; }
    fallback(false);
}
function ctvvDocsView(key, i) { var s = CTVV_DOCS[key]; if (s && s.rows[i]) ctvvOpenDoc(s.rows[i]); }
// Kiểm tra: dòng có dữ liệu phải đủ Tên văn bản, căn cứ + tệp; bảng bắt buộc phải có tối thiểu 01 dòng đủ. Lỗi: tô viền đỏ, thông báo dưới ô, focus ô lỗi đầu tiên.
function ctvvDocsValidate(key, required) {
    var s = CTVV_DOCS[key]; if (!s) return true;
    if (!ctvvEl(s.hostId) || !ctvvEl('ctvvDocs_' + key)) return true;
    ctvvDocsSync(key);
    var req = required === undefined ? s.required : !!required;
    var first = null, full = 0;
    var anyData = s.rows.some(function (r) { return r.title || r.file; });
    s.rows.forEach(function (r, i) {
        var need = !!(r.title || r.file) || (req && i === 0 && !anyData);
        var badName = need && !r.title, badFile = need && !r.file;
        var n = ctvvEl(s.idp + 'Name_' + i), b = ctvvEl(s.idp + 'Btn_' + i);
        if (n) n.classList.toggle('is-invalid', badName);
        if (b) b.classList.toggle('is-invalid', badFile);
        ctvvDocsSetErr(s.idp + 'NameErr_' + i, badName, CTVV_REQ);
        ctvvDocsSetErr(s.idp + 'FileErr_' + i, badFile, CTVV_REQ);
        if (!first && badName) first = n; if (!first && badFile) first = b;
        if (r.title && r.file) full++;
    });
    if (first) { if (first.focus) first.focus(); return false; }
    if (req && !full) { ctvvDocsSetErr(s.idp + 'Err', true, CTVV_REQ); return false; }
    return true;
}
// Bảng chỉ xem: STT | Tên văn bản, căn cứ | Tải file (tên tệp, dung lượng) | Thao tác (Xem file / Tải file)
var CTVV_VIEW = {}; var ctvvViewSeq = 0;
function ctvvDocsViewHtml(rows, opts) {
    opts = opts || {};
    ctvvCss();
    var list = (rows || []).filter(function (r) { return r && (r.title || r.file); });
    var vid = 'cv' + (++ctvvViewSeq);
    CTVV_VIEW[vid] = list;
    var body = list.map(function (r, i) {
        return '<tr><td class="tlkt-c">' + (i + 1) + '</td><td class="pdtb-title">' + ctvvE(r.title || String(r.file || '').replace(/\.[^.]+$/, '')) + '</td>'
            + '<td class="tlkt-fc">' + (r.file ? pdtbFileHtml(r) : '<span style="color:#94a3b8;">--</span>') + '</td>'
            + '<td class="tlkt-c">' + (r.file ? '<span class="tlkt-acts">'
                + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Xem file" aria-label="Xem file" data-ctvv-act="view" data-ctvv-vid="' + vid + '" data-ctvv-i="' + i + '"><i class="fa-solid fa-eye"></i></button>'
                + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Tải file" aria-label="Tải file" data-ctvv-act="dl" data-ctvv-vid="' + vid + '" data-ctvv-i="' + i + '"><i class="fa-solid fa-download"></i></button>'
                + '</span>' : '<span style="color:#94a3b8;">--</span>') + '</td></tr>';
    }).join('');
    // Chế độ xem: bảng rỗng thì không hiển thị
    if (!list.length) return '';
    return '<div class="ctvv-docs tlkt-view-box"' + (opts.id ? ' id="' + ctvvE(opts.id) + '"' : '') + '>'
        + (opts.title ? '<div class="tlkt-sec-title"><i class="fa-solid fa-paperclip"></i> ' + ctvvE(opts.title) + '</div>' : '')
        + '<div class="tlkt-wrap"><table class="tlkt-table"><thead><tr><th class="tlkt-c" style="width:50px;">STT</th><th>' + ctvvE(opts.nameLabel || 'Tên tài liệu, văn bản') + '</th><th style="width:40%;">File đính kèm</th><th class="tlkt-c" style="width:100px;">Thao tác</th></tr></thead><tbody>'
        + (body || '<tr><td colspan="4" class="tlkt-empty">Không có tài liệu</td></tr>') + '</tbody></table></div></div>';
}
// [pdtb] Ô Tải file: icon loại tệp + tên tệp 1 dòng (dài thì cắt "…", rê chuột hiện đủ tên) + dung lượng màu xám
function pdtbFileHtml(r) {
    var sz = ctvvFmtSize(r.size);
    return '<div class="tlkt-file pdtb-file" title="' + ctvvE(r.file) + (sz ? ' (' + ctvvE(sz) + ')' : '') + '"><i class="' + ctvvIcon(r.file) + '"></i><span class="pdtb-fn">' + ctvvE(r.file) + '</span>' + (sz ? '<small>(' + ctvvE(sz) + ')</small>' : '') + '</div>';
}
// Chuyển đổi danh sách tệp cũ ({ name: tên tệp, size, title, fileId }) <-> dòng bảng
function ctvvFromLegacy(list) {
    return (list || []).map(function (f) {
        if (!f) return null;
        if (typeof f === 'string') return { title: f.replace(/\.[^.]+$/, ''), file: f, size: '', fileId: '' };
        var file = f.file && typeof f.file === 'string' ? f.file : (f.name || '');
        return { title: f.title || (f.file && typeof f.file === 'string' ? (f.name || '') : '') || file.replace(/\.[^.]+$/, ''), file: file, size: f.size || '', fileId: f.fileId || f.tlktId || '' };
    }).filter(Boolean);
}
function ctvvToLegacy(rows) {
    return (rows || []).filter(function (r) { return r.file; }).map(function (r) { return { name: r.file, size: ctvvFmtSize(r.size) || r.size || '', title: r.title || '', fileId: r.fileId || '', url: '#' }; });
}

// ---------- Áp dụng cho Xác minh thiệt hại (form) ----------
window.renderXmFiles = function () {
    var host = ctvvEl('editXmFilesList'); if (!host) return;
    var lbl = host.parentNode ? host.parentNode.querySelector('label.btn') : null;
    if (lbl) lbl.style.display = 'none';
    host.style.display = 'block';
    ctvvDocsMount('xm', 'editXmFilesList', ctvvFromLegacy(xmSelectedFiles), {
        required: false, title: '',
        onSync: function (rows) { xmSelectedFiles = ctvvToLegacy(rows); }
    });
};
(function () {
    var orig = window.saveXacMinhRound;
    if (typeof orig !== 'function') return;
    window.saveXacMinhRound = function () {
        if (!ctvvDocsValidate('xm', false)) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'error'); return; }
        return orig.apply(this, arguments);
    };
})();
// ---------- Áp dụng cho bảng chỉ xem Xác minh / Thương lượng ----------
window.vxmDocsTableHtml = function (files, id) {
    var rows = (files || []).map(function (f) {
        var file = (f && (f.file || f.name)) || '';
        return { title: (f && (f.title || (f.file ? f.name : ''))) || file.replace(/\.[^.]+$/, ''), file: file, size: (f && f.size) || '', fileId: (f && (f.fileId || f.tlktId)) || '' };
    });
    return ctvvDocsViewHtml(rows, { id: id });
};
// ---------- Áp dụng cho Thương lượng (form) ----------
window.tlRenderDocs = function (k) {
    k = k || 'docs';
    var K = TL_DOC_KINDS[k];
    var wrap = ctvvEl(K.wrap); if (!wrap) return;
    var addBtn = ctvvEl(k === 'ev' ? 'tlAddEvDocBtn' : 'tlAddDocBtn'); if (addBtn) addBtn.style.display = 'none';
    ctvvDocsMount('tl_' + k, K.wrap, (tlState[k] || []).map(function (d) { return { title: d.name || '', file: d.file || '', size: d.size || '', fileId: d.fileId || '' }; }), {
        required: k === 'ev', title: '', idp: K.p, minRow: true,
        onSync: function (rows) { tlState[k] = rows.map(function (r) { return { name: r.title, file: r.file, size: r.size, fileId: r.fileId }; }); }
    });
};
(function () {
    var orig = window.tlSubmit;
    if (typeof orig !== 'function') return;
    window.tlSubmit = function () {
        var checked = document.querySelector('input[name="tlDecision"]:checked');
        var code = checked ? checked.value : '';
        var k = code === 'DONG_Y' ? 'docs' : (code && TL_NO_NEGOTIATION_CODES.includes(code) ? 'ev' : '');
        // [dvc1] Đồng ý thương lượng: Tài liệu đính kèm không bắt buộc (Biên bản kết quả thương lượng là trường tệp riêng)
        if (k && !ctvvDocsValidate('tl_' + k, k === 'ev')) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'error'); return; }
        return orig.apply(this, arguments);
    };
    var origSave = window.tlSave;
    if (typeof origSave === 'function') window.tlSave = function (claim, neg) {
        // Giữ dung lượng / tệp đã tải (Xem file / Tải file tại chế độ xem)
        var src = (tlState.docs || []).concat(tlState.ev || []);
        if (neg && Array.isArray(neg.docs)) neg.docs = neg.docs.map(function (d) {
            var m = src.find(function (x) { return x.file === d.file; }) || {};
            return Object.assign({}, d, { size: m.size || '', fileId: m.fileId || '' });
        });
        return origSave.apply(this, arguments);
    };
})();

// =====================================================================
// 2. Tab "Chi tiết giải quyết bồi thường": khối các bước đã qua (thu gọn) + bước hiện tại (mở)
// =====================================================================
var CTVV_STEPS = ['thuly', 'bosung', 'xacminh', 'thuongluong', 'quyetdinh', 'thucthi'];
var CTVV_STEP_OF = { 'Cử người giải quyết bồi thường': 0, 'Yêu cầu bổ sung': 1, 'Xác minh thiệt hại': 2, 'Thương lượng': 3, 'Chờ ban hành QĐ': 4, 'Chờ chi trả': 5, 'Hoàn thành': 5 };
// Bước hiện tại của tiến trình giải quyết bồi thường; trạng thái tạm dừng / chờ duyệt: bước trước khi tạm dừng / trình
function ctvvCurrentStep(claim) {
    var st = canonicalClaimStatus(claim.status);
    if (CTVV_STEP_OF[st] !== undefined) return CTVV_STEP_OF[st];
    var prev = '';
    var logs = claim.specialStatusLogs || [];
    if (logs.length && logs[logs.length - 1].previousStatus) prev = canonicalClaimStatus(logs[logs.length - 1].previousStatus);
    if (!prev && claim.hgqPrevStatus) prev = canonicalClaimStatus(claim.hgqPrevStatus);
    // Đã chuyển CQGQBT: bước tại thời điểm chuyển (dữ liệu mẫu chưa có hồ sơ luồng)
    if (!prev && claim.transferRequest && claim.transferRequest.prevStatus) prev = canonicalClaimStatus(claim.transferRequest.prevStatus);
    if (!prev && typeof gqRecord === 'function') {
        var rec = gqRecord(claim);
        var a = rec && rec.approval;
        if (a && a.prevStatus) prev = canonicalClaimStatus(a.prevStatus);
    }
    if (CTVV_STEP_OF[prev] !== undefined) return CTVV_STEP_OF[prev];
    // Suy theo dữ liệu đã có
    if (claim.negotiation) return 4;
    if (claim.xmTotalAmount !== undefined || (typeof getXmHistory === 'function' && getXmHistory(claim).length)) return 3;
    if (Array.isArray(claim.appointedOfficers) && claim.appointedOfficers.length) return 2;
    return 0;
}
function ctvvAccItem(id) { var h = ctvvEl('accHead_' + id); return h ? h.closest('.accordion-item') : null; }
function ctvvApplyStepBlocks(claim) {
    if (!claim || canonicalClaimStatus(claim.status) === 'Không thụ lý') return;
    var idx = ctvvCurrentStep(claim);
    CTVV_STEPS.forEach(function (id, i) {
        var it = ctvvAccItem(id); if (!it) return;
        if (id === 'thuly') { if (idx >= 2) it.style.display = 'block'; return; }
        if (id === 'bosung') { it.style.display = (claim.bosungLogs && claim.bosungLogs.length) ? 'block' : 'none'; return; }
        it.style.display = i <= idx ? 'block' : 'none';
    });
    // Đánh số lại các khối đang hiển thị
    var n = 1;
    document.querySelectorAll('#detailSubTabKqXl > .accordion-item').forEach(function (it) {
        if (it.style.display === 'none') return;
        var sp = it.querySelector('.accordion-header > span');
        if (sp) sp.textContent = (n++) + '. ' + sp.textContent.replace(/^\s*\d+\.\s*/, '');
    });
}
(function () {
    var origRA = window.renderAccordions;
    if (typeof origRA === 'function') window.renderAccordions = function (claim) {
        var r = origRA.apply(this, arguments);
        try { ctvvApplyStepBlocks(claim); } catch (e) { /* mockup */ }
        return r;
    };
    var origSCD = window.showCaseDetail;
    if (typeof origSCD === 'function') window.showCaseDetail = function (id, editMode) {
        var r = origSCD.apply(this, arguments);
        try {
            var claim = claimsList.find(function (c) { return c.id === id; });
            var t2 = ctvvEl('detailTab2Btn');
            if (claim && !editMode && t2 && t2.style.display !== 'none' && activeDetailTab === 'xu-ly') {
                var st = canonicalClaimStatus(claim.status);
                if (CTVV_STEP_OF[st] === undefined && !SPECIAL_STATUS_ALL_STATES.includes(st)) {
                    var acc = CTVV_STEPS[ctvvCurrentStep(claim)];
                    var it = ctvvAccItem(acc);
                    if (it && it.style.display !== 'none') forceOpenAccordion(acc);
                }
            }
            ctvvHistoryInit();
        } catch (e) { /* mockup */ }
        return r;
    };
})();
// "Lịch sử xử lý": thu gọn / mở rộng (mặc định thu gọn)
function ctvvHistoryInit() {
    var head = ctvvEl('ctvvHistHead'), box = ctvvEl('kqxlTimelineContainer');
    if (!head || !box) return;
    head.classList.remove('is-open');
    box.style.display = 'none';
}
function ctvvToggleHistory() {
    var head = ctvvEl('ctvvHistHead'), box = ctvvEl('kqxlTimelineContainer');
    if (!head || !box) return;
    var open = box.style.display === 'none';
    box.style.display = open ? 'flex' : 'none';
    head.classList.toggle('is-open', open);
}

// =====================================================================
// 3. Tab "Phục hồi danh dự"
// =====================================================================
function ctvvSecEditable(n) {
    if (!isDetailEditMode) return false;
    var probe = { 1: 'editPhddStep1No', 2: 'editPhddStep2ReceiveDate', 3: 'editPhddStep3NewsNumbers' }[n];
    var el = ctvvEl(probe);
    return !!el && el.style.display !== 'none' && !el.disabled;
}
// ---------- Tài liệu đính kèm của các khối (Thông báo / Ghi nhận ý kiến / Tổ chức phục hồi danh dự) ----------
window.renderPhddStepFiles = function (step) {
    var claim = ctvvClaim(); if (!claim) return;
    var wrapper = ctvvEl('phddStep' + step + 'FileWrapper');
    var status = ctvvEl('phddStep' + step + 'FileStatusText');
    if (!wrapper) return;
    if (status) status.style.display = 'none';
    var cont = ctvvEl(step === 1 ? 'phddStep1UploadContainer' : 'phddStep2DeclineUploadContainer');
    if (cont) cont.querySelectorAll('label.btn-upload-standard').forEach(function (l) { l.style.display = 'none'; });
    var keyF = 'phddStep' + step + 'Files';
    var files = claim[keyF] || [];
    if (ctvvSecEditable(step)) {
        var opinion = (document.querySelector('input[name="editPhddStep2Opinion"]:checked') || {}).value;
        ctvvDocsMount('ph' + step, wrapper.id, ctvvFromLegacy(files), {
            required: step === 1 || opinion === 'Từ chối', title: '',
            onSync: function (rows) {
                claim[keyF] = ctvvToLegacy(rows);
                claim['phddStep' + step + 'File'] = claim[keyF].length ? claim[keyF][0].name : null;
            }
        });
    } else {
        wrapper.innerHTML = ctvvDocsViewHtml(ctvvFromLegacy(files));
    }
};
window.renderPhddUploadedFiles = function () {
    var list = ctvvEl('phddMultiFilesList'); if (!list) return;
    var zone = ctvvEl('phddMultiUploadZone'); if (zone) zone.style.display = 'none';
    var claim = ctvvClaim();
    if (ctvvSecEditable(3)) {
        ctvvDocsMount('ph3', 'phddMultiFilesList', ctvvFromLegacy(phddUploadedFiles), {
            required: true, title: '',
            onSync: function (rows) { phddUploadedFiles = ctvvToLegacy(rows); if (claim) claim.phddUploadedFiles = phddUploadedFiles.slice(); }
        });
    } else {
        list.innerHTML = ctvvDocsViewHtml(ctvvFromLegacy(phddUploadedFiles));
    }
};
// Khối Ghi nhận ý kiến: Tài liệu đính kèm hiển thị với mọi ý kiến, bắt buộc khi "Từ chối quyền được phục hồi danh dự"
(function () {
    var orig = window.toggleStep2OpinionFields;
    if (typeof orig !== 'function') return;
    window.toggleStep2OpinionFields = function (value) {
        var r = orig.apply(this, arguments);
        var g = ctvvEl('phddStep2DeclineGroup');
        if (g) {
            g.style.display = 'block';
            var lb = g.querySelector('.form-label');
            if (lb) lb.innerHTML = 'Tài liệu đính kèm' + (value === 'Từ chối' ? ' <span class="required">*</span>' : '');
        }
        if (CTVV_DOCS.ph2 && ctvvEl('ctvvDocs_ph2')) { ctvvDocsSync('ph2'); CTVV_DOCS.ph2.required = value === 'Từ chối'; ctvvDocsRender('ph2'); }
        return r;
    };
})();
// ---------- Thành phần tham gia tổ chức phục hồi danh dự: a) Đại diện các cơ quan, b) Người yêu cầu bồi thường / người đại diện ----------
var ctvvNycRows = [];
function ctvvNycSync() {
    var wrap = ctvvEl('ctvvNycWrap'); if (!wrap) return;
    wrap.querySelectorAll('tr[data-ctvvnyc-idx]').forEach(function (tr) {
        var row = ctvvNycRows[Number(tr.getAttribute('data-ctvvnyc-idx'))]; if (!row) return;
        ['name', 'idNo', 'address'].forEach(function (f) { var el = tr.querySelector('[data-ctvvnyc-field="' + f + '"]'); if (el) row[f] = el.value.trim(); });
    });
}
function ctvvNycRender() {
    var wrap = ctvvEl('ctvvNycWrap'); if (!wrap) return;
    var err = '<div class="error-message" style="color:#dc2626; font-size:11px; display:none;">' + CTVV_REQ + '</div>';
    var rows = ctvvNycRows.map(function (p, i) {
        return '<tr data-ctvvnyc-idx="' + i + '"><td style="text-align:center;">' + (i + 1) + '</td>'
            + '<td><input type="text" class="form-control form-control-sm" id="ctvvNycName_' + i + '" data-ctvvnyc-field="name" value="' + ctvvE(p.name) + '" placeholder="Nhập họ và tên..." oninput="ptClearErr(this)">' + err + '</td>'
            + '<td><input type="text" class="form-control form-control-sm" id="ctvvNycIdNo_' + i + '" data-ctvvnyc-field="idNo" value="' + ctvvE(p.idNo) + '" placeholder="Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế"></td>'
            + '<td><input type="text" class="form-control form-control-sm" id="ctvvNycAddress_' + i + '" data-ctvvnyc-field="address" value="' + ctvvE(p.address) + '" placeholder="Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia"></td>'
            + '<td style="text-align:center;"><button type="button" class="btn btn-sm btn-outline-danger" onclick="ctvvNycRemove(' + i + ')" title="Xóa"><i class="fa-solid fa-trash"></i> Xóa</button></td></tr>';
    }).join('');
    wrap.innerHTML = '<table class="custom-table pt-table" id="ctvvNycTable" style="background:white; font-size:12.5px; margin:0;">'
        + '<thead><tr style="background-color:#f8fafc;"><th style="width:50px; text-align:center;">STT</th><th>Họ và tên <span class="required">*</span></th><th style="width:26%;">Số giấy tờ</th><th style="width:30%;">Địa chỉ</th><th style="width:90px; text-align:center;">Thao tác</th></tr></thead>'
        + '<tbody>' + (rows || '<tr><td colspan="5" style="text-align:center; color:#94a3b8; font-style:italic;">Chưa có thành viên. Bấm "Thêm người yêu cầu/người đại diện" để bổ sung.</td></tr>') + '</tbody></table>';
}
function ctvvNycAdd() { ctvvNycSync(); ctvvNycRows.push({ name: '', idNo: '', address: '' }); ctvvNycRender(); var el = ctvvEl('ctvvNycName_' + (ctvvNycRows.length - 1)); if (el) el.focus(); }
function ctvvNycRemove(i) {
    ctvvNycSync();
    var row = ctvvNycRows[i]; if (!row) return;
    var doRemove = function () { ctvvNycSync(); ctvvNycRows.splice(i, 1); ctvvNycRender(); };
    if (!row.name && !row.idNo && !row.address) { doRemove(); return; }
    showConfirmModal('Bạn có chắc chắn muốn xóa thành viên "' + (row.name || ('dòng ' + (i + 1))) + '" khỏi danh sách Thành phần tham gia không?', doRemove,
        { title: 'Xác nhận xóa thành viên', btnYesText: 'Xóa', btnNoText: 'Hủy', btnYesClass: 'btn-danger' });
}
function ctvvNycValidate() {
    ctvvNycSync();
    var ok = true;
    ctvvNycRows.forEach(function (p, i) { var bad = !p.name && (!!p.idNo || !!p.address); fieldErr(ctvvEl('ctvvNycName_' + i), bad); if (bad) ok = false; });
    var none = !ctvvNycRows.some(function (p) { return p.name; });
    var err = ctvvEl('ctvvNycErr'); if (err) err.style.display = none ? 'block' : 'none';
    if (none) { fieldErr(ctvvEl('ctvvNycName_0'), true); ok = false; }
    return ok;
}
function ctvvNycValues() { ctvvNycSync(); return ctvvNycRows.filter(function (p) { return p.name; }).map(function (p) { return { name: p.name, idNo: p.idNo, address: p.address }; }); }
function ctvvPtRender(claim) {
    var cb = ctvvEl('phddStep3Member_totung');
    var grp = cb ? cb.closest('.form-group') : null;
    if (!grp) return;
    grp.style.display = 'none';
    var host = ctvvEl('ctvvPhddPtHost');
    if (!host) { host = document.createElement('div'); host.id = 'ctvvPhddPtHost'; grp.parentNode.insertBefore(host, grp.nextSibling); }
    var off = Array.isArray(claim.phddStep3Participants) ? claim.phddStep3Participants : [];
    var nyc = Array.isArray(claim.phddStep3Claimants) ? claim.phddStep3Claimants : [];
    if (ctvvSecEditable(3)) {
        host.innerHTML = '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:6px; padding:12px 14px;">'
            + '<span class="form-label" style="font-weight:700; margin:0;">Thành phần tham gia</span>'
            + '<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-top:8px;"><span style="font-weight:600; font-size:12.5px; color:#1e293b;">a) Đại diện các cơ quan</span><button type="button" class="btn btn-secondary btn-sm" onclick="ptAddRow(\'ctvvph\'); ctvvPtHeader()"><i class="fa-solid fa-plus"></i> Thêm đại diện cơ quan</button></div>'
            + '<div id="ptTableWrap_ctvvph" style="margin-top:6px;"></div>'
            + '<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-top:12px;"><span style="font-weight:600; font-size:12.5px; color:#1e293b;">b) Người yêu cầu bồi thường / người đại diện <span class="required">*</span></span><button type="button" class="btn btn-secondary btn-sm" onclick="ctvvNycAdd()"><i class="fa-solid fa-plus"></i> Thêm người yêu cầu/người đại diện</button></div>'
            + '<div id="ctvvNycWrap" style="margin-top:6px;"></div><div class="error-message" id="ctvvNycErr" style="color:#dc2626; font-size:12px; display:none;">' + CTVV_REQ + '</div></div>';
        ptInit('ctvvph', off);
        ctvvPtHeader();
        ctvvNycRows = (nyc.length ? nyc : [{}]).map(function (p) { return { name: p.name || '', idNo: p.idNo || '', address: p.address || '' }; });
        ctvvNycRender();
        return;
    }
    var html = typeof tlptParticipantsReadHtml === 'function' ? tlptParticipantsReadHtml({ participants: off, claimantParticipants: nyc }) : '';
    html = html.replace('Thành phần tham gia thương lượng', 'Thành phần tham gia').replace('id="tlParticipantsRead"', 'id="ctvvPhddPtRead"').replace('id="tlptNycRead"', 'id="ctvvPhddNycRead"');
    if (!off.length && !nyc.length && typeof phddMembersText === 'function') {
        var legacy = phddMembersText('phddStep3', 'editPhddStep3MemberOtherText', 3);
        if (legacy && legacy !== '-') html += '<div style="font-size:12.5px; color:#475569; margin:-4px 0 10px;">' + ctvvE(legacy) + '</div>';
    }
    host.innerHTML = html;
}
// Bảng a) dùng chung cơ chế pt* (key 'ctvvph'): cột Đơn vị công tác như Thương lượng
function ctvvPtHeader() {
    var t = ctvvEl('ptTable_ctvvph'); if (!t) return;
    var ths = t.querySelectorAll('thead th'); if (ths[3]) ths[3].textContent = 'Đơn vị công tác';
    var em = t.querySelector('tbody td[colspan]'); if (em) em.textContent = 'Chưa có thành phần. Bấm "Thêm đại diện cơ quan" để bổ sung.';
}
(function () {
    var origPR = window.ptRender;
    if (typeof origPR === 'function') window.ptRender = function (key) { var r = origPR.apply(this, arguments); if (key === 'ctvvph') ctvvPtHeader(); return r; };
})();
// Trước khi lưu khối Tổ chức phục hồi danh dự: kiểm tra Thành phần tham gia + Tài liệu đính kèm
function ctvvBeforeStep3Save() {
    var claim = ctvvClaim(); if (!claim) return false;
    var ok = true;
    var direct = ctvvEl('phddStep3DirectGroup');
    if (direct && direct.style.display !== 'none' && ctvvEl('ptTableWrap_ctvvph')) {
        var ok1 = ptValidate('ctvvph', false);
        var ok2 = ctvvNycValidate();
        ok = ok1 && ok2;
        claim.phddStep3Participants = ptValues('ctvvph');
        claim.phddStep3Claimants = ctvvNycValues();
        // Thành phần tham gia nhập theo bảng: bỏ các ô chọn cũ
        var a = ctvvEl('phddStep3Member_coquan'), b = ctvvEl('phddStep3Member_totung'), c = ctvvEl('phddStep3Member_canhan');
        if (a) a.checked = true; if (b) b.checked = false; if (c) c.checked = false;
    }
    if (!ctvvDocsValidate('ph3', true)) ok = false;
    if (!ok) showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'error');
    return ok;
}
function ctvvAfterLegacyFileErr() {
    var zone = ctvvEl('phddMultiUploadZone');
    if (zone && zone.parentNode) zone.parentNode.querySelectorAll('.error-feedback').forEach(function (e) { e.remove(); });
}
(function () {
    var c3 = window.completePhddStep3;
    if (typeof c3 === 'function') window.completePhddStep3 = function () { if (!ctvvBeforeStep3Save()) return; var r = c3.apply(this, arguments); ctvvAfterLegacyFileErr(); return r; };
    var u3 = window.updatePhddStep3NoLock;
    if (typeof u3 === 'function') window.updatePhddStep3NoLock = function () {
        var btn = ctvvEl('btnUpdatePhddStep3');
        if (btn && btn.innerHTML.indexOf('Lưu thông tin cập nhật') >= 0 && !ctvvBeforeStep3Save()) return;
        var r = u3.apply(this, arguments); ctvvAfterLegacyFileErr(); return r;
    };
    var beforeStep2 = function () {
        var opinion = (document.querySelector('input[name="editPhddStep2Opinion"]:checked') || {}).value;
        if (!ctvvDocsValidate('ph2', opinion === 'Từ chối')) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'error'); return false; }
        return true;
    };
    var s2 = window.submitPhddStep2Opinion;
    if (typeof s2 === 'function') window.submitPhddStep2Opinion = function () { if (!beforeStep2()) return; return s2.apply(this, arguments); };
    var u2 = window.updatePhddStep2NoLock;
    if (typeof u2 === 'function') window.updatePhddStep2NoLock = function () {
        var btn = ctvvEl('btnUpdatePhddStep2');
        if (btn && btn.innerHTML.indexOf('Lưu thông tin cập nhật') >= 0 && !beforeStep2()) return;
        return u2.apply(this, arguments);
    };
    // Bật / tắt chế độ nhập của từng khối: vẽ lại bảng (bảng nhập hoặc bảng chỉ xem)
    [1, 2, 3].forEach(function (n) {
        var name = 'setSection' + n + 'InputsDisabled';
        var o = window[name];
        if (typeof o !== 'function') return;
        window[name] = function () {
            var r = o.apply(this, arguments);
            try {
                var claim = ctvvClaim();
                if (claim && ctvvEl('detailSubTabPhdd')) {
                    if (n === 3) { window.renderPhddUploadedFiles(); ctvvPtRender(claim); }
                    else window.renderPhddStepFiles(n);
                    if (n === 1) ctvvM26Decorate(claim);
                }
            } catch (e) { /* mockup */ }
            return r;
        };
    });
    var rh = window.renderHonorRestorationTab;
    if (typeof rh === 'function') window.renderHonorRestorationTab = function (claim) {
        var r = rh.apply(this, arguments);
        try {
            window.renderPhddStepFiles(1); window.renderPhddStepFiles(2); window.renderPhddUploadedFiles();
            ctvvPtRender(claim);
            ctvvM26Decorate(claim);
            if (typeof syncStep2OpinionFields === 'function') syncStep2OpinionFields();
        } catch (e) { /* mockup */ }
        return r;
    };
})();
// Vụ việc Chỉ yêu cầu phục hồi danh dự: tiêu đề màn chi tiết cùng mẫu với các vụ việc khác (Mã vụ việc - Họ và tên người yêu cầu)
(function () {
    var o = window.phddRenderDetailView;
    if (typeof o !== 'function') return;
    window.phddRenderDetailView = function (claim, editMode) {
        var r = o.apply(this, arguments);
        var t = ctvvEl('caseDetailTitle');
        if (t && claim) t.innerHTML = editMode
            ? '<i class="fa-solid fa-pen-to-square"></i> CẬP NHẬT TIẾN TRÌNH VỤ VIỆC: ' + ctvvE(claimVvLabel(claim))
            : '<i class="fa-solid fa-circle-info"></i> CHI TIẾT VỤ VIỆC VÀ TIẾN TRÌNH GIẢI QUYẾT: ' + ctvvE(claimVvLabel(claim));
        return r;
    };
})();
// ---------- Tên 03 tab cố định cho mọi vụ việc ----------
window.phddSetTabLabels = function () {
    var t = { detailTab1Btn: '<i class="fa-solid fa-user-tie"></i> Thông tin hồ sơ vụ việc', detailTab2Btn: '<i class="fa-solid fa-list-check"></i> Chi tiết giải quyết bồi thường', detailTab3Btn: '<i class="fa-solid fa-ribbon"></i> Phục hồi danh dự' };
    Object.keys(t).forEach(function (id) { var b = ctvvEl(id); if (b) b.innerHTML = t[id]; });
};

// =====================================================================
// 4. Trình ký Thông báo tổ chức thực hiện phục hồi danh dự (Mẫu số 26/BTNN)
// =====================================================================
var ctvvmClaim = null, ctvvmDocSrc = 'gen', ctvvmOnlineFile = null, ctvvmOfflineFile = null;
function ctvvmIsOffline() { var r = ctvvEl('ctvvmSigningMethodOffline'); return !!(r && r.checked); }
function ctvvmClearErr(id) { var el = ctvvEl(id); if (el) el.classList.remove('is-invalid'); var er = ctvvEl(id + 'Err'); if (er) er.style.display = 'none'; }
function ctvvmSetErr(id, msg) { var el = ctvvEl(id); if (el) el.classList.add('is-invalid'); var er = ctvvEl(id + 'Err'); if (er) { er.textContent = msg || CTVV_REQ; er.style.display = 'block'; } return el; }
function ctvvmForms(claim) {
    var f = typeof phddFormsOf === 'function' ? phddFormsOf(claim) : { apology: true, news: false };
    return { apology: !!f.apology, news: !!f.news };
}
// (3) (4) Người bị thiệt hại theo văn bản làm căn cứ yêu cầu bồi thường
function ctvvmVictim(claim) {
    var nb = claim.nbth && claim.nycRole && claim.nycRole !== NBTH_ROLE ? claim.nbth : null;
    if (nb) return { name: nb.name || '', address: joinClaimAddress(nb.address, stripWardCode(nb.ward), nb.city) || '' };
    return { name: getClaimRequesterName(claim) || '', address: (typeof getClaimNycAddressLine === 'function' ? getClaimNycAddressLine(claim) : '') || claim.address || '' };
}
// (5) Văn bản làm căn cứ yêu cầu bồi thường
function ctvvmBaseDoc(claim) {
    var vb = (typeof normalizeVanBanCanCuList === 'function' ? normalizeVanBanCanCuList(claim.vanBanCanCu) : []).filter(function (r) { return r.name; });
    return claim.docBase || claim.verdictNumber || (vb[0] && vb[0].name) || '';
}
function ctvvmUnitName(claim) {
    try { var p = gqDocParts(claim); return p.issuer || claim.agency || ''; } catch (e) { return claim.agency || ''; }
}
function ctvvmDocBase(claim) { return 'Mau_26_BTNN_Thong_bao_phuc_hoi_danh_du_' + ((typeof claimVvCode === 'function' && claimVvCode(claim)) || claim.code); }
// "dd/mm/yyyy HH:mm" -> "HH giờ mm ngày dd/mm/yyyy"
function ctvvmTimeText(v) {
    var m = String(v || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);
    if (!m) return String(v || '');
    return m[4].padStart(2, '0') + ' giờ ' + m[5] + ' ngày ' + m[1].padStart(2, '0') + '/' + m[2].padStart(2, '0') + '/' + m[3];
}
// (7) Nội dung theo Hình thức phục hồi danh dự của hồ sơ
function ctvvmC7Lines(x) {
    var dots = '………';
    var L = [];
    if (x.forms.apology) {
        L.push('Về việc tổ chức trực tiếp xin lỗi và cải chính công khai:');
        L.push('- Dự kiến thời gian :' + (x.time ? ' ' + ctvvmTimeText(x.time) : dots));
        L.push('- Dự kiến địa điểm :' + (x.place ? ' ' + x.place : dots));
    }
    if (x.forms.news) {
        L.push('Về việc đăng báo xin lỗi và cải chính công khai:');
        L.push('- Dự kiến tờ báo đăng:' + (x.paper ? ' ' + x.paper : dots));
        if (x.portal) L.push('- Dự kiến việc đăng tải nội dung xin lỗi và cải chính công khai trên Cổng thông tin điện tử của ' + (x.portalAgency || '........'));
    }
    return L;
}
function ctvvmFormData() {
    var claim = ctvvmClaim;
    var v = function (id) { var el = ctvvEl(id); return el ? String(el.value || '').trim() : ''; };
    return {
        forms: ctvvmForms(claim),
        docNumber: v('ctvvmDocNumber'), docDate: v('ctvvmDocDate'), agency6: v('ctvvmAgency6'),
        time: v('ctvvmTime'), place: v('ctvvmPlace'), paper: v('ctvvmPaper'),
        portal: !!(ctvvEl('ctvvmPortal') && ctvvEl('ctvvmPortal').checked), portalAgency: v('ctvvmPortalAgency'),
        noiNhan: v('ctvvmNoiNhan').split(/\n/).map(function (s) { return s.trim(); }).filter(Boolean)
    };
}
// Văn bản Mẫu số 26/BTNN sinh từ thông tin đang nhập (câu chữ theo mẫu user cung cấp)
function ctvvmBuildMau26(claim, x) {
    var p = gqDocParts(claim);
    var P = 'margin:6pt 0; text-align:justify; text-indent:1cm;';
    var vic = ctvvmVictim(claim);
    var a6 = ctvvE(x.agency6 || '……..….(6)……..');
    var base5 = ctvvmBaseDoc(claim);
    var c7 = ctvvmC7Lines(x).map(function (l) { return '<p style="' + P + '">' + ctvvE(l) + '</p>'; }).join('');
    var nn = (x.noiNhan && x.noiNhan.length ? x.noiNhan : CTVV_NOI_NHAN_DEFAULT).map(ctvvE).join('<br>');
    return p.W.docHeaderHtml(p.unitId, CTVV_FORM, 'TB', { soKyHieu: x.docNumber, ngay: x.docDate })
        + '<p style="text-align:center; margin:18pt 0 6pt;"><b>THÔNG BÁO</b><br><b>Về việc tổ chức thực hiện phục hồi danh dự</b></p>'
        + '<p style="text-align:center; margin:6pt 0;">Kính gửi: ' + ctvvE(vic.name || '…………………………(3)………') + '</p>'
        + '<p style="text-align:center; margin:0 0 10pt;">Địa chỉ: ' + ctvvE(vic.address || '……………………………(4)………') + '</p>'
        + '<p style="' + P + '">Căn cứ Điều 57 Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16) về chủ động phục hồi danh dự;' + ctvvE(base5 ? ' ' + base5 : '………...(5)……..') + ', ' + a6 + ' dự kiến tổ chức thực hiện phục hồi danh dự đối với Ông/Bà, cụ thể như sau:</p>'
        + c7
        + '<p style="' + P + '">Trong thời hạn 07 ngày làm việc kể từ ngày nhận được thông báo này, đề nghị Ông/Bà ghi có ý kiến bằng văn bản và gửi lại cho ' + a6 + '. Trường hợp Ông/bà trả lời bằng lời nói, đề nghị Ông/bà đến trụ sở ' + a6 + ' để thực hiện.</p>'
        + '<p style="' + P + '">Hết thời hạn trả lời nêu trên mà Ông/Bà không trả lời thì việc phục hồi danh dự sẽ được thực hiện khi Ông/Bà có yêu cầu bằng văn bản./.</p>'
        + '<table style="width:100%; border-collapse:collapse; margin-top:18pt;"><tr>'
        + '<td style="width:50%; vertical-align:top; font-size:12pt;"><b><i>Nơi nhận:</i></b><br>' + nn + '</td>'
        + '<td style="text-align:center; vertical-align:top;"><b>Thủ trưởng cơ quan</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i></td></tr></table>';
}
function ctvvmBuildDoc() { return ctvvmClaim ? { html: ctvvmBuildMau26(ctvvmClaim, ctvvmFormData()), base: ctvvmDocBase(ctvvmClaim) } : null; }

function ctvvmEnsureModal() {
    if (ctvvEl('modalCtvvm')) return;
    var card = function (id, val, title, desc, ico, off, checked) {
        return '<label class="sign-card' + (checked ? ' active' : '') + '" id="' + id + '" for="ctvvmSigningMethod' + (off ? 'Offline' : 'Online') + '">'
            + '<input type="radio" name="ctvvmSigningMethod" id="ctvvmSigningMethod' + (off ? 'Offline' : 'Online') + '" value="' + val + '"' + (checked ? ' checked' : '') + ' onchange="ctvvmToggleSigningMethod(\'' + val + '\')">'
            + '<div class="sign-card-content"><div class="sign-card-icon' + (off ? ' offline' : '') + '"><i class="fa-solid ' + ico + '"></i></div><div class="sign-card-text"><div class="sign-card-title">' + title + '</div><div class="sign-card-desc">' + desc + '</div></div></div>'
            + '<div class="sign-card-check"><i class="' + (checked ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle') + '"></i></div></label>';
    };
    var fld = function (id, label, req, ctrl, cls) {
        return '<div class="gqx-field' + (cls ? ' ' + cls : '') + '" id="' + id + 'Field"><label class="form-label" for="' + id + '">' + label + (req ? '<span class="gqx-req">*</span>' : '') + '</label>' + ctrl + '<div id="' + id + 'Err" class="gqx-err">' + CTVV_REQ + '</div></div>';
    };
    var dateCtrl = function (id, ph, fmt) {
        return '<div class="gqx-date"><input type="text" id="' + id + '" class="form-control" placeholder="' + ph + '" readonly onchange="ctvvmClearErr(\'' + id + '\')"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById(\'' + id + '\'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ' + (fmt ? 'thời điểm' : 'ngày') + '"></i></div>';
    };
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modalCtvvm" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div id="modalCtvvmContainer" class="sticky-modal-container" style="background:#fff; width:850px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3); transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">'
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#dcfce7; color:#16a34a; font-size:14px;"><i class="fa-solid fa-ribbon"></i></span><span>TRÌNH KÝ THÔNG BÁO TỔ CHỨC THỰC HIỆN PHỤC HỒI DANH DỰ</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Mã vụ việc: <strong id="ctvvmClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người yêu cầu: <span id="ctvvmClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="ctvvmClaimAgency" style="font-weight:500; color:#475569;">--</span></div>'
        + '</div><button type="button" onclick="closeCtvvmModal()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        + '<div id="ctvvmStepperBar" class="ktl-stepper-fullwidth"><div id="ctvvmStep1Tab" class="ktl-step-tab active" onclick="ctvvmGoStep1()"><span class="ktl-step-badge" id="ctvvmStep1Badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div>'
        + '<div class="ktl-stepper-sep"><i class="fa-solid fa-chevron-right"></i></div><div id="ctvvmStep2Tab" class="ktl-step-tab" onclick="ctvvmGoStep2()"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
        + '<div id="ctvvmStep1Body" class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div id="ctvvmReturnedAlertBlock" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;"><div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#b45309; margin-bottom:4px;"><i class="fa-solid fa-circle-exclamation"></i> HỒ SƠ BỊ LÃNH ĐẠO TRẢ LẠI</div><div style="font-size:12.5px; color:#92400e; line-height:1.5;">Lý do bị trả lại: <strong id="ctvvmReturnedReason">--</strong><br>Người từ chối: <span id="ctvvmReturnedOfficer">--</span> • Thời điểm: <span id="ctvvmReturnedDate">--</span></div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
        + card('ctvvmCardSignOnline', 'online', 'Ký số trên hệ thống', 'Trình Lãnh đạo ký duyệt trên phần mềm', 'fa-file-signature', false, true)
        + card('ctvvmCardSignOffline', 'offline', 'Ký ngoài (Ban hành trực tiếp)', 'Tải lên văn bản PDF đã ký và đóng dấu', 'fa-stamp', true, false)
        + '</div></div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-ribbon"></i> Thông tin phục hồi danh dự</div><div id="ctvvmInfo" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px 12px; font-size:13px; color:#334155;"></div></div>'
        + '<div class="gqx-sec" id="ctvvmDocSection"><div class="gqx-sec-title" id="ctvvmDocSectionTitle"><i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span></div>'
        + '<div id="ctvvmDocSrcGroup"><div class="doc-src-segmented"><button type="button" class="doc-src-seg-btn active" id="ctvvmSegBtnGen" onclick="ctvvmSetDocSrc(\'gen\')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 26/BTNN</span></button><button type="button" class="doc-src-seg-btn" id="ctvvmSegBtnUpload" onclick="ctvvmSetDocSrc(\'upload\')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button></div></div>'
        + '<div id="ctvvmDocMetaGroup" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:12px;"><div style="font-size:12px; font-weight:700; color:#334155; text-transform:uppercase; letter-spacing:0.3px; margin-bottom:10px; display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu 26/BTNN</div>'
        + '<div class="gqx-grid2" style="margin-bottom:10px;">'
        + fld('ctvvmDocNumber', 'Số, ký hiệu văn bản', true, '<input type="text" id="ctvvmDocNumber" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="ctvvmClearErr(\'ctvvmDocNumber\')">')
        + fld('ctvvmDocDate', 'Ngày văn bản', true, dateCtrl('ctvvmDocDate', 'dd/mm/yyyy'))
        + '</div>'
        + fld('ctvvmAgency6', 'Cơ quan thực hiện việc phục hồi danh dự', true, '<input type="text" id="ctvvmAgency6" class="form-control" maxlength="255" placeholder="Nhập tên cơ quan thực hiện việc phục hồi danh dự" oninput="ctvvmClearErr(\'ctvvmAgency6\')">')
        + '<div id="ctvvmC7Apology" class="ctvv-m26-c7" style="margin-top:10px;"><div class="ctvv-sub">Về việc tổ chức trực tiếp xin lỗi và cải chính công khai</div><div class="gqx-grid2">'
        + fld('ctvvmTime', 'Dự kiến thời gian', true, dateCtrl('ctvvmTime', 'dd/mm/yyyy HH:mm', true))
        + fld('ctvvmPlace', 'Dự kiến địa điểm', true, '<input type="text" id="ctvvmPlace" class="form-control" maxlength="500" placeholder="Nhập dự kiến địa điểm tổ chức trực tiếp xin lỗi" oninput="ctvvmClearErr(\'ctvvmPlace\')">')
        + '</div></div>'
        + '<div id="ctvvmC7News" class="ctvv-m26-c7"><div class="ctvv-sub">Về việc đăng báo xin lỗi và cải chính công khai</div>'
        + fld('ctvvmPaper', 'Dự kiến tờ báo đăng', true, '<input type="text" id="ctvvmPaper" class="form-control" maxlength="500" placeholder="Nhập dự kiến tờ báo đăng" oninput="ctvvmClearErr(\'ctvvmPaper\')">')
        + '<label style="display:flex; align-items:center; gap:8px; font-weight:500; cursor:pointer; margin:4px 0 8px;"><input type="checkbox" id="ctvvmPortal" onchange="ctvvmTogglePortal()"> Dự kiến đăng tải trên Cổng thông tin điện tử</label>'
        + fld('ctvvmPortalAgency', 'Tên cơ quan trực tiếp quản lý người thi hành công vụ', true, '<input type="text" id="ctvvmPortalAgency" class="form-control" maxlength="255" placeholder="Nhập tên cơ quan trực tiếp quản lý người thi hành công vụ" oninput="ctvvmClearErr(\'ctvvmPortalAgency\')">')
        + '</div>'
        + '<div class="gqx-field" style="margin-bottom:0;"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;"><label class="form-label" for="ctvvmNoiNhan" style="margin-bottom:0;">Nơi nhận</label><span style="font-size:11.5px; color:#64748b;"><i class="fa-solid fa-circle-info"></i> Mỗi nơi nhận trên 01 dòng</span></div><textarea id="ctvvmNoiNhan" class="form-control" rows="3" style="font-size:12.5px; line-height:1.5; resize:vertical;" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng..."></textarea></div></div>'
        + '<div id="ctvvmOnlineSection"><input type="file" id="ctvvmOnlineFileInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="ctvvmOnlineUpload(this)"><div id="ctvvmDocFileBox"></div><div id="ctvvmDocFileError" class="gqx-err">' + CTVV_REQ + '</div></div>'
        + '<div id="ctvvmOfflineSection" style="display:none;"><input type="file" id="ctvvmOfflineFileInput" accept=".pdf" style="display:none;" onchange="ctvvmOfflineUpload(this)">'
        + '<div id="ctvvmOfflineDrop" class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'ctvvmOfflineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="ctvvmDropOffline(event)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a></div><div class="ktlx-drop-sub">(Chỉ chấp nhận .pdf, tối đa 50MB)</div></div>'
        + '<div id="ctvvmOfflineFileRow" style="display:none;"></div><div id="ctvvmOfflineFileErr" class="gqx-err">' + CTVV_OFF_MSG + '</div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và tiến trình phục hồi danh dự chuyển sang bước tiếp theo.</div></div>'
        + '</div>'
        + '<div id="ctvvmTlkt"></div>'
        + '</div>'
        + '<div id="ctvvmStep2Body" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; position:relative;">'
        + '<div style="flex:1; overflow-y:auto; overflow-x:auto; padding:30px 20px; display:flex; justify-content:center; align-items:flex-start;"><div id="ctvvmA4Page" class="a4-document-page"><div id="ctvvmA4Content"></div></div></div>'
        + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:16px; overflow-y:auto; box-shadow:-4px 0 15px rgba(0,0,0,0.05); z-index:20;">'
        + '<div><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; CHỮ KÝ</div><div style="font-size:12px; color:#64748b; margin-top:4px;">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div></div>'
        + '<div id="ctvvmSignLevels" style="display:flex; flex-direction:column; gap:12px;"></div>'
        + '<div style="font-size:11.5px; color:#64748b;">Bấm <strong>Đặt chữ ký</strong> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>'
        + '<div class="form-group" style="margin-bottom:0;"><label class="form-label" for="ctvvmSignContent" style="font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block;">Nội dung trình <span style="color:#dc2626;">*</span></label><textarea id="ctvvmSignContent" class="form-control" rows="4" style="font-size:13px;" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="this.classList.remove(\'is-invalid\'); var e=document.getElementById(\'ctvvmSignContentErr\'); if(e) e.style.display=\'none\';"></textarea><div id="ctvvmSignContentErr" class="error-message" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">' + CTVV_REQ + '</div></div>'
        + '</div></div>'
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;"><div style="display:flex; gap:10px; margin-left:auto;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeCtvvmModal()">Hủy bỏ</button>'
        + '<button id="ctvvmBtnSubmitOffline" type="button" class="btn btn-primary" onclick="ctvvmSubmitOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
        + '<button id="ctvvmBtnNextStep" type="button" class="btn btn-primary" onclick="ctvvmGoStep2()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>'
        + '<button id="ctvvmBtnBackStep1" type="button" class="btn btn-secondary" onclick="ctvvmGoStep1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
        + '<button id="ctvvmBtnSubmitOnline" type="button" class="btn btn-primary" onclick="ctvvmSubmitOnline()" style="display:none; background:#16a34a; border-color:#16a34a; box-shadow:0 2px 6px rgba(22,163,74,0.3); font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình</button>'
        + '</div></div></div></div>';
    document.body.appendChild(wrap.firstChild);
}
function ctvvmTogglePortal() {
    var on = !!(ctvvEl('ctvvmPortal') && ctvvEl('ctvvmPortal').checked);
    var f = ctvvEl('ctvvmPortalAgencyField'); if (f) f.style.display = on ? '' : 'none';
    if (!on) ctvvmClearErr('ctvvmPortalAgency');
}
function ctvvmRenderInfo(claim) {
    var box = ctvvEl('ctvvmInfo'); if (!box) return;
    var vic = ctvvmVictim(claim), forms = ctvvmForms(claim);
    var fText = [forms.apology ? 'Trực tiếp xin lỗi và cải chính công khai' : '', forms.news ? 'Đăng báo xin lỗi và cải chính công khai' : ''].filter(Boolean).join('; ');
    var row = function (l, v) { return '<div><b style="color:#64748b; font-weight:600;">' + l + ':</b> ' + ctvvE(v || '--') + '</div>'; };
    box.innerHTML = row('Người bị thiệt hại', vic.name) + row('Địa chỉ', vic.address) + row('Văn bản làm căn cứ yêu cầu bồi thường', ctvvmBaseDoc(claim))
        + row('Lĩnh vực', typeof getFieldGroupName === 'function' ? getFieldGroupName(claim.fieldGroup) : claim.fieldGroup) + row('Hình thức phục hồi danh dự', fText);
}
// Mở từ khối Thông báo phục hồi danh dự (chế độ cập nhật) hoặc thao tác "Cập nhật" vụ việc Bị trả lại có Loại trình này
function openCtvvmModal(claimId) {
    var claim = gqClaim(claimId || selectedClaimId);
    if (!claim) return;
    ctvvmEnsureModal();
    gqFrameFull(true);
    ctvvmClaim = claim;
    ctvvmOnlineFile = null; ctvvmOfflineFile = null;
    var W = gqW();
    var rec = gqRecord(claim);
    var prev = rec && rec.status === 'Bị trả lại' && rec.approval && rec.approval.kind === CTVV_KIND ? rec.approval : null;
    var sd = (prev && prev.signDoc) || {};
    var ret = prev ? (rec.returned || {}) : null;
    ctvvEl('ctvvmReturnedAlertBlock').style.display = prev ? 'block' : 'none';
    if (prev) {
        ctvvEl('ctvvmReturnedReason').innerText = ret.reason || '--';
        ctvvEl('ctvvmReturnedOfficer').innerText = (ret.by && W ? W.userName(ret.by) : '') || '--';
        ctvvEl('ctvvmReturnedDate').innerText = ret.at || '--';
    }
    ctvvEl('ctvvmClaimCode').innerText = (typeof claimVvCode === 'function' && claimVvCode(claim)) || claim.code || '--';
    ctvvEl('ctvvmClaimNYC').innerText = getClaimRequesterName(claim) || '--';
    ctvvEl('ctvvmClaimAgency').innerText = claim.agency || '--';
    ctvvmRenderInfo(claim);
    var forms = ctvvmForms(claim);
    ctvvEl('ctvvmC7Apology').style.display = forms.apology ? '' : 'none';
    ctvvEl('ctvvmC7News').style.display = forms.news ? '' : 'none';
    var d = new Date(); var p2 = function (n) { return String(n).padStart(2, '0'); };
    var set = function (id, v) { var el = ctvvEl(id); if (el) el.value = v == null ? '' : v; };
    set('ctvvmDocNumber', sd.docNumber || '     /TB-');
    set('ctvvmDocDate', sd.docDate || (p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear()));
    set('ctvvmAgency6', sd.agency6 || ctvvmUnitName(claim));
    set('ctvvmTime', sd.time || '');
    set('ctvvmPlace', sd.place || '');
    set('ctvvmPaper', sd.paper || '');
    ctvvEl('ctvvmPortal').checked = !!sd.portal;
    set('ctvvmPortalAgency', sd.portalAgency || claim.officerAgency || '');
    ctvvmTogglePortal();
    set('ctvvmNoiNhan', (Array.isArray(sd.noiNhan) && sd.noiNhan.length ? sd.noiNhan : CTVV_NOI_NHAN_DEFAULT).join('\n'));
    ['ctvvmDocNumber', 'ctvvmDocDate', 'ctvvmAgency6', 'ctvvmTime', 'ctvvmPlace', 'ctvvmPaper', 'ctvvmPortalAgency'].forEach(ctvvmClearErr);
    if (typeof flatpickr !== 'undefined') {
        flatpickr(ctvvEl('ctvvmDocDate'), { dateFormat: 'd/m/Y', allowInput: true, defaultDate: ctvvEl('ctvvmDocDate').value, onChange: function () { ctvvmClearErr('ctvvmDocDate'); } });
        flatpickr(ctvvEl('ctvvmTime'), { enableTime: true, time_24hr: true, dateFormat: 'd/m/Y H:i', allowInput: true, defaultDate: ctvvEl('ctvvmTime').value || null, onChange: function () { ctvvmClearErr('ctvvmTime'); } });
    }
    ctvvEl('ctvvmSignContent').value = CTVV_CONTENT_DEFAULT;
    gqSignInit('ctvvm', claim, prev && Array.isArray(prev.assignees) ? prev.assignees : null);
    ctvvmOfflineRemove();
    ctvvmSetDocSrc('gen');
    tlktGqRestore('ctvvm', prev, {
        required: false,
        setSrc: function (src) { ctvvmSetDocSrc(src); },
        setFile: function (f) { ctvvmOnlineFile = f; ctvvmRenderDocBox(); }
    });
    ctvvEl('ctvvmSigningMethodOnline').checked = true;
    ctvvmToggleSigningMethod('online');
    ctvvmGoStep1();
    var modal = ctvvEl('modalCtvvm');
    modal.style.display = 'flex'; modal.classList.add('active'); modal.classList.add('visible');
}
function closeCtvvmModal() {
    gqFrameFull(false);
    ktlxCancelConvert('ctvvm');
    var modal = ctvvEl('modalCtvvm');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('active'); modal.classList.remove('visible'); }
    ctvvmClaim = null;
}
function ctvvmSetDocSrc(src) {
    ctvvmDocSrc = src === 'upload' ? 'upload' : 'gen';
    var isGen = ctvvmDocSrc === 'gen';
    ctvvEl('ctvvmSegBtnGen').classList.toggle('active', isGen);
    ctvvEl('ctvvmSegBtnUpload').classList.toggle('active', !isGen);
    ctvvmOnlineFile = null;
    ktlxCancelConvert('ctvvm');
    var fe = ctvvEl('ctvvmDocFileError'); fe.textContent = CTVV_REQ; fe.style.display = 'none';
    ctvvmApplyDocMeta();
    ctvvmRenderDocBox();
}
function ctvvmApplyDocMeta() { ctvvEl('ctvvmDocMetaGroup').style.display = (!ctvvmIsOffline() && ctvvmDocSrc === 'gen') ? '' : 'none'; }
function ctvvmToggleSigningMethod(method) {
    var isOnline = method === 'online';
    [['ctvvmCardSignOnline', isOnline], ['ctvvmCardSignOffline', !isOnline]].forEach(function (x) {
        var c = ctvvEl(x[0]); c.classList.toggle('active', x[1]);
        var ico = c.querySelector('.sign-card-check i'); if (ico) ico.className = x[1] ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    ctvvmApplyDocMeta();
    var bar = ctvvEl('ctvvmStepperBar');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !isOnline); bar.setAttribute('aria-hidden', isOnline ? 'false' : 'true');
    var show = function (id, on, disp) { var el = ctvvEl(id); if (el) el.style.display = on ? (disp || 'block') : 'none'; };
    show('ctvvmDocSrcGroup', isOnline);
    show('ctvvmOnlineSection', isOnline);
    show('ctvvmOfflineSection', !isOnline);
    show('ctvvmBtnSubmitOffline', !isOnline, 'inline-flex');
    show('ctvvmBtnNextStep', isOnline, 'inline-flex');
    if (typeof tlktShow === 'function') tlktShow('ctvvm', isOnline);
    ctvvEl('ctvvmDocSectionTitle').innerHTML = isOnline ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
}
function ctvvmRenderDocBox() {
    var box = ctvvEl('ctvvmDocFileBox'); if (!box) return;
    if (ctvvmDocSrc === 'gen') {
        box.innerHTML = '<div class="gqx-file-empty"><div class="gqx-file-hint"><i class="fa-solid fa-file-circle-check" style="color:#2563eb; font-size:16px; margin-right:6px;"></i>Hệ thống tự động sinh Thông báo theo Mẫu 26/BTNN từ thông tin đang nhập.</div><div class="gqx-file-actions"><button type="button" class="btn-preview-doc" onclick="ctvvmPreview()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div></div>';
        return;
    }
    if (ktlxConverting.ctvvm) { box.innerHTML = '<div class="ktlx-converting"><span class="ktlx-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    var f = ctvvmOnlineFile;
    box.innerHTML = !f
        ? '<div class="ktlx-drop" tabindex="0" role="button" onclick="document.getElementById(\'ctvvmOnlineFileInput\').click()" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); this.click();}" ondragover="ktlxDragOver(event)" ondragleave="ktlxDragLeave(event)" ondrop="ctvvmDropOnline(event)"><i class="fa-solid fa-cloud-arrow-up ktlx-drop-ico"></i><div class="ktlx-drop-main">Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a></div><div class="ktlx-drop-sub">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)</div></div>'
        : ktlxFileCardHtml(f.name, f.size, f.note, 'ctvvmOnlineView()', 'ctvvmOnlineRemove()');
}
function ctvvmDropOnline(e) { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); var fs = e.dataTransfer && e.dataTransfer.files; if (fs && fs.length) ctvvmOnlineUpload({ files: [fs[0]], value: '' }); }
function ctvvmDropOffline(e) { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); var fs = e.dataTransfer && e.dataTransfer.files; if (fs && fs.length) ctvvmOfflineUpload({ files: [fs[0]], value: '' }); }
function ctvvmValidateStep1() {
    var first = null;
    if (ctvvmDocSrc !== 'gen' || ctvvmIsOffline()) return null;
    var forms = ctvvmForms(ctvvmClaim);
    var req = function (id) { var el = ctvvEl(id); var v = el ? String(el.value || '').trim() : ''; if (!v) { first = first || ctvvmSetErr(id); return false; } ctvvmClearErr(id); return true; };
    req('ctvvmDocNumber');
    if (req('ctvvmDocDate') && typeof gqValidDateText === 'function' && !gqValidDateText(ctvvEl('ctvvmDocDate').value.trim())) first = first || ctvvmSetErr('ctvvmDocDate', 'Ngày văn bản không hợp lệ (dd/mm/yyyy)');
    req('ctvvmAgency6');
    if (forms.apology) { req('ctvvmTime'); req('ctvvmPlace'); }
    if (forms.news) { req('ctvvmPaper'); if (ctvvEl('ctvvmPortal').checked) req('ctvvmPortalAgency'); }
    return first;
}
function ctvvmPreview() {
    var bad = ctvvmValidateStep1();
    if (bad) { bad.focus(); return; }
    var doc = ctvvmBuildDoc();
    if (doc) gqW().openDocTab(doc.html, doc.base);
}
function ctvvmOnlineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var fe = ctvvEl('ctvvmDocFileError');
    var msg = ktlxCheckFile(file, ['.pdf', '.doc', '.docx']);
    if (msg) { fe.textContent = msg; fe.style.display = 'block'; showToast(msg, 'error'); return; }
    fe.textContent = CTVV_REQ; fe.style.display = 'none';
    var size = ktlxFmtSize(file.size);
    if (/\.docx?$/i.test(file.name)) {
        ctvvmOnlineFile = null; ktlxConverting.ctvvm = true; ktlxSetNextBusy('ctvvm', true); ctvvmRenderDocBox();
        var token = (ktlxConverting.ctvvmToken = (ktlxConverting.ctvvmToken || 0) + 1);
        setTimeout(function () {
            if (ktlxConverting.ctvvmToken !== token || !ktlxConverting.ctvvm) return;
            ktlxConverting.ctvvm = false; ktlxSetNextBusy('ctvvm', false);
            ctvvmOnlineFile = { name: file.name.replace(/\.docx?$/i, '.pdf'), size: size, source: 'uploaded', raw: file, note: 'Đã chuyển đổi từ ' + file.name };
            ctvvmRenderDocBox();
        }, 1200);
        return;
    }
    ctvvmOnlineFile = { name: file.name, size: size, source: 'uploaded', raw: file };
    ctvvmRenderDocBox();
}
function ctvvmOnlineView() { var f = ctvvmOnlineFile; if (!f) return; if (f.source === 'generated') gqW().openDocTab(f.bodyHtml, f.base); else gqOpenUploadedFile(f); }
function ctvvmOnlineRemove() { ctvvmOnlineFile = null; ktlxCancelConvert('ctvvm'); ctvvmRenderDocBox(); }
function ctvvmOfflineUpload(input) {
    if (!input || !input.files || !input.files.length) return;
    var file = input.files[0];
    input.value = '';
    var err = ctvvEl('ctvvmOfflineFileErr'), drop = ctvvEl('ctvvmOfflineDrop');
    var msg = ktlxCheckFile(file, ['.pdf']);
    if (msg) { err.textContent = msg; err.style.display = 'block'; drop.classList.add('is-error'); showToast(msg, 'error'); return; }
    ctvvmOfflineFile = { name: file.name, size: ktlxFmtSize(file.size), raw: file };
    var row = ctvvEl('ctvvmOfflineFileRow');
    row.innerHTML = ktlxFileCardHtml(ctvvmOfflineFile.name, ctvvmOfflineFile.size, '', 'gqOpenUploadedFile(ctvvmOfflineFile)', 'ctvvmOfflineRemove()');
    row.style.display = 'block';
    drop.style.display = 'none'; drop.classList.remove('is-error');
    err.textContent = CTVV_OFF_MSG; err.style.display = 'none';
}
function ctvvmOfflineRemove() {
    ctvvmOfflineFile = null;
    var row = ctvvEl('ctvvmOfflineFileRow'); if (row) { row.style.display = 'none'; row.innerHTML = ''; }
    var drop = ctvvEl('ctvvmOfflineDrop'); if (drop) { drop.style.display = ''; drop.classList.remove('is-error'); }
    var err = ctvvEl('ctvvmOfflineFileErr'); if (err) { err.textContent = CTVV_OFF_MSG; err.style.display = 'none'; }
}
function ctvvmGoStep1() {
    var c = ctvvEl('modalCtvvmContainer'); c.style.width = '850px'; c.style.maxWidth = '96%'; c.style.height = 'auto';
    ctvvEl('ctvvmStep1Tab').className = 'ktl-step-tab active';
    ctvvEl('ctvvmStep1Badge').innerHTML = '1';
    ctvvEl('ctvvmStep2Tab').className = 'ktl-step-tab';
    ctvvEl('ctvvmStep1Body').style.display = 'block';
    ctvvEl('ctvvmStep2Body').style.display = 'none';
    var off = ctvvmIsOffline();
    ctvvEl('ctvvmBtnNextStep').style.display = off ? 'none' : 'inline-flex';
    ctvvEl('ctvvmBtnSubmitOffline').style.display = off ? 'inline-flex' : 'none';
    ctvvEl('ctvvmBtnBackStep1').style.display = 'none';
    ctvvEl('ctvvmBtnSubmitOnline').style.display = 'none';
}
// Tiếp tục: kiểm tra Bước 1 (Thông tin điền vào Mẫu 26/BTNN hoặc tệp tải lên, dòng Tài liệu đính kèm) -> Bước 2
function ctvvmGoStep2() {
    if (!ctvvmClaim || ctvvmIsOffline()) return;
    if (ktlxConverting.ctvvm) { showToast('Đang chuyển đổi tệp sang PDF, vui lòng chờ hoàn tất.', 'warning'); return; }
    var first = ctvvmValidateStep1();
    if (ctvvmDocSrc !== 'gen' && !ctvvmOnlineFile) { ctvvEl('ctvvmDocFileError').style.display = 'block'; first = first || ctvvEl('ctvvmDocFileBox'); }
    var okT = typeof tlktValidate !== 'function' || tlktValidate('ctvvm');
    if (first || !okT) {
        if (first && first.focus) first.focus();
        showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'warning');
        return;
    }
    var content = ctvvEl('ctvvmA4Content');
    if (ctvvmDocSrc === 'gen') {
        var doc = ctvvmBuildDoc();
        ctvvmOnlineFile = { name: doc.base + '.doc', size: Math.max(1, Math.round(doc.html.length / 1024)) + ' KB', source: 'generated', base: doc.base, bodyHtml: doc.html };
        content.innerHTML = doc.html;
    } else {
        content.innerHTML = '<div style="text-align:center; padding-top:320px; color:#475569;"><i class="fa-solid fa-file-lines" style="font-size:42px; color:#94a3b8;"></i><div style="margin-top:12px; font-weight:700;">' + ctvvE(ctvvmOnlineFile.name) + '</div><div style="font-size:12.5px;">Văn bản tải lên từ máy - Mẫu 26/BTNN - Thông báo về việc tổ chức thực hiện phục hồi danh dự</div></div>';
    }
    var c = ctvvEl('modalCtvvmContainer'); c.style.width = '1250px'; c.style.maxWidth = '98%'; c.style.height = '94vh';
    ctvvEl('ctvvmStep1Tab').className = 'ktl-step-tab completed';
    ctvvEl('ctvvmStep1Badge').innerHTML = '<i class="fa-solid fa-check"></i>';
    ctvvEl('ctvvmStep2Tab').className = 'ktl-step-tab active';
    ctvvEl('ctvvmStep1Body').style.display = 'none';
    ctvvEl('ctvvmStep2Body').style.display = 'flex';
    ctvvEl('ctvvmBtnNextStep').style.display = 'none';
    ctvvEl('ctvvmBtnSubmitOffline').style.display = 'none';
    ctvvEl('ctvvmBtnBackStep1').style.display = 'inline-flex';
    ctvvEl('ctvvmBtnSubmitOnline').style.display = 'inline-flex';
    gqSignRefresh('ctvvm');
}
// Trạng thái vụ việc sau khi Lãnh đạo cấp cuối ký duyệt: giữ trạng thái trước khi trình (nhánh Giải quyết YCBT không đổi)
function ctvvmResultStatus(claim) {
    var st = canonicalClaimStatus(claim.status);
    if (isPhddClaim(claim)) return CASE_PHDD_PENDING_STATUS;
    // Trình lại sau khi Bị trả lại: giữ trạng thái trước lần trình đầu
    if ((st === 'Bị trả lại' || st === 'Chờ duyệt') && claim.ctvvM26 && claim.ctvvM26.resultStatus) return claim.ctvvM26.resultStatus;
    return st;
}
// Ký số: trình Lãnh đạo Loại trình "Thông báo tổ chức thực hiện phục hồi danh dự" -> vụ việc "Chờ duyệt"
function ctvvmSubmitOnline() {
    var claim = ctvvmClaim;
    if (!claim || !ctvvmOnlineFile) return;
    var sign = gqSignCollect('ctvvm');
    if (!sign) return;
    var x = ctvvmFormData();
    var gen = ctvvmOnlineFile.source === 'generated';
    var fileName = ctvvmOnlineFile.name;
    var resultStatus = ctvvmResultStatus(claim);
    // Nhánh Giải quyết YCBT đã Hoàn thành: hồ sơ luồng tạm chuyển "Đang phục hồi danh dự" để trình; ký duyệt xong trả về Hoàn thành
    var rec0 = gqRecord(claim); var W = gqW();
    if (rec0 && W && rec0.status === 'Hoàn thành') { rec0.status = CASE_PHDD_PENDING_STATUS; W.upsertRecord(rec0); }
    var draftDoc = { source: gen ? 'generated' : 'uploaded', formNo: CTVV_FORM, docTitle: 'Thông báo về việc tổ chức thực hiện phục hồi danh dự', generatedName: gen ? fileName : '', uploadedName: gen ? '' : fileName, bodyHtml: gen ? ctvvmOnlineFile.bodyHtml : '' };
    var signDoc = Object.assign({
        method: 'Ký số', file: gen ? ctvvmDocBase(claim) + '.pdf' : fileName, enableRoomSig: sign.enableNhay, sigCoords: sign.coords,
        docNumber: gen ? x.docNumber : '', docDate: gen ? x.docDate : '', agency6: x.agency6, time: x.time, place: x.place, paper: x.paper,
        portal: x.portal, portalAgency: x.portalAgency, noiNhan: gen ? x.noiNhan : []
    }, tlktGqExtra('ctvvm', ctvvmOnlineFile, ctvvmDocSrc, sign.content));
    var res = gqSubmit(claim, CTVV_KIND, sign.content, [], { assignee: sign.assignees[0] || '', assignees: sign.assignees, reason: CTVV_KIND, resultStatus: resultStatus, draftDoc: draftDoc, signDoc: signDoc });
    if (!res || res.ok === false) {
        if (rec0 && W && rec0.status === CASE_PHDD_PENDING_STATUS && resultStatus === 'Hoàn thành') { rec0.status = 'Hoàn thành'; W.upsertRecord(rec0); }
        showToast(res ? res.message : 'Không trình được hồ sơ.', 'error'); return;
    }
    var m26 = {
        state: 'Chờ duyệt', method: 'Ký số', docSrc: ctvvmDocSrc, formNo: CTVV_FORM,
        docNumber: signDoc.docNumber, docDate: signDoc.docDate, agency6: x.agency6, forms: x.forms, time: x.time, place: x.place, paper: x.paper, portal: x.portal, portalAgency: x.portalAgency,
        noiNhan: signDoc.noiNhan, draftFile: gen ? fileName : fileName, draftFileId: signDoc.docFileMeta ? signDoc.docFileMeta.keepId : '', bodyHtml: gen ? ctvvmOnlineFile.bodyHtml : '',
        signFile: signDoc.file, attachments: signDoc.attachments || [], submittedAt: gqNow(), resultStatus: resultStatus
    };
    claim.ctvvM26 = m26;
    gqSaveData(claim, { ctvvM26: m26 });
    if (!Array.isArray(claim.phddTimeline)) claim.phddTimeline = [];
    claim.phddTimeline.push({ title: 'Trình ký Thông báo tổ chức thực hiện phục hồi danh dự', date: gqToday(), desc: 'Trình Lãnh đạo ký duyệt ' + CTVV_FORM + ' (' + fileName + '). Vụ việc chuyển sang trạng thái [Chờ duyệt].' });
    closeCtvvmModal();
    isDetailEditMode = false;
    gqAfterSubmit(claim, CTVV_KIND);
    var detail = ctvvEl('caseDetailSection');
    if (detail && detail.style.display === 'block') showCaseDetail(claim.id, false, 'phdd');
}
// Ký ngoài: tệp PDF đã ký -> popup xác nhận -> ban hành trực tiếp
function ctvvmSubmitOffline() {
    var claim = ctvvmClaim;
    if (!claim) return;
    if (!ctvvmOfflineFile) {
        var fErr = ctvvEl('ctvvmOfflineFileErr'); fErr.textContent = CTVV_OFF_MSG; fErr.style.display = 'block';
        var drop = ctvvEl('ctvvmOfflineDrop'); drop.classList.add('is-error'); drop.focus();
        return;
    }
    var overlay = ctvvEl('customConfirmOverlay'), btnYes = ctvvEl('customConfirmBtnYes'), btnNo = ctvvEl('customConfirmBtnNo');
    var prevZ = overlay ? overlay.style.zIndex : '';
    var restore = function () { if (overlay) overlay.style.zIndex = prevZ; if (btnYes) btnYes.style.backgroundColor = ''; };
    showConfirmModal('Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Tiến trình phục hồi danh dự chuyển sang bước tiếp theo. Bạn có chắc chắn muốn ban hành văn bản?',
        function () { restore(); ctvvmIssueOffline(); },
        { title: 'Xác nhận ban hành văn bản', btnYesText: 'Ban hành', btnYesClass: 'btn-success', btnNoText: 'Hủy bỏ' });
    if (overlay) overlay.style.zIndex = '10050';
    if (btnYes) btnYes.style.backgroundColor = '#16a34a';
    if (btnNo) btnNo.addEventListener('click', restore, { once: true });
}
function ctvvmIssueOffline() {
    var claim = ctvvmClaim;
    if (!claim || !ctvvmOfflineFile) return;
    var keep = typeof tlktKeep === 'function' ? tlktKeep(ctvvmOfflineFile.raw) : '';
    var m26 = { state: 'Đã ban hành', method: 'Ký ngoài', formNo: CTVV_FORM, forms: ctvvmForms(claim), signedFile: ctvvmOfflineFile.name, signedFileId: keep, signedSize: ctvvmOfflineFile.size, issuedAt: gqNow(), attachments: typeof tlktGet === 'function' ? tlktGet('ctvvm') : [] }; // Ký ngoài: Tài liệu ban hành kèm theo
    try {
        var W = gqW(), rec = gqRecord(claim);
        if (W && rec) { W.addHistory(rec, 'Ban hành Thông báo tổ chức thực hiện phục hồi danh dự (Ký ngoài)', 'Văn bản đã ký: ' + ctvvmOfflineFile.name + '.'); W.upsertRecord(rec); }
    } catch (e) { /* mockup */ }
    closeCtvvmModal();
    ctvvmApplyIssued(claim, m26, '', '');
    saveClaimsToLocal();
    renderClaimsTable();
    showToast('Đã ban hành Thông báo tổ chức thực hiện phục hồi danh dự (Ký ngoài) cho vụ việc ' + claimVvLabel(claim) + '.', 'success');
    showCaseDetail(claim.id, false, 'phdd');
}
// Văn bản đã ban hành (Ký số cấp cuối / Ký ngoài): ghi thông tin Thông báo, chuyển bước tiếp theo của nhánh Phục hồi danh dự (giữ logic hiện có)
function ctvvmApplyIssued(claim, m26, signerName, signerTitle) {
    claim.ctvvM26 = m26;
    claim.phddStep1No = m26.docNumber || claim.phddStep1No || '';
    claim.phddStep1Date = m26.docDate || String(m26.issuedAt || '').replace(/^\d{2}:\d{2}\s+/, '').split(' ')[0] || gqToday();
    claim.phddStep1Signer = signerName || claim.phddStep1Signer || '';
    claim.phddStep1Position = signerTitle || claim.phddStep1Position || '';
    claim.phddStep1Files = [{ name: m26.signedFile, size: m26.signedSize || '', title: 'Thông báo tổ chức thực hiện phục hồi danh dự (đã ký)', fileId: m26.signedFileId || '' }];
    claim.phddStep1File = m26.signedFile;
    if (!Array.isArray(claim.phddTimeline)) claim.phddTimeline = [];
    claim.phddTimeline.push({ title: 'Ban hành Thông báo tổ chức thực hiện phục hồi danh dự', date: gqToday(), desc: (m26.method === 'Ký ngoài' ? 'Ban hành văn bản đã ký ngoài hệ thống' : 'Lãnh đạo ký duyệt') + ' (' + m26.signedFile + ').' });
    setPhddStatus(claim, 'Chờ phản hồi');
    if (claim.victimAlive === 'no') setPhddStatus(claim, 'Chờ thực hiện');
    try { gqSaveData(claim, { ctvvM26: m26 }); } catch (e) { /* mockup */ }
}
// Kết quả Lãnh đạo xử lý phiếu trình (đồng bộ từ hồ sơ luồng): Ký duyệt cấp cuối -> ban hành; Từ chối -> Bị trả lại
(function () {
    var orig = window.gqApplyRecord;
    if (typeof orig !== 'function') return;
    window.gqApplyRecord = function (c, r) {
        var res = orig.apply(this, arguments);
        try {
            var a = r && r.approval;
            var m = c && c.ctvvM26;
            if (a && a.kind === CTVV_KIND && m && m.state !== 'Đã ban hành') {
                var W = gqW();
                if (a.done && r.status !== 'Chờ duyệt' && r.status !== 'Bị trả lại') {
                    var last = (a.steps || [])[a.steps.length - 1] || {};
                    var u = W && last.userId ? W.getUser(last.userId) : null;
                    var nm = Object.assign({}, m, { state: 'Đã ban hành', signedFile: String(m.signFile || 'Van_ban.pdf').replace(/\.[^.]+$/, '') + '_da_ky.pdf', signedAt: last.at || gqNow(), issuedAt: last.at || gqNow(), signedBy: u ? u.name : '' });
                    ctvvmApplyIssued(c, nm, u ? u.name : '', u ? u.title : '');
                    res = true;
                } else if (r.status === 'Bị trả lại' && m.state !== 'Bị trả lại') {
                    var ret = r.returned || {};
                    c.ctvvM26 = Object.assign({}, m, { state: 'Bị trả lại', rejectReason: ret.reason || '', rejectBy: ret.by && W ? W.userName(ret.by) : '', rejectAt: ret.at || '' });
                    if (!Array.isArray(c.phddTimeline)) c.phddTimeline = [];
                    c.phddTimeline.push({ title: 'Lãnh đạo từ chối Thông báo tổ chức thực hiện phục hồi danh dự', date: gqToday(), desc: 'Lý do: ' + (ret.reason || '--') + '. Vụ việc chuyển sang trạng thái [Bị trả lại].' });
                    res = true;
                }
            }
        } catch (e) { /* mockup */ }
        return res;
    };
    var oCase = window.gqldCaseStatus;
    if (typeof oCase === 'function') window.gqldCaseStatus = function (c) {
        if (c && c.ctvvM26 && (c.ctvvM26.state === 'Chờ duyệt' || c.ctvvM26.state === 'Bị trả lại')) {
            var st = canonicalClaimStatus(c.status);
            if (st === c.ctvvM26.state) return st;
        }
        return oCase.apply(this, arguments);
    };
    var oUpd = window.gqUpdateReturned;
    if (typeof oUpd === 'function') window.gqUpdateReturned = function (claimId) {
        var claim = gqClaim(claimId);
        var rec = claim ? gqRecord(claim) : null;
        if (rec && rec.returned && rec.returned.kind === CTVV_KIND) { openCtvvmModal(claimId); return; }
        return oUpd.apply(this, arguments);
    };
    var oPrev = window.gqldPreviewHtml;
    if (typeof oPrev === 'function') window.gqldPreviewHtml = function (W, rec) {
        var a = (rec && rec.approval) || {};
        var dd = a.draftDoc || {};
        if (a.kind === CTVV_KIND && dd.source === 'generated' && dd.bodyHtml) return '<div style="color:#e2e8f0; font-size:12px; margin-bottom:8px;"><i class="fa-solid fa-file-pdf"></i> ' + ctvvE((a.signDoc && a.signDoc.file) || dd.generatedName) + ' · Trang 1/1</div><div class="gqld-a4">' + dd.bodyHtml + '</div>';
        return oPrev.apply(this, arguments);
    };
    var oTitle = window.gqldDocTitle;
    if (typeof oTitle === 'function') window.gqldDocTitle = function (kind) {
        if (kind === CTVV_KIND) return 'THÔNG BÁO VỀ VIỆC TỔ CHỨC THỰC HIỆN PHỤC HỒI DANH DỰ';
        return oTitle.apply(this, arguments);
    };
})();
// ---------- Khối Thông báo phục hồi danh dự: trình ký / văn bản dự thảo / văn bản đã ký ----------
function ctvvM26Decorate(claim) {
    var sec = ctvvEl('phddSection1'); if (!sec || !claim) return;
    ctvvCss();
    // [pdtb] Một giao diện cho mọi vụ việc có Phục hồi danh dự: ẩn các trường nhập cũ của khối (giữ tiêu đề), hiển thị khối trình ký Mẫu 26/BTNN
    pdtbMigrateM26(claim);
    var m = claim.ctvvM26;
    var panel = ctvvEl('ctvvM26Panel');
    var head = sec.children[0];
    sec.classList.add('ctvv-m26-on');
    if (!panel) { panel = document.createElement('div'); panel.id = 'ctvvM26Panel'; panel.className = 'ctvv-m26'; head.parentNode.insertBefore(panel, head.nextSibling); }
    var atNotice = pdtbAtNoticeStep(claim);
    var caseSt = canonicalClaimStatus(claim.status);
    // Nút trình ký: nhánh PHDD ở bước Thông báo, chưa trình, vụ việc không Chờ duyệt, chế độ cập nhật (thao tác "Cập nhật phục hồi danh dự")
    var canSubmit = isDetailEditMode && atNotice && !m && caseSt !== 'Chờ duyệt' && pdtbCanUpdate(claim);
    // Bị trả lại (Loại trình Thông báo tổ chức thực hiện phục hồi danh dự): Cập nhật và trình ký lại
    var canResubmit = !!m && m.state === 'Bị trả lại' && atNotice && caseSt === 'Bị trả lại' && pdtbCanUpdate(claim);
    var btn = function (label) { return '<button type="button" class="btn btn-primary btn-sm" id="ctvvBtnTrinhM26" onclick="openCtvvmModal(\'' + claim.id + '\')" style="display:inline-flex; align-items:center; gap:6px;"><i class="fa-solid fa-file-signature"></i> ' + label + '</button>'; };
    if (!m) {
        panel.innerHTML = '<div class="ctvv-m26-empty"><span><i class="fa-solid fa-circle-info" style="color:#2563eb;"></i> Chưa trình ký Thông báo tổ chức thực hiện phục hồi danh dự (' + CTVV_FORM + ').</span>' + (canSubmit ? btn('Trình ký Thông báo tổ chức thực hiện phục hồi danh dự') : '') + '</div>';
        return;
    }
    var issued = m.state === 'Đã ban hành';
    var badge = issued ? '<span class="ctvv-m26-badge issued">Đã ban hành</span>' : (m.state === 'Bị trả lại' ? '<span class="ctvv-m26-badge rejected">Bị trả lại</span>' : '<span class="ctvv-m26-badge pending">Chờ duyệt</span>');
    var cell = function (l, v) { return '<div><b>' + l + '</b>' + ctvvE(v || '-') + '</div>'; };
    var signer = m.signedBy || (issued ? claim.phddStep1Signer : '');
    var signerTitle = m.signerTitle || (issued ? claim.phddStep1Position : '');
    var fileName = issued ? m.signedFile : m.draftFile;
    var fileSize = issued ? m.signedSize : '';
    var fileLabel = issued ? 'Văn bản đã ký' : 'Văn bản dự thảo';
    var nn = (Array.isArray(m.noiNhan) ? m.noiNhan : []).filter(Boolean);
    var html = '<div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;"><b style="color:#64748b; font-weight:600; font-size:12px;">Trạng thái trình ký:</b> ' + badge + '</div>'
        + '<div class="ctvv-m26-grid">' + cell('Hình thức ký', m.method)
        + cell('Số, ký hiệu văn bản', m.docNumber || (issued ? claim.phddStep1No : ''))
        + cell('Ngày văn bản', m.docDate || (issued ? claim.phddStep1Date : ''))
        + (issued ? cell('Người ký', signer ? signer + (signerTitle ? ' - ' + signerTitle : '') : '') : '')
        + cell('Cơ quan thực hiện việc phục hồi danh dự', m.agency6)
        + '</div>'
        + pdtbC7Html(m.forms || ctvvmForms(claim), m)
        + '<div class="ctvv-m26-grid" style="grid-template-columns:1fr;"><div><b>Nơi nhận</b>' + (nn.length ? nn.map(ctvvE).join('<br>') : '-') + '</div></div>'
        + (m.state === 'Bị trả lại' ? '<div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:10px 12px; margin-bottom:10px; color:#92400e;"><b>Lý do bị trả lại:</b> ' + ctvvE(m.rejectReason || '--') + '<div style="font-size:12px;">Người từ chối: ' + ctvvE(m.rejectBy || '--') + ' • Thời điểm: ' + ctvvE(m.rejectAt || '--') + '</div></div>' : '')
        + '<div class="tlkt-sec-title"><i class="fa-solid fa-file-signature"></i> ' + fileLabel + '</div>'
        + '<div class="ctvv-m26-file">' + (fileName ? pdtbFileHtml({ file: fileName, size: fileSize }) : '<span style="color:#94a3b8;">--</span>')
        + (fileName ? '<span class="tlkt-acts">'
            + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Xem file" aria-label="Xem file" data-ctvv-act="m26view" data-ctvv-id="' + claim.id + '"><i class="fa-solid fa-eye"></i></button>'
            + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Tải file" aria-label="Tải file" data-ctvv-act="m26dl" data-ctvv-id="' + claim.id + '"><i class="fa-solid fa-download"></i></button></span>' : '') + '</div>'
        // Tài liệu ban hành kèm theo / không ban hành kèm theo (khối rỗng hoặc không có quyền xem thì không hiển thị)
        + (typeof tlktSplitRender === 'function'
            ? tlktSplitRender(m.attachments || [], { ownerUnit: ((typeof gqRecord === 'function' && gqRecord(claim)) || {}).rootUnitId || '' }, function (rows, title) { return ctvvDocsViewHtml(rows.map(function (d) { return { title: d.name, file: d.file ? d.file.name : '', size: d.file ? d.file.size : '', fileId: d.file ? d.file.id : '' }; }), { title: title }); })
            : ctvvDocsViewHtml((m.attachments || []).map(function (d) { return { title: d.name, file: d.file ? d.file.name : '', size: d.file ? d.file.size : '', fileId: d.file ? d.file.id : '' }; }), { title: 'Tài liệu đính kèm' }))
        + (canResubmit ? '<div style="display:flex; justify-content:flex-end; margin-top:10px;">' + btn('Cập nhật và trình ký lại') + '</div>' : '');
    panel.innerHTML = html;
}
// [pdtb] Nhánh Phục hồi danh dự đang ở bước Thông báo tổ chức phục hồi danh dự
function pdtbAtNoticeStep(claim) {
    if (!claim || claimRequestKind(claim) === 'money') return false;
    var ph = phddCanonicalStatus(claim.phddStatus);
    return !ph || ph === PHDD_START_STATUS || ph === 'Mới';
}
// [pdtb] Người dùng được cập nhật vụ việc: không phải vai trò Lãnh đạo, vụ việc không giao cán bộ khác
function pdtbCanUpdate(claim) {
    try {
        var role = typeof getCurrentSimulatedRole === 'function' ? getCurrentSimulatedRole() : '';
        if (role === 'thu-truong') return false;
        if (typeof gqldGateReason === 'function' && gqldGateReason(claim, role, typeof getCurrentSimulatedOfficer === 'function' ? getCurrentSimulatedOfficer() : '')) return false;
    } catch (e) { /* mockup */ }
    return true;
}
// [pdtb] Nội dung (7) theo Hình thức phục hồi danh dự của hồ sơ
function pdtbC7Html(forms, m) {
    var row = function (l, v) { return '<div><b>' + l + '</b>' + ctvvE(v || '-') + '</div>'; };
    var h = '';
    if (forms.apology) h += '<div class="ctvv-sub">Về việc tổ chức trực tiếp xin lỗi và cải chính công khai</div><div class="ctvv-m26-grid" style="grid-template-columns:repeat(2, minmax(0, 1fr)); margin-bottom:6px;">'
        + row('Dự kiến thời gian', m.time ? ctvvmTimeText(m.time) : '') + row('Dự kiến địa điểm', m.place) + '</div>';
    if (forms.news) h += '<div class="ctvv-sub">Về việc đăng báo xin lỗi và cải chính công khai</div><div class="ctvv-m26-grid" style="grid-template-columns:repeat(2, minmax(0, 1fr)); margin-bottom:6px;">'
        + row('Dự kiến tờ báo đăng', m.paper) + (m.portal ? row('Dự kiến đăng tải trên Cổng thông tin điện tử của', m.portalAgency) : '') + '</div>';
    return h ? '<div class="ctvv-m26-c7"><div class="ctvv-sub" style="font-size:12.5px;">Nội dung tổ chức thực hiện phục hồi danh dự</div>' + h + '</div>' : '';
}
// [pdtb] Dữ liệu cũ (Thông báo nhập tay: Số thông báo, Ngày ban hành, Người ký...) -> cấu trúc trình ký mới, trạng thái "Đã ban hành", hình thức "Ký ngoài"
function pdtbMigrateM26(c) {
    if (!c || c.ctvvM26 || claimRequestKind(c) === 'money' || !c.phddStatus) return false;
    var ph = phddCanonicalStatus(c.phddStatus);
    var issued = !!c.phddStep1No || (ph !== PHDD_START_STATUS && ph !== 'Mới' && ph !== 'Đình chỉ giải quyết');
    if (!issued) return false;
    var files = ctvvFromLegacy(c.phddStep1Files || (c.phddStep1File ? [c.phddStep1File] : []));
    var main = files[0] || null;
    var ex = c.phddStep1Expected || {};
    var nn = [];
    if (c.phddStep1Recipient_victim !== false) nn.push('- Người bị thiệt hại' + (getClaimRequesterName(c) ? ' (' + getClaimRequesterName(c) + ')' : '') + ';');
    if (c.phddStep1Recipient_commune) nn.push('- ' + (c.phddStep1CommuneName || 'Ủy ban nhân dân cấp xã nơi người bị thiệt hại cư trú') + ';');
    if (c.phddStep1Recipient_agency && c.phddStep1RecipientAgencyName) nn.push('- ' + c.phddStep1RecipientAgencyName + ';');
    if (c.phddStep1Recipient_other && c.phddStep1RecipientOtherText) nn.push('- ' + c.phddStep1RecipientOtherText + ';');
    nn.push('- Lưu: VT, HSVV.');
    c.ctvvM26 = {
        state: 'Đã ban hành', method: 'Ký ngoài', formNo: CTVV_FORM, docSrc: 'upload', migrated: true,
        docNumber: c.phddStep1No || '', docDate: c.phddStep1Date || '', signedBy: c.phddStep1Signer || '', signerTitle: c.phddStep1Position || '',
        forms: ctvvmForms(c), agency6: ex.agency || c.agency || '', time: ex.date || '', place: ex.venue || '',
        paper: ex.newsCentral || ex.newsLocal || ex.newsProvince || c.phddStep1ExpectedNewsNameCentral || '', portal: false, portalAgency: '',
        noiNhan: nn, signedFile: main ? main.file : '', signedSize: main ? main.size : '', signedFileId: main ? main.fileId : '',
        attachments: files.slice(1).map(function (f) { return { name: f.title, file: { name: f.file, size: f.size, id: f.fileId } }; }),
        issuedAt: c.phddStep1Date || ''
    };
    return true;
}
// [pdtb] Dữ liệu mẫu: 01 vụ việc Chờ duyệt, 01 vụ việc Bị trả lại với Loại trình "Thông báo tổ chức thực hiện phục hồi danh dự"
var PDTB_SEED = [{ id: 'HS5', reject: false, no: '27/TB-BT' }, { id: 'HS7', reject: true, no: '18/TB-BT', reason: 'Đề nghị ghi rõ dự kiến địa điểm tổ chức trực tiếp xin lỗi (tên hội trường, địa chỉ cụ thể).' }];
function pdtbSeedM26() {
    var W = gqW(); if (!W || typeof claimsList === 'undefined' || !claimsList.length) return false;
    var done = false;
    PDTB_SEED.forEach(function (p) {
        var me = W.getCurrentUserId();
        try {
            var c = gqClaim(p.id);
            if (!c || c.ctvvM26 || !pdtbAtNoticeStep(c) || phddCanonicalStatus(c.phddStatus) !== PHDD_START_STATUS) return;
            var st = canonicalClaimStatus(c.status);
            if (['Chờ duyệt', 'Bị trả lại', 'Đình chỉ giải quyết', 'Hoàn thành'].indexOf(st) >= 0) return;
            var rec0 = gqRecord(c);
            if (rec0 && (rec0.status === 'Chờ duyệt' || rec0.status === 'Bị trả lại')) return;
            var rec = gqEnsureRecord(c); if (!rec) return;
            var assignees = gqSignLevels(c).map(function (lv) { return (lv.leaders && lv.leaders[0] && lv.leaders[0].id) || ''; });
            var forms = ctvvmForms(c);
            var x = { forms: forms, docNumber: p.no, docDate: '20/10/2026', agency6: ctvvmUnitName(c), time: forms.apology ? '05/11/2026 08:30' : '', place: forms.apology ? 'Trụ sở ' + (c.agency || 'cơ quan giải quyết bồi thường') : '', paper: forms.news ? 'Báo Pháp luật Việt Nam' : '', portal: false, portalAgency: '', noiNhan: CTVV_NOI_NHAN_DEFAULT.slice() };
            var base = ctvvmDocBase(c), body = '';
            try { body = ctvvmBuildMau26(c, x); } catch (e) { body = ''; }
            var signDoc = { method: 'Ký số', file: base + '.pdf', enableRoomSig: true, sigCoords: {}, docNumber: x.docNumber, docDate: x.docDate, agency6: x.agency6, time: x.time, place: x.place, paper: x.paper, portal: false, portalAgency: '', noiNhan: x.noiNhan, attachments: [] };
            var draftDoc = { source: 'generated', formNo: CTVV_FORM, docTitle: 'Thông báo về việc tổ chức thực hiện phục hồi danh dự', generatedName: base + '.doc', uploadedName: '', bodyHtml: body };
            W.setCurrentUser(rec.chuTri);
            var res = W.submitForApproval(c.code, CTVV_KIND, CTVV_CONTENT_DEFAULT, [], { assignee: assignees[0] || '', assignees: assignees, reason: CTVV_KIND, resultStatus: st, draftDoc: draftDoc, signDoc: signDoc });
            if (!res || !res.ok) return;
            var m26 = { state: 'Chờ duyệt', method: 'Ký số', docSrc: 'gen', formNo: CTVV_FORM, docNumber: x.docNumber, docDate: x.docDate, agency6: x.agency6, forms: forms, time: x.time, place: x.place, paper: x.paper, portal: false, portalAgency: '', noiNhan: x.noiNhan, draftFile: base + '.doc', draftFileId: '', bodyHtml: body, signFile: base + '.pdf', attachments: [], submittedAt: res.record.approval.submittedAt, resultStatus: st };
            c.status = 'Chờ duyệt';
            if (!Array.isArray(c.phddTimeline)) c.phddTimeline = [];
            c.phddTimeline.push({ title: 'Trình ký Thông báo tổ chức thực hiện phục hồi danh dự', date: gqToday(), desc: 'Trình Lãnh đạo ký duyệt ' + CTVV_FORM + ' (' + base + '.doc). Vụ việc chuyển sang trạng thái [Chờ duyệt].' });
            if (p.reject && assignees[0]) {
                W.setCurrentUser(assignees[0]);
                var rr = W.rejectApproval(c.code, p.reason);
                if (rr && rr.ok) {
                    c.status = 'Bị trả lại';
                    c.wfReturned = rr.record.returned || null;
                    m26 = Object.assign(m26, { state: 'Bị trả lại', rejectReason: p.reason, rejectBy: W.userName(assignees[0]), rejectAt: (rr.record.returned || {}).at || '' });
                    c.phddTimeline.push({ title: 'Lãnh đạo từ chối Thông báo tổ chức thực hiện phục hồi danh dự', date: gqToday(), desc: 'Lý do: ' + p.reason + '. Vụ việc chuyển sang trạng thái [Bị trả lại].' });
                }
            }
            try { gqRecMap[c.code] = W.getRecord(c.code); } catch (e) { /* mockup */ }
            gqSaveData(c, { ctvvM26: m26 });
            done = true;
        } catch (e) { /* mockup */ } finally { if (W.getCurrentUserId() !== me) W.setCurrentUser(me); }
    });
    return done;
}
function pdtbInit() {
    if (typeof claimsList === 'undefined' || typeof gqW !== 'function') return;
    try { claimsList.forEach(pdtbMigrateM26); } catch (e) { /* mockup */ }
    var seeded = false;
    try { seeded = pdtbSeedM26(); } catch (e) { /* mockup */ }
    if (seeded) {
        try { saveClaimsToLocal(); } catch (e) { /* mockup */ }
        try { renderClaimsTable(); } catch (e) { /* mockup */ }
    }
}
if (document.readyState === 'complete') setTimeout(pdtbInit, 0); else window.addEventListener('load', function () { setTimeout(pdtbInit, 0); });
function ctvvM26View(id) {
    var claim = gqClaim(id); var m = claim && claim.ctvvM26; if (!m) return;
    var issued = m.state === 'Đã ban hành';
    var fid = issued ? m.signedFileId : m.draftFileId;
    if (fid && typeof tlktOpenFile === 'function') { tlktOpenFile({ id: fid, name: issued ? m.signedFile : m.draftFile }); return; }
    if (m.bodyHtml) { gqW().openDocTab(m.bodyHtml, String((issued ? m.signedFile : m.draftFile) || 'Van_ban').replace(/\.[^.]+$/, '')); return; }
    viewPhddMockFile(issued ? m.signedFile : m.draftFile);
}
function ctvvM26Download(id) {
    var claim = gqClaim(id); var m = claim && claim.ctvvM26; if (!m) return;
    var issued = m.state === 'Đã ban hành';
    var name = issued ? m.signedFile : m.draftFile;
    var fid = issued ? m.signedFileId : m.draftFileId;
    var word = function () {
        if (!m.bodyHtml) { showToast('Tệp mẫu [' + name + '] không có nội dung để tải.', 'info'); return; }
        var h = '<html><head><meta charset="utf-8"></head><body>' + m.bodyHtml + '</body></html>';
        var b = new Blob(['﻿', h], { type: 'application/msword' });
        var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = String(name || 'Van_ban').replace(/\.[^.]+$/, '') + '.doc';
        document.body.appendChild(a); a.click(); a.remove();
    };
    if (fid && typeof tlktDownloadFile === 'function') { tlktDownloadFile({ id: fid, name: name }, function (ok) { if (!ok) word(); }); return; }
    word();
}
// Thao tác Xem file / Tải file tại bảng chỉ xem: gắn sự kiện chung (giữ được ở chế độ chỉ xem mở từ Tra cứu vụ việc)
document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-ctvv-act]') : null;
    if (!b) return;
    var act = b.getAttribute('data-ctvv-act');
    if (act === 'view' || act === 'dl') {
        var l = CTVV_VIEW[b.getAttribute('data-ctvv-vid')] || [];
        var r = l[Number(b.getAttribute('data-ctvv-i'))];
        if (act === 'view') ctvvOpenDoc(r); else ctvvDownloadDoc(r);
    } else if (act === 'm26view') ctvvM26View(b.getAttribute('data-ctvv-id'));
    else if (act === 'm26dl') ctvvM26Download(b.getAttribute('data-ctvv-id'));
});
ctvvCss();
