/* Popup Xác nhận xóa hồ sơ dùng chung các màn Nghiệp vụ quản lý nhà nước về công tác BTNN [MSG-CFM-SYS-001]
 * Mẫu chuẩn: popup xóa màn Tập huấn, bồi dưỡng (#th-delete-popup): hộp trắng 450px bo góc, nền tối mờ,
 * tiêu đề "Xác nhận" màu đỏ kèm icon fa-circle-question, nội dung "Bạn có chắc chắn muốn xóa hồ sơ [Mã hồ sơ] không?",
 * đường kẻ mảnh, 02 nút bên phải: Hủy bỏ (xám), Đồng ý (đỏ).
 * Dùng: BTNN_POPUP_XOA.open('KT-BTNN-2026-001', function () { ...xóa... });
 * CSS tự chứa (giá trị tuyệt đối), không phụ thuộc CSS của trang để mọi màn hiển thị giống hệt nhau.
 */
(function (w, d) {
    var ID = 'btnnPopupXoa';
    var onOk = null;
    var CSS = ''
        + '#' + ID + '{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);display:none;align-items:center;justify-content:center;z-index:10001;}'
        + '#' + ID + '.active{display:flex;}'
        + '#' + ID + ' .bpx-box{box-sizing:border-box;background-color:#fff;border-radius:8px;width:450px;max-width:calc(100vw - 32px);padding:20px;margin:0;border:0;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);font-family:Inter,system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.5;color:#1e293b;text-align:left;}'
        + '#' + ID + ' .bpx-title{display:flex;align-items:center;gap:10px;margin:0 0 12px;padding:0;font-size:16px;font-weight:700;line-height:24px;color:#ef4444;}'
        + '#' + ID + ' .bpx-title i{font-size:20px;line-height:20px;color:#ef4444;}'
        + '#' + ID + ' .bpx-text{margin:0 0 15px;padding:0;font-size:13px;font-weight:400;line-height:1.4;color:#1e293b;white-space:pre-line;word-break:break-word;}'
        + '#' + ID + ' .bpx-actions{display:flex;justify-content:flex-end;gap:10px;margin:15px 0 0;padding:15px 0 0;border-top:1px dashed #e2e8f0;}'
        + '#' + ID + ' .bpx-btn{display:flex;align-items:center;gap:8px;box-sizing:border-box;margin:0;padding:5px 10px;min-width:0;width:auto;height:auto;font-family:Arial,sans-serif;font-size:12px;font-weight:600;line-height:normal;letter-spacing:normal;text-transform:none;border:1px solid transparent;border-radius:4px;box-shadow:none;cursor:pointer;transition:background-color .15s;}'
        + '#' + ID + ' .bpx-cancel{background-color:#e2e8f0;color:#475569;}'
        + '#' + ID + ' .bpx-cancel:hover{background-color:#cbd5e1;}'
        + '#' + ID + ' .bpx-ok{background-color:#ef4444;color:#fff;}'
        + '#' + ID + ' .bpx-ok:hover{background-color:#dc2626;}';
    function ensure() {
        var el = d.getElementById(ID);
        if (el) return el;
        if (!d.getElementById(ID + 'Css')) {
            var st = d.createElement('style');
            st.id = ID + 'Css';
            st.textContent = CSS;
            d.head.appendChild(st);
        }
        el = d.createElement('div');
        el.id = ID;
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.innerHTML = '<div class="bpx-box">'
            + '<div class="bpx-title"><i class="fa-solid fa-circle-question"></i><span>Xác nhận</span></div>'
            + '<p class="bpx-text" id="' + ID + 'Text"></p>'
            + '<div class="bpx-actions">'
            + '<button type="button" class="bpx-btn bpx-cancel" data-admin-icon-normalized="1" data-bpx="0">Hủy bỏ</button>'
            + '<button type="button" class="bpx-btn bpx-ok" data-admin-icon-normalized="1" data-bpx="1">Đồng ý</button>'
            + '</div></div>';
        el.addEventListener('click', function (e) {
            var b = e.target.closest('[data-bpx]');
            if (b) close(b.getAttribute('data-bpx') === '1');
        });
        d.body.appendChild(el);
        return el;
    }
    // code: Mã hồ sơ hiển thị trong câu hỏi; module không có mã hồ sơ thì truyền rỗng -> câu chung "…xóa hồ sơ này không?"
    // ok: hàm chạy khi bấm Đồng ý
    function open(code, ok) {
        var el = ensure();
        onOk = typeof ok === 'function' ? ok : null;
        d.getElementById(ID + 'Text').innerText = code ? 'Bạn có chắc chắn muốn xóa hồ sơ ' + code + ' không?' : 'Bạn có chắc chắn muốn xóa hồ sơ này không?';
        el.classList.add('active');
    }
    // Hủy bỏ: đóng popup, giữ nguyên dữ liệu; Đồng ý: đóng popup rồi thực hiện xóa
    function close(accepted) {
        var el = d.getElementById(ID);
        if (el) el.classList.remove('active');
        var cb = onOk; onOk = null;
        if (accepted && cb) cb();
    }
    w.BTNN_POPUP_XOA = { open: open, close: close };
})(window, document);
