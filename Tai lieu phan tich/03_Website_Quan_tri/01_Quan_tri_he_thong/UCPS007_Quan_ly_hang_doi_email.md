#### 4.3.1.10. UCPS007 - Quản lý Hàng đợi Email (Email Queue Manager)

##### 4.3.1.10.1. Mục đích

\- Cho phép Quản trị viên hệ thống (QTHT) theo dõi chi tiết trạng thái gửi email tự động của hệ thống (Email biên nhận thanh toán, Email gửi mã OTP xác thực, Email thông báo tài khoản).  
\- Cung cấp công cụ quản lý hàng đợi gửi lại (SMTP Retries), xem logs chi tiết lỗi kết nối máy chủ mail, cập nhật lại địa chỉ hòm thư nhận khi người dùng nhập sai, và kích hoạt gửi lại thủ công đối với các email bị kẹt trong hàng đợi lỗi vĩnh viễn (Dead Letter Queue - DLQ).  

*a. Phân quyền*

\- Quản trị viên hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Người dùng đăng nhập thành công vào Website quản trị bằng tài khoản có vai trò Quản trị hệ thống.  

##### 4.3.1.10.2. UCPS007.MH01 - Màn hình Quản lý Hàng đợi Email và xử lý DLQ

###### 4.3.1.10.2.1. Màn hình

\- Giao diện màn hình gồm bộ lọc tìm kiếm nâng cao và bảng danh sách lịch sử gửi email của hệ thống.  
\- Placeholder ảnh giao diện:  
![Màn hình Quản lý Hàng đợi Email](images/UCPS007_EmailQueue.png)

###### 4.3.1.10.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa tìm kiếm | String(255) | Không | Trống | \- Tìm kiếm gần đúng theo: Mã hồ sơ, Địa chỉ email người nhận. |
| Trạng thái gửi | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>\- Cho phép lọc theo trạng thái gửi thư, gồm:<br>  + Tất cả<br>  + **Đang gửi**: Thư đang được đóng gói chuẩn bị gửi.<br>  + **Đã gửi thành công**: Máy chủ SMTP báo nhận thư thành công.<br>  + **Chờ retry**: Gửi lỗi tạm thời, đang nằm trong hàng đợi chờ gửi lại tự động.<br>  + **Lỗi vĩnh viễn/DLQ**: Gửi thất bại sau 5 lần retry hoặc lỗi cú pháp email, được đưa vào hàng đợi chết (DLQ). |
| Từ ngày | Date | Không | Trống | \- Lọc theo ngày tạo yêu cầu gửi email. Không được lớn hơn "Đến ngày". |
| Đến ngày | Date | Không | Trống | \- Lọc theo ngày tạo yêu cầu gửi email. Không được nhỏ hơn "Từ ngày". |
| **II. Bảng danh sách hàng đợi email** | - | \- | 50 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách lịch sử gửi email.<br>- Phân trang mặc định **50 bản ghi/trang** để kiểm soát hiệu năng hệ thống.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Cột: Checkbox | Boolean | \- | \- | Control UI: Checkbox.<br>\- Cho phép tích chọn nhiều dòng email lỗi để thực hiện hành động gửi lại hàng loạt. |
| Cột: STT | Integer(10) | \- | \- | \- Số thứ tự dòng dữ liệu (tự tăng). |
| Cột: Mã hồ sơ | String(50) | \- | \- | \- Mã hồ sơ liên kết (nếu có) phát sinh yêu cầu gửi thư. |
| Cột: Email nhận | String(100) | \- | \- | \- Địa chỉ hòm thư điện tử nhận. |
| Cột: Loại email | String(100) | \- | \- | \- Phân loại nội dung email (Ví dụ: Email gửi mã OTP, Email biên nhận thanh toán, Email cấp mật khẩu tạm thời...). |
| Cột: Trạng thái | String(50) | \- | \- | \- Trạng thái gửi hiện tại (`Đang gửi`, `Đã gửi thành công`, `Chờ retry`, `Lỗi vĩnh viễn/DLQ`). |
| Cột: Số lần gửi lại | String(10) | \- | \- | \- Số lần đã thực hiện retry tự động của hệ thống (Ví dụ: `0/5` đến `5/5`). |
| Cột: Thời gian tạo | Datetime | \- | \- | \- Thời điểm phát sinh yêu cầu gửi email. |
| Cột: Thời gian gửi gần nhất | Datetime | \- | \- | \- Thời điểm máy chủ SMTP thực hiện kết nối gửi gần nhất. |
| Cột: Lỗi SMTP chi tiết | String(1000) | \- | \- | \- Ghi nhận chi tiết thông báo lỗi kỹ thuật trả về từ máy chủ mail (Ví dụ: SMTP Timeout, Connection Refused, Invalid Recipient Address...). |
| Cột: Thao tác | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>\- Chứa các link hành động nghiệp vụ trực tiếp trên từng dòng:<br>  + **[Gửi lại]**: Cho phép kích hoạt gửi lại thủ công (chỉ xuất hiện đối với dòng có trạng thái là `Lỗi vĩnh viễn/DLQ`).<br>  + **[Cập nhật địa chỉ nhận]**: Cho phép sửa nhanh địa chỉ email nhận. |

###### 4.3.1.10.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | \- Thao tác: QTHT click nút Tìm kiếm.<br>\- Xử lý: Hệ thống thực hiện tìm kiếm và lọc dữ liệu trên lưới theo các tiêu chí đã nhập ở Bộ lọc tìm kiếm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Nút | \- Thao tác: QTHT click nút Xóa bộ lọc.<br>\- Xử lý: Hệ thống làm sạch toàn bộ dữ liệu đang chọn tại Bộ lọc tìm kiếm và nạp lại danh sách hàng đợi email mặc định. |
| 3 | Gửi lại hàng loạt | Nút | \- Thao tác: QTHT click chọn các checkbox ở đầu dòng bản ghi lỗi và nhấn nút Gửi lại hàng loạt. |
| | | | \- Kiểm tra: Bắt buộc người dùng phải tích chọn ít nhất 1 dòng email lỗi. Nếu chưa tích chọn, hệ thống hiển thị thông báo lỗi: "Vui lòng chọn ít nhất một email lỗi để thực hiện gửi lại." |
| | | | \- TH Hợp lệ: Hệ thống đóng gói danh sách email đã chọn, đưa ngược trở lại hàng đợi gửi (Queue) và đổi trạng thái thành `Đang gửi`. Đồng thời hiển thị Toast thông báo: "Đã đưa [X] email vào hàng đợi gửi lại thành công." và làm mới danh sách. |
| 4 | Export Excel | Nút | \- Thao tác: QTHT click nút Export Excel.<br>\- Xử lý: Xuất dữ liệu email theo danh sách lọc hiện hành ra tệp tin định dạng `.xlsx`. Nếu danh sách rỗng, hiển thị thông báo: "Không có dữ liệu để export". |
| 5 | Gửi lại (trên lưới) | Link | \- Thao tác: QTHT click link [Gửi lại] tại cột Thao tác trên một dòng email lỗi. |
| | | | \- TH Hợp lệ: Hệ thống lập tức kích hoạt API gửi lại email đó. Nếu máy chủ SMTP báo nhận thành công, cập nhật trạng thái thành `Đã gửi thành công` và hiển thị Toast: "Gửi lại email thành công!". Nếu vẫn lỗi, cập nhật tăng số lần gửi lại thêm 1, ghi logs lỗi mới và hiển thị Toast lỗi: "Gửi lại email thất bại. Chi tiết: [Nội dung lỗi SMTP]". |
| 6 | Cập nhật địa chỉ nhận (trên lưới) | Link | \- Thao tác: QTHT click link [Cập nhật địa chỉ nhận] tại dòng bản ghi cần chỉnh sửa. |
| | | | \- Xử lý: Hệ thống hiển thị một Popup nhập liệu gồm ô nhập địa chỉ Email mới.<br>\- Kiểm tra: Địa chỉ email mới phải đúng định dạng Regex. Nếu bỏ trống hoặc sai định dạng, hiển thị thông báo lỗi tương ứng: "Trường này bắt buộc nhập" hoặc "Địa chỉ email không hợp lệ".<br>\- TH Hợp lệ: QTHT nhập địa chỉ email mới hợp lệ và nhấn Lưu. Hệ thống cập nhật địa chỉ hòm thư nhận mới vào CSDL, chuyển trạng thái email về `Chờ retry`, reset số lần gửi lại về `0/5` để hệ thống tự động quét gửi lại. Hiển thị Toast thông báo: "Cập nhật địa chỉ nhận thành công." và tải lại danh sách. |
