### 4.1.7. UCPS004 - Đăng xuất tài khoản khách hàng

#### 4.1.7.1. Mục đích

\- Cung cấp cơ chế kết thúc phiên làm việc (Session) an toàn cho Khách hàng (bao gồm loại tài khoản Thường xuyên và Một lần) trên Website Khách hàng.  
\- Hủy bỏ các token bảo mật, cookie phiên hoạt động nhằm ngăn ngừa rủi ro bị chiếm đoạt tài khoản hoặc truy cập trái phép.  
\- Quản lý vòng đời và tự động hóa việc dọn dẹp các tài khoản Một lần sau khi đăng xuất.  

*a. Phân quyền*

\- Người dùng: Cá nhân/Tổ chức có tài khoản Một lần hoặc tài khoản Thường xuyên đang đăng nhập trên hệ thống.  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập vào hệ thống (phiên làm việc vẫn còn hiệu lực).  
\- Hệ thống hoạt động bình thường.  

#### 4.1.7.2. UCPS004.MH01 - Chức năng Đăng xuất khách hàng

##### 4.1.7.2.1. Vị trí chức năng

\- Giao diện nút/liên kết "Đăng xuất" nằm tại thanh tiêu đề đầu trang (Header) của Website Khách hàng, bên cạnh thông tin tên tài khoản người dùng đang đăng nhập.  

##### 4.1.7.2.2. Chức năng và kịch bản xử lý chi tiết

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đăng xuất | Nút / Link | Người dùng click vào nút "Đăng xuất" để thoát khỏi hệ thống. Hệ thống thực hiện bóc tách xử lý theo phân loại tài khoản đăng nhập hiện tại: |
| | | | \- **Trường hợp 1 (Tài khoản loại Thường xuyên):**<br>\- Hệ thống thực hiện thu hồi và hủy bỏ phiên làm việc (Session) hiện tại trên máy chủ (Application Server).<br>\- Thu hồi và xóa bỏ mã Token Ghi nhớ đăng nhập (RememberMe Token) trong Cơ sở dữ liệu và trên Cookie trình duyệt (nếu có tích chọn "Ghi nhớ đăng nhập" ở màn đăng nhập).<br>\- Xóa toàn bộ dữ liệu tạm trong Session Cookie (Secure & HttpOnly) trên trình duyệt người dùng.<br>\- Ghi nhận nhật ký hệ thống (Audit Log) bao gồm: Tên đăng nhập, Thời gian đăng xuất, Địa chỉ IP và phương thức: "Đăng xuất chủ động - Thường xuyên".<br>\- Chuyển hướng người dùng về Màn hình Đăng nhập khách hàng (UC001.MH01) kèm Toast thông báo: "Đăng xuất thành công." |
| | | | \- **Trường hợp 2 (Tài khoản loại Một lần):**<br>\- Hệ thống thực hiện thu hồi và hủy bỏ phiên làm việc (Session) hiện tại trên máy chủ (Application Server).<br>\- Cập nhật trạng thái của tài khoản trong CSDL từ `'Tạm thời'` (Active) sang `'Hết hạn'` (Expired) nhằm vô hiệu hóa hoàn toàn khả năng sử dụng lại tài khoản tạm thời này để đăng nhập.<br>\- Xóa toàn bộ dữ liệu phiên trên trình duyệt người dùng (Session Cookie).<br>\- Ghi nhận nhật ký hệ thống (Audit Log) bao gồm: Số định danh cá nhân CCCD, Họ tên, Thời gian đăng xuất, Địa chỉ IP và phương thức: "Đăng xuất chủ động - Một lần". Lịch sử các giao dịch đã thực hiện trong phiên vẫn được giữ nguyên để phục vụ đối soát.<br>\- Khởi chạy tiến trình ngầm (Cron Job) quét dọn dẹp vật lý (Hard Delete) xóa bỏ vĩnh viễn tài khoản có trạng thái `'Hết hạn'` khỏi bảng khách hàng sau 24 giờ kể từ lúc đăng xuất.<br>\- Chuyển hướng người dùng về Màn hình Đăng nhập khách hàng (UC001.MH01) kèm Toast thông báo: "Đăng xuất thành công. Phiên làm việc Một lần đã kết thúc." |
| | | | \- **Trường hợp 3 (Hết thời gian chờ - Auto Logout do Timeout):**<br>\- Nếu người dùng không thực hiện bất kỳ thao tác nào vượt quá thời gian cấu hình chờ (timeout) tại [UC553](#43164-uc553---cau-hinh-thoi-gian-cho-timeout) (mặc định là 15 phút):<br>&nbsp;&nbsp;\+ Hệ thống tự động kích hoạt luồng đăng xuất tự động.<br>&nbsp;&nbsp;\+ Kiểm tra loại tài khoản:<br>&nbsp;&nbsp;\* Nếu là tài khoản *Thường xuyên*: Tiến hành thu hồi session và chuyển về màn hình đăng nhập (UC001.MH01) kèm thông báo: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại." Ghi log: "Đăng xuất tự động do hết hạn phiên - Thường xuyên".<br>&nbsp;&nbsp;\* Nếu là tài khoản *Một lần*: Thực hiện thu hồi session, cập nhật trạng thái tài khoản thành `'Hết hạn'`, xóa cookie và ghi log: "Đăng xuất tự động do hết hạn phiên - Một lần". Chuyển về màn hình đăng nhập (UC001.MH01) kèm thông báo: "Phiên làm việc Một lần của bạn đã hết hạn." |
