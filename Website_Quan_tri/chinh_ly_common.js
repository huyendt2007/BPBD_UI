/* =========================================================================
   QUẢN LÝ CHỈNH LÝ, HỦY VÀ KHÔI PHỤC ĐĂNG KÝ - LOGIC DÙNG CHUNG
   - Dữ liệu giả lập hồ sơ gốc + đề nghị (lưu trạng thái ở localStorage để các màn hình
     MH01 → MH10 dùng chung một luồng).
   - MessageList, popup dùng chung (MH04, MH05, MH08, MH09, MH10), combobox có tìm kiếm,
     khối hiển thị Thông tin hồ sơ gốc và khối đánh dấu thông tin đã chỉnh lý.
   ========================================================================= */
(function (global) {
    'use strict';

    const STORE_KEY = 'cldk_demo_state_v5';   // tăng phiên bản khi đổi dữ liệu mẫu để trình duyệt nạp lại
    const FLASH_KEY = 'cldk_flash_toast';
    const DRAFT_KEY_PREFIX = 'cldk_draft_preview_';

    // ---------------------------------------------------------------------
    // TIỆN ÍCH
    // ---------------------------------------------------------------------
    const pad = n => (n < 10 ? '0' + n : '' + n);
    const fmtDate = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    const fmtDateTime = d => `${fmtDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    const fmtDateTimeSec = d => `${fmtDateTime(d)}:${pad(d.getSeconds())}`;
    const hoursAgo = h => new Date(Date.now() - h * 3600 * 1000);
    const daysFromNow = n => new Date(Date.now() + n * 24 * 3600 * 1000);
    const clone = o => JSON.parse(JSON.stringify(o));
    const esc = s => (s === null || s === undefined ? '' : String(s))
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const val = s => (s === null || s === undefined || s === '' ? '-' : s);
    const byId = id => document.getElementById(id);
    function param(name) { return new URLSearchParams(location.search).get(name); }
    function parseDMY(s) {
        const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(s || '');
        return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
    }

    // ---------------------------------------------------------------------
    // MESSAGE LIST (theo Danh mục MessageList - Danh mục và Phụ lục)
    // ---------------------------------------------------------------------
    const MSG = {
        VAL_001: 'Đây là trường bắt buộc',
        VAL_007: 'Từ ngày không được lớn hơn Đến ngày',
        INF_SYS_001: 'Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.',
        SUC_SYS_005: 'Kết xuất tệp thành công.',
        ERR_CLDK_001: 'Số đăng ký không tồn tại trên hệ thống. Vui lòng kiểm tra lại.',
        ERR_CLDK_002: 'Hồ sơ chưa ở trạng thái Hoàn thành, không được phép lập đề nghị.',
        ERR_CLDK_003: ten => `Định dạng tệp tin ${ten} không hợp lệ. Chỉ chấp nhận các định dạng .pdf, .doc, .docx, .png, .jpg.`,
        ERR_FILE_004: ten => `Dung lượng tệp tin ${ten} vượt quá 20MB. Vui lòng kiểm tra lại.`,
        CFM_SYS_001: ten => `Bạn có chắc chắn muốn xóa bản ghi ${ten} không?`,
        SUC_CLDK_001: ma => `Gửi đề nghị thành công. Mã đề nghị: ${ma}`,
        SUC_CLDK_002: ten => `Đã phê duyệt đề nghị và chuyển giao cho ${ten} thực hiện.`,
        SUC_CLDK_003: ma => `Đã từ chối phê duyệt đề nghị ${ma}.`,
        SUC_CLDK_004: ma => `Trình ký hồ sơ thành công. Mã đề nghị: ${ma}`,
        SUC_CLDK_005: ma => `Ký số và phát hành thành công hồ sơ ${ma}.`,
        SUC_CLDK_006: ma => `Đã trả lại hồ sơ ${ma} cho Người thực hiện.`,
        ERR_DK_005: 'Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.',
        ERR_DK_010: 'Không tìm thấy file PDF chờ ký hợp lệ.',
        ERR_DK_011: 'Thiết bị/tài khoản ký số chưa sẵn sàng hoặc chưa nhận chứng thư số hợp lệ.',
        ERR_DK_012: 'Chứng thư số không khớp với Lãnh đạo được phân công ký duyệt.',
        ERR_DK_013: 'Ký số không thành công. Vui lòng kiểm tra thiết bị ký số và thử lại.',
        CFM_DK_013: 'Bạn có chắc chắn muốn ký số hồ sơ đã chọn không?'
    };

    // ---------------------------------------------------------------------
    // DANH MỤC
    // ---------------------------------------------------------------------
    const CURRENT_USER = {
        ten: 'Nguyễn Văn A',
        tenDangNhap: 'anv.hn',
        donVi: 'Trung tâm Đăng ký giao dịch, tài sản tại Thành phố Hà Nội'
    };
    const CAN_BO = [
        { ten: 'Nguyễn Văn A', tenDangNhap: 'anv.hn', chucVu: 'Chuyên viên Đăng ký' },
        { ten: 'Trần Thị B', tenDangNhap: 'ttb.hn', chucVu: 'Chuyên viên Đăng ký' },
        { ten: 'Lê Văn Thành', tenDangNhap: 'lvthanh.hn', chucVu: 'Chuyên viên Thẩm định' },
        { ten: 'Phạm Quốc Huy', tenDangNhap: 'pqhuy.hn', chucVu: 'Chuyên viên Nghiệp vụ' },
        { ten: 'Đỗ Thu Hà', tenDangNhap: 'dtha.hn', chucVu: 'Chuyên viên Đăng ký' }
    ];
    const LANH_DAO = [
        { ten: 'Trần Đình Hưng', tenDangNhap: 'tdhung.hn', chucVu: 'Giám đốc Trung tâm' },
        { ten: 'Lê Hoàng Long', tenDangNhap: 'lhlong.hn', chucVu: 'Phó Giám đốc Trung tâm' },
        { ten: 'Vũ Minh Châu', tenDangNhap: 'vmchau.hn', chucVu: 'Phó Giám đốc Trung tâm' }
    ];
    const CO_QUAN = [
        'Trung tâm Đăng ký giao dịch, tài sản tại Thành phố Hà Nội',
        'Trung tâm Đăng ký giao dịch, tài sản tại Thành phố Hồ Chí Minh',
        'Trung tâm Đăng ký giao dịch, tài sản tại Thành phố Đà Nẵng'
    ];
    const LOAI_BIEN_PHAP = ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu'];
    const LOAI_HOP_DONG = ['Hợp đồng cho thuê tài chính', 'Hợp đồng thuê tài sản', 'Hợp đồng chuyển giao quyền đòi nợ', 'Hợp đồng ký gửi hàng hóa'];
    const QUY_MO = ['Bên bảo đảm sử dụng khoản vay cho tiêu dùng cá nhân', 'Bên bảo đảm là công ty có ít hơn 10 nhân viên', 'Bên bảo đảm là công ty có từ 10 đến 299 nhân viên', 'Bên bảo đảm là công ty có từ 300 nhân viên hoặc nhiều hơn'];   // Danh mục Quy mô bên bảo đảm [DM_12]
    const LOAI_CHU_THE = ['Công dân Việt Nam', 'Người nước ngoài', 'Tổ chức có đăng ký kinh doanh trong nước', 'Tổ chức không có đăng ký kinh doanh', 'Tổ chức nước ngoài'];
    const TEN_PHUONG_TIEN = ['Ô tô con', 'Ô tô tải', 'Ô tô khách', 'Rơ moóc, sơ mi rơ moóc', 'Mô tô, xe gắn máy', 'Xe máy chuyên dùng'];

    // Danh mục Loại tài sản bảo đảm [DM_07]
    const LOAI_TS = [
        { key: 'CAY', ten: 'Cây hằng năm, công trình tạm' },
        { key: 'DONG_SAN', ten: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)' },
        { key: 'SO_KHUNG', ten: 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)' },
        { key: 'PHUONG_TIEN', ten: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt' },
        { key: 'QUYEN', ten: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản' },
        { key: 'HANG_HOA', ten: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ' },
        { key: 'CHUNG_KHOAN', ten: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung' }
    ];
    const TABLE_TS = ['SO_KHUNG', 'PHUONG_TIEN', 'CHUNG_KHOAN'];

    // Cột của các bảng dữ liệu (dùng cho hiển thị, so sánh và form sửa)
    const COLS = {
        bbd: [
            { key: 'loaiChuThe', label: 'Loại chủ thể', type: 'select', options: LOAI_CHU_THE, req: true },
            { key: 'soGiayTo', label: 'Số giấy tờ chứng minh tư cách pháp lý', req: true },
            { key: 'ten', label: 'Tên', req: true, bold: true },
            { key: 'diaChi', label: 'Địa chỉ', req: true }
        ],
        bnbd: [
            { key: 'ten', label: 'Tên', req: true, bold: true },
            { key: 'diaChi', label: 'Địa chỉ', req: true }
        ],
        SO_KHUNG: [
            { key: 'tenPT', label: 'Tên phương tiện', type: 'select', options: TEN_PHUONG_TIEN, req: true },
            { key: 'nhanHieu', label: 'Nhãn hiệu, màu sơn', req: true },
            { key: 'soKhung', label: 'Số khung', req: true, bold: true },
            { key: 'soMay', label: 'Số máy' },
            { key: 'bienSo', label: 'Biển số' }
        ],
        PHUONG_TIEN: [
            { key: 'ten', label: 'Tên phương tiện, nhãn hiệu', req: true },
            { key: 'chu', label: 'Tên/Họ tên chủ phương tiện/chủ sở hữu', req: true },
            { key: 'soDK', label: 'Số đăng ký' },
            { key: 'coQuan', label: 'Cơ quan cấp giấy chứng nhận' },
            { key: 'cap', label: 'Cấp phương tiện' }
        ],
        CHUNG_KHOAN: [
            { key: 'gio', label: 'Giờ', req: true, center: true },
            { key: 'phut', label: 'Phút', req: true, center: true },
            { key: 'ngay', label: 'Ngày', req: true, center: true },
            { key: 'thang', label: 'Tháng', req: true, center: true },
            { key: 'nam', label: 'Năm', req: true, center: true },
            { key: 'file', label: 'Đính kèm file .PDF', req: true, file: true }
        ]
    };
    const CHUNG_FIELDS = [
        { key: 'coQuan', label: 'Cơ quan tiếp nhận' },
        { key: 'loaiHinh', label: 'Loại hình giao dịch' },
        { key: 'loaiBienPhap', label: 'Loại biện pháp', show: c => c.loaiHinh === 'Biện pháp bảo đảm' },
        { key: 'loaiHopDong', label: 'Loại hợp đồng', show: c => c.loaiHinh === 'Hợp đồng' },
        { key: 'soHopDong', label: 'Số hợp đồng' },
        { key: 'ngayHieuLucHD', label: 'Ngày có hiệu lực của hợp đồng' },
        { key: 'giaTri', label: 'Giá trị khoản vay hoặc nghĩa vụ (VND)' },
        { key: 'quyMo', label: 'Quy mô' },
        { key: 'chuDNNu', label: 'Chủ doanh nghiệp là nữ giới?', fmt: v => (v ? 'Có' : 'Không') },
        { key: 'mienPhi', label: 'Trường hợp được miễn nghĩa vụ nộp phí', fmt: v => (v ? 'Có' : 'Không'), show: c => !!c.mienPhi },
        { key: 'taiLieuMienPhi', label: 'Tài liệu chứng minh miễn lệ phí', file: true, show: c => !!c.taiLieuMienPhi }
    ];

    // Tiêu đề động theo Loại biện pháp / Loại hợp đồng
    function partyTitles(chung) {
        const c = chung || {};
        if (c.loaiHinh === 'Hợp đồng') {
            const map = {
                'Hợp đồng cho thuê tài chính': ['Bên thuê tài chính', 'Bên cho thuê tài chính', 'Tài sản cho thuê tài chính'],
                'Hợp đồng thuê tài sản': ['Bên thuê', 'Bên cho thuê', 'Tài sản thuê'],
                'Hợp đồng chuyển giao quyền đòi nợ': ['Bên chuyển giao', 'Bên nhận chuyển giao', 'Quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác được chuyển giao'],
                'Hợp đồng ký gửi hàng hóa': ['Bên ký gửi', 'Bên nhận ký gửi', 'Hàng hóa ký gửi']
            };
            const t = map[c.loaiHopDong] || ['Bên bảo đảm', 'Bên nhận bảo đảm', 'Tài sản bảo đảm'];
            return { bbd: t[0], bnbd: t[1], ts: t[2] };
        }
        const bp = {
            'Thế chấp': ['Bên thế chấp', 'Bên nhận thế chấp'],
            'Cầm cố': ['Bên cầm cố', 'Bên nhận cầm cố'],
            'Bảo lưu quyền sở hữu': ['Bên mua', 'Bên bán']
        }[c.loaiBienPhap] || ['Bên bảo đảm', 'Bên nhận bảo đảm'];
        return { bbd: bp[0], bnbd: bp[1], ts: 'Tài sản bảo đảm' };
    }

    // ---------------------------------------------------------------------
    // DỮ LIỆU GIẢ LẬP HỒ SƠ GỐC (CSDL đăng ký)
    // ---------------------------------------------------------------------
    const HO_SO = {
        '2300123456-TĐ1': {
            soDangKy: '2300123456-TĐ1', loaiDangKy: 'Đăng ký thay đổi', trangThai: 'Hoàn thành', maKH: 'KH-00189',
            thoiDiemDangKy: '15/02/2026 10:15:30', thoiDiemHieuLuc: '15/02/2026 14:02:11',
            soDKLanDau: '2300123456', thoiDiemDKLanDau: '10/01/2026 08:30:15', vanBanKetQua: 'Van_ban_chung_nhan_2300123456-TD1.pdf',
            nguoiYeuCau: { ten: 'Công ty Cổ phần Xây dựng và Thương mại Hà Thành', diaChi: 'Số 120 Hoàng Quốc Việt - Phường Nghĩa Đô - Thành phố Hà Nội - Việt Nam', taiLieu: 'Giay_uy_quyen_HaThanh.pdf' },
            chung: { coQuan: CO_QUAN[0], loaiHinh: 'Biện pháp bảo đảm', loaiBienPhap: 'Thế chấp', loaiHopDong: '', soHopDong: 'HĐTC-2026/089/VCB-HT', ngayHieuLucHD: '14/02/2026', giaTri: '15.000.000.000', quyMo: 'Bên bảo đảm là công ty có từ 300 nhân viên hoặc nhiều hơn', chuDNNu: false, mienPhi: false, taiLieuMienPhi: '' },
            bbd: [
                { id: 'b1', loaiChuThe: 'Tổ chức có đăng ký kinh doanh trong nước', soGiayTo: '0109887766', ten: 'Công ty Cổ phần Xây dựng và Thương mại Hà Thành', diaChi: 'Số 120 Hoàng Quốc Việt - Phường Nghĩa Đô - Thành phố Hà Nội - Việt Nam' },
                { id: 'b2', loaiChuThe: 'Công dân Việt Nam', soGiayTo: '001085012345', ten: 'Nguyễn Hữu Thành', diaChi: 'Số 18 Trần Thái Tông - Phường Cầu Giấy - Thành phố Hà Nội - Việt Nam' }
            ],
            bnbd: [
                { id: 'n1', ten: 'Ngân hàng TMCP Ngoại thương Việt Nam - Chi nhánh Thành Công', diaChi: 'Số 11 Láng Hạ - Phường Giảng Võ - Thành phố Hà Nội - Việt Nam' }
            ],
            taiSan: {
                SO_KHUNG: { rows: [
                    { id: 'sk1', tenPT: 'Ô tô con', nhanHieu: 'Honda CR-V, màu đen', soKhung: 'RLSRE6880011223', soMay: 'K20C9-1122334', bienSo: '30K-123.45' },
                    { id: 'sk2', tenPT: 'Ô tô tải', nhanHieu: 'Howo 8 tấn, màu xanh lá', soKhung: 'LZZ5ELND9HW082233', soMay: 'WD615-8822', bienSo: '29H-987.65' },
                    { id: 'sk3', tenPT: 'Ô tô con', nhanHieu: 'Toyota Vios, màu bạc', soKhung: 'MR0EX8CD1J0451122', soMay: '2NR-451122', bienSo: '30G-456.78' }
                ] },
                DONG_SAN: { moTa: 'Dây chuyền thiết bị trộn bê tông tự động Model BT-120, năm sản xuất 2024, đặt tại kho số 2 Khu công nghiệp Thạch Thất.' }
            }
        },
        '2300445566': {
            soDangKy: '2300445566', loaiDangKy: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', maKH: 'KH-00203',
            thoiDiemDangKy: '20/03/2026 09:05:12', thoiDiemHieuLuc: '20/03/2026 15:40:02',
            soDKLanDau: '2300445566', thoiDiemDKLanDau: '20/03/2026 09:05:12', vanBanKetQua: 'Van_ban_chung_nhan_2300445566.pdf',
            nguoiYeuCau: { ten: 'Công ty Cho thuê tài chính TNHH MTV Ngân hàng TMCP Công Thương Việt Nam', diaChi: 'Số 16 Phan Đình Phùng - Phường Ba Đình - Thành phố Hà Nội - Việt Nam', taiLieu: '' },
            chung: { coQuan: CO_QUAN[0], loaiHinh: 'Hợp đồng', loaiBienPhap: '', loaiHopDong: 'Hợp đồng cho thuê tài chính', soHopDong: '125/2026/HĐCTTC-VTL', ngayHieuLucHD: '18/03/2026', giaTri: '42.800.000.000', quyMo: 'Bên bảo đảm là công ty có từ 10 đến 299 nhân viên', chuDNNu: true, mienPhi: false, taiLieuMienPhi: '' },
            bbd: [
                { id: 'b1', loaiChuThe: 'Tổ chức có đăng ký kinh doanh trong nước', soGiayTo: '0201554433', ten: 'Công ty TNHH Vận tải Thủy Nam Việt', diaChi: 'Số 25 Đà Nẵng - Phường Hải An - Thành phố Hải Phòng - Việt Nam' }
            ],
            bnbd: [
                { id: 'n1', ten: 'Công ty Cho thuê tài chính TNHH MTV Ngân hàng TMCP Công Thương Việt Nam', diaChi: 'Số 16 Phan Đình Phùng - Phường Ba Đình - Thành phố Hà Nội - Việt Nam' }
            ],
            taiSan: {
                PHUONG_TIEN: { rows: [
                    { id: 'pt1', ten: 'Tàu hàng Nam Việt 18, vỏ thép', chu: 'Công ty TNHH Vận tải Thủy Nam Việt', soDK: 'HP-3318', coQuan: 'Chi cục Đường thủy nội địa khu vực I', cap: 'VR-SB' },
                    { id: 'pt2', ten: 'Sà lan tự hành Nam Việt 25', chu: 'Công ty TNHH Vận tải Thủy Nam Việt', soDK: 'HP-3325', coQuan: 'Chi cục Đường thủy nội địa khu vực I', cap: 'VR-SI' }
                ] }
            }
        },
        '2300776655': {
            soDangKy: '2300776655', loaiDangKy: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', maKH: 'KH-00193',
            thoiDiemDangKy: '05/04/2026 08:12:40', thoiDiemHieuLuc: '05/04/2026 10:30:00',
            soDKLanDau: '2300776655', thoiDiemDKLanDau: '05/04/2026 08:12:40', vanBanKetQua: 'Van_ban_chung_nhan_2300776655.pdf',
            nguoiYeuCau: { ten: 'Vũ Thị Hằng Nga', diaChi: 'Số 9 Ngõ 120 Trần Duy Hưng - Phường Yên Hòa - Thành phố Hà Nội - Việt Nam', taiLieu: '' },
            chung: { coQuan: CO_QUAN[0], loaiHinh: 'Biện pháp bảo đảm', loaiBienPhap: 'Cầm cố', loaiHopDong: '', soHopDong: '0458/2026/HĐCC-VIB', ngayHieuLucHD: '04/04/2026', giaTri: '2.300.000.000', quyMo: 'Bên bảo đảm là công ty có ít hơn 10 nhân viên', chuDNNu: false, mienPhi: false, taiLieuMienPhi: '' },
            bbd: [
                { id: 'b1', loaiChuThe: 'Công dân Việt Nam', soGiayTo: '001190033221', ten: 'Vũ Thị Hằng Nga', diaChi: 'Số 9 Ngõ 120 Trần Duy Hưng - Phường Yên Hòa - Thành phố Hà Nội - Việt Nam' }
            ],
            bnbd: [
                { id: 'n1', ten: 'Ngân hàng TMCP Quốc tế Việt Nam (VIB) - Chi nhánh Hà Nội', diaChi: 'Số 16 Phạm Hùng - Phường Từ Liêm - Thành phố Hà Nội - Việt Nam' }
            ],
            taiSan: {
                QUYEN: { tenQuyen: 'Quyền đòi nợ phát sinh từ Hợp đồng thi công số 15/2026/HĐTC', canCu: 'Hợp đồng thi công số 15/2026/HĐTC ngày 10/01/2026 giữa Vũ Thị Hằng Nga và Công ty CP Đầu tư An Phát.' },
                HANG_HOA: { kieu: 'Kho hàng', giaTri: 'Thép cuộn cán nóng, tổng khối lượng 350 tấn', diaChiKho: 'Lô B2 Khu công nghiệp Quang Minh - Xã Quang Minh - Thành phố Hà Nội - Việt Nam', soHieuKho: 'Kho số 05' }
            }
        },
        '2300554433': {
            soDangKy: '2300554433', loaiDangKy: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', maKH: 'KH-00198',
            thoiDiemDangKy: '12/01/2026 14:20:05', thoiDiemHieuLuc: '12/01/2026 16:45:30',
            soDKLanDau: '2300554433', thoiDiemDKLanDau: '12/01/2026 14:20:05', vanBanKetQua: 'Van_ban_chung_nhan_2300554433.pdf',
            nguoiYeuCau: { ten: 'Ngân hàng TMCP Đông Nam Á - Chi nhánh Hà Nội', diaChi: 'Số 198 Trần Quang Khải - Phường Hoàn Kiếm - Thành phố Hà Nội - Việt Nam', taiLieu: '' },
            chung: { coQuan: CO_QUAN[0], loaiHinh: 'Biện pháp bảo đảm', loaiBienPhap: 'Thế chấp', loaiHopDong: '', soHopDong: '2026/0112/HĐTC-SEAB', ngayHieuLucHD: '11/01/2026', giaTri: '6.750.000.000', quyMo: 'Bên bảo đảm là công ty có từ 10 đến 299 nhân viên', chuDNNu: false, mienPhi: false, taiLieuMienPhi: '' },
            bbd: [
                { id: 'b1', loaiChuThe: 'Tổ chức có đăng ký kinh doanh trong nước', soGiayTo: '0105667788', ten: 'Doanh nghiệp tư nhân Hoàng Long', diaChi: 'Số 45 Nguyễn Văn Linh - Phường Long Biên - Thành phố Hà Nội - Việt Nam' }
            ],
            bnbd: [
                { id: 'n1', ten: 'Ngân hàng TMCP Đông Nam Á - Chi nhánh Hà Nội', diaChi: 'Số 198 Trần Quang Khải - Phường Hoàn Kiếm - Thành phố Hà Nội - Việt Nam' }
            ],
            taiSan: {
                SO_KHUNG: { rows: [
                    { id: 'sk1', tenPT: 'Ô tô tải', nhanHieu: 'Hyundai HD210, màu trắng', soKhung: 'KMFGA17BPMC110011', soMay: 'D6GA-110011', bienSo: '29C-111.11' },
                    { id: 'sk2', tenPT: 'Ô tô tải', nhanHieu: 'Hyundai HD210, màu trắng', soKhung: 'KMFGA17BPMC110022', soMay: 'D6GA-110022', bienSo: '29C-222.22' },
                    { id: 'sk3', tenPT: 'Ô tô tải', nhanHieu: 'Isuzu FVR34, màu xanh', soKhung: 'JALFVR34LM7000333', soMay: '6HK1-000333', bienSo: '29C-333.33' },
                    { id: 'sk4', tenPT: 'Ô tô tải', nhanHieu: 'Isuzu FVR34, màu xanh', soKhung: 'JALFVR34LM7000444', soMay: '6HK1-000444', bienSo: '29C-444.44' },
                    { id: 'sk5', tenPT: 'Rơ moóc, sơ mi rơ moóc', nhanHieu: 'CIMC, màu đỏ', soKhung: 'LJRC12345KM005555', soMay: '', bienSo: '29R-055.55' }
                ] },
                CHUNG_KHOAN: { rows: [
                    { id: 'ck1', gio: '09', phut: '30', ngay: '10', thang: '01', nam: '2026', file: 'Xac_nhan_VSDC_HoangLong.pdf' }
                ] },
                DONG_SAN: { moTa: 'Máy xúc đào bánh xích Komatsu PC200-8, năm sản xuất 2021, số seri KMTPC200-21-0088.' }
            }
        },
        '2300332211': {
            soDangKy: '2300332211', loaiDangKy: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', maKH: 'KH-00195',
            thoiDiemDangKy: '02/02/2026 10:00:00', thoiDiemHieuLuc: '02/02/2026 11:15:20',
            soDKLanDau: '2300332211', thoiDiemDKLanDau: '02/02/2026 10:00:00', vanBanKetQua: 'Van_ban_chung_nhan_2300332211.pdf',
            nguoiYeuCau: { ten: 'Đỗ Anh Tuấn', diaChi: 'Số 7 Phố Huế - Phường Hai Bà Trưng - Thành phố Hà Nội - Việt Nam', taiLieu: '' },
            chung: { coQuan: CO_QUAN[0], loaiHinh: 'Biện pháp bảo đảm', loaiBienPhap: 'Thế chấp', loaiHopDong: '', soHopDong: '0099/2026/HĐTC-SHB', ngayHieuLucHD: '01/02/2026', giaTri: '1.850.000.000', quyMo: 'Bên bảo đảm là công ty có ít hơn 10 nhân viên', chuDNNu: false, mienPhi: false, taiLieuMienPhi: '' },
            bbd: [
                { id: 'b1', loaiChuThe: 'Công dân Việt Nam', soGiayTo: '001088004455', ten: 'Đỗ Anh Tuấn', diaChi: 'Số 7 Phố Huế - Phường Hai Bà Trưng - Thành phố Hà Nội - Việt Nam' }
            ],
            bnbd: [
                { id: 'n1', ten: 'Ngân hàng TMCP Sài Gòn - Hà Nội (SHB) - Chi nhánh Hà Nội', diaChi: 'Số 77 Trần Hưng Đạo - Phường Cửa Nam - Thành phố Hà Nội - Việt Nam' }
            ],
            taiSan: {
                SO_KHUNG: { rows: [
                    { id: 'sk1', tenPT: 'Ô tô con', nhanHieu: 'Mazda CX-5, màu đỏ', soKhung: 'RP8KF2W4JNA200111', soMay: 'PY-200111', bienSo: '30H-888.99' }
                ] },
                PHUONG_TIEN: { rows: [
                    { id: 'pt1', ten: 'Ca nô du lịch Sông Hồng 01', chu: 'Đỗ Anh Tuấn', soDK: 'HN-0921', coQuan: 'Sở Xây dựng Thành phố Hà Nội', cap: 'VR-SB' }
                ] }
            }
        },
        // Hồ sơ chưa ở trạng thái Hoàn thành (dùng để kiểm tra lỗi khi tra cứu)
        '2300999888': {
            soDangKy: '2300999888', loaiDangKy: 'Đăng ký lần đầu', trangThai: 'Chờ duyệt', maKH: 'KH-00210'
        }
    };

    // Giao dịch hủy đã thực hiện (tra cứu theo Số đăng ký hủy khi Khôi phục)
    const HO_SO_HUY = {
        'H26000456': {
            soDangKyHuy: 'H26000456', trangThai: 'Hoàn thành', hinhThucHuy: 'Hủy đăng ký một phần',
            thoiDiemHuy: '20/08/2026 09:00:00', nguoiHuy: 'Lê Văn Thành',
            lyDoHuy: 'Hủy theo yêu cầu của Ngân hàng TMCP Kỹ Thương Việt Nam do Bên thế chấp đã thanh toán phần nghĩa vụ tương ứng với xe Ford Ranger và cổ phiếu VNM.',
            taiSanHuyIds: ['sk2', 'ck1'],
            maDeNghi: 'ĐN-2026/00112', nguoiKy: 'Trần Đình Hưng', vanBan: 'Van_ban_xac_nhan_huy_H26000456.pdf',
            files: [{ ten: 'Cong_van_Techcombank_de_nghi_huy.pdf', size: '0.6 MB' }, { ten: 'Bien_ban_tat_toan_no.pdf', size: '0.3 MB' }],
            snapshot: {
                soDangKy: '2200554433', loaiDangKy: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', maKH: 'KH-00192',
                thoiDiemDangKy: '15/10/2025 08:40:00', thoiDiemHieuLuc: '15/10/2025 10:10:10',
                soDKLanDau: '2200554433', thoiDiemDKLanDau: '15/10/2025 08:40:00', vanBanKetQua: 'Van_ban_chung_nhan_2200554433.pdf',
                nguoiYeuCau: { ten: 'Trần Văn Hoàng', diaChi: 'Số 88 Giải Phóng - Phường Bạch Mai - Thành phố Hà Nội - Việt Nam', taiLieu: '' },
                chung: { coQuan: CO_QUAN[0], loaiHinh: 'Biện pháp bảo đảm', loaiBienPhap: 'Thế chấp', loaiHopDong: '', soHopDong: 'HĐTC-2025/099/TCB', ngayHieuLucHD: '14/10/2025', giaTri: '3.200.000.000', quyMo: 'Bên bảo đảm là công ty có ít hơn 10 nhân viên', chuDNNu: false, mienPhi: false, taiLieuMienPhi: '' },
                bbd: [{ id: 'b1', loaiChuThe: 'Công dân Việt Nam', soGiayTo: '036085002233', ten: 'Trần Văn Hoàng', diaChi: 'Số 88 Giải Phóng - Phường Bạch Mai - Thành phố Hà Nội - Việt Nam' }],
                bnbd: [{ id: 'n1', ten: 'Ngân hàng TMCP Kỹ Thương Việt Nam - Chi nhánh Hai Bà Trưng', diaChi: 'Số 191 Bà Triệu - Phường Hai Bà Trưng - Thành phố Hà Nội - Việt Nam' }],
                taiSan: {
                    SO_KHUNG: { rows: [
                        { id: 'sk1', tenPT: 'Ô tô con', nhanHieu: 'Ford Everest, màu trắng', soKhung: 'MNCLS4D10PW998877', soMay: 'YN2S-998877', bienSo: '30G-666.88' },
                        { id: 'sk2', tenPT: 'Ô tô tải', nhanHieu: 'Ford Ranger Wildtrak, màu cam', soKhung: 'MNCUMFF80PW334455', soMay: 'YN2S-334455', bienSo: '29C-555.22' },
                        { id: 'sk3', tenPT: 'Mô tô, xe gắn máy', nhanHieu: 'Honda SH 160i, màu đen', soKhung: 'RLHKF4204PY112233', soMay: 'KF42E-112233', bienSo: '29E1-123.45' }
                    ] },
                    CHUNG_KHOAN: { rows: [
                        { id: 'ck1', gio: '14', phut: '15', ngay: '12', thang: '10', nam: '2025', file: 'Xac_nhan_VSDC_VNM.pdf' }
                    ] }
                }
            }
        },
        'H26000450': {
            soDangKyHuy: 'H26000450', trangThai: 'Hoàn thành', hinhThucHuy: 'Hủy đăng ký toàn phần',
            thoiDiemHuy: '05/08/2026 15:30:00', nguoiHuy: 'Trần Thị B',
            lyDoHuy: 'Hủy theo Quyết định của Tòa án nhân dân Thành phố Hải Phòng về việc tuyên hợp đồng thế chấp vô hiệu.',
            taiSanHuyIds: ['pt1', 'pt2'],
            maDeNghi: 'ĐN-2026/00098', nguoiKy: 'Lê Hoàng Long', vanBan: 'Van_ban_xac_nhan_huy_H26000450.pdf',
            files: [{ ten: 'Quyet_dinh_TAND_Hai_Phong.pdf', size: '1.2 MB' }],
            snapshot: {
                soDangKy: '2100889900', loaiDangKy: 'Đăng ký lần đầu', trangThai: 'Hoàn thành', maKH: 'KH-00196',
                thoiDiemDangKy: '08/06/2025 09:20:00', thoiDiemHieuLuc: '08/06/2025 11:00:00',
                soDKLanDau: '2100889900', thoiDiemDKLanDau: '08/06/2025 09:20:00', vanBanKetQua: 'Van_ban_chung_nhan_2100889900.pdf',
                nguoiYeuCau: { ten: 'Ngân hàng TMCP Hàng Hải Việt Nam (MSB)', diaChi: 'Số 54A Nguyễn Chí Thanh - Phường Láng - Thành phố Hà Nội - Việt Nam', taiLieu: '' },
                chung: { coQuan: CO_QUAN[0], loaiHinh: 'Biện pháp bảo đảm', loaiBienPhap: 'Thế chấp', loaiHopDong: '', soHopDong: '0607/2025/HĐTC-MSB', ngayHieuLucHD: '07/06/2025', giaTri: '25.000.000.000', quyMo: 'Bên bảo đảm là công ty có từ 300 nhân viên hoặc nhiều hơn', chuDNNu: false, mienPhi: false, taiLieuMienPhi: '' },
                bbd: [{ id: 'b1', loaiChuThe: 'Tổ chức có đăng ký kinh doanh trong nước', soGiayTo: '0200998877', ten: 'Công ty TNHH Vận tải Biển Đông', diaChi: 'Số 3 Lê Thánh Tông - Phường Gia Viên - Thành phố Hải Phòng - Việt Nam' }],
                bnbd: [{ id: 'n1', ten: 'Ngân hàng TMCP Hàng Hải Việt Nam (MSB) - Chi nhánh Hải Phòng', diaChi: 'Số 5 Nguyễn Tri Phương - Phường Hồng Bàng - Thành phố Hải Phòng - Việt Nam' }],
                taiSan: {
                    PHUONG_TIEN: { rows: [
                        { id: 'pt1', ten: 'Tàu Biển Đông Star, vỏ thép', chu: 'Công ty TNHH Vận tải Biển Đông', soDK: 'HP-5501', coQuan: 'Chi cục Hàng hải Hải Phòng', cap: 'VR-SB' },
                        { id: 'pt2', ten: 'Tàu Biển Đông 09, vỏ thép', chu: 'Công ty TNHH Vận tải Biển Đông', soDK: 'HP-5509', coQuan: 'Chi cục Hàng hải Hải Phòng', cap: 'VR-SB' }
                    ] }
                }
            }
        }
    };

    // Tra cứu theo Loại đề nghị: Chỉnh lý → Số đăng ký phiên bản; Hủy → Số đăng ký lần đầu (lấy phiên bản mới nhất); Khôi phục → Số đăng ký hủy
    function lookup(loai, so) {
        const key = (so || '').trim();
        if (loai === 'KHOI_PHUC') {
            const h = HO_SO_HUY[key];
            if (h) return { kind: 'huy', data: h };
            return HO_SO[key] ? { kind: 'hoso', data: HO_SO[key] } : null;
        }
        if (HO_SO[key]) return { kind: 'hoso', data: HO_SO[key] };
        if (HO_SO_HUY[key]) return { kind: 'huy', data: HO_SO_HUY[key] };
        return null;
    }

    // ---------------------------------------------------------------------
    // ĐỀ NGHỊ (state)
    // ---------------------------------------------------------------------
    function buildChinhLyAfter(before, mutate) { const a = clone(before); mutate(a); return a; }

    function seedProposals() {
        const hsA = HO_SO['2300123456-TĐ1'];
        const hsB = HO_SO['2300445566'];
        const hsE = HO_SO['2300776655'];
        const t = hoursAgo;
        const ld = LANH_DAO[0].ten;
        const pd = (h, nguoiTH, yKien) => ({ nguoi: ld, thoiDiem: fmtDateTime(t(h)), nguoiThucHien: nguoiTH, han: fmtDate(daysFromNow(2)), yKien: yKien || '' });
        const files = (...names) => names.map(n => ({ ten: n, size: '0.4 MB' }));

        const afterA = buildChinhLyAfter(hsA, a => {
            a.chung.giaTri = '15.500.000.000';
            a.bbd[1].soGiayTo = '001085012354';
            a.bbd[1].diaChi = 'Số 18A Trần Thái Tông - Phường Cầu Giấy - Thành phố Hà Nội - Việt Nam';
            a.bnbd.push({ id: 'n2', ten: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam - Chi nhánh Hà Thành', diaChi: 'Số 74 Thợ Nhuộm - Phường Cửa Nam - Thành phố Hà Nội - Việt Nam' });
            a.taiSan.SO_KHUNG.rows[0].bienSo = '30K-123.54';
            a.taiSan.SO_KHUNG.rows.splice(2, 1);
            a.taiSan.SO_KHUNG.rows.push({ id: 'sk4', tenPT: 'Ô tô con', nhanHieu: 'Toyota Vios, màu bạc', soKhung: 'MR0EX8CD1J0451133', soMay: '2NR-451133', bienSo: '30G-456.87' });
            a.taiSan.DONG_SAN.moTa = 'Dây chuyền thiết bị trộn bê tông tự động Model BT-150, năm sản xuất 2024, đặt tại kho số 2 Khu công nghiệp Thạch Thất.';
        });
        const afterB = buildChinhLyAfter(hsB, b => {
            b.taiSan.PHUONG_TIEN.rows[1].soDK = 'HP-3352';
            b.chung.soHopDong = '125/2026/HĐCTTC-VTL-NV';
        });
        const afterE = buildChinhLyAfter(hsE, e => {
            e.chung.soHopDong = '0458/2026/HĐCC-VIB-HN';
            e.taiSan.HANG_HOA.soHieuKho = 'Kho số 06';
            e.taiSan.QUYEN.canCu = 'Hợp đồng thi công số 15/2026/HĐTC ngày 12/01/2026 giữa Vũ Thị Hằng Nga và Công ty CP Đầu tư An Phát.';
        });

        const list = [
            { loai: 'CHINH_LY', soDangKy: '2300123456-TĐ1', trangThai: 'Chờ ký số', nguoiLap: 'Nguyễn Văn A', lapH: 30,
              noiDung: { saiSot: 'Sai số giấy tờ và địa chỉ của Bên thế chấp Nguyễn Hữu Thành; sai biển số xe Honda CR-V; sai số khung, biển số xe Toyota Vios; thiếu Bên nhận thế chấp đồng tài trợ BIDV; sai giá trị nghĩa vụ và Model dây chuyền.', deNghi: 'Chỉnh lý số giấy tờ thành 001085012354, địa chỉ Số 18A Trần Thái Tông; biển số 30K-123.54; thay xe Toyota Vios đúng số khung MR0EX8CD1J0451133; bổ sung BIDV Chi nhánh Hà Thành; giá trị 15.500.000.000 VND; Model BT-150.', lyDo: 'Do lỗi nhập liệu của chuyên viên khi tiếp nhận hồ sơ giấy, căn cứ đơn đề nghị đính chính của Ngân hàng Vietcombank ngày 25/09/2026.' },
              files: files('Don_dinh_chinh_Vietcombank.pdf', 'Ban_sao_CCCD_NguyenHuuThanh.pdf'),
              pheDuyet: pd(26, 'Trần Thị B', 'Đối chiếu kỹ hồ sơ giấy gốc trước khi trình ký.'), trinhKyH: 3, lanhDao: 'Lê Hoàng Long',
              chinhLy: { before: clone(hsA), after: afterA } },
            { loai: 'HUY', soDangKy: '2300332211', trangThai: 'Chờ duyệt đề nghị', nguoiLap: 'Lê Văn Thành', lapH: 5,
              noiDung: { lyDoHuy: 'Hủy theo Bản án số 112/2026/DS-ST của Tòa án nhân dân quận Hai Bà Trưng tuyên hợp đồng thế chấp vô hiệu.', taiSanHuyIds: ['sk1', 'pt1'] },
              files: files('Ban_an_112_2026.pdf') },
            { loai: 'HUY', soDangKy: '2300554433', trangThai: 'Chờ thực hiện', nguoiLap: 'Phạm Quốc Huy', lapH: 20,
              noiDung: { lyDoHuy: 'Hủy một phần theo Quyết định của cơ quan thi hành án đối với 02 xe Hyundai HD210 đã được xử lý.', taiSanHuyIds: ['sk1', 'sk2'] },
              files: files('Quyet_dinh_THA_HoangLong.pdf'), pheDuyet: pd(18, 'Phạm Quốc Huy', '') },
            { loai: 'KHOI_PHUC', soDangKy: 'H26000456', trangThai: 'Chờ duyệt đề nghị', nguoiLap: 'Nguyễn Văn A', lapH: 8,
              noiDung: { lyDoKhoiPhuc: 'Quyết định hủy trước đây bị cơ quan có thẩm quyền hủy bỏ theo Quyết định số 45/QĐ-TTĐK ngày 25/09/2026, đề nghị khôi phục hiệu lực việc đăng ký đối với các tài sản đã hủy.' },
              files: files('Quyet_dinh_45_QD-TTDK.pdf') },
            { loai: 'CHINH_LY', soDangKy: '2300445566', trangThai: 'Bị từ chối đề nghị', nguoiLap: 'Nguyễn Văn A', lapH: 50,
              noiDung: { saiSot: 'Sai số hợp đồng cho thuê tài chính.', deNghi: 'Chỉnh lý số hợp đồng thành 125/2026/HĐCTTC-VTL-NV.', lyDo: 'Lỗi nhập liệu.' },
              files: files('Don_de_nghi_chinh_ly.pdf'),
              tuChoi: [{ nguoi: ld, thoiDiem: fmtDateTime(t(40)), lyDo: 'Hồ sơ chưa có văn bản xác nhận của Bên cho thuê tài chính về số hợp đồng đúng. Đề nghị bổ sung trước khi gửi lại.' }] },
            { loai: 'CHINH_LY', soDangKy: '2300445566', trangThai: 'Bị trả lại', nguoiLap: 'Lê Văn Thành', lapH: 72,
              noiDung: { saiSot: 'Sai số đăng ký sà lan Nam Việt 25 và số hợp đồng.', deNghi: 'Chỉnh lý số đăng ký sà lan thành HP-3352, số hợp đồng 125/2026/HĐCTTC-VTL-NV.', lyDo: 'Căn cứ Giấy chứng nhận đăng ký phương tiện thủy nội địa bản gốc.' },
              files: files('GCN_dang_ky_sa_lan.pdf', 'Cong_van_xac_nhan_VTL.pdf'),
              pheDuyet: pd(68, 'Phạm Quốc Huy', 'Lưu ý kiểm tra cả số hợp đồng.'), trinhKyH: 30, lanhDao: 'Lê Hoàng Long',
              traLai: [{ nguoi: 'Lê Hoàng Long', thoiDiem: fmtDateTime(t(24)), lyDo: 'Số đăng ký sà lan theo Giấy chứng nhận là HP-3352, đề nghị kiểm tra lại cấp phương tiện của sà lan trước khi trình ký lại.' }],
              chinhLy: { before: clone(hsB), after: afterB } },
            { loai: 'HUY', soDangKy: '2300332211', trangThai: 'Hoàn thành', nguoiLap: 'Nguyễn Văn A', lapH: 400, soDKHuyMoi: 'H26000470',
              noiDung: { lyDoHuy: 'Hủy theo Quyết định giải quyết thi hành án số 15/QĐ-CCTHA.', taiSanHuyIds: ['sk1', 'pt1'] },
              files: files('Quyet_dinh_thi_hanh_an.pdf'), pheDuyet: pd(390, 'Nguyễn Văn A', ''), trinhKyH: 380, lanhDao: 'Trần Đình Hưng', kySoH: 370 },
            { loai: 'KHOI_PHUC', soDangKy: 'H26000450', trangThai: 'Hoàn thành', nguoiLap: 'Trần Thị B', lapH: 300,
              noiDung: { lyDoKhoiPhuc: 'Theo Bản án phúc thẩm số 12/2026/KDTM-PT hủy Quyết định tuyên hợp đồng thế chấp vô hiệu.' },
              files: files('Ban_an_phuc_tham_12_2026.pdf'), pheDuyet: pd(290, 'Trần Thị B', ''), trinhKyH: 280, lanhDao: 'Lê Hoàng Long', kySoH: 270 },
            { loai: 'CHINH_LY', soDangKy: '2300776655', trangThai: 'Chờ thực hiện', nguoiLap: 'Trần Thị B', lapH: 15,
              noiDung: { saiSot: 'Sai số hiệu kho hàng và ngày ký hợp đồng thi công tại căn cứ phát sinh quyền.', deNghi: 'Chỉnh lý số hiệu kho thành Kho số 06; ngày hợp đồng thi công 12/01/2026.', lyDo: 'Căn cứ biên bản kiểm kê kho và hợp đồng thi công bản gốc.' },
              files: files('Bien_ban_kiem_ke_kho.pdf'), pheDuyet: pd(10, 'Trần Thị B', 'Hoàn thành trước hạn để kịp giải ngân.') },
            { loai: 'HUY', soDangKy: '2300554433', trangThai: 'Chờ ký số', nguoiLap: 'Lê Văn Thành', lapH: 60,
              noiDung: { lyDoHuy: 'Hủy một phần đối với rơ moóc CIMC và chứng khoán theo đề nghị của Ngân hàng SeABank.', taiSanHuyIds: ['sk5', 'ck1'] },
              files: files('Cong_van_SeABank.pdf'), pheDuyet: pd(55, 'Lê Văn Thành', ''), trinhKyH: 6, lanhDao: 'Trần Đình Hưng' },
            { loai: 'CHINH_LY', soDangKy: '2300776655', trangThai: 'Chờ duyệt đề nghị', nguoiLap: 'Đỗ Thu Hà', lapH: 2,
              noiDung: { saiSot: 'Sai số hợp đồng cầm cố.', deNghi: 'Chỉnh lý số hợp đồng thành 0458/2026/HĐCC-VIB-HN.', lyDo: 'Lỗi đánh máy của người yêu cầu đăng ký, có văn bản xác nhận của VIB.' },
              files: files('Van_ban_xac_nhan_VIB.pdf') },
            { loai: 'HUY', soDangKy: '2300332211', trangThai: 'Chờ thực hiện', nguoiLap: 'Trần Thị B', lapH: 28,
              noiDung: { lyDoHuy: 'Hủy toàn phần do đăng ký trùng lặp với hồ sơ số 2300332200.', taiSanHuyIds: ['sk1', 'pt1'] },
              files: files('Bien_ban_rasoat_trung_lap.pdf'), pheDuyet: pd(24, 'Trần Thị B', '') },
            { loai: 'KHOI_PHUC', soDangKy: 'H26000456', trangThai: 'Chờ thực hiện', nguoiLap: 'Lê Văn Thành', lapH: 40,
              noiDung: { lyDoKhoiPhuc: 'Hủy nhầm tài sản do sơ suất đối chiếu biển số, căn cứ biên bản giải trình ngày 22/09/2026.' },
              files: files('Bien_ban_giai_trinh.pdf'), pheDuyet: pd(35, 'Lê Văn Thành', '') },
            { loai: 'CHINH_LY', soDangKy: '2300776655', trangThai: 'Hoàn thành', nguoiLap: 'Phạm Quốc Huy', lapH: 500,
              noiDung: { saiSot: 'Sai số hợp đồng, số hiệu kho và ngày hợp đồng thi công.', deNghi: 'Chỉnh lý theo hồ sơ gốc.', lyDo: 'Đơn đề nghị đính chính của người yêu cầu đăng ký.' },
              files: files('Don_dinh_chinh_HangNga.pdf'), pheDuyet: pd(490, 'Phạm Quốc Huy', ''), trinhKyH: 480, lanhDao: 'Lê Hoàng Long', kySoH: 470,
              chinhLy: { before: clone(hsE), after: afterE } },
            { loai: 'KHOI_PHUC', soDangKy: 'H26000450', trangThai: 'Chờ ký số', nguoiLap: 'Nguyễn Văn A', lapH: 90,
              noiDung: { lyDoKhoiPhuc: 'Khôi phục theo Quyết định giám đốc thẩm số 03/2026/KDTM-GĐT.' },
              files: files('Quyet_dinh_GDT_03_2026.pdf'), pheDuyet: pd(80, 'Nguyễn Văn A', ''), trinhKyH: 4, lanhDao: 'Trần Đình Hưng' },
            { loai: 'CHINH_LY', soDangKy: '2300445566', trangThai: 'Chờ duyệt đề nghị', nguoiLap: 'Nguyễn Văn A', lapH: 100,
              noiDung: { saiSot: 'Sai số đăng ký sà lan Nam Việt 25.', deNghi: 'Chỉnh lý số đăng ký sà lan thành HP-3352.', lyDo: 'Căn cứ Giấy chứng nhận đăng ký phương tiện bản gốc, đã bổ sung xác nhận của Bên cho thuê tài chính.' },
              files: files('GCN_dang_ky_sa_lan.pdf', 'Xac_nhan_Ben_cho_thue.pdf'),
              tuChoi: [{ nguoi: ld, thoiDiem: fmtDateTime(t(90)), lyDo: 'Thiếu văn bản xác nhận của Bên cho thuê tài chính.', thoiDiemGuiLai: fmtDateTime(t(6)) }] },
            { loai: 'HUY', soDangKy: '2300554433', trangThai: 'Bị trả lại', nguoiLap: 'Trần Thị B', lapH: 120,
              noiDung: { lyDoHuy: 'Hủy một phần đối với 02 xe Isuzu FVR34 theo đề nghị của Ngân hàng SeABank.', taiSanHuyIds: ['sk3', 'sk4'] },
              files: files('Cong_van_SeABank_02.pdf'), pheDuyet: pd(110, 'Trần Thị B', ''), trinhKyH: 50, lanhDao: 'Trần Đình Hưng',
              traLai: [{ nguoi: 'Trần Đình Hưng', thoiDiem: fmtDateTime(t(30)), lyDo: 'Văn bản xác nhận hủy ghi sai biển số xe thứ hai, đề nghị kiểm tra lại trước khi trình ký.' }] },
            { loai: 'CHINH_LY', soDangKy: '2300123456-TĐ1', trangThai: 'Chờ ký số', nguoiLap: 'Lê Văn Thành', lapH: 200,
              noiDung: { saiSot: 'Sai giá trị khoản vay.', deNghi: 'Chỉnh lý giá trị khoản vay thành 15.500.000.000 VND.', lyDo: 'Căn cứ phụ lục hợp đồng tín dụng.' },
              files: files('Phu_luc_HDTD.pdf'), pheDuyet: pd(190, 'Lê Văn Thành', ''), trinhKyH: 2, lanhDao: 'Lê Hoàng Long',
              traLai: [{ nguoi: 'Lê Hoàng Long', thoiDiem: fmtDateTime(t(60)), lyDo: 'Đề nghị đính kèm phụ lục hợp đồng tín dụng bản có đóng dấu.', thoiDiemTrinhLai: fmtDateTime(t(2)) }],
              chinhLy: { before: clone(hsA), after: buildChinhLyAfter(hsA, a => {
                  a.chung.giaTri = '15.500.000.000';
                  // Tài sản: 01 dòng sửa thông tin, 01 dòng bổ sung mới, sửa mô tả
                  a.taiSan.SO_KHUNG.rows[1].nhanHieu = 'Howo 8 tấn, màu xanh dương';
                  a.taiSan.SO_KHUNG.rows[1].soMay = 'WD615-8823';
                  a.taiSan.SO_KHUNG.rows.push({ id: 'sk5', tenPT: 'Rơ moóc, sơ mi rơ moóc', nhanHieu: 'CIMC 3 trục, màu trắng', soKhung: 'LJRC12345KM007788', soMay: '', bienSo: '29R-077.88' });
                  a.taiSan.DONG_SAN.moTa = 'Dây chuyền thiết bị trộn bê tông tự động Model BT-120, năm sản xuất 2024, đặt tại kho số 3 Khu công nghiệp Thạch Thất.';
              }) } }
        ];

        return list.map((x, i) => {
            const id = i + 1;
            const lap = t(x.lapH);
            const p = {
                id,
                maDeNghi: `ĐN-2026/${String(180 + id).padStart(5, '0')}`,
                loai: x.loai,
                soDangKy: x.soDangKy,
                nguoiLap: x.nguoiLap,
                donVi: CURRENT_USER.donVi,
                thoiDiemLap: fmtDateTime(lap),
                thoiDiemGui: fmtDateTime(lap),
                trangThai: x.trangThai,
                noiDung: x.noiDung,
                files: x.files,
                tuChoi: x.tuChoi || [],
                traLai: x.traLai || [],
                pheDuyet: x.pheDuyet || null,
                trinhKy: x.trinhKyH ? { nguoi: x.pheDuyet.nguoiThucHien, thoiDiem: fmtDateTime(t(x.trinhKyH)), lanhDao: x.lanhDao } : null,
                kySo: x.kySoH ? { nguoi: x.lanhDao, thoiDiem: fmtDateTime(t(x.kySoH)), hinhThuc: 'USB Token Ban Cơ yếu Chính phủ' } : null,
                chinhLy: x.chinhLy || null,
                soDKHuyMoi: x.soDKHuyMoi || null
            };
            if (p.trinhKy) p.thoiDiemGui = p.trinhKy.thoiDiem;
            return p;
        });
    }

    let _state = null;
    function load() {
        if (_state) return _state;
        try {
            const raw = localStorage.getItem(STORE_KEY);
            if (raw) _state = JSON.parse(raw);
        } catch (e) { _state = null; }
        if (!_state || !Array.isArray(_state.proposals)) {
            _state = { proposals: seedProposals(), nextNo: 300 };
            save();
        }
        return _state;
    }
    function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(_state)); } catch (e) { /* bỏ qua */ } }
    function resetDemo() { localStorage.removeItem(STORE_KEY); _state = null; load(); }
    function proposals() { return load().proposals; }
    function getProposal(id) { return proposals().find(p => p.id === +id) || null; }
    function updateProposal(p) {
        const list = proposals();
        const idx = list.findIndex(x => x.id === p.id);
        if (idx >= 0) list[idx] = p; else list.unshift(p);
        save();
    }
    function nextMaDeNghi() {
        const st = load();
        const no = st.nextNo++;
        save();
        return { id: Date.now(), ma: `ĐN-${new Date().getFullYear()}/${String(no).padStart(5, '0')}` };
    }
    function peekMaDeNghi() { return `ĐN-${new Date().getFullYear()}/${String(load().nextNo).padStart(5, '0')}`; }

    // Hồ sơ gốc của đề nghị: Chỉnh lý/Hủy → hồ sơ theo Số đăng ký; Khôi phục → dữ liệu tại thời điểm hủy
    function hoSoOf(p) {
        if (p.loai === 'KHOI_PHUC') { const h = HO_SO_HUY[p.soDangKy]; return h ? h.snapshot : null; }
        return HO_SO[p.soDangKy] || null;
    }
    function huyOf(p) { return p.loai === 'KHOI_PHUC' ? HO_SO_HUY[p.soDangKy] || null : null; }
    function selectableIds(hs) {
        const ids = [];
        LOAI_TS.forEach(lt => {
            const d = hs.taiSan && hs.taiSan[lt.key];
            if (!d) return;
            if (TABLE_TS.includes(lt.key)) d.rows.forEach(r => ids.push(r.id));
            else ids.push('loai:' + lt.key);   // loại tài sản không có bảng danh sách: tính là 01 tài sản
        });
        return ids;
    }
    function hinhThucHuy(p) {
        if (p.loai !== 'HUY') return '';
        const hs = hoSoOf(p);
        const all = hs ? selectableIds(hs) : [];
        const sel = (p.noiDung && p.noiDung.taiSanHuyIds) || [];
        return all.length && sel.length === all.length ? 'Hủy đăng ký toàn phần' : 'Hủy đăng ký một phần';
    }
    function loaiLabel(p) {
        if (p.loai === 'CHINH_LY') return 'Chỉnh lý thông tin sai sót';
        if (p.loai === 'KHOI_PHUC') return 'Khôi phục hủy đăng ký';
        return hinhThucHuy(p) === 'Hủy đăng ký toàn phần' ? 'Hủy đăng ký (Toàn phần)' : 'Hủy đăng ký (Một phần)';
    }
    function loaiClass(p) {
        if (p.loai === 'CHINH_LY') return 'cl-type-chinhly';
        if (p.loai === 'KHOI_PHUC') return 'cl-type-khoiphuc';
        return hinhThucHuy(p) === 'Hủy đăng ký toàn phần' ? 'cl-type-huytoanphan' : 'cl-type-huymotphan';
    }
    function statusClass(st) {
        return {
            'Chờ duyệt đề nghị': 'cl-st-choduyet', 'Bị từ chối đề nghị': 'cl-st-tuchoi', 'Chờ thực hiện': 'cl-st-chothuchien',
            'Chờ ký số': 'cl-st-choky', 'Bị trả lại': 'cl-st-bitralai', 'Hoàn thành': 'cl-st-hoanthanh'
        }[st] || 'cl-st-neutral';
    }
    function badge(text, cls) { return `<span class="cl-badge ${cls}">${esc(text)}</span>`; }
    function soDangKyLabel(loai) {
        return loai === 'CHINH_LY' ? 'Số đăng ký phiên bản sai sót' : (loai === 'KHOI_PHUC' ? 'Số đăng ký hủy' : 'Số đăng ký');
    }
    function loaiFileChoKy(p) {
        return p.loai === 'CHINH_LY' ? 'Văn bản chỉnh lý' : (p.loai === 'HUY' ? 'Văn bản xác nhận hủy' : 'Quyết định khôi phục đăng ký');
    }
    function nguoiXuLy(p) {
        return ['Chờ duyệt đề nghị', 'Bị từ chối đề nghị'].includes(p.trangThai) ? p.nguoiLap : (p.pheDuyet ? p.pheDuyet.nguoiThucHien : p.nguoiLap);
    }
    function tenDanhSach(list) { return (list || []).map(x => x.ten).join('; '); }

    // ---------------------------------------------------------------------
    // TOAST & THÔNG BÁO CHUYỂN TRANG
    // ---------------------------------------------------------------------
    let toastTimer = null;
    function toast(msg, type) {
        let el = byId('clToast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'clToast';
            el.className = 'cl-toast';
            el.innerHTML = '<i></i><span></span>';
            document.body.appendChild(el);
        }
        el.className = 'cl-toast' + (type === 'error' ? ' cl-toast-error' : (type === 'warn' ? ' cl-toast-warn' : ''));
        el.querySelector('i').className = type === 'error' ? 'fa-solid fa-circle-xmark' : (type === 'warn' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-circle-check');
        el.querySelector('span').textContent = msg;
        requestAnimationFrame(() => el.classList.add('show'));
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('show'), 3800);
    }
    function flash(msg, type) { sessionStorage.setItem(FLASH_KEY, JSON.stringify({ msg, type: type || 'success' })); }
    function showFlash() {
        const raw = sessionStorage.getItem(FLASH_KEY);
        if (!raw) return;
        sessionStorage.removeItem(FLASH_KEY);
        try { const f = JSON.parse(raw); setTimeout(() => toast(f.msg, f.type), 150); } catch (e) { /* bỏ qua */ }
    }
    function goList(msg, type, tab) {
        if (msg) flash(msg, type);
        location.href = 'theo_doi_xu_ly_de_nghi.html' + (tab ? '?tab=' + tab : '');
    }

    // ---------------------------------------------------------------------
    // CÁC THÀNH PHẦN GIAO DIỆN NHỎ
    // ---------------------------------------------------------------------
    function infoItem(label, value, opts) {
        const o = opts || {};
        return `<div class="cl-info-item${o.span ? ' cl-span-all' : ''}"${o.id ? ` id="${o.id}"` : ''}>
            <div class="cl-info-label">${esc(label)}</div>
            <div class="cl-info-value${o.danger ? ' cl-text-danger' : ''}">${o.html ? value : esc(val(value))}</div>
        </div>`;
    }
    function fileLinks(name, withDownload) {
        if (!name) return '-';
        return `<span class="cl-file-name" style="display:inline-flex;gap:6px;align-items:center;"><i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i>${esc(name)}</span>
            <span style="display:inline-flex;gap:12px;margin-left:10px;">
                <a class="cl-link" onclick="CLDK.viewFile('${esc(name)}')"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a>
                ${withDownload ? `<a class="cl-link" onclick="CLDK.downloadFile('${esc(name)}')"><i class="fa-solid fa-download"></i> Tải xuống</a>` : ''}
            </span>`;
    }
    function viewFile(name) {
        const w = window.open('', '_blank');
        if (!w) { toast('Trình duyệt chặn mở tab mới. Vui lòng cho phép cửa sổ bật lên.', 'warn'); return; }
        w.document.write(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${esc(name)}</title></head>
            <body style="margin:0;font-family:Inter,Arial,sans-serif;background:#525659;display:flex;justify-content:center;padding:30px;">
            <div style="background:#fff;width:794px;min-height:1000px;padding:60px;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.4);">
            <div style="color:#64748B;font-size:12px;">Bản xem trước tệp đính kèm (giả lập)</div>
            <h2 style="color:#1E3A8A;word-break:break-all;">${esc(name)}</h2>
            <p style="color:#334155;line-height:1.7;">Nội dung tệp tin đính kèm được hiển thị tại đây khi tích hợp kho lưu trữ tệp của hệ thống.</p>
            </div></body></html>`);
        w.document.close();
    }
    function downloadFile(name) { toast(`Đang tải xuống tệp ${name}`); }

    function collapsible(cardEl) {
        const head = cardEl.querySelector(':scope > .cl-card-header');
        if (!head) return;
        head.classList.add('cl-collapsible');
        if (!head.querySelector('.cl-chevron')) head.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-chevron-down cl-chevron"></i>');
        head.addEventListener('click', e => {
            if (e.target.closest('.cl-no-toggle')) return;
            cardEl.classList.toggle('cl-collapsed');
        });
    }

    // Combobox có tìm kiếm theo Họ và tên hoặc Tên đăng nhập
    function combo(host, cfg) {
        const opts = cfg.options || [];
        host.classList.add('cl-combo');
        host.innerHTML = `<input type="text" class="cl-input cl-combo-input" autocomplete="off" placeholder="${esc(cfg.placeholder || 'Chọn...')}">
            <i class="fa-solid fa-chevron-down cl-combo-caret"></i><div class="cl-combo-list"></div>`;
        const input = host.querySelector('input');
        const listEl = host.querySelector('.cl-combo-list');
        let value = '';
        const labelOf = v => { const o = opts.find(x => x.value === v); return o ? o.label : ''; };
        function render(filter) {
            const q = (filter || '').trim().toLowerCase();
            const items = opts.filter(o => !q || (o.label + ' ' + (o.search || '') + ' ' + (o.sub || '')).toLowerCase().includes(q));
            listEl.innerHTML = items.length ? items.map(o => `<div class="cl-combo-option${o.value === value ? ' active' : ''}" data-v="${esc(o.value)}">
                    <div>${esc(o.label)}</div>${o.sub ? `<div class="cl-opt-sub">${esc(o.sub)}</div>` : ''}</div>`).join('')
                : '<div class="cl-combo-empty">Không có kết quả phù hợp</div>';
        }
        function set(v) {
            value = v || '';
            input.value = labelOf(value);
            if (value) setInvalid(false);
            if (cfg.onChange) cfg.onChange(value);
        }
        function setInvalid(on) {
            input.classList.toggle('is-invalid', !!on);
            if (cfg.errorEl) cfg.errorEl.classList.toggle('show', !!on);
        }
        input.addEventListener('focus', () => { host.classList.add('open'); input.select(); render(''); });
        input.addEventListener('input', () => { host.classList.add('open'); render(input.value); });
        input.addEventListener('blur', () => setTimeout(() => {
            host.classList.remove('open');
            if (!input.value.trim()) { value = ''; if (cfg.onChange) cfg.onChange(''); } else input.value = labelOf(value);
        }, 150));
        listEl.addEventListener('mousedown', e => {
            const o = e.target.closest('.cl-combo-option');
            if (!o) return;
            e.preventDefault();
            set(o.getAttribute('data-v'));
            host.classList.remove('open');
            input.blur();
        });
        set(cfg.value || '');
        return { get: () => value, set, setInvalid, focus: () => input.focus(), input };
    }
    function peopleOptions(list) {
        return list.map(x => ({ value: x.ten, label: `${x.ten} (${x.tenDangNhap})`, sub: x.chucVu, search: x.tenDangNhap }));
    }

    function datePicker(input, defVal) {
        if (defVal) input.value = defVal;
        if (global.flatpickr) global.flatpickr(input, { dateFormat: 'd/m/Y', allowInput: true, defaultDate: defVal || null });
    }

    // ---------------------------------------------------------------------
    // KHỐI THÔNG TIN HỒ SƠ GỐC (MH02 khối IV và các màn dùng lại)
    // opts: { loai, checkbox:bool, checked:Set, disabledChecks:bool, onlyIds:Set|null, onChange:fn }
    // ---------------------------------------------------------------------
    function renderHoSo(host, hs, opts) {
        const o = Object.assign({ loai: 'CHINH_LY', checkbox: false, checked: new Set(), disabledChecks: false, onlyIds: null }, opts || {});
        const c = hs.chung || {};
        const titles = partyTitles(c);
        const uid = 'hs' + Math.random().toString(36).slice(2, 8);
        const chungItems = [];
        chungItems.push(infoItem('Số đăng ký', hs.soDangKy));
        chungItems.push(infoItem('Thời điểm đăng ký', hs.thoiDiemDangKy));
        chungItems.push(infoItem('Thời điểm có hiệu lực', hs.thoiDiemHieuLuc));
        if (o.loai === 'HUY') {
            chungItems.push(infoItem('Số đăng ký lần đầu', hs.soDKLanDau));
            chungItems.push(infoItem('Thời điểm đăng ký lần đầu', hs.thoiDiemDKLanDau));
        }
        chungItems.push(infoItem('Loại hình giao dịch', c.loaiHinh));
        chungItems.push(infoItem('Loại biện pháp / Loại hợp đồng', c.loaiHinh === 'Hợp đồng' ? c.loaiHopDong : c.loaiBienPhap));
        chungItems.push(infoItem('Số hợp đồng', c.soHopDong));
        chungItems.push(infoItem('Ngày có hiệu lực của hợp đồng', c.ngayHieuLucHD));
        chungItems.push(infoItem('Giá trị khoản vay hoặc nghĩa vụ (VND)', c.giaTri));
        chungItems.push(infoItem('Quy mô', c.quyMo));
        chungItems.push(infoItem('Chủ doanh nghiệp là nữ giới?', c.chuDNNu ? 'Có' : 'Không'));

        const partyTable = (rows, cols) => `<div class="cl-table-wrap"><table class="cl-table"><thead><tr><th class="cl-center" style="width:50px;">STT</th>
            ${cols.map(cc => `<th>${esc(cc.label)}</th>`).join('')}</tr></thead><tbody>
            ${rows.length ? rows.map((r, i) => `<tr><td class="cl-center">${i + 1}</td>${cols.map(cc => `<td${cc.bold ? ' style="font-weight:600;"' : ''}>${esc(val(r[cc.key]))}</td>`).join('')}</tr>`).join('')
                : `<tr class="cl-empty-row"><td colspan="${cols.length + 1}">${esc(MSG.INF_SYS_001)}</td></tr>`}
            </tbody></table></div>`;

        const ts = hs.taiSan || {};
        const assetHtml = [];
        LOAI_TS.forEach(lt => {
            const data = ts[lt.key];
            if (!data) return;
            const isTable = TABLE_TS.includes(lt.key);
            let rows = isTable ? data.rows : null;
            if (o.onlyIds) {
                if (!isTable) { if (!o.onlyIds.has('loai:' + lt.key)) return; }
                else {
                rows = rows.filter(r => o.onlyIds.has(r.id));
                if (!rows.length) return;
                }
            }
            let body = '';
            if (lt.key === 'CAY' || lt.key === 'DONG_SAN') {
                body = `<div class="cl-info-grid cl-cols-2">${infoItem('Mô tả', data.moTa, { span: true })}</div>`;
            } else if (lt.key === 'QUYEN') {
                body = `<div class="cl-info-grid cl-cols-2">${infoItem('Tên quyền', data.tenQuyen)}${infoItem('Căn cứ phát sinh quyền', data.canCu)}</div>`;
            } else if (lt.key === 'HANG_HOA') {
                body = `<div class="cl-info-grid cl-cols-2">${infoItem('Hàng hóa luân chuyển / Kho hàng', data.kieu)}${infoItem('Giá trị hàng hóa/Tên, loại hàng hóa', data.giaTri)}
                    ${data.kieu === 'Kho hàng' ? infoItem('Địa chỉ kho hàng', data.diaChiKho) + infoItem('Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng', data.soHieuKho) : ''}</div>`;
            } else {
                const cols = COLS[lt.key];
                const tableTitle = lt.key === 'SO_KHUNG' ? 'Số khung' : (lt.key === 'PHUONG_TIEN' ? 'Phương tiện' : 'Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam');
                let qs = '';
                if (lt.key === 'SO_KHUNG') {
                    qs = `<div class="cl-quick-search" data-qs="${uid}-${lt.key}">
                        ${['Tên phương tiện', 'Số khung', 'Số máy', 'Biển số'].map((l, i) => `<div class="cl-form-group"><label class="cl-label">${l}</label><input class="cl-input" data-qk="${['tenPT', 'soKhung', 'soMay', 'bienSo'][i]}" placeholder="Nhập ${l.toLowerCase()}..."></div>`).join('')}
                        <div class="cl-qs-actions"><button type="button" class="cl-btn cl-btn-primary cl-btn-sm" data-qs-search><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                        <button type="button" class="cl-btn cl-btn-outline cl-btn-sm" data-qs-clear title="Xóa lọc"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa lọc</button></div></div>`;
                } else if (lt.key === 'PHUONG_TIEN') {
                    qs = `<div class="cl-quick-search cl-qs-3" data-qs="${uid}-${lt.key}">
                        ${['Tên phương tiện', 'Tên chủ phương tiện', 'Số đăng ký'].map((l, i) => `<div class="cl-form-group"><label class="cl-label">${l}</label><input class="cl-input" data-qk="${['ten', 'chu', 'soDK'][i]}" placeholder="Nhập ${l.toLowerCase()}..."></div>`).join('')}
                        <div class="cl-qs-actions"><button type="button" class="cl-btn cl-btn-primary cl-btn-sm" data-qs-search><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                        <button type="button" class="cl-btn cl-btn-outline cl-btn-sm" data-qs-clear title="Xóa lọc"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa lọc</button></div></div>`;
                }
                const showChk = o.checkbox;
                body = `<div style="font-weight:600;font-size:12.5px;margin-bottom:6px;">${esc(tableTitle)}</div>${qs}
                    <div class="cl-table-wrap"><table class="cl-table" data-ts-table="${lt.key}"><thead><tr>
                    ${showChk ? `<th class="cl-center" style="width:42px;"><input type="checkbox" data-chk-all="${lt.key}" title="Chọn tất cả" ${o.disabledChecks ? 'disabled' : ''}></th>` : ''}
                    <th class="cl-center" style="width:50px;">STT</th>${cols.map(cc => `<th${cc.center ? ' class="cl-center"' : ''}>${esc(cc.label)}</th>`).join('')}</tr></thead><tbody>
                    ${rows.map((r, i) => `<tr data-row-id="${r.id}" data-search="${esc(JSON.stringify(r))}">
                        ${showChk ? `<td class="cl-center"><input type="checkbox" class="cl-chk-ts" value="${r.id}" ${o.checked.has(r.id) ? 'checked' : ''} ${o.disabledChecks ? 'disabled' : ''}></td>` : ''}
                        <td class="cl-center">${i + 1}</td>
                        ${cols.map(cc => cc.file ? `<td>${fileLinks(r[cc.key], true)}</td>` : `<td${cc.center ? ' class="cl-center"' : ''}${cc.bold ? ' style="font-weight:700;"' : ''}>${esc(val(r[cc.key]))}</td>`).join('')}
                    </tr>`).join('')}
                    <tr class="cl-empty-row cl-hidden" data-empty><td colspan="${cols.length + 1 + (showChk ? 1 : 0)}">${esc(MSG.INF_SYS_001)}</td></tr>
                    </tbody></table></div>`;
            }
            assetHtml.push(`<div class="cl-asset-block" data-asset-type="${lt.key}"><div class="cl-asset-type-title">${o.checkbox && !isTable ? `<input type="checkbox" class="cl-chk-ts" value="loai:${lt.key}" title="Chọn hủy toàn bộ loại tài sản này" style="width:15px;height:15px;margin-right:8px;vertical-align:-2px;cursor:pointer;" ${o.checked.has('loai:' + lt.key) ? 'checked' : ''} ${o.disabledChecks ? 'disabled' : ''}>` : '<i class="fa-solid fa-caret-right"></i>'}${esc(lt.ten)}</div>${body}</div>`);
        });

        host.innerHTML = `
            <div class="cl-sub-block"><div class="cl-sub-title"><span><i class="fa-solid fa-file-contract"></i> 1. Thông tin chung hồ sơ gốc</span></div>
                <div class="cl-info-grid">${chungItems.join('')}</div></div>
            <div class="cl-sub-block"><div class="cl-sub-title"><span><i class="fa-solid fa-user-shield"></i> 2. ${esc(titles.bbd)}</span></div>${partyTable(hs.bbd || [], COLS.bbd)}</div>
            <div class="cl-sub-block"><div class="cl-sub-title"><span><i class="fa-solid fa-building-columns"></i> 3. ${esc(titles.bnbd)}</span></div>${partyTable(hs.bnbd || [], COLS.bnbd)}</div>
            <div class="cl-sub-block"><div class="cl-sub-title"><span><i class="fa-solid fa-boxes-stacked"></i> 4. ${esc(titles.ts)}</span><span data-hinh-thuc></span></div>
                ${assetHtml.length ? assetHtml.join('') : `<div class="cl-banner cl-banner-muted">${esc(MSG.INF_SYS_001)}</div>`}</div>`;

        // Tìm kiếm nhanh: chỉ lọc danh sách đang hiển thị, không làm mất trạng thái checkbox
        host.querySelectorAll('.cl-quick-search').forEach(qs => {
            const table = qs.parentElement.querySelector('table');
            const apply = clear => {
                const crit = {};
                qs.querySelectorAll('input[data-qk]').forEach(inp => { if (clear) inp.value = ''; if (inp.value.trim()) crit[inp.getAttribute('data-qk')] = inp.value.trim().toLowerCase(); });
                let shown = 0;
                table.querySelectorAll('tbody tr[data-row-id]').forEach(tr => {
                    const r = JSON.parse(tr.getAttribute('data-search'));
                    const ok = Object.keys(crit).every(k => String(r[k] || '').toLowerCase().includes(crit[k]));
                    tr.classList.toggle('cl-hidden', !ok);
                    if (ok) shown++;
                });
                table.querySelector('tr[data-empty]').classList.toggle('cl-hidden', shown > 0);
            };
            qs.querySelector('[data-qs-search]').addEventListener('click', () => apply(false));
            qs.querySelector('[data-qs-clear]').addEventListener('click', () => apply(true));
        });

        // Checkbox chọn tài sản đề nghị hủy
        function getChecked() { return Array.from(host.querySelectorAll('.cl-chk-ts:checked')).map(x => x.value); }
        function sync() {
            host.querySelectorAll('[data-chk-all]').forEach(all => {
                const boxes = host.querySelectorAll(`table[data-ts-table="${all.getAttribute('data-chk-all')}"] .cl-chk-ts`);
                const n = Array.from(boxes).filter(b => b.checked).length;
                all.checked = n > 0 && n === boxes.length;
                all.indeterminate = n > 0 && n < boxes.length;
            });
            if (o.onChange) o.onChange(getChecked());
        }
        if (o.checkbox) {
            host.querySelectorAll('[data-chk-all]').forEach(all => all.addEventListener('change', () => {
                host.querySelectorAll(`table[data-ts-table="${all.getAttribute('data-chk-all')}"] .cl-chk-ts`).forEach(b => { b.checked = all.checked; });
                sync();
            }));
            host.querySelectorAll('.cl-chk-ts').forEach(b => b.addEventListener('change', sync));
            sync();
        }
        return {
            getChecked,
            setHinhThuc: html => { const el = host.querySelector('[data-hinh-thuc]'); if (el) el.innerHTML = html; },
            allIds: () => selectableIds(hs)
        };
    }

    // ---------------------------------------------------------------------
    // KHỐI THÔNG TIN GIAO DỊCH HỦY ĐÃ THỰC HIỆN TRƯỚC ĐÂY (bố cục Xem chi tiết phiên bản)
    // ---------------------------------------------------------------------
    function renderGiaoDichHuy(host, h) {
        const hs = h.snapshot;
        const c = hs.chung || {};
        const titles = partyTitles(c);
        const huyIds = new Set(h.taiSanHuyIds || []);
        const tagHuy = '<span class="cl-tag cl-tag-removed"><i class="fa-solid fa-ban"></i> Đã hủy</span>';
        const tagBD = '<span class="cl-badge cl-st-neutral" style="font-size:11px;padding:2px 8px;">Đang bảo đảm</span>';
        const htCls = h.hinhThucHuy === 'Hủy đăng ký toàn phần' ? 'cl-type-huytoanphan' : 'cl-type-huymotphan';
        const sub = (n, title, icon, inner) => `<div class="cl-sub-block"><div class="cl-sub-title"><span><i class="fa-solid ${icon}"></i> ${n}. ${esc(title)}</span></div>${inner}</div>`;
        const table = (rows, cols, withStatus) => `<div class="cl-table-wrap"><table class="cl-table"><thead><tr><th class="cl-center" style="width:50px;">STT</th>
            ${cols.map(cc => `<th${cc.center ? ' class="cl-center"' : ''}>${esc(cc.label)}</th>`).join('')}${withStatus ? '<th>Trạng thái</th>' : ''}</tr></thead><tbody>
            ${rows.length ? rows.map((r, i) => {
                const huy = withStatus && huyIds.has(r.id);
                return `<tr${huy ? ' style="background:#FEF2F2;"' : ''}><td class="cl-center">${i + 1}</td>
                ${cols.map(cc => cc.file ? `<td>${fileLinks(r[cc.key], true)}</td>` : `<td${cc.center ? ' class="cl-center"' : ''}${cc.bold ? ' style="font-weight:600;"' : ''}>${esc(val(r[cc.key]))}</td>`).join('')}
                ${withStatus ? `<td>${huy ? tagHuy : tagBD}</td>` : ''}</tr>`;
            }).join('') : `<tr class="cl-empty-row"><td colspan="${cols.length + 2}">${esc(MSG.INF_SYS_001)}</td></tr>`}</tbody></table></div>`;

        const ts = hs.taiSan || {};
        const assets = LOAI_TS.filter(lt => ts[lt.key]).map(lt => {
            const d = ts[lt.key];
            let inner;
            if (TABLE_TS.includes(lt.key)) {
                const tt = lt.key === 'SO_KHUNG' ? 'Số khung' : (lt.key === 'PHUONG_TIEN' ? 'Phương tiện' : 'Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam');
                inner = `<div style="font-weight:600;font-size:12.5px;margin-bottom:6px;">${esc(tt)}</div>${table(d.rows, COLS[lt.key], true)}`;
            } else {
                const status = `<div style="margin:-4px 0 8px 0;">${huyIds.has('loai:' + lt.key) ? tagHuy : tagBD}</div>`;
                if (lt.key === 'QUYEN') inner = status + `<div class="cl-info-grid cl-cols-2">${infoItem('Tên quyền', d.tenQuyen)}${infoItem('Căn cứ phát sinh quyền', d.canCu)}</div>`;
                else if (lt.key === 'HANG_HOA') inner = status + `<div class="cl-info-grid cl-cols-2">${infoItem('Hàng hóa luân chuyển / Kho hàng', d.kieu)}${infoItem('Giá trị hàng hóa/Tên, loại hàng hóa', d.giaTri)}
                    ${d.kieu === 'Kho hàng' ? infoItem('Địa chỉ kho hàng', d.diaChiKho) + infoItem('Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng', d.soHieuKho) : ''}</div>`;
                else inner = status + `<div class="cl-info-grid cl-cols-2">${infoItem('Mô tả', d.moTa, { span: true })}</div>`;
            }
            return `<div class="cl-asset-block"><div class="cl-asset-type-title"><i class="fa-solid fa-caret-right"></i>${esc(lt.ten)}</div>${inner}</div>`;
        }).join('');

        host.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;border-bottom:2px solid #E2E8F0;padding-bottom:10px;margin-bottom:14px;">
                <div><div style="font-size:14.5px;font-weight:700;color:#1E3A8A;">Hủy đăng ký - Trạng thái: ${esc(h.trangThai)}</div>
                <div class="cl-muted" style="font-size:12.5px;">Số đăng ký: ${esc(h.soDangKyHuy)} | Thời điểm đăng ký: ${esc(h.thoiDiemHuy)}</div></div>
                ${badge(h.hinhThucHuy, htCls)}
            </div>
            ${sub(1, 'Thông tin hồ sơ', 'fa-file-invoice', `<div class="cl-info-grid">
                ${infoItem('Loại đăng ký', 'Hủy đăng ký')}${infoItem('Số đăng ký hủy', h.soDangKyHuy)}${infoItem('Thời điểm thực hiện hủy', h.thoiDiemHuy)}
                ${infoItem('Trạng thái hồ sơ', badge(h.trangThai, statusClass(h.trangThai)), { html: true })}${infoItem('Số đăng ký lần đầu', hs.soDKLanDau)}${infoItem('Thời điểm đăng ký lần đầu', hs.thoiDiemDKLanDau)}
                ${infoItem('Văn bản xác nhận hủy', h.vanBan ? `<a class="cl-link" onclick="CLDK.viewFile('${esc(h.vanBan)}')"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a>` : '-', { html: true })}</div>`)}
            ${sub(2, 'Thông tin hủy đăng ký', 'fa-ban', `<div class="cl-info-grid">
                ${infoItem('Mã đề nghị hủy', h.maDeNghi)}${infoItem('Hình thức hủy', badge(h.hinhThucHuy, htCls), { html: true })}${infoItem('Người thực hiện hủy', h.nguoiHuy)}
                ${infoItem('Người ký duyệt', h.nguoiKy)}${infoItem('Lý do đã hủy trước đây', h.lyDoHuy, { span: true })}</div>
                <div class="cl-info-item"><div class="cl-info-label">Tệp tin đính kèm của đề nghị hủy</div>
                ${(h.files || []).length ? `<div class="cl-file-list cl-mt-0">${h.files.map(f => `<div class="cl-file-item">${fileLinks(f.ten, true)}</div>`).join('')}</div>` : '<div class="cl-info-value">-</div>'}</div>`)}
            ${sub(3, 'Thông tin chung & Nghĩa vụ được bảo đảm', 'fa-file-contract', `<div class="cl-info-grid">
                ${infoItem('Loại hình giao dịch', c.loaiHinh)}${infoItem('Loại biện pháp / Loại hợp đồng', c.loaiHinh === 'Hợp đồng' ? c.loaiHopDong : c.loaiBienPhap)}${infoItem('Số hợp đồng', c.soHopDong)}
                ${infoItem('Ngày có hiệu lực của hợp đồng', c.ngayHieuLucHD)}${infoItem('Giá trị khoản vay hoặc nghĩa vụ (VND)', c.giaTri)}${infoItem('Quy mô', c.quyMo)}
                ${infoItem('Chủ doanh nghiệp là nữ giới?', c.chuDNNu ? 'Có' : 'Không')}</div>`)}
            ${sub(4, titles.bbd, 'fa-user-shield', table(hs.bbd || [], COLS.bbd, false))}
            ${sub(5, titles.bnbd, 'fa-building-columns', table(hs.bnbd || [], COLS.bnbd, false))}
            ${sub(6, titles.ts, 'fa-boxes-stacked', assets || `<div class="cl-banner cl-banner-muted">${esc(MSG.INF_SYS_001)}</div>`)}`;
    }

    // ---------------------------------------------------------------------
    // SO SÁNH DỮ LIỆU TRƯỚC / SAU CHỈNH LÝ
    // ---------------------------------------------------------------------
    function diffRows(beforeRows, afterRows, cols) {
        const b = beforeRows || [];
        const a = afterRows || [];
        const out = [];
        a.forEach(r => {
            const old = b.find(x => x.id === r.id);
            if (!old) { out.push({ row: r, status: 'added', changed: {} }); return; }
            const changed = {};
            cols.forEach(cc => { if ((old[cc.key] || '') !== (r[cc.key] || '')) changed[cc.key] = old[cc.key]; });
            out.push({ row: r, status: Object.keys(changed).length ? 'modified' : 'same', changed });
        });
        b.forEach((r, i) => {
            if (!a.find(x => x.id === r.id)) {
                // Giữ vị trí dòng đã xóa gần vị trí cũ
                const pos = Math.min(i, out.length);
                out.splice(pos, 0, { row: r, status: 'removed', changed: {} });
            }
        });
        return out;
    }
    const TAG = {
        modified: '<span class="cl-tag cl-tag-modified"><i class="fa-solid fa-pen"></i> Sửa thông tin</span>',
        added: '<span class="cl-tag cl-tag-added"><i class="fa-solid fa-plus"></i> Bổ sung mới</span>',
        removed: '<span class="cl-tag cl-tag-removed"><i class="fa-solid fa-minus"></i> Đã xóa</span>'
    };
    function histIcon(oldVal) {
        return `<span class="cl-hist"><i class="fa-solid fa-clock-rotate-left"></i><span class="cl-hist-pop">Giá trị trước chỉnh lý: ${esc(oldVal === '' || oldVal === null || oldVal === undefined ? '(Để trống)' : oldVal)}</span></span>`;
    }
    function countChanges(before, after) {
        let n = 0;
        CHUNG_FIELDS.forEach(f => { if ((before.chung[f.key] || '') !== (after.chung[f.key] || '')) n++; });
        n += diffRows(before.bbd, after.bbd, COLS.bbd).filter(d => d.status !== 'same').length;
        n += diffRows(before.bnbd, after.bnbd, COLS.bnbd).filter(d => d.status !== 'same').length;
        LOAI_TS.forEach(lt => {
            const b = before.taiSan[lt.key], a = after.taiSan[lt.key];
            if (!b && !a) return;
            if (!b || !a) { n++; return; }
            if (TABLE_TS.includes(lt.key)) n += diffRows(b.rows, a.rows, COLS[lt.key]).filter(d => d.status !== 'same').length;
            else Object.keys(a).forEach(k => { if ((a[k] || '') !== (b[k] || '')) n++; });
        });
        return n;
    }

    // ---------------------------------------------------------------------
    // POPUP DÙNG CHUNG
    // ---------------------------------------------------------------------
    function modalShell(id, title, icon, bodyHtml, footerHtml, maxW) {
        return `<div class="cl-modal-overlay" id="${id}"><div class="cl-modal" style="max-width:${maxW || 640}px;">
            <div class="cl-modal-header"><h3>${icon}<span data-title>${title}</span></h3>
                <button type="button" class="cl-modal-close" data-close title="Đóng"><i class="fa-solid fa-xmark"></i></button></div>
            <div class="cl-modal-body">${bodyHtml}</div>
            <div class="cl-modal-footer">${footerHtml}</div></div></div>`;
    }
    function ensureModal(id, html) {
        let el = byId(id);
        if (el) return el;
        document.body.insertAdjacentHTML('beforeend', html);
        el = byId(id);
        el.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(id)));
        return el;
    }
    function openModal(id) { byId(id).classList.add('active'); }
    function closeModal(id) { const el = byId(id); if (el) el.classList.remove('active'); }

    // Xác nhận chung (Popup Custom Modal)
    function confirmBox(message, okLabel) {
        const el = ensureModal('clConfirm', modalShell('clConfirm', 'Xác nhận', '<i class="fa-solid fa-circle-question" style="color:#F59E0B;"></i>',
            '<div data-msg style="font-size:13.5px;"></div>',
            '<button type="button" class="cl-btn cl-btn-outline" data-cancel>Hủy</button><button type="button" class="cl-btn cl-btn-primary" data-ok>Đồng ý</button>', 480));
        el.classList.add('cl-top');
        el.querySelector('[data-msg]').textContent = message;
        el.querySelector('[data-ok]').textContent = okLabel || 'Đồng ý';
        openModal('clConfirm');
        return new Promise(resolve => {
            const done = r => { closeModal('clConfirm'); ok.removeEventListener('click', onOk); cancel.removeEventListener('click', onCancel); resolve(r); };
            const ok = el.querySelector('[data-ok]');
            const cancel = el.querySelector('[data-cancel]');
            const onOk = () => done(true);
            const onCancel = () => done(false);
            ok.addEventListener('click', onOk);
            cancel.addEventListener('click', onCancel);
        });
    }

    function readonlyBox(items) { return `<div class="cl-readonly-box"><div class="cl-info-grid cl-cols-${items.length > 2 ? 3 : 2}" style="${items.length > 2 ? 'grid-template-columns:repeat(3,minmax(0,1fr));' : ''}">${items.join('')}</div></div>`; }
    function textareaGroup(id, label, placeholder) {
        return `<div class="cl-form-group"><label class="cl-label" for="${id}">${label} <span class="cl-req">*</span></label>
            <textarea class="cl-textarea" id="${id}" rows="3" placeholder="${esc(placeholder)}"></textarea>
            <div class="cl-error" id="${id}Err">${esc(MSG.VAL_001)}</div></div>`;
    }
    function requireText(id) {
        const el = byId(id);
        const ok = !!el.value.trim();
        el.classList.toggle('is-invalid', !ok);
        byId(id + 'Err').classList.toggle('show', !ok);
        if (!ok) el.focus();
        return ok;
    }

    // MH04 - Popup Duyệt đề nghị và Phân công người thực hiện
    let duyetCombo = null;
    function openDuyet(p, done) {
        const el = ensureModal('clMH04', modalShell('clMH04', '', '<i class="fa-solid fa-check-to-slot" style="color:#10B981;"></i>',
            `<div data-ro></div>
            <div class="cl-form-group"><label class="cl-label">Người thực hiện <span class="cl-req">*</span></label><div id="clMH04Combo"></div>
                <div class="cl-error" id="clMH04ComboErr">${esc(MSG.VAL_001)}</div></div>
            <div class="cl-form-group"><label class="cl-label" for="clMH04Han">Hạn hoàn thành</label><input type="text" class="cl-input" id="clMH04Han" placeholder="dd/mm/yyyy"></div>
            <div class="cl-form-group"><label class="cl-label" for="clMH04YKien">Ý kiến chỉ đạo</label><textarea class="cl-textarea" id="clMH04YKien" rows="3" placeholder="Nhập ý kiến chỉ đạo..."></textarea></div>`,
            '<button type="button" class="cl-btn cl-btn-outline" data-close>Hủy bỏ</button><button type="button" class="cl-btn cl-btn-success" data-ok><i class="fa-solid fa-check"></i> Xác nhận duyệt</button>', 640));
        el.querySelector('[data-title]').textContent = `Phê duyệt đề nghị: ${p.maDeNghi}`;
        el.querySelector('[data-ro]').innerHTML = readonlyBox([infoItem('Mã đề nghị', p.maDeNghi), infoItem('Loại đề nghị', loaiLabel(p)), infoItem('Người lập đề nghị', p.nguoiLap)]);
        duyetCombo = combo(byId('clMH04Combo'), { options: peopleOptions(CAN_BO), value: p.nguoiLap, placeholder: 'Tìm theo Họ và tên hoặc Tên đăng nhập...', errorEl: byId('clMH04ComboErr') });
        const han = byId('clMH04Han');
        if (han._flatpickr) han._flatpickr.destroy();
        datePicker(han, fmtDate(daysFromNow(3)));
        byId('clMH04YKien').value = '';
        const ok = el.querySelector('[data-ok]');
        ok.onclick = () => {
            const nguoi = duyetCombo.get();
            if (!nguoi) { duyetCombo.setInvalid(true); duyetCombo.focus(); return; }
            const cur = getProposal(p.id);
            if (!cur || cur.trangThai !== 'Chờ duyệt đề nghị') { closeModal('clMH04'); toast(MSG.ERR_DK_005, 'error'); return; }
            cur.trangThai = 'Chờ thực hiện';
            cur.pheDuyet = { nguoi: LANH_DAO[0].ten, thoiDiem: fmtDateTime(new Date()), nguoiThucHien: nguoi, han: han.value.trim(), yKien: byId('clMH04YKien').value.trim() };
            updateProposal(cur);
            closeModal('clMH04');
            if (done) done(cur, MSG.SUC_CLDK_002(nguoi));
        };
        openModal('clMH04');
    }

    // MH05 - Popup Từ chối đề nghị
    function openTuChoi(p, done) {
        const el = ensureModal('clMH05', modalShell('clMH05', '', '<i class="fa-solid fa-ban" style="color:#EF4444;"></i>',
            `<div data-ro></div>${textareaGroup('clMH05LyDo', 'Lý do từ chối', 'Nhập chi tiết lý do từ chối đề nghị...')}`,
            '<button type="button" class="cl-btn cl-btn-outline" data-close>Hủy bỏ</button><button type="button" class="cl-btn cl-btn-danger" data-ok><i class="fa-solid fa-ban"></i> Xác nhận từ chối</button>', 600));
        el.querySelector('[data-title]').textContent = `Từ chối phê duyệt đề nghị: ${p.maDeNghi}`;
        el.querySelector('[data-ro]').innerHTML = readonlyBox([infoItem('Mã đề nghị', p.maDeNghi), infoItem('Người lập đề nghị', p.nguoiLap)]);
        const ta = byId('clMH05LyDo');
        ta.value = ''; ta.classList.remove('is-invalid'); byId('clMH05LyDoErr').classList.remove('show');
        el.querySelector('[data-ok]').onclick = () => {
            if (!requireText('clMH05LyDo')) return;
            const cur = getProposal(p.id);
            if (!cur || cur.trangThai !== 'Chờ duyệt đề nghị') { closeModal('clMH05'); toast(MSG.ERR_DK_005, 'error'); return; }
            cur.trangThai = 'Bị từ chối đề nghị';
            cur.tuChoi = cur.tuChoi || [];
            cur.tuChoi.push({ nguoi: LANH_DAO[0].ten, thoiDiem: fmtDateTime(new Date()), lyDo: ta.value.trim() });
            updateProposal(cur);
            closeModal('clMH05');
            if (done) done(cur, MSG.SUC_CLDK_003(cur.maDeNghi));
        };
        openModal('clMH05');
        setTimeout(() => ta.focus(), 50);
    }

    // MH08 - Popup Trả lại hồ sơ
    function openTraLai(p, done) {
        const el = ensureModal('clMH08', modalShell('clMH08', '', '<i class="fa-solid fa-rotate-left" style="color:#EF4444;"></i>',
            `<div data-ro></div>${textareaGroup('clMH08LyDo', 'Lý do trả lại', 'Nhập chi tiết sai sót, lý do trả lại để người thực hiện chỉnh sửa lại...')}`,
            '<button type="button" class="cl-btn cl-btn-outline" data-close>Hủy bỏ</button><button type="button" class="cl-btn cl-btn-danger" data-ok><i class="fa-solid fa-rotate-left"></i> Xác nhận trả lại</button>', 600));
        el.querySelector('[data-title]').textContent = `Trả lại hồ sơ trình ký: ${p.maDeNghi}`;
        el.querySelector('[data-ro]').innerHTML = readonlyBox([infoItem('Mã đề nghị', p.maDeNghi), infoItem('Người thực hiện', p.pheDuyet ? p.pheDuyet.nguoiThucHien : '')]);
        const ta = byId('clMH08LyDo');
        ta.value = ''; ta.classList.remove('is-invalid'); byId('clMH08LyDoErr').classList.remove('show');
        el.querySelector('[data-ok]').onclick = () => {
            if (!requireText('clMH08LyDo')) return;
            const cur = getProposal(p.id);
            if (!cur || cur.trangThai !== 'Chờ ký số') { closeModal('clMH08'); toast(MSG.ERR_DK_005, 'error'); return; }
            cur.trangThai = 'Bị trả lại';
            cur.traLai = cur.traLai || [];
            cur.traLai.push({ nguoi: cur.trinhKy ? cur.trinhKy.lanhDao : LANH_DAO[1].ten, thoiDiem: fmtDateTime(new Date()), lyDo: ta.value.trim() });
            updateProposal(cur);
            closeModal('clMH08');
            if (done) done(cur, MSG.SUC_CLDK_006(cur.maDeNghi));
        };
        openModal('clMH08');
        setTimeout(() => ta.focus(), 50);
    }

    // Dự thảo: lưu dữ liệu đang cập nhật tạm thời để trang du_thao_chinh_ly.html đọc khi mở tab mới
    function openDraft(p, draftData) {
        if (draftData) { try { localStorage.setItem(DRAFT_KEY_PREFIX + p.id, JSON.stringify(draftData)); } catch (e) { /* bỏ qua */ } }
        const w = window.open(`du_thao_chinh_ly.html?id=${p.id}${draftData ? '&draft=1' : ''}`, '_blank');
        if (!w) toast('Trình duyệt chặn mở tab mới. Vui lòng cho phép cửa sổ bật lên.', 'warn');
    }
    function readDraft(id) { try { return JSON.parse(localStorage.getItem(DRAFT_KEY_PREFIX + id) || 'null'); } catch (e) { return null; } }

    // MH09 - Popup Trình ký
    let trinhKyCombo = null;
    function openTrinhKy(p, getDraft, done) {
        const el = ensureModal('clMH09', modalShell('clMH09', '', '<i class="fa-solid fa-paper-plane" style="color:#1E3A8A;"></i>',
            `<div data-ro></div>
            <div class="cl-form-group"><label class="cl-label">Lãnh đạo ký duyệt <span class="cl-req">*</span></label><div id="clMH09Combo"></div>
                <div class="cl-error" id="clMH09ComboErr">${esc(MSG.VAL_001)}</div></div>
            <div class="cl-form-group"><label class="cl-label">Dự thảo văn bản</label>
                <div><button type="button" class="cl-btn cl-btn-outline-primary" data-draft><i class="fa-solid fa-file-pdf"></i> Xem dự thảo</button></div></div>`,
            '<button type="button" class="cl-btn cl-btn-outline" data-close>Hủy bỏ</button><button type="button" class="cl-btn cl-btn-primary" data-ok><i class="fa-solid fa-paper-plane"></i> Xác nhận trình ký</button>', 600));
        el.querySelector('[data-title]').textContent = `Trình ký hồ sơ: ${p.maDeNghi}`;
        el.querySelector('[data-ro]').innerHTML = readonlyBox([infoItem('Mã đề nghị', p.maDeNghi), infoItem('Loại đề nghị', loaiLabel(p))]);
        trinhKyCombo = combo(byId('clMH09Combo'), { options: peopleOptions(LANH_DAO), value: p.trinhKy ? p.trinhKy.lanhDao : '', placeholder: 'Tìm theo Họ và tên hoặc Tên đăng nhập...', errorEl: byId('clMH09ComboErr') });
        el.querySelector('[data-draft]').onclick = () => openDraft(p, getDraft ? getDraft() : null);
        el.querySelector('[data-ok]').onclick = () => {
            const ld = trinhKyCombo.get();
            if (!ld) { trinhKyCombo.setInvalid(true); trinhKyCombo.focus(); return; }
            closeModal('clMH09');
            if (done) done(ld);
        };
        openModal('clMH09');
    }

    // MH10 - Popup Ký số hồ sơ
    function openKySo(p, done) {
        const el = ensureModal('clMH10', modalShell('clMH10', '', '<i class="fa-solid fa-file-signature" style="color:#6D28D9;"></i>',
            `<div class="cl-modal-section-title">Thông tin hồ sơ ký số</div><div data-ro></div>
            <div class="cl-modal-section-title">Thông tin ký số</div>
            <div class="cl-form-group"><label class="cl-label">Hình thức ký số <span class="cl-req">*</span></label>
                <div style="display:flex;gap:16px;flex-wrap:wrap;" data-hinh-thuc>
                    <label style="display:inline-flex;gap:6px;align-items:center;cursor:pointer;"><input type="radio" name="clKsHT" value="USB Token Ban Cơ yếu Chính phủ" checked> USB Token Ban Cơ yếu Chính phủ</label>
                    <label style="display:inline-flex;gap:6px;align-items:center;cursor:pointer;"><input type="radio" name="clKsHT" value="SIM ký số"> SIM ký số</label>
                    <label style="display:inline-flex;gap:6px;align-items:center;cursor:pointer;"><input type="radio" name="clKsHT" value="Ký số từ xa (HSM / Cloud CA)"> Ký số từ xa (HSM / Cloud CA)</label>
                </div></div>
            <div class="cl-grid-2" style="margin-bottom:14px;">
                <div class="cl-form-group"><label class="cl-label">Trạng thái chứng thư số</label><div data-ct-status></div></div>
                <div class="cl-form-group"><label class="cl-label">Thời hạn chứng thư số</label><div data-ct-han style="font-weight:600;">-</div></div>
            </div>
            <div class="cl-form-group"><label class="cl-label" for="clKsCT">Chứng thư số <span class="cl-req">*</span></label>
                <div class="cl-search-row"><select class="cl-select" id="clKsCT" disabled><option value="">-- Bấm "Kiểm tra chứng thư số" để đọc chứng thư --</option></select>
                <button type="button" class="cl-btn cl-btn-outline-primary" data-check><i class="fa-solid fa-shield-halved"></i> Kiểm tra chứng thư số</button></div></div>
            <details style="margin-top:6px;font-size:12px;color:#64748B;"><summary style="cursor:pointer;">Tùy chọn giả lập kết quả (chỉ dùng cho bản demo)</summary>
                <div style="display:flex;flex-direction:column;gap:4px;margin-top:6px;" data-sim>
                    <label><input type="radio" name="clKsSim" value="ok" checked> Đọc được chứng thư số hợp lệ của Lãnh đạo</label>
                    <label><input type="radio" name="clKsSim" value="notfound"> Không tìm thấy thiết bị/tài khoản ký số</label>
                    <label><input type="radio" name="clKsSim" value="mismatch"> Chứng thư số không thuộc Lãnh đạo được chọn ký duyệt</label>
                    <div>Khi xác thực: nhập mã PIN/OTP <b>000000</b> để giả lập ký lỗi.</div>
                </div></details>`,
            `<span class="cl-processing" data-processing><i class="fa-solid fa-spinner cl-spin"></i> Đang ký số hồ sơ...</span>
             <button type="button" class="cl-btn cl-btn-outline" data-cancel>Hủy</button><button type="button" class="cl-btn cl-btn-primary" data-ok><i class="fa-solid fa-signature"></i> Ký số</button>`, 720));
        el.querySelector('[data-title]').textContent = `Ký số hồ sơ: ${p.maDeNghi}`;
        el.querySelector('[data-ro]').innerHTML = `<div class="cl-readonly-box"><div class="cl-info-grid">
            ${infoItem('Mã đề nghị', p.maDeNghi)}${infoItem('Loại đề nghị', badge(loaiLabel(p), loaiClass(p)), { html: true })}${infoItem('Số đăng ký', p.soDangKy)}
            ${infoItem('Người trình ký', p.trinhKy ? p.trinhKy.nguoi : '')}${infoItem('Loại file chờ ký', loaiFileChoKy(p))}
            ${infoItem('File PDF chờ ký', `<a class="cl-link" data-pdf><i class="fa-solid fa-up-right-from-square"></i> Xem file</a>`, { html: true })}</div></div>`;
        el.querySelector('[data-pdf]').onclick = () => window.open(`du_thao_chinh_ly.html?id=${p.id}`, '_blank');

        const sel = byId('clKsCT');
        const stEl = el.querySelector('[data-ct-status]');
        const hanEl = el.querySelector('[data-ct-han]');
        const lanhDao = p.trinhKy ? p.trinhKy.lanhDao : LANH_DAO[0].ten;
        let ctStatus = 'Chưa kiểm tra';
        let certs = [];
        const stCls = { 'Chưa kiểm tra': 'cl-st-neutral', 'Không tìm thấy thiết bị/tài khoản ký số': 'cl-st-tuchoi', 'Chứng thư số không hợp lệ': 'cl-st-tuchoi', 'Chứng thư số hợp lệ': 'cl-st-hoanthanh' };
        function setStatus(s) { ctStatus = s; stEl.innerHTML = badge(s, stCls[s]); }
        function resetCert() {
            setStatus('Chưa kiểm tra');
            certs = [];
            sel.innerHTML = '<option value="">-- Bấm "Kiểm tra chứng thư số" để đọc chứng thư --</option>';
            sel.disabled = true;
            hanEl.textContent = '-';
        }
        resetCert();
        el.querySelectorAll('input[name="clKsHT"]').forEach(r => { r.checked = r.value === 'USB Token Ban Cơ yếu Chính phủ'; r.onchange = resetCert; });
        el.querySelectorAll('input[name="clKsSim"]').forEach(r => { r.checked = r.value === 'ok'; });
        const hinhThuc = () => el.querySelector('input[name="clKsHT"]:checked').value;
        sel.onchange = () => { const c = certs.find(x => x.serial === sel.value); hanEl.textContent = c ? c.han : '-'; };

        el.querySelector('[data-check]').onclick = () => {
            const sim = el.querySelector('input[name="clKsSim"]:checked').value;
            if (sim === 'notfound') { setStatus('Không tìm thấy thiết bị/tài khoản ký số'); sel.disabled = true; hanEl.textContent = '-'; toast(MSG.ERR_DK_011, 'error'); return; }
            if (sim === 'mismatch') { setStatus('Chứng thư số không hợp lệ'); sel.disabled = true; hanEl.textContent = '-'; toast(MSG.ERR_DK_012, 'error'); return; }
            const ht = hinhThuc();
            certs = ht === 'SIM ký số'
                ? [{ serial: '5403A1B2C3D4E5F6', label: `${lanhDao.toUpperCase()} - Viettel-CA - Số serial: 5403A1B2C3D4E5F6`, han: 'Từ 01/06/2025 đến 01/06/2027' },
                   { serial: '5403F6E5D4C3B2A1', label: `${lanhDao.toUpperCase()} - VNPT-CA - Số serial: 5403F6E5D4C3B2A1`, han: 'Từ 10/02/2026 đến 10/02/2029' }]
                : [{ serial: '7A00112233445566', label: `${lanhDao.toUpperCase()} - Ban Cơ yếu Chính phủ - Số serial: 7A00112233445566`, han: 'Từ 15/03/2025 đến 15/03/2028' }];
            sel.innerHTML = certs.map(c => `<option value="${c.serial}">${esc(c.label)}</option>`).join('');
            sel.disabled = false;
            sel.value = certs[0].serial;
            hanEl.textContent = certs[0].han;
            setStatus('Chứng thư số hợp lệ');
            toast(`Đã đọc ${certs.length} chứng thư số hợp lệ theo hình thức ${ht}.`);
        };

        const okBtn = el.querySelector('[data-ok]');
        const cancelBtn = el.querySelector('[data-cancel]');
        const proc = el.querySelector('[data-processing]');
        cancelBtn.onclick = () => closeModal('clMH10');
        function lock(on) {
            proc.classList.toggle('show', on);
            [okBtn, cancelBtn, el.querySelector('[data-check]'), el.querySelector('[data-close]')].forEach(b => { b.disabled = on; });
        }
        okBtn.onclick = async () => {
            if (ctStatus !== 'Chứng thư số hợp lệ') { toast(MSG.ERR_DK_011, 'error'); return; }
            const cur = getProposal(p.id);
            if (!cur || cur.trangThai !== 'Chờ ký số') { toast(MSG.ERR_DK_005, 'error'); return; }
            if (!cur.trinhKy) { toast(MSG.ERR_DK_010, 'error'); return; }
            if (!(await confirmBox(MSG.CFM_DK_013, 'Đồng ý'))) return;
            const code = await authPrompt(hinhThuc());
            if (code === null) { toast(MSG.ERR_DK_013, 'error'); return; }
            lock(true);
            setTimeout(() => {
                lock(false);
                if (code === '000000') { toast(MSG.ERR_DK_013, 'error'); return; }
                cur.trangThai = 'Hoàn thành';
                cur.kySo = { nguoi: lanhDao, thoiDiem: fmtDateTime(new Date()), hinhThuc: hinhThuc(), chungThu: sel.options[sel.selectedIndex].text };
                if (cur.loai === 'HUY' && !cur.soDKHuyMoi) cur.soDKHuyMoi = 'H' + String(new Date().getFullYear()).slice(2) + String(Date.now()).slice(-6);
                updateProposal(cur);
                closeModal('clMH10');
                if (done) done(cur, MSG.SUC_CLDK_005(cur.maDeNghi));
            }, 1400);
        };
        openModal('clMH10');
    }

    // Xác thực ký số theo Hình thức ký số (hệ thống không lưu mã PIN/mã xác thực)
    function authPrompt(hinhThuc) {
        const isSim = hinhThuc === 'SIM ký số';
        const isUsb = hinhThuc.indexOf('USB') === 0;
        const el = ensureModal('clAuth', modalShell('clAuth', 'Xác thực ký số', '<i class="fa-solid fa-key" style="color:#6D28D9;"></i>',
            '<div data-auth-body></div>',
            '<button type="button" class="cl-btn cl-btn-outline" data-cancel>Hủy xác thực</button><button type="button" class="cl-btn cl-btn-primary" data-ok>Xác thực</button>', 460));
        el.classList.add('cl-top');
        el.querySelector('[data-auth-body]').innerHTML = isSim
            ? `<div class="cl-banner cl-banner-info"><i class="fa-solid fa-mobile-screen-button"></i><div>Hệ thống đã gửi yêu cầu ký đến điện thoại chứa SIM ký số. Vui lòng xác nhận ký trên điện thoại, sau đó bấm <b>Xác thực</b>.</div></div>`
            : `<div class="cl-form-group"><label class="cl-label" for="clAuthCode">${isUsb ? 'Mã PIN USB Token' : 'Mã OTP ký số từ xa'} <span class="cl-req">*</span></label>
                <input type="password" class="cl-input" id="clAuthCode" maxlength="8" placeholder="${isUsb ? 'Nhập mã PIN USB Token...' : 'Nhập mã OTP...'}" autocomplete="off">
                <div class="cl-error" id="clAuthCodeErr">${esc(MSG.VAL_001)}</div>
                <div class="cl-hint">${isUsb ? 'Mã PIN được nhập tại thành phần ký số cục bộ.' : 'Mã OTP được gửi qua ứng dụng ký số từ xa.'}</div></div>`;
        el.querySelector('[data-close]').onclick = null;
        openModal('clAuth');
        const code = byId('clAuthCode');
        if (code) setTimeout(() => code.focus(), 50);
        return new Promise(resolve => {
            const finish = r => { closeModal('clAuth'); resolve(r); };
            el.querySelector('[data-ok]').onclick = () => {
                if (code && !code.value.trim()) { code.classList.add('is-invalid'); byId('clAuthCodeErr').classList.add('show'); code.focus(); return; }
                finish(code ? code.value.trim() : 'SIM-OK');
            };
            el.querySelector('[data-cancel]').onclick = () => finish(null);
            el.querySelector('[data-close]').onclick = () => finish(null);
        });
    }

    global.CLDK = {
        // dữ liệu
        MSG, CURRENT_USER, CAN_BO, LANH_DAO, CO_QUAN, LOAI_BIEN_PHAP, LOAI_HOP_DONG, QUY_MO, LOAI_CHU_THE, TEN_PHUONG_TIEN,
        LOAI_TS, TABLE_TS, COLS, CHUNG_FIELDS, HO_SO, HO_SO_HUY,
        lookup, proposals, getProposal, updateProposal, nextMaDeNghi, peekMaDeNghi, resetDemo,
        hoSoOf, huyOf, selectableIds, hinhThucHuy, loaiLabel, loaiClass, statusClass, soDangKyLabel, loaiFileChoKy, nguoiXuLy, tenDanhSach, partyTitles,
        // tiện ích
        pad, fmtDate, fmtDateTime, fmtDateTimeSec, daysFromNow, clone, esc, val, byId, param, parseDMY,
        toast, flash, showFlash, goList, badge, infoItem, fileLinks, viewFile, downloadFile, collapsible, combo, peopleOptions, datePicker,
        // hiển thị
        renderHoSo, renderGiaoDichHuy, diffRows, TAG, histIcon, countChanges,
        // popup
        openModal, closeModal, confirmBox, openDuyet, openTuChoi, openTraLai, openTrinhKy, openKySo, openDraft, readDraft
    };
})(window);
