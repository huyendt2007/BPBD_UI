/*
 * [th2c] Danh mục Loại thiệt hại yêu cầu bồi thường 2 cấp (DM_27): 06 nhóm (Điều 23 - Điều 28 Luật TNBTCNN), 36 mục chi tiết.
 * Component dùng chung (window.BTNN_TH):
 * - GROUPS / ITEMS: mã nhóm TH_TS, TH_TN, TH_CHET, TH_SK, TH_TT, TH_CPK; mã mục = mã nhóm + _01, _02...
 * - codeOf(x): quy đổi giá trị cũ về mã mục chi tiết:
 *     + số 1..6 (thietHaiList.type cũ), mã ngắn TS/TN/CHET/SK/TT/CPK, tên 06 loại cũ -> mục _01 của nhóm tương ứng
 *       (Tài sản bị xâm phạm -> TH_TS_01; Thu nhập thực tế bị mất/giảm sút -> TH_TN_01; Vật chất do người bị thiệt hại chết -> TH_CHET_01;
 *        Vật chất do sức khỏe bị xâm phạm -> TH_SK_01; Thiệt hại về tinh thần -> TH_TT_01; Các chi phí hợp lý khác -> TH_CPK_01)
 *     + mã nhóm -> mục _01 của nhóm; mã mục / tên mục chi tiết -> giữ nguyên mã
 * - normClaim(c): chuẩn hóa thietHaiList (type), verifiedItems / negotiation.items (key, label), xmHistory[].items (type, name); giữ nguyên số tiền
 * - Nhóm VII. Các thiệt hại khác (TH_KHAC): không có mục cố định; dòng do người dùng thêm (mã TH_KHAC_<số>, tên tự nhập), nút Thêm thiệt hại khác / Xóa dòng
 * - tableHtml(o) / rowsHtml(o): bảng 2 cấp (dòng nhóm có mở rộng / thu gọn, dòng mục chi tiết, dòng tổng); refresh(table): cộng nhóm và tổng
 */
(function (g) {
    'use strict';
    var RAW = [
        ['TH_TS', 'I', 'Thiệt hại do tài sản bị xâm phạm', 'Điều 23', [
            ['Tài sản đã bị phát mại, bị mất', 'Khoản 1, Điều 23'],
            ['Tài sản bị hư hỏng có thể sửa chữa, khôi phục', 'Khoản 2, Điều 23'],
            ['Tài sản bị hư hỏng không thể sửa chữa, khôi phục', 'Khoản 2, Điều 23'],
            ['Thu nhập thực tế bị mất do không sử dụng, khai thác được tài sản - Đối với tài sản có cho thuê trên thị trường', 'Khoản 3, Điều 23'],
            ['Thu nhập thực tế bị mất do không sử dụng, khai thác được tài sản - Đối với tài sản không có cho thuê trên thị trường', 'Khoản 3, Điều 23'],
            ['Hoàn trả các khoản tiền đã nộp vào ngân sách nhà nước, bị tịch thu, thi hành án, khoản tiền đặt để bảo đảm và khoản lãi', 'Khoản 4, Điều 23'],
            ['Tiền phạt do vi phạm nghĩa vụ trong giao dịch dân sự, kinh tế đã có hiệu lực và khoản lãi của khoản tiền phạt', 'Khoản 5, Điều 23'],
            ['Thiệt hại xảy ra do vượt quá yêu cầu của tình thế cấp thiết', 'Khoản 6, Điều 23']
        ]],
        ['TH_TN', 'II', 'Thiệt hại do thu nhập thực tế bị mất hoặc bị giảm sút', 'Điều 24', [
            ['Thu nhập ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân', 'Điểm a, Khoản 1, Điều 24'],
            ['Thu nhập không ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân', 'Điểm b, Khoản 1, Điều 24'],
            ['Thu nhập không ổn định theo mùa vụ bị mất hoặc bị giảm sút của cá nhân', 'Điểm c, Khoản 1, Điều 24'],
            ['Thu nhập thực tế bị mất hoặc bị giảm sút của tổ chức', 'Khoản 2, Điều 24']
        ]],
        ['TH_CHET', 'III', 'Thiệt hại về vật chất do người bị thiệt hại chết', 'Điều 25', [
            ['Chi phí khám bệnh, chữa bệnh cho người bị thiệt hại trước khi chết', 'Khoản 1, Điều 25'],
            ['Chi phí bồi dưỡng sức khỏe cho người bị thiệt hại trước khi chết', 'Khoản 2, Điều 25'],
            ['Chi phí cho người chăm sóc người bị thiệt hại trong thời gian khám bệnh, chữa bệnh trước khi chết', 'Khoản 3, Điều 25'],
            ['Chi phí cho việc mai táng người bị thiệt hại chết', 'Khoản 4, Điều 25'],
            ['Tiền cấp dưỡng cho những người mà người bị thiệt hại chết đang thực hiện nghĩa vụ cấp dưỡng', 'Khoản 5, Điều 25']
        ]],
        ['TH_SK', 'IV', 'Thiệt hại về vật chất do sức khỏe bị xâm phạm', 'Điều 26', [
            ['Chi phí khám bệnh, chữa bệnh cho người bị thiệt hại do sức khỏe bị xâm phạm', 'Khoản 1, Điều 26'],
            ['Chi phí bồi dưỡng sức khỏe cho người bị thiệt hại trong thời gian khám bệnh, chữa bệnh', 'Khoản 2, Điều 26'],
            ['Chi phí cho người chăm sóc người bị thiệt hại trong thời gian khám bệnh, chữa bệnh', 'Khoản 3, Điều 26'],
            ['Chi phí cho người thường xuyên chăm sóc trong trường hợp người bị thiệt hại mất khả năng lao động', 'Điểm a, Khoản 4, Điều 26'],
            ['Tiền cấp dưỡng cho những người mà người bị thiệt hại mất khả năng lao động đang thực hiện nghĩa vụ cấp dưỡng', 'Điểm b, Khoản 4, Điều 26']
        ]],
        ['TH_TT', 'V', 'Thiệt hại về tinh thần', 'Điều 27', [
            ['Thiệt hại về tinh thần do bị áp dụng biện pháp xử lý hành chính giáo dục tại xã, phường, thị trấn', 'Khoản 1, Điều 27'],
            ['Thiệt hại về tinh thần do bị áp dụng biện pháp tạm giữ người theo thủ tục hành chính, bị đưa vào trường giáo dưỡng, cơ sở giáo dục bắt buộc, cơ sở cai nghiện bắt buộc', 'Khoản 2, Điều 27'],
            ['Thiệt hại về tinh thần do bị giữ trong trường hợp khẩn cấp trong hoạt động tố tụng hình sự', 'Điểm a, Khoản 3, Điều 27'],
            ['Thiệt hại về tinh thần do bị bắt, tạm giữ, tạm giam, chấp hành hình phạt tù', 'Điểm b, Khoản 3, Điều 27'],
            ['Thiệt hại về tinh thần khi bị khởi tố, truy tố, xét xử mà không bị bắt, tạm giữ, tạm giam hoặc chấp hành hình phạt không phải là hình phạt tù', 'Điểm c, Khoản 3, Điều 27'],
            ['Thiệt hại về tinh thần khi chấp hành hình phạt cải tạo không giam giữ, phạt tù cho hưởng án treo', 'Điểm d, Khoản 3, Điều 27'],
            ['Thiệt hại về tinh thần trong thời gian đã chấp hành xong hình phạt đến khi có bản án, quyết định xác định thuộc trường hợp được bồi thường', 'Điểm đ, Khoản 3, Điều 27'],
            ['Thiệt hại về tinh thần trong trường hợp người bị thiệt hại chết', 'Khoản 4, Điều 27'],
            ['Thiệt hại về tinh thần trong trường hợp sức khỏe bị xâm phạm', 'Khoản 5, Điều 27'],
            ['Thiệt hại về tinh thần trong trường hợp công chức bị xử lý kỷ luật buộc thôi việc trái pháp luật', 'Khoản 6, Điều 27']
        ]],
        ['TH_CPK', 'VI', 'Các chi phí khác được bồi thường', 'Điều 28', [
            ['Chi phí thuê phòng nghỉ, chi phí đi lại, in ấn tài liệu trong quá trình khiếu nại, tố cáo, tham gia tố tụng', 'Điểm a, Khoản 1 và Điểm a, Khoản 2, Điều 28'],
            ['Chi phí gửi đơn thư đến cơ quan nhà nước, người có thẩm quyền giải quyết', 'Điểm a, Khoản 1 và Điểm b, Khoản 2, Điều 28'],
            ['Chi phí thuê người bào chữa, người bảo vệ quyền và lợi ích hợp pháp của người bị thiệt hại', 'Điểm a, Khoản 1 và Điểm c, Khoản 2, Điều 28'],
            ['Chi phí đi lại để thăm gặp của thân nhân người bị tạm giữ, người bị tạm giam, người chấp hành án phạt tù trong tố tụng hình sự', 'Điểm b, Khoản 1 và Khoản 3, Điều 28']
        ]]
    ];
    // Tên 06 loại thiệt hại cũ (danh sách phẳng) theo thứ tự nhóm
    var LEGACY = ['Tài sản bị xâm phạm', 'Thu nhập thực tế bị mất/giảm sút', 'Vật chất do người bị thiệt hại chết', 'Vật chất do sức khỏe bị xâm phạm', 'Thiệt hại về tinh thần', 'Các chi phí hợp lý khác'];
    var SHORT = { TS: 'TH_TS', TN: 'TH_TN', CHET: 'TH_CHET', SK: 'TH_SK', TT: 'TH_TT', CPK: 'TH_CPK' };
    var GROUPS = [], ITEMS = [], MAP = {};
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    RAW.forEach(function (r, gi) {
        var grp = { code: r[0], no: gi + 1, roman: r[1], name: r[2], basis: r[3], items: [] };
        r[4].forEach(function (x, i) {
            var it = { code: r[0] + '_' + pad(i + 1), group: r[0], no: i + 1, name: x[0], basis: x[1] };
            grp.items.push(it); ITEMS.push(it); MAP[it.code] = it;
        });
        GROUPS.push(grp); MAP[grp.code] = grp;
    });
    // VII. Các thiệt hại khác: không có mục cố định; người dùng thêm dòng (mã TH_KHAC_<số>, tên tự nhập)
    var KHAC = 'TH_KHAC';
    GROUPS.push({ code: KHAC, no: 7, roman: 'VII', name: 'Các thiệt hại khác', basis: '', items: [], dynamic: true });
    MAP[KHAC] = GROUPS[GROUPS.length - 1];
    var NAMES = {}; // tên dòng thiệt hại khác theo mã (mã duy nhất toàn hệ thống)
    function isKhac(c) { return /^TH_KHAC_[A-Za-z0-9]+$/.test(String(c || '')); }
    var seq = 0;
    function newKhacCode() { seq++; return KHAC + '_' + Date.now().toString(36).toUpperCase() + seq; }
    function low(s) { return String(s || '').trim().toLowerCase().replace(/^\d+\.\s*/, '').replace(/\s+/g, ' '); }

    function codeOf(x) {
        if (x === null || x === undefined || x === '') return '';
        var s = String(x).trim();
        if (isKhac(s)) return s;
        if (s === KHAC) return '';
        if (MAP[s]) return MAP[s].group ? s : s + '_01';
        if (/^[1-6]$/.test(s)) return GROUPS[+s - 1].code + '_01';
        var u = s.toUpperCase();
        if (SHORT[u]) return SHORT[u] + '_01';
        if (/^T[1-6]$/.test(u)) return GROUPS[+u.slice(1) - 1].code + '_01';
        var l = low(s), i;
        for (i = 0; i < LEGACY.length; i++) if (low(LEGACY[i]) === l) return GROUPS[i].code + '_01';
        for (i = 0; i < ITEMS.length; i++) if (low(ITEMS[i].name) === l) return ITEMS[i].code;
        return '';
    }
    // Mã mục của 01 bản ghi: thử lần lượt code, key, type, label, name
    function codeOfAny(o) { if (!o || typeof o !== "object") return codeOf(o); var f = ["code", "key", "type", "label", "name"]; for (var i = 0; i < f.length; i++) { var c = codeOf(o[f[i]]); if (c) return c; } return ""; }
    function item(code) {
        var c = codeOf(code);
        if (!c) return null;
        if (isKhac(c)) return { code: c, group: KHAC, no: '', name: NAMES[c] || 'Thiệt hại khác', basis: '' };
        return MAP[c];
    }
    function groupOf(code) { var it = item(code); return it ? it.group : ''; }
    function group(code) { return MAP[groupOf(code)] || MAP[code] || null; }
    function name(code) { var it = item(code); return it ? it.name : 'Thiệt hại yêu cầu bồi thường'; }
    function setName(code, n) { if (isKhac(code) && n) NAMES[code] = String(n); }
    // Tên hiển thị của 01 bản ghi (dòng thiệt hại khác: tên tự nhập)
    function nameOf(d) {
        var c = codeOfAny(d);
        if (isKhac(c)) return (d && (d.name || d.label)) || NAMES[c] || 'Thiệt hại khác';
        return name(c);
    }
    function codes(tid) {
        var r = ITEMS.map(function (it) { return it.code; });
        var t = tid && typeof document !== 'undefined' ? tbl(tid) : null;
        if (t) t.querySelectorAll('tr.bth-i[data-g="' + KHAC + '"]').forEach(function (tr) { r.push(tr.getAttribute('data-code')); });
        return r;
    }
    function fmt(n) { return (Math.round(Number(n) || 0)).toLocaleString('vi-VN').replace(/,/g, '.'); }
    function parse(s) { var d = String(s === undefined || s === null ? '' : s).replace(/\D/g, ''); return d ? Number(d) : 0; }
    function esc(v) { return String(v === undefined || v === null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function find(list, code) {
        var c = codeOf(code);
        return (list || []).find(function (x) { return x && codeOfAny(x) === c; }) || null;
    }
    function ord(c) { c = codeOf(c); var i = ITEMS.findIndex(function (it) { return it.code === c; }); return i >= 0 ? i : (isKhac(c) ? 1000 : 2000); }

    // ---------- Quy đổi dữ liệu cũ ----------
    function normOne(it, keyField, labelField) {
        if (!it || typeof it !== 'object') return it;
        var src = it.code || it[keyField];
        var c = codeOf(src);
        if (!c && labelField) c = codeOf(it[labelField]);
        if (!c) return it;
        it.code = c;
        it[keyField] = c;
        if (isKhac(c)) {
            it.group = KHAC;
            setName(c, it.name || (labelField ? it[labelField] : ''));
            if (labelField && !it[labelField]) it[labelField] = NAMES[c] || 'Thiệt hại khác';
            return it;
        }
        it.group = MAP[c].group;
        if (labelField) it[labelField] = MAP[c].name;
        return it;
    }
    function normList(list, keyField, labelField) {
        if (!Array.isArray(list)) return list;
        list.forEach(function (it) { normOne(it, keyField || 'type', labelField); });
        return list;
    }
    function normClaim(c) {
        if (!c || typeof c !== 'object') return c;
        normList(c.thietHaiList, 'type');
        normList(c.verifiedItems, 'key', 'label');
        if (c.negotiation) normList(c.negotiation.items, 'key', 'label');
        (Array.isArray(c.xmHistory) ? c.xmHistory : []).forEach(function (r) { normList(r && r.items, 'type', 'name'); });
        return c;
    }

    // ---------- Bảng 2 cấp ----------
    // o: { tid, head: [th html cột 2..n], list: [{ code|type|key, ... }], all: true = đủ 36 mục (có ô tích), nameTitle,
    //      cols: [{ k, sum, align, td(code, d, on) -> html, v(code, d) -> số }], isOn(code, d), check: { id(code), disabled(code, d), title(code, d) },
    //      badge(code, d) -> html, after(code, d, on) -> '<tr>...</tr>', total: { label } | false, totalRow: html, hook: tên hàm window(code, on, el),
    //      khac: { nameId(code) } -> nhóm VII cho phép thêm / xóa dòng (ô Tên / nội dung thiệt hại), khacHook: tên hàm window(code, 'add'|'del', el),
    //      open: 'auto' (mặc định: nhóm có mục được chọn mở, còn lại thu gọn) | 'all', toolbar: true }
    var REG = {};
    function itemRow(o, grp, it, d, on, hid) {
        var cols = o.cols || [];
        var dyn = grp.code === KHAC;
        var cells = cols.map(function (col) {
            var v = col.v ? (Number(col.v(it.code, d, on)) || 0) : 0;
            return '<td data-col="' + col.k + '"' + (col.sum ? ' data-v="' + v + '"' : '') + ' style="' + (col.align === 'right' ? 'text-align:right; white-space:nowrap;' : '') + (col.style || '') + '">' + (col.td ? col.td(it.code, d, on) : '') + '</td>';
        }).join('');
        var cb = '';
        if (o.check) {
            var dis = o.check.disabled ? o.check.disabled(it.code, d) : false;
            var tt = o.check.title ? o.check.title(it.code, d) : '';
            // Dòng thiệt hại khác: ô tích ẩn (luôn chọn; nút Xóa dòng = bỏ chọn)
            cb = '<input type="checkbox" class="bth-cb" id="' + o.check.id(it.code) + '"' + (on ? ' checked' : '') + (dis ? ' disabled' : '') + (tt ? ' title="' + esc(tt) + '"' : '') + (dyn ? ' style="display:none;"' : '') + ' onchange="BTNN_TH.onTick(this)">';
        }
        var nm = nameOf(Object.assign({ code: it.code }, d || {}));
        var nameCell;
        if (dyn && o.khac) {
            nameCell = '<div style="display:flex; gap:6px; align-items:flex-start;">' + cb
                + '<div style="flex:1; min-width:0;"><input type="text" class="form-control form-control-sm bth-kname" id="' + o.khac.nameId(it.code) + '" maxlength="500" value="' + esc((d && (d.name || d.label)) || NAMES[it.code] ? nm : '') + '" placeholder="Nhập tên / nội dung thiệt hại..." oninput="BTNN_TH.khacName(this)">'
                + '<div class="error-message" style="color:#dc2626; font-size:11px; display:none;">Đây là trường bắt buộc</div></div>'
                + '<button type="button" class="btn btn-sm btn-outline-danger bth-kdel" title="Xóa dòng" onclick="BTNN_TH.delKhac(this)"><i class="fa-solid fa-trash"></i> Xóa</button></div>';
        } else if (dyn) {
            nameCell = '<span style="font-weight:600;">' + cb + esc(nm) + '</span>';
        } else {
            nameCell = '<label class="bth-lbl">' + cb + '<span><span class="bth-no">' + it.no + '.</span> ' + esc(it.name) + ' <span class="bth-basis">(' + esc(it.basis) + ')</span></span></label>';
        }
        var row = '<tr class="bth-i' + (on ? '' : ' bth-off') + (dyn && !on ? ' bth-del' : '') + hid + '" data-g="' + grp.code + '" data-code="' + it.code + '"' + (d && d.__new ? ' data-new="1"' : '') + '>'
            + '<td class="bth-iname">' + nameCell + (o.badge ? o.badge(it.code, d, on) : '') + '</td>' + cells + '</tr>';
        if (o.after) {
            var ex = o.after(it.code, d, on) || '';
            if (ex) {
                ex = String(ex).replace(/^\s*<tr/, '<tr data-g="' + grp.code + '" data-bthx="' + it.code + '"');
                if (hid) ex = /^<tr[^>]*\sclass="/.test(ex) ? ex.replace(/^(<tr[^>]*\sclass=")/, '$1bth-hide ') : ex.replace(/^<tr/, '<tr class="bth-hide"');
                row += ex;
            }
        }
        return row;
    }
    function rowsHtml(o) {
        if (o.tid) REG[o.tid] = o;
        var byCode = {}, khacList = [];
        (o.list || []).forEach(function (d) {
            var c = codeOfAny(d);
            if (!c || byCode[c]) return;
            byCode[c] = d;
            if (isKhac(c)) { setName(c, d.name || d.label); khacList.push(c); }
        });
        var isOn = o.isOn || function (code, d) { return !!d; };
        var cols = o.cols || [];
        var tsum = {};
        var html = '';
        GROUPS.forEach(function (grp) {
            var dyn = grp.code === KHAC;
            var its = dyn ? khacList.map(function (c) { return item(c); }) : grp.items.filter(function (it) { return o.all || byCode[it.code]; });
            if (!its.length && !(dyn && o.khac)) return;
            var gs = {};
            var cnt = its.filter(function (it) { return !!isOn(it.code, byCode[it.code] || null); }).length;
            var open = o.open === 'all' || cnt > 0;
            var hid = open ? '' : ' bth-hide';
            var body = its.map(function (it) {
                var d = byCode[it.code] || null, on = !!isOn(it.code, d);
                if (on) cols.forEach(function (col) { if (col.sum) gs[col.k] = (gs[col.k] || 0) + (col.v ? (Number(col.v(it.code, d, on)) || 0) : 0); });
                return itemRow(o, grp, it, d, on, hid);
            }).join('');
            if (dyn && o.khac) body += '<tr class="bth-kadd' + hid + '" data-g="' + KHAC + '"><td colspan="' + (cols.length + 1) + '" style="padding-left:30px;"><button type="button" class="btn btn-secondary btn-sm" onclick="BTNN_TH.addKhac(this)"><i class="fa-solid fa-plus"></i> Thêm thiệt hại khác</button></td></tr>';
            Object.keys(gs).forEach(function (k) { tsum[k] = (tsum[k] || 0) + gs[k]; });
            var gcells = cols.map(function (col) {
                return col.sum ? '<td data-gsum="' + col.k + '" style="text-align:right; white-space:nowrap;">' + fmt(gs[col.k] || 0) + ' đ</td>' : '<td></td>';
            }).join('');
            html += '<tr class="bth-g" data-g="' + grp.code + '" data-open="' + (open ? '1' : '0') + '">'
                + '<td class="bth-gname" onclick="BTNN_TH.toggleGroup(this)" title="Mở rộng / Thu gọn"><i class="fa-solid ' + (open ? 'fa-chevron-down' : 'fa-chevron-right') + ' bth-chev"></i> '
                + '<span>' + grp.roman + '. ' + esc(grp.name) + (grp.basis ? ' <span class="bth-basis">(' + grp.basis + ')</span>' : '') + '</span>'
                + (o.all ? ' <span class="bth-cnt">(' + (dyn ? cnt + ' dòng' : cnt + '/' + grp.items.length) + ')</span>' : '') + '</td>' + gcells + '</tr>' + body;
        });
        if (!html) html = '<tr><td colspan="' + (cols.length + 1) + '" style="text-align:center; color:#94a3b8; font-style:italic;">' + esc(o.empty || 'Không có dữ liệu') + '</td></tr>';
        if (o.totalRow) html += o.totalRow;
        else if (o.total !== false) {
            html += '<tr class="bth-total"><td style="text-align:right;">' + esc((o.total && o.total.label) || 'TỔNG CỘNG:') + '</td>'
                + cols.map(function (col) { return col.sum ? '<td data-tsum="' + col.k + '" style="text-align:right; white-space:nowrap;">' + fmt(tsum[col.k] || 0) + ' đ</td>' : '<td></td>'; }).join('') + '</tr>';
        }
        return html;
    }
    // Thêm 01 dòng thiệt hại khác (nhóm VII) vào bảng đang nhập
    function addKhac(btn) {
        var table = btn.closest('table'), o = table && REG[table.id];
        if (!o) return;
        var c = newKhacCode();
        var tr = btn.closest('tr');
        var d = { code: c, group: KHAC, name: '', __new: true };
        tr.insertAdjacentHTML('beforebegin', itemRow(o, MAP[KHAC], item(c), d, true, ''));
        var hook = o.khacHook;
        if (hook && typeof g[hook] === 'function') { try { g[hook](c, 'add', btn); } catch (e) { console.warn('BTNN_TH khac', e); } }
        setOpen(table, KHAC, true);
        refresh(table);
        var n = document.getElementById(o.khac.nameId(c));
        if (n) n.focus();
    }
    // Xóa dòng thiệt hại khác: dòng mới thêm -> xóa khỏi bảng; dòng đã có (kế thừa) -> bỏ chọn, ẩn dòng
    function delKhac(btn) {
        var tr = btn.closest('tr'), table = btn.closest('table'), o = table && REG[table.id];
        var c = tr.getAttribute('data-code');
        var ex = table.querySelector('tr[data-bthx="' + c + '"]');
        if (tr.getAttribute('data-new') === '1') { tr.remove(); if (ex) ex.remove(); }
        else {
            var cb = tr.querySelector('input.bth-cb');
            if (cb) cb.checked = false;
            tr.classList.add('bth-off', 'bth-del');
            if (ex) ex.classList.add('bth-del');
        }
        var hook = o && o.khacHook;
        if (hook && typeof g[hook] === 'function') { try { g[hook](c, 'del', btn); } catch (e) { console.warn('BTNN_TH khac', e); } }
        refresh(table);
    }
    function khacName(inp) {
        var tr = inp.closest('tr');
        if (tr) setName(tr.getAttribute('data-code'), inp.value.trim());
        inp.classList.remove('is-invalid');
        var m = inp.parentNode.querySelector('.error-message');
        if (m) m.style.display = 'none';
    }
    // Kiểm tra Tên / nội dung thiệt hại của các dòng thiệt hại khác đang chọn; trả về ô lỗi đầu tiên (hoặc null)
    function validateKhac(table) {
        table = tbl(table);
        if (!table) return null;
        var first = null;
        table.querySelectorAll('tr.bth-i[data-g="' + KHAC + '"]:not(.bth-off) input.bth-kname').forEach(function (inp) {
            var bad = !inp.value.trim();
            inp.classList.toggle('is-invalid', bad);
            var m = inp.parentNode.querySelector('.error-message');
            if (m) m.style.display = bad ? 'block' : 'none';
            if (bad && !first) first = inp;
        });
        if (first) { setOpen(table, KHAC, true); first.focus(); }
        return first;
    }
    // Đánh dấu lỗi 01 ô (viền đỏ + "Đây là trường bắt buộc" dưới ô); tự xóa lỗi khi nhập lại
    function markErr(el, bad, msg) {
        if (!el) return;
        el.classList.toggle('is-invalid', !!bad);
        var m = el.nextElementSibling && el.nextElementSibling.classList && el.nextElementSibling.classList.contains('bth-err') ? el.nextElementSibling : null;
        if (bad && !m) { el.insertAdjacentHTML('afterend', '<div class="error-message bth-err" style="color:#dc2626; font-size:11px; text-align:left;"></div>'); m = el.nextElementSibling; }
        if (m) { m.textContent = msg || 'Đây là trường bắt buộc'; m.style.display = bad ? 'block' : 'none'; }
        if (bad && !el.__bthErr) { el.__bthErr = true; el.addEventListener('input', function () { markErr(el, false); }); }
    }
    // Kiểm tra các dòng mục đang tích: ô Cách tính (calcPfx) và Số tiền (valPfx, > 0) bắt buộc; lỗi: mở nhóm, focus ô lỗi đầu tiên
    function validateRows(table, calcPfx, valPfx) {
        table = tbl(table);
        if (!table) return null;
        var first = null;
        table.querySelectorAll('tr.bth-i').forEach(function (tr) {
            var c = tr.getAttribute('data-code'), cb = tr.querySelector('input.bth-cb');
            var ce = document.getElementById(calcPfx + c), ve = document.getElementById(valPfx + c);
            var on = cb ? cb.checked : true;
            var badC = on && ce && !ce.value.trim(), badV = on && ve && !(parse(ve.value) > 0);
            markErr(ce, badC); markErr(ve, badV);
            if ((badC || badV) && !first) { first = badC ? ce : ve; setOpen(table, tr.getAttribute('data-g'), true); }
        });
        if (first) first.focus();
        return first;
    }
    // Tên đang nhập của dòng thiệt hại khác (theo ô Tên trong bảng), không có ô nhập thì theo danh mục tên đã lưu
    function khacValue(table, code) {
        table = tbl(table);
        var o = table && REG[table.id];
        var inp = o && o.khac ? document.getElementById(o.khac.nameId(code)) : null;
        return inp ? inp.value.trim() : (NAMES[code] || '');
    }
    function toolbar(tid) {
        return '<div class="bth-toolbar" data-for="' + tid + '">'
            + '<button type="button" class="btn btn-secondary btn-sm" id="' + tid + '_expandAll" onclick="BTNN_TH.toggleAll(\'' + tid + '\', true)"><i class="fa-solid fa-angles-down"></i> Mở rộng tất cả</button>'
            + '<button type="button" class="btn btn-secondary btn-sm" id="' + tid + '_collapseAll" onclick="BTNN_TH.toggleAll(\'' + tid + '\', false)"><i class="fa-solid fa-angles-up"></i> Thu gọn tất cả</button></div>';
    }
    function tableHtml(o) {
        var head = '<thead><tr style="background-color: var(--table-header-bg, #f8fafc);"><th style="min-width:320px;">' + esc(o.nameTitle || 'Thiệt hại yêu cầu bồi thường') + '</th>' + (o.head || []).join('') + '</tr></thead>';
        return (o.toolbar === false ? '' : toolbar(o.tid))
            + '<table class="custom-table bth-table" id="' + o.tid + '"' + (o.hook ? ' data-hook="' + o.hook + '"' : '') + (o.all ? ' data-all="1"' : '') + ' style="background:white; width:100%; font-size:12.5px;">'
            + head + '<tbody>' + rowsHtml(o) + '</tbody></table>';
    }
    function tbl(t) { return typeof t === 'string' ? document.getElementById(t) : t; }
    function setOpen(table, gcode, open) {
        table = tbl(table);
        if (!table) return;
        var gr = table.querySelector('tr.bth-g[data-g="' + gcode + '"]');
        if (!gr) return;
        gr.setAttribute('data-open', open ? '1' : '0');
        var ic = gr.querySelector('.bth-chev');
        if (ic) { ic.classList.toggle('fa-chevron-down', !!open); ic.classList.toggle('fa-chevron-right', !open); }
        table.querySelectorAll('tr[data-g="' + gcode + '"]:not(.bth-g)').forEach(function (tr) { tr.classList.toggle('bth-hide', !open); });
    }
    function toggleGroup(td) {
        var tr = td.closest('tr'), table = td.closest('table');
        setOpen(table, tr.getAttribute('data-g'), tr.getAttribute('data-open') !== '1');
    }
    function toggleAll(tid, open) {
        var table = tbl(tid);
        if (!table) return;
        table.querySelectorAll('tr.bth-g').forEach(function (gr) { setOpen(table, gr.getAttribute('data-g'), open); });
    }
    function cellVal(td) {
        if (!td) return 0;
        var inp = td.querySelector('input.bth-num');
        return inp ? parse(inp.value) : (Number(td.getAttribute('data-v')) || 0);
    }
    // Cộng lại dòng nhóm / dòng tổng theo các dòng mục đang được chọn; autoOpen: nhóm có mục được chọn mở, còn lại thu gọn
    function refresh(table, autoOpen) {
        table = tbl(table);
        if (!table) return;
        var total = {};
        // Ô tích được gán trực tiếp (nạp dữ liệu): đồng bộ trạng thái chọn của dòng mục
        table.querySelectorAll('tr.bth-i').forEach(function (tr) { var cb = tr.querySelector('input.bth-cb'); if (cb) tr.classList.toggle('bth-off', !cb.checked); });
        table.querySelectorAll('tr.bth-g').forEach(function (gr) {
            var gc = gr.getAttribute('data-g');
            var rows = Array.prototype.slice.call(table.querySelectorAll('tr.bth-i[data-g="' + gc + '"]'));
            var on = rows.filter(function (r) { return !r.classList.contains('bth-off'); });
            var cnt = gr.querySelector('.bth-cnt');
            if (cnt) cnt.textContent = gc === KHAC ? '(' + on.length + ' dòng)' : '(' + on.length + '/' + rows.length + ')';
            gr.querySelectorAll('td[data-gsum]').forEach(function (td) {
                var k = td.getAttribute('data-gsum');
                var s = on.reduce(function (a, r) { return a + cellVal(r.querySelector('td[data-col="' + k + '"]')); }, 0);
                total[k] = (total[k] || 0) + s;
                td.textContent = fmt(s) + ' đ';
            });
            if (autoOpen) setOpen(table, gc, on.length > 0);
        });
        table.querySelectorAll('td[data-tsum]').forEach(function (td) { td.textContent = fmt(total[td.getAttribute('data-tsum')] || 0) + ' đ'; });
        return total;
    }
    function onTick(cb) {
        var tr = cb.closest('tr'), table = cb.closest('table');
        tr.classList.toggle('bth-off', !cb.checked);
        var hook = table && table.getAttribute('data-hook');
        if (hook && typeof g[hook] === 'function') { try { g[hook](tr.getAttribute('data-code'), cb.checked, cb); } catch (e) { console.warn('BTNN_TH hook', e); } }
        refresh(table);
    }
    function recalcFrom(el) { var t = el && el.closest && el.closest('table.bth-table'); if (t) refresh(t); }

    // ---------- CSS ----------
    function css() {
        if (typeof document === 'undefined' || document.getElementById('bthCss')) return;
        var s = document.createElement('style');
        s.id = 'bthCss';
        s.textContent = '.bth-toolbar{display:flex;gap:6px;justify-content:flex-end;margin:0 0 6px;}'
            + '.bth-table tr.bth-g td{background:#f1f5f9;font-weight:700;}'
            + '.bth-table td.bth-gname{cursor:pointer;user-select:none;}'
            + '.bth-table .bth-chev{width:14px;color:#475569;}'
            + '.bth-table td.bth-iname{padding-left:30px;}'
            + '.bth-table .bth-lbl{display:inline-flex;align-items:flex-start;gap:6px;margin:0;font-weight:600;cursor:pointer;}'
            + '.bth-table .bth-lbl input{margin-top:3px;}'
            + '.bth-table .bth-basis{font-weight:400;color:#64748b;font-size:11.5px;}'
            + '.bth-table .bth-cnt{font-weight:400;color:#64748b;font-size:12px;}'
            + '.bth-table tr.bth-off td{color:#64748b;}'
            + '.bth-table tr.bth-total td{background:#f1f5f9;font-weight:700;}'
            + '.bth-table .bth-kdel{white-space:nowrap;}'
            + '.bth-table tr.bth-hide,.bth-table tr.bth-del{display:none !important;}';
        (document.head || document.documentElement).appendChild(s);
    }
    css();

    g.BTNN_TH = {
        GROUPS: GROUPS, ITEMS: ITEMS, LEGACY: LEGACY, KHAC: KHAC,
        codeOf: codeOf, codeOfAny: codeOfAny, item: item, group: group, groupOf: groupOf, name: name, nameOf: nameOf, setName: setName, isKhac: isKhac, newKhacCode: newKhacCode,
        codes: codes, find: find, ord: ord,
        fmt: fmt, parse: parse, esc: esc,
        normOne: normOne, normList: normList, normClaim: normClaim,
        rowsHtml: rowsHtml, tableHtml: tableHtml, toolbar: toolbar, refresh: refresh, setOpen: setOpen,
        toggleGroup: toggleGroup, toggleAll: toggleAll, onTick: onTick, recalcFrom: recalcFrom,
        markErr: markErr, validateRows: validateRows, addKhac: addKhac, delKhac: delKhac, khacName: khacName, validateKhac: validateKhac, khacValue: khacValue
    };
})(window);
