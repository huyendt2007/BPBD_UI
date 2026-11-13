/*
 * bpbd_dong_bo_giao_dien.js - Dùng chung phân hệ Biện pháp bảo đảm: đồng bộ giao diện theo kiểu đã thống nhất của phân hệ BTNN
 * (mẫu: màn Tiếp nhận hồ sơ 03_Boi_thuong_nha_nuoc/tiep_nhan_ycbt.html; quy tắc của btnn_tieu_de_man.js, btnn_uxu_dong_bo.js).
 * 1. Khối tiêu đề màn hình: nền trắng, viền #E2E8F0, bo góc 8px, padding 10px 18px, cách nội dung bên dưới 12px;
 *    tiêu đề 20px, đậm, màu #1E3A8A, không in hoa, không icon; bỏ dòng mô tả phụ, lời chào; nút thao tác chung nằm bên phải khối.
 *    - Màn mở từ Menu: tiêu đề = tên mục Menu; màn chưa có tiêu đề thì thêm khối tiêu đề.
 *    - Màn con (chi tiết, nhập liệu): giữ nội dung tiêu đề; tiêu đề viết in hoa toàn bộ thì chuyển về chữ thường (giữ từ viết tắt).
 * 2. Đường dẫn trong trang (breadcrumb) của màn mở từ Menu: ẩn khi mở trong khung Trang quản trị (khung đã có đường dẫn).
 * 3. Thanh tab nghiệp vụ phía trên Bộ lọc: thẻ trắng; tab chữ 13.5px đậm; tab đang chọn màu #1E3A8A, gạch chân 3px.
 * 4. Khối Bộ lọc: lưới 4 cột đều nhau, nhãn 13px đậm #334155, ô nhập 38px, hàng nút Xóa bộ lọc / Tìm kiếm căn phải có đường kẻ trên.
 * 5. Khối danh sách: tiêu đề cột không in hoa, 13px đậm #334155; nút Kết xuất Excel cùng nhãn, icon, kiểu nút như BTNN.
 * 6. Form nhập liệu / xem chi tiết: nhãn 13px #334155, cách ô nhập 6px; ô nhập, ô chọn cao 38px, chữ 13px;
 *    các hàng trường cách nhau 16px; tiêu đề khối 13px đậm in hoa màu #1E3A8A.
 * Không đổi trường, nút, hành vi nghiệp vụ; chạy lặp lại được (trang dựng nội dung bằng JS sau khi tải).
 */
(function () {
    'use strict';
    if (window.__bpbdDongBo) return;
    window.__bpbdDongBo = true;

    var TEP = (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
    var QS = new URLSearchParams(location.search);
    var VIEW = QS.get('view') || '';
    var TRONG_KHUNG = (function () { try { return window.self !== window.top; } catch (e) { return true; } })();

    // Trang thuộc thư mục Quản trị hệ thống: chỉ áp dụng khi mở từ Menu Biện pháp bảo đảm
    // (tham số ?system=bpbd, hoặc trang chỉ có trong Menu Biện pháp bảo đảm và không có tham số system)
    var SYS = (QS.get('system') || '').toLowerCase();
    var QTHT_BPBD = ['quan_ly_cap_ma_so_csdl', 'quan_ly_doi_soat_thanh_toan', 'quan_ly_yeu_cau_ho_tro', 'quan_ly_tu_lieu_vbqppl'];
    if (/\/01_Quan_tri_he_thong\//.test(location.pathname) && !(SYS === 'bpbd' || (!SYS && QTHT_BPBD.indexOf(TEP) >= 0))) return;

    // Tên mục Menu của các màn mở từ Menu Biện pháp bảo đảm (HomePageAdmin.html - menuData)
    var TEN_MENU = {
        theo_doi_xu_ly_de_nghi: 'Chỉnh lý thông tin/Hủy/Khôi phục đăng ký',
        quan_ly_cap_ma_so_csdl: 'Quản lý cấp mã số sử dụng CSDL',
        quan_ly_doi_soat_thanh_toan: 'Quản lý đối soát thanh toán',
        quan_ly_yeu_cau_ho_tro: 'Quản lý yêu cầu hỗ trợ',
        quan_ly_tu_lieu_vbqppl: 'Quản lý thông tin tư liệu VBQPPL',
        quan_ly_cau_hoi_faq: 'Quản lý câu hỏi và trả lời thường gặp',
        tiep_nhan_ho_so: 'Tiếp nhận hồ sơ',
        kiem_tra_ho_so: VIEW === 'dang_xu_ly' ? 'Hồ sơ đang chờ ký' : (VIEW === 'da_xu_ly' ? 'Hồ sơ đã xử lý' : 'Hồ sơ chờ xử lý'),
        ky_duyet_ho_so: 'Ký duyệt hồ sơ',
        loc_phieu_trung_lap: 'Lọc phiếu trùng lặp',
        tra_cuu_thong_tin: 'Tra cứu hồ sơ',
        nhan_du_lieu_bpbd: 'Nhận dữ liệu BPBĐ từ cơ quan đăng ký khác',
        quan_ly_bieu_phi: 'Quản lý Biểu phí',
        quan_ly_thu_phi: 'Quản lý thu phí/hoàn phí',
        bao_cao_thong_ke_ho_so_dang_ky: 'Thống kê số lượng hồ sơ đăng ký'
    };
    // Màn chưa có tiêu đề: vị trí chèn khối tiêu đề (đầu khung danh sách)
    var CHEN_TIEU_DE = { kiem_tra_ho_so: '#view-list', ky_duyet_ho_so: '#view-list', quan_ly_cap_ma_so_csdl: 'body > .container' };
    // Màn có tiêu đề không phải thẻ h1/h2
    var TIEU_DE_SEL = { quan_ly_yeu_cau_ho_tro: '.user-profile-bar .logo-title' };
    var TEN = TEN_MENU[TEP] || '';

    var CSS = [
        /* 0. Phông chữ Inter như BTNN (văn bản xem trước / in tự đặt phông riêng) */
        'body { font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif; }',
        'body input, body select, body textarea, body button { font-family: inherit; }',
        /* 1. Khối tiêu đề */
        'body .bpbd-page-head { background: #FFFFFF !important; background-image: none !important; color: #1E3A8A !important; border: 1px solid #E2E8F0 !important; border-radius: 8px !important;',
        '  padding: 10px 18px !important; margin: 0 0 12px 0 !important; min-height: 49px !important; box-sizing: border-box !important; position: relative !important; overflow: visible !important;',
        '  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05) !important;',
        '  display: flex !important; align-items: center !important; justify-content: space-between !important; flex-wrap: wrap !important; gap: 14px !important;',
        '  flex: 1 1 100% !important; width: auto !important; max-width: 100% !important; align-self: stretch !important; }',
        'body .bpbd-page-head::before, body .bpbd-page-head::after { display: none !important; }',
        'body .bpbd-page-head > div:not(.bpbd-head-actions) { margin: 0 !important; padding: 0 !important; background: none !important; border: 0 !important; box-shadow: none !important; }',
        'body .bpbd-page-head .bpbd-page-title { font-size: 20px !important; font-weight: 700 !important; color: #1E3A8A !important; line-height: 1.35 !important;',
        '  margin: 0 !important; padding: 0 !important; border: 0 !important; text-transform: none !important; letter-spacing: normal !important; background: none !important;',
        '  display: flex !important; align-items: center !important; gap: 8px !important; flex-wrap: wrap !important; }',
        'body .bpbd-page-head .bpbd-page-title > i, body .bpbd-page-head .bpbd-head-deco { display: none !important; }',
        'body .bpbd-page-head .bpbd-page-sub { display: none !important; }',
        'body .bpbd-page-head .btn, body .bpbd-page-head button:not(.btn-close):not(.close) { height: 32px !important; min-height: 32px !important; padding: 0 12px !important; font-size: 13px !important; line-height: 1 !important; }',
        /* Chữ khác trong khối tiêu đề (ví dụ bộ chọn vai trò giả lập) trên nền trắng */
        'body .bpbd-page-head :is(label, span, strong, small, div):not(.badge):not(.bpbd-page-title):not(.bpbd-page-title *):not(button *):not(.btn *):not(.badge *) { color: #334155 !important; }',
        'body .bpbd-page-head select { background-color: #FFFFFF !important; color: #334155 !important; border: 1px solid #CBD5E1 !important; border-radius: 6px !important; }',
        'body .bpbd-page-head .bpbd-head-actions { display: flex !important; align-items: center !important; gap: 8px !important; flex-wrap: wrap !important; margin: 0 !important; }',
        'body .bpbd-hide { display: none !important; }',
        /* 3. Thanh tab nghiệp vụ */
        'body .bpbd-tabs-card { display: flex !important; align-items: center !important; gap: 8px !important; flex-wrap: wrap !important; background: #FFFFFF !important; border: 1px solid #E2E8F0 !important;',
        '  border-radius: 6px !important; padding: 0 16px !important; margin: 0 0 12px 0 !important; box-shadow: none !important; }',
        'body .bpbd-tabs-card > .bpbd-tab { border: 0 !important; border-bottom: 3px solid transparent !important; background: transparent !important; padding: 12px 16px !important; margin: 0 !important;',
        '  font-size: 13.5px !important; font-weight: 600 !important; color: #64748B !important; border-radius: 0 !important; box-shadow: none !important; display: inline-flex !important; align-items: center !important; gap: 8px !important; cursor: pointer; }',
        'body .bpbd-tabs-card > .bpbd-tab.active { color: #1E3A8A !important; border-bottom-color: #1E3A8A !important; }',
        'body .bpbd-tabs-card > .bpbd-tab:hover:not(.active) { color: #1E3A8A !important; }',
        /* 4. Khối Bộ lọc */
        'body [data-bpbd-filter]:not(.bpbd-filter-collapsed), body .bpbd-filter-card:not(.bpbd-filter-collapsed) { background: #FFFFFF !important; border: 1px solid #E2E8F0 !important; border-radius: 8px !important;',
        '  box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important; padding: 12px 20px 16px !important; margin: 0 0 16px 0 !important; }',
        'body [data-bpbd-filter] .grid-4-cols, body [data-bpbd-filter] .grid-4, body [data-bpbd-filter] .grid-3-cols, body [data-bpbd-filter] .filter-grid, body [data-bpbd-filter] .form-grid-3, body [data-bpbd-filter] .grid',
        '  { display: grid !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 12px 16px !important; margin: 0 0 12px 0 !important; }',
        /* Lưới lọc của thẻ lọc riêng: không đổi display (khối lọc động theo loại tài sản tự ẩn/hiện) */
        'body .bpbd-filter-card .bpbd-filter-grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 12px 16px !important; }',
        'body .bpbd-filter-card .bpbd-filter-grid + .bpbd-filter-grid { margin-top: 12px !important; }',
        'body .bpbd-filter-card .filter-header { padding: 0 !important; margin: 0 0 2px 0 !important; border: 0 !important; background: transparent !important; justify-content: flex-end !important; min-height: 24px; }',
        'body .bpbd-filter-actions.bpbd-filter-actions-chk { justify-content: space-between !important; }',
        'body [data-bpbd-filter] > .card-b, body .bpbd-filter-card > .card-b { padding: 0 !important; }',
        'body .bpbd-filter-card .bpbd-filter-grid .field { margin-bottom: 0 !important; min-width: 0; }',
        'body [data-bpbd-filter] .form-group, body [data-bpbd-filter] .field, body .bpbd-filter-card .bpbd-filter-grid > * { margin-bottom: 0 !important; min-width: 0; }',
        'body [data-bpbd-filter] .form-label, body [data-bpbd-filter] .form-group > label, body [data-bpbd-filter] .field > label, body .bpbd-filter-card .bpbd-filter-grid label',
        '  { display: block !important; font-size: 13px !important; font-weight: 600 !important; color: #334155 !important; margin: 0 0 6px 0 !important; line-height: 1.4 !important; text-transform: none !important; }',
        'body [data-bpbd-filter] input:not([type=checkbox]):not([type=radio]):not([type=hidden]), body [data-bpbd-filter] select, body .bpbd-filter-card input:not([type=checkbox]):not([type=radio]):not([type=hidden]), body .bpbd-filter-card select',
        '  { height: 38px !important; min-height: 38px !important; box-sizing: border-box !important; font-size: 13px !important; border: 1px solid #CBD5E1 !important; border-radius: 6px !important; background-color: #FFFFFF; }',
        'body .bpbd-filter-actions { display: flex !important; justify-content: flex-end !important; align-items: center !important; gap: 8px !important; margin: 0 !important; padding: 12px 0 0 0 !important;',
        '  border-top: 1px solid #E2E8F0 !important; border-bottom: 0 !important; grid-column: 1 / -1; }',
        'body .bpbd-filter-actions > .btn, body .bpbd-filter-actions > button { height: 36px !important; min-height: 36px !important; padding: 0 16px !important; font-size: 13px !important; }',
        'body .bpbd-filter-title-hide { display: none !important; }',
        '@media (max-width: 900px) { body [data-bpbd-filter] .grid-4-cols, body [data-bpbd-filter] .grid-4, body [data-bpbd-filter] .grid-3-cols, body [data-bpbd-filter] .filter-grid, body [data-bpbd-filter] .form-grid-3, body [data-bpbd-filter] .grid, body .bpbd-filter-card .bpbd-filter-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }',
        '@media (max-width: 560px) { body [data-bpbd-filter] .grid-4-cols, body [data-bpbd-filter] .grid-4, body [data-bpbd-filter] .grid-3-cols, body [data-bpbd-filter] .filter-grid, body [data-bpbd-filter] .form-grid-3, body [data-bpbd-filter] .grid, body .bpbd-filter-card .bpbd-filter-grid { grid-template-columns: minmax(0, 1fr) !important; } }',
        /* 5. Khối danh sách */
        'body table th { text-transform: none !important; letter-spacing: normal !important; }',
        'body .bpbd-list-table th { font-size: 13px !important; font-weight: 600 !important; color: #334155 !important; }',
        'body .uxu-btn-tb { height: 36px !important; min-height: 36px !important; padding: 0 14px !important; font-size: 13px !important; font-weight: 600 !important; line-height: 1 !important; border-radius: 6px !important; align-items: center !important; justify-content: center !important; gap: 6px !important; white-space: nowrap !important; }',
        /* Nút đang ẩn bằng style="display:none" (ví dụ «Hủy bản ghi đã chọn» khi chưa chọn) giữ ẩn */
        'body .uxu-btn-tb:not([hidden]):not([style*="display:none"]):not([style*="display: none"]):not(.hidden):not(.d-none):not(.is-hidden):not(.hide) { display: inline-flex !important; }',
        'body .uxu-btn-excel { background: #FFFFFF !important; color: #334155 !important; border: 1px solid #CBD5E1 !important; box-shadow: none !important; cursor: pointer !important; }',
        'body .uxu-btn-excel:hover { background: #F0FDF4 !important; border-color: #86EFAC !important; color: #166534 !important; }',
        'body .uxu-btn-excel > i { color: #16A34A !important; font-size: 14px !important; margin: 0 !important; }',
        'body .bpbd-page-head .uxu-btn-tb { height: 32px !important; min-height: 32px !important; padding: 0 12px !important; }',
        /* 6. Form nhập liệu / xem chi tiết (ngoài Bộ lọc) */
        'body .bpbd-form .form-label, body .bpbd-form .form-group > label:not(.radio-label):not(.checkbox-label), body .bpbd-form .field > label',
        '  { display: block; font-size: 13px !important; font-weight: 500 !important; color: #334155 !important; margin: 0 0 6px 0 !important; line-height: 1.4 !important; text-transform: none !important; letter-spacing: normal !important; }',
        'body .bpbd-form input.form-control:not([type=checkbox]):not([type=radio]), body .bpbd-form select.form-control, body .bpbd-form .form-select, body .bpbd-form .input-control:not(textarea)',
        '  { height: 38px !important; min-height: 38px !important; font-size: 13px !important; box-sizing: border-box !important; }',
        'body .bpbd-form textarea.form-control, body .bpbd-form textarea.input-control { font-size: 13px !important; }',
        'body .bpbd-form .form-group { margin-bottom: 16px; }',
        'body .bpbd-form .grid-2-cols > .form-group, body .bpbd-form .grid-3-cols > .form-group, body .bpbd-form .grid-4-cols > .form-group, body .bpbd-form .form-grid > .form-group, body .bpbd-form .form-grid-2 > .form-group, body .bpbd-form .form-grid-3 > .form-group, body .bpbd-form .form-grid-4 > .form-group { margin-bottom: 0 !important; }',
        'body .bpbd-form .grid-2-cols, body .bpbd-form .grid-3-cols, body .bpbd-form .grid-4-cols, body .bpbd-form .form-grid, body .bpbd-form .form-grid-2, body .bpbd-form .form-grid-3, body .bpbd-form .form-grid-4 { row-gap: 16px !important; column-gap: 16px !important; }',
        'body .bpbd-form .bpbd-sec-title { font-size: 13px !important; font-weight: 700 !important; color: #1E3A8A !important; text-transform: uppercase !important; letter-spacing: .3px !important; line-height: 1.4 !important; }',
        'body .bpbd-form .bpbd-sec-title > i:first-child { color: #1E3A8A !important; }'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('bpbdDongBoCss')) return;
        var coInter = Array.prototype.some.call(document.querySelectorAll('link[href*="fonts.googleapis.com"]'), function (l) { return /Inter/.test(l.href); });
        if (!coInter) {
            var lk = document.createElement('link');
            lk.rel = 'stylesheet';
            lk.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
            (document.head || document.documentElement).appendChild(lk);
        }
        var st = document.createElement('style');
        st.id = 'bpbdDongBoCss';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }
    function txt(el) { return String(el && el.textContent || '').replace(/\s+/g, ' ').trim(); }
    var POPUP_RE = /modal|popup|overlay|dialog|dropdown|toast|drawer/i;
    function inPopup(el) {
        for (var e = el; e && e !== document.body; e = e.parentElement) {
            var cn = typeof e.className === 'string' ? e.className : '';
            if (POPUP_RE.test(cn + ' ' + (e.id || ''))) return true;
        }
        return false;
    }
    function visible(el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }
    function each(sel, fn, root) { Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn); }

    // Chữ in hoa toàn bộ -> chữ thường, viết hoa chữ đầu; giữ từ viết tắt
    var VIET_TAT = ['BPBĐ', 'BTNN', 'CSDL', 'DVC', 'QR', 'PIN', 'VNĐ', 'BTP', 'STP', 'UBND', 'TTĐK', 'ĐKBPBĐ', 'GDBĐ', 'CCCD', 'MST', 'PDF', 'XML'];
    function laInHoa(s) { return /[A-ZÀ-ỸĐ]/.test(s) && s === s.toUpperCase() && s !== s.toLowerCase(); }
    function boInHoa(s) {
        var out = s.split(/(\s+)/).map(function (w) {
            var goc = w.replace(/[^0-9A-Za-zÀ-ỹĐđ]/g, '');
            return VIET_TAT.indexOf(goc) >= 0 ? w : w.toLowerCase();
        }).join('');
        var i = out.search(/[A-Za-zÀ-ỹĐđ]/);
        return i < 0 ? out : out.slice(0, i) + out.charAt(i).toUpperCase() + out.slice(i + 1);
    }
    function chuanChuTieuDe(el) {
        var nodes = [];
        var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        while (w.nextNode()) nodes.push(w.currentNode);
        var all = nodes.map(function (n) { return n.nodeValue; }).join('');
        if (!laInHoa(all.trim())) return;
        nodes.forEach(function (n) { if (laInHoa(n.nodeValue.trim())) n.nodeValue = boInHoa(n.nodeValue); });
    }
    function datChu(el, ten) {
        if (txt(el) === ten) return;
        var sp = Array.prototype.filter.call(el.querySelectorAll('span'), function (s) { return txt(s) && !s.querySelector('span'); });
        if (sp.length === 1 && txt(sp[0]) === txt(el)) { sp[0].textContent = ten; return; }
        Array.prototype.slice.call(el.childNodes).forEach(function (n) {
            if (n.nodeType === 3 || (n.nodeType === 1 && n.tagName !== 'I')) n.parentNode.removeChild(n);
        });
        el.appendChild(document.createTextNode(ten));
    }

    // 1. Khối tiêu đề
    var HOP = '.page-heading, .page-header, .top-action-bar, .header-section, .cl-page-header, #portalHeader, .page > .top, .user-profile-bar';
    function timTieuDe() {
        var ds = [document.querySelectorAll('[data-uxu-title], .bpbd-page-title'), document.querySelectorAll('h1, h2')];
        if (TIEU_DE_SEL[TEP]) ds.unshift(document.querySelectorAll(TIEU_DE_SEL[TEP]));
        for (var i = 0; i < ds.length; i++) {
            for (var j = 0; j < ds[i].length; j++) {
                var el = ds[i][j];
                if (inPopup(el) || !txt(el)) continue;
                if (el.closest('.print-only-header, .card-section, .card, .cl-card, .card-block, table, [data-bpbd-filter], .view-section:not(#view-list), .portal-header')) continue;
                if (!visible(el) && !el.closest(HOP)) continue;
                return el;
            }
        }
        return null;
    }
    function chenTieuDe() {
        var sel = CHEN_TIEU_DE[TEP];
        if (!sel || !TEN) return null;
        var host = document.querySelector(sel);
        if (!host) return null;
        var head = host.querySelector(':scope > .bpbd-page-head');
        if (head) return head.querySelector('.bpbd-page-title');
        head = document.createElement('div');
        head.className = 'bpbd-page-head';
        head.innerHTML = '<h2 class="bpbd-page-title" data-uxu-title></h2>';
        head.firstChild.textContent = TEN;
        host.insertBefore(head, host.firstChild);
        return head.firstChild;
    }
    function apDungTieuDe() {
        var title = CHEN_TIEU_DE[TEP] ? chenTieuDe() : timTieuDe();
        if (!title) return;
        var box = title.closest('.bpbd-page-head') || title.closest(HOP);
        if (!box) {
            var p = title.parentElement;
            if (p && p !== document.body && !/^(MAIN|BODY|SECTION)$/.test(p.tagName) && !p.querySelector('table, form, [data-bpbd-filter], .card-section')) box = p;
            else {
                box = document.createElement('div');
                title.parentNode.insertBefore(box, title);
                box.appendChild(title);
            }
        }
        box.classList.add('bpbd-page-head');
        title.classList.add('bpbd-page-title');
        if (!title.hasAttribute('data-uxu-title')) title.setAttribute('data-uxu-title', '');
        if (TEN) datChu(title, TEN); else chuanChuTieuDe(title);
        // Dòng mô tả phụ, lời chào, icon trang trí trong khối tiêu đề
        each('p, .sub, .header-desc, .subtitle', function (el) { if (!el.contains(title)) el.classList.add('bpbd-page-sub'); }, box);
        Array.prototype.forEach.call(box.querySelectorAll('i'), function (el) {
            if (title.contains(el) || el.closest('button, a, .btn')) return;
            el.classList.add('bpbd-head-deco');
        });
        if (box.id === 'portalHeader') {
            Array.prototype.forEach.call(box.children, function (el) { if (!el.contains(title) && /Xin chào/.test(txt(el))) el.classList.add('bpbd-page-sub'); });
        }
        // Nhóm nút thao tác chung (không chứa tiêu đề) nằm bên phải khối
        Array.prototype.forEach.call(box.children, function (el) {
            if (el.contains(title) || el.classList.contains('bpbd-page-sub')) return;
            if (el.querySelector('button, a.btn, .btn') || /^(BUTTON|A)$/.test(el.tagName)) el.classList.add('bpbd-head-actions');
        });
        // Đường dẫn trong trang của màn mở từ Menu: khung Trang quản trị đã có đường dẫn
        if (TEN && TRONG_KHUNG) each('.page-breadcrumb, .breadcrumb, .cl-breadcrumb', function (bc) { bc.classList.add('bpbd-hide'); });
        // Hỏi đáp mở từ Menu Biện pháp bảo đảm: ẩn thanh chuyển phân hệ (như khi mở từ Menu BTNN)
        if (TEP === 'quan_ly_cau_hoi_faq' && SYS === 'bpbd') each('#systemTabsContainer', function (el) { el.classList.add('bpbd-hide'); });
        // Khối tiêu đề nằm trong thẻ Bộ lọc / danh sách: đưa ra trước thẻ
        var host = box.parentElement && box.parentElement.closest('.card-section, .card');
        if (host && host.querySelector('table, [data-bpbd-filter]')) host.parentNode.insertBefore(box, host);
    }

    // 3. Thanh tab nghiệp vụ phía trên Bộ lọc
    function apDungTab() {
        each('.nav-tabs, .fee-tabs, .tabs', function (bar) {
            if (bar.classList.contains('bpbd-tabs-card') || inPopup(bar) || bar.closest('[data-bpbd-filter], table, .bpbd-form-skip')) return;
            var tabs = Array.prototype.filter.call(bar.children, function (c) { return /nav-tab|fee-tab-item|(^|\s)tab(\s|$)/.test(c.className || ''); });
            if (tabs.length < 2) return;
            // Chỉ thanh tab đứng trước Bộ lọc / danh sách trong cùng khung
            var p = bar.parentElement, sau = false;
            for (var n = bar.nextElementSibling; n; n = n.nextElementSibling) {
                if (n.matches('[data-bpbd-filter], .nav-tabs, .card-filter, .filter-card, .card-section, .card, .table-container') || n.querySelector('[data-bpbd-filter], .card-filter, table')) { sau = true; break; }
            }
            if (!sau || !p) return;
            bar.classList.add('bpbd-tabs-card');
            tabs.forEach(function (t) { t.classList.add('bpbd-tab'); });
        });
    }

    // 4. Khối Bộ lọc
    function apDungLoc() {
        // Thẻ có tiêu đề «Bộ lọc tìm kiếm» và nút Xóa bộ lọc ở tiêu đề: thành thẻ lọc; nút Xóa bộ lọc chuyển về cạnh nút Tìm kiếm
        each('.card, .card-section', function (c) {
            if (c.hasAttribute('data-bpbd-filter') || c.classList.contains('bpbd-filter-card') || inPopup(c)) return;
            var h = c.querySelector(':scope > .card-h > h2, :scope > .card-h > h3, :scope > .card-header > h3');
            if (!h || !/^bộ lọc tìm kiếm$/i.test(txt(h))) return;
            c.classList.add('bpbd-filter-card');
            h.classList.add('bpbd-filter-title-hide');
            var hd = h.parentElement;
            var xoa = Array.prototype.filter.call(hd.querySelectorAll('button, a.btn'), function (b) { return /Xóa bộ lọc|Xoá bộ lọc/.test(b.textContent); })[0];
            var tim = Array.prototype.filter.call(c.querySelectorAll('button, a.btn'), function (b) { return !hd.contains(b) && /Tìm kiếm/.test(b.textContent); })[0];
            if (xoa && tim) {
                tim.parentNode.insertBefore(xoa, tim);
                if (!Array.prototype.some.call(hd.children, function (e) { return !e.classList.contains('bpbd-filter-title-hide') && visible(e); })) hd.classList.add('bpbd-hide');
            }
        });
        // Thẻ lọc riêng (không có data-bpbd-filter): .card-filter, .filter-section
        each('.card-filter, .filter-section, .card.bpbd-filter-card', function (c) {
            if (c.hasAttribute('data-bpbd-filter') || inPopup(c)) return;
            c.classList.add('bpbd-filter-card');
            each('.filter-grid, .grid-filter, .tl-dyn, .grid, .form-grid, .filter-row', function (g) { if (!g.classList.contains('bpbd-filter-grid') && g.querySelector('input, select')) g.classList.add('bpbd-filter-grid'); }, c);
        });
        var O_NHAP = 'input:not([type=hidden]):not([type=checkbox]):not([type=radio]), select, textarea';
        each('[data-bpbd-filter], .bpbd-filter-card', function (sec) {
            each('button, a.btn', function (b) {
                if (!/Xóa bộ lọc|Xoá bộ lọc/.test(b.textContent)) return;
                var row = b.parentElement;
                if (!row || row === sec || row.classList.contains('bpbd-filter-actions') || row.closest('.bpbd-filter-actions')) return;
                if (row.querySelector(O_NHAP)) return;
                // Nhóm nút nằm trong hàng có ô tích (ví dụ «Bao gồm nhóm đã rà soát»): kẻ đường trên cả hàng
                var up = row.parentElement;
                if (up && up !== sec && !up.matches('.filter-body, [data-bpbd-filter-body], .bpbd-filter-grid') && up.children.length <= 3 && !up.querySelector(O_NHAP) && up.querySelector('input[type=checkbox]')) {
                    up.classList.add('bpbd-filter-actions', 'bpbd-filter-actions-chk');
                    return;
                }
                row.classList.add('bpbd-filter-actions');
            }, sec);
            // Tiêu đề "Bộ lọc tìm kiếm" trong thẻ lọc: BTNN không có tiêu đề, chỉ giữ nút Thu gọn
            each('.filter-header-title, .filter-header h3, .filter-header h4, .filter-title, .card-title', function (h) {
                if (/^bộ lọc tìm kiếm$/i.test(txt(h))) h.classList.add('bpbd-filter-title-hide');
            }, sec);
        });
    }

    // 5. Khối danh sách
    var EXCEL_RE = /^(kết xuất|xuất)( ra)? excel$/i;
    function apDungDanhSach() {
        each('table', function (t) { if (!inPopup(t) && t.querySelector('thead th')) t.classList.add('bpbd-list-table'); });
        each('button, a.btn', function (b) {
            if (b.classList.contains('uxu-btn-excel') || !EXCEL_RE.test(txt(b)) || inPopup(b)) return;
            b.classList.add('uxu-btn-excel', 'uxu-btn-tb');
            if (b.classList.contains('btn-primary')) b.classList.replace('btn-primary', 'btn-secondary');
            ['height', 'min-height', 'padding', 'font-size', 'line-height'].forEach(function (p) { b.style.removeProperty(p); });
            b.innerHTML = '<i class="fa-solid fa-file-excel"></i> Kết xuất Excel';
            var bar = b.parentElement;
            if (!bar) return;
            Array.prototype.forEach.call(bar.children, function (s) {
                if (s !== b && s.matches('button.btn, a.btn') && !s.classList.contains('uxu-btn-tb')) { s.classList.add('uxu-btn-tb'); }
            });
            if (bar.lastElementChild !== b) bar.appendChild(b);
        });
    }

    // 6. Form nhập liệu / xem chi tiết: gắn lớp bpbd-form cho vùng form ngoài Bộ lọc
    var TIEU_DE_KHOI = '.section-title, .card-h > h2, .card-h > h3, .form-card-h, .block-head > h3, .cl-card-header .cl-card-title, .cl-card-header > h3, .cl-card-header > h4, .card-block-header > h3, .tl-card-h > h3, .detail-section-title';
    function apDungForm() {
        each('.card-section, .card, .cl-card, .card-block, .form-card, .form-block, .view-section, .inline-form, #formView, .tl-card, .detail-section', function (c) {
            if (c.matches('[data-bpbd-filter], .bpbd-filter-card') || c.closest('[data-bpbd-filter], .bpbd-filter-card') || c.querySelector('[data-bpbd-filter], .bpbd-filter-card')) return;
            if (!c.querySelector('input, select, textarea, ' + TIEU_DE_KHOI)) return;
            // Thẻ danh sách ngay sau Bộ lọc (màn danh sách): không phải form
            var tr = c.previousElementSibling;
            while (tr && /^(SCRIPT|STYLE)$/.test(tr.tagName)) tr = tr.previousElementSibling;
            if (tr && tr.matches('[data-bpbd-filter], .bpbd-filter-card') && c.querySelector('table')) return;
            c.classList.add('bpbd-form');
        });
        each(TIEU_DE_KHOI, function (h) {
            if (h.closest('[data-bpbd-filter], .bpbd-filter-card, .bpbd-page-head, .modal, .popup') || !h.closest('.bpbd-form')) return;
            // Tiêu đề thẻ danh sách («Danh sách …» có lưới) giữ chữ thường như khối danh sách BTNN
            if (/^Danh sách/i.test(txt(h)) && h.closest('.bpbd-form').querySelector('table')) return;
            h.classList.add('bpbd-sec-title');
        });
    }

    function run() {
        injectCss();
        try { apDungTieuDe(); } catch (e) { /* bỏ qua */ }
        try { apDungTab(); } catch (e) { /* bỏ qua */ }
        try { apDungLoc(); } catch (e) { /* bỏ qua */ }
        try { apDungDanhSach(); } catch (e) { /* bỏ qua */ }
        try { apDungForm(); } catch (e) { /* bỏ qua */ }
    }
    var cho = false;
    function hen() {
        if (cho) return;
        cho = true;
        setTimeout(function () { cho = false; run(); }, 80);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
    window.addEventListener('load', function () { run(); setTimeout(run, 400); setTimeout(run, 1200); });
    try {
        new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
                var m = muts[i];
                if (m.target && m.target.id === 'bpbdDongBoCss') continue;
                if ((m.addedNodes && m.addedNodes.length) || m.type === 'characterData') { hen(); return; }
            }
        }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
    } catch (e) { /* bỏ qua */ }
    window.bpbdDongBoRefresh = run;
})();
