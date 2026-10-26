/*
 * Dùng chung phân hệ Bồi thường nhà nước: cố định cột "Thao tác" bên phải lưới khi cuộn ngang.
 * - Áp dụng cho mọi bảng có ô tiêu đề cuối cùng là "Thao tác" (kể cả lưới trong popup, lưới sinh động).
 * - Ô cố định có nền đặc (lấy nền của dòng/bảng, mặc định trắng), bóng đổ cạnh trái.
 * - z-index thấp (1-3): không đè popup/menu; ô đang mở menu "..." (hover/focus/.show/.open) được nâng lên để menu không bị dòng dưới che.
 * Nạp bởi admin-ui-standardizer.js (bản của phân hệ BTNN) hoặc thẻ script trực tiếp; chống nạp lặp.
 */
(function () {
    'use strict';
    if (window.__btnnStickyAct) return;
    window.__btnnStickyAct = true;
    var CLS = 'btnn-sticky-act';
    var CSS = [
        'table th.' + CLS + ', table td.' + CLS + ' { position: sticky !important; right: 0; z-index: 1; background-clip: padding-box; }',
        // [uxu] Bóng/viền ngăn cách chỉ hiện khi bên trái cột Thao tác còn nội dung bị che (bảng tràn, chưa cuộn hết sang phải)
        'table.uxu-act-more th.' + CLS + ', table.uxu-act-more td.' + CLS + ' { box-shadow: inset 1px 0 0 #E2E8F0, -8px 0 10px -6px rgba(15, 23, 42, 0.28); }',
        // [uxu] Bảng rộng hơn khung: thu gọn đệm ngang ô, cho tiêu đề cột xuống dòng để bảng vừa khung, cột Thao tác không che cột trước
        'table.uxu-fit > thead > tr > th, table.uxu-fit > tbody > tr > td { padding-left: 10px !important; padding-right: 10px !important; }',
        'table.uxu-fit > thead > tr > th:not(.' + CLS + ') { white-space: normal !important; }',
        'table thead th.' + CLS + ' { z-index: 3; }',
        'table td.' + CLS + ':hover, table td.' + CLS + ':focus-within, table td.' + CLS + ':has(.show), table td.' + CLS + ':has(.open), table tr:hover > td.' + CLS + ' { z-index: 4; }'
    ].join('\n');
    function injectCss() {
        if (document.getElementById('btnnStickyActCss')) return;
        var st = document.createElement('style');
        st.id = 'btnnStickyActCss';
        st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }
    function isTransparent(c) { return !c || c === 'transparent' || /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\s*\)/.test(c); }
    // Nền đặc cho ô cố định: nền của chính ô, nếu trong suốt thì lấy nền của phần tử cha gần nhất có nền, mặc định trắng
    function solidBg(cell) {
        var el = cell;
        while (el && el.nodeType === 1) {
            var c = window.getComputedStyle(el).backgroundColor;
            if (!isTransparent(c)) return c;
            el = el.parentElement;
        }
        return '#fff';
    }
    function headerText(th) { return String(th.textContent || '').replace(/\s+/g, ' ').trim(); }
    function tagTable(tbl) {
        var head = tbl.tHead && tbl.tHead.rows.length ? tbl.tHead.rows[tbl.tHead.rows.length - 1] : null;
        if (!head || !head.cells.length) return;
        var last = head.cells[head.cells.length - 1];
        if (!/^Thao tác/i.test(headerText(last))) return;
        var mark = function (cell) {
            if (!cell || cell.colSpan > 1) return;
            if (!cell.classList.contains(CLS)) cell.classList.add(CLS);
            if (!cell.dataset.btnnStickyBg) {
                cell.dataset.btnnStickyBg = '1';
                if (isTransparent(window.getComputedStyle(cell).backgroundColor)) cell.style.backgroundColor = solidBg(cell.parentElement || cell);
            }
        };
        Array.prototype.forEach.call(tbl.tHead.rows, function (r) { if (r.cells.length) mark(r.cells[r.cells.length - 1]); });
        Array.prototype.forEach.call(tbl.tBodies, function (b) {
            Array.prototype.forEach.call(b.rows, function (r) { if (r.cells.length && r.cells.length >= head.cells.length) mark(r.cells[r.cells.length - 1]); });
        });
    }
    // [uxu] Khung cuộn ngang gần nhất của bảng
    function uxuScroller(tbl) {
        for (var el = tbl.parentElement; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
            var ox = window.getComputedStyle(el).overflowX;
            if (ox === 'auto' || ox === 'scroll') return el;
        }
        return null;
    }
    function uxuShade(tbl, sc) {
        var more = sc.scrollWidth - sc.clientWidth - sc.scrollLeft > 1;
        if (tbl.classList.contains('uxu-act-more') !== more) tbl.classList.toggle('uxu-act-more', more);
    }
    // [uxu] Bảng có cột Thao tác cố định mà tràn khung: (1) thu gọn đệm ô + tiêu đề xuống dòng; (2) còn tràn thì bỏ độ rộng cố định (width) của tiêu đề cột
    // (giữ STT, cột Thao tác và min-width) để các cột co theo nội dung. Phần còn tràn: cuộn ngang, bóng ngăn cách cạnh cột Thao tác.
    function uxuFit(tbl) {
        if (!tbl.querySelector('.' + CLS) || !tbl.offsetWidth) return;
        var sc = uxuScroller(tbl);
        if (!sc || !sc.clientWidth) return;
        if (!sc.__uxuScroll) {
            sc.__uxuScroll = true;
            sc.addEventListener('scroll', function () { uxuShade(tbl, sc); }, { passive: true });
        }
        // Mức tràn ban đầu (tỷ lệ so với khung) đo 01 lần khi lưới đã có dữ liệu: tràn nhiều (> 45%, lưới nhiều cột) thì chỉ áp (1),
        // giữ độ rộng cột để dữ liệu dễ đọc và cuộn ngang; tràn ít thì áp đủ (1)-(3) để bảng vừa khung.
        var hasRows = tbl.tBodies.length && Array.prototype.some.call(tbl.tBodies[0].rows, function (r) { return r.cells.length > 2; });
        if (!tbl.dataset.uxuOv0 && hasRows) tbl.dataset.uxuOv0 = String(Math.max(0, sc.scrollWidth - sc.clientWidth) / sc.clientWidth);
        var light = !tbl.dataset.uxuOv0 || parseFloat(tbl.dataset.uxuOv0) <= 0.45;
        if (sc.scrollWidth - sc.clientWidth > 1) {
            if (!tbl.classList.contains('uxu-fit')) tbl.classList.add('uxu-fit');
            if (light && hasRows && sc.scrollWidth - sc.clientWidth > 1 && tbl.tHead) {
                Array.prototype.forEach.call(tbl.tHead.rows, function (r) {
                    Array.prototype.forEach.call(r.cells, function (c, i) {
                        if (i === 0 || c.classList.contains(CLS) || c.dataset.uxuW || !c.style.width) return;
                        c.dataset.uxuW = c.style.width;
                        c.style.width = '';
                    });
                });
            }
            // (3) Vẫn tràn: bỏ min-width cố định của tiêu đề cột (trừ STT, cột Thao tác) để nội dung xuống dòng
            if (light && hasRows && sc.scrollWidth - sc.clientWidth > 1 && tbl.tHead) {
                Array.prototype.forEach.call(tbl.tHead.rows, function (r) {
                    Array.prototype.forEach.call(r.cells, function (c, i) {
                        if (i === 0 || c.classList.contains(CLS) || c.dataset.uxuMw || !c.style.minWidth) return;
                        c.dataset.uxuMw = c.style.minWidth;
                        c.style.minWidth = '';
                    });
                });
            }
        }
        uxuShade(tbl, sc);
    }
    function run() {
        injectCss();
        Array.prototype.forEach.call(document.querySelectorAll('table'), function (t) { try { tagTable(t); uxuFit(t); } catch (e) { /* bỏ qua */ } });
    }
    var pending = false;
    function schedule() {
        if (pending) return;
        pending = true;
        (window.requestAnimationFrame || setTimeout)(function () { pending = false; run(); }, 30);
    }
    window.btnnStickyActRefresh = run;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    // [uxu] Nạp tiện ích đồng bộ giao diện màn danh sách BTNN (tiêu đề, khối lọc, nút Kết xuất Excel, khối giả lập)
    (function () {
        if (window.__uxuDongBo || document.querySelector('script[src*="btnn_uxu_dong_bo.js"]')) return;
        var s = document.createElement('script');
        s.src = 'btnn_uxu_dong_bo.js?v=20261023uxu';
        (document.head || document.documentElement).appendChild(s);
    })();
    try {
        new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
                var t = muts[i].target;
                if (t && t.id === 'btnnStickyActCss') continue;
                if (muts[i].addedNodes && muts[i].addedNodes.length) { schedule(); return; }
            }
        }).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) { /* bỏ qua */ }
})();
