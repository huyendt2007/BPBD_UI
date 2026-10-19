# Tiêu chuẩn thiết kế UI/UX (UI/UX Design Standards)

Tài liệu này ghi nhận các quy tắc và lưu ý thiết kế giao diện (UI) dành cho dự án Đăng ký trực tuyến BPBĐ & BTNN nhằm đảm bảo tính nhất quán và tránh các lỗi lặp lại trong quá trình triển khai UI Mockups hoặc phát triển Frontend.

## 1. Thiết lập Giá trị Mặc định (Default Values)
- **Loại Chủ thể:** Đối với các dropdown (select) chọn "Loại chủ thể" (Ví dụ: Bên thế chấp, Bên nhận thế chấp, Người yêu cầu...), giá trị mặc định luôn phải được thiết lập là **"Công dân Việt Nam"** (`<option value="cd_vn" selected>Công dân Việt Nam</option>`). Đi kèm với đó, mã Javascript cần phải trigger sự kiện `change` ngay khi load trang hoặc khi mở form để render chính xác các trường dữ liệu tương ứng của "Công dân Việt Nam" (Số CMND/CCCD/Chứng minh quân đội, Họ và tên).
- **Tỉnh/Thành phố:** Các dropdown chọn Tỉnh/Thành phố bắt buộc phải có giá trị ngầm định (trống/chưa chọn) là **"Vui lòng lựa chọn Tỉnh/Thành phố"** thay vì để hiển thị mặc định tên một Tỉnh/Thành phố nào đó (VD: Hà Nội). Mã HTML cần cấu trúc `<option value="" selected>Vui lòng lựa chọn Tỉnh/Thành phố</option>`.

## 2. Định dạng Ngày tháng (Date Format)
- **Chuẩn hiển thị:** Toàn bộ hệ thống áp dụng thống nhất định dạng ngày tháng là **`dd/mm/yyyy`**.
- **Cách triển khai trên Input:** Để tránh tình trạng trình duyệt ép buộc định dạng ngày theo locale của hệ điều hành (ví dụ: `mm/dd/yyyy` ở máy tính dùng tiếng Anh), KHÔNG sử dụng `<input type="date">` cho các trường nhập ngày nếu không kèm thư viện datepicker xử lý format. Thay vào đó, sử dụng `<input type="text" placeholder="dd/mm/yyyy">` và xử lý validate format bằng Javascript. 
- *Lưu ý:* Khi lấy dữ liệu từ `type="text"`, cần chú ý parser ngày tháng theo định dạng `dd/mm/yyyy` để chuyển đổi đúng trước khi đưa vào JSON lưu trữ.

## 3. Nút Hủy (Cancel Button) ở các Form thêm mới dữ liệu
- **Logic hiển thị:** Tại các Form/Sub-form dùng để thêm mới các đối tượng bắt buộc (ví dụ: Thông tin Bên thế chấp, Bên nhận thế chấp), khi **bảng dữ liệu đang trống** (thêm mới dòng đầu tiên), form sẽ mở mặc định và **Nút HỦY phải bị ẩn**, chỉ hiển thị nút LƯU để bắt buộc người dùng hoàn thành nhập liệu.
- Khi người dùng bấm **Sửa** một dòng dữ liệu đã có, hoặc bấm **+ Thêm** để nhập dữ liệu dòng thứ 2 trở đi, **Nút HỦY phải được hiển thị** để cho phép hủy thao tác đang thực hiện.

---
*(Cập nhật liên tục khi có các phản hồi hoặc thay đổi về UI/UX từ khách hàng/BA)*
