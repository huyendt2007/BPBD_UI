/*
 * Dùng chung phân hệ Bồi thường nhà nước - đồng bộ giao diện các màn danh sách (prefix uxu).
 * 1. Tiêu đề trang (phần tử có thuộc tính data-uxu-title): cùng cỡ chữ, màu, không in hoa; tiêu đề = tên mục Menu.
 * 2. Khối Bộ lọc tìm kiếm ([data-bpbd-filter]): lưới 4 cột đều nhau (<= 900px: 2 cột, <= 560px: 1 cột),
 *    khoảng cách và chiều cao ô đồng nhất, nhãn trên ô, hàng nút Xóa bộ lọc / Tìm kiếm ở dòng riêng căn phải.
 * 3. Nút "Kết xuất Excel" trên màn danh sách: cùng nhãn, cùng icon (fa-file-excel), cùng kiểu nút (.uxu-btn-excel),
 *    đứng cuối thanh công cụ phía trên lưới (sau nút Tạo mới); các nút cùng thanh cùng chiều cao (.uxu-btn-tb).
 * 4. Khối "Người dùng giả lập" (#wfUserSwitcher): gọn ở góc trên phải; nếu chồng lên phần tử của trang thì đẩy nội dung trang xuống.
 * 5. Cột Trạng thái: dòng phụ Loại trình (.wf-sub, .approval-sub, .gq-sub) chữ xám #64748b trên mọi lưới.
 * Nạp bởi btnn_cot_thao_tac.js; chống nạp lặp. Không đổi hành vi nghiệp vụ (giữ nguyên onclick của nút).
 */
(function () {
    'use strict';
    if (window.__uxuDongBo) return;
    window.__uxuDongBo = true;

    var CSS = [
        /* 1. Tiêu đề trang */
        'body [data-uxu-title] { font-size: 20px !important; font-weight: 700 !important; color: #1e3a8a !important; text-transform: none !important; letter-spacing: normal !important; line-height: 1.35 !important; margin: 0 !important; }',
        'body [data-uxu-title] > i:first-child { display: none !important; }',
        /* 2. Khối Bộ lọc tìm kiếm */
        'body [data-bpbd-filter]:not(.bpbd-filter-collapsed):not(.uxu-filter-flat) { padding: 12px 20px 16px !important; margin-bottom: 16px !important; }',
        'body [data-bpbd-filter] > .bpbd-filter-toggle-bar { margin: 0 0 2px 0 !important; }',
        'body [data-bpbd-filter] .grid-4-cols, body [data-bpbd-filter] .grid-4, body [data-bpbd-filter] .filter-grid { display: grid !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 12px 16px !important; margin: 0 0 12px 0 !important; }',
        'body [data-bpbd-filter] .grid-4-cols > *, body [data-bpbd-filter] .grid-4 > *, body [data-bpbd-filter] .filter-grid > * { min-width: 0; margin-bottom: 0 !important; }',
        'body [data-bpbd-filter] .form-label { display: block !important; font-size: 13px !important; font-weight: 600 !important; color: #334155 !important; margin: 0 0 6px 0 !important; line-height: 1.4 !important; }',
        'body [data-bpbd-filter] input.form-control, body [data-bpbd-filter] select.form-control, body [data-bpbd-filter] .form-select { height: 38px !important; min-height: 38px !important; box-sizing: border-box !important; font-size: 13px !important; }',
        'body [data-bpbd-filter] .uxu-filter-actions { display: flex !important; justify-content: flex-end !important; align-items: center !important; gap: 8px !important; margin: 0 !important; padding: 12px 0 0 0 !important; border-top: 1px solid #E2E8F0 !important; border-bottom: 0 !important; grid-column: 1 / -1; }',
        'body [data-bpbd-filter] .uxu-filter-actions > .btn { height: 36px !important; min-height: 36px !important; padding: 0 16px !important; font-size: 13px !important; }',
        '@media (max-width: 900px) { body [data-bpbd-filter] .grid-4-cols, body [data-bpbd-filter] .grid-4, body [data-bpbd-filter] .filter-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }',
        '@media (max-width: 560px) { body [data-bpbd-filter] .grid-4-cols, body [data-bpbd-filter] .grid-4, body [data-bpbd-filter] .filter-grid { grid-template-columns: minmax(0, 1fr) !important; } }',
        /* 3. Nút Kết xuất Excel + các nút cùng thanh công cụ */
        'body .uxu-btn-tb { height: 36px !important; min-height: 36px !important; padding: 0 14px !important; font-size: 13px !important; font-weight: 600 !important; line-height: 1 !important; border-radius: 6px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 6px !important; white-space: nowrap !important; }',
        'body .uxu-btn-excel { background: #FFFFFF !important; color: #334155 !important; border: 1px solid #CBD5E1 !important; box-shadow: none !important; cursor: pointer !important; }',
        'body .uxu-btn-excel:hover { background: #F0FDF4 !important; border-color: #86EFAC !important; color: #166534 !important; }',
        'body .uxu-btn-excel > i { color: #16A34A !important; font-size: 14px !important; margin: 0 !important; }',
        /* 5. Cột Trạng thái: dòng phụ Loại trình dưới badge Chờ duyệt / Bị từ chối - chữ xám trung tính (badge giữ màu theo trạng thái) */
        'body .wf-sub, body .wf-sub.returned, body .approval-sub, body .gq-sub, body .uxu-sub { color: #64748b !important; }',
        /* 4. Khối Người dùng giả lập */
        /* Neo theo đầu trang (cuộn cùng trang), không nổi đè lên lưới/nút khi cuộn */
        '#wfUserSwitcher { position: absolute !important; padding: 3px 4px 3px 10px !important; gap: 6px !important; }',
        '#wfUserSwitcher select { max-width: 280px !important; padding: 3px 6px !important; }',
        '@media (max-width: 1280px) { #wfUserSwitcher > span { display: none !important; } }'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('uxuDongBoCss')) return;
        var st = document.createElement('style');
        st.id = 'uxuDongBoCss';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }
    function txt(el) { return String(el.textContent || '').replace(/\s+/g, ' ').trim(); }
    var POPUP_RE = /modal|popup|overlay|dialog|dropdown|inline-form-panel|detail-panel/i;
    function inPopup(el) {
        for (var e = el; e && e !== document.body; e = e.parentElement) {
            var cn = typeof e.className === 'string' ? e.className : '';
            if (POPUP_RE.test(cn + ' ' + (e.id || ''))) return true;
        }
        return false;
    }
    function clearInlineSize(b) {
        ['height', 'min-height', 'padding', 'font-size', 'line-height'].forEach(function (p) { b.style.removeProperty(p); });
    }

    // 2. Hàng nút của khối lọc: phần tử cha của nút "Xóa bộ lọc" (không chứa ô nhập) -> .uxu-filter-actions
    function filterActions() {
        Array.prototype.forEach.call(document.querySelectorAll('[data-bpbd-filter]'), function (sec) {
            Array.prototype.forEach.call(sec.querySelectorAll('button, a.btn'), function (b) {
                if (!/Xóa bộ lọc/.test(b.textContent)) return;
                var row = b.parentElement;
                if (!row || row === sec || row.classList.contains('uxu-filter-actions')) return;
                if (row.querySelector('input:not([type=hidden]), select, textarea')) return;
                row.classList.add('uxu-filter-actions');
            });
        });
    }

    // 3. Nút Kết xuất Excel trên màn danh sách
    var EXCEL_RE = /^(kết xuất|xuất)( ra)? excel$/i;
    function excelButtons() {
        Array.prototype.forEach.call(document.querySelectorAll('button, a.btn'), function (b) {
            if (b.classList.contains('uxu-btn-excel') || !EXCEL_RE.test(txt(b)) || inPopup(b)) return;
            b.classList.add('uxu-btn-excel', 'uxu-btn-tb');
            if (b.classList.contains('btn-primary')) b.classList.replace('btn-primary', 'btn-secondary');
            clearInlineSize(b);
            b.innerHTML = '<i class="fa-solid fa-file-excel"></i> Kết xuất Excel';
            var bar = b.parentElement;
            if (!bar) return;
            Array.prototype.forEach.call(bar.children, function (s) {
                if (s !== b && s.matches('button.btn, a.btn') && !s.classList.contains('uxu-btn-tb')) { s.classList.add('uxu-btn-tb'); clearInlineSize(s); }
            });
            // Đứng cuối thanh công cụ (sau nút Tạo mới)
            if (bar.lastElementChild !== b) bar.appendChild(b);
        });
    }

    // 4. Khối Người dùng giả lập không chồng lên phần tử của trang
    var basePad = null;
    function switcherOverlap() {
        var sw = document.getElementById('wfUserSwitcher');
        if (!sw || !document.body) return;
        sw.title = 'Người dùng giả lập (phục vụ demo phân quyền)';
        if (basePad === null) basePad = parseFloat(window.getComputedStyle(document.body).paddingTop) || 0;
        document.body.style.paddingTop = basePad ? basePad + 'px' : '';
        var a = sw.getBoundingClientRect();
        if (!a.width) return;
        var minTop = Infinity;
        Array.prototype.forEach.call(document.querySelectorAll('body h1, body h2, body h3, body select, body input, body button, body a, body span, body label, body p'), function (e) {
            if (sw.contains(e)) return;
            var r = e.getBoundingClientRect();
            if (!r.width || !r.height) return;
            if (r.left < a.right && r.right > a.left && r.top < a.bottom && r.bottom > a.top) {
                for (var p = e; p && p !== document.body; p = p.parentElement) { if (window.getComputedStyle(p).position === 'fixed') return; }
                if (window.getComputedStyle(e).visibility === 'hidden') return;
                minTop = Math.min(minTop, r.top + window.scrollY);
            }
        });
        if (minTop !== Infinity) document.body.style.paddingTop = (basePad + Math.ceil(a.bottom + 8 - minTop)) + 'px';
    }

    function run() {
        injectCss();
        try { filterActions(); } catch (e) { /* bỏ qua */ }
        try { excelButtons(); } catch (e) { /* bỏ qua */ }
    }
    var pending = false;
    function schedule() {
        if (pending) return;
        pending = true;
        setTimeout(function () { pending = false; run(); }, 60);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
    try {
        new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) { if (muts[i].addedNodes && muts[i].addedNodes.length) { schedule(); return; } }
        }).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) { /* bỏ qua */ }
    [300, 1200, 3000].forEach(function (t) { setTimeout(switcherOverlap, t); });
    var rz = null;
    window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(switcherOverlap, 200); });
    window.uxuDongBoRefresh = function () { run(); switcherOverlap(); };
})();
