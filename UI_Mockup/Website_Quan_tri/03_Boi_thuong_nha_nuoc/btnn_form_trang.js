/*
 * Dùng chung phân hệ Bồi thường nhà nước - hiển thị form Thêm mới / Sửa / Xem chi tiết dạng trang (Page) thay cho popup.
 * - Khai báo: <script src="btnn_form_trang.js" data-pages="formModal,detailModal"></script> (id các modal-overlay cần đổi).
 * - Mở form (modal thêm lớp active): ẩn nội dung danh sách, form hiển thị rộng hết trang ngay dưới khối tiêu đề màn.
 * - Đóng form (bỏ lớp active): hiện lại danh sách. Popup xác nhận, popup thao tác nhỏ (không khai báo) giữ dạng popup.
 * - Nhiều trang cùng mở (ví dụ Xem chi tiết -> Sửa): chỉ hiện trang mở sau cùng; đóng trang đó thì hiện lại trang trước.
 * - Không đổi nội dung, hành vi nút của trang.
 */
(function () {
    'use strict';
    var script = document.currentScript;
    var ids = ((script && script.dataset.pages) || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!ids.length) return;

    var CSS = [
        'body .modal-overlay.btnn-as-page { position: static !important; inset: auto !important; background: none !important; backdrop-filter: none !important;',
        '  padding: 0 !important; margin: 0 !important; z-index: auto !important; display: none !important; overflow: visible !important; opacity: 1 !important; visibility: visible !important; }',
        'body .modal-overlay.btnn-as-page.active:not(.btnn-page-suspended) { display: block !important; }',
        'body .modal-overlay.btnn-as-page > .modal-content { max-width: none !important; width: 100% !important; max-height: none !important; margin: 0 !important;',
        '  transform: none !important; animation: none !important; border: 1px solid #E2E8F0 !important; border-top: 3px solid #1E3A8A !important;',
        '  border-radius: 8px !important; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05) !important; }',
        'body .modal-overlay.btnn-as-page .modal-body { max-height: none !important; overflow: visible !important; }',
        'body .modal-overlay.btnn-as-page .modal-footer { position: static !important; }',
        'body .btnn-page-hidden { display: none !important; }'
    ].join('\n');
    var st = document.createElement('style');
    st.id = 'btnnFormTrangCss';
    st.textContent = CSS;
    document.head.appendChild(st);

    // Phần giữ lại khi mở trang form: khối tiêu đề màn, chọn người dùng giả lập, popup khác, thông báo
    function keep(el) {
        if (!el || el.nodeType !== 1) return true;
        if (/^(SCRIPT|STYLE|LINK|TEMPLATE)$/.test(el.tagName)) return true;
        if (el.classList.contains('modal-overlay') || el.classList.contains('toast') || el.classList.contains('btnn-page-head') || el.classList.contains('page-header')) return true;
        if (el.id === 'wfUserSwitcher' || el.id === 'btnnDocViewer') return true;
        return !!el.querySelector('.btnn-page-head, .page-header');
    }

    var stack = [];      // trang đang mở, theo thứ tự mở
    var hidden = [];     // phần tử đã ẩn

    function hideOthers(page) {
        var node = page;
        while (node && node.parentElement && node !== document.body) {
            Array.prototype.forEach.call(node.parentElement.children, function (sib) {
                if (sib === node || keep(sib) || sib.classList.contains('btnn-page-hidden')) return;
                sib.classList.add('btnn-page-hidden');
                hidden.push(sib);
            });
            node = node.parentElement;
        }
        // Khối chứa cả tiêu đề và danh sách: ẩn phần danh sách bên trong
        document.querySelectorAll('.btnn-page-head, .page-header').forEach(function (head) {
            var box = head.parentElement;
            if (!box || box === document.body || box.contains(page)) return;
            Array.prototype.forEach.call(box.children, function (sib) {
                if (sib === head || keep(sib) || sib.classList.contains('btnn-page-hidden')) return;
                sib.classList.add('btnn-page-hidden');
                hidden.push(sib);
            });
        });
    }
    function showAll() {
        hidden.forEach(function (el) { el.classList.remove('btnn-page-hidden'); });
        hidden = [];
    }
    function refresh() {
        stack = stack.filter(function (p) { return p.classList.contains('active'); });
        stack.forEach(function (p, i) { p.classList.toggle('btnn-page-suspended', i < stack.length - 1); });
        showAll();
        if (stack.length) {
            hideOthers(stack[stack.length - 1]);
            window.scrollTo(0, 0);
        }
    }

    function bind(page) {
        page.classList.add('btnn-as-page');
        if (page.classList.contains('active')) stack.push(page);
        var wasOn = page.classList.contains('active');
        // Chỉ xử lý khi lớp active đổi (bỏ qua lớp do script này gắn)
        new MutationObserver(function () {
            var on = page.classList.contains('active');
            if (on === wasOn) return;
            wasOn = on;
            if (on) { stack = stack.filter(function (p) { return p !== page; }); stack.push(page); }
            refresh();
        }).observe(page, { attributes: true, attributeFilter: ['class'] });
    }

    function init() {
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && !el.classList.contains('btnn-as-page')) bind(el);
        });
        if (stack.length) refresh();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
