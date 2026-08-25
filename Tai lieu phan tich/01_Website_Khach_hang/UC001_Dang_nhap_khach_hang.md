### 4.1.5. Đăng nhập dành cho Cá nhân/Tổ chức/Cơ quan có thẩm quyền

#### 4.1.5.1. Mục đích
- Cung cấp cơ chế xác thực danh tính cho Cá nhân, Tổ chức và Cơ quan có thẩm quyền truy cập vào Website Khách hàng thông qua 2 hình thức:
  + Đăng nhập qua VNeID (tích hợp qua Cổng Dịch vụ công Quốc gia).
  + Đăng nhập bằng tài khoản và mật khẩu được cấp bởi hệ thống.
- Đảm bảo an toàn bảo mật, phân quyền đúng vai trò và ghi nhận nhật ký truy cập (Audit Logs).

*a. Phân quyền*
- Người dùng: Cá nhân/Tổ chức/Cơ quan có thẩm quyền có tài khoản VNeID hoặc tài khoản do hệ thống cấp.

*b. Điều kiện thực hiện*
- Hệ thống hoạt động bình thường.
- Đối với Đăng nhập qua VNeID: Có kết nối mạng ổn định với Cổng Dịch vụ công Quốc gia (DVCQG) và tài khoản VNeID của người dùng đã được kích hoạt định danh điện tử Mức độ 2 (IAL2) trở lên.
- Đối với Đăng nhập bằng tài khoản được cấp: Người dùng đã được cấp tài khoản nội bộ (Tên đăng nhập và mật khẩu khởi tạo).

---

#### 4.1.5.2. MH01 - Màn hình Đăng nhập khách hàng (Gateway Grid)

##### 4.1.5.2.1. Màn hình
![Màn hình Đăng nhập khách hàng](images/UC001_Login.png)

##### 4.1.5.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Tiêu đề màn hình** | String(255) | - | "ĐĂNG NHẬP HỆ THỐNG ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC" | Control UI: Banner tiêu đề chính có biểu tượng cán cân công lý, đặt ở phần trên cùng của màn hình/popup. |
| **Thẻ "Tài khoản Định danh điện tử (VNeID)"** | String(255) | - | - | Control UI: Thẻ chọn (Card) dành cho công dân đăng nhập bằng VNeID, bao gồm:<br>- Tiêu đề nhóm: **CÔNG DÂN**.<br>- Hình ảnh đại diện (Icon/Logo): Logo VNeID của Bộ Công An (nguồn: `https://xacthuc.dichvucong.gov.vn/authenticationendpoint/images/logo_bca.png`).<br>- Văn bản nhãn thẻ: **Tài khoản Định danh điện tử (VNeID)**. |
| **Thẻ "Tài khoản cấp bởi Hệ thống đăng ký trực tuyến"** | String(255) | - | - | Control UI: Thẻ chọn (Card) dành cho người dùng đăng nhập bằng tài khoản được cấp, bao gồm:<br>- Tiêu đề nhóm: **TÀI KHOẢN ĐƯỢC CẤP**.<br>- Hình ảnh đại diện (Icon/Logo): Logo Cục Đăng ký quốc gia giao dịch bảo đảm (nguồn: `https://dktructuyen.moj.gov.vn/skin/frontend/rwd/default/images/logo_cucdangky.png`).<br>- Văn bản nhãn thẻ: **Tài khoản cấp bởi Hệ thống đăng ký trực tuyến**. |
| **Quay lại trang chủ** | Link/Button | - | - | Control UI: Nút bấm có icon mũi tên quay lại (`fa-arrow-left`), nhãn văn bản: **Quay lại trang chủ**, đặt ở phía dưới cùng căn giữa màn hình. |

##### 4.1.5.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Thẻ "Tài khoản Định danh điện tử (VNeID)" | Card | Người dùng click chọn Thẻ để thực hiện xác thực bằng tài khoản định danh VNeID qua kênh tích hợp Cổng DVCQG/SSO CSDL Quốc gia về dân cư (đường dẫn `https://sso.dancuquocgia.gov.vn`).<br>- Xử lý kết quả callback từ VNeID theo từng trường hợp:<br>+ **TH1 (Mất kết nối)**: Khi gọi API xác thực bị lỗi (Timeout, lỗi kết nối mạng...), hệ thống hiển thị thông báo lỗi **[MSG-ERR-SYS-002]**.<br>+ **TH2 (Xác thực thất bại trên DVCQG/VNeID)**: Khi người dùng thực hiện xác thực không thành công trên giao diện VNeID, hệ thống hiển thị **[MSG-ERR-UC001-004]** và giữ nguyên màn hình đăng nhập.<br>+ **TH3 (Mức độ định danh chưa đạt IAL2)**: Nếu trả về thông tin xác thực nhưng mức độ đảm bảo danh tính (IAL) thấp hơn mức 2, hệ thống từ chối đăng nhập và hiển thị **[MSG-ERR-UC001-005]**.<br>+ **TH4 (Hồ sơ tài khoản không được phép đăng nhập)**: Nếu hồ sơ tài khoản khách hàng đang ở trạng thái `Bị khóa` hoặc `Đóng`, hệ thống từ chối đăng nhập và hiển thị **[MSG-ERR-UC001-006]**.<br>+ **TH5 (Đã tồn tại tài khoản trên hệ thống)**: Hệ thống căn cứ dữ liệu do VNeID trả về để xác định tài khoản xử lý theo từng trường hợp:<br>  * **Cá nhân đăng nhập cho chính mình**: Xác định theo TechID/Số giấy tờ cá nhân. Nếu tài khoản cá nhân đã liên kết nguồn xác thực VNeID và đang `Đang hoạt động`: đăng nhập vào tài khoản đó.<br>  * **Tổ chức đăng nhập bằng định danh của tổ chức**: Xác định theo Mã định danh tổ chức/Mã số thuế/Số giấy phép đầu tư và TechID tổ chức (nếu có). Nếu tài khoản chính tổ chức đã tồn tại và đang `Đang hoạt động`: đăng nhập vào tài khoản đó.<br>  * **Cá nhân đăng nhập với vai trò đại diện/ủy quyền của tổ chức**: Xác định thông tin đăng nhập theo VNeID của cá nhân gắn với tài khoản của tổ chức, Tài khoản của Tổ chức ở trạng thái `Đang hoạt động`.<br>+ **TH6 (Chưa tồn tại tài khoản trên hệ thống)**: Nếu hệ thống chưa tìm thấy tài khoản phù hợp theo ngữ cảnh VNeID, xử lý theo từng trường hợp:<br>  * Nếu là **Cá nhân thuộc tổ chức, nhưng không phải đại diện/ủy quyền của tổ chức**: Hệ thống chặn đăng nhập, không hiển thị màn hình đăng ký và hiển thị **[MSG-ERR-UC001-014]**.<br>  * Nếu là **Cá nhân**: Hệ thống hiển thị màn hình [MH03 - Màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID](#4154-mh03---màn-hình-xác-nhận-và-đăng-ký-thông-tin-tài-khoản-qua-vneid) với Loại chủ thể là **Cá nhân**.<br>  * Nếu **Cá nhân là đại diện của tổ chức**: Hệ thống hiển thị màn hình [MH03 - Màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID](#4154-mh03---màn-hình-xác-nhận-và-đăng-ký-thông-tin-tài-khoản-qua-vneid) với Loại chủ thể là **Tổ chức**.<br>  * Nếu là **Tổ chức**: Hệ thống hiển thị màn hình [MH03 - Màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID](#4154-mh03---màn-hình-xác-nhận-và-đăng-ký-thông-tin-tài-khoản-qua-vneid) với Loại chủ thể là **Tổ chức**.|
| 2 | Chọn Thẻ "Tài khoản cấp bởi Hệ thống đăng ký trực tuyến" | Card | Khi click chọn Thẻ, hệ thống mở màn hình [MH02 - Màn hình Đăng nhập bằng tài khoản và mật khẩu](#4153-mh02---màn-hình-đăng-nhập-bằng-tài-khoản-và-mật-khẩu). |
| 3 | Quay lại trang chủ | Link/Button | Chuyển hướng người dùng quay về Trang chủ Website Khách hàng (hoặc đóng modal đăng nhập). |

---

#### 4.1.5.3. MH02 - Màn hình Đăng nhập bằng tài khoản và mật khẩu

##### 4.1.5.3.1. Màn hình
![Màn hình Đăng nhập bằng tài khoản và mật khẩu](images/UC001_Login.png)

##### 4.1.5.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tên đăng nhập| String(255) | Có | Trống | Control UI: Ô nhập văn bản (Input text).<br>- Nhập Tên đăng nhập, Email hoặc Mã số thuế doanh nghiệp được cấp. |
| Mật khẩu tài khoản | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu (Password).<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Ghi nhớ đăng nhập | Boolean | Không | Uncheck | Control UI: Hộp kiểm (Checkbox).<br>- Cho phép lựa chọn ghi nhớ phiên đăng nhập (30 ngày) trên trình duyệt hiện tại. |
| Quên mật khẩu? | Link | - | - | Control UI: Liên kết văn bản (Link), đặt cùng hàng với checkbox "Ghi nhớ đăng nhập". |

##### 4.1.5.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tích/Bỏ tích "Ghi nhớ đăng nhập" | Checkbox | Người dùng click chọn hoặc bỏ chọn hộp kiểm để thiết lập thời hạn phiên làm việc:<br>- **Tích chọn (Check)**: Kích hoạt cơ chế ghi nhớ phiên. Khi người dùng đăng nhập thành công, hệ thống tạo mã Token an toàn (RememberMe Token) và ghi vào cookie bảo mật trên trình duyệt với thời hạn hiệu lực là 30 ngày.<br>- **Bỏ tích (Uncheck)**: Hủy cơ chế ghi nhớ phiên. Phiên đăng nhập chỉ có hiệu lực theo thời gian chờ phiên thông thường (Session Timeout mặc định 15 phút). |
| 2 | Đăng nhập | Button | Người dùng click nút để thực hiện đăng nhập bằng Tên đăng nhập và Mật khẩu được cấp. Hệ thống kiểm tra:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống highlight viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]** và tự động focus con trỏ vào ô lỗi. Không thực hiện đăng nhập.<br>- **TH2 (Dữ liệu không hợp lệ)**:<br>  + Tên đăng nhập nhập theo định dạng Email nhưng không đúng chuẩn: Vi phạm quy tắc **[BR-VAL-002]**, hiển thị cảnh báo lỗi **[MSG-ERR-VAL-002]**.<br>  + Dữ liệu vượt quá độ dài quy định (Tên đăng nhập > 255 ký tự, Mật khẩu > 20 ký tự): Hiển thị cảnh báo lỗi **[MSG-ERR-UC001-008]** tại trường tương ứng.<br>  Không thực hiện đăng nhập.<br>- **TH3 (Sai thông tin đăng nhập)**: Nếu Tên đăng nhập hoặc Mật khẩu không chính xác, tăng số lần nhập sai liên tiếp thêm 1 và hiển thị thông báo lỗi **[MSG-ERR-UC001-007]**. Nếu số lần nhập sai liên tiếp vượt quá giới hạn tối đa cấu hình tại **[Cấu hình các tham số bảo mật của hệ thống - BR-SEC-050]** (mặc định là 5 lần), hệ thống tạm khóa quyền đăng nhập của tài khoản trong thời gian cấu hình (mặc định là 15 phút) và hiển thị thông báo lỗi **[MSG-ERR-SEC-001]**. Việc tạm khóa này không làm thay đổi trạng thái hoạt động chính của hồ sơ tài khoản.<br>- **TH4 (Hồ sơ tài khoản không được phép đăng nhập)**: Nếu hồ sơ tài khoản đang ở trạng thái `Bị khóa` hoặc `Đóng`, hệ thống từ chối đăng nhập và hiển thị thông báo lỗi **[MSG-ERR-UC001-006]**.<br>- **TH5 (Đổi mật khẩu lần đầu)**: Nếu tài khoản hợp lệ nhưng cờ bắt buộc đổi mật khẩu lần đầu đang bật (`ForcePasswordChange` = true), hệ thống chuyển hướng người dùng sang màn hình [MH04 - Màn hình Đổi mật khẩu lần đầu / Mật khẩu hết hạn](#4155-mh04---màn-hình-đổi-mật-khẩu-lần-đầu--mật-khẩu-hết-hạn).<br>- **TH6 (Mật khẩu hết hạn)**: Nếu khoảng thời gian từ lần đổi mật khẩu gần nhất vượt quá thời hạn hiệu lực cấu hình tại **[Cấu hình thời hạn mật khẩu của hệ thống - BR-SEC-052]** (mặc định là 90 ngày), hệ thống chuyển hướng người dùng sang màn hình [MH04](#4155-mh04---màn-hình-đổi-mật-khẩu-lần-đầu--mật-khẩu-hết-hạn) kèm thông báo yêu cầu cập nhật mật khẩu đã hết hạn.<br>- **TH7 (Xác thực MFA)**: Nếu nhóm tài khoản được kích hoạt cơ chế xác thực đa nhân tố tại **[Cấu hình bảo mật đa nhân tố - MFA]**, hệ thống sinh mã OTP ngẫu nhiên gửi qua Email đăng ký và chuyển hướng sang màn hình [MH05 - Màn hình Xác thực OTP qua Email (MFA)](#4156-mh05---màn-hình-xác-thực-otp-qua-email-mfa).<br>- **TH Hợp lệ (Đăng nhập thành công)**: Reset số lần nhập sai về 0, khởi tạo phiên làm việc (Session) với thời gian timeout cấu hình (mặc định 15 phút), ghi nhận nhật ký đăng nhập (Audit Log) và chuyển hướng người dùng về Trang chủ. |
| 3 | Quên mật khẩu? | Link | Người dùng click liên kết khi không nhớ mật khẩu. Hệ thống lấy trực tiếp giá trị hiện có tại ô "Tên đăng nhập" phía trên và kiểm tra:<br>- **TH1 (Chưa nhập Tên đăng nhập)**: Nếu ô "Tên đăng nhập" đang để trống, vi phạm [BR-VAL-001]. Hệ thống focus, highlight viền đỏ ô "Tên đăng nhập" và hiển thị thông báo lỗi **[MSG-ERR-VAL-001]** yêu cầu nhập Tên đăng nhập trước khi yêu cầu cấp lại mật khẩu. Không thực hiện gửi yêu cầu.<br>- **TH2 (Tên đăng nhập không tồn tại hoặc không có phương thức đăng nhập Nội bộ)**: Nếu giá trị nhập không khớp với bất kỳ tài khoản nào trên hệ thống hoặc tài khoản này chỉ đăng nhập qua VNeID mà không quản lý mật khẩu Nội bộ, hệ thống hiển thị **[MSG-ERR-UC001-003]**.<br>- **TH3 (Hồ sơ tài khoản Bị khóa hoặc Đóng)**: Nếu tài khoản đang ở trạng thái `Bị khóa` hoặc `Đóng`, hệ thống từ chối cấp lại mật khẩu và hiển thị **[MSG-ERR-UC001-006]**.<br>- **TH Hợp lệ**:<br>  + Hệ thống tự động tạo mật khẩu tạm thời ngẫu nhiên mới đáp ứng quy chuẩn độ phức tạp **[BR-VAL-006]**.<br>  + Mã hóa băm một chiều (Hash + Salt) mật khẩu tạm thời trước khi cập nhật vào CSDL.<br>  + Kích hoạt cờ bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo (`ForcePasswordChange` = `True`).<br>  + Gửi email thông báo tài khoản kèm mật khẩu tạm thời mới đến địa chỉ Email đã liên kết với tài khoản.<br>  + Ghi nhận nhật ký hệ thống (Audit Log).<br>  + Hiển thị thông báo thành công **[MSG-SUC-UC001-001]**.<br>  + Giữ nguyên tại màn hình MH02 (không chuyển trang) để người dùng nhập mật khẩu tạm thời vừa nhận được và đăng nhập lại. |
| 4 | Chọn phương thức khác | Link | Đóng form đăng nhập bằng tài khoản/mật khẩu, xóa dữ liệu đã nhập và quay lại màn hình [MH01 - Màn hình Đăng nhập khách hàng](#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid). |

---

#### 4.1.5.4. MH03 - Màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID

##### 4.1.5.4.1. Màn hình
![Màn hình Xác nhận và Đăng ký thông tin qua VNeID](images/UC001_VNeIDRegister.png)

##### 4.1.5.4.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Tài khoản đăng ký | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Chọn nhu cầu sử dụng nhóm chức năng đăng ký BPBĐ. |
| Tài khoản tra cứu | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Chọn nhu cầu sử dụng nhóm chức năng tra cứu/cấp mã số sử dụng CSDL. |
| Thiết lập đăng nhập bằng Email/Mật khẩu | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Nếu tích chọn: hiển thị các trường nhập Email và Mật khẩu trên form. |
| **II. Thông tin Cá nhân** | | | | Chỉ hiển thị khi loại chủ thể là Cá nhân. |
| Loại tài khoản | Enum(String(50)) | Có | Cá nhân | Chỉ đọc. |
| Email (Tên đăng nhập) | String(255) | Có điều kiện | Theo Email VNeID nếu có | Chỉ hiển thị và bắt buộc khi chọn "Thiết lập đăng nhập bằng Email/Mật khẩu". Áp dụng [BR-VAL-002] và [BR-VAL-009]. |
| Mật khẩu đăng nhập | Password | Có điều kiện | Trống | Chỉ hiển thị và bắt buộc khi chọn "Thiết lập đăng nhập bằng Email/Mật khẩu". Áp dụng [BR-VAL-006]. |
| Nhập lại mật khẩu | Password | Có điều kiện | Trống | Chỉ hiển thị và bắt buộc khi chọn "Thiết lập đăng nhập bằng Email/Mật khẩu". |
| Loại giấy tờ | Enum(String(50)) | Có | Lấy từ VNeID | Chỉ đọc. |
| Số giấy tờ | String(255) | Có | Lấy từ VNeID | Chỉ đọc. |
| Họ và tên | String(255) | Có | Lấy từ VNeID | Chỉ đọc. |
| Ngày sinh | Date | Không | Lấy từ VNeID | Lấy từ VNeID nếu có, cho phép nhập nếu trống. |
| Giới tính | Enum(String(50)) | Không | Lấy từ VNeID | Lấy từ VNeID nếu có, cho phép chọn nếu trống. |
| Quốc tịch | Enum(String(100)) | Có | Lấy từ VNeID | Control UI: Hộp chọn. |
| Số điện thoại | String(20) | Không | Lấy từ VNeID nếu có | Cho phép bổ sung/cập nhật. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc tịch | Tự động gợi ý: `Trong nước` (nếu Quốc tịch Việt Nam) hoặc `Nước ngoài`. |
| Tỉnh/Thành phố | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. |
| Phường/Xã | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15]. |
| Địa chỉ chi tiết | Text(1000) | Có | Lấy từ VNeID nếu có | Nhập số nhà, tên đường/thôn xóm. Áp dụng [BR-VAL-001]. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo cấu hình | Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08]. |
| Cây phân quyền | Tree/Checkbox | Có | Theo nhu cầu sử dụng | Danh sách quyền tương ứng nhóm chức năng đã chọn. |
| **III. Thông tin Tổ chức** | | | | Chỉ hiển thị khi chủ thể là Tổ chức hoặc Đại diện tổ chức. |
| Loại tài khoản | Enum(String(50)) | Có | Tổ chức | Chỉ đọc. |
| Loại tổ chức | Enum(String(100)) | Có | Theo VNeID/cấu hình | Control UI: Hộp chọn. |
| Mã định danh tổ chức | String(100) | Có | Lấy từ VNeID | Chỉ đọc. |
| Mã số thuế/Số giấy phép | String(100) | Có | Lấy từ VNeID nếu có | Cho phép nhập nếu VNeID không trả về. |
| Tên tổ chức | String(255) | Có | Lấy từ VNeID | Chỉ đọc. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có điều kiện | Theo Email VNeID nếu có | Áp dụng [BR-VAL-002] và [BR-VAL-009]. |
| Mật khẩu đăng nhập | Password | Có điều kiện | Trống | Áp dụng [BR-VAL-006]. |
| Nhập lại mật khẩu | Password | Có điều kiện | Trống | Phải trùng khớp với Mật khẩu đăng nhập. |
| Quốc gia đăng ký | Enum(String(100)) | Có | Lấy từ VNeID | Control UI: Hộp chọn. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc gia đăng ký | Gồm `Trong nước` hoặc `Nước ngoài`. |
| Tỉnh/Thành phố | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu [DM_13]. |
| Phường/Xã | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu [DM_15]. |
| Địa chỉ chi tiết | Text(1000) | Có | Lấy từ VNeID nếu có | Áp dụng [BR-VAL-001]. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo cấu hình | Tham chiếu [DM_08]. |
| Khối Người đại diện / Chủ thể xác thực | - | - | Lấy từ VNeID | Chỉ đọc (Họ tên, Loại giấy tờ, Số giấy tờ, TechID, Vai trò). |
| Cây phân quyền | Tree/Checkbox | Có | Theo nhu cầu sử dụng | Danh sách quyền tương ứng nhóm chức năng đã chọn. |

##### 4.1.5.4.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn/Bỏ chọn Tài khoản đăng ký / Tài khoản tra cứu | Checkbox | Cập nhật Cây phân quyền tương ứng trên form theo nhu cầu sử dụng. |
| 2 | Chọn/Bỏ chọn Thiết lập đăng nhập bằng Email/Mật khẩu | Checkbox | Ẩn/hiện các ô nhập Email và Mật khẩu tương ứng. |
| 3 | Hoàn tất đăng ký | Button | Người dùng click nút để xác nhận tạo hoặc liên kết tài khoản. Hệ thống kiểm tra:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc **[BR-VAL-001]**, hệ thống focus và highlight viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**.<br>- **TH2 (Chưa chọn nhu cầu sử dụng)**: Nếu người dùng không chọn "Tài khoản đăng ký" và không chọn "Tài khoản tra cứu", hệ thống hiển thị thông báo lỗi **[MSG-ERR-UC001-010]**. Không cho phép hoàn tất.<br>- **TH3 (Email sai định dạng)**: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Email nhập không đúng định dạng, vi phạm **[BR-VAL-002]**, hiển thị thông báo lỗi **[MSG-ERR-VAL-002]**.<br>- **TH4 (Mật khẩu không đạt độ phức tạp)**: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Mật khẩu không đáp ứng quy chuẩn độ dài 8-20 ký tự gồm chữ hoa, chữ thường, số, ký tự đặc biệt, vi phạm **[BR-VAL-006]**, hiển thị thông báo lỗi **[MSG-ERR-VAL-006]**.<br>- **TH5 (Nhập lại mật khẩu không khớp)**: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Nhập lại mật khẩu không trùng khớp, hiển thị thông báo lỗi **[MSG-ERR-VAL-011]**.<br>- **TH6 (Email đăng nhập Nội bộ bị trùng)**: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Email đã tồn tại ở nguồn xác thực Nội bộ của tài khoản khác trên hệ thống, vi phạm **[BR-VAL-009]**, hiển thị thông báo lỗi **[MSG-ERR-VAL-009]**.<br>- **TH7 (Đăng ký thành công - Chỉ chọn Tài khoản đăng ký)**: Hệ thống tạo/liên kết hồ sơ tài khoản khách hàng với nguồn xác thực VNeID (và nguồn xác thực Nội bộ nếu có chọn), khởi tạo phiên đăng nhập và chuyển hướng về Trang chủ.<br>- **TH8 (Đăng ký thành công - Có chọn Tài khoản tra cứu)**: Hệ thống tạo/liên kết hồ sơ tài khoản khách hàng theo TH7, đồng thời khởi tạo Yêu cầu cấp mã số sử dụng CSDL loại `Thường xuyên` theo đúng quy định và chuyển hướng người dùng sang Cổng thanh toán. (Check hỏi lại thêm với khách hàng xem có cần thiết bắt buộc phải thanh toán luôn không? Hay chỉ liên quan tới việc Tạo quyền trên hệ thống)|
| 4 | Quay lại | Link/Button | Hủy dữ liệu đang nhập và quay lại [MH01 - Màn hình Đăng nhập khách hàng](#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid). |

---

#### 4.1.5.5. MH04 - Màn hình Đổi mật khẩu lần đầu / Mật khẩu hết hạn

##### 4.1.5.5.1. Màn hình
![Màn hình Đổi mật khẩu lần đầu](images/UC001_ChangePassword.png)

##### 4.1.5.5.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mật khẩu hiện tại | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu hiện tại. |
| Mật khẩu mới | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu mới. Áp dụng quy tắc phức tạp [BR-VAL-006]. |
| Xác nhận mật khẩu mới | String(20) | Có | Trống | Control UI: Ô nhập lại mật khẩu mới. |

##### 4.1.5.5.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu mật khẩu | Button | Người dùng click nút để cập nhật mật khẩu mới. Hệ thống kiểm tra:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc **[BR-VAL-001]**, focus và highlight viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**.<br>- **TH2 (Dữ liệu vượt quá độ dài hoặc ký tự không hợp lệ)**: Hiển thị cảnh báo lỗi **[MSG-ERR-UC001-008]** tại trường tương ứng.<br>- **TH3 (Mật khẩu mới không đạt độ phức tạp)**: Vi phạm quy tắc độ phức tạp mật khẩu **[BR-VAL-006]**, hiển thị thông báo lỗi **[MSG-ERR-VAL-006]**.<br>- **TH4 (Xác nhận mật khẩu mới không khớp)**: Hiển thị thông báo lỗi **[MSG-ERR-VAL-011]** tại ô Nhập lại mật khẩu mới.<br>- **TH5 (Mật khẩu mới trùng mật khẩu cũ)**: Vi phạm quy tắc không được đặt trùng mật khẩu hiện tại **[BR-VAL-010]**, hiển thị thông báo lỗi **[MSG-ERR-VAL-010]**.<br>- **TH6 (Mật khẩu hiện tại không chính xác)**: Nếu Mật khẩu hiện tại nhập vào không khớp với mật khẩu đang lưu trong hệ thống, hiển thị thông báo lỗi **[MSG-ERR-UC001-012]**.<br>- **TH Hợp lệ (Lưu mật khẩu thành công)**: Hệ thống mã hóa băm mật khẩu mới (Hash + Salt) lưu CSDL, tắt cờ bắt buộc đổi mật khẩu (`ForcePasswordChange` = false), cập nhật ngày đổi mật khẩu gần nhất, ghi nhận nhật ký (Audit Log), hiển thị thông báo thành công **[MSG-SUC-SYS-004]** và chuyển hướng về Trang chủ. |
| 2 | Hủy | Button | Hủy phiên đăng nhập tạm thời và quay về [MH01 - Màn hình Đăng nhập khách hàng](#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid). |

---

#### 4.1.5.6. MH05 - Màn hình Xác thực OTP qua Email (MFA)

##### 4.1.5.6.1. Màn hình
![Màn hình Xác thực OTP](images/UC001_OTP.png)

##### 4.1.5.6.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Mã xác thực OTP** | String(6) | Có | Trống | Control UI: Ô nhập 6 chữ số OTP. |
| **Bộ đếm ngược thời gian** | Datetime | - | 120 giây | Control UI: Đồng hồ đếm ngược hiệu lực của mã OTP. |

##### 4.1.5.6.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận | Button | Người dùng click nút để gửi mã xác thực OTP hoàn tất đăng nhập. Hệ thống kiểm tra:<br>- **TH1 (Bỏ trống mã OTP)**: Vi phạm [BR-VAL-001], highlight viền đỏ ô nhập OTP và hiển thị [MSG-ERR-VAL-001].<br>- **TH2 (Sai định dạng mã OTP)**: Nếu mã OTP không đủ 6 chữ số hoặc chứa ký tự khác số, hiển thị thông báo lỗi [MSG-ERR-SEC-004].<br>- **TH3 (Mã OTP đã hết hiệu lực)**: Nếu thời gian nhập vượt quá 120 giây của đồng hồ đếm ngược, hiển thị thông báo lỗi **[MSG-ERR-SEC-003]**.<br>- **TH4 (Mã OTP không chính xác)**: Nếu mã nhập vào không trùng khớp với mã OTP hệ thống đã sinh, tăng số lần nhập sai và hiển thị thông báo lỗi **[MSG-ERR-SEC-002]**. Nếu sai quá 3 lần, hủy hiệu lực mã OTP và yêu cầu lấy mã mới.<br>- **TH Hợp lệ (Xác thực OTP thành công)**: Khởi tạo phiên làm việc chính thức (Session), ghi nhận nhật ký đăng nhập (Audit Log) và chuyển hướng người dùng về Trang chủ. |
| 2 | Gửi lại mã OTP | Link | Sinh mã OTP ngẫu nhiên mới, gửi email xác thực đến địa chỉ email tài khoản và reset lại đồng hồ đếm ngược 120 giây. |
| 3 | Quay lại | Link | Hủy luồng xác thực OTP hiện tại và quay về [MH01 - Màn hình Đăng nhập khách hàng](#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid). |
