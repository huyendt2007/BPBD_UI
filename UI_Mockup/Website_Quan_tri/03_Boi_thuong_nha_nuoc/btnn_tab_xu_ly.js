/*
 * Dùng chung phân hệ Bồi thường nhà nước - đồng nhất kiểu 02 tab "Chờ xử lý" / "Đã xử lý" trên mọi trang.
 * - Icon: Chờ xử lý fa-list-check, Đã xử lý fa-box-archive (đặt trước chữ, cách 8px).
 * - Active: chữ + icon #1e3a8a, gạch chân 3px cùng màu. Inactive: chữ + icon #64748b.
 * - Padding 12px 16px, chữ 13.5px đậm 600 (theo QĐ GQBT / Tiếp nhận / Kinh phí / Hoàn trả).
 * Chỉ áp cho nút tab có icon fa-list-check / fa-box-archive thuộc các lớp tab Chờ/Đã xử lý; không đổi badge, tên tab, sự kiện click.
 */
(function () {
    'use strict';
    if (window.__btnnTabXuLy) return;
    window.__btnnTabXuLy = true;

    var T = ':is(.xd-tab, .qd-tab, .tn-tab, .kp-tab, .ht-tab, .bctt-ltab, #workflowTabChoXuLy, #workflowTabDaXuLy, .wf-tabs > .tab-btn)'
        + ':is(:has(> i.fa-list-check), :has(> i.fa-box-archive))';
    var CSS = [
        'body ' + T + ' { background: transparent !important; border: 0 !important; border-bottom: 3px solid transparent !important; border-radius: 0 !important;'
            + ' padding: 12px 16px !important; height: auto !important; min-height: 0 !important; font-family: inherit; font-size: 13.5px !important; font-weight: 600 !important;'
            + ' color: #64748b !important; display: inline-flex !important; align-items: center !important; justify-content: flex-start !important; gap: 8px !important; cursor: pointer; box-shadow: none !important; transition: none !important; }',
        'body ' + T + ':hover { color: #1e3a8a !important; }',
        'body ' + T + '.active { color: #1e3a8a !important; border-bottom-color: #1e3a8a !important; }',
        'body ' + T + ' > i { color: inherit !important; font-size: inherit !important; margin: 0 !important; }',
        'body ' + T + '::after { content: none !important; display: none !important; }'
    ].join('\n');

    function inject() {
        if (document.getElementById('btnn-tab-xu-ly-style')) return;
        var st = document.createElement('style');
        st.id = 'btnn-tab-xu-ly-style';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }
    inject();
})();
