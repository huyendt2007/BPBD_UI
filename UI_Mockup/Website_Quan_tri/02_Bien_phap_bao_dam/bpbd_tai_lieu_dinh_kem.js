/*
 * bpbd_tai_lieu_dinh_kem.js - Bảng «Tài liệu đính kèm» chuẩn dùng chung phân hệ Biện pháp bảo đảm (Website Quản trị).
 * Bố trí giống bảng chuẩn của phân hệ Bồi thường nhà nước (btnn_tai_lieu_kem_theo.js, quan_ly_boi_thuong_ctvv.js):
 * - Chế độ nhập: tiêu đề «Tài liệu đính kèm» có biểu tượng kẹp giấy (trang đã có tiêu đề khối thì truyền title: '');
 *   bảng 04 cột STT | Tên tài liệu, văn bản | File đính kèm | Thao tác (Xem file, Xóa); nút «Thêm tài liệu» dưới bảng.
 *   Bảng chưa có dòng nào thì có sẵn 01 dòng trống; xóa dòng cuối cùng thì còn 01 dòng trống.
 *   Tải tệp khi ô Tên tài liệu, văn bản đang trống: lấy tên tệp (bỏ phần mở rộng). Xóa dòng ngay, không hỏi xác nhận.
 *   Dòng thiếu tên hoặc thiếu tệp khi lưu: tô viền đỏ, hiển thị [MSG-ERR-VAL-001] dưới ô, focus ô lỗi đầu tiên.
 *   Không hiển thị dòng ghi chú định dạng, dung lượng dưới bảng; định dạng, dung lượng, số tệp tối đa theo quy định riêng của màn (opts).
 * - Chế độ xem: cùng 04 cột, Thao tác Xem file, Tải file; không có tài liệu thì không hiển thị bảng.
 * API: BPTL.mount(key, hostId, opts) | BPTL.get(key) | BPTL.set(key, rows) | BPTL.validate(key) | BPTL.hasData(key)
 *      BPTL.viewHtml(rows, opts) | BPTL.rows(list) (quy đổi dữ liệu cũ) | BPTL.open(file, title) | BPTL.download(file)
 * Dòng: { name: 'Tên tài liệu, văn bản', file: { id, name, size } | null }.
 */
(function () {
    'use strict';
    if (window.BPTL) return;
    var MSG_REQ = 'Đây là trường bắt buộc'; // [MSG-ERR-VAL-001]
    var S = {};        // key -> trạng thái bảng nhập
    var BLOBS = {};    // id tệp -> File (phiên hiện tại), dùng cho Xem file / Tải file
    var VIEWS = {};    // id bảng xem -> { rows, opts }
    var seq = 0;

    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function toast(msg, type) {
        if (typeof window.showToast === 'function') window.showToast(msg, type || 'info');
        else if (window.CLDK && typeof window.CLDK.toast === 'function') window.CLDK.toast(msg, type || 'info');
        else if (window.NDL && typeof window.NDL.toast === 'function') window.NDL.toast(msg, type || 'info');
        else window.alert(msg);
    }
    function fmtSize(b) {
        if (b == null || b === '' || /^\s*-+\s*$/.test(String(b))) return '';
        var n = Number(b);
        if (isNaN(n)) return String(b);
        if (!n) return '';
        return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';
    }
    function extOf(name) { return (String(name || '').match(/\.[^.]+$/) || [''])[0].toLowerCase(); }
    function fileIcon(name) {
        var x = extOf(name);
        if (x === '.pdf') return 'fa-solid fa-file-pdf bptl-ico-pdf';
        if (x === '.doc' || x === '.docx') return 'fa-solid fa-file-word bptl-ico-word';
        if (x === '.xls' || x === '.xlsx') return 'fa-solid fa-file-excel bptl-ico-excel';
        if (x === '.zip' || x === '.rar') return 'fa-solid fa-file-zipper bptl-ico-zip';
        if (['.jpg', '.jpeg', '.png', '.gif'].indexOf(x) >= 0) return 'fa-solid fa-file-image bptl-ico-img';
        return 'fa-solid fa-file-lines';
    }
    function baseName(n) { return String(n || '').replace(/\.[^.]+$/, ''); }

    function css() {
        if (document.getElementById('bptlCss')) return;
        var st = document.createElement('style');
        st.id = 'bptlCss';
        st.textContent = [
            '.bptl-sec { margin: 0; }',
            '.bptl-sec-title { font-weight: 700; color: #0f172a; font-size: 13px; margin: 0 0 8px; display: flex; align-items: center; gap: 6px; text-transform: none; }',
            '.bptl-sec-title i { color: #1e3a8a; }',
            '.bptl-req { color: #dc2626; margin-left: 2px; }',
            '.bptl-wrap { border: 1px solid #e2e8f0; border-radius: 8px; overflow-x: auto; background: #fff; }',
            'table.bptl-table { width: 100% !important; table-layout: fixed; border-collapse: collapse !important; font-size: 12.5px !important; margin: 0 !important; border: 0 !important; }',
            'table.bptl-table th { background: #f8fafc !important; color: #334155 !important; font-weight: 600 !important; font-size: 12.5px !important; text-align: left; padding: 9px 10px !important; border: 0 !important; border-bottom: 1px solid #e2e8f0 !important; white-space: nowrap; text-transform: none !important; letter-spacing: normal !important; height: auto !important; }',
            'table.bptl-table td { padding: 8px 10px !important; border: 0 !important; border-bottom: 1px solid #f1f5f9 !important; vertical-align: middle !important; color: #1e293b !important; background: #fff; font-size: 12.5px !important; font-weight: 400; text-align: left; }',
            'table.bptl-table tr:last-child td { border-bottom: 0 !important; }',
            'table.bptl-table tbody tr:hover td { background: #fff; }',
            'table.bptl-table .bptl-c { text-align: center !important; }',
            'table.bptl-table td.bptl-fc { text-align: center !important; }',
            'table.bptl-table td.bptl-title { overflow-wrap: anywhere; }',
            'table.bptl-table input.bptl-name { width: 100% !important; box-sizing: border-box; height: 32px !important; border: 1px solid #cbd5e1 !important; border-radius: 6px !important; padding: 6px 9px !important; font: inherit; font-size: 12.5px !important; background: #fff !important; color: #0f172a; margin: 0 !important; }',
            'table.bptl-table input.bptl-name:focus { outline: none; border-color: #1e3a8a !important; box-shadow: 0 0 0 2px rgba(30,58,138,.12); }',
            'table.bptl-table input.bptl-name.is-invalid { border-color: #dc2626 !important; background: #fef2f2 !important; }',
            '.bptl-btn-pri { display: inline-flex !important; align-items: center; justify-content: center; gap: 6px; height: 30px; box-sizing: border-box; padding: 0 12px !important; border: 1px solid #1e3a8a !important; background: #1e3a8a !important; color: #fff !important; border-radius: 6px !important; font-family: inherit; font-size: 12px !important; font-weight: 500 !important; line-height: 1 !important; cursor: pointer; white-space: nowrap; text-decoration: none !important; box-shadow: none !important; width: auto !important; min-width: 0 !important; margin: 0 !important; }',
            '.bptl-btn-pri:hover { background: #1e40af !important; border-color: #1e40af !important; }',
            '.bptl-btn-pri i { color: #fff !important; font-size: 12px !important; margin: 0 !important; }',
            '.bptl-btn-pri.is-invalid { border-color: #dc2626 !important; box-shadow: 0 0 0 2px #fecaca !important; }',
            '.bptl-btn-add { display: inline-flex !important; align-items: center; justify-content: center; gap: 6px; height: 30px; box-sizing: border-box; padding: 0 12px !important; border: 1px solid #1e3a8a !important; background: #fff !important; color: #1e3a8a !important; border-radius: 6px !important; font-family: inherit; font-size: 12px !important; font-weight: 500 !important; line-height: 1 !important; cursor: pointer; white-space: nowrap; box-shadow: none !important; width: auto !important; min-width: 0 !important; margin: 8px 0 0 !important; }',
            '.bptl-btn-add:hover { background: #eff6ff !important; }',
            '.bptl-btn-add i { color: #1e3a8a !important; font-size: 12px !important; margin: 0 !important; }',
            '.bptl-file { display: inline-flex; align-items: center; justify-content: center; gap: 6px; max-width: 100%; min-width: 0; font-weight: 500; color: #0f172a; vertical-align: middle; }',
            '.bptl-file > i { flex: none; font-size: 14px; }',
            '.bptl-file .bptl-fn { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
            '.bptl-file small { flex: none; color: #94a3b8; font-weight: 400; font-size: 11.5px; white-space: nowrap; }',
            '.bptl-ico-pdf { color: #dc2626; } .bptl-ico-word { color: #2563eb; } .bptl-ico-img { color: #0d9488; } .bptl-ico-excel { color: #16a34a; } .bptl-ico-zip { color: #a16207; }',
            '.bptl-acts { display: inline-flex; gap: 8px; justify-content: center; white-space: nowrap; }',
            'button.bptl-ib { width: 30px !important; height: 30px !important; min-width: 30px !important; display: inline-flex !important; align-items: center; justify-content: center; border-radius: 6px !important; border: 1px solid #bfdbfe !important; background: #eff6ff !important; color: #2563eb !important; cursor: pointer; padding: 0 !important; margin: 0 !important; font-size: 13px !important; box-shadow: none !important; }',
            'button.bptl-ib i { color: inherit !important; margin: 0 !important; font-size: 13px !important; }',
            'button.bptl-ib:hover { filter: brightness(0.95); }',
            'button.bptl-ib.bptl-ib-del { border-color: #fecaca !important; background: #fef2f2 !important; color: #dc2626 !important; }',
            'button.bptl-ib.is-disabled { border-color: #e2e8f0 !important; background: #f8fafc !important; color: #cbd5e1 !important; pointer-events: none; }',
            '.bptl-err { color: #dc2626; font-size: 11.5px; margin-top: 4px; display: none; font-weight: 400; }',
            'td.bptl-fc .bptl-err { text-align: center; }',
            '.bptl-err.on { display: block; }',
            '.bptl-dash { color: #94a3b8; }'
        ].join('\n');
        (document.head || document.documentElement).appendChild(st);
    }

    // Quy đổi dữ liệu cũ thành dòng bảng:
    //   'a.pdf' | { name: 'a.pdf', size } (chỉ có tên tệp) | { ten: 'a.pdf', size } -> Tên tài liệu, văn bản = tên tệp bỏ phần mở rộng
    //   { name: 'Tên', fileName: 'a.pdf', fileSize } | { title: 'Tên', file: 'a.pdf' } | { name: 'Tên', file: { id, name, size } }
    function normRow(d) {
        if (!d) return null;
        if (typeof d === 'string') return { name: baseName(d), file: { id: '', name: d, size: '' } };
        var f = d.file, fileName = '', size = '', id = '', name = '';
        if (f && typeof f === 'object') { fileName = f.name || ''; size = f.size || ''; id = f.id || ''; name = d.title || d.name || ''; }
        else if (typeof f === 'string') { fileName = f; size = d.size || d.fileSize || ''; id = d.fileId || ''; name = d.title || d.name || ''; }
        else if (d.fileName !== undefined) { fileName = d.fileName || ''; size = d.fileSize || d.size || ''; id = d.fileId || ''; name = d.title || d.name || ''; }
        else if (d.ten !== undefined) { fileName = d.ten || ''; size = d.size || ''; id = d.fileId || ''; name = d.title || ''; }
        else if (d.name && /\.[a-z0-9]{2,5}$/i.test(d.name)) { fileName = d.name; size = d.size || ''; id = d.fileId || ''; name = d.title || ''; }
        else name = d.title || d.name || '';
        if (!name && fileName) name = baseName(fileName);
        return { name: String(name || ''), file: fileName ? { id: id, name: fileName, size: size } : null };
    }
    function rows(list) { return (list || []).map(normRow).filter(function (r) { return r && (r.name || r.file); }); }

    // ---------- Chế độ nhập ----------
    function sync(key) {
        var s = S[key]; if (!s) return;
        s.rows.forEach(function (r, i) { var el = document.getElementById(s.idp + 'n' + i); if (el) r.name = el.value; });
    }
    function changed(key) { var s = S[key]; if (s && typeof s.onChange === 'function') s.onChange(BPTL.get(key)); }
    function render(key) {
        var s = S[key]; if (!s) return;
        var host = document.getElementById(s.hostId); if (!host) return;
        css();
        if (!s.rows.length) s.rows = [{ name: '', file: null }];
        var star = s.required ? '<span class="bptl-req">*</span>' : '';
        var body = s.rows.map(function (r, i) {
            var sz = r.file ? fmtSize(r.file.size) : '';
            var fileCell = r.file
                ? '<div class="bptl-file" title="' + esc(r.file.name) + (sz ? ' (' + esc(sz) + ')' : '') + '"><i class="' + fileIcon(r.file.name) + '"></i><span class="bptl-fn">' + esc(r.file.name) + '</span>' + (sz ? '<small>(' + esc(sz) + ')</small>' : '') + '</div>'
                : '<button type="button" class="bptl-btn-pri" data-admin-icon-normalized="1" id="' + s.idp + 'b' + i + '" onclick="document.getElementById(\'' + s.idp + 'f' + i + '\').click()"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button>';
            return '<tr data-bptl-row="' + i + '">'
                + '<td class="bptl-c">' + (i + 1) + '</td>'
                + '<td><input type="text" class="bptl-name" id="' + s.idp + 'n' + i + '" maxlength="' + s.nameMax + '" value="' + esc(r.name) + '" placeholder="Nhập tên tài liệu, văn bản" oninput="BPTL._onName(\'' + key + '\',' + i + ')">'
                + '<div class="bptl-err" id="' + s.idp + 'ne' + i + '">' + MSG_REQ + '</div></td>'
                + '<td class="bptl-fc"><input type="file" id="' + s.idp + 'f' + i + '" accept="' + esc(s.exts.join(',')) + '" style="display:none;" onchange="BPTL._pick(\'' + key + '\',' + i + ',this)">' + fileCell
                + '<div class="bptl-err" id="' + s.idp + 'fe' + i + '">' + MSG_REQ + '</div></td>'
                + '<td class="bptl-c"><span class="bptl-acts">'
                + '<button type="button" data-admin-icon-normalized="1" class="bptl-ib' + (r.file ? '' : ' is-disabled') + '" title="Xem file" aria-label="Xem file" onclick="BPTL._view(\'' + key + '\',' + i + ')"><i class="fa-solid fa-eye"></i></button>'
                + '<button type="button" data-admin-icon-normalized="1" class="bptl-ib bptl-ib-del" title="Xóa" aria-label="Xóa" onclick="BPTL._del(\'' + key + '\',' + i + ')"><i class="fa-solid fa-trash"></i></button>'
                + '</span></td></tr>';
        }).join('');
        host.innerHTML = '<div class="bptl-sec" id="' + s.idp + 'sec">'
            + (s.title ? '<div class="bptl-sec-title"><i class="fa-solid fa-paperclip"></i> ' + esc(s.title) + star + '</div>' : '')
            + '<div class="bptl-wrap"><table class="bptl-table"><thead><tr>'
            + '<th class="bptl-c" style="width:56px;">STT</th><th>Tên tài liệu, văn bản' + star + '</th><th class="bptl-c" style="width:40%;">File đính kèm' + star + '</th><th class="bptl-c" style="width:100px;">Thao tác</th>'
            + '</tr></thead><tbody>' + body + '</tbody></table></div>'
            + '<div class="bptl-err" id="' + s.idp + 'err">' + MSG_REQ + '</div>'
            + '<div><button type="button" class="bptl-btn-add" data-admin-icon-normalized="1" id="' + s.idp + 'add" onclick="BPTL._add(\'' + key + '\')"><i class="fa-solid fa-plus"></i> Thêm tài liệu</button></div>'
            + '</div>';
    }
    function setErr(id, on, msg) { var e = document.getElementById(id); if (!e) return; if (msg) e.textContent = msg; e.classList.toggle('on', !!on); }

    // opts: { rows, required, title (mặc định 'Tài liệu đính kèm'; '' = không hiển thị tiêu đề), exts, maxBytes, fmtMsg, sizeMsg (chuỗi hoặc hàm(tên tệp)),
    //         maxRows, maxMsg, nameMax (mặc định 500), onChange(rows), onView(row), onDownload(row) }
    function mount(key, hostId, opts) {
        opts = opts || {};
        S[key] = {
            hostId: hostId, rows: rows(opts.rows), required: !!opts.required,
            title: opts.title === undefined ? 'Tài liệu đính kèm' : opts.title,
            exts: (opts.exts && opts.exts.length) ? opts.exts : ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
            maxBytes: opts.maxBytes || 0, fmtMsg: opts.fmtMsg || '', sizeMsg: opts.sizeMsg || '',
            maxRows: opts.maxRows || 0, maxMsg: opts.maxMsg || '', nameMax: opts.nameMax || 500,
            onChange: opts.onChange || null, onView: opts.onView || null,
            idp: 'bptl_' + String(key).replace(/[^A-Za-z0-9_]/g, '_') + '_'
        };
        render(key);
    }
    function msgOf(m, name) { return typeof m === 'function' ? m(name) : m; }

    var BPTL = {
        mount: mount,
        rows: rows,
        css: css,
        set: function (key, list) { var s = S[key]; if (!s) return; s.rows = rows(list); render(key); },
        get: function (key) {
            var s = S[key]; if (!s) return [];
            sync(key);
            return s.rows.filter(function (r) { return String(r.name || '').trim() || r.file; })
                .map(function (r) { return { name: String(r.name || '').trim(), file: r.file ? { id: r.file.id || '', name: r.file.name, size: r.file.size || '' } : null }; });
        },
        hasData: function (key) { return BPTL.get(key).length > 0; },
        // Kiểm tra khi lưu: dòng có dữ liệu phải đủ Tên tài liệu, văn bản và tệp; bảng bắt buộc phải có tối thiểu 01 dòng đủ dữ liệu.
        validate: function (key) {
            var s = S[key]; if (!s) return true;
            var host = document.getElementById(s.hostId);
            if (!host || host.offsetParent === null) return true; // khối đang ẩn: không kiểm tra
            sync(key);
            var first = null, full = 0;
            var any = s.rows.some(function (x) { return String(x.name || '').trim() || x.file; });
            s.rows.forEach(function (r, i) {
                var hasName = !!String(r.name || '').trim(), hasFile = !!r.file;
                var need = hasName || hasFile || (s.required && !any && i === 0);
                var badName = need && !hasName, badFile = need && !hasFile;
                var n = document.getElementById(s.idp + 'n' + i), b = document.getElementById(s.idp + 'b' + i);
                if (n) n.classList.toggle('is-invalid', badName);
                if (b) b.classList.toggle('is-invalid', badFile);
                setErr(s.idp + 'ne' + i, badName, MSG_REQ);
                setErr(s.idp + 'fe' + i, badFile, MSG_REQ);
                if (!first && badName) first = n;
                if (!first && badFile) first = b;
                if (hasName && hasFile) full++;
            });
            if (first) { if (first.focus) first.focus(); return false; }
            if (s.required && !full) { setErr(s.idp + 'err', true, MSG_REQ); return false; }
            return true;
        },
        _onName: function (key, i) {
            var s = S[key]; if (!s) return;
            var el = document.getElementById(s.idp + 'n' + i);
            if (el) { el.classList.remove('is-invalid'); if (s.rows[i]) s.rows[i].name = el.value; }
            setErr(s.idp + 'ne' + i, false); setErr(s.idp + 'err', false);
            changed(key);
        },
        _add: function (key) {
            var s = S[key]; if (!s) return;
            sync(key);
            if (s.maxRows && s.rows.length >= s.maxRows) { setErr(s.idp + 'err', true, s.maxMsg || ('Chỉ được đính kèm tối đa ' + s.maxRows + ' tệp.')); return; }
            s.rows.push({ name: '', file: null });
            render(key);
            var n = document.getElementById(s.idp + 'n' + (s.rows.length - 1)); if (n) n.focus();
            changed(key);
        },
        _pick: function (key, i, input) {
            var s = S[key]; if (!s) return;
            var f = input && input.files && input.files[0];
            if (!f || !s.rows[i]) return;
            sync(key);
            var x = extOf(f.name);
            var msg = s.exts.indexOf(x) < 0 ? (msgOf(s.fmtMsg, f.name) || ('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng ' + s.exts.join(', ') + '.'))
                : (s.maxBytes && f.size > s.maxBytes ? (msgOf(s.sizeMsg, f.name) || 'Tệp vượt quá dung lượng cho phép.') : '');
            input.value = '';
            if (msg) { setErr(s.idp + 'fe' + i, true, msg); var b = document.getElementById(s.idp + 'b' + i); if (b) b.classList.add('is-invalid'); return; }
            var id = 'bptl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
            BLOBS[id] = f;
            s.rows[i].file = { id: id, name: f.name, size: f.size };
            if (!String(s.rows[i].name || '').trim()) s.rows[i].name = baseName(f.name);
            render(key);
            changed(key);
        },
        _del: function (key, i) {
            var s = S[key]; if (!s) return;
            sync(key);
            s.rows.splice(i, 1);
            render(key);
            changed(key);
        },
        _view: function (key, i) { var s = S[key]; if (s && s.rows[i] && s.rows[i].file) BPTL.open(s.rows[i].file, s.rows[i].name, s.onView); },

        // ---------- Chế độ xem ----------
        // opts: { title (mặc định 'Tài liệu đính kèm'; '' = không tiêu đề), nameLabel, onView(row), onDownload(row) }; không có tài liệu thì trả về ''
        viewHtml: function (list, opts) {
            opts = opts || {};
            var rs = rows(list);
            if (!rs.length) return '';
            css();
            var vid = 'v' + (++seq);
            VIEWS[vid] = { rows: rs, opts: opts };
            var body = rs.map(function (r, i) {
                var sz = r.file ? fmtSize(r.file.size) : '';
                return '<tr><td class="bptl-c">' + (i + 1) + '</td><td class="bptl-title">' + esc(r.name || (r.file && baseName(r.file.name)) || '') + '</td>'
                    + '<td class="bptl-fc">' + (r.file ? '<div class="bptl-file" title="' + esc(r.file.name) + (sz ? ' (' + esc(sz) + ')' : '') + '"><i class="' + fileIcon(r.file.name) + '"></i><span class="bptl-fn">' + esc(r.file.name) + '</span>' + (sz ? '<small>(' + esc(sz) + ')</small>' : '') + '</div>' : '<span class="bptl-dash">--</span>') + '</td>'
                    + '<td class="bptl-c">' + (r.file ? '<span class="bptl-acts">'
                        + '<button type="button" data-admin-icon-normalized="1" class="bptl-ib" title="Xem file" aria-label="Xem file" onclick="BPTL._vOpen(\'' + vid + '\',' + i + ')"><i class="fa-solid fa-eye"></i></button>'
                        + '<button type="button" data-admin-icon-normalized="1" class="bptl-ib" title="Tải file" aria-label="Tải file" onclick="BPTL._vDown(\'' + vid + '\',' + i + ')"><i class="fa-solid fa-download"></i></button>'
                        + '</span>' : '<span class="bptl-dash">--</span>') + '</td></tr>';
            }).join('');
            var title = opts.title === undefined ? 'Tài liệu đính kèm' : opts.title;
            return '<div class="bptl-sec bptl-view">'
                + (title ? '<div class="bptl-sec-title"><i class="fa-solid fa-paperclip"></i> ' + esc(title) + '</div>' : '')
                + '<div class="bptl-wrap"><table class="bptl-table"><thead><tr><th class="bptl-c" style="width:56px;">STT</th><th>' + esc(opts.nameLabel || 'Tên tài liệu, văn bản') + '</th><th class="bptl-c" style="width:40%;">File đính kèm</th><th class="bptl-c" style="width:100px;">Thao tác</th></tr></thead><tbody>'
                + body + '</tbody></table></div></div>';
        },
        _vOpen: function (vid, i) { var v = VIEWS[vid]; if (v && v.rows[i] && v.rows[i].file) BPTL.open(v.rows[i].file, v.rows[i].name, v.opts.onView); },
        _vDown: function (vid, i) { var v = VIEWS[vid]; if (v && v.rows[i] && v.rows[i].file) BPTL.download(v.rows[i].file, v.opts.onDownload); },
        // Xem file: tệp vừa tải trong phiên mở đúng tệp tại tab mới; tài liệu mẫu (không có nội dung tệp) mở trang xem giả lập
        open: function (file, title, onView) {
            if (!file) return;
            var b = file.id && BLOBS[file.id];
            if (b) { if (!file.__url) file.__url = URL.createObjectURL(b); window.open(file.__url, '_blank'); return; }
            if (typeof onView === 'function') { onView({ name: title || '', file: file }); return; }
            var w = window.open('', '_blank');
            if (!w) return;
            w.document.title = file.name;
            w.document.body.style.cssText = 'font-family:Arial,sans-serif;padding:24px;color:#0f172a;';
            w.document.body.innerHTML = '<h2 style="margin:0 0 8px;">Xem file</h2><p style="margin:0 0 4px;"><b>' + esc(title || baseName(file.name)) + '</b></p><p style="margin:0;color:#475569;">' + esc(file.name) + '</p><p style="margin-top:16px;color:#64748b;font-size:13px;">Nội dung tệp mẫu của prototype (giả lập).</p>';
        },
        download: function (file, onDownload) {
            if (!file) return;
            var b = file.id && BLOBS[file.id];
            if (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); return; }
            if (typeof onDownload === 'function') { onDownload({ file: file }); return; }
            toast('Đang tải xuống tệp ' + file.name + ' (giả lập).', 'info');
        }
    };
    window.BPTL = BPTL;
})();
