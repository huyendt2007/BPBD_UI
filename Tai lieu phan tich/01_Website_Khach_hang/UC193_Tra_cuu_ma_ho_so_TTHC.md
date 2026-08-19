### 4.1.15. UC193 - Tra cứu mã hồ sơ thủ tục hành chính

#### 4.1.13.1. Mục đích

\- Cho phép Khách hàng (Người nộp hồ sơ) thực hiện tra cứu trực tuyến tiến độ xử lý và kết quả của hồ sơ thủ tục hành chính (TTHC) đã nộp trên hệ thống (bao gồm hồ sơ nộp trực tuyến, hồ sơ liên kết từ cổng Dịch vụ công hoặc hồ sơ nộp trực tiếp tại quầy bưu chính) thông qua Website Khách hàng mà không bắt buộc phải đăng nhập tài khoản.  
\- Hỗ trợ người dùng tải xuống văn bản kết quả điện tử (Giấy chứng nhận đăng ký đã ký số hoặc Thông báo từ chối giải quyết) sau khi hồ sơ đã có kết quả xử lý chính thức.  

*a. Phân quyền*

\- Mọi cá nhân, tổ chức có nhu cầu tra cứu thông tin tiến độ hồ sơ (không bắt buộc có tài khoản đăng nhập).  

*b. Điều kiện thực hiện (Pre-conditions)*

\- Người dùng đã truy cập vào Website Khách hàng (phân hệ Tra cứu mã hồ sơ TTHC).  
\- Người dùng có mã hồ sơ TTHC hợp lệ do hệ thống cấp tại thời điểm tiếp nhận thành công.  
\- Hệ thống hoạt động bình thường, kết nối cơ sở dữ liệu ổn định.  

---

#### 4.1.13.2. UC193.MH01 - Màn hình Tra cứu hồ sơ thủ tục hành chính của Khách hàng

##### 4.1.13.2.1. Màn hình

\- Giao diện màn hình gồm ô nhập Mã hồ sơ ở phía trên.  
\- Bảng danh sách kết quả (Grid) hiển thị tiến độ và kết quả hồ sơ ở phía dưới.  
\- Phía trên bảng kết quả hiển thị hai nút **[Kết xuất Excel]** và **[Kết xuất PDF]** hỗ trợ khách hàng in/lưu kết quả tra cứu.  
\- Ảnh minh họa giao diện màn hình:  
![Màn hình Tra cứu hồ sơ TTHC](images/UC193_MH01.png)

##### 4.1.13.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối tìm kiếm hồ sơ** | | | | |
| Mã hồ sơ TTHC | String(50) | Có | Trống | \- Nhập chính xác mã số hồ sơ thủ tục hành chính cần tra cứu tiến độ. |
| **II. Bảng hiển thị kết quả tra cứu** | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Hiển thị thông tin tiến độ xử lý của hồ sơ tìm kiếm. |
| Cột: Mã hồ sơ TTHC | String(50) | \- | \- | Mã hồ sơ TTHC đã nhập. |
| Cột: Loại thủ tục hành chính | Enum(String(50)) | \- | \- | Tên loại thủ tục hành chính (Đăng ký mới, Thay đổi, Xóa đăng ký...). |
| Cột: Ngày tiếp nhận | Date | \- | \- | Ngày giờ hệ thống tiếp nhận hồ sơ. Định dạng hiển thị bắt buộc: **`DD/MM/YYYY HH:mm:ss`**. |
| Cột: Ngày hẹn trả kết quả | Date | \- | \- | Ngày hẹn trả kết quả xử lý. Định dạng hiển thị bắt buộc: **`DD/MM/YYYY`**. |
| Cột: Kênh tiếp nhận | String(255) | \- | \- | Trực tuyến (Cổng DVC) / Trực tiếp tại quầy / Qua bưu chính. |
| Cột: Trạng thái xử lý | Enum(String(50)) | \- | \- | Trạng thái hiện tại của hồ sơ: `Chờ tiếp nhận`, `Đang xử lý`, `Chờ bổ sung hồ sơ`, `Hoàn thành`, `Bị từ chối` với tag màu tương ứng. |
| Cột: Ý kiến phản hồi / Lý do | Text(2000) | \- | \- | Chi tiết lý do từ chối hoặc yêu cầu bổ sung hồ sơ từ cán bộ tiếp nhận (nếu có). |
| Cột: Văn bản kết quả | Text(2000) | \- | \- | Control UI: Hiển thị/Read-only.<br>\- Nếu trạng thái là `Hoàn thành`: Hiển thị link tải **Giấy chứng nhận đăng ký (PDF đã ký số)**.<br>\- Nếu trạng thái là `Bị từ chối`: Hiển thị link tải **Thông báo từ chối giải quyết (PDF đã ký số)**.<br>\- Các trạng thái khác hiển thị `-`. |

##### 4.1.13.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Khi click, hệ thống thực hiện validate dữ liệu đầu vào: |
|     |               |           | \- TH1 (Bỏ trống trường bắt buộc): Hệ thống kiểm tra nếu bỏ trống trường Mã hồ sơ TTHC. Hệ thống chặn thao tác, highlight đỏ viền trường trống và hiển thị cảnh báo lỗi "Trường này bắt buộc nhập" màu đỏ ngay phía dưới trường đó. |

|     |               |           | \- TH2 (Không tìm thấy hồ sơ): Mã hồ sơ không tồn tại trong hệ thống. Hệ thống hiển thị trên lưới dòng chữ "Mã hồ sơ không tồn tại hoặc chưa được tiếp nhận xử lý". |
|     |               |           | \- TH Hợp lệ: Hệ thống truy xuất cơ sở dữ liệu và tải thông tin chi tiết của hồ sơ lên lưới kết quả (bao gồm thông tin trạng thái, ý kiến phản hồi và link tải file kết quả nếu có). |
| 2 | Kết xuất Excel | Nút | Xuất thông tin kết quả tra cứu hiện tại ra file Excel (.xlsx): |
|     |               |           | \- Thao tác: Click nút [Kết xuất Excel]. |
|     |               |           | \- Xử lý: Hệ thống kết xuất file Excel chứa đầy đủ các cột thông tin hiển thị trên lưới kết quả kèm theo tên file mặc định: `Ket_qua_tra_cuu_ho_so_TTHC_DDMMYYYY.xlsx`. |
| 3 | Kết xuất PDF | Nút | Xuất thông tin kết quả tra cứu hiện tại ra văn bản PDF: |
|     |               |           | \- Thao tác: Click nút [Kết xuất PDF]. |
|     |               |           | \- Xử lý: Hệ thống kết xuất file PDF in toàn bộ thông tin tiến trình của hồ sơ hành chính phục vụ mục đích lưu trữ hoặc in ấn. |
