/*
 * Kết xuất Excel dùng chung phân hệ BTNN (Quy chuẩn Kết xuất Excel dùng chung - Danh mục và Phụ lục - Tài liệu tổng hợp).
 * - Xuất toàn bộ bản ghi theo bộ lọc / tab hiện tại (không theo trang).
 * - Cột = STT + các cột của lưới (bỏ cột Thao tác).
 * - Tên tệp: yyyyMMdd_[Tên_chức_năng].xlsx.
 * - Bố cục: dòng tiêu đề, dòng thời điểm xuất, bảng dữ liệu, dòng ghi chú người xuất.
 * Dùng SheetJS (window.XLSX) nếu trang đã nạp; không có thì tải bảng HTML (.xls) để mockup vẫn chạy khi không có mạng.
 *
 * Cách dùng: BTNN_XLSX.exportGrid({ title, name, headers: [...], rows: [[...], ...] })
 */
(function (global) {
    'use strict';
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var stamp = function (d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()); };
    var viDateTime = function (d) { return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); };
    var escHtml = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

    // Giá trị ô lưới (có thể là HTML: badge, mã, "Quá hạn") -> chữ thuần
    function textOf(v) {
        if (v == null) return '';
        var s = String(v);
        if (!/[<&]/.test(s)) return s.trim();
        var d = document.createElement('div');
        d.innerHTML = s.replace(/<(div|br|p)\b/gi, ' <$1');
        return (d.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function currentUserName() {
        try { var u = global.BTNN_WF && global.BTNN_WF.getCurrentUser && global.BTNN_WF.getCurrentUser(); if (u && u.name) return u.name; } catch (e) { /* bỏ qua */ }
        return 'Người dùng hiện tại';
    }

    function toast(msg) { if (typeof global.showToast === 'function') global.showToast(msg); }

    function downloadBlob(blob, fileName) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    }

    function exportGrid(o) {
        var rows = (o && o.rows) || [];
        if (!rows.length) { toast('Không có dữ liệu để xuất Excel. [MSG-WRN-SYS-001]'); return null; }
        var headers = ['STT'].concat(o.headers || []);
        var body = rows.map(function (r, i) { return [i + 1].concat(r.map(textOf)); });
        var now = new Date();
        var fileName = stamp(now) + '_' + o.name + '.xlsx';
        var title = String(o.title || '').toUpperCase();
        // Dòng 2: thời điểm xuất; kèm điều kiện lọc cần ghi (o.note) nếu có
        var info = 'Thời điểm xuất: ' + viDateTime(now) + (o.note ? ' - ' + o.note : '');
        var footer = 'Xuất ngày ' + viDateTime(now) + ' bởi ' + currentUserName();
        var result = { fileName: fileName, headers: headers, info: info, rowCount: body.length, rows: body, lib: global.XLSX ? 'SheetJS' : 'html' };
        global.__lastXlsx = result;

        if (global.XLSX && global.XLSX.utils) {
            var X = global.XLSX;
            var aoa = [[title], [info], []].concat([headers], body, [[], [footer]]);
            var ws = X.utils.aoa_to_sheet(aoa);
            var last = headers.length - 1;
            ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: last } }, { s: { r: 1, c: 0 }, e: { r: 1, c: last } }, { s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: last } }];
            ws['!cols'] = headers.map(function (h, i) {
                if (i === 0) return { wch: 6 };
                var w = h.length;
                body.forEach(function (r) { w = Math.max(w, String(r[i]).length); });
                return { wch: Math.min(Math.max(w + 2, 12), 60) };
            });
            var wb = X.utils.book_new();
            X.utils.book_append_sheet(wb, ws, 'Danh_sach');
            if (!o.dryRun) X.writeFile(wb, fileName);
        } else {
            // Không có SheetJS: tải bảng HTML để Excel mở được
            var colspan = headers.length;
            var td = function (v) { return '<td style="mso-number-format:\'\\@\'; font-family:\'Times New Roman\'; font-size:12pt;">' + escHtml(v) + '</td>'; };
            var html = '<meta charset="UTF-8"><table border="1" style="border-collapse:collapse;">'
                + '<tr><td colspan="' + colspan + '" style="text-align:center; font-weight:bold; font-size:15pt;">' + escHtml(title) + '</td></tr>'
                + '<tr><td colspan="' + colspan + '" style="text-align:center; font-style:italic;">' + escHtml(info) + '</td></tr>'
                + '<tr>' + headers.map(function (h) { return '<th style="background:#e5e7eb;">' + escHtml(h) + '</th>'; }).join('') + '</tr>'
                + body.map(function (r) { return '<tr>' + r.map(td).join('') + '</tr>'; }).join('')
                + '<tr><td colspan="' + colspan + '" style="font-style:italic;">' + escHtml(footer) + '</td></tr></table>';
            result.fileName = fileName.replace(/\.xlsx$/, '.xls');
            if (!o.dryRun) downloadBlob(new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' }), result.fileName);
        }
        toast('Đã kết xuất ' + body.length + ' bản ghi ra tệp Excel.');
        return result;
    }

    global.BTNN_XLSX = { exportGrid: exportGrid, textOf: textOf };
})(window);
