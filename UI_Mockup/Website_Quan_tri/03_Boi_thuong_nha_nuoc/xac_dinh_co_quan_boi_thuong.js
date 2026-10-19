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
        status: "Đang thực hiện",
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
        status: "Đang thực hiện",
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
        status: "Đang thực hiện",
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
        status: "Đang thực hiện",
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
        status: "Đang thực hiện",
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
            status: 'Đang thực hiện', nycName: 'Kiều Văn Thịnh', nycDob: '14/02/1979', nycDocNo: '001079006611', nycPhone: '0913221144', nycEmail: 'thinh.kv@gmail.com',
            nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00001 - Phường Ba Đình', nycAddressDetail: 'Số 12 Phan Đình Phùng',
            linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Thu hồi đất, cưỡng chế giải phóng mặt bằng khi chưa có quyết định thu hồi đất có hiệu lực của UBND cấp huyện.',
            procBasis: 'Khoản 1 Điều 35 Luật Trách nhiệm bồi thường của Nhà nước',
            procTargetAgency: 'UBND quận Cầu Giấy, Thành phố Hà Nội',
            procReason: 'Người thi hành công vụ gây thiệt hại thuộc UBND quận Cầu Giấy quản lý.',
            procDecisionFile: 'Quyet_dinh_xac_dinh_CQGQBT_XD-2026-121.pdf',
            routes: routes('cv_hn1', '06/10/2026', 'Đã xử lý'),
            history: [h('Tiếp nhận hồ sơ', 'cv_hn1', '08:30 06/10/2026', 'Chuyển lãnh đạo Sở Tư pháp Thành phố Hà Nội phân công xử lý.'), h('Chuyển đơn vị', 'gdso_hn', '09:00 06/10/2026', 'Chuyển Phòng Hành chính tư pháp - Sở Tư pháp Thành phố Hà Nội phân công.'), h('Phân công cán bộ', 'tp_hctp_hn', '14:00 06/10/2026', 'Chủ trì: Đỗ Văn Chung.'), h('Tiếp nhận hồ sơ', 'cv_hn1', '15:00 06/10/2026', 'Cán bộ xử lý tiếp nhận, nhập liệu hồ sơ. Hồ sơ chuyển [Đang thực hiện].')]
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

// Nhãn nhận diện hồ sơ: Mã yêu cầu - Họ và tên người yêu cầu
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
    ["#filterFromDate", "#filterToDate", "#formNYCDob", "#formNYCDocDate", "#nbthDob", "#nbthDocDate"].forEach(sel => {
        if (document.querySelector(sel)) flatpickr(sel, { dateFormat: "d/m/Y", allowInput: true });
    });

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
// - Cán bộ xử lý: Chờ xử lý = hồ sơ còn bước xử lý; Đã xử lý = Bị từ chối, Hoàn thành.
// - Lãnh đạo: Chờ xử lý = hồ sơ Chờ duyệt Lãnh đạo được giao ở cấp phê duyệt hiện hành; Đã xử lý = hồ sơ Lãnh đạo đã Phê duyệt / Từ chối phê duyệt.
const XD_PENDING_STATES = ['Chờ tiếp nhận', 'Đang thực hiện', 'Chờ duyệt', 'Bị trả lại', 'Chờ chuyển CQGQBT', 'Yêu cầu bổ sung'];
const XD_DONE_STATES = ['Bị từ chối', 'Hoàn thành'];
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
        return !BTNN_WF.canApprove(item, me) && BTNN_LD.leaderActedOn(item, me, /Phê duyệt|Từ chối phê duyệt/);
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
    if (!list.length) return '';
    return `<div style="display:flex; flex-direction:column; gap:10px;">${list.map(x => {
        const user = BTNN_WF.getUser(x.userId);
        const root = user ? BTNN_WF.getRootId(user.unitId) : '';
        return `<div style="border-left:3px solid ${/Từ chối/.test(x.action) ? '#dc2626' : '#2563eb'}; padding:6px 12px; background:#f8fafc; border-radius:0 6px 6px 0;">
            <div style="font-weight:600; color:#0f172a;">${escapeHtml(x.action)} <span style="font-weight:400; color:#64748b;">- ${escapeHtml(x.userName)}${root ? ' (' + unitWithTypeHtml(root) + ')' : ''} - ${escapeHtml(x.at)}</span></div>
            ${x.note ? `<div style="color:#334155; margin-top:2px;">${escapeHtml(x.note)}</div>` : ''}
        </div>`;
    }).join('')}</div>`;
}

function isChuTri(item) { return item && item.chuTri === getMe(); }

function normalizeRequestData() {
    requestList.forEach(item => {
        if (item.status === "Chờ nhập liệu") item.status = "Chờ tiếp nhận";
        if (item.status === "Đang xác minh") item.status = "Đang thực hiện";
        // Phân hệ BTNN không còn trạng thái Lưu nháp: hồ sơ nháp cũ chuyển về Đang thực hiện
        if (item.status === "Lưu nháp") { item.status = "Đang thực hiện"; saveItem(item); }
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

// Toggle email requirement on Form screen
// Phương thức điện tử (Email, Zalo, SMS...): chỉ bắt buộc có ít nhất một thông tin liên hệ (Số điện thoại hoặc Email)
function toggleFormEmailRequired() {
    const label = document.querySelector("#formNYCEmail").previousElementSibling;
    label.innerHTML = 'Thư điện tử (Email)';
}

const NOTIFY_METHOD_DEFAULT = 'Qua Cổng Dịch vụ công quốc gia';

function normalizeNotifyMethod(val) {
    if (!val || val === 'Phương thức điện tử' || val === 'Phương thức điện tử (Email, Zalo, SMS...)' || val.includes('Cổng Dịch vụ công quốc gia, ứng dụng') || val.includes('hoặc phương tiện điện tử khác')) {
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

// Hiển thị khối Người bị thiệt hại khi người yêu cầu không phải là người bị thiệt hại
function toggleNbthBlock() {
    const role = document.getElementById('formNYCRole').value;
    document.getElementById('nbthBlock').style.display = role !== 'Người bị thiệt hại' ? 'block' : 'none';
}

function fillNbth(nb) {
    nb = nb || {};
    document.getElementById('nbthName').value = nb.name || '';
    document.getElementById('nbthGender').value = nb.gender || 'Nam';
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
        name: v('nbthName'), gender: v('nbthGender'), dob: v('nbthDob'), docType: v('nbthDocType'), docNo: v('nbthDocNo'),
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
    formMode = mode || (!id ? 'create' : item && item.status === 'Chờ tiếp nhận' ? 'accept' : 'edit');

    formRequestId.value = id || '';

    // Khối hiển thị Lý do bị trả lại trên cùng của form khi hồ sơ Bị trả lại
    const returnedAlert = document.getElementById('formReturnedAlertBlock');
    if (returnedAlert) {
        if (item && item.status === 'Bị trả lại') {
            returnedAlert.style.display = 'block';
            const ret = item.returned || {};
            const retBy = ret.by ? BTNN_WF.userName(ret.by) : (item.officer || 'Lãnh đạo đơn vị');
            const retUnit = ret.unitId ? ` (${BTNN_WF.unitName(ret.unitId)})` : '';
            const retAt = ret.at ? ` lúc ${ret.at}` : '';
            document.getElementById('formReturnedMeta').innerHTML = `<strong>Người trả lại:</strong> ${escapeHtml(retBy)}${escapeHtml(retUnit)}${escapeHtml(retAt)}`;
            document.getElementById('formReturnedReason').innerText = ret.reason || item.returnReason || 'Hồ sơ chưa đạt yêu cầu, đề nghị cán bộ chủ trì kiểm tra, hoàn thiện và cập nhật lại.';
        } else {
            returnedAlert.style.display = 'none';
        }
    }

    const statusGroup = document.getElementById('formStatusGroup');
    const statusBadge = document.getElementById('formStatusBadge');
    if (statusGroup && statusBadge) {
        statusGroup.style.display = formMode === 'create' ? 'none' : 'block';
        statusBadge.innerHTML = item ? BTNN_WF.statusBadge(item.status) : '';
    }
    const submitBtn = document.getElementById('btnFormSubmit');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Trình duyệt';
    }

    setReceiveMethodField(BTNN_WF.RECEIVE_METHODS.TRUC_TIEP);
    document.getElementById('formLinhVuc').value = 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH';
    document.getElementById('formNYCName').value = '';
    document.getElementById('formNYCRole').value = 'Người bị thiệt hại';
    document.getElementById('formNYCGender').value = 'Nam';
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
        title.innerHTML = formMode === 'accept'
            ? `<i class="fa-solid fa-file-import"></i> TIẾP NHẬN YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`
            : item.status === 'Bị trả lại'
            ? `<i class="fa-solid fa-rotate-left"></i> CẬP NHẬT LẠI HỒ SƠ BỊ TRẢ LẠI`
            : `<i class="fa-solid fa-file-pen"></i> SỬA YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`;
        setReceiveMethodField(BTNN_WF.normalizeReceiveMethod(item.hinhThucTiepNhan));
        document.getElementById('formLinhVuc').value = item.linhVuc;
        document.getElementById('formNYCName').value = item.nycName || '';
        document.getElementById('formNYCRole').value = item.nycRole || 'Người bị thiệt hại';
        document.getElementById('formNYCGender').value = item.nycGender || 'Nam';
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

    // Thiết lập thông tin trình Lãnh đạo phê duyệt theo luồng cấu hình của đơn vị
    // Hồ sơ tạo mới: luồng theo Loại luồng Xác định CQGQBT của đơn vị gốc (Bộ Tư pháp / Sở Tư pháp)
    const leaderTarget = item || {
        loaiYeuCau: REQUEST_TYPE_XDCQ,
        chuTri: BTNN_WF.getCurrentUserId(),
        createdBy: BTNN_WF.getCurrentUserId(),
        rootUnitId: BTNN_WF.getRootId(BTNN_WF.getCurrentUser().unitId)
    };
    const leaderIds = BTNN_WF.firstLevelLeaders(leaderTarget);
    const leaderSel = document.getElementById('formLeaderSelect');
    if (leaderSel) {
        leaderSel.innerHTML = '<option value="">-- Chọn Lãnh đạo phê duyệt --</option>' + leaderIds.map(uid => {
            return `<option value="${escapeAttr(uid)}">${escapeHtml(BTNN_WF.userLabel(uid))}</option>`;
        }).join('');
        if (item && item.approval && item.approval.assignees && item.approval.assignees[0]) {
            leaderSel.value = item.approval.assignees[0];
        } else if (leaderIds.length === 1) {
            leaderSel.value = leaderIds[0];
        } else {
            leaderSel.value = '';
        }
    }
    const pathInfoEl = document.getElementById('formLeaderPathInfo');
    if (pathInfoEl) {
        pathInfoEl.innerHTML = BTNN_WF.approvalPathLineHtml(leaderTarget);
    }
    const noteEl = document.getElementById('formLeaderNote');
    if (noteEl) {
        noteEl.value = (item && item.approval && item.approval.content) ? item.approval.content : '';
    }

    toggleNbthBlock();
}

// Hình thức tiếp nhận (DM_25): form chỉ cho chọn Trực tiếp / Qua dịch vụ bưu chính;
// hồ sơ kế thừa có giá trị Qua môi trường số (Dịch vụ Công) / Bộ phận Một cửa hiển thị chỉ đọc
function setReceiveMethodField(value) {
    const sel = document.getElementById('formHinhThucTiepNhan');
    if (!sel) return;
    const M = BTNN_WF.RECEIVE_METHODS;
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
    const agencyVal = item.procTargetAgency || "";
    document.getElementById('procTargetAgencyInput').value = agencyVal;
    document.getElementById('procTargetAgency').value = agencyVal;
    document.getElementById('procReason').value = item.procReason || "";

    clearAttachedFile('procDecisionFile', 'procFileAttachmentInfo');
    if (item.procDecisionFile) {
        displayAttachedFile('procDecisionFile', 'procFileAttachmentInfo', item.procDecisionFile);
    }
}

function statusBadgeClass(status) {
    switch (status) {
        case 'Chờ tiếp nhận': return 'badge-pending';
        case 'Yêu cầu bổ sung': return 'badge-warning';
        case 'Đang thực hiện': return 'badge-verifying';
        case 'Chờ duyệt': return 'badge-approval';
        case 'Bị trả lại': return 'badge-returned';
        case 'Chờ chuyển CQGQBT': return 'badge-transfer';
        case 'Bị từ chối': return 'badge-rejected';
        case 'Hoàn thành': return 'badge-success';
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
    if (item.status !== 'Hoàn thành' || !hasYcbtCode(item)) return '-';
    return `<a href="quan_ly_boi_thuong.html?id=${encodeURIComponent(item.claimCode)}" target="_blank" rel="noopener noreferrer" style="font-weight:700; color:#7c3aed; text-decoration:none;" title="Mở chi tiết hồ sơ Giải quyết yêu cầu bồi thường ở tab mới" onclick="event.stopPropagation();">${escapeHtml(item.claimCode)}</a>`;
}

function openYcbtRecord(code) {
    window.open(`quan_ly_boi_thuong.html?id=${encodeURIComponent(code)}`, '_blank');
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

    // Thông báo theo trạng thái
    const notice = document.getElementById('dtNoticeBlock');
    let noticeHtml = '';
    if (item.status === 'Bị trả lại' && item.returned) {
        noticeHtml = `<div style="font-weight:700; color:#b91c1c; margin-bottom:4px;"><i class="fa-solid fa-rotate-left"></i> HỒ SƠ BỊ TRẢ LẠI</div><div><strong>${escapeHtml(BTNN_WF.userName(item.returned.by))}</strong> (${escapeHtml(BTNN_WF.unitName(item.returned.unitId))}) từ chối phê duyệt lúc ${escapeHtml(item.returned.at)}.</div>${item.returned.kind ? `<div><strong>Nội dung trình:</strong> ${escapeHtml(item.returned.kind)}</div>` : ''}<div><strong>Lý do:</strong> ${escapeHtml(item.returned.reason)}</div>`;
        notice.style.cssText += 'background:#FEF2F2; border-left:4px solid #dc2626;';
    } else if (item.status === 'Yêu cầu bổ sung') {
        const reason = item.supplementReason || (item.approval && item.approval.content) || '';
        noticeHtml = `<div style="font-weight:700; color:#c2410c; margin-bottom:4px;"><i class="fa-solid fa-file-circle-question"></i> YÊU CẦU BỔ SUNG HỒ SƠ</div><div>${escapeHtml(reason)}</div>`;
        notice.style.cssText += 'background:#FFF7ED; border-left:4px solid #f97316;';
    } else if (readOnlyView) {
        noticeHtml = `<i class="fa-solid fa-eye"></i> Chế độ xem: mở từ liên kết hồ sơ liên quan, không thực hiện thao tác xử lý.`;
        notice.style.cssText += 'background:#EFF6FF; border-left:4px solid #3b82f6;';
    }
    notice.innerHTML = noticeHtml;
    notice.style.display = noticeHtml ? 'block' : 'none';

    const rejectionBlock = document.getElementById('dtRejectionBlock');
    if (rejectionBlock) {
        if (item.status === 'Bị từ chối') {
            rejectionBlock.style.display = 'block';
            document.getElementById('dtRejectionReason').innerText = item.rejectionReason || (item.approval && item.approval.content) || item.procReason || 'Không có lý do.';
            const files = item.rejectionFile ? [{ name: item.rejectionFile }] : ((item.approval && item.approval.files) || []);
            document.getElementById('dtRejectionFileLink').innerHTML = fileLinksHtml(files);
        } else {
            rejectionBlock.style.display = 'none';
        }
    }
    document.getElementById('dtMaVuViec').innerText = item.maVuViec || '-';
    document.getElementById('dtHinhThucTiepNhan').innerText = BTNN_WF.normalizeReceiveMethod(item.hinhThucTiepNhan) || BTNN_WF.RECEIVE_METHODS.TRUC_TIEP;
    document.getElementById('dtLinhVuc').innerText = item.linhVuc || '';
    document.getElementById('dtNYCName').innerText = item.nycName || '';
    document.getElementById('dtNYCRole').innerText = item.nycRole || '';
    document.getElementById('dtNYCGenderDob').innerText = `${item.nycGender || '--'} / ${item.nycDob || '--'}`;
    document.getElementById('dtNYCDocInfo').innerText = item.nycDocNo ? `${item.nycDocType} - Số: ${item.nycDocNo}${item.nycDocDate ? ` (Cấp ngày: ${item.nycDocDate}${item.nycDocPlace ? ' tại ' + item.nycDocPlace : ''})` : ''}` : '--';
    document.getElementById('dtNYCPhone').innerText = item.nycPhone || 'Chưa cung cấp';
    document.getElementById('dtNYCEmail').innerText = item.nycEmail || 'Chưa cung cấp';
    const ward = item.nycPhuongXa ? `${item.nycPhuongXa}, ` : '';
    document.getElementById('dtNYCAddress').innerText = [item.nycAddressDetail, `${ward}${item.nycTinhThanh || ''}`, item.nycCountry].filter(Boolean).join(', ');

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
    if (nb && nb.name && item.nycRole !== 'Người bị thiệt hại') {
        nbBlock.style.display = 'block';
        document.getElementById('dtNbthName').innerText = nb.name;
        document.getElementById('dtNbthGenderDob').innerText = `${nb.gender || '--'} / ${nb.dob || '--'}`;
        document.getElementById('dtNbthDoc').innerText = `${nb.docType || ''} - Số: ${nb.docNo || '--'}${nb.docDate ? ` (Cấp ngày: ${nb.docDate}${nb.docPlace ? ' tại ' + nb.docPlace : ''})` : ''}`;
        document.getElementById('dtNbthContact').innerText = [nb.phone, nb.email].filter(Boolean).join(' / ') || 'Chưa cung cấp';
        document.getElementById('dtNbthAddress').innerText = [nb.address, nb.ward, nb.city, nb.country].filter(Boolean).join(', ') || 'Chưa cung cấp';
    } else {
        nbBlock.style.display = 'none';
    }

    document.getElementById('dtHanhVi').innerText = item.hanhVi || '';
    document.getElementById('dtHinhThucNhan').innerText = normalizeNotifyMethod(item.hinhThucNhan);
    const dtDiaChiEl = document.getElementById('dtDiaChiNhan');
    if (dtDiaChiEl) dtDiaChiEl.innerText = item.diaChiNhanThongBao || (item.hinhThucNhan === 'Trực tiếp' ? 'Nhận trực tiếp tại trụ sở cơ quan giải quyết bồi thường' : 'VNeID / Cổng Dịch vụ công quốc gia');
    document.getElementById('dtVanBanCanCu').innerHTML = basisTableHtml(getBasisDocs(item));
    document.getElementById('dtStatus').innerHTML = statusCellHtml(item);

    // Kết quả xác định
    const verificationBlock = document.getElementById('dtVerificationResultBlock');
    if (item.procBasis || item.procTargetAgency || ['Chờ chuyển CQGQBT', 'Hoàn thành'].includes(item.status) || BTNN_WF.approvalKindOf(item) === BTNN_WF.KIND_KQXD) {
        verificationBlock.style.display = 'block';
        document.getElementById('dtProcBasis').innerText = item.procBasis || 'Chưa cập nhật';
        document.getElementById('dtProcTargetAgency').innerText = item.procTargetAgency || 'Chưa cập nhật';
        document.getElementById('dtProcReason').innerText = item.procReason || 'Chưa cập nhật';
        document.getElementById('dtProcDecisionFile').innerHTML = item.procDecisionFile ? fileLinksHtml([{ name: item.procDecisionFile }]) : `<span style="color: var(--text-muted); font-style: italic;">Chưa đính kèm quyết định</span>`;
    } else {
        verificationBlock.style.display = 'none';
    }

    // Kết quả chuyển CQGQBT: Chỉ hiển thị khi hồ sơ ở trạng thái Hoàn thành và hệ thống đã sinh thành công Mã hồ sơ YCBT tương ứng (01 mã BT-)
    const transferBlock = document.getElementById('dtTransferBlock');
    if (item.status === 'Hoàn thành' && hasYcbtCode(item)) {
        transferBlock.style.display = 'block';
        const tr = item.transfer || {};
        document.getElementById('dtTransferAgency').innerText = tr.targetUnitId ? BTNN_WF.unitName(tr.targetUnitId) : (item.procTargetAgency || '--');
        document.getElementById('dtTransferContent').innerText = tr.content || '--';
        document.getElementById('dtTransferFiles').innerHTML = fileLinksHtml(tr.files || []);
        document.getElementById('dtTransferAt').innerText = tr.at ? `${tr.at} - ${BTNN_WF.userName(tr.by)}` : '--';

        document.getElementById('dtClaimCode').innerHTML = getClaimCodeLinkHtml(item.claimCode);
    } else {
        transferBlock.style.display = 'none';
    }

    // Thông tin xử lý
    document.getElementById('dtRootUnit').innerHTML = unitWithTypeHtml(item.rootUnitId);
    document.getElementById('dtChuTri').innerText = item.chuTri ? BTNN_WF.userLabel(item.chuTri) : 'Chưa phân công';
    if (document.getElementById('dtApprovalWrap')) document.getElementById('dtApprovalWrap').style.display = 'none';
    const approvalFiles = item.approval && (item.approval.files || []).length
        ? `<div style="margin-top:8px; font-size:13px;"><strong>Văn bản đính kèm trình Lãnh đạo:</strong>${fileLinksHtml(item.approval.files)}</div>` : '';
    document.getElementById('dtApproval').innerHTML = item.approval ? BTNN_WF.renderApprovalHtml(item) + approvalFiles : '';
    document.getElementById('dtRoutes').innerHTML = BTNN_WF.renderRoutesHtml(item);
    document.getElementById('dtHistory').innerHTML = renderXdHistoryHtml(item);

    // Nút thao tác theo trạng thái và vai trò
    const footer = document.getElementById('detailWorkflowActions');
    footer.innerHTML = `<button class="btn btn-secondary" onclick="closeDetailOrReturn()">Đóng</button>`;
    // UBND cấp tỉnh (chỉ xem): không có thao tác xử lý, phê duyệt
    if (readOnlyView || isXdViewOnly()) return;

    if (!isChuTri(item)) return;

    if (item.status === 'Chờ tiếp nhận') {
        footer.innerHTML += `<button class="btn btn-success" onclick="acceptRequest('${item.id}', true)"><i class="fa-solid fa-file-import"></i> Tiếp nhận</button>`;
        footer.innerHTML += `<button class="btn btn-warning" onclick="openSupplementModal('${item.id}')" style="background:#f59e0b; color:#fff; border:none;"><i class="fa-solid fa-file-circle-question"></i> Yêu cầu bổ sung</button>`;
        footer.innerHTML += `<button class="btn btn-danger" onclick="openRejectModal('${item.id}')" style="background:#ef4444; color:#fff; border:none;"><i class="fa-solid fa-ban"></i> Từ chối</button>`;
    } else if (item.status === 'Bị trả lại') {
        footer.innerHTML += `<button class="btn btn-primary" onclick="showFormScreen('${item.id}', 'edit')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật</button>`;
        footer.innerHTML += `<button class="btn btn-warning" onclick="openSupplementModal('${item.id}')" style="background:#f59e0b; color:#fff; border:none;"><i class="fa-solid fa-file-circle-question"></i> Yêu cầu bổ sung</button>`;
        footer.innerHTML += `<button class="btn btn-danger" onclick="openRejectModal('${item.id}')" style="background:#ef4444; color:#fff; border:none;"><i class="fa-solid fa-ban"></i> Từ chối</button>`;
        footer.innerHTML += `<button class="btn btn-secondary" onclick="showProcessScreen('${item.id}')"><i class="fa-solid fa-balance-scale"></i> Cập nhật kết quả xác định</button>`;
    } else if (item.status === 'Đang thực hiện') {
        // Đang thực hiện: chỉ Cập nhật kết quả (màn hình cập nhật có "Lưu kết quả" / "Lưu và trình phê duyệt")
        footer.innerHTML += `<button class="btn btn-primary" onclick="showProcessScreen('${item.id}')"><i class="fa-solid fa-balance-scale"></i> Cập nhật kết quả</button>`;
    } else if (item.status === 'Chờ chuyển CQGQBT') {
        footer.innerHTML += `<button class="btn btn-primary" onclick="openTransferModal('${item.id}')"><i class="fa-solid fa-share-from-square"></i> Chuyển CQGQBT</button>`;
    }
}


// Action methods
function acceptRequest(id, fromDetail = false) {
    showFormScreen(id, 'accept');
}

// Kiểm tra nhanh các trường bắt buộc khi gửi từ màn chi tiết
function validateRequestItem(item) {
    if (!item.nycName || !item.nycDob || !item.nycDocNo || !item.hanhVi) return "Vui lòng nhập đầy đủ thông tin bắt buộc trước khi gửi yêu cầu!";
    if (!item.nycPhone && !item.nycEmail) return "Nhập ít nhất một trong hai: Số điện thoại liên hệ hoặc Thư điện tử (Email)!";
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
    const hasNbth = role !== 'Người bị thiệt hại';
    const nbth = hasNbth ? readNbth() : null;
    const cleanDocs = formDocRows
        .filter(doc => (doc.name || '').trim() || (doc.file || '').trim())
        .map(doc => ({ name: (doc.name || '').trim(), file: doc.file || '' }));

    const leader = document.getElementById('formLeaderSelect') ? document.getElementById('formLeaderSelect').value : '';
    const leaderNote = document.getElementById('formLeaderNote') ? document.getElementById('formLeaderNote').value.trim() : '';

    if (!isDraft) {
        let firstInvalid = null;
        const req = [['formNYCName', name], ['formNYCDob', dob], ['formNYCDocNo', docNo], ['formNYCDocDate', docDate], ['formNYCDocPlace', docPlace], ['formNYCAddressDetail', addressDetail], ['formHanhVi', hanhVi]];
        req.forEach(([fid, val]) => { if (!val) firstInvalid = markInvalid(document.getElementById(fid), firstInvalid); });
        if (!city) firstInvalid = markInvalid(country === 'Việt Nam' ? document.getElementById('formNYCTinhThanh') : document.getElementById('formNYCTinhThanhText'), firstInvalid);
        if (!ward) firstInvalid = markInvalid(country === 'Việt Nam' ? document.getElementById('formNYCPhuongXa') : document.getElementById('formNYCPhuongXaText'), firstInvalid);
        // Bắt buộc ít nhất một thông tin liên hệ
        if (!phone && !email) {
            firstInvalid = markInvalid(document.getElementById('formNYCPhone'), firstInvalid);
            markInvalid(document.getElementById('formNYCEmail'), firstInvalid);
        }
        if (hasNbth) {
            [['nbthName', nbth.name], ['nbthDob', nbth.dob], ['nbthDocNo', nbth.docNo]].forEach(([fid, val]) => { if (!val) firstInvalid = markInvalid(document.getElementById(fid), firstInvalid); });
        }
        // Bắt buộc chọn Lãnh đạo phê duyệt theo cấu hình luồng của đơn vị
        if (!leader) {
            firstInvalid = markInvalid(document.getElementById('formLeaderSelect'), firstInvalid);
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
        nycName: name, nycRole: role,
        nycGender: document.getElementById('formNYCGender').value,
        nycDob: dob, nycDocType: document.getElementById('formNYCDocType').value, nycDocNo: docNo, nycDocDate: docDate, nycDocPlace: docPlace,
        nycPhone: phone, nycEmail: email, nycCountry: country, nycTinhThanh: city, nycPhuongXa: ward, nycAddressDetail: addressDetail,
        nbth: nbth,
        hanhVi: hanhVi,
        vanBanCanCu: getCleanBasisRows(),
        hinhThucNhan: notifyMethod,
        diaChiNhanThongBao: diaChiNhan,
        attachedDocs: cleanDocs,
        attachedFile: cleanDocs[0] ? cleanDocs[0].file : ""
    };

    if (formRequestId) {
        const item = requestList.find(r => r.id === formRequestId);
        if (!item) return;
        Object.assign(item, data);
        if (!isDraft) {
            const res = BTNN_WF.submitForApproval(item.code, 'Tiếp nhận yêu cầu', leaderNote, cleanDocs, { assignee: leader, resultStatus: 'Đang thực hiện' });
            if (!res.ok) {
                showToast(res.message, "error");
                return;
            }
            saveItem(item);
            showToast(`Đã trình Lãnh đạo ${BTNN_WF.userName(leader)} phê duyệt tiếp nhận yêu cầu ${item.code}!`, "success");
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
            // Hồ sơ tạo trực tiếp tại phân hệ: sinh Mã vụ việc toàn trình mới
            maVuViec: BTNN_WF.nextVuViecCode(),
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
            status: 'Đang thực hiện',
            procBasis: "", procTargetAgency: "", procReason: "", procDecisionFile: "", claimCode: "-"
        }, data);
        saveItem(item);
        requestList.unshift(item);
        if (!isDraft) {
            const res = BTNN_WF.submitForApproval(item.code, 'Tiếp nhận yêu cầu', leaderNote, cleanDocs, { assignee: leader, resultStatus: 'Đang thực hiện' });
            if (!res.ok) {
                showToast(res.message, "error");
                return;
            }
            saveItem(item);
            showToast(`Đã tạo và trình Lãnh đạo ${BTNN_WF.userName(leader)} phê duyệt yêu cầu ${newCode}!`, "success");
        } else {
            BTNN_WF.addHistory(item, 'Tạo yêu cầu', `Cán bộ tạo trực tiếp, đồng thời là cán bộ chủ trì.`);
            saveItem(item);
            showToast(`Đã lưu hồ sơ ${newCode}!`, "success");
        }
    }
    showListScreen();
}

// Save verification results
// Lưu kết quả xác định; khi chọn "Lưu và trình phê duyệt" thì mở popup Trình phê duyệt
function saveProcessResult(andSubmit) {
    const id = document.getElementById('processRequestId').value;
    const basis = document.getElementById('procBasis').value.trim();
    let agency = document.getElementById('procTargetAgency').value;
    if (!agency) agency = document.getElementById('procTargetAgencyInput').value.trim();
    const reason = document.getElementById('procReason').value.trim();
    const file = fileCache['procDecisionFile'];

    clearValidation();
    let firstInvalid = null;
    if (!basis) firstInvalid = markInvalid(document.getElementById('procBasis'), firstInvalid);
    if (!agency) firstInvalid = markInvalid(document.getElementById('procTargetAgencyInput'), firstInvalid);
    if (!reason) firstInvalid = markInvalid(document.getElementById('procReason'), firstInvalid);
    if (firstInvalid) { showToast("Vui lòng nhập đầy đủ thông tin bắt buộc!", "error"); firstInvalid.focus(); return; }

    const item = requestList.find(r => r.id === id);
    if (!item) return;
    item.procBasis = basis;
    item.procTargetAgency = agency;
    item.procReason = reason;
    if (file) item.procDecisionFile = file;
    BTNN_WF.addHistory(item, 'Cập nhật kết quả xác định', `Cơ quan được chỉ định: ${agency}.`);
    saveItem(item);
    showToast("Đã lưu kết quả xác định cơ quan giải quyết bồi thường!", "success");
    showDetailScreen(id);
    if (andSubmit) openSubmitApprovalModal(id, BTNN_WF.KIND_KQXD);
}

// Save spawned claim

// Search & Pagination Logic
function applyFilters() {
    currentPage = 1;
    filterData();
}

function resetFilters() {
    document.getElementById('filterCode').value = '';
    document.getElementById('filterClaimCode').value = '';
    document.getElementById('filterName').value = '';
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
        const roleTag = isChuTri(item) ? '<span class="role-tag">Chủ trì</span>' : '';
        tr.innerHTML = `
            <td style="text-align:center;">${startIdx + index + 1}</td>
            <td style="text-align:center;"><strong>${escapeHtml(item.code)}</strong></td>
            <td style="text-align:center;">${escapeHtml(item.maVuViec || '-')}</td>
            <td><strong>${escapeHtml(item.nycName || '(Chưa nhập)')}</strong></td>
            <td style="text-align:center;">${escapeHtml(item.nycPhone || '(Chưa nhập)')}</td>
            <td style="font-size:12px; color:var(--text-muted);">${escapeHtml((item.linhVuc || '').replace("TRONG HOẠT ĐỘNG ", ""))}</td>
            <td style="font-size:12px; color:var(--text-muted);" title="${escapeAttr(hanhVi)}">${escapeHtml(hanhVi.length > 50 ? hanhVi.slice(0, 50) + "..." : hanhVi)}</td>
            <td style="text-align:center;">${escapeHtml(item.date || '')}</td>
            <td>${unitWithTypeHtml(item.rootUnitId, true)}</td>
            <td>${escapeHtml(item.chuTri ? BTNN_WF.userName(item.chuTri) : '--')}${roleTag}</td>
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
        return BTNN_WF.canApprove(item, me)
            ? `<button class="icon-btn accept" title="Phê duyệt" onclick="BTNN_LD.openDecision('${escapeAttr(item.code)}','approve', afterXdLeaderAction)"><i class="fa-solid fa-circle-check"></i></button><button class="icon-btn delete" title="Từ chối" onclick="BTNN_LD.openDecision('${escapeAttr(item.code)}','reject', afterXdLeaderAction)"><i class="fa-solid fa-circle-xmark"></i></button>`
            : off('accept', 'fa-solid fa-circle-check', 'Phê duyệt') + off('delete', 'fa-solid fa-circle-xmark', 'Từ chối');
    }
    const owner = isChuTri(item);
    const ACTIONS = {
        accept: { icon: 'fa-solid fa-file-import', cls: 'accept', title: 'Tiếp nhận' },
        supplement: { icon: 'fa-solid fa-file-circle-question', cls: 'edit', title: 'Yêu cầu bổ sung' },
        reject: { icon: 'fa-solid fa-ban', cls: 'delete', title: 'Từ chối' },
        update: { icon: 'fa-solid fa-pen-to-square', cls: 'edit', title: 'Cập nhật' },
        transfer: { icon: 'fa-solid fa-share-from-square', cls: 'transfer', title: 'Chuyển CQGQBT' }
    };
    const on = (key, onclick, title) => `<button class="icon-btn ${ACTIONS[key].cls}" title="${escapeAttr(title || ACTIONS[key].title)}" onclick="${onclick}"><i class="${ACTIONS[key].icon}"></i></button>`;
    const off = (key, title) => `<button class="icon-btn ${ACTIONS[key].cls} is-disabled" title="${escapeAttr(title || (ACTIONS[key].title + ' - Không áp dụng ở trạng thái hiện tại'))}" disabled><i class="${ACTIONS[key].icon}"></i></button>`;
    const notOwner = 'Chỉ cán bộ xử lý được thực hiện';
    const id = item.id;
    const s = item.status;
    const slots = {
        accept: '',
        supplement: '',
        reject: '',
        update: '',
        transfer: ''
    };
    if (s === 'Chờ tiếp nhận') {
        slots.accept = owner ? on('accept', `acceptRequest('${id}')`) : off('accept', notOwner);
        slots.supplement = owner ? on('supplement', `openSupplementModal('${id}')`) : off('supplement', notOwner);
        slots.reject = owner ? on('reject', `openRejectModal('${id}')`) : off('reject', notOwner);
    } else if (s === 'Đang thực hiện') {
        slots.update = owner ? on('update', `showProcessScreen('${id}')`, 'Cập nhật kết quả xác định') : off('update', notOwner);
    } else if (s === 'Bị trả lại') {
        slots.supplement = owner ? on('supplement', `openSupplementModal('${id}')`) : off('supplement', notOwner);
        slots.reject = owner ? on('reject', `openRejectModal('${id}')`) : off('reject', notOwner);
        slots.update = owner ? on('update', `showFormScreen('${id}', 'edit')`, 'Cập nhật và trình duyệt lại') : off('update', notOwner);
    } else if (s === 'Chờ chuyển CQGQBT') {
        slots.transfer = owner ? on('transfer', `openTransferModal('${id}')`) : off('transfer', notOwner);
    }
    return ['accept', 'supplement', 'reject', 'update', 'transfer'].map(k => slots[k] || off(k)).join('');
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

function selectAgencyOption(val) {
    document.getElementById('procTargetAgencyInput').value = val;
    document.getElementById('procTargetAgency').value = val;
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








// ---------------- Popup dùng chung: Trình duyệt / Yêu cầu bổ sung / Từ chối / Chuyển CQGQBT ----------------
const modalFiles = { submit: [], supplement: [], reject: [], transfer: [] };

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

function addModalFiles(kind, input) {
    const files = Array.from(input.files || []).map(f => ({ name: f.name }));
    modalFiles[kind] = modalFiles[kind].concat(files);
    input.value = '';
    renderModalFiles(kind);
    if (files.length) showToast(`Đính kèm tập tin: ${files.map(f => f.name).join(', ')} thành công!`, 'success');
}

// Xóa tệp: hỏi lại bằng popup xác nhận
function removeModalFile(kind, idx) {
    const f = modalFiles[kind][idx];
    if (!f) return;
    showConfirmModal(`Bạn có chắc chắn muốn xóa tệp "${f.name}" không?`, () => {
        modalFiles[kind].splice(idx, 1);
        renderModalFiles(kind);
    });
}

function renderModalFiles(kind) {
    const box = document.getElementById(`${kind}FilesList`);
    if (!box) return;
    box.innerHTML = modalFiles[kind].map((f, i) => `<div class="wf-file-item"><i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i><span style="font-weight:500;">${escapeHtml(f.name)}</span><a href="#" onclick="event.preventDefault(); previewNamedFile('${escapeAttr(f.name)}');" style="color:var(--secondary-color); text-decoration:none; font-size:12px;"><i class="fa-solid fa-eye"></i> Xem file</a><a href="#" onclick="event.preventDefault(); removeModalFile('${kind}', ${i});" style="color:var(--danger-color); text-decoration:none; font-size:12px;"><i class="fa-solid fa-trash"></i> Xóa file</a></div>`).join('');
    if (modalFiles[kind].length) {
        const err = document.getElementById(`${kind}FileError`);
        if (err) err.style.display = 'none';
        const upload = document.getElementById(`${kind}FileBox`);
        if (upload) upload.classList.remove('is-invalid');
    }
}

// Khối tóm tắt hồ sơ trong popup trình Lãnh đạo
function approvalSummaryHtml(item) {
    return `<div style="font-weight: 700; color: #1e3a8a; margin-bottom: 8px; font-size: 13px; text-transform: uppercase;">
        <i class="fa-solid fa-file-lines"></i> Tóm tắt hồ sơ yêu cầu
    </div>
    <div class="wf-summary-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px;">
        <div><span style="color:#64748b;">Mã yêu cầu:</span> <b style="color:#1e3a8a;">${escapeHtml(item.code || '--')}</b></div>
        <div><span style="color:#64748b;">Người yêu cầu:</span> <b style="color:#1e3a8a;">${escapeHtml(item.nycName || item.claimant || item.name || '--')}</b></div>
        <div><span style="color:#64748b;">Ngày tiếp nhận:</span> <b>${escapeHtml(item.date || item.receivedAt || '--')}</b></div>
        <div><span style="color:#64748b;">Trạng thái:</span> ${statusCellHtml(item)}</div>
        <div><span style="color:#64748b;">Cán bộ xử lý:</span> <b>${escapeHtml(item.chuTri ? BTNN_WF.userName(item.chuTri) : '--')}</b></div>
        <div><span style="color:#64748b;">Đơn vị tiếp nhận:</span> <b>${unitWithTypeHtml(item.rootUnitId)}</b></div>
    </div>`;
}

// Ô "Lãnh đạo phê duyệt": nhóm lãnh đạo của cấp phê duyệt đầu tiên (luồng ngược chiều phân công)
function fillLeaderSelect(selectId, item) {
    const sel = document.getElementById(selectId);
    const leaders = BTNN_WF.firstLevelLeaders(item);
    sel.innerHTML = leaders.length
        ? '<option value="">-- Chọn Lãnh đạo phê duyệt --</option>' + leaders.map(id => `<option value="${escapeAttr(id)}">${escapeHtml(BTNN_WF.userLabel(id))}</option>`).join('')
        : '<option value="">Cấp phê duyệt đầu tiên chưa cấu hình nhóm lãnh đạo</option>';
    sel.disabled = !leaders.length;
    sel.value = '';
    return leaders;
}

// Dòng "Luồng phê duyệt" (chỉ đọc, một dòng) đặt ngay dưới ô "Lãnh đạo phê duyệt"
function approvalPathHtml(item) {
    return BTNN_WF.approvalPathLineHtml(item)
        || '<div class="wf-path-line" style="font-size:12.5px; color:#b91c1c; margin:4px 0 0;"><b>Luồng phê duyệt:</b> Chưa xác định được cấp phê duyệt.</div>';
}

// Kiểm tra các trường bắt buộc của popup trình Lãnh đạo; trả về null nếu còn trường bắt buộc rỗng
function collectApprovalForm(opts) {
    clearValidation();
    let firstInvalid = null;
    const contentEl = document.getElementById(opts.contentId);
    const content = contentEl.value.trim();
    if (!content) firstInvalid = markInvalid(contentEl, firstInvalid);
    if (opts.fileRequired && !modalFiles[opts.fileKind].length) {
        const upload = document.getElementById(`${opts.fileKind}FileBox`);
        if (upload) upload.classList.add('is-invalid');
        const err = document.getElementById(`${opts.fileKind}FileError`);
        if (err) err.style.display = 'block';
        if (!firstInvalid && upload) firstInvalid = upload;
    }
    const leaderEl = document.getElementById(opts.leaderId);
    const assignee = leaderEl.value;
    if (!leaderEl.disabled && !assignee) firstInvalid = markInvalid(leaderEl, firstInvalid);
    if (firstInvalid) {
        showToast("Vui lòng nhập đầy đủ thông tin bắt buộc!", "error");
        if (firstInvalid.focus) firstInvalid.focus();
        return null;
    }
    return { content, assignee };
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

// Popup Trình duyệt (Nội dung trình: Kết quả xác định CQGQBT; trình lại hồ sơ Bị trả lại theo Nội dung trình bị trả lại)
function openSubmitApprovalModal(id, kind) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    const presetKind = kind || (item.status === 'Bị trả lại' && item.returned && item.returned.kind) || BTNN_WF.KIND_KQXD;
    // Nội dung trình Yêu cầu bổ sung / Từ chối: trình qua popup tương ứng (bắt buộc Văn bản đính kèm trình Lãnh đạo)
    if (presetKind === 'Yêu cầu bổ sung') { openSupplementModal(id); return; }
    if (presetKind === 'Từ chối') { openRejectModal(id); return; }
    if (!(item.procBasis && item.procTargetAgency && item.procReason)) {
        showToast(`Hồ sơ ${item.code} chưa có kết quả xác định. Vui lòng Cập nhật kết quả xác định trước khi trình duyệt.`, "info");
        return;
    }
    clearValidation();
    document.getElementById('submitRequestId').value = id;
    document.getElementById('submitKindValue').value = BTNN_WF.KIND_KQXD;
    document.getElementById('submitKindText').value = BTNN_WF.KIND_KQXD;
    document.getElementById('submitSummary').innerHTML = approvalSummaryHtml(item);
    document.getElementById('submitContent').value = '';
    modalFiles.submit = [];
    renderModalFiles('submit');
    fillLeaderSelect('submitLeader', item);
    document.getElementById('submitPathInfo').innerHTML = approvalPathHtml(item);
    openXdModal('submitApprovalModal');
}

function confirmSubmitApproval() {
    const id = document.getElementById('submitRequestId').value;
    const item = requestList.find(r => r.id === id);
    if (!item) return;
    const kind = document.getElementById('submitKindValue').value || BTNN_WF.KIND_KQXD;
    const data = collectApprovalForm({ contentId: 'submitContent', fileKind: 'submit', fileRequired: false, leaderId: 'submitLeader' });
    if (!data) return;
    const res = BTNN_WF.submitForApproval(item.code, kind, data.content, modalFiles.submit.slice(), { assignee: data.assignee });
    if (!res.ok) { showToast(res.message, 'error'); return; }
    closeXdModal('submitApprovalModal');
    afterSubmitted(item.code, `Đã trình ${data.assignee ? BTNN_WF.userName(data.assignee) : 'Lãnh đạo'} phê duyệt hồ sơ ${item.code}. Trạng thái: [Chờ duyệt] - Nội dung trình: ${kind}.`);
}

// ---------------- Popup Yêu cầu bổ sung hồ sơ ----------------
function openSupplementModal(id) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    clearValidation();
    const resubmit = item.status === 'Bị trả lại' && item.returned && item.returned.kind === 'Yêu cầu bổ sung';
    document.getElementById('supplementRequestId').value = id;
    document.getElementById('supplementSummary').innerHTML = approvalSummaryHtml(item);
    document.getElementById('supplementContent').value = resubmit ? ((item.approval && item.approval.content) || item.supplementReason || '') : '';
    modalFiles.supplement = resubmit && item.approval ? (item.approval.files || []).map(f => ({ name: f.name || f })) : [];
    renderModalFiles('supplement');
    fillLeaderSelect('supplementLeader', item);
    document.getElementById('supplementPathInfo').innerHTML = approvalPathHtml(item);
    openXdModal('supplementModal');
}

function closeSupplementModal() {
    closeXdModal('supplementModal');
}

// Trình Lãnh đạo: hồ sơ chuyển [Chờ duyệt], Nội dung trình "Yêu cầu bổ sung"; cấp cuối phê duyệt thì hồ sơ chuyển [Yêu cầu bổ sung]
function confirmSupplement() {
    const id = document.getElementById('supplementRequestId').value;
    const item = requestList.find(r => r.id === id);
    if (!item) return;
    const data = collectApprovalForm({ contentId: 'supplementContent', fileKind: 'supplement', fileRequired: true, leaderId: 'supplementLeader' });
    if (!data) return;
    const res = BTNN_WF.submitForApproval(item.code, 'Yêu cầu bổ sung', data.content, modalFiles.supplement.slice(), { assignee: data.assignee });
    if (!res.ok) { showToast(res.message, 'error'); return; }
    res.record.supplementReason = data.content;
    res.record.supplementFiles = modalFiles.supplement.slice();
    BTNN_WF.upsertRecord(res.record);
    closeSupplementModal();
    afterSubmitted(item.code, `Đã trình ${data.assignee ? BTNN_WF.userName(data.assignee) : 'Lãnh đạo'} phê duyệt yêu cầu bổ sung hồ sơ ${item.code}. Trạng thái: [Chờ duyệt].`);
}

// ---------------- Popup Từ chối yêu cầu xác định cơ quan ----------------
function openRejectModal(id) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    clearValidation();
    const resubmit = item.status === 'Bị trả lại' && item.returned && item.returned.kind === 'Từ chối';
    document.getElementById('rejectRequestId').value = id;
    document.getElementById('rejectSummary').innerHTML = approvalSummaryHtml(item);
    document.getElementById('rejectReasonInput').value = resubmit ? ((item.approval && item.approval.content) || item.rejectionReason || '') : '';
    modalFiles.reject = resubmit && item.approval ? (item.approval.files || []).map(f => ({ name: f.name || f })) : [];
    renderModalFiles('reject');
    fillLeaderSelect('rejectLeader', item);
    document.getElementById('rejectPathInfo').innerHTML = approvalPathHtml(item);
    openXdModal('rejectModal');
}

function closeRejectModal() {
    closeXdModal('rejectModal');
}

// Trình Lãnh đạo: hồ sơ chuyển [Chờ duyệt], Nội dung trình "Từ chối"; cấp cuối phê duyệt thì hồ sơ chuyển [Bị từ chối]
function confirmRejectRequest() {
    const id = document.getElementById('rejectRequestId').value;
    const item = requestList.find(r => r.id === id);
    if (!item) return;
    const data = collectApprovalForm({ contentId: 'rejectReasonInput', fileKind: 'reject', fileRequired: true, leaderId: 'rejectLeader' });
    if (!data) return;
    const res = BTNN_WF.submitForApproval(item.code, 'Từ chối', data.content, modalFiles.reject.slice(), { assignee: data.assignee });
    if (!res.ok) { showToast(res.message, 'error'); return; }
    res.record.rejectionReason = data.content;
    BTNN_WF.upsertRecord(res.record);
    closeRejectModal();
    afterSubmitted(item.code, `Đã trình ${data.assignee ? BTNN_WF.userName(data.assignee) : 'Lãnh đạo'} phê duyệt từ chối yêu cầu ${item.code}. Trạng thái: [Chờ duyệt].`);
}

// ---------------- Popup Chuyển CQGQBT ----------------
// Cơ quan tiếp nhận: chọn dạng cây (Tree-Select) có tìm kiếm theo Tên / Mã đơn vị; khóa đơn vị hiện tại của hồ sơ XĐ
let transferTreeCtl = null;
function getTransferTree() {
    if (!transferTreeCtl) {
        transferTreeCtl = BTNN_WF.mountUnitTree(document.getElementById('transferAgencyTree'), {
            inputId: 'transferAgencyUnit',
            placeholder: '-- Chọn cơ quan tiếp nhận --',
            onChange: id => {
                if (id) document.getElementById('transferAgencyError').style.display = 'none';
                document.getElementById('transferError').style.display = 'none';
            }
        });
    }
    return transferTreeCtl;
}

function openTransferModal(id) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    clearValidation();
    document.getElementById('transferRequestId').value = id;
    const ctl = getTransferTree();
    ctl.close();
    ctl.setDisabled([item.rootUnitId, item.currentUnitId].filter(Boolean));
    const suggested = BTNN_WF.findRootUnitByName(item.procTargetAgency);
    ctl.setValue(suggested ? suggested.id : '');
    ctl.setInvalid(false);
    document.getElementById('transferAgencyHint').innerHTML = item.procTargetAgency
        ? `<i class="fa-solid fa-circle-info"></i> Cơ quan được chỉ định trong kết quả xác định: <b>${escapeHtml(item.procTargetAgency)}</b>`
        : '';
    document.getElementById('transferContent').value = '';
    document.getElementById('transferError').style.display = 'none';
    modalFiles.transfer = [];
    renderModalFiles('transfer');
    openXdModal('transferModal');
}

function markFileRequired(kind) {
    const upload = document.getElementById(`${kind}FileBox`);
    if (upload) upload.classList.add('is-invalid');
    const err = document.getElementById(`${kind}FileError`);
    if (err) err.style.display = 'block';
}

function showTransferError(message) {
    const box = document.getElementById('transferError');
    box.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(message)}`;
    box.style.display = 'block';
}

// Chuyển hồ sơ sang đơn vị được chọn: hồ sơ YCBT mới thuộc đơn vị gốc của đơn vị được chọn,
// chờ lãnh đạo của chính đơn vị được chọn phân công (currentUnitId = đơn vị được chọn)
// Chuyển hồ sơ sang đơn vị được chọn trên cây đơn vị (lõi kiểm tra cấu hình luồng theo đơn vị gốc của đơn vị được chọn)
function transferXdToUnit(item, unitId, content, files) {
    return BTNN_WF.transferToAgency(item.code, content, files, unitId);
}

function confirmTransfer() {
    clearValidation();
    document.getElementById('transferError').style.display = 'none';
    const id = document.getElementById('transferRequestId').value;
    const item = requestList.find(r => r.id === id);
    if (!item) return;
    const ctl = getTransferTree();
    const unitId = ctl.getValue();
    const contentEl = document.getElementById('transferContent');
    const content = contentEl.value.trim();
    let invalid = false;
    let focusFn = null;
    if (!unitId) {
        ctl.setInvalid(true);
        document.getElementById('transferAgencyError').style.display = 'block';
        invalid = true;
        focusFn = () => ctl.focus();
    }
    if (!content) { markInvalid(contentEl); invalid = true; if (!focusFn) focusFn = () => contentEl.focus(); }
    if (!modalFiles.transfer.length) { markFileRequired('transfer'); invalid = true; }
    if (invalid) { if (focusFn) focusFn(); showToast("Vui lòng nhập đầy đủ thông tin bắt buộc!", "error"); return; }
    // Cơ quan tiếp nhận phải được cấu hình luồng Giải quyết YCBT (hồ sơ mới phân công theo luồng GQ)
    const targetRoot = BTNN_WF.getRootId(unitId) || unitId;
    if (!BTNN_WF.isUnitConfigured(targetRoot, BTNN_WF.FLOW_TYPES.GQ)) {
        showTransferError(`Đơn vị ${BTNN_WF.unitName(targetRoot)} chưa được cấu hình luồng phân công. Vui lòng liên hệ Quản trị hệ thống.`);
        return;
    }
    // Hồ sơ YCBT sinh ra giữ nguyên Mã vụ việc: hồ sơ dữ liệu cũ chưa có mã thì cấp mã trước khi chuyển
    if (!item.maVuViec) { item.maVuViec = BTNN_WF.nextVuViecCode(); saveItem(item); }
    const res = transferXdToUnit(item, unitId, content, modalFiles.transfer.slice());
    if (!res.ok) { showTransferError(res.message); return; }
    closeXdModal('transferModal');
    reloadRequestList();
    showToast(`Đã chuyển CQGQBT. Hồ sơ ${item.code} chuyển [Hoàn thành]; tạo hồ sơ YCBT ${res.ycbtCode} chờ lãnh đạo ${BTNN_WF.unitName(unitId)} phân công.`, "success");
    const fresh = requestList.find(r => r.code === item.code);
    if (fresh) showDetailScreen(fresh.id); else showListScreen();
}


