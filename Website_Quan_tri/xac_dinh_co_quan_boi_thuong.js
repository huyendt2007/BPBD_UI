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
        hinhThucTiepNhan: "Nhận qua bưu điện/bưu chính",
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
        claimCode: "BT-2026-081"
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
        hinhThucTiepNhan: "Nhận qua bưu điện/bưu chính",
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
        claimCode: "-"
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
        hinhThucTiepNhan: "Nhận qua bưu điện/bưu chính",
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
        hinhThucTiepNhan: "Nhận qua bưu điện/bưu chính",
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
        hinhThucTiepNhan: "Nhận qua bưu điện/bưu chính",
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
        hinhThucTiepNhan: "Nhận qua bưu điện/bưu chính",
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
            reason: "Hồ sơ chưa làm rõ căn cứ xác định cơ quan trực tiếp gây thiệt hại; thiếu văn bản tài liệu chứng minh thời điểm phát sinh hành vi trái pháp luật. Yêu cầu chuyên viên kiểm tra, thu thập thêm tài liệu và cập nhật lại."
        },
        attachedFile: "Don_yeu_cau_hung_lv.pdf",
        claimCode: "-"
    }
];

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
    applyScopeNotice();
    applyFilters();

    const detailCode = params.get('detail');
    if (detailCode) {
        const matched = findRecordByCode(detailCode);
        if (matched) showDetailScreen(matched.id);
    }
});

// Phạm vi xem: cán bộ chủ trì, cán bộ phối hợp, người tạo, lãnh đạo các đơn vị trên luồng phân công/phê duyệt.
// Hồ sơ Chờ phân công/Đang phân công nằm tại Tiếp nhận yêu cầu và Hồ sơ trình Lãnh đạo.
let readOnlyView = false;
const LEGACY_FLAG = 'btnn_xd_legacy_seed_v2';

function initWorkflowData() {
    migrateLegacySeed();
    reloadRequestList();
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
            rootUnitId: 'BTP-01', currentUnitId: 'PLN-02', createdBy: 'canbonv', chuTri: 'canbonv', phoiHop: [],
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

function isVisibleToMe(rec) {
    const me = getMe();
    if (rec.module !== 'XD') return false;
    if ([BTNN_WF.STATUS.CHO_PHAN_CONG, BTNN_WF.STATUS.DANG_PHAN_CONG].includes(rec.status)) return false;
    if (rec.chuTri === me || (rec.phoiHop || []).includes(me) || rec.createdBy === me) return true;
    const units = (rec.routes || []).map(r => r.fromUnitId).concat(rec.approval ? rec.approval.path : []);
    return units.some(u => BTNN_WF.isLeaderOf(me, u));
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

function canCreateXd() {
    return BTNN_WF.getRequestTypesForUser().includes(REQUEST_TYPE_XDCQ);
}

function applyScopeNotice() {
    const notice = document.getElementById('xdScopeNotice');
    const btn = document.getElementById('btnCreateRequest');
    const allowed = canCreateXd();
    if (btn) btn.style.display = allowed && !readOnlyView ? 'inline-flex' : 'none';
    if (notice) {
        notice.style.display = allowed ? 'none' : 'block';
        notice.innerHTML = `<i class="fa-solid fa-circle-info"></i> Loại yêu cầu "Xác định cơ quan giải quyết bồi thường" không áp dụng cho đơn vị ${escapeHtml(BTNN_WF.unitName(BTNN_WF.getCurrentUser().unitId))} (Danh mục Loại yêu cầu - Đơn vị áp dụng). Chỉ Bộ Tư pháp và Sở Tư pháp được xử lý loại yêu cầu này.`;
    }
}

function isChuTri(item) { return item && item.chuTri === getMe(); }
function isPhoiHop(item) { return item && (item.phoiHop || []).includes(getMe()); }

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
        // Tiếp nhận hồ sơ được phân công: "Tiếp nhận"; Thêm mới / Cập nhật: "Trình duyệt" (lưu rồi mở popup Trình phê duyệt)
        submitBtn.innerHTML = formMode === 'accept'
            ? '<i class="fa-solid fa-file-import"></i> Tiếp nhận'
            : '<i class="fa-solid fa-paper-plane"></i> Trình duyệt';
    }

    document.getElementById('formHinhThucTiepNhan').value = 'Trực tiếp';
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
    document.querySelector('input[name="formHinhThucNhan"][value="Phương thức điện tử"]').checked = true;
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
            : `<i class="fa-solid fa-file-pen"></i> CHỈNH SỬA YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`;
        const method = item.hinhThucTiepNhan === 'Nhận qua bưu điện/bưu chính' || item.hinhThucTiepNhan === 'Bưu chính' ? 'Nhận qua bưu điện/bưu chính' : 'Trực tiếp';
        document.getElementById('formHinhThucTiepNhan').value = method;
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
        const receiveValue = item.hinhThucNhan === 'Hồ sơ giấy' ? 'Hồ sơ giấy' : 'Phương thức điện tử';
        document.querySelector(`input[name="formHinhThucNhan"][value="${receiveValue}"]`).checked = true;
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
        case 'Chờ phê duyệt': return 'badge-approval';
        case 'Bị trả lại': return 'badge-returned';
        case 'Chờ chuyển CQGQBT': return 'badge-transfer';
        case 'Bị từ chối': return 'badge-rejected';
        case 'Hoàn thành': return 'badge-success';
        default: return 'badge-draft';
    }
}

function fileLinksHtml(files) {
    if (!files || !files.length) return `<span style="color: var(--text-muted); font-style: italic;">Không có tệp đính kèm</span>`;
    return files.map(f => `<div style="font-weight: 600; color: #0F766E; margin-bottom: 4px;"><i class="fa-solid fa-file-pdf"></i> ${escapeHtml(f.name || f)} <a href="#" onclick="event.preventDefault(); previewNamedFile('${escapeAttr(f.name || f)}');" style="margin-left: 12px; color: var(--secondary-color); text-decoration: none;"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a></div>`).join('');
}

function openYcbtRecord(code) {
    // Hồ sơ YCBT chỉ có tại phân hệ Giải quyết YCBT sau khi lãnh đạo cơ quan được chỉ định phân công cán bộ
    const ycbt = BTNN_WF.getRecord(code);
    if (ycbt && [BTNN_WF.STATUS.CHO_PHAN_CONG, BTNN_WF.STATUS.DANG_PHAN_CONG].includes(ycbt.status)) {
        showToast(`Hồ sơ ${code} đang [${ycbt.status}] tại ${BTNN_WF.unitName(ycbt.currentUnitId)}; chưa có tại phân hệ Giải quyết yêu cầu bồi thường.`, "info");
        return;
    }
    const url = `quan_ly_boi_thuong.html?id=${encodeURIComponent(code)}`;
    if (window.parent && window.parent !== window && typeof window.parent.openAdminModule === 'function') {
        window.parent.openAdminModule(url, 'quan_ly_boi_thuong.html?v=1');
    } else {
        window.location.href = url;
    }
}

function showDetailScreen(id) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'block';

    const item = requestList.find(r => r.id === id);
    if (!item) return;

    // Ghi nhận thời điểm cán bộ chủ trì xem hồ sơ được phân công (không ảnh hưởng quyền thu hồi của lãnh đạo)
    if (!readOnlyView && BTNN_WF.markViewed(item, getMe())) saveItem(item);

    document.getElementById('detailRequestId').value = id;
    document.getElementById('dtCode').innerText = item.code;

    // Thông báo theo trạng thái
    const notice = document.getElementById('dtNoticeBlock');
    let noticeHtml = '';
    if (item.status === 'Bị trả lại' && item.returned) {
        noticeHtml = `<div style="font-weight:700; color:#b91c1c; margin-bottom:4px;"><i class="fa-solid fa-rotate-left"></i> HỒ SƠ BỊ TRẢ LẠI</div><div><strong>${escapeHtml(BTNN_WF.userName(item.returned.by))}</strong> (${escapeHtml(BTNN_WF.unitName(item.returned.unitId))}) từ chối phê duyệt lúc ${escapeHtml(item.returned.at)}.</div><div><strong>Lý do:</strong> ${escapeHtml(item.returned.reason)}</div><div style="margin-top:4px;">Cán bộ chủ trì cập nhật hồ sơ và trình lại; luồng phê duyệt bắt đầu lại từ cấp phê duyệt đầu tiên.</div>`;
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
    document.getElementById('dtHinhThucTiepNhan').innerText = item.hinhThucTiepNhan || 'Trực tiếp';
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
                ${doc.addedBy ? `<span style="font-weight:400; color:var(--text-muted);">(Phối hợp: ${escapeHtml(BTNN_WF.userName(doc.addedBy))})</span>` : ''}
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
    document.getElementById('dtHinhThucNhan').innerText = item.hinhThucNhan === 'Hồ sơ giấy' ? 'Hồ sơ giấy' : 'Phương thức điện tử (Email, Zalo, SMS...)';
    document.getElementById('dtVanBanCanCu').innerHTML = basisTableHtml(getBasisDocs(item));
    document.getElementById('dtStatus').innerHTML = `<span class="badge ${statusBadgeClass(item.status)}">${item.status}</span>`;

    // Kết quả xác định
    const verificationBlock = document.getElementById('dtVerificationResultBlock');
    if (item.procBasis || item.procTargetAgency || ['Chờ phê duyệt', 'Chờ chuyển CQGQBT', 'Hoàn thành'].includes(item.status)) {
        verificationBlock.style.display = 'block';
        document.getElementById('dtProcBasis').innerText = item.procBasis || 'Chưa cập nhật';
        document.getElementById('dtProcTargetAgency').innerText = item.procTargetAgency || 'Chưa cập nhật';
        document.getElementById('dtProcReason').innerText = item.procReason || 'Chưa cập nhật';
        document.getElementById('dtProcDecisionFile').innerHTML = item.procDecisionFile ? fileLinksHtml([{ name: item.procDecisionFile }]) : `<span style="color: var(--text-muted); font-style: italic;">Chưa đính kèm quyết định</span>`;
    } else {
        verificationBlock.style.display = 'none';
    }

    // Kết quả chuyển CQGQBT
    const transferBlock = document.getElementById('dtTransferBlock');
    if (item.transfer || (item.claimCode && item.claimCode !== '-')) {
        transferBlock.style.display = 'block';
        const tr = item.transfer || {};
        document.getElementById('dtTransferAgency').innerText = tr.targetUnitId ? BTNN_WF.unitName(tr.targetUnitId) : (item.procTargetAgency || '--');
        document.getElementById('dtTransferContent').innerText = tr.content || '--';
        document.getElementById('dtTransferFiles').innerHTML = fileLinksHtml(tr.files || []);
        document.getElementById('dtTransferAt').innerText = tr.at ? `${tr.at} - ${BTNN_WF.userName(tr.by)}` : '--';
        document.getElementById('dtClaimCode').innerHTML = `${escapeHtml(item.claimCode)} <a href="#" onclick="event.preventDefault(); openYcbtRecord('${escapeAttr(item.claimCode)}');" style="margin-left:10px; font-weight:500; color:var(--secondary-color); text-decoration:none;"><i class="fa-solid fa-up-right-from-square"></i> Xem hồ sơ YCBT</a>`;
    } else {
        transferBlock.style.display = 'none';
    }

    // Thông tin xử lý
    document.getElementById('dtRootUnit').innerText = BTNN_WF.unitName(item.rootUnitId);
    document.getElementById('dtChuTri').innerText = item.chuTri ? BTNN_WF.userLabel(item.chuTri) : 'Chưa phân công';
    document.getElementById('dtPhoiHop').innerText = (item.phoiHop || []).length ? item.phoiHop.map(BTNN_WF.userName).join(', ') : 'Không có';
    document.getElementById('dtApprovalWrap').style.display = item.approval ? 'block' : 'none';
    document.getElementById('dtApproval').innerHTML = item.approval ? BTNN_WF.renderApprovalHtml(item) : '';
    document.getElementById('dtRoutes').innerHTML = BTNN_WF.renderRoutesHtml(item);
    document.getElementById('dtHistory').innerHTML = BTNN_WF.renderHistoryHtml(item);

    // Nút thao tác theo trạng thái và vai trò
    const footer = document.getElementById('detailWorkflowActions');
    footer.innerHTML = `<button class="btn btn-secondary" onclick="closeDetailOrReturn()">Đóng</button>`;
    if (readOnlyView) return;

    if (isPhoiHop(item) && !['Hoàn thành', 'Bị từ chối'].includes(item.status)) {
        footer.innerHTML += `<button class="btn btn-secondary" onclick="openCoopDocModal('${item.id}')"><i class="fa-solid fa-paperclip"></i> Bổ sung tài liệu</button>`;
    }
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

    } else if (item.status === 'Yêu cầu bổ sung') {
        // Đã bỏ nút In Phiếu Bổ sung theo yêu cầu
        footer.innerHTML += `<button class="btn btn-primary" onclick="receiveSupplement('${item.id}')"><i class="fa-solid fa-file-circle-check"></i> Tiếp nhận hồ sơ bổ sung</button>`;
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
    const inputs = document.querySelectorAll('.form-control');
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
        if (firstInvalid) {
            showToast("Vui lòng nhập đầy đủ thông tin bắt buộc!", "error");
            firstInvalid.focus();
            return;
        }
    }

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
        hinhThucNhan: document.querySelector('input[name="formHinhThucNhan"]:checked').value,
        attachedDocs: cleanDocs,
        attachedFile: cleanDocs[0] ? cleanDocs[0].file : ""
    };

    if (formRequestId) {
        const item = requestList.find(r => r.id === formRequestId);
        if (!item) return;
        Object.assign(item, data);
        if (formMode === 'accept') {
            if (!isDraft) {
                item.status = 'Đang thực hiện';
                const r = BTNN_WF.latestRoute(item);
                if (r) r.state = 'Đã xử lý';
                BTNN_WF.addHistory(item, 'Tiếp nhận hồ sơ', 'Cán bộ chủ trì tiếp nhận, nhập liệu hồ sơ. Hồ sơ chuyển [Đang thực hiện].');
            }
        } else {
            BTNN_WF.addHistory(item, 'Cập nhật thông tin', 'Cập nhật thông tin hồ sơ.');
        }
        saveItem(item);
        showToast(`Đã lưu hồ sơ ${item.code}. Trạng thái: [${item.status}]!`, "success");
        if (formMode !== 'accept') submitAfterSaveId = item.id;
    } else {
        const me = BTNN_WF.getCurrentUser();
        const newCode = BTNN_WF.nextCode('XD');
        const item = Object.assign({
            id: 'WF-' + newCode,
            code: newCode,
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
            phoiHop: [],
            routes: [],
            approval: null,
            history: [],
            status: 'Đang thực hiện',
            procBasis: "", procTargetAgency: "", procReason: "", procDecisionFile: "", claimCode: "-"
        }, data);
        BTNN_WF.addHistory(item, 'Tạo yêu cầu', `Cán bộ tạo trực tiếp, đồng thời là cán bộ chủ trì. Trạng thái: [${item.status}].`);
        saveItem(item);
        requestList.unshift(item);
        showToast(`Đã lưu hồ sơ ${newCode}. Trạng thái: [Đang thực hiện]!`, "success");
        submitAfterSaveId = item.id;
    }
    showListScreen();
    // Nút "Trình duyệt": sau khi lưu mở popup Trình phê duyệt của hồ sơ
    if (submitAfterSaveId) {
        const target = submitAfterSaveId;
        submitAfterSaveId = null;
        openSubmitApprovalModal(target);
    }
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

    if (!basis) { showToast("Căn cứ pháp lý xác định thẩm quyền bắt buộc phải nhập!", "error"); return; }
    if (!agency) { showToast("Cơ quan chỉ định giải quyết bắt buộc phải nhập!", "error"); return; }
    if (!reason) { showToast("Nhận định lý do xác định chi tiết bắt buộc phải nhập!", "error"); return; }

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
    if (andSubmit) openSubmitApprovalModal(id, 'Hoàn thành xác định');
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
    document.getElementById('filterRole').value = '';
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
    const role = document.getElementById('filterRole').value;

    const parseDate = (str) => {
        if (!str) return null;
        const p = String(str).trim().split(' ').pop().split('/');
        return p.length === 3 ? new Date(p[2], p[1] - 1, p[0]) : null;
    };
    const fromDate = parseDate(document.getElementById('filterFromDate').value);
    const toDate = parseDate(document.getElementById('filterToDate').value);

    filteredList = requestList.filter(item => {
        if (code && !item.code.toLowerCase().includes(code)) return false;
        if (claimCode && !(item.claimCode || '').toLowerCase().includes(claimCode)) return false;
        if (name && !(item.nycName || '').toLowerCase().includes(name)) return false;
        if (lv && item.linhVuc !== lv) return false;
        if (status && item.status !== status) return false;
        if (role === 'chuTri' && !isChuTri(item)) return false;
        if (role === 'phoiHop' && !isPhoiHop(item)) return false;
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
        tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:var(--text-muted); padding:30px; font-style:italic;">Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</td></tr>`;
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
        const roleTag = isChuTri(item) ? '<span class="role-tag">Chủ trì</span>' : isPhoiHop(item) ? '<span class="role-tag coop">Phối hợp</span>' : '';
        tr.innerHTML = `
            <td style="text-align:center;">${startIdx + index + 1}</td>
            <td style="text-align:center;"><strong>${escapeHtml(item.code)}</strong></td>
            <td><strong>${escapeHtml(item.nycName || '(Chưa nhập)')}</strong></td>
            <td style="text-align:center;">${escapeHtml(item.nycPhone || '(Chưa nhập)')}</td>
            <td style="font-size:12px; color:var(--text-muted);">${escapeHtml((item.linhVuc || '').replace("TRONG HOẠT ĐỘNG ", ""))}</td>
            <td style="font-size:12px; color:var(--text-muted);" title="${escapeAttr(hanhVi)}">${escapeHtml(hanhVi.length > 50 ? hanhVi.slice(0, 50) + "..." : hanhVi)}</td>
            <td style="text-align:center;">${escapeHtml(item.date || '')}</td>
            <td>${escapeHtml(item.chuTri ? BTNN_WF.userName(item.chuTri) : '--')}${roleTag}</td>
            <td style="text-align:center; font-weight:700; color:#8B5CF6;">${escapeHtml(item.claimCode || '-')}</td>
            <td style="text-align:center;"><span class="badge ${statusBadgeClass(item.status)}">${escapeHtml(item.status)}</span></td>
            <td class="action-cell">
                <div class="action-flex">${getActionButtons(item) || '<span class="muted-action">-</span>'}</div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderPagination(totalPages);
}

// Lưới danh sách: 05 thao tác cố định theo thứ tự Tiếp nhận | Yêu cầu bổ sung | Từ chối | Cập nhật | Chuyển CQGQBT.
// Thao tác không khả dụng vẫn hiển thị nhưng mờ (disabled), kèm chú thích lý do.
function getActionButtons(item) {
    if (readOnlyView) return '';
    const owner = isChuTri(item);
    const ACTIONS = {
        accept: { icon: 'fa-solid fa-file-import', cls: 'accept', title: 'Tiếp nhận' },
        supplement: { icon: 'fa-solid fa-file-circle-question', cls: 'edit', title: 'Yêu cầu bổ sung' },
        reject: { icon: 'fa-solid fa-ban', cls: 'delete', title: 'Từ chối' },
        update: { icon: 'fa-solid fa-pen-to-square', cls: 'edit', title: 'Cập nhật' },
        transfer: { icon: 'fa-solid fa-share-from-square', cls: 'transfer', title: 'Chuyển CQGQBT' }
    };
    const on = (key, onclick, title) => `<button class="icon-btn ${ACTIONS[key].cls}" title="${escapeAttr(title || ACTIONS[key].title)}" onclick="${onclick}"><i class="${ACTIONS[key].icon}"></i></button>`;
    const off = () => '';
    const notOwner = 'Chỉ cán bộ chủ trì được thực hiện';
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
    } else if (s === 'Yêu cầu bổ sung') {
        slots.accept = owner ? on('accept', `receiveSupplement('${id}')`, 'Tiếp nhận hồ sơ bổ sung') : off('accept', notOwner);
    } else if (s === 'Đang thực hiện') {
        slots.update = owner ? on('update', `showProcessScreen('${id}')`, 'Cập nhật kết quả xác định') : off('update', notOwner);
    } else if (s === 'Bị trả lại') {
        slots.supplement = owner ? on('supplement', `openSupplementModal('${id}')`) : off('supplement', notOwner);
        slots.reject = owner ? on('reject', `openRejectModal('${id}')`) : off('reject', notOwner);
        slots.update = owner ? on('update', `showFormScreen('${id}', 'edit')`, 'Cập nhật và trình duyệt lại') : off('update', notOwner);
    } else if (s === 'Chờ chuyển CQGQBT') {
        slots.transfer = owner ? on('transfer', `openTransferModal('${id}')`) : off('transfer', notOwner);
    }
    return slots.accept + slots.supplement + slots.reject + slots.update + slots.transfer;
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








// ---------------- Popup dùng chung: Trình phê duyệt / Chuyển CQGQBT / Bổ sung tài liệu ----------------
const modalFiles = { submit: [], transfer: [], coop: [] };

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
    modalFiles[kind] = kind === 'coop' ? files.slice(0, 1) : modalFiles[kind].concat(files);
    input.value = '';
    renderModalFiles(kind);
}

function removeModalFile(kind, idx) {
    modalFiles[kind].splice(idx, 1);
    renderModalFiles(kind);
}

function renderModalFiles(kind) {
    const box = document.getElementById(`${kind}FilesList`);
    box.innerHTML = modalFiles[kind].map((f, i) => `<div class="wf-file-item"><i class="fa-solid fa-file-pdf" style="color:#EF4444;"></i><span style="font-weight:500;">${escapeHtml(f.name)}</span><a href="#" onclick="event.preventDefault(); previewNamedFile('${escapeAttr(f.name)}');" style="color:var(--secondary-color); text-decoration:none; font-size:12px;">Xem file</a><a href="#" onclick="event.preventDefault(); removeModalFile('${kind}', ${i});" style="color:var(--danger-color); text-decoration:none; font-size:12px;"><i class="fa-solid fa-trash"></i> Xóa file</a></div>`).join('');
    const err = document.getElementById(`${kind}FileError`);
    if (err && modalFiles[kind].length) err.style.display = 'none';
}

function openSubmitApprovalModal(id, kind) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    clearValidation();
    document.getElementById('submitRequestId').value = id;
    const presetKind = kind || (item.returned && item.returned.kind) || (item.approval && item.approval.kind) || 'Hoàn thành xác định';
    document.querySelector(`input[name="submitKind"][value="${presetKind}"]`).checked = true;
    document.getElementById('submitContent').value = '';
    modalFiles.submit = [];
    renderModalFiles('submit');
    const path = BTNN_WF.computeApprovalPath(item);
    document.getElementById('submitPathInfo').innerHTML = path.length
        ? `<strong>Luồng phê duyệt (ngược chiều luồng phân công):</strong> ${path.map((u, i) => `${i + 1}. ${escapeHtml(BTNN_WF.unitName(u))}`).join(' → ')}<br>Sau khi cấp cuối phê duyệt: Hoàn thành xác định → [Chờ chuyển CQGQBT]; Yêu cầu bổ sung → [Yêu cầu bổ sung]; Từ chối → [Bị từ chối].${item.status === 'Bị trả lại' ? '<br>Hồ sơ trình lại bắt đầu từ cấp phê duyệt đầu tiên.' : ''}`
        : '<span style="color:#b91c1c;">Chưa xác định được cấp phê duyệt. Vui lòng liên hệ Quản trị hệ thống.</span>';
    openXdModal('submitApprovalModal');
}

function confirmSubmitApproval() {
    clearValidation();
    const id = document.getElementById('submitRequestId').value;
    const item = requestList.find(r => r.id === id);
    const kind = document.querySelector('input[name="submitKind"]:checked').value;
    const contentEl = document.getElementById('submitContent');
    const content = contentEl.value.trim();
    if (!content) { markInvalid(contentEl); contentEl.focus(); return; }
    if (kind === 'Hoàn thành xác định' && !(item.procBasis && item.procTargetAgency && item.procReason)) {
        showToast("Vui lòng cập nhật kết quả xác định (căn cứ, cơ quan được chỉ định, lý do) trước khi trình Hoàn thành xác định!", "error");
        return;
    }
    const res = BTNN_WF.submitForApproval(item.code, kind, content, modalFiles.submit.slice());
    closeXdModal('submitApprovalModal');
    if (!res.ok) { showToast(res.message, 'error'); return; }
    if (kind === 'Yêu cầu bổ sung') res.record.supplementReason = content;
    if (kind === 'Từ chối') res.record.rejectionReason = content;
    BTNN_WF.upsertRecord(res.record);
    reloadRequestList();
    showToast(`Đã trình phê duyệt hồ sơ ${item.code}. Trạng thái: [Chờ phê duyệt].`, "success");
    const fresh = requestList.find(r => r.code === item.code);
    if (fresh) showDetailScreen(fresh.id); else showListScreen();
}

function openTransferModal(id) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    clearValidation();
    document.getElementById('transferRequestId').value = id;
    document.getElementById('transferAgency').value = item.procTargetAgency || '';
    document.getElementById('transferContent').value = '';
    document.getElementById('transferError').style.display = 'none';
    document.getElementById('transferFileError').style.display = 'none';
    modalFiles.transfer = [];
    renderModalFiles('transfer');
    openXdModal('transferModal');
}

function confirmTransfer() {
    clearValidation();
    const id = document.getElementById('transferRequestId').value;
    const item = requestList.find(r => r.id === id);
    const contentEl = document.getElementById('transferContent');
    const content = contentEl.value.trim();
    let invalid = false;
    if (!content) { markInvalid(contentEl); invalid = true; }
    if (!modalFiles.transfer.length) { document.getElementById('transferFileError').style.display = 'block'; invalid = true; }
    if (invalid) return;
    const res = BTNN_WF.transferToAgency(item.code, content, modalFiles.transfer.slice());
    if (!res.ok) {
        const box = document.getElementById('transferError');
        box.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(res.message)}`;
        box.style.display = 'block';
        return;
    }
    closeXdModal('transferModal');
    reloadRequestList();
    showToast(`Đã chuyển CQGQBT. Hồ sơ ${item.code} chuyển [Hoàn thành]; tạo hồ sơ YCBT ${res.ycbtCode} chờ lãnh đạo ${BTNN_WF.unitName(res.record.transfer.targetUnitId)} phân công.`, "success");
    const fresh = requestList.find(r => r.code === item.code);
    if (fresh) showDetailScreen(fresh.id); else showListScreen();
}

function openCoopDocModal(id) {
    clearValidation();
    document.getElementById('coopRequestId').value = id;
    document.getElementById('coopDocName').value = '';
    document.getElementById('coopFileError').style.display = 'none';
    modalFiles.coop = [];
    renderModalFiles('coop');
    openXdModal('coopDocModal');
}

function confirmCoopDoc() {
    clearValidation();
    const id = document.getElementById('coopRequestId').value;
    const item = requestList.find(r => r.id === id);
    const nameEl = document.getElementById('coopDocName');
    let invalid = false;
    if (!nameEl.value.trim()) { markInvalid(nameEl); invalid = true; }
    if (!modalFiles.coop.length) { document.getElementById('coopFileError').style.display = 'block'; invalid = true; }
    if (invalid || !item) return;
    if (!item.attachedDocs) item.attachedDocs = [];
    item.attachedDocs.push({ name: nameEl.value.trim(), file: modalFiles.coop[0].name, addedBy: getMe() });
    BTNN_WF.addHistory(item, 'Bổ sung tài liệu', `Cán bộ phối hợp bổ sung tài liệu: ${nameEl.value.trim()}.`);
    saveItem(item);
    closeXdModal('coopDocModal');
    showToast("Đã bổ sung tài liệu vào hồ sơ!", "success");
    showDetailScreen(id);
}

// Người yêu cầu đã nộp hồ sơ bổ sung: cán bộ chủ trì tiếp nhận để tiếp tục thực hiện
function receiveSupplement(id) {
    const item = requestList.find(r => r.id === id);
    if (!item || !isChuTri(item)) return;
    showConfirmModal(`Xác nhận đã nhận hồ sơ bổ sung của yêu cầu ${item.code}? Hồ sơ chuyển [Đang thực hiện].`, () => {
        item.status = 'Đang thực hiện';
        BTNN_WF.addHistory(item, 'Tiếp nhận hồ sơ bổ sung', 'Hồ sơ chuyển [Đang thực hiện].');
        saveItem(item);
        showToast("Đã tiếp nhận hồ sơ bổ sung!", "success");
        showDetailScreen(id);
    });
}

// In Phiếu hướng dẫn bổ sung hồ sơ xác định cơ quan
let currentXdcqSupplementFiles = [
    { name: 'Huong_dan_ho_so_xac_dinh_co_quan.pdf', size: '180 KB' },
    { name: 'Mau_van_ban_bo_sung_thong_tin.docx', size: '42 KB' }
];

// Mã yêu cầu đang mở tại popup In Phiếu yêu cầu bổ sung (dùng khi lưu lại dữ liệu lúc in)
let xdcqSupplementPrintId = null;

function renderXdcqSupplementFilesList() {
    const listEl = document.getElementById('supplementAttachedFilesList');
    if (!listEl) return;
    if (!currentXdcqSupplementFiles || currentXdcqSupplementFiles.length === 0) {
        listEl.innerHTML = '<div style="font-size:13px; color:#64748b; font-style:italic;">Chưa có tài liệu kèm theo.</div>';
        return;
    }
    listEl.innerHTML = currentXdcqSupplementFiles.map((file, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid #cbd5e1; border-radius:4px; padding:6px 12px; margin-bottom:6px; font-size:13px;">
            <div style="display:flex; align-items:center; gap:8px;">
                <i class="fa-solid fa-file-lines" style="color:#0284c7;"></i>
                <span style="font-weight:500; color:#1e293b;">${escapeHtml(file.name)}</span>
                <span style="color:#94a3b8; font-size:12px;">(${file.size})</span>
            </div>
            <div class="supplement-no-print" style="display:flex; gap:12px; align-items:center;">
                <a href="javascript:void(0)" onclick="viewXdcqSupplementFile('${escapeHtml(file.name)}')" style="color:#2563eb; text-decoration:none; font-weight:500; font-size:12.5px;"><i class="fa-solid fa-eye"></i> Xem file</a>
                <a href="javascript:void(0)" onclick="downloadXdcqSupplementFile('${escapeHtml(file.name)}')" style="color:#059669; text-decoration:none; font-weight:500; font-size:12.5px;"><i class="fa-solid fa-download"></i> Tải file về</a>
                <a href="javascript:void(0)" onclick="removeXdcqSupplementFile(${idx})" style="color:#dc2626; text-decoration:none; font-weight:500; font-size:12.5px;"><i class="fa-solid fa-trash-can"></i> Xóa file</a>
            </div>
        </div>
    `).join('');
}

function handleXdcqSupplementFilesUpload(input) {
    if (!input || !input.files || input.files.length === 0) return;

    const ALLOWED_EXT = ['pdf', 'doc', 'docx', 'jpg', 'png'];
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB theo [BR-FILE-010]
    let addedCount = 0;

    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const ext = file.name.split('.').pop().toLowerCase();

        if (ALLOWED_EXT.indexOf(ext) === -1) {
            if (typeof showToast === 'function') {
                showToast(`Tệp "${file.name}" không đúng định dạng cho phép (.pdf, .doc, .docx, .jpg, .png)!`, 'error');
            }
            continue;
        }
        if (file.size > MAX_SIZE) {
            if (typeof showToast === 'function') {
                showToast(`Tệp "${file.name}" vượt quá dung lượng cho phép (tối đa 20MB)!`, 'error');
            }
            continue;
        }

        const sizeStr = (file.size / 1024 < 1024)
            ? `${Math.round(file.size / 1024)} KB`
            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        currentXdcqSupplementFiles.push({
            name: file.name,
            size: sizeStr
        });
        addedCount++;
    }
    input.value = '';
    renderXdcqSupplementFilesList();
    if (addedCount > 0 && typeof showToast === 'function') {
        showToast('Tải tài liệu đính kèm thành công!', 'success');
    }
}

function viewXdcqSupplementFile(name) {
    window.open('about:blank', '_blank');
}

function downloadXdcqSupplementFile(name) {
    if (typeof showToast === 'function') {
        showToast(`Bắt đầu tải tệp tin: ${name}`, 'info');
    }
}

function removeXdcqSupplementFile(idx) {
    if (idx < 0 || idx >= currentXdcqSupplementFiles.length) return;
    const fileName = currentXdcqSupplementFiles[idx].name;
    showConfirmModal(`Bạn có chắc chắn muốn xóa tài liệu: "${fileName}" khỏi danh sách tài liệu kèm theo không?`, () => {
        currentXdcqSupplementFiles.splice(idx, 1);
        renderXdcqSupplementFilesList();
        if (typeof showToast === 'function') {
            showToast(`Đã xóa tài liệu: ${fileName}`, 'success');
        }
    });
}

function clearXdcqSupplementInputError(inputEl, errorElId) {
    if (inputEl && inputEl.value.trim()) {
        inputEl.classList.remove('is-invalid');
        const err = document.getElementById(errorElId);
        if (err) err.style.display = 'none';
    }
}

// Popup Yêu cầu bổ sung hồ sơ: cán bộ chủ trì soạn nội dung, hệ thống sinh văn bản dự thảo theo mẫu,
// cán bộ có thể tải về (Word) để chỉnh sửa rồi đính lại; nút "Trình Lãnh đạo" gửi phê duyệt.
let supplementDraftUpload = '';
let supplementDraftChoice = ''; // 'generated' | 'uploaded' - bắt buộc chọn trước khi Trình Lãnh đạo

function clearXdcqSupplementInputError(el, errId) {
    if (el) el.classList.remove('is-invalid');
    const err = document.getElementById(errId);
    if (err) err.style.display = 'none';
}

function validateSupplementContent() {
    const input = document.getElementById('xdcqSupplementReasonInput');
    const err = document.getElementById('xdcqSupplementReasonError');
    const val = input ? input.value.trim() : '';
    if (!val) {
        if (input) {
            input.classList.add('is-invalid');
            input.focus();
        }
        if (err) err.style.display = 'block';
        return false;
    }
    return true;
}

function openSupplementModal(id) {
    const item = requestList.find(r => r.id === id);
    if (!item) return;

    const modal = document.getElementById('previewModalSupplement');
    const container = document.getElementById('supplementNoticeContent');
    if (!modal || !container) return;

    xdcqSupplementPrintId = item.id;
    supplementDraftUpload = '';
    supplementDraftChoice = '';
    const reason = item.supplementReason || '';

    currentXdcqSupplementFiles = [];

    const ngayTiepNhan = item.receivedAt || item.date || '01/03/2026';
    const canBo = item.chuTri ? BTNN_WF.userName(item.chuTri) : (item.officer || "Nguyễn Văn Chuyên Viên");
    const donVi = item.rootUnitId ? BTNN_WF.unitName(item.rootUnitId) : (item.agency || "Sở Tư pháp TP. Hà Nội");

    container.innerHTML = `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:16px; margin-bottom:18px;">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; font-size:13.5px; font-family:sans-serif;">
                <div><strong style="color:#475569;">Mã yêu cầu:</strong> <span style="font-weight:700; color:#1e3a8a;">${escapeHtml(item.code)}</span></div>
                <div><strong style="color:#475569;">Ngày tiếp nhận:</strong> <span style="font-weight:600; color:#0f172a;">${escapeHtml(ngayTiepNhan)}</span></div>
                <div style="grid-column: span 2;"><strong style="color:#475569;">Người yêu cầu:</strong> <span style="font-weight:600; color:#0f172a;">${escapeHtml(item.nycName || '')}</span></div>
                <div><strong style="color:#475569;">Cán bộ xử lý:</strong> <span style="font-weight:600; color:#0f172a;">${escapeHtml(canBo)}</span></div>
                <div><strong style="color:#475569;">Đơn vị:</strong> <span style="font-weight:600; color:#0f172a;">${escapeHtml(donVi)}</span></div>
            </div>
        </div>

        <div style="margin-bottom:16px;">
            <label style="display:block; font-weight:600; color:#1e293b; margin-bottom:6px; font-size:13.5px;">
                Nội dung yêu cầu bổ sung: <span style="color:#dc2626;">*</span>
            </label>
            <textarea id="xdcqSupplementReasonInput" class="form-control" rows="4" style="width:100%; box-sizing:border-box; border:1px solid #cbd5e1; border-radius:6px; padding:10px 12px; font-family:sans-serif; font-size:13.5px; line-height:1.5; resize:vertical;" placeholder="Nhập chi tiết nội dung, tài liệu cần bổ sung..." oninput="clearXdcqSupplementInputError(this, 'xdcqSupplementReasonError')">${escapeHtml(reason)}</textarea>
            <div class="error-message" id="xdcqSupplementReasonError" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</div>
        </div>

        <!-- Khối Văn bản dự thảo trình Lãnh đạo (bắt buộc): Mẫu số 08/BTNN do hệ thống sinh hoặc bản đã chỉnh sửa -->
        <div id="supplementDraftCard" style="border:2px solid #2563eb; background:#eff6ff; border-radius:8px; padding:15px; font-family:sans-serif;">
            <p style="font-weight:700; color:#1e3a8a; margin:0 0 10px 0; font-size:14px;"><i class="fa-solid fa-file-signature"></i> Văn bản dự thảo trình Lãnh đạo <span style="color:#dc2626;">*</span></p>
            <div id="supplementDraftBlock"></div>
        </div>
    `;

    renderSupplementDraftBlock();

    modal.style.display = 'flex';
    modal.classList.add('visible');
}

function currentSupplementRecord() {
    const item = requestList.find(r => r.id === xdcqSupplementPrintId);
    return item || null;
}

function currentSupplementContent() {
    const el = document.getElementById('xdcqSupplementReasonInput');
    return el ? el.value.trim() : '';
}

function renderSupplementDraftBlock() {
    const box = document.getElementById('supplementDraftBlock');
    const item = currentSupplementRecord();
    if (!box || !item) return;
    const generated = BTNN_WF.draftBaseName(item) + '.doc';
    const chosen = supplementDraftChoice === 'generated' ? generated : (supplementDraftChoice === 'uploaded' ? supplementDraftUpload : '');
    const optStyle = (on) => `display:block; border:1px solid ${on ? '#2563eb' : '#cbd5e1'}; background:${on ? '#fff' : '#f8fafc'}; border-radius:6px; padding:10px 12px; margin-bottom:8px; cursor:pointer;`;
    box.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:12px; font-size:13px;">
            <span style="color:#475569; font-weight:600;">Văn bản theo Mẫu số 08/BTNN:</span>
            <button type="button" class="btn btn-secondary btn-sm" onclick="previewSupplementDraft()"><i class="fa-solid fa-up-right-from-square"></i> Xem dự thảo</button>
            ${BTNN_WF.downloadSelectHtml('downloadSupplementDraft')}
        </div>
        <div style="font-size:13px; font-weight:600; color:#1e293b; margin-bottom:6px;">Chọn văn bản trình Lãnh đạo:</div>
        <label style="${optStyle(supplementDraftChoice === 'generated')}">
            <input type="radio" name="supplementDraftChoice" value="generated" ${supplementDraftChoice === 'generated' ? 'checked' : ''} onchange="chooseSupplementDraft('generated')">
            <b>Dùng văn bản hệ thống sinh theo Mẫu số 08/BTNN</b>
            ${supplementDraftChoice === 'generated' ? `<div style="margin:6px 0 0 22px; font-size:12.5px; color:#334155;"><i class="fa-solid fa-file-word" style="color:#2563eb;"></i> ${escapeHtml(generated)} <span style="color:#64748b;">(sinh theo nội dung đang nhập tại thời điểm trình)</span></div>` : ''}
        </label>
        <label style="${optStyle(supplementDraftChoice === 'uploaded')}">
            <input type="radio" name="supplementDraftChoice" value="uploaded" ${supplementDraftChoice === 'uploaded' ? 'checked' : ''} onchange="chooseSupplementDraft('uploaded')">
            <b>Tải file</b>
            ${supplementDraftChoice === 'uploaded' ? `<div style="margin:6px 0 0 22px; display:flex; flex-wrap:wrap; align-items:center; gap:10px; font-size:12.5px;">
                ${supplementDraftUpload
                    ? `<span><i class="fa-solid fa-file-word" style="color:#16a34a;"></i> <b>${escapeHtml(supplementDraftUpload)}</b></span>
                       <a href="#" onclick="event.preventDefault(); previewNamedFile('${escapeAttr(supplementDraftUpload)}');" style="color:var(--secondary-color); text-decoration:none;">Xem file</a>
                       <a href="#" onclick="event.preventDefault(); removeSupplementDraftUpload();" style="color:var(--danger-color); text-decoration:none;"><i class="fa-solid fa-trash"></i> Xóa file</a>`
                    : `<span style="color:#b45309;">Chưa đính kèm văn bản</span>`}
                <input type="file" id="supplementDraftUploadInput" style="display:none;" accept=".doc,.docx,.pdf" onchange="uploadSupplementDraft(this)">
                <button type="button" class="btn btn-secondary btn-sm" onclick="event.preventDefault(); document.getElementById('supplementDraftUploadInput').click()"><i class="fa-solid fa-cloud-arrow-up"></i> ${supplementDraftUpload ? 'Thay file' : 'Tải file'}</button>
            </div>` : ''}
        </label>
        ${chosen ? `
        <div style="margin-top:4px; padding:8px 10px; border-radius:6px; background:#dcfce7; color:#166534; font-size:13px;">
            <i class="fa-solid fa-circle-check"></i> Văn bản sẽ trình Lãnh đạo: <b>${escapeHtml(chosen)}</b>
        </div>` : ''}
        <div class="error-message" id="supplementDraftError" style="display:none; color:#dc2626; font-size:12px; margin-top:6px;"></div>`;
}

function chooseSupplementDraft(choice) {
    supplementDraftChoice = choice;
    renderSupplementDraftBlock();
}
function previewSupplementDraft() {
    if (!validateSupplementContent()) return;
    const item = currentSupplementRecord();
    if (item) BTNN_WF.previewDraftDoc(item, currentSupplementContent(), currentXdcqSupplementFiles);
}

function downloadSupplementDraft(format) {
    if (!validateSupplementContent()) return;
    const item = currentSupplementRecord();
    if (item) BTNN_WF.downloadDraftDoc(item, currentSupplementContent(), currentXdcqSupplementFiles, format);
}
function uploadSupplementDraft(input) {
    if (!input.files || !input.files[0]) return;
    supplementDraftUpload = input.files[0].name;
    input.value = '';
    renderSupplementDraftBlock();
}

function removeSupplementDraftUpload() {
    supplementDraftUpload = '';
    renderSupplementDraftBlock();
}
// Giữ alias tương thích
function printSupplementNotice(id) {
    openSupplementModal(id);
}

function closePreviewSupplementModal() {
    const modal = document.getElementById('previewModalSupplement');
    if (modal) {
        modal.classList.remove('visible');
        modal.style.display = 'none';
    }
}

// Trình Lãnh đạo phê duyệt yêu cầu bổ sung; Lãnh đạo phê duyệt cấp cuối thì hồ sơ chuyển [Yêu cầu bổ sung]
function executeSaveSupplement() {
    const reasonInput = document.getElementById('xdcqSupplementReasonInput');
    const reasonErr = document.getElementById('xdcqSupplementReasonError');
    const reasonVal = reasonInput ? reasonInput.value.trim() : '';
    if (!reasonVal) {
        reasonInput.classList.add('is-invalid');
        if (reasonErr) reasonErr.style.display = 'block';
        reasonInput.focus();
        return;
    }
    const item = currentSupplementRecord();
    if (!item) return;

    // Bắt buộc có văn bản dự thảo trình Lãnh đạo
    const draftErr = document.getElementById('supplementDraftError');
    const draftCard = document.getElementById('supplementDraftCard');
    const failDraft = (msg) => {
        if (draftErr) { draftErr.textContent = msg; draftErr.style.display = 'block'; }
        if (draftCard) { draftCard.style.borderColor = '#dc2626'; draftCard.scrollIntoView({ block: 'nearest' }); }
        showToast(msg, 'error');
    };
    if (!supplementDraftChoice) { failDraft('Vui lòng chọn văn bản dự thảo trình Lãnh đạo.'); return; }
    if (supplementDraftChoice === 'uploaded' && !supplementDraftUpload) { failDraft('Vui lòng đính kèm văn bản đã chỉnh sửa trước khi trình Lãnh đạo.'); return; }

    const draftDoc = {
        source: supplementDraftChoice,
        generatedName: BTNN_WF.draftBaseName(item) + '.doc',
        uploadedName: supplementDraftChoice === 'uploaded' ? supplementDraftUpload : '',
        generatedAt: BTNN_WF.nowText()
    };
    const files = currentXdcqSupplementFiles.map(f => ({ name: f.name }));
    files.push({ name: draftDoc.source === 'uploaded' ? draftDoc.uploadedName : draftDoc.generatedName });

    // Lưu nội dung trước khi trình để văn bản dự thảo phía Lãnh đạo sinh đúng nội dung
    item.supplementReason = reasonVal;
    item.supplementFiles = currentXdcqSupplementFiles.slice();
    saveItem(item);

    const res = BTNN_WF.submitForApproval(item.code, 'Yêu cầu bổ sung', reasonVal, files, { draftDoc });
    if (!res.ok) { showToast(res.message, 'error'); return; }

    closePreviewSupplementModal();
    reloadRequestList();
    showToast(`Đã trình Lãnh đạo phê duyệt yêu cầu bổ sung hồ sơ ${item.code}. Trạng thái: [Chờ phê duyệt].`, 'success');
    const fresh = requestList.find(r => r.code === item.code);
    const detailScreen = document.getElementById('screenDetail');
    if (fresh && detailScreen && detailScreen.style.display !== 'none') showDetailScreen(fresh.id);
    else filterData();
}
// ---------------- Logic Modal Từ chối yêu cầu xác định cơ quan ----------------
let currentRejectFile = null;

function openRejectModal(id) {
    const item = requestList.find(r => r.id === id);
    if (!item) return;

    document.getElementById('rejectRequestId').value = item.id;
    document.getElementById('rejectReqCode').innerText = item.code;
    document.getElementById('rejectReqNyc').innerText = item.nycName || '(Chưa nhập)';
    document.getElementById('rejectReqLinhVuc').innerText = item.linhVuc || '(Chưa xác định)';

    const reasonInput = document.getElementById('rejectReasonInput');
    if (reasonInput) {
        reasonInput.value = '';
        reasonInput.classList.remove('is-invalid');
    }
    const err = document.getElementById('rejectReasonError');
    if (err) err.style.display = 'none';

    currentRejectFile = null;
    updateRejectFileUI();

    const modal = document.getElementById('rejectModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('visible');
    }
}

function closeRejectModal() {
    const modal = document.getElementById('rejectModal');
    if (modal) {
        modal.classList.remove('visible');
        modal.style.display = 'none';
    }
}

function handleRejectFileUpload(input) {
    if (!input || !input.files || !input.files[0]) return;
    const file = input.files[0];
    currentRejectFile = { name: file.name, size: (file.size / 1024).toFixed(0) + ' KB' };
    input.value = '';
    updateRejectFileUI();
    showToast(`Đã chọn tệp đính kèm: ${file.name}`, 'success');
}

function updateRejectFileUI() {
    const nameEl = document.getElementById('rejectFileName');
    const actionsEl = document.getElementById('rejectFileActions');
    if (currentRejectFile) {
        if (nameEl) {
            nameEl.innerText = `${currentRejectFile.name} (${currentRejectFile.size})`;
            nameEl.style.color = '#0f172a';
            nameEl.style.fontStyle = 'normal';
            nameEl.style.fontWeight = '500';
        }
        if (actionsEl) actionsEl.style.display = 'flex';
    } else {
        if (nameEl) {
            nameEl.innerText = 'Chưa chọn tệp';
            nameEl.style.color = '#64748b';
            nameEl.style.fontStyle = 'italic';
            nameEl.style.fontWeight = 'normal';
        }
        if (actionsEl) actionsEl.style.display = 'none';
    }
}

function viewRejectFile() {
    if (!currentRejectFile) return;
    previewNamedFile(currentRejectFile.name);
}

function removeRejectFile() {
    showConfirmModal("Bạn có chắc chắn muốn gỡ tệp đính kèm từ chối này không?", () => {
        currentRejectFile = null;
        updateRejectFileUI();
        showToast("Đã gỡ tệp đính kèm!", "info");
    });
}

function confirmRejectRequest() {
    const id = document.getElementById('rejectRequestId').value;
    const item = requestList.find(r => r.id === id);
    if (!item) return;

    const reasonInput = document.getElementById('rejectReasonInput');
    const reasonErr = document.getElementById('rejectReasonError');
    const reason = reasonInput ? reasonInput.value.trim() : '';

    if (!reason) {
        if (reasonInput) {
            reasonInput.classList.add('is-invalid');
            reasonInput.focus();
        }
        if (reasonErr) reasonErr.style.display = 'block';
        return;
    }

    const nowStr = new Date().toLocaleDateString('vi-VN') + ' ' +
        new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    item.status = 'Bị từ chối';
    item.rejectionReason = reason;
    if (currentRejectFile) item.rejectionFile = currentRejectFile.name;
    item.rejectedAt = nowStr;
    item.rejectedBy = getMe();

    BTNN_WF.addHistory(item, 'Từ chối yêu cầu', `Cán bộ từ chối yêu cầu xác định cơ quan. Lý do: ${reason}`);
    saveItem(item);

    closeRejectModal();
    showToast(`Đã từ chối yêu cầu xác định cơ quan ${item.code}!`, 'success');

    const detailScreen = document.getElementById('screenDetail');
    if (detailScreen && detailScreen.style.display !== 'none') {
        showDetailScreen(item.id);
    } else {
        filterData();
    }
}

