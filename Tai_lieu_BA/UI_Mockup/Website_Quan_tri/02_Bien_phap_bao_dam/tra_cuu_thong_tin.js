/**
 * Tra cứu hồ sơ (Website Quản trị - Module Biện pháp bảo đảm): 03 Tab Phiếu đăng ký / Yêu cầu cung cấp thông tin / Yêu cầu cung cấp bản sao
 * Tích hợp bảng dạng cây (Tree-view), phân trang, bộ lọc riêng từng Tab; click dòng để xem chi tiết (chỉ đọc)
 */

// 1. MOCK DATA DẠNG CÂY DỮ LIỆU CÁN BỘ (Bổ sung Số biên lai)
let canBoDossiersData = [
    {
        id: "1",
        regNum: "1505156435",
        pin: "5635",
        date: "05/06/2026 09:00",
        type: "Đăng ký lần đầu",
        guarantor: "Nguyễn Văn A",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Thế chấp",
        secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
        receiptNo: "BL-992011",
        handlingOfficer: "Nguyễn Văn Cán Bộ",
        expanded: true,
        children: [
            {
                id: "1-1",
                regNum: "1505156435-TĐ1",
                pin: "5635-T1",
                date: "05/06/2026 14:30",
                type: "Đăng ký thay đổi",
                guarantor: "Nguyễn Văn A",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Biện pháp bảo đảm",
                measureContractType: "Thế chấp",
                secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                handlingOfficer: "Nguyễn Văn Cán Bộ",
                receiptNo: "BL-992055"
            },
            {
                id: "1-2",
                regNum: "1505156435-TĐ2",
                pin: "5635-T2",
                date: "06/06/2026 10:15",
                type: "Đăng ký thay đổi",
                guarantor: "Nguyễn Văn A",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Chờ duyệt",
                transType: "Biện pháp bảo đảm",
                measureContractType: "Thế chấp",
                secAssets: "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản",
                handlingOfficer: "Nguyễn Văn Cán Bộ",
                receiptNo: ""
            },
            {
                id: "1-3",
                regNum: "1505156435-TBXL",
                pin: "5635-B1",
                date: "05/06/2026 15:30",
                type: "Thông báo xử lý tài sản bảo đảm lần đầu",
                guarantor: "Nguyễn Văn A",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Biện pháp bảo đảm",
                measureContractType: "Thế chấp",
                secAssets: "Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
                handlingOfficer: "Nguyễn Văn Cán Bộ",
                receiptNo: "BL-992100"
            }
        ]
    },
    {
        id: "2",
        regNum: "1505156436",
        pin: "5636",
        date: "01/06/2026 08:30",
        type: "Đăng ký lần đầu",
        guarantor: "Trần Thị Bình",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Chờ thanh toán",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Bảo lưu quyền sở hữu",
        secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
        handlingOfficer: "Lê Anh Tuấn",
        receiptNo: "",
        expanded: false,
        children: []
    },
    {
        id: "3",
        regNum: "1505156437",
        pin: "5637",
        date: "08/06/2026 16:45",
        type: "Đăng ký lần đầu",
        guarantor: "Phạm Văn Cường",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Bị từ chối",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Cầm cố",
        secAssets: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
        handlingOfficer: "Trần Quốc Khánh",
        receiptNo: "",
        expanded: false,
        children: []
    },
    {
        id: "4",
        regNum: "1505156438",
        pin: "5638",
        date: "10/06/2026 11:20",
        type: "Đăng ký lần đầu",
        guarantor: "Công ty TNHH Hải Nam",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Hợp đồng",
        measureContractType: "Hợp đồng cho thuê tài chính",
        secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)\nTài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
        handlingOfficer: "Lê Anh Tuấn",
        receiptNo: "BL-981045",
        expanded: true,
        children: [
            {
                id: "4-1",
                regNum: "1505156438-XÓA",
                pin: "5638-X1",
                date: "12/06/2026 15:30",
                type: "Xóa đăng ký",
                guarantor: "Công ty TNHH Hải Nam",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Hợp đồng",
                measureContractType: "Hợp đồng cho thuê tài chính",
                secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)\nTài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
                handlingOfficer: "Lê Anh Tuấn",
                receiptNo: "BL-982991"
            },
            {
                id: "4-2",
                regNum: "1505156438-TBXL",
                pin: "5638-B1",
                date: "15/06/2026 10:00",
                type: "Thông báo xử lý tài sản bảo đảm lần đầu",
                guarantor: "Công ty TNHH Hải Nam",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Hợp đồng",
                measureContractType: "Hợp đồng cho thuê tài chính",
                secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)\nTài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
                handlingOfficer: "Lê Anh Tuấn",
                receiptNo: "BL-983050",
                expanded: true,
                children: [
                    {
                        id: "4-2-1",
                        regNum: "1505156438-TBXL-TĐ1",
                        pin: "5638-B1-T1",
                        date: "16/06/2026 09:30",
                        type: "Thay đổi thông báo xử lý tài sản bảo đảm",
                        guarantor: "Công ty TNHH Hải Nam",
                        securedParty: "Ngân hàng TMCP FPT",
                        status: "Hoàn thành",
                        transType: "Hợp đồng",
                        measureContractType: "Hợp đồng cho thuê tài chính",
                        secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)\nTài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
                        handlingOfficer: "Lê Anh Tuấn"
                    },
                    {
                        id: "4-2-2",
                        regNum: "1505156438-TBXL-X1",
                        pin: "5638-B1-X1",
                        date: "18/06/2026 14:00",
                        type: "Xóa đăng ký thông báo xử lý tài sản bảo đảm",
                        guarantor: "Công ty TNHH Hải Nam",
                        securedParty: "Ngân hàng TMCP FPT",
                        status: "Chờ duyệt",
                        transType: "Hợp đồng",
                        measureContractType: "Hợp đồng cho thuê tài chính",
                        secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)\nTài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt",
                        handlingOfficer: "Lê Anh Tuấn"
                    }
                ]
            }
        ]
    },
    {
        id: "5",
        regNum: "1505156439",
        pin: "5639",
        date: "20/06/2026 10:00",
        type: "Đăng ký lần đầu",
        guarantor: "Công ty CP Thủy sản miền Nam",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Thế chấp",
        secAssets: "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ",
        handlingOfficer: "Nguyễn Văn Cán Bộ",
        receiptNo: "BL-971034",
        expanded: false,
        children: []
    },
    {
        id: "6",
        regNum: "1505156440",
        pin: "5640",
        date: "21/06/2026 09:30",
        type: "Đăng ký lần đầu",
        guarantor: "Vũ Văn Giang",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Thế chấp",
        secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
        handlingOfficer: "Nguyễn Văn Cán Bộ",
        receiptNo: "BL-964091",
        expanded: true,
        children: [
            {
                id: "6-1",
                regNum: "1505156440-HUY",
                pin: "5640-H1",
                date: "22/06/2026 14:00",
                type: "Hủy đăng ký",
                guarantor: "Vũ Văn Giang",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Biện pháp bảo đảm",
                measureContractType: "Thế chấp",
                secAssets: "Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)",
                handlingOfficer: "Nguyễn Văn Cán Bộ",
                receiptNo: "BL-965002"
            }
        ]
    },
    {
        id: "7",
        regNum: "1505156441",
        pin: "5641",
        date: "23/06/2026 11:20",
        type: "Đăng ký lần đầu",
        guarantor: "Phan Thanh Giản",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Đặt cọc",
        secAssets: "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung",
        handlingOfficer: "Trần Quốc Khánh",
        receiptNo: "BL-951093",
        expanded: true,
        children: [
            {
                id: "7-1",
                regNum: "1505156441-HUY",
                pin: "5641-H1",
                date: "24/06/2026 10:15",
                type: "Hủy đăng ký",
                guarantor: "Phan Thanh Giản",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Biện pháp bảo đảm",
                measureContractType: "Đặt cọc",
                secAssets: "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung",
                handlingOfficer: "Trần Quốc Khánh",
                receiptNo: "BL-951230",
                expanded: true,
                children: [
                    {
                        id: "7-1-1",
                        regNum: "1505156441-KP",
                        pin: "5641-K1",
                        date: "25/06/2026 15:40",
                        type: "Khôi phục hủy đăng ký",
                        guarantor: "Phan Thanh Giản",
                        securedParty: "Ngân hàng TMCP FPT",
                        status: "Hoàn thành",
                        transType: "Biện pháp bảo đảm",
                        measureContractType: "Đặt cọc",
                        secAssets: "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung",
                        handlingOfficer: "Trần Quốc Khánh",
                        receiptNo: "BL-952994"
                    }
                ]
            }
        ]
    },
    {
        id: "8",
        regNum: "1505156442",
        pin: "5642",
        date: "26/06/2026 14:00",
        type: "Đăng ký lần đầu",
        guarantor: "Hoàng Minh Tuấn",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Ký cược",
        secAssets: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
        handlingOfficer: "Nguyễn Văn Cán Bộ",
        receiptNo: "BL-941094",
        expanded: true,
        children: [
            {
                id: "8-1",
                regNum: "1505156442-TĐ1",
                pin: "5642-T1",
                date: "27/06/2026 11:30",
                type: "Đăng ký thay đổi",
                guarantor: "Hoàng Minh Tuấn",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Biện pháp bảo đảm",
                measureContractType: "Ký cược",
                secAssets: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
                handlingOfficer: "Nguyễn Văn Cán Bộ",
                receiptNo: "BL-942881"
            }
        ]
    },
    {
        id: "9",
        regNum: "1505156443",
        pin: "5643",
        date: "28/06/2026 10:00",
        type: "Đăng ký lần đầu",
        guarantor: "Doanh nghiệp Hải Long",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Ký quỹ",
        secAssets: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
        handlingOfficer: "Lê Anh Tuấn",
        receiptNo: "BL-931093",
        expanded: true,
        children: [
            {
                id: "9-1",
                regNum: "1505156443-XD1",
                pin: "5643-X1",
                date: "29/06/2026 16:30",
                type: "Xóa đăng ký",
                guarantor: "Doanh nghiệp Hải Long",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Biện pháp bảo đảm",
                measureContractType: "Ký quỹ",
                secAssets: "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)",
                handlingOfficer: "Lê Anh Tuấn",
                receiptNo: "BL-932881"
            }
        ]
    },
    {
        id: "10",
        regNum: "1505156444",
        pin: "5644",
        date: "30/06/2026 08:30",
        type: "Đăng ký lần đầu",
        guarantor: "Hợp tác xã Nông nghiệp Tiến Phát",
        securedParty: "Ngân hàng TMCP FPT",
        status: "Hoàn thành",
        transType: "Biện pháp bảo đảm",
        measureContractType: "Thế chấp",
        secAssets: "Cây hằng năm, công trình tạm",
        handlingOfficer: "Nguyễn Văn Cán Bộ",
        receiptNo: "BL-921092",
        expanded: false,
        children: []
    },
];

// Nguồn tiếp nhận giả lập của Phiếu đăng ký (hồ sơ liên quan dùng Nguồn tiếp nhận của hồ sơ gốc nếu không có)
const PDK_SOURCE_BY_ROOT = { '1': 'Trực tuyến', '2': 'Dịch vụ công', '3': 'Trực tiếp', '4': 'Trực tuyến', '5': 'Trực tiếp', '6': 'Dịch vụ công', '7': 'Trực tuyến', '8': 'Trực tiếp', '9': 'Trực tuyến', '10': 'Dịch vụ công' };
(function initPdkMock() {
    const walk = (node, root) => {
        node.source = node.source || PDK_SOURCE_BY_ROOT[root.id] || 'Trực tuyến';
        (node.children || []).forEach(c => walk(c, root));
    };
    canBoDossiersData.forEach(r => walk(r, r));
})();

// Loại tài sản và các trường của Khối lọc động / Cột động (giống màn Kiểm tra và xử lý hồ sơ)
const LOOKUP_ASSET_TYPES = [
    { key: 'vehicle', label: 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)', match: /cơ giới đường bộ|xe máy chuyên dùng|số khung/i,
      fields: [['vehicleName', 'Tên phương tiện', 'select'], ['frameNo', 'Số khung'], ['engineNo', 'Số máy'], ['plateNo', 'Biển số']] },
    { key: 'ship', label: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt', match: /tàu cá|đường thủy|đường sắt/i,
      fields: [['shipName', 'Tên phương tiện, nhãn hiệu'], ['shipOwner', 'Tên/Họ tên chủ phương tiện/Chủ sở hữu'], ['shipRegNo', 'Số đăng ký phương tiện'], ['shipIssuer', 'Cơ quan cấp giấy chứng nhận'], ['shipGrade', 'Cấp phương tiện']] },
    { key: 'right', label: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản', match: /quyền tài sản/i,
      fields: [['rightName', 'Tên quyền'], ['rightBasis', 'Căn cứ phát sinh quyền']] },
    { key: 'goods', label: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ', match: /hàng hóa luân chuyển|kho hàng/i,
      fields: [['goodsKind', 'Hàng hóa luân chuyển / Kho hàng', 'goodsSelect'], ['goodsValue', 'Giá trị hàng hóa/Tên, loại hàng hóa'], ['warehouseAddress', 'Địa chỉ kho hàng', 'warehouse'], ['warehouseNo', 'Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng', 'warehouse']] },
    { key: 'securities', label: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung', match: /chứng khoán đã đăng ký tập trung/i,
      fields: [['vsdcTime', 'Thời điểm đăng ký tại VSDC', 'vsdc']] },
    { key: 'crop', label: 'Cây hằng năm, công trình tạm', match: /cây hằng năm|công trình tạm/i, fields: [['description', 'Mô tả']] },
    { key: 'other', label: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)', match: /động sản khác/i, fields: [['description', 'Mô tả']] }
];
const LOOKUP_VEHICLE_NAMES = ['Ô tô con', 'Ô tô tải', 'Mô tô', 'Xe gắn máy', 'Xe máy chuyên dùng'];
const getLookupAssetConfig = key => LOOKUP_ASSET_TYPES.find(a => a.key === key) || null;

// Dữ liệu chi tiết tài sản giả lập theo hồ sơ (phục vụ Khối lọc động và Cột động)
function getPdkAssetDetail(p) {
    if (p.assetDetail) return p.assetDetail;
    const n = parseInt(String(p.regNum).replace(/\D/g, '').slice(-3), 10) || 1;
    p.assetDetail = {
        vehicleName: LOOKUP_VEHICLE_NAMES[n % LOOKUP_VEHICLE_NAMES.length],
        frameNo: 'RLH' + String(100000 + n * 37).slice(-6) + 'VN',
        engineNo: 'ENG-' + String(5000 + n * 13),
        plateNo: `30${String.fromCharCode(65 + (n % 6))}-${String(100 + n).slice(-3)}.${String(10 + (n % 90)).padStart(2, '0')}`,
        shipName: `Tàu cá QN-${9000 + n} - Hyundai Marine`,
        shipOwner: p.guarantor,
        shipRegNo: `QN-${9000 + n}-TS`,
        shipIssuer: 'Chi cục Thủy sản Quảng Ninh',
        shipGrade: n % 2 ? 'VR-SB' : 'VR-SI',
        rightName: 'Quyền đòi nợ phát sinh từ hợp đồng',
        rightBasis: `Hợp đồng số ${100 + n}/HĐ-2026`,
        goodsKind: n % 2 ? 'Kho hàng' : 'Hàng hóa luân chuyển',
        goodsValue: `Hàng tiêu dùng trị giá ${(n % 9 + 1) * 500} triệu đồng`,
        warehouseAddress: n % 2 ? `Kho số ${n % 7 + 1}, KCN Quang Minh, Hà Nội` : '',
        warehouseNo: n % 2 ? `KHO-${String(n).padStart(3, '0')}` : '',
        vsdcTime: `${String(8 + (n % 9)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')} ${String(n % 27 + 1).padStart(2, '0')}/0${n % 9 + 1}/2026`,
        description: `Mô tả tài sản của hồ sơ ${p.regNum}`
    };
    return p.assetDetail;
}

const MSG_EMPTY = 'Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.'; // [MSG-INF-SYS-001]
const MSG_DATE_RANGE = 'Từ ngày không được lớn hơn Đến ngày'; // [MSG-ERR-VAL-007]

let canBoFilteredData = [];
let cbCurrentPage = 1;
let cbPageSize = 20;
let cbSortField = '';
let cbSortOrder = 'desc';
let activeLookupGroup = 'registration';

// Trạng thái Tab Yêu cầu cung cấp thông tin / Yêu cầu cung cấp bản sao
const serviceState = {
    cctt: { prefix: 'ct', filtered: [], page: 1, pageSize: 20, sortOrder: '' },
    copy: { prefix: 'bs', filtered: [], page: 1, pageSize: 20, sortOrder: '' }
};

const pad2 = n => String(n).padStart(2, '0');
const fmtDate = d => `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
const normalizeText = v => String(v || '').trim().toLowerCase();

document.addEventListener('DOMContentLoaded', () => {
    // Ẩn Header nếu load trong iframe
    if (window.top !== window.self) {
        const portalHeader = document.getElementById('portalHeader');
        if (portalHeader) portalHeader.style.display = 'none';
        document.body.style.padding = '10px';
        const container = document.querySelector('.container');
        if (container) container.style.maxWidth = '100%';
    }

    shiftPdkMockDates();
    fillStaticOptions();

    if (typeof flatpickr !== 'undefined') {
        ['cb', 'ct', 'bs'].forEach(p => {
            flatpickr(`#${p}-fromDate`, { dateFormat: 'd/m/Y', allowInput: true });
            flatpickr(`#${p}-toDate`, { dateFormat: 'd/m/Y', allowInput: true });
        });
    }

    setDefaultDates('registration');
    setDefaultDates('cctt');
    setDefaultDates('copy');
    renderCbHeader();

    const restored = restoreLookupState();
    if (!restored) {
        searchCanBo();
        searchService('cctt');
        searchService('copy');
    }
});

// Dời thời điểm đăng ký của dữ liệu giả lập Phiếu đăng ký để hồ sơ mới nhất rơi vào ngày hiện tại
function shiftPdkMockDates() {
    let maxDate = null;
    const findMax = item => {
        const d = parseDateString(item.date);
        if (d && (!maxDate || d > maxDate)) maxDate = d;
        (item.children || []).forEach(findMax);
    };
    canBoDossiersData.forEach(findMax);
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (!maxDate || maxDate >= todayStart) return;
    const diff = new Date(today.getFullYear(), today.getMonth(), today.getDate(), maxDate.getHours(), maxDate.getMinutes()).getTime() - maxDate.getTime();
    const shift = item => {
        const d = parseDateString(item.date);
        if (d) {
            const s = new Date(d.getTime() + diff);
            item.date = `${fmtDate(s)} ${pad2(s.getHours())}:${pad2(s.getMinutes())}`;
        }
        (item.children || []).forEach(shift);
    };
    canBoDossiersData.forEach(shift);
}

function fillStaticOptions() {
    const asset = document.getElementById('cb-assetType');
    LOOKUP_ASSET_TYPES.forEach(a => asset.insertAdjacentHTML('beforeend', `<option value="${a.key}">${a.label}</option>`));
    // Cán bộ xử lý: danh sách Cán bộ thuộc đơn vị của Cán bộ đăng nhập
    const officers = new Set();
    const collect = n => { if (n.handlingOfficer) officers.add(n.handlingOfficer); (n.children || []).forEach(collect); };
    canBoDossiersData.forEach(collect);
    getServiceList('cctt').concat(getServiceList('copy')).forEach(x => { if (x.officer) officers.add(x.officer); });
    const optionsHtml = '<option value="Tất cả" selected>Tất cả</option>' + [...officers].sort().map(o => `<option value="${o}">${o}</option>`).join('');
    document.querySelectorAll('[data-officer-select]').forEach(s => { s.innerHTML = optionsHtml; });
}

// Mặc định: Tab Phiếu đăng ký 3 tháng gần nhất; Tab Yêu cầu cung cấp thông tin / bản sao từ ngày 01 của tháng hiện tại
function setDefaultDates(group) {
    const today = new Date();
    const prefix = group === 'registration' ? 'cb' : serviceState[group].prefix;
    const from = group === 'registration'
        ? new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
        : new Date(today.getFullYear(), today.getMonth(), 1);
    setDateValue(`${prefix}-fromDate`, from);
    setDateValue(`${prefix}-toDate`, today);
}

function setDateValue(id, date) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el._flatpickr) el._flatpickr.setDate(date, false);
    else el.value = fmtDate(date);
    el.style.borderColor = '';
}

// Hàm đối sánh chuỗi ngày tháng
function parseDateString(dateStr) {
    if (!dateStr) return null;
    const parts = String(dateStr).trim().split(' ');
    const dateParts = parts[0].split('/');
    if (dateParts.length !== 3) return null;
    const timeParts = parts.length > 1 ? parts[1].split(':') : [0, 0];
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0] || 0, timeParts[1] || 0);
}

// Kiểm tra Từ ngày <= Đến ngày; trả về khoảng [from, endOfTo] hoặc null nếu không hợp lệ
function readDateRange(prefix) {
    const fromEl = document.getElementById(`${prefix}-fromDate`);
    const toEl = document.getElementById(`${prefix}-toDate`);
    fromEl.style.borderColor = '';
    toEl.style.borderColor = '';
    const from = parseDateString(fromEl.value);
    const to = parseDateString(toEl.value);
    if (from && to && from > to) {
        fromEl.style.borderColor = 'var(--danger-color)';
        toEl.style.borderColor = 'var(--danger-color)';
        showLookupToast(MSG_DATE_RANGE, 'error');
        return null;
    }
    if (to) to.setHours(23, 59, 59, 999);
    return { from, to };
}

function inRange(dateStr, range) {
    const d = parseDateString(dateStr);
    if (!d) return true;
    if (range.from && d < range.from) return false;
    if (range.to && d > range.to) return false;
    return true;
}

function showLookupToast(message, type) {
    let wrap = document.getElementById('lookup-toast');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'lookup-toast';
        wrap.style.cssText = 'position:fixed;top:20px;right:20px;z-index:3000;display:flex;flex-direction:column;gap:8px;';
        document.body.appendChild(wrap);
    }
    const t = document.createElement('div');
    const bg = type === 'error' ? '#FEF2F2' : '#ECFDF5';
    const color = type === 'error' ? '#B91C1C' : '#047857';
    t.style.cssText = `background:${bg};color:${color};border:1px solid ${color}33;padding:10px 14px;border-radius:6px;font-size:13px;font-weight:500;box-shadow:0 4px 10px rgba(0,0,0,.08);`;
    t.textContent = message;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 3500);
}

function getStatusBadge(status) {
    const map = {
        'Hoàn thành': 'completed', 'Chờ duyệt': 'pending-approval', 'Chờ giải quyết': 'pending-approval', 'Chờ thanh toán': 'pending-payment',
        'Duyệt chờ ký': 'approved-pending-signature', 'Chờ ký': 'approved-pending-signature', 'Đã duyệt - chờ trả kết quả': 'approved-pending-signature',
        'Lưu nháp': 'draft', 'Bị trả lại': 'pending-payment', 'Bị từ chối': 'rejected'
    };
    return `<span class="status-badge ${map[status] || 'draft'}">${status}</span>`;
}

// ----------------------------------------------------
// CHỌN TAB NHÓM NGHIỆP VỤ
// ----------------------------------------------------
// Giữ nguyên bộ lọc, kết quả, sắp xếp và trang dữ liệu của từng Tab khi chuyển qua lại giữa các Tab
function switchLookupGroup(group) {
    activeLookupGroup = group;
    document.querySelectorAll('#lookup-type-tabs .nav-tab').forEach(t => t.classList.toggle('active', t.dataset.lookupGroup === group));
    document.querySelectorAll('.lookup-panel').forEach(p => { p.style.display = p.id === `panel-${group}` ? '' : 'none'; });
}

// ----------------------------------------------------
// TAB PHIẾU ĐĂNG KÝ
// ----------------------------------------------------
const PDK_MEASURE_OPTIONS = {
    'Biện pháp bảo đảm': ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu', 'Đặt cọc', 'Ký cược', 'Ký quỹ'],
    'Hợp đồng': ['Hợp đồng cho thuê tài chính', 'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên', 'Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác', 'Hợp đồng ký gửi']
};

function onCbTransTypeChange() {
    const opts = PDK_MEASURE_OPTIONS[document.getElementById('cb-transType').value] || [];
    document.getElementById('cb-measureType').innerHTML = '<option value="Tất cả" selected>Tất cả</option>' + opts.map(o => `<option value="${o}">${o}</option>`).join('');
}

// Chọn Loại tài sản: hiển thị/ẩn Khối lọc động và Cột động
function onCbAssetTypeChange() {
    const cfg = getLookupAssetConfig(document.getElementById('cb-assetType').value);
    const wrap = document.getElementById('cb-dynamic-filter');
    if (!cfg) {
        wrap.hidden = true;
        wrap.innerHTML = '';
    } else {
        wrap.innerHTML = cfg.fields.map(([id, label, kind]) => {
            if (kind === 'select') return `<div class="form-group"><label class="form-label">${label}</label><select class="form-select" id="dyn-${id}"><option value="">Tất cả</option>${LOOKUP_VEHICLE_NAMES.map(v => `<option value="${v}">${v}</option>`).join('')}</select></div>`;
            if (kind === 'goodsSelect') return `<div class="form-group"><label class="form-label">${label}</label><select class="form-select" id="dyn-${id}" onchange="onCbGoodsKindChange()"><option value="">Tất cả</option><option value="Hàng hóa luân chuyển">Hàng hóa luân chuyển</option><option value="Kho hàng">Kho hàng</option></select></div>`;
            if (kind === 'vsdc') return `<div class="form-group"><label class="form-label">${label}</label><input type="text" class="form-control" id="dyn-${id}" placeholder="HH:mm dd/MM/yyyy" autocomplete="off"></div>`;
            return `<div class="form-group dyn-${kind || 'text'}" ${kind === 'warehouse' ? 'style="display:none"' : ''}><label class="form-label">${label}</label><input type="text" class="form-control" id="dyn-${id}" autocomplete="off"></div>`;
        }).join('');
        wrap.hidden = false;
    }
    renderCbHeader();
    renderCanBoTable();
}

// Địa chỉ kho hàng / Số hiệu kho hàng chỉ hiển thị khi chọn "Kho hàng"
function onCbGoodsKindChange() {
    const isWarehouse = document.getElementById('dyn-goodsKind')?.value === 'Kho hàng';
    document.querySelectorAll('#cb-dynamic-filter .dyn-warehouse').forEach(el => {
        el.style.display = isWarehouse ? '' : 'none';
        if (!isWarehouse) { const inp = el.querySelector('input'); if (inp) inp.value = ''; }
    });
    renderCbHeader();
    renderCanBoTable();
}

// Các Cột động đang hiển thị (đúng các trường của Khối lọc động đang hiển thị)
function getCbDynamicColumns() {
    const cfg = getLookupAssetConfig(document.getElementById('cb-assetType').value);
    if (!cfg) return [];
    const isWarehouse = document.getElementById('dyn-goodsKind')?.value === 'Kho hàng';
    return cfg.fields.filter(f => f[2] !== 'warehouse' || isWarehouse).map(f => ({ id: f[0], label: f[1] }));
}

function renderCbHeader() {
    const sortIcon = field => {
        if (cbSortField !== field) return '<i class="fa-solid fa-sort"></i>';
        return `<i class="fa-solid fa-sort-${cbSortOrder === 'asc' ? 'up' : 'down'}"></i>`;
    };
    const sortTh = (field, label) => `<th class="sortable ${cbSortField === field ? 'sorted' : ''}" id="cb-header-${field}" onclick="toggleCbSort('${field}')">${label} ${sortIcon(field)}</th>`;
    const dyn = getCbDynamicColumns().map(c => `<th>${c.label}</th>`).join('');
    document.getElementById('cb-thead-row').innerHTML = `
        <th style="width: 60px; text-align: center;">STT</th>
        ${sortTh('date', 'Thời điểm đăng ký')}
        <th>Số đăng ký</th>
        <th>Mã PIN</th>
        ${sortTh('guarantor', 'Tên bên bảo đảm')}
        ${sortTh('mortgagee', 'Tên bên nhận bảo đảm')}
        <th>Loại đăng ký</th>
        <th>Loại hình GD</th>
        <th>Loại biện pháp / Hợp đồng</th>
        <th>Loại tài sản</th>
        ${dyn}
        <th style="text-align: center;">Trạng thái</th>
        <th>Người yêu cầu</th>
        <th>Mã khách hàng</th>
        <th>Số biên lai</th>
        <th>Nguồn tiếp nhận</th>
        <th>Cán bộ xử lý</th>
`;
}

const CB_TEXT_FILTERS = ['cb-regNum', 'cb-guarantor', 'cb-mortgagee', 'cb-customerId', 'cb-receipt'];
const CB_SELECT_FILTERS = ['cb-source', 'cb-handlingOfficer', 'cb-status', 'cb-regType', 'cb-transType', 'cb-measureType', 'cb-assetType'];

function resetCanBoSearch() {
    CB_TEXT_FILTERS.forEach(id => { document.getElementById(id).value = ''; });
    CB_SELECT_FILTERS.forEach(id => { document.getElementById(id).value = 'Tất cả'; });
    onCbTransTypeChange();
    const wrap = document.getElementById('cb-dynamic-filter');
    wrap.hidden = true;
    wrap.innerHTML = '';
    setDefaultDates('registration');
    cbSortField = '';
    cbSortOrder = 'desc';
    renderCbHeader();
    searchCanBo();
}

function getPdkCustomerId(item) { return item.customerId || ('KH-' + String(item.pin || '').split('-')[0]); }

function searchCanBo(keepPage) {
    const range = readDateRange('cb');
    if (!range) return;
    const v = id => normalizeText(document.getElementById(id).value);
    const sel = id => document.getElementById(id).value;
    const regNum = v('cb-regNum'), guarantor = v('cb-guarantor'), mortgagee = v('cb-mortgagee'), customerId = v('cb-customerId'), receipt = v('cb-receipt');
    const source = sel('cb-source'), officer = sel('cb-handlingOfficer'), status = sel('cb-status'), regType = sel('cb-regType');
    const transType = sel('cb-transType'), measureType = sel('cb-measureType');
    const assetCfg = getLookupAssetConfig(sel('cb-assetType'));
    const dynFilters = getCbDynamicColumns()
        .map(c => ({ id: c.id, value: normalizeText(document.getElementById('dyn-' + c.id)?.value) }))
        .filter(f => f.value);

    const matchNode = n => {
        if (regNum && !normalizeText(n.regNum).includes(regNum)) return false;
        if (guarantor && !normalizeText(n.guarantor).includes(guarantor)) return false;
        if (mortgagee && !normalizeText(n.securedParty).includes(mortgagee)) return false;
        if (customerId && !normalizeText(getPdkCustomerId(n)).includes(customerId)) return false;
        if (receipt && !normalizeText(n.receiptNo).includes(receipt)) return false;
        if (source !== 'Tất cả' && n.source !== source) return false;
        if (officer !== 'Tất cả' && n.handlingOfficer !== officer) return false;
        if (status !== 'Tất cả' && n.status !== status) return false;
        if (regType !== 'Tất cả' && n.type !== regType) return false;
        if (transType !== 'Tất cả' && n.transType !== transType) return false;
        if (measureType !== 'Tất cả' && n.measureContractType !== measureType) return false;
        if (assetCfg && !assetCfg.match.test(n.secAssets || '')) return false;
        if (dynFilters.length) {
            const d = getPdkAssetDetail(n);
            if (!dynFilters.every(f => normalizeText(d[f.id]).includes(f.value))) return false;
        }
        return inRange(n.date, range);
    };
    const matchTree = n => matchNode(n) || (n.children || []).some(matchTree);
    canBoFilteredData = canBoDossiersData.filter(matchTree);
    if (!keepPage) cbCurrentPage = 1;
    renderCanBoTable();
}

function changeCbPageSize() {
    cbPageSize = parseInt(document.getElementById('cb-pageSize').value, 10);
    cbCurrentPage = 1;
    renderCanBoTable();
}

function goToCbPage(page) {
    cbCurrentPage = page;
    renderCanBoTable();
}

// Cây Toggle expand/collapse
function toggleCbTree(id, event) {
    if (event) event.stopPropagation();
    const find = list => {
        for (const item of list) {
            if (item.id === id) { item.expanded = !item.expanded; return true; }
            if (item.children && find(item.children)) return true;
        }
        return false;
    };
    find(canBoDossiersData);
    renderCanBoTable();
}

// Sắp xếp: lần 1 tăng dần, lần 2 giảm dần, lần 3 về mặc định (Thời điểm đăng ký giảm dần); về Trang 1
window.toggleCbSort = function (field) {
    if (cbSortField !== field) { cbSortField = field; cbSortOrder = 'asc'; }
    else if (cbSortOrder === 'asc') cbSortOrder = 'desc';
    else { cbSortField = ''; cbSortOrder = 'desc'; }
    cbCurrentPage = 1;
    renderCbHeader();
    renderCanBoTable();
};

function sortPdkList(list) {
    const field = cbSortField || 'date';
    const order = cbSortField ? cbSortOrder : 'desc';
    const val = x => field === 'date' ? (parseDateString(x.date)?.getTime() || 0) : normalizeText(field === 'guarantor' ? x.guarantor : x.securedParty);
    return [...list].sort((a, b) => {
        const A = val(a), B = val(b);
        if (A < B) return order === 'asc' ? -1 : 1;
        if (A > B) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

function renderPagination(containerId, current, total, goFn) {
    const el = document.getElementById(containerId);
    const pages = Math.max(total, 1);
    const dis = cond => cond ? 'disabled' : '';
    let html = `<button class="page-btn" ${dis(current <= 1 || !total)} onclick="${goFn}(1)"><i class="fa fa-angle-double-left"></i></button>`;
    html += `<button class="page-btn" ${dis(current <= 1 || !total)} onclick="${goFn}(${current - 1})"><i class="fa fa-angle-left"></i></button>`;
    for (let i = 1; i <= pages && total; i++) html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="${goFn}(${i})">${i}</button>`;
    html += `<button class="page-btn" ${dis(current >= pages || !total)} onclick="${goFn}(${current + 1})"><i class="fa fa-angle-right"></i></button>`;
    html += `<button class="page-btn" ${dis(current >= pages || !total)} onclick="${goFn}(${pages})"><i class="fa fa-angle-double-right"></i></button>`;
    el.innerHTML = html;
}

function renderCanBoTable() {
    const tbody = document.getElementById('canbo-table-body');
    if (!tbody) return;
    const dynCols = getCbDynamicColumns();
    const colCount = 16 + dynCols.length;
    const dataList = sortPdkList(canBoFilteredData);
    const exportBtn = document.getElementById('cb-export');

    if (dataList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${colCount}" class="lookup-empty">${MSG_EMPTY}</td></tr>`;
        document.getElementById('cb-count-display').innerText = 'Hiển thị 0-0 trong tổng số 0 bản ghi';
        renderPagination('cb-pagination', 1, 0, 'goToCbPage');
        exportBtn.disabled = true;
        exportBtn.title = 'Không có dữ liệu để kết xuất Excel';
        return;
    }
    exportBtn.disabled = false;
    exportBtn.title = '';

    const totalPages = Math.ceil(dataList.length / cbPageSize);
    if (cbCurrentPage > totalPages) cbCurrentPage = totalPages;
    const start = (cbCurrentPage - 1) * cbPageSize;
    const end = Math.min(start + cbPageSize, dataList.length);
    document.getElementById('cb-count-display').innerText = `Hiển thị ${start + 1}-${end} trong tổng số ${dataList.length} bản ghi`;
    renderPagination('cb-pagination', cbCurrentPage, totalPages, 'goToCbPage');

    const formatRegNum = num => (!num || num.length < 10) ? num : num.substring(0, 3) + '.' + num.substring(3, 6) + '.' + num.substring(6);
    const assetCell = assetType => {
        const list = String(assetType || '').split(/[\|\n]|\s+\/\s+/).map(x => x.trim()).filter(Boolean);
        if (!list.length) return '<td>-</td>';
        const lines = list.map(i => `<div style="margin-bottom:2px;">${i.length > 30 ? i.substring(0, 30) + '...' : i}</div>`).join('');
        return `<td title="${list.join('\n')}" style="cursor: help;">${lines}</td>`;
    };
    const dynCells = n => dynCols.map(c => `<td>${getPdkAssetDetail(n)[c.id] || '-'}</td>`).join('');
    const cells = (n, firstCell, parents) => `
        ${firstCell}
        <td style="white-space: nowrap;">${n.date}</td>
        <td>${parents.length ? formatRegNum(n.regNum) : `<strong>${formatRegNum(n.regNum)}</strong>`}</td>
        <td><span style="font-family: monospace;">${getPinDisplayText(n, !parents.length)}</span></td>
        <td>${n.guarantor}</td>
        <td>${n.securedParty}</td>
        <td>${n.type}</td>
        <td>${n.transType || '-'}</td>
        <td>${n.measureContractType || '-'}</td>
        ${assetCell(n.secAssets)}
        ${dynCells(n)}
        <td style="text-align: center;">${getStatusBadge(n.status)}</td>
        <td>${n.requestor || n.guarantor}</td>
        <td><code>${getPdkCustomerId(n)}</code></td>
        <td><strong>${n.receiptNo || '-'}</strong></td>
        <td>${n.source || '-'}</td>
        <td>${n.handlingOfficer || '-'}</td>`;
    const toggle = n => (n.children && n.children.length)
        ? `<span class="tree-toggle ${n.expanded ? '' : 'collapsed'}" onclick="toggleCbTree('${n.id}', event)"><i class="fa-solid fa-chevron-down"></i></span>`
        : '<span style="margin-left: 24px;"></span>';

    let html = '';
    let stt = start + 1;
    dataList.slice(start, end).forEach(root => {
        html += `<tr class="tree-row depth-0 lookup-row-click" title="Click để xem chi tiết hồ sơ" onclick="openDetail('${root.regNum}')">${cells(root, `<td style="text-align: center;">${toggle(root)} <strong>${stt++}</strong></td>`, [])}</tr>`;
        if (!(root.children && root.children.length && root.expanded)) return;
        root.children.forEach(child => {
            html += `<tr class="tree-row depth-1 lookup-row-click" title="Click để xem chi tiết hồ sơ" onclick="openDetail('${child.regNum}')">${cells(child, `<td><span class="tree-indent-line" style="margin-left:12px;">├──</span> ${toggle(child)}</td>`, [root])}</tr>`;
            if (!(child.children && child.children.length && child.expanded)) return;
            child.children.forEach(gc => {
                html += `<tr class="tree-row depth-2 lookup-row-click" title="Click để xem chi tiết hồ sơ" onclick="openDetail('${gc.regNum}')">${cells(gc, '<td><span class="tree-indent-line" style="margin-left:36px;">└──</span> <span style="margin-left:24px;"></span></td>', [child, root])}</tr>`;
            });
        });
    });
    tbody.innerHTML = html;
}

// Mã PIN chỉ được cấp với hồ sơ Đăng ký lần đầu / Thông báo xử lý tài sản bảo đảm lần đầu (chưa đăng ký BPBĐ)
function getPinDisplayText(item, isRootRow) {
    if (!item) return '-';
    const hasPin = item.type === 'Đăng ký lần đầu' || (item.type === 'Thông báo xử lý tài sản bảo đảm lần đầu' && isRootRow);
    return hasPin ? (item.pin || '-') : '-';
}

// ----------------------------------------------------
// TAB YÊU CẦU CUNG CẤP THÔNG TIN / YÊU CẦU CUNG CẤP BẢN SAO
// ----------------------------------------------------
function getServiceList(group) {
    if (group === 'cctt') return typeof ccttOfficerRequests !== 'undefined' ? ccttOfficerRequests : [];
    return typeof officerCopyRequests !== 'undefined' ? officerCopyRequests : [];
}

// Nguồn tiếp nhận: "Dịch vụ công", "Trực tuyến" hoặc "Trực tiếp"
function getServiceSource(item) {
    const s = normalizeText(item.source);
    if (s.includes('dịch vụ công')) return 'Dịch vụ công';
    if (s.includes('website') || s.includes('trực tuyến')) return 'Trực tuyến';
    return 'Trực tiếp';
}

const SERVICE_FIELDS = {
    cctt: {
        text: [['code', x => x.id], ['requester', x => x.requester], ['customerId', x => x.customerId]],
        select: [['source', x => getServiceSource(x)], ['officer', x => x.officer], ['criteria', x => x.criteria], ['status', x => x.status]]
    },
    copy: {
        text: [['code', x => x.id], ['requester', x => x.requester], ['regNo', x => x.registrationNo], ['customerId', x => x.customerId]],
        select: [['source', x => getServiceSource(x)], ['officer', x => x.officer], ['copyType', x => x.copyType], ['status', x => x.status]]
    }
};

function searchService(group, keepPage) {
    const st = serviceState[group];
    const range = readDateRange(st.prefix);
    if (!range) return;
    const cfg = SERVICE_FIELDS[group];
    const texts = cfg.text.map(([id, get]) => [normalizeText(document.getElementById(`${st.prefix}-${id}`).value), get]).filter(t => t[0]);
    const selects = cfg.select.map(([id, get]) => [document.getElementById(`${st.prefix}-${id}`).value, get]).filter(s => s[0] !== 'Tất cả');
    st.filtered = getServiceList(group).filter(x =>
        texts.every(([v, get]) => normalizeText(get(x)).includes(v)) &&
        selects.every(([v, get]) => get(x) === v) &&
        inRange(x.registeredAt, range));
    if (!keepPage) st.page = 1;
    renderServiceTable(group);
}

function resetServiceSearch(group) {
    const st = serviceState[group];
    const cfg = SERVICE_FIELDS[group];
    cfg.text.forEach(([id]) => { document.getElementById(`${st.prefix}-${id}`).value = ''; });
    cfg.select.forEach(([id]) => { document.getElementById(`${st.prefix}-${id}`).value = 'Tất cả'; });
    setDefaultDates(group);
    st.sortOrder = '';
    updateServiceSortIcon(group);
    searchService(group);
}

function changeServicePageSize(group) {
    const st = serviceState[group];
    st.pageSize = parseInt(document.getElementById(`${st.prefix}-pageSize`).value, 10);
    st.page = 1;
    renderServiceTable(group);
}

function goToServicePage(group, page) {
    serviceState[group].page = page;
    renderServiceTable(group);
}
window.goToCtPage = page => goToServicePage('cctt', page);
window.goToBsPage = page => goToServicePage('copy', page);

// Sắp xếp cột Thời điểm đăng ký: lần 1 tăng dần, lần 2 giảm dần, lần 3 về mặc định (giảm dần)
function toggleServiceSort(group) {
    const st = serviceState[group];
    st.sortOrder = st.sortOrder === '' ? 'asc' : (st.sortOrder === 'asc' ? 'desc' : '');
    st.page = 1;
    updateServiceSortIcon(group);
    renderServiceTable(group);
}

function updateServiceSortIcon(group) {
    const st = serviceState[group];
    const th = document.getElementById(`${st.prefix}-header-date`);
    if (!th) return;
    th.classList.toggle('sorted', !!st.sortOrder);
    th.querySelector('i').className = `fa-solid ${st.sortOrder === 'asc' ? 'fa-sort-up' : (st.sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort')}`;
}

function renderServiceTable(group) {
    const st = serviceState[group];
    const tbody = document.getElementById(`${st.prefix}-table-body`);
    const exportBtn = document.getElementById(`${st.prefix}-export`);
    const goFn = group === 'cctt' ? 'goToCtPage' : 'goToBsPage';
    const order = st.sortOrder || 'desc';
    const list = [...st.filtered].sort((a, b) => {
        const A = parseDateString(a.registeredAt)?.getTime() || 0;
        const B = parseDateString(b.registeredAt)?.getTime() || 0;
        return order === 'asc' ? A - B : B - A;
    });
    if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="11" class="lookup-empty">${MSG_EMPTY}</td></tr>`;
        document.getElementById(`${st.prefix}-count-display`).innerText = 'Hiển thị 0-0 trong tổng số 0 bản ghi';
        renderPagination(`${st.prefix}-pagination`, 1, 0, goFn);
        exportBtn.disabled = true;
        exportBtn.title = 'Không có dữ liệu để kết xuất Excel';
        return;
    }
    exportBtn.disabled = false;
    exportBtn.title = '';
    const totalPages = Math.ceil(list.length / st.pageSize);
    if (st.page > totalPages) st.page = totalPages;
    const start = (st.page - 1) * st.pageSize;
    const end = Math.min(start + st.pageSize, list.length);
    document.getElementById(`${st.prefix}-count-display`).innerText = `Hiển thị ${start + 1}-${end} trong tổng số ${list.length} bản ghi`;
    renderPagination(`${st.prefix}-pagination`, st.page, totalPages, goFn);

    tbody.innerHTML = list.slice(start, end).map((x, i) => {
        const common = `
            <td style="text-align: center;">${start + i + 1}</td>
            <td style="white-space: nowrap;"><strong style="color: var(--primary-color);">${x.id}</strong></td>
            <td style="white-space: nowrap;">${x.registeredAt}</td>
            <td><code>${x.customerId || '-'}</code></td>
            <td>${x.requester}</td>`;
        const tail = `
            <td>${getServiceSource(x)}</td>
            <td>${x.officer || '-'}</td>
            <td style="text-align: center;">${getStatusBadge(x.status)}</td>`;
        const middle = group === 'cctt'
            ? `<td>${x.address || '-'}</td><td>${x.criteria}</td><td>${x.inputData}</td>`
            : `<td>${x.registrationNo || '-'}</td>
               <td style="text-align: center;"><span class="badge ${x.copyType === 'Bản sao giấy' ? 'badge-warning' : 'badge-success'}">${x.copyType}</span></td>
               <td style="text-align: center;">${x.copyType === 'Bản sao giấy' && x.quantity ? x.quantity : '-'}</td>`;
        return `<tr class="lookup-row-click" title="Click để xem chi tiết hồ sơ" onclick="openServiceDetail('${group}', '${x.id}')">${common}${middle}${tail}</tr>`;
    }).join('');
}

// ----------------------------------------------------
// XEM CHI TIẾT / KẾT XUẤT EXCEL / GIỮ TRẠNG THÁI KHI QUAY LẠI
// ----------------------------------------------------
const LOOKUP_STATE_KEY = 'traCuuHoSoState';

function saveLookupState() {
    const values = {};
    document.querySelectorAll('#view-canbo input[id], #view-canbo select[id]').forEach(el => { values[el.id] = el.value; });
    sessionStorage.setItem(LOOKUP_STATE_KEY, JSON.stringify({
        group: activeLookupGroup, values,
        cb: { page: cbCurrentPage, sortField: cbSortField, sortOrder: cbSortOrder },
        cctt: { page: serviceState.cctt.page, sortOrder: serviceState.cctt.sortOrder },
        copy: { page: serviceState.copy.page, sortOrder: serviceState.copy.sortOrder }
    }));
    sessionStorage.setItem('prevCanBoPage', window.location.href);
}

function restoreLookupState() {
    let state = null;
    try { state = JSON.parse(sessionStorage.getItem(LOOKUP_STATE_KEY) || 'null'); } catch (e) { state = null; }
    sessionStorage.removeItem(LOOKUP_STATE_KEY);
    if (!state) return false;
    const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
    set('cb-transType', state.values['cb-transType']);
    onCbTransTypeChange();
    set('cb-assetType', state.values['cb-assetType']);
    onCbAssetTypeChange();
    set('dyn-goodsKind', state.values['dyn-goodsKind']);
    onCbGoodsKindChange();
    Object.keys(state.values).forEach(id => set(id, state.values[id]));
    cbSortField = state.cb.sortField || '';
    cbSortOrder = state.cb.sortOrder || 'desc';
    cbPageSize = parseInt(document.getElementById('cb-pageSize').value, 10);
    renderCbHeader();
    cbCurrentPage = state.cb.page || 1;
    searchCanBo(true);
    ['cctt', 'copy'].forEach(g => {
        const st = serviceState[g];
        st.sortOrder = state[g].sortOrder || '';
        st.pageSize = parseInt(document.getElementById(`${st.prefix}-pageSize`).value, 10);
        st.page = state[g].page || 1;
        updateServiceSortIcon(g);
        searchService(g, true);
    });
    switchLookupGroup(state.group || 'registration');
    return true;
}

// Phiếu đăng ký: màn Xem chi tiết Phiếu đăng ký (focus đúng phiên bản của dòng được chọn)
function openDetail(id) {
    saveLookupState();
    window.location.href = 'xem_chi_tiet_lich_su_can_bo.html?id=' + encodeURIComponent(id) + '&focusId=' + encodeURIComponent(id) + '&from=tra_cuu';
}

// Yêu cầu cung cấp thông tin / bản sao: màn Xem chi tiết tại Kiểm tra và xử lý hồ sơ (chế độ chỉ đọc)
function openServiceDetail(group, id) {
    saveLookupState();
    window.location.href = `kiem_tra_ho_so.html?from=tra_cuu&${group === 'cctt' ? 'openCctt' : 'openCopy'}=${encodeURIComponent(id)}`;
}

function exportExcel(group) {
    const names = { registration: 'Phiếu đăng ký', cctt: 'Yêu cầu cung cấp thông tin', copy: 'Yêu cầu cung cấp bản sao' };
    showLookupToast(`Đang kết xuất Excel danh sách ${names[group]} theo điều kiện lọc...`, 'success');
}

// Màn chi tiết cũ (giữ tương thích)
function closeDetail() {
    document.getElementById('view-detail').classList.remove('active');
    document.getElementById('view-canbo').classList.add('active');
}
function viewHistoryDetails() {}
