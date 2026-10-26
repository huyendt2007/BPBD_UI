/*
 * Luồng phân công - phê duyệt dùng chung cho phân hệ Bồi thường nhà nước (mockup).
 * Dùng bởi: Tiếp nhận hồ sơ, Xác định cơ quan giải quyết bồi thường, Giải quyết yêu cầu bồi thường,
 * Dashboard Lãnh đạo, Cấu hình luồng xử lý, Quản lý danh mục (Đơn vị áp dụng của Loại hồ sơ).
 * Dữ liệu giả lập lưu tại localStorage.
 */
(function (global) {
    'use strict';

    const KEY_RECORDS = 'btnn_wf_records_v1';
    const KEY_FLOW = 'btnn_flow_config_v2'; // { [Loại luồng]: { [đơn vị gốc]: { [đơn vị]: nút cấu hình } } }
    const KEY_FLOW_V1 = 'btnn_flow_config_v1';
    const KEY_USER = 'btnn_demo_user_v1';
    const KEY_SEED = 'btnn_wf_seed_version';
    const SEED_VERSION = 'v4_cuc_only';
    const CATALOG_TYPE = 'DM_54';

    const REQUEST_TYPE_XD = 'Xác định cơ quan giải quyết bồi thường';
    const REQUEST_TYPE_YCBT = 'Giải quyết yêu cầu bồi thường';
    const REQUEST_TYPE_YCBT_OLD = 'Yêu cầu bồi thường';

    // Loại luồng tại Cấu hình luồng xử lý
    const FLOW_TYPES = { XD_BTP: 'XD_BTP', XD_STP: 'XD_STP', GQ: 'GQ' };
    const FLOW_TYPE_NAMES = { XD_BTP: 'Xác định CQGQBT - Bộ Tư pháp', XD_STP: 'Xác định CQGQBT - Sở Tư pháp', GQ: 'Giải quyết YCBT' };
    const FLOW_TYPE_ORDER = ['XD_BTP', 'XD_STP', 'GQ'];

    // Nguồn hồ sơ và Hình thức tiếp nhận tại Tiếp nhận hồ sơ
    const SOURCES = { TIEP_NHAN: 'Tiếp nhận mới', DVC: 'Dịch vụ công quốc gia', CHUYEN: 'Chuyển CQGQBT', XDCQ: 'Xác định CQGQBT' };
    // Hình thức tiếp nhận: Danh mục dùng chung DM_25 (04 giá trị); form Tiếp nhận mới chỉ gồm Trực tiếp, Qua dịch vụ bưu chính
    const RECEIVE_METHOD_CATALOG = 'DM_25';
    const RECEIVE_METHODS = { MOI_TRUONG_SO: 'Qua môi trường số (Dịch vụ Công)', TRUC_TIEP: 'Trực tiếp', MOT_CUA: 'Bộ phận Một cửa', BUU_CHINH: 'Qua dịch vụ bưu chính' };
    RECEIVE_METHODS.DVC = RECEIVE_METHODS.MOI_TRUONG_SO; // tên cũ, giữ để các trang đang dùng không lỗi
    const RECEIVE_METHOD_ORDER = [RECEIVE_METHODS.MOI_TRUONG_SO, RECEIVE_METHODS.TRUC_TIEP, RECEIVE_METHODS.MOT_CUA, RECEIVE_METHODS.BUU_CHINH];
    const FORM_RECEIVE_METHODS = [RECEIVE_METHODS.TRUC_TIEP, RECEIVE_METHODS.BUU_CHINH];

    const STATUS = {
        CHO_PHAN_CONG: 'Chờ phân công',
        DANG_PHAN_CONG: 'Đang phân công',
        CHO_TIEP_NHAN: 'Chờ tiếp nhận',
        XAC_MINH: 'Xác minh CQGQBT', // Xác định CQGQBT: cán bộ đã tiếp nhận, nhập liệu hồ sơ
        DANG_THUC_HIEN: 'Đang thực hiện',
        CHO_PHE_DUYET: 'Chờ duyệt', // trạng thái chung khi hồ sơ đang có phiếu trình; loại việc xem tại Nội dung trình
        KHONG_THU_LY: 'Không thụ lý',
        DA_CHUYEN: 'Đã chuyển CQGQBT',
        CHO_PHAT_HANH: 'Chờ phát hành văn bản',
        BI_TRA_LAI: 'Bị trả lại',
        CHO_CHUYEN: 'Chờ chuyển CQGQBT',
        YC_BO_SUNG: 'Yêu cầu bổ sung',
        BI_TU_CHOI: 'Bị từ chối',
        HOAN_THANH: 'Hoàn thành',
        LUU_NHAP: 'Lưu nháp'
    };

    // Loại trình phê duyệt của cán bộ chủ trì -> trạng thái sau khi cấp phê duyệt cuối cùng đồng ý
    // Nội dung trình -> trạng thái mặc định khi cấp phê duyệt cuối cùng đồng ý (phân hệ có thể truyền resultStatus riêng)
    const KIND_KQXD = 'Kết quả xác định CQGQBT'; // Nội dung trình kết quả xác định cơ quan giải quyết bồi thường
    // Xác định CQGQBT: Kết quả xác định CQGQBT ký duyệt xong thì hệ thống tự động chuyển CQGQBT -> Đã chuyển CQGQBT
    const SUBMIT_KINDS = {
        'Kết quả xác định CQGQBT': STATUS.DA_CHUYEN,
        'Kết quả xác định': STATUS.DA_CHUYEN,
        'Hoàn thành xác định': STATUS.DA_CHUYEN,
        'Yêu cầu bổ sung': STATUS.YC_BO_SUNG,
        'Từ chối': STATUS.KHONG_THU_LY,
        'Không thụ lý': STATUS.KHONG_THU_LY,
        'Chuyển CQGQBT': STATUS.DA_CHUYEN,
        'Tiếp nhận hồ sơ': 'Cử người giải quyết bồi thường', // Giải quyết YCBT
        'Tiếp nhận yêu cầu': STATUS.XAC_MINH
    };
    // Danh sách Nội dung trình theo phân hệ (bộ lọc "Nội dung trình")
    const APPROVAL_KINDS = {
        XD: ['Yêu cầu bổ sung', 'Không thụ lý', KIND_KQXD],
        YCBT: ['Tiếp nhận hồ sơ', 'Yêu cầu bổ sung', 'Không thụ lý', 'Cử người giải quyết bồi thường', 'Chuyển CQGQBT', 'Hoãn giải quyết bồi thường', 'Tạm đình chỉ giải quyết bồi thường', 'Tiếp tục giải quyết bồi thường', 'Đình chỉ giải quyết bồi thường', 'Quyết định GQBT', 'Hủy QĐ', 'Sửa chữa, bổ sung QĐ'],
        // Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường: chỉ gồm 02 Loại trình
        KP: ['Thông báo chi trả', 'QĐ tạm ứng kinh phí']
    };
    const KIND_KP_TB = 'Thông báo chi trả';
    const KIND_KP_QDTU = 'QĐ tạm ứng kinh phí';
    // Giải quyết YCBT: Nội dung trình Quyết định cử người giải quyết bồi thường (Mẫu 06/BTNN) - Thủ trưởng cơ quan giải quyết bồi thường trình
    const KIND_CU_NGUOI = 'Cử người giải quyết bồi thường';
    // Danh mục Lý do không thụ lý (DM_55) - Điều 43 Luật TNBTCNN số 10/2017/QH14
    const KTL_CATALOG_TYPE = 'DM_55';
    const DEFAULT_KTL_REASONS = [
        { code: 'KTL_01', name: 'Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình (Điểm a Khoản 2 Điều 43)' },
        { code: 'KTL_02', name: 'Thời hiệu yêu cầu bồi thường đã hết (Điểm b Khoản 2 Điều 43)' },
        { code: 'KTL_03', name: 'Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước được quy định tại Chương II của Luật này (Điểm c Khoản 2 Điều 43)' },
        { code: 'KTL_04', name: 'Người yêu cầu bồi thường không phải là người có quyền yêu cầu bồi thường theo quy định tại Điều 5 của Luật này (Điểm d Khoản 2 Điều 43)' },
        { code: 'KTL_05', name: 'Hồ sơ không đầy đủ theo quy định tại Điều 41 của Luật này mà người yêu cầu bồi thường không bổ sung trong thời hạn quy định tại khoản 3 Điều 42 của Luật này (Điểm đ Khoản 2 Điều 43)' },
        { code: 'KTL_06', name: 'Yêu cầu bồi thường đã được thực hiện theo quy định tại điểm a khoản 1 Điều 52 của Luật này và đã được Tòa án có thẩm quyền thụ lý theo thủ tục tố tụng dân sự (Điểm e Khoản 2 Điều 43)' },
        { code: 'KTL_07', name: 'Yêu cầu bồi thường đã được Tòa án có thẩm quyền chấp nhận theo quy định tại khoản 1 Điều 55 của Luật này (Điểm g Khoản 2 Điều 43)' },
        { code: 'KTL_08', name: 'Yêu cầu bồi thường đã được giải quyết bằng bản án, quyết định đã có hiệu lực pháp luật (Điểm h Khoản 2 Điều 43)' }
    ];

    // ---------------- Cơ cấu tổ chức (trích từ Quản lý đơn vị) ----------------
    const ORG_UNITS = [
        { id: 'BTP-01', name: 'Bộ Tư pháp', parentId: null },
        { id: 'CĐK-01', name: 'Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước', parentId: 'BTP-01' },
        { id: 'PLN-02', name: 'Phòng Quản lý nghiệp vụ về bồi thường nhà nước', parentId: 'CĐK-01' },
        { id: 'STP-HN', name: 'Sở Tư pháp Thành phố Hà Nội', parentId: null },
        { id: 'STP-HN-HCTP', name: 'Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hà Nội', parentId: 'STP-HN' },
        { id: 'STP-HCM', name: 'Sở Tư pháp Thành phố Hồ Chí Minh', parentId: null },
        { id: 'STP-HCM-HCTP', name: 'Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hồ Chí Minh', parentId: 'STP-HCM' },
        { id: 'UBND-CG', name: 'UBND quận Cầu Giấy, Thành phố Hà Nội', parentId: null },
        { id: 'UBND-CG-TP', name: 'Phòng Tư pháp - UBND quận Cầu Giấy', parentId: 'UBND-CG' },
        { id: 'THADS-LD', name: 'Cục Thi hành án dân sự tỉnh Lâm Đồng', parentId: null },
        { id: 'THADS-LD-NV', name: 'Phòng Nghiệp vụ và Tổ chức thi hành án - Cục THADS tỉnh Lâm Đồng', parentId: 'THADS-LD' },
        { id: 'UBND-HK', name: 'UBND quận Hoàn Kiếm, Thành phố Hà Nội', parentId: null },
        { id: 'TAND-LD', name: 'Tòa án nhân dân tỉnh Lâm Đồng', parentId: null },
        // Cơ quan giải quyết bồi thường của dữ liệu mẫu Giải quyết yêu cầu bồi thường (phục vụ chọn cán bộ được cử giải quyết)
        { id: 'UBND-HM', name: 'UBND quận Hoàng Mai, Thành phố Hà Nội', parentId: null },
        { id: 'UBND-HM-TP', name: 'Phòng Tư pháp - UBND quận Hoàng Mai', parentId: 'UBND-HM' },
        { id: 'CA-TX', name: 'Công an quận Thanh Xuân, Thành phố Hà Nội', parentId: null },
        { id: 'TAND-HN', name: 'Tòa án nhân dân Thành phố Hà Nội', parentId: null },
        { id: 'TAND-HK', name: 'Tòa án nhân dân quận Hoàn Kiếm, Thành phố Hà Nội', parentId: null },
        { id: 'STP-HP', name: 'Sở Tư pháp Thành phố Hải Phòng', parentId: null },
        { id: 'STP-HP-HCTP', name: 'Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hải Phòng', parentId: 'STP-HP' },
        { id: 'THADS-HP', name: 'Cục Thi hành án dân sự Thành phố Hải Phòng', parentId: null },
        { id: 'UBND-LD', name: 'UBND tỉnh Lâm Đồng', parentId: null },
        { id: 'UBND-DD', name: 'UBND quận Đống Đa, Thành phố Hà Nội', parentId: null },
        { id: 'THADS-HN', name: 'Cục Thi hành án dân sự Thành phố Hà Nội', parentId: null },
        { id: 'VKSNDTC', name: 'Viện kiểm sát nhân dân tối cao', parentId: null },
        { id: 'UBND-HN', name: 'UBND Thành phố Hà Nội', parentId: null },
        { id: 'VKS-Q1', name: 'Viện kiểm sát nhân dân Quận 1, Thành phố Hồ Chí Minh', parentId: null },
        { id: 'CCTHADS-BT', name: 'Chi cục Thi hành án dân sự quận Bình Tân, Thành phố Hồ Chí Minh', parentId: null },
        { id: 'CCTS-BD', name: 'Chi cục Thủy sản tỉnh Bình Định', parentId: null },
        { id: 'TAND-LC', name: 'Tòa án nhân dân quận Liên Chiểu, Thành phố Đà Nẵng', parentId: null },
        { id: 'CCTHADS-CG', name: 'Chi cục Thi hành án dân sự quận Cầu Giấy, Thành phố Hà Nội', parentId: null },
        { id: 'TAND-NT', name: 'Tòa án nhân dân thành phố Nha Trang, tỉnh Khánh Hòa', parentId: null },
        { id: 'CA-HM', name: 'Công an quận Hoàng Mai, Thành phố Hà Nội', parentId: null },
        { id: 'CCTHADS-TT', name: 'Chi cục Thi hành án dân sự huyện Thanh Trì, Thành phố Hà Nội', parentId: null },
        { id: 'VKS-HP', name: 'Viện kiểm sát nhân dân Thành phố Hải Phòng', parentId: null },
        // Cơ quan quản lý CSDL có liên quan đến công tác BTNN (dữ liệu mẫu module Thông tin từ các CSDL liên quan)
        { id: 'TANDTC', name: 'Tòa án nhân dân tối cao', parentId: null },
        { id: 'VPCP', name: 'Văn phòng Chính phủ', parentId: null },
        { id: 'TTCP', name: 'Thanh tra Chính phủ', parentId: null },
        // Bộ quản lý ngành (dữ liệu mẫu module Theo dõi, đôn đốc công tác BTNN)
        { id: 'BTC', name: 'Bộ Tài chính', parentId: null }
    ];

    const USERS = [
        { id: 'oanhdh', name: 'Đặng Hoàng Oanh', unitId: 'BTP-01', title: 'Lãnh đạo Bộ', email: 'oanhdh@moj.gov.vn' },
        { id: 'khoiml', name: 'Mai Lương Khôi', unitId: 'BTP-01', title: 'Lãnh đạo Bộ', email: 'khoiml@moj.gov.vn' },
        { id: 'cuctruong', name: 'Nguyễn Văn Cục Trưởng', unitId: 'CĐK-01', title: 'Cục trưởng', email: 'cuctruong@moj.gov.vn' },
        { id: 'cucpho', name: 'Phạm Thị Hồng Vân', unitId: 'CĐK-01', title: 'Phó Cục trưởng', email: 'cucpho@moj.gov.vn' },
        { id: 'tpbt', name: 'Trần Văn Bồi Thường', unitId: 'PLN-02', title: 'Trưởng phòng', email: 'tpbt@moj.gov.vn' },
        { id: 'canbonv', name: 'Nguyễn Văn Cán Bộ', unitId: 'PLN-02', title: 'Chuyên viên', email: 'canbonv@moj.gov.vn' },
        { id: 'hatt', name: 'Trần Thị Thu Hà', unitId: 'PLN-02', title: 'Chuyên viên', email: 'hatt@moj.gov.vn' },
        { id: 'ducpm', name: 'Phạm Minh Đức', unitId: 'PLN-02', title: 'Chuyên viên', email: 'ducpm@moj.gov.vn' },
        { id: 'gdso_hn', name: 'Phạm Quang Huy', unitId: 'STP-HN', title: 'Giám đốc Sở', email: 'gdso_hn@sotuphap.hanoi.gov.vn' },
        { id: 'tp_hctp_hn', name: 'Vũ Thị Thanh', unitId: 'STP-HN-HCTP', title: 'Trưởng phòng', email: 'tp_hctp_hn@sotuphap.hanoi.gov.vn' },
        { id: 'cv_hn1', name: 'Đỗ Văn Chung', unitId: 'STP-HN-HCTP', title: 'Chuyên viên', email: 'cv_hn1@sotuphap.hanoi.gov.vn' },
        { id: 'cv_hn2', name: 'Ngô Thị Lan', unitId: 'STP-HN-HCTP', title: 'Chuyên viên', email: 'cv_hn2@sotuphap.hanoi.gov.vn' },
        { id: 'gdso_hcm', name: 'Lý Thanh Sơn', unitId: 'STP-HCM', title: 'Giám đốc Sở', email: 'gdso_hcm@stp.hochiminhcity.gov.vn' },
        { id: 'cv_hcm1', name: 'Châu Ngọc Ánh', unitId: 'STP-HCM-HCTP', title: 'Chuyên viên', email: 'cv_hcm1@stp.hochiminhcity.gov.vn' },
        { id: 'ct_cg', name: 'Bùi Đức Thắng', unitId: 'UBND-CG', title: 'Chủ tịch UBND', email: 'ct_cg@hanoi.gov.vn' },
        { id: 'tp_tp_cg', name: 'Lương Thị Mai', unitId: 'UBND-CG-TP', title: 'Trưởng phòng Tư pháp', email: 'tp_tp_cg@hanoi.gov.vn' },
        { id: 'cv_cg1', name: 'Kiều Văn Nam', unitId: 'UBND-CG-TP', title: 'Công chức tư pháp', email: 'cv_cg1@hanoi.gov.vn' },
        { id: 'ct_thads', name: 'Đinh Công Lâm', unitId: 'THADS-LD', title: 'Cục trưởng', email: 'ct_thads@thads.moj.gov.vn' },
        { id: 'cv_thads1', name: 'Trịnh Thu Trang', unitId: 'THADS-LD-NV', title: 'Chấp hành viên', email: 'cv_thads1@thads.moj.gov.vn' },
        { id: 'cv_hk1', name: 'Tạ Quang Vinh', unitId: 'UBND-HK', title: 'Công chức tư pháp', email: 'cv_hk1@hanoi.gov.vn' },
        { id: 'cv_tand1', name: 'Hà Minh Tâm', unitId: 'TAND-LD', title: 'Thư ký tòa án', email: 'cv_tand1@toaan.gov.vn' },
        // Tài khoản cán bộ của các cơ quan giải quyết bồi thường bổ sung (dữ liệu mẫu Giải quyết yêu cầu bồi thường)
        { id: 'tp_tand_ld', name: 'Nông Thị Hiền', unitId: 'TAND-LD', title: 'Thẩm phán', email: 'tp_tand_ld@toaan.gov.vn' },
        { id: 'ct_hk', name: 'Mai Xuân Trường', unitId: 'UBND-HK', title: 'Chủ tịch UBND', email: 'ct_hk@hanoi.gov.vn' },
        { id: 'ct_hm', name: 'Hoàng Văn Thái', unitId: 'UBND-HM', title: 'Chủ tịch UBND', email: 'ct_hm@hanoi.gov.vn' },
        { id: 'cv_hm1', name: 'Lê Thị Thu Trang', unitId: 'UBND-HM-TP', title: 'Công chức tư pháp', email: 'cv_hm1@hanoi.gov.vn' },
        { id: 'cv_hm2', name: 'Phan Đức Mạnh', unitId: 'UBND-HM-TP', title: 'Công chức tư pháp', email: 'cv_hm2@hanoi.gov.vn' },
        { id: 'ld_catx', name: 'Trần Quốc Bảo', unitId: 'CA-TX', title: 'Trưởng Công an quận', email: 'ld_catx@cand.gov.vn' },
        { id: 'cb_catx1', name: 'Nguyễn Hữu Phước', unitId: 'CA-TX', title: 'Cán bộ pháp chế', email: 'cb_catx1@cand.gov.vn' },
        { id: 'cb_catx2', name: 'Đào Thị Mỹ Linh', unitId: 'CA-TX', title: 'Cán bộ pháp chế', email: 'cb_catx2@cand.gov.vn' },
        { id: 'ca_tandhn', name: 'Vương Minh Khang', unitId: 'TAND-HN', title: 'Chánh án', email: 'ca_tandhn@toaan.gov.vn' },
        { id: 'tk_tandhn1', name: 'Lại Thị Hương Giang', unitId: 'TAND-HN', title: 'Thư ký tòa án', email: 'tk_tandhn1@toaan.gov.vn' },
        { id: 'tk_tandhn2', name: 'Cao Văn Hiếu', unitId: 'TAND-HN', title: 'Thẩm tra viên', email: 'tk_tandhn2@toaan.gov.vn' },
        { id: 'ca_tandhk', name: 'Mạc Thị Bích Ngọc', unitId: 'TAND-HK', title: 'Chánh án', email: 'ca_tandhk@toaan.gov.vn' },
        { id: 'tk_tandhk1', name: 'Đoàn Văn Lợi', unitId: 'TAND-HK', title: 'Thư ký tòa án', email: 'tk_tandhk1@toaan.gov.vn' },
        { id: 'gdso_hp', name: 'Bạch Văn Hải', unitId: 'STP-HP', title: 'Giám đốc Sở', email: 'gdso_hp@stp.haiphong.gov.vn' },
        { id: 'cv_hp1', name: 'Tăng Thị Diệu', unitId: 'STP-HP-HCTP', title: 'Chuyên viên', email: 'cv_hp1@stp.haiphong.gov.vn' },
        { id: 'cv_hp2', name: 'Quách Minh Tuấn', unitId: 'STP-HP-HCTP', title: 'Chuyên viên', email: 'cv_hp2@stp.haiphong.gov.vn' },
        { id: 'ct_thadshp', name: 'Vi Văn Thành', unitId: 'THADS-HP', title: 'Cục trưởng', email: 'ct_thadshp@thads.moj.gov.vn' },
        { id: 'chv_thadshp1', name: 'Lục Thị Hoa', unitId: 'THADS-HP', title: 'Chấp hành viên', email: 'chv_thadshp1@thads.moj.gov.vn' },
        { id: 'ct_ubndld', name: 'Kha Văn Sang', unitId: 'UBND-LD', title: 'Chủ tịch UBND', email: 'ct_ubndld@lamdong.gov.vn' },
        { id: 'cv_ubndld1', name: 'Ông Thị Thảo', unitId: 'UBND-LD', title: 'Chuyên viên', email: 'cv_ubndld1@lamdong.gov.vn' },
        { id: 'cv_ubndld2', name: 'Lò Văn Dũng', unitId: 'UBND-LD', title: 'Chuyên viên', email: 'cv_ubndld2@lamdong.gov.vn' },
        { id: 'ct_dd', name: 'Thân Văn Quý', unitId: 'UBND-DD', title: 'Chủ tịch UBND', email: 'ct_dd@hanoi.gov.vn' },
        { id: 'cv_dd1', name: 'Khổng Thị Yến', unitId: 'UBND-DD', title: 'Công chức tư pháp', email: 'cv_dd1@hanoi.gov.vn' },
        { id: 'ct_thadshn', name: 'Giang Văn Phúc', unitId: 'THADS-HN', title: 'Cục trưởng', email: 'ct_thadshn@thads.moj.gov.vn' },
        { id: 'chv_thadshn1', name: 'Hứa Thị Ngân', unitId: 'THADS-HN', title: 'Chấp hành viên', email: 'chv_thadshn1@thads.moj.gov.vn' },
        { id: 'chv_thadshn2', name: 'Lam Quốc Việt', unitId: 'THADS-HN', title: 'Chấp hành viên', email: 'chv_thadshn2@thads.moj.gov.vn' },
        { id: 'vt_vkstc', name: 'Doãn Văn Trọng', unitId: 'VKSNDTC', title: 'Vụ trưởng', email: 'vt_vkstc@vks.gov.vn' },
        { id: 'ksv_vkstc1', name: 'Âu Thị Kim Oanh', unitId: 'VKSNDTC', title: 'Kiểm sát viên', email: 'ksv_vkstc1@vks.gov.vn' },
        { id: 'ct_ubndhn', name: 'Tống Văn Đạt', unitId: 'UBND-HN', title: 'Phó Chủ tịch UBND', email: 'ct_ubndhn@hanoi.gov.vn' },
        { id: 'cv_ubndhn1', name: 'Mẫn Thị Hạnh', unitId: 'UBND-HN', title: 'Chuyên viên', email: 'cv_ubndhn1@hanoi.gov.vn' },
        { id: 'vt_vksq1', name: 'Huỳnh Văn Lộc', unitId: 'VKS-Q1', title: 'Viện trưởng', email: 'vt_vksq1@vks.gov.vn' },
        { id: 'ksv_vksq1', name: 'Trương Thị Mai Anh', unitId: 'VKS-Q1', title: 'Kiểm sát viên', email: 'ksv_vksq1@vks.gov.vn' },
        { id: 'cc_bt', name: 'Võ Thành Nhân', unitId: 'CCTHADS-BT', title: 'Chi cục trưởng', email: 'cc_bt@thads.moj.gov.vn' },
        { id: 'chv_bt1', name: 'Dương Thị Kiều', unitId: 'CCTHADS-BT', title: 'Chấp hành viên', email: 'chv_bt1@thads.moj.gov.vn' },
        { id: 'cc_ts', name: 'Lê Văn Tài', unitId: 'CCTS-BD', title: 'Chi cục trưởng', email: 'cc_ts@binhdinh.gov.vn' },
        { id: 'cv_ts1', name: 'Hồ Thị Ngọc Hân', unitId: 'CCTS-BD', title: 'Chuyên viên', email: 'cv_ts1@binhdinh.gov.vn' },
        { id: 'cv_ts2', name: 'Đặng Minh Khoa', unitId: 'CCTS-BD', title: 'Chuyên viên', email: 'cv_ts2@binhdinh.gov.vn' },
        { id: 'ca_lc', name: 'Phùng Văn Hậu', unitId: 'TAND-LC', title: 'Chánh án', email: 'ca_lc@toaan.gov.vn' },
        { id: 'tk_lc1', name: 'Đinh Thị Thu Sương', unitId: 'TAND-LC', title: 'Thư ký tòa án', email: 'tk_lc1@toaan.gov.vn' },
        { id: 'tk_lc2', name: 'Nguyễn Quang Vũ', unitId: 'TAND-LC', title: 'Thẩm tra viên', email: 'tk_lc2@toaan.gov.vn' },
        { id: 'cc_cg', name: 'Ninh Văn Khải', unitId: 'CCTHADS-CG', title: 'Chi cục trưởng', email: 'cc_cg@thads.moj.gov.vn' },
        { id: 'chv_cg1', name: 'Trần Thị Hải Yến', unitId: 'CCTHADS-CG', title: 'Chấp hành viên', email: 'chv_cg1@thads.moj.gov.vn' },
        { id: 'ca_nt', name: 'Lưu Văn Bình', unitId: 'TAND-NT', title: 'Chánh án', email: 'ca_nt@toaan.gov.vn' },
        { id: 'tk_nt1', name: 'Phạm Thị Thanh Thủy', unitId: 'TAND-NT', title: 'Thư ký tòa án', email: 'tk_nt1@toaan.gov.vn' },
        { id: 'ld_cahm', name: 'Nghiêm Văn Cường', unitId: 'CA-HM', title: 'Trưởng Công an quận', email: 'ld_cahm@cand.gov.vn' },
        { id: 'cb_cahm1', name: 'Bế Thị Lụa', unitId: 'CA-HM', title: 'Cán bộ pháp chế', email: 'cb_cahm1@cand.gov.vn' },
        { id: 'cc_tt', name: 'Từ Văn Hòa', unitId: 'CCTHADS-TT', title: 'Chi cục trưởng', email: 'cc_tt@thads.moj.gov.vn' },
        { id: 'chv_tt1', name: 'Văn Thị Hồng', unitId: 'CCTHADS-TT', title: 'Chấp hành viên', email: 'chv_tt1@thads.moj.gov.vn' },
        { id: 'vt_vkshp', name: 'Thái Văn Minh', unitId: 'VKS-HP', title: 'Viện trưởng', email: 'vt_vkshp@vks.gov.vn' },
        { id: 'ksv_vkshp1', name: 'Kim Thị Diệp', unitId: 'VKS-HP', title: 'Kiểm sát viên', email: 'ksv_vkshp1@vks.gov.vn' }
    ];

    // Cấu hình luồng mặc định: theo từng đơn vị gốc; mỗi nút là một đơn vị trong cây của đơn vị gốc
    const DEFAULT_FLOW = {
        'BTP-01': {
            'BTP-01': { leaders: ['oanhdh', 'khoiml'], allowUnit: true, units: ['CĐK-01'], allowOfficer: false, officers: [] },
            'CĐK-01': { leaders: ['cuctruong', 'cucpho'], allowUnit: true, units: ['PLN-02'], allowOfficer: false, officers: [] },
            'PLN-02': { leaders: ['tpbt'], allowUnit: false, units: [], allowOfficer: true, officers: ['canbonv', 'hatt', 'ducpm'], kyNhay: true }
        },
        'STP-HN': {
            'STP-HN': { leaders: ['gdso_hn'], allowUnit: true, units: ['STP-HN-HCTP'], allowOfficer: false, officers: [] },
            'STP-HN-HCTP': { leaders: ['tp_hctp_hn'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_hn1', 'cv_hn2'], kyNhay: true }
        },
        'STP-HCM': {
            'STP-HCM': { leaders: ['gdso_hcm'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_hcm1'] }
        },
        'UBND-CG': {
            'UBND-CG': { leaders: ['ct_cg'], allowUnit: true, units: ['UBND-CG-TP'], allowOfficer: false, officers: [] },
            'UBND-CG-TP': { leaders: ['tp_tp_cg'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_cg1'], kyNhay: true }
        },
        'THADS-LD': {
            'THADS-LD': { leaders: ['ct_thads'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_thads1'] }
        },
        // UBND cấp tỉnh: có thẩm quyền Xác định CQGQBT và giải quyết bồi thường
        'UBND-HN': {
            'UBND-HN': { leaders: ['ct_ubndhn'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_ubndhn1'] }
        },
        // Cơ quan giải quyết bồi thường (dữ liệu mẫu Giải quyết yêu cầu bồi thường): Thủ trưởng cơ quan thụ lý hồ sơ (vai trò Lãnh đạo đơn vị)
        'UBND-HM': { 'UBND-HM': { leaders: ['ct_hm'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_hm1', 'cv_hm2'] } },
        'UBND-DD': { 'UBND-DD': { leaders: ['ct_dd'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_dd1'] } },
        'CA-TX': { 'CA-TX': { leaders: ['ld_catx'], allowUnit: false, units: [], allowOfficer: true, officers: ['cb_catx1', 'cb_catx2'] } },
        'CA-HM': { 'CA-HM': { leaders: ['ld_cahm'], allowUnit: false, units: [], allowOfficer: true, officers: ['cb_cahm1'] } },
        'TAND-HN': { 'TAND-HN': { leaders: ['ca_tandhn'], allowUnit: false, units: [], allowOfficer: true, officers: ['tk_tandhn1', 'tk_tandhn2'] } },
        'TAND-LC': { 'TAND-LC': { leaders: ['ca_lc'], allowUnit: false, units: [], allowOfficer: true, officers: ['tk_lc1', 'tk_lc2'] } },
        'CCTHADS-CG': { 'CCTHADS-CG': { leaders: ['cc_cg'], allowUnit: false, units: [], allowOfficer: true, officers: ['chv_cg1'] } },
        'CCTHADS-TT': { 'CCTHADS-TT': { leaders: ['cc_tt'], allowUnit: false, units: [], allowOfficer: true, officers: ['chv_tt1'] } },
        'CCTS-BD': { 'CCTS-BD': { leaders: ['cc_ts'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_ts1', 'cv_ts2'] } },
        'STP-HP': { 'STP-HP': { leaders: ['gdso_hp'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_hp1', 'cv_hp2'] } },
        'UBND-LD': {
            'UBND-LD': { leaders: ['ct_ubndld'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_ubndld1', 'cv_ubndld2'] }
        }
    };
    // Cơ quan tiếp nhận, xử lý Xác định CQGQBT: Bộ Tư pháp, Sở Tư pháp
    const XD_AUTHORITY_UNITS = ['BTP-01', 'STP-HN', 'STP-HCM'];
    // UBND cấp tỉnh chỉ xem hồ sơ Xác định CQGQBT của Sở Tư pháp trực thuộc (Sở Tư pháp là đơn vị con của UBND cấp tỉnh trên cây Cơ cấu tổ chức).
    // Mockup giữ Sở Tư pháp là đơn vị gốc của luồng, quan hệ trực thuộc khai báo tại bảng này.
    const UBND_TINH_STP = { 'UBND-HN': ['STP-HN'], 'UBND-LD': [] };

    // Danh mục Loại hồ sơ (DM_54) - Đơn vị áp dụng; chọn đơn vị cha thì áp dụng cho toàn bộ đơn vị con
    const DEFAULT_REQUEST_TYPES = [
        { code: 'LYC_01', name: REQUEST_TYPE_XD, units: XD_AUTHORITY_UNITS.slice() },
        // Giải quyết yêu cầu bồi thường áp dụng cho mọi đơn vị gốc (Bộ Tư pháp, Sở Tư pháp và các cơ quan giải quyết bồi thường)
        { code: 'LYC_02', name: REQUEST_TYPE_YCBT, units: ORG_UNITS.filter(u => !u.parentId).map(u => u.id) }
    ];

    // ---------------- Tiện ích ----------------
    function readJson(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (e) {
            return fallback;
        }
    }
    function writeJson(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua khi trình duyệt chặn lưu trữ */ }
    }
    function pad(n) { return String(n).padStart(2, '0'); }
    function nowText(d) {
        d = d || new Date();
        return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    }
    function dateText(d) {
        d = d || new Date();
        return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    }
    function uid(prefix) { return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`; }
    function esc(v) {
        return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    // ---------------- Đơn vị & người dùng ----------------
    function getUnit(id) { return ORG_UNITS.find(u => u.id === id) || null; }
    function unitName(id) { const u = getUnit(id); return u ? u.name : (id || '--'); }
    function getChildren(id) { return ORG_UNITS.filter(u => u.parentId === id); }
    function getRootId(id) {
        let u = getUnit(id);
        while (u && u.parentId) u = getUnit(u.parentId);
        return u ? u.id : null;
    }
    function getAncestors(id) {
        const chain = [];
        let u = getUnit(id);
        while (u) { chain.push(u.id); u = u.parentId ? getUnit(u.parentId) : null; }
        return chain; // đơn vị hiện tại -> đơn vị gốc
    }
    function getDescendants(id) {
        const out = [];
        (function walk(pid) { getChildren(pid).forEach(c => { out.push(c.id); walk(c.id); }); })(id);
        return out;
    }
    function getRootUnits() { return ORG_UNITS.filter(u => !u.parentId); }
    function getUser(id) { return USERS.find(u => u.id === id) || null; }
    function userName(id) { const u = getUser(id); return u ? u.name : (id || '--'); }
    function userLabel(id) { const u = getUser(id); return u ? `${u.name} - ${u.title}` : (id || '--'); }
    function usersInUnitTree(unitId) {
        const ids = [unitId].concat(getDescendants(unitId));
        return USERS.filter(u => ids.includes(u.unitId));
    }

    function getCurrentUserId() {
        let id = null;
        try { id = localStorage.getItem(KEY_USER); } catch (e) { id = null; }
        return getUser(id) ? id : 'canbonv';
    }
    function getCurrentUser() { return getUser(getCurrentUserId()); }
    function setCurrentUser(id) { try { localStorage.setItem(KEY_USER, id); } catch (e) { /* bỏ qua */ } }

    // ---------------- Cấu hình luồng ----------------
    // Đơn vị gốc được cấu hình theo Loại luồng
    function flowRootIds(ft) {
        if (ft === FLOW_TYPES.XD_BTP) return getRootUnits().filter(u => /^BTP/.test(u.id)).map(u => u.id);
        if (ft === FLOW_TYPES.XD_STP) return getRootUnits().filter(u => /^STP/.test(u.id)).map(u => u.id);
        return getRootUnits().map(u => u.id);
    }
    // Loại luồng của hồ sơ: Xác định CQGQBT theo Bộ Tư pháp / Sở Tư pháp; còn lại Giải quyết YCBT
    function flowTypeOf(loaiYeuCau, rootUnitId) {
        if (loaiYeuCau && typeof loaiYeuCau === 'object') { rootUnitId = loaiYeuCau.rootUnitId; loaiYeuCau = loaiYeuCau.loaiYeuCau; }
        if (loaiYeuCau !== REQUEST_TYPE_XD) return FLOW_TYPES.GQ;
        const root = getRootId(rootUnitId) || rootUnitId || '';
        return /^STP/.test(root) ? FLOW_TYPES.XD_STP : FLOW_TYPES.XD_BTP;
    }
    function recFt(rec) { return rec ? flowTypeOf(rec.loaiYeuCau, rec.rootUnitId) : FLOW_TYPES.GQ; }
    function defaultFlowAll(base) {
        const src = base || DEFAULT_FLOW;
        const pick = ids => { const o = {}; ids.forEach(id => { if (src[id]) o[id] = JSON.parse(JSON.stringify(src[id])); }); return o; };
        return { XD_BTP: pick(flowRootIds(FLOW_TYPES.XD_BTP)), XD_STP: pick(flowRootIds(FLOW_TYPES.XD_STP)), GQ: JSON.parse(JSON.stringify(src)) };
    }
    // Mỗi nút chỉ có 01 hình thức phân công: nút cũ bật cả Chuyển đơn vị và Phân công cán bộ -> giữ Chuyển đơn vị, bỏ Phân công cán bộ
    function normalizeFlowDirections(all) {
        let changed = false;
        Object.keys(all || {}).forEach(ft => Object.values(all[ft] || {}).forEach(tree => Object.values(tree || {}).forEach(node => {
            if (node && node.allowUnit && node.allowOfficer) { node.allowOfficer = false; node.officers = []; changed = true; }
        })));
        return changed;
    }
    function getFlowAll() {
        let all = readJson(KEY_FLOW, null);
        if (!all || typeof all !== 'object' || !all.GQ) {
            // Chuyển cấu hình cũ (01 cấu hình chung cho mọi Loại yêu cầu) sang 03 Loại luồng
            all = defaultFlowAll(readJson(KEY_FLOW_V1, null) || DEFAULT_FLOW);
            normalizeFlowDirections(all);
            writeJson(KEY_FLOW, all);
            return all;
        }
        let changed = normalizeFlowDirections(all);
        const def = defaultFlowAll();
        FLOW_TYPE_ORDER.forEach(ft => {
            if (!all[ft]) { all[ft] = def[ft]; changed = true; return; }
            Object.keys(def[ft]).forEach(root => { if (!all[ft][root]) { all[ft][root] = def[ft][root]; changed = true; } });
        });
        if (changed) writeJson(KEY_FLOW, all);
        return all;
    }
    function getFlowConfig(ft) { return getFlowAll()[ft || FLOW_TYPES.GQ] || {}; }
    function saveFlowConfig(cfg, ft) { const all = getFlowAll(); all[ft || FLOW_TYPES.GQ] = cfg; normalizeFlowDirections(all); writeJson(KEY_FLOW, all); }
    function resetFlowConfig(ft) { const all = getFlowAll(); const def = defaultFlowAll(); if (ft) all[ft] = def[ft]; else Object.assign(all, def); writeJson(KEY_FLOW, all); return ft ? all[ft] : all; }
    function getNodeConfig(unitId, ft) {
        const rootId = getRootId(unitId);
        const cfg = getFlowConfig(ft);
        return (cfg[rootId] && cfg[rootId][unitId]) || null;
    }
    function getLeaders(unitId, ft) {
        const node = getNodeConfig(unitId, ft);
        return node ? (node.leaders || []) : [];
    }
    function isLeaderOf(userId, unitId, ft) { return getLeaders(unitId, ft).includes(userId); }
    // Cấu hình luồng xử lý - cờ "Ký nháy" của từng đơn vị (cấp phê duyệt): tích thì thẻ cấp tại Bước 2 popup Trình ký hiển thị nhãn "Ký nháy"; không tích: không hiển thị nhãn.
    // Cấu hình đã lưu chưa có cờ: lấy theo cấu hình mặc định (giả lập).
    function isKyNhayUnit(unitId, ft) {
        const node = getNodeConfig(unitId, ft) || getNodeConfig(unitId);
        if (node && typeof node.kyNhay === 'boolean') return node.kyNhay;
        const root = DEFAULT_FLOW[getRootId(unitId)];
        return !!(root && root[unitId] && root[unitId].kyNhay);
    }
    function kyNhayBadgeHtml(unitId, ft, style) {
        return isKyNhayUnit(unitId, ft) ? `<span class="kn-badge" style="${style || 'font-size:11px; font-weight:600; padding:2px 8px; border-radius:999px; background:#f1f5f9; color:#475569;'}">Ký nháy</span>` : '';
    }
    // Đơn vị đã cấu hình luồng khi nút đơn vị gốc có nhóm lãnh đạo và có ít nhất một hình thức phân công (mặc định luồng Giải quyết YCBT)
    function isUnitConfigured(rootId, ft) {
        const node = getNodeConfig(rootId, ft);
        return !!(node && node.leaders && node.leaders.length && ((node.allowUnit && node.units && node.units.length) || (node.allowOfficer && node.officers && node.officers.length)));
    }
    function findRootUnitByName(name) {
        const n = String(name || '').trim().toLowerCase();
        return getRootUnits().find(u => u.name.toLowerCase() === n) || null;
    }

    // ---------------- Danh mục Loại hồ sơ ----------------
    function getRequestTypeCatalog() {
        const cats = readJson('masterCategories', null);
        if (Array.isArray(cats)) {
            // Xác định CQGQBT chỉ áp dụng Bộ Tư pháp, Sở Tư pháp (UBND cấp tỉnh chỉ xem); LYC_02 đổi tên Giải quyết yêu cầu bồi thường
            let catChanged = false;
            const xd = cats.find(c => c.typeCode === CATALOG_TYPE && c.code === 'LYC_01');
            if (xd && !xd.ubndTinhV2) {
                xd.donViApDung = (xd.donViApDung || []).filter(u => !/^UBND/.test(u));
                xd.ubndTinhV2 = true;
                catChanged = true;
            }
            const gq = cats.find(c => c.typeCode === CATALOG_TYPE && c.code === 'LYC_02');
            if (gq && gq.name === REQUEST_TYPE_YCBT_OLD) { gq.name = REQUEST_TYPE_YCBT; catChanged = true; }
            if (catChanged) writeJson('masterCategories', cats);
            const rows = cats.filter(c => c.typeCode === CATALOG_TYPE && c.status === 'Hoạt động');
            if (rows.length) return rows.map(r => ({ code: r.code, name: r.name, units: Array.isArray(r.donViApDung) ? r.donViApDung : [] }));
        }
        return DEFAULT_REQUEST_TYPES.map(t => ({ code: t.code, name: t.name, units: t.units.slice() }));
    }
    // Danh mục Lý do không thụ lý (DM_55); fallback danh sách mặc định Điều 43
    function getKtlReasons() {
        const cats = readJson('masterCategories', null);
        if (Array.isArray(cats)) {
            const rows = cats.filter(c => c.typeCode === KTL_CATALOG_TYPE && c.status === 'Hoạt động');
            if (rows.length) return rows.map(r => ({ code: r.code, name: r.name }));
        }
        return DEFAULT_KTL_REASONS.map(r => ({ code: r.code, name: r.name }));
    }

    // ---------------- Khối Người yêu cầu bồi thường (Mẫu 01/BTNN) - dùng chung Tiếp nhận / Xác định CQGQBT / Giải quyết YCBT ----------------
    // Danh mục DM_26 Tư cách người yêu cầu bồi thường (đúng thứ tự hiển thị); fallback khi chưa có dữ liệu danh mục
    const NYC_ROLE_CATALOG_TYPE = 'DM_26';
    const DEFAULT_NYC_ROLES = [
        { code: 'TCNYC_01', name: 'Người bị thiệt hại' },
        { code: 'TCNYC_02', name: 'Người thừa kế của người bị thiệt hại' },
        { code: 'TCNYC_06', name: 'Người đại diện cho những người thừa kế của người bị thiệt hại' },
        { code: 'TCNYC_03', name: 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại' },
        { code: 'TCNYC_04', name: 'Người đại diện theo pháp luật của người bị thiệt hại' },
        { code: 'TCNYC_05', name: 'Cá nhân, pháp nhân được ủy quyền hợp pháp' }
    ];
    // Loại người yêu cầu (radio): Cá nhân | Tổ chức
    const NYC_TYPES = { CA_NHAN: 'Cá nhân', TO_CHUC: 'Tổ chức' };
    // Ràng buộc Loại người yêu cầu theo Tư cách: TCNYC_03 -> Tổ chức; TCNYC_02, TCNYC_06, TCNYC_04 -> Cá nhân; TCNYC_01, TCNYC_05 -> cho phép chọn
    const NYC_ROLE_FORCE_TO_CHUC = ['TCNYC_03'];
    const NYC_ROLE_FORCE_CA_NHAN = ['TCNYC_02', 'TCNYC_06', 'TCNYC_04'];
    const DEFAULT_COUNTRIES = ['Việt Nam', 'Hoa Kỳ', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc'];
    // Danh sách Tư cách [{ code, name }] từ danh mục DM_26 (giá trị Hoạt động); dữ liệu danh mục lưu trước khi có TCNYC_06 được bổ sung đúng vị trí (sau TCNYC_02)
    function getNycRoles() {
        const cats = readJson('masterCategories', null);
        const rows = Array.isArray(cats) ? cats.filter(c => c.typeCode === NYC_ROLE_CATALOG_TYPE && c.status === 'Hoạt động').map(r => ({ code: r.code, name: r.name })) : [];
        if (!rows.length) return DEFAULT_NYC_ROLES.map(r => Object.assign({}, r));
        if (!cats.some(c => c.typeCode === NYC_ROLE_CATALOG_TYPE && c.code === 'TCNYC_06')) {
            const i = rows.findIndex(r => r.code === 'TCNYC_02');
            rows.splice(i >= 0 ? i + 1 : rows.length, 0, Object.assign({}, DEFAULT_NYC_ROLES[2]));
        }
        return rows;
    }
    // Mã Tư cách (TCNYC_xx) từ mã hoặc tên Tư cách; không xác định trả ''
    function nycRoleCode(tuCach) {
        const s = String(tuCach || '').trim();
        if (!s) return '';
        const hit = DEFAULT_NYC_ROLES.find(r => r.code === s || r.name === s) || getNycRoles().find(r => r.code === s || r.name === s);
        return hit ? hit.code : '';
    }
    // Tên Tư cách từ mã hoặc tên
    function nycRoleName(tuCach) {
        const code = nycRoleCode(tuCach);
        if (!code) return String(tuCach || '');
        const hit = getNycRoles().find(r => r.code === code) || DEFAULT_NYC_ROLES.find(r => r.code === code);
        return hit ? hit.name : String(tuCach || '');
    }
    // Loại người yêu cầu bị ràng buộc theo Tư cách (mã hoặc tên): 'Cá nhân' | 'Tổ chức' | '' (cho phép chọn)
    function nycTypeConstraint(tuCach) {
        const code = nycRoleCode(tuCach);
        if (NYC_ROLE_FORCE_TO_CHUC.includes(code)) return NYC_TYPES.TO_CHUC;
        if (NYC_ROLE_FORCE_CA_NHAN.includes(code)) return NYC_TYPES.CA_NHAN;
        return '';
    }
    // Danh sách Tư cách [{ code, name }] theo Loại người yêu cầu (giữ thứ tự DM_26):
    // Cá nhân: bỏ TCNYC_03; Tổ chức: bỏ TCNYC_02, TCNYC_06, TCNYC_04 (còn TCNYC_01, TCNYC_03, TCNYC_05)
    function nycRolesForType(type) {
        const excluded = type === NYC_TYPES.TO_CHUC ? NYC_ROLE_FORCE_CA_NHAN : NYC_ROLE_FORCE_TO_CHUC;
        return getNycRoles().filter(r => !excluded.includes(r.code));
    }
    // Loại người yêu cầu của bản ghi: theo ràng buộc Tư cách; dữ liệu cũ không có nycType coi là Cá nhân
    function nycTypeOf(rec) {
        if (!rec) return NYC_TYPES.CA_NHAN;
        return nycTypeConstraint(rec.nycRole) || (rec.nycType === NYC_TYPES.TO_CHUC ? NYC_TYPES.TO_CHUC : NYC_TYPES.CA_NHAN);
    }
    // Tư cách TCNYC_03: khối Người bị thiệt hại là Tổ chức bị thiệt hại đã chấm dứt tồn tại (nbthOrgName, nbthOrgCode)
    function isNbthOrgRole(tuCach) { return nycRoleCode(tuCach) === 'TCNYC_03'; }
    // Bỏ mã hành chính phía trước tên (VD "00007 - Phường Cầu Giấy" -> "Phường Cầu Giấy")
    function stripAdminCode(v) { return String(v || '').replace(/^\d+\s*-\s*/, '').trim(); }
    // Địa chỉ 01 dòng: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố] (bỏ phần trống)
    // Nhận bản ghi người yêu cầu (nycAddressDetail/nycPhuongXa/nycTinhThanh) hoặc khối người bị thiệt hại (address/ward/city)
    function joinAddress(rec) {
        if (!rec) return '';
        const pick = keys => { for (const k of keys) { if (rec[k]) return rec[k]; } return ''; };
        return [pick(['nycAddressDetail', 'addressDetail', 'address']), pick(['nycPhuongXa', 'ward']), pick(['nycTinhThanh', 'city'])]
            .map(stripAdminCode).filter(Boolean).join(', ');
    }
    // Danh mục DM_09 Quốc gia (tên, Việt Nam đứng đầu); fallback danh sách mặc định
    function getCountries() {
        const cats = readJson('masterCategories', null);
        const rows = Array.isArray(cats) ? cats.filter(c => c.typeCode === 'DM_09' && c.status === 'Hoạt động').map(r => r.name) : [];
        const list = rows.length ? rows : DEFAULT_COUNTRIES.slice();
        return ['Việt Nam'].concat(list.filter(n => n !== 'Việt Nam'));
    }
    // Loại giấy tờ thân nhân (cá nhân): danh mục DM_10 trạng thái Hoạt động, trừ GT_04 Mã số thuế; fallback 04 giá trị mặc định
    const PERSONAL_DOC_CATALOG_TYPE = 'DM_10';
    const PERSONAL_DOC_EXCLUDED = ['GT_04'];
    const DEFAULT_PERSONAL_DOC_TYPES = ['CMND/CCCD/Chứng minh quân đội', 'Hộ chiếu', 'Thẻ thường trú', 'Giấy tờ đi lại có giá trị quốc tế'];
    function getPersonalDocTypes() {
        const cats = readJson('masterCategories', null);
        const rows = Array.isArray(cats) ? cats.filter(c => c.typeCode === PERSONAL_DOC_CATALOG_TYPE && c.status === 'Hoạt động' && !PERSONAL_DOC_EXCLUDED.includes(c.code) && c.name !== 'Mã số thuế').map(r => r.name) : [];
        return rows.length ? rows : DEFAULT_PERSONAL_DOC_TYPES.slice();
    }
    // Chuẩn hóa giá trị cũ: CCCD/CMND/Căn cước công dân/Chứng minh nhân dân -> CMND/CCCD/Chứng minh quân đội; HoChieu -> Hộ chiếu
    function normalizePersonalDocType(v) {
        const s = String(v == null ? '' : v).trim();
        // Dữ liệu cũ ghi nhầm Loại người yêu cầu vào trường loại giấy tờ: bỏ qua
        if (!s || s === 'Cá nhân' || s === 'Tổ chức') return '';
        if (/^(CCCD|CMND|Căn cước công dân( \/ Thẻ căn cước)?|Căn cước công dân \(CCCD\)|Chứng minh nhân dân( \(CMND\))?)$/i.test(s)) return DEFAULT_PERSONAL_DOC_TYPES[0];
        if (/^(HoChieu|Hộ chiếu)$/i.test(s)) return 'Hộ chiếu';
        return s;
    }
    // Nạp giá trị Loại giấy tờ thân nhân vào combobox; gán .value sẽ tự chuẩn hóa giá trị cũ
    function fillPersonalDocTypeSelect(sel, placeholder) {
        const el = typeof sel === 'string' ? document.getElementById(sel) : sel;
        if (!el) return null;
        const cur = normalizePersonalDocType(el.value);
        const list = getPersonalDocTypes();
        el.innerHTML = (placeholder ? `<option value="">${esc(placeholder)}</option>` : '') + list.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('');
        if (!el.__pdtBound) {
            const desc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
            Object.defineProperty(el, 'value', {
                configurable: true,
                get() { return desc.get.call(this); },
                // Giá trị ngoài danh mục: về lựa chọn đầu tiên (ô trống "-- Chọn --" nếu có, ngược lại giá trị đầu danh mục)
                set(v) { desc.set.call(this, normalizePersonalDocType(v)); if (this.selectedIndex < 0 && this.options.length) this.selectedIndex = 0; }
            });
            el.__pdtBound = true;
        }
        el.value = cur;
        return el;
    }
    // Kiểm tra định dạng email cơ bản
    function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim()); }
    // Loại cơ quan có thẩm quyền Xác định CQGQBT của đơn vị gốc
    function xdAuthorityType(unitId) {
        const root = getRootId(unitId) || unitId;
        if (/^BTP/.test(root)) return 'Bộ Tư pháp';
        if (/^STP/.test(root)) return 'Sở Tư pháp';
        return '';
    }
    // Sở Tư pháp trực thuộc mà người dùng UBND cấp tỉnh được xem hồ sơ Xác định CQGQBT (chỉ đọc)
    function xdViewOnlyStpRoots(userId) {
        const user = getUser(userId || getCurrentUserId());
        if (!user) return [];
        const root = getRootId(user.unitId) || user.unitId;
        return Object.prototype.hasOwnProperty.call(UBND_TINH_STP, root) ? UBND_TINH_STP[root].slice() : [];
    }
    function isXdViewOnlyUser(userId) { const user = getUser(userId || getCurrentUserId()); if (!user) return false; const root = getRootId(user.unitId) || user.unitId; return Object.prototype.hasOwnProperty.call(UBND_TINH_STP, root); }
    function getRequestTypesForUser(userId) {
        const user = getUser(userId || getCurrentUserId());
        if (!user) return [];
        const chain = getAncestors(user.unitId);
        return getRequestTypeCatalog().filter(t => t.units.some(u => chain.includes(u))).map(t => t.name);
    }

    // ---------------- Kho hồ sơ luồng ----------------
    // Hàm bỏ qua dữ liệu cũ: xóa thuộc tính phoiHop của hồ sơ/lượt phân công và đoạn "; Phối hợp: ..." trong ghi chú lịch sử
    function stripLegacyCoop(r) {
        let changed = false;
        if (r && 'phoiHop' in r) { delete r.phoiHop; changed = true; }
        (r && r.routes || []).forEach(x => { if (x && 'phoiHop' in x) { delete x.phoiHop; changed = true; } });
        (r && r.history || []).forEach(x => {
            const n = x && typeof x.note === 'string' ? x.note.replace(/; Phối hợp: [^.]*\./g, '.') : null;
            if (n !== null && n !== x.note) { x.note = n; changed = true; }
        });
        return changed;
    }
    function loadRecords() {
        ensureSeed();
        let list = readJson(KEY_RECORDS, []);
        // Chuẩn hóa dữ liệu cũ: Nội dung trình "Sửa chữa, đính chính QĐ" -> "Sửa chữa, bổ sung QĐ"
        if (/[Ss]ửa chữa, đính chính/.test(JSON.stringify(list))) { list = JSON.parse(JSON.stringify(list).replace(/Sửa chữa, đính chính/g, "Sửa chữa, bổ sung").replace(/sửa chữa, đính chính/g, "sửa chữa, bổ sung")); writeJson(KEY_RECORDS, list); }
        // Chuẩn hóa dữ liệu cũ: "Chờ phê duyệt" -> "Chờ duyệt"; Nội dung trình "Hoàn thành xác định"/"Kết quả xác định" -> "Kết quả xác định CQGQBT"
        const OLD_KQXD = ['Hoàn thành xác định', 'Kết quả xác định'];
        let changed = false;
        list.forEach(r => {
            // Dữ liệu cũ: phân công cán bộ chỉ còn 01 Cán bộ chủ trì, bỏ qua dữ liệu vai trò đã bỏ
            if (stripLegacyCoop(r)) changed = true;
            if (r.status === 'Chờ phê duyệt') { r.status = STATUS.CHO_PHE_DUYET; changed = true; }
            // Loại hồ sơ: "Yêu cầu bồi thường" -> "Giải quyết yêu cầu bồi thường"; Hình thức tiếp nhận theo 03 giá trị mới; Mã vụ việc toàn trình
            if (r.loaiYeuCau === REQUEST_TYPE_YCBT_OLD) { r.loaiYeuCau = REQUEST_TYPE_YCBT; changed = true; }
            const hm = normalizeReceiveMethod(r.hinhThucTiepNhan);
            if (r.hinhThucTiepNhan && hm !== r.hinhThucTiepNhan) { r.hinhThucTiepNhan = hm; changed = true; }
            if (!r.maVuViec && /^VVBT-/.test(r.code || '')) { r.maVuViec = r.code; changed = true; }
            // Nguồn hồ sơ: chuẩn hóa giá trị cũ về 04 giá trị Tiếp nhận mới / Dịch vụ công quốc gia / Chuyển CQGQBT / Xác định CQGQBT
            const ns = normalizeSource(r.nguonHoSo);
            if (r.nguonHoSo && ns !== r.nguonHoSo) { r.nguonHoSo = ns; changed = true; }
            // Loại người yêu cầu: dữ liệu cũ không có nycType -> theo ràng buộc Tư cách, mặc định Cá nhân
            if (r.nycType !== NYC_TYPES.CA_NHAN && r.nycType !== NYC_TYPES.TO_CHUC) { r.nycType = nycTypeOf(r); changed = true; }
            // Loại giấy tờ thân nhân: chuẩn hóa giá trị cũ theo DM_10 (CCCD/CMND/... -> CMND/CCCD/Chứng minh quân đội)
            if (r.nycDocType && normalizePersonalDocType(r.nycDocType) !== r.nycDocType) { r.nycDocType = normalizePersonalDocType(r.nycDocType); changed = true; }
            if (r.nbth && r.nbth.docType && normalizePersonalDocType(r.nbth.docType) !== r.nbth.docType) { r.nbth.docType = normalizePersonalDocType(r.nbth.docType); changed = true; }
            if (r.approval && OLD_KQXD.includes(r.approval.kind)) { r.approval.kind = KIND_KQXD; changed = true; }
            if (r.returned && OLD_KQXD.includes(r.returned.kind)) { r.returned.kind = KIND_KQXD; changed = true; }
            // Chuẩn hóa luồng phê duyệt: chỉ tới Cục Đăng ký giao dịch bảo đảm và BTNN, không gửi đến Bộ Tư pháp
            if (r.approval && Array.isArray(r.approval.path) && r.approval.path.includes('CĐK-01') && r.approval.path.includes('BTP-01')) {
                r.approval.path = r.approval.path.filter(u => u !== 'BTP-01');
                if (Array.isArray(r.approval.steps)) {
                    r.approval.steps = r.approval.steps.filter(s => s.unitId !== 'BTP-01');
                }
                if (Array.isArray(r.approval.assignees)) {
                    r.approval.assignees = r.approval.assignees.slice(0, r.approval.path.length);
                }
                if (r.approval.level >= r.approval.path.length) {
                    r.approval.level = r.approval.path.length - 1;
                    r.approval.done = true;
                    r.approval.pending = null;
                }
                changed = true;
            }
        });
        // Xác định CQGQBT: chuẩn hóa trạng thái/Nội dung trình cũ; hồ sơ Chờ chuyển CQGQBT cũ được tự động chuyển CQGQBT
        list.slice().forEach(r => { if (isXdRec(r) && migrateXdRecord(r, list)) changed = true; });
        // Giải quyết YCBT: chuẩn hóa trạng thái cũ của hồ sơ luồng về 17 Trạng thái vụ việc
        list.forEach(r => { if (r && r.module === 'YCBT' && migrateYcbtRecord(r)) changed = true; });
        // Mã vụ việc toàn trình: hồ sơ chưa có thì lấy theo sổ đăng ký (Mã hồ sơ hoặc Mã hồ sơ GQBT sinh ra) hoặc cấp mới;
        // hồ sơ XD- và hồ sơ BT- sinh ra khi Chuyển CQGQBT luôn dùng chung 01 Mã vụ việc
        list.forEach(r => {
            if (!r) return;
            const reg = vuViecRegistry();
            if (!isVuViecCode(r.maVuViec)) {
                r.maVuViec = (isVuViecCode(r.code) && r.code) || reg[r.code] || (r.claimCode && reg[r.claimCode]) || nextVuViecCode();
                changed = true;
            }
            if (r.code && !isVuViecCode(r.code) && reg[r.code] !== r.maVuViec) linkVuViec(r.code, r.maVuViec);
            if (r.claimCode && /^BT-/.test(r.claimCode) && reg[r.claimCode] !== r.maVuViec) linkVuViec(r.claimCode, r.maVuViec);
        });
        if (changed) writeJson(KEY_RECORDS, list);
        return list;
    }
    // ---------------- Xác định CQGQBT: trạng thái mới, tự động chuyển CQGQBT ----------------
    // Trạng thái cũ -> mới: Đang thực hiện -> Xác minh CQGQBT; Bị từ chối -> Không thụ lý; Hoàn thành / Chờ chuyển CQGQBT -> Đã chuyển CQGQBT
    // Chốt 23/10: Lãnh đạo Từ chối -> "Bị từ chối" (thay "Bị trả lại"); "Bị từ chối" cũ (không có lượt trả lại) -> Không thụ lý (xử lý tại migrateXdRecord)
    const XD_OLD_STATUS = { 'Đang thực hiện': 'Xác minh CQGQBT', 'Hoàn thành': 'Đã chuyển CQGQBT' };
    // ---------------- Giải quyết YCBT: 17 Trạng thái vụ việc (chỉ áp dụng hồ sơ module YCBT) ----------------
    const YCBT_STATUS = { BI_TU_CHOI: 'Bị từ chối', CU_NGUOI: 'Cử người giải quyết bồi thường', XAC_MINH_TH: 'Xác minh thiệt hại', DANG_PHDD: 'Đang phục hồi danh dự' };
    const YCBT_OLD_STATUS = {
        'Bị trả lại': 'Bị từ chối', 'Chờ thụ lý': 'Cử người giải quyết bồi thường', 'Đang xác minh thiệt hại': 'Xác minh thiệt hại',
        'Đang thương lượng': 'Thương lượng', 'Chờ phát hành văn bản': 'Yêu cầu bổ sung', 'Tạm đình chỉ giải quyết': 'Tạm đình chỉ', 'Sung quỹ nhà nước': 'Hoàn thành'
    };
    // Nội dung trình của chức năng Quyết định giải quyết bồi thường (Lãnh đạo từ chối -> Bị từ chối; dữ liệu cũ Bị trả lại đọc thành Bị từ chối)
    const YCBT_QD_KINDS = ['Quyết định GQBT', 'Hủy QĐ', 'Sửa chữa, bổ sung QĐ'];
    function isYcbtRec(r) { return !!r && r.module === 'YCBT'; }
    function migrateYcbtRecord(r) {
        let ch = false;
        // Phiếu trình Quyết định GQBT / Hủy QĐ / Sửa chữa QĐ (chức năng Quyết định giải quyết bồi thường): giữ nguyên
        const kind = (r.approval && r.approval.kind) || (r.returned && r.returned.kind) || '';
        if (YCBT_QD_KINDS.includes(kind) && r.status === STATUS.CHO_PHE_DUYET) return false;
        if (YCBT_OLD_STATUS[r.status]) { r.status = YCBT_OLD_STATUS[r.status]; ch = true; }
        // Vụ việc Chỉ yêu cầu phục hồi danh dự đã cử người giải quyết: trạng thái cũ "Đang thực hiện" -> Đang phục hồi danh dự
        if (r.status === STATUS.DANG_THUC_HIEN && r.requestKind === 'honor' && r.thuLy && !r.thuLy.rejected) { r.status = YCBT_STATUS.DANG_PHDD; ch = true; }
        ['approval', 'returned'].forEach(k => {
            const x = r[k];
            if (x) ['resultStatus', 'prevStatus'].forEach(f => { if (YCBT_OLD_STATUS[x[f]]) { x[f] = YCBT_OLD_STATUS[x[f]]; ch = true; } });
            // Loại trình cũ "Đình chỉ giải quyết" -> "Đình chỉ giải quyết bồi thường"
            if (x && x.kind === 'Đình chỉ giải quyết') { x.kind = 'Đình chỉ giải quyết bồi thường'; ch = true; }
        });
        return ch;
    }
    function isXdRec(r) { return !!r && (r.module === 'XD' || r.loaiYeuCau === REQUEST_TYPE_XD); }
    function hasClaimCode(r) { return !!(r && r.claimCode && /^BT-/.test(r.claimCode)); }
    // Mã hồ sơ kế tiếp theo danh sách đang xử lý (dùng khi chuẩn hóa dữ liệu, chưa ghi kho)
    function nextCodeIn(prefix, list) {
        const year = new Date().getFullYear();
        let max = 0;
        (list || []).forEach(r => { const m = String(r && r.code || '').match(new RegExp(`^${prefix}-${year}-(\\d+)$`)); if (m) max = Math.max(max, parseInt(m[1], 10)); });
        return `${prefix}-${year}-${String(max + 1).padStart(3, '0')}`;
    }
    // CQGQBT đã chọn tại Kết quả xác định (đơn vị gốc); dữ liệu cũ chỉ có tên cơ quan thì dò theo tên
    function xdTargetUnitId(rec) {
        if (!rec) return '';
        if (rec.procTargetUnitId && getUnit(rec.procTargetUnitId)) return getRootId(rec.procTargetUnitId) || rec.procTargetUnitId;
        const byName = findRootUnitByName(rec.procTargetAgency);
        return (byName && byName.id) || resolveAgencyUnit(rec.procTargetAgency) || '';
    }
    // Danh sách CQGQBT được chọn: đơn vị gốc đã cấu hình luồng Giải quyết YCBT
    function gqConfiguredRoots() { return flowRootIds(FLOW_TYPES.GQ).filter(id => isUnitConfigured(id, FLOW_TYPES.GQ)); }
    function xdTargetConfigured(rec) { const id = xdTargetUnitId(rec); return !!id && isUnitConfigured(id, FLOW_TYPES.GQ); }
    function xdTargetNotConfiguredMsg(rec) {
        const id = xdTargetUnitId(rec);
        return `Cơ quan ${id ? unitName(id) : (rec && rec.procTargetAgency) || '--'} chưa được cấu hình luồng Giải quyết YCBT. Vui lòng chọn cơ quan khác hoặc liên hệ Quản trị hệ thống.`;
    }
    // Tài liệu chuyển kèm: văn bản Kết quả xác định CQGQBT đã ký + toàn bộ tài liệu hồ sơ
    function xdTransferFiles(rec) {
        const out = [];
        const add = n => { if (n && !out.some(f => f.name === n)) out.push({ name: n }); };
        const sd = rec && rec.approval && rec.approval.signDoc;
        if (sd) add(sd.signedFile || sd.file);
        (rec.attachedDocs || []).forEach(d => add(d && d.file));
        (rec.vanBanCanCu || []).forEach(d => add(d && d.file));
        add(rec.procDecisionFile);
        return out;
    }
    // Tự động chuyển CQGQBT: tạo hồ sơ Giải quyết YCBT Chờ phân công tại CQGQBT (giữ Mã vụ việc, sinh Mã hồ sơ BT- mới);
    // hồ sơ XĐ chuyển Đã chuyển CQGQBT. list: danh sách đang chuẩn hóa (không ghi kho); không truyền thì ghi kho
    function xdCreateGqRecord(rec, targetId, content, files, byUserId, list) {
        const target = getUnit(targetId);
        if (!target) return '';
        const ycbtCode = list ? nextCodeIn('BT', list) : nextCode('BT');
        const at = nowText();
        const copy = JSON.parse(JSON.stringify(rec));
        ['routes', 'approval', 'history', 'returned', 'transfer', 'transferTo', 'chuTri', 'status', 'currentUnitId', 'module', 'code', 'id', 'claimCode'].forEach(k => delete copy[k]);
        const gq = Object.assign(copy, {
            id: uid('YC'), code: ycbtCode, module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, status: STATUS.CHO_PHAN_CONG,
            routes: [], chuTri: null, approval: null, history: [],
            nguonHoSo: SOURCES.XDCQ, maVuViec: rec.maVuViec || '', xdCode: rec.code,
            rootUnitId: getRootId(target.id) || target.id, currentUnitId: target.id,
            receivedAt: at, date: dateText(), createdBy: rec.chuTri || byUserId || '',
            transferContent: content || '', transferFiles: files || []
        });
        gq.history.push({ at, userId: byUserId || '', userName: byUserId ? userName(byUserId) : 'Hệ thống', action: 'Nhận hồ sơ từ Xác định CQGQBT', note: `Hồ sơ ${rec.code} chuyển đến. Chờ lãnh đạo ${target.name} phân công.` });
        if (list) list.unshift(gq); else upsertRecord(gq);
        if (gq.maVuViec) { linkVuViec(rec.code, gq.maVuViec); linkVuViec(ycbtCode, gq.maVuViec); }
        rec.transfer = { content: content || '', files: files || [], at, by: byUserId || '', ycbtCode, targetUnitId: target.id, auto: true };
        rec.claimCode = ycbtCode;
        rec.procTargetUnitId = rec.procTargetUnitId || target.id;
        rec.status = STATUS.DA_CHUYEN;
        return ycbtCode;
    }
    function migrateXdRecord(r, list) {
        let ch = false;
        ['approval', 'returned'].forEach(k => { if (r[k] && r[k].kind === 'Từ chối') { r[k].kind = 'Không thụ lý'; ch = true; } });
        // Ký duyệt ở mọi cấp Lãnh đạo: dữ liệu cũ "Phê duyệt" (cấp trước) -> "Ký duyệt"
        ((r.approval && r.approval.steps) || []).forEach(s => { if (s.action === 'Phê duyệt') { s.action = 'Ký duyệt'; ch = true; } });
        (r.history || []).forEach(h => {
            if (h.action !== 'Phê duyệt') return;
            h.action = 'Ký duyệt';
            h.note = String(h.note || '').replace(/Phê duyệt cấp/g, 'Ký duyệt cấp').replace(/phê duyệt cấp/g, 'ký duyệt cấp');
            ch = true;
        });
        if (r.status === STATUS.BI_TU_CHOI && !r.returned && !r.ktlReason && r.rejectionReason) { r.ktlReason = r.rejectionReason; ch = true; }
        // Nội dung trình "Tiếp nhận yêu cầu" của luồng cũ không còn áp dụng: hồ sơ về Xác minh CQGQBT
        const oldAccept = x => x && x.kind === 'Tiếp nhận yêu cầu';
        if ((r.status === STATUS.CHO_PHE_DUYET && oldAccept(r.approval)) || ((r.status === STATUS.BI_TRA_LAI || r.status === STATUS.BI_TU_CHOI) && r.returned && oldAccept(r.returned))) {
            r.status = STATUS.XAC_MINH; r.approval = null; r.returned = null; ch = true;
        }
        if (XD_OLD_STATUS[r.status]) { r.status = XD_OLD_STATUS[r.status]; ch = true; }
        // "Bị từ chối" cũ (nghĩa Không thụ lý, không có lượt Lãnh đạo trả lại) -> Không thụ lý; "Bị trả lại" cũ -> "Bị từ chối"
        if (r.status === STATUS.BI_TU_CHOI && !r.returned) { r.status = STATUS.KHONG_THU_LY; ch = true; }
        if (r.status === STATUS.BI_TRA_LAI) { r.status = STATUS.BI_TU_CHOI; ch = true; }
        if (r.status === STATUS.CHO_CHUYEN || (r.status === STATUS.DA_CHUYEN && !hasClaimCode(r))) {
            ch = true;
            if (hasClaimCode(r)) { r.status = STATUS.DA_CHUYEN; return ch; }
            const t = xdTargetUnitId(r);
            if (!r.history) r.history = [];
            if (t && isUnitConfigured(t, FLOW_TYPES.GQ)) {
                const code = xdCreateGqRecord(r, t, `Chuyển hồ sơ để ${unitName(t)} giải quyết theo thẩm quyền theo Kết quả xác định CQGQBT đã ký duyệt.`, xdTransferFiles(r), '', list);
                r.history.push({ at: nowText(), userId: '', userName: 'Hệ thống', action: 'Chuyển CQGQBT', note: `Hệ thống tự động chuyển ${unitName(t)}; tạo hồ sơ GQBT ${code}. Hồ sơ chuyển [${STATUS.DA_CHUYEN}].` });
            } else {
                r.status = STATUS.XAC_MINH;
                r.history.push({ at: nowText(), userId: '', userName: 'Hệ thống', action: 'Chuẩn hóa trạng thái', note: `Không tự động chuyển được: ${xdTargetNotConfiguredMsg(r)} Hồ sơ chuyển [${STATUS.XAC_MINH}] để cập nhật lại Kết quả xác định CQGQBT.` });
            }
        }
        return ch;
    }

    // Tạo/cập nhật hồ sơ luồng cho vụ việc YCBT đang quản lý tại phân hệ Giải quyết YCBT (để trình duyệt Lãnh đạo)
    function ensureClaimRecord(data) {
        const existing = getRecord(data.code);
        if (existing) {
            Object.keys(data).forEach(k => { if (data[k] !== undefined && !['routes', 'approval', 'history', 'status'].includes(k)) existing[k] = data[k]; });
            if (data.status && existing.status !== STATUS.CHO_PHE_DUYET) existing.status = data.status;
            upsertRecord(existing);
            return existing;
        }
        const rec = Object.assign({ module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, routes: [], approval: null, history: [] }, data);
        if (!rec.currentUnitId) rec.currentUnitId = rec.rootUnitId;
        upsertRecord(rec);
        return rec;
    }
    function saveRecords(list) { writeJson(KEY_RECORDS, list); }
    function getRecord(code) { return loadRecords().find(r => r.code === code) || null; }
    function upsertRecord(rec) {
        const list = loadRecords();
        const idx = list.findIndex(r => r.code === rec.code);
        if (idx >= 0) list[idx] = rec; else list.unshift(rec);
        saveRecords(list);
        return rec;
    }
    function removeRecord(code) { saveRecords(loadRecords().filter(r => r.code !== code)); }
    // extra (tùy chọn): thuộc tính bổ sung của dòng lịch sử, VD { kind: Nội dung trình } để xác định Loại công việc của Lãnh đạo
    function addHistory(rec, action, note, userId, extra) {
        if (!rec.history) rec.history = [];
        const uidv = userId || getCurrentUserId();
        rec.history.push(Object.assign({ at: nowText(), userId: uidv, userName: userName(uidv), action, note: note || '' }, extra || {}));
    }
    // Hình thức tiếp nhận: chuẩn hóa giá trị cũ về 04 giá trị của Danh mục DM_25
    function normalizeReceiveMethod(v) {
        const s = String(v || '').trim();
        if (!s || RECEIVE_METHOD_ORDER.includes(s)) return s;
        if (/bưu/i.test(s)) return RECEIVE_METHODS.BUU_CHINH;
        // Giá trị cũ có "Dịch vụ công" (VD bản trước của Hình thức tiếp nhận): hồ sơ gửi qua Dịch vụ công
        if (/dịch vụ công|môi trường số|dvc/i.test(s)) return RECEIVE_METHODS.MOI_TRUONG_SO;
        if (/một cửa/i.test(s)) return RECEIVE_METHODS.MOT_CUA;
        if (/trực tiếp/i.test(s)) return RECEIVE_METHODS.TRUC_TIEP;
        return s;
    }
    function normalizeSource(v) {
        const s = String(v || '').trim();
        if (!s || Object.values(SOURCES).includes(s)) return s;
        if (/dịch vụ công/i.test(s)) return SOURCES.DVC;
        if (/chuyển/i.test(s)) return SOURCES.CHUYEN;
        if (/xác định/i.test(s)) return SOURCES.XDCQ;
        return SOURCES.TIEP_NHAN;
    }
    // ---------------- Mã vụ việc toàn trình ----------------
    // - Mã vụ việc VVBT-yyyy-xxx: sinh 01 lần tại điểm vào đầu tiên (Tiếp nhận mới, Dịch vụ công quốc gia,
    //   Thêm mới trực tiếp "Vụ việc mới" tại Xác định CQGQBT / Giải quyết YCBT); các bước sau kế thừa, không sinh lại.
    // - Mỗi phân hệ có Mã hồ sơ riêng (XD- / BT- / HT-) gắn với Mã vụ việc qua sổ đăng ký KEY_VUVIEC
    //   { [Mã hồ sơ]: Mã vụ việc }. Sổ đăng ký không bị xóa khi một phân hệ nạp lại dữ liệu mẫu nên ánh xạ luôn ổn định.
    // - Số thứ tự đã cấp không cấp lại (kể cả khi hồ sơ bị xóa).
    const KEY_VUVIEC = 'btnn_vuviec_registry_v1';
    const VV_RE = /^VVBT-(\d{4})-(\d+)$/;
    function isVuViecCode(code) { return VV_RE.test(String(code || '').trim()); }
    function vuViecRegistry() { const m = readJson(KEY_VUVIEC, {}); return m && typeof m === 'object' && !Array.isArray(m) ? m : {}; }
    // Mọi Mã vụ việc đã cấp: kho luồng xử lý, sổ đăng ký, hồ sơ Giải quyết YCBT (claimsList)
    function allVuViecCodes() {
        const set = new Set();
        const add = c => { if (isVuViecCode(c)) set.add(String(c).trim()); };
        readJson(KEY_RECORDS, []).forEach(r => { if (r) { add(r.maVuViec); add(r.code); add(r.vuViecLienQuan); } });
        Object.values(vuViecRegistry()).forEach(add);
        ['claimsList', 'btnn_gq_phdd_claims_v1', 'receptionClaimsList_v2026'].forEach(k => { const l = readJson(k, []); if (Array.isArray(l)) l.forEach(c => { if (c) { add(c.maVuViec); add(c.vuViecLienQuan); } }); });
        const hwm = readJson(KEY_VUVIEC + '_hwm', {});
        Object.keys(hwm || {}).forEach(y => add(`VVBT-${y}-${String(hwm[y]).padStart(3, '0')}`));
        return set;
    }
    function nextVuViecCode() {
        const year = new Date().getFullYear();
        let max = 0;
        allVuViecCodes().forEach(c => { const m = c.match(VV_RE); if (m && +m[1] === year) max = Math.max(max, parseInt(m[2], 10)); });
        const code = `VVBT-${year}-${String(max + 1).padStart(3, '0')}`;
        // Ghi mốc số đã cấp để không cấp lại khi hồ sơ bị xóa
        const hwm = readJson(KEY_VUVIEC + '_hwm', {}); hwm[year] = max + 1; writeJson(KEY_VUVIEC + '_hwm', hwm);
        return code;
    }
    // Gắn Mã hồ sơ (XD- / BT- / HT-) với Mã vụ việc
    function linkVuViec(hoSoCode, maVuViec) {
        if (!hoSoCode || !isVuViecCode(maVuViec)) return '';
        const m = vuViecRegistry(); m[String(hoSoCode).trim()] = maVuViec; writeJson(KEY_VUVIEC, m);
        return maVuViec;
    }
    // Bỏ liên kết Mã hồ sơ khỏi sổ đăng ký (VD xóa hồ sơ hoàn trả). Số Mã vụ việc đã cấp vẫn không cấp lại.
    function unlinkVuViec(hoSoCode) {
        const code = String(hoSoCode || '').trim(); if (!code) return false;
        const m = vuViecRegistry(); if (!(code in m)) return false;
        delete m[code]; writeJson(KEY_VUVIEC, m); return true;
    }
    // Mã vụ việc của một hồ sơ: sổ đăng ký -> hồ sơ luồng xử lý (code / claimCode) -> cấp mới (trừ khi opts.create === false)
    function vuViecOf(hoSoCode, opts) {
        const code = String(hoSoCode || '').trim();
        if (!code) return '';
        if (isVuViecCode(code)) return code;
        const reg = vuViecRegistry();
        if (isVuViecCode(reg[code])) return reg[code];
        const rec = loadRecords().find(r => r && (r.code === code || r.claimCode === code) && isVuViecCode(r.maVuViec));
        if (rec) return linkVuViec(code, rec.maVuViec);
        if (opts && opts.create === false) return '';
        return linkVuViec(code, (opts && isVuViecCode(opts.preferred)) ? opts.preferred : nextVuViecCode());
    }
    // Danh sách vụ việc để chọn "Vụ việc đã có Mã vụ việc" / "Vụ việc liên quan": [{ code, nycName, hoSo: [Mã hồ sơ] }]
    function listVuViec() {
        const map = new Map();
        const get = c => { if (!map.has(c)) map.set(c, { code: c, nycName: '', hoSo: [] }); return map.get(c); };
        readJson(KEY_RECORDS, []).forEach(r => {
            if (!r || !isVuViecCode(r.maVuViec)) return;
            const v = get(r.maVuViec); if (!v.nycName && r.nycName) v.nycName = r.nycName;
            if (r.code && r.code !== r.maVuViec && !v.hoSo.includes(r.code)) v.hoSo.push(r.code);
        });
        Object.entries(vuViecRegistry()).forEach(([hs, c]) => { if (isVuViecCode(c)) { const v = get(c); if (!v.hoSo.includes(hs)) v.hoSo.push(hs); } });
        ['claimsList', 'btnn_gq_phdd_claims_v1', 'receptionClaimsList_v2026'].forEach(k => { const l = readJson(k, []); if (Array.isArray(l)) l.forEach(c => { if (c && isVuViecCode(c.maVuViec)) { const v = get(c.maVuViec); if (!v.nycName) v.nycName = c.nycName || (c.nyc && c.nyc.name) || c.requesterName || ''; if (c.code && !v.hoSo.includes(c.code)) v.hoSo.push(c.code); } }); });
        return Array.from(map.values()).sort((a, b) => b.code.localeCompare(a.code));
    }
    function nextCode(prefix) {
        const year = new Date().getFullYear();
        const list = readJson(KEY_RECORDS, []);
        let max = 0;
        list.forEach(r => {
            const m = String(r.code || '').match(new RegExp(`^${prefix}-${year}-(\\d+)$`));
            if (m) max = Math.max(max, parseInt(m[1], 10));
        });
        return `${prefix}-${year}-${String(max + 1).padStart(3, '0')}`;
    }

    // Tạo hồ sơ luồng mới ở trạng thái Chờ phân công tại đơn vị gốc
    function createPendingRecord(data) {
        const rec = Object.assign({
            module: data.loaiYeuCau === REQUEST_TYPE_XD ? 'XD' : 'YCBT',
            status: STATUS.CHO_PHAN_CONG,
            routes: [],
            chuTri: null,
            approval: null,
            history: []
        }, data);
        // Chuyển tới đơn vị cấp dưới: hồ sơ thuộc đơn vị gốc, chờ lãnh đạo của chính đơn vị được chọn phân công
        rec.currentUnitId = data.targetUnitId && getUnit(data.targetUnitId) ? data.targetUnitId : rec.rootUnitId;
        if (!rec.nguonHoSo) rec.nguonHoSo = SOURCES.TIEP_NHAN;
        if (!rec.maVuViec) rec.maVuViec = /^VVBT-/.test(rec.code || '') ? rec.code : nextVuViecCode();
        addHistory(rec, data.historyAction || 'Tiếp nhận hồ sơ', data.historyNote || `Chuyển lãnh đạo ${unitName(rec.rootUnitId)} phân công xử lý.`, data.createdBy);
        delete rec.historyAction; delete rec.historyNote;
        return upsertRecord(rec);
    }

    function latestRoute(rec) { return rec.routes && rec.routes.length ? rec.routes[rec.routes.length - 1] : null; }

    // Tiếp nhận được sửa/xóa khi hồ sơ thuộc nguồn Tiếp nhận mới và chưa có lãnh đạo nào thao tác
    function canEditAtReception(rec) {
        return !rec || ((!rec.nguonHoSo || rec.nguonHoSo === SOURCES.TIEP_NHAN) && rec.status === STATUS.CHO_PHAN_CONG && (!rec.routes || rec.routes.length === 0));
    }

    // ---------------- Phân công ----------------
    function canAssign(rec, userId) {
        return !!rec && [STATUS.CHO_PHAN_CONG, STATUS.DANG_PHAN_CONG].includes(rec.status) && isLeaderOf(userId, rec.currentUnitId, recFt(rec));
    }
    function markViewed(rec, userId) {
        const r = latestRoute(rec);
        if (rec.status === STATUS.CHO_PHE_DUYET && rec.approval && isLeaderOf(userId, rec.approval.path[rec.approval.level], recFt(rec))) {
            const p = rec.approval.pending;
            if (p && !p.viewedAt) { p.viewedAt = nowText(); p.viewedBy = userId; return true; }
            return false;
        }
        if (r && r.state === 'Chưa xử lý' && !r.viewedAt) {
            const target = r.type === 'unit' ? isLeaderOf(userId, r.toUnitId, recFt(rec)) : (r.chuTri === userId);
            if (target) { r.viewedAt = nowText(); r.viewedBy = userId; return true; }
        }
        return false;
    }
    function assignToUnit(code, toUnitId, note) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canAssign(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phân công. Vui lòng tải lại danh sách.' };
        const node = getNodeConfig(rec.currentUnitId, recFt(rec));
        if (!node || !node.allowUnit || !(node.units || []).includes(toUnitId)) return { ok: false, message: 'Đơn vị nhận không thuộc cấu hình luồng của đơn vị hiện tại.' };
        const prev = latestRoute(rec);
        if (prev) prev.state = 'Đã xử lý';
        rec.routes.push({ id: uid('R'), type: 'unit', fromUnitId: rec.currentUnitId, fromUserId: me, toUnitId, note: note || '', at: nowText(), state: 'Chưa xử lý' });
        rec.currentUnitId = toUnitId;
        rec.status = STATUS.DANG_PHAN_CONG;
        if (!rec.receivedBy) rec.receivedBy = userName(me);
        addHistory(rec, 'Chuyển đơn vị', `Chuyển ${unitName(toUnitId)} phân công.${note ? ' Ý kiến chỉ đạo: ' + note : ''}`);
        upsertRecord(rec);
        return { ok: true, record: rec };
    }
    function assignToOfficers(code, chuTri, note) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canAssign(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phân công. Vui lòng tải lại danh sách.' };
        const node = getNodeConfig(rec.currentUnitId, recFt(rec));
        if (!node || !node.allowOfficer) return { ok: false, message: 'Đơn vị hiện tại không được cấu hình phân công cán bộ.' };
        if (!chuTri) return { ok: false, message: 'Vui lòng chọn cán bộ chủ trì.' };
        const prev = latestRoute(rec);
        if (prev) prev.state = 'Đã xử lý';
        rec.routes.push({ id: uid('R'), type: 'officer', fromUnitId: rec.currentUnitId, fromUserId: me, chuTri, note: note || '', at: nowText(), state: 'Chưa xử lý' });
        rec.chuTri = chuTri;
        rec.status = STATUS.CHO_TIEP_NHAN;
        // Hồ sơ nguồn khác Tiếp nhận mới: người phân công đầu tiên tại Tiếp nhận hồ sơ là Cán bộ tiếp nhận
        if (!rec.receivedBy) rec.receivedBy = userName(me);
        addHistory(rec, 'Phân công cán bộ', `Chủ trì: ${userName(chuTri)}.${note ? ' Ý kiến chỉ đạo: ' + note : ''}`);
        upsertRecord(rec);
        return { ok: true, record: rec };
    }

    // ---------------- Thu hồi ----------------
    // Thu hồi lượt chuyển gần nhất khi bên nhận chưa xử lý; việc xem hồ sơ không tính là đã xử lý
    function getRecallInfo(rec, userId) {
        if (!rec) return null;
        if (rec.status === STATUS.CHO_PHE_DUYET && rec.approval && rec.approval.level > 0) {
            const last = rec.approval.steps[rec.approval.steps.length - 1];
            if (last && last.userId === userId) return { kind: 'approval', step: last };
            return null;
        }
        const r = latestRoute(rec);
        if (!r || r.state !== 'Chưa xử lý' || !isLeaderOf(userId, r.fromUnitId, recFt(rec))) return null;
        if (r.type === 'unit' && rec.status === STATUS.DANG_PHAN_CONG && rec.currentUnitId === r.toUnitId) return { kind: 'route', route: r };
        if (r.type === 'officer' && rec.status === STATUS.CHO_TIEP_NHAN) return { kind: 'route', route: r };
        return null;
    }
    function recall(code) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        const info = getRecallInfo(rec, me);
        if (!info) return { ok: false, message: 'Không thể thu hồi: bên nhận đã xử lý hồ sơ.' };
        if (info.kind === 'approval') {
            rec.approval.steps.pop();
            rec.approval.level -= 1;
            rec.approval.pending = { since: nowText() };
            addHistory(rec, 'Thu hồi phê duyệt', `Thu hồi kết quả phê duyệt đã chuyển ${unitName(rec.approval.path[rec.approval.level + 1])}.`, null, { kind: rec.approval.kind });
        } else {
            const r = rec.routes.pop();
            rec.currentUnitId = r.fromUnitId;
            if (r.type === 'officer') { rec.chuTri = null; }
            const prev = latestRoute(rec);
            if (prev) prev.state = 'Chưa xử lý';
            rec.status = rec.routes.length ? STATUS.DANG_PHAN_CONG : STATUS.CHO_PHAN_CONG;
            addHistory(rec, 'Thu hồi', r.type === 'unit' ? `Thu hồi hồ sơ đã chuyển ${unitName(r.toUnitId)}.` : `Thu hồi phân công cán bộ ${userName(r.chuTri)}.`);
        }
        upsertRecord(rec);
        return { ok: true, record: rec };
    }

    // ---------------- Trình - Phê duyệt ----------------
    // Luồng phê duyệt = ngược chiều luồng phân công thực tế; hồ sơ tạo trực tiếp đi theo đơn vị của cán bộ lên đơn vị gốc
    function computeApprovalPath(rec) {
        const units = (rec.routes || []).map(r => r.fromUnitId).filter(Boolean);
        let path = units.slice().reverse();
        if (!path.length) {
            const cb = getUser(rec.chuTri || rec.createdBy);
            path = cb ? getAncestors(cb.unitId).filter(u => getLeaders(u, recFt(rec)).length) : [];
        }
        path = path.filter((u, i) => path.indexOf(u) === i);
        // UI giả định: Luồng phê duyệt qua Cục Đăng ký giao dịch bảo đảm và BTNN chỉ tới Cục, không gửi đến Bộ Tư pháp
        if (path.includes('CĐK-01')) {
            path = path.filter(u => u !== 'BTP-01');
        }
        return path;
    }
    // extra.draftDoc: { generatedName, uploadedName } - văn bản dự thảo trình kèm (VD Thông báo yêu cầu bổ sung)
    // extra: { assignee: Lãnh đạo phê duyệt cấp 1 (bắt buộc khi cấp 1 có nhóm lãnh đạo), draftDoc: văn bản dự thảo/đính kèm trình,
    //          resultStatus: trạng thái khi cấp cuối phê duyệt, action: { type: 'transfer', targetUnitId, content, files } }
    function submitForApproval(code, kind, content, files, extra) {
        extra = extra || {};
        const rec = getRecord(code);
        const me = getCurrentUserId();
        // Cử người giải quyết bồi thường: Thủ trưởng cơ quan giải quyết bồi thường trình (hồ sơ Cử người giải quyết bồi thường hoặc Bị từ chối với Nội dung trình này)
        if (rec && kind === KIND_CU_NGUOI) { if (!canCuNguoi(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý hoặc bạn không có quyền cử người giải quyết.' }; }
        else if (!rec || rec.chuTri !== me) return { ok: false, message: 'Chỉ cán bộ chủ trì được trình phê duyệt.' };
        // Giải quyết YCBT: "Bị từ chối" = Lãnh đạo từ chối phiếu trình -> cán bộ cập nhật và trình lại được (phân hệ khác giữ nguyên)
        const closed = [STATUS.CHO_PHE_DUYET, STATUS.HOAN_THANH, STATUS.KHONG_THU_LY, STATUS.DA_CHUYEN, STATUS.CHO_PHAN_CONG, STATUS.DANG_PHAN_CONG].concat((isYcbtRec(rec) || isXdRec(rec)) ? [] : [STATUS.BI_TU_CHOI]);
        if (closed.includes(rec.status)) return { ok: false, message: 'Trạng thái hồ sơ không cho phép trình phê duyệt.' };
        const path = computeApprovalPath(rec);
        if (!path.length) return { ok: false, message: 'Chưa xác định được cấp phê duyệt. Vui lòng liên hệ Quản trị hệ thống.' };
        // extra.assignees: Lãnh đạo được chọn cho mọi cấp theo thứ tự luồng phê duyệt (Xác định CQGQBT: cán bộ chọn tất cả cấp khi trình)
        const preset = Array.isArray(extra.assignees) ? path.map((u, i) => extra.assignees[i] || '') : null;
        if (preset && !extra.assignee) extra.assignee = preset[0];
        const firstLeaders = getLeaders(path[0], recFt(rec));
        if (firstLeaders.length && !extra.assignee) return { ok: false, message: 'Vui lòng chọn Lãnh đạo phê duyệt.' };
        if (extra.assignee && firstLeaders.length && !firstLeaders.includes(extra.assignee)) return { ok: false, message: 'Lãnh đạo phê duyệt không thuộc nhóm lãnh đạo của cấp phê duyệt đầu tiên.' };
        if (preset) {
            for (let i = 1; i < path.length; i++) {
                const lv = getLeaders(path[i], recFt(rec));
                if (lv.length && !preset[i]) return { ok: false, message: `Vui lòng chọn Lãnh đạo ${unitName(path[i])}.` };
                if (preset[i] && lv.length && !lv.includes(preset[i])) return { ok: false, message: `Lãnh đạo được chọn không thuộc nhóm lãnh đạo của ${unitName(path[i])}.` };
            }
            preset[0] = extra.assignee || '';
        }
        // Xác định CQGQBT: trình Kết quả xác định CQGQBT khi CQGQBT đã chọn có cấu hình luồng Giải quyết YCBT (ký duyệt xong hệ thống tự động chuyển)
        if (isXdRec(rec) && kind === KIND_KQXD && !xdTargetConfigured(rec)) return { ok: false, message: xdTargetNotConfiguredMsg(rec) };
        if (rec.status === STATUS.CHO_TIEP_NHAN) {
            const r = latestRoute(rec);
            if (r) r.state = 'Đã xử lý';
        }
        rec.approval = {
            kind, content: content || '', files: files || [], draftDoc: extra.draftDoc || null,
            signDoc: extra.signDoc || null, reason: extra.reason || '',
            resultStatus: extra.resultStatus || '', action: extra.action || null, prevStatus: rec.status,
            path, level: 0, steps: [], assignees: preset || [extra.assignee || ''],
            submittedBy: me, submittedAt: nowText(), pending: { since: nowText() }
        };
        rec.status = STATUS.CHO_PHE_DUYET;
        const nextText = preset && path.length > 1 ? ' Lãnh đạo cấp tiếp theo: ' + path.slice(1).map((u, i) => (preset[i + 1] ? userName(preset[i + 1]) + ' - ' : '') + unitName(u)).join('; ') + '.' : '';
        addHistory(rec, 'Trình phê duyệt', `${kind}. Trình ${extra.assignee ? userName(extra.assignee) + ' - ' : ''}${unitName(path[0])}.${nextText}${content ? ' Nội dung: ' + content : ''}`);
        upsertRecord(rec);
        return { ok: true, record: rec };
    }
    // Lãnh đạo được giao đích danh tại cấp hiện tại; nếu cấp chưa giao đích danh thì cả nhóm lãnh đạo của cấp đó
    function canApprove(rec, userId) {
        if (!rec || rec.status !== STATUS.CHO_PHE_DUYET || !rec.approval) return false;
        const a = rec.approval;
        const assignee = (a.assignees || [])[a.level];
        if (assignee) return assignee === userId;
        return isLeaderOf(userId, a.path[a.level], recFt(rec));
    }
    function isLastApprovalLevel(rec) { return !!rec && !!rec.approval && rec.approval.level >= rec.approval.path.length - 1; }
    function nextLevelLeaders(rec) {
        if (!rec || !rec.approval || isLastApprovalLevel(rec)) return [];
        return getLeaders(rec.approval.path[rec.approval.level + 1], recFt(rec));
    }
    // Xác định CQGQBT: Lãnh đạo cấp tiếp theo do cán bộ chọn sẵn khi trình; dữ liệu cũ chưa có thì lấy Lãnh đạo đầu tiên của Nhóm lãnh đạo cấp tiếp theo
    function xdPresetNextAssignee(rec) {
        if (!rec || !rec.approval || !isXdRec(rec) || isLastApprovalLevel(rec)) return '';
        const a = rec.approval;
        const leaders = nextLevelLeaders(rec);
        const preset = (a.assignees || [])[a.level + 1];
        if (preset && (!leaders.length || leaders.includes(preset))) return preset;
        return leaders[0] || '';
    }
    // Nhóm lãnh đạo của cấp phê duyệt đầu tiên (dùng cho ô "Lãnh đạo phê duyệt" khi trình)
    function firstLevelLeaders(recLike) {
        const path = computeApprovalPath(recLike || {});
        return path.length ? getLeaders(path[0], recFt(recLike)) : [];
    }
    // Nội dung trình của hồ sơ Chờ duyệt / Bị trả lại
    function approvalKindOf(rec) {
        if (!rec) return '';
        if (rec.status === STATUS.CHO_PHE_DUYET && rec.approval) return rec.approval.kind;
        if ((rec.status === STATUS.BI_TRA_LAI || ((isYcbtRec(rec) || isXdRec(rec)) && rec.status === STATUS.BI_TU_CHOI)) && rec.returned) return rec.returned.kind || '';
        return '';
    }
    // Nhãn phụ hiển thị dưới trạng thái: chỉ tên Nội dung trình (không hiển thị cấp duyệt)
    function approvalLabel(rec) {
        return approvalKindOf(rec);
    }
    // Luồng phê duyệt động theo cấu hình luồng xử lý / cây đơn vị của cán bộ: "Cấp 1 - [Đơn vị] → Cấp 2 - [Đơn vị] ..."
    function approvalPathText(recLike) {
        return computeApprovalPath(recLike || {}).map((u, i) => `Cấp ${i + 1} - ${unitName(u)}`).join(' → ');
    }
    // Một dòng gọn đặt trong popup trình Lãnh đạo
    function approvalPathLineHtml(recLike) {
        const txt = approvalPathText(recLike);
        return txt ? `<div class="wf-path-line" style="font-size:12.5px; color:#475569; margin:4px 0 0;"><b>Luồng phê duyệt:</b> ${esc(txt)}</div>` : '';
    }
    // nextAssignee: Lãnh đạo phê duyệt cấp tiếp theo (bắt buộc khi chưa phải cấp cuối và cấp tiếp theo có nhóm lãnh đạo)
    function approve(code, note, nextAssignee) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canApprove(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách.' };
        const a = rec.approval;
        const unitId = a.path[a.level];
        if (!a.assignees) a.assignees = [];
        if (a.level < a.path.length - 1) {
            const nextLeaders = getLeaders(a.path[a.level + 1], recFt(rec));
            // Mọi phân hệ: chuyển tới Lãnh đạo cấp tiếp theo đã được cán bộ chọn khi trình, Lãnh đạo cấp trước không chọn
            if (!nextAssignee) {
                const preset = a.assignees[a.level + 1];
                nextAssignee = preset && (!nextLeaders.length || nextLeaders.includes(preset)) ? preset : (nextLeaders[0] || '');
            }
            if (nextLeaders.length && !nextAssignee) return { ok: false, message: 'Vui lòng chọn Lãnh đạo phê duyệt cấp tiếp theo.' };
            if (nextAssignee && nextLeaders.length && !nextLeaders.includes(nextAssignee)) return { ok: false, message: 'Lãnh đạo được chọn không thuộc nhóm lãnh đạo của cấp tiếp theo.' };
            // Xác định CQGQBT: cấp trước Ký duyệt = đồng ý chuyển cấp tiếp theo, không ký số
            const verb = isXdRec(rec) ? 'Ký duyệt' : 'Phê duyệt';
            a.steps.push({ unitId, userId: me, action: verb, note: note || '', at: nowText() });
            a.level += 1;
            a.assignees[a.level] = nextAssignee || '';
            a.pending = { since: nowText() };
            addHistory(rec, verb, `${a.kind}: ${verb.toLowerCase()} cấp ${unitName(unitId)}; chuyển ${nextAssignee ? userName(nextAssignee) + ' - ' : ''}${unitName(a.path[a.level])}.${note ? ' Ý kiến: ' + note : ''}`, null, { kind: a.kind });
        } else if (isXdRec(rec)) {
            // Xác định CQGQBT - cấp cuối Ký duyệt: Ký số -> hệ thống ký số văn bản tại vị trí đã định; Ký ngoài -> dùng văn bản đã ký cán bộ tải lên
            const isKq = a.kind === KIND_KQXD;
            if (isKq && !xdTargetConfigured(rec)) return { ok: false, message: xdTargetNotConfiguredMsg(rec) };
            a.steps.push({ unitId, userId: me, action: 'Ký duyệt', note: note || '', at: nowText() });
            if (a.signDoc) {
                const sd = a.signDoc;
                sd.signedFile = sd.method === 'Ký ngoài' ? sd.file : String(sd.file || `Van_ban_${rec.code}.pdf`).replace(/\.[^.]+$/, '') + '_da_ky.pdf';
                sd.signedBy = me;
                sd.signedAt = nowText();
            }
            a.done = true;
            a.pending = null;
            let extraNote = '';
            if (isKq) {
                const t = xdTargetUnitId(rec);
                const code = xdCreateGqRecord(rec, t, `Chuyển hồ sơ để ${unitName(t)} giải quyết theo thẩm quyền theo Kết quả xác định CQGQBT đã ký duyệt.`, xdTransferFiles(rec), me);
                extraNote = ` Hệ thống tự động chuyển ${unitName(t)}; tạo hồ sơ GQBT ${code}.`;
            } else if (a.kind === 'Yêu cầu bổ sung') {
                rec.status = STATUS.YC_BO_SUNG;
                rec.supplementReason = a.reason || a.content || '';
                pushSupplementHistory(rec, { reason: rec.supplementReason, method: 'Ký số', file: a.signDoc ? a.signDoc.signedFile : '', by: me, unitId });
            } else {
                rec.status = STATUS.KHONG_THU_LY;
                rec.ktlReason = a.reason || a.content || '';
            }
            const sdNote = a.signDoc ? ` ${a.signDoc.method === 'Ký ngoài' ? 'Văn bản ký ngoài' : 'Văn bản đã ký số'}: ${a.signDoc.signedFile}.` : '';
            addHistory(rec, 'Ký duyệt', `Ký duyệt cấp cuối (${unitName(unitId)}) - đã ký số văn bản: ${a.kind}.${sdNote}${extraNote} Hồ sơ chuyển [${rec.status}].${note ? ' Ý kiến: ' + note : ''}`, null, { kind: a.kind });
        } else {
            a.steps.push({ unitId, userId: me, action: 'Phê duyệt', note: note || '', at: nowText() });
            rec.status = a.resultStatus || SUBMIT_KINDS[a.kind] || a.prevStatus || STATUS.DANG_THUC_HIEN;
            a.done = true;
            a.pending = null;
            if (a.action && a.action.type === 'transfer') performTransfer(rec, a.action);
            // Cử người giải quyết bồi thường: cấp cuối ký duyệt Quyết định Mẫu 06/BTNN -> lưu cán bộ được cử (cán bộ đầu tiên là cán bộ chủ trì)
            if (a.kind === KIND_CU_NGUOI && a.action && Array.isArray(a.action.officers)) applyCuNguoi(rec, a.action.officers, a.submittedBy);
            addHistory(rec, 'Phê duyệt', `Phê duyệt cấp cuối (${unitName(unitId)}): ${a.kind}. Hồ sơ chuyển [${rec.status}].${note ? ' Ý kiến: ' + note : ''}`, null, { kind: a.kind });
        }
        upsertRecord(rec);
        return { ok: true, record: rec };
    }
    // ---------------- Không thụ lý - lý do KTL_01: Chuyển cơ quan tiếp nhận mới (03 tùy chọn) ----------------
    // BTP: Chuyển Bộ Tư pháp (Loại hồ sơ Xác định CQGQBT); STP: Chuyển Sở Tư pháp quản lý đơn vị (cùng tỉnh/thành phố, Loại hồ sơ Xác định CQGQBT);
    // CQ: Chuyển trực tiếp tới Cơ quan giải quyết bồi thường chọn trên cây Cơ cấu tổ chức (Loại hồ sơ Giải quyết YCBT)
    const KTL_TRANSFER_MODES = { BTP: 'BTP', STP: 'STP', CQ: 'CQ' };
    const KTL_TRANSFER_LABELS = { BTP: 'Chuyển Bộ Tư pháp', STP: 'Chuyển Sở Tư pháp', CQ: 'Chuyển trực tiếp tới Cơ quan giải quyết bồi thường' };
    // Sở Tư pháp quản lý đơn vị: Sở Tư pháp (đơn vị gốc) cùng tỉnh/thành phố với đơn vị gốc, so khớp theo tên tỉnh/thành phố trên Cơ cấu tổ chức
    function stpOfUnit(unitId) {
        const root = getRootId(unitId) || unitId;
        const u = getUnit(root);
        if (!u) return '';
        if (/^STP-/.test(root)) return root;
        const name = foldText(u.name).replace(/\s+/g, ' ').trim();
        const stp = getRootUnits().filter(x => /^STP-/.test(x.id)).find(x => {
            const prov = foldText(x.name.replace(/^Sở Tư pháp\s*/i, '')).replace(/\s+/g, ' ').trim();
            return prov && name.endsWith(prov);
        });
        return stp ? stp.id : '';
    }
    // Đơn vị nhận + Loại hồ sơ theo tùy chọn chuyển. rec: hồ sơ hiện tại (đơn vị gốc); unitId: cơ quan chọn (tùy chọn CQ)
    function ktlTransferTarget(rec, mode, unitId) {
        const root = rec ? (getRootId(rec.rootUnitId) || rec.rootUnitId) : '';
        let target = '', loai = REQUEST_TYPE_YCBT, ft = FLOW_TYPES.GQ;
        if (mode === KTL_TRANSFER_MODES.BTP) {
            target = (getRootUnits().find(x => /^BTP/.test(x.id)) || {}).id || '';
            loai = REQUEST_TYPE_XD; ft = FLOW_TYPES.XD_BTP;
        } else if (mode === KTL_TRANSFER_MODES.STP) {
            target = stpOfUnit(root);
            if (!target) return { ok: false, message: `Không xác định được Sở Tư pháp quản lý ${unitName(root)}. Vui lòng chọn tùy chọn khác hoặc liên hệ Quản trị hệ thống.` };
            loai = REQUEST_TYPE_XD; ft = FLOW_TYPES.XD_STP;
        } else if (mode === KTL_TRANSFER_MODES.CQ) {
            target = unitId && getUnit(unitId) ? unitId : '';
            if (!target) return { ok: false, message: 'Vui lòng chọn Cơ quan giải quyết bồi thường.' };
        } else {
            return { ok: false, message: 'Vui lòng chọn hình thức chuyển cơ quan tiếp nhận mới.' };
        }
        const tRoot = getRootId(target) || target;
        if (!isUnitConfigured(tRoot, ft)) return { ok: false, message: `Đơn vị ${unitName(tRoot)} chưa được cấu hình luồng ${FLOW_TYPE_NAMES[ft]}. Vui lòng liên hệ Quản trị hệ thống.` };
        return { ok: true, mode, targetUnitId: target, rootUnitId: tRoot, loaiYeuCau: loai, label: KTL_TRANSFER_LABELS[mode] };
    }
    // Khối "Chuyển cơ quan tiếp nhận mới" dùng chung (Popup Không thụ lý hồ sơ của cán bộ / Thủ trưởng):
    // Radio 03 tùy chọn; Chuyển Sở Tư pháp hiển thị chỉ đọc Sở Tư pháp xác định được; Chuyển trực tiếp hiển thị cây đơn vị (khóa đơn vị gốc của hồ sơ)
    function mountKtlTransfer(container, options) {
        if (!container) return null;
        const o = Object.assign({ rec: null, mode: '', unitId: '', name: 'ktlMode', treeInputId: '', onChange: null }, options || {});
        const rec = o.rec || {};
        const root = getRootId(rec.rootUnitId) || rec.rootUnitId || '';
        const stp = stpOfUnit(root);
        const radio = m => `<label style="display:flex; align-items:center; gap:8px; font-weight:600; cursor:pointer; margin:4px 0;"><input type="radio" name="${esc(o.name)}" value="${m}"> ${esc(KTL_TRANSFER_LABELS[m])}</label>`;
        container.innerHTML = `<div class="wf-ktl-modes">
            ${radio('BTP')}
            ${radio('STP')}
            <div class="wf-ktl-sub" data-for="STP" style="display:none; margin:2px 0 6px 24px; font-size:12.5px;">${stp
                ? `<span style="color:#475569;">Sở Tư pháp quản lý:</span> <b>${esc(unitName(stp))}</b>`
                : `<span style="color:#dc2626;">Không xác định được Sở Tư pháp quản lý ${esc(unitName(root))}.</span>`}</div>
            ${radio('CQ')}
            <div class="wf-ktl-sub" data-for="CQ" style="display:none; margin:2px 0 6px 24px;"><div class="wf-ktl-tree"></div></div>
            <div class="wf-ktl-err" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;"></div>
        </div>`;
        const tree = mountUnitTree(container.querySelector('.wf-ktl-tree'), {
            inputId: o.treeInputId, value: o.unitId || '', disabledIds: [root, rec.currentUnitId].filter(Boolean),
            disabledTitle: 'Đơn vị gốc của hồ sơ, không được chọn', placeholder: '-- Chọn cơ quan giải quyết bồi thường --',
            onChange: () => { setError(''); if (typeof o.onChange === 'function') o.onChange(api.getMode()); }
        });
        const errEl = container.querySelector('.wf-ktl-err');
        function setError(msg) { errEl.textContent = msg || ''; errEl.style.display = msg ? 'block' : 'none'; }
        function sync() {
            const m = api.getMode();
            container.querySelectorAll('.wf-ktl-sub').forEach(x => { x.style.display = x.getAttribute('data-for') === m ? 'block' : 'none'; });
        }
        container.querySelectorAll(`input[name="${o.name}"]`).forEach(r => {
            if (r.value === o.mode) r.checked = true;
            r.addEventListener('change', () => { setError(''); sync(); if (typeof o.onChange === 'function') o.onChange(api.getMode()); });
        });
        const api = {
            getMode() { const c = container.querySelector(`input[name="${o.name}"]:checked`); return c ? c.value : ''; },
            getUnitId() { const h = container.querySelector('.wf-ktl-tree input[type=hidden]'); return h ? h.value : ''; },
            // Đơn vị nhận theo tùy chọn đang chọn (rỗng khi chưa xác định)
            targetUnitId() { const r = ktlTransferTarget(rec, api.getMode(), api.getUnitId()); return r.ok ? r.targetUnitId : ''; },
            validate() { const r = ktlTransferTarget(rec, api.getMode(), api.getUnitId()); setError(r.ok ? '' : r.message); if (!r.ok && tree && api.getMode() === 'CQ' && !api.getUnitId()) tree.setInvalid(true); return r; },
            setError, tree
        };
        sync();
        return api;
    }
    // Câu chuyển hồ sơ của Mẫu 04/BTNN - Thông báo không thụ lý (lý do KTL_01)
    function ktlTransferSentence(issuer, targetUnitId, mode) {
        const purpose = mode === KTL_TRANSFER_MODES.CQ ? 'giải quyết theo thẩm quyền' : 'xác định cơ quan giải quyết bồi thường';
        return `Do vậy, ${issuer} chuyển hồ sơ yêu cầu bồi thường của Ông/Bà đến ${unitName(targetUnitId)} để ${purpose} và thông báo để Ông/Bà được biết.`;
    }
    // Chuyển hồ sơ sang cơ quan khác: cơ quan nhận tiếp nhận hồ sơ tại Tiếp nhận hồ sơ, trạng thái Chờ phân công (bắt đầu lại từ bước tiếp nhận).
    // action.loaiYeuCau: Loại hồ sơ tại cơ quan nhận (mặc định Giải quyết YCBT; KTL_01 chuyển Bộ/Sở Tư pháp: Xác định CQGQBT). Giữ nguyên Mã vụ việc.
    function performTransfer(rec, action) {
        const target = getUnit(action.targetUnitId);
        if (!target) return null;
        const loai = action.loaiYeuCau === REQUEST_TYPE_XD ? REQUEST_TYPE_XD : REQUEST_TYPE_YCBT;
        const newCode = nextCode('BT');
        const copy = JSON.parse(JSON.stringify(rec));
        ['routes', 'approval', 'history', 'returned', 'transfer', 'transferTo', 'chuTri', 'status', 'currentUnitId', 'code', 'id', 'appointedOfficers', 'thuLy', 'claimCode', 'seedKey', 'gqClaimId'].forEach(k => delete copy[k]);
        if (copy.gqData) ['ktlReasonCode', 'ktlReasonName', 'ktlDetail', 'ktlDraftDoc', 'transferRequest', 'rejectType', 'rejectReason', 'rejectOfficer', 'rejectDate', 'thongBaoThuLy'].forEach(k => delete copy.gqData[k]);
        // Tài liệu chuyển kèm: văn bản Thông báo không thụ lý (Mẫu 04/BTNN) + tài liệu đính kèm khi chuyển + tài liệu hồ sơ
        const files = [];
        const addF = n => { if (n && !files.some(f => f.name === n)) files.push({ name: n }); };
        const dd = action.noticeDoc || (rec.approval && rec.approval.kind === 'Không thụ lý' ? rec.approval.draftDoc : null);
        if (dd) addF(dd.source === 'uploaded' ? dd.uploadedName : dd.generatedName);
        (action.files || []).forEach(f => addF(f && (f.name || f)));
        (rec.attachedDocs || []).forEach(d => addF(d && d.file));
        const via = action.mode ? `Không thụ lý (KTL_01) - ${KTL_TRANSFER_LABELS[action.mode] || ''}` : 'Chuyển CQGQBT';
        createPendingRecord(Object.assign(copy, {
            id: 'YC' + Date.now().toString(36),
            code: newCode,
            module: loai === REQUEST_TYPE_XD ? 'XD' : 'YCBT',
            loaiYeuCau: loai,
            rootUnitId: getRootId(target.id) || target.id,
            targetUnitId: target.id,
            receivedAt: nowText(),
            date: dateText(),
            createdBy: rec.chuTri,
            nguonHoSo: SOURCES.CHUYEN,
            maVuViec: rec.maVuViec || '',
            vuViecLienQuan: rec.vuViecLienQuan || '',
            transferFromCode: rec.code,
            transferFromUnitId: rec.rootUnitId,
            transferMode: action.mode || '',
            transferContent: action.content || '',
            transferFiles: files,
            historyAction: 'Nhận hồ sơ chuyển CQGQBT',
            historyNote: `Hồ sơ ${rec.code} do ${unitName(rec.rootUnitId)} chuyển đến (${via}). Loại hồ sơ: ${loai}. Chờ lãnh đạo ${target.name} phân công.`
        }));
        if (rec.maVuViec) linkVuViec(newCode, rec.maVuViec);
        rec.transferTo = { targetUnitId: target.id, code: newCode, mode: action.mode || '', loaiYeuCau: loai, content: action.content || '', files, at: nowText() };
        return newCode;
    }
    function rejectApproval(code, reason) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canApprove(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách.' };
        if (!reason) return { ok: false, message: 'Vui lòng nhập lý do từ chối phê duyệt.' };
        const a = rec.approval;
        a.steps.push({ unitId: a.path[a.level], userId: me, action: 'Từ chối phê duyệt', note: reason, at: nowText() });
        // Lịch sử các lần bị trả lại (dựng lại từ lịch sử xử lý trước khi ghi lần mới; dựng trước khi gán rec.returned để không tính trùng lần đang ghi)
        rec.returnHistory = returnHistoryOf(rec, true);
        rec.returned = { reason, by: me, unitId: a.path[a.level], at: nowText(), kind: a.kind, prevStatus: a.prevStatus || '' };
        // Tài liệu kèm theo của lần trình bị trả lại (lưu theo phiếu trình để xem lại)
        rec.returnHistory.push({ kind: a.kind, reason, by: me, unitId: a.path[a.level], at: rec.returned.at, attachments: (a.signDoc && Array.isArray(a.signDoc.attachments)) ? a.signDoc.attachments : [] });
        // Chốt 23/10: Lãnh đạo từ chối -> "Bị từ chối" (mọi phân hệ BTNN); phiếu trình của chức năng Quyết định GQBT do màn hình Quyết định tự chuẩn hóa
        rec.status = STATUS.BI_TU_CHOI;
        a.pending = null;
        addHistory(rec, 'Từ chối phê duyệt', `Trả lại cán bộ chủ trì. Lý do: ${reason}`, null, { kind: a.kind });
        upsertRecord(rec);
        return { ok: true, record: rec };
    }

    // ---------------- Chuyển CQGQBT: sinh hồ sơ Giải quyết YCBT tại cơ quan giải quyết ----------------
    // Xác định CQGQBT không còn thao tác Chuyển CQGQBT thủ công: hệ thống tự động chuyển khi Lãnh đạo cấp cuối ký duyệt Kết quả xác định CQGQBT.
    // Giữ hàm cho dữ liệu/trang cũ: chỉ áp dụng hồ sơ Chờ chuyển CQGQBT (dữ liệu cũ), dùng chung lõi tự động chuyển.
    function transferToAgency(code, content, files, unitId) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!rec || rec.chuTri !== me) return { ok: false, message: 'Chỉ cán bộ xử lý được chuyển cơ quan giải quyết bồi thường.' };
        if (rec.status !== STATUS.CHO_CHUYEN) return { ok: false, message: 'Hồ sơ không ở trạng thái Chờ chuyển CQGQBT.' };
        if (unitId) rec.procTargetUnitId = getRootId(unitId) || unitId;
        if (!xdTargetConfigured(rec)) return { ok: false, message: xdTargetNotConfiguredMsg(rec) };
        const t = xdTargetUnitId(rec);
        const ycbtCode = xdCreateGqRecord(rec, t, content, files && files.length ? files : xdTransferFiles(rec), me);
        addHistory(rec, 'Chuyển CQGQBT', `Chuyển ${unitName(t)}; tạo hồ sơ GQBT ${ycbtCode}.${content ? ' Nội dung chuyển xử lý: ' + content : ''}`);
        upsertRecord(rec);
        return { ok: true, record: rec, ycbtCode };
    }

    // ---------------- Xác định CQGQBT - Ký ngoài: cán bộ ban hành trực tiếp, KHÔNG trình Lãnh đạo ----------------
    // Văn bản đã ký & đóng dấu ngoài hệ thống (PDF). Kết quả xác định CQGQBT: hệ thống tự động chuyển CQGQBT ngay;
    // Yêu cầu bổ sung -> Yêu cầu bổ sung; Không thụ lý -> Không thụ lý. Chờ duyệt / Bị trả lại chỉ áp dụng cho Ký số.
    function issueXdOffline(code, kind, file, reason) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!rec || rec.chuTri !== me) return { ok: false, message: 'Chỉ cán bộ xử lý được ban hành văn bản.' };
        if (!file) return { ok: false, message: 'Vui lòng tải lên văn bản PDF đã ký & đóng dấu.' };
        const isKq = kind === 'Kết quả xác định CQGQBT';
        if (isKq && !xdTargetConfigured(rec)) return { ok: false, message: xdTargetNotConfiguredMsg(rec) };
        const at = nowText();
        rec.offlineDoc = { kind, method: 'Ký ngoài', file, reason: reason || '', at, by: me };
        rec.procDecisionFile = file;
        rec.approval = null;
        rec.returned = null;
        let ycbtCode = '';
        if (isKq) {
            addHistory(rec, 'Ban hành Kết quả xác định CQGQBT (Ký ngoài)', `Văn bản đã ký ngoài: ${file}.`);
            const t = xdTargetUnitId(rec);
            ycbtCode = xdCreateGqRecord(rec, t, `Chuyển hồ sơ để ${unitName(t)} giải quyết theo thẩm quyền theo Kết quả xác định CQGQBT (Ký ngoài).`, xdTransferFiles(rec), me);
            addHistory(rec, 'Tự động chuyển CQGQBT', `Hệ thống tự động chuyển ${unitName(t)}; tạo hồ sơ GQBT ${ycbtCode}.`);
        } else if (kind === 'Yêu cầu bổ sung') {
            rec.status = STATUS.YC_BO_SUNG;
            rec.supplementReason = reason || '';
            pushSupplementHistory(rec, { reason: rec.supplementReason, method: 'Ký ngoài', file, by: me, unitId: (getUser(me) || {}).unitId || '', at });
            addHistory(rec, 'Ban hành Yêu cầu bổ sung (Ký ngoài)', `Văn bản đã ký ngoài: ${file}.`);
        } else {
            rec.status = STATUS.KHONG_THU_LY;
            rec.ktlReason = reason || '';
            addHistory(rec, 'Ban hành Không thụ lý (Ký ngoài)', `Văn bản đã ký ngoài: ${file}.`);
        }
        upsertRecord(rec);
        return { ok: true, record: rec, ycbtCode };
    }

    // ---------------- Xác định CQGQBT: lịch sử Yêu cầu bổ sung / Bị trả lại ----------------
    // rec.supplementHistory: các lần ban hành Yêu cầu bổ sung (Ký số - Lãnh đạo cấp cuối ký duyệt; Ký ngoài - cán bộ ban hành)
    // rec.returnHistory: các lần Lãnh đạo Từ chối phê duyệt (hồ sơ Bị trả lại). Dữ liệu cũ chưa có mảng: dựng lại từ lịch sử xử lý.
    function timeKey(s) {
        const m = String(s || '').match(/(\d{1,2}):(\d{2})\s+(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        return m ? Number(m[5] + pad(m[4]) + pad(m[3]) + pad(m[1]) + m[2]) : 0;
    }
    function sortByTime(list) { return list.map((x, i) => [x, i]).sort((p, q) => (timeKey(p[0].at) - timeKey(q[0].at)) || (p[1] - q[1])).map(p => p[0]); }
    // asc = true: cũ trước (để lưu); mặc định mới nhất trước (để hiển thị)
    function returnHistoryOf(rec, asc) {
        if (!rec) return [];
        let list;
        if (Array.isArray(rec.returnHistory)) list = rec.returnHistory.map(x => Object.assign({}, x));
        else {
            const steps = (rec.approval && rec.approval.steps) || [];
            list = (rec.history || []).filter(h => h.action === 'Từ chối phê duyệt').map(h => {
                const ret = rec.returned && rec.returned.at === h.at ? rec.returned : null;
                const st = steps.find(s => s.action === 'Từ chối phê duyệt' && s.userId === h.userId && s.at === h.at);
                const m = String(h.note || '').match(/Lý do:\s*([\s\S]*)$/);
                return {
                    kind: (ret && ret.kind) || historyKind(rec, h), reason: (ret && ret.reason) || (m ? m[1] : h.note || ''),
                    by: h.userId, unitId: (ret && ret.unitId) || (st && st.unitId) || (getUser(h.userId) || {}).unitId || '', at: h.at
                };
            });
            if (!list.length && rec.returned && rec.returned.reason) {
                const r = rec.returned;
                list = [{ kind: r.kind || '', reason: r.reason, by: r.by || '', unitId: r.unitId || '', at: r.at || '' }];
            }
        }
        list = sortByTime(list);
        return asc ? list : list.reverse();
    }
    function supplementHistoryOf(rec, asc) {
        if (!rec) return [];
        let list;
        if (Array.isArray(rec.supplementHistory)) list = rec.supplementHistory.map(x => Object.assign({}, x));
        else {
            const pdf = s => (String(s || '').match(/([^\s:]+\.pdf)/i) || [])[1] || '';
            const a = rec.approval && rec.approval.kind === 'Yêu cầu bổ sung' ? rec.approval : null;
            list = (rec.history || []).filter(h => h.action === 'Ban hành Yêu cầu bổ sung (Ký ngoài)'
                || (h.action === 'Ký duyệt' && /cấp cuối/.test(h.note || '') && historyKind(rec, h) === 'Yêu cầu bổ sung')).map(h => {
                const offline = /Ký ngoài/.test(h.action + ' ' + (h.note || ''));
                return {
                    reason: rec.supplementReason || (a && a.reason) || '', method: offline ? 'Ký ngoài' : 'Ký số',
                    file: pdf(h.note) || (a && a.signDoc && (a.signDoc.signedFile || a.signDoc.file)) || '',
                    by: h.userId, unitId: (getUser(h.userId) || {}).unitId || '', at: h.at
                };
            });
            if (!list.length && rec.status === STATUS.YC_BO_SUNG) {
                const sd = a && a.signDoc;
                const last = a && a.steps && a.steps.length ? a.steps[a.steps.length - 1] : null;
                list = [{
                    reason: rec.supplementReason || (a && a.reason) || '', method: sd && sd.method === 'Ký ngoài' ? 'Ký ngoài' : (sd ? 'Ký số' : 'Ký ngoài'),
                    file: (sd && (sd.signedFile || sd.file)) || rec.supplementFile || rec.procDecisionFile || '',
                    by: (last && last.userId) || (sd && sd.signedBy) || rec.chuTri || '', unitId: (last && last.unitId) || '', at: (last && last.at) || (sd && sd.signedAt) || ''
                }];
            }
        }
        list = sortByTime(list);
        // Thời điểm tiếp nhận hồ sơ bổ sung: lần Tiếp nhận bổ sung đầu tiên sau lần ban hành (trước lần ban hành kế tiếp)
        const recv = (rec.history || []).filter(h => /^Tiếp nhận (hồ sơ )?bổ sung/.test(h.action || ''));
        list.forEach((e, i) => {
            if (e.receivedAt) return;
            const from = timeKey(e.at), to = i + 1 < list.length ? timeKey(list[i + 1].at) : Infinity;
            const h = recv.find(x => timeKey(x.at) >= from && timeKey(x.at) < to);
            if (h) { e.receivedAt = h.at; e.receivedBy = h.userId; }
        });
        return asc ? list : list.reverse();
    }
    function pushSupplementHistory(rec, e) {
        // Dựng lại các lần trước (bỏ qua trạng thái hiện hành vừa chuyển Yêu cầu bổ sung để không tính trùng lần đang ghi)
        rec.supplementHistory = supplementHistoryOf(Object.assign({}, rec, { status: '' }), true);
        rec.supplementHistory.push({ reason: e.reason || '', method: e.method || 'Ký số', file: e.file || '', by: e.by || '', unitId: e.unitId || '', at: e.at || nowText() });
    }
    const histRow = (k, v) => `<div style="display:flex; gap:8px; margin-top:4px;"><span style="color:#64748b; min-width:170px; flex-shrink:0;">${esc(k)}:</span><span style="flex:1; min-width:0; white-space:pre-line;">${v}</span></div>`;
    const histFileLink = name => name ? `<i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> <b>${esc(name)}</b> <a href="#" onclick="event.preventDefault(); if (window.previewNamedFile) previewNamedFile(${esc(JSON.stringify(name))});" style="color:#2563eb; text-decoration:none; margin-left:8px; white-space:nowrap; font-weight:600;"><i class="fa-solid fa-eye"></i> Xem file</a>` : '--';
    // Khối THÔNG TIN HỒ SƠ BỊ TRẢ LẠI: kê đầy đủ các lần bị trả lại theo thứ tự thời gian; không ghi "Lần 1, Lần 2"
    // opts.withDocs (MH04): mỗi lần hiển thị bảng Tài liệu kèm theo của lần trình bị trả lại (ẩn khi không có)
    function renderXdReturnHistoryHtml(rec, opts) {
        const list = returnHistoryOf(rec, true);
        if (!list.length) return '';
        const current = rec.status === STATUS.BI_TRA_LAI || rec.status === STATUS.BI_TU_CHOI;
        const trinhDocs = e => {
            if (Array.isArray(e.attachments)) return e.attachments;
            const t = timeKey(e.at);
            const h = (rec.history || []).filter(x => /^Trình/.test(x.action || '') && timeKey(x.at) <= t).pop();
            return (h && h.attachments) || [];
        };
        const items = list.map((e, i) => {
            const isLatest = (i === list.length - 1);
            const docsHtml = opts && opts.withDocs && typeof window.tlktViewHtml === 'function' ? window.tlktViewHtml(trinhDocs(e), { boxClass: 'tlkt-view', titleClass: 'tlkt-sec-title' }) : '';
            return `<div style="background:#fff; border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:6px; padding:12px 14px; margin-top:8px; font-size:13px; line-height:1.55;">
                <div style="margin-bottom:6px;">
                    <div style="font-weight:700; color:#991b1b;"><i class="fa-solid fa-clock"></i> Thời điểm: ${esc(e.at || '--')}</div>
                </div>
                ${histRow('Lãnh đạo từ chối', `<b>${esc(userName(e.by))}</b>${e.unitId ? ' - ' + esc(unitName(e.unitId)) : ''}`)}
                ${histRow('Loại trình bị từ chối', `<b style="color:#b91c1c;">${esc(e.kind || '--')}</b>`)}
                ${histRow('Lý do chi tiết', `<span style="color:#991b1b; font-weight:500;">${esc(e.reason || '--')}</span>`)}
                ${docsHtml ? `<div style="margin-top:8px;">${docsHtml}</div>` : ''}
            </div>`;
        }).join('');
        return `<div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
                <div style="font-weight:700; color:#dc2626; font-size:14px;"><i class="fa-solid fa-rotate-left"></i> THÔNG TIN HỒ SƠ BỊ TỪ CHỐI</div>
            </div>${items}`;
    }
    // Khối THÔNG TIN YÊU CẦU BỔ SUNG: danh sách các lần ban hành Yêu cầu bổ sung (mới nhất trước); rỗng khi hồ sơ chưa từng Yêu cầu bổ sung
    function renderXdSupplementHistoryHtml(rec) {
        const list = supplementHistoryOf(rec);
        if (!list.length) return '';
        const current = rec.status === STATUS.YC_BO_SUNG;
        const items = list.map((e, i) => {
            const offline = e.method === 'Ký ngoài';
            const methodBadge = `<span class="badge" style="font-size:11px; ${offline ? 'background:#fed7aa; color:#9a3412;' : 'background:#dcfce7; color:#166534;'}">${offline ? '<i class="fa-solid fa-stamp"></i> Ký ngoài' : '<i class="fa-solid fa-signature"></i> Ký số'}</span>`;
            return `<div style="background:#fff; border:1px solid #fed7aa; border-radius:6px; padding:10px 14px; margin-top:8px; font-size:13px; line-height:1.5;">
                <div style="font-weight:700; color:#c2410c;">Lần ${list.length - i}</div>
                ${histRow('Nội dung yêu cầu bổ sung', esc(e.reason || '--'))}
                ${histRow('Hình thức ký', methodBadge)}
                ${histRow('Văn bản đã ký', histFileLink(e.file))}
                ${histRow('Người ban hành - thời điểm', `${esc(userName(e.by))}${e.unitId ? ' - ' + esc(unitName(e.unitId)) : ''}${e.at ? ' - ' + esc(e.at) : ''}`)}
                ${histRow('Tiếp nhận hồ sơ bổ sung', e.receivedAt ? `<span style="color:#15803d; font-weight:600;"><i class="fa-solid fa-circle-check"></i> ${esc(e.receivedAt)}${e.receivedBy ? ' - ' + esc(userName(e.receivedBy)) : ''}</span>` : '<span style="color:#9a3412;">Chưa tiếp nhận</span>')}
            </div>`;
        }).join('');
        return `<div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                <div style="font-weight:700; color:#c2410c; font-size:14px;"><i class="fa-solid fa-file-circle-question"></i> THÔNG TIN YÊU CẦU BỔ SUNG</div>
                <span class="badge" style="background:#ffedd5; color:#9a3412; font-size:11.5px;">${current ? '<i class="fa-solid fa-clock"></i> Đang chờ bổ sung' : '<i class="fa-solid fa-circle-check"></i> Đã tiếp nhận bổ sung'} - Số lần yêu cầu bổ sung: ${list.length}</span>
            </div>${items}`;
    }

    // ---------------- Cử người giải quyết bồi thường (Thủ trưởng cơ quan giải quyết bồi thường); tên hàm thuLy* giữ để tương thích ----------------
    // Hồ sơ Giải quyết YCBT chờ Thủ trưởng cử người giải quyết (17 Trạng thái vụ việc: Cử người giải quyết bồi thường)
    const STATUS_CHO_THU_LY = YCBT_STATUS.CU_NGUOI;
    // Đơn vị thụ lý = đơn vị phê duyệt cấp cuối của luồng phê duyệt hồ sơ (phiếu trình Tiếp nhận hồ sơ); chưa có phiếu trình thì tính theo luồng phê duyệt của hồ sơ
    function thuLyUnitOf(rec) {
        if (!rec) return '';
        const a = rec.approval;
        if (a && Array.isArray(a.path) && a.path.length) return a.path[a.path.length - 1];
        const path = computeApprovalPath(rec);
        return path.length ? path[path.length - 1] : rec.rootUnitId;
    }
    function thuLyLeaders(rec) { return getLeaders(thuLyUnitOf(rec), recFt(rec)); }
    function canThuLy(rec, userId) {
        return !!rec && rec.module === 'YCBT' && rec.status === STATUS_CHO_THU_LY && thuLyLeaders(rec).includes(userId);
    }
    // Cán bộ được cử giải quyết: cán bộ thuộc cây đơn vị gốc của hồ sơ, trừ thành viên Nhóm lãnh đạo
    function thuLyOfficerOptions(rec) {
        if (!rec) return [];
        const root = getRootId(rec.rootUnitId) || rec.rootUnitId;
        const cfg = getFlowConfig(FLOW_TYPES.GQ)[root] || {};
        const leaders = new Set();
        Object.values(cfg).forEach(n => (n.leaders || []).forEach(u => leaders.add(u)));
        return usersInUnitTree(root).filter(u => !leaders.has(u.id)).map(u => u.id);
    }
    // Cán bộ lập, trình (hoặc cập nhật, trình lại) Cử người giải quyết bồi thường: hồ sơ Cử người giải quyết bồi thường, hoặc Bị từ chối với Nội dung trình Cử người giải quyết bồi thường.
    // Người trình: cán bộ chủ trì hoặc cán bộ thuộc cơ quan giải quyết bồi thường của hồ sơ (Lãnh đạo chỉ Ký duyệt / Từ chối phiếu trình)
    function cuNguoiStage(rec) {
        if (!rec || rec.module !== 'YCBT') return false;
        if (rec.status === STATUS_CHO_THU_LY) return true;
        return rec.status === YCBT_STATUS.BI_TU_CHOI && !!rec.returned && rec.returned.kind === KIND_CU_NGUOI;
    }
    function canCuNguoi(rec, userId) {
        if (!cuNguoiStage(rec) || !userId) return false;
        if (rec.chuTri === userId) return true;
        const u = getUser(userId);
        const root = getRootId(rec.rootUnitId) || rec.rootUnitId;
        return !!u && (getRootId(u.unitId) || u.unitId) === root;
    }
    // Lưu cán bộ được cử giải quyết (cán bộ đầu tiên là cán bộ chủ trì); officers: mã tài khoản hoặc { userId, position, unit } theo giá trị nhập trên popup
    function applyCuNguoi(rec, officers, by) {
        const at = nowText();
        const list = (officers || []).map(o => {
            const id = typeof o === 'string' ? o : o && o.userId;
            const u = getUser(id);
            if (!u) return null;
            return { userId: id, name: u.name, position: (o && o.position) || u.title || '', email: u.email || '', unit: (o && o.unit) || unitName(u.unitId), appointedAt: at };
        }).filter(Boolean);
        if (!list.length) return null;
        rec.thuLy = { unitId: thuLyUnitOf(rec), by: by || getCurrentUserId(), at, officers: list.map(o => o.userId), note: '' };
        rec.chuTri = list[0].userId;
        const first = list[0];
        const patch = { appointedOfficers: list, assignedOfficer: first.name, assignedOfficerPosition: first.position, assignedOfficerUnit: first.unit, assignedOfficerEmail: first.email, officer: first.name };
        if (rec.requestKind && rec.requestKind !== 'money') Object.assign(patch, { phddStarted: true, phddStatus: STATUS.DANG_THUC_HIEN });
        rec.gqData = Object.assign({}, rec.gqData || {}, patch);
        return list;
    }
    // Cử người giải quyết bồi thường (ban hành trực tiếp - Ký ngoài): cử 01 hoặc nhiều cán bộ giải quyết (cán bộ đầu tiên là cán bộ chủ trì). Hồ sơ chuyển Xác minh thiệt hại
    // (vụ việc Chỉ yêu cầu phục hồi danh dự: Đang phục hồi danh dự)
    function acceptCase(code, officerIds, note) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canCuNguoi(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền cử người giải quyết. Vui lòng tải lại danh sách.' };
        const officers = applyCuNguoi(rec, officerIds, me);
        if (!officers) return { ok: false, message: 'Vui lòng chọn cán bộ được cử giải quyết.' };
        if (note) rec.thuLy.note = note;
        rec.returned = null;
        const honorOnly = rec.requestKind === 'honor';
        rec.status = honorOnly ? YCBT_STATUS.DANG_PHDD : YCBT_STATUS.XAC_MINH_TH;
        addHistory(rec, KIND_CU_NGUOI, `Cử ${officers.map(o => o.name).join(', ')} giải quyết bồi thường. Hồ sơ chuyển [${rec.status}].${note ? ' Ý kiến chỉ đạo: ' + note : ''}`);
        upsertRecord(rec);
        return { ok: true, record: rec };
    }
    // Không thụ lý: Lý do theo DM_55 (bắt buộc), Diễn giải; Lý do KTL_01 có chọn Cơ quan tiếp nhận mới -> Đã chuyển CQGQBT (tạo hồ sơ mới tại cơ quan tiếp nhận)
    function rejectCase(code, reasonCode, detail, transfer) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canThuLy(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền thụ lý. Vui lòng tải lại danh sách.' };
        const reason = getKtlReasons().find(r => r.code === reasonCode);
        if (!reason) return { ok: false, message: 'Vui lòng chọn Lý do không thụ lý.' };
        const at = nowText();
        // KTL_01: Chuyển cơ quan tiếp nhận mới theo 01 trong 03 tùy chọn (transfer.mode); dữ liệu cũ chỉ có targetUnitId -> Chuyển trực tiếp
        const isTransfer = reason.code === 'KTL_01' && !!transfer && !!(transfer.mode || transfer.targetUnitId);
        let tgt = null;
        if (isTransfer) {
            tgt = ktlTransferTarget(rec, transfer.mode || KTL_TRANSFER_MODES.CQ, transfer.targetUnitId);
            if (!tgt.ok) return { ok: false, message: tgt.message, transferError: true };
            if (!transfer.content) return { ok: false, message: 'Vui lòng nhập Nội dung/Căn cứ chuyển.', transferError: true };
        }
        rec.thuLy = { unitId: thuLyUnitOf(rec), by: me, at, rejected: true, reasonCode: reason.code, detail: detail || '' };
        rec.gqData = Object.assign({}, rec.gqData || {}, {
            ktlReasonCode: reason.code, ktlReasonName: reason.name, ktlDetail: detail || '',
            rejectType: 'Không thụ lý', rejectReason: reason.name + (detail ? '. ' + detail : ''), rejectOfficer: userName(me), rejectDate: at
        });
        if (isTransfer) {
            rec.status = STATUS.DA_CHUYEN;
            const newCode = performTransfer(rec, { type: 'transfer', mode: tgt.mode, loaiYeuCau: tgt.loaiYeuCau, targetUnitId: tgt.targetUnitId, content: transfer.content, files: transfer.files || [] });
            rec.gqData.transferRequest = { via: 'Không thụ lý', mode: tgt.mode, targetUnitId: tgt.targetUnitId, targetName: unitName(tgt.targetUnitId), loaiYeuCau: tgt.loaiYeuCau, content: transfer.content, files: transfer.files || [] };
            addHistory(rec, 'Không thụ lý', `${reason.name}${detail ? '. ' + detail : ''}. ${tgt.label}: ${unitName(tgt.targetUnitId)} (hồ sơ mới ${newCode}, Loại hồ sơ ${tgt.loaiYeuCau}). Hồ sơ chuyển [${rec.status}].`);
        } else {
            rec.status = STATUS.KHONG_THU_LY;
            addHistory(rec, 'Không thụ lý', `${reason.name}${detail ? '. ' + detail : ''}. Hồ sơ chuyển [${rec.status}].`);
        }
        upsertRecord(rec);
        return { ok: true, record: rec };
    }

    // ---------------- Danh sách việc của lãnh đạo ----------------
    function getLeaderTasks(userId) {
        const me = userId || getCurrentUserId();
        const all = loadRecords();
        const types = getRequestTypesForUser(me);
        const visible = all.filter(r => types.includes(r.loaiYeuCau));
        const assign = visible.filter(r => canAssign(r, me));
        const approveList = visible.filter(r => canApprove(r, me));
        const thuly = []; // Cử người giải quyết bồi thường do cán bộ lập, trình; Lãnh đạo chỉ Ký duyệt / Từ chối
        const done = visible.filter(r => (r.routes || []).some(x => x.fromUserId === me) || (r.approval && (r.approval.steps || []).some(s => s.userId === me)) || (r.history || []).some(h => h.userId === me && /Phê duyệt|Ký duyệt|Từ chối phê duyệt|Chuyển đơn vị|Phân công|Thụ lý/.test(h.action)));
        return { assign, approve: approveList, thuly, done };
    }

    // ---------------- Việc của Lãnh đạo theo Loại công việc (Dashboard Lãnh đạo) ----------------
    // Mỗi dòng là 01 công việc: Chờ xử lý = việc người dùng đang phải xử lý; Đã xử lý = mỗi lần người dùng đã xử lý (01 hồ sơ có thể nhiều dòng)
    const WORK_TYPES = {
        PHAN_CONG: 'Phân công',
        PHE_DUYET: 'Phê duyệt',
        THU_LY: 'Cử người giải quyết bồi thường', // Giải quyết YCBT: Thủ trưởng cử người giải quyết (không còn loại công việc Thụ lý)
        KY_QD: 'Ký duyệt Quyết định GQBT',
        KY_KP: 'Ký duyệt cấp kinh phí'
    };
    const WORK_TYPE_ORDER = [WORK_TYPES.PHAN_CONG, WORK_TYPES.PHE_DUYET, WORK_TYPES.THU_LY, WORK_TYPES.KY_QD, WORK_TYPES.KY_KP];
    const QD_KINDS = ['Quyết định GQBT', 'Hủy QĐ', 'Sửa chữa, bổ sung QĐ'];
    function workTypeOfKind(kind) { return QD_KINDS.includes(kind) ? WORK_TYPES.KY_QD : WORK_TYPES.PHE_DUYET; }
    // Nhãn thao tác của Lãnh đạo tại cấp hiện hành: Ký duyệt (Quyết định GQBT; Xác định CQGQBT ở mọi cấp) / Phê duyệt
    // Xác định CQGQBT: chỉ cấp cuối hệ thống ký số văn bản; các cấp trước Ký duyệt = đồng ý chuyển cấp tiếp theo
    function approveVerb(rec) {
        const a = rec && rec.approval;
        if (!a) return isXdRec(rec) ? 'Ký duyệt' : 'Phê duyệt';
        if (QD_KINDS.includes(a.kind)) return 'Ký duyệt';
        return isXdRec(rec) ? 'Ký duyệt' : 'Phê duyệt';
    }
    // Nội dung trình của 01 dòng lịch sử (dữ liệu cũ chưa lưu kind: dò theo nội dung ghi chú)
    function historyKind(rec, h) {
        if (h.kind) return h.kind;
        const all = [].concat(APPROVAL_KINDS.XD, APPROVAL_KINDS.YCBT).sort((a, b) => b.length - a.length);
        return all.find(k => String(h.note || '').includes(k)) || (rec.approval ? rec.approval.kind : '');
    }

    // Tên cơ quan giải quyết bồi thường -> đơn vị gốc trên Cơ cấu tổ chức (dữ liệu mẫu ghi tên cơ quan dạng rút gọn)
    const AGENCY_ALIASES = {
        'so tu phap ha noi': 'STP-HN', 'so tu phap tp. ha noi': 'STP-HN', 'so tu phap thanh pho ha noi': 'STP-HN',
        'ubnd quan cau giay': 'UBND-CG', 'ubnd quan hoang mai': 'UBND-HM', 'cong an quan thanh xuan': 'CA-TX',
        'toa an nhan dan tp. ha noi': 'TAND-HN', 'toa an nhan dan thanh pho ha noi': 'TAND-HN', 'toa an nhan dan quan hoan kiem': 'TAND-HK',
        'so tu phap hai phong': 'STP-HP', 'ubnd tinh lam dong': 'UBND-LD', 'ubnd quan dong da': 'UBND-DD',
        'cuc thi hanh an dan su ha noi': 'THADS-HN', 'ubnd thanh pho ha noi': 'UBND-HN', 'chi cuc thi hanh an dan su cau giay': 'CCTHADS-CG',
        'chi cuc thi hanh an dan su thanh tri': 'CCTHADS-TT', 'cong an quan hoang mai': 'CA-HM', 'toa an nhan dan quan lien chieu': 'TAND-LC',
        'chi cuc thuy san binh dinh': 'CCTS-BD'
    };
    function resolveAgencyUnit(name) {
        const key = foldText(name).replace(/\s+/g, ' ').trim();
        if (!key) return '';
        if (AGENCY_ALIASES[key]) return AGENCY_ALIASES[key];
        const simplify = s => foldText(s).replace(/\btp\.\s*/g, 'thanh pho ').replace(/[,.]/g, ' ').replace(/\s+/g, ' ').trim();
        const target = simplify(name);
        const u = getRootUnits().find(x => simplify(x.name) === target || simplify(x.name).startsWith(target + ' '));
        return u ? u.id : '';
    }
    // Thủ trưởng cơ quan giải quyết bồi thường của vụ việc (Mã vụ việc BT-): theo hồ sơ luồng, nếu chưa có thì theo tên cơ quan giải quyết
    function caseLeaders(code, agencyName) {
        const rec = getRecord(code);
        if (rec && rec.module === 'YCBT') return thuLyLeaders(rec);
        const root = resolveAgencyUnit(agencyName || caseAgencyName(code));
        if (!root) return [];
        const node = getNodeConfig(root) || {};
        return thuLyLeaders({ rootUnitId: root, chuTri: (node.officers || [])[0] || '', routes: [] });
    }
    function caseAgencyName(code) {
        const claims = readJson('claimsList', []);
        const c = Array.isArray(claims) ? claims.find(x => x && x.code === code) : null;
        return c ? (c.agency || '') : '';
    }

    // Đề nghị kinh phí (phân hệ Kinh phí bồi thường, kho 'proposalsList'): Lãnh đạo ký duyệt đề nghị "Chờ duyệt"
    const KEY_KP = 'proposalsList';
    const KEY_KP_VERSION = 'proposals_version';
    const KP_VERSION = 'v37_oct2026_kyso_tamung'; // trùng CURRENT_PROPOSALS_VERSION của phân hệ Kinh phí bồi thường
    // Dữ liệu mẫu dùng khi chưa mở phân hệ Kinh phí (cùng mã với dữ liệu mẫu của phân hệ); agencyName: cơ quan giải quyết của vụ việc
    const KP_FALLBACK = [
        { id: 'P3', code: 'KP-2026-003', type: 'Cấp kinh phí bồi thường', ycbtCode: 'BT-2026-005', nycName: 'Lê Văn D', amount: 200000000, user: 'Lê Văn Nam', date: '14/09/2026', status: 'Chờ duyệt', source: 'Ngân sách địa phương (Dự phòng)', cqCap: 'Sở Tài chính Hà Nội', notes: 'Đề nghị cấp phát kinh phí bồi thường chính thức 250.000.000 đ theo quyết định bồi thường số 104/QD-BT, trừ tạm ứng đã nhận 50 triệu.', files: [{ name: 'Tờ trình Lê Văn D', file: 'To_trinh_cap_KP_LeVanD.pdf' }], agencyName: 'Sở Tư pháp Hải Phòng' },
        { id: 'P4', code: 'KP-2026-004', type: 'Cấp tạm ứng', ycbtCode: 'BT-2026-002', nycName: 'Trần Thị B', amount: 50000000, user: 'Lê Văn Nam', date: '16/09/2026', status: 'Chờ duyệt', source: 'Tạm ứng kinh phí Bộ Tài chính', cqCap: 'Sở Tư pháp Hà Nội', notes: 'Đề nghị cấp tạm ứng bồi thường cho bà Trần Thị B.', files: [{ name: 'Đề xuất tạm ứng Trần Thị B', file: 'De_xuat_tam_ung_B.pdf' }], agencyName: 'Tòa án nhân dân TP. Hà Nội' },
        { id: 'P21', code: 'KP-2026-021', type: 'Cấp kinh phí bồi thường', ycbtCode: 'BT-2026-028', nycName: 'Hoàng Văn Thái', amount: 180000000, user: 'Lê Văn Nam', date: '18/09/2026', status: 'Chờ duyệt', source: 'Ngân sách địa phương (Dự phòng)', cqCap: 'Sở Tài chính Hà Nội', notes: 'Tờ trình đề nghị cấp phát kinh phí bồi thường tổn thất tài sản và thu nhập thực tế.', files: [{ name: 'Tờ trình cấp kinh phí Hoàng Văn Thái', file: 'To_trinh_KP_HoangVanThai.pdf' }], agencyName: 'Tòa án nhân dân TP. Hà Nội' },
        { id: 'P22', code: 'KP-2026-022', type: 'Cấp tạm ứng', ycbtCode: 'BT-2026-029', nycName: 'Nguyễn Thị Mai', amount: 70000000, user: 'Nguyễn Văn Thụ', date: '19/09/2026', status: 'Chờ duyệt', source: 'Tạm ứng kinh phí Bộ Tài chính', cqCap: 'Sở Tư pháp Hà Nội', notes: 'Tờ trình đề xuất tạm ứng kinh phí bồi thường cho bà Nguyễn Thị Mai.', files: [{ name: 'Tờ trình đề xuất tạm ứng Mai', file: 'To_trinh_tam_ung_NguyenThiMai.pdf' }], agencyName: 'UBND Quận Cầu Giấy' },
        { id: 'P2', code: 'KP-2026-002', type: 'Cấp tạm ứng', ycbtCode: 'BT-2026-002', nycName: 'Trần Thị B', amount: 100000000, user: 'Nguyễn Văn Thụ', date: '04/09/2026', status: 'Chờ chi trả', source: 'Tạm ứng kinh phí Bộ Tài chính', cqCap: 'Sở Tư pháp Hà Nội', notes: 'Cấp tạm ứng bồi thường thiệt hại cho bà Trần Thị B.', files: [{ name: 'Tờ trình đề xuất cấp kinh phí', file: 'De_xuat_tam_ung_B.pdf' }], leaderOpinion: 'Đồng ý cấp tạm ứng kinh phí bồi thường cho bà Trần Thị B.', approvedDate: '05/09/2026 09:15', approvedLeader: 'Lãnh đạo cơ quan', agencyName: 'Tòa án nhân dân TP. Hà Nội' },
        { id: 'P7', code: 'KP-2026-007', type: 'Cấp tạm ứng', ycbtCode: 'BT-2026-002', nycName: 'Trần Thị B', amount: 80000000, user: 'Lê Văn Nam', date: '08/09/2026', status: 'Bị từ chối', source: 'Tạm ứng kinh phí Bộ Tài chính', cqCap: 'Sở Tư pháp Hà Nội', notes: 'Đề nghị cấp tạm ứng bồi thường bị từ chối do thiếu tài liệu y tế chứng minh.', files: [], leaderOpinion: 'Từ chối do hồ sơ chưa đính kèm báo cáo giám định sức khỏe của bệnh viện cấp tỉnh.', approvedDate: '09/09/2026 10:30', approvedLeader: 'Lãnh đạo cơ quan', agencyName: 'Tòa án nhân dân TP. Hà Nội' }
    ];
    const KP_FALLBACK_AGENCY = {};
    KP_FALLBACK.forEach(p => { KP_FALLBACK_AGENCY[p.id] = p.agencyName; });
    function loadKinhPhi() {
        const list = readJson(KEY_KP, null);
        return Array.isArray(list) && list.length ? list : JSON.parse(JSON.stringify(KP_FALLBACK));
    }
    function isAdvanceProposal(p) { return p.type === 'Cấp tạm ứng' || p.type === 'Đề nghị tạm ứng'; }
    function kpLeaders(p) { return caseLeaders(p.ycbtCode, KP_FALLBACK_AGENCY[p.id] || ''); }
    // Ký duyệt (Phê duyệt / Từ chối) đề nghị kinh phí "Chờ duyệt"; ghi vào kho của phân hệ Kinh phí bồi thường
    function decideKinhPhi(id, approveIt, opinion) {
        const me = getCurrentUserId();
        const list = loadKinhPhi();
        const p = list.find(x => x.id === id);
        if (!p || p.type === 'Chi trả tiền bồi thường' || p.qdtu || p.status !== 'Chờ duyệt' || !kpLeaders(p).includes(me)) return { ok: false, message: 'Đề nghị đã được xử lý bởi người khác hoặc bạn không có quyền ký duyệt. Vui lòng tải lại danh sách.' };
        if (!approveIt && !opinion) return { ok: false, message: 'Vui lòng nhập lý do từ chối.' };
        const d = new Date();
        const at = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        p.status = approveIt ? 'Chờ chi trả' : 'Bị từ chối';
        p.leaderOpinion = opinion || (isAdvanceProposal(p) ? 'Đồng ý cấp tạm ứng kinh phí bồi thường.' : 'Đồng ý phê duyệt cấp kinh phí bồi thường.');
        p.approvedDate = at;
        p.approvedLeader = userName(me);
        p.approvedLeaderId = me;
        if (!approveIt) { if (!p.rejectHistory) p.rejectHistory = []; p.rejectHistory.unshift({ date: at, leader: userName(me), opinion }); }
        // Đề nghị tạm ứng - Hình thức ký "Ký số": hệ thống ký số Quyết định tạm ứng (Mẫu 07/BTNN) khi Lãnh đạo Ký duyệt
        if (approveIt && isAdvanceProposal(p) && p.signMethod === 'Ký số' && !p.signedFile) {
            p.signedFile = `QD_tam_ung_${p.code}_ky_so.pdf`;
            p.digitalSign = { by: userName(me), at, cert: 'Chứng thư số của Lãnh đạo ký duyệt' };
        }
        writeJson(KEY_KP, list);
        try { if (!localStorage.getItem(KEY_KP_VERSION)) localStorage.setItem(KEY_KP_VERSION, KP_VERSION); } catch (e) { /* bỏ qua */ }
        return { ok: true, proposal: p };
    }

    // Danh sách công việc của Lãnh đạo
    function getLeaderWork(userId) {
        const me = userId || getCurrentUserId();
        const types = getRequestTypesForUser(me);
        const recs = loadRecords().filter(r => types.includes(r.loaiYeuCau));
        const pending = [];
        const done = [];
        const lastSenderOf = rec => {
            const r = latestRoute(rec);
            if (r) return { who: `${userName(r.fromUserId)} (${unitName(r.fromUnitId)})`, at: r.at };
            const h = (rec.history || [])[0];
            return { who: h ? `${h.userName} - ${/Xác định CQGQBT/.test(h.action) ? 'Chuyển từ Xác định CQGQBT' : 'Cán bộ tiếp nhận'}` : '--', at: rec.receivedAt || '--' };
        };
        recs.forEach(rec => {
            const base = { source: 'wf', code: rec.code, caseCode: rec.code, rec, loaiYeuCau: rec.loaiYeuCau, nguonHoSo: rec.nguonHoSo || '', nycName: rec.nycName || '', status: rec.status };
            if (canAssign(rec, me)) {
                const s = lastSenderOf(rec);
                pending.push(Object.assign({}, base, { key: 'pc:' + rec.code, type: WORK_TYPES.PHAN_CONG, detail: `Phân công xử lý tại ${unitName(rec.currentUnitId)}`, who: s.who, at: s.at }));
            }
            if (canApprove(rec, me)) {
                const a = rec.approval;
                const step = a.steps[a.steps.length - 1];
                pending.push(Object.assign({}, base, {
                    key: 'pd:' + rec.code, type: workTypeOfKind(a.kind), kind: a.kind,
                    detail: `${approveVerb(rec)}: ${a.kind} - cấp ${a.level + 1}/${a.path.length}`,
                    who: step ? `${userName(step.userId)} (${unitName(step.unitId)})` : `${userName(a.submittedBy)} - Cán bộ chủ trì`,
                    at: step ? step.at : a.submittedAt
                }));
            }
            // Cử người giải quyết bồi thường do cán bộ lập, trình; Lãnh đạo chỉ Ký duyệt / Từ chối phiếu trình (không còn công việc chờ Cử người tại Dashboard Lãnh đạo)
            if (false && canCuNguoi(rec, me)) {
                const ph = (rec.history || []).filter(x => x.action === 'Phê duyệt').pop();
                const back = rec.status === YCBT_STATUS.BI_TU_CHOI;
                pending.push(Object.assign({}, base, {
                    key: 'tl:' + rec.code, type: WORK_TYPES.THU_LY, kind: back ? KIND_CU_NGUOI : '',
                    detail: back ? `Cập nhật, trình lại Cử người giải quyết bồi thường (bị từ chối: ${rec.returned.reason || ''})` : `Cử người giải quyết bồi thường tại ${unitName(thuLyUnitOf(rec))}`,
                    who: ph ? `${ph.userName} (Phê duyệt tiếp nhận)` : '--', at: ph ? ph.at : (rec.receivedAt || '--')
                }));
            }
            // Đã xử lý: mỗi thao tác của người dùng trên hồ sơ là 01 dòng
            (rec.history || []).forEach((h, idx) => {
                if (h.userId !== me) return;
                let type = '';
                if (['Chuyển đơn vị', 'Phân công cán bộ', 'Thu hồi'].includes(h.action)) type = WORK_TYPES.PHAN_CONG;
                else if (['Phê duyệt', 'Ký duyệt', 'Từ chối phê duyệt', 'Thu hồi phê duyệt'].includes(h.action)) type = workTypeOfKind(historyKind(rec, h));
                else if (['Thụ lý', 'Không thụ lý', KIND_CU_NGUOI].includes(h.action)) type = WORK_TYPES.THU_LY;
                if (!type) return;
                const kind = type === WORK_TYPES.PHAN_CONG || type === WORK_TYPES.THU_LY ? '' : historyKind(rec, h);
                done.push(Object.assign({}, base, { key: `h:${rec.code}:${idx}`, type, kind, action: h.action, detail: `${h.action}${kind && !String(h.note || '').includes(kind) ? ' - ' + kind : ''}${h.note ? ': ' + h.note : ''}`, who: h.userName, at: h.at, history: h }));
            });
        });
        loadKinhPhi().forEach(p => {
            // Chi trả tiền bồi thường (Thông báo chi trả - Mẫu 32): Ký duyệt nhiều cấp tại màn hình Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường
            // Quyết định tạm ứng kinh phí bồi thường (Mẫu 07 - bản ghi có qdtu): Ký duyệt nhiều cấp tại màn hình Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường
            if (p.type === 'Chi trả tiền bồi thường' || p.qdtu) return;
            const leaders = kpLeaders(p);
            if (!leaders.includes(me)) return;
            const base = { source: 'kp', code: p.code, caseCode: p.ycbtCode, proposal: p, loaiYeuCau: REQUEST_TYPE_YCBT, nycName: p.nycName || '', status: p.status, kind: isAdvanceProposal(p) ? KIND_KP_QDTU : KIND_KP_TB, type: WORK_TYPES.KY_KP }; // Loại trình phân hệ Kinh phí: chỉ 02 loại (APPROVAL_KINDS.KP)
            const amount = (Number(p.amount) || 0).toLocaleString('vi-VN') + ' đ';
            if (p.status === 'Chờ duyệt') {
                pending.push(Object.assign({}, base, { key: 'kp:' + p.id, detail: `Ký duyệt ${base.kind} ${amount}`, who: `${p.user || '--'} - Cán bộ lập đề nghị`, at: p.date || '--' }));
            } else if (p.approvedDate && (!p.approvedLeaderId || p.approvedLeaderId === me)) {
                const ok = p.status !== 'Bị từ chối';
                done.push(Object.assign({}, base, { key: 'kpd:' + p.id, action: ok ? 'Phê duyệt' : 'Từ chối', detail: `${ok ? 'Đã ký duyệt' : 'Từ chối'} ${base.kind} ${amount}${p.leaderOpinion ? '. Ý kiến: ' + p.leaderOpinion : ''}`, who: p.approvedLeaderId ? userName(me) : (p.approvedLeader || '--'), at: p.approvedDate }));
            }
        });
        const toDate = s => { const m = String(s || '').match(/(\d{2}):(\d{2})\s+(\d{2})\/(\d{2})\/(\d{4})|(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/); if (!m) return 0; return m[1] ? new Date(+m[5], m[4] - 1, +m[3], +m[1], +m[2]).getTime() : new Date(+m[8], m[7] - 1, +m[6], +(m[9] || 0), +(m[10] || 0)).getTime(); };
        pending.sort((a, b) => toDate(b.at) - toDate(a.at));
        done.sort((a, b) => toDate(b.at) - toDate(a.at));
        return { pending, done };
    }

    // ---------------- Chọn đơn vị dạng cây (Tree-Select) có tìm kiếm theo Tên / Mã đơn vị ----------------
    function unitTreeLabel(id) { const u = getUnit(id); return u ? `${u.id} - ${u.name}` : ''; }
    function foldText(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); }
    // Tìm kiếm: hiển thị đơn vị khớp + nhánh cha (tự mở rộng) + đơn vị trực thuộc
    function searchUnits(q) {
        const k = foldText(q).trim();
        if (!k) return null;
        const show = new Set(), open = new Set();
        ORG_UNITS.forEach(u => {
            if (foldText(u.name).includes(k) || foldText(u.id).includes(k)) {
                show.add(u.id);
                getAncestors(u.id).slice(1).forEach(a => { show.add(a); open.add(a); });
                getDescendants(u.id).forEach(d => show.add(d));
            }
        });
        return { show, open };
    }
    function ensureUnitTreeCss() {
        if (typeof document === 'undefined' || document.getElementById('wf-utree-css')) return;
        const st = document.createElement('style');
        st.id = 'wf-utree-css';
        st.textContent = [
            '.wf-utree{position:relative;}',
            '.wf-utree-display{display:flex;align-items:center;gap:8px;min-height:38px;cursor:pointer;background:#fff;}',
            '.wf-utree-display .wf-utree-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
            '.wf-utree-ph{color:#94a3b8;}',
            '.wf-utree-clear{border:none;background:transparent;color:#64748b;cursor:pointer;padding:0 4px;font-size:14px;}',
            '.wf-utree-clear:hover{color:#dc2626;}',
            '.wf-utree-panel{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:3000;background:#fff;border:1px solid #cbd5e1;border-radius:8px;box-shadow:0 10px 24px rgba(15,23,42,.15);padding:8px;}',
            '.wf-utree-search{position:relative;margin-bottom:6px;}',
            '.wf-utree-search i{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:13px;}',
            '.wf-utree-search input{width:100%;box-sizing:border-box;height:34px;border:1px solid #cbd5e1;border-radius:6px;padding:4px 10px 4px 30px;font-size:13px;}',
            '.wf-utree-list{max-height:280px;overflow:auto;font-size:13px;}',
            '.wf-utree-node{display:flex;align-items:center;gap:6px;padding:5px 6px;border-radius:5px;cursor:pointer;}',
            '.wf-utree-node:hover{background:#eff6ff;}',
            '.wf-utree-node.selected{background:#dbeafe;font-weight:600;}',
            '.wf-utree-node.disabled{opacity:.4;cursor:not-allowed;}',
            '.wf-utree-node.disabled:hover{background:transparent;}',
            '.wf-utree-tg{width:16px;text-align:center;color:#64748b;flex:0 0 16px;}',
            '.wf-utree-ic{color:#2563eb;width:16px;text-align:center;flex:0 0 16px;}',
            '.wf-utree-code{color:#64748b;font-size:12px;white-space:nowrap;}',
            '.wf-utree-empty{padding:10px;color:#64748b;font-style:italic;}',
            '.wf-utree.is-invalid .wf-utree-display{border-color:#dc2626;}'
        ].join('\n');
        document.head.appendChild(st);
    }
    // options: { inputId, value, disabledIds: [], disabledTitle, placeholder, onChange(id) }
    // Ô hiển thị "[Mã đơn vị] - [Tên đơn vị]" kèm nút x; giá trị lưu ở input ẩn (id = inputId); controller gắn tại container.__utree
    function mountUnitTree(container, options) {
        if (!container) return null;
        ensureUnitTreeCss();
        const o = Object.assign({ inputId: '', value: '', disabledIds: [], disabledTitle: 'Đơn vị hiện tại của vụ việc, không được chọn', placeholder: '-- Chọn đơn vị --' }, options || {});
        let value = '';
        let disabled = new Set(o.disabledIds || []);
        const expanded = new Set();
        let query = '';
        container.classList.add('wf-utree');
        container.innerHTML =
            `<input type="hidden"${o.inputId ? ` id="${esc(o.inputId)}"` : ''}>` +
            '<div class="form-control wf-utree-display" tabindex="0" role="combobox" aria-expanded="false"><span class="wf-utree-text"></span>' +
            '<button type="button" class="wf-utree-clear" title="Xóa đơn vị đã chọn"><i class="fa-solid fa-xmark"></i></button>' +
            '<i class="fa-solid fa-chevron-down" style="color:#64748b;font-size:12px;"></i></div>' +
            '<div class="wf-utree-panel" style="display:none;"><div class="wf-utree-search"><i class="fa-solid fa-magnifying-glass"></i>' +
            '<input type="text" placeholder="Tìm theo tên hoặc mã đơn vị..."></div><div class="wf-utree-list"></div></div>';
        const hidden = container.querySelector('input[type=hidden]');
        const display = container.querySelector('.wf-utree-display');
        const text = container.querySelector('.wf-utree-text');
        const clearBtn = container.querySelector('.wf-utree-clear');
        const panel = container.querySelector('.wf-utree-panel');
        const search = container.querySelector('.wf-utree-search input');
        const list = container.querySelector('.wf-utree-list');
        const icon = depth => depth === 0 ? 'fa-sitemap' : (depth === 1 ? 'fa-building' : 'fa-folder-tree');
        function paintDisplay() {
            hidden.value = value;
            text.innerHTML = value ? esc(unitTreeLabel(value)) : `<span class="wf-utree-ph">${esc(o.placeholder)}</span>`;
            clearBtn.style.display = value ? '' : 'none';
        }
        function renderList() {
            const found = searchUnits(query);
            const rows = [];
            (function walk(units, depth) {
                units.forEach(u => {
                    if (found && !found.show.has(u.id)) return;
                    const kids = getChildren(u.id).filter(c => !found || found.show.has(c.id));
                    const isOpen = found ? kids.length > 0 : expanded.has(u.id);
                    const isDis = disabled.has(u.id);
                    const cls = 'wf-utree-node' + (u.id === value ? ' selected' : '') + (isDis ? ' disabled' : '');
                    rows.push(`<div class="${cls}" data-id="${esc(u.id)}" style="padding-left:${6 + depth * 18}px;"${isDis ? ` title="${esc(o.disabledTitle)}"` : ''}>` +
                        `<span class="wf-utree-tg" data-toggle="${kids.length ? esc(u.id) : ''}">${kids.length ? `<i class="fa-solid fa-chevron-${isOpen ? 'down' : 'right'}"></i>` : ''}</span>` +
                        `<i class="fa-solid ${icon(depth)} wf-utree-ic"></i><span>${esc(u.name)}</span><span class="wf-utree-code">${esc(u.id)}</span></div>`);
                    if (kids.length && isOpen) walk(kids, depth + 1);
                });
            })(getRootUnits(), 0);
            list.innerHTML = rows.length ? rows.join('') : '<div class="wf-utree-empty">Không tìm thấy đơn vị phù hợp.</div>';
        }
        function open() { panel.style.display = ''; display.setAttribute('aria-expanded', 'true'); query = ''; search.value = ''; renderList(); setTimeout(() => search.focus(), 0); }
        function close() { panel.style.display = 'none'; display.setAttribute('aria-expanded', 'false'); }
        function setValue(id, silent) {
            value = id && getUnit(id) && !disabled.has(id) ? id : '';
            if (value) getAncestors(value).slice(1).forEach(a => expanded.add(a));
            paintDisplay();
            if (value) container.classList.remove('is-invalid');
            if (!silent) {
                hidden.dispatchEvent(new Event('change', { bubbles: true }));
                if (typeof o.onChange === 'function') o.onChange(value);
            }
        }
        display.addEventListener('click', e => { if (e.target.closest('.wf-utree-clear')) return; if (panel.style.display === 'none') open(); else close(); });
        display.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
        clearBtn.addEventListener('click', e => { e.stopPropagation(); setValue(''); });
        search.addEventListener('input', () => { query = search.value; renderList(); });
        search.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
        list.addEventListener('click', e => {
            const tg = e.target.closest('[data-toggle]');
            if (tg && tg.getAttribute('data-toggle') && !query) {
                const id = tg.getAttribute('data-toggle');
                if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
                renderList();
                return;
            }
            const node = e.target.closest('.wf-utree-node');
            if (!node || node.classList.contains('disabled')) return;
            setValue(node.getAttribute('data-id'));
            close();
        });
        document.addEventListener('mousedown', e => { if (!container.contains(e.target)) close(); });
        setValue(o.value, true);
        const ctl = {
            getValue: () => value,
            setValue: id => setValue(id, true),
            setDisabled: ids => { disabled = new Set(ids || []); if (disabled.has(value)) setValue('', true); renderList(); },
            setInvalid: on => container.classList.toggle('is-invalid', !!on),
            focus: () => display.focus(),
            open, close
        };
        container.__utree = ctl;
        return ctl;
    }

    // ---------------- Hiển thị dùng chung ----------------
    const STATUS_STYLE = {
        'Chờ phân công': ['#fff7ed', '#c2410c'],
        'Đang phân công': ['#eff6ff', '#1d4ed8'],
        'Chờ tiếp nhận': ['#fef9c3', '#a16207'],
        'Xác minh CQGQBT': ['#e0f2fe', '#0369a1'],
        'Đang thực hiện': ['#e0f2fe', '#0369a1'],
        'Chờ duyệt': ['#ede9fe', '#6d28d9'],
        'Chờ phê duyệt': ['#ede9fe', '#6d28d9'],
        'Chờ thụ lý': ['#fef9c3', '#a16207'],
        'Chờ phát hành văn bản': ['#e0e7ff', '#3730a3'],
        'Cử người giải quyết bồi thường': ['#fef9c3', '#a16207'],
        'Xác minh thiệt hại': ['#e0f2fe', '#0369a1'],
        'Thương lượng': ['#e0f2fe', '#0369a1'],
        'Đang phục hồi danh dự': ['#e0f2fe', '#0369a1'],
        'Chờ ban hành': ['#e0e7ff', '#3730a3'],
        'Đã ban hành': ['#dcfce7', '#15803d'],
        'Không thụ lý': ['#fee2e2', '#991b1b'],
        'Đã chuyển CQGQBT': ['#ccfbf1', '#0f766e'],
        'Đã hủy': ['#f1f5f9', '#475569'],
        'Bị trả lại': ['#fee2e2', '#b91c1c'],
        'Chờ chuyển CQGQBT': ['#ccfbf1', '#0f766e'],
        'Yêu cầu bổ sung': ['#ffedd5', '#c2410c'],
        'Bị từ chối': ['#fee2e2', '#991b1b'],
        'Hoàn thành': ['#dcfce7', '#15803d'],
        'Lưu nháp': ['#f1f5f9', '#475569']
    };
    function statusBadge(status) {
        const s = STATUS_STYLE[status] || ['#f1f5f9', '#475569'];
        return `<span class="badge wf-badge" style="background:${s[0]}; color:${s[1]}; border:1px solid ${s[1]}33; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:600; white-space:nowrap;">${esc(status)}</span>`;
    }
    function routeText(r) {
        if (r.type === 'unit') return `${userName(r.fromUserId)} (${unitName(r.fromUnitId)}) chuyển ${unitName(r.toUnitId)}`;
        return `${userName(r.fromUserId)} (${unitName(r.fromUnitId)}) phân công chủ trì ${userName(r.chuTri)}`;
    }
    function routeStateText(r) {
        if (r.state === 'Đã xử lý') return 'Đã xử lý';
        return r.viewedAt ? `Chưa xử lý - Đã xem lúc ${r.viewedAt}` : 'Chưa xử lý - Chưa xem';
    }
    function renderRoutesHtml(rec) {
        const routes = rec.routes || [];
        if (!routes.length) return `<div style="color:#64748b; font-style:italic;">Chưa có nội dung phân công.</div>`;
        return `<table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead><tr style="background:#f8fafc;"><th style="padding:8px; border:1px solid #e2e8f0; width:44px;">STT</th><th style="padding:8px; border:1px solid #e2e8f0; text-align:left;">Nội dung phân công</th><th style="padding:8px; border:1px solid #e2e8f0; width:140px;">Thời điểm</th><th style="padding:8px; border:1px solid #e2e8f0; width:230px;">Tình trạng</th></tr></thead>
            <tbody>${routes.map((r, i) => `<tr><td style="padding:8px; border:1px solid #e2e8f0; text-align:center;">${i + 1}</td><td style="padding:8px; border:1px solid #e2e8f0;">${esc(routeText(r))}${r.note ? `<div style="color:#64748b; margin-top:2px;">Ý kiến chỉ đạo: ${esc(r.note)}</div>` : ''}</td><td style="padding:8px; border:1px solid #e2e8f0; text-align:center;">${esc(r.at)}</td><td style="padding:8px; border:1px solid #e2e8f0;">${esc(routeStateText(r))}</td></tr>`).join('')}</tbody></table>`;
    }
    function renderHistoryHtml(rec) {
        const h = (rec.history || []).slice().reverse();
        if (!h.length) return `<div style="color:#64748b; font-style:italic;">Chưa có lịch sử xử lý.</div>`;
        return `<div style="display:flex; flex-direction:column; gap:10px;">${h.map(x => `
            <div style="border-left:3px solid ${/Từ chối/.test(x.action) ? '#dc2626' : '#2563eb'}; padding:6px 12px; background:#f8fafc; border-radius:0 6px 6px 0;">
                <div style="font-weight:600; color:#0f172a;">${esc(x.action)} <span style="font-weight:400; color:#64748b;">- ${esc(x.userName)} - ${esc(x.at)}</span></div>
                ${x.note ? `<div style="color:#334155; margin-top:2px;">${esc(x.note)}</div>` : ''}
            </div>`).join('')}</div>`;
    }
    function renderApprovalHtml(rec) {
        const a = rec.approval;
        if (!a) return `<div style="color:#64748b; font-style:italic;">Chưa trình phê duyệt.</div>`;
        return renderDraftDocHtml(rec) + renderApprovalTableHtml(rec);
    }

    // ---------------- Văn bản dự thảo: Mẫu số 08/BTNN (xem ở tab mới, tải về Word/PDF) ----------------
    function draftDocName(rec) { return `Thong_bao_yeu_cau_bo_sung_${rec.code}.doc`; }
    function draftBaseName(rec) { return `Thong_bao_yeu_cau_bo_sung_${rec.code}`; }
    function submittedDraftName(rec) {
        const d = rec.approval && rec.approval.draftDoc;
        return d ? (d.source === 'uploaded' ? d.uploadedName : (d.uploadedName && !d.source ? d.uploadedName : d.generatedName)) : '';
    }
    // Cơ quan chủ quản (nếu có) của cơ quan ban hành thông báo
    const GOVERNING_BODY = { 'STP-HN': 'UBND THÀNH PHỐ HÀ NỘI', 'STP-HCM': 'UBND THÀNH PHỐ HỒ CHÍ MINH', 'STP-HP': 'UBND THÀNH PHỐ HẢI PHÒNG' };
    function issuerAbbr(unitId) {
        if (/^BTP/.test(unitId || '')) return 'BTP';
        if (/^STP/.test(unitId || '')) return 'STP';
        const words = unitName(unitId).split(/[\s,]+/).filter(w => /^[A-ZĐÀ-Ỹ]/.test(w));
        return words.map(w => w[0]).join('').slice(0, 6) || '...';
    }
    function placeOf(unitId) {
        const m = unitName(unitId).match(/(Thành phố|tỉnh|Tỉnh)\s+([^,]+)$/);
        return m ? m[2].trim() : 'Hà Nội';
    }
    function dateParts(text) {
        const m = String(text || '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
        return m ? { d: m[1], m: m[2], y: m[3] } : null;
    }
    // Nội dung Thông báo theo Mẫu số 08/BTNN
    function buildSupplementDraftHtml(rec, content, attachments) {
        const now = new Date();
        const root = rec.rootUnitId;
        const issuer = unitName(root);
        const governing = GOVERNING_BODY[root] || '';
        const recv = dateParts(rec.receivedAt || rec.date);
        const rawLines = String(content || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
        const items = rawLines.map(s => s.replace(/^(\d+[.)]|-|\+)\s*/, '').trim()).filter(Boolean);
        const address = [rec.nycAddressDetail, rec.nycPhuongXa, rec.nycTinhThanh].filter(Boolean).join(', ');
        
        let contentHtml = '';
        if (items.length > 1) {
            contentHtml = items.map((it, i) => `<p style="margin:4pt 0; text-indent:1cm; text-align:justify;">${i + 1}. ${esc(it)}</p>`).join('');
        } else if (items.length === 1) {
            contentHtml = `<p style="margin:4pt 0; text-indent:1cm; text-align:justify;">${esc(items[0])}</p>`;
        } else {
            contentHtml = `<p style="margin:4pt 0; text-indent:1cm; font-style:italic; color:#666;">................................................</p>`;
        }

        return `<div class="m08" style="font-family:'Times New Roman',serif; font-size:14pt; line-height:1.5; color:#000;">
            <div style="text-align:right; font-style:italic;">Mẫu số 08/BTNN</div>
            <table style="width:100%; border-collapse:collapse; margin-top:6pt;"><tr>
                <td style="width:40%; text-align:center; vertical-align:top; font-size:13pt;">
                    ${governing ? `${esc(governing)}<br>` : ''}<b>${esc(issuer.toUpperCase())}</b><br><span style="display:inline-block; width:35%; border-top:1px solid #000;"></span><br>Số: ......./TB-${esc(issuerAbbr(root))}
                </td>
                <td style="text-align:center; vertical-align:top; font-size:13pt;">
                    <b style="white-space:nowrap;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><br><span style="display:inline-block; width:45%; border-top:1px solid #000;"></span><br>
                    <i>${esc(placeOf(root))}, ngày ${pad(now.getDate())} tháng ${pad(now.getMonth() + 1)} năm ${now.getFullYear()}</i>
                </td>
            </tr></table>
            <p style="text-align:center; margin:18pt 0 6pt;"><b>THÔNG BÁO</b><br><b>Về việc cung cấp tài liệu, chứng cứ phục vụ xác minh thiệt hại</b></p>
            <p style="margin:6pt 0;">Kính gửi: ${esc(rec.nycName || '')}</p>
            <p style="margin:6pt 0;">Địa chỉ: ${esc(address)}</p>
            <p style="margin:6pt 0;">Điện thoại: ${esc(rec.nycPhone || '')}</p>
            <p style="margin:6pt 0; text-align:justify; text-indent:1cm;">Ngày ${recv ? recv.d : '....'} tháng ${recv ? recv.m : '....'} năm ${recv ? recv.y : '......'}, ${esc(issuer)} đã nhận được hồ sơ yêu cầu bồi thường của Ông/Bà.</p>
            <p style="margin:6pt 0; text-align:justify; text-indent:1cm;">${esc(issuer)} đã tiến hành xem xét hồ sơ yêu cầu bồi thường và xác minh thiệt hại. Trong quá trình xác minh thiệt hại, chúng tôi nhận thấy vụ việc yêu cầu bồi thường của Ông/bà cần phải một số tài liệu, chứng cứ làm cơ sở để xác minh thiệt hại.</p>
            <p style="margin:6pt 0; text-align:justify; text-indent:1cm;">Căn cứ quy định tại khoản 1 Điều 45 Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16), ${esc(issuer)} yêu cầu Ông/Bà bổ sung tài liệu chứng cứ phục vụ xác minh thiệt hại, cụ thể như sau:</p>
            ${contentHtml}
            <table style="width:100%; border-collapse:collapse; margin-top:18pt;"><tr>
                <td style="width:50%; vertical-align:top; font-size:12pt;"><b><i>Nơi nhận:</i></b><br>- Như trên;<br>- Lưu: VT, HSVV.</td>
                <td style="text-align:center; vertical-align:top;"><b>THỦ TRƯỞNG CƠ QUAN</b><br><i>(Ký, ghi rõ họ tên, đóng dấu)</i></td>
            </tr></table>
        </div>`;
    }
    // Phần đầu văn bản hành chính: cơ quan chủ quản, tên cơ quan, số ký hiệu, quốc hiệu, địa danh ngày tháng
    // opts (tùy chọn): { soKyHieu: Số, ký hiệu văn bản; ngay: Ngày văn bản dd/mm/yyyy } nhập tại popup trình
    function docHeaderHtml(unitId, formNo, docType, opts) {
        opts = opts || {};
        const now = new Date();
        const root = getRootId(unitId) || unitId;
        const governing = GOVERNING_BODY[root] || '';
        const dm = String(opts.ngay || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        const dateTxt = dm ? `ngày ${pad(dm[1])} tháng ${pad(dm[2])} năm ${dm[3]}` : `ngày ${pad(now.getDate())} tháng ${pad(now.getMonth() + 1)} năm ${now.getFullYear()}`;
        const soTxt = opts.soKyHieu ? esc(opts.soKyHieu) : `......./${esc(docType || 'TB')}-${esc(issuerAbbr(root))}`;
        return `${formNo ? `<div style="text-align:right; font-style:italic;">${esc(formNo)}</div>` : ''}
            <table style="width:100%; border-collapse:collapse; margin-top:6pt;"><tr>
                <td style="width:40%; text-align:center; vertical-align:top; font-size:13pt;">${governing ? `${esc(governing)}<br>` : ''}<b>${esc(unitName(root).toUpperCase())}</b><br><span style="display:inline-block; width:35%; border-top:1px solid #000;"></span><br>Số: ${soTxt}</td>
                <td style="text-align:center; vertical-align:top; font-size:13pt;"><b style="white-space:nowrap;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><br><span style="display:inline-block; width:45%; border-top:1px solid #000;"></span><br><i>${esc(placeOf(root))}, ${dateTxt}</i></td>
            </tr></table>`;
    }
    function docPageHtml(bodyHtml, baseName, withToolbar) {
        const toolbar = withToolbar ? `<div class="toolbar"><b style="margin-right:auto;">Văn bản dự thảo - ${esc(baseName)}</b><button onclick="dlWord()">Tải file (Word .doc)</button><button onclick="window.print()">In</button></div>
            <script>function dlWord(){var h='<html><head><meta charset="utf-8"></head><body>'+document.getElementById('doc').innerHTML+'</body></html>';var b=new Blob(['\\ufeff',h],{type:'application/msword'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=${JSON.stringify(baseName + '.doc')};document.body.appendChild(a);a.click();a.remove();}<\/script>` : '';
        return `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>${esc(baseName)}</title>
            <style>body{margin:0;background:#e5e7eb;font-family:system-ui,sans-serif}.toolbar{position:sticky;top:0;display:flex;gap:8px;align-items:center;padding:10px 20px;background:#1e3a8a;color:#fff}.toolbar button{border:0;border-radius:6px;padding:7px 12px;font-weight:600;cursor:pointer}.page{background:#fff;width:210mm;min-height:297mm;margin:20px auto;padding:20mm 20mm 20mm 30mm;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.15)}.page>div{font-family:'Times New Roman',serif;font-size:14pt;line-height:1.5;color:#000}@media print{.toolbar{display:none}body{background:#fff}.page{margin:0;box-shadow:none;width:auto;min-height:0}}</style>
            </head><body>${toolbar}<div class="page" id="doc"><div>${bodyHtml}</div></div></body></html>`;
    }
    // Xem văn bản trong popup ngay trên trang (trang A4): Tải file Word / In / Mở tab mới / Đóng
    function openDocTab(bodyHtml, baseName) {
        const old = document.getElementById('btnnDocViewer'); if (old) old.remove();
        const ov = document.createElement('div');
        ov.id = 'btnnDocViewer';
        ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:10100;display:flex;align-items:center;justify-content:center;padding:16px;';
        const btn = 'border:0;border-radius:6px;padding:7px 12px;font-weight:600;cursor:pointer;font-size:13px;';
        ov.innerHTML = `<div style="background:#fff;border-radius:10px;width:min(1000px,100%);height:min(92vh,100%);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.3);">
            <div style="display:flex;align-items:center;gap:8px;padding:10px 16px;background:#1e3a8a;color:#fff;font-family:system-ui,sans-serif;">
                <b style="margin-right:auto;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Xem văn bản - ${esc(baseName)}</b>
                <button type="button" data-act="word" style="${btn}">Tải file (Word .doc)</button>
                <button type="button" data-act="print" style="${btn}">In</button>
                <button type="button" data-act="tab" style="${btn}">Mở tab mới</button>
                <button type="button" data-act="close" style="${btn}background:#dc2626;color:#fff;">Đóng</button>
            </div>
            <iframe title="Văn bản" style="flex:1;border:0;width:100%;background:#e5e7eb;"></iframe>
        </div>`;
        document.body.appendChild(ov);
        const fr = ov.querySelector('iframe');
        fr.srcdoc = docPageHtml(bodyHtml, baseName, false);
        const close = () => { ov.remove(); document.removeEventListener('keydown', onKey); };
        const onKey = e => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', onKey);
        ov.addEventListener('click', e => {
            if (e.target === ov) { close(); return; }
            const act = e.target.getAttribute && e.target.getAttribute('data-act');
            if (act === 'close') close();
            else if (act === 'word') downloadDocWord(bodyHtml, baseName);
            else if (act === 'print') { try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (err) { } }
            else if (act === 'tab') openDocWindow(bodyHtml, baseName);
        });
    }
    // Mở văn bản ở tab mới (trang A4)
    function openDocWindow(bodyHtml, baseName) {
        const win = window.open('', '_blank');
        if (!win) { alert('Trình duyệt đang chặn mở tab mới. Vui lòng cho phép cửa sổ bật lên.'); return; }
        win.document.open();
        win.document.write(docPageHtml(bodyHtml, baseName, true));
        win.document.close();
    }
    // Tải file Word (.doc)
    function downloadDocWord(bodyHtml, baseName) {
        const html = `<html><head><meta charset="utf-8"><title>${esc(baseName)}</title></head><body style="font-family:'Times New Roman',serif; font-size:14pt;">${bodyHtml}</body></html>`;
        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = baseName + '.doc';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    }
    function draftSourceOf(rec) {
        const a = rec.approval || {};
        return { content: a.content || rec.supplementReason || '', attachments: rec.supplementFiles || [] };
    }
    function draftFullHtml(rec, content, attachments, withToolbar) {
        const body = buildSupplementDraftHtml(rec, content, attachments);
        const toolbar = withToolbar ? `<div class="toolbar">
                <b style="margin-right:auto;">Văn bản dự thảo - ${esc(draftBaseName(rec))}</b>
                <button onclick="dlWord()">Tải về Word (.doc)</button>
                <button onclick="dlPdf()">Tải về PDF (.pdf)</button>
                <button onclick="window.print()">In</button>
            </div>
            <script>
                function dlWord(){var h='<html><head><meta charset="utf-8"></head><body>'+document.getElementById('doc').innerHTML+'</body></html>';var b=new Blob(['\\ufeff',h],{type:'application/msword'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=${JSON.stringify(draftBaseName(rec) + '.doc')};document.body.appendChild(a);a.click();a.remove();}
                function dlPdf(){var go=function(){html2pdf().set({margin:[15,20,15,20],filename:${JSON.stringify(draftBaseName(rec) + '.pdf')},html2canvas:{scale:2},jsPDF:{unit:'mm',format:'a4'}}).from(document.getElementById('doc')).save();};if(window.html2pdf){go();return;}var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';s.onload=go;s.onerror=function(){alert('Không tải được thư viện PDF, vui lòng dùng In > Lưu dưới dạng PDF.');window.print();};document.head.appendChild(s);}
            <\/script>` : '';
        return `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>${esc(draftBaseName(rec))}</title>
            <style>body{margin:0;background:#e5e7eb;font-family:system-ui,sans-serif}.toolbar{position:sticky;top:0;display:flex;gap:8px;align-items:center;padding:10px 20px;background:#1e3a8a;color:#fff}.toolbar button{border:0;border-radius:6px;padding:7px 12px;font-weight:600;cursor:pointer}.page{background:#fff;width:210mm;min-height:297mm;margin:20px auto;padding:20mm 20mm 20mm 30mm;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.15)}@media print{.toolbar{display:none}body{background:#fff}.page{margin:0;box-shadow:none;width:auto;min-height:0}}</style>
            </head><body>${toolbar}<div class="page" id="doc">${body}</div></body></html>`;
    }
    // Xem dự thảo: mở ở tab mới
    function previewDraftDoc(rec, content, attachments) {
        const win = window.open('', '_blank');
        if (!win) { alert('Trình duyệt đang chặn mở tab mới. Vui lòng cho phép cửa sổ bật lên.'); return; }
        win.document.open();
        win.document.write(draftFullHtml(rec, content, attachments, true));
        win.document.close();
    }
    // Tải về theo định dạng: 'word' (.doc) hoặc 'pdf' (.pdf)
    function downloadDraftDoc(rec, content, attachments, format) {
        if (format === 'pdf') {
            const holder = document.createElement('div');
            holder.style.cssText = 'position:fixed; left:-10000px; top:0; width:170mm; background:#fff;';
            holder.innerHTML = buildSupplementDraftHtml(rec, content, attachments);
            document.body.appendChild(holder);
            const go = () => window.html2pdf().set({ margin: [15, 20, 15, 30], filename: draftBaseName(rec) + '.pdf', html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4' } }).from(holder).save().then(() => holder.remove(), () => holder.remove());
            if (window.html2pdf) { go(); return; }
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            s.onload = go;
            s.onerror = () => { holder.remove(); alert('Không tải được thư viện PDF. Vui lòng mở Xem dự thảo và chọn In > Lưu dưới dạng PDF.'); };
            document.head.appendChild(s);
            return;
        }
        const html = `<html><head><meta charset="utf-8"><title>${esc(draftBaseName(rec))}</title></head><body>${buildSupplementDraftHtml(rec, content, attachments)}</body></html>`;
        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = draftBaseName(rec) + '.doc';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    }
    // Ô chọn định dạng tải về (Word / PDF)
    function downloadSelectHtml(jsCall) {
        return `<select class="form-control" style="display:inline-block; width:auto; min-width:150px; height:32px; padding:4px 8px; font-size:12.5px;" onchange="if(this.value){${jsCall}(this.value); this.value='';}">
            <option value="">Tải về...</option><option value="word">Word (.doc)</option><option value="pdf">PDF (.pdf)</option></select>`;
    }
    function previewDraftDocByCode(code) { const r = getRecord(code); if (r) { const s = draftSourceOf(r); previewDraftDoc(r, s.content, s.attachments); } }
    function downloadDraftDocByCode(code, format) { const r = getRecord(code); if (r) { const s = draftSourceOf(r); downloadDraftDoc(r, s.content, s.attachments, format); } }
    // Khối Văn bản dự thảo phía Lãnh đạo / màn chi tiết
    // draftDoc: { source:'generated'|'uploaded', generatedName, uploadedName, formNo (VD 'Mẫu số 04/BTNN'), bodyHtml (bản sinh tại thời điểm trình) }
    function previewSubmittedDraft(code) {
        const r = getRecord(code); const d = r && r.approval && r.approval.draftDoc; if (!d) return;
        if (d.bodyHtml) openDocTab(d.bodyHtml, (d.generatedName || 'Van_ban_du_thao').replace(/\.docx?$/i, ''));
        else previewDraftDocByCode(code);
    }
    function downloadSubmittedDraft(code) {
        const r = getRecord(code); const d = r && r.approval && r.approval.draftDoc; if (!d) return;
        if (d.bodyHtml) downloadDocWord(d.bodyHtml, (d.generatedName || 'Van_ban_du_thao').replace(/\.docx?$/i, ''));
        else downloadDraftDocByCode(code, 'word');
    }
    // Văn bản trình ký của hồ sơ Xác định CQGQBT (Kết quả xác định CQGQBT / Yêu cầu bổ sung / Không thụ lý)
    function renderSignDocHtml(rec) {
        const a = rec && rec.approval;
        const sd = a && a.signDoc;
        if (!sd) return '';
        const isOnline = sd.method !== 'Ký ngoài';
        const row = (k, v) => `<div style="display:flex; gap:8px; margin-top:4px;"><span style="color:#64748b; min-width:170px;">${esc(k)}:</span><span>${v}</span></div>`;
        const reasonLabel = a.kind === 'Yêu cầu bổ sung' ? 'Nội dung yêu cầu bổ sung' : a.kind === 'Không thụ lý' ? 'Lý do không thụ lý' : '';
        const box = sd.sigBox ? `X: ${sd.sigBox.x}, Y: ${sd.sigBox.y} - Cỡ: ${sd.sigBox.w} x ${sd.sigBox.h} px` : '--';
        const lastUnit = a.path && a.path.length ? unitName(a.path[a.path.length - 1]) : '--';
        return `<div style="border:2px solid #2563eb; background:#eff6ff; border-radius:8px; padding:12px 14px; margin-bottom:10px; font-size:13px;">
            <div style="font-weight:700; color:#1e3a8a; margin-bottom:6px;"><i class="fa-solid fa-file-signature"></i> Văn bản trình ký</div>
            <div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; background:#fff; border:1px solid #bfdbfe; border-radius:6px; padding:8px 10px;">
                <i class="fa-solid fa-file-pdf" style="color:#ef4444; font-size:18px;"></i> <b>${esc(sd.file || '--')}</b>
                <span style="background:${isOnline ? '#dcfce7; color:#15803d' : '#fef3c7; color:#92400e'}; border-radius:999px; padding:1px 8px; font-size:11.5px; font-weight:600;">${isOnline ? 'Ký số trên hệ thống' : 'Ký ngoài'}</span>
            </div>
            ${reasonLabel && a.reason ? row(reasonLabel, esc(a.reason)) : ''}
            ${isOnline ? row('Vị trí chữ ký cấp cuối', `${esc(lastUnit)} - ${esc(box)}`) : ''}
            ${sd.signedFile ? row('Văn bản đã ký', `<b style="color:#15803d;"><i class="fa-solid fa-circle-check"></i> ${esc(sd.signedFile)}</b> - ${esc(userName(sd.signedBy))} - ${esc(sd.signedAt || '')}`) : ''}
        </div>`;
    }
    function renderDraftDocHtml(rec) {
        const d = rec.approval && rec.approval.draftDoc;
        if (!d) return renderSignDocHtml(rec);
        const code = esc(rec.code);
        const isUploaded = d.source === 'uploaded' || (!d.source && d.uploadedName);
        const submitted = isUploaded ? d.uploadedName : d.generatedName;
        const formNo = d.formNo || 'Mẫu số 08/BTNN';
        const link = (label, js) => `<a href="javascript:void(0)" onclick="${js}" style="color:#2563eb; text-decoration:none; margin-left:12px; white-space:nowrap;">${label}</a>`;
        return `<div style="border:2px solid #2563eb; background:#eff6ff; border-radius:8px; padding:12px 14px; margin-bottom:10px; font-size:13px;">
            <div style="font-weight:700; color:#1e3a8a; margin-bottom:8px;"><i class="fa-solid fa-file-signature"></i> Văn bản dự thảo trình Lãnh đạo</div>
            <div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; background:#fff; border:1px solid #bfdbfe; border-radius:6px; padding:8px 10px;">
                <i class="fa-solid fa-file-word" style="color:#2563eb; font-size:18px;"></i> <b>${esc(submitted)}</b>
                <span style="background:${isUploaded ? '#dcfce7; color:#15803d' : '#e0e7ff; color:#3730a3'}; border-radius:999px; padding:1px 8px; font-size:11.5px; font-weight:600;">${isUploaded ? 'Tệp đính kèm' : 'Hệ thống sinh theo ' + esc(formNo)}</span>
                ${isUploaded ? `<span style="margin-left:12px; color:#64748b;">(Giả lập: tệp đính kèm khi trình)</span>` : link('<i class="fa-solid fa-up-right-from-square"></i> Xem dự thảo', `BTNN_WF.previewSubmittedDraft('${code}')`) + link('<i class="fa-solid fa-download"></i> Tải file', `BTNN_WF.downloadSubmittedDraft('${code}')`)}
            </div>
        </div>`;
    }
    function renderApprovalTableHtml(rec) {
        const a = rec.approval;
        const rows = a.path.map((u, i) => {
            const step = a.steps[i];
            let state = 'Chưa đến lượt';
            if (step) state = `${step.action} - ${userName(step.userId)} - ${step.at}${step.note ? ' (' + step.note + ')' : ''}`;
            else if (i === a.level && rec.status === STATUS.CHO_PHE_DUYET) state = a.pending && a.pending.viewedAt ? `Đang chờ phê duyệt - Đã xem lúc ${a.pending.viewedAt}` : 'Đang chờ phê duyệt';
            const assigned = (a.assignees || [])[i];
            if (assigned && !step) state += ` (Giao: ${userName(assigned)})`;
            return `<tr><td style="padding:8px; border:1px solid #e2e8f0; text-align:center;">${i + 1}</td><td style="padding:8px; border:1px solid #e2e8f0;">${esc(unitName(u))}</td><td style="padding:8px; border:1px solid #e2e8f0;">${esc(getLeaders(u).map(userName).join(', ') || '--')}</td><td style="padding:8px; border:1px solid #e2e8f0;">${esc(state)}</td></tr>`;
        }).join('');
        return `<div style="margin-bottom:8px; font-size:13px;"><strong>Nội dung trình:</strong> ${esc(a.kind)} - ${esc(userName(a.submittedBy))} - ${esc(a.submittedAt)}${a.content ? `<div style="color:#334155; margin-top:2px;">${esc(a.content)}</div>` : ''}</div>
            <table style="width:100%; border-collapse:collapse; font-size:13px;"><thead><tr style="background:#f8fafc;"><th style="padding:8px; border:1px solid #e2e8f0; width:44px;">Cấp</th><th style="padding:8px; border:1px solid #e2e8f0; text-align:left;">Đơn vị phê duyệt</th><th style="padding:8px; border:1px solid #e2e8f0; text-align:left;">Nhóm lãnh đạo</th><th style="padding:8px; border:1px solid #e2e8f0; text-align:left;">Kết quả</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // Thanh chọn người dùng giả lập (chỉ phục vụ demo phân quyền theo đơn vị)
    function mountUserSwitcher(options) {
        options = options || {};
        if (document.getElementById('wfUserSwitcher')) return;
        const box = document.createElement('div');
        box.id = 'wfUserSwitcher';
        box.style.cssText = 'position:fixed; top:8px; right:12px; z-index:9000; background:#fff; border:1px solid #cbd5e1; border-radius:999px; padding:4px 6px 4px 12px; box-shadow:0 2px 8px rgba(15,23,42,0.12); font:500 12px Inter, system-ui, sans-serif; color:#334155; display:flex; align-items:center; gap:8px;';
        const cur = getCurrentUserId();
        const groups = getRootUnits().map(root => {
            const users = usersInUnitTree(root.id);
            if (!users.length) return '';
            return `<optgroup label="${esc(root.name)}">${users.map(u => `<option value="${esc(u.id)}" ${u.id === cur ? 'selected' : ''}>${esc(u.name)} - ${esc(u.title)}</option>`).join('')}</optgroup>`;
        }).join('');
        box.innerHTML = `<i class="fa-solid fa-user-gear" style="color:#2563eb;"></i><span>Người dùng giả lập:</span><select style="border:1px solid #e2e8f0; border-radius:999px; padding:4px 8px; font:inherit; max-width:260px;">${groups}</select>`;
        box.querySelector('select').addEventListener('change', function () {
            setCurrentUser(this.value);
            if (typeof options.onChange === 'function') options.onChange(this.value); else location.reload();
        });
        document.body.appendChild(box);
    }

    // ---------------- Dữ liệu giả lập ban đầu ----------------
    function ensureSeed() {
        let version = null;
        try { version = localStorage.getItem(KEY_SEED); } catch (e) { version = null; }
        const existing = readJson(KEY_RECORDS, null);
        if (version === SEED_VERSION && existing && existing.length) { ensureThuLySeed(); ensurePhongSeed(); ensureToChucSeed(); return; }
        const seed = buildSeed();
        if (!existing || !existing.length || version !== SEED_VERSION) {
            writeJson(KEY_RECORDS, seed);
        } else {
            const existingMap = new Map();
            existing.forEach(r => existingMap.set(r.code, r));
            const merged = [];
            seed.forEach(s => {
                if (existingMap.has(s.code)) {
                    merged.push(existingMap.get(s.code));
                    existingMap.delete(s.code);
                } else {
                    merged.push(s);
                }
            });
            existingMap.forEach(r => merged.push(r));
            writeJson(KEY_RECORDS, merged);
        }
        try { localStorage.setItem(KEY_SEED, SEED_VERSION); } catch (e) { /* bỏ qua */ }
        ensureThuLySeed();
        ensurePhongSeed();
        ensureToChucSeed();
    }
    // Dữ liệu mẫu hồ sơ có Loại người yêu cầu = Tổ chức, chờ Lãnh đạo Phòng Quản lý nghiệp vụ về BTNN (tpbt) phân công cán bộ:
    // - VVBT-2026-161: Tư cách TCNYC_03 (Tổ chức kế thừa...), khối Tổ chức bị thiệt hại đã chấm dứt tồn tại
    // - VVBT-2026-162: Tư cách TCNYC_05 (pháp nhân được ủy quyền), người bị thiệt hại là cá nhân
    // Bổ sung theo mã hồ sơ, không ghi đè hồ sơ đã có
    const KEY_SEED_TO_CHUC = 'btnn_wf_seed_tochuc_v1';
    function ensureToChucSeed() {
        try { if (localStorage.getItem(KEY_SEED_TO_CHUC)) return; } catch (e) { return; }
        const list = readJson(KEY_RECORDS, []);
        const h = (action, userId, at, note) => ({ at, userId, userName: userName(userId), action, note: note || '' });
        const routes = (d1, d2) => ([
            { id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: 'Giao Cục xem xét, xử lý.', at: d1, state: 'Đã xử lý' },
            { id: 'R2', type: 'unit', fromUnitId: 'CĐK-01', fromUserId: 'cuctruong', toUnitId: 'PLN-02', note: 'Giao Phòng phân công cán bộ xử lý.', at: d2, state: 'Chưa xử lý' }
        ]);
        const hist = (at0, d1, d2) => [
            h('Tiếp nhận hồ sơ', 'canbonv', at0, 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.'),
            h('Chuyển đơn vị', 'oanhdh', d1, 'Chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước phân công.'),
            h('Chuyển đơn vị', 'cuctruong', d2, 'Chuyển Phòng Quản lý nghiệp vụ về bồi thường nhà nước phân công.')
        ];
        const org = (code, extra) => Object.assign({
            id: 'WF-' + code, code, maVuViec: code, status: STATUS.DANG_PHAN_CONG, chuTri: null, approval: null,
            nguonHoSo: SOURCES.TIEP_NHAN, source: 'Tiếp nhận', hinhThucTiepNhan: RECEIVE_METHODS.TRUC_TIEP,
            rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', createdBy: 'canbonv', receivedBy: userName('canbonv'),
            nycType: NYC_TYPES.TO_CHUC, nycDob: '', nycDocType: '', nycDocNo: '', nycDocDate: '', nycDocPlace: '',
            nycCountry: 'Việt Nam', hinhThucNhan: 'Phương thức điện tử', vanBanCanCu: [],
            attachedDocs: [{ name: 'Đơn yêu cầu bồi thường', file: `Don_yeu_cau_${code}.pdf` }]
        }, extra);
        const seeds = [
            org('VVBT-2026-161', {
                module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT,
                nycRole: DEFAULT_NYC_ROLES[3].name,
                nycName: 'Công ty Cổ phần Đầu tư Thương mại Hưng Thịnh', nycOrgCode: '0109876543',
                nycOrgDocNo: '', nycOrgDocDate: '', nycOrgDocPlace: '',
                nycRepName: 'Nguyễn Hữu Thắng', nycRepPosition: 'Tổng Giám đốc',
                nycPhone: '0243456789', nycEmail: 'phaply@hungthinh.com.vn',
                nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00007 - Phường Cầu Giấy', nycAddressDetail: 'Tầng 8, số 25 Duy Tân',
                nbth: null, nbthOrgName: 'Công ty TNHH Xây dựng Hưng Phát (đã sáp nhập)', nbthOrgCode: '0101234567',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Thu hồi giấy phép khai thác khoáng sản của tổ chức bị thiệt hại trái pháp luật trước khi sáp nhập.',
                date: '17/10/2026', receivedAt: '09:00 17/10/2026', routes: routes('14:00 17/10/2026', '08:30 18/10/2026'),
                history: hist('09:00 17/10/2026', '14:00 17/10/2026', '08:30 18/10/2026')
            }),
            org('VVBT-2026-162', {
                module: 'XD', loaiYeuCau: REQUEST_TYPE_XD,
                nycRole: DEFAULT_NYC_ROLES[5].name,
                nycName: 'Công ty Luật TNHH Minh Chính', nycOrgCode: '0108765432',
                nycOrgDocNo: '', nycOrgDocDate: '', nycOrgDocPlace: '',
                nycRepName: 'Trần Minh Chính', nycRepPosition: 'Giám đốc',
                nycPhone: '0247778899', nycEmail: '',
                nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00004 - Phường Hoàn Kiếm', nycAddressDetail: 'Số 12 Lý Thường Kiệt',
                nbth: { name: 'Đỗ Văn Khải', dob: '02/03/1968', docType: 'CCCD', docNo: '001068004321', docDate: '', docPlace: '', phone: '', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00010 - Phường Thanh Xuân', address: 'Số 30 Nguyễn Tuân' },
                linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', hanhVi: 'Đề nghị xác định cơ quan giải quyết bồi thường đối với việc tạm giam oan người bị thiệt hại.',
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_VVBT-2026-162.pdf' }, { name: 'Văn bản ủy quyền', file: 'Van_ban_uy_quyen_VVBT-2026-162.pdf' }],
                date: '18/10/2026', receivedAt: '08:15 18/10/2026', routes: routes('10:00 18/10/2026', '15:00 18/10/2026'),
                history: hist('08:15 18/10/2026', '10:00 18/10/2026', '15:00 18/10/2026')
            })
        ];
        const codes = new Set(list.map(r => r.code));
        seeds.forEach(s => { if (!codes.has(s.code)) list.unshift(s); });
        writeJson(KEY_RECORDS, list);
        try { localStorage.setItem(KEY_SEED_TO_CHUC, '1'); } catch (e) { /* bỏ qua */ }
    }
    // Dữ liệu mẫu hồ sơ YCBT "Cử người giải quyết bồi thường" (chờ Thủ trưởng cơ quan giải quyết bồi thường cử người (vai trò Lãnh đạo đơn vị)):
    // bổ sung theo mã hồ sơ, không ghi đè hồ sơ đã có
    // Dữ liệu mẫu hồ sơ "Đang phân công" chờ Lãnh đạo Phòng phân công cán bộ:
    // Bộ Tư pháp → Cục → Phòng Quản lý nghiệp vụ về BTNN (tpbt); Sở Tư pháp Hà Nội → Phòng Hành chính tư pháp (tp_hctp_hn)
    // Bổ sung theo mã hồ sơ, không ghi đè hồ sơ đã có
    const KEY_SEED_PHONG = 'btnn_wf_seed_phong_v1';
    function ensurePhongSeed() {
        try { if (localStorage.getItem(KEY_SEED_PHONG)) return; } catch (e) { return; }
        const list = readJson(KEY_RECORDS, []);
        const h = (action, userId, at, note) => ({ at, userId, userName: userId ? userName(userId) : 'Hệ thống', action, note: note || '' });
        const routeBtp = (d1, d2, note) => ([
            { id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: note || 'Giao Cục xem xét, xử lý.', at: d1, state: 'Đã xử lý' },
            { id: 'R2', type: 'unit', fromUnitId: 'CĐK-01', fromUserId: 'cuctruong', toUnitId: 'PLN-02', note: 'Giao Phòng phân công cán bộ xử lý.', at: d2, state: 'Chưa xử lý' }
        ]);
        const routeStp = (d1) => ([
            { id: 'R1', type: 'unit', fromUnitId: 'STP-HN', fromUserId: 'gdso_hn', toUnitId: 'STP-HN-HCTP', note: 'Giao Phòng Hành chính tư pháp phân công cán bộ xử lý.', at: d1, state: 'Chưa xử lý' }
        ]);
        const base = (code, extra) => Object.assign({
            id: 'WF-' + code, code, maVuViec: code, status: STATUS.DANG_PHAN_CONG, chuTri: null, approval: null,
            nycRole: 'Người bị thiệt hại', nycCountry: 'Việt Nam', hinhThucNhan: 'Phương thức điện tử', vanBanCanCu: [],
            attachedDocs: [{ name: 'Đơn yêu cầu bồi thường', file: `Don_yeu_cau_${code}.pdf` }]
        }, extra);
        const seeds = [
            base('VVBT-2026-141', {
                module: 'XD', loaiYeuCau: REQUEST_TYPE_XD, nguonHoSo: SOURCES.TIEP_NHAN, hinhThucTiepNhan: RECEIVE_METHODS.TRUC_TIEP,
                rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', createdBy: 'canbonv', receivedBy: userName('canbonv'),
                nycName: 'Trịnh Văn Hưng', nycPhone: '0912456781', nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: 'Phường Kim Liên', nycAddressDetail: 'Số 15 ngõ 4 Phương Mai',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Đề nghị xác định cơ quan giải quyết bồi thường đối với quyết định thu hồi đất đã bị hủy.',
                date: '13/10/2026', receivedAt: '09:10 13/10/2026', routes: routeBtp('14:00 13/10/2026', '09:30 14/10/2026'),
                history: [h('Tiếp nhận hồ sơ', 'canbonv', '09:10 13/10/2026', 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.'), h('Chuyển đơn vị', 'oanhdh', '14:00 13/10/2026', 'Chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước phân công.'), h('Chuyển đơn vị', 'cuctruong', '09:30 14/10/2026', 'Chuyển Phòng Quản lý nghiệp vụ về bồi thường nhà nước phân công.')]
            }),
            base('VVBT-2026-142', {
                module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo: SOURCES.DVC, hinhThucTiepNhan: RECEIVE_METHODS.MOI_TRUONG_SO,
                rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', receivedBy: userName('oanhdh'),
                nycName: 'Lê Thị Bích Ngọc', nycPhone: '0983215647', nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: 'Phường Láng', nycAddressDetail: 'Số 8 phố Chùa Láng',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Yêu cầu bồi thường thiệt hại do quyết định xử phạt vi phạm hành chính trái pháp luật.',
                date: '15/10/2026', receivedAt: '08:20 15/10/2026', routes: routeBtp('10:00 15/10/2026', '15:15 15/10/2026'),
                history: [h('Nhận hồ sơ từ Dịch vụ công quốc gia', '', '08:20 15/10/2026', 'Hồ sơ gửi từ Dịch vụ công quốc gia. Chờ lãnh đạo Bộ Tư pháp phân công.'), h('Chuyển đơn vị', 'oanhdh', '10:00 15/10/2026', 'Chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước phân công.'), h('Chuyển đơn vị', 'cuctruong', '15:15 15/10/2026', 'Chuyển Phòng Quản lý nghiệp vụ về bồi thường nhà nước phân công.')]
            }),
            base('VVBT-2026-143', {
                module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo: SOURCES.TIEP_NHAN, hinhThucTiepNhan: RECEIVE_METHODS.BUU_CHINH,
                rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', createdBy: 'hatt', receivedBy: userName('hatt'),
                nycName: 'Phan Minh Quân', nycPhone: '0976543218', nycTinhThanh: 'Thành phố Hải Phòng', nycPhuongXa: 'Phường Lê Chân', nycAddressDetail: 'Số 27 đường Hai Bà Trưng',
                linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', hanhVi: 'Yêu cầu bồi thường do bị tạm giữ trái pháp luật.',
                date: '16/10/2026', receivedAt: '10:40 16/10/2026', routes: routeBtp('14:30 16/10/2026', '08:45 17/10/2026'),
                history: [h('Tiếp nhận hồ sơ', 'hatt', '10:40 16/10/2026', 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.'), h('Chuyển đơn vị', 'oanhdh', '14:30 16/10/2026', 'Chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước phân công.'), h('Chuyển đơn vị', 'cuctruong', '08:45 17/10/2026', 'Chuyển Phòng Quản lý nghiệp vụ về bồi thường nhà nước phân công.')]
            }),
            base('VVBT-2026-144', {
                module: 'XD', loaiYeuCau: REQUEST_TYPE_XD, nguonHoSo: SOURCES.TIEP_NHAN, hinhThucTiepNhan: RECEIVE_METHODS.TRUC_TIEP,
                rootUnitId: 'STP-HN', currentUnitId: 'STP-HN-HCTP', createdBy: 'cv_hn1', receivedBy: userName('cv_hn1'),
                nycName: 'Đinh Thị Hồng Nhung', nycPhone: '0904123987', nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: 'Phường Hoàng Mai', nycAddressDetail: 'Số 102 đường Tam Trinh',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Đề nghị xác định cơ quan giải quyết bồi thường đối với việc cưỡng chế công trình trái pháp luật.',
                date: '16/10/2026', receivedAt: '08:30 16/10/2026', routes: routeStp('11:00 16/10/2026'),
                history: [h('Tiếp nhận hồ sơ', 'cv_hn1', '08:30 16/10/2026', 'Chuyển lãnh đạo Sở Tư pháp Thành phố Hà Nội phân công xử lý.'), h('Chuyển đơn vị', 'gdso_hn', '11:00 16/10/2026', 'Chuyển Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hà Nội phân công.')]
            }),
            base('VVBT-2026-145', {
                module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo: SOURCES.TIEP_NHAN, hinhThucTiepNhan: RECEIVE_METHODS.TRUC_TIEP,
                rootUnitId: 'STP-HN', currentUnitId: 'STP-HN-HCTP', createdBy: 'cv_hn2', receivedBy: userName('cv_hn2'),
                nycName: 'Vương Đức Thịnh', nycPhone: '0868321456', nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: 'Phường Cầu Giấy', nycAddressDetail: 'Số 6 ngõ 88 Trần Thái Tông',
                linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', hanhVi: 'Yêu cầu bồi thường do kê biên tài sản vượt quá nghĩa vụ phải thi hành.',
                date: '17/10/2026', receivedAt: '14:10 17/10/2026', routes: routeStp('16:00 17/10/2026'),
                history: [h('Tiếp nhận hồ sơ', 'cv_hn2', '14:10 17/10/2026', 'Chuyển lãnh đạo Sở Tư pháp Thành phố Hà Nội phân công xử lý.'), h('Chuyển đơn vị', 'gdso_hn', '16:00 17/10/2026', 'Chuyển Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hà Nội phân công.')]
            })
        ];
        const codes = new Set(list.map(r => r.code));
        seeds.forEach(s => { if (!codes.has(s.code)) list.unshift(s); });
        writeJson(KEY_RECORDS, list);
        try { localStorage.setItem(KEY_SEED_PHONG, '1'); } catch (e) { /* bỏ qua */ }
    }
    const KEY_SEED_THULY = 'btnn_wf_seed_thuly_v2';
    function ensureThuLySeed() {
        try { if (localStorage.getItem(KEY_SEED_THULY)) return; } catch (e) { return; }
        const list = readJson(KEY_RECORDS, []);
        const h = (action, userId, at, note) => ({ at, userId, userName: userName(userId), action, note: note || '' });
        const th = (code, nyc, rootUnitId, chuTri, leader, linhVuc, hanhVi, date, requestKind, nguonHoSo) => ({
            id: 'WF-' + code, code, module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo, nycName: nyc, nyc, requestKind,
            rootUnitId, currentUnitId: rootUnitId, status: STATUS_CHO_THU_LY, chuTri, routes: [], approval: null, returned: null,
            linhVuc, hanhVi, date, receivedAt: '08:00 ' + date, createdBy: chuTri,
            history: [
                h('Trình phê duyệt', chuTri, '09:00 ' + date, `Tiếp nhận hồ sơ. Trình ${userName(leader)} - ${unitName(rootUnitId)}.`),
                h('Phê duyệt', leader, '15:00 ' + date, `Phê duyệt cấp cuối (${unitName(rootUnitId)}): Tiếp nhận hồ sơ. Hồ sơ chuyển [${STATUS_CHO_THU_LY}].`)
            ]
        });
        const HC = 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', THADS = 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', HS = 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', DS = 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ';
        const seed = [
            th('BT-2026-043', 'Hoàng Thị M', 'UBND-LD', 'cv_ubndld1', 'ct_ubndld', HC, 'Áp dụng biện pháp khẩn cấp phong tỏa tài khoản ngân hàng trái luật.', '18/09/2026', 'money', 'Tiếp nhận trực tiếp'),
            th('BT-2026-031', 'Công ty TNHH Phát Đạt', 'CCTHADS-TT', 'chv_tt1', 'cc_tt', THADS, 'Kê biên toàn bộ dây chuyền sản xuất vượt quá giá trị nghĩa vụ phải thi hành.', '05/10/2026', 'money', 'Qua dịch vụ bưu chính'),
            th('BT-2026-051', 'Nguyễn Thị Phương Thảo', 'STP-HN', 'cv_hn1', 'gdso_hn', HC, 'Chậm trễ cấp phiếu lý lịch tư pháp làm mất cơ hội ký hợp đồng lao động tại nước ngoài.', '08/10/2026', 'money', 'Dịch vụ công'),
            th('BT-2026-052', 'Trần Đình Trọng', 'UBND-CG', 'cv_cg1', 'ct_cg', HC, 'Thu hồi giấy phép kinh doanh ăn uống không đúng trình tự, gây đình trệ chuỗi nhà hàng.', '07/10/2026', 'money', 'Tiếp nhận trực tiếp'),
            th('BT-2026-053', 'Công ty Cổ phần Vận tải Thăng Long', 'UBND-HM', 'cv_hm1', 'ct_hm', HC, 'Tạm giữ đoàn xe vận tải hàng hóa nông sản quá thời hạn quy định làm hư hỏng hàng hóa.', '06/10/2026', 'money', 'Dịch vụ công'),
            th('BT-2026-054', 'Vũ Quang Vinh', 'CA-TX', 'cb_catx1', 'ld_catx', HS, 'Kê biên phong tỏa xe ô tô con cá nhân kéo dài 4 tháng trong vụ án đã đình chỉ.', '05/10/2026', 'both', 'Qua dịch vụ bưu chính'),
            th('BT-2026-055', 'Lê Minh Tuấn', 'UBND-DD', 'cv_dd1', 'ct_dd', HC, 'Cưỡng chế thu hồi ki-ốt kinh doanh thương mại trái quy định tại khu vực chợ tạm.', '04/10/2026', 'money', 'Tiếp nhận trực tiếp'),
            th('BT-2026-056', 'Ngô Thị Bích Liên', 'CCTHADS-CG', 'chv_cg1', 'cc_cg', THADS, 'Kê biên phong tỏa nhà đất thuộc sở hữu riêng của người yêu cầu bồi thường không thuộc diện phải thi hành án.', '03/10/2026', 'money', 'Dịch vụ công'),
            th('BT-2026-057', 'Đặng Hoàng Nam', 'TAND-HN', 'tk_tandhn1', 'ca_tandhn', DS, 'Áp dụng biện pháp khẩn cấp tạm thời cấm xuất cảnh trái pháp luật làm lỡ chuyến công tác ký kết hợp đồng.', '02/10/2026', 'money', 'Tiếp nhận trực tiếp')
        ];
        // Phiếu trình Ký duyệt Quyết định GQBT mẫu (cùng dữ liệu với Quyết định QD-06 của chức năng Quyết định giải quyết bồi thường)
        const qdAt = '09:00 10/10/2026';
        seed.push({
            id: 'WF-BT-2026-023', code: 'BT-2026-023', module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nycName: 'Phạm Văn Nam', chuTri: 'canbonv', createdBy: 'canbonv', requestKind: 'money',
            rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', status: STATUS.CHO_PHE_DUYET, linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', hanhVi: 'Bắt giữ oan sai do sai sót nghiệp vụ công tố.',
            routes: [],
            approval: { kind: 'Quyết định GQBT', content: 'Kính trình Lãnh đạo ký duyệt dự thảo Quyết định giải quyết bồi thường.', files: [], draftDoc: { source: 'uploaded', uploadedName: 'Du_thao_QD_GQBT_BT-2026-023.docx', formNo: 'Mẫu số 18/BTNN' }, resultStatus: 'Đã ban hành', action: null, prevStatus: 'Chờ ban hành QĐ', path: ['PLN-02', 'CĐK-01'], level: 0, steps: [], assignees: ['tpbt'], submittedBy: 'canbonv', submittedAt: qdAt, pending: { since: qdAt } },
            history: [{ at: qdAt, userId: 'canbonv', userName: userName('canbonv'), action: 'Trình phê duyệt', note: 'Quyết định GQBT. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.', kind: 'Quyết định GQBT' }]
        });
        let added = 0;
        seed.forEach(s => { if (!list.some(r => r.code === s.code)) { list.push(s); added++; } });
        if (added) writeJson(KEY_RECORDS, list);
        try { localStorage.setItem(KEY_SEED_THULY, '1'); } catch (e) { /* bỏ qua */ }
    }
    function person(name, dob, docNo, phone, email, city, ward, addr) {
        return { nycType: 'Cá nhân', nycName: name, nycDob: dob, nycDocType: 'CCCD', nycDocNo: docNo, nycDocDate: '10/05/2021', nycDocPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', nycPhone: phone, nycEmail: email, nycCountry: 'Việt Nam', nycTinhThanh: city, nycPhuongXa: ward, nycAddressDetail: addr };
    }
    function buildSeed() {
        const base = (code, extra) => Object.assign({
            id: 'WF-' + code, code, module: 'XD', loaiYeuCau: REQUEST_TYPE_XD, rootUnitId: 'BTP-01', currentUnitId: 'PLN-02',
            nycRole: 'Người bị thiệt hại', hinhThucTiepNhan: 'Trực tiếp', linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH',
            hinhThucNhan: 'Phương thức điện tử', attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: `Don_yeu_cau_${code}.pdf` }],
            vanBanCanCu: [],
            procBasis: '', procTargetAgency: '', procReason: '', procDecisionFile: '', claimCode: '-',
            routes: [], chuTri: null, approval: null, history: [], receivedBy: 'Nguyễn Văn Cán Bộ', source: 'Tiếp nhận'
        }, extra);
        const btpRoutes = (chuTri, lastState) => ([
            { id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: 'Giao Cục xem xét, xử lý.', at: '08:30 02/09/2026', state: 'Đã xử lý' },
            { id: 'R2', type: 'unit', fromUnitId: 'CĐK-01', fromUserId: 'cuctruong', toUnitId: 'PLN-02', note: '', at: '14:00 02/09/2026', state: 'Đã xử lý' },
            { id: 'R3', type: 'officer', fromUnitId: 'PLN-02', fromUserId: 'tpbt', chuTri, note: '', at: '09:15 03/09/2026', state: lastState || 'Đã xử lý' }
        ]);
        const h = (action, userId, at, note) => ({ at, userId, userName: userName(userId), action, note: note || '' });
        return [
            base('XD-2026-101', Object.assign(person('Lê Minh Tuấn', '12/04/1982', '001082004512', '0912000101', 'tuan.lm@gmail.com', 'Thành phố Hà Nội', '00007 - Phường Cầu Giấy', 'Số 21 Trần Thái Tông'), {
                status: STATUS.CHO_PHAN_CONG, currentUnitId: 'BTP-01', date: '05/10/2026', receivedAt: '08:40 05/10/2026',
                hanhVi: 'Bị thu hồi giấy phép xây dựng trái pháp luật.',
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:40 05/10/2026', 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.')]
            })),
            base('XD-2026-102', Object.assign(person('Hoàng Thị Mai', '03/09/1990', '001190006732', '0912000102', '', 'Thành phố Hà Nội', '00004 - Phường Hoàn Kiếm', 'Số 8 Hàng Bài'), {
                status: STATUS.DANG_PHAN_CONG, currentUnitId: 'CĐK-01', date: '04/10/2026', receivedAt: '10:15 04/10/2026',
                nycRole: 'Người thừa kế của người bị thiệt hại',
                nbth: { name: 'Hoàng Văn Bình', dob: '20/01/1958', docType: 'CCCD', docNo: '001058001122', docDate: '', docPlace: '', phone: '', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00004 - Phường Hoàn Kiếm', address: 'Số 8 Hàng Bài' },
                hanhVi: 'Cưỡng chế phá dỡ công trình khi chưa có quyết định có hiệu lực.',
                routes: [{ id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: 'Giao Cục xem xét.', at: '15:00 04/10/2026', state: 'Chưa xử lý' }],
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '10:15 04/10/2026', 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.'), h('Chuyển đơn vị', 'oanhdh', '15:00 04/10/2026', 'Chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước phân công. Ý kiến chỉ đạo: Giao Cục xem xét.')]
            })),
            base('XD-2026-103', Object.assign(person('Phan Văn Lực', '22/11/1979', '001079003311', '0912000103', 'luc.pv@gmail.com', 'Thành phố Hà Nội', '00010 - Phường Thanh Xuân', 'Số 5 Nguyễn Trãi'), {
                status: STATUS.CHO_TIEP_NHAN, date: '02/10/2026', receivedAt: '08:00 02/10/2026', chuTri: 'canbonv',
                hanhVi: 'Bị tạm giữ hành chính quá thời hạn quy định.', routes: btpRoutes('canbonv', 'Chưa xử lý'),
                vanBanCanCu: [{ name: 'Quyết định tạm giữ hành chính số 15/QĐ-TG ngày 12/08/2026', file: 'Quyet_dinh_tam_giu_15.pdf' }],
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:00 02/10/2026'), h('Chuyển đơn vị', 'oanhdh', '08:30 02/10/2026'), h('Chuyển đơn vị', 'cuctruong', '14:00 02/10/2026'), h('Phân công cán bộ', 'tpbt', '09:15 03/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ.')]
            })),
            base('XD-2026-111', Object.assign(person('Trần Đình Trọng', '18/05/1983', '001083006789', '0912111222', 'trong.td@gmail.com', 'Thành phố Hà Nội', '00007 - Phường Cầu Giấy', 'Số 45 Dịch Vọng Hậu'), {
                status: STATUS.CHO_TIEP_NHAN, date: '08/10/2026', receivedAt: '08:15 08/10/2026', chuTri: 'canbonv',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', nycRole: 'Người bị thiệt hại',
                hanhVi: 'Cưỡng chế tháo dỡ công trình xây dựng khi văn bản đình chỉ chưa có hiệu lực pháp luật.',
                vanBanCanCu: [
                    { name: 'Quyết định số 88/QĐ-UBND ngày 15/05/2026 của UBND quận Cầu Giấy', file: 'Quyet_dinh_88_UBND_CG.pdf' },
                    { name: 'Biên bản kiểm tra hiện trạng công trình ngày 20/05/2026', file: 'Bien_ban_kiem_tra_hien_trang.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-111.pdf' }],
                routes: btpRoutes('canbonv', 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:15 08/10/2026', 'Tiếp nhận hồ sơ trực tiếp tại Bộ phận một cửa.'), h('Chuyển đơn vị', 'oanhdh', '09:00 08/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN.'), h('Chuyển đơn vị', 'cuctruong', '13:30 08/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '15:00 08/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ.')]
            })),
            base('XD-2026-112', Object.assign(person('Nguyễn Phương Thảo', '24/11/1991', '001191008822', '0983456789', 'thao.np@outlook.com', 'Thành phố Hà Nội', '00004 - Phường Hoàn Kiếm', 'Số 16 Hàng Bông'), {
                status: STATUS.CHO_TIEP_NHAN, date: '07/10/2026', receivedAt: '09:30 07/10/2026', chuTri: 'canbonv',
                linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', nycRole: 'Người thừa kế của người bị thiệt hại',
                nbth: { name: 'Nguyễn Văn Hùng', dob: '10/02/1955', docType: 'CCCD', docNo: '001055003344', docDate: '15/03/2021', docPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', phone: '', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00004 - Phường Hoàn Kiếm', address: 'Số 16 Hàng Bông' },
                hanhVi: 'Khởi tố, bắt tạm giam oan sai người bị thiệt hại trong vụ án kinh tế đã được đình chỉ điều tra bị can.',
                vanBanCanCu: [
                    { name: 'Quyết định đình chỉ điều tra bị can số 12/QĐ-ĐCĐT ngày 10/06/2026 của Cơ quan CSĐT', file: 'Quyet_dinh_dinh_chi_12_CSDT.pdf' },
                    { name: 'Văn bản xác nhận quyền thừa kế hợp pháp số 45/VB-CC ngày 20/08/2026', file: 'Van_ban_thua_ke_45.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-112.pdf' }],
                routes: btpRoutes('canbonv', 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '09:30 07/10/2026', 'Tiếp nhận hồ sơ trực tiếp.'), h('Chuyển đơn vị', 'oanhdh', '10:15 07/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN xử lý.'), h('Chuyển đơn vị', 'cuctruong', '14:20 07/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '16:00 07/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ.')]
            })),
            base('XD-2026-113', Object.assign(person('Lê Hoàng Long', '12/08/1976', '001076004455', '0904556677', 'long.lh@fecon.vn', 'Tỉnh Lâm Đồng', '24778 - Phường Xuân Hương - Đà Lạt', 'Số 58 đường Trần Phú'), {
                status: STATUS.CHO_TIEP_NHAN, date: '06/10/2026', receivedAt: '10:00 06/10/2026', chuTri: 'canbonv',
                linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', nycRole: 'Người bị thiệt hại',
                hanhVi: 'Kê biên, bán đấu giá tài sản nhà đất duy nhất vượt quá nghĩa vụ phải thi hành án dân sự.',
                vanBanCanCu: [
                    { name: 'Kết luận giải quyết tố cáo số 06/KL-CTHADS ngày 28/07/2026 của Cục THADS', file: 'Ket_luan_to_cao_06_THADS.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-113.pdf' }],
                routes: btpRoutes('canbonv', 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '10:00 06/10/2026', 'Tiếp nhận qua dịch vụ bưu chính.'), h('Chuyển đơn vị', 'oanhdh', '11:00 06/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN.'), h('Chuyển đơn vị', 'cuctruong', '15:10 06/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '17:00 06/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ.')]
            })),
            base('XD-2026-114', Object.assign(person('Phạm Quốc Bảo', '03/04/1988', '001088009911', '0978990011', 'baopq@vingroup.net', 'Thành phố Hà Nội', '00001 - Phường Ba Đình', 'Số 88 đường Liễu Giai'), {
                status: STATUS.CHO_TIEP_NHAN, date: '05/10/2026', receivedAt: '14:20 05/10/2026', chuTri: 'canbonv',
                linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ', nycRole: 'Cá nhân, pháp nhân được ủy quyền hợp pháp',
                nbth: { name: 'Công ty Cổ phần Xây dựng & Thương mại Phúc An', dob: '15/09/2015', docType: 'ĐKKD', docNo: '0106899234', docDate: '15/09/2015', docPlace: 'Sở Kế hoạch và Đầu tư Hà Nội', phone: '02438889999', email: 'contact@phucan.vn', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00001 - Phường Ba Đình', address: 'Số 88 đường Liễu Giai' },
                hanhVi: 'Tòa án áp dụng biện pháp khẩn cấp tạm thời phong tỏa toàn bộ tài khoản thanh toán của doanh nghiệp trái pháp luật gây thiệt hại lớn cho hoạt động kinh doanh.',
                vanBanCanCu: [
                    { name: 'Quyết định hủy bỏ biện pháp khẩn cấp tạm thời số 09/2026/QĐ-BPKCTT', file: 'Quyet_dinh_huy_BPKCTT_09.pdf' },
                    { name: 'Hợp đồng ủy quyền giải quyết bồi thường số 18/2026/HĐUQ', file: 'Hop_dong_uy_quyen_18.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-114.pdf' }],
                routes: btpRoutes('canbonv', 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '14:20 05/10/2026', 'Tiếp nhận yêu cầu trực tiếp.'), h('Chuyển đơn vị', 'oanhdh', '15:30 05/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN.'), h('Chuyển đơn vị', 'cuctruong', '08:30 06/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '09:00 06/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ.')]
            })),
            base('XD-2026-104', Object.assign(person('Vũ Đức Anh', '15/06/1985', '001085002934', '0912000104', 'anh.vd@gmail.com', 'Thành phố Hà Nội', '00001 - Phường Ba Đình', 'Số 15 Kim Mã'), {
                status: STATUS.DANG_THUC_HIEN, date: '01/09/2026', receivedAt: '09:00 01/09/2026', chuTri: 'canbonv',
                hanhVi: 'Quyết định xử phạt vi phạm hành chính bị hủy do sai thẩm quyền.', routes: btpRoutes('canbonv', ['ducpm']),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội', procReason: 'Người thi hành công vụ gây thiệt hại thuộc UBND quận Cầu Giấy quản lý.',
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '09:00 01/09/2026'), h('Phân công cán bộ', 'tpbt', '09:15 03/09/2026'), h('Tiếp nhận hồ sơ', 'canbonv', '10:00 03/09/2026', 'Hồ sơ chuyển [Đang thực hiện].')]
            })),
            base('XD-2026-105', Object.assign(person('Trịnh Văn Hùng', '08/08/1975', '001075009876', '0912000105', '', 'Tỉnh Lâm Đồng', '24778 - Phường Xuân Hương - Đà Lạt', 'Số 3 Lê Hồng Phong'), {
                status: STATUS.CHO_PHE_DUYET, date: '28/08/2026', receivedAt: '08:20 28/08/2026', chuTri: 'canbonv', linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ',
                hanhVi: 'Kê biên, bán đấu giá tài sản không đúng quy định.', routes: btpRoutes('canbonv'),
                procBasis: 'Khoản 2 Điều 40 Luật TNBTCNN', procTargetAgency: 'Cục Thi hành án dân sự tỉnh Lâm Đồng', procReason: 'Chấp hành viên thuộc Cục THADS tỉnh Lâm Đồng tổ chức thi hành.',
                approval: { kind: 'Hoàn thành xác định', content: 'Trình phê duyệt kết quả xác định cơ quan giải quyết bồi thường.', files: [], path: ['PLN-02', 'CĐK-01'], level: 0, steps: [], submittedBy: 'canbonv', submittedAt: '16:00 06/10/2026', pending: { since: '16:00 06/10/2026' } },
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:20 28/08/2026'), h('Phân công cán bộ', 'tpbt', '09:15 03/09/2026'), h('Tiếp nhận hồ sơ', 'canbonv', '10:00 03/09/2026'), h('Trình phê duyệt', 'canbonv', '16:00 06/10/2026', 'Hoàn thành xác định. Trình Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
            })),
            base('XD-2026-106', Object.assign(person('Đặng Thu Hương', '19/02/1992', '001192004455', '0912000106', 'huong.dt@gmail.com', 'Thành phố Hà Nội', '00007 - Phường Cầu Giấy', 'Số 40 Xuân Thủy'), {
                status: STATUS.CHO_PHE_DUYET, date: '25/08/2026', receivedAt: '08:10 25/08/2026', chuTri: 'canbonv',
                hanhVi: 'Thu hồi đất không đúng trình tự.', routes: btpRoutes('canbonv'),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội', procReason: 'Quyết định thu hồi đất do UBND quận Cầu Giấy ban hành.',
                approval: { kind: 'Hoàn thành xác định', content: 'Kính trình phê duyệt.', files: [], path: ['PLN-02', 'CĐK-01'], level: 1, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '09:00 07/10/2026' }], submittedBy: 'canbonv', submittedAt: '17:00 06/10/2026', pending: { since: '09:00 07/10/2026' } },
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:10 25/08/2026'), h('Trình phê duyệt', 'canbonv', '17:00 06/10/2026', 'Hoàn thành xác định.'), h('Phê duyệt', 'tpbt', '09:00 07/10/2026', 'Phê duyệt cấp Phòng Quản lý nghiệp vụ về bồi thường nhà nước; chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.')]
            })),
            base('XD-2026-107', Object.assign(person('Ngô Quang Vinh', '30/03/1980', '001080007788', '0912000107', '', 'Thành phố Hà Nội', '00001 - Phường Ba Đình', 'Số 2 Đội Cấn'), {
                status: STATUS.BI_TU_CHOI, date: '20/08/2026', receivedAt: '08:00 20/08/2026', chuTri: 'canbonv',
                hanhVi: 'Bị buộc thôi việc trái pháp luật.', routes: btpRoutes('canbonv'),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Hoàn Kiếm, Thành phố Hà Nội', procReason: 'Quyết định buộc thôi việc do UBND quận Hoàn Kiếm ban hành.',
                approval: { kind: 'Hoàn thành xác định', content: '', files: [], path: ['PLN-02', 'CĐK-01'], level: 1, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '10:00 05/10/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Từ chối phê duyệt', note: 'Bổ sung căn cứ xác định người thi hành công vụ.', at: '15:00 05/10/2026' }], submittedBy: 'canbonv', submittedAt: '08:00 05/10/2026', pending: null },
                returned: { reason: 'Bổ sung căn cứ xác định người thi hành công vụ.', by: 'cuctruong', unitId: 'CĐK-01', at: '15:00 05/10/2026', kind: 'Hoàn thành xác định' },
                history: [h('Trình phê duyệt', 'canbonv', '08:00 05/10/2026', 'Hoàn thành xác định.'), h('Phê duyệt', 'tpbt', '10:00 05/10/2026'), h('Từ chối phê duyệt', 'cuctruong', '15:00 05/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Bổ sung căn cứ xác định người thi hành công vụ.')]
            })),
            base('XD-2026-108', Object.assign(person('Lý Thị Ngọc', '11/12/1988', '001188003322', '0912000108', 'ngoc.lt@gmail.com', 'Tỉnh Lâm Đồng', '24781 - Phường Lâm Viên - Đà Lạt', 'Số 10 Phan Đình Phùng'), {
                status: STATUS.CHO_CHUYEN, date: '15/08/2026', receivedAt: '08:00 15/08/2026', chuTri: 'canbonv', linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ',
                hanhVi: 'Cưỡng chế giao tài sản không đúng đối tượng.', routes: btpRoutes('canbonv'),
                procBasis: 'Khoản 2 Điều 40 Luật TNBTCNN', procTargetAgency: 'Cục Thi hành án dân sự tỉnh Lâm Đồng', procReason: 'Hành vi do Chấp hành viên Cục THADS tỉnh Lâm Đồng thực hiện.',
                approval: { kind: 'Hoàn thành xác định', content: '', files: [], path: ['PLN-02', 'CĐK-01'], level: 1, done: true, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '09:00 01/10/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Phê duyệt', note: '', at: '14:00 01/10/2026' }], submittedBy: 'canbonv', submittedAt: '08:00 01/10/2026', pending: null },
                history: [h('Trình phê duyệt', 'canbonv', '08:00 01/10/2026', 'Hoàn thành xác định.'), h('Phê duyệt', 'tpbt', '09:00 01/10/2026'), h('Phê duyệt', 'cuctruong', '14:00 01/10/2026', 'Phê duyệt cấp cuối (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước): Hoàn thành xác định. Hồ sơ chuyển [Chờ chuyển CQGQBT].')]
            })),
            base('XD-2026-109', Object.assign(person('Mạc Văn Toàn', '05/05/1970', '001070001199', '0912000109', '', 'Tỉnh Lâm Đồng', '24784 - Xã Đức Trọng', 'Thôn 3'), {
                status: STATUS.CHO_CHUYEN, date: '12/08/2026', receivedAt: '08:00 12/08/2026', chuTri: 'canbonv', linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ',
                hanhVi: 'Áp dụng biện pháp khẩn cấp tạm thời không đúng.', routes: btpRoutes('canbonv'),
                procBasis: 'Khoản 2 Điều 40 Luật TNBTCNN', procTargetAgency: 'Tòa án nhân dân tỉnh Lâm Đồng', procReason: 'Thẩm phán Tòa án nhân dân tỉnh Lâm Đồng ra quyết định áp dụng.',
                approval: { kind: 'Hoàn thành xác định', content: '', files: [], path: ['PLN-02', 'CĐK-01'], level: 1, done: true, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '09:00 28/09/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Phê duyệt', note: '', at: '10:00 28/09/2026' }], submittedBy: 'canbonv', submittedAt: '08:00 28/09/2026', pending: null },
                history: [h('Trình phê duyệt', 'canbonv', '08:00 28/09/2026', 'Hoàn thành xác định.'), h('Phê duyệt', 'tpbt', '09:00 28/09/2026'), h('Phê duyệt', 'cuctruong', '10:00 28/09/2026', 'Phê duyệt cấp cuối (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước): Hoàn thành xác định. Hồ sơ chuyển [Chờ chuyển CQGQBT].')]
            })),
            base('XD-2026-110', Object.assign(person('Tô Thị Hạnh', '14/07/1987', '001187005566', '0912000110', 'hanh.tt@gmail.com', 'Thành phố Hà Nội', '00010 - Phường Thanh Xuân', 'Số 70 Nguyễn Tuân'), {
                status: STATUS.HOAN_THANH, date: '01/08/2026', receivedAt: '08:00 01/08/2026', chuTri: 'canbonv',
                hanhVi: 'Thu hồi giấy chứng nhận quyền sử dụng đất trái pháp luật.', routes: btpRoutes('canbonv'),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội', procReason: 'Quyết định thu hồi do UBND quận Cầu Giấy ban hành.', claimCode: 'BT-2026-201',
                transfer: { content: 'Chuyển hồ sơ để UBND quận Cầu Giấy thụ lý giải quyết theo thẩm quyền.', files: [{ name: 'Van_ban_chuyen_ho_so_XD-2026-110.pdf' }], at: '10:00 20/09/2026', by: 'canbonv', ycbtCode: 'BT-2026-201', targetUnitId: 'UBND-CG' },
                history: [h('Chuyển CQGQBT', 'canbonv', '10:00 20/09/2026', 'Chuyển UBND quận Cầu Giấy, Thành phố Hà Nội; tạo hồ sơ YCBT BT-2026-201.')]
            })),
            // Hồ sơ YCBT sinh ra từ XD-2026-110, chờ lãnh đạo UBND quận Cầu Giấy phân công
            Object.assign(person('Tô Thị Hạnh', '14/07/1987', '001187005566', '0912000110', 'hanh.tt@gmail.com', 'Thành phố Hà Nội', '00010 - Phường Thanh Xuân', 'Số 70 Nguyễn Tuân'), {
                id: 'WF-BT-2026-201', code: 'BT-2026-201', module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo: 'Xác định CQGQBT', xdCode: 'XD-2026-110',
                rootUnitId: 'UBND-CG', currentUnitId: 'UBND-CG', status: STATUS.CHO_PHAN_CONG, nycRole: 'Người bị thiệt hại',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Thu hồi giấy chứng nhận quyền sử dụng đất trái pháp luật.', hinhThucNhan: 'Phương thức điện tử',
                date: '20/09/2026', receivedAt: '10:00 20/09/2026', createdBy: 'canbonv',
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-110.pdf' }],
                transferContent: 'Chuyển hồ sơ để UBND quận Cầu Giấy thụ lý giải quyết theo thẩm quyền.', transferFiles: [{ name: 'Van_ban_chuyen_ho_so_XD-2026-110.pdf' }],
                routes: [], chuTri: null, approval: null,
                history: [h('Nhận hồ sơ từ Xác định CQGQBT', 'canbonv', '10:00 20/09/2026', 'Hồ sơ XD-2026-110 chuyển đến. Chờ lãnh đạo UBND quận Cầu Giấy, Thành phố Hà Nội phân công.')]
            }),
            // Phiếu trình mẫu của phân hệ Giải quyết yêu cầu bồi thường (Chờ duyệt / Bị trả lại theo từng Nội dung trình)
            ...(() => {
                const P = ['PLN-02', 'CĐK-01'];
                const gq = (code, nyc, status, extra) => Object.assign({
                    id: 'WF-' + code, code, module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo: 'Tiếp nhận', nycName: nyc, nyc,
                    rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', status, chuTri: 'canbonv', routes: btpRoutes('canbonv'),
                    linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', approval: null, returned: null, history: []
                }, extra);
                const appr = (kind, content, level, steps, assignees, at, more) => Object.assign({
                    kind, content, files: [], draftDoc: null, resultStatus: '', action: null, prevStatus: YCBT_STATUS.CU_NGUOI,
                    path: P, level, steps, assignees, submittedBy: 'canbonv', submittedAt: at, pending: { since: at }
                }, more || {});
                return [
                    gq('BT-2026-020', 'Trần Văn Q', STATUS.CHO_PHE_DUYET, {
                        approval: appr('Tiếp nhận hồ sơ', 'Hồ sơ đầy đủ, đề nghị tiếp nhận và thụ lý.', 0, [], ['tpbt'], '08:30 09/10/2026', { prevStatus: 'Chờ tiếp nhận', resultStatus: YCBT_STATUS.CU_NGUOI }),
                        history: [h('Trình phê duyệt', 'canbonv', '08:30 09/10/2026', 'Tiếp nhận hồ sơ. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-019', 'Phạm Văn P', STATUS.CHO_PHE_DUYET, {
                        approval: appr('Yêu cầu bổ sung', 'Đề nghị người yêu cầu bổ sung bản sao bản án có hiệu lực và chứng từ chứng minh thiệt hại thu nhập.', 0, [], ['tpbt'], '10:00 09/10/2026', { resultStatus: 'Yêu cầu bổ sung' }),
                        history: [h('Trình phê duyệt', 'canbonv', '10:00 09/10/2026', 'Yêu cầu bổ sung. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-018', 'Trần Thu O', STATUS.CHO_PHE_DUYET, {
                        ktlReasonCode: 'KTL_02',
                        approval: appr('Không thụ lý', 'Không thụ lý hồ sơ yêu cầu bồi thường theo khoản 2 Điều 43 Luật TNBTCNN.', 1,
                            [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '15:00 08/10/2026' }], ['tpbt', 'cuctruong'], '09:00 08/10/2026', { resultStatus: 'Không thụ lý' }),
                        history: [h('Trình phê duyệt', 'canbonv', '09:00 08/10/2026', 'Không thụ lý. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.'), h('Phê duyệt', 'tpbt', '15:00 08/10/2026', 'Phê duyệt cấp Phòng Quản lý nghiệp vụ về bồi thường nhà nước; chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-029', 'Đỗ Thị Ngọc', STATUS.CHO_PHE_DUYET, {
                        approval: appr('Chuyển CQGQBT', 'Hành vi gây thiệt hại thuộc phạm vi trách nhiệm của UBND quận Cầu Giấy; đề nghị chuyển hồ sơ.', 0, [], ['tpbt'], '14:00 09/10/2026',
                            { resultStatus: 'Đã chuyển CQGQBT', action: { type: 'transfer', targetUnitId: 'UBND-CG', content: 'Chuyển hồ sơ để UBND quận Cầu Giấy giải quyết theo thẩm quyền.', files: [] } }),
                        history: [h('Trình phê duyệt', 'canbonv', '14:00 09/10/2026', 'Chuyển CQGQBT. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-021', 'Hoàng Văn R', YCBT_STATUS.BI_TU_CHOI, {
                        approval: appr('Tiếp nhận hồ sơ', '', 0, [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Từ chối phê duyệt', note: 'Bổ sung bản chụp giấy tờ tùy thân của người yêu cầu.', at: '16:00 08/10/2026' }], ['tpbt'], '09:30 08/10/2026', { prevStatus: 'Chờ tiếp nhận', pending: null }),
                        returned: { reason: 'Bổ sung bản chụp giấy tờ tùy thân của người yêu cầu.', by: 'tpbt', unitId: 'PLN-02', at: '16:00 08/10/2026', kind: 'Tiếp nhận hồ sơ', prevStatus: 'Chờ tiếp nhận' },
                        history: [h('Trình phê duyệt', 'canbonv', '09:30 08/10/2026', 'Tiếp nhận hồ sơ.'), h('Từ chối phê duyệt', 'tpbt', '16:00 08/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Bổ sung bản chụp giấy tờ tùy thân của người yêu cầu.')]
                    }),
                    gq('BT-2026-030', 'Bùi Văn Khánh', YCBT_STATUS.BI_TU_CHOI, {
                        approval: appr('Yêu cầu bổ sung', '', 1, [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '10:00 07/10/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Từ chối phê duyệt', note: 'Nội dung yêu cầu bổ sung cần nêu rõ thời hạn và căn cứ pháp lý.', at: '15:30 07/10/2026' }], ['tpbt', 'cuctruong'], '08:00 07/10/2026', { pending: null }),
                        returned: { reason: 'Nội dung yêu cầu bổ sung cần nêu rõ thời hạn và căn cứ pháp lý.', by: 'cuctruong', unitId: 'CĐK-01', at: '15:30 07/10/2026', kind: 'Yêu cầu bổ sung', prevStatus: YCBT_STATUS.CU_NGUOI },
                        history: [h('Trình phê duyệt', 'canbonv', '08:00 07/10/2026', 'Yêu cầu bổ sung.'), h('Phê duyệt', 'tpbt', '10:00 07/10/2026'), h('Từ chối phê duyệt', 'cuctruong', '15:30 07/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Nội dung yêu cầu bổ sung cần nêu rõ thời hạn và căn cứ pháp lý.')]
                    })
                ];
            })()
        ];
    }

    // ---------------- Tiếp nhận hồ sơ: tab Chờ xử lý (dùng chung cho badge tab và badge menu trái) ----------------
    // Kho hồ sơ do cán bộ nhập tại màn Tiếp nhận hồ sơ (tiep_nhan_ycbt.html)
    const KEY_RECEPTION_CLAIMS = 'receptionClaimsList_v2026';
    const KEY_RECEPTION_SEED = 'receptionSeedVersion';
    const RECEPTION_STATUSES = [STATUS.CHO_PHAN_CONG, STATUS.DANG_PHAN_CONG];
    // Người dùng thuộc Nhóm lãnh đạo của ít nhất một nút cấu hình luồng
    function isLeaderUser(userId) {
        return FLOW_TYPE_ORDER.some(ft => {
            const cfg = getFlowConfig(ft);
            return Object.keys(cfg).some(root => Object.values(cfg[root]).some(n => (n.leaders || []).includes(userId)));
        });
    }
    function receptionSourceOf(v) {
        const s = String(v || '').trim();
        if (Object.values(SOURCES).includes(s)) return s;
        if (/quốc gia|dịch vụ công|dvc/i.test(s)) return SOURCES.DVC;
        return SOURCES.TIEP_NHAN;
    }
    function receptionSeeded() {
        try { return !!localStorage.getItem(KEY_RECEPTION_SEED); } catch (e) { return false; }
    }
    // Hồ sơ thuộc tab Chờ xử lý của người dùng: [{ code, claim, rec }]
    // - Lãnh đạo: hồ sơ Chờ phân công / Đang phân công mà Lãnh đạo thuộc Nhóm lãnh đạo của đơn vị đang phân công.
    // - Cán bộ tiếp nhận: hồ sơ mình tiếp nhận (Nguồn Tiếp nhận mới) còn Chờ phân công / Đang phân công.
    // claims: danh sách hồ sơ tiếp nhận đang có trong trang; không truyền thì đọc kho localStorage của màn Tiếp nhận hồ sơ.
    function receptionPendingItems(userId, claims) {
        userId = userId || getCurrentUserId();
        const user = getUser(userId);
        if (!user) return [];
        const name = user.name;
        const root = getRootId(user.unitId);
        const list = (Array.isArray(claims) ? claims : readJson(KEY_RECEPTION_CLAIMS, [])).filter(c => c && !c.deleted);
        const records = loadRecords();
        const recMap = new Map();
        records.forEach(r => recMap.set(r.code, r));
        const allowed = getRequestTypesForUser(userId);
        const inReception = s => RECEPTION_STATUSES.includes(s || STATUS.CHO_PHAN_CONG);
        const claimOf = code => list.find(c => c.code === code) || null;
        const map = new Map();
        const add = (code, claim, rec) => { if (code && !map.has(code)) map.set(code, { code, claim, rec }); };
        if (isLeaderUser(userId)) {
            records.filter(r => canAssign(r, userId)).forEach(r => add(r.code, claimOf(r.code), r));
        } else {
            list.forEach(c => {
                const rec = recMap.get(c.code) || null;
                // Trạng thái hồ sơ tiếp nhận lấy theo hồ sơ luồng phân công
                const status = rec ? rec.status : c.status;
                if (c.rootUnitId === root && (c.receivedBy || name) === name && allowed.includes(c.requestType) && inReception(status)) add(c.code, c, rec);
            });
            records.filter(r => r.source === 'Tiếp nhận' && receptionSourceOf(r.nguonHoSo) === SOURCES.TIEP_NHAN
                && r.receivedBy === name && r.rootUnitId === root && inReception(r.status)).forEach(r => add(r.code, claimOf(r.code), r));
        }
        return Array.from(map.values()).filter(x => allowed.includes((x.claim ? x.claim.requestType : x.rec && x.rec.loaiYeuCau) || REQUEST_TYPE_YCBT));
    }
    function receptionPendingCount(userId, claims) { return receptionPendingItems(userId, claims).length; }

    global.BTNN_WF = {
        KEYS: { RECORDS: KEY_RECORDS, FLOW: KEY_FLOW, USER: KEY_USER, RECEPTION_CLAIMS: KEY_RECEPTION_CLAIMS },
        receptionPendingItems, receptionPendingCount, receptionSeeded,
        CATALOG_TYPE, STATUS, SUBMIT_KINDS, APPROVAL_KINDS, KTL_CATALOG_TYPE, DEFAULT_KTL_REASONS, XD_AUTHORITY_UNITS, REQUEST_TYPE_XD, REQUEST_TYPE_YCBT,
        FLOW_TYPES, FLOW_TYPE_NAMES, FLOW_TYPE_ORDER, SOURCES, RECEIVE_METHODS, RECEIVE_METHOD_CATALOG, RECEIVE_METHOD_ORDER, FORM_RECEIVE_METHODS, UBND_TINH_STP,
        flowRootIds, flowTypeOf, normalizeReceiveMethod, normalizeSource, nextVuViecCode, isVuViecCode, linkVuViec, unlinkVuViec, vuViecOf, listVuViec, xdViewOnlyStpRoots, isXdViewOnlyUser,
        ORG_UNITS, USERS, DEFAULT_REQUEST_TYPES, KIND_KP_TB, KIND_KP_QDTU,
        getUnit, unitName, getChildren, getRootId, getAncestors, getDescendants, getRootUnits, unitTreeLabel, searchUnits, mountUnitTree,
        getUser, userName, userLabel, usersInUnitTree,
        getCurrentUserId, getCurrentUser, setCurrentUser,
        getFlowConfig, saveFlowConfig, resetFlowConfig, getNodeConfig, getLeaders, isLeaderOf, isKyNhayUnit, kyNhayBadgeHtml, isUnitConfigured, findRootUnitByName,
        getRequestTypeCatalog, getRequestTypesForUser, getKtlReasons, xdAuthorityType, ensureClaimRecord,
        NYC_TYPES, DEFAULT_NYC_ROLES, getNycRoles, nycRoleCode, nycRoleName, nycTypeConstraint, nycTypeOf, nycRolesForType, isNbthOrgRole, joinAddress, stripAdminCode, getCountries, isValidEmail,
        DEFAULT_PERSONAL_DOC_TYPES, getPersonalDocTypes, normalizePersonalDocType, fillPersonalDocTypeSelect,
        loadRecords, saveRecords, getRecord, upsertRecord, removeRecord, addHistory, nextCode, createPendingRecord,
        latestRoute, canEditAtReception, canAssign, markViewed, assignToUnit, assignToOfficers,
        getRecallInfo, recall, computeApprovalPath, submitForApproval, canApprove, isLastApprovalLevel, nextLevelLeaders, xdPresetNextAssignee, firstLevelLeaders, approvalKindOf, approvalLabel, approvalPathText, approvalPathLineHtml, KIND_KQXD, approve, approveVerb, isXdRec, gqConfiguredRoots, xdTargetUnitId, xdTargetConfigured, xdTargetNotConfiguredMsg, renderSignDocHtml, rejectApproval, performTransfer,
        transferToAgency, issueXdOffline, returnHistoryOf, supplementHistoryOf, renderXdReturnHistoryHtml, renderXdSupplementHistoryHtml, getLeaderTasks, thuLyUnitOf, thuLyLeaders, canThuLy, canCuNguoi, applyCuNguoi, KIND_CU_NGUOI, thuLyOfficerOptions, acceptCase, rejectCase,
        KTL_TRANSFER_MODES, KTL_TRANSFER_LABELS, stpOfUnit, ktlTransferTarget, mountKtlTransfer, ktlTransferSentence,
        WORK_TYPES, WORK_TYPE_ORDER, QD_KINDS, workTypeOfKind, resolveAgencyUnit, caseLeaders, loadKinhPhi, kpLeaders, decideKinhPhi, isAdvanceProposal, getLeaderWork,
        statusBadge, routeText, routeStateText, renderRoutesHtml, renderHistoryHtml, renderApprovalHtml,
        docHeaderHtml, docPageHtml, openDocTab, downloadDocWord,
        draftDocName, draftBaseName, submittedDraftName, buildSupplementDraftHtml, previewDraftDoc, downloadDraftDoc, downloadSelectHtml, previewDraftDocByCode, downloadDraftDocByCode, renderDraftDocHtml, previewSubmittedDraft, downloadSubmittedDraft,
        mountUserSwitcher, nowText, dateText, esc
    };
})(window);
