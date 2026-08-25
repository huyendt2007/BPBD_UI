### 4.1.7. Đăng xuất tài khoản

#### 4.1.7.1. Mục đích
- Cung cấp cơ chế kết thúc phiên làm việc (Session) an toàn cho Khách hàng trên Website Khách hàng.
- Hủy bỏ các token bảo mật, cookie phiên hoạt động nhằm ngăn ngừa rủi ro bị chiếm đoạt tài khoản hoặc truy cập trái phép.

*a. Phân quyền*
- Người dùng: Cá nhân/Tổ chức đang đăng nhập trên hệ thống.

*b. Điều kiện thực hiện*
- NSD đã đăng nhập vào hệ thống (phiên làm việc vẫn còn hiệu lực).
- Hệ thống hoạt động bình thường.

#### 4.1.7.2. MH01 - Chức năng Đăng xuất tài khoản

##### 4.1.7.2.1. Vị trí chức năng
- Giao diện nút/liên kết "Đăng xuất" nằm tại thanh tiêu đề đầu trang (Header) của Website Khách hàng, bên cạnh thông tin tên tài khoản người dùng đang đăng nhập.

##### 4.1.7.2.2. Chức năng và kịch bản xử lý chi tiết
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đăng xuất | Nút / Link | **TH1 (Chủ động)**: Người dùng click vào nút "Đăng xuất" để thoát khỏi hệ thống.<br>- Hệ thống thu hồi và hủy bỏ phiên làm việc (Session) hiện tại trên máy chủ.<br>- Thu hồi và xóa bỏ dữ liệu "Ghi nhớ đăng nhập" trong Cơ sở dữ liệu và trên Cookie trình duyệt (nếu người dùng có tích chọn "Ghi nhớ đăng nhập" ở màn hình đăng nhập).<br>- Xóa toàn bộ dữ liệu phiên (Session Cookie) trên trình duyệt người dùng.<br>- Ghi nhận nhật ký hệ thống (Audit Log) gồm: Tên đăng nhập, Thời gian đăng xuất, Địa chỉ IP và phương thức "Đăng xuất chủ động".<br>- Chuyển hướng người dùng về [MH01 - Màn hình Đăng nhập khách hàng](UC001_Dang_nhap_khach_hang.md#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid) kèm thông báo "Đăng xuất thành công." |
| | | | **TH2 (Tự động do hết thời gian chờ - Timeout)**: Nếu người dùng không thực hiện bất kỳ thao tác nào vượt quá thời gian cấu hình chờ tại mục [cấu hình thời gian chờ (timeout)](../03_Website_Quan_tri/01_Quan_tri_he_thong/UC551_to_UC562_Cau_hinh.md#43164-uc553---cấu-hình-thời-gian-chờ-timeout) (mặc định là 15 phút), hệ thống tự động kích hoạt luồng đăng xuất:<br>- Thu hồi phiên làm việc hiện tại trên máy chủ.<br>- Xóa toàn bộ dữ liệu phiên (Session Cookie) trên trình duyệt người dùng.<br>- Ghi nhận nhật ký hệ thống (Audit Log) với phương thức "Đăng xuất tự động do hết hạn phiên".<br>- Chuyển hướng người dùng về [MH01 - Màn hình Đăng nhập khách hàng](UC001_Dang_nhap_khach_hang.md#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid) kèm thông báo "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại." |
