/* =========================================================================
   LỌC PHIẾU TRÙNG LẶP - MODULE DÙNG CHUNG (window.TRUNGLAP)
   Theo SRS_Loc_phieu_trung_lap.md, [BR-DK-037] (xác định trùng lặp), [BR-DK-038] (đánh dấu đã rà soát)
   Dùng cho: loc_phieu_trung_lap.html (MH01), loc_phieu_trung_lap_chi_tiet.html (MH02), Popup Đánh dấu đã rà soát (MH03),
   nhãn/khối "Hồ sơ trùng lặp" tại Kiểm tra và xử lý hồ sơ, Ký duyệt hồ sơ, Xem chi tiết Phiếu đăng ký, Nhập liệu hồ sơ giấy.
   ========================================================================= */
(function (global) {
    'use strict';

    const REVIEW_KEY = 'tl_review_v2';
    const KET_QUA = ['Hợp lệ - bảo đảm nhiều nghĩa vụ', 'Nộp trùng - đã xử lý', 'Khác'];
    const SCOPE_STATUS = ['Chờ duyệt', 'Duyệt chờ ký', 'Chờ ký', 'Hoàn thành'];
    const UNIT = 'Trung tâm Đăng ký giao dịch, tài sản tại Thành phố Hà Nội';
    const LOAI_TS = {
        vehicle: 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        ship: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt',
        kho: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ'
    };
    const MSG = {
        CFM_DK_010: 'Hệ thống phát hiện hồ sơ có nội dung trùng lặp với Phiếu đăng ký/hồ sơ đăng ký khác đã tồn tại trên hệ thống. Bạn có chắc chắn muốn tiếp tục phê duyệt hồ sơ này?',
        CFM_DK_017: (n, list) => `Hệ thống phát hiện tài sản bảo đảm của hồ sơ đang nhập trùng với ${n} Phiếu đăng ký khác trên hệ thống (${list}). Bạn có muốn tiếp tục?`,
        SUC_TL_001: 'Đã đánh dấu nhóm phiếu trùng lặp là đã rà soát.',
        VAL_001: 'Đây là trường bắt buộc',
        ERR_DK_005: 'Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.'
    };
    let currentUser = 'Nguyễn Văn A';

    // ---------------------------------------------------------------------
    // TIỆN ÍCH
    // ---------------------------------------------------------------------
    const pad = n => String(n).padStart(2, '0');
    const fmt = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    const daysAgo = (n, h, m) => { const d = new Date(); d.setDate(d.getDate() - n); d.setHours(h || 9, m || 0, 0, 0); return fmt(d); };
    const parseDT = s => { const m = /(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/.exec(s || ''); return m ? new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)) : null; };
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    // Chuẩn hóa trước khi đối chiếu [BR-DK-037]: in hoa, bỏ dấu tiếng Việt, bỏ khoảng trắng và các ký tự "-", ".", "/"
    const norm = v => String(v == null ? '' : v).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'D')
        .toUpperCase().replace(/[\s\-./]/g, '');
    // Giá trị không dùng để đối chiếu: trống, dưới 04 ký tự, chỉ gồm chữ số 0, giá trị không có ý nghĩa
    const IGNORE_VALUES = ['KHONG', 'KHONGCO', 'CHUACO', 'CHUACAP', 'KHONGXACDINH', 'KHONGRO', 'NONE', 'NULL'];
    const key = v => { const k = norm(v); return (k.length < 4 || /^0+$/.test(k) || IGNORE_VALUES.includes(k)) ? '' : k; };
    // Phương tiện: cùng một tài sản khi trùng ít nhất 01 trong Số khung, Số máy, Biển số;
    // trừ khi cả hai đều có Số khung và Số khung khác nhau (biển số định danh có thể được cấp cho phương tiện khác của cùng chủ xe)
    function sameVehicle(a, b) {
        const ka = key(a.soKhung), kb = key(b.soKhung);
        if (ka && kb) return ka === kb;
        return ['soMay', 'bienSo'].some(f => key(a[f]) && key(a[f]) === key(b[f]));
    }

    // ---------------------------------------------------------------------
    // DỮ LIỆU GIẢ LẬP
    // - Các phiếu đang xử lý dùng đúng Số đăng ký đang có tại danh sách Kiểm tra và xử lý hồ sơ / Ký duyệt hồ sơ;
    //   trạng thái, tên các bên được lấy theo dữ liệu thực tế của trang (localStorage custom_mock_profiles) nếu có.
    // - Các phiếu "Hoàn thành" là hồ sơ đã đăng ký trước đây trên hệ thống.
    // ---------------------------------------------------------------------
    function seed() {
        const veh = (ten, nhanHieu, soKhung, soMay, bienSo) => ({ ten, nhanHieu, soKhung, soMay, bienSo });
        const one = (ten, soGiayTo) => [{ ten, soGiayTo }];
        const nh = ten => [{ ten }];
        const day = n => daysAgo(n).slice(0, 10);
        return [
            // ---- Nhóm 1: Trùng hoàn toàn (nộp trùng) - Phương tiện; dữ liệu đã chuẩn hóa dấu "-", ".", khoảng trắng ----
            { so: 'GDBD-2026-001001', soLanDau: 'GDBD-2026-001001', loai: 'Đăng ký lần đầu', trangThai: 'Chờ duyệt', thoiDiem: '05/08/2026 08:00', nguon: 'Trực tuyến',
              bbd: one('Công ty Cổ phần Xây dựng Trường Sơn', '0108123456'), bnbd: nh('Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)'), soHopDong: '125/2026/HĐTC-VCB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '04/08/2026', giaTri: '2.500.000.000',
              vehicles: [veh('Ô tô tải', 'Hino FL8JW7A, màu trắng', 'RLH100037VN', 'ENG-5013', '30B-101.11')], tongTaiSan: 1 },
            { so: '2300881122', soLanDau: '2300881122', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(6, 14, 20), nguon: 'Trực tiếp', mirror: 'GDBD-2026-001001',
              vehicles: [veh('Ô tô tải', 'Hino FL8JW7A, màu trắng', 'RLH-100037-VN', 'ENG 5013', '30B-10111')], tongTaiSan: 1 },
            // ---- Nhóm 2: Trùng tài sản - Phương tiện (03 phiếu); phiếu tại TP.HCM ghi Số khung khác định dạng và đã đổi Biển số ----
            { so: 'GDBD-2026-000801', soLanDau: 'GDBD-2026-000801', loai: 'Đăng ký lần đầu', trangThai: 'Chờ ký', thoiDiem: '29/06/2026 10:00', nguon: 'Trực tuyến',
              bbd: one('Công ty Cổ phần Alpha', '0106987654'), bnbd: nh('Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)'), soHopDong: '0901/2026/HĐTC-BIDV', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '28/06/2026', giaTri: '1.800.000.000',
              vehicles: [veh('Ô tô đầu kéo', 'Howo A7, màu đỏ', 'LZZ5BLSJ7KA123456', 'WD615-47-8812', '29H-456.78'), veh('Rơ moóc, sơ mi rơ moóc', 'CIMC, màu đỏ', 'LJRC12345KM005555', '', '29R-055.55')], tongTaiSan: 2 },
            { so: '2300556677', soLanDau: '2300556677', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: '20/04/2026 08:40', nguon: 'Trực tiếp',
              bbd: one('Công ty Cổ phần Alpha', '0106987654'), bnbd: nh('Ngân hàng TMCP Quân đội (MB)'), soHopDong: '15/2026/HĐTC-MB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '19/04/2026', giaTri: '900.000.000',
              vehicles: [veh('Ô tô đầu kéo', 'Howo A7, màu đỏ', 'LZZ5BLSJ7KA123456', 'WD615-47-8812', '29H-456.78')], tongTaiSan: 1 },
            { so: '2300556688', soLanDau: '2300556688', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(18, 15, 10), nguon: 'Trực tuyến', coQuan: 'Trung tâm Đăng ký giao dịch, tài sản tại Thành phố Hồ Chí Minh',
              bbd: one('Công ty TNHH Thương mại Đức Anh', '0312456789'), bnbd: nh('Ngân hàng TMCP Sài Gòn Thương Tín - Chi nhánh Bình Dương'), soHopDong: '77/2026/HĐCC-STB', loaiBienPhap: 'Cầm cố', ngayHieuLuc: day(19), giaTri: '650.000.000',
              vehicles: [veh('Ô tô đầu kéo', 'Howo A7, màu đỏ', 'LZZ5BLSJ7KA-123456', 'WD615-47-8812', '51D-888.12')], tongTaiSan: 1 },
            // ---- Nhóm 3: Trùng tài sản - Sơ mi rơ moóc của GDBD-2026-000801 đã được đăng ký tại hồ sơ khác ----
            { so: '2300554433', soLanDau: '2300554433', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: '12/01/2026 14:20', nguon: 'Trực tuyến',
              bbd: one('Doanh nghiệp tư nhân Hoàng Long', '0105667788'), bnbd: nh('Ngân hàng TMCP Đông Nam Á - Chi nhánh Hà Nội'), soHopDong: '2026/0112/HĐTC-SEAB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '11/01/2026', giaTri: '6.750.000.000',
              vehicles: [veh('Rơ moóc, sơ mi rơ moóc', 'CIMC, màu đỏ', 'LJRC12345KM005555', '', '29R-055.55')], tongTaiSan: 7 },
            // ---- Nhóm 4: Trùng tài sản - Phương tiện ----
            { so: 'GDBD-2026-000851', soLanDau: 'GDBD-2026-000851', loai: 'Đăng ký lần đầu', trangThai: 'Chờ ký', thoiDiem: '28/06/2026 10:15', nguon: 'Trực tuyến',
              bbd: one('Công ty TNHH Hoàng Phát', '0101234987'), bnbd: nh('Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)'), soHopDong: '33/2026/HĐTC-VCB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '27/06/2026', giaTri: '1.200.000.000',
              vehicles: [veh('Ô tô khách', 'Thaco TB79S, màu xanh', 'RNHTB79S2NA000851', 'WP7.270E51-0851', '29B-851.51')], tongTaiSan: 1 },
            { so: '2300667700', soLanDau: '2300667700', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(2, 9, 20), nguon: 'Trực tiếp',
              bbd: one('Công ty TNHH Hoàng Phát', '0101234987'), bnbd: nh('Quỹ Đầu tư phát triển Thành phố Hà Nội'), soHopDong: 'HĐCV-2026/118', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(3), giaTri: '800.000.000',
              vehicles: [veh('Ô tô khách', 'Thaco TB79S, màu xanh', 'RNHTB79S2NA000851', 'WP7.270E51-0851', '29B-851.51')], tongTaiSan: 1 },
            // ---- Nhóm 5: Trùng hoàn toàn - Kho hàng ----
            { so: 'GDBD-2026-000804', soLanDau: 'GDBD-2026-000804', loai: 'Đăng ký lần đầu', trangThai: 'Duyệt chờ ký', thoiDiem: '30/06/2026 10:30', nguon: 'Trực tuyến',
              bbd: one('Công ty TNHH Hưng Thịnh', '0109876543'), bnbd: nh('Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)'), soHopDong: '210/2026/HĐTC-VCB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '29/06/2026', giaTri: '6.500.000.000',
              kho: [{ giaTri: 'Hạt tiêu đen xuất khẩu, khối lượng 50 tấn', diaChi: 'Kho số 3, Cảng Đình Vũ, phường Đông Hải, thành phố Hải Phòng', soHieu: 'KHO-DV-03' }], tongTaiSan: 1 },
            { so: '2300778899', soLanDau: '2300778899', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(9, 8, 30), nguon: 'Trực tiếp', mirror: 'GDBD-2026-000804',
              kho: [{ giaTri: 'Hạt tiêu đen xuất khẩu, khối lượng 50 tấn', diaChi: 'Kho số 3, Cảng Đình Vũ, phường Đông Hải, thành phố Hải Phòng', soHieu: 'KHO DV 03' }], tongTaiSan: 1 },
            // ---- Nhóm 6: Trùng tài sản - Phương tiện thủy nội địa (trùng Số đăng ký phương tiện; Cơ quan cấp ghi khác nhau) ----
            { so: '2300445566', soLanDau: '2300445566', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: '20/03/2026 09:05', nguon: 'Trực tuyến', loaiBienPhap: 'Hợp đồng cho thuê tài chính',
              bbd: one('Công ty TNHH Vận tải Thủy Nam Việt', '0201554433'), bnbd: nh('Công ty Cho thuê tài chính TNHH MTV Ngân hàng TMCP Công Thương Việt Nam'), soHopDong: '125/2026/HĐCTTC-VTL', ngayHieuLuc: '18/03/2026', giaTri: '42.800.000.000',
              ships: [{ ten: 'Tàu hàng Nam Việt 18, vỏ thép', chu: 'Công ty TNHH Vận tải Thủy Nam Việt', soDK: 'HP-3318', coQuan: 'Chi cục Đường thủy nội địa khu vực I', cap: 'VR-SB' }], tongTaiSan: 2 },
            { so: '2300667788', soLanDau: '2300667788', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(4, 16, 30), nguon: 'Trực tiếp',
              bbd: one('Công ty TNHH Vận tải Thủy Nam Việt', '0201554433'), bnbd: nh('Ngân hàng TMCP Hàng Hải Việt Nam (MSB) - Chi nhánh Hải Phòng'), soHopDong: '0915/2026/HĐTC-MSB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(5), giaTri: '9.000.000.000',
              ships: [{ ten: 'Tàu hàng Nam Việt 18, vỏ thép', chu: 'Công ty TNHH Vận tải Thủy Nam Việt', soDK: 'HP 3318', coQuan: 'Chi cục ĐTNĐ khu vực I', cap: 'VR-SB' }], tongTaiSan: 1 },
            // ---- Nhóm 7: Đăng ký thay đổi - Trùng tài sản (trùng Biển số; phiếu hoàn thành không khai Số khung) ----
            { so: 'GDBD-2026-001008', soLanDau: '2300345678', loai: 'Đăng ký thay đổi', trangThai: 'Chờ duyệt', thoiDiem: '12/08/2026 15:49', nguon: 'Trực tuyến',
              bbd: one('Công ty Cổ phần Nông sản Việt Thắng', '0107112233'), bnbd: nh('Công ty Cho thuê tài chính TNHH MTV Ngân hàng Công thương'), soHopDong: '56/2026/HĐCTTC-VTL', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '15/07/2026', giaTri: '3.200.000.000',
              vehicles: [veh('Xe máy chuyên dùng', 'Komatsu PC200-8, màu vàng', 'RLH100296VN', 'ENG-5104', '30C-108.18')], tongTaiSan: 1 },
            { so: '2300990011-TĐ1', soLanDau: '2300990011', loai: 'Đăng ký thay đổi', trangThai: 'Hoàn thành', thoiDiem: daysAgo(12, 10, 10), nguon: 'Trực tuyến',
              bbd: one('Công ty TNHH Xây dựng Hòa Bình An', '0107998877'), bnbd: nh('Ngân hàng TMCP Việt Nam Thịnh Vượng - Chi nhánh Hà Nội'), soHopDong: '102/2026/HĐTC-VPB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '20/08/2026', giaTri: '1.500.000.000',
              vehicles: [veh('Xe máy chuyên dùng', 'Komatsu PC200-8, màu vàng', '', 'SAA6D107E-1-6610', '30C-108.18')], tongTaiSan: 1 },
            // ---- Nhóm 8: Đăng ký thay đổi đã hoàn thành trùng với Phiếu đăng ký lần đầu mới (hiển thị ở cả 02 Tab) ----
            { so: '2300123456-TĐ1', soLanDau: '2300123456', loai: 'Đăng ký thay đổi', trangThai: 'Hoàn thành', thoiDiem: '15/02/2026 10:15', nguon: 'Trực tuyến',
              bbd: [{ ten: 'Công ty Cổ phần Xây dựng và Thương mại Hà Thành', soGiayTo: '0109887766' }, { ten: 'Nguyễn Hữu Thành', soGiayTo: '001085012345' }], bnbd: nh('Ngân hàng TMCP Ngoại thương Việt Nam - Chi nhánh Thành Công'), soHopDong: 'HĐTC-2026/089/VCB-HT', loaiBienPhap: 'Thế chấp', ngayHieuLuc: '14/02/2026', giaTri: '15.000.000.000',
              vehicles: [veh('Ô tô tải', 'Howo 8 tấn, màu xanh lá', 'LZZ5ELND9HW082233', 'WD615-8822', '29H-987.65')], tongTaiSan: 4 },
            { so: '2300887766', soLanDau: '2300887766', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(3, 11, 5), nguon: 'Trực tuyến',
              bbd: one('Công ty Cổ phần Xây dựng và Thương mại Hà Thành', '0109887766'), bnbd: nh('Ngân hàng TMCP Bưu điện Liên Việt - Chi nhánh Thăng Long'), soHopDong: '0333/2026/HĐTC-LPB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(4), giaTri: '700.000.000',
              vehicles: [veh('Ô tô tải', 'Howo 8 tấn, màu xanh lá', 'LZZ5ELND9HW082233', 'WD615-8822', '29H-987.65')], tongTaiSan: 1 },
            // ---- Nhóm 9: Đã rà soát (giả lập) ----
            { so: '2300111222', soLanDau: '2300111222', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(12, 9, 30), nguon: 'Trực tuyến',
              bbd: one('Công ty TNHH Thiết bị Công nghiệp Bắc Hà', '0105998877'), bnbd: nh('Ngân hàng TMCP Công Thương Việt Nam - Chi nhánh Đống Đa'), soHopDong: '44/2026/HĐTC-VTB', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(13), giaTri: '1.100.000.000',
              vehicles: [veh('Xe máy chuyên dùng', 'Toyota 8FD30, màu cam', 'TY8FD30-20-4411', '1DZ-0123456', '')], tongTaiSan: 1 },
            { so: '2300111333', soLanDau: '2300111333', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(8, 10, 50), nguon: 'Trực tuyến',
              bbd: one('Công ty TNHH Thiết bị Công nghiệp Bắc Hà', '0105998877'), bnbd: nh('Công ty Cho thuê tài chính TNHH MTV Ngân hàng TMCP Công Thương Việt Nam'), soHopDong: 'CTTC-2026-0233', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(9), giaTri: '600.000.000',
              vehicles: [veh('Xe máy chuyên dùng', 'Toyota 8FD30, màu cam', 'TY8FD30-20-4411', '1DZ-0123456', '')], tongTaiSan: 1 },
            // ---- Không tạo nhóm: trùng Biển số nhưng Số khung khác nhau (biển số định danh cấp cho xe mới của cùng chủ xe) ----
            { so: '2300565656', soLanDau: '2300565656', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(20, 9, 10), nguon: 'Trực tuyến',
              bbd: one('Nguyễn Văn Long', '001080006789'), bnbd: nh('Ngân hàng TMCP Tiên Phong (TPBank)'), soHopDong: 'TPB-2026-0565', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(21), giaTri: '450.000.000',
              vehicles: [veh('Ô tô con', 'Toyota Vios 1.5G, màu bạc', 'RLHVIOS2023000777', '2NR-0777', '30K-777.88')], tongTaiSan: 1 },
            { so: '2300575757', soLanDau: '2300575757', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(5, 14, 40), nguon: 'Trực tuyến',
              bbd: one('Nguyễn Văn Long', '001080006789'), bnbd: nh('Ngân hàng TMCP Tiên Phong (TPBank)'), soHopDong: 'TPB-2026-0575', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(6), giaTri: '520.000.000',
              vehicles: [veh('Ô tô con', 'Honda City RS, màu đỏ', 'RLHCITY2025000999', 'L15-0999', '30K-777.88')], tongTaiSan: 1 },
            // ---- Không tạo nhóm: Số máy ghi giá trị không có ý nghĩa ----
            { so: '2300121212', soLanDau: '2300121212', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(15, 10, 0), nguon: 'Trực tiếp',
              bbd: one('Công ty TNHH Vận tải Bình Minh', '0108556677'), bnbd: nh('Ngân hàng TMCP Quân đội (MB)'), soHopDong: 'MB-2026-1212', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(16), giaTri: '300.000.000',
              vehicles: [veh('Rơ moóc, sơ mi rơ moóc', 'Doosung, màu xám', 'LJRC99887KM001212', 'Không có', '29R-012.12')], tongTaiSan: 1 },
            { so: '2300343434', soLanDau: '2300343434', loai: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', thoiDiem: daysAgo(7, 15, 0), nguon: 'Trực tiếp',
              bbd: one('Công ty TNHH Cơ khí Đông Anh', '0109334455'), bnbd: nh('Ngân hàng TMCP Á Châu (ACB)'), soHopDong: 'ACB-2026-3434', loaiBienPhap: 'Thế chấp', ngayHieuLuc: day(8), giaTri: '250.000.000',
              vehicles: [veh('Rơ moóc, sơ mi rơ moóc', 'Kính Hoa, màu xanh', '', 'KHÔNG CÓ', '-')], tongTaiSan: 1 }
        ];
    }

    // Lấy Loại đăng ký, trạng thái, thời điểm, tên các bên theo dữ liệu thực tế của các màn danh sách (nếu có)
    function liveProfiles() {
        try { return JSON.parse(localStorage.getItem('custom_mock_profiles') || '[]') || []; } catch (e) { return []; }
    }
    function mapStatus(s) { return s === 'Đã duyệt - chờ ký' ? 'Duyệt chờ ký' : s; }
    let cache = null;
    function records() {
        if (cache) return cache;
        const live = liveProfiles();
        const list = seed().map(r => {
            const p = live.find(x => x && (x.id === r.so || x.registrationNo === r.so));
            const out = Object.assign({ coQuan: UNIT, nguoiYeuCau: '' }, r);
            if (p) {
                out.live = true;
                if (p.status) out.trangThai = mapStatus(p.status);
                if (p.date) out.thoiDiem = p.date;
                if (p.subtype) out.loaiBienPhap = p.subtype;
                if (p.customer && out.bbd && out.bbd[0]) out.bbd = [{ ten: p.customer, soGiayTo: out.bbd[0].soGiayTo }];
                if (p.mortgagee && out.bnbd) out.bnbd = [{ ten: p.mortgagee }];
                if (p.channel) out.nguon = /dịch vụ công/i.test(p.channel) ? 'Dịch vụ công' : (/trực tiếp|quầy|bưu/i.test(p.channel) ? 'Trực tiếp' : 'Trực tuyến');
            }
            out.nguoiYeuCau = out.nguoiYeuCau || (out.bbd && out.bbd[0] ? out.bbd[0].ten : '');
            return out;
        });
        // Phiếu "nộp trùng": cùng các bên và cùng Số hợp đồng với phiếu được tham chiếu
        list.forEach(r => {
            if (!r.mirror) return;
            const m = list.find(x => x.so === r.mirror);
            if (m) { r.bbd = JSON.parse(JSON.stringify(m.bbd)); r.bnbd = JSON.parse(JSON.stringify(m.bnbd)); r.soHopDong = m.soHopDong; r.loaiBienPhap = m.loaiBienPhap; r.ngayHieuLuc = m.ngayHieuLuc; r.giaTri = m.giaTri; r.nguoiYeuCau = m.nguoiYeuCau; }
        });
        cache = list;
        return cache;
    }
    function refresh() { cache = null; groupCache = null; }
    function bySo(so) { return records().find(r => r.so === so) || null; }

    // ---------------------------------------------------------------------
    // XÁC ĐỊNH NHÓM TRÙNG LẶP [BR-DK-037]
    // ---------------------------------------------------------------------
    let groupCache = null;
    function inScope(r) { return SCOPE_STATUS.includes(r.trangThai); }
    function partiesKey(r) {
        const b = (r.bbd || []).map(x => norm(x.soGiayTo || x.ten)).sort().join('|');
        const n = (r.bnbd || []).map(x => norm(x.ten)).sort().join('|');
        return b + '#' + n + '#' + norm(r.soHopDong);
    }
    function buildGroups() {
        if (groupCache) return groupCache;
        const recs = records().filter(inScope);
        const groups = [];
        // --- Phương tiện: so từng cặp tài sản theo sameVehicle ---
        const items = [];
        recs.forEach(r => (r.vehicles || []).forEach(v => items.push({ r, v })));
        const parent = items.map((_, i) => i);
        const find = i => (parent[i] === i ? i : (parent[i] = find(parent[i])));
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                if (items[i].r !== items[j].r && sameVehicle(items[i].v, items[j].v)) parent[find(j)] = find(i);
            }
        }
        const FIELDS = [['soKhung', 'Số khung'], ['soMay', 'Số máy'], ['bienSo', 'Biển số']];
        const comps = {};
        items.forEach((it, i) => { const root = find(i); (comps[root] = comps[root] || []).push(it); });
        Object.values(comps).forEach(c => {
            // Đặc điểm trùng: giá trị (sau chuẩn hóa) có ở từ 02 phiếu trở lên
            const features = [];
            FIELDS.forEach(([f, label]) => {
                const bySo = {};
                c.forEach(it => { const k = key(it.v[f]); if (k) (bySo[k] = bySo[k] || { v: it.v[f], so: new Set() }).so.add(it.r.so); });
                Object.values(bySo).forEach(x => { if (x.so.size > 1) features.push(`${label}: ${x.v}`); });
            });
            pushGroup(groups, 'vehicle', c, features);
        });
        // --- Tàu cá/phương tiện thủy/đường sắt: Số đăng ký phương tiện (không đối chiếu Cơ quan cấp) ---
        const shipMap = {};
        recs.forEach(r => (r.ships || []).forEach(s => { const k = key(s.soDK); if (k) (shipMap[k] = shipMap[k] || []).push({ r, v: s }); }));
        Object.values(shipMap).forEach(c => pushGroup(groups, 'ship', c, [`Số đăng ký phương tiện: ${c[0].v.soDK}`]));
        // --- Kho hàng: Địa chỉ kho hàng + Số hiệu kho hàng ---
        const khoMap = {};
        recs.forEach(r => (r.kho || []).forEach(k => { const a = key(k.diaChi), b = key(k.soHieu); if (a && b) (khoMap[a + '|' + b] = khoMap[a + '|' + b] || []).push({ r, v: k }); }));
        Object.values(khoMap).forEach(c => pushGroup(groups, 'kho', c, [`Địa chỉ kho hàng: ${c[0].v.diaChi}`, `Số hiệu kho hàng: ${c[0].v.soHieu}`]));
        groupCache = groups;
        return groups;
    }
    function pushGroup(groups, kind, items, features) {
        // Không đối chiếu giữa các phiên bản đã Hoàn thành của cùng một hồ sơ (cùng Số đăng ký lần đầu)
        const members = [];
        items.forEach(it => { if (!members.includes(it.r)) members.push(it.r); });
        const kept = members.filter(r => !(r.trangThai === 'Hoàn thành' && members.some(o => o !== r && o.soLanDau === r.soLanDau && o.trangThai === 'Hoàn thành' && (parseDT(o.thoiDiem) > parseDT(r.thoiDiem)))));
        // Nhóm dưới 02 phiếu: đóng nhóm, không hiển thị
        if (kept.length < 2 || new Set(kept.map(r => r.soLanDau)).size < 2 && kept.every(r => r.trangThai === 'Hoàn thành')) return;
        kept.sort((a, b) => parseDT(a.thoiDiem) - parseDT(b.thoiDiem));
        const keys = kept.map(partiesKey);
        const full = keys.some((k, i) => keys.indexOf(k) !== i);
        const id = kind + '-' + norm(features[0] || kept[0].so).slice(0, 40);
        groups.push({
            id, kind, loaiTaiSan: LOAI_TS[kind], dacDiem: features.join('; '), features,
            mucTrung: full ? 'Trùng hoàn toàn' : 'Trùng tài sản',
            members: kept, assets: Object.fromEntries(items.map(it => [it.r.so, it.v])),
            // Thời điểm phát hiện: thời điểm nhóm được tạo hoặc gần nhất có thêm phiếu mới (= thời điểm phiếu mới nhất vào nhóm)
            phatHien: kept.reduce((m, r) => (parseDT(r.thoiDiem) > m ? parseDT(r.thoiDiem) : m), new Date(0)),
            dangXuLy: kept.filter(r => r.trangThai !== 'Hoàn thành').length
        });
    }

    // ---------------------------------------------------------------------
    // TRẠNG THÁI RÀ SOÁT [BR-DK-038]
    // ---------------------------------------------------------------------
    function reviews() {
        let r;
        try { r = JSON.parse(localStorage.getItem(REVIEW_KEY) || 'null'); } catch (e) { r = null; }
        if (!r) {
            // Giả lập: 01 nhóm đã được rà soát trước đây
            const g = buildGroups().find(x => x.members.some(m => m.so === '2300111222'));
            r = {};
            if (g) r[g.id] = { nguoi: 'Phạm Quốc Huy', thoiDiem: daysAgo(7, 15, 20), ketQua: KET_QUA[0], ghiChu: 'Xe nâng hàng bảo đảm cho 02 nghĩa vụ khác nhau tại 02 tổ chức tín dụng, không phải nộp trùng hồ sơ.', members: g.members.map(m => m.so) };
            try { localStorage.setItem(REVIEW_KEY, JSON.stringify(r)); } catch (e) { /* bỏ qua */ }
        }
        return r;
    }
    function reviewOf(g) {
        const r = reviews()[g.id];
        // Nhóm phát sinh thêm phiếu mới (chưa có trong danh sách tại thời điểm rà soát) thì tự động về "Chưa rà soát"
        if (!r || !g.members.every(m => r.members.includes(m.so))) return null;
        return r;
    }
    function saveReview(g, ketQua, ghiChu) {
        const all = reviews();
        all[g.id] = { nguoi: currentUser, thoiDiem: fmt(new Date()), ketQua, ghiChu, members: g.members.map(m => m.so) };
        try { localStorage.setItem(REVIEW_KEY, JSON.stringify(all)); } catch (e) { /* bỏ qua */ }
    }

    // ---------------------------------------------------------------------
    // TRUY VẤN
    // ---------------------------------------------------------------------
    const groups = () => buildGroups();
    const groupById = id => buildGroups().find(g => g.id === id) || null;
    const groupsOf = so => buildGroups().filter(g => g.members.some(m => m.so === so));
    const unreviewedOf = so => groupsOf(so).filter(g => !reviewOf(g));
    const hasDup = so => groupsOf(so).length > 0;
    const hasUnreviewed = so => unreviewedOf(so).length > 0;

    // Đối chiếu tài sản đang nhập (Nhập liệu hồ sơ giấy) với dữ liệu trên hệ thống
    function checkAssets(input, excludeSo) {
        const hit = new Set();
        const recs = records().filter(inScope).filter(r => r.so !== excludeSo);
        (input.vehicles || []).forEach(v => recs.forEach(r => (r.vehicles || []).forEach(x => { if (sameVehicle(v, x)) hit.add(r.so); })));
        (input.ships || []).forEach(s => { const k = key(s.soDK); if (k) recs.forEach(r => (r.ships || []).forEach(x => { if (key(x.soDK) === k) hit.add(r.so); })); });
        (input.kho || []).forEach(k => {
            const a = key(k.diaChi), b = key(k.soHieu); if (!a || !b) return;
            recs.forEach(r => (r.kho || []).forEach(x => { if (key(x.diaChi) === a && key(x.soHieu) === b) hit.add(r.so); }));
        });
        return Array.from(hit);
    }

    // ---------------------------------------------------------------------
    // GIAO DIỆN DÙNG CHUNG (CSS nội bộ, tiền tố tl-)
    // ---------------------------------------------------------------------
    function injectCss() {
        if (document.getElementById('tlCss')) return;
        const st = document.createElement('style');
        st.id = 'tlCss';
        st.textContent = `
.tl-tag{display:inline-flex;align-items:center;gap:4px;margin-top:4px;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;line-height:1.5;white-space:nowrap;cursor:default;border:1px solid}
.tl-tag-dup{background:#FFF7ED;color:#C2410C;border-color:#FDBA74}
.tl-badge{display:inline-flex;align-items:center;padding:2px 9px;border-radius:999px;font-size:11.5px;font-weight:600;border:1px solid;white-space:nowrap}
.tl-full{background:#FEF2F2;color:#B91C1C;border-color:#FCA5A5}.tl-asset{background:#FFF7ED;color:#C2410C;border-color:#FDBA74}
.tl-unrev{background:#F1F5F9;color:#475569;border-color:#CBD5E1}.tl-rev{background:#ECFDF5;color:#047857;border-color:#6EE7B7}
.tl-st{background:#EFF6FF;color:#1D4ED8;border-color:#BFDBFE}.tl-st-done{background:#ECFDF5;color:#047857;border-color:#A7F3D0}
.tl-block{border:1px solid #FDBA74;border-left:4px solid #F97316;border-radius:8px;background:#fff;margin:16px 0}
.tl-block-h{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;cursor:pointer;background:#FFF7ED;border-radius:8px 8px 0 0}
.tl-block-h h3{margin:0;font-size:15px;color:#C2410C;display:flex;gap:8px;align-items:center}
.tl-block.tl-collapsed .tl-block-b{display:none}.tl-block.tl-collapsed .tl-chev{transform:rotate(-90deg)}
.tl-block-b{padding:14px 16px}.tl-grp{border:1px solid #E2E8F0;border-radius:8px;margin-bottom:12px}.tl-grp:last-child{margin-bottom:0}
.tl-grp-h{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;padding:10px 12px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;border-radius:8px 8px 0 0}
.tl-grp-h .tl-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px;color:#334155}
.tl-grp-b{padding:10px 12px}.tl-rev-info{font-size:12.5px;color:#475569;margin-bottom:8px}
.tl-tbl{width:100%;border-collapse:collapse;font-size:12.5px}.tl-tbl th{background:#F1F5F9;color:#475569;font-weight:600;font-size:11.5px;text-transform:uppercase;text-align:left;padding:8px}
.tl-tbl td{padding:8px;border-top:1px solid #E2E8F0;vertical-align:top}.tl-tbl th+th,.tl-tbl td+td{border-left:1px solid #E2E8F0}
.tl-tbl-wrap{border:1px solid #E2E8F0;border-radius:6px;overflow:auto}
.tl-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;font-size:12.5px;font-weight:600;border:1px solid #CBD5E1;background:#fff;color:#334155;cursor:pointer;font-family:inherit}
.tl-btn:hover{background:#F8FAFC}.tl-btn-primary{background:#1E3A8A;border-color:#1E3A8A;color:#fff}.tl-btn-primary:hover{background:#1E40AF}
.tl-btn-warn{background:#EA580C;border-color:#EA580C;color:#fff}.tl-btn-warn:hover{background:#C2410C;border-color:#C2410C;color:#fff}.tl-btn-primary:hover{color:#fff}.tl-link{color:#2563EB;font-weight:600;cursor:pointer;text-decoration:none}.tl-link:hover{text-decoration:underline}
.tl-ov{position:fixed;inset:0;background:rgba(15,23,42,.45);display:none;align-items:center;justify-content:center;z-index:12000}.tl-ov.show{display:flex}
.tl-modal{background:#fff;border-radius:10px;width:min(620px,94vw);max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,.25);font-family:'Inter',system-ui,sans-serif}
.tl-modal-h{padding:14px 18px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#1E3A8A;font-size:15px;display:flex;justify-content:space-between;align-items:center}
.tl-modal-b{padding:16px 18px;overflow:auto;font-size:13px;color:#1E293B}.tl-modal-f{padding:12px 18px;border-top:1px solid #E2E8F0;display:flex;justify-content:flex-end;gap:8px}
.tl-x{border:none;background:none;font-size:18px;cursor:pointer;color:#64748B}
.tl-ro{display:grid;grid-template-columns:150px 1fr;gap:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:12px;margin-bottom:12px}
.tl-ro .k{color:#64748B}.tl-ro .v{font-weight:600}
.tl-sel{width:100%;height:36px;border:1px solid #CBD5E1;border-radius:6px;padding:0 8px;font-family:inherit;font-size:13px;background:#fff;box-sizing:border-box}
.tl-sel.is-invalid{border-color:#DC2626;background:#FEF2F2}
.tl-ta{width:100%;min-height:80px;border:1px solid #CBD5E1;border-radius:6px;padding:8px;font-family:inherit;font-size:13px;box-sizing:border-box}
.tl-ta.is-invalid{border-color:#DC2626;background:#FEF2F2}.tl-err{color:#DC2626;font-size:12px;margin-top:4px;display:none}.tl-err.show{display:block}
.tl-warn-ic{display:flex;gap:12px;align-items:flex-start}.tl-warn-ic i{font-size:22px;color:#EA580C;margin-top:2px}
.tl-toast{position:fixed;top:20px;right:20px;z-index:13000;background:#065F46;color:#fff;padding:12px 16px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 10px 30px rgba(0,0,0,.2);opacity:0;transform:translateY(-8px);transition:all .2s;font-family:'Inter',system-ui,sans-serif;display:flex;gap:8px;align-items:center}
.tl-toast.show{opacity:1;transform:none}.tl-toast.err{background:#B91C1C}
`;
        document.head.appendChild(st);
    }
    let toastTimer;
    function toast(msg, type) {
        injectCss();
        let el = document.getElementById('tlToast');
        if (!el) { el = document.createElement('div'); el.id = 'tlToast'; el.className = 'tl-toast'; document.body.appendChild(el); }
        el.className = 'tl-toast' + (type === 'error' ? ' err' : '');
        el.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i><span>${esc(msg)}</span>`;
        requestAnimationFrame(() => el.classList.add('show'));
        clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
    }
    function modal(title, bodyHtml, footHtml) {
        injectCss();
        let ov = document.getElementById('tlOverlay');
        if (!ov) { ov = document.createElement('div'); ov.id = 'tlOverlay'; ov.className = 'tl-ov'; document.body.appendChild(ov); }
        ov.innerHTML = `<div class="tl-modal" role="dialog" aria-modal="true"><div class="tl-modal-h"><span>${title}</span><button type="button" class="tl-x" data-close aria-label="Đóng">&times;</button></div>
            <div class="tl-modal-b">${bodyHtml}</div><div class="tl-modal-f">${footHtml}</div></div>`;
        ov.classList.add('show');
        const close = () => ov.classList.remove('show');
        ov.querySelectorAll('[data-close]').forEach(b => b.onclick = close);
        return { el: ov, close };
    }
    const mucBadge = m => `<span class="tl-badge ${m === 'Trùng hoàn toàn' ? 'tl-full' : 'tl-asset'}">${esc(m)}</span>`;
    const revBadge = g => reviewOf(g) ? '<span class="tl-badge tl-rev">Đã rà soát</span>' : '<span class="tl-badge tl-unrev">Chưa rà soát</span>';
    const stBadge = s => `<span class="tl-badge ${s === 'Hoàn thành' ? 'tl-st-done' : 'tl-st'}">${esc(s)}</span>`;
    const partyText = list => (list || []).map(x => esc(x.ten) + (x.soGiayTo ? ` <span style="color:#64748B">(${esc(x.soGiayTo)})</span>` : '')).join('<br>');

    // Nhãn [Có hồ sơ trùng] đặt dưới Số đăng ký trên danh sách xử lý
    function label(so) {
        const ug = unreviewedOf(so);
        if (!ug.length) return '';
        injectCss();
        const n = new Set(ug.flatMap(g => g.members.map(m => m.so)).filter(x => x !== so)).size;
        const muc = ug.some(g => g.mucTrung === 'Trùng hoàn toàn') ? 'Trùng hoàn toàn' : 'Trùng tài sản';
        return `<div><span class="tl-tag tl-tag-dup" title="Mức trùng: ${muc}; Số phiếu trùng: ${n}"><i class="fa-solid fa-clone"></i> Có hồ sơ trùng</span></div>`;
    }

    // Cảnh báo khi Duyệt / Trình ký [BR-DK-029] - [MSG-CFM-DK-010]
    function confirmIfDup(soList, onContinue) {
        const dups = (soList || []).filter(hasUnreviewed);
        if (!dups.length) { onContinue(); return; }
        const m = modal('<i class="fa-solid fa-triangle-exclamation" style="color:#EA580C"></i> Cảnh báo hồ sơ trùng lặp',
            `<div class="tl-warn-ic"><i class="fa-solid fa-clone"></i><div>${esc(MSG.CFM_DK_010)}
                <div style="margin-top:10px;font-weight:600">Số đăng ký có trùng lặp: ${dups.map(esc).join(', ')}</div></div></div>`,
            '<button type="button" class="tl-btn" data-close>Hủy</button><button type="button" class="tl-btn tl-btn-primary" data-ok>Tiếp tục</button>');
        m.el.querySelector('[data-ok]').onclick = () => { m.close(); onContinue(); };
    }
    // Cảnh báo khi Nhập liệu hồ sơ giấy - [MSG-CFM-DK-017]
    function confirmNhapLieu(soList, onContinue) {
        if (!soList.length) { onContinue(); return; }
        const m = modal('<i class="fa-solid fa-triangle-exclamation" style="color:#EA580C"></i> Cảnh báo tài sản trùng lặp',
            `<div class="tl-warn-ic"><i class="fa-solid fa-clone"></i><div>${esc(MSG.CFM_DK_017(soList.length, soList.join(', ')))}</div></div>`,
            '<button type="button" class="tl-btn" data-close>Hủy</button><button type="button" class="tl-btn tl-btn-primary" data-ok>Tiếp tục</button>');
        m.el.querySelector('[data-ok]').onclick = () => { m.close(); onContinue(); };
    }

    // MH03 - Popup Đánh dấu đã rà soát
    function openReview(groupId, onDone) {
        const g = groupById(groupId);
        if (!g) return;
        const m = modal('Đánh dấu đã rà soát nhóm phiếu trùng lặp',
            `<div class="tl-ro"><div class="k">Mức trùng</div><div>${mucBadge(g.mucTrung)}</div>
                <div class="k">Đặc điểm trùng</div><div class="v">${esc(g.dacDiem)}</div>
                <div class="k">Số đăng ký trong nhóm</div><div class="v">${g.members.map(x => esc(x.so)).join(', ')}</div></div>
             <label style="font-weight:600;display:block;margin-bottom:6px" for="tlKetQua">Kết quả rà soát <span style="color:#DC2626">*</span></label>
             <select class="tl-sel" id="tlKetQua"><option value="">-- Chọn kết quả rà soát --</option>${KET_QUA.map(k => `<option>${esc(k)}</option>`).join('')}</select>
             <div class="tl-err" id="tlKetQuaErr">${esc(MSG.VAL_001)}</div>
             <label style="font-weight:600;display:block;margin:12px 0 6px" for="tlNote">Ghi chú rà soát <span style="color:#DC2626">*</span></label>
             <textarea class="tl-ta" id="tlNote" placeholder="Nhập kết quả rà soát, VD: Tài sản bảo đảm cho nhiều nghĩa vụ khác nhau, không phải nộp trùng..."></textarea>
             <div class="tl-err" id="tlNoteErr">${esc(MSG.VAL_001)}</div>`,
            '<button type="button" class="tl-btn" data-close>Hủy bỏ</button><button type="button" class="tl-btn tl-btn-primary" data-ok><i class="fa-solid fa-check"></i> Xác nhận</button>');
        const sel = document.getElementById('tlKetQua'), ta = document.getElementById('tlNote');
        const setErr = (el, errId, on) => { el.classList.toggle('is-invalid', on); document.getElementById(errId).classList.toggle('show', on); };
        sel.addEventListener('change', () => { if (sel.value) setErr(sel, 'tlKetQuaErr', false); });
        ta.addEventListener('input', () => { if (ta.value.trim()) setErr(ta, 'tlNoteErr', false); });
        setTimeout(() => sel.focus(), 50);
        m.el.querySelector('[data-ok]').onclick = () => {
            const ketQua = sel.value, note = ta.value.trim();
            setErr(sel, 'tlKetQuaErr', !ketQua);
            setErr(ta, 'tlNoteErr', !note);
            if (!ketQua) { sel.focus(); return; }
            if (!note) { ta.focus(); return; }
            refresh();
            const cur = groupById(groupId);
            if (!cur || reviewOf(cur)) { m.close(); toast(MSG.ERR_DK_005, 'error'); if (onDone) onDone(); return; }
            saveReview(cur, ketQua, note);
            m.close();
            toast(MSG.SUC_TL_001);
            if (onDone) onDone();
        };
    }

    // Khối Hồ sơ trùng lặp (màn hình Xem chi tiết Phiếu đăng ký)
    function renderBlock(host, so, opts) {
        const o = opts || {};
        const gs = groupsOf(so);
        if (!host) return null;
        if (!gs.length) { host.innerHTML = ''; return null; }
        injectCss();
        const anyUnrev = gs.some(g => !reviewOf(g));
        host.innerHTML = `<section class="tl-block${anyUnrev ? '' : ' tl-collapsed'}" id="tlBlock">
            <div class="tl-block-h" data-toggle><h3><i class="fa-solid fa-clone"></i> ${esc(o.title || 'Hồ sơ trùng lặp')} <span class="tl-badge tl-asset">${gs.length} nhóm</span></h3><i class="fa-solid fa-chevron-down tl-chev" style="color:#C2410C;transition:transform .2s"></i></div>
            <div class="tl-block-b">${gs.map(g => {
                const rv = reviewOf(g);
                const others = g.members.filter(m => m.so !== so);
                return `<div class="tl-grp"><div class="tl-grp-h"><div class="tl-meta">${mucBadge(g.mucTrung)}<span><b>Đặc điểm trùng:</b> ${esc(g.dacDiem)}</span>${revBadge(g)}</div>
                    <div style="display:flex;gap:6px"><button type="button" class="tl-btn" data-compare="${esc(g.id)}"><i class="fa-solid fa-table-columns"></i> Xem so sánh</button>
                    ${rv ? '' : `<button type="button" class="tl-btn tl-btn-warn" data-review="${esc(g.id)}"><i class="fa-solid fa-check-double"></i> Đánh dấu đã rà soát</button>`}</div></div>
                    <div class="tl-grp-b">${rv ? `<div class="tl-rev-info"><b>Người rà soát:</b> ${esc(rv.nguoi)} | <b>Thời điểm rà soát:</b> ${esc(rv.thoiDiem)} | <b>Kết quả:</b> ${esc(rv.ketQua || '')} | <b>Ghi chú:</b> ${esc(rv.ghiChu)}</div>` : ''}
                    <div class="tl-tbl-wrap"><table class="tl-tbl"><thead><tr><th style="width:44px">STT</th><th>Số đăng ký</th><th>Loại đăng ký</th><th>Thời điểm đăng ký</th><th>Bên bảo đảm</th><th>Bên nhận bảo đảm</th><th>Số hợp đồng</th><th>Cơ quan tiếp nhận</th><th>Trạng thái</th></tr></thead>
                    <tbody>${others.map((m, i) => `<tr><td style="text-align:center">${i + 1}</td><td><a class="tl-link" href="xem_chi_tiet_lich_su_can_bo.html?id=${encodeURIComponent(m.so)}" target="_blank">${esc(m.so)}</a></td><td>${esc(m.loai)}</td><td>${esc(m.thoiDiem)}</td><td>${partyText(m.bbd)}</td><td>${partyText(m.bnbd)}</td><td>${esc(m.soHopDong)}</td><td>${esc(m.coQuan)}</td><td>${stBadge(m.trangThai)}</td></tr>`).join('')}</tbody></table></div></div></div>`;
            }).join('')}</div></section>`;
        host.querySelector('[data-toggle]').onclick = () => host.querySelector('.tl-block').classList.toggle('tl-collapsed');
        host.querySelectorAll('[data-compare]').forEach(b => b.onclick = () => window.open('loc_phieu_trung_lap_chi_tiet.html?id=' + encodeURIComponent(b.dataset.compare) + '&tab=1', '_blank'));
        host.querySelectorAll('[data-review]').forEach(b => b.onclick = () => openReview(b.dataset.review, () => { refresh(); renderBlock(host, so, o); if (o.onChange) o.onChange(); }));
        return host;
    }

    // Bổ sung các phiếu "Hoàn thành" vào dữ liệu tra cứu của Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký (tra cứu theo Số đăng ký lần đầu)
    function registerCldk() {
        const C = global.CLDK;
        if (!C || !C.HO_SO) return;
        records().filter(r => r.trangThai === 'Hoàn thành').forEach(r => {
            if (C.HO_SO[r.soLanDau]) return;
            if (C.HO_SO[r.so]) { C.HO_SO[r.soLanDau] = C.HO_SO[r.so]; return; }
            const taiSan = {};
            if (r.vehicles) taiSan.SO_KHUNG = { rows: r.vehicles.map((v, i) => ({ id: 'sk' + (i + 1), tenPT: v.ten, nhanHieu: v.nhanHieu, soKhung: v.soKhung, soMay: v.soMay, bienSo: v.bienSo })) };
            if (r.ships) taiSan.PHUONG_TIEN = { rows: r.ships.map((s, i) => ({ id: 'pt' + (i + 1), ten: s.ten, chu: s.chu, soDK: s.soDK, coQuan: s.coQuan, cap: s.cap })) };
            if (r.kho) taiSan.HANG_HOA = { kieu: 'Kho hàng', giaTri: r.kho[0].giaTri, diaChiKho: r.kho[0].diaChi, soHieuKho: r.kho[0].soHieu };
            const isHD = /^Hợp đồng/.test(r.loaiBienPhap || '');
            C.HO_SO[r.soLanDau] = {
                soDangKy: r.so, loaiDangKy: r.loai, trangThai: 'Hoàn thành', maKH: '',
                thoiDiemDangKy: r.thoiDiem + ':00', thoiDiemHieuLuc: r.thoiDiem + ':00',
                soDKLanDau: r.soLanDau, thoiDiemDKLanDau: r.thoiDiem + ':00', vanBanKetQua: `Van_ban_chung_nhan_${r.so}.pdf`,
                nguoiYeuCau: { ten: r.nguoiYeuCau, diaChi: '', taiLieu: '' },
                chung: { coQuan: r.coQuan, loaiHinh: isHD ? 'Hợp đồng' : 'Biện pháp bảo đảm', loaiBienPhap: isHD ? '' : r.loaiBienPhap, loaiHopDong: isHD ? r.loaiBienPhap : '', soHopDong: r.soHopDong, ngayHieuLucHD: r.ngayHieuLuc, giaTri: r.giaTri, quyMo: '', chuDNNu: false, mienPhi: false, taiLieuMienPhi: '' },
                bbd: (r.bbd || []).map((b, i) => ({ id: 'b' + (i + 1), loaiChuThe: /^\d{12}$/.test(b.soGiayTo || '') ? 'Công dân Việt Nam' : 'Tổ chức có đăng ký kinh doanh trong nước', soGiayTo: b.soGiayTo, ten: b.ten, diaChi: '' })),
                bnbd: (r.bnbd || []).map((b, i) => ({ id: 'n' + (i + 1), ten: b.ten, diaChi: '' })),
                taiSan
            };
        });
    }

    // Dữ liệu tài sản của phiếu theo định dạng cột động tại danh sách Kiểm tra và xử lý hồ sơ
    function assetDetailOf(so) {
        const r = bySo(so);
        if (!r) return null;
        const v = (r.vehicles || [])[0] || {}, s = (r.ships || [])[0] || {}, k = (r.kho || [])[0] || {};
        return {
            vehicleName: v.ten || '', frameNo: v.soKhung || '', engineNo: v.soMay || '', plateNo: v.bienSo || '',
            shipName: s.ten || '', shipOwner: s.chu || '', shipRegNo: s.soDK || '', shipIssuer: s.coQuan || '', shipGrade: s.cap || '',
            goodsKind: r.kho ? 'Kho hàng' : '', goodsValue: k.giaTri || '', warehouseAddress: k.diaChi || '', warehouseNo: k.soHieu || ''
        };
    }

    global.TRUNGLAP = {
        registerCldk, assetDetailOf, norm, key, KET_QUA,
        MSG, LOAI_TS, SCOPE_STATUS, UNIT,
        setUser: n => { currentUser = n; }, user: () => currentUser,
        records, bySo, groups, groupById, groupsOf, reviewOf, hasDup, hasUnreviewed, checkAssets, refresh,
        label, confirmIfDup, confirmNhapLieu, openReview, renderBlock, toast, modal,
        mucBadge, revBadge, stBadge, partyText, esc, parseDT, fmt, daysAgo, injectCss
    };
})(window);
