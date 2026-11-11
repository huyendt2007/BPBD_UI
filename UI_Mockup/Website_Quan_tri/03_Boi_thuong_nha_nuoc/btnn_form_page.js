/*
 * btnn_form_page.js - Mở form Thêm mới / Cập nhật / Xem chi tiết thành 1 "page" riêng trong tab hiện tại
 * (giống màn Tạo mới tại Tiếp nhận hồ sơ - tiep_nhan_ycbt.html).
 * Áp dụng cho các trang Nghiệp vụ dùng chung có khối #detailPanel.detail-panel (bật/tắt bằng class "visible"):
 *   quan_ly_nghiep_vu_btnn_muc6.html, quan_ly_nghiep_vu_btnn_tt08.html,
 *   quan_ly_theo_doi_don_doc_btnn.html, quan_ly_kiem_tra_cong_tac_btnn.html
 * Chỉ đổi cơ chế mở/đóng form:
 *   - Khi #detailPanel hiện: ẩn bộ lọc, danh sách; form chiếm toàn vùng nội dung; cuộn lên đầu trang.
 *   - Tiêu đề: một dòng ở khối tiêu đề trang = "[Thao tác] [Tên mục Menu]" (VD: "Thêm mới Hợp tác quốc tế");
 *     không hiển thị dòng tiêu đề form (#formTitle) bên dưới. Đóng form: tiêu đề trở lại tên mục Menu.
 *   - Thanh nút #formActions cố định (sticky) cuối màn hình.
 *   - Khi #detailPanel ẩn (Đóng/Hủy bỏ/Lưu xong): hiện lại danh sách, giữ nguyên bộ lọc và vị trí cuộn.
 * Không thay đổi trường thông tin, kiểm tra dữ liệu, nút nghiệp vụ.
 */
(function () {
    'use strict';
    if (window.__btnnFormPage) return;
    window.__btnnFormPage = true;

    var css = '' +
        'body.btnn-fp-open > .section:not(#detailPanel) { display: none !important; }' +
        'body.btnn-fp-open #detailPanel.visible > .section-head { display: none !important; }' +
        'body.btnn-fp-open #detailPanel.visible { margin-bottom: 0; padding-bottom: 0; min-height: calc(100vh - 44px); display: flex; flex-direction: column; }' +
        'body.btnn-fp-open #detailPanel.visible > .section-head { padding-bottom: 12px; border-bottom: 1px solid var(--border-color, #e2e8f0); margin-bottom: 16px; }' +
        'body.btnn-fp-open #detailPanel.visible > .section-head .section-title { font-size: 16px; text-transform: none; }' +
        'body.btnn-fp-open #detailPanel.visible > #formActions {' +
        ' position: sticky; bottom: 0; z-index: 20; margin: auto -20px 0 -20px; padding: 16px 24px;' +
        ' border-top: 1px solid var(--border-color, #e2e8f0); background-color: #FAFBFD;' +
        ' box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); border-radius: 0 0 8px 8px; }' +
        'body.btnn-fp-open #detailPanel.visible > #formActions:empty { display: none; }';

    function addStyle() {
        if (document.getElementById('btnnFormPageStyle')) return;
        var st = document.createElement('style');
        st.id = 'btnnFormPageStyle';
        st.textContent = css;
        (document.head || document.documentElement).appendChild(st);
    }

    var listScrollY = 0;
    var isOpen = false;
    var menuTitle = null;

    // Tiêu đề trang (tên mục Menu)
    function pageTitleEl() {
        return document.querySelector('.page-header [data-uxu-title]') || document.querySelector('.page-header h1, .page-header h2');
    }
    // Thao tác lấy từ #formTitle: "Xem chi tiết" -> "Chi tiết"; các thao tác khác giữ nguyên
    var VERBS = ['Thêm mới', 'Xem chi tiết', 'Chi tiết', 'Cập nhật kết quả', 'Cập nhật phản hồi', 'Cập nhật', 'Sửa'];
    function actionOf(text) {
        var t = String(text || '').trim();
        for (var i = 0; i < VERBS.length; i++) {
            if (t.indexOf(VERBS[i]) === 0) return VERBS[i] === 'Xem chi tiết' ? 'Chi tiết' : VERBS[i];
        }
        return t.split(' ').slice(0, 2).join(' ');
    }
    function syncTitle(open) {
        var h = pageTitleEl();
        if (!h) return;
        if (menuTitle === null) menuTitle = String(h.textContent || '').trim();
        var ft = document.getElementById('formTitle');
        var text = open && ft ? actionOf(ft.textContent) + ' ' + menuTitle : menuTitle;
        if (String(h.textContent || '').trim() !== text) h.textContent = text;
    }

    function toTop() {
        try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, 0); }
    }

    function sync(panel) {
        var visible = panel.classList.contains('visible');
        if (visible && !isOpen) {
            isOpen = true;
            listScrollY = window.scrollY || 0;
            document.body.classList.add('btnn-fp-open');
            syncTitle(true);
            toTop();
        } else if (!visible && isOpen) {
            isOpen = false;
            document.body.classList.remove('btnn-fp-open');
            syncTitle(false);
            var y = listScrollY;
            try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, y); }
        }
    }

    function init() {
        var panel = document.getElementById('detailPanel');
        if (!panel) return;
        addStyle();
        new MutationObserver(function () { sync(panel); }).observe(panel, { attributes: true, attributeFilter: ['class'] });
        // Đổi chế độ ngay trong form (VD: Xem chi tiết -> Sửa): cập nhật tiêu đề theo #formTitle
        var ft = document.getElementById('formTitle');
        if (ft) new MutationObserver(function () { if (isOpen) syncTitle(true); }).observe(ft, { childList: true, characterData: true, subtree: true });
        sync(panel);
        // Chuyển chế độ ngay trong page (VD: Xem chi tiết -> Sửa): cuộn lên đầu page form
        if (typeof window.openForm === 'function') {
            var orig = window.openForm;
            window.openForm = function () {
                var r = orig.apply(this, arguments);
                if (panel.classList.contains('visible')) {
                    sync(panel);
                    toTop();
                    setTimeout(toTop, 0);
                }
                return r;
            };
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
