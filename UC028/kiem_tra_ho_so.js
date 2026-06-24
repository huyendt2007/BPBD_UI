/**
 * Xử lý logic SPA cho UC028 - Màn hình Xem chi tiết hồ sơ (Three-Pane Layout)
 * Áp dụng tổng quát cho cả 9 loại hồ sơ theo quy chuẩn Design System.
 */

let currentListTab = 'choduyet';
let activeDetailTab = 'nguoidangky'; // Mặc định Tab chi tiết là Người đăng ký & Tham chiếu
let activeLifecycleNode = null;
let currentProfile = null; // Hồ sơ đang xem chi tiết
let showDiffOnly = false; // Bật/tắt chỉ hiển thị biến động

// Mock data chi tiết 12 hồ sơ để kiểm tra đầy đủ 9 loại và có tối thiểu 10 bản ghi trong hệ thống
const mockProfiles = [
    {
        id: 'GDBD-2026-000812',
        date: '28/06/2026 10:30',
        customer: 'Công ty Cổ phần Đầu tư Minh Tâm',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '847291',
        customerId: 'KH-MINHTAM-01',
        receipt: 'BL-991827-01',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '28/06/2026 10:30', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '28/06/2026 10:32', user: 'Hệ thống', action: 'Tự động kiểm soát', comment: 'Khớp nối thành công, không phát hiện rủi ro nghiêm trọng.' },
            { time: '28/06/2026 10:30', user: 'Portal Khách hàng', action: 'Gửi hồ sơ', comment: 'Khách hàng hoàn tất nộp & thanh toán lệ phí trực tuyến.' }
        ]
    },
    {
        id: 'GDBD-2026-000813',
        date: '29/06/2026 14:15',
        customer: 'Ông Nguyễn Văn Hùng',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Cầm cố',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '182749',
        customerId: 'KH-HUNG-02',
        receipt: 'BL-991827-02',
        assetType: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '20/04/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '29/06/2026 14:15', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 14:18', user: 'Hệ thống', action: 'Tự động kiểm soát', comment: 'Phát hiện sửa đổi Số hợp đồng & bổ sung Bên bảo đảm.' },
            { time: '29/06/2026 14:15', user: 'Portal Khách hàng', action: 'Gửi hồ sơ', comment: 'Nộp hồ sơ Đăng ký thay đổi.' }
        ]
    },
    {
        id: 'GDBD-2026-000814',
        date: '30/06/2026 08:30',
        customer: 'Bà Trần Thị Lan',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Bảo lưu quyền sở hữu',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '291830',
        customerId: 'KH-LAN-03',
        receipt: 'BL-991827-03',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '15/04/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 08:30', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 09:00', user: 'Đăng ký viên Nguyễn Văn B', action: 'Phê duyệt', comment: 'Hồ sơ đầy đủ căn cứ pháp lý giải chấp. Chờ trình ký Lãnh đạo.' },
            { time: '30/06/2026 08:32', user: 'Hệ thống', action: 'Tự động kiểm soát', comment: 'Kiểm tra nợ phí: Không phát hiện nợ lệ phí.' }
        ]
    },
    {
        id: 'GDBD-2026-000815',
        date: '30/06/2026 09:45',
        customer: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Yêu cầu cung cấp bản sao',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng cho thuê tài chính',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '102938',
        customerId: 'KH-VCB-04',
        receipt: 'BL-991827-04',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)',
        timeline: [
            { id: 'node-1', title: 'Yêu cầu cung cấp bản sao', date: '30/06/2026 09:45', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 09:47', user: 'Hệ thống', action: 'Kiểm tra phí', comment: 'Lệ phí cung cấp bản sao: 30,000 VND. Trạng thái: Đã thanh toán.' }
        ]
    },
    {
        id: 'GDBD-2026-000816',
        date: '30/06/2026 11:00',
        customer: 'Công ty Luật TNHH Trí Việt',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Yêu cầu cung cấp bản sao kèm thông báo',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng ký gửi',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '908172',
        customerId: 'KH-TRIVIET-05',
        receipt: 'BL-991827-05',
        assetType: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ',
        timeline: [
            { id: 'node-1', title: 'Yêu cầu bản sao + Thông báo', date: '30/06/2026 11:00', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 11:02', user: 'Hệ thống', action: 'Kiểm tra phí', comment: 'Lệ phí yêu cầu: 50,000 VND. Trạng thái: Đã thanh toán.' }
        ]
    },
    {
        id: 'GDBD-2026-000817',
        date: '30/06/2026 14:00',
        customer: 'Ông Phạm Minh Đức',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Yêu cầu cung cấp thông tin',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '283749',
        customerId: 'KH-DUC-06',
        receipt: 'BL-991827-06',
        assetType: 'Cây hằng năm, công trình tạm',
        timeline: [
            { id: 'node-1', title: 'Yêu cầu cung cấp thông tin', date: '30/06/2026 14:00', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 14:02', user: 'Hệ thống', action: 'Kiểm tra phí', comment: 'Lệ phí tra cứu: 30,000 VND. Trạng thái: Đã thanh toán.' }
        ]
    },
    {
        id: 'GDBD-2026-000818',
        date: '30/06/2026 15:30',
        customer: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Thông báo xử lý tài sản',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '482719',
        customerId: 'KH-BIDV-07',
        receipt: 'BL-991827-07',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/01/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '30/06/2026 15:30', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 15:32', user: 'Hệ thống', action: 'Đối soát tài sản', comment: 'Xác định yêu cầu xử lý 1/2 tài sản bảo đảm trong hồ sơ gốc.' }
        ]
    },
    {
        id: 'GDBD-2026-000819',
        date: '30/06/2026 16:15',
        customer: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        type: 'Thay đổi thông báo xử lý tài sản',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '581920',
        customerId: 'KH-TCB-08',
        receipt: 'BL-991827-08',
        assetType: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '05/01/2026 10:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '25/05/2026 15:00', status: 'Hoàn thành', active: false },
            { id: 'node-3', title: 'Thay đổi thông báo xử lý', date: '30/06/2026 16:15', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 16:18', user: 'Hệ thống', action: 'Đối soát thay đổi', comment: 'Phát hiện thay đổi Địa điểm xử lý tài sản sang Hải Phòng.' }
        ]
    },
    {
        id: 'GDBD-2026-000820',
        date: '30/06/2026 17:00',
        customer: 'Ngân hàng TMCP Quân đội (MB Bank)',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Xóa thông báo xử lý tài sản',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '681920',
        customerId: 'KH-MB-09',
        receipt: 'BL-991827-09',
        assetType: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '01/01/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '12/04/2026 11:00', status: 'Hoàn thành', active: false },
            { id: 'node-3', title: 'Xóa thông báo xử lý', date: '30/06/2026 17:00', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:02', user: 'Hệ thống', action: 'Khôi phục trạng thái', comment: 'Thiết lập khôi phục trạng thái bình thường cho các tài sản bảo đảm.' }
        ]
    },
    {
        id: 'GDBD-2026-000821',
        date: '30/06/2026 17:15',
        customer: 'Công ty TNHH Thương mại Dịch vụ An Phát',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '109283',
        customerId: 'KH-ANPHAT-10',
        receipt: 'BL-991827-10',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '30/06/2026 17:15', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:16', user: 'Hệ thống', action: 'Kiểm tra chéo', comment: 'Hồ sơ đầy đủ tính pháp lý.' }
        ]
    },
    {
        id: 'GDBD-2026-000822',
        date: '30/06/2026 17:30',
        customer: 'Công ty Cổ phần Xây dựng Hòa Bình',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác',
        status: 'Bị trả lại',
        statusClass: 'badge-danger',
        pin: '782910',
        customerId: 'KH-HOABINH-11',
        receipt: 'BL-991827-11',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '02/02/2026 09:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '30/06/2026 17:30', status: 'Bị trả lại', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:35', user: 'Lãnh đạo TTĐK', action: 'Trả lại', comment: 'Sai lệch thông tin bên bảo đảm, yêu cầu kiểm tra lại.' },
            { time: '30/06/2026 17:32', user: 'Hệ thống', action: 'Đối soát tự động', comment: 'Thay đổi thông tin Bên bảo đảm.' }
        ]
    },
    {
        id: 'GDBD-2026-000823',
        date: '30/06/2026 17:45',
        customer: 'Tổng Công ty Vận tải Hà Nội',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '901827',
        customerId: 'KH-TRANSPERCO-12',
        receipt: 'BL-991827-12',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/03/2026 08:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 17:45', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:47', user: 'Cán bộ nghiệp vụ TTĐK', action: 'Trình ký', comment: 'Hoàn tất thủ tục trình duyệt giải chấp.' }
        ]
    }
];

// State variables for pagination
let pageSize = 10;
let currentPage = 1;
let filteredProfiles = []; // Store currently filtered records for pagination paging

// Khởi tạo bảng dữ liệu ban đầu kết hợp lọc & phân trang
function renderTable(resetPage = false) {
    if (resetPage) {
        currentPage = 1;
    }

    // 1. Get filter input values
    const filterMakh = document.getElementById('filter-makh').value.toLowerCase().trim();
    const filterTenbbd = document.getElementById('filter-tenbbd').value.toLowerCase().trim();
    const filterTenbnbd = document.getElementById('filter-tenbnbd').value.toLowerCase().trim();
    const filterBienlai = document.getElementById('filter-bienlai').value.toLowerCase().trim();
    const filterTungay = document.getElementById('filter-tungay').value;
    const filterDenngay = document.getElementById('filter-denngay').value;
    const filterLoaidangky = document.getElementById('filter-loaidangky').value;
    const filterLoaihinh = document.getElementById('cb-loaihinh').value;
    const filterSubtype = document.getElementById('cb-loaibienphap').value;
    const filterLoaitaisan = document.getElementById('filter-loaitaisan').value;

    // 2. Determine target status based on current active tab
    let targetStatuses = ['Chờ duyệt'];
    if (currentListTab === 'duyet-choky') targetStatuses = ['Duyệt chờ ký'];
    if (currentListTab === 'choky') targetStatuses = ['Duyệt chờ ký', 'Bị trả lại'];

    // 3. Filter the complete mock profiles array
    filteredProfiles = mockProfiles.filter(p => {
        if (!targetStatuses.includes(p.status)) return false;

        if (filterMakh && !p.customerId.toLowerCase().includes(filterMakh)) return false;
        if (filterTenbbd && !p.customer.toLowerCase().includes(filterTenbbd)) return false;
        if (filterTenbnbd && !p.mortgagee.toLowerCase().includes(filterTenbnbd)) return false;
        if (filterBienlai && !p.receipt.toLowerCase().includes(filterBienlai)) return false;
        
        if (filterTungay) {
            const rowDate = parseDateString(p.date);
            const fromDate = new Date(filterTungay);
            if (rowDate < fromDate) return false;
        }
        if (filterDenngay) {
            const rowDate = parseDateString(p.date);
            const toDate = new Date(filterDenngay);
            toDate.setHours(23, 59, 59, 999);
            if (rowDate > toDate) return false;
        }

        if (filterLoaidangky && p.type !== filterLoaidangky) return false;
        if (filterLoaihinh && p.transactionType !== filterLoaihinh) return false;
        if (filterSubtype && p.subtype !== filterSubtype) return false;
        if (filterLoaitaisan && p.assetType !== filterLoaitaisan) return false;

        return true;
    });

    // 4. Sort records by date in descending order (newest first) by default
    filteredProfiles.sort((a, b) => parseDateString(b.date) - parseDateString(a.date));

    // 5. Render sliced page rows
    executeRender();
}

function executeRender() {
    const tbody = document.getElementById('table-data');
    tbody.innerHTML = '';

    const totalCount = filteredProfiles.length;
    
    if (totalCount === 0) {
        tbody.innerHTML = `<tr><td colspan="15" style="text-align: center; padding: 30px; color: var(--text-muted);"><i>Không có hồ sơ nào ở trạng thái này hoặc phù hợp với điều kiện tìm kiếm.</i></td></tr>`;
        document.getElementById('page-start-index').innerText = '0';
        document.getElementById('page-end-index').innerText = '0';
        document.getElementById('total-records').innerText = '0';
        document.getElementById('pagination-buttons').innerHTML = '';
        return;
    }

    // Determine slice range
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    
    const pageData = filteredProfiles.slice(startIndex, endIndex);

    pageData.forEach((row, index) => {
        tbody.innerHTML += `
            <tr style="cursor: pointer;" onclick="openDetail('${row.id}')">
                <td onclick="event.stopPropagation()"><input type="checkbox" class="row-checkbox" value="${row.id}"></td>
                <td>${startIndex + index + 1}</td>
                <td>${row.date}</td>
                <td><span class="action-link" onclick="event.stopPropagation(); openDetail('${row.id}')">${row.id}</span></td>
                <td><code>${row.pin}</code></td>
                <td><b>${row.customer}</b></td>
                <td>${row.mortgagee}</td>
                <td>${row.type}</td>
                <td>${row.transactionType}</td>
                <td>${row.subtype}</td>
                <td><span class="badge ${row.statusClass}">${row.status}</span></td>
                <td>${row.customerId}</td>
                <td>${row.receipt}</td>
                <td>${row.assetType}</td>
                <td style="text-align: center;" onclick="event.stopPropagation()">
                    <button class="btn btn-outline-primary" style="padding: 4px 8px; font-size: 11px;" onclick="openDetail('${row.id}')"><i class="fa fa-eye"></i> Xem đối soát</button>
                </td>
            </tr>
        `;
    });

    // Update pagination labels
    document.getElementById('page-start-index').innerText = startIndex + 1;
    document.getElementById('page-end-index').innerText = endIndex;
    document.getElementById('total-records').innerText = totalCount;

    // Render pagination buttons
    renderPagination(totalCount);

    document.getElementById('checkAll').checked = false;
}

// Render các nút phân trang
function renderPagination(totalCount) {
    const totalPages = Math.ceil(totalCount / pageSize);
    const container = document.getElementById('pagination-buttons');
    container.innerHTML = '';
    
    if (totalPages <= 1) {
        container.innerHTML = `<button class="btn btn-outline-secondary" disabled style="padding: 4px 10px; font-size: 12px; min-width: 32px; border-radius: 4px;">1</button>`;
        return;
    }
    
    // Nút Trước
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn btn-outline-secondary';
    prevBtn.style.padding = '4px 10px';
    prevBtn.style.fontSize = '12px';
    prevBtn.style.borderRadius = '4px';
    prevBtn.innerText = '◀';
    if (currentPage === 1) prevBtn.disabled = true;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            executeRender();
        }
    };
    container.appendChild(prevBtn);
    
    // Các trang số
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = i === currentPage ? 'btn btn-primary' : 'btn btn-outline-secondary';
        pageBtn.style.padding = '4px 10px';
        pageBtn.style.fontSize = '12px';
        pageBtn.style.borderRadius = '4px';
        pageBtn.innerText = i;
        pageBtn.onclick = () => {
            currentPage = i;
            executeRender();
        };
        container.appendChild(pageBtn);
    }
    
    // Nút Tiếp
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-outline-secondary';
    nextBtn.style.padding = '4px 10px';
    nextBtn.style.fontSize = '12px';
    nextBtn.style.borderRadius = '4px';
    nextBtn.innerText = '▶';
    if (currentPage === totalPages) nextBtn.disabled = true;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            executeRender();
        }
    };
    container.appendChild(nextBtn);
}

function changePageSize(size) {
    pageSize = parseInt(size, 10);
    currentPage = 1;
    executeRender();
}

// Chuyển đổi tab danh sách chính MH01
function switchListTab(tab, element) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    currentListTab = tab;
    
    // Quản lý hiển thị các toolbar và checkbox cột
    if (tab === 'choduyet') {
        document.getElementById('toolbar-choduyet').style.display = 'flex';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'none';
    } else if (tab === 'duyet-choky') {
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'flex';
        document.getElementById('toolbar-choky').style.display = 'none';
    } else {
        // Tab hồ sơ đang xử lý
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'block';
    }
    
    renderTable(true);
}

function searchList() {
    renderTable(true);
}

function parseDateString(dateStr) {
    // format: "dd/mm/yyyy hh:mm"
    const parts = dateStr.split(' ');
    const dmy = parts[0].split('/');
    const hm = parts[1].split(':');
    return new Date(dmy[2], dmy[1] - 1, dmy[0], hm[0], hm[1]);
}

// Xóa bộ lọc MH01
function resetFilters() {
    document.getElementById('filter-makh').value = '';
    document.getElementById('filter-tenbbd').value = '';
    document.getElementById('filter-tenbnbd').value = '';
    document.getElementById('filter-bienlai').value = '';
    document.getElementById('filter-tungay').value = '';
    document.getElementById('filter-denngay').value = '';
    document.getElementById('filter-loaidangky').value = '';
    document.getElementById('cb-loaihinh').value = '';
    document.getElementById('filter-loaitaisan').value = '';
    updateSubTypes();
    renderTable(true);
}

// Cập nhật loại biện pháp theo loại hình
function updateSubTypes() {
    const loaiHinh = document.getElementById('cb-loaihinh').value;
    const subTypeSelect = document.getElementById('cb-loaibienphap');
    subTypeSelect.innerHTML = '<option value="">Tất cả</option>';
    
    if (loaiHinh === 'Biện pháp bảo đảm') {
        const options = ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu', 'Đặt cọc', 'Ký cược', 'Ký quỹ'];
        options.forEach(opt => subTypeSelect.innerHTML += `<option value="${opt}">${opt}</option>`);
    } else if (loaiHinh === 'Hợp đồng') {
        const options = [
            'Hợp đồng cho thuê tài chính',
            'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên',
            'Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác',
            'Hợp đồng ký gửi'
        ];
        options.forEach(opt => subTypeSelect.innerHTML += `<option value="${opt}">${opt}</option>`);
    }
}

// Check/Uncheck tất cả Checkbox
function toggleCheckAll(source) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}

function getSelectedRows() {
    const checked = document.querySelectorAll('.row-checkbox:checked');
    return Array.from(checked).map(cb => cb.value);
}

// ==========================================
// MH02: MÀN HÌNH XEM CHI TIẾT & ĐỐI SOÁT
// ==========================================

// Bật/tắt Chỉ hiển thị vùng dữ liệu có biến động
function toggleDiffOnlyMode(checkbox) {
    showDiffOnly = checkbox.checked;
    renderTabContentsOnly();
}

// Mở màn hình Xem chi tiết hồ sơ
function openDetail(id) {
    currentProfile = mockProfiles.find(p => p.id === id);
    if (!currentProfile) return;
    
    // Reset toggle diff
    showDiffOnly = false;
    document.getElementById('toggle-diff-only').checked = false;
    
    // Kiểm tra có phải Đăng ký thay đổi hoặc có history để hiện Toggle
    const isService = ['Yêu cầu cung cấp bản sao', 'Yêu cầu cung cấp bản sao kèm thông báo', 'Yêu cầu cung cấp thông tin'].includes(currentProfile.type);
    document.getElementById('toggle-diff-container').style.display = (!isService && currentProfile.timeline.length > 1) ? 'flex' : 'none';

    // Gán mã và trạng thái lên tiêu đề
    document.getElementById('detail-id-display').innerText = currentProfile.id;
    const statusBadge = document.getElementById('detail-status');
    statusBadge.innerText = currentProfile.status;
    statusBadge.className = 'badge ' + currentProfile.statusClass;

    // Reset textarea ý kiến cán bộ
    document.getElementById('officerOpinion').value = '';
    document.getElementById('officerOpinion').classList.remove('is-invalid');
    document.getElementById('opinionError').classList.remove('active');

    // Tìm node Timeline đang được active và render dữ liệu Vùng 3
    const activeNode = currentProfile.timeline.find(t => t.active);
    activeLifecycleNode = activeNode ? activeNode.id : currentProfile.timeline[0].id;
    
    // Thiết lập tab mặc định
    activeDetailTab = isService ? 'dichvu' : 'nguoidangky';

    // 1. Render Trục Vòng đời Giao dịch (Vùng 1)
    renderTimeline();

    // 2. Render Nhật ký phê duyệt nội bộ (Vùng 2)
    renderInternalLogs();
    
    // 3. Render nội dung
    renderMainPaneData();

    // 4. Render các nút chức năng thao tác dựa theo trạng thái
    renderDetailActionButtons();

    // Chuyển view
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-detail').classList.add('active');
    window.scrollTo(0, 0);
}

// Render Trục Vòng đời Giao dịch (Vùng 1)
function renderTimeline() {
    const timelineUl = document.getElementById('lifecycle-timeline');
    timelineUl.innerHTML = '';

    currentProfile.timeline.forEach(node => {
        const isActive = (node.id === activeLifecycleNode);
        timelineUl.innerHTML += `
            <li class="timeline-item ${isActive ? 'active' : ''}" data-title="${node.title.toLowerCase()}" data-id="${node.id.toLowerCase()}" onclick="switchTimelineNode('${node.id}')">
                <div class="timeline-title">
                    <span>${node.title}</span>
                    ${isActive ? '<span>▶</span>' : ''}
                </div>
                <div class="timeline-date">${node.date}</div>
                <div class="timeline-desc">
                    Trạng thái: <span class="badge ${node.status === 'Hoàn thành' ? 'badge-success' : 'badge-warning'}">${node.status}</span>
                </div>
            </li>
        `;
    });
    
    // Reset search
    document.getElementById('timelineSearch').value = '';
}

// Tìm kiếm nhanh phiên bản trên trục vòng đời
function filterTimeline(query) {
    const cleanQuery = query.toLowerCase().trim();
    const items = document.querySelectorAll('#lifecycle-timeline .timeline-item');
    
    items.forEach(item => {
        const title = item.getAttribute('data-title');
        const id = item.getAttribute('data-id');
        const text = item.innerText.toLowerCase();
        
        if (text.includes(cleanQuery) || id.includes(cleanQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Xử lý chuyển đổi Node xem lịch sử trên Timeline
function switchTimelineNode(nodeId) {
    activeLifecycleNode = nodeId;
    currentProfile.timeline.forEach(t => t.active = (t.id === nodeId));
    
    const activeNode = currentProfile.timeline.find(t => t.id === nodeId);
    const isService = ['Yêu cầu cung cấp bản sao', 'Yêu cầu cung cấp bản sao kèm thông báo', 'Yêu cầu cung cấp thông tin'].includes(currentProfile.type);
    
    // Cập nhật tab active và ẩn hiện toggle lọc biến động
    if (isService) {
        activeDetailTab = 'dichvu';
        document.getElementById('toggle-diff-container').style.display = 'none';
    } else {
        activeDetailTab = 'nguoidangky';
        document.getElementById('toggle-diff-container').style.display = (activeNode && activeNode.title !== 'Đăng ký lần đầu') ? 'flex' : 'none';
    }
    
    // Reset toggle lọc biến động về false khi đổi node
    showDiffOnly = false;
    document.getElementById('toggle-diff-only').checked = false;

    renderTimeline();
    renderMainPaneData();
}

// Render Nhật ký phê duyệt nội bộ (Vùng 2)
function renderInternalLogs() {
    const logDiv = document.getElementById('internal-log-content');
    logDiv.innerHTML = '';

    currentProfile.internalLogs.forEach(log => {
        logDiv.innerHTML += `
            <div style="border-bottom: 1px dashed var(--border-color); padding: var(--spacing-sm) 0;">
                <div style="display: flex; justify-content: space-between; font-weight: 500;">
                    <span>👤 ${log.user}</span>
                    <span style="color: var(--text-muted); font-size: 10px;">${log.time}</span>
                </div>
                <div style="margin-top: 2px;">Hành động: <b>${log.action}</b></div>
                <div style="color: var(--text-muted); font-style: italic; margin-top: 2px;">Ý kiến: "${log.comment}"</div>
            </div>
        `;
    });
}

// Render các nút thao tác nghiệp vụ của Cán bộ (Vùng IV)
function renderDetailActionButtons() {
    const buttonsContainer = document.getElementById('detail-toolbar-buttons');
    const opinionGroup = document.getElementById('group-officer-opinion');
    buttonsContainer.innerHTML = '';

    const status = currentProfile.status;

    if (status === 'Chờ duyệt') {
        opinionGroup.style.display = 'block';
        document.getElementById('opinion-req-star').style.display = 'none';
        buttonsContainer.innerHTML = `
            <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
            <button class="btn btn-danger" onclick="handleDetailAction('tuchoi')">✖ Từ chối</button>
            <button class="btn btn-success" onclick="handleDetailAction('duyet')">✔ Duyệt</button>
            <button class="btn btn-primary" onclick="handleDetailAction('trinhky')">📝 Trình ký</button>
        `;
    } else if (status === 'Duyệt chờ ký') {
        opinionGroup.style.display = 'block';
        document.getElementById('opinion-req-star').style.display = 'none';
        buttonsContainer.innerHTML = `
            <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
            <button class="btn btn-danger" onclick="handleDetailAction('tuchoi')">✖ Từ chối</button>
            <button class="btn btn-primary" onclick="handleDetailAction('trinhky')">📝 Trình ký</button>
        `;
    } else {
        // Hồ sơ Duyệt chờ ký, Bị trả lại hoặc khác
        opinionGroup.style.display = 'none';
        buttonsContainer.innerHTML = `
            <button class="btn btn-primary" onclick="closeDetail()">Đóng</button>
        `;
    }
}

// Tab switcher của Vùng 3
function switchDetailTab(tabId) {
    activeDetailTab = tabId;
    
    document.querySelectorAll('.detail-tab').forEach(t => {
        t.classList.remove('active');
        if (t.getAttribute('data-tab') === tabId) t.classList.add('active');
    });
    
    renderTabContentsOnly();
}

// Render Tab Control (Vùng 3)
function renderMainPaneData() {
    const tabControls = document.getElementById('tab-controls-container');
    const warningBanner = document.getElementById('full-deregistration-banner');
    
    const activeNode = currentProfile.timeline.find(t => t.id === activeLifecycleNode);
    const nodeTitle = activeNode ? activeNode.title : 'Đăng ký lần đầu';
    
    // Ẩn hiện banner cảnh báo xóa đăng ký toàn bộ
    if (currentProfile.type === 'Xóa đăng ký' && nodeTitle === 'Xóa đăng ký') {
        warningBanner.style.display = 'flex';
    } else {
        warningBanner.style.display = 'none';
    }

    const isService = ['Yêu cầu cung cấp bản sao', 'Yêu cầu cung cấp bản sao kèm thông báo', 'Yêu cầu cung cấp thông tin'].includes(currentProfile.type);

    if (isService) {
        tabControls.style.display = 'none';
        activeDetailTab = 'dichvu';
    } else {
        tabControls.style.display = 'flex';
        
        // Tab list tương thích SRS
        const hasExtraTab = (currentProfile.type === 'Xóa đăng ký' || currentProfile.type.includes('xử lý tài sản')) && (nodeTitle !== 'Đăng ký lần đầu');
        
        tabControls.innerHTML = `
            <div class="detail-tab ${activeDetailTab === 'nguoidangky' ? 'active' : ''}" data-tab="nguoidangky" onclick="switchDetailTab('nguoidangky')">Người đăng ký & Tham chiếu</div>
            <div class="detail-tab ${activeDetailTab === 'thongtinchung' ? 'active' : ''}" data-tab="thongtinchung" onclick="switchDetailTab('thongtinchung')">Thông tin chung & Nghĩa vụ</div>
            <div class="detail-tab ${activeDetailTab === 'cacben' ? 'active' : ''}" data-tab="cacben" onclick="switchDetailTab('cacben')">Các bên liên quan</div>
            <div class="detail-tab ${activeDetailTab === 'danhmactaisan' ? 'active' : ''}" data-tab="danhmactaisan" onclick="switchDetailTab('danhmactaisan')">Danh mục tài sản</div>
            ${hasExtraTab ? `<div class="detail-tab ${activeDetailTab === 'nghiepvukhac' ? 'active' : ''}" data-tab="nghiepvukhac" onclick="switchDetailTab('nghiepvukhac')">N nghiệp vụ lịch sử</div>` : ''}
        `;
    }

    renderTabContentsOnly();
}

// Render nội dung chính các khối thông tin tại Vùng 3
function renderTabContentsOnly() {
    const container = document.getElementById('tab-contents-container');
    container.innerHTML = '';
    
    const activeNode = currentProfile.timeline.find(t => t.id === activeLifecycleNode);
    const nodeTitle = activeNode ? activeNode.title : 'Đăng ký lần đầu';

    const isStrike = (currentProfile.type === 'Xóa đăng ký' && nodeTitle === 'Xóa đăng ký');
    const isDiff = (currentProfile.type === 'Đăng ký thay đổi' || currentProfile.type === 'Thay đổi thông báo xử lý tài sản') && (nodeTitle !== 'Đăng ký lần đầu');

    const styleStrike = isStrike ? 'text-decoration: line-through; color: var(--text-muted); background-color: #FEF2F2;' : '';

    // ==========================================
    // NHÓM DỊCH VỤ THÔNG TIN (Không chia Tab)
    // ==========================================
    if (activeDetailTab === 'dichvu') {
        container.innerHTML = `
            <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                <h3 class="section-title">NỘI DUNG YÊU CẦU CUNG CẤP DỊCH VỤ THÔNG TIN</h3>
                <div class="info-grid">
                    <div class="info-group">
                        <div class="info-label">Người yêu cầu cung cấp thông tin</div>
                        <div class="info-value"><b>${currentProfile.customer}</b></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Loại đối tượng</div>
                        <div class="info-value">Tổ chức/Cá nhân khác</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số giấy tờ định danh</div>
                        <div class="info-value">001092008472</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Địa chỉ liên hệ</div>
                        <div class="info-value">Số 8 Duy Tân, Cầu Giấy, Hà Nội, Việt Nam</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Email liên hệ</div>
                        <div class="info-value">khachhang@gmail.com</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số điện thoại</div>
                        <div class="info-value">0912345678</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số đăng ký lần đầu cần tra cứu/cung cấp</div>
                        <div class="info-value"><b>GDBD-2026-000812</b></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Mã PIN bảo mật hồ sơ gốc</div>
                        <div class="info-value"><code>847291</code></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số lượng bản sao yêu cầu</div>
                        <div class="info-value">02 Bản</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Yêu cầu đính kèm thông báo biến động</div>
                        <div class="info-value">${currentProfile.type === 'Yêu cầu cung cấp bản sao kèm thông báo' ? 'Có' : 'Không'}</div>
                    </div>
                    <div class="info-group" style="grid-column: span 2;">
                        <div class="info-label">Ghi chú yêu cầu</div>
                        <div class="info-value">Cung cấp bản sao để đối soát kiểm tra khoản vay thế chấp.</div>
                    </div>
                </div>
                <div style="background-color: #F1F5F9; border-radius: var(--border-radius-md); padding: 12px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: var(--primary-color);">LỆ PHÍ DỊCH VỤ CÔNG:</span>
                    <span style="font-weight: 700; font-size: 16px; color: var(--success-color);">
                        ${currentProfile.type === 'Yêu cầu cung cấp bản sao kèm thông báo' ? '50,000 VND' : '30,000 VND'} (ĐÃ THANH TOÁN QUA CỔNG DVC)
                    </span>
                </div>
            </div>
        `;
        return;
    }

    // ==========================================
    // NHÓM HỒ SƠ BIỆN PHÁP BẢO ĐẢM (Có Tab)
    // ==========================================

    // TAB 1: Người đăng ký & Tham chiếu
    if (activeDetailTab === 'nguoidangky') {
        const hideUnchanged = (showDiffOnly && isDiff);
        
        container.innerHTML = `
            <!-- Khối 1: Thông tin Người đăng ký -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; margin-bottom: 20px;">
                <h4 style="color: var(--primary-color); margin-top: 0;">Thông tin Người đăng ký (Chỉ đọc)</h4>
                <div class="info-grid" style="${styleStrike}">
                    <div class="info-group">
                        <div class="info-label">Họ và tên/Tên tổ chức</div>
                        <div class="info-value"><b>Công ty Cổ phần Đầu tư Minh Tâm</b></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Loại đối tượng</div>
                        <div class="info-value">Tổ chức trong nước</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số giấy tờ định danh</div>
                        <div class="info-value">0109200847</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Địa chỉ liên hệ</div>
                        <div class="info-value">Số 8 Duy Tân, Cầu Giấy, Hà Nội</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Email liên hệ</div>
                        <div class="info-value">minhtam@invest.vn</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số điện thoại</div>
                        <div class="info-value">0243987291</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Tài liệu chứng minh tư cách pháp nhân</div>
                        <div class="info-value"><a class="action-link" href="#" onclick="alert('Đang mở file Giấy phép ĐKKD...')">📄 Giấy đăng ký kinh doanh.pdf</a></div>
                    </div>
                </div>
            </div>

            <!-- Khối 2: Thông tin tham chiếu hồ sơ gốc -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; border-top: 1px solid var(--border-color); padding-top: 15px; display: ${nodeTitle === 'Đăng ký lần đầu' ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Thông tin tham chiếu hồ sơ gốc</h4>
                <div class="info-grid">
                    <div class="info-group">
                        <div class="info-label">Trường hợp đăng ký</div>
                        <div class="info-value">${currentProfile.type}</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số đăng ký lần đầu (gốc)</div>
                        <div class="info-value"><span class="action-link" onclick="alert('Mở Popup xem chi tiết hồ sơ gốc...')">GDBD-2026-000812</span></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Thời điểm đăng ký lần đầu</div>
                        <div class="info-value">10/01/2026 09:00:00</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Xem văn bản chứng nhận gốc</div>
                        <div class="info-value"><a class="action-link" href="#" onclick="alert('Mở file Giấy chứng nhận gốc...')">📄 GiayChungNhan_Goc.pdf</a></div>
                    </div>
                </div>
            </div>
        `;
    }

    // TAB 2: Thông tin chung & Nghĩa vụ
    else if (activeDetailTab === 'thongtinchung') {
        const isModifiedContract = (currentProfile.id === 'GDBD-2026-000813' && nodeTitle === 'Đăng ký thay đổi');
        const hideContract = showDiffOnly && !isModifiedContract;
        
        container.innerHTML = `
            <div class="info-grid" style="${styleStrike}">
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Cơ quan tiếp nhận</div>
                    <div class="info-value">Trung tâm Đăng ký giao dịch, tài sản tại Hà Nội</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Loại hình giao dịch</div>
                    <div class="info-value">${currentProfile.transactionType}</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Loại biện pháp / Hợp đồng</div>
                    <div class="info-value">${currentProfile.subtype}</div>
                </div>
                
                <div class="info-group ${isModifiedContract ? 'field-changed' : ''}" style="${hideContract ? 'display: none;' : ''}">
                    <div class="info-label">
                        Số hợp đồng bảo đảm
                        ${isModifiedContract ? `<span class="history-icon" onmouseover="showHistoryPopover(event, 'Số hợp đồng cũ: HD-2026-MINHTAM')" onmouseout="hideHistoryPopover()">⏳</span>` : ''}
                    </div>
                    <div class="info-value">
                        ${isModifiedContract ? '<span class="text-diff-old">HD-2026-MINHTAM</span> <span class="text-diff-new">HD-2026-MINHTAM-Sua</span>' : 'HD-2026-MINHTAM'}
                    </div>
                </div>
                
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Ngày hiệu lực hợp đồng</div>
                    <div class="info-value">12/01/2026</div>
                </div>
                
                <div class="info-group ${isModifiedContract ? 'field-changed' : ''}" style="${hideContract ? 'display: none;' : ''}">
                    <div class="info-label">
                        Giá trị nghĩa vụ được bảo đảm
                        ${isModifiedContract ? `<span class="history-icon" onmouseover="showHistoryPopover(event, 'Giá trị cũ: 2,000,000,000 VND')" onmouseout="hideHistoryPopover()">⏳</span>` : ''}
                    </div>
                    <div class="info-value">
                        ${isModifiedContract ? '<span class="text-diff-old">2,000,000,000 VND</span> <span class="text-diff-new">3,500,000,000 VND</span>' : '2,000,000,000 VND'}
                    </div>
                </div>
                
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Quy mô Bên bảo đảm</div>
                    <div class="info-value">Doanh nghiệp vừa và nhỏ</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Chủ doanh nghiệp là nữ</div>
                    <div class="info-value">Không</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Đối tượng miễn phí lệ phí</div>
                    <div class="info-value">Không miễn phí</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Tài liệu đính kèm miễn phí</div>
                    <div class="info-value">-</div>
                </div>
            </div>
        `;
    }

    // TAB 3: Các bên liên quan
    else if (activeDetailTab === 'cacben') {
        const isModifiedBBD = (currentProfile.type === 'Đăng ký thay đổi' && nodeTitle === 'Đăng ký thay đổi');
        const hideBBD = showDiffOnly && !isModifiedBBD;

        container.innerHTML = `
            <!-- Khối 4: Bên bảo đảm -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; margin-bottom: 25px; display: ${hideBBD ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Bảng danh sách Bên bảo đảm</h4>
                <table class="table" style="${styleStrike}">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Loại chủ thể</th>
                            <th>Số giấy tờ định danh</th>
                            <th>Tên bên bảo đảm</th>
                            <th>Địa chỉ liên hệ</th>
                            <th style="width: 150px;">Trạng thái biến động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="${isStrike ? 'row-removed' : ''}">
                            <td>1</td>
                            <td>Tổ chức trong nước</td>
                            <td>0109200847</td>
                            <td><b>Công ty Cổ phần Đầu tư Minh Tâm</b></td>
                            <td>Số 8 Duy Tân, Cầu Giấy, Hà Nội</td>
                            <td><span class="badge badge-muted">Đang bảo đảm</span></td>
                        </tr>
                        ${isModifiedBBD ? `
                        <tr class="row-added">
                            <td>2</td>
                            <td>Cá nhân trong nước</td>
                            <td>001092008472</td>
                            <td><b>Trần Thị B (Thành viên liên kết)</b></td>
                            <td>Hà Đông, Hà Nội, Việt Nam</td>
                            <td><span class="badge badge-success">Bổ sung mới</span></td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>

            <!-- Khối 5: Bên nhận bảo đảm -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; display: ${showDiffOnly ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Bảng danh sách Bên nhận bảo đảm</h4>
                <table class="table" style="${styleStrike}">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Loại chủ thể</th>
                            <th>Số giấy tờ định danh</th>
                            <th>Tên đơn vị nhận thế chấp</th>
                            <th>Địa chỉ liên hệ</th>
                            <th style="width: 150px;">Trạng thái biến động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="${isStrike ? 'row-removed' : ''}">
                            <td>1</td>
                            <td>Tổ chức tín dụng trong nước</td>
                            <td>0100230812</td>
                            <td><b>Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)</b></td>
                            <td>Tháp BIDV, Hoàn Kiếm, Hà Nội</td>
                            <td><span class="badge badge-muted">Đang bảo đảm</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    // TAB 4: Danh mục tài sản
    else if (activeDetailTab === 'danhmactaisan') {
        const isDisposal = (currentProfile.type === 'Thông báo xử lý tài sản' && nodeTitle === 'Thông báo xử lý tài sản');
        const isCancelDisposal = (currentProfile.type === 'Xóa thông báo xử lý tài sản' && nodeTitle === 'Xóa thông báo xử lý');
        const isModifiedAsset = (currentProfile.type === 'Đăng ký thay đổi' && nodeTitle === 'Đăng ký thay đổi');
        
        const hideAssetTable = showDiffOnly && !isModifiedAsset && !isDisposal && !isCancelDisposal;

        container.innerHTML = `
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; display: ${hideAssetTable ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Bảng danh sách tài sản bảo đảm</h4>
                <table class="table" style="${styleStrike}">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Loại tài sản</th>
                            <th>Số máy / Số định danh</th>
                            <th>Số khung / Số đăng ký</th>
                            <th>Mô tả chi tiết tài sản</th>
                            <th style="width: 180px;">Trạng thái tài sản</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="${isStrike ? 'row-removed' : (isDisposal ? 'row-modified' : (isCancelDisposal ? 'row-added' : ''))}">
                            <td>1</td>
                            <td>Phương tiện giao thông</td>
                            <td>M-2918201</td>
                            <td><b>K-8472910398</b></td>
                            <td>Xe ô tô Toyota Camry màu sơn Đen, sản xuất năm 2024.</td>
                            <td>
                                ${isDisposal ? '<span class="badge badge-danger">Yêu cầu xử lý</span>' : 
                                  isCancelDisposal ? '<span class="badge badge-success">Khôi phục bình thường</span>' : 
                                  isStrike ? '<span class="badge badge-danger">Giải chấp</span>' :
                                  '<span class="badge badge-muted">Đang bảo đảm</span>'}
                            </td>
                        </tr>
                        <tr class="${isStrike ? 'row-removed' : ''}">
                            <td>2</td>
                            <td>Phương tiện giao thông</td>
                            <td>M-9918274</td>
                            <td><b>K-2819201928</b></td>
                            <td>Xe máy Honda SH màu sơn Trắng, sản xuất năm 2025.</td>
                            <td>
                                <span class="badge badge-muted">${isStrike ? 'Giải chấp' : 'Đang bảo đảm'}</span>
                            </td>
                        </tr>
                        ${isModifiedAsset ? `
                        <tr class="row-added">
                            <td>3</td>
                            <td>Phương tiện giao thông</td>
                            <td>M-2819201</td>
                            <td><b>K-8472910901</b></td>
                            <td>Xe ô tô Toyota Vios màu sơn Bạc, sản xuất năm 2025.</td>
                            <td><span class="badge badge-success">Bổ sung mới</span></td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
            ${hideAssetTable ? `<div style="text-align: center; color: var(--text-muted); padding: 30px;"><i>Không có biến động tài sản ở phiên bản này.</i></div>` : ''}
        `;
    }

    // TAB 5: Nghiệp vụ khác (Xóa đăng ký, Thông báo xử lý, Xóa thông báo...)
    else if (activeDetailTab === 'nghiepvukhac') {
        const isDisposal = currentProfile.type.includes('xử lý tài sản');
        const isCancelDisposal = currentProfile.type === 'Xóa thông báo xử lý tài sản';
        const isDereg = currentProfile.type === 'Xóa đăng ký';

        if (isDereg) {
            container.innerHTML = `
                <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                    <h3 class="section-title">THÔNG TIN XÓA ĐĂNG KÝ (GIẢI CHẤP)</h3>
                    <div class="info-grid">
                        <div class="info-group">
                            <div class="info-label">Ngày xóa đăng ký</div>
                            <div class="info-value">30/06/2026 08:30:00</div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Người yêu cầu xóa đăng ký</div>
                            <div class="info-value">Bà Trần Thị Lan</div>
                        </div>
                        <div class="info-group" style="grid-column: span 2;">
                            <div class="info-label">Căn cứ xóa đăng ký</div>
                            <div class="info-value">Khoản 1 Điều 20 Nghị định 99/2022/NĐ-CP - Đã hoàn thành toàn bộ nghĩa vụ trả nợ vay thế chấp tài sản.</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (isCancelDisposal) {
            container.innerHTML = `
                <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                    <h3 class="section-title">THÔNG TIN XÓA THÔNG BÁO XỬ LÝ TÀI SẢN</h3>
                    <div class="info-grid">
                        <div class="info-group">
                            <div class="info-label">Số văn bản xóa thông báo xử lý</div>
                            <div class="info-value"><b>XTBXL-2026-0081</b></div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Thông báo xử lý gốc liên kết</div>
                            <div class="info-value"><a class="action-link" href="#">TBXL-2026-00021</a></div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Ngày nộp yêu cầu xóa</div>
                            <div class="info-value">30/06/2026 17:00:00</div>
                        </div>
                        <div class="info-group" style="grid-column: span 2;">
                            <div class="info-label">Lý do xóa thông báo xử lý tài sản</div>
                            <div class="info-value">Bên bảo đảm đã thanh toán xong nợ quá hạn, hai bên thống nhất tiếp tục duy trì biện pháp bảo đảm.</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (isDisposal) {
            const isChange = currentProfile.type === 'Thay đổi thông báo xử lý tài sản';
            container.innerHTML = `
                <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                    <h3 class="section-title">THÔNG TIN NGHIỆP VỤ XỬ LÝ TÀI SẢN</h3>
                    <div class="info-grid">
                        <div class="info-group">
                            <div class="info-label">Mã số đăng ký liên kết</div>
                            <div class="info-value"><a class="action-link" href="#">GDBD-2026-000109</a></div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Bên thực hiện xử lý tài sản</div>
                            <div class="info-value">Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)</div>
                        </div>
                        <div class="info-group" style="grid-column: span 2;">
                            <div class="info-label">Lý do xử lý tài sản</div>
                            <div class="info-value">Bên bảo đảm vi phạm nghĩa vụ thanh toán quá hạn quá 90 ngày theo Hợp đồng tín dụng.</div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Địa điểm xử lý tài sản dự kiến</div>
                            <div class="info-value">
                                ${isChange ? '<span class="text-diff-old">Số 8 Duy Tân, Cầu Giấy, Hà Nội</span> <span class="text-diff-new">Số 12 Lạch Tray, Ngô Quyền, Hải Phòng</span>' : 'Số 8 Duy Tân, Cầu Giấy, Hà Nội'}
                            </div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Thời gian dự kiến xử lý</div>
                            <div class="info-value">15/07/2026 09:00:00</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Xử lý các nút nghiệp vụ trên màn hình Xem chi tiết
function handleDetailAction(action) {
    const opinionText = document.getElementById('officerOpinion').value.trim();
    const opinionArea = document.getElementById('officerOpinion');
    const opinionError = document.getElementById('opinionError');

    if (action === 'duyet') {
        alert(`Hồ sơ ${currentProfile.id} phê duyệt thành công! Chuyển sang danh mục Duyệt chờ ký.`);
        currentProfile.status = 'Duyệt chờ ký';
        currentProfile.statusClass = 'badge-info';
        
        // Ghi log xử lý nội bộ
        currentProfile.internalLogs.unshift({
            time: 'Vừa xong',
            user: 'Cán bộ nghiệp vụ TTĐK',
            action: 'Phê duyệt',
            comment: opinionText || 'Phê duyệt hồ sơ chuyển Lãnh đạo xem xét.'
        });
        
        closeDetail();
    } else if (action === 'tuchoi') {
        // Hành động từ chối bắt buộc có ý kiến
        if (!opinionText) {
            opinionArea.classList.add('is-invalid');
            opinionError.classList.add('active');
            opinionArea.focus();
            return;
        }
        opinionArea.classList.remove('is-invalid');
        opinionError.classList.remove('active');

        // Mở popup preview thông báo từ chối
        openModalPreview('tuchoi', opinionText);

    } else if (action === 'trinhky') {
        openModalPreview('trinhky');
    }
}

// ==========================================
// MODALS LOGIC
// ==========================================
let currentPreviewType = 'trinhky';

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Mở modal từ chối ở MH01
function openModalReject() {
    const selected = getSelectedRows();
    if (selected.length === 0) {
        alert('Vui lòng chọn ít nhất một hồ sơ để thao tác!');
        return;
    }
    document.getElementById('rejectReason').value = '';
    document.getElementById('rejectReason').classList.remove('is-invalid');
    document.getElementById('rejectError').classList.remove('active');
    openModal('modalReject');
}

// Submit từ chối từ modal nhập lý do (MH01)
function submitReject() {
    const reason = document.getElementById('rejectReason').value.trim();
    if (!reason) {
        document.getElementById('rejectReason').classList.add('is-invalid');
        document.getElementById('rejectError').classList.add('active');
        document.getElementById('rejectReason').focus();
        return;
    }
    closeModal('modalReject');
    
    // Nạp dòng đầu của selected để làm mẫu xem trước thông báo từ chối
    const selected = getSelectedRows();
    currentProfile = mockProfiles.find(p => p.id === selected[0]);
    openModalPreview('tuchoi', reason);
}

// Mở modal preview PDF Dự thảo
function openModalPreview(type, commentText = '') {
    currentPreviewType = type;
    const docNameSpan = document.getElementById('preview-pdf-doc-name');
    const titleSpan = document.getElementById('previewTitle');
    const btnConfirm = document.getElementById('btnConfirmPreview');
    const pdfView = document.getElementById('pdf-view-body');

    if (type === 'trinhky') {
        titleSpan.innerText = 'XEM TRƯỚC DỰ THẢO VĂN BẢN CHỨNG NHẬN';
        docNameSpan.innerText = 'DỰ THẢO VĂN BẢN PHÁP LÝ ĐỦ ĐIỀU KIỆN BAN HÀNH';
        btnConfirm.innerText = 'Xác nhận trình ký';
        
        pdfView.innerHTML = `
            <div style="text-align: center; font-weight: bold; margin-bottom: 20px; font-size: 16px;">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
                Độc lập - Tự do - Hạnh phúc<br>
                -------------------
            </div>
            <div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 20px;">
                VĂN BẢN CHỨNG NHẬN / THÔNG BÁO KẾT QUẢ GIAO DỊCH
            </div>
            <p><b>Số hồ sơ xử lý:</b> ${currentProfile ? currentProfile.id : 'GDBD-2026-000812'}</p>
            <p><b>Loại giao dịch:</b> ${currentProfile ? currentProfile.type : 'Đăng ký biện pháp bảo đảm'}</p>
            <p><b>Cơ quan cấp chứng nhận:</b> Trung tâm Đăng ký giao dịch, tài sản tại Hà Nội</p>
            <p><b>Bên bảo đảm:</b> ${currentProfile ? currentProfile.customer : 'Công ty Cổ phần Đầu tư Minh Tâm'}</p>
            <p><b>Bên nhận bảo đảm:</b> ${currentProfile ? currentProfile.mortgagee : 'Ngân hàng BIDV'}</p>
            <p><b>Thời điểm xác thực hệ thống:</b> 30/06/2026 18:00:00 (Thời điểm phê duyệt ký số của Lãnh đạo)</p>
            <div style="margin-top: 30px; border: 1px solid #ddd; padding: 10px; background-color: #fafafa;">
                <i>Hồ sơ đáp ứng đầy đủ điều kiện đăng ký theo quy định tại Nghị định 99/2022/NĐ-CP. Văn bản ở dạng chỉ đọc.</i>
            </div>
        `;
    } else {
        titleSpan.innerText = 'XEM TRƯỚC DỰ THẢO THÔNG BÁO TỪ CHỐI';
        docNameSpan.innerText = 'DỰ THẢO THÔNG BÁO TỪ CHỐI TIẾP NHẬN';
        btnConfirm.innerText = 'Xác nhận gửi Lãnh đạo ký từ chối';
        
        const reason = commentText || 'Hồ sơ thiếu tài liệu chứng minh tư cách pháp nhân hợp lệ.';
        pdfView.innerHTML = `
            <div style="text-align: center; font-weight: bold; margin-bottom: 20px; font-size: 16px;">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
                Độc lập - Tự do - Hạnh phúc<br>
                -------------------
            </div>
            <div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 20px;">
                THÔNG BÁO VỀ VIỆC TỪ CHỐI TIẾP NHẬN, GIẢI QUYẾT HỒ SƠ
            </div>
            <p><b>Kính gửi:</b> ${currentProfile ? currentProfile.customer : 'Khách hàng nộp hồ sơ'}</p>
            <p>Trung tâm Đăng ký giao dịch, tài sản tại Hà Nội xin thông báo từ chối giải quyết đối với yêu cầu đăng ký hồ sơ số: <b>${currentProfile ? currentProfile.id : 'BD-001'}</b>.</p>
            <p><b>LÝ DO TỪ CHỐI TIẾP NHẬN:</b> <span style="color: red; font-weight: 600;">${reason}</span></p>
            <p>Đề nghị quý khách hàng kiểm tra lại thông tin và lập hồ sơ mới hoàn toàn trên cổng dịch vụ công trực tuyến theo đúng quy định.</p>
        `;
    }

    openModal('modalPreview');
}

// Xác nhận trình ký/từ chối từ Preview PDF Modal
function confirmPreviewAction() {
    closeModal('modalPreview');

    if (currentPreviewType === 'trinhky') {
        alert('Hồ sơ đã được trình ký số thành công lên Lãnh đạo!');
        currentProfile.status = 'Duyệt chờ ký';
        currentProfile.statusClass = 'badge-info';
    } else {
        alert('Đã tạo và gửi dự thảo Thông báo từ chối thành công cho Lãnh đạo ký duyệt!');
        currentProfile.status = 'Duyệt chờ ký';
        currentProfile.statusClass = 'badge-danger';
    }

    // Ghi log nội bộ trình ký
    currentProfile.internalLogs.unshift({
        time: 'Vừa xong',
        user: 'Cán bộ nghiệp vụ TTĐK',
        action: currentPreviewType === 'trinhky' ? 'Trình ký' : 'Trình ký Từ chối',
        comment: currentPreviewType === 'trinhky' ? 'Đã lập dự thảo Giấy chứng nhận gửi Lãnh đạo.' : 'Đã lập dự thảo Văn bản từ chối gửi Lãnh đạo.'
    });

    closeDetail();
}

// Phê duyệt nhanh nhiều hồ sơ ở MH01
function approveRows() {
    const selected = getSelectedRows();
    if (selected.length === 0) {
        alert('Vui lòng chọn ít nhất một hồ sơ để thao tác!');
        return;
    }
    
    selected.forEach(id => {
        const profile = mockProfiles.find(p => p.id === id);
        if (profile) {
            profile.status = 'Duyệt chờ ký';
            profile.statusClass = 'badge-info';
            profile.internalLogs.unshift({
                time: 'Vừa xong',
                user: 'Cán bộ nghiệp vụ TTĐK',
                action: 'Phê duyệt hàng loạt',
                comment: 'Phê duyệt nhanh hồ sơ chuyển Lãnh đạo.'
            });
        }
    });

    alert(`Hoàn thành thành công ${selected.length} hồ sơ! (Các hồ sơ được chuyển sang danh mục Duyệt chờ ký)`);
    renderTable();
}

// Khởi tạo chạy lần đầu
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateSubTypes();
        renderTable();
    });
} else {
    updateSubTypes();
    renderTable();
}
