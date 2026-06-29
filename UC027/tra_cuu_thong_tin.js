/**
 * Xử lý logic SPA cho UC027 - Tra cứu thông tin đăng ký
 */

const mockNSD = [
    { id: 'BD-2026-001', pin: '****', type: 'Đăng ký lần đầu', status: 'Hoàn thành', transaction: 'Biện pháp bảo đảm', name: 'Công ty TNHH ABC', date: '28/04/2026 10:30' },
    { id: 'BD-2026-002', pin: '****', type: 'Đăng ký thay đổi', status: 'Lưu nháp', transaction: 'Hợp đồng', name: 'Nguyễn Văn B', date: '28/04/2026 14:15' },
    { id: 'BD-2026-005', pin: '****', type: 'Xóa đăng ký', status: 'Bị từ chối', transaction: 'Biện pháp bảo đảm', name: 'Lê Thị C', date: '29/04/2026 09:00' },
    { id: 'BD-2026-006', pin: '****', type: 'Đăng ký lần đầu', status: 'Chờ thanh toán', transaction: 'Biện pháp bảo đảm', name: 'Phạm Văn D', date: '29/04/2026 10:15' },
    { id: 'BD-2026-007', pin: '****', type: 'Đăng ký thay đổi', status: 'Chờ duyệt', transaction: 'Hợp đồng', name: 'Trần Thị E', date: '30/04/2026 08:30' },
    { id: 'BD-2026-008', pin: '****', type: 'Xóa đăng ký', status: 'Hoàn thành', transaction: 'Biện pháp bảo đảm', name: 'Lý Công Uẩn', date: '01/05/2026 11:20' },
    { id: 'BD-2026-009', pin: '****', type: 'Đăng ký lần đầu', status: 'Chờ ký', transaction: 'Hợp đồng', name: 'Ngô Quyền', date: '02/05/2026 09:45' },
    { id: 'BD-2026-010', pin: '****', type: 'Đăng ký thay đổi', status: 'Hoàn thành', transaction: 'Biện pháp bảo đảm', name: 'Đinh Bộ Lĩnh', date: '03/05/2026 14:10' },
    { id: 'BD-2026-011', pin: '****', type: 'Xóa đăng ký', status: 'Lưu nháp', transaction: 'Hợp đồng', name: 'Lê Hoàn', date: '04/05/2026 16:00' },
    { id: 'BD-2026-012', pin: '****', type: 'Đăng ký lần đầu', status: 'Bị từ chối', transaction: 'Biện pháp bảo đảm', name: 'Công ty CP XYZ', date: '05/05/2026 10:05' }
];

const mockCanBo = [
    { stt: 1, date: '28/04/2026 10:30', id: 'BD-2026-001', type: 'Đăng ký lần đầu', transaction: 'Biện pháp bảo đảm', status: 'Hoàn thành', user: 'nguyenvana' },
    { stt: 2, date: '28/04/2026 14:15', id: 'BD-2026-002', type: 'Đăng ký thay đổi', transaction: 'Hợp đồng', status: 'Chờ duyệt', user: 'nguyenvanb' },
    { stt: 3, date: '29/04/2026 08:15', id: 'BD-2026-003', type: 'Xóa đăng ký', transaction: 'Thông báo xử lý tài sản', status: 'Chờ ký', user: 'tranvanc' },
    { stt: 4, date: '30/04/2026 16:20', id: 'BD-2026-004', type: 'Đăng ký lần đầu', transaction: 'Hợp đồng', status: 'Bị từ chối', user: 'phamthid' },
    { stt: 5, date: '01/05/2026 09:00', id: 'BD-2026-005', type: 'Đăng ký thay đổi', transaction: 'Biện pháp bảo đảm', status: 'Chờ thanh toán', user: 'levane' },
    { stt: 6, date: '02/05/2026 10:30', id: 'BD-2026-006', type: 'Xóa đăng ký', transaction: 'Hợp đồng', status: 'Hoàn thành', user: 'hoangthif' },
    { stt: 7, date: '03/05/2026 14:45', id: 'BD-2026-007', type: 'Đăng ký lần đầu', transaction: 'Biện pháp bảo đảm', status: 'Chờ duyệt', user: 'nguyenvang' },
    { stt: 8, date: '04/05/2026 08:20', id: 'BD-2026-008', type: 'Đăng ký thay đổi', transaction: 'Hợp đồng', status: 'Chờ ký', user: 'tranthih' },
    { stt: 9, date: '05/05/2026 11:15', id: 'BD-2026-009', type: 'Xóa đăng ký', transaction: 'Thông báo xử lý tài sản', status: 'Bị từ chối', user: 'phamvani' },
    { stt: 10, date: '06/05/2026 15:30', id: 'BD-2026-010', type: 'Đăng ký lần đầu', transaction: 'Biện pháp bảo đảm', status: 'Hoàn thành', user: 'levanj' }
];

document.addEventListener('DOMContentLoaded', () => {
    const tbodyNSD = document.getElementById('nsd-table-body');
    if (tbodyNSD) {
        tbodyNSD.innerHTML = '';
        mockNSD.forEach(item => {
            let badgeClass = 'badge-success';
            let bgStyle = '';
            if (item.status === 'Lưu nháp') badgeClass = 'badge-warning';
            else if (item.status === 'Bị từ chối') { badgeClass = 'badge'; bgStyle = 'background: var(--danger-color); color: white;'; }
            else if (item.status === 'Chờ thanh toán' || item.status === 'Chờ duyệt') badgeClass = 'badge-warning';
            else if (item.status === 'Chờ ký') { badgeClass = 'badge'; bgStyle = 'background: var(--primary-color); color: white;'; }

            tbodyNSD.innerHTML += `
                <tr class="data-row">
                    <td><span class="action-link" onclick="openDetail('${item.id}', '${item.status}')">${item.id}</span></td>
                    <td>${item.pin}</td>
                    <td>${item.type}</td>
                    <td><span class="badge ${badgeClass}" style="${bgStyle}">${item.status}</span></td>
                    <td>${item.transaction}</td>
                    <td>${item.name}</td>
                    <td>${item.date}</td>
                    <td><span class="action-link" onclick="openDetail('${item.id}', '${item.status}')">Xem chi tiết</span></td>
                </tr>
            `;
        });
        tbodyNSD.innerHTML += `<tr id="no-data-nsd" style="display: none;"><td colspan="8" style="text-align: center; padding: 30px; color: #666;"><i>Không tìm thấy hồ sơ nào phù hợp với điều kiện tìm kiếm.</i></td></tr>`;
    }

    const tbodyCanBo = document.getElementById('canbo-table-body');
    if (tbodyCanBo) {
        tbodyCanBo.innerHTML = '';
        mockCanBo.forEach(item => {
            let badgeClass = 'badge-success';
            let bgStyle = '';
            if (item.status === 'Chờ duyệt' || item.status === 'Chờ thanh toán') badgeClass = 'badge-warning';
            else if (item.status === 'Chờ ký') { badgeClass = 'badge'; bgStyle = 'background: var(--primary-color); color: white;'; }
            else if (item.status === 'Bị từ chối') { badgeClass = 'badge'; bgStyle = 'background: var(--danger-color); color: white;'; }

            tbodyCanBo.innerHTML += `
                <tr class="data-row" onclick="openDetail('${item.id}', '${item.status}')" style="cursor: pointer;">
                    <td>${item.stt}</td>
                    <td>${item.date}</td>
                    <td>${item.id}</td>
                    <td>${item.type}</td>
                    <td>${item.transaction}</td>
                    <td><span class="badge ${badgeClass}" style="${bgStyle}">${item.status}</span></td>
                    <td>${item.user}</td>
                </tr>
            `;
        });
        tbodyCanBo.innerHTML += `<tr id="no-data-canbo" style="display: none;"><td colspan="7" style="text-align: center; padding: 30px; color: #666;"><i>Không tìm thấy hồ sơ nào phù hợp với điều kiện tìm kiếm.</i></td></tr>`;
    }
});

// Chuyển đổi qua lại giữa vai trò (Mockup)
function switchRole(role, element) {
    // Xóa active class của tất cả tabs
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    // Ẩn tất cả view
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));

    // Hiển thị view tương ứng
    document.getElementById('view-' + role).classList.add('active');
}

// Cập nhật dropdown Loại biện pháp dựa theo Loại hình giao dịch
function updateSubTypes() {
    const loaiHinh = document.getElementById('cb-loaihinh').value;
    const subTypeSelect = document.getElementById('cb-loaibienphap');

    subTypeSelect.innerHTML = '<option value="">Tất cả</option>';

    if (loaiHinh === 'bpbd') {
        const options = ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu', 'Đặt cọc', 'Ký cược', 'Ký quỹ'];
        options.forEach(opt => subTypeSelect.innerHTML += `<option value="${opt}">${opt}</option>`);
    } else if (loaiHinh === 'hopdong') {
        const options = [
            'Hợp đồng cho thuê tài chính',
            'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên',
            'Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác',
            'Hợp đồng ký gửi'
        ];
        options.forEach(opt => subTypeSelect.innerHTML += `<option value="${opt}">${opt}</option>`);
    }
}

// Hàm validate và tìm kiếm của Cán bộ
function searchCanBo() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const keyword = document.getElementById('keyword') ? document.getElementById('keyword').value.toLowerCase().trim() : '';

    const loaiHinhSelect = document.getElementById('cb-loaihinh');
    const loaiHinh = loaiHinhSelect.options[loaiHinhSelect.selectedIndex].text;

    const trangThai = document.getElementById('cb-trangthai').value;

    if (fromDate && toDate) {
        if (new Date(fromDate) > new Date(toDate)) {
            alert('Lỗi: Từ ngày không được lớn hơn Đến ngày!');
            return;
        }
    }

    // Giả lập logic tìm kiếm hiển thị danh sách
    const rows = document.querySelectorAll('#canbo-table-body .data-row');
    let hasData = false;

    rows.forEach(row => {
        const rowText = row.innerText.toLowerCase();
        let isMatch = true;

        // Lọc theo keyword (Mã hồ sơ, Tên KH)
        if (keyword && !rowText.includes(keyword)) {
            isMatch = false;
        }

        // Lọc theo trạng thái
        if (trangThai && !rowText.includes(trangThai.toLowerCase())) {
            isMatch = false;
        }

        // Lọc theo loại hình giao dịch (Bỏ qua nếu chọn Tất cả)
        if (loaiHinh !== 'Tất cả' && !rowText.includes(loaiHinh.toLowerCase())) {
            isMatch = false;
        }

        if (isMatch) {
            row.style.display = 'table-row';
            hasData = true;
        } else {
            row.style.display = 'none';
        }
    });

    const noDataRow = document.getElementById('no-data-canbo');
    if (noDataRow) {
        noDataRow.style.display = hasData ? 'none' : 'table-row';
    }
}

// Điều hướng sang Màn hình Xem chi tiết lịch sử (UC027)
function openDetail(id, status = '') {
    window.location.href = 'xem_chi_tiet_lich_su_can_bo.html?id=' + id;
}

// Chuyển hướng xem lịch sử biến động chi tiết (UC027)
function viewHistoryDetails() {
    // Lưu thông tin tra cứu vào localStorage để trang sau nhận dạng
    localStorage.setItem('canBoRegNum', '12345678');
    localStorage.setItem('canBoPinNum', '8888');
    window.location.href = 'xem_chi_tiet_lich_su_can_bo.html';
}

// Quay lại danh sách
function closeDetail() {
    document.getElementById('view-detail').classList.remove('active');
    document.querySelector('.nav-tabs').style.display = 'flex';

    // Xác định role đang active để mở lại view tương ứng
    const activeRole = document.querySelector('.nav-tab.active').innerText.includes('NSD') ? 'nsd' : 'canbo';
    document.getElementById('view-' + activeRole).classList.add('active');
}
