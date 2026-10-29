/*
 * Quy chuẩn căn lề lưới danh sách (dùng chung Website quản trị BTNN, BPBĐ và Website khách hàng).
 * - Tiêu đề cột căn lề theo giá trị của cột; ô tiêu đề nhóm (gộp nhiều cột) căn giữa.
 * - Căn giữa: STT, Thao tác, Ngày/thời điểm/thời hạn, Giờ-Phút-Ngày-Tháng-Năm, Trạng thái (badge), checkbox/cột chọn/cột mở rộng, cột tải file trong bảng tài liệu.
 * - Căn trái: Text, mã (kể cả dãy số định danh: mã PIN, số giấy tờ, số điện thoại...).
 * - Căn phải: Tiền, số đếm/số lượng, tỷ lệ %, tiến độ.
 * Theo Quy chuẩn hiển thị lưới danh sách - Danh mục và Phụ lục - Tài liệu tổng hợp.
 * Áp dụng cho mọi bảng có dòng tiêu đề (kể cả bảng con trong màn chi tiết/popup, bảng dựng bằng JS).
 * Bỏ qua bảng có class "ga-skip" hoặc nằm trong phần tử có class "ga-skip".
 * Tùy chọn: <script src=".../grid_align.js" data-require-query="system=btnn"> chỉ chạy khi URL chứa chuỗi đó.
 */
(function () {
    'use strict';
    var me = document.currentScript;
    var req = me && me.getAttribute('data-require-query');
    if (req && String(location.search).indexOf(req) < 0) return;
    if (window.__gridAlignLoaded) return;
    window.__gridAlignLoaded = true;

    var CSS = [
        'table.ga-grid > tbody > tr > td.ga-c, table.ga-grid > tfoot > tr > td.ga-c, table.ga-grid > tr > td.ga-c, table.ga-grid th.ga-c { text-align: center !important; }',
        'table.ga-grid > tbody > tr > td.ga-l, table.ga-grid > tfoot > tr > td.ga-l, table.ga-grid > tr > td.ga-l, table.ga-grid th.ga-l { text-align: left !important; }',
        'table.ga-grid > tbody > tr > td.ga-r, table.ga-grid > tfoot > tr > td.ga-r, table.ga-grid > tr > td.ga-r, table.ga-grid th.ga-r { text-align: right !important; }',
        'table.ga-grid td.ga-r input:not([type=checkbox]):not([type=radio]) { text-align: right; }'
    ].join('\n');

    function addStyle() {
        if (document.getElementById('ga-style')) return;
        var s = document.createElement('style');
        s.id = 'ga-style';
        s.textContent = CSS;
        (document.head || document.documentElement).appendChild(s);
    }

    function norm(t) {
        return String(t || '').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    var RE_STT = /^(stt|tt|#|số tt|số thứ tự)$/;
    var RE_ACT = /(thao tác|hành động|tác vụ)|^(xóa|xoá|sửa|chọn)$/;
    var RE_MONEY = /(số tiền|tiền|kinh phí|lệ phí|phí|giá trị|vnđ|vnd|đồng\)|\(đ\)|tạm ứng|chi trả|hoàn trả|thành tiền|mức bồi thường|bồi thường|mức đề nghị|mức xác minh|phải thu|đã thu|phải hoàn|đã hoàn|đã nộp|còn thiếu)/;
    var RE_MONEY_STRONG = /(số tiền|kinh phí|vnđ|vnd|đồng\)|\(đ\)|thành tiền|mức đề nghị|mức xác minh|phải thu|phải hoàn|^mức phí|^lệ phí|^phí( |$))/;
    var RE_COUNT = /(số vụ|số lượng|số hồ sơ|số việc|số người|số yêu cầu|số đơn|số bản|số trang|số lần|lượt|tỷ lệ|%|số ngày|số tháng|số năm|số kết luận|số cuộc|số đoàn|số buổi|số đề tài|số cơ quan|số đơn vị|điểm)/;
    var RE_DATE_H = /(^ngày|ngày |thời gian|thời hạn|hạn |^hạn|năm|tháng|giờ|phút|thời điểm|bắt đầu|kết thúc|từ ngày|đến ngày)/;
    var RE_TIMEPART = /^(giờ|phút|ngày|tháng|năm)$/;
    // Cột tệp của bảng tài liệu (không gồm "Tên tệp", "Loại tệp", "Người đính kèm" là cột Text)
    var RE_FILE_H = /^(file|tệp)( đính kèm| pdf| bản sao| văn bản| báo cáo| ảnh)|^(tài liệu|quyết định) đính kèm|^tài liệu( kiểm chứng)?$|^tài liệu \/ chứng từ$/;
    var RE_DATE_LIKE = /\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\/\d{4}|^\d{4}(\s*-\s*\d{4})?$|\d{1,2}:\d{2}/;
    var RE_CODE_H = /(^mã|mã |pin|số hiệu|ký hiệu|số đăng ký|biên lai|cccd|cmnd|mst|mã số thuế|điện thoại|giấy tờ|số khung|số máy|biển số|số tài khoản)/;
    var RE_STATUS_H = /(trạng thái|tình trạng)/;
    var RE_NUM = /^[-+]?\d{1,3}([.,]\d{3})*([.,]\d+)?\s*(đ|vnđ|vnd|đồng)?$|^[-+]?\d+([.,]\d+)?\s*(đ|vnđ|vnd|đồng)?$/i;
    var RE_DATE_V = /^\d{1,2}\/\d{1,2}\/\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?)?$|^\d{1,2}:\d{2}(:\d{2})?\s+\d{1,2}\/\d{1,2}\/\d{4}$/;

    // Xác định các dòng tiêu đề của bảng
    function headerRows(table) {
        var rows = Array.prototype.slice.call(table.rows);
        if (table.tHead && table.tHead.rows.length) return Array.prototype.slice.call(table.tHead.rows);
        var out = [];
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].cells;
            if (!cells.length) break;
            var allTh = true;
            for (var j = 0; j < cells.length; j++) if (cells[j].tagName !== 'TH') { allTh = false; break; }
            if (!allTh) break;
            out.push(rows[i]);
        }
        return out;
    }

    // Lưới vị trí cột theo colspan/rowspan
    function layout(rows) {
        var grid = [], res = [];
        rows.forEach(function (row, r) {
            grid[r] = grid[r] || [];
            var c = 0, list = [];
            Array.prototype.forEach.call(row.cells, function (cell) {
                while (grid[r][c]) c++;
                var cs = Math.max(1, cell.colSpan || 1), rs = Math.max(1, cell.rowSpan || 1);
                for (var dr = 0; dr < rs; dr++) {
                    grid[r + dr] = grid[r + dr] || [];
                    for (var dc = 0; dc < cs; dc++) grid[r + dr][c + dc] = cell;
                }
                list.push({ cell: cell, col: c, span: cs });
                c += cs;
            });
            res.push(list);
        });
        return { grid: grid, rows: res };
    }

    // Giá trị hiển thị của ô: chữ trong ô + giá trị ô nhập; bỏ đơn vị tiền đứng riêng
    function cellText(td) {
        var t = td.textContent;
        Array.prototype.forEach.call(td.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=hidden])'), function (i) { t += ' ' + (i.value || ''); });
        t = norm(t);
        return /^(đ|vnđ|vnd|đồng)$/.test(t) ? '' : t;
    }
    function isTotalRow(row) {
        var c = row.cells[0];
        return !!c && /^(tổng|cộng)/.test(norm(c.textContent));
    }

    function isOnlyBadge(td) {
        var kids = td.children;
        if (kids.length !== 1) return false;
        var k = kids[0];
        var cls = String(k.className || '');
        if (!/(badge|status|tag|label|pill|chip|trang-thai)/i.test(cls)) return false;
        return norm(k.textContent) === cellText(td);
    }

    function classify(colLabels, colIdx, bodyCells, headCell) {
        var leaf = colLabels.leaf, full = colLabels.full;
        if (headCell && headCell.classList && headCell.classList.contains('admin-actions-cell')) return 'c';
        if (headCell && headCell.querySelector && headCell.querySelector('input[type=checkbox]')) return 'c'; // cột chọn
        if (RE_STT.test(leaf)) return 'c';
        if (RE_ACT.test(leaf)) return 'c';
        if (RE_FILE_H.test(leaf.replace(/\s*\*$/, ''))) return 'c'; // cột tệp (nút Tải file / tên tệp / icon xem, tải) trong bảng tài liệu
        if (RE_TIMEPART.test(leaf.replace(/\s*\*$/, ''))) return 'c'; // Giờ/Phút/Ngày/Tháng/Năm
        var vals = [], hasInput = false, hasCheckbox = false, badges = 0, nonEmpty = 0;
        bodyCells.forEach(function (td) {
            if (td.querySelector('input[type=checkbox], input[type=radio]')) hasCheckbox = true;
            if (td.querySelector('input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=hidden]), select, textarea')) hasInput = true;
            var t = cellText(td);
            if (t && t !== '-' && t !== '--' && t !== '—') { nonEmpty++; vals.push(t); if (isOnlyBadge(td)) badges++; }
        });
        if (hasCheckbox && !nonEmpty) return 'c'; // checkbox / cột chọn
        if (!leaf && !nonEmpty) return 'c'; // cột mở rộng dòng / cột chọn không tiêu đề
        if (RE_STATUS_H.test(leaf) || (nonEmpty && badges === nonEmpty)) return 'c'; // trạng thái, badge
        var allNum = vals.length > 0 && vals.every(function (v) { return RE_NUM.test(v) && !/^\d{8,}$/.test(v); }); // dãy số dài (số giấy tờ, số đăng ký) là mã định danh dạng text
        var allDate = vals.length > 0 && vals.every(function (v) { return RE_DATE_V.test(v); });
        if (allDate) return 'c';
        var countish = RE_COUNT.test(leaf);
        var allMoneyV = vals.length > 0 && vals.every(function (v) { return /^[-+]?\d[\d.,]*\s*(đ|vnđ|vnd|đồng)(\s*\/.*)?$/.test(v); });
        if ((allNum || allMoneyV) && !countish && (RE_MONEY.test(leaf) || RE_MONEY_STRONG.test(full))) return 'r'; // tiêu đề nhóm chỉ xét từ khóa tiền rõ ràng
        if (!nonEmpty && !countish && RE_MONEY_STRONG.test(leaf)) return 'r'; // cột tiền chưa có dữ liệu / ô nhập tiền
        if (allNum) {
            if (RE_CODE_H.test(leaf)) return 'l'; // mã số ngắn (mã PIN...)
            if (RE_DATE_H.test(leaf) && vals.every(function (v) { return /^\d{4}$/.test(v); })) return 'c'; // năm
            return 'r'; // số đếm, số lượng
        }
        var allPct = vals.length > 0 && vals.every(function (v) { return /^\d+([.,]\d+)?\s*%$|^\d+\s*\/\s*\d+$/.test(v); });
        if (allPct) return 'r'; // tỷ lệ, tiến độ
        if (countish && !RE_CODE_H.test(leaf) && (!vals.length || vals.every(function (v) { return /^\d+(\s+[^\d\s\/].*)?$/.test(v); }))) return 'r'; // số đếm (kể cả kèm đơn vị)
        if (RE_DATE_H.test(leaf) && (!vals.length || vals.every(function (v) { return RE_DATE_LIKE.test(v); }))) return 'c'; // ngày, thời điểm, thời hạn
        if (/^tiến độ|^tỷ lệ/.test(leaf)) return 'r'; // tiến độ, tỷ lệ
        return 'l';
    }

    var ALIGN = { c: "center", l: "left", r: "right" };
    // Gán class + inline !important để thắng các quy tắc riêng (kể cả selector theo id) của từng màn hình
    function setCls(el, cls) {
        el.classList.remove("ga-c", "ga-l", "ga-r");
        if (cls) {
            el.classList.add("ga-" + cls);
            el.style.setProperty("text-align", ALIGN[cls], "important");
            el.setAttribute("data-ga", cls);
        } else if (el.hasAttribute("data-ga")) {
            el.style.removeProperty("text-align");
            el.removeAttribute("data-ga");
        }
        alignInner(el, cls);
    }

    // Nội dung bọc trong khối flex / grid / block (nút Tải file, nhóm icon, tiêu đề có icon sắp xếp):
    // text-align không dịch chuyển được nên căn bằng justify-content / margin theo cùng loại cột
    var JC = { c: "center", l: "flex-start", r: "flex-end" };
    var BLOCK_TAGS = /^(BUTTON|A|LABEL|IMG|SPAN|I|SVG|SMALL|STRONG|B|EM)$/;
    function clearInner(ch) {
        ["justify-content", "justify-items", "align-items", "margin-left", "margin-right"].forEach(function (p) {
            if (ch.getAttribute("data-ga-in").indexOf(p) >= 0) ch.style.removeProperty(p);
        });
        ch.removeAttribute("data-ga-in");
    }
    function alignInner(cell, cls, depth) {
        depth = depth || 0;
        Array.prototype.forEach.call(cell.children, function (ch) {
            if (ch.hasAttribute("data-ga-in")) clearInner(ch);
            if (!cls || /^(INPUT|SELECT|TEXTAREA|TABLE|BR|SCRIPT|STYLE)$/.test(ch.tagName)) return;
            var cs = window.getComputedStyle(ch), d = cs.display, set = [];
            if (d === "none") return;
            // Cột căn trái: chỉ chỉnh khối đang bị đẩy giữa / phải (giữ bố cục riêng như space-between)
            if (cls === "l" && !((d === "flex" || d === "grid") && /^(center|flex-end|end|right)$/.test(cs.justifyContent))) {
                if (d === "block" && ch.tagName === "DIV" && depth < 2) alignInner(ch, cls, depth + 1);
                return;
            }
            if (d === "flex" || d === "grid") {
                if (d === "flex" && /^column/.test(cs.flexDirection)) { ch.style.setProperty("align-items", JC[cls], "important"); set.push("align-items"); }
                else { ch.style.setProperty("justify-content", JC[cls], "important"); set.push("justify-content"); }
                if (d === "grid") { ch.style.setProperty("justify-items", cls === "c" ? "center" : (cls === "r" ? "end" : "start"), "important"); set.push("justify-items"); }
            } else if (d === "block" && BLOCK_TAGS.test(ch.tagName.toUpperCase())) {
                ch.style.setProperty("margin-left", cls === "l" ? "0" : "auto", "important");
                ch.style.setProperty("margin-right", cls === "r" ? "0" : "auto", "important");
                set.push("margin-left", "margin-right");
            } else if (d === "block" && ch.tagName === "DIV" && depth < 2) {
                alignInner(ch, cls, depth + 1);
            }
            if (set.length) ch.setAttribute("data-ga-in", set.join(","));
        });
    }

    function processTable(table) {
        if (table.classList.contains('ga-skip') || table.closest('.ga-skip, .flatpickr-calendar')) return;
        var hRows = headerRows(table);
        if (!hRows.length) return;
        var hl = layout(hRows);
        var nCols = 0;
        hl.grid.forEach(function (g) { if (g && g.length > nCols) nCols = g.length; });
        if (nCols < 2) return;
        var hSet = new Set(hRows);
        var bodyRows = Array.prototype.filter.call(table.rows, function (r) {
            return !hSet.has(r) && r.closest('table') === table;
        });
        // Bảng dạng nhãn/giá trị (th trong thân bảng) không phải lưới
        if (bodyRows.some(function (r) { return r.querySelector(':scope > th'); })) return;
        table.classList.add('ga-grid');
        var lastRow = hl.grid[hl.grid.length - 1] || [];
        var bl = layout(bodyRows);
        var perCol = [], totals = [];
        bl.rows.forEach(function (list) {
            list.forEach(function (it) {
                if (it.span !== 1) return;
                if (it.cell.parentNode && isTotalRow(it.cell.parentNode)) { (totals[it.col] = totals[it.col] || []).push(it.cell); return; }
                (perCol[it.col] = perCol[it.col] || []).push(it.cell);
            });
        });
        for (var c = 0; c < nCols; c++) {
            var head = lastRow[c];
            if (!head) continue;
            var labels = [];
            hl.grid.forEach(function (g) { if (g && g[c] && labels.indexOf(g[c]) < 0) labels.push(g[c]); });
            var lab = { leaf: norm(head.textContent), full: norm(labels.map(function (x) { return x.textContent; }).join(' ')) };
            var cells = perCol[c] || [];
            var cls = classify(lab, c, cells, head);
            cells.forEach(function (td) { setCls(td, cls); });
            // Tiêu đề cột căn lề cùng giá trị của cột
            if ((head.colSpan || 1) === 1) setCls(head, cls);
            // Dòng tổng cộng: chỉ căn phải các ô số/tiền, giữ nguyên các ô còn lại
            (totals[c] || []).forEach(function (td) { setCls(td, cls === 'r' ? 'r' : null); });
        }
        // Ô tiêu đề nhóm (gộp nhiều cột): căn giữa
        hRows.forEach(function (r) {
            Array.prototype.forEach.call(r.cells, function (cell) { if ((cell.colSpan || 1) > 1) setCls(cell, 'c'); });
        });
    }

    function run() {
        addStyle();
        Array.prototype.forEach.call(document.querySelectorAll('table'), function (t) {
            try { processTable(t); } catch (e) { /* bỏ qua bảng lỗi */ }
        });
    }

    var timer = null;
    function schedule() {
        if (timer) return;
        timer = setTimeout(function () { timer = null; run(); }, 60);
    }
    window.GridAlign = { run: run };

    function start() {
        run();
        try {
            new MutationObserver(function (muts) {
                for (var i = 0; i < muts.length; i++) {
                    if (muts[i].type === 'childList') { schedule(); return; }
                }
            }).observe(document.documentElement, { childList: true, subtree: true });
        } catch (e) { /* trình duyệt cũ */ }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
