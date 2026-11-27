/*
 * bpbd_bo_cuc_co_dinh.js - Dùng chung phân hệ Biện pháp bảo đảm (Website Quản trị): bố cục cố định của lưới và thanh nút.
 * Theo quy tắc bộ thành phần giao diện (kg/ui-mau/ui-chuan.css: cot-thao-tac, --rong-thao-tac, .form-page-footer, .page-actions)
 * và cách làm của phân hệ BTNN (btnn_cot_thao_tac.js).
 * 1. Lưới có cột «Thao tác» (ô tiêu đề cuối cùng là «Thao tác», ô dữ liệu có nút):
 *    - Cột Thao tác cố định bên phải (sticky right), nền đặc (lấy nền của dòng, mặc định trắng) để không lộ chữ của cột bên dưới.
 *    - Rộng tối thiểu theo số nút nhiều nhất: số nút x 36 + 32 px, tối thiểu 104 px (rộng khi có 02 nút); các nút trên một dòng.
 *    - Tiêu đề cột trên một dòng; bảng rộng hơn khung thì cuộn ngang (chưa có khung cuộn thì bọc bảng trong khung cuộn ngang).
 *    - Bóng ngăn cách cạnh trái cột Thao tác chỉ hiện khi bên trái còn nội dung bị che.
 *    - Bảng table-layout: fixed: cột có tiêu đề dài hơn ô được nới rộng để tiêu đề nằm trên một dòng.
 *    - Lưới chỉ xem (xem chi tiết bằng cách bấm dòng), không dòng nào có nút: ẩn cột Thao tác; trang khác có nút thì hiện lại.
 *    - Bảng con trong form có cột Thao tác ở đầu bảng: chỉ giữ tiêu đề và nút trên một dòng (không đổi vị trí cột).
 * 2. Thanh nút của màn Xem chi tiết, Cập nhật, form lớn và popup có thanh nút: cố định ở đáy khung nhìn (sticky bottom),
 *    nền đặc, luôn thấy khi cuộn nội dung dài; thanh nằm trong luồng trang nên không đè nội dung cuối.
 *    Thanh dùng position: fixed (màn Chỉnh lý) thì chừa khoảng dưới cho nội dung bằng chiều cao thanh.
 *    Tổ tiên có overflow: hidden (làm thanh không dính được) chuyển sang overflow: clip (vẫn cắt nội dung thừa).
 * Không đổi trường, nút, hành vi nghiệp vụ; chạy lặp lại được (trang dựng nội dung bằng JS sau khi tải).
 */
(function () {
    'use strict';
    if (window.__bpbdBoCucCoDinh) return;
    window.__bpbdBoCucCoDinh = true;

    var TEP = (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');

    // Thanh nút theo tên lớp riêng (mọi trang BPBĐ)
    var THANH_NUT_CHUNG = [
        '.form-page-footer', '.page-actions', '.sticky-footer', '.sticky-footer-actions', '.form-sticky-actions',
        '.sticky-actions', '.panel-actions-card', '.tl-sticky-bar', '.copy-sticky-actions', '#regReadonlyToolbar',
        '.card-section[style*="position:sticky"]', '.cl-sticky-footer'
    ];
    // Thanh nút theo từng trang (lớp dùng chung với khối khác, chỉ lấy đúng thanh cuối màn)
    var THANH_NUT_TRANG = {
        dang_ky_bpbd_can_bo: ['#uc024Form > .footer-actions'],
        tra_cuu_thong_tin: ['#view-detail > div:last-child']
    };
    // Chân popup (thanh nút của popup)
    var CHAN_POPUP = '.modal-footer, .modal-foot, .tl-modal-f, .cl-modal-footer, .popup-footer, .sticky-modal-footer, .modal-actions';

    var CSS = [
        /* 1. Lưới có cột Thao tác */
        'body table.bpbd-luoi-tt > thead > tr > th { white-space: nowrap !important; }',
        'body table.bpbd-luoi-tt > thead > tr > th.bpbd-cot-tt, body table.bpbd-luoi-tt > tbody > tr > td.bpbd-cot-tt {',
        '  position: sticky !important; right: 0 !important; white-space: nowrap !important; text-align: center !important; box-sizing: border-box !important;',
        '  width: var(--bpbd-rong-tt, 104px); min-width: var(--bpbd-rong-tt, 104px) !important; max-width: none !important; background-clip: padding-box !important; }',
        'body table.bpbd-luoi-tt > tbody > tr > td.bpbd-cot-tt { z-index: 3 !important; }',
        'body table.bpbd-luoi-tt > thead > tr > th.bpbd-cot-tt { z-index: 15 !important; }',
        /* Nút trên một dòng: khối bọc nút (flex) không xuống dòng */
        'body table.bpbd-luoi-tt td.bpbd-cot-tt > div:not([class*="menu"]):not([class*="dropdown-content"]), body table.bpbd-luoi-tt td.bpbd-cot-tt > span { flex-wrap: nowrap !important; white-space: nowrap !important; }',
        /* Ô đang mở menu thao tác: nâng lên để menu không bị dòng dưới che */
        'body table.bpbd-luoi-tt > tbody > tr > td.bpbd-cot-tt:hover, body table.bpbd-luoi-tt > tbody > tr > td.bpbd-cot-tt:focus-within, body table.bpbd-luoi-tt > tbody > tr:hover > td.bpbd-cot-tt { z-index: 6 !important; }',
        /* Bóng ngăn cách khi bên trái cột Thao tác còn nội dung bị che */
        'body table.bpbd-luoi-tt.bpbd-tt-che > thead > tr > th.bpbd-cot-tt, body table.bpbd-luoi-tt.bpbd-tt-che > tbody > tr > td.bpbd-cot-tt { box-shadow: inset 1px 0 0 #E2E8F0, -8px 0 10px -6px rgba(15, 23, 42, 0.28) !important; }',
        'body table.bpbd-luoi-tt:not(.bpbd-tt-che) > thead > tr > th.bpbd-cot-tt, body table.bpbd-luoi-tt:not(.bpbd-tt-che) > tbody > tr > td.bpbd-cot-tt { box-shadow: none !important; }',
        /* Lưới chỉ xem, không dòng nào có nút: ẩn cột Thao tác (xem chi tiết bằng cách bấm dòng) */
        'body table.bpbd-luoi-tt.bpbd-tt-trong > thead > tr > th.bpbd-cot-tt, body table.bpbd-luoi-tt.bpbd-tt-trong > tbody > tr > td.bpbd-cot-tt { display: none !important; }',
        /* Bảng có cột Thao tác đặt ở đầu (bảng con trong form): tiêu đề và nút trên một dòng (không cố định vị trí) */
        'body table.bpbd-luoi-tt-dau > thead > tr > th { white-space: nowrap !important; }',
        'body table.bpbd-luoi-tt-dau td.bpbd-cot-tt-dau, body table.bpbd-luoi-tt-dau td.bpbd-cot-tt-dau > div, body table.bpbd-luoi-tt-dau td.bpbd-cot-tt-dau > span { white-space: nowrap !important; flex-wrap: nowrap !important; }',
        /* Khung cuộn ngang do script bọc */
        '.bpbd-cuon-ngang { overflow-x: auto !important; max-width: 100%; }',
        /* 2. Thanh nút cố định đáy khung nhìn */
        'body .bpbd-thanh-nut:not(.bpbd-tn-fixed) { position: sticky !important; bottom: 0 !important; top: auto !important; z-index: 40; }',
        'body .bpbd-thanh-nut.bpbd-tn-bong { box-shadow: 0 -4px 12px rgba(15, 23, 42, 0.08) !important; }',
        'body .bpbd-thanh-nut.bpbd-tn-popup { z-index: 5; }'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('bpbdBoCucCss')) return;
        var st = document.createElement('style');
        st.id = 'bpbdBoCucCss';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }
    function txt(el) { return String(el && el.textContent || '').replace(/\s+/g, ' ').trim(); }
    function visible(el) { return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length)); }
    function each(sel, fn, root) { try { Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn); } catch (e) { /* bỏ qua */ } }

    // Màu nền: tách rgba
    function mau(c) {
        var m = String(c || '').match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
        return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
    // Nền đặc nhìn thấy của phần tử: chồng các lớp nền của phần tử và tổ tiên (nền trong suốt một phần), mặc định trắng
    function nenDac(el) {
        var lop = [];
        for (var e = el; e && e.nodeType === 1; e = e.parentElement) {
            var c = mau(window.getComputedStyle(e).backgroundColor);
            if (c && c.a > 0) { lop.push(c); if (c.a >= 0.99) break; }
        }
        var r = 255, g = 255, b = 255;
        for (var i = lop.length - 1; i >= 0; i--) {
            var x = lop[i];
            r = x.r * x.a + r * (1 - x.a); g = x.g * x.a + g * (1 - x.a); b = x.b * x.a + b * (1 - x.a);
        }
        return 'rgb(' + Math.round(r) + ', ' + Math.round(g) + ', ' + Math.round(b) + ')';
    }
    function datNenDac(cell) {
        if (cell.dataset.bpbdNen) { cell.style.removeProperty('background-color'); delete cell.dataset.bpbdNen; }
        var c = mau(window.getComputedStyle(cell).backgroundColor);
        if (c && c.a >= 0.99) return;
        cell.style.setProperty('background-color', nenDac(cell), 'important');
        cell.dataset.bpbdNen = '1';
    }

    // ===== 1. Lưới có cột Thao tác =====
    function tongCot(row) {
        var n = 0;
        for (var i = 0; i < row.cells.length; i++) n += row.cells[i].colSpan || 1;
        return n;
    }
    var NUT = 'button, a, [role="button"], [onclick], .btn, .icon-btn, i, svg, input, select';
    function oThaoTac(t) {
        if (!t.tHead || !t.tHead.rows.length) return null;
        var hr = Array.prototype.slice.call(t.tHead.rows);
        var ncol = 0;
        hr.forEach(function (r) { ncol = Math.max(ncol, tongCot(r)); });
        var thTT = null;
        hr.forEach(function (r) {
            var last = r.cells[r.cells.length - 1];
            if (last && /^Thao tác$/i.test(txt(last)) && (last.colSpan || 1) === 1) thTT = last;
        });
        if (!thTT) return null;
        var head = [thTT];
        hr.forEach(function (r) {
            var last = r.cells[r.cells.length - 1];
            if (last && last !== thTT && tongCot(r) === ncol && (last.colSpan || 1) === 1) head.push(last);
        });
        var body = [];
        Array.prototype.forEach.call(t.tBodies, function (tb) {
            Array.prototype.forEach.call(tb.rows, function (r) {
                var last = r.cells[r.cells.length - 1];
                if (!last || r.cells.length < 2 || (last.colSpan || 1) !== 1 || tongCot(r) !== ncol) return;
                body.push(last);
            });
        });
        // Cột cuối tên «Thao tác» nhưng chỉ ghi chữ (ví dụ bảng lịch sử): không phải cột nút
        // (ô trống hoặc chỉ có dấu gạch «-» là ô không có nút, không tính là chữ)
        var coChu = body.some(function (c) { return !laOTrong(c) && !c.querySelector(NUT); });
        var coNut = body.some(function (c) { return !!c.querySelector(NUT); });
        if (coChu && !coNut) return null;
        return { head: head, body: body };
    }
    function laOTrong(c) { return /^[\s\-–—]*$/.test(txt(c)); }
    // Ô Thao tác trống: không nút, không chữ (trừ dấu gạch), không biểu tượng
    var NUT_THAT = 'button, a, [role="button"], .btn, .icon-btn, input, select, [onclick], i, svg, img';
    function oRong(c) {
        if (!laOTrong(c)) return false;
        return !Array.prototype.some.call(c.querySelectorAll(NUT_THAT), function (b) {
            return b.style.display !== 'none' && !b.hidden;
        });
    }
    function demNut(cell) {
        var n = 0;
        Array.prototype.forEach.call(cell.querySelectorAll('button, a, [role="button"]'), function (b) {
            if (b.closest('[class*="menu"], [class*="dropdown-content"]') && b.closest('[class*="menu"], [class*="dropdown-content"]') !== cell) return;
            if (b.parentElement && b.parentElement.closest('button, a') && b.parentElement.closest('button, a') !== b) return;
            if (b.style.display === 'none' || b.hidden) return;
            n++;
        });
        return n;
    }
    function khungCuon(t) {
        for (var el = t.parentElement; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
            var ox = window.getComputedStyle(el).overflowX;
            if (ox === 'auto' || ox === 'scroll') return el;
            if (ox === 'hidden' || ox === 'clip') return null;
        }
        return null;
    }
    // Bảng tràn khung mà chưa có khung cuộn ngang: bọc bảng trong khung cuộn
    function damBaoCuon(t) {
        var sc = khungCuon(t);
        if (sc) return sc;
        if (!visible(t)) return null;
        var p = t.parentElement;
        if (!p) return null;
        var cs = window.getComputedStyle(p);
        var rong = p.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
        if (t.offsetWidth <= rong + 1) return null;
        var bao = document.createElement('div');
        bao.className = 'bpbd-cuon-ngang';
        p.insertBefore(bao, t);
        bao.appendChild(t);
        return bao;
    }
    // Bảng table-layout: fixed: tiêu đề một dòng có thể tràn ô; nới rộng cột theo chữ tiêu đề (bảng cuộn ngang nếu rộng hơn khung)
    function noiCotCoDinh(t) {
        if (!visible(t) || !t.tHead) return;
        var hr = t.tHead.rows;
        if (hr.length !== 1) return;
        var cols = t.querySelectorAll(':scope > colgroup > col');
        Array.prototype.forEach.call(hr[0].cells, function (th, i) {
            if (th.scrollWidth <= th.clientWidth + 1) return;
            var can = th.scrollWidth + 2;
            if (cols.length === hr[0].cells.length && cols[i]) cols[i].style.setProperty('width', can + 'px', 'important');
            th.style.setProperty('width', can + 'px', 'important');
            th.dataset.bpbdNoi = String(can);
        });
    }
    function bong(t, sc) {
        var che = !!sc && sc.scrollWidth - sc.clientWidth - sc.scrollLeft > 1;
        if (t.classList.contains('bpbd-tt-che') !== che) t.classList.toggle('bpbd-tt-che', che);
    }
    // Bảng con có cột Thao tác ở đầu bảng: chỉ giữ tiêu đề và nút trên một dòng
    function cotThaoTacDau(t) {
        if (!t.tHead || t.tHead.rows.length !== 1) return false;
        var c0 = t.tHead.rows[0].cells[0];
        if (!c0 || !/^Thao tác$/i.test(txt(c0))) return false;
        t.classList.add('bpbd-luoi-tt-dau');
        Array.prototype.forEach.call(t.tBodies, function (tb) {
            Array.prototype.forEach.call(tb.rows, function (r) {
                var c = r.cells[0];
                if (c && r.cells.length > 1 && (c.colSpan || 1) === 1 && !c.classList.contains('bpbd-cot-tt-dau')) c.classList.add('bpbd-cot-tt-dau');
            });
        });
        return true;
    }
    function apDungLuoi() {
        each('table', function (t) {
            try {
                var o = oThaoTac(t);
                if (!o) { cotThaoTacDau(t); return; }
                if (!t.classList.contains('bpbd-luoi-tt')) t.classList.add('bpbd-luoi-tt');
                // Lưới chỉ xem (bấm dòng để xem chi tiết): mọi ô Thao tác đều trống (không nút, không chữ, không biểu tượng) thì ẩn cột
                var trong = o.body.length > 0 && o.body.every(oRong);
                if (t.classList.contains('bpbd-tt-trong') !== trong) t.classList.toggle('bpbd-tt-trong', trong);
                if (window.getComputedStyle(t).tableLayout === 'fixed') t.classList.add('bpbd-luoi-fixed');
                var nMax = 0;
                o.head.concat(o.body).forEach(function (c) {
                    if (!c.classList.contains('bpbd-cot-tt')) c.classList.add('bpbd-cot-tt');
                });
                o.body.forEach(function (c) { nMax = Math.max(nMax, demNut(c)); });
                var rong = Math.max(104, nMax * 36 + 32) + 'px';
                if (t.style.getPropertyValue('--bpbd-rong-tt') !== rong) t.style.setProperty('--bpbd-rong-tt', rong);
                o.head.concat(o.body).forEach(datNenDac);
                if (t.classList.contains('bpbd-luoi-fixed')) noiCotCoDinh(t);
                var sc = damBaoCuon(t);
                if (sc && !sc.__bpbdCuon) {
                    sc.__bpbdCuon = true;
                    sc.addEventListener('scroll', function () { bong(t, sc); }, { passive: true });
                }
                bong(t, sc);
            } catch (e) { /* bỏ qua */ }
        });
    }

    // ===== 2. Thanh nút cố định đáy khung nhìn =====
    function chiCoThanh(p, el) {
        // Khối cha chỉ chứa thanh nút (các khối khác ẩn hoặc rỗng)
        for (var c = p.firstChild; c; c = c.nextSibling) {
            if (c === el) continue;
            if (c.nodeType === 3 && c.nodeValue.trim()) return false;
            if (c.nodeType === 1 && !/^(SCRIPT|STYLE|TEMPLATE)$/.test(c.tagName) && visible(c) && c.offsetHeight > 0) return false;
        }
        return true;
    }
    function goc(el) {
        // Lấy khối bọc ngoài cùng chỉ chứa thanh nút, để thanh dính theo khối nội dung dài bên ngoài
        var p = el.parentElement;
        while (p && p !== document.body && !p.matches('.view, .view-section, form, main, section.card, .modal-content, .modal-box, .modal-container') && chiCoThanh(p, el) && !p.classList.contains('bpbd-thanh-nut')) {
            el = p;
            p = el.parentElement;
        }
        return el;
    }
    // Tổ tiên có overflow: hidden làm thanh không dính theo khung nhìn: chuyển sang overflow: clip (vẫn cắt nội dung thừa)
    function moTranAn(el) {
        for (var a = el.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) {
            var cs = window.getComputedStyle(a);
            var cuonDoc = a.scrollHeight > a.clientHeight + 1 && (cs.overflowY === 'auto' || cs.overflowY === 'scroll');
            if (cuonDoc) return; // khung cuộn thật (ví dụ thân popup): thanh dính theo khung này
            if (/(auto|scroll)/.test(cs.overflowX + cs.overflowY)) { a.dataset.bpbdChanDinh = '1'; continue; } // khung cuộn ngang không cuộn dọc: ghi lại để kiểm tra
            if (cs.overflowX === 'hidden' || cs.overflowY === 'hidden') {
                a.style.setProperty('overflow', 'clip', 'important');
                a.dataset.bpbdClip = '1';
            }
        }
    }
    function trongSuot(c) { var m = mau(c); return !m || m.a < 0.99; }
    function danhDauThanh(el, popup) {
        if (!el || el.closest('table, [data-bpbd-filter], .bpbd-filter-card')) return;
        if (!el.querySelector('button, a.btn, .btn')) return;
        // Chỉ xử lý khi thanh đang hiển thị (màn đang ẩn: xử lý khi mở màn), để xác định đúng khối bọc thanh
        if (!visible(el) || el.offsetHeight === 0) return;
        var cs = window.getComputedStyle(el);
        if (cs.position === 'fixed') {
            el.classList.add('bpbd-thanh-nut', 'bpbd-tn-fixed');
            // Chừa khoảng dưới cho nội dung bằng chiều cao thanh
            if (visible(el)) {
                var h = el.offsetHeight + 16;
                var pb = parseFloat(window.getComputedStyle(document.body).paddingBottom) || 0;
                if (pb < h) document.body.style.setProperty('padding-bottom', h + 'px', 'important');
            }
            return;
        }
        var t = popup ? el : goc(el);
        if (!t.classList.contains('bpbd-thanh-nut')) t.classList.add('bpbd-thanh-nut');
        if (popup) t.classList.add('bpbd-tn-popup');
        var tcs = window.getComputedStyle(t);
        if (trongSuot(tcs.backgroundColor)) t.style.setProperty('background-color', nenDac(t), 'important');
        if (!popup && tcs.boxShadow === 'none' && !t.dataset.bpbdBong) {
            t.dataset.bpbdBong = '1';
            t.classList.add('bpbd-tn-bong');
        }
        if (visible(t)) moTranAn(t);
    }
    function canCoDinhPopup(el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > window.innerHeight + 1 || r.top < 0) return true;
        for (var a = el.parentElement; a && a !== document.body; a = a.parentElement) {
            var cs = window.getComputedStyle(a);
            if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && a.scrollHeight > a.clientHeight + 1) return true;
            if (cs.position === 'fixed') break;
        }
        return false;
    }
    function apDungThanhNut() {
        var ds = THANH_NUT_CHUNG.concat(THANH_NUT_TRANG[TEP] || []);
        ds.forEach(function (sel) { each(sel, function (el) { danhDauThanh(el, false); }); });
        // Chân popup đang mở: chỉ xử lý khi chân popup nằm trong vùng cuộn hoặc bị đẩy khỏi khung nhìn
        // (popup cuộn ở thân, chân nằm ngoài thân thì vốn luôn hiển thị: giữ nguyên)
        each(CHAN_POPUP, function (el) {
            if (!visible(el) || el.classList.contains('bpbd-thanh-nut')) return;
            var hop = el.closest('.modal, .modal-overlay, .cl-modal-overlay, .tl-ov, [class*="modal"], [id*="Modal"], [id*="modal"]');
            if (!hop) return;
            if (canCoDinhPopup(el)) danhDauThanh(el, true);
        });
    }

    function run() {
        injectCss();
        try { apDungLuoi(); } catch (e) { /* bỏ qua */ }
        try { apDungThanhNut(); } catch (e) { /* bỏ qua */ }
    }
    var cho = false;
    function hen() {
        if (cho) return;
        cho = true;
        setTimeout(function () { cho = false; run(); }, 60);
    }
    window.bpbdBoCucRefresh = run;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
    window.addEventListener('load', function () { run(); setTimeout(run, 400); setTimeout(run, 1200); });
    window.addEventListener('resize', hen);
    // Mở popup, chuyển màn, đổi tab thường đổi lớp hoặc style: chạy lại sau mỗi lần bấm
    document.addEventListener('click', function () { setTimeout(hen, 30); setTimeout(hen, 350); }, true);
    try {
        new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
                var m = muts[i];
                if (m.target && m.target.id === 'bpbdBoCucCss') continue;
                if (m.addedNodes && m.addedNodes.length) { hen(); return; }
            }
        }).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) { /* bỏ qua */ }
})();
