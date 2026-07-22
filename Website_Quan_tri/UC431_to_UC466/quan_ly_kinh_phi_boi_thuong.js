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
        status: "Chi trả một phần",
        source: "Ngân sách địa phương (Dự phòng)",
        cqCap: "Sở Tư pháp Hà Nội",
        notes: "Người yêu cầu mới nhận một phần kinh phí, số còn lại đang quá hạn 3 năm kể từ ngày nhận thông báo.",
        leaderOpinion: "Đồng ý cấp kinh phí bồi thường theo quyết định đã ban hành.",
        files: [{ name: "Tờ trình kinh phí Hoàng Văn H", file: "To_trinh_KPBT_H.pdf" }],
        approvedDamages: {
            taiSan: 50000000,
            thuNhap: 30000000,
            tinhThan: 80000000,
            chiPhiKhac: 20000000
        },
        payoutDate: "20/06/2026",
        payoutAmountReal: 60000000,
        payoutMethod: "Chuyển khoản qua ngân hàng",
        payoutRecName: "Hoàng Văn H",
        payoutRecAddress: "Phường Minh Khai, Bắc Từ Liêm, Hà Nội",
        payoutBankAccount: "9704000012345678",
        payoutBankName: "BIDV",
        payoutBankUser: "HOÀNG VĂN H",
        payoutFile: "Chung_tu_chi_tra_mot_phan_H.pdf",
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
        status: "Đã sung quỹ",
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
const TREASURY_DEMO_TODAY = new Date(2026, 6, 21);

// Sync claimsList and proposalsList from localStorage on DOMContentLoaded
function syncFromLocalStorage() {
    // Force reset if version is old to fetch updated files and statuses
    if (localStorage.getItem('proposals_version') !== 'v20') {
        localStorage.setItem('proposals_version', 'v20');
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

// Start initialization
document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('searchFromDate').value = formatDate(threeMonthsAgo);
    document.getElementById('searchToDate').value = formatDate(today);
    document.getElementById('formProposalDate').value = formatDate(today);

    // Populate table on load
    renderProposalsTable();
    updateBudgetStats();

    const urlParams = new URLSearchParams(window.location.search);
    const embed = urlParams.get('embed') === 'true';
    if (embed) {
        // Clear document body background & margins
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

        // Make form Selector Block borderless and zero-padded
        const selectorBlock = document.getElementById('formSelectorBlock');
        if (selectorBlock) {
            selectorBlock.style.backgroundColor = 'white';
            selectorBlock.style.border = 'none';
            selectorBlock.style.padding = '0';
            selectorBlock.style.marginBottom = '15px';
        }

        // Optimize inline form body for single scrolling container
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

    const viewCode = urlParams.get('viewCode');
    if (viewCode) {
        let prop = proposalsList.find(p => p.code === viewCode || p.ycbtCode === viewCode);
        if (!prop) {
            // Dynamically generate proposal if it doesn't exist to ensure smooth integration testing
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
            const actionType = urlParams.get('actionType');
            if (actionType === 'payout') {
                const formPanel = document.getElementById('inlineProposalFormPanel');
                if (formPanel) formPanel.style.display = 'flex';
                if (urlParams.get('embed')) {
                    const listPanel = document.getElementById('proposalListPanel');
                    if (listPanel) listPanel.style.display = 'none';
                }
                payProposalDirect(prop.id);
            } else {
                viewProposalDetail(prop.id);
            }
        }
    }

    // Bind keypress for quick claim code search
    document.getElementById('formClaimSearchInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchClaimByCode();
        }
    });
});

// UPDATE STATISTICAL CARDS DYNAMICALLY
function updateBudgetStats() {
    let totalCapReal = 0;
    let totalTamUngReal = 0;

    proposalsList.forEach(p => {
        if (p.status === 'Hoàn thành' || p.status === 'Chờ chi trả' || p.status === 'Chi trả một phần' || p.status === 'Đã sung quỹ') {
            if (p.type === 'Đề nghị tạm ứng' || p.type === 'Cấp tạm ứng') {
                totalTamUngReal += p.amount;
            } else {
                totalCapReal += p.amount;
            }
        }
    });

    document.getElementById('statCapPhat').innerText = `${totalCapReal.toLocaleString('vi-VN')} VNĐ`;
    document.getElementById('statTamUng').innerText = `${totalTamUngReal.toLocaleString('vi-VN')} VNĐ`;

    const budget = 50000000000;
    const remaining = budget - totalCapReal - totalTamUngReal;
    document.getElementById('statConDu').innerText = `${remaining.toLocaleString('vi-VN')} VNĐ`;
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
    return item.status === 'Hoàn thành' ? (item.payoutAmountReal || item.amount || 0) : (item.payoutAmountReal || 0);
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
    const isWaitingPayout = item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần';
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
                        ${eligible.length} khoản Chờ chi trả/Chi trả một phần đủ điều kiện xử lý, tổng số tiền chưa chi ${eligibleAmt.toLocaleString('vi-VN')} VNĐ.
                    </div>
                </div>
            </div>
            <button class="btn btn-outline-primary" onclick="filterTreasuryEligible()" style="font-size:12.5px; padding:6px 12px;">
                <i class="fa-solid fa-filter"></i> Xem khoản cần xử lý
            </button>
        </div>
    `;
}

function renderTreasuryCell(item, info = getTreasuryInfo(item)) {
    if (item.status === 'Đã sung quỹ') {
        return `
            <div style="font-weight:700; color:#15803d;">Đã sung quỹ</div>
            <div style="font-size:11.5px; color:#64748b;">${item.treasuryForfeitDate || '-'}</div>
        `;
    }
    if (!item.noticeReceivedDate) {
        return `<span style="font-size:12px; color:#94a3b8;">-</span>`;
    }

    if (info.isEligible) {
        return `
            <div style="font-weight:800; color:#b91c1c;">Quá hạn ${Math.abs(info.daysLeft)} ngày</div>
            <div style="font-size:11.5px; color:#64748b;">Hạn: ${info.deadlineText}</div>
            <div style="font-size:11.5px; color:#b91c1c; font-weight:700;">Chưa chi: ${info.unpaid.toLocaleString('vi-VN')}đ</div>
        `;
    }

    if (info.isWarning) {
        return `
            <div style="font-weight:800; color:#a16207;">Còn ${info.daysLeft} ngày</div>
            <div style="font-size:11.5px; color:#64748b;">Hạn: ${info.deadlineText}</div>
            <div style="font-size:11.5px; color:#a16207; font-weight:700;">Cần theo dõi</div>
        `;
    }

    return `
        <div style="font-weight:600; color:#334155;">${info.deadlineText || '-'}</div>
        <div style="font-size:11.5px; color:#64748b;">Ngày TB: ${item.noticeReceivedDate}</div>
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

function requestTreasuryForfeit(id) {
    const item = proposalsList.find(p => p.id === id);
    if (!item) return;
    const info = getTreasuryInfo(item);
    if (!info.isEligible) {
        showToast('Khoản này chưa đủ điều kiện sung quỹ.', 'warning');
        return;
    }

    viewProposalDetail(id);
    setTimeout(() => startTreasuryForfeitFromDetail(), 80);
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
                    <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;"><i class="fa-regular fa-eye"></i> Xem file</a>
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

function renderNoticeTrackingSection(item) {
    const section = document.getElementById('sectionNoticeTracking');
    if (!section) return;

    const shouldShow = item && (item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần' || item.status === 'Đã sung quỹ' || !!item.noticeReceivedDate);
    if (!shouldShow) {
        section.style.display = 'none';
        document.getElementById('btnSaveNoticeTracking').style.display = 'none';
        return;
    }

    const activeRole = document.getElementById('roleSelector').value;
    const canMaintainNotice = activeRole === 'chuyen-vien' && (item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần');
    const hasNotice = !!item.noticeReceivedDate || normalizeFileList(item.noticeProofFile).length > 0;
    const editing = section.dataset.editing === 'true' || !hasNotice;

    section.style.display = 'block';
    document.getElementById('noticeTrackingDate').value = item.noticeReceivedDate || '';
    document.getElementById('noticeTrackingDate').disabled = !(canMaintainNotice && editing);
    document.getElementById('noticeTrackingNote').value = item.noticeNote || '';
    document.getElementById('noticeTrackingNote').disabled = !(canMaintainNotice && editing);
    document.getElementById('btnNoticeTrackingUpload').style.display = canMaintainNotice && editing ? 'inline-flex' : 'none';
    document.getElementById('btnNoticeTrackingUpload').disabled = !(canMaintainNotice && editing);
    noticeTrackingAttachedFile = normalizeFileList(item.noticeProofFile);
    renderNoticeTrackingFile(!(canMaintainNotice && editing));
    previewNoticeTrackingDeadline();
    const saveBtn = document.getElementById('btnSaveNoticeTracking');
    saveBtn.style.display = canMaintainNotice ? 'inline-flex' : 'none';
    saveBtn.innerHTML = hasNotice && !editing
        ? '<i class="fa-solid fa-pen-to-square"></i> Cập nhật thông báo'
        : '<i class="fa-solid fa-bell"></i> Lưu thông báo';
}

function saveNoticeTracking() {
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (!item) return;
    const section = document.getElementById('sectionNoticeTracking');
    const hasNotice = !!item.noticeReceivedDate || normalizeFileList(item.noticeProofFile).length > 0;
    if (hasNotice && section.dataset.editing !== 'true') {
        section.dataset.editing = 'true';
        renderNoticeTrackingSection(item);
        return;
    }

    const noticeDateText = document.getElementById('noticeTrackingDate').value.trim();
    const noticeDate = parseDateViGlobal(noticeDateText);
    if (!noticeDateText) {
        showFieldError('noticeTrackingDate', 'Đây là trường bắt buộc');
        return;
    }
    if (!noticeDate) {
        showFieldError('noticeTrackingDate', 'Ngày không hợp lệ, vui lòng nhập dd/mm/yyyy');
        return;
    }
    if (normalizeFileList(noticeTrackingAttachedFile).length === 0) {
        const link = document.getElementById('noticeTrackingFileLink');
        link.style.color = 'var(--danger-color)';
        link.innerText = 'Vui lòng đính kèm tài liệu chứng minh đã thông báo';
        return;
    }

    item.noticeReceivedDate = noticeDateText;
    item.noticeProofFile = normalizeFileList(noticeTrackingAttachedFile);
    item.noticeNote = document.getElementById('noticeTrackingNote').value.trim();
    item.treasuryDeadline = formatDateViGlobal(addYearsToDate(noticeDate, 3));

    saveProposalsToLocal();
    section.dataset.editing = 'false';
    renderNoticeTrackingSection(item);
    renderProposalsTable();
    showToast(`Đã lưu thông tin thông báo nhận kinh phí cho ${item.code}.`, 'success');
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
                    <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;"><i class="fa-regular fa-eye"></i> Xem file</a>
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
        showToast('Chỉ được sung quỹ khi hồ sơ Chờ chi trả/Chi trả một phần đã quá hạn 3 năm kể từ ngày nhận thông báo.', 'warning');
        return;
    }

    const section = document.getElementById('sectionTreasuryForfeit');
    section.style.display = 'block';
    document.getElementById('treasuryVoucherNo').value = item.treasuryVoucherNo || `SQ-${item.code.replace(/\D/g, '')}`;
    document.getElementById('treasuryForfeitDate').value = item.treasuryForfeitDate || formatDateViGlobal(TREASURY_DEMO_TODAY);
    document.getElementById('treasuryForfeitAmount').value = (item.treasuryAmount || info.unpaid).toLocaleString('vi-VN');
    document.getElementById('treasuryForfeitReason').value = item.treasuryReason || `Người yêu cầu bồi thường không nhận kinh phí sau 3 năm kể từ ngày nhận thông báo (${item.noticeReceivedDate}), hạn nhận kinh phí ${info.deadlineText}.`;
    treasuryAttachedFile = normalizeFileList(item.treasuryFile);
    renderTreasuryFile();

    document.getElementById('btnViewActionPay').style.display = 'none';
    document.getElementById('btnSaveNoticeTracking').style.display = 'none';
    document.getElementById('btnViewActionForfeit').style.display = 'none';
    document.getElementById('btnCompleteTreasuryForfeit').style.display = 'inline-flex';
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function cancelTreasuryForfeit() {
    resetTreasuryForfeitForm();
    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (item) viewProposalDetail(item.id);
}

function completeTreasuryForfeit() {
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
        link.style.color = 'var(--danger-color)';
        link.innerText = 'Vui lòng chọn tài liệu sung quỹ';
        return;
    }

    item.status = 'Đã sung quỹ';
    item.treasuryForfeitDate = forfeitDateText;
    item.treasuryVoucherNo = voucherNo;
    item.treasuryAmount = amount;
    item.treasuryReason = reason;
    item.treasuryFile = normalizeFileList(treasuryAttachedFile);
    item.payoutAmountReal = Math.max(0, item.amount - amount);

    saveProposalsToLocal();
    updateBudgetStats();
    closeCreateProposalForm();
    showToast(`Đã hoàn thành sung quỹ cho ${item.code}.`, 'success');
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
    if (status === 'Chưa') {
        filtered = filtered.filter(item => item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần');
    } else if (status) {
        filtered = filtered.filter(item => item.status === status);
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
        pendingCount = proposalsList.filter(p => p.status === 'Chờ lập đề nghị' || p.status === 'Bị từ chối' || p.status === 'Chờ chi trả' || p.status === 'Chi trả một phần').length;
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
        else if (item.status === 'Chi trả một phần') badgeClass = 'badge-warning';
        else if (item.status === 'Đã sung quỹ') badgeClass = 'badge-success';
        else if (item.status === 'Bị từ chối') badgeClass = 'badge-danger';
        else if (item.status === 'Chờ lập đề nghị') badgeClass = 'badge-info';
        const treasuryInfo = getTreasuryInfo(item);
        const treasuryHtml = renderTreasuryCell(item, treasuryInfo);

        let actionsHtml = '';

        if (isLeader) {
            let approveBtn = `<button class="icon-btn accept" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ phê duyệt đề xuất ở trạng thái Chờ duyệt"><i class="fa-solid fa-circle-check"></i></button>`;
            let rejectBtn = `<button class="icon-btn reject" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ từ chối đề xuất ở trạng thái Chờ duyệt"><i class="fa-solid fa-ban"></i></button>`;

            if (item.status === 'Chờ duyệt') {
                approveBtn = `<button class="icon-btn accept" title="Phê duyệt đề xuất" onclick="approveProposalDirect('${item.id}', 'Chờ chi trả')"><i class="fa-solid fa-circle-check"></i></button>`;
                rejectBtn = `<button class="icon-btn reject" title="Từ chối phê duyệt" onclick="rejectProposalDirect('${item.id}')"><i class="fa-solid fa-ban"></i></button>`;
            }
            actionsHtml = `${approveBtn} ${rejectBtn}`;
        } else {
            // Specialist role
            let fillBtn = `<button class="icon-btn edit" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ lập đề nghị cho đề xuất ở trạng thái Chờ lập đề nghị"><i class="fa-solid fa-file-signature"></i></button>`;
            let updateBtn = `<button class="icon-btn edit" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ cập nhật đề xuất ở trạng thái Bị từ chối"><i class="fa-solid fa-pen-to-square"></i></button>`;
            let payBtn = `<button class="icon-btn accept" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ thực hiện chi trả ở trạng thái Chờ chi trả"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
            let treasuryBtn = `<button class="icon-btn" style="opacity:0.35; pointer-events:none; cursor:not-allowed;" title="Chưa đủ điều kiện sung quỹ"><i class="fa-solid fa-building-columns"></i></button>`;

            if (item.status === 'Chờ lập đề nghị') {
                fillBtn = `<button class="icon-btn edit" title="Lập đề nghị kinh phí" onclick="fillProposalDirect('${item.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
            } else if (item.status === 'Bị từ chối') {
                updateBtn = `<button class="icon-btn edit" title="Cập nhật đề nghị" onclick="updateProposalDirect('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
            } else if (item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần') {
                payBtn = `<button class="icon-btn accept" title="Thực hiện chi trả" onclick="payProposalDirect('${item.id}')"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
            }
            if (treasuryInfo.isEligible) {
                treasuryBtn = `<button class="icon-btn reject" title="Sung quỹ Nhà nước" onclick="requestTreasuryForfeit('${item.id}')"><i class="fa-solid fa-building-columns"></i></button>`;
            }
            actionsHtml = `${fillBtn} ${updateBtn} ${payBtn} ${treasuryBtn}`;
        }

        const amtVal = typeof item.amount === 'number' ? item.amount : parseFloat(String(item.amount).replace(/\D/g, '')) || 0;
        const actionAlign = isLeader ? 'center' : 'flex-start';

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
            <td style="text-align:left; vertical-align:middle;"><span class="badge ${badgeClass}">${item.status}</span></td>
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
    claimSelector.innerHTML = `<option value="">-- Chọn hồ sơ bồi thường liên kết --</option>`;

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

    // Show/hide wrappers
    if (selectedType === 'Cấp tạm ứng') {
        document.getElementById('wrapperAdvanceProposal').style.display = 'block';
        document.getElementById('wrapperKinhPhiProposal').style.display = 'none';
    } else {
        document.getElementById('wrapperAdvanceProposal').style.display = 'none';
        document.getElementById('wrapperKinhPhiProposal').style.display = 'block';
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
    document.getElementById('advClaimTinhThan').value = '';
    document.getElementById('advClaimTinhThanFileLink').innerHTML = '';
    document.getElementById('advClaimKhac').value = '';
    document.getElementById('advClaimKhacFileLink').innerHTML = '';
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

// Quick search by claim code
function searchClaimByCode() {
    const searchInputVal = document.getElementById('formClaimSearchInput').value.trim();
    if (!searchInputVal) {
        showToast("Vui lòng nhập mã hồ sơ cần tìm kiếm!", "warning");
        return;
    }

    const selectedType = document.getElementById('formProposalType').value;
    const targetStatus = selectedType === 'Cấp tạm ứng' ? 'Đang xác minh thiệt hại' : 'Chờ thực thi';

    const claim = mockClaims.find(c => c.code.toLowerCase() === searchInputVal.toLowerCase());

    if (!claim) {
        showToast("Không tìm thấy hồ sơ bồi thường nào có mã " + searchInputVal + "!", "error");
        return;
    }

    if (claim.status !== targetStatus) {
        showToast(`Hồ sơ ${claim.code} đang ở trạng thái "${claim.status}", không phù hợp với loại đề nghị "${selectedType}" (yêu cầu trạng thái "${targetStatus}").`, "error");
        return;
    }

    const claimSelector = document.getElementById('formClaimSelector');
    claimSelector.innerHTML = `<option value="${claim.code}">${claim.code} - ${claim.nyc}</option>`;
    claimSelector.value = claim.code;

    handleClaimSelected(claim.code);
    showToast(`Tìm thấy hồ sơ và liên kết thành công mã ${claim.code}!`, "success");
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
            document.getElementById('advClaimTinhThan').value = claim.advanceTinhThan.toLocaleString('vi-VN') + " VNĐ";
            if (claim.advanceTinhThanFile) {
                document.getElementById('advClaimTinhThanFileLink').innerHTML = `
                    <div style="display:flex; justify-content:center; gap:8px; font-weight:600; font-size:12px; white-space:nowrap;">
                        <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;"><i class="fa-regular fa-eye"></i> Xem</a>
                        <span style="color:#CBD5E1;">|</span>
                        <a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="clearClaimFile('TinhThan')"><i class="fa-regular fa-trash-can"></i> Xóa</a>
                    </div>
                `;
            } else {
                document.getElementById('advClaimTinhThanFileLink').innerHTML = '';
            }

            document.getElementById('advClaimKhac').value = claim.advanceKhac.toLocaleString('vi-VN') + " VNĐ";
            if (claim.advanceKhacFile) {
                document.getElementById('advClaimKhacFileLink').innerHTML = `
                    <div style="display:flex; justify-content:center; gap:8px; font-weight:600; font-size:12px; white-space:nowrap;">
                        <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;"><i class="fa-regular fa-eye"></i> Xem</a>
                        <span style="color:#CBD5E1;">|</span>
                        <a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="clearClaimFile('Khac')"><i class="fa-regular fa-trash-can"></i> Xóa</a>
                    </div>
                `;
            } else {
                document.getElementById('advClaimKhacFileLink').innerHTML = '';
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

        document.getElementById('formProposalNotes').value = `Tờ trình đề xuất duyệt cấp phát kinh phí chi trả bồi thường cho vụ việc của người yêu cầu ${claim.nyc}. Số hồ sơ thụ lý liên kết ${claim.code}.`;

        // Initialize proposalAttachedDocs with a default row
        proposalAttachedDocs = [
            { name: "Tờ trình đề nghị cấp kinh phí bồi thường chính thức", file: "To_trinh_de_nghi_chuyen_vien.pdf" }
        ];
        renderProposalAttachedDocs();

        // showToast("Đã tự động điền đầy đủ thông tin liên quan từ Hồ sơ bồi thường!", "success");
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
                <input type="text" class="form-control kp-approve-input" data-key="${key}" value="${amount.toLocaleString('vi-VN')}" oninput="formatNumberInput(this); calculateKinhPhiApproveTotal();" style="font-weight:700; text-align:right; border-color:#F59E0B; background-color:#FFFDF5; max-width:180px; display:block; margin-left:auto; height:26px; padding:2px 6px; font-size:12.5px;">
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
                <a href="javascript:void(0)" onclick="viewProposalAttachedDoc(${idx})" style="color:#2563EB; text-decoration:none; font-weight:500; font-size:12.5px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-regular fa-eye"></i> Xem file</a>
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
                    <span style="color:#94A3B8; font-weight:500; font-size:12.5px; opacity:0.5; cursor:not-allowed; display:inline-flex; align-items:center; gap:4px;"><i class="fa-regular fa-eye"></i> Xem file</span>
                `;
            } else {
                actionsCell = `
                    <span style="color:#94A3B8; font-weight:500; font-size:12.5px; opacity:0.5; cursor:not-allowed; display:inline-flex; align-items:center; gap:4px;"><i class="fa-regular fa-eye"></i> Xem file</span>
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
            document.getElementById('advClaimTinhThanFileLink').innerHTML = '<span style="color:var(--text-muted);">Đã xóa</span>';
            // showToast("Đã gỡ tài liệu đính kèm tinh thần!", "info");
        } else {
            document.getElementById('advClaimKhacFileLink').innerHTML = '<span style="color:var(--text-muted);">Đã xóa</span>';
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
    document.getElementById('contentListProposals').style.display = 'none';
    document.getElementById('dashboardStats').style.display = 'none'; // Rule 1: Hide dashboard on form view

    const panel = document.getElementById('inlineProposalFormPanel');
    panel.style.display = 'flex';

    const badge = document.getElementById('formProposalStatusBadge');
    if (badge) badge.style.display = 'none';

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
    document.getElementById('payoutReceiptNo').value = '';
    document.getElementById('payoutMethod').value = 'Chuyển khoản qua ngân hàng';
    const noticeInput = document.getElementById('payoutNoticeReceivedDate');
    if (noticeInput) noticeInput.value = '';
    const deadlineInput = document.getElementById('payoutTreasuryDeadline');
    if (deadlineInput) deadlineInput.value = '';
    const hint = document.getElementById('payoutTreasuryHint');
    if (hint) {
        hint.innerText = 'Hệ thống sẽ cảnh báo nếu sau 3 năm kể từ ngày nhận thông báo vẫn còn kinh phí chưa hoàn thành chi trả.';
        hint.style.color = '#9a3412';
    }
    const treasuryResultBox = document.getElementById('payoutTreasuryResultBox');
    if (treasuryResultBox) {
        treasuryResultBox.style.display = 'none';
        treasuryResultBox.innerHTML = '';
    }
    noticeProofAttachedFile = null;
    renderNoticeProofFile();
    noticeTrackingAttachedFile = [];
    document.getElementById('sectionNoticeTracking').style.display = 'none';
    document.getElementById('sectionNoticeTracking').dataset.editing = 'false';
    resetTreasuryForfeitForm();
    handlePayoutMethodChange('Chuyển khoản qua ngân hàng');

    // Populate selector dropdown based on default type
    handleTypeChange(document.getElementById('formProposalType').value);

    // Enable NYC editable fields (Always read-only per rule 2)
    setNycFieldsDisabled(true);
    setProposalFieldsDisabled(false);

    // Handle Cancel button display rules: Always show the bottom "Đóng" button
    const btnCancel = document.getElementById('btnCancelForm');
    btnCancel.style.display = 'inline-flex';
}

function closeCreateProposalForm() {
    document.getElementById('inlineProposalFormPanel').style.display = 'none';
    document.getElementById('contentListProposals').style.display = 'block';
    document.getElementById('dashboardStats').style.display = 'grid'; // Restore dashboard
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
        showToast("Vui lòng chọn hồ sơ bồi thường liên kết trước!", "error");
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
        const inputs = document.querySelectorAll('.kp-approve-input');
        inputs.forEach(input => {
            const key = input.dataset.key;
            const valStr = input.value.replace(/\D/g, '');
            const val = parseFloat(valStr) || 0;
            approvedDamages[key] = val;
            amount += val;
        });

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

    // Show Leader opinion section as read-only
    if (item.leaderOpinion) {
        document.getElementById('sectionLeaderApproval').style.display = 'block';
        document.getElementById('formLeaderOpinion').value = item.leaderOpinion;
        document.getElementById('formLeaderOpinion').disabled = true;
    } else {
        document.getElementById('sectionLeaderApproval').style.display = 'none';
    }

    // Custom buttons for edit mode: Hide save draft, show submit proposal
    document.getElementById('btnSaveDraft').style.display = 'none';
    document.getElementById('btnSubmitProposal').style.display = 'inline-flex';
    document.getElementById('btnSubmitProposal').innerHTML = `<i class="fa-solid fa-paper-plane"></i> Trình phê duyệt`;
    document.getElementById('btnCompletePayout').style.display = 'none';
    document.getElementById('btnLeaderReject').style.display = 'none';
    document.getElementById('btnLeaderApprove').style.display = 'none';

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
    if (item.type === 'Đề nghị tạm ứng' || item.type === 'Cấp tạm ứng') {
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

    // Adjust Cancel button
    document.getElementById('btnCancelForm').style.display = 'inline-flex';

    // Payout section handling
    const sectionPayout = document.getElementById('sectionPayoutReal');
    document.getElementById('sectionNoticeTracking').dataset.editing = 'false';
    renderNoticeTrackingSection(item);
    resetTreasuryForfeitForm();
    if (item.status === 'Đã sung quỹ') {
        const sectionTreasury = document.getElementById('sectionTreasuryForfeit');
        sectionTreasury.style.display = 'block';
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
    }

    const hasPayoutTracking = item.payoutDate || item.status === 'Chi trả một phần';
    if (hasPayoutTracking) {
        sectionPayout.style.display = 'block';
        document.getElementById('payoutDate').value = item.payoutDate || '';
        document.getElementById('payoutDate').disabled = true;

        document.getElementById('payoutAmountReal').value = (item.payoutAmountReal || 0).toLocaleString('vi-VN');
        document.getElementById('payoutAmountReal').disabled = true;

        document.getElementById('payoutMethod').value = item.payoutMethod || "Chuyển khoản qua ngân hàng";
        document.getElementById('payoutMethod').disabled = true;

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

        document.getElementById('payoutReceiptNo').value = item.payoutReceiptNo || "";
        document.getElementById('payoutReceiptNo').disabled = true;

        handlePayoutMethodChange(item.payoutMethod || "Chuyển khoản qua ngân hàng");

        // Hide payout select file button
        document.getElementById('btnPayoutUpload').style.display = 'none';
        const noticeInput = document.getElementById('payoutNoticeReceivedDate');
        if (noticeInput) {
            noticeInput.value = item.noticeReceivedDate || '';
            noticeInput.disabled = true;
        }
        const noticeUploadBtn = document.getElementById('btnNoticeUpload');
        if (noticeUploadBtn) {
            noticeUploadBtn.disabled = true;
            noticeUploadBtn.style.display = 'none';
        }
        noticeProofAttachedFile = item.noticeProofFile || null;
        renderNoticeProofFile(true);
        previewTreasuryDeadline();

        // Show payout file link as read-only
        document.getElementById('payoutFileLink').innerHTML = `
            ${item.payoutFile
                ? `<span style="font-weight:600; color:var(--text-color);">${item.payoutFile}</span>
                   <span style="margin-left: 10px; font-weight:600; font-size:12px;">
                       <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;"><i class="fa-regular fa-eye"></i> Xem file</a>
                   </span>`
                : `<span style="color:var(--text-muted); font-style:italic;">Chưa phát sinh chứng từ chi trả</span>`}
        `;
        renderPayoutTreasuryResult(item);
    } else {
        sectionPayout.style.display = 'none';
        document.getElementById('btnPayoutUpload').style.display = 'inline-flex';
        const treasuryResultBox = document.getElementById('payoutTreasuryResultBox');
        if (treasuryResultBox) {
            treasuryResultBox.style.display = 'none';
            treasuryResultBox.innerHTML = '';
        }
    }

    // Hide complete payout button when just viewing
    document.getElementById('btnCompletePayout').style.display = 'none';

    // IF LEADER and status is "Chờ duyệt", show Leader Panel
    // (activeRole/isLeader/isPending đã được khai báo ở đầu hàm viewProposalDetail, dùng lại tại đây)
    if (isLeader && isPending) {
        document.getElementById('sectionLeaderApproval').style.display = 'block';
        document.getElementById('formLeaderOpinion').value = '';
        document.getElementById('formLeaderOpinion').disabled = false;
        document.getElementById('btnSaveDraft').style.display = 'none';
        document.getElementById('btnSubmitProposal').style.display = 'none';
        document.getElementById('btnLeaderReject').style.display = 'inline-flex';
        document.getElementById('btnLeaderApprove').style.display = 'inline-flex';

        // Re-enable approved inputs for the leader to edit
        if (item.type === 'Đề nghị tạm ứng' || item.type === 'Cấp tạm ứng') {
            document.getElementById('advApproveTinhThan').disabled = false;
            document.getElementById('advApproveKhac').disabled = false;
        } else {
            document.querySelectorAll('.kp-approve-input').forEach(inp => inp.disabled = false);
        }
    } else {
        document.getElementById('sectionLeaderApproval').style.display = 'none';
        document.getElementById('btnLeaderReject').style.display = 'none';
        document.getElementById('btnLeaderApprove').style.display = 'none';

        // If it is in Read-only or Approved status, hide form actions too except cancel
        if (item.status === 'Hoàn thành' || item.status === 'Chờ chi trả' || item.status === 'Chi trả một phần' || item.status === 'Đã sung quỹ' || item.status === 'Bị từ chối' || isLeader) {
            document.getElementById('btnSaveDraft').style.display = 'none';
            document.getElementById('btnSubmitProposal').style.display = 'none';

            if (item.leaderOpinion) {
                document.getElementById('sectionLeaderApproval').style.display = 'block';
                document.getElementById('formLeaderOpinion').value = item.leaderOpinion;
                document.getElementById('formLeaderOpinion').disabled = true;
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
function submitLeaderApproval(decisionStatus) {
    const opinion = document.getElementById('formLeaderOpinion').value.trim();
    if (!opinion) {
        showFieldError('formLeaderOpinion', 'Ý kiến phê duyệt / lý do từ chối là bắt buộc!');
        return;
    }

    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (item) {
        if (decisionStatus === 'Đã duyệt' || decisionStatus === 'Chờ chi trả' || decisionStatus === 'Hoàn thành') {
            item.status = 'Chờ chi trả';
        } else {
            item.status = 'Bị từ chối';
        }
        item.leaderOpinion = opinion;

        showToast(`Tờ trình đề nghị ${item.code} đã được xử lý: ${item.status === 'Chờ chi trả' ? 'PHÊ DUYỆT (CHỜ CHI TRẢ)' : 'TỪ CHỐI'}!`, "success");
        saveProposalsToLocal();
        updateBudgetStats();
        closeCreateProposalForm();
    }
}

// CUSTOM REJECT MODAL ENGINE
let rejectProposalId = null;

function rejectProposalDirect(id) {
    const item = proposalsList.find(p => p.id === id);
    if (item) {
        rejectProposalId = id;
        document.getElementById('modalRejectOpinion').value = '';
        document.getElementById('modalRejectOpinion').classList.remove('is-invalid');
        const err = document.getElementById('modalRejectOpinion').parentNode.querySelector('.error-message');
        if (err) err.remove();

        const overlay = document.getElementById('customRejectOverlay');
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.classList.add('visible');
            document.getElementById('modalRejectOpinion').focus();
        }, 50);
    }
}

function closeRejectModal(confirm) {
    const overlay = document.getElementById('customRejectOverlay');
    if (confirm) {
        const opinion = document.getElementById('modalRejectOpinion').value.trim();
        if (!opinion) {
            showFieldError('modalRejectOpinion', 'Lý do từ chối không được để trống!');
            return;
        }

        const item = proposalsList.find(p => p.id === rejectProposalId);
        if (item) {
            item.status = 'Bị từ chối';
            item.leaderOpinion = opinion;
            showToast(`Đã từ chối phê duyệt tờ trình ${item.code}!`, "success");
            saveProposalsToLocal();
            updateBudgetStats();
            renderProposalsTable();
        }
    }

    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 200);
    rejectProposalId = null;
}

// LEADERS DIRECT QUICK APPROVAL FROM TABLE ROWS
function approveProposalDirect(id, decisionStatus) {
    const item = proposalsList.find(p => p.id === id);
    if (item) {
        item.status = decisionStatus; // 'Chờ chi trả'
        item.leaderOpinion = "Phê duyệt tờ trình cấp phát ngân sách bồi thường";

        showToast(`Đã duyệt tờ trình ${item.code}: Chuyển sang CHỜ CHI TRẢ!`, "success");
        saveProposalsToLocal();
        updateBudgetStats();
        renderProposalsTable();
    }
}



// DYNAMICS PAYOUT ACTION (Chờ chi trả -> Hoàn thành)
function payProposalDirect(id) {
    const item = proposalsList.find(p => p.id === id);
    if (item) {
        selectedProposalId = id;
        clearFieldErrors();

        // 1. Populate standard details (read-only)
        fillProposalDirect(id);

        // 2. Lock all normal inputs
        setProposalFieldsDisabled(true);
        setNycFieldsDisabled(true);

        // 3. Customize form title
        document.getElementById('formProposalTitle').innerHTML = `<i class="fa-solid fa-cash-register"></i> Cập nhật kết quả chi trả: ${item.code}`;

        // 4. Populate approved proposal amounts explicitly
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

        const noticeInput = document.getElementById('payoutNoticeReceivedDate');
        if (noticeInput) {
            noticeInput.disabled = false;
            noticeInput.value = item.noticeReceivedDate || '';
        }
        const noticeUploadBtn = document.getElementById('btnNoticeUpload');
        if (noticeUploadBtn) {
            noticeUploadBtn.disabled = false;
            noticeUploadBtn.style.display = 'inline-flex';
        }
        noticeProofAttachedFile = item.noticeProofFile || null;
        renderNoticeProofFile();
        previewTreasuryDeadline();
        renderPayoutTreasuryResult(item);

        const payoutMethodSelect = document.getElementById('payoutMethod');
        payoutMethodSelect.disabled = false;

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

        const payoutReceiptNoInput = document.getElementById('payoutReceiptNo');
        payoutReceiptNoInput.disabled = false;
        payoutReceiptNoInput.value = "";

        document.getElementById('btnPayoutUpload').disabled = false;
        document.getElementById('btnPayoutUpload').style.display = 'inline-flex';

        // Default to Bank transfer or check method from claim channel
        const defaultMethod = claimDetails.advanceRecKenh === 'tien-mat' ? 'Tiền mặt' : 'Chuyển khoản qua ngân hàng';
        payoutMethodSelect.value = defaultMethod;
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

        // Reload attached files as read-only (1-2 pre-filled files)
        proposalAttachedDocs = item.files ? [...item.files] : [];
        renderProposalAttachedDocs();

        // Scroll to bottom
        setTimeout(() => {
            const body = document.querySelector('.modal-body') || document.querySelector('.inline-form-container');
            if (body) body.scrollTop = body.scrollHeight;
        }, 100);
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
                <a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;"><i class="fa-regular fa-eye"></i> Xem file</a>
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

function triggerNoticeProofUpload() {
    document.getElementById('noticeProofFileInput').click();
}

function handleNoticeProofFileChange(input) {
    if (input.files && input.files[0]) {
        noticeProofAttachedFile = input.files[0].name;
        renderNoticeProofFile();
    }
}

function renderNoticeProofFile(readOnly = false) {
    const link = document.getElementById('noticeProofFileLink');
    if (!link) return;
    if (noticeProofAttachedFile) {
        link.innerHTML = `
            <span style="font-weight:600; color:var(--text-color);">${noticeProofAttachedFile}</span>
            ${readOnly
                ? `<span style="margin-left:8px;"><a href="#" target="_blank" style="color: var(--secondary-color); text-decoration:none;"><i class="fa-regular fa-eye"></i> Xem file</a></span>`
                : `<span style="margin-left:8px;"><a href="javascript:void(0)" style="color:var(--danger-color); text-decoration:none;" onclick="removeNoticeProofFile()"><i class="fa-regular fa-trash-can"></i> Xóa</a></span>`}
        `;
        link.style.color = 'var(--text-color)';
    } else {
        link.innerText = 'Chưa có tệp thông báo';
        link.style.color = 'var(--text-muted)';
    }
}

function removeNoticeProofFile() {
    noticeProofAttachedFile = null;
    document.getElementById('noticeProofFileInput').value = '';
    renderNoticeProofFile();
}

function previewTreasuryDeadline() {
    const input = document.getElementById('payoutNoticeReceivedDate');
    const deadlineInput = document.getElementById('payoutTreasuryDeadline');
    const hint = document.getElementById('payoutTreasuryHint');
    if (!input || !deadlineInput || !hint) return;

    const noticeDate = parseDateViGlobal(input.value.trim());
    const deadline = noticeDate ? addYearsToDate(noticeDate, 3) : null;
    deadlineInput.value = deadline ? formatDateViGlobal(deadline) : '';
    if (!deadline) {
        hint.innerText = 'Nhập ngày người yêu cầu nhận thông báo để hệ thống tự tính hạn 3 năm.';
        hint.style.color = '#9a3412';
        return;
    }
    const daysLeft = diffDays(TREASURY_DEMO_TODAY, deadline);
    if (daysLeft < 0) {
        hint.innerText = `Đã quá hạn ${Math.abs(daysLeft)} ngày so với mốc 3 năm. Nếu còn kinh phí chưa chi, hệ thống sẽ cảnh báo sung quỹ.`;
        hint.style.color = '#b91c1c';
    } else {
        hint.innerText = `Còn ${daysLeft} ngày đến mốc 3 năm kể từ ngày nhận thông báo.`;
        hint.style.color = daysLeft <= 180 ? '#a16207' : '#166534';
    }
}

function submitPayoutReal() {
    clearFieldErrors();

    const payoutDate = document.getElementById('payoutDate').value.trim();
    const payoutAmountReal = document.getElementById('payoutAmountReal').value.trim();
    const payoutMethod = document.getElementById('payoutMethod').value;
    const payoutRecName = document.getElementById('payoutRecName').value.trim();
    const payoutRecAddress = document.getElementById('payoutRecAddress').value.trim();
    const noticeReceivedDate = document.getElementById('payoutNoticeReceivedDate').value.trim();

    let hasError = false;
    let firstErrorField = null;

    const triggerError = (fieldId, msg) => {
        showFieldError(fieldId, msg);
        hasError = true;
        if (!firstErrorField) firstErrorField = fieldId;
    };

    if (!payoutDate) {
        triggerError('payoutDate', 'Đây là trường bắt buộc');
    }
    if (!payoutAmountReal) {
        triggerError('payoutAmountReal', 'Đây là trường bắt buộc');
    }
    if (!noticeReceivedDate) {
        triggerError('payoutNoticeReceivedDate', 'Đây là trường bắt buộc');
    } else if (!parseDateViGlobal(noticeReceivedDate)) {
        triggerError('payoutNoticeReceivedDate', 'Ngày không hợp lệ, vui lòng nhập dd/mm/yyyy');
    }
    if (!payoutRecName) {
        triggerError('payoutRecName', 'Đây là trường bắt buộc');
    }
    if (!payoutRecAddress) {
        triggerError('payoutRecAddress', 'Đây là trường bắt buộc');
    }

    if (payoutMethod === 'Tiền mặt') {
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
        fileLinkContainer.style.color = 'var(--danger-color)';
        fileLinkContainer.innerText = 'Vui lòng chọn chứng từ đính kèm (Đây là trường bắt buộc)';
        hasError = true;
    }

    if (!noticeProofAttachedFile) {
        const noticeLink = document.getElementById('noticeProofFileLink');
        noticeLink.style.color = 'var(--danger-color)';
        noticeLink.innerText = 'Vui lòng đính kèm tài liệu chứng minh đã thông báo';
        hasError = true;
    }

    if (hasError) {
        if (firstErrorField) {
            const el = document.getElementById(firstErrorField);
            if (el) el.focus();
        }
        return;
    }

    const item = proposalsList.find(p => p.id === selectedProposalId);
    if (item) {
        const payoutAmountNum = parseFloat(payoutAmountReal.replace(/\D/g, '')) || 0;
        const previousPaid = item.status === 'Chi trả một phần' ? (item.payoutAmountReal || 0) : 0;
        const totalPaidAfter = Math.min(item.amount, previousPaid + payoutAmountNum);
        item.status = totalPaidAfter >= item.amount ? 'Hoàn thành' : 'Chi trả một phần';
        item.payoutDate = payoutDate;
        item.payoutAmountReal = totalPaidAfter;
        item.payoutMethod = payoutMethod;
        item.payoutRecName = payoutRecName;
        item.payoutRecAddress = payoutRecAddress;
        item.noticeReceivedDate = noticeReceivedDate;
        item.noticeProofFile = noticeProofAttachedFile;
        const noticeDate = parseDateViGlobal(noticeReceivedDate);
        item.treasuryDeadline = noticeDate ? formatDateViGlobal(addYearsToDate(noticeDate, 3)) : '';
        if (payoutMethod === 'Tiền mặt') {
            item.payoutReceiptNo = document.getElementById('payoutReceiptNo').value.trim();
            item.payoutBankAccount = '';
            item.payoutBankUser = '';
        } else {
            item.payoutBankAccount = document.getElementById('payoutBankAccount').value.trim();
            item.payoutBankName = document.getElementById('payoutBankName') ? document.getElementById('payoutBankName').value.trim() : '';
            item.payoutBankUser = document.getElementById('payoutBankUser').value.trim();
            item.payoutReceiptNo = '';
        }
        item.payoutFile = payoutAttachedFile;

        const remainingAfterPay = getUnpaidAmount(item);
        showToast(
            item.status === 'Hoàn thành'
                ? `Đã hoàn thành chi trả thực tế cho đề nghị ${item.code}! Trạng thái chuyển sang HOÀN THÀNH.`
                : `Đã ghi nhận chi trả một phần cho ${item.code}. Tổng đã chi ${totalPaidAfter.toLocaleString('vi-VN')}đ, còn ${remainingAfterPay.toLocaleString('vi-VN')}đ tiếp tục theo dõi hạn 3 năm.`,
            "success"
        );
        saveProposalsToLocal();
        updateBudgetStats();
        closeCreateProposalForm();
        renderProposalsTable();

        // Sync back to claimsList in localStorage
        const localClaimsStr = localStorage.getItem('claimsList');
        if (localClaimsStr) {
            const localClaims = JSON.parse(localClaimsStr);
            const matchedClaim = localClaims.find(c => c.code === item.ycbtCode);
            if (matchedClaim) {
                matchedClaim.thucthiDate = payoutDate;
                matchedClaim.thucthiNote = `${item.status === 'Hoàn thành' ? 'Đã hoàn thành' : 'Đã ghi nhận một phần'} chi trả thực tế số tiền ${payoutAmountNum.toLocaleString('vi-VN')}đ qua ${payoutMethod}. Tổng đã chi: ${totalPaidAfter.toLocaleString('vi-VN')}đ. Người nhận: ${payoutRecName}. Địa chỉ: ${payoutRecAddress}. Ngày nhận thông báo: ${noticeReceivedDate}.`;
                
                // Add timeline entry
                if (!matchedClaim.timeline) matchedClaim.timeline = [];
                matchedClaim.timeline.push({
                    title: "Thực thi chi trả bồi thường",
                    date: payoutDate,
                    desc: `${item.status === 'Hoàn thành' ? 'Hoàn thành' : 'Chi trả một phần'} tiền bồi thường thực tế qua ${payoutMethod}. Số tiền: ${payoutAmountReal} VNĐ.`,
                    status: item.status === 'Hoàn thành' ? "completed" : "in-progress"
                });

                // Update status based on scenario
                if (item.status === 'Hoàn thành' && !matchedClaim.restoreHonor) {
                    matchedClaim.status = 'Hoàn thành';
                } else {
                    matchedClaim.moneyPaid = item.status === 'Hoàn thành';
                }

                localStorage.setItem('claimsList', JSON.stringify(localClaims));

                // Send sync event through local storage
                localStorage.setItem('claimPayoutCompleted_' + matchedClaim.code, JSON.stringify({
                    code: matchedClaim.code,
                    date: payoutDate,
                    moneyPaid: item.status === 'Hoàn thành',
                    status: matchedClaim.status
                }));
            }
        }
    }
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

function showConfirmModal(message, callback) {
    const overlay = document.getElementById('customConfirmOverlay');
    document.getElementById('customConfirmMessage').innerText = message;
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
    if (val === 'Tiền mặt') {
        document.getElementById('payoutBankFields').style.display = 'none';
        document.getElementById('payoutCashFields').style.display = 'block';
    } else {
        document.getElementById('payoutBankFields').style.display = 'grid';
        document.getElementById('payoutCashFields').style.display = 'none';
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
