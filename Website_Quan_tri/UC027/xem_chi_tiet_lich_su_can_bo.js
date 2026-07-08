/**
 * UC035 - Xem chi tiết Hồ sơ lịch sử (UCPS003)
 * Logic xử lý hiển thị Timeline đa phiên bản, bộ lọc nâng cao, phân trang và so sánh biến động chi tiết (Diff Viewer).
 */

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements - Sidebar
    const timelineContainer = document.getElementById('timelineContainer');
    const timelineSearchInput = document.getElementById('timelineSearchInput');
    const filterFromDate = document.getElementById('filterFromDate');
    const filterToDate = document.getElementById('filterToDate');

    if (filterFromDate) filterFromDate.value = '';
    if (filterToDate) filterToDate.value = '';
    const btnLoadMoreTimeline = document.getElementById('btnLoadMoreTimeline');
    const timelineMoreBtnContainer = document.getElementById('timelineMoreBtnContainer');

    // DOM Elements - Main detail panel headers
    const currentVersionTitle = document.getElementById('currentVersionTitle');
    const currentVersionSubtitle = document.getElementById('currentVersionSubtitle');
    const diffToggle = document.getElementById('diffToggle');
    const btnBackToSearch = document.getElementById('btnBackToSearch');
    const viewBanner = document.getElementById('viewBanner');
    const downloadToast = document.getElementById('downloadToast');
    const toastFilename = document.getElementById('toastFilename');

    // Section Grids
    const registrantInfoGrid = document.getElementById('registrantInfoGrid');
    const registrantInfoEmpty = document.getElementById('registrantInfoEmpty');
    const originalReferenceGrid = document.getElementById('originalReferenceGrid');
    const originalReferenceEmpty = document.getElementById('originalReferenceEmpty');
    const generalInfoGrid = document.getElementById('generalInfoGrid');
    const generalInfoEmpty = document.getElementById('generalInfoEmpty');
    
    const securingPartiesTableBody = document.getElementById('securingPartiesTableBody');
    const securingPartiesEmpty = document.getElementById('securingPartiesEmpty');
    const securedPartiesTableBody = document.getElementById('securedPartiesTableBody');
    const securedPartiesEmpty = document.getElementById('securedPartiesEmpty');
    const assetsTableBody = document.getElementById('assetsTableBody');
    const assetsEmpty = document.getElementById('assetsEmpty');
    const securingPartiesTitleLabel = document.getElementById('securingPartiesTitleLabel');
    const securedPartiesTitleLabel = document.getElementById('securedPartiesTitleLabel');

    // Section wrappers
    const sectionSummaryOfChanges = document.getElementById('sectionSummaryOfChanges');
    const summaryTableBody = document.getElementById('summaryTableBody');
    
    const sectionRegistrantInfo = document.getElementById('sectionRegistrantInfo');
    const sectionOriginalReference = document.getElementById('sectionOriginalReference');
    const sectionGeneralInfo = document.getElementById('sectionGeneralInfo');
    const sectionSecuringParties = document.getElementById('sectionSecuringParties');
    const sectionSecuredParties = document.getElementById('sectionSecuredParties');
    const sectionAssets = document.getElementById('sectionAssets');
    
    // Conditional Special Sections
    const sectionDeRegistration = document.getElementById('sectionDeRegistration');
    const deRegDateVal = document.getElementById('deRegDateVal');
    const deRegRequesterVal = document.getElementById('deRegRequesterVal');
    const deRegBasisVal = document.getElementById('deRegBasisVal');
    const btnDownloadDeRegPdf = document.getElementById('btnDownloadDeRegPdf');

    const sectionCancelRegistration = document.getElementById('sectionCancelRegistration');
    const cancelDateVal = document.getElementById('cancelDateVal');
    const cancelRequesterVal = document.getElementById('cancelRequesterVal');
    const cancelOfficerVal = document.getElementById('cancelOfficerVal');
    const cancelLeaderVal = document.getElementById('cancelLeaderVal');
    const cancelTypeVal = document.getElementById('cancelTypeVal');
    const cancelBasisVal = document.getElementById('cancelBasisVal');
    const cancelDocVal = document.getElementById('cancelDocVal');
    const btnDownloadCancelPdf = document.getElementById('btnDownloadCancelPdf');

    const sectionRestoreRegistration = document.getElementById('sectionRestoreRegistration');
    const restoreDateVal = document.getElementById('restoreDateVal');
    const restoreRequesterVal = document.getElementById('restoreRequesterVal');
    const restoreOfficerVal = document.getElementById('restoreOfficerVal');
    const restoreLeaderVal = document.getElementById('restoreLeaderVal');
    const restoreBasisVal = document.getElementById('restoreBasisVal');
    const btnDownloadRestorePdf = document.getElementById('btnDownloadRestorePdf');

    const sectionEditInfo = document.getElementById('sectionEditInfo');
    const editDateVal = document.getElementById('editDateVal');
    const editRequesterVal = document.getElementById('editRequesterVal');
    const editOfficerVal = document.getElementById('editOfficerVal');
    const editLeaderVal = document.getElementById('editLeaderVal');
    const btnDownloadEditPdf = document.getElementById('btnDownloadEditPdf');

    const sectionRejectionInfo = document.getElementById('sectionRejectionInfo');
    const rejectDateVal = document.getElementById('rejectDateVal');
    const rejectReasonVal = document.getElementById('rejectReasonVal');
    const rejectDocVal = document.getElementById('rejectDocVal');

    // --- MOCK DATA ---
    // Universal data representing all system changes.
    // Versions go from oldest (v1) to newest (v8).

    // v1: Đăng ký lần đầu (Gốc)
    const v1 = {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-initial",
        title: "Đăng ký lần đầu (Gốc)",
        statusText: "Hoàn thành",
        date: "05/01/2026 08:00:00",
        regCode: "BD-2026-001",
        description: "Đăng ký biện pháp bảo đảm lần đầu bằng 02 phương tiện ô tô",
        data: {
            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Đăng ký lần đầu",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01",
            contractDate: "04/01/2026",
            loanValue: "1.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đen",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Đang bảo đảm"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Tàu cá vỏ gỗ Yamaha 200HP",
                    brandColor: "Công suất 150CV, Trắng xanh",
                    frameNo: "TC-9988-VN",
                    engineNo: "ENG-YAM-55331",
                    plateNo: "QB-90827-TS",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản",
                    name: "Quyền đòi nợ trị giá 2.000.000.000 VNĐ",
                    brandColor: "Phát sinh từ Hợp đồng mua bán số 01/2026/HĐMB đối với Công ty ABC",
                    frameNo: "QTD-2026-001",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 4,
                    typeName: "Cây hằng năm, công trình tạm",
                    name: "Vườn cây cao su đang thu hoạch",
                    brandColor: "Diện tích 5ha tại Nông trường Bình Phước",
                    frameNo: "VCCS-2026-88",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 5,
                    typeName: "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ",
                    name: "Kho hàng hạt tiêu xuất khẩu",
                    brandColor: "Khối lượng 50 tấn tại Cảng Hải Phòng",
                    frameNo: "HT-50T-HP",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 6,
                    typeName: "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung",
                    name: "50.000 cổ phiếu tự do chuyển nhượng",
                    brandColor: "Mã HBC của Công ty Cổ phần Xây dựng Hòa Bình",
                    frameNo: "CP-HBC-50K",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 7,
                    typeName: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
                    name: "Dây chuyền sản xuất sợi cotton Rieter",
                    brandColor: "Nhập khẩu Thụy Sĩ mới 100%, Model 2025",
                    frameNo: "DC-RIETER-09",
                    engineNo: "ENG-RIET-01",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    // v2: Đăng ký thay đổi lần 1 (Sửa thông tin hợp đồng, thêm bên bảo đảm, thêm tài sản)
    const v2 = {
        version: 2,
        label: "Thay đổi lần 1",
        badgeClass: "badge-change",
        title: "Đăng ký thay đổi lần 1",
        statusText: "Hoàn thành",
        date: "12/02/2026 10:15:30",
        regCode: "BD-2026-001-TD01",
        description: "Bổ sung bên thế chấp, thay đổi giá trị khoản vay lên 2.5 tỷ và thêm 01 ô tô",
        data: {
            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Đăng ký thay đổi",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01-SĐ01",
            contractDate: "10/02/2026",
            loanValue: "2.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Trần Văn An",
                    paperNo: "001085006789",
                    address: "Số 45 Hàng Bài, Phường Hàng Bài, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Bổ sung mới"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đen",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Đang bảo đảm"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Xe tải ben 5 tấn",
                    brandColor: "Hyundai HD120, Màu xanh",
                    frameNo: "HYU-BEN-771122",
                    engineNo: "ENG-D6GA-88221",
                    plateNo: "29C-567.89",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Các động sản khác (Tiền, giấy tờ có giá, hàng tiêu dùng, nguyên nhiên vật liệu...)",
                    name: "Xe ô tô bán tải",
                    brandColor: "Ford Ranger Wildtrak, Màu cam",
                    frameNo: "RAN-FOR-554433",
                    engineNo: "ENG-BIO-112233",
                    plateNo: "29H-987.65",
                    status: "Bổ sung mới"
                }
            ]
        }
    };

    // v3: Đăng ký thay đổi lần 2 - BỊ TỪ CHỐI
    const v3 = {
        version: 3,
        label: "Thay đổi lần 2",
        badgeClass: "badge-change",
        title: "Đăng ký thay đổi lần 2",
        statusText: "Bị từ chối",
        date: "05/03/2026 14:20:00",
        regCode: "BD-2026-001-TD02",
        description: "Yêu cầu thay đổi tài sản bảo đảm bị từ chối do hồ sơ thiếu chữ ký hợp lệ của Bên thế chấp Trần Văn An",
        data: {
            hasRejection: true,
            rejectDate: "05/03/2026 14:20:00",
            rejectReason: "Hồ sơ điện tử tải lên thiếu chữ ký số hợp lệ của Bên thế chấp bổ sung Trần Văn An. Yêu cầu nộp lại hồ sơ ký số đầy đủ của các bên tham gia giao dịch thế chấp.",
            rejectNoticePdf: "Thong_bao_tu_choi_BD-2026-001-TD02.pdf",

            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Đăng ký thay đổi",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01-SĐ02",
            contractDate: "02/03/2026",
            loanValue: "2.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Trần Văn An",
                    paperNo: "001085006789",
                    address: "Số 45 Hàng Bài, Phường Hàng Bài, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đỏ", // Sửa thông tin
                    prevBrandColor: "Toyota Camry 2.5Q, Màu đen",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Sửa thông tin"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Xe tải ben 5 tấn",
                    brandColor: "Hyundai HD120, Màu xanh",
                    frameNo: "HYU-BEN-771122",
                    engineNo: "ENG-D6GA-88221",
                    plateNo: "29C-567.89",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Các động sản khác (Tiền, giấy tờ có giá, hàng tiêu dùng, nguyên nhiên vật liệu...)",
                    name: "Xe ô tô bán tải",
                    brandColor: "Ford Ranger Wildtrak, Màu cam",
                    frameNo: "RAN-FOR-554433",
                    engineNo: "ENG-BIO-112233",
                    plateNo: "29H-987.65",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    // v4: Chỉnh lý thông tin (Sửa địa chỉ Trần Văn An và sửa màu sơn Toyota Camry)
    const v4 = {
        version: 4,
        label: "Chỉnh lý",
        badgeClass: "badge-change",
        title: "Chỉnh lý thông tin",
        statusText: "Hoàn thành",
        date: "15/03/2026 15:40:00",
        regCode: "BD-2026-001-CL01",
        description: "Chỉnh lý địa chỉ Bên thế chấp Trần Văn An và màu sơn của xe Toyota Camry",
        data: {
            hasEditInfo: true,
            editDate: "15/03/2026 15:40:00",
            editRequester: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
            editOfficer: "Lê Thị Thu Trang (Đăng ký viên trung tâm)",
            editLeader: "Trần Quốc Vương (Phó Giám đốc Cục)",
            editNoticePdf: "Thong_bao_chinh_ly_BD-2026-001-CL01.pdf",

            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Chỉnh lý thông tin",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01-SĐ01",
            contractDate: "10/02/2026",
            loanValue: "2.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Trần Văn An",
                    paperNo: "001085006789",
                    address: "Số 99 Lê Duẩn, Phường Cửa Nam, Quận Hoàn Kiếm, Hà Nội, Việt Nam", // Sửa thông tin
                    prevAddress: "Số 45 Hàng Bài, Phường Hàng Bài, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Sửa thông tin"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đỏ", // Sửa thông tin
                    prevBrandColor: "Toyota Camry 2.5Q, Màu đen",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Sửa thông tin"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Xe tải ben 5 tấn",
                    brandColor: "Hyundai HD120, Màu xanh",
                    frameNo: "HYU-BEN-771122",
                    engineNo: "ENG-D6GA-88221",
                    plateNo: "29C-567.89",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Các động sản khác (Tiền, giấy tờ có giá, hàng tiêu dùng, nguyên nhiên vật liệu...)",
                    name: "Xe ô tô bán tải",
                    brandColor: "Ford Ranger Wildtrak, Màu cam",
                    frameNo: "RAN-FOR-554433",
                    engineNo: "ENG-BIO-112233",
                    plateNo: "29H-987.65",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    // v5: Yêu cầu cung cấp bản sao (Cấp bản sao GCN thay đổi lần 1)
    const v5 = {
        version: 5,
        label: "Bản sao",
        badgeClass: "badge-change",
        title: "Yêu cầu cung cấp bản sao",
        statusText: "Hoàn thành",
        date: "28/03/2026 09:00:00",
        regCode: "BD-2026-001-BS01",
        description: "Yêu cầu cấp 03 bản sao Giấy chứng nhận Đăng ký thay đổi lần 1",
        data: {
            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Yêu cầu cung cấp bản sao",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            
            // Special bản sao fields
            copyRegNo: "BD-2026-001-TD01",
            copyCount: "03 bản",

            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01-SĐ01",
            contractDate: "10/02/2026",
            loanValue: "2.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Trần Văn An",
                    paperNo: "001085006789",
                    address: "Số 99 Lê Duẩn, Phường Cửa Nam, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đỏ",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Đang bảo đảm"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Xe tải ben 5 tấn",
                    brandColor: "Hyundai HD120, Màu xanh",
                    frameNo: "HYU-BEN-771122",
                    engineNo: "ENG-D6GA-88221",
                    plateNo: "29C-567.89",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Các động sản khác (Tiền, giấy tờ có giá, hàng tiêu dùng, nguyên nhiên vật liệu...)",
                    name: "Xe ô tô bán tải",
                    brandColor: "Ford Ranger Wildtrak, Màu cam",
                    frameNo: "RAN-FOR-554433",
                    engineNo: "ENG-BIO-112233",
                    plateNo: "29H-987.65",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    // v6: Hủy đăng ký (Hủy một phần tài sản Ford Ranger theo Bản án Tòa án)
    const v6 = {
        version: 6,
        label: "Hủy đăng ký",
        badgeClass: "badge-removed",
        title: "Hủy đăng ký",
        statusText: "Hoàn thành",
        date: "10/04/2026 14:00:00",
        regCode: "BD-2026-001-HD01",
        description: "Hủy đăng ký một phần đối với xe ô tô bán tải Ford Ranger theo quyết định của Tòa án nhân dân TP Hà Nội",
        data: {
            hasCancelReg: true,
            cancelDate: "10/04/2026 14:00:00",
            cancelRequester: "Cục Thi hành án dân sự TP Hà Nội",
            cancelOfficer: "Phạm Minh Hoàng (Đăng ký viên thụ lý)",
            cancelLeader: "Nguyễn Văn Thanh (Cục trưởng)",
            cancelType: "Hủy đăng ký một phần (Hủy đăng ký đối với xe Ford Ranger)",
            cancelBasis: "Khoản 1 Điều 21 Nghị định 99/2022/NĐ-CP (Bản án, quyết định của Tòa án có hiệu lực pháp luật)",
            cancelDoc: "Ban_An_102_TANDHN.pdf",
            cancelNoticePdf: "Thong_bao_huy_dang_ky_BD-2026-001-HD01.pdf",

            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Hủy đăng ký",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01-SĐ01",
            contractDate: "10/02/2026",
            loanValue: "2.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Trần Văn An",
                    paperNo: "001085006789",
                    address: "Số 99 Lê Duẩn, Phường Cửa Nam, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đỏ",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Đang bảo đảm"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Xe tải ben 5 tấn",
                    brandColor: "Hyundai HD120, Màu xanh",
                    frameNo: "HYU-BEN-771122",
                    engineNo: "ENG-D6GA-88221",
                    plateNo: "29C-567.89",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Các động sản khác (Tiền, giấy tờ có giá, hàng tiêu dùng, nguyên nhiên vật liệu...)",
                    name: "Xe ô tô bán tải",
                    brandColor: "Ford Ranger Wildtrak, Màu cam",
                    frameNo: "RAN-FOR-554433",
                    engineNo: "ENG-BIO-112233",
                    plateNo: "29H-987.65",
                    status: "Đã hủy" // Hủy tài sản này
                }
            ]
        }
    };

    // v7: Khôi phục hủy đăng ký (Khôi phục lại xe Ford Ranger)
    const v7 = {
        version: 7,
        label: "Khôi phục hủy",
        badgeClass: "badge-initial",
        title: "Khôi phục Hủy đăng ký",
        statusText: "Hoàn thành",
        date: "25/04/2026 11:15:00",
        regCode: "BD-2026-001-KF01",
        description: "Khôi phục hiệu lực đăng ký đối với xe Ford Ranger theo Quyết định kháng nghị Giám đốc thẩm",
        data: {
            hasRestoreReg: true,
            restoreDate: "25/04/2026 11:15:00",
            restoreRequester: "Viện Kiểm sát Nhân dân Tối cao",
            restoreOfficer: "Phạm Minh Hoàng (Đăng ký viên thụ lý)",
            restoreLeader: "Nguyễn Văn Thanh (Cục trưởng)",
            restoreBasis: "Quyết định kháng nghị Giám đốc thẩm số 05/QĐ-VKSNDTC của Viện kiểm sát nhân dân tối cao",
            restoreNoticePdf: "Thong_bao_khoi_phuc_BD-2026-001-KF01.pdf",

            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Khôi phục hủy đăng ký",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01-SĐ01",
            contractDate: "10/02/2026",
            loanValue: "2.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Trần Văn An",
                    paperNo: "001085006789",
                    address: "Số 99 Lê Duẩn, Phường Cửa Nam, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đỏ",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Đang bảo đảm"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Xe tải ben 5 tấn",
                    brandColor: "Hyundai HD120, Màu xanh",
                    frameNo: "HYU-BEN-771122",
                    engineNo: "ENG-D6GA-88221",
                    plateNo: "29C-567.89",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Các động sản khác (Tiền, giấy tờ có giá, hàng tiêu dùng, nguyên nhiên vật liệu...)",
                    name: "Xe ô tô bán tải",
                    brandColor: "Ford Ranger Wildtrak, Màu cam",
                    frameNo: "RAN-FOR-554433",
                    engineNo: "ENG-BIO-112233",
                    plateNo: "29H-987.65",
                    status: "Đang bảo đảm" // Khôi phục lại trạng thái đang bảo đảm
                }
            ]
        }
    };

    // v8: Xóa đăng ký (Xóa toàn phần giải chấp)
    const v8 = {
        version: 8,
        label: "Xóa đăng ký",
        badgeClass: "badge-removed",
        title: "Xóa đăng ký",
        statusText: "Hoàn thành",
        date: "15/05/2026 16:30:00",
        regCode: "BD-2026-001-XD01",
        description: "Xóa đăng ký toàn bộ biện pháp bảo đảm do đã hoàn thành nghĩa vụ trả nợ",
        data: {
            hasDeRegistration: true,
            deRegDate: "15/05/2026 16:30:00",
            deRegRequester: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
            deRegBasis: "Khoản 1 Điều 21 Nghị định 99/2022/NĐ-CP (Các bên thỏa thuận xóa đăng ký biện pháp bảo đảm)",
            deRegNoticePdf: "Thong_bao_xoa_dang_ky_BD-2026-001-XD01.pdf",

            registrantName: "Công ty Cổ phần Vận tải biển Đông",
            registrantAddress: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
            registrantDoc: "Giấy_DN_BienDong.pdf",
            regCase: "Xóa đăng ký",
            firstRegNo: "BD-2026-001",
            firstRegDate: "05/01/2026 08:00:00",
            viewOriginalDoc: "GCN_Goc_BD-2026-001.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "TC-2026-01-SĐ01",
            contractDate: "10/02/2026",
            loanValue: "2.500.000.000 VNĐ",
            scale: "Doanh nghiệp vừa",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty Cổ phần Vận tải biển Đông",
                    paperNo: "0102030405",
                    address: "Số 12 Cát Linh, Phường Quốc Tử Giám, Quận Đống Đa, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                },
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Trần Văn An",
                    paperNo: "001085006789",
                    address: "Số 99 Lê Duẩn, Phường Cửa Nam, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "Ngân hàng TMCP Ngoại thương Việt Nam (VCB) - Chi nhánh Hà Nội",
                    address: "Số 198 Trần Quang Khải, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đỏ",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Đã giải chấp" // Giải chấp toàn bộ
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Xe tải ben 5 tấn",
                    brandColor: "Hyundai HD120, Màu xanh",
                    frameNo: "HYU-BEN-771122",
                    engineNo: "ENG-D6GA-88221",
                    plateNo: "29C-567.89",
                    status: "Đã giải chấp"
                },
                {
                    id: 3,
                    typeName: "Các động sản khác (Tiền, giấy tờ có giá, hàng tiêu dùng, nguyên nhiên vật liệu...)",
                    name: "Xe ô tô bán tải",
                    brandColor: "Ford Ranger Wildtrak, Màu cam",
                    frameNo: "RAN-FOR-554433",
                    engineNo: "ENG-BIO-112233",
                    plateNo: "29H-987.65",
                    status: "Đã giải chấp"
                }
            ]
        }
    };

    // === NEW MOCK DATA FOR USER DOSSIERS ===
    
    // Dossier 1505156435: Nguyễn Văn Nam
    const h35_v1 = {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-initial",
        title: "Đăng ký lần đầu (Gốc)",
        date: "05/06/2026 09:00:00",
        regCode: "1505156435",
        description: "Đăng ký biện pháp bảo đảm lần đầu bằng 01 phương tiện ô tô Toyota Vios",
        data: {
            registrantName: "Nguyễn Văn Nam",
            registrantAddress: "Số 15 Phố Duy Tân, Phường Dịch Vọng Hậu, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
            registrantDoc: "Giay_dang_ky_1505156435.pdf",
            regCase: "Đăng ký lần đầu",
            firstRegNo: "1505156435",
            firstRegDate: "05/06/2026 09:00:00",
            viewOriginalDoc: "GCN_Goc_1505156435.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "HĐTC-FPT/2026/01",
            contractDate: "13/05/2026",
            loanValue: "500.000.000 VNĐ",
            scale: "Cá nhân",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "cd_vn",
                    typeName: "Công dân Việt Nam",
                    name: "Nguyễn Văn Nam",
                    paperNo: "001092008421",
                    address: "Số 15 Phố Duy Tân, Phường Dịch Vọng Hậu, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "NGÂN HÀNG TMCP FPT (FPT BANK)",
                    address: "Số 17 Duy Tân, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Vios màu đen",
                    frameNo: "TYT-VIOS-88992",
                    engineNo: "ENG-2AR-55667",
                    plateNo: "30H-123.45",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    const h35_v2 = {
        version: 2,
        label: "Thay đổi 1",
        badgeClass: "badge-change",
        title: "Thay đổi nội dung đăng ký lần 1",
        statusText: "Hoàn thành",
        date: "01/06/2026 15:30:45",
        regCode: "1505156436",
        description: "Thay đổi thông tin hợp đồng thế chấp tăng hạn mức khoản vay lên 800.000.000 VNĐ",
        data: JSON.parse(JSON.stringify(h35_v1.data))
    };
    h35_v2.data.contractNo = "HĐTC-FPT/2026/01-SĐBS1";
    h35_v2.data.loanValue = "800.000.000 VNĐ";
    h35_v2.data.modifiedFields = {
        loanValue: { old: "500.000.000 VNĐ" }
    };

    const h35_v3 = {
        version: 3,
        label: "Xóa đăng ký",
        badgeClass: "badge-removed",
        title: "Xóa đăng ký",
        statusText: "Hoàn thành",
        date: "10/06/2026 11:20:10",
        regCode: "1505156437",
        description: "Xóa đăng ký toàn bộ biện pháp bảo đảm do hoàn thành nghĩa vụ trả nợ",
        data: JSON.parse(JSON.stringify(h35_v2.data))
    };
    h35_v3.data.hasDeRegistration = true;
    h35_v3.data.deRegDate = "10/06/2026 11:20:10";
    h35_v3.data.deRegRequester = "NGÂN HÀNG TMCP FPT (FPT BANK)";
    h35_v3.data.deRegBasis = "Khoản 1 Điều 21 Nghị định 99/2022/NĐ-CP (Các bên thỏa thuận xóa đăng ký biện pháp bảo đảm)";
    h35_v3.data.assets[0].status = "Đã giải chấp";

    // Dossier 1505156438: Công ty TNHH Hải Nam
    const h38_v1 = {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-initial",
        title: "Đăng ký lần đầu (Gốc)",
        date: "10/06/2026 11:20:00",
        regCode: "1505156438",
        description: "Đăng ký biện pháp bảo đảm lần đầu xe ô tô tải Hyundai Porter",
        data: {
            registrantName: "Công ty TNHH Hải Nam",
            registrantAddress: "Số 25 Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam",
            registrantDoc: "Giay_dang_ky_1505156438.pdf",
            regCase: "Đăng ký lần đầu",
            firstRegNo: "1505156438",
            firstRegDate: "10/06/2026 11:20:00",
            viewOriginalDoc: "GCN_Goc_1505156438.pdf",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "HĐTC-HN/2026/02",
            contractDate: "14/06/2026",
            loanValue: "1.200.000.000 VNĐ",
            scale: "Doanh nghiệp nhỏ",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_vn",
                    typeName: "Tổ chức trong nước",
                    name: "Công ty TNHH Hải Nam",
                    paperNo: "0102030405",
                    address: "Số 25 Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "NGÂN HÀNG TMCP FPT (FPT BANK)",
                    address: "Số 17 Duy Tân, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe tải",
                    brandColor: "Hyundai Porter màu xanh",
                    frameNo: "ĐK-99882-HP",
                    engineNo: "ENG-HYU-882",
                    plateNo: "29C-888.88",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    const h38_v2 = {
        version: 2,
        label: "Thông báo xử lý",
        badgeClass: "badge-change",
        title: "Đăng ký thông báo xử lý tài sản bảo đảm",
        statusText: "Hoàn thành",
        date: "17/06/2026 09:15:30",
        regCode: "1505156439",
        description: "Đăng ký thông báo xử lý tài sản bảo đảm do Bên bảo đảm vi phạm nghĩa vụ thanh toán",
        data: JSON.parse(JSON.stringify(h38_v1.data))
    };
    h38_v2.data.hasEditInfo = true;
    h38_v2.data.editDate = "17/06/2026 09:15:30";
    h38_v2.data.editRequester = "NGÂN HÀNG TMCP FPT (FPT BANK)";
    h38_v2.data.editOfficer = "Lê Anh Tuấn (Chuyên viên xử lý nợ)";
    h38_v2.data.editLeader = "Trần Quốc Khánh (Trưởng phòng giao dịch)";
    h38_v2.data.assets[0].status = "Đang xử lý tài sản";

    // Dossier 1505156440: John Smith
    const h40_v1 = {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-initial",
        title: "Đăng ký lần đầu (Gốc)",
        date: "21/06/2026 09:30:00",
        regCode: "1505156440",
        description: "Đăng ký biện pháp bảo đảm lần đầu xe ô tô Toyota Camry",
        data: {
            registrantName: "John Smith",
            registrantAddress: "Phòng 802 Tòa nhà Lancaster, Kim Mã, Ba Đình, Hà Nội",
            registrantDoc: "Passport_JohnSmith.pdf",
            regCase: "Đăng ký lần đầu",
            firstRegNo: "1505156440",
            firstRegDate: "21/06/2026 09:30:00",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "HĐTC-JS/2026/01",
            contractDate: "14/06/2026",
            loanValue: "900.000.000 VNĐ",
            scale: "Cá nhân nước ngoài",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "nn",
                    typeName: "Người nước ngoài",
                    name: "John Smith",
                    paperNo: "A1234567",
                    address: "Phòng 802 Tòa nhà Lancaster, Kim Mã, Ba Đình, Hà Nội",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "NGÂN HÀNG TMCP FPT (FPT BANK)",
                    address: "Số 17 Duy Tân, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con",
                    brandColor: "Toyota Camry màu bạc",
                    frameNo: "TYT-CAMRY-11223",
                    engineNo: "ENG-TYT-990",
                    plateNo: "30F-999.99",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    // Dossier 1505156441: Ivan Petrov
    const h41_v1 = {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-initial",
        title: "Đăng ký lần đầu (Gốc)",
        date: "23/06/2026 11:20:00",
        regCode: "1505156441",
        description: "Đăng ký biện pháp bảo đảm lần đầu xe ô tô Honda Civic",
        data: {
            registrantName: "Ivan Petrov",
            registrantAddress: "Số 10 Chùa Láng, Quận Đống Đa, TP. Hà Nội, Việt Nam",
            registrantDoc: "ResidenceCard_Petrov.pdf",
            regCase: "Đăng ký lần đầu",
            firstRegNo: "1505156441",
            firstRegDate: "23/06/2026 11:20:00",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "HĐTC-IP/2026/03",
            contractDate: "15/06/2026",
            loanValue: "700.000.000 VNĐ",
            scale: "Cá nhân không quốc tịch",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "kqt",
                    typeName: "Người không quốc tịch",
                    name: "Ivan Petrov",
                    paperNo: "TR-998877",
                    address: "Số 10 Chùa Láng, Quận Đống Đa, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "NGÂN HÀNG TMCP FPT (FPT BANK)",
                    address: "Số 17 Duy Tân, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con",
                    brandColor: "Honda Civic màu xanh",
                    frameNo: "HON-CIVIC-44556",
                    engineNo: "ENG-HON-882",
                    plateNo: "30A-888.88",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    // Dossier 1505156442: Global Investment Group
    const h42_v1 = {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-initial",
        title: "Đăng ký lần đầu (Gốc)",
        date: "26/06/2026 14:00:00",
        regCode: "1505156442",
        description: "Đăng ký biện pháp bảo đảm lần đầu xe ô tô BMW X5",
        data: {
            registrantName: "Global Investment Group",
            registrantAddress: "Tòa nhà Keangnam, Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội, Việt Nam",
            registrantDoc: "GPDT_Global.pdf",
            regCase: "Đăng ký lần đầu",
            firstRegNo: "1505156442",
            firstRegDate: "26/06/2026 14:00:00",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "HĐTC-GIG/2026/04",
            contractDate: "16/06/2026",
            loanValue: "3.000.000.000 VNĐ",
            scale: "Nhà đầu tư nước ngoài",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "ndt_nn",
                    typeName: "Nhà đầu tư nước ngoài",
                    name: "Global Investment Group",
                    paperNo: "INVEST-8899",
                    address: "Tòa nhà Keangnam, Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "NGÂN HÀNG TMCP FPT (FPT BANK)",
                    address: "Số 17 Duy Tân, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con",
                    brandColor: "BMW X5 màu trắng",
                    frameNo: "BMW-X5-77889",
                    engineNo: "ENG-BMW-112",
                    plateNo: "30G-678.90",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    // Dossier 1505156443: Hợp tác xã Nông nghiệp Quyết Thắng
    const h43_v1 = {
        version: 1,
        label: "Đăng ký gốc",
        badgeClass: "badge-initial",
        title: "Đăng ký lần đầu (Gốc)",
        date: "28/06/2026 10:00:00",
        regCode: "1505156443",
        description: "Đăng ký biện pháp bảo đảm lần đầu xe tải Suzuki Carry",
        data: {
            registrantName: "Hợp tác xã Nông nghiệp Quyết Thắng",
            registrantAddress: "Thôn Quyết Thắng, Xã Ba Vì, Huyện Ba Vì, Hà Nội, Việt Nam",
            registrantDoc: "QDTL_QuyetThang.pdf",
            regCase: "Đăng ký lần đầu",
            firstRegNo: "1505156443",
            firstRegDate: "28/06/2026 10:00:00",
            receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản tại thành phố Hà Nội",
            transactionType: "Biện pháp bảo đảm",
            measureType: "Thế chấp",
            contractType: "",
            contractNo: "HĐTC-QT/2026/05",
            contractDate: "17/06/2026",
            loanValue: "300.000.000 VNĐ",
            scale: "Tổ chức khác",
            femaleOwner: "Không",
            securingParties: [
                {
                    type: "tc_khac",
                    typeName: "Tổ chức khác",
                    name: "Hợp tác xã Nông nghiệp Quyết Thắng",
                    paperNo: "HTX-556677",
                    address: "Thôn Quyết Thắng, Xã Ba Vì, Huyện Ba Vì, Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            securedParties: [
                {
                    typeName: "Tổ chức",
                    paperNo: "0100112437",
                    name: "NGÂN HÀNG TMCP FPT (FPT BANK)",
                    address: "Số 17 Duy Tân, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                    status: "Không thay đổi"
                }
            ],
            assets: [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe tải ben",
                    brandColor: "Suzuki Carry màu trắng",
                    frameNo: "SUZ-CARRY-55667",
                    engineNo: "ENG-SUZ-221",
                    plateNo: "29D-112.23",
                    status: "Đang bảo đảm"
                }
            ]
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    let regNumParam = urlParams.get('regNum') || urlParams.get('id') || localStorage.getItem('canBoRegNum') || '';
    const isSingleMode = urlParams.get('mode') === 'single';
    const mockTimelineData = [];

    // Kiểm tra xem hồ sơ có tồn tại trong custom_mock_profiles của localStorage không
    const cached = localStorage.getItem('custom_mock_profiles');
    let matchedProfile = null;
    if (cached) {
        try {
            const list = JSON.parse(cached);
            matchedProfile = list.find(p => {
                if (!p || !p.id) return false;
                const pid = p.id.toLowerCase();
                const rnp = regNumParam.toLowerCase();
                return pid === rnp || pid.replace(/-/g, '') === rnp.replace(/-/g, '');
            });
        } catch (e) {
            console.error(e);
        }
    }

    // Fallback if not matched any dynamic or static profile
    const validRegNums = ['1505156435', '1505156436', '1505156437', '1505156438', '1505156439', '1505156440', '1505156441', '1505156442', '1505156443', '1505156444'];
    const hasValidMatch = validRegNums.some(r => regNumParam.includes(r));
    if (!matchedProfile && !hasValidMatch) {
        regNumParam = '1505156435';
    }

    if (matchedProfile && matchedProfile.timeline && matchedProfile.timeline.length > 0) {
        // Dựng timeline động từ custom mock profile
        matchedProfile.timeline.forEach((node, idx) => {
            const assets = [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ hiệu TOYOTA VIOS",
                    brandColor: "Màu đỏ",
                    frameNo: `FN-${matchedProfile.pin || '9920'}-1`,
                    engineNo: `EN-${matchedProfile.pin || '8830'}-1`,
                    plateNo: `29D-${matchedProfile.pin || '123'}.10`,
                    status: node.title.includes("Xóa") ? "Đã giải chấp" : "Đang bảo đảm"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa, đường sắt, hoặc chuyên dùng",
                    name: "Tàu cá vỏ gỗ Yamaha 200HP",
                    brandColor: "Công suất 150CV, Trắng xanh",
                    frameNo: `FN-${matchedProfile.pin || '9920'}-2`,
                    engineNo: `EN-${matchedProfile.pin || '8830'}-2`,
                    plateNo: `QB-90827-TS`,
                    status: node.title.includes("Xóa") ? "Đã giải chấp" : "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản",
                    name: "Quyền đòi nợ trị giá 2.000.000.000 VNĐ",
                    brandColor: "Phát sinh từ Hợp đồng mua bán số 01/2026/HĐMB đối với Công ty ABC",
                    frameNo: `FN-${matchedProfile.pin || '9920'}-3`,
                    engineNo: `EN-${matchedProfile.pin || '8830'}-3`,
                    plateNo: `-`,
                    status: node.title.includes("Xóa") ? "Đã giải chấp" : "Đang bảo đảm"
                },
                {
                    id: 4,
                    typeName: "Cây hằng năm, công trình tạm",
                    name: "Vườn cây cao su đang thu hoạch",
                    brandColor: "Diện tích 5ha tại Nông trường Bình Phước",
                    frameNo: `FN-${matchedProfile.pin || '9920'}-4`,
                    engineNo: `EN-${matchedProfile.pin || '8830'}-4`,
                    plateNo: `-`,
                    status: node.title.includes("Xóa") ? "Đã giải chấp" : "Đang bảo đảm"
                },
                {
                    id: 5,
                    typeName: "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ",
                    name: "Kho hàng hạt tiêu xuất khẩu",
                    brandColor: "Khối lượng 50 tấn tại Cảng Hải Phòng",
                    frameNo: `FN-${matchedProfile.pin || '9920'}-5`,
                    engineNo: `EN-${matchedProfile.pin || '8830'}-5`,
                    plateNo: `-`,
                    status: node.title.includes("Xóa") ? "Đã giải chấp" : "Đang bảo đảm"
                },
                {
                    id: 6,
                    typeName: "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung",
                    name: "50.000 cổ phiếu tự do chuyển nhượng",
                    brandColor: "Mã HBC của Công ty Cổ phần Xây dựng Hòa Bình",
                    frameNo: `FN-${matchedProfile.pin || '9920'}-6`,
                    engineNo: `EN-${matchedProfile.pin || '8830'}-6`,
                    plateNo: `-`,
                    status: node.title.includes("Xóa") ? "Đã giải chấp" : "Đang bảo đảm"
                },
                {
                    id: 7,
                    typeName: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
                    name: "Dây chuyền sản xuất sợi cotton Rieter",
                    brandColor: "Nhập khẩu Thụy Sĩ mới 100%, Model 2025",
                    frameNo: `FN-${matchedProfile.pin || '9920'}-7`,
                    engineNo: `EN-${matchedProfile.pin || '8830'}-7`,
                    plateNo: `-`,
                    status: node.title.includes("Xóa") ? "Đã giải chấp" : "Đang bảo đảm"
                }
            ];

            const v = {
                version: idx + 1,
                label: node.title,
                badgeClass: node.title.includes("lần đầu") || node.title.includes("mới") || node.title.includes("Gốc") ? "badge-initial" : 
                            (node.title.includes("thay đổi") ? "badge-change" : 
                            (node.title.includes("Xóa") ? "badge-delete" : "badge-other")),
                title: `${node.title} (${node.status})`,
                statusText: node.status,
                date: node.date,
                regCode: matchedProfile.id,
                description: `${node.title} cho tài sản bảo đảm`,
                active: node.active || false,
                isPending: ["Chờ duyệt", "Chờ ký", "Chờ thanh toán"].includes(node.status),
                nodeId: node.id,
                data: {
                    registrantName: matchedProfile.customer,
                    registrantAddress: "Số 25 Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam",
                    registrantDoc: `Giay_dang_ky_${matchedProfile.id}.pdf`,
                    regCase: node.title,
                    firstRegNo: matchedProfile.id,
                    firstRegDate: matchedProfile.date,
                    viewOriginalDoc: `GCN_Goc_${matchedProfile.id}.pdf`,
                    receivingAgency: "Trung tâm Đăng ký giao dịch, tài sản quốc gia",
                    transactionType: matchedProfile.transactionType || "Biện pháp bảo đảm",
                    measureType: matchedProfile.subtype || "Thế chấp",
                    contractType: "",
                    contractNo: `HĐTC-${matchedProfile.pin || '2026'}`,
                    contractDate: "14/06/2026",
                    loanValue: "1.500.000.000 VNĐ",
                    scale: "Doanh nghiệp",
                    femaleOwner: "Không",
                    securingParties: [
                        {
                            type: "tc_vn",
                            typeName: "Tổ chức trong nước",
                            name: matchedProfile.customer,
                            paperNo: matchedProfile.customerId || "0102030405",
                            address: "Số 25 Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam",
                            status: "Không thay đổi"
                        }
                    ],
                    securedParties: [
                        {
                            typeName: "Tổ chức",
                            paperNo: "0100112437",
                            name: matchedProfile.mortgagee,
                            address: "Số 17 Duy Tân, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
                            status: "Không thay đổi"
                        }
                    ],
                    assets: assets
                }
            };

            if (node.title.includes("Xóa")) {
                v.data.deRegBasis = "Khoản 1 Điều 21 Nghị định 99/2022/NĐ-CP (Các bên thỏa thuận xóa đăng ký biện pháp bảo đảm)";
            }
            if (node.title.includes("Hủy")) {
                v.data.cancelRegBasis = "Hủy đăng ký theo quyết định của cơ quan nhà nước có thẩm quyền";
            }
            if (node.status === "Bị từ chối") {
                v.data.hasRejection = true;
                v.data.rejectionReason = "Hồ sơ không hợp lệ do thông tin bên bảo đảm không khớp với cơ sở dữ liệu quốc gia về dân cư.";
                v.data.rejectionDate = node.date;
                v.data.rejectionUser = "Nguyễn Văn Cán Bộ";
            }

            mockTimelineData.push(v);
        });

        // Sắp xếp đưa phiên bản mới nhất lên đầu
        mockTimelineData.sort((a, b) => b.version - a.version);

    } else {
        // Ánh xạ chính xác theo mã hồ sơ tra cứu của Cán bộ (Đảm bộ đồng bộ 100% giữa UC027 lookup và timeline detail)
        if (regNumParam.includes('1505156435')) {
            // 1505156435: Nhiều nhánh, có hồ sơ đang chờ duyệt
            const h35_v4 = {
                version: 4,
                label: "Thay đổi 2",
                badgeClass: "badge-initial",
                title: "Thay đổi nội dung đăng ký lần 2 (Chờ duyệt)",
                statusText: "Chờ duyệt",
                date: "06/06/2026 10:15:00",
                regCode: "1505156435-TĐ2",
                description: "Yêu cầu thay đổi bên nhận bảo đảm sang Chi nhánh mới",
                data: JSON.parse(JSON.stringify(h35_v2.data))
            };
            h35_v4.data.loanValue = "1.000.000.000 VNĐ";
            h35_v4.data.modifiedFields = {
                loanValue: { old: "800.000.000 VNĐ" }
            };
            
            // h35_v3 là Thông báo xử lý tài sản bảo đảm lần đầu
            h35_v3.label = "Thông báo xử lý";
            h35_v3.title = "Thông báo xử lý tài sản bảo đảm (Hoàn thành)";
            h35_v3.date = "05/06/2026 15:30:00";
            h35_v3.regCode = "1505156435-TBXL";
            
            mockTimelineData.push(h35_v4);
            mockTimelineData.push(h35_v3);
            mockTimelineData.push(h35_v2);
            mockTimelineData.push(h35_v1);
        } else if (regNumParam.includes('1505156436')) {
            // 1505156436: Chỉ có 1 nhánh và là Chờ thanh toán
            const h36_v1 = {
                version: 1,
                label: "Đăng ký gốc",
                badgeClass: "badge-initial",
                title: "Đăng ký lần đầu (Gốc) (Chờ thanh toán)",
                statusText: "Chờ thanh toán",
                date: "06/06/2026 08:30:00",
                regCode: "1505156436",
                description: "Đăng ký biện pháp bảo đảm lần đầu xe ô tô Toyota",
                data: JSON.parse(JSON.stringify(h35_v1.data))
            };
            h36_v1.data.registrantName = "Trần Thị Bình";
            mockTimelineData.push(h36_v1);
        } else if (regNumParam.includes('1505156437')) {
            // 1505156437: Chỉ có 1 nhánh và bị Từ chối
            const h37_v1 = {
                version: 1,
                label: "Đăng ký gốc",
                badgeClass: "badge-initial",
                title: "Đăng ký lần đầu (Gốc) (Bị từ chối)",
                statusText: "Bị từ chối",
                date: "08/06/2026 16:45:00",
                regCode: "1505156437",
                description: "Đăng ký biện pháp bảo đảm lần đầu bằng các động sản khác",
                data: JSON.parse(JSON.stringify(h35_v1.data))
            };
            h37_v1.data.registrantName = "Phạm Văn Cường";
            h37_v1.data.hasRejection = true;
            h37_v1.data.rejectionReason = "Hồ sơ không hợp lệ do thông tin bên bảo đảm không khớp với cơ sở dữ liệu quốc gia về dân cư.";
            h37_v1.data.rejectionDate = "08/06/2026 17:00:00";
            h37_v1.data.rejectionUser = "Nguyễn Văn Cán Bộ";
            mockTimelineData.push(h37_v1);
        } else if (regNumParam.includes('1505156438')) {
            // 1505156438: Nhiều nhánh, có cả Xóa thông báo xử lý đang Chờ duyệt
            const h38_v3 = {
                version: 3,
                label: "Thông báo xử lý",
                badgeClass: "badge-change",
                title: "Thông báo xử lý tài sản đảm bảo lần đầu (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "15/06/2026 10:00:00",
                regCode: "1505156438-TBXL",
                description: "Đăng ký thông báo xử lý tài sản bảo đảm",
                data: JSON.parse(JSON.stringify(h38_v1.data))
            };
            h38_v3.data.assets.forEach(a => a.status = "Đang xử lý tài sản");

            const h38_v4 = {
                version: 4,
                label: "Thay đổi thông báo",
                badgeClass: "badge-change",
                title: "Thay đổi thông báo xử lý tài sản bảo đảm (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "16/06/2026 09:30:00",
                regCode: "1505156438-TBXL-TĐ1",
                description: "Thay đổi thông tin địa điểm xử lý tài sản bảo đảm",
                data: JSON.parse(JSON.stringify(h38_v3.data))
            };

            const h38_v5 = {
                version: 5,
                label: "Xóa thông báo",
                badgeClass: "badge-initial",
                title: "Xóa đăng ký thông báo xử lý tài sản bảo đảm (Chờ duyệt)",
                statusText: "Chờ duyệt",
                date: "18/06/2026 14:00:00",
                regCode: "1505156438-TBXL-X1",
                description: "Yêu cầu xóa đăng ký thông báo xử lý tài sản bảo đảm",
                data: JSON.parse(JSON.stringify(h38_v4.data))
            };
            h38_v5.data.assets.forEach(a => a.status = "Đang bảo đảm");

            // Cập nhật lại h38_v2 thành Xóa đăng ký (Hoàn thành) của 1505156438-XÓA
            h38_v2.label = "Xóa đăng ký";
            h38_v2.title = "Xóa đăng ký (Hoàn thành)";
            h38_v2.date = "12/06/2026 15:30:00";
            h38_v2.regCode = "1505156438-XÓA";
            h38_v2.data.hasDeRegistration = true;
            h38_v2.data.deRegDate = "12/06/2026 15:30:00";
            h38_v2.data.assets.forEach(a => a.status = "Đã giải chấp");

            mockTimelineData.push(h38_v5);
            mockTimelineData.push(h38_v4);
            mockTimelineData.push(h38_v3);
            mockTimelineData.push(h38_v2);
            mockTimelineData.push(h38_v1);
        } else if (regNumParam.includes('1505156439')) {
            // 1505156439: Chỉ có 1 nhánh duy nhất (Hoàn thành)
            const h39_v1 = {
                version: 1,
                label: "Đăng ký gốc",
                badgeClass: "badge-initial",
                title: "Đăng ký lần đầu (Gốc) (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "20/06/2026 10:00:00",
                regCode: "1505156439",
                description: "Đăng ký biện pháp bảo đảm lần đầu hàng hóa luân chuyển",
                data: JSON.parse(JSON.stringify(h35_v1.data))
            };
            h39_v1.data.registrantName = "Công ty CP Thủy sản miền Nam";
            mockTimelineData.push(h39_v1);
        } else if (regNumParam.includes('1505156440')) {
            // 1505156440: Nhiều nhánh nhưng đều hoàn thành rồi (2 phiên bản)
            const h40_v2 = {
                version: 2,
                label: "Hủy đăng ký",
                badgeClass: "badge-delete",
                title: "Hủy đăng ký (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "22/06/2026 14:00:00",
                regCode: "1505156440-HUY",
                description: "Hủy đăng ký biện pháp bảo đảm theo quyết định tòa án",
                data: JSON.parse(JSON.stringify(h40_v1.data))
            };
            h40_v2.data.hasCancelReg = true;
            h40_v2.data.cancelRegBasis = "Hủy đăng ký theo quyết định của cơ quan nhà nước có thẩm quyền";
            h40_v2.data.assets.forEach(a => a.status = "Đã giải chấp");

            mockTimelineData.push(h40_v2);
            mockTimelineData.push(h40_v1);
        } else if (regNumParam.includes('1505156441')) {
            // 1505156441: Nhiều nhánh nhưng đều hoàn thành rồi (3 phiên bản)
            const h41_v2 = {
                version: 2,
                label: "Hủy đăng ký",
                badgeClass: "badge-delete",
                title: "Hủy đăng ký (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "24/06/2026 10:15:00",
                regCode: "1505156441-HUY",
                description: "Hủy đăng ký biện pháp bảo đảm theo văn bản cơ quan thi hành án",
                data: JSON.parse(JSON.stringify(h41_v1.data))
            };
            h41_v2.data.hasCancelReg = true;
            h41_v2.data.cancelRegBasis = "Hủy đăng ký theo quyết định của cơ quan nhà nước có thẩm quyền";
            h41_v2.data.assets.forEach(a => a.status = "Đã giải chấp");

            const h41_v3 = {
                version: 3,
                label: "Khôi phục hủy",
                badgeClass: "badge-initial",
                title: "Khôi phục hủy đăng ký (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "25/06/2026 15:40:00",
                regCode: "1505156441-KP",
                description: "Khôi phục trạng thái đăng ký ban đầu theo quyết định hành chính",
                data: JSON.parse(JSON.stringify(h41_v1.data))
            };
            h41_v3.data.assets.forEach(a => a.status = "Đang bảo đảm");

            mockTimelineData.push(h41_v3);
            mockTimelineData.push(h41_v2);
            mockTimelineData.push(h41_v1);
        } else if (regNumParam.includes('1505156442')) {
            // 1505156442: Nhiều nhánh đều hoàn thành rồi (2 phiên bản)
            const h42_v2 = {
                version: 2,
                label: "Thay đổi 1",
                badgeClass: "badge-change",
                title: "Thay đổi nội dung đăng ký lần 1 (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "27/06/2026 11:30:00",
                regCode: "1505156442-TĐ1",
                description: "Thay đổi tăng giá trị tài sản thế chấp",
                data: JSON.parse(JSON.stringify(h42_v1.data))
            };
            h42_v2.data.loanValue = "4.000.000.000 VNĐ";

            mockTimelineData.push(h42_v2);
            mockTimelineData.push(h42_v1);
        } else if (regNumParam.includes('1505156443')) {
            // 1505156443: Nhiều nhánh đều hoàn thành rồi (2 phiên bản)
            const h43_v2 = {
                version: 2,
                label: "Xóa đăng ký",
                badgeClass: "badge-removed",
                title: "Xóa đăng ký (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "29/06/2026 16:30:00",
                regCode: "1505156443-XD1",
                description: "Xóa đăng ký toàn bộ tài sản bảo đảm",
                data: JSON.parse(JSON.stringify(h43_v1.data))
            };
            h43_v2.data.hasDeRegistration = true;
            h43_v2.data.deRegDate = "29/06/2026 16:30:00";
            h43_v2.data.assets.forEach(a => a.status = "Đã giải chấp");

            mockTimelineData.push(h43_v2);
            mockTimelineData.push(h43_v1);
        } else if (regNumParam.includes('1505156444')) {
            // 1505156444: Chỉ có 1 nhánh duy nhất (Hoàn thành)
            const h44_v1 = {
                version: 1,
                label: "Đăng ký gốc",
                badgeClass: "badge-initial",
                title: "Đăng ký lần đầu (Gốc) (Hoàn thành)",
                statusText: "Hoàn thành",
                date: "30/06/2026 08:30:00",
                regCode: "1505156444",
                description: "Đăng ký biện pháp bảo đảm lần đầu cây hằng năm",
                data: JSON.parse(JSON.stringify(h35_v1.data))
            };
            h44_v1.data.registrantName = "Hợp tác xã Nông nghiệp Tiến Phát";
            h44_v1.data.measureType = "Thế chấp";
            h44_v1.data.assets = [
                {
                    id: 1,
                    typeName: "Cây hằng năm, công trình tạm",
                    name: "Vườn cây cao su đang thu hoạch",
                    brandColor: "Diện tích 5ha tại Nông trường Bình Phước",
                    frameNo: "VCCS-2026-88",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                }
            ];
            mockTimelineData.push(h44_v1);
        } else if (regNumParam.includes('000812') || regNumParam.includes('000813') || regNumParam.includes('000814')) {
            // Trường hợp từ trang kiểm tra hồ sơ
            if (regNumParam.includes('000812')) {
                mockTimelineData.push(v1);
            } else {
                mockTimelineData.push(h38_v2);
                mockTimelineData.push(h38_v1);
            }
        } else {
            // Mặc định (BD-2026-001) với 8 phiên bản + 8 phiên bản nháp (tổng cộng 17 phiên bản timeline)
            if (isSingleMode) {
                mockTimelineData.push(v1);
            } else {
                // Đưa các phiên bản mới lên trước
                mockTimelineData.push(v8);
                mockTimelineData.push(v7);
                mockTimelineData.push(v6);
                mockTimelineData.push(v5);
                mockTimelineData.push(v4);
                mockTimelineData.push(v3);
                mockTimelineData.push(v2);

                // Bổ sung các phiên bản phụ
                for (let i = 8; i >= 1; i--) {
                    mockTimelineData.push({
                        version: i + 10,
                        label: `Thay đổi phụ ${i}`,
                        badgeClass: "badge-change",
                        title: `Thay đổi thông tin phụ lần ${i}`,
                        statusText: "Hoàn thành",
                        date: `1${i}/03/2026 10:00:00`,
                        regCode: `BD-2026-001-TD${i + 2}`,
                        description: `Thay đổi thông tin nhỏ liên quan đến quy trình lần thứ ${i}`,
                        data: JSON.parse(JSON.stringify(v4.data))
                    });
                }
                
                // Đăng ký gốc ở cuối cùng
                mockTimelineData.push(v1);
            }
        }
        // Sắp xếp giảm dần theo phiên bản
        mockTimelineData.sort((a, b) => b.version - a.version);
    }

    // Cập nhật giả lập các trường thông tin chung theo yêu cầu
    mockTimelineData.forEach(node => {
        if (!node.statusText) {
            node.statusText = "Hoàn thành";
        }
        if (node.data) {
            node.data.transactionType = "Hợp đồng";
            node.data.contractType = "Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác";
            node.data.scale = "Bên bảo đảm sử dụng khoản vay cho tiêu dùng cá nhân";
            node.data.receivingAgency = "Trung tâm đăng ký, giao dịch tài sản tại TP Hà Nội";

            // Bảng Loại tài sản giả lập đủ 7 loại tài sản
            const baseAssets = [
                {
                    id: 1,
                    typeName: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                    name: "Xe ô tô con 5 chỗ",
                    brandColor: "Toyota Camry 2.5Q, Màu đen",
                    frameNo: "CAMRY-88992211",
                    engineNo: "ENG-2AR-998811",
                    plateNo: "30H-123.45",
                    status: "Đang bảo đảm"
                },
                {
                    id: 2,
                    typeName: "Tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
                    name: "Tàu cá vỏ gỗ Yamaha 200HP",
                    brandColor: "Công suất 150CV, Trắng xanh",
                    frameNo: "TC-9988-VN",
                    engineNo: "ENG-YAM-55331",
                    plateNo: "QB-90827-TS",
                    status: "Đang bảo đảm"
                },
                {
                    id: 3,
                    typeName: "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản",
                    name: "Quyền đòi nợ trị giá 2.000.000.000 VNĐ",
                    brandColor: "Phát sinh từ Hợp đồng mua bán số 01/2026/HĐMB đối với Công ty ABC",
                    frameNo: "QTD-2026-001",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 4,
                    typeName: "Cây hằng năm, công trình tạm",
                    name: "Vườn cây cao su đang thu hoạch",
                    brandColor: "Diện tích 5ha tại Nông trường Bình Phước",
                    frameNo: "VCCS-2026-88",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 5,
                    typeName: "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ",
                    name: "Kho hàng hạt tiêu xuất khẩu",
                    brandColor: "Khối lượng 50 tấn tại Cảng Hải Phòng",
                    frameNo: "HT-50T-HP",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 6,
                    typeName: "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung",
                    name: "50.000 cổ phiếu tự do chuyển nhượng",
                    brandColor: "Mã HBC của Công ty Cổ phần Xây dựng Hòa Bình",
                    frameNo: "CP-HBC-50K",
                    engineNo: "-",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                },
                {
                    id: 7,
                    typeName: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
                    name: "Dây chuyền sản xuất sợi cotton Rieter",
                    brandColor: "Nhập khẩu Thụy Sĩ mới 100%, Model 2025",
                    frameNo: "DC-RIETER-09",
                    engineNo: "ENG-RIET-01",
                    plateNo: "-",
                    status: "Đang bảo đảm"
                }
            ];

            // Determine if the node is Xóa/Hủy/Giải chấp
            const isRemoved = node.title.toLowerCase().includes("xóa") || 
                              node.title.toLowerCase().includes("hủy") || 
                              node.statusText === "Đã giải chấp" ||
                              (node.data && (node.data.hasDeRegistration || node.data.hasCancelReg));

            if (isRemoved) {
                baseAssets.forEach(a => a.status = "Đã giải chấp");
            } else if (node.title.toLowerCase().includes("thay đổi") || node.label.toLowerCase().includes("thay đổi") || node.version > 1) {
                baseAssets[3].status = "Sửa thông tin";
                baseAssets[3].prevName = "Vườn cây cao su non";
                baseAssets[3].prevBrandColor = "Diện tích 4ha tại Nông trường Bình Phước";
                baseAssets[4].status = "Bổ sung mới";
            }

            node.data.assets = baseAssets;
        }
    });

    let currentSelectedVersion = null;
    let currentRole = 'canbo';
    let activeAction = '';
    let summaryIdx = 1;
    let visibleCount = 10;
    let filteredData = [...mockTimelineData];

    // Read stored registration number if any to show banner
    const savedRegNum = localStorage.getItem('canBoRegNum');
    if (savedRegNum) {
        viewBanner.style.display = 'flex';
        viewBanner.querySelector('strong').textContent = savedRegNum;
    }

    // Check if timeline sidebar is displayed (only for dossiers with related dossiers, mockTimelineData.length >= 2)
    const timelineSidebar = document.querySelector('.timeline-sidebar');
    const workspaceGrid = document.querySelector('.workspace-grid');
    const diffToggleContainer = document.querySelector('.diff-toggle-container');
    const hasRelatedDossiers = mockTimelineData.length >= 2;

    if (!hasRelatedDossiers) {
        if (timelineSidebar) timelineSidebar.style.display = 'none';
        if (workspaceGrid) workspaceGrid.style.gridTemplateColumns = '1fr';
        if (diffToggleContainer) diffToggleContainer.style.display = 'none';
    } else {
        if (timelineSidebar) timelineSidebar.style.display = 'block';
        if (workspaceGrid) workspaceGrid.style.gridTemplateColumns = '360px 1fr';
        if (diffToggleContainer) diffToggleContainer.style.display = 'flex';
    }

    // Initialize page
    renderTimeline(true);
    setupEventListeners();

    // Helper to parse dd/mm/yyyy date string to Date object
    function parseDate(dateStr) {
        if (!dateStr) return null;
        if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            return new Date(parts[0], parts[1] - 1, parts[2]);
        }
        // Accept dd/mm/yyyy or dd/mm/yyyy hh:mm:ss
        const parts = dateStr.trim().split(' ');
        const dateParts = parts[0].split('/');
        if (dateParts.length !== 3) return null;
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);
        
        let hours = 0, minutes = 0, seconds = 0;
        if (parts.length > 1) {
            const timeParts = parts[1].split(':');
            if (timeParts.length >= 2) {
                hours = parseInt(timeParts[0], 10);
                minutes = parseInt(timeParts[1], 10);
            }
            if (timeParts.length >= 3) {
                seconds = parseInt(timeParts[2], 10);
            }
        }
        return new Date(year, month, day, hours, minutes, seconds);
    }

    // Render timeline
    function renderTimeline(resetPagination = true) {
        if (resetPagination) {
            visibleCount = 10;
        }

        timelineContainer.innerHTML = '';
        
        // Filter based on search input and date filters
        const query = (timelineSearchInput.value || '').trim().toLowerCase();
        const fromDateVal = (filterFromDate.value || '').trim();
        const toDateVal = (filterToDate.value || '').trim();

        const fromDateObj = parseDate(fromDateVal);
        const toDateObj = parseDate(toDateVal);

        filteredData = mockTimelineData.filter(node => {
            // Search filter
            const matchesQuery = !query || 
                node.title.toLowerCase().includes(query) || 
                node.regCode.toLowerCase().includes(query) || 
                node.description.toLowerCase().includes(query);

            if (!matchesQuery) return false;

            // Date range filter
            const nodeDateObj = parseDate(node.date);
            if (nodeDateObj) {
                if (fromDateObj && nodeDateObj < fromDateObj) return false;
                if (toDateObj) {
                    // Set toDate to end of day
                    const endOfToDate = new Date(toDateObj);
                    endOfToDate.setHours(23, 59, 59, 999);
                    if (nodeDateObj > endOfToDate) return false;
                }
            }
            return true;
        });

        // If no records match, display a small notification
        if (filteredData.length === 0) {
            timelineContainer.innerHTML = `
                <div style="text-align: center; padding: 20px; color: var(--text-muted); font-style: italic;">
                    Không tìm thấy phiên bản phù hợp.
                </div>
            `;
            timelineMoreBtnContainer.style.display = 'none';
            return;
        }

        const slice = filteredData.slice(0, visibleCount);

        slice.forEach((node) => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'timeline-node';
            nodeEl.setAttribute('data-reg-code', node.regCode);
            nodeEl.setAttribute('data-node-id', node.nodeId || '');
            if (currentSelectedVersion && currentSelectedVersion.version === node.version) {
                nodeEl.classList.add('selected');
            }
            
            let statusClass = 'status-rejected';
            let statusTextHtml = `<i class="fa-solid fa-circle-xmark"></i> Bị từ chối`;
            
            if (node.statusText === 'Hoàn thành') {
                statusClass = 'status-completed';
                statusTextHtml = `<i class="fa-solid fa-circle-check"></i> Hoàn thành`;
            } else if (["Chờ duyệt", "Chờ ký", "Duyệt chờ ký", "Chờ thanh toán", "Chờ nhập liệu", "Đang xử lý"].includes(node.statusText)) {
                statusClass = 'status-pending';
                statusTextHtml = `<i class="fa-solid fa-clock"></i> ${node.statusText}`;
            } else if (node.statusText) {
                if (node.statusText.includes("trả lại") || node.statusText.includes("chỉnh sửa") || node.statusText.includes("Trả lại")) {
                    statusClass = 'status-pending';
                    statusTextHtml = `<i class="fa-solid fa-rotate-left"></i> ${node.statusText}`;
                } else {
                    statusClass = 'status-rejected';
                    statusTextHtml = `<i class="fa-solid fa-circle-xmark"></i> ${node.statusText}`;
                }
            }

            const isCompleted = node.statusText === 'Hoàn thành';
            nodeEl.innerHTML = `
                <div class="node-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span class="node-badge ${node.badgeClass}">${node.label}</span>
                    <span class="node-status-badge ${statusClass}">
                        ${statusTextHtml}
                    </span>
                </div>
                <div class="node-title" style="font-weight: 700; color: var(--text-main); font-size: 13.5px; margin-bottom: 4px;">${node.title}</div>
                <div class="node-reg-code" style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">
                    <strong>Số HS:</strong> ${node.regCode}
                </div>
                <div class="node-date" style="font-size: 11.5px; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
                    <i class="fa-regular fa-calendar"></i> <strong>Thời điểm:</strong> ${node.date}
                </div>
                <p class="node-desc" style="font-size: 11px; color: var(--text-muted); margin: 6px 0 0 0; line-height: 1.4; border-top: 1px dashed #E2E8F0; padding-top: 6px;">
                    ${node.description}
                </p>
                ${isCompleted ? `
                    <div class="node-actions" style="display: flex; justify-content: flex-end; margin-top: 6px; padding-top: 4px;">
                        <button class="btn-download-pdf" data-version="${node.version}" data-code="${node.regCode}">
                            <i class="fa-solid fa-file-pdf"></i> Kết quả PDF
                        </button>
                    </div>
                ` : ''}
            `;

            // Node Click
            nodeEl.addEventListener('click', function (e) {
                if (e.target.closest('.btn-download-pdf')) {
                    return; // Ignore if clicking PDF download button
                }
                
                document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('selected'));
                nodeEl.classList.add('selected');
                selectVersion(node);
            });

            timelineContainer.appendChild(nodeEl);
        });

        // Show or hide "Load More" button
        if (filteredData.length > visibleCount) {
            timelineMoreBtnContainer.style.display = 'block';
        } else {
            timelineMoreBtnContainer.style.display = 'none';
        }

        // Auto select the first item on load/search
        if (resetPagination && slice.length > 0) {
            const focusId = urlParams.get('focusId');
            let clicked = false;
            
            if (focusId) {
                let fid = focusId.toLowerCase().trim();
                const matchedEl = Array.from(timelineContainer.querySelectorAll('.timeline-node')).find(el => {
                    const code = el.getAttribute('data-reg-code').toLowerCase().trim();
                    const nodeId = (el.getAttribute('data-node-id') || '').toLowerCase().trim();
                    return code === fid || nodeId === fid || code.includes(fid) || fid.includes(code);
                });
                
                if (matchedEl) {
                    matchedEl.click();
                    clicked = true;
                }
            }
            
            if (!clicked) {
                const isCurrentlySelectedVisible = slice.some(n => currentSelectedVersion && n.version === currentSelectedVersion.version);
                if (!isCurrentlySelectedVisible) {
                    // Select the first node in the view
                    const firstNode = timelineContainer.querySelector('.timeline-node');
                    if (firstNode) firstNode.click();
                }
            }
        }
    }

    // Select version and update details view
    function selectVersion(versionNode) {
        currentSelectedVersion = versionNode;
        
        // Update title/status headers
        currentVersionTitle.textContent = `${versionNode.title} - Trạng thái: ${versionNode.statusText}`;
        currentVersionSubtitle.textContent = `Số đăng ký: ${versionNode.regCode} | Thời điểm thực hiện: ${versionNode.date}`;

        // Reset display of special blocks
        sectionDeRegistration.style.display = 'none';
        sectionCancelRegistration.style.display = 'none';
        sectionRestoreRegistration.style.display = 'none';
        sectionEditInfo.style.display = 'none';
        sectionRejectionInfo.style.display = 'none';

        // 11. Rejection block (only if version is Bị từ chối)
        const isPendingOrCompleted = ["Chờ duyệt", "Chờ ký", "Duyệt chờ ký", "Chờ thanh toán", "Chờ nhập liệu", "Đang xử lý", "Hoàn thành"].includes(versionNode.statusText);
        if (!isPendingOrCompleted && (versionNode.statusText === 'Bị từ chối' || versionNode.data.hasRejection)) {
            sectionRejectionInfo.style.display = 'block';
            rejectDateVal.textContent = versionNode.data.rejectDate || versionNode.date;
            rejectReasonVal.textContent = versionNode.data.rejectReason || "Không có lý do chi tiết.";
            rejectDocVal.innerHTML = `<a href="#" class="btn-download-pdf" data-code="${versionNode.regCode}"><i class="fa-solid fa-file-pdf"></i> Tải Quyết định từ chối (.pdf)</a>`;
        }

        // Show specialized event blocks based on node data
        if (versionNode.data.hasDeRegistration) {
            sectionDeRegistration.style.display = 'block';
            deRegDateVal.textContent = versionNode.data.deRegDate;
            deRegRequesterVal.textContent = versionNode.data.deRegRequester;
            deRegBasisVal.textContent = versionNode.data.deRegBasis;
            btnDownloadDeRegPdf.setAttribute('data-code', versionNode.regCode);
        }

        if (versionNode.data.hasCancelReg) {
            sectionCancelRegistration.style.display = 'block';
            cancelDateVal.textContent = versionNode.data.cancelDate;
            cancelRequesterVal.textContent = versionNode.data.cancelRequester;
            cancelOfficerVal.textContent = versionNode.data.cancelOfficer;
            cancelLeaderVal.textContent = versionNode.data.cancelLeader;
            cancelTypeVal.textContent = versionNode.data.cancelType;
            cancelBasisVal.textContent = versionNode.data.cancelBasis;
            cancelDocVal.innerHTML = `<a href="#" class="btn-download-pdf" data-code="${versionNode.data.cancelDoc}"><i class="fa-solid fa-file-pdf"></i> ${versionNode.data.cancelDoc}</a>`;
            btnDownloadCancelPdf.setAttribute('data-code', versionNode.regCode);
        }

        if (versionNode.data.hasRestoreReg) {
            sectionRestoreRegistration.style.display = 'block';
            restoreDateVal.textContent = versionNode.data.restoreDate;
            restoreRequesterVal.textContent = versionNode.data.restoreRequester;
            restoreOfficerVal.textContent = versionNode.data.restoreOfficer;
            restoreLeaderVal.textContent = versionNode.data.restoreLeader;
            restoreBasisVal.textContent = versionNode.data.restoreBasis;
            btnDownloadRestorePdf.setAttribute('data-code', versionNode.regCode);
        }

        if (versionNode.data.hasEditInfo) {
            sectionEditInfo.style.display = 'block';
            editDateVal.textContent = versionNode.data.editDate;
            editRequesterVal.textContent = versionNode.data.editRequester || "Không có";
            editOfficerVal.textContent = versionNode.data.editOfficer;
            editLeaderVal.textContent = versionNode.data.editLeader;
            btnDownloadEditPdf.setAttribute('data-code', versionNode.regCode);
        }

        // Find previous version for diffing
        let previousVersion = null;
        const currentVersionIdx = mockTimelineData.findIndex(v => v.version === versionNode.version);
        if (currentVersionIdx !== -1) {
            // Find the immediate previous version in history that is successful/complete (not rejected)
            let idx = currentVersionIdx + 1;
            while (idx < mockTimelineData.length) {
                // We compare changes against the last complete baseline version
                if (mockTimelineData[idx].statusText === 'Hoàn thành') {
                    previousVersion = mockTimelineData[idx];
                    break;
                }
                idx++;
            }
        }

        // Render sections & calculate diffs
        calculateAndRenderDetails(versionNode, previousVersion);
    }

    // Compare fields and render details view
    function calculateAndRenderDetails(current, previous) {
        summaryTableBody.innerHTML = '';
        summaryIdx = 1;

        const currData = current.data;
        const prevData = previous ? previous.data : null;

        // Helper to render and diff text fields
        function renderFieldDiff(field, currData, prevData) {
            const currVal = field.valueGetter ? field.valueGetter(current) : currData[field.key];
            const prevVal = prevData ? (field.valueGetter ? field.valueGetter(previous) : prevData[field.key]) : null;
            const fieldEl = document.getElementById(field.fieldId);
            const valueEl = document.getElementById(field.elementId);
            
            // Check if field is visible
            let isVisible = true;
            if (field.visibleCondition) {
                isVisible = field.visibleCondition(current, currVal);
            }

            if (!isVisible) {
                fieldEl.style.display = 'none';
                fieldEl.setAttribute('data-modified', 'false');
                return;
            } else {
                fieldEl.style.display = 'flex';
            }

            let isModified = false;
            
            // Highlight modifications for Thay đổi (change) or Chỉnh lý (correction)
            if (prevData && prevVal !== undefined && prevVal !== null && prevVal !== currVal && (current.label.includes("Thay đổi") || current.label.includes("Chỉnh lý"))) {
                isModified = true;
                
                // Add modification row to the summary table
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${summaryIdx++}</td>
                    <td style="padding: 10px; border-bottom: 1px solid var(--border-color); font-weight: 500; color: var(--primary-color);">${field.block}</td>
                    <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${field.label}</td>
                    <td style="padding: 10px; border-bottom: 1px solid var(--border-color);"><span class="table-status-tag tag-modified">Chỉnh sửa</span></td>
                    <td style="padding: 10px; border-bottom: 1px solid var(--border-color); color: var(--text-muted); text-decoration: line-through;">${prevVal || '(trống)'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid var(--border-color); font-weight: 600;">${currVal || '(trống)'}</td>
                `;
                summaryTableBody.appendChild(row);
            }

            fieldEl.setAttribute('data-modified', isModified ? 'true' : 'false');
            
            // Render value with highlight or normal state
            if (isModified) {
                fieldEl.classList.add('modified');
                if (field.isLink && currVal) {
                    valueEl.innerHTML = `
                        <a href="#" class="btn-download-pdf" data-code="${currVal}">${currVal}</a>
                        <div class="popover-container" style="display:inline-block; margin-left: 5px;">
                            <span class="history-trigger-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>
                            <div class="history-popover">Giá trị cũ: ${prevVal || '(trống)'}</div>
                        </div>
                    `;
                } else {
                    valueEl.innerHTML = `
                        ${currVal || '-'}
                        <div class="popover-container" style="display:inline-block; margin-left: 5px;">
                            <span class="history-trigger-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>
                            <div class="history-popover">Giá trị cũ: ${prevVal || '(trống)'}</div>
                        </div>
                    `;
                }
            } else {
                fieldEl.classList.remove('modified');
                if (field.isLink && currVal) {
                    valueEl.innerHTML = `<a href="#" class="btn-download-pdf" data-code="${currVal}">${currVal}</a>`;
                } else {
                    valueEl.textContent = currVal || '-';
                }
            }
        }

        // Helper to append a summary row
        function addListSummaryRow(block, fieldLabel, changeType, beforeVal, afterVal) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${summaryIdx++}</td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color); font-weight: 500; color: var(--primary-color);">${block}</td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color);">${fieldLabel}</td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color);"><span class="table-status-tag ${changeType === 'Thêm mới' ? 'tag-added' : (changeType === 'Rút bớt' ? 'tag-removed' : 'tag-modified')}">${changeType}</span></td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color); color: var(--text-muted); ${changeType === 'Chỉnh sửa' || changeType === 'Rút bớt' ? 'text-decoration: line-through;' : ''}">${beforeVal}</td>
                <td style="padding: 10px; border-bottom: 1px solid var(--border-color); font-weight: 600;">${afterVal}</td>
            `;
            summaryTableBody.appendChild(row);
        }

        // 1. Registrant Info
        const registrantFields = [
            { key: 'registrantName', label: 'Họ và tên/Tên tổ chức', block: 'Thông tin Người đăng ký', elementId: 'registrantNameVal', fieldId: 'registrantNameField' },
            { key: 'registrantAddress', label: 'Địa chỉ', block: 'Thông tin Người đăng ký', elementId: 'registrantAddressVal', fieldId: 'registrantAddressField' },
            { key: 'registrantDoc', label: 'Tài liệu chứng minh (pdf)', block: 'Thông tin Người đăng ký', elementId: 'registrantDocVal', fieldId: 'registrantDocField', isLink: true, visibleCondition: (node, val) => !!val }
        ];
        registrantFields.forEach(field => renderFieldDiff(field, currData, prevData));

        // 2. Reference Info
        const referenceFields = [
            { key: 'regCase', label: 'Trường hợp đăng ký', block: 'Thông tin hồ sơ', elementId: 'regCaseVal', fieldId: 'regCaseField' },
            { 
                label: 'Ngày đăng ký', 
                block: 'Thông tin hồ sơ', 
                elementId: 'regDateVal', 
                fieldId: 'regDateField',
                valueGetter: (node) => node ? node.date : null
            },
            { 
                label: 'Số hồ sơ đăng ký', 
                block: 'Thông tin hồ sơ', 
                elementId: 'regNoVal', 
                fieldId: 'regNoField', 
                visibleCondition: (node) => node.version !== 1,
                valueGetter: (node) => node ? node.regCode : null
            },
            { 
                key: 'copyRegNo', 
                label: 'Số đăng ký cần cấp bản sao', 
                block: 'Thông tin hồ sơ', 
                elementId: 'copyRegNoVal', 
                fieldId: 'copyRegNoField', 
                visibleCondition: (node, val) => {
                    const isCopy = node.title.includes("bản sao") || node.title.includes("Bản sao") || node.title.includes("cấp bản sao");
                    const firstNo = node.data.firstRegNo || '';
                    const copyNo = node.data.copyRegNo || '';
                    return isCopy && copyNo !== '' && copyNo !== firstNo;
                }
            },
            { 
                key: 'copyCount', 
                label: 'Số lượng bản sao yêu cầu', 
                block: 'Thông tin hồ sơ', 
                elementId: 'copyCountVal', 
                fieldId: 'copyCountField', 
                visibleCondition: (node, val) => (node.title.includes("bản sao") || node.title.includes("Bản sao") || node.title.includes("cấp bản sao")) && !!val
            },
            { key: 'firstRegNo', label: 'Số đăng ký lần đầu', block: 'Thông tin hồ sơ', elementId: 'firstRegNoVal', fieldId: 'firstRegNoField' },
            { key: 'firstRegDate', label: 'Thời điểm đăng ký lần đầu', block: 'Thông tin hồ sơ', elementId: 'firstRegDateVal', fieldId: 'firstRegDateField' },
            { key: 'viewOriginalDoc', label: 'Xem hồ sơ gốc', block: 'Thông tin hồ sơ', elementId: 'viewOriginalDocVal', fieldId: 'viewOriginalDocField', isLink: true }
        ];
        referenceFields.forEach(field => renderFieldDiff(field, currData, prevData));

        // 3. General Info
        const generalFields = [
            { key: 'transactionType', label: 'Loại hình giao dịch', block: 'Thông tin chung', elementId: 'transactionTypeVal', fieldId: 'transactionTypeField' },
            { key: 'measureType', label: 'Loại biện pháp', block: 'Thông tin chung', elementId: 'measureTypeVal', fieldId: 'measureTypeField', visibleCondition: (node) => node.data.transactionType === 'Biện pháp bảo đảm' },
            { key: 'contractType', label: 'Loại hợp đồng', block: 'Thông tin chung', elementId: 'contractTypeVal', fieldId: 'contractTypeField', visibleCondition: (node) => node.data.transactionType === 'Hợp đồng' },
            { key: 'contractNo', label: 'Số hợp đồng', block: 'Thông tin chung', elementId: 'contractNoVal', fieldId: 'contractNoField' },
            { key: 'contractDate', label: 'Ngày có hiệu lực của hợp đồng', block: 'Thông tin chung', elementId: 'contractDateVal', fieldId: 'contractDateField' },
            { key: 'loanValue', label: 'Giá trị khoản vay hoặc nghĩa vụ (VND)', block: 'Thông tin chung', elementId: 'loanValueVal', fieldId: 'loanValueField' },
            { key: 'scale', label: 'Quy mô', block: 'Thông tin chung', elementId: 'scaleVal', fieldId: 'scaleField' },
            { key: 'femaleOwner', label: 'Chủ doanh nghiệp là nữ giới', block: 'Thông tin chung', elementId: 'femaleOwnerVal', fieldId: 'femaleOwnerField' },
            { key: 'receivingAgency', label: 'Cơ quan tiếp nhận', block: 'Thông tin chung', elementId: 'receivingAgencyVal', fieldId: 'receivingAgencyField' }
        ];
        generalFields.forEach(field => renderFieldDiff(field, currData, prevData));

        // Show/hide measure or contract based on type
        const transType = currData['transactionType'];
        document.getElementById('measureTypeField').style.display = (transType === 'Biện pháp bảo đảm') ? 'flex' : 'none';
        document.getElementById('contractTypeField').style.display = (transType === 'Hợp đồng') ? 'flex' : 'none';

        // Dynamic titles for Securing Parties / Secured Parties
        const isContract = currData.transactionType === 'Hợp đồng';
        if (isContract) {
            if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên bảo đảm';
            if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận bảo đảm';
        } else {
            const measure = currData.measureType;
            if (measure === 'Thế chấp') {
                if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên thế chấp';
                if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận thế chấp';
            } else if (measure === 'Cầm cố') {
                if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên cầm cố';
                if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận cầm cố';
            } else if (measure === 'Bảo lãnh') {
                if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên bảo lãnh';
                if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận bảo lãnh';
            } else if (measure === 'Đặt cọc') {
                if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên đặt cọc';
                if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận đặt cọc';
            } else if (measure === 'Ký cược') {
                if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên ký cược';
                if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận ký cược';
            } else if (measure === 'Ký quỹ') {
                if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên ký quỹ';
                if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận ký quỹ';
            } else {
                if (securingPartiesTitleLabel) securingPartiesTitleLabel.textContent = 'Bên bảo đảm';
                if (securedPartiesTitleLabel) securedPartiesTitleLabel.textContent = 'Bên nhận bảo đảm';
            }
        }

        // 4. Bên bảo đảm (Tiêu đề động) GridView
        securingPartiesTableBody.innerHTML = '';
        const showPartyChanges = current.label.includes("Thay đổi") || current.label.includes("Chỉnh lý");

        currData.securingParties.forEach((party, idx) => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-status', party.status);
            
            let statusTag = '';
            let rowClass = '';
            
            if (showPartyChanges) {
                if (party.status === 'Bổ sung mới') {
                    rowClass = 'row-added';
                    statusTag = '<span class="table-status-tag tag-added"><i class="fa-solid fa-plus"></i> Bổ sung mới</span>';
                    addListSummaryRow(isContract ? 'Bên bảo đảm' : 'Bên bảo đảm', party.name, 'Thêm mới', '-', `${party.name} (${party.typeName})`);
                } else if (party.status === 'Rút bớt') {
                    rowClass = 'row-removed';
                    statusTag = '<span class="table-status-tag tag-removed"><i class="fa-solid fa-minus"></i> Rút bớt</span>';
                    addListSummaryRow(isContract ? 'Bên bảo đảm' : 'Bên bảo đảm', party.name, 'Rút bớt', `${party.name} (${party.typeName})`, '-');
                } else if (party.status === 'Sửa thông tin') {
                    rowClass = 'row-modified';
                    statusTag = '<span class="table-status-tag tag-modified"><i class="fa-solid fa-pen"></i> Sửa thông tin</span>';
                } else {
                    statusTag = '';
                }
            } else {
                statusTag = '';
            }
            
            if (rowClass) tr.className = rowClass;

            let nameCell = `<td>${party.name}</td>`;
            let addrCell = `<td>${party.address}</td>`;

            if (showPartyChanges && party.status === 'Sửa thông tin') {
                if (party.prevName && party.prevName !== party.name) {
                    nameCell = `
                        <td class="cell-modified">
                            ${party.name}
                            <div class="popover-container" style="display:inline-block; margin-left: 5px;">
                                <span class="history-trigger-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>
                                <div class="history-popover">Giá trị cũ: ${party.prevName}</div>
                            </div>
                        </td>
                    `;
                    addListSummaryRow('Bên bảo đảm', 'Tên chủ thể', 'Chỉnh sửa', party.prevName, party.name);
                }
                
                if (party.prevAddress && party.prevAddress !== party.address) {
                    addrCell = `
                        <td class="cell-modified">
                            ${party.address}
                            <div class="popover-container" style="display:inline-block; margin-left: 5px;">
                                <span class="history-trigger-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>
                                <div class="history-popover">Giá trị cũ: ${party.prevAddress}</div>
                            </div>
                        </td>
                    `;
                    addListSummaryRow('Bên bảo đảm', 'Địa chỉ chủ thể', 'Chỉnh sửa', party.prevAddress, party.address);
                }
            }

            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${party.typeName}</td>
                <td>${party.paperNo}</td>
                ${nameCell}
                ${addrCell}
                <td>${statusTag}</td>
            `;
            securingPartiesTableBody.appendChild(tr);
        });

        // 5. Bên nhận bảo đảm (Tiêu đề động) GridView
        // Columns: STT, Tên, Địa chỉ, Trạng thái biến động
        securedPartiesTableBody.innerHTML = '';
        currData.securedParties.forEach((party, idx) => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-status', party.status);
            
            let statusTag = '';
            let rowClass = '';
            
            if (showPartyChanges) {
                if (party.status === 'Bổ sung mới') {
                    rowClass = 'row-added';
                    statusTag = '<span class="table-status-tag tag-added"><i class="fa-solid fa-plus"></i> Bổ sung mới</span>';
                    addListSummaryRow(isContract ? 'Bên nhận bảo đảm' : 'Bên nhận bảo đảm', party.name, 'Thêm mới', '-', party.name);
                } else if (party.status === 'Rút bớt') {
                    rowClass = 'row-removed';
                    statusTag = '<span class="table-status-tag tag-removed"><i class="fa-solid fa-minus"></i> Rút bớt</span>';
                    addListSummaryRow(isContract ? 'Bên nhận bảo đảm' : 'Bên nhận bảo đảm', party.name, 'Rút bớt', party.name, '-');
                } else if (party.status === 'Sửa thông tin') {
                    rowClass = 'row-modified';
                    statusTag = '<span class="table-status-tag tag-modified"><i class="fa-solid fa-pen"></i> Sửa thông tin</span>';
                } else {
                    statusTag = '';
                }
            } else {
                statusTag = '';
            }
            
            if (rowClass) tr.className = rowClass;

            let nameCell = `<td>${party.name}</td>`;
            let addrCell = `<td>${party.address}</td>`;

            if (showPartyChanges && party.status === 'Sửa thông tin') {
                if (party.prevName && party.prevName !== party.name) {
                    nameCell = `
                        <td class="cell-modified">
                            ${party.name}
                            <div class="popover-container" style="display:inline-block; margin-left: 5px;">
                                <span class="history-trigger-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>
                                <div class="history-popover">Giá trị cũ: ${party.prevName}</div>
                            </div>
                        </td>
                    `;
                    addListSummaryRow('Bên nhận bảo đảm', 'Tên chủ thể', 'Chỉnh sửa', party.prevName, party.name);
                }
                
                if (party.prevAddress && party.prevAddress !== party.address) {
                    addrCell = `
                        <td class="cell-modified">
                            ${party.address}
                            <div class="popover-container" style="display:inline-block; margin-left: 5px;">
                                <span class="history-trigger-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>
                                <div class="history-popover">Giá trị cũ: ${party.prevAddress}</div>
                            </div>
                        </td>
                    `;
                    addListSummaryRow('Bên nhận bảo đảm', 'Địa chỉ chủ thể', 'Chỉnh sửa', party.prevAddress, party.address);
                }
            }

            tr.innerHTML = `
                <td>${idx + 1}</td>
                ${nameCell}
                ${addrCell}
                <td>${statusTag}</td>
            `;
            securedPartiesTableBody.appendChild(tr);
        });

        // 6. Danh sách tài sản GridView
        const isAuditMode = document.getElementById('assetAuditToggle') && document.getElementById('assetAuditToggle').checked;
        assetsTableBody.innerHTML = '';
        
        if (isAuditMode) {
            // Render Audit Trail of assets
            const assetsTable = document.getElementById('assetsTable');
            if (assetsTable) {
                const thead = assetsTable.querySelector('thead');
                if (thead) {
                    thead.innerHTML = `
                        <tr>
                            <th style="width: 50px; text-align: center;">STT</th>
                            <th>Loại tài sản</th>
                            <th>Tên phương tiện / Tài sản</th>
                            <th>Nhãn hiệu, màu sơn / Mô tả chi tiết</th>
                            <th>Số khung / Số định danh</th>
                            <th>Số máy / Biển số</th>
                            <th>Trạng thái</th>
                            <th>Phiên bản thay đổi</th>
                            <th>Thời điểm thay đổi</th>
                            <th>Nội dung thay đổi</th>
                        </tr>
                    `;
                }
            }

            // Build merged asset list across all versions chronologically up to the current version
            const historyVersions = mockTimelineData
                .filter(v => v.version <= current.version)
                .sort((a, b) => a.version - b.version);

            const trackedAssets = [];

            historyVersions.forEach(ver => {
                if (ver.data && ver.data.assets) {
                    ver.data.assets.forEach(asset => {
                        const existing = trackedAssets.find(ta => {
                            if (asset.frameNo && asset.frameNo !== '-' && ta.frameNo === asset.frameNo) {
                                return true;
                            }
                            return ta.name === asset.name && ta.brandColor === asset.brandColor;
                        });

                        if (existing) {
                            existing.lastVersion = ver.label;
                            existing.lastDate = ver.date;
                            if (asset.status === 'Đã giải chấp' || asset.status === 'Đã hủy' || ver.data.hasDeRegistration || ver.data.hasCancelReg) {
                                existing.status = 'Đã giải chấp / Hủy';
                                existing.changeType = 'Giải chấp';
                            } else if (asset.status === 'Sửa thông tin') {
                                existing.brandColor = asset.brandColor;
                                existing.status = 'Đang bảo đảm';
                                existing.changeType = 'Sửa thông tin';
                            } else {
                                existing.status = 'Đang bảo đảm';
                                existing.changeType = 'Không thay đổi';
                            }
                        } else {
                            let initStatus = 'Đang bảo đảm';
                            let changeType = 'Đăng ký gốc';
                            if (ver.version > 1) {
                                changeType = 'Bổ sung mới';
                            }
                            if (asset.status === 'Đã giải chấp' || asset.status === 'Đã hủy') {
                                initStatus = 'Đã giải chấp / Hủy';
                                changeType = 'Giải chấp';
                            }

                            trackedAssets.push({
                                typeName: asset.typeName,
                                name: asset.name,
                                brandColor: asset.brandColor,
                                frameNo: asset.frameNo,
                                engineNo: asset.engineNo,
                                plateNo: asset.plateNo,
                                status: initStatus,
                                lastVersion: ver.label,
                                lastDate: ver.date,
                                changeType: changeType
                            });
                        }
                    });
                }
            });

            trackedAssets.forEach((asset, idx) => {
                const tr = document.createElement('tr');
                
                let statusHtml = '';
                let rowStyle = '';
                let textStyle = '';

                if (asset.status === 'Đã giải chấp / Hủy') {
                    rowStyle = 'background-color: #FEF2F2; text-decoration: line-through; color: var(--danger-dark);';
                    textStyle = 'color: var(--danger-dark);';
                    statusHtml = `<span class="table-status-tag tag-removed" style="background-color: var(--danger-light); color: var(--danger-dark); border: 1px solid #FCA5A5; font-size:11px; padding:2px 6px; border-radius:4px;"><i class="fa-solid fa-ban"></i> Đã giải chấp / Hủy</span>`;
                } else if (asset.changeType === 'Bổ sung mới') {
                    rowStyle = 'background-color: #F0FDF4;';
                    textStyle = 'color: var(--success-dark);';
                    statusHtml = `<span class="table-status-tag tag-added" style="background-color: var(--success-light); color: var(--success-dark); border: 1px solid #A7F3D0; font-size:11px; padding:2px 6px; border-radius:4px;"><i class="fa-solid fa-plus"></i> Đăng ký bổ sung</span>`;
                } else if (asset.changeType === 'Sửa thông tin') {
                    rowStyle = 'background-color: #FFFDF5;';
                    textStyle = 'color: var(--text-main); font-weight: 600;';
                    statusHtml = `<span class="table-status-tag tag-modified" style="background-color: var(--accent-light); color: var(--accent-dark); border: 1px solid #FDE68A; font-size:11px; padding:2px 6px; border-radius:4px;"><i class="fa-solid fa-pen"></i> Đang bảo đảm (Sửa)</span>`;
                } else {
                    textStyle = 'color: #0F172A;';
                    statusHtml = `<span class="table-status-tag tag-normal" style="background-color: #F1F5F9; color: #334155; border: 1px solid #CBD5E1; font-size:11px; padding:2px 6px; border-radius:4px;">Đang bảo đảm</span>`;
                }

                tr.style.cssText = rowStyle;
                tr.innerHTML = `
                    <td style="text-align: center; ${textStyle}">${idx + 1}</td>
                    <td style="${textStyle}">${asset.typeName || ''}</td>
                    <td style="${textStyle}">${asset.name}</td>
                    <td style="${textStyle}">${asset.brandColor}</td>
                    <td style="${textStyle}"><code>${asset.frameNo || '-'}</code></td>
                    <td style="${textStyle}"><code>${asset.plateNo || '-'}</code></td>
                    <td style="text-align: center;">${statusHtml}</td>
                    <td style="${textStyle}"><b>${asset.lastVersion}</b></td>
                    <td style="${textStyle}">${asset.lastDate}</td>
                    <td style="${textStyle} font-style: italic;">${asset.changeType}</td>
                `;
                assetsTableBody.appendChild(tr);
            });

        } else {
            // Restore standard headers
            const assetsTable = document.getElementById('assetsTable');
            if (assetsTable) {
                const thead = assetsTable.querySelector('thead');
                if (thead) {
                    thead.innerHTML = `
                        <tr>
                            <th style="width: 50px; text-align: center;">STT</th>
                            <th>Loại tài sản</th>
                            <th>Tên phương tiện / Tài sản</th>
                            <th>Nhãn hiệu, màu sơn / Mô tả chi tiết</th>
                            <th>Số khung / Số định danh</th>
                            <th>Số máy / Biển số</th>
                            <th>Trạng thái biến động</th>
                        </tr>
                    `;
                }
            }

            // Show asset changes if selected version has changes or is Xóa/Hủy/Khôi phục/Chỉnh lý
            const showAssetChanges = current.label.includes("Thay đổi") || 
                                    current.label.includes("Xóa") || 
                                    current.label.includes("Hủy") || 
                                    current.label.includes("Khôi phục") || 
                                    current.label.includes("Chỉnh lý");

            currData.assets.forEach((asset, idx) => {
                const tr = document.createElement('tr');
                tr.setAttribute('data-status', asset.status);
                
                let statusTag = '';
                let rowClass = '';
                
                if (showAssetChanges) {
                    if (asset.status === 'Bổ sung mới') {
                        rowClass = 'asset-added';
                        statusTag = '<span class="table-status-tag tag-added"><i class="fa-solid fa-plus"></i> Bổ sung mới</span>';
                        addListSummaryRow('Tài sản bảo đảm', asset.name, 'Thêm mới', '-', `${asset.name} (${asset.brandColor})`);
                    } else if (asset.status === 'Đã giải chấp') {
                        rowClass = 'asset-removed';
                        statusTag = '<span class="table-status-tag tag-removed"><i class="fa-solid fa-minus"></i> Đã giải chấp</span>';
                        addListSummaryRow('Tài sản bảo đảm', asset.name, 'Rút bớt', `${asset.name} (${asset.brandColor})`, '-');
                    } else if (asset.status === 'Đã hủy') {
                        rowClass = 'asset-removed';
                        statusTag = '<span class="table-status-tag tag-removed"><i class="fa-solid fa-ban"></i> Đã hủy</span>';
                        addListSummaryRow('Tài sản bảo đảm', asset.name, 'Rút bớt', `${asset.name} (${asset.brandColor})`, '-');
                    } else if (asset.status === 'Sửa thông tin') {
                        rowClass = 'asset-modified';
                        statusTag = '<span class="table-status-tag tag-modified"><i class="fa-solid fa-pen"></i> Sửa thông tin</span>';
                    } else if (asset.status === 'Đang xử lý') {
                        statusTag = '<span class="table-status-tag tag-processing">Đang xử lý</span>';
                    } else {
                        statusTag = '<span class="table-status-tag tag-normal">Đang bảo đảm</span>';
                    }
                } else {
                    statusTag = '<span class="table-status-tag tag-normal">Đang bảo đảm</span>';
                }
                
                if (rowClass) tr.className = rowClass;

                let nameCell = `<td>${asset.name}</td>`;
                let brandCell = `<td>${asset.brandColor}</td>`;
                let frameCell = `<td>${asset.frameNo}</td>`;
                let enginePlateCell = `<td>Khung/Máy: ${asset.engineNo} / Biển: ${asset.plateNo || 'Chưa đăng ký'}</td>`;
                
                if (showAssetChanges && asset.status === 'Sửa thông tin') {
                    if (asset.prevName && asset.prevName !== asset.name) {
                        nameCell = `
                            <td class="cell-modified">
                                <del style="color: var(--text-muted); font-size:11.5px;">${asset.prevName}</del><br>
                                <strong>${asset.name}</strong>
                            </td>
                        `;
                        addListSummaryRow('Tài sản bảo đảm', 'Tên tài sản', 'Chỉnh sửa', asset.prevName, asset.name);
                    }
                    if (asset.prevBrandColor && asset.prevBrandColor !== asset.brandColor) {
                        brandCell = `
                            <td class="cell-modified">
                                <del style="color: var(--text-muted); font-size:11.5px;">${asset.prevBrandColor}</del><br>
                                <strong>${asset.brandColor}</strong>
                            </td>
                        `;
                        addListSummaryRow('Tài sản bảo đảm', 'Nhãn hiệu, màu sơn', 'Chỉnh sửa', asset.prevBrandColor, asset.brandColor);
                    }
                    if (asset.prevFrameNo && asset.prevFrameNo !== asset.frameNo) {
                        frameCell = `
                            <td class="cell-modified">
                                <del style="color: var(--text-muted); font-size:11.5px;">${asset.prevFrameNo}</del><br>
                                <strong>${asset.frameNo}</strong>
                            </td>
                        `;
                        addListSummaryRow('Tài sản bảo đảm', 'Số khung', 'Chỉnh sửa', asset.prevFrameNo, asset.frameNo);
                    }
                }

                let typeNameCell = '';
                if (asset.typeName && asset.typeName.length > 40) {
                    typeNameCell = `<td title="${asset.typeName}">${asset.typeName.substring(0, 37)}...</td>`;
                } else {
                    typeNameCell = `<td>${asset.typeName || ''}</td>`;
                }

                tr.innerHTML = `
                    <td style="text-align: center;">${idx + 1}</td>
                    ${typeNameCell}
                    ${nameCell}
                    ${brandCell}
                    ${frameCell}
                    ${enginePlateCell}
                    <td style="text-align: center;">${statusTag}</td>
                `;
                assetsTableBody.appendChild(tr);
            });
        }

        // Hide change summary if version is Đăng ký lần đầu (Gốc)
        if (current.version === 1) {
            sectionSummaryOfChanges.style.display = 'none';
        } else {
            sectionSummaryOfChanges.style.display = 'block';
        }

        // If no changes found in change summary
        if (summaryIdx === 1) {
            summaryTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="padding: 15px; text-align: center; color: var(--text-muted); font-style: italic;">
                        Không phát hiện biến động dữ liệu so với phiên bản trước đó.
                    </td>
                </tr>
            `;
        }

        // Re-apply diff filters if checked
        applyDiffFilter();

        // Render dynamic actions
        renderActionButtons();
    }

    // Toggle showing only modified elements
    function applyDiffFilter() {
        const isDiffOnly = diffToggle.checked;

        // 1. Registrant Info
        const registrantFields = sectionRegistrantInfo.querySelectorAll('.info-field');
        let hasRegistrantDiff = false;
        registrantFields.forEach(field => {
            const isMod = field.getAttribute('data-modified') === 'true';
            const isVisible = field.style.display !== 'none';
            if (isDiffOnly) {
                if (isMod && isVisible) {
                    field.style.display = 'flex';
                    hasRegistrantDiff = true;
                } else {
                    field.style.display = 'none';
                }
            } else {
                // Restore visibility
                if (field.id === 'registrantDocField' && !currentSelectedVersion.data.registrantDoc) {
                    field.style.display = 'none';
                } else {
                    field.style.display = 'flex';
                    hasRegistrantDiff = true;
                }
            }
        });
        sectionRegistrantInfo.style.display = (isDiffOnly && !hasRegistrantDiff) ? 'none' : 'block';

        // 2. Reference Info
        const referenceFields = originalReferenceGrid.querySelectorAll('.info-field');
        let hasReferenceDiff = false;
        referenceFields.forEach(field => {
            const isMod = field.getAttribute('data-modified') === 'true';
            const isVisible = field.style.display !== 'none';
            if (isDiffOnly) {
                if (isMod && isVisible) {
                    field.style.display = 'flex';
                    hasReferenceDiff = true;
                } else {
                    field.style.display = 'none';
                }
            } else {
                // Restore visibility based on rules
                const fId = field.id;
                if (fId === 'regNoField' && currentSelectedVersion.version === 1) {
                    field.style.display = 'none';
                } else if ((fId === 'copyRegNoField' || fId === 'copyCountField') && !currentSelectedVersion.title.includes("bản sao")) {
                    field.style.display = 'none';
                } else {
                    field.style.display = 'flex';
                    hasReferenceDiff = true;
                }
            }
        });
        sectionOriginalReference.style.display = (isDiffOnly && !hasReferenceDiff) ? 'none' : 'block';

        // 3. General Info
        const generalFields = generalInfoGrid.querySelectorAll('.info-field');
        let hasGeneralDiff = false;
        generalFields.forEach(field => {
            const isMod = field.getAttribute('data-modified') === 'true';
            const isVisible = field.style.display !== 'none';
            if (isDiffOnly) {
                if (isMod && isVisible) {
                    field.style.display = 'flex';
                    hasGeneralDiff = true;
                } else {
                    field.style.display = 'none';
                }
            } else {
                // Restore visibility based on transaction type
                const fId = field.id;
                const transType = currentSelectedVersion.data.transactionType;
                if (fId === 'measureTypeField') {
                    field.style.display = (transType === 'Biện pháp bảo đảm') ? 'flex' : 'none';
                } else if (fId === 'contractTypeField') {
                    field.style.display = (transType === 'Hợp đồng') ? 'flex' : 'none';
                } else {
                    field.style.display = 'flex';
                    hasGeneralDiff = true;
                }
            }
        });
        sectionGeneralInfo.style.display = (isDiffOnly && !hasGeneralDiff) ? 'none' : 'block';

        // 4. Securing Parties
        const securingRows = securingPartiesTableBody.querySelectorAll('tr');
        let hasSecuringDiff = false;
        securingRows.forEach(row => {
            const status = row.getAttribute('data-status');
            const isChange = status === 'Bổ sung mới' || status === 'Rút bớt' || status === 'Sửa thông tin';
            if (isDiffOnly) {
                if (isChange) {
                    row.style.display = '';
                    hasSecuringDiff = true;
                } else {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = '';
                hasSecuringDiff = true;
            }
        });
        sectionSecuringParties.style.display = (isDiffOnly && !hasSecuringDiff) ? 'none' : 'block';

        // 5. Secured Parties
        const securedRows = securedPartiesTableBody.querySelectorAll('tr');
        let hasSecuredDiff = false;
        securedRows.forEach(row => {
            const status = row.getAttribute('data-status');
            const isChange = status === 'Bổ sung mới' || status === 'Rút bớt' || status === 'Sửa thông tin';
            if (isDiffOnly) {
                if (isChange) {
                    row.style.display = '';
                    hasSecuredDiff = true;
                } else {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = '';
                hasSecuredDiff = true;
            }
        });
        sectionSecuredParties.style.display = (isDiffOnly && !hasSecuredDiff) ? 'none' : 'block';

        // 6. Assets
        const assetRows = assetsTableBody.querySelectorAll('tr');
        let hasAssetDiff = false;
        assetRows.forEach(row => {
            const status = row.getAttribute('data-status');
            const isChange = status === 'Bổ sung mới' || status === 'Đã giải chấp' || status === 'Đã hủy' || status === 'Sửa thông tin';
            if (isDiffOnly) {
                if (isChange) {
                    row.style.display = '';
                    hasAssetDiff = true;
                } else {
                    row.style.display = 'none';
                }
            } else {
                row.style.display = '';
                hasAssetDiff = true;
            }
        });
        sectionAssets.style.display = (isDiffOnly && !hasAssetDiff) ? 'none' : 'block';
    }

    // Set up event listeners
    function setupEventListeners() {
        if (typeof flatpickr !== 'undefined') {
            flatpickr("#filterFromDate", { dateFormat: "d/m/Y", allowInput: true, onChange: () => renderTimeline(false) });
            flatpickr("#filterToDate", { dateFormat: "d/m/Y", allowInput: true, onChange: () => renderTimeline(false) });
        }
        // Toggle Switch
        diffToggle.addEventListener('change', applyDiffFilter);

        // Back to search
        btnBackToSearch.addEventListener('click', function () {
            goBack();
        });

        // Download result documents toast intercept
        document.addEventListener('click', function (e) {
            const pdfBtn = e.target.closest('.btn-download-pdf');
            if (pdfBtn) {
                e.preventDefault();
                const code = pdfBtn.getAttribute('data-code') || 'tailieuhoso';
                showDownloadToast(`Van-ban-ket-qua-${code}.pdf`);
            }
        });

        // PDF click triggers for specialized panels
        btnDownloadDeRegPdf.addEventListener('click', function (e) {
            e.preventDefault();
            const code = btnDownloadDeRegPdf.getAttribute('data-code') || '12345-XD';
            showDownloadToast(`Thong_bao_xoa_dang_ky_${code}.pdf`);
        });

        btnDownloadCancelPdf.addEventListener('click', function (e) {
            e.preventDefault();
            const code = btnDownloadCancelPdf.getAttribute('data-code') || '12345-HD';
            showDownloadToast(`Thong_bao_huy_dang_ky_${code}.pdf`);
        });

        btnDownloadRestorePdf.addEventListener('click', function (e) {
            e.preventDefault();
            const code = btnDownloadRestorePdf.getAttribute('data-code') || '12345-KF';
            showDownloadToast(`Thong_bao_khoi_phuc_${code}.pdf`);
        });

        btnDownloadEditPdf.addEventListener('click', function (e) {
            e.preventDefault();
            const code = btnDownloadEditPdf.getAttribute('data-code') || '12345-CL';
            showDownloadToast(`Thong_bao_chinh_ly_${code}.pdf`);
        });

        // Load More Timeline versions
        btnLoadMoreTimeline.addEventListener('click', function() {
            visibleCount += 10;
            renderTimeline(false);
        });

        // Search Timeline versions
        timelineSearchInput.addEventListener('input', function() {
            renderTimeline(true);
        });

        // Date filter change events
        filterFromDate.addEventListener('input', function() {
            renderTimeline(true);
        });
        filterToDate.addEventListener('input', function() {
            renderTimeline(true);
        });

        // Demo switcher event handlers
        const btnSwitchHistory = document.getElementById('btnSwitchHistory');
        const btnSwitchSingle = document.getElementById('btnSwitchSingle');

        if (isSingleMode) {
            btnSwitchSingle.style.backgroundColor = '#3B82F6';
            btnSwitchHistory.style.backgroundColor = '#4B5563';
        } else {
            btnSwitchHistory.style.backgroundColor = '#3B82F6';
            btnSwitchSingle.style.backgroundColor = '#4B5563';
        }

        btnSwitchHistory.addEventListener('click', function() {
            window.location.search = '?mode=multi';
        });
        btnSwitchSingle.addEventListener('click', function() {
            window.location.search = '?mode=single';
        });
    }

        // Setup listener for asset audit trail toggle
        const assetAuditToggle = document.getElementById('assetAuditToggle');
        if (assetAuditToggle) {
            assetAuditToggle.addEventListener('change', function () {
                if (currentSelectedVersion) {
                    selectVersion(currentSelectedVersion);
                }
            });
        }

        // Render dynamic officer actions
        function renderActionButtons() {
            const container = document.getElementById('action-buttons-container');
            if (!container) return;

            container.innerHTML = '';
            if (!currentSelectedVersion) return;

            // Map mockup statuses for demonstration of the flow
            let status = currentSelectedVersion.statusText || 'Hoàn thành';
            if (currentSelectedVersion.version === 6) {
                status = 'Chờ duyệt';
            } else if (currentSelectedVersion.version === 7) {
                status = 'Duyệt chờ ký';
            } else if (currentSelectedVersion.version === 8) {
                status = 'Chờ ký';
            }

            let buttonsHtml = '';

            if (status === 'Chờ duyệt') {
                buttonsHtml = `
                    <button class="btn-back" style="background-color: var(--success-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-size:13px;" onclick="executeAction('duyet')"><i class="fa fa-check"></i> Duyệt</button>
                    <button class="btn-back" style="background-color: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-left: 8px; font-size:13px;" onclick="executeAction('trinhky')"><i class="fa-solid fa-file-signature"></i> Trình ký</button>
                    <button class="btn-back" style="background-color: var(--danger-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-left: 8px; font-size:13px;" onclick="executeAction('tuchoi')"><i class="fa fa-ban"></i> Từ chối</button>
                    <button class="btn-back" style="margin-left: auto; font-size:13px;" onclick="goBack()"><i class="fa fa-times"></i> Đóng</button>
                `;
            } else if (status === 'Duyệt chờ ký') {
                buttonsHtml = `
                    <button class="btn-back" style="background-color: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-size:13px;" onclick="executeAction('trinhky')"><i class="fa-solid fa-file-signature"></i> Trình ký</button>
                    <button class="btn-back" style="background-color: var(--danger-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-left: 8px; font-size:13px;" onclick="executeAction('tuchoi')"><i class="fa fa-ban"></i> Từ chối</button>
                    <button class="btn-back" style="background-color: #64748B; color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-left: 8px; font-size:13px;" onclick="executeAction('huyduyet')"><i class="fa-solid fa-rotate-left"></i> Hủy duyệt</button>
                    <button class="btn-back" style="margin-left: auto; font-size:13px;" onclick="goBack()"><i class="fa fa-times"></i> Đóng</button>
                `;
            } else if (status === 'Chờ ký') {
                if (currentRole === 'lanhdao') {
                    buttonsHtml = `
                        <button class="btn-back" style="background-color: var(--success-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-size:13px;" onclick="executeAction('kyduyet')"><i class="fa-solid fa-signature"></i> Ký duyệt</button>
                        <button class="btn-back" style="background-color: var(--accent-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-left: 8px; font-size:13px;" onclick="executeAction('tralai')"><i class="fa-solid fa-reply"></i> Trả lại</button>
                        <button class="btn-back" style="background-color: var(--danger-color); color: white; border: none; padding: 8px 16px; border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-left: 8px; font-size:13px;" onclick="executeAction('tuchoi')"><i class="fa fa-ban"></i> Từ chối</button>
                        <button class="btn-back" style="margin-left: auto; font-size:13px;" onclick="goBack()"><i class="fa fa-times"></i> Đóng</button>
                    `;
                } else {
                    buttonsHtml = `
                        <span style="font-size: 13px; color: var(--text-muted); margin-right: auto; font-style: italic;">
                            <i class="fa-solid fa-lock"></i> Hồ sơ ở trạng thái Chờ ký (Chỉ Lãnh đạo mới có quyền ký duyệt)
                        </span>
                        <button class="btn-back" style="font-size:13px;" onclick="goBack()"><i class="fa fa-times"></i> Đóng</button>
                    `;
                }
            } else {
                buttonsHtml = `
                    <button class="btn-back" style="font-size:13px;" onclick="goBack()"><i class="fa fa-times"></i> Đóng</button>
                `;
            }

            container.innerHTML = buttonsHtml;
        }

        // Global functions exposed to window object for click handlers
        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
            }
            document.getElementById('pinError').style.display = 'none';
            document.getElementById('reasonError').style.display = 'none';
        };

        window.switchRoleDemo = function(role) {
            currentRole = role;
            renderActionButtons();
        };

        window.executeAction = function(action) {
            activeAction = action;
            if (action === 'kyduyet') {
                const modal = document.getElementById('modalSign');
                if (modal) {
                    document.getElementById('pinCode').value = '';
                    document.getElementById('pinError').style.display = 'none';
                    modal.classList.add('active');
                }
            } else if (action === 'tuchoi') {
                const modal = document.getElementById('modalReason');
                if (modal) {
                    document.getElementById('reasonTitle').textContent = 'Nhập lý do Từ chối hồ sơ';
                    document.getElementById('reasonLabel').textContent = 'Lý do từ chối cụ thể *';
                    document.getElementById('reasonText').value = '';
                    document.getElementById('reasonError').style.display = 'none';
                    modal.classList.add('active');
                }
            } else if (action === 'tralai') {
                const modal = document.getElementById('modalReason');
                if (modal) {
                    document.getElementById('reasonTitle').textContent = 'Nhập lý do Trả lại hồ sơ';
                    document.getElementById('reasonLabel').textContent = 'Lý do trả lại cụ thể *';
                    document.getElementById('reasonText').value = '';
                    document.getElementById('reasonError').style.display = 'none';
                    modal.classList.add('active');
                }
            } else if (action === 'duyet') {
                if (currentSelectedVersion) {
                    currentSelectedVersion.statusText = 'Duyệt chờ ký';
                    currentVersionTitle.textContent = `${currentSelectedVersion.title} - Trạng thái: Duyệt chờ ký`;
                    renderActionButtons();
                    alert('Đã duyệt hồ sơ thành công! Trạng thái hồ sơ chuyển thành: Duyệt chờ ký.');
                }
            } else if (action === 'trinhky') {
                if (currentSelectedVersion) {
                    currentSelectedVersion.statusText = 'Chờ ký';
                    currentVersionTitle.textContent = `${currentSelectedVersion.title} - Trạng thái: Chờ ký`;
                    renderActionButtons();
                    alert('Đã trình ký hồ sơ thành công! Trạng thái hồ sơ chuyển thành: Chờ ký.');
                }
            } else if (action === 'huyduyet') {
                if (currentSelectedVersion) {
                    currentSelectedVersion.statusText = 'Chờ duyệt';
                    currentVersionTitle.textContent = `${currentSelectedVersion.title} - Trạng thái: Chờ duyệt`;
                    renderActionButtons();
                    alert('Đã hủy duyệt hồ sơ thành công! Trạng thái hồ sơ chuyển thành: Chờ duyệt.');
                }
            }
        };

        window.submitSign = function() {
            const pinCode = document.getElementById('pinCode').value;
            const pinError = document.getElementById('pinError');
            if (pinCode !== '1234') {
                pinError.style.display = 'block';
                return;
            }

            pinError.style.display = 'none';
            closeModal('modalSign');

            if (currentSelectedVersion) {
                currentSelectedVersion.statusText = 'Hoàn thành';
                currentVersionTitle.textContent = `${currentSelectedVersion.title} - Trạng thái: Hoàn thành`;
                renderActionButtons();
                alert('Ký số hồ sơ thành công! Trạng thái chuyển thành: Hoàn thành.');
            }
        };

        window.submitReason = function() {
            const reasonText = document.getElementById('reasonText').value.trim();
            const reasonError = document.getElementById('reasonError');
            if (!reasonText) {
                reasonError.style.display = 'block';
                return;
            }

            reasonError.style.display = 'none';
            closeModal('modalReason');

            if (currentSelectedVersion) {
                const nextStatus = activeAction === 'tuchoi' ? 'Bị từ chối' : 'Bị trả lại';
                currentSelectedVersion.statusText = nextStatus;
                currentVersionTitle.textContent = `${currentSelectedVersion.title} - Trạng thái: ${nextStatus}`;
                
                if (nextStatus === 'Bị từ chối') {
                    sectionRejectionInfo.style.display = 'block';
                    rejectDateVal.textContent = new Date().toLocaleString();
                    rejectReasonVal.textContent = reasonText;
                }

                renderActionButtons();
                alert(`Hồ sơ đã được xử lý thành công! Trạng thái chuyển thành: ${nextStatus}.`);
            }
        };

        window.goBack = function() {
            const prevPage = sessionStorage.getItem('prevCanBoPage');
            if (prevPage && !prevPage.includes('trang_tong_the_website_can_bo.html')) {
                sessionStorage.removeItem('prevCanBoPage');
                window.location.href = prevPage;
            } else {
                const fromParam = urlParams.get('from');
                if (fromParam === 'ky_duyet') {
                    window.location.href = '../UC031/ky_duyet_ho_so.html';
                } else if (fromParam === 'kiem_tra') {
                    window.location.href = '../UC028/kiem_tra_ho_so.html';
                } else {
                    window.location.href = 'tra_cuu_thong_tin.html';
                }
            }
        };

    // Show toast message for mock file download
    function showDownloadToast(filename) {
        toastFilename.textContent = filename;
        downloadToast.classList.add('show');
        
        setTimeout(() => {
            downloadToast.classList.remove('show');
        }, 3000);
    }
});

function goHome() {
    window.location.href = '../UC028/kiem_tra_ho_so.html';
}
