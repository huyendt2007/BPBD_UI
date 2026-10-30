let mockClaims = [
    {
        code: "BT-2026-002",
        nyc: "Trần Thị B",
        role: "Người thừa kế của người bị thiệt hại",
        gender: "Nữ",
        birth: "20/10/1990",
        nycVictimAlive: "yes",
        cardType: "CMND/CCCD/Chứng minh quân đội",
        cardNo: "002092003845",
        cardDate: "10/02/2023",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0904888999",
        email: "tranthib@example.com",
        address: "Số 88 đường Lạch Tray, Ngô Quyền, Hải Phòng",
        agency: "Tòa án nhân dân TP. Hà Nội",
        field: "Trong hoạt động tố tụng hình sự",
        amount: 350000000,
        status: "Xác minh thiệt hại",
        suggestedAdvance: 100000000,

        // Advance details
        advanceTinhThan: 60000000,
        advanceKhac: 40000000,
        advanceTinhThanFile: "Giay_to_tam_ung_tinh_than_BT02.pdf",
        advanceKhacFile: "Bao_cao_ton_that_tai_san_BT02.pdf",
        advanceRecKenh: "chuyen-khoan",
        advanceBankUser: "TRẦN THỊ B",
        advanceBankAccount: "190333444555",
        advanceBankName: "Techcombank",
        advanceBankBranch: "Chi nhánh Hải Phòng"
    },
    {
        code: "BT-2026-015",
        nyc: "Phạm Văn C",
        role: "Người bị thiệt hại",
        gender: "Nam",
        birth: "15/04/1985",
        nycVictimAlive: "yes",
        cardType: "CMND/CCCD/Chứng minh quân đội",
        cardNo: "001085002934",
        cardDate: "12/12/2020",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0912345678",
        email: "phamvanc@example.com",
        address: "Số 15 đường Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        agency: "UBND phường Cầu Giấy",
        field: "Trong hoạt động quản lý hành chính",
        amount: 150000000,
        status: "Xác minh thiệt hại",
        suggestedAdvance: 50000000,

        // Advance details
        advanceTinhThan: 30000000,
        advanceKhac: 20000000,
        advanceTinhThanFile: "Don_tam_ung_tinh_than_BT15.pdf",
        advanceKhacFile: "Bao_cao_ton_that_tai_san_BT15.pdf",
        advanceRecKenh: "tien-mat"
    },
    {
        code: "BT-2026-005",
        nyc: "Lê Văn D",
        role: "Người bị thiệt hại",
        gender: "Nam",
        birth: "10/02/1988",
        nycVictimAlive: "yes",
        cardType: "CMND/CCCD/Chứng minh quân đội",
        cardNo: "001089004823",
        cardDate: "15/08/2021",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0911556677",
        email: "levand@example.com",
        address: "Số 234 Láng Hạ, Đống Đa, Hà Nội",
        agency: "Sở Tư pháp Hải Phòng",
        field: "Trong hoạt động tố tụng hành chính",
        amount: 250000000,
        status: "Chờ chi trả",
        advanceRecKenh: "chuyen-khoan",
        advanceBankUser: "LÊ VĂN D",
        advanceBankAccount: "123456789012",
        advanceBankName: "Vietcombank",
        advanceBankBranch: "Chi nhánh Đống Đa",

        // Damage breakdown
        selectedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 150000000,
            chiPhiKhac: 20000000
        }
    },
    {
        code: "BT-2026-011",
        nyc: "Trần Thị G",
        role: "Người bị thiệt hại",
        gender: "Nữ",
        birth: "12/06/1992",
        nycVictimAlive: "yes",
        cardType: "CMND/CCCD/Chứng minh quân đội",
        cardNo: "001095002934",
        cardDate: "20/05/2022",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0904556677",
        email: "tranthig@example.com",
        address: "Phường Tràng Tiền, Hoàn Kiếm, Hà Nội",
        agency: "Sở Tư pháp Hà Nội",
        field: "Trong hoạt động quản lý hành chính",
        amount: 300000000,
        status: "Chờ chi trả",

        // Damage breakdown
        selectedDamages: {
            taiSan: 100000000,
            sucKhoe: 80000000,
            tinhThan: 120000000
        }
    },
    {
        code: "BT-2026-028",
        nyc: "Hoàng Văn Thái",
        role: "Người bị thiệt hại",
        gender: "Nam",
        birth: "18/08/1987",
        nycVictimAlive: "yes",
        cardType: "CMND/CCCD/Chứng minh quân đội",
        cardNo: "001087009988",
        cardDate: "12/03/2021",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0988776655",
        email: "hoangvanthai@example.com",
        address: "Số 45 Hoàng Hoa Thám, Ba Đình, Hà Nội",
        agency: "Tòa án nhân dân TP. Hà Nội",
        field: "Trong hoạt động tố tụng hình sự",
        amount: 320000000,
        status: "Xác minh thiệt hại",
        suggestedAdvance: 90000000,
        advanceTinhThan: 50000000,
        advanceKhac: 40000000,
        advanceTinhThanFile: "Don_tam_ung_tinh_than_BT28.pdf",
        advanceKhacFile: "Bao_cao_ton_that_tai_san_BT28.pdf",
        advanceRecKenh: "chuyen-khoan",
        advanceBankUser: "HOÀNG VĂN THÁI",
        advanceBankAccount: "001100456789",
        advanceBankName: "Vietcombank",
        advanceBankBranch: "Chi nhánh Ba Đình"
    },
    {
        code: "BT-2026-029",
        nyc: "Nguyễn Thị Mai",
        role: "Người bị thiệt hại",
        gender: "Nữ",
        birth: "05/11/1982",
        nycVictimAlive: "yes",
        cardType: "CMND/CCCD/Chứng minh quân đội",
        cardNo: "001082006789",
        cardDate: "15/09/2021",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0977223344",
        email: "nguyenthimai@example.com",
        address: "Số 112 Nguyễn Trãi, Thanh Xuân, Hà Nội",
        agency: "Sở Tư pháp Hà Nội",
        field: "Trong hoạt động quản lý hành chính",
        amount: 280000000,
        status: "Chờ chi trả",
        advanceRecKenh: "chuyen-khoan",
        advanceBankUser: "NGUYỄN THỊ MAI",
        advanceBankAccount: "190223344556",
        advanceBankName: "Techcombank",
        advanceBankBranch: "Chi nhánh Thanh Xuân",
        selectedDamages: {
            taiSan: 80000000,
            thuNhap: 50000000,
            tinhThan: 150000000
        }
    }
];

// MOCK PROPOSALS LIST DATA (29 items covering ALL 8 statuses in September 2026)
let proposalsList = [
    // ===== 1. TRẠNG THÁI: ĐÃ HỦY (02 bản ghi) =====
    {
        id: "P90",
        code: "KP-2026-090",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-007",
        nycName: "Phạm Văn D",
        nycRole: "Người bị thiệt hại",
        amount: 180000000,
        user: "Nguyễn Văn Thụ",
        date: "03/09/2026",
        status: "Đã hủy",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Đề nghị cấp kinh phí bồi thường bị hủy do Quyết định giải quyết bồi thường gốc bị hủy.",
        baseDecisionNo: "45/QĐ-GQBT",
        baseDecisionDate: "25/08/2026",
        statusChangeBasis: {
            decisionType: "Quyết định hủy quyết định giải quyết bồi thường",
            decisionNo: "12/QĐ-HQĐGQBT",
            decisionDate: "03/09/2026",
            reason: "Hủy quyết định gốc do nội dung quyết định không còn phù hợp với kết quả xác minh bổ sung.",
            statusBefore: "Chờ duyệt",
            statusAfter: "Đã hủy",
            changedAt: "03/09/2026 14:35"
        },
        files: []
    },
    {
        id: "P26",
        code: "KP-2026-026",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-028",
        nycName: "Hoàng Văn Thái",
        nycRole: "Người bị thiệt hại",
        amount: 45000000,
        user: "Nguyễn Văn Thụ",
        date: "13/09/2026",
        status: "Đã hủy",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đề nghị tạm ứng bị hủy do người yêu cầu đã tự nguyện rút đơn yêu cầu bồi thường.",
        statusChangeBasis: {
            decisionType: "Quyết định đình chỉ giải quyết bồi thường",
            decisionNo: "18/QĐ-ĐCGQBT",
            decisionDate: "13/09/2026",
            reason: "Đình chỉ giải quyết do người yêu cầu rút toàn bộ yêu cầu bồi thường.",
            statusBefore: "Chờ duyệt",
            statusAfter: "Đã hủy",
            changedAt: "13/09/2026 10:20"
        },
        files: []
    },

    // ===== 2. TRẠNG THÁI: CHỜ THU HỒI (02 bản ghi) =====
    {
        id: "P91",
        code: "KP-2026-091",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-007",
        nycName: "Phạm Văn D",
        nycRole: "Người bị thiệt hại",
        amount: 40000000,
        user: "Nguyễn Văn Thụ",
        date: "04/09/2026",
        status: "Chờ thu hồi",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Khoản tạm ứng đã chi trả xong, phát sinh nghĩa vụ thu hồi do Quyết định giải quyết bồi thường bị hủy.",
        payoutDate: "06/09/2026",
        payoutAmountReal: 40000000,
        payoutMethod: "Nhận qua chuyển khoản",
        payoutRecName: "Phạm Văn D",
        statusChangeBasis: {
            decisionType: "Quyết định hủy quyết định giải quyết bồi thường",
            decisionNo: "12/QĐ-HQĐGQBT",
            decisionDate: "04/09/2026",
            reason: "Hủy quyết định gốc do nội dung quyết định không còn phù hợp với kết quả xác minh bổ sung.",
            statusBefore: "Hoàn thành",
            statusAfter: "Chờ thu hồi",
            changedAt: "04/09/2026 14:35"
        },
        recovery: {
            basisDecisionNo: "12/QĐ-HQĐGQBT",
            basisDecisionDate: "04/09/2026",
            amountToRecover: 40000000,
            amountRecovered: 15000000,
            amountRemain: 25000000,
            recordDate: "10/09/2026",
            note: "Đơn vị đã thu hồi một phần, phần còn lại đang tiếp tục đôn đốc hoàn trả ngân sách.",
            files: [{ name: "Chứng từ thu hồi đợt 1", file: "Chung_tu_thu_hoi_dot1.pdf" }]
        },
        files: []
    },
    {
        id: "P25",
        code: "KP-2026-025",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-064",
        nycName: "Đỗ Văn Khải",
        nycRole: "Người bị thiệt hại",
        amount: 90000000,
        user: "Lê Văn Nam",
        date: "01/10/2026",
        status: "Chờ thu hồi",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Khoản kinh phí chi trả thừa cần thu hồi do Quyết định sửa chữa giảm số tiền bồi thường.",
        payoutDate: "02/10/2026",
        payoutAmountReal: 90000000,
        payoutMethod: "Nhận qua chuyển khoản",
        payoutRecName: "ĐỖ VĂN KHẢI",
        recovery: {
            basisDecisionNo: "21/QĐ-SCBSGQBT",
            basisDecisionDate: "08/10/2026",
            amountToRecover: 90000000,
            amountRecovered: 30000000,
            amountRemain: 60000000,
            recordDate: "12/10/2026",
            note: "Đang yêu cầu đương sự hoàn nộp 60.000.000 VNĐ tiền thừa vào kho bạc.",
            files: [{ name: "Biên lai thu hồi đợt 1", file: "Bien_lai_thu_hoi_P25.pdf" }]
        },
        files: []
    },

    // ===== 3. TRẠNG THÁI: CHỜ LẬP ĐỀ NGHỊ (03 bản ghi) =====
    {
        id: "P92",
        code: "KP-2026-092",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-002",
        nycName: "Phạm Văn Minh",
        nycRole: "Người thừa kế của người bị thiệt hại",
        amount: 95000000,
        user: "Nguyễn Văn Thụ",
        date: "03/09/2026",
        status: "Chờ lập đề nghị",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Bản ghi được đưa về Chờ lập đề nghị để lập lại theo Quyết định sửa chữa, bổ sung.",
        baseDecisionNo: "52/QĐ-GQBT",
        baseDecisionDate: "01/09/2026",
        files: []
    },
    {
        id: "P5",
        code: "KP-2026-005",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        nycRole: "Người thừa kế của người bị thiệt hại",
        amount: 50000000,
        user: "Lê Văn Nam",
        date: "06/09/2026",
        status: "Chờ lập đề nghị",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Tờ trình cấp tạm ứng bồi thường chi phí y tế khẩn cấp.",
        files: [],
        advApproveTinhThan: 30000000,
        advApproveKhac: 20000000
    },
    {
        id: "P6",
        code: "KP-2026-006",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-005",
        nycName: "Lê Văn D",
        nycRole: "Người bị thiệt hại",
        amount: 300000000,
        user: "Lê Văn Nam",
        date: "09/09/2026",
        status: "Chờ lập đề nghị",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Tờ trình kinh phí bồi thường theo Quyết định 104/QĐ-BT.",
        files: [],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 150000000,
            chiPhiKhac: 20000000
        }
    },

    // ===== 4-5. TRẠNG THÁI: CHỜ DUYỆT / BỊ TRẢ LẠI =====
    // Bỏ bản ghi mẫu kiểu cũ Chờ duyệt / Bị trả lại không có Loại trình (P3, P4, P21, P22, P7, P8, P23, P95).
    // Bản ghi Chờ duyệt / Bị trả lại mẫu: QĐ tạm ứng (quan_ly_kinh_phi_qdtu.js), Thông báo chi trả (quan_ly_kinh_phi_kptb.js), đều có Loại trình.
    // ===== 6. TRẠNG THÁI: CHỜ CHI TRẢ (04 bản ghi - Gồm 3 khoản Quá hạn 3 năm) =====
    {
        id: "P2",
        code: "KP-2026-002",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        nycRole: "Người thừa kế của người bị thiệt hại",
        amount: 100000000,
        user: "Nguyễn Văn Thụ",
        date: "04/09/2026",
        status: "Chờ chi trả",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Cấp tạm ứng bồi thường thiệt hại cho bà Trần Thị B. Đã gửi thông báo nhưng quá hạn 3 năm chưa đến nhận.",
        files: [
            { name: "Tờ trình đề xuất cấp kinh phí", file: "De_xuat_tam_ung_B.pdf" },
            { name: "Quyết định phê duyệt tạm ứng", file: "Quyet_dinh_duyet_tam_ung_002.pdf" }
        ],
        advApproveTinhThan: 60000000,
        advApproveKhac: 40000000,
        leaderOpinion: "Đồng ý cấp tạm ứng kinh phí bồi thường cho bà Trần Thị B.",
        approvedDate: "05/09/2026 09:15",
        approvedLeader: "Lãnh đạo cơ quan",
        noticeReceivedDate: "01/09/2023",
        noticeProofFile: "Thong_bao_nhan_tam_ung_B.pdf"
    },
    {
        id: "P9",
        code: "KP-2026-009",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-005",
        nycName: "Lê Văn D",
        nycRole: "Người bị thiệt hại",
        amount: 150000000,
        user: "Nguyễn Văn Thụ",
        date: "07/09/2026",
        status: "Chờ chi trả",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Tờ trình cấp phát kinh phí bồi thường bổ sung đã thông qua, quá hạn 3 năm người nhận chưa đến nhận.",
        files: [
            { name: "Tờ trình đề xuất cấp kinh phí bồi thường", file: "To_trinh_bo_sung_LeVanD.pdf" },
            { name: "Quyết định phê duyệt kinh phí bồi thường", file: "Quyet_dinh_duyet_kinh_phi_009.pdf" }
        ],
        approvedDamages: {
            taiSan: 30000000,
            thuNhap: 20000000,
            tinhThan: 80000000,
            chiPhiKhac: 20000000
        },
        leaderOpinion: "Đồng ý cấp phát kinh phí bồi thường bổ sung cho ông Lê Văn D.",
        approvedDate: "08/09/2026 14:20",
        approvedLeader: "Lãnh đạo cơ quan",
        noticeReceivedDate: "15/07/2023",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_bo_sung_LeVanD.pdf"
    },
    {
        id: "P13",
        code: "KP-2026-013",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-003-A",
        nycName: "Công ty ABC",
        nycRole: "Người đại diện theo ủy quyền",
        amount: 200000000,
        user: "Nguyễn Văn Thụ",
        date: "10/09/2026",
        status: "Chờ chi trả",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Khoản kinh phí bồi thường đã thông báo nhận nhưng quá hạn 3 năm người yêu cầu chưa đến nhận, đủ điều kiện trả lại ngân sách nhà nước.",
        leaderOpinion: "Đồng ý cấp kinh phí bồi thường theo quyết định đã ban hành.",
        files: [{ name: "Tờ trình kinh phí Công ty ABC", file: "To_trinh_KPBT_H.pdf" }],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 80000000,
            chiPhiKhac: 40000000
        },
        payoutDate: "",
        payoutAmountReal: 0,
        payoutRecName: "Công ty ABC",
        payoutRecAddress: "Phường Minh Khai, Bắc Từ Liêm, Hà Nội",
        noticeReceivedDate: "10/06/2023",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_H.pdf"
    },
    {
        id: "P14",
        code: "KP-2026-014",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-053",
        nycName: "Công ty Cổ phần Vận tải Thăng Long",
        nycRole: "Người bị thiệt hại",
        amount: 250000000,
        user: "Nguyễn Văn Thụ",
        date: "17/09/2026",
        status: "Chờ chi trả",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Khoản tạm ứng đã phê duyệt, trong hạn 3 năm chờ đương sự đến nhận.",
        leaderOpinion: "Đồng ý cấp tạm ứng theo hồ sơ đủ điều kiện.",
        files: [{ name: "Tờ trình tạm ứng Công ty Cổ phần Vận tải Thăng Long", file: "To_trinh_tam_ung_K.pdf" }],
        advApproveTinhThan: 150000000,
        advApproveKhac: 100000000,
        payoutRecName: "Công ty Cổ phần Vận tải Thăng Long",
        payoutRecAddress: "Xã An Khánh, Hoài Đức, Hà Nội",
        noticeReceivedDate: "01/03/2024",
        noticeProofFile: "Thong_bao_nhan_tam_ung_K.pdf",
        noticeNote: "Đã gửi thông báo nhận kinh phí bằng văn bản cho người yêu cầu."
    },

    // ===== 7. TRẠNG THÁI: TRẢ LẠI NGÂN SÁCH NHÀ NƯỚC (02 bản ghi) =====
    {
        id: "P15",
        code: "KP-2026-015",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-003-B",
        nycName: "Ông Nguyễn Văn D",
        nycRole: "Người thừa kế của người bị thiệt hại",
        amount: 120000000,
        user: "Lê Văn Nam",
        date: "08/09/2026",
        status: "Trả lại ngân sách nhà nước",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Khoản kinh phí bồi thường đã hoàn tất trả lại ngân sách nhà nước do người yêu cầu không nhận sau hạn 3 năm.",
        leaderOpinion: "Phê duyệt trả lại ngân sách nhà nước theo đề nghị của cán bộ xử lý.",
        files: [{ name: "Tờ trình cấp kinh phí Ông Nguyễn Văn D", file: "To_trinh_KPBT_M.pdf" }],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 20000000,
            tinhThan: 30000000,
            chiPhiKhac: 20000000
        },
        payoutAmountReal: 0,
        payoutRecName: "Ông Nguyễn Văn D",
        payoutRecAddress: "Phường Cầu Diễn, Nam Từ Liêm, Hà Nội",
        noticeReceivedDate: "05/01/2023",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_M.pdf",
        treasuryForfeitDate: "18/09/2026",
        treasuryVoucherNo: "SQ-2026-015",
        treasuryAmount: 120000000,
        treasuryReason: "Người yêu cầu bồi thường không nhận kinh phí sau 3 năm kể từ ngày nhận thông báo.",
        treasuryFile: "Chung_tu_sung_quy_KP_2026_015.pdf"
    },
    {
        id: "P24",
        code: "KP-2026-024",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-058",
        nycName: "Vũ Thị Lan Anh",
        nycRole: "Người bị thiệt hại",
        amount: 80000000,
        user: "Nguyễn Văn Thụ",
        date: "14/09/2026",
        status: "Trả lại ngân sách nhà nước",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Khoản tạm ứng đã quá hạn 3 năm, đã thực hiện nộp trả lại ngân sách nhà nước.",
        leaderOpinion: "Phê duyệt trả lại ngân sách nhà nước theo tờ trình số 12/TTr-KP.",
        files: [{ name: "Tờ trình trả lại ngân sách nhà nước P24", file: "To_trinh_sung_quy_P24.pdf" }],
        payoutAmountReal: 0,
        payoutRecName: "Vũ Thị Lan Anh",
        noticeReceivedDate: "10/02/2023",
        treasuryForfeitDate: "20/09/2026",
        treasuryVoucherNo: "SQ-2026-024",
        treasuryAmount: 80000000,
        treasuryReason: "Quá thời hạn 03 năm không đến nhận tiền tạm ứng bồi thường.",
        treasuryFile: "Chung_tu_sung_quy_KP_2026_024.pdf"
    },

    // ===== 8. TRẠNG THÁI: HOÀN THÀNH (09 bản ghi) =====
    {
        id: "P1",
        code: "KP-2026-001",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-005",
        nycName: "Lê Văn D",
        nycRole: "Người bị thiệt hại",
        amount: 250000000,
        user: "Nguyễn Văn Thụ",
        date: "02/09/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Trình duyệt chi trả kinh phí bồi thường cho vụ việc của ông Lê Văn D.",
        leaderOpinion: "Đồng ý phê duyệt tờ trình đề xuất kinh phí bồi thường của ông Lê Văn D.",
        files: [{ name: "Tờ trình chi trả Lê Văn D", file: "To_trinh_chi_tra_Le_Van_D_signed.pdf" }],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 150000000,
            chiPhiKhac: 20000000
        },
        payoutDate: "05/09/2026",
        payoutAmountReal: 250000000,
        payoutMethod: "Nhận qua chuyển khoản",
        payoutRecName: "Lê Văn D",
        payoutRecAddress: "Số 234 Láng Hạ, Đống Đa, Hà Nội",
        payoutBankAccount: "123456789012",
        payoutBankUser: "LÊ VĂN D",
        payoutBankName: "Vietcombank",
        payoutBankBranch: "Chi nhánh Đống Đa",
        payoutFile: "Chung_tu_chi_tra_KP_LeVanD.pdf",
        noticeReceivedDate: "03/09/2026",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_LeVanD.pdf"
    },
    {
        id: "P10",
        code: "KP-2026-010",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-010",
        nycName: "Nguyễn Văn F",
        nycRole: "Người bị thiệt hại",
        amount: 50000000,
        user: "Nguyễn Văn Thụ",
        date: "05/09/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đã hoàn thành cấp tạm ứng bồi thường cho ông Nguyễn Văn F.",
        leaderOpinion: "Đồng ý tạm ứng 50.000.000 VNĐ.",
        files: [{ name: "Tờ trình tạm ứng Nguyễn Văn F", file: "To_trinh_tam_ung_C.pdf" }],
        advApproveTinhThan: 30000000,
        advApproveKhac: 20000000,
        payoutDate: "08/09/2026",
        payoutAmountReal: 50000000,
        payoutMethod: "Tiền mặt",
        payoutRecName: "Nguyễn Văn F",
        payoutRecAddress: "Số 15 đường Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        payoutReceiptNo: "BL-2026-088",
        payoutFile: "Bien_lai_chi_tam_ung_C.pdf",
        noticeReceivedDate: "06/09/2026",
        noticeProofFile: "Thong_bao_nhan_tam_ung_C.pdf"
    },
    {
        id: "P11",
        code: "KP-2026-011",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        nycRole: "Người thừa kế của người bị thiệt hại",
        amount: 100000000,
        user: "Nguyễn Văn Thụ",
        date: "12/09/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đã hoàn thành cấp tạm ứng bồi thường cho bà Trần Thị B.",
        leaderOpinion: "Đồng ý cấp tạm ứng 100 triệu.",
        files: [{ name: "Tờ trình tạm ứng Trần Thị B", file: "To_trinh_tam_ung_B.pdf" }],
        advApproveTinhThan: 60000000,
        advApproveKhac: 40000000,
        payoutDate: "15/09/2026",
        payoutAmountReal: 100000000,
        payoutMethod: "Nhận qua chuyển khoản",
        payoutRecName: "Trần Thị B",
        payoutRecAddress: "Số 88 đường Lạch Tray, Ngô Quyền, Hải Phòng",
        payoutBankAccount: "190333444555",
        payoutBankName: "Techcombank",
        payoutBankUser: "TRẦN THỊ B",
        payoutFile: "Bien_lai_chuyen_khoan_tam_ung_B.pdf",
        noticeReceivedDate: "13/09/2026",
        noticeProofFile: "Thong_bao_nhan_tam_ung_B_hoan_thanh.pdf"
    },
    {
        id: "P12",
        code: "KP-2026-012",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-011",
        nycName: "Trần Thị G",
        nycRole: "Người bị thiệt hại",
        amount: 300000000,
        user: "Lê Văn Nam",
        date: "13/09/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Đã thực hiện chi trả kinh phí bồi thường tiền mặt cho bà Trần Thị G.",
        leaderOpinion: "Đồng ý phê duyệt cấp kinh phí bồi thường.",
        files: [{ name: "Tờ trình kinh phí bồi thường", file: "To_trinh_KPBT_G.pdf" }],
        approvedDamages: {
            taiSan: 100000000,
            sucKhoe: 80000000,
            tinhThan: 120000000
        },
        payoutDate: "16/09/2026",
        payoutAmountReal: 300000000,
        payoutMethod: "Tiền mặt",
        payoutRecName: "Trần Thị G",
        payoutRecAddress: "Phường Tràng Tiền, Hoàn Kiếm, Hà Nội",
        payoutReceiptNo: "BL-2026-099",
        payoutFile: "Bien_lai_chi_tra_tien_mat_G.pdf",
        noticeReceivedDate: "14/09/2026",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_G.pdf"
    },
    {
        id: "P16",
        code: "KP-2026-016",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-012",
        nycName: "Lê Văn H",
        nycRole: "Người bị thiệt hại",
        amount: 450000000,
        user: "Nguyễn Văn Thụ",
        date: "16/09/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Chi trả kinh phí bồi thường trong hoạt động thi hành án dân sự cho ông Lê Văn H.",
        leaderOpinion: "Đồng ý chi trả kinh phí theo đúng bản án có hiệu lực pháp luật.",
        files: [{ name: "Tờ trình chi trả Lê Văn H", file: "To_trinh_KPBT_DoQuocCuong.pdf" }],
        approvedDamages: {
            taiSan: 100000000,
            thuNhap: 120000000,
            tinhThan: 180000000,
            chiPhiKhac: 50000000
        },
        payoutDate: "18/09/2026",
        payoutAmountReal: 450000000,
        payoutMethod: "Nhận qua chuyển khoản",
        payoutRecName: "LÊ VĂN H",
        payoutRecAddress: "Số 45 phố Hai Bà Trưng, Hoàn Kiếm, Hà Nội",
        payoutBankAccount: "001100456789",
        payoutBankUser: "LÊ VĂN H",
        payoutBankName: "Vietcombank",
        payoutBankBranch: "Sở Giao Dịch",
        payoutFile: "Uy_nhiem_chi_DoQuocCuong_VCB.pdf",
        noticeReceivedDate: "17/09/2026",
        noticeProofFile: "Giay_bao_nhan_DoQuocCuong.pdf",
        payoutNote: "Đã hoàn tất thủ tục ủy nhiệm chi số 045/UNC-TC chuyển tiền bồi thường vào tài khoản Vietcombank."
    },
    {
        id: "P17",
        code: "KP-2026-017",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-022",
        nycName: "Trần Văn Phú",
        nycRole: "Người đại diện hợp pháp",
        amount: 85000000,
        user: "Lê Văn Nam",
        date: "18/09/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Tạm ứng kinh phí cứu chữa, bồi hoàn chi phí y tế khẩn cấp cho người bị thiệt hại.",
        leaderOpinion: "Phê duyệt tạm ứng kịp thời hỗ trợ người dân.",
        files: [{ name: "Tờ trình tạm ứng Trần Văn Phú", file: "To_trinh_tam_ung_VuThiMai.pdf" }],
        advApproveTinhThan: 45000000,
        advApproveKhac: 40000000,
        payoutDate: "20/09/2026",
        payoutAmountReal: 85000000,
        payoutMethod: "Nhận tiền mặt",
        payoutRecName: "Trần Văn Phú",
        payoutRecAddress: "Tổ 12, phường Phúc Diễn, Bắc Từ Liêm, Hà Nội",
        payoutReceiptNo: "BL-TM-2026/089",
        payoutFile: "Phieu_chi_tien_mat_VuThiMai_signed.pdf",
        noticeReceivedDate: "19/09/2026",
        noticeProofFile: "Thong_bao_nhan_tam_ung_VuThiMai.pdf",
        payoutNote: "Đã giao trực tiếp tiền mặt 85.000.000 VNĐ tại bộ phận kế toán, người nhận đã ký nhận đầy đủ biên lai."
    },
    {
        id: "P18",
        code: "KP-2026-018",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-003-A",
        nycName: "Công ty ABC",
        nycRole: "Người bị thiệt hại",
        amount: 520000000,
        user: "Nguyễn Văn Thụ",
        date: "19/09/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Chi trả bồi thường tài sản và thu nhập thực tế bị mất do quyết định hành chính trái pháp luật.",
        leaderOpinion: "Đồng ý giải ngân toàn bộ kinh phí theo quyết định giải quyết bồi thường.",
        files: [{ name: "Tờ trình chi trả Công ty ABC", file: "To_trinh_KPBT_NgoVanHung.pdf" }],
        approvedDamages: {
            taiSan: 250000000,
            thuNhap: 150000000,
            tinhThan: 80000000,
            chiPhiKhac: 40000000
        },
        payoutDate: "21/09/2026",
        payoutAmountReal: 520000000,
        payoutMethod: "Nhận qua chuyển khoản",
        payoutRecName: "CÔNG TY ABC",
        payoutRecAddress: "Số 78 đường Quang Trung, Hà Đông, Hà Nội",
        payoutBankAccount: "034567891011",
        payoutBankUser: "CÔNG TY ABC",
        noticeReceivedDate: "20/09/2026",
        noticeProofFile: "Phieu_bao_phat_NgoVanHung.pdf",
        payoutNote: "Đã hoàn thành chuyển khoản 100% kinh phí bồi thường qua tài khoản ngân hàng BIDV."
    },
    {
        id: "P19",
        code: "KP-2026-019",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-024",
        nycName: "Bùi Thị Ngọc",
        nycRole: "Người thừa kế của người bị thiệt hại",
        amount: 175000000,
        user: "Lê Văn Nam",
        date: "20/09/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Chi trả bồi thường tổn thất tinh thần và chi phí mai táng cho thân nhân người bị thiệt hại.",
        leaderOpinion: "Duyệt chi trả kinh phí theo đúng văn bản phân chia di sản thừa kế.",
        files: [{ name: "Tờ trình chi trả Bùi Thị Ngọc", file: "To_trinh_KPBT_BuiThiNgoc.pdf" }],
        approvedDamages: {
            taiSan: 0,
            thuNhap: 25000000,
            tinhThan: 100000000,
            chiPhiKhac: 50000000
        },
        payoutDate: "21/09/2026",
        payoutAmountReal: 175000000,
        payoutMethod: "Nhận qua chuyển khoản",
        payoutRecName: "BÙI THỊ NGỌC",
        payoutRecAddress: "Số 12 ngõ 89 Thái Hà, Đống Đa, Hà Nội",
        payoutBankAccount: "19034567890123",
        payoutBankUser: "BÙI THỊ NGỌC",
        payoutBankName: "Techcombank",
        payoutBankBranch: "Chi nhánh Thăng Long",
        payoutFile: "Lenh_chuyen_tien_TCB_BuiThiNgoc.pdf",
        noticeReceivedDate: "20/09/2026",
        noticeProofFile: "Giay_xac_nhan_nhan_thong_bao_BuiThiNgoc.pdf",
        payoutNote: "Đã hoàn tất thanh toán chuyển khoản liên ngân hàng Techcombank."
    },
    {
        id: "P20",
        code: "KP-2026-020",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-025",
        nycName: "Dương Đình Trọng",
        nycRole: "Người bị thiệt hại",
        amount: 60000000,
        user: "Nguyễn Văn Thụ",
        date: "21/09/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Tạm ứng chi phí phục hồi sức khỏe và điều trị thương tích.",
        leaderOpinion: "Đồng ý duyệt tạm ứng theo quy định tại Điều 44 Luật TNBTCNN.",
        files: [{ name: "Tờ trình tạm ứng Dương Đình Trọng", file: "To_trinh_tam_ung_DuongDinhTrong.pdf" }],
        advApproveTinhThan: 30000000,
        advApproveKhac: 30000000,
        payoutDate: "21/09/2026",
        payoutAmountReal: 60000000,
        payoutMethod: "Nhận tiền mặt",
        payoutRecName: "Dương Đình Trọng",
        payoutRecAddress: "Số 9 phố Nguyễn Đình Chiểu, Hai Bà Trưng, Hà Nội",
        payoutReceiptNo: "BL-TM-2026/102",
        payoutFile: "Phieu_chi_TM_DuongDinhTrong_signed.pdf",
        noticeReceivedDate: "21/09/2026",
        noticeProofFile: "Bien_ban_giao_nhan_thong_bao_DuongDinhTrong.pdf",
        payoutNote: "Chi trả tiền mặt tại trụ sở cơ quan, ông Dương Đình Trọng đã trực tiếp ký nhận tiền mặt."
    },
    // ===== HÌNH THỨC KÝ ĐỀ NGHỊ TẠM ỨNG (Quyết định tạm ứng - Mẫu 07/BTNN) & TRẠNG THÁI ĐÃ THU HỒI =====
    {
        id: "P96", code: "KP-2026-096", type: "Cấp tạm ứng", ycbtCode: "BT-2026-059", nycName: "Lương Văn Khải", nycRole: "Người bị thiệt hại",
        amount: 25000000, user: "Lê Văn Nam", date: "08/10/2026", status: "Chờ chi trả",
        source: "Tạm ứng kinh phí Bộ Tài chính", cqCap: "Sở Tài chính Hà Nội",
        notes: "Đề nghị tạm ứng - Hình thức ký Ký ngoài: Quyết định tạm ứng đã ký ngoài, đã có văn bản đã ký, chờ chi trả.",
        advApproveTinhThan: 15000000, advApproveKhac: 10000000,
        signMethod: "Ký ngoài", docNo: "96/QĐ-STC", docDate: "10/10/2026", draftDoc: "Du_thao_QD_tam_ung_KP-2026-096.doc", signedFile: "QD_tam_ung_KP-2026-096_ky_ngoai.pdf",
        leaderOpinion: "Đồng ý cấp tạm ứng kinh phí bồi thường.", approvedDate: "10/10/2026 15:20", approvedLeader: "Lãnh đạo cơ quan",
        files: [{ name: "Tờ trình đề nghị tạm ứng", file: "To_trinh_tam_ung_P96.pdf" }]
    },
    {
        id: "P97", code: "KP-2026-097", type: "Cấp tạm ứng", ycbtCode: "BT-2026-028", nycName: "Hoàng Văn Thái", nycRole: "Người bị thiệt hại",
        amount: 45000000, user: "Lê Văn Nam", date: "06/10/2026", status: "Chờ chi trả",
        source: "Tạm ứng kinh phí Bộ Tài chính", cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đề nghị tạm ứng - Hình thức ký Ký số trên hệ thống: Quyết định tạm ứng đã được ký số khi Lãnh đạo ký duyệt.",
        advApproveTinhThan: 25000000, advApproveKhac: 20000000,
        signMethod: "Ký số", docNo: "118/QĐ-TA", docDate: "07/10/2026", draftDoc: "Du_thao_QD_tam_ung_KP-2026-097.doc",
        signedFile: "QD_tam_ung_KP-2026-097_ky_so.pdf", digitalSign: { by: "Lãnh đạo cơ quan", at: "07/10/2026 10:05", cert: "Chứng thư số của Lãnh đạo ký duyệt" },
        leaderOpinion: "Đồng ý cấp tạm ứng kinh phí bồi thường.", approvedDate: "07/10/2026 10:05", approvedLeader: "Lãnh đạo cơ quan",
        files: [{ name: "Tờ trình đề nghị tạm ứng", file: "To_trinh_tam_ung_P97.pdf" }]
    },
    {
        id: "P98", code: "KP-2026-098", type: "Cấp tạm ứng", ycbtCode: "BT-2026-002", nycName: "Trần Thị B", nycRole: "Người thừa kế của người bị thiệt hại",
        amount: 20000000, user: "Nguyễn Văn Thụ", date: "01/10/2026", status: "Đã thu hồi",
        source: "Tạm ứng kinh phí Bộ Tài chính", cqCap: "Sở Tư pháp Hà Nội",
        notes: "Khoản tạm ứng đã thu hồi đủ 100% do Quyết định giải quyết bồi thường bị hủy.",
        advApproveTinhThan: 12000000, advApproveKhac: 8000000,
        payoutDate: "03/10/2026", payoutAmountReal: 20000000, payoutMethod: "Nhận qua chuyển khoản", payoutRecName: "Trần Thị B",
        leaderOpinion: "Đồng ý cấp tạm ứng kinh phí bồi thường.", approvedDate: "02/10/2026 09:00", approvedLeader: "Lãnh đạo cơ quan",
        statusChangeBasis: { decisionType: "Quyết định hủy quyết định giải quyết bồi thường", decisionNo: "15/QĐ-HQĐGQBT", decisionDate: "05/10/2026",
            reason: "Hủy quyết định gốc theo kết quả xác minh bổ sung.", statusBefore: "Hoàn thành", statusAfter: "Chờ thu hồi", changedAt: "05/10/2026 10:00" },
        recovery: { basisDecisionNo: "15/QĐ-HQĐGQBT", basisDecisionDate: "05/10/2026", amountToRecover: 20000000, amountRecovered: 20000000, amountRemain: 0,
            recordDate: "12/10/2026", note: "Đã thu hồi đủ 100% số tiền tạm ứng.", files: [{ name: "Chứng từ thu hồi", file: "Chung_tu_thu_hoi_P98.pdf" }] },
        files: []
    }
];

// State control
let currentPage = 1;
let pageSize = 10;
let selectedProposalId = null;
let proposalAttachedDocs = [];
let payoutAttachedFile = null;
let noticeProofAttachedFile = null;
let noticeTrackingAttachedFile = [];
let treasuryAttachedFile = [];
let showTreasuryEligibleOnly = false;
let formEditingMode = false; // true only when the panel is opened to write new data (Lập/Cập nhật đề nghị)
const TREASURY_DEMO_TODAY = new Date(2026, 6, 21);
let activeKpiFilterKp = 'all';
let kpSortColumn = 'stt';
let kpSortDirection = 'asc';

function updateKpiCountersKp() {
    const scope = proposalsList.filter(kpInActiveTab);
    const all = scope.length;
    const pending = scope.filter(p => p.status === 'Chờ duyệt').length;
    const rejected = scope.filter(p => p.status === 'Bị trả lại' || (p.status && p.status.toLowerCase().includes('từ chối'))).length;

    const countAllEl = document.getElementById('countAll');
    const countPendingEl = document.getElementById('countPending');
    const countRejectedEl = document.getElementById('countRejected');

    if (countAllEl) countAllEl.innerText = all;
    if (countPendingEl) countPendingEl.innerText = pending;
    if (countRejectedEl) countRejectedEl.innerText = rejected;
}

function filterByKpiKinhPhi(type) {
    activeKpiFilterKp = type;
    document.querySelectorAll('#kpiStatsRow .stat-badge-btn').forEach(btn => btn.classList.remove('active'));

    if (type === 'all') {
        document.getElementById('kpiBtnAll')?.classList.add('active');
    } else if (type === 'Chờ duyệt') {
        document.getElementById('kpiBtnPending')?.classList.add('active');
    } else if (type === 'Bị trả lại') {
        document.getElementById('kpiBtnRejected')?.classList.add('active');
    }

    // Synchronize dropdown search status
    const statusSelect = document.getElementById('searchProposalStatus');
    if (statusSelect) {
        if (type === 'all') {
            statusSelect.value = '';
        } else if (type === 'Chờ duyệt') {
            statusSelect.value = 'Chờ duyệt';
        } else if (type === 'Bị trả lại') {
            statusSelect.value = 'Bị trả lại';
        }
    }

    currentPage = 1;
    renderProposalsTable();
}

function handleStatusSelectChange(val) {
    if (val === 'Chờ duyệt') {
        filterByKpiKinhPhi('Chờ duyệt');
    } else if (val === 'Bị trả lại') {
        filterByKpiKinhPhi('Bị trả lại');
    } else {
        activeKpiFilterKp = 'all';
        document.querySelectorAll('#kpiStatsRow .stat-badge-btn').forEach(btn => btn.classList.remove('active'));
        if (!val) {
            document.getElementById('kpiBtnAll')?.classList.add('active');
        }
        currentPage = 1;
        renderProposalsTable();
    }
}

function sortKinhPhiTable(col) {
    if (kpSortColumn === col) {
        kpSortDirection = kpSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        kpSortColumn = col;
        kpSortDirection = 'asc';
    }
    renderProposalsTable();
}

function updateKpSortIcons() {
    const cols = ['stt', 'code', 'ycbtCode', 'nycName', 'amount', 'date', 'status'];
    cols.forEach(c => {
        const icon = document.getElementById(`sortIcon_${c}`);
        if (!icon) return;
        if (c === kpSortColumn) {
            icon.className = kpSortDirection === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
            icon.style.opacity = '1';
            icon.style.color = 'var(--primary-light, #1e3a8a)';
        } else {
            icon.className = 'fa-solid fa-sort';
            icon.style.opacity = '0.4';
            icon.style.color = '';
        }
    });
}

function exportExcelKinhPhi() {
    showToast("Đang kết xuất danh sách đề xuất kinh phí bồi thường ra file Excel...", "success");
}

const CURRENT_PROPOSALS_VERSION = 'v41_20261030s2';

// Sync claimsList and proposalsList from localStorage on DOMContentLoaded
function syncFromLocalStorage() {
    // Force reset if version is old to fetch updated files and statuses
    const savedVersion = localStorage.getItem('proposals_version');
    if (savedVersion !== CURRENT_PROPOSALS_VERSION) {
        // Ghi dữ liệu mẫu trước, ghi phiên bản sau: localStorage đầy (QuotaExceededError) thì giữ phiên bản cũ để lần tải sau nạp lại,
        // không dừng hàm khởi tạo trang (danh sách vẫn vẽ từ dữ liệu mẫu trong trang)
        try {
            localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
            localStorage.setItem('proposals_version', CURRENT_PROPOSALS_VERSION);
        } catch (e) { console.warn('[BTNN] Không lưu được proposalsList vào localStorage:', e && e.name); }
    } else {
        const localProposals = localStorage.getItem('proposalsList');
        if (localProposals) {
            try {
                let parsed = JSON.parse(localProposals);
                if (Array.isArray(parsed) && parsed.length >= proposalsList.length) {
                    proposalsList = parsed;
                } else if (Array.isArray(parsed) && parsed.length) {
                    // Kho chỉ có một phần đề nghị (VD Lãnh đạo ký duyệt (vai trò Lãnh đạo đơn vị) trước khi mở phân hệ):
                    // giữ bản ghi đã lưu theo mã, bổ sung bản ghi mẫu còn thiếu
                    const saved = new Map(parsed.map(p => [p.id, p]));
                    proposalsList = proposalsList.map(p => saved.has(p.id) ? Object.assign({}, p, saved.get(p.id)) : p)
                        .concat(parsed.filter(p => !proposalsList.some(s => s.id === p.id)));
                    localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
                } else {
                    localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
                }
            } catch (e) {
                localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
            }
        } else {
            localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
        }
    }
    // Đồng nhất nhãn Phương thức chi trả: Nhận tiền mặt / Nhận qua chuyển khoản (dữ liệu cũ đã lưu)
    const PAY_LEGACY = { 'Chi trả trực tiếp bằng tiền mặt': 'Nhận tiền mặt', 'Tiền mặt': 'Nhận tiền mặt', 'Chi trả qua chuyển khoản': 'Nhận qua chuyển khoản', 'Chuyển khoản qua ngân hàng': 'Nhận qua chuyển khoản' };
    proposalsList.forEach(p => { if (p && PAY_LEGACY[p.payoutMethod]) p.payoutMethod = PAY_LEGACY[p.payoutMethod]; });
    // Đổi tên trạng thái: "Sung quỹ nhà nước" / "Đã sung quỹ" (dữ liệu cũ đã lưu) -> "Trả lại ngân sách nhà nước"
    const TLNS_LEGACY = ['Sung quỹ nhà nước', 'Đã sung quỹ'];
    if (proposalsList.some(p => p && TLNS_LEGACY.includes(p.status))) {
        proposalsList.forEach(p => { if (p && TLNS_LEGACY.includes(p.status)) p.status = 'Trả lại ngân sách nhà nước'; });
        localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
    }

    // 2. Load claimsList and map to mockClaims
    const localClaims = localStorage.getItem('claimsList');
    if (localClaims) {
        try {
            const claimsList = JSON.parse(localClaims);
            if (Array.isArray(claimsList) && claimsList.length > 0) {
                // Keep existing static claims in mockClaims that might not be in claimsList
                const existingCodes = new Set(claimsList.map(c => c ? c.code : null).filter(Boolean));
                const filteredMockClaims = mockClaims.filter(c => !existingCodes.has(c.code));

                // Map new ones
                const mappedClaims = claimsList.map(c => {
                    if (!c) return null;
                    const defaultClaim = mockClaims.find(dc => dc.code === c.code);
                    const total = c.totalNum || (defaultClaim ? defaultClaim.amount : 0);
                    return {
                        code: c.code,
                        nyc: c.nyc,
                        role: c.role || (defaultClaim ? defaultClaim.role : "Người bị thiệt hại"),
                        gender: c.gender || (defaultClaim ? defaultClaim.gender : "Nam"),
                        birth: c.birth || (defaultClaim ? defaultClaim.birth : "01/01/1980"),
                        nycVictimAlive: c.victimAlive || (defaultClaim ? defaultClaim.nycVictimAlive : "yes"),
                        cardType: c.cardType || (defaultClaim ? defaultClaim.cardType : "CMND/CCCD/Chứng minh quân đội"),
                        cardNo: c.cardNo || (defaultClaim ? defaultClaim.cardNo : ""),
                        cardDate: c.cardDate || (defaultClaim ? defaultClaim.cardDate : "01/01/2020"),
                        cardPlace: c.cardPlace || (defaultClaim ? defaultClaim.cardPlace : "Cục Cảnh sát QLHC về TTXH"),
                        phone: c.phone || (defaultClaim ? defaultClaim.phone : ""),
                        email: c.email || (defaultClaim ? defaultClaim.email : ""),
                        address: c.address || (defaultClaim ? defaultClaim.address : ""),
                        agency: c.agency || (defaultClaim ? defaultClaim.agency : "Sở Tư pháp Hà Nội"),
                        field: c.field || (defaultClaim ? defaultClaim.field : "Lĩnh vực khác"),
                        amount: total,
                        status: c.status,
                        suggestedAdvance: c.advanceNum || (defaultClaim ? defaultClaim.suggestedAdvance : 0),
                        
                        // Advance details
                        advanceTinhThan: c.advanceTinhThan || (defaultClaim ? defaultClaim.advanceTinhThan : 0),
                        advanceKhac: c.advanceKhac || (defaultClaim ? defaultClaim.advanceKhac : 0),
                        advanceTinhThanFile: c.advanceTinhThanFile || (defaultClaim ? defaultClaim.advanceTinhThanFile : null),
                        advanceKhacFile: c.advanceKhacFile || (defaultClaim ? defaultClaim.advanceKhacFile : null),
                        advanceRecKenh: c.advanceRecKenh || (defaultClaim ? defaultClaim.advanceRecKenh : "tien-mat"),
                        advanceBankUser: c.advanceBankUser || (defaultClaim ? defaultClaim.advanceBankUser : c.nyc),
                        advanceBankAccount: c.advanceBankAccount || (defaultClaim ? defaultClaim.advanceBankAccount : ""),
                        advanceBankName: c.advanceBankName || (defaultClaim ? defaultClaim.advanceBankName : ""),
                        advanceBankBranch: c.advanceBankBranch || (defaultClaim ? defaultClaim.advanceBankBranch : ""),
                        
                        // Damages
                        selectedDamages: c.selectedDamages || (defaultClaim ? defaultClaim.selectedDamages : {
                            taiSan: Math.floor(total * 0.4),
                            thuNhap: Math.floor(total * 0.2),
                            tuVong: 0,
                            sucKhoe: 0,
                            tinhThan: Math.floor(total * 0.3),
                            chiPhiKhac: Math.floor(total * 0.1)
                        })
                    };
                }).filter(Boolean);
                mockClaims = [...mappedClaims, ...filteredMockClaims];
            }
        } catch (err) {
            console.error("Error parsing localClaims:", err);
        }
    }

    // 3. Liên thông Theo dõi vụ việc tại Tòa án: tạo bản ghi "Chờ thông báo chi trả" cho vụ việc Đã có bản án/QĐ
    syncCourtCaseFundingRecords();
}

// ===================== Liên thông Theo dõi vụ việc tại Tòa án =====================
// Vụ việc có yêu cầu bồi thường bằng tiền chuyển "Đã có bản án/QĐ" -> 01 bản ghi Chi trả tiền bồi thường
// ở trạng thái "Chờ thông báo chi trả" (quan_ly_kinh_phi_kptb.js). Khóa chống trùng: courtCaseId (id vụ việc tại Tòa án), tạo đúng 01 lần / vụ việc tại Tòa án.
// Đã bỏ trạng thái "Chờ nhập liệu" và thao tác "Nhập liệu".
const COURT_CASES_KEY = 'btnn_court_cases_v1';
const COURT_STATUS_VERDICT = 'Đã có bản án/QĐ';
const COURT_DAMAGE_KEYS = ['taiSan', 'thuNhap', 'tuVong', 'sucKhoe', 'tinhThan', 'chiPhiKhac'];

function loadCourtCases() {
    try {
        const raw = localStorage.getItem(COURT_CASES_KEY);
        const list = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) ? list : [];
    } catch (e) {
        return [];
    }
}

function isCourtCaseNeedingFunding(c) {
    return !!c && !c.deleted && c.requestKind !== 'honor' && c.status === COURT_STATUS_VERDICT;
}

function courtCaseDamageMap(c) {
    const out = {};
    COURT_DAMAGE_KEYS.forEach(k => { out[k] = 0; });
    (c.damages || []).forEach(d => { if (d && d.key) out[d.key] = Number(d.amount) || 0; });
    return out;
}

function courtCaseUnitName(unitId) {
    return (window.BTNN_WF && typeof window.BTNN_WF.unitName === 'function') ? window.BTNN_WF.unitName(unitId) : (unitId || '');
}

function mapCourtCaseToClaim(c) {
    const n = c.nyc || {};
    const damages = courtCaseDamageMap(c);
    const total = COURT_DAMAGE_KEYS.reduce((s, k) => s + damages[k], 0);
    return {
        code: c.code,
        source: 'court',
        nyc: n.name || '',
        role: n.role || 'Người bị thiệt hại',
        gender: n.gender || 'Nam',
        birth: n.birth || '',
        nycVictimAlive: n.victimAlive || 'yes',
        cardType: n.cardType || 'CMND/CCCD/Chứng minh quân đội',
        cardNo: n.cardNo || '',
        cardDate: n.cardDate || '',
        cardPlace: n.cardPlace || '',
        phone: n.phone || '',
        email: n.email || '',
        country: n.country || 'Việt Nam',
        city: n.city || '',
        ward: '-',
        address: n.address || '',
        agency: c.agency || courtCaseUnitName(c.rootUnitId),
        field: 'Theo dõi vụ việc tại Tòa án',
        amount: total,
        status: c.status,
        suggestedAdvance: 0,
        advanceTinhThan: 0,
        advanceKhac: 0,
        advanceRecKenh: 'tien-mat',
        selectedDamages: damages,
        verdictNo: c.verdictNo || '',
        effectiveDate: c.effectiveDate || ''
    };
}

function nextKinhPhiCode() {
    const year = new Date().getFullYear();
    const re = new RegExp(`^KP-${year}-(\\d+)$`);
    let max = 0;
    proposalsList.forEach(p => {
        const m = String((p && p.code) || '').match(re);
        if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    return `KP-${year}-${String(max + 1).padStart(3, '0')}`;
}

function buildCourtFundingRecord(c) {
    const claim = mapCourtCaseToClaim(c);
    const d = new Date();
    const pad = v => String(v).padStart(2, '0');
    return {
        id: 'P_TA_' + c.id,
        code: nextKinhPhiCode(),
        type: 'Chi trả tiền bồi thường',
        ycbtCode: c.code,
        courtCaseCode: c.code,
        courtCaseId: c.id,
        origin: 'Theo dõi vụ việc tại Tòa án',
        nycName: claim.nyc,
        nycRole: claim.role,
        amount: claim.amount,
        user: c.updatedByName || c.createdByName || '',
        date: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`,
        status: 'Chờ thông báo chi trả',
        source: '',
        cqCap: '',
        agency: claim.agency,
        notes: '',
        baseDecisionNo: c.verdictNo || '',
        baseDecisionDate: c.effectiveDate || '',
        verdictSource: c.verdictSource || '',
        selectedDamages: claim.selectedDamages,
        files: (c.docs || []).filter(x => x && x.file).map(x => ({ name: x.name, file: x.file })),
        createdAt: `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
    };
}

// Bản ghi chi trả thuộc vụ việc tại Tòa án c: khóa courtCaseId (id vụ việc tại Tòa án); bản ghi cũ chưa có courtCaseId (khóa theo Mã vụ việc)
// thuộc vụ việc tại Tòa án đầu tiên cùng Mã vụ việc (01 Mã vụ việc có thể có nhiều vụ việc tại Tòa án)
function courtFundingMatches(p, c, courtCases) {
    if (!p || !c) return false;
    if (p.courtCaseId) return p.courtCaseId === c.id;
    if (p.courtCaseCode !== c.code) return false;
    const first = (courtCases || loadCourtCases()).find(x => x && x.code === c.code);
    return !first || first.id === c.id;
}

function syncCourtCaseFundingRecords() {
    const courtCases = loadCourtCases();
    if (!courtCases.length) return;
    let proposalsChanged = false;
    let casesChanged = false;
    courtCases.filter(isCourtCaseNeedingFunding).forEach(c => {
        if (!mockClaims.some(m => m.code === c.code)) mockClaims.push(mapCourtCaseToClaim(c));
        let p = proposalsList.find(x => courtFundingMatches(x, c, courtCases));
        if (p && !p.courtCaseId) { p.courtCaseId = c.id; proposalsChanged = true; }
        if (!p) {
            p = buildCourtFundingRecord(c);
            proposalsList.unshift(p);
            proposalsChanged = true;
        }
        if (c.fundingCode !== p.code) {
            c.fundingCode = p.code;
            c.fundingCreatedAt = p.createdAt;
            if (!Array.isArray(c.history)) c.history = [];
            c.history.push({ at: p.createdAt, userName: 'Hệ thống', action: 'Tạo bản ghi chi trả tiền bồi thường', note: `Hệ thống tạo bản ghi Chi trả tiền bồi thường ${p.code} ở trạng thái ${p.status}.` });
            casesChanged = true;
        }
    });
    if (proposalsChanged) localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
    if (casesChanged) localStorage.setItem(COURT_CASES_KEY, JSON.stringify(courtCases));
}

function isCourtCaseCode(code) {
    return loadCourtCases().some(c => c && c.code === code);
}

let lastProcessedUrl = '';

function checkAndHandleUrlParams() {
    const search = window.location.search;
    const hash = window.location.hash ? window.location.hash.substring(1) : '';
    const currentParams = search || (hash ? '?' + hash : '');
    if (!currentParams) return;

    const urlParams = new URLSearchParams(currentParams);
    const viewCode = urlParams.get('viewCode');
    if (!viewCode) return;

    const actionType = urlParams.get('actionType');
    const paramKey = `${viewCode}_${actionType}`;
    if (lastProcessedUrl === paramKey) return;
    lastProcessedUrl = paramKey;

    let prop = proposalsList.find(p => p.code === viewCode || p.ycbtCode === viewCode || p.id === viewCode);
    if (!prop) {
        const newId = "P_DYN_" + Date.now();
        prop = {
            id: newId,
            code: "KP-2026-DYN",
            type: "Cấp kinh phí bồi thường",
            ycbtCode: viewCode,
            nycName: "Nguyễn Văn Người Nhận",
            amount: 150000000,
            user: "Lê Văn Chuyên Viên",
            date: new Date().toLocaleDateString('vi-VN'),
            status: "Chờ chi trả",
            source: "Ngân sách địa phương (Dự phòng)",
            cqCap: "Sở Tài chính Hà Nội",
            notes: "Đề xuất kinh phí bồi thường được sinh tự động phục vụ liên kết module."
        };
        proposalsList.push(prop);
        saveProposalsToLocal();
    }

    if (prop) {
        // Bản ghi thuộc menu con còn lại (Tạm ứng kinh phí / Chi trả tiền bồi thường): chuyển menu con theo loại bản ghi
        kpSyncMenuTo(prop);
        if (actionType === 'payout' || actionType === 'pay') {
            payProposalDirect(prop.id);
        } else if (actionType === 'update') {
            updateProposalDirect(prop.id);
        } else if (actionType === 'forfeit' || actionType === 'treasury') {
            requestTreasuryForfeit(prop.id);
        } else if (typeof kpdtOpen === 'function') {
            kpdtOpen(prop.id, { noPush: true });
        } else {
            viewProposalDetail(prop.id);
        }
    }
}

// Start initialization
function initKinhPhiApp() {
    syncFromLocalStorage();
    flatpickr("#searchFromDate", { dateFormat: "d/m/Y", allowInput: true });
    flatpickr("#searchToDate", { dateFormat: "d/m/Y", allowInput: true });
    flatpickr("#formProposalDate", { dateFormat: "d/m/Y", allowInput: true });
    flatpickr("#formNycBirth", { dateFormat: "d/m/Y", allowInput: true });
    flatpickr("#formNycCardDate", { dateFormat: "d/m/Y", allowInput: true });

    // Default dates: first day of current month to current date (Rule 2)
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const sFrom = document.getElementById('searchFromDate');
    const sTo = document.getElementById('searchToDate');
    const fDate = document.getElementById('formProposalDate');
    if (sFrom) sFrom.value = formatDate(firstDayOfMonth);
    if (sTo) sTo.value = formatDate(today);
    if (fDate) fDate.value = formatDate(today);

    // Mở từ Dashboard Lãnh đạo: ?role=lanh-dao&tab=pending|done
    const dashQ = new URLSearchParams(window.location.search);
    if (dashQ.get("role") === "lanh-dao") { const rs = document.getElementById("roleSelector"); if (rs) rs.value = "lanh-dao"; }
    // Vai trò giả lập theo tài khoản đang đăng nhập (thuộc Nhóm lãnh đạo: Lãnh đạo) để badge tab Chờ xử lý và badge menu trái cùng vai trò
    else if (window.BTNN_WF && typeof kptbIsLeaderAccount === "function" && kptbIsLeaderAccount(BTNN_WF.getCurrentUserId())) { const rs = document.getElementById("roleSelector"); if (rs) rs.value = "lanh-dao"; }
    if (dashQ.get("tab")) kpActiveTab = /^(done|da-xu-ly)$/.test(dashQ.get("tab")) ? "done" : "pending";

    // Populate table on load
    renderProposalsTable();
    updateBudgetStats();
    updateKpiCountersKp();

    const urlParams = new URLSearchParams(window.location.search);
    const embed = urlParams.get('embed') === 'true';
    if (embed) {
        document.body.style.backgroundColor = 'white';
        document.body.style.padding = '0';
        document.body.style.margin = '0';

        const header = document.querySelector('.page-header');
        if (header) header.style.display = 'none';

        const stats = document.getElementById('dashboardStats');
        if (stats) stats.style.display = 'none';

        const list = document.getElementById('contentListProposals');
        if (list) list.style.display = 'none';

        const panel = document.getElementById('inlineProposalFormPanel');
        if (panel) {
            panel.style.boxShadow = 'none';
            panel.style.border = 'none';
            panel.style.margin = '0';
            panel.style.padding = '0';
            panel.style.backgroundColor = 'white';
        }

        const selectorBlock = document.getElementById('formSelectorBlock');
        if (selectorBlock) {
            selectorBlock.style.backgroundColor = 'white';
            selectorBlock.style.border = 'none';
            selectorBlock.style.padding = '0';
            selectorBlock.style.marginBottom = '15px';
        }

        const formBody = document.querySelector('#inlineProposalFormPanel .inline-form-body');
        if (formBody) {
            formBody.style.padding = '10px 0';
            formBody.style.maxHeight = 'none';
            formBody.style.overflowY = 'visible';
        }

        const formHeader = document.querySelector('#inlineProposalFormPanel .inline-form-header');
        if (formHeader) formHeader.style.display = 'none';

        const footer = document.querySelector('#inlineProposalFormPanel .inline-form-footer');
        if (footer) footer.style.display = 'none';
    }

    // Process viewCode / actionType parameters
    checkAndHandleUrlParams();

    // Bind keypress for quick claim code search
    const claimSearchInput = document.getElementById('formClaimSearchInput');
    if (claimSearchInput) {
        claimSearchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchClaimByCode();
            }
        });
    }
}

if (document.readyState !== 'loading') {
    initKinhPhiApp();
} else {
    document.addEventListener('DOMContentLoaded', initKinhPhiApp);
}
window.addEventListener('popstate', checkAndHandleUrlParams);
window.addEventListener('hashchange', checkAndHandleUrlParams);

// COLLAPSIBLE ACCORDION ENGINE (Section 4.3.3.2 SRS compliance)
function toggleAccordion(blockId) {
    const item = document.getElementById(blockId);
    if (!item) return;
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    const icon = item.querySelector('.accordion-icon');

    const isOpen = body && body.classList.contains('show');
    if (isOpen) {
        if (body) body.classList.remove('show');
        if (header) header.classList.remove('active');
        if (icon) icon.classList.remove('rotated');
    } else {
        if (body) body.classList.add('show');
        if (header) header.classList.add('active');
        if (icon) icon.classList.add('rotated');
    }
}

function setAccordionState(blockId, isOpen) {
    const item = document.getElementById(blockId);
    if (!item) return;
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    const icon = item.querySelector('.accordion-icon');

    if (isOpen) {
        if (body) body.classList.add('show');
        if (header) header.classList.add('active');
        if (icon) icon.classList.add('rotated');
    } else {
        if (body) body.classList.remove('show');
        if (header) header.classList.remove('active');
        if (icon) icon.classList.remove('rotated');
    }
}

// UPDATE STATISTICAL CARDS DYNAMICALLY (Exactly 3 cards complying with SRS)
function updateBudgetStats() {
    let totalCapPhat = 0;
    let totalChoChiTra = 0;
    let totalSungQuy = 0;

    proposalsList.forEach(p => {
        const amt = typeof p.amount === 'number' ? p.amount : parseFloat(String(p.amount).replace(/\D/g, '')) || 0;
        if (p.status === 'Hoàn thành') {
            totalCapPhat += (p.payoutAmountReal || amt);
        } else if (p.status === 'Chờ chi trả') {
            totalChoChiTra += amt;
        } else if (p.status === 'Trả lại ngân sách nhà nước' || p.status === 'Đã sung quỹ') {
            totalSungQuy += (p.treasuryAmount || amt);
        }
    });

    const elCapPhat = document.getElementById('statCapPhat');
    const elChoChiTra = document.getElementById('statChoChiTra');
    const elSungQuy = document.getElementById('statSungQuy');

    if (elCapPhat) elCapPhat.innerText = `${totalCapPhat.toLocaleString('vi-VN')} VNĐ`;
    if (elChoChiTra) elChoChiTra.innerText = `${totalChoChiTra.toLocaleString('vi-VN')} VNĐ`;
    if (elSungQuy) elSungQuy.innerText = `${totalSungQuy.toLocaleString('vi-VN')} VNĐ`;
}

function parseDateViGlobal(str) {
    if (!str) return null;
    const parts = str.split('/');
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d);
}

function formatDateViGlobal(date) {
    if (!date) return '';
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function addYearsToDate(date, years) {
    if (!date) return null;
    const next = new Date(date.getTime());
    next.setFullYear(next.getFullYear() + years);
    return next;
}

function diffDays(fromDate, toDate) {
    return Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
}

// Chi trả tiền bồi thường chi nhiều lần: Lịch sử chi trả (payHistory) - mỗi lần { no, payDate, amount, method, recName, ..., files, note, at, by }.
// Dữ liệu cũ chưa có payHistory: 01 lần chi theo kptbPayment / payoutDate (bỏ qua bản ghi Chờ chi trả - dữ liệu chi cũ đã bị đưa về Chờ chi trả)
function kpPayHistory(item) {
    if (!item) return [];
    if (Array.isArray(item.payHistory)) return item.payHistory;
    if (item.type !== 'Chi trả tiền bồi thường' || item.status === 'Chờ chi trả') return [];
    const p = item.kptbPayment;
    if (p && Number(p.amount) > 0) return [{ no: 1, payDate: p.payDate || item.payoutDate || '', amount: Number(p.amount), method: p.method || item.payoutMethod || '', recName: p.recName || '', files: p.files || [], note: p.note || '', at: p.at || '', by: p.by || '' }];
    if (item.payoutDate && Number(item.payoutAmountReal) > 0) return [{ no: 1, payDate: item.payoutDate, amount: Number(item.payoutAmountReal), method: item.payoutMethod || '', recName: item.payoutRecName || '', files: item.payoutFiles || [], note: item.payoutNote || '', at: '', by: '' }];
    return [];
}
// Số tiền đã chi (tổng các lần chi)
function kpPaidTotal(item) { return kpPayHistory(item).reduce((s, x) => s + (Number(x && x.amount) || 0), 0); }
function getPaidAmount(item) {
    // Chi trả tiền bồi thường: tổng đã chi các lần (bản ghi Chờ chi trả đã chi một phần vẫn có số đã chi)
    if (item && item.type === 'Chi trả tiền bồi thường' && Array.isArray(item.payHistory)) return kpPaidTotal(item);
    return item.status === 'Hoàn thành' ? (item.payoutAmountReal || item.amount || 0) : 0;
}

function getUnpaidAmount(item) {
    const amount = typeof item.amount === 'number' ? item.amount : parseFloat(String(item.amount).replace(/\D/g, '')) || 0;
    return Math.max(0, amount - getPaidAmount(item));
}

function normalizeFileList(value) {
    if (!value) return [];
    return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}

function addFilesToList(currentFiles, fileList) {
    const files = normalizeFileList(currentFiles);
    Array.from(fileList || []).forEach(file => {
        if (file && file.name && !files.includes(file.name)) {
            files.push(file.name);
        }
    });
    return files;
}

// Hạn nhận tiền = Ngày người yêu cầu nhận thông báo (noticeReceivedDate, Cán bộ nhập 01 lần) + 03 năm; chưa nhập thông báo thì chưa tính hạn
function getTreasuryInfo(item) {
    const noticeDate = parseDateViGlobal(item.noticeReceivedDate);
    const deadline = noticeDate ? addYearsToDate(noticeDate, 3) : null;
    const unpaid = getUnpaidAmount(item);
    const daysLeft = deadline ? diffDays(TREASURY_DEMO_TODAY, deadline) : null;
    const isWaitingPayout = item.status === 'Chờ chi trả';
    const isEligible = !!deadline && unpaid > 0 && isWaitingPayout && daysLeft < 0;
    const isWarning = !!deadline && unpaid > 0 && isWaitingPayout && daysLeft >= 0 && daysLeft <= 180;

    return {
        noticeDate,
        deadline,
        deadlineText: deadline ? formatDateViGlobal(deadline) : '',
        unpaid,
        daysLeft,
        isEligible,
        isWarning
    };
}

function renderTreasuryWarningPanel() {
    const panel = document.getElementById('treasuryWarningPanel');
    if (!panel) return;

    const eligible = proposalsList.filter(p => kpInMenu(p) && getTreasuryInfo(p).isEligible);

    if (eligible.length === 0) {
        panel.style.display = 'none';
        return;
    }

    const eligibleAmt = eligible.reduce((sum, p) => sum + getTreasuryInfo(p).unpaid, 0);
    panel.style.display = 'block';
    panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
            <div style="display:flex; align-items:flex-start; gap:10px;">
                <i class="fa-solid fa-triangle-exclamation" style="color:#ea580c; font-size:20px; margin-top:2px;"></i>
                <div>
                    <div style="font-weight:800; color:#9a3412;">Cảnh báo khoản chi đã quá hạn 3 năm</div>
                    <div style="font-size:12.5px; color:#9a3412; margin-top:3px;">
                        ${eligible.length} khoản Chờ chi trả đủ điều kiện xử lý trả lại ngân sách nhà nước, tổng số tiền ${eligibleAmt.toLocaleString('vi-VN')} VNĐ (Theo Điều 45 Luật TNBTCNN).
                    </div>
                </div>
            </div>
            <button class="btn btn-outline-primary" onclick="filterTreasuryEligible()" style="font-size:12.5px; padding:6px 12px;">
                <i class="fa-solid fa-filter"></i> Xem khoản cần xử lý
            </button>
        </div>
    `;
}

// Render dynamic content for Block 9: Theo dõi hạn nhận kinh phí / Trả lại ngân sách nhà nước
function renderTreasuryTrackingBlock(item) {
    const block = document.getElementById('block9_TreasuryTracking');
    if (!block) return;

    const unpaidEl = document.getElementById('treasuryTrackingUnpaidAmount');
    const statusEl = document.getElementById('treasuryTrackingStatusText');
    const daysEl = document.getElementById('treasuryTrackingDaysCount') || document.getElementById('treasuryTrackingDaysRemaining');
    const badgeEl = document.getElementById('treasuryTrackingStatusBadge');
    const noticeEl = document.getElementById('treasuryTrackingNoticeDate');
    const deadlineEl = document.getElementById('treasuryTrackingDeadlineDate');

    if (!item) return;

    const info = getTreasuryInfo(item);
    const isSungQuy = (item.status === 'Trả lại ngân sách nhà nước' || item.status === 'Đã sung quỹ');

    if (unpaidEl) {
        const unpaidAmt = isSungQuy ? (item.treasuryAmount || info.unpaid || 0) : info.unpaid;
        unpaidEl.value = (unpaidAmt || 0).toLocaleString('vi-VN');
    }

    if (noticeEl) noticeEl.innerText = item.noticeReceivedDate || '-';
    if (deadlineEl) deadlineEl.innerText = info.deadlineText || '-';

    let statusText = 'Chưa có thông báo';
    let badgeClass = 'badge badge-draft';
    let daysText = '-';

    if (isSungQuy) {
        statusText = 'Đã trả lại ngân sách nhà nước';
        badgeClass = 'badge badge-success';
        daysText = item.treasuryForfeitDate ? `Đã trả lại ngân sách nhà nước (${item.treasuryForfeitDate})` : 'Đã sung quỹ';
    } else if (!item.noticeReceivedDate) {
        statusText = 'Chưa gửi thông báo';
        badgeClass = 'badge badge-draft';
        daysText = '-';
    } else if (info.isEligible) {
        statusText = 'Đã quá hạn 3 năm (Đủ điều kiện trả lại ngân sách nhà nước)';
        badgeClass = 'badge badge-danger';
        daysText = `Quá hạn ${Math.abs(info.daysLeft)} ngày`;
    } else if (info.isWarning) {
        statusText = 'Sắp đến hạn 3 năm';
        badgeClass = 'badge badge-warning';
        daysText = `Còn ${info.daysLeft} ngày`;
    } else {
        statusText = 'Trong thời hạn 3 năm';
        badgeClass = 'badge badge-info';
        daysText = info.daysLeft !== null ? `Còn ${info.daysLeft} ngày` : '-';
    }

    if (statusEl) {
        statusEl.value = statusText;
        if (info.isEligible && !isSungQuy) {
            statusEl.style.color = 'var(--danger-color, #ef4444)';
            statusEl.style.fontWeight = '700';
        } else if (isSungQuy) {
            statusEl.style.color = '#7c3aed';
            statusEl.style.fontWeight = '700';
        } else if (info.isWarning) {
            statusEl.style.color = '#b45309';
            statusEl.style.fontWeight = '700';
        } else {
            statusEl.style.color = '#1e293b';
            statusEl.style.fontWeight = '600';
        }
    }

    if (daysEl) {
        if (daysEl.tagName === 'INPUT') {
            daysEl.value = daysText;
            if (info.isEligible && !isSungQuy) {
                daysEl.style.color = 'var(--danger-color, #ef4444)';
            } else if (isSungQuy) {
                daysEl.style.color = '#7c3aed';
            } else if (info.isWarning) {
                daysEl.style.color = '#b45309';
            } else {
                daysEl.style.color = '#15803d';
            }
        } else {
            if (info.daysLeft === null || isSungQuy) {
                daysEl.innerText = daysText;
            } else if (info.daysLeft < 0) {
                daysEl.innerHTML = `<span style="color: var(--danger-color); font-weight: 700;">Quá hạn ${Math.abs(info.daysLeft)} ngày</span>`;
            } else {
                daysEl.innerHTML = `<span style="color: ${info.daysLeft <= 180 ? '#B45309' : '#15803D'}; font-weight: 700;">Còn ${info.daysLeft} ngày</span>`;
            }
        }
    }

    if (badgeEl) {
        badgeEl.className = badgeClass;
        badgeEl.innerText = isSungQuy ? 'Đã trả lại ngân sách nhà nước' : (info.isEligible ? 'Đã quá hạn 3 năm' : (info.isWarning ? 'Sắp đến hạn' : (item.noticeReceivedDate ? 'Trong hạn 3 năm' : 'Chưa kích hoạt')));
    }
}

// Cột Hạn nhận / Trả lại ngân sách nhà nước trên Bảng MH01 chuẩn 5 trạng thái theo SRS Mục 4.3.3.2.1 dòng 95:
function renderTreasuryCell(item, info = getTreasuryInfo(item)) {
    const isSungQuy = (item.status === 'Trả lại ngân sách nhà nước' || item.status === 'Đã sung quỹ');
    if (isSungQuy) {
        const forfeitDate = item.treasuryForfeitDate || item.date || '-';
        return `
            <div style="font-weight:700; color:#7c3aed;"><i class="fa-solid fa-building-columns"></i> Đã trả lại ngân sách nhà nước</div>
            <div style="font-size:11.5px; color:#64748b;">${forfeitDate !== '-' ? `Ngày: ${forfeitDate}` : '-'}</div>
        `;
    }
    if (item.status === 'Hoàn thành') {
        const payDate = item.payoutDate || item.date || '-';
        return `
            <div style="font-weight:700; color:#15803d;"><i class="fa-solid fa-circle-check"></i> Đã chi trả đủ</div>
            <div style="font-size:11.5px; color:#64748b;">${payDate !== '-' ? `Ngày: ${payDate}` : '-'}</div>
        `;
    }
    if (!item.noticeReceivedDate || item.status === 'Chờ lập đề nghị' || item.status === 'Chờ duyệt' || item.status === 'Bị trả lại') {
        return `<span style="font-size:12px; color:#94a3b8;">-</span>`;
    }

    if (info.isEligible) {
        return `
            <div style="font-weight:800; color:#b91c1c;"><i class="fa-solid fa-triangle-exclamation"></i> Quá hạn ${Math.abs(info.daysLeft)} ngày</div>
            <div style="font-size:11.5px; color:#64748b;">Hạn nhận: ${info.deadlineText}</div>
        `;
    }

    return `
        <div style="font-weight:800; color:#0369a1;"><i class="fa-solid fa-clock"></i> Còn ${info.daysLeft} ngày</div>
        <div style="font-size:11.5px; color:#64748b;">Hạn nhận: ${info.deadlineText}</div>
    `;
}

function filterTreasuryEligible() {
    showTreasuryEligibleOnly = true;
    document.getElementById('searchProposalStatus').value = 'Chưa';
    currentPage = 1;
    if (!proposalsList.some(p => getTreasuryInfo(p).isEligible)) {
        showTreasuryEligibleOnly = false;
        showToast('Không có khoản nào đủ điều kiện trả lại ngân sách nhà nước.', 'info');
        renderProposalsTable();
        return;
    }
    renderProposalsTable();
    showToast('Đang hiển thị các khoản đủ điều kiện trả lại ngân sách nhà nước.', 'info');
}

function openLinkedClaimDetail(ycbtCode, courtCaseId) {
    // Vụ việc tại Tòa án: mở chi tiết tại màn hình Theo dõi vụ việc tại Tòa án, đúng vụ việc theo id (01 Mã vụ việc có thể có nhiều vụ việc tại Tòa án)
    if (courtCaseId || isCourtCaseCode(ycbtCode)) {
        const courtUrl = courtCaseId
            ? `theo_doi_vu_viec_toa_an.html?id=${encodeURIComponent(courtCaseId)}`
            : `theo_doi_vu_viec_toa_an.html?code=${encodeURIComponent(ycbtCode)}`;
        if (window.parent && window.parent !== window && typeof window.parent.openAdminModule === 'function') {
            window.parent.openAdminModule(courtUrl, 'theo_doi_vu_viec_toa_an.html');
            return;
        }
        window.location.href = courtUrl;
        return;
    }
    const detailUrl = `quan_ly_boi_thuong.html?id=${encodeURIComponent(ycbtCode)}&from=kinh_phi&returnUrl=${encodeURIComponent('quan_ly_kinh_phi_boi_thuong.html?v=1&menu=' + kpMenu())}`;
    const shellDetailUrl = detailUrl;
    const activeClaimUrl = 'quan_ly_boi_thuong.html';

    if (window.parent && window.parent !== window) {
        if (typeof window.parent.openAdminModule === 'function') {
            window.parent.openAdminModule(shellDetailUrl, activeClaimUrl);
            return;
        }
        window.parent.postMessage({
            type: 'admin:navigate',
            url: shellDetailUrl,
            activeUrl: activeClaimUrl
        }, '*');
        return;
    }

    window.location.href = detailUrl;
}

function forfeitProposalDirect(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;
    const info = getTreasuryInfo(item);
    if (!info.isEligible) {
        showToast('Khoản này chưa đủ điều kiện trả lại ngân sách nhà nước (chưa quá thời hạn 03 năm kể từ ngày người yêu cầu nhận thông báo).', 'warning');
        return;
    }

    viewProposalDetail(id);
    setTimeout(() => startTreasuryForfeitFromDetail(), 80);
}

function requestTreasuryForfeit(id) {
    forfeitProposalDirect(id);
}

function renderPayoutTreasuryResult(item) {
    const box = document.getElementById('payoutTreasuryResultBox');
    if (!box) return;

    if (!item || !item.noticeReceivedDate) {
        box.style.display = 'none';
        box.innerHTML = '';
        return;
    }

    const info = getTreasuryInfo(item);
    const hasTreasuryFlow = item.status === 'Đã sung quỹ' || info.isEligible || info.isWarning;
    if (!hasTreasuryFlow) {
        box.style.display = 'none';
        box.innerHTML = '';
        return;
    }

    let title = 'Theo dõi hạn nhận kinh phí';
    let color = '#a16207';
    let icon = 'fa-clock';
    if (item.status === 'Đã sung quỹ') {
        title = 'Đã trả lại ngân sách nhà nước';
        color = '#15803d';
        icon = 'fa-circle-check';
    } else if (info.isEligible) {
        title = 'Đủ điều kiện lập đề nghị trả lại ngân sách nhà nước';
        color = '#b91c1c';
        icon = 'fa-triangle-exclamation';
    }

    const treasuryAmount = item.treasuryAmount || info.unpaid;
    box.style.display = 'block';
    box.innerHTML = `
        <div style="font-weight:800; color:${color}; font-size:13px; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid ${icon}"></i> ${title}
        </div>
        <div class="grid-3-cols" style="font-size:12.5px;">
            <div>
                <div style="color:var(--text-muted);">Số tiền còn phải chi</div>
                <div style="font-weight:800; color:#334155;">${info.unpaid.toLocaleString('vi-VN')} VNĐ</div>
            </div>
            <div>
                <div style="color:var(--text-muted);">Số tiền trả lại ngân sách nhà nước</div>
                <div style="font-weight:800; color:${color};">${treasuryAmount.toLocaleString('vi-VN')} VNĐ</div>
            </div>
            <div>
                <div style="color:var(--text-muted);">Ngày trả lại ngân sách nhà nước</div>
                <div style="font-weight:700; color:#334155;">${item.treasuryForfeitDate || '-'}</div>
            </div>
        </div>
        <div style="font-size:12.5px; color:#475569; margin-top:10px;">
            <strong>Căn cứ:</strong> ${item.treasuryReason || `Quá hạn 3 năm kể từ ngày nhận thông báo (${item.noticeReceivedDate}), hạn nhận kinh phí ${info.deadlineText}.`}
            ${item.treasuryVoucherNo ? `<div style="margin-top:6px;"><strong>Chứng từ trả lại ngân sách nhà nước:</strong> ${item.treasuryVoucherNo}</div>` : ''}
        </div>
    `;
}

function renderNoticeTrackingFile(readOnly = false) {
    const link = document.getElementById('noticeTrackingFileLink');
    if (!link) return;

    const files = normalizeFileList(noticeTrackingAttachedFile);
    if (files.length > 0) {
        link.innerHTML = files.map((file, index) => `
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:${index === 0 ? 0 : 4}px;">
                <span style="font-weight:600; color:var(--text-color);">${file}</span>
                <span style="font-weight:600; font-size:12px; white-space:nowrap;">
                    <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;">Xem file</a>
                    ${readOnly ? '' : `<span style="color:#CBD5E1; margin:0 5px;">|</span><a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="removeNoticeTrackingFile(${index})"><i class="fa-regular fa-trash-can"></i> Xóa</a>`}
                </span>
            </div>
        `).join('');
        link.style.color = 'var(--text-color)';
    } else {
        link.innerText = 'Chưa có tệp thông báo';
        link.style.color = 'var(--text-muted)';
    }
}

function previewNoticeTrackingDeadline() {
    const input = document.getElementById('noticeTrackingDate');
    const deadlineInput = document.getElementById('noticeTrackingDeadline');
    const hint = document.getElementById('noticeTrackingHint');
    if (!input || !deadlineInput || !hint) return;

    const noticeDate = parseDateViGlobal(input.value.trim());
    const deadline = noticeDate ? addYearsToDate(noticeDate, 3) : null;
    deadlineInput.value = deadline ? formatDateViGlobal(deadline) : '';
    if (!deadline) {
        hint.innerText = 'Sau khi lưu ngày người yêu cầu nhận thông báo, hệ thống sẽ bắt đầu tính hạn 3 năm để cảnh báo trả lại ngân sách nhà nước nếu khoản chi vẫn ở trạng thái Chờ chi trả.';
        hint.style.color = '#9a3412';
        return;
    }

    const daysLeft = diffDays(TREASURY_DEMO_TODAY, deadline);
    if (daysLeft < 0) {
        hint.innerText = `Đã quá hạn ${Math.abs(daysLeft)} ngày so với mốc 3 năm. Nếu hồ sơ vẫn Chờ chi trả, có thể thực hiện trả lại ngân sách nhà nước.`;
        hint.style.color = '#b91c1c';
    } else {
        hint.innerText = `Còn ${daysLeft} ngày đến mốc 3 năm kể từ ngày người yêu cầu nhận thông báo.`;
        hint.style.color = daysLeft <= 180 ? '#a16207' : '#166534';
    }
}

function triggerNoticeTrackingUpload() {
    document.getElementById('noticeTrackingFileInput').click();
}

function handleNoticeTrackingFileChange(input) {
    if (input.files && input.files[0]) {
        noticeTrackingAttachedFile = addFilesToList(noticeTrackingAttachedFile, input.files);
        renderNoticeTrackingFile();
    }
}

function removeNoticeTrackingFile(index) {
    const files = normalizeFileList(noticeTrackingAttachedFile);
    if (typeof index === 'number') {
        files.splice(index, 1);
        noticeTrackingAttachedFile = files;
    } else {
        noticeTrackingAttachedFile = [];
    }
    document.getElementById('noticeTrackingFileInput').value = '';
    renderNoticeTrackingFile();
}

function renderNoticeTrackingSection(item, forceEditing = null) {
    const section = document.getElementById('sectionNoticeTracking');
    if (!section || !item) return;

    const block8 = document.getElementById('block8_NoticeTracking');
    const shouldShow = item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần' || item.status === 'Hoàn thành' || item.status === 'Trả lại ngân sách nhà nước' || item.status === 'Đã sung quỹ' || !!item.noticeReceivedDate;
    if (!shouldShow) {
        if (block8) block8.style.display = 'none';
        section.style.display = 'none';
        return;
    }

    if (block8) block8.style.display = 'block';
    section.style.display = 'block';

    const roleSelector = document.getElementById('roleSelector');
    const activeRole = roleSelector ? roleSelector.value : 'chuyen-vien';
    const canMaintainNotice = activeRole === 'chuyen-vien' && (item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần');
    const hasNotice = !!item.noticeReceivedDate && item.noticeReceivedDate.trim() !== '';

    let editing = false;
    if (forceEditing !== null) {
        editing = forceEditing;
        section.dataset.editing = editing ? 'true' : 'false';
    } else {
        editing = section.dataset.editing === 'true' || !hasNotice;
    }

    // Controls editable state
    const isFieldsEditable = canMaintainNotice && editing;
    const dateInput = document.getElementById('noticeTrackingDate');
    if (dateInput) {
        dateInput.value = item.noticeReceivedDate || '';
        dateInput.disabled = !isFieldsEditable;
    }
    const noteInput = document.getElementById('noticeTrackingNote');
    if (noteInput) {
        noteInput.value = item.noticeNote || '';
        noteInput.disabled = !isFieldsEditable;
    }

    const uploadBtn = document.getElementById('btnNoticeTrackingUpload');
    if (uploadBtn) {
        uploadBtn.style.display = isFieldsEditable ? 'inline-flex' : 'none';
        uploadBtn.disabled = !isFieldsEditable;
    }

    noticeTrackingAttachedFile = normalizeFileList(item.noticeProofFile);
    renderNoticeTrackingFile(!isFieldsEditable);
    previewNoticeTrackingDeadline();

    // Buttons at Khối 8
    const btnSave = document.getElementById('btnSaveNoticeTracking');
    const btnEdit = document.getElementById('btnEditNoticeTracking');
    const btnCancel = document.getElementById('btnCancelNoticeTracking');

    if (canMaintainNotice) {
        if (hasNotice && !editing) {
            // View mode with existing notice data: chỉ xem (thông tin thông báo nhập 01 lần, không sửa sau khi lưu)
            if (btnEdit) btnEdit.style.display = 'none';
            if (btnSave) btnSave.style.display = 'none';
            if (btnCancel) btnCancel.style.display = 'none';
        } else if (hasNotice && editing) {
            // Edit mode modifying existing notice data: Show "Lưu thông báo" and "Hủy"
            if (btnEdit) btnEdit.style.display = 'none';
            if (btnSave) btnSave.style.display = 'inline-flex';
            if (btnCancel) btnCancel.style.display = 'inline-flex';
        } else {
            // Initial input (no notice data yet): Show "Lưu thông báo"
            if (btnEdit) btnEdit.style.display = 'none';
            if (btnSave) btnSave.style.display = 'inline-flex';
            if (btnCancel) btnCancel.style.display = 'none';
        }
    } else {
        if (btnEdit) btnEdit.style.display = 'none';
        if (btnSave) btnSave.style.display = 'none';
        if (btnCancel) btnCancel.style.display = 'none';
    }
}

function editNoticeTracking() {
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (!item || item.noticeReceivedDate) return; // Thông tin thông báo nhập 01 lần, không sửa sau khi lưu
    clearFieldErrors();
    const section = document.getElementById('sectionNoticeTracking');
    if (section) section.dataset.editing = 'true';
    renderNoticeTrackingSection(item, true);
    setAccordionState('block8_NoticeTracking', true);
    setTimeout(() => {
        const dateInput = document.getElementById('noticeTrackingDate');
        if (dateInput) dateInput.focus();
    }, 100);
}

function cancelNoticeTracking() {
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (!item) return;
    clearFieldErrors();
    const section = document.getElementById('sectionNoticeTracking');
    if (section) section.dataset.editing = 'false';
    renderNoticeTrackingSection(item, false);
}

function saveNoticeTracking() {
    clearFieldErrors();
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (!item) return;

    const noticeDateText = document.getElementById('noticeTrackingDate').value.trim();
    const noticeDate = parseDateViGlobal(noticeDateText);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    let hasError = false;
    if (!noticeDateText) {
        showFieldError('noticeTrackingDate', 'Đây là trường bắt buộc');
        hasError = true;
    } else if (!noticeDate) {
        showFieldError('noticeTrackingDate', 'Ngày không hợp lệ, vui lòng nhập dd/mm/yyyy');
        hasError = true;
    } else if (noticeDate > today) {
        showFieldError('noticeTrackingDate', 'Ngày người yêu cầu nhận thông báo không được lớn hơn ngày hiện tại');
        hasError = true;
    }

    if (normalizeFileList(noticeTrackingAttachedFile).length === 0) {
        const link = document.getElementById('noticeTrackingFileLink');
        if (link) {
            link.style.color = 'var(--danger-color)';
            link.innerText = 'Vui lòng đính kèm tài liệu chứng minh đã thông báo';
        }
        hasError = true;
    }

    if (hasError) return;

    item.noticeReceivedDate = noticeDateText;
    item.noticeProofFile = normalizeFileList(noticeTrackingAttachedFile);
    item.noticeNote = document.getElementById('noticeTrackingNote').value.trim();
    item.treasuryDeadline = formatDateViGlobal(addYearsToDate(noticeDate, 3));

    saveProposalsToLocal();
    const section = document.getElementById('sectionNoticeTracking');
    if (section) section.dataset.editing = 'false';
    renderNoticeTrackingSection(item, false);
    renderTreasuryTrackingBlock(item);
    renderProposalsTable();
    showToast('Lưu thông tin thông báo chi trả tiền bồi thường thành công!', 'success');
}

function renderTreasuryFile(readOnly = false) {
    const link = document.getElementById('treasuryFileLink');
    if (!link) return;
    const files = normalizeFileList(treasuryAttachedFile);
    if (files.length > 0) {
        link.innerHTML = files.map((file, index) => `
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:${index === 0 ? 0 : 4}px;">
                <span style="font-weight:600; color:var(--text-color);">${file}</span>
                <span style="font-weight:600; font-size:12px; white-space:nowrap;">
                    <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;">Xem file</a>
                    ${readOnly ? '' : `<span style="color:#CBD5E1; margin:0 5px;">|</span><a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="removeTreasuryFile(${index})"><i class="fa-regular fa-trash-can"></i> Xóa</a>`}
                </span>
            </div>
        `).join('');
        link.style.color = 'var(--text-color)';
    } else {
        link.innerText = 'Chưa có tài liệu trả lại ngân sách nhà nước';
        link.style.color = 'var(--text-color)';
    }
}

function triggerTreasuryFileUpload() {
    document.getElementById('treasuryFileInput').click();
}

function handleTreasuryFileChange(input) {
    if (input.files && input.files[0]) {
        treasuryAttachedFile = addFilesToList(treasuryAttachedFile, input.files);
        renderTreasuryFile();
    }
}

function removeTreasuryFile(index) {
    const files = normalizeFileList(treasuryAttachedFile);
    if (typeof index === 'number') {
        files.splice(index, 1);
        treasuryAttachedFile = files;
    } else {
        treasuryAttachedFile = [];
    }
    document.getElementById('treasuryFileInput').value = '';
    renderTreasuryFile();
}

function resetTreasuryForfeitForm() {
    const section = document.getElementById('sectionTreasuryForfeit');
    if (section) section.style.display = 'none';
    ['treasuryVoucherNo', 'treasuryForfeitDate', 'treasuryForfeitAmount', 'treasuryForfeitReason'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = '';
            el.disabled = false;
        }
    });
    const uploadBtn = document.getElementById('btnTreasuryFileUpload');
    if (uploadBtn) {
        uploadBtn.style.display = 'inline-flex';
        uploadBtn.disabled = false;
    }
    treasuryAttachedFile = [];
    renderTreasuryFile();
}

function startTreasuryForfeitFromDetail() {
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (!item) return;
    const info = getTreasuryInfo(item);
    if (!info.isEligible) {
        showToast('Chỉ được trả lại ngân sách nhà nước khi hồ sơ Chờ chi trả đã quá hạn 3 năm kể từ ngày người yêu cầu nhận thông báo.', 'warning');
        return;
    }

    // Modal title per MH04
    const modalTitleEl = document.getElementById('formProposalTitle');
    if (modalTitleEl) {
        modalTitleEl.innerHTML = `<i class="fa-solid fa-building-columns"></i> CẬP NHẬT TRẢ LẠI NGÂN SÁCH NHÀ NƯỚC: ${item.code}`;
    }

    // Collapse Blocks 1 to 9 per SRS Section 4.3.3.2 (MH04)
    ['block1_General', 'block2_Claimant', 'block3_AdvanceTable', 'block4_KinhPhiTable', 'block5_Recipient', 'block6_NotesAndDocs', 'block7_LeaderApproval', 'block8_NoticeTracking', 'block9_TreasuryTracking'].forEach(bid => {
        setAccordionState(bid, false);
    });
    const block8 = document.getElementById('block8_NoticeTracking');
    if (block8) block8.style.display = 'block';
    const block9 = document.getElementById('block9_TreasuryTracking');
    if (block9) {
        block9.style.display = 'block';
        renderTreasuryTrackingBlock(item);
    }
    const block10 = document.getElementById('block10_PayoutReal');
    if (block10) block10.style.display = 'none';

    // Show & expand Block 11
    const block11 = document.getElementById('block11_TreasuryForfeit');
    if (block11) {
        block11.style.display = 'block';
        setAccordionState('block11_TreasuryForfeit', true);
    }

    const section = document.getElementById('sectionTreasuryForfeit');
    if (section) section.style.display = 'block';
    document.getElementById('treasuryVoucherNo').value = item.treasuryVoucherNo || `SQ-${item.code.replace(/\D/g, '')}`;
    document.getElementById('treasuryForfeitDate').value = item.treasuryForfeitDate || formatDateViGlobal(TREASURY_DEMO_TODAY);
    document.getElementById('treasuryForfeitAmount').value = (item.treasuryAmount || info.unpaid).toLocaleString('vi-VN');
    document.getElementById('treasuryForfeitReason').value = item.treasuryReason || `Người yêu cầu bồi thường đã quá thời hạn 03 năm kể từ ngày nhận thông báo chi trả kinh phí nhưng không đến nhận tiền bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.`;
    treasuryAttachedFile = normalizeFileList(item.treasuryFile);
    renderTreasuryFile();

    document.getElementById('btnViewActionPay').style.display = 'none';
    document.getElementById('btnSaveNoticeTracking').style.display = 'none';
    document.getElementById('btnViewActionForfeit').style.display = 'none';
    document.getElementById('btnCompleteTreasuryForfeit').style.display = 'inline-flex';
    const btnCancel = document.getElementById('btnCancelForm');
    if (btnCancel) {
        btnCancel.style.display = 'inline-flex';
        btnCancel.innerText = 'Đóng';
    }

    setTimeout(() => {
        if (block11) block11.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const vNo = document.getElementById('treasuryVoucherNo');
        if (vNo) vNo.focus();
    }, 150);
}

function cancelTreasuryForfeit() {
    resetTreasuryForfeitForm();
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (item) viewProposalDetail(item.id);
}

function completeTreasuryForfeit() {
    clearFieldErrors();
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (!item) return;

    const info = getTreasuryInfo(item);
    const voucherNo = document.getElementById('treasuryVoucherNo').value.trim();
    const forfeitDateText = document.getElementById('treasuryForfeitDate').value.trim();
    const forfeitDate = parseDateViGlobal(forfeitDateText);
    const amountText = document.getElementById('treasuryForfeitAmount').value.trim();
    const amount = parseFloat(amountText.replace(/\D/g, '')) || 0;
    const reason = document.getElementById('treasuryForfeitReason').value.trim();

    if (!info.isEligible) {
        showToast('Khoản chi này không còn đủ điều kiện trả lại ngân sách nhà nước.', 'warning');
        return;
    }
    if (!voucherNo) {
        showFieldError('treasuryVoucherNo', 'Đây là trường bắt buộc');
        return;
    }
    if (!forfeitDateText) {
        showFieldError('treasuryForfeitDate', 'Đây là trường bắt buộc');
        return;
    }
    if (!forfeitDate) {
        showFieldError('treasuryForfeitDate', 'Ngày không hợp lệ, vui lòng nhập dd/mm/yyyy');
        return;
    }
    if (!amount || amount !== info.unpaid) {
        showFieldError('treasuryForfeitAmount', `Số tiền trả lại ngân sách nhà nước phải bằng số tiền chưa chi ${info.unpaid.toLocaleString('vi-VN')} VNĐ`);
        return;
    }
    if (!reason) {
        showFieldError('treasuryForfeitReason', 'Đây là trường bắt buộc');
        return;
    }
    if (normalizeFileList(treasuryAttachedFile).length === 0) {
        const link = document.getElementById('treasuryFileLink');
        if (link) {
            link.style.color = 'var(--danger-color, #ef4444)';
            link.innerText = 'Vui lòng chọn tài liệu chứng từ nộp ngân sách';
        }
        showToast('Vui lòng đính kèm tài liệu chứng từ nộp ngân sách.', 'warning');
        return;
    }

    const confirmTitle = 'Xác nhận hoàn thành thủ tục trả lại ngân sách nhà nước';
    const confirmMsg = `
        <div style="text-align: left; font-size: 13.5px; line-height: 1.6;">
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
                <div style="display: grid; grid-template-columns: 140px 1fr; gap: 6px; margin-bottom: 4px;">
                    <span style="color: #64748B;">Mã đề xuất:</span>
                    <strong style="color: #1E293B;">${item.code}</strong>
                </div>
                <div style="display: grid; grid-template-columns: 140px 1fr; gap: 6px; margin-bottom: 4px;">
                    <span style="color: #64748B;">Vụ việc liên kết:</span>
                    <strong style="color: #1E293B;">${item.ycbtCode} - ${item.nycName}</strong>
                </div>
                <div style="display: grid; grid-template-columns: 140px 1fr; gap: 6px; margin-bottom: 4px;">
                    <span style="color: #64748B;">Số chứng từ/QĐ:</span>
                    <strong style="color: #1E293B;">${voucherNo}</strong>
                </div>
                <div style="display: grid; grid-template-columns: 140px 1fr; gap: 6px; margin-bottom: 4px;">
                    <span style="color: #64748B;">Ngày trả lại ngân sách nhà nước:</span>
                    <strong style="color: #1E293B;">${forfeitDateText}</strong>
                </div>
                <div style="display: grid; grid-template-columns: 140px 1fr; gap: 6px;">
                    <span style="color: #64748B;">Số tiền trả lại ngân sách nhà nước:</span>
                    <strong style="color: #DC2626; font-size: 15px;">${amount.toLocaleString('vi-VN')} VNĐ</strong>
                </div>
            </div>
            <div style="color: #334155; margin-bottom: 8px;">
                Bạn có chắc chắn muốn xác nhận hoàn thành thủ tục nộp toàn bộ số tiền <strong style="color: #DC2626;">${amount.toLocaleString('vi-VN')} VNĐ</strong> vào ngân sách nhà nước không?
            </div>
            <div style="font-size: 12px; color: #B45309; background: #FFFBEB; border-left: 3px solid #F59E0B; padding: 8px 10px; border-radius: 4px;">
                <i class="fa-solid fa-triangle-exclamation"></i> <strong>Lưu ý:</strong> Sau khi xác nhận, đề xuất cấp kinh phí và Vụ việc bồi thường gốc liên kết sẽ chuyển sang trạng thái <strong>Trả lại ngân sách nhà nước</strong> và không thể điều chỉnh hoặc hoàn tác.
            </div>
        </div>
    `;

    showConfirmModal(confirmMsg, () => {
        item.status = 'Trả lại ngân sách nhà nước';
        item.treasuryForfeitDate = forfeitDateText;
        item.treasuryVoucherNo = voucherNo;
        item.treasuryAmount = amount;
        item.treasuryReason = reason;
        item.treasuryFile = normalizeFileList(treasuryAttachedFile);
        item.payoutAmountReal = Math.max(0, item.amount - amount);

        saveProposalsToLocal();
        kpTlnsCompleteClaim(item, forfeitDateText, amount);
        updateBudgetStats();
        closeCreateProposalForm();
        showToast(`Cập nhật trả lại ngân sách nhà nước thành công cho đề xuất ${item.code}!`, 'success');
    }, confirmTitle);
}

// =====================================================================================
// [kpdt] Cột lưới MH01: Loại kinh phí, Ngày trình, Hạn nhận, Trả lại ngân sách nhà nước
// - Loại kinh phí: "Tạm ứng kinh phí" (Đề nghị tạm ứng / QĐ tạm ứng) | "Chi trả tiền bồi thường" (Thông báo chi trả; bản ghi cũ Cấp kinh phí bồi thường).
// - Ngày trình: ngày Trình ký gần nhất (Ký số) hoặc ngày Ban hành văn bản (Ký ngoài); chưa trình: "-".
// - Hạn nhận/Trả lại ngân sách nhà nước: chỉ bản ghi Chi trả tiền bồi thường; Hạn nhận = Ngày người yêu cầu nhận thông báo + 03 năm; đã trả lại ngân sách nhà nước: ngày + số tiền trả lại ngân sách nhà nước.
// =====================================================================================
const KPDT_TYPE_ADV = 'Tạm ứng kinh phí';
const KPDT_TYPE_PAY = 'Chi trả tiền bồi thường';
const KPDT_NOT_SUBMITTED = ['Chờ lập đề nghị', 'Chờ thông báo chi trả', 'Đề nghị cấp bổ sung kinh phí'];
// Màu badge theo trạng thái (CSS .kp-st-* tại quan_ly_kinh_phi_boi_thuong.html): mỗi trạng thái 01 màu riêng
const KPDT_STATUS_CLASS = {
    'Chờ lập đề nghị': 'kp-st-lap', 'Chờ thông báo chi trả': 'kp-st-tb', 'Đề nghị cấp bổ sung kinh phí': 'kp-st-bs',
    'Chờ duyệt': 'badge-review', 'Bị trả lại': 'kp-st-tc', 'Chờ chi trả': 'kp-st-ct', 'Hoàn thành': 'kp-st-ht',
    'Trả lại ngân sách nhà nước': 'kp-st-sq', 'Đã sung quỹ': 'kp-st-sq', 'Chờ thu hồi': 'kp-st-cth', 'Đã thu hồi': 'kp-st-dth', 'Đã hủy': 'kp-st-huy'
};
function kpdtStatusClass(st) { return KPDT_STATUS_CLASS[st] || 'badge-info'; }
function kpdtTypeLabel(item) { return kpIsAdv(item) ? KPDT_TYPE_ADV : KPDT_TYPE_PAY; }
function kpdtDatePart(s) { const m = String(s || '').match(/(\d{2}\/\d{2}\/\d{4})/); return m ? m[1] : ''; }
function kpdtSubmitDate(item) {
    if (!item) return '';
    const a = item.qdtuApproval || item.kptbApproval;
    if (a && a.submittedAt) return kpdtDatePart(a.submittedAt);
    const s = (item.qdtu && item.qdtu.sign) || {};
    if (s.issuedAt) return kpdtDatePart(s.issuedAt);
    const n = item.kptbNotice || {};
    if (n.issuedAt) return kpdtDatePart(n.issuedAt);
    if (item.qdtu || item.kptbDec) return '';
    return KPDT_NOT_SUBMITTED.includes(item.status) ? '' : kpdtDatePart(item.date);
}
// Cột "Hạn nhận/Trả lại ngân sách nhà nước" (chỉ bản ghi Chi trả tiền bồi thường; Tạm ứng kinh phí / chưa có dữ liệu: "-"):
// - Đã trả lại ngân sách nhà nước: "Đã trả lại ngân sách nhà nước [ngày]" + số tiền trả lại ngân sách nhà nước.
// - Chưa trả lại ngân sách nhà nước, có Ngày nhận thông báo: Hạn nhận (ngày); Chờ chi trả: dòng phụ "Còn X ngày" / "Quá hạn X ngày" + "Đủ điều kiện trả lại ngân sách nhà nước".
function kpdtHanNhanSqHtml(item, info) {
    const none = '<span style="color:#94a3b8;">-</span>';
    if (kpIsAdv(item)) return none;
    if (item.status === 'Trả lại ngân sách nhà nước' || item.status === 'Đã sung quỹ') {
        const amt = Number(item.treasuryAmount) || info.unpaid || 0;
        return `<div style="font-weight:600;">Đã trả lại ngân sách nhà nước${item.treasuryForfeitDate ? ' ' + item.treasuryForfeitDate : ''}</div><div style="font-size:11.5px; color:#64748b;">${amt.toLocaleString('vi-VN')}</div>`;
    }
    if (!info.deadline) return none;
    let sub = '';
    if (kpNormStatus(item.status) === 'Chờ chi trả' && info.daysLeft !== null) {
        sub = info.daysLeft < 0
            ? `<div style="font-size:11.5px; color:#b91c1c; font-weight:600;">Quá hạn ${Math.abs(info.daysLeft)} ngày</div>`
            : `<div style="font-size:11.5px; color:#64748b;">Còn ${info.daysLeft} ngày</div>`;
    }
    if (info.isEligible) sub += '<div style="font-size:11.5px; color:#b91c1c; font-weight:600;">Đủ điều kiện trả lại ngân sách nhà nước</div>';
    return `<div style="font-weight:600;">${info.deadlineText}</div>${sub}`;
}

// RENDER DATA TABLE GRID
function renderProposalsTable() {
    const tbody = document.getElementById('proposalsTableBody');
    tbody.innerHTML = '';
    renderTreasuryWarningPanel();

    kpRefreshTabUi();
    // Chỉ lấy bản ghi thuộc tab đang chọn (Chờ xử lý / Đã xử lý) theo người dùng đang đăng nhập
    // (menu con Kinh phí: chỉ 01 loại bản ghi - kpInActiveTab đã lọc theo menu, không còn bộ lọc Loại kinh phí)
    let filtered = proposalsList.filter(kpInActiveTab);

    const code = document.getElementById('searchProposalCode').value.trim().toLowerCase();
    const ycbtCode = document.getElementById('searchYcbtCode').value.trim().toLowerCase();
    const status = document.getElementById('searchProposalStatus').value;

    const nyc = document.getElementById('searchNycName').value.trim().toLowerCase();
    const cb = document.getElementById('searchCbXuLy').value.trim().toLowerCase();

    const fromDateInput = document.getElementById('searchFromDate').value;
    const toDateInput = document.getElementById('searchToDate').value;

    if (code) filtered = filtered.filter(item => item.code.toLowerCase().includes(code));
    if (ycbtCode) filtered = filtered.filter(item => item.ycbtCode.toLowerCase().includes(ycbtCode));
    if (status) {
        if (status === 'Trả lại ngân sách nhà nước') {
            filtered = filtered.filter(item => item.status === 'Trả lại ngân sách nhà nước' || item.status === 'Đã sung quỹ');
        } else {
            filtered = filtered.filter(item => item.status === status);
        }
    }
    if (showTreasuryEligibleOnly) filtered = filtered.filter(item => getTreasuryInfo(item).isEligible);
    if (nyc) filtered = filtered.filter(item => item.nycName.toLowerCase().includes(nyc));
    if (cb) filtered = filtered.filter(item => item.user.toLowerCase().includes(cb));

    // Lọc nhanh theo KPI (Tất cả / Chờ duyệt / Bị trả lại)
    if (activeKpiFilterKp === 'Chờ duyệt') {
        filtered = filtered.filter(item => item.status === 'Chờ duyệt');
    } else if (activeKpiFilterKp === 'Bị trả lại') {
        filtered = filtered.filter(item => item.status === 'Bị trả lại' || (item.status && item.status.toLowerCase().includes('từ chối')));
    }

    const parseDateVi = (str) => {
        if (!str) return null;
        const parts = str.split('/');
        if (parts.length === 3) {
            const d = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10);
            const y = parseInt(parts[2], 10);
            if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
                return new Date(y, m - 1, d);
            }
        }
        return null;
    };

    const fromDateVal = parseDateVi(fromDateInput);
    const toDateVal = parseDateVi(toDateInput);

    if (fromDateVal) {
        fromDateVal.setHours(0, 0, 0, 0);
        filtered = filtered.filter(item => {
            const itemDate = parseDateVi(item.date);
            if (!itemDate) return false;
            itemDate.setHours(0, 0, 0, 0);
            return itemDate >= fromDateVal;
        });
    }
    if (toDateVal) {
        toDateVal.setHours(23, 59, 59, 999);
        filtered = filtered.filter(item => {
            const itemDate = parseDateVi(item.date);
            if (!itemDate) return false;
            itemDate.setHours(0, 0, 0, 0);
            return itemDate <= toDateVal;
        });
    }

    // Sort filtered dataset
    filtered.sort((a, b) => {
        let valA, valB;
        switch (kpSortColumn) {
            case 'stt':
                valA = a.id;
                valB = b.id;
                break;
            case 'code':
                valA = a.code || '';
                valB = b.code || '';
                break;
            case 'ycbtCode':
                valA = a.ycbtCode || '';
                valB = b.ycbtCode || '';
                break;
            case 'nycName':
                valA = a.nycName || '';
                valB = b.nycName || '';
                break;
            case 'amount':
                valA = typeof a.amount === 'number' ? a.amount : parseFloat(String(a.amount).replace(/\D/g, '')) || 0;
                valB = typeof b.amount === 'number' ? b.amount : parseFloat(String(b.amount).replace(/\D/g, '')) || 0;
                break;
            case 'date':
                valA = parseDateVi(kpdtSubmitDate(a)) || new Date(0);
                valB = parseDateVi(kpdtSubmitDate(b)) || new Date(0);
                break;
            case 'status':
                valA = a.status || '';
                valB = b.status || '';
                break;
            default:
                valA = a.code || '';
                valB = b.code || '';
        }
        let res = 0;
        if (valA instanceof Date && valB instanceof Date) {
            res = valA.getTime() - valB.getTime();
        } else if (typeof valA === 'string') {
            res = valA.localeCompare(valB, 'vi');
        } else {
            res = valA < valB ? -1 : (valA > valB ? 1 : 0);
        }
        return kpSortDirection === 'asc' ? res : -res;
    });

    updateKpSortIcons();
    updateKpiCountersKp();

    const total = filtered.length;
    document.getElementById('totalCount').innerText = total;
    const maxPages = Math.ceil(total / pageSize) || 1;

    if (currentPage > maxPages) currentPage = maxPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, total);

    if (total === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; color:var(--text-muted); padding:30px;">Không tìm thấy đề xuất cấp phát nào phù hợp</td></tr>`;
        document.getElementById('currentRange').innerText = "0-0";
        renderPaginationPages(1);
        return;
    }

    document.getElementById('currentRange').innerText = `${startIdx + 1}-${endIdx}`;
    const pageData = filtered.slice(startIdx, endIdx);

    const activeRole = document.getElementById('roleSelector').value;
    const isLeader = activeRole === 'lanh-dao';

    // Update dynamic header badge
    let pendingCount = 0;
    if (isLeader) {
        pendingCount = proposalsList.filter(p => p.status === 'Chờ duyệt').length;
    } else {
        pendingCount = proposalsList.filter(p => p.status === 'Chờ lập đề nghị' || p.status === 'Bị trả lại' || p.status === 'Chờ chi trả').length;
    }
    const headerBadge = document.getElementById('headerProposalBadge');
    if (headerBadge) {
        headerBadge.innerText = pendingCount;
    }

    pageData.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I' && !e.target.closest('.icon-btn') && e.target.tagName !== 'A') {
                // Xem chi tiết: mở dạng trang (quan_ly_kinh_phi_kpdt.js), có URL ?view=detail&id=[Mã kinh phí]
                if (typeof kpdtOpen === 'function') kpdtOpen(item.id); else viewProposalDetail(item.id);
            }
        };

        // Mỗi trạng thái 01 màu badge riêng (kpdtStatusClass); Chờ duyệt tím nhạt, Bị trả lại cam như các màn khác
        const badgeClass = kpdtStatusClass(item.status);
        const treasuryInfo = getTreasuryInfo(item);
        const treasuryHtml = renderTreasuryCell(item, treasuryInfo);

        let actionsHtml = '';

        if (isLeader) {
            // Icon chuẩn Ký duyệt / Từ chối (đồng nhất màn Xác định cơ quan GQBT)
            let approveBtn = `<button class="icon-btn accept sign" data-admin-icon-normalized="1" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Ký duyệt"><i class="fa-solid fa-file-signature"></i></button>`;
            let rejectBtn = `<button class="icon-btn delete reject" data-admin-icon-normalized="1" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Từ chối"><i class="fa-solid fa-ban"></i></button>`;

            if (item.status === 'Chờ duyệt') {
                approveBtn = `<button class="icon-btn accept sign" data-admin-icon-normalized="1" title="Ký duyệt" onclick="openApproveModal('${item.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
                rejectBtn = `<button class="icon-btn delete reject" data-admin-icon-normalized="1" title="Từ chối" onclick="openRejectModal('${item.id}')"><i class="fa-solid fa-ban"></i></button>`;
            }
            actionsHtml = `${approveBtn} ${rejectBtn}`;
        } else {
            // Specialist role
            let fillBtn = `<button class="icon-btn edit" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ lập đề nghị cho đề xuất ở trạng thái Chờ lập đề nghị"><i class="fa-solid fa-file-signature"></i></button>`;
            let updateBtn = `<button class="icon-btn edit" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ cập nhật đề xuất ở trạng thái Bị trả lại"><i class="fa-solid fa-pen-to-square"></i></button>`;
            let payBtn = `<button class="icon-btn accept" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ thực hiện chi trả ở trạng thái Chờ chi trả"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
            let treasuryBtn = `<button class="icon-btn" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chưa đủ điều kiện trả lại ngân sách nhà nước"><i class="fa-solid fa-building-columns"></i></button>`;
            let deleteBtn = `<button class="icon-btn delete" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ xóa được tờ trình ở trạng thái Chờ lập đề nghị"><i class="fa-regular fa-trash-can"></i></button>`;

            if (item.status === 'Chờ lập đề nghị') {
                fillBtn = `<button class="icon-btn edit" title="Lập đề nghị kinh phí" onclick="fillProposalDirect('${item.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
                deleteBtn = `<button class="icon-btn delete" title="Xóa tờ trình" onclick="event.stopPropagation(); deleteProposal('${item.id}')"><i class="fa-regular fa-trash-can"></i></button>`;
            } else if (item.status === 'Bị trả lại') {
                updateBtn = `<button class="icon-btn edit" title="Cập nhật đề nghị" onclick="updateProposalDirect('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
            } else if (item.status === 'Chờ chi trả') {
                payBtn = `<button class="icon-btn accept" title="Thực hiện chi trả" onclick="payProposalDirect('${item.id}')"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
            }
            if (treasuryInfo.isEligible) {
                treasuryBtn = `<button class="icon-btn reject" title="Trả lại ngân sách nhà nước" onclick="forfeitProposalDirect('${item.id}')"><i class="fa-solid fa-building-columns"></i></button>`;
            }
            actionsHtml = kpSpecialistActions(item, { fillBtn, updateBtn, payBtn, treasuryBtn, deleteBtn });
        }

        const amtVal = typeof item.amount === 'number' ? item.amount : parseFloat(String(item.amount).replace(/\D/g, '')) || 0;
        const displayStatus = item.status === 'Đã sung quỹ' ? 'Trả lại ngân sách nhà nước' : item.status;

        tr.innerHTML = `
            <td style="text-align:center; vertical-align:middle;">${startIdx + idx + 1}</td>
            <td style="text-align:left; vertical-align:middle; font-weight:700; color:var(--primary-light);">${item.code}</td>
            <td style="text-align:left; vertical-align:middle;"><a href="quan_ly_boi_thuong.html?id=${encodeURIComponent(item.ycbtCode)}&from=kinh_phi&returnUrl=${encodeURIComponent('quan_ly_kinh_phi_boi_thuong.html?v=1&menu=' + kpMenu())}" onclick="event.stopPropagation(); openLinkedClaimDetail('${item.ycbtCode}', '${item.courtCaseId || ''}'); return false;" style="font-weight:700; color:var(--secondary-color); text-decoration:underline;">${item.ycbtCode}</a></td>
            <td style="text-align:left; vertical-align:middle; font-weight:600;">${item.nycName}</td>
            <td style="text-align:right; font-weight:700; vertical-align:middle;">${amtVal.toLocaleString('vi-VN')}</td>
            <td style="text-align:left; vertical-align:middle;">${item.user || '-'}</td>
            <td style="text-align:center; vertical-align:middle;">${kpdtSubmitDate(item) || '-'}</td>
            <td class="kp-col-hn" style="text-align:center; vertical-align:middle;">${kpdtHanNhanSqHtml(item, treasuryInfo)}</td>
            <td style="text-align:center; vertical-align:middle;"><span class="badge ${badgeClass}">${displayStatus}</span></td>
            <td class="kp-act-td" style="text-align:center; vertical-align:middle;">
                <div class="action-flex" style="display:flex; justify-content:center; gap:4px;">
                    ${actionsHtml}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderPaginationPages(maxPages);
}

function renderPaginationPages(maxPages) {
    const container = document.getElementById('paginationPages');
    container.innerHTML = '';

    const firstPage = `<span class="page-item ${currentPage === 1 ? 'disabled' : ''}" onclick="goPage(1)" title="Đầu">&verbar;&lt;&lt;</span>`;
    const prevPage = `<span class="page-item ${currentPage === 1 ? 'disabled' : ''}" onclick="prevPage()" title="Trước">&lt;</span>`;
    container.innerHTML += firstPage + prevPage;

    for (let i = 1; i <= maxPages; i++) {
        container.innerHTML += `<span class="page-item ${currentPage === i ? 'active' : ''}" onclick="goPage(${i})">${i}</span>`;
    }

    const nextPage = `<span class="page-item ${currentPage === maxPages ? 'disabled' : ''}" onclick="nextPage()" title="Sau">&gt;</span>`;
    const lastPage = `<span class="page-item ${currentPage === maxPages ? 'disabled' : ''}" onclick="goPage('last')" title="Cuối">&gt;&gt;&verbar;</span>`;
    container.innerHTML += nextPage + lastPage;
}

// Pagination page clicks
function goPage(page) {
    if (page === 'last') {
        const total = parseInt(document.getElementById('totalCount').innerText);
        currentPage = Math.ceil(total / pageSize) || 1;
    } else {
        currentPage = page;
    }
    renderProposalsTable();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProposalsTable();
    }
}

// Pagination next
function nextPage() {
    const total = parseInt(document.getElementById('totalCount').innerText);
    const maxPages = Math.ceil(total / pageSize) || 1;
    if (currentPage < maxPages) {
        currentPage++;
        renderProposalsTable();
    }
}

// Page Size Change
function changePageSize(val) {
    pageSize = parseInt(val);
    currentPage = 1;
    renderProposalsTable();
}

// Filter clears and search
function clearFilters() {
    showTreasuryEligibleOnly = false;
    document.getElementById('searchProposalCode').value = '';
    document.getElementById('searchYcbtCode').value = '';
    document.getElementById('searchProposalStatus').value = '';
    document.getElementById('searchNycName').value = '';
    document.getElementById('searchCbXuLy').value = '';

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    document.getElementById('searchFromDate').value = formatDate(firstDayOfMonth);
    document.getElementById('searchToDate').value = formatDate(today);

    // Reset lọc nhanh về Tất cả
    activeKpiFilterKp = 'all';
    document.querySelectorAll('#kpiStatsRow .stat-badge-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('kpiBtnAll')?.classList.add('active');

    currentPage = 1;
    renderProposalsTable();
    showToast("Đã xóa bộ lọc tìm kiếm!", "info");
}

function triggerSearchProposals() {
    showTreasuryEligibleOnly = false;
    currentPage = 1;
    renderProposalsTable();
}

// VALIDATION HELPER: Check duplicate proposal and claim status compatibility
function validateClaimForProposalType(claimCode, proposalType) {
    if (!claimCode) return { valid: true };
    const claim = mockClaims.find(c => c.code === claimCode);
    if (!claim) return { valid: false, code: 'ERR_NOT_FOUND', message: `Không tìm thấy thông tin vụ việc [${claimCode}] trên hệ thống!` };

    // Active status lists according to system dropdown
    const ACTIVE_KINH_PHI_STATUSES = ['Chờ lập đề nghị', 'Chờ duyệt', 'Chờ chi trả', 'Hoàn thành', 'Trả lại ngân sách nhà nước'];
    const ACTIVE_TAM_UNG_STATUSES = ['Chờ lập đề nghị', 'Chờ duyệt', 'Chờ chi trả', 'Hoàn thành'];

    // Check existing proposals in proposalsList for this claim
    const hasKinhPhi = proposalsList.some(p => 
        p.ycbtCode === claimCode && 
        (p.type === 'Cấp kinh phí bồi thường' || p.type === 'Kinh phí bồi thường') && 
        ACTIVE_KINH_PHI_STATUSES.includes(p.status) && 
        (!selectedProposalId || p.id !== selectedProposalId)
    );
    const hasTamUng = proposalsList.some(p => 
        p.ycbtCode === claimCode && 
        (p.type === 'Cấp tạm ứng' || p.type === 'Đề nghị tạm ứng') && 
        ACTIVE_TAM_UNG_STATUSES.includes(p.status) && 
        (!selectedProposalId || p.id !== selectedProposalId)
    );

    if (proposalType === 'Cấp tạm ứng' || proposalType === 'Đề nghị tạm ứng') {
        // [BR-KP-DUP-002]: If already has compensation proposal -> NEVER allow advance
        if (hasKinhPhi) {
            return {
                valid: false,
                code: 'ERR_HAS_COMPENSATION',
                message: `Vụ việc [${claimCode}] đã tồn tại Đề nghị cấp kinh phí bồi thường trên hệ thống. Theo quy định, không được phép lập mới Đề nghị tạm ứng kinh phí khi vụ việc đã có đề nghị cấp kinh phí!`
            };
        }
        // [BR-KP-DUP-001]: If already has active advance proposal
        if (hasTamUng) {
            return {
                valid: false,
                code: 'ERR_DUP_ADVANCE',
                message: `Vụ việc [${claimCode}] đã tồn tại Đề nghị tạm ứng đang trong quy trình xử lý. Không được phép lập trùng lặp!`
            };
        }
        // [BR-KP-STATUS-001]: Status must be from "Xác minh thiệt hại" onwards, but not "Chờ chi trả"
        const validStatuses = ['Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ'];
        if (!validStatuses.includes(claim.status)) {
            return {
                valid: false,
                code: 'ERR_INVALID_STATUS_ADVANCE',
                message: `Vụ việc [${claimCode}] đang ở trạng thái "${claim.status}", không thuộc giai đoạn được phép lập Đề nghị tạm ứng (chỉ áp dụng cho các vụ việc từ 'Xác minh thiệt hại' đến trước khi có Quyết định giải quyết bồi thường)!`
            };
        }
    } else if (proposalType === 'Cấp kinh phí bồi thường' || proposalType === 'Kinh phí bồi thường') {
        // [BR-KP-DUP-001]: Duplicate compensation check
        if (hasKinhPhi) {
            return {
                valid: false,
                code: 'ERR_DUP_COMPENSATION',
                message: `Vụ việc [${claimCode}] đã tồn tại Đề nghị cấp kinh phí bồi thường trên hệ thống. Không được phép tạo trùng lặp!`
            };
        }
        // [BR-KP-STATUS-001]: Status must be 'Chờ chi trả'
        // (vụ việc tại Tòa án: đủ điều kiện khi Đã có bản án/QĐ)
        const courtEligible = claim.source === 'court' && claim.status === COURT_STATUS_VERDICT;
        if (claim.status !== 'Chờ chi trả' && !courtEligible) {
            return {
                valid: false,
                code: 'ERR_INVALID_STATUS_COMPENSATION',
                message: `Vụ việc [${claimCode}] đang ở trạng thái "${claim.status}", chưa đủ điều kiện lập Đề nghị cấp kinh phí bồi thường (chưa có Quyết định giải quyết bồi thường có hiệu lực / chưa đạt trạng thái 'Chờ chi trả')!`
            };
        }
    }

    return { valid: true };
}

function handleTypeRadioChange(val) {
    const hiddenType = document.getElementById('formProposalType');
    if (hiddenType) hiddenType.value = val;
    handleTypeChange(val);
}

function setProposalTypeRadio(val, isDisabled = false) {
    const hiddenType = document.getElementById('formProposalType');
    if (hiddenType) hiddenType.value = val;

    const rAdv = document.getElementById('radioTypeAdvance');
    const rKp = document.getElementById('radioTypeKinhPhi');
    if (rAdv && rKp) {
        if (val === 'Cấp kinh phí bồi thường' || val === 'Kinh phí bồi thường') {
            rKp.checked = true;
        } else {
            rAdv.checked = true;
        }
        rAdv.disabled = isDisabled;
        rKp.disabled = isDisabled;
    }
}

// DYNAMIC TYPE & CLAIMS LOAD IN FORM
function handleTypeChange(selectedType) {
    // Số / Ngày Quyết định làm căn cứ chỉ áp dụng cho Đề nghị cấp kinh phí bồi thường
    const isKinhPhi = (selectedType === 'Cấp kinh phí bồi thường' || selectedType === 'Kinh phí bồi thường');
    document.querySelectorAll('.baseDecisionField').forEach(el => { el.style.display = isKinhPhi ? '' : 'none'; });
    if (!isKinhPhi) {
        const bn = document.getElementById('formBaseDecisionNo'); if (bn) bn.value = '';
        const bd = document.getElementById('formBaseDecisionDate'); if (bd) bd.value = '';
    }
    setProposalTypeRadio(selectedType);

    const currentClaimCode = document.getElementById('formClaimCode')?.value || document.getElementById('formClaimSearchInput')?.value.trim();

    // Check compatibility if a claim is already chosen
    if (currentClaimCode) {
        const check = validateClaimForProposalType(currentClaimCode, selectedType);
        if (!check.valid) {
            showCustomAlertModal(
                `<div style="display:flex; gap:12px; align-items:flex-start;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size:24px; color:#f59e0b; margin-top:2px;"></i>
                    <div>
                        <div style="font-weight:700; margin-bottom:6px; color:#1e293b;">Không thỏa mãn điều kiện loại đề nghị mới</div>
                        <div style="color:#475569; margin-bottom:10px;">${check.message}</div>
                        <div style="color:#dc2626; font-weight:600; font-size:12.5px;">
                            <i class="fa-solid fa-circle-exclamation"></i> Thông tin vụ việc đã chọn sẽ được xóa để bạn chọn lại!
                        </div>
                    </div>
                </div>`,
                "Cảnh báo không tương thích",
                "warning"
            );
            clearClaimDetails();
        } else {
            // Claim is valid for the new type, refresh its display
            handleClaimSelected(currentClaimCode);
        }
    } else {
        clearClaimDetails();
    }

    const claimSelector = document.getElementById('formClaimSelector');
    if (claimSelector) {
        claimSelector.innerHTML = `<option value="">-- Chọn vụ việc bồi thường liên kết --</option>`;
        const filteredClaims = mockClaims.filter(c => validateClaimForProposalType(c.code, selectedType).valid);
        filteredClaims.forEach(c => {
            const amountText = selectedType === 'Cấp tạm ứng' ? `Đề xuất tạm ứng: ${(c.suggestedAdvance || 0).toLocaleString('vi-VN')} đ` : `Tổng bồi thường: ${(c.amount || 0).toLocaleString('vi-VN')} đ`;
            claimSelector.innerHTML += `<option value="${c.code}">${c.code} - ${c.nyc} (${amountText})</option>`;
        });
        if (currentClaimCode && validateClaimForProposalType(currentClaimCode, selectedType).valid) {
            claimSelector.value = currentClaimCode;
        }
    }

    // Dynamically update form title based on selection type
    const secTitle = document.getElementById('formProposalSectionTitle');
    if (secTitle) {
        if (selectedType === 'Cấp tạm ứng' || selectedType === 'Đề nghị tạm ứng') {
            secTitle.innerText = "III. Nội dung đề xuất cấp tạm ứng";
        } else {
            secTitle.innerText = "III. Nội dung đề xuất cấp kinh phí bồi thường";
        }
    }

    // Show/hide wrappers & accordion blocks (Section 4.3.3.2)
    const block3 = document.getElementById('block3_AdvanceTable');
    const block4 = document.getElementById('block4_KinhPhiTable');
    const recAdv = document.getElementById('recAdvanceBlock');
    const recKp = document.getElementById('recKinhPhiBlock');
    const wrapAdv = document.getElementById('wrapperAdvanceProposal');
    const wrapKp = document.getElementById('wrapperKinhPhiProposal');

    if (selectedType === 'Cấp tạm ứng' || selectedType === 'Đề nghị tạm ứng') {
        if (block3) { block3.style.display = 'block'; setAccordionState('block3_AdvanceTable', true); }
        if (block4) block4.style.display = 'none';
        if (recAdv) recAdv.style.display = 'block';
        if (recKp) recKp.style.display = 'none';
        if (wrapAdv) wrapAdv.style.display = 'block';
        if (wrapKp) wrapKp.style.display = 'none';
    } else {
        if (block3) block3.style.display = 'none';
        if (block4) { block4.style.display = 'block'; setAccordionState('block4_KinhPhiTable', true); }
        if (recAdv) recAdv.style.display = 'none';
        if (recKp) recKp.style.display = 'block';
        if (wrapAdv) wrapAdv.style.display = 'none';
        if (wrapKp) wrapKp.style.display = 'block';
    }
}

function clearClaimDetails() {
    document.getElementById('formClaimSearchInput').value = '';
    document.getElementById('formClaimCode').value = '';
    document.getElementById('formClaimAgency').value = '';
    document.getElementById('formClaimField').value = '';
    document.getElementById('formClaimAmount').value = '';

    document.getElementById('formNycName').value = '';
    document.getElementById('formNycRole').value = '';
    document.getElementById('formNycGender').value = 'Nam';
    document.getElementById('formNycBirth').value = '';

    const radios = document.getElementsByName('formNycVictimAlive');
    if (radios[0]) radios[0].checked = true;

    document.getElementById('formNycPhone').value = '';
    document.getElementById('formNycEmail').value = '';
    document.getElementById('formNycCardType').value = 'CMND/CCCD/Chứng minh quân đội';
    document.getElementById('formNycCardNo').value = '';
    document.getElementById('formNycCardDate').value = '';
    document.getElementById('formNycCardPlace').value = '';
    document.getElementById('formNycCountry').value = 'Việt Nam';
    document.getElementById('formNycCity').value = 'Hà Nội';
    document.getElementById('formNycWard').value = '';
    document.getElementById('formNycAddress').value = '';

    document.getElementById('formProposalNotes').value = '';

    // Clear advance section fields
    const elAdvTt = document.getElementById('advClaimTinhThan');
    if (elAdvTt) elAdvTt.value = '';
    const elAdvTtFile = document.getElementById('advClaimTinhThanFileLink');
    if (elAdvTtFile) elAdvTtFile.innerHTML = '';
    const elAdvKhac = document.getElementById('advClaimKhac');
    if (elAdvKhac) elAdvKhac.value = '';
    const elAdvKhacFile = document.getElementById('advClaimKhacFileLink');
    if (elAdvKhacFile) elAdvKhacFile.innerHTML = '';
    document.getElementById('advClaimTotal').value = '';
    document.getElementById('advClaimTotalWord').innerText = 'Viết bằng chữ: Không đồng';
    document.getElementById('advRecName').value = '';
    document.getElementById('advRecCard').value = '';
    document.getElementById('advRecAddress').value = '';
    setAdvPayMethod('Nhận tiền mặt');
    document.getElementById('advRecBankWrapper').style.display = 'none';
    document.getElementById('advBankUser').value = '';
    document.getElementById('advBankAccount').value = '';
    document.getElementById('advBankName').value = '';
    document.getElementById('advBankBranch').value = '';

    document.getElementById('advApproveTinhThan').value = '';
    document.getElementById('advApproveKhac').value = '';
    document.getElementById('advApproveTotal').value = '';
    document.getElementById('advApproveTotalWord').innerText = 'Viết bằng chữ: Không đồng';

    // Clear kinh phi section fields
    document.getElementById('kpDamageUnifiedBody').innerHTML = '';
    document.getElementById('kpApproveTotal').value = '';
    document.getElementById('kpApproveTotalWord').innerText = 'Viết bằng chữ: Không đồng';
    document.getElementById('kpApproveAdvancePaid').value = '';
    document.getElementById('kpApproveRemaining').value = '';

    // Clear kinh phi recipient fields
    document.getElementById('kpRecName').value = '';
    document.getElementById('kpRecCard').value = '';
    document.getElementById('kpRecAddress').value = '';
    setKpPayMethod('Nhận tiền mặt');
    document.getElementById('kpRecBankWrapper').style.display = 'none';
    document.getElementById('kpBankUser').value = '';
    document.getElementById('kpBankAccount').value = '';
    document.getElementById('kpBankName').value = '';
    document.getElementById('kpBankBranch').value = '';

    // Clear attached files table
    proposalAttachedDocs = [];
    renderProposalAttachedDocs();
}

function normalizeFundingLookupText(value) {
    return String(value || '').trim().toLowerCase();
}

function getFundingClaimTargetStatus() {
    const selectedType = document.getElementById('formProposalType').value;
    return selectedType === 'Cấp tạm ứng' ? 'Xác minh thiệt hại' : 'Chờ chi trả';
}

function getFundingClaimLookupRows() {
    const selectedType = document.getElementById('formProposalType').value;
    return mockClaims
        .filter(claim => {
            const check = validateClaimForProposalType(claim.code, selectedType);
            return check.valid;
        })
        .map(claim => {
            const amount = selectedType === 'Cấp tạm ứng' ? (claim.suggestedAdvance || 0) : (claim.amount || 0);
            return {
                code: claim.code,
                requester: claim.nyc || '',
                agency: claim.agency || '',
                amount: amount,
                status: claim.status
            };
        });
}

function openFundingClaimLookupModal(prefillCode = '') {
    const overlay = document.getElementById('fundingClaimLookupOverlay');
    if (!overlay) return;

    const codeInput = document.getElementById('fundingClaimSearchCode');
    const requesterInput = document.getElementById('fundingClaimSearchRequester');

    if (codeInput) codeInput.value = prefillCode || '';
    if (requesterInput) requesterInput.value = '';

    renderFundingClaimLookupResults();
    overlay.style.display = 'flex';
    overlay.classList.add('visible');
    setTimeout(() => codeInput?.focus(), 60);
}

function closeFundingClaimLookupModal() {
    const overlay = document.getElementById('fundingClaimLookupOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    overlay.style.display = 'none';
}

function clearFundingClaimLookupFilters() {
    document.getElementById('fundingClaimSearchCode').value = '';
    document.getElementById('fundingClaimSearchRequester').value = '';
    renderFundingClaimLookupResults();
}

function renderFundingClaimLookupResults() {
    const tbody = document.getElementById('fundingClaimLookupResults');
    if (!tbody) return;

    const code = normalizeFundingLookupText(document.getElementById('fundingClaimSearchCode')?.value);
    const requester = normalizeFundingLookupText(document.getElementById('fundingClaimSearchRequester')?.value);

    const rows = getFundingClaimLookupRows().filter(row =>
        (!code || normalizeFundingLookupText(row.code).includes(code)) &&
        (!requester || normalizeFundingLookupText(row.requester).includes(requester))
    );

    if (!rows.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color: var(--text-muted); padding: 20px;">
                    Không tìm thấy vụ việc phù hợp
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = rows.map(row => `
        <tr>
            <td style="font-weight:700; color: var(--primary-light); white-space:nowrap;">${row.code}</td>
            <td>${row.requester}</td>
            <td>${row.agency}</td>
            <td style="text-align:right; font-weight:700; white-space:nowrap;">${row.amount.toLocaleString('vi-VN')} VNĐ</td>
            <td><span class="badge badge-pending">${row.status}</span></td>
            <td style="text-align:center;">
                <button type="button" class="btn btn-primary btn-sm" onclick="selectFundingClaimFromLookup('${row.code}')">
                    <i class="fa-solid fa-check"></i> Chọn
                </button>
            </td>
        </tr>
    `).join('');
}

function selectFundingClaimFromLookup(code) {
    const selectedType = document.getElementById('formProposalType').value;
    const check = validateClaimForProposalType(code, selectedType);
    if (!check.valid) {
        showCustomAlertModal(check.message, "Vụ việc không hợp lệ", "warning");
        return;
    }

    const claim = mockClaims.find(c => c.code === code);
    if (!claim) return;

    const claimSelector = document.getElementById('formClaimSelector');
    if (claimSelector) {
        claimSelector.innerHTML = `<option value="${claim.code}">${claim.code} - ${claim.nyc}</option>`;
        claimSelector.value = claim.code;
    }

    document.getElementById('formClaimSearchInput').value = claim.code;
    clearFieldErrors();
    handleClaimSelected(claim.code);
    closeFundingClaimLookupModal();
    showToast(`Đã chọn vụ việc ${claim.code} và tự động điền dữ liệu liên quan!`, "success");
}

// Quick search by claim code
function searchClaimByCode() {
    const searchInputVal = document.getElementById('formClaimSearchInput').value.trim();
    if (!searchInputVal) {
        showCustomAlertModal("Vui lòng nhập ít nhất một tiêu chí tìm kiếm!", "Thông báo", "warning");
        return;
    }
    openFundingLookupByType(searchInputVal);
}

// AUTO-FILL ALL DETAILS RELATING TO THE SELECT CLAIM
function handleClaimSelected(code) {
    if (!code) {
        clearClaimDetails();
        return;
    }

    document.getElementById('formClaimSearchInput').value = code;

    const claim = mockClaims.find(c => c.code === code);
    if (claim) {
        document.getElementById('formClaimCode').value = claim.code;
        document.getElementById('formClaimAgency').value = claim.agency;
        document.getElementById('formClaimField').value = claim.field;

        const selectedType = document.getElementById('formProposalType').value;
        const baseAmount = selectedType === 'Cấp tạm ứng' ? claim.suggestedAdvance : claim.amount;
        document.getElementById('formClaimAmount').value = baseAmount.toLocaleString('vi-VN') + " VNĐ";

        // Auto-fill full NYC details from Claim
        document.getElementById('formNycName').value = claim.nyc;
        document.getElementById('formNycRole').value = claim.role;
        document.getElementById('formNycGender').value = claim.gender;
        document.getElementById('formNycBirth').value = claim.birth;

        const radios = document.getElementsByName('formNycVictimAlive');
        if (claim.nycVictimAlive === 'no') {
            if (radios[1]) radios[1].checked = true;
        } else {
            if (radios[0]) radios[0].checked = true;
        }

        document.getElementById('formNycPhone').value = claim.phone;
        document.getElementById('formNycEmail').value = claim.email || "";
        document.getElementById('formNycCardType').value = claim.cardType || "CMND/CCCD/Chứng minh quân đội";
        document.getElementById('formNycCardNo').value = claim.cardNo;
        document.getElementById('formNycCardDate').value = claim.cardDate;
        document.getElementById('formNycCardPlace').value = claim.cardPlace;
        document.getElementById('formNycCountry').value = claim.country || "Việt Nam";
        document.getElementById('formNycCity').value = claim.city || "Hà Nội";
        document.getElementById('formNycWard').value = claim.ward || 'Phường Dịch Vọng';
        document.getElementById('formNycAddress').value = claim.address;

        // Tạm ứng
        if (selectedType === 'Cấp tạm ứng') {
            const elAdvTtVal = document.getElementById('advClaimTinhThan');
            if (elAdvTtVal) elAdvTtVal.value = claim.advanceTinhThan.toLocaleString('vi-VN') + " VNĐ";
            const elAdvTtLink = document.getElementById('advClaimTinhThanFileLink');
            if (elAdvTtLink) {
                if (claim.advanceTinhThanFile) {
                    elAdvTtLink.innerHTML = `
                        <div style="display:flex; justify-content:center; gap:8px; font-weight:600; font-size:12px; white-space:nowrap;">
                            <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;">Xem</a>
                            <span style="color:#CBD5E1;">|</span>
                            <a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="clearClaimFile('TinhThan')"><i class="fa-regular fa-trash-can"></i> Xóa</a>
                        </div>
                    `;
                } else {
                    elAdvTtLink.innerHTML = '';
                }
            }

            const elAdvKhacVal = document.getElementById('advClaimKhac');
            if (elAdvKhacVal) elAdvKhacVal.value = claim.advanceKhac.toLocaleString('vi-VN') + " VNĐ";
            const elAdvKhacLink = document.getElementById('advClaimKhacFileLink');
            if (elAdvKhacLink) {
                if (claim.advanceKhacFile) {
                    elAdvKhacLink.innerHTML = `
                        <div style="display:flex; justify-content:center; gap:8px; font-weight:600; font-size:12px; white-space:nowrap;">
                            <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;">Xem</a>
                            <span style="color:#CBD5E1;">|</span>
                            <a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="clearClaimFile('Khac')"><i class="fa-regular fa-trash-can"></i> Xóa</a>
                        </div>
                    `;
                } else {
                    elAdvKhacLink.innerHTML = '';
                }
            }

            const totalAdv = claim.advanceTinhThan + claim.advanceKhac;
            document.getElementById('advClaimTotal').value = totalAdv.toLocaleString('vi-VN') + " VNĐ";
            document.getElementById('advClaimTotalWord').innerText = "Viết bằng chữ: " + docTienBangChu(totalAdv);

            document.getElementById('advRecName').value = claim.nyc;
            document.getElementById('advRecCard').value = claim.cardNo;
            document.getElementById('advRecAddress').value = claim.address;
            setAdvPayMethod(claim.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt');

            if (claim.advanceRecKenh === 'chuyen-khoan') {
                document.getElementById('advRecBankWrapper').style.display = 'grid';
                document.getElementById('advBankUser').value = claim.advanceBankUser || claim.nyc;
                document.getElementById('advBankAccount').value = claim.advanceBankAccount || "";
                document.getElementById('advBankName').value = claim.advanceBankName || "";
                document.getElementById('advBankBranch').value = claim.advanceBankBranch || "";
            } else {
                document.getElementById('advRecBankWrapper').style.display = 'none';
            }



            // Autofill default approved amounts
            document.getElementById('advApproveTinhThan').value = claim.advanceTinhThan;
            document.getElementById('advApproveKhac').value = claim.advanceKhac;
            calculateAdvanceApproveTotal();
        } else {
            // Kinh phí bồi thường
            renderKinhPhiDamageGrids(claim);

            document.getElementById('kpRecName').value = claim.nyc;
            document.getElementById('kpRecCard').value = claim.cardNo;
            document.getElementById('kpRecAddress').value = claim.address;
            setKpPayMethod(claim.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt');

            if (claim.advanceRecKenh === 'chuyen-khoan') {
                document.getElementById('kpRecBankWrapper').style.display = 'grid';
                document.getElementById('kpBankUser').value = claim.advanceBankUser || claim.nyc;
                document.getElementById('kpBankAccount').value = claim.advanceBankAccount || "";
                document.getElementById('kpBankName').value = claim.advanceBankName || "";
                document.getElementById('kpBankBranch').value = claim.advanceBankBranch || "";
            } else {
                document.getElementById('kpRecBankWrapper').style.display = 'none';
            }
        }

        document.getElementById('formProposalNotes').value = `Tờ trình đề xuất duyệt cấp phát kinh phí chi trả bồi thường cho vụ việc của người yêu cầu ${claim.nyc}. Mã vụ việc liên kết ${claim.code}.`;

        // Initialize proposalAttachedDocs with a default row
        proposalAttachedDocs = [
            { name: "Tờ trình đề nghị cấp kinh phí bồi thường chính thức", file: "To_trinh_de_nghi_chuyen_vien.pdf" }
        ];
        renderProposalAttachedDocs();

        // showToast("Đã tự động điền đầy đủ thông tin liên quan từ vụ việc bồi thường!", "success");
    }
}

// Formats text input with thousand separators as the user types
function formatNumberInput(input) {
    let value = input.value.replace(/\D/g, '');
    if (value === '') {
        input.value = '0';
        return;
    }
    let num = parseInt(value, 10);
    input.value = num.toLocaleString('vi-VN');
}

const DAMAGE_LABELS = {
    taiSan: "Thiệt hại do tài sản bị xâm phạm",
    thuNhap: "Thiệt hại do thu nhập thực tế bị mất/giảm sút",
    tuVong: "Thiệt hại vật chất do người bị thiệt hại chết",
    sucKhoe: "Thiệt hại vật chất do sức khỏe bị xâm phạm",
    tinhThan: "Thiệt hại về tinh thần",
    chiPhiKhac: "Chi phí hợp lý khác"
};

function renderKinhPhiDamageGrids(claim) {
    const tbody = document.getElementById('kpDamageUnifiedBody');
    tbody.innerHTML = '';

    const DAMAGE_KEYS = ['taiSan', 'thuNhap', 'tuVong', 'sucKhoe', 'tinhThan', 'chiPhiKhac'];
    let idx = 1;

    DAMAGE_KEYS.forEach(key => {
        const amount = (claim.selectedDamages && claim.selectedDamages[key]) ? claim.selectedDamages[key] : 0;
        // Theo SRS: chỉ hiển thị các loại thiệt hại có số tiền bồi thường lớn hơn 0
        if (!(amount > 0)) return;
        const label = DAMAGE_LABELS[key] || key;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align:center; vertical-align:middle;">${idx}</td>
            <td style="font-weight:600; vertical-align:middle;">${label}</td>
            <td style="text-align:right; font-weight:700; background-color:#F8FAFC; vertical-align:middle; padding-right:15px;">${amount.toLocaleString('vi-VN')} VNĐ</td>
            <td style="vertical-align:middle; text-align:right;">
                <input type="text" class="form-control kp-approve-input" data-key="${key}" data-max="${amount}" data-label="${label}" value="${amount.toLocaleString('vi-VN')}" readonly style="font-weight:700; text-align:right; background-color:#F1F5F9; max-width:180px; display:block; margin-left:auto; height:26px; padding:2px 6px; font-size:12.5px;">
            </td>
        `;
        tbody.appendChild(tr);
        idx++;
    });

    // Tự động tính số tiền tạm ứng đã cấp
    let advancePaid = 0;
    proposalsList.forEach(p => {
        if (p.ycbtCode === claim.code && (p.type === 'Cấp tạm ứng' || p.type === 'Đề nghị tạm ứng') && p.status === 'Hoàn thành') {
            advancePaid += p.amount;
        }
    });

    document.getElementById('kpApproveAdvancePaid').value = advancePaid.toLocaleString('vi-VN') + " VNĐ";

    calculateKinhPhiApproveTotal();
}

function calculateAdvanceApproveTotal() {
    const tinhThanStr = document.getElementById('advApproveTinhThan').value.replace(/\D/g, '');
    const tinhThan = parseFloat(tinhThanStr) || 0;
    const khacStr = document.getElementById('advApproveKhac').value.replace(/\D/g, '');
    const khac = parseFloat(khacStr) || 0;
    const total = tinhThan + khac;

    document.getElementById('advApproveTotal').value = total.toLocaleString('vi-VN') + " VNĐ";
    document.getElementById('advApproveTotalWord').innerText = "Viết bằng chữ: " + docTienBangChu(total);
}

function calculateKinhPhiApproveTotal() {
    let totalApprove = 0;
    const inputs = document.querySelectorAll('.kp-approve-input');
    inputs.forEach(input => {
        const valStr = input.value.replace(/\D/g, '');
        totalApprove += parseFloat(valStr) || 0;
    });

    document.getElementById('kpApproveTotal').value = totalApprove.toLocaleString('vi-VN') + " VNĐ";
    document.getElementById('kpApproveTotalWord').innerText = "Viết bằng chữ: " + docTienBangChu(totalApprove);

    const advancePaidStr = document.getElementById('kpApproveAdvancePaid').value.replace(/[^0-9]/g, '');
    const advancePaid = parseInt(advancePaidStr) || 0;
    const remaining = totalApprove - advancePaid;

    document.getElementById('kpApproveRemaining').value = remaining.toLocaleString('vi-VN') + " VNĐ";
}

// Vietnamese currency to words
function docTienBangChu(money) {
    if (money === 0) return "Không đồng";
    const mangSo = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

    function docBlock3(so, daydu) {
        let chu = "";
        let tram = Math.floor(so / 100);
        let chuc = Math.floor((so % 100) / 10);
        let donvi = so % 10;

        if (tram > 0 || daydu) {
            chu += mangSo[tram] + " trăm ";
        }

        if (chuc === 0 && donvi === 0) {
            return chu;
        }

        if (chuc === 0) {
            chu += (chu ? "lẻ " : "") + mangSo[donvi] + " ";
        } else if (chuc === 1) {
            chu += "mười ";
            if (donvi === 5) {
                chu += "lăm ";
            } else if (donvi === 1) {
                chu += "một ";
            } else if (donvi > 0) {
                chu += mangSo[donvi] + " ";
            }
        } else {
            chu += mangSo[chuc] + " mươi ";
            if (donvi === 5) {
                chu += "lăm ";
            } else if (donvi === 1) {
                chu += "mốt ";
            } else if (donvi > 0) {
                chu += mangSo[donvi] + " ";
            }
        }
        return chu;
    }

    let chu = "";
    let hang = [];
    hang[0] = money % 1000;
    hang[1] = Math.floor((money % 1000000) / 1000);
    hang[2] = Math.floor((money % 1000000000) / 1000000);
    hang[3] = Math.floor(money / 1000000000);

    // Chỉ đọc đủ "không trăm" khi đã có hàng lớn hơn được đọc trước đó
    let i = 3;
    while (i >= 0) {
        if (hang[i] > 0) {
            chu += docBlock3(hang[i], chu.length > 0) + (i === 3 ? "tỷ " : i === 2 ? "triệu " : i === 1 ? "nghìn " : "");
        }
        i--;
    }

    chu = chu.trim();
    if (chu.length > 0) {
        chu = chu.charAt(0).toUpperCase() + chu.slice(1) + " đồng";
    }
    return chu;
}

// ATTACHED DOCUMENTS LIST HANDLERS
function addProposalDocRow() {
    proposalAttachedDocs.push({ name: "", file: null });
    renderProposalAttachedDocs();
}

// Khối 6 - Tài liệu đính kèm: 02 bảng Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo (btnn_tai_lieu_kem_theo.js, quy tắc 5.9).
// - Nhập liệu (Lập / Cập nhật đề nghị): 02 bảng nhập, không bắt buộc.
// - Chế độ xem: bảng không có dòng thì ẩn; cả 02 bảng không có dòng thì ẩn cả khối.
// - Dữ liệu cũ chưa phân loại (chưa có scope): hiển thị tại Tài liệu không ban hành kèm theo.
let kpProposalDocsReadOnly = false;
function kpProposalDocsNorm(list) {
    return (Array.isArray(list) ? list : []).map(d => {
        if (!d) return null;
        if (typeof d === 'string') return { name: d.replace(/\.[^.]+$/, ''), file: { name: d } };
        const f = d.file ? (typeof d.file === 'string' ? { name: d.file } : d.file) : null;
        const o = { name: d.name || (f && f.name) || '', file: f };
        if (d.scope) o.scope = d.scope;
        if (d.unit) o.unit = d.unit;
        return o;
    }).filter(d => d && (d.name || d.file));
}
function renderProposalAttachedDocs() {
    const host = document.getElementById('kpProposalDocsHost');
    if (!host) return;
    const block = document.getElementById('block6_NotesAndDocs');
    const rows = kpProposalDocsNorm(proposalAttachedDocs);
    if (kpProposalDocsReadOnly) {
        host.innerHTML = typeof tlktViewHtml === 'function' ? tlktViewHtml(rows, { boxClass: 'tlkt-view', titleClass: 'tlkt-sec-title' }) : '';
        if (block) block.style.display = host.innerHTML.trim() ? 'block' : 'none';
        return;
    }
    if (block) block.style.display = 'block';
    if (typeof tlktMount === 'function') tlktMount('kpProposal', 'kpProposalDocsHost', { rows: rows, secClass: '', titleClass: 'form-label' });
}

function uploadProposalAttachedDoc(idx, input) {
    if (input.files && input.files[0]) {
        const name = input.files[0].name;
        proposalAttachedDocs[idx].file = name;
        renderProposalAttachedDocs();
        // showToast(`Tải lên tệp ${name} thành công!`, "success");
    }
}

function updateProposalDocName(idx, val) {
    proposalAttachedDocs[idx].name = val;
}

function deleteProposalDocRow(idx) {
    proposalAttachedDocs.splice(idx, 1);
    renderProposalAttachedDocs();
}

// Helper to remove claim files (TinhThan / Khac)
function clearClaimFile(type) {
    if (document.getElementById('formClaimSelector').disabled) {
        showToast("Hồ sơ đang ở chế độ xem chi tiết, không thể xóa tài liệu!", "warning");
        return;
    }
    showConfirmModal("Bạn có chắc chắn muốn gỡ tài liệu đính kèm liên quan này không?", () => {
        if (type === 'TinhThan') {
            const el = document.getElementById('advClaimTinhThanFileLink');
            if (el) el.innerHTML = '<span style="color:var(--text-muted);">Đã xóa</span>';
            // showToast("Đã gỡ tài liệu đính kèm tinh thần!", "info");
        } else {
            const el = document.getElementById('advClaimKhacFileLink');
            if (el) el.innerHTML = '<span style="color:var(--text-muted);">Đã xóa</span>';
            //showToast("Đã gỡ tài liệu đính kèm thiệt hại khác!", "info");
        }
    });
}

function removeProposalAttachedDoc(idx) {
    showConfirmModal("Bạn có chắc chắn muốn gỡ tệp đính kèm này không?", () => {
        proposalAttachedDocs[idx].file = null;
        renderProposalAttachedDocs();
        showToast("Đã gỡ tệp đính kèm!", "info");
    });
}

function viewProposalAttachedDoc(idx) {
    // showToast(`Đang mở tệp đính kèm: ${proposalAttachedDocs[idx].file}...`, "info");
}

// Toggling disabled of NYC Fields
function setNycFieldsDisabled(disabled) {
    document.getElementById('formNycName').disabled = disabled;
    document.getElementById('formNycGender').disabled = disabled;
    document.getElementById('formNycBirth').disabled = disabled;

    const radios = document.getElementsByName('formNycVictimAlive');
    const radiors = Array.from(radios);
    radiors.forEach(r => r.disabled = true);

    document.getElementById('formNycPhone').disabled = disabled;
    document.getElementById('formNycEmail').disabled = disabled;
    document.getElementById('formNycCardType').disabled = disabled;
    document.getElementById('formNycCardNo').disabled = disabled;
    document.getElementById('formNycCardDate').disabled = disabled;
    document.getElementById('formNycCardPlace').disabled = disabled;
    document.getElementById('formNycCountry').disabled = disabled;
    document.getElementById('formNycCity').disabled = disabled;
    document.getElementById('formNycAddress').disabled = disabled;
}

// Toggling disabled of Proposal Form Fields
function setProposalFieldsDisabled(disabled) {
    document.getElementById('formProposalCodeVal').disabled = disabled;
    document.getElementById('formProposalSource').disabled = disabled;
    document.getElementById('formProposalCqCap').disabled = disabled;
    document.getElementById('formProposalDate').disabled = disabled;
    document.getElementById('formProposalNotes').disabled = disabled;

    document.getElementById('advApproveTinhThan').disabled = disabled;
    document.getElementById('advApproveKhac').disabled = disabled;

    document.querySelectorAll('.kp-approve-input').forEach(inp => inp.disabled = disabled);
    document.querySelectorAll('#proposalAttachedDocsBody input').forEach(inp => inp.disabled = disabled);
    document.querySelectorAll('#proposalAttachedDocsBody button').forEach(btn => btn.disabled = disabled);

    const addRowBtn = document.querySelector('button[onclick="addProposalDocRow()"]');
    if (addRowBtn) {
        addRowBtn.style.display = disabled ? 'none' : 'inline-flex';
        addRowBtn.disabled = disabled;
    }
    // Khối 6 - Tài liệu đính kèm: khóa nhập -> chế độ xem (ẩn bảng / khối không có dữ liệu)
    kpProposalDocsReadOnly = !!disabled;
    renderProposalAttachedDocs();
}

// Reset proposal attachments table
function resetProposalFileCell() {
    proposalAttachedDocs = [];
    renderProposalAttachedDocs();
}

// FIELD ERROR HIGHLIGHT (Rule 9)
function showFieldError(inputId, errorText) {
    const input = document.getElementById(inputId);
    input.classList.add('is-invalid');

    let errEl = input.parentNode.querySelector('.error-message');
    if (!errEl) {
        errEl = document.createElement('div');
        errEl.className = 'error-message';
        errEl.style.color = 'var(--danger-color)';
        errEl.style.fontSize = '11.5px';
        errEl.style.marginTop = '4px';
        input.parentNode.appendChild(errEl);
    }
    errEl.innerText = errorText;
    input.focus();
}

function clearFieldErrors() {
    const invalids = document.querySelectorAll('.is-invalid');
    invalids.forEach(el => {
        el.classList.remove('is-invalid');
        const err = el.parentNode.querySelector('.error-message');
        if (err) err.remove();
    });
}

// CREATE/EDIT PROPOSAL SUBMIT
function openCreateProposalForm() {
    selectedProposalId = null;
    formEditingMode = true;
    document.getElementById('contentListProposals').style.display = 'none';
    { const ds = document.getElementById('dashboardStats'); if (ds) ds.style.display = 'none'; } // Thẻ thống kê đã bỏ khỏi màn hình

    const panel = document.getElementById('inlineProposalFormPanel');
    panel.style.display = 'flex';

    const badge = document.getElementById('formProposalStatusBadge');
    if (badge) badge.style.display = 'none';

    // Hide Reject Notice by default
    const rej = document.getElementById('blockRejectNotice');
    if (rej) rej.style.display = 'none';
    const quickAction = document.getElementById('rejectNoticeQuickAction');
    if (quickAction) quickAction.style.display = 'none';

    // Accordion setup: Blocks 1, 2, 5, 6 are visible & expanded (Section 4.3.3.2)
    ['block1_General', 'block2_Claimant', 'block5_Recipient', 'block6_NotesAndDocs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
        setAccordionState(id, true);
    });

    // Blocks 7-11 are hidden by default during proposal creation
    ['block7_LeaderApproval', 'block8_NoticeTracking', 'block9_TreasuryTracking', 'block10_PayoutReal', 'block11_TreasuryForfeit'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-file-invoice"></i> LẬP ĐỀ NGHỊ CẤP PHÁT KINH PHÍ BỒI THƯỜNG`;

    // Enable selector block
    setProposalTypeRadio('Cấp tạm ứng', false);
    document.getElementById('formClaimSelector').disabled = false;
    const selectorBlock = document.getElementById('formSelectorBlock');
    if (selectorBlock) selectorBlock.style.display = 'block';
    const searchWrapper = document.getElementById('formClaimSearchWrapper');
    if (searchWrapper) searchWrapper.style.display = 'block';
    const selectorGrid = document.getElementById('formSelectorGrid');
    if (selectorGrid) selectorGrid.style.gridTemplateColumns = '1fr 2fr';

    // Generate proposal code
    const codeNum = proposalsList.length + 1;
    document.getElementById('formProposalCodeVal').value = `KP-2026-0${codeNum}`;
    document.getElementById('formProposalDate').value = new Date().toLocaleDateString('vi-VN');
    document.getElementById('formProposalCqCap').value = "Sở Tài chính Hà Nội";

    // Hide Leader Panel
    document.getElementById('sectionLeaderApproval').style.display = 'none';

    // Show footer buttons for writing (only "Trình phê duyệt")
    document.getElementById('btnSubmitProposal').style.display = 'inline-flex';
    document.getElementById('btnCompletePayout').style.display = 'none';
    document.getElementById('btnLeaderReject').style.display = 'none';
    document.getElementById('btnLeaderApprove').style.display = 'none';
    document.getElementById('btnViewActionFill').style.display = 'none';
    document.getElementById('btnViewActionUpdate').style.display = 'none';
    document.getElementById('btnViewActionPay').style.display = 'none';
    document.getElementById('btnSaveNoticeTracking').style.display = 'none';
    document.getElementById('btnViewActionForfeit').style.display = 'none';
    document.getElementById('btnCompleteTreasuryForfeit').style.display = 'none';

    // Reset File Cell without prompting
    resetProposalFileCell();

    // Clear payout input values
    document.getElementById('payoutDate').value = '';
    document.getElementById('payoutAmountReal').value = '';
    document.getElementById('payoutRecName').value = '';
    document.getElementById('payoutRecAddress').value = '';
    document.getElementById('payoutBankAccount').value = '';
    if (document.getElementById('payoutBankName')) {
        document.getElementById('payoutBankName').value = '';
    }
    document.getElementById('payoutBankUser').value = '';
    if (document.getElementById('payoutBankBranch')) {
        document.getElementById('payoutBankBranch').value = '';
    }
    document.getElementById('payoutReceiptNo').value = '';
    if (document.getElementById('payoutNote')) {
        document.getElementById('payoutNote').value = '';
        document.getElementById('payoutNote').disabled = false;
    }
    const radioTransfer = document.getElementById('payoutMethod_Transfer');
    const radioCash = document.getElementById('payoutMethod_Cash');
    if (radioTransfer) { radioTransfer.checked = true; radioTransfer.disabled = false; }
    if (radioCash) { radioCash.checked = false; radioCash.disabled = false; }
    handlePayoutMethodChange('Nhận qua chuyển khoản');

    // Populate selector dropdown based on default type (automatically toggles Block 3 / Block 4)
    handleTypeChange(document.getElementById('formProposalType').value);

    // Enable NYC editable fields (Always read-only per rule 2)
    setNycFieldsDisabled(true);
    setProposalFieldsDisabled(false);

    // Handle Cancel button display rules: MH02 uses "Hủy"
    const btnCancel = document.getElementById('btnCancelForm');
    btnCancel.style.display = 'inline-flex';
    btnCancel.innerText = 'Hủy';
}

// Thao tác Hủy / Đóng form:
// - Màn MH02 (Lập / Cập nhật): Nút Hủy -> hiển thị popup xác nhận với tiêu đề "Xác nhận hủy bỏ"
// - Màn MH05 (Xem chi tiết) / MH03 / MH04: Nút Đóng -> đóng màn hình luôn ngay lập tức, không hiển thị popup xác nhận
function handleCloseProposalForm() {
    if (formEditingMode) {
        showConfirmModal(
            'Bạn có chắc chắn muốn hủy bỏ các thay đổi đang nhập và đóng biểu mẫu không?',
            () => {
                closeCreateProposalForm();
            },
            'Xác nhận hủy bỏ'
        );
    } else {
        closeCreateProposalForm();
    }
}

function closeCreateProposalForm() {
    formEditingMode = false;
    document.getElementById('inlineProposalFormPanel').style.display = 'none';
    document.getElementById('contentListProposals').style.display = 'block';
    { const ds = document.getElementById('dashboardStats'); if (ds) ds.style.display = 'grid'; } // Thẻ thống kê đã bỏ khỏi màn hình
    const rej = document.getElementById('blockRejectNotice');
    if (rej) rej.style.display = 'none';
    ['block7_LeaderApproval', 'block8_NoticeTracking', 'block9_TreasuryTracking', 'block10_PayoutReal', 'block11_TreasuryForfeit'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    document.getElementById('sectionPayoutReal').style.display = 'none';
    document.getElementById('sectionNoticeTracking').style.display = 'none';
    document.getElementById('sectionTreasuryForfeit').style.display = 'none';
    document.getElementById('btnLeaderReject').style.display = 'none';
    document.getElementById('btnLeaderApprove').style.display = 'none';
    document.getElementById('btnSaveNoticeTracking').style.display = 'none';
    document.getElementById('btnViewActionForfeit').style.display = 'none';
    document.getElementById('btnCompleteTreasuryForfeit').style.display = 'none';
    payoutAttachedFile = null;
    noticeProofAttachedFile = null;
    noticeTrackingAttachedFile = [];
    treasuryAttachedFile = [];
    renderProposalsTable();
}

// Lưu đề nghị kinh phí: chỉ có 01 thao tác "Trình phê duyệt" -> trạng thái Chờ duyệt (không có trạng thái trung gian).
function saveProposal() {
    const statusStr = 'Chờ duyệt';
    clearFieldErrors();

    const proposalCode = document.getElementById('formProposalCodeVal').value.trim();
    const proposalType = document.getElementById('formProposalType').value;
    const ycbtCode = document.getElementById('formClaimCode').value;
    const source = document.getElementById('formProposalSource').value;
    const cqCap = document.getElementById('formProposalCqCap').value.trim();
    const notes = document.getElementById('formProposalNotes').value.trim();
    const date = document.getElementById('formProposalDate').value;
    const user = "Lê Văn Nam"; // Cán bộ xử lý tự động lấy cán bộ đăng nhập

    if (!ycbtCode) {
        showFieldError('formClaimSearchInput', 'Đây là trường bắt buộc');
        showCustomAlertModal("Vui lòng tìm kiếm và chọn vụ việc yêu cầu bồi thường liên kết trước khi thực hiện!", "Chưa chọn vụ việc", "warning");
        return;
    }

    // Business rules validation: Duplicate & Status checks
    const claimValidation = validateClaimForProposalType(ycbtCode, proposalType);
    if (!claimValidation.valid) {
        showFieldError('formClaimSearchInput', claimValidation.message);
        showCustomAlertModal(claimValidation.message, "Không thể lưu đề nghị", "error");
        return;
    }

    if (!cqCap) {
        showFieldError('formProposalCqCap', 'Đây là trường bắt buộc');
        return;
    }

    let amount = 0;
    let customFields = {};

    if (proposalType === 'Cấp tạm ứng') {
        const tinhThanStr = document.getElementById('advApproveTinhThan').value.replace(/\D/g, '');
        const tinhThanApprove = parseFloat(tinhThanStr) || 0;
        const khacStr = document.getElementById('advApproveKhac').value.replace(/\D/g, '');
        const khacApprove = parseFloat(khacStr) || 0;

        const claim = mockClaims.find(c => c.code === ycbtCode);

        const minTinhThan = claim.advanceTinhThan * 0.5;
        const minKhac = claim.advanceKhac * 0.5;

        if (tinhThanApprove < minTinhThan) {
            showFieldError('advApproveTinhThan', `Số tiền duyệt phải tối thiểu bằng 50% mức yêu cầu (${minTinhThan.toLocaleString('vi-VN')} VNĐ)`);
            return;
        }
        if (khacApprove < minKhac) {
            showFieldError('advApproveKhac', `Số tiền duyệt phải tối thiểu bằng 50% mức yêu cầu (${minKhac.toLocaleString('vi-VN')} VNĐ)`);
            return;
        }

        amount = tinhThanApprove + khacApprove;
        customFields = {
            advApproveTinhThan: tinhThanApprove,
            advApproveKhac: khacApprove
        };
    } else {
        // Kinh phí bồi thường
        let approvedDamages = {};
        let overCapField = null;
        const inputs = document.querySelectorAll('.kp-approve-input');
        inputs.forEach(input => {
            const key = input.dataset.key;
            const valStr = input.value.replace(/\D/g, '');
            const val = parseFloat(valStr) || 0;
            const maxVal = parseFloat(input.dataset.max) || 0;
            if (val > maxVal && !overCapField) {
                overCapField = { input, maxVal, label: input.dataset.label };
            }
            approvedDamages[key] = val;
            amount += val;
        });

        if (overCapField) {
            overCapField.input.classList.add('is-invalid');
            let err = overCapField.input.parentNode.querySelector('.error-message');
            if (!err) {
                err = document.createElement('div');
                err.className = 'error-message';
                err.style.color = 'var(--danger-color)';
                err.style.fontSize = '11.5px';
                err.style.marginTop = '4px';
                overCapField.input.parentNode.appendChild(err);
            }
            err.innerText = `Số tiền duyệt cấp không được vượt quá mức đề nghị trong hồ sơ gốc (${overCapField.maxVal.toLocaleString('vi-VN')} VNĐ) đối với "${overCapField.label}"`;
            overCapField.input.focus();
            return;
        }

        customFields = {
            approvedDamages: approvedDamages
        };
    }

    const nycName = document.getElementById('formNycName').value;

    // Khối 6 - Tài liệu đính kèm: 02 bảng Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo, không bắt buộc;
    // dòng đã nhập phải đủ Tên tài liệu, văn bản và tệp
    if (typeof tlktValidate === 'function' && !tlktValidate('kpProposal')) return;
    const validFiles = typeof tlktGet === 'function' ? tlktGet('kpProposal') : kpProposalDocsNorm(proposalAttachedDocs);

    if (selectedProposalId) {
        // Update
        const item = proposalsList.find(p => p.id === selectedProposalId);
        if (item) {
            item.code = proposalCode;
            item.type = proposalType;
            item.amount = amount;
            item.source = source;
            item.cqCap = cqCap;
            item.notes = notes;
            item.date = date;
            item.status = statusStr;
            item.files = validFiles;

            // Copy custom fields
            for (const key in customFields) {
                item[key] = customFields[key];
            }
        }
        showToast(`Cập nhật đề nghị ${proposalCode} thành công và chuyển sang trạng thái ${statusStr}!`, "success");
    } else {
        // Insert
        const newItem = {
            id: "P" + (proposalsList.length + 1),
            code: proposalCode,
            type: proposalType,
            ycbtCode: ycbtCode,
            nycName: nycName,
            amount: amount,
            user: user,
            date: date,
            status: statusStr,
            source: source,
            cqCap: cqCap,
            notes: notes,
            files: validFiles,
            ...customFields
        };
        proposalsList.unshift(newItem);
        showToast(`Khởi tạo đề nghị ${proposalCode} thành công và chuyển sang trạng thái ${statusStr}!`, "success");
    }

    localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
    updateBudgetStats();
    closeCreateProposalForm();
}

// DYNAMICS FILL/CREATE PROPOSAL FROM AN AUTO-GENERATED RECORD
function fillProposalDirect(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;

    openCreateProposalForm();
    selectedProposalId = id;
    formEditingMode = true;

    // Set form title based on type
    if (item.type === 'Kinh phí bồi thường' || item.type === 'Cấp kinh phí bồi thường') {
        document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-file-signature"></i> LẬP ĐỀ NGHỊ CẤP PHÁT KINH PHÍ BỒI THƯỜNG: ${item.code}`;
    } else {
        document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-file-signature"></i> LẬP ĐỀ NGHỊ TẠM ỨNG KINH PHÍ: ${item.code}`;
    }

    // Set type and disable it so it cannot be edited
    const typeVal = (item.type === 'Kinh phí bồi thường' || item.type === 'Cấp kinh phí bồi thường') ? 'Cấp kinh phí bồi thường' : 'Cấp tạm ứng';
    setProposalTypeRadio(typeVal, true);

    // Trigger type change to render correct dynamic tables
    handleTypeChange(typeVal);

    // Hide linked claim selector block
    const selectorBlock = document.getElementById('formSelectorBlock');
    if (selectorBlock) selectorBlock.style.display = 'none';

    // Auto-fill linked claim
    handleClaimSelected(item.ycbtCode);

    // Fill general proposal metadata fields
    document.getElementById('formProposalCodeVal').value = item.code;
    document.getElementById('formProposalDate').value = item.date;
    document.getElementById('formProposalUser').value = item.user;
    document.getElementById('formProposalSource').value = item.source || 'Tạm ứng kinh phí Bộ Tài chính';
    document.getElementById('formProposalCqCap').value = item.cqCap || 'Sở Tư pháp Hà Nội';
    document.getElementById('formProposalNotes').value = item.notes || '';
    // Fill approved values from the item instead of the claim default values
    if (document.getElementById('formProposalType').value === 'Cấp tạm ứng') {
        document.getElementById('advApproveTinhThan').value = (item.advApproveTinhThan || 0).toLocaleString('vi-VN');
        document.getElementById('advApproveKhac').value = (item.advApproveKhac || 0).toLocaleString('vi-VN');
        calculateAdvanceApproveTotal();
    } else {
        const approvedDamages = item.approvedDamages || {};
        const inputs = document.querySelectorAll('.kp-approve-input');
        inputs.forEach(input => {
            const key = input.dataset.key;
            if (approvedDamages[key] !== undefined) {
                input.value = approvedDamages[key].toLocaleString('vi-VN');
            } else {
                input.value = '0';
            }
        });
        calculateKinhPhiApproveTotal();
    }

    // Custom buttons for Lập đề nghị: show submit proposal
    document.getElementById('btnSubmitProposal').style.display = 'inline-flex';
    document.getElementById('btnSubmitProposal').innerHTML = `<i class="fa-solid fa-paper-plane"></i> Trình phê duyệt`;
    document.getElementById('btnCompletePayout').style.display = 'none';
    document.getElementById('btnLeaderReject').style.display = 'none';
    document.getElementById('btnLeaderApprove').style.display = 'none';

    // Clear and reset files to empty, ready to upload
    proposalAttachedDocs = [];
    renderProposalAttachedDocs();
}

// UPDATE PROPOSAL DIRECT FROM "BỊ TRẢ LẠI" STATUS
function updateProposalDirect(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;

    openCreateProposalForm();
    selectedProposalId = id;
    formEditingMode = true;

    // Set form title
    if (item.type === 'Kinh phí bồi thường' || item.type === 'Cấp kinh phí bồi thường') {
        document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> CẬP NHẬT ĐỀ NGHỊ CẤP PHÁT KINH PHÍ BỒI THƯỜNG: ${item.code}`;
    } else {
        document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> CẬP NHẬT ĐỀ NGHỊ TẠM ỨNG KINH PHÍ: ${item.code}`;
    }

    // Lock type select and hide selector block
    const typeVal = (item.type === 'Kinh phí bồi thường' || item.type === 'Cấp kinh phí bồi thường') ? 'Cấp kinh phí bồi thường' : 'Cấp tạm ứng';
    setProposalTypeRadio(typeVal, true);
    handleTypeChange(typeVal);

    const selectorBlock = document.getElementById('formSelectorBlock');
    if (selectorBlock) selectorBlock.style.display = 'none';

    // Load claim details
    handleClaimSelected(item.ycbtCode);

    // Fill general proposal metadata fields
    document.getElementById('formProposalCodeVal').value = item.code;
    document.getElementById('formProposalDate').value = item.date;
    document.getElementById('formProposalUser').value = item.user;
    document.getElementById('formProposalSource').value = item.source || '';
    document.getElementById('formProposalCqCap').value = item.cqCap || '';
    document.getElementById('formProposalNotes').value = item.notes || '';

    // Fill approved values from the item instead of the claim default values
    if (document.getElementById('formProposalType').value === 'Cấp tạm ứng') {
        document.getElementById('advApproveTinhThan').value = (item.advApproveTinhThan || 0).toLocaleString('vi-VN');
        document.getElementById('advApproveKhac').value = (item.advApproveKhac || 0).toLocaleString('vi-VN');
        calculateAdvanceApproveTotal();
    } else {
        const approvedDamages = item.approvedDamages || {};
        const inputs = document.querySelectorAll('.kp-approve-input');
        inputs.forEach(input => {
            const key = input.dataset.key;
            if (approvedDamages[key] !== undefined) {
                input.value = approvedDamages[key].toLocaleString('vi-VN');
            }
        });
        calculateKinhPhiApproveTotal();
    }

    // Show Reject Notice Banner (Section 4.3.3.2)
    const blockReject = document.getElementById('blockRejectNotice');
    if (blockReject) {
        blockReject.style.display = 'block';
        const reasonEl = document.getElementById('rejectNoticeReasonText');
        if (reasonEl) reasonEl.innerText = item.leaderOpinion || 'Hồ sơ chưa đạt yêu cầu, cần bổ sung căn cứ xác minh thiệt hại.';
        const leaderEl = document.getElementById('rejectNoticeLeaderName');
        if (leaderEl) leaderEl.innerText = item.approvedLeader || 'Lãnh đạo cơ quan';
        const rejDateEl = document.getElementById('rejectNoticeDate');
        if (rejDateEl) rejDateEl.innerText = item.approvedDate || item.date || '05/07/2026';
    }

    // Show Block 7 (Leader opinion section) as read-only and expand it
    const block7 = document.getElementById('block7_LeaderApproval');
    if (item.leaderOpinion) {
        if (block7) {
            block7.style.display = 'block';
            setAccordionState('block7_LeaderApproval', true);
        }
        document.getElementById('sectionLeaderApproval').style.display = 'block';
        const badge = document.getElementById('leaderApprovalBadge');
        if (badge) {
            badge.className = 'badge badge-tra-lai';
            badge.innerText = 'Bị trả lại';
        }
        const nameEl = document.getElementById('viewLeaderName');
        if (nameEl) nameEl.innerText = item.approvedLeader || 'Lãnh đạo cơ quan';
        const dateEl = document.getElementById('viewLeaderDate');
        if (dateEl) dateEl.innerText = item.approvedDate || (item.createdAt || '04/09/2026');
        const textEl = document.getElementById('viewLeaderOpinionText');
        if (textEl) {
            textEl.innerText = item.leaderOpinion;
            textEl.style.borderLeftColor = 'var(--danger-color)';
        }
    } else {
        if (block7) block7.style.display = 'none';
        document.getElementById('sectionLeaderApproval').style.display = 'none';
    }

    // Ensure Blocks 8 to 11 remain hidden
    ['block8_NoticeTracking', 'block9_TreasuryTracking', 'block10_PayoutReal', 'block11_TreasuryForfeit'].forEach(bid => {
        const el = document.getElementById(bid);
        if (el) el.style.display = 'none';
    });

    // Custom buttons for edit mode: show submit proposal
    document.getElementById('btnSubmitProposal').style.display = 'inline-flex';
    document.getElementById('btnSubmitProposal').innerHTML = `<i class="fa-solid fa-paper-plane"></i> Trình phê duyệt`;
    document.getElementById('btnCompletePayout').style.display = 'none';
    document.getElementById('btnLeaderReject').style.display = 'none';
    document.getElementById('btnLeaderApprove').style.display = 'none';
    const btnCancel = document.getElementById('btnCancelForm');
    if (btnCancel) {
        btnCancel.style.display = 'inline-flex';
        btnCancel.innerText = 'Hủy';
    }

    // Attached files
    proposalAttachedDocs = item.files ? [...item.files] : [];
    renderProposalAttachedDocs();

    // Auto-focus on proposal notes and scroll to show the reject reason
    setTimeout(() => {
        const notes = document.getElementById('formProposalNotes');
        if (notes) {
            notes.focus();
            notes.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 150);
}

// VIEW DETAILS
function viewProposalDetail(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;

    const activeRole = document.getElementById('roleSelector').value;
    const isLeader = activeRole === 'lanh-dao';
    const isPending = item.status === 'Chờ duyệt';
    const isEditingAllowed = isLeader && isPending;

    openCreateProposalForm();
    selectedProposalId = id;
    formEditingMode = false;

    // Hide submit proposal button during detailed viewing
    document.getElementById('btnSubmitProposal').style.display = 'none';

    document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-circle-info"></i> CHI TIẾT ĐỀ NGHỊ KINH PHÍ: ${item.code}`;
    const badge = document.getElementById('formProposalStatusBadge');
    if (badge) {
        let statusClass = 'badge-draft';
        if (item.status === 'Chờ duyệt' || item.status === 'Chờ phê duyệt') statusClass = 'badge-pending';
        else if (item.status === 'Đã duyệt' || item.status === 'Đã cấp kinh phí' || item.status === 'Hoàn thành' || item.status === 'Đã sung quỹ') statusClass = 'badge-success';
        else if (item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần') statusClass = 'badge-warning';
        else if (item.status === 'Bị trả lại') statusClass = 'badge-tra-lai';
        else if (item.status === 'Từ chối') statusClass = 'badge-danger';
        
        badge.className = 'badge ' + statusClass;
        badge.innerText = item.status;
        badge.style.display = 'inline-block';
    }

    // Set dynamic section title based on proposal type
    const secTitle = document.getElementById('formProposalSectionTitle');
    if (secTitle) {
        if (item.type === 'Đề nghị tạm ứng' || item.type === 'Cấp tạm ứng') {
            secTitle.innerText = "III. Nội dung đề xuất cấp tạm ứng";
        } else {
            secTitle.innerText = "III. Nội dung đề xuất cấp kinh phí bồi thường";
        }
    }

    // Disable proposal selector block and hide search wrapper
    const typeVal = (item.type === 'Đề nghị tạm ứng' || item.type === 'Cấp tạm ứng') ? 'Cấp tạm ứng' : 'Cấp kinh phí bồi thường';
    setProposalTypeRadio(typeVal, true);

    const selectorBlock = document.getElementById('formSelectorBlock');
    if (selectorBlock) selectorBlock.style.display = 'block';

    const searchWrapper = document.getElementById('formClaimSearchWrapper');
    if (searchWrapper) searchWrapper.style.display = 'none';

    const selectorGrid = document.getElementById('formSelectorGrid');
    if (selectorGrid) selectorGrid.style.gridTemplateColumns = '1fr';

    // Load and link selector
    const claimSelector = document.getElementById('formClaimSelector');
    claimSelector.innerHTML = `<option value="${item.ycbtCode}">${item.ycbtCode} - ${item.nycName}</option>`;
    claimSelector.value = item.ycbtCode;
    claimSelector.disabled = true;

    // Sync quick search input
    document.getElementById('formClaimSearchInput').value = item.ycbtCode;

    // Load claim inputs
    document.getElementById('formClaimCode').value = item.ycbtCode;
    document.getElementById('formClaimAgency').value = item.cqCap;
    document.getElementById('formClaimField').value = "Bồi thường Nhà nước";
    document.getElementById('formClaimAmount').value = item.amount.toLocaleString('vi-VN') + " đ";

    // Load full NYC details
    const claimDetails = mockClaims.find(c => c.code === item.ycbtCode) || mockClaims[0];
    document.getElementById('formNycName').value = item.nycName;
    document.getElementById('formNycRole').value = claimDetails.role;
    document.getElementById('formNycGender').value = claimDetails.gender;
    document.getElementById('formNycBirth').value = claimDetails.birth;

    const radios = document.getElementsByName('formNycVictimAlive');
    if (claimDetails.nycVictimAlive === 'no') {
        if (radios[1]) radios[1].checked = true;
    } else {
        if (radios[0]) radios[0].checked = true;
    }

    document.getElementById('formNycPhone').value = claimDetails.phone;
    document.getElementById('formNycEmail').value = claimDetails.email || "";
    document.getElementById('formNycCardType').value = claimDetails.cardType || "CMND/CCCD/Chứng minh quân đội";
    document.getElementById('formNycCardNo').value = claimDetails.cardNo;
    document.getElementById('formNycCardDate').value = claimDetails.cardDate;
    document.getElementById('formNycCardPlace').value = claimDetails.cardPlace;
    document.getElementById('formNycCountry').value = claimDetails.country || "Việt Nam";
    document.getElementById('formNycCity').value = claimDetails.city || "Hà Nội";
    document.getElementById('formNycWard').value = claimDetails.ward || 'Phường Dịch Vọng';
    document.getElementById('formNycAddress').value = claimDetails.address;

    // Disable claimant fields
    setNycFieldsDisabled(true);
    setProposalFieldsDisabled(true);

    // Proposal details
    document.getElementById('formProposalCodeVal').value = item.code;
    document.getElementById('formProposalSource').value = item.source;
    document.getElementById('formProposalUser').value = item.user || '';
    document.getElementById('formProposalCqCap').value = item.cqCap;
    document.getElementById('formProposalDate').value = item.date;
    document.getElementById('formProposalNotes').value = item.notes;

    // Display dynamic grids based on type
    const block3 = document.getElementById('block3_AdvanceTable');
    const block4 = document.getElementById('block4_KinhPhiTable');
    const recAdv = document.getElementById('recAdvanceBlock');
    const recKp = document.getElementById('recKinhPhiBlock');

    if (item.type === 'Đề nghị tạm ứng' || item.type === 'Cấp tạm ứng') {
        if (block3) { block3.style.display = 'block'; setAccordionState('block3_AdvanceTable', true); }
        if (block4) block4.style.display = 'none';
        if (recAdv) recAdv.style.display = 'block';
        if (recKp) recKp.style.display = 'none';
        document.getElementById('wrapperAdvanceProposal').style.display = 'block';
        document.getElementById('wrapperKinhPhiProposal').style.display = 'none';

        document.getElementById('advClaimTinhThan').value = (claimDetails.advanceTinhThan || 0).toLocaleString('vi-VN') + " đ";
        document.getElementById('advClaimKhac').value = (claimDetails.advanceKhac || 0).toLocaleString('vi-VN') + " đ";

        const totalAdv = (claimDetails.advanceTinhThan || 0) + (claimDetails.advanceKhac || 0);
        document.getElementById('advClaimTotal').value = totalAdv.toLocaleString('vi-VN') + " đ";
        document.getElementById('advClaimTotalWord').innerText = "Viết bằng chữ: " + docTienBangChu(totalAdv);

        document.getElementById('advRecName').value = claimDetails.nyc;
        document.getElementById('advRecCard').value = claimDetails.cardNo;
        document.getElementById('advRecAddress').value = claimDetails.address;
        setAdvPayMethod(claimDetails.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt');

        if (claimDetails.advanceRecKenh === 'chuyen-khoan') {
            document.getElementById('advRecBankWrapper').style.display = 'grid';
            document.getElementById('advBankUser').value = claimDetails.advanceBankUser || claimDetails.nyc;
            document.getElementById('advBankAccount').value = claimDetails.advanceBankAccount || "";
            document.getElementById('advBankName').value = claimDetails.advanceBankName || "";
            document.getElementById('advBankBranch').value = claimDetails.advanceBankBranch || "";
        } else {
            document.getElementById('advRecBankWrapper').style.display = 'none';
        }

        const valTinhThan = item.advApproveTinhThan || 0;
        const valKhac = item.advApproveKhac || 0;
        if (isEditingAllowed) {
            document.getElementById('advApproveTinhThan').value = valTinhThan.toLocaleString('vi-VN');
            document.getElementById('advApproveKhac').value = valKhac.toLocaleString('vi-VN');
            document.getElementById('advApproveTinhThan').disabled = false;
            document.getElementById('advApproveKhac').disabled = false;
        } else {
            document.getElementById('advApproveTinhThan').value = valTinhThan.toLocaleString('vi-VN') + " VNĐ";
            document.getElementById('advApproveKhac').value = valKhac.toLocaleString('vi-VN') + " VNĐ";
            document.getElementById('advApproveTinhThan').disabled = true;
            document.getElementById('advApproveKhac').disabled = true;
        }

        calculateAdvanceApproveTotal();
    } else {
        if (block3) block3.style.display = 'none';
        if (block4) { block4.style.display = 'block'; setAccordionState('block4_KinhPhiTable', true); }
        if (recAdv) recAdv.style.display = 'none';
        if (recKp) recKp.style.display = 'block';
        document.getElementById('wrapperAdvanceProposal').style.display = 'none';
        document.getElementById('wrapperKinhPhiProposal').style.display = 'block';

        // Render unified comparison damage grids
        renderKinhPhiDamageGrids(claimDetails);

        // Populate approved values
        const approvedDamages = item.approvedDamages || {};
        const inputs = document.querySelectorAll('.kp-approve-input');
        inputs.forEach(input => {
            const key = input.dataset.key;
            const val = approvedDamages[key] !== undefined ? approvedDamages[key] : 0;
            if (isEditingAllowed) {
                input.value = val.toLocaleString('vi-VN');
                input.disabled = false;
            } else {
                input.value = val.toLocaleString('vi-VN') + " VNĐ";
                input.disabled = true;
            }
        });

        document.getElementById('kpRecName').value = claimDetails.nyc;
        document.getElementById('kpRecCard').value = claimDetails.cardNo;
        document.getElementById('kpRecAddress').value = claimDetails.address;
        setKpPayMethod(claimDetails.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt');

        if (claimDetails.advanceRecKenh === 'chuyen-khoan') {
            document.getElementById('kpRecBankWrapper').style.display = 'grid';
            document.getElementById('kpBankUser').value = claimDetails.advanceBankUser || claimDetails.nyc;
            document.getElementById('kpBankAccount').value = claimDetails.advanceBankAccount || "";
            document.getElementById('kpBankName').value = claimDetails.advanceBankName || "";
            document.getElementById('kpBankBranch').value = claimDetails.advanceBankBranch || "";
        } else {
            document.getElementById('kpRecBankWrapper').style.display = 'none';
        }

        calculateKinhPhiApproveTotal();
    }

    // Populate attached documents
    proposalAttachedDocs = item.files ? [...item.files] : [];
    renderProposalAttachedDocs();

    // Disable attached doc row addition / updates
    document.querySelectorAll('#proposalAttachedDocsBody input').forEach(inp => inp.disabled = true);

    // Adjust Cancel button (MH05 uses "Đóng")
    const btnCancel = document.getElementById('btnCancelForm');
    if (btnCancel) {
        btnCancel.style.display = 'inline-flex';
        btnCancel.innerText = 'Đóng';
    }

    // Reject notice banner (Khối Lý do bị trả lại theo SRS 4.3.3.2.7.2)
    const blockReject = document.getElementById('blockRejectNotice');
    if (item.status === 'Bị trả lại') {
        if (blockReject) {
            blockReject.style.display = 'block';
            const reasonEl = document.getElementById('rejectNoticeReasonText');
            if (reasonEl) reasonEl.innerText = item.leaderOpinion || 'Hồ sơ chưa đạt yêu cầu, cần bổ sung căn cứ xác minh thiệt hại.';
            const leaderEl = document.getElementById('rejectNoticeLeaderName');
            if (leaderEl) leaderEl.innerText = item.approvedLeader || 'Lãnh đạo cơ quan';
            const rejDateEl = document.getElementById('rejectNoticeDate');
            if (rejDateEl) rejDateEl.innerText = item.approvedDate || item.date || '05/07/2026';
        }
    } else {
        if (blockReject) blockReject.style.display = 'none';
    }

    // Accordion setup: Blocks 1, 2, 5, 6 default to EXPANDED (MH05)
    ['block1_General', 'block2_Claimant', 'block5_Recipient', 'block6_NotesAndDocs'].forEach(b => {
        const el = document.getElementById(b);
        if (el) el.style.display = 'block';
        setAccordionState(b, true);
    });

    // Payout section handling
    const sectionPayout = document.getElementById('sectionPayoutReal');
    document.getElementById('sectionNoticeTracking').dataset.editing = 'false';
    renderNoticeTrackingSection(item);
    resetTreasuryForfeitForm();

    const isSungQuy = (item.status === 'Trả lại ngân sách nhà nước' || item.status === 'Đã sung quỹ');
    const b11 = document.getElementById('block11_TreasuryForfeit');
    if (isSungQuy) {
        if (b11) {
            b11.style.display = 'block';
            setAccordionState('block11_TreasuryForfeit', true);
        }
        const sectionTreasury = document.getElementById('sectionTreasuryForfeit');
        if (sectionTreasury) sectionTreasury.style.display = 'block';
        document.getElementById('treasuryVoucherNo').value = item.treasuryVoucherNo || '';
        document.getElementById('treasuryForfeitDate').value = item.treasuryForfeitDate || '';
        document.getElementById('treasuryForfeitAmount').value = (item.treasuryAmount || 0).toLocaleString('vi-VN');
        document.getElementById('treasuryForfeitReason').value = item.treasuryReason || '';
        ['treasuryVoucherNo', 'treasuryForfeitDate', 'treasuryForfeitAmount', 'treasuryForfeitReason'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.disabled = true;
        });
        const treasuryUploadBtn = document.getElementById('btnTreasuryFileUpload');
        if (treasuryUploadBtn) treasuryUploadBtn.style.display = 'none';
        treasuryAttachedFile = normalizeFileList(item.treasuryFile);
        renderTreasuryFile(true);
    } else {
        if (b11) b11.style.display = 'none';
    }

    const b10 = document.getElementById('block10_PayoutReal');
    const hasPayoutTracking = item.payoutDate || item.status === 'Hoàn thành';
    if (hasPayoutTracking) {
        if (b10) {
            b10.style.display = 'block';
            setAccordionState('block10_PayoutReal', true);
        }
        sectionPayout.style.display = 'block';
        document.getElementById('payoutDate').value = item.payoutDate || '';
        document.getElementById('payoutDate').disabled = true;

        document.getElementById('payoutAmountReal').value = (item.payoutAmountReal || item.amount || 0).toLocaleString('vi-VN');
        document.getElementById('payoutAmountReal').disabled = true;

        const isCash = item.payoutMethod === 'Nhận tiền mặt' || item.payoutMethod === 'Tiền mặt';
        const radioTransfer = document.getElementById('payoutMethod_Transfer');
        const radioCash = document.getElementById('payoutMethod_Cash');
        if (isCash) {
            if (radioCash) { radioCash.checked = true; radioCash.disabled = true; }
            if (radioTransfer) { radioTransfer.checked = false; radioTransfer.disabled = true; }
            handlePayoutMethodChange('Nhận tiền mặt');
        } else {
            if (radioTransfer) { radioTransfer.checked = true; radioTransfer.disabled = true; }
            if (radioCash) { radioCash.checked = false; radioCash.disabled = true; }
            handlePayoutMethodChange('Nhận qua chuyển khoản');
        }

        document.getElementById('payoutRecName').value = item.payoutRecName || item.nycName;
        document.getElementById('payoutRecName').disabled = true;

        document.getElementById('payoutRecAddress').value = item.payoutRecAddress || "";
        document.getElementById('payoutRecAddress').disabled = true;

        document.getElementById('payoutBankAccount').value = item.payoutBankAccount || "";
        document.getElementById('payoutBankAccount').disabled = true;

        if (document.getElementById('payoutBankName')) {
            document.getElementById('payoutBankName').value = item.payoutBankName || "";
            document.getElementById('payoutBankName').disabled = true;
        }

        document.getElementById('payoutBankUser').value = item.payoutBankUser || "";
        document.getElementById('payoutBankUser').disabled = true;

        if (document.getElementById('payoutBankBranch')) {
            document.getElementById('payoutBankBranch').value = item.payoutBankBranch || "";
            document.getElementById('payoutBankBranch').disabled = true;
        }

        document.getElementById('payoutReceiptNo').value = item.payoutReceiptNo || "";
        document.getElementById('payoutReceiptNo').disabled = true;

        if (document.getElementById('payoutNote')) {
            document.getElementById('payoutNote').value = item.payoutNote || "";
            document.getElementById('payoutNote').disabled = true;
        }

        // Hide payout select file button
        document.getElementById('btnPayoutUpload').style.display = 'none';

        // Show payout file link as read-only
        document.getElementById('payoutFileLink').innerHTML = `
            ${item.payoutFile
                ? `<span style="font-weight:600; color:var(--text-color);">${item.payoutFile}</span>
                   <span style="margin-left: 10px; font-weight:600; font-size:12px;">
                       <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;">Xem file</a>
                   </span>`
                : `<span style="color:var(--text-muted); font-style:italic;">Chưa phát sinh chứng từ chi trả</span>`}
        `;
        renderPayoutTreasuryResult(item);
    } else {
        if (b10) b10.style.display = 'none';
        sectionPayout.style.display = 'none';
        document.getElementById('btnPayoutUpload').style.display = 'inline-flex';
        const treasuryResultBox = document.getElementById('payoutTreasuryResultBox');
        if (treasuryResultBox) {
            treasuryResultBox.style.display = 'none';
            treasuryResultBox.innerHTML = '';
        }
    }

    // Block 8 (Notice Tracking) Accordion configuration (Section 4.3.3.2 MH05)
    const b8 = document.getElementById('block8_NoticeTracking');
    if (item.status === 'Chờ chi trả') {
        if (b8) {
            b8.style.display = 'block';
            setAccordionState('block8_NoticeTracking', true);
        }
    } else if (item.status === 'Hoàn thành' || isSungQuy) {
        if (b8) {
            b8.style.display = 'block';
            setAccordionState('block8_NoticeTracking', false); // collapsed when finished or forfeited
        }
    } else {
        if (b8) b8.style.display = 'none';
    }

    // Block 9 (Treasury Tracking) Accordion configuration
    const b9 = document.getElementById('block9_TreasuryTracking');
    if (item.noticeReceivedDate) {
        if (b9) {
            b9.style.display = 'block';
            setAccordionState('block9_TreasuryTracking', true);
            renderTreasuryTrackingBlock(item);
        }
    } else {
        if (b9) b9.style.display = 'none';
    }

    // Hide complete payout button when just viewing
    document.getElementById('btnCompletePayout').style.display = 'none';

    // Block 7 (Leader opinion section) & Leader actions
    const b7 = document.getElementById('block7_LeaderApproval');
    if (isLeader && isPending) {
        if (b7) b7.style.display = 'none';
        document.getElementById('sectionLeaderApproval').style.display = 'none';
        document.getElementById('btnSubmitProposal').style.display = 'none';
        document.getElementById('btnLeaderReject').style.display = 'inline-flex';
        document.getElementById('btnLeaderApprove').style.display = 'inline-flex';
    } else {
        document.getElementById('btnLeaderReject').style.display = 'none';
        document.getElementById('btnLeaderApprove').style.display = 'none';

        // If it is in Read-only or Approved status, hide form actions too except cancel
        if (item.status === 'Hoàn thành' || item.status === 'Chờ chi trả' || isSungQuy || item.status === 'Bị trả lại' || isLeader) {
            document.getElementById('btnSubmitProposal').style.display = 'none';

            if (item.leaderOpinion || item.status === 'Chờ chi trả' || item.status === 'Hoàn thành' || isSungQuy) {
                if (b7) {
                    b7.style.display = 'block';
                    setAccordionState('block7_LeaderApproval', true);
                }
                document.getElementById('sectionLeaderApproval').style.display = 'block';
                const approvalBadge = document.getElementById('leaderApprovalBadge');
                if (approvalBadge) {
                    approvalBadge.className = item.status === 'Bị trả lại' ? 'badge badge-tra-lai' : 'badge badge-success';
                    approvalBadge.innerText = item.status === 'Bị trả lại' ? 'Bị trả lại' : 'Đã phê duyệt';
                }
                const nameEl = document.getElementById('viewLeaderName');
                if (nameEl) nameEl.innerText = item.approvedLeader || 'Lãnh đạo cơ quan';
                const dateEl = document.getElementById('viewLeaderDate');
                if (dateEl) dateEl.innerText = item.approvedDate || (item.createdAt || '04/09/2026');
                const textEl = document.getElementById('viewLeaderOpinionText');
                if (textEl) {
                    textEl.innerText = item.leaderOpinion || 'Đồng ý phê duyệt tờ trình cấp kinh phí bồi thường theo quy định.';
                    textEl.style.borderLeftColor = item.status === 'Bị trả lại' ? '#f59e0b' : 'var(--success-color)';
                }
            } else {
                if (b7) b7.style.display = 'none';
                document.getElementById('sectionLeaderApproval').style.display = 'none';
            }
        }
    }

        // Render opinion history
        const historyWrapper = document.getElementById('leaderOpinionHistoryWrapper');
        const historyContainer = document.getElementById('leaderOpinionHistoryContainer');
        if (historyWrapper && historyContainer) {
            if (item.rejectHistory && item.rejectHistory.length > 0) {
                historyWrapper.style.display = 'block';
                historyContainer.innerHTML = item.rejectHistory.map(h => `
                    <div style="background-color: #F8FAFC; border-left: 3px solid var(--danger-color); padding: 8px 12px; border-radius: 0 4px 4px 0; margin-bottom: 8px; font-size: 12px; text-align: left;">
                        <div style="display: flex; justify-content: space-between; font-weight: 600; color: #64748B; margin-bottom: 4px;">
                            <span>Lần từ chối ngày ${h.date} - ${h.leader}</span>
                        </div>
                        <div style="color: #334155;"><strong>Lý do bị trả lại:</strong> ${h.opinion}</div>
                    </div>
                `).join('');
            } else {
                historyWrapper.style.display = 'none';
                historyContainer.innerHTML = '';
            }
        }

    // Dynamic actions for Specialist role in detailed view footer
    document.getElementById('btnViewActionFill').style.display = 'none';
    document.getElementById('btnViewActionUpdate').style.display = 'none';
    document.getElementById('btnViewActionPay').style.display = 'none';
    document.getElementById('btnViewActionForfeit').style.display = 'none';
    document.getElementById('btnCompleteTreasuryForfeit').style.display = 'none';

    const isSpecialist = activeRole === 'chuyen-vien';
    const btnFill = document.getElementById('btnViewActionFill');
    btnFill.innerHTML = '<i class="fa-solid fa-file-signature"></i> Lập đề nghị';
    if (isSpecialist) {
        if (item.status === 'Chờ lập đề nghị') {
            btnFill.style.display = 'inline-flex';
        } else if (item.status === 'Bị trả lại') {
            document.getElementById('btnViewActionUpdate').style.display = 'inline-flex';
        } else if (item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần') {
            document.getElementById('btnViewActionPay').style.display = 'inline-flex';
            if (getTreasuryInfo(item).isEligible) {
                document.getElementById('btnViewActionForfeit').style.display = 'inline-flex';
            }
        }
    }
}

function saveProposalsToLocal() {
    localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
}

// Action transition from within detailed view footer
function startActionFromView(actionType) {
    if (!selectedProposalId) return;
    
    if (actionType === 'Lập đề nghị') {
        fillProposalDirect(selectedProposalId);
    } else if (actionType === 'Cập nhật đề nghị') {
        updateProposalDirect(selectedProposalId);
    } else if (actionType === 'Cập nhật chi trả') {
        payProposalDirect(selectedProposalId);
    }
}

// LEADERS DIRECT APPROVAL/REJECTION SUBMIT FROM WITHIN DETAILED VIEW FOOTER
// LEADERS APPROVAL & REJECTION MODAL HANDLERS
function submitLeaderApproval(decisionStatus) {
    if (decisionStatus === 'Bị trả lại') {
        openRejectModal(selectedProposalId);
    } else {
        openApproveModal(selectedProposalId);
    }
}

// CUSTOM APPROVE MODAL ENGINE
let approveProposalId = null;

function openApproveModal(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;

    approveProposalId = id;
    document.getElementById('approveModalCode').innerText = item.code;
    document.getElementById('approveModalRequester').innerText = item.nycName || '-';
    
    const isAdv = (item.type === 'Cấp tạm ứng' || item.type === 'Đề nghị tạm ứng');
    document.getElementById('approveModalType').innerHTML = isAdv 
        ? '<span class="badge badge-info" style="font-size:11px; font-weight:600;">Đề nghị tạm ứng</span>'
        : '<span class="badge badge-primary" style="font-size:11px; font-weight:600;">Đề nghị cấp kinh phí bồi thường</span>';

    document.getElementById('approveModalClaim').innerText = item.ycbtCode || '-';

    const amtVal = typeof item.amount === 'number' ? item.amount : parseFloat(String(item.amount).replace(/\D/g, '')) || 0;
    document.getElementById('approveModalAmount').innerText = amtVal.toLocaleString('vi-VN') + ' VNĐ';
    document.getElementById('approveModalAmountWord').innerText = '(Bằng chữ: ' + docTienBangChu(amtVal) + ')';

    const opinionInp = document.getElementById('modalApproveOpinion');
    if (opinionInp) opinionInp.value = '';

    const overlay = document.getElementById('customApproveOverlay');
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('visible');
        if (opinionInp) opinionInp.focus();
    }, 50);
}

function formatCurrentDateTime() {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${d}/${m}/${y} ${h}:${min}`;
}

function closeApproveModal(confirm) {
    const overlay = document.getElementById('customApproveOverlay');
    if (confirm) {
        const opinionInp = document.getElementById('modalApproveOpinion');
        const opinion = opinionInp ? opinionInp.value.trim() : '';
        const item = proposalsList.find(p => p.id === approveProposalId);
        if (item) {
            item.status = 'Chờ chi trả';
            item.leaderOpinion = opinion || 'Đồng ý phê duyệt cấp kinh phí bồi thường.';
            item.approvedDate = formatCurrentDateTime();
            item.approvedLeader = 'Lãnh đạo cơ quan';

            showToast("Phê duyệt cấp kinh phí bồi thường thành công!", "success");
            saveProposalsToLocal();
            updateBudgetStats();

            // If detail popup is currently open for this item, refresh it
            const modalDetail = document.getElementById('createProposalModal');
            if (modalDetail && modalDetail.style.display !== 'none' && selectedProposalId === approveProposalId) {
                viewProposalDetail(item.id);
            }
            renderProposalsTable();
        }
    }

    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 200);
    approveProposalId = null;
}

// CUSTOM REJECT MODAL ENGINE
let rejectProposalId = null;

function openRejectModal(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;

    rejectProposalId = id;
    document.getElementById('rejectModalCode').innerText = item.code;
    document.getElementById('rejectModalRequester').innerText = item.nycName || '-';

    const isAdv = (item.type === 'Cấp tạm ứng' || item.type === 'Đề nghị tạm ứng');
    document.getElementById('rejectModalType').innerHTML = isAdv 
        ? '<span class="badge badge-info" style="font-size:11px; font-weight:600;">Đề nghị tạm ứng</span>'
        : '<span class="badge badge-primary" style="font-size:11px; font-weight:600;">Đề nghị cấp kinh phí bồi thường</span>';

    const amtVal = typeof item.amount === 'number' ? item.amount : parseFloat(String(item.amount).replace(/\D/g, '')) || 0;
    document.getElementById('rejectModalAmount').innerText = amtVal.toLocaleString('vi-VN') + ' VNĐ';

    const opinionInp = document.getElementById('modalRejectOpinion');
    if (opinionInp) {
        opinionInp.value = '';
        opinionInp.classList.remove('is-invalid');
    }
    const errText = document.getElementById('modalRejectOpinionError');
    if (errText) errText.style.display = 'none';

    const overlay = document.getElementById('customRejectOverlay');
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('visible');
        if (opinionInp) opinionInp.focus();
    }, 50);
}

function closeRejectModal(confirm) {
    const overlay = document.getElementById('customRejectOverlay');
    if (confirm) {
        const opinionInp = document.getElementById('modalRejectOpinion');
        const opinion = opinionInp ? opinionInp.value.trim() : '';
        const errText = document.getElementById('modalRejectOpinionError');

        if (!opinion) {
            if (opinionInp) {
                opinionInp.classList.add('is-invalid');
                opinionInp.focus();
            }
            if (errText) errText.style.display = 'block';
            return;
        }

        const item = proposalsList.find(p => p.id === rejectProposalId);
        if (item) {
            item.status = 'Bị trả lại';
            item.leaderOpinion = opinion;
            item.approvedDate = formatCurrentDateTime();
            item.approvedLeader = 'Lãnh đạo cơ quan';

            if (!item.rejectHistory) item.rejectHistory = [];
            item.rejectHistory.unshift({
                date: formatCurrentDateTime(),
                leader: 'Lãnh đạo cơ quan',
                opinion: opinion
            });

            showToast("Đã từ chối phê duyệt tờ trình cấp kinh phí!", "success");
            saveProposalsToLocal();
            updateBudgetStats();

            // If detail popup is currently open for this item, refresh it
            const modalDetail = document.getElementById('createProposalModal');
            if (modalDetail && modalDetail.style.display !== 'none' && selectedProposalId === rejectProposalId) {
                viewProposalDetail(item.id);
            }
            renderProposalsTable();
        }
    }

    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 200);
    rejectProposalId = null;
}

// Backward compatibility wrappers
function approveProposalDirect(id) {
    openApproveModal(id);
}

function rejectProposalDirect(id) {
    openRejectModal(id);
}

// Auto-remove validation error on typing
document.addEventListener('DOMContentLoaded', () => {
    const rejectInp = document.getElementById('modalRejectOpinion');
    if (rejectInp) {
        rejectInp.addEventListener('input', () => {
            if (rejectInp.value.trim()) {
                rejectInp.classList.remove('is-invalid');
                const errText = document.getElementById('modalRejectOpinionError');
                if (errText) errText.style.display = 'none';
            }
        });
    }
});



// DYNAMICS PAYOUT ACTION (Chờ chi trả -> Hoàn thành) - MH03
function payProposalDirect(id) {
    const item = proposalsList.find(p => p.id === id);
    if (item) {
        selectedProposalId = id;
        clearFieldErrors();

        // 1. Populate standard details (read-only)
        fillProposalDirect(id);
        // Payout entry uses immediate-close on "Đóng" (matches MH05), not the MH02 confirm-before-close
        formEditingMode = false;

        // 2. Lock all normal inputs
        setProposalFieldsDisabled(true);
        setNycFieldsDisabled(true);

        // 3. Customize form title
        document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-cash-register"></i> CẬP NHẬT KẾT QUẢ CHI TRẢ: ${item.code}`;

        // 4. Accordion state per SRS Section 4.3.3.2 (MH03):
        // Blocks 1 to 9 default to COLLAPSED
        ['block1_General', 'block2_Claimant', 'block3_AdvanceTable', 'block4_KinhPhiTable', 'block5_Recipient', 'block6_NotesAndDocs', 'block7_LeaderApproval', 'block8_NoticeTracking', 'block9_TreasuryTracking'].forEach(bid => {
            setAccordionState(bid, false);
        });

        // Ensure Khối 8 is visible in MH03 per SRS (Section 4.3.3.2.5.2) and rendered with proper state
        const block8 = document.getElementById('block8_NoticeTracking');
        if (block8) {
            block8.style.display = 'block';
            setAccordionState('block8_NoticeTracking', false);
            renderNoticeTrackingSection(item, false);
        }

        // Ensure Khối 9 is visible if notice received date exists
        const block9 = document.getElementById('block9_TreasuryTracking');
        if (block9) {
            block9.style.display = item.noticeReceivedDate ? 'block' : 'none';
            setAccordionState('block9_TreasuryTracking', false);
            if (item.noticeReceivedDate) renderTreasuryTrackingBlock(item);
        }

        // Block 10 defaults to EXPANDED
        const block10 = document.getElementById('block10_PayoutReal');
        if (block10) {
            block10.style.display = 'block';
            setAccordionState('block10_PayoutReal', true);
        }
        const block11 = document.getElementById('block11_TreasuryForfeit');
        if (block11) block11.style.display = 'none';

        // Populate approved proposal amounts explicitly
        if (item.type === 'Cấp tạm ứng' || item.type === 'Đề nghị tạm ứng') {
            document.getElementById('advApproveTinhThan').value = (item.advApproveTinhThan || 0).toLocaleString('vi-VN');
            document.getElementById('advApproveKhac').value = (item.advApproveKhac || 0).toLocaleString('vi-VN');
            calculateAdvanceApproveTotal();
        } else {
            const approvedDamages = item.approvedDamages || {};
            const inputs = document.querySelectorAll('.kp-approve-input');
            inputs.forEach(input => {
                const key = input.dataset.key;
                if (approvedDamages[key] !== undefined) {
                    input.value = approvedDamages[key].toLocaleString('vi-VN');
                }
            });
            calculateKinhPhiApproveTotal();
        }

        // 5. Show Payout Section and enable its fields
        document.getElementById('sectionPayoutReal').style.display = 'block';

        const payoutDateInput = document.getElementById('payoutDate');
        payoutDateInput.disabled = false;

        const payoutAmountInput = document.getElementById('payoutAmountReal');
        payoutAmountInput.disabled = false;
        const remainingPayoutAmount = getUnpaidAmount(item) || item.amount;
        payoutAmountInput.value = remainingPayoutAmount.toLocaleString('vi-VN');

        const radioTransfer = document.getElementById('payoutMethod_Transfer');
        const radioCash = document.getElementById('payoutMethod_Cash');
        if (radioTransfer) radioTransfer.disabled = false;
        if (radioCash) radioCash.disabled = false;

        // Pre-fill recipient info from linked claim
        const claimDetails = mockClaims.find(c => c.code === item.ycbtCode) || mockClaims[0];

        const payoutRecNameInput = document.getElementById('payoutRecName');
        payoutRecNameInput.disabled = false;
        payoutRecNameInput.value = item.nycName;

        const payoutRecAddressInput = document.getElementById('payoutRecAddress');
        payoutRecAddressInput.disabled = false;
        payoutRecAddressInput.value = claimDetails.address || "";

        const payoutBankAccountInput = document.getElementById('payoutBankAccount');
        payoutBankAccountInput.disabled = false;
        payoutBankAccountInput.value = claimDetails.advanceBankAccount || "";

        const payoutBankNameInput = document.getElementById('payoutBankName');
        if (payoutBankNameInput) {
            payoutBankNameInput.disabled = false;
            payoutBankNameInput.value = claimDetails.advanceBankName || "";
        }

        const payoutBankUserInput = document.getElementById('payoutBankUser');
        payoutBankUserInput.disabled = false;
        payoutBankUserInput.value = claimDetails.advanceBankUser || item.nycName;

        const payoutBankBranchInput = document.getElementById('payoutBankBranch');
        if (payoutBankBranchInput) {
            payoutBankBranchInput.disabled = false;
            payoutBankBranchInput.value = claimDetails.advanceBankBranch || "";
        }

        const payoutReceiptNoInput = document.getElementById('payoutReceiptNo');
        payoutReceiptNoInput.disabled = false;
        payoutReceiptNoInput.value = item.payoutReceiptNo || "";

        const payoutNoteInput = document.getElementById('payoutNote');
        if (payoutNoteInput) {
            payoutNoteInput.disabled = false;
            payoutNoteInput.value = "";
        }

        document.getElementById('btnPayoutUpload').disabled = false;
        document.getElementById('btnPayoutUpload').style.display = 'inline-flex';

        // Select correct radio button per SRS
        const defaultMethod = (claimDetails.advanceRecKenh === 'tien-mat' || item.payoutMethod === 'Nhận tiền mặt' || item.payoutMethod === 'Tiền mặt')
            ? 'Nhận tiền mặt'
            : 'Nhận qua chuyển khoản';

        if (defaultMethod === 'Nhận tiền mặt') {
            if (radioCash) radioCash.checked = true;
            if (radioTransfer) radioTransfer.checked = false;
        } else {
            if (radioTransfer) radioTransfer.checked = true;
            if (radioCash) radioCash.checked = false;
        }
        handlePayoutMethodChange(defaultMethod);

        // Set today's date
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        payoutDateInput.value = `${day}/${month}/${today.getFullYear()}`;

        payoutAttachedFile = null;
        document.getElementById('payoutFileInput').value = '';
        document.getElementById('payoutFileLink').innerHTML = 'Chưa có tệp tin đính kèm';
        document.getElementById('payoutFileLink').style.color = 'var(--text-color)';

        // Show payout buttons in footer
        document.getElementById('btnSubmitProposal').style.display = 'none';
        document.getElementById('btnCompletePayout').style.display = 'inline-flex';
        const btnCancel = document.getElementById('btnCancelForm');
        if (btnCancel) {
            btnCancel.style.display = 'inline-flex';
            btnCancel.innerText = 'Đóng';
        }

        // Reload attached files as read-only (1-2 pre-filled files)
        proposalAttachedDocs = item.files ? [...item.files] : [];
        renderProposalAttachedDocs();

        // Auto-focus on payout date and scroll to Block 10
        setTimeout(() => {
            if (block10) block10.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (payoutDateInput) payoutDateInput.focus();
        }, 150);
    }
}

// PAYOUT FILE HANDLERS
function triggerPayoutFileUpload() {
    document.getElementById('payoutFileInput').click();
}

function handlePayoutFileChange(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        payoutAttachedFile = file.name;

        document.getElementById('payoutFileLink').innerHTML = `
            <span style="font-weight:600; color:var(--text-color);">${file.name}</span>
            <span style="margin-left: 10px; font-weight:600; font-size:12px;">
                <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;">Xem file</a>
                <span style="color:#CBD5E1; margin:0 5px;">|</span>
                <a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="removePayoutFile()"><i class="fa-regular fa-trash-can"></i> Xóa</a>
            </span>
        `;
    }
}

function removePayoutFile() {
    payoutAttachedFile = null;
    document.getElementById('payoutFileInput').value = '';
    document.getElementById('payoutFileLink').innerHTML = 'Chưa có tệp tin đính kèm';
}

function submitPayoutReal() {
    clearFieldErrors();

    const payoutDate = document.getElementById('payoutDate').value.trim();
    const payoutAmountReal = document.getElementById('payoutAmountReal').value.trim();
    const methodRadio = document.querySelector('input[name="payoutMethod"]:checked');
    const payoutMethod = methodRadio ? methodRadio.value : 'Nhận qua chuyển khoản';
    const payoutRecName = document.getElementById('payoutRecName').value.trim();
    const payoutRecAddress = document.getElementById('payoutRecAddress').value.trim();

    let hasError = false;
    let firstErrorField = null;

    const triggerError = (fieldId, msg) => {
        showFieldError(fieldId, msg);
        hasError = true;
        if (!firstErrorField) firstErrorField = fieldId;
    };

    const parsedPayoutDate = parseDateViGlobal(payoutDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (!payoutDate) {
        triggerError('payoutDate', 'Đây là trường bắt buộc');
    } else if (!parsedPayoutDate) {
        triggerError('payoutDate', 'Ngày không hợp lệ, vui lòng nhập dd/mm/yyyy');
    } else if (parsedPayoutDate > today) {
        triggerError('payoutDate', 'Ngày chi trả không được lớn hơn ngày hiện tại');
    }

    const payoutAmountNum = parseFloat(payoutAmountReal.replace(/\D/g, '')) || 0;
    if (!payoutAmountReal) {
        triggerError('payoutAmountReal', 'Đây là trường bắt buộc');
    } else if (payoutAmountNum <= 0) {
        triggerError('payoutAmountReal', 'Số tiền chi trả phải lớn hơn 0');
    }

    if (!payoutRecName) {
        triggerError('payoutRecName', 'Đây là trường bắt buộc');
    }
    if (!payoutRecAddress) {
        triggerError('payoutRecAddress', 'Đây là trường bắt buộc');
    }

    if (payoutMethod === 'Nhận tiền mặt' || payoutMethod === 'Tiền mặt') {
        const payoutReceiptNo = document.getElementById('payoutReceiptNo').value.trim();
        if (!payoutReceiptNo) {
            triggerError('payoutReceiptNo', 'Đây là trường bắt buộc');
        }
    } else {
        const payoutBankAccount = document.getElementById('payoutBankAccount').value.trim();
        const payoutBankName = document.getElementById('payoutBankName') ? document.getElementById('payoutBankName').value.trim() : '';
        const payoutBankUser = document.getElementById('payoutBankUser').value.trim();
        if (!payoutBankAccount) {
            triggerError('payoutBankAccount', 'Đây là trường bắt buộc');
        }
        if (document.getElementById('payoutBankName') && !payoutBankName) {
            triggerError('payoutBankName', 'Đây là trường bắt buộc');
        }
        if (!payoutBankUser) {
            triggerError('payoutBankUser', 'Đây là trường bắt buộc');
        }
    }

    if (!payoutAttachedFile) {
        const fileLinkContainer = document.getElementById('payoutFileLink');
        if (fileLinkContainer) {
            fileLinkContainer.style.color = 'var(--danger-color)';
            fileLinkContainer.innerText = 'Vui lòng chọn chứng từ đính kèm (Đây là trường bắt buộc)';
        }
        hasError = true;
        if (!firstErrorField) firstErrorField = 'btnPayoutUpload';
    }

    if (hasError) {
        if (firstErrorField) {
            const el = document.getElementById(firstErrorField);
            if (el) el.focus();
        }
        return;
    }

    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (!item) return;

    // Show Confirmation Modal before completing 100% full payout
    const methodDetailHtml = (payoutMethod === 'Nhận tiền mặt' || payoutMethod === 'Tiền mặt')
        ? `Số biên lai/phiếu chi: <strong>${document.getElementById('payoutReceiptNo').value.trim()}</strong>`
        : `STK: <strong>${document.getElementById('payoutBankAccount').value.trim()}</strong> - Ngân hàng: <strong>${document.getElementById('payoutBankName') ? document.getElementById('payoutBankName').value.trim() : ''}</strong> (Chủ TK: <strong>${document.getElementById('payoutBankUser').value.trim()}</strong>)`;

    const confirmHtml = `
        <div style="text-align: left; font-size: 13.5px; color: #334155;">
            <p style="margin-bottom: 10px;">Vui lòng kiểm tra kỹ thông tin chi trả thực tế trước khi xác nhận hoàn thành:</p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 12px; margin-bottom: 12px; line-height: 1.6;">
                <div>• <strong>Mã đề nghị:</strong> ${item.code}</div>
                <div>• <strong>Họ tên người nhận:</strong> ${payoutRecName}</div>
                <div>• <strong>Địa chỉ người nhận:</strong> ${payoutRecAddress}</div>
                <div>• <strong>Số tiền chi trả:</strong> <span style="color: #16A34A; font-weight: 700;">${payoutAmountNum.toLocaleString('vi-VN')} VNĐ</span> (100% trọn gói)</div>
                <div>• <strong>Phương thức:</strong> ${payoutMethod} (${methodDetailHtml})</div>
                <div>• <strong>Ngày chi trả:</strong> ${payoutDate}</div>
                <div>• <strong>Chứng từ đính kèm:</strong> ${payoutAttachedFile || 'Đã đính kèm'}</div>
            </div>
            <p style="color: #B45309; font-weight: 600; margin-bottom: 0;">
                <i class="fa-solid fa-triangle-exclamation"></i> Lưu ý: Thao tác này ghi nhận hoàn thành chi trả 100% kinh phí bồi thường và chuyển trạng thái hồ sơ sang "Hoàn thành", không thể hoàn tác. Bạn có chắc chắn muốn xác nhận?
            </p>
        </div>
    `;

    showConfirmModal(confirmHtml, () => {
        item.status = 'Hoàn thành';
        item.payoutDate = payoutDate;
        item.payoutAmountReal = payoutAmountNum;
        item.payoutMethod = payoutMethod;
        item.payoutRecName = payoutRecName;
        item.payoutRecAddress = payoutRecAddress;
        item.payoutNote = document.getElementById('payoutNote') ? document.getElementById('payoutNote').value.trim() : '';

        if (payoutMethod === 'Nhận tiền mặt' || payoutMethod === 'Tiền mặt') {
            item.payoutReceiptNo = document.getElementById('payoutReceiptNo').value.trim();
            item.payoutBankAccount = '';
            item.payoutBankUser = '';
            item.payoutBankName = '';
            item.payoutBankBranch = '';
        } else {
            item.payoutBankAccount = document.getElementById('payoutBankAccount').value.trim();
            item.payoutBankName = document.getElementById('payoutBankName') ? document.getElementById('payoutBankName').value.trim() : '';
            item.payoutBankUser = document.getElementById('payoutBankUser').value.trim();
            item.payoutBankBranch = document.getElementById('payoutBankBranch') ? document.getElementById('payoutBankBranch').value.trim() : '';
            item.payoutReceiptNo = '';
        }
        item.payoutFile = payoutAttachedFile;

        saveProposalsToLocal();
        updateBudgetStats();
        closeCreateProposalForm();
        renderProposalsTable();
        showToast(`Đã hoàn thành chi trả thực tế cho đề nghị ${item.code}! Trạng thái chuyển sang HOÀN THÀNH.`, "success");

        // Sync back to claimsList in localStorage
        const localClaimsStr = localStorage.getItem('claimsList');
        if (localClaimsStr) {
            const localClaims = JSON.parse(localClaimsStr);
            const matchedClaim = localClaims.find(c => c.code === item.ycbtCode);
            if (matchedClaim) {
                matchedClaim.thucthiDate = payoutDate;
                matchedClaim.thucthiNote = `Đã hoàn thành chi trả thực tế số tiền ${payoutAmountNum.toLocaleString('vi-VN')}đ qua ${payoutMethod}. Người nhận: ${payoutRecName}. Địa chỉ: ${payoutRecAddress}.`;
                
                // Add timeline entry
                if (!matchedClaim.timeline) matchedClaim.timeline = [];
                matchedClaim.timeline.push({
                    title: "Chi trả tiền bồi thường",
                    date: payoutDate,
                    desc: `Hoàn thành chi trả 100% kinh phí bồi thường thực tế qua ${payoutMethod}. Số tiền: ${payoutAmountReal} VNĐ.`,
                    status: "completed"
                });

                // Trạng thái Giải quyết YCBT (nhánh bồi thường thiệt hại) chuyển Hoàn thành, không phụ thuộc nhánh Phục hồi danh dự
                matchedClaim.status = 'Hoàn thành';
                matchedClaim.moneyPaid = true;

                localStorage.setItem('claimsList', JSON.stringify(localClaims));

                localStorage.setItem('claimPayoutCompleted_' + matchedClaim.code, JSON.stringify({
                    code: matchedClaim.code,
                    date: payoutDate,
                    moneyPaid: true,
                    status: matchedClaim.status
                }));
            }
        }
    }, 'Xác nhận hoàn thành chi trả kinh phí bồi thường');
}

// Delete Proposal
function deleteProposal(id) {
    const index = proposalsList.findIndex(p => p.id === id);
    if (index !== -1) {
        const code = proposalsList[index].code;
        showConfirmModal("Bạn có chắc chắn muốn xóa đề xuất kinh phí " + code + " không?", () => {
            proposalsList.splice(index, 1);
            showToast("Đã xóa vĩnh viễn đề xuất kinh phí " + code + "!", "success");
            saveProposalsToLocal();
            updateBudgetStats();
            renderProposalsTable();
        });
    }
}

// Kết xuất Excel: theo Quy chuẩn Kết xuất Excel dùng chung (04_Danh_muc_va_Phu_luc.md #quy-chuan-ket-xuat-excel)
// Toàn bộ bản ghi của menu con + tab theo bộ lọc/sắp xếp hiện tại (không theo trang); cột theo lưới, bỏ cột Thao tác
function exportExcelKinhPhi() {
    const sz = pageSize, pg = currentPage;
    pageSize = 1e9; currentPage = 1; renderProposalsTable();
    const table = document.getElementById('proposalsTable');
    const ths = Array.from(table.querySelectorAll('thead th'));
    const keep = ths.map((th, i) => (getComputedStyle(th).display !== 'none' && !/Thao tác/i.test(th.textContent) ? i : -1)).filter(i => i >= 0);
    const cellText = c => (c.innerText || c.textContent || '').split('\n').map(s => s.trim()).filter(Boolean).join('; ');
    const rows = Array.from(table.querySelectorAll('tbody tr')).filter(tr => tr.cells.length === ths.length)
        .map(tr => keep.map(i => ({ v: cellText(tr.cells[i]), al: getComputedStyle(tr.cells[i]).textAlign })));
    const headers = keep.map(i => ths[i].textContent.replace(/\s+/g, ' ').trim());
    pageSize = sz; currentPage = pg; renderProposalsTable();
    if (!rows.length) { showToast('Không có dữ liệu để kết xuất Excel.', 'error'); return; }
    const p2 = x => String(x).padStart(2, '0'), now = new Date();
    const stamp = `${p2(now.getDate())}/${p2(now.getMonth() + 1)}/${now.getFullYear()} ${p2(now.getHours())}:${p2(now.getMinutes())}`;
    const ymd = `${now.getFullYear()}${p2(now.getMonth() + 1)}${p2(now.getDate())}`;
    const esc = v => String(v == null ? '' : v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const fromD = document.getElementById('searchFromDate').value.trim(), toD = document.getElementById('searchToDate').value.trim();
    const info = (fromD || toD) ? `Từ ngày ${fromD || '...'} đến ngày ${toD || '...'}` : `Thời điểm xuất: ${stamp}`;
    const menu = KP_MENUS[kpMenuState].title;
    const fileBase = kpMenuState === 'chi-tra' ? 'Chi_tra_tien_boi_thuong' : 'Tam_ung_kinh_phi';
    const u = window.BTNN_WF && BTNN_WF.getCurrentUser ? BTNN_WF.getCurrentUser() : null;
    const n = headers.length, font = "font-family:'Times New Roman';";
    const html = '<meta charset="UTF-8"><table border="1">'
        + `<tr><td colspan="${n}" style="${font}font-size:15pt;font-weight:bold;text-align:center;border:none;">${esc('DANH SÁCH ' + menu.toUpperCase())}</td></tr>`
        + `<tr><td colspan="${n}" style="${font}font-size:11pt;font-style:italic;text-align:center;border:none;">${esc(info)}</td></tr>`
        + '<tr>' + headers.map(h => `<th style="${font}font-size:12pt;background:#e5e7eb;">${esc(h)}</th>`).join('') + '</tr>'
        + rows.map(r => '<tr>' + r.map(c => `<td style="${font}font-size:12pt;mso-number-format:'\\@';text-align:${c.al === 'right' || c.al === 'center' ? c.al : 'left'};">${esc(c.v)}</td>`).join('') + '</tr>').join('')
        + `<tr><td colspan="${n}" style="${font}font-size:10pt;font-style:italic;text-align:right;border:none;">Xuất ngày ${esc(stamp)} bởi ${esc((u && (u.name || u.fullName || u.username)) || 'Người dùng hiện tại')}</td></tr>`
        + '</table>';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + html], { type: 'application/vnd.ms-excel;charset=utf-8' }));
    // Mockup sinh bảng HTML nên dùng đuôi .xls; hệ thống thật xuất .xlsx theo quy chuẩn
    a.download = `${ymd}_${fileBase}.xls`;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    showToast(`Đã kết xuất ${rows.length} bản ghi ${menu} ra tệp Excel.`, 'success');
}

// TOAST ENGINE
function showToast(message, type) {
    const toast = document.getElementById('toast');
    const msgSpan = document.getElementById('toastMessage');

    toast.className = `toast-notif ${type}`;
    msgSpan.innerText = message;

    const icon = toast.querySelector('i');
    if (type === 'success') {
        icon.className = 'fa-solid fa-circle-check';
    } else if (type === 'error') {
        icon.className = 'fa-solid fa-circle-xmark';
    } else {
        icon.className = 'fa-solid fa-circle-info';
    }

    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
}

// Custom Confirmation Modal Helper
let confirmCallback = null;

function showConfirmModal(message, callback, title = 'Xác nhận xóa') {
    const overlay = document.getElementById('customConfirmOverlay');
    const titleEl = document.getElementById('customConfirmTitle');
    if (titleEl) titleEl.innerText = title;
    document.getElementById('customConfirmMessage').innerHTML = message;
    confirmCallback = callback;

    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('visible');
    }, 10);
}

function closeConfirmModal(result) {
    const overlay = document.getElementById('customConfirmOverlay');
    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 200);

    if (result && confirmCallback) {
        confirmCallback();
    }
    confirmCallback = null;
}

// Custom Alert / Warning Modal Helper
let alertCallback = null;

function showCustomAlertModal(message, title = 'Cảnh báo', type = 'warning', callback = null) {
    const overlay = document.getElementById('customAlertOverlay');
    if (!overlay) {
        alert(message);
        if (callback) callback();
        return;
    }
    const titleEl = document.getElementById('customAlertTitle');
    const headerEl = document.getElementById('customAlertHeader');
    const iconEl = document.getElementById('customAlertIcon');
    const msgEl = document.getElementById('customAlertMessage');

    if (titleEl) titleEl.innerText = title;
    if (msgEl) msgEl.innerHTML = message;
    alertCallback = callback;

    if (type === 'error') {
        if (headerEl) headerEl.style.backgroundColor = 'var(--danger-color, #ef4444)';
        if (iconEl) iconEl.className = 'fa-solid fa-circle-xmark';
    } else if (type === 'info') {
        if (headerEl) headerEl.style.backgroundColor = 'var(--primary-color, #1e40af)';
        if (iconEl) iconEl.className = 'fa-solid fa-circle-info';
    } else {
        if (headerEl) headerEl.style.backgroundColor = '#f59e0b';
        if (iconEl) iconEl.className = 'fa-solid fa-triangle-exclamation';
    }

    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('visible');
    }, 10);
}

function closeCustomAlertModal() {
    const overlay = document.getElementById('customAlertOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 200);

    if (alertCallback) {
        const cb = alertCallback;
        alertCallback = null;
        cb();
    }
}

// PAYOUT METHOD TOGGLING
function handlePayoutMethodChange(val) {
    const isCash = val === 'Tiền mặt' || val === 'Nhận tiền mặt';
    const bankFields = document.getElementById('payoutBankFields');
    const cashFields = document.getElementById('payoutCashFields');
    if (isCash) {
        if (bankFields) bankFields.style.display = 'none';
        if (cashFields) cashFields.style.display = 'block';
    } else {
        if (bankFields) bankFields.style.display = 'grid';
        if (cashFields) cashFields.style.display = 'none';
    }
}

// Auto format payoutAmountReal on input
document.addEventListener('DOMContentLoaded', () => {
    const payoutAmt = document.getElementById('payoutAmountReal');
    if (payoutAmt) {
        payoutAmt.addEventListener('input', function (e) {
            let val = this.value.replace(/\D/g, '');
            if (val) {
                this.value = parseInt(val, 10).toLocaleString('vi-VN');
            } else {
                this.value = '';
            }
        });
    }
});

// ===================== Popup Tìm kiếm Quyết định giải quyết bồi thường =====================
// Chỉ dùng khi Loại đề nghị = Đề nghị cấp kinh phí bồi thường. Popup dựng giao diện giả lập,
// không xử lý logic nghiệp vụ Ban hành/Ký duyệt.
let fundingDecPage = 1;
const FUNDING_DEC_PAGE_SIZE = 10;

// Danh sách Quyết định giải quyết bồi thường Đã ban hành (dữ liệu giả lập)
const MOCK_ISSUED_DECISIONS = [
    { decNo: '45/QĐ-GQBT', date: '05/06/2026', claimCode: 'BT-2026-007', requester: 'Phạm Văn D', agency: 'Công an phường Thanh Xuân', status: 'Đã ban hành', amount: 180000000 },
    { decNo: '52/QĐ-GQBT', date: '28/06/2026', claimCode: 'BT-2026-002', requester: 'Trần Thị B', agency: 'Tòa án nhân dân TP. Hà Nội', status: 'Đã ban hành', amount: 120000000 },
    { decNo: '58/QĐ-GQBT', date: '12/07/2026', claimCode: 'BT-2026-011', requester: 'Trần Thị G', agency: 'Sở Tư pháp Hà Nội', status: 'Đã ban hành', amount: 75000000 },
    { decNo: '61/QĐ-GQBT', date: '20/07/2026', claimCode: 'BT-2026-014', requester: 'Phạm Văn K', agency: 'UBND Thành phố Hà Nội', status: 'Đã ban hành', amount: 210000000 },
    { decNo: '63/QĐ-GQBT', date: '02/08/2026', claimCode: 'BT-2026-018', requester: 'Trần Thu O', agency: 'Chi cục Thủy sản Bình Định', status: 'Đã ban hành', amount: 96000000 }
];

const FUNDING_DEC_FILTER_IDS = ['fundingDecSearchNo', 'fundingDecSearchClaim', 'fundingDecSearchRequester',
    'fundingDecSearchAgency', 'fundingDecSearchFrom', 'fundingDecSearchTo'];

const FUNDING_DEC_EMPTY_HINT = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:24px;">Nhập tiêu chí và bấm Tìm kiếm để hiển thị danh sách Quyết định.</td></tr>';

function openFundingDecisionLookupModal(prefillCode = '') {
    const overlay = document.getElementById('fundingDecisionLookupOverlay');
    if (!overlay) return;
    FUNDING_DEC_FILTER_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const claimInput = document.getElementById('fundingDecSearchClaim');
    if (claimInput) claimInput.value = prefillCode || '';

    fundingDecPage = 1;
    // Không tự động tải dữ liệu khi mở popup; chỉ tải khi có prefill hoặc khi bấm Tìm kiếm
    const tbody = document.getElementById('fundingDecisionLookupResults');
    const pager = document.getElementById('fundingDecisionLookupPager');
    if (prefillCode) {
        renderFundingDecisionLookupResults();
    } else {
        if (tbody) tbody.innerHTML = FUNDING_DEC_EMPTY_HINT;
        if (pager) pager.innerHTML = '';
    }
    overlay.style.display = 'flex';
    overlay.classList.add('visible');
}

function closeFundingDecisionLookupModal() {
    const overlay = document.getElementById('fundingDecisionLookupOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    overlay.style.display = 'none';
}

function clearFundingDecisionLookupFilters() {
    FUNDING_DEC_FILTER_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    fundingDecPage = 1;
    const tbody = document.getElementById('fundingDecisionLookupResults');
    if (tbody) tbody.innerHTML = FUNDING_DEC_EMPTY_HINT;
    const pager = document.getElementById('fundingDecisionLookupPager');
    if (pager) pager.innerHTML = '';
}

function renderFundingDecisionLookupResults() {
    const tbody = document.getElementById('fundingDecisionLookupResults');
    if (!tbody) return;
    const norm = v => String(v || '').toLowerCase().trim();
    const kNo = norm(document.getElementById('fundingDecSearchNo') && document.getElementById('fundingDecSearchNo').value);
    const kClaim = norm(document.getElementById('fundingDecSearchClaim') && document.getElementById('fundingDecSearchClaim').value);
    const kReq = norm(document.getElementById('fundingDecSearchRequester') && document.getElementById('fundingDecSearchRequester').value);
    const kAgency = norm(document.getElementById('fundingDecSearchAgency') && document.getElementById('fundingDecSearchAgency').value);

    // Loại trừ các Quyết định mà vụ việc đã có Đề nghị cấp kinh phí bồi thường còn hiệu lực
    const EFFECTIVE = ['Chờ lập đề nghị', 'Chờ duyệt', 'Chờ chi trả', 'Chờ thu hồi', 'Hoàn thành', 'Trả lại ngân sách nhà nước', 'Đã sung quỹ'];
    const sourceList = (typeof proposalsList !== 'undefined') ? proposalsList : [];
    const usedClaims = new Set(
        sourceList
            .filter(p => String(p.type || '').indexOf('tạm ứng') === -1 && EFFECTIVE.indexOf(p.status) > -1)
            .map(p => p.ycbtCode)
    );

    const results = MOCK_ISSUED_DECISIONS.filter(d =>
        d.status === 'Đã ban hành'
        && !usedClaims.has(d.claimCode)
        && (!kNo || norm(d.decNo).includes(kNo))
        && (!kClaim || norm(d.claimCode).includes(kClaim))
        && (!kReq || norm(d.requester).includes(kReq))
        && (!kAgency || norm(d.agency).includes(kAgency))
    );

    const pager = document.getElementById('fundingDecisionLookupPager');
    if (!results.length) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:24px;">Không tìm thấy Quyết định giải quyết bồi thường phù hợp.</td></tr>';
        if (pager) pager.innerHTML = '';
        return;
    }

    const totalPages = Math.max(1, Math.ceil(results.length / FUNDING_DEC_PAGE_SIZE));
    if (fundingDecPage > totalPages) fundingDecPage = totalPages;
    const start = (fundingDecPage - 1) * FUNDING_DEC_PAGE_SIZE;
    const pageRows = results.slice(start, start + FUNDING_DEC_PAGE_SIZE);

    tbody.innerHTML = pageRows.map((d, i) =>
        '<tr>'
        + '<td style="text-align:center;">' + (start + i + 1) + '</td>'
        + '<td><a href="quan_ly_boi_thuong.html?id=' + encodeURIComponent(d.claimCode) + '&from=kinh_phi" target="_blank" style="font-weight:700; color:#1d4ed8; text-decoration:none;">' + d.claimCode + '</a></td>'
        + '<td><strong>' + d.decNo + '</strong></td>'
        + '<td style="text-align:center;">' + d.date + '</td>'
        + '<td>' + d.requester + '</td>'
        + '<td style="text-align:center;"><span class="badge badge-success">' + d.status + '</span></td>'
        + '<td style="text-align:center;"><button type="button" class="btn btn-primary btn-sm" style="padding:4px 10px; font-size:12px;" onclick="selectFundingDecision(\'' + d.decNo + '\')"><i class="fa-solid fa-check"></i> Chọn</button></td>'
        + '</tr>'
    ).join('');

    if (pager) {
        let btns = '';
        for (let i = 1; i <= totalPages; i++) {
            btns += '<button type="button" class="btn ' + (i === fundingDecPage ? 'btn-primary' : 'btn-secondary') + ' btn-sm" style="min-width:32px; padding:4px 8px;" onclick="fundingDecPage=' + i + '; renderFundingDecisionLookupResults()">' + i + '</button>';
        }
        const to = Math.min(start + FUNDING_DEC_PAGE_SIZE, results.length);
        pager.innerHTML = '<span>Hiển thị ' + (start + 1) + ' đến ' + to + ' trong tổng số <strong>' + results.length + '</strong> bản ghi</span>'
            + '<span style="display:flex; gap:4px;">' + btns + '</span>';
    }
}

// Chọn 01 Quyết định: điền dữ liệu về form lập đề nghị
function selectFundingDecision(decNo) {
    const d = MOCK_ISSUED_DECISIONS.find(x => x.decNo === decNo);
    if (!d) return;
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('formBaseDecisionNo', d.decNo);
    setVal('formBaseDecisionDate', d.date);
    closeFundingDecisionLookupModal();
    if (typeof handleClaimSelected === 'function') handleClaimSelected(d.claimCode);
    if (typeof showToast === 'function') showToast('Đã chọn Quyết định số ' + d.decNo + ' làm căn cứ lập đề nghị.', 'success');
}

// Điều hướng popup theo Loại đề nghị đang chọn trên form
function openFundingLookupByType(prefillCode = '') {
    const radioKinhPhi = document.getElementById('radioTypeKinhPhi');
    if (radioKinhPhi && radioKinhPhi.checked) {
        openFundingDecisionLookupModal(prefillCode);
    } else {
        openFundingClaimLookupModal(prefillCode);
    }
}

// ===== Phương thức chi trả tiền bồi thường (Radio button theo SRS 4.3.3.2.4.2) =====
function onAdvPayMethodChange(value) {
    document.getElementById('advRecMethod').value = value;
    document.getElementById('advRecBankWrapper').style.display =
        value === 'Nhận qua chuyển khoản' ? 'grid' : 'none';
}

function setAdvPayMethod(value) {
    const method = value || 'Nhận tiền mặt';
    document.querySelectorAll('input[name="advRecMethodRadio"]').forEach(r => {
        r.checked = r.value === method;
    });
    onAdvPayMethodChange(method);
}

function onKpPayMethodChange(value) {
    document.getElementById('kpRecMethod').value = value;
    document.getElementById('kpRecBankWrapper').style.display =
        value === 'Nhận qua chuyển khoản' ? 'grid' : 'none';
}

function setKpPayMethod(value) {
    const method = value || 'Nhận tiền mặt';
    document.querySelectorAll('input[name="kpRecMethodRadio"]').forEach(r => {
        r.checked = r.value === method;
    });
    onKpPayMethodChange(method);
}


// =====================================================================================
// MENU "KINH PHÍ" - 02 MENU CON DÙNG CHUNG TRANG NÀY (tham số URL menu)
// - Tạm ứng kinh phí (?menu=tam-ung): chỉ bản ghi tạm ứng (Đề nghị tạm ứng / QĐ tạm ứng - kpIsAdv).
// - Chi trả tiền bồi thường (?menu=chi-tra): chỉ bản ghi chi trả (Thông báo chi trả; bản ghi cũ Cấp kinh phí bồi thường).
// - Không có tham số menu: mặc định Tạm ứng kinh phí (menu con đầu tiên); mở bản ghi (viewCode / view=detail&id)
//   thuộc menu con còn lại: tự chuyển menu con theo loại bản ghi, báo Trang chủ đánh dấu đúng menu (admin:activeMenu).
// - Mỗi menu con giữ 02 tab Chờ xử lý / Đã xử lý; badge tab + badge menu tính riêng theo menu con (BDG: kpTamUng / kpChiTra).
// =====================================================================================
const KP_MENUS = {
    'tam-ung': { title: 'Tạm ứng kinh phí', bdg: 'kpTamUng' },
    'chi-tra': { title: 'Chi trả tiền bồi thường', bdg: 'kpChiTra' }
};
const KP_MENU_DEFAULT = 'tam-ung';
let kpMenuState = (function () {
    let m = '';
    try { m = new URLSearchParams(window.location.search).get('menu') || ''; } catch (e) { m = ''; }
    if (!KP_MENUS[m] && window.KP_MENU) m = window.KP_MENU;
    return KP_MENUS[m] ? m : KP_MENU_DEFAULT;
})();
function kpMenu() { return kpMenuState; }
function kpMenuOf(item) { return kpIsAdv(item) ? 'tam-ung' : 'chi-tra'; }
function kpInMenu(item, menu) { return !!item && kpMenuOf(item) === (menu || kpMenuState); }
// Tiêu đề trang / thẻ title / lớp body theo menu con
function kpApplyMenuUi() {
    const t = KP_MENUS[kpMenuState].title;
    const el = document.getElementById('kpPageTitleText');
    if (el) el.textContent = t;
    document.title = t;
    if (document.body) {
        document.body.classList.toggle('kp-menu-tam-ung', kpMenuState === 'tam-ung');
        document.body.classList.toggle('kp-menu-chi-tra', kpMenuState === 'chi-tra');
    }
}
// Mở bản ghi thuộc menu con khác: chuyển menu con theo loại bản ghi (giữ tham số URL menu) và báo Trang chủ đánh dấu menu
function kpSyncMenuTo(item) {
    if (!item) return;
    const m = kpMenuOf(item);
    if (m === kpMenuState) return;
    kpMenuState = m;
    try {
        const q = new URLSearchParams(window.location.search);
        q.set('menu', m);
        history.replaceState(history.state, '', window.location.pathname + '?' + q.toString() + window.location.hash);
    } catch (e) { /* file:// hoặc khung khác nguồn: bỏ qua */ }
    kpApplyMenuUi();
    kpActiveTab = 'pending';
    currentPage = 1;
    renderProposalsTable();
    try {
        const embed = new URLSearchParams(window.location.search).get('embed') === 'true';
        if (!embed && window.parent && window.parent !== window) window.parent.postMessage({ type: 'admin:activeMenu', activeUrl: 'quan_ly_kinh_phi_boi_thuong.html?v=1&menu=' + m }, '*');
    } catch (e) { /* bỏ qua */ }
}
if (document.readyState !== 'loading') kpApplyMenuUi(); else document.addEventListener('DOMContentLoaded', kpApplyMenuUi);

// =====================================================================================
// 02 TAB "CHỜ XỬ LÝ" / "ĐÃ XỬ LÝ" THEO NGƯỜI DÙNG ĐĂNG NHẬP (GIẢ LẬP QUYỀN CÁN BỘ / LÃNH ĐẠO)
// - Cán bộ xử lý: Chờ xử lý = Chờ lập đề nghị, Chờ duyệt, Chờ chi trả, Bị trả lại, Chờ thu hồi;
//   Đã xử lý = Hoàn thành, Trả lại ngân sách nhà nước, Đã thu hồi, Đã hủy.
// - Lãnh đạo: Chờ xử lý = đề nghị Chờ duyệt; Đã xử lý = đề nghị đã qua bước ký duyệt / từ chối.
// =====================================================================================
const KP_PENDING_STATES = ['Chờ lập đề nghị', 'Chờ duyệt', 'Chờ chi trả', 'Bị trả lại', 'Chờ thu hồi'];
const KP_DONE_STATES = ['Hoàn thành', 'Trả lại ngân sách nhà nước', 'Đã thu hồi', 'Đã hủy'];
let kpActiveTab = 'pending';

function kpRole() { const s = document.getElementById('roleSelector'); return s ? s.value : 'chuyen-vien'; }
function kpNormStatus(st) { return (st === 'Đã sung quỹ' || st === 'Sung quỹ nhà nước') ? 'Trả lại ngân sách nhà nước' : (st === 'Chi trả một phần' ? 'Chờ chi trả' : st); }
function kpInTab(tab, item) {
    const st = kpNormStatus(item.status);
    if (kpRole() === 'lanh-dao') {
        if (tab === 'pending') return st === 'Chờ duyệt';
        return ['Chờ chi trả', 'Bị trả lại', 'Chờ thu hồi', 'Hoàn thành', 'Trả lại ngân sách nhà nước', 'Đã thu hồi'].includes(st) || (st === 'Đã hủy' && !!item.approvedDate);
    }
    return tab === 'pending' ? KP_PENDING_STATES.includes(st) : KP_DONE_STATES.includes(st);
}
// Bản ghi thuộc menu con đang chọn và tab đang chọn
function kpInActiveTab(item) { return kpInMenu(item) && kpInTab(kpActiveTab, item); }
function kpTabStates(tab) {
    if (kpRole() === 'lanh-dao') return tab === 'pending' ? ['Chờ duyệt'] : ['Chờ chi trả', 'Bị trả lại', 'Chờ thu hồi', ...KP_DONE_STATES];
    return tab === 'pending' ? KP_PENDING_STATES : KP_DONE_STATES;
}
function kpRefreshTabUi() {
    const cP = document.getElementById('kpTabPendingCount');
    const cD = document.getElementById('kpTabDoneCount');
    // Badge tab Chờ xử lý (ẩn khi bằng 0) theo menu con đang chọn + đồng bộ badge menu trái cả 02 menu con (tiện ích dùng chung BDG)
    const pendingOf = m => proposalsList.filter(p => kpInMenu(p, m) && kpInTab('pending', p)).length;
    const bdgPending = pendingOf(kpMenuState);
    if (window.BDG) {
        Object.keys(KP_MENUS).forEach(m => { if (m !== kpMenuState) BDG.report(KP_MENUS[m].bdg, pendingOf(m)); });
        BDG.report(KP_MENUS[kpMenuState].bdg, bdgPending, cP);
    } else if (cP) cP.innerText = bdgPending;
    if (cD) cD.innerText = proposalsList.filter(p => kpInMenu(p) && kpInTab('done', p)).length;
    document.getElementById('kpTabPending')?.classList.toggle('active', kpActiveTab === 'pending');
    document.getElementById('kpTabDone')?.classList.toggle('active', kpActiveTab === 'done');
    // Trạng thái đề nghị: chỉ gồm các trạng thái của tab đang chọn
    const sel = document.getElementById('searchProposalStatus');
    if (sel) {
        const states = kpTabStates(kpActiveTab);
        const key = states.join('|');
        if (sel.dataset.kpStates !== key) {
            const cur = sel.value;
            sel.innerHTML = '<option value="">Tất cả</option>' + states.map(s => `<option value="${s}">${s}</option>`).join('');
            sel.value = states.includes(cur) ? cur : '';
            sel.dataset.kpStates = key;
        }
    }
    // Lọc nhanh Chờ duyệt / Bị trả lại: chỉ tại tab Chờ xử lý của Cán bộ xử lý
    const showKpi = kpActiveTab === 'pending' && kpRole() !== 'lanh-dao';
    const kpiRow = document.getElementById('kpiStatsRow');
    if (kpiRow) kpiRow.style.visibility = showKpi ? 'visible' : 'hidden';
    if (!showKpi) activeKpiFilterKp = 'all';
    const btnCreate = document.getElementById('btnCreateProposalTop');
    // Tạo thông báo chi trả: chỉ menu Chi trả tiền bồi thường (Tạo QĐ tạm ứng: menu Tạm ứng kinh phí - qdtuEnsureToolbarButton)
    // (important: lớp chuẩn hóa .uxu-btn-tb - btnn_uxu_dong_bo.js - đặt display !important)
    if (btnCreate) btnCreate.style.setProperty('display', (kpActiveTab === 'pending' && kpRole() !== 'lanh-dao' && kpMenuState === 'chi-tra') ? 'inline-flex' : 'none', 'important');
    // Tab Đã xử lý chỉ xem: ẩn cột Thao tác
    const table = document.getElementById('proposalsTable');
    if (table) table.classList.toggle('kp-done', kpActiveTab === 'done');
}
function kpSetTab(tab) {
    kpActiveTab = tab;
    activeKpiFilterKp = 'all';
    document.querySelectorAll('#kpiStatsRow .stat-badge-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('kpiBtnAll')?.classList.add('active');
    const sel = document.getElementById('searchProposalStatus');
    if (sel) sel.value = '';
    currentPage = 1;
    renderProposalsTable();
}
function kpOnRoleChange() {
    kpActiveTab = 'pending';
    kpSetTab('pending');
}

// =====================================================================================
// HÌNH THỨC KÝ - VĂN BẢN QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ BỒI THƯỜNG (MẪU 07/BTNN) - CHỈ ĐỀ NGHỊ TẠM ỨNG
// - Ký số trên hệ thống (mặc định): bắt buộc Số, ký hiệu văn bản và Ngày văn bản khi Trình phê duyệt;
//   Lãnh đạo Ký duyệt -> hệ thống ký số Quyết định tạm ứng.
// - Ký ngoài: sau khi Lãnh đạo Ký duyệt, Cán bộ "Đính kèm văn bản đã ký" (Số, ký hiệu, Ngày ký, tệp .pdf);
//   chưa đính kèm thì chưa được Cập nhật chi trả.
// =====================================================================================
const KP_SIGN_DIGITAL = 'Ký số';
const KP_SIGN_OUTSIDE = 'Ký ngoài';
function kpIsAdv(item) { return !!item && (item.type === 'Cấp tạm ứng' || item.type === 'Đề nghị tạm ứng'); }
// Hoàn thành chi trả / Hoàn thành Trả lại ngân sách nhà nước của khoản Chi trả tiền bồi thường: hồ sơ Giải quyết YCBT của vụ việc
// chuyển Trạng thái Giải quyết YCBT "Hoàn thành" (claim.status = nhánh Giải quyết YCBT) và ghi tiến trình.
// Trạng thái vụ việc do màn Giải quyết YCBT tổng hợp theo 02 nhánh (vụ việc Yêu cầu cả hai, Phục hồi danh dự chưa xong: theo nhánh Phục hồi danh dự).
// Không áp dụng: khoản tạm ứng (vụ việc tiếp tục giải quyết); bản ghi từ Theo dõi vụ việc tại Tòa án (courtCaseId, không có hồ sơ Giải quyết YCBT).
// [d1] Vụ việc có nhánh Phục hồi danh dự: theo Loại yêu cầu giải quyết bồi thường (requestType); dữ liệu cũ chưa có requestType suy ra theo restoreHonor
function kpClaimHasPhdd(c) {
    var k = ['money', 'honor', 'both'].indexOf(c && c.requestType) >= 0 ? c.requestType : (c && c.restoreHonor ? 'both' : 'money');
    return k !== 'money';
}
function kpCompleteClaim(item, fn) {
    if (!item || kpIsAdv(item) || !item.ycbtCode || item.courtCaseId) return;
    let list;
    try { list = JSON.parse(localStorage.getItem('claimsList') || '[]'); } catch (e) { return; }
    const c = Array.isArray(list) ? list.find(x => x && x.code === item.ycbtCode) : null;
    if (!c) return;
    if (!c.timeline) c.timeline = [];
    fn(c);
    c.status = 'Hoàn thành';
    localStorage.setItem('claimsList', JSON.stringify(list));
}
function kpTlnsCompleteClaim(item, dateText, amount) {
    const money = (Number(amount) || 0).toLocaleString('vi-VN');
    // Trả lại một phần: Số tiền đã chi thực tế = Số tiền theo Quyết định − Số tiền trả lại ngân sách nhà nước (> 0)
    const paidReal = Math.max(0, (Number(item.amount) || 0) - (Number(amount) || 0));
    const paidText = paidReal.toLocaleString('vi-VN');
    kpCompleteClaim(item, c => {
        c.timeline.push({ title: 'Trả lại ngân sách nhà nước', date: dateText, desc: paidReal > 0
            ? `Đã chi trả ${paidText} đồng; phần còn lại ${money} đồng người yêu cầu không nhận trong thời hạn, đã nộp trả vào ngân sách nhà nước (${item.code}). Trạng thái Giải quyết YCBT chuyển Hoàn thành.`
            : `Người yêu cầu không nhận tiền bồi thường trong thời hạn; đã nộp trả ${money} đồng vào ngân sách nhà nước (${item.code}). Trạng thái Giải quyết YCBT chuyển Hoàn thành.`, status: 'completed' });
        c.sungQuy = true;
        if (paidReal > 0) {
            // Trả lại một phần: vụ việc tính là đã chi trả theo Số tiền đã chi thực tế; Ngày hoàn tất chi trả = Ngày trả lại ngân sách nhà nước
            c.moneyPaid = true;
            c.thucthiDate = dateText;
            c.thucthiNote = `Đã chi trả ${paidText} đồng; trả lại ngân sách nhà nước ${money} đồng (${item.code}).`;
        } else {
            // Trả lại toàn bộ: không ghi Ngày chi trả (thucthiDate), vụ việc không tính là đã chi trả
            c.thucthiNote = `Đã trả lại ngân sách nhà nước số tiền ${money} đồng (${item.code}).`;
        }
    });
}
function kpPayCompleteClaim(item, dateText, amount) {
    const money = (Number(amount) || 0).toLocaleString('vi-VN');
    kpCompleteClaim(item, c => {
        c.timeline.push({ title: 'Hoàn thành chi trả tiền bồi thường', date: dateText, desc: `Đã chi trả ${money} đồng tiền bồi thường (${item.code}). Trạng thái Giải quyết YCBT chuyển Hoàn thành.`, status: 'completed' });
        c.moneyPaid = true;
        c.thucthiDate = dateText;
        c.thucthiNote = `Đã chi trả ${money} đồng tiền bồi thường (${item.code}).`;
    });
}
function kpEsc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function kpSignText(m) { return m === KP_SIGN_OUTSIDE ? 'Ký ngoài' : 'Ký số trên hệ thống'; }
function kpDraftName(code) { return `Du_thao_QD_tam_ung_${code}`; }
function kpSignedName(item) { return item.signedFile || `QD_tam_ung_${item.code}_ky_so.pdf`; }
// Đề nghị tạm ứng Ký ngoài đã được Lãnh đạo ký duyệt nhưng chưa đính kèm văn bản đã ký
function kpNeedsSignedFile(item) {
    return kpIsAdv(item) && item.signMethod === KP_SIGN_OUTSIDE && kpNormStatus(item.status) === 'Chờ chi trả' && !item.signedFile;
}

// Màn xem văn bản (popup trang A4): Tải file Word / In / Đóng
function kpOpenDocViewer(bodyHtml, baseName) {
    const old = document.getElementById('kpDocViewer'); if (old) old.remove();
    const ov = document.createElement('div');
    ov.id = 'kpDocViewer';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:6000;display:flex;align-items:center;justify-content:center;padding:16px;';
    const btn = 'border:0;border-radius:6px;padding:7px 12px;font-weight:600;cursor:pointer;font-size:13px;';
    ov.innerHTML = `<div style="background:#fff;border-radius:10px;width:min(1000px,100%);height:min(92vh,100%);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.3);">
        <div style="display:flex;align-items:center;gap:8px;padding:10px 16px;background:#1e3a8a;color:#fff;font-family:system-ui,sans-serif;">
            <b style="margin-right:auto;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Xem văn bản - ${kpEsc(baseName)}</b>
            <button type="button" data-act="word" style="${btn}">Tải file (Word .doc)</button>
            <button type="button" data-act="print" style="${btn}">In</button>
            <button type="button" data-act="close" style="${btn}background:#dc2626;color:#fff;">Đóng</button>
        </div>
        <iframe title="Văn bản" style="flex:1;border:0;width:100%;background:#e5e7eb;"></iframe>
    </div>`;
    document.body.appendChild(ov);
    const fr = ov.querySelector('iframe');
    fr.srcdoc = `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><style>body{margin:0;background:#e5e7eb}.page{background:#fff;width:210mm;min-height:297mm;margin:20px auto;padding:20mm 20mm 20mm 30mm;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.15);font-family:'Times New Roman',serif;font-size:14pt;line-height:1.5;color:#000}@media print{body{background:#fff}.page{margin:0;box-shadow:none;width:auto;min-height:0}}</style></head><body><div class="page">${bodyHtml}</div></body></html>`;
    const close = () => { ov.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', e => {
        if (e.target === ov) { close(); return; }
        const act = e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'close') close();
        else if (act === 'print') { try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (err) { } }
        else if (act === 'word') {
            const html = `<html><head><meta charset="utf-8"></head><body style="font-family:'Times New Roman',serif;font-size:14pt;">${bodyHtml}</body></html>`;
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob(['﻿', html], { type: 'application/msword' }));
            a.download = baseName + '.doc';
            document.body.appendChild(a); a.click();
            setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
        }
    });
}

// Sinh Quyết định tạm ứng kinh phí bồi thường theo Mẫu 07_Template (giả lập nội dung mẫu trên giao diện)
function kpBuildAdvanceDecisionHtml(d) {
    const claim = mockClaims.find(c => c.code === d.ycbtCode) || {};
    const agency = claim.agency || 'TÊN CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG';
    const fmt = n => (Number(n) || 0).toLocaleString('vi-VN');
    const p = s => `<p style="margin:4pt 0; text-align:justify; text-indent:1cm;">${s}</p>`;
    const dp = String(d.docDate || '').split('/');
    const dateLine = dp.length === 3 ? `Hà Nội, ngày ${dp[0]} tháng ${dp[1]} năm ${dp[2]}` : '…, ngày … tháng … năm …';
    const payLine = d.payMethod === 'Nhận qua chuyển khoản'
        ? `chuyển khoản vào tài khoản số ${kpEsc(d.bankAccount || '…')} mở tại ${kpEsc(d.bankName || '…')}${d.bankBranch ? ' - ' + kpEsc(d.bankBranch) : ''}, chủ tài khoản: ${kpEsc(d.bankUser || d.nycName || '…')}`
        : 'chi trả trực tiếp bằng tiền mặt';
    return `<div style="font-family:'Times New Roman',serif; font-size:14pt; line-height:1.5; color:#000;">
        <div style="text-align:right; font-style:italic; font-size:12pt; margin-bottom:4pt;">Mẫu số 07/BTNN</div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12pt;"><tr>
            <td style="width:42%; padding-right:14pt; text-align:center; vertical-align:top; font-size:12pt; line-height:1.35;">
                <b>${kpEsc(String(agency).toUpperCase())}</b><br>
                <span style="display:inline-block; width:35%; border-top:1px solid #000; margin:2pt 0 4pt;"></span><br>
                Số: ${kpEsc(d.docNo || '…../QĐ-…')}
            </td>
            <td style="padding-left:6pt; text-align:center; vertical-align:top; font-size:12pt; line-height:1.35;">
                <b style="white-space:nowrap;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br>
                <b>Độc lập - Tự do - Hạnh phúc</b><br>
                <span style="display:inline-block; width:45%; border-top:1px solid #000; margin:2pt 0 4pt;"></span><br>
                <i>${dateLine}</i>
            </td>
        </tr></table>
        <p style="text-align:center; margin:14pt 0 4pt; font-size:15pt;"><b>QUYẾT ĐỊNH</b><br><b>Về việc tạm ứng kinh phí bồi thường</b></p>
        <p style="text-align:center; margin:4pt 0 12pt; font-size:13pt;"><b>THỦ TRƯỞNG ${kpEsc(String(agency).toUpperCase())}</b></p>
        ${p('<i>Căn cứ Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14;</i>')}
        ${p(`<i>Căn cứ hồ sơ yêu cầu bồi thường mã ${kpEsc(d.ycbtCode || '…')} của ông/bà ${kpEsc(d.nycName || '…')};</i>`)}
        <p style="text-align:center; margin:12pt 0 8pt;"><b>QUYẾT ĐỊNH:</b></p>
        ${p(`<b>Điều 1.</b> Tạm ứng kinh phí bồi thường cho ông/bà ${kpEsc(d.nycName || '…')}, địa chỉ: ${kpEsc(claim.address || '…')}.`)}
        ${p(`Tổng số tiền tạm ứng: ${fmt(d.amount)} đồng (Viết bằng chữ: <i>${kpEsc(docTienBangChu(Number(d.amount) || 0))}</i>), trong đó:`)}
        <p style="margin:2pt 0 2pt 1.5cm;">- Thiệt hại về tinh thần: ${fmt(d.advTinhThan)} đồng.</p>
        <p style="margin:2pt 0 2pt 1.5cm;">- Thiệt hại khác: ${fmt(d.advKhac)} đồng.</p>
        ${p(`<b>Điều 2.</b> Việc chi trả tiền tạm ứng được thực hiện theo phương thức ${payLine}.`)}
        ${p('<b>Điều 3.</b> Quyết định này có hiệu lực kể từ ngày ký.')}
        ${p(`<b>Điều 4.</b> Ông/Bà ${kpEsc(d.nycName || '…')} và cơ quan, tổ chức, cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này./.`)}
        <table style="width:100%; border-collapse:collapse; margin-top:16pt;"><tr>
            <td style="width:55%; vertical-align:top; font-size:12pt; line-height:1.4;"><b><i>Nơi nhận:</i></b><br>- Như Điều 4;<br>- Lưu: VT, HSVV.</td>
            <td style="text-align:center; vertical-align:top; font-size:13pt;"><b>THỦ TRƯỞNG CƠ QUAN</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i><br>
                ${d.digitalSign ? `<div style="display:inline-block; margin:10pt 0; padding:6pt 10pt; border:1.5px solid #1d4ed8; color:#1d4ed8; font-size:11pt; text-align:left;">Ký số bởi: ${kpEsc(d.digitalSign.by)}<br>Thời gian ký: ${kpEsc(d.digitalSign.at)}</div><br>` : '<br><br><br><br>'}
                <b>${kpEsc(d.approvedLeader && d.signedFile ? d.approvedLeader : '')}</b></td>
        </tr></table>
    </div>`;
}

// Dữ liệu văn bản lấy theo form đang nhập (MH02) hoặc theo bản ghi đã lưu
function kpFormDocData() {
    const val = id => (document.getElementById(id) || {}).value || '';
    const num = id => parseFloat(String(val(id)).replace(/\D/g, '')) || 0;
    const m = document.querySelector('input[name="kpSignMethod"]:checked');
    const payMethod = (document.querySelector('input[name="advRecMethodRadio"]:checked') || {}).value || '';
    return {
        code: val('formProposalCodeVal'), ycbtCode: val('formClaimCode'), nycName: val('formNycName'),
        amount: num('advApproveTinhThan') + num('advApproveKhac'), advTinhThan: num('advApproveTinhThan'), advKhac: num('advApproveKhac'),
        payMethod, bankAccount: val('advBankAccount'), bankName: val('advBankName'), bankBranch: val('advBankBranch'), bankUser: val('advBankUser'),
        signMethod: m ? m.value : KP_SIGN_DIGITAL, docNo: val('kpDocNo').trim(), docDate: val('kpDocDate').trim()
    };
}
function kpItemDocData(item) {
    return Object.assign({}, item, { advTinhThan: item.advApproveTinhThan || 0, advKhac: item.advApproveKhac || 0 });
}
function kpPreviewDraftFromForm() {
    const d = kpFormDocData();
    kpOpenDocViewer(kpBuildAdvanceDecisionHtml(d), kpDraftName(d.code || 'KP'));
}
function kpViewSignDoc(id, which) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;
    if (which === 'signed') {
        kpOpenDocViewer(kpBuildAdvanceDecisionHtml(kpItemDocData(item)), String(kpSignedName(item)).replace(/\.[a-z]+$/i, ''));
        return;
    }
    kpOpenDocViewer(kpBuildAdvanceDecisionHtml(Object.assign(kpItemDocData(item), { digitalSign: null, signedFile: null })), kpDraftName(item.code));
}

function kpOnSignMethodChange() {
    const m = document.querySelector('input[name="kpSignMethod"]:checked');
    const digital = !m || m.value === KP_SIGN_DIGITAL;
    document.querySelectorAll('.kp-sign-req').forEach(el => { el.style.display = digital ? 'inline' : 'none'; });
    ['kpDocNo', 'kpDocDate'].forEach(id => { const el = document.getElementById(id); if (el && !digital) { el.classList.remove('is-invalid'); const er = el.parentNode.querySelector('.error-message'); if (er) er.remove(); } });
}

// Khối "Văn bản Quyết định tạm ứng và Hình thức ký" (chỉ Đề nghị tạm ứng)
function kpRenderSignBlock(item, readOnly) {
    const block = document.getElementById('block6b_SignDoc');
    const body = document.getElementById('kpSignBlockBody');
    if (!block || !body) return;
    const typeVal = (document.getElementById('formProposalType') || {}).value;
    const isAdv = item ? kpIsAdv(item) : typeVal === 'Cấp tạm ứng';
    block.style.display = isAdv ? 'block' : 'none';
    if (!isAdv) { body.innerHTML = ''; return; }
    setAccordionState('block6b_SignDoc', true);
    const method = (item && item.signMethod) || KP_SIGN_DIGITAL;
    const code = (item && item.code) || (document.getElementById('formProposalCodeVal') || {}).value || '';
    const field = (label, html) => `<div class="form-group" style="margin-bottom:12px;"><span class="form-label">${label}</span>${html}</div>`;
    if (!readOnly) {
        body.innerHTML = `<div class="grid-3-cols" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
            ${field('Hình thức ký <span class="required">*</span>', `<div style="display:flex; gap:18px; align-items:center; min-height:34px;">
                <label style="display:inline-flex; gap:6px; align-items:center; cursor:pointer;"><input type="radio" name="kpSignMethod" value="${KP_SIGN_DIGITAL}" ${method !== KP_SIGN_OUTSIDE ? 'checked' : ''} onchange="kpOnSignMethodChange()"> Ký số trên hệ thống</label>
                <label style="display:inline-flex; gap:6px; align-items:center; cursor:pointer;"><input type="radio" name="kpSignMethod" value="${KP_SIGN_OUTSIDE}" ${method === KP_SIGN_OUTSIDE ? 'checked' : ''} onchange="kpOnSignMethodChange()"> Ký ngoài</label></div>`)}
            ${field('Số, ký hiệu văn bản <span class="required kp-sign-req">*</span>', `<input type="text" class="form-control" id="kpDocNo" maxlength="50" placeholder="VD: 125/QĐ-BTNN" value="${kpEsc(item && item.docNo || '')}">`)}
            ${field('Ngày văn bản <span class="required kp-sign-req">*</span>', `<div class="date-input-wrapper"><input type="text" class="form-control" id="kpDocDate" placeholder="dd/mm/yyyy" value="${kpEsc(item && item.docDate || '')}"><i class="fa-regular fa-calendar-days"></i></div>`)}
        </div>
        ${field('Văn bản dự thảo Quyết định tạm ứng kinh phí bồi thường', `<div><a href="javascript:void(0)" onclick="kpPreviewDraftFromForm()" style="display:inline-flex; gap:8px; align-items:center; font-weight:600; color:var(--primary-light); text-decoration:none;"><i class="fa-solid fa-file-word" style="color:#2563eb;"></i> ${kpEsc(kpDraftName(code))}.doc</a></div>`)}`;
        if (window.flatpickr) { try { flatpickr('#kpDocDate', { dateFormat: 'd/m/Y', allowInput: true }); } catch (e) { } }
        kpOnSignMethodChange();
        return;
    }
    const approved = !!item.approvedDate && ['Chờ chi trả', 'Hoàn thành', 'Trả lại ngân sách nhà nước', 'Chờ thu hồi', 'Đã thu hồi'].includes(kpNormStatus(item.status));
    let docHtml;
    if (item.signedFile) {
        docHtml = `<a href="javascript:void(0)" onclick="kpViewSignDoc('${item.id}','signed')" style="display:inline-flex; gap:8px; align-items:center; font-weight:600; color:var(--primary-light); text-decoration:none;"><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> ${kpEsc(item.signedFile)}</a>`
            + (item.digitalSign ? `<div style="font-size:12px; color:var(--text-muted);">Ký số bởi ${kpEsc(item.digitalSign.by)} - ${kpEsc(item.digitalSign.at)}</div>` : '');
    } else {
        docHtml = `<a href="javascript:void(0)" onclick="kpViewSignDoc('${item.id}','draft')" style="display:inline-flex; gap:8px; align-items:center; font-weight:600; color:var(--primary-light); text-decoration:none;"><i class="fa-solid fa-file-word" style="color:#2563eb;"></i> ${kpEsc(kpDraftName(item.code))}.doc</a>`
            + (approved && item.signMethod === KP_SIGN_OUTSIDE ? `<div><span class="badge badge-warning" style="margin-top:6px;">Chưa đính kèm văn bản đã ký</span></div>` : '');
    }
    const ro = (label, v) => field(label, `<div style="font-weight:600; color:var(--text-main); min-height:20px;">${v}</div>`);
    body.innerHTML = `<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
        ${ro('Hình thức ký', kpEsc(kpSignText(item.signMethod)))}
        ${ro('Số, ký hiệu văn bản', kpEsc(item.docNo || '-'))}
        ${ro('Ngày văn bản', kpEsc(item.docDate || '-'))}
    </div>
    ${field(item.signedFile ? 'Văn bản Quyết định tạm ứng đã ký' : 'Văn bản dự thảo Quyết định tạm ứng kinh phí bồi thường', `<div>${docHtml}</div>`)}`;
}
function kpSyncSignBlock() {
    const panel = document.getElementById('inlineProposalFormPanel');
    if (!panel || panel.style.display === 'none' || !formEditingMode) return;
    const keep = selectedProposalId ? proposalsList.find(p => p.id === selectedProposalId) : null;
    const typeVal = (document.getElementById('formProposalType') || {}).value;
    kpRenderSignBlock(typeVal === 'Cấp tạm ứng' ? Object.assign({ type: 'Cấp tạm ứng' }, keep ? { code: keep.code, signMethod: keep.signMethod, docNo: keep.docNo, docDate: keep.docDate } : {}) : { type: typeVal }, false);
}
function kpValidateSignFields() {
    const d = kpFormDocData();
    if (d.signMethod !== KP_SIGN_DIGITAL) return true;
    let firstBad = null;
    const mark = (id, msg) => {
        const el = document.getElementById(id); if (!el) return;
        el.classList.add('is-invalid');
        const host = el.closest('.form-group') || el.parentNode;
        let er = host.querySelector('.error-message');
        if (!er) { er = document.createElement('div'); er.className = 'error-message'; er.style.cssText = 'color:var(--danger-color); font-size:11.5px; margin-top:4px;'; host.appendChild(er); }
        er.innerText = msg;
        if (!firstBad) firstBad = el;
    };
    ['kpDocNo', 'kpDocDate'].forEach(id => { const el = document.getElementById(id); if (el) { el.classList.remove('is-invalid'); const er = (el.closest('.form-group') || el.parentNode).querySelector('.error-message'); if (er) er.remove(); } });
    if (!d.docNo) mark('kpDocNo', 'Đây là trường bắt buộc');
    if (!d.docDate) mark('kpDocDate', 'Đây là trường bắt buộc');
    else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(d.docDate)) mark('kpDocDate', 'Ngày văn bản không đúng định dạng dd/mm/yyyy');
    if (firstBad) { setAccordionState('block6b_SignDoc', true); firstBad.focus(); firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' }); return false; }
    return true;
}

// Ký số Quyết định tạm ứng khi Lãnh đạo Ký duyệt (Hình thức ký = Ký số trên hệ thống)
function kpApplyDigitalSign(item) {
    if (!kpIsAdv(item) || item.signMethod !== KP_SIGN_DIGITAL || kpNormStatus(item.status) !== 'Chờ chi trả') return;
    item.signedFile = `QD_tam_ung_${item.code}_ky_so.pdf`;
    item.digitalSign = { by: item.approvedLeader || 'Lãnh đạo cơ quan', at: item.approvedDate || formatCurrentDateTime(), cert: 'Chứng thư số của Lãnh đạo ký duyệt' };
}

// Popup Đính kèm văn bản đã ký (Hình thức ký = Ký ngoài, sau khi Lãnh đạo Ký duyệt)
let kpSignedUploadId = null;
let kpSignedUploadFile = '';
function kpOpenSignedUpload(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;
    kpSignedUploadId = id;
    kpSignedUploadFile = '';
    const old = document.getElementById('kpSignedUploadOverlay'); if (old) old.remove();
    const ov = document.createElement('div');
    ov.id = 'kpSignedUploadOverlay';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:5000;display:flex;align-items:center;justify-content:center;padding:16px;';
    ov.innerHTML = `<div style="background:#fff;border-radius:10px;width:min(620px,100%);box-shadow:0 20px 50px rgba(0,0,0,.25);overflow:hidden;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--primary-color,#1e3a8a);color:#fff;font-weight:700;"><span><i class="fa-solid fa-file-arrow-up"></i> Đính kèm văn bản đã ký</span><span style="cursor:pointer;font-size:20px;" onclick="kpCloseSignedUpload()">&times;</span></div>
        <div style="padding:18px 20px;">
            <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:13px;line-height:1.7;">
                Mã đề nghị: <b>${kpEsc(item.code)}</b> - Người yêu cầu: <b>${kpEsc(item.nycName)}</b><br>Lãnh đạo ký duyệt: <b>${kpEsc(item.approvedLeader || '-')}</b> - ${kpEsc(item.approvedDate || '')}
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                <div class="form-group"><span class="form-label">Số, ký hiệu văn bản <span class="required">*</span></span><input type="text" class="form-control" id="kpUpDocNo" maxlength="50" value="${kpEsc(item.docNo || '')}"></div>
                <div class="form-group"><span class="form-label">Ngày ký <span class="required">*</span></span><div class="date-input-wrapper"><input type="text" class="form-control" id="kpUpDocDate" placeholder="dd/mm/yyyy" value="${kpEsc(item.docDate || '')}"><i class="fa-regular fa-calendar-days"></i></div></div>
            </div>
            <div class="form-group" style="margin-bottom:0;"><span class="form-label">Tệp văn bản đã ký (.pdf) <span class="required">*</span></span>
                <div style="display:flex;gap:10px;align-items:center;"><button type="button" class="btn btn-outline-primary btn-sm" onclick="document.getElementById('kpUpFile').click()"><i class="fa-solid fa-upload"></i> Tải lên</button><span id="kpUpFileName" style="font-size:13px;color:var(--text-muted);font-style:italic;">Chưa chọn tệp</span></div>
                <input type="file" id="kpUpFile" accept=".pdf" style="display:none;" onchange="kpOnSignedFilePicked(this)">
            </div>
            <div id="kpUpError" style="display:none;color:var(--danger-color);font-size:12px;margin-top:10px;"></div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;padding:12px 20px;background:#F8FAFC;border-top:1px solid #E2E8F0;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="kpCloseSignedUpload()">Hủy bỏ</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="kpSaveSignedUpload()"><i class="fa-solid fa-floppy-disk"></i> Lưu</button>
        </div>
    </div>`;
    document.body.appendChild(ov);
    if (window.flatpickr) { try { flatpickr('#kpUpDocDate', { dateFormat: 'd/m/Y', allowInput: true }); } catch (e) { } }
}
function kpOnSignedFilePicked(input) {
    const f = input.files && input.files[0];
    if (!f) return;
    if (!/\.pdf$/i.test(f.name)) { showToast('Chỉ cho phép tải lên tệp định dạng .pdf', 'error'); input.value = ''; return; }
    kpSignedUploadFile = f.name;
    const el = document.getElementById('kpUpFileName');
    if (el) { el.innerText = f.name; el.style.fontStyle = 'normal'; el.style.color = 'var(--text-main)'; }
}
function kpCloseSignedUpload() { const ov = document.getElementById('kpSignedUploadOverlay'); if (ov) ov.remove(); kpSignedUploadId = null; }
function kpSaveSignedUpload() {
    const item = proposalsList.find(p => p.id === kpSignedUploadId);
    if (!item) return;
    const no = (document.getElementById('kpUpDocNo').value || '').trim();
    const dt = (document.getElementById('kpUpDocDate').value || '').trim();
    const errs = [];
    if (!no) errs.push('Số, ký hiệu văn bản');
    if (!dt) errs.push('Ngày ký');
    if (!kpSignedUploadFile) errs.push('Tệp văn bản đã ký');
    const er = document.getElementById('kpUpError');
    if (errs.length) { er.innerText = 'Vui lòng nhập đầy đủ: ' + errs.join(', ') + '.'; er.style.display = 'block'; return; }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dt)) { er.innerText = 'Ngày ký không đúng định dạng dd/mm/yyyy.'; er.style.display = 'block'; return; }
    item.docNo = no;
    item.docDate = dt;
    item.signedFile = kpSignedUploadFile;
    item.signedUploadedAt = formatCurrentDateTime();
    saveProposalsToLocal();
    kpCloseSignedUpload();
    showToast(`Đã đính kèm văn bản đã ký cho đề nghị ${item.code}!`, 'success');
    const panel = document.getElementById('inlineProposalFormPanel');
    if (panel && panel.style.display !== 'none' && selectedProposalId === item.id) viewProposalDetail(item.id);
    else renderProposalsTable();
}

// Thao tác dòng của Cán bộ xử lý: thêm "Đính kèm văn bản đã ký"; Cập nhật chi trả khóa mờ khi chưa đính kèm
function kpSpecialistActions(item, b) {
    const offStyle = 'opacity: 0.35; pointer-events: none; cursor: not-allowed;';
    let attachBtn = `<button class="icon-btn" style="${offStyle}" title="Đính kèm văn bản đã ký"><i class="fa-solid fa-file-arrow-up"></i></button>`;
    let payBtn = b.payBtn;
    if (kpNeedsSignedFile(item)) {
        attachBtn = `<button class="icon-btn edit" title="Đính kèm văn bản đã ký" onclick="event.stopPropagation(); kpOpenSignedUpload('${item.id}')"><i class="fa-solid fa-file-arrow-up"></i></button>`;
        payBtn = `<button class="icon-btn accept" style="${offStyle}" title="Cập nhật chi trả"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
    }
    return `${b.fillBtn} ${b.updateBtn} ${attachBtn} ${payBtn} ${b.treasuryBtn} ${b.deleteBtn}`;
}

// ---------------- Bọc các chức năng sẵn có ----------------
(function () {
    const origOpen = openCreateProposalForm;
    openCreateProposalForm = function () { origOpen.apply(this, arguments); kpRenderSignBlock(null, false); };
    const origType = handleTypeChange;
    handleTypeChange = function () { const r = origType.apply(this, arguments); kpSyncSignBlock(); return r; };
    const origFill = fillProposalDirect;
    fillProposalDirect = function (id) { origFill.apply(this, arguments); const it = proposalsList.find(p => p.id === id); if (it) kpRenderSignBlock(it, false); };
    const origUpd = updateProposalDirect;
    updateProposalDirect = function (id) { origUpd.apply(this, arguments); const it = proposalsList.find(p => p.id === id); if (it) kpRenderSignBlock(it, false); };
    const origSave = saveProposal;
    saveProposal = function () {
        const isAdv = (document.getElementById('formProposalType') || {}).value === 'Cấp tạm ứng';
        if (isAdv && !kpValidateSignFields()) return;
        const sign = isAdv ? kpFormDocData() : null;
        const code = document.getElementById('formProposalCodeVal').value.trim();
        origSave.apply(this, arguments);
        const item = proposalsList.find(p => p.code === code && p.status === 'Chờ duyệt');
        if (item && isAdv) {
            item.signMethod = sign.signMethod;
            item.docNo = sign.docNo;
            item.docDate = sign.docDate;
            item.draftDoc = kpDraftName(code) + '.doc';
            item.signedFile = null;
            item.digitalSign = null;
            saveProposalsToLocal();
            renderProposalsTable();
        }
    };
    const origView = viewProposalDetail;
    viewProposalDetail = function (id) {
        origView.apply(this, arguments);
        // Khối 6 - Tài liệu đính kèm (chế độ xem): dựng lại sau khi màn chi tiết mở các khối, ẩn khi không có dữ liệu
        renderProposalAttachedDocs();
        const item = proposalsList.find(p => p.id === id);
        if (!item) return;
        kpRenderSignBlock(item, true);
        // Đính kèm văn bản đã ký (Ký ngoài) tại màn chi tiết; Cập nhật chi trả ẩn khi chưa đính kèm
        let btn = document.getElementById('btnViewActionAttachSigned');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'btnViewActionAttachSigned';
            btn.className = 'btn btn-success';
            btn.innerHTML = '<i class="fa-solid fa-file-arrow-up"></i> Đính kèm văn bản đã ký';
            const pay = document.getElementById('btnViewActionPay');
            if (pay && pay.parentNode) pay.parentNode.insertBefore(btn, pay);
        }
        btn.onclick = () => kpOpenSignedUpload(item.id);
        const need = kpRole() !== 'lanh-dao' && kpNeedsSignedFile(item);
        btn.style.display = need ? 'inline-flex' : 'none';
        if (need) { const pay = document.getElementById('btnViewActionPay'); if (pay) pay.style.display = 'none'; }
    };
    const origPay = payProposalDirect;
    payProposalDirect = function (id) {
        const item = proposalsList.find(p => p.id === id);
        if (item && kpNeedsSignedFile(item)) {
            showCustomAlertModal('Đề nghị tạm ứng chọn Hình thức ký "Ký ngoài": vui lòng Đính kèm văn bản đã ký trước khi Cập nhật chi trả.', 'Chưa đính kèm văn bản đã ký', 'warning');
            return;
        }
        return origPay.apply(this, arguments);
    };
    const origOpenApprove = openApproveModal;
    openApproveModal = function (id) {
        origOpenApprove.apply(this, arguments);
        const item = proposalsList.find(p => p.id === id);
        const row = document.getElementById('approveModalSignRow');
        if (!row) return;
        if (item && kpIsAdv(item) && item.signMethod) {
            row.style.display = 'block';
            row.innerHTML = `<span style="color:#64748b;">Hình thức ký:</span> <strong style="color:#0f172a; margin-left:6px;">${kpEsc(kpSignText(item.signMethod))}</strong>
                <span style="margin-left:12px;"><a href="javascript:void(0)" onclick="kpViewSignDoc('${item.id}','draft')" style="font-weight:600;">Xem dự thảo Quyết định tạm ứng</a></span>
                ${item.signMethod === KP_SIGN_DIGITAL ? '<div style="font-size:12px; color:#64748b; margin-top:4px;">Khi Ký duyệt, hệ thống ký số Quyết định tạm ứng.</div>' : '<div style="font-size:12px; color:#64748b; margin-top:4px;">Sau khi Ký duyệt, Cán bộ xử lý đính kèm văn bản đã ký ngoài.</div>'}`;
        } else {
            row.style.display = 'none';
            row.innerHTML = '';
        }
    };
    const origCloseApprove = closeApproveModal;
    closeApproveModal = function (confirm) {
        const id = approveProposalId;
        origCloseApprove.apply(this, arguments);
        if (!confirm || !id) return;
        const item = proposalsList.find(p => p.id === id);
        if (item && kpIsAdv(item) && item.signMethod === KP_SIGN_DIGITAL && !item.signedFile) {
            kpApplyDigitalSign(item);
            saveProposalsToLocal();
            const panel = document.getElementById('inlineProposalFormPanel');
            if (panel && panel.style.display !== 'none' && selectedProposalId === id) viewProposalDetail(id);
            renderProposalsTable();
        }
    };
})();
