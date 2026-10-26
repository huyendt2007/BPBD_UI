/*
 * Dùng chung phân hệ Bồi thường nhà nước - thanh "Người dùng giả lập" (bố trí theo màn Xác định cơ quan giải quyết bồi thường,
 * cùng kiểu #wfUserSwitcher của btnn_luong_xu_ly.js + btnn_uxu_dong_bo.js).
 * - Viên bo tròn nền trắng, viền, góc trên phải trang (position:absolute; top:8px; right:12px), icon + nhãn "Người dùng giả lập:" + dropdown.
 * - Trang có ô giả lập riêng: gắn thuộc tính data-btnn-gl="<selector nhãn cũ cần ẩn>" vào khối giả lập cũ (hoặc gọi BTNN_GL.wrap(el, {hide})).
 *   Khối cũ được chuyển nguyên vào thanh (display:contents): giữ nguyên select, id, onchange, nút phụ; chỉ đổi vị trí và kiểu.
 * - Thanh chồng lên phần tử của trang thì đẩy nội dung trang xuống (như btnn_uxu_dong_bo.js).
 */
(function () {
    'use strict';
    if (window.BTNN_GL) return;

    var CSS = [
        'body .btnn-gl-bar { position: absolute !important; top: 8px !important; right: 12px !important; left: auto !important; bottom: auto !important; z-index: 9000 !important; margin: 0 !important; width: auto !important; max-width: none !important; background: #fff !important; border: 1px solid #cbd5e1 !important; border-radius: 999px !important; padding: 3px 4px 3px 10px !important; box-shadow: 0 2px 8px rgba(15,23,42,0.12) !important; font: 500 12px Inter, system-ui, sans-serif !important; color: #334155 !important; display: flex !important; align-items: center !important; gap: 6px !important; flex-wrap: nowrap !important; white-space: nowrap !important; }',
        'body .btnn-gl-bar > .btnn-gl-ico { color: #2563eb !important; font-size: 12px !important; margin: 0 !important; }',
        'body .btnn-gl-bar > .btnn-gl-lbl { font: inherit !important; color: inherit !important; white-space: nowrap !important; margin: 0 !important; }',
        'body .btnn-gl-bar .btnn-gl-src, body .btnn-gl-bar .btnn-gl-src > div { display: contents !important; }',
        'body .btnn-gl-bar .btnn-gl-src * { margin-left: 0 !important; margin-right: 0 !important; }',
        'body .btnn-gl-bar .btnn-gl-src span { font: inherit !important; color: inherit !important; }',
        'body .btnn-gl-bar select { border: 1px solid #e2e8f0 !important; border-radius: 999px !important; padding: 3px 6px !important; font: inherit !important; color: #334155 !important; background: #fff !important; width: auto !important; max-width: 280px !important; height: auto !important; min-height: 0 !important; margin: 0 !important; box-shadow: none !important; outline: none; cursor: pointer; }',
        'body .btnn-gl-bar button { border: 1px solid #e2e8f0 !important; border-radius: 999px !important; padding: 3px 10px !important; height: auto !important; font: inherit !important; color: #334155 !important; background: #f8fafc !important; cursor: pointer; white-space: nowrap !important; display: inline-flex !important; align-items: center !important; gap: 4px !important; margin: 0 !important; box-shadow: none !important; }',
        'body .btnn-gl-bar button:hover { background: #eff6ff !important; border-color: #bfdbfe !important; color: #1e40af !important; }',
        '@media (max-width: 1280px) { body .btnn-gl-bar > .btnn-gl-lbl { display: none !important; } }'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('btnnGlCss')) return;
        var st = document.createElement('style');
        st.id = 'btnnGlCss';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }

    var n = 0;
    // Chuyển khối giả lập cũ vào thanh chuẩn; hide: selector (tương đối khối cũ) các nhãn cũ cần ẩn
    function wrap(src, opts) {
        opts = opts || {};
        if (!src || !document.body) return null;
        if (src.parentElement && src.parentElement.classList.contains('btnn-gl-bar')) return src.parentElement;
        injectCss();
        n += 1;
        var bar = document.createElement('div');
        bar.className = 'btnn-gl-bar';
        bar.setAttribute('data-gl-n', String(n));
        bar.title = 'Người dùng giả lập (phục vụ demo phân quyền)';
        bar.innerHTML = '<i class="fa-solid fa-user-gear btnn-gl-ico"></i><span class="btnn-gl-lbl">Người dùng giả lập:</span>';
        var hide = opts.hide || src.getAttribute('data-btnn-gl') || '';
        if (hide) {
            var st = document.createElement('style');
            st.textContent = hide.split(',').map(function (s) { return '.btnn-gl-bar[data-gl-n="' + n + '"] .btnn-gl-src ' + s.trim(); }).join(', ') + ' { display: none !important; }';
            (document.head || document.documentElement).appendChild(st);
        }
        var oldParent = src.parentElement;
        src.classList.add('btnn-gl-src');
        bar.appendChild(src);
        document.body.appendChild(bar);
        // Khung bao cũ chỉ còn rỗng: ẩn để không chiếm chỗ
        if (oldParent && oldParent !== document.body && !oldParent.children.length && !String(oldParent.textContent || '').trim()) oldParent.style.display = 'none';
        schedule();
        return bar;
    }

    // Không chồng lên phần tử của trang: đẩy nội dung trang xuống
    var basePad = null;
    function overlap() {
        var bars = document.querySelectorAll('.btnn-gl-bar');
        if (!bars.length || !document.body) return;
        if (basePad === null) basePad = parseFloat(window.getComputedStyle(document.body).paddingTop) || 0;
        document.body.style.paddingTop = basePad ? basePad + 'px' : '';
        var push = 0;
        Array.prototype.forEach.call(bars, function (sw) {
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
            if (minTop !== Infinity) push = Math.max(push, Math.ceil(a.bottom + window.scrollY + 8 - minTop));
        });
        if (push > 0) document.body.style.paddingTop = (basePad + push) + 'px';
    }
    var timers = [];
    function schedule() {
        timers.forEach(clearTimeout);
        timers = [50, 400, 1200, 3000].map(function (t) { return setTimeout(overlap, t); });
    }

    function auto() {
        Array.prototype.forEach.call(document.querySelectorAll('[data-btnn-gl]'), function (el) { wrap(el); });
    }
    window.BTNN_GL = { wrap: wrap, refresh: overlap };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto); else auto();
    var rz = null;
    window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(overlap, 200); });
})();
