/*
 * [dvc] Tiếp nhận hồ sơ - Hồ sơ nguồn Dịch vụ công (tiep_nhan_ycbt.html)
 * - Dịch vụ công chỉ gửi hồ sơ Loại hồ sơ "Giải quyết yêu cầu bồi thường"; Nguồn hồ sơ = Hình thức tiếp nhận = "Dịch vụ công" (cố định, chỉ đọc).
 * - Người dân nhập trên Dịch vụ công đầy đủ thông tin như form Nhập liệu hồ sơ vụ việc (MH02) của phân hệ Giải quyết YCBT.
 *   Dữ liệu lưu trên hồ sơ luồng (BTNN_WF):
 *     + Trường dùng chung với Tiếp nhận hồ sơ: nycXxx, nbth, notifyMethod/notifyAddress, requestKind, vanBanCanCu, attachedDocs (kèm componentCode)
 *     + rec.dvcData: trường còn lại của MH02, cùng cấu trúc hồ sơ Giải quyết YCBT (requestDocDate, nhanQua, victimAlive,
 *       thietHaiList, totalNum, advance..., restoreHonor, phddFormApology, phddFormNews, otherRestore, files)
 *   -> Phân hệ Giải quyết YCBT (buildClaimFromWfRecord) kế thừa toàn bộ khi Lãnh đạo phân công; thao tác Tiếp nhận mở MH02 đã điền sẵn.
 * - Thành phần hồ sơ (04): VB_YEU_CAU_BT Văn bản yêu cầu bồi thường (bắt buộc); VB_CAN_CU_YCBT Văn bản làm căn cứ yêu cầu bồi thường (= vanBanCanCu);
 *   VB_UY_QUYEN_YCBT Văn bản ủy quyền thực hiện yêu cầu bồi thường (bắt buộc khi Người yêu cầu không phải là Người bị thiệt hại); TAI_LIEU_KHAC Các tài liệu kèm theo khác (theo dossier_components.component_code của E-Form Dịch vụ công).
 * - MH03 Xem chi tiết hồ sơ nguồn Dịch vụ công: thay các khối thông tin tiếp nhận bằng khối chỉ đọc theo đúng bố cục, thứ tự khối của MH02.
 */
(function (g) {
    'use strict';
    var W = g.BTNN_WF;
    if (!W) return;
    var DVC = W.SOURCES.DVC;
    var SEED_V = 'dvc2';
    var TP = [
        { code: 'VB_YEU_CAU_BT', name: 'Văn bản yêu cầu bồi thường' },
        { code: 'VB_CAN_CU_YCBT', name: 'Văn bản làm căn cứ yêu cầu bồi thường' },
        { code: 'VB_UY_QUYEN_YCBT', name: 'Văn bản ủy quyền thực hiện yêu cầu bồi thường' },
        { code: 'TAI_LIEU_KHAC', name: 'Các tài liệu kèm theo khác' }
    ];
    var NOTIFY_VNEID = 'Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID)';
    var DOC_CCCD = 'CMND/CCCD/Chứng minh quân đội';
    var NOI_CAP = 'Cục Cảnh sát quản lý hành chính về trật tự xã hội';
    function th(code, calc, val, name) { var o = { type: code, code: code, group: g.BTNN_TH ? g.BTNN_TH.groupOf(code) : '', calc: calc, val: val }; if (name) o.name = name; return o; }

    // ---------------- Dữ liệu mẫu người dân nhập trên Dịch vụ công ----------------
    // Khóa: seedKey của hồ sơ mẫu tại Tiếp nhận hồ sơ, hoặc Mã vụ việc của hồ sơ mẫu trong kho luồng
    var DATA = {
        'TN-DVC-1': {
            rec: {
                nycRole: 'Người bị thiệt hại', nycType: 'Cá nhân', nycDob: '14/03/1982', nycDocType: DOC_CCCD, nycDocNo: '001082014563',
                nycDocDate: '10/05/2021', nycDocPlace: NOI_CAP, nycEmail: 'luongvantoan82@gmail.com', requestKind: 'both',
                notifyMethod: NOTIFY_VNEID, notifyAddress: 'CCCD/ĐDCN: 001082014563 / SĐT: 0912003456',
                vanBanCanCu: [{ name: 'Quyết định số 45/QĐ-UBND ngày 05/09/2026 về việc hủy Quyết định thu hồi Giấy phép kinh doanh dịch vụ lữ hành', file: 'QD_45_QD-UBND_huy_QD_thu_hoi_giay_phep.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Mau01.pdf'],
                    ['TAI_LIEU_KHAC', 'Bản sao Căn cước công dân của người yêu cầu bồi thường', 'CCCD_Luong_Van_Toan.pdf'],
                    ['TAI_LIEU_KHAC', 'Hợp đồng thuê văn phòng số 18/2025/HĐTVP', 'Hop_dong_thue_van_phong_18_2025.pdf'],
                    ['TAI_LIEU_KHAC', 'Bảng kê thu nhập 06 tháng trước khi bị thu hồi giấy phép', 'Bang_ke_thu_nhap_6_thang.pdf']
                ]
            },
            dvc: {
                requestDocDate: '25/10/2026', victimAlive: 'yes',
                nhanQua: 'Giấy phép kinh doanh dịch vụ lữ hành bị thu hồi không đúng thẩm quyền làm ông Toàn phải ngừng hoạt động 03 tháng, mất thu nhập và không khai thác được văn phòng đã thuê.',
                thietHaiList: [
                    th('TH_TS_04', 'Giá thuê văn phòng tương đương trên thị trường 20.000.000 đồng/tháng x 03 tháng không khai thác được', 60000000),
                    th('TH_TN_01', 'Thu nhập bình quân 15.000.000 đồng/tháng x 03 tháng ngừng hoạt động', 45000000),
                    th('TH_CPK_01', 'Chi phí đi lại, in ấn tài liệu trong quá trình khiếu nại theo hóa đơn kèm theo', 3500000)
                ],
                totalNum: 108500000, advanceNum: 0, advanceTinhThan: 0, advanceKhac: 0,
                advanceRecName: 'Lương Văn Toàn', advanceRecCard: '001082014563', advanceRecAddress: 'Số 18 Trần Đăng Ninh, Phường Cầu Giấy, Thành phố Hà Nội',
                advanceRecKenh: 'chuyen-khoan', advanceBankUser: 'LUONG VAN TOAN', advanceBankAccount: '0021000456789',
                advanceBankName: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)', advanceBankBranch: 'Chi nhánh Thành Công',
                restoreHonor: true, phddFormApology: true, phddFormNews: false,
                otherRestore: 'Đề nghị cơ quan có thẩm quyền cấp lại Giấy phép kinh doanh dịch vụ lữ hành nội địa.'
            }
        },
        'TN-DVC-2': {
            rec: {
                nycRole: 'Người bị thiệt hại', nycType: 'Tổ chức', nycOrgCode: '0312345678', nycOrgDocNo: '0312345678', nycOrgDocDate: '15/04/2013',
                nycOrgDocPlace: 'Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh', nycRepName: 'Trần Quốc Khang', nycRepPosition: 'Giám đốc',
                nycEmail: 'ketoan@minhkhang.com.vn', requestKind: 'money',
                notifyMethod: 'Qua thư điện tử', notifyAddress: 'ketoan@minhkhang.com.vn',
                vanBanCanCu: [{ name: 'Quyết định giải quyết khiếu nại số 87/QĐ-CTHADS ngày 15/09/2026', file: 'QD_87_QD-CTHADS_giai_quyet_khieu_nai.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Minh_Khang.pdf'],
                    ['TAI_LIEU_KHAC', 'Giấy chứng nhận đăng ký doanh nghiệp', 'GCN_DKDN_0312345678.pdf'],
                    ['TAI_LIEU_KHAC', 'Biên bản kê biên, xử lý tài sản ngày 12/07/2026', 'Bien_ban_ke_bien_12_07_2026.pdf'],
                    ['TAI_LIEU_KHAC', 'Hóa đơn sửa chữa, khôi phục hàng hóa số 0001256', 'Hoa_don_0001256.pdf']
                ]
            },
            dvc: {
                requestDocDate: '22/10/2026', victimAlive: 'yes',
                nhanQua: 'Chấp hành viên kê biên toàn bộ kho hàng trị giá 1,2 tỷ đồng trong khi nghĩa vụ phải thi hành án là 300 triệu đồng; hàng hóa bị hư hỏng trong thời gian kê biên, doanh nghiệp ngừng giao hàng 02 tháng.',
                thietHaiList: [
                    th('TH_TS_02', 'Chi phí sửa chữa, khôi phục hàng hóa bị hư hỏng theo Hóa đơn số 0001256', 120000000),
                    th('TH_TN_04', 'Lợi nhuận bình quân 115.000.000 đồng/tháng x 02 tháng ngừng giao hàng', 230000000),
                    th('TH_KHAC_DVC2A', 'Thuê kho bảo quản 9.000.000 đồng/tháng x 02 tháng', 18000000, 'Chi phí lưu kho, bảo quản hàng hóa bị kê biên')
                ],
                totalNum: 368000000, advanceNum: 0, advanceTinhThan: 0, advanceKhac: 0,
                advanceRecName: 'Công ty TNHH Minh Khang', advanceRecCard: '0312345678', advanceRecAddress: 'Số 27 Lê Thánh Tôn, Phường Sài Gòn, Thành phố Hồ Chí Minh',
                advanceRecKenh: 'chuyen-khoan', advanceBankUser: 'CONG TY TNHH MINH KHANG', advanceBankAccount: '19034567890123',
                advanceBankName: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)', advanceBankBranch: 'Chi nhánh Sài Gòn',
                restoreHonor: false, phddFormApology: false, phddFormNews: false, otherRestore: ''
            }
        },
        'TN-DVC-3': {
            rec: {
                nycRole: 'Cá nhân, pháp nhân được ủy quyền hợp pháp', nycType: 'Cá nhân', nycDob: '21/07/1990', nycDocType: DOC_CCCD, nycDocNo: '001190023456',
                nycDocDate: '18/08/2021', nycDocPlace: NOI_CAP, nycEmail: 'hongnhung.nt90@gmail.com', requestKind: 'money',
                nbth: {
                    type: 'Cá nhân', name: 'Trần Minh Quân', dob: '02/11/1988', docType: DOC_CCCD, docNo: '001088034567', docDate: '15/03/2021', docPlace: NOI_CAP,
                    phone: '0983456712', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00010 - Phường Thanh Xuân', address: 'Số 9 Vũ Trọng Phụng'
                },
                notifyMethod: 'Qua dịch vụ bưu chính', notifyAddress: 'Số 9 Vũ Trọng Phụng, Phường Thanh Xuân, Thành phố Hà Nội',
                vanBanCanCu: [{ name: 'Văn bản số 1123/STP-HCTP ngày 10/09/2026 của Sở Tư pháp về việc cấp Phiếu lý lịch tư pháp quá thời hạn', file: 'VB_1123_STP-HCTP.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Tran_Minh_Quan.pdf'],
                    ['VB_UY_QUYEN_YCBT', 'Văn bản ủy quyền số 256/2026/UQ ngày 12/10/2026 (chứng thực tại UBND Phường Thanh Xuân)', 'Van_ban_uy_quyen_256_2026.pdf'],
                    ['TAI_LIEU_KHAC', 'Giấy hẹn trả kết quả Phiếu lý lịch tư pháp', 'Giay_hen_tra_ket_qua_LLTP.pdf'],
                    ['TAI_LIEU_KHAC', 'Thông báo tuyển chọn lao động đi làm việc ở nước ngoài', 'Thong_bao_tuyen_chon_lao_dong.pdf']
                ]
            },
            dvc: {
                requestDocDate: '24/10/2026', victimAlive: 'yes',
                nhanQua: 'Phiếu lý lịch tư pháp cấp chậm 25 ngày so với thời hạn quy định, anh Quân không kịp nộp hồ sơ tuyển chọn lao động đi làm việc ở nước ngoài, mất khoản thu nhập dự kiến.',
                thietHaiList: [
                    th('TH_TN_02', 'Thu nhập không ổn định bình quân 8.500.000 đồng/tháng x 03 tháng', 25500000),
                    th('TH_CPK_02', 'Chi phí gửi đơn thư bảo đảm đến cơ quan có thẩm quyền', 450000)
                ],
                totalNum: 25950000, advanceNum: 0, advanceTinhThan: 0, advanceKhac: 0,
                advanceRecName: 'Trần Minh Quân', advanceRecCard: '001088034567', advanceRecAddress: 'Số 9 Vũ Trọng Phụng, Phường Thanh Xuân, Thành phố Hà Nội',
                advanceRecKenh: 'tien-mat', advanceBankUser: '', advanceBankAccount: '', advanceBankName: '', advanceBankBranch: '',
                restoreHonor: false, phddFormApology: false, phddFormNews: false, otherRestore: ''
            }
        },
        'VVBT-2026-142': {
            rec: {
                nycRole: 'Người bị thiệt hại', nycType: 'Cá nhân', nycDob: '08/12/1979', nycDocType: DOC_CCCD, nycDocNo: '001179045612',
                nycDocDate: '20/06/2021', nycDocPlace: NOI_CAP, nycEmail: 'bichngoc.le79@gmail.com', requestKind: 'both',
                notifyMethod: NOTIFY_VNEID, notifyAddress: 'CCCD/ĐDCN: 001179045612 / SĐT: 0983215647',
                vanBanCanCu: [{ name: 'Quyết định số 31/QĐ-HXP ngày 02/10/2026 về việc hủy Quyết định xử phạt vi phạm hành chính', file: 'QD_31_QD-HXP_huy_QD_xu_phat.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Le_Thi_Bich_Ngoc.pdf'],
                    ['TAI_LIEU_KHAC', 'Biên lai nộp tiền phạt số 0034521', 'Bien_lai_0034521.pdf']
                ]
            },
            dvc: {
                requestDocDate: '13/10/2026', victimAlive: 'yes',
                nhanQua: 'Quyết định xử phạt vi phạm hành chính đã bị hủy; bà Ngọc đã nộp 15.000.000 đồng tiền phạt vào ngân sách nhà nước, thông tin xử phạt được công khai làm ảnh hưởng uy tín.',
                thietHaiList: [
                    th('TH_TS_06', 'Tiền phạt đã nộp ngân sách nhà nước theo Biên lai số 0034521 là 15.000.000 đồng và tiền lãi 600.000 đồng', 15600000),
                    th('TH_CPK_01', 'Chi phí đi lại, in ấn tài liệu trong quá trình khiếu nại', 2000000)
                ],
                totalNum: 17600000, advanceNum: 15000000, advanceTinhThan: 0, advanceKhac: 15000000,
                advanceRecName: 'Lê Thị Bích Ngọc', advanceRecCard: '001179045612', advanceRecAddress: 'Số 8 phố Chùa Láng, Phường Láng, Thành phố Hà Nội',
                advanceRecKenh: 'tien-mat', advanceBankUser: '', advanceBankAccount: '', advanceBankName: '', advanceBankBranch: '',
                restoreHonor: true, phddFormApology: true, phddFormNews: true, otherRestore: ''
            }
        }
    };

    // [tnld2] Dữ liệu mẫu bổ sung: hồ sơ Dịch vụ công đang ở các bước của luồng phân công Bộ Tư pháp (BTP-01 -> CĐK-01 -> PLN-02)
    // Khóa DATA: seedKey "TN-DVC-<n>"; Mã vụ việc cấp khi tạo (BTNN_WF.nextVuViecCode, không trùng mã đã có), Mã hồ sơ trùng Mã vụ việc
    // (như hồ sơ DVC do hệ thống tạo); dữ liệu người dân nhập trên Dịch vụ công theo cấu trúc DATA
    var ADD_SEED_KEY = 'btnn_dvc_seed_add';
    var ADD_SEED_V = 'dvc3';
    var NOI_CAP_DKDN_HN = 'Sở Kế hoạch và Đầu tư Thành phố Hà Nội';
    Object.assign(DATA, {
        'TN-DVC-4': {
            rec: {
                nycRole: 'Người bị thiệt hại', nycType: 'Cá nhân', nycDob: '19/05/1976', nycDocType: DOC_CCCD, nycDocNo: '001076028914',
                nycDocDate: '22/04/2021', nycDocPlace: NOI_CAP, nycEmail: 'dothanhbinh76@gmail.com', requestKind: 'honor',
                notifyMethod: NOTIFY_VNEID, notifyAddress: 'CCCD/ĐDCN: 001076028914 / SĐT: 0915667238',
                vanBanCanCu: [{ name: 'Quyết định số 58/QĐ-HXP ngày 30/09/2026 về việc hủy Quyết định xử phạt vi phạm hành chính về hành vi gây rối trật tự công cộng', file: 'QD_58_QD-HXP_huy_QD_xu_phat.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Do_Thanh_Binh.pdf'],
                    ['TAI_LIEU_KHAC', 'Bản sao Căn cước công dân của người yêu cầu bồi thường', 'CCCD_Do_Thanh_Binh.pdf'],
                    ['TAI_LIEU_KHAC', 'Thông báo về việc xử phạt vi phạm hành chính gửi tổ dân phố nơi cư trú', 'Thong_bao_xu_phat_gui_noi_cu_tru.pdf']
                ]
            },
            dvc: {
                requestDocDate: '24/10/2026', victimAlive: 'yes',
                nhanQua: 'Quyết định xử phạt vi phạm hành chính đã bị hủy; nội dung xử phạt được thông báo công khai tại tổ dân phố nơi cư trú làm ảnh hưởng đến danh dự, uy tín của ông Bình.',
                thietHaiList: [], totalNum: 0, advanceNum: 0, advanceTinhThan: 0, advanceKhac: 0,
                advanceRecName: '', advanceRecCard: '', advanceRecAddress: '',
                advanceRecKenh: 'tien-mat', advanceBankUser: '', advanceBankAccount: '', advanceBankName: '', advanceBankBranch: '',
                restoreHonor: true, phddFormApology: true, phddFormNews: false, otherRestore: ''
            }
        },
        'TN-DVC-5': {
            rec: {
                nycRole: 'Người bị thiệt hại', nycType: 'Tổ chức', nycOrgCode: '0107654321', nycOrgDocNo: '0107654321', nycOrgDocDate: '08/11/2016',
                nycOrgDocPlace: NOI_CAP_DKDN_HN, nycRepName: 'Nguyễn Văn Phú', nycRepPosition: 'Tổng Giám đốc',
                nycEmail: 'phapche@nongsanphuan.vn', requestKind: 'money',
                notifyMethod: 'Qua thư điện tử', notifyAddress: 'phapche@nongsanphuan.vn',
                vanBanCanCu: [{ name: 'Quyết định số 102/QĐ-HXP ngày 18/09/2026 về việc hủy Quyết định xử phạt vi phạm hành chính và tịch thu tang vật', file: 'QD_102_QD-HXP_huy_QD_tich_thu.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Phu_An.pdf'],
                    ['TAI_LIEU_KHAC', 'Giấy chứng nhận đăng ký doanh nghiệp', 'GCN_DKDN_0107654321.pdf'],
                    ['TAI_LIEU_KHAC', 'Biên bản tịch thu tang vật vi phạm hành chính ngày 05/08/2026', 'Bien_ban_tich_thu_05_08_2026.pdf'],
                    ['TAI_LIEU_KHAC', 'Biên lai nộp tiền phạt số 0051873', 'Bien_lai_0051873.pdf'],
                    ['TAI_LIEU_KHAC', 'Báo cáo tài chính quý II và quý III năm 2026', 'Bao_cao_tai_chinh_Q2_Q3_2026.pdf']
                ]
            },
            dvc: {
                requestDocDate: '20/10/2026', victimAlive: 'yes',
                nhanQua: 'Lô hàng nông sản bị tịch thu và bán đấu giá theo Quyết định xử phạt đã bị hủy; doanh nghiệp đã nộp tiền phạt, phải ngừng thực hiện 02 hợp đồng xuất khẩu trong 02 tháng.',
                thietHaiList: [
                    th('TH_TS_01', 'Giá trị lô hàng 35 tấn hạt điều thô bị tịch thu, đã bán đấu giá theo Biên bản tịch thu ngày 05/08/2026', 245000000),
                    th('TH_TS_06', 'Tiền phạt đã nộp ngân sách nhà nước theo Biên lai số 0051873 là 40.000.000 đồng và tiền lãi 1.200.000 đồng', 41200000),
                    th('TH_TN_04', 'Lợi nhuận bình quân 30.000.000 đồng/tháng x 02 tháng ngừng thực hiện hợp đồng xuất khẩu', 60000000),
                    th('TH_CPK_01', 'Chi phí đi lại, in ấn tài liệu trong quá trình khiếu nại theo hóa đơn kèm theo', 4800000)
                ],
                totalNum: 351000000, advanceNum: 41200000, advanceTinhThan: 0, advanceKhac: 41200000,
                advanceRecName: 'Công ty Cổ phần Nông sản Phú An', advanceRecCard: '0107654321', advanceRecAddress: 'Số 45 Nguyễn Trãi, Phường Thanh Xuân, Thành phố Hà Nội',
                advanceRecKenh: 'chuyen-khoan', advanceBankUser: 'CONG TY CO PHAN NONG SAN PHU AN', advanceBankAccount: '0011004567321',
                advanceBankName: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)', advanceBankBranch: 'Chi nhánh Thành Công',
                restoreHonor: false, phddFormApology: false, phddFormNews: false, otherRestore: ''
            }
        },
        'TN-DVC-6': {
            rec: {
                nycRole: 'Cá nhân, pháp nhân được ủy quyền hợp pháp', nycType: 'Cá nhân', nycDob: '03/09/1985', nycDocType: DOC_CCCD, nycDocNo: '001185037261',
                nycDocDate: '12/07/2021', nycDocPlace: NOI_CAP, nycEmail: 'ngocha.pham85@gmail.com', requestKind: 'both',
                nbth: {
                    type: 'Cá nhân', name: 'Vũ Văn Thành', dob: '27/01/1992', docType: DOC_CCCD, docNo: '001092045178', docDate: '09/06/2021', docPlace: NOI_CAP,
                    phone: '0978120456', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00001 - Phường Ba Đình', address: 'Số 21 Đội Cấn'
                },
                notifyMethod: 'Qua dịch vụ bưu chính', notifyAddress: 'Số 21 Đội Cấn, Phường Ba Đình, Thành phố Hà Nội',
                vanBanCanCu: [{ name: 'Quyết định số 77/QĐ-UBND ngày 25/09/2026 về việc hủy Quyết định áp dụng biện pháp đưa vào cơ sở cai nghiện bắt buộc', file: 'QD_77_QD-UBND_huy_QD_cai_nghien.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Vu_Van_Thanh.pdf'],
                    ['VB_UY_QUYEN_YCBT', 'Văn bản ủy quyền số 318/2026/UQ ngày 15/10/2026 (chứng thực tại UBND Phường Ba Đình)', 'Van_ban_uy_quyen_318_2026.pdf'],
                    ['TAI_LIEU_KHAC', 'Bản sao Căn cước công dân của người bị thiệt hại', 'CCCD_Vu_Van_Thanh.pdf'],
                    ['TAI_LIEU_KHAC', 'Hợp đồng lao động và bảng lương 06 tháng trước khi bị áp dụng biện pháp', 'Hop_dong_lao_dong_bang_luong.pdf'],
                    ['TAI_LIEU_KHAC', 'Hợp đồng dịch vụ pháp lý số 41/2026/HĐDV', 'Hop_dong_dich_vu_phap_ly_41_2026.pdf']
                ]
            },
            dvc: {
                requestDocDate: '22/10/2026', victimAlive: 'yes',
                nhanQua: 'Anh Thành bị đưa vào cơ sở cai nghiện bắt buộc 45 ngày theo quyết định đã bị hủy; trong thời gian này anh Thành bị mất thu nhập từ tiền lương và phải thuê người bảo vệ quyền, lợi ích hợp pháp.',
                thietHaiList: [
                    th('TH_TT_02', '45 ngày bị đưa vào cơ sở cai nghiện bắt buộc trái pháp luật x 01 ngày lương cơ sở (106.364 đồng/ngày)', 4786380),
                    th('TH_TN_01', 'Thu nhập ổn định từ tiền lương 12.000.000 đồng/tháng x 1,5 tháng', 18000000),
                    th('TH_CPK_03', 'Chi phí thuê người bảo vệ quyền và lợi ích hợp pháp theo Hợp đồng dịch vụ pháp lý số 41/2026/HĐDV', 15000000)
                ],
                totalNum: 37786380, advanceNum: 4786380, advanceTinhThan: 4786380, advanceKhac: 0,
                advanceRecName: 'Vũ Văn Thành', advanceRecCard: '001092045178', advanceRecAddress: 'Số 21 Đội Cấn, Phường Ba Đình, Thành phố Hà Nội',
                advanceRecKenh: 'tien-mat', advanceBankUser: '', advanceBankAccount: '', advanceBankName: '', advanceBankBranch: '',
                restoreHonor: true, phddFormApology: true, phddFormNews: false, otherRestore: ''
            }
        },
        'TN-DVC-7': {
            rec: {
                nycRole: 'Người bị thiệt hại', nycType: 'Cá nhân', nycDob: '11/02/1983', nycDocType: DOC_CCCD, nycDocNo: '001083019827',
                nycDocDate: '05/03/2021', nycDocPlace: NOI_CAP, nycEmail: 'hoangminhtuan.ls@gmail.com', requestKind: 'money',
                notifyMethod: NOTIFY_VNEID, notifyAddress: 'CCCD/ĐDCN: 001083019827 / SĐT: 0936452187',
                vanBanCanCu: [{ name: 'Quyết định số 1520/QĐ-BTP ngày 26/09/2026 về việc hủy Quyết định thu hồi Chứng chỉ hành nghề luật sư', file: 'QD_1520_QD-BTP_huy_QD_thu_hoi_CCHN.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Hoang_Minh_Tuan.pdf'],
                    ['TAI_LIEU_KHAC', 'Bản sao Căn cước công dân của người yêu cầu bồi thường', 'CCCD_Hoang_Minh_Tuan.pdf'],
                    ['TAI_LIEU_KHAC', 'Xác nhận thu nhập 12 tháng của tổ chức hành nghề luật sư', 'Xac_nhan_thu_nhap_12_thang.pdf']
                ]
            },
            dvc: {
                requestDocDate: '17/10/2026', victimAlive: 'yes',
                nhanQua: 'Chứng chỉ hành nghề luật sư bị thu hồi trái pháp luật làm ông Tuấn không được hành nghề trong 04 tháng, mất thu nhập ổn định từ tổ chức hành nghề luật sư.',
                thietHaiList: [
                    th('TH_TN_01', 'Thu nhập ổn định bình quân 25.000.000 đồng/tháng x 04 tháng không được hành nghề', 100000000),
                    th('TH_CPK_01', 'Chi phí đi lại, in ấn tài liệu trong quá trình khiếu nại', 3200000),
                    th('TH_CPK_02', 'Chi phí gửi đơn thư bảo đảm đến cơ quan có thẩm quyền', 350000)
                ],
                totalNum: 103550000, advanceNum: 0, advanceTinhThan: 0, advanceKhac: 0,
                advanceRecName: 'Hoàng Minh Tuấn', advanceRecCard: '001083019827', advanceRecAddress: 'Số 15 Hàng Bài, Phường Hoàn Kiếm, Thành phố Hà Nội',
                advanceRecKenh: 'chuyen-khoan', advanceBankUser: 'HOANG MINH TUAN', advanceBankAccount: '19036271845012',
                advanceBankName: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)', advanceBankBranch: 'Chi nhánh Hoàn Kiếm',
                restoreHonor: false, phddFormApology: false, phddFormNews: false, otherRestore: ''
            }
        },
        'TN-DVC-8': {
            rec: {
                nycRole: 'Người bị thiệt hại', nycType: 'Tổ chức', nycOrgCode: '0108123456', nycOrgDocNo: '05/TLTT', nycOrgDocDate: '14/06/2019',
                nycOrgDocPlace: 'Bộ Tư pháp', nycRepName: 'Lê Quang Hưng', nycRepPosition: 'Chủ tịch',
                nycEmail: 'vanphong@trongtaihungviet.vn', requestKind: 'both',
                notifyMethod: 'Qua thư điện tử', notifyAddress: 'vanphong@trongtaihungviet.vn',
                vanBanCanCu: [{ name: 'Quyết định số 1488/QĐ-BTP ngày 19/09/2026 về việc hủy Quyết định thu hồi Giấy phép thành lập Trung tâm trọng tài', file: 'QD_1488_QD-BTP_huy_QD_thu_hoi_giay_phep.pdf' }],
                docs: [
                    ['VB_YEU_CAU_BT', 'Văn bản yêu cầu bồi thường (Mẫu 01/BTNN)', 'Van_ban_yeu_cau_boi_thuong_Hung_Viet.pdf'],
                    ['TAI_LIEU_KHAC', 'Giấy phép thành lập Trung tâm trọng tài số 05/TLTT', 'Giay_phep_thanh_lap_05_TLTT.pdf'],
                    ['TAI_LIEU_KHAC', 'Hợp đồng thuê trụ sở số 09/2024/HĐTTS', 'Hop_dong_thue_tru_so_09_2024.pdf'],
                    ['TAI_LIEU_KHAC', 'Báo cáo doanh thu phí trọng tài năm 2025', 'Bao_cao_doanh_thu_2025.pdf']
                ]
            },
            dvc: {
                requestDocDate: '15/10/2026', victimAlive: 'yes',
                nhanQua: 'Giấy phép thành lập bị thu hồi trái pháp luật làm Trung tâm phải ngừng tiếp nhận vụ tranh chấp 03 tháng, mất doanh thu, không khai thác được trụ sở đã thuê; thông tin thu hồi được đăng công khai ảnh hưởng uy tín của Trung tâm.',
                thietHaiList: [
                    th('TH_TN_04', 'Doanh thu phí trọng tài bình quân 85.000.000 đồng/tháng x 03 tháng ngừng hoạt động', 255000000),
                    th('TH_TS_04', 'Giá thuê trụ sở tương đương trên thị trường 30.000.000 đồng/tháng x 03 tháng không khai thác được', 90000000),
                    th('TH_CPK_03', 'Chi phí thuê luật sư bảo vệ quyền và lợi ích hợp pháp trong quá trình khiếu nại', 20000000)
                ],
                totalNum: 365000000, advanceNum: 0, advanceTinhThan: 0, advanceKhac: 0,
                advanceRecName: 'Trung tâm Trọng tài Thương mại Hưng Việt', advanceRecCard: '0108123456', advanceRecAddress: 'Tầng 6, số 88 Trần Thái Tông, Phường Cầu Giấy, Thành phố Hà Nội',
                advanceRecKenh: 'chuyen-khoan', advanceBankUser: 'TRUNG TAM TRONG TAI THUONG MAI HUNG VIET', advanceBankAccount: '0451000378925',
                advanceBankName: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)', advanceBankBranch: 'Chi nhánh Thành Công',
                restoreHonor: true, phddFormApology: false, phddFormNews: true, otherRestore: ''
            }
        }
    });
    // Thông tin hồ sơ luồng: bước luồng phân công, người dân, đơn vị (Bộ Tư pháp; Lãnh đạo Bộ, Cục, Phòng theo Cấu hình luồng xử lý)
    var HC = 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH';
    var ADD_SEEDS = [
        // Đang phân công tại Cục (chờ Lãnh đạo Cục phân công)
        { key: 'TN-DVC-4', step: 1, nyc: 'Đỗ Thanh Bình', phone: '0915667238', ward: '00004 - Phường Hoàn Kiếm', addr: 'Số 32 Hàng Bông',
            hanhVi: 'Xử phạt vi phạm hành chính về hành vi gây rối trật tự công cộng không có căn cứ, thông báo công khai tại nơi cư trú.', at: ['08:45 26/10/2026', '14:20 26/10/2026'] },
        // Đang phân công tại Phòng (chờ Lãnh đạo Phòng phân công cán bộ)
        { key: 'TN-DVC-5', step: 2, nyc: 'Công ty Cổ phần Nông sản Phú An', phone: '0243776512', ward: '00010 - Phường Thanh Xuân', addr: 'Số 45 Nguyễn Trãi',
            hanhVi: 'Tịch thu lô hàng nông sản và xử phạt vi phạm hành chính trái pháp luật.', at: ['09:05 21/10/2026', '10:30 21/10/2026', '15:00 22/10/2026'] },
        { key: 'TN-DVC-6', step: 2, nyc: 'Phạm Ngọc Hà', phone: '0904128765', ward: '00001 - Phường Ba Đình', addr: 'Số 12 Kim Mã',
            hanhVi: 'Áp dụng biện pháp đưa vào cơ sở cai nghiện bắt buộc trái pháp luật đối với người bị thiệt hại.', at: ['16:10 23/10/2026', '08:40 24/10/2026', '14:00 24/10/2026'] },
        // Chờ tiếp nhận (Lãnh đạo Phòng đã phân công cán bộ chủ trì, cán bộ chưa tiếp nhận)
        { key: 'TN-DVC-7', step: 3, chuTri: 'canbonv', nyc: 'Hoàng Minh Tuấn', phone: '0936452187', ward: '00004 - Phường Hoàn Kiếm', addr: 'Số 15 Hàng Bài',
            hanhVi: 'Thu hồi Chứng chỉ hành nghề luật sư trái pháp luật.', at: ['08:30 19/10/2026', '10:00 19/10/2026', '15:30 19/10/2026', '09:00 20/10/2026'] },
        { key: 'TN-DVC-8', step: 3, chuTri: 'hatt', type: 'Tổ chức', nyc: 'Trung tâm Trọng tài Thương mại Hưng Việt', phone: '0243562890', ward: '00007 - Phường Cầu Giấy', addr: 'Tầng 6, số 88 Trần Thái Tông',
            hanhVi: 'Thu hồi Giấy phép thành lập Trung tâm trọng tài không đúng căn cứ pháp luật.', at: ['10:15 16/10/2026', '14:00 16/10/2026', '09:30 17/10/2026', '15:45 17/10/2026'] }
    ];
    // Bổ sung hồ sơ mẫu (01 lần theo phiên bản ADD_SEED_V) theo seedKey: không xóa, không ghi đè hồ sơ đã có trong kho của người dùng
    function seedAddDvcRecords() {
        var ver = null;
        try { ver = localStorage.getItem(ADD_SEED_KEY); } catch (e) { return; }
        var S = W.STATUS;
        var keys = {};
        W.loadRecords().forEach(function (r) { if (r && r.seedKey) keys[r.seedKey] = 1; });
        // Đã nạp phiên bản này và đủ hồ sơ: bỏ qua; kho luồng bị nạp lại dữ liệu gốc (đổi phiên bản seed chung): bổ sung lại hồ sơ còn thiếu
        if (ver === ADD_SEED_V && ADD_SEEDS.every(function (s) { return keys[s.key]; })) return;
        var h = function (action, userId, at, note) { return { at: at, userId: userId, userName: userId ? W.userName(userId) : 'Hệ thống', action: action, note: note || '' }; };
        ADD_SEEDS.forEach(function (s) {
            if (keys[s.key]) return;
            var code = W.nextVuViecCode();
            var at = s.at;
            var routes = [{ id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: 'Giao Cục xem xét, xử lý.', at: at[1], state: s.step > 1 ? 'Đã xử lý' : 'Chưa xử lý' }];
            var hist = [
                h('Nhận hồ sơ từ Dịch vụ công', '', at[0], 'Hồ sơ gửi từ Dịch vụ công. Chờ lãnh đạo Bộ Tư pháp phân công.'),
                h('Chuyển đơn vị', 'oanhdh', at[1], 'Chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước phân công.')
            ];
            if (s.step >= 2) {
                routes.push({ id: 'R2', type: 'unit', fromUnitId: 'CĐK-01', fromUserId: 'cuctruong', toUnitId: 'PLN-02', note: 'Giao Phòng phân công cán bộ xử lý.', at: at[2], state: s.step > 2 ? 'Đã xử lý' : 'Chưa xử lý' });
                hist.push(h('Chuyển đơn vị', 'cuctruong', at[2], 'Chuyển Phòng Quản lý nghiệp vụ về bồi thường nhà nước phân công.'));
            }
            if (s.step >= 3) {
                routes.push({ id: 'R3', type: 'officer', fromUnitId: 'PLN-02', fromUserId: 'tpbt', chuTri: s.chuTri, note: '', at: at[3], state: 'Chưa xử lý' });
                hist.push(h('Phân công cán bộ', 'tpbt', at[3], 'Chủ trì: ' + W.userName(s.chuTri) + '.'));
            }
            var cur = s.step === 1 ? 'CĐK-01' : 'PLN-02';
            W.upsertRecord({
                id: 'WF-' + code, code: code, maVuViec: code, seedKey: s.key, module: 'YCBT', loaiYeuCau: W.REQUEST_TYPE_YCBT || 'Giải quyết yêu cầu bồi thường',
                nguonHoSo: DVC, hinhThucTiepNhan: W.RECEIVE_METHODS.MOI_TRUONG_SO,
                rootUnitId: 'BTP-01', currentUnitId: cur, status: s.step >= 3 ? S.CHO_TIEP_NHAN : S.DANG_PHAN_CONG,
                routes: routes, chuTri: s.step >= 3 ? s.chuTri : null, approval: null,
                // Hồ sơ nguồn khác Tiếp nhận mới: Cán bộ tiếp nhận là người đầu tiên thao tác Phân công
                receivedBy: W.userName('oanhdh'),
                nycName: s.nyc, nycPhone: s.phone, nycCountry: 'Việt Nam', nycType: s.type || (DATA[s.key].rec.nycType),
                nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: s.ward, nycAddressDetail: s.addr,
                linhVuc: HC, hanhVi: s.hanhVi, hinhThucNhan: 'Phương thức điện tử',
                date: at[0].split(' ')[1], receivedAt: at[0], history: hist
            });
        });
        try { localStorage.setItem(ADD_SEED_KEY, ADD_SEED_V); } catch (e) { /* bỏ qua */ }
    }

    function tpName(code) { var t = TP.find(function (x) { return x.code === code; }); return t ? t.name : TP[3].name; }
    function clone(o) { return JSON.parse(JSON.stringify(o)); }

    // Bổ sung dữ liệu mẫu (01 lần theo phiên bản) cho hồ sơ Dịch vụ công; không ghi đè hồ sơ đã có dữ liệu Dịch vụ công
    function enrichDvcRecords() {
        var list = W.loadRecords();
        list.forEach(function (rec) {
            if (!rec || rec.nguonHoSo !== DVC) return;
            var d = DATA[rec.seedKey] || DATA[rec.maVuViec] || DATA[rec.code];
            if (!d || rec.dvcSeedV === SEED_V || (rec.dvcData && !rec.dvcSeedV)) return;
            var r = clone(d.rec);
            var docs = r.docs; delete r.docs;
            Object.assign(rec, r);
            rec.loaiYeuCau = W.REQUEST_TYPE_YCBT || 'Giải quyết yêu cầu bồi thường';
            rec.module = 'YCBT';
            rec.hinhThucTiepNhan = W.RECEIVE_METHODS.MOI_TRUONG_SO;
            rec.attachedDocs = docs.map(function (x) { return { componentCode: x[0], name: x[1], file: x[2] }; });
            var dv = clone(d.dvc);
            // Phân hệ Giải quyết YCBT: Danh mục tài liệu gửi kèm nhận các dòng tài liệu với tên "[Thành phần hồ sơ] - [Tên tài liệu]"
            dv.files = rec.attachedDocs.map(function (x) { return { name: x.file, title: tpName(x.componentCode) + ' - ' + x.name, url: '#' }; });
            rec.dvcData = dv;
            rec.dvcSeedV = SEED_V;
            W.upsertRecord(rec);
        });
    }

    // Tiếp nhận hồ sơ: bổ sung dữ liệu ngay sau khi tạo hồ sơ mẫu từ các nguồn khác
    if (typeof g.seedOtherSourceRecords === 'function') {
        var origSeed = g.seedOtherSourceRecords;
        g.seedOtherSourceRecords = function () {
            var r = origSeed.apply(this, arguments);
            try { seedAddDvcRecords(); } catch (e) { console.warn('[dvc] seed', e); }
            try { enrichDvcRecords(); } catch (e) { console.warn('[dvc] enrich', e); }
            return r;
        };
    }

    // ---------------- MH03 - Xem chi tiết hồ sơ nguồn Dịch vụ công ----------------
    function esc(v) { return String(v === undefined || v === null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    // [mh03ui] MH03 chỉ đọc: cặp Nhãn - Giá trị (không dùng ô nhập disabled), khối dạng card, lưới 3/4 cột; không có dữ liệu hiển thị "---"
    var EMPTY_V = '---';
    function isEmptyV(v) { var s = String(v === undefined || v === null ? '' : v).trim(); return !s || s === '-' || s === '--' || s === '---'; }
    function dash(v) { return isEmptyV(v) ? EMPTY_V : String(v).trim(); }
    function money(n) { return (Math.round(Number(n) || 0)).toLocaleString('vi-VN').replace(/,/g, '.') + ' đồng'; }
    function valHtml(value, opts) {
        if (opts && opts.html !== undefined) return opts.html;
        return isEmptyV(value) ? '<span class="ro-empty">' + EMPTY_V + '</span>' : esc(String(value).trim());
    }
    // opts: span (2/3 cột), full (cả dòng), area (văn bản nhiều dòng), html (giá trị dựng sẵn, VD badge)
    function fld(label, value, opts) {
        opts = opts || {};
        var cls = 'ro-f' + (opts.full ? ' ro-full' : '') + (opts.span ? ' ro-span-' + opts.span : '') + (opts.area ? ' ro-area' : '');
        return '<div class="' + cls + '"><div class="ro-l">' + esc(label) + '</div><div class="ro-v">' + valHtml(value, opts) + '</div></div>';
    }
    function row(cells, cols) { cells = (cells || []).filter(Boolean); return cells.length ? '<div class="ro-grid ro-g' + (cols || 4) + '">' + cells.join('') + '</div>' : ''; }
    function sec(t, inner, opts) {
        opts = opts || {};
        return '<section class="ro-card' + (opts.cls ? ' ' + opts.cls : '') + '"' + (opts.id ? ' id="' + opts.id + '"' : '') + '><div class="ro-card-h">' + esc(t) + '</div><div class="ro-card-b">' + inner + '</div></section>';
    }
    // Lĩnh vực phát sinh thiệt hại: hiển thị dạng câu (viết hoa chữ cái đầu)
    function sentence(s) { s = String(s || '').trim(); if (!s) return ''; s = s.toLocaleLowerCase('vi'); return s.charAt(0).toLocaleUpperCase('vi') + s.slice(1); }
    function stripCode(w) { return String(w || '').replace(/^\s*\d+\s*-\s*/, ''); }
    var KIND = { both: 'Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)', money: 'Chỉ yêu cầu bồi thường thiệt hại bằng tiền', honor: 'Chỉ yêu cầu phục hồi danh dự' };
    var ROLE_NBTH = 'Người bị thiệt hại';

    function fileIco(f) {
        var e = (String(f || '').split('.').pop() || '').toLowerCase();
        if (e === 'pdf') return 'fa-solid fa-file-pdf ro-ico-pdf';
        if (/^docx?$/.test(e)) return 'fa-solid fa-file-word ro-ico-word';
        if (/^(xlsx?|csv)$/.test(e)) return 'fa-solid fa-file-excel ro-ico-xls';
        if (/^(jpe?g|png|gif|bmp|webp)$/.test(e)) return 'fa-solid fa-file-image ro-ico-img';
        return 'fa-solid fa-file ro-ico-file';
    }
    // Bảng tài liệu chỉ đọc: STT | Tên | File đính kèm (icon + tên tệp, click mở xem) | Thao tác (Xem file, Tải file)
    // act.view(i) / act.dl(i): chuỗi onclick; phần tử có data-file = tên tệp
    function roTable(rows, nameHead, act, emptyText) {
        var head = '<thead><tr><th class="ro-c-stt">STT</th><th class="ro-c-name">' + esc(nameHead) + '</th><th class="ro-c-file">File đính kèm</th><th class="ro-c-act">Thao tác</th></tr></thead>';
        var body = rows.length ? rows.map(function (r, i) {
            var f = r.file, df = ' data-file="' + esc(f || '') + '"';
            return '<tr><td class="ro-c-stt">' + (i + 1) + '</td><td class="ro-c-name">' + valHtml(r.name) + '</td><td class="ro-c-file">'
                + (f ? '<a href="javascript:void(0)" class="ro-file" title="' + esc(f) + '"' + df + ' onclick="' + act.view(i) + '"><i class="' + fileIco(f) + '"></i><span>' + esc(f) + '</span></a>' : '<span class="ro-empty">' + EMPTY_V + '</span>')
                + '</td><td class="ro-c-act">'
                + (f ? '<span class="ro-acts"><button type="button" class="ro-ib" data-admin-icon-normalized="1" title="Xem file" aria-label="Xem file"' + df + ' onclick="' + act.view(i) + '"><i class="fa-solid fa-eye"></i></button>'
                    + '<button type="button" class="ro-ib" data-admin-icon-normalized="1" title="Tải file" aria-label="Tải file"' + df + ' onclick="' + act.dl(i) + '"><i class="fa-solid fa-download"></i></button></span>' : '<span class="ro-empty">' + EMPTY_V + '</span>')
                + '</td></tr>';
        }).join('') : '<tr><td colspan="4" class="ro-tbl-empty">' + esc(emptyText || 'Không có dữ liệu') + '</td></tr>';
        return '<div class="ro-tbl-wrap ga-skip" data-tlkt-skip="1"><table class="ro-table ga-skip">' + head + '<tbody>' + body + '</tbody></table></div>';
    }
    var DVC_ACT = { view: function () { return 'DVC_TN.viewFile(this)'; }, dl: function () { return 'DVC_TN.downloadFile(this)'; } };
    function srcBadge(s) { var cls = 'badge-draft'; try { cls = getSourceBadge(s); } catch (e) { } return '<span class="badge ' + cls + '">' + esc(s) + '</span>'; }
    // Khối Thông tin Hồ sơ yêu cầu: dòng 1 Nguồn | Loại hồ sơ | Hình thức | Lĩnh vực; dòng 2 Cơ quan GQBT | (Ngày văn bản YCBT - DVC) | Loại yêu cầu GQBT
    // o.docDate / o.kind = undefined: không hiển thị trường
    function overviewHtml(o) {
        var r2 = [fld('Cơ quan giải quyết bồi thường', o.agency)];
        if (o.docDate !== undefined) r2.push(fld('Ngày văn bản yêu cầu bồi thường', o.docDate));
        if (o.kind !== undefined) r2.push(fld('Loại yêu cầu giải quyết bồi thường', o.kind, { span: o.docDate !== undefined ? 2 : 3 }));
        return sec('Thông tin Hồ sơ yêu cầu', row([fld('Nguồn hồ sơ', o.source, { html: srcBadge(o.source) }), fld('Loại hồ sơ', o.type), fld('Hình thức tiếp nhận', o.method), fld('Lĩnh vực phát sinh thiệt hại', sentence(o.field))]) + row(r2));
    }
    function damageTable(list) {
        var TH = g.BTNN_TH;
        if (!TH) return '';
        return TH.tableHtml({
            tid: 'dvcThietHaiTree', list: list || [], all: false, open: 'all', empty: 'Không có thiệt hại yêu cầu bồi thường',
            head: ['<th style="min-width:260px;">Cách tính / Diễn giải công thức áp dụng</th>', '<th style="width:200px; text-align:right;">Số tiền yêu cầu bồi thường (đồng)</th>'],
            cols: [
                { k: 'calc', td: function (c, d) { return esc(d ? d.calc : ''); } },
                { k: 'val', sum: true, align: 'right', v: function (c, d) { return d ? Number(d.val) || 0 : 0; }, td: function (c, d) { return TH.fmt(d ? d.val : 0) + ' đ'; } }
            ],
            total: { label: 'Tổng cộng số tiền yêu cầu bồi thường:' }
        });
    }

    // [tnd] Bố cục, thứ tự khối, nhãn trường theo MH02 - Nhập liệu hồ sơ vụ việc (quan_ly_boi_thuong.html, quan_ly_boi_thuong_nbth.js)
    // Nhãn "Địa chỉ, đầu mối nhận thông báo" theo Phương thức nhận thông báo (như MH02)
    function notifyAddrLabel(m) {
        if (m === 'Trực tiếp') return 'Địa chỉ, đầu mối nhận thông báo (Trực tiếp tại trụ sở)';
        if (m === 'Qua dịch vụ bưu chính') return 'Địa chỉ nhận thông báo qua dịch vụ bưu chính';
        if (m === 'Qua thư điện tử') return 'Thư điện tử (Email) nhận thông báo';
        if (m === 'Qua phương tiện điện tử khác') return 'Địa chỉ, đầu mối nhận thông báo qua phương tiện điện tử khác';
        return 'Địa chỉ, đầu mối nhận thông báo (Tài khoản Cổng DVC / Số ĐDCN / VNeID)';
    }
    // [tnp] Khối Người yêu cầu / Tổ chức bị thiệt hại đã chấm dứt tồn tại / Người bị thiệt hại - dùng chung MH03 mọi Nguồn hồ sơ:
    // hiển thị theo Loại người yêu cầu / Loại người bị thiệt hại, không có dữ liệu hiển thị "---"
    // [mh03ui] Lưới 4 cột theo nhóm: Phân loại | Định danh | Giấy tờ | (Người đại diện) | Liên hệ, địa bàn | Địa chỉ chi tiết
    function addrRows(p, withEmail) {
        return row([withEmail ? fld('Email', p.email) : '', fld('Quốc gia', p.country), fld('Tỉnh/Thành phố', stripCode(p.city)), fld('Phường/Xã', stripCode(p.ward))])
            + row([fld('Địa chỉ chi tiết', p.address, { full: true })]);
    }
    function personRows(p) {
        if (p.isOrg) return row([fld('Tên tổ chức', p.name, { span: 2 }), fld('Mã số tổ chức', p.orgCode), fld('Số điện thoại', p.phone)])
            + row([fld('Số giấy tờ thành lập/đăng ký', p.orgDocNo, { span: 2 }), fld('Ngày cấp', p.orgDocDate), fld('Nơi cấp', p.orgDocPlace)])
            + row([fld('Họ và tên người đại diện theo pháp luật', p.repName, { span: 2 }), fld('Chức vụ người đại diện', p.repPosition, { span: 2 })])
            + addrRows(p, true);
        return row([fld('Họ và tên', p.name, { span: 2 }), fld('Ngày sinh', p.dob), fld('Số điện thoại', p.phone)])
            + row([fld('Loại giấy tờ thân nhân', p.docType), fld('Số giấy tờ thân nhân', p.docNo), fld('Ngày cấp', p.docDate), fld('Nơi cấp', p.docPlace)])
            + addrRows(p, true);
    }
    function partyHtml(p) {
        var role = p.role || ROLE_NBTH;
        var orgRole = !!(W.isNbthOrgRole && W.isNbthOrgRole(role));
        var nb = p.nb || {};
        // Trạng thái người bị thiệt hại: chỉ hiển thị khi người bị thiệt hại là cá nhân (E-Form STT 10):
        // Tư cách = Người bị thiệt hại và Loại người yêu cầu = Cá nhân; hoặc khối Người bị thiệt hại hiển thị và Loại người bị thiệt hại = Cá nhân
        var personVictim = role === ROLE_NBTH ? !p.isOrg : (!orgRole && !nb.isOrg);
        var head = [fld('Loại người yêu cầu', p.isOrg ? 'Tổ chức' : 'Cá nhân'), fld('Tư cách người yêu cầu bồi thường', role, { span: 2 })];
        if (personVictim) head.push(fld('Trạng thái người bị thiệt hại', p.alive));
        var h = sec('Thông tin người yêu cầu', row(head) + personRows(p));
        if (role === ROLE_NBTH) return h;
        if (orgRole) {
            var o = p.org || {};
            return h + sec('Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại', row([fld('Tên tổ chức bị thiệt hại', o.name, { span: 3 }), fld('Mã số tổ chức', o.code)]) + addrRows(o, false));
        }
        return h + sec('Thông tin người bị thiệt hại', row([fld('Loại người bị thiệt hại', nb.isOrg ? 'Tổ chức' : 'Cá nhân')]) + personRows(nb));
    }
    // Hồ sơ nguồn Dịch vụ công: dữ liệu bản ghi luồng
    function partyFromRec(item, r, d) {
        var nb = r.nbth || {}, oa = r.nbthOrgAddr || {};
        return {
            isOrg: (r.nycType || item.nycType) === 'Tổ chức', role: r.nycRole || item.nycRole || ROLE_NBTH,
            name: r.nycName || item.nyc, dob: r.nycDob, alive: d.victimAlive === 'no' ? 'Đã mất' : 'Còn sống',
            docType: r.nycDocType, docNo: r.nycDocNo, docDate: r.nycDocDate, docPlace: r.nycDocPlace,
            orgCode: r.nycOrgCode, orgDocNo: r.nycOrgDocNo, orgDocDate: r.nycOrgDocDate, orgDocPlace: r.nycOrgDocPlace, repName: r.nycRepName, repPosition: r.nycRepPosition,
            phone: r.nycPhone || item.nycPhone, email: r.nycEmail, country: r.nycCountry || 'Việt Nam', city: r.nycTinhThanh, ward: r.nycPhuongXa, address: r.nycAddressDetail,
            org: { name: r.nbthOrgName, code: r.nbthOrgCode, country: oa.country || 'Việt Nam', city: oa.city, ward: oa.ward, address: oa.address },
            nb: {
                isOrg: nb.type === 'Tổ chức', name: nb.name, dob: nb.dob, docType: nb.docType, docNo: nb.docNo, docDate: nb.docDate, docPlace: nb.docPlace,
                orgCode: nb.orgCode, orgDocNo: nb.orgDocNo, orgDocDate: nb.orgDocDate, orgDocPlace: nb.orgDocPlace, repName: nb.repName, repPosition: nb.repPosition,
                phone: nb.phone, email: nb.email, country: nb.country || 'Việt Nam', city: nb.city, ward: nb.ward, address: nb.address
            }
        };
    }
    // Hồ sơ nguồn khác Dịch vụ công: giá trị đã nạp lên form ở chế độ xem; trường không có trên form lấy theo bản ghi
    function tv(id) {
        var e = document.getElementById(id);
        if (!e) return '';
        if (e.tagName === 'SELECT') { var o = e.options[e.selectedIndex]; return o && o.value ? o.text : ''; }
        var v = String(e.value || '').trim();
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
        return m ? m[3] + '/' + m[2] + '/' + m[1] : v;
    }
    function radioVal(name) { var e = document.querySelector('input[name="' + name + '"]:checked'); return e ? e.value : ''; }
    function partyFromForm(item) {
        var c = item || {}, nb = c.nbth || {};
        return {
            isOrg: radioVal('formNycType') === 'Tổ chức', role: tv('formRequesterRole') || c.nycRole || ROLE_NBTH,
            name: tv('formRequester'), dob: c.nycDob, alive: c.victimAlive === 'no' ? 'Đã mất' : (c.victimAlive ? 'Còn sống' : ''),
            docType: tv('formNycDocType'), docNo: tv('formNycDocNo'), docDate: c.nycDocDate, docPlace: c.nycDocPlace,
            orgCode: tv('formNycOrgCode'), orgDocNo: c.nycOrgDocNo, orgDocDate: c.nycOrgDocDate, orgDocPlace: c.nycOrgDocPlace, repName: c.nycRepName, repPosition: c.nycRepPosition,
            phone: tv('formPhone'), email: tv('formEmail'), country: tv('formCountry'), city: tv('formCity'), ward: tv('formWard'), address: tv('formAddress'),
            org: { name: tv('nbthOrgName'), code: tv('nbthOrgCode'), country: tv('nbthOrgCountry'), city: tv('nbthOrgCity'), ward: tv('nbthOrgWard'), address: tv('nbthOrgAddress') },
            nb: {
                isOrg: radioVal('nbthType') === 'Tổ chức', name: tv('nbthName'), dob: tv('nbthDob'), docType: tv('nbthDocType'), docNo: tv('nbthDocNo'), docDate: nb.docDate, docPlace: nb.docPlace,
                orgCode: tv('nbthPOrgCode'), orgDocNo: nb.orgDocNo, orgDocDate: nb.orgDocDate, orgDocPlace: nb.orgDocPlace, repName: nb.repName, repPosition: nb.repPosition,
                phone: tv('nbthPhone'), email: tv('nbthEmail'), country: tv('nbthCountry'), city: tv('nbthCity'), ward: tv('nbthWard'), address: tv('nbthAddress')
            }
        };
    }
    function buildHtml(item, rec) {
        var d = (rec && rec.dvcData) || {};
        var r = rec || {};
        var kind = r.requestKind || item.requestKind || '';
        var h = '';
        // I. Thông tin Hồ sơ yêu cầu
        h += overviewHtml({ source: DVC, type: W.REQUEST_TYPE_YCBT || 'Giải quyết yêu cầu bồi thường', method: W.RECEIVE_METHODS.MOI_TRUONG_SO, field: r.linhVuc || item.linhVuc,
            agency: W.unitName(r.rootUnitId || item.rootUnitId), docDate: d.requestDocDate || '', kind: KIND[kind] || '' });
        // II. Thông tin người yêu cầu; Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại / Thông tin người bị thiệt hại (theo Tư cách)
        h += partyHtml(partyFromRec(item, r, d));
        // Văn bản làm căn cứ yêu cầu bồi thường (Thành phần hồ sơ 2): bảng văn bản trước, sau đó Hành vi, Mối quan hệ nhân quả (như MH02)
        h += sec('Văn bản làm căn cứ yêu cầu bồi thường', '<div id="dvcBasisTable">' + roTable((r.vanBanCanCu || []).map(function (x) { return { name: x.name, file: x.file }; }), 'Tên văn bản căn cứ', DVC_ACT) + '</div>'
            + '<div class="ro-sub">' + row([fld('Hành vi gây thiệt hại của người thi hành công vụ', r.hanhVi || item.hanhVi, { full: true, area: true })])
            + row([fld('Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại', d.nhanQua, { full: true, area: true })]) + '</div>');
        // Phương thức đề nghị nhận thông báo
        h += sec('Phương thức đề nghị nhận thông báo về việc giải quyết yêu cầu bồi thường',
            row([fld('Phương thức nhận thông báo', r.notifyMethod), fld(notifyAddrLabel(r.notifyMethod), r.notifyAddress, { span: 3 })]));
        // Thiệt hại yêu cầu bồi thường / Tạm ứng / Người nhận (ẩn khi Chỉ yêu cầu phục hồi danh dự, như MH02)
        if (kind !== 'honor') {
            var dmg = d.thietHaiList || [];
            h += sec('Thiệt hại yêu cầu bồi thường', '<div class="table-container">' + damageTable(dmg) + '</div>');
            var adv = Number(d.advanceNum) > 0;
            h += sec('Đề nghị tạm ứng kinh phí', row([fld('Có đề nghị tạm ứng kinh phí bồi thường (Điều 44)', adv ? 'Có' : 'Không'),
                adv ? fld('Tạm ứng Thiệt hại tinh thần (đồng)', Number(d.advanceTinhThan) > 0 ? money(d.advanceTinhThan) : '') : '',
                adv ? fld('Tạm ứng Thiệt hại khác tính được ngay (đồng)', Number(d.advanceKhac) > 0 ? money(d.advanceKhac) : '') : '',
                adv ? fld('Tổng số tiền đề nghị tạm ứng', money(d.advanceNum)) : '']));
            // Thông tin người nhận & phương thức chi trả: hiển thị khi có đề nghị tạm ứng hoặc có thiệt hại yêu cầu bồi thường (như MH02)
            if (adv || dmg.length) {
                var bank = d.advanceRecKenh === 'chuyen-khoan';
                h += sec('Thông tin người nhận & phương thức chi trả',
                    row([fld('Họ và tên người nhận', d.advanceRecName), fld('Giấy tờ thân nhân', d.advanceRecCard), fld('Địa chỉ chi tiết', d.advanceRecAddress, { span: 2 })])
                    + row([fld('Phương thức nhận tiền', bank ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt')])
                    + (bank ? row([fld('Chủ tài khoản', d.advanceBankUser), fld('Số tài khoản', d.advanceBankAccount), fld('Tên ngân hàng', d.advanceBankName), fld('Chi nhánh', d.advanceBankBranch)]) : ''));
            }
        }
        // Nội dung khác: khối Yêu cầu phục hồi danh dự chỉ khi Loại yêu cầu có phục hồi danh dự (như MH02)
        var honorOn = d.restoreHonor || kind === 'honor';
        var forms = [];
        if (d.phddFormApology) forms.push('Trực tiếp xin lỗi và cải chính công khai tại nơi cư trú / trụ sở (Điều 58)');
        if (d.phddFormNews) forms.push('Đăng báo xin lỗi và cải chính công khai (Điều 59)');
        var other = String(d.otherRestore || '').trim();
        h += sec('Nội dung khác',
            (kind === 'both' || kind === 'honor'
                ? row([fld('Đề nghị cơ quan giải quyết chủ động tiến hành phục hồi danh dự (Điều 57)', honorOn ? 'Có' : 'Không', { span: 2 }), fld('Hình thức đề nghị phục hồi danh dự mong muốn (Điều 56)', forms.join('; '), { span: 2 })])
                : '')
            + row([fld('Yêu cầu khôi phục quyền và lợi ích hợp pháp khác (nếu có)', other ? 'Có' : 'Không', { span: 2 })])
            + (other ? row([fld('Nội dung yêu cầu khôi phục quyền và lợi ích hợp pháp khác', other, { full: true, area: true })]) : ''));
        // Bảng tài liệu đính kèm: tài liệu nhận từ Dịch vụ công (Thành phần hồ sơ (1), (3), (4)); (2) tại khối Văn bản làm căn cứ yêu cầu bồi thường
        var docs = (r.attachedDocs || []).map(function (x) { return { name: x.name, file: x.file }; });
        h += sec('Tài liệu đính kèm', '<div id="dvcDocsTable">' + roTable(docs, 'Tên tài liệu, văn bản', DVC_ACT) + '</div>');
        return h;
    }
    // [mh03ui] MH03 hồ sơ nguồn khác Dịch vụ công: dựng toàn bộ nội dung chỉ đọc từ giá trị đã nạp lên form (giữ nguyên dữ liệu, điều kiện hiển thị của form)
    function stdHtml(item) {
        var kg = document.getElementById('formRequestKindGroup');
        var kindOn = !!kg && kg.style.display !== 'none';
        var src = ''; try { src = getSourceOf(item); } catch (e) { }
        var h = overviewHtml({ source: src, type: tv('formRequestType'), method: tv('formReceiveMethod'), field: tv('formFieldGroup'), agency: agencyName(item),
            kind: kindOn ? tv('formRequestKindText') : undefined });
        h += partyHtml(partyFromForm(item));
        h += sec('Thông tin hành vi gây thiệt hại', row([fld('Hành vi gây thiệt hại của người thi hành công vụ', tv('formHanhVi'), { full: true, area: true })]));
        // Văn bản làm căn cứ / Bảng tài liệu đính kèm: không có dữ liệu thì không hiển thị khối (như trước)
        var basis = typeof basisRows !== 'undefined' && Array.isArray(basisRows) ? basisRows : [];
        var docs = typeof docRows !== 'undefined' && Array.isArray(docRows) ? docRows : [];
        if (basis.length) h += sec('Văn bản làm căn cứ yêu cầu bồi thường', roTable(basis, 'Tên văn bản căn cứ', { view: function (i) { return 'viewBasisFile(' + i + ')'; }, dl: function (i) { return 'downloadBasisFile(' + i + ')'; } }));
        if (docs.length) h += sec('Tài liệu đính kèm', roTable(docs, 'Tên tài liệu, văn bản', { view: function (i) { return 'viewDocFile(' + i + ')'; }, dl: function (i) { return 'downloadDocFile(' + i + ')'; } }));
        return h;
    }

    function ensureView() {
        var v = document.getElementById('dvcDetailView');
        if (v) return v;
        var wf = document.getElementById('wfInfoBlock');
        v = document.createElement('div');
        v.id = 'dvcDetailView';
        v.style.display = 'none';
        wf.parentNode.insertBefore(v, wf);
        var s = document.createElement('style');
        s.textContent = '#formView .dvc-std-hide, #formView .tnp-hide{display:none !important;} #dvcDetailView .bth-table td{vertical-align:top;}';
        document.head.appendChild(s);
        return v;
    }
    // Khối luôn giữ tại MH03 (không ẩn khi thay form bằng nội dung chỉ đọc)
    var KEEP = { formMetaGrid: 1, wfInfoBlock: 1, dvcDetailView: 1, ptnDetailBlock: 1, tnStdView: 1 };
    function setStdBlocks(hide) {
        var body = document.querySelector('#formView .inline-form-body');
        if (!body) return;
        Array.prototype.forEach.call(body.children, function (c) {
            if (c.id === 'formMetaGrid' || c.id === 'wfInfoBlock' || c.id === 'dvcDetailView') return;
            c.classList.toggle('dvc-std-hide', !!hide);
        });
    }
    function isDvcItem(item) { try { return !!item && getSourceOf(item) === DVC; } catch (e) { return false; } }

    function agencyName(item) {
        var id = item.rootUnitId || '';
        try { if (!id && typeof getSeedRootUnit === 'function') id = getSeedRootUnit(item); } catch (e) { }
        return (id && W.unitName ? W.unitName(id) : '') || item.agency || '';
    }
    // [tnp][mh03ui] MH03 hồ sơ nguồn khác Dịch vụ công: ẩn toàn bộ khối nhập liệu của form, hiển thị #tnStdView (stdHtml) ngay dưới thanh thông tin chung;
    // khối Lý do bị trả lại / Thông tin Phiếu tiếp nhận (#ptnDetailBlock), Quá trình phân công / Lịch sử xử lý (#wfInfoBlock) giữ nguyên vị trí
    function setStdView(on, item) {
        var body = document.querySelector('#formView .inline-form-body');
        if (!body) return;
        var v = document.getElementById('tnStdView');
        if (!v) {
            v = document.createElement('div');
            v.id = 'tnStdView';
            v.setAttribute('data-tlkt-skip', '1');
            var meta = document.getElementById('formMetaGrid');
            body.insertBefore(v, meta ? meta.nextSibling : body.firstChild);
        }
        Array.prototype.forEach.call(body.children, function (c) { if (!KEEP[c.id]) c.classList.toggle('tnp-hide', !!on); });
        v.style.display = on ? 'block' : 'none';
        v.innerHTML = on ? stdHtml(item) : '';
    }
    // Thanh thông tin chung (Mã vụ việc, Thời điểm tiếp nhận, Cán bộ tiếp nhận): không có dữ liệu hiển thị "---"
    function metaEmpty(on) {
        ['formCodeText', 'formReceivedAtText', 'formReceivedByText'].forEach(function (id) {
            var e = document.getElementById(id);
            if (e && on && isEmptyV(e.textContent)) e.innerHTML = '<span class="ro-empty">' + EMPTY_V + '</span>';
        });
    }

    function afterOpen(id, isReadOnly) {
        var view = ensureView();
        var item = id ? getDetailItem(id) : null;
        var shown = document.getElementById('formView').style.display !== 'none';
        var on = !!isReadOnly && isDvcItem(item) && shown;
        setStdBlocks(on);
        setStdView(!!isReadOnly && !!item && !on && shown, item);
        view.style.display = on ? 'block' : 'none';
        view.innerHTML = on ? buildHtml(item, W.getRecord(item.code)) : '';
        metaEmpty(!!isReadOnly && !!item);
        if (on) document.getElementById('formTitle').innerHTML = '<i class="fa-solid fa-circle-info"></i> CHI TIẾT HỒ SƠ TIẾP NHẬN';
    }
    if (typeof g.openReceptionForm === 'function') {
        var origOpen = g.openReceptionForm;
        g.openReceptionForm = function (id, isReadOnly) {
            var r = origOpen.apply(this, arguments);
            try { afterOpen(id, isReadOnly); } catch (e) { console.warn('[dvc] view', e); }
            return r;
        };
    }
    if (typeof g.closeReceptionForm === 'function') {
        var origClose = g.closeReceptionForm;
        g.closeReceptionForm = function () {
            setStdBlocks(false);
            try { setStdView(false, null); } catch (e) { }
            var v = document.getElementById('dvcDetailView');
            if (v) { v.style.display = 'none'; v.innerHTML = ''; }
            return origClose.apply(this, arguments);
        };
    }

    g.DVC_TN = {
        TP: TP, DATA: DATA, enrich: enrichDvcRecords, buildHtml: buildHtml,
        viewFile: function (a) { if (typeof g.showToast === 'function') g.showToast('Mở xem tệp ' + (a.getAttribute('data-file') || '') + ' tại tab mới.', 'info'); },
        downloadFile: function (a) { if (typeof g.showToast === 'function') g.showToast('Đã tải tệp ' + (a.getAttribute('data-file') || '') + ' (giả lập).', 'info'); }
    };
})(window);
