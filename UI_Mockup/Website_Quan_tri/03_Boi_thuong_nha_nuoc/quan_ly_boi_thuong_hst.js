/*
 * Nhập hồ sơ tồn (prefix hst) - Giải quyết yêu cầu bồi thường. Chốt với BA 19/11/2026 (bản xem trước xem_truoc_nhap_ho_so_ton.html).
 * 1. Nút "Nhập hồ sơ tồn" trên lưới (cạnh "Tạo yêu cầu"): mở form Nhập liệu hồ sơ vụ việc ở chế độ hồ sơ tồn
 *    - Khối "Trạng thái hiện tại của hồ sơ" (sau Loại yêu cầu): Trạng thái Giải quyết YCBT / Bước đã thực hiện trước đó /
 *      Hình thức tạo hồ sơ (chỉ PHDD) / Trạng thái Phục hồi danh dự + Bước phục hồi danh dự hiện tại; Ngày tiếp nhận, Mã hồ sơ DVC.
 *    - Nguồn hồ sơ chọn được (nguồn gốc thật của hồ sơ giấy), Hình thức tiếp nhận đủ giá trị.
 *    - Cuối form: tab "Chi tiết giải quyết bồi thường" / "Phục hồi danh dự" gồm các khối của bước đã làm xong trên giấy (nhãn "Hồ sơ tồn").
 *      Văn bản đã ban hành trên giấy: Số, Ngày, Người ký không bắt buộc (19/11 tối), Đơn vị ban hành với QĐ GQBT; tệp đã ký ở dòng 1 bảng Tài liệu đính kèm (bắt buộc); không nhãn Ký ngoài.
 *      Thông báo tổ chức thực hiện phục hồi danh dự: Số, Ngày, Người ký không bắt buộc. Mọi bảng Tài liệu đính kèm có dòng 1 ghi sẵn tên, nhãn Bắt buộc
 *      (trừ Chứng từ chi trả của hồ sơ Chờ chi trả). Không nhập Thành phần tham gia.
 *    - Xác minh, Thương lượng nhập đủ (theo từng thiệt hại) khi trạng thái Thương lượng, Chờ ban hành QĐ, Hoãn, Tạm đình chỉ;
 *      Chờ chi trả, Hoàn thành, Đình chỉ, Dừng: chỉ thông tin chung và tài liệu.
 *    - Lưu hồ sơ tồn: không trình, không ký duyệt; hồ sơ vào thẳng trạng thái đã chọn, bước tiếp theo xử lý như hồ sơ thường.
 * 2. Lưới: dòng phụ "Hồ sơ tồn" dưới Mã hồ sơ; ô lọc "Hồ sơ tồn" (sửa trực tiếp quan_ly_boi_thuong.html).
 * 3. Xem chi tiết: dải thông tin Hồ sơ tồn đầu tab Chi tiết giải quyết bồi thường (19/11 tối: bỏ nhãn trên tiêu đề khối).
 * 4. Dữ liệu mẫu (prefix HST_, Mã hồ sơ BT-2025-901..905) dựng bằng sxmBuild (seedxm).
 */
var HST_VERSION = '20261119hst1';
(function () {
    'use strict';
    var H = window.HST = {};
    var on = false, hook = null;
    function el(id) { return document.getElementById(id); }
    function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

    // ------------------------------------------------------------------ Danh mục trạng thái
    var STEPS = ['Thụ lý', 'Cử người giải quyết', 'Xác minh thiệt hại', 'Thương lượng', 'Quyết định GQBT', 'Chi trả'];
    // done: số bước đã làm xong trên giấy (nhập tại form); prev: chọn "Bước đã thực hiện trước đó"; doc: văn bản kết thúc / tạm dừng
    var ST = [
        { v: 'CN', t: 'Cử người giải quyết bồi thường', done: 1 },
        { v: 'XM', t: 'Xác minh thiệt hại', done: 2 },
        { v: 'TL', t: 'Thương lượng', done: 3 },
        { v: 'QD', t: 'Chờ ban hành QĐ', done: 4 },
        { v: 'CT', t: 'Chờ chi trả', done: 5 },
        { v: 'HT', t: 'Hoàn thành', done: 6 },
        { v: 'HO', t: 'Hoãn giải quyết', prev: true, doc: 'Quyết định hoãn giải quyết bồi thường (Mẫu 22/BTNN)' },
        { v: 'TD', t: 'Tạm đình chỉ', prev: true, doc: 'Quyết định tạm đình chỉ giải quyết yêu cầu bồi thường' },
        { v: 'DC', t: 'Đình chỉ giải quyết', prev: true, doc: 'Quyết định đình chỉ giải quyết yêu cầu bồi thường (Mẫu 25/BTNN)' },
        { v: 'DG', t: 'Dừng giải quyết', prev: true, doc: 'Thông báo dừng giải quyết yêu cầu bồi thường (Mẫu 05/BTNN)' },
        { v: 'KT', t: 'Không thụ lý', done: 0, doc: 'Thông báo không thụ lý hồ sơ (Mẫu 04/BTNN)' },
        { v: 'CQ', t: 'Đã chuyển CQGQBT', done: 0, doc: 'Văn bản chuyển hồ sơ đến cơ quan giải quyết bồi thường', cq: true }
    ];
    var PH_STEPS = ['Thông báo', 'Ý kiến phản hồi của người yêu cầu', 'Thực hiện', 'Hoàn thành'];
    var PH_CHON = [
        { v: 'CN', t: 'Cử người phục hồi danh dự', cdpd: true },
        { v: 'DG', t: 'Đang phục hồi danh dự' },
        { v: 'HO', t: 'Hoãn phục hồi danh dự' },
        { v: 'TU', t: 'Từ chối phục hồi danh dự' },
        { v: 'HT', t: 'Hoàn thành' }
    ];
    var PHS = [
        { v: 'CN', done: 0 }, { v: 'TB', done: 0 }, { v: 'PH', done: 1 }, { v: 'TC', done: 2 },
        { v: 'HO', done: 2, yk: 2 }, { v: 'TU', done: 2, yk: 3 }, { v: 'HT', done: 3 }
    ];
    var YK = ['Đồng ý thực hiện phục hồi danh dự (Khoản 2 Điều 57)', 'Không đồng ý, đề xuất điều chỉnh (Khoản 3 Điều 57)', 'Đề nghị chưa thực hiện (Khoản 4 Điều 57)', 'Từ chối quyền được phục hồi danh dự (Khoản 5 Điều 57)'];
    var TT_TL = ['Người yêu cầu bồi thường từ chối thương lượng', 'Người yêu cầu bồi thường hai lần từ chối nhận giấy mời tham gia thương lượng', 'Người yêu cầu bồi thường hai lần không đến địa điểm thương lượng khi đã nhận giấy mời mà không có lý do chính đáng', 'Đồng ý thương lượng'];
    var TL_TEN = ['Văn bản từ chối thương lượng của người yêu cầu bồi thường', 'Biên bản giao giấy mời có xác nhận của bưu tá/chính quyền địa phương', 'Biên bản xác nhận vắng mặt 02 lần'];
    // Trạng thái vụ việc sau khi lưu
    var ST_CASE = { CN: 'Cử người giải quyết bồi thường', XM: 'Xác minh thiệt hại', TL: 'Thương lượng', QD: 'Chờ ban hành QĐ', CT: 'Chờ chi trả', HT: 'Hoàn thành', HO: 'Hoãn giải quyết', TD: 'Tạm đình chỉ', DC: 'Đình chỉ giải quyết', DG: 'Dừng giải quyết', KT: 'Không thụ lý', CQ: 'Đã chuyển CQGQBT' };
    var PH_CASE = { CN: 'Cử người phục hồi danh dự', DG: 'Đang phục hồi danh dự', HO: 'Hoãn phục hồi danh dự', TU: 'Từ chối phục hồi danh dự', HT: 'Hoàn thành' };
    // Khối chi tiết (accHead_*) tương ứng bước đã nhập
    var ACC_OF_DONE = ['thuly', 'thuly', 'xacminh', 'thuongluong', 'quyetdinh', 'thucthi'];

    // ------------------------------------------------------------------ CSS (chỉ áp trong vùng hồ sơ tồn)
    function css() {
        if (el('hstCss')) return;
        var s = document.createElement('style');
        s.id = 'hstCss';
        s.textContent = [
            '.hst-top{background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:8px;padding:14px 16px;margin-bottom:20px}',
            '.hst-top .hst-h{font-size:13px;font-weight:700;color:#1e3a8a;text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:8px}',
            '.hst-note{font-size:12px;color:#64748b;margin-top:4px}',
            '.hst-wrap .hst-grid,.hst-top .hst-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px 16px}',
            '.hst-wrap .hst-grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 16px}',
            '.hst-grid>div,.hst-grid2>div{display:flex;flex-direction:column;position:relative}',
            '.hst-grid>div>*,.hst-grid2>div>*{order:2}',
            '.hst-grid>div>.form-label,.hst-grid2>div>.form-label{order:0;margin-top:auto}',
            '.hst-grid>div>.hst-note,.hst-grid2>div>.hst-note{order:1;margin:-2px 0 6px}',
            '.hst-grid>div>.hst-err{order:3;position:absolute;top:100%;left:0}',
            '.hst-grid>div.hst-ph{display:block}',
            '.hst-full{grid-column:1/-1}',
            '.hst-err{display:none;color:#dc2626;font-size:12px;margin-top:4px}',
            '.hst-req{color:#ef4444;margin-left:2px}',
            '.hst-wrap{margin-top:8px}',
            '.hst-tabs{display:flex;gap:4px;border-bottom:1px solid #e2e8f0;margin:6px 0 14px}',
            '.hst-tab{padding:10px 16px;cursor:pointer;color:#64748b;font-weight:600;border-bottom:2px solid transparent;font-size:13.5px}',
            '.hst-tab.on{color:#1e3a8a;border-color:#1e3a8a}',
            '.hst-blk{border:1px solid #e2e8f0;border-radius:8px;margin-bottom:12px;background:#fff}',
            '.hst-blk-h{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;border-radius:8px 8px 0 0;font-weight:600;color:#1e293b;font-size:13.5px}',
            '.hst-blk-b{padding:14px}',
            '.hst-paper{display:inline-flex;align-items:center;gap:5px;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:4px;padding:2px 8px;font-size:11px;font-weight:600;white-space:nowrap}',
            '.hst-kn{border:1px dashed #cbd5e1;border-radius:6px;padding:12px;margin-top:8px;background:#fcfcfd}',
            '.hst-kn-h{font-size:12.5px;font-weight:600;color:#334155;margin-bottom:10px;display:flex;gap:8px;align-items:center}',
            '.hst-kn-tag{background:#fef3c7;color:#b45309;border-radius:4px;padding:1px 6px;font-size:10.5px}',
            '.hst-ph{background:repeating-linear-gradient(45deg,#f8fafc,#f8fafc 8px,#f1f5f9 8px,#f1f5f9 16px);border:1px solid #e2e8f0;border-radius:6px;padding:12px;color:#475569;font-size:12.5px}',
            '.hst-stepper{display:flex;margin:6px 0 10px;flex-wrap:wrap}',
            '.hst-st{flex:1;min-width:110px;text-align:center;font-size:11.5px;color:#94a3b8;position:relative;padding-top:26px}',
            '.hst-st::before{content:attr(data-n);position:absolute;top:0;left:50%;transform:translateX(-50%);width:22px;height:22px;border-radius:50%;background:#e2e8f0;color:#64748b;font-weight:700;line-height:22px;font-size:11px}',
            '.hst-st.done{color:#475569}.hst-st.done::before{background:#64748b;color:#fff;content:"\\2713"}',
            '.hst-st.cur{color:#1e3a8a;font-weight:700}.hst-st.cur::before{background:#1e3a8a;color:#fff}',
            '.hst-alert{border-radius:6px;padding:10px 12px;font-size:13px;margin-bottom:12px;display:flex;gap:8px;line-height:1.5}',
            '.hst-alert.i{background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a}.hst-alert.w{background:#fffbeb;border:1px solid #fde68a;color:#92400e}.hst-alert.o{background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}',
            '.hst-radios{display:flex;flex-direction:column;gap:7px;font-size:13px}',
            '.hst-radios label,.hst-checks label{display:flex;gap:8px;align-items:flex-start;cursor:pointer}',
            '.hst-checks{display:flex;flex-wrap:wrap;gap:8px 24px;font-size:13px}',
            '.hst-sub-g{font-size:13px;font-weight:600;color:#166534;margin:16px 0 8px}',
            '.hst-wrap table{width:100%;border-collapse:collapse;font-size:13px}',
            '.hst-wrap th{background:#f8fafc;text-align:left;padding:9px 10px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;white-space:nowrap}',
            '.hst-wrap td{padding:8px 10px;border-bottom:1px solid #e2e8f0;vertical-align:middle}',
            '.hst-tl-wrap{border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#fff}',
            '.hst-tl{border:1px solid #e2e8f0;border-radius:6px;border-collapse:separate!important;border-spacing:0;overflow:hidden;margin-bottom:10px}',
            '.hst-tl th{text-align:center!important}.hst-tl th:nth-child(2){text-align:left!important}',
            '.hst-tl td:first-child,.hst-tl td:nth-child(3),.hst-tl td:nth-child(4){text-align:center}',
            '.hst-btn-tai{background:#1e3a8a;color:#fff;border:none;border-radius:4px;padding:7px 14px;font-weight:600;font-size:12px;cursor:pointer}',
            '.hst-ic{width:32px;height:32px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #e2e8f0;background:#fff;margin:0 2px;cursor:pointer}',
            '.hst-ic.eye{color:#cbd5e1}.hst-ic.del{color:#dc2626;background:#fef2f2;border-color:#fecaca}',
            '.hst-bb{background:#fee2e2;color:#b91c1c;font-size:10.5px;font-weight:600;border-radius:10px;padding:1px 7px;margin-left:6px}',
            '.hst-kq td:first-child,.hst-kq th:first-child{min-width:320px}',
            '.hst-kq tr.grp td{background:#f8fafc;font-weight:600}.hst-kq td.num{text-align:right;white-space:nowrap}.hst-kq tr.tong td{font-weight:700;border-top:2px solid #cbd5e1}',
            '.hst-badge{display:inline-block;white-space:nowrap;background:#e5e7eb;color:#374151;border-radius:4px;padding:2px 6px;font-size:10.5px;font-weight:600;margin-top:4px}',
            '.hst-acc-tag{margin-left:auto;margin-right:10px;display:inline-flex;align-items:center;gap:5px;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:4px;padding:2px 8px;font-size:11px;font-weight:600}',
            '.hst-det-note{background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #64748b;border-radius:6px;padding:10px 14px;margin:0 0 14px;font-size:13px;color:#334155;display:flex;gap:8px;align-items:flex-start}',
            '@media(max-width:1100px){.hst-wrap .hst-grid,.hst-top .hst-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ------------------------------------------------------------------ Thành phần dùng chung
    var R = '<span class="hst-req">*</span>';
    function fld(nhan, ctl, bb, note) { return '<div><label class="form-label">' + nhan + (bb ? R : '') + '</label>' + (note ? '<div class="hst-note">' + note + '</div>' : '') + ctl + '</div>'; }
    function inp(ph, v, extra) { return '<input class="form-control" placeholder="' + (ph || '') + '"' + (v != null ? ' value="' + v + '"' : '') + (extra || '') + '>'; }
    function date() { return inp('dd/mm/yyyy'); }
    function ta(ph) { return '<textarea class="form-control" rows="2" placeholder="' + ph + '"></textarea>'; }
    function blk(no, title, body) {
        return '<div class="hst-blk"><div class="hst-blk-h"><span>' + no + '. ' + title + '</span></div><div class="hst-blk-b">' + body + '</div></div>';
    }
    // Bảng Tài liệu đính kèm dùng chung: rows [{ten, co_dinh}], o.bb bắt buộc, o.goiY câu gợi ý
    function tlDong(r, i) {
        var ten = r.co_dinh ? '<div style="display:flex;align-items:center">' + r.ten + '<span class="hst-bb">Bắt buộc</span></div>'
            : '<input class="form-control" placeholder="Nhập tên tài liệu, văn bản" value="' + (r.ten || '') + '">';
        return '<tr><td>' + (i + 1) + '</td><td>' + ten + '</td><td><button type="button" class="hst-btn-tai"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button></td>'
            + '<td style="white-space:nowrap"><span class="hst-ic eye" title="Xem file"><i class="fa-solid fa-eye"></i></span>' + (r.co_dinh ? '' : '<span class="hst-ic del" title="Xóa" onclick="HST.tlXoa(this)"><i class="fa-solid fa-trash"></i></span>') + '</td></tr>';
    }
    function tlBang(rows, o) {
        o = o || {};
        return '<div class="hst-tl-wrap"><label class="form-label" style="display:flex;align-items:center;gap:6px"><i class="fa-solid fa-paperclip"></i> ' + (o.nhan || 'Tài liệu đính kèm') + (o.bb ? R : '') + '</label>'
            + '<div style="overflow-x:auto"><table class="hst-tl"><thead><tr><th style="width:56px">STT</th><th>Tên tài liệu, văn bản</th><th style="width:170px">File đính kèm</th><th style="width:100px">Thao tác</th></tr></thead><tbody>'
            + (rows && rows.length ? rows : [{}]).map(tlDong).join('') + '</tbody></table></div>'
            + '<button type="button" class="btn btn-secondary btn-sm" onclick="HST.tlThem(this)"><i class="fa-solid fa-plus"></i> Thêm tài liệu</button>'
            + '<div class="hst-note"><i class="fa-solid fa-circle-info"></i> Chấp nhận tệp .pdf, .doc, .docx, .jpg, .jpeg, .png (tối đa 50MB/tệp)' + (o.goiY ? '; ' + o.goiY : '') + '.</div></div>';
    }
    function tlCoDinh(tens, goiY) {
        return tlBang(tens.map(function (t) { return { ten: t, co_dinh: true }; }).concat([{}]), { bb: true, goiY: goiY || (tens.length > 1 ? 'các dòng ' + tens.join(', ') + ': mỗi dòng 01 tệp .pdf' : 'dòng ' + tens[0] + ': 01 tệp .pdf') });
    }
    H.tlThem = function (btn) { var tb = btn.closest('.hst-tl-wrap').querySelector('tbody'); tb.insertAdjacentHTML('beforeend', tlDong({}, tb.rows.length)); };
    H.tlXoa = function (x) { var tb = x.closest('tbody'); x.closest('tr').remove(); Array.prototype.forEach.call(tb.rows, function (r, i) { r.cells[0].textContent = i + 1; }); };
    // Văn bản đã ban hành trên giấy: Số, Ngày, Người ký (không bắt buộc), Đơn vị ban hành (QĐ GQBT), tệp đã ký ở dòng 1 bảng Tài liệu đính kèm
    function kn(title, o) {
        o = o || {};
        var ten = title.replace(/ \(Mẫu [^)]*\)$/, '');
        var rq = ''; // hồ sơ tồn: Số, Ngày, Người ký không bắt buộc, tệp văn bản đã ký bắt buộc
        var unit = o.unit ? '<div><label class="form-label">Đơn vị ban hành' + R + '</label><select class="form-control"><option>' + esc(H.unitName()) + '</option></select></div>' : '<div></div>';
        return '<div class="hst-kn"><div class="hst-kn-h"><i class="fa-solid fa-file-signature"></i> ' + title + '</div><div class="hst-grid">'
            + '<div><label class="form-label">Số văn bản' + rq + '</label>' + inp('Nhập số, ký hiệu văn bản') + '</div>'
            + '<div><label class="form-label">Ngày văn bản' + rq + '</label>' + date() + '</div>'
            + '<div><label class="form-label">Người ký' + rq + '</label>' + inp('Nhập họ tên, chức vụ người ký') + '</div>' + unit
            + '<div class="hst-full">' + tlCoDinh([ten].concat(o.them || [])) + '</div></div></div>';
    }
    H.unitName = function () { try { return (typeof cdpdLoginRootName === 'function' && cdpdLoginRootName()) || 'Sở Tư pháp Thành phố Hà Nội'; } catch (e) { return 'Sở Tư pháp Thành phố Hà Nội'; } };

    // ------------------------------------------------------------------ Khối Xác minh, Thương lượng
    var gon = false; // hồ sơ Chờ chi trả / đã kết thúc: nhập gọn
    function grpRow(ten, dem, de, xm, mo, cot) { return '<tr class="grp"><td><i class="fa-solid fa-chevron-' + (mo ? 'down' : 'right') + '" style="font-size:10px;margin-right:6px"></i>' + ten + ' <span style="color:#64748b;font-weight:400">(' + dem + ')</span></td><td class="num">' + de + '</td><td class="num">' + xm + '</td>' + new Array(cot - 2).join('<td></td>') + '</tr>'; }
    var NHOM = [['I. Thiệt hại do tài sản bị xâm phạm (Điều 23)', '0/8'], ['II. Thiệt hại do thu nhập thực tế bị mất hoặc bị giảm sút (Điều 24)', '1/4'], ['III. Thiệt hại về vật chất do người bị thiệt hại chết (Điều 25)', '0/5'], ['IV. Thiệt hại về vật chất do sức khỏe bị xâm phạm (Điều 26)', '0/5'], ['V. Thiệt hại về tinh thần (Điều 27)', '0/10'], ['VI. Các chi phí khác được bồi thường (Điều 28)', '0/4'], ['VII. Các thiệt hại khác', '0 dòng']];
    function xmKhoi() {
        var tl = '<div style="margin-top:12px">' + tlCoDinh(['Báo cáo xác minh thiệt hại']) + '</div>';
        if (gon) return '<div class="hst-note" style="margin:0 0 4px">Hồ sơ đã ban hành Quyết định giải quyết bồi thường hoặc đã kết thúc: không nhập chi tiết theo từng thiệt hại.</div>' + tl;
        var coPh = H.loai() !== 'money';
        var ct = '<tr><td colspan="5" style="background:#fbfdff"><div class="hst-grid" style="padding:4px 0 4px 34px">' + fld('Ngày tiến hành', date(), true) + fld('Địa điểm', inp('Nhập địa điểm...'), true) + fld('Cách thức xác minh', inp('Nhập cách thức...'), true) + fld('Cách tính', inp('Nhập cách tính...'), true) + '</div></td></tr>';
        var it = function (ten, de, chon) {
            return '<tr><td style="padding-left:34px"><label style="display:flex;gap:8px"><input type="checkbox"' + (chon ? ' checked' : '') + '> ' + ten + '</label></td><td class="num">' + de + '</td>'
                + '<td>' + (chon ? inp('', '150.000.000', ' style="text-align:right;min-width:130px"') : '') + '</td><td>' + (chon ? inp('Nhập nội dung diễn giải...', null, ' style="min-width:160px"') : '') + '</td>'
                + '<td>' + (chon ? '<button type="button" class="btn btn-secondary btn-sm"><i class="fa-solid fa-chevron-up"></i> Chi tiết</button>' : '') + '</td></tr>' + (chon ? ct : '');
        };
        var rows = NHOM.map(function (g, i) {
            if (i !== 1) return grpRow(g[0], g[1], '0 đ', '0 đ', false, 5);
            return grpRow(g[0], g[1], '160.000.000 đ', '150.000.000 đ', true, 5)
                + it('1. Thu nhập ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân', '160.000.000 đ', true)
                + it('2. Thu nhập không ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân', '-', false);
        }).join('');
        return '<div class="hst-sub-g" style="margin-top:0">Tổng số tiền theo từng hạng mục</div>'
            + '<div class="hst-note" style="margin:-4px 0 8px">Danh sách thiệt hại lấy theo Thiệt hại yêu cầu bồi thường của hồ sơ. Tích mục, nhập Mức xác minh, Nội dung diễn giải và Chi tiết quá trình xác minh từng mục như khối Xác minh thiệt hại thực tế; kết quả dùng cho bước Thương lượng, Quyết định giải quyết bồi thường trên hệ thống.</div>'
            + '<div style="overflow-x:auto"><table class="hst-kq"><thead><tr><th>Thiệt hại yêu cầu bồi thường</th><th style="text-align:right">Mức đề xuất (đ)</th><th>Mức xác minh (đ)' + R + '</th><th>Nội dung diễn giải</th><th>Chi tiết</th></tr></thead><tbody>'
            + rows + '<tr><td colspan="5" style="padding-left:34px"><button type="button" class="btn btn-secondary btn-sm"><i class="fa-solid fa-plus"></i> Thêm thiệt hại khác</button></td></tr>'
            + '<tr class="tong"><td style="text-align:right">TỔNG CỘNG:</td><td class="num">160.000.000 đ</td><td class="num">150.000.000 đ</td><td></td><td></td></tr></tbody></table></div>'
            + '<div style="margin-top:12px"><label style="display:flex;gap:8px;font-size:13px"><input type="checkbox"' + (coPh ? ' checked disabled' : '') + '> Yêu cầu phục hồi danh dự</label></div>'
            + '<div class="hst-radios" style="margin-top:8px"><label><input type="checkbox" onchange="this.closest(\'.hst-blk-b\').querySelector(\'.hstXmKd\').style.display=this.checked?\'\':\'none\'"> Thỏa thuận việc kéo dài thời gian xác minh</label></div>'
            + '<div class="hst-grid hstXmKd" style="display:none;margin:8px 0 0 24px">' + fld('Từ ngày', date(), true) + fld('Đến ngày', date()) + '</div>'
            + '<div class="hst-grid" style="margin-top:12px"><div class="hst-full"><label class="form-label">Các nội dung khác liên quan đến quá trình xác minh thiệt hại</label>' + ta('Nhập các nội dung khác liên quan đến quá trình xác minh thiệt hại (nếu có)...') + '</div></div>' + tl;
    }
    function tlKhoi() {
        return '<label class="form-label">Tình trạng tham gia thương lượng' + R + '</label><div class="hst-radios">'
            + TT_TL.map(function (t, i) { return '<label><input type="radio" name="hstTtl" value="' + i + '"' + (i === 3 ? ' checked' : '') + ' onchange="HST.tlDoi()"> ' + (i + 1) + '. ' + t + '</label>'; }).join('')
            + '</div><div id="hstTlNd" style="margin-top:12px"></div>';
    }
    H.tlDoi = function () {
        var r = document.querySelector('input[name=hstTtl]:checked'); if (!r) return;
        var v = +r.value, coPh = H.loai() !== 'money';
        var phdd = '<div style="margin-top:12px"><label style="display:flex;gap:8px;font-size:13px"><input type="checkbox"' + (coPh ? ' checked disabled' : '') + '> Yêu cầu phục hồi danh dự</label></div>';
        if (v < 3) { el('hstTlNd').innerHTML = '<div class="hst-grid"><div class="hst-full"><label class="form-label">Lý do / Diễn giải chi tiết</label>' + ta('Nhập lý do, diễn giải chi tiết (nếu có)...') + '</div></div><div style="margin-top:12px">' + tlCoDinh([TL_TEN[v]]) + '</div>' + phdd; return; }
        var it = function (ten, de, xm, chon) {
            return '<tr><td style="padding-left:34px"><label style="display:flex;gap:8px"><input type="checkbox"' + (chon ? ' checked' : '') + '> ' + ten + '</label></td><td class="num">' + de + '</td><td class="num">' + xm + '</td>'
                + '<td>' + (chon ? inp('', xm.replace(' đ', ''), ' style="text-align:right;min-width:120px"') : '') + '</td>'
                + '<td>' + (chon ? '<select class="form-control" style="min-width:150px"><option>-- Chọn --</option><option selected>Thành công</option><option>Không thành công</option><option>Không tiếp tục thương lượng</option></select>' : '') + '</td>'
                + '<td>' + (chon ? '<textarea class="form-control" rows="1" placeholder="Nhập lý do diễn giải..." style="min-width:150px"></textarea>' : '') + '</td></tr>';
        };
        var bang = gon ? '' : '<div class="hst-sub-g">Kết quả thương lượng theo từng thiệt hại yêu cầu bồi thường</div>'
            + '<div class="hst-note" style="margin:-4px 0 8px">Danh sách thiệt hại lấy theo kết quả Xác minh thiệt hại. Trạng thái thương lượng bắt buộc trên từng dòng được tích; chỉ mục Thành công nhập Mức tiền bồi thường và được tính vào tổng; Lý do diễn giải bắt buộc khi Không thành công hoặc Không tiếp tục thương lượng.</div>'
            + '<div style="overflow-x:auto"><table class="hst-kq"><thead><tr><th>Thiệt hại yêu cầu bồi thường</th><th style="text-align:right">Mức đề xuất</th><th style="text-align:right">Mức xác minh</th><th>Mức tiền bồi thường' + R + '</th><th>Trạng thái thương lượng' + R + '</th><th>Lý do diễn giải</th></tr></thead><tbody>'
            + NHOM.map(function (g, i) {
                if (i !== 1) return grpRow(g[0], g[1], '0 đ', '0 đ', false, 6);
                return grpRow(g[0], g[1], '160.000.000 đ', '150.000.000 đ', true, 6) + it('1. Thu nhập ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân', '160.000.000 đ', '150.000.000 đ', true) + it('2. Thu nhập không ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân', '-', '-', false);
            }).join('')
            + '<tr class="tong"><td style="text-align:right">TỔNG CỘNG:</td><td class="num">160.000.000 đ</td><td class="num">150.000.000 đ</td><td class="num">150.000.000 đ</td><td></td><td></td></tr></tbody></table></div>';
        el('hstTlNd').innerHTML = '<div class="hst-grid2">' + fld('Ngày thương lượng', date(), true) + fld('Địa điểm thương lượng', inp('Nhập địa điểm thương lượng...'), true) + '</div>'
            + bang + phdd
            + '<div class="hst-sub-g">Phương thức chi trả tiền bồi thường</div><div class="hst-grid">'
            + fld('Phương thức chi trả tiền bồi thường', '<select class="form-control" id="hstTlPt" onchange="HST.tlPtDoi()"><option>Nhận tiền mặt</option><option>Nhận qua chuyển khoản</option></select>', true)
            + fld('Họ và tên người nhận tiền', inp('Nhập họ và tên người nhận tiền'), true) + fld('Số giấy tờ thân nhân người nhận', inp('Nhập số giấy tờ thân nhân'), true) + '<div></div>'
            + '<div class="hst-full"><label class="form-label">Địa chỉ chi tiết người nhận' + R + '</label>' + inp('Nhập địa chỉ chi tiết người nhận') + '</div>'
            + '<div class="hstCk" style="display:none"><label class="form-label">Chủ tài khoản' + R + '</label>' + inp('Nhập tên chủ tài khoản...') + '</div>'
            + '<div class="hstCk" style="display:none"><label class="form-label">Số tài khoản' + R + '</label>' + inp('Nhập số tài khoản...') + '</div>'
            + '<div class="hstCk" style="display:none"><label class="form-label">Tên ngân hàng' + R + '</label>' + inp('Nhập tên ngân hàng...') + '</div>'
            + '<div class="hstCk" style="display:none"><label class="form-label">Chi nhánh ngân hàng</label>' + inp('Nhập chi nhánh ngân hàng (nếu có)...') + '</div></div>'
            + '<div class="hst-sub-g">Thông tin thỏa thuận khác</div>'
            + '<div class="hst-radios"><label><input type="checkbox" onchange="el_(\'hstTlKd\',this.checked)"> Thỏa thuận kéo dài thương lượng</label></div>'
            + '<div class="hst-grid" id="hstTlKd" style="display:none;margin:8px 0 0 24px">' + fld('Từ ngày', date(), true) + fld('Đến ngày', date()) + '</div>'
            + '<div class="hst-radios" style="margin-top:8px"><label><input type="checkbox" onchange="el_(\'hstTlHl\',this.checked)"> Thỏa thuận hiệu lực sớm hơn của Quyết định giải quyết bồi thường</label></div>'
            + '<div id="hstTlHl" style="display:none;margin:8px 0 0 24px">' + ta('Nhập nội dung thỏa thuận hiệu lực sớm hơn của Quyết định giải quyết bồi thường...') + '</div>'
            + '<div class="hst-grid" style="margin-top:12px"><div class="hst-full"><label class="form-label">Khôi phục quyền, lợi ích hợp pháp khác (nếu có)</label>' + ta('Nhập nội dung khôi phục quyền, lợi ích hợp pháp khác (nếu có)...') + '</div>'
            + '<div class="hst-full"><label class="form-label">Các nội dung khác</label>' + ta('Nhập các nội dung khác (nếu có)...') + '</div></div>'
            + '<div style="margin-top:12px">' + tlCoDinh(['Biên bản kết quả thương lượng việc giải quyết bồi thường']) + '</div>';
    };
    window.el_ = function (id, show) { var x = el(id); if (x) x.style.display = show ? '' : 'none'; };
    H.tlPtDoi = function () { var ck = el('hstTlPt').value === 'Nhận qua chuyển khoản'; document.querySelectorAll('#hstTlNd .hstCk').forEach(function (e) { e.style.display = ck ? '' : 'none'; }); };
    H.tuVe = function () { var co = el('hstTuCo').value === '1'; document.querySelectorAll('.hstTu1').forEach(function (e) { e.style.display = co ? '' : 'none'; }); };

    // ------------------------------------------------------------------ Nhánh Phục hồi danh dự
    function phMa() { return el('hstPh').value === 'DG' ? el('hstPhB').value : el('hstPh').value; }
    function phBlocks(loai, cd, nx) {
        var ma = phMa(), p = PHS.filter(function (x) { return x.v === ma; })[0] || PHS[2];
        var shown = p.v === 'HT' ? 4 : p.done;
        el('hstStepperPh').innerHTML = PH_STEPS.map(function (t, i) { return '<div class="hst-st ' + (i < shown ? 'done' : (i === p.done && p.yk == null && p.v !== 'CN' ? 'cur' : '')) + '" data-n="' + (i + 1) + '">' + t + '</div>'; }).join('');
        var nt = { CN: 'Hồ sơ cán bộ chủ động đã được phê duyệt, chờ Lãnh đạo phân công trên hệ thống.', TB: 'Thông báo tổ chức thực hiện phục hồi danh dự lập và trình ký trên hệ thống như hồ sơ thường.', PH: 'Thông báo đã ban hành trên giấy; tiếp nhận ý kiến phản hồi trên hệ thống.', TC: 'Người bị thiệt hại đã đồng ý; ghi nhận kết quả tổ chức thực hiện trên hệ thống.', HO: 'Khi lưu, hệ thống ghi 01 lần hoãn. Cán bộ «Tiếp tục thực hiện phục hồi danh dự» trên hệ thống khi có căn cứ.', TU: 'Nhánh Phục hồi danh dự kết thúc ở «Từ chối phục hồi danh dự».', HT: 'Đã tổ chức thực hiện xong; nhánh Phục hồi danh dự «Hoàn thành».' }[p.v];
        el('hstPhNote').innerHTML = '<div class="hst-alert i"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>' + nt + ' Người bị thiệt hại «Đã chết» thì không có bước Ý kiến phản hồi.</div></div>';
        var h = '';
        if (loai === 'honor') {
            var canBo = p.v === 'CN' ? '' : '<div class="hst-grid" style="margin-top:12px"><div><label class="form-label">Cán bộ phục hồi danh dự' + R + '</label><div class="hst-note">Tài khoản trên hệ thống, nhận hồ sơ để xử lý tiếp.</div><select class="form-control"><option>' + esc(H.me()) + '</option></select></div></div>';
            h += cd ? blk(nx(), 'Phê duyệt chủ động phục hồi danh dự', kn('Văn bản phê duyệt chủ động phục hồi danh dự') + canBo)
                : blk(nx(), 'Tiếp nhận hồ sơ - Thụ lý', '<div class="hst-grid">' + fld('Ngày thụ lý', date(), true) + '</div>' + kn('Thông báo thụ lý hồ sơ (Mẫu 04/BTNN)') + canBo);
        }
        if (p.done >= 1) h += blk(nx(), 'Thông báo tổ chức phục hồi danh dự', '<div class="hst-grid">'
            + '<div class="hst-full"><label class="form-label">Cơ quan thực hiện việc phục hồi danh dự' + R + '</label>' + inp('Nhập tên cơ quan thực hiện việc phục hồi danh dự') + '</div>'
            + '<div class="hst-full"><label class="form-label">Hình thức phục hồi danh dự (Điều 56)' + R + '</label><div class="hst-checks"><label><input type="checkbox" checked> Trực tiếp xin lỗi và cải chính công khai tại nơi cư trú / trụ sở (Điều 58)</label><label><input type="checkbox"> Đăng báo xin lỗi và cải chính công khai (Điều 59)</label></div></div>'
            + '<div class="hst-full"><label class="form-label">Nội dung tổ chức thực hiện phục hồi danh dự</label>' + ta('Dự kiến thời gian, địa điểm... theo văn bản đã ban hành') + '</div></div>'
            + kn('Thông báo tổ chức thực hiện phục hồi danh dự'));
        if (p.done >= 2) {
            var sel = p.yk != null ? p.yk : 0;
            h += blk(nx(), 'Ý kiến phản hồi của người yêu cầu', '<div class="hst-grid">'
                + '<div class="hst-full"><label class="form-label">Ý kiến của người bị thiệt hại' + R + '</label><div class="hst-radios">' + YK.map(function (t, i) { return '<label><input type="radio" name="hstYk"' + (i === sel ? ' checked' : '') + '> ' + t + '</label>'; }).join('') + '</div></div>'
                + fld('Ngày nhận được ý kiến phản hồi', date(), true) + fld('Hình thức gửi phản hồi', '<select class="form-control"><option>Bằng văn bản</option><option>Trực tiếp tại trụ sở</option><option>Khác</option></select>', true) + '<div></div><div></div>'
                + (p.v === 'HO' ? '<div class="hst-full"><label class="form-label">Lý do đề nghị chưa thực hiện' + R + '</label>' + ta('Ghi rõ lý do đề nghị chưa thực hiện phục hồi danh dự...') + '</div>' : '')
                + '<div class="hst-full"><label class="form-label">Nội dung ý kiến chi tiết / Yêu cầu điều chỉnh</label>' + ta('') + '</div>'
                + '<div class="hst-full">' + tlCoDinh(['Văn bản ý kiến phản hồi của người bị thiệt hại']) + '</div></div>');
        }
        if (p.done >= 3) h += blk(nx(), 'Tổ chức thực hiện phục hồi danh dự', '<div class="hst-grid">'
            + fld('Cơ quan tổ chức', inp('Nhập tên cơ quan tổ chức'), true) + fld('Ngày tổ chức thực tế', date(), true)
            + '<div style="grid-column:span 2"><label class="form-label">Địa điểm tổ chức' + R + '</label>' + inp('Nhập địa điểm tổ chức') + '</div>'
            + '<div class="hst-full"><label class="form-label">Thông tin đăng báo xin lỗi, cải chính (Điều 59)</label>' + ta('Tên báo, số báo, ngày đăng (khi Hình thức phục hồi danh dự có Đăng báo xin lỗi và cải chính công khai)') + '</div>'
            + '<div class="hst-full">' + tlCoDinh(['Biên bản tổ chức thực hiện phục hồi danh dự']) + '</div></div>');
        return h;
    }

    // ------------------------------------------------------------------ Dựng giao diện trên form Nhập liệu hồ sơ vụ việc
    H.loai = function () { var r = document.querySelector('input[name="claimRequestType"]:checked'); return r ? r.value : 'both'; };
    H.me = function () { try { return getCurrentSimulatedOfficer() || 'Nguyễn Văn Chuyên Viên'; } catch (e) { return 'Nguyễn Văn Chuyên Viên'; } };
    function ensureUi() {
        css();
        var panel = el('inlineClaimFormPanel'); if (!panel || el('hstTop')) return;
        var body = panel.querySelector('.inline-form-body');
        // Khối trạng thái: ngay sau khối Loại yêu cầu (khối nền xanh chứa radio claimRequestType)
        var rt = document.querySelector('input[name="claimRequestType"]');
        var initBox = rt ? rt.closest('.form-group').parentNode.parentNode : null;
        var top = document.createElement('div');
        top.id = 'hstTop'; top.className = 'hst-top'; top.style.display = 'none';
        top.innerHTML = '<div class="hst-h"><i class="fa-solid fa-flag"></i> Trạng thái hiện tại của hồ sơ</div>'
            + '<div class="hst-alert i" style="margin-bottom:14px"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>Nhập hồ sơ đã giải quyết trên giấy. Chỉ nhập các bước đã làm xong; bước hiện tại và các bước sau xử lý trên hệ thống như hồ sơ thường. Hồ sơ tồn không trình, không ký duyệt; khi lưu, hồ sơ vào thẳng trạng thái đã chọn.</div></div>'
            + '<div class="hst-grid">'
            + '<div id="hstWSt"><label class="form-label">Trạng thái Giải quyết YCBT hiện tại' + R + '</label><select class="form-control" id="hstSt" onchange="HST.render()"></select><div class="hst-err" id="hstStErr">Đây là trường bắt buộc</div></div>'
            + '<div id="hstWPrev" style="display:none"><label class="form-label">Bước đã thực hiện trước đó' + R + '</label><select class="form-control" id="hstPrev" onchange="HST.render()">' + STEPS.slice(0, 4).map(function (s, i) { return '<option value="' + (i + 1) + '"' + (i === 2 ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div>'
            + '<div id="hstWHt" style="display:none"><label class="form-label">Hình thức tạo hồ sơ' + R + '</label><select class="form-control" id="hstHt" onchange="HST.render()"><option value="YC">Người yêu cầu nộp hồ sơ</option><option value="CD">Cán bộ chủ động phục hồi danh dự</option></select></div>'
            + '<div id="hstWPh" style="display:none"><label class="form-label"><span id="hstPhNhan">Trạng thái Phục hồi danh dự hiện tại</span>' + R + '</label><select class="form-control" id="hstPh" onchange="HST.render()"></select></div>'
            + '<div id="hstWPhB" style="display:none"><label class="form-label">Bước phục hồi danh dự hiện tại' + R + '</label><select class="form-control" id="hstPhB" onchange="HST.render()"><option value="TB">Bước 1: Thông báo</option><option value="PH" selected>Bước 2: Ý kiến phản hồi của người yêu cầu</option><option value="TC">Bước 3: Thực hiện</option></select></div>'
            + '<div><label class="form-label">Ngày tiếp nhận' + R + '</label><input class="form-control" id="hstNgayTn" placeholder="dd/mm/yyyy"><div class="hst-err" id="hstNgayTnErr">Đây là trường bắt buộc</div></div>'
            + '<div><label class="form-label">Nơi thụ lý' + R + '</label><select class="form-control" id="hstNoiThuLy"><option value="">-- Chọn nơi thụ lý --</option><option>Thụ lý tại CQGQBT</option><option>Thụ lý tại Tòa án</option></select><div class="hst-err" id="hstNoiThuLyErr">Đây là trường bắt buộc</div></div>'
            + '<div><label class="form-label">Mã hồ sơ DVC</label><input class="form-control" id="hstDvc" placeholder="Nhập mã hồ sơ DVC (nếu có)"></div>'
            + '</div>';
        if (initBox && initBox.parentNode === body) body.insertBefore(top, initBox.nextSibling); else body.insertBefore(top, body.firstChild);
        // Nguồn hồ sơ: chọn được
        var ng = el('claimNguonHoSo');
        if (ng && !el('hstNguon')) {
            var s = document.createElement('select');
            s.id = 'hstNguon'; s.className = 'form-control'; s.style.display = 'none';
            s.innerHTML = ['Tiếp nhận mới', 'Dịch vụ công', 'Chuyển CQGQBT', 'Xác định CQGQBT'].map(function (v) { return '<option>' + v + '</option>'; }).join('');
            ng.parentNode.insertBefore(s, ng.nextSibling);
            var note = document.createElement('div'); note.id = 'hstNguonNote'; note.className = 'hst-note'; note.style.display = 'none'; note.textContent = 'Nguồn gốc thật của hồ sơ giấy.';
            s.parentNode.appendChild(note);
        }
        // Các bước đã làm: cuối form
        var w = document.createElement('div');
        w.id = 'hstSteps'; w.className = 'hst-wrap'; w.style.display = 'none';
        w.innerHTML = '<div class="hst-h" style="font-size:13px;font-weight:700;color:#1e3a8a;text-transform:uppercase;margin:8px 0 4px;display:flex;align-items:center;gap:8px"><i class="fa-solid fa-box-archive"></i> Các bước đã giải quyết trên hồ sơ giấy</div>'
            + '<div class="hst-tabs"><div class="hst-tab on" id="hstTab1" onclick="HST.tab(1)">Chi tiết giải quyết bồi thường</div><div class="hst-tab" id="hstTab2" onclick="HST.tab(2)">Phục hồi danh dự</div></div>'
            + '<div id="hstFBt"><div class="hst-stepper" id="hstStepper"></div><div id="hstStNote"></div><div id="hstBlocks"></div></div>'
            + '<div id="hstFPh" style="display:none"><div class="hst-stepper" id="hstStepperPh"></div><div id="hstPhNote"></div><div id="hstPhBlocks"></div></div>';
        body.appendChild(w);
        // Nút cuối form
        var foot = panel.querySelector('.inline-form-footer');
        if (foot && !el('hstFormButtons')) {
            var b = document.createElement('div');
            b.id = 'hstFormButtons'; b.style.cssText = 'display:none; gap:10px; width:100%; justify-content:flex-end;';
            b.innerHTML = '<button class="btn btn-secondary" onclick="closeInlineClaimForm()">Hủy bỏ</button><button class="btn btn-primary" id="hstBtnSave" onclick="HST.save()"><i class="fa-solid fa-floppy-disk"></i> Lưu hồ sơ tồn</button>';
            foot.appendChild(b);
        }
        el('hstSt').innerHTML = '<option value="">-- Chọn trạng thái --</option>' + ST.map(function (s) { return '<option value="' + s.v + '">' + s.t + '</option>'; }).join('');
        document.getElementsByName('claimRequestType').forEach(function (r) { r.addEventListener('change', function () { if (on) H.render(); }); });
        if (window.flatpickr) try { flatpickr(el('hstNgayTn'), { dateFormat: 'd/m/Y', allowInput: true, maxDate: 'today' }); } catch (e) { }
    }
    H.tab = function (i) {
        H._tab = i;
        [1, 2].forEach(function (k) { el('hstTab' + k).classList.toggle('on', k === i); });
        el('hstFBt').style.display = i === 1 ? '' : 'none';
        el('hstFPh').style.display = i === 2 ? '' : 'none';
    };
    H.render = function () {
        if (!on) return;
        var loai = H.loai(), sv = el('hstSt').value, s = ST.filter(function (x) { return x.v === sv; })[0];
        var bt = loai !== 'honor', ph = loai !== 'money';
        el('hstWSt').style.display = bt ? '' : 'none';
        el('hstWPh').style.display = ph ? '' : 'none';
        el('hstWHt').style.display = loai === 'honor' ? '' : 'none';
        el('hstWPrev').style.display = bt && s && s.prev ? '' : 'none';
        el('hstTab1').style.display = bt ? '' : 'none';
        el('hstTab2').style.display = ph ? '' : 'none';
        H.tab(!ph ? 1 : !bt ? 2 : (H._tab || 1));
        el('hstPhNhan').textContent = loai === 'honor' ? 'Trạng thái Giải quyết YCBT hiện tại' : 'Trạng thái Phục hồi danh dự hiện tại';
        var cd = loai === 'honor' && el('hstHt').value === 'CD';
        var cur = el('hstPh').value;
        el('hstPh').innerHTML = PH_CHON.filter(function (x) { return !x.cdpd || cd; }).map(function (x) { return '<option value="' + x.v + '">' + x.t + '</option>'; }).join('');
        el('hstPh').value = PH_CHON.some(function (x) { return x.v === cur && (!x.cdpd || cd); }) ? cur : 'DG';
        el('hstWPhB').style.display = ph && el('hstPh').value === 'DG' ? '' : 'none';
        var done = !bt || !s ? 0 : (s.prev ? +el('hstPrev').value : s.done);
        gon = !!(bt && s && ['HT', 'CT', 'DC', 'DG'].indexOf(s.v) >= 0);
        el('hstStepper').innerHTML = bt ? STEPS.map(function (t, i) { return '<div class="hst-st ' + (i < done ? 'done' : (i === done && s && !s.prev && !s.doc && done < 6 ? 'cur' : '')) + '" data-n="' + (i + 1) + '">' + t + '</div>'; }).join('') : '';
        var note = '';
        if (bt && !s) note = '<div class="hst-alert i"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>Chọn Trạng thái Giải quyết YCBT hiện tại để hiển thị các bước cần nhập.</div></div>';
        else if (bt) {
            if (s.v === 'HT') note = '<div class="hst-alert w"><i class="fa-solid fa-triangle-exclamation" style="margin-top:3px"></i><div>Hồ sơ <b>Hoàn thành</b>: Quyết định và Chi trả chỉ ghi nhận tại hồ sơ, <b>không tạo bản ghi</b> tại Quyết định giải quyết bồi thường và Kinh phí. Số tiền, ngày hoàn tất chi trả dùng làm căn cứ lập hồ sơ hoàn trả.</div></div>';
            else if (s.v === 'CT') note = '<div class="hst-alert o"><i class="fa-solid fa-circle-check" style="margin-top:3px"></i><div>Hồ sơ <b>Chờ chi trả</b>: khi lưu, hệ thống tạo bản ghi Quyết định giải quyết bồi thường «Có hiệu lực» và bản ghi Chi trả tiền bồi thường tại <b>Kinh phí</b>. Cán bộ tiếp tục theo dõi chi trả tại Kinh phí như bản ghi thường.</div></div>';
            else if (s.doc) note = '<div class="hst-alert i"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>Trạng thái <b>' + s.t + '</b>: nhập các bước đã làm' + (s.prev ? ' trước đó' : '') + ' và văn bản «' + s.doc.replace(/ \(Mẫu [^)]*\)$/, '') + '».</div></div>';
            else note = '<div class="hst-alert i"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>Nhập ' + done + ' bước đã làm. Bước «' + STEPS[done] + '» và các bước sau xử lý tiếp trên hệ thống như hồ sơ thường.</div></div>';
        }
        el('hstStNote').innerHTML = note;
        var h = '', n = 0;
        if (bt && s) {
            if (done >= 1) h += blk(++n, 'Tiếp nhận hồ sơ bồi thường - Thụ lý', '<div class="hst-grid">' + fld('Ngày thụ lý', date(), true) + '</div>' + kn('Thông báo thụ lý hồ sơ (Mẫu 04/BTNN)'));
            if (done >= 2) h += blk(++n, 'Tiếp nhận hồ sơ bồi thường - Cử người giải quyết bồi thường', kn('Quyết định cử người giải quyết bồi thường (Mẫu 06/BTNN)')
                + '<div style="margin-top:12px"><label class="form-label">Cán bộ được cử giải quyết' + R + '</label><table><thead><tr><th style="width:60px">STT</th><th>Cán bộ</th><th style="width:200px">Vai trò</th></tr></thead><tbody><tr><td>1</td><td><select class="form-control"><option>' + esc(H.me()) + '</option></select></td><td><select class="form-control"><option>Chủ trì</option><option>Phối hợp</option></select></td></tr></tbody></table>'
                + '<button type="button" class="btn btn-secondary btn-sm" style="margin-top:8px"><i class="fa-solid fa-plus"></i> Thêm cán bộ</button><div class="hst-note">Tài khoản cán bộ trên hệ thống thuộc Cơ quan giải quyết bồi thường; cán bộ Chủ trì nhận hồ sơ để xử lý tiếp.</div></div>');
            if (done >= 1 && done <= 4 && ['KT', 'CQ'].indexOf(s.v) < 0) h += blk(++n, 'Tạm ứng kinh phí bồi thường (nếu có)', '<div class="hst-grid">'
                + fld('Đã tạm ứng kinh phí', '<select class="form-control" id="hstTuCo" onchange="HST.tuVe()"><option value="0">Chưa tạm ứng</option><option value="1">Đã tạm ứng</option></select>', true)
                + '<div class="hstTu1"><label class="form-label">Số tiền đã tạm ứng thực tế (VNĐ)' + R + '</label>' + inp('0', null, ' style="text-align:right"') + '</div>'
                + '<div class="hstTu1"><label class="form-label">Ngày chi tạm ứng' + R + '</label>' + date() + '</div><div></div></div>'
                + '<div class="hstTu1">' + kn('Quyết định tạm ứng kinh phí bồi thường', { them: ['Chứng từ chi tạm ứng kinh phí bồi thường'] })
                + '<div class="hst-alert i" style="margin:12px 0 0"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>Khi lưu, hệ thống tạo bản ghi <b>Tạm ứng kinh phí bồi thường</b> «Hoàn thành» tại Kinh phí. Khi ban hành Quyết định giải quyết bồi thường trên hệ thống, số đã tạm ứng được trừ như vụ việc thường.</div></div></div>');
            if (done >= 3) h += blk(++n, 'Xác minh thiệt hại thực tế', xmKhoi());
            if (done >= 4) h += blk(++n, 'Thương lượng giải quyết bồi thường', tlKhoi());
            if (done >= 5) h += blk(++n, 'Quyết định giải quyết bồi thường', '<div class="hst-grid">' + fld('Tổng số tiền bồi thường (VNĐ)', '<input class="form-control" id="hstQdTong" value="250.000.000" style="text-align:right" oninput="HST.ctTinh()">', true) + fld('Ngày có hiệu lực', date(), true) + '</div>' + kn('Quyết định giải quyết bồi thường (Mẫu 18/BTNN)', { unit: true }));
            if (done >= 6) h += blk(++n, 'Chi trả tiền bồi thường', '<div class="hst-grid">' + fld('Số tiền đã tạm ứng (VNĐ)', inp('0', null, ' style="text-align:right"')) + fld('Số tiền đã chi trả (VNĐ)', inp('0', null, ' style="text-align:right"'), true) + fld('Ngày hoàn tất chi trả', date(), true) + '<div></div>'
                + '<div class="hst-full">' + tlCoDinh(['Chứng từ chi trả tiền bồi thường']) + '</div></div>');
            if (s.v === 'CT') h += blk(++n, 'Chi trả tiền bồi thường - tình hình đến thời điểm nhập', '<div class="hst-grid">'
                + fld('Thông báo chi trả tiền bồi thường', '<select class="form-control" id="hstCtTb" onchange="HST.ctTinh()"><option value="0">Chưa ban hành</option><option value="1">Đã ban hành</option></select>', true)
                + fld('Số tiền đã tạm ứng (VNĐ)', '<input class="form-control" id="hstCtTu" value="50.000.000" oninput="HST.ctTinh()" style="text-align:right">')
                + fld('Số tiền đã chi trả (VNĐ)', '<input class="form-control" id="hstCtDc" value="100.000.000" oninput="HST.ctTinh()" style="text-align:right">')
                + fld('Số tiền còn phải chi trả (VNĐ)', '<input class="form-control" id="hstCtCl" readonly style="text-align:right;font-weight:600">', false, '= Tổng số tiền bồi thường - đã tạm ứng - đã chi trả.')
                + '</div><div id="hstCtKn"></div><div style="margin-top:12px">' + tlBang([{ ten: 'Chứng từ chi trả tiền bồi thường' }]) + '</div>'
                + '<div class="hst-alert i" style="margin:12px 0 0"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div id="hstCtNote"></div></div>');
            if (s.doc) h += blk(++n, s.t, (s.cq ? '<div class="hst-grid" style="margin-bottom:8px"><div class="hst-full"><label class="form-label">Cơ quan nhận hồ sơ' + R + '</label>' + inp('Nhập tên cơ quan giải quyết bồi thường nhận hồ sơ') + '</div></div>' : '') + kn(s.doc));
        }
        el('hstBlocks').innerHTML = h;
        var m = 0;
        el('hstPhBlocks').innerHTML = ph ? phBlocks(loai, cd, function () { return ++m; }) : '';
        if (!ph) { el('hstStepperPh').innerHTML = ''; el('hstPhNote').innerHTML = ''; }
        if (el('hstTuCo')) H.tuVe();
        if (el('hstTlNd')) H.tlDoi();
        if (el('hstCtTb')) H.ctTinh();
    };
    var so = function (v) { return +String(v || '').replace(/\D/g, '') || 0; };
    var tien = function (n) { return n.toLocaleString('vi-VN'); };
    H.ctTinh = function () {
        if (!el('hstCtTb')) return;
        var tong = el('hstQdTong') ? so(el('hstQdTong').value) : 0, con = Math.max(0, tong - so(el('hstCtTu').value) - so(el('hstCtDc').value));
        el('hstCtCl').value = tien(con);
        var da = el('hstCtTb').value === '1';
        el('hstCtKn').innerHTML = da ? kn('Thông báo chi trả tiền bồi thường (Mẫu 32/BTNN)') : '';
        el('hstCtNote').innerHTML = 'Khi lưu, hệ thống tạo bản ghi <b>Chi trả tiền bồi thường</b> tại Kinh phí, trạng thái <b>' + (da ? 'Chờ chi trả' : 'Chờ thông báo chi trả') + '</b>, Số tiền còn phải chi trả <b>' + tien(con) + '</b> đ. Số tiền đã tạm ứng, đã chi trả ghi vào lịch sử chi trả của bản ghi với nhãn «Hồ sơ tồn». Phần còn lại cán bộ tiếp tục ' + (da ? 'Cập nhật chi trả' : 'Trình thông báo chi trả, Cập nhật chi trả') + ' hoặc Trả lại ngân sách nhà nước tại Kinh phí.';
    };

    // ------------------------------------------------------------------ Bật / tắt chế độ hồ sơ tồn trên form
    function setMode(v) {
        ensureUi();
        on = !!v;
        var show = function (id, s, d) { var x = el(id); if (x) x.style.display = s ? (d || '') : 'none'; };
        show('hstTop', on); show('hstSteps', on); show('hstFormButtons', on, 'flex');
        if (on) {
            ['defaultFormButtons', 'rejectFlowButtonsContainer', 'bosungFlowButtonsContainer', 'cdpdFormButtons', 'cdpdModeBlock'].forEach(function (id) { show(id, false); });
            var t = document.querySelector('#inlineClaimFormPanel .inline-form-title');
            if (t) t.innerHTML = '<i class="fa-solid fa-box-archive"></i> NHẬP HỒ SƠ TỒN';
            show('claimNguonHoSo', false); show('hstNguon', true); show('hstNguonNote', true, 'block');
            var ht = el('claimHinhThucTiepNhan');
            if (ht && !Array.prototype.some.call(ht.options, function (o) { return o.value === 'Dịch vụ công'; })) { var o = document.createElement('option'); o.value = 'Dịch vụ công'; o.textContent = 'Dịch vụ công'; o.dataset.hst = '1'; ht.appendChild(o); }
            if (ht && !ht.value) ht.value = 'Trực tiếp'; // mặc định Trực tiếp
            el('hstSt').value = ''; el('hstNgayTn').value = ''; el('hstDvc').value = ''; el('hstNoiThuLy').value = ''; H._tab = 1;
            ['hstStErr', 'hstNgayTnErr', 'hstNoiThuLyErr'].forEach(function (id) { show(id, false); }); ['hstSt', 'hstNgayTn', 'hstNoiThuLy'].forEach(function (id) { el(id).classList.remove('is-invalid'); });
            H.render();
        } else {
            show('claimNguonHoSo', true); show('hstNguon', false); show('hstNguonNote', false);
            var ht2 = el('claimHinhThucTiepNhan');
            if (ht2) Array.prototype.slice.call(ht2.options).forEach(function (o) { if (o.dataset.hst) o.remove(); });
        }
    }
    H.isOn = function () { return on; };
    // Mở form Nhập hồ sơ tồn: form Nhập liệu hồ sơ vụ việc (Thêm mới), bỏ chế độ Cán bộ chủ động phục hồi danh dự
    H.open = function () {
        openInlineClaimForm(null);
        try { if (typeof cdpdApplyMode === 'function') cdpdApplyMode(false, true); } catch (e) { }
        // Loại yêu cầu mặc định Yêu cầu cả hai (cho phép chọn đủ 03 giá trị)
        document.getElementsByName('claimRequestType').forEach(function (r) { r.disabled = false; r.checked = r.value === 'money'; var lb = r.closest('label'); if (lb) lb.style.opacity = ''; });
        if (typeof handleRequestTypeChange === 'function') handleRequestTypeChange('money');
        setMode(true);
        var p = el('inlineClaimFormPanel'); if (p && p.scrollIntoView) p.scrollIntoView({ block: 'start' });
    };
    // Kiểm tra ô bắt buộc của các khối bước đã nhập (cả 02 tab): ô có nhãn dấu * đang hiển thị mà để trống -> báo [MSG-ERR-VAL-001] dưới ô
    function anTrongKhoi(x) {
        for (var n = x; n && n.id !== 'hstSteps'; n = n.parentNode) {
            if (n.id === 'hstFBt' || n.id === 'hstFPh') continue;
            if (n.style && n.style.display === 'none') return true;
        }
        return false;
    }
    function kiemKhoi() {
        var first = null;
        document.querySelectorAll('#hstSteps .hst-loi').forEach(function (e) { e.remove(); });
        document.querySelectorAll('#hstSteps .is-invalid').forEach(function (e) { e.classList.remove('is-invalid'); });
        document.querySelectorAll('#hstBlocks label.form-label, #hstPhBlocks label.form-label').forEach(function (lb) {
            if (!lb.querySelector('.hst-req') || lb.closest('.hst-tl-wrap') || anTrongKhoi(lb)) return;
            var c = lb.parentNode.querySelector('input.form-control, select.form-control, textarea.form-control');
            if (!c || anTrongKhoi(c) || String(c.value || '').trim()) return;
            c.classList.add('is-invalid');
            var e = document.createElement('div'); e.className = 'hst-loi'; e.style.cssText = 'color:#dc2626;font-size:12px;margin-top:4px';
            e.textContent = 'Đây là trường bắt buộc';
            c.insertAdjacentElement('afterend', e);
            first = first || c;
        });
        return first;
    }
    // Lưu hồ sơ tồn: kiểm tra riêng -> kiểm tra & lưu chung của form (saveNewClaim) -> gán trạng thái đã chọn
    H.save = function () {
        var loai = H.loai(), first = null;
        var bad = loai !== 'honor' && !el('hstSt').value;
        el('hstStErr').style.display = bad ? 'block' : 'none'; el('hstSt').classList.toggle('is-invalid', bad);
        if (bad) first = el('hstSt');
        var badD = !el('hstNgayTn').value.trim();
        el('hstNgayTnErr').style.display = badD ? 'block' : 'none'; el('hstNgayTn').classList.toggle('is-invalid', badD);
        if (badD) first = first || el('hstNgayTn');
        var badN = !el('hstNoiThuLy').value;
        el('hstNoiThuLyErr').style.display = badN ? 'block' : 'none'; el('hstNoiThuLy').classList.toggle('is-invalid', badN);
        if (badN) first = first || el('hstNoiThuLy');
        var loiKhoi = kiemKhoi();
        if (!first && loiKhoi) { H.tab(loiKhoi.closest('#hstFPh') ? 2 : 1); first = loiKhoi; }
        if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); first.focus(); return; }
        hook = {
            loai: loai, st: el('hstSt').value, prev: +el('hstPrev').value, ph: el('hstPh').value, phB: el('hstPhB').value, ht: el('hstHt').value,
            ngay: el('hstNgayTn').value.trim(), noiThuLy: el('hstNoiThuLy').value, dvc: el('hstDvc').value.trim(), nguon: el('hstNguon').value, httn: el('claimHinhThucTiepNhan').value
        };
        try { saveNewClaim(); } finally { /* hook còn: form không qua kiểm tra chung */ if (hook && !hook.used) hook = null; }
    };
    function afterSave(id) {
        var h = hook; hook = null; if (!h) return false;
        h.used = true;
        var c = typeof gqClaim === 'function' ? gqClaim(id) : null; if (!c) return false;
        var s = ST.filter(function (x) { return x.v === h.st; })[0];
        var status = h.loai === 'honor' ? PH_CASE[h.ph] : ST_CASE[h.st];
        var done = h.loai === 'honor' ? 0 : (s.prev ? h.prev : s.done);
        var buoc = [];
        for (var i = 0; i < Math.min(done, 6); i++) if (buoc.indexOf(ACC_OF_DONE[i]) < 0) buoc.push(ACC_OF_DONE[i]);
        if (h.loai !== 'honor' && done >= 1 && s.v !== 'KT' && s.v !== 'CQ') { /* Thụ lý đã nhập */ }
        var me = H.me(), today = typeof gqToday === 'function' ? gqToday() : '';
        var patch = {
            ton: true, hst: { st: h.st || '', ph: h.loai !== 'money' ? (h.ph === 'DG' ? h.phB : h.ph) : '', buoc: buoc, nhapLuc: today, nhapBoi: me, ver: HST_VERSION },
            status: status, date: h.ngay, noiThuLy: h.noiThuLy, nguonHoSo: h.nguon, hinhThucTiepNhan: h.httn, dvcCode: h.dvc || c.dvcCode || '',
            assignedOfficer: me, userCreated: true
        };
        if (s && s.prev) patch.hgqPrevStatus = ST_CASE[['', 'CN', 'XM', 'TL', 'QD'][h.prev]] || '';
        if (h.loai !== 'money') { patch.phddStarted = h.ph !== 'CN'; if (h.loai === 'honor' && h.ht === 'CD') { patch.cdpd = true; patch.hinhThucTiepNhan = 'Cán bộ chủ động phục hồi danh dự'; } }
        patch.timeline = [{ title: 'Nhập hồ sơ tồn', date: today, desc: 'Nhập hồ sơ đã giải quyết trên giấy (ngày tiếp nhận ' + h.ngay + '). Trạng thái hiện tại: [' + status + '].', status: 'completed', officer: me }];
        Object.assign(c, patch);
        try { if (typeof gqSaveData === 'function') gqSaveData(c, { ton: true, hst: patch.hst }); } catch (e) { }
        try { saveClaimsToLocal(); } catch (e) { }
        return c;
    }
    H.afterSave = afterSave;

    // ------------------------------------------------------------------ Chi tiết: nhãn "Hồ sơ tồn" trên khối đã nhập
    function tagDetail(id) {
        var c = typeof gqClaim === 'function' ? gqClaim(id) : null;
        document.querySelectorAll('.hst-acc-tag').forEach(function (x) { x.remove(); });
        var old = el('hstDetNote'); if (old) old.remove();
        if (!c || !c.ton) return;
        css();
        [].forEach(function (k) { // 19/11 tối: bỏ nhãn trên tiêu đề khối
            var hd = el('accHead_' + k); if (!hd) return;
            var icon = hd.querySelector('.accordion-icon');
            var tag = document.createElement('span'); tag.className = 'hst-acc-tag'; tag.innerHTML = '<i class="fa-solid fa-box-archive"></i> Hồ sơ tồn';
            tag.title = 'Bước đã giải quyết trên hồ sơ giấy, nhập khi tạo hồ sơ tồn';
            hd.insertBefore(tag, icon || null);
        });
        var sec = el('caseDetailSection');
        var acc = el('accHead_thuly'); var host = acc ? acc.closest('.accordion-item') : null;
        if (sec && host && host.parentNode) {
            var n = document.createElement('div'); n.id = 'hstDetNote'; n.className = 'hst-det-note';
            n.innerHTML = '<i class="fa-solid fa-box-archive" style="margin-top:3px;color:#475569"></i><div><b>Hồ sơ tồn</b>: hồ sơ đã giải quyết trên giấy, nhập vào hệ thống ngày ' + esc(c.hst && c.hst.nhapLuc || '') + ' bởi ' + esc(c.hst && c.hst.nhapBoi || '') + '. Các bước đã làm trên giấy được nhập khi tạo hồ sơ; bước hiện tại và các bước sau xử lý như hồ sơ thường.</div>';
            host.parentNode.insertBefore(n, host);
        }
    }
    H.badge = function (item) { return item && item.ton ? '<br><span class="hst-badge" title="Hồ sơ đã giải quyết trên giấy, nhập vào hệ thống">Hồ sơ tồn</span>' : ''; };

    // ------------------------------------------------------------------ Dữ liệu mẫu hồ sơ tồn (dựng bằng sxmBuild của seedxm)
    function seeds() {
        if (typeof sxmBuild !== 'function') return [];
        var DOC = 'Văn bản yêu cầu bồi thường (hồ sơ giấy tiếp nhận năm 2025)';
        var HV = 'Ban hành quyết định thu hồi đất không đúng thẩm quyền, gây thiệt hại về tài sản và thu nhập.';
        var NQ = 'Quyết định hành chính trái pháp luật là nguyên nhân trực tiếp dẫn tới thiệt hại.';
        var TH = typeof SXM_TH_C !== 'undefined' ? SXM_TH_C : [];
        var L = [];
        // [buoc] khối đã nhập; [st] trạng thái đã chọn khi nhập; nguồn hồ sơ giữ nguồn gốc thật
        var add = function (c, st, buoc, extra) {
            delete c.sxmSeed; // không dời ngày theo dữ liệu mẫu seedxm: hồ sơ tồn giữ ngày tiếp nhận trên giấy
            Object.assign(c, { ton: true, hst:{ st: st, buoc: buoc, nhapLuc: '12/11/2026', nhapBoi: 'Nguyễn Văn Chuyên Viên', ver: HST_VERSION } }, extra || {});
            (c.timeline = c.timeline || []).unshift({ title: 'Nhập hồ sơ tồn', date: '12/11/2026', desc: 'Nhập hồ sơ đã giải quyết trên giấy. Trạng thái hiện tại: [' + c.status + '].', status: 'completed', officer: 'Nguyễn Văn Chuyên Viên' });
            L.push(c);
        };
        add(sxmBuild({ id: 'HST_XM', code: 'BT-2025-901', who: 'p5', stage: 'xac-minh', k: [420, 400], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: TH }), 'XM', ['thuly']);
        add(sxmBuild({ id: 'HST_TL', code: 'BT-2025-902', who: 'p6', stage: 'thuong-luong', k: [400, 380, 350], requestType: 'both', docBase: DOC, hanhVi: HV, nhanQua: NQ, th: TH }), 'TL', ['thuly', 'xacminh'], { nguonHoSo: 'Dịch vụ công', hinhThucTiepNhan: 'Dịch vụ công' });
        add(sxmBuild({ id: 'HST_CT', code: 'BT-2025-903', who: 'p7', stage: 'cho-thuc-thi', k: [380, 360, 330, 300, 280], bank: ['0451000903903', 'Vietcombank', 'Chi nhánh Hà Nội'], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: TH }), 'CT', ['thuly', 'xacminh', 'thuongluong', 'quyetdinh']);
        var ht = sxmBuild({ id: 'HST_HT', code: 'BT-2025-904', who: 'p8', stage: 'cho-thuc-thi', k: [500, 480, 450, 420, 400], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: TH });
        ht.status = 'Hoàn thành'; ht.slaText = 'Đã hoàn thành chi trả tiền bồi thường';
        add(ht, 'HT', ['thuly', 'xacminh', 'thuongluong', 'quyetdinh', 'thucthi']);
        return L;
    }
    if (typeof sxmClaims === 'function') {
        var origClaims = sxmClaims;
        sxmClaims = function () { var a = origClaims(); try { return a.concat(seeds()); } catch (e) { console.warn('hst seeds', e); return a; } };
    }

    // Ngày tiếp nhận trên giấy của dữ liệu mẫu (trang dời ngày dữ liệu mẫu khi khởi tạo -> đặt lại sau khởi tạo)
    var NGAY_MAU = { HST_XM: '12/03/2025', HST_TL: '05/02/2025', HST_CT: '18/11/2024', HST_HT: '20/08/2024' };
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            try {
                var doi = false;
                claimsList.forEach(function (c) { if (c && NGAY_MAU[c.id] && c.date !== NGAY_MAU[c.id]) { c.date = NGAY_MAU[c.id]; doi = true; } });
                if (doi) { saveClaimsToLocal(); renderClaimsTable(); }
            } catch (e) { }
        }, 0);
    });

    // ------------------------------------------------------------------ Gắn vào luồng của trang
    function wrap(name, fn) { var o = window[name]; if (typeof o === 'function') window[name] = fn(o); }
    wrap('openInlineClaimForm', function (o) { return function () { if (on) setMode(false); return o.apply(this, arguments); }; });
    wrap('closeInlineClaimForm', function (o) { return function () { var r = o.apply(this, arguments); if (on) setMode(false); return r; }; });
    // saveNewClaim kết thúc bằng openTndModal (hồ sơ có bồi thường) hoặc phddAfterHonorOnlySave (chỉ phục hồi danh dự)
    function done(id) {
        var c = afterSave(id); if (!c) return false;
        try { closeInlineClaimForm(); } catch (e) { }
        try { renderClaimsTable(); } catch (e) { }
        try { showToast('Đã lưu hồ sơ tồn ' + c.code + '. Trạng thái: ' + c.status + '.', 'success'); } catch (e) { }
        return true;
    }
    wrap('openTndModal', function (o) { return function (id) { if (hook && done(id)) return; return o.apply(this, arguments); }; });
    wrap('phddAfterHonorOnlySave', function (o) { return function (c) { if (hook && c && done(c.id)) return; return o.apply(this, arguments); }; });
    wrap('showCaseDetail', function (o) { return function (id) { var r = o.apply(this, arguments); try { tagDetail(id); } catch (e) { console.warn('hst', e); } return r; }; });
})();
