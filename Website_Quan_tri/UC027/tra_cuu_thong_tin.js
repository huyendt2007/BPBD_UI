/**
 * Xử lý logic SPA cho UC027 - Tra cứu thông tin đăng ký (Website Cán bộ)
 * Tích hợp bảng dạng cây (Tree-view), phân trang đầy đủ, bộ lọc nâng cao và dropdown Thao tác khác
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
                type: "Thông báo xử lý tài sản đảm bảo lần đầu",
                guarantor: "Nguyễn Văn A",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Thông báo xử lý tài sản bảo đảm",
                measureContractType: "",
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
                type: "Thông báo xử lý tài sản đảm bảo lần đầu",
                guarantor: "Công ty TNHH Hải Nam",
                securedParty: "Ngân hàng TMCP FPT",
                status: "Hoàn thành",
                transType: "Thông báo xử lý tài sản bảo đảm",
                measureContractType: "",
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
                        transType: "Thông báo xử lý tài sản bảo đảm",
                        measureContractType: "",
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
                        transType: "Thông báo xử lý tài sản bảo đảm",
                        measureContractType: "",
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
    }
];

let canBoFilteredData = [];
let cbCurrentPage = 1;
let cbPageSize = 10;
let cbSortField = '';
let cbSortOrder = 'asc';

// NSD Mockup data (Simple list)
const mockNSD = [
    { id: '1505156435', pin: '5635', type: 'Đăng ký lần đầu', status: 'Hoàn thành', transaction: 'Biện pháp bảo đảm', name: 'Nguyễn Văn A', date: '05/06/2026 09:00' },
    { id: '1505156436', pin: '5636', type: 'Đăng ký lần đầu', status: 'Chờ thanh toán', transaction: 'Biện pháp bảo đảm', name: 'Trần Thị Bình', date: '01/06/2026 08:30' },
    { id: '1505156437', pin: '5637', type: 'Đăng ký lần đầu', status: 'Bị từ chối', transaction: 'Biện pháp bảo đảm', name: 'Phạm Văn Cường', date: '20/05/2026 16:45' }
];

document.addEventListener('DOMContentLoaded', () => {
    // Ẩn Header nếu load trong iframe
    if (window.top !== window.self) {
        const portalHeader = document.getElementById('portalHeader');
        if (portalHeader) portalHeader.style.display = 'none';
        
        // Căn lề padding hợp lý
        document.body.style.padding = '10px';
        const container = document.querySelector('.container');
        if (container) container.style.maxWidth = '100%';
    }

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    // Shift all mock data dates so that the most recent profile is "today"
    let maxDate = null;
    const findMaxDate = (item) => {
        const d = parseDateString(item.date);
        if (d && (!maxDate || d > maxDate)) {
            maxDate = d;
        }
        if (item.children) {
            item.children.forEach(findMaxDate);
        }
    };
    canBoDossiersData.forEach(findMaxDate);
    mockNSD.forEach(findMaxDate);

    if (maxDate) {
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (maxDate < todayStart) {
            const todayWithTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), maxDate.getHours(), maxDate.getMinutes(), maxDate.getSeconds());
            const diffMs = todayWithTime.getTime() - maxDate.getTime();

            const formatDate = (date) => {
                const dd = String(date.getDate()).padStart(2, '0');
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const yyyy = date.getFullYear();
                const hh = String(date.getHours()).padStart(2, '0');
                const min = String(date.getMinutes()).padStart(2, '0');
                return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
            };

            const shiftDateString = (dateStr) => {
                const d = parseDateString(dateStr);
                if (!d) return dateStr;
                const shifted = new Date(d.getTime() + diffMs);
                return formatDate(shifted);
            };

            const shiftItem = (item) => {
                item.date = shiftDateString(item.date);
                if (item.children) {
                    item.children.forEach(shiftItem);
                }
            };
            canBoDossiersData.forEach(shiftItem);
            mockNSD.forEach(shiftItem);
        }
    }

    // Default from date: 30 days ago to show all recent mock profiles
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fromMonth = String(thirtyDaysAgo.getMonth() + 1).padStart(2, '0');
    const fromDay = String(thirtyDaysAgo.getDate()).padStart(2, '0');
    const fromYear = thirtyDaysAgo.getFullYear();
    const fromDateVal = `${fromDay}/${fromMonth}/${fromYear}`;
    const toDateVal = `${day}/${month}/${year}`;
    
    if (typeof flatpickr !== 'undefined') {
        flatpickr("#cb-fromDate", { dateFormat: "d/m/Y", allowInput: true });
        flatpickr("#cb-toDate", { dateFormat: "d/m/Y", allowInput: true });
    }
    
    const fromDateInput = document.getElementById('cb-fromDate');
    const toDateInput = document.getElementById('cb-toDate');
    if (fromDateInput) fromDateInput.value = fromDateVal;
    if (toDateInput) toDateInput.value = toDateVal;

    // Render bảng khách hàng NSD
    renderNSDTable();

    // Khởi tạo bảng Cán bộ với bộ lọc mặc định
    searchCanBo();

    // Event listener click ra ngoài đóng Dropdown
    document.addEventListener('click', (e) => {
        if (!e.target.matches('.dropdown-toggle') && !e.target.closest('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
        }
    });
});

// Chuyển đổi qua lại giữa vai trò (Mockup)
function switchRole(role, element) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + role).classList.add('active');
}

// ----------------------------------------------------
// XỬ LÝ CHO BẢNG NSD (KHÁCH HÀNG)
// ----------------------------------------------------
function renderNSDTable() {
    const tbody = document.getElementById('nsd-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    mockNSD.forEach(item => {
        let badgeClass = 'badge-success';
        let bgStyle = '';
        if (item.status === 'Chờ thanh toán') badgeClass = 'badge-warning';
        else if (item.status === 'Bị từ chối') { badgeClass = 'badge'; bgStyle = 'background: var(--danger-color); color: white;'; }

        tbody.innerHTML += `
            <tr class="data-row">
                <td><span class="action-link" onclick="openDetail('${item.id}')">${item.id}</span></td>
                <td>****</td>
                <td>${item.type}</td>
                <td><span class="badge ${badgeClass}" style="${bgStyle}">${item.status}</span></td>
                <td>${item.transaction}</td>
                <td>${item.name}</td>
                <td>${item.date}</td>
                <td><span class="action-link" onclick="openDetail('${item.id}')">Xem chi tiết</span></td>
            </tr>
        `;
    });
}

// ----------------------------------------------------
// XỬ LÝ LỌC & RENDER BẢNG CÁN BỘ (TREE-VIEW)
// ----------------------------------------------------
function onCbTransTypeChange() {
    const cbTransType = document.getElementById('cb-transType').value;
    const cbMeasureType = document.getElementById('cb-measureType');
    cbMeasureType.innerHTML = '<option value="Tất cả" selected>Tất cả</option>';
    
    if (cbTransType === 'Biện pháp bảo đảm') {
        const options = ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu', 'Đặt cọc', 'Ký cược', 'Ký quỹ'];
        options.forEach(opt => cbMeasureType.innerHTML += `<option value="${opt}">${opt}</option>`);
    } else if (cbTransType === 'Hợp đồng') {
        const options = [
            'Hợp đồng cho thuê tài chính',
            'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên',
            'Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác',
            'Hợp đồng ký gửi'
        ];
        options.forEach(opt => cbMeasureType.innerHTML += `<option value="${opt}">${opt}</option>`);
    }
}

function resetCanBoSearch() {
    document.getElementById('cb-regNum').value = '';
    document.getElementById('cb-guarantor').value = '';
    if (document.getElementById('cb-customerId')) document.getElementById('cb-customerId').value = '';
    document.getElementById('cb-status').value = 'Tất cả';
    document.getElementById('cb-fromDate').value = '';
    document.getElementById('cb-toDate').value = '';
    document.getElementById('cb-regType').value = 'Tất cả';
    document.getElementById('cb-transType').value = 'Tất cả';
    onCbTransTypeChange();
    document.getElementById('cb-assetType').value = 'Tất cả';
    document.getElementById('cb-handlingOfficer').value = 'Tất cả';
    
    canBoFilteredData = [];
    cbCurrentPage = 1;
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
    
    const findAndToggle = (list) => {
        for (let item of list) {
            if (item.id === id) {
                item.expanded = !item.expanded;
                return true;
            }
            if (item.children && item.children.length > 0) {
                if (findAndToggle(item.children)) return true;
            }
        }
        return false;
    };
    
    findAndToggle(canBoDossiersData);
    renderCanBoTable();
}

// Hàm đối sánh chuỗi ngày tháng
function parseDateString(dateStr) {
    if (!dateStr) return null;
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    const parts = dateStr.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts.length > 1 ? parts[1].split(':') : [0,0];
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);
}

// Lọc dữ liệu tìm kiếm
function searchCanBo() {
    const regNum = document.getElementById('cb-regNum').value.trim().toLowerCase();
    const guarantor = document.getElementById('cb-guarantor').value.trim().toLowerCase();
    const customerId = document.getElementById('cb-customerId')?.value.trim().toLowerCase() || '';
    const status = document.getElementById('cb-status').value;
    const fromDateVal = document.getElementById('cb-fromDate').value.trim();
    const toDateVal = document.getElementById('cb-toDate').value.trim();
    const regType = document.getElementById('cb-regType').value;
    const transType = document.getElementById('cb-transType').value;
    const measureType = document.getElementById('cb-measureType').value;
    const assetType = document.getElementById('cb-assetType').value;
    const handlingOfficer = document.getElementById('cb-handlingOfficer').value;

    const fromDateObj = parseDateString(fromDateVal);
    const toDateObj = parseDateString(toDateVal);

    if (fromDateObj && toDateObj && fromDateObj > toDateObj) {
        alert('Lỗi: Từ ngày không được lớn hơn Đến ngày!');
        return;
    }

    canBoFilteredData = canBoDossiersData.filter(parent => {
        const matchChild = (child) => {
            const matchesRegNum = !regNum || child.regNum.toLowerCase().includes(regNum) || child.id.toLowerCase().includes(regNum);
            const matchesGuarantor = !guarantor || child.guarantor.toLowerCase().includes(guarantor);
            const matchesCustomerId = !customerId || (child.customerId && child.customerId.toLowerCase().includes(customerId));
            const matchesStatus = status === 'Tất cả' || child.status === status;
            const matchesRegType = regType === 'Tất cả' || child.type === regType;
            const matchesTransType = transType === 'Tất cả' || child.transType === transType;
            const matchesMeasureType = measureType === 'Tất cả' || child.measureContractType === measureType;
            const matchesAssetType = assetType === 'Tất cả' || child.secAssets.includes(assetType);
            const matchesHandlingOfficer = handlingOfficer === 'Tất cả' || (child.handlingOfficer && child.handlingOfficer === handlingOfficer);
            
            let matchesDate = true;
            const itemDate = parseDateString(child.date);
            if (itemDate) {
                if (fromDateObj && itemDate < fromDateObj) matchesDate = false;
                if (toDateObj) {
                    const endOfToDate = new Date(toDateObj);
                    endOfToDate.setHours(23, 59, 59, 999);
                    if (itemDate > endOfToDate) matchesDate = false;
                }
            }

            return matchesRegNum && matchesGuarantor && matchesCustomerId && matchesStatus && matchesRegType && matchesTransType && matchesMeasureType && matchesAssetType && matchesDate && matchesHandlingOfficer;
        };

        const parentMatches = matchChild(parent);
        
        let childrenMatch = false;
        if (parent.children && parent.children.length > 0) {
            childrenMatch = parent.children.some(child => {
                const childMatch = matchChild(child);
                let grandchildMatch = false;
                if (child.children && child.children.length > 0) {
                    grandchildMatch = child.children.some(gc => matchChild(gc));
                }
                return childMatch || grandchildMatch;
            });
        }

        return parentMatches || childrenMatch;
    });

    cbCurrentPage = 1;
    renderCanBoTable();
}

// Render dữ liệu cây cán bộ
function renderCanBoTable() {
    const tbody = document.getElementById('canbo-table-body');
    if (!tbody) return;

    const isFiltered = document.getElementById('cb-regNum').value ||
        document.getElementById('cb-guarantor').value ||
        document.getElementById('cb-status').value !== 'Tất cả' ||
        document.getElementById('cb-fromDate').value ||
        document.getElementById('cb-toDate').value ||
        document.getElementById('cb-regType').value !== 'Tất cả' ||
        document.getElementById('cb-transType').value !== 'Tất cả' ||
        document.getElementById('cb-measureType').value !== 'Tất cả' ||
        document.getElementById('cb-assetType').value !== 'Tất cả' ||
        document.getElementById('cb-handlingOfficer').value !== 'Tất cả';

    let dataList = isFiltered ? canBoFilteredData : canBoDossiersData;

    // Sắp xếp dữ liệu nếu có trường được chọn
    if (cbSortField) {
        dataList = [...dataList].sort((a, b) => {
            let valA = '';
            let valB = '';
            
            if (cbSortField === 'date') {
                const parseDate = (dStr) => {
                    if (!dStr) return 0;
                    const parts = dStr.trim().split(' ');
                    const dateParts = parts[0].split('/');
                    if (dateParts.length !== 3) return 0;
                    const day = parseInt(dateParts[0], 10);
                    const month = parseInt(dateParts[1], 10) - 1;
                    const year = parseInt(dateParts[2], 10);
                    let h = 0, m = 0;
                    if (parts.length > 1) {
                        const timeParts = parts[1].split(':');
                        h = parseInt(timeParts[0], 10) || 0;
                        m = parseInt(timeParts[1], 10) || 0;
                    }
                    return new Date(year, month, day, h, m).getTime();
                };
                valA = parseDate(a.date);
                valB = parseDate(b.date);
            } else if (cbSortField === 'guarantor') {
                valA = (a.guarantor || '').toLowerCase();
                valB = (b.guarantor || '').toLowerCase();
            } else if (cbSortField === 'mortgagee') {
                valA = (a.securedParty || '').toLowerCase();
                valB = (b.securedParty || '').toLowerCase();
            }
            
            if (valA < valB) return cbSortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return cbSortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    if (dataList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="16" style="text-align:center; color:var(--text-muted); font-style:italic;">Không tìm thấy hồ sơ đăng ký phù hợp với điều kiện tìm kiếm.</td></tr>`;
        document.getElementById('cb-count-display').innerText = `Hiển thị 0-0 của 0 hồ sơ gốc`;
        document.getElementById('cb-pagination').innerHTML = '';
        return;
    }

    const totalRoots = dataList.length;
    const totalPages = Math.ceil(totalRoots / cbPageSize);
    if (cbCurrentPage > totalPages) cbCurrentPage = totalPages || 1;

    const startIndex = (cbCurrentPage - 1) * cbPageSize;
    const endIndex = Math.min(startIndex + cbPageSize, totalRoots);
    const pageRoots = dataList.slice(startIndex, endIndex);

    document.getElementById('cb-count-display').innerText = `Hiển thị ${startIndex + 1}-${endIndex} của ${totalRoots} hồ sơ gốc`;

    // Render nút phân trang
    let pagHtml = '';
    pagHtml += `<button class="page-btn" ${cbCurrentPage === 1 ? 'disabled' : ''} onclick="goToCbPage(1)"><i class="fa fa-angle-double-left"></i></button>`;
    pagHtml += `<button class="page-btn" ${cbCurrentPage === 1 ? 'disabled' : ''} onclick="goToCbPage(${cbCurrentPage - 1})"><i class="fa fa-angle-left"></i></button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        pagHtml += `<button class="page-btn ${i === cbCurrentPage ? 'active' : ''}" onclick="goToCbPage(${i})">${i}</button>`;
    }
    
    pagHtml += `<button class="page-btn" ${cbCurrentPage === totalPages ? 'disabled' : ''} onclick="goToCbPage(${cbCurrentPage + 1})"><i class="fa fa-angle-right"></i></button>`;
    pagHtml += `<button class="page-btn" ${cbCurrentPage === totalPages ? 'disabled' : ''} onclick="goToCbPage(${totalPages})"><i class="fa fa-angle-double-right"></i></button>`;
    
    document.getElementById('cb-pagination').innerHTML = pagHtml;

    let html = '';
    let stt = startIndex + 1;

    // Helper sinh dropdown Thao tác khác tuân thủ quy tắc Fixed-slot
    const getMoreActionsDropdownHtml = (item, parentItem = null, grandparentItem = null) => {
        const isHoanThanh = item.status === 'Hoàn thành';
        
        if (!isHoanThanh) {
            return `
                <div class="dropdown">
                    <button class="btn btn-outline-primary" style="padding: 4px 8px; font-size: 11px; opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Chỉ khả dụng với hồ sơ ở trạng thái Hoàn thành">
                        Thao tác khác <i class="fa fa-caret-down"></i>
                    </button>
                </div>
            `;
        }

        const root = grandparentItem || parentItem || item;
        const getFamilyNodes = (rootNode) => {
            const list = [rootNode];
            if (rootNode.children) {
                rootNode.children.forEach(child => {
                    list.push(child);
                    if (child.children) {
                        child.children.forEach(gc => {
                            list.push(gc);
                        });
                    }
                });
            }
            return list;
        };
        const familyNodes = getFamilyNodes(root);
        const pendingStatuses = ["Chờ thanh toán", "Chờ duyệt", "Duyệt chờ ký", "Sai lệch thanh toán", "Chờ ký"];
        const hasPendingRelated = familyNodes.some(node => {
            if (node.id === item.id) return false;
            const isPending = pendingStatuses.includes(node.status);
            if (!isPending) return false;
            const t = node.type;
            return t.includes("thay đổi") || 
                   t.includes("Xóa") || 
                   t.includes("Hủy") || 
                   t.includes("Thông báo xử lý") || 
                   t.includes("Chỉnh lý");
        });

        const isRoot = item.type === 'Đăng ký lần đầu';
        const isChildNotice = item.type === 'Thông báo xử lý tài sản đảm bảo lần đầu';
        
        const isChangable = [
            'Đăng ký lần đầu', 'Đăng ký thay đổi', 'Xóa đăng ký', 
            'Thông báo xử lý tài sản đảm bảo lần đầu', 
            'Thay đổi thông báo xử lý tài sản bảo đảm', 
            'Xóa đăng ký thông báo xử lý tài sản bảo đảm'
        ].includes(item.type);

        const isLeaf = !item.children || item.children.length === 0;
        
        let isBpbđ = item.transType === 'Biện pháp bảo đảm';
        if (!isBpbđ && parentItem) {
            isBpbđ = parentItem.transType === 'Biện pháp bảo đảm';
        }
        if (!isBpbđ && grandparentItem) {
            isBpbđ = grandparentItem.transType === 'Biện pháp bảo đảm';
        }

        const isHuy = item.type === 'Hủy đăng ký';

        const actionSlots = [
            {
                key: 'change',
                label: 'Đăng ký thay đổi',
                icon: 'fa-solid fa-file-pen',
                enabled: isRoot && !hasPendingRelated,
                tip: !isRoot ? 'Chỉ hiển thị đối với Hồ sơ gốc (Đăng ký lần đầu)' : (hasPendingRelated ? 'Không thể thực hiện do có hồ sơ liên quan đang xử lý' : 'Tạo hồ sơ đăng ký thay đổi'),
                click: `actionClick('${item.regNum}', 'Đăng ký thay đổi')`
            },
            {
                key: 'notice',
                label: 'Thông báo xử lý tài sản',
                icon: 'fa-solid fa-bullhorn',
                enabled: isRoot && !hasPendingRelated,
                tip: !isRoot ? 'Chỉ hiển thị đối với Hồ sơ gốc (Đăng ký lần đầu)' : (hasPendingRelated ? 'Không thể thực hiện do có hồ sơ liên quan đang xử lý' : 'Lập thông báo xử lý tài sản bảo đảm'),
                click: `actionClick('${item.regNum}', 'Thông báo xử lý tài sản')`
            },
            {
                key: 'delete',
                label: 'Xóa đăng ký',
                icon: 'fa-solid fa-file-circle-minus',
                enabled: isRoot && !hasPendingRelated,
                tip: !isRoot ? 'Chỉ hiển thị đối với Hồ sơ gốc (Đăng ký lần đầu)' : (hasPendingRelated ? 'Không thể thực hiện do có hồ sơ liên quan đang xử lý' : 'Lập hồ sơ xóa đăng ký'),
                click: `actionClick('${item.regNum}', 'Xóa đăng ký')`
            },
            {
                key: 'edit_notice',
                label: 'Thay đổi thông báo',
                icon: 'fa-solid fa-pen-to-square',
                enabled: isChildNotice && !hasPendingRelated,
                tip: !isChildNotice ? 'Chỉ hiển thị đối với Yêu cầu Thông báo xử lý tài sản đảm bảo lần đầu (Hồ sơ con)' : (hasPendingRelated ? 'Không thể thực hiện do có hồ sơ liên quan đang xử lý' : 'Lập hồ sơ thay đổi thông báo xử lý tài sản'),
                click: `actionClick('${item.regNum}', 'Thay đổi thông báo')`
            },
            {
                key: 'delete_notice',
                label: 'Xóa thông báo',
                icon: 'fa-solid fa-trash-can',
                enabled: isChildNotice && !hasPendingRelated,
                tip: !isChildNotice ? 'Chỉ hiển thị đối với Yêu cầu Thông báo xử lý tài sản đảm bảo lần đầu (Hồ sơ con)' : (hasPendingRelated ? 'Không thể thực hiện do có hồ sơ liên quan đang xử lý' : 'Lập hồ sơ xóa thông báo xử lý tài sản'),
                click: `actionClick('${item.regNum}', 'Xóa thông báo')`
            },
            {
                key: 'correct',
                label: 'Chỉnh lý thông tin',
                icon: 'fa-solid fa-wrench',
                enabled: isChangable,
                tip: isChangable ? 'Lập hồ sơ chỉnh lý thông tin' : 'Chỉ hiển thị ở các Hồ sơ Đăng ký thay đổi, Đăng ký mới, Xóa đăng ký, Thông báo xử lý tài sản, Thay đổi thông báo, Xóa thông báo',
                click: `actionClick('${item.regNum}', 'Chỉnh lý thông tin')`
            },
            {
                key: 'cancel',
                label: 'Hủy đăng ký',
                icon: 'fa-solid fa-ban',
                enabled: isLeaf && ['Đăng ký lần đầu', 'Đăng ký thay đổi'].includes(item.type) && isBpbđ,
                tip: (isLeaf && ['Đăng ký lần đầu', 'Đăng ký thay đổi'].includes(item.type) && isBpbđ) ? 'Lập hồ sơ hủy đăng ký' : 'Chỉ hiển thị đối với nút lá cuối cùng trên nhánh hồ sơ về Đăng ký biện pháp bảo đảm và thuộc loại Đăng ký lần đầu/Đăng ký thay đổi',
                click: `actionClick('${item.regNum}', 'Hủy đăng ký')`
            },
            {
                key: 'restore',
                label: 'Khôi phục Hủy đăng ký',
                icon: 'fa-solid fa-trash-arrow-up',
                enabled: isHuy,
                tip: isHuy ? 'Lập hồ sơ khôi phục hủy đăng ký' : 'Chỉ hiển thị ở bản ghi Loại Hủy đăng ký ở trạng thái Hoàn thành',
                click: `actionClick('${item.regNum}', 'Khôi phục Hủy đăng ký')`
            }
        ];

        let menuItemsHtml = '';
        let enabledCount = 0;
        actionSlots.forEach(slot => {
            if (slot.enabled) {
                enabledCount++;
                menuItemsHtml += `
                    <a class="dropdown-item" onclick="${slot.click}" title="${slot.tip}">
                        <i class="${slot.icon}"></i> ${slot.label}
                    </a>
                `;
            }
        });

        if (enabledCount === 0) {
            return `
                <div class="dropdown">
                    <button class="btn btn-outline-primary" style="padding: 4px 8px; font-size: 11px; opacity: 0.35; pointer-events: none; cursor: not-allowed;" title="Không có thao tác khả dụng cho hồ sơ này">
                        Thao tác khác <i class="fa fa-caret-down"></i>
                    </button>
                </div>
            `;
        }

        return `
            <div class="dropdown" style="position: relative; display: inline-block;">
                <button class="btn btn-outline-primary dropdown-toggle" style="padding: 4px 8px; font-size: 11px;" onclick="toggleRowDropdown(this, event)">
                    Thao tác khác <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-menu">
                    ${menuItemsHtml}
                </div>
            </div>
        `;
    };

    const formatRegNumForDisplay = (num) => {
        if (!num || num.length < 10) return num;
        return num.substring(0, 3) + '.' + num.substring(3, 6) + '.' + num.substring(6);
    };

    const renderAssetTypeCell = (assetType) => {
        if (!assetType) return '<td>-</td>';
        const list = assetType.split(/[\|\n]|\s+\/\s+/).map(x => x.trim()).filter(Boolean);
        if (list.length === 0) return '<td>-</td>';
        const tooltipText = list.join('\n');
        const displayLines = list.map(item => {
            const truncated = item.length > 30 ? item.substring(0, 30) + '...' : item;
            return `<div class="asset-type-line" style="margin-bottom: 2px;">${truncated}</div>`;
        }).join('');
        return `<td class="asset-type-cell" title="${tooltipText}" style="cursor: help; vertical-align: middle;">${displayLines}</td>`;
    };

    pageRoots.forEach(parent => {
        const hasChildren = parent.children && parent.children.length > 0;
        const toggleHtml = hasChildren
            ? `<span class="tree-toggle ${parent.expanded ? '' : 'collapsed'}" onclick="toggleCbTree('${parent.id}', event)"><i class="fa-solid fa-chevron-down"></i></span>`
            : `<span style="margin-left: 24px;"></span>`;

        html += `
            <tr class="tree-row depth-0">
                <td style="text-align: center;">${toggleHtml} <strong>${stt++}</strong></td>
                <td>${parent.date}</td>
                <td><strong>${formatRegNumForDisplay(parent.regNum)}</strong></td>
                <td><span style="font-family: monospace;">${parent.pin}</span></td>
                <td>${parent.guarantor}</td>
                <td>${parent.securedParty}</td>
                <td>${parent.type}</td>
                <td>${parent.transType || ''}</td>
                <td>${parent.measureContractType || ''}</td>
                ${renderAssetTypeCell(parent.secAssets)}
                <td style="text-align: center;"><span class="status-badge ${parent.status === 'Hoàn thành' ? 'completed' : (parent.status === 'Chờ duyệt' ? 'pending-approval' : (parent.status === 'Chờ thanh toán' ? 'pending-payment' : (parent.status === 'Chờ ký' ? 'approved-pending-signature' : 'rejected')))}">${parent.status}</span></td>
                <td>${parent.requestor || parent.guarantor}</td>
                <td><code>${parent.customerId || ('KH-' + parent.pin)}</code></td>
                <td><strong>${parent.receiptNo || '-'}</strong></td>
                <td>${parent.handlingOfficer || '-'}</td>
                <td style="text-align: center;">
                    <div style="display:flex; gap:5px; justify-content: center; align-items: center;">
                        <button class="btn btn-outline-primary" style="padding: 4px 8px; font-size: 11px;" onclick="openDetail('${parent.regNum}')"><i class="fa-solid fa-eye"></i> Xem</button>
                        ${getMoreActionsDropdownHtml(parent)}
                    </div>
                </td>
            </tr>
        `;

        if (hasChildren && parent.expanded) {
            parent.children.forEach(child => {
                const hasGrandchildren = child.children && child.children.length > 0;
                const childToggleHtml = hasGrandchildren
                    ? `<span class="tree-toggle ${child.expanded ? '' : 'collapsed'}" onclick="toggleCbTree('${child.id}', event)"><i class="fa-solid fa-chevron-down"></i></span>`
                    : `<span style="margin-left: 24px;"></span>`;

                html += `
                    <tr class="tree-row depth-1">
                        <td><span class="tree-indent-line" style="margin-left:12px;">├──</span> ${childToggleHtml}</td>
                        <td>${child.date}</td>
                        <td><span>${formatRegNumForDisplay(child.regNum)}</span></td>
                        <td><span style="font-family: monospace;">${child.pin}</span></td>
                        <td>${child.guarantor}</td>
                        <td>${child.securedParty}</td>
                        <td>${child.type}</td>
                        <td>${child.transType || ''}</td>
                        <td>${child.measureContractType || ''}</td>
                        ${renderAssetTypeCell(child.secAssets)}
                        <td style="text-align: center;"><span class="status-badge ${child.status === 'Hoàn thành' ? 'completed' : (child.status === 'Chờ duyệt' ? 'pending-approval' : (child.status === 'Chờ thanh toán' ? 'pending-payment' : (child.status === 'Chờ ký' ? 'approved-pending-signature' : 'rejected')))}">${child.status}</span></td>
                        <td>${child.requestor || child.guarantor}</td>
                        <td><code>${child.customerId || ('KH-' + child.pin)}</code></td>
                        <td><strong>${child.receiptNo || '-'}</strong></td>
                        <td>${child.handlingOfficer || '-'}</td>
                        <td style="text-align: center;">
                            <div style="display:flex; gap:5px; justify-content: center; align-items: center;">
                                <button class="btn btn-outline-primary" style="padding: 4px 8px; font-size: 11px;" onclick="openDetail('${child.regNum}')"><i class="fa-solid fa-eye"></i> Xem</button>
                                ${getMoreActionsDropdownHtml(child, parent)}
                            </div>
                        </td>
                    </tr>
                `;

                if (hasGrandchildren && child.expanded) {
                    child.children.forEach(gc => {
                        html += `
                            <tr class="tree-row depth-2">
                                <td><span class="tree-indent-line" style="margin-left:36px;">└──</span> <span style="margin-left:24px;"></span></td>
                                <td>${gc.date}</td>
                                <td><span>${formatRegNumForDisplay(gc.regNum)}</span></td>
                                <td><span style="font-family: monospace;">${gc.pin}</span></td>
                                <td>${gc.guarantor}</td>
                                <td>${gc.securedParty}</td>
                                <td>${gc.type}</td>
                                <td>${gc.transType || ''}</td>
                                <td>${gc.measureContractType || ''}</td>
                                ${renderAssetTypeCell(gc.secAssets)}
                                <td style="text-align: center;"><span class="status-badge ${gc.status === 'Hoàn thành' ? 'completed' : (gc.status === 'Chờ duyệt' ? 'pending-approval' : (gc.status === 'Chờ thanh toán' ? 'pending-payment' : (gc.status === 'Chờ ký' ? 'approved-pending-signature' : 'rejected')))}">${gc.status}</span></td>
                                <td>${gc.requestor || gc.guarantor}</td>
                                <td><code>${gc.customerId || ('KH-' + gc.pin)}</code></td>
                                <td><strong>${gc.receiptNo || '-'}</strong></td>
                                <td>${gc.handlingOfficer || '-'}</td>
                                <td style="text-align: center;">
                                    <div style="display:flex; gap:5px; justify-content: center; align-items: center;">
                                        <button class="btn btn-outline-primary" style="padding: 4px 8px; font-size: 11px;" onclick="openDetail('${gc.regNum}')"><i class="fa-solid fa-eye"></i> Xem</button>
                                        ${getMoreActionsDropdownHtml(gc, child, parent)}
                                    </div>
                                </td>
                            </tr>
                        `;
                    });
                }
            });
        }
    });

    tbody.innerHTML = html;
}

// Xử lý mở đóng dropdown thao tác hàng
function toggleRowDropdown(btn, event) {
    if (event) event.stopPropagation();
    
    const dropdownMenu = btn.nextElementSibling;
    const isVisible = dropdownMenu.style.display === 'block';
    
    document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
    
    if (!isVisible) {
        dropdownMenu.style.display = 'block';
    }
}

// Click vào một action trong dropdown
function actionClick(regNum, actionName) {
    alert(`Đã nhận lệnh yêu cầu tác vụ: [${actionName}] cho hồ sơ số đăng ký: ${regNum}. Hệ thống đang khởi tạo giao dịch...`);
}

// Điều hướng xem chi tiết
function openDetail(id) {
    sessionStorage.setItem('prevCanBoPage', window.location.href);
    window.location.href = 'xem_chi_tiet_lich_su_can_bo.html?id=' + id + '&focusId=' + id + '&from=tra_cuu';
}

// Tác vụ Xuất Excel
function exportExcel() {
    alert('Đang kết xuất Excel danh sách kết quả tra cứu hồ sơ cán bộ...');
}

// Quay lại danh sách
function closeDetail() {
    document.getElementById('view-detail').classList.remove('active');
    document.querySelector('.nav-tabs').style.display = 'flex';
    document.getElementById('view-canbo').classList.add('active');
}

window.toggleCbSort = function(field) {
    if (cbSortField === field) {
        cbSortOrder = (cbSortOrder === 'asc') ? 'desc' : 'asc';
    } else {
        cbSortField = field;
        cbSortOrder = 'asc';
    }
    
    // Cập nhật icon sắp xếp trong DOM
    const fields = ['date', 'guarantor', 'mortgagee'];
    fields.forEach(f => {
        const header = document.getElementById(`cb-header-${f}`);
        if (!header) return;
        const icon = header.querySelector('i');
        if (!icon) return;
        
        if (f === cbSortField) {
            icon.className = (cbSortOrder === 'asc') ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
            icon.style.color = '#3B82F6';
        } else {
            icon.className = 'fa-solid fa-sort';
            icon.style.color = '#94A3B8';
        }
    });
    
    cbCurrentPage = 1;
    renderCanBoTable();
};
