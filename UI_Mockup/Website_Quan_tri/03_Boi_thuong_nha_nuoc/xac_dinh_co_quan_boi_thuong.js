// Dữ liệu giả lập ban đầu; được chuyển một lần vào kho hồ sơ luồng dùng chung (btnn_luong_xu_ly.js)
const LEGACY_SEED = [
    {
        id: "REQ1",
        code: "XD-2026-001",
        date: "01/10/2026",
        nycName: "Nguyễn Văn Nam",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "15/06/1985",
        nycDocType: "CCCD",
        nycDocNo: "001085002934",
        nycDocDate: "20/10/2021",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0912345678",
        nycEmail: "nam.nv@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hà Nội",
        nycAddressDetail: "Số 15 đường Trần Hưng Đạo, Hoàn Kiếm",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH",
        hanhVi: "Cưỡng chế tháo dỡ nhà khi chưa có quyết định hành chính có hiệu lực pháp luật của UBND quận Cầu Giấy.",
        hinhThucNhan: "Phương thức điện tử",
        vanBanCanCu: [{ name: "Bản án hành chính sơ thẩm số 12/2026/HC-ST ngày 20/03/2026 của TAND quận Cầu Giấy", file: "Ban_an_12_2026_HCST.pdf" }],
        status: "Chờ tiếp nhận",
        attachedFile: "Don_yeu_cau_cua_nam.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ2",
        code: "XD-2026-002",
        date: "02/07/2026",
        nycName: "Trần Thị Bích",
        nycRole: "Người thừa kế của người bị thiệt hại",
        nycGender: "Nữ",
        nycDob: "12/03/1990",
        nycDocType: "CCCD",
        nycDocNo: "002090012293",
        nycDocDate: "15/05/2022",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0904888999",
        nycEmail: "bich.tt@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Tỉnh Lâm Đồng",
        nycAddressDetail: "Số 88 đường Lạch Tray",
        hinhThucTiepNhan: "Qua dịch vụ bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ",
        hanhVi: "Bị tạm giam giữ trái pháp luật của Công an tỉnh Lâm Đồng làm suy sụp sức khỏe nghiêm trọng.",
        hinhThucNhan: "Hồ sơ giấy",
        vanBanCanCu: [{ name: "Quyết định đình chỉ điều tra bị can do hành vi không cấu thành tội phạm số 05/QĐ-ĐCĐT", file: "Quyet_dinh_dinh_chi_05.pdf" }],
        status: "Xác minh CQGQBT",
        attachedFile: "Ho_so_yeu_cau_xac_dinh_co_quan_2.pdf",
        procBasis: "Khoản 2 Điều 40 - Có sự tham gia của nhiều cơ quan cùng gây thiệt hại",
        procTargetAgency: "Cục Thi hành án dân sự tỉnh Lâm Đồng",
        procReason: "Tài sản thuộc diện thi hành cưỡng chế bởi cơ quan thi hành án và cơ quan địa chính địa phương cùng phối hợp thực hiện.",
        procDecisionFile: "Quyet_dinh_xac_minh_so_12.pdf",
        officers: [
            {
                name: "Đỗ Xuân Tài",
                position: "Điều tra viên trung cấp",
                agency: "Công an tỉnh Lâm Đồng",
                status: "Vẫn công tác tại đơn vị cũ",
                currentAgency: "Công an tỉnh Lâm Đồng",
                currentPosition: "Điều tra viên trung cấp"
            }
        ],
        claimCode: "-"
    },
    {
        id: "REQ3",
        code: "XD-2026-003",
        date: "30/06/2026",
        nycName: "Lê Hoàng Long",
        nycRole: "Cá nhân, pháp nhân được ủy quyền hợp pháp",
        nycGender: "Nam",
        nycDob: "04/09/1978",
        nycDocType: "Hộ chiếu",
        nycDocNo: "B8834923",
        nycDocDate: "10/01/2020",
        nycDocPlace: "Cục Quản lý xuất nhập cảnh",
        nycPhone: "0987112233",
        nycEmail: "long.lh@yahoo.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Đà Nẵng",
        nycAddressDetail: "Số 22 đường Bạch Đằng, Hải Châu",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ",
        hanhVi: "Phong tỏa tài khoản tiết kiệm ngân hàng trái pháp luật của Chi cục THADS trong thời gian giải quyết tranh chấp.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Bị từ chối",
        attachedFile: "Van_ban_uy_quyen_kem_don.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "Vụ việc đã được TAND thành phố Đà Nẵng thụ lý và giải quyết dứt điểm theo quy trình khiếu nại tố tụng, không thuộc phạm vi xác định cơ quan giải quyết bồi thường hành chính.",
        procDecisionFile: "Thong_bao_tu_choi_so_08.pdf",
        claimCode: "-"
    },
    {
        id: "REQ4",
        code: "XD-2026-004",
        date: "25/06/2026",
        nycName: "Phạm Minh Cường",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "22/11/1982",
        nycDocType: "CCCD",
        nycDocNo: "034082001923",
        nycDocDate: "18/08/2021",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0915334455",
        nycEmail: "cuong.pm@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hà Nội",
        nycAddressDetail: "Số 102 ngõ 42 Xuân Thủy, Cầu Giấy",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH",
        hanhVi: "Hủy bỏ giấy phép xây dựng trái luật của UBND quận Cầu Giấy làm chậm tiến độ thi công công trình tòa nhà.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Hoàn thành",
        attachedFile: "Quyet_dinh_dinh_chi_GPXD.pdf",
        procBasis: "Khoản 3 Điều 40 - Về việc phối hợp, chồng chéo thẩm quyền hành chính và tố tụng",
        procTargetAgency: "UBND quận Cầu Giấy, Thành phố Hà Nội",
        procReason: "Hành vi gây thiệt hại bắt nguồn từ Quyết định hành chính ban hành bởi UBND Quận Cầu Giấy, đã được Tòa án tuyên hủy tại bản án hành chính sơ thẩm.",
        procDecisionFile: "Quyet_dinh_chi_dinh_co_quan_so_04.pdf",
        claimCode: "BT-2026-081",
        transfer: {
            targetUnitId: 'UBND-HN',
            content: 'Chuyển hồ sơ yêu cầu bồi thường thiệt hại sang UBND quận Cầu Giấy để giải quyết theo thẩm quyền.',
            files: [{ name: 'CV_chuyen_ho_so_kem_quyet_dinh_04.pdf' }],
            at: '14:20 15/07/2026',
            by: 'canbonv'
        }
    },
    {
        id: "REQ5",
        code: "XD-2026-005",
        date: "03/07/2026",
        nycName: "Đỗ Thu Thảo",
        nycRole: "Người thừa kế của người bị thiệt hại",
        nycGender: "Nữ",
        nycDob: "30/08/1995",
        nycDocType: "CCCD",
        nycDocNo: "001095018349",
        nycDocDate: "28/12/2023",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0976556677",
        nycEmail: "thao.dt@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hồ Chí Minh",
        nycAddressDetail: "Số 44 đường Nguyễn Huệ, Quận 1",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ",
        hanhVi: "Kê biên tài sản nhà đất duy nhất vượt quá nghĩa vụ thi hành án của Chi cục THADS Quận 1.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Xác minh CQGQBT",
        attachedFile: "Don_luu_nhap_btnn.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ6",
        code: "XD-2026-006",
        date: "02/10/2026",
        nycName: "Hoàng Quốc Anh",
        nycRole: "Người đại diện theo pháp luật của người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "10/10/1980",
        nycDocType: "CCCD",
        nycDocNo: "001080002934",
        nycDocDate: "12/03/2022",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0904112233",
        nycEmail: "quocanh@fpt.vn",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hải Phòng",
        nycAddressDetail: "Số 12 đường Lê Lợi, Ngô Quyền",
        hinhThucTiepNhan: "Qua dịch vụ bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ",
        hanhVi: "Bắt buộc chấp hành án phạt lao động cải tạo khi đang hoãn thi hành án do bệnh lý nặng của trại giam.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Chờ tiếp nhận",
        attachedFile: "Ho_so_de_nghi_chuyen_giao.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ7",
        code: "XD-2026-007",
        date: "27/06/2026",
        nycName: "Vũ Ngọc Lan",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nữ",
        nycDob: "05/05/1988",
        nycDocType: "CCCD",
        nycDocNo: "001088019349",
        nycDocDate: "02/09/2021",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0945998877",
        nycEmail: "lanvn@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hà Nội",
        nycAddressDetail: "Số 203 Nguyễn Trãi, Thanh Xuân",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH",
        hanhVi: "Đóng cửa nhà xưởng kinh doanh sai thẩm quyền gây ngừng trệ và hư hỏng nguyên vật liệu.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Xác minh CQGQBT",
        attachedFile: "Bien_ban_dung_cua_nha_xuong.pdf",
        procBasis: "Khoản 2 Điều 40 - Có sự tham gia của nhiều cơ quan cùng gây thiệt hại",
        procTargetAgency: "Sở Tư pháp Thành phố Hà Nội",
        procReason: "Hành vi gây thiệt hại của Đội quản lý thị trường phối hợp UBND phường chưa phân định rõ tỷ lệ trách nhiệm trực tiếp.",
        procDecisionFile: "Bao_cao_xac_minh_so_05.pdf",
        claimCode: "-"
    },
    {
        id: "REQ8",
        code: "XD-2026-008",
        date: "24/06/2026",
        nycName: "Đặng Hữu Việt",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "15/12/1987",
        nycDocType: "CCCD",
        nycDocNo: "001087002934",
        nycDocDate: "10/11/2022",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0934556677",
        nycEmail: "viet.dh@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hà Nội",
        nycAddressDetail: "Phường Dịch Vọng, Cầu Giấy",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ",
        hanhVi: "Khởi tố và bắt tạm giam oan sai đối với cá nhân làm thiệt hại uy tín doanh nghiệp.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Hoàn thành",
        attachedFile: "Ban_an_hinh_su_tuyen_oan.pdf",
        procBasis: "Khoản 1 Điều 40 - Trường hợp cơ quan bị chia tách, sáp nhập, giải thể",
        procTargetAgency: "Sở Tư pháp Thành phố Hà Nội",
        procReason: "Cơ quan điều tra đã khởi tố ban đầu đã được giải thể, chuyển giao thẩm quyền pháp lý sang văn phòng cơ quan CSĐT cấp tỉnh.",
        procDecisionFile: "Quyet_dinh_chi_dinh_viet.pdf",
        claimCode: "BT-2026-003",
        transfer: {
            targetUnitId: 'STP-HN',
            content: 'Chuyển toàn bộ hồ sơ yêu cầu bồi thường và phục hồi danh dự sang Sở Tư pháp Thành phố Hà Nội thụ lý, giải quyết cả hai nội dung bồi thường thiệt hại và phục hồi danh dự theo quy định.',
            files: [{ name: 'CV_chuyen_ho_so_STP_HN.pdf' }, { name: 'Ban_an_hinh_su_tuyen_oan.pdf' }],
            at: '10:15 12/07/2026',
            by: 'canbonv'
        }
    },
    {
        id: "REQ9",
        code: "XD-2026-009",
        date: "03/07/2026",
        nycName: "Mai Phương Thảo",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nữ",
        nycDob: "08/04/1993",
        nycDocType: "CCCD",
        nycDocNo: "001093002934",
        nycDocDate: "15/07/2023",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0911223344",
        nycEmail: "thaomp@gmail.com",
        nycCountry: "Mỹ",
        nycTinhThanh: "",
        nycAddressDetail: "Flat 4, 12th Avenue, New York",
        hinhThucTiepNhan: "Qua dịch vụ bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ",
        hanhVi: "Kéo dài quá hạn thời gian xét xử tranh chấp đất đai kiều bào gây thiệt hại chi phí đi lại.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Xác minh CQGQBT",
        attachedFile: "",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ10",
        code: "XD-2026-010",
        date: "20/06/2026",
        nycName: "Ngô Minh Triết",
        nycRole: "Người đại diện theo pháp luật của người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "12/02/1975",
        nycDocType: "CCCD",
        nycDocNo: "001075001834",
        nycDocDate: "05/05/2021",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0905998877",
        nycEmail: "trietnm@yahoo.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Đà Nẵng",
        nycAddressDetail: "Quận Ngũ Hành Sơn, Đà Nẵng",
        hinhThucTiepNhan: "Qua dịch vụ bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH",
        hanhVi: "Quyết định xử phạt hành chính thu hồi đất dự án đầu tư sai luật của UBND thành phố.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Bị từ chối",
        attachedFile: "Don_de_nghi_kem_ban_an.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "Yêu cầu bồi thường liên quan trực tiếp đến quyết định hành chính thuộc thẩm quyền của Tòa án nhân dân cấp cao đang xem xét giám đốc thẩm, chưa có bản án hiệu lực.",
        procDecisionFile: "Thong_bao_tu_choi_triet.pdf",
        claimCode: "-"
    },
    {
        id: "REQ11",
        code: "XD-2026-011",
        date: "18/06/2026",
        nycName: "Bùi Anh Tuấn",
        nycRole: "Cá nhân, pháp nhân được ủy quyền hợp pháp",
        nycGender: "Nam",
        nycDob: "25/07/1980",
        nycDocType: "CCCD",
        nycDocNo: "001080019234",
        nycDocDate: "14/09/2022",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0989334455",
        nycEmail: "tuanba@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hải Phòng",
        nycAddressDetail: "Lê Chân, Hải Phòng",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ",
        hanhVi: "Kéo dài việc cưỡng chế thi hành bản án về nhà đất đã có hiệu lực pháp luật.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Chờ tiếp nhận",
        attachedFile: "Quyet_dinh_cuong_che_tha.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ12",
        code: "XD-2026-012",
        date: "15/06/2026",
        nycName: "Phan Thanh Bình",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "18/12/1984",
        nycDocType: "CCCD",
        nycDocNo: "001084001923",
        nycDocDate: "20/03/2021",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0903887766",
        nycEmail: "binhpt@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hồ Chí Minh",
        nycAddressDetail: "Quận 3, TP. Hồ Chí Minh",
        hinhThucTiepNhan: "Qua dịch vụ bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ",
        hanhVi: "Trì hoãn chấp hành án phạt tù làm ảnh hưởng nghiêm trọng đến tinh thần người thi hành án.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Xác minh CQGQBT",
        attachedFile: "Ho_so_yeu_cau_xac_dinh_binh.pdf",
        procBasis: "Khoản 2 Điều 40 - Có sự tham gia của nhiều cơ quan cùng gây thiệt hại",
        procTargetAgency: "UBND quận Hoàn Kiếm, Thành phố Hà Nội",
        procReason: "Về việc liên quan đến quyết định cưỡng chế thi hành án hình sự có sự phối hợp của cơ quan ban ngành liên cấp hành chính.",
        procDecisionFile: "Bao_cao_so_22_binh.pdf",
        claimCode: "-"
    },
    {
        id: "REQ13",
        code: "XD-2026-013",
        date: "04/10/2026",
        nycName: "Nguyễn Thị Mai Hoa",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nữ",
        nycDob: "10/05/1991",
        nycDocType: "CCCD",
        nycDocNo: "001091008899",
        nycDocDate: "12/06/2022",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0918776655",
        nycEmail: "maihoa.ng@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hà Nội",
        nycAddressDetail: "Số 25 Phố Huế, Hàng Bài, Hoàn Kiếm",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH",
        hanhVi: "Thu hồi giấy chứng nhận quyền sử dụng đất sai quy trình của Phòng TN&MT quận Hoàn Kiếm.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Chờ tiếp nhận",
        attachedFile: "Don_yeu_cau_mai_hoa.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ14",
        code: "XD-2026-014",
        date: "05/10/2026",
        nycName: "Trương Văn Dũng",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "20/09/1983",
        nycDocType: "CCCD",
        nycDocNo: "001083005544",
        nycDocDate: "15/01/2021",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0903112244",
        nycEmail: "dung.tv@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Đà Nẵng",
        nycAddressDetail: "Số 154 Nguyễn Văn Linh, Hải Châu",
        hinhThucTiepNhan: "Qua dịch vụ bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ",
        hanhVi: "Kê biên tài sản phục vụ điều tra sai đối tượng đương sự.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Chờ tiếp nhận",
        attachedFile: "Ho_so_ke_bien_dung.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ15",
        code: "XD-2026-015",
        date: "06/10/2026",
        nycName: "Hoàng Minh Tâm",
        nycRole: "Cá nhân, pháp nhân được ủy quyền hợp pháp",
        nycGender: "Nam",
        nycDob: "14/11/1986",
        nycDocType: "CCCD",
        nycDocNo: "001086007788",
        nycDocDate: "19/04/2023",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0934889900",
        nycEmail: "tam.hm@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hồ Chí Minh",
        nycAddressDetail: "Số 78 Cách Mạng Tháng 8, Quận 3",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ",
        hanhVi: "Chậm thi hành án quyết định bàn giao nhà ở đã có hiệu lực.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Chờ tiếp nhận",
        attachedFile: "Don_de_nghi_xdcq_tam.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ16",
        code: "XD-2026-016",
        date: "07/08/2026",
        nycName: "Đỗ Thị Kim Ngân",
        nycRole: "Người thừa kế của người bị thiệt hại",
        nycGender: "Nữ",
        nycDob: "28/02/1994",
        nycDocType: "CCCD",
        nycDocNo: "001094003322",
        nycDocDate: "05/08/2022",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0977665544",
        nycEmail: "kimngan.do@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hải Phòng",
        nycAddressDetail: "Số 92 Lạch Tray, Ngô Quyền",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH",
        hanhVi: "Xử phạt vi phạm trật tự xây dựng và đình chỉ hoạt động kinh doanh trái pháp luật.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Yêu cầu bổ sung",
        officer: "Nguyễn Văn Chuyên Viên",
        supplementReason: "Hồ sơ yêu cầu xác định cơ quan còn thiếu văn bản, tài liệu căn cứ chứng minh hành vi trái pháp luật của người thi hành công vụ theo quy định.",
        attachedFile: "Don_yeu_cau_ngan.pdf",
        procBasis: "",
        procTargetAgency: "",
        procReason: "",
        procDecisionFile: "",
        claimCode: "-"
    },
    {
        id: "REQ17",
        code: "XD-2026-017",
        date: "08/08/2026",
        nycName: "Lê Văn Hùng",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "18/09/1982",
        nycDocType: "CCCD",
        nycDocNo: "001082005678",
        nycDocDate: "10/04/2022",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0912889922",
        nycEmail: "hung.lv@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hà Nội",
        nycAddressDetail: "Số 68 Bà Triệu, Hàng Bài, Hoàn Kiếm",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH",
        hanhVi: "Xử phạt vi phạm trật tự xây dựng và tạm đình chỉ kinh doanh sai quy định.",
        hinhThucNhan: "Phương thức điện tử",
        vanBanCanCu: [{ name: "Quyết định xử phạt VPHC số 128/QĐ-XPHC ngày 10/02/2026 của UBND quận Hoàn Kiếm", file: "Quyet_dinh_xu_phat_128.pdf" }],
        status: "Bị trả lại",
        chuTri: "cv_so",
        returned: {
            by: "ld_so",
            unitId: "u_so",
            at: "09/08/2026 10:30",
            kind: BTNN_WF.KIND_KQXD,
            reason: "Hồ sơ chưa làm rõ căn cứ xác định cơ quan trực tiếp gây thiệt hại; thiếu văn bản tài liệu chứng minh thời điểm phát sinh hành vi trái pháp luật. Yêu cầu chuyên viên kiểm tra, thu thập thêm tài liệu và cập nhật lại."
        },
        attachedFile: "Don_yeu_cau_hung_lv.pdf",
        claimCode: "-"
    },
    {
        id: "REQ18",
        code: "XD-2026-018",
        date: "12/08/2026",
        nycName: "Ngô Quốc Tuấn",
        nycRole: "Người bị thiệt hại",
        nycGender: "Nam",
        nycDob: "15/05/1979",
        nycDocType: "CCCD",
        nycDocNo: "001079003456",
        nycDocDate: "05/03/2021",
        nycDocPlace: "Cục Cảnh sát QLHC về trật tự xã hội",
        nycPhone: "0983112233",
        nycEmail: "tuan.nq@gmail.com",
        nycCountry: "Việt Nam",
        nycTinhThanh: "Thành phố Hà Nội",
        nycAddressDetail: "Số 45 Thụy Khuê, Tây Hồ",
        hinhThucTiepNhan: "Trực tiếp",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ",
        hanhVi: "Kê biên tài sản và thông báo vi phạm sai đối tượng gây tổn hại nghiêm trọng uy tín danh dự cá nhân.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Hoàn thành",
        procBasis: "Khoản 2 Điều 40 - Trường hợp có sự phân định cơ quan trực tiếp gây thiệt hại",
        procTargetAgency: "Sở Tư pháp Thành phố Hà Nội",
        procReason: "Hồ sơ chỉ yêu cầu phục hồi danh dự cho người bị thiệt hại, thuộc thẩm quyền giải quyết của Sở Tư pháp.",
        procDecisionFile: "Quyet_dinh_chi_dinh_tuan.pdf",
        claimCode: "BT-2026-085",
        transfer: {
            targetUnitId: 'STP-HN',
            content: 'Chuyển hồ sơ yêu cầu phục hồi danh dự của ông Ngô Quốc Tuấn sang Sở Tư pháp Thành phố Hà Nội thụ lý, tổ chức trực tiếp xin lỗi và đăng báo cải chính theo quy định.',
            files: [{ name: 'CV_chuyen_ho_so_PHDD_STP_HN.pdf' }],
            at: '16:00 18/08/2026',
            by: 'canbonv'
        }
    }
];

// Dữ liệu giả lập hồ sơ Xác định CQGQBT do Sở Tư pháp xử lý (Sở Tư pháp Thành phố Hà Nội, luồng Xác định CQGQBT - Sở Tư pháp).
// UBND Thành phố Hà Nội chỉ xem (chỉ đọc) các hồ sơ này; UBND cấp tỉnh không tiếp nhận, xử lý Xác định CQGQBT.
const STP_SEED_FLAG = 'btnn_xd_stp_seed_v1';
// Mã hồ sơ mẫu cũ do UBND cấp tỉnh xử lý (không còn áp dụng): gỡ khỏi kho dùng chung khi nạp dữ liệu mẫu mới
const OLD_UBND_SEED_CODES = ['XD-2026-121', 'XD-2026-122', 'XD-2026-123', 'XD-2026-124'];
function buildStpSeed() {
    const h = (action, userId, at, note) => ({ at, userId, userName: BTNN_WF.userName(userId), action, note: note || '' });
    const base = (code, extra) => Object.assign({
        id: 'WF-' + code, code, module: 'XD', loaiYeuCau: BTNN_WF.REQUEST_TYPE_XD, source: 'Tiếp nhận',
        rootUnitId: 'STP-HN', currentUnitId: 'STP-HN-HCTP', nycRole: 'Người bị thiệt hại', nycGender: 'Nam', nycDocType: 'CCCD',
        nycDocDate: '10/05/2021', nycDocPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', nycCountry: 'Việt Nam',
        hinhThucTiepNhan: 'Trực tiếp', hinhThucNhan: 'Phương thức điện tử', vanBanCanCu: [],
        attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: `Don_yeu_cau_${code}.pdf` }],
        procBasis: '', procTargetAgency: '', procReason: '', procDecisionFile: '', claimCode: '-',
        approval: null
    }, extra);
    // Lượt phân công: Giám đốc Sở chuyển Phòng Hành chính tư pháp; Trưởng phòng phân công cán bộ xử lý
    const routes = (chuTri, day, lastState) => [
        { id: 'R1', type: 'unit', fromUnitId: 'STP-HN', fromUserId: 'gdso_hn', toUnitId: 'STP-HN-HCTP', note: 'Giao Phòng Hành chính tư pháp xem xét, xử lý.', at: `09:00 ${day}`, state: 'Đã xử lý' },
        { id: 'R2', type: 'officer', fromUnitId: 'STP-HN-HCTP', fromUserId: 'tp_hctp_hn', chuTri, note: '', at: `14:00 ${day}`, state: lastState }
    ];
    return [
        base('XD-2026-121', {
            maVuViec: 'VVBT-2026-121', date: '06/10/2026', receivedAt: '08:30 06/10/2026', receivedBy: 'Đỗ Văn Chung', createdBy: 'cv_hn1', chuTri: 'cv_hn1',
            status: 'Xác minh CQGQBT', nycName: 'Kiều Văn Thịnh', nycDob: '14/02/1979', nycDocNo: '001079006611', nycPhone: '0913221144', nycEmail: 'thinh.kv@gmail.com',
            nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00001 - Phường Ba Đình', nycAddressDetail: 'Số 12 Phan Đình Phùng',
            linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Thu hồi đất, cưỡng chế giải phóng mặt bằng khi chưa có quyết định thu hồi đất có hiệu lực của UBND cấp huyện.',
            procBasis: 'Khoản 1 Điều 35 Luật Trách nhiệm bồi thường của Nhà nước',
            procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội',
            procReason: 'Người thi hành công vụ gây thiệt hại thuộc UBND quận Cầu Giấy quản lý.',
            procDecisionFile: 'Quyet_dinh_xac_dinh_CQGQBT_XD-2026-121.pdf',
            routes: routes('cv_hn1', '06/10/2026', 'Đã xử lý'),
            history: [h('Tiếp nhận hồ sơ', 'cv_hn1', '08:30 06/10/2026', 'Chuyển lãnh đạo Sở Tư pháp Thành phố Hà Nội phân công xử lý.'), h('Chuyển đơn vị', 'gdso_hn', '09:00 06/10/2026', 'Chuyển Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hà Nội phân công.'), h('Phân công cán bộ', 'tp_hctp_hn', '14:00 06/10/2026', 'Chủ trì: Đỗ Văn Chung.'), h('Tiếp nhận hồ sơ', 'cv_hn1', '15:00 06/10/2026', 'Cán bộ xử lý tiếp nhận, nhập liệu hồ sơ. Hồ sơ chuyển [Xác minh CQGQBT].')]
        }),
        base('XD-2026-122', {
            maVuViec: 'VVBT-2026-122', date: '09/10/2026', receivedAt: '08:10 09/10/2026', receivedBy: 'Ngô Thị Lan', createdBy: 'cv_hn2', chuTri: 'cv_hn2',
            status: 'Chờ tiếp nhận', hinhThucTiepNhan: 'Qua dịch vụ bưu chính', nycName: 'Lục Thị Phương', nycGender: 'Nữ', nycDob: '21/07/1990', nycDocNo: '001190007722', nycPhone: '0936554433', nycEmail: '',
            nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00010 - Phường Thanh Xuân', nycAddressDetail: 'Số 7 Khương Đình',
            linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', hanhVi: 'Kê biên tài sản không thuộc sở hữu của người phải thi hành án.',
            routes: routes('cv_hn2', '09/10/2026', 'Chưa xử lý'),
            history: [h('Tiếp nhận hồ sơ', 'cv_hn2', '08:10 09/10/2026', 'Chuyển lãnh đạo Sở Tư pháp Thành phố Hà Nội phân công xử lý.'), h('Chuyển đơn vị', 'gdso_hn', '09:00 09/10/2026', 'Chuyển Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hà Nội phân công.'), h('Phân công cán bộ', 'tp_hctp_hn', '14:00 09/10/2026', 'Chủ trì: Ngô Thị Lan.')]
        })
    ];
}

// Dữ liệu giả lập hồ sơ có Loại người yêu cầu = Tổ chức (Bộ Tư pháp, cán bộ canbonv chủ trì).
// Nạp một lần theo cờ riêng; không ghi đè hồ sơ đã có cùng mã.
const ORG_SEED_FLAG = 'btnn_xd_org_seed_v1';
function buildOrgSeed() {
    const M = BTNN_WF.RECEIVE_METHODS;
    const common = {
        module: 'XD', loaiYeuCau: BTNN_WF.REQUEST_TYPE_XD, rootUnitId: 'BTP-01', currentUnitId: 'PLN-02',
        createdBy: 'canbonv', chuTri: 'canbonv', routes: [], approval: null, nycType: 'Tổ chức', nycCountry: 'Việt Nam',
        procBasis: '', procTargetAgency: '', procReason: '', procDecisionFile: '', claimCode: '-', vanBanCanCu: []
    };
    const h = (at, action, note) => ({ at, userId: 'canbonv', userName: BTNN_WF.userName('canbonv'), action, note });
    return [
        Object.assign({}, common, {
            id: 'WF-XD-2026-131', code: 'XD-2026-131', maVuViec: 'VVBT-2026-131', source: 'Tạo trực tiếp',
            date: '10/10/2026', receivedAt: '09:15 10/10/2026', receivedBy: 'Nguyễn Văn Cán Bộ', status: 'Xác minh CQGQBT',
            nycRole: 'Cá nhân, pháp nhân được ủy quyền hợp pháp',
            nycName: 'Công ty Luật TNHH Minh Phúc', nycOrgCode: '0108123456', nycOrgDocNo: '', nycOrgDocDate: '', nycOrgDocPlace: '',
            nycRepName: 'Trần Minh Phúc', nycRepPosition: 'Giám đốc', nycPhone: '0243 8256 789', nycEmail: 'lienhe@minhphuclaw.vn',
            nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00007 - Phường Cầu Giấy', nycAddressDetail: 'Tầng 6, Số 18 Trần Thái Tông',
            nbth: { name: 'Lương Văn Khải', dob: '02/03/1976', docType: 'CCCD', docNo: '001076004455', docDate: '11/05/2021', docPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', phone: '0912556677', email: '', country: 'Việt Nam', city: 'Thành phố Hà Nội', ward: '00010 - Phường Thanh Xuân', address: 'Số 5 ngõ 120 Khương Trung' },
            hinhThucTiepNhan: M.TRUC_TIEP, linhVuc: 'TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ',
            hanhVi: 'Áp dụng biện pháp khẩn cấp tạm thời phong tỏa tài sản không đúng đối tượng của TAND quận Cầu Giấy.',
            hinhThucNhan: 'Qua thư điện tử', diaChiNhanThongBao: 'lienhe@minhphuclaw.vn',
            attachedDocs: [{ name: 'Đơn yêu cầu và giấy ủy quyền', file: 'Don_yeu_cau_XD-2026-131.pdf' }],
            history: [h('09:15 10/10/2026', 'Tạo yêu cầu', 'Cán bộ tạo trực tiếp, đồng thời là cán bộ chủ trì.')]
        }),
        Object.assign({}, common, {
            id: 'WF-XD-2026-132', code: 'XD-2026-132', maVuViec: 'VVBT-2026-132', source: 'Tiếp nhận',
            date: '12/10/2026', receivedAt: '10:40 12/10/2026', receivedBy: 'Nguyễn Văn Cán Bộ', status: 'Chờ tiếp nhận',
            nycRole: 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại',
            nycName: 'Công ty Cổ phần Xây dựng Hồng Hà', nycOrgCode: '0105998877', nycOrgDocNo: '0105998877', nycOrgDocDate: '15/04/2019', nycOrgDocPlace: 'Sở Kế hoạch và Đầu tư Thành phố Hà Nội',
            nycRepName: 'Phạm Thị Hồng', nycRepPosition: 'Tổng Giám đốc', nycPhone: '0904667788', nycEmail: '',
            nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00004 - Phường Hoàn Kiếm', nycAddressDetail: 'Số 27 Lý Thái Tổ',
            nbthOrgName: 'Công ty TNHH Thương mại Hồng Hà', nbthOrgCode: '0101234567',
            hinhThucTiepNhan: M.MOT_CUA, linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH',
            hanhVi: 'Thu hồi giấy chứng nhận đăng ký doanh nghiệp trái pháp luật dẫn đến tổ chức phải chấm dứt hoạt động.',
            hinhThucNhan: 'Qua dịch vụ bưu chính', diaChiNhanThongBao: 'Số 27 Lý Thái Tổ, Phường Hoàn Kiếm, Thành phố Hà Nội',
            attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: 'Don_yeu_cau_XD-2026-132.pdf' }],
            history: [h('10:40 12/10/2026', 'Tiếp nhận hồ sơ', 'Tiếp nhận tại Bộ phận Một cửa; cán bộ chủ trì: Nguyễn Văn Cán Bộ.')]
        })
    ];
}
function migrateOrgSeed() {
    let done = null;
    try { done = localStorage.getItem(ORG_SEED_FLAG); } catch (e) { done = null; }
    if (done) return;
    const records = BTNN_WF.loadRecords();
    buildOrgSeed().forEach(rec => { if (!records.some(r => r.code === rec.code)) records.push(rec); });
    BTNN_WF.saveRecords(records);
    try { localStorage.setItem(ORG_SEED_FLAG, '1'); } catch (e) { /* bỏ qua */ }
}

// Dữ liệu giả lập theo luồng Xác định CQGQBT mới (Xác minh CQGQBT, Trình ký 03 Nội dung trình, Không thụ lý, Đã chuyển CQGQBT)
// cho cán bộ canbonv (Bộ Tư pháp) và cv_hn1 (Sở Tư pháp Thành phố Hà Nội). Nạp một lần theo cờ riêng; không ghi đè hồ sơ đã có cùng mã.
const FLOW_SEED_FLAG = 'btnn_xd_flow_seed_v7';
function buildFlowSeed() {
    const h = (action, userId, at, note, kind) => Object.assign({ at, userId, userName: BTNN_WF.userName(userId), action, note: note || '' }, kind ? { kind } : {});
    const btpRoutes = day => [
        { id: 'R1', type: 'unit', fromUnitId: 'BTP-01', fromUserId: 'oanhdh', toUnitId: 'CĐK-01', note: 'Giao Cục xem xét, xử lý.', at: `08:30 ${day}`, state: 'Đã xử lý' },
        { id: 'R2', type: 'unit', fromUnitId: 'CĐK-01', fromUserId: 'cuctruong', toUnitId: 'PLN-02', note: '', at: `10:00 ${day}`, state: 'Đã xử lý' },
        { id: 'R3', type: 'officer', fromUnitId: 'PLN-02', fromUserId: 'tpbt', chuTri: 'canbonv', note: '', at: `14:00 ${day}`, state: 'Đã xử lý' }
    ];
    const stpRoutes = (day, last) => [
        { id: 'R1', type: 'unit', fromUnitId: 'STP-HN', fromUserId: 'gdso_hn', toUnitId: 'STP-HN-HCTP', note: 'Giao Phòng Hành chính tư pháp xem xét, xử lý.', at: `09:00 ${day}`, state: 'Đã xử lý' },
        { id: 'R2', type: 'officer', fromUnitId: 'STP-HN-HCTP', fromUserId: 'tp_hctp_hn', chuTri: 'cv_hn1', note: '', at: `14:00 ${day}`, state: last || 'Đã xử lý' }
    ];
    const base = (code, btp, extra) => Object.assign({
        id: 'WF-' + code, code, maVuViec: 'VVBT-' + code.slice(3), module: 'XD', loaiYeuCau: BTNN_WF.REQUEST_TYPE_XD, source: 'Tiếp nhận',
        rootUnitId: btp ? 'BTP-01' : 'STP-HN', currentUnitId: btp ? 'PLN-02' : 'STP-HN-HCTP', chuTri: btp ? 'canbonv' : 'cv_hn1', createdBy: btp ? 'canbonv' : 'cv_hn1',
        receivedBy: btp ? 'Nguyễn Văn Cán Bộ' : 'Đỗ Văn Chung', nycType: 'Cá nhân', nycRole: 'Người bị thiệt hại', nycGender: 'Nam', nycDocType: 'CCCD',
        nycDocDate: '12/05/2021', nycDocPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', nycCountry: 'Việt Nam', nycTinhThanh: 'Thành phố Hà Nội',
        hinhThucTiepNhan: 'Trực tiếp', hinhThucNhan: 'Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID)', linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH',
        vanBanCanCu: [], attachedDocs: [{ name: 'Đơn yêu cầu xác định cơ quan giải quyết bồi thường', file: `Don_yeu_cau_${code}.pdf` }],
        procBasis: '', procTargetAgency: '', procTargetUnitId: '', procReason: '', procDecisionFile: '', claimCode: '-', approval: null
    }, extra);
    const kq = (unitId, reason) => ({ procBasis: 'Khoản 1 Điều 35 Luật Trách nhiệm bồi thường của Nhà nước', procTargetUnitId: unitId, procTargetAgency: BTNN_WF.unitName(unitId), procReason: reason });
    const appr = (kind, path, level, steps, assignees, at, signDoc, reason, content) => ({
        kind, content: content || 'Kính trình Lãnh đạo xem xét, ký duyệt.', files: signDoc ? [{ name: signDoc.file }] : [], draftDoc: null, signDoc, reason: reason || '',
        resultStatus: '', action: null, prevStatus: XD_ST.XAC_MINH, path, level, steps, assignees, submittedBy: path[0] === 'PLN-02' ? 'canbonv' : 'cv_hn1', submittedAt: at, pending: { since: at }
    });
    const online = file => ({ method: 'Ký số', file, sigBox: { x: 430, y: 820, w: 245, h: 110 } });
    const offline = file => ({ method: 'Ký ngoài', file });
    const BTP = ['PLN-02', 'CĐK-01'], STP = ['STP-HN-HCTP', 'STP-HN'];
    const pd = (unitId, userId, at) => ({ unitId, userId, action: 'Phê duyệt', note: '', at });
    const p = (name, dob, docNo, phone, addr, hanhVi) => ({ nycName: name, nycDob: dob, nycDocNo: docNo, nycPhone: phone, nycEmail: '', nycPhuongXa: '00004 - Phường Hoàn Kiếm', nycAddressDetail: addr, hanhVi });
    return [
        // ----- Cán bộ canbonv (Bộ Tư pháp) -----
        base('XD-2026-141', true, Object.assign(p('Đinh Quang Hải', '11/03/1981', '001081005511', '0912141141', 'Số 14 Hàng Gai', 'Tạm giữ phương tiện quá thời hạn quy định của Đội Cảnh sát giao thông.'), {
            date: '12/10/2026', receivedAt: '08:30 12/10/2026', status: XD_ST.CHO_DUYET, routes: btpRoutes('12/10/2026'),
            approval: appr(XD_KIND.YCBS, BTP, 0, [], ['tpbt'], '09:00 15/10/2026', online('Thong_bao_YCBS_XD-2026-141.pdf'), 'Đề nghị bổ sung bản sao quyết định tạm giữ phương tiện và biên bản trả lại phương tiện.'),
            history: [h('Tiếp nhận hồ sơ', 'canbonv', '15:00 12/10/2026', 'Hồ sơ chuyển [Xác minh CQGQBT].'), h('Trình phê duyệt', 'canbonv', '09:00 15/10/2026', 'Yêu cầu bổ sung. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.')]
        })),
        base('XD-2026-142', true, Object.assign(p('Lương Thị Hạnh', '22/06/1990', '001190007722', '0912141142', 'Số 9 Hàng Bạc', 'Yêu cầu bồi thường thiệt hại do hành vi đã hết thời hiệu yêu cầu bồi thường.'), {
            nycGender: 'Nữ', date: '11/10/2026', receivedAt: '09:10 11/10/2026', status: XD_ST.CHO_DUYET, routes: btpRoutes('11/10/2026'),
            approval: appr(XD_KIND.KTL, BTP, 1, [pd('PLN-02', 'tpbt', '10:00 16/10/2026')], ['tpbt', 'cuctruong'], '08:00 16/10/2026', online('Thong_bao_khong_thu_ly_XD-2026-142.pdf'), 'Thời hiệu yêu cầu bồi thường đã hết theo quy định.'),
            history: [h('Trình phê duyệt', 'canbonv', '08:00 16/10/2026', 'Không thụ lý. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.'), h('Phê duyệt', 'tpbt', '10:00 16/10/2026', 'Không thụ lý: phê duyệt cấp Phòng Quản lý nghiệp vụ về bồi thường nhà nước; chuyển Nguyễn Văn Cục Trưởng - Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.', XD_KIND.KTL)]
        })),
        base('XD-2026-143', true, Object.assign(p('Tạ Văn Khánh', '05/09/1977', '001077008833', '0912141143', 'Số 3 Lò Sũ', 'Thu hồi giấy phép kinh doanh không đúng thẩm quyền của UBND quận Hoàng Mai.'), kq('UBND-HM', 'Hành vi gây thiệt hại do người thi hành công vụ thuộc UBND quận Hoàng Mai thực hiện.'), {
            date: '10/10/2026', receivedAt: '10:00 10/10/2026', status: XD_ST.CHO_DUYET, routes: btpRoutes('10/10/2026'),
            approval: appr(XD_KIND.KQ, BTP, 1, [pd('PLN-02', 'tpbt', '14:00 17/10/2026')], ['tpbt', 'cuctruong'], '09:00 17/10/2026', online('Ket_qua_xac_dinh_CQGQBT_XD-2026-143.pdf')),
            history: [h('Trình phê duyệt', 'canbonv', '09:00 17/10/2026', 'Kết quả xác định CQGQBT. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.'), h('Phê duyệt', 'tpbt', '14:00 17/10/2026', 'Kết quả xác định CQGQBT: phê duyệt cấp Phòng Quản lý nghiệp vụ về bồi thường nhà nước; chuyển Nguyễn Văn Cục Trưởng - Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.', XD_KIND.KQ)]
        })),
        base('XD-2026-144', true, Object.assign(p('Hà Minh Nhật', '19/01/1986', '001086009944', '0912141144', 'Số 21 Hàng Đào', 'Kê biên tài sản không thuộc sở hữu của người phải thi hành án.'), {
            date: '09/10/2026', receivedAt: '08:45 09/10/2026', status: XD_ST.BI_TRA_LAI, routes: btpRoutes('09/10/2026'),
            approval: Object.assign(appr(XD_KIND.YCBS, BTP, 0, [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Từ chối phê duyệt', note: 'Nội dung yêu cầu bổ sung chưa nêu rõ tài liệu cần cung cấp.', at: '15:00 14/10/2026' }], ['tpbt'], '09:00 14/10/2026', online('Thong_bao_YCBS_XD-2026-144.pdf'), 'Đề nghị bổ sung tài liệu chứng minh quyền sở hữu tài sản.'), { pending: null }),
            returned: { reason: 'Nội dung yêu cầu bổ sung chưa nêu rõ tài liệu cần cung cấp.', by: 'tpbt', unitId: 'PLN-02', at: '15:00 14/10/2026', kind: XD_KIND.YCBS, prevStatus: XD_ST.XAC_MINH },
            history: [h('Tiếp nhận hồ sơ', 'canbonv', '08:45 09/10/2026', 'Tiếp nhận hồ sơ tại Bộ Tư pháp.'), h('Trình phê duyệt', 'canbonv', '09:00 14/10/2026', 'Nội dung trình: Yêu cầu bổ sung hồ sơ. Văn bản trình ký: Thong_bao_YCBS_XD-2026-144.pdf. Người nhận: Trần Văn Bồi Thường (Phòng Quản lý nghiệp vụ về BTNN).', XD_KIND.YCBS), h('Từ chối phê duyệt', 'tpbt', '15:00 14/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Nội dung yêu cầu bổ sung chưa nêu rõ tài liệu cần cung cấp.', XD_KIND.YCBS)]
        })),
        base('XD-2026-145', true, Object.assign(p('Nguyễn Thị Mai', '14/08/1985', '001185002233', '0912141145', 'Số 55 Hàng Gai', 'Yêu cầu bồi thường thiếu tài liệu chứng minh quyền yêu cầu bồi thường hợp pháp.'), {
            date: '04/10/2026', receivedAt: '08:30 04/10/2026', status: XD_ST.YCBS, routes: btpRoutes('04/10/2026'),
            supplementReason: 'Đề nghị bổ sung văn bản ủy quyền hợp pháp hoặc văn bản chứng minh tư cách thừa kế theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.',
            approval: Object.assign(appr(XD_KIND.YCBS, BTP, 1, [pd('PLN-02', 'tpbt', '11:00 07/10/2026'), { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Ký duyệt', note: 'Đồng ý ban hành thông báo yêu cầu bổ sung hồ sơ.', at: '16:00 07/10/2026' }], ['tpbt', 'cuctruong'], '08:30 07/10/2026', Object.assign(online('Thong_bao_YCBS_XD-2026-145.pdf'), { signedFile: 'Thong_bao_YCBS_XD-2026-145_da_ky.pdf', signedBy: 'cuctruong', signedAt: '16:00 07/10/2026' }), 'Đề nghị bổ sung văn bản ủy quyền hợp pháp hoặc văn bản chứng minh tư cách thừa kế theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.'), { pending: null, done: true }),
            history: [
                h('Tiếp nhận hồ sơ', 'canbonv', '08:30 04/10/2026', 'Tiếp nhận hồ sơ tại Bộ Tư pháp; cán bộ chủ trì tiếp nhận: Nguyễn Văn Cán Bộ.'),
                h('Trình phê duyệt', 'canbonv', '08:30 07/10/2026', 'Nội dung trình: Yêu cầu bổ sung hồ sơ. Cán bộ chủ trì: Nguyễn Văn Cán Bộ. Trình Lãnh đạo Phòng xem xét, ký duyệt. Văn bản trình ký: Thong_bao_YCBS_XD-2026-145.pdf.', XD_KIND.YCBS),
                h('Phê duyệt', 'tpbt', '11:00 07/10/2026', 'Phê duyệt cấp Phòng (Phòng Quản lý nghiệp vụ về bồi thường nhà nước); Ý kiến: Đề xuất bổ sung đúng quy định; chuyển Cục trưởng Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước ký duyệt.', XD_KIND.YCBS),
                h('Ký duyệt', 'cuctruong', '16:00 07/10/2026', 'Ký duyệt cấp cuối (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước): Đã ký số Thông báo yêu cầu bổ sung hồ sơ. Văn bản đã ký số: Thong_bao_YCBS_XD-2026-145_da_ky.pdf. Hồ sơ chuyển trạng thái [Yêu cầu bổ sung].', XD_KIND.YCBS)
            ]
        })),
        base('XD-2026-146', true, Object.assign(p('Trần Đình Trọng', '19/12/1973', '001073003344', '0912141146', 'Số 88 Lò Đúc', 'Yêu cầu bồi thường thuộc vụ việc Tòa án nhân dân đã thụ lý theo thủ tục tố tụng dân sự.'), {
            date: '02/10/2026', receivedAt: '09:15 02/10/2026', status: XD_ST.KTL, routes: btpRoutes('02/10/2026'),
            ktlReason: 'Yêu cầu bồi thường thuộc vụ việc Tòa án nhân dân có thẩm quyền đã thụ lý giải quyết theo thủ tục tố tụng dân sự (điểm b khoản 1 Điều 35 Luật TNBTCNN năm 2017).',
            approval: Object.assign(appr(XD_KIND.KTL, BTP, 1, [pd('PLN-02', 'tpbt', '10:00 05/10/2026'), { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Ký duyệt', note: 'Thống nhất lý do không thụ lý.', at: '15:30 05/10/2026' }], ['tpbt', 'cuctruong'], '08:00 05/10/2026', Object.assign(online('Thong_bao_khong_thu_ly_XD-2026-146.pdf'), { signedFile: 'Thong_bao_khong_thu_ly_XD-2026-146_da_ky.pdf', signedBy: 'cuctruong', signedAt: '15:30 05/10/2026' }), 'Yêu cầu bồi thường thuộc vụ việc Tòa án nhân dân có thẩm quyền đã thụ lý giải quyết theo thủ tục tố tụng dân sự (điểm b khoản 1 Điều 35 Luật TNBTCNN năm 2017).'), { pending: null, done: true }),
            history: [
                h('Tiếp nhận hồ sơ', 'canbonv', '09:15 02/10/2026', 'Tiếp nhận hồ sơ tại Bộ Tư pháp; cán bộ chủ trì: Nguyễn Văn Cán Bộ.'),
                h('Trình phê duyệt', 'canbonv', '08:00 05/10/2026', 'Nội dung trình: Không thụ lý hồ sơ. Cán bộ chủ trì: Nguyễn Văn Cán Bộ. Lý do: Vụ việc đã được Tòa án nhân dân thụ lý giải quyết. Văn bản trình ký: Thong_bao_khong_thu_ly_XD-2026-146.pdf. Trình Trần Văn Bồi Thường.', XD_KIND.KTL),
                h('Phê duyệt', 'tpbt', '10:00 05/10/2026', 'Phê duyệt cấp Phòng (Phòng Quản lý nghiệp vụ về bồi thường nhà nước); Ý kiến: Nhất trí căn cứ không thụ lý; chuyển Cục trưởng Nguyễn Văn Cục Trưởng ký duyệt.', XD_KIND.KTL),
                h('Ký duyệt', 'cuctruong', '15:30 05/10/2026', 'Ký duyệt cấp cuối (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước): Đã ký số Thông báo không thụ lý hồ sơ. Văn bản đã ký số: Thong_bao_khong_thu_ly_XD-2026-146_da_ky.pdf. Hồ sơ chuyển trạng thái [Không thụ lý].', XD_KIND.KTL)
            ]
        })),
        // Xác minh CQGQBT - trước đó từng bị trả lại (Lãnh đạo Phòng từ chối Kết quả xác định CQGQBT; cán bộ đã cập nhật lại kết quả)
        base('XD-2026-147', true, Object.assign(p('Phùng Văn Tài', '08/11/1984', '001084004747', '0912141147', 'Số 12 Hàng Mã', 'Thu hồi giấy chứng nhận quyền sử dụng đất trái pháp luật của UBND quận Hoàng Mai.'), kq('UBND-HM', 'Quyết định thu hồi do UBND quận Hoàng Mai ban hành.'), {
            date: '06/10/2026', receivedAt: '08:20 06/10/2026', status: XD_ST.XAC_MINH, routes: btpRoutes('06/10/2026'),
            approval: Object.assign(appr(XD_KIND.KQ, BTP, 0, [{ unitId: 'PLN-02', userId: 'tpbt', action: 'Từ chối phê duyệt', note: 'Đề nghị bổ sung căn cứ xác định cơ quan quản lý người thi hành công vụ.', at: '16:00 13/10/2026' }], ['tpbt'], '09:00 13/10/2026', online('Ket_qua_xac_dinh_CQGQBT_XD-2026-147.pdf')), { pending: null }),
            returned: null,
            history: [
                h('Tiếp nhận hồ sơ', 'canbonv', '09:00 06/10/2026', 'Hồ sơ chuyển [Xác minh CQGQBT].'),
                h('Trình phê duyệt', 'canbonv', '09:00 13/10/2026', 'Kết quả xác định CQGQBT. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.', XD_KIND.KQ),
                h('Từ chối phê duyệt', 'tpbt', '16:00 13/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Đề nghị bổ sung căn cứ xác định cơ quan quản lý người thi hành công vụ.', XD_KIND.KQ),
                h('Cập nhật kết quả', 'canbonv', '10:00 14/10/2026', 'Cập nhật lại Kết quả xác định CQGQBT. Hồ sơ chuyển [Xác minh CQGQBT].')
            ]
        })),
        // Xác minh CQGQBT - trước đó từng Yêu cầu bổ sung (Ký số, Cục trưởng ký duyệt cấp cuối) và đã tiếp nhận hồ sơ bổ sung
        base('XD-2026-148', true, Object.assign(p('Kiều Thị Lan', '25/02/1991', '001191004848', '0912141148', 'Số 6 Hàng Đường', 'Tạm giữ hàng hóa quá thời hạn của Đội Quản lý thị trường.'), {
            nycGender: 'Nữ', date: '01/10/2026', receivedAt: '08:00 01/10/2026', status: XD_ST.XAC_MINH, routes: btpRoutes('01/10/2026'),
            supplementReason: 'Đề nghị bổ sung biên bản tạm giữ hàng hóa và quyết định xử lý tang vật của Đội Quản lý thị trường.',
            approval: Object.assign(appr(XD_KIND.YCBS, BTP, 1, [pd('PLN-02', 'tpbt', '10:00 03/10/2026'), { unitId: 'CĐK-01', userId: 'cuctruong', action: 'Ký duyệt', note: '', at: '15:00 03/10/2026' }], ['tpbt', 'cuctruong'], '08:30 03/10/2026', Object.assign(online('Thong_bao_YCBS_XD-2026-148.pdf'), { signedFile: 'Thong_bao_YCBS_XD-2026-148_da_ky.pdf', signedBy: 'cuctruong', signedAt: '15:00 03/10/2026' }), 'Đề nghị bổ sung biên bản tạm giữ hàng hóa và quyết định xử lý tang vật của Đội Quản lý thị trường.'), { pending: null, done: true }),
            supplementHistory: [{ reason: 'Đề nghị bổ sung biên bản tạm giữ hàng hóa và quyết định xử lý tang vật của Đội Quản lý thị trường.', method: 'Ký số', file: 'Thong_bao_YCBS_XD-2026-148_da_ky.pdf', by: 'cuctruong', unitId: 'CĐK-01', at: '15:00 03/10/2026' }],
            history: [
                h('Tiếp nhận hồ sơ', 'canbonv', '08:30 01/10/2026', 'Hồ sơ chuyển [Xác minh CQGQBT].'),
                h('Trình phê duyệt', 'canbonv', '08:30 03/10/2026', 'Yêu cầu bổ sung. Trình Trần Văn Bồi Thường - Phòng Quản lý nghiệp vụ về bồi thường nhà nước.', XD_KIND.YCBS),
                h('Ký duyệt', 'tpbt', '10:00 03/10/2026', 'Yêu cầu bổ sung: ký duyệt cấp Phòng Quản lý nghiệp vụ về bồi thường nhà nước; chuyển Nguyễn Văn Cục Trưởng - Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.', XD_KIND.YCBS),
                h('Ký duyệt', 'cuctruong', '15:00 03/10/2026', 'Ký duyệt cấp cuối (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước) - đã ký số văn bản: Yêu cầu bổ sung. Văn bản đã ký số: Thong_bao_YCBS_XD-2026-148_da_ky.pdf. Hồ sơ chuyển [Yêu cầu bổ sung].', XD_KIND.YCBS),
                h('Tiếp nhận hồ sơ bổ sung', 'canbonv', '09:30 09/10/2026', 'Cán bộ xử lý tiếp nhận hồ sơ bổ sung, cập nhật hồ sơ. Hồ sơ chuyển [Xác minh CQGQBT].')
            ]
        })),
        // ----- Cán bộ cv_hn1 (Sở Tư pháp Thành phố Hà Nội) -----
        base('XD-2026-151', false, Object.assign(p('Nghiêm Thị Thu', '14/04/1992', '001192001551', '0936151151', 'Số 5 Phố Huế', 'Xử phạt vi phạm hành chính sai đối tượng của UBND phường.'), {
            nycGender: 'Nữ', date: '16/10/2026', receivedAt: '08:20 16/10/2026', status: XD_ST.CHO_TIEP_NHAN, routes: stpRoutes('16/10/2026', 'Chưa xử lý'),
            history: [h('Tiếp nhận hồ sơ', 'cv_hn2', '08:20 16/10/2026', 'Chuyển lãnh đạo Sở Tư pháp Thành phố Hà Nội phân công xử lý.'), h('Phân công cán bộ', 'tp_hctp_hn', '14:00 16/10/2026', 'Chủ trì: Đỗ Văn Chung.')]
        })),
        base('XD-2026-152', false, Object.assign(p('Khúc Văn Định', '02/02/1980', '001080001552', '0936151152', 'Số 18 Bà Triệu', 'Cưỡng chế tháo dỡ công trình khi chưa có quyết định có hiệu lực của UBND quận Cầu Giấy.'), kq('UBND-CG', 'Người thi hành công vụ gây thiệt hại thuộc UBND quận Cầu Giấy quản lý.'), {
            date: '13/10/2026', receivedAt: '09:00 13/10/2026', status: XD_ST.CHO_DUYET, routes: stpRoutes('13/10/2026'),
            approval: appr(XD_KIND.KQ, STP, 0, [], ['tp_hctp_hn'], '10:00 17/10/2026', online('Ket_qua_xac_dinh_CQGQBT_XD-2026-152.pdf')),
            history: [h('Tiếp nhận hồ sơ', 'cv_hn1', '15:00 13/10/2026', 'Hồ sơ chuyển [Xác minh CQGQBT].'), h('Trình phê duyệt', 'cv_hn1', '10:00 17/10/2026', 'Kết quả xác định CQGQBT. Trình Vũ Thị Thanh - Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hà Nội.')]
        })),
        base('XD-2026-153', false, Object.assign(p('Ông Văn Lộc', '27/07/1975', '001075001553', '0936151153', 'Số 30 Hàng Bông', 'Tạm giữ hành chính quá thời hạn quy định.'), {
            date: '12/10/2026', receivedAt: '10:30 12/10/2026', status: XD_ST.CHO_DUYET, routes: stpRoutes('12/10/2026'),
            approval: appr(XD_KIND.YCBS, STP, 1, [pd('STP-HN-HCTP', 'tp_hctp_hn', '11:00 16/10/2026')], ['tp_hctp_hn', 'gdso_hn'], '09:00 16/10/2026', online('Thong_bao_YCBS_XD-2026-153.pdf'), 'Đề nghị bổ sung quyết định tạm giữ và văn bản xác định hành vi trái pháp luật.'),
            history: [h('Trình phê duyệt', 'cv_hn1', '09:00 16/10/2026', 'Yêu cầu bổ sung.'), h('Phê duyệt', 'tp_hctp_hn', '11:00 16/10/2026', 'Yêu cầu bổ sung: phê duyệt cấp Phòng Hành chính tư pháp; chuyển Phạm Quang Huy - Sở Tư pháp Thành phố Hà Nội.', XD_KIND.YCBS)]
        })),
        base('XD-2026-154', false, Object.assign(p('Mẫn Thị Dung', '09/09/1988', '001188001554', '0936151154', 'Số 2 Tràng Thi', 'Yêu cầu bồi thường thuộc vụ việc Tòa án đã thụ lý theo thủ tục tố tụng dân sự.'), {
            nycGender: 'Nữ', date: '11/10/2026', receivedAt: '14:00 11/10/2026', status: XD_ST.CHO_DUYET, routes: stpRoutes('11/10/2026'),
            approval: appr(XD_KIND.KTL, STP, 0, [], ['tp_hctp_hn'], '16:00 17/10/2026', online('Thong_bao_khong_thu_ly_XD-2026-154.pdf'), 'Yêu cầu bồi thường đã được Tòa án có thẩm quyền thụ lý theo thủ tục tố tụng dân sự.'),
            history: [h('Trình phê duyệt', 'cv_hn1', '16:00 17/10/2026', 'Không thụ lý.')]
        })),
        base('XD-2026-155', false, Object.assign(p('Quản Văn Bình', '30/12/1983', '001083001555', '0936151155', 'Số 11 Lý Thường Kiệt', 'Thu hồi đất không đúng quy định của UBND quận Đống Đa.'), kq('UBND-DD', 'Quyết định thu hồi đất do UBND quận Đống Đa ban hành.'), {
            date: '08/10/2026', receivedAt: '08:00 08/10/2026', status: XD_ST.BI_TRA_LAI, routes: stpRoutes('08/10/2026'),
            approval: Object.assign(appr(XD_KIND.KQ, STP, 1, [pd('STP-HN-HCTP', 'tp_hctp_hn', '10:00 15/10/2026'), { unitId: 'STP-HN', userId: 'gdso_hn', action: 'Từ chối phê duyệt', note: 'Đề nghị làm rõ căn cứ xác định cơ quan quản lý người thi hành công vụ.', at: '15:00 15/10/2026' }], ['tp_hctp_hn', 'gdso_hn'], '08:30 15/10/2026', online('Ket_qua_xac_dinh_CQGQBT_XD-2026-155.pdf')), { pending: null }),
            returned: { reason: 'Đề nghị làm rõ căn cứ xác định cơ quan quản lý người thi hành công vụ.', by: 'gdso_hn', unitId: 'STP-HN', at: '15:00 15/10/2026', kind: XD_KIND.KQ, prevStatus: XD_ST.XAC_MINH },
            history: [h('Trình phê duyệt', 'cv_hn1', '08:30 15/10/2026', 'Kết quả xác định CQGQBT.'), h('Phê duyệt', 'tp_hctp_hn', '10:00 15/10/2026', '', XD_KIND.KQ), h('Từ chối phê duyệt', 'gdso_hn', '15:00 15/10/2026', 'Trả lại cán bộ chủ trì. Lý do: Đề nghị làm rõ căn cứ xác định cơ quan quản lý người thi hành công vụ.', XD_KIND.KQ)]
        })),
        base('XD-2026-156', false, Object.assign(p('Chu Văn Tiến', '15/05/1979', '001079001556', '0936151156', 'Số 7 Hai Bà Trưng', 'Đình chỉ hoạt động kinh doanh trái pháp luật.'), {
            date: '05/10/2026', receivedAt: '09:00 05/10/2026', status: XD_ST.YCBS, routes: stpRoutes('05/10/2026'),
            supplementReason: 'Đề nghị bổ sung quyết định đình chỉ hoạt động kinh doanh số 45/QĐ-UBND và các hóa đơn, chứng từ chứng minh thiệt hại thực tế phát sinh.',
            approval: Object.assign(appr(XD_KIND.YCBS, STP, 1, [pd('STP-HN-HCTP', 'tp_hctp_hn', '10:00 08/10/2026'), { unitId: 'STP-HN', userId: 'gdso_hn', action: 'Ký duyệt', note: 'Đồng ý ban hành thông báo yêu cầu bổ sung hồ sơ.', at: '14:00 08/10/2026' }], ['tp_hctp_hn', 'gdso_hn'], '08:00 08/10/2026', Object.assign(online('Thong_bao_YCBS_XD-2026-156.pdf'), { signedFile: 'Thong_bao_YCBS_XD-2026-156_da_ky.pdf', signedBy: 'gdso_hn', signedAt: '14:00 08/10/2026' }), 'Đề nghị bổ sung quyết định đình chỉ hoạt động kinh doanh số 45/QĐ-UBND và các hóa đơn, chứng từ chứng minh thiệt hại thực tế phát sinh.'), { pending: null, done: true }),
            history: [
                h('Tiếp nhận hồ sơ', 'cv_hn1', '09:00 05/10/2026', 'Tiếp nhận hồ sơ tại Bộ phận Một cửa; cán bộ chủ trì: Đỗ Văn Chung; chuyển bước Xác minh cơ quan giải quyết bồi thường.'),
                h('Trình phê duyệt', 'cv_hn1', '08:00 08/10/2026', 'Nội dung trình: Yêu cầu bổ sung hồ sơ. Cán bộ trình: Đỗ Văn Chung. Trình Lãnh đạo Phòng Hành chính tư pháp xem xét, phê duyệt. Văn bản trình ký: Thong_bao_YCBS_XD-2026-156.pdf.', XD_KIND.YCBS),
                h('Phê duyệt', 'tp_hctp_hn', '10:00 08/10/2026', 'Phê duyệt cấp Phòng (Phòng Hành chính tư pháp); Ý kiến: Đồng ý với nội dung yêu cầu bổ sung; chuyển Giám đốc Sở Tư pháp Thành phố Hà Nội (Phạm Quang Huy) ký duyệt.', XD_KIND.YCBS),
                h('Ký duyệt', 'gdso_hn', '14:00 08/10/2026', 'Ký duyệt cấp cuối (Sở Tư pháp Thành phố Hà Nội): Đã ký số Thông báo yêu cầu bổ sung hồ sơ. Văn bản ký số: Thong_bao_YCBS_XD-2026-156_da_ky.pdf. Hồ sơ chuyển trạng thái [Yêu cầu bổ sung].', XD_KIND.YCBS)
            ]
        })),
        base('XD-2026-157', false, Object.assign(p('Lã Thị Ngân', '03/03/1994', '001194001557', '0936151157', 'Số 40 Hàng Than', 'Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước.'), {
            nycGender: 'Nữ', date: '02/10/2026', receivedAt: '10:00 02/10/2026', status: XD_ST.KTL, routes: stpRoutes('02/10/2026'),
            ktlReason: 'Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước theo quy định tại Điều 17, 18, 19 Luật TNBTCNN năm 2017.',
            approval: Object.assign(appr(XD_KIND.KTL, STP, 1, [pd('STP-HN-HCTP', 'tp_hctp_hn', '09:00 06/10/2026'), { unitId: 'STP-HN', userId: 'gdso_hn', action: 'Ký duyệt', note: '', at: '15:00 06/10/2026' }], ['tp_hctp_hn', 'gdso_hn'], '08:00 06/10/2026', Object.assign(offline('Thong_bao_khong_thu_ly_XD-2026-157_da_ky.pdf'), { signedFile: 'Thong_bao_khong_thu_ly_XD-2026-157_da_ky.pdf', signedBy: 'gdso_hn', signedAt: '15:00 06/10/2026' }), 'Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước theo quy định tại Điều 17, 18, 19 Luật TNBTCNN năm 2017.'), { pending: null, done: true }),
            history: [
                h('Tiếp nhận hồ sơ', 'cv_hn1', '10:00 02/10/2026', 'Tiếp nhận hồ sơ trực tiếp tại Sở Tư pháp; cán bộ chủ trì: Đỗ Văn Chung; chuyển bước Xác minh cơ quan giải quyết bồi thường.'),
                h('Trình phê duyệt', 'cv_hn1', '08:00 06/10/2026', 'Nội dung trình: Không thụ lý hồ sơ. Cán bộ trình: Đỗ Văn Chung. Lý do: Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước. Văn bản trình ký: Thong_bao_khong_thu_ly_XD-2026-157.pdf. Trình Vũ Thị Thanh (Phòng Hành chính tư pháp).', XD_KIND.KTL),
                h('Phê duyệt', 'tp_hctp_hn', '09:00 06/10/2026', 'Phê duyệt cấp Phòng (Phòng Hành chính tư pháp); Ý kiến: Thống nhất lý do không thuộc phạm vi bồi thường; chuyển Giám đốc Sở ký duyệt ban hành.', XD_KIND.KTL),
                h('Ký duyệt', 'gdso_hn', '15:00 06/10/2026', 'Ký duyệt cấp cuối (Sở Tư pháp Thành phố Hà Nội): Ban hành Thông báo không thụ lý hồ sơ (Ký ngoài). Văn bản đã ký & đóng dấu: Thong_bao_khong_thu_ly_XD-2026-157_da_ky.pdf. Hồ sơ chuyển trạng thái [Không thụ lý].', XD_KIND.KTL)
            ]
        })),
        // Kết quả đã ký duyệt (dữ liệu cũ Chờ chuyển CQGQBT): khi nạp, hệ thống tự động chuyển CQGQBT -> Đã chuyển CQGQBT
        base('XD-2026-158', false, Object.assign(p('Từ Văn Hưng', '21/08/1982', '001082001558', '0936151158', 'Số 25 Tông Đản', 'Tạm giữ tài sản quá thời hạn của Công an quận Hoàng Mai.'), kq('CA-HM', 'Người thi hành công vụ gây thiệt hại thuộc Công an quận Hoàng Mai quản lý.'), {
            date: '01/10/2026', receivedAt: '08:00 01/10/2026', status: 'Chờ chuyển CQGQBT', routes: stpRoutes('01/10/2026'),
            approval: Object.assign(appr(XD_KIND.KQ, STP, 1, [pd('STP-HN-HCTP', 'tp_hctp_hn', '09:00 05/10/2026'), { unitId: 'STP-HN', userId: 'gdso_hn', action: 'Ký duyệt', note: '', at: '14:00 05/10/2026' }], ['tp_hctp_hn', 'gdso_hn'], '08:00 05/10/2026', Object.assign(online('Ket_qua_xac_dinh_CQGQBT_XD-2026-158.pdf'), { signedFile: 'Ket_qua_xac_dinh_CQGQBT_XD-2026-158_da_ky.pdf', signedBy: 'gdso_hn', signedAt: '14:00 05/10/2026' })), { pending: null, done: true }),
            history: [h('Trình phê duyệt', 'cv_hn1', '08:00 05/10/2026', 'Kết quả xác định CQGQBT.'), h('Phê duyệt', 'tp_hctp_hn', '09:00 05/10/2026', '', XD_KIND.KQ), h('Ký duyệt', 'gdso_hn', '14:00 05/10/2026', 'Ký duyệt cấp cuối (Sở Tư pháp Thành phố Hà Nội): Kết quả xác định CQGQBT.', XD_KIND.KQ)]
        }))
    ];
}
function migrateFlowSeed() {
    let done = null;
    try { done = localStorage.getItem(FLOW_SEED_FLAG); } catch (e) { done = null; }
    if (done) return;
    const records = BTNN_WF.loadRecords();
    const seeds = buildFlowSeed();
    seeds.forEach(rec => {
        const idx = records.findIndex(r => r.code === rec.code);
        if (idx >= 0) {
            records[idx] = Object.assign({}, records[idx], rec);
        } else {
            records.push(rec);
        }
    });
    BTNN_WF.saveRecords(records);
    try { localStorage.setItem(FLOW_SEED_FLAG, '1'); } catch (e) { /* bỏ qua */ }
}

// ===== Người yêu cầu bồi thường: Tư cách (DM_26) và Loại người yêu cầu (Cá nhân / Tổ chức) =====
const NYC_ROLE = {
    NBTH: 'Người bị thiệt hại',
    THUA_KE: 'Người thừa kế của người bị thiệt hại',
    DD_THUA_KE: 'Người đại diện cho những người thừa kế của người bị thiệt hại',
    TC_KE_THUA: 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại',
    DD_PL: 'Người đại diện theo pháp luật của người bị thiệt hại',
    UY_QUYEN: 'Cá nhân, pháp nhân được ủy quyền hợp pháp'
};
const NYC_ROLE_CODES = { TCNYC_01: NYC_ROLE.NBTH, TCNYC_02: NYC_ROLE.THUA_KE, TCNYC_06: NYC_ROLE.DD_THUA_KE, TCNYC_03: NYC_ROLE.TC_KE_THUA, TCNYC_04: NYC_ROLE.DD_PL, TCNYC_05: NYC_ROLE.UY_QUYEN };
const NYC_TYPE = { CA_NHAN: 'Cá nhân', TO_CHUC: 'Tổ chức' };

// Loại người yêu cầu bắt buộc theo Tư cách: '' = cho phép chọn
function nycTypeConstraint(role) {
    if (window.BTNN_WF && typeof BTNN_WF.nycTypeConstraint === 'function') {
        try {
            const v = BTNN_WF.nycTypeConstraint(role);
            if (v === NYC_TYPE.CA_NHAN || v === NYC_TYPE.TO_CHUC || v === '' || v == null) return v || '';
        } catch (e) { /* dùng quy tắc cục bộ */ }
    }
    const r = NYC_ROLE_CODES[role] || role;
    if (r === NYC_ROLE.TC_KE_THUA) return NYC_TYPE.TO_CHUC;
    if ([NYC_ROLE.THUA_KE, NYC_ROLE.DD_THUA_KE, NYC_ROLE.DD_PL].includes(r)) return NYC_TYPE.CA_NHAN;
    return '';
}

// Loại người yêu cầu của hồ sơ: suy ra theo Tư cách (TCNYC_03 → Tổ chức; TCNYC_02/06/04 → Cá nhân); khác theo nycType, không có coi là Cá nhân
function nycTypeOf(item) {
    if (!item) return NYC_TYPE.CA_NHAN;
    return nycTypeConstraint(item.nycRole) || (item.nycType === NYC_TYPE.TO_CHUC ? NYC_TYPE.TO_CHUC : NYC_TYPE.CA_NHAN);
}

// Địa chỉ 01 dòng: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố] (bỏ phần trống)
function joinAddress(detail, ward, province) {
    // Dùng hàm dùng chung khi có (chữ ký 03 tham số: chi tiết, phường/xã, tỉnh/thành phố)
    if (window.BTNN_WF && typeof BTNN_WF.joinAddress === 'function' && BTNN_WF.joinAddress.length >= 3) {
        try {
            const v = BTNN_WF.joinAddress(detail, ward, province);
            if (typeof v === 'string') return v;
        } catch (e) { /* dùng quy tắc cục bộ */ }
    }
    return [detail, stripAdministrativeCode(ward), stripAdministrativeCode(province)].map(s => String(s || '').trim()).filter(Boolean).join(', ');
}

// Cột "Họ và tên người/Tổ chức bị thiệt hại" trên lưới và bộ lọc cùng tên
function victimNameOf(item) {
    if (!item) return '-';
    if ((item.nycRole || NYC_ROLE.NBTH) === NYC_ROLE.NBTH) return item.nycName || '-';
    if (item.nycRole === NYC_ROLE.TC_KE_THUA) return item.nbthOrgName || '-';
    return (item.nbth && item.nbth.name) || '-';
}

let requestList = [];

// Active State
let currentPage = 1;
let pageSize = 20;
let filteredList = [];
let formMode = 'create';
let formDocRows = [];

const REQUEST_TYPE_XDCQ = "Xác định cơ quan giải quyết bồi thường";
const wardCatalog = {
    "Thành phố Hà Nội": ["00001 - Phường Ba Đình", "00004 - Phường Hoàn Kiếm", "00007 - Phường Cầu Giấy", "00010 - Phường Thanh Xuân"],
    "Thành phố Hồ Chí Minh": ["26734 - Phường Bến Thành", "26737 - Phường Sài Gòn", "26740 - Phường Tân Định", "26743 - Phường Chợ Lớn"],
    "Thành phố Đà Nẵng": ["20194 - Phường Hải Châu", "20197 - Phường Thanh Khê", "20200 - Phường Sơn Trà", "20203 - Phường Ngũ Hành Sơn"],
    "Tỉnh Lâm Đồng": ["24778 - Phường Xuân Hương - Đà Lạt", "24781 - Phường Lâm Viên - Đà Lạt", "24784 - Xã Đức Trọng", "24787 - Xã Di Linh"],
    "Thành phố Hải Phòng": ["11359 - Phường Hồng Bàng", "11362 - Phường Ngô Quyền", "11365 - Phường Lê Chân", "11368 - Phường Hải An"]
};

// Nhãn nhận diện hồ sơ: Mã hồ sơ - Họ và tên người yêu cầu
function getCaseName(item) {
    return item ? `${item.code || ''} - ${item.nycName || 'Người yêu cầu'}` : '';
}

// Temporary file upload cache
let fileCache = {
    procDecisionFile: null,
    claimFile: null
};

// Khởi tạo màn hình
document.addEventListener('DOMContentLoaded', () => {
    // Tự động tính toán mặc định 'Từ ngày' (3 tháng trước) đến 'Đến ngày' (ngày hiện tại)
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    document.getElementById('filterFromDate').value = formatDateValue(threeMonthsAgo);
    document.getElementById('filterToDate').value = formatDateValue(today);
    const pageSizeSelect = document.getElementById('pageSizeSelect');
    if (pageSizeSelect) pageSizeSelect.value = String(pageSize);

    // Initialize flatpickr for dates
    ["#filterFromDate", "#filterToDate", "#formNYCDob", "#formNYCDocDate", "#formNYCOrgDocDate", "#nbthDob", "#nbthDocDate"].forEach(sel => {
        if (document.querySelector(sel)) flatpickr(sel, { dateFormat: "d/m/Y", allowInput: true });
    });
    // Loại giấy tờ thân nhân: danh mục DM_10 trừ Mã số thuế
    BTNN_WF.fillPersonalDocTypeSelect('formNYCDocType', '-- Chọn loại giấy tờ --');
    BTNN_WF.fillPersonalDocTypeSelect('nbthDocType', '-- Chọn loại giấy tờ --');

    const params = new URLSearchParams(window.location.search);
    readOnlyView = params.get('readonly') === '1';
    if (!readOnlyView) BTNN_WF.mountUserSwitcher();

    initWorkflowData();
    renderUnitFilterOptions();
    renderApprovalKindOptions();
    applyScopeNotice();
    // Mở tab theo tham số từ Dashboard Lãnh đạo: ?tab=pending|done
    switchXdTab((window.BTNN_LD && BTNN_LD.tabParam()) || 'pending');

    const detailCode = params.get('detail');
    if (detailCode) {
        const matched = findRecordByCode(detailCode);
        if (matched) showDetailScreen(matched.id);
    }
});

// Phạm vi xem: cán bộ chủ trì, người tạo, lãnh đạo các đơn vị trên luồng phân công/phê duyệt.
// Hồ sơ Chờ phân công/Đang phân công nằm tại Tiếp nhận hồ sơ (Lãnh đạo Phân công tại tab Chờ xử lý).
// UBND cấp tỉnh: chỉ xem (chỉ đọc) hồ sơ của các Sở Tư pháp trực thuộc.
let readOnlyView = false;
const LEGACY_FLAG = 'btnn_xd_legacy_seed_v2';

function initWorkflowData() {
    migrateLegacySeed();
    migrateStpSeed();
    migrateOrgSeed();
    migrateFlowSeed();
    reloadRequestList();
}

// Bổ sung một lần hồ sơ mẫu của Sở Tư pháp vào kho dùng chung; gỡ hồ sơ mẫu cũ do UBND cấp tỉnh xử lý
function migrateStpSeed() {
    let done = null;
    try { done = localStorage.getItem(STP_SEED_FLAG); } catch (e) { done = null; }
    if (done) return;
    const records = BTNN_WF.loadRecords().filter(r => !(r.module === 'XD' && OLD_UBND_SEED_CODES.includes(r.code) && /^UBND/.test(r.rootUnitId || '')));
    buildStpSeed().forEach(rec => { if (!records.some(r => r.code === rec.code)) records.push(rec); });
    BTNN_WF.saveRecords(records);
    try { localStorage.setItem(STP_SEED_FLAG, '1'); } catch (e) { /* bỏ qua */ }
}

function migrateLegacySeed() {
    let done = null;
    try { done = localStorage.getItem(LEGACY_FLAG); } catch (e) { done = null; }
    const records = BTNN_WF.loadRecords();
    if (done && records.some(r => r.code === LEGACY_SEED[0].code)) return;
    LEGACY_SEED.forEach(item => {
        if (records.some(r => r.code === item.code)) return;
        const rec = JSON.parse(JSON.stringify(item));
        delete rec.caseName;
        if (rec.status === 'Hoàn thành' && (!rec.claimCode || rec.claimCode === '-')) rec.status = BTNN_WF.STATUS.CHO_CHUYEN;
        Object.assign(rec, {
            id: 'WF-' + rec.code, module: 'XD', loaiYeuCau: BTNN_WF.REQUEST_TYPE_XD, source: 'Tạo trực tiếp',
            rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', createdBy: 'canbonv', chuTri: 'canbonv',
            routes: [], approval: null, receivedAt: rec.receivedAt || rec.date,
            history: [{ at: (rec.date || '') , userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Tạo yêu cầu', note: `Trạng thái: ${rec.status}.` }]
        });
        if (rec.status === 'Bị từ chối') rec.rejectionReason = rec.rejectionReason || rec.procReason;
        records.push(rec);
    });
    BTNN_WF.saveRecords(records);
    try { localStorage.setItem(LEGACY_FLAG, '1'); } catch (e) { /* bỏ qua */ }
}

function getMe() { return BTNN_WF.getCurrentUserId(); }

// ===== 02 tab Chờ xử lý / Đã xử lý =====
// - Cán bộ xử lý: Chờ xử lý = hồ sơ còn bước xử lý; Đã xử lý = Không thụ lý, Đã chuyển CQGQBT.
// - Lãnh đạo: Chờ xử lý = hồ sơ Chờ duyệt Lãnh đạo được giao ở cấp phê duyệt hiện hành; Đã xử lý = hồ sơ Lãnh đạo đã Phê duyệt / Ký duyệt / Từ chối phê duyệt.
const XD_ST = { CHO_TIEP_NHAN: 'Chờ tiếp nhận', XAC_MINH: 'Xác minh CQGQBT', CHO_DUYET: 'Chờ duyệt', BI_TRA_LAI: 'Bị trả lại', YCBS: 'Yêu cầu bổ sung', KTL: 'Không thụ lý', DA_CHUYEN: 'Đã chuyển CQGQBT' };
const XD_PENDING_STATES = [XD_ST.CHO_TIEP_NHAN, XD_ST.XAC_MINH, XD_ST.CHO_DUYET, XD_ST.BI_TRA_LAI, XD_ST.YCBS];
const XD_DONE_STATES = [XD_ST.KTL, XD_ST.DA_CHUYEN];
// Nội dung trình của hồ sơ Xác định CQGQBT (dòng phụ dưới trạng thái Chờ duyệt / Bị trả lại)
const XD_KIND = { KQ: 'Kết quả xác định CQGQBT', YCBS: 'Yêu cầu bổ sung', KTL: 'Không thụ lý' };
let xdTab = 'pending';
// UBND cấp tỉnh: chỉ xem (chỉ đọc) hồ sơ của các Sở Tư pháp trực thuộc
function isXdViewOnly() { return BTNN_WF.isXdViewOnlyUser(getMe()) && !canCreateXd(); }
// Lãnh đạo: thuộc Nhóm lãnh đạo của ít nhất 01 đơn vị tại luồng Xác định CQGQBT - Bộ Tư pháp / Sở Tư pháp
function isLeaderMe() {
    if (isXdViewOnly()) return false;
    const me = getMe();
    const FT = BTNN_WF.FLOW_TYPES;
    return [FT.XD_BTP, FT.XD_STP].some(ft => {
        const cfg = BTNN_WF.getFlowConfig(ft) || {};
        return Object.keys(cfg).some(root => Object.values(cfg[root] || {}).some(n => (n.leaders || []).includes(me)));
    });
}
function xdInTab(tab, item) {
    const me = getMe();
    if (isLeaderMe()) {
        if (tab === 'pending') return BTNN_WF.canApprove(item, me);
        return !BTNN_WF.canApprove(item, me) && BTNN_LD.leaderActedOn(item, me, /Phê duyệt|Ký duyệt|Từ chối phê duyệt/);
    }
    return tab === 'pending' ? XD_PENDING_STATES.includes(item.status) : XD_DONE_STATES.includes(item.status);
}
function switchXdTab(tab) {
    xdTab = tab === 'done' ? 'done' : 'pending';
    document.querySelectorAll('.xd-tabs .xd-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === xdTab));
    const sel = document.getElementById('filterStatus');
    if (sel) {
        const states = isLeaderMe()
            ? Array.from(new Set(requestList.filter(r => xdInTab(xdTab, r)).map(r => r.status)))
            : (xdTab === 'pending' ? XD_PENDING_STATES : XD_DONE_STATES);
        sel.innerHTML = '<option value="">Tất cả trạng thái</option>' + states.map(s => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('');
    }
    setCreateBtnVisible(xdTab !== 'done' && canCreateXd() && !isLeaderMe() && !readOnlyView);
    applyFilters();
}
function updateXdTabCounts() {
    const p = document.getElementById('xdCntPending'), d = document.getElementById('xdCntDone');
    if (p) p.textContent = requestList.filter(r => xdInTab('pending', r)).length;
    if (d) d.textContent = requestList.filter(r => xdInTab('done', r)).length;
}
function afterXdLeaderAction() { reloadRequestList(); switchXdTab(xdTab); }

function isVisibleToMe(rec) {
    const me = getMe();
    if (rec.module !== 'XD') return false;
    if ([BTNN_WF.STATUS.CHO_PHAN_CONG, BTNN_WF.STATUS.DANG_PHAN_CONG].includes(rec.status)) return false;
    // UBND cấp tỉnh: chỉ hồ sơ của các Sở Tư pháp trực thuộc
    if (isXdViewOnly()) return BTNN_WF.xdViewOnlyStpRoots(me).includes(rec.rootUnitId);
    if (rec.chuTri === me || rec.createdBy === me) return true;
    const units = (rec.routes || []).map(r => r.fromUnitId).concat(rec.approval ? rec.approval.path : []);
    const ft = BTNN_WF.flowTypeOf(rec);
    return units.some(u => BTNN_WF.isLeaderOf(me, u, ft));
}

function reloadRequestList() {
    requestList = BTNN_WF.loadRecords().filter(isVisibleToMe);
    normalizeRequestData();
}

function findRecordByCode(code) {
    let rec = requestList.find(r => r.code === code);
    if (!rec) {
        rec = BTNN_WF.getRecord(code);
        if (rec) { requestList.push(rec); normalizeRequestData(); }
    }
    return rec;
}

// Ghi một hồ sơ về kho dùng chung
function saveItem(item) {
    if (item) BTNN_WF.upsertRecord(item);
}

function saveRequestList() {
    requestList.forEach(saveItem);
}

// Ẩn/hiện nút Tạo yêu cầu (inline !important để không bị CSS chuẩn hóa nút của khối lọc ghi đè)
function setCreateBtnVisible(show) {
    const btn = document.getElementById('btnCreateRequest');
    if (btn) btn.style.setProperty('display', show ? 'inline-flex' : 'none', 'important');
}

function canCreateXd() {
    return BTNN_WF.getRequestTypesForUser().includes(REQUEST_TYPE_XDCQ);
}

function applyScopeNotice() {
    const notice = document.getElementById('xdScopeNotice');
    const btn = document.getElementById('btnCreateRequest');
    const allowed = canCreateXd();
    // UBND cấp tỉnh (chỉ xem): không có nút Tạo yêu cầu, không hiển thị thông báo không áp dụng
    const viewOnly = isXdViewOnly();
    if (btn) setCreateBtnVisible(allowed && !readOnlyView);
    if (notice) {
        notice.style.display = allowed || viewOnly ? 'none' : 'block';
        notice.innerHTML = `<i class="fa-solid fa-circle-info"></i> Loại hồ sơ "Xác định cơ quan giải quyết bồi thường" không áp dụng cho đơn vị ${escapeHtml(BTNN_WF.unitName(BTNN_WF.getCurrentUser().unitId))} (Danh mục Loại hồ sơ - Đơn vị áp dụng). Chỉ Bộ Tư pháp và Sở Tư pháp được xử lý loại hồ sơ này.`;
    }
}

// Cơ quan xử lý hồ sơ (đơn vị gốc) và loại cơ quan có thẩm quyền: Bộ Tư pháp | Sở Tư pháp
function authorityTypeOf(item) {
    return item && item.rootUnitId ? BTNN_WF.xdAuthorityType(item.rootUnitId) : '';
}

function authorityTagHtml(type) {
    if (!type) return '';
    const cls = type === 'Sở Tư pháp' ? 'stp' : 'btp';
    return `<span class="authority-tag ${cls}">${escapeHtml(type)}</span>`;
}

// Tên cơ quan + nhãn loại cơ quan (bỏ nhãn khi trùng tên cơ quan, VD Bộ Tư pháp)
function unitWithTypeHtml(rootId, block) {
    if (!rootId) return '--';
    const name = BTNN_WF.unitName(rootId);
    const type = BTNN_WF.xdAuthorityType(rootId);
    const tag = type && type !== name ? authorityTagHtml(type) : '';
    return escapeHtml(name) + (tag ? (block ? `<div>${tag}</div>` : tag) : '');
}

// Bộ lọc Cơ quan xử lý: nhóm theo loại cơ quan có thẩm quyền Xác định CQGQBT (Bộ Tư pháp, Sở Tư pháp)
// Người dùng UBND cấp tỉnh: chỉ có các Sở Tư pháp trực thuộc
function renderUnitFilterOptions() {
    const sel = document.getElementById('filterUnit');
    if (!sel) return;
    const groups = {};
    const units = isXdViewOnly() ? BTNN_WF.xdViewOnlyStpRoots(getMe()) : BTNN_WF.XD_AUTHORITY_UNITS;
    units.forEach(u => {
        const type = BTNN_WF.xdAuthorityType(u);
        if (!type) return;
        (groups[type] = groups[type] || []).push(u);
    });
    sel.innerHTML = '<option value="">Tất cả cơ quan</option>' + ['Bộ Tư pháp', 'Sở Tư pháp'].filter(t => groups[t]).map(t =>
        `<optgroup label="${escapeAttr(t)}">${groups[t].length > 1 ? `<option value="type:${escapeAttr(t)}">Tất cả ${escapeHtml(t)}</option>` : ''}${groups[t].map(u => `<option value="${escapeAttr(u)}">${escapeHtml(BTNN_WF.unitName(u))}</option>`).join('')}</optgroup>`
    ).join('');
}

// Bộ lọc Nội dung trình (áp dụng cho hồ sơ Chờ duyệt / Bị trả lại)
function renderApprovalKindOptions() {
    const sel = document.getElementById('filterApprovalKind');
    if (!sel) return;
    sel.innerHTML = '<option value="">Tất cả</option>' + (BTNN_WF.APPROVAL_KINDS.XD || []).map(k => `<option value="${escapeAttr(k)}">${escapeHtml(k)}</option>`).join('');
}

// Lịch sử xử lý: mỗi dòng kèm cơ quan và loại cơ quan của người thực hiện (thể hiện vai trò Bộ Tư pháp / Sở Tư pháp)
function renderXdHistoryHtml(rec) {
    const list = (rec.history || []).slice().reverse();
    if (!list.length) return '<div style="color:var(--text-muted); font-style:italic;">Chưa có lịch sử xử lý.</div>';
    return `<div style="display:flex; flex-direction:column; gap:10px;">${list.map(x => {
        const user = BTNN_WF.getUser(x.userId);
        const root = user ? BTNN_WF.getRootId(user.unitId) : '';
        const isReject = /Từ chối|Trả lại/.test(x.action);
        const isSign = /Ký duyệt|Ban hành|Hoàn thành/.test(x.action);
        const borderColor = isReject ? '#dc2626' : (isSign ? '#16a34a' : '#2563eb');
        return `<div style="border:1px solid #e2e8f0; border-left:3.5px solid ${borderColor}; padding:8px 14px; background:#f8fafc; border-radius:0 6px 6px 0;">
            <div style="font-weight:600; color:#0f172a; font-size:13.5px;">${escapeHtml(x.action)} <span style="font-weight:400; color:#64748b; font-size:12.5px;">- ${escapeHtml(x.userName)}${root ? ' (' + unitWithTypeHtml(root) + ')' : ''} - ${escapeHtml(x.at)}</span></div>
            ${x.note ? `<div style="color:#334155; margin-top:3px; font-size:13px; line-height:1.5;">${escapeHtml(x.note)}</div>` : ''}
        </div>`;
    }).join('')}</div>`;
}

function isChuTri(item) { return item && item.chuTri === getMe(); }

function normalizeRequestData() {
    requestList.forEach(item => {
        if (item.status === "Chờ nhập liệu") item.status = XD_ST.CHO_TIEP_NHAN;
        if (item.status === "Đang xác minh") item.status = XD_ST.XAC_MINH;
        // Phân hệ BTNN không còn trạng thái Lưu nháp: hồ sơ nháp cũ chuyển về Xác minh CQGQBT
        if (item.status === "Lưu nháp") { item.status = XD_ST.XAC_MINH; saveItem(item); }
        // Chờ duyệt / Bị trả lại luôn là Ký số (Ký ngoài không trình Lãnh đạo): dữ liệu cũ có phiếu trình Ký ngoài -> Ký số
        if ((item.status === XD_ST.CHO_DUYET || item.status === XD_ST.BI_TRA_LAI) && item.approval && item.approval.signDoc && item.approval.signDoc.method === 'Ký ngoài') {
            item.approval.signDoc = { method: 'Ký số', file: String(item.approval.signDoc.file || '').replace(/_da_ky(\.pdf)$/i, '$1'), sigBox: { x: 430, y: 820, w: 245, h: 110 } };
            saveItem(item);
        }
        // Hồ sơ Chờ duyệt / Bị trả lại thiếu Văn bản trình ký (dữ liệu giả lập cũ): bổ sung văn bản Ký số trên hệ thống theo Loại trình
        if ((item.status === XD_ST.CHO_DUYET || item.status === XD_ST.BI_TRA_LAI) && item.approval && !item.approval.signDoc) {
            const k = item.approval.kind || XD_KIND.KQ;
            const base = k === XD_KIND.YCBS ? 'Thong_bao_YCBS' : (k === XD_KIND.KTL ? 'Thong_bao_khong_thu_ly' : 'Ket_qua_xac_dinh_CQGQBT');
            item.approval.signDoc = { method: 'Ký số', file: `${base}_${item.code}.pdf` };
            saveItem(item);
        }
        if (!item.nycPhuongXa) item.nycPhuongXa = inferWard(item.nycTinhThanh);
        if (!item.attachedDocs) {
            item.attachedDocs = item.attachedFile ? [{ name: "Tài liệu đính kèm", file: item.attachedFile }] : [];
        }
        if (!item.hanhVi) item.hanhVi = '';
        if (!item.linhVuc) item.linhVuc = 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH';
        if (!item.date) item.date = (item.receivedAt || '').split(' ').pop() || formatDateValue(new Date());
        // Chuyển CQGQBT chỉ sinh 01 mã BT- cho cả 03 giá trị Loại yêu cầu giải quyết bồi thường: dữ liệu cũ có mã PHDD- chuyển về BT-
        if (item.phddCode) {
            const seed = LEGACY_SEED.find(s => s.code === item.code);
            const hasClaim = item.claimCode && item.claimCode !== '-' && item.claimCode !== '--';
            if (!hasClaim) item.claimCode = (seed && seed.claimCode) || String(item.phddCode).replace(/^PHDD-/, 'BT-');
            delete item.phddCode;
            saveItem(item);
        }
        if (!item.claimCode) item.claimCode = '-';
    });
}

// Toggle Country input for Form (Viet Nam -> dropdown, Other -> Text input)
function toggleCountrySelect(val) {
    const viDiv = document.getElementById('countryViSelection');
    const otherDiv = document.getElementById('countryOtherSelection');
    const wardViDiv = document.getElementById('wardViSelection');
    const wardOtherDiv = document.getElementById('wardOtherSelection');
    if (val === 'Việt Nam') {
        viDiv.style.display = 'block';
        otherDiv.style.display = 'none';
        if (wardViDiv) wardViDiv.style.display = 'block';
        if (wardOtherDiv) wardOtherDiv.style.display = 'none';
        updateWardOptions();
    } else {
        viDiv.style.display = 'none';
        otherDiv.style.display = 'block';
        if (wardViDiv) wardViDiv.style.display = 'none';
        if (wardOtherDiv) wardOtherDiv.style.display = 'block';
    }
}

// Số điện thoại bắt buộc; Email không bắt buộc
function toggleFormEmailRequired() {
    const label = document.querySelector("#formNYCEmail").previousElementSibling;
    label.innerHTML = 'Email';
}

// Mặc định Phương thức nhận thông báo: Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID)
const NOTIFY_METHOD_DEFAULT = 'Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID)';

function normalizeNotifyMethod(val) {
    if (!val || val === 'Phương thức điện tử' || val === 'Phương thức điện tử (Email, Zalo, SMS...)' || val === 'Qua Cổng Dịch vụ công quốc gia' || val.includes('Cổng Dịch vụ công quốc gia, ứng dụng') || val.includes('hoặc phương tiện điện tử khác')) {
        return NOTIFY_METHOD_DEFAULT;
    }
    if (val === 'Hồ sơ giấy') return 'Qua dịch vụ bưu chính';
    return val;
}

function handleNotifyMethodChange(method, scope = 'xd') {
    const labelEl = document.getElementById(scope === 'xd' ? 'formDiaChiNhanLabel' : 'claimNotifyAddressLabel');
    const inputEl = document.getElementById(scope === 'xd' ? 'formDiaChiNhan' : 'claimNotifyAddress');
    if (!labelEl || !inputEl) return;

    inputEl.classList.remove('is-invalid');
    const errEl = document.getElementById(scope === 'xd' ? 'errFormDiaChiNhan' : 'errClaimNotifyAddress');
    if (errEl) errEl.style.display = 'none';

    if (method === 'Trực tiếp') {
        labelEl.innerHTML = `Địa chỉ, đầu mối nhận thông báo (Trực tiếp tại trụ sở) <span class="required">*</span>`;
        inputEl.placeholder = `Nhận trực tiếp tại trụ sở cơ quan giải quyết (hoặc thông tin người nhận)...`;
        if (!inputEl.value.trim() || inputEl.dataset.autofilled === '1') {
            inputEl.value = 'Nhận trực tiếp tại trụ sở cơ quan giải quyết bồi thường';
            inputEl.dataset.autofilled = '1';
        }
    } else if (method === 'Qua dịch vụ bưu chính') {
        labelEl.innerHTML = `Địa chỉ nhận thông báo qua dịch vụ bưu chính <span class="required">*</span>`;
        inputEl.placeholder = `Nhập địa chỉ chi tiết nhận thông báo qua dịch vụ bưu chính...`;
        if (!inputEl.value.trim() || inputEl.dataset.autofilled === '1') {
            const addr = scope === 'xd'
                ? [document.getElementById('formNYCAddressDetail')?.value, document.getElementById('formNYCPhuongXa')?.value, document.getElementById('formNYCTinhThanh')?.value].filter(Boolean).join(', ')
                : [document.getElementById('claimNYCAddress')?.value, document.getElementById('claimNYCCity')?.value].filter(Boolean).join(', ');
            inputEl.value = addr || '';
            inputEl.dataset.autofilled = addr ? '1' : '0';
        }
    } else if (method === 'Qua thư điện tử') {
        labelEl.innerHTML = `Thư điện tử (Email) nhận thông báo <span class="required">*</span>`;
        inputEl.placeholder = `Nhập địa chỉ thư điện tử nhận thông báo (ví dụ: nguyenvanan@gmail.com)...`;
        if (!inputEl.value.trim() || inputEl.dataset.autofilled === '1') {
            const email = scope === 'xd' ? document.getElementById('formNYCEmail')?.value : document.getElementById('claimNYCEmail')?.value;
            inputEl.value = email || '';
            inputEl.dataset.autofilled = email ? '1' : '0';
        }
    } else if (method.includes('Cổng Dịch vụ công') || method.includes('VNeID')) {
        labelEl.innerHTML = `Địa chỉ, đầu mối nhận thông báo (Tài khoản Cổng DVC / Số ĐDCN / VNeID) <span class="required">*</span>`;
        inputEl.placeholder = `Nhập số định danh cá nhân / tài khoản VNeID hoặc tài khoản Cổng DVC nhận thông báo...`;
        if (!inputEl.value.trim() || inputEl.dataset.autofilled === '1') {
            const docNo = scope === 'xd' ? document.getElementById('formNYCDocNo')?.value : document.getElementById('claimNYCCardNo')?.value;
            const phone = scope === 'xd' ? document.getElementById('formNYCPhone')?.value : document.getElementById('claimNYCPhone')?.value;
            const text = [docNo ? `CCCD/ĐDCN: ${docNo}` : '', phone ? `SĐT: ${phone}` : ''].filter(Boolean).join(' / ');
            inputEl.value = text || 'VNeID / Cổng Dịch vụ công quốc gia';
            inputEl.dataset.autofilled = '1';
        }
    } else if (method === 'Qua phương tiện điện tử khác') {
        labelEl.innerHTML = `Địa chỉ, đầu mối nhận thông báo qua phương tiện điện tử khác <span class="required">*</span>`;
        inputEl.placeholder = `Nhập thông tin phương tiện điện tử khác (số điện thoại, tài khoản số...)...`;
        if (!inputEl.value.trim() || inputEl.dataset.autofilled === '1') {
            const phone = scope === 'xd' ? document.getElementById('formNYCPhone')?.value : document.getElementById('claimNYCPhone')?.value;
            const email = scope === 'xd' ? document.getElementById('formNYCEmail')?.value : document.getElementById('claimNYCEmail')?.value;
            const text = [phone ? `SĐT: ${phone}` : '', email ? `Email: ${email}` : ''].filter(Boolean).join(' / ');
            inputEl.value = text || '';
            inputEl.dataset.autofilled = text ? '1' : '0';
        }
    } else {
        // Mặc định
        labelEl.innerHTML = `Địa chỉ, đầu mối nhận thông báo <span class="required">*</span>`;
        inputEl.placeholder = `Nhập địa chỉ, đầu mối nhận thông báo...`;
    }
}

// Hiển thị khối Người bị thiệt hại khi Tư cách khác "Người bị thiệt hại";
// Tư cách "Tổ chức kế thừa..." hiển thị khối Tổ chức bị thiệt hại đã chấm dứt tồn tại
function toggleNbthBlock() {
    const role = document.getElementById('formNYCRole').value;
    const isOrgVictim = role === NYC_ROLE.TC_KE_THUA;
    document.getElementById('nbthBlock').style.display = role && role !== NYC_ROLE.NBTH ? 'block' : 'none';
    document.getElementById('nbthOrgBlock').style.display = isOrgVictim ? 'grid' : 'none';
    document.getElementById('nbthPersonBlock').style.display = isOrgVictim ? 'none' : 'grid';
    document.getElementById('nbthBlockTitle').innerText = isOrgVictim ? 'THÔNG TIN TỔ CHỨC BỊ THIỆT HẠI ĐÃ CHẤM DỨT TỒN TẠI' : 'THÔNG TIN NGƯỜI BỊ THIỆT HẠI';
}

// Đổi Tư cách: cập nhật khối Người bị thiệt hại
function onNycRoleChange() {
    toggleNbthBlock();
}

// Đổi Loại người yêu cầu: lọc lại danh sách Tư cách (Tư cách không còn hợp lệ về trống) và các trường phụ thuộc
function onNycTypeChange() {
    applyNycTypeConstraint();
}

function getFormNycType() {
    const r = document.querySelector('input[name="formNYCType"]:checked');
    return r ? r.value : NYC_TYPE.CA_NHAN;
}

// Danh sách tên Tư cách theo Loại người yêu cầu (Cá nhân: bỏ TCNYC_03; Tổ chức: TCNYC_01, TCNYC_03, TCNYC_05), giữ thứ tự DM_26
function nycRoleNamesForType(type) {
    if (window.BTNN_WF && typeof BTNN_WF.nycRolesForType === 'function') {
        try { return BTNN_WF.nycRolesForType(type).map(r => r.name); } catch (e) { /* dùng quy tắc cục bộ */ }
    }
    const excluded = type === NYC_TYPE.TO_CHUC ? ['TCNYC_02', 'TCNYC_06', 'TCNYC_04'] : ['TCNYC_03'];
    return Object.keys(NYC_ROLE_CODES).filter(c => !excluded.includes(c)).map(c => NYC_ROLE_CODES[c]);
}

// Loại người yêu cầu không bị khóa: chọn Loại (preferred hoặc đang chọn), nạp danh sách Tư cách theo Loại, giữ Tư cách nếu còn hợp lệ
function applyNycTypeConstraint(preferred) {
    const value = preferred || getFormNycType();
    document.querySelectorAll('input[name="formNYCType"]').forEach(r => {
        r.checked = r.value === value;
        r.disabled = false;
    });
    const sel = document.getElementById('formNYCRole');
    const current = sel.value;
    const names = nycRoleNamesForType(value);
    sel.innerHTML = `<option value="">-- Chọn tư cách người yêu cầu --</option>` + names.map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
    sel.value = names.includes(current) ? current : '';
    applyNycType(value);
    toggleNbthBlock();
}

// Hiển thị trường theo Loại người yêu cầu: Cá nhân (Ngày sinh, giấy tờ thân nhân) / Tổ chức (Mã số, giấy tờ thành lập, người đại diện)
function applyNycType(type) {
    const isOrg = type === NYC_TYPE.TO_CHUC;
    document.querySelectorAll('#screenForm .nyc-individual').forEach(el => { el.style.display = isOrg ? 'none' : ''; });
    document.querySelectorAll('#screenForm .nyc-org').forEach(el => { el.style.display = isOrg ? '' : 'none'; });
    const label = document.getElementById('formNYCNameLabel');
    if (label) label.innerHTML = `${isOrg ? 'Tên tổ chức' : 'Họ và tên'}<span class="required">*</span>`;
    const nameEl = document.getElementById('formNYCName');
    if (nameEl) nameEl.placeholder = isOrg ? 'Nhập tên tổ chức...' : 'Nhập họ và tên...';
    refreshOrgDocRequired();
}

// Tổ chức: Mã số tổ chức bắt buộc; Số giấy tờ thành lập/đăng ký, Ngày cấp, Nơi cấp không bắt buộc. Nhập Mã số tổ chức thì bỏ báo lỗi
function refreshOrgDocRequired() {
    const code = (document.getElementById('formNYCOrgCode')?.value || '').trim();
    if (code) ['formNYCOrgCode'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('is-invalid');
        const err = el.closest('.form-group').querySelector('.error-message');
        if (err) err.style.display = 'none';
    });
}

function fillNbth(nb) {
    nb = nb || {};
    document.getElementById('nbthName').value = nb.name || '';
    document.getElementById('nbthDob').value = nb.dob || '';
    document.getElementById('nbthDocType').value = nb.docType || 'CCCD';
    document.getElementById('nbthDocNo').value = nb.docNo || '';
    document.getElementById('nbthDocDate').value = nb.docDate || '';
    document.getElementById('nbthDocPlace').value = nb.docPlace || '';
    document.getElementById('nbthPhone').value = nb.phone || '';
    document.getElementById('nbthEmail').value = nb.email || '';
    document.getElementById('nbthCountry').value = nb.country || 'Việt Nam';
    document.getElementById('nbthCity').value = nb.city || '';
    document.getElementById('nbthWard').value = nb.ward || '';
    document.getElementById('nbthAddress').value = nb.address || '';
}

function readNbth() {
    const v = id => document.getElementById(id).value.trim();
    return {
        name: v('nbthName'), dob: v('nbthDob'), docType: v('nbthDocType'), docNo: v('nbthDocNo'),
        docDate: v('nbthDocDate'), docPlace: v('nbthDocPlace'), phone: v('nbthPhone'), email: v('nbthEmail'),
        country: v('nbthCountry'), city: stripAdministrativeCode(v('nbthCity')), ward: v('nbthWard'), address: v('nbthAddress')
    };
}

// Screen Switching
function showListScreen() {
    document.getElementById('screenList').style.display = 'block';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'none';
    reloadRequestList();
    filterData();
}

function closeDetailOrReturn() {
    const params = new URLSearchParams(window.location.search);
    const returnUrl = params.get('returnUrl');
    if (returnUrl) {
        if (window.parent && window.parent !== window && typeof window.parent.openAdminModule === 'function') {
            window.parent.openAdminModule(returnUrl, returnUrl);
            return;
        }
        window.location.href = returnUrl;
        return;
    }
    showListScreen();
}

// Văn bản làm căn cứ yêu cầu bồi thường: bảng nhiều dòng (STT | Tên văn bản, căn cứ | Tải file | Thao tác)
let basisRows = [];

// Chuyển dữ liệu cũ (01 văn bản) sang danh sách
function getBasisDocs(item) {
    if (!item) return [];
    if (Array.isArray(item.vanBanCanCu)) return item.vanBanCanCu;
    if (item.vanBanCanCuTen || item.vanBanCanCuFile) return [{ name: item.vanBanCanCuTen || '', file: item.vanBanCanCuFile || '' }];
    return [];
}

function renderBasisRows() {
    const tbody = document.getElementById('formBasisTableBody');
    if (!tbody) return;
    if (!basisRows.length) basisRows = [{ name: "", file: "" }];
    tbody.innerHTML = basisRows.map((doc, idx) => `
        <tr>
            <td style="text-align: center;">${idx + 1}</td>
            <td>
                <input class="form-control" id="basisName_${idx}" value="${escapeAttr(doc.name || '')}" placeholder="Nhập tên văn bản, căn cứ..." oninput="updateBasisName(${idx}, this.value)">
            </td>
            <td>
                ${doc.file
                    ? `<span style="font-weight: 600; color: #0F766E;"><i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i> ${escapeHtml(doc.file)}</span>`
                    : `<button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('basisFile_${idx}').click()"><i class="fa-solid fa-file-arrow-up"></i> Tải file</button>`}
                <input type="file" id="basisFile_${idx}" style="display:none;" accept=".pdf,.doc,.docx,.jpg,.png" onchange="uploadBasisFile(${idx}, this)">
            </td>
            <td style="text-align: center;">
                <div class="action-flex">
                    <button type="button" class="icon-btn view" ${doc.file ? '' : 'style="opacity:0.35; pointer-events:none;"'} title="Xem file" onclick="viewBasisFile(${idx})"><i class="fa-solid fa-eye"></i></button>
                    <button type="button" class="icon-btn delete" title="Xóa" onclick="deleteBasisRow(${idx})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function addBasisRow() {
    basisRows.push({ name: "", file: "" });
    renderBasisRows();
}

function updateBasisName(index, value) {
    if (basisRows[index]) basisRows[index].name = value;
}

function uploadBasisFile(index, input) {
    if (!basisRows[index] || !input.files || !input.files[0]) return;
    const fileName = input.files[0].name;
    basisRows[index].file = fileName;
    if (!basisRows[index].name) basisRows[index].name = fileName.replace(/\.[^.]+$/, '');
    renderBasisRows();
    showToast(`Đính kèm tập tin: ${fileName} thành công!`, "success");
}

function viewBasisFile(index) {
    const doc = basisRows[index];
    if (doc && doc.file) previewNamedFile(doc.file);
}

function deleteBasisRow(index) {
    const doc = basisRows[index];
    const remove = () => {
        if (basisRows.length === 1) basisRows = [{ name: "", file: "" }];
        else basisRows.splice(index, 1);
        renderBasisRows();
    };
    if (doc && (doc.name || doc.file)) showConfirmModal("Bạn có chắc chắn muốn xóa văn bản, căn cứ này khỏi bảng không?", remove);
    else remove();
}

function getCleanBasisRows() {
    return basisRows
        .filter(doc => (doc.name || '').trim() || (doc.file || '').trim())
        .map(doc => ({ name: (doc.name || '').trim(), file: doc.file || '' }));
}

// Bảng chỉ đọc tại màn chi tiết
function basisTableHtml(docs) {
    if (!docs.length) return `<span style="color: var(--text-muted); font-style: italic;">Chưa cung cấp</span>`;
    return `<table class="custom-table" style="min-width: 520px;">
        <thead><tr><th style="width: 50px; text-align: center;">STT</th><th>Tên văn bản, căn cứ</th><th style="width: 220px;">Tải file</th><th style="width: 110px; text-align: center;">Thao tác</th></tr></thead>
        <tbody>${docs.map((d, i) => `<tr><td style="text-align: center;">${i + 1}</td><td>${escapeHtml(d.name || '--')}</td><td>${d.file ? `<i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i> ${escapeHtml(d.file)}` : '<span style="color: var(--text-muted);">Không có</span>'}</td><td style="text-align: center;">${d.file ? `<a href="#" onclick="event.preventDefault(); previewNamedFile('${escapeAttr(d.file)}');" style="color: var(--secondary-color); text-decoration: none;"><i class="fa-solid fa-eye"></i> Xem file</a>` : '-'}</td></tr>`).join('')}</tbody>
    </table>`;
}
function showFormScreen(id = null, mode = null) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'block';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'none';

    clearValidation();

    const title = document.getElementById('formScreenTitle');
    const formRequestId = document.getElementById('formRequestId');
    const item = id ? requestList.find(r => r.id === id) : null;
    // create: Tạo yêu cầu; accept: Tiếp nhận (Chờ tiếp nhận); supplement: Tiếp nhận hồ sơ bổ sung (Yêu cầu bổ sung); edit: Sửa thông tin hồ sơ (Xác minh CQGQBT)
    formMode = mode || (!id ? 'create' : item && item.status === XD_ST.CHO_TIEP_NHAN ? 'accept' : item && item.status === XD_ST.YCBS ? 'supplement' : 'edit');

    formRequestId.value = id || '';
    setupVuViecFields(item);

    // Khối THÔNG TIN YÊU CẦU BỔ SUNG / THÔNG TIN HỒ SƠ BỊ TRẢ LẠI trên cùng của form: hồ sơ đang hoặc từng Yêu cầu bổ sung / Bị trả lại
    renderXdHistoryBlock('formSupplementBlock', item ? BTNN_WF.renderXdSupplementHistoryHtml(item) : '');
    renderXdHistoryBlock('formReturnedAlertBlock', item ? BTNN_WF.renderXdReturnHistoryHtml(item) : '');

    const statusGroup = document.getElementById('formStatusGroup');
    const statusBadge = document.getElementById('formStatusBadge');
    if (statusGroup && statusBadge) {
        statusGroup.style.display = formMode === 'create' ? 'none' : 'block';
        statusBadge.innerHTML = item ? BTNN_WF.statusBadge(item.status) : '';
    }
    // Lưu: Tạo yêu cầu / Tiếp nhận / Tiếp nhận hồ sơ bổ sung -> Xác minh CQGQBT (không trình Lãnh đạo); Sửa thông tin hồ sơ -> giữ trạng thái
    const submitBtn = document.getElementById('btnFormSubmit');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu';
    }

    setReceiveMethodField(BTNN_WF.RECEIVE_METHODS.TRUC_TIEP, false);
    document.getElementById('formLinhVuc').value = 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH';
    document.getElementById('formNYCName').value = '';
    ['formNYCOrgCode', 'formNYCOrgDocNo', 'formNYCOrgDocDate', 'formNYCOrgDocPlace', 'formNYCRepName', 'formNYCRepPosition', 'nbthOrgName', 'nbthOrgCode']
        .forEach(fid => { document.getElementById(fid).value = ''; });
    applyNycTypeConstraint(NYC_TYPE.CA_NHAN);
    document.getElementById('formNYCRole').value = NYC_ROLE.NBTH;
    toggleNbthBlock();
    document.getElementById('formNYCDob').value = '';
    document.getElementById('formNYCDocType').value = 'CCCD';
    document.getElementById('formNYCDocNo').value = '';
    document.getElementById('formNYCDocDate').value = '';
    document.getElementById('formNYCDocPlace').value = '';
    document.getElementById('formNYCPhone').value = '';
    document.getElementById('formNYCEmail').value = '';
    document.getElementById('formNYCCountry').value = 'Việt Nam';
    toggleCountrySelect('Việt Nam');
    document.getElementById('formNYCTinhThanh').value = '';
    document.getElementById('formNYCTinhThanhText').value = '';
    document.getElementById('formNYCPhuongXa').value = '';
    document.getElementById('formNYCPhuongXaText').value = '';
    document.getElementById('formNYCAddressDetail').value = '';
    document.getElementById('formHanhVi').value = '';
    const defaultRadio = document.querySelector(`input[name="formHinhThucNhan"][value="${NOTIFY_METHOD_DEFAULT}"]`);
    if (defaultRadio) defaultRadio.checked = true;
    const diaChiNhanEl = document.getElementById('formDiaChiNhan');
    if (diaChiNhanEl) {
        diaChiNhanEl.value = '';
        diaChiNhanEl.dataset.autofilled = '1';
        diaChiNhanEl.classList.remove('is-invalid');
    }
    const errDiaChiNhan = document.getElementById('errFormDiaChiNhan');
    if (errDiaChiNhan) errDiaChiNhan.style.display = 'none';
    handleNotifyMethodChange(NOTIFY_METHOD_DEFAULT, 'xd');
    toggleFormEmailRequired();
    fillNbth(null);

    // Nạp thông tin Văn bản làm căn cứ yêu cầu bồi thường
    basisRows = getBasisDocs(item).map(d => ({ name: d.name || '', file: d.file || '' }));
    renderBasisRows();

    formDocRows = [{ name: "", file: "" }];
    renderFormDocs();

    if (id && item) {
        // Yêu cầu bổ sung: thao tác Tiếp nhận mở lại màn Tiếp nhận (cùng tiêu đề, Lưu -> Xác minh CQGQBT)
        title.innerHTML = formMode === 'accept' || formMode === 'supplement'
            ? `<i class="fa-solid fa-file-import"></i> TIẾP NHẬN YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`
            : `<i class="fa-solid fa-file-pen"></i> SỬA THÔNG TIN HỒ SƠ YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`;
        setReceiveMethodField(BTNN_WF.normalizeReceiveMethod(item.hinhThucTiepNhan), isFromReception(item));
        document.getElementById('formLinhVuc').value = item.linhVuc;
        document.getElementById('formNYCName').value = item.nycName || '';
        // Loại người yêu cầu trước (danh sách Tư cách lọc theo Loại), sau đó chọn Tư cách của hồ sơ
        applyNycTypeConstraint(nycTypeOf(item));
        const roleSel = document.getElementById('formNYCRole');
        roleSel.value = NYC_ROLE_CODES[item.nycRole] || item.nycRole || NYC_ROLE.NBTH;
        toggleNbthBlock();
        document.getElementById('formNYCOrgCode').value = item.nycOrgCode || '';
        document.getElementById('formNYCOrgDocNo').value = item.nycOrgDocNo || '';
        document.getElementById('formNYCOrgDocDate').value = item.nycOrgDocDate || '';
        document.getElementById('formNYCOrgDocPlace').value = item.nycOrgDocPlace || '';
        document.getElementById('formNYCRepName').value = item.nycRepName || '';
        document.getElementById('formNYCRepPosition').value = item.nycRepPosition || '';
        document.getElementById('nbthOrgName').value = item.nbthOrgName || '';
        document.getElementById('nbthOrgCode').value = item.nbthOrgCode || '';
        refreshOrgDocRequired();
        document.getElementById('formNYCDob').value = item.nycDob || '';
        document.getElementById('formNYCDocType').value = item.nycDocType || 'CCCD';
        document.getElementById('formNYCDocNo').value = item.nycDocNo || '';
        document.getElementById('formNYCDocDate').value = item.nycDocDate || '';
        document.getElementById('formNYCDocPlace').value = item.nycDocPlace || '';
        document.getElementById('formNYCPhone').value = item.nycPhone || '';
        document.getElementById('formNYCEmail').value = item.nycEmail || '';
        document.getElementById('formNYCCountry').value = item.nycCountry || 'Việt Nam';
        toggleCountrySelect(item.nycCountry || 'Việt Nam');
        if ((item.nycCountry || 'Việt Nam') === 'Việt Nam') {
            document.getElementById('formNYCTinhThanh').value = normalizeProvinceOption(item.nycTinhThanh);
            updateWardOptions(item.nycPhuongXa || inferWard(item.nycTinhThanh));
        } else {
            document.getElementById('formNYCTinhThanhText').value = item.nycTinhThanh;
            document.getElementById('formNYCPhuongXaText').value = item.nycPhuongXa || "";
        }
        document.getElementById('formNYCAddressDetail').value = item.nycAddressDetail || '';
        document.getElementById('formHanhVi').value = item.hanhVi || '';
        const receiveValue = normalizeNotifyMethod(item.hinhThucNhan);
        const targetRadio = document.querySelector(`input[name="formHinhThucNhan"][value="${receiveValue}"]`);
        if (targetRadio) targetRadio.checked = true;
        else {
            const fallback = document.querySelector(`input[name="formHinhThucNhan"][value="${NOTIFY_METHOD_DEFAULT}"]`);
            if (fallback) fallback.checked = true;
        }
        const editDiaChiEl = document.getElementById('formDiaChiNhan');
        if (editDiaChiEl) {
            editDiaChiEl.value = item.diaChiNhanThongBao || '';
            editDiaChiEl.dataset.autofilled = item.diaChiNhanThongBao ? '0' : '1';
            handleNotifyMethodChange(targetRadio ? receiveValue : NOTIFY_METHOD_DEFAULT, 'xd');
            if (item.diaChiNhanThongBao) editDiaChiEl.value = item.diaChiNhanThongBao;
        }
        fillNbth(item.nbth);

        formDocRows = item.attachedDocs && item.attachedDocs.length
            ? item.attachedDocs.map(doc => ({ name: doc.name || "", file: doc.file || "" }))
            : item.attachedFile ? [{ name: "Tài liệu đính kèm", file: item.attachedFile }] : [{ name: "", file: "" }];
        renderFormDocs();
    } else {
        title.innerHTML = `<i class="fa-solid fa-file-signature"></i> THÊM MỚI YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`;
    }

    toggleNbthBlock();
}

// Hồ sơ đến từ Tiếp nhận hồ sơ (không phải Thêm mới trực tiếp tại màn hình này)
function isFromReception(item) {
    return Boolean(item && item.source && item.source !== 'Tạo trực tiếp');
}

// Hình thức tiếp nhận (DM_25):
// - Hồ sơ đến từ Tiếp nhận hồ sơ: mặc định theo giá trị đã tiếp nhận, cho phép điều chỉnh trong đủ 04 giá trị DM_25;
// - Thêm mới trực tiếp: chỉ Trực tiếp / Qua dịch vụ bưu chính (hồ sơ cũ có giá trị khác hiển thị chỉ đọc).
function setReceiveMethodField(value, fromReception) {
    const sel = document.getElementById('formHinhThucTiepNhan');
    if (!sel) return;
    const M = BTNN_WF.RECEIVE_METHODS;
    if (fromReception) {
        const all = BTNN_WF.RECEIVE_METHOD_ORDER;
        sel.innerHTML = all.map(v => `<option value="${escapeAttr(v)}">${escapeHtml(v)}</option>`).join('');
        sel.value = all.includes(value) ? value : M.TRUC_TIEP;
        sel.disabled = false;
        return;
    }
    const formValues = BTNN_WF.FORM_RECEIVE_METHODS;
    sel.innerHTML = formValues.map(v => `<option value="${escapeAttr(v)}">${escapeHtml(v)}</option>`).join('');
    const isInherited = BTNN_WF.RECEIVE_METHOD_ORDER.includes(value) && !formValues.includes(value);
    if (isInherited) sel.insertAdjacentHTML('beforeend', `<option value="${escapeAttr(value)}" data-inherited="1">${escapeHtml(value)}</option>`);
    sel.value = isInherited || formValues.includes(value) ? value : M.TRUC_TIEP;
    sel.disabled = isInherited;
}

function showProcessScreen(id) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'block';
    document.getElementById('screenDetail').style.display = 'none';

    const item = requestList.find(r => r.id === id);
    if (!item) return;

    document.getElementById('processRequestId').value = id;
    document.getElementById('lblProcCode').innerText = item.code;
    document.getElementById('lblProcName').innerText = item.nycName || '';
    document.getElementById('lblProcLinhVuc').innerText = item.linhVuc || '';
    document.getElementById('lblProcPhone').innerText = item.nycPhone || item.nycEmail || '';
    document.getElementById('lblProcHanhVi').innerText = item.hanhVi || '';

    document.getElementById('procBasis').value = item.procBasis || "";
    // Cơ quan giải quyết bồi thường: chọn trên hệ thống (đơn vị gốc đã cấu hình luồng Giải quyết YCBT)
    clearValidation();
    renderAgencyOptions();
    const agencyId = BTNN_WF.xdTargetUnitId(item);
    const agencyOk = Boolean(agencyId) && BTNN_WF.gqConfiguredRoots().includes(agencyId);
    document.getElementById('procTargetAgency').value = agencyOk ? agencyId : '';
    document.getElementById('procTargetAgencyInput').value = agencyId ? BTNN_WF.unitName(agencyId) : (item.procTargetAgency || "");
    // Cơ quan đã chọn trước đây không có trên hệ thống / chưa cấu hình luồng Giải quyết YCBT: yêu cầu chọn lại trong danh sách
    if (!agencyOk && (agencyId || item.procTargetAgency)) {
        const err = document.getElementById('procTargetAgencyError');
        if (err) err.textContent = agencyId ? BTNN_WF.xdTargetNotConfiguredMsg(item) : 'Cơ quan không có trên hệ thống. Vui lòng chọn trong danh sách';
        markInvalid(document.getElementById('procTargetAgencyInput'), null);
    }
    document.getElementById('procReason').value = item.procReason || "";
    // Khối THÔNG TIN HỒ SƠ BỊ TRẢ LẠI: hồ sơ đang Bị trả lại hoặc trước đó từng bị trả lại
    renderXdHistoryBlock('procReturnedNotice', BTNN_WF.renderXdReturnHistoryHtml(item));

    clearAttachedFile('procDecisionFile', 'procFileAttachmentInfo');
    if (item.procDecisionFile) {
        displayAttachedFile('procDecisionFile', 'procFileAttachmentInfo', item.procDecisionFile);
    }
}

function statusBadgeClass(status) {
    switch (status) {
        case 'Chờ tiếp nhận': return 'badge-pending';
        case 'Yêu cầu bổ sung': return 'badge-warning';
        case 'Xác minh CQGQBT': return 'badge-verifying';
        case 'Chờ duyệt': return 'badge-approval';
        case 'Bị trả lại': return 'badge-returned';
        case 'Không thụ lý': return 'badge-rejected';
        case 'Đã chuyển CQGQBT': return 'badge-transfer';
        default: return 'badge-draft';
    }
}

// Badge trạng thái + dòng phụ: chỉ hiển thị tên Nội dung trình (Chờ duyệt / Bị trả lại)
function statusCellHtml(item) {
    const label = BTNN_WF.approvalLabel(item);
    return `<span class="badge ${statusBadgeClass(item.status)}">${escapeHtml(item.status)}</span>${label ? `<div class="approval-sub">${escapeHtml(label)}</div>` : ''}`;
}

function fileLinksHtml(files) {
    if (!files || !files.length) return `<span style="color: var(--text-muted); font-style: italic;">Không có tệp đính kèm</span>`;
    return files.map(f => `<div style="font-weight: 600; color: #0F766E; margin-bottom: 4px;"><i class="fa-solid fa-file-pdf"></i> ${escapeHtml(f.name || f)} <a href="#" onclick="event.preventDefault(); previewNamedFile('${escapeAttr(f.name || f)}');" style="margin-left: 12px; color: var(--secondary-color); text-decoration: none;"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a></div>`).join('');
}

function getClaimCodeLinkHtml(code) {
    if (!code || code === '-' || code === '--') return '';
    const url = `quan_ly_boi_thuong.html?id=${encodeURIComponent(code)}`;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="ycbt-hyperlink" title="Click để mở chi tiết Giải quyết yêu cầu bồi thường ở tab mới" style="display:inline-flex; align-items:center; gap:6px; font-weight:700; color:#7c3aed; text-decoration:none; padding:4px 10px; background:#f5f3ff; border:1px solid #ddd6fe; border-radius:6px; font-size:13px; transition:all 0.2s;" onmouseover="this.style.background='#ede9fe'; this.style.borderColor='#c4b5fd';" onmouseout="this.style.background='#f5f3ff'; this.style.borderColor='#ddd6fe';">
        <i class="fa-solid fa-scale-balanced" style="color:#7c3aed;"></i>
        <span>${escapeHtml(code)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:11px; opacity:0.8;"></i>
    </a>`;
}

// Mã hồ sơ YCBT: 01 mã BT- sinh khi Chuyển CQGQBT (dùng chung cho cả hồ sơ có nhánh Phục hồi danh dự)
function hasYcbtCode(item) {
    return Boolean(item && item.claimCode && item.claimCode !== '-' && item.claimCode !== '--');
}

function renderYcbtCodesCell(item) {
    if (item.status !== XD_ST.DA_CHUYEN || !hasYcbtCode(item)) return '-';
    return `<a href="quan_ly_boi_thuong.html?id=${encodeURIComponent(item.claimCode)}" target="_blank" rel="noopener noreferrer" style="font-weight:700; color:#7c3aed; text-decoration:none;" title="Mở chi tiết hồ sơ Giải quyết yêu cầu bồi thường ở tab mới" onclick="event.stopPropagation();">${escapeHtml(item.claimCode)}</a>`;
}

function openYcbtRecord(code) {
    window.open(`quan_ly_boi_thuong.html?id=${encodeURIComponent(code)}`, '_blank');
}

function toggleDetailProfileSection(forceExpand) {
    const body = document.getElementById('dtProfileBody');
    const icon = document.getElementById('dtProfileToggleIcon');
    const folder = document.getElementById('dtProfileFolderIcon');
    const txt = document.getElementById('dtProfileToggleText');
    if (!body) return;
    const isExpanded = forceExpand !== undefined ? !forceExpand : (body.style.display !== 'none');
    const willOpen = !isExpanded;
    body.style.display = willOpen ? 'block' : 'none';
    if (icon) icon.className = willOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    if (folder) folder.className = willOpen ? 'fa-solid fa-folder-open' : 'fa-solid fa-folder-closed';
    if (txt) txt.textContent = willOpen ? 'Thu gọn' : 'Mở rộng';
}

function showDetailScreen(id) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'block';

    const item = requestList.find(r => r.id === id);
    if (!item) return;

    // Ghi nhận thời điểm cán bộ chủ trì xem hồ sơ được phân công (không ảnh hưởng quyền thu hồi của lãnh đạo)
    if (!readOnlyView && !isXdViewOnly() && BTNN_WF.markViewed(item, getMe())) saveItem(item);

    document.getElementById('detailRequestId').value = id;
    document.getElementById('dtCode').innerText = item.code;

    // 1. Tiêu đề màn hình - Trạng thái xử lý
    const dtHeaderStatus = document.getElementById('dtHeaderStatus');
    if (dtHeaderStatus) dtHeaderStatus.innerHTML = statusCellHtml(item);

    // Mặc định Thu gọn khối Chi tiết hồ sơ xác định Cơ quan giải quyết bồi thường
    toggleDetailProfileSection(false);

    // Thông báo chế độ xem (nếu mở dạng liên kết read-only)
    const notice = document.getElementById('dtNoticeBlock');
    if (notice) {
        if (readOnlyView) {
            notice.innerHTML = `<i class="fa-solid fa-eye"></i> Chế độ xem: mở từ liên kết hồ sơ liên quan, không thực hiện thao tác xử lý.`;
            notice.style.cssText = 'background:#EFF6FF; border-left:4px solid #3b82f6; display:block; padding: 12px 16px; border-radius: var(--border-radius-md); margin-bottom: 16px; font-size: 13px; line-height: 1.55;';
        } else {
            notice.style.display = 'none';
            notice.innerHTML = '';
        }
    }

    // 2. THÔNG TIN HỒ SƠ BỊ TRẢ LẠI: hiển thị khi hồ sơ đang Bị trả lại hoặc trước đó từng bị trả lại (danh sách các lần, mới nhất trước)
    renderXdHistoryBlock('dtReturnedBlock', BTNN_WF.renderXdReturnHistoryHtml(item));

    // 3. TỆP VĂN BẢN TRÌNH KÝ: hiển thị khi Chờ duyệt (Chờ duyệt / Bị trả lại luôn là Ký số trên hệ thống; Ký ngoài ban hành trực tiếp, không trình)
    const pendingSignBlock = document.getElementById('dtPendingSignBlock');
    if (pendingSignBlock) {
        const isChoDuyet = item.status === XD_ST.CHO_DUYET || item.status === 'Chờ duyệt';
        const isKySo = !item.approval || !item.approval.signDoc || item.approval.signDoc.method !== 'Ký ngoài';
        if (isChoDuyet) {
            pendingSignBlock.style.display = 'block';
            const metaEl = document.getElementById('dtPendingSignFileMeta');
            if (metaEl) metaEl.textContent = 'Định dạng PDF • Hình thức: Ký số trên hệ thống';
            const badgeEl = document.getElementById('dtPendingSignBadge');
            if (badgeEl) badgeEl.innerHTML = '<i class="fa-solid fa-clock"></i> Chờ Lãnh đạo ký số';
            const signFile = (item.approval && item.approval.signDoc && item.approval.signDoc.file)
                || (item.approval && item.approval.files && item.approval.files[0] && item.approval.files[0].name)
                || item.procDecisionFile
                || `Van_ban_trinh_ky_${item.code}.pdf`;
            const nameEl = document.getElementById('dtPendingSignFileName');
            if (nameEl) nameEl.textContent = signFile;
            const linkEl = document.getElementById('dtPendingSignFileLink');
            if (linkEl) {
                linkEl.onclick = function(e) {
                    e.preventDefault();
                    previewNamedFile(signFile);
                };
            }
        } else {
            pendingSignBlock.style.display = 'none';
        }
    }

    // 4. THÔNG TIN YÊU CẦU BỔ SUNG: hiển thị khi hồ sơ đang Yêu cầu bổ sung hoặc trước đó từng Yêu cầu bổ sung (danh sách các lần, mới nhất trước)
    renderXdHistoryBlock('dtSupplementBlock', BTNN_WF.renderXdSupplementHistoryHtml(item));

    // 5. THÔNG TIN KHÔNG THỤ LÝ: Chỉ hiển thị khi trạng thái Không thụ lý
    // Kèm file PDF đã ký số trên hệ thống hoặc Ký ban hành ở ngoài
    const rejectionBlock = document.getElementById('dtRejectionBlock');
    if (rejectionBlock) {
        const isKtl = item.status === XD_ST.KTL || item.status === 'Không thụ lý' || item.status === 'Bị từ chối' || item.status === XD_ST.KHONG_THU_LY;
        if (isKtl) {
            rejectionBlock.style.display = 'block';
            const a = item.approval || {};
            const reason = item.ktlReason || a.reason || item.rejectionReason || a.content || item.procReason || 'Không thuộc phạm vi thụ lý theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.';
            const reasonEl = document.getElementById('dtRejectionReason');
            if (reasonEl) reasonEl.innerText = reason;

            const sd = a.signDoc;
            const ktlFile = (sd && (sd.signedFile || sd.file))
                || item.rejectionFile
                || item.procDecisionFile
                || (a.files && a.files[0] && a.files[0].name)
                || `Thong_bao_khong_thu_ly_${item.code}.pdf`;
            const isOffline = (sd && sd.method === 'Ký ngoài') || (item.rejectionFile && !item.approval);

            const nameEl = document.getElementById('dtRejectionFileName');
            if (nameEl) nameEl.textContent = ktlFile;
            const badgeEl = document.getElementById('dtRejectionFileMethodBadge');
            if (badgeEl) {
                badgeEl.className = 'badge';
                badgeEl.style.cssText = isOffline
                    ? 'margin-left: 8px; font-size: 10.5px; background: #fee2e2; color: #991b1b;'
                    : 'margin-left: 8px; font-size: 10.5px; background: #dcfce7; color: #166534;';
                badgeEl.innerHTML = isOffline ? '<i class="fa-solid fa-stamp"></i> Ký ban hành ở ngoài' : '<i class="fa-solid fa-signature"></i> Ký số trên hệ thống';
            }
            const linkEl = document.getElementById('dtRejectionFileActionLink');
            if (linkEl) {
                linkEl.onclick = function(e) {
                    e.preventDefault();
                    previewNamedFile(ktlFile);
                };
            }
        } else {
            rejectionBlock.style.display = 'none';
        }
    }

    // Các trường chi tiết tiếp nhận & người yêu cầu
    document.getElementById('dtMaVuViec').innerText = item.maVuViec || '-';
    document.getElementById('dtVuViecLienQuan').innerText = vuViecLabel(item.vuViecLienQuan) || '-';
    document.getElementById('dtHinhThucTiepNhan').innerText = BTNN_WF.normalizeReceiveMethod(item.hinhThucTiepNhan) || BTNN_WF.RECEIVE_METHODS.TRUC_TIEP;
    document.getElementById('dtLinhVuc').innerText = item.linhVuc || '';

    // Người yêu cầu bồi thường: Tư cách → Loại người yêu cầu → trường theo Cá nhân / Tổ chức (không hiển thị Giới tính)
    const nycType = nycTypeOf(item);
    const isOrg = nycType === NYC_TYPE.TO_CHUC;
    document.getElementById('dtNYCRole').innerText = NYC_ROLE_CODES[item.nycRole] || item.nycRole || '';
    document.getElementById('dtNYCType').innerText = nycType;
    document.getElementById('dtNYCNameLabel').innerText = isOrg ? 'Tên tổ chức' : 'Họ và tên';
    document.getElementById('dtNYCName').innerText = item.nycName || '';
    document.querySelectorAll('#screenDetail .dt-nyc-individual').forEach(el => { el.style.display = isOrg ? 'none' : ''; });
    document.querySelectorAll('#screenDetail .dt-nyc-org').forEach(el => { el.style.display = isOrg ? '' : 'none'; });
    document.getElementById('dtNYCDob').innerText = item.nycDob || '--';
    document.getElementById('dtNYCDocInfo').innerText = item.nycDocNo ? `${BTNN_WF.normalizePersonalDocType(item.nycDocType)} - Số: ${item.nycDocNo}${item.nycDocDate ? ` (Cấp ngày: ${item.nycDocDate}${item.nycDocPlace ? ' tại ' + item.nycDocPlace : ''})` : ''}` : '--';
    document.getElementById('dtNYCOrgCode').innerText = item.nycOrgCode || '--';
    document.getElementById('dtNYCOrgDoc').innerText = item.nycOrgDocNo ? `Số: ${item.nycOrgDocNo}${item.nycOrgDocDate ? ` (Cấp ngày: ${item.nycOrgDocDate}${item.nycOrgDocPlace ? ' tại ' + item.nycOrgDocPlace : ''})` : ''}` : '--';
    document.getElementById('dtNYCRepName').innerText = item.nycRepName || '--';
    document.getElementById('dtNYCRepPosition').innerText = item.nycRepPosition || '--';
    document.getElementById('dtNYCPhone').innerText = item.nycPhone || 'Chưa cung cấp';
    document.getElementById('dtNYCEmail').innerText = item.nycEmail || 'Chưa cung cấp';
    document.getElementById('dtNYCCountry').innerText = item.nycCountry || 'Việt Nam';
    document.getElementById('dtNYCAddress').innerText = joinAddress(item.nycAddressDetail, item.nycPhuongXa, item.nycTinhThanh) || 'Chưa cung cấp';

    const attachedDocs = item.attachedDocs && item.attachedDocs.length ? item.attachedDocs : (item.attachedFile ? [{ name: 'Tài liệu đính kèm', file: item.attachedFile }] : []);
    document.getElementById('dtFileAttachment').innerHTML = attachedDocs.length
        ? attachedDocs.map(doc => `
            <div style="font-weight: 600; color: #0F766E; margin-bottom: 6px;">
                <i class="fa-solid fa-file-pdf"></i> ${escapeHtml(doc.name || 'Tài liệu')} - ${escapeHtml(doc.file || 'Chưa có file')}
                ${doc.file ? `<a href="#" onclick="event.preventDefault(); previewNamedFile('${escapeAttr(doc.file)}');" style="margin-left: 12px; color: var(--secondary-color); text-decoration: none;"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a>` : ''}
            </div>`).join('')
        : `<span style="color: var(--text-muted); font-style: italic;">Không có file đính kèm</span>`;

    // Người bị thiệt hại
    const nb = item.nbth;
    const nbBlock = document.getElementById('dtNbthBlock');
    const isOrgVictim = item.nycRole === NYC_ROLE.TC_KE_THUA;
    const showNb = isOrgVictim ? Boolean(item.nbthOrgName) : Boolean(nb && nb.name && (item.nycRole || NYC_ROLE.NBTH) !== NYC_ROLE.NBTH);
    if (showNb) {
        nbBlock.style.display = 'block';
        document.getElementById('dtNbthTitle').innerText = isOrgVictim ? 'THÔNG TIN TỔ CHỨC BỊ THIỆT HẠI ĐÃ CHẤM DỨT TỒN TẠI' : 'THÔNG TIN NGƯỜI BỊ THIỆT HẠI';
        nbBlock.querySelectorAll('.dt-nbth-org').forEach(el => { el.style.display = isOrgVictim ? '' : 'none'; });
        nbBlock.querySelectorAll('.dt-nbth-person').forEach(el => { el.style.display = isOrgVictim ? 'none' : ''; });
        if (isOrgVictim) {
            document.getElementById('dtNbthOrgName').innerText = item.nbthOrgName || '--';
            document.getElementById('dtNbthOrgCode').innerText = item.nbthOrgCode || '--';
        } else {
            document.getElementById('dtNbthName').innerText = nb.name;
            document.getElementById('dtNbthDob').innerText = nb.dob || '--';
            document.getElementById('dtNbthDoc').innerText = `${BTNN_WF.normalizePersonalDocType(nb.docType)} - Số:${nb.docNo || '--'}${nb.docDate ? ` (Cấp ngày: ${nb.docDate}${nb.docPlace ? ' tại ' + nb.docPlace : ''})` : ''}`;
            document.getElementById('dtNbthPhone').innerText = nb.phone || 'Chưa cung cấp';
            document.getElementById('dtNbthEmail').innerText = nb.email || 'Chưa cung cấp';
            document.getElementById('dtNbthAddress').innerText = joinAddress(nb.address, nb.ward, nb.city) || 'Chưa cung cấp';
        }
    } else {
        nbBlock.style.display = 'none';
    }

    document.getElementById('dtHanhVi').innerText = item.hanhVi || '';
    document.getElementById('dtHinhThucNhan').innerText = normalizeNotifyMethod(item.hinhThucNhan);
    const dtDiaChiEl = document.getElementById('dtDiaChiNhan');
    if (dtDiaChiEl) dtDiaChiEl.innerText = item.diaChiNhanThongBao || (item.hinhThucNhan === 'Trực tiếp' ? 'Nhận trực tiếp tại trụ sở cơ quan giải quyết bồi thường' : 'VNeID / Cổng Dịch vụ công quốc gia');
    document.getElementById('dtVanBanCanCu').innerHTML = basisTableHtml(getBasisDocs(item));
    document.getElementById('dtStatus').innerHTML = statusCellHtml(item);

    // 6. KẾT QUẢ XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG
    const verificationBlock = document.getElementById('dtVerificationResultBlock');
    if (verificationBlock) {
        if (item.procBasis || item.procTargetAgency || item.status === XD_ST.DA_CHUYEN || item.status === 'Đã chuyển CQGQBT' || BTNN_WF.approvalKindOf(item) === BTNN_WF.KIND_KQXD) {
            verificationBlock.style.display = 'block';
            document.getElementById('dtProcBasis').innerText = item.procBasis || 'Chưa cập nhật';
            document.getElementById('dtProcTargetAgency').innerText = item.procTargetAgency || 'Chưa cập nhật';
            document.getElementById('dtProcReason').innerText = item.procReason || 'Chưa cập nhật';
            document.getElementById('dtProcDecisionFile').innerHTML = item.procDecisionFile ? fileLinksHtml([{ name: item.procDecisionFile }]) : `<span style="color: var(--text-muted); font-style: italic;">Chưa đính kèm quyết định</span>`;
        } else {
            verificationBlock.style.display = 'none';
        }
    }

    // 7. KẾT QUẢ CHUYỂN CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG: Chỉ hiển thị khi Đã chuyển CQGQBT
    // Bổ sung file PDF văn bản kết quả xác định CQGQBT (Ký số trên hệ thống hoặc Ký ban hành ở ngoài)
    const transferBlock = document.getElementById('dtTransferBlock');
    if (transferBlock) {
        const isTransferred = item.status === XD_ST.DA_CHUYEN || item.status === 'Đã chuyển CQGQBT' || item.status === 'Hoàn thành';
        if (isTransferred) {
            transferBlock.style.display = 'block';
            const tr = item.transfer || {};
            document.getElementById('dtTransferAgency').innerText = tr.targetUnitId ? BTNN_WF.unitName(tr.targetUnitId) : (item.procTargetAgency || '--');
            document.getElementById('dtTransferContent').innerText = tr.content || '--';
            document.getElementById('dtTransferFiles').innerHTML = fileLinksHtml(tr.files || []);
            document.getElementById('dtTransferAt').innerText = tr.at ? `${tr.at} - ${tr.by ? BTNN_WF.userName(tr.by) : 'Hệ thống'}${tr.auto ? ' (tự động chuyển)' : ''}` : '--';
            
            const claimCodeEl = document.getElementById('dtClaimCode');
            if (claimCodeEl) {
                claimCodeEl.innerHTML = hasYcbtCode(item) ? getClaimCodeLinkHtml(item.claimCode) : (item.claimCode || '--');
            }

            // Bổ sung file PDF văn bản kết quả xác định CQGQBT
            const a = item.approval || {};
            const sd = a.signDoc;
            const decFile = (sd && (sd.signedFile || sd.file))
                || item.procDecisionFile
                || (tr.files && tr.files[0] && tr.files[0].name)
                || `Quyet_dinh_xac_dinh_CQGQBT_${item.code}.pdf`;
            const isOffline = (sd && sd.method === 'Ký ngoài') || (item.procDecisionFile && (!sd || sd.method === 'Ký ngoài'));

            const decNameEl = document.getElementById('dtTransferDecisionFileName');
            if (decNameEl) decNameEl.textContent = decFile;
            const decBadgeEl = document.getElementById('dtTransferDecisionMethodBadge');
            if (decBadgeEl) {
                decBadgeEl.className = 'badge';
                decBadgeEl.style.cssText = isOffline
                    ? 'margin-left: 8px; font-size: 10.5px; background: #fed7aa; color: #9a3412;'
                    : 'margin-left: 8px; font-size: 10.5px; background: #dcfce7; color: #166534;';
                decBadgeEl.innerHTML = isOffline ? '<i class="fa-solid fa-stamp"></i> Ký ban hành ở ngoài' : '<i class="fa-solid fa-signature"></i> Ký số trên hệ thống';
            }
            const decLinkEl = document.getElementById('dtTransferDecisionFileLink');
            if (decLinkEl) {
                decLinkEl.onclick = function(e) {
                    e.preventDefault();
                    previewNamedFile(decFile);
                };
            }
        } else {
            transferBlock.style.display = 'none';
        }
    }

    // 8. QUÁ TRÌNH PHÂN CÔNG & 9. LỊCH SỬ XỬ LÝ (Hiển thị dạng thẻ độc lập)
    const routesEl = document.getElementById('dtRoutes');
    if (routesEl) routesEl.innerHTML = BTNN_WF.renderRoutesHtml(item);
    const historyEl = document.getElementById('dtHistory');
    if (historyEl) historyEl.innerHTML = renderXdHistoryHtml(item);

    // Nút thao tác theo trạng thái và vai trò
    const footer = document.getElementById('detailWorkflowActions');
    footer.innerHTML = `<button class="btn btn-secondary" onclick="closeDetailOrReturn()">Đóng</button>`;
    // UBND cấp tỉnh (chỉ xem): không có thao tác xử lý, phê duyệt
    if (readOnlyView || isXdViewOnly()) return;

    // Lãnh đạo: chỉ Ký duyệt / Từ chối hồ sơ Chờ duyệt được giao đích danh ở cấp hiện hành (cấp trước: Phê duyệt; cấp cuối: Ký duyệt)
    if (!isChuTri(item)) {
        if (item.status === XD_ST.CHO_DUYET && BTNN_WF.canApprove(item, getMe())) {
            const code = escapeAttr(item.code);
            footer.innerHTML += `<button class="btn btn-danger" onclick="BTNN_LD.openDecision('${code}','reject', afterXdLeaderAction)" style="background:#ef4444; color:#fff; border:none;"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button>`
                + `<button class="btn btn-primary" onclick="BTNN_LD.openDecision('${code}','approve', afterXdLeaderAction)"><i class="fa-solid fa-file-signature"></i> ${escapeHtml(BTNN_WF.approveVerb(item))}</button>`;
        }
        return;
    }

    // Cán bộ xử lý: thao tác theo trạng thái; nút chính (Tiếp nhận / Cập nhật kết quả / Cập nhật) luôn đặt cuối thanh nút
    // - Chờ tiếp nhận: Yêu cầu bổ sung, Không thụ lý, Tiếp nhận
    // - Xác minh CQGQBT: Cập nhật kết quả
    // - Bị trả lại: Yêu cầu bổ sung, Không thụ lý, Cập nhật (mở lại nội dung trình trước đó theo Loại trình bị trả lại)
    // - Yêu cầu bổ sung: Tiếp nhận (mở lại màn Tiếp nhận; Lưu -> Xác minh CQGQBT)
    // - Chờ duyệt / Không thụ lý / Đã chuyển CQGQBT: chỉ xem
    const btnYcbs = `<button class="btn btn-warning" onclick="openSignSubmitModal('${id}', '${XD_KIND.YCBS}')" style="background:#f59e0b; color:#fff; border:none;"><i class="fa-solid fa-file-circle-question"></i> Yêu cầu bổ sung</button>`;
    const btnKtl = `<button class="btn btn-danger" onclick="openSignSubmitModal('${id}', '${XD_KIND.KTL}')" style="background:#ef4444; color:#fff; border:none;"><i class="fa-solid fa-ban"></i> Không thụ lý</button>`;
    if (item.status === XD_ST.CHO_TIEP_NHAN) {
        footer.innerHTML += btnYcbs + btnKtl + `<button class="btn btn-success" onclick="acceptRequest('${id}', true)"><i class="fa-solid fa-file-import"></i> Tiếp nhận</button>`;
    } else if (item.status === XD_ST.XAC_MINH) {
        footer.innerHTML += `<button class="btn btn-primary" onclick="showProcessScreen('${id}')"><i class="fa-solid fa-scale-balanced"></i> Cập nhật kết quả</button>`;
    } else if (item.status === XD_ST.BI_TRA_LAI) {
        footer.innerHTML += btnYcbs + btnKtl + `<button class="btn btn-primary" onclick="updateReturned('${id}')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật</button>`;
    } else if (item.status === XD_ST.YCBS) {
        footer.innerHTML += `<button class="btn btn-success" onclick="showFormScreen('${id}', 'supplement')"><i class="fa-solid fa-file-import"></i> Tiếp nhận</button>`;
    }

}


// Action methods
function acceptRequest(id, fromDetail = false) {
    showFormScreen(id, 'accept');
}

// Kiểm tra nhanh các trường bắt buộc khi gửi từ màn chi tiết
function validateRequestItem(item) {
    const isOrg = nycTypeOf(item) === NYC_TYPE.TO_CHUC;
    const idOk = isOrg
        ? item.nycRepName && item.nycRepPosition && item.nycOrgCode
        : item.nycDob && item.nycDocNo;
    if (!item.nycName || !idOk || !item.nycPhone || !item.hanhVi) return "Vui lòng nhập đầy đủ thông tin bắt buộc trước khi gửi yêu cầu!";
    return '';
}

function addFormDocRow() {
    formDocRows.push({ name: "", file: "" });
    renderFormDocs();
}

function renderFormDocs() {
    const tbody = document.getElementById('formDocsTableBody');
    if (!tbody) return;
    if (!formDocRows.length) formDocRows = [{ name: "", file: "" }];
    tbody.innerHTML = formDocRows.map((doc, idx) => `
        <tr>
            <td style="text-align: center;">${idx + 1}</td>
            <td>
                <input class="form-control" id="formDocName_${idx}" value="${escapeAttr(doc.name || '')}" placeholder="Nhập tên tài liệu..." oninput="updateFormDocName(${idx}, this.value)">
            </td>
            <td>
                ${doc.file
                    ? `<span style="font-weight: 600; color: #0F766E;"><i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i> ${escapeHtml(doc.file)}</span>`
                    : `<button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('formDocFile_${idx}').click()"><i class="fa-solid fa-file-arrow-up"></i> Tải lên</button>`}
                <input type="file" id="formDocFile_${idx}" style="display:none;" onchange="uploadFormDoc(${idx}, this)">
            </td>
            <td style="text-align: center;">
                <div class="action-flex">
                    <button type="button" class="icon-btn view" ${doc.file ? '' : 'style="opacity:0.35; pointer-events:none;"'} title="Xem file" onclick="viewFormDoc(${idx})"><i class="fa-solid fa-eye"></i></button>
                    <button type="button" class="icon-btn delete" title="Xóa tài liệu" onclick="deleteFormDoc(${idx})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateFormDocName(index, value) {
    if (formDocRows[index]) formDocRows[index].name = value;
}

function uploadFormDoc(index, input) {
    if (!formDocRows[index] || !input.files || !input.files[0]) return;
    const fileName = input.files[0].name;
    formDocRows[index].file = fileName;
    if (!formDocRows[index].name) formDocRows[index].name = fileName.replace(/\.[^.]+$/, '');
    renderFormDocs();
    showToast(`Đính kèm tập tin: ${fileName} thành công!`, "success");
}

function viewFormDoc(index) {
    const doc = formDocRows[index];
    if (!doc || !doc.file) return;
    previewNamedFile(doc.file);
}

function previewNamedFile(fileName) {
    const preview = window.open('', '_blank');
    if (preview) {
        preview.document.write(`<title>${escapeHtml(fileName)}</title><body style="font-family:Arial;padding:24px;"><h3>Xem file đính kèm</h3><p>${escapeHtml(fileName)}</p></body>`);
        preview.document.close();
    }
}

function deleteFormDoc(index) {
    const doc = formDocRows[index];
    const remove = () => {
        if (formDocRows.length === 1) {
            formDocRows = [{ name: "", file: "" }];
        } else {
            formDocRows.splice(index, 1);
        }
        renderFormDocs();
    };
    if (doc && (doc.name || doc.file)) {
        showConfirmModal("Bạn có chắc chắn muốn xóa tài liệu này khỏi bảng không?", remove);
    } else {
        remove();
    }
}

function updateWardOptions(selectedWard = "") {
    const provinceInput = document.getElementById('formNYCTinhThanh');
    const wardInput = document.getElementById('formNYCPhuongXa');
    const wardOptions = document.getElementById('wardOptions');
    if (!provinceInput || !wardInput || !wardOptions) return;
    const province = stripAdministrativeCode(provinceInput.value);
    const wards = wardCatalog[province] || [];
    wardOptions.innerHTML = wards.map(ward => `<option value="${escapeAttr(ward)}"></option>`).join('');
    wardInput.disabled = wards.length === 0;
    wardInput.placeholder = wards.length ? "Gõ Mã hoặc Tên Phường/Xã..." : "Vui lòng chọn Tỉnh/Thành phố trước";
    if (selectedWard) {
        wardInput.value = selectedWard;
    } else if (!wards.includes(wardInput.value)) {
        wardInput.value = "";
    }
}

function stripAdministrativeCode(value) {
    return String(value || '').replace(/^\d+\s*-\s*/, '').trim();
}

function normalizeProvinceOption(value) {
    const province = stripAdministrativeCode(value);
    const options = Array.from(document.querySelectorAll('#provinceOptions option'));
    const found = options.find(option => stripAdministrativeCode(option.value) === province || option.value.includes(province));
    return found ? found.value : value || '';
}

function inferWard(provinceValue) {
    const wards = wardCatalog[stripAdministrativeCode(provinceValue)] || wardCatalog[stripAdministrativeCode(normalizeProvinceOption(provinceValue))] || [];
    return wards[0] || '';
}

function mapReceptionFieldGroup(value) {
    const map = {
        "hành chính": "TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH",
        "hình sự": "TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ",
        "dân sự": "TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ",
        "tố tụng hành chính": "TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH",
        "thi hành án hình sự": "TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ",
        "thi hành án dân sự": "TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ"
    };
    return map[value] || value || "TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH";
}

function formatDateValue(date) {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
    return escapeHtml(value);
}

// File Selection Utilities
function triggerFileInput(id) {
    document.getElementById(id).click();
}

function handleFileSelected(inputId, infoDivId) {
    const input = document.getElementById(inputId);
    const infoDiv = document.getElementById(infoDivId);
    if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        fileCache[inputId] = fileName;

        // Update display
        infoDiv.style.display = 'flex';
        infoDiv.querySelector('.file-name').innerText = fileName;

        showToast(`Đính kèm tập tin: ${fileName} thành công!`, "success");
    }
}

function displayAttachedFile(inputId, infoDivId, fileName) {
    const infoDiv = document.getElementById(infoDivId);
    fileCache[inputId] = fileName;
    infoDiv.style.display = 'flex';
    infoDiv.querySelector('.file-name').innerText = fileName;
}

function clearAttachedFile(inputId, infoDivId) {
    const input = document.getElementById(inputId);
    const infoDiv = document.getElementById(infoDivId);
    if (input) input.value = '';
    fileCache[inputId] = null;
    if (infoDiv) infoDiv.style.display = 'none';
}

function removeAttachedFile(inputId, infoDivId) {
    showConfirmModal("Bạn có chắc chắn muốn gỡ tệp đính kèm này không?", () => {
        clearAttachedFile(inputId, infoDivId);
        showToast("Đã gỡ tệp đính kèm!", "info");
    });
}

function clearValidation() {
    const inputs = document.querySelectorAll('.is-invalid');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(err => {
        err.style.display = 'none';
    });
}

// Save Main Creation/Edition form (Removed references to formHinhThucThuLy)
// ---------------- Mã vụ việc khi Thêm mới trực tiếp ----------------
// - Vụ việc mới (mặc định): hệ thống sinh Mã vụ việc khi lưu; cho chọn Vụ việc liên quan (không bắt buộc).
// - Vụ việc đã có Mã vụ việc: bắt buộc chọn vụ việc; hồ sơ mang Mã vụ việc đã chọn, không sinh mã mới.
// - Sửa hồ sơ tạo trực tiếp là vụ việc mới: chỉ cho cập nhật Vụ việc liên quan; Mã vụ việc chỉ đọc.
function listVuViecSafe() { return BTNN_WF.listVuViec ? BTNN_WF.listVuViec() : []; }
function vuViecLabel(code) {
    if (!code) return '';
    const v = listVuViecSafe().find(x => x.code === code);
    return v && v.nycName ? `${code} - ${v.nycName}` : code;
}
// Giá trị ô chọn vụ việc -> Mã vụ việc; '' khi trống; null khi không thuộc danh sách
function parseVuViecInput(raw, excludeCode) {
    const text = String(raw || '').trim();
    if (!text) return '';
    const m = text.match(/^VVBT-\d{4}-\d+/i);
    const code = m ? m[0].toUpperCase() : '';
    return code && code !== excludeCode && listVuViecSafe().some(v => v.code === code) ? code : null;
}
function setupVuViecFields(item) {
    const block = document.getElementById('formVuViecBlock');
    if (!block) return;
    const isCreate = !item;
    const canEditLienQuan = isCreate || (item.source === 'Tạo trực tiếp' && item.vvMode !== 'existing');
    block.style.display = canEditLienQuan ? '' : 'none';
    document.getElementById('formVvModeGroup').style.display = isCreate ? '' : 'none';
    const exclude = item ? item.maVuViec : '';
    document.getElementById('formVvOptions').innerHTML = listVuViecSafe().filter(v => v.code !== exclude)
        .map(v => `<option value="${escapeHtml(v.nycName ? `${v.code} - ${v.nycName}` : v.code)}"></option>`).join('');
    const radioNew = document.querySelector('input[name="formVvMode"][value="new"]');
    if (radioNew) radioNew.checked = true;
    document.getElementById('formVvExisting').value = '';
    document.getElementById('formVvLienQuan').value = item ? vuViecLabel(item.vuViecLienQuan) : '';
    onVvModeChange();
}
function onVvModeChange() {
    const checked = document.querySelector('input[name="formVvMode"]:checked');
    const existing = !!checked && checked.value === 'existing';
    document.getElementById('formVvExistingGroup').style.display = existing ? '' : 'none';
    document.getElementById('formVvLienQuanGroup').style.display = existing ? 'none' : '';
    ['formVvExisting', 'formVvLienQuan'].forEach(fid => {
        const el = document.getElementById(fid);
        el.classList.remove('is-invalid');
        const err = el.closest('.form-group').querySelector('.error-message');
        if (err) err.style.display = 'none';
    });
}
// Đọc lựa chọn Mã vụ việc trên form; trả về { mode, maVuViec, vuViecLienQuan, invalidEl }
function readVuViecFields(item) {
    const block = document.getElementById('formVuViecBlock');
    const out = { mode: item ? (item.vvMode || '') : 'new', maVuViec: '', vuViecLienQuan: item ? (item.vuViecLienQuan || '') : '', invalidEl: null };
    if (!block || block.style.display === 'none') return out;
    const checked = document.querySelector('input[name="formVvMode"]:checked');
    if (!item && checked && checked.value === 'existing') {
        out.mode = 'existing';
        out.vuViecLienQuan = '';
        const el = document.getElementById('formVvExisting');
        const code = parseVuViecInput(el.value, '');
        if (!code) {
            document.getElementById('errFormVvExisting').textContent = el.value.trim() ? 'Vụ việc không tồn tại trên hệ thống' : 'Đây là trường bắt buộc';
            out.invalidEl = el;
        } else out.maVuViec = code;
        return out;
    }
    const el = document.getElementById('formVvLienQuan');
    const code = parseVuViecInput(el.value, item ? item.maVuViec : '');
    if (code === null) out.invalidEl = el; else out.vuViecLienQuan = code;
    return out;
}

function markInvalid(el, firstInvalid) {
    el.classList.add('is-invalid');
    const err = el.closest('.form-group').querySelector('.error-message');
    if (err) err.style.display = 'block';
    return firstInvalid || el;
}

let submitAfterSaveId = null;
function saveForm(isDraft) {
    clearValidation();

    const formRequestId = document.getElementById('formRequestId').value;
    const name = document.getElementById('formNYCName').value.trim();
    const dob = document.getElementById('formNYCDob').value.trim();
    const docNo = document.getElementById('formNYCDocNo').value.trim();
    const docDate = document.getElementById('formNYCDocDate').value.trim();
    const docPlace = document.getElementById('formNYCDocPlace').value.trim();
    const phone = document.getElementById('formNYCPhone').value.trim();
    const email = document.getElementById('formNYCEmail').value.trim();
    const country = document.getElementById('formNYCCountry').value;
    const city = country === 'Việt Nam'
        ? stripAdministrativeCode(document.getElementById('formNYCTinhThanh').value)
        : document.getElementById('formNYCTinhThanhText').value.trim();
    const ward = country === 'Việt Nam'
        ? document.getElementById('formNYCPhuongXa').value.trim()
        : document.getElementById('formNYCPhuongXaText').value.trim();
    const addressDetail = document.getElementById('formNYCAddressDetail').value.trim();
    const hanhVi = document.getElementById('formHanhVi').value.trim();
    const role = document.getElementById('formNYCRole').value;
    const nycType = getFormNycType();
    const isOrg = nycType === NYC_TYPE.TO_CHUC;
    const fv = fid => document.getElementById(fid).value.trim();
    const orgCode = isOrg ? fv('formNYCOrgCode') : '';
    const orgDocNo = isOrg ? fv('formNYCOrgDocNo') : '';
    const orgDocDate = isOrg ? fv('formNYCOrgDocDate') : '';
    const orgDocPlace = isOrg ? fv('formNYCOrgDocPlace') : '';
    const repName = isOrg ? fv('formNYCRepName') : '';
    const repPosition = isOrg ? fv('formNYCRepPosition') : '';
    const isOrgVictim = role === NYC_ROLE.TC_KE_THUA;
    const hasNbth = Boolean(role) && role !== NYC_ROLE.NBTH && !isOrgVictim;
    const nbth = hasNbth ? readNbth() : null;
    const nbthOrgName = isOrgVictim ? fv('nbthOrgName') : '';
    const nbthOrgCode = isOrgVictim ? fv('nbthOrgCode') : '';
    const cleanDocs = formDocRows
        .filter(doc => (doc.name || '').trim() || (doc.file || '').trim())
        .map(doc => ({ name: (doc.name || '').trim(), file: doc.file || '' }));

    // Mã vụ việc / Vụ việc liên quan: kiểm tra cả khi Lưu nháp (Mã vụ việc xác định ngay khi tạo hồ sơ)
    const formItem = formRequestId ? requestList.find(r => r.id === formRequestId) : null;
    const vv = readVuViecFields(formItem);
    if (vv.invalidEl) markInvalid(vv.invalidEl, null);
    if (isDraft && vv.invalidEl) { vv.invalidEl.focus(); return; }

    if (!isDraft) {
        let firstInvalid = vv.invalidEl;
        // Cá nhân: Họ và tên, Ngày sinh, giấy tờ thân nhân; Tổ chức: Tên tổ chức, Mã số tổ chức, người đại diện (giấy tờ thành lập/đăng ký không bắt buộc)
        const req = isOrg
            ? [['formNYCName', name], ['formNYCOrgCode', orgCode], ['formNYCRepName', repName], ['formNYCRepPosition', repPosition]]
            : [['formNYCName', name], ['formNYCDob', dob], ['formNYCDocNo', docNo], ['formNYCDocDate', docDate], ['formNYCDocPlace', docPlace]];
        req.unshift(['formNYCRole', role]);
        req.push(['formNYCPhone', phone], ['formNYCAddressDetail', addressDetail], ['formHanhVi', hanhVi]);
        req.forEach(([fid, val]) => { if (!val) firstInvalid = markInvalid(document.getElementById(fid), firstInvalid); });
        if (!city) firstInvalid = markInvalid(country === 'Việt Nam' ? document.getElementById('formNYCTinhThanh') : document.getElementById('formNYCTinhThanhText'), firstInvalid);
        if (!ward) firstInvalid = markInvalid(country === 'Việt Nam' ? document.getElementById('formNYCPhuongXa') : document.getElementById('formNYCPhuongXaText'), firstInvalid);
        if (isOrgVictim && !nbthOrgName) firstInvalid = markInvalid(document.getElementById('nbthOrgName'), firstInvalid);
        if (hasNbth) {
            [['nbthName', nbth.name], ['nbthDob', nbth.dob], ['nbthDocNo', nbth.docNo]].forEach(([fid, val]) => { if (!val) firstInvalid = markInvalid(document.getElementById(fid), firstInvalid); });
        }
        const diaChiNhanEl = document.getElementById('formDiaChiNhan');
        const diaChiNhan = (diaChiNhanEl ? diaChiNhanEl.value : '').trim();
        if (!diaChiNhan) {
            firstInvalid = markInvalid(diaChiNhanEl, firstInvalid);
        }
        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }
    }

    const notifyRadio = document.querySelector('input[name="formHinhThucNhan"]:checked');
    const notifyMethod = notifyRadio ? notifyRadio.value : NOTIFY_METHOD_DEFAULT;
    const diaChiNhan = (document.getElementById('formDiaChiNhan')?.value || '').trim();

    const data = {
        hinhThucTiepNhan: document.getElementById('formHinhThucTiepNhan').value,
        linhVuc: document.getElementById('formLinhVuc').value,
        nycType: nycType, nycName: name, nycRole: role,
        nycDob: isOrg ? '' : dob, nycDocType: isOrg ? '' : document.getElementById('formNYCDocType').value,
        nycDocNo: isOrg ? '' : docNo, nycDocDate: isOrg ? '' : docDate, nycDocPlace: isOrg ? '' : docPlace,
        nycOrgCode: orgCode, nycOrgDocNo: orgDocNo, nycOrgDocDate: orgDocDate, nycOrgDocPlace: orgDocPlace,
        nycRepName: repName, nycRepPosition: repPosition,
        nycPhone: phone, nycEmail: email, nycCountry: country, nycTinhThanh: city, nycPhuongXa: ward, nycAddressDetail: addressDetail,
        nbth: nbth, nbthOrgName: nbthOrgName, nbthOrgCode: nbthOrgCode,
        hanhVi: hanhVi,
        vanBanCanCu: getCleanBasisRows(),
        hinhThucNhan: notifyMethod,
        diaChiNhanThongBao: diaChiNhan,
        attachedDocs: cleanDocs,
        attachedFile: cleanDocs[0] ? cleanDocs[0].file : "",
        vuViecLienQuan: vv.vuViecLienQuan || ''
    };

    if (formRequestId) {
        const item = requestList.find(r => r.id === formRequestId);
        if (!item) return;
        Object.assign(item, data);
        if (!isDraft) {
            if (formMode === 'accept' || formMode === 'supplement') {
                // Tiếp nhận / Tiếp nhận hồ sơ bổ sung: Lưu -> Xác minh CQGQBT (không trình Lãnh đạo)
                const r = item.routes && item.routes.length ? item.routes[item.routes.length - 1] : null;
                if (formMode === 'accept' && r && r.state === 'Chưa xử lý') r.state = 'Đã xử lý';
                item.status = XD_ST.XAC_MINH;
                BTNN_WF.addHistory(item, formMode === 'accept' ? 'Tiếp nhận hồ sơ' : 'Tiếp nhận hồ sơ bổ sung', `Cán bộ xử lý ${formMode === 'accept' ? 'tiếp nhận, nhập liệu' : 'tiếp nhận hồ sơ bổ sung, cập nhật'} hồ sơ. Hồ sơ chuyển [${XD_ST.XAC_MINH}].`);
                saveItem(item);
                showToast(`Đã ${formMode === 'accept' ? 'tiếp nhận' : 'tiếp nhận hồ sơ bổ sung'} hồ sơ ${item.code}. Trạng thái: [${XD_ST.XAC_MINH}].`, "success");
            } else {
                BTNN_WF.addHistory(item, 'Cập nhật thông tin', 'Sửa thông tin hồ sơ.');
                saveItem(item);
                showToast(`Đã lưu thông tin hồ sơ ${item.code}!`, "success");
            }
        } else {
            BTNN_WF.addHistory(item, 'Cập nhật thông tin', 'Cập nhật thông tin hồ sơ.');
            saveItem(item);
            showToast(`Đã lưu hồ sơ ${item.code}!`, "success");
        }
    } else {
        const me = BTNN_WF.getCurrentUser();
        const newCode = BTNN_WF.nextCode('XD');
        const item = Object.assign({
            id: 'WF-' + newCode,
            code: newCode,
            // Hồ sơ tạo trực tiếp: Vụ việc mới thì sinh Mã vụ việc toàn trình mới; Vụ việc đã có Mã vụ việc thì mang mã đã chọn
            maVuViec: vv.mode === 'existing' && vv.maVuViec ? vv.maVuViec : BTNN_WF.nextVuViecCode(),
            vvMode: vv.mode === 'existing' ? 'existing' : 'new',
            module: 'XD',
            loaiYeuCau: REQUEST_TYPE_XDCQ,
            source: 'Tạo trực tiếp',
            date: formatDateValue(new Date()),
            receivedAt: BTNN_WF.nowText(),
            receivedBy: me.name,
            rootUnitId: BTNN_WF.getRootId(me.unitId),
            currentUnitId: me.unitId,
            createdBy: me.id,
            chuTri: me.id,
            routes: [],
            approval: null,
            history: [],
            status: XD_ST.XAC_MINH,
            procBasis: "", procTargetAgency: "", procTargetUnitId: "", procReason: "", procDecisionFile: "", claimCode: "-"
        }, data);
        // Tạo yêu cầu: Lưu -> Xác minh CQGQBT (không trình Lãnh đạo)
        BTNN_WF.addHistory(item, 'Tạo yêu cầu', `Cán bộ tạo trực tiếp, đồng thời là cán bộ chủ trì. Hồ sơ chuyển [${XD_ST.XAC_MINH}].`);
        saveItem(item);
        // Ghi sổ đăng ký: Mã hồ sơ XD- gắn với Mã vụ việc
        BTNN_WF.linkVuViec(item.code, item.maVuViec);
        requestList.unshift(item);
        showToast(`Đã tạo hồ sơ ${newCode}. Trạng thái: [${XD_ST.XAC_MINH}].`, "success");
    }
    showListScreen();
}

// Lưu kết quả xác định CQGQBT (giữ trạng thái); "Lưu và trình ký" mở Popup Trình ký - Nội dung trình Kết quả xác định CQGQBT
function saveProcessResult(andSubmit) {
    const id = document.getElementById('processRequestId').value;
    const basis = document.getElementById('procBasis').value.trim();
    const agencyId = document.getElementById('procTargetAgency').value;
    const reason = document.getElementById('procReason').value.trim();
    const file = fileCache['procDecisionFile'];

    clearValidation();
    let firstInvalid = null;
    if (!basis) firstInvalid = markInvalid(document.getElementById('procBasis'), firstInvalid);
    if (!agencyId) {
        const inp = document.getElementById('procTargetAgencyInput');
        const err = document.getElementById('procTargetAgencyError');
        if (err) err.textContent = inp.value.trim() ? 'Cơ quan không có trên hệ thống. Vui lòng chọn trong danh sách' : 'Đây là trường bắt buộc';
        firstInvalid = markInvalid(inp, firstInvalid);
    }
    if (!reason) firstInvalid = markInvalid(document.getElementById('procReason'), firstInvalid);
    if (firstInvalid) { showToast("Vui lòng nhập đầy đủ thông tin bắt buộc!", "error"); firstInvalid.focus(); return; }

    const item = requestList.find(r => r.id === id);
    if (!item) return;
    item.procBasis = basis;
    item.procTargetUnitId = agencyId;
    item.procTargetAgency = BTNN_WF.unitName(agencyId);
    item.procReason = reason;
    if (file) item.procDecisionFile = file;
    BTNN_WF.addHistory(item, 'Cập nhật kết quả xác định CQGQBT', `Cơ quan giải quyết bồi thường: ${item.procTargetAgency}.`);
    saveItem(item);
    showToast("Đã lưu kết quả xác định cơ quan giải quyết bồi thường!", "success");
    if (andSubmit) {
        openSignSubmitModal(id, XD_KIND.KQ);
    } else {
        showDetailScreen(id);
    }
}

// ---------------- Combobox Cơ quan giải quyết bồi thường (MH03) ----------------
// Danh sách: đơn vị gốc đã cấu hình luồng Giải quyết YCBT; tìm theo Tên / Mã đơn vị; chỉ chọn trong danh sách
function renderAgencyOptions() {
    const dropdown = document.getElementById('procTargetAgencyDropdown');
    if (!dropdown) return;
    const ids = BTNN_WF.gqConfiguredRoots().slice().sort((a, b) => BTNN_WF.unitName(a).localeCompare(BTNN_WF.unitName(b), 'vi'));
    dropdown.innerHTML = ids.length
        ? ids.map(u => `<div class="searchable-select-option" data-id="${escapeAttr(u)}" onclick="selectAgencyOption('${escapeAttr(u)}')">${escapeHtml(BTNN_WF.unitName(u))}<span style="color:var(--text-muted); font-size:11.5px; margin-left:6px;">${escapeHtml(u)}</span></div>`).join('')
        : '<div class="searchable-select-option" style="color:var(--text-muted); cursor:default;">Chưa có cơ quan được cấu hình luồng Giải quyết YCBT</div>';
}

// Save spawned claim

// Search & Pagination Logic
function applyFilters() {
    currentPage = 1;
    filterData();
}

function resetFilters() {
    document.getElementById('filterCode').value = '';
    document.getElementById('filterCaseCode').value = '';
    document.getElementById('filterClaimCode').value = '';
    document.getElementById('filterName').value = '';
    document.getElementById('filterVictim').value = '';
    document.getElementById('filterLinhVuc').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterApprovalKind').value = '';
    document.getElementById('filterUnit').value = '';
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    document.getElementById('filterFromDate').value = formatDateValue(threeMonthsAgo);
    document.getElementById('filterToDate').value = formatDateValue(today);
    currentPage = 1;
    filterData();
}

function filterData() {
    const code = document.getElementById('filterCode').value.trim().toLowerCase();
    const claimCode = document.getElementById('filterClaimCode').value.trim().toLowerCase();
    const name = document.getElementById('filterName').value.trim().toLowerCase();
    const caseCode = document.getElementById('filterCaseCode').value.trim().toLowerCase();
    const victim = document.getElementById('filterVictim').value.trim().toLowerCase();
    const lv = document.getElementById('filterLinhVuc').value;
    const status = document.getElementById('filterStatus').value;
    const approvalKind = document.getElementById('filterApprovalKind').value;
    const unit = document.getElementById('filterUnit').value;

    const parseDate = (str) => {
        if (!str) return null;
        const p = String(str).trim().split(' ').pop().split('/');
        return p.length === 3 ? new Date(p[2], p[1] - 1, p[0]) : null;
    };
    const fromDate = parseDate(document.getElementById('filterFromDate').value);
    const toDate = parseDate(document.getElementById('filterToDate').value);

    updateXdTabCounts();
    filteredList = requestList.filter(item => {
        if (!xdInTab(xdTab, item)) return false;
        if (code && !item.code.toLowerCase().includes(code)) return false;
        if (claimCode && !(item.claimCode || '').toLowerCase().includes(claimCode)) return false;
        if (name && !(item.nycName || '').toLowerCase().includes(name)) return false;
        if (caseCode && !(item.maVuViec || '').toLowerCase().includes(caseCode)) return false;
        if (victim && !String(victimNameOf(item)).replace(/^-$/, '').toLowerCase().includes(victim)) return false;
        if (lv && item.linhVuc !== lv) return false;
        if (status && item.status !== status) return false;
        // Nội dung trình chỉ áp dụng cho hồ sơ Chờ duyệt / Bị trả lại
        if (approvalKind && BTNN_WF.approvalKindOf(item) !== approvalKind) return false;
        if (unit) {
            if (unit.indexOf('type:') === 0) { if (authorityTypeOf(item) !== unit.slice(5)) return false; }
            else if (item.rootUnitId !== unit) return false;
        }
        const itemDate = parseDate(item.receivedAt || item.date);
        if (itemDate) {
            if (fromDate && itemDate < fromDate) return false;
            if (toDate && itemDate > toDate) return false;
        }
        return true;
    }).sort((a, b) => parseDate(b.receivedAt || b.date) - parseDate(a.receivedAt || a.date));

    renderTable();
}

function changePageSize(size) {
    pageSize = parseInt(size);
    currentPage = 1;
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    const total = filteredList.length;
    const totalPages = Math.ceil(total / pageSize);

    if (total === 0) {
        tbody.innerHTML = `<tr><td colspan="13" style="text-align:center; color:var(--text-muted); padding:30px; font-style:italic;">Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</td></tr>`;
        document.getElementById('rangeText').innerText = "Hiển thị 0-0 trong số 0 bản ghi";
        renderPagination(0);
        return;
    }

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, total);
    document.getElementById('rangeText').innerText = `Hiển thị ${startIdx + 1}-${endIdx} trong số ${total} bản ghi`;

    filteredList.slice(startIdx, endIdx).forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I' && !e.target.closest('.icon-btn') && e.target.type !== 'checkbox') {
                showDetailScreen(item.id);
            }
        };
        const hanhVi = item.hanhVi || '';
        tr.innerHTML = `
            <td style="text-align:center;">${startIdx + index + 1}</td>
            <td style="text-align:center;"><strong>${escapeHtml(item.code)}</strong></td>
            <td style="text-align:center;">${escapeHtml(item.maVuViec || '-')}</td>
            <td><strong>${escapeHtml(item.nycName || '(Chưa nhập)')}</strong></td>
            <td>${escapeHtml(victimNameOf(item))}</td>
            <td style="font-size:12px; color:var(--text-muted);">${escapeHtml((item.linhVuc || '').replace("TRONG HOẠT ĐỘNG ", ""))}</td>
            <td style="font-size:12px; color:var(--text-muted);" title="${escapeAttr(hanhVi)}">${escapeHtml(hanhVi.length > 50 ? hanhVi.slice(0, 50) + "..." : hanhVi)}</td>
            <td style="text-align:center;">${escapeHtml(item.date || '')}</td>
            <td>${unitWithTypeHtml(item.rootUnitId, true)}</td>
            <td>${escapeHtml(item.chuTri ? BTNN_WF.userName(item.chuTri) : '--')}</td>
            <td style="text-align:center;">${renderYcbtCodesCell(item)}</td>
            <td style="text-align:center;">${statusCellHtml(item)}</td>
            <td class="action-cell">
                <div class="action-flex">${getActionButtons(item) || '<span class="muted-action">-</span>'}</div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderPagination(totalPages);
}

// Lưới danh sách: 05 thao tác cố định theo thứ tự Tiếp nhận | Yêu cầu bổ sung | Từ chối | Cập nhật | Chuyển CQGQBT.
// Thao tác chưa đủ điều kiện thực hiện vẫn hiển thị nhưng mờ (disabled), kèm chú thích lý do.
function getActionButtons(item) {
    // UBND cấp tỉnh (chỉ xem): không có thao tác xử lý, phê duyệt, thu hồi
    if (readOnlyView || isXdViewOnly()) return '';
    // Lãnh đạo: Phê duyệt / Từ chối (tab Chờ xử lý); Thu hồi (tab Đã xử lý, khi bên nhận chưa xử lý)
    if (isLeaderMe()) {
        const me = getMe();
        const off = (cls, icon, title) => `<button class="icon-btn ${cls} is-disabled" title="${escapeAttr(title)}" disabled><i class="${icon}"></i></button>`;
        if (xdTab === 'done') {
            return BTNN_LD.canRecall(item, me)
                ? `<button class="icon-btn edit" title="Thu hồi" onclick="BTNN_LD.confirmRecall('${escapeAttr(item.code)}', afterXdLeaderAction)"><i class="fa-solid fa-rotate-left"></i></button>`
                : off('edit', 'fa-solid fa-rotate-left', 'Thu hồi');
        }
        // Cấp trước: Phê duyệt; cấp cuối: Ký duyệt
        return BTNN_WF.canApprove(item, me)
            ? `<button class="icon-btn accept" title="${escapeAttr(BTNN_WF.approveVerb(item))}" onclick="BTNN_LD.openDecision('${escapeAttr(item.code)}','approve', afterXdLeaderAction)"><i class="fa-solid fa-circle-check"></i></button><button class="icon-btn delete" title="Từ chối" onclick="BTNN_LD.openDecision('${escapeAttr(item.code)}','reject', afterXdLeaderAction)"><i class="fa-solid fa-circle-xmark"></i></button>`
            : off('accept', 'fa-solid fa-circle-check', 'Phê duyệt') + off('delete', 'fa-solid fa-circle-xmark', 'Từ chối');
    }
    const owner = isChuTri(item);
    const ACTIONS = {
        accept: { icon: 'fa-solid fa-file-import', cls: 'accept', title: 'Tiếp nhận' },
        edit: { icon: 'fa-solid fa-pen', cls: 'view', title: 'Sửa thông tin hồ sơ' },
        update: { icon: 'fa-solid fa-scale-balanced', cls: 'edit', title: 'Cập nhật kết quả' },
        supplement: { icon: 'fa-solid fa-file-circle-question', cls: 'edit', title: 'Yêu cầu bổ sung' },
        ktl: { icon: 'fa-solid fa-ban', cls: 'delete', title: 'Không thụ lý' }
    };
    const on = (key, onclick, title) => `<button class="icon-btn ${ACTIONS[key].cls}" title="${escapeAttr(title || ACTIONS[key].title)}" onclick="${onclick}"><i class="${ACTIONS[key].icon}"></i></button>`;
    const off = (key, title) => `<button class="icon-btn ${ACTIONS[key].cls} is-disabled" title="${escapeAttr(title || (ACTIONS[key].title + ' - Không áp dụng ở trạng thái hiện tại'))}" disabled><i class="${ACTIONS[key].icon}"></i></button>`;
    const notOwner = 'Chỉ cán bộ xử lý được thực hiện';
    const id = item.id;
    const s = item.status;
    const slots = {};
    const act = (key, onclick, title) => { slots[key] = owner ? on(key, onclick, title) : off(key, notOwner); };
    // Yêu cầu bổ sung / Không thụ lý: Chờ tiếp nhận, Bị trả lại (mở Popup Trình ký)
    if ([XD_ST.CHO_TIEP_NHAN, XD_ST.BI_TRA_LAI].includes(s)) {
        act('supplement', `openSignSubmitModal('${id}', '${XD_KIND.YCBS}')`);
        act('ktl', `openSignSubmitModal('${id}', '${XD_KIND.KTL}')`);
    }
    if (s === XD_ST.CHO_TIEP_NHAN) act('accept', `acceptRequest('${id}')`);
    else if (s === XD_ST.YCBS) act('accept', `showFormScreen('${id}', 'supplement')`, 'Tiếp nhận');
    else if (s === XD_ST.XAC_MINH) {
        act('update', `showProcessScreen('${id}')`);
    } else if (s === XD_ST.BI_TRA_LAI) {
        act('update', `updateReturned('${id}')`, `Cập nhật và trình ký lại - ${returnedKindOf(item)}`);
    }
    return ['accept', 'edit', 'update', 'supplement', 'ktl'].map(k => slots[k] || off(k)).join('');
}
// Khối lịch sử (THÔNG TIN YÊU CẦU BỔ SUNG / THÔNG TIN HỒ SƠ BỊ TRẢ LẠI): có nội dung thì hiển thị, rỗng thì ẩn
function renderXdHistoryBlock(id, html) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html || '';
    el.style.display = html ? 'block' : 'none';
}
// Nội dung trình bị trả lại (dữ liệu cũ không có: Kết quả xác định CQGQBT)
function returnedKindOf(item) {
    const k = item && item.returned && item.returned.kind;
    return [XD_KIND.KQ, XD_KIND.YCBS, XD_KIND.KTL].includes(k) ? k : XD_KIND.KQ;
}
// Cập nhật hồ sơ Bị trả lại theo Nội dung trình bị trả lại: Kết quả -> màn Cập nhật kết quả (Lưu và trình ký); YCBS/KTL -> Popup Trình ký
function updateReturned(id) {
    const item = requestList.find(r => r.id === id);
    if (!item) return;
    const kind = returnedKindOf(item);
    if (kind === XD_KIND.KQ) showProcessScreen(id);
    else openSignSubmitModal(id, kind);
}
function renderPagination(totalPages) {
    const container = document.getElementById('paginationPages');
    container.innerHTML = '';

    if (totalPages <= 1) {
        container.innerHTML = `
            <span class="page-item disabled" title="Đầu">&lt;&lt;</span>
            <span class="page-item disabled" title="Trước">&lt;</span>
            <span class="page-item active">1</span>
            <span class="page-item disabled" title="Sau">&gt;</span>
            <span class="page-item disabled" title="Cuối">&gt;&gt;</span>
        `;
        return;
    }

    // Head and Prev buttons
    const headItem = document.createElement('span');
    headItem.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    headItem.innerHTML = '&lt;&lt;';
    headItem.title = "Đầu";
    headItem.onclick = () => { currentPage = 1; renderTable(); };
    container.appendChild(headItem);

    const prevItem = document.createElement('span');
    prevItem.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    prevItem.innerHTML = '&lt;';
    prevItem.title = "Trước";
    prevItem.onclick = () => { if (currentPage > 1) { currentPage--; renderTable(); } };
    container.appendChild(prevItem);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('span');
        pageItem.className = 'page-item' + (currentPage === i ? ' active' : '');
        pageItem.innerText = i;
        pageItem.onclick = () => { currentPage = i; renderTable(); };
        container.appendChild(pageItem);
    }

    // Next and Last buttons
    const nextItem = document.createElement('span');
    nextItem.className = 'page-item' + (currentPage === totalPages ? ' disabled' : '');
    nextItem.innerHTML = '&gt;';
    nextItem.title = "Sau";
    nextItem.onclick = () => { if (currentPage < totalPages) { currentPage++; renderTable(); } };
    container.appendChild(nextItem);

    const lastItem = document.createElement('span');
    lastItem.className = 'page-item' + (currentPage === totalPages ? ' disabled' : '');
    lastItem.innerHTML = '&gt;&gt;';
    lastItem.title = "Cuối";
    lastItem.onclick = () => { currentPage = totalPages; renderTable(); };
    container.appendChild(lastItem);
}

// Toast feedback popup
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.className = 'toast-notif';
    toast.classList.add(type);
    toast.querySelector('span').innerText = message;

    // Add icon classes
    const icon = toast.querySelector('i');
    icon.className = 'fa-solid';
    if (type === 'success') icon.classList.add('fa-circle-check');
    else if (type === 'error') icon.classList.add('fa-circle-xmark');
    else icon.classList.add('fa-circle-info');

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

// Searchable dropdown logic for procTargetAgency
function toggleSearchableDropdown() {
    const dropdown = document.getElementById('procTargetAgencyDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function filterSearchableOptions() {
    const input = document.getElementById('procTargetAgencyInput');
    const filter = input.value.trim().toLowerCase();
    // Gõ lại: bỏ cơ quan đã chọn cho tới khi chọn lại trong danh sách
    const hidden = document.getElementById('procTargetAgency');
    if (hidden && hidden.value && BTNN_WF.unitName(hidden.value).toLowerCase() !== filter) hidden.value = '';
    const dropdown = document.getElementById('procTargetAgencyDropdown');
    const options = dropdown.getElementsByClassName('searchable-select-option');

    dropdown.style.display = 'block';
    for (let i = 0; i < options.length; i++) {
        const text = options[i].textContent || options[i].innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            options[i].style.display = "";
        } else {
            options[i].style.display = "none";
        }
    }
}

function selectAgencyOption(unitId) {
    document.getElementById('procTargetAgencyInput').value = BTNN_WF.unitName(unitId);
    document.getElementById('procTargetAgency').value = unitId;
    document.getElementById('procTargetAgencyDropdown').style.display = 'none';
    clearValidation();
}

// Close the dropdown when clicking outside
document.addEventListener('click', function (event) {
    const wrapper = document.querySelector('.searchable-select-wrapper');
    if (wrapper && !wrapper.contains(event.target)) {
        const dropdown = document.getElementById('procTargetAgencyDropdown');
        if (dropdown) dropdown.style.display = 'none';
    }
});

// Bỏ đánh dấu lỗi khi người dùng nhập/chọn lại giá trị cho trường bắt buộc
['input', 'change'].forEach(evt => document.addEventListener(evt, function (event) {
    const el = event.target;
    if (!el || !el.classList || !el.classList.contains('is-invalid') || !String(el.value || '').trim()) return;
    el.classList.remove('is-invalid');
    const group = el.closest('.form-group');
    const err = group ? group.querySelector('.error-message') : null;
    if (err) err.style.display = 'none';
}));








// ---------------- Popup dùng chung ----------------
function openXdModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('visible'), 10);
}

function closeXdModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('visible');
    setTimeout(() => { modal.style.display = 'none'; }, 200);
}

// Khối tóm tắt hồ sơ trong Popup Trình ký
function approvalSummaryHtml(item, kind) {
    const agency = kind === XD_KIND.KQ ? BTNN_WF.xdTargetUnitId(item) : '';
    return `<div style="font-weight: 700; color: #1e3a8a; margin-bottom: 8px; font-size: 13px; text-transform: uppercase;">
        <i class="fa-solid fa-file-lines"></i> Tóm tắt hồ sơ yêu cầu
    </div>
    <div class="wf-summary-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px;">
        <div><span style="color:#64748b;">Mã hồ sơ:</span> <b style="color:#1e3a8a;">${escapeHtml(item.code || '--')}</b></div>
        <div><span style="color:#64748b;">Mã vụ việc:</span> <b>${escapeHtml(item.maVuViec || '--')}</b></div>
        <div><span style="color:#64748b;">Tên cá nhân/Tổ chức yêu cầu:</span> <b style="color:#1e3a8a;">${escapeHtml(item.nycName || '--')}</b></div>
        <div><span style="color:#64748b;">Ngày tiếp nhận:</span> <b>${escapeHtml(item.date || item.receivedAt || '--')}</b></div>
        <div><span style="color:#64748b;">Trạng thái:</span> ${statusCellHtml(item)}</div>
        <div><span style="color:#64748b;">Cán bộ xử lý:</span> <b>${escapeHtml(item.chuTri ? BTNN_WF.userName(item.chuTri) : '--')}</b></div>
        <div><span style="color:#64748b;">Đơn vị tiếp nhận:</span> <b>${unitWithTypeHtml(item.rootUnitId)}</b></div>
        ${kind === XD_KIND.KQ ? `<div><span style="color:#64748b;">Cơ quan giải quyết bồi thường:</span> <b style="color:#0f766e;">${escapeHtml(agency ? BTNN_WF.unitName(agency) : (item.procTargetAgency || '--'))}</b></div>` : ''}
    </div>`;
}

// Ô "Lãnh đạo phê duyệt": nhóm lãnh đạo của cấp phê duyệt đầu tiên (luồng Xác định CQGQBT - Bộ Tư pháp / Sở Tư pháp)
function fillLeaderSelect(selectId, item) {
    const sel = document.getElementById(selectId);
    const leaders = BTNN_WF.firstLevelLeaders(item);
    sel.innerHTML = leaders.length
        ? '<option value="">-- Chọn Lãnh đạo phê duyệt --</option>' + leaders.map(id => `<option value="${escapeAttr(id)}">${escapeHtml(BTNN_WF.userLabel(id))}</option>`).join('')
        : '<option value="">Cấp phê duyệt đầu tiên chưa cấu hình nhóm lãnh đạo</option>';
    sel.disabled = !leaders.length;
    sel.value = leaders.length === 1 ? leaders[0] : '';
    return leaders;
}

// Dòng "Luồng phê duyệt" (chỉ đọc, một dòng) đặt ngay dưới ô "Lãnh đạo phê duyệt"
function approvalPathHtml(item) {
    return BTNN_WF.approvalPathLineHtml(item)
        || '<div class="wf-path-line" style="font-size:12.5px; color:#b91c1c; margin:4px 0 0;"><b>Luồng phê duyệt:</b> Chưa xác định được cấp phê duyệt.</div>';
}

// Sau khi trình thành công: tải lại danh sách, giữ màn hình đang mở
function afterSubmitted(code, message) {
    reloadRequestList();
    showToast(message, 'success');
    const fresh = requestList.find(r => r.code === code);
    const detailScreen = document.getElementById('screenDetail');
    if (fresh && detailScreen && detailScreen.style.display !== 'none') showDetailScreen(fresh.id);
    else if (document.getElementById('screenList').style.display !== 'none') filterData();
    else showListScreen();
}

// ---------------- Popup Trình ký (dùng chung 03 Nội dung trình: Kết quả xác định CQGQBT / Yêu cầu bổ sung / Không thụ lý) ----------------
// Bước 1: Soạn thông tin & Chọn lãnh đạo (2 cấp); Bước 2 (chỉ Ký số): Định vị chữ ký Lãnh đạo Phòng & Lãnh đạo Đơn vị (02 hộp chữ ký)
const XS_META = {
    [XD_KIND.KQ]: { title: 'TRÌNH KÝ KẾT QUẢ XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG', reasonLabel: '', docTitle: 'VỀ VIỆC XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG', icon: 'fa-scale-balanced' },
    [XD_KIND.YCBS]: { title: 'TRÌNH KÝ YÊU CẦU BỔ SUNG HỒ SƠ', reasonLabel: 'Nội dung yêu cầu bổ sung', docTitle: 'VỀ VIỆC YÊU CẦU BỔ SUNG HỒ SƠ', icon: 'fa-file-circle-question' },
    [XD_KIND.KTL]: { title: 'TRÌNH KÝ KHÔNG THỤ LÝ HỒ SƠ', reasonLabel: 'Lý do không thụ lý', docTitle: 'VỀ VIỆC KHÔNG THỤ LÝ YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG', icon: 'fa-ban' }
};

let xsState = {
    id: '',
    kind: '',
    method: 'Ký số',
    file: '',
    step: 1,
    enableRoomSig: true,
    sigCoords: {
        room: { x: 60, y: 860, w: 220, h: 90 },
        agency: { x: 480, y: 860, w: 245, h: 110 }
    }
};

function fillTwoLeaderSelects(item) {
    const selRoom = document.getElementById('xsOfficerRoomSelect');
    const selAgency = document.getElementById('xsOfficerAgencySelect');
    if (!selRoom || !selAgency) return;

    const path = item ? BTNN_WF.computeApprovalPath(item) : [];
    let roomLeaders = [];
    let agencyLeaders = [];

    if (path.length >= 2) {
        roomLeaders = BTNN_WF.getLeaders(path[0], BTNN_WF.flowTypeOf(item));
        agencyLeaders = BTNN_WF.getLeaders(path[path.length - 1], BTNN_WF.flowTypeOf(item));
    } else if (path.length === 1) {
        agencyLeaders = BTNN_WF.getLeaders(path[0], BTNN_WF.flowTypeOf(item));
    }

    if (roomLeaders.length) {
        selRoom.innerHTML = '<option value="">-- Chọn Lãnh đạo Phòng duyệt --</option>' +
            roomLeaders.map(id => `<option value="${escapeAttr(BTNN_WF.userName(id))}">${escapeHtml(BTNN_WF.userLabel(id))}</option>`).join('');
        selRoom.value = BTNN_WF.userName(roomLeaders[0]);
    } else {
        selRoom.innerHTML = `
            <option value="">-- Chọn Lãnh đạo Phòng duyệt --</option>
            <option value="Trần Văn Hùng" selected>Trần Văn Hùng - Trưởng phòng Nghiệp vụ BTNN</option>
            <option value="Nguyễn Thị Mai">Nguyễn Thị Mai - Phó Trưởng phòng Nghiệp vụ BTNN</option>
        `;
        selRoom.value = 'Trần Văn Hùng';
    }

    if (agencyLeaders.length) {
        selAgency.innerHTML = '<option value="">-- Chọn Lãnh đạo Đơn vị ký số --</option>' +
            agencyLeaders.map(id => `<option value="${escapeAttr(BTNN_WF.userName(id))}">${escapeHtml(BTNN_WF.userLabel(id))}</option>`).join('');
        selAgency.value = BTNN_WF.userName(agencyLeaders[0]);
    } else {
        selAgency.innerHTML = `
            <option value="">-- Chọn Lãnh đạo Đơn vị ký số --</option>
            <option value="Lê Hoàng Nam" selected>Lê Hoàng Nam - Cục trưởng</option>
            <option value="Vũ Thu Trang">Vũ Thu Trang - Phó Cục trưởng</option>
        `;
        selAgency.value = 'Lê Hoàng Nam';
    }
}

function openSignSubmitModal(id, kind) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    const allowed = kind === XD_KIND.KQ
        ? [XD_ST.XAC_MINH, XD_ST.BI_TRA_LAI]
        : [XD_ST.CHO_TIEP_NHAN, XD_ST.BI_TRA_LAI];
    if (!allowed.includes(item.status)) { showToast(`Trạng thái [${item.status}] không cho phép trình ký ${kind}.`, 'error'); return; }
    if (kind === XD_KIND.KQ) {
        if (!(item.procBasis && BTNN_WF.xdTargetUnitId(item) && item.procReason)) {
            showToast(`Hồ sơ ${item.code} chưa có kết quả xác định CQGQBT. Vui lòng Cập nhật kết quả xác định CQGQBT trước khi trình ký.`, 'info');
            return;
        }
        if (!BTNN_WF.xdTargetConfigured(item)) { showToast(BTNN_WF.xdTargetNotConfiguredMsg(item), 'error'); return; }
    }
    const meta = XS_META[kind];
    const prev = item.status === XD_ST.BI_TRA_LAI && returnedKindOf(item) === kind && item.approval && item.approval.kind === kind ? item.approval : null;
    const prevSd = prev && prev.signDoc;
    xsState = {
        id,
        kind,
        method: prevSd ? prevSd.method : 'Ký số',
        file: prevSd ? prevSd.file : (item.procDecisionFile || ''),
        step: 1,
        enableRoomSig: prevSd && prevSd.enableRoomSig !== undefined ? prevSd.enableRoomSig : true,
        sigCoords: prevSd && prevSd.sigCoords ? JSON.parse(JSON.stringify(prevSd.sigCoords)) : {
            room: { x: 60, y: 860, w: 220, h: 90 },
            agency: { x: 480, y: 860, w: 245, h: 110 }
        }
    };
    clearValidation();
    document.getElementById('xsTitle').textContent = meta.title;
    document.getElementById('xsTitleIcon').className = `fa-solid ${meta.icon}`;

    const reasonGroup = document.getElementById('xsReasonGroup');
    if (reasonGroup) {
        reasonGroup.style.display = meta.reasonLabel ? '' : 'none';
        document.getElementById('xsReasonLabel').innerHTML = `${meta.reasonLabel}<span class="required">*</span>`;
        document.getElementById('xsReason').value = prev ? (prev.reason || '') : '';
    }

    const contentEl = document.getElementById('xsContent');
    if (contentEl) contentEl.value = prev ? (prev.content || '') : '';

    document.querySelectorAll('input[name="xsMethod"]').forEach(r => { r.checked = r.value === xsState.method; });

    fillTwoLeaderSelects(item);

    const chkRoom = document.getElementById('xsEnableRoomSig');
    if (chkRoom) chkRoom.checked = xsState.enableRoomSig;
    xsToggleRoomSig(xsState.enableRoomSig);

    // Khối THÔNG TIN HỒ SƠ BỊ TRẢ LẠI: hiển thị trên form trình ký nếu hồ sơ đang bị trả lại hoặc từng bị trả lại
    renderXdHistoryBlock('xsReturnedAlertBlock', BTNN_WF.renderXdReturnHistoryHtml(item));

    xsRenderFile();
    xsApplyMethod();
    xsShowStep(1);
    openXdModal('signSubmitModal');
}

function closeSignSubmitModal() {
    const id = xsState.id;
    const kind = xsState.kind;
    closeXdModal('signSubmitModal');
    if (kind === XD_KIND.KQ && id) {
        showProcessScreen(id);
    }
}

// Hình thức ký: Ký số trên hệ thống (mặc định, 02 bước) / Ký ngoài (tải lên văn bản PDF đã ký & đóng dấu, 01 bước)
function xsSetMethod(method) {
    xsState.method = method;
    if (method === 'Ký ngoài' && xsState.file && !/\.pdf$/i.test(xsState.file)) {
        xsState.file = '';
    }
    xsRenderFile();
    xsApplyMethod();
}

function xsApplyMethod() {
    const online = xsState.method !== 'Ký ngoài';
    const stepper = document.getElementById('xsStepperBar');
    if (stepper) stepper.style.display = online ? 'flex' : 'none';

    const contentGroup = document.getElementById('xsContentGroup');
    if (contentGroup) contentGroup.style.display = online ? 'block' : 'none';

    const approvalSec = document.getElementById('xsApprovalSection');
    if (approvalSec) approvalSec.style.display = online ? 'block' : 'none';

    document.getElementById('xsFileTitle').innerHTML = online
        ? '<i class="fa-solid fa-file-contract"></i> VĂN BẢN TRÌNH KÝ <span style="color:#dc2626;">*</span>'
        : '<i class="fa-solid fa-file-pdf"></i> VĂN BẢN PDF ĐÃ KÝ & ĐÓNG DẤU <span style="color:#dc2626;">*</span>';
    document.getElementById('xsFileHint').textContent = online
        ? 'Tải lên văn bản trình Lãnh đạo ký số (.pdf, .doc, .docx). Lãnh đạo ký số tại vị trí chữ ký định vị ở Bước 2.'
        : 'Tải lên văn bản đã ký ngoài hệ thống và đóng dấu (chỉ chấp nhận .pdf). Bấm Hoàn thành để lưu kết quả và cập nhật hồ sơ.';
    document.getElementById('xsFileInput').accept = online ? '.pdf,.doc,.docx' : '.pdf';
    document.getElementById('xsFileBox').className = online ? 'doc-upload-highlight' : 'doc-upload-highlight offline';
    xsShowStep(xsState.step === 2 && online ? 2 : 1);
}

function xsUploadFile(input) {
    const f = input.files && input.files[0];
    input.value = '';
    if (!f) return;
    if (xsState.method === 'Ký ngoài' && !/\.pdf$/i.test(f.name)) { showToast('Văn bản ký ngoài chỉ chấp nhận định dạng .pdf!', 'error'); return; }
    xsState.file = f.name;
    xsRenderFile();
    showToast(`Đính kèm tập tin: ${f.name} thành công!`, 'success');
}

function xsRemoveFile() {
    if (!xsState.file) return;
    showConfirmModal(`Bạn có chắc chắn muốn xóa tệp "${xsState.file}" không?`, () => { xsState.file = ''; xsRenderFile(); });
}

function xsRenderFile() {
    const has = Boolean(xsState.file);
    const emptyEl = document.getElementById('xsFileEmpty');
    const readyEl = document.getElementById('xsFileReady');
    const errEl = document.getElementById('xsFileError');
    if (emptyEl) emptyEl.style.display = has ? 'none' : 'block';
    if (readyEl) readyEl.style.display = has ? 'flex' : 'none';
    const nameEl = document.getElementById('xsFileName');
    if (nameEl) nameEl.textContent = xsState.file || '';
    const metaEl = document.getElementById('xsFileMeta');
    if (metaEl) metaEl.textContent = xsState.method === 'Ký ngoài' ? 'Văn bản đã ký ngoài hệ thống & đóng dấu' : 'Văn bản trình Lãnh đạo ký số trên hệ thống';
    if (has && errEl) errEl.style.display = 'none';
}

// Kiểm tra Bước 1; trả về dữ liệu trình hoặc null
function xsCollect() {
    clearValidation();
    let firstInvalid = null;
    const kind = xsState.kind;

    if (!xsState.file) {
        const fileErr = document.getElementById('xsFileError');
        if (fileErr) fileErr.style.display = 'block';
        if (!firstInvalid) firstInvalid = document.getElementById('xsFileBox');
    }

    if (xsState.method === 'Ký ngoài') {
        // Ký ngoài: vẫn kiểm tra và lưu Nội dung yêu cầu bổ sung / Lý do không thụ lý (hiển thị tại khối Thông tin yêu cầu bổ sung / Không thụ lý)
        const offReasonEl = document.getElementById('xsReason');
        const offReason = offReasonEl ? offReasonEl.value.trim() : '';
        if (XS_META[kind].reasonLabel && !offReason) firstInvalid = markInvalid(offReasonEl, firstInvalid);
        if (firstInvalid) {
            showToast(xsState.file ? 'Vui lòng nhập đầy đủ thông tin bắt buộc!' : 'Vui lòng tải lên văn bản PDF đã ký và đóng dấu!', 'error');
            if (firstInvalid.scrollIntoView) firstInvalid.scrollIntoView({ block: 'center' });
            return null;
        }
        return { kind, method: 'Ký ngoài', reason: offReason };
    }

    // Ký số: validate Reason (nếu có nhãn lý do)
    const reasonEl = document.getElementById('xsReason');
    const reason = reasonEl ? reasonEl.value.trim() : '';
    if (XS_META[kind].reasonLabel && !reason) {
        firstInvalid = markInvalid(reasonEl, firstInvalid);
    }

    // Nội dung diễn giải (xsContent) - không bắt buộc
    const contentEl = document.getElementById('xsContent');
    const content = contentEl ? contentEl.value.trim() : '';

    // Lãnh đạo Phòng
    const roomEl = document.getElementById('xsOfficerRoomSelect');
    const roomLeader = roomEl ? roomEl.value : '';
    if (roomEl && !roomLeader) {
        firstInvalid = markInvalid(roomEl, firstInvalid);
    }

    // Lãnh đạo Đơn vị
    const agencyEl = document.getElementById('xsOfficerAgencySelect');
    const agencyLeader = agencyEl ? agencyEl.value : '';
    if (agencyEl && !agencyLeader) {
        firstInvalid = markInvalid(agencyEl, firstInvalid);
    }

    if (firstInvalid) {
        showToast('Vui lòng nhập đầy đủ thông tin bắt buộc!', 'error');
        if (firstInvalid.focus) firstInvalid.focus();
        if (firstInvalid.scrollIntoView) firstInvalid.scrollIntoView({ block: 'center' });
        return null;
    }

    return { kind, method: 'Ký số', reason: XS_META[kind].reasonLabel ? reason : '', content, roomLeader, agencyLeader };
}

function xsShowStep(step) {
    xsState.step = step;
    const s2 = step === 2;
    const online = xsState.method !== 'Ký ngoài';
    document.getElementById('xsStep1Body').style.display = s2 ? 'none' : 'block';
    document.getElementById('xsStep2Body').style.display = s2 ? 'flex' : 'none';
    const box = document.getElementById('xsContainer');
    box.classList.toggle('xs-wide', s2);
    const b1 = document.getElementById('xsStep1Badge'), b2 = document.getElementById('xsStep2Badge');
    b1.innerHTML = s2 ? '<i class="fa-solid fa-check"></i>' : '1';
    b1.style.background = s2 ? '#10b981' : '#2563eb';
    document.getElementById('xsStep1Tab').style.color = s2 ? '#10b981' : '#2563eb';
    b2.style.background = s2 ? '#2563eb' : '#cbd5e1';
    b2.style.color = s2 ? '#fff' : '#475569';
    document.getElementById('xsStep2Tab').style.color = s2 ? '#2563eb' : '#64748b';
    document.getElementById('xsBtnNext').style.display = !s2 && online ? 'inline-flex' : 'none';
    document.getElementById('xsBtnSubmitOffline').style.display = !s2 && !online ? 'inline-flex' : 'none';
    document.getElementById('xsBtnBack').style.display = s2 ? 'inline-flex' : 'none';
    document.getElementById('xsBtnSubmitOnline').style.display = s2 ? 'inline-flex' : 'none';
}

// Bước 2: văn bản trình ký (mô phỏng trang A4) và 02 hộp chữ ký Lãnh đạo Phòng & Lãnh đạo Đơn vị
function xsGoStep2() {
    const data = xsCollect();
    if (!data) return;
    const item = requestList.find(r => r.id === xsState.id);
    if (!item) return;
    const meta = XS_META[xsState.kind];
    const path = BTNN_WF.computeApprovalPath(item);
    const lastUnit = path.length ? path[path.length - 1] : item.rootUnitId;
    const root = item.rootUnitId;
    document.getElementById('xsA4Agency').textContent = BTNN_WF.unitName(root).toUpperCase();
    document.getElementById('xsA4Unit').textContent = lastUnit !== root ? BTNN_WF.unitName(lastUnit).toUpperCase() : '';
    document.getElementById('xsA4DocTitle').textContent = meta.docTitle;
    document.getElementById('xsA4File').textContent = xsState.file;
    document.getElementById('xsA4NYC').textContent = item.nycName || '--';
    document.getElementById('xsA4Address').textContent = joinAddress(item.nycAddressDetail, item.nycPhuongXa, item.nycTinhThanh) || '--';

    let body = `<p style="margin:0 0 8px 0; text-indent:24px;">Căn cứ Luật Trách nhiệm bồi thường của Nhà nước năm 2017;</p>
        <p style="margin:0 0 8px 0; text-indent:24px;">Xét yêu cầu xác định cơ quan giải quyết bồi thường của Ông/Bà (Mã hồ sơ: <strong>${escapeHtml(item.code)}</strong>, tiếp nhận ngày ${escapeHtml(item.date || '--')}),</p>`;
    if (xsState.kind === XD_KIND.KQ) {
        const ag = BTNN_WF.xdTargetUnitId(item);
        body += `<p style="margin:0 0 8px 0; text-indent:24px;">${escapeHtml(BTNN_WF.unitName(root))} xác định cơ quan giải quyết bồi thường là: <strong>${escapeHtml(BTNN_WF.unitName(ag))}</strong>.</p>
            <p style="margin:0 0 8px 0; text-indent:24px;">Căn cứ pháp lý: ${escapeHtml(item.procBasis || '--')}.</p>
            <p style="margin:0 0 8px 0; text-indent:24px;">Lý do: ${escapeHtml(item.procReason || '--')}</p>`;
    } else {
        const lines = (data.reason || '').split('\n').map(l => l.trim()).filter(Boolean);
        body += `<p style="margin:0 0 6px 0; text-indent:24px;">${escapeHtml(BTNN_WF.unitName(root))} thông báo ${xsState.kind === XD_KIND.YCBS ? 'và đề nghị Ông/Bà bổ sung các nội dung, tài liệu sau đây' : 'không thụ lý yêu cầu với lý do sau đây'}:</p>
            <div style="margin:6px 0 12px 20px; line-height:1.8;">${lines.map((l, i) => `<div><strong>${i + 1}.</strong> ${escapeHtml(l)}</div>`).join('')}</div>`;
    }
    document.getElementById('xsA4Body').innerHTML = body;

    const roomSelect = document.getElementById('xsOfficerRoomSelect');
    const agencySelect = document.getElementById('xsOfficerAgencySelect');
    const roomName = roomSelect && roomSelect.selectedIndex >= 0 ? roomSelect.options[roomSelect.selectedIndex].text.split('-')[0].trim() : (data.roomLeader || 'Lãnh đạo Phòng');
    const agencyName = agencySelect && agencySelect.selectedIndex >= 0 ? agencySelect.options[agencySelect.selectedIndex].text.split('-')[0].trim() : (data.agencyLeader || 'Lãnh đạo Đơn vị');
    const agencyOptionText = agencySelect && agencySelect.selectedIndex >= 0 ? agencySelect.options[agencySelect.selectedIndex].text : '';
    const agencyTitle = agencyOptionText.includes('Cục trưởng') ? 'CỤC TRƯỞNG' : (agencyOptionText.includes('Giám đốc') ? 'GIÁM ĐỐC SỞ' : 'THỦ TRƯỞNG CƠ QUAN');

    document.getElementById('xsA4SignerTitle').textContent = agencyTitle;
    document.getElementById('xsA4SignerName').textContent = agencyName.toUpperCase();

    document.getElementById('xsSigBoxRoomOfficer').textContent = roomName;
    document.getElementById('xsSigBoxAgencyOfficer').textContent = agencyName;
    document.getElementById('xsPanelRoomName').textContent = roomName;
    document.getElementById('xsPanelAgencyName').textContent = agencyName;

    xsShowStep(2);
    initXsTwoBoxDrag();
    xsApplyBothSigCoords();
}
function xsGoStep1() { xsShowStep(1); }

function xsApplyBothSigCoords() {
    const boxRoom = document.getElementById('xsSigBoxRoom');
    const boxAgency = document.getElementById('xsSigBoxAgency');

    if (boxRoom) {
        const r = xsState.sigCoords.room;
        boxRoom.style.left = r.x + 'px';
        boxRoom.style.top = r.y + 'px';
        boxRoom.style.width = r.w + 'px';
        boxRoom.style.height = r.h + 'px';
        const lbl = document.getElementById('xsCoordRoomLabel');
        const pnl = document.getElementById('xsPanelRoomCoord');
        const sz = document.getElementById('xsPanelRoomSize');
        if (lbl) lbl.textContent = `X: ${r.x}, Y: ${r.y}`;
        if (pnl) pnl.textContent = `Tọa độ: (${r.x}, ${r.y})`;
        if (sz) sz.textContent = `${r.w} x ${r.h} px`;
    }

    if (boxAgency) {
        const a = xsState.sigCoords.agency;
        boxAgency.style.left = a.x + 'px';
        boxAgency.style.top = a.y + 'px';
        boxAgency.style.width = a.w + 'px';
        boxAgency.style.height = a.h + 'px';
        const lbl = document.getElementById('xsCoordAgencyLabel');
        const pnl = document.getElementById('xsPanelAgencyCoord');
        const sz = document.getElementById('xsPanelAgencySize');
        if (lbl) lbl.textContent = `X: ${a.x}, Y: ${a.y}`;
        if (pnl) pnl.textContent = `Tọa độ: (${a.x}, ${a.y})`;
        if (sz) sz.textContent = `${a.w} x ${a.h} px`;
    }
}

function xsPlaceSigBox(key, x, y) {
    if (xsState.sigCoords[key]) {
        xsState.sigCoords[key].x = x;
        xsState.sigCoords[key].y = y;
        xsApplyBothSigCoords();
    }
}

function xsResizeSigBox(key, w, h) {
    if (xsState.sigCoords[key]) {
        xsState.sigCoords[key].w = w;
        xsState.sigCoords[key].h = h;
        xsApplyBothSigCoords();
    }
}

function xsAutoPlaceBothSignatures(silent) {
    const page = document.getElementById('xsA4Page');
    const area = document.getElementById('xsA4SignerArea');
    const placeholder = document.getElementById('xsA4RoomSigPlaceholder');

    if (placeholder && placeholder.offsetWidth) {
        xsState.sigCoords.room.x = Math.round(placeholder.offsetLeft);
        xsState.sigCoords.room.y = Math.round(placeholder.offsetTop);
    } else {
        xsState.sigCoords.room.x = 60;
        xsState.sigCoords.room.y = 860;
    }

    if (area && area.offsetWidth) {
        xsState.sigCoords.agency.x = Math.max(10, Math.round(area.offsetLeft + (area.offsetWidth - xsState.sigCoords.agency.w) / 2));
        xsState.sigCoords.agency.y = Math.round(area.offsetTop + 46);
    } else {
        xsState.sigCoords.agency.x = 480;
        xsState.sigCoords.agency.y = 860;
    }

    xsApplyBothSigCoords();
    if (!silent) showToast('Đã tự động căn vị trí chữ ký theo đúng chuẩn thể thức Nghị định 30!', 'success');
}

function xsToggleRoomSig(enabled) {
    xsState.enableRoomSig = enabled;
    const boxRoom = document.getElementById('xsSigBoxRoom');
    const badge = document.getElementById('xsRoomSigStatusBadge');
    const card = document.getElementById('xsPanelRoomCard');
    const placeholder = document.getElementById('xsA4RoomSigPlaceholder');

    if (boxRoom) boxRoom.style.display = enabled ? 'block' : 'none';
    if (placeholder) placeholder.style.display = enabled ? 'block' : 'none';
    if (badge) {
        badge.textContent = enabled ? 'Áp dụng' : 'Không áp dụng';
        badge.style.background = enabled ? '#2563eb' : '#64748b';
    }
    if (card) {
        card.style.opacity = enabled ? '1' : '0.5';
        card.style.pointerEvents = enabled ? 'auto' : 'none';
    }
}

let xsIsDragging = false;
let xsDragTarget = null;
let xsDragOffset = { x: 0, y: 0 };
let xsIsResizing = false;
let xsResizeStart = { x: 0, y: 0, w: 0, h: 0 };
let xsDragListenerBound = false;

function initXsTwoBoxDrag() {
    const boxRoom = document.getElementById('xsSigBoxRoom');
    const boxAgency = document.getElementById('xsSigBoxAgency');
    if (!boxRoom || !boxAgency) return;

    function attachDrag(box, key) {
        box.onmousedown = function(e) {
            if (e.button !== 0) return;
            const resizeHandle = e.target.closest('.sig-resize-handle');
            if (resizeHandle) {
                e.preventDefault();
                e.stopPropagation();
                xsIsResizing = true;
                xsDragTarget = { box, key };
                xsResizeStart = {
                    x: e.clientX,
                    y: e.clientY,
                    w: xsState.sigCoords[key].w,
                    h: xsState.sigCoords[key].h
                };
                return;
            }
            e.preventDefault();
            xsIsDragging = true;
            xsDragTarget = { box, key };
            const rect = box.getBoundingClientRect();
            xsDragOffset.x = e.clientX - rect.left;
            xsDragOffset.y = e.clientY - rect.top;
            box.classList.add('dragging');
        };
    }

    attachDrag(boxRoom, 'room');
    attachDrag(boxAgency, 'agency');

    if (!xsDragListenerBound) {
        xsDragListenerBound = true;
        document.addEventListener('mousemove', function(e) {
            if (!xsDragTarget) return;
            const pageEl = document.getElementById('xsA4Page');
            if (!pageEl) return;
            const key = xsDragTarget.key;

            if (xsIsResizing) {
                const dx = e.clientX - xsResizeStart.x;
                const dy = e.clientY - xsResizeStart.y;
                const minW = 140, maxW = 380, minH = 50, maxH = 180;
                xsState.sigCoords[key].w = Math.max(minW, Math.min(maxW, Math.round(xsResizeStart.w + dx)));
                xsState.sigCoords[key].h = Math.max(minH, Math.min(maxH, Math.round(xsResizeStart.h + dy)));
                xsApplyBothSigCoords();
                return;
            }

            if (xsIsDragging) {
                const pageRect = pageEl.getBoundingClientRect();
                let newLeft = e.clientX - pageRect.left - xsDragOffset.x;
                let newTop = e.clientY - pageRect.top - xsDragOffset.y;

                const maxLeft = pageEl.clientWidth - xsDragTarget.box.offsetWidth;
                const maxHeight = pageEl.clientHeight - xsDragTarget.box.offsetHeight;

                newLeft = Math.max(10, Math.min(newLeft, maxLeft - 10));
                newTop = Math.max(10, Math.min(newTop, maxHeight - 10));

                xsState.sigCoords[key].x = Math.round(newLeft);
                xsState.sigCoords[key].y = Math.round(newTop);
                xsApplyBothSigCoords();
            }
        });

        document.addEventListener('mouseup', function() {
            if (xsDragTarget) {
                xsDragTarget.box.classList.remove('dragging');
                xsDragTarget = null;
            }
            xsIsDragging = false;
            xsIsResizing = false;
        });
    }
}

// Trình ký: Ký ngoài -> Hoàn thành trực tiếp; Ký số -> Chuyển luồng phê duyệt Lãnh đạo
function xsSubmit() {
    const data = xsCollect();
    if (!data) return;
    const item = requestList.find(r => r.id === xsState.id);
    if (!item) return;

    if (xsState.method === 'Ký ngoài') {
        // Ký ngoài: ban hành trực tiếp, không trình Lãnh đạo (Kết quả: tự động chuyển CQGQBT ngay)
        const res = BTNN_WF.issueXdOffline(item.code, xsState.kind, xsState.file, data.reason || '');
        if (!res.ok) { showToast(res.message, 'error'); return; }
        closeXdModal('signSubmitModal');
        reloadRequestList();
        const st = res.record.status;
        showToast(res.ycbtCode
            ? `Đã ban hành Kết quả xác định CQGQBT (Ký ngoài) hồ sơ ${item.code}. Hệ thống đã chuyển ${BTNN_WF.unitName(BTNN_WF.xdTargetUnitId(res.record))}, tạo hồ sơ GQBT ${res.ycbtCode}. Trạng thái: [${st}].`
            : `Đã ban hành ${xsState.kind} (Ký ngoài) hồ sơ ${item.code}. Trạng thái: [${st}].`, 'success');
        showListScreen();
        return;
    }

    // Ký số: Trình duyệt
    const signDoc = {
        method: 'Ký số',
        file: xsState.file,
        enableRoomSig: xsState.enableRoomSig,
        sigCoords: JSON.parse(JSON.stringify(xsState.sigCoords))
    };
    const submitContent = data.content || 'Kính trình Lãnh đạo xem xét, phê duyệt.';
    const res = BTNN_WF.submitForApproval(item.code, data.kind, submitContent, [{ name: xsState.file }], {
        assignee: data.roomLeader || data.agencyLeader,
        roomLeader: data.roomLeader,
        agencyLeader: data.agencyLeader,
        signDoc,
        reason: data.reason
    });
    if (!res.ok) { showToast(res.message, 'error'); return; }
    if (data.kind === XD_KIND.YCBS) res.record.supplementReason = data.reason;
    if (data.kind === XD_KIND.KTL) res.record.ktlReason = data.reason;
    BTNN_WF.upsertRecord(res.record);
    closeXdModal('signSubmitModal');
    afterSubmitted(item.code, `Đã trình ký Lãnh đạo hồ sơ ${item.code}. Trạng thái: [Chờ duyệt] - Nội dung trình: ${data.kind}.`);
}
