/*
 * Bảng "Tài liệu kèm theo" dùng chung cho các popup trình ký Lãnh đạo (Hình thức ký = Ký số trên hệ thống)
 * và khối chỉ đọc "Tài liệu kèm theo" tại màn Ký duyệt/Từ chối của Lãnh đạo.
 * - Bảng chuẩn BTNN (đồng nhất mọi form Thêm mới / Cập nhật có đính kèm file):
 *   STT | Tên tài liệu, văn bản | File đính kèm (nút "Tải file") | Thao tác (Xem file / Xóa); nút "Thêm tài liệu" dưới bảng.
 *   Chế độ xem: Thao tác Xem file / Tải file; bảng rỗng thì không hiển thị.
 *   Nút "Tải file" và "Thêm tài liệu": cùng style .tlkt-btn-pri (nền xanh primary, chữ trắng).
 * - tlktStd(): tự chuẩn hóa các bảng tài liệu dựng riêng tại từng trang (tên cột, nút, icon Thao tác, ẩn bảng rỗng ở chế độ xem).
 * - Tải file: .pdf, .doc, .docx, .jpg, .jpeg, .png; tối đa 50MB/tệp (MSG-ERR-FILE-001 / MSG-ERR-FILE-002).
 * - Xem file: mở chính tệp đã tải tại tab mới (giữ tệp trong bộ nhớ + IndexedDB để mở lại sau khi tải lại trang).
 * - Dữ liệu lưu vào phiếu trình: [{ name, file: { id, name, size, type }, scope: 'issued' | 'internal', unit }].
 * - Popup trình ký (không truyền noLeader): 02 khối "Tài liệu ban hành kèm theo" (scope issued) + "Tài liệu không ban hành kèm theo" (scope internal);
 *   Ký ngoài (tlktShow(key, false) / tlktMode(key, 'offline')): chỉ khối Tài liệu ban hành kèm theo.
 * - Khối chỉ đọc / Lịch sử trình ký: tách 02 khối; Tài liệu không ban hành kèm theo chỉ hiển thị cho đơn vị trình (unit = đơn vị gốc người xem).
 * - Dữ liệu cũ chưa có scope: quy đổi thành Tài liệu không ban hành kèm theo.
 */
(function () {
    'use strict';
    var EXTS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    var MAX_BYTES = 50 * 1024 * 1024;
    var MSG_REQ = 'Đây là trường bắt buộc';
    var MSG_FMT = 'Tệp không đúng định dạng. Chỉ chấp nhận .pdf, .doc, .docx, .jpg, .jpeg, .png.';
    var MSG_SIZE = 'Tệp vượt quá dung lượng cho phép (tối đa 50MB).';
    var S = {};          // key -> { hostId, required, rows, secClass, titleClass, visible }
    var BLOBS = {};      // fileId -> File/Blob (phiên hiện tại)
    var VIEWS = {};      // viewId -> danh sách tài liệu (khối chỉ đọc)
    var viewSeq = 0;

    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function toast(msg, type) { if (typeof window.showToast === 'function') window.showToast(msg, type || 'info'); else window.alert(msg); }
    function fmtSize(b) { b = Number(b) || 0; if (!b) return ''; return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
    function fileIcon(name) {
        var ext = (String(name || '').match(/\.[^.]+$/) || [''])[0].toLowerCase();
        if (ext === '.pdf') return 'fa-solid fa-file-pdf tlkt-ico-pdf';
        if (ext === '.doc' || ext === '.docx') return 'fa-solid fa-file-word tlkt-ico-word';
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') return 'fa-solid fa-file-image tlkt-ico-img';
        return 'fa-solid fa-file-lines';
    }

    // ---------- Lưu tệp: bộ nhớ + IndexedDB (best effort) ----------
    var dbp = null;
    function db() {
        if (dbp) return dbp;
        dbp = new Promise(function (resolve) {
            try {
                if (!window.indexedDB) { resolve(null); return; }
                var req = window.indexedDB.open('btnn_tlkt', 1);
                req.onupgradeneeded = function () { try { req.result.createObjectStore('files'); } catch (e) { /* bỏ qua */ } };
                req.onsuccess = function () { resolve(req.result); };
                req.onerror = function () { resolve(null); };
            } catch (e) { resolve(null); }
        });
        return dbp;
    }
    function idbPut(id, blob) {
        db().then(function (d) { if (!d) return; try { d.transaction('files', 'readwrite').objectStore('files').put(blob, id); } catch (e) { /* bỏ qua */ } });
    }
    function idbGet(id) {
        return db().then(function (d) {
            if (!d) return null;
            return new Promise(function (resolve) {
                try {
                    var r = d.transaction('files', 'readonly').objectStore('files').get(id);
                    r.onsuccess = function () { resolve(r.result || null); };
                    r.onerror = function () { resolve(null); };
                } catch (e) { resolve(null); }
            });
        });
    }
    // Xem file: mở chính tệp đã tải lên tại tab mới (URL.createObjectURL + window.open)
    function openFile(meta) {
        if (!meta) return;
        var isBlob = function (b) { return typeof Blob !== 'undefined' && b instanceof Blob; };
        var mem = (meta.id && BLOBS[meta.id]) || (isBlob(meta.raw) ? meta.raw : null);
        if (mem) { if (!meta.__url) meta.__url = URL.createObjectURL(mem); window.open(meta.__url, '_blank'); return; }
        if (!meta.id) { toast('Tệp mẫu [' + (meta.name || '') + '] không có nội dung để mở xem.', 'info'); return; }
        var w = window.open('', '_blank');
        idbGet(meta.id).then(function (b) {
            if (b) { BLOBS[meta.id] = b; var u = URL.createObjectURL(b); if (w) w.location.href = u; else window.open(u, '_blank'); return; }
            if (w) w.close();
            toast('Tệp mẫu [' + (meta.name || '') + '] không có nội dung để mở xem.', 'info');
        });
    }

    // ---------- CSS (prefix tlkt-) ----------
    function css() {
        if (document.getElementById('tlktCss')) return;
        var st = document.createElement('style');
        st.id = 'tlktCss';
        st.textContent = [
            '.tlkt-wrap { border: 1px solid #e2e8f0; border-radius: 8px; overflow-x: auto; background: #fff; }',
            '.tlkt-table { width: 100%; border-collapse: collapse; font-size: 12.5px; min-width: 560px; }',
            '.tlkt-table th { background: #f8fafc; color: #334155; font-weight: 600; text-align: center; padding: 8px 10px; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }',
            '.tlkt-table td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: top; color: #1e293b; }',
            '.tlkt-table tr:last-child td { border-bottom: 0; }',
            '.tlkt-table .tlkt-c { text-align: center; }',
            '.tlkt-table input.tlkt-name { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 9px; font: inherit; font-size: 12.5px; }',
            '.tlkt-table input.tlkt-name.is-invalid { border-color: #dc2626; background: #fef2f2; }',
            '.tlkt-btn { display: inline-flex; align-items: center; gap: 6px; border: 1px solid #cbd5e1; background: #fff; color: #334155; border-radius: 6px; padding: 5px 10px; font: inherit; font-size: 12px; cursor: pointer; white-space: nowrap; }',
            '.tlkt-btn:hover { background: #f1f5f9; }',
            '.tlkt-btn.is-invalid { border-color: #dc2626; background: #fef2f2; }',
            // Nút "Tải file" (cột File đính kèm) và nút "Thêm tài liệu": cùng 1 style nền xanh (primary hệ thống), chữ trắng, cùng kích thước - đồng nhất mọi form Thêm mới / Cập nhật
            '.tlkt-btn-pri, .tlkt-btn.tlkt-btn-pri, .btn.tlkt-btn-pri, label.tlkt-btn-pri { display: inline-flex !important; align-items: center; justify-content: center; gap: 6px; height: 30px; box-sizing: border-box; padding: 0 12px !important; border: 1px solid #1e3a8a !important; background: #1e3a8a !important; color: #fff !important; border-radius: 6px !important; font-family: inherit; font-size: 12px !important; font-weight: 500 !important; line-height: 1 !important; cursor: pointer; white-space: nowrap; text-decoration: none !important; box-shadow: none !important; width: auto !important; min-width: 0 !important; }',
            '.tlkt-btn-pri:hover { background: #1e40af !important; border-color: #1e40af !important; color: #fff !important; }',
            '.tlkt-btn-pri i { color: #fff !important; font-size: 12px !important; margin: 0 !important; }',
            '.tlkt-btn-pri.is-invalid { border-color: #dc2626 !important; box-shadow: 0 0 0 2px #fecaca !important; }',
            // Nút "Thêm tài liệu": style nút phụ (viền, nền trắng, chữ màu primary), cùng kích thước nút Tải file - đồng nhất mọi form
            '.tlkt-btn-add, .tlkt-btn.tlkt-btn-add, .btn.tlkt-btn-add { display: inline-flex !important; align-items: center; justify-content: center; gap: 6px; height: 30px; box-sizing: border-box; padding: 0 12px !important; border: 1px solid #1e3a8a !important; background: #fff !important; color: #1e3a8a !important; border-radius: 6px !important; font-family: inherit; font-size: 12px !important; font-weight: 500 !important; line-height: 1 !important; cursor: pointer; white-space: nowrap; text-decoration: none !important; box-shadow: none !important; width: auto !important; min-width: 0 !important; }',
            '.tlkt-btn-add:hover { background: #eff6ff !important; }',
            '.tlkt-btn-add i { color: #1e3a8a !important; font-size: 12px !important; margin: 0 !important; }',
            '.tlkt-add { margin-top: 8px; }',
            // Cột File đính kèm: nút Tải file / tên tệp căn giữa ngang + dọc; tên tệp 1 dòng, dài thì cắt "…" (rê chuột xem đủ)
            'td.tlkt-fc { text-align: center !important; vertical-align: middle !important; }',
            'table.tlkt-std > tbody > tr > td, .tlkt-table td { vertical-align: middle; }',
            'td.tlkt-fc .tlkt-file, td.tlkt-fc .file-name { display: inline-flex !important; align-items: center; justify-content: center; gap: 6px; max-width: 100%; min-width: 0; vertical-align: middle; }',
            'td.tlkt-fc .tlkt-file span, td.tlkt-fc .file-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
            // Bảng tài liệu dựng ngoài thư viện (được chuẩn hóa bởi tlktStd): tiêu đề cột căn giữa, cột STT/Thao tác hẹp căn giữa
            'table.tlkt-std > thead th { text-align: center !important; vertical-align: middle; }',
            'table.tlkt-std td.tlkt-c { text-align: center !important; }',
            'table.tlkt-std .tlkt-acts-std { display: inline-flex; gap: 10px; align-items: center; justify-content: center; white-space: nowrap; }',
            '.tlkt-file { display: flex; align-items: center; gap: 6px; font-weight: 600; color: #0f172a; word-break: break-all; }',
            '.tlkt-file small { color: #64748b; font-weight: 400; white-space: nowrap; }',
            '.tlkt-ico-pdf { color: #dc2626; } .tlkt-ico-word { color: #2563eb; } .tlkt-ico-img { color: #0d9488; }',
            '.tlkt-acts { display: inline-flex; gap: 10px; white-space: nowrap; }',
            '.tlkt-link { color: #2563eb; cursor: pointer; text-decoration: none; background: none; border: 0; padding: 0; font: inherit; font-size: 12.5px; }',
            '.tlkt-link.is-disabled { color: #94a3b8; pointer-events: none; }',
            '.tlkt-link.tlkt-del { color: #dc2626; }',
            '.tlkt-ib { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; border: 1px solid #bfdbfe; background: #eff6ff; color: #2563eb; cursor: pointer; padding: 0; font-size: 13px; }',
            '.tlkt-ib:hover { filter: brightness(0.95); }',
            '.tlkt-ib.tlkt-ib-del { border-color: #fecaca; background: #fef2f2; color: #dc2626; }',
            '.tlkt-ib.is-disabled { border-color: #e2e8f0; background: #f8fafc; color: #cbd5e1; pointer-events: none; }',
            // Icon thao tác của bảng dựng ngoài thư viện: cùng kích thước / màu với .tlkt-ib
            '.tlkt-ib.tlkt-ib-std { width: 30px !important; height: 30px !important; min-width: 30px !important; display: inline-flex !important; align-items: center; justify-content: center; border-radius: 6px !important; border: 1px solid #bfdbfe !important; background: #eff6ff !important; color: #2563eb !important; padding: 0 !important; margin: 0 !important; font-size: 13px !important; text-decoration: none !important; box-shadow: none !important; }',
            '.tlkt-ib.tlkt-ib-std i { color: inherit !important; margin: 0 !important; font-size: 13px !important; }',
            '.tlkt-ib.tlkt-ib-std.tlkt-ib-del { border-color: #fecaca !important; background: #fef2f2 !important; color: #dc2626 !important; }',
            '.tlkt-ib.tlkt-ib-std.is-disabled { border-color: #e2e8f0 !important; background: #f8fafc !important; color: #cbd5e1 !important; pointer-events: none; }',
            '.tlkt-err { color: #dc2626; font-size: 11.5px; margin-top: 4px; display: none; }',
            '.tlkt-err.on { display: block; }',
            '.tlkt-hint { color: #64748b; font-size: 11.5px; margin-top: 6px; }',
            '.tlkt-empty { text-align: center; color: #94a3b8; font-style: italic; }',
            '.tlkt-sec-title { font-weight: 700; color: #0f172a; font-size: 13px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }',
            '.tlkt-req { color: #dc2626; margin-left: 2px; }',
            '.tlkt-view { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #fff; }',
            '.tlkt-view-box .tlkt-table { min-width: 0; }',
            '.tlkt-view-box .tlkt-table th, .tlkt-view-box .tlkt-table td { padding: 6px 8px; }',
            // Tên tệp 1 dòng, dài thì cắt "…", rê chuột hiện đủ tên (title); dung lượng màu xám ngay sau tên
            '.tlkt-view-box .tlkt-table { table-layout: fixed; }',
            '.tlkt-view-box .tlkt-file { display: flex; align-items: center; gap: 6px; min-width: 0; font-weight: 500; font-size: 12px; word-break: normal; }',
            '.tlkt-view-box .tlkt-file i { flex: none; }',
            '.tlkt-view-box .tlkt-file span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
            '.tlkt-view-box .tlkt-file small { flex: none; display: inline; color: #94a3b8; white-space: nowrap; }'
        ].join('\n');
        (document.head || document.documentElement).appendChild(st);
    }

    // ---------- Bảng nhập (popup trình ký) ----------
    function cloneList(list) {
        return (list || []).map(function (d) {
            var f = d && d.file ? { id: d.file.id || '', name: d.file.name || '', size: d.file.size || 0, type: d.file.type || '' } : null;
            if (f && !f.name) f = null;
            var o = { name: (d && d.name) || '', file: f };
            if (d && d.scope) o.scope = d.scope;
            if (d && d.unit) o.unit = d.unit;
            return o;
        });
    }

    // ---------- Tách 2 khối: Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo ----------
    // Mỗi tài liệu của phiếu trình lưu scope: 'issued' (ban hành kèm theo) | 'internal' (không ban hành kèm theo) và unit (đơn vị gốc của đơn vị trình).
    // Dữ liệu cũ chưa có scope: quy đổi thành 'internal' (không ban hành kèm theo) - không lộ ra đơn vị khác.
    var T_ISSUED = 'Tài liệu ban hành kèm theo', T_INTERNAL = 'Tài liệu không ban hành kèm theo';
    var HINT_ISSUED = 'Tài liệu phát hành cùng văn bản (phụ lục, bảng kê...); hiển thị cho mọi đơn vị được nhận / xem văn bản sau khi ban hành.';
    var HINT_INTERNAL = 'Tài liệu nội bộ phục vụ trình duyệt (tờ trình, ý kiến, hồ sơ tham khảo...); chỉ đơn vị trình và Lãnh đạo ký duyệt của đơn vị xem được, không chuyển cho đơn vị khác.';
    function scopeOf(d) { return d && d.scope === 'issued' ? 'issued' : 'internal'; }
    // Đơn vị (gốc) của người dùng đang xem: trang có thể khai báo window.tlktViewerUnit(); mặc định lấy theo người dùng giả lập BTNN_WF
    function viewerUnit() {
        try {
            if (typeof window.tlktViewerUnit === 'function') return window.tlktViewerUnit() || '';
            var W = window.BTNN_WF;
            if (W && typeof W.getCurrentUser === 'function') { var u = W.getCurrentUser(); return u ? (W.getRootId(u.unitId) || u.unitId || '') : ''; }
        } catch (e) { /* bỏ qua */ }
        return '';
    }
    // Quyền xem Tài liệu không ban hành kèm theo: chỉ đơn vị trình (owner = unit của tài liệu, hoặc opts.ownerUnit với dữ liệu cũ)
    function canSeeInternal(d, opts) {
        opts = opts || {};
        if (opts.hideInternal) return false;
        if (opts.showInternal) return true;
        var owner = (d && d.unit) || opts.ownerUnit || window.tlktDefaultOwnerUnit || '';
        var v = viewerUnit();
        // Màn xem chi tiết có truyền ownerUnit nhưng không xác định được đơn vị trình (dữ liệu cũ): ẩn để không lộ ra đơn vị khác
        if (!owner) return !v || !Object.prototype.hasOwnProperty.call(opts, 'ownerUnit');
        return !v || owner === v;
    }
    function hasDoc(d) {
        if (typeof d === 'string') return !!d;
        return !!(d && (d.name || d.title || (d.file && (typeof d.file === 'string' || d.file.name))));
    }
    // Tách danh sách tài liệu của phiếu trình thành 2 khối (đã áp quyền xem khối không ban hành)
    window.tlktSplit = function (list, opts) {
        var out = { issued: [], internal: [] };
        (list || []).forEach(function (d) {
            if (!hasDoc(d)) return;
            if (scopeOf(d) === 'issued') out.issued.push(d);
            else if (canSeeInternal(d, opts)) out.internal.push(d);
        });
        return out;
    };
    // Trang dựng bảng tài liệu riêng: fn(danh sách, tiêu đề khối, 'issued' | 'internal') -> HTML; khối rỗng / không có quyền xem thì bỏ qua
    window.tlktSplitRender = function (list, opts, fn) {
        var sp = window.tlktSplit(list, opts);
        return (sp.issued.length ? fn(sp.issued, T_ISSUED, 'issued') : '') + (sp.internal.length ? fn(sp.internal, T_INTERNAL, 'internal') : '');
    };
    window.TLKT_T_ISSUED = T_ISSUED;
    window.TLKT_T_INTERNAL = T_INTERNAL;
    // Chỉ Tài liệu ban hành kèm theo (dùng khi chuyển hồ sơ / văn bản cho đơn vị khác)
    window.tlktIssuedOnly = function (list) { return cloneList((list || []).filter(function (d) { return hasDoc(d) && scopeOf(d) === 'issued'; })); };
    window.tlktViewerUnit0 = viewerUnit;
    window.tlktCanSeeInternal = canSeeInternal;
    function sync(key) {
        var s = S[key]; if (!s) return;
        s.rows.forEach(function (r, i) { var el = document.getElementById('tlkt_' + key + '_n' + i); if (el) r.name = el.value; });
    }
    function render(key) {
        var s = S[key]; if (!s) return;
        var host = document.getElementById(s.hostId); if (!host) return;
        css();
        if (!s.rows.length) s.rows = [{ name: '', file: null }];
        var body = s.rows.map(function (r, i) {
            var fileCell = r.file
                ? '<div class="tlkt-file"><i class="' + fileIcon(r.file.name) + '"></i><span>' + esc(r.file.name) + '</span>' + (r.file.size ? '<small>(' + fmtSize(r.file.size) + ')</small>' : '') + '</div>'
                : '<button type="button" class="tlkt-btn tlkt-btn-pri" id="tlkt_' + key + '_b' + i + '" onclick="document.getElementById(\'tlkt_' + key + '_f' + i + '\').click()"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button>';
            return '<tr>'
                + '<td class="tlkt-c">' + (i + 1) + '</td>'
                + '<td><input type="text" class="tlkt-name" id="tlkt_' + key + '_n' + i + '" maxlength="500" value="' + esc(r.name) + '" placeholder="Nhập tên tài liệu, văn bản" oninput="tlktOnName(\'' + key + '\',' + i + ')">'
                + '<div class="tlkt-err" id="tlkt_' + key + '_ne' + i + '">' + MSG_REQ + '</div></td>'
                + '<td class="tlkt-fc"><input type="file" id="tlkt_' + key + '_f' + i + '" accept="' + s.exts.join(',') + '" style="display:none;" onchange="tlktPick(\'' + key + '\',' + i + ',this)">' + fileCell
                + '<div class="tlkt-err" id="tlkt_' + key + '_fe' + i + '">' + MSG_REQ + '</div></td>'
                + '<td class="tlkt-c"><span class="tlkt-acts">' + actsHtml(key, i, !!r.file) + '</span></td></tr>';
        }).join('');
        host.innerHTML = '<div class="' + esc(s.secClass) + ' tlkt-sec">'
            + '<div class="' + esc(s.titleClass) + '"><i class="fa-solid fa-paperclip"></i> ' + esc(s.title) + (s.required ? '<span class="tlkt-req">*</span>' : '') + '</div>'
            + '<div class="tlkt-wrap"><table class="tlkt-table"><thead><tr><th class="tlkt-c" style="width:48px;">STT</th><th>' + esc(s.nameLabel) + (s.required ? '<span class="tlkt-req">*</span>' : '') + '</th><th style="width:220px;">File đính kèm' + (s.required ? '<span class="tlkt-req">*</span>' : '') + '</th><th class="tlkt-c" style="width:90px;">Thao tác</th></tr></thead><tbody>' + body + '</tbody></table></div>'
            + '<div class="tlkt-err" id="tlkt_' + key + '_err">' + MSG_REQ + '</div>'
            + '<div><button type="button" class="tlkt-btn tlkt-btn-add tlkt-add" onclick="tlktAdd(\'' + key + '\')"><i class="fa-solid fa-plus"></i> Thêm tài liệu</button></div>'
            + '<div class="tlkt-hint"><i class="fa-solid fa-circle-info"></i> Chấp nhận tệp ' + s.exts.join(', ') + ' (tối đa 50MB/tệp).' + (s.hint ? ' ' + esc(s.hint) : (s.noLeader ? '' : ' Lãnh đạo xem được các tài liệu này khi Ký duyệt/Từ chối.')) + '</div>'
            + '</div>';
        host.style.display = s.visible === false ? 'none' : '';
    }
    // Cột Thao tác dạng icon: Xem file (mắt), Xóa (thùng rác), có tooltip
    function actsHtml(key, i, hasFile) {
        return '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib' + (hasFile ? '' : ' is-disabled') + '" title="Xem file" aria-label="Xem file" onclick="tlktOpenRow(\'' + key + '\',' + i + ')"><i class="fa-solid fa-eye"></i></button>'
            + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib tlkt-ib-del" title="Xóa" aria-label="Xóa" onclick="tlktRemove(\'' + key + '\',' + i + ')"><i class="fa-solid fa-trash"></i></button>';
    }
    function setErr(id, on, msg) { var e = document.getElementById(id); if (!e) return; if (msg) e.textContent = msg; e.classList.toggle('on', !!on); }

    // Khởi tạo bảng trong vùng hostId; opts: { required, rows, secClass, titleClass, visible, title, nameLabel (tên cột Tên ...; mặc định "Tên tài liệu, văn bản"; lưới Văn bản làm căn cứ dùng "Tên văn bản căn cứ") }
    // Popup trình ký Lãnh đạo (không truyền noLeader) mặc định dựng 02 khối: Tài liệu ban hành kèm theo + Tài liệu không ban hành kèm theo
    // (opts.split = false để giữ 01 bảng). opts.rows: danh sách cũ/lần trình trước (tách theo scope; chưa có scope -> không ban hành kèm theo).
    // opts.required (quy tắc bắt buộc riêng của phân hệ) áp cho khối opts.requiredBlock ('internal' mặc định | 'issued').
    function mountOne(key, hostId, opts) {
        S[key] = { hostId: hostId, required: !!opts.required, rows: cloneList(opts.rows), secClass: opts.secClass || 'gqx-sec', titleClass: opts.titleClass || 'tlkt-sec-title', visible: opts.visible !== false, noLeader: !!opts.noLeader, exts: (opts.exts && opts.exts.length) ? opts.exts : EXTS, title: opts.title || 'Tài liệu kèm theo', nameLabel: opts.nameLabel || STD_NAME, hint: opts.hint || '' };
        render(key);
    }
    window.tlktMount = function (key, hostId, opts) {
        opts = opts || {};
        var split = opts.split != null ? !!opts.split : !opts.noLeader;
        if (!split) { mountOne(key, hostId, opts); return; }
        var host = document.getElementById(hostId); if (!host) return;
        css();
        var rows = cloneList(opts.rows).filter(function (d) { return hasDoc(d) || d.file; });
        var req = opts.required ? (opts.requiredBlock || 'internal') : '';
        host.innerHTML = '<div id="' + hostId + '__bh" data-tlkt-block="issued"></div><div id="' + hostId + '__kbh" data-tlkt-block="internal" style="margin-top:12px;"></div>';
        var base = { secClass: opts.secClass, titleClass: opts.titleClass, exts: opts.exts, nameLabel: opts.nameLabel, noLeader: true };
        mountOne(key + '__bh', hostId + '__bh', Object.assign({}, base, { title: T_ISSUED, hint: HINT_ISSUED, required: req === 'issued', rows: rows.filter(function (d) { return scopeOf(d) === 'issued'; }) }));
        mountOne(key + '__kbh', hostId + '__kbh', Object.assign({}, base, { title: T_INTERNAL, hint: HINT_INTERNAL, required: req === 'internal', rows: rows.filter(function (d) { return scopeOf(d) === 'internal'; }) }));
        S[key] = { split: true, hostId: hostId, offline: false, visible: opts.visible !== false };
        host.style.display = S[key].visible ? '' : 'none';
    };
    // Bảng 02 khối: on = true -> Ký số (02 khối); on = false -> Ký ngoài (chỉ khối Tài liệu ban hành kèm theo)
    // tlktMode(key, 'online' | 'offline' | 'hidden'): đặt chế độ tường minh
    window.tlktMode = function (key, mode) {
        var s = S[key]; if (!s) return;
        var host = document.getElementById(s.hostId);
        if (!s.split) { s.visible = mode === 'online'; if (host) host.style.display = s.visible ? '' : 'none'; return; }
        s.visible = mode !== 'hidden'; s.offline = mode === 'offline';
        if (host) host.style.display = s.visible ? '' : 'none';
        var bh = S[key + '__bh'], kbh = S[key + '__kbh'];
        if (bh) bh.visible = s.visible;
        if (kbh) { kbh.visible = s.visible && !s.offline; var h2 = document.getElementById(kbh.hostId); if (h2) h2.style.display = kbh.visible ? '' : 'none'; }
    };
    window.tlktShow = function (key, on) {
        var s = S[key]; if (!s) return;
        if (s.split) { window.tlktMode(key, on ? 'online' : 'offline'); return; }
        s.visible = !!on;
        var host = document.getElementById(s.hostId); if (host) host.style.display = on ? '' : 'none';
    };
    window.tlktOnName = function (key, i) {
        var el = document.getElementById('tlkt_' + key + '_n' + i);
        if (el) { el.classList.remove('is-invalid'); if (S[key] && S[key].rows[i]) S[key].rows[i].name = el.value; }
        setErr('tlkt_' + key + '_ne' + i, false); setErr('tlkt_' + key + '_err', false);
    };
    window.tlktAdd = function (key) { var s = S[key]; if (!s) return; sync(key); s.rows.push({ name: '', file: null }); render(key); };
    window.tlktPick = function (key, i, input) {
        var s = S[key]; if (!s) return;
        var f = input && input.files && input.files[0];
        if (!f || !s.rows[i]) return;
        sync(key);
        var ext = (String(f.name).match(/\.[^.]+$/) || [''])[0].toLowerCase();
        var msg = s.exts.indexOf(ext) < 0 ? 'Tệp không đúng định dạng. Chỉ chấp nhận ' + s.exts.join(', ') + '.' : (f.size > MAX_BYTES ? MSG_SIZE : '');
        input.value = '';
        if (msg) { setErr('tlkt_' + key + '_fe' + i, true, msg); var b = document.getElementById('tlkt_' + key + '_b' + i); if (b) b.classList.add('is-invalid'); return; }
        var id = 'tlkt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        BLOBS[id] = f; idbPut(id, f);
        s.rows[i].file = { id: id, name: f.name, size: f.size, type: f.type || '' };
        if (!String(s.rows[i].name || '').trim()) s.rows[i].name = f.name.replace(/\.[^.]+$/, '');
        render(key);
    };
    window.tlktOpenRow = function (key, i) { var s = S[key]; if (s && s.rows[i] && s.rows[i].file) openFile(s.rows[i].file); };
    window.tlktRemove = function (key, i) {
        var s = S[key]; if (!s) return;
        sync(key);
        var r = s.rows[i]; if (!r) return;
        // Xóa thẳng dòng tài liệu, không hỏi xác nhận (chốt 23/10)
        s.rows.splice(i, 1); render(key);
    };
    // Danh sách tài liệu đã nhập (bỏ dòng trống), dùng để lưu vào phiếu trình
    window.tlktGet = function (key) {
        var s = S[key]; if (!s) return [];
        if (s.split) {
            var u = viewerUnit();
            var tag = function (list, sc) { return list.map(function (d) { d.scope = sc; if (u) d.unit = u; return d; }); };
            var iss = tag(window.tlktGet(key + '__bh'), 'issued');
            var inn = s.offline ? [] : tag(window.tlktGet(key + '__kbh'), 'internal');
            return iss.concat(inn);
        }
        sync(key);
        return cloneList(s.rows.filter(function (r) { return String(r.name || '').trim() || r.file; }).map(function (r) { return { name: String(r.name || '').trim(), file: r.file }; }));
    };
    // Kiểm tra: dòng có dữ liệu phải đủ Tên + Tệp; bảng bắt buộc phải có tối thiểu 01 dòng đủ Tên + Tệp.
    // Trả về true nếu hợp lệ; nếu lỗi: tô viền đỏ ô lỗi, hiển thị thông báo dưới ô, focus ô lỗi đầu tiên.
    window.tlktValidate = function (key) {
        var s = S[key]; if (!s || s.visible === false) return true;
        if (s.split) {
            var ok1 = window.tlktValidate(key + '__bh');
            var ok2 = window.tlktValidate(key + '__kbh');
            return ok1 && ok2;
        }
        sync(key);
        var first = null;
        var full = 0;
        s.rows.forEach(function (r, i) {
            var hasName = !!String(r.name || '').trim(), hasFile = !!r.file;
            var need = hasName || hasFile || (s.required && i === 0 && !s.rows.some(function (x) { return String(x.name || '').trim() || x.file; }));
            var badName = need && !hasName, badFile = need && !hasFile;
            var n = document.getElementById('tlkt_' + key + '_n' + i), b = document.getElementById('tlkt_' + key + '_b' + i);
            if (n) n.classList.toggle('is-invalid', badName);
            if (b) b.classList.toggle('is-invalid', badFile);
            setErr('tlkt_' + key + '_ne' + i, badName, MSG_REQ);
            setErr('tlkt_' + key + '_fe' + i, badFile, MSG_REQ);
            if (!first && badName) first = n; if (!first && badFile) first = b;
            if (hasName && hasFile) full++;
        });
        if (first) { first.focus(); return false; }
        if (s.required && !full) { setErr('tlkt_' + key + '_err', true, MSG_REQ); return false; }
        return true;
    };

    // ---------- Khối chỉ đọc (màn Ký duyệt/Từ chối) ----------
    // list: danh sách tài liệu của lần trình hiện hành; trả về '' khi không có tài liệu
    // Mặc định (tài liệu của phiếu trình) hiển thị 02 khối riêng: Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo;
    // khối không có dữ liệu thì không hiển thị; khối không ban hành chỉ hiển thị cho đơn vị trình (opts.ownerUnit / showInternal / hideInternal).
    // opts.split = false: 01 bảng (danh sách không thuộc phiếu trình), tiêu đề opts.title (mặc định "Tài liệu kèm theo").
    window.tlktViewHtml = function (list, opts) {
        opts = opts || {};
        if (opts.split !== false) {
            var sp = window.tlktSplit(list, opts);
            return (sp.issued.length ? viewOne(sp.issued, Object.assign({}, opts, { title: T_ISSUED, block: 'issued' })) : '')
                + (sp.internal.length ? viewOne(sp.internal, Object.assign({}, opts, { title: T_INTERNAL, block: 'internal' })) : '');
        }
        return viewOne(list, opts);
    };
    function viewOne(list, opts) {
        opts = opts || {};
        var rows = (list || []).filter(function (d) { return d && (d.name || (d.file && d.file.name)); });
        if (!rows.length) return '';
        css();
        var vid = 'v' + (++viewSeq);
        VIEWS[vid] = rows;
        // Cùng dạng bảng như lúc nhập (chỉ đọc): STT | Tên tài liệu, văn bản | File đính kèm (tên tệp, dung lượng) | Thao tác (Xem file / Tải file)
        var body = rows.map(function (d, i) {
            var f = d.file;
            var sz = f ? (isNaN(Number(f.size)) ? String(f.size || '') : fmtSize(f.size)) : '';
            return '<tr data-kdtc-tlkt-row="1"><td class="tlkt-c">' + (i + 1) + '</td><td>' + esc(d.name || (f && f.name) || '') + '</td>'
                + '<td class="tlkt-fc">' + (f ? '<div class="tlkt-file"><i class="' + fileIcon(f.name) + '"></i><span title="' + esc(f.name) + '">' + esc(f.name) + '</span>' + (sz ? '<small>(' + esc(sz) + ')</small>' : '') + '</div>' : '<span style="color:#94a3b8;">--</span>') + '</td>'
                + '<td class="tlkt-c">' + (f ? '<span class="tlkt-acts"><button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Xem file" aria-label="Xem file" onclick="tlktOpenView(\'' + vid + '\',' + i + ')"><i class="fa-solid fa-eye"></i></button>'
                    + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Tải file" aria-label="Tải file" onclick="tlktDownloadView(\'' + vid + '\',' + i + ')"><i class="fa-solid fa-download"></i></button></span>' : '<span style="color:#94a3b8;">--</span>') + '</td></tr>';
        }).join('');
        var boxCls = opts.boxClass || 'tlkt-view';
        var titleCls = opts.titleClass || 'tlkt-sec-title';
        return '<div class="' + esc(boxCls) + ' tlkt-view-box" id="kdtcTlkt' + vid + '"' + (opts.block ? ' data-tlkt-block="' + opts.block + '"' : '') + '><div class="' + esc(titleCls) + '"><i class="fa-solid fa-paperclip"></i> ' + esc(opts.title || 'Tài liệu kèm theo') + '</div>'
            + '<div class="tlkt-wrap"><table class="tlkt-table"><thead><tr><th class="tlkt-c" style="width:36px;">STT</th><th>' + esc(opts.nameLabel || STD_NAME) + '</th><th style="width:44%;">File đính kèm</th><th class="tlkt-c" style="width:90px;">Thao tác</th></tr></thead><tbody>' + body + '</tbody></table></div></div>';
    }
    window.tlktOpenView = function (vid, i) { var l = VIEWS[vid]; if (l && l[i] && l[i].file) openFile(l[i].file); };
    window.tlktDownloadView = function (vid, i) {
        var l = VIEWS[vid]; var f = l && l[i] && l[i].file; if (!f) return;
        window.tlktDownloadFile(f, function (ok) { if (!ok) toast('Tải xuống tệp [' + (f.name || '') + '] (giả lập).', 'info'); });
    };
    window.tlktOpenFile = openFile;
    // Dùng chung cho bảng Tài liệu kèm theo dựng ngoài thư viện (VD quan_ly_boi_thuong_ctvv.js): nạp CSS tlkt-
    window.tlktCss = css;
    // Tải file: tải chính tệp đã tải lên (bộ nhớ phiên / IndexedDB); trả về false khi không có nội dung tệp
    window.tlktDownloadFile = function (meta, done) {
        if (!meta) { if (done) done(false); return; }
        var save = function (b) {
            var a = document.createElement('a');
            a.href = URL.createObjectURL(b); a.download = meta.name || 'tai_lieu';
            document.body.appendChild(a); a.click(); a.remove();
            if (done) done(true);
        };
        var mem = (meta.id && BLOBS[meta.id]) || null;
        if (mem) { save(mem); return; }
        if (!meta.id) { if (done) done(false); return; }
        idbGet(meta.id).then(function (b) { if (b) { BLOBS[meta.id] = b; save(b); } else if (done) done(false); });
    };
    // Giữ tệp (VD: tệp văn bản trình ký tải lên) để mở lại khi trình lại; trả về id lưu trữ
    window.tlktKeep = function (blob) {
        if (!blob || typeof Blob === 'undefined' || !(blob instanceof Blob)) return '';
        var id = 'tlkt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        BLOBS[id] = blob; idbPut(id, blob);
        return id;
    };
    // Lấy lại tệp đã giữ (bộ nhớ phiên hiện tại); không có thì trả về null
    window.tlktBlob = function (id) { return (id && BLOBS[id]) || null; };
    // Ghi tên tài liệu kèm theo vào ghi chú lịch sử
    // Ghi chú lịch sử chỉ ghi tên Tài liệu ban hành kèm theo (lịch sử hiển thị cho cả đơn vị khác); Tài liệu không ban hành kèm theo
    // xem tại khối tài liệu của lần trình (tlktTagHistory / tlktInlineHtml áp quyền xem theo đơn vị)
    window.tlktNote = function (list) {
        var names = (list || []).filter(function (d) { return d && scopeOf(d) === 'issued'; }).map(function (d) { return d.name || (d.file && d.file.name) || ''; }).filter(Boolean);
        return names.length ? ' ' + T_ISSUED + ': ' + names.join('; ') + '.' : '';
    };
    // Gắn danh sách tài liệu vào mục lịch sử "Trình ..." mới nhất của hồ sơ luồng xử lý (để lịch sử mỗi lần trình hiển thị tài liệu của lần đó)
    window.tlktTagHistory = function (W, rec, list) {
        if (!W || !rec || !rec.history || !rec.history.length) return;
        var h = rec.history[rec.history.length - 1];
        h.attachments = cloneList(list);
        if (typeof W.upsertRecord === 'function') W.upsertRecord(rec);
    };
    // Danh sách tài liệu dạng dòng gọn (dùng trong Lịch sử trình ký)
    // Lịch sử trình ký: 02 nhóm Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo (nhóm không ban hành áp quyền xem theo đơn vị)
    window.tlktInlineHtml = function (list, opts) {
        var sp = window.tlktSplit(list, opts);
        var grp = function (rows, title) {
            if (!rows.length) return '';
            var vid = 'v' + (++viewSeq);
            VIEWS[vid] = rows;
            return '<div style="margin-top:6px; font-size:12px; color:#475569;"><div><i class="fa-solid fa-paperclip"></i> ' + title + ':</div>'
                + rows.map(function (d, i) { return '<div style="padding-left:16px; text-align:left;">' + (i + 1) + '. ' + (d.file ? '<a href="javascript:void(0)" data-admin-icon-normalized="1" style="font-size:12px; color:#2563eb;" title="Xem file" onclick="tlktOpenView(\'' + vid + '\',' + i + ')">' + esc(d.name || d.file.name) + '</a>' : esc(d.name)) + '</div>'; }).join('') + '</div>';
        };
        css();
        return grp(sp.issued, T_ISSUED) + grp(sp.internal, T_INTERNAL);
    };

    // ---------- Chuẩn hóa bảng tài liệu dựng riêng tại từng trang (tlktStd) ----------
    // Nhận diện bảng có cột "Tên ..." + cột tệp; đổi tên cột theo chuẩn, nút Tải file / Thêm tài liệu cùng style nền xanh,
    // icon Thao tác (Xem file / Xóa / Tải file) cùng kích thước + tooltip, ẩn bảng rỗng ở chế độ xem.
    var STD_NAME = 'Tên tài liệu, văn bản', STD_FILE = 'File đính kèm', STD_ACT = 'Thao tác';
    var RE_NAME = /^(tên văn bản, căn cứ|tên văn bản căn cứ|tên tài liệu|tên tài liệu \/ văn bản|tên tài liệu, văn bản|tên văn bản)$/i;
    var RE_BASIS = /^tên văn bản căn cứ$/i; // lưới Văn bản làm căn cứ yêu cầu bồi thường: giữ tên cột riêng
    var RE_FILE = /^(tải file|file đính kèm|tệp đính kèm|tệp)$/i;
    var RE_ACT = /^thao tác( tài liệu)?$/i;
    var RE_UP = /^(tải file|tải lên|tải tệp|chọn file|chọn tệp)\b/i;
    function hText(el) { return String(el.textContent || '').replace(/\*/g, '').replace(/\s+/g, ' ').trim(); }
    function setHead(th, label) {
        if (hText(th) === label) return;
        var star = /\*/.test(th.textContent || '');
        var req = th.querySelector('.tlkt-req, .required, .text-danger, .req');
        th.textContent = label;
        if (req) th.appendChild(req);
        else if (star) { var sp = document.createElement('span'); sp.className = 'tlkt-req'; sp.textContent = '*'; th.appendChild(sp); }
    }
    function keepDisplay(el, fn) { var hid = el.style && el.style.display === 'none'; fn(); if (hid) el.style.display = 'none'; }
    function iconize(el) {
        if (el.getAttribute('data-tlkt-ic') === '1' || el.classList.contains('tlkt-ib')) return;
        var t = (String(el.textContent || '') + ' ' + (el.getAttribute('title') || '')).toLowerCase();
        var ic = el.querySelector('i'); var icls = ic ? String(ic.className) : '';
        var kind = (/xóa|xoá/.test(t) || /fa-trash|fa-xmark|fa-times/.test(icls)) ? 'del'
            : ((/tải|download/.test(t) || /fa-download/.test(icls)) ? 'dl'
                : ((/xem/.test(t) || /fa-eye/.test(icls)) ? 'view' : ''));
        if (!kind) return;
        var label = kind === 'del' ? 'Xóa' : (kind === 'dl' ? 'Tải file' : 'Xem file');
        var icon = kind === 'del' ? 'fa-trash' : (kind === 'dl' ? 'fa-download' : 'fa-eye');
        var dis = el.disabled || /disabled/.test(String(el.className)) || el.getAttribute('aria-disabled') === 'true';
        keepDisplay(el, function () {
            el.setAttribute('data-tlkt-ic', '1'); el.setAttribute('data-admin-icon-normalized', '1');
            el.innerHTML = '<i class="fa-solid ' + icon + '"></i>';
            el.setAttribute('title', label); el.setAttribute('aria-label', label);
            el.removeAttribute('style');
            el.classList.add('tlkt-ib', 'tlkt-ib-std');
            if (kind === 'del') el.classList.add('tlkt-ib-del');
            if (dis) el.classList.add('is-disabled');
        });
    }
    function upBtn(el) {
        if (el.getAttribute('data-tlkt-up') === '1' || el.classList.contains('tlkt-btn-pri')) return;
        keepDisplay(el, function () {
            var inp = el.querySelector('input[type=file]');
            el.setAttribute('data-tlkt-up', '1'); el.setAttribute('data-admin-icon-normalized', '1');
            el.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Tải file';
            if (inp) el.appendChild(inp);
            el.removeAttribute('style');
            ['btn-secondary', 'btn-outline-primary', 'btn-outline-secondary', 'btn-light', 'btn-outline', 'btn-primary'].forEach(function (c) { el.classList.remove(c); });
            el.classList.add('tlkt-btn-pri');
        });
    }
    function addBtn(el) {
        if (el.getAttribute('data-tlkt-add') === '1' || el.classList.contains('tlkt-btn-add')) return;
        keepDisplay(el, function () {
            el.setAttribute('data-tlkt-add', '1');
            el.innerHTML = '<i class="fa-solid fa-plus"></i> Thêm tài liệu';
            el.removeAttribute('style');
            ['btn-secondary', 'btn-outline-primary', 'btn-outline-secondary', 'btn-light', 'btn-outline', 'btn-primary', 'btn-link', 'tlkt-btn-pri'].forEach(function (c) { el.classList.remove(c); });
            el.classList.add('tlkt-btn-add');
        });
    }
    function shown(el, stop) {
        for (var n = el; n && n !== stop; n = n.parentElement) { if (n.style && n.style.display === 'none') return false; if (n.hidden) return false; }
        return true;
    }
    function hasAddNear(wrap) {
        var p = wrap.parentElement;
        for (var k = 0; k < 3 && p; k++, p = p.parentElement) {
            var bs = p.querySelectorAll('button, a.btn');
            for (var j = 0; j < bs.length; j++) if (/thêm (tài liệu|dòng)/i.test(bs[j].textContent || '') && shown(bs[j], p)) return true;
        }
        return false;
    }
    function emptyView(table) {
        var tb = table.tBodies[0]; if (!tb) return;
        var wrap = table.parentElement && /table-container|tlkt-wrap|kpdt-docs-wrap|table-responsive/.test(String(table.parentElement.className)) && table.parentElement.querySelectorAll('table').length === 1 ? table.parentElement : table;
        var rows = tb.rows;
        var empty = rows.length === 0 || (rows.length === 1 && rows[0].cells.length === 1);
        var editing = !!tb.querySelector('input, textarea, select') || hasAddNear(wrap);
        var title = wrap.previousElementSibling;
        if (title && !(/title|label/i.test(String(title.className)) && /tài liệu|văn bản/i.test(title.textContent || ''))) title = null;
        if (empty && !editing) {
            if (wrap.getAttribute('data-tlkt-hid') !== '1') { wrap.setAttribute('data-tlkt-hid', '1'); wrap.style.display = 'none'; if (title) { title.setAttribute('data-tlkt-hid', '1'); title.style.display = 'none'; } }
        } else if (wrap.getAttribute('data-tlkt-hid') === '1') {
            wrap.removeAttribute('data-tlkt-hid'); wrap.style.display = '';
            if (title && title.getAttribute('data-tlkt-hid') === '1') { title.removeAttribute('data-tlkt-hid'); title.style.display = ''; }
        }
    }
    window.tlktStd = function (root) {
        root = root || document;
        css();
        var tables = root.querySelectorAll('table');
        for (var t = 0; t < tables.length; t++) {
            var table = tables[t];
            if (!table.tHead || !table.tHead.rows.length || table.closest('[data-tlkt-skip]')) continue;
            var ths = table.tHead.rows[table.tHead.rows.length - 1].cells;
            var iN = -1, iF = -1, iA = -1;
            for (var c = 0; c < ths.length; c++) {
                var tx = hText(ths[c]);
                if (iN < 0 && RE_NAME.test(tx)) iN = c;
                else if (iF < 0 && RE_FILE.test(tx)) iF = c;
                else if (iA < 0 && RE_ACT.test(tx)) iA = c;
            }
            // Chỉ bảng tài liệu (STT | Tên | File [| ...] | Thao tác, tối đa 5 cột); không đụng lưới danh sách nhiều cột
            if (iN < 0 || iF < 0 || iF < iN || iN > 1 || ths.length > 5) continue;
            table.classList.add('tlkt-std');
            setHead(ths[iN], RE_BASIS.test(hText(ths[iN])) || table.getAttribute('data-tlkt-name') === 'basis' ? 'Tên văn bản căn cứ' : STD_NAME); setHead(ths[iF], STD_FILE); if (iA >= 0) setHead(ths[iA], STD_ACT);
            Array.prototype.forEach.call(table.tBodies, function (tb) {
                Array.prototype.forEach.call(tb.rows, function (tr) {
                    if (tr.cells.length !== ths.length) return;
                    if (tr.cells[0]) tr.cells[0].classList.add('tlkt-c');
                    var fc = tr.cells[iF];
                    if (fc) fc.classList.add('tlkt-fc');
                    if (fc) Array.prototype.forEach.call(fc.querySelectorAll('button, label, a'), function (el) {
                        if (el.closest('.tlkt-ib')) return;
                        var icls = (el.querySelector('i') || {}).className || '';
                        if (RE_UP.test(hText(el)) || (!hText(el).length ? false : /fa-upload|fa-cloud-arrow-up|fa-file-arrow-up/.test(String(icls)))) upBtn(el);
                    });
                    var ac = iA >= 0 ? tr.cells[iA] : null;
                    if (ac) {
                        ac.classList.add('tlkt-c');
                        Array.prototype.forEach.call(ac.querySelectorAll('a, button'), iconize);
                    }
                });
            });
            emptyView(table);
        }
        var adds = root.querySelectorAll('button, a.btn');
        for (var a = 0; a < adds.length; a++) if (/^\+?\s*thêm tài liệu$/i.test(hText(adds[a]))) addBtn(adds[a]);
    };
    var stdPend = false;
    function stdSchedule() {
        if (stdPend) return; stdPend = true;
        setTimeout(function () { stdPend = false; try { window.tlktStd(document); } catch (e) { /* bỏ qua */ } }, 30);
    }
    function stdBoot() {
        stdSchedule();
        try { new MutationObserver(stdSchedule).observe(document.body, { childList: true, subtree: true }); } catch (e) { /* bỏ qua */ }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', stdBoot); else stdBoot();
})();
