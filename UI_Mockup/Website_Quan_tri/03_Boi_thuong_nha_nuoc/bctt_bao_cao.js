/*
 * Báo cáo Công tác BTNN (mockup) - prefix bctt.
 * Bộ báo cáo gồm 04 biểu mẫu: Mẫu 41/BTNN, Mẫu 42/BTNN, Mẫu 43/BTNN (dự thảo Nghị định) và Mẫu số 04 (Thông tư 08/2019/TT-BTP) - Tình hình thực hiện trách nhiệm hoàn trả.
 * - Cán bộ Sở Tư pháp nhập liệu 04 tab, xem trước PDF, Gửi phê duyệt (trình 01 lần cả bộ) -> Lãnh đạo Phòng -> Lãnh đạo Sở (ký số).
 * - Lãnh đạo Ký duyệt / Từ chối đồng thời cả 04 biểu mẫu tại màn Ký duyệt (mỗi biểu mẫu 01 tab).
 * - Bộ Tư pháp xem tệp đã ban hành của 34 Sở Tư pháp, số liệu tổng hợp 04 biểu mẫu, xem chi tiết và điều chỉnh theo từng Sở.
 * Trang: bao_cao_cong_tac_btnn.html. Dữ liệu giả lập lưu localStorage.
 */
(function () {
    'use strict';
    var KEY = 'bctt_bao_cao_v1';
    var KEY_ROLE = 'bctt_role_v1';
    var SEED = 's10_tra_lai'; // đổi giá trị khi đổi dữ liệu mẫu: trình duyệt đang lưu bản cũ sẽ tự nạp lại
    var KIND = 'Báo cáo công tác BTNN';
    var DEMO_UNIT = 'STP-HN';
    var DEMO_SUB = 'STP-HN-HCTP';
    var BTP_UNIT = 'BTP-01'; // Báo cáo tổng hợp toàn quốc của Bộ Tư pháp (cùng form 04 biểu mẫu)

    var ST = { DANG: 'Đang nhập liệu', CHO: 'Chờ duyệt', TC: 'Bị từ chối', BH: 'Đã ban hành', TL: 'Bị trả lại' };
    var ST_CLS = {}; ST_CLS[ST.DANG] = 'badge-muted'; ST_CLS[ST.CHO] = 'badge-info'; ST_CLS[ST.TC] = 'badge-danger'; ST_CLS[ST.BH] = 'badge-success'; ST_CLS[ST.TL] = 'badge-warning';

    var PERIODS = {
        thuc_te: { label: 'Báo cáo năm số liệu thực tế (01/01 - 31/10)', from: '01/01', to: '31/10' },
        chinh_thuc: { label: 'Số liệu thống kê năm chính thức (01/01 - 31/12)', from: '01/01', to: '31/12' }
    };

    var FORMS = [
        { id: 'm41', code: 'Mẫu 41/BTNN', title: 'Danh mục vụ việc giải quyết yêu cầu bồi thường', file: 'Mau_41_BTNN_Danh_muc_vu_viec' },
        { id: 'm42', code: 'Mẫu 42/BTNN', title: 'Báo cáo công tác bồi thường nhà nước', file: 'Mau_42_BTNN_Bao_cao_cong_tac_BTNN' },
        { id: 'm43', code: 'Mẫu 43/BTNN', title: 'Tổng hợp tình hình yêu cầu bồi thường, giải quyết bồi thường và chi trả tiền bồi thường', file: 'Mau_43_BTNN_Tong_hop_tinh_hinh' },
        { id: 'm04', code: 'Mẫu số 04 (TT 08/2019)', title: 'Tình hình thực hiện trách nhiệm hoàn trả', file: 'Mau_04_TT08_Tinh_hinh_hoan_tra' }
    ];
    var FORM_CODES = FORMS.map(function (f) { return f.code; }).join(', ');
    var GROUPS = [
        { k: 'I', name: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH' },
        { k: 'II', name: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ' },
        { k: 'III', name: 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ' },
        { k: 'IV', name: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH' },
        { k: 'V', name: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ' },
        { k: 'VI', name: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ' }
    ];
    var M41_COLS = [
        { k: 'hoTen', label: 'Họ và tên của người yêu cầu bồi thường', no: 1 },
        { k: 'diaChi', label: 'Địa chỉ của người yêu cầu bồi thường', no: 2 },
        { k: 'coQuan', label: 'Cơ quan giải quyết bồi thường', no: 3 },
        { k: 'tinhHinh', label: 'Tình hình giải quyết bồi thường', no: 4 },
        { k: 'khoKhan', label: 'Khó khăn, vướng mắc', no: 5 },
        { k: 'ghiChu', label: 'Ghi chú', no: 6 }
    ];
    // Mẫu 42: mỗi mục trên mẫu là 01 ô nhập liệu
    var M42_SECTIONS = [
        { h: 'I. Kết quả công tác bồi thường năm {nam}', sub: [
            { h: '1. Tình hình yêu cầu bồi thường, kết quả giải quyết bồi thường', items: [
                { k: 'danhGiaTinhHinh', label: 'Đánh giá tình hình yêu cầu bồi thường, kết quả giải quyết bồi thường.' },
                { k: 'capPhatKinhPhi', label: 'Việc cấp phát kinh phí và chi trả tiền bồi thường.' },
                { k: 'xacDinhHoanTra', label: 'Việc xác định trách nhiệm hoàn trả của người thi hành công vụ gây thiệt hại.' },
                { k: 'xuLyKyLuat', label: 'Việc xử lý kỷ luật người thi hành công vụ gây thiệt hại.' }] },
            { h: '2. Kết quả thực hiện công tác bồi thường nhà nước', items: [
                { k: 'keHoach', label: 'Xây dựng và thực hiện Kế hoạch công tác bồi thường nhà nước năm {nam}' },
                { k: 'theChe', label: 'Công tác xây dựng, hoàn thiện thể chế về trách nhiệm bồi thường của Nhà nước (đối với Bộ, ngành Trung ương).' },
                { k: 'phoBien', label: 'Công tác phổ biến, giáo dục pháp luật về trách nhiệm bồi thường của Nhà nước.' },
                { k: 'quanLyChuyenNganh', label: 'Thực hiện quản lý chuyên ngành về bồi thường nhà nước trên các mặt công tác: hướng dẫn, bồi dưỡng kỹ năng, nghiệp vụ công tác bồi thường nhà nước; xác định cơ quan giải quyết bồi thường; hướng dẫn người bị thiệt hại thực hiện thủ tục yêu cầu bồi thường; theo dõi, đôn đốc, kiểm tra công tác bồi thường nhà nước; giải quyết khiếu nại, tố cáo, xử lý vi phạm trong công tác bồi thường nhà nước; kiến nghị cơ quan có thẩm quyền trong việc giải quyết bồi thường, thực hiện trách nhiệm hoàn trả theo quy định của pháp luật.' },
                { k: 'chiDaoGiaiQuyet', label: 'Chỉ đạo cơ quan giải quyết bồi thường thực hiện giải quyết bồi thường, xác định trách nhiệm hoàn trả, thực hiện quyết định hoàn trả và thực hiện xử lý kỷ luật người thi hành công vụ gây thiệt hại.' },
                { k: 'chiDaoXuLyViPham', label: 'Chỉ đạo xử lý vi phạm trong việc giải quyết bồi thường, thực hiện trách nhiệm hoàn trả.' },
                { k: 'phoiHop', label: 'Công tác phối hợp thực hiện công tác bồi thường nhà nước.' },
                { k: 'baoCaoThongKe', label: 'Công tác báo cáo, thống kê về công tác bồi thường nhà nước.' }] },
            { h: '3. Đánh giá chung về kết quả công tác bồi thường nhà nước', items: [
                { k: 'ketQuaDatDuoc', label: 'Đánh giá chung những kết quả đạt được' },
                { k: 'vuongMac', label: 'Những vướng mắc, bất cập và nguyên nhân' }] }
        ] },
        { h: 'II. Nhiệm vụ trọng tâm và giải pháp thực hiện công tác bồi thường nhà nước năm {namKeHoach}', items: [{ k: 'nhiemVuTrongTam', label: '' }] },
        { h: 'III. Đề xuất, kiến nghị', items: [{ k: 'deXuatKienNghi', label: '' }] }
    ];
    var M42_ITEMS = [];
    M42_SECTIONS.forEach(function (s) { (s.sub || [s]).forEach(function (b) { b.items.forEach(function (it) { it.sec = s.h; it.block = s.sub ? b.h : ''; M42_ITEMS.push(it); }); }); });

    // Mẫu 43: cột 2..27; công thức: 2 = 3..10; 11 = 12..15; 17 = 18..21; tiền: 16, 26, 27
    var M43_LABELS = {
        2: 'Tổng số', 3: 'Thụ lý mới - Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại', 4: 'Thụ lý mới - Tòa án - Theo điểm a khoản 1 Điều 52',
        5: 'Thụ lý mới - Tòa án - Theo điểm b khoản 1 và khoản 2 Điều 52', 6: 'Thụ lý mới - Yêu cầu bồi thường trong quá trình tố tụng hình sự, tố tụng hành chính',
        7: 'Kỳ trước chuyển sang - Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại', 8: 'Kỳ trước chuyển sang - Tòa án - Theo điểm a khoản 1 Điều 52',
        9: 'Kỳ trước chuyển sang - Tòa án - Theo điểm b khoản 1 và khoản 2 Điều 52', 10: 'Kỳ trước chuyển sang - Yêu cầu bồi thường trong quá trình tố tụng hình sự, tố tụng hành chính',
        11: 'Đã có văn bản GQBT có hiệu lực - Tổng số vụ việc', 12: 'Đã có văn bản GQBT - Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại',
        13: 'Đã có văn bản GQBT - Tòa án - Theo điểm a khoản 1 Điều 52', 14: 'Đã có văn bản GQBT - Tòa án - Theo điểm b khoản 1 và khoản 2 Điều 52',
        15: 'Đã có văn bản GQBT - Trong quá trình tố tụng hình sự, tố tụng hành chính', 16: 'Số tiền bồi thường (nghìn đồng)',
        17: 'Đang giải quyết - Tổng số', 18: 'Đang giải quyết - Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại', 19: 'Đang giải quyết - Tòa án - Theo điểm a khoản 1 Điều 52',
        20: 'Đang giải quyết - Tòa án - Theo điểm b khoản 1 và khoản 2 Điều 52', 21: 'Đang giải quyết - Trong quá trình tố tụng hình sự, tố tụng hành chính',
        22: 'Đình chỉ - Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại', 23: 'Đình chỉ - Tại Tòa án theo thủ tục tố tụng', 24: 'Đưa ra khỏi danh sách',
        25: 'Chi trả - Số vụ việc đã chi trả', 26: 'Chi trả - Số tiền đã chi trả theo quyết định có hiệu lực của cơ quan trực tiếp quản lý người thi hành công vụ (nghìn đồng)',
        27: 'Chi trả - Số tiền đã chi trả theo bản án, quyết định có hiệu lực của Tòa án (nghìn đồng)'
    };
    var M43_FORMULA = { 2: [3, 4, 5, 6, 7, 8, 9, 10], 11: [12, 13, 14, 15], 17: [18, 19, 20, 21] };
    var M43_MONEY = { 16: 1, 26: 1, 27: 1 };
    var M43_INPUT_COLS = []; for (var c0 = 2; c0 <= 27; c0++) { if (!M43_FORMULA[c0]) M43_INPUT_COLS.push(c0); }

    // Mẫu số 04 (TT 08/2019) - Tình hình thực hiện trách nhiệm hoàn trả: cột 2..15; công thức: 3 = 4 + 6; 12 = 13 + 14; tiền (nghìn đồng): 2, 5, 10, 12, 13, 14, 15
    var M04_LABELS = {
        2: 'Số tiền đã chi trả xong cho người yêu cầu bồi thường (nghìn đồng)', 3: 'Tổng số vụ việc xem xét trách nhiệm hoàn trả',
        4: 'Số vụ việc có Quyết định có hiệu lực pháp luật và đã thực hiện hoàn trả', 5: 'Số tiền phải hoàn trả (nghìn đồng)', 6: 'Đang xem xét trách nhiệm hoàn trả',
        7: 'Không xem xét - Người thi hành công vụ không có lỗi', 8: 'Không xem xét - Người thi hành công vụ chết trước khi ra quyết định hoàn trả',
        9: 'Số vụ việc được giảm mức hoàn trả', 10: 'Số tiền hoàn trả được giảm (nghìn đồng)', 11: 'Số vụ việc hoãn hoàn trả',
        12: 'Tổng số tiền đã hoàn trả (nghìn đồng)', 13: 'Số tiền đã hoàn trả trong kỳ báo cáo (nghìn đồng)', 14: 'Số tiền đã hoàn trả kỳ trước chuyển sang (nghìn đồng)',
        15: 'Số tiền còn phải hoàn trả (nghìn đồng)'
    };
    var M04_FORMULA = { 3: [4, 6], 12: [13, 14] };
    var M04_MONEY = { 2: 1, 5: 1, 10: 1, 12: 1, 13: 1, 14: 1, 15: 1 };
    var M04_INPUT_COLS = []; for (var c4 = 2; c4 <= 15; c4++) { if (!M04_FORMULA[c4]) M04_INPUT_COLS.push(c4); }

    var PROVINCES = ['Thành phố Hà Nội', 'Thành phố Huế', 'Tỉnh Lai Châu', 'Tỉnh Điện Biên', 'Tỉnh Sơn La', 'Tỉnh Lạng Sơn', 'Tỉnh Quảng Ninh', 'Tỉnh Thanh Hóa', 'Tỉnh Nghệ An', 'Tỉnh Hà Tĩnh',
        'Tỉnh Cao Bằng', 'Tỉnh Tuyên Quang', 'Tỉnh Lào Cai', 'Tỉnh Thái Nguyên', 'Tỉnh Phú Thọ', 'Tỉnh Bắc Ninh', 'Tỉnh Hưng Yên', 'Thành phố Hải Phòng', 'Tỉnh Ninh Bình', 'Tỉnh Quảng Trị',
        'Thành phố Đà Nẵng', 'Tỉnh Quảng Ngãi', 'Tỉnh Gia Lai', 'Tỉnh Khánh Hòa', 'Tỉnh Lâm Đồng', 'Tỉnh Đắk Lắk', 'Thành phố Hồ Chí Minh', 'Tỉnh Đồng Nai', 'Tỉnh Tây Ninh', 'Thành phố Cần Thơ',
        'Tỉnh Vĩnh Long', 'Tỉnh Đồng Tháp', 'Tỉnh Cà Mau', 'Tỉnh An Giang'];
    function stpName(p) { return 'Sở Tư pháp ' + p; }
    function diaDanh(p) { return p.replace(/^(Thành phố|Tỉnh)\s+/, ''); }

    var ROLES = {
        cb_stp: { label: 'Cán bộ Sở Tư pháp - Đỗ Văn Chung (Phòng Hành chính tư pháp)', userId: 'cv_hn1', name: 'Đỗ Văn Chung', title: 'Chuyên viên' },
        ld_phong: { label: 'Lãnh đạo Phòng - Vũ Thị Thanh (Trưởng phòng Hành chính tư pháp)', userId: 'tp_hctp_hn', name: 'Vũ Thị Thanh', title: 'Trưởng phòng' },
        ld_so: { label: 'Lãnh đạo Sở - Phạm Quang Huy (Giám đốc Sở Tư pháp Thành phố Hà Nội)', userId: 'gdso_hn', name: 'Phạm Quang Huy', title: 'Giám đốc Sở' },
        cb_btp: { label: 'Cán bộ Bộ Tư pháp - Nguyễn Văn Cán Bộ (Cục Đăng ký giao dịch bảo đảm và BTNN)', userId: 'canbonv', name: 'Nguyễn Văn Cán Bộ', title: 'Chuyên viên' },
        ld_cuc: { label: 'Lãnh đạo Cục - Nguyễn Văn Cục Trưởng (Cục trưởng Cục Đăng ký giao dịch bảo đảm và BTNN)', userId: 'cuctruong', name: 'Nguyễn Văn Cục Trưởng', title: 'Cục trưởng' },
        ld_bo: { label: 'Lãnh đạo Bộ - Đặng Hoàng Oanh (Lãnh đạo Bộ Tư pháp)', userId: 'oanhdh', name: 'Đặng Hoàng Oanh', title: 'Lãnh đạo Bộ' }
    };

    // ---------------- Tiện ích ----------------
    function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }
    function $(id) { return document.getElementById(id); }
    // Bắt click ủy quyền ở pha capture: admin-ui-standardizer.js gắn stopPropagation lên mọi nút trong ô cuối/cột "Thao tác",
    // nên handler ủy quyền gắn bằng .onclick (pha bubble) trên bảng không bao giờ nhận được click của nút (Sửa, Gửi phê duyệt, Xóa, Xem file...).
    function onClk(el, fn) {
        if (!el) return;
        el.__bcttFn = fn;
        if (!el.__bcttCap) { el.__bcttCap = 1; el.addEventListener('click', function (e) { if (el.__bcttFn) el.__bcttFn.call(el, e); }, true); }
    }
    function pad(n) { return String(n).padStart(2, '0'); }
    function nowText() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
    function todayText() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
    function num(v) { var n = Number(String(v == null ? '' : v).replace(/\./g, '').replace(/,/g, '.')); return isFinite(n) && n > 0 ? n : 0; }
    function fmt(n, money) { n = Number(n) || 0; return money ? n.toLocaleString('vi-VN') : String(n); }
    function clone(o) { return JSON.parse(JSON.stringify(o)); }
    function toast(msg, type) {
        if (typeof window.showToast === 'function') { window.showToast(msg, type || 'success'); return; }
        var box = $('toastContainer'); if (!box) return;
        var t = document.createElement('div'); t.className = 'toast ' + (type || ''); t.textContent = msg; box.appendChild(t);
        setTimeout(function () { t.remove(); }, 3500);
    }
    function dateParts(d) { var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(d || '')); return m ? { d: m[1], m: m[2], y: m[3] } : null; }
    function validDate(d) { var p = dateParts(d); if (!p) return false; var x = new Date(+p.y, +p.m - 1, +p.d); return x.getDate() === +p.d && x.getMonth() === +p.m - 1; }
    function initials(name) { var p = String(name || '').trim().split(/\s+/); return ((p[0] || '')[0] || '') + ((p[p.length - 1] || '')[0] || ''); }
    // Chữ ký hình ảnh của cán bộ (giả lập ảnh lưu tại Hồ sơ cá nhân)
    function sigImg(name) {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="56"><path d="M8 40 C 40 10, 60 54, 92 26 S 150 18, 172 34" stroke="#1e3a8a" stroke-width="1.6" fill="none"/>'
            + '<text x="14" y="34" font-family="Segoe Script, Brush Script MT, cursive" font-size="19" fill="#1e3a8a">' + esc(String(name || '').split(' ').slice(-2).join(' ')) + '</text></svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    // ---------------- Luồng ký (theo Cấu hình luồng xử lý) ----------------
    function wf() { return window.BTNN_WF || null; }
    function userName(id) { var W = wf(); if (W) return W.userName(id); var r = Object.keys(ROLES).map(function (k) { return ROLES[k]; }).find(function (x) { return x.userId === id; }); return r ? r.name : id; }
    function userTitle(id) { var W = wf(); var u = W && W.getUser(id); return u ? u.title : ''; }
    // Luồng ký: Sở Tư pháp (Phòng -> Sở); báo cáo tổng hợp của Bộ Tư pháp (Cục Đăng ký giao dịch bảo đảm và BTNN -> Lãnh đạo Bộ)
    function flowLevels(r) {
        var W = wf();
        var defs = r && r.unitId === BTP_UNIT
            ? [{ unitId: 'CĐK-01', unitName: 'Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước', fb: ['cuctruong', 'cucpho'], kn: true }, { unitId: BTP_UNIT, unitName: 'Bộ Tư pháp', fb: ['oanhdh', 'khoiml'], kn: false }]
            : [{ unitId: DEMO_SUB, unitName: 'Phòng Hành chính tư pháp', fb: ['tp_hctp_hn'], kn: true }, { unitId: DEMO_UNIT, unitName: 'Sở Tư pháp Thành phố Hà Nội', fb: ['gdso_hn'], kn: false }];
        return defs.map(function (d, i) {
            var leaders = W ? W.getLeaders(d.unitId, 'GQ') : [];
            if (!leaders || !leaders.length) leaders = d.fb;
            var kn = W ? !!W.isKyNhayUnit(d.unitId, 'GQ') : d.kn;
            return { level: i + 1, unitId: d.unitId, unitName: d.unitName, leaders: leaders, kyNhay: kn && i === 0 };
        });
    }

    // ---------------- Dữ liệu ----------------
    function emptyM41() { var o = {}; GROUPS.forEach(function (g) { o[g.k] = []; }); return o; }
    function emptyM43() { var o = {}; GROUPS.forEach(function (g) { var r = {}; M43_INPUT_COLS.forEach(function (c) { r[c] = 0; }); o[g.k] = r; }); return o; }
    function emptyM42(year) { var it = {}; M42_ITEMS.forEach(function (x) { it[x.k] = ''; }); return { nam: String(year), ngay: '', items: it }; }
    function rnd(seed) { var x = Math.sin(seed) * 10000; return x - Math.floor(x); }
    function genM43(seed) {
        var o = emptyM43();
        GROUPS.forEach(function (g, gi) {
            var w = gi === 0 ? 3 : (gi === 5 ? 2 : 1);
            [3, 4, 5, 6, 7, 8, 9, 10].forEach(function (c, ci) { o[g.k][c] = Math.floor(rnd(seed * 31 + gi * 7 + ci) * (w + 1)); });
            var tot = [3, 4, 5, 6, 7, 8, 9, 10].reduce(function (s, c) { return s + o[g.k][c]; }, 0);
            o[g.k][12] = Math.min(o[g.k][3] + o[g.k][7], Math.floor(tot / 3));
            o[g.k][18] = Math.max(0, o[g.k][3] + o[g.k][7] - o[g.k][12]);
            o[g.k][16] = o[g.k][12] * (120000 + Math.floor(rnd(seed + gi) * 80) * 1000);
            o[g.k][25] = Math.floor(o[g.k][12] / 2);
            o[g.k][26] = o[g.k][25] * 150000;
        });
        return o;
    }
    function emptyM04() { var o = {}; GROUPS.forEach(function (g) { var r = {}; M04_INPUT_COLS.forEach(function (c) { r[c] = 0; }); o[g.k] = r; }); return o; }
    function genM04(seed) {
        var o = emptyM04();
        GROUPS.forEach(function (g, gi) {
            var w = gi === 0 ? 2 : (gi === 5 ? 1 : 0), r = o[g.k];
            r[4] = Math.floor(rnd(seed * 17 + gi) * (w + 1)); r[6] = Math.floor(rnd(seed * 19 + gi) * (w + 1));
            if (!r[4] && !r[6]) return;
            r[2] = (r[4] + r[6]) * (60000 + Math.floor(rnd(seed + gi * 3) * 120) * 1000);
            r[5] = r[4] * 30000; r[9] = r[4] > 1 ? 1 : 0; r[10] = r[9] * 5000;
            r[13] = r[4] * 8000; r[14] = r[4] > 1 ? 6000 : 0;
            r[15] = Math.max(0, r[5] - r[10] - r[13] - r[14]);
        });
        return o;
    }
    // Sở Tư pháp Hà Nội năm 2026: số liệu nhóm I lấy tương đối theo dữ liệu mẫu Xem xét trách nhiệm hoàn trả (HT-2026-022 đến HT-2026-027)
    function m04HoanTraHn() {
        var o = emptyM04(), r = o.I;
        r[2] = 695000; r[4] = 1; r[5] = 94000; r[6] = 5; r[9] = 1; r[10] = 8000; r[13] = 29000; r[14] = 0; r[15] = 57000;
        return o;
    }
    var NAMES = ['Nguyễn Văn Hùng', 'Trần Thị Mai', 'Lê Quốc Bảo', 'Phạm Thị Hạnh', 'Hoàng Văn Dũng', 'Công ty TNHH Minh Phát', 'Vũ Thị Lan', 'Đặng Văn Tú'];
    function genM41(seed, prov, year) {
        var o = emptyM41();
        var n = 1 + Math.floor(rnd(seed) * 3);
        for (var i = 0; i < n; i++) {
            var g = GROUPS[Math.floor(rnd(seed * 3 + i) * 3) * 2 % 6].k;
            o[g].push({ hoTen: NAMES[(seed + i) % NAMES.length], diaChi: 'Số ' + (10 + i) + ' đường Trần Phú, ' + prov, coQuan: g === 'I' ? 'UBND ' + prov : (g === 'VI' ? 'Thi hành án dân sự ' + prov : 'Tòa án nhân dân ' + prov),
                tinhHinh: 'Có văn bản yêu cầu bồi thường ngày 1' + i + '/03/' + year + '; đã thụ lý, đang xác minh thiệt hại.', khoKhan: i % 2 ? 'Chậm cung cấp tài liệu chứng minh thiệt hại.' : '', ghiChu: 'Luật TNBTCNN năm 2017' });
        }
        return o;
    }
    // Ngày giả lập tương đối theo ngày hiện tại: mốc trình = 05/11 (kỳ thực tế) hoặc 15/01 năm sau (kỳ chính thức), nếu mốc chưa tới thì lùi về 06 ngày trước hôm nay;
    // k: số ngày cộng thêm so với mốc (tạo báo cáo -21, ngày báo cáo -1, trình 0, ký cấp 1 +1, ký cấp 2 / ban hành +2) -> luôn trước ngày hiện tại, đúng thứ tự.
    function seedAt(year, period, k, hm) {
        var b = period === 'chinh_thuc' ? new Date(+year + 1, 0, 15) : new Date(+year, 10, 5), lim = new Date();
        lim.setHours(0, 0, 0, 0); lim.setDate(lim.getDate() - 6); if (b > lim) b = lim;
        b.setDate(b.getDate() + k);
        return pad(b.getDate()) + '/' + pad(b.getMonth() + 1) + '/' + b.getFullYear() + (hm ? ' ' + hm : '');
    }
    function genM42(year, prov, period) {
        var m = emptyM42(year); m.ngay = seedAt(year, period, -1);
        m.items.danhGiaTinhHinh = 'Trong kỳ, trên địa bàn ' + diaDanh(prov) + ' phát sinh các yêu cầu bồi thường chủ yếu trong lĩnh vực quản lý hành chính và thi hành án dân sự.';
        m.items.capPhatKinhPhi = 'Kinh phí bồi thường được cấp phát kịp thời theo quyết định giải quyết bồi thường có hiệu lực.';
        m.items.phoBien = 'Tổ chức hội nghị phổ biến Luật Trách nhiệm bồi thường của Nhà nước cho cán bộ, công chức trên địa bàn.';
        m.items.ketQuaDatDuoc = 'Công tác bồi thường nhà nước được triển khai đồng bộ, đúng quy định.';
        m.items.vuongMac = 'Việc xác minh thiệt hại còn kéo dài do chậm cung cấp tài liệu.';
        m.items.nhiemVuTrongTam = 'Tiếp tục hướng dẫn nghiệp vụ, theo dõi, đôn đốc giải quyết bồi thường.';
        m.items.deXuatKienNghi = 'Đề nghị Bộ Tư pháp tổ chức tập huấn chuyên sâu về xác minh thiệt hại.';
        return m;
    }
    function hist(r, actor, action, note) { r.history.push({ at: nowText(), actor: actor, action: action, note: note || '' }); }
    function newReport(i, prov, year, period, status) {
        var unitId = i === 0 ? DEMO_UNIT : 'STP-' + (i + 1);
        var fromTo = PERIODS[period];
        var r = { id: 'BC-' + year + '-' + pad(i + 1) + (period === 'chinh_thuc' ? 'C' : ''), unitId: unitId, province: prov, unitName: stpName(prov), year: year, period: period,
            fromDate: fromTo.from + '/' + year, toDate: fromTo.to + '/' + year, status: status,
            preparer: { userId: i === 0 ? 'cv_hn1' : 'cv_' + (i + 1), name: i === 0 ? 'Đỗ Văn Chung' : NAMES[i % NAMES.length].replace('Công ty TNHH Minh Phát', 'Lý Minh Phát'), title: 'Chuyên viên' },
            m41: genM41(i + year, prov, year), m42: genM42(year, prov, period), m43: genM43(i + 1 + year), m04: i === 0 && year === 2026 ? m04HoanTraHn() : genM04(i + 2 + year), submit: null, reject: null, issued: null, sentAt: '', history: [], btp: null, adjLog: [] };
        r.history.push({ at: seedAt(year, period, -21, '08:00'), actor: r.preparer.name, action: 'Tạo báo cáo', note: '' });
        if (status !== ST.DANG) {
            var lv = flowLevels(r);
            r.submit = { at: seedAt(year, period, 0, '09:15'), by: r.preparer.name, noiDung: 'Kính trình Lãnh đạo xem xét, ký duyệt Báo cáo công tác bồi thường nhà nước năm ' + year + '.', current: status === ST.CHO ? (i % 2) : lv.length - 1, tlkt: [{ name: 'Tờ trình Báo cáo công tác bồi thường nhà nước năm ' + year, file: { name: 'To_trinh_BC_cong_tac_BTNN_' + year + '.pdf', size: 245760 } }],
                levels: lv.map(function (l) { return { level: l.level, unitId: l.unitId, unitName: i === 0 ? l.unitName : (l.level === 1 ? 'Phòng Hành chính tư pháp' : stpName(prov)), leaderId: l.leaders[0], leaderName: i === 0 ? userName(l.leaders[0]) : (l.level === 1 ? 'Trưởng phòng HCTP - ' + diaDanh(prov) : 'Giám đốc Sở Tư pháp ' + diaDanh(prov)), kyNhay: l.kyNhay, result: null, at: '', note: '' }; }) };
            r.sentAt = r.submit.at;
            // Dữ liệu mẫu 02 khối: Tài liệu ban hành kèm theo (Bộ Tư pháp xem được) / Tài liệu không ban hành kèm theo (chỉ Sở Tư pháp trình)
            r.submit.tlkt = [
                { name: 'Phụ lục số liệu chi tiết vụ việc năm ' + year, file: { id: '', name: 'Phu_luc_so_lieu_' + year + '_' + unitId + '.pdf', size: 245760 }, scope: 'issued', unit: unitId },
                { name: 'Tờ trình ban hành báo cáo công tác bồi thường nhà nước năm ' + year, file: { id: '', name: 'To_trinh_bao_cao_' + year + '_' + unitId + '.pdf', size: 163840 }, scope: 'internal', unit: unitId }
            ];
            r.history.push({ at: r.submit.at, actor: r.preparer.name, action: 'Gửi phê duyệt', note: r.submit.noiDung });
            if (status === ST.CHO && r.submit.current === 1) { r.submit.levels[0].result = 'approved'; r.submit.levels[0].at = seedAt(year, period, 1, '10:00'); }
            if (status === ST.BH) {
                r.submit.levels.forEach(function (l, k) { l.result = 'approved'; l.at = seedAt(year, period, 1 + k, '14:00'); r.history.push({ at: l.at, actor: l.leaderName, action: k < r.submit.levels.length - 1 ? 'Ký duyệt và chuyển xử lý đến ' + r.submit.levels[k + 1].leaderName : 'Ký duyệt', note: '' }); });
                r.issued = { at: r.submit.levels[r.submit.levels.length - 1].at, signer: r.submit.levels[r.submit.levels.length - 1].leaderName };
                r.history.push({ at: r.issued.at, actor: 'Hệ thống', action: 'Ban hành và gửi Bộ Tư pháp', note: '' });
            }
        }
        return r;
    }
    function seed() {
        var list = [];
        PROVINCES.forEach(function (p, i) {
            var st = ST.BH;
            if (i === 0) st = ST.DANG; else if (i === 5 || i === 12 || i === 20) st = ST.CHO; else if (i === 9 || i === 30) st = ST.DANG;
            list.push(newReport(i, p, 2026, 'thuc_te', st));
        });
        var hn25 = newReport(0, PROVINCES[0], 2025, 'chinh_thuc', ST.BH); list.push(hn25);
        // Giả lập Lãnh đạo Sở Tư pháp Hà Nội: (1) chờ Cấp 2 - Lãnh đạo Sở (Cấp 1 đã ký nháy); (2) chờ Cấp 1 - Lãnh đạo Phòng; (3) Bị từ chối
        var c2 = newReport(0, PROVINCES[0], 2025, 'thuc_te', ST.CHO), l1 = c2.submit.levels[0];
        l1.result = 'approved'; l1.at = seedAt(2025, 'thuc_te', 1, '10:00'); c2.submit.current = 1;
        c2.history.push({ at: l1.at, actor: l1.leaderName, action: 'Ký duyệt và chuyển xử lý đến ' + c2.submit.levels[1].leaderName, note: '' });
        list.push(c2);
        list.push(newReport(0, PROVINCES[0], 2024, 'chinh_thuc', ST.CHO));
        var tc = newReport(0, PROVINCES[0], 2024, 'thuc_te', ST.CHO), t1 = tc.submit.levels[0];
        t1.result = 'rejected'; t1.at = seedAt(2024, 'thuc_te', 1, '15:30'); t1.note = 'Mẫu 43/BTNN: số liệu Cột 25, 26 chưa khớp với Mẫu 41/BTNN; đề nghị rà soát, bổ sung.';
        tc.status = ST.TC; tc.reject = { reason: t1.note, byName: t1.leaderName, level: 1, at: t1.at };
        tc.history.push({ at: t1.at, actor: t1.leaderName, action: 'Từ chối', note: t1.note });
        list.push(tc);
        // Báo cáo năm 2026 của Hà Nội: số liệu Mẫu 42 để trống phần chưa nhập
        list[0].m42.ngay = ''; list[0].m42.items.keHoach = ''; list[0].m42.items.deXuatKienNghi = '';
        // Năm 2025: thêm báo cáo đã ban hành của 08 Sở Tư pháp (nguồn tổng hợp cho báo cáo của Bộ các kỳ năm 2025)
        for (var k = 1; k <= 8; k++) { list.push(newReport(k, PROVINCES[k], 2025, 'chinh_thuc', ST.BH)); list.push(newReport(k, PROVINCES[k], 2025, 'thuc_te', ST.BH)); }
        // Báo cáo tổng hợp của Bộ Tư pháp: 2026 Đang nhập liệu (từ 28 Sở đã gửi); 2025 chính thức Đã ban hành; 2025 thực tế Bị từ chối
        list.push(newBtpReport(2026, 'thuc_te', ST.DANG, list));
        // Sở Tư pháp Tỉnh Điện Biên (2026): Bộ Tư pháp trả lại sau khi đã lập báo cáo tổng hợp -> báo cáo của Bộ có nhắc cập nhật
        var tl = list[3], tlAt = seedAt(2026, 'thuc_te', 4, '10:30'), tlReason = 'Mẫu số 04 (TT 08/2019): số tiền Cột 12 chưa khớp Cột 13 + 14 theo hồ sơ hoàn trả; đề nghị rà soát, gửi lại.';
        tl.status = ST.TL; tl.returned = { reason: tlReason, by: ROLES.cb_btp.name, at: tlAt };
        tl.history.push({ at: tlAt, actor: ROLES.cb_btp.name + ' (Bộ Tư pháp)', action: 'Trả lại báo cáo', note: tlReason });
        var b26 = list[list.length - 1];
        b26.srcDirty = [{ unit: tl.unitName, what: 'bị trả lại báo cáo', at: tlAt }];
        b26.history.push({ at: tlAt, actor: ROLES.cb_btp.name, action: 'Trả lại báo cáo của ' + tl.unitName, note: tlReason });
        list.push(newBtpReport(2025, 'chinh_thuc', ST.BH, list));
        list.push(newBtpReport(2025, 'thuc_te', ST.TC, list));
        return { seed: SEED, reports: list };
    }
    // ---------------- Báo cáo tổng hợp của Bộ Tư pháp ----------------
    function isBtpReport(r) { return !!r && r.unitId === BTP_UNIT; }
    function placeOf(r) { return r.place || diaDanh(r.province); }
    function stpIssued(list, year, period) { return list.filter(function (r) { return !isBtpReport(r) && r.year === year && r.period === period && r.status === ST.BH; }); }
    // Số liệu tự tổng hợp từ báo cáo Đã ban hành của các Sở Tư pháp: Mẫu 41 ghép vụ việc (kèm tên Sở), Mẫu 42 ghép nội dung `- [Sở]: [Nội dung]`, Mẫu 43 / Mẫu số 04 cộng từng ô
    function btpAuto(list, year, period) {
        var iss = stpIssued(list, year, period), ag = aggregate(iss);
        ag.m42.nam = String(year);
        return { m41: ag.m41, m42: ag.m42, m43: ag.m43, m04: ag.m04, src: { n: iss.length, at: nowText() } };
    }
    function applyAuto(r, a) {
        r.m41 = a.m41; r.m42.items = a.m42.items; r.m42.nam = r.m42.nam || a.m42.nam; r.m43 = a.m43; r.m04 = a.m04;
        r.base = { m43: clone(a.m43), m04: clone(a.m04) }; r.src = a.src; r.srcDirty = [];
    }
    // Ghi nhắc trên báo cáo của Bộ cùng kỳ (chưa ban hành) khi một Sở Tư pháp bị trả lại / gửi lại
    function markBtpDirty(sr, what) {
        var b = DB.reports.find(function (x) { return isBtpReport(x) && x.year === sr.year && x.period === sr.period; });
        if (!b || b.status === ST.BH) return;
        b.srcDirty = (b.srcDirty || []).filter(function (x) { return x.unit !== sr.unitName; });
        b.srcDirty.push({ unit: sr.unitName, what: what === 'gửi lại' ? 'đã gửi lại báo cáo' : 'bị trả lại báo cáo', at: nowText() });
        if (what === 'gửi lại') hist(b, 'Hệ thống', sr.unitName + ' gửi lại báo cáo sau khi bị trả lại');
    }
    // Bộ Tư pháp trả lại báo cáo Đã ban hành của Sở Tư pháp
    function canReturn(r) { return role === 'cb_btp' && !!r && !isBtpReport(r) && r.status === ST.BH; }
    function openReturn(r) {
        var html = '<div class="bctt-modal" style="width:620px;"><div class="bctt-mh"><div><div class="tt">Trả lại báo cáo</div><div class="st">' + esc(r.unitName) + ' • Năm ' + r.year + ' - ' + PERIODS[r.period].label + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="form-group"><span class="form-label">Lý do trả lại<span style="color:red;">*</span></span><textarea class="bctt-ta" id="bcttRetReason" rows="4" maxlength="2000" placeholder="Nhập lý do trả lại..."></textarea><div class="bctt-err" id="bcttRetErr">Đây là trường bắt buộc</div></div>'
            + '<div class="formula-hint" style="margin-top:8px;">Báo cáo chuyển trạng thái Bị trả lại, không còn được tính là Đã gửi; Sở Tư pháp cập nhật và trình ký, gửi lại.</div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-warning" id="bcttRetOk"><i class="fa-solid fa-rotate-left"></i> Trả lại</button></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        $('bcttRetOk').onclick = function () {
            var t = $('bcttRetReason'), v = t.value.trim();
            t.classList.toggle('bctt-invalid', !v); $('bcttRetErr').classList.toggle('on', !v);
            if (!v) { t.focus(); return; }
            if (!canReturn(r)) { toast('Báo cáo không còn ở trạng thái Đã ban hành.', 'error'); closeOv('bcttOv1'); return; }
            r.status = ST.TL; r.returned = { reason: v, by: me().name, at: nowText() };
            hist(r, me().name + ' (Bộ Tư pháp)', 'Trả lại báo cáo', v);
            markBtpDirty(r, 'trả lại');
            var b = DB.reports.find(function (x) { return isBtpReport(x) && x.year === r.year && x.period === r.period; });
            if (b) hist(b, me().name, 'Trả lại báo cáo của ' + r.unitName, v);
            save(); closeOv('bcttOv1'); toast('Đã trả lại báo cáo của ' + r.unitName + '.'); showDetail(r.id);
        };
    }
    function newBtpReport(year, period, status, list) {
        var fromTo = PERIODS[period], a = btpAuto(list, year, period), cb = ROLES.cb_btp;
        var r = { id: 'BC-BTP-' + year + (period === 'chinh_thuc' ? 'C' : ''), unitId: BTP_UNIT, province: '', place: 'Hà Nội', unitName: 'Bộ Tư pháp', year: year, period: period,
            fromDate: fromTo.from + '/' + year, toDate: fromTo.to + '/' + year, status: status, preparer: { userId: cb.userId, name: cb.name, title: cb.title },
            m41: null, m42: emptyM42(year), m43: null, m04: null, submit: null, reject: null, issued: null, sentAt: '', history: [], adjLog: [] };
        applyAuto(r, a);
        r.history.push({ at: seedAt(year, period, 3, '08:00'), actor: cb.name, action: 'Lập báo cáo tổng hợp', note: 'Tổng hợp từ ' + a.src.n + '/' + PROVINCES.length + ' Sở Tư pháp đã gửi.' });
        if (status === ST.DANG) {
            // Minh họa ô Bộ Tư pháp đã sửa khác số tự tổng hợp
            r.m43.I[3] = num(r.m43.I[3]) + 1; r.m04.I[2] = num(r.m04.I[2]) + 5000;
            return r;
        }
        r.m42.ngay = seedAt(year, period, 4);
        var lv = flowLevels(r);
        r.submit = { at: seedAt(year, period, 5, '09:00'), by: cb.name, noiDung: 'Kính trình Lãnh đạo xem xét, ký duyệt Báo cáo tổng hợp công tác bồi thường nhà nước năm ' + year + '.', current: 0, tlkt: [],
            levels: lv.map(function (l) { return { level: l.level, unitId: l.unitId, unitName: l.unitName, leaderId: l.leaders[0], leaderName: userName(l.leaders[0]), kyNhay: l.kyNhay, result: null, at: '', note: '' }; }) };
        r.sentAt = r.submit.at;
        r.history.push({ at: r.submit.at, actor: cb.name, action: 'Gửi phê duyệt', note: r.submit.noiDung });
        if (status === ST.TC) {
            var t = r.submit.levels[0]; t.result = 'rejected'; t.at = seedAt(year, period, 6, '15:00'); t.note = 'Mẫu số 04 (TT 08/2019): đề nghị rà soát lại Cột 13, 14 so với báo cáo các Sở Tư pháp.';
            r.reject = { reason: t.note, byName: t.leaderName, level: 1, at: t.at };
            r.history.push({ at: t.at, actor: t.leaderName, action: 'Từ chối', note: t.note });
        } else {
            r.submit.current = lv.length - 1;
            r.submit.levels.forEach(function (l, k) { l.result = 'approved'; l.at = seedAt(year, period, 6 + k, '14:00'); r.history.push({ at: l.at, actor: l.leaderName, action: k < r.submit.levels.length - 1 ? 'Ký duyệt và chuyển xử lý đến ' + r.submit.levels[k + 1].leaderName : 'Ký duyệt', note: '' }); });
            r.issued = { at: r.submit.levels[r.submit.levels.length - 1].at, signer: r.submit.levels[r.submit.levels.length - 1].leaderName };
            r.history.push({ at: r.issued.at, actor: 'Hệ thống', action: 'Ban hành', note: '' });
        }
        return r;
    }
    var DB = null;
    function load() {
        try { DB = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { DB = null; }
        if (!DB || DB.seed !== SEED) { DB = seed(); save(); }
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { /* bỏ qua */ } }
    function getR(id) { return DB.reports.find(function (r) { return r.id === id; }); }

    // ---------------- Vai trò ----------------
    var role = 'cb_stp';
    function me() { return ROLES[role]; }
    function isStpRole() { return ['cb_btp', 'ld_cuc', 'ld_bo'].indexOf(role) < 0; }
    function myUnit() { return isStpRole() ? DEMO_UNIT : BTP_UNIT; }
    // Đơn vị người xem (quyền xem Tài liệu không ban hành kèm theo): vai trò Sở Tư pháp -> Sở Tư pháp Hà Nội; vai trò Bộ Tư pháp -> Bộ Tư pháp
    window.tlktViewerUnit = function () { return myUnit(); };
    // Cán bộ cập nhật báo cáo của đơn vị mình (Sở Tư pháp Hà Nội / báo cáo tổng hợp của Bộ Tư pháp) khi Đang nhập liệu hoặc Bị từ chối
    function canEdit(r) { return (role === 'cb_stp' || role === 'cb_btp') && r.unitId === myUnit() && (r.status === ST.DANG || r.status === ST.TC || r.status === ST.TL); }
    function canApprove(r) {
        if (!r || r.status !== ST.CHO || !r.submit || r.unitId !== myUnit()) return false;
        var lv = r.submit.levels[r.submit.current];
        return !!lv && lv.leaderId === me().userId;
    }

    // ---------------- Tính toán Mẫu 43 ----------------
    function m43Row(row) {
        var o = {}; for (var c = 2; c <= 27; c++) o[c] = num(row && row[c]);
        Object.keys(M43_FORMULA).forEach(function (k) { o[k] = M43_FORMULA[k].reduce(function (s, c) { return s + o[c]; }, 0); });
        return o;
    }
    function m43Total(m43) {
        var t = {}; for (var c = 2; c <= 27; c++) t[c] = 0;
        GROUPS.forEach(function (g) { var r = m43Row(m43[g.k]); for (var c = 2; c <= 27; c++) t[c] += r[c]; });
        return t;
    }
    // ---------------- Tính toán Mẫu số 04 (TT 08/2019) ----------------
    function m04Row(row) {
        var o = {}; for (var c = 2; c <= 15; c++) o[c] = num(row && row[c]);
        Object.keys(M04_FORMULA).forEach(function (k) { o[k] = M04_FORMULA[k].reduce(function (s, c) { return s + o[c]; }, 0); });
        return o;
    }
    function m04Total(m04) {
        var t = {}; for (var c = 2; c <= 15; c++) t[c] = 0;
        GROUPS.forEach(function (g) { var r = m04Row(m04 && m04[g.k]); for (var c = 2; c <= 15; c++) t[c] += r[c]; });
        return t;
    }
    function m41Count(m41) { return GROUPS.reduce(function (s, g) { return s + (m41[g.k] || []).length; }, 0); }
    function m42Filled(m42) { return M42_ITEMS.filter(function (x) { return String(m42.items[x.k] || '').trim(); }).length; }

    // ---------------- CSS ----------------
    function injectCss() {
        if ($('bcttCss')) return;
        var css = [
            '.bctt-hidden{display:none !important;}',
            '.bctt-ltabs{display:flex;gap:8px;align-items:center;border-bottom:1px solid #e2e8f0;margin:0 0 16px;background:#fff;border-radius:8px 8px 0 0;padding:0 8px;}',
            '.bctt-ltab{border:0;background:transparent;padding:10px 16px;font-size:13.5px;font-weight:600;color:#64748b;cursor:pointer;border-bottom:3px solid transparent;display:inline-flex;align-items:center;gap:8px;font-family:inherit;}',
            '.bctt-ltab.active{color:#2563eb;border-bottom-color:#2563eb;}',
            '.bctt-meta{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px 18px;}',
            '.bctt-meta label{display:block;font-size:11.5px;color:#64748b;font-weight:600;margin-bottom:3px;}',
            '.bctt-meta strong{font-size:13.5px;color:#1e293b;font-weight:600;}',
            '.bctt-sub{display:block;font-size:11.5px;color:#64748b;margin-top:3px;}',
            '.bctt-sig{height:40px;border:1px dashed #cbd5e1;border-radius:4px;background:#fff;vertical-align:middle;margin-right:8px;}',
            '.bctt-alert{background:#fef2f2;border:1px solid #fecaca;border-left:4px solid #dc2626;border-radius:8px;padding:12px 16px;margin:14px 0 0;color:#7f1d1d;font-size:13px;line-height:1.6;}',
            '.bctt-alert b.t{display:block;color:#b91c1c;margin-bottom:2px;}',
            '.bctt-files{margin-top:16px;}',
            '.bctt-files .custom-table td{white-space:normal;}',
            '.bctt-link{background:none;border:0;color:#1d4ed8;cursor:pointer;font:inherit;font-weight:600;padding:0 4px;}',
            '.bctt-link:hover{text-decoration:underline;}',
            '.bctt-tabs{display:flex;gap:4px;border-bottom:2px solid #e2e8f0;margin-bottom:14px;flex-wrap:wrap;}',
            '.bctt-tab{background:transparent;border:0;border-bottom:3px solid transparent;margin-bottom:-2px;color:#64748b;cursor:pointer;font-size:13.5px;font-weight:600;padding:10px 16px;font-family:inherit;}',
            '.bctt-tab.active{color:#1e3a8a;border-bottom-color:#1e3a8a;}',
            '.bctt-panel{display:none;}.bctt-panel.active{display:block;}',
            '.bctt-ta{width:100%;min-height:62px;padding:7px 9px;border:1px solid #e2e8f0;border-radius:4px;font:inherit;font-size:13px;resize:vertical;}',
            '.bctt-ta:disabled,.bctt-in:disabled{background:#f8fafc;color:#334155;}',
            '.bctt-in{width:100%;padding:5px 6px;border:1px solid #e2e8f0;border-radius:3px;font:inherit;font-size:12px;}',
            '.bctt-num{width:64px;text-align:right;}',
            '.bctt-m42 .sec{font-weight:700;color:#1e3a8a;margin:16px 0 8px;font-size:14px;}',
            '.bctt-m42 .blk{font-weight:700;color:#334155;margin:12px 0 6px;font-size:13.5px;}',
            '.bctt-m42 .it{margin:0 0 12px 14px;}',
            '.bctt-m42 .it label{display:block;font-size:13px;color:#334155;margin-bottom:4px;}',
            // Mẫu 42 (màn nhập liệu): nội dung chữ đen / xám đậm; màu nhấn chỉ ở tiêu đề phần (I, II, III); khối mục thu gọn / mở rộng
            '.m42-form{color:#111827;}',
            '.m42-bar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;}',
            '.m42-bar-act{display:flex;gap:8px;}',
            '.m42-head{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px;padding:14px;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:14px;background:#fff;}',
            '.m42-f label{display:block;font-size:12.5px;font-weight:600;color:#1e293b;margin-bottom:4px;}',
            '.m42-ro{padding:8px 10px;border:1px solid #e2e8f0;border-radius:4px;background:#f8fafc;color:#111827;font-size:13px;min-height:36px;}',
            '.m42-form .form-control{color:#111827;}',
            '.m42-form .form-control:disabled{background:#f8fafc;color:#111827;-webkit-text-fill-color:#111827;opacity:1;}',
            '.m42-box{border:1px solid #e2e8f0;border-radius:8px;background:#fff;margin-bottom:12px;}',
            '.m42-tg{width:100%;display:flex;align-items:center;gap:10px;border:0;background:#f8fafc;border-bottom:1px solid #e2e8f0;border-radius:8px 8px 0 0;padding:10px 14px;font:inherit;font-size:14px;font-weight:700;color:#1e3a8a;text-align:left;cursor:pointer;}',
            '.m42-tg:hover{background:#f1f5f9;}',
            '.m42-tg:focus-visible{outline:2px solid #3b82f6;outline-offset:-2px;}',
            '.m42-chev{font-size:12px;color:#64748b;transition:transform .15s;width:14px;}',
            '.m42-box.collapsed>.m42-tg{border-bottom:0;border-radius:8px;}',
            '.m42-box.collapsed>.m42-tg .m42-chev{transform:rotate(-90deg);}',
            '.m42-box.collapsed>.m42-body{display:none;}',
            '.m42-body{padding:12px 14px 4px;}',
            '.m42-blk{border-radius:6px;margin-bottom:10px;}',
            '.m42-blk>.m42-tg{background:#fff;font-size:13.5px;color:#1e293b;padding:9px 12px;border-radius:6px 6px 0 0;}',
            '.m42-blk.collapsed>.m42-tg{border-radius:6px;}',
            '.m42-blk>.m42-body{padding:4px 12px 2px;}',
            '.m42-it{margin:8px 0 12px;}',
            '.m42-it label{display:block;font-size:13px;font-weight:500;color:#1e293b;line-height:1.45;margin-bottom:5px;}',
            '.m42-ta{display:block;min-height:58px;overflow:hidden;resize:none;color:#111827;font-size:13px;line-height:1.5;padding:7px 10px;border-color:#cbd5e1;}',
            '.m42-ta:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 2px rgba(59,130,246,.15);}',
            '.m42-form .m42-ta:disabled{background:#f8fafc;color:#111827;-webkit-text-fill-color:#111827;opacity:1;}',
            '@media (max-width:900px){.m42-head{grid-template-columns:1fr;}}',
            '.bctt-m43{min-width:2100px;font-size:11.5px;}',
            '.bctt-m43 th{white-space:normal !important;line-height:1.25;padding:5px 4px !important;min-width:58px;}',
            '.bctt-m43 td{padding:4px !important;}',
            '.bctt-m43 td.f{background:transparent;font-weight:700;color:#111827;}',
            '.bctt-m43 tr.g td{background:#fff;font-weight:700;text-align:left;color:#111827;border-top:1px solid #cbd5e1;}',
            '.bctt-m43 tr.t td{background:#fff;font-weight:700;color:#111827;border-top:2px solid #94a3b8;border-bottom:2px solid #94a3b8;}',
            '.bctt-m43 .cell-link{background:none;border:0;color:#111827;cursor:pointer;font:inherit;text-decoration:underline dotted;}',
            '.bctt-m04{min-width:1500px;font-size:11.5px;}',
            '.bctt-m04 th{white-space:normal !important;line-height:1.25;padding:5px 4px !important;min-width:70px;}',
            '.bctt-m04 td{padding:4px !important;}',
            '.bctt-m04 td.f{background:transparent;font-weight:700;color:#111827;}',
            '.bctt-m04 tr.g td{background:#fff;font-weight:700;text-align:left;color:#111827;border-top:1px solid #cbd5e1;}',
            '.bctt-m04 tr.t td{background:#fff;font-weight:700;color:#111827;border-top:2px solid #94a3b8;border-bottom:2px solid #94a3b8;}',
            '.bctt-m04 .cell-link{background:none;border:0;color:#111827;cursor:pointer;font:inherit;text-decoration:underline dotted;}',
            '.bctt-m04 .bctt-num{width:96px;}',
            '.bctt-money{width:120px !important;text-align:right;font-variant-numeric:tabular-nums;}',
            '.bctt-m43 td,.bctt-m04 td{text-align:right;}',
            '.bctt-m43 tr.g td,.bctt-m04 tr.g td,.bctt-m43 tr td:first-child,.bctt-m04 tr td:first-child{text-align:left;}',
            '.bctt-adj{display:inline-block;margin-left:4px;font-size:10.5px;color:#b45309;font-weight:700;}',
            '.bctt-m41 td{white-space:normal !important;vertical-align:top !important;}',
            '.bctt-m41 tr.g td{background:#fff;font-weight:700;color:#111827;text-align:left;border-top:1px solid #cbd5e1;}',
            '.bctt-m41 tr.g td .m41-tg{border:0;background:transparent;font:inherit;font-weight:700;color:#111827;cursor:pointer;display:inline-flex;align-items:center;gap:8px;padding:0;text-align:left;}',
            '.bctt-m41 tr.g.collapsed .m42-chev{transform:rotate(-90deg);}',
            '.bctt-m41 tr.m41-hide{display:none;}',
            '.bctt-m41 tr.t td{background:#fff;font-weight:700;color:#111827;border-top:2px solid #94a3b8;}',
            '.bctt-m41 td,.bctt-m43 td,.bctt-m04 td{color:#111827;}',
            '.bctt-m41 .bctt-in,.bctt-m43 .bctt-in,.bctt-m04 .bctt-in{color:#111827;}',
            '.bctt-srcbar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-top:14px;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;color:#1e293b;font-size:13px;}',
            '.bctt-srcbar-act{display:flex;gap:8px;flex-wrap:wrap;}',
            '.bctt-chg{border-color:#d97706 !important;background:#fffbeb !important;}',
            '.bctt-btpcard{border:1px solid #e2e8f0;border-radius:8px;padding:14px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;}',
            '.bctt-ag{overflow:hidden;resize:none;min-height:34px;line-height:1.45;}',
            '.bctt-m41 tr.add-row td{background:#fff !important;}',
            '.bctt-ov{position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:2500;display:none;align-items:center;justify-content:center;}',
            '.bctt-ov.on{display:flex;}',
            '.bctt-modal{background:#fff;border-radius:10px;width:960px;max-width:96vw;max-height:94vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 45px rgba(0,0,0,.3);}',
            '.bctt-mh{display:flex;justify-content:space-between;align-items:flex-start;padding:16px 22px;border-bottom:1px solid #e2e8f0;background:#f8fafc;}',
            '.bctt-mh .tt{font-size:16px;font-weight:700;color:#1e293b;}',
            '.bctt-mh .st{font-size:12.5px;color:#64748b;margin-top:3px;}',
            '.bctt-x{border:0;background:transparent;font-size:22px;color:#94a3b8;cursor:pointer;line-height:1;}',
            '.bctt-mb{padding:18px 22px;overflow:auto;flex:1;}',
            '.bctt-mf{padding:14px 22px;display:flex;justify-content:flex-end;gap:8px;border-top:1px solid #e2e8f0;background:#f8fafc;}',
            '.bctt-step{display:flex;border-bottom:1px solid #e2e8f0;}',
            '.bctt-step div{flex:1;padding:10px 16px;font-size:13px;font-weight:600;color:#64748b;display:flex;align-items:center;gap:8px;}',
            '.bctt-step div.on{color:#1e3a8a;background:#eff6ff;box-shadow:inset 0 -3px 0 #1e3a8a;}',
            '.bctt-step span.b{width:22px;height:22px;border-radius:50%;background:#e2e8f0;display:inline-flex;align-items:center;justify-content:center;font-size:12px;}',
            '.bctt-step div.on span.b{background:#1e3a8a;color:#fff;}',
            '.bctt-sec{border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:14px;}',
            '.bctt-sec .h{font-size:13px;font-weight:700;color:#334155;margin-bottom:10px;}',
            '.bctt-split{display:flex;gap:0;min-height:62vh;min-width:0;width:100%;}',
            '.bctt-view{flex:1;min-width:0;background:#334155;overflow:auto;padding:0 0 20px;display:flex;flex-direction:column;}',
            '.bctt-view .bctt-tabs{background:#1e293b;border:0;margin:0;padding:0 10px;position:sticky;top:0;z-index:2;}',
            '.bctt-view .bctt-tab{color:#cbd5e1;}.bctt-view .bctt-tab.active{color:#fff;border-bottom-color:#60a5fa;}',
            '.bctt-side{width:360px;flex-shrink:0;border-left:1px solid #e2e8f0;overflow:auto;padding:16px;background:#fff;}',
            '.bctt-card{border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:12px;}',
            '.bctt-card .h{font-weight:700;font-size:13px;color:#1e293b;display:flex;align-items:center;gap:8px;margin-bottom:8px;}',
            '.bctt-kn{display:inline-block;padding:1px 8px;border-radius:10px;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;}',
            '.bctt-a4{background:#fff;margin:20px auto 0;padding:34px 40px;box-shadow:0 6px 18px rgba(0,0,0,.35);color:#000;font-family:"Times New Roman",serif;font-size:13px;line-height:1.45;position:relative;}',
            '.bctt-a4.p{width:794px;min-height:1050px;}.bctt-a4.l{width:1123px;min-height:760px;}',
            '.bctt-a4 table.dt{width:100%;border-collapse:collapse;font-size:11.5px;}',
            '.bctt-a4 table.dt th,.bctt-a4 table.dt td{border:1px solid #000;padding:3px 4px;text-align:center;vertical-align:middle;}',
            '.bctt-a4 table.dt td.l{text-align:left;}',
            '.bctt-a4 .c{text-align:center;}.bctt-a4 .b{font-weight:700;}.bctt-a4 .i{font-style:italic;}',
            '.bctt-a4 .sigbox{border:1.5px dashed #2563eb;background:rgba(219,234,254,.55);color:#1e3a8a;font-family:Inter,sans-serif;font-size:11px;padding:6px 8px;border-radius:4px;display:inline-block;min-width:170px;margin:4px 0;}',
            '.bctt-a4 .sigbox.ok{border-style:solid;border-color:#dc2626;background:rgba(254,226,226,.5);color:#991b1b;}',
            '.bctt-a4 .knbox{position:absolute;right:24px;bottom:16px;border:1px dashed #b45309;background:#fffbeb;color:#92400e;font-family:Inter,sans-serif;font-size:10.5px;padding:4px 8px;border-radius:4px;}',
            '.bctt-a4 .knbox.ok{border-style:solid;}',
            '.bctt-wm{position:absolute;top:12px;left:16px;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:#b45309;border:1px solid #f59e0b;border-radius:4px;padding:2px 8px;background:#fffbeb;}',
            '.bctt-tl{list-style:none;margin:0;padding:0;}.bctt-tl li{padding:8px 0;border-bottom:1px dashed #e2e8f0;font-size:12.5px;display:flex;gap:10px;}',
            '.bctt-tl .av{width:30px;height:30px;border-radius:50%;background:#dbeafe;color:#1e3a8a;font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
            '.bctt-tl .rj{color:#b91c1c;}.bctt-tl .wt{color:#b45309;}',
            '.bctt-chip{display:inline-flex;align-items:center;gap:2px;border:1px solid #e2e8f0;border-radius:6px;padding:2px 6px;margin:2px 4px 2px 0;font-size:12px;background:#f8fafc;}',
            '.bctt-err{display:none;color:#dc2626;font-size:12px;margin-top:4px;}.bctt-err.on{display:block;}',
            '.bctt-invalid{border-color:#dc2626 !important;box-shadow:0 0 0 2px rgba(220,38,38,.12) !important;}',
            '.bctt-full{position:fixed;inset:0;z-index:2400;background:#fff;display:none;flex-direction:column;}.bctt-full.on{display:flex;}',
            '.bctt-full .bctt-split{flex:1;min-height:0;}',
            '@media (max-width:1100px){.bctt-meta{grid-template-columns:repeat(2,minmax(0,1fr));}}'
        ].join('\n');
        var st = document.createElement('style'); st.id = 'bcttCss'; st.textContent = css; document.head.appendChild(st);
    }

    // ---------------- Khung trang ----------------
    function mountShell() {
        var rs = document.querySelector('.role-switch');
        if (rs) {
            rs.innerHTML = '<label>Xem theo vai trò (mô phỏng đăng nhập)</label><select id="bcttRole">'
                + Object.keys(ROLES).map(function (k) { return '<option value="' + k + '">' + esc(ROLES[k].label) + '</option>'; }).join('') + '</select>';
            $('bcttRole').value = role;
            $('bcttRole').onchange = function () { setRole(this.value); };
        }
        if (!$('bcttApp')) { var app = document.createElement('section'); app.id = 'bcttApp'; document.querySelector('.container').appendChild(app); }
        var ov = document.createElement('div'); ov.id = 'bcttOverlays'; document.body.appendChild(ov);
        ov.innerHTML = '<div class="bctt-ov" id="bcttOv1"></div><div class="bctt-ov" id="bcttOv2" style="z-index:2600"></div><div class="bctt-full" id="bcttFull"></div>';
    }
    function closeOv(id) { var e = $(id); if (e) { e.classList.remove('on'); e.innerHTML = ''; } }
    function openOv(id, html) { var e = $(id); e.innerHTML = html; e.classList.add('on'); }

    var view = { name: 'list', id: null, tab: 'm41' };
    var filt = { year: 'all', period: 'all', status: 'all' };

    function statusCell(r) {
        var sub = '';
        if (r.status === ST.CHO && r.submit) { var lv = r.submit.levels[r.submit.current]; sub = '<span class="bctt-sub uxu-sub">Loại trình: ' + KIND + '<br>Chờ Cấp ' + lv.level + ' - ' + esc(lv.leaderName) + '</span>'; }
        if (r.status === ST.TC && r.reject) sub = '<span class="bctt-sub uxu-sub">Loại trình: ' + KIND + '</span>';
        if (r.status === ST.TL && r.returned) sub = '<span class="bctt-sub uxu-sub">Bộ Tư pháp trả lại</span>';
        if (r.status === ST.BH) sub = '<span class="bctt-sub uxu-sub">' + (isBtpReport(r) ? 'Đã ban hành' : 'Đã gửi Bộ Tư pháp') + '</span>';
        return '<span class="badge ' + ST_CLS[r.status] + '">' + r.status + '</span>' + sub;
    }

    // ---------------- 02 tab Chờ xử lý / Đã xử lý (theo vai trò giả lập) ----------------
    // - Phạm vi xem: báo cáo của Sở Tư pháp mình; Lãnh đạo không thấy báo cáo `Đang nhập liệu`.
    // - Chờ xử lý: Cán bộ = `Đang nhập liệu`, `Bị từ chối`; Lãnh đạo = `Chờ duyệt` tại cấp phê duyệt hiện hành của mình.
    // - Đã xử lý: Cán bộ = các báo cáo còn lại trong phạm vi xem; Lãnh đạo = báo cáo chính Lãnh đạo đã Ký duyệt / Từ chối, không còn chờ Lãnh đạo duyệt
    //   (giống Xác định CQGQBT: !canApprove && leaderActedOn). Badge số lượng chỉ ở tab Chờ xử lý (đồng bộ LeftMenu qua BDG).
    var listTab = 'pending';
    function inScope(r) { return r.unitId === DEMO_UNIT && (role === 'cb_stp' || r.status !== ST.DANG); }
    function isPending(r) { return role === 'cb_stp' ? canEdit(r) : canApprove(r); }
    function leaderActed(r) { var nm = me().name; return (r.history || []).some(function (h) { return h.actor === nm && /^(Ký duyệt|Từ chối)/.test(h.action || ''); }); }
    function inTab(tab, r) {
        if (!inScope(r)) return false;
        if (tab === 'pending') return isPending(r);
        return !isPending(r) && (role === 'cb_stp' || leaderActed(r));
    }
    function tabStatuses(tab) {
        if (role === 'cb_stp') return tab === 'pending' ? [ST.DANG, ST.TC, ST.TL] : [ST.CHO, ST.BH];
        return [ST.CHO, ST.TC, ST.BH].filter(function (s) { return DB.reports.some(function (r) { return r.status === s && inTab(tab, r); }); });
    }
    function pendingCount() { return isStpRole() ? DB.reports.filter(function (r) { return inTab('pending', r); }).length : 0; }
    function reportBadge() {
        var n = pendingCount(), el = $('bcttCntPending');
        if (window.BDG) window.BDG.report('bctt', n, el);
        else if (el) { el.textContent = n; el.style.display = n > 0 ? '' : 'none'; }
    }

    // ---------------- MH01: Danh sách ----------------
    function showList() {
        view = { name: 'list', id: null, tab: 'm41' };
        if (!isStpRole()) { renderBtpList(); return; }
        var sts = tabStatuses(listTab);
        if (filt.status !== 'all' && sts.indexOf(filt.status) < 0) filt.status = 'all';
        var years = []; DB.reports.forEach(function (r) { var y = String(r.year); if (r.unitId === DEMO_UNIT && years.indexOf(y) < 0) years.push(y); }); years.sort().reverse();
        var html = '<div class="bctt-ltabs" id="bcttLTabs"><button type="button" class="bctt-ltab' + (listTab === 'pending' ? ' active' : '') + '" data-ltab="pending"><i class="fa-solid fa-list-check"></i> Chờ xử lý <span class="bdg-tab-count" id="bcttCntPending" style="display:none;">0</span></button>'
            + '<button type="button" class="bctt-ltab' + (listTab === 'done' ? ' active' : '') + '" data-ltab="done"><i class="fa-solid fa-box-archive"></i> Đã xử lý</button></div>'
            + '<div class="card-section" data-bpbd-filter><div class="section-title"><span><i class="fa-solid fa-filter"></i> Bộ lọc tìm kiếm</span></div>'
            + '<div class="filter-grid">'
            + '<div class="form-group"><span class="form-label">Năm báo cáo</span><select class="form-control" id="bcttFYear"><option value="all">Tất cả</option>' + years.map(function (y) { return '<option value="' + y + '"' + (filt.year === y ? ' selected' : '') + '>' + y + '</option>'; }).join('') + '</select></div>'
            + '<div class="form-group"><span class="form-label">Loại kỳ báo cáo</span><select class="form-control" id="bcttFPeriod"><option value="all">Tất cả</option>' + Object.keys(PERIODS).map(function (k) { return '<option value="' + k + '"' + (filt.period === k ? ' selected' : '') + '>' + PERIODS[k].label + '</option>'; }).join('') + '</select></div>'
            + '<div class="form-group"><span class="form-label">Trạng thái</span><select class="form-control" id="bcttFStatus"><option value="all">Tất cả</option>' + sts.map(function (s) { return '<option' + (filt.status === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div>'
            + '</div><div class="toolbar-row uxu-filter-actions"><button class="btn btn-secondary" id="bcttFReset"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button><button class="btn btn-primary" id="bcttFGo"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button></div></div>';
        var rows = DB.reports.filter(function (r) { return inTab(listTab, r) && (filt.year === 'all' || String(r.year) === filt.year) && (filt.period === 'all' || r.period === filt.period) && (filt.status === 'all' || r.status === filt.status); })
            .sort(function (a, b) { return b.year - a.year; });
        html += '<div class="card-section"><div class="section-title"><span><i class="fa-solid fa-table-list"></i> Danh sách báo cáo công tác bồi thường nhà nước</span>'
            + (role === 'cb_stp' && listTab === 'pending' ? '<button class="btn btn-success btn-sm uxu-btn-tb" id="bcttCreate"><i class="fa-solid fa-plus"></i> Tạo báo cáo</button>' : '') + '</div>'
            + '<div class="table-container"><table class="custom-table" id="bcttListTable"><thead><tr><th>STT</th><th>Năm báo cáo</th><th>Loại kỳ báo cáo</th><th>Đơn vị báo cáo</th><th>Người lập</th><th>Trạng thái</th><th>Ngày gửi gần nhất</th><th>Thao tác</th></tr></thead><tbody>'
            + (rows.length ? rows.map(function (r, i) {
                var acts = '<button class="icon-btn" title="Xem chi tiết" data-act="view" data-id="' + r.id + '"><i class="fa-solid fa-eye"></i></button>' + listActs(r);
                return '<tr class="list-row" data-id="' + r.id + '"><td>' + (i + 1) + '</td><td>' + r.year + '</td><td class="text-left">' + PERIODS[r.period].label + '</td><td class="text-left">' + esc(r.unitName) + '</td><td class="text-left">' + esc(r.preparer.name) + '</td><td>' + statusCell(r) + '</td><td>' + (r.sentAt || '--') + '</td><td>' + acts + '</td></tr>';
            }).join('') : '<tr><td colspan="8">Không có dữ liệu</td></tr>')
            + '</tbody></table></div></div>';
        $('bcttApp').innerHTML = html;
        $('bcttFGo').onclick = function () { filt.year = $('bcttFYear').value; filt.period = $('bcttFPeriod').value; filt.status = $('bcttFStatus').value; showList(); };
        $('bcttFReset').onclick = function () { filt = { year: 'all', period: 'all', status: 'all' }; showList(); };
        if ($('bcttCreate')) $('bcttCreate').onclick = openCreate;
        $('bcttLTabs').onclick = function (e) { var t = e.target.closest('[data-ltab]'); if (t && t.getAttribute('data-ltab') !== listTab) { listTab = t.getAttribute('data-ltab'); showList(); } };
        onClk($('bcttListTable'), function (e) {
            var b = e.target.closest('[data-act]');
            var tr = e.target.closest('tr[data-id]');
            if (b && b.disabled) return;
            if (b) { e.stopPropagation(); var id = b.getAttribute('data-id'), a = b.getAttribute('data-act');
                if (a === 'view' || a === 'edit') showDetail(id); else if (a === 'submit') openSubmit(id); else if (a === 'approve') openSign(id, 'approve'); else if (a === 'reject') openSign(id, 'reject'); return; }
            if (tr) showDetail(tr.getAttribute('data-id'));
        });
        refreshShared();
    }
    // Cột Thao tác cố định theo vai trò giả lập; thao tác chưa đủ điều kiện vẫn hiển thị nhưng mờ (disabled), kèm chú thích lý do
    function listActs(r) {
        function btn(act, cls, icon, title, on, why) {
            return ' <button class="icon-btn ' + cls + (on ? '' : ' is-disabled') + '" data-admin-icon-normalized="1" data-act="' + act + '" data-id="' + r.id + '" title="' + esc(on ? title : title + ' - ' + why) + '"' + (on ? '' : ' disabled') + '><i class="' + icon + '"></i></button>';
        }
        if (role === 'cb_stp') {
            var ed = canEdit(r), why = 'Chỉ thực hiện khi báo cáo ở trạng thái Đang nhập liệu, Bị từ chối hoặc Bị trả lại';
            return btn('edit', 'edit', 'fa-solid fa-pen-to-square', 'Cập nhật', ed, why) + btn('submit', 'submit', 'fa-solid fa-paper-plane', 'Gửi phê duyệt', ed, why);
        }
        var ok = canApprove(r), lv = r.status === ST.CHO && r.submit ? r.submit.levels[r.submit.current] : null;
        var why2 = lv ? 'Báo cáo đang chờ Cấp ' + lv.level + ' - ' + lv.leaderName + ' ký duyệt' : 'Chỉ thực hiện khi báo cáo ở trạng thái Chờ duyệt';
        return btn('approve', 'accept sign', 'fa-solid fa-file-signature', 'Ký duyệt', ok, why2) + btn('reject', 'delete reject', 'fa-solid fa-ban', 'Từ chối', ok, why2);
    }

    function openCreate() {
        var html = '<div class="bctt-modal" style="width:620px;"><div class="bctt-mh"><div><div class="tt">Tạo báo cáo công tác bồi thường nhà nước</div><div class="st">Đơn vị báo cáo: ' + stpName(PROVINCES[0]) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="form-group" style="margin-bottom:12px;"><span class="form-label">Năm báo cáo<span style="color:red;">*</span></span><select class="form-control" id="bcttCYear"><option value="">-- Chọn năm báo cáo --</option><option>2027</option><option>2026</option><option>2025</option></select><div class="bctt-err" id="bcttCYearErr">Đây là trường bắt buộc</div></div>'
            + '<div class="form-group"><span class="form-label">Loại kỳ báo cáo<span style="color:red;">*</span></span><select class="form-control" id="bcttCPeriod"><option value="">-- Chọn loại kỳ báo cáo --</option>' + Object.keys(PERIODS).map(function (k) { return '<option value="' + k + '">' + PERIODS[k].label + '</option>'; }).join('') + '</select><div class="bctt-err" id="bcttCPeriodErr">Đây là trường bắt buộc</div></div>'
            + '<div class="form-hint" style="margin-top:10px;">Bộ báo cáo gồm 04 biểu mẫu: ' + FORM_CODES + '.</div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-success" id="bcttCOk"><i class="fa-solid fa-plus"></i> Tạo báo cáo</button></div></div>';
        openOv('bcttOv1', html);
        bindClose('bcttOv1');
        $('bcttCOk').onclick = function () {
            var y = $('bcttCYear').value, p = $('bcttCPeriod').value, first = null;
            [['bcttCYear', y], ['bcttCPeriod', p]].forEach(function (x) { var bad = !x[1]; $(x[0]).classList.toggle('bctt-invalid', bad); $(x[0] + 'Err').classList.toggle('on', bad); if (bad && !first) first = $(x[0]); });
            if (first) { first.focus(); return; }
            if (DB.reports.some(function (r) { return r.unitId === DEMO_UNIT && String(r.year) === y && r.period === p; })) { toast('Đơn vị đã có báo cáo của kỳ này.', 'error'); return; }
            var r = newReport(0, PROVINCES[0], +y, p, ST.DANG);
            r.id = 'BC-' + y + '-01' + (p === 'chinh_thuc' ? 'C' : '') + '-' + Date.now().toString(36).slice(-3);
            r.m41 = emptyM41(); r.m42 = emptyM42(y); r.m43 = emptyM43(); r.m04 = emptyM04();
            r.history = [{ at: nowText(), actor: me().name, action: 'Tạo báo cáo', note: '' }];
            DB.reports.push(r); save(); closeOv('bcttOv1'); toast('Đã tạo báo cáo công tác BTNN năm ' + y + '.'); showDetail(r.id);
        };
    }
    function bindClose(ovId) { $(ovId).querySelectorAll('[data-close]').forEach(function (b) { b.onclick = function () { closeOv(ovId); }; }); }

    // ---------------- MH02: Chi tiết / Nhập liệu (Sở Tư pháp) ----------------
    function fileRows(r, data, mode) {
        var issued = r.status === ST.BH;
        return FORMS.map(function (f, i) {
            var name = f.file + '_' + r.year + '_' + r.unitId + (issued ? '_signed' : '_du_thao') + '.pdf';
            return '<tr><td>' + (i + 1) + '</td><td class="text-left">' + f.code + ' - ' + f.title + '</td><td class="text-left"><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> ' + name + '</td><td>' + (issued ? 'Đã ban hành' : 'Dự thảo') + '</td>'
                + '<td><button class="bctt-link" data-fview="' + f.id + '">Xem file</button>|<button class="bctt-link" data-fdl="' + esc(name) + '">Tải file</button></td></tr>';
        }).join('');
    }
    var detailBack = null; // màn quay về khi mở chi tiết từ màn khác (VD Bộ Tư pháp xem báo cáo của Sở)
    function showDetail(id, back) {
        if (typeof back === 'function') detailBack = back; else if (view.name !== 'detail' || view.id !== id) detailBack = null;
        var r = getR(id); if (!r) return;
        view = { name: 'detail', id: id, tab: view.name === 'detail' && view.id === id ? view.tab : 'm41' };
        var ed = canEdit(r);
        var lv = r.submit && r.status === ST.CHO ? r.submit.levels[r.submit.current] : null;
        var html = '<div class="card-section"><div class="detail-header" style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px;"><div><button class="btn btn-secondary btn-sm" id="bcttBack"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
            + '<h2 style="margin-top:10px;font-size:16px;color:#1e3a8a;">' + (isBtpReport(r) ? 'Báo cáo tổng hợp công tác bồi thường nhà nước năm ' : 'Báo cáo công tác bồi thường nhà nước năm ') + r.year + ' - ' + esc(r.unitName) + '</h2>' + (!isStpRole() && !isBtpReport(r) ? '<div class="formula-hint">Bộ Tư pháp xem nhập liệu báo cáo của Sở Tư pháp (chỉ đọc).</div>' : '') + '</div><div>' + statusCell(r) + '</div></div>'
            + '<div class="section-title" style="margin-bottom:12px;"><span>Thông tin báo cáo</span></div>'
            + '<div class="bctt-meta">'
            + '<div><label>Năm báo cáo</label><strong>' + r.year + '</strong></div>'
            + '<div><label>Loại kỳ báo cáo</label><strong>' + PERIODS[r.period].label + '</strong></div>'
            + '<div><label>Thời gian số liệu</label><strong>' + r.fromDate + ' - ' + r.toDate + '</strong></div>'
            + '<div><label>Đơn vị báo cáo</label><strong>' + esc(r.unitName) + '</strong></div>'
            + '<div><label>Trạng thái</label><strong id="bcttDStatus">' + r.status + '</strong>' + (lv ? '<span class="bctt-sub">Loại trình: ' + KIND + ' - Chờ Cấp ' + lv.level + ' - ' + esc(lv.leaderName) + '</span>' : '') + '</div>'
            + '<div><label>Người lập</label><strong><img class="bctt-sig" alt="Chữ ký" src="' + sigImg(r.preparer.name) + '">' + esc(r.preparer.name) + '</strong></div>'
            + '<div><label>Ngày gửi gần nhất</label><strong>' + (r.sentAt || '--') + '</strong></div>'
            + '<div><label>Ngày ban hành</label><strong>' + (r.issued ? r.issued.at + ' - ' + esc(r.issued.signer) : '--') + '</strong></div>'
            + '</div>'
            // Báo cáo tổng hợp của Bộ: nguồn số liệu, cập nhật lại từ các Sở, xem tình hình gửi / nhập liệu của từng Sở
            + (isBtpReport(r) ? '<div class="bctt-srcbar"><div><i class="fa-solid fa-circle-info"></i> Nguồn số liệu: tổng hợp từ <strong>' + (r.src ? r.src.n : 0) + '/' + PROVINCES.length + ' Sở Tư pháp đã gửi</strong>' + (r.src ? ' (cập nhật lúc ' + esc(r.src.at) + ')' : '') + '. Ô đã sửa khác số tự tổng hợp có đánh dấu; rê chuột để xem số tự tổng hợp.</div>'
                + '<div class="bctt-srcbar-act"><button class="btn btn-secondary btn-sm" id="bcttSrcUnits"><i class="fa-solid fa-building-columns"></i> Tình hình gửi và nhập liệu của 34 Sở</button>'
                + (ed ? '<button class="btn btn-secondary btn-sm" id="bcttSrcSync"><i class="fa-solid fa-rotate"></i> Cập nhật số liệu từ các Sở</button>' : '') + '</div></div>' : '')
            // Báo cáo của Bộ: nhắc cập nhật khi có Sở Tư pháp bị trả lại / đã gửi lại sau lần tổng hợp gần nhất
            + (isBtpReport(r) && r.srcDirty && r.srcDirty.length ? '<div class="bctt-alert" id="bcttDirtyBox" style="background:#fffbeb;border-color:#fde68a;border-left-color:#d97706;color:#78350f;"><b class="t" style="color:#92400e;">CÓ SỞ TƯ PHÁP BỊ TRẢ LẠI / ĐÃ GỬI LẠI SAU LẦN TỔNG HỢP GẦN NHẤT</b>' + r.srcDirty.map(function (x) { return '- ' + esc(x.unit) + ': ' + esc(x.what) + ' lúc ' + esc(x.at); }).join('<br>') + (ed ? '<br>Bấm <strong>Cập nhật số liệu từ các Sở</strong> để tổng hợp lại.' : '') + '</div>' : '')
            // Báo cáo Sở Tư pháp bị Bộ Tư pháp trả lại
            + (r.status === ST.TL && r.returned ? '<div class="bctt-alert" id="bcttReturnBox"><b class="t">BÁO CÁO BỊ BỘ TƯ PHÁP TRẢ LẠI</b>Lý do trả lại: <strong>' + esc(r.returned.reason) + '</strong><br>Người trả lại: ' + esc(r.returned.by) + ' (Bộ Tư pháp) • Thời điểm: ' + esc(r.returned.at) + '</div>' : '')
            + (r.status === ST.TC && r.reject ? '<div class="bctt-alert" id="bcttRejectBox"><b class="t">BÁO CÁO BỊ LÃNH ĐẠO TỪ CHỐI</b>Lý do từ chối: <strong>' + esc(r.reject.reason) + '</strong><br>Người từ chối: ' + esc(r.reject.byName) + ' (Cấp ' + r.reject.level + ') • Thời điểm: ' + esc(r.reject.at) + '</div>' : '')
            + '<div class="bctt-files"><div class="section-title" style="margin-bottom:10px;"><span>Tệp báo cáo (' + (r.status === ST.BH ? 'đã ban hành' : 'dự thảo') + ')</span></div><div class="table-container"><table class="custom-table" id="bcttFileTable"><thead><tr><th>STT</th><th>Biểu mẫu</th><th>Tên tệp</th><th>Loại tệp</th><th>Thao tác</th></tr></thead><tbody>' + fileRows(r) + '</tbody></table></div></div>'
            // Tài liệu ban hành kèm theo / không ban hành kèm theo của lần trình (khối rỗng / không có quyền xem thì không hiển thị)
            + (r.submit && typeof window.tlktViewHtml === 'function' ? '<div style="margin-top:12px;">' + window.tlktViewHtml(r.submit.tlkt || [], { ownerUnit: r.unitId }) + '</div>' : '')
            + '</div>';
        html += '<div class="card-section"><div class="bctt-tabs" id="bcttTabs">' + FORMS.map(function (f) { return '<button class="bctt-tab" data-tab="' + f.id + '">' + f.code + ' - ' + (f.id === 'm43' ? 'Tổng hợp tình hình' : (f.id === 'm04' ? 'Tình hình hoàn trả' : f.title)) + '</button>'; }).join('')
            + '<button class="bctt-tab" data-tab="hist">Lịch sử xử lý</button></div>'
            + '<div class="bctt-panel" id="bcttP_m41"></div><div class="bctt-panel" id="bcttP_m42"></div><div class="bctt-panel" id="bcttP_m43"></div><div class="bctt-panel" id="bcttP_m04"></div><div class="bctt-panel" id="bcttP_hist"></div></div>';
        var acts = '<button class="btn btn-secondary" id="bcttBack2"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
            + '<button class="btn btn-secondary" id="bcttPreview"><i class="fa-solid fa-file-pdf"></i> Xem trước PDF</button>';
        if (ed) acts += '<button class="btn btn-primary" id="bcttSave"><i class="fa-solid fa-floppy-disk"></i> Lưu</button><button class="btn btn-success" id="bcttSubmit"><i class="fa-solid fa-paper-plane"></i> Gửi phê duyệt</button>';
        if (canApprove(r)) acts += '<button class="btn btn-danger" id="bcttRej"><i class="fa-solid fa-ban"></i> Từ chối</button><button class="btn btn-primary" id="bcttApp1"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>';
        if (canReturn(r)) acts += '<button class="btn btn-warning" id="bcttReturn"><i class="fa-solid fa-rotate-left"></i> Trả lại</button>';
        html += '<div class="card-section"><div class="toolbar-row" style="justify-content:flex-end;margin:0;">' + acts + '</div></div>';
        $('bcttApp').innerHTML = html;
        if (!r.m04) r.m04 = emptyM04();
        renderM41Tab(r, ed); renderM42Tab(r, ed); renderM43Tab(r, ed); renderM04Tab(r, ed); renderHist(r);
        switchTab(view.tab);
        $('bcttTabs').onclick = function (e) { var b = e.target.closest('[data-tab]'); if (b) switchTab(b.getAttribute('data-tab')); };
        $('bcttBack').onclick = $('bcttBack2').onclick = function () { var b = detailBack; detailBack = null; (b || showList)(); };
        if ($('bcttSrcUnits')) $('bcttSrcUnits').onclick = function () { if (ed) collect(r); showBtp(r.year, r.period); };
        if ($('bcttSrcSync')) $('bcttSrcSync').onclick = function () { confirmSync(r); };
        if ($('bcttReturn')) $('bcttReturn').onclick = function () { openReturn(r); };
        $('bcttPreview').onclick = function () { if (ed) collect(r); openViewer(r, null, 'Xem trước bộ báo cáo (PDF)'); };
        if (ed) { $('bcttSave').onclick = function () { collect(r); hist(r, me().name, 'Lưu báo cáo'); save(); toast('Đã lưu báo cáo.'); showDetail(r.id); };
            $('bcttSubmit').onclick = function () { collect(r); save(); openSubmit(r.id); }; }
        if ($('bcttApp1')) { $('bcttApp1').onclick = function () { openSign(r.id, 'approve'); }; $('bcttRej').onclick = function () { openSign(r.id, 'reject'); }; }
        bindFileTable('bcttFileTable', r);
        refreshShared();
    }
    // Cập nhật số liệu báo cáo của Bộ từ báo cáo Đã ban hành mới nhất của các Sở: ghi đè toàn bộ số liệu 04 biểu mẫu (kể cả ô Bộ đã sửa); giữ Năm báo cáo, Ngày báo cáo
    function confirmSync(r) {
        var a = btpAuto(DB.reports, r.year, r.period);
        var html = '<div class="bctt-modal" style="width:560px;"><div class="bctt-mh"><div><div class="tt">Cập nhật số liệu từ các Sở Tư pháp</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><p>Hệ thống tổng hợp lại số liệu 04 biểu mẫu từ báo cáo đã gửi của <strong>' + a.src.n + '/' + PROVINCES.length + ' Sở Tư pháp</strong>.</p><p style="margin-top:8px;">Số liệu Bộ Tư pháp đã sửa trên báo cáo tổng hợp sẽ bị ghi đè. Bạn có muốn tiếp tục?</p></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-primary" id="bcttSyncOk"><i class="fa-solid fa-rotate"></i> Cập nhật</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        $('bcttSyncOk').onclick = function () {
            applyAuto(r, a); hist(r, me().name, 'Cập nhật số liệu từ các Sở', 'Tổng hợp từ ' + a.src.n + '/' + PROVINCES.length + ' Sở Tư pháp đã gửi.');
            save(); closeOv('bcttOv2'); toast('Đã cập nhật số liệu từ ' + a.src.n + ' Sở Tư pháp đã gửi.'); showDetail(r.id);
        };
    }
    // Báo cáo của Bộ - Mẫu 43 / Mẫu số 04: chuyển giữa chế độ nhập liệu và chế độ "Xem chi tiết theo Sở Tư pháp" (ô số liệu là link mở popup theo 34 Sở)
    var btpDet = { m43: false, m04: false };
    function detToggle(form) {
        return btpDet[form] ? '<button class="btn btn-secondary btn-sm" data-dettg="' + form + '"><i class="fa-solid fa-pen-to-square"></i> Quay lại bảng số liệu</button>'
            : '<button class="btn btn-secondary btn-sm" data-dettg="' + form + '"><i class="fa-solid fa-magnifying-glass"></i> Xem chi tiết theo Sở Tư pháp</button>';
    }
    function bindBtpTab(r, form, p, rerender) {
        markChanged(r, form, form === 'm43' ? 'bcttM43' : 'bcttM04');
        onClk(p, function (e) {
            var t = e.target.closest('[data-dettg]'), cell = e.target.closest('[data-cell]');
            if (t) { btpDet[form] = !btpDet[form]; rerender(); }
            if (cell) { var x = cell.getAttribute('data-cell').split(':'); openCellDetail(r, form, x[0], +x[1]); }
        });
    }
    // Báo cáo của Bộ - Mẫu 43 / Mẫu số 04: đánh dấu ô đã sửa khác số tự tổng hợp (title hiển thị số tự tổng hợp)
    function markChanged(r, form, tid) {
        var t = $(tid), base = r.base && r.base[form]; if (!t || !base) return;
        t.querySelectorAll('input[data-c]').forEach(function (i) {
            var b = num(base[i.getAttribute('data-g')] && base[i.getAttribute('data-g')][i.getAttribute('data-c')]), money = (form === 'm43' ? M43_MONEY : M04_MONEY)[i.getAttribute('data-c')];
            var chg = num(i.value) !== b;
            i.classList.toggle('bctt-chg', chg); i.title = chg ? 'Đã sửa. Số tự tổng hợp: ' + fmt(b, money) : 'Số tự tổng hợp từ các Sở Tư pháp';
        });
    }
    // Popup chi tiết ô số liệu theo 34 Sở Tư pháp (chỉ đọc) từ báo cáo của Bộ; click tên Sở đã gửi -> xem báo cáo của Sở
    function openCellDetail(r, form, g, c) {
        var grp = GROUPS.find(function (q) { return q.k === g; }), isM43 = form === 'm43', money = (isM43 ? M43_MONEY : M04_MONEY)[c];
        var rowOf = function (x) { return isM43 ? m43Row(x.m43[g])[c] : m04Row((x.m04 || {})[g])[c]; };
        var tot = 0, n = 0;
        var rows = PROVINCES.map(function (p, i) {
            var sr = DB.reports.find(function (x) { return !isBtpReport(x) && x.province === p && x.year === r.year && x.period === r.period; }), ok = sr && sr.status === ST.BH, v = ok ? rowOf(sr) : 0;
            if (ok) { tot += v; n++; }
            return '<tr><td>' + (i + 1) + '</td><td class="text-left">' + (ok ? '<button class="bctt-link" data-srid="' + sr.id + '">' + esc(stpName(p)) + '</button>' : esc(stpName(p))) + '</td><td>' + (ok ? '<span class="badge badge-success">Đã gửi</span>' : '<span class="badge badge-muted">Chưa gửi</span>') + '</td><td style="text-align:right;">' + (ok ? fmt(v, money) : '--') + '</td></tr>';
        }).join('');
        var cur = isM43 ? m43Row(r.m43[g])[c] : m04Row(r.m04[g])[c];
        var html = '<div class="bctt-modal" style="width:820px;"><div class="bctt-mh"><div><div class="tt">Chi tiết số liệu theo Sở Tư pháp - ' + (isM43 ? 'Mẫu 43/BTNN' : 'Mẫu số 04 (TT 08/2019)') + '</div><div class="st">Nhóm ' + g + ' - ' + grp.name + ' • Cột ' + c + ': ' + esc((isM43 ? M43_LABELS : M04_LABELS)[c]) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="bctt-meta" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:12px;"><div><label>Tổng ' + n + ' Sở Tư pháp đã gửi</label><strong>' + fmt(tot, money) + '</strong></div><div><label>Số trên báo cáo của Bộ</label><strong>' + fmt(cur, money) + (cur !== tot ? ' <span class="bctt-adj">Đã sửa</span>' : '') + '</strong></div></div>'
            + '<div class="table-container" style="max-height:52vh;overflow:auto;"><table class="custom-table" id="bcttCellDet"><thead><tr><th>STT</th><th>Sở Tư pháp</th><th>Tình hình gửi</th><th>Số liệu</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Đóng</button></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        onClk($('bcttCellDet'), function (e) { var b = e.target.closest('[data-srid]'); if (b) { closeOv('bcttOv1'); if (canEdit(r)) collect(r); var bid = r.id; showDetail(b.getAttribute('data-srid'), function () { showDetail(bid); }); } });
    }
    function bindFileTable(tid, r, data) {
        var t = $(tid); if (!t) return;
        onClk(t, function (e) {
            var v = e.target.closest('[data-fview]'), d = e.target.closest('[data-fdl]');
            if (v) { var rr = v.getAttribute('data-rid') ? getR(v.getAttribute('data-rid')) : r; openViewer(rr, v.getAttribute('data-fview'), 'Xem file', data); }
            if (d) toast('Đã tải xuống tệp ' + d.getAttribute('data-fdl') + '.');
            // Bộ Tư pháp: click dòng Sở Tư pháp đã gửi -> xem chi tiết báo cáo (04 biểu mẫu); click vào link / nút trong dòng thì không mở
            var row = e.target.closest('tr[data-vrow]');
            if (row && !v && !d && !e.target.closest('a, button, input, select, textarea')) { var ky = { y: btpState.year, p: btpState.period }; showDetail(row.getAttribute('data-vrow'), function () { showBtp(ky.y, ky.p); }); }
        });
    }
    function switchTab(t) {
        view.tab = t;
        document.querySelectorAll('#bcttTabs .bctt-tab').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tab') === t); });
        document.querySelectorAll('#bcttApp > .card-section .bctt-panel').forEach(function (p) { p.classList.toggle('active', p.id === 'bcttP_' + t); });
        autoGrowIn($('bcttP_' + t));
    }

    // ----- Tab Mẫu 41 -----
    function m41TableHtml(m41, ed, opts) {
        opts = opts || {};
        var extra = opts.unitCol ? 1 : 0;
        var html = '<table class="custom-table bctt-m41" id="' + (opts.tid || 'bcttM41') + '"><thead><tr><th style="width:44px;">STT</th>' + M41_COLS.map(function (c) { return '<th>' + c.label + '<br>(' + c.no + ')</th>'; }).join('')
            + (opts.unitCol ? '<th>Sở Tư pháp</th>' : '') + ((ed || opts.adjust) ? '<th style="width:80px;">Thao tác</th>' : '') + '</tr></thead><tbody>';
        var total = 0, span = 7 + extra + ((ed || opts.adjust) ? 1 : 0);
        var col = m41Collapsed[opts.tid || 'bcttM41'] || {};
        GROUPS.forEach(function (g) {
            var rows = m41[g.k] || []; total += rows.length;
            var hid = col[g.k] ? ' m41-hide' : '';
            html += '<tr class="g' + (col[g.k] ? ' collapsed' : '') + '" data-g41="' + g.k + '"><td>' + g.k + '</td><td colspan="' + (span - 1) + '"><button type="button" class="m41-tg" data-m41tg="' + g.k + '" aria-expanded="' + (col[g.k] ? 'false' : 'true') + '"><i class="fa-solid fa-chevron-down m42-chev"></i>' + g.name + ' (' + rows.length + ' vụ việc)</button></td></tr>';
            rows.forEach(function (row, i) {
                html += '<tr class="m41-r' + hid + '" data-gk="' + g.k + '"><td>' + (i + 1) + '</td>' + M41_COLS.map(function (c) {
                    return ed ? '<td><textarea class="bctt-in bctt-ag" rows="2" data-g="' + g.k + '" data-i="' + i + '" data-k="' + c.k + '" placeholder="' + (c.k === 'hoTen' ? 'Nhập họ và tên' : 'Nhập nội dung') + '">' + esc(row[c.k]) + '</textarea><div class="bctt-err">Đây là trường bắt buộc</div></td>' : '<td class="text-left">' + esc(row[c.k]) + '</td>';
                }).join('') + (opts.unitCol ? '<td class="text-left">' + esc(row._unit) + (row._adj ? '<span class="bctt-adj">Đã điều chỉnh</span>' : '') + '</td>' : '')
                    + (ed ? '<td><button class="icon-btn danger" title="Xóa" data-del="' + g.k + ':' + i + '"><i class="fa-solid fa-trash"></i></button></td>' : '')
                    + (opts.adjust ? '<td><button class="icon-btn" title="Điều chỉnh" data-adj41="' + row._rid + ':' + g.k + ':' + row._idx + '"><i class="fa-solid fa-pen"></i></button></td>' : '') + '</tr>';
            });
            if (ed) html += '<tr class="add-row m41-r' + hid + '" data-gk="' + g.k + '"><td colspan="' + span + '" style="text-align:left;"><button class="btn btn-secondary btn-sm" data-add="' + g.k + '"><i class="fa-solid fa-plus"></i> Thêm vụ việc</button></td></tr>';
        });
        html += '<tr class="t"><td></td><td class="text-left">Tổng cộng</td><td colspan="' + (span - 2) + '" class="text-left">' + total + ' vụ việc</td></tr></tbody></table>';
        return html;
    }
    // Mẫu 41: mỗi nhóm lĩnh vực (I - VI) thu gọn / mở rộng (mặc định mở); trạng thái giữ khi thêm / xóa dòng
    var m41Collapsed = {};
    function m41AllBtns(tid) {
        return '<div class="m42-bar-act"><button type="button" class="btn btn-secondary btn-sm" data-m41all="1" data-tid="' + tid + '"><i class="fa-solid fa-angles-down"></i> Mở rộng tất cả</button><button type="button" class="btn btn-secondary btn-sm" data-m41all="0" data-tid="' + tid + '"><i class="fa-solid fa-angles-up"></i> Thu gọn tất cả</button></div>';
    }
    function m41SetGroup(tid, g, collapsed) {
        var t = $(tid); if (!t) return;
        (m41Collapsed[tid] = m41Collapsed[tid] || {})[g] = collapsed;
        var gr = t.querySelector('tr[data-g41="' + g + '"]');
        if (gr) { gr.classList.toggle('collapsed', collapsed); gr.querySelector('[data-m41tg]').setAttribute('aria-expanded', collapsed ? 'false' : 'true'); }
        t.querySelectorAll('tr[data-gk="' + g + '"]').forEach(function (tr) { tr.classList.toggle('m41-hide', collapsed); });
        if (!collapsed) autoGrowIn(t);
    }
    // Xử lý chung click thu gọn / mở rộng nhóm Mẫu 41; trả về true nếu đã xử lý
    function m41ToggleClick(e) {
        var tg = e.target.closest('[data-m41tg]'), all = e.target.closest('[data-m41all]');
        if (tg) { var tb = tg.closest('table'); m41SetGroup(tb.id, tg.getAttribute('data-m41tg'), !(m41Collapsed[tb.id] || {})[tg.getAttribute('data-m41tg')]); return true; }
        if (all) { var tid = all.getAttribute('data-tid'), c = all.getAttribute('data-m41all') !== '1'; GROUPS.forEach(function (g) { m41SetGroup(tid, g.k, c); }); return true; }
        return false;
    }
    function renderM41Tab(r, ed) {
        var p = $('bcttP_m41');
        p.innerHTML = '<div class="toolbar-row" style="justify-content:space-between;align-items:center;"><div class="formula-hint">Cơ quan lập danh mục: <strong>' + esc(r.unitName) + '</strong>. Danh mục vụ việc theo 06 nhóm lĩnh vực.</div>' + m41AllBtns('bcttM41') + '</div>'
            + '<div class="table-container">' + m41TableHtml(r.m41, ed, { unitCol: isBtpReport(r) }) + '</div>';
        p.oninput = function (e) { if (e.target.classList && e.target.classList.contains('bctt-ag')) autoGrow(e.target); };
        autoGrowIn(p);
        onClk(p, function (e) {
            if (m41ToggleClick(e)) return;
            if (!ed) return;
            var a = e.target.closest('[data-add]'), d = e.target.closest('[data-del]');
            if (a) { collect(r); r.m41[a.getAttribute('data-add')].push({ hoTen: '', diaChi: '', coQuan: '', tinhHinh: '', khoKhan: '', ghiChu: '' }); renderM41Tab(r, true); }
            if (d) { collect(r); var x = d.getAttribute('data-del').split(':'); r.m41[x[0]].splice(+x[1], 1); renderM41Tab(r, true); toast('Đã xóa vụ việc khỏi danh mục.'); }
        });
    }
    // ----- Tab Mẫu 42 -----
    function m42Head(h, m) { return h.replace('{nam}', m.nam || '……').replace('{namKeHoach}', m.nam ? String(+m.nam + 1) : '……'); }
    // Mẫu 42: mỗi phần (I, II, III) và mỗi mục (1, 2, 3) là 01 khối thu gọn / mở rộng (mặc định mở); ô nhập tự giãn theo nội dung
    function m42Toggle(title, cls, body) {
        return '<div class="m42-box ' + cls + '"><button type="button" class="m42-tg" data-m42tg aria-expanded="true"><i class="fa-solid fa-chevron-down m42-chev"></i><span>' + esc(title) + '</span></button><div class="m42-body">' + body + '</div></div>';
    }
    function renderM42Tab(r, ed) {
        var m = r.m42, dis = ed ? '' : ' disabled';
        function item(it) {
            var id = 'bcttM42_' + it.k;
            return '<div class="m42-it">' + (it.label ? '<label for="' + id + '">- ' + esc(m42Head(it.label, m)) + '</label>' : '')
                + '<textarea class="bctt-ta m42-ta" id="' + id + '" data-m42="' + it.k + '" rows="2" maxlength="4000" placeholder="Nhập nội dung báo cáo"' + dis + '>' + esc(m.items[it.k]) + '</textarea></div>';
        }
        var html = '<div class="bctt-m42 m42-form"><div class="m42-bar"><div class="formula-hint">Nhập nội dung theo từng mục của Mẫu 42/BTNN. Ô nhập tự giãn theo độ dài nội dung.</div>'
            + '<div class="m42-bar-act"><button type="button" class="btn btn-secondary btn-sm" data-m42all="1"><i class="fa-solid fa-angles-down"></i> Mở rộng tất cả</button><button type="button" class="btn btn-secondary btn-sm" data-m42all="0"><i class="fa-solid fa-angles-up"></i> Thu gọn tất cả</button></div></div>'
            + '<div class="m42-head">'
            + '<div class="m42-f"><label>Cơ quan báo cáo</label><div class="m42-ro">' + esc(r.unitName) + '</div></div>'
            + '<div class="m42-f"><label>Địa danh</label><div class="m42-ro">' + esc(placeOf(r)) + '</div></div>'
            + '<div class="m42-f"><label for="bcttM42Nam">Năm báo cáo<span style="color:red;">*</span></label><input class="form-control" id="bcttM42Nam" maxlength="4" inputmode="numeric" value="' + esc(m.nam) + '" placeholder="Nhập năm báo cáo"' + dis + '><div class="bctt-err" id="bcttM42NamErr">Đây là trường bắt buộc</div></div>'
            + '<div class="m42-f"><label for="bcttM42Ngay">Ngày báo cáo<span style="color:red;">*</span></label><input class="form-control" id="bcttM42Ngay" value="' + esc(m.ngay) + '" placeholder="dd/mm/yyyy"' + dis + '><div class="bctt-err" id="bcttM42NgayErr">Đây là trường bắt buộc</div></div>'
            + '</div>';
        M42_SECTIONS.forEach(function (s) {
            var body = s.sub ? s.sub.map(function (b) { return m42Toggle(b.h, 'm42-blk', b.items.map(item).join('')); }).join('') : s.items.map(item).join('');
            html += m42Toggle(m42Head(s.h, m), 'm42-sec', body);
        });
        var p = $('bcttP_m42');
        p.innerHTML = html + '</div>';
        onClk(p, function (e) {
            var t = e.target.closest('[data-m42tg]'), a = e.target.closest('[data-m42all]');
            if (t) { var box = t.parentNode, c = !box.classList.contains('collapsed'); box.classList.toggle('collapsed', c); t.setAttribute('aria-expanded', c ? 'false' : 'true'); if (!c) autoGrowIn(box); }
            if (a) { var open = a.getAttribute('data-m42all') === '1'; p.querySelectorAll('.m42-box').forEach(function (b) { b.classList.toggle('collapsed', !open); b.querySelector('[data-m42tg]').setAttribute('aria-expanded', open ? 'true' : 'false'); }); if (open) autoGrowIn(p); }
        });
        p.addEventListener('input', function (e) { if (e.target.classList && e.target.classList.contains('m42-ta')) autoGrow(e.target); });
        autoGrowIn(p);
    }
    // Textarea tự giãn chiều cao theo nội dung (không thanh cuộn trong ô); bỏ qua khi khối đang ẩn (chưa đo được)
    function autoGrow(t) { if (!t.offsetParent) return; t.style.height = 'auto'; t.style.height = (t.scrollHeight + 2) + 'px'; }
    function autoGrowIn(el) { if (el) el.querySelectorAll('textarea.m42-ta, textarea.bctt-ag').forEach(autoGrow); }
    // ----- Tab Mẫu 43 -----
    function m43Head() {
        return '<thead><tr><th rowspan="5" style="min-width:150px;">STT</th><th rowspan="5">Tổng số</th><th colspan="8">Thụ lý vụ việc</th><th colspan="14">Tình hình giải quyết vụ việc</th><th colspan="3">Chi trả tiền bồi thường</th></tr>'
            + '<tr><th colspan="4">Số vụ việc thụ lý mới</th><th colspan="4">Số vụ việc kỳ trước chuyển sang</th><th colspan="6">Đã có văn bản giải quyết bồi thường có hiệu lực pháp luật</th><th colspan="5">Đang giải quyết</th><th colspan="2">Đình chỉ</th><th rowspan="4">Đưa ra khỏi danh sách</th><th rowspan="4">Số vụ việc đã chi trả</th><th rowspan="4">Số tiền đã chi trả theo quyết định có hiệu lực của cơ quan trực tiếp quản lý người thi hành công vụ (nghìn đồng)</th><th rowspan="4">Số tiền đã chi trả theo bản án, quyết định có hiệu lực của Tòa án (nghìn đồng)</th></tr>'
            + '<tr><th rowspan="3">Thụ lý tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại</th><th colspan="3">Thụ lý tại Tòa án</th><th rowspan="3">Thụ lý tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại</th><th colspan="3">Thụ lý của Tòa án</th>'
            + '<th rowspan="3">Tổng số vụ việc</th><th rowspan="3">Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại</th><th colspan="3">Tại Tòa án</th><th rowspan="3">Số tiền bồi thường (nghìn đồng)</th>'
            + '<th rowspan="3">Tổng số</th><th rowspan="3">Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại</th><th colspan="3">Đang giải quyết tại Tòa án</th><th rowspan="3">Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại</th><th rowspan="3">Tại Tòa án theo thủ tục tố tụng</th></tr>'
            + '<tr><th colspan="2">Khởi kiện vụ án dân sự</th><th rowspan="2">Yêu cầu bồi thường trong quá trình tố tụng hình sự, tố tụng hành chính</th><th colspan="2">Khởi kiện vụ án dân sự</th><th rowspan="2">Yêu cầu bồi thường trong quá trình tố tụng hình sự, tố tụng hành chính</th>'
            + '<th colspan="2">Khởi kiện vụ án dân sự</th><th rowspan="2">Trong quá trình tố tụng hình sự, tố tụng hành chính</th><th colspan="2">Khởi kiện vụ án dân sự</th><th rowspan="2">Trong quá trình tố tụng hình sự, tố tụng hành chính</th></tr>'
            + '<tr>' + [1, 2, 3, 4].map(function () { return '<th>Theo điểm a khoản 1 Điều 52</th><th>Theo điểm b khoản 1 và khoản 2 Điều 52</th>'; }).join('') + '</tr>'
            + '<tr class="column-number-row">' + Array.from({ length: 27 }, function (_, i) { return '<th>' + (i + 1) + '</th>'; }).join('') + '</tr></thead>';
    }
    // mode: 'edit' (ô nhập), 'view', 'agg' (ô bấm xem chi tiết theo Sở)
    function m43TableHtml(m43, mode, tid) {
        var tot = m43Total(m43);
        var html = '<table class="custom-table bctt-m43" id="' + (tid || 'bcttM43') + '">' + m43Head() + '<tbody>';
        html += '<tr class="t"><td>Tổng cộng</td>' + rowCells(tot, 'view', '') + '</tr>';
        GROUPS.forEach(function (g) {
            var r = m43Row(m43[g.k]);
            html += '<tr class="g"><td>' + g.k + '</td><td colspan="26">' + g.name + '</td></tr>';
            html += '<tr data-g="' + g.k + '"><td></td>' + rowCells(r, mode, g.k) + '</tr>';
        });
        return html + '</tbody></table>';
    }
    function rowCells(r, mode, g) {
        var s = '';
        for (var c = 2; c <= 27; c++) {
            var f = !!M43_FORMULA[c], v = fmt(r[c], M43_MONEY[c]);
            if (f) s += '<td class="f" data-col="' + c + '" title="Cột ' + c + ' = ' + M43_FORMULA[c].map(function (x) { return 'Cột ' + x; }).join(' + ') + '">' + v + '</td>';
            else if (mode === 'edit') s += '<td>' + numInput(g, c, r[c], M43_MONEY[c]) + '</td>';
            else if (mode === 'agg') s += '<td><button class="cell-link" data-cell="' + g + ':' + c + '" title="Xem chi tiết theo Sở Tư pháp">' + v + '</button></td>';
            else s += '<td>' + v + '</td>';
        }
        return s;
    }
    function renderM43Tab(r, ed) {
        var p = $('bcttP_m43');
        p.innerHTML = '<div class="toolbar-row" style="justify-content:space-between;"><div class="formula-hint">Số liệu tính từ ' + r.fromDate + ' đến ' + r.toDate + '. Ô tổng tự tính: Cột 2 = Cột 3+4+5+6+7+8+9+10; Cột 11 = Cột 12+13+14+15; Cột 17 = Cột 18+19+20+21. Cột 16, 26, 27 đơn vị nghìn đồng.</div>' + (isBtpReport(r) ? detToggle('m43') : '') + '</div>'
            + '<div class="table-container">' + m43TableHtml(r.m43, isBtpReport(r) && btpDet.m43 ? 'agg' : (ed ? 'edit' : 'view')) + '</div>';
        if (isBtpReport(r)) bindBtpTab(r, 'm43', p, function () { renderM43Tab(r, ed); });
        if (ed) p.oninput = function (e) {
            var i = e.target.closest('input[data-c]'); if (!i) return;
            r.m43[i.getAttribute('data-g')][i.getAttribute('data-c')] = num(i.value);
            refreshM43Formulas(r.m43, 'bcttM43');
            if (isBtpReport(r)) markChanged(r, 'm43', 'bcttM43');
        };
    }
    function refreshM43Formulas(m43, tid) {
        var t = $(tid); if (!t) return;
        GROUPS.forEach(function (g) {
            var r = m43Row(m43[g.k]), tr = t.querySelector('tr[data-g="' + g.k + '"]');
            Object.keys(M43_FORMULA).forEach(function (c) { var td = tr.querySelector('td.f[data-col="' + c + '"]'); if (td) td.textContent = fmt(r[c]); });
        });
        var tot = m43Total(m43), trt = t.querySelector('tr.t');
        trt.innerHTML = '<td>Tổng cộng</td>' + rowCells(tot, 'view', '');
    }
    // ----- Tab Mẫu số 04 (TT 08/2019) - Tình hình thực hiện trách nhiệm hoàn trả -----
    function m04Head() {
        return '<thead><tr><th rowspan="3" style="min-width:150px;">STT</th><th rowspan="3">Số tiền đã chi trả xong cho người yêu cầu bồi thường (nghìn đồng)</th><th colspan="6">Xem xét trách nhiệm hoàn trả</th><th colspan="2">Giảm mức hoàn trả</th><th rowspan="3">Số vụ việc hoãn hoàn trả (vụ việc)</th><th colspan="3">Số tiền đã hoàn trả</th><th rowspan="3">Số tiền còn phải hoàn trả (nghìn đồng)</th></tr>'
            + '<tr><th rowspan="2">Tổng số vụ việc xem xét</th><th colspan="2">Số vụ việc đã xem xét</th><th rowspan="2">Số vụ việc đang xem xét (vụ việc)</th><th colspan="2">Số vụ việc không xem xét (vụ việc)</th><th rowspan="2">Số vụ việc (vụ việc)</th><th rowspan="2">Số tiền (nghìn đồng)</th><th rowspan="2">Tổng số (nghìn đồng)</th><th rowspan="2">Số tiền đã hoàn trả trong kỳ báo cáo (nghìn đồng)</th><th rowspan="2">Số tiền đã hoàn trả kỳ trước chuyển sang (nghìn đồng)</th></tr>'
            + '<tr><th>Số vụ việc có Quyết định có hiệu lực pháp luật và đã thực hiện hoàn trả (vụ việc)</th><th>Số tiền phải hoàn trả (nghìn đồng)</th><th>Người thi hành công vụ không có lỗi</th><th>Người thi hành công vụ chết trước khi ra quyết định hoàn trả</th></tr>'
            + '<tr class="column-number-row">' + Array.from({ length: 15 }, function (_, i) { return '<th>' + (i + 1) + '</th>'; }).join('') + '</tr></thead>';
    }
    // mode: 'edit' (ô nhập), 'view', 'agg' (ô bấm xem chi tiết theo Sở)
    function m04TableHtml(m04, mode, tid) {
        // Theo mẫu gốc: dòng tổng ngay dưới dòng số thứ tự cột, sau đó 06 nhóm I - VI
        var html = '<table class="custom-table bctt-m04" id="' + (tid || 'bcttM04') + '">' + m04Head() + '<tbody>';
        html += '<tr class="t"><td>Tổng cộng</td>' + rowCells04(m04Total(m04), 'view', '') + '</tr>';
        GROUPS.forEach(function (g) {
            html += '<tr class="g"><td>' + g.k + '</td><td colspan="14">' + g.name + '</td></tr>';
            html += '<tr data-g="' + g.k + '"><td></td>' + rowCells04(m04Row(m04[g.k]), mode, g.k) + '</tr>';
        });
        return html + '</tbody></table>';
    }
    // Ô nhập số: cột tiền hiển thị và nhập có dấu chấm phân cách hàng nghìn (tự định dạng khi gõ), căn phải; dữ liệu lưu là số
    function numInput(g, c, v, money, extra) {
        return money ? '<input class="bctt-in bctt-num bctt-money" type="text" inputmode="numeric" maxlength="19" data-g="' + g + '" data-c="' + c + '"' + (extra || '') + ' value="' + fmt(v, true) + '">'
            : '<input class="bctt-in bctt-num" type="number" min="0" data-g="' + g + '" data-c="' + c + '"' + (extra || '') + ' value="' + (Number(v) || 0) + '">';
    }
    function fmtMoneyInput(el) {
        var raw = el.value, pos = el.selectionStart == null ? raw.length : el.selectionStart;
        var right = raw.slice(pos).replace(/\D/g, '').length, d = raw.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
        el.value = d ? Number(d).toLocaleString('vi-VN') : '';
        var p = el.value.length, cnt = 0;
        while (p > 0 && cnt < right) { p--; if (/\d/.test(el.value[p])) cnt++; }
        try { el.setSelectionRange(p, p); } catch (e) { /* bỏ qua */ }
    }
    function rowCells04(r, mode, g) {
        var s = '';
        for (var c = 2; c <= 15; c++) {
            var f = !!M04_FORMULA[c], v = fmt(r[c], M04_MONEY[c]);
            if (f) s += '<td class="f" data-col="' + c + '" title="Cột ' + c + ' = ' + M04_FORMULA[c].map(function (x) { return 'Cột ' + x; }).join(' + ') + '">' + v + '</td>';
            else if (mode === 'edit') s += '<td>' + numInput(g, c, r[c], M04_MONEY[c]) + '</td>';
            else if (mode === 'agg') s += '<td><button class="cell-link" data-cell="' + g + ':' + c + '" title="Xem chi tiết theo Sở Tư pháp">' + v + '</button></td>';
            else s += '<td>' + v + '</td>';
        }
        return s;
    }
    function renderM04Tab(r, ed) {
        var p = $('bcttP_m04');
        p.innerHTML = '<div class="toolbar-row" style="justify-content:space-between;"><div class="formula-hint">Số liệu tính từ ' + r.fromDate + ' đến ' + r.toDate + '. Ô tổng tự tính: Cột 3 = Cột 4 + 6; Cột 12 = Cột 13 + 14. Cột 2, 5, 10, 12, 13, 14, 15 đơn vị nghìn đồng.</div>' + (isBtpReport(r) ? detToggle('m04') : '') + '</div>'
            + '<div class="table-container">' + m04TableHtml(r.m04, isBtpReport(r) && btpDet.m04 ? 'agg' : (ed ? 'edit' : 'view')) + '</div>';
        if (isBtpReport(r)) bindBtpTab(r, 'm04', p, function () { renderM04Tab(r, ed); });
        if (ed) p.oninput = function (e) {
            var i = e.target.closest('input[data-c]'); if (!i) return;
            r.m04[i.getAttribute('data-g')][i.getAttribute('data-c')] = num(i.value);
            refreshM04Formulas(r.m04, 'bcttM04');
            if (isBtpReport(r)) markChanged(r, 'm04', 'bcttM04');
        };
    }
    function refreshM04Formulas(m04, tid) {
        var t = $(tid); if (!t) return;
        GROUPS.forEach(function (g) {
            var r = m04Row(m04[g.k]), tr = t.querySelector('tr[data-g="' + g.k + '"]');
            Object.keys(M04_FORMULA).forEach(function (c) { var td = tr.querySelector('td.f[data-col="' + c + '"]'); if (td) td.textContent = fmt(r[c], M04_MONEY[c]); });
        });
        t.querySelector('tr.t').innerHTML = '<td>Tổng cộng</td>' + rowCells04(m04Total(m04), 'view', '');
    }
    function renderHist(r) {
        $('bcttP_hist').innerHTML = '<ul class="bctt-tl">' + r.history.slice().reverse().map(function (h) {
            return '<li><span class="av">' + esc(initials(h.actor)) + '</span><div><strong>' + esc(h.actor) + '</strong> <span style="color:#64748b;">' + esc(h.at) + '</span><br><span class="' + (h.action === 'Từ chối' ? 'rj' : '') + '">' + esc(h.action) + '</span>' + (h.note ? '<br><i style="color:#475569;">' + esc(h.note) + '</i>' : '') + '</div></li>';
        }).join('') + '</ul>';
    }
    // Đọc dữ liệu đang nhập trên 04 tab vào bản ghi
    function collect(r) {
        document.querySelectorAll('#bcttM41 textarea[data-k]').forEach(function (t) { var row = r.m41[t.getAttribute('data-g')][+t.getAttribute('data-i')]; if (row) row[t.getAttribute('data-k')] = t.value; });
        if ($('bcttM42Nam')) { r.m42.nam = $('bcttM42Nam').value.trim(); r.m42.ngay = $('bcttM42Ngay').value.trim(); }
        document.querySelectorAll('textarea[data-m42]').forEach(function (t) { r.m42.items[t.getAttribute('data-m42')] = t.value; });
        document.querySelectorAll('#bcttM43 input[data-c]').forEach(function (i) { r.m43[i.getAttribute('data-g')][i.getAttribute('data-c')] = num(i.value); });
        document.querySelectorAll('#bcttM04 input[data-c]').forEach(function (i) { r.m04[i.getAttribute('data-g')][i.getAttribute('data-c')] = num(i.value); });
    }
    // Kiểm tra trước khi Gửi phê duyệt: trường bắt buộc trên 04 tab
    function validate(r) {
        var first = null, firstTab = null;
        function mark(el, bad, tab) { if (!el) return; el.classList.toggle('bctt-invalid', bad); var er = el.nextElementSibling; if (er && er.classList.contains('bctt-err')) er.classList.toggle('on', bad); if (bad && !first) { first = el; firstTab = tab; } }
        document.querySelectorAll('#bcttM41 textarea[data-k="hoTen"]').forEach(function (t) { mark(t, !t.value.trim(), 'm41'); });
        var nam = $('bcttM42Nam'), ngay = $('bcttM42Ngay');
        mark(nam, !/^\d{4}$/.test(nam.value.trim()), 'm42');
        var badDate = !ngay.value.trim() || !validDate(ngay.value.trim());
        $('bcttM42NgayErr').textContent = ngay.value.trim() && badDate ? 'Ngày không hợp lệ (dd/mm/yyyy)' : 'Đây là trường bắt buộc';
        mark(ngay, badDate, 'm42');
        if (first) { switchTab(firstTab); first.focus(); return false; }
        return true;
    }

    // ---------------- Văn bản A4 (xem trước PDF) ----------------
    // sign: { levels, final: true/false } -> vẽ ô ký Lãnh đạo; null: dự thảo chưa trình
    function signBlock(r, sign) {
        if (!sign) return '<div class="sigbox">Ô ký số Lãnh đạo (sau khi trình)</div>';
        var last = sign.levels[sign.levels.length - 1];
        var ok = last.result === 'approved';
        return '<div class="sigbox' + (ok ? ' ok' : '') + '">' + (ok ? 'Đã ký số: ' : 'Cấp ' + last.level + ' - ') + esc(last.leaderName) + (ok ? '<br>' + esc(last.at) : '') + '</div><div class="b">' + esc(last.leaderName) + '</div>';
    }
    function knBlock(sign) {
        if (!sign || !sign.levels[0] || !sign.levels[0].kyNhay || sign.levels.length < 2) return '';
        var l = sign.levels[0], ok = l.result === 'approved';
        return '<div class="knbox' + (ok ? ' ok' : '') + '">Ký nháy - Cấp 1 - ' + esc(l.leaderName) + (ok ? ' (' + esc(l.at) + ')' : '') + '</div>';
    }
    function ndHeader(code) {
        return '<div style="text-align:right;" class="b">' + code + '</div><div style="text-align:right;" class="i">(Ban hành kèm theo Nghị định số ..../…../NĐ-CP ngày …../…../….. của Chính phủ)</div>';
    }
    function preparerSig(r) { return '<div><img alt="Chữ ký người lập" src="' + sigImg(r.preparer.name) + '" style="height:46px;"></div><div class="b">' + esc(r.preparer.name) + '</div>'; }
    function docM41(r, d, sign) {
        var m41 = d.m41, total = 0;
        var rows = GROUPS.map(function (g) {
            var list = m41[g.k] || []; total += list.length;
            return '<tr><td class="b">' + g.k + '</td><td class="l b" colspan="6">' + g.name + '</td></tr>' + list.map(function (x, i) { return '<tr><td>' + (i + 1) + '</td>' + M41_COLS.map(function (c) { return '<td class="l">' + esc(x[c.k]) + '</td>'; }).join('') + '</tr>'; }).join('');
        }).join('');
        return '<div class="bctt-a4 l">' + ndHeader('Mẫu số 41/BTNN') + '<div class="c b" style="font-size:15px;margin:14px 0 8px;">DANH MỤC VỤ VIỆC GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG</div>'
            + '<div class="b" style="margin-bottom:8px;">' + esc((d.unitName || r.unitName).toUpperCase()) + '</div>'
            + '<table class="dt"><thead><tr><th>STT</th>' + M41_COLS.map(function (c) { return '<th>' + c.label + '<br>(' + c.no + ')</th>'; }).join('') + '</tr></thead><tbody>' + rows
            + '<tr><td></td><td class="l b">Tổng cộng</td><td class="l" colspan="5">' + total + ' vụ việc</td></tr></tbody></table>'
            + '<div style="display:flex;justify-content:space-around;margin-top:22px;" class="c"><div><div class="b">NGƯỜI LẬP DANH MỤC</div><div class="i">(Ký, ghi rõ họ tên)</div>' + (d.noPreparer ? '' : preparerSig(r)) + '</div>'
            + '<div><div class="b">THỦ TRƯỞNG CƠ QUAN LẬP DANH MỤC</div><div class="i">(Ký, ghi rõ họ tên và đóng dấu)</div>' + signBlock(r, sign) + '</div></div>' + knBlock(sign) + '</div>';
    }
    function docM42(r, d, sign) {
        var m = d.m42, p = dateParts(m.ngay);
        var body = '';
        M42_SECTIONS.forEach(function (s) {
            body += '<p class="b" style="margin:10px 0 4px;">' + esc(m42Head(s.h, m)) + '</p>';
            (s.sub || [s]).forEach(function (b) {
                if (s.sub) body += '<p class="b" style="margin:6px 0 4px;">' + esc(b.h) + '</p>';
                b.items.forEach(function (it) {
                    if (it.label) body += '<p style="margin:4px 0 2px;text-indent:24px;">- ' + esc(m42Head(it.label, m)) + '</p>';
                    body += '<p style="margin:0 0 6px;text-indent:24px;text-align:justify;white-space:pre-wrap;">' + (String(m.items[it.k] || '').trim() ? esc(m.items[it.k]) : '……') + '</p>';
                });
            });
        });
        return '<div class="bctt-a4 p">' + ndHeader('Mẫu số 42/BTNN')
            + '<table style="width:100%;margin-top:12px;"><tr><td class="c b" style="width:42%;vertical-align:top;">' + esc((d.unitName || r.unitName).toUpperCase()) + '<div style="border-bottom:1px solid #000;width:90px;margin:4px auto;"></div></td>'
            + '<td class="c" style="vertical-align:top;"><div class="b">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="b">Độc lập - Tự do - Hạnh phúc</div><div style="border-bottom:1px solid #000;width:150px;margin:4px auto 6px;"></div>'
            + '<div class="i">' + esc(d.diaDanh || placeOf(r)) + ', ' + (p ? 'ngày ' + p.d + ' tháng ' + p.m + ' năm ' + p.y : 'ngày … tháng … năm ……') + '</div></td></tr></table>'
            + '<div class="c b" style="font-size:15px;margin-top:14px;">BÁO CÁO</div><div class="c b">Công tác bồi thường nhà nước năm ' + esc(m.nam || '……') + '</div><div style="border-bottom:1px solid #000;width:120px;margin:4px auto 10px;"></div>'
            + body
            + '<table style="width:100%;margin-top:18px;"><tr><td style="vertical-align:top;width:50%;font-size:12px;"><div class="b i">Nơi nhận:</div><div>- Cơ quản quản lý nhà nước về công tác bồi thường (để báo cáo);</div><div>- Lưu: VT, …</div></td>'
            + '<td class="c" style="vertical-align:top;"><div class="b">THỦ TRƯỞNG ĐƠN VỊ</div><div class="i">(ký, ghi rõ họ tên và đóng dấu)</div>' + signBlock(r, sign) + '</td></tr></table>' + knBlock(sign) + '</div>';
    }
    function docM43(r, d, sign) {
        var m43 = d.m43, tot = m43Total(m43), p = dateParts(d.signDate || '');
        function cells(o) { var s = ''; for (var c = 2; c <= 27; c++) s += '<td>' + fmt(o[c], M43_MONEY[c]) + '</td>'; return s; }
        var head = m43Head().replace(/ style="min-width:150px;"/, '');
        var rows = '<tr><td></td>' + cells(tot) + '</tr>' + GROUPS.map(function (g) { return '<tr><td class="b">' + g.k + '</td><td class="l b" colspan="26">' + g.name + '</td></tr><tr><td></td>' + cells(m43Row(m43[g.k])) + '</tr>'; }).join('');
        return '<div class="bctt-a4 l" style="font-size:12px;">' + ndHeader('Mẫu số 43/BTNN') + '<div class="c b" style="font-size:14px;margin-top:10px;">TỔNG HỢP TÌNH HÌNH YÊU CẦU BỒI THƯỜNG, GIẢI QUYẾT BỒI THƯỜNG VÀ CHI TRẢ TIỀN BỒI THƯỜNG</div>'
            + '<div class="c i" style="margin-bottom:8px;">(Số liệu tính từ ' + esc(d.fromDate || r.fromDate) + ' đến ' + esc(d.toDate || r.toDate) + ')</div>'
            + '<table class="dt" style="font-size:8.5px;">' + head + '<tbody>' + rows + '</tbody></table>'
            + '<div style="display:flex;justify-content:space-around;margin-top:16px;" class="c"><div><div class="b">Người lập biểu</div><div class="i">(ký, ghi rõ họ tên)</div>' + (d.noPreparer ? '' : preparerSig(r)) + '</div>'
            + '<div><div class="i">' + (p ? 'Ngày ' + p.d + ' tháng ' + p.m + ' năm ' + p.y : 'Ngày........ tháng........ năm.......') + '</div><div class="b">Thủ trưởng đơn vị</div><div class="i">(Ký, đóng dấu, ghi rõ họ, tên)</div>' + signBlock(r, sign) + '</div></div>' + knBlock(sign) + '</div>';
    }
    // Văn bản Mẫu số 04 theo đúng Biểu mẫu số 04 - Thông tư số 08/2019/TT-BTP: dòng tổng (không nhãn) ngay dưới dòng số cột, ký Người lập biểu / Thủ trưởng cơ quan, mục Nguồn lấy số liệu
    function docM04(r, d, sign) {
        var m04 = d.m04 || emptyM04(), p = dateParts(d.signDate || '');
        function cells(o) { var s = ''; for (var c = 2; c <= 15; c++) s += '<td style="text-align:right;">' + fmt(o[c], M04_MONEY[c]) + '</td>'; return s; }
        var head = m04Head().replace(/ style="min-width:150px;"/, '');
        var rows = '<tr><td></td>' + cells(m04Total(m04)) + '</tr>' + GROUPS.map(function (g) { return '<tr><td class="b">' + g.k + '</td><td class="l b" colspan="14">' + g.name + '</td></tr><tr><td></td>' + cells(m04Row(m04[g.k])) + '</tr>'; }).join('');
        var tt = 'Thông tư số 08/2019/TT-BTP ngày 10/12/2019';
        return '<div class="bctt-a4 l" style="font-size:12px;"><div style="text-align:right;" class="b">BIỂU MẪU SỐ 04</div><div style="text-align:right;" class="i">(Ban hành kèm theo ' + tt + ')</div>'
            + '<table style="width:100%;margin-top:8px;"><tr><td class="c b" style="width:40%;vertical-align:top;">' + esc((d.unitName || r.unitName).toUpperCase()) + '<div style="border-bottom:1px solid #000;width:90px;margin:4px auto;"></div></td>'
            + '<td class="c" style="vertical-align:top;"><div class="b">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="b">Độc lập - Tự do - Hạnh phúc</div><div style="border-bottom:1px solid #000;width:150px;margin:4px auto;"></div></td></tr></table>'
            + '<div class="c b" style="font-size:14px;margin-top:10px;">TÌNH HÌNH THỰC HIỆN TRÁCH NHIỆM HOÀN TRẢ</div>'
            + '<div class="c i" style="margin-bottom:8px;">(Số liệu tính từ ' + esc(d.fromDate || r.fromDate) + ' đến ' + esc(d.toDate || r.toDate) + ')</div>'
            + '<table class="dt" style="font-size:9.5px;">' + head + '<tbody>' + rows + '</tbody></table>'
            + '<div style="display:flex;justify-content:space-around;margin-top:16px;" class="c"><div><div class="b">Người lập biểu</div><div class="i">(ký, ghi rõ họ tên)</div>' + (d.noPreparer ? '' : preparerSig(r)) + '</div>'
            + '<div><div class="i">' + (p ? 'Ngày ' + p.d + ' tháng ' + p.m + ' năm ' + p.y : 'Ngày........ tháng........ năm.......') + '</div><div class="b">Thủ trưởng cơ quan</div><div class="i">(Ký, ghi rõ họ tên và đóng dấu)</div>' + signBlock(r, sign) + '</div></div>'
            + '<div style="margin-top:14px;font-size:11px;"><div class="b i">Nguồn lấy số liệu:</div>'
            + ['Ủy ban nhân dân cấp tỉnh', 'Tòa án nhân dân tối cao', 'Viện kiểm sát nhân dân tối cao', 'các Bộ'].map(function (x, i) { return '<div>- Đối với báo cáo của ' + x + ': số liệu được tổng hợp từ báo cáo của các cơ quan quy định tại điểm a và điểm b khoản ' + (i + 1) + ' Điều 26 ' + tt + '.</div>'; }).join('')
            + '</div>' + knBlock(sign) + '</div>';
    }
    function docData(r) { return { m41: r.m41, m42: r.m42, m43: r.m43, m04: r.m04, signDate: r.issued ? r.issued.at.slice(0, 10) : '' }; }
    function docHtml(r, fid, sign, data) {
        var d = data || docData(r);
        var wm = !sign || sign.levels[sign.levels.length - 1].result !== 'approved' ? '<div class="bctt-wm">DỰ THẢO</div>' : '';
        var h = fid === 'm41' ? docM41(r, d, sign) : (fid === 'm42' ? docM42(r, d, sign) : (fid === 'm04' ? docM04(r, d, sign) : docM43(r, d, sign)));
        return wm ? h.replace(/^(<div class="bctt-a4[^"]*"[^>]*>)/, '$1' + wm) : h;
    }
    function viewerHtml(r, tab, sign, data, idp) {
        idp = idp || 'bcttV';
        return '<div class="bctt-view"><div class="bctt-tabs" id="' + idp + 'Tabs">' + FORMS.map(function (f) { return '<button class="bctt-tab' + (f.id === tab ? ' active' : '') + '" data-vtab="' + f.id + '">' + f.code + '</button>'; }).join('') + '</div>'
            + '<div id="' + idp + 'Doc">' + docHtml(r, tab, sign, data) + '</div></div>';
    }
    function bindViewer(r, sign, data, idp, onTab) {
        idp = idp || 'bcttV';
        $(idp + 'Tabs').onclick = function (e) {
            var b = e.target.closest('[data-vtab]'); if (!b) return;
            $(idp + 'Tabs').querySelectorAll('.bctt-tab').forEach(function (x) { x.classList.toggle('active', x === b); });
            $(idp + 'Doc').innerHTML = docHtml(r, b.getAttribute('data-vtab'), sign, data);
            if (onTab) onTab(b.getAttribute('data-vtab'));
        };
    }
    function currentSign(r) { return r.submit && r.status !== ST.TC ? r.submit : null; }
    // Popup xem file PDF: 04 tab biểu mẫu, nút Tải file của tab đang xem
    function openViewer(r, tab, title, data) {
        var t = tab || 'm41', sign = data ? null : currentSign(r);
        var html = '<div class="bctt-modal" style="width:100vw;height:100vh;max-width:100vw;max-height:100vh;border-radius:0;"><div class="bctt-mh"><div><div class="tt">' + esc(title) + '</div><div class="st">' + esc(data ? data.title : r.unitName + ' - năm ' + r.year) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-split" style="flex:1;min-height:0;">' + viewerHtml(r, t, sign, data, 'bcttPv') + '</div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Đóng</button><button class="btn btn-primary" id="bcttPvDl"><i class="fa-solid fa-download"></i> Tải file</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        var cur = t;
        bindViewer(r, sign, data, 'bcttPv', function (x) { cur = x; });
        $('bcttPvDl').onclick = function () { var f = FORMS.find(function (x) { return x.id === cur; }); toast('Đã tải xuống tệp ' + f.file + '_' + (data ? 'tong_hop_' : '') + r.year + '.pdf.'); };
    }

    // ---------------- Popup Gửi phê duyệt (Trình ký) ----------------
    var sub = null;
    function openSubmit(id) {
        var r = getR(id); if (!r) return;
        if (view.name !== 'detail' || view.id !== id) { showDetail(id); }
        if (!validate(r)) { toast('Vui lòng nhập đầy đủ thông tin bắt buộc trước khi gửi phê duyệt.', 'error'); return; }
        collect(r);
        var lv = flowLevels(r);
        var prev = (r.status === ST.TC || r.status === ST.TL) && r.submit ? r.submit : null;
        sub = { id: id, step: 1, levels: lv.map(function (l, i) { return { level: l.level, unitId: l.unitId, unitName: l.unitName, leaders: l.leaders, kyNhay: l.kyNhay, leaderId: prev && prev.levels[i] ? prev.levels[i].leaderId : l.leaders[0] }; }),
            noiDung: prev ? prev.noiDung : 'Kính trình Lãnh đạo xem xét, ký duyệt Báo cáo công tác bồi thường nhà nước năm ' + r.year + ' (' + FORM_CODES + ').', tlkt: prev ? prev.tlkt || [] : [] };
        var html = '<div class="bctt-modal" style="width:1520px;" id="bcttSubModal"><div class="bctt-mh"><div><div class="tt">GỬI PHÊ DUYỆT BÁO CÁO CÔNG TÁC BỒI THƯỜNG NHÀ NƯỚC</div><div class="st">Kỳ báo cáo: năm ' + r.year + ' - ' + PERIODS[r.period].label + ' • Đơn vị: ' + esc(r.unitName) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-step"><div id="bcttS1" class="on"><span class="b">1</span>Kiểm tra bộ báo cáo</div><div id="bcttS2"><span class="b">2</span>Chọn Lãnh đạo &amp; trình ký</div></div>'
            + '<div id="bcttSubBody1" class="bctt-mb"></div><div id="bcttSubBody2" style="display:none;flex:1;min-height:0;"></div>'
            + '<div class="bctt-mf" id="bcttSubFoot"></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        renderSub1(r);
    }
    function renderSub1(r) {
        sub.step = 1; $('bcttS1').classList.add('on'); $('bcttS2').classList.remove('on');
        $('bcttSubBody1').style.display = ''; $('bcttSubBody2').style.display = 'none';
        var info = { m41: m41Count(r.m41) + ' vụ việc', m42: m42Filled(r.m42) + '/' + M42_ITEMS.length + ' mục đã nhập nội dung', m43: 'Tổng số ' + m43Total(r.m43)[2] + ' vụ việc (Cột 2)', m04: 'Tổng số ' + m04Total(r.m04)[3] + ' vụ việc xem xét trách nhiệm hoàn trả (Cột 3)' };
        var html = (r.status === ST.TC && r.reject ? '<div class="bctt-alert" style="margin:0 0 14px;"><b class="t">BÁO CÁO BỊ LÃNH ĐẠO TỪ CHỐI</b>Lý do từ chối: <strong>' + esc(r.reject.reason) + '</strong><br>Người từ chối: ' + esc(r.reject.byName) + ' • Thời điểm: ' + esc(r.reject.at) + '</div>' : '')
            + '<div class="bctt-sec"><div class="h">Hình thức ký</div><div><strong>Ký số trên hệ thống</strong> <span class="formula-hint">- Cố định, không chọn; báo cáo không ký duyệt ở ngoài. Trình 01 lần cho cả bộ báo cáo theo luồng đã cấu hình tại Cấu hình luồng xử lý.</span></div></div>'
            + '<div class="bctt-sec"><div class="h">Bộ báo cáo trình ký</div><div class="table-container"><table class="custom-table" id="bcttSubForms"><thead><tr><th>STT</th><th>Biểu mẫu</th><th>Tình trạng dữ liệu</th><th>Thao tác</th></tr></thead><tbody>'
            + FORMS.map(function (f, i) { return '<tr><td>' + (i + 1) + '</td><td class="text-left">' + f.code + ' - ' + f.title + '</td><td class="text-left">' + info[f.id] + '</td><td><button class="bctt-link" data-fview="' + f.id + '">Xem trước PDF</button></td></tr>'; }).join('')
            + '</tbody></table></div></div>'
            + '<div class="bctt-sec"><div class="h">Người lập biểu</div><div style="display:flex;align-items:center;gap:14px;"><img class="bctt-sig" style="height:56px;" alt="Chữ ký hình ảnh" src="' + sigImg(r.preparer.name) + '"><div><strong>' + esc(r.preparer.name) + '</strong> - ' + esc(r.preparer.title) + '<div class="formula-hint">Chữ ký hình ảnh lấy theo Hồ sơ cá nhân của cán bộ; in tại vị trí Người lập danh mục (Mẫu 41/BTNN), Người lập biểu (Mẫu 43/BTNN, Mẫu số 04).</div></div></div></div>'
            + '<div id="bcttSubTlkt"></div>';
        $('bcttSubBody1').innerHTML = html;
        if (typeof window.tlktMount === 'function') window.tlktMount('bctt', 'bcttSubTlkt', { rows: sub.tlkt.length ? sub.tlkt : [{ name: '', file: null }], secClass: 'bctt-sec', titleClass: 'h' });
        onClk($('bcttSubForms'), function (e) { var v = e.target.closest('[data-fview]'); if (v) openViewer(r, v.getAttribute('data-fview'), 'Xem trước PDF'); });
        $('bcttSubFoot').innerHTML = '<button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-primary" id="bcttSubNext">Tiếp tục <i class="fa-solid fa-arrow-right"></i></button>';
        bindClose('bcttOv1');
        $('bcttSubNext').onclick = function () {
            if (typeof window.tlktValidate === 'function' && !window.tlktValidate('bctt')) return;
            if (typeof window.tlktGet === 'function') sub.tlkt = window.tlktGet('bctt');
            renderSub2(r);
        };
    }
    function subSign() { return { levels: sub.levels.map(function (l) { return { level: l.level, leaderName: userName(l.leaderId), kyNhay: l.kyNhay && sub.kyNhayOn !== false, result: null }; }) }; }
    function renderSub2(r) {
        sub.step = 2; $('bcttS1').classList.remove('on'); $('bcttS2').classList.add('on');
        $('bcttSubBody1').style.display = 'none'; var b2 = $('bcttSubBody2'); b2.style.display = 'flex';
        var cards = sub.levels.map(function (l, i) {
            return '<div class="bctt-card"><div class="h">Cấp ' + l.level + ' - ' + esc(l.unitName) + (l.kyNhay ? ' <span class="bctt-kn">Ký nháy</span>' : '') + '</div>'
                + '<span class="form-label">Lãnh đạo<span style="color:red;">*</span></span><select class="form-control" data-lv="' + i + '"><option value="">-- Chọn Lãnh đạo --</option>' + l.leaders.map(function (u) { return '<option value="' + u + '"' + (u === l.leaderId ? ' selected' : '') + '>' + esc(userName(u)) + (userTitle(u) ? ' - ' + esc(userTitle(u)) : '') + '</option>'; }).join('') + '</select><div class="bctt-err">Đây là trường bắt buộc</div>'
                + '<div class="formula-hint" style="margin-top:6px;">' + (i === sub.levels.length - 1 ? 'Ô ký số đặt tại vị trí ký của Thủ trưởng trên từng biểu mẫu.' : (l.kyNhay ? 'Ô ký nháy đặt cuối trang của từng biểu mẫu.' : 'Ký duyệt, không đặt ô ký trên văn bản.')) + '</div></div>';
        }).join('');
        b2.innerHTML = '<div class="bctt-split" style="flex:1;min-height:60vh;">' + viewerHtml(r, 'm41', subSign(), null, 'bcttSv')
            + '<div class="bctt-side">' + cards + '<div class="bctt-card"><div class="h">Nội dung trình<span style="color:red;">*</span></div><textarea class="bctt-ta" id="bcttSubND" rows="4" maxlength="2000" placeholder="Nhập nội dung trình Lãnh đạo...">' + esc(sub.noiDung) + '</textarea><div class="bctt-err" id="bcttSubNDErr">Đây là trường bắt buộc</div></div></div></div>';
        bindViewer(r, subSign(), null, 'bcttSv');
        b2.querySelectorAll('select[data-lv]').forEach(function (s) { s.onchange = function () { sub.levels[+s.getAttribute('data-lv')].leaderId = s.value; s.classList.remove('bctt-invalid'); s.nextElementSibling.classList.remove('on'); var act = $('bcttSvTabs').querySelector('.active'); $('bcttSvDoc').innerHTML = docHtml(r, act.getAttribute('data-vtab'), subSign()); bindViewer(r, subSign(), null, 'bcttSv'); }; });
        $('bcttSubFoot').innerHTML = '<button class="btn btn-secondary" id="bcttSubBack"><i class="fa-solid fa-arrow-left"></i> Quay lại</button><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-success" id="bcttSubGo"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>';
        bindClose('bcttOv1');
        $('bcttSubBack').onclick = function () { sub.noiDung = $('bcttSubND').value; renderSub1(r); };
        $('bcttSubGo').onclick = function () {
            var first = null;
            b2.querySelectorAll('select[data-lv]').forEach(function (s) { var bad = !s.value; s.classList.toggle('bctt-invalid', bad); s.nextElementSibling.classList.toggle('on', bad); if (bad && !first) first = s; });
            var nd = $('bcttSubND'); var badNd = !nd.value.trim(); nd.classList.toggle('bctt-invalid', badNd); $('bcttSubNDErr').classList.toggle('on', badNd); if (badNd && !first) first = nd;
            if (first) { first.focus(); return; }
            r.submit = { at: nowText(), by: me().name, noiDung: nd.value.trim(), current: 0, tlkt: sub.tlkt,
                levels: sub.levels.map(function (l) { return { level: l.level, unitId: l.unitId, unitName: l.unitName, leaderId: l.leaderId, leaderName: userName(l.leaderId), kyNhay: l.kyNhay, result: null, at: '', note: '' }; }) };
            r.status = ST.CHO; r.sentAt = r.submit.at; r.reject = null; r.preparer = { userId: me().userId, name: me().name, title: me().title };
            hist(r, me().name, 'Gửi phê duyệt', 'Trình ' + r.submit.levels[0].leaderName + ': ' + r.submit.noiDung);
            save(); closeOv('bcttOv1'); toast('Đã gửi phê duyệt báo cáo đến ' + r.submit.levels[0].leaderName + '.'); showDetail(r.id);
        };
    }

    // ---------------- Màn Ký duyệt / Từ chối (Lãnh đạo) ----------------
    function signHistHtml(r) {
        var items = [];
        r.history.forEach(function (h) { if (/Gửi phê duyệt|Ký duyệt|Từ chối|Ban hành/.test(h.action)) items.push(h); });
        var s = r.submit, waiting = s && r.status === ST.CHO ? s.levels.slice(s.current).map(function (l, k) { return '<li><span class="av">' + esc(initials(l.leaderName)) + '</span><div><strong>' + esc(l.leaderName) + '</strong><br><span class="wt">' + (k === 0 ? 'Đang chờ ký duyệt' : 'Chưa tới') + ' - Cấp ' + l.level + ' - ' + esc(l.unitName) + '</span></div></li>'; }).join('') : '';
        return '<ul class="bctt-tl">' + waiting + items.slice().reverse().map(function (h) { return '<li><span class="av">' + esc(initials(h.actor)) + '</span><div><strong>' + esc(h.actor) + '</strong> <span style="color:#64748b;">' + esc(h.at) + '</span><br><span class="' + (h.action === 'Từ chối' ? 'rj' : '') + '">' + esc(h.action) + '</span>' + (h.note ? '<br><i>' + esc(h.note) + '</i>' : '') + '</div></li>'; }).join('') + '</ul>';
    }
    function openSign(id, mode) {
        var r = getR(id); if (!canApprove(r)) { toast('Báo cáo không còn chờ bạn ký duyệt.', 'error'); return; }
        var s = r.submit, lv = s.levels[s.current];
        var tl = typeof window.tlktViewHtml === 'function' ? window.tlktViewHtml(s.tlkt || [], { boxClass: 'bctt-card', titleClass: 'h' }) : '';        var html = '<div class="bctt-mh"><div><div class="tt">' + (mode === 'approve' ? 'Ký duyệt' : 'Từ chối phê duyệt') + ' báo cáo công tác bồi thường nhà nước năm ' + r.year + ' - ' + esc(r.unitName) + '</div><div class="st">Ký duyệt / Từ chối áp dụng đồng thời cho cả 04 biểu mẫu: ' + FORM_CODES + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-split">' + viewerHtml(r, 'm41', s, null, 'bcttKv')
            + '<div class="bctt-side" style="width:480px;"><div class="bctt-card"><div class="h">Thông tin tổng quan</div>'
            + '<div class="bctt-meta" style="grid-template-columns:1fr;gap:8px;"><div><label>Kỳ báo cáo</label><strong>Năm ' + r.year + ' - ' + PERIODS[r.period].label + '</strong></div><div><label>Đơn vị báo cáo</label><strong>' + esc(r.unitName) + '</strong></div>'
            + '<div><label>Loại trình</label><strong>' + KIND + '</strong></div><div><label>Cán bộ trình</label><strong>' + esc(s.by) + ' - ' + esc(s.at) + '</strong></div>'
            + '<div><label>Cấp phê duyệt</label><strong>' + lv.level + '/' + s.levels.length + ' - ' + esc(lv.unitName) + '</strong>' + (lv.kyNhay ? ' <span class="bctt-kn">Ký nháy</span>' : '') + '</div><div><label>Nội dung trình</label><strong style="font-weight:500;">' + esc(s.noiDung) + '</strong></div></div></div>'
            + tl + '<div class="bctt-card"><div class="h">Lịch sử trình ký</div>' + signHistHtml(r) + '</div>'
            + '<div class="bctt-card">' + (mode === 'approve' ? '<div class="h">Ý kiến</div><textarea class="bctt-ta" id="bcttKNote" maxlength="2000" placeholder="Nhập ý kiến (không bắt buộc)..."></textarea>'
                : '<div class="h">Lý do từ chối<span style="color:red;">*</span></div><textarea class="bctt-ta" id="bcttKNote" maxlength="2000" placeholder="Nhập lý do từ chối..."></textarea><div class="bctt-err" id="bcttKNoteErr">Đây là trường bắt buộc</div>') + '</div></div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button>' + (mode === 'approve' ? '<button class="btn btn-primary" id="bcttKOk"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>' : '<button class="btn btn-danger" id="bcttKOk"><i class="fa-solid fa-ban"></i> Từ chối</button>') + '</div>';
        var full = $('bcttFull'); full.innerHTML = html; full.classList.add('on');
        full.querySelectorAll('[data-close]').forEach(function (b) { b.onclick = function () { full.classList.remove('on'); full.innerHTML = ''; }; });
        bindViewer(r, s, null, 'bcttKv');
        $('bcttKOk').onclick = function () {
            var note = $('bcttKNote').value.trim();
            if (!canApprove(r)) { toast('Báo cáo không còn hợp lệ để xử lý.', 'error'); full.classList.remove('on'); showList(); return; }
            if (mode === 'reject') {
                if (!note) { $('bcttKNote').classList.add('bctt-invalid'); $('bcttKNoteErr').classList.add('on'); $('bcttKNote').focus(); return; }
                lv.result = 'rejected'; lv.at = nowText(); lv.note = note;
                r.status = ST.TC; r.reject = { reason: note, byName: lv.leaderName, level: lv.level, at: lv.at };
                hist(r, lv.leaderName, 'Từ chối', note);
                save(); full.classList.remove('on'); full.innerHTML = ''; toast('Đã từ chối báo cáo. Cán bộ lập báo cáo nhận lại để điều chỉnh.'); showDetail(r.id); return;
            }
            lv.result = 'approved'; lv.at = nowText(); lv.note = note;
            if (s.current < s.levels.length - 1) {
                s.current++;
                hist(r, lv.leaderName, 'Ký duyệt và chuyển xử lý đến ' + s.levels[s.current].leaderName, note);
                toast('Đã ký duyệt cả 04 biểu mẫu và chuyển ' + s.levels[s.current].leaderName + ' ký duyệt.');
            } else {
                r.status = ST.BH; r.issued = { at: lv.at, signer: lv.leaderName };
                hist(r, lv.leaderName, 'Ký duyệt', note);
                hist(r, 'Hệ thống', isBtpReport(r) ? 'Ban hành' : (r.returned ? 'Ban hành và gửi lại Bộ Tư pháp' : 'Ban hành và gửi Bộ Tư pháp'));
                if (!isBtpReport(r) && r.returned) { r.returned = null; markBtpDirty(r, 'gửi lại'); }
                toast(isBtpReport(r) ? 'Đã ký số ban hành báo cáo tổng hợp của Bộ Tư pháp (04 biểu mẫu).' : 'Đã ký số ban hành cả 04 biểu mẫu và gửi Bộ Tư pháp.');
            }
            save(); full.classList.remove('on'); full.innerHTML = ''; showDetail(r.id);
        };
    }

    // ---------------- Bộ Tư pháp: danh sách kỳ tổng hợp ----------------
    function issuedOf(year, period) { return stpIssued(DB.reports, year, period); }
    function btpReportOf(year, period) { return DB.reports.find(function (r) { return isBtpReport(r) && r.year === year && r.period === period; }); }
    // Khối Báo cáo tổng hợp của Bộ Tư pháp tại màn kỳ báo cáo (MH08)
    function btpCardHtml(bR, n) {
        var st = bR ? statusCell(bR) : '<span class="badge badge-muted">Chưa lập</span>';
        var btn = bR ? '<button class="btn btn-primary" id="bcttBtpOpen"><i class="fa-solid fa-folder-open"></i> ' + (canEdit(bR) ? 'Mở báo cáo của Bộ để cập nhật' : (canApprove(bR) ? 'Mở báo cáo của Bộ để ký duyệt' : 'Xem báo cáo của Bộ')) + '</button>'
            : (role === 'cb_btp' ? '<button class="btn btn-success" id="bcttBtpCreate"><i class="fa-solid fa-plus"></i> Lập báo cáo tổng hợp của Bộ</button>' : '');
        return '<div class="section-title" style="margin:16px 0 10px;"><span>Báo cáo tổng hợp của Bộ Tư pháp</span></div><div class="bctt-btpcard"><div><div>' + st + '</div>'
            + '<div class="formula-hint" style="margin-top:6px;">Cùng form 04 biểu mẫu như Sở Tư pháp; số liệu tự tổng hợp từ báo cáo đã gửi của các Sở Tư pháp (hiện có ' + n + '/' + PROVINCES.length + ' Sở đã gửi); Bộ Tư pháp chỉnh sửa và trình Lãnh đạo ký duyệt.'
            + (bR && bR.src ? ' Lần tổng hợp gần nhất: ' + bR.src.n + '/' + PROVINCES.length + ' Sở, lúc ' + esc(bR.src.at) + '.' : '') + '</div></div><div>' + btn + '</div></div>';
    }
    function createBtpReport(year, period) {
        if (btpReportOf(year, period)) { toast('Kỳ này đã có báo cáo tổng hợp của Bộ Tư pháp.', 'error'); return; }
        var r = newBtpReport(year, period, ST.DANG, DB.reports);
        applyAuto(r, btpAuto(DB.reports, year, period)); // bỏ phần minh họa ô đã sửa của dữ liệu mẫu
        r.history = [{ at: nowText(), actor: me().name, action: 'Lập báo cáo tổng hợp', note: 'Tổng hợp từ ' + r.src.n + '/' + PROVINCES.length + ' Sở Tư pháp đã gửi.' }];
        DB.reports.push(r); save(); toast('Đã lập báo cáo tổng hợp từ ' + r.src.n + ' Sở Tư pháp đã gửi.');
        showDetail(r.id, function () { showBtp(year, period); });
    }
    // Thao tác báo cáo của Bộ tại danh sách kỳ: thao tác chưa đủ điều kiện hiển thị mờ (disabled), kèm chú thích lý do
    function btpListActs(k, bR) {
        function btn(act, cls, icon, title, on, why) {
            return ' <button class="icon-btn ' + cls + (on ? '' : ' is-disabled') + '" data-admin-icon-normalized="1" data-bact="' + act + '" data-k="' + k + '" title="' + esc(on ? title : title + ' - ' + why) + '"' + (on ? '' : ' disabled') + '><i class="' + icon + '"></i></button>';
        }
        if (role === 'cb_btp') {
            if (!bR) return btn('create', 'add', 'fa-solid fa-plus', 'Lập báo cáo tổng hợp của Bộ', true, '');
            var ed = canEdit(bR), why = 'Chỉ thực hiện khi báo cáo của Bộ ở trạng thái Đang nhập liệu hoặc Bị từ chối';
            return btn('edit', 'edit', 'fa-solid fa-pen-to-square', 'Cập nhật báo cáo của Bộ', ed, why) + btn('submit', 'submit', 'fa-solid fa-paper-plane', 'Gửi phê duyệt', ed, why);
        }
        var ok = canApprove(bR), lv = bR && bR.status === ST.CHO && bR.submit ? bR.submit.levels[bR.submit.current] : null;
        var why2 = lv ? 'Báo cáo đang chờ Cấp ' + lv.level + ' - ' + lv.leaderName + ' ký duyệt' : 'Chỉ thực hiện khi báo cáo của Bộ ở trạng thái Chờ duyệt';
        return btn('approve', 'accept sign', 'fa-solid fa-file-signature', 'Ký duyệt', ok, why2) + btn('reject', 'delete reject', 'fa-solid fa-ban', 'Từ chối', ok, why2);
    }
    // MH07 - Danh sách kỳ báo cáo (vai trò Bộ Tư pháp): kèm trạng thái và thao tác báo cáo tổng hợp của Bộ
    function renderBtpList() {
        var kys = [];
        DB.reports.forEach(function (r) { var k = r.year + '|' + r.period; if (kys.indexOf(k) < 0) kys.push(k); });
        kys.sort().reverse();
        var html = '<div class="card-section"><div class="section-title"><span><i class="fa-solid fa-table-list"></i> Danh sách kỳ báo cáo công tác bồi thường nhà nước</span></div><div class="table-container"><table class="custom-table" id="bcttBtpList"><thead><tr><th>STT</th><th>Năm báo cáo</th><th>Loại kỳ báo cáo</th><th>Số Sở Tư pháp đã gửi</th><th>Tình hình tiếp nhận</th><th>Báo cáo tổng hợp của Bộ</th><th>Thao tác</th></tr></thead><tbody>'
            + kys.map(function (k, i) {
                var p = k.split('|'), n = issuedOf(+p[0], p[1]).length, bR = btpReportOf(+p[0], p[1]);
                return '<tr class="list-row" data-ky="' + k + '"><td>' + (i + 1) + '</td><td>' + p[0] + '</td><td class="text-left">' + PERIODS[p[1]].label + '</td><td>' + n + '/' + PROVINCES.length + '</td><td><span class="badge ' + (n === PROVINCES.length ? 'badge-success' : 'badge-warning') + '">' + (n === PROVINCES.length ? 'Đủ số liệu' : 'Đang tiếp nhận') + '</span></td>'
                    + '<td>' + (bR ? statusCell(bR) : '<span class="badge badge-muted">Chưa lập</span>') + '</td><td>' + btpListActs(k, bR) + '</td></tr>';
            }).join('')
            + '</tbody></table></div></div>';
        $('bcttApp').innerHTML = html;
        onClk($('bcttBtpList'), function (e) {
            var b = e.target.closest('[data-bact]'), t = e.target.closest('[data-ky]');
            if (b && b.disabled) return;
            if (b) {
                e.stopPropagation(); var p = b.getAttribute('data-k').split('|'), bR = btpReportOf(+p[0], p[1]), a = b.getAttribute('data-bact'), back = function () { showBtp(+p[0], p[1]); };
                if (a === 'create') createBtpReport(+p[0], p[1]); else if (a === 'edit') showDetail(bR.id, back); else if (a === 'submit') { showDetail(bR.id, back); openSubmit(bR.id); }
                else if (a === 'approve' || a === 'reject') openSign(bR.id, a);
                return;
            }
            if (t) { var q = t.getAttribute('data-ky').split('|'); showBtp(+q[0], q[1]); }
        });
        refreshShared();
    }
    // Dữ liệu dùng cho tổng hợp: bản điều chỉnh của Bộ Tư pháp (nếu có), ngược lại số liệu đã ban hành
    function btpData(r) { if (!r.btp) r.btp = { m41: clone(r.m41), m42: clone(r.m42), m43: clone(r.m43) }; if (!r.btp.m04) r.btp.m04 = clone(r.m04 || emptyM04()); return r.btp; }
    function aggregate(list) {
        var m41 = emptyM41(), m43 = emptyM43(), m04 = emptyM04(), m42 =emptyM42(list[0] ? list[0].year : '');
        list.forEach(function (r) {
            var d = btpData(r);
            GROUPS.forEach(function (g) {
                (d.m41[g.k] || []).forEach(function (row, idx) { var x = clone(row); x._unit = r.unitName; x._rid = r.id; x._idx = idx; x._adj = !!(r.adjLog || []).find(function (a) { return a.form === 'm41' && a.key === g.k + ':' + idx; }); m41[g.k].push(x); });
                M43_INPUT_COLS.forEach(function (c) { m43[g.k][c] += num(d.m43[g.k][c]); });
                M04_INPUT_COLS.forEach(function (c) { m04[g.k][c] += num(d.m04[g.k] && d.m04[g.k][c]); });
            });
            M42_ITEMS.forEach(function (it) { var t = String(d.m42.items[it.k] || '').trim(); if (t) m42.items[it.k] += (m42.items[it.k] ? '\n' : '') + '- ' + r.unitName + ': ' + t; });
        });
        return { m41: m41, m42: m42, m43: m43, m04: m04 };
    }
    var btpState = { year: 2026, period: 'thuc_te', tab: 'm41', unit41: 'all', scope43: 'all', scope04: 'all', kw: '', sent: 'all' };
    function showBtp(year, period) {
        btpState.year = year; btpState.period = period;
        view = { name: 'btp', id: null, tab: btpState.tab };
        var all = DB.reports.filter(function (r) { return !isBtpReport(r) && r.year === year && r.period === period; });
        var issued = all.filter(function (r) { return r.status === ST.BH; });
        var bR = DB.reports.find(function (r) { return isBtpReport(r) && r.year === year && r.period === period; });
        var units = PROVINCES.map(function (p, i) { var r = all.find(function (x) { return x.province === p; }); return { prov: p, name: stpName(p), r: r }; });
        var html = '<div class="card-section"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;"><div><button class="btn btn-secondary btn-sm" id="bcttBtpBack"><i class="fa-solid fa-arrow-left"></i> Quay lại danh sách</button>'
            + '<h2 style="margin-top:10px;font-size:16px;color:#1e3a8a;">Kỳ báo cáo công tác bồi thường nhà nước năm ' + year + ' - ' + PERIODS[period].label + '</h2></div></div>'
            + '<div class="section-title" style="margin-bottom:12px;"><span>Thông tin chung</span></div><div class="bctt-meta">'
            + '<div><label>Năm báo cáo</label><strong>' + year + '</strong></div><div><label>Loại kỳ báo cáo</label><strong>' + PERIODS[period].label + '</strong></div>'
            + '<div><label>Đã gửi</label><strong>' + issued.length + '/' + PROVINCES.length + ' Sở Tư pháp</strong></div><div><label>Chưa gửi</label><strong>' + (PROVINCES.length - issued.length) + '/' + PROVINCES.length + ' Sở Tư pháp</strong></div></div>'
            + btpCardHtml(bR, issued.length)
            // Tình hình gửi báo cáo của 34 Sở Tư pháp: Đã gửi (= báo cáo Đã ban hành) / Chưa gửi (kèm tình trạng tại Sở)
            + '<div class="bctt-files"><div class="section-title" style="margin-bottom:10px;"><span>Tình hình gửi báo cáo của ' + PROVINCES.length + ' Sở Tư pháp</span></div>'
            + '<div class="filter-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));align-items:end;"><div class="form-group"><span class="form-label">Tên Sở Tư pháp</span><input class="form-control" id="bcttBtpKw" placeholder="Nhập tên Sở Tư pháp để tìm kiếm" value="' + esc(btpState.kw) + '"></div>'
            + '<div class="form-group"><span class="form-label">Tình hình gửi</span><select class="form-control" id="bcttBtpSt"><option value="all">Tất cả (' + PROVINCES.length + ')</option><option value="sent"' + (btpState.sent === 'sent' ? ' selected' : '') + '>Đã gửi (' + issued.length + ')</option><option value="unsent"' + (btpState.sent === 'unsent' ? ' selected' : '') + '>Chưa gửi (' + (PROVINCES.length - issued.length) + ')</option></select></div></div>'
            + '<div class="table-container" style="max-height:420px;overflow:auto;"><table class="custom-table" id="bcttBtpFiles"><thead><tr><th>STT</th><th>Sở Tư pháp</th><th>Tình hình gửi</th><th>Tình trạng tại Sở Tư pháp</th><th>Ngày gửi</th><th>Người lập</th><th>Người ký ban hành</th><th>Tệp báo cáo (Xem file | Tải file)</th></tr></thead><tbody>'
            + units.filter(function (u) { var ok = u.r && u.r.status === ST.BH; return (!btpState.kw || u.name.toLowerCase().indexOf(btpState.kw.toLowerCase()) >= 0) && (btpState.sent === 'all' || (btpState.sent === 'sent') === !!ok); }).map(function (u, i) {
                var r = u.r, ok = r && r.status === ST.BH;
                return '<tr' + (ok ? ' class="list-row" data-vrow="' + r.id + '" title="Click để xem chi tiết báo cáo (04 biểu mẫu)"' : '') + '><td>' + (i + 1) + '</td><td class="text-left">' + esc(u.name) + '</td><td>' + (ok ? '<span class="badge badge-success">Đã gửi</span>' : '<span class="badge badge-muted">Chưa gửi</span>') + '</td>'
                    + '<td class="text-left">' + (ok ? 'Đã ban hành' : (r ? r.status : 'Chưa tạo báo cáo')) + '</td><td>' + (ok ? r.issued.at : '--') + '</td><td class="text-left">' + (r ? esc(r.preparer.name) : '--') + '</td><td class="text-left">' + (ok ? esc(r.issued.signer) : '--') + '</td><td class="text-left">'
                    + (ok ? FORMS.map(function (f) { return '<span class="bctt-chip">' + f.code + ' <button class="bctt-link" data-rid="' + r.id + '" data-fview="' + f.id + '">Xem file</button>|<button class="bctt-link" data-fdl="' + f.file + '_' + year + '_' + r.unitId + '_signed.pdf">Tải file</button></span>'; }).join('') : '--')
                    // Bộ Tư pháp xem báo cáo của Sở Tư pháp: chỉ Tài liệu ban hành kèm theo (khối không ban hành kèm theo chỉ Sở Tư pháp trình xem được)
                    + (ok && r.submit && typeof window.tlktInlineHtml === 'function' ? window.tlktInlineHtml(r.submit.tlkt || [], { ownerUnit: r.unitId }) : '') + '</td></tr>';
            }).join('') + '</tbody></table></div></div></div>';
        $('bcttApp').innerHTML = html;
        $('bcttBtpBack').onclick = showList;
        $('bcttBtpKw').onchange = function () { btpState.kw = this.value.trim(); showBtp(year, period); };
        $('bcttBtpSt').onchange = function () { btpState.sent = this.value; showBtp(year, period); };
        bindFileTable('bcttBtpFiles', null);
        // Khối Báo cáo tổng hợp của Bộ Tư pháp: Lập báo cáo / Mở báo cáo; Sở Tư pháp đã gửi: click dòng mở form nhập liệu của Sở (chỉ đọc)
        if ($('bcttBtpCreate')) $('bcttBtpCreate').onclick = function () { createBtpReport(year, period); };
        if ($('bcttBtpOpen')) $('bcttBtpOpen').onclick = function () { showDetail(bR.id, function () { showBtp(year, period); }); };
        refreshShared();
    }
    // Đổi vai trò giả lập: lưu lại (ngữ cảnh badge LeftMenu đọc khóa này), về tab Chờ xử lý
    function setRole(r) { role = ROLES[r] ? r : 'cb_stp'; listTab = 'pending'; try { localStorage.setItem(KEY_ROLE, role); } catch (e) { /* bỏ qua */ } showList(); }
    function refreshShared() {
        reportBadge();
        if (typeof window.btnnStickyActRefresh === 'function') { try { window.btnnStickyActRefresh(); } catch (e) { /* bỏ qua */ } }
        if (typeof window.uxuDongBoRefresh === 'function') { try { window.uxuDongBoRefresh(); } catch (e) { /* bỏ qua */ } }
    }

    // API cho kiểm thử / trang khác
    window.BCTT = { ST: ST, FORMS: FORMS, load: load, db: function () { return DB; }, setRole: function (r) { if ($('bcttRole')) $('bcttRole').value = r; setRole(r); }, showList: showList, showDetail: showDetail, openSubmit: openSubmit, openSign: openSign, showBtp: showBtp, m43Row: m43Row, m43Total: m43Total, reset: function () { DB = seed(); save(); showList(); } };

    function init() {
        try { role = localStorage.getItem(KEY_ROLE) || 'cb_stp'; } catch (e) { role = 'cb_stp'; }
        if (!ROLES[role]) role = 'cb_stp';
        injectCss(); load(); mountShell(); showList();
        // Định dạng ô tiền khi gõ (pha capture: chạy trước handler tính tổng của từng bảng)
        document.addEventListener('input', function (e) { if (e.target.classList && e.target.classList.contains('bctt-money')) fmtMoneyInput(e.target); }, true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
