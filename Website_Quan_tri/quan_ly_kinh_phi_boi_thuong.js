let mockClaims = [
    {
        code: "BT-2026-002",
        nyc: "Trần Thị B",
        role: "Người thừa kế của người bị thiệt hại",
        gender: "Nữ",
        birth: "20/10/1990",
        nycVictimAlive: "yes",
        cardType: "CCCD",
        cardNo: "002092003845",
        cardDate: "10/02/2023",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0904888999",
        email: "tranthib@example.com",
        address: "Số 88 đường Lạch Tray, Ngô Quyền, Hải Phòng",
        agency: "Tòa án nhân dân TP. Hà Nội",
        field: "Trong hoạt động tố tụng hình sự",
        amount: 350000000,
        status: "Đang xác minh thiệt hại",
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
        cardType: "CCCD",
        cardNo: "001085002934",
        cardDate: "12/12/2020",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0912345678",
        email: "phamvanc@example.com",
        address: "Số 15 đường Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        agency: "UBND Quận Cầu Giấy",
        field: "Trong hoạt động quản lý hành chính",
        amount: 150000000,
        status: "Đang xác minh thiệt hại",
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
        cardType: "CCCD",
        cardNo: "001089004823",
        cardDate: "15/08/2021",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0911556677",
        email: "levand@example.com",
        address: "Số 234 Láng Hạ, Đống Đa, Hà Nội",
        agency: "Sở Tư pháp Hải Phòng",
        field: "Trong hoạt động tố tụng hành chính",
        amount: 250000000,
        status: "Chờ thực thi",
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
        cardType: "CCCD",
        cardNo: "001095002934",
        cardDate: "20/05/2022",
        cardPlace: "Cục Cảnh sát QLHC về TTXH",
        phone: "0904556677",
        email: "tranthig@example.com",
        address: "Phường Tràng Tiền, Hoàn Kiếm, Hà Nội",
        agency: "Sở Tư pháp Hà Nội",
        field: "Trong hoạt động quản lý hành chính",
        amount: 300000000,
        status: "Chờ thực thi",

        // Damage breakdown
        selectedDamages: {
            taiSan: 100000000,
            sucKhoe: 80000000,
            tinhThan: 120000000
        }
    }
];

// MOCK PROPOSALS LIST DATA (10 items satisfying Rule 3 & 4)
let proposalsList = [
    {
        id: "P1",
        code: "KP-2026-001",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-005",
        nycName: "Lê Văn D",
        amount: 250000000,
        user: "Nguyễn Văn Thụ",
        date: "02/05/2026",
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
        rejectHistory: [
            {
                date: "28/04/2026",
                leader: "Nguyễn Thế Anh (Lãnh đạo)",
                opinion: "Từ chối phê duyệt do tờ trình chưa đính kèm Quyết định giải quyết bồi thường có hiệu lực pháp luật để đối chiếu số tiền."
            }
        ],
        payoutDate: "05/05/2026",
        payoutAmountReal: 250000000,
        payoutMethod: "Chuyển khoản qua ngân hàng",
        payoutRecName: "Lê Văn D",
        payoutRecAddress: "Số 234 Láng Hạ, Đống Đa, Hà Nội",
        payoutBankAccount: "123456789012",
        payoutBankUser: "LÊ VĂN D",
        payoutBankName: "Vietcombank",
        payoutBankBranch: "Chi nhánh Đống Đa",
        payoutFile: "Chung_tu_chi_tra_KP_LeVanD.pdf",
        noticeReceivedDate: "01/05/2026",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_LeVanD.pdf"
    },
    {
        id: "P2",
        code: "KP-2026-002",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        amount: 100000000,
        user: "Nguyễn Văn Thụ",
        date: "15/05/2026",
        status: "Chờ chi trả",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Cấp tạm ứng bồi thường thiệt hại cho bà Trần Thị B.",
        files: [
            { name: "Tờ trình đề xuất cấp kinh phí", file: "De_xuat_tam_ung_B.pdf" },
            { name: "Quyết định phê duyệt tạm ứng", file: "Quyet_dinh_duyet_tam_ung_002.pdf" }
        ],
        advApproveTinhThan: 60000000,
        advApproveKhac: 40000000,
        leaderOpinion: "Đồng ý cấp tạm ứng kinh phí bồi thường cho bà Trần Thị B.",
        approvedDate: "16/05/2026 09:15",
        approvedLeader: "Lãnh đạo cơ quan",
        noticeReceivedDate: "01/09/2023",
        noticeProofFile: "Thong_bao_nhan_tam_ung_B.pdf"
    },
    {
        id: "P3",
        code: "KP-2026-003",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-005",
        nycName: "Lê Văn D",
        amount: 200000000,
        user: "Lê Văn Nam",
        date: "01/07/2026",
        status: "Chờ duyệt",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Đề nghị cấp phát kinh phí bồi thường chính thức 250.000.000 đ theo quyết định bồi thường số 104/QD-BT, trừ tạm ứng đã nhận 50 triệu.",
        files: [{ name: "Tờ trình Lê Văn D", file: "To_trinh_cap_KP_LeVanD.pdf" }],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 100000000,
            chiPhiKhac: 20000000
        }
    },
    {
        id: "P4",
        code: "KP-2026-004",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        amount: 50000000,
        user: "Lê Văn Nam",
        date: "02/07/2026",
        status: "Chờ duyệt",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đề nghị cấp tạm ứng bồi thường cho bà Trần Thị B.",
        files: [{ name: "Đề xuất tạm ứng Trần Thị B", file: "De_xuat_tam_ung_B.pdf" }],
        advApproveTinhThan: 30000000,
        advApproveKhac: 20000000
    },
    {
        id: "P5",
        code: "KP-2026-005",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        amount: 50000000,
        user: "Lê Văn Nam",
        date: "03/07/2026",
        status: "Chờ lập đề nghị",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Tờ trình nháp cấp tạm ứng bồi thường.",
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
        amount: 300000000,
        user: "Lê Văn Nam",
        date: "04/07/2026",
        status: "Chờ lập đề nghị",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Tờ trình nháp kinh phí bồi thường.",
        files: [],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 150000000,
            chiPhiKhac: 20000000
        }
    },
    {
        id: "P7",
        code: "KP-2026-007",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        amount: 80000000,
        user: "Lê Văn Nam",
        date: "05/07/2026",
        status: "Bị từ chối",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đề nghị cấp tạm ứng bồi thường bị từ chối do thiếu tài liệu y tế chứng minh.",
        leaderOpinion: "Từ chối do hồ sơ chưa đính kèm báo cáo giám định sức khỏe của bệnh viện cấp tỉnh.",
        files: [],
        advApproveTinhThan: 40000000,
        advApproveKhac: 40000000
    },
    {
        id: "P8",
        code: "KP-2026-008",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-005",
        nycName: "Lê Văn D",
        amount: 350000000,
        user: "Lê Văn Nam",
        date: "06/07/2026",
        status: "Bị từ chối",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Yêu cầu cấp kinh phí bồi thường chính thức bị từ chối để bổ soát lại chứng từ thầu phụ.",
        leaderOpinion: "Từ chối do cần đối chiếu kỹ hơn các hợp đồng thuê thiết bị của Công ty Hải Phát.",
        files: [],
        approvedDamages: {
            taiSan: 100000000,
            thuNhap: 50000000,
            tinhThan: 150000000,
            chiPhiKhac: 50000000
        }
    },
    {
        id: "P9",
        code: "KP-2026-009",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-005",
        nycName: "Lê Văn D",
        amount: 150000000,
        user: "Nguyễn Văn Thụ",
        date: "07/07/2026",
        status: "Chờ chi trả",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Tờ trình cấp phát kinh phí bồi thường bổ sung đã được thông qua và chuyển sang trạng thái chờ chi trả.",
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
        approvedDate: "08/07/2026 14:20",
        approvedLeader: "Lãnh đạo cơ quan",
        noticeReceivedDate: "15/07/2023",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_bo_sung_LeVanD.pdf"
    },
    {
        id: "P10",
        code: "KP-2026-010",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-015",
        nycName: "Phạm Văn C",
        amount: 50000000,
        user: "Nguyễn Văn Thụ",
        date: "10/05/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đã hoàn thành cấp tạm ứng bồi thường cho ông Phạm Văn C.",
        leaderOpinion: "Đồng ý tạm ứng 50.000.000 VNĐ.",
        files: [{ name: "Tờ trình tạm ứng Phạm Văn C", file: "To_trinh_tam_ung_C.pdf" }],
        advApproveTinhThan: 30000000,
        advApproveKhac: 20000000,
        payoutDate: "12/05/2026",
        payoutAmountReal: 50000000,
        payoutMethod: "Tiền mặt",
        payoutRecName: "Phạm Văn C",
        payoutRecAddress: "Số 15 đường Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
        payoutReceiptNo: "BL-2026-088",
        payoutFile: "Bien_lai_chi_tam_ung_C.pdf",
        noticeReceivedDate: "11/05/2026",
        noticeProofFile: "Thong_bao_nhan_tam_ung_C.pdf"
    },
    {
        id: "P11",
        code: "KP-2026-011",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-002",
        nycName: "Trần Thị B",
        amount: 100000000,
        user: "Nguyễn Văn Thụ",
        date: "20/05/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đã hoàn thành cấp tạm ứng bồi thường cho bà Trần Thị B.",
        leaderOpinion: "Đồng ý cấp tạm ứng 100 triệu.",
        files: [{ name: "Tờ trình tạm ứng Trần Thị B", file: "To_trinh_tam_ung_B.pdf" }],
        advApproveTinhThan: 60000000,
        advApproveKhac: 40000000,
        payoutDate: "22/05/2026",
        payoutAmountReal: 100000000,
        payoutMethod: "Chuyển khoản qua ngân hàng",
        payoutRecName: "Trần Thị B",
        payoutRecAddress: "Số 88 đường Lạch Tray, Ngô Quyền, Hải Phòng",
        payoutBankAccount: "190333444555",
        payoutBankName: "Techcombank",
        payoutBankUser: "TRẦN THỊ B",
        payoutFile: "Bien_lai_chuyen_khoan_tam_ung_B.pdf",
        noticeReceivedDate: "21/05/2026",
        noticeProofFile: "Thong_bao_nhan_tam_ung_B_hoan_thanh.pdf"
    },
    {
        id: "P12",
        code: "KP-2026-012",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-011",
        nycName: "Trần Thị G",
        amount: 300000000,
        user: "Lê Văn Nam",
        date: "25/05/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Đã thực hiện chi trả kinh phí bồi thường tiền mặt cho bà Trần Thị G.",
        leaderOpinion: "Đồng ý phê duyệt cấp kinh phí bồi thường.",
        files: [{ name: "Tờ trình kinh phí bồi thường", file: "To_trinh_KPBT_G.pdf" }],
        approvedDamages: {
            taiSan: 100000000,
            sucKhoe: 80000000,
            tinhThan: 120000000
        },
        payoutDate: "27/05/2026",
        payoutAmountReal: 300000000,
        payoutMethod: "Tiền mặt",
        payoutRecName: "Trần Thị G",
        payoutRecAddress: "Phường Tràng Tiền, Hoàn Kiếm, Hà Nội",
        payoutReceiptNo: "BL-2026-099",
        payoutFile: "Bien_lai_chi_tra_tien_mat_G.pdf",
        noticeReceivedDate: "26/05/2026",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_G.pdf"
    },
    {
        id: "P13",
        code: "KP-2026-013",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-018",
        nycName: "Hoàng Văn H",
        amount: 180000000,
        user: "Nguyễn Văn Thụ",
        date: "18/06/2026",
        status: "Chờ chi trả",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Khoản kinh phí bồi thường đã thông báo nhận nhưng quá hạn 3 năm người yêu cầu chưa đến nhận, đủ điều kiện sung quỹ.",
        leaderOpinion: "Đồng ý cấp kinh phí bồi thường theo quyết định đã ban hành.",
        files: [{ name: "Tờ trình kinh phí Hoàng Văn H", file: "To_trinh_KPBT_H.pdf" }],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 80000000,
            chiPhiKhac: 20000000
        },
        payoutDate: "",
        payoutAmountReal: 0,
        payoutRecName: "Hoàng Văn H",
        payoutRecAddress: "Phường Minh Khai, Bắc Từ Liêm, Hà Nội",
        noticeReceivedDate: "10/06/2023",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_H.pdf"
    },
    {
        id: "P14",
        code: "KP-2026-014",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-019",
        nycName: "Nguyễn Thị K",
        amount: 120000000,
        user: "Nguyễn Văn Thụ",
        date: "21/06/2026",
        status: "Chờ chi trả",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Khoản tạm ứng đã thông báo nhận kinh phí nhưng quá hạn 3 năm vẫn chưa thực hiện chi trả.",
        leaderOpinion: "Đồng ý cấp tạm ứng theo hồ sơ đủ điều kiện.",
        files: [{ name: "Tờ trình tạm ứng Nguyễn Thị K", file: "To_trinh_tam_ung_K.pdf" }],
        advApproveTinhThan: 70000000,
        advApproveKhac: 50000000,
        payoutRecName: "Nguyễn Thị K",
        payoutRecAddress: "Xã An Khánh, Hoài Đức, Hà Nội",
        noticeReceivedDate: "01/03/2023",
        noticeProofFile: "Thong_bao_nhan_tam_ung_K.pdf",
        noticeNote: "Đã gửi thông báo nhận kinh phí bằng văn bản và qua điện thoại, người yêu cầu không đến nhận."
    },
    {
        id: "P15",
        code: "KP-2026-015",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-020",
        nycName: "Phạm Thị M",
        amount: 200000000,
        user: "Lê Văn Nam",
        date: "23/06/2026",
        status: "Sung quỹ nhà nước",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Khoản kinh phí bồi thường đã hoàn tất sung quỹ Nhà nước do người yêu cầu không nhận sau hạn 3 năm.",
        leaderOpinion: "Phê duyệt sung quỹ theo đề nghị của cán bộ xử lý.",
        files: [{ name: "Tờ trình cấp kinh phí Phạm Thị M", file: "To_trinh_KPBT_M.pdf" }],
        approvedDamages: {
            taiSan: 70000000,
            thuNhap: 40000000,
            tinhThan: 70000000,
            chiPhiKhac: 20000000
        },
        payoutAmountReal: 0,
        payoutRecName: "Phạm Thị M",
        payoutRecAddress: "Phường Cầu Diễn, Nam Từ Liêm, Hà Nội",
        noticeReceivedDate: "05/01/2023",
        noticeProofFile: "Thong_bao_nhan_kinh_phi_M.pdf",
        treasuryForfeitDate: "18/07/2026",
        treasuryVoucherNo: "SQ-2026-015",
        treasuryAmount: 200000000,
        treasuryReason: "Người yêu cầu bồi thường không nhận kinh phí sau 3 năm kể từ ngày nhận thông báo.",
        treasuryFile: "Chung_tu_sung_quy_KP_2026_015.pdf"
    },
    {
        id: "P16",
        code: "KP-2026-016",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-021",
        nycName: "Đỗ Quốc Cường",
        nycRole: "Người bị thiệt hại",
        amount: 450000000,
        user: "Nguyễn Văn Thụ",
        date: "25/06/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Chi trả kinh phí bồi thường oan sai trong hoạt động tố tụng hình sự cho ông Đỗ Quốc Cường.",
        leaderOpinion: "Đồng ý chi trả kinh phí theo đúng bản án có hiệu lực pháp luật.",
        files: [{ name: "Tờ trình chi trả Đỗ Quốc Cường", file: "To_trinh_KPBT_DoQuocCuong.pdf" }],
        approvedDamages: {
            taiSan: 100000000,
            thuNhap: 120000000,
            tinhThan: 180000000,
            chiPhiKhac: 50000000
        },
        payoutDate: "30/06/2026",
        payoutAmountReal: 450000000,
        payoutMethod: "Chi trả qua chuyển khoản",
        payoutRecName: "ĐỖ QUỐC CƯỜNG",
        payoutRecAddress: "Số 45 phố Hai Bà Trưng, Hoàn Kiếm, Hà Nội",
        payoutBankAccount: "001100456789",
        payoutBankUser: "ĐỖ QUỐC CƯỜNG",
        payoutBankName: "Vietcombank",
        payoutBankBranch: "Sở Giao Dịch",
        payoutFile: "Uy_nhiem_chi_DoQuocCuong_VCB.pdf",
        noticeReceivedDate: "26/06/2026",
        noticeProofFile: "Giay_bao_nhan_DoQuocCuong.pdf",
        payoutNote: "Đã hoàn tất thủ tục ủy nhiệm chi số 045/UNC-TC chuyển tiền bồi thường vào tài khoản Vietcombank."
    },
    {
        id: "P17",
        code: "KP-2026-017",
        type: "Cấp tạm ứng",
        ycbtCode: "BT-2026-022",
        nycName: "Vũ Thị Mai",
        nycRole: "Người đại diện hợp pháp",
        amount: 85000000,
        user: "Lê Văn Nam",
        date: "28/06/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Tạm ứng kinh phí cứu chữa, bồi hoàn chi phí y tế khẩn cấp cho người bị thiệt hại.",
        leaderOpinion: "Phê duyệt tạm ứng kịp thời hỗ trợ người dân.",
        files: [{ name: "Tờ trình tạm ứng Vũ Thị Mai", file: "To_trinh_tam_ung_VuThiMai.pdf" }],
        advApproveTinhThan: 45000000,
        advApproveKhac: 40000000,
        payoutDate: "02/07/2026",
        payoutAmountReal: 85000000,
        payoutMethod: "Chi trả trực tiếp bằng tiền mặt",
        payoutRecName: "Vũ Thị Mai",
        payoutRecAddress: "Tổ 12, phường Phúc Diễn, Bắc Từ Liêm, Hà Nội",
        payoutReceiptNo: "BL-TM-2026/089",
        payoutFile: "Phieu_chi_tien_mat_VuThiMai_signed.pdf",
        noticeReceivedDate: "29/06/2026",
        noticeProofFile: "Thong_bao_nhan_tam_ung_VuThiMai.pdf",
        payoutNote: "Đã giao trực tiếp tiền mặt 85.000.000 VNĐ tại bộ phận kế toán, người nhận đã ký nhận đầy đủ biên lai."
    },
    {
        id: "P18",
        code: "KP-2026-018",
        type: "Cấp kinh phí bồi thường",
        ycbtCode: "BT-2026-023",
        nycName: "Ngô Văn Hùng",
        nycRole: "Người bị thiệt hại",
        amount: 520000000,
        user: "Nguyễn Văn Thụ",
        date: "05/07/2026",
        status: "Hoàn thành",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tài chính Hà Nội",
        notes: "Chi trả bồi thường tài sản và thu nhập thực tế bị mất do quyết định hành chính trái pháp luật.",
        leaderOpinion: "Đồng ý giải ngân toàn bộ kinh phí theo quyết định giải quyết bồi thường.",
        files: [{ name: "Tờ trình chi trả Ngô Văn Hùng", file: "To_trinh_KPBT_NgoVanHung.pdf" }],
        approvedDamages: {
            taiSan: 250000000,
            thuNhap: 150000000,
            tinhThan: 80000000,
            chiPhiKhac: 40000000
        },
        payoutDate: "10/07/2026",
        payoutAmountReal: 520000000,
        payoutMethod: "Chi trả qua chuyển khoản",
        payoutRecName: "NGÔ VĂN HÙNG",
        payoutRecAddress: "Số 78 đường Quang Trung, Hà Đông, Hà Nội",
        payoutBankAccount: "102888999123",
        payoutBankUser: "NGÔ VĂN HÙNG",
        payoutBankName: "BIDV",
        payoutBankBranch: "Chi nhánh Hà Tây",
        payoutFile: "Chung_tu_chuyen_khoan_BIDV_NgoVanHung.pdf",
        noticeReceivedDate: "06/07/2026",
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
        date: "08/07/2026",
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
        payoutDate: "14/07/2026",
        payoutAmountReal: 175000000,
        payoutMethod: "Chi trả qua chuyển khoản",
        payoutRecName: "BÙI THỊ NGỌC",
        payoutRecAddress: "Số 12 ngõ 89 Thái Hà, Đống Đa, Hà Nội",
        payoutBankAccount: "19034567890123",
        payoutBankUser: "BÙI THỊ NGỌC",
        payoutBankName: "Techcombank",
        payoutBankBranch: "Chi nhánh Thăng Long",
        payoutFile: "Lenh_chuyen_tien_TCB_BuiThiNgoc.pdf",
        noticeReceivedDate: "09/07/2026",
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
        date: "12/07/2026",
        status: "Hoàn thành",
        source: "Tạm ứng kinh phí Bộ Tài chính",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Tạm ứng chi phí phục hồi sức khỏe và điều trị thương tích.",
        leaderOpinion: "Đồng ý duyệt tạm ứng theo quy định tại Điều 44 Luật TNBTCNN.",
        files: [{ name: "Tờ trình tạm ứng Dương Đình Trọng", file: "To_trinh_tam_ung_DuongDinhTrong.pdf" }],
        advApproveTinhThan: 30000000,
        advApproveKhac: 30000000,
        payoutDate: "16/07/2026",
        payoutAmountReal: 60000000,
        payoutMethod: "Chi trả trực tiếp bằng tiền mặt",
        payoutRecName: "Dương Đình Trọng",
        payoutRecAddress: "Số 9 phố Nguyễn Đình Chiểu, Hai Bà Trưng, Hà Nội",
        payoutReceiptNo: "BL-TM-2026/102",
        payoutFile: "Phieu_chi_TM_DuongDinhTrong_signed.pdf",
        noticeReceivedDate: "13/07/2026",
        noticeProofFile: "Bien_ban_giao_nhan_thong_bao_DuongDinhTrong.pdf",
        payoutNote: "Chi trả tiền mặt tại trụ sở cơ quan, ông Dương Đình Trọng đã trực tiếp ký nhận tiền mặt."
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

// Sync claimsList and proposalsList from localStorage on DOMContentLoaded
function syncFromLocalStorage() {
    // Force reset if version is old to fetch updated files and statuses
    if (localStorage.getItem('proposals_version') !== 'v27') {
        localStorage.setItem('proposals_version', 'v27');
        localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
    }

    const localProposals = localStorage.getItem('proposalsList');
    if (localProposals) {
        try {
            let parsed = JSON.parse(localProposals);
            if (!Array.isArray(parsed)) {
                localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
            } else {
                // If the mock dataset has less items than our rich list, replace it
                if (parsed.length < 9) {
                    localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
                } else {
                    proposalsList = parsed;
                    localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
                }
            }
        } catch (e) {
            localStorage.setItem('proposalsList', JSON.stringify(proposalsList));
        }
    } else {
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
                        cardType: c.cardType || (defaultClaim ? defaultClaim.cardType : "CCCD"),
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
        if (actionType === 'payout' || actionType === 'pay') {
            payProposalDirect(prop.id);
        } else if (actionType === 'update') {
            updateProposalDirect(prop.id);
        } else if (actionType === 'forfeit' || actionType === 'treasury') {
            requestTreasuryForfeit(prop.id);
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

    // Default dates within 3 months
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const sFrom = document.getElementById('searchFromDate');
    const sTo = document.getElementById('searchToDate');
    const fDate = document.getElementById('formProposalDate');
    if (sFrom) sFrom.value = formatDate(threeMonthsAgo);
    if (sTo) sTo.value = formatDate(today);
    if (fDate) fDate.value = formatDate(today);

    // Populate table on load
    renderProposalsTable();
    updateBudgetStats();

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
        } else if (p.status === 'Sung quỹ nhà nước' || p.status === 'Đã sung quỹ') {
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

function getPaidAmount(item) {
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

    const eligible = proposalsList.filter(p => getTreasuryInfo(p).isEligible);

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
                        ${eligible.length} khoản Chờ chi trả đủ điều kiện xử lý sung quỹ, tổng số tiền ${eligibleAmt.toLocaleString('vi-VN')} VNĐ (Theo Điều 45 Luật TNBTCNN).
                    </div>
                </div>
            </div>
            <button class="btn btn-outline-primary" onclick="filterTreasuryEligible()" style="font-size:12.5px; padding:6px 12px;">
                <i class="fa-solid fa-filter"></i> Xem khoản cần xử lý
            </button>
        </div>
    `;
}

// Render dynamic content for Block 9: Theo dõi hạn nhận kinh phí / Sung quỹ
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
    const isSungQuy = (item.status === 'Sung quỹ nhà nước' || item.status === 'Đã sung quỹ');

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
        statusText = 'Đã sung quỹ nhà nước';
        badgeClass = 'badge badge-success';
        daysText = item.treasuryForfeitDate ? `Đã sung quỹ (${item.treasuryForfeitDate})` : 'Đã sung quỹ';
    } else if (!item.noticeReceivedDate) {
        statusText = 'Chưa gửi thông báo';
        badgeClass = 'badge badge-draft';
        daysText = '-';
    } else if (info.isEligible) {
        statusText = 'Đã quá hạn 3 năm (Đủ điều kiện sung quỹ)';
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
        badgeEl.innerText = isSungQuy ? 'Đã sung quỹ nhà nước' : (info.isEligible ? 'Đã quá hạn 3 năm' : (info.isWarning ? 'Sắp đến hạn' : (item.noticeReceivedDate ? 'Trong hạn 3 năm' : 'Chưa kích hoạt')));
    }
}

// Cột Hạn nhận / Sung quỹ trên Bảng MH01 chuẩn 5 trạng thái theo SRS Mục 4.3.3.2.1 dòng 95:
function renderTreasuryCell(item, info = getTreasuryInfo(item)) {
    const isSungQuy = (item.status === 'Sung quỹ nhà nước' || item.status === 'Đã sung quỹ');
    if (isSungQuy) {
        const forfeitDate = item.treasuryForfeitDate || item.date || '-';
        return `
            <div style="font-weight:700; color:#7c3aed;"><i class="fa-solid fa-building-columns"></i> Đã sung quỹ</div>
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
    if (!item.noticeReceivedDate || item.status === 'Chờ lập đề nghị' || item.status === 'Chờ duyệt' || item.status === 'Bị từ chối') {
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
        showToast('Không có khoản nào đủ điều kiện sung quỹ.', 'info');
        renderProposalsTable();
        return;
    }
    renderProposalsTable();
    showToast('Đang hiển thị các khoản đủ điều kiện sung quỹ.', 'info');
}

function openLinkedClaimDetail(ycbtCode) {
    const detailUrl = `quan_ly_boi_thuong.html?id=${encodeURIComponent(ycbtCode)}&from=kinh_phi&returnUrl=${encodeURIComponent('quan_ly_kinh_phi_boi_thuong.html')}`;
    const shellDetailUrl = `UC431_to_UC466/${detailUrl}`;
    const activeClaimUrl = 'UC431_to_UC466/quan_ly_boi_thuong.html';

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
        showToast('Khoản này chưa đủ điều kiện sung quỹ (chưa quá thời hạn 03 năm kể từ ngày nhận thông báo).', 'warning');
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
        title = 'Đã sung quỹ Nhà nước';
        color = '#15803d';
        icon = 'fa-circle-check';
    } else if (info.isEligible) {
        title = 'Đủ điều kiện lập đề nghị sung quỹ';
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
                <div style="color:var(--text-muted);">Số tiền sung quỹ</div>
                <div style="font-weight:800; color:${color};">${treasuryAmount.toLocaleString('vi-VN')} VNĐ</div>
            </div>
            <div>
                <div style="color:var(--text-muted);">Ngày sung quỹ</div>
                <div style="font-weight:700; color:#334155;">${item.treasuryForfeitDate || '-'}</div>
            </div>
        </div>
        <div style="font-size:12.5px; color:#475569; margin-top:10px;">
            <strong>Căn cứ:</strong> ${item.treasuryReason || `Quá hạn 3 năm kể từ ngày nhận thông báo (${item.noticeReceivedDate}), hạn nhận kinh phí ${info.deadlineText}.`}
            ${item.treasuryVoucherNo ? `<div style="margin-top:6px;"><strong>Chứng từ sung quỹ:</strong> ${item.treasuryVoucherNo}</div>` : ''}
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
        hint.innerText = 'Sau khi lưu ngày nhận thông báo, hệ thống sẽ bắt đầu tính hạn 3 năm để cảnh báo sung quỹ nếu khoản chi vẫn ở trạng thái Chờ chi trả.';
        hint.style.color = '#9a3412';
        return;
    }

    const daysLeft = diffDays(TREASURY_DEMO_TODAY, deadline);
    if (daysLeft < 0) {
        hint.innerText = `Đã quá hạn ${Math.abs(daysLeft)} ngày so với mốc 3 năm. Nếu hồ sơ vẫn Chờ chi trả, có thể thực hiện sung quỹ.`;
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
    const shouldShow = item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần' || item.status === 'Hoàn thành' || item.status === 'Sung quỹ nhà nước' || item.status === 'Đã sung quỹ' || !!item.noticeReceivedDate;
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
            // View mode with existing notice data: Show "Cập nhật thông báo"
            if (btnEdit) btnEdit.style.display = 'inline-flex';
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
    if (!item) return;
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
        showFieldError('noticeTrackingDate', 'Ngày nhận thông báo không được lớn hơn ngày hiện tại');
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
    showToast('Lưu thông tin thông báo nhận kinh phí thành công!', 'success');
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
        link.innerText = 'Chưa có tài liệu sung quỹ';
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
        showToast('Chỉ được sung quỹ khi hồ sơ Chờ chi trả đã quá hạn 3 năm kể từ ngày nhận thông báo.', 'warning');
        return;
    }

    // Modal title per MH04
    const modalTitleEl = document.getElementById('formProposalTitle');
    if (modalTitleEl) {
        modalTitleEl.innerHTML = `<i class="fa-solid fa-building-columns"></i> CẬP NHẬT SUNG QUỸ NHÀ NƯỚC: ${item.code}`;
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
        showToast('Khoản chi này không còn đủ điều kiện sung quỹ.', 'warning');
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
        showFieldError('treasuryForfeitAmount', `Số tiền sung quỹ phải bằng số tiền chưa chi ${info.unpaid.toLocaleString('vi-VN')} VNĐ`);
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

    const confirmTitle = 'Xác nhận hoàn thành thủ tục sung quỹ nhà nước';
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
                    <span style="color: #64748B;">Ngày sung quỹ:</span>
                    <strong style="color: #1E293B;">${forfeitDateText}</strong>
                </div>
                <div style="display: grid; grid-template-columns: 140px 1fr; gap: 6px;">
                    <span style="color: #64748B;">Số tiền sung quỹ:</span>
                    <strong style="color: #DC2626; font-size: 15px;">${amount.toLocaleString('vi-VN')} VNĐ</strong>
                </div>
            </div>
            <div style="color: #334155; margin-bottom: 8px;">
                Bạn có chắc chắn muốn xác nhận hoàn thành thủ tục nộp toàn bộ số tiền <strong style="color: #DC2626;">${amount.toLocaleString('vi-VN')} VNĐ</strong> vào ngân sách nhà nước không?
            </div>
            <div style="font-size: 12px; color: #B45309; background: #FFFBEB; border-left: 3px solid #F59E0B; padding: 8px 10px; border-radius: 4px;">
                <i class="fa-solid fa-triangle-exclamation"></i> <strong>Lưu ý:</strong> Sau khi xác nhận, đề xuất cấp kinh phí và Vụ việc bồi thường gốc liên kết sẽ chuyển sang trạng thái <strong>Sung quỹ nhà nước</strong> và không thể điều chỉnh hoặc hoàn tác.
            </div>
        </div>
    `;

    showConfirmModal(confirmMsg, () => {
        item.status = 'Sung quỹ nhà nước';
        item.treasuryForfeitDate = forfeitDateText;
        item.treasuryVoucherNo = voucherNo;
        item.treasuryAmount = amount;
        item.treasuryReason = reason;
        item.treasuryFile = normalizeFileList(treasuryAttachedFile);
        item.payoutAmountReal = Math.max(0, item.amount - amount);

        saveProposalsToLocal();
        updateBudgetStats();
        closeCreateProposalForm();
        showToast(`Cập nhật sung quỹ nhà nước thành công cho đề xuất ${item.code}!`, 'success');
    }, confirmTitle);
}

// RENDER DATA TABLE GRID
function renderProposalsTable() {
    const tbody = document.getElementById('proposalsTableBody');
    tbody.innerHTML = '';
    renderTreasuryWarningPanel();

    let filtered = [...proposalsList];

    const code = document.getElementById('searchProposalCode').value.trim().toLowerCase();
    const type = document.getElementById('searchProposalType').value;
    const ycbtCode = document.getElementById('searchYcbtCode').value.trim().toLowerCase();
    const status = document.getElementById('searchProposalStatus').value;

    const nyc = document.getElementById('searchNycName').value.trim().toLowerCase();
    const cb = document.getElementById('searchCbXuLy').value.trim().toLowerCase();

    const fromDateInput = document.getElementById('searchFromDate').value;
    const toDateInput = document.getElementById('searchToDate').value;

    if (code) filtered = filtered.filter(item => item.code.toLowerCase().includes(code));
    if (type) filtered = filtered.filter(item => item.type === type);
    if (ycbtCode) filtered = filtered.filter(item => item.ycbtCode.toLowerCase().includes(ycbtCode));
    if (status) {
        if (status === 'Sung quỹ nhà nước') {
            filtered = filtered.filter(item => item.status === 'Sung quỹ nhà nước' || item.status === 'Đã sung quỹ');
        } else {
            filtered = filtered.filter(item => item.status === status);
        }
    }
    if (showTreasuryEligibleOnly) filtered = filtered.filter(item => getTreasuryInfo(item).isEligible);
    if (nyc) filtered = filtered.filter(item => item.nycName.toLowerCase().includes(nyc));
    if (cb) filtered = filtered.filter(item => item.user.toLowerCase().includes(cb));

    const parseDateVi = (str) => {
        if (!str) return null;
        const parts = str.split('/');
        if (parts.length === 3) {
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return null;
    };

    const fromDateVal = parseDateVi(fromDateInput);
    const toDateVal = parseDateVi(toDateInput);

    if (fromDateVal) {
        filtered = filtered.filter(item => {
            const itemDate = parseDateVi(item.date);
            return itemDate && itemDate >= fromDateVal;
        });
    }
    if (toDateVal) {
        filtered = filtered.filter(item => {
            const itemDate = parseDateVi(item.date);
            return itemDate && itemDate <= toDateVal;
        });
    }

    const total = filtered.length;
    document.getElementById('totalCount').innerText = total;
    const maxPages = Math.ceil(total / pageSize) || 1;

    if (currentPage > maxPages) currentPage = maxPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, total);

    if (total === 0) {
        tbody.innerHTML = `<tr><td colspan="12" style="text-align:center; color:var(--text-muted); padding:30px;">Không tìm thấy đề xuất cấp phát nào phù hợp</td></tr>`;
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
        pendingCount = proposalsList.filter(p => p.status === 'Chờ lập đề nghị' || p.status === 'Bị từ chối' || p.status === 'Chờ chi trả').length;
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
                viewProposalDetail(item.id);
            }
        };

        let badgeClass = 'badge-info';
        if (item.status === 'Hoàn thành') badgeClass = 'badge-success';
        else if (item.status === 'Chờ duyệt') badgeClass = 'badge-pending';
        else if (item.status === 'Chờ chi trả') badgeClass = 'badge-warning';
        else if (item.status === 'Sung quỹ nhà nước' || item.status === 'Đã sung quỹ') badgeClass = 'badge-success';
        else if (item.status === 'Bị từ chối') badgeClass = 'badge-danger';
        else if (item.status === 'Chờ lập đề nghị') badgeClass = 'badge-info';
        const treasuryInfo = getTreasuryInfo(item);
        const treasuryHtml = renderTreasuryCell(item, treasuryInfo);

        let actionsHtml = '';

        if (isLeader) {
            let approveBtn = `<button class="icon-btn accept" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ phê duyệt đề xuất ở trạng thái Chờ duyệt"><i class="fa-solid fa-circle-check"></i></button>`;
            let rejectBtn = `<button class="icon-btn reject" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ từ chối đề xuất ở trạng thái Chờ duyệt"><i class="fa-solid fa-ban"></i></button>`;

            if (item.status === 'Chờ duyệt') {
                approveBtn = `<button class="icon-btn accept" title="Phê duyệt đề xuất" onclick="openApproveModal('${item.id}')"><i class="fa-solid fa-circle-check"></i></button>`;
                rejectBtn = `<button class="icon-btn reject" title="Từ chối phê duyệt" onclick="openRejectModal('${item.id}')"><i class="fa-solid fa-ban"></i></button>`;
            }
            actionsHtml = `${approveBtn} ${rejectBtn}`;
        } else {
            // Specialist role
            let fillBtn = `<button class="icon-btn edit" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ lập đề nghị cho đề xuất ở trạng thái Chờ lập đề nghị"><i class="fa-solid fa-file-signature"></i></button>`;
            let updateBtn = `<button class="icon-btn edit" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ cập nhật đề xuất ở trạng thái Bị từ chối"><i class="fa-solid fa-pen-to-square"></i></button>`;
            let payBtn = `<button class="icon-btn accept" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ thực hiện chi trả ở trạng thái Chờ chi trả"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
            let treasuryBtn = `<button class="icon-btn" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chưa đủ điều kiện sung quỹ"><i class="fa-solid fa-building-columns"></i></button>`;
            let deleteBtn = `<button class="icon-btn delete" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ xóa được tờ trình ở trạng thái Chờ lập đề nghị"><i class="fa-regular fa-trash-can"></i></button>`;

            if (item.status === 'Chờ lập đề nghị') {
                fillBtn = `<button class="icon-btn edit" title="Lập đề nghị kinh phí" onclick="fillProposalDirect('${item.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
                deleteBtn = `<button class="icon-btn delete" title="Xóa tờ trình nháp" onclick="event.stopPropagation(); deleteProposal('${item.id}')"><i class="fa-regular fa-trash-can"></i></button>`;
            } else if (item.status === 'Bị từ chối') {
                updateBtn = `<button class="icon-btn edit" title="Cập nhật đề nghị" onclick="updateProposalDirect('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
            } else if (item.status === 'Chờ chi trả') {
                payBtn = `<button class="icon-btn accept" title="Thực hiện chi trả" onclick="payProposalDirect('${item.id}')"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
            }
            if (treasuryInfo.isEligible) {
                treasuryBtn = `<button class="icon-btn reject" title="Sung quỹ Nhà nước" onclick="forfeitProposalDirect('${item.id}')"><i class="fa-solid fa-building-columns"></i></button>`;
            }
            actionsHtml = `${fillBtn} ${updateBtn} ${payBtn} ${treasuryBtn} ${deleteBtn}`;
        }

        const amtVal = typeof item.amount === 'number' ? item.amount : parseFloat(String(item.amount).replace(/\D/g, '')) || 0;
        const actionAlign = isLeader ? 'center' : 'flex-start';
        const displayStatus = item.status === 'Đã sung quỹ' ? 'Sung quỹ nhà nước' : item.status;

        tr.innerHTML = `
            <td style="text-align:center; vertical-align:middle;">${startIdx + idx + 1}</td>
            <td style="text-align:left; vertical-align:middle;"><strong>${item.code}</strong></td>
            <td style="font-weight: 500; font-size:12.5px; text-align:left; vertical-align:middle;">${item.type === 'Cấp tạm ứng' ? 'Đề nghị tạm ứng' : 'Đề nghị cấp kinh phí bồi thường'}</td>
            <td style="text-align:left; vertical-align:middle;"><a href="quan_ly_boi_thuong.html?id=${encodeURIComponent(item.ycbtCode)}&from=kinh_phi&returnUrl=${encodeURIComponent('quan_ly_kinh_phi_boi_thuong.html')}" onclick="event.stopPropagation(); openLinkedClaimDetail('${item.ycbtCode}'); return false;" style="font-weight:600; color:var(--secondary-color); text-decoration:none;">${item.ycbtCode}</a></td>
            <td style="text-align:left; vertical-align:middle;"><strong>${item.nycName}</strong></td>
            <td style="text-align:left; vertical-align:middle;">${item.nycRole || 'Người bị thiệt hại'}</td>
            <td style="text-align:left; font-weight:700; vertical-align:middle;">${amtVal.toLocaleString('vi-VN')}</td>
            <td style="text-align:left; vertical-align:middle;">${item.user}</td>
            <td style="text-align:left; vertical-align:middle;">${item.date}</td>
            <td style="text-align:left; vertical-align:middle;">${treasuryHtml}</td>
            <td style="text-align:left; vertical-align:middle;"><span class="badge ${badgeClass}">${displayStatus}</span></td>
            <td style="text-align:${isLeader ? 'center' : 'left'}; vertical-align:middle;">
                <div class="action-flex" style="display:flex; justify-content:${actionAlign}; gap:6px;">
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

    const firstPage = `<span class="page-item ${currentPage === 1 ? 'disabled' : ''}" onclick="goPage(1)" title="Đầu">&lt;&lt;</span>`;
    const prevPage = `<span class="page-item ${currentPage === 1 ? 'disabled' : ''}" onclick="prevPage()" title="Trước">&lt;</span>`;
    container.innerHTML += firstPage + prevPage;

    for (let i = 1; i <= maxPages; i++) {
        container.innerHTML += `<span class="page-item ${currentPage === i ? 'active' : ''}" onclick="goPage(${i})">${i}</span>`;
    }

    const nextPage = `<span class="page-item ${currentPage === maxPages ? 'disabled' : ''}" onclick="nextPage()" title="Sau">&gt;</span>`;
    const lastPage = `<span class="page-item ${currentPage === maxPages ? 'disabled' : ''}" onclick="goPage('last')" title="Cuối">&gt;&gt;</span>`;
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
    document.getElementById('searchProposalType').value = '';
    document.getElementById('searchYcbtCode').value = '';
    document.getElementById('searchProposalStatus').value = '';
    document.getElementById('searchNycName').value = '';
    document.getElementById('searchCbXuLy').value = '';

    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    document.getElementById('searchFromDate').value = formatDate(threeMonthsAgo);
    document.getElementById('searchToDate').value = formatDate(today);
    currentPage = 1;
    renderProposalsTable();
    showToast("Đã xóa bộ lọc tìm kiếm!", "info");
}

function triggerSearchProposals() {
    showTreasuryEligibleOnly = false;
    currentPage = 1;
    renderProposalsTable();
}

// DYNAMIC TYPE & CLAIMS LOAD IN FORM
function handleTypeChange(selectedType) {
    const claimSelector = document.getElementById('formClaimSelector');
    claimSelector.innerHTML = `<option value="">-- Chọn vụ việc bồi thường liên kết --</option>`;

    // Filter relevant claims based on type
    const targetStatus = selectedType === 'Cấp tạm ứng' ? 'Đang xác minh thiệt hại' : 'Chờ thực thi';
    const filteredClaims = mockClaims.filter(c => c.status === targetStatus);

    filteredClaims.forEach(c => {
        const amountText = c.status === 'Đang xác minh thiệt hại' ? `Đề xuất tạm ứng: ${c.suggestedAdvance.toLocaleString('vi-VN')} đ` : `Tổng bồi thường: ${c.amount.toLocaleString('vi-VN')} đ`;
        claimSelector.innerHTML += `<option value="${c.code}">${c.code} - ${c.nyc} (${amountText})</option>`;
    });

    // Clear selected details
    clearClaimDetails();

    // Dynamically update form title based on selection type
    const secTitle = document.getElementById('formProposalSectionTitle');
    if (secTitle) {
        if (selectedType === 'Cấp tạm ứng') {
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

    if (selectedType === 'Cấp tạm ứng') {
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
    radios[0].checked = true;

    document.getElementById('formNycPhone').value = '';
    document.getElementById('formNycEmail').value = '';
    document.getElementById('formNycCardType').value = 'CCCD';
    document.getElementById('formNycCardNo').value = '';
    document.getElementById('formNycCardDate').value = '';
    document.getElementById('formNycCardPlace').value = '';
    document.getElementById('formNycCountry').value = 'Việt Nam';
    document.getElementById('formNycCity').value = 'Hà Nội';
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
    document.getElementById('advRecMethod').value = '';
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
    document.getElementById('kpRecMethod').value = '';
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
    return selectedType === 'Cấp tạm ứng' ? 'Đang xác minh thiệt hại' : 'Chờ thực thi';
}

function getFundingClaimLookupRows() {
    const targetStatus = getFundingClaimTargetStatus();
    const selectedType = document.getElementById('formProposalType').value;
    return mockClaims
        .filter(claim => claim.status === targetStatus)
        .map(claim => {
            const amount = selectedType === 'Cấp tạm ứng' ? claim.suggestedAdvance : claim.amount;
            return {
                code: claim.code,
                caseName: claim.caseName || `Vụ việc yêu cầu bồi thường của ${claim.nyc || ''}`,
                requester: claim.nyc || '',
                agency: claim.agency || '',
                amount: amount || 0,
                status: claim.status
            };
        });
}

function openFundingClaimLookupModal(prefillCode = '') {
    const overlay = document.getElementById('fundingClaimLookupOverlay');
    if (!overlay) return;

    const codeInput = document.getElementById('fundingClaimSearchCode');
    const nameInput = document.getElementById('fundingClaimSearchName');
    const requesterInput = document.getElementById('fundingClaimSearchRequester');

    if (codeInput) codeInput.value = prefillCode || '';
    if (nameInput) nameInput.value = '';
    if (requesterInput) requesterInput.value = '';

    renderFundingClaimLookupResults();
    overlay.style.display = 'flex';
    overlay.classList.add('visible');
    setTimeout(() => (prefillCode && codeInput ? codeInput : nameInput)?.focus(), 60);
}

function closeFundingClaimLookupModal() {
    const overlay = document.getElementById('fundingClaimLookupOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    overlay.style.display = 'none';
}

function clearFundingClaimLookupFilters() {
    document.getElementById('fundingClaimSearchCode').value = '';
    document.getElementById('fundingClaimSearchName').value = '';
    document.getElementById('fundingClaimSearchRequester').value = '';
    renderFundingClaimLookupResults();
}

function renderFundingClaimLookupResults() {
    const tbody = document.getElementById('fundingClaimLookupResults');
    if (!tbody) return;

    const code = normalizeFundingLookupText(document.getElementById('fundingClaimSearchCode')?.value);
    const name = normalizeFundingLookupText(document.getElementById('fundingClaimSearchName')?.value);
    const requester = normalizeFundingLookupText(document.getElementById('fundingClaimSearchRequester')?.value);

    const rows = getFundingClaimLookupRows().filter(row =>
        (!code || normalizeFundingLookupText(row.code).includes(code)) &&
        (!name || normalizeFundingLookupText(row.caseName).includes(name)) &&
        (!requester || normalizeFundingLookupText(row.requester).includes(requester))
    );

    if (!rows.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; color: var(--text-muted); padding: 20px;">
                    Không tìm thấy vụ việc phù hợp
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = rows.map(row => `
        <tr>
            <td style="font-weight:700; color: var(--primary-light); white-space:nowrap;">${row.code}</td>
            <td>${row.caseName}</td>
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
    const claim = mockClaims.find(c => c.code === code);
    if (!claim) return;

    const claimSelector = document.getElementById('formClaimSelector');
    claimSelector.innerHTML = `<option value="${claim.code}">${claim.code} - ${claim.nyc}</option>`;
    claimSelector.value = claim.code;

    document.getElementById('formClaimSearchInput').value = claim.code;
    handleClaimSelected(claim.code);
    closeFundingClaimLookupModal();
    showToast(`Đã chọn vụ việc ${claim.code} và tự động điền dữ liệu liên quan!`, "success");
}

// Quick search by claim code
function searchClaimByCode() {
    const searchInputVal = document.getElementById('formClaimSearchInput').value.trim();
    if (!searchInputVal) {
        showToast("Vui lòng nhập Mã vụ việc hợp lệ!", "warning");
        return;
    }
    openFundingClaimLookupModal(searchInputVal);
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
            radios[1].checked = true;
        } else {
            radios[0].checked = true;
        }

        document.getElementById('formNycPhone').value = claim.phone;
        document.getElementById('formNycEmail').value = claim.email || "";
        document.getElementById('formNycCardType').value = claim.cardType || "CCCD";
        document.getElementById('formNycCardNo').value = claim.cardNo;
        document.getElementById('formNycCardDate').value = claim.cardDate;
        document.getElementById('formNycCardPlace').value = claim.cardPlace;
        document.getElementById('formNycCountry').value = claim.country || "Việt Nam";
        document.getElementById('formNycCity').value = claim.city || "Hà Nội";
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
            document.getElementById('advRecMethod').value = claim.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt';

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
            document.getElementById('kpRecMethod').value = claim.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt';

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
        const label = DAMAGE_LABELS[key] || key;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align:center; vertical-align:middle;">${idx}</td>
            <td style="font-weight:600; vertical-align:middle;">${label}</td>
            <td style="text-align:right; font-weight:700; background-color:#F8FAFC; vertical-align:middle; padding-right:15px;">${amount.toLocaleString('vi-VN')} VNĐ</td>
            <td style="vertical-align:middle; text-align:right;">
                <input type="text" class="form-control kp-approve-input" data-key="${key}" data-max="${amount}" data-label="${label}" value="${amount.toLocaleString('vi-VN')}" oninput="formatNumberInput(this); calculateKinhPhiApproveTotal();" style="font-weight:700; text-align:right; border-color:#F59E0B; background-color:#FFFDF5; max-width:180px; display:block; margin-left:auto; height:26px; padding:2px 6px; font-size:12.5px;">
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
            chu += "lẻ " + mangSo[donvi] + " ";
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

    let i = 3;
    while (i >= 0) {
        if (hang[i] > 0) {
            chu += docBlock3(hang[i], i < 3) + (i === 3 ? "tỷ " : i === 2 ? "triệu " : i === 1 ? "nghìn " : "");
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

function renderProposalAttachedDocs() {
    const tbody = document.getElementById('proposalAttachedDocsBody');
    tbody.innerHTML = '';

    // Check if the add row button is disabled/hidden to determine read-only mode
    const addRowBtn = document.querySelector('button[onclick="addProposalDocRow()"]');
    const isReadOnly = addRowBtn ? (addRowBtn.style.display === 'none' || addRowBtn.disabled) : false;

    if (proposalAttachedDocs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:15px;">Chưa có tài liệu đính kèm nào. Vui lòng bấm Thêm thành phần hồ sơ mới.</td></tr>`;
        return;
    }

    proposalAttachedDocs.forEach((doc, idx) => {
        const tr = document.createElement('tr');

        let fileCell = '';
        if (doc.file) {
            fileCell = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:#EF4444;"><i class="fa-solid fa-file-pdf"></i></span>
                    <strong>${doc.file}</strong>
                </div>
            `;
        } else {
            fileCell = `
                <div class="file-upload-container">
                    <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px; background-color: #2563EB; color: white; padding: 6px 12px; border-radius: 4px; font-weight: 500; font-size: 12px; height: 32px; line-height: 20px;">
                        <i class="fa-solid fa-cloud-arrow-up"></i> Chọn file
                        <input type="file" style="display: none;" onchange="uploadProposalAttachedDoc(${idx}, this)">
                    </label>
                </div>
            `;
        }

        let actionsCell = '';
        if (doc.file) {
            actionsCell = `
                <a href="javascript:void(0)" onclick="viewProposalAttachedDoc(${idx})" style="color:#2563EB; text-decoration:none; font-weight:500; font-size:12.5px; display:inline-flex; align-items:center; gap:4px;">Xem file</a>
            `;
            if (!isReadOnly) {
                actionsCell += `
                    <span style="color:#CBD5E1; margin: 0 6px;">|</span>
                    <a href="javascript:void(0)" onclick="removeProposalAttachedDoc(${idx})" style="color:#EF4444; text-decoration:none; font-weight:500; font-size:12.5px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-regular fa-trash-can"></i> Xóa</a>
                `;
            }
        } else {
            if (isReadOnly) {
                actionsCell = `
                    <span style="color:#94A3B8; font-weight:500; font-size:12.5px; opacity:0.5; cursor:not-allowed; display:inline-flex; align-items:center; gap:4px;">Xem file</span>
                `;
            } else {
                actionsCell = `
                    <span style="color:#94A3B8; font-weight:500; font-size:12.5px; opacity:0.5; cursor:not-allowed; display:inline-flex; align-items:center; gap:4px;">Xem file</span>
                    <span style="color:#CBD5E1; margin: 0 6px;">|</span>
                    <a href="javascript:void(0)" onclick="deleteProposalDocRow(${idx})" style="color:#EF4444; text-decoration:none; font-weight:500; font-size:12.5px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-regular fa-trash-can"></i> Xóa</a>
                `;
            }
        }

        tr.innerHTML = `
            <td style="text-align:center;">${idx + 1}</td>
            <td>
                <input type="text" class="form-control" id="attachedDocName_${idx}" value="${doc.name}" oninput="updateProposalDocName(${idx}, this.value)" placeholder="Nhập tên tài liệu..." style="height:34px;" ${isReadOnly ? 'disabled' : ''}>
            </td>
            <td>${fileCell}</td>
            <td style="text-align:center;">${actionsCell}</td>
        `;
        tbody.appendChild(tr);
    });
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
    document.getElementById('dashboardStats').style.display = 'none'; // Rule 1: Hide dashboard on form view

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
    document.getElementById('formProposalType').disabled = false;
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

    // Show footer buttons for writing (Hide save draft as requested)
    document.getElementById('btnSaveDraft').style.display = 'none';
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
    handlePayoutMethodChange('Chi trả qua chuyển khoản');

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
    document.getElementById('dashboardStats').style.display = 'grid'; // Restore dashboard
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

function saveProposal(statusStr) {
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
        showToast("Vui lòng chọn vụ việc bồi thường liên kết trước!", "error");
        return;
    }

    if (!cqCap) {
        showFieldError('formProposalCqCap', 'Đây là trường bắt buộc');
        return;
    }
    if (!notes) {
        showFieldError('formProposalNotes', 'Đây là trường bắt buộc');
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

        if (statusStr === 'Chờ duyệt') {
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
            if (statusStr === 'Chờ duyệt' && val > maxVal && !overCapField) {
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

    // Attached files check (if submitting, need at least 1 document uploaded)
    const validFiles = proposalAttachedDocs.filter(d => d.file !== null);
    if (statusStr === 'Chờ duyệt' && validFiles.length === 0) {
        showToast("Vui lòng đính kèm ít nhất 1 tài liệu/tờ trình gửi kèm!", "error");
        return;
    }

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
        showToast(`Cập nhật đề nghị ${proposalCode} thành công dưới dạng ${statusStr}!`, "success");
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
        document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-file-signature"></i> LẬP ĐỀ NGHỊ TẠM ỨNG KINH PHÍ BỒI THƯỜNG: ${item.code}`;
    }

    // Set type and disable it so it cannot be edited
    const typeSelect = document.getElementById('formProposalType');
    typeSelect.value = (item.type === 'Kinh phí bồi thường' || item.type === 'Cấp kinh phí bồi thường') ? 'Cấp kinh phí bồi thường' : 'Cấp tạm ứng';
    typeSelect.disabled = true;

    // Trigger type change to render correct dynamic tables
    handleTypeChange(typeSelect.value);

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
    if (typeSelect.value === 'Cấp tạm ứng') {
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

    // Custom buttons for Lập đề nghị: Hide save draft, show submit proposal
    document.getElementById('btnSaveDraft').style.display = 'none';
    document.getElementById('btnSubmitProposal').style.display = 'inline-flex';
    document.getElementById('btnSubmitProposal').innerHTML = `<i class="fa-solid fa-paper-plane"></i> Trình phê duyệt`;
    document.getElementById('btnCompletePayout').style.display = 'none';
    document.getElementById('btnLeaderReject').style.display = 'none';
    document.getElementById('btnLeaderApprove').style.display = 'none';

    // Clear and reset files to empty, ready to upload
    proposalAttachedDocs = [];
    renderProposalAttachedDocs();
}

// UPDATE PROPOSAL DIRECT FROM "BỊ TỪ CHỐI" STATUS
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
    const typeSelect = document.getElementById('formProposalType');
    typeSelect.value = (item.type === 'Kinh phí bồi thường' || item.type === 'Cấp kinh phí bồi thường') ? 'Cấp kinh phí bồi thường' : 'Cấp tạm ứng';
    typeSelect.disabled = true;
    handleTypeChange(typeSelect.value);

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
    if (typeSelect.value === 'Cấp tạm ứng') {
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
            badge.className = 'badge badge-danger';
            badge.innerText = 'Bị từ chối';
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

    // Custom buttons for edit mode: Hide save draft, show submit proposal
    document.getElementById('btnSaveDraft').style.display = 'none';
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

    // Hide standard save draft and submit proposal buttons during detailed viewing
    document.getElementById('btnSaveDraft').style.display = 'none';
    document.getElementById('btnSubmitProposal').style.display = 'none';

    document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-circle-info"></i> CHI TIẾT ĐỀ NGHỊ KINH PHÍ: ${item.code}`;
    const badge = document.getElementById('formProposalStatusBadge');
    if (badge) {
        let statusClass = 'badge-draft';
        if (item.status === 'Chờ duyệt' || item.status === 'Chờ phê duyệt') statusClass = 'badge-pending';
        else if (item.status === 'Đã duyệt' || item.status === 'Đã cấp kinh phí' || item.status === 'Hoàn thành' || item.status === 'Đã sung quỹ') statusClass = 'badge-success';
        else if (item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần') statusClass = 'badge-warning';
        else if (item.status === 'Từ chối' || item.status === 'Bị từ chối') statusClass = 'badge-danger';
        
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
    document.getElementById('formProposalType').value = (item.type === 'Đề nghị tạm ứng' || item.type === 'Cấp tạm ứng') ? 'Cấp tạm ứng' : 'Cấp kinh phí bồi thường';
    document.getElementById('formProposalType').disabled = true;

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
        radios[1].checked = true;
    } else {
        radios[0].checked = true;
    }

    document.getElementById('formNycPhone').value = claimDetails.phone;
    document.getElementById('formNycEmail').value = claimDetails.email || "";
    document.getElementById('formNycCardType').value = claimDetails.cardType || "CCCD";
    document.getElementById('formNycCardNo').value = claimDetails.cardNo;
    document.getElementById('formNycCardDate').value = claimDetails.cardDate;
    document.getElementById('formNycCardPlace').value = claimDetails.cardPlace;
    document.getElementById('formNycCountry').value = claimDetails.country || "Việt Nam";
    document.getElementById('formNycCity').value = claimDetails.city || "Hà Nội";
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
        document.getElementById('advRecMethod').value = claimDetails.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt';

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
        document.getElementById('kpRecMethod').value = claimDetails.advanceRecKenh === 'chuyen-khoan' ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt';

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

    // Reject notice banner (Khối Lý do bị từ chối theo SRS 4.3.3.2.7.2)
    const blockReject = document.getElementById('blockRejectNotice');
    if (item.status === 'Bị từ chối') {
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

    const isSungQuy = (item.status === 'Sung quỹ nhà nước' || item.status === 'Đã sung quỹ');
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

        const isCash = item.payoutMethod === 'Chi trả trực tiếp bằng tiền mặt' || item.payoutMethod === 'Tiền mặt';
        const radioTransfer = document.getElementById('payoutMethod_Transfer');
        const radioCash = document.getElementById('payoutMethod_Cash');
        if (isCash) {
            if (radioCash) { radioCash.checked = true; radioCash.disabled = true; }
            if (radioTransfer) { radioTransfer.checked = false; radioTransfer.disabled = true; }
            handlePayoutMethodChange('Chi trả trực tiếp bằng tiền mặt');
        } else {
            if (radioTransfer) { radioTransfer.checked = true; radioTransfer.disabled = true; }
            if (radioCash) { radioCash.checked = false; radioCash.disabled = true; }
            handlePayoutMethodChange('Chi trả qua chuyển khoản');
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
        document.getElementById('btnSaveDraft').style.display = 'none';
        document.getElementById('btnSubmitProposal').style.display = 'none';
        document.getElementById('btnLeaderReject').style.display = 'inline-flex';
        document.getElementById('btnLeaderApprove').style.display = 'inline-flex';
    } else {
        document.getElementById('btnLeaderReject').style.display = 'none';
        document.getElementById('btnLeaderApprove').style.display = 'none';

        // If it is in Read-only or Approved status, hide form actions too except cancel
        if (item.status === 'Hoàn thành' || item.status === 'Chờ chi trả' || isSungQuy || item.status === 'Bị từ chối' || isLeader) {
            document.getElementById('btnSaveDraft').style.display = 'none';
            document.getElementById('btnSubmitProposal').style.display = 'none';

            if (item.leaderOpinion || item.status === 'Chờ chi trả' || item.status === 'Hoàn thành' || isSungQuy) {
                if (b7) {
                    b7.style.display = 'block';
                    setAccordionState('block7_LeaderApproval', true);
                }
                document.getElementById('sectionLeaderApproval').style.display = 'block';
                const approvalBadge = document.getElementById('leaderApprovalBadge');
                if (approvalBadge) {
                    approvalBadge.className = item.status === 'Bị từ chối' ? 'badge badge-danger' : 'badge badge-success';
                    approvalBadge.innerText = item.status === 'Bị từ chối' ? 'Bị từ chối' : 'Đã phê duyệt';
                }
                const nameEl = document.getElementById('viewLeaderName');
                if (nameEl) nameEl.innerText = item.approvedLeader || 'Lãnh đạo cơ quan';
                const dateEl = document.getElementById('viewLeaderDate');
                if (dateEl) dateEl.innerText = item.approvedDate || (item.createdAt || '04/09/2026');
                const textEl = document.getElementById('viewLeaderOpinionText');
                if (textEl) {
                    textEl.innerText = item.leaderOpinion || 'Đồng ý phê duyệt tờ trình cấp kinh phí bồi thường theo quy định.';
                    textEl.style.borderLeftColor = item.status === 'Bị từ chối' ? 'var(--danger-color)' : 'var(--success-color)';
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
                        <div style="color: #334155;"><strong>Lý do từ chối:</strong> ${h.opinion}</div>
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
    if (isSpecialist) {
        if (item.status === 'Chờ lập đề nghị') {
            document.getElementById('btnViewActionFill').style.display = 'inline-flex';
        } else if (item.status === 'Bị từ chối') {
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
    if (decisionStatus === 'Bị từ chối') {
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
            item.status = 'Bị từ chối';
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
        const defaultMethod = (claimDetails.advanceRecKenh === 'tien-mat' || item.payoutMethod === 'Chi trả trực tiếp bằng tiền mặt' || item.payoutMethod === 'Tiền mặt')
            ? 'Chi trả trực tiếp bằng tiền mặt'
            : 'Chi trả qua chuyển khoản';

        if (defaultMethod === 'Chi trả trực tiếp bằng tiền mặt') {
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
        document.getElementById('btnSaveDraft').style.display = 'none';
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
    const payoutMethod = methodRadio ? methodRadio.value : 'Chi trả qua chuyển khoản';
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

    if (payoutMethod === 'Chi trả trực tiếp bằng tiền mặt' || payoutMethod === 'Tiền mặt') {
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
    const methodDetailHtml = (payoutMethod === 'Chi trả trực tiếp bằng tiền mặt' || payoutMethod === 'Tiền mặt')
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

        if (payoutMethod === 'Chi trả trực tiếp bằng tiền mặt' || payoutMethod === 'Tiền mặt') {
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
                    title: "Thực thi chi trả bồi thường",
                    date: payoutDate,
                    desc: `Hoàn thành chi trả 100% kinh phí bồi thường thực tế qua ${payoutMethod}. Số tiền: ${payoutAmountReal} VNĐ.`,
                    status: "completed"
                });

                if (!matchedClaim.restoreHonor) {
                    matchedClaim.status = 'Hoàn thành';
                }
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

// Export Excel mock
function exportExcelKinhPhi() {
    showToast("Đang kết xuất danh sách đề nghị kinh phí bồi thường ra file Excel...", "success");
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

// PAYOUT METHOD TOGGLING
function handlePayoutMethodChange(val) {
    const isCash = val === 'Tiền mặt' || val === 'Chi trả trực tiếp bằng tiền mặt';
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
