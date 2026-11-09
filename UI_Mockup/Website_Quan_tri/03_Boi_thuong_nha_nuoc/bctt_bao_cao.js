/*
 * Báo cáo công tác BTNN (mockup) - prefix bctt.
 * Bộ báo cáo gồm 04 biểu mẫu: Mẫu 41/BTNN, Mẫu 42/BTNN, Mẫu 43/BTNN (dự thảo Nghị định) và Mẫu số 04 (Thông tư 08/2019/TT-BTP) - Tình hình thực hiện trách nhiệm hoàn trả.
 * - Cán bộ Sở Tư pháp lập báo cáo của Ủy ban nhân dân tỉnh: nhập liệu 04 tab, xem trước PDF, Gửi phê duyệt (trình 01 lần cả bộ)
 *   -> Lãnh đạo Phòng (ký nháy) -> Lãnh đạo Sở (ký nháy) -> Lãnh đạo UBND tỉnh (ký số tại ô «Thủ trưởng đơn vị»). 06/11/2026 (nhanhl2, QDDA_020): đơn vị báo cáo là UBND tỉnh, luồng ký 3 cấp.
 * - Lãnh đạo Ký duyệt / Từ chối đồng thời cả 04 biểu mẫu tại màn Ký duyệt (mỗi biểu mẫu 01 tab).
 * - Bộ Tư pháp xem tệp đã ban hành của 34 Sở Tư pháp, số liệu tổng hợp 04 biểu mẫu, xem chi tiết và điều chỉnh theo từng Sở.
 * Trang: bao_cao_cong_tac_btnn.html. Dữ liệu giả lập lưu localStorage.
 */
(function () {
    'use strict';
    var KEY = 'bctt_bao_cao_v1';
    // 03/11/2026: tách trang. Trang Sở (bao_cao_cong_tac_btnn.html) chỉ có vai trò Sở Tư pháp, UBND tỉnh;
    // trang Bộ (xu_ly_bao_cao_cong_tac_btnn.html đặt window.BCTT_MODE = 'bo') chỉ có vai trò Bộ Tư pháp (xử lý báo cáo + báo cáo tổng hợp)
    var MODE = window.BCTT_MODE === 'bo' ? 'bo' : 'so';
    // 06/11/2026 (yêu cầu khách hàng): trang Tổng hợp mở trang chi tiết báo cáo của đơn vị trong khung nhúng (popup):
    // ?nhung=<mã báo cáo tổng hợp>&dv=<mã báo cáo Sở>&tab=<biểu mẫu>; số liệu theo bản chụp lúc cập nhật báo cáo tổng hợp, không ghi dữ liệu
    var NHUNG = '', NHUNG_DV = '', NHUNG_TAB = '';
    if (MODE === 'bo') { try { var q0 = new URLSearchParams(location.search); NHUNG = q0.get('nhung') || ''; NHUNG_DV = q0.get('dv') || ''; NHUNG_TAB = q0.get('tab') || ''; } catch (e) { /* bỏ qua */ } }
    var ROLES_SO = ['cb_stp', 'ld_phong', 'ld_so', 'ld_ubnd'];   // 06/11/2026 (nhanhl2, QDDA_020): bỏ vai trò «UBND tỉnh» chỉ xem
    var KEY_ROLE = 'bctt_role_v1' + (MODE === 'bo' ? '_bo' : '');
    var SEED = 's20_ubnd_3cap'; // 06/11/2026 (nhanhl2, QDDA_020): đơn vị báo cáo là UBND tỉnh, luồng ký 3 cấp; 's19_ma_tinh'; // 06/11/2026: 34 tỉnh, thành phố xếp theo mã đơn vị hành chính cấp tỉnh; 's18_bi_tra_lai'; // 06/11/2026: «Yêu cầu điều chỉnh» đổi tên thành «Bị trả lại»; 's17_bo_khong_ra_soat'; // 06/11/2026: bỏ luồng Bộ Tư pháp trả lại báo cáo của Sở; 's16_khongky'; // 04/11/2026: báo cáo tổng hợp của Bộ không trình ký; Sở phân công xử lý báo cáo bị trả lại; // 04/11/2026: thêm báo cáo tổng hợp các kỳ 2022 - 2024 cho từng người dùng tab Tổng hợp báo cáo; // 03/11/2026: luồng ký báo cáo tổng hợp của Bộ 3 cấp // 03/11/2026: tên trạng thái mới, thứ tự tab, vai trò UBND tỉnh (QDDA_012) // đổi giá trị khi đổi dữ liệu mẫu: trình duyệt đang lưu bản cũ sẽ tự nạp lại
    var KIND = 'Báo cáo công tác BTNN';
    var DEMO_UNIT = 'STP-HN';
    var DEMO_SUB = 'STP-HN-HCTP';
    var BTP_UNIT = 'BTP-01'; // Báo cáo tổng hợp toàn quốc của Bộ Tư pháp (cùng form 04 biểu mẫu)

    // Chốt 28/10: Lãnh đạo Từ chối và Bộ Tư pháp trả lại cùng trạng thái "Bị trả lại" (TC = TL); phân biệt theo r.reject (Lãnh đạo Từ chối) / r.returned (Bộ Tư pháp trả lại).
    // 03/11/2026 (QDDA_012): báo cáo Sở Tư pháp: Chờ nhập liệu, Chờ duyệt, Yêu cầu điều chỉnh, Đã gửi BTP.
    // Báo cáo tổng hợp của Bộ dùng cùng mã nhưng hiển thị Bị trả lại / Đã ban hành (stName).
    // 04/11/2026 (nhanhl2): Bộ Tư pháp trả lại thì trạng thái của Sở là «Bị trả lại» (trước gộp chung «Yêu cầu điều chỉnh» với Lãnh đạo Sở từ chối, QDDA_012);
    // «Bị trả lại» tương đương Chờ nhập liệu: cán bộ Sở cập nhật, trình ký và gửi lại
    // 06/11/2026 (khách hàng yêu cầu, nhanhl2 truyền đạt): trạng thái Lãnh đạo trong Sở từ chối đổi tên «Yêu cầu điều chỉnh» thành «Bị trả lại» (ST.TC).
    // ST.TL, ST.PC của luồng Bộ trả lại đã bỏ (06/11/2026) - đổi giá trị để không trùng tên với ST.TC
    var ST = { DANG: 'Chờ nhập liệu', CHO: 'Chờ duyệt', TC: 'Bị trả lại', BH: 'Đã gửi BTP', TL: '(Bộ trả lại - không dùng)', PC: '(Đang phân công - không dùng)' };
    // 04/11/2026 (nhanhl2): báo cáo tổng hợp của Bộ bị Lãnh đạo từ chối hiển thị «Yêu cầu điều chỉnh» như báo cáo của Sở (trước là «Bị trả lại»)
    var ST_BTP = {}; ST_BTP[ST.BH] = 'Đã ban hành';
    function stName(r, st) { st = st || r.status; return isBtpReport(r) && ST_BTP[st] ? ST_BTP[st] : st; }
    var ST_CLS = {}; ST_CLS[ST.DANG] = 'badge-muted'; ST_CLS[ST.CHO] = 'badge-info'; ST_CLS[ST.TC] = 'badge-danger'; ST_CLS[ST.BH] = 'badge-success'; ST_CLS[ST.TL] = 'badge-danger'; ST_CLS[ST.PC] = 'badge-outline';

    var PERIODS = {
        thuc_te: { label: 'Báo cáo năm số liệu thực tế (01/01 - 31/10)', from: '01/01', to: '31/10' },
        chinh_thuc: { label: 'Số liệu thống kê năm chính thức (01/01 - 31/12)', from: '01/01', to: '31/12' }
    };

    var FORMS = [
        { id: 'm42', code: 'Mẫu 42/BTNN', title: 'Báo cáo công tác bồi thường nhà nước', file: 'Mau_42_BTNN_Bao_cao_cong_tac_BTNN' },
        { id: 'm41', code: 'Mẫu 41/BTNN', title: 'Danh mục vụ việc giải quyết yêu cầu bồi thường', file: 'Mau_41_BTNN_Danh_muc_vu_viec' },
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

    // 06/11/2026 (nhanhl2 chốt, SRS Tổng hợp quy tắc 1): 34 tỉnh, thành phố xếp theo mã đơn vị hành chính cấp tỉnh tăng dần (thứ tự danh mục đơn vị);
    // mã ghi trong chú thích: 01 Hà Nội, 04 Cao Bằng, 08 Tuyên Quang, 11 Điện Biên, 12 Lai Châu, 14 Sơn La, 15 Lào Cai, 19 Thái Nguyên, 20 Lạng Sơn, 22 Quảng Ninh,
    // 24 Bắc Ninh, 25 Phú Thọ, 31 Hải Phòng, 33 Hưng Yên, 37 Ninh Bình, 38 Thanh Hóa, 40 Nghệ An, 42 Hà Tĩnh, 44 Quảng Trị, 46 Huế, 48 Đà Nẵng, 51 Quảng Ngãi,
    // 52 Gia Lai, 56 Khánh Hòa, 66 Đắk Lắk, 68 Lâm Đồng, 75 Đồng Nai, 79 Hồ Chí Minh, 80 Tây Ninh, 82 Đồng Tháp, 86 Vĩnh Long, 91 An Giang, 92 Cần Thơ, 96 Cà Mau
    var PROVINCES = ['Thành phố Hà Nội', 'Tỉnh Cao Bằng', 'Tỉnh Tuyên Quang', 'Tỉnh Điện Biên', 'Tỉnh Lai Châu', 'Tỉnh Sơn La', 'Tỉnh Lào Cai', 'Tỉnh Thái Nguyên', 'Tỉnh Lạng Sơn', 'Tỉnh Quảng Ninh',
        'Tỉnh Bắc Ninh', 'Tỉnh Phú Thọ', 'Thành phố Hải Phòng', 'Tỉnh Hưng Yên', 'Tỉnh Ninh Bình', 'Tỉnh Thanh Hóa', 'Tỉnh Nghệ An', 'Tỉnh Hà Tĩnh', 'Tỉnh Quảng Trị', 'Thành phố Huế',
        'Thành phố Đà Nẵng', 'Tỉnh Quảng Ngãi', 'Tỉnh Gia Lai', 'Tỉnh Khánh Hòa', 'Tỉnh Đắk Lắk', 'Tỉnh Lâm Đồng', 'Tỉnh Đồng Nai', 'Thành phố Hồ Chí Minh', 'Tỉnh Tây Ninh', 'Tỉnh Đồng Tháp',
        'Tỉnh Vĩnh Long', 'Tỉnh An Giang', 'Thành phố Cần Thơ', 'Tỉnh Cà Mau'];
    // 06/11/2026 (nhanhl2, QDDA_020): đơn vị báo cáo là Ủy ban nhân dân tỉnh, thành phố trực thuộc trung ương (ví dụ «Ủy ban nhân dân thành phố Hà Nội»);
    // Sở Tư pháp là cơ quan lập báo cáo (Cán bộ, Lãnh đạo Phòng, Lãnh đạo Sở). Tên stpName giữ cho mã cũ, nay trả về tên Ủy ban nhân dân
    function dvName(p) { return 'Ủy ban nhân dân ' + String(p).replace(/^Thành phố /, 'thành phố ').replace(/^Tỉnh /, 'tỉnh '); }
    var stpName = dvName;
    function soName(p) { return 'Sở Tư pháp ' + p; }
    // 06/11/2026 (nhanhl2, QDDA_020): mã đơn vị trong tên tệp theo Cơ cấu tổ chức (đơn vị UBND tỉnh, ví dụ UBND-HN). Mã nội bộ của báo cáo (r.unitId, STP-...)
    // giữ nguyên vì dùng để lấy dữ liệu vụ việc theo Sở Tư pháp (BTNN_WF.stpOfUnit) và phạm vi tài liệu kèm theo
    function maTepId(u) { return String(u).replace(/^STP-/, 'UBND-'); }
    function maTep(r) { return isBtpReport(r) ? r.unitId : maTepId(r.unitId); }
    function diaDanh(p) { return p.replace(/^(Thành phố|Tỉnh)\s+/, ''); }

    var ROLES = {
        cb_stp: { label: 'Cán bộ Sở Tư pháp - Đỗ Văn Chung (Phòng Hành chính tư pháp)', userId: 'cv_hn1', name: 'Đỗ Văn Chung', title: 'Chuyên viên' },
        ld_phong: { label: 'Lãnh đạo Phòng - Vũ Thị Thanh (Trưởng phòng Hành chính tư pháp)', userId: 'tp_hctp_hn', name: 'Vũ Thị Thanh', title: 'Trưởng phòng' },
        ld_so: { label: 'Lãnh đạo Sở - Phạm Quang Huy (Giám đốc Sở Tư pháp Thành phố Hà Nội)', userId: 'gdso_hn', name: 'Phạm Quang Huy', title: 'Giám đốc Sở' },
        cb_btp: { label: 'Chuyên viên Bộ Tư pháp - Nguyễn Văn Cán Bộ (Phòng Quản lý nghiệp vụ về BTNN)', userId: 'canbonv', name: 'Nguyễn Văn Cán Bộ', title: 'Chuyên viên' },
        cb_btp2: { label: 'Chuyên viên Bộ Tư pháp - Trần Thị Thu Hà (Phòng Quản lý nghiệp vụ về BTNN)', userId: 'hatt', name: 'Trần Thị Thu Hà', title: 'Chuyên viên' },
        ld_phong_btp: { label: 'Lãnh đạo Phòng - Trần Văn Bồi Thường (Trưởng phòng Quản lý nghiệp vụ về BTNN)', userId: 'tpbt', name: 'Trần Văn Bồi Thường', title: 'Trưởng phòng' },
        ld_cuc: { label: 'Lãnh đạo Cục - Nguyễn Văn Cục Trưởng (Cục trưởng Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước)', userId: 'cuctruong', name: 'Nguyễn Văn Cục Trưởng', title: 'Cục trưởng' },
        ld_bo: { label: 'Lãnh đạo Bộ - Đặng Hoàng Oanh (Lãnh đạo Bộ Tư pháp)', userId: 'oanhdh', name: 'Đặng Hoàng Oanh', title: 'Lãnh đạo Bộ' },
        // 06/11/2026 (nhanhl2, QDDA_020): bỏ tài khoản «UBND tỉnh» chỉ xem (QDDA_012). Lãnh đạo UBND tỉnh là người ký số Cấp 3 (cấp cuối) tại ô «Thủ trưởng đơn vị»:
        // có tab Chờ xử lý, Đã xử lý; phạm vi xem như Lãnh đạo Sở (mọi báo cáo của đơn vị trừ `Chờ nhập liệu`); Ký duyệt, Từ chối khi đến lượt mình
        ld_ubnd: { label: 'Lãnh đạo UBND tỉnh - Trần Quốc Minh (Phó Chủ tịch UBND thành phố Hà Nội)', userId: 'pct_ubnd_hn', name: 'Trần Quốc Minh', title: 'Phó Chủ tịch UBND' }
    };
    // 06/11/2026 (nhanhl2, QDDA_020): Cấp 3 của luồng ký thuộc đơn vị UBND tỉnh; danh sách Lãnh đạo UBND tỉnh giả lập (cộng thêm Lãnh đạo đơn vị UBND-HN trong Cấu hình luồng xử lý)
    var UBND_UNIT = 'UBND-HN', UBND_TEN = dvName(PROVINCES[0]);
    var LD_UBND = [{ id: 'pct_ubnd_hn', name: 'Trần Quốc Minh', title: 'Phó Chủ tịch UBND' }, { id: 'ct_ubnd_hn', name: 'Lê Hoàng Nam', title: 'Chủ tịch UBND' }];
    function ldUbnd(id) { return LD_UBND.find(function (x) { return x.id === id; }) || null; }

    var ROLE_ORDER = MODE === 'bo' ? ['ld_cuc', 'ld_phong_btp', 'cb_btp', 'cb_btp2', 'ld_bo'] : ROLES_SO;
    var ROLE_DEFAULT = ROLE_ORDER[0];

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
    // Chữ viết tắt trong vòng tròn: bỏ phần trong ngoặc (VD «Nguyễn Văn Cán Bộ (Bộ Tư pháp)» là NB), viết hoa
    function initials(name) { var p = String(name || '').replace(/\(.*?\)/g, '').trim().split(/\s+/); return (((p[0] || '')[0] || '') + (p.length > 1 ? (p[p.length - 1] || '')[0] || '' : '')).toUpperCase(); }
    // Chữ ký hình ảnh của cán bộ (giả lập ảnh lưu tại Hồ sơ cá nhân)
    function sigImg(name) {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="56"><path d="M8 40 C 40 10, 60 54, 92 26 S 150 18, 172 34" stroke="#1e3a8a" stroke-width="1.6" fill="none"/>'
            + '<text x="14" y="34" font-family="Segoe Script, Brush Script MT, cursive" font-size="19" fill="#1e3a8a">' + esc(String(name || '').split(' ').slice(-2).join(' ')) + '</text></svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    // ---------------- Luồng ký (theo Cấu hình luồng xử lý) ----------------
    function wf() { return window.BTNN_WF || null; }
    function userName(id) { var u0 = ldUbnd(id); if (u0) return u0.name; var W = wf(); if (W) return W.userName(id); var r = Object.keys(ROLES).map(function (k) { return ROLES[k]; }).find(function (x) { return x.userId === id; }); return r ? r.name : id; }
    function userTitle(id) { var u0 = ldUbnd(id); if (u0) return u0.title; var W = wf(); var u = W && W.getUser(id); return u ? u.title : ''; }
    // Luồng ký: Sở Tư pháp (Phòng -> Sở); báo cáo tổng hợp của Bộ Tư pháp (03/11/2026: Chuyên viên -> Lãnh đạo Phòng -> Lãnh đạo Cục -> Lãnh đạo Bộ;
    // Lãnh đạo Phòng, Lãnh đạo Cục ký nháy trên biểu mẫu, Lãnh đạo Bộ ký số)
    function flowLevels(r) {
        var W = wf();
        var defs = r && r.unitId === BTP_UNIT
            ? [{ unitId: 'PLN-02', unitName: 'Phòng Quản lý nghiệp vụ về bồi thường nhà nước', fb: ['tpbt'], kn: true }, { unitId: 'CĐK-01', unitName: 'Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước', fb: ['cuctruong', 'cucpho'], kn: true }, { unitId: BTP_UNIT, unitName: 'Bộ Tư pháp', fb: ['oanhdh', 'khoiml'], kn: false }]
            // 06/11/2026 (nhanhl2, QDDA_020): báo cáo của UBND tỉnh ký 3 cấp - Lãnh đạo Phòng ký nháy, Lãnh đạo Sở ký nháy (trước là ký số),
            // Lãnh đạo UBND tỉnh ký số tại ô «Thủ trưởng đơn vị» của từng biểu mẫu (Cấp 3 thuộc đơn vị UBND tỉnh)
            : [{ unitId: DEMO_SUB, unitName: 'Phòng Hành chính tư pháp', fb: ['tp_hctp_hn'], kn: true }, { unitId: DEMO_UNIT, unitName: 'Sở Tư pháp Thành phố Hà Nội', fb: ['gdso_hn'], kn: true },
                { unitId: UBND_UNIT, unitName: UBND_TEN, fb: LD_UBND.map(function (x) { return x.id; }), kn: false, ubnd: true }];
        return defs.map(function (d, i) {
            var leaders = W ? W.getLeaders(d.unitId, 'GQ') : [];
            if (!leaders || !leaders.length) leaders = d.fb;
            // 06/11/2026 (nhanhl2, QDDA_020): Cấp 3 - Lãnh đạo UBND tỉnh giả lập trước, rồi Lãnh đạo đơn vị UBND tỉnh trong Cấu hình luồng xử lý
            if (d.ubnd) leaders = d.fb.concat((W ? W.getLeaders(d.unitId, 'GQ') : []).filter(function (u) { return d.fb.indexOf(u) < 0; }));
            var kn = W && !(r && r.unitId === BTP_UNIT) ? !!W.isKyNhayUnit(d.unitId, 'GQ') : d.kn;
            // Báo cáo của Bộ: mọi cấp trước cấp cuối đều ký nháy; báo cáo của Sở: theo cấu hình, chỉ cấp 1
            var btp = r && r.unitId === BTP_UNIT;
            return { level: i + 1, unitId: d.unitId, unitName: d.unitName, leaders: leaders, kyNhay: btp ? i < defs.length - 1 : (i === 0 ? kn : i < defs.length - 1) };   // 06/11/2026 (nhanhl2, QDDA_020): Cấp 2 (Lãnh đạo Sở) ký nháy
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
            r.submit = { at: seedAt(year, period, 0, '09:15'), by: r.preparer.name, noiDung: 'Kính trình Lãnh đạo xem xét, ký duyệt Báo cáo công tác bồi thường nhà nước năm ' + year + '.', current: status === ST.CHO ? (i % 3) : lv.length - 1, tlkt: [{ name: 'Tờ trình Báo cáo công tác bồi thường nhà nước năm ' + year, file: { name: 'To_trinh_BC_cong_tac_BTNN_' + year + '.pdf', size: 245760 } }],
                levels: lv.map(function (l) { return { level: l.level, unitId: l.unitId, unitName: i === 0 ? l.unitName : (l.level === 1 ? 'Phòng Hành chính tư pháp' : l.level === 2 ? soName(prov) : dvName(prov)), leaderId: l.leaders[0], leaderName: i === 0 ? userName(l.leaders[0]) : (l.level === 1 ? 'Trưởng phòng HCTP - ' + diaDanh(prov) : l.level === 2 ? 'Giám đốc Sở Tư pháp ' + diaDanh(prov) : 'Phó Chủ tịch UBND ' + dvName(prov).replace('Ủy ban nhân dân ', '')), kyNhay: l.kyNhay, result: null, at: '', note: '' }; }) };
            r.sentAt = r.submit.at;
            // Dữ liệu mẫu 02 khối: Tài liệu ban hành kèm theo (Bộ Tư pháp xem được) / Tài liệu không ban hành kèm theo (chỉ Sở Tư pháp trình)
            r.submit.tlkt = [
                { name: 'Phụ lục số liệu chi tiết vụ việc năm ' + year, file: { id: '', name: 'Phu_luc_so_lieu_' + year + '_' + maTepId(unitId) + '.pdf', size: 245760 }, scope: 'issued', unit: unitId },
                { name: 'Tờ trình ban hành báo cáo công tác bồi thường nhà nước năm ' + year, file: { id: '', name: 'To_trinh_bao_cao_' + year + '_' + maTepId(unitId) + '.pdf', size: 163840 }, scope: 'internal', unit: unitId }
            ];
            r.history.push({ at: r.submit.at, actor: r.preparer.name, action: 'Gửi phê duyệt', note: r.submit.noiDung });
            // 06/11/2026 (nhanhl2, QDDA_020): báo cáo Chờ duyệt ở Cấp 2 hoặc Cấp 3 - các cấp dưới đã ký nháy
            if (status === ST.CHO) r.submit.levels.slice(0, r.submit.current).forEach(function (l, k) { l.result = 'approved'; l.at = seedAt(year, period, 1 + k, '10:00'); r.history.push({ at: l.at, actor: l.leaderName, action: 'Ký duyệt và chuyển xử lý đến ' + r.submit.levels[k + 1].leaderName, note: '' }); });
            if (status === ST.BH) {
                r.submit.levels.forEach(function (l, k) { l.result = 'approved'; l.at = seedAt(year, period, 1 + k, '14:00'); r.history.push({ at: l.at, actor: l.leaderName, action: k < r.submit.levels.length - 1 ? 'Ký duyệt và chuyển xử lý đến ' + r.submit.levels[k + 1].leaderName : 'Ký duyệt', note: '' }); });
                r.issued = { at: r.submit.levels[r.submit.levels.length - 1].at, signer: r.submit.levels[r.submit.levels.length - 1].leaderName };
                r.history.push({ at: r.issued.at, actor: 'Hệ thống', action: 'Ban hành và gửi Bộ Tư pháp', note: '' });
                r.history.push({ at: r.issued.at, actor: 'Hệ thống', action: 'Thông báo Cán bộ lập báo cáo và Lãnh đạo Sở', note: 'Báo cáo đã gửi Bộ Tư pháp.' });   // 06/11/2026 (nhanhl2, QDDA_020)
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
        // Giả lập Lãnh đạo Sở Tư pháp Hà Nội: (1) chờ Cấp 2 - Lãnh đạo Sở (Cấp 1 đã ký nháy); (2) chờ Cấp 1 - Lãnh đạo Phòng; (3) Bị trả lại (Lãnh đạo Từ chối)
        // 03/11/2026: thêm 03 báo cáo chờ Cấp 2 (năm 2023, 2022) để tab Chờ xử lý của Lãnh đạo Sở có nhiều bản ghi
        // 06/11/2026 (nhanhl2, QDDA_020): luồng 3 cấp - chờ Cấp 2 (Lãnh đạo Sở), chờ Cấp 3 (Lãnh đạo UBND tỉnh) và báo cáo Lãnh đạo UBND tỉnh từ chối, trả về Lãnh đạo Sở xem xét lại
        var choCap = function (year, period, cap) {
            var c = newReport(0, PROVINCES[0], year, period, ST.CHO);
            c.submit.levels.slice(0, cap).forEach(function (a, k) {
                a.result = 'approved'; a.at = seedAt(year, period, 1 + k, '10:00');
                c.history.push({ at: a.at, actor: a.leaderName, action: 'Ký duyệt và chuyển xử lý đến ' + c.submit.levels[k + 1].leaderName, note: '' });
            });
            c.submit.current = cap;
            return c;
        };
        var ubTc = choCap(2023, 'thuc_te', 2), sTc = ubTc.submit, ldU = sTc.levels[2], ldS = sTc.levels[1], atU = seedAt(2023, 'thuc_te', 3, '16:00');
        var lyDoU = 'Mẫu 42/BTNN: đề nghị bổ sung đánh giá việc xử lý kỷ luật người thi hành công vụ gây thiệt hại trước khi ký ban hành.';
        ubTc.status = ST.TC; ubTc.reject = { reason: lyDoU, byName: ldU.leaderName, level: 3, at: atU, traVe: true };
        sTc.levels.slice(1).forEach(function (l) { l.result = null; l.at = ''; l.note = ''; }); sTc.current = 1;
        ubTc.history.push({ at: atU, actor: ldU.leaderName, action: 'Từ chối và trả về ' + ldS.leaderName + ' (Cấp 2) xem xét lại', note: lyDoU });
        list.push(choCap(2025, 'thuc_te', 1), choCap(2023, 'chinh_thuc', 2), ubTc, choCap(2022, 'chinh_thuc', 2));
        list.push(newReport(0, PROVINCES[0], 2024, 'chinh_thuc', ST.CHO));
        var tc = newReport(0, PROVINCES[0], 2024, 'thuc_te', ST.CHO), t1 = tc.submit.levels[0];
        t1.result = 'rejected'; t1.at = seedAt(2024, 'thuc_te', 1, '15:30'); t1.note = 'Mẫu 43/BTNN: số liệu Cột 25, 26 chưa khớp với Mẫu 41/BTNN; đề nghị rà soát, bổ sung.';
        tc.status = ST.TC; tc.reject = { reason: t1.note, byName: t1.leaderName, level: 1, at: t1.at };
        tc.history.push({ at: t1.at, actor: t1.leaderName, action: 'Từ chối', note: t1.note });
        list.push(tc);
        // 06/11/2026: bỏ luồng Bộ Tư pháp trả lại báo cáo (trước là báo cáo năm 2022 kỳ thực tế của Hà Nội «Bị trả lại»). Báo cáo này nay là báo cáo
        // Đã gửi BTP mà Cán bộ Sở đã sửa số liệu sau khi gửi (tệp báo cáo vẫn là bản đã ký)
        var hnSua = newReport(0, PROVINCES[0], 2022, 'thuc_te', ST.BH), hnSuaAt = seedAt(2022, 'thuc_te', 6, '09:30');
        hnSua.kySo = chupKySo(hnSua);
        if (hnSua.m43 && hnSua.m43.I) hnSua.m43.I['3'] = num(hnSua.m43.I['3']) + 1;
        hnSua.capNhatSauGui = { at: hnSuaAt, by: hnSua.preparer.name };
        hnSua.history.push({ at: hnSuaAt, actor: hnSua.preparer.name, action: 'Cập nhật số liệu sau khi gửi Bộ Tư pháp', note: 'Tệp báo cáo đã ký giữ nguyên.' });
        list.push(hnSua);
        // Báo cáo năm 2026 của Hà Nội: số liệu Mẫu 42 để trống phần chưa nhập
        list[0].m42.ngay = ''; list[0].m42.items.keHoach = ''; list[0].m42.items.deXuatKienNghi = '';
        // Năm 2025: thêm báo cáo đã ban hành của 08 Sở Tư pháp (nguồn tổng hợp cho báo cáo của Bộ các kỳ năm 2025)
        for (var k = 1; k <= 8; k++) { list.push(newReport(k, PROVINCES[k], 2025, 'chinh_thuc', ST.BH)); list.push(newReport(k, PROVINCES[k], 2025, 'thuc_te', ST.BH)); }
        // Báo cáo tổng hợp của Bộ Tư pháp: 2026 Đang nhập liệu (từ 28 Sở đã gửi); 2025 chính thức Đã ban hành; 2025 thực tế Bị trả lại
        list.push(newBtpReport(2026, 'thuc_te', ST.DANG, list));
        // 06/11/2026: bỏ dữ liệu mẫu Bộ Tư pháp trả lại báo cáo của Sở Tư pháp Tỉnh Điện Biên (không còn luồng trả lại)
        list.push(newBtpReport(2025, 'chinh_thuc', ST.BH, list));
        list.push(newBtpReport(2025, 'thuc_te', ST.TC, list));
        // 04/11/2026 (nhanhl2): các kỳ 2022 - 2024 - báo cáo đã gửi của 10 Sở Tư pháp (nguồn tổng hợp) và báo cáo tổng hợp của Bộ cho từng người dùng giả lập
        [2024, 2023, 2022].forEach(function (y) { ['thuc_te', 'chinh_thuc'].forEach(function (pd) { for (var k = 1; k <= 10; k++) list.push(newReport(k, PROVINCES[k], y, pd, ST.BH)); }); });
        list.push(newBtpReport(2024, 'thuc_te', ST.CHO, list, { cap: 0 }));          // chờ Lãnh đạo Phòng (Cấp 1)
        list.push(newBtpReport(2024, 'chinh_thuc', ST.CHO, list, { cap: 1 }));       // chờ Lãnh đạo Cục (Cấp 2)
        list.push(newBtpReport(2023, 'chinh_thuc', ST.CHO, list, { cap: 2 }));       // chờ Lãnh đạo Bộ (Cấp 3)
        list.push(newBtpReport(2023, 'thuc_te', ST.TC, list, { traVe: 3 }));         // Lãnh đạo Bộ từ chối, trả về Lãnh đạo Cục xem xét lại
        list.push(newBtpReport(2022, 'chinh_thuc', ST.TC, list, { cb: 'cb_btp2' })); // Lãnh đạo Phòng từ chối, trả Chuyên viên Trần Thị Thu Hà
        list.push(newBtpReport(2022, 'thuc_te', ST.BH, list));
        // 04/11/2026 (nhanhl2): báo cáo tổng hợp của Bộ không trình ký - bỏ luồng ký và trạng thái của dữ liệu mẫu
        list.forEach(function (r) {
            if (!isBtpReport(r) || r.status === ST.DANG) return;
            r.status = ST.DANG; r.submit = null; r.reject = null; r.issued = null; r.sentAt = '';
            r.history = r.history.filter(function (h) { return !/^(Gửi phê duyệt|Ký duyệt|Từ chối|Ban hành)/.test(h.action || ''); });
            r.history.push({ at: seedAt(r.year, r.period, 5, '09:00'), actor: r.preparer.name, action: 'Lưu báo cáo', note: '' });
        });
        return { seed: SEED, reports: list };
    }
    // ---------------- Báo cáo tổng hợp của Bộ Tư pháp ----------------
    function isBtpReport(r) { return !!r && r.unitId === BTP_UNIT; }
    function placeOf(r) { return r.place || diaDanh(r.province); }
    function stpIssued(list, year, period) { return list.filter(function (r) { return !isBtpReport(r) && r.year === year && r.period === period && r.status === ST.BH; }); }
    // Số liệu tự tổng hợp từ báo cáo Đã ban hành của các Sở Tư pháp: Mẫu 41 ghép vụ việc (kèm tên Sở), Mẫu 42 ghép nội dung `- [Sở]: [Nội dung]`, Mẫu 43 / Mẫu số 04 cộng từng ô
    // Số báo cáo gửi chậm: ngày gửi BTP từ hạn gửi của kỳ trở đi (cùng cách tính với tab Tình hình gửi báo cáo của trang Tổng hợp)
    function demGuiCham(iss, year, period) {
        var han = hanGui(year, period).han;
        return iss.filter(function (x) { var m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(String((x.issued && x.issued.at) || x.sentAt || '')); return m && new Date(+m[3], +m[2] - 1, +m[1]) >= han; }).length;
    }
    // 06/11/2026 (yêu cầu khách hàng): bỏ quy trình rà soát của Bộ; số liệu tổng hợp lấy từ mọi báo cáo `Đã gửi BTP`, theo số liệu Sở đang lưu
    // (gồm số liệu Cán bộ Sở sửa sau khi gửi). Trước đó (04/11/2026) chỉ lấy báo cáo được Bộ đánh giá «Đạt»
    function btpAuto(list, year, period) {
        var iss = stpIssued(list, year, period), ag = aggregate(iss);
        ag.m42.nam = String(year);
        return { m41: ag.m41, m42: ag.m42, m43: ag.m43, m04: ag.m04, src: { n: iss.length, cham: demGuiCham(iss, year, period), at: nowText() } };
    }
    // Bản chụp báo cáo các đơn vị lúc cập nhật báo cáo tổng hợp (popup «Chi tiết các đơn vị» và trang chi tiết của đơn vị xem theo bản chụp này)
    function chupDonVi(iss) {
        var o = {};
        iss.forEach(function (x) { var c = clone(x); ['history', 'btp', 'bkKy', 'bo', 'adjLog', 'kySo'].forEach(function (k) { delete c[k]; }); o[x.id] = c; });
        return o;
    }
    // Dữ liệu chưa có bản chụp (báo cáo tổng hợp mẫu, lập trước 06/11/2026): chụp từ báo cáo đã gửi hiện tại, không lưu (tránh đầy bộ nhớ trình duyệt)
    var snapTam = {};
    function anhDonVi(r) {
        if (r.src && r.src.snap) return r.src.snap;
        if (!snapTam[r.id]) snapTam[r.id] = chupDonVi(stpIssued(DB.reports, r.year, r.period));
        return snapTam[r.id];
    }
    function applyAuto(r, a) {
        // 04/11/2026 (nhanhl2): Mẫu 42/BTNN của Bộ do Bộ tự nhập, không ghép nội dung các Sở; nội dung các Sở xem ở popup dưới từng ô
        r.m41 = a.m41; r.m42.nam = r.m42.nam || a.m42.nam; r.m43 = a.m43; r.m04 = a.m04;
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
    // Bộ Tư pháp trả lại báo cáo `Đã gửi BTP` của Sở Tư pháp (Sở chuyển sang `Yêu cầu điều chỉnh`)
    // 03/11/2026: Bộ Tư pháp không trả lại trực tiếp nữa; yêu cầu điều chỉnh đi qua luồng rà soát, duyệt tại trang Xử lý báo cáo (bctt_bo_xu_ly.js)
    function canReturn(r) { return false; }
    function openReturn(r) {
        var html = '<div class="bctt-modal" style="width:620px;"><div class="bctt-mh"><div><div class="tt">Trả lại báo cáo</div><div class="st">' + esc(r.unitName) + ' • Năm ' + r.year + ' - ' + PERIODS[r.period].label + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="form-group"><span class="form-label">Lý do trả lại<span style="color:red;">*</span></span><textarea class="bctt-ta" id="bcttRetReason" rows="4" maxlength="2000" placeholder="Nhập lý do trả lại..."></textarea><div class="bctt-err" id="bcttRetErr">Đây là trường bắt buộc</div></div>'
            + '<div class="formula-hint" style="margin-top:8px;">Báo cáo chuyển trạng thái Bị trả lại, không còn được tính là Đã gửi; Sở Tư pháp cập nhật và trình ký, gửi lại.</div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-warning" id="bcttRetOk"><i class="fa-solid fa-reply"></i> Trả lại</button></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        $('bcttRetOk').onclick = function () {
            var t = $('bcttRetReason'), v = t.value.trim();
            t.classList.toggle('bctt-invalid', !v); $('bcttRetErr').classList.toggle('on', !v);
            if (!v) { t.focus(); return; }
            if (!canReturn(r)) { toast('Báo cáo không còn ở trạng thái Đã gửi BTP.', 'error'); closeOv('bcttOv1'); return; }
            r.status = ST.TL; r.returned = { reason: v, by: me().name, at: nowText() };
            hist(r, me().name + ' (Bộ Tư pháp)', 'Trả lại báo cáo', v);
            markBtpDirty(r, 'trả lại');
            var b = DB.reports.find(function (x) { return isBtpReport(x) && x.year === r.year && x.period === r.period; });
            if (b) hist(b, me().name, 'Trả lại báo cáo của ' + r.unitName, v);
            save(); closeOv('bcttOv1'); toast('Đã trả lại báo cáo của ' + r.unitName + '.'); showDetail(r.id);
        };
    }
    // Nội dung mẫu Mẫu 42/BTNN do Bộ Tư pháp viết (dữ liệu mẫu của báo cáo tổng hợp đã trình hoặc đã ban hành); chỉ điền ô còn trống
    function m42MauBo(r) {
        M42_ITEMS.forEach(function (it) {
            if (!String(r.m42.items[it.k] || '').trim()) r.m42.items[it.k] = 'Bộ Tư pháp tổng hợp, đánh giá chung trên phạm vi toàn quốc về ' + m42Head(it.label || it.sec, r.m42).replace(/^[IV]+\.\s*/, '').replace(/\.$/, '').toLowerCase() + '.';
        });
    }
    // opt (04/11/2026): cb - vai trò Chuyên viên lập và trình; cap - Chờ duyệt tại cấp (chỉ số, 0 là Cấp 1);
    // traVe - số cấp đã từ chối và trả về Lãnh đạo cấp liền dưới (Yêu cầu điều chỉnh, vẫn trong luồng ký)
    function newBtpReport(year, period, status, list, opt) {
        opt = opt || {};
        var fromTo = PERIODS[period], a = btpAuto(list, year, period), cb = ROLES[opt.cb || 'cb_btp'];
        var r = { id: 'BC-BTP-' + year + (period === 'chinh_thuc' ? 'C' : ''), unitId: BTP_UNIT, province: '', place: 'Hà Nội', unitName: 'Bộ Tư pháp', year: year, period: period,
            fromDate: fromTo.from + '/' + year, toDate: fromTo.to + '/' + year, status: status, preparer: { userId: cb.userId, name: cb.name, title: cb.title },
            m41: null, m42: emptyM42(year), m43: null, m04: null, submit: null, reject: null, issued: null, sentAt: '', history: [], adjLog: [] };
        applyAuto(r, a);
        r.history.push({ at: seedAt(year, period, 3, '08:00'), actor: cb.name, action: 'Lập báo cáo tổng hợp', note: 'Tổng hợp từ ' + a.src.n + ' báo cáo đã gửi (' + a.src.n + '/' + PROVINCES.length + ' đơn vị).' });   // 06/11/2026: theo mẫu câu SRS MH02
        if (status === ST.DANG) {
            // Minh họa ô Bộ Tư pháp đã sửa khác số tự tổng hợp
            r.m43.I[3] = num(r.m43.I[3]) + 1; r.m04.I[2] = num(r.m04.I[2]) + 5000;
            return r;
        }
        r.m42.ngay = seedAt(year, period, 4);
        m42MauBo(r);
        var lv = flowLevels(r);
        r.submit = { at: seedAt(year, period, 5, '09:00'), by: cb.name, noiDung: 'Kính trình Lãnh đạo xem xét, ký duyệt Báo cáo tổng hợp công tác bồi thường nhà nước năm ' + year + '.', current: 0, tlkt: [],
            levels: lv.map(function (l) { return { level: l.level, unitId: l.unitId, unitName: l.unitName, leaderId: l.leaders[0], leaderName: userName(l.leaders[0]), kyNhay: l.kyNhay, result: null, at: '', note: '' }; }) };
        r.sentAt = r.submit.at;
        r.history.push({ at: r.submit.at, actor: cb.name, action: 'Gửi phê duyệt', note: r.submit.noiDung });
        var duyet = function (k) {
            var l = r.submit.levels[k]; l.result = 'approved'; l.at = seedAt(year, period, 6 + k, '14:00');
            r.history.push({ at: l.at, actor: l.leaderName, action: 'Ký duyệt và chuyển xử lý đến ' + r.submit.levels[k + 1].leaderName, note: '' });
        };
        if (status === ST.CHO) {
            for (var c = 0; c < (opt.cap || 0); c++) duyet(c);
            r.submit.current = opt.cap || 0;
            return r;
        }
        if (status === ST.TC && opt.traVe) {
            var capTc = opt.traVe - 1, ld = r.submit.levels[capTc], duoi = r.submit.levels[capTc - 1];
            for (var d = 0; d < capTc; d++) duyet(d);
            var atTc = seedAt(year, period, 6 + capTc, '16:00'), lyDo = 'Mẫu 43/BTNN: số liệu nhóm II chưa khớp tổng hợp từ các đơn vị; đề nghị Cục xem xét lại trước khi trình.';
            r.history.push({ at: atTc, actor: ld.leaderName, action: 'Từ chối và trả về ' + duoi.leaderName + ' (Cấp ' + duoi.level + ') xem xét lại', note: lyDo });
            r.submit.levels.slice(capTc - 1).forEach(function (l) { l.result = null; l.at = ''; l.note = ''; });
            r.submit.current = capTc - 1;
            r.reject = { reason: lyDo, byName: ld.leaderName, level: ld.level, at: atTc, traVe: true };
            return r;
        }
        if (status === ST.TC) {
            var t = r.submit.levels[0]; t.result = 'rejected'; t.at = seedAt(year, period, 6, '15:00'); t.note = 'Mẫu số 04 (TT 08/2019): đề nghị rà soát lại Cột 13, 14 so với báo cáo các đơn vị.';
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
        // Dữ liệu cũ: trạng thái "Bị từ chối" -> "Bị trả lại"
        if (DB && Array.isArray(DB.reports) && DB.reports.some(function (r) { return r && r.status === 'Bị từ chối'; })) {
            DB.reports.forEach(function (r) { if (r && r.status === 'Bị từ chối') r.status = ST.TC; }); save();
        }
        if (!DB || DB.seed !== SEED) { DB = seed(); save(); }
        // 06/11/2026: dữ liệu lưu theo tên cũ «Yêu cầu điều chỉnh» đổi sang «Bị trả lại»
        if (DB.reports.some(function (r) { return r && r.status === 'Yêu cầu điều chỉnh'; })) { DB.reports.forEach(function (r) { if (r && r.status === 'Yêu cầu điều chỉnh') r.status = ST.TC; }); save(); }
        // 06/11/2026: dữ liệu đã lưu - báo cáo bị trả về mà Lãnh đạo cấp dưới đã Ký duyệt lại (lượt ký đã lên cấp đã từ chối hoặc cao hơn) thì về `Chờ duyệt`
        (function () { var n = 0; DB.reports.forEach(function (r) { if (traVe(r) && r.submit && r.submit.current + 1 >= r.reject.level) { r.status = ST.CHO; r.reject = null; n++; } }); if (n) save(); })();
        // Dữ liệu đã lưu: báo cáo Sở bị Bộ trả lại (có returned, không có reject) còn tên cũ «Yêu cầu điều chỉnh» thì đổi sang «Bị trả lại»
        if (DB.reports.some(function (r) { return !isBtpReport(r) && r.status === ST.TC && r.returned && !r.reject && !r.phanCongSo; })) {
            DB.reports.forEach(function (r) { if (!isBtpReport(r) && r.status === ST.TC && r.returned && !r.reject && !r.phanCongSo) r.status = ST.TL; }); save();
        }
        // 04/11/2026: Mẫu 42/BTNN của Bộ không còn ghép nội dung các Sở; xóa phần đã ghép tự động trong dữ liệu đã lưu (một lần)
        if (!DB.m42Rieng) {
            DB.reports.forEach(function (r) {
                if (!isBtpReport(r) || !r.m42) return;
                M42_ITEMS.forEach(function (it) { if (/^- Sở Tư pháp [^\n]*?: /.test(String(r.m42.items[it.k] || ''))) r.m42.items[it.k] = ''; });
                if (r.status !== ST.DANG) m42MauBo(r);   // báo cáo đã trình hoặc đã ban hành: thay bằng nội dung mẫu của Bộ
            });
            DB.m42Rieng = true; save();
        }
        // 06/11/2026 (yêu cầu khách hàng): báo cáo Sở `Đã gửi BTP` giữ «bản đã ký» (số liệu và chữ ký lúc Lãnh đạo Sở ký ban hành), tách khỏi số liệu Cán bộ sửa sau khi gửi
        var thieuKy = false;
        DB.reports.forEach(function (r) { if (r && !isBtpReport(r) && r.status === ST.BH && !r.kySo) { r.kySo = chupKySo(r); thieuKy = true; } });
        if (thieuKy) save();
    }
    function save() { if (NHUNG) return; try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { /* bỏ qua */ } }
    function getR(id) { return DB.reports.find(function (r) { return r.id === id; }); }

    // ---------------- Vai trò ----------------
    var role = 'cb_stp';
    function me() { return ROLES[role]; }
    function isStpRole() { return ROLES_SO.indexOf(role) >= 0; }
    function myUnit() { return isStpRole() ? DEMO_UNIT : BTP_UNIT; }
    // Đơn vị người xem (quyền xem Tài liệu không ban hành kèm theo): vai trò Sở Tư pháp -> Sở Tư pháp Hà Nội; vai trò Bộ Tư pháp -> Bộ Tư pháp
    window.tlktViewerUnit = function () { return myUnit(); };
    // Cán bộ cập nhật báo cáo của đơn vị mình (Sở Tư pháp Hà Nội / báo cáo tổng hợp của Bộ Tư pháp) khi Đang nhập liệu hoặc Bị trả lại
    // 04/11/2026 (nhanhl2): Lãnh đạo cấp 2 trở lên từ chối thì báo cáo chuyển `Yêu cầu điều chỉnh` nhưng vẫn trong luồng ký (r.reject.traVe): trả về Lãnh đạo
    // cấp liền dưới ký duyệt lại hoặc từ chối; cán bộ chưa sửa được. Chỉ Lãnh đạo cấp 1 từ chối mới trả cán bộ; cán bộ gửi phê duyệt lại thì về `Chờ duyệt`
    function traVe(r) { return !!r && r.status === ST.TC && !!r.reject && !!r.reject.traVe; }
    function choKy(r) { return !!r && !!r.submit && (r.status === ST.CHO || traVe(r)); }
    // 06/11/2026 (nhanhl2): Lãnh đạo Phòng, Lãnh đạo Cục của Bộ Tư pháp cũng xem và sửa báo cáo tổng hợp khi được phân quyền (mockup: hai vai trò giả lập có quyền);
    // Lãnh đạo Bộ chỉ xem và kết xuất (QDDA_016)
    function suaBo() { return ['cb_btp', 'cb_btp2', 'ld_phong_btp', 'ld_cuc'].indexOf(role) >= 0; }
    function canEdit(r) { return (role === 'cb_stp' || suaBo()) && r.unitId === myUnit() && (r.status === ST.DANG || (r.status === ST.TC && !traVe(r) && (!!r.reject || !r.phanCongSo || !r.phanCongSo.canBo || r.phanCongSo.canBo.id === me().userId))); }
    // 06/11/2026 (yêu cầu khách hàng, nhanhl2 truyền đạt): Cán bộ Sở sửa tiếp số liệu báo cáo `Đã gửi BTP` bằng «Lưu» hoặc «Lưu và Trình phê duyệt lại»;
    // tệp báo cáo giữ bản Lãnh đạo Sở đã ký (r.kySo). Số liệu Bộ lấy khi đồng bộ số liệu báo cáo tổng hợp là số liệu đang lưu (r.m41 - r.m04)
    function suaSauGui(r) { return role === 'cb_stp' && !!r && !isBtpReport(r) && r.unitId === myUnit() && r.status === ST.BH; }
    function chupKySo(r) {
        var i = r.issued || {};
        return { m41: clone(r.m41), m42: clone(r.m42), m43: clone(r.m43), m04: clone(r.m04 || emptyM04()), signDate: i.at ? i.at.slice(0, 10) : '', at: i.at || '', signer: i.signer || '', sign: r.submit ? clone(r.submit) : null };
    }
    function kySoData(r, k) {
        k = k || r.kySo; if (!k) return null;
        return { m41: k.m41, m42: k.m42, m43: k.m43, m04: k.m04, signDate: k.signDate, sign: k.sign, kySo: true, title: r.unitName + ' - năm ' + r.year + ' - bản Lãnh đạo UBND tỉnh ký ngày ' + (k.at || '--') };   // 06/11/2026 (nhanhl2, QDDA_020)
    }
    // 04/11/2026 (nhanhl2): báo cáo bị Bộ trả lại - Lãnh đạo Sở phân công Phòng (`Bị trả lại` sang `Đang phân công`), Lãnh đạo Phòng giao Cán bộ
    // (`Đang phân công` sang `Yêu cầu điều chỉnh`); chỉ Cán bộ được giao mới cập nhật, trình ký lại
    // 06/11/2026 (nhanhl2 chốt): bỏ quy trình rà soát của Bộ nên bỏ luồng Bộ Tư pháp trả lại báo cáo; Sở không còn trạng thái `Bị trả lại`, `Đang phân công`
    // và bước Lãnh đạo Sở, Lãnh đạo Phòng phân công xử lý báo cáo bị trả lại (thay một phần QDDA_014, QDDA_015). Hai hàm giữ lại, luôn trả về false
    function coPhanCongSo(r) { return false; }
    function traBo(r) { return false; }
    function canApprove(r) {
        if (!r || !choKy(r) || r.unitId !== myUnit() || isBtpReport(r)) return false;
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
    // ---------------- Tổng hợp số liệu Mẫu 43/BTNN từ dữ liệu vụ việc (nút "Tổng hợp", báo cáo của Sở Tư pháp) ----------------
    // Nguồn: hồ sơ Giải quyết YCBT (BTNN_WF, module YCBT), Theo dõi vụ việc tại Tòa án ('btnn_court_cases_v1'), Quyết định GQBT ('btnn_qd_gqbt_v2'),
    // Chi trả tiền bồi thường ('proposalsList'). Mỗi Mã vụ việc tính 01 lần, theo nơi thụ lý cuối cùng tính đến ngày cuối kỳ (Tòa án ưu tiên hơn cơ quan trực tiếp quản lý).
    // Phạm vi: vụ việc có Cơ quan giải quyết bồi thường thuộc Tỉnh/Thành phố của Sở Tư pháp (BTNN_WF.stpOfUnit). Cột 23, 24 không có dữ liệu nguồn: giữ số đang nhập.
    var M43_AUTO_COLS = [3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 25, 26, 27];
    var M43_MANUAL_COLS = [23, 24];
    var M43_KEY_COURT = 'btnn_court_cases_v1', M43_KEY_QD = 'btnn_qd_gqbt_v2', M43_KEY_KP = 'proposalsList';
    // Trạng thái vụ việc Giải quyết YCBT chưa thụ lý / không thụ lý tại cơ quan
    var M43_NOT_THULY = ['Chờ tiếp nhận', 'Chờ phân công', 'Đang phân công', 'Yêu cầu bổ sung', 'Không thụ lý', 'Đã chuyển CQGQBT'];
    // Nội dung trình trước thụ lý: hồ sơ Chờ duyệt / Bị trả lại với các Nội dung trình này chưa thụ lý
    var M43_PRE_KINDS = ['Tiếp nhận hồ sơ', 'Thông báo thụ lý hồ sơ', 'Yêu cầu bổ sung', 'Thông báo Yêu cầu bổ sung', 'Không thụ lý', 'Thông báo Không thụ lý'];
    var M43_DONE = ['Chờ chi trả', 'Hoàn thành'];
    var M43_PAY_RETURNED = ['Trả lại ngân sách nhà nước', 'Đã sung quỹ', 'Sung quỹ nhà nước'];
    var M43_COURT_DONE = 'Đã có bản án/QĐ', M43_COURT_RETURNED = 'Trả lại đơn khởi kiện';
    // Dữ liệu mẫu bổ sung: hồ sơ Giải quyết YCBT của Thành phố Hà Nội mà Quyết định GQBT / Chi trả tiền bồi thường mẫu tham chiếu nhưng chưa có trong kho luồng xử lý
    // (chỉ dùng khi kho luồng xử lý không có Mã hồ sơ; số liệu Quyết định / Chi trả lấy theo kho của phân hệ nếu có)
    var M43_SEED_CASES = [
        { code: 'BT-2026-193', nyc: 'Trần Thị Hạnh', dc: 'Số 12 ngõ 45 Nguyễn Trãi, Phường Thanh Xuân, Thành phố Hà Nội', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', thuLy: '20/08/2026', status: 'Hoàn thành', qd: ['16/09/2026', 120000000], pay: ['25/09/2026', 120000000] },
        { code: 'BT-2026-077', nyc: 'Hoàng Văn Sơn', dc: 'Số 30 Xuân Thủy, Phường Cầu Giấy, Thành phố Hà Nội', unit: 'UBND-CG', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', thuLy: '15/11/2025', status: 'Hoàn thành', qd: ['05/10/2026', 92000000], pay: ['20/10/2026', 92000000] },
        // Trả lại ngân sách nhà nước một phần (KP-2026-130): Số tiền đã chi thực tế 60.000.000, không tính 30.000.000 trả lại ngân sách nhà nước
        // Chi trả nhiều lần (KP-2026-131): mỗi lần chi tính theo Ngày chi của lần đó; pay mẫu dùng khi kho Kinh phí chưa có bản ghi
        { code: 'BT-2026-097', nyc: 'Công ty TNHH Thương mại Minh Phát', dc: 'Số 88 Láng Hạ, Phường Láng, Thành phố Hà Nội', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', thuLy: '10/08/2026', status: 'Chờ chi trả', qd: ['08/10/2026', 100000000], pay: ['20/10/2026', 40000000] },
        { code: 'BT-2023-063', nyc: 'Lê Văn Phúc', dc: 'Thôn Đoài, Xã Sóc Sơn, Thành phố Hà Nội', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', thuLy: '20/03/2023', status: 'Hoàn thành', qd: ['20/06/2023', 90000000], pay: ['15/03/2026', 60000000] },
        { code: 'BT-2026-005', nyc: 'Vũ Thị Lan', dc: 'Số 15 Lạch Tray, Phường Ngô Quyền, Thành phố Hải Phòng', unit: 'STP-HP', lv: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH', thuLy: '12/05/2026', status: 'Chờ duyệt' },
        { code: 'BT-2026-003', nyc: 'Công ty Cổ phần Xây dựng Thăng Long', dc: 'Số 2 Phạm Hùng, Phường Cầu Giấy, Thành phố Hà Nội', unit: 'UBND-CG', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', thuLy: '06/04/2026', status: 'Chờ chi trả', qd: ['02/07/2026', 4800000000] },
        { code: 'BT-2026-047', nyc: 'Nguyễn Thị Mai', dc: 'Số 5 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội', unit: 'CCTHADS-CG', lv: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', thuLy: '12/03/2026', status: 'Đình chỉ giải quyết' },
        { code: 'BT-2025-142', nyc: 'Phạm Quốc Toản', dc: 'Số 210 Khương Đình, Phường Khương Đình, Thành phố Hà Nội', unit: 'CA-TX', lv: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', thuLy: '20/10/2025', status: 'Xác minh thiệt hại' },
        // Phục hồi danh dự: hồ sơ Chỉ yêu cầu phục hồi danh dự; hồ sơ cán bộ chủ động phục hồi danh dự (riêng / cùng Mã vụ việc với hồ sơ BT-2026-193 đã giải quyết)
        { code: 'BT-2026-211', unit: 'UBND-HM', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', thuLy: '22/07/2026', status: 'Hoàn thành', requestKind: 'honor' },
        { code: 'BT-2026-212', unit: 'CA-TX', lv: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', thuLy: '10/09/2026', status: 'Đang phục hồi danh dự', requestKind: 'honor', cdpd: true },
        { code: 'BT-2026-213', vv: 'BT-2026-193', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', thuLy: '05/10/2026', status: 'Đang phục hồi danh dự', requestKind: 'honor', cdpd: true }
    ];
    // Vụ việc tại Tòa án mẫu (cùng dữ liệu mẫu của màn Theo dõi vụ việc tại Tòa án): dùng khi trình duyệt chưa mở màn Theo dõi vụ việc tại Tòa án
    var M43_COURT_FALLBACK = [
        { id: 'TA-BT-2026-301', nyc: { name: 'Đỗ Minh Tuấn', address: 'Số 7 Trần Đăng Ninh', ward: 'Phường Cầu Giấy', city: 'Thành phố Hà Nội' }, rootUnitId: 'UBND-CG', status: 'Đã thụ lý', basis: 'a', acceptDate: '15/09/2026', fieldGroup: 'hành chính', amount: 320000000 },
        { id: 'TA-BT-2026-302', hoSoCode: 'BT-2026-030', linkedAgencyId: 'CA-HM', rootUnitId: 'STP-HN', status: 'Đang giải quyết', basis: 'b', acceptDate: '02/09/2026', fieldGroup: 'hình sự', amount: 121500000 },
        { id: 'TA-BT-2026-304', nyc: { name: 'Trịnh Văn Hải', address: 'Số 3 Phan Đình Phùng', ward: 'Phường Xuân Hương - Đà Lạt', city: 'Tỉnh Lâm Đồng' }, rootUnitId: 'THADS-LD', status: M43_COURT_DONE, basis: 'a', acceptDate: '10/06/2026', effectiveDate: '28/09/2026', fieldGroup: 'thi hành án dân sự', amount: 506000000 },
        { id: 'TA-BT-2026-305', nyc: { name: 'Ngô Thị Thu', address: 'Số 21 Hàng Bài', ward: 'Phường Hoàn Kiếm', city: 'Thành phố Hà Nội' }, rootUnitId: 'UBND-HK', status: M43_COURT_DONE, basis: 'tt', acceptDate: '20/05/2026', effectiveDate: '15/08/2026', fieldGroup: 'tố tụng hành chính', amount: 15000000 },
        { id: 'TA-BT-2026-306', rootUnitId: 'BTP-01', status: M43_COURT_RETURNED, basis: 'a', acceptDate: '05/08/2026', fieldGroup: 'hành chính', amount: 60000000 },
        { id: 'TA-BT-2026-307', rootUnitId: 'BTP-01', status: 'Đang giải quyết', basis: 'tt', acceptDate: '12/08/2026', fieldGroup: 'hình sự', amount: 244000000 },
        { id: 'TA-BT-2026-308', hoSoCode: 'BT-2026-052', linkedAgencyId: 'UBND-CG', rootUnitId: 'BTP-01', status: 'Đã thụ lý', basis: 'b', acceptDate: '20/10/2026', fieldGroup: 'hành chính', amount: 95000000 }
    ];
    function m43Read(key) { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; } }
    // dd/mm/yyyy hoặc HH:mm dd/mm/yyyy -> yyyymmdd (số), không hợp lệ -> 0
    function m43Day(s) { var m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(String(s || '')); return m ? +(m[3] + m[2] + m[1]) : 0; }
    // Thời điểm "HH:mm dd/mm/yyyy" (hoặc "dd/mm/yyyy HH:mm") -> số yyyymmddHHmm; không có: 0
    function m43Stamp(s) {
        var d = m43Day(s); if (!d) return 0;
        var t = /(\d{1,2}):(\d{2})/.exec(String(s || ''));
        return d * 10000 + (t ? (+t[1]) * 100 + (+t[2]) : 0);
    }
    function m43Fold(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); }
    // Lĩnh vực phát sinh thiệt hại -> nhóm I - VI
    function m43Group(lv) {
        var t = m43Fold(lv);
        if (!t) return '';
        if (/thi hanh an hinh su/.test(t)) return 'V';
        if (/thi hanh an dan su/.test(t)) return 'VI';
        if (/to tung hanh chinh/.test(t)) return 'IV';
        if (/hinh su/.test(t)) return 'II';
        if (/dan su/.test(t)) return 'III';
        if (/hanh chinh/.test(t)) return 'I';
        return '';
    }
    // Căn cứ khởi kiện tại Tòa án: a (điểm a khoản 1 Điều 52) | b (điểm b khoản 1 và khoản 2 Điều 52) | tt (trong quá trình tố tụng hình sự, tố tụng hành chính)
    function m43Basis(c) {
        if (c.basis) return c.basis;
        var lc = String(c.lawsuitCase || ''), vs = String(c.verdictSource || '');
        if (/điểm a khoản 1/.test(lc)) return 'a';
        if (/điểm b khoản 1/.test(lc)) return 'b';
        if (/tố tụng hình sự, tố tụng hành chính/.test(lc) || /Điều 55/.test(vs)) return 'tt';
        if (/Khoản 2 Điều 52/.test(vs)) return 'b';
        if (/Khoản 1 Điều 52/.test(vs)) return 'a';
        return '';
    }
    // Ngày thụ lý hồ sơ Giải quyết YCBT: ngày cấp cuối ký duyệt Nội dung trình Tiếp nhận hồ sơ / Thông báo thụ lý hồ sơ; không có lịch sử -> ngày tiếp nhận
    function m43ThuLyDate(rec) {
        var h = (rec.history || []).filter(function (x) { return x && /Phê duyệt|Ký duyệt|Ban hành/.test(x.action || '') && /Tiếp nhận hồ sơ|Thông báo thụ lý/.test(x.note || ''); }).pop();
        return m43Day(h ? h.at : '') || m43Day(rec.date) || m43Day(rec.receivedAt);
    }
    // Hồ sơ chỉ có phục hồi danh dự (Chỉ yêu cầu phục hồi danh dự / Cán bộ chủ động phục hồi danh dự): không thống kê trong biểu mẫu báo cáo BTNN
    function m43HonorOnly(rec) {
        if (!rec) return false;
        var g = rec.gqData || {}, x = rec.approval || rec.returned || {};
        return rec.requestKind === 'honor' || rec.requestType === 'honor' || g.requestType === 'honor' || !!rec.cdpd || !!g.cdpd
            || /chủ động phục hồi danh dự/i.test(rec.hinhThucTiepNhan || g.hinhThucTiepNhan || '') || x.kind === 'Chủ động phục hồi danh dự';
    }
    function m43IsThuLy(rec) {
        if (!rec || rec.module !== 'YCBT') return false;
        var st = rec.status;
        if (st === 'Chờ duyệt' || st === 'Bị trả lại') {
            var x = rec.approval || rec.returned || {};
            if (M43_PRE_KINDS.indexOf(x.kind) >= 0) return false;
            return !!x.prevStatus && M43_NOT_THULY.indexOf(x.prevStatus) < 0 && x.prevStatus !== 'Chờ tiếp nhận';
        }
        return !!st && M43_NOT_THULY.indexOf(st) < 0;
    }
    // Dữ liệu vụ việc phục vụ Mẫu 43/BTNN: { list: [vụ việc], find(mã) }
    function m43Cases() {
        var W = wf(); if (!W) return null;
        var vv = function (code) { if (!code) return ''; if (W.isVuViecCode(code)) return code; return W.vuViecOf(code, { create: false }) || ''; };
        var map = {}, alias = {};
        var get = function (key) { if (!map[key]) map[key] = { key: key, unit: '', lv: '', ag: null, ct: null, qd: null, pay: [] }; return map[key]; };
        var link = function (e, codes) { codes.forEach(function (c) { if (c) alias[c] = e; }); };
        var find = function (codes) { for (var i = 0; i < codes.length; i++) { if (codes[i] && alias[codes[i]]) return alias[codes[i]]; } return null; };
        var recs = W.loadRecords();
        // 1. Hồ sơ Giải quyết YCBT đã thụ lý tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại
        recs.forEach(function (rec) {
            // Không tính hồ sơ chỉ có phục hồi danh dự: vụ việc chỉ có phục hồi danh dự không thống kê; vụ việc có yêu cầu bồi thường tính 01 lần theo hồ sơ có yêu cầu bồi thường
            if (!m43IsThuLy(rec) || m43HonorOnly(rec)) return;
            var key = vv(rec.maVuViec) || vv(rec.code) || rec.code, e = get(key);
            var d = m43ThuLyDate(rec);
            // Nhiều hồ sơ cùng Mã vụ việc (Chuyển CQGQBT): lấy hồ sơ thụ lý sau cùng
            if (!e.ag || d >= e.ag.date) { e.ag = { code: rec.code, date: d, status: rec.status, kind: rec.requestKind, rec: rec }; e.unit = W.getRootId(rec.rootUnitId) || rec.rootUnitId; e.lv = rec.linhVuc || e.lv; }
            link(e, [key, rec.code, rec.claimCode]);
        });
        M43_SEED_CASES.forEach(function (s) {
            if (m43HonorOnly(s) || recs.some(function (x) { return x && (x.code === s.code || x.claimCode === s.code); })) return;
            var key = s.vv || vv(s.code) || s.code, e = get(key), d = m43Day(s.thuLy);
            // Cùng Mã vụ việc: lấy hồ sơ có Ngày thụ lý sau cùng; số liệu Quyết định / Chi trả mẫu giữ theo hồ sơ đã có
            if (e.ag && d < e.ag.date) { link(e, [s.code]); return; }
            e.ag = { code: s.code, date: d, status: s.status, kind: s.requestKind, seed: (e.ag && e.ag.seed) || s }; e.unit = s.unit; e.lv = s.lv;
            link(e, [key, s.code]);
        });
        // 2. Vụ việc tại Tòa án (không tính Trả lại đơn khởi kiện)
        var court = m43Read(M43_KEY_COURT);
        if (!Array.isArray(court)) court = M43_COURT_FALLBACK;
        // 01 vụ việc có nhiều vụ việc tại Tòa án (cùng liên kết 01 vụ việc): lấy vụ việc tại Tòa án có Ngày thụ lý mới nhất;
        // Ngày thụ lý bằng nhau: lấy vụ việc tạo sau cùng (Thời điểm tạo; không có thì theo thứ tự lưu, vụ việc mới ở đầu danh sách)
        court.forEach(function (c, idx) {
            if (!c || c.deleted || c.status === M43_COURT_RETURNED || !m43Day(c.acceptDate)) return;
            var key = (W.isVuViecCode(c.code) && c.code) || vv(c.linkedVuViec) || vv(c.hoSoCode) || vv(c.id) || c.code || c.id, e = find([key, c.hoSoCode]) || get(key);
            var amt = Array.isArray(c.damages) ? c.damages.reduce(function (s, d) { return s + (Number(d && d.amount) || 0); }, 0) : (Number(c.amount) || 0);
            var d = m43Day(c.acceptDate), stamp = m43Stamp(c.createdAt), order = court.length - idx;
            var cur = e.ct;
            var newer = !cur || d > cur.date || (d === cur.date && (stamp > cur.stamp || (stamp === cur.stamp && order > cur.order)));
            if (newer) {
                e.ct = { date: d, basis: m43Basis(c), status: c.status, eff: m43Day(c.effectiveDate), amount: amt, stamp: stamp, order: order, id: c.id, raw: c };
                if (!e.ag) { e.unit = W.getRootId(c.linkedAgencyId || c.rootUnitId) || c.linkedAgencyId || c.rootUnitId; e.lv = FIELD_LV[c.fieldGroup] || c.fieldGroup || ''; }
            }
            link(e, [key, c.code, c.id, c.hoSoCode]);
        });
        // 3. Quyết định giải quyết bồi thường có hiệu lực
        var qd = m43Read(M43_KEY_QD);
        (Array.isArray(qd) ? qd : []).forEach(function (d) {
            // [gql] Quyết định Hủy quyết định: không tính vào số Quyết định đã ban hành; vụ việc giữ Chờ chi trả / Hoàn thành không tính Cột 12 theo trạng thái
            if (d && d.status === 'Hủy quyết định') { var eh = find([vv(d.claimCode), d.claimCode]); if (eh) eh.qdHuy = true; return; }
            if (!d || d.decisionType && d.decisionType !== 'Quyết định giải quyết bồi thường' || d.status !== 'Đã ban hành' || d.hieuLuc !== 'Có hiệu lực') return;
            var e = find([vv(d.claimCode), d.claimCode]); if (!e) return;
            var h = (d.hieuLucHistory || []).filter(function (x) { return x && x.to === 'Có hiệu lực'; }).pop();
            e.qd = { date: m43Day(h && h.at) || m43Day(d.issueDate), amount: Number(d.total) || 0 };
        });
        // 4. Chi trả tiền bồi thường đã chi trả (Hoàn thành hoặc đã có số tiền chi trả thực tế).
        // Trả lại ngân sách nhà nước: chỉ tính khi trả lại một phần, theo Số tiền đã chi thực tế (payoutAmountReal); không tính số tiền trả lại ngân sách nhà nước
        var kp = m43Read(M43_KEY_KP);
        var payKeys = {};
        (Array.isArray(kp) ? kp : []).forEach(function (p) {
            if (!p || p.type !== 'Chi trả tiền bồi thường') return;
            var ret = M43_PAY_RETURNED.indexOf(p.status) >= 0;
            var real = Number(p.payoutAmountReal) || (ret ? 0 : Number(p.kptbPayment && p.kptbPayment.amount)) || 0;
            if (ret ? !(real > 0) : (p.status !== 'Hoàn thành' && !(Number(p.payoutAmountReal) > 0))) return;
            var e = find([vv(p.ycbtCode), p.ycbtCode, p.vvCode, p.courtCaseCode]); if (!e) return;
            var court = !!(p.courtCaseCode || /^TA-/.test(p.decId || ''));
            // Chi trả nhiều lần: mỗi lần chi 01 dòng theo Ngày chi của lần đó (cộng theo tổng đã chi các lần)
            if (Array.isArray(p.payHistory) && p.payHistory.length) {
                p.payHistory.forEach(function (h) { if (h && Number(h.amount) > 0) e.pay.push({ date: m43Day(h.payDate), amount: Number(h.amount), court: court }); });
            } else {
                e.pay.push({ date: m43Day(p.payoutDate || (p.kptbPayment && p.kptbPayment.payDate)), amount: real || Number(p.amount) || 0, court: court });
            }
            payKeys[e.key] = 1;
        });
        // Hồ sơ mẫu bổ sung: Quyết định / Chi trả mẫu khi kho của phân hệ chưa có
        Object.keys(map).forEach(function (k) {
            var e = map[k], s = e.ag && e.ag.seed; if (!s) return;
            if (!e.qd && s.qd) e.qd = { date: m43Day(s.qd[0]), amount: s.qd[1] };
            if (!payKeys[k] && s.pay) e.pay.push({ date: m43Day(s.pay[0]), amount: s.pay[1], court: false });
        });
        return { list: Object.keys(map).map(function (k) { return map[k]; }), stpOf: function (u) { return W.stpOfUnit(u); } };
    }
    var FIELD_LV = { 'hành chính': 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', 'hình sự': 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', 'dân sự': 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ',
        'tố tụng hành chính': 'TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH', 'thi hành án hình sự': 'TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ', 'thi hành án dân sự': 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ' };
    // Tính số liệu các cột tự tổng hợp theo kỳ báo cáo và Sở Tư pháp của báo cáo: { rows: {I: {3: n, ...}}, n: số vụ việc tính vào Cột 3 - 10, detail: [...] }
    function m43Compute(r) {
        var src = m43Cases(); if (!src) return null;
        var from = m43Day(r.fromDate), to = m43Day(r.toDate);
        var rows = {}; GROUPS.forEach(function (g) { var o = {}; M43_AUTO_COLS.forEach(function (c) { o[c] = 0; }); rows[g.k] = o; });
        var n = 0, detail = [];
        var BASE = { ag: 3, a: 4, b: 5, tt: 6 }, RES = { ag: 12, a: 13, b: 14, tt: 15 }, ING = { ag: 18, a: 19, b: 20, tt: 21 };
        src.list.forEach(function (e) {
            if (!e.unit || src.stpOf(e.unit) !== r.unitId) return;
            var g = m43Group(e.lv); if (!g) return;
            var row = rows[g];
            // Chi trả tiền bồi thường trong kỳ (không phụ thuộc kỳ thụ lý)
            var paid = e.pay.filter(function (p) { return p.date >= from && p.date <= to; });
            if (paid.length) {
                row[25] += 1;
                paid.forEach(function (p) { row[p.court ? 27 : 26] += Math.round(p.amount / 1000); });
            }
            // Nơi thụ lý cuối cùng tính đến ngày cuối kỳ: Tòa án (đã thụ lý) ưu tiên hơn cơ quan trực tiếp quản lý
            var place = e.ct && e.ct.date && e.ct.date <= to && e.ct.basis ? e.ct.basis : (e.ag && e.ag.date && e.ag.date <= to ? 'ag' : '');
            if (!place) return;
            var at = place === 'ag' ? e.ag : e.ct;
            var agDone = place === 'ag' && (e.qd && e.qd.date && e.qd.date <= to || (M43_DONE.indexOf(e.ag.status) >= 0 && !(e.qdHuy && !e.qd)));
            var ctDone = place !== 'ag' && e.ct.status === M43_COURT_DONE && (!e.ct.eff || e.ct.eff <= to);
            var endDate = place === 'ag' ? (agDone && e.qd ? e.qd.date : 0) : (ctDone ? e.ct.eff : 0);
            var isNew = at.date >= from;
            // Kỳ trước chuyển sang: thụ lý trước kỳ, chưa kết thúc trước ngày đầu kỳ
            if (!isNew && endDate && endDate < from) return;
            row[BASE[place] + (isNew ? 0 : 4)] += 1; n++;
            var res;
            if (place === 'ag') {
                if (agDone) { row[12] += 1; row[16] += Math.round(((e.qd && e.qd.amount) || 0) / 1000); res = 12; }
                else if (e.ag.status === 'Đình chỉ giải quyết') { row[22] += 1; res = 22; }
                else { row[18] += 1; res = 18; } // gồm Dừng giải quyết, Từ chối phục hồi danh dự (yêu cầu cả hai)
            } else if (ctDone) { row[RES[place]] += 1; row[16] += Math.round((e.ct.amount || 0) / 1000); res = RES[place]; }
            else { row[ING[place]] += 1; res = ING[place]; }
            detail.push({ key: e.key, g: g, col: BASE[place] + (isNew ? 0 : 4), res: res || '', unit: e.unit, e: e });
        });
        return { rows: rows, n: n, detail: detail };
    }
    // ---------------- Nút «Cập nhật dữ liệu» (05/11/2026, nhanhl2): Mẫu 41/BTNN, Mẫu 43/BTNN, Mẫu số 04 (TT 08/2019) ----------------
    // Chỉ lấy hồ sơ có Loại yêu cầu giải quyết bồi thường là Yêu cầu cả hai hoặc Chỉ yêu cầu bồi thường thiệt hại bằng tiền (m43HonorOnly loại hồ sơ
    // Chỉ yêu cầu phục hồi danh dự và hồ sơ cán bộ chủ động phục hồi danh dự); vụ việc tại Tòa án vẫn lấy, trừ Trả lại đơn khởi kiện (như Mẫu 43).
    // Mẫu 41: thông tin người yêu cầu và cơ quan của từng vụ việc (vụ việc lấy theo cùng tập Mẫu 43 tính ở Cột 3 - 10)
    function m41Info(e) {
        var W = wf(), ag = e.ag || {}, s = ag.seed, rec = ag.rec, c = e.ct && e.ct.raw;
        var ten = function (u) { try { return (W && W.unitName(u)) || u || ''; } catch (x) { return u || ''; } };
        var dc = function (o) { try { return W && W.joinAddress ? W.joinAddress(o) : ''; } catch (x) { return ''; } };
        // Khối người yêu cầu của hồ sơ (nyc): địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố
        var dcNyc = function (n) { n = n || {}; return dc({ address: n.addressDetail || n.address, ward: n.ward || n.phuongXa, city: n.city || n.tinhThanh }) || n.address || ''; };
        // Vụ việc tại Tòa án chưa thụ lý tại cơ quan nhưng có hồ sơ liên kết: lấy người yêu cầu của hồ sơ đó
        if (!rec && c && c.hoSoCode && W) rec = W.loadRecords().find(function (x) { return x && x.code === c.hoSoCode && !m43HonorOnly(x); });
        if (rec) return { hoTen: rec.nycName || (rec.nyc && rec.nyc.name) || '', diaChi: dc(rec) || dcNyc(rec.nyc), coQuan: ten(e.unit) };
        if (s) return { hoTen: s.nyc || '', diaChi: s.dc || '', coQuan: ten(s.unit) };
        if (c) { var n = c.nyc || {}; return { hoTen: n.name || c.nycName || '', diaChi: dcNyc(n), coQuan: c.agency || ten(c.linkedAgencyId || c.rootUnitId) }; }
        return { hoTen: '', diaChi: '', coQuan: ten(e.unit) };
    }
    // Danh mục mới: dòng của vụ việc (gắn Mã vụ việc ẩn _vv) theo nhóm; giữ cột (4), (5), (6) đã nhập của vụ việc trùng Mã vụ việc
    // và giữ nguyên dòng Cán bộ tự thêm (không có _vv); dòng tự động của vụ việc không còn thuộc kỳ thì bỏ
    function m41FromAuto(r, res) {
        var cu = {}, tay = {}, moi = {}, n = 0;
        GROUPS.forEach(function (g) {
            moi[g.k] = []; tay[g.k] = [];
            (r.m41[g.k] || []).forEach(function (row) { if (row._vv) cu[row._vv] = row; else tay[g.k].push(row); });
        });
        res.detail.forEach(function (d) {
            var o = m41Info(d.e), old = cu[d.key] || {};
            moi[d.g].push({ _vv: d.key, hoTen: o.hoTen, diaChi: o.diaChi, coQuan: o.coQuan, tinhHinh: old.tinhHinh || '', khoKhan: old.khoKhan || '', ghiChu: old.ghiChu || '' });
            n++;
        });
        GROUPS.forEach(function (g) { moi[g.k] = moi[g.k].concat(tay[g.k]); });
        return { m41: moi, n: n };
    }
    // Mẫu số 04: hồ sơ Xem xét trách nhiệm hoàn trả mẫu (số tiền theo đồng). Hồ sơ hoàn trả tạo mới trên phân hệ (btnn_hoantra_created_v1)
    // được đọc thêm khi tìm được vụ việc gốc trong kho hồ sơ.
    // 06/11/2026 (nhanhl2 chốt): Cột 7, 8 lấy từ hồ sơ `Chấm dứt hoàn trả` có Quyết định chấm dứt ban hành trong kỳ (cd: ngày ban hành),
    // xếp theo người thi hành công vụ gây thiệt hại (nguoi: [chet, coLoi]); kxd: kết quả Không xác định được người thi hành công vụ gây thiệt hại.
    // Hồ sơ Đình chỉ xem xét hoàn trả (chỉ còn đình chỉ cả hồ sơ) không vào Cột 6, 7, 8.
    var M04_SEED = [
        // Đã ban hành Quyết định hoàn trả, đang thu tiền: Cột 4, 5, 13, 15
        { code: 'HT-2026-101', vv: 'BT-2023-063', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 60000000, tao: '20/03/2026', qd: '15/05/2026', phai: 20000000,
          nop: [['10/06/2026', 8000000], ['10/09/2026', 4000000]] },
        // Đang xem xét, chưa có Quyết định hoàn trả: Cột 6
        { code: 'HT-2026-102', vv: 'BT-2026-193', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 120000000, tao: '05/10/2026' },
        // Quyết định năm trước có giảm mức hoàn trả, nộp từ kỳ trước, hoãn trong kỳ: Cột 4, 5, 11, 13, 14, 15
        { code: 'HT-2025-090', vv: 'BT-2025-120', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', chiTra: 300000000, tao: '10/11/2025', qd: '20/12/2025', phai: 40000000,
          giam: [50000000, 40000000], nop: [['20/12/2025', 5000000], ['20/01/2026', 10000000], ['20/07/2026', 10000000]], hoan: [['01/08/2026', '31/12/2026']] },
        // Quyết định trong kỳ có giảm mức hoàn trả, chưa nộp: Cột 6 không tính (đã có Quyết định), Cột 9, 10, 15
        // Quyết định năm trước không giảm; Quyết định giảm mức hoàn trả bổ sung ban hành trong kỳ: Cột 4, 5 (sau giảm), 9, 10, 13, 14, 15
        { code: 'HT-2025-075', vv: 'BT-2025-098', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 250000000, tao: '05/06/2025', qd: '10/09/2025', phai: 50000000,
          giamBs: [['15/07/2026', 42000000, 32000000]], nop: [['10/10/2025', 8000000], ['10/02/2026', 6000000]] },
        { code: 'HT-2026-115', vv: 'BT-2026-140', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', chiTra: 80000000, tao: '02/06/2026', qd: '25/08/2026', phai: 9000000, giam: [12000000, 9000000] },
        // ===== Cột 7, 8 - Số vụ việc không xem xét (06/11/2026) =====
        // Tất cả còn sống, không có lỗi: Cột 7
        { code: 'HT-2026-120', vv: 'BT-2026-150', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 45000000, tao: '10/04/2026', cd: '20/09/2026', nguoi: [[false, false], [false, false]] },
        // Tất cả đã chết: Cột 8
        { code: 'HT-2026-121', vv: 'BT-2026-151', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', chiTra: 90000000, tao: '15/05/2026', cd: '05/10/2026', nguoi: [[true, true], [true, false]] },
        // Còn sống không có lỗi và đã chết; người đã chết đều có lỗi: Cột 8
        { code: 'HT-2026-122', vv: 'BT-2026-152', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', chiTra: 70000000, tao: '20/03/2026', cd: '12/08/2026', nguoi: [[false, false], [true, true]] },
        // Còn sống không có lỗi và đã chết; người đã chết đều không có lỗi: Cột 7
        { code: 'HT-2026-123', vv: 'BT-2026-153', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 38000000, tao: '02/02/2026', cd: '01/07/2026', nguoi: [[false, false], [true, false]] },
        // Người đã chết có cả có lỗi và không có lỗi: không tính
        { code: 'HT-2026-124', vv: 'BT-2026-154', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 52000000, tao: '11/03/2026', cd: '15/09/2026', nguoi: [[false, false], [true, true], [true, false]] },
        // Không xác định được người thi hành công vụ gây thiệt hại: không tính
        { code: 'HT-2026-125', vv: 'BT-2026-155', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 30000000, tao: '05/01/2026', cd: '10/09/2026', kxd: true, nguoi: [] },
        // Đình chỉ xem xét hoàn trả (cả hồ sơ): không vào Cột 6, 7, 8
        { code: 'HT-2026-126', vv: 'BT-2026-156', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 64000000, tao: '18/02/2026', dinhChi: true },
        // Quyết định chấm dứt ban hành sau ngày 31/10/2026: kỳ thực tế tính Cột 6 (chưa có Quyết định chấm dứt đến cuối kỳ), kỳ chính thức tính Cột 7
        { code: 'HT-2026-127', vv: 'BT-2026-157', unit: 'STP-HN', lv: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', chiTra: 26000000, tao: '25/06/2026', cd: '10/11/2026', nguoi: [[false, false]] }
    ];
    // Xếp hồ sơ Chấm dứt hoàn trả vào Cột 7 hoặc Cột 8 (06/11/2026, nhanhl2 chốt); trả về 7, 8 hoặc 0 (không tính)
    function m04CotKhongXemXet(h) {
        var ds = h.nguoi || []; if (h.kxd || !ds.length) return 0;          // Không xác định được người thi hành công vụ gây thiệt hại
        var song = ds.filter(function (x) { return !x[0]; }), chet = ds.filter(function (x) { return x[0]; });
        if (song.some(function (x) { return x[1]; })) return 0;                // Có người còn sống có lỗi
        if (!chet.length) return 7;                                             // Tất cả còn sống, không có lỗi
        if (!song.length) return 8;                                             // Tất cả đã chết
        if (chet.every(function (x) { return x[1]; })) return 8;               // Còn sống không lỗi + đã chết, người đã chết đều có lỗi
        if (chet.every(function (x) { return !x[1]; })) return 7;              // Còn sống không lỗi + đã chết, người đã chết đều không có lỗi
        return 0;                                                               // Người đã chết có cả có lỗi và không có lỗi
    }
    function m04Dossiers() {
        var W = wf(), list = M04_SEED.slice(), recs = W ? W.loadRecords() : [];
        var them = m43Read('btnn_hoantra_created_v1');
        (Array.isArray(them) ? them : []).forEach(function (d) {
            if (!d || !d.claimCode) return;
            var rec = recs.find(function (x) { return x && (x.code === d.claimCode || x.claimCode === d.claimCode); }); if (!rec || m43HonorOnly(rec)) return;
            list.push({ code: d.code, vv: d.claimCode, unit: W.getRootId(rec.rootUnitId) || rec.rootUnitId, lv: rec.linhVuc || '', chiTra: Number(d.claimAmt) || 0, tao: d.dateCreated, qd: d.qdDate,
                phai: Number(d.refundTotal) || 0, nop: (d.payments || []).map(function (p) { return [p.date, Number(p.amt) || 0]; }), dinhChi: /Đình chỉ/.test(d.status || ''),
                // Hồ sơ Chấm dứt hoàn trả: ngày ban hành Quyết định chấm dứt, người thi hành công vụ (Đã chết theo DM_59, Mức độ lỗi khác Không có lỗi)
                cd: d.status === 'Chấm dứt hoàn trả' && d.dcht ? (d.dcht.ngay || String(d.dcht.issuedAt || '').slice(0, 10)) : '',
                kxd: /Không xác định được/.test(d.cdLyDo || ''),
                nguoi: (d.refundOfficers || []).filter(function (o) { return o && o.name; }).map(function (o) { return [!!(o.daChet || o.trangThaiNguoi === 'Đã chết'), o.loi !== 'Không có lỗi']; }) });
        });
        return list;
    }
    var M04_AUTO_COLS = [2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15];   // 06/11/2026: thêm Cột 7, 8
    function m04Compute(r) {
        var W = wf(); if (!W) return null;
        var from = m43Day(r.fromDate), to = m43Day(r.toDate), dong = {}, n = 0;
        GROUPS.forEach(function (g) { var o = {}; M04_AUTO_COLS.forEach(function (c) { o[c] = 0; }); dong[g.k] = o; });
        m04Dossiers().forEach(function (h) {
            if (!h.unit || W.stpOfUnit(h.unit) !== r.unitId) return;
            var g = m43Group(h.lv); if (!g) return;
            var tao = m43Day(h.tao), qd = m43Day(h.qd); if (!tao || tao > to) return;
            var o = dong[g], nop = h.nop || [], cong = function (f) { return nop.reduce(function (s, p) { var d = m43Day(p[0]); return s + (f(d) ? p[1] : 0); }, 0); };
            var daNopDenCuoi = cong(function (d) { return d && d <= to; }), daNopTruoc = cong(function (d) { return d && d < from; }), daNopTrong = cong(function (d) { return d >= from && d <= to; });
            var coQd = !!qd && qd <= to; n++;
            // Mốc của Quyết định hoàn trả và Quyết định giảm mức hoàn trả bổ sung: ngày ban hành (nhanhl2 chốt 05/11/2026)
            var bs = (h.giamBs || []).map(function (x) { return { d: m43Day(x[0]), tien: (x[1] || 0) - (x[2] || 0) }; });
            var phaiDen = function (f) { return (h.phai || 0) - bs.reduce(function (s, x) { return s + (f(x.d) ? x.tien : 0); }, 0); };
            var phaiCuoi = phaiDen(function (d) { return d && d <= to; }), phaiDau = phaiDen(function (d) { return d && d < from; });
            if (tao >= from) o[2] += h.chiTra || 0;                                     // Cột 2: vụ việc làm căn cứ xem xét hoàn trả trong kỳ
            if (coQd && daNopDenCuoi > 0) { o[4] += 1; o[5] += phaiCuoi; }               // Cột 4, 5 (tại ngày cuối kỳ)
            var cd = m43Day(h.cd);
            if (!coQd && !h.dinhChi && !(cd && cd <= to)) o[6] += 1;                   // Cột 6: loại hồ sơ đình chỉ, hồ sơ có Quyết định chấm dứt đến hết ngày cuối kỳ
            if (!h.dinhChi && cd && cd >= from && cd <= to) { var k78 = m04CotKhongXemXet(h); if (k78) o[k78] += 1; }   // Cột 7, 8
            // Cột 9, 10: giảm ngay trong Quyết định hoàn trả và Quyết định giảm mức hoàn trả bổ sung ban hành trong kỳ; hồ sơ tính 01 lần ở Cột 9
            var giamQd = h.giam && qd >= from && qd <= to ? h.giam[0] - h.giam[1] : 0, bsTrong = bs.filter(function (x) { return x.d >= from && x.d <= to; });
            if (giamQd || bsTrong.length) { o[9] += 1; o[10] += giamQd + bsTrong.reduce(function (s, x) { return s + x.tien; }, 0); }
            if ((h.hoan || []).some(function (x) { var a = m43Day(x[0]), b = m43Day(x[1]) || 99999999; return a <= to && b >= from; })) o[11] += 1; // Cột 11
            o[13] += daNopTrong;                                                         // Cột 13
            if (qd && qd < from && phaiDau - daNopTruoc > 0) o[14] += daNopTruoc;       // Cột 14
            if (coQd) o[15] += Math.max(0, phaiCuoi - daNopDenCuoi);                     // Cột 15
        });
        // Quy đổi nghìn đồng: cộng theo đồng rồi chia 1.000, làm tròn nửa lên (như Cột 16, 26, 27 của Mẫu 43)
        GROUPS.forEach(function (g) { [2, 5, 10, 13, 14, 15].forEach(function (c) { dong[g.k][c] = Math.round(dong[g.k][c] / 1000); }); });
        return { rows: dong, n: n };
    }
    // Popup xác nhận rồi màn chờ; Hệ thống không tự lưu báo cáo
    function xacNhanCapNhatDuLieu(r) {
        collect(r);
        var html = '<div class="bctt-modal" style="width:600px;"><div class="bctt-mh"><div><div class="tt">Đồng bộ dữ liệu</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><p>Hệ thống lấy dữ liệu từ ' + esc(r.fromDate) + ' đến ' + esc(r.toDate) + ', chỉ từ hồ sơ có Loại yêu cầu giải quyết bồi thường là <strong>Yêu cầu cả hai (Bồi thường tiền &amp; Phục hồi danh dự)</strong> hoặc <strong>Chỉ yêu cầu bồi thường thiệt hại bằng tiền</strong>, cho 03 biểu mẫu sau:</p>'
            // 06/11/2026 (nhanhl2): không ghi rõ cột nào bị ghi đè, cột nào giữ nguyên; chỉ nêu tên 03 biểu mẫu
            + '<ul style="margin:8px 0 0;padding-left:20px;line-height:1.7;">'
            + '<li><strong>Mẫu 41/BTNN</strong> - Danh mục vụ việc giải quyết yêu cầu bồi thường</li>'
            + '<li><strong>Mẫu 43/BTNN</strong> - Tổng hợp tình hình yêu cầu bồi thường, giải quyết bồi thường và chi trả tiền bồi thường</li>'
            + '<li><strong>Mẫu số 04 (TT 08/2019)</strong> - Tình hình thực hiện trách nhiệm hoàn trả</li></ul>'
            + '<p style="margin-top:8px;">Hệ thống không tự lưu báo cáo. Bạn có muốn tiếp tục?</p></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-primary" id="bcttDataSyncOk"><i class="fa-solid fa-rotate"></i> Đồng bộ</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        $('bcttDataSyncOk').onclick = function () {
            closeOv('bcttOv2');
            choXuLy('Đang đồng bộ dữ liệu', 3, function () { apDungCapNhatDuLieu(r); }, 'Đã đồng bộ {n}/{t} biểu mẫu...', 'Vui lòng chờ, không thao tác trong lúc hệ thống đồng bộ dữ liệu.');
        };
    }
    function apDungCapNhatDuLieu(r) {
        var a = null, b = null;
        try { a = m43Compute(r); b = m04Compute(r); } catch (e) { a = null; }
        if (!a || !b) { toast('Kết nối tới hệ thống bị gián đoạn. Vui lòng thử lại sau.', 'error'); return; }
        GROUPS.forEach(function (g) {
            M43_AUTO_COLS.forEach(function (c) { r.m43[g.k][c] = a.rows[g.k][c]; });
            if (!r.m04[g.k]) r.m04[g.k] = {};
            M04_AUTO_COLS.forEach(function (c) { r.m04[g.k][c] = b.rows[g.k][c]; });
        });
        var m41 = m41FromAuto(r, a); r.m41 = m41.m41;
        renderM41Tab(r, true); renderM43Tab(r, true); renderM04Tab(r, true);
        // Biểu mẫu không có dữ liệu: Mẫu 41/BTNN và Mẫu 43/BTNN cùng tập vụ việc (quy tắc 12); Mẫu số 04 theo hồ sơ hoàn trả (quy tắc 12b)
        var trong = (a.n ? [] : ['Mẫu 41/BTNN', 'Mẫu 43/BTNN']).concat(b.n ? [] : ['Mẫu số 04 (TT 08/2019)']);
        var noi = function (ds) { return ds.length > 1 ? ds.slice(0, -1).join(', ') + ' và ' + ds[ds.length - 1] : ds[0]; };
        var kq = 'Đã đồng bộ dữ liệu: Mẫu 41/BTNN ' + m41.n + ' vụ việc, Mẫu 43/BTNN ' + a.n + ' vụ việc thụ lý, Mẫu số 04 ' + b.n + ' hồ sơ hoàn trả.';
        if (!trong.length) toast(kq + ' Báo cáo chưa được lưu.', 'success');
        else if (trong.length === 3) toast('Không có dữ liệu phù hợp trong kỳ báo cáo cho ' + noi(trong) + '. Số liệu các cột lấy tự động bằng 0. Báo cáo chưa được lưu.', 'warning');
        else toast(kq + ' Không có dữ liệu phù hợp trong kỳ báo cáo cho ' + noi(trong) + '. Báo cáo chưa được lưu.', 'warning');
    }
    // Popup Xác nhận dùng chung [POPUP-CFM-001]: nút `Hủy` và `Xác nhận`
    function xacNhanXoa(msg, ok) {
        var html = '<div class="bctt-modal" style="width:460px;"><div class="bctt-mh"><div><div class="tt">Xác nhận xóa</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><p><i class="fa-solid fa-trash" style="color:#dc2626;margin-right:8px;"></i>' + esc(msg) + '</p></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy</button><button class="btn btn-danger" id="bcttXoaOk">Xác nhận</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        $('bcttXoaOk').onclick = function () { closeOv('bcttOv2'); ok(); };
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
            // 06/11/2026: nút Thu gọn / Mở rộng của khối thông báo trên trang
            // 06/11/2026 (góp ý nhanhl2): nút chỉ có icon; thu gọn còn một dòng tiêu đề, ẩn nội dung và nút hành động
            '.bctt-tg-nut{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;width:28px;height:28px;padding:0;border:1px solid transparent;border-radius:50%;background:transparent;color:inherit;font-size:13px;cursor:pointer;}',
            '.bctt-tg-nut:hover{background:rgba(15,23,42,.07);border-color:rgba(15,23,42,.12);}', '.bctt-tg-nut:focus-visible{outline:2px solid currentColor;outline-offset:1px;}',
            '.tg-dong .tg-than,.tg-dong .bctt-han-nut{display:none !important;}',
            '.bctt-han.tg-dong,.bctt-alert.tg-dong,.bctt-sau-gui.tg-dong{padding-top:6px;padding-bottom:6px;align-items:center;}',
            '.bctt-han.tg-dong .bctt-han-noi{align-items:center;}', '.bctt-han.tg-dong .bctt-han-noi>i{font-size:15px;margin-top:0;}', '.bctt-sau-gui.tg-dong>i{margin-top:0;}',
            '.tg-dong .tg-dau{align-items:center;}', '.tg-dau .bctt-tg-nut{margin:-4px -6px -4px 0;}',
            '.tg-dau{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}', '.tg-dau > b{margin-bottom:0 !important;}',
            '.bctt-han-nhom-nut{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}',
            // 06/11/2026: khối gộp nhiều kỳ - mỗi kỳ một dòng, nút Xem báo cáo cuối dòng; nút trên đầu khối chỉ còn Thu gọn / Mở rộng
            '.bctt-han-ds{list-style:none;margin:4px 0 0;padding:0;font-size:12.5px;}', '.bctt-han-ds li{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:5px 0;border-top:1px dashed rgba(153,27,27,.18);}',
            '.bctt-han-ds li:first-child{border-top:0;}', '.bctt-han.canh-bao .bctt-han-ds li{border-top-color:rgba(154,52,18,.18);}', '.bctt-han-ds .bctt-han-nut{flex:0 0 auto;padding:4px 10px;}',
            '.bctt-han:has(.bctt-han-ds){align-items:flex-start;}',
            // Khối Bị trả lại trên trang chi tiết: màu đỏ theo kg/ui-mau mẫu 20, không viền trái dày (06/11/2026)
            '#bcttRejectBox{background:#fef2f2;border:1px solid #fecaca;color:#991b1b;}', '#bcttRejectBox b.t{color:#991b1b;}',
            // 06/11/2026: ghi chú số liệu sửa sau khi gửi; ghi chú thời điểm trong popup Chi tiết các đơn vị; khung nhúng trang chi tiết của đơn vị
            '.bctt-sau-gui{display:flex;gap:12px;align-items:flex-start;padding:12px 16px;margin:12px 0;border:1px solid #bfdbfe;border-radius:8px;background:#eff6ff;color:#1e3a8a;font-size:13px;line-height:1.6;}',
            '.bctt-sau-gui > i{margin-top:3px;color:#2563eb;}', '.bctt-sau-gui b{display:block;margin-bottom:2px;}',
            '.ctdv-ghi-chu{display:flex;flex-direction:column;gap:4px;margin:10px 0 2px;font-size:12.5px;color:#475569;}', '.ctdv-ghi-chu i{width:16px;color:#2563eb;}',
            '.bctt-nhung-khung{flex:1;min-height:0;width:100%;border:0;border-top:1px solid #e2e8f0;background:#f8fafc;}',
            'body.bctt-nhung .page-heading,body.bctt-nhung #boMainTabs,body.bctt-nhung #boPanel_th,body.bctt-nhung .btnn-gl-bar,body.bctt-nhung #bcttBack,body.bctt-nhung .bctt-thanh-nut{display:none !important;}',
            'body.bctt-nhung #boPanel_tong{display:block !important;}', 'body.bctt-nhung .container{padding-top:12px;}',
            // Thanh thông báo hạn gửi: theo khối cảnh báo của trang Chi trả tiền bồi thường (03/11/2026)
            '.bctt-han{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 16px;margin:0 0 12px;border:1px solid;border-radius:8px;}',
            '.bctt-han.canh-bao{background:#fff7ed;border-color:#fed7aa;color:#9a3412;}.bctt-han.canh-bao .bctt-han-noi>i{color:#ea580c;}',
            '.bctt-han.loi{background:#fef2f2;border-color:#fecaca;color:#991b1b;}.bctt-han.loi .bctt-han-noi>i{color:#dc2626;}',
            '.bctt-han-noi{display:flex;align-items:flex-start;gap:10px;flex:1 1 320px;min-width:0;}.bctt-han-noi>i{font-size:20px;margin-top:2px;}',
            '.bctt-han-tt{font-weight:800;}.bctt-han-nd{font-size:12.5px;margin-top:3px;}',
            '.bctt-han-nut{font-size:12.5px;padding:6px 12px;background:#fff;color:#1e3a8a;border:1px solid #1e3a8a;}.bctt-han-nut:hover{background:#eff6ff;}',
            '.bctt-ltabs{display:flex;gap:8px;align-items:center;border-bottom:1px solid #e2e8f0;margin:0 0 16px;background:#fff;border-radius:8px 8px 0 0;padding:0 8px;}',
            '.bctt-ltab{border:0;background:transparent;padding:10px 16px;font-size:13.5px;font-weight:600;color:#64748b;cursor:pointer;border-bottom:3px solid transparent;display:inline-flex;align-items:center;gap:8px;font-family:inherit;}',
            '.bctt-ltab.active{color:#2563eb;border-bottom-color:#2563eb;}',
            '.bctt-meta{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px 18px;}',
            '.bctt-meta label{display:block;font-size:11.5px;color:#64748b;font-weight:600;margin-bottom:3px;}',
            '.bctt-meta strong{font-size:13.5px;color:#1e293b;font-weight:600;}',
            '.bctt-sub{display:block;font-size:11.5px;color:#64748b;margin-top:3px;}',
            '.bctt-sig{height:40px;border:1px dashed #cbd5e1;border-radius:4px;background:#fff;vertical-align:middle;margin-right:8px;}',
            '.bctt-alert{background:#fffbeb;border:1px solid #fde68a;border-left:4px solid #f59e0b;border-radius:8px;padding:12px 16px;margin:14px 0 0;color:#92400e;font-size:13px;line-height:1.6;}',
            '.bctt-alert b.t{display:block;color:#b45309;margin-bottom:2px;}',
            '.bctt-files{margin-top:16px;}',
            // Khối Lịch sử xử lý mở rộng / thu gọn (04/11/2026)
            '.bctt-ls-dau{display:flex !important;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;user-select:none;}',
            '.bctt-ls-dem{font-weight:400;color:#64748b;font-size:13px;margin-left:6px;}',
            '.bctt-ls[data-mo="0"] .bctt-ls-than{display:none;}.bctt-ls[data-mo="0"] .bctt-ls-dau{margin-bottom:0 !important;}',
            '.bctt-ls-nut i{transition:transform .2s;}.bctt-ls[data-mo="1"] .bctt-ls-nut i{transform:rotate(180deg);}',
            '.bctt-files .custom-table td{white-space:normal;}',
            // Bảng Tệp báo cáo và Văn bản yêu cầu điều chỉnh: Ngày ký, Loại tệp, Thao tác trên một dòng (cả màn rà soát của Bộ)
            '#bcttFileTable td:nth-last-child(-n+2),#bcttFileTable th:nth-last-child(-n+2),#bcttYCTable td:nth-last-child(-n+3),#bcttYCTable th:nth-last-child(-n+3){white-space:nowrap !important;}',
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
            // Dòng mở popup nội dung các đơn vị dưới mỗi ô Mẫu 42 của Bộ: rê chuột đổi màu
            '.m42-nguon{display:inline-block;margin-top:4px;padding:2px 0;border:0;background:none;color:#2563eb;font:inherit;font-size:11.5px;cursor:pointer;text-align:left;transition:color .15s;}',
            // Chữ xanh ngay từ đầu để biết bấm được, nhỏ hơn chữ nhãn (nhanhl2 04/11/2026); rê chuột thì xanh đậm và gạch chân
            '.m42-nguon:hover,.m42-nguon:focus-visible{color:#1e40af;text-decoration:underline;outline:none;}',
            '.m42s-muc{padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-family:"Times New Roman",serif;font-size:14px;color:#111827;line-height:1.5;}',
            '.m42s-sec{font-weight:700;}.m42s-blk{font-weight:700;margin-top:2px;}.m42s-it{margin-top:2px;padding-left:18px;}',
            '.m42s-loc{display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap;margin:14px 0 12px;}',
            // Bảng cuộn trong khung, tiêu đề cột đứng yên, thanh phân trang luôn hiện dưới bảng
            '.m42s-modal{max-height:94vh;}.m42s-mb{display:flex;flex-direction:column;overflow:hidden;}.m42s-phieu{margin-bottom:14px;padding:12px 14px;border:1px solid #e2e8f0;border-radius:8px;grid-template-columns:minmax(0,2.6fr) minmax(0,1.5fr) minmax(0,.7fr) minmax(0,.7fr);}',
            '#bcttM42sBang{flex:1;min-height:0;display:flex;flex-direction:column;}#bcttM42sBang .table-container{flex:1;min-height:120px;overflow:auto;}#bcttM42sBang .pagination-bar{flex:none;}#bcttM42sTbl thead th{position:sticky;top:0;z-index:1;}',
            // Dòng «Xem chi tiết theo đơn vị» trong dòng mục lớn của Mẫu 41, 43, 04: cùng dòng, bên phải tên mục
            '.bctt-m41 tr.g .m42-nguon,.bctt-m43 tr.g .m42-nguon,.bctt-m04 tr.g .m42-nguon{margin:0 0 0 16px;padding:0;font-weight:400;vertical-align:baseline;}',
            // Bảng popup: cột số căn phải; Mẫu 43, Mẫu số 04 nhiều cột thì cuộn ngang, cột STT và Đơn vị báo cáo đứng yên bên trái
            '#bcttM42sTbl th{white-space:nowrap;}#bcttM42sTbl .so{text-align:right;white-space:nowrap;}#bcttM42sTbl th.so{text-align:center;cursor:help;}',
            '#bcttM42sTbl.ctdv-mau thead{position:sticky;top:0;z-index:5;}#bcttM42sTbl.ctdv-mau thead th{position:static;white-space:normal;min-width:72px;}',
            '#bcttM42sTbl.ctdv-mau .ctdv-c1{position:sticky;left:0;z-index:2;background:#fff;width:60px;min-width:60px;text-align:center;}',
            '#bcttM42sTbl.ctdv-mau .ctdv-c2{position:sticky;left:60px;z-index:2;background:#fff;min-width:220px;box-shadow:inset -1px 0 0 #cbd5e1;}',
            '#bcttM42sTbl.ctdv-mau thead .ctdv-c1,#bcttM42sTbl.ctdv-mau thead .ctdv-c2{z-index:6;background:#f1f5f9;}#bcttM42sTbl.ctdv-mau tbody tr.list-row:hover td{background:#f8fafc;}',
            '#bcttM42sTbl.ctdv-mau tr.ctdv-tong td{background:#fff;font-weight:700;border-bottom:2px solid #94a3b8;}',
            '#bcttM42sTbl.bctt-m41 .m41s-o{white-space:pre-wrap;}#bcttM42sTbl.ctdv-mau .ctdv-pl{min-width:200px;text-align:left;}',
            '.m41s-ds{margin:0;padding-left:18px;line-height:1.55;}.m41s-ds li+li{margin-top:4px;}',
            '#bcttM42sTbl td{vertical-align:top;}#bcttM42sTbl tbody tr.list-row{cursor:pointer;}#bcttM42sTbl tbody tr.list-row:hover .m42s-ten{color:#1d4ed8;text-decoration:underline;}',
            '.m42s-ten{font-weight:600;color:#1e293b;}.m42s-nd{white-space:pre-wrap;line-height:1.55;color:#111827;}.m42s-rong{color:#94a3b8;font-style:italic;}',
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
            // Màn chờ xử lý (choXuLy): phủ toàn trang, chặn thao tác
            '.bctt-cho{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.45);cursor:progress;}',
            '.bctt-cho-hop{display:flex;flex-direction:column;align-items:center;gap:10px;min-width:360px;padding:26px 32px;border-radius:10px;background:#fff;box-shadow:0 20px 45px rgba(0,0,0,.3);outline:none;text-align:center;}',
            '.bctt-cho-quay{width:46px;height:46px;border:4px solid #dbeafe;border-top-color:#1e3a8a;border-radius:50%;animation:bctt-quay .8s linear infinite;}',
            '@keyframes bctt-quay{to{transform:rotate(360deg);}}@media (prefers-reduced-motion:reduce){.bctt-cho-quay{animation-duration:2s;}}',
            '.bctt-cho-tt{font-size:15px;font-weight:700;color:#1e3a8a;}.bctt-cho-dem{font-size:13px;color:#334155;}.bctt-cho-ghi{font-size:12px;color:#64748b;}',
            '.bctt-cho-thanh{width:100%;height:6px;border-radius:3px;background:#e2e8f0;overflow:hidden;}.bctt-cho-thanh span{display:block;height:100%;width:0;background:#1e3a8a;transition:width .09s linear;}',
            // Bộ lọc của popup Chi tiết số liệu và nút giải thích (goiY)
            '.bctt-loc-cs{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1.8fr) minmax(0,1.2fr);gap:12px;align-items:end;}',
            '.bctt-goi-y{position:relative;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;margin-left:6px;padding:0;border:0;border-radius:50%;background:none;color:#64748b;font-size:13px;cursor:help;vertical-align:-3px;}',
            '.bctt-goi-y:hover,.bctt-goi-y:focus-visible{color:#1d4ed8;outline:none;}',
            '.bctt-goi-y-nd{display:none;position:absolute;left:-8px;top:calc(100% + 8px);z-index:30;width:340px;padding:10px 12px;border-radius:8px;background:#1e293b;color:#fff;font-size:12.5px;font-weight:400;line-height:1.55;text-align:left;text-transform:none;letter-spacing:normal;white-space:normal;box-shadow:0 8px 20px rgba(15,23,42,.25);}',
            '.bctt-goi-y:hover .bctt-goi-y-nd,.bctt-goi-y:focus .bctt-goi-y-nd{display:block;}',
            '.bctt-th-btp{margin-top:18px;padding-top:16px;border-top:1px solid #e2e8f0;}',
            '.bctt-yc-xem{max-height:72vh;overflow:auto;padding:4px 16px 20px;border-radius:8px;background:#334155;}.bctt-yc-xem .bctt-a4{max-width:100%;}',
            '.bctt-thanh-nut{position:sticky;bottom:0;z-index:20;margin-bottom:0;box-shadow:0 -2px 10px rgba(15,23,42,.08);}',
            // Thanh cuộn ngang nổi (cuonNoi, 04/11/2026)
            '.cuon-noi{position:sticky;z-index:15;overflow-x:auto;overflow-y:hidden;height:14px;background:#F1F5F9;border:1px solid #E2E8F0;border-top:0;border-radius:0 0 8px 8px;}',
            '.cuon-noi>div{height:1px;}.cuon-noi::-webkit-scrollbar{height:12px;}.cuon-noi::-webkit-scrollbar-track{background:#F1F5F9;}.cuon-noi::-webkit-scrollbar-thumb{background:#94A3B8;border-radius:6px;border:2px solid #F1F5F9;}.cuon-noi::-webkit-scrollbar-thumb:hover{background:#64748B;}',
            '.co-cuon-noi{scrollbar-width:none;}.co-cuon-noi::-webkit-scrollbar{height:0;display:none;}',
            // Lịch chọn ngày chuẩn (lichChuan, 04/11/2026)
            '.flatpickr-calendar.lich-chuan{width:304px;padding:10px 12px 8px;border:1px solid #E2E8F0;border-radius:10px;box-shadow:0 12px 32px rgba(15,23,42,.16);font-family:inherit;}',
            '.flatpickr-calendar.lich-chuan:before,.flatpickr-calendar.lich-chuan:after{display:none;}',
            '.lich-chuan .flatpickr-months{position:relative;align-items:center;height:40px;margin-bottom:4px;}',
            '.lich-chuan .flatpickr-months .flatpickr-month{height:40px;color:#1E293B;fill:#1E293B;overflow:visible;}',
            '.lich-chuan .flatpickr-current-month{left:0;width:100%;height:40px;padding:4px 0 0;display:flex;align-items:center;justify-content:center;gap:6px;font-size:14px;}',
            '.lich-chuan .flatpickr-current-month .flatpickr-monthDropdown-months,.lich-chuan .lich-nam{height:32px;margin:0;padding:0 26px 0 10px;border:1px solid #CBD5E1;border-radius:6px;background:#fff url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22%3E%3Cpath d=%22M1 1l4 4 4-4%22 stroke=%22%2364748B%22 stroke-width=%221.5%22 fill=%22none%22/%3E%3C/svg%3E") no-repeat right 9px center;-webkit-appearance:none;appearance:none;font-family:inherit;font-size:13.5px;font-weight:600;color:#1E293B;cursor:pointer;outline:none;}',
            '.lich-chuan .flatpickr-current-month .flatpickr-monthDropdown-months:hover,.lich-chuan .lich-nam:hover{border-color:#3B82F6;background-color:#fff;}',
            '.lich-chuan .flatpickr-current-month .flatpickr-monthDropdown-months:focus,.lich-chuan .lich-nam:focus{border-color:#3B82F6;box-shadow:0 0 0 2px rgba(59,130,246,.18);}',
            '.lich-chuan .numInputWrapper{display:none !important;}',
            '.lich-chuan .flatpickr-prev-month,.lich-chuan .flatpickr-next-month{top:4px;height:32px;width:32px;padding:9px;border-radius:6px;color:#475569;fill:#475569;}',
            '.lich-chuan .flatpickr-prev-month:hover,.lich-chuan .flatpickr-next-month:hover{background:#F1F5F9;}.lich-chuan .flatpickr-prev-month:hover svg,.lich-chuan .flatpickr-next-month:hover svg{fill:#1E3A8A;}',
            '.lich-chuan .flatpickr-weekdays{height:30px;}.lich-chuan span.flatpickr-weekday{color:#64748B;font-weight:600;font-size:12px;}',
            '.lich-chuan .flatpickr-days,.lich-chuan .dayContainer{width:280px;min-width:280px;max-width:280px;}',
            '.lich-chuan .flatpickr-day{height:36px;line-height:34px;max-width:40px;border-radius:8px;color:#1E293B;font-size:13px;}',
            '.lich-chuan .flatpickr-day:hover,.lich-chuan .flatpickr-day:focus{background:#EFF6FF;border-color:#EFF6FF;}',
            '.lich-chuan .flatpickr-day.today{border-color:#3B82F6;color:#1D4ED8;font-weight:600;}.lich-chuan .flatpickr-day.today:hover{background:#EFF6FF;color:#1D4ED8;}',
            '.lich-chuan .flatpickr-day.selected,.lich-chuan .flatpickr-day.selected:hover,.lich-chuan .flatpickr-day.selected.today{background:#1E3A8A;border-color:#1E3A8A;color:#fff;font-weight:600;}',
            '.lich-chuan .flatpickr-day.prevMonthDay,.lich-chuan .flatpickr-day.nextMonthDay{color:#CBD5E1;}',
            '.lich-chan{display:flex;justify-content:space-between;margin-top:6px;padding-top:8px;border-top:1px solid #E2E8F0;}',
            '.lich-chan button{border:0;background:none;padding:4px 10px;border-radius:6px;color:#2563EB;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;}.lich-chan button:hover{background:#EFF6FF;}.lich-chan button[data-l=xoa]{color:#64748B;}',
            // Ô ngày: biểu tượng lịch trong ô (04/11/2026)
            '.bctt-ngay{position:relative;}.bctt-ngay .form-control{padding-right:36px;}.bctt-ngay>i{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#64748B;pointer-events:none;}',
            '.bctt-chg{border-color:#d97706 !important;background:#fffbeb !important;}',
            '.bctt-btpcard{border:1px solid #e2e8f0;border-radius:8px;padding:14px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;}',
            '.bctt-ag{overflow:hidden;resize:none;min-height:34px;line-height:1.45;}',
            '.bctt-m41 tr.add-row td{background:#fff !important;}',
            // Mẫu 41 (tab và popup, 04/11/2026 nhanhl2): tiêu đề cột trên một dòng, bảng rộng thì cuộn ngang; độ rộng tối thiểu theo cột, cột Ghi chú rộng hơn.
            // Ghi đè luật uxu-fit của btnn_cot_thao_tac.js (cho tiêu đề xuống dòng khi bảng tràn khung)
            'table.bctt-m41 > thead > tr > th, table.bctt-m41.uxu-fit > thead > tr > th:not(.ctdv-khong-co){white-space:nowrap !important;}#bcttM42sTbl.ctdv-mau.bctt-m41 thead th{white-space:nowrap;}',
            '.bctt-m41 .m41-c-hoTen,#bcttM42sTbl.bctt-m41 .m41-c-hoTen{min-width:200px;}.bctt-m41 .m41-c-diaChi,#bcttM42sTbl.bctt-m41 .m41-c-diaChi{min-width:230px;}.bctt-m41 .m41-c-coQuan,#bcttM42sTbl.bctt-m41 .m41-c-coQuan{min-width:220px;}.bctt-m41 .m41-c-tinhHinh,#bcttM42sTbl.bctt-m41 .m41-c-tinhHinh{min-width:300px;}.bctt-m41 .m41-c-khoKhan,#bcttM42sTbl.bctt-m41 .m41-c-khoKhan{min-width:260px;}.bctt-m41 .m41-c-ghiChu,#bcttM42sTbl.bctt-m41 .m41-c-ghiChu{min-width:320px;}',
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
            '.bctt-a4 .knwrap{position:absolute;right:24px;bottom:16px;display:flex;flex-direction:column;align-items:flex-end;gap:4px;}',
            '.bctt-a4:has(.knwrap){padding-bottom:72px;}', // chừa chỗ cho ô ký nháy, không đè nội dung cuối trang
            '.bctt-a4 .knbox{border:1px dashed #b45309;background:#fffbeb;color:#92400e;font-family:Inter,sans-serif;font-size:10.5px;padding:4px 8px;border-radius:4px;}',
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
                + ROLE_ORDER.map(function (k) { return '<option value="' + k + '">' + esc(ROLES[k].label) + '</option>'; }).join('') + '</select>';
            $('bcttRole').value = role;
            $('bcttRole').onchange = function () { setRole(this.value); };
        }
        if (!$('bcttApp')) { var app = document.createElement('section'); app.id = 'bcttApp'; document.querySelector('.container').appendChild(app); }
        var ov = document.createElement('div'); ov.id = 'bcttOverlays'; document.body.appendChild(ov);
        ov.innerHTML = '<div class="bctt-ov" id="bcttOv1"></div><div class="bctt-ov" id="bcttOv2" style="z-index:2600"></div><div class="bctt-full" id="bcttFull"></div>';
    }
    function closeOv(id) { var e = $(id); if (e) { e.classList.remove('on'); e.innerHTML = ''; } if (id === 'bcttOv1' && trinhLaiCho) huyTrinhLai(); }
    function openOv(id, html) { var e = $(id); e.innerHTML = html; e.classList.add('on'); }

    var view = { name: 'list', id: null, tab: 'm42' };
    var filt = { year: 'all', period: 'all', status: 'all' };
    // Phân trang MH01: mặc định 10 bản ghi/trang (10, 20, 50, 100); về Trang 1 khi Tìm kiếm, Xóa bộ lọc, chuyển tab, đổi vai trò
    var pg = { page: 1, size: 10 };
    // Thanh phân trang cùng kiểu các màn danh sách BTNN: Số dòng hiển thị, `Hiển thị [từ]-[đến] trong tổng số [n] bản ghi`, nút chuyển trang; ẩn khi không có bản ghi
    // pagerHtml(tổng, trạng thái trang {page, size}, mã khối): mặc định trạng thái pg và mã bcttPager / bcttPageSize của danh sách báo cáo
    function pagerHtml(total, st, idPg) {
        if (!total) return '';
        var ps = st || pg; idPg = idPg || 'bcttPager';
        var idSize = idPg === 'bcttPager' ? 'bcttPageSize' : idPg + 'Size';
        var pages = Math.max(1, Math.ceil(total / ps.size)), from = (ps.page - 1) * ps.size + 1, to = Math.min(total, ps.page * ps.size);
        var it = function (p, label, title, cls) { return '<span class="page-item' + (cls ? ' ' + cls : '') + '" data-pg="' + p + '"' + (title ? ' title="' + title + '"' : '') + '>' + label + '</span>'; };
        var nums = '';
        for (var i = 1; i <= pages; i++) nums += it(i, i, '', ps.page === i ? 'active' : '');
        return '<div class="pagination-bar" id="' + idPg + '"><div class="pagination-left"><span>Số dòng hiển thị:</span><select class="page-size-select" id="' + idSize + '">'
            + [10, 20, 50, 100].map(function (n) { return '<option value="' + n + '"' + (ps.size === n ? ' selected' : '') + '>' + n + '</option>'; }).join('')
            + '</select><span>Hiển thị <span style="font-weight:600;">' + from + '-' + to + '</span> trong tổng số <span style="font-weight:600;">' + total + '</span> bản ghi</span></div>'
            + '<div class="pagination-pages">' + it(1, '&verbar;&lt;&lt;', 'Đầu', ps.page === 1 ? 'disabled' : '') + it(ps.page - 1, '&lt;', 'Trước', ps.page === 1 ? 'disabled' : '')
            + nums + it(ps.page + 1, '&gt;', 'Sau', ps.page === pages ? 'disabled' : '') + it(pages, '&gt;&gt;&verbar;', 'Cuối', ps.page === pages ? 'disabled' : '') + '</div></div>';
    }

    // Người duyệt hiện hành: «<Tên> - <Chức danh>» (03/11/2026: thay cách ghi «Chờ Cấp n - <Tên>»)
    function nguoiDuyet(lv) {
        var W = wf();
        if (W && lv.leaderId && W.getUser && W.getUser(lv.leaderId)) return esc(W.userLabel(lv.leaderId));
        var u0 = ldUbnd(lv.leaderId); if (u0) return esc(u0.name + ' - ' + u0.title);   // 06/11/2026 (nhanhl2, QDDA_020)
        var ro = Object.keys(ROLES).map(function (k) { return ROLES[k]; }).find(function (x) { return x.userId === lv.leaderId || x.name === lv.leaderName; });
        return esc(lv.leaderName) + (ro ? ' - ' + esc(ro.title) : '');
    }
    // Người duyệt ghi dưới trạng thái trong danh sách báo cáo Sở (04/11/2026, nhanhl2; bỏ cột Người duyệt riêng): `Chờ duyệt` = người duyệt hiện hành; `Yêu cầu điều chỉnh` = Lãnh đạo đã từ chối;
    // `Đã gửi BTP` = Lãnh đạo ký ban hành; trạng thái khác: --
    function nguoiDuyetCot(r) {
        var s = r.submit;
        if (choKy(r)) return nguoiDuyet(s.levels[s.current]);
        if (r.status === ST.TC && r.reject) return nguoiDuyet({ leaderName: r.reject.byName });
        if (r.status === ST.BH && s) { var ok = s.levels.filter(function (l) { return l.result === 'approved'; }); if (ok.length) return nguoiDuyet(ok[ok.length - 1]); }
        return '--';
    }
    // 04/11/2026 (nhanhl2): bỏ dòng «Loại trình» dưới trạng thái. dayDu = true (danh sách báo cáo Sở): ghi Người duyệt theo nguoiDuyetCot cho mọi trạng thái;
    // không truyền (danh sách báo cáo tổng hợp của Bộ): chỉ ghi khi `Chờ duyệt`
    // Người xử lý báo cáo bị Bộ trả lại: Lãnh đạo Sở (chờ phân công), Lãnh đạo Phòng (đang phân công), Cán bộ được giao (yêu cầu điều chỉnh)
    function nguoiXuLySo(r) {
        if (!traBo(r)) return '';
        if (r.status === ST.TL) return nguoiDuyet({ leaderId: ROLES.ld_so.userId, leaderName: ROLES.ld_so.name });
        if (r.status === ST.PC) return nguoiDuyet({ leaderId: ROLES.ld_phong.userId, leaderName: ROLES.ld_phong.name });
        return r.phanCongSo && r.phanCongSo.canBo ? esc(r.phanCongSo.canBo.ten) + ' - Chuyên viên' : '';
    }
    function statusCell(r, dayDu) {
        var sub = '', nx = dayDu ? nguoiXuLySo(r) : '', nd = dayDu ? nguoiDuyetCot(r) : (choKy(r) ? nguoiDuyet(r.submit.levels[r.submit.current]) : '--');
        if (nx) sub = '<span class="bctt-sub uxu-sub">Người xử lý: ' + nx + '</span>';
        else if (nd !== '--') sub = '<span class="bctt-sub uxu-sub">Người duyệt: ' + nd + '</span>';
        // 04/11/2026 (nhanhl2): bỏ dòng phụ «Bộ Tư pháp trả lại» dưới trạng thái `Bị trả lại`
        // 03/11/2026: bỏ dòng phụ `Đã ban hành` / `Đã gửi Bộ Tư pháp` vì tên trạng thái mới đã nói rõ (stName)
        return '<span class="badge ' + ST_CLS[r.status] + '">' + stName(r) + '</span>' + sub;
    }

    // ---------------- 02 tab Chờ xử lý / Đã xử lý (theo vai trò giả lập) ----------------
    // - Phạm vi xem: báo cáo của Sở Tư pháp mình; Lãnh đạo (kể cả Lãnh đạo UBND tỉnh, 06/11/2026 (nhanhl2, QDDA_020)) không thấy báo cáo `Chờ nhập liệu`.
    // - Chờ xử lý: Cán bộ = `Chờ nhập liệu`, `Yêu cầu điều chỉnh`; Lãnh đạo = `Chờ duyệt` tại cấp phê duyệt hiện hành của mình.
    // - Đã xử lý: các báo cáo còn lại trong phạm vi xem (03/11/2026, QDDA_012: Lãnh đạo xem mọi báo cáo trừ `Chờ nhập liệu`). Badge số lượng chỉ ở tab Chờ xử lý (đồng bộ LeftMenu qua BDG).
    var listTab = 'pending';
    // 03/11/2026 (QDDA_012): Lãnh đạo xem mọi báo cáo của Sở trừ `Chờ nhập liệu`; tài khoản UBND tỉnh chỉ xem báo cáo `Đã gửi BTP`
    // 06/11/2026 (nhanhl2, QDDA_020): bỏ vai trò UBND tỉnh chỉ xem; Lãnh đạo UBND tỉnh (người ký Cấp 3) có phạm vi xem như Lãnh đạo Sở
    function inScope(r) { if (r.unitId !== DEMO_UNIT) return false; return role === 'cb_stp' || r.status !== ST.DANG; }
    // 04/11/2026 (nhanhl2): báo cáo «Bị trả lại» (Bộ Tư pháp trả lại) nằm ở Chờ xử lý của cả Lãnh đạo Phòng và Lãnh đạo Sở (chỉ xem, không sửa)
    function isPending(r) { if (role === 'cb_stp') return canEdit(r); return canApprove(r) || coPhanCongSo(r); }   // 06/11/2026 (nhanhl2, QDDA_020): Lãnh đạo UBND tỉnh có việc chờ ký
    function leaderActed(r) { var nm = me().name; return (r.history || []).some(function (h) { return h.actor === nm && /^(Ký duyệt|Từ chối)/.test(h.action || ''); }); }
    function inTab(tab, r) {
        if (!inScope(r)) return false;
        if (tab === 'pending') return isPending(r);
        return !isPending(r);
    }
    function tabStatuses(tab) {
        if (role === 'cb_stp') return tab === 'pending' ? [ST.DANG, ST.TC] : [ST.CHO, ST.TC, ST.BH];
        return [ST.CHO, ST.TC, ST.BH].filter(function (s) { return DB.reports.some(function (r) { return r.status === s && inTab(tab, r); }); });
    }
    function pendingCount() { return isStpRole() ? DB.reports.filter(function (r) { return inTab('pending', r); }).length : 0; }
    function reportBadge() {
        if (MODE === 'bo') return; // trang Bộ: badge do bctt_bo_xu_ly.js báo (khóa bctt_bo), không ghi đè badge của Sở
        var n = pendingCount(), el = $('bcttCntPending');
        if (window.BDG) window.BDG.report('bctt', n, el);
        else if (el) { el.textContent = n; el.style.display = n > 0 ? '' : 'none'; }
    }

    // ---------------- Thông báo hạn gửi (quy tắc 2, QDDA_012): Cán bộ Sở, Lãnh đạo Phòng, Lãnh đạo Sở; quá hạn không phải trạng thái ----------------
    // 06/11/2026 (phiếu rà soát lỗi 12, nhanhl2 chọn sửa UI theo SRS): xét kỳ của năm hiện tại và năm trước, kể cả kỳ Sở Tư pháp chưa tạo báo cáo
    // 04/11/2026 (nhanhl2): hạn gửi trùng ngày nghỉ hằng tuần hoặc ngày nghỉ lễ thì tính vào ngày làm việc tiếp theo (khoản 3 Điều 25 TT 08/2019).
    // Ngày nghỉ lễ giả lập: các ngày lễ dương lịch cố định và kỳ nghỉ Tết Nguyên đán trong NGHI_TET; hệ thống thật lấy theo cấu hình ngày nghỉ
    var NGAY_LE = ['01/01', '30/04', '01/05', '02/09'];
    var NGHI_TET = [['2025-01-25', '2025-02-02']];
    function ngayNghi(d) {
        if (d.getDay() === 0 || d.getDay() === 6) return true;
        if (NGAY_LE.indexOf(pad(d.getDate()) + '/' + pad(d.getMonth() + 1)) >= 0) return true;
        var iso = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
        return NGHI_TET.some(function (k) { return iso >= k[0] && iso <= k[1]; });
    }
    function hanGui(y, p) {
        var han = p === 'thuc_te' ? new Date(y, 11, 8) : new Date(y + 1, 0, 31), goc = new Date(han);
        while (ngayNghi(han)) han.setDate(han.getDate() + 1);
        var txt = pad(han.getDate()) + '/' + pad(han.getMonth() + 1) + '/' + han.getFullYear();
        return { han: han, tu: p === 'thuc_te' ? new Date(y, 9, 31) : new Date(y + 1, 0, 15), txt: txt, lui: han.getTime() !== goc.getTime() };
    }
    // Khối thông báo trên trang có nút Thu gọn / Mở rộng (06/11/2026, nhanhl2): mặc định mở; trạng thái thu gọn nhớ theo từng khối
    // (localStorage bctt-tg, khóa gồm loại khối và nội dung chính nên thông báo mới luôn mở). Hộp cảnh báo trong popup không thu gọn
    function tgMo(k) { try { return (JSON.parse(localStorage.getItem('bctt-tg') || '{}') || {})[k] !== 0; } catch (e) { return true; } }
    function tgLop(k) { return tgMo(k) ? '' : ' tg-dong'; }
    function tgNut(k) {
        var mo = tgMo(k);
        return '<button type="button" class="bctt-tg-nut" data-tg-nut="' + esc(k) + '" aria-expanded="' + mo + '" title="' + (mo ? 'Thu gọn thông báo' : 'Mở rộng thông báo') + '" aria-label="' + (mo ? 'Thu gọn thông báo' : 'Mở rộng thông báo') + '"><i class="fa-solid fa-chevron-' + (mo ? 'up' : 'down') + '"></i></button>';
    }
    document.addEventListener('click', function (e) {
        var b = e.target && e.target.closest ? e.target.closest('[data-tg-nut]') : null; if (!b) return;
        var hop = b.closest('[data-tg]'); if (!hop) return;
        var mo = hop.classList.toggle('tg-dong') ? false : true, k = b.getAttribute('data-tg-nut');
        try { var m = JSON.parse(localStorage.getItem('bctt-tg') || '{}') || {}; if (mo) delete m[k]; else m[k] = 0; localStorage.setItem('bctt-tg', JSON.stringify(m)); } catch (x) { /* bỏ qua */ }
        b.setAttribute('aria-expanded', String(mo)); b.title = mo ? 'Thu gọn thông báo' : 'Mở rộng thông báo';
        b.setAttribute('aria-label', b.title); b.innerHTML = '<i class="fa-solid fa-chevron-' + (mo ? 'up' : 'down') + '"></i>';
    });
    function hanGuiHtml(only) {
        if (['cb_stp', 'ld_phong', 'ld_so'].indexOf(role) < 0) return '';
        var t = new Date(); t.setHours(0, 0, 0, 0); var y0 = t.getFullYear(), out = [];
        [y0, y0 - 1].forEach(function (y) { ['thuc_te', 'chinh_thuc'].forEach(function (p) {
            if (only && (only.year !== y || only.period !== p)) return;
            var r = DB.reports.find(function (x) { return x.unitId === DEMO_UNIT && x.year === y && x.period === p; });
            if (r && r.status === ST.BH) return;
            var h = hanGui(y, p); if (t < h.tu) return;
            if (t < h.han) out.push({ loi: false, id: r && inScope(r) ? r.id : '', txt: p === 'thuc_te' ? 'Còn ' + Math.round((h.han - t) / 86400000) + ' ngày đến hạn gửi Báo cáo năm số liệu thực tế năm ' + y + ' (hạn gửi trước ngày ' + h.txt + ').' : 'Sắp đến hạn gửi Số liệu thống kê năm chính thức năm ' + y + '. Hạn gửi: trước ngày ' + h.txt + '.' });
            else out.push({ loi: true, id: r && inScope(r) ? r.id : '', txt: 'Đã quá hạn gửi ' + PERIODS[p].label.replace(/\s*\(.*\)$/, '') + ' năm ' + y + ' (hạn gửi trước ngày ' + h.txt + ').' });
        }); });
        // 03/11/2026: cùng kiểu khối «Cảnh báo khoản chi đã quá hạn 3 năm» của trang Chi trả tiền bồi thường (kg/ui-mau mẫu 20)
        // 06/11/2026 (nhanhl2): thông báo cùng loại gộp chung một khối - một khối «Đã quá hạn gửi báo cáo», một khối «Sắp đến hạn gửi báo cáo».
        // Khối có 01 kỳ: nội dung một dòng, nút «Xem báo cáo» bên phải như cũ. Khối có từ 02 kỳ: mỗi kỳ một dòng, nút «Xem báo cáo» ở cuối dòng của kỳ đó
        var nut = function (a) { return !only && a.id ? '<button type="button" class="btn btn-outline-primary bctt-han-nut" data-han-xem="' + a.id + '"><i class="fa-solid fa-filter"></i> Xem báo cáo</button>' : ''; };
        return [true, false].map(function (loi) {
            var ds = out.filter(function (a) { return a.loi === loi; }); if (!ds.length) return '';
            var k = 'han|' + ds.map(function (a) { return a.txt; }).join('|'), mot = ds.length === 1;
            return '<div class="bctt-han ' + (loi ? 'loi' : 'canh-bao') + tgLop(k) + '" role="alert" data-tg="' + esc(k) + '"><div class="bctt-han-noi">'
                + '<i class="fa-solid fa-triangle-exclamation"></i><div style="flex:1;min-width:0;"><div class="bctt-han-tt">' + (loi ? 'Đã quá hạn gửi báo cáo' : 'Sắp đến hạn gửi báo cáo') + '</div>'
                + (mot ? '<div class="bctt-han-nd tg-than">' + esc(ds[0].txt) + '</div>'
                    : '<ul class="bctt-han-ds tg-than">' + ds.map(function (a) { return '<li><span>' + esc(a.txt) + '</span>' + nut(a) + '</li>'; }).join('') + '</ul>')
                + '</div></div>'
                + '<div class="bctt-han-nhom-nut">' + (mot ? nut(ds[0]) : '') + tgNut(k) + '</div>'
                + '</div>';
        }).join('');
    }

    // ---------------- MH01: Danh sách ----------------
    function showList() {
        view = { name: 'list', id: null, tab: 'm42' };
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
            .sort(function (a, b) { return b.year - a.year || (a.period === 'thuc_te' ? 0 : 1) - (b.period === 'thuc_te' ? 0 : 1); }); // cùng năm: kỳ số liệu thực tế trước (lỗi 5)
        var total = rows.length, pages = Math.max(1, Math.ceil(total / pg.size));
        if (pg.page > pages) pg.page = pages;
        var off = (pg.page - 1) * pg.size;
        rows = rows.slice(off, off + pg.size);
        // Thanh thông báo hạn gửi đặt giữa Bộ lọc tìm kiếm và Danh sách báo cáo (như trang Chi trả tiền bồi thường)
        html += hanGuiHtml();
        // Không hiển thị tiêu đề lưới; nút Tạo báo cáo trên thanh công cụ phía trên lưới, căn phải
        html += '<div class="card-section">'
            + (role === 'cb_stp' && listTab === 'pending' ? '<div style="display:flex; justify-content:flex-end; margin-bottom:12px;"><button class="btn btn-success btn-sm uxu-btn-tb" id="bcttCreate"><i class="fa-solid fa-plus"></i> Tạo báo cáo</button></div>' : '')
            + '<div class="table-container"><table class="custom-table" id="bcttListTable"><thead><tr><th>STT</th><th>Năm báo cáo</th><th>Loại kỳ báo cáo</th><th>Đơn vị báo cáo</th><th>Người lập</th><th>Trạng thái</th><th>Ngày gửi gần nhất</th><th>Thao tác</th></tr></thead><tbody>'
            + (rows.length ? rows.map(function (r, i) {
                var acts = '<button class="icon-btn" title="Xem chi tiết" data-act="view" data-id="' + r.id + '"><i class="fa-solid fa-eye"></i></button>' + listActs(r);
                return '<tr class="list-row" data-id="' + r.id + '"><td>' + (off + i + 1) + '</td><td>' + r.year + '</td><td class="text-left">' + PERIODS[r.period].label + '</td><td class="text-left">' + esc(r.unitName) + '</td><td class="text-left">' + esc(r.preparer.name) + '</td><td>' + statusCell(r, true) + '</td><td>' + (r.sentAt || '--') + '</td><td>' + acts + '</td></tr>';
            }).join('') : '<tr><td colspan="8">Không có dữ liệu</td></tr>')
            + '</tbody></table></div>' + pagerHtml(total) + '</div>';
        $('bcttApp').innerHTML = html;
        $('bcttFGo').onclick = function () { filt.year = $('bcttFYear').value; filt.period = $('bcttFPeriod').value; filt.status = $('bcttFStatus').value; pg.page = 1; showList(); };
        $('bcttFReset').onclick = function () { filt = { year: 'all', period: 'all', status: 'all' }; pg.page = 1; showList(); };
        if ($('bcttCreate')) $('bcttCreate').onclick = openCreate;
        // Xem báo cáo (thanh thông báo hạn gửi): lọc danh sách về báo cáo của kỳ, chuyển sang tab chứa báo cáo, đặt Trạng thái về Tất cả, về Trang 1
        // (như nút «Xem khoản cần xử lý» của trang Chi trả tiền bồi thường; không mở thẳng báo cáo nằm ngoài danh sách đang xem)
        [].forEach.call(document.querySelectorAll('[data-han-xem]'), function (b) { b.onclick = function () {
            var r = getR(b.getAttribute('data-han-xem')); if (!r) return;
            listTab = inTab('pending', r) ? 'pending' : 'done';
            filt = { year: String(r.year), period: r.period, status: 'all' }; pg.page = 1; showList();
        }; });
        $('bcttLTabs').onclick = function (e) { var t = e.target.closest('[data-ltab]'); if (t && t.getAttribute('data-ltab') !== listTab) { listTab = t.getAttribute('data-ltab'); pg.page = 1; showList(); } };
        if ($('bcttPager')) {
            $('bcttPageSize').onchange = function () { pg.size = +this.value || 10; pg.page = 1; showList(); };
            $('bcttPager').querySelector('.pagination-pages').onclick = function (e) { var t = e.target.closest('[data-pg]'); if (!t || t.classList.contains('disabled') || t.classList.contains('active')) return; pg.page = +t.getAttribute('data-pg'); showList(); };
        }
        onClk($('bcttListTable'), function (e) {
            var b = e.target.closest('[data-act]');
            var tr = e.target.closest('tr[data-id]');
            if (b && b.disabled) return;
            if (b) { e.stopPropagation(); var id = b.getAttribute('data-id'), a = b.getAttribute('data-act');
                if (a === 'view' || a === 'edit') showDetail(id); else if (a === 'submit') openSubmit(id); else if (a === 'approve') openSign(id, 'approve'); else if (a === 'reject') openSign(id, 'reject'); else if (a === 'assign') openPhanCongSo(id); return; }
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
            var ed = canEdit(r), sg = suaSauGui(r), xxl = traVe(r), why = 'Chỉ thực hiện khi báo cáo ở trạng thái Chờ nhập liệu hoặc Bị trả lại';
            // 06/11/2026: báo cáo Đã gửi BTP vẫn Cập nhật được; trình lại bằng nút «Lưu và Trình phê duyệt lại» trong màn cập nhật
            // 06/11/2026 (phiếu rà soát lỗi 8): báo cáo đang được Lãnh đạo xem xét lại (Lãnh đạo cấp 2 trở lên từ chối, tới khi ký cuối hoặc cấp 1 từ chối) có Tooltip riêng
            var lyDoXxl = 'Báo cáo đang chờ Lãnh đạo xem xét lại';
            return btn('edit', 'edit', 'fa-solid fa-pen-to-square', 'Cập nhật', ed || sg, xxl ? lyDoXxl : 'Chỉ thực hiện khi báo cáo ở trạng thái Chờ nhập liệu, Bị trả lại hoặc Đã gửi BTP')
                + btn('submit', 'submit', 'fa-solid fa-paper-plane', 'Gửi phê duyệt', ed, sg ? 'Báo cáo đã gửi Bộ Tư pháp; mở Cập nhật để Lưu và Trình phê duyệt lại' : (xxl ? lyDoXxl : why));
        }
        // 06/11/2026 (nhanhl2, QDDA_020): Lãnh đạo UBND tỉnh có Ký duyệt, Từ chối như Lãnh đạo Phòng, Lãnh đạo Sở (trước chỉ xem)
        if (coPhanCongSo(r)) return btn('assign', 'assign', 'fa-solid fa-diagram-project', 'Phân công', true, '');
        var ok = canApprove(r), lv = choKy(r) ? r.submit.levels[r.submit.current] : null;
        var why2 = lv ? 'Báo cáo đang chờ Cấp ' + lv.level + ' - ' + lv.leaderName + ' ký duyệt' : 'Chỉ thực hiện khi báo cáo ở trạng thái Chờ duyệt';
        return btn('approve', 'accept sign', 'fa-solid fa-file-signature', 'Ký duyệt', ok, why2) + btn('reject', 'reject', 'fa-solid fa-ban', 'Từ chối', ok, why2);
    }

    // Popup phân công xử lý báo cáo bị Bộ trả lại (04/11/2026, nhanhl2): Lãnh đạo Sở chọn Phòng; Lãnh đạo Phòng chọn Cán bộ
    function openPhanCongSo(id) {
        var r = getR(id); if (!coPhanCongSo(r)) { toast('Báo cáo không còn ở bước phân công.', 'error'); showList(); return; }
        var laSo = role === 'ld_so', W = wf();
        var ds = laSo ? [{ id: DEMO_SUB, ten: 'Phòng Hành chính tư pháp' }]
            : ((W && W.USERS ? W.USERS.filter(function (u) { return u.unitId === DEMO_SUB && u.title === 'Chuyên viên'; }) : []).map(function (u) { return { id: u.id, ten: u.name }; }));
        if (!ds.length) ds = [{ id: ROLES.cb_stp.userId, ten: ROLES.cb_stp.name }];
        var html = '<div class="bctt-modal" style="width:620px;"><div class="bctt-mh"><div><div class="tt">' + (laSo ? 'Phân công Phòng xử lý' : 'Phân công Cán bộ điều chỉnh') + '</div><div class="st">Báo cáo công tác bồi thường nhà nước năm ' + r.year + ' - ' + esc(PERIODS[r.period].label) + ' (Bộ Tư pháp trả lại)</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="form-group" style="margin-bottom:12px;"><span class="form-label">' + (laSo ? 'Phòng xử lý' : 'Cán bộ điều chỉnh') + '<span style="color:red;">*</span></span><select class="form-control" id="bcttPCChon">'
            + ds.map(function (x) { return '<option value="' + esc(x.id) + '">' + esc(x.ten) + '</option>'; }).join('') + '</select></div>'
            + '<div class="form-group"><span class="form-label">Ghi chú</span><textarea class="bctt-ta" id="bcttPCGhiChu" maxlength="2000" placeholder="Nhập ghi chú phân công (không bắt buộc)..."></textarea></div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-primary" id="bcttPCOk"><i class="fa-solid fa-diagram-project"></i> Phân công</button></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        $('bcttPCOk').onclick = function () {
            var sel = $('bcttPCChon'), x = ds[sel.selectedIndex], note = $('bcttPCGhiChu').value.trim(), at = nowText();
            r.phanCongSo = r.phanCongSo || {};
            if (laSo) {
                r.phanCongSo.phong = { id: x.id, ten: x.ten, by: me().name, at: at, note: note }; r.status = ST.PC;
                hist(r, me().name, 'Phân công xử lý: chuyển ' + x.ten, note);
                toast('Đã phân công ' + x.ten + ' xử lý báo cáo.');
            } else {
                r.phanCongSo.canBo = { id: x.id, ten: x.ten, by: me().name, at: at, note: note }; r.status = ST.TC;
                hist(r, me().name, 'Phân công Cán bộ điều chỉnh: ' + x.ten, note);
                toast('Đã giao ' + x.ten + ' điều chỉnh báo cáo.');
            }
            save(); closeOv('bcttOv1'); showDetail(r.id);
        };
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
        // 04/11/2026 (nhanhl2): báo cáo tổng hợp của Bộ không trình ký - kết xuất Mẫu 42/BTNN ra PDF và Word, các mẫu khác ra PDF
        if (isBtpReport(r)) return FORMS.map(function (f, i) {
            var ten = f.file + '_' + r.year + '_' + r.unitId, w = f.id === 'm42';
            return '<tr><td>' + (i + 1) + '</td><td class="text-left">' + f.code + ' - ' + f.title + '</td><td class="text-left"><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> ' + ten + '.pdf' + (w ? '<br><i class="fa-solid fa-file-word" style="color:#2563eb;"></i> ' + ten + '.docx' : '') + '</td><td>' + (w ? 'PDF, Word' : 'PDF') + '</td>'
                + '<td><button class="bctt-link" data-fview="' + f.id + '">Xem file</button>|<button class="bctt-link" data-fdl="' + esc(ten) + '.pdf">Tải PDF</button>' + (w ? '|<button class="bctt-link" data-fdl="' + esc(ten) + '.docx">Tải Word</button>' : '') + '</td></tr>';
        }).join('');
        var issued = r.status === ST.BH;
        return FORMS.map(function (f, i) {
            var name = f.file + '_' + r.year + '_' + maTep(r) + (issued ? '_signed' : '_du_thao') + '.pdf';
            return '<tr><td>' + (i + 1) + '</td><td class="text-left">' + f.code + ' - ' + f.title + '</td><td class="text-left"><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> ' + name + '</td><td>' + (issued ? 'Đã ban hành' : 'Dự thảo') + '</td>'
                + '<td><button class="bctt-link" data-fview="' + f.id + '">Xem file</button>|<button class="bctt-link" data-fdl="' + esc(name) + '">Tải file</button></td></tr>';
        }).join('');
    }
    // Khối «Tệp báo cáo» (04 biểu mẫu, Xem file / Tải file) - dùng chung trang chi tiết của Sở và màn rà soát của Bộ (04/11/2026)
    function tepBaoCaoHtml(r) {
        // 06/11/2026 (nhanhl2): trang chi tiết báo cáo tổng hợp của Bộ bỏ khối «Tệp báo cáo»; xem và tải tệp qua nút «Xem trước PDF»
        if (isBtpReport(r)) return '';
        return '<div class="bctt-files"><div class="section-title" style="margin-bottom:10px;"><span>Tệp báo cáo</span></div><div class="table-container"><table class="custom-table" id="bcttFileTable"><thead><tr><th>STT</th><th>Biểu mẫu</th><th>Tên tệp</th><th>Loại tệp</th><th>Thao tác</th></tr></thead><tbody>' + fileRows(r) + '</tbody></table></div></div>';
    }
    // Khối «Người duyệt» của trang chi tiết (04/11/2026, nhanhl2): tách khỏi ô Trạng thái, mỗi cấp một ô «Cấp n - Đơn vị», người duyệt, tình trạng
    // (Đang chờ duyệt, Đã duyệt, Từ chối; cấp chưa tới lượt để trống) - cùng cách hiển thị luồng duyệt ở màn rà soát của Bộ Tư pháp. Chỉ hiện khi báo cáo đã trình
    function khoiNguoiDuyetHtml(r) {
        var s = r.submit; if (!s || !s.levels || r.status === ST.DANG || isBtpReport(r)) return '';
        return '<div class="section-title" style="margin:18px 0 12px;"><span>Người duyệt</span></div><div class="bctt-meta">'
            + s.levels.map(function (l, i) {
                var tt = l.result === 'approved' ? 'Đã duyệt ' + esc(l.at) : l.result === 'rejected' ? 'Từ chối ' + esc(l.at) : (choKy(r) && s.current === i ? 'Đang chờ duyệt' : '');
                return '<div><label>Cấp ' + l.level + (l.unitName ? ' - ' + esc(l.unitName) : '') + '</label><strong>' + nguoiDuyet(l) + '</strong>' + (tt ? '<span class="bctt-sub">' + tt + '</span>' : '') + '</div>';
            }).join('') + '</div>';
    }
    // Khối Lịch sử xử lý có nút Mở rộng / Thu gọn (04/11/2026, nhanhl2; dùng chung trang Sở và trang Bộ): mặc định thu gọn, tiêu đề ghi số sự kiện;
    // bấm tiêu đề hoặc nút để mở; lựa chọn nhớ trong localStorage bctt-ls-mo (mỗi trình duyệt)
    function lichSuKhung(soMuc, than, kieu) {
        var mo = '0'; try { mo = localStorage.getItem('bctt-ls-mo') === '1' ? '1' : '0'; } catch (e) { /* bỏ qua */ }
        return '<div class="bctt-ls" data-mo="' + mo + '"' + (kieu ? ' style="' + kieu + '"' : '') + '><div class="section-title bctt-ls-dau" role="button" tabindex="0" aria-expanded="' + (mo === '1') + '" style="margin-bottom:12px;">'
            + '<span>Lịch sử xử lý<span class="bctt-ls-dem">(' + soMuc + ' sự kiện)</span></span>'
            + '<button type="button" class="btn btn-secondary btn-sm bctt-ls-nut"><i class="fa-solid fa-chevron-down"></i> <span>' + (mo === '1' ? 'Thu gọn' : 'Mở rộng') + '</span></button></div>'
            + '<div class="bctt-ls-than">' + than + '</div></div>';
    }
    function ganGapLichSu(goc) {
        (goc || document).querySelectorAll('.bctt-ls').forEach(function (k) {
            var dau = k.querySelector('.bctt-ls-dau');
            var dat = function (mo) {
                k.setAttribute('data-mo', mo ? '1' : '0'); dau.setAttribute('aria-expanded', String(mo));
                k.querySelector('.bctt-ls-nut span').textContent = mo ? 'Thu gọn' : 'Mở rộng';
                try { localStorage.setItem('bctt-ls-mo', mo ? '1' : '0'); } catch (e) { /* bỏ qua */ }
            };
            dau.onclick = function () { dat(k.getAttribute('data-mo') !== '1'); };
            dau.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dau.onclick(); } };
        });
    }
    // ---------------- Sửa báo cáo đã gửi Bộ Tư pháp (06/11/2026, yêu cầu khách hàng) ----------------
    // Dòng ghi chú khi Cán bộ Sở đã lưu số liệu mới sau khi gửi: tệp báo cáo vẫn là bản đã ký
    function ghiSauGuiHtml(r) {
        if (isBtpReport(r) || r.status !== ST.BH || !r.capNhatSauGui) return '';
        var k = 'sau-gui|' + r.id + '|' + r.capNhatSauGui.at;
        return '<div class="bctt-sau-gui' + tgLop(k) + '" data-tg="' + esc(k) + '"><i class="fa-solid fa-circle-info"></i><div style="flex:1;min-width:0;"><div class="tg-dau"><b>Số liệu đã được cập nhật sau khi gửi Bộ Tư pháp</b>' + tgNut(k) + '</div>'
            + '<div class="tg-than">Lần cập nhật gần nhất: ' + esc(r.capNhatSauGui.at) + ' - ' + esc(r.capNhatSauGui.by)
            + '. Tệp báo cáo vẫn là bản Lãnh đạo UBND tỉnh ký ngày ' + esc((r.kySo && r.kySo.at) || '--') + '. Bộ Tư pháp lấy số liệu đang lưu khi đồng bộ số liệu báo cáo tổng hợp.</div></div></div>';
    }
    // Khối «Các bản đã ký trước»: bản đã ký được lưu lại khi Cán bộ Sở trình phê duyệt lại báo cáo đã gửi
    function banKyTruocHtml(r) {
        var ds = r.bkKy || []; if (isBtpReport(r) || !ds.length) return '';
        return '<div class="bctt-files"><div class="section-title" style="margin-bottom:10px;"><span>Các bản đã ký trước</span></div><div class="table-container"><table class="custom-table" id="bcttBkTable"><thead><tr><th>STT</th><th>Ngày ký</th><th>Người ký</th><th>Ngày trình phê duyệt lại</th><th>Người trình phê duyệt lại</th><th>Thao tác</th></tr></thead><tbody>'
            + ds.slice().reverse().map(function (k, i) {
                return '<tr><td>' + (i + 1) + '</td><td>' + esc(k.at || '--') + '</td><td class="text-left">' + esc(k.signer || '--') + '</td><td>' + esc(k.thayLuc || '--') + '</td><td class="text-left">' + esc(k.thayBoi || '--') + '</td>'
                    + '<td><button class="bctt-link" data-bkv="' + (ds.length - 1 - i) + '">Xem file</button></td></tr>';
            }).join('') + '</tbody></table></div></div>';
    }
    function ganBanKyTruoc(r) {
        var t = $('bcttBkTable'); if (!t) return;
        onClk(t, function (e) { var b = e.target.closest('[data-bkv]'); if (!b) return; var k = (r.bkKy || [])[+b.getAttribute('data-bkv')]; if (k) openViewer(r, 'm42', 'Bản đã ký trước', kySoData(r, k)); });
    }
    // «Lưu và Trình phê duyệt lại»: cảnh báo, đồng ý thì mở Gửi phê duyệt. Bấm Hủy bỏ ở cửa sổ Gửi phê duyệt: khôi phục số liệu và trạng thái như trước khi bấm
    // (nhanhl2 chọn 06/11/2026). Trình xong: bản đã ký chuyển vào «Các bản đã ký trước», báo cáo `Chờ duyệt` (chưa gửi Bộ Tư pháp)
    var trinhLaiCho = null;
    function trinhLai(r) {
        var k = r.kySo || {};
        var html = '<div class="bctt-modal" style="width:660px;"><div class="bctt-mh"><div><div class="tt">Lưu và Trình phê duyệt lại</div><div class="st">Báo cáo công tác bồi thường nhà nước năm ' + r.year + ' - ' + esc(PERIODS[r.period].label) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="bctt-alert" style="margin:0;"><b class="t"><i class="fa-solid fa-triangle-exclamation"></i> Báo cáo sẽ phải ký duyệt lại</b>Báo cáo đã gửi Bộ Tư pháp. Khi trình phê duyệt lại:</div>'
            + '<ul style="margin:10px 0 0;padding-left:20px;line-height:1.7;"><li>Tệp báo cáo được lập lại theo số liệu mới và chưa có chữ ký.</li>'
            + '<li>Bản Lãnh đạo UBND tỉnh ký ngày ' + esc(k.at || '--') + (k.signer ? ' (' + esc(k.signer) + ')' : '') + ' được lưu vào khối «Các bản đã ký trước» để xem lại.</li>'
            + '<li>Báo cáo trở về trạng thái chưa gửi Bộ Tư pháp cho tới khi báo cáo được ký duyệt lại đủ 03 cấp (Lãnh đạo Phòng, Lãnh đạo Sở và Lãnh đạo UBND tỉnh). Trong thời gian này, Bộ Tư pháp không lấy số liệu của báo cáo khi đồng bộ số liệu báo cáo tổng hợp.</li></ul>'
            + '<p style="margin-top:8px;">Nếu bấm «Hủy bỏ» ở cửa sổ Gửi phê duyệt, số liệu và trạng thái báo cáo giữ nguyên như trước. Bạn có muốn tiếp tục?</p></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-success" id="bcttTrinhLaiOk"><i class="fa-solid fa-paper-plane"></i> Đồng ý</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        $('bcttTrinhLaiOk').onclick = function () {
            closeOv('bcttOv2');
            if (!validate(r)) { toast('Vui lòng nhập đầy đủ thông tin bắt buộc trước khi gửi phê duyệt.', 'error'); return; }
            trinhLaiCho = { id: r.id, goc: banDaLuu(r) };
            openSubmit(r.id);
        };
    }
    // Bản báo cáo đã lưu gần nhất (ô số liệu ghi thẳng vào bản ghi trong bộ nhớ khi gõ, nên không chụp từ bộ nhớ)
    function banDaLuu(r) {
        try { var d = JSON.parse(localStorage.getItem(KEY) || 'null'), x = d && d.reports ? d.reports.find(function (y) { return y.id === r.id; }) : null; if (x) return x; } catch (e) { /* bỏ qua */ }
        return clone(r);
    }
    // Nút «Lưu» của báo cáo Đã gửi BTP: cảnh báo trước (06/11/2026, nhanhl2); đồng ý thì lưu số liệu, tệp đã ký giữ nguyên, trạng thái giữ Đã gửi BTP
    function canhBaoLuuSauGui(r) {
        var k = r.kySo || {};
        var html = '<div class="bctt-modal" style="width:620px;"><div class="bctt-mh"><div><div class="tt">Lưu báo cáo đã gửi Bộ Tư pháp</div><div class="st">Báo cáo công tác bồi thường nhà nước năm ' + r.year + ' - ' + esc(PERIODS[r.period].label) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="bctt-alert" style="margin:0;"><b class="t"><i class="fa-solid fa-triangle-exclamation"></i> Báo cáo đã gửi Bộ Tư pháp</b>Khi lưu:</div>'
            + '<ul style="margin:10px 0 0;padding-left:20px;line-height:1.7;"><li>Số liệu mới được lưu, báo cáo vẫn ở trạng thái Đã gửi BTP.</li>'
            + '<li>Tệp báo cáo và tài liệu kèm theo giữ nguyên bản Lãnh đạo UBND tỉnh ký ngày ' + esc(k.at || '--') + ', không thể hiện số liệu mới.</li>'
            + '<li>Bộ Tư pháp lấy số liệu mới khi đồng bộ số liệu báo cáo tổng hợp.</li></ul>'
            + '<p style="margin-top:8px;">Muốn tệp báo cáo thể hiện số liệu mới, dùng nút «Lưu và Trình phê duyệt lại». Bạn có muốn lưu?</p></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-primary" id="bcttLuuSauGuiOk"><i class="fa-solid fa-floppy-disk"></i> Lưu</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        $('bcttLuuSauGuiOk').onclick = function () {
            closeOv('bcttOv2');
            r.capNhatSauGui = { at: nowText(), by: me().name };
            hist(r, me().name, 'Cập nhật số liệu sau khi gửi Bộ Tư pháp', 'Tệp báo cáo đã ký giữ nguyên.');
            save(); toast('Đã lưu số liệu. Tệp báo cáo đã ký giữ nguyên.'); showDetail(r.id);
        };
    }
    function huyTrinhLai() {
        var c = trinhLaiCho; trinhLaiCho = null; if (!c) return;
        var r = getR(c.id); if (!r) return;
        Object.keys(r).forEach(function (x) { delete r[x]; }); Object.assign(r, c.goc);
        save(); toast('Đã hủy trình phê duyệt lại. Số liệu và trạng thái báo cáo giữ nguyên như trước.'); showDetail(r.id);
    }
    function luuBanKyCu(r) {
        var at = r.kySo ? r.kySo.at : '';
        if (r.kySo) { r.bkKy = r.bkKy || []; r.bkKy.push(Object.assign({}, r.kySo, { thayLuc: nowText(), thayBoi: me().name })); }
        r.kySo = null; r.issued = null; r.capNhatSauGui = null;
        hist(r, me().name, 'Lưu và trình phê duyệt lại báo cáo đã gửi Bộ Tư pháp', 'Bản đã ký' + (at ? ' ngày ' + at : '') + ' được lưu vào Các bản đã ký trước.');
    }
    var detailBack = null; // màn quay về khi mở chi tiết từ màn khác (VD Bộ Tư pháp xem báo cáo của Sở)
    // Tùy chọn trang chi tiết (06/11/2026): anLichSu - không hiện khối Lịch sử xử lý; ghi - dòng ghi chú dưới tiêu đề khi Bộ Tư pháp xem báo cáo của Sở
    var detailOpt = {};
    function showDetail(id, back, opt) {
        if (typeof back === 'function') detailBack = back; else if (view.name !== 'detail' || view.id !== id) detailBack = null;
        if (opt) detailOpt = opt; else if (view.name !== 'detail' || view.id !== id) detailOpt = {};
        var r = getR(id); if (!r) return;
        view = { name: 'detail', id: id, tab: view.name === 'detail' && view.id === id ? view.tab : 'm42' };
        var sau = suaSauGui(r), ed = canEdit(r) || sau;
        var lv = choKy(r) ? r.submit.levels[r.submit.current] : null;
        var html = '<div class="card-section"><div class="detail-header" style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px;"><div><button class="btn btn-secondary btn-sm" id="bcttBack"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
            + '<h2 style="margin-top:10px;font-size:16px;color:#1e3a8a;">' + (isBtpReport(r) ? 'Báo cáo tổng hợp công tác bồi thường nhà nước năm ' : 'Báo cáo công tác bồi thường nhà nước năm ') + r.year + ' - ' + esc(r.unitName) + '</h2>' + (!isStpRole() && !isBtpReport(r) ? '<div class="formula-hint">' + esc(detailOpt.ghi || 'Bộ Tư pháp xem nhập liệu báo cáo của đơn vị (chỉ đọc).') + '</div>' : '') + '</div><div>' + (isBtpReport(r) ? '' : '<span class="badge ' + ST_CLS[r.status] + '">' + stName(r) + '</span>') + '</div></div>'
            + (isBtpReport(r) ? '' : hanGuiHtml({ year: r.year, period: r.period }))
            + '<div class="section-title" style="margin-bottom:12px;"><span>Thông tin báo cáo</span></div>'
            + '<div class="bctt-meta">'
            + '<div><label>Năm báo cáo</label><strong>' + r.year + '</strong></div>'
            + '<div><label>Loại kỳ báo cáo</label><strong>' + PERIODS[r.period].label + '</strong></div>'
            + '<div><label>Thời gian số liệu</label><strong>' + r.fromDate + ' - ' + r.toDate + '</strong></div>'
            + '<div><label>Đơn vị báo cáo</label><strong>' + esc(r.unitName) + '</strong></div>'
            + (isBtpReport(r) ? '' : '<div><label>Trạng thái</label><strong id="bcttDStatus">' + stName(r) + '</strong></div>')
            + '<div><label>Người lập</label><strong><img class="bctt-sig" alt="Chữ ký" src="' + sigImg(r.preparer.name) + '">' + esc(r.preparer.name) + '</strong></div>'
            // 04/11/2026: báo cáo tổng hợp của Bộ không trình ký - không có Trạng thái, Ngày gửi, Ngày ban hành
            + (isBtpReport(r) ? '<div><label>Ngày cập nhật gần nhất</label><strong>' + (r.history.length ? esc(r.history[r.history.length - 1].at) : '--') + '</strong></div>'
                : '<div><label>Ngày gửi gần nhất</label><strong>' + (r.sentAt || '--') + '</strong></div>'
                + '<div><label>Ngày ban hành</label><strong>' + (r.issued ? r.issued.at + ' - ' + esc(r.issued.signer) : '--') + '</strong></div>')
            + '</div>'
            + khoiNguoiDuyetHtml(r)
            // 04/11/2026 (nhanhl2): báo cáo tổng hợp của Bộ không hiển thị thanh Nguồn số liệu và thông báo Sở bị trả lại / gửi lại;
            // nút Cập nhật số liệu từ các đơn vị (trước là «từ các Sở») chuyển xuống chân trang
            // Báo cáo Sở Tư pháp bị Bộ Tư pháp trả lại
            + (traBo(r) ? '<div class="bctt-alert" id="bcttReturnBox"><b class="t">BÁO CÁO BỊ BỘ TƯ PHÁP TRẢ LẠI</b>Lý do trả lại: <strong>' + esc(r.returned.reason) + '</strong><br>Người trả lại: ' + esc(r.returned.by) + ' (Bộ Tư pháp) • Thời điểm: ' + esc(r.returned.at)
                + (r.phanCongSo && r.phanCongSo.phong ? '<br>Lãnh đạo Sở phân công: ' + esc(r.phanCongSo.phong.ten) + ' (' + esc(r.phanCongSo.phong.by) + ', ' + esc(r.phanCongSo.phong.at) + ')' + (r.phanCongSo.phong.note ? ' - ' + esc(r.phanCongSo.phong.note) : '') : '')
                + (r.phanCongSo && r.phanCongSo.canBo ? '<br>Lãnh đạo Phòng giao Cán bộ: ' + esc(r.phanCongSo.canBo.ten) + ' (' + esc(r.phanCongSo.canBo.by) + ', ' + esc(r.phanCongSo.canBo.at) + ')' + (r.phanCongSo.canBo.note ? ' - ' + esc(r.phanCongSo.canBo.note) : '') : '') + '</div>' : '')
            + (r.status === ST.TC && r.reject ? (function () {
                var k = 'tra-lai|' + r.id + '|' + r.reject.at;
                return '<div class="bctt-alert' + tgLop(k) + '" id="bcttRejectBox" data-tg="' + esc(k) + '"><div class="tg-dau"><b class="t">' + (traVe(r) ? 'BÁO CÁO BỊ LÃNH ĐẠO TRẢ LẠI, ĐANG CHỜ LÃNH ĐẠO XEM XÉT LẠI' : 'BÁO CÁO BỊ LÃNH ĐẠO TRẢ LẠI') + '</b>' + tgNut(k) + '</div>'
                    + '<div class="tg-than">Lý do bị trả lại: <strong>' + esc(r.reject.reason) + '</strong><br>Người từ chối: ' + esc(r.reject.byName) + ' (Cấp ' + r.reject.level + ') • Thời điểm: ' + esc(r.reject.at) + '</div></div>';
            })() : '')
            // Văn bản yêu cầu điều chỉnh của Bộ Tư pháp đặt trên khối Tệp báo cáo; tiêu đề khối tệp chỉ ghi «Tệp báo cáo» (04/11/2026, nhanhl2)
            + (!isBtpReport(r) && dsYC(r).length ? '<div class="bctt-files">' + ycBangHtml(r) + '</div>' : '')
            + ghiSauGuiHtml(r)
            + tepBaoCaoHtml(r)
            + banKyTruocHtml(r)
            // Tài liệu ban hành kèm theo / không ban hành kèm theo của lần trình (khối rỗng / không có quyền xem thì không hiển thị)
            + (r.submit && typeof window.tlktViewHtml === 'function' ? '<div style="margin-top:12px;">' + window.tlktViewHtml(r.submit.tlkt || [], { ownerUnit: r.unitId }) + '</div>' : '')
            + (isBtpReport(r) ? tinhHinhBtpHtml(r) : '')
            + '</div>';
        html += '<div class="card-section"><div class="bctt-tabs" id="bcttTabs">' + FORMS.map(function (f) { return '<button class="bctt-tab" data-tab="' + f.id + '">' + f.code + ' - ' + (f.id === 'm43' ? 'Tổng hợp tình hình' : (f.id === 'm04' ? 'Tình hình hoàn trả' : f.title)) + '</button>'; }).join('')
            + '</div>'
            + '<div class="bctt-panel" id="bcttP_m41"></div><div class="bctt-panel" id="bcttP_m42"></div><div class="bctt-panel" id="bcttP_m43"></div><div class="bctt-panel" id="bcttP_m04"></div></div>';
        // 04/11/2026 (nhanhl2): Lịch sử xử lý là khối riêng cuối trang chi tiết (báo cáo của Sở và báo cáo tổng hợp của Bộ), như màn rà soát của tab Xử lý báo cáo;
        // không còn là tab cạnh các mẫu
        if (!detailOpt.anLichSu) html += '<div class="card-section">' + lichSuKhung(r.history.length, '<div id="bcttP_hist"></div>') + '</div>';
        if (view.tab === 'hist') view.tab = 'm42';
        var acts = '<button class="btn btn-secondary" id="bcttBack2"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
            + '<button class="btn btn-secondary" id="bcttPreview"><i class="fa-solid fa-file-pdf"></i> Xem trước PDF</button>';
        // 05/11/2026 (nhanhl2): nút Cập nhật dữ liệu cho Mẫu 41/BTNN, Mẫu 43/BTNN, Mẫu số 04 (thay nút Tổng hợp của Tab Mẫu 43/BTNN)
        if (ed && !isBtpReport(r)) acts += '<button class="btn btn-warning" id="bcttDataSync" title="Lấy dữ liệu Mẫu 41/BTNN, Mẫu 43/BTNN, Mẫu số 04 (TT 08/2019) từ hồ sơ trên hệ thống"><i class="fa-solid fa-rotate"></i> Đồng bộ dữ liệu</button>';   // 06/11/2026: đổi tên từ «Cập nhật dữ liệu»
        if (ed && isBtpReport(r)) acts += '<button class="btn btn-warning" id="bcttSrcSync" title="Tổng hợp lại số liệu Mẫu 41/BTNN, Mẫu 43/BTNN, Mẫu số 04 từ báo cáo các đơn vị đã gửi"><i class="fa-solid fa-rotate"></i> Đồng bộ số liệu từ các đơn vị</button>';   // 06/11/2026: đổi tên từ «Cập nhật số liệu từ các đơn vị»
        // 06/11/2026: báo cáo Đã gửi BTP - nút «Lưu» (giữ tệp đã ký) và «Lưu và Trình phê duyệt lại», không có «Gửi phê duyệt»
        if (ed) acts += '<button class="btn btn-primary" id="bcttSave"' + (sau ? ' title="Lưu số liệu mới; tệp báo cáo đã ký giữ nguyên"' : '') + '><i class="fa-solid fa-floppy-disk"></i> Lưu</button>'
            + (isBtpReport(r) ? '' : sau ? '<button class="btn btn-success" id="bcttTrinhLai" title="Lưu số liệu mới, lập lại tệp báo cáo và trình Lãnh đạo ký duyệt lại"><i class="fa-solid fa-paper-plane"></i> Lưu và Trình phê duyệt lại</button>'
                : '<button class="btn btn-success" id="bcttSubmit"><i class="fa-solid fa-paper-plane"></i> Gửi phê duyệt</button>');
        if (coPhanCongSo(r)) acts += '<button class="btn btn-primary" id="bcttPC"><i class="fa-solid fa-diagram-project"></i> Phân công</button>';
        if (canApprove(r)) acts += '<button class="btn btn-danger" id="bcttRej"><i class="fa-solid fa-ban"></i> Từ chối</button><button class="btn btn-primary" id="bcttApp1"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>';
        if (canReturn(r)) acts += '<button class="btn btn-warning" id="bcttReturn"><i class="fa-solid fa-reply"></i> Trả lại</button>';
        // 04/11/2026 (nhanhl2): thanh nút chức năng của trang chi tiết luôn cố định dưới màn hình khi cuộn
        html += '<div class="card-section bctt-thanh-nut"><div class="toolbar-row" style="justify-content:flex-end;margin:0;">' + acts + '</div></div>';
        $('bcttApp').innerHTML = html;
        ganGapLichSu($('bcttApp'));
        if (!r.m04) r.m04 = emptyM04();
        renderM41Tab(r, ed); renderM42Tab(r, ed); renderM43Tab(r, ed); renderM04Tab(r, ed); if ($('bcttP_hist')) renderHist(r);
        switchTab(view.tab);
        $('bcttTabs').onclick = function (e) { var b = e.target.closest('[data-tab]'); if (b) switchTab(b.getAttribute('data-tab')); };
        suaTam[r.id] = false;
        document.querySelectorAll('.bctt-panel').forEach(function (pn) { ['input', 'change'].forEach(function (ev) { pn.addEventListener(ev, function (e) { if (e.isTrusted) suaTam[r.id] = true; }); }); });
        $('bcttBack').onclick = $('bcttBack2').onclick = function () { var b = detailBack; detailBack = null; (b || showList)(); };
        if ($('bcttSrcUnits')) $('bcttSrcUnits').onclick = function () { if (ed) collect(r); showBtp(r.year, r.period); };
        if ($('bcttSrcSync')) $('bcttSrcSync').onclick = function () { confirmSync(r); };
        if ($('bcttDataSync')) $('bcttDataSync').onclick = function () { xacNhanCapNhatDuLieu(r); };
        if ($('bcttReturn')) $('bcttReturn').onclick = function () { openReturn(r); };
        $('bcttPreview').onclick = function () {
            if (ed) collect(r);
            // Báo cáo Đã gửi BTP đã sửa số liệu sau khi gửi: xem trước theo số liệu hiện tại, chưa có chữ ký (tệp đã ký xem ở khối Tệp báo cáo)
            if (!isBtpReport(r) && r.status === ST.BH && (sau || r.capNhatSauGui)) openViewer(r, null, 'Xem trước bộ báo cáo (PDF)', { m41: r.m41, m42: r.m42, m43: r.m43, m04: r.m04, signDate: '', sign: null, kySo: true, title: r.unitName + ' - năm ' + r.year + ' - theo số liệu hiện tại, chưa ký' });
            else openViewer(r, null, 'Xem trước bộ báo cáo (PDF)');
        };
        if (ed) { $('bcttSave').onclick = function () {
                // 06/11/2026 (phiếu rà soát U3): «Lưu» không lưu khi Ngày báo cáo sai định dạng hoặc không có thật (ví dụ 31/02/2026); ô trống không kiểm tra
                var ng = $('bcttM42Ngay'), er = $('bcttM42NgayErr');
                // 06/11/2026 (nhanhl2 chọn, phiếu rà soát Tổng hợp lần 2): báo cáo tổng hợp của Bộ không có bước Gửi phê duyệt nên «Lưu» chặn cả khi Ngày báo cáo bỏ trống
                var trongBo = ng && !ng.value.trim() && isBtpReport(r);
                if (ng && (trongBo || (ng.value.trim() && !validDate(ng.value.trim())))) {
                    er.textContent = trongBo ? 'Đây là trường bắt buộc' : 'Ngày không hợp lệ (dd/mm/yyyy)'; er.classList.add('on'); ng.classList.add('bctt-invalid');
                    switchTab('m42'); ng.focus(); if (ng._flatpickr) ng._flatpickr.close(); return; // đóng lịch để không che dòng lỗi
                }
                if (ng) { ng.classList.remove('bctt-invalid'); er.classList.remove('on'); }
                collect(r);
                if (sau) { canhBaoLuuSauGui(r); return; }   // 06/11/2026 (nhanhl2): báo cáo đã gửi BTP - cảnh báo trước khi lưu
                hist(r, me().name, 'Lưu báo cáo'); save(); toast('Đã lưu báo cáo.'); showDetail(r.id); };
            if ($('bcttSubmit')) $('bcttSubmit').onclick = function () { collect(r); save(); openSubmit(r.id); };
            if ($('bcttTrinhLai')) $('bcttTrinhLai').onclick = function () { trinhLai(r); }; }
        if ($('bcttPC')) $('bcttPC').onclick = function () { openPhanCongSo(r.id); };
        if ($('bcttApp1')) { $('bcttApp1').onclick = function () { openSign(r.id, 'approve'); }; $('bcttRej').onclick = function () { openSign(r.id, 'reject'); }; }
        // 06/11/2026 (SRS Tổng hợp quy tắc 8, 10): «Xem file» của báo cáo tổng hợp in theo số liệu đã lưu gần nhất (không gồm số liệu đang nhập chưa Lưu)
        var luuBtp = isBtpReport(r) ? banDaLuu(r) : null;
        bindFileTable('bcttFileTable', r, !isBtpReport(r) && r.status === ST.BH ? kySoData(r)
            : (luuBtp ? { m41: luuBtp.m41, m42: luuBtp.m42, m43: luuBtp.m43, m04: luuBtp.m04 || emptyM04(), signDate: '', sign: null, kySo: true, title: r.unitName + ' - năm ' + r.year } : undefined));
        ganBanKyTruoc(r);
        ganYCBang(r);
        refreshShared();
    }
    // Cập nhật số liệu báo cáo của Bộ từ báo cáo Đã ban hành mới nhất của các Sở: ghi đè toàn bộ số liệu 04 biểu mẫu (kể cả ô Bộ đã sửa); giữ Năm báo cáo, Ngày báo cáo
    // Khối «Tổng hợp tình hình gửi báo cáo» trong chi tiết báo cáo tổng hợp (04/11/2026, nhanhl2): số liệu tại lần «Cập nhật số liệu từ các đơn vị» gần nhất
    // (lập báo cáo cũng là một lần tổng hợp), không ghi hạn gửi. Dữ liệu cũ chưa lưu số gửi chậm thì tính lại từ các báo cáo đã gửi trước thời điểm tổng hợp
    function tinhHinhBtpHtml(r) {
        var src = r.src || { n: 0, at: '' }, n = src.n || 0, cham = src.cham;
        if (cham == null) cham = demGuiCham(stpIssued(DB.reports, r.year, r.period).filter(function (x) { return !src.at || m43Stamp((x.issued && x.issued.at) || x.sentAt) <= m43Stamp(src.at); }), r.year, r.period);
        var chua = PROVINCES.length - n;
        function the(cls, icon, so, nhan) { return '<div class="th-the"><span class="th-icon ' + cls + '"><i class="fa-solid ' + icon + '"></i></span><div><div class="th-so">' + so + '</div><div class="th-nhan">' + nhan + '</div></div></div>'; }
        return '<div class="th-tong bctt-th-btp"><div class="th-tieu-de"><span>Tổng hợp tình hình gửi báo cáo năm ' + r.year + ' - ' + esc(PERIODS[r.period].label) + '</span>'
            + (src.at ? '<span class="th-han" title="Số liệu tại lần đồng bộ số liệu từ các đơn vị gần nhất"><i class="fa-regular fa-clock"></i> Số liệu tính đến ' + esc(src.at) + '</span>' : '') + '</div>'
            + '<div class="th-the-hang">' + the('tot', 'fa-circle-check', n, 'Đã gửi BTP') + the('canh', 'fa-clock', cham, 'Gửi chậm') + the('trung', 'fa-hourglass-half', chua, 'Chưa gửi BTP') + '</div></div>';
    }
    function confirmSync(r) {
        var a = btpAuto(DB.reports, r.year, r.period);
        var html = '<div class="bctt-modal" style="width:560px;"><div class="bctt-mh"><div><div class="tt">Đồng bộ số liệu từ các đơn vị</div></div><button class="bctt-x" data-close>&times;</button></div>'
            // 04/11/2026 (nhanhl2): ghi rõ 03 biểu mẫu được tổng hợp lại, mỗi biểu mẫu một dòng (Mẫu 42/BTNN do Bộ tự nhập, không tổng hợp)
            + '<div class="bctt-mb"><p>Hệ thống tổng hợp lại số liệu 03 biểu mẫu sau từ báo cáo của <strong>' + a.src.n + ' đơn vị đã gửi</strong>, theo số liệu mới nhất các đơn vị đang lưu:</p>'
            + '<ul style="margin:8px 0 0;padding-left:20px;line-height:1.7;">' + FORMS.filter(function (f) { return f.id !== 'm42'; }).map(function (f) { return '<li><strong>' + esc(f.code) + '</strong> - ' + esc(f.title) + '</li>'; }).join('') + '</ul>'
            + '<p style="margin-top:8px;">Số liệu Bộ Tư pháp đã sửa trên báo cáo tổng hợp sẽ bị ghi đè. Bạn có muốn tiếp tục?</p></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-primary" id="bcttSyncOk"><i class="fa-solid fa-rotate"></i> Đồng bộ</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        $('bcttSyncOk').onclick = function () {
            closeOv('bcttOv2');
            // 06/11/2026 (SRS MH04 chức năng 1 TH1): đếm lại đơn vị đã gửi lúc bấm Đồng bộ; không còn đơn vị nào thì không đồng bộ, giữ nguyên số liệu
            a = btpAuto(DB.reports, r.year, r.period);
            if (!a.src.n) { toast('Hiện không có đơn vị nào ở trạng thái Đã gửi BTP. Số liệu báo cáo tổng hợp được giữ nguyên.', 'error'); return; }
            // 04/11/2026 (nhanhl2): trong lúc tổng hợp hiện biểu tượng chờ và chặn mọi thao tác khác cho tới khi xong
            choXuLy('Đang đồng bộ số liệu từ các đơn vị', a.src.n, function () {
                a.src.snap = chupDonVi(stpIssued(DB.reports, r.year, r.period)); delete snapTam[r.id];
                applyAuto(r, a); hist(r, me().name, 'Đồng bộ số liệu từ các đơn vị', 'Tổng hợp từ ' + a.src.n + ' báo cáo đã gửi (' + a.src.n + '/' + PROVINCES.length + ' đơn vị).');
                save(); toast('Đã đồng bộ số liệu từ báo cáo của ' + a.src.n + ' đơn vị đã gửi.'); showDetail(r.id);
            }, 'Đã tổng hợp {n}/{t} đơn vị...');
        };
    }
    // Màn chờ xử lý: phủ toàn trang, biểu tượng quay, đếm số đơn vị đã tổng hợp; chặn bấm chuột và bàn phím tới khi xong (mockup giả lập khoảng 2 giây)
    function choXuLy(tieuDe, soDv, xong, mauDem, ghi) {
        var ov = document.createElement('div'), n = 0, tong = Math.max(1, soDv || 1);
        ov.className = 'bctt-cho'; ov.setAttribute('role', 'alertdialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-busy', 'true'); ov.setAttribute('aria-live', 'polite');
        ov.innerHTML = '<div class="bctt-cho-hop" tabindex="-1"><span class="bctt-cho-quay" aria-hidden="true"></span><div class="bctt-cho-tt">' + esc(tieuDe) + '</div>'
            + '<div class="bctt-cho-dem">' + esc(mauDem || 'Đã tổng hợp {n}/{t} đơn vị...').replace('{n}', '<strong>0</strong>').replace('{t}', tong) + '</div><div class="bctt-cho-thanh"><span></span></div><div class="bctt-cho-ghi">' + esc(ghi || 'Vui lòng chờ, không thao tác trong lúc hệ thống tổng hợp.') + '</div></div>';
        document.body.appendChild(ov);
        var chan = function (e) { e.preventDefault(); e.stopPropagation(); };
        document.addEventListener('keydown', chan, true);
        ov.querySelector('.bctt-cho-hop').focus();
        var dem = ov.querySelector('.bctt-cho-dem strong'), thanh = ov.querySelector('.bctt-cho-thanh span');
        var hen = setInterval(function () {
            n = Math.min(tong, n + Math.max(1, Math.round(tong / 20)));
            dem.textContent = n; thanh.style.width = Math.round(n * 100 / tong) + '%';
            if (n < tong) return;
            clearInterval(hen);
            setTimeout(function () {
                document.removeEventListener('keydown', chan, true); ov.remove();
                xong();
            }, 300);
        }, 90);
    }
    // Báo cáo của Bộ - Mẫu 43 / Mẫu số 04: chuyển giữa chế độ nhập liệu và chế độ "Xem chi tiết theo Sở Tư pháp" (ô số liệu là link mở popup theo 34 Sở)
    var btpDet = { m43: false, m04: false };
    // 04/11/2026 (nhanhl2): tạm ẩn nút «Xem chi tiết theo Sở Tư pháp»; đổi AN_XEM_THEO_SO thành false để hiện lại
    var AN_XEM_THEO_SO = true;
    function detToggle(form) {
        if (AN_XEM_THEO_SO) { btpDet[form] = false; return ''; }
        return btpDet[form] ? '<button class="btn btn-secondary btn-sm" data-dettg="' + form + '"><i class="fa-solid fa-pen-to-square"></i> Quay lại bảng số liệu</button>'
            : '<button class="btn btn-secondary btn-sm" data-dettg="' + form + '"><i class="fa-solid fa-magnifying-glass"></i> Xem chi tiết theo đơn vị</button>';
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
            i.classList.toggle('bctt-chg', chg); i.title = chg ? 'Đã sửa. Số tự tổng hợp: ' + fmt(b, money) : 'Số tự tổng hợp từ các đơn vị';
        });
    }
    // Nút giải thích: rê chuột hoặc đặt tiêu điểm thì hiện hộp giải thích (04/11/2026)
    function goiY(nd) { return '<button type="button" class="bctt-goi-y" aria-label="Giải thích"><i class="fa-solid fa-circle-info"></i><span class="bctt-goi-y-nd" role="tooltip">' + esc(nd) + '</span></button>'; }
    // Popup «Chi tiết số liệu» (chỉ đọc) mở khi bấm ô số liệu ở chế độ «Xem chi tiết theo Sở Tư pháp» của Mẫu 43/BTNN, Mẫu số 04 (04/11/2026, nhanhl2):
    // lọc Nhóm, Cột (mặc định ô vừa bấm) và Đơn vị báo cáo; chỉ hiện đơn vị đã gửi BTP; bấm tên đơn vị mở báo cáo của đơn vị đó
    function openCellDetail(r, form, g, c) {
        var isM43 = form === 'm43', NHAN = isM43 ? M43_LABELS : M04_LABELS, TIEN = isM43 ? M43_MONEY : M04_MONEY, den = isM43 ? 27 : 15;
        var loc = { g: g, c: c, dv: '' };
        var gui = PROVINCES.map(function (pv) { return DB.reports.find(function (x) { return !isBtpReport(x) && x.province === pv && x.year === r.year && x.period === r.period && x.status === ST.BH; }); }).filter(Boolean);
        var giaTri = function (x) { return isM43 ? m43Row(x.m43[loc.g])[loc.c] : m04Row((x.m04 || {})[loc.g])[loc.c]; };
        var opCot = '';
        for (var k = 2; k <= den; k++) { var t = 'Cột ' + k + ' - ' + NHAN[k], n = t.length > 90 ? t.slice(0, 88).replace(/[\s,;.]+$/, '') + '…' : t; opCot += '<option value="' + k + '"' + (k === c ? ' selected' : '') + ' title="' + esc(t) + '">' + esc(n) + '</option>'; }
        var html = '<div class="bctt-modal" style="width:980px;"><div class="bctt-mh"><div><div class="tt">Chi tiết số liệu</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="bctt-loc-cs">'
            + '<div class="form-group" style="margin:0;"><label class="form-label" for="bcttCsNhom">Nhóm</label><select class="form-control" id="bcttCsNhom">' + GROUPS.map(function (q) { return '<option value="' + q.k + '"' + (q.k === g ? ' selected' : '') + '>' + q.k + '. ' + esc(q.name) + '</option>'; }).join('') + '</select></div>'
            + '<div class="form-group" style="margin:0;"><label class="form-label" for="bcttCsCot">Cột</label><select class="form-control" id="bcttCsCot" style="text-overflow:ellipsis;">' + opCot + '</select></div>'
            + '<div class="form-group" style="margin:0;"><label class="form-label" for="bcttCsDv">Đơn vị báo cáo</label><select class="form-control" id="bcttCsDv"><option value="">Tất cả</option>' + gui.map(function (x) { return '<option value="' + esc(x.id) + '">' + esc(x.unitName) + '</option>'; }).join('') + '</select></div></div>'
            + '<div id="bcttCsSo"></div>'
            + '<div class="table-container" style="max-height:46vh;overflow:auto;"><table class="custom-table" id="bcttCellDet"><thead><tr><th style="width:60px;">STT</th><th>Đơn vị báo cáo</th><th style="width:180px;text-align:right;">Số liệu</th></tr></thead><tbody></tbody></table></div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Đóng</button></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        function ve() {
            var tien = TIEN[loc.c], tong = 0;
            gui.forEach(function (x) { tong += num(giaTri(x)); });
            var cur = isM43 ? m43Row(r.m43[loc.g])[loc.c] : m04Row((r.m04 || {})[loc.g])[loc.c];
            $('bcttCsSo').innerHTML = '<div class="bctt-meta" style="grid-template-columns:repeat(2,minmax(0,1fr));margin:14px 0 12px;">'
                + '<div><label>Tổng giá trị từ các đơn vị báo cáo' + goiY('Cộng số liệu của ô đang chọn (theo Nhóm và Cột ở trên) từ báo cáo của tất cả ' + gui.length + ' đơn vị đã gửi Bộ Tư pháp (trạng thái Đã gửi BTP) trong kỳ. Số được tính tại thời điểm xem, gồm cả báo cáo đơn vị gửi sau lần «Đồng bộ số liệu từ các đơn vị» gần nhất. Ô lọc Đơn vị báo cáo chỉ lọc danh sách bên dưới, không làm đổi tổng này.') + '</label><strong>' + fmt(tong, tien) + '</strong></div>'
                + '<div><label>Số trên báo cáo của Bộ' + goiY('Số đang ghi ở ô tương ứng trên báo cáo tổng hợp của Bộ Tư pháp. Số này lấy từ lần «Đồng bộ số liệu từ các đơn vị» gần nhất và có thể đã được cán bộ Bộ Tư pháp sửa tay, nên có thể khác Tổng giá trị từ các đơn vị báo cáo.') + '</label><strong>' + fmt(cur, tien) + '</strong></div></div>';
            var hien = gui.filter(function (x) { return !loc.dv || x.id === loc.dv; });
            $('bcttCellDet').tBodies[0].innerHTML = hien.length ? hien.map(function (x, i) {
                return '<tr><td>' + (i + 1) + '</td><td class="text-left"><button class="bctt-link" data-srid="' + x.id + '" title="Bấm để xem báo cáo của ' + esc(x.unitName) + '">' + esc(x.unitName) + '</button></td><td style="text-align:right;">' + fmt(giaTri(x), tien) + '</td></tr>';
            }).join('') : '<tr><td colspan="3">Không có dữ liệu</td></tr>';
        }
        $('bcttCsNhom').onchange = function () { loc.g = this.value; ve(); };
        $('bcttCsCot').onchange = function () { loc.c = +this.value; ve(); };
        $('bcttCsDv').onchange = function () { loc.dv = this.value; ve(); };
        ve();
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
        var html = '<table class="custom-table bctt-m41" id="' + (opts.tid || 'bcttM41') + '"><thead><tr><th style="width:44px;">STT</th>' + M41_COLS.map(function (c) { return '<th class="m41-c-' + c.k + '">' + c.label + ' (' + c.no + ')</th>'; }).join('')
            + (opts.unitCol ? '<th>Đơn vị báo cáo</th>' : '') /* 06/11/2026: đổi tên từ «Sở Tư pháp» theo SRS Tổng hợp MH03 */ + ((ed || opts.adjust) ? '<th style="width:80px;">Thao tác</th>' : '') + '</tr></thead><tbody>';
        var total = 0, span = 7 + extra + ((ed || opts.adjust) ? 1 : 0);
        var col = m41Collapsed[opts.tid || 'bcttM41'] || {};
        GROUPS.forEach(function (g) {
            var rows = m41[g.k] || []; total += rows.length;
            var hid = col[g.k] ? ' m41-hide' : '';
            html += '<tr class="g' + (col[g.k] ? ' collapsed' : '') + '" data-g41="' + g.k + '"><td>' + g.k + '</td><td colspan="' + (span - 1) + '"><button type="button" class="m41-tg" data-m41tg="' + g.k + '" aria-expanded="' + (col[g.k] ? 'false' : 'true') + '"><i class="fa-solid fa-chevron-down m42-chev"></i>' + g.name + ' (' + rows.length + ' vụ việc)</button>' + (opts.ctdv ? ctdvLine(opts.ctdv, 'm41', g.k) : '') + '</td></tr>';
            rows.forEach(function (row, i) {
                html += '<tr class="m41-r' + hid + '" data-gk="' + g.k + '"><td>' + (i + 1) + '</td>' + M41_COLS.map(function (c) {
                    return ed ? '<td class="m41-c-' + c.k + '"><textarea class="bctt-in bctt-ag" rows="2" data-g="' + g.k + '" data-i="' + i + '" data-k="' + c.k + '" placeholder="' + (c.k === 'hoTen' ? 'Nhập họ và tên' : 'Nhập nội dung') + '">' + esc(row[c.k]) + '</textarea><div class="bctt-err">Đây là trường bắt buộc</div></td>' : '<td class="text-left m41-c-' + c.k + '">' + esc(row[c.k]) + '</td>';
                }).join('') + (opts.unitCol ? '<td class="text-left">' + esc(row._unit) + '</td>' : '')   // 06/11/2026: bỏ nhãn «Đã điều chỉnh» (Bộ không còn điều chỉnh báo cáo của Sở)
                    + (ed ? '<td><button class="icon-btn danger" title="Xóa" data-del="' + g.k + ':' + i + '"><i class="fa-solid fa-trash"></i></button></td>' : '')
                    + (opts.adjust ? '<td><button class="icon-btn edit" data-admin-icon-normalized="1" title="Điều chỉnh" data-adj41="' + row._rid + ':' + g.k + ':' + row._idx + '"><i class="fa-solid fa-pen-to-square"></i></button></td>' : '') + '</tr>';
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
        p.innerHTML = '<div class="toolbar-row" style="justify-content:space-between;align-items:center;"><div class="formula-hint">Cơ quan lập danh mục: <strong>' + esc(r.unitName) + '</strong>. Danh mục vụ việc theo 06 nhóm lĩnh vực.' + (ed && !isBtpReport(r) ? ' Nút Đồng bộ dữ liệu lấy danh mục vụ việc từ hồ sơ; Cột (4), (5), (6) do Cán bộ nhập.' : '') + '</div>' + m41AllBtns('bcttM41') + '</div>'
            + '<div class="table-container">' + m41TableHtml(r.m41, ed, { unitCol: isBtpReport(r), ctdv: isBtpReport(r) ? r : null }) + '</div>';
        p.oninput = function (e) { if (e.target.classList && e.target.classList.contains('bctt-ag')) autoGrow(e.target); };
        autoGrowIn(p);
        cuonNoi(p.querySelector('.table-container'));
        onClk(p, function (e) {
            if (m41ToggleClick(e)) return;
            if (!ed) return;
            var a = e.target.closest('[data-add]'), d = e.target.closest('[data-del]');
            if (a) { collect(r); r.m41[a.getAttribute('data-add')].push({ hoTen: '', diaChi: '', coQuan: '', tinhHinh: '', khoKhan: '', ghiChu: '' }); renderM41Tab(r, true); }
            if (d) { collect(r); var x = d.getAttribute('data-del').split(':'); xacNhanXoa('Bạn có chắc chắn muốn xóa vụ việc này khỏi danh mục?', function () { r.m41[x[0]].splice(+x[1], 1); renderM41Tab(r, true); toast('Đã xóa vụ việc khỏi danh mục.'); }); }
        });
    }
    // ----- Tab Mẫu 42 -----
    function m42Head(h, m) { return h.replace('{nam}', m.nam || '……').replace('{namKeHoach}', m.nam ? String(+m.nam + 1) : '……'); }
    // Mẫu 42: mỗi phần (I, II, III) và mỗi mục (1, 2, 3) là 01 khối thu gọn / mở rộng (mặc định mở); ô nhập tự giãn theo nội dung
    function m42Toggle(title, cls, body) {
        return '<div class="m42-box ' + cls + '"><button type="button" class="m42-tg" data-m42tg aria-expanded="true"><i class="fa-solid fa-chevron-down m42-chev"></i><span>' + esc(title) + '</span></button><div class="m42-body">' + body + '</div></div>';
    }
    function renderM42Tab(r, ed) {
        var m = r.m42, dis = ed ? '' : ' disabled', btp = isBtpReport(r);
        function item(it) {
            var id = 'bcttM42_' + it.k;
            return '<div class="m42-it">' + (it.label ? '<label for="' + id + '">- ' + esc(m42Head(it.label, m)) + '</label>' : '')
                + '<textarea class="bctt-ta m42-ta" id="' + id + '" data-m42="' + it.k + '" rows="2" maxlength="4000" placeholder="Nhập nội dung báo cáo"' + dis + '>' + esc(m.items[it.k]) + '</textarea>'
                + (btp ? m42SrcLine(r, it.k) : '') + '</div>';
        }
        var html = '<div class="bctt-m42 m42-form"><div class="m42-bar"><div class="formula-hint">' + (btp ? 'Nhập nội dung tổng hợp của Bộ Tư pháp theo từng mục của Mẫu 42/BTNN. Bấm dòng dưới mỗi ô để xem nội dung các đơn vị đã gửi.' : 'Nhập nội dung theo từng mục của Mẫu 42/BTNN. Ô nhập tự giãn theo độ dài nội dung.') + '</div>'
            + '<div class="m42-bar-act"><button type="button" class="btn btn-secondary btn-sm" data-m42all="1"><i class="fa-solid fa-angles-down"></i> Mở rộng tất cả</button><button type="button" class="btn btn-secondary btn-sm" data-m42all="0"><i class="fa-solid fa-angles-up"></i> Thu gọn tất cả</button></div></div>'
            + '<div class="m42-head">'
            + '<div class="m42-f"><label>Cơ quan báo cáo</label><div class="m42-ro">' + esc(r.unitName) + '</div></div>'
            + '<div class="m42-f"><label>Địa danh</label><div class="m42-ro">' + esc(placeOf(r)) + '</div></div>'
            + '<div class="m42-f"><label for="bcttM42Nam">Năm báo cáo</label><input class="form-control" id="bcttM42Nam" value="' + esc(r.year) + '" readonly title="Lấy theo Năm báo cáo của báo cáo" style="background:#f8fafc;"><div class="bctt-err" id="bcttM42NamErr">Đây là trường bắt buộc</div></div>'
            + '<div class="m42-f"><label for="bcttM42Ngay">Ngày báo cáo<span style="color:red;">*</span></label><div class="bctt-ngay"><input class="form-control" id="bcttM42Ngay" value="' + esc(m.ngay) + '" placeholder="dd/mm/yyyy" autocomplete="off"' + dis + '><i class="fa-regular fa-calendar" aria-hidden="true"></i></div><div class="bctt-err" id="bcttM42NgayErr">Đây là trường bắt buộc</div></div>'
            + '</div>';
        M42_SECTIONS.forEach(function (s) {
            var body = s.sub ? s.sub.map(function (b) { return m42Toggle(b.h, 'm42-blk', b.items.map(item).join('')); }).join('') : s.items.map(item).join('');
            html += m42Toggle(m42Head(s.h, m), 'm42-sec', body);
        });
        var p = $('bcttP_m42');
        p.innerHTML = html + '</div>';
        if (ed) ganLich($('bcttM42Ngay'));
        onClk(p, function (e) {
            var t = e.target.closest('[data-m42tg]'), a = e.target.closest('[data-m42all]');
            if (t) { var box = t.parentNode, c = !box.classList.contains('collapsed'); box.classList.toggle('collapsed', c); t.setAttribute('aria-expanded', c ? 'false' : 'true'); if (!c) autoGrowIn(box); }
            if (a) { var open = a.getAttribute('data-m42all') === '1'; p.querySelectorAll('.m42-box').forEach(function (b) { b.classList.toggle('collapsed', !open); b.querySelector('[data-m42tg]').setAttribute('aria-expanded', open ? 'true' : 'false'); }); if (open) autoGrowIn(p); }
        });
        p.addEventListener('input', function (e) { if (e.target.classList && e.target.classList.contains('m42-ta')) autoGrow(e.target); });
        autoGrowIn(p);
    }
    // Mẫu 42/BTNN của Bộ (04/11/2026, nhanhl2): dưới mỗi ô là 01 dòng mở popup nội dung của mục đó trong báo cáo các Sở Tư pháp đã gửi BTP cùng kỳ
    // ---------------- Popup «Chi tiết các đơn vị» (04/11/2026, nhanhl2), dùng chung cho 04 biểu mẫu của báo cáo tổng hợp Bộ Tư pháp ----------------
    // Mẫu 42/BTNN: mở từ dòng dưới mỗi ô nhập liệu (key = mã mục); Mẫu 41/BTNN, Mẫu 43/BTNN, Mẫu số 04: mở từ dòng mục lớn I - VI (key = mã nhóm)
    // Đủ 34 Sở Tư pháp theo thứ tự danh mục: đơn vị Đã gửi BTP (báo cáo Đã ban hành cùng kỳ) kèm số liệu; đơn vị Chưa gửi BTP không có số liệu
    // 06/11/2026 (yêu cầu khách hàng): số liệu và danh sách đơn vị theo bản chụp lúc «Cập nhật số liệu từ các đơn vị» gần nhất (anhDonVi)
    function ctdvDs(r) {
        var snap = anhDonVi(r), ds = Object.keys(snap).map(function (k) { return snap[k]; });
        return PROVINCES.map(function (pv) { var x = ds.find(function (y) { return y.province === pv; }) || null; return { ma: pv, ten: stpName(pv), r: x, gui: !!x }; });
    }
    function ctdvLine(r, form, key) {
        return '<button type="button" class="m42-nguon" data-ctdv="' + form + '|' + key + '" data-rid="' + esc(r.id) + '" title="Bấm để xem chi tiết theo từng đơn vị báo cáo">Xem chi tiết theo đơn vị</button>';
    }
    function m42SrcLine(r, k) { return ctdvLine(r, 'm42', k); }
    // Tên chỉ tiêu Mẫu 42/BTNN: mã phần, mục («I.1», «II») kèm nội dung chỉ tiêu (mục không có chỉ tiêu con thì lấy tên phần)
    function m42ChiTieu(it, m) {
        var ma = (it.sec.match(/^([IVX]+)\./) || [])[1] || '', so = it.block ? ((it.block.match(/^(\d+)\./) || [])[1] || '') : '';
        var ten = it.label ? m42Head(it.label, m) : m42Head(it.sec, m).replace(/^[IVX]+\.\s*/, '');
        return (ma ? ma + (so ? '.' + so : '') + ' - ' : '') + ten;
    }
    // Mẫu 41/BTNN, Mẫu 43/BTNN, Mẫu số 04: tiêu đề bảng theo đúng mẫu, chèn cột «Đơn vị báo cáo» và «Nhóm» (I - VI) ngay sau cột STT
    function ctdvHeadMau(form) {
        if (form === 'm41') return '<thead><tr><th class="ctdv-c1">STT</th><th class="ctdv-c2">Đơn vị báo cáo</th><th class="ctdv-pl">Nhóm</th>' + M41_COLS.map(function (c) { return '<th class="m41-c-' + c.k + '">' + c.label + ' (' + c.no + ')</th>'; }).join('') + '</tr></thead>';
        var n = form === 'm43' ? 5 : 3, h = form === 'm43' ? m43Head() : m04Head();
        h = h.replace('<th rowspan="' + n + '" style="min-width:150px;">STT</th>', '<th rowspan="' + n + '" class="ctdv-c1">STT</th><th rowspan="' + n + '" class="ctdv-c2">Đơn vị báo cáo</th><th rowspan="' + n + '" class="ctdv-pl">Nhóm</th>');
        return h.replace('<tr class="column-number-row"><th>1</th>', '<tr class="column-number-row"><th class="ctdv-c1">1</th><th class="ctdv-c2"></th><th class="ctdv-pl"></th>');
    }
    // Dòng của bảng theo mẫu, chỉ bản ghi có dữ liệu (04/11/2026, nhanhl2): Mẫu 41 mỗi vụ việc một dòng; Mẫu 43, Mẫu số 04 mỗi đơn vị đã gửi một dòng số liệu của nhóm.
    // Đơn vị chưa gửi hoặc không có vụ việc thì không hiện. Thứ tự: nhóm I - VI, trong nhóm theo danh mục đơn vị
    function ctdvDongMau(form, nhom, ds) {
        var out = [];
        GROUPS.filter(function (g) { return !nhom || g.k === nhom; }).forEach(function (g) {
            ds.forEach(function (d) {
                if (!d.gui) return;
                if (form === 'm41') ((d.r.m41 || {})[g.k] || []).forEach(function (v) { out.push({ d: d, g: g, v: v }); });
                else out.push({ d: d, g: g });
            });
        });
        return out;
    }
    function ctdvTdMau(form, x, stt) {
        var d = x.d, g = x.g;
        var dau = '<td class="ctdv-c1">' + stt + '</td><td class="ctdv-c2 text-left"><span class="m42s-ten">' + esc(d.ten) + '</span></td><td class="ctdv-pl text-left">' + g.k + '. ' + esc(g.name) + '</td>';
        if (form === 'm41') return dau + M41_COLS.map(function (c) { return '<td class="text-left m41s-o m41-c-' + c.k + '">' + esc(x.v[c.k] || '') + '</td>'; }).join('');
        return dau + (form === 'm43' ? rowCells(m43Row(d.r.m43[g.k]), 'view', '') : rowCells04(m04Row((d.r.m04 || {})[g.k]), 'view', ''));
    }
    // Chỉ hiện đơn vị đã gửi BTP (04/11/2026, nhanhl2). Mẫu 42: lọc «Chỉ tiêu» (mặc định chỉ tiêu vừa bấm), bảng STT, Đơn vị báo cáo, Chỉ tiêu, Ngày gửi BTP, Nội dung;
    // Mẫu 41, 43, 04: lọc «Nhóm» (mặc định nhóm vừa bấm), bảng theo đúng cấu trúc cột của mẫu. Thứ tự dòng: chỉ tiêu hoặc nhóm, rồi theo danh mục đơn vị
    // Dòng «Tổng cộng» (Mẫu 43, Mẫu số 04; 04/11/2026 nhanhl2): ngay dưới dòng số thứ tự cột, cộng mọi dòng đang lọc (mọi trang), như dòng Tổng cộng của mẫu
    function ctdvTongCong(form, dong) {
        if (form !== 'm43' && form !== 'm04') return '';
        var den = form === 'm43' ? 27 : 15, tong = {};
        for (var c = 2; c <= den; c++) tong[c] = 0;
        dong.forEach(function (x) {
            var hang = form === 'm43' ? m43Row(x.d.r.m43[x.g.k]) : m04Row((x.d.r.m04 || {})[x.g.k]);
            for (var c = 2; c <= den; c++) tong[c] += num(hang[c]);
        });
        return '<tr class="t ctdv-tong"><td class="ctdv-c1"></td><td class="ctdv-c2 text-left">Tổng cộng</td><td class="ctdv-pl"></td>' + (form === 'm43' ? rowCells(tong, 'view', '') : rowCells04(tong, 'view', '')) + '</tr>';
    }
    function openCtdv(r, form, key) {
        var f = FORMS.find(function (x) { return x.id === form; }), ds = ctdvDs(r), gui = ds.filter(function (d) { return d.gui; }), mau = form !== 'm42';
        var loc = { dv: '', nhom: mau ? key : '', ct: mau ? '' : key }, trang = { page: 1, size: 10 };
        var loai = mau
            ? '<div class="form-group" style="margin:0;width:420px;max-width:100%;"><label class="form-label" for="bcttM42sNhom">Nhóm</label><select class="form-control" id="bcttM42sNhom"><option value="">Tất cả</option>'
                + GROUPS.map(function (g) { return '<option value="' + g.k + '"' + (g.k === key ? ' selected' : '') + '>' + g.k + '. ' + esc(g.name) + '</option>'; }).join('') + '</select></div>'
            : '<div class="form-group" style="margin:0;width:520px;max-width:100%;"><label class="form-label" for="bcttM42sCT">Chỉ tiêu</label><select class="form-control" id="bcttM42sCT" style="text-overflow:ellipsis;"><option value="">Tất cả</option>'
                // Ô chọn của trình duyệt kéo danh sách rộng bằng tùy chọn dài nhất (chỉ tiêu I.2 quản lý chuyên ngành hơn 400 ký tự) làm danh sách tràn màn hình:
                // rút gọn chữ tùy chọn còn 90 ký tự, chữ đầy đủ ở title và ở cột Chỉ tiêu của bảng (04/11/2026)
                + M42_ITEMS.map(function (it) { var t = m42ChiTieu(it, r.m42), n = t.length > 90 ? t.slice(0, 88).replace(/[\s,;.]+$/, '') + '…' : t; return '<option value="' + it.k + '"' + (it.k === key ? ' selected' : '') + ' title="' + esc(t) + '">' + esc(n) + '</option>'; }).join('') + '</select></div>';
        var html = '<div class="bctt-modal m42s-modal" style="width:1440px;max-width:96vw;height:94vh;"><div class="bctt-mh"><div><div class="tt">Chi tiết các đơn vị</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb m42s-mb"><div class="bctt-meta m42s-phieu">'
            + '<div><label>Tên báo cáo</label><strong>' + esc(f.code) + ' - ' + esc(f.title) + ' năm ' + r.year + '</strong></div>'
            + '<div><label>Loại kỳ báo cáo</label><strong>' + esc(PERIODS[r.period].label) + '</strong></div>'
            + '<div><label>Đơn vị đã báo cáo</label><strong>' + gui.length + ' đơn vị</strong></div>'
            + '<div><label>Đơn vị chưa báo cáo</label><strong>' + (ds.length - gui.length) + ' đơn vị</strong></div></div>'
            // 06/11/2026 (yêu cầu khách hàng): ghi chú thời điểm của số liệu
            + '<div class="ctdv-ghi-chu"><div><i class="fa-regular fa-clock"></i> Dữ liệu báo cáo cập nhật tính tới ngày <strong>' + esc((r.src && r.src.at) || '--') + '</strong>.</div>'
            + '<div><i class="fa-solid fa-circle-info"></i> Sử dụng chức năng đồng bộ để có số liệu mới nhất.</div></div>'
            + '<div class="m42s-loc"><div class="form-group" style="margin:0;width:160px;"><label class="form-label" for="bcttM42sNam">Năm</label><select class="form-control" id="bcttM42sNam" disabled title="Năm của báo cáo, không chọn lại được"><option>' + r.year + '</option></select></div>'
            + '<div class="form-group" style="margin:0;width:420px;max-width:100%;"><label class="form-label" for="bcttM42sDv">Đơn vị báo cáo</label><select class="form-control" id="bcttM42sDv"><option value="">Tất cả</option>'
            + gui.map(function (d) { return '<option value="' + esc(d.ma) + '">' + esc(d.ten) + '</option>'; }).join('') + '</select></div>' + loai + '</div>'
            + '<div id="bcttM42sBang"></div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close><i class="fa-solid fa-xmark"></i> Đóng</button></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        function dongM42(hien) {
            var out = [];
            M42_ITEMS.filter(function (it) { return !loc.ct || it.k === loc.ct; }).forEach(function (it) { hien.forEach(function (d) { out.push({ d: d, it: it }); }); });
            return out;
        }
        function tdM42(x) {
            var nd = String(x.d.r.m42.items[x.it.k] || '').trim();
            return '<td class="text-left"><span class="m42s-ten">' + esc(x.d.ten) + '</span></td><td class="text-left m42s-ct">' + esc(m42ChiTieu(x.it, r.m42)) + '</td>'
                + '<td>' + esc((x.d.r.issued && x.d.r.issued.at) || x.d.r.sentAt || '--') + '</td>'
                + '<td class="text-left">' + (nd ? '<div class="m42s-nd">' + esc(nd) + '</div>' : '<span class="m42s-rong">Đơn vị không nhập nội dung cho chỉ tiêu này.</span>') + '</td>';
        }
        function ve() {
            var hien = gui.filter(function (d) { return !loc.dv || d.ma === loc.dv; });
            var dong = mau ? ctdvDongMau(form, loc.nhom, hien) : dongM42(hien);
            var soTrang = Math.max(1, Math.ceil(dong.length / trang.size)); if (trang.page > soTrang) trang.page = soTrang;
            var dau = (trang.page - 1) * trang.size, phan = dong.slice(dau, dau + trang.size);
            var head = mau ? ctdvHeadMau(form) : '<thead><tr><th style="width:60px;">STT</th><th style="width:240px;">Đơn vị báo cáo</th><th style="width:340px;">Chỉ tiêu</th><th style="width:150px;">Ngày gửi BTP</th><th>Nội dung</th></tr></thead>';
            $('bcttM42sBang').innerHTML = '<div class="table-container"><table class="custom-table' + (mau ? ' bctt-' + form + ' ctdv-mau' : '') + '" id="bcttM42sTbl">' + head + '<tbody>'
                + (phan.length ? ctdvTongCong(form, dong) : '') + (phan.length ? phan.map(function (x, i) {
                    return '<tr class="list-row" data-m42rid="' + esc(x.d.r.id) + '" title="Bấm để xem chi tiết báo cáo của ' + esc(x.d.ten) + '">'
                        + (mau ? ctdvTdMau(form, x, dau + i + 1) : '<td>' + (dau + i + 1) + '</td>' + tdM42(x)) + '</tr>';
                }).join('') : '<tr><td colspan="40">Không có dữ liệu</td></tr>')
                + '</tbody></table></div>' + pagerHtml(dong.length, trang, 'bcttM42sPager');
            var bar = $('bcttM42sPager');
            if (bar) {
                $('bcttM42sPagerSize').onchange = function () { trang.size = +this.value || 10; trang.page = 1; ve(); };
                bar.querySelector('.pagination-pages').onclick = function (e) { var t = e.target.closest('[data-pg]'); if (!t || t.classList.contains('disabled') || t.classList.contains('active')) return; trang.page = +t.getAttribute('data-pg'); ve(); };
            }
            $('bcttM42sTbl').querySelectorAll('[data-m42rid]').forEach(function (tr) {
                tr.onclick = function () { moChiTietDv(r, tr.getAttribute('data-m42rid'), form); };
            });
        }
        $('bcttM42sDv').onchange = function () { loc.dv = this.value; trang.page = 1; ve(); };
        if ($('bcttM42sNhom')) $('bcttM42sNhom').onchange = function () { loc.nhom = this.value; trang.page = 1; ve(); };
        if ($('bcttM42sCT')) $('bcttM42sCT').onchange = function () { loc.ct = this.value; trang.page = 1; ve(); };
        ve();
    }
    function openM42Src(r, k) { openCtdv(r, 'm42', k); }
    // Bấm một đơn vị trong popup «Chi tiết các đơn vị» (06/11/2026, yêu cầu khách hàng): trang chi tiết báo cáo của đơn vị dạng popup, số liệu theo bản chụp
    // lúc cập nhật báo cáo tổng hợp, không có Lịch sử xử lý. Trang dựng trong khung nhúng (cùng trang, chế độ ?nhung=)
    function moChiTietDv(bR, rid, form) {
        var x = anhDonVi(bR)[rid]; if (!x) return;
        var url = (location.pathname.split('/').pop() || 'xu_ly_bao_cao_cong_tac_btnn.html') + '?nhung=' + encodeURIComponent(bR.id) + '&dv=' + encodeURIComponent(rid) + '&tab=' + encodeURIComponent(form || 'm42');
        openOv('bcttOv2', '<div class="bctt-modal" style="width:1440px;max-width:96vw;height:94vh;"><div class="bctt-mh"><div><div class="tt">Chi tiết báo cáo của đơn vị</div><div class="st">' + esc(x.unitName) + ' - năm ' + x.year + ' • Số liệu tính tới ngày ' + esc((bR.src && bR.src.at) || '--') + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<iframe class="bctt-nhung-khung" src="' + esc(url) + '" title="Chi tiết báo cáo của ' + esc(x.unitName) + '"></iframe>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close><i class="fa-solid fa-xmark"></i> Đóng</button></div></div>');
        bindClose('bcttOv2');
    }
    // Khung nhúng: dựng trang chi tiết của báo cáo Sở theo bản chụp (bản sao tạm trong bộ nhớ, không lưu), ẩn mọi phần khác của trang
    function nhungKhoiDong() {
        document.body.classList.add('bctt-nhung');
        var bR = getR(NHUNG), x = bR ? anhDonVi(bR)[NHUNG_DV] : null;
        if (!x) { $('bcttApp').innerHTML = '<div class="card-section">Không có dữ liệu</div>'; return; }
        var r = clone(x), goc = getR(x.id);
        // 06/11/2026 (SRS Tổng hợp quy tắc 7): tệp đã ký hiện có của đơn vị; đơn vị đang trình phê duyệt lại (không có bản đã ký hiện hành)
        // thì lấy bản đã ký gần nhất trong «Các bản đã ký trước». MH06 không hiển thị khối «Các bản đã ký trước»
        var bkGoc = goc && goc.bkKy && goc.bkKy.length ? goc.bkKy[goc.bkKy.length - 1] : null;
        r.id = 'NHUNG-' + x.id; r.history = []; r.kySo = goc ? (goc.kySo || bkGoc) : null; r.bkKy = [];
        DB.reports.push(r);
        view = { name: 'detail', id: r.id, tab: FORMS.some(function (f) { return f.id === NHUNG_TAB; }) ? NHUNG_TAB : 'm42' };
        showDetail(r.id, null, { anLichSu: true, ghi: 'Số liệu tính tới ngày ' + ((bR.src && bR.src.at) || '--') + ', thời điểm đồng bộ số liệu báo cáo tổng hợp gần nhất (chỉ đọc).' });
    }
    // Bấm dòng «Xem chi tiết theo đơn vị» ở mọi biểu mẫu (bắt ở pha capture: không kích hoạt thu gọn nhóm hoặc bấm dòng bên dưới)
    document.addEventListener('click', function (e) {
        var b = e.target && e.target.closest ? e.target.closest('[data-ctdv]') : null; if (!b) return;
        e.preventDefault(); e.stopPropagation();
        var x = b.getAttribute('data-ctdv').split('|'), rr = getR(b.getAttribute('data-rid'));
        if (rr) openCtdv(rr, x[0], x[1]);
    }, true);
    // Ô ngày dd/mm/yyyy (04/11/2026, nhanhl2): bấm vào ô hiện lịch để chọn ngày (flatpickr 4.6.13 do trang nạp), vẫn cho gõ tay;
    // ô còn trống thì mặc định ngày hiện tại. Chữ gõ sai được giữ nguyên để báo «Ngày không hợp lệ (dd/mm/yyyy)» khi lưu (flatpickr tự đổi 31/02 thành 03/03).
    // Lịch chọn ngày chuẩn (04/11/2026, nhanhl2; cùng mã với UI.lich của bộ mẫu kg/ui-mau): ô chọn «Tháng 1» - «Tháng 12» và ô chọn năm,
    // nút «Hôm nay» và «Xóa», kiểu dáng lớp lich-chuan. tuyChon: tùy chọn flatpickr thêm (ví dụ onClose)
    function lichChuan(el, tuyChon) {
        var fp0 = window.flatpickr, vn = (fp0.l10ns && fp0.l10ns.vn) || {}, th = [];
        for (var i = 1; i <= 12; i++) th.push('Tháng ' + i);
        var loc = Object.assign({}, vn, { months: { shorthand: th.map(function (x, i) { return 'Th' + (i + 1); }), longhand: th } });
        function dongBo(a, b, fp) {
            var s = fp && fp._lichNam; if (!s) return;
            var y = fp.currentYear, nay = new Date().getFullYear(), tu = Math.min(y, nay) - 20, den = Math.max(y, nay) + 5;
            if (+s.getAttribute('data-tu') !== tu || +s.getAttribute('data-den') !== den) {
                var h = ''; for (var n = den; n >= tu; n--) h += '<option value="' + n + '">' + n + '</option>';
                s.innerHTML = h; s.setAttribute('data-tu', tu); s.setAttribute('data-den', den);
            }
            s.value = String(y);
        }
        return fp0(el, Object.assign({
            dateFormat: 'd/m/Y', allowInput: true, disableMobile: true, monthSelectorType: 'dropdown', locale: loc,
            onReady: function (a, b, fp) {
                fp.calendarContainer.classList.add('lich-chuan');
                var s = document.createElement('select'); s.className = 'lich-nam'; s.setAttribute('aria-label', 'Năm');
                fp.calendarContainer.querySelector('.flatpickr-current-month').appendChild(s); fp._lichNam = s;
                s.onchange = function () { fp.changeYear(+s.value); dongBo(null, null, fp); };
                var f = document.createElement('div'); f.className = 'lich-chan';
                f.innerHTML = '<button type="button" data-l="xoa">Xóa</button><button type="button" data-l="nay">Hôm nay</button>';
                f.onclick = function (e) { var t = e.target.closest('[data-l]'); if (!t) return; if (t.getAttribute('data-l') === 'nay') fp.setDate(new Date(), true); else fp.clear(); fp.close(); };
                fp.calendarContainer.appendChild(f);
                dongBo(null, null, fp);
            },
            onOpen: dongBo, onMonthChange: dongBo, onYearChange: dongBo
        }, tuyChon || {}));
    }
    // Thanh cuộn ngang nổi (04/11/2026, nhanhl2): bảng dài và rộng có thanh cuộn ngang «dính» ở đáy màn hình (trên thanh nút cố định) khi bảng đang hiện,
    // về sát mép dưới bảng khi cuộn tới cuối bảng; đồng bộ hai chiều với khung bảng, thanh cuộn gốc của khung được ẩn. Shift + lăn chuột cuộn ngang sẵn có
    function cuonNoi(khung, day) {
        if (!khung || khung._cuonNoi) return;
        var t = document.createElement('div'), ruot = document.createElement('div');
        t.className = 'cuon-noi'; t.setAttribute('aria-hidden', 'true'); t.appendChild(ruot);
        khung.parentNode.insertBefore(t, khung.nextSibling); khung.classList.add('co-cuon-noi'); khung._cuonNoi = t;
        var dangDong = false;
        function capNhat() {
            var tran = khung.scrollWidth > khung.clientWidth + 1;
            t.style.display = tran ? '' : 'none'; khung.classList.toggle('co-cuon-noi', tran);
            t.style.width = khung.clientWidth + 'px'; ruot.style.width = khung.scrollWidth + 'px';
            var nut = document.querySelector(day || '.bctt-thanh-nut, .form-page-footer, .page-actions');
            t.style.bottom = (nut && nut.offsetParent ? nut.offsetHeight : 0) + 'px';
            t.scrollLeft = khung.scrollLeft;
        }
        t.addEventListener('scroll', function () { if (dangDong) { dangDong = false; return; } dangDong = true; khung.scrollLeft = t.scrollLeft; });
        khung.addEventListener('scroll', function () { if (dangDong) { dangDong = false; return; } dangDong = true; t.scrollLeft = khung.scrollLeft; });
        if (window.ResizeObserver) { var ro = new ResizeObserver(capNhat); ro.observe(khung); if (khung.firstElementChild) ro.observe(khung.firstElementChild); }
        window.addEventListener('resize', capNhat);
        capNhat();
    }
    function homNay() { var d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); }
    function ganLich(el) {
        if (!el || el.disabled || el.readOnly) return;
        if (!el.value.trim()) el.value = homNay();
        if (!window.flatpickr || el._flatpickr) return;
        var tho = null;
        el.addEventListener('input', function (e) { if (e.isTrusted) tho = el.value; });
        lichChuan(el, { onClose: function () { setTimeout(function () { if (tho != null && tho.trim() && !validDate(tho.trim())) el.value = tho; tho = null; }, 0); } });
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
    function m43TableHtml(m43, mode, tid, rCtdv) {
        var tot = m43Total(m43);
        var html = '<table class="custom-table bctt-m43" id="' + (tid || 'bcttM43') + '">' + m43Head() + '<tbody>';
        html += '<tr class="t"><td>Tổng cộng</td>' + rowCells(tot, 'view', '') + '</tr>';
        GROUPS.forEach(function (g) {
            var r = m43Row(m43[g.k]);
            html += '<tr class="g"><td>' + g.k + '</td><td colspan="26">' + g.name + (rCtdv ? ctdvLine(rCtdv, 'm43', g.k) : '') + '</td></tr>';
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
            else if (mode === 'agg') s += '<td><button class="cell-link" data-cell="' + g + ':' + c + '" title="Xem chi tiết theo đơn vị">' + v + '</button></td>';
            else s += '<td>' + v + '</td>';
        }
        return s;
    }
    function renderM43Tab(r, ed) {
        var p = $('bcttP_m43');
        // Câu nhắc nút Cập nhật dữ liệu (thanh thao tác): báo cáo của Sở Tư pháp ở chế độ nhập liệu
        var auto = !!ed && !isBtpReport(r);
        p.innerHTML = '<div class="toolbar-row" style="justify-content:space-between;"><div class="formula-hint" style="flex:1;min-width:0;">Số liệu tính từ ' + r.fromDate + ' đến ' + r.toDate + '. Ô tổng tự tính: Cột 2 = Cột 3+4+5+6+7+8+9+10; Cột 11 = Cột 12+13+14+15; Cột 17 = Cột 18+19+20+21. Cột 16, 26, 27 đơn vị nghìn đồng.' + (auto ? ' Nút Đồng bộ dữ liệu tự điền số liệu từ dữ liệu vụ việc, trừ Cột 23, 24.' : '') + '</div>'
            + (isBtpReport(r) ? detToggle('m43') : '') + '</div>'
            + '<div class="table-container">' + m43TableHtml(r.m43, isBtpReport(r) && btpDet.m43 ? 'agg' : (ed ? 'edit' : 'view'), null, isBtpReport(r) ? r : null) + '</div>';
        cuonNoi(p.querySelector('.table-container'));
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
    function m04TableHtml(m04, mode, tid, rCtdv) {
        // Theo mẫu gốc: dòng tổng ngay dưới dòng số thứ tự cột, sau đó 06 nhóm I - VI
        var html = '<table class="custom-table bctt-m04" id="' + (tid || 'bcttM04') + '">' + m04Head() + '<tbody>';
        html += '<tr class="t"><td>Tổng cộng</td>' + rowCells04(m04Total(m04), 'view', '') + '</tr>';
        GROUPS.forEach(function (g) {
            html += '<tr class="g"><td>' + g.k + '</td><td colspan="14">' + g.name + (rCtdv ? ctdvLine(rCtdv, 'm04', g.k) : '') + '</td></tr>';
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
            else if (mode === 'agg') s += '<td><button class="cell-link" data-cell="' + g + ':' + c + '" title="Xem chi tiết theo đơn vị">' + v + '</button></td>';
            else s += '<td>' + v + '</td>';
        }
        return s;
    }
    function renderM04Tab(r, ed) {
        var p = $('bcttP_m04');
        p.innerHTML = '<div class="toolbar-row" style="justify-content:space-between;"><div class="formula-hint">Số liệu tính từ ' + r.fromDate + ' đến ' + r.toDate + '. Ô tổng tự tính: Cột 3 = Cột 4 + 6; Cột 12 = Cột 13 + 14. Cột 2, 5, 10, 12, 13, 14, 15 đơn vị nghìn đồng.' + (ed && !isBtpReport(r) ? ' Nút Đồng bộ dữ liệu tự điền số liệu từ hồ sơ hoàn trả.' : '') + '</div>' + (isBtpReport(r) ? detToggle('m04') : '') + '</div>'
            + '<div class="table-container">' + m04TableHtml(r.m04, isBtpReport(r) && btpDet.m04 ? 'agg' : (ed ? 'edit' : 'view'), null, isBtpReport(r) ? r : null) + '</div>';
        cuonNoi(p.querySelector('.table-container'));
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
            return '<li><span class="av">' + esc(initials(h.actor)) + '</span><div><strong>' + esc(h.actor) + '</strong> <span style="color:#64748b;">' + esc(h.at) + '</span><br><span class="' + (/^Từ chối/.test(h.action || '') ? 'rj' : '') + '">' + esc(h.action) + '</span>' + (h.note ? '<br><i style="color:#475569;">' + esc(h.note) + '</i>' : '') + '</div></li>';
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

    // ---------------- Văn bản yêu cầu điều chỉnh của Bộ Tư pháp (04/11/2026, nhanhl2; dùng chung trang Sở và trang Bộ) ----------------
    // x.nd, x.trinh: nội dung và luồng ký dự kiến (màn trình của Bộ). Không có luồng ký (dữ liệu chỉ có returned): coi như Lãnh đạo Phòng ký nháy,
    // Lãnh đạo Cục ký số tại thời điểm trả lại (cùng cách module Bộ quy đổi dữ liệu cũ)
    function vanBanYC(r, x) {
        x = x || {};
        var b = r.bo || {}, t = x.trinh || b.trinh || (r.returned ? { levels: [{ level: 1, leaderId: 'tpbt', result: 'approved', at: r.returned.at, kyNhay: true }, { level: 2, leaderId: 'cuctruong', result: 'approved', at: r.returned.at }] } : null);
        var nd = x.nd != null ? x.nd : ((b.raSoat && b.raSoat.noiDung) || (r.returned && r.returned.reason) || '');
        var l1 = t && t.levels[0], l2 = t && t.levels[1], daKy = !!(l2 && l2.result === 'approved'), knOk = !!(l1 && l1.result === 'approved');
        var ngay = daKy ? /(\d{2})\/(\d{2})\/(\d{4})/.exec(l2.at) : null, tenKy = l2 ? userName(l2.leaderId) : '';
        var chucDanh = l2 && userTitle(l2.leaderId) === 'Cục trưởng' ? 'CỤC TRƯỞNG' : 'KT. CỤC TRƯỞNG<br>PHÓ CỤC TRƯỞNG';
        var guiNgay = String((r.issued && r.issued.at) || r.sentAt || '').slice(0, 10);
        return '<div class="bctt-a4 p yc-vb" style="font-size:14.5px;line-height:1.55;">' + (daKy ? '' : '<div class="bctt-wm">DỰ THẢO</div>')
            + '<div style="display:flex;justify-content:space-between;text-align:center;font-size:13.5px;margin-top:10px;"><div style="width:46%"><b>BỘ TƯ PHÁP</b><br><b>CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM<br>VÀ BỒI THƯỜNG NHÀ NƯỚC</b><br>Số: ……/CĐK-BTNN</div>'
            + '<div style="width:52%"><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><br><i>Hà Nội, ngày ' + (ngay ? ngay[1] : '……') + ' tháng ' + (ngay ? ngay[2] : '……') + ' năm ' + (ngay ? ngay[3] : '……') + '</i></div></div>'
            + '<p style="text-align:center;margin-top:22px;"><b>V/v điều chỉnh báo cáo công tác bồi thường nhà nước năm ' + r.year + '</b></p>'
            + '<p style="text-align:center;">Kính gửi: ' + esc(r.unitName) + '</p>'
            + '<p style="text-indent:36px;margin-top:10px;">Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước đã nhận Báo cáo công tác bồi thường nhà nước năm ' + r.year + ' (' + esc(PERIODS[r.period].label) + ') của ' + esc(r.unitName) + (guiNgay ? ' gửi ngày ' + esc(guiNgay) : '') + '. Qua rà soát, đề nghị Quý Sở điều chỉnh các nội dung sau:</p>'
            + '<p style="text-indent:36px;white-space:pre-wrap;">' + esc(nd) + '</p>'
            + '<p style="text-indent:36px;">Đề nghị Quý Sở cập nhật, trình ký và gửi lại báo cáo trên hệ thống.</p>'
            + '<div style="display:flex;justify-content:space-between;margin-top:24px;font-size:13px;"><div><b><i>Nơi nhận:</i></b><br>- Như trên;<br>- Lưu: VT, PLN-02.</div>'
            + '<div style="text-align:center;width:46%;"><b>' + chucDanh + '</b><div style="margin:10px 0;">' + (daKy ? '<div class="sigbox ok">Đã ký số: ' + esc(tenKy) + '<br>' + esc(l2.at) + '</div>' : '<div class="sigbox">Ô ký số - Cấp 2 - ' + esc(tenKy) + '</div>') + '</div><b>' + esc(tenKy) + '</b></div></div>'
            + (l1 ? '<div class="knwrap"><div class="knbox' + (knOk ? ' ok' : '') + '">Ký nháy - Cấp 1 - ' + esc(userName(l1.leaderId)) + (knOk ? ' (' + esc(l1.at) + ')' : '') + '</div></div>' : '')
            + '</div>';
    }
    // Các văn bản yêu cầu điều chỉnh Bộ Tư pháp đã ký gửi Sở (04/11/2026, nhanhl2): các lần trước (lichSuYC, Sở đã gửi lại) và lần hiện tại đã ký số.
    // Văn bản đang chờ Lãnh đạo Bộ ký (chưa gửi) không hiện cho Sở. Dữ liệu chưa có luồng xử lý của Bộ: 01 văn bản theo thông tin trả lại
    // coDuThao (màn rà soát của Bộ, 04/11/2026): kèm văn bản lần hiện tại đã trình nhưng chưa được Lãnh đạo Cục ký số
    function dsYC(r, coDuThao) {
        return [];   // 06/11/2026: không còn văn bản yêu cầu điều chỉnh của Bộ Tư pháp
        var b = r.bo || {}, ds = (b.lichSuYC || []).map(function (x) { return { lan: x.lan, r: { year: r.year, period: r.period, unitName: r.unitName, unitId: r.unitId, issued: r.issued, sentAt: r.sentAt, bo: { raSoat: x.raSoat, trinh: x.trinh } }, t: x.trinh }; });
        var l2 = b.trinh && b.trinh.levels[1];
        if (b.raSoat && b.raSoat.kq === 'ycdc' && b.trinh && ((l2 && l2.result === 'approved') || coDuThao)) ds.push({ lan: b.lan || 1, r: r, t: b.trinh });
        if (!ds.length && r.returned) ds.push({ lan: 1, r: r, t: null });
        return ds.map(function (x) {
            var k = x.t && x.t.levels[1], daKy = !x.t || !!(k && k.result === 'approved'), at = daKy ? (k && k.at ? k.at : (r.returned ? r.returned.at : '')) : '';
            return { lan: x.lan, r: x.r, t: x.t, at: at, daKy: daKy, tep: 'Van_ban_yeu_cau_dieu_chinh_lan_' + x.lan + '_' + r.year + '_' + r.unitId + (daKy ? '_signed' : '_du_thao') + '.pdf' };
        });
    }
    // 04/11/2026 (nhanhl2): yêu cầu điều chỉnh của Bộ là phê duyệt thường, không có văn bản (không ký nháy, ký số) - bảng nội dung các lần yêu cầu
    function ycBangHtml(r, coDuThao) {
        var ds = dsYC(r, coDuThao); if (!ds.length) return '';
        return '<div class="section-title" style="margin-bottom:10px;"><span>Yêu cầu điều chỉnh của Bộ Tư pháp</span></div><div class="table-container"><table class="custom-table" id="bcttYCTable"><thead><tr><th style="width:56px;">STT</th><th style="width:70px;">Lần</th><th>Nội dung yêu cầu điều chỉnh</th><th>Lãnh đạo duyệt</th><th>Ngày duyệt</th>' + (coDuThao ? '<th>Tình trạng</th>' : '') + '</tr></thead><tbody>'
            + ds.map(function (x, i) {
                var b = x.r.bo || {}, nd = (b.raSoat && b.raSoat.noiDung) || (r.returned && r.returned.reason) || '';
                var l2 = x.t && x.t.levels[x.t.levels.length - 1], ld = l2 && l2.leaderId ? userName(l2.leaderId) : '--';   // chưa có luồng duyệt (dữ liệu cũ): không lấy tên người trả lại
                return '<tr><td>' + (i + 1) + '</td><td>' + x.lan + '</td><td class="text-left" style="white-space:pre-wrap;">' + esc(nd) + '</td><td class="text-left">' + esc(ld) + '</td><td>' + (x.at ? esc(String(x.at).slice(0, 10)) : '--') + '</td>'
                    + (coDuThao ? '<td>' + (x.daKy ? 'Đã gửi Sở Tư pháp' : 'Đang trình duyệt') + '</td>' : '') + '</tr>';
            }).join('') + '</tbody></table></div>';
    }
    function ganYCBang() { /* bảng chỉ đọc, không còn Xem file, Tải file */ }
    // ---------------- Văn bản A4 (xem trước PDF) ----------------
    // sign: { levels, final: true/false } -> vẽ ô ký Lãnh đạo; null: dự thảo chưa trình
    function signBlock(r, sign) {
        // 06/11/2026 (SRS Tổng hợp quy tắc 8): báo cáo tổng hợp của Bộ không trình ký - vị trí Thủ trưởng để trống, không in họ tên, không có ô ký số
        if (isBtpReport(r)) return '<div style="height:64px;"></div>';
        if (!sign) return '<div class="sigbox">Ô ký số Lãnh đạo (sau khi trình)</div>';
        var last = sign.levels[sign.levels.length - 1];
        var ok = last.result === 'approved';
        return '<div class="sigbox' + (ok ? ' ok' : '') + '">' + (ok ? 'Đã ký số: ' : 'Cấp ' + last.level + ' - ') + esc(last.leaderName) + (ok ? '<br>' + esc(last.at) : '') + '</div><div class="b">' + esc(last.leaderName) + '</div>';
    }
    // 03/11/2026: in đủ ô ký nháy của mọi cấp có ký nháy (trước cấp cuối), xếp chồng góc phải dưới trang
    function knBlock(sign) {
        if (!sign || sign.levels.length < 2) return '';
        var ds = sign.levels.slice(0, -1).filter(function (l) { return l.kyNhay; });
        if (!ds.length) return '';
        return '<div class="knwrap">' + ds.map(function (l) {
            var ok = l.result === 'approved';
            return '<div class="knbox' + (ok ? ' ok' : '') + '">Ký nháy - Cấp ' + l.level + ' - ' + esc(l.leaderName) + (ok ? ' (' + esc(l.at) + ')' : '') + '</div>';
        }).join('') + '</div>';
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
        // 04/11/2026 (nhanhl2): các mẫu báo cáo không còn nhãn «DỰ THẢO» ở góc
        var wm = '';
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
    function currentSign(r) { return r.submit && !(r.status === ST.TC && r.reject && !traVe(r)) ? r.submit : null; }
    // Popup xem file PDF: 04 tab biểu mẫu, nút Tải file của tab đang xem
    // 06/11/2026: người dùng đã sửa số liệu 04 biểu mẫu trên trang chi tiết mà chưa Lưu (đánh dấu khi có sự kiện nhập liệu; trang vẽ lại sau Lưu thì xóa dấu).
    // Giá trị Hệ thống tự điền khi mở trang (ví dụ Ngày báo cáo mặc định ngày hiện tại) không tính là sửa
    var MSG_CHUA_LUU = 'Báo cáo có số liệu chưa được lưu. Vui lòng Lưu báo cáo trước khi tải tệp.', suaTam = {};
    function chuaLuuBieuMau(r) { return !!suaTam[r.id]; }
    function openViewer(r, tab, title, data) {
        var t = tab || 'm42', sign = data ? (data.sign || null) : currentSign(r);
        var html = '<div class="bctt-modal" style="width:100vw;height:100vh;max-width:100vw;max-height:100vh;border-radius:0;"><div class="bctt-mh"><div><div class="tt">' + esc(title) + '</div><div class="st">' + esc(data ? data.title : r.unitName + ' - năm ' + r.year) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-split" style="flex:1;min-height:0;">' + viewerHtml(r, t, sign, data, 'bcttPv') + '</div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Đóng</button>'
            // 06/11/2026 (nhanhl2): báo cáo tổng hợp của Bộ - khi đang xem Mẫu 42/BTNN có thêm nút «Tải Word» (Mẫu 42/BTNN kết xuất PDF và Word, mẫu khác chỉ PDF)
            + (isBtpReport(r) && !data ? '<button class="btn btn-outline-primary" id="bcttPvWord"' + (t === 'm42' ? '' : ' style="display:none;"') + '><i class="fa-solid fa-file-word"></i> Tải Word</button>' : '')
            + '<button class="btn btn-primary" id="bcttPvDl"><i class="fa-solid fa-download"></i> Tải file</button></div></div>';
        openOv('bcttOv2', html); bindClose('bcttOv2');
        var cur = t, nutWord = $('bcttPvWord');
        bindViewer(r, sign, data, 'bcttPv', function (x) { cur = x; if (nutWord) nutWord.style.display = x === 'm42' ? '' : 'none'; });
        // 06/11/2026 (nhanhl2 chọn): tệp tải về của báo cáo tổng hợp lấy theo số liệu đã Lưu gần nhất; còn số liệu chưa Lưu thì nhắc Lưu trước, không tải
        var nhacLuu = function () { if (isBtpReport(r) && !data && chuaLuuBieuMau(r)) { toast(MSG_CHUA_LUU, 'error'); return true; } return false; };
        if (nutWord) nutWord.onclick = function () { if (nhacLuu()) return; var f = FORMS.find(function (x) { return x.id === 'm42'; }); toast('Đã tải xuống tệp ' + f.file + '_' + r.year + '_' + r.unitId + '.docx.'); };
        $('bcttPvDl').onclick = function () { if (nhacLuu()) return; var f = FORMS.find(function (x) { return x.id === cur; }); toast('Đã tải xuống tệp ' + f.file + '_' + (isBtpReport(r) ? r.year + '_' + r.unitId : (data && !data.kySo ? 'tong_hop_' : '') + r.year) + '.pdf.'); };
    }

    // ---------------- Popup Gửi phê duyệt (Trình ký) ----------------
    var sub = null;
    // 04/11/2026 (nhanhl2): báo cáo tổng hợp của Bộ - trước khi gửi phê duyệt, cảnh báo nếu còn đơn vị chưa gửi báo cáo về Bộ (kể cả báo cáo Bị trả lại)
    // hoặc còn đơn vị đã gửi nhưng báo cáo chưa được đánh giá Đạt khi rà soát (tab Xử lý báo cáo); người dùng xác nhận mới mở màn trình
    function canhBaoGuiBtp(r, tiepTuc) {
        var ky = DB.reports.filter(function (x) { return !isBtpReport(x) && x.year === r.year && x.period === r.period; });
        var chuaGui = [], chuaDat = [];
        PROVINCES.forEach(function (pv) {
            var ten = stpName(pv), x = ky.find(function (y) { return y.unitName === ten; });
            // Trạng thái báo cáo trong hộp xác nhận (04/11/2026, nhanhl2): `Chưa gửi BTP` (chưa lập, đang lập hoặc đang trình ký tại Sở),
            // `Bị trả lại` (Bộ Tư pháp đã trả lại), `Chờ xử lý` (đã gửi, Bộ chưa đánh giá Đạt); bảng chưa Đạt có thêm cột Trạng thái xử lý tại Bộ
            if (!x || x.status !== ST.BH) chuaGui.push({ ten: ten, tt: x && x.status === ST.TL ? 'Bị trả lại' : 'Chưa gửi BTP' });
            else if (!x.bo || x.bo.tt !== 'Đạt') chuaDat.push({ ten: ten, tt: 'Chờ xử lý', xl: x.bo ? x.bo.tt : 'Chờ phân công' });
        });
        if (!chuaGui.length && !chuaDat.length) return false;
        var bang = function (tieuDe, ds, coXl) {
            return ds.length ? '<div style="font-weight:600;color:#1e3a8a;margin:14px 0 6px;">' + tieuDe + ' (' + ds.length + ' đơn vị)</div><div class="table-container" style="max-height:220px;overflow:auto;"><table class="custom-table"><thead><tr><th style="width:56px;">STT</th><th>Đơn vị báo cáo</th><th>Trạng thái báo cáo</th>' + (coXl ? '<th>Trạng thái xử lý</th>' : '') + '</tr></thead><tbody>'
                + ds.map(function (x, i) { return '<tr><td>' + (i + 1) + '</td><td class="text-left">' + esc(x.ten) + '</td><td>' + esc(x.tt) + '</td>' + (coXl ? '<td>' + esc(x.xl) + '</td>' : '') + '</tr>'; }).join('') + '</tbody></table></div>' : '';
        };
        var y = [];
        if (chuaGui.length) y.push('<strong>' + chuaGui.length + ' đơn vị chưa gửi báo cáo</strong> về Bộ Tư pháp');
        if (chuaDat.length) y.push('<strong>' + chuaDat.length + ' đơn vị có báo cáo chưa được đánh giá Đạt</strong> khi rà soát');
        openOv('bcttOv2', '<div class="bctt-modal" style="width:760px;"><div class="bctt-mh"><div><div class="tt">Xác nhận gửi phê duyệt</div><div class="st">Báo cáo tổng hợp công tác bồi thường nhà nước năm ' + r.year + ' - ' + esc(PERIODS[r.period].label) + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="bctt-alert" style="margin:0;"><b class="t"><i class="fa-solid fa-triangle-exclamation"></i> Số liệu tổng hợp chưa đầy đủ</b>Hiện còn ' + y.join(' và ') + '. Bạn vẫn muốn gửi phê duyệt báo cáo tổng hợp?</div>'
            + bang('Đơn vị chưa gửi báo cáo', chuaGui, false) + bang('Đơn vị chưa được đánh giá Đạt', chuaDat, true) + '</div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-success" id="bcttGuiVan"><i class="fa-solid fa-paper-plane"></i> Vẫn gửi phê duyệt</button></div></div>');
        bindClose('bcttOv2');
        $('bcttGuiVan').onclick = function () { closeOv('bcttOv2'); tiepTuc(); };
        return true;
    }
    function openSubmit(id, daXacNhan) {
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
        var html = (r.status === ST.TC && r.reject ? '<div class="bctt-alert" style="margin:0 0 14px;"><b class="t">BÁO CÁO BỊ LÃNH ĐẠO TRẢ LẠI</b>Lý do bị trả lại: <strong>' + esc(r.reject.reason) + '</strong><br>Người từ chối: ' + esc(r.reject.byName) + ' • Thời điểm: ' + esc(r.reject.at) + '</div>' : '')
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
                + '<div class="formula-hint" style="margin-top:6px;">' + (i === sub.levels.length - 1 ? 'Ký số tại ô «Thủ trưởng đơn vị» của từng biểu mẫu.' : (l.kyNhay ? 'Ô ký nháy đặt cuối trang của từng biểu mẫu.' : 'Ký duyệt, không đặt ô ký trên văn bản.')) + '</div></div>';
        }).join('');
        b2.innerHTML = '<div class="bctt-split" style="flex:1;min-height:60vh;">' + viewerHtml(r, 'm42', subSign(), null, 'bcttSv')
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
            if (trinhLaiCho && trinhLaiCho.id === r.id) { trinhLaiCho = null; luuBanKyCu(r); }   // 06/11/2026: trình lại báo cáo đã gửi
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
        var s = r.submit, waiting = choKy(r) ? s.levels.slice(s.current).map(function (l, k) { return '<li><span class="av">' + esc(initials(l.leaderName)) + '</span><div><strong>' + esc(l.leaderName) + '</strong><br><span class="wt">' + (k === 0 ? 'Đang chờ ký duyệt' : 'Chưa tới') + ' - Cấp ' + l.level + ' - ' + esc(l.unitName) + '</span></div></li>'; }).join('') : '';
        return '<ul class="bctt-tl">' + waiting + items.slice().reverse().map(function (h) { return '<li><span class="av">' + esc(initials(h.actor)) + '</span><div><strong>' + esc(h.actor) + '</strong> <span style="color:#64748b;">' + esc(h.at) + '</span><br><span class="' + (/^Từ chối/.test(h.action || '') ? 'rj' : '') + '">' + esc(h.action) + '</span>' + (h.note ? '<br><i>' + esc(h.note) + '</i>' : '') + '</div></li>'; }).join('') + '</ul>';
    }
    function openSign(id, mode) {
        var r = getR(id); if (!canApprove(r)) { toast('Báo cáo không còn chờ bạn ký duyệt.', 'error'); return; }
        var s = r.submit, lv = s.levels[s.current];
        var tl = typeof window.tlktViewHtml === 'function' ? window.tlktViewHtml(s.tlkt || [], { boxClass: 'bctt-card', titleClass: 'h' }) : '';        var html = '<div class="bctt-mh"><div><div class="tt">' + (mode === 'approve' ? 'Ký duyệt' : 'Từ chối phê duyệt') + ' báo cáo công tác bồi thường nhà nước năm ' + r.year + ' - ' + esc(r.unitName) + '</div><div class="st">Ký duyệt / Từ chối áp dụng đồng thời cho cả 04 biểu mẫu: ' + FORM_CODES + '</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-split">' + viewerHtml(r, 'm42', s, null, 'bcttKv')
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
                // 04/11/2026 (nhanhl2): Lãnh đạo cấp 2 trở lên từ chối - báo cáo chuyển `Yêu cầu điều chỉnh`, trả về Lãnh đạo cấp liền dưới (traVe) để ký duyệt lại
                // hoặc từ chối; kết quả ký từ cấp dưới trở lên được xóa để ký lại. Lãnh đạo cấp 1 từ chối thì trả cán bộ lập báo cáo (như trước)
                if (s.current > 0) {
                    var duoi = s.levels[s.current - 1], at = nowText();
                    r.status = ST.TC; r.reject = { reason: note, byName: lv.leaderName, level: lv.level, at: at, traVe: true };
                    s.levels.slice(s.current - 1).forEach(function (l) { l.result = null; l.at = ''; l.note = ''; });
                    s.current--;
                    hist(r, lv.leaderName, 'Từ chối và trả về ' + duoi.leaderName + ' (Cấp ' + duoi.level + ') xem xét lại', note);
                    save(); full.classList.remove('on'); full.innerHTML = ''; toast('Đã từ chối báo cáo và trả về ' + duoi.leaderName + ' xem xét lại.'); showDetail(r.id); return;
                }
                lv.result = 'rejected'; lv.at = nowText(); lv.note = note;
                r.status = ST.TC; r.reject = { reason: note, byName: lv.leaderName, level: lv.level, at: lv.at };
                hist(r, lv.leaderName, 'Từ chối', note);
                save(); full.classList.remove('on'); full.innerHTML = ''; toast('Đã từ chối báo cáo. Cán bộ lập báo cáo nhận lại để điều chỉnh.'); showDetail(r.id); return;
            }
            lv.result = 'approved'; lv.at = nowText(); lv.note = note;
            // 06/11/2026 (nhanhl2): báo cáo bị Lãnh đạo cấp trên trả về (traVe) mà Lãnh đạo cấp dưới Ký duyệt lại và chuyển lên cấp trên
            // thì báo cáo trở lại `Chờ duyệt` (trước giữ `Bị trả lại` tới khi Lãnh đạo cấp cuối ký). Lý do từ chối vẫn còn trong lịch sử xử lý
            if (traVe(r)) { r.status = ST.CHO; r.reject = null; }
            if (s.current < s.levels.length - 1) {
                s.current++;
                hist(r, lv.leaderName, 'Ký duyệt và chuyển xử lý đến ' + s.levels[s.current].leaderName, note);
                toast('Đã ký duyệt cả 04 biểu mẫu và chuyển ' + s.levels[s.current].leaderName + ' ký duyệt.');
            } else {
                r.status = ST.BH; r.issued = { at: lv.at, signer: lv.leaderName }; r.reject = null;
                if (!isBtpReport(r)) { r.kySo = chupKySo(r); r.capNhatSauGui = null; }   // 06/11/2026: bản đã ký của lần ban hành này
                hist(r, lv.leaderName, 'Ký duyệt', note);
                hist(r, 'Hệ thống', isBtpReport(r) ? 'Ban hành' : (r.returned ? 'Ban hành và gửi lại Bộ Tư pháp' : 'Ban hành và gửi Bộ Tư pháp'));
                if (!isBtpReport(r) && r.returned) { r.returned = null; markBtpDirty(r, 'gửi lại'); }
                // 06/11/2026 (nhanhl2, QDDA_020): Lãnh đạo UBND tỉnh ký số Cấp 3 thì báo cáo gửi Bộ Tư pháp; thông báo Cán bộ lập báo cáo và Lãnh đạo Sở (bỏ thông báo Lãnh đạo UBND tỉnh)
                if (!isBtpReport(r)) hist(r, 'Hệ thống', 'Thông báo Cán bộ lập báo cáo và Lãnh đạo Sở', 'Báo cáo đã gửi Bộ Tư pháp. Người nhận: ' + r.preparer.name + (s.levels[1] ? ', ' + s.levels[1].leaderName : '') + '.');
                toast(isBtpReport(r) ? 'Đã ký số ban hành báo cáo tổng hợp của Bộ Tư pháp (04 biểu mẫu).' : 'Đã ký số ban hành cả 04 biểu mẫu và gửi Bộ Tư pháp; đã thông báo Cán bộ lập báo cáo và Lãnh đạo Sở.');
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
            : (suaBo() ? '<button class="btn btn-success" id="bcttBtpCreate"><i class="fa-solid fa-plus"></i> Lập báo cáo tổng hợp của Bộ</button>' : '');
        return '<div class="section-title" style="margin:16px 0 10px;"><span>Báo cáo tổng hợp của Bộ Tư pháp</span></div><div class="bctt-btpcard"><div><div>' + st + '</div>'
            + '<div class="formula-hint" style="margin-top:6px;">Cùng form 04 biểu mẫu như báo cáo của các đơn vị; số liệu tự tổng hợp từ báo cáo đã gửi của các đơn vị (hiện có ' + n + ' đơn vị đã gửi); Bộ Tư pháp chỉnh sửa và trình Lãnh đạo ký duyệt.'
            + (bR && bR.src ? ' Lần tổng hợp gần nhất: ' + bR.src.n + ' đơn vị, lúc ' + esc(bR.src.at) + '.' : '') + '</div></div><div>' + btn + '</div></div>';
    }
    function createBtpReport(year, period) {
        // 06/11/2026 (SRS MH01 chức năng 3 TH1): cùng câu thông báo với Popup Tạo báo cáo tổng hợp; tải lại danh sách
        if (btpReportOf(year, period)) { toast('Đã có báo cáo tổng hợp của kỳ ' + PERIODS[period].label + ' năm ' + year + '.', 'error'); showList(); return; }
        if (!issuedOf(year, period).length) { toast('Chưa có đơn vị nào gửi báo cáo của kỳ này.', 'error'); return; }
        var r = newBtpReport(year, period, ST.DANG, DB.reports);
        var a = btpAuto(DB.reports, year, period); a.src.snap = chupDonVi(issuedOf(year, period));
        applyAuto(r, a); // bỏ phần minh họa ô đã sửa của dữ liệu mẫu
        r.history = [{ at: nowText(), actor: me().name, action: 'Lập báo cáo tổng hợp', note: 'Tổng hợp từ ' + r.src.n + ' báo cáo đã gửi (' + r.src.n + '/' + PROVINCES.length + ' đơn vị).' }];
        DB.reports.push(r); save(); toast('Đã lập báo cáo tổng hợp từ ' + r.src.n + ' đơn vị đã gửi.');
        showDetail(r.id, showList);
    }
    // Thao tác báo cáo của Bộ tại danh sách kỳ: thao tác chưa đủ điều kiện hiển thị mờ (disabled), kèm chú thích lý do
    function btpListActs(k, bR) {
        function btn(act, cls, icon, title, on, why) {
            return ' <button class="icon-btn ' + cls + (on ? '' : ' is-disabled') + '" data-admin-icon-normalized="1" data-bact="' + act + '" data-k="' + k + '" title="' + esc(on ? title : title + ' - ' + why) + '"' + (on ? '' : ' disabled') + '><i class="' + icon + '"></i></button>';
        }
        // 04/11/2026 (nhanhl2): không trình ký - Chuyên viên lập hoặc cập nhật; Lãnh đạo xem chi tiết và kết xuất
        if (suaBo()) return bR ? btn('edit', 'edit', 'fa-solid fa-pen-to-square', 'Cập nhật báo cáo của Bộ', true, '') : btn('create', 'add', 'fa-solid fa-plus', 'Lập báo cáo tổng hợp của Bộ', true, '');
        return bR ? btn('view', 'view', 'fa-solid fa-eye', 'Xem chi tiết', true, '') : '';
    }
    // Popup Tạo báo cáo tổng hợp của Bộ (03/11/2026, như Popup Tạo báo cáo của Sở): kỳ đã có báo cáo của Bộ hoặc chưa có Sở gửi thì thông báo, không tạo
    function openCreateBtp() {
        var y0 = new Date().getFullYear();
        var html = '<div class="bctt-modal" style="width:620px;"><div class="bctt-mh"><div><div class="tt">Tạo báo cáo tổng hợp công tác bồi thường nhà nước</div><div class="st">Đơn vị báo cáo: Bộ Tư pháp</div></div><button class="bctt-x" data-close>&times;</button></div>'
            + '<div class="bctt-mb"><div class="form-group" style="margin-bottom:12px;"><span class="form-label">Năm báo cáo<span style="color:red;">*</span></span><select class="form-control" id="bcttTYear"><option value="">-- Chọn năm báo cáo --</option>' + [y0 + 1, y0, y0 - 1, y0 - 2].map(function (v) { return '<option>' + v + '</option>'; }).join('') + '</select><div class="bctt-err" id="bcttTYearErr">Đây là trường bắt buộc</div></div>'
            + '<div class="form-group"><span class="form-label">Loại kỳ báo cáo<span style="color:red;">*</span></span><select class="form-control" id="bcttTPeriod"><option value="">-- Chọn loại kỳ báo cáo --</option>' + Object.keys(PERIODS).map(function (k) { return '<option value="' + k + '">' + PERIODS[k].label + '</option>'; }).join('') + '</select><div class="bctt-err" id="bcttTPeriodErr">Đây là trường bắt buộc</div></div>'
            // 06/11/2026 (SRS MH02): Mẫu 42/BTNN do Bộ tự nhập, không tổng hợp
            + '<div class="form-hint" style="margin-top:10px;">Số liệu Mẫu 41/BTNN, Mẫu 43/BTNN và Mẫu số 04 (TT 08/2019) được tổng hợp từ báo cáo Đã gửi BTP của các đơn vị cùng kỳ. Mẫu 42/BTNN do Bộ Tư pháp tự nhập.</div></div>'
            + '<div class="bctt-mf"><button class="btn btn-secondary" data-close>Hủy bỏ</button><button class="btn btn-success" id="bcttTOk"><i class="fa-solid fa-plus"></i> Tạo báo cáo</button></div></div>';
        openOv('bcttOv1', html); bindClose('bcttOv1');
        $('bcttTOk').onclick = function () {
            var y = $('bcttTYear').value, p = $('bcttTPeriod').value, first = null;
            [['bcttTYear', y], ['bcttTPeriod', p]].forEach(function (x) { var bad = !x[1]; $(x[0]).classList.toggle('bctt-invalid', bad); $(x[0] + 'Err').classList.toggle('on', bad); if (bad && !first) first = $(x[0]); });
            if (first) { first.focus(); return; }
            if (btpReportOf(+y, p)) { toast('Đã có báo cáo tổng hợp của kỳ ' + PERIODS[p].label + ' năm ' + y + '.', 'error'); return; }
            if (!issuedOf(+y, p).length) { toast('Chưa có đơn vị nào gửi báo cáo của kỳ này.', 'error'); return; }
            closeOv('bcttOv1'); createBtpReport(+y, p);
        };
    }
    // MH07 - Danh sách kỳ báo cáo (vai trò Bộ Tư pháp): kèm trạng thái và thao tác báo cáo tổng hợp của Bộ
    // Kỳ báo cáo trên tab Tổng hợp báo cáo: chỉ kỳ có báo cáo Sở Tư pháp đã gửi Bộ hoặc đã có báo cáo của Bộ; năm giảm dần, kỳ thực tế trước kỳ chính thức
    function btpKys() {
        var kys = [];
        DB.reports.forEach(function (r) { var k = r.year + '|' + r.period; if ((isBtpReport(r) || r.status === ST.BH) && kys.indexOf(k) < 0) kys.push(k); });
        return kys.sort(function (a, b) { var x = a.split('|'), y = b.split('|'); return (+y[0] - +x[0]) || (x[1] === 'thuc_te' ? -1 : 1); });
    }
    // 04/11/2026 (nhanhl2): báo cáo tổng hợp của Bộ không trình ký - không chia Chờ xử lý, Đã xử lý; việc chờ của Chuyên viên là kỳ chưa lập báo cáo tổng hợp
    function btpChoXuLy(k) {
        var p = k.split('|');
        return suaBo() && !btpReportOf(+p[0], p[1]);
    }
    // Lãnh đạo xem các kỳ đã lập báo cáo tổng hợp; Chuyên viên xem mọi kỳ
    function btpPhamVi(k) {
        if (suaBo()) return true;
        var p = k.split('|');
        return !!btpReportOf(+p[0], p[1]);
    }
    function btpDemCho() { return btpKys().filter(btpChoXuLy).length; }
    // 06/11/2026 (nhanhl2): MH01 Tổng hợp báo cáo có khối «Bộ lọc tìm kiếm» (Năm báo cáo, Loại kỳ báo cáo) giữa thanh tab và lưới, cùng kiểu khối lọc của MH07;
    // badge số kỳ chưa lập không đổi theo bộ lọc
    var btpFilt = { year: 'all', period: 'all' };
    function renderBtpList() {
        var tatCa = btpKys().filter(btpPhamVi), nCho = tatCa.filter(btpChoXuLy).length;
        var namDs = []; tatCa.forEach(function (k) { var y = k.split('|')[0]; if (namDs.indexOf(y) < 0) namDs.push(y); }); namDs.sort(function (a, b) { return +b - +a; });
        if (btpFilt.year !== 'all' && namDs.indexOf(btpFilt.year) < 0) btpFilt.year = 'all';
        var kys = tatCa.filter(function (k) { var q = k.split('|'); return (btpFilt.year === 'all' || q[0] === btpFilt.year) && (btpFilt.period === 'all' || q[1] === btpFilt.period); });
        var locHtml = '<div class="card-section" data-bpbd-filter><div class="section-title" data-bpbd-filter-title><span><i class="fa-solid fa-filter"></i> Bộ lọc tìm kiếm</span></div><div class="filter-grid">'
            + '<div class="form-group"><label class="form-label" for="bcttBFYear">Năm báo cáo</label><select class="form-control" id="bcttBFYear" data-kieu="Enum(Integer(4))"><option value="all">Tất cả</option>' + namDs.map(function (y) { return '<option value="' + y + '"' + (btpFilt.year === y ? ' selected' : '') + '>' + y + '</option>'; }).join('') + '</select></div>'
            + '<div class="form-group"><label class="form-label" for="bcttBFPeriod">Loại kỳ báo cáo</label><select class="form-control" id="bcttBFPeriod" data-kieu="Enum(String(100))"><option value="all">Tất cả</option>' + Object.keys(PERIODS).map(function (k) { return '<option value="' + k + '"' + (btpFilt.period === k ? ' selected' : '') + '>' + PERIODS[k].label + '</option>'; }).join('') + '</select></div>'
            + '</div><div class="toolbar-row uxu-filter-actions"><button type="button" class="btn btn-secondary" id="bcttBFReset"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button><button type="button" class="btn btn-primary" id="bcttBFGo"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button></div></div>';
        var tongKy = kys.length, soTrang = Math.max(1, Math.ceil(tongKy / pg.size)); if (pg.page > soTrang) pg.page = soTrang;
        var offKy = (pg.page - 1) * pg.size; kys = kys.slice(offKy, offKy + pg.size);
        // 03/11/2026: nút Tạo báo cáo (Chuyên viên Bộ); cột Đã gửi, Chưa gửi, Gửi chậm (chỉ ghi số đơn vị), Trạng thái xử lý (04/11/2026: bỏ cột Trạng thái tiếp nhận); cột Thao tác rộng cố định, một dòng
        var html = locHtml + '<div class="card-section">' + (suaBo() ? '<div style="display:flex; justify-content:flex-end; margin-bottom:12px;"><button class="btn btn-success btn-sm uxu-btn-tb" id="bcttBtpTao"><i class="fa-solid fa-plus"></i> Tạo báo cáo</button></div>' : '')
            + '<div class="table-container"><table class="custom-table" id="bcttBtpList"><thead><tr><th>STT</th><th>Năm báo cáo</th><th>Loại kỳ báo cáo</th><th>Đã gửi</th><th>Chưa gửi</th><th>Gửi chậm</th><th>Người lập</th><th>Ngày cập nhật gần nhất</th><th>Tình trạng</th><th class="bctt-cot-tt cot-thao-tac">Thao tác</th></tr></thead><tbody>'
            + (kys.length ? '' : '<tr><td colspan="10">Không có dữ liệu</td></tr>')
            + kys.map(function (k, i) {
                var p = k.split('|'), iss = issuedOf(+p[0], p[1]), n = iss.length, bR = btpReportOf(+p[0], p[1]);
                // Gửi chậm: báo cáo Đã gửi BTP có ngày gửi từ hạn gửi của kỳ trở đi (cùng cách tính với tab Tình hình gửi báo cáo)
                var han = hanGui(+p[0], p[1]).han, cham = iss.filter(function (r) { var m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(String((r.issued && r.issued.at) || r.sentAt || '')); return m && new Date(+m[3], +m[2] - 1, +m[1]) >= han; }).length;
                // 04/11/2026: bấm dòng mở thẳng báo cáo tổng hợp; kỳ chưa lập báo cáo thì dòng không bấm được
                return '<tr' + (bR ? ' class="list-row" data-ky="' + k + '" title="Bấm để xem báo cáo tổng hợp"' : ' title="Kỳ này chưa lập báo cáo tổng hợp"') + '><td>' + (offKy + i + 1) + '</td><td>' + p[0] + '</td><td class="text-left">' + PERIODS[p[1]].label + '</td><td>' + n + '</td><td>' + (PROVINCES.length - n) + '</td><td>' + cham + '</td>'
                    // 03/11/2026: Người lập, Ngày cập nhật gần nhất (thời điểm của sự kiện cuối trong Lịch sử xử lý) của báo cáo tổng hợp; chưa lập: --
                    + '<td class="text-left">' + (bR ? esc(bR.preparer.name) : '--') + '</td><td>' + (bR && bR.history.length ? esc(bR.history[bR.history.length - 1].at) : '--') + '</td>'
                    + '<td>' + (bR ? '<span class="badge badge-success">Đã lập</span>' : '<span class="badge badge-muted">Chưa lập</span>') + '</td><td class="bctt-cot-tt cot-thao-tac">' + btpListActs(k, bR) + '</td></tr>';
            }).join('')
            + '</tbody></table></div>' + pagerHtml(tongKy) + '</div>';
        $('bcttApp').innerHTML = html;
        if ($('bcttBtpTao')) $('bcttBtpTao').onclick = openCreateBtp;
        $('bcttBFGo').onclick = function () { btpFilt = { year: $('bcttBFYear').value, period: $('bcttBFPeriod').value }; pg.page = 1; renderBtpList(); };
        $('bcttBFReset').onclick = function () { btpFilt = { year: 'all', period: 'all' }; pg.page = 1; renderBtpList(); };
        if (window.BpbdFilterToggle && window.BpbdFilterToggle.autoAttach) { try { window.BpbdFilterToggle.autoAttach(); } catch (e) { /* bỏ qua */ } }
        if ($('bcttBtpTabs')) $('bcttBtpTabs').onclick = function (e) { var t = e.target.closest('[data-ltab]'); if (t && t.getAttribute('data-ltab') !== listTab) { listTab = t.getAttribute('data-ltab'); pg.page = 1; renderBtpList(); } };
        if ($('bcttPager')) {
            $('bcttPageSize').onchange = function () { pg.size = +this.value || 10; pg.page = 1; renderBtpList(); };
            $('bcttPager').querySelector('.pagination-pages').onclick = function (e) { var t = e.target.closest('[data-pg]'); if (!t || t.classList.contains('disabled') || t.classList.contains('active')) return; pg.page = +t.getAttribute('data-pg'); renderBtpList(); };
        }
        onClk($('bcttBtpList'), function (e) {
            var b = e.target.closest('[data-bact]'), t = e.target.closest('[data-ky]');
            if (b && b.disabled) return;
            if (b) {
                e.stopPropagation(); var p = b.getAttribute('data-k').split('|'), bR = btpReportOf(+p[0], p[1]), a = b.getAttribute('data-bact'), back = showList;
                if (a === 'create') createBtpReport(+p[0], p[1]); else if (a === 'edit' || a === 'view') showDetail(bR.id, back); else if (a === 'submit') { showDetail(bR.id, back); openSubmit(bR.id); }
                else if (a === 'approve' || a === 'reject') openSign(bR.id, a);
                return;
            }
            if (t) { var q = t.getAttribute('data-ky').split('|'), bq = btpReportOf(+q[0], q[1]); if (bq) showDetail(bq.id, showList); }
        });
        refreshShared();
    }
    // Dữ liệu dùng cho tổng hợp: bản điều chỉnh của Bộ Tư pháp (nếu có), ngược lại số liệu đã ban hành
    function btpData(r) { if (!r.btp) r.btp = { m41: clone(r.m41), m42: clone(r.m42), m43: clone(r.m43) }; if (!r.btp.m04) r.btp.m04 = clone(r.m04 || emptyM04()); return r.btp; }
    function aggregate(list) {
        var m41 = emptyM41(), m43 = emptyM43(), m04 = emptyM04(), m42 =emptyM42(list[0] ? list[0].year : '');
        list.forEach(function (r) {
            var d = { m41: r.m41, m42: r.m42, m43: r.m43, m04: r.m04 || emptyM04() };   // 06/11/2026: số liệu Sở đang lưu
            GROUPS.forEach(function (g) {
                (d.m41[g.k] || []).forEach(function (row, idx) { var x = clone(row); x._unit = r.unitName; x._rid = r.id; x._idx = idx; x._adj = !!(r.adjLog || []).find(function (a) { return a.form === 'm41' && a.key === g.k + ':' + idx; }); m41[g.k].push(x); });
                M43_INPUT_COLS.forEach(function (c) { m43[g.k][c] += num(d.m43[g.k][c]); });
                M04_INPUT_COLS.forEach(function (c) { m04[g.k][c] += num(d.m04[g.k] && d.m04[g.k][c]); });
            });
            M42_ITEMS.forEach(function (it) { var t = String(d.m42.items[it.k] || '').trim(); if (t) m42.items[it.k] += (m42.items[it.k] ? '\n' : '') + '- ' + r.unitName + ': ' + t; });
        });
        return { m41: m41, m42: m42, m43: m43, m04: m04 };
    }
    var btpState = { year: 2026, period: 'thuc_te', tab: 'm42', unit41: 'all', scope43: 'all', scope04: 'all', kw: '', sent: 'all' };
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
            + '<div><label>Đã gửi</label><strong>' + issued.length + ' đơn vị</strong></div><div><label>Chưa gửi</label><strong>' + (PROVINCES.length - issued.length) + ' đơn vị</strong></div></div>'
            + btpCardHtml(bR, issued.length)
            // Tình hình gửi báo cáo của 34 Sở Tư pháp: Đã gửi (= báo cáo Đã ban hành) / Chưa gửi (kèm tình trạng tại Sở)
            + '<div class="bctt-files"><div class="section-title" style="margin-bottom:10px;"><span>Tình hình gửi báo cáo của ' + PROVINCES.length + ' đơn vị</span></div>'
            + '<div class="filter-grid" style="grid-template-columns:repeat(3,minmax(0,1fr));align-items:end;"><div class="form-group"><span class="form-label">Đơn vị báo cáo</span><input class="form-control" id="bcttBtpKw" placeholder="Nhập tên đơn vị để tìm kiếm" value="' + esc(btpState.kw) + '"></div>'
            + '<div class="form-group"><span class="form-label">Tình hình gửi</span><select class="form-control" id="bcttBtpSt"><option value="all">Tất cả (' + PROVINCES.length + ')</option><option value="sent"' + (btpState.sent === 'sent' ? ' selected' : '') + '>Đã gửi (' + issued.length + ')</option><option value="unsent"' + (btpState.sent === 'unsent' ? ' selected' : '') + '>Chưa gửi (' + (PROVINCES.length - issued.length) + ')</option></select></div></div>'
            + '<div class="table-container" style="max-height:420px;overflow:auto;"><table class="custom-table" id="bcttBtpFiles"><thead><tr><th>STT</th><th>Đơn vị báo cáo</th><th>Tình hình gửi</th><th>Tình trạng tại đơn vị</th><th>Ngày gửi</th><th>Người lập</th><th>Người ký ban hành</th><th>Tệp báo cáo (Xem file | Tải file)</th></tr></thead><tbody>'
            + units.filter(function (u) { var ok = u.r && u.r.status === ST.BH; return (!btpState.kw || u.name.toLowerCase().indexOf(btpState.kw.toLowerCase()) >= 0) && (btpState.sent === 'all' || (btpState.sent === 'sent') === !!ok); }).map(function (u, i) {
                var r = u.r, ok = r && r.status === ST.BH;
                return '<tr' + (ok ? ' class="list-row" data-vrow="' + r.id + '" title="Click để xem chi tiết báo cáo (04 biểu mẫu)"' : '') + '><td>' + (i + 1) + '</td><td class="text-left">' + esc(u.name) + '</td><td>' + (ok ? '<span class="badge badge-success">Đã gửi</span>' : '<span class="badge badge-muted">Chưa gửi</span>') + '</td>'
                    + '<td class="text-left">' + (ok ? 'Đã gửi BTP' : (r ? r.status : 'Chưa tạo báo cáo')) + '</td><td>' + (ok ? r.issued.at : '--') + '</td><td class="text-left">' + (r ? esc(r.preparer.name) : '--') + '</td><td class="text-left">' + (ok ? esc(r.issued.signer) : '--') + '</td><td class="text-left">'
                    + (ok ? FORMS.map(function (f) { return '<span class="bctt-chip">' + f.code + ' <button class="bctt-link" data-rid="' + r.id + '" data-fview="' + f.id + '">Xem file</button>|<button class="bctt-link" data-fdl="' + f.file + '_' + year + '_' + maTep(r) + '_signed.pdf">Tải file</button></span>'; }).join('') : '--')
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
    function setRole(r) { role = ROLE_ORDER.indexOf(r) >= 0 ? r : ROLE_DEFAULT; listTab = 'pending'; pg.page = 1; try { localStorage.setItem(KEY_ROLE, role); } catch (e) { /* bỏ qua */ } showList(); if (typeof window.BCTT_KHI_DOI_VAI_TRO === 'function') window.BCTT_KHI_DOI_VAI_TRO(role); }
    function refreshShared() {
        reportBadge();
        if (typeof window.btnnStickyActRefresh === 'function') { try { window.btnnStickyActRefresh(); } catch (e) { /* bỏ qua */ } }
        if (typeof window.uxuDongBoRefresh === 'function') { try { window.uxuDongBoRefresh(); } catch (e) { /* bỏ qua */ } }
        if (typeof window.BCTT_SAU_VE === 'function') { try { window.BCTT_SAU_VE(); } catch (e) { /* bỏ qua */ } }
    }

    // API cho kiểm thử / trang khác
    window.BCTT = { ST: ST, sigImg: sigImg, lichSuKhung: lichSuKhung, ganGapLichSu: ganGapLichSu, vanBanYC: vanBanYC, tepBaoCaoHtml: tepBaoCaoHtml, ganTepBaoCao: function (r) { bindFileTable('bcttFileTable', r); }, ycBangHtml: ycBangHtml, ganYCBang: ganYCBang, btpDemCho: function () { return btpDemCho(); }, FORMS: FORMS, load: load, db: function () { return DB; }, setRole: function (r) { if ($('bcttRole')) $('bcttRole').value = r; setRole(r); }, showList: showList, showDetail: showDetail, openSubmit: openSubmit, openSign: openSign, showBtp: showBtp, m43Row: m43Row, m43Total: m43Total, m43Cases: m43Cases, reset: function () { DB = seed(); save(); showList(); },
        // 03/11/2026: dùng chung cho bctt_bo_xu_ly.js (trang Xử lý báo cáo của Bộ Tư pháp)
        MODE: MODE, ROLES: ROLES, PERIODS: PERIODS, PROVINCES: PROVINCES, BTP_UNIT: BTP_UNIT, role: function () { return role; }, me: me,
        save: save, getR: getR, stName: stName, isBtpReport: isBtpReport, stpName: stpName, dvName: dvName, soName: soName, maTep: maTep, esc: esc, nowText: nowText, seedAt: seedAt, hanGui: hanGui,
        hist: hist, markBtpDirty: markBtpDirty, userName: userName, userTitle: userTitle, viewerHtml: viewerHtml, bindViewer: bindViewer, docHtml: docHtml,
        currentSign: currentSign, openViewer: openViewer, refresh: function () { if (view.name === 'list') showList(); },
        // 06/11/2026: trang Tổng hợp mở trang chi tiết báo cáo của Sở toàn trang từ tab Tình hình gửi báo cáo
        NHUNG: NHUNG, showDetail: function (id, back, opt) { showDetail(id, back, opt); }, showList: function () { showList(); } };

    function init() {
        try { role = localStorage.getItem(KEY_ROLE) || ROLE_DEFAULT; } catch (e) { role = ROLE_DEFAULT; }
        if (ROLE_ORDER.indexOf(role) < 0) role = ROLE_DEFAULT;
        injectCss(); load(); mountShell();
        if (NHUNG) { nhungKhoiDong(); return; }   // 06/11/2026: khung nhúng trang chi tiết báo cáo của đơn vị
        showList();
        // Mở thẳng một báo cáo (bấm thông báo trên chuông của trang chủ): ?mo=<mã báo cáo>
        try { var mo = new URLSearchParams(location.search).get('mo'); if (mo && getR(mo)) showDetail(mo); } catch (e) { /* bỏ qua */ }
        // Định dạng ô tiền khi gõ (pha capture: chạy trước handler tính tổng của từng bảng)
        document.addEventListener('input', function (e) { if (e.target.classList && e.target.classList.contains('bctt-money')) fmtMoneyInput(e.target); }, true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
