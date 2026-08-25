### 4.1.7. UC002 - Xem thông tin tài khoản dành cho Khách hàng

#### 4.1.7.1. Mục đích

- Cho phép Khách hàng đã đăng nhập xem thông tin hồ sơ tài khoản của mình tại menu người dùng **Hồ sơ cá nhân** trên Website Khách hàng.
- Hiển thị thông tin tài khoản theo đúng **Loại khách hàng** của hồ sơ đang đăng nhập: `Cá nhân` hoặc `Tổ chức`.
- Hiển thị thông tin **Loại tài khoản** theo đúng vai trò/tài khoản người dùng đang đăng nhập: `Tài khoản chính` hoặc `Tài khoản phụ`.
- Hiển thị trạng thái các phương thức đăng nhập đang liên kết với cùng hồ sơ tài khoản: `VNeID` và `Nội bộ (Email/Mật khẩu)`.
- Cho phép người dùng chuyển sang màn hình **Cập nhật thông tin tài khoản**, thiết lập thêm phương thức đăng nhập Nội bộ hoặc đổi mật khẩu Nội bộ nếu đã thiết lập.

**Phân quyền**

- Khách hàng đã đăng nhập thành công vào Website Khách hàng.
- Áp dụng cho tài khoản Khách hàng là `Cá nhân` và `Tổ chức`.

**Điều kiện thực hiện**

- Phiên đăng nhập còn hiệu lực.
- Hồ sơ tài khoản khách hàng tồn tại trên hệ thống và chưa ở trạng thái đóng/xóa.
- Hệ thống truy xuất được thông tin hồ sơ tài khoản, loại tài khoản của người dùng đang đăng nhập và thông tin nguồn xác thực liên kết.

#### 4.1.7.2. UC002.MH01 - Xem chi tiết tài khoản

##### 4.1.7.2.1. Màn hình


##### 4.1.7.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin tài khoản chung** | - | - | - | Khối luôn hiển thị cho cả tài khoản `Cá nhân` và `Tổ chức`. Toàn bộ thông tin trong khối là thông tin chỉ đọc, gắn với hồ sơ tài khoản của người dùng đang đăng nhập. |
| Loại khách hàng | Enum(String(50)) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị loại khách hàng gắn với hồ sơ tài khoản của người dùng đang đăng nhập: `Cá nhân` hoặc `Tổ chức`. |
| Loại tài khoản | Enum(String(50)) | Có | Theo người dùng đang đăng nhập | Chỉ đọc. Hiển thị loại tài khoản của người dùng đang đăng nhập: `Tài khoản chính` hoặc `Tài khoản phụ`. |
| Nguồn xác thực | Enum(String(100)) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị nguồn xác thực đang liên kết với hồ sơ tài khoản của người dùng đang đăng nhập: `VNeID`, `Nội bộ` hoặc `VNeID, Nội bộ`. |
| **II.A. Thông tin khách hàng Cá nhân** | - | - | - | Khối chỉ hiển thị khi `Loại khách hàng = Cá nhân`; ẩn khi `Loại khách hàng = Tổ chức`. Toàn bộ thông tin trong khối là thông tin chỉ đọc, gắn với hồ sơ tài khoản cá nhân của người dùng đang đăng nhập. |
| Loại giấy tờ | Enum(String(50)) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị loại giấy tờ pháp lý của cá nhân, ví dụ: `Căn cước công dân`, `Chứng minh nhân dân`, `Hộ chiếu`. |
| Số giấy tờ | String(50) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị số giấy tờ chứng minh tư cách pháp lý của cá nhân. |
| Tên khách hàng | String(255) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị họ và tên của khách hàng cá nhân. |
| Ngày sinh | Date | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị ngày tháng năm sinh của cá nhân, định dạng `DD/MM/YYYY`. |
| Giới tính | Enum(String(20)) | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị giới tính của cá nhân: `Nam`, `Nữ` hoặc `Khác`. |
| Quốc tịch | String(255) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị quốc tịch của cá nhân. |
| Email (Tên đăng nhập) | String(255) | Có theo hồ sơ | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị email gắn với hồ sơ tài khoản cá nhân. Nếu tài khoản đã liên kết Email/Mật khẩu Nội bộ, email này đồng thời là tên đăng nhập hệ thống. |
| Số điện thoại | String(20) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị số điện thoại liên hệ gắn với hồ sơ tài khoản cá nhân. |
| **II.B. Thông tin khách hàng Tổ chức** | - | - | - | Khối chỉ hiển thị khi `Loại khách hàng = Tổ chức`; ẩn khi `Loại khách hàng = Cá nhân`. Toàn bộ thông tin trong khối là thông tin chỉ đọc, gắn với hồ sơ tài khoản tổ chức của người dùng đang đăng nhập. |
| Loại tổ chức | Enum(String(100)) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị loại tổ chức đã lưu của tài khoản tổ chức, ví dụ: `Tổ chức có đăng ký kinh doanh trong nước`, `Tổ chức nước ngoài`. |
| Mã định danh tổ chức | String(100) | Có theo loại tổ chức | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị mã định danh tổ chức đã lưu gắn với hồ sơ tài khoản tổ chức trong nước. |
| Mã số thuế/Số giấy phép đầu tư | String(100) | Có theo loại tổ chức | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị mã số thuế hoặc số giấy phép đầu tư đã lưu gắn với hồ sơ tài khoản tổ chức nước ngoài. |
| Tên tổ chức | String(255) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị tên tổ chức đã lưu gắn với hồ sơ tài khoản tổ chức. |
| Quốc gia đăng ký | String(255) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị quốc gia đăng ký đã lưu gắn với hồ sơ tài khoản tổ chức. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có theo hồ sơ | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị email gắn với hồ sơ tài khoản tổ chức. Nếu tài khoản đã liên kết Email/Mật khẩu Nội bộ, email này đồng thời là tên đăng nhập hệ thống. |
| Số điện thoại tổ chức | String(20) | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị số điện thoại liên hệ gắn với hồ sơ tài khoản tổ chức. |
| Họ tên người đại diện | String(255) | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị họ tên người đại diện đã lưu gắn với hồ sơ tài khoản tổ chức. |
| Loại giấy tờ người đại diện | Enum(String(50)) | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị loại giấy tờ pháp lý của người đại diện đã lưu, ví dụ: `Căn cước công dân`, `Chứng minh nhân dân`, `Hộ chiếu`. |
| Số giấy tờ người đại diện | String(50) | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị số giấy tờ pháp lý của người đại diện đã lưu gắn với hồ sơ tài khoản tổ chức. |
| **III. Thông tin địa chỉ & Thiết lập sử dụng** | - | - | - | Khối dùng chung cho cả tài khoản `Cá nhân` và `Tổ chức`. Toàn bộ thông tin trong khối là thông tin chỉ đọc, gắn với hồ sơ tài khoản của người dùng đang đăng nhập. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị phân loại khách hàng gắn với hồ sơ tài khoản: `Trong nước` hoặc `Nước ngoài`. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Theo hồ sơ tài khoản | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Theo hồ sơ tài khoản | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Không | Theo hồ sơ tài khoản | Control UI: Textarea / Input text.<br>- Nhập/hiển thị số nhà, tên đường/phố, thôn/xóm/ấp... |
| Trung tâm Đăng ký mặc định | String(255) | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị Trung tâm Đăng ký mặc định đã lưu gắn với hồ sơ tài khoản. |
| Nhu cầu sử dụng tài khoản | List(String) | Không | Theo hồ sơ tài khoản | Chỉ đọc. Hiển thị nhu cầu sử dụng tài khoản đã lưu, dạng chip, gồm một hoặc nhiều giá trị: `Đăng ký`, `Tra cứu`. |
| **IV. Trạng thái Phương thức đăng nhập** | - | - | - | - Khối hiển thị dạng 2 Card/Thẻ trạng thái.<br>- Luôn hiển thị cho cả tài khoản `Cá nhân` và `Tổ chức`.<br>- Thông tin trong khối phản ánh trạng thái liên kết phương thức đăng nhập của hồ sơ tài khoản đang đăng nhập. |
| Phương thức VNeID / DVCQG | Card/Badge | Không | Theo hồ sơ tài khoản | - Tiêu đề thẻ: `VNeID`.<br>- Dòng mô tả phụ trên giao diện: `Đăng nhập bằng thông tin định danh đã xác thực qua DVCQG/VNeID`.<br>- Trạng thái `Đã liên kết` (Badge xanh lá): Hiển thị khi hồ sơ tài khoản có nguồn xác thực VNeID.<br>- Trạng thái `Chưa liên kết` (Badge màu xám): Hiển thị khi hồ sơ tài khoản chưa liên kết nguồn VNeID. |
| Phương thức Nội bộ (Email/Mật khẩu) | Card/Badge | Không | Theo hồ sơ tài khoản | - Tiêu đề thẻ: `Nội bộ (Email/Mật khẩu)`.<br>- Dòng mô tả phụ trên giao diện: `Sử dụng Email làm tên đăng nhập trên hệ thống BPBĐ`.<br>- Trạng thái `Đã liên kết` (Badge xanh lá): Hiển thị khi hồ sơ đã thiết lập mật khẩu nội bộ.<br>- Khi trạng thái là `Đã liên kết`, hiển thị kèm Email đăng nhập và nút bấm `[Đổi mật khẩu]`.<br>- Trạng thái `Chưa thiết lập` (Badge màu vàng/xám): Hiển thị khi tài khoản chưa tạo mật khẩu nội bộ.<br>- Khi trạng thái là `Chưa thiết lập`, hiển thị kèm nút bấm `[Thiết lập ngay]`. |

##### 4.1.7.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Button | - Chuyển sang màn hình UC003 - Cập nhật thông tin tài khoản.<br>- Hệ thống giữ nguyên Loại khách hàng (`Cá nhân`/`Tổ chức`) của hồ sơ để hiển thị đúng form cập nhật. |
| 2 | Đóng | Button | - Đóng màn hình xem chi tiết và quay về Trang chủ Website Khách hàng. |
| 3 | Thiết lập ngay | Button | Khi click, mở Popup UC002.MH02 - Thiết lập phương thức đăng nhập Nội bộ. |
| 4 | Đổi mật khẩu | Button | Khi click, điều hướng người dùng sang màn hình UCPS006 - Đổi mật khẩu. |

#### 4.1.7.4. UC002.MH02 - Popup Thiết lập phương thức đăng nhập Nội bộ

##### 4.1.7.4.1. Màn hình

- Popup hiển thị khi người dùng click `Thiết lập ngay` tại thẻ `Nội bộ (Email/Mật khẩu)` trên màn hình xem chi tiết tài khoản.
- Popup mở trên màn hình UC002 hiện tại, không chuyển trang.
- Mục đích: gắn thêm nguồn xác thực Nội bộ vào cùng hồ sơ tài khoản khách hàng đang đăng nhập, không tạo hồ sơ tài khoản mới.
- Các trường mật khẩu có icon con mắt để ẩn/hiện ký tự.

##### 4.1.7.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Email (Tên đăng nhập) | String(255) | Có | Theo email hồ sơ nếu có | - Input văn bản.<br>- Cho phép sửa trước khi lưu.<br>- Dùng làm tên đăng nhập phương thức Nội bộ của tài khoản. |
| Mật khẩu mới | Password | Có | Trống | - Input mật khẩu (ẩn ký tự dạng dấu chấm).<br>- Yêu cầu độ dài 8-20 ký tự, chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt theo [BR-VAL-006].<br>- Có icon con mắt để ẩn/hiện mật khẩu. |
| Nhập lại mật khẩu | Password | Có | Trống | - Input mật khẩu xác nhận.<br>- Bắt buộc phải trùng khớp 100% với Mật khẩu mới.<br>- Có icon con mắt để ẩn/hiện mật khẩu. |

##### 4.1.7.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu thiết lập | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
| | | | **TH1 - Bỏ trống trường bắt buộc**: Nếu Email, Mật khẩu mới hoặc Nhập lại mật khẩu bị bỏ trống, vi phạm quy tắc [BR-VAL-001], hệ thống tô viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi [MSG-ERR-VAL-001] màu đỏ ngay dưới ô nhập và tự động focus con trỏ vào ô lỗi đầu tiên. Không cho phép lưu. |
| | | | **TH2 - Email không đúng định dạng**: Nếu Email sai định dạng cú pháp, vi phạm quy tắc [BR-VAL-002], hệ thống hiển thị thông báo lỗi [MSG-ERR-VAL-002] dưới ô Email. Không cho phép lưu. |
| | | | **TH3 - Email đã tồn tại**: Nếu Email đã được dùng làm tên đăng nhập Nội bộ của tài khoản khác đang hoạt động trên hệ thống, vi phạm quy tắc [BR-VAL-009], hệ thống hiển thị thông báo lỗi [MSG-ERR-VAL-009]. Không cho phép lưu. |
| | | | **TH4 - Mật khẩu chưa đạt quy tắc bảo mật**: Nếu Mật khẩu mới không đủ 8-20 ký tự hoặc thiếu chữ hoa, chữ thường, số, ký tự đặc biệt, vi phạm quy tắc [BR-VAL-006], hệ thống hiển thị thông báo lỗi [MSG-ERR-VAL-006]. Không cho phép lưu. |
| | | | **TH5 - Nhập lại mật khẩu không khớp**: Nếu Nhập lại mật khẩu khác Mật khẩu mới, vi phạm quy tắc [BR-VAL-011], hệ thống hiển thị thông báo lỗi [MSG-ERR-VAL-011] dưới ô Nhập lại mật khẩu. Không cho phép lưu. |
| | | | **TH Hợp lệ**: Hệ thống thực hiện băm/mã hóa mật khẩu, gắn nguồn xác thực Nội bộ vào hồ sơ tài khoản hiện tại, cập nhật email đăng nhập, ghi Audit Log, đóng popup, hiển thị thông báo thành công [MSG-SUC-AUTH-001] dạng Toast và cập nhật trạng thái thẻ Nội bộ ở màn hình Xem chi tiết sang `Đã liên kết` kèm nút [Đổi mật khẩu]. |
| 2 | Hủy | Button | Đóng popup, không lưu bất kỳ thay đổi nào và giữ nguyên trạng thái màn hình xem chi tiết. |
| 3 | Ẩn/hiện mật khẩu | Icon | Chuyển đổi trạng thái hiển thị giữa che ký tự (password) và hiển thị ký tự (text) của ô mật khẩu tương ứng. |
