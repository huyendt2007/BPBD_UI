/*
 * Dùng chung phân hệ Bồi thường nhà nước - đồng bộ khối tiêu đề màn hình (mẫu: màn Xem xét trách nhiệm hoàn trả).
 * - Khối tiêu đề: nền trắng, viền #E2E8F0, bo góc 8px, padding 10px 18px, cách nội dung bên dưới 12px; bỏ nền gradient.
 * - Tiêu đề: 20px, đậm, màu #1E3A8A (cùng quy tắc data-uxu-title của btnn_uxu_dong_bo.js); bỏ icon đầu tiêu đề.
 * - Bỏ dòng mô tả phụ dưới tiêu đề và icon trang trí trong khối tiêu đề (tiêu đề = tên mục Menu).
 * - Không áp dụng phân hệ Quản trị hệ thống: trang thuộc 01_Quan_tri_he_thong chỉ áp dụng khi mở từ menu BTNN (?system=btnn).
 * - Không đổi nội dung, hành vi nút; chạy lặp lại được (trang dựng tiêu đề bằng JS sau khi tải).
 */
(function () {
    'use strict';
    if (window.__btnnTieuDeMan) return;
    window.__btnnTieuDeMan = true;

    var inQtht = /\/01_Quan_tri_he_thong\//.test(location.pathname);
    if (inQtht && (new URLSearchParams(location.search).get('system') || '').toLowerCase() !== 'btnn') return;

    var CSS = [
        'body .btnn-page-head { background: #FFFFFF !important; background-image: none !important; color: #1E3A8A !important; border: 1px solid #E2E8F0 !important; border-radius: 8px !important;',
        '  padding: 10px 18px !important; margin: 0 0 12px 0 !important; min-height: 49px !important; box-sizing: border-box !important;',
        '  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05) !important;',
        '  display: flex !important; align-items: center !important; justify-content: space-between !important; flex-wrap: wrap !important; gap: 14px !important;',
        /* Khối cha là flex (ví dụ .page-heading): khối tiêu đề vẫn rộng hết chiều ngang, không co theo chữ */
        '  flex: 1 1 100% !important; width: 100% !important; max-width: 100% !important; align-self: stretch !important; }',
        'body .btnn-page-head .btnn-page-title { font-size: 20px !important; font-weight: 700 !important; color: #1E3A8A !important; line-height: 1.35 !important;',
        '  margin: 0 !important; padding: 0 !important; text-transform: none !important; letter-spacing: normal !important; background: none !important; }',
        'body .btnn-page-head .btnn-page-title > i:first-child { display: none !important; }',
        'body .btnn-page-head .btnn-page-sub, body .btnn-page-head .btnn-page-deco { display: none !important; }',
        /* Nút trong khối tiêu đề (ví dụ Quay lại): thu gọn để khối tiêu đề cùng chiều cao */
        'body .btnn-page-head > .btn { height: 28px !important; min-height: 28px !important; padding: 0 12px !important; font-size: 13px !important; line-height: 1 !important; }'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('btnnTieuDeManCss')) return;
        var st = document.createElement('style');
        st.id = 'btnnTieuDeManCss';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }
    var POPUP_RE = /modal|popup|overlay|dialog|dropdown|toast/i;
    function inPopup(el) {
        for (var e = el; e && e !== document.body; e = e.parentElement) {
            var cn = typeof e.className === 'string' ? e.className : '';
            if (POPUP_RE.test(cn + ' ' + (e.id || ''))) return true;
        }
        return false;
    }
    function visible(el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }

    // Tiêu đề trang: ưu tiên phần tử đã gắn data-uxu-title, sau đó h1/h2 trong .page-header, cuối cùng h1/h2 đầu tiên ngoài popup
    function findTitle() {
        var lists = [
            document.querySelectorAll('[data-uxu-title]'),
            document.querySelectorAll('.page-header h1, .page-header h2, .dash-head h2'),
            document.querySelectorAll('h1, h2')
        ];
        for (var i = 0; i < lists.length; i++) {
            for (var j = 0; j < lists[i].length; j++) {
                var el = lists[i][j];
                if (!inPopup(el) && visible(el) && String(el.textContent || '').trim()) return el;
            }
        }
        return null;
    }
    // Khối tiêu đề: .page-header / .dash-head; không có thì phần tử cha chỉ chứa tiêu đề (không chứa lưới, form, bộ lọc)
    function findBox(title) {
        var box = title.closest('.page-header, .dash-head');
        if (box) return box;
        var p = title.parentElement;
        if (p && p !== document.body && !/^(MAIN|BODY)$/.test(p.tagName) && !p.querySelector('table, form, [data-bpbd-filter], .card-section, .table-container')) return p;
        var wrap = document.createElement('div');
        title.parentNode.insertBefore(wrap, title);
        wrap.appendChild(title);
        return wrap;
    }

    function apply() {
        var title = findTitle();
        if (!title) return;
        var box = findBox(title);
        // Tiêu đề nằm trong khung chứa cả bộ lọc / lưới (ví dụ Xác định CQGQBT): đưa khối tiêu đề ra trước khung, tránh khung lồng khung
        var host = box.parentElement && box.parentElement.closest('.card-section');
        if (host && host !== box && host.querySelector('table, [data-bpbd-filter], .table-container')) host.parentNode.insertBefore(box, host);
        box.classList.add('btnn-page-head');
        title.classList.add('btnn-page-title');
        if (!title.hasAttribute('data-uxu-title')) title.setAttribute('data-uxu-title', '');
        // Dòng mô tả phụ cùng cấp với tiêu đề
        Array.prototype.forEach.call(title.parentElement.children, function (el) {
            if (el !== title && el.tagName === 'P') el.classList.add('btnn-page-sub');
        });
        // Icon trang trí đặt trực tiếp trong khối tiêu đề (không phải nút)
        Array.prototype.forEach.call(box.children, function (el) {
            if (el.tagName === 'I') el.classList.add('btnn-page-deco');
        });
    }

    function run() { injectCss(); apply(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
    // Trang dựng tiêu đề bằng JS sau khi tải: chạy lại
    window.addEventListener('load', function () { run(); setTimeout(run, 300); setTimeout(run, 1000); });
})();
