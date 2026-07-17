// Mock Data: 12 items for testing pagination
let requestList = [
    {
        id: "REQ1",
        code: "XD-2026-001",
        date: "01/07/2026",
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
        hinhThucTiepNhan: "Bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ",
        hanhVi: "Bị tạm giam giữ trái pháp luật của Công an tỉnh Lâm Đồng làm suy sụp sức khỏe nghiêm trọng.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Đang xác minh",
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
        hinhThucTiepNhan: "Phương thức điện tử",
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
        status: "Lưu nháp",
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
        date: "28/06/2026",
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
        hinhThucTiepNhan: "Bưu chính",
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
        status: "Đang xác minh",
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
        hinhThucTiepNhan: "Phương thức điện tử",
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
        hinhThucTiepNhan: "Bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ",
        hanhVi: "Kéo dài quá hạn thời gian xét xử tranh chấp đất đai kiều bào gây thiệt hại chi phí đi lại.",
        hinhThucNhan: "Phương thức điện tử",
        status: "Lưu nháp",
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
        hinhThucTiepNhan: "Bưu chính",
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
        hinhThucTiepNhan: "Bưu chính",
        linhVuc: "TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ",
        hanhVi: "Trì hoãn chấp hành án phạt tù làm ảnh hưởng nghiêm trọng đến tinh thần người thi hành án.",
        hinhThucNhan: "Hồ sơ giấy",
        status: "Đang xác minh",
        attachedFile: "Ho_so_yeu_cau_xac_dinh_binh.pdf",
        procBasis: "Khoản 2 Điều 40 - Có sự tham gia của nhiều cơ quan cùng gây thiệt hại",
        procTargetAgency: "UBND quận Hoàn Kiếm, Thành phố Hà Nội",
        procReason: "Về việc liên quan đến quyết định cưỡng chế thi hành án hình sự có sự phối hợp của cơ quan ban ngành liên cấp hành chính.",
        procDecisionFile: "Bao_cao_so_22_binh.pdf",
        claimCode: "-"
    }
];

// Active State
let currentPage = 1;
let pageSize = 10;
let filteredList = [];

// Temporary file upload cache
let fileCache = {
    formFile: null,
    procDecisionFile: null,
    claimFile: null
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Tự động tính toán mặc định 'Từ ngày' (3 tháng trước) đến 'Đến ngày' (ngày hiện tại)
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    // Format dd/mm/yyyy
    const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    document.getElementById('filterFromDate').value = formatDate(threeMonthsAgo);
    document.getElementById('filterToDate').value = formatDate(today);

    // Initialize flatpickr for dates
    flatpickr("#filterFromDate", { dateFormat: "d/m/Y", allowInput: true });
    flatpickr("#filterToDate", { dateFormat: "d/m/Y", allowInput: true });
    flatpickr("#formNYCDob", { dateFormat: "d/m/Y", allowInput: true });
    flatpickr("#formNYCDocDate", { dateFormat: "d/m/Y", allowInput: true });

    // Initial render
    applyFilters();
});

// Toggle Country input for Form (Viet Nam -> dropdown, Other -> Text input)
function toggleCountrySelect(val) {
    const viDiv = document.getElementById('countryViSelection');
    const otherDiv = document.getElementById('countryOtherSelection');
    if (val === 'Việt Nam') {
        viDiv.style.display = 'block';
        otherDiv.style.display = 'none';
    } else {
        viDiv.style.display = 'none';
        otherDiv.style.display = 'block';
    }
}

// Toggle email requirement on Form screen
function toggleFormEmailRequired(required) {
    const label = document.querySelector("#formNYCEmail").previousElementSibling;
    if (required) {
        label.innerHTML = 'Thư điện tử (Email)<span class="required">*</span>';
    } else {
        label.innerHTML = 'Thư điện tử (Email)';
    }
}

// Screen Switching
function showListScreen() {
    document.getElementById('screenList').style.display = 'block';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'none';
    document.getElementById('screenCreateClaim').style.display = 'none';
    renderTable();
}

function showFormScreen(id = null) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'block';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'none';
    document.getElementById('screenCreateClaim').style.display = 'none';

    clearValidation();

    const title = document.getElementById('formScreenTitle');
    const formRequestId = document.getElementById('formRequestId');

    // Reset form fields
    formRequestId.value = id || '';
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
    document.getElementById('formNYCTinhThanh').value = 'Thành phố Hà Nội';
    document.getElementById('formNYCTinhThanhText').value = '';
    document.getElementById('formNYCAddressDetail').value = '';
    document.getElementById('formHanhVi').value = '';
    document.querySelector('input[name="formHinhThucNhan"][value="Phương thức điện tử"]').checked = true;
    toggleFormEmailRequired(true);

    // Reset attached file cache
    clearAttachedFile('formFile', 'formFileAttachmentInfo');

    if (id) {
        title.innerHTML = `<i class="fa-solid fa-file-pen"></i> CHỈNH SỬA YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`;
        const item = requestList.find(r => r.id === id);
        if (item) {
            document.getElementById('formHinhThucTiepNhan').value = item.hinhThucTiepNhan;
            document.getElementById('formLinhVuc').value = item.linhVuc;
            document.getElementById('formNYCName').value = item.nycName;
            document.getElementById('formNYCRole').value = item.nycRole;
            document.getElementById('formNYCGender').value = item.nycGender;
            document.getElementById('formNYCDob').value = item.nycDob;
            document.getElementById('formNYCDocType').value = item.nycDocType;
            document.getElementById('formNYCDocNo').value = item.nycDocNo;
            document.getElementById('formNYCDocDate').value = item.nycDocDate;
            document.getElementById('formNYCDocPlace').value = item.nycDocPlace;
            document.getElementById('formNYCPhone').value = item.nycPhone;
            document.getElementById('formNYCEmail').value = item.nycEmail;
            document.getElementById('formNYCCountry').value = item.nycCountry;
            toggleCountrySelect(item.nycCountry);
            if (item.nycCountry === 'Việt Nam') {
                document.getElementById('formNYCTinhThanh').value = item.nycTinhThanh;
            } else {
                document.getElementById('formNYCTinhThanhText').value = item.nycTinhThanh;
            }
            document.getElementById('formNYCAddressDetail').value = item.nycAddressDetail;
            document.getElementById('formHanhVi').value = item.hanhVi;

            if (item.hinhThucNhan === 'Phương thức điện tử') {
                document.querySelector('input[name="formHinhThucNhan"][value="Phương thức điện tử"]').checked = true;
                toggleFormEmailRequired(true);
            } else {
                document.querySelector('input[name="formHinhThucNhan"][value="Hồ sơ giấy"]').checked = true;
                toggleFormEmailRequired(false);
            }

            if (item.attachedFile) {
                displayAttachedFile('formFile', 'formFileAttachmentInfo', item.attachedFile);
            }
        }
    } else {
        title.innerHTML = `<i class="fa-solid fa-file-signature"></i> THÊM MỚI YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG`;
    }
}

function showProcessScreen(id) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'block';
    document.getElementById('screenDetail').style.display = 'none';
    document.getElementById('screenCreateClaim').style.display = 'none';

    const item = requestList.find(r => r.id === id);
    if (!item) return;

    document.getElementById('processRequestId').value = id;
    document.getElementById('lblProcCode').innerText = item.code;
    document.getElementById('lblProcName').innerText = item.nycName;
    document.getElementById('lblProcLinhVuc').innerText = item.linhVuc;
    document.getElementById('lblProcPhone').innerText = item.nycPhone;
    document.getElementById('lblProcHanhVi').innerText = item.hanhVi;

    // Prefill process fields
    document.getElementById('procBasis').value = item.procBasis || "Khoản 2 Điều 40 - Có sự tham gia của nhiều cơ quan cùng gây thiệt hại";

    // Set searchable dropdown values
    const agencyVal = item.procTargetAgency || "Sở Tư pháp Thành phố Hà Nội";
    document.getElementById('procTargetAgencyInput').value = agencyVal;
    document.getElementById('procTargetAgency').value = agencyVal;

    document.getElementById('procReason').value = item.procReason || "";

    // Prefill officer fields
    // Prefill officer fields
    currentOfficers = item.officers ? JSON.parse(JSON.stringify(item.officers)) : [];
    renderOfficerTable();

    clearAttachedFile('procDecisionFile', 'procFileAttachmentInfo');
    if (item.procDecisionFile) {
        displayAttachedFile('procDecisionFile', 'procFileAttachmentInfo', item.procDecisionFile);
    }
}

function showDetailScreen(id) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'block';
    document.getElementById('screenCreateClaim').style.display = 'none';

    const item = requestList.find(r => r.id === id);
    if (!item) return;

    document.getElementById('detailRequestId').value = id;
    document.getElementById('dtCode').innerText = item.code;

    // Display rejection details if status is Bị từ chối
    const rejectionBlock = document.getElementById('dtRejectionBlock');
    if (rejectionBlock) {
        if (item.status === 'Bị từ chối') {
            rejectionBlock.style.display = 'block';
            document.getElementById('dtRejectionReason').innerText = item.rejectionReason || item.procReason || 'Không có lý do.';
            const fileLink = document.getElementById('dtRejectionFileLink');
            const fileVal = item.rejectionFile || item.procDecisionFile;
            if (fileVal) {
                fileLink.innerHTML = `
                    <span style="font-weight: 600; color: #0F766E;">
                        <i class="fa-solid fa-file-pdf"></i> ${fileVal}
                        <a href="#" target="_blank" style="margin-left: 12px; color: var(--secondary-color); text-decoration: none;"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a>
                    </span>
                `;
            } else {
                fileLink.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Không có tệp đính kèm</span>`;
            }
        } else {
            rejectionBlock.style.display = 'none';
        }
    }
    document.getElementById('dtHinhThucTiepNhan').innerText = item.hinhThucTiepNhan;
    document.getElementById('dtLinhVuc').innerText = item.linhVuc;
    document.getElementById('dtNYCName').innerText = item.nycName;
    document.getElementById('dtNYCRole').innerText = item.nycRole;
    document.getElementById('dtNYCGenderDob').innerText = `${item.nycGender} / ${item.nycDob}`;
    document.getElementById('dtNYCDocInfo').innerText = `${item.nycDocType} - Số: ${item.nycDocNo} (Cấp ngày: ${item.nycDocDate} tại ${item.nycDocPlace})`;
    document.getElementById('dtNYCPhone').innerText = item.nycPhone;
    document.getElementById('dtNYCEmail').innerText = item.nycEmail || 'Chưa cung cấp';

    const city = item.nycCountry === 'Việt Nam' ? item.nycTinhThanh : item.nycTinhThanh;
    document.getElementById('dtNYCAddress').innerText = `${item.nycAddressDetail}, ${city}, ${item.nycCountry}`;

    // Attached file
    if (item.attachedFile) {
        document.getElementById('dtFileAttachment').innerHTML = `
            <div style="font-weight: 600; color: #0F766E;">
                <i class="fa-solid fa-file-pdf"></i> ${item.attachedFile}
                <a href="#" target="_blank" style="margin-left: 12px; color: var(--secondary-color); text-decoration: none;"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a>
            </div>
        `;
    } else {
        document.getElementById('dtFileAttachment').innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Không có file đính kèm</span>`;
    }

    document.getElementById('dtHanhVi').innerText = item.hanhVi;
    document.getElementById('dtHinhThucNhan').innerText = item.hinhThucNhan;


    // Status Badge
    let badgeClass = 'badge-draft';
    if (item.status === 'Chờ tiếp nhận') badgeClass = 'badge-pending';
    else if (item.status === 'Đang xác minh') badgeClass = 'badge-verifying';
    else if (item.status === 'Bị từ chối') badgeClass = 'badge-rejected';
    else if (item.status === 'Hoàn thành') badgeClass = 'badge-success';
    document.getElementById('dtStatus').innerHTML = `<span class="badge ${badgeClass}">${item.status}</span>`;

    // Verification Result block
    const verificationBlock = document.getElementById('dtVerificationResultBlock');
    if (['Hoàn thành', 'Đã hoàn thành xác định', 'Đã có kết quả', 'Đang xác minh'].includes(item.status)) {
        verificationBlock.style.display = 'block';
        document.getElementById('dtProcBasis').innerText = item.procBasis || 'Đang xác minh, chưa có căn cứ';
        document.getElementById('dtProcTargetAgency').innerText = item.procTargetAgency || 'Đang tiến hành chỉ định';
        document.getElementById('dtProcReason').innerText = item.procReason || 'Đang cập nhật báo cáo kết luận...';

        // Populate officer fields
        // Populate officer fields
        currentOfficers = item.officers ? JSON.parse(JSON.stringify(item.officers)) : [];
        renderDtOfficerTable();

        if (item.procDecisionFile) {
            document.getElementById('dtProcDecisionFile').innerHTML = `
                <div style="font-weight: 600; color: #0F766E;">
                    <i class="fa-solid fa-file-pdf"></i> ${item.procDecisionFile}
                    <a href="#" target="_blank" style="margin-left: 12px; color: var(--secondary-color); text-decoration: none;"><i class="fa-solid fa-up-right-from-square"></i> Xem file</a>
                </div>
            `;
        } else {
            document.getElementById('dtProcDecisionFile').innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Chưa đính kèm quyết định</span>`;
        }

        const claimRow = document.getElementById('dtClaimCodeRow');
        if (item.status === 'Hoàn thành' && item.claimCode && item.claimCode !== '-') {
            claimRow.style.display = 'grid';
            document.getElementById('dtClaimCode').innerText = item.claimCode;
        } else {
            claimRow.style.display = 'none';
        }
    } else {
        verificationBlock.style.display = 'none';
    }

    // Populate Footer Workflow buttons
    const footer = document.getElementById('detailWorkflowActions');
    footer.innerHTML = `<button class="btn btn-secondary" onclick="showListScreen()">Đóng</button>`;

    if (item.status === 'Chờ tiếp nhận') {
        footer.innerHTML += `<button class="btn btn-danger" onclick="openRejectAcceptanceModal('${item.id}')"><i class="fa-solid fa-circle-xmark"></i> Từ chối tiếp nhận</button>`;
        footer.innerHTML += `<button class="btn btn-success" onclick="acceptRequest('${item.id}', true)"><i class="fa-solid fa-circle-check"></i> Tiếp nhận hồ sơ</button>`;
    } else if (item.status === 'Đang xác minh') {
        footer.innerHTML += `<button class="btn btn-primary" onclick="showProcessScreen('${item.id}')"><i class="fa-solid fa-balance-scale"></i> Cập nhật kết quả xác minh</button>`;
    } else if (item.status === 'Hoàn thành') {
        const isClaimed = item.claimCode && item.claimCode !== '-';
        footer.innerHTML += `<button class="btn btn-success" ${isClaimed ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : `onclick="showCreateClaimScreen('${item.id}')"`}><i class="fa-solid fa-file-invoice"></i> Tạo hồ sơ YCBT</button>`;
    } else if (item.status === 'Lưu nháp') {
        footer.innerHTML += `<button class="btn btn-primary" onclick="submitDraft('${item.id}')"><i class="fa-solid fa-paper-plane"></i> Gửi yêu cầu</button>`;
    }
}

function showCreateClaimScreen(id) {
    document.getElementById('screenList').style.display = 'none';
    document.getElementById('screenForm').style.display = 'none';
    document.getElementById('screenProcess').style.display = 'none';
    document.getElementById('screenDetail').style.display = 'none';
    document.getElementById('screenCreateClaim').style.display = 'block';

    const item = requestList.find(r => r.id === id);
    if (!item) return;

    document.getElementById('claimSourceRequestId').value = id;
    document.getElementById('claimTargetAgency').value = item.procTargetAgency || 'Chưa xác định';
    document.getElementById('claimNYCName').value = item.nycName;
    document.getElementById('claimNYCRole').value = item.nycRole;
    document.getElementById('claimNYCPhone').value = item.nycPhone;
    document.getElementById('claimNYCEmail').value = item.nycEmail || 'Không có';

    const city = item.nycCountry === 'Việt Nam' ? item.nycTinhThanh : item.nycTinhThanh;
    document.getElementById('claimNYCAddress').value = `${item.nycAddressDetail}, ${city}, ${item.nycCountry}`;

    document.getElementById('claimDocBase').value = `Quyết định chuyển giao cơ quan GQBT số 04/QĐ-XĐCQ đính kèm: ${item.procDecisionFile || 'QD.pdf'}`;
    document.getElementById('claimHanhVi').value = item.hanhVi;

    const firstOfficer = item.officers && item.officers.length > 0 ? item.officers[0] : {};
    document.getElementById('claimOfficerName').value = firstOfficer.name || '';
    document.getElementById('claimOfficerPosition').value = firstOfficer.position || '';
    document.getElementById('claimOfficerAgency').value = firstOfficer.agency || '';
    document.getElementById('claimOfficerStatus').value = firstOfficer.status || 'Vẫn công tác tại đơn vị cũ';
    if (firstOfficer.status === 'Đã chuyển công tác') {
        document.getElementById('claimOfficerCurrentGroup').style.display = 'block';
        document.getElementById('claimOfficerCurrentAgency').value = firstOfficer.currentAgency || '';
    } else {
        document.getElementById('claimOfficerCurrentGroup').style.display = 'none';
    }

    document.getElementById('claimTotalAmount').value = '';
    clearAttachedFile('claimFile', 'claimFileAttachmentInfo');
}

// Action methods
function acceptRequest(id, fromDetail = false) {
    const item = requestList.find(r => r.id === id);
    if (item && item.status === 'Chờ tiếp nhận') {
        item.status = 'Đang xác minh';
        showToast("Đã tiếp nhận hồ sơ. Trạng thái chuyển sang [Đang xác minh]!", "success");
        if (fromDetail) {
            showDetailScreen(id);
        } else {
            renderTable();
        }
    }
}

function submitDraft(id) {
    const item = requestList.find(r => r.id === id);
    if (item && item.status === 'Lưu nháp') {
        item.status = 'Chờ tiếp nhận';
        showToast("Đã gửi yêu cầu xác định cơ quan thành công!", "success");
        showDetailScreen(id);
    }
}

function deleteRequest(id) {
    const index = requestList.findIndex(r => r.id === id);
    if (index !== -1 && requestList[index].status === 'Lưu nháp') {
        showConfirmModal("Bạn có chắc chắn muốn xóa yêu cầu Lưu nháp này không?", () => {
            requestList.splice(index, 1);
            showToast("Xóa hồ sơ đã lưu nháp thành công!", "success");
            renderTable();
        });
    }
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
    const isEmailRequired = document.querySelector('input[name="formHinhThucNhan"]:checked').value === 'Phương thức điện tử';
    const hanhVi = document.getElementById('formHanhVi').value.trim();

    if (!isDraft) {
        let firstInvalid = null;

        if (!name) {
            const el = document.getElementById('formNYCName');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }
        if (!dob) {
            const el = document.getElementById('formNYCDob');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }
        if (!docNo) {
            const el = document.getElementById('formNYCDocNo');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }
        if (!docDate) {
            const el = document.getElementById('formNYCDocDate');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }
        if (!docPlace) {
            const el = document.getElementById('formNYCDocPlace');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }
        if (!phone) {
            const el = document.getElementById('formNYCPhone');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }
        if (isEmailRequired && !email) {
            const el = document.getElementById('formNYCEmail');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }
        if (!hanhVi) {
            const el = document.getElementById('formHanhVi');
            el.classList.add('is-invalid');
            el.closest('.form-group').querySelector('.error-message').style.display = 'block';
            if (!firstInvalid) firstInvalid = el;
        }

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }
    }

    const country = document.getElementById('formNYCCountry').value;
    const city = country === 'Việt Nam' ? document.getElementById('formNYCTinhThanh').value : document.getElementById('formNYCTinhThanhText').value;

    if (formRequestId) {
        // Edit
        const item = requestList.find(r => r.id === formRequestId);
        if (item) {
            item.hinhThucTiepNhan = document.getElementById('formHinhThucTiepNhan').value;
            item.linhVuc = document.getElementById('formLinhVuc').value;
            item.nycName = name;
            item.nycRole = document.getElementById('formNYCRole').value;
            item.nycGender = document.getElementById('formNYCGender').value;
            item.nycDob = dob;
            item.nycDocType = document.getElementById('formNYCDocType').value;
            item.nycDocNo = docNo;
            item.nycDocDate = docDate;
            item.nycDocPlace = docPlace;
            item.nycPhone = phone;
            item.nycEmail = email;
            item.nycCountry = country;
            item.nycTinhThanh = city;
            item.nycAddressDetail = document.getElementById('formNYCAddressDetail').value;
            item.hanhVi = hanhVi;
            item.hinhThucNhan = document.querySelector('input[name="formHinhThucNhan"]:checked').value;
            item.attachedFile = fileCache['formFile'] || "";
            if (!isDraft) {
                item.status = 'Chờ tiếp nhận';
            }
            showToast(isDraft ? "Đã lưu nháp cập nhật hồ sơ thành công!" : "Cập nhật và gửi yêu cầu thành công!", "success");
        }
    } else {
        // Create
        const newId = "REQ" + (requestList.length + 1);
        const newCode = "XD-2026-" + String(requestList.length + 1).padStart(3, '0');
        const today = new Date();

        requestList.unshift({
            id: newId,
            code: newCode,
            date: String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear(),
            hinhThucTiepNhan: document.getElementById('formHinhThucTiepNhan').value,
            linhVuc: document.getElementById('formLinhVuc').value,
            nycName: name,
            nycRole: document.getElementById('formNYCRole').value,
            nycGender: document.getElementById('formNYCGender').value,
            nycDob: dob,
            nycDocType: document.getElementById('formNYCDocType').value,
            nycDocNo: docNo,
            nycDocDate: docDate,
            nycDocPlace: docPlace,
            nycPhone: phone,
            nycEmail: email,
            nycCountry: country,
            nycTinhThanh: city,
            nycAddressDetail: document.getElementById('formNYCAddressDetail').value,
            hanhVi: hanhVi,
            hinhThucNhan: document.querySelector('input[name="formHinhThucNhan"]:checked').value,
            attachedFile: fileCache['formFile'] || "",
            status: isDraft ? 'Lưu nháp' : 'Chờ tiếp nhận',
            procBasis: "",
            procTargetAgency: "",
            procReason: "",
            procDecisionFile: "",
            claimCode: "-"
        });
        showToast(isDraft ? "Đã lưu nháp hồ sơ yêu cầu thành công!" : "Gửi yêu cầu tiếp nhận thành công!", "success");
    }
    showListScreen();
}

// Save verification results
function saveProcessResult(isComplete) {
    const id = document.getElementById('processRequestId').value;
    const basis = document.getElementById('procBasis').value.trim();

    // Support either select choice or custom inputted values in searchable dropdown
    let agency = document.getElementById('procTargetAgency').value;
    if (!agency) {
        agency = document.getElementById('procTargetAgencyInput').value.trim();
    }

    const reason = document.getElementById('procReason').value.trim();
    const file = fileCache['procDecisionFile'];

    if (!basis) {
        showToast("Căn cứ pháp lý xác định thẩm quyền bắt buộc phải nhập!", "error");
        return;
    }

    if (!agency) {
        showToast("Cơ quan chỉ định giải quyết bắt buộc phải nhập!", "error");
        return;
    }

    if (!reason) {
        showToast("Nhận định lý do xác định chi tiết bắt buộc phải nhập!", "error");
        return;
    }

    const item = requestList.find(r => r.id === id);
    if (item) {
        item.procBasis = basis;
        item.procTargetAgency = agency;
        item.procReason = reason;
        item.procDecisionFile = file || "Quyet_dinh_chuyen_giao.pdf";

        item.officers = JSON.parse(JSON.stringify(currentOfficers));

        if (isComplete) {
            item.status = 'Hoàn thành';
            showToast("Hoàn thành xác minh! Hồ sơ đã sáng nút [Tạo yêu cầu bồi thường].", "success");
            showDetailScreen(id);
        } else {
            item.status = 'Đang xác minh';
            showToast("Đã lưu tạm tiến trình xác minh thành công!", "success");
            showListScreen();
        }
    }
}

// Save spawned claim
function saveCreatedClaim() {
    const reqId = document.getElementById('claimSourceRequestId').value;
    const amount = document.getElementById('claimTotalAmount').value;

    if (!amount || amount <= 0) {
        showToast("Tổng số tiền yêu cầu bồi thường bắt buộc phải lớn hơn 0!", "error");
        return;
    }

    const item = requestList.find(r => r.id === reqId);
    if (item) {
        const claimCode = "BT-2026-" + String(Math.floor(Math.random() * 900) + 100);
        item.claimCode = claimCode;
        showToast(`Đã khởi tạo Hồ sơ bồi thường liên thông thành công! Mã hồ sơ: ${claimCode}`, "success");
        showListScreen();
    }
}

// Search & Pagination Logic
function applyFilters() {
    currentPage = 1;
    filterData();
}

function resetFilters() {
    document.getElementById('filterCode').value = '';
    document.getElementById('filterName').value = '';
    document.getElementById('filterLinhVuc').value = '';
    document.getElementById('filterStatus').value = '';

    // Reset dates to defaults (3 months range)
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const formatDate = (date) => {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };
    document.getElementById('filterFromDate').value = formatDate(threeMonthsAgo);
    document.getElementById('filterToDate').value = formatDate(today);

    currentPage = 1;
    filterData();
}

function filterData() {
    const code = document.getElementById('filterCode').value.trim().toLowerCase();
    const name = document.getElementById('filterName').value.trim().toLowerCase();
    const lv = document.getElementById('filterLinhVuc').value;
    const status = document.getElementById('filterStatus').value;

    const fromStr = document.getElementById('filterFromDate').value;
    const toStr = document.getElementById('filterToDate').value;

    // Parse dates
    const parseDate = (str) => {
        if (!str) return null;
        const p = str.split('/');
        if (p.length === 3) {
            return new Date(p[2], p[1] - 1, p[0]);
        }
        return null;
    };

    const fromDate = parseDate(fromStr);
    const toDate = parseDate(toStr);

    filteredList = requestList.filter(item => {
        if (code && !item.code.toLowerCase().includes(code)) return false;
        if (name && !(item.nycName || '').toLowerCase().includes(name)) return false;
        if (lv && item.linhVuc !== lv) return false;
        if (status && item.status !== status) return false;

        const itemDate = parseDate(item.date);
        if (itemDate) {
            if (fromDate && itemDate < fromDate) return false;
            if (toDate && itemDate > toDate) return false;
        }
        return true;
    });

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
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:var(--text-muted); padding:30px;">Không tìm thấy hồ sơ yêu cầu nào phù hợp</td></tr>`;
        document.getElementById('rangeText').innerText = "Hiển thị 0-0 trong số 0 bản ghi";
        renderPagination(0);
        return;
    }

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, total);
    document.getElementById('rangeText').innerText = `Hiển thị ${startIdx + 1}-${endIdx} trong số ${total} bản ghi`;

    const pageData = filteredList.slice(startIdx, endIdx);

    pageData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I' && !e.target.closest('.icon-btn') && e.target.type !== 'checkbox') {
                showDetailScreen(item.id);
            }
        };

        // Status Badges
        let badgeClass = 'badge-draft';
        if (item.status === 'Chờ tiếp nhận') badgeClass = 'badge-pending';
        else if (item.status === 'Đang xác minh') badgeClass = 'badge-verifying';
        else if (item.status === 'Bị từ chối') badgeClass = 'badge-rejected';
        else if (item.status === 'Hoàn thành') badgeClass = 'badge-success';

        const isDraft = item.status === 'Lưu nháp';
        const isPending = item.status === 'Chờ tiếp nhận';
        const isVerifying = item.status === 'Đang xác minh';
        const isCompleted = item.status === 'Hoàn thành';

        // Accept button (single checkmark)
        let acceptBtn = `<button class="icon-btn accept" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ tiếp nhận khi ở trạng thái Chờ tiếp nhận"><i class="fa-solid fa-check"></i></button>`;
        if (isPending) {
            acceptBtn = `<button class="icon-btn accept" title="Tiếp nhận hồ sơ" onclick="acceptRequest('${item.id}')"><i class="fa-solid fa-check"></i></button>`;
        }

        // Update button (always active)
        let updateBtn;
        if (isVerifying) {
            updateBtn = `<button class="icon-btn edit" title="Cập nhật kết quả xác minh" onclick="showProcessScreen('${item.id}')"><i class="fa-solid fa-scale-balanced"></i></button>`;
        } else {
            updateBtn = `<button class="icon-btn edit" title="Chỉnh sửa thông tin" onclick="showFormScreen('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
        }

        // Create claim button - title adjusted to "Tạo yêu cầu bồi thường"
        let claimBtn = `<button class="icon-btn claim" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Tạo yêu cầu bồi thường (Chỉ dành cho hồ sơ Hoàn thành)"><i class="fa-solid fa-file-invoice"></i></button>`;
        if (isCompleted && item.claimCode === '-') {
            claimBtn = `<button class="icon-btn claim" title="Tạo yêu cầu bồi thường" onclick="showCreateClaimScreen('${item.id}')"><i class="fa-solid fa-file-invoice"></i></button>`;
        }

        // Delete button (active for Draft and Pending)
        let deleteBtn = `<button class="icon-btn delete" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ được phép xóa hồ sơ Lưu nháp hoặc Chờ tiếp nhận"><i class="fa-solid fa-trash"></i></button>`;
        if (isDraft || isPending) {
            deleteBtn = `<button class="icon-btn delete" title="Xóa yêu cầu" onclick="deleteRequest('${item.id}')"><i class="fa-solid fa-trash"></i></button>`;
        }

        tr.innerHTML = `
            <td style="text-align:center;">${startIdx + index + 1}</td>
            <td style="text-align:center;"><strong>${item.code}</strong></td>
            <td><strong>${item.nycName || '(Chưa nhập)'}</strong></td>
            <td style="text-align:center;">${item.nycPhone || '(Chưa nhập)'}</td>
            <td style="font-size:12px; color:var(--text-muted);">${item.linhVuc.replace("TRONG HOẠT ĐỘNG ", "")}</td>
            <td style="font-size:12px; color:var(--text-muted);" title="${item.hanhVi}">${item.hanhVi.length > 50 ? item.hanhVi.slice(0, 50) + "..." : item.hanhVi}</td>
            <td style="text-align:center;">${item.date}</td>
            <td style="text-align:center; font-weight:700; color:#8B5CF6;">${item.claimCode}</td>
            <td style="text-align:center;"><span class="badge ${badgeClass}">${item.status}</span></td>
            <td style="text-align:center;">
                <div class="action-flex">
                    ${acceptBtn}
                    ${updateBtn}
                    ${claimBtn}
                    ${deleteBtn}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderPagination(totalPages);
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


// ==========================================
// OFFICER CRUD LOGIC FOR XAC_DINH_CO_QUAN
// ==========================================
let currentOfficers = [];

function renderOfficerTable() {
    const tbody = document.getElementById('officerTableBody');
    if (!tbody) return;
    
    if (!currentOfficers || currentOfficers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); font-style: italic;">Chưa có dữ liệu cán bộ gây thiệt hại. Bấm "Thêm người thi hành công vụ" để thêm mới.</td></tr>`;
        return;
    }
    
    let html = '';
    currentOfficers.forEach((off, idx) => {
        html += `
        <tr>
            <td style="text-align: center;">${idx + 1}</td>
            <td style="font-weight: 600;">${off.name}</td>
            <td>${off.position}</td>
            <td>${off.agency}</td>
            <td>${off.status}</td>
            <td>${off.status === 'Đã chuyển công tác' && off.currentPosition ? off.currentPosition : '-'}</td>
            <td>${off.status === 'Đã chuyển công tác' && off.currentAgency ? off.currentAgency : '-'}</td>
            <td style="text-align: center;">
                <button type="button" class="icon-btn edit" onclick="editOfficer(${idx})" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="icon-btn delete" onclick="confirmDeleteOfficer(${idx})" title="Xóa"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `;
    });
    tbody.innerHTML = html;
}

function renderDtOfficerTable() {
    const tbody = document.getElementById('dtOfficerTableBody');
    if (!tbody) return;
    
    if (!currentOfficers || currentOfficers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); font-style: italic;">Không có dữ liệu người thi hành công vụ gây thiệt hại.</td></tr>`;
        return;
    }
    
    let html = '';
    currentOfficers.forEach((off, idx) => {
        html += `
        <tr>
            <td style="text-align: center;">${idx + 1}</td>
            <td style="font-weight: 600;">${off.name}</td>
            <td>${off.position}</td>
            <td>${off.agency}</td>
            <td>${off.status}</td>
            <td>${off.status === 'Đã chuyển công tác' && off.currentPosition ? off.currentPosition : '-'}</td>
            <td>${off.status === 'Đã chuyển công tác' && off.currentAgency ? off.currentAgency : '-'}</td>
        </tr>
        `;
    });
    tbody.innerHTML = html;
}

function openOfficerModal() {
    document.getElementById('modalClaimOfficerId').value = '';
    document.getElementById('modalClaimOfficerName').value = '';
    document.getElementById('modalClaimOfficerPosition').value = '';
    document.getElementById('modalClaimOfficerAgency').value = '';
    document.getElementById('modalClaimOfficerStatus').value = 'Vẫn công tác tại đơn vị cũ';
    document.getElementById('modalClaimOfficerCurrentAgency').value = '';
    document.getElementById('modalClaimOfficerCurrentPosition').value = '';
    toggleModalClaimOfficerStatus();
    
    const modal = document.getElementById('claimOfficerModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
}

function editOfficer(index) {
    const off = currentOfficers[index];
    document.getElementById('modalClaimOfficerId').value = index;
    document.getElementById('modalClaimOfficerName').value = off.name;
    document.getElementById('modalClaimOfficerPosition').value = off.position;
    document.getElementById('modalClaimOfficerAgency').value = off.agency;
    document.getElementById('modalClaimOfficerStatus').value = off.status;
    document.getElementById('modalClaimOfficerCurrentAgency').value = off.currentAgency || '';
    document.getElementById('modalClaimOfficerCurrentPosition').value = off.currentPosition || '';
    toggleModalClaimOfficerStatus();
    
    const modal = document.getElementById('claimOfficerModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
}

function closeClaimOfficerModal() {
    const modal = document.getElementById('claimOfficerModal');
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200);
}

function toggleModalClaimOfficerStatus() {
    const status = document.getElementById('modalClaimOfficerStatus').value;
    const group = document.getElementById('modalClaimOfficerCurrentGroup');
    if (status === 'Đã chuyển công tác') {
        if (group) group.style.display = 'grid';
    } else {
        if (group) group.style.display = 'none';
        document.getElementById('modalClaimOfficerCurrentAgency').value = '';
        document.getElementById('modalClaimOfficerCurrentPosition').value = '';
    }
}

function saveClaimOfficerModal() {
    const name = document.getElementById('modalClaimOfficerName').value.trim();
    const position = document.getElementById('modalClaimOfficerPosition').value.trim();
    const agency = document.getElementById('modalClaimOfficerAgency').value.trim();
    const status = document.getElementById('modalClaimOfficerStatus').value;
    const currentAgency = document.getElementById('modalClaimOfficerCurrentAgency').value.trim();
    const currentPosition = document.getElementById('modalClaimOfficerCurrentPosition').value.trim();
    
    if (!name) {
        showToast("Vui lòng nhập Họ và tên cán bộ!", "error");
        return;
    }
    
    const off = {
        name, position, agency, status, currentAgency, currentPosition
    };
    
    const idx = document.getElementById('modalClaimOfficerId').value;
    if (idx !== '') {
        currentOfficers[parseInt(idx)] = off;
        showToast("Đã cập nhật thông tin cán bộ", "success");
    } else {
        currentOfficers.push(off);
        showToast("Đã thêm cán bộ vào danh sách", "success");
    }
    
    closeClaimOfficerModal();
    renderOfficerTable();
}

function confirmDeleteOfficer(index) {
    showConfirmModal("Bạn có chắc chắn muốn xóa người thi hành công vụ này ra khỏi danh sách không?", () => {
        currentOfficers.splice(index, 1);
        renderOfficerTable();
        showToast("Đã xóa người thi hành công vụ khỏi danh sách", "success");
    });
}

let currentRejectFile = null;

function handleRejectFileUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        currentRejectFile = file.name;
        
        const container = document.getElementById('rejectAcceptanceFilesContainer');
        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; margin-top: 5px; background: #F3F4F6; padding: 6px 12px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); width: fit-content;">
                <i class="fa-solid fa-file-pdf" style="color: #EF4444;"></i>
                <span style="font-weight: 500;">${file.name}</span>
                <a href="#" onclick="event.preventDefault(); alert('Xem thử file: ' + '${file.name}');" style="color: var(--secondary-color); text-decoration: none; font-weight: 500; font-size: 12px; margin-left: 10px;">Xem file</a>
                <a href="#" onclick="event.preventDefault(); removeRejectFile();" style="color: #EF4444; text-decoration: none; font-weight: 500; font-size: 12px; margin-left: 5px;">Xóa</a>
            </div>
        `;
    }
}

function removeRejectFile() {
    currentRejectFile = null;
    document.getElementById('rejectAcceptanceFileInput').value = '';
    document.getElementById('rejectAcceptanceFilesContainer').innerHTML = '';
}

function clearRejectAcceptanceValidation() {
    const el = document.getElementById('rejectAcceptanceReason');
    if (el) {
        el.classList.remove('is-invalid');
        const parent = el.closest('.form-group');
        if (parent) {
            const errMsg = parent.querySelector('.error-message');
            if (errMsg) errMsg.style.display = 'none';
        }
    }
}

function openRejectAcceptanceModal(id) {
    document.getElementById('modalRejectRequestId').value = id;
    document.getElementById('rejectAcceptanceReason').value = '';
    removeRejectFile();
    clearRejectAcceptanceValidation();
    
    const modal = document.getElementById('rejectAcceptanceModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
}

function closeRejectAcceptanceModal() {
    const modal = document.getElementById('rejectAcceptanceModal');
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.style.display = 'none';
        clearRejectAcceptanceValidation();
    }, 200);
}

function submitRejectAcceptance() {
    clearRejectAcceptanceValidation();
    const reason = document.getElementById('rejectAcceptanceReason').value.trim();
    if (!reason) {
        const el = document.getElementById('rejectAcceptanceReason');
        el.classList.add('is-invalid');
        const parent = el.closest('.form-group');
        if (parent) {
            const errMsg = parent.querySelector('.error-message');
            if (errMsg) errMsg.style.display = 'block';
        }
        el.focus();
        return;
    }
    
    const id = document.getElementById('modalRejectRequestId').value;
    const item = requestList.find(r => r.id === id);
    if (item) {
        item.status = 'Bị từ chối';
        item.rejectionReason = reason;
        item.rejectionFile = currentRejectFile;
        
        showToast("Đã từ chối tiếp nhận hồ sơ thành công", "success");
        closeRejectAcceptanceModal();
        showListScreen();
        renderTable();
    }
}