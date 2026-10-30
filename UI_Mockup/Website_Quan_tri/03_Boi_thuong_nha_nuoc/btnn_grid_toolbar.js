/**
 * Thanh công cụ phía trên lưới kết quả ([data-grid-toolbar]) của các màn danh sách BTNN.
 * - Không còn tiêu đề bảng; thanh chỉ chứa các nút (Thêm mới, Kết xuất Excel...).
 * - Không có nút nào hiển thị (ẩn theo quyền, theo tab, theo vai trò giả lập): ẩn hẳn thanh, không để lại dải trống.
 * - Theo dõi thay đổi hiển thị của nút (style/class/hidden) và class của body để cập nhật lại.
 */
(function () {
    function shown(el, bar) {
        for (var e = el; e && e !== bar; e = e.parentElement) {
            if (e.hidden || getComputedStyle(e).display === 'none') return false;
        }
        return true;
    }
    function sync(bar) {
        var any = Array.prototype.some.call(bar.querySelectorAll('button, a.btn'), function (b) { return shown(b, bar); });
        var v = any ? '' : 'none';
        if (bar.style.display !== v) bar.style.display = v;
    }
    function syncAll() { document.querySelectorAll('[data-grid-toolbar]').forEach(sync); }
    function init() {
        document.querySelectorAll('[data-grid-toolbar]').forEach(function (bar) {
            sync(bar);
            new MutationObserver(function () { sync(bar); }).observe(bar, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
        });
        new MutationObserver(syncAll).observe(document.body, { attributes: true, attributeFilter: ['class'] });
        window.addEventListener('load', syncAll);
    }
    window.btnnGridToolbarSync = syncAll;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
