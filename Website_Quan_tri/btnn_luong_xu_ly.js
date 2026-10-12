/*
 * Luồng phân công - phê duyệt dùng chung cho phân hệ Bồi thường nhà nước (mockup).
 * Dùng bởi: Tiếp nhận yêu cầu, Xác định cơ quan giải quyết bồi thường, Giải quyết yêu cầu bồi thường,
 * Hồ sơ trình Lãnh đạo, Cấu hình luồng xử lý, Quản lý danh mục (Đơn vị áp dụng của Loại yêu cầu).
 * Dữ liệu giả lập lưu tại localStorage.
 */
(function (global) {
    'use strict';

    const KEY_RECORDS = 'btnn_wf_records_v1';
    const KEY_FLOW = 'btnn_flow_config_v1';
    const KEY_USER = 'btnn_demo_user_v1';
    const KEY_SEED = 'btnn_wf_seed_version';
    const SEED_VERSION = 'v3a';
    const CATALOG_TYPE = 'DM_54';

    const REQUEST_TYPE_XD = 'Xác định cơ quan giải quyết bồi thường';
    const REQUEST_TYPE_YCBT = 'Yêu cầu bồi thường';

    const STATUS = {
        CHO_PHAN_CONG: 'Chờ phân công',
        DANG_PHAN_CONG: 'Đang phân công',
        CHO_TIEP_NHAN: 'Chờ tiếp nhận',
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
    const SUBMIT_KINDS = {
        'Kết quả xác định CQGQBT': STATUS.CHO_CHUYEN,
        'Kết quả xác định': STATUS.CHO_CHUYEN,
        'Hoàn thành xác định': STATUS.CHO_CHUYEN,
        'Yêu cầu bổ sung': STATUS.YC_BO_SUNG,
        'Từ chối': STATUS.BI_TU_CHOI,
        'Không thụ lý': STATUS.KHONG_THU_LY,
        'Chuyển CQGQBT': STATUS.DA_CHUYEN,
        'Tiếp nhận hồ sơ': 'Chờ thụ lý',
        'Tiếp nhận yêu cầu': STATUS.DANG_THUC_HIEN
    };
    // Danh sách Nội dung trình theo phân hệ (bộ lọc "Nội dung trình")
    const APPROVAL_KINDS = {
        XD: ['Tiếp nhận yêu cầu', 'Yêu cầu bổ sung', 'Từ chối', KIND_KQXD],
        YCBT: ['Tiếp nhận hồ sơ', 'Yêu cầu bổ sung', 'Không thụ lý', 'Chuyển CQGQBT', 'Quyết định GQBT', 'Hủy QĐ', 'Sửa chữa, đính chính QĐ']
    };
    // Danh mục Lý do không thụ lý (DM_55) - Điều 43 Luật TNBTCNN số 10/2017/QH14
    const KTL_CATALOG_TYPE = 'DM_55';
    const DEFAULT_KTL_REASONS = [
        { code: 'KTL_01', name: 'Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình (Điểm a Khoản 1 Điều 43)' },
        { code: 'KTL_02', name: 'Thời hiệu yêu cầu bồi thường đã hết (Điểm b Khoản 1 Điều 43)' },
        { code: 'KTL_03', name: 'Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước được quy định tại Chương II của Luật này (Điểm c Khoản 1 Điều 43)' },
        { code: 'KTL_04', name: 'Người yêu cầu bồi thường không phải là người có quyền yêu cầu bồi thường theo quy định tại Điều 5 của Luật này (Điểm d Khoản 1 Điều 43)' },
        { code: 'KTL_05', name: 'Hồ sơ không đầy đủ theo quy định tại Điều 41 của Luật này mà người yêu cầu bồi thường không bổ sung trong thời hạn quy định tại khoản 3 Điều 42 của Luật này (Điểm đ Khoản 1 Điều 43)' },
        { code: 'KTL_06', name: 'Yêu cầu bồi thường đã được thực hiện theo quy định tại điểm a khoản 1 Điều 52 của Luật này và đã được Tòa án có thẩm quyền thụ lý theo thủ tục tố tụng dân sự (Điểm e Khoản 1 Điều 43)' },
        { code: 'KTL_07', name: 'Yêu cầu bồi thường đã được Tòa án có thẩm quyền chấp nhận theo quy định tại khoản 1 Điều 55 của Luật này (Điểm g Khoản 1 Điều 43)' }
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
        { id: 'VKS-HP', name: 'Viện kiểm sát nhân dân Thành phố Hải Phòng', parentId: null }
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
            'CĐK-01': { leaders: ['cuctruong', 'cucpho'], allowUnit: true, units: ['PLN-02'], allowOfficer: true, officers: ['canbonv', 'hatt', 'ducpm'] },
            'PLN-02': { leaders: ['tpbt'], allowUnit: false, units: [], allowOfficer: true, officers: ['canbonv', 'hatt', 'ducpm'] }
        },
        'STP-HN': {
            'STP-HN': { leaders: ['gdso_hn'], allowUnit: true, units: ['STP-HN-HCTP'], allowOfficer: false, officers: [] },
            'STP-HN-HCTP': { leaders: ['tp_hctp_hn'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_hn1', 'cv_hn2'] }
        },
        'STP-HCM': {
            'STP-HCM': { leaders: ['gdso_hcm'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_hcm1'] }
        },
        'UBND-CG': {
            'UBND-CG': { leaders: ['ct_cg'], allowUnit: true, units: ['UBND-CG-TP'], allowOfficer: false, officers: [] },
            'UBND-CG-TP': { leaders: ['tp_tp_cg'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_cg1'] }
        },
        'THADS-LD': {
            'THADS-LD': { leaders: ['ct_thads'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_thads1'] }
        },
        // UBND cấp tỉnh: có thẩm quyền Xác định CQGQBT và giải quyết bồi thường
        'UBND-HN': {
            'UBND-HN': { leaders: ['ct_ubndhn'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_ubndhn1'] }
        },
        'UBND-LD': {
            'UBND-LD': { leaders: ['ct_ubndld'], allowUnit: false, units: [], allowOfficer: true, officers: ['cv_ubndld1', 'cv_ubndld2'] }
        }
    };
    // Cơ quan có thẩm quyền Xác định CQGQBT: Bộ Tư pháp, Sở Tư pháp, UBND cấp tỉnh
    const XD_AUTHORITY_UNITS = ['BTP-01', 'STP-HN', 'STP-HCM', 'UBND-HN', 'UBND-LD'];

    // Danh mục Loại yêu cầu (DM_54) - Đơn vị áp dụng; chọn đơn vị cha thì áp dụng cho toàn bộ đơn vị con
    const DEFAULT_REQUEST_TYPES = [
        { code: 'LYC_01', name: REQUEST_TYPE_XD, units: XD_AUTHORITY_UNITS.slice() },
        // Yêu cầu bồi thường áp dụng cho mọi đơn vị gốc (Bộ Tư pháp, Sở Tư pháp và các cơ quan giải quyết bồi thường)
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
    function getFlowConfig() {
        const cfg = readJson(KEY_FLOW, null);
        if (cfg && typeof cfg === 'object') {
            // Bổ sung cấu hình mặc định của đơn vị gốc mới (VD UBND cấp tỉnh) vào cấu hình đã lưu
            let changed = false;
            Object.keys(DEFAULT_FLOW).forEach(root => { if (!cfg[root]) { cfg[root] = JSON.parse(JSON.stringify(DEFAULT_FLOW[root])); changed = true; } });
            if (changed) writeJson(KEY_FLOW, cfg);
            return cfg;
        }
        const copy = JSON.parse(JSON.stringify(DEFAULT_FLOW));
        writeJson(KEY_FLOW, copy);
        return copy;
    }
    function saveFlowConfig(cfg) { writeJson(KEY_FLOW, cfg); }
    function resetFlowConfig() { const copy = JSON.parse(JSON.stringify(DEFAULT_FLOW)); writeJson(KEY_FLOW, copy); return copy; }
    function getNodeConfig(unitId) {
        const rootId = getRootId(unitId);
        const cfg = getFlowConfig();
        return (cfg[rootId] && cfg[rootId][unitId]) || null;
    }
    function getLeaders(unitId) {
        const node = getNodeConfig(unitId);
        return node ? (node.leaders || []) : [];
    }
    function isLeaderOf(userId, unitId) { return getLeaders(unitId).includes(userId); }
    // Đơn vị đã cấu hình luồng khi nút đơn vị gốc có nhóm lãnh đạo và có ít nhất một hướng xử lý
    function isUnitConfigured(rootId) {
        const node = getNodeConfig(rootId);
        return !!(node && node.leaders && node.leaders.length && ((node.allowUnit && node.units && node.units.length) || (node.allowOfficer && node.officers && node.officers.length)));
    }
    function findRootUnitByName(name) {
        const n = String(name || '').trim().toLowerCase();
        return getRootUnits().find(u => u.name.toLowerCase() === n) || null;
    }

    // ---------------- Danh mục Loại yêu cầu ----------------
    function getRequestTypeCatalog() {
        const cats = readJson('masterCategories', null);
        if (Array.isArray(cats)) {
            // Xác định CQGQBT: bổ sung UBND cấp tỉnh vào Đơn vị áp dụng của dữ liệu đã lưu
            const xd = cats.find(c => c.typeCode === CATALOG_TYPE && c.code === 'LYC_01');
            if (xd && !xd.ubndTinhV1) {
                xd.donViApDung = Array.from(new Set((xd.donViApDung || []).concat(['UBND-HN', 'UBND-LD'])));
                xd.ubndTinhV1 = true;
                writeJson('masterCategories', cats);
            }
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
    // Loại cơ quan có thẩm quyền Xác định CQGQBT của đơn vị gốc
    function xdAuthorityType(unitId) {
        const root = getRootId(unitId) || unitId;
        if (/^BTP/.test(root)) return 'Bộ Tư pháp';
        if (/^STP/.test(root)) return 'Sở Tư pháp';
        if (XD_AUTHORITY_UNITS.includes(root) && /^UBND/.test(root)) return 'UBND cấp tỉnh';
        return '';
    }
    function getRequestTypesForUser(userId) {
        const user = getUser(userId || getCurrentUserId());
        if (!user) return [];
        const chain = getAncestors(user.unitId);
        return getRequestTypeCatalog().filter(t => t.units.some(u => chain.includes(u))).map(t => t.name);
    }

    // ---------------- Kho hồ sơ luồng ----------------
    function loadRecords() {
        ensureSeed();
        const list = readJson(KEY_RECORDS, []);
        // Chuẩn hóa dữ liệu cũ: "Chờ phê duyệt" -> "Chờ duyệt"; Nội dung trình "Hoàn thành xác định"/"Kết quả xác định" -> "Kết quả xác định CQGQBT"
        const OLD_KQXD = ['Hoàn thành xác định', 'Kết quả xác định'];
        let changed = false;
        list.forEach(r => {
            if (r.status === 'Chờ phê duyệt') { r.status = STATUS.CHO_PHE_DUYET; changed = true; }
            if (r.approval && OLD_KQXD.includes(r.approval.kind)) { r.approval.kind = KIND_KQXD; changed = true; }
            if (r.returned && OLD_KQXD.includes(r.returned.kind)) { r.returned.kind = KIND_KQXD; changed = true; }
        });
        if (changed) writeJson(KEY_RECORDS, list);
        return list;
    }
    // Tạo/cập nhật hồ sơ luồng cho vụ việc YCBT đang quản lý tại phân hệ Giải quyết YCBT (để trình duyệt qua Hồ sơ trình Lãnh đạo)
    function ensureClaimRecord(data) {
        const existing = getRecord(data.code);
        if (existing) {
            Object.keys(data).forEach(k => { if (data[k] !== undefined && !['routes', 'approval', 'history', 'status'].includes(k)) existing[k] = data[k]; });
            if (data.status && existing.status !== STATUS.CHO_PHE_DUYET) existing.status = data.status;
            upsertRecord(existing);
            return existing;
        }
        const rec = Object.assign({ module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, routes: [], phoiHop: [], approval: null, history: [] }, data);
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
    function addHistory(rec, action, note, userId) {
        if (!rec.history) rec.history = [];
        const uidv = userId || getCurrentUserId();
        rec.history.push({ at: nowText(), userId: uidv, userName: userName(uidv), action, note: note || '' });
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
            phoiHop: [],
            approval: null,
            history: []
        }, data);
        // Chuyển tới đơn vị cấp dưới: hồ sơ thuộc đơn vị gốc, chờ lãnh đạo của chính đơn vị được chọn phân công
        rec.currentUnitId = data.targetUnitId && getUnit(data.targetUnitId) ? data.targetUnitId : rec.rootUnitId;
        addHistory(rec, data.historyAction || 'Tiếp nhận yêu cầu', data.historyNote || `Chuyển lãnh đạo ${unitName(rec.rootUnitId)} phân công xử lý.`, data.createdBy);
        delete rec.historyAction; delete rec.historyNote;
        return upsertRecord(rec);
    }

    function latestRoute(rec) { return rec.routes && rec.routes.length ? rec.routes[rec.routes.length - 1] : null; }

    // Tiếp nhận được cập nhật/xóa khi chưa có lãnh đạo nào thao tác
    function canEditAtReception(rec) {
        return !rec || (rec.status === STATUS.CHO_PHAN_CONG && (!rec.routes || rec.routes.length === 0));
    }

    // ---------------- Phân công ----------------
    function canAssign(rec, userId) {
        return !!rec && [STATUS.CHO_PHAN_CONG, STATUS.DANG_PHAN_CONG].includes(rec.status) && isLeaderOf(userId, rec.currentUnitId);
    }
    function markViewed(rec, userId) {
        const r = latestRoute(rec);
        if (rec.status === STATUS.CHO_PHE_DUYET && rec.approval && isLeaderOf(userId, rec.approval.path[rec.approval.level])) {
            const p = rec.approval.pending;
            if (p && !p.viewedAt) { p.viewedAt = nowText(); p.viewedBy = userId; return true; }
            return false;
        }
        if (r && r.state === 'Chưa xử lý' && !r.viewedAt) {
            const target = r.type === 'unit' ? isLeaderOf(userId, r.toUnitId) : (r.chuTri === userId);
            if (target) { r.viewedAt = nowText(); r.viewedBy = userId; return true; }
        }
        return false;
    }
    function assignToUnit(code, toUnitId, note) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canAssign(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phân công. Vui lòng tải lại danh sách.' };
        const node = getNodeConfig(rec.currentUnitId);
        if (!node || !node.allowUnit || !(node.units || []).includes(toUnitId)) return { ok: false, message: 'Đơn vị nhận không thuộc cấu hình luồng của đơn vị hiện tại.' };
        const prev = latestRoute(rec);
        if (prev) prev.state = 'Đã xử lý';
        rec.routes.push({ id: uid('R'), type: 'unit', fromUnitId: rec.currentUnitId, fromUserId: me, toUnitId, note: note || '', at: nowText(), state: 'Chưa xử lý' });
        rec.currentUnitId = toUnitId;
        rec.status = STATUS.DANG_PHAN_CONG;
        addHistory(rec, 'Chuyển đơn vị', `Chuyển ${unitName(toUnitId)} phân công.${note ? ' Ý kiến chỉ đạo: ' + note : ''}`);
        upsertRecord(rec);
        return { ok: true, record: rec };
    }
    function assignToOfficers(code, chuTri, phoiHop, note) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canAssign(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phân công. Vui lòng tải lại danh sách.' };
        const node = getNodeConfig(rec.currentUnitId);
        if (!node || !node.allowOfficer) return { ok: false, message: 'Đơn vị hiện tại không được cấu hình phân công cán bộ.' };
        if (!chuTri) return { ok: false, message: 'Vui lòng chọn cán bộ chủ trì.' };
        const prev = latestRoute(rec);
        if (prev) prev.state = 'Đã xử lý';
        const ph = (phoiHop || []).filter(id => id && id !== chuTri);
        rec.routes.push({ id: uid('R'), type: 'officer', fromUnitId: rec.currentUnitId, fromUserId: me, chuTri, phoiHop: ph, note: note || '', at: nowText(), state: 'Chưa xử lý' });
        rec.chuTri = chuTri;
        rec.phoiHop = ph;
        rec.status = STATUS.CHO_TIEP_NHAN;
        addHistory(rec, 'Phân công cán bộ', `Chủ trì: ${userName(chuTri)}${ph.length ? '; Phối hợp: ' + ph.map(userName).join(', ') : ''}.${note ? ' Ý kiến chỉ đạo: ' + note : ''}`);
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
        if (!r || r.state !== 'Chưa xử lý' || !isLeaderOf(userId, r.fromUnitId)) return null;
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
            addHistory(rec, 'Thu hồi phê duyệt', `Thu hồi kết quả phê duyệt đã chuyển ${unitName(rec.approval.path[rec.approval.level + 1])}.`);
        } else {
            const r = rec.routes.pop();
            rec.currentUnitId = r.fromUnitId;
            if (r.type === 'officer') { rec.chuTri = null; rec.phoiHop = []; }
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
            path = cb ? getAncestors(cb.unitId).filter(u => getLeaders(u).length) : [];
        }
        return path.filter((u, i) => path.indexOf(u) === i);
    }
    // extra.draftDoc: { generatedName, uploadedName } - văn bản dự thảo trình kèm (VD Thông báo yêu cầu bổ sung)
    // extra: { assignee: Lãnh đạo phê duyệt cấp 1 (bắt buộc khi cấp 1 có nhóm lãnh đạo), draftDoc: văn bản dự thảo/đính kèm trình,
    //          resultStatus: trạng thái khi cấp cuối phê duyệt, action: { type: 'transfer', targetUnitId, content, files } }
    function submitForApproval(code, kind, content, files, extra) {
        extra = extra || {};
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!rec || rec.chuTri !== me) return { ok: false, message: 'Chỉ cán bộ chủ trì được trình phê duyệt.' };
        const closed = [STATUS.CHO_PHE_DUYET, STATUS.HOAN_THANH, STATUS.BI_TU_CHOI, STATUS.KHONG_THU_LY, STATUS.DA_CHUYEN, STATUS.CHO_PHAN_CONG, STATUS.DANG_PHAN_CONG];
        if (closed.includes(rec.status)) return { ok: false, message: 'Trạng thái hồ sơ không cho phép trình phê duyệt.' };
        const path = computeApprovalPath(rec);
        if (!path.length) return { ok: false, message: 'Chưa xác định được cấp phê duyệt. Vui lòng liên hệ Quản trị hệ thống.' };
        const firstLeaders = getLeaders(path[0]);
        if (firstLeaders.length && !extra.assignee) return { ok: false, message: 'Vui lòng chọn Lãnh đạo phê duyệt.' };
        if (extra.assignee && firstLeaders.length && !firstLeaders.includes(extra.assignee)) return { ok: false, message: 'Lãnh đạo phê duyệt không thuộc nhóm lãnh đạo của cấp phê duyệt đầu tiên.' };
        if (rec.status === STATUS.CHO_TIEP_NHAN) {
            const r = latestRoute(rec);
            if (r) r.state = 'Đã xử lý';
        }
        rec.approval = {
            kind, content: content || '', files: files || [], draftDoc: extra.draftDoc || null,
            resultStatus: extra.resultStatus || '', action: extra.action || null, prevStatus: rec.status,
            path, level: 0, steps: [], assignees: [extra.assignee || ''],
            submittedBy: me, submittedAt: nowText(), pending: { since: nowText() }
        };
        rec.status = STATUS.CHO_PHE_DUYET;
        addHistory(rec, 'Trình phê duyệt', `${kind}. Trình ${extra.assignee ? userName(extra.assignee) + ' - ' : ''}${unitName(path[0])}.${content ? ' Nội dung: ' + content : ''}`);
        upsertRecord(rec);
        return { ok: true, record: rec };
    }
    // Lãnh đạo được giao đích danh tại cấp hiện tại; nếu cấp chưa giao đích danh thì cả nhóm lãnh đạo của cấp đó
    function canApprove(rec, userId) {
        if (!rec || rec.status !== STATUS.CHO_PHE_DUYET || !rec.approval) return false;
        const a = rec.approval;
        const assignee = (a.assignees || [])[a.level];
        if (assignee) return assignee === userId;
        return isLeaderOf(userId, a.path[a.level]);
    }
    function isLastApprovalLevel(rec) { return !!rec && !!rec.approval && rec.approval.level >= rec.approval.path.length - 1; }
    function nextLevelLeaders(rec) {
        if (!rec || !rec.approval || isLastApprovalLevel(rec)) return [];
        return getLeaders(rec.approval.path[rec.approval.level + 1]);
    }
    // Nhóm lãnh đạo của cấp phê duyệt đầu tiên (dùng cho ô "Lãnh đạo phê duyệt" khi trình)
    function firstLevelLeaders(recLike) {
        const path = computeApprovalPath(recLike || {});
        return path.length ? getLeaders(path[0]) : [];
    }
    // Nội dung trình của hồ sơ Chờ duyệt / Bị trả lại
    function approvalKindOf(rec) {
        if (!rec) return '';
        if (rec.status === STATUS.CHO_PHE_DUYET && rec.approval) return rec.approval.kind;
        if (rec.status === STATUS.BI_TRA_LAI && rec.returned) return rec.returned.kind || '';
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
            const nextLeaders = getLeaders(a.path[a.level + 1]);
            if (nextLeaders.length && !nextAssignee) return { ok: false, message: 'Vui lòng chọn Lãnh đạo phê duyệt cấp tiếp theo.' };
            if (nextAssignee && nextLeaders.length && !nextLeaders.includes(nextAssignee)) return { ok: false, message: 'Lãnh đạo được chọn không thuộc nhóm lãnh đạo của cấp tiếp theo.' };
            a.steps.push({ unitId, userId: me, action: 'Phê duyệt', note: note || '', at: nowText() });
            a.level += 1;
            a.assignees[a.level] = nextAssignee || '';
            a.pending = { since: nowText() };
            addHistory(rec, 'Phê duyệt', `${a.kind}: phê duyệt cấp ${unitName(unitId)}; chuyển ${nextAssignee ? userName(nextAssignee) + ' - ' : ''}${unitName(a.path[a.level])}.${note ? ' Ý kiến: ' + note : ''}`);
        } else {
            a.steps.push({ unitId, userId: me, action: 'Phê duyệt', note: note || '', at: nowText() });
            rec.status = a.resultStatus || SUBMIT_KINDS[a.kind] || a.prevStatus || STATUS.DANG_THUC_HIEN;
            a.done = true;
            a.pending = null;
            if (a.action && a.action.type === 'transfer') performTransfer(rec, a.action);
            addHistory(rec, 'Phê duyệt', `Phê duyệt cấp cuối (${unitName(unitId)}): ${a.kind}. Hồ sơ chuyển [${rec.status}].${note ? ' Ý kiến: ' + note : ''}`);
        }
        upsertRecord(rec);
        return { ok: true, record: rec };
    }
    // Chuyển hồ sơ YCBT sang cơ quan giải quyết khác: cơ quan mới nhận hồ sơ ở trạng thái Chờ phân công (bắt đầu lại từ bước tiếp nhận)
    function performTransfer(rec, action) {
        const target = getUnit(action.targetUnitId);
        if (!target) return null;
        const newCode = nextCode('BT');
        const copy = JSON.parse(JSON.stringify(rec));
        ['routes', 'approval', 'history', 'returned', 'transfer', 'transferTo', 'chuTri', 'phoiHop', 'status', 'currentUnitId', 'code', 'id', 'appointedOfficers'].forEach(k => delete copy[k]);
        createPendingRecord(Object.assign(copy, {
            id: 'YC' + Date.now().toString(36),
            code: newCode,
            module: 'YCBT',
            loaiYeuCau: REQUEST_TYPE_YCBT,
            rootUnitId: getRootId(target.id) || target.id,
            targetUnitId: target.id,
            receivedAt: nowText(),
            date: dateText(),
            createdBy: rec.chuTri,
            transferFromCode: rec.code,
            transferFromUnitId: rec.rootUnitId,
            transferContent: action.content || '',
            transferFiles: action.files || [],
            historyAction: 'Nhận hồ sơ chuyển CQGQBT',
            historyNote: `Hồ sơ ${rec.code} do ${unitName(rec.rootUnitId)} chuyển đến. Chờ lãnh đạo ${target.name} phân công.`
        }));
        rec.transferTo = { targetUnitId: target.id, code: newCode, content: action.content || '', files: action.files || [], at: nowText() };
        return newCode;
    }
    function rejectApproval(code, reason) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!canApprove(rec, me)) return { ok: false, message: 'Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách.' };
        if (!reason) return { ok: false, message: 'Vui lòng nhập lý do từ chối phê duyệt.' };
        const a = rec.approval;
        a.steps.push({ unitId: a.path[a.level], userId: me, action: 'Từ chối phê duyệt', note: reason, at: nowText() });
        rec.returned = { reason, by: me, unitId: a.path[a.level], at: nowText(), kind: a.kind, prevStatus: a.prevStatus || '' };
        rec.status = STATUS.BI_TRA_LAI;
        a.pending = null;
        addHistory(rec, 'Từ chối phê duyệt', `Trả lại cán bộ chủ trì. Lý do: ${reason}`);
        upsertRecord(rec);
        return { ok: true, record: rec };
    }

    // ---------------- Chuyển CQGQBT: sinh hồ sơ Yêu cầu bồi thường tại cơ quan giải quyết ----------------
    // unitId (tùy chọn): đơn vị được chọn trên cây đơn vị; không truyền thì lấy đơn vị gốc theo tên cơ quan trong kết quả xác định
    function transferToAgency(code, content, files, unitId) {
        const rec = getRecord(code);
        const me = getCurrentUserId();
        if (!rec || rec.chuTri !== me) return { ok: false, message: 'Chỉ cán bộ chủ trì được chuyển cơ quan giải quyết bồi thường.' };
        if (rec.status !== STATUS.CHO_CHUYEN) return { ok: false, message: 'Hồ sơ không ở trạng thái Chờ chuyển CQGQBT.' };
        const target = unitId ? getUnit(unitId) : findRootUnitByName(rec.procTargetAgency);
        const targetName = target ? target.name : (rec.procTargetAgency || '--');
        if (!target || !isUnitConfigured(getRootId(target.id) || target.id)) {
            return { ok: false, message: `Đơn vị ${targetName} chưa được cấu hình luồng phân công. Vui lòng liên hệ Quản trị hệ thống.` };
        }
        const ycbtCode = nextCode('BT');
        const copy = JSON.parse(JSON.stringify(rec));
        ['routes', 'approval', 'history', 'returned', 'transfer', 'chuTri', 'phoiHop', 'status', 'currentUnitId', 'module', 'code', 'id'].forEach(k => delete copy[k]);
        createPendingRecord(Object.assign(copy, {
            id: uid('YC'),
            code: ycbtCode,
            loaiYeuCau: REQUEST_TYPE_YCBT,
            module: 'YCBT',
            nguonHoSo: 'Xác định CQGQBT',
            xdCode: rec.code,
            rootUnitId: getRootId(target.id) || target.id,
            targetUnitId: target.id,
            receivedAt: nowText(),
            date: dateText(),
            createdBy: me,
            transferContent: content,
            transferFiles: files || [],
            historyAction: 'Nhận hồ sơ từ Xác định CQGQBT',
            historyNote: `Hồ sơ ${rec.code} chuyển đến. Chờ lãnh đạo ${target.name} phân công.`
        }));
        rec.transfer = { content, files: files || [], at: nowText(), by: me, ycbtCode, targetUnitId: target.id };
        rec.claimCode = ycbtCode;
        rec.status = STATUS.HOAN_THANH;
        addHistory(rec, 'Chuyển CQGQBT', `Chuyển ${target.name}; tạo hồ sơ YCBT ${ycbtCode}. Nội dung chuyển xử lý: ${content}`);
        upsertRecord(rec);
        return { ok: true, record: rec, ycbtCode };
    }

    // ---------------- Danh sách việc của lãnh đạo ----------------
    function getLeaderTasks(userId) {
        const me = userId || getCurrentUserId();
        const all = loadRecords();
        const types = getRequestTypesForUser(me);
        const visible = all.filter(r => types.includes(r.loaiYeuCau));
        const assign = visible.filter(r => canAssign(r, me));
        const approveList = visible.filter(r => canApprove(r, me));
        const done = visible.filter(r => (r.routes || []).some(x => x.fromUserId === me) || (r.approval && (r.approval.steps || []).some(s => s.userId === me)) || (r.history || []).some(h => h.userId === me && /Phê duyệt|Từ chối phê duyệt|Chuyển đơn vị|Phân công/.test(h.action)));
        return { assign, approve: approveList, done };
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
    // options: { inputId, value, disabledIds: [], placeholder, onChange(id) }
    // Ô hiển thị "[Mã đơn vị] - [Tên đơn vị]" kèm nút x; giá trị lưu ở input ẩn (id = inputId); controller gắn tại container.__utree
    function mountUnitTree(container, options) {
        if (!container) return null;
        ensureUnitTreeCss();
        const o = Object.assign({ inputId: '', value: '', disabledIds: [], placeholder: '-- Chọn đơn vị --' }, options || {});
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
                    rows.push(`<div class="${cls}" data-id="${esc(u.id)}" style="padding-left:${6 + depth * 18}px;"${isDis ? ' title="Đơn vị hiện tại của vụ việc, không được chọn"' : ''}>` +
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
        'Đang thực hiện': ['#e0f2fe', '#0369a1'],
        'Chờ duyệt': ['#ede9fe', '#6d28d9'],
        'Chờ phê duyệt': ['#ede9fe', '#6d28d9'],
        'Chờ thụ lý': ['#fef9c3', '#a16207'],
        'Chờ phát hành văn bản': ['#e0e7ff', '#3730a3'],
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
        return `${userName(r.fromUserId)} (${unitName(r.fromUnitId)}) phân công chủ trì ${userName(r.chuTri)}${r.phoiHop && r.phoiHop.length ? ', phối hợp ' + r.phoiHop.map(userName).join(', ') : ''}`;
    }
    function routeStateText(r) {
        if (r.state === 'Đã xử lý') return 'Đã xử lý';
        return r.viewedAt ? `Chưa xử lý - Đã xem lúc ${r.viewedAt}` : 'Chưa xử lý - Chưa xem';
    }
    function renderRoutesHtml(rec) {
        const routes = rec.routes || [];
        if (!routes.length) return `<div style="color:#64748b; font-style:italic;">Chưa có lượt chuyển.</div>`;
        return `<table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead><tr style="background:#f8fafc;"><th style="padding:8px; border:1px solid #e2e8f0; width:44px;">STT</th><th style="padding:8px; border:1px solid #e2e8f0; text-align:left;">Lượt chuyển</th><th style="padding:8px; border:1px solid #e2e8f0; width:140px;">Thời điểm</th><th style="padding:8px; border:1px solid #e2e8f0; width:230px;">Tình trạng</th></tr></thead>
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
    function docHeaderHtml(unitId, formNo, docType) {
        const now = new Date();
        const root = getRootId(unitId) || unitId;
        const governing = GOVERNING_BODY[root] || '';
        return `${formNo ? `<div style="text-align:right; font-style:italic;">${esc(formNo)}</div>` : ''}
            <table style="width:100%; border-collapse:collapse; margin-top:6pt;"><tr>
                <td style="width:40%; text-align:center; vertical-align:top; font-size:13pt;">${governing ? `${esc(governing)}<br>` : ''}<b>${esc(unitName(root).toUpperCase())}</b><br><span style="display:inline-block; width:35%; border-top:1px solid #000;"></span><br>Số: ......./${esc(docType || 'TB')}-${esc(issuerAbbr(root))}</td>
                <td style="text-align:center; vertical-align:top; font-size:13pt;"><b style="white-space:nowrap;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><br><span style="display:inline-block; width:45%; border-top:1px solid #000;"></span><br><i>${esc(placeOf(root))}, ngày ${pad(now.getDate())} tháng ${pad(now.getMonth() + 1)} năm ${now.getFullYear()}</i></td>
            </tr></table>`;
    }
    function docPageHtml(bodyHtml, baseName, withToolbar) {
        const toolbar = withToolbar ? `<div class="toolbar"><b style="margin-right:auto;">Văn bản dự thảo - ${esc(baseName)}</b><button onclick="dlWord()">Tải file (Word .doc)</button><button onclick="window.print()">In</button></div>
            <script>function dlWord(){var h='<html><head><meta charset="utf-8"></head><body>'+document.getElementById('doc').innerHTML+'</body></html>';var b=new Blob(['\\ufeff',h],{type:'application/msword'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=${JSON.stringify(baseName + '.doc')};document.body.appendChild(a);a.click();a.remove();}<\/script>` : '';
        return `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>${esc(baseName)}</title>
            <style>body{margin:0;background:#e5e7eb;font-family:system-ui,sans-serif}.toolbar{position:sticky;top:0;display:flex;gap:8px;align-items:center;padding:10px 20px;background:#1e3a8a;color:#fff}.toolbar button{border:0;border-radius:6px;padding:7px 12px;font-weight:600;cursor:pointer}.page{background:#fff;width:210mm;min-height:297mm;margin:20px auto;padding:20mm 20mm 20mm 30mm;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.15)}.page>div{font-family:'Times New Roman',serif;font-size:14pt;line-height:1.5;color:#000}@media print{.toolbar{display:none}body{background:#fff}.page{margin:0;box-shadow:none;width:auto;min-height:0}}</style>
            </head><body>${toolbar}<div class="page" id="doc"><div>${bodyHtml}</div></div></body></html>`;
    }
    // Xem dự thảo ở tab mới (trang A4)
    function openDocTab(bodyHtml, baseName) {
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
    function renderDraftDocHtml(rec) {
        const d = rec.approval && rec.approval.draftDoc;
        if (!d) return '';
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
        if (version === SEED_VERSION && existing && existing.length) return;
        const seed = buildSeed();
        if (!existing || !existing.length) {
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
    }
    function person(name, dob, docNo, phone, email, city, ward, addr) {
        return { nycName: name, nycGender: 'Nam', nycDob: dob, nycDocType: 'CCCD', nycDocNo: docNo, nycDocDate: '10/05/2021', nycDocPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', nycPhone: phone, nycEmail: email, nycCountry: 'Việt Nam', nycTinhThanh: city, nycPhuongXa: ward, nycAddressDetail: addr };
    }
    function buildSeed() {
        const base = (code, extra) => Object.assign({
            id: 'WF-' + code, code, module: 'XD', loaiYeuCau: REQUEST_TYPE_XD, rootUnitId: 'BTP-01', currentUnitId: 'PLN-02',
            nycRole: 'Người bị thiệt hại', hinhThucTiepNhan: 'Trực tiếp', linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH',
            hinhThucNhan: 'Phương thức điện tử', attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: `Don_yeu_cau_${code}.pdf` }],
            vanBanCanCu: [],
            procBasis: '', procTargetAgency: '', procReason: '', procDecisionFile: '', claimCode: '-',
            routes: [], chuTri: null, phoiHop: [], approval: null, history: [], receivedBy: 'Nguyễn Văn Cán Bộ', source: 'Tiếp nhận'
        }, extra);
        const btpRoutes = (chuTri, phoiHop, lastState) => ([
            { id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: 'Giao Cục xem xét, xử lý.', at: '08:30 02/09/2026', state: 'Đã xử lý' },
            { id: 'R2', type: 'unit', fromUnitId: 'CĐK-01', fromUserId: 'cuctruong', toUnitId: 'PLN-02', note: '', at: '14:00 02/09/2026', state: 'Đã xử lý' },
            { id: 'R3', type: 'officer', fromUnitId: 'PLN-02', fromUserId: 'tpbt', chuTri, phoiHop: phoiHop || [], note: '', at: '09:15 03/09/2026', state: lastState || 'Đã xử lý' }
        ]);
        const h = (action, userId, at, note) => ({ at, userId, userName: userName(userId), action, note: note || '' });
        return [
            base('XD-2026-101', Object.assign(person('Lê Minh Tuấn', '12/04/1982', '001082004512', '0912000101', 'tuan.lm@gmail.com', 'Thành phố Hà Nội', '00007 - Phường Cầu Giấy', 'Số 21 Trần Thái Tông'), {
                status: STATUS.CHO_PHAN_CONG, currentUnitId: 'BTP-01', date: '05/10/2026', receivedAt: '08:40 05/10/2026',
                hanhVi: 'Bị thu hồi giấy phép xây dựng trái pháp luật.',
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:40 05/10/2026', 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.')]
            })),
            base('XD-2026-102', Object.assign(person('Hoàng Thị Mai', '03/09/1990', '001190006732', '0912000102', '', 'Thành phố Hà Nội', '00004 - Phường Hoàn Kiếm', 'Số 8 Hàng Bài'), {
                status: STATUS.DANG_PHAN_CONG, currentUnitId: 'CĐK-01', date: '04/10/2026', receivedAt: '10:15 04/10/2026', nycGender: 'Nữ',
                nycRole: 'Người thừa kế của người bị thiệt hại',
                nbth: { name: 'Hoàng Văn Bình', gender: 'Nam', dob: '20/01/1958', docType: 'CCCD', docNo: '001058001122', docDate: '', docPlace: '', phone: '', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00004 - Phường Hoàn Kiếm', address: 'Số 8 Hàng Bài' },
                hanhVi: 'Cưỡng chế phá dỡ công trình khi chưa có quyết định có hiệu lực.',
                routes: [{ id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: 'Giao Cục xem xét.', at: '15:00 04/10/2026', state: 'Chưa xử lý' }],
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '10:15 04/10/2026', 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.'), h('Chuyển đơn vị', 'oanhdh', '15:00 04/10/2026', 'Chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước phân công. Ý kiến chỉ đạo: Giao Cục xem xét.')]
            })),
            base('XD-2026-103', Object.assign(person('Phan Văn Lực', '22/11/1979', '001079003311', '0912000103', 'luc.pv@gmail.com', 'Thành phố Hà Nội', '00010 - Phường Thanh Xuân', 'Số 5 Nguyễn Trãi'), {
                status: STATUS.CHO_TIEP_NHAN, date: '02/10/2026', receivedAt: '08:00 02/10/2026', chuTri: 'canbonv', phoiHop: ['hatt'],
                hanhVi: 'Bị tạm giữ hành chính quá thời hạn quy định.', routes: btpRoutes('canbonv', ['hatt'], 'Chưa xử lý'),
                vanBanCanCu: [{ name: 'Quyết định tạm giữ hành chính số 15/QĐ-TG ngày 12/08/2026', file: 'Quyet_dinh_tam_giu_15.pdf' }],
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:00 02/10/2026'), h('Chuyển đơn vị', 'oanhdh', '08:30 02/10/2026'), h('Chuyển đơn vị', 'cuctruong', '14:00 02/10/2026'), h('Phân công cán bộ', 'tpbt', '09:15 03/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ; Phối hợp: Trần Thị Thu Hà.')]
            })),
            base('XD-2026-111', Object.assign(person('Trần Đình Trọng', '18/05/1983', '001083006789', '0912111222', 'trong.td@gmail.com', 'Thành phố Hà Nội', '00007 - Phường Cầu Giấy', 'Số 45 Dịch Vọng Hậu'), {
                status: STATUS.CHO_TIEP_NHAN, date: '08/10/2026', receivedAt: '08:15 08/10/2026', chuTri: 'canbonv', phoiHop: ['ducpm'],
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', nycRole: 'Người bị thiệt hại',
                hanhVi: 'Cưỡng chế tháo dỡ công trình xây dựng khi văn bản đình chỉ chưa có hiệu lực pháp luật.',
                vanBanCanCu: [
                    { name: 'Quyết định số 88/QĐ-UBND ngày 15/05/2026 của UBND quận Cầu Giấy', file: 'Quyet_dinh_88_UBND_CG.pdf' },
                    { name: 'Biên bản kiểm tra hiện trạng công trình ngày 20/05/2026', file: 'Bien_ban_kiem_tra_hien_trang.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-111.pdf' }],
                routes: btpRoutes('canbonv', ['ducpm'], 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:15 08/10/2026', 'Tiếp nhận hồ sơ trực tiếp tại Bộ phận một cửa.'), h('Chuyển đơn vị', 'oanhdh', '09:00 08/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN.'), h('Chuyển đơn vị', 'cuctruong', '13:30 08/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '15:00 08/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ; Phối hợp: Phạm Minh Đức.')]
            })),
            base('XD-2026-112', Object.assign(person('Nguyễn Phương Thảo', '24/11/1991', '001191008822', '0983456789', 'thao.np@outlook.com', 'Thành phố Hà Nội', '00004 - Phường Hoàn Kiếm', 'Số 16 Hàng Bông'), {
                status: STATUS.CHO_TIEP_NHAN, date: '07/10/2026', receivedAt: '09:30 07/10/2026', chuTri: 'canbonv', phoiHop: [], nycGender: 'Nữ',
                linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ', nycRole: 'Người thừa kế của người bị thiệt hại',
                nbth: { name: 'Nguyễn Văn Hùng', gender: 'Nam', dob: '10/02/1955', docType: 'CCCD', docNo: '001055003344', docDate: '15/03/2021', docPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', phone: '', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00004 - Phường Hoàn Kiếm', address: 'Số 16 Hàng Bông' },
                hanhVi: 'Khởi tố, bắt tạm giam oan sai người bị thiệt hại trong vụ án kinh tế đã được đình chỉ điều tra bị can.',
                vanBanCanCu: [
                    { name: 'Quyết định đình chỉ điều tra bị can số 12/QĐ-ĐCĐT ngày 10/06/2026 của Cơ quan CSĐT', file: 'Quyet_dinh_dinh_chi_12_CSDT.pdf' },
                    { name: 'Văn bản xác nhận quyền thừa kế hợp pháp số 45/VB-CC ngày 20/08/2026', file: 'Van_ban_thua_ke_45.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-112.pdf' }],
                routes: btpRoutes('canbonv', [], 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '09:30 07/10/2026', 'Tiếp nhận hồ sơ trực tiếp.'), h('Chuyển đơn vị', 'oanhdh', '10:15 07/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN xử lý.'), h('Chuyển đơn vị', 'cuctruong', '14:20 07/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '16:00 07/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ.')]
            })),
            base('XD-2026-113', Object.assign(person('Lê Hoàng Long', '12/08/1976', '001076004455', '0904556677', 'long.lh@fecon.vn', 'Tỉnh Lâm Đồng', '24778 - Phường Xuân Hương - Đà Lạt', 'Số 58 đường Trần Phú'), {
                status: STATUS.CHO_TIEP_NHAN, date: '06/10/2026', receivedAt: '10:00 06/10/2026', chuTri: 'canbonv', phoiHop: ['hatt'],
                linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', nycRole: 'Người bị thiệt hại',
                hanhVi: 'Kê biên, bán đấu giá tài sản nhà đất duy nhất vượt quá nghĩa vụ phải thi hành án dân sự.',
                vanBanCanCu: [
                    { name: 'Kết luận giải quyết tố cáo số 06/KL-CTHADS ngày 28/07/2026 của Cục THADS', file: 'Ket_luan_to_cao_06_THADS.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-113.pdf' }],
                routes: btpRoutes('canbonv', ['hatt'], 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '10:00 06/10/2026', 'Tiếp nhận qua đường Bưu điện/bưu chính.'), h('Chuyển đơn vị', 'oanhdh', '11:00 06/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN.'), h('Chuyển đơn vị', 'cuctruong', '15:10 06/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '17:00 06/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ; Phối hợp: Trần Thị Thu Hà.')]
            })),
            base('XD-2026-114', Object.assign(person('Phạm Quốc Bảo', '03/04/1988', '001088009911', '0978990011', 'baopq@vingroup.net', 'Thành phố Hà Nội', '00001 - Phường Ba Đình', 'Số 88 đường Liễu Giai'), {
                status: STATUS.CHO_TIEP_NHAN, date: '05/10/2026', receivedAt: '14:20 05/10/2026', chuTri: 'canbonv', phoiHop: [],
                linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ', nycRole: 'Cá nhân, pháp nhân được ủy quyền hợp pháp',
                nbth: { name: 'Công ty Cổ phần Xây dựng & Thương mại Phúc An', gender: 'Khác', dob: '15/09/2015', docType: 'ĐKKD', docNo: '0106899234', docDate: '15/09/2015', docPlace: 'Sở Kế hoạch và Đầu tư Hà Nội', phone: '02438889999', email: 'contact@phucan.vn', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00001 - Phường Ba Đình', address: 'Số 88 đường Liễu Giai' },
                hanhVi: 'Tòa án áp dụng biện pháp khẩn cấp tạm thời phong tỏa toàn bộ tài khoản thanh toán của doanh nghiệp trái pháp luật gây thiệt hại lớn cho hoạt động kinh doanh.',
                vanBanCanCu: [
                    { name: 'Quyết định hủy bỏ biện pháp khẩn cấp tạm thời số 09/2026/QĐ-BPKCTT', file: 'Quyet_dinh_huy_BPKCTT_09.pdf' },
                    { name: 'Hợp đồng ủy quyền giải quyết bồi thường số 18/2026/HĐUQ', file: 'Hop_dong_uy_quyen_18.pdf' }
                ],
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-114.pdf' }],
                routes: btpRoutes('canbonv', [], 'Chưa xử lý'),
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '14:20 05/10/2026', 'Tiếp nhận yêu cầu trực tiếp.'), h('Chuyển đơn vị', 'oanhdh', '15:30 05/10/2026', 'Giao Cục Đăng ký Giao dịch bảo đảm và BTNN.'), h('Chuyển đơn vị', 'cuctruong', '08:30 06/10/2026', 'Giao Phòng Quản lý nghiệp vụ về BTNN.'), h('Phân công cán bộ', 'tpbt', '09:00 06/10/2026', 'Chủ trì: Nguyễn Văn Cán Bộ.')]
            })),
            base('XD-2026-104', Object.assign(person('Vũ Đức Anh', '15/06/1985', '001085002934', '0912000104', 'anh.vd@gmail.com', 'Thành phố Hà Nội', '00001 - Phường Ba Đình', 'Số 15 Kim Mã'), {
                status: STATUS.DANG_THUC_HIEN, date: '01/09/2026', receivedAt: '09:00 01/09/2026', chuTri: 'canbonv', phoiHop: ['ducpm'],
                hanhVi: 'Quyết định xử phạt vi phạm hành chính bị hủy do sai thẩm quyền.', routes: btpRoutes('canbonv', ['ducpm']),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội', procReason: 'Người thi hành công vụ gây thiệt hại thuộc UBND quận Cầu Giấy quản lý.',
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '09:00 01/09/2026'), h('Phân công cán bộ', 'tpbt', '09:15 03/09/2026'), h('Tiếp nhận hồ sơ', 'canbonv', '10:00 03/09/2026', 'Hồ sơ chuyển [Đang thực hiện].')]
            })),
            base('XD-2026-105', Object.assign(person('Trịnh Văn Hùng', '08/08/1975', '001075009876', '0912000105', '', 'Tỉnh Lâm Đồng', '24778 - Phường Xuân Hương - Đà Lạt', 'Số 3 Lê Hồng Phong'), {
                status: STATUS.CHO_PHE_DUYET, date: '28/08/2026', receivedAt: '08:20 28/08/2026', chuTri: 'canbonv', phoiHop: [], linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ',
                hanhVi: 'Kê biên, bán đấu giá tài sản không đúng quy định.', routes: btpRoutes('canbonv', []),
                procBasis: 'Khoản 2 Điều 40 Luật TNBTCNN', procTargetAgency: 'Cục Thi hành án dân sự tỉnh Lâm Đồng', procReason: 'Chấp hành viên thuộc Cục THADS tỉnh Lâm Đồng tổ chức thi hành.',
                approval: { kind: 'Hoàn thành xác định', content: 'Trình phê duyệt kết quả xác định cơ quan giải quyết bồi thường.', files: [], path: ['PLN-02', 'CĐK-01', 'BTP-01'], level: 0, steps: [], submittedBy: 'canbonv', submittedAt: '16:00 06/10/2026', pending: { since: '16:00 06/10/2026' } },
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:20 28/08/2026'), h('Phân công cán bộ', 'tpbt', '09:15 03/09/2026'), h('Tiếp nhận hồ sơ', 'canbonv', '10:00 03/09/2026'), h('Trình phê duyệt', 'canbonv', '16:00 06/10/2026', 'Hoàn thành xác định. Trình Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
            })),
            base('XD-2026-106', Object.assign(person('Đặng Thu Hương', '19/02/1992', '001192004455', '0912000106', 'huong.dt@gmail.com', 'Thành phố Hà Nội', '00007 - Phường Cầu Giấy', 'Số 40 Xuân Thủy'), {
                status: STATUS.CHO_PHE_DUYET, date: '25/08/2026', receivedAt: '08:10 25/08/2026', chuTri: 'canbonv', phoiHop: [], nycGender: 'Nữ',
                hanhVi: 'Thu hồi đất không đúng trình tự.', routes: btpRoutes('canbonv', []),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội', procReason: 'Quyết định thu hồi đất do UBND quận Cầu Giấy ban hành.',
                approval: { kind: 'Hoàn thành xác định', content: 'Kính trình phê duyệt.', files: [], path: ['PLN-02', 'CĐK-01', 'BTP-01'], level: 1, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '09:00 07/10/2026' }], submittedBy: 'canbonv', submittedAt: '17:00 06/10/2026', pending: { since: '09:00 07/10/2026' } },
                history: [h('Tiếp nhận yêu cầu', 'canbonv', '08:10 25/08/2026'), h('Trình phê duyệt', 'canbonv', '17:00 06/10/2026', 'Hoàn thành xác định.'), h('Phê duyệt', 'tpbt', '09:00 07/10/2026', 'Phê duyệt cấp Phòng Quản lý nghiệp vụ về bồi thường nhà nước; chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.')]
            })),
            base('XD-2026-107', Object.assign(person('Ngô Quang Vinh', '30/03/1980', '001080007788', '0912000107', '', 'Thành phố Hà Nội', '00001 - Phường Ba Đình', 'Số 2 Đội Cấn'), {
                status: STATUS.BI_TRA_LAI, date: '20/08/2026', receivedAt: '08:00 20/08/2026', chuTri: 'canbonv', phoiHop: [],
                hanhVi: 'Bị buộc thôi việc trái pháp luật.', routes: btpRoutes('canbonv', []),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Hoàn Kiếm, Thành phố Hà Nội', procReason: 'Quyết định buộc thôi việc do UBND quận Hoàn Kiếm ban hành.',
                approval: { kind: 'Hoàn thành xác định', content: '', files: [], path: ['PLN-02', 'CĐK-01', 'BTP-01'], level: 1, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '10:00 05/10/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Từ chối phê duyệt', note: 'Bổ sung căn cứ xác định người thi hành công vụ.', at: '15:00 05/10/2026' }], submittedBy: 'canbonv', submittedAt: '08:00 05/10/2026', pending: null },
                returned: { reason: 'Bổ sung căn cứ xác định người thi hành công vụ.', by: 'cuctruong', unitId: 'CĐK-01', at: '15:00 05/10/2026', kind: 'Hoàn thành xác định' },
                history: [h('Trình phê duyệt', 'canbonv', '08:00 05/10/2026', 'Hoàn thành xác định.'), h('Phê duyệt', 'tpbt', '10:00 05/10/2026'), h('Từ chối phê duyệt', 'cuctruong', '15:00 05/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Bổ sung căn cứ xác định người thi hành công vụ.')]
            })),
            base('XD-2026-108', Object.assign(person('Lý Thị Ngọc', '11/12/1988', '001188003322', '0912000108', 'ngoc.lt@gmail.com', 'Tỉnh Lâm Đồng', '24781 - Phường Lâm Viên - Đà Lạt', 'Số 10 Phan Đình Phùng'), {
                status: STATUS.CHO_CHUYEN, date: '15/08/2026', receivedAt: '08:00 15/08/2026', chuTri: 'canbonv', phoiHop: [], nycGender: 'Nữ', linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ',
                hanhVi: 'Cưỡng chế giao tài sản không đúng đối tượng.', routes: btpRoutes('canbonv', []),
                procBasis: 'Khoản 2 Điều 40 Luật TNBTCNN', procTargetAgency: 'Cục Thi hành án dân sự tỉnh Lâm Đồng', procReason: 'Hành vi do Chấp hành viên Cục THADS tỉnh Lâm Đồng thực hiện.',
                approval: { kind: 'Hoàn thành xác định', content: '', files: [], path: ['PLN-02', 'CĐK-01', 'BTP-01'], level: 2, done: true, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '09:00 01/10/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Phê duyệt', note: '', at: '14:00 01/10/2026' }, { unitId: 'BTP-01', userId: 'oanhdh', action: 'Phê duyệt', note: '', at: '09:00 02/10/2026' }], submittedBy: 'canbonv', submittedAt: '08:00 01/10/2026', pending: null },
                history: [h('Trình phê duyệt', 'canbonv', '08:00 01/10/2026', 'Hoàn thành xác định.'), h('Phê duyệt', 'tpbt', '09:00 01/10/2026'), h('Phê duyệt', 'cuctruong', '14:00 01/10/2026'), h('Phê duyệt', 'oanhdh', '09:00 02/10/2026', 'Phê duyệt cấp cuối (Bộ Tư pháp): Hoàn thành xác định. Hồ sơ chuyển [Chờ chuyển CQGQBT].')]
            })),
            base('XD-2026-109', Object.assign(person('Mạc Văn Toàn', '05/05/1970', '001070001199', '0912000109', '', 'Tỉnh Lâm Đồng', '24784 - Xã Đức Trọng', 'Thôn 3'), {
                status: STATUS.CHO_CHUYEN, date: '12/08/2026', receivedAt: '08:00 12/08/2026', chuTri: 'canbonv', phoiHop: [], linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ',
                hanhVi: 'Áp dụng biện pháp khẩn cấp tạm thời không đúng.', routes: btpRoutes('canbonv', []),
                procBasis: 'Khoản 2 Điều 40 Luật TNBTCNN', procTargetAgency: 'Tòa án nhân dân tỉnh Lâm Đồng', procReason: 'Thẩm phán Tòa án nhân dân tỉnh Lâm Đồng ra quyết định áp dụng.',
                approval: { kind: 'Hoàn thành xác định', content: '', files: [], path: ['PLN-02', 'CĐK-01', 'BTP-01'], level: 2, done: true, steps: [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '09:00 28/09/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Phê duyệt', note: '', at: '10:00 28/09/2026' }, { unitId: 'BTP-01', userId: 'khoiml', action: 'Phê duyệt', note: '', at: '15:00 28/09/2026' }], submittedBy: 'canbonv', submittedAt: '08:00 28/09/2026', pending: null },
                history: [h('Phê duyệt', 'khoiml', '15:00 28/09/2026', 'Phê duyệt cấp cuối (Bộ Tư pháp): Hoàn thành xác định. Hồ sơ chuyển [Chờ chuyển CQGQBT].')]
            })),
            base('XD-2026-110', Object.assign(person('Tô Thị Hạnh', '14/07/1987', '001187005566', '0912000110', 'hanh.tt@gmail.com', 'Thành phố Hà Nội', '00010 - Phường Thanh Xuân', 'Số 70 Nguyễn Tuân'), {
                status: STATUS.HOAN_THANH, date: '01/08/2026', receivedAt: '08:00 01/08/2026', chuTri: 'canbonv', phoiHop: [], nycGender: 'Nữ',
                hanhVi: 'Thu hồi giấy chứng nhận quyền sử dụng đất trái pháp luật.', routes: btpRoutes('canbonv', []),
                procBasis: 'Khoản 1 Điều 35 Luật TNBTCNN', procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội', procReason: 'Quyết định thu hồi do UBND quận Cầu Giấy ban hành.', claimCode: 'BT-2026-201',
                transfer: { content: 'Chuyển hồ sơ để UBND quận Cầu Giấy thụ lý giải quyết theo thẩm quyền.', files: [{ name: 'Van_ban_chuyen_ho_so_XD-2026-110.pdf' }], at: '10:00 20/09/2026', by: 'canbonv', ycbtCode: 'BT-2026-201', targetUnitId: 'UBND-CG' },
                history: [h('Chuyển CQGQBT', 'canbonv', '10:00 20/09/2026', 'Chuyển UBND quận Cầu Giấy, Thành phố Hà Nội; tạo hồ sơ YCBT BT-2026-201.')]
            })),
            // Hồ sơ YCBT sinh ra từ XD-2026-110, chờ lãnh đạo UBND quận Cầu Giấy phân công
            Object.assign(person('Tô Thị Hạnh', '14/07/1987', '001187005566', '0912000110', 'hanh.tt@gmail.com', 'Thành phố Hà Nội', '00010 - Phường Thanh Xuân', 'Số 70 Nguyễn Tuân'), {
                id: 'WF-BT-2026-201', code: 'BT-2026-201', module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo: 'Xác định CQGQBT', xdCode: 'XD-2026-110',
                rootUnitId: 'UBND-CG', currentUnitId: 'UBND-CG', status: STATUS.CHO_PHAN_CONG, nycGender: 'Nữ', nycRole: 'Người bị thiệt hại',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Thu hồi giấy chứng nhận quyền sử dụng đất trái pháp luật.', hinhThucNhan: 'Phương thức điện tử',
                date: '20/09/2026', receivedAt: '10:00 20/09/2026', createdBy: 'canbonv',
                attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-110.pdf' }],
                transferContent: 'Chuyển hồ sơ để UBND quận Cầu Giấy thụ lý giải quyết theo thẩm quyền.', transferFiles: [{ name: 'Van_ban_chuyen_ho_so_XD-2026-110.pdf' }],
                routes: [], chuTri: null, phoiHop: [], approval: null,
                history: [h('Nhận hồ sơ từ Xác định CQGQBT', 'canbonv', '10:00 20/09/2026', 'Hồ sơ XD-2026-110 chuyển đến. Chờ lãnh đạo UBND quận Cầu Giấy, Thành phố Hà Nội phân công.')]
            }),
            // Phiếu trình mẫu của phân hệ Giải quyết yêu cầu bồi thường (Chờ duyệt / Bị trả lại theo từng Nội dung trình)
            ...(() => {
                const P = ['PLN-02', 'CĐK-01', 'BTP-01'];
                const gq = (code, nyc, status, extra) => Object.assign({
                    id: 'WF-' + code, code, module: 'YCBT', loaiYeuCau: REQUEST_TYPE_YCBT, nguonHoSo: 'Tiếp nhận', nycName: nyc, nyc,
                    rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', status, chuTri: 'canbonv', phoiHop: [], routes: btpRoutes('canbonv'),
                    linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', approval: null, returned: null, history: []
                }, extra);
                const appr = (kind, content, level, steps, assignees, at, more) => Object.assign({
                    kind, content, files: [], draftDoc: null, resultStatus: '', action: null, prevStatus: 'Chờ thụ lý',
                    path: P, level, steps, assignees, submittedBy: 'canbonv', submittedAt: at, pending: { since: at }
                }, more || {});
                return [
                    gq('BT-2026-020', 'Trần Văn Q', STATUS.CHO_PHE_DUYET, {
                        approval: appr('Tiếp nhận hồ sơ', 'Hồ sơ đầy đủ, đề nghị tiếp nhận và thụ lý.', 0, [], ['tpbt'], '08:30 09/10/2026', { prevStatus: 'Chờ tiếp nhận', resultStatus: 'Chờ thụ lý' }),
                        history: [h('Trình phê duyệt', 'canbonv', '08:30 09/10/2026', 'Tiếp nhận hồ sơ. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-019', 'Phạm Văn P', STATUS.CHO_PHE_DUYET, {
                        approval: appr('Yêu cầu bổ sung', 'Đề nghị người yêu cầu bổ sung bản sao bản án có hiệu lực và chứng từ chứng minh thiệt hại thu nhập.', 0, [], ['tpbt'], '10:00 09/10/2026', { resultStatus: 'Chờ phát hành văn bản' }),
                        history: [h('Trình phê duyệt', 'canbonv', '10:00 09/10/2026', 'Yêu cầu bổ sung. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-018', 'Trần Thu O', STATUS.CHO_PHE_DUYET, {
                        ktlReasonCode: 'KTL_02',
                        approval: appr('Không thụ lý', 'Không thụ lý hồ sơ yêu cầu bồi thường theo khoản 1 Điều 43 Luật TNBTCNN.', 1,
                            [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '15:00 08/10/2026' }], ['tpbt', 'cuctruong'], '09:00 08/10/2026', { resultStatus: 'Không thụ lý' }),
                        history: [h('Trình phê duyệt', 'canbonv', '09:00 08/10/2026', 'Không thụ lý. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.'), h('Phê duyệt', 'tpbt', '15:00 08/10/2026', 'Phê duyệt cấp Phòng Quản lý nghiệp vụ về bồi thường nhà nước; chuyển Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-029', 'Đỗ Thị Ngọc', STATUS.CHO_PHE_DUYET, {
                        approval: appr('Chuyển CQGQBT', 'Hành vi gây thiệt hại thuộc phạm vi trách nhiệm của UBND quận Cầu Giấy; đề nghị chuyển hồ sơ.', 0, [], ['tpbt'], '14:00 09/10/2026',
                            { resultStatus: 'Đã chuyển CQGQBT', action: { type: 'transfer', targetUnitId: 'UBND-CG', content: 'Chuyển hồ sơ để UBND quận Cầu Giấy giải quyết theo thẩm quyền.', files: [] } }),
                        history: [h('Trình phê duyệt', 'canbonv', '14:00 09/10/2026', 'Chuyển CQGQBT. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
                    }),
                    gq('BT-2026-021', 'Hoàng Văn R', STATUS.BI_TRA_LAI, {
                        approval: appr('Tiếp nhận hồ sơ', '', 0, [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Từ chối phê duyệt', note: 'Bổ sung bản chụp giấy tờ tùy thân của người yêu cầu.', at: '16:00 08/10/2026' }], ['tpbt'], '09:30 08/10/2026', { prevStatus: 'Chờ tiếp nhận', pending: null }),
                        returned: { reason: 'Bổ sung bản chụp giấy tờ tùy thân của người yêu cầu.', by: 'tpbt', unitId: 'PLN-02', at: '16:00 08/10/2026', kind: 'Tiếp nhận hồ sơ', prevStatus: 'Chờ tiếp nhận' },
                        history: [h('Trình phê duyệt', 'canbonv', '09:30 08/10/2026', 'Tiếp nhận hồ sơ.'), h('Từ chối phê duyệt', 'tpbt', '16:00 08/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Bổ sung bản chụp giấy tờ tùy thân của người yêu cầu.')]
                    }),
                    gq('BT-2026-030', 'Bùi Văn Khánh', STATUS.BI_TRA_LAI, {
                        approval: appr('Yêu cầu bổ sung', '', 1, [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Phê duyệt', note: '', at: '10:00 07/10/2026' }, { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Từ chối phê duyệt', note: 'Nội dung yêu cầu bổ sung cần nêu rõ thời hạn và căn cứ pháp lý.', at: '15:30 07/10/2026' }], ['tpbt', 'cuctruong'], '08:00 07/10/2026', { pending: null }),
                        returned: { reason: 'Nội dung yêu cầu bổ sung cần nêu rõ thời hạn và căn cứ pháp lý.', by: 'cuctruong', unitId: 'CĐK-01', at: '15:30 07/10/2026', kind: 'Yêu cầu bổ sung', prevStatus: 'Chờ thụ lý' },
                        history: [h('Trình phê duyệt', 'canbonv', '08:00 07/10/2026', 'Yêu cầu bổ sung.'), h('Phê duyệt', 'tpbt', '10:00 07/10/2026'), h('Từ chối phê duyệt', 'cuctruong', '15:30 07/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Nội dung yêu cầu bổ sung cần nêu rõ thời hạn và căn cứ pháp lý.')]
                    })
                ];
            })()
        ];
    }

    global.BTNN_WF = {
        KEYS: { RECORDS: KEY_RECORDS, FLOW: KEY_FLOW, USER: KEY_USER },
        CATALOG_TYPE, STATUS, SUBMIT_KINDS, APPROVAL_KINDS, KTL_CATALOG_TYPE, DEFAULT_KTL_REASONS, XD_AUTHORITY_UNITS, REQUEST_TYPE_XD, REQUEST_TYPE_YCBT,
        ORG_UNITS, USERS, DEFAULT_REQUEST_TYPES,
        getUnit, unitName, getChildren, getRootId, getAncestors, getDescendants, getRootUnits, unitTreeLabel, searchUnits, mountUnitTree,
        getUser, userName, userLabel, usersInUnitTree,
        getCurrentUserId, getCurrentUser, setCurrentUser,
        getFlowConfig, saveFlowConfig, resetFlowConfig, getNodeConfig, getLeaders, isLeaderOf, isUnitConfigured, findRootUnitByName,
        getRequestTypeCatalog, getRequestTypesForUser, getKtlReasons, xdAuthorityType, ensureClaimRecord,
        loadRecords, saveRecords, getRecord, upsertRecord, removeRecord, addHistory, nextCode, createPendingRecord,
        latestRoute, canEditAtReception, canAssign, markViewed, assignToUnit, assignToOfficers,
        getRecallInfo, recall, computeApprovalPath, submitForApproval, canApprove, isLastApprovalLevel, nextLevelLeaders, firstLevelLeaders, approvalKindOf, approvalLabel, approvalPathText, approvalPathLineHtml, KIND_KQXD, approve, rejectApproval, performTransfer,
        transferToAgency, getLeaderTasks,
        statusBadge, routeText, routeStateText, renderRoutesHtml, renderHistoryHtml, renderApprovalHtml,
        docHeaderHtml, docPageHtml, openDocTab, downloadDocWord,
        draftDocName, draftBaseName, submittedDraftName, buildSupplementDraftHtml, previewDraftDoc, downloadDraftDoc, downloadSelectHtml, previewDraftDocByCode, downloadDraftDocByCode, renderDraftDocHtml, previewSubmittedDraft, downloadSubmittedDraft,
        mountUserSwitcher, nowText, dateText, esc
    };
})(window);
