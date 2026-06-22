/**
 * Xử lý logic SPA cho UC031 - Ký duyệt hồ sơ
 */

function toggleCheckAll(source) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}

function getSelectedRows() {
    const checked = document.querySelectorAll('.row-checkbox:checked');
    return Array.from(checked).map(cb => cb.value);
}

function searchList() {
    const keyword = document.getElementById('keyword') ? document.getElementById('keyword').value.toLowerCase().trim() : '';
    const loaiVbSelect = document.getElementById('cb-loaivanban');
    const loaiVb = loaiVbSelect ? loaiVbSelect.options[loaiVbSelect.selectedIndex].text : 'Tất cả';
    
    const tbody = document.getElementById('table-data');
    const rows = tbody.querySelectorAll('tr.data-row');
    let hasData = false;
    
    rows.forEach(row => {
        const rowText = row.innerText.toLowerCase();
        let isMatch = true;
        
        if (keyword && !rowText.includes(keyword)) isMatch = false;
        
        if (loaiVb !== 'Tất cả' && !rowText.includes(loaiVb.toLowerCase())) isMatch = false;
        
        if (isMatch) {
            row.style.display = 'table-row';
            hasData = true;
        } else {
            row.style.display = 'none';
        }
    });
    
    let noDataRow = document.getElementById('no-data-row');
    if (!noDataRow) {
        noDataRow = document.createElement('tr');
        noDataRow.id = 'no-data-row';
        noDataRow.innerHTML = `<td colspan="8" style="text-align: center; padding: 30px; color: #666;"><i>Không tìm thấy hồ sơ nào phù hợp với điều kiện tìm kiếm.</i></td>`;
        tbody.appendChild(noDataRow);
    }
    noDataRow.style.display = hasData ? 'none' : 'table-row';
}

// Mở Split View (Xem chi tiết)
function openDetailView(id) {
    // Ẩn view list, hiển thị view split
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-split').classList.add('active');
    
    // Đổi layout của container chính thành full-width để split-view to hơn
    document.getElementById('main-container').classList.remove('container');
    document.getElementById('main-container').classList.add('container-fluid');
    
    // Update data trên UI
    document.getElementById('detail-id-display').innerText = id;
    document.getElementById('summary-id').innerText = id;
    document.getElementById('pdf-reg-no').innerText = id;
    
    // Reset stamp
    document.getElementById('signature-stamp').style.display = 'none';
    
    // Mock dữ liệu hiển thị khác biệt dựa theo ID
    if(id === 'BD-002') {
        document.getElementById('pdf-doc-title').innerText = 'Dự thảo Thông báo từ chối.pdf';
        document.getElementById('reason-row').style.display = 'flex';
        document.querySelector('.pdf-page h3').innerText = 'THÔNG BÁO TỪ CHỐI TIẾP NHẬN/GIẢI QUYẾT HỒ SƠ';
    } else {
        document.getElementById('pdf-doc-title').innerText = 'Dự thảo Giấy chứng nhận Đăng ký biện pháp bảo đảm.pdf';
        document.getElementById('reason-row').style.display = 'none';
        document.querySelector('.pdf-page h3').innerText = 'GIẤY CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM BẰNG ĐỘNG SẢN';
    }
}

// Đóng Split View
function closeDetailView() {
    document.getElementById('view-split').classList.remove('active');
    document.getElementById('view-list').classList.add('active');
    
    document.getElementById('main-container').classList.remove('container-fluid');
    document.getElementById('main-container').classList.add('container');
}

// ================= MODAL LOGIC =================
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// 1. Ký duyệt
let isBatchSigning = false;

function signBatch() {
    const selected = getSelectedRows();
    if(selected.length === 0) { alert('Vui lòng chọn ít nhất 1 hồ sơ để ký lô!'); return; }
    isBatchSigning = true;
    
    document.getElementById('pinCode').value = '';
    document.getElementById('pinCode').classList.remove('is-invalid');
    document.getElementById('pinError').classList.remove('active');
    openModal('modalSign');
}

function openModalSign() {
    isBatchSigning = false;
    document.getElementById('pinCode').value = '';
    document.getElementById('pinCode').classList.remove('is-invalid');
    document.getElementById('pinError').classList.remove('active');
    openModal('modalSign');
}

function submitSign() {
    const pin = document.getElementById('pinCode').value.trim();
    if(!pin || pin.length < 4) {
        document.getElementById('pinCode').classList.add('is-invalid');
        document.getElementById('pinError').classList.add('active');
        return;
    }
    
    closeModal('modalSign');
    
    if(isBatchSigning) {
        const count = getSelectedRows().length;
        alert(`Ký duyệt thành công ${count}/${count} hồ sơ! Hệ thống đang đóng dấu điện tử.`);
        toggleCheckAll({checked: false}); // reset checkbox
    } else {
        // Hiệu ứng đóng dấu trên PDF giả lập
        document.getElementById('signature-stamp').style.display = 'block';
        alert('Ký duyệt thành công! Hồ sơ đã được chuyển trạng thái "Hoàn thành / Bị từ chối" tùy loại dự thảo.');
        // Sau 1.5s tự động quay lại
        setTimeout(() => {
            closeDetailView();
        }, 1500);
    }
}

// 2. Lý do (Trả lại / Từ chối)
let reasonActionType = ''; // 'tralai' or 'tuchoi'

function openModalReason(type) {
    reasonActionType = type;
    document.getElementById('reasonTitle').innerText = type === 'tralai' ? 'Lý do Trả lại (Yêu cầu Cán bộ cập nhật)' : 'Lý do Từ chối hẳn hồ sơ';
    document.getElementById('btnConfirmReason').innerText = type === 'tralai' ? 'Xác nhận trả lại' : 'Từ chối & Sinh văn bản';
    document.getElementById('btnConfirmReason').className = type === 'tralai' ? 'btn btn-warning' : 'btn btn-danger';
    
    document.getElementById('reasonText').value = '';
    document.getElementById('reasonText').classList.remove('is-invalid');
    document.getElementById('reasonError').classList.remove('active');
    
    openModal('modalReason');
}

function submitReason() {
    const reason = document.getElementById('reasonText').value.trim();
    if(!reason) {
        document.getElementById('reasonText').classList.add('is-invalid');
        document.getElementById('reasonError').classList.add('active');
        return;
    }
    
    closeModal('modalReason');
    
    if(reasonActionType === 'tralai') {
        alert('Đã trả hồ sơ về cho Cán bộ TTĐK với lý do đã nhập.');
        closeDetailView();
    } else {
        alert('Hệ thống đã hủy dự thảo cũ và sinh lại văn bản "Dự thảo Thông báo từ chối" với lý do mới. Lãnh đạo vui lòng kiểm tra lại PDF bên trái và tiếp tục Ký duyệt.');
        // Đổi giao diện PDF sang dự thảo từ chối (Giả lập)
        document.getElementById('pdf-doc-title').innerText = 'Dự thảo Thông báo từ chối.pdf';
        document.getElementById('reason-row').style.display = 'flex';
        document.querySelector('.reason-row .summary-value').innerText = reason;
        document.querySelector('.pdf-page h3').innerText = 'THÔNG BÁO TỪ CHỐI TIẾP NHẬN/GIẢI QUYẾT HỒ SƠ';
    }
}
