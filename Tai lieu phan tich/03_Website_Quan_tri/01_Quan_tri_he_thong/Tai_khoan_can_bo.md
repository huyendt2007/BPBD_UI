#### 4.3.1.3. Quản lý tài khoản cán bộ

##### 4.3.1.3.1. Mục đích
Quản lý hồ sơ tài khoản cán bộ và cán bộ thuộc cơ quan ngoài ngành trên toàn hệ thống Đăng ký biện pháp bảo đảm, bao gồm:
- Tra cứu, lọc và xem danh sách tài khoản cán bộ theo phân cấp quản lý của đơn vị trực thuộc.
- Thêm mới tài khoản cán bộ thủ công hoặc nạp dữ liệu hàng loạt từ tệp Excel (Import).
- Cập nhật thông tin cán bộ, cơ cấu tổ chức và cấu hình phân quyền theo nhóm người dùng/vai trò.
- Khóa, mở khóa, đóng tài khoản và xóa tài khoản cán bộ.
- Đặt lại mật khẩu khởi tạo cho cán bộ.
- Xem chi tiết toàn diện thông tin tài khoản và cây phân quyền chỉ đọc.

a. Phân quyền
- Quản trị hệ thống (QTHT).

b. Điều kiện thực hiện
- Cán bộ quản trị đã đăng nhập thành công vào Website Quản trị.

---

##### 4.3.1.3.2. MH01 - Màn hình Tra cứu danh sách tài khoản cán bộ

###### 4.3.1.3.2.1. Màn hình

![Màn hình Tra cứu tài khoản cán bộ](../../images/UC595/UC595_01_MH01_Tra_cuu_tai_khoan_can_bo.png)

###### 4.3.1.3.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Khối tiêu chí tra cứu và lọc danh sách tài khoản cán bộ. |
| Họ và tên | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo họ và tên cán bộ. |
| Email | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo địa chỉ Email cán bộ. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo số điện thoại liên hệ. |
| Đơn vị | Enum(String(100)) | Không | Đơn vị của NSD | Control UI: Combobox.<br>- **Theo phân cấp quản lý:** Danh sách đơn vị hiển thị phụ thuộc vào Đơn vị của NSD đang đăng nhập (chỉ được chọn Đơn vị mình trực thuộc và các Đơn vị cấp dưới trực thuộc, không hiển thị Đơn vị cấp trên hoặc Đơn vị cùng cấp khác). Mặc định ban đầu là Đơn vị của NSD. |
| Loại đơn vị | Enum(String(100)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Nội bộ<br>+ Cơ quan ngoài ngành |
| Phòng ban | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Các Phòng ban thuộc Đơn vị đã chọn |
| Chức vụ | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Các Chức vụ trong hệ thống |
| Vai trò | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Các vai trò đang có hiệu lực |
| Nhóm người dùng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Các nhóm người dùng đang có hiệu lực |
| Từ ngày | Date | Không | Ngày hiện tại trừ 3 tháng | Control UI: Datepicker.<br>- Lọc theo ngày tạo tài khoản, định dạng nhập `dd/mm/yyyy`.<br>- Mặc định là ngày đầu tiên của khoảng 3 tháng gần nhất tính đến ngày hiện tại.<br>- Rule so sánh khoảng ngày - **[BR-VAL-007]**. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo ngày tạo tài khoản, định dạng nhập `dd/mm/yyyy`.<br>- Mặc định là ngày hiện tại.<br>- Nếu Từ ngày lớn hơn Đến ngày, vi phạm **[BR-VAL-007]**, hiển thị **[MSG-ERR-VAL-007]**. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| **II. Bảng danh sách kết quả** | - | - | 50 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách tài khoản thuộc Đơn vị của NSD đang đăng nhập trở xuống.<br>- Sắp xếp mặc định theo Ngày tạo giảm dần.<br>- Hiển thị tổng số bản ghi phù hợp bộ lọc tại góc trái cuối danh sách.<br>- Tùy chọn số bản ghi/trang: 50, 100, 200, mặc định 50.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng, in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số thứ tự tăng dần theo danh sách hiển thị. |
| Họ và tên | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tên đầy đủ của cán bộ. |
| Tên đăng nhập | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tên đăng nhập (Email). |
| Đơn vị - Phòng ban | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Thông tin Đơn vị và Phòng ban trực thuộc. |
| Loại đơn vị | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Nội bộ<br>+ Cơ quan ngoài ngành |
| Chức vụ | String(100) | - | - | Control UI: Text hiển thị (Read-only).<br>- Chức vụ của cán bộ. |
| Nhóm / Vai trò | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Danh sách Nhóm người dùng và Vai trò đã gán. |
| Ngày tạo | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Thao tác | String(255) | - | - | Control UI: Nhóm nút/icon thao tác.<br>- **Điều kiện hiển thị từng nút**:<br>+ **Đặt lại mật khẩu**: Chỉ hiển thị khi trạng thái là `Đang hoạt động`.<br>+ **Cập nhật**: Chỉ hiển thị khi trạng thái là `Đang hoạt động`.<br>+ **Khóa / Mở khóa**: Chỉ hiển thị khi trạng thái là `Đang hoạt động` (icon Khóa) hoặc `Bị khóa` (icon Mở khóa).<br>+ **Đóng**: Chỉ hiển thị khi trạng thái là `Đang hoạt động` hoặc `Bị khóa`.<br>+ **Xóa**: Chỉ hiển thị khi người dùng được phân quyền.<br>- **Quy tắc làm mờ**: Với các thao tác không được phép thực hiện, hiển thị dạng khóa mờ không cho phép thao tác.<br>- **Xem chi tiết**: Thực hiện bằng sự kiện click trực tiếp vào dòng dữ liệu (Row-Click). |

###### 4.3.1.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | **TH1 (Tìm kiếm không hợp lệ)**: Nhập ngày sai định dạng `dd/mm/yyyy` hoặc Từ ngày lớn hơn Đến ngày. Vi phạm **[BR-VAL-007]**, hệ thống chặn tìm kiếm, cảnh báo đỏ viền ô nhập lỗi đầu tiên, hiển thị thông báo lỗi **[MSG-ERR-VAL-007]** ngay phía dưới ô nhập và tự động focus con trỏ vào ô lỗi đó. |
| | | | **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng, in nghiêng với nội dung theo MessageList dùng chung **[MSG-INF-SYS-001]**.<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái khóa mờ (Disabled). |
| | | | **TH3 (Có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị danh sách các bản ghi thỏa mãn điều kiện lọc theo đúng cấu trúc các cột quy định, sắp xếp mặc định theo Ngày tạo giảm dần.<br>+ Thanh phân trang: Hiển thị thông tin phân trang thực tế (ví dụ: *"Hiển thị 1-10 của 25 bản ghi"*), kích hoạt khả dụng các nút điều hướng trang tương ứng theo số lượng trang. |
| 2 | Xóa bộ lọc | Button/Link | Đặt lại toàn bộ tiêu chí Bộ lọc tìm kiếm về giá trị mặc định ban đầu và tải lại danh sách kết quả. |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới tài khoản cán bộ**. |
| 4 | Import Excel | Button | Mở **MH09 - Popup Import danh sách tài khoản cán bộ từ Excel**. |
| 5 | Đặt lại mật khẩu | Icon | Khi click, hệ thống mở **MH06 - Popup Đặt lại mật khẩu tài khoản cán bộ**. |
| 6 | Cập nhật | Icon | Khi click, hệ thống mở **MH03 - Popup Chỉnh sửa tài khoản cán bộ**. |
| 7 | Khóa / Mở khóa | Icon | - Nếu trạng thái là `Đang hoạt động`: Click mở **MH04 - Popup Xác nhận Khóa tài khoản cán bộ**.<br>- Nếu trạng thái là `Bị khóa`: Click mở **MH05 - Popup Xác nhận Mở khóa tài khoản cán bộ**. |
| 8 | Đóng | Icon | Khi click, hệ thống mở **MH08 - Popup Xác nhận Đóng/Xóa tài khoản cán bộ** với loại thao tác là `Đóng`. |
| 9 | Xóa | Icon | - Khi click, hệ thống mở **MH08 - Popup Xác nhận Đóng/Xóa tài khoản cán bộ** với loại thao tác là `Xóa` kèm thông điệp cảnh báo [MSG-CFM-SYS-001].<br>- Khi người dùng xác nhận Đồng ý: Hệ thống thực hiện xóa cứng tài khoản cán bộ và toàn bộ thông tin có liên quan, hiển thị thông báo thành công [MSG-SUC-SYS-004] và làm mới danh sách kết quả. |
| 10 | Click dòng dữ liệu (Row-click) | Row Click | Mở **MH07 - Popup Xem chi tiết tài khoản cán bộ** ở chế độ chỉ đọc. |

---

##### 4.3.1.3.3. MH02 - Popup Thêm mới tài khoản cán bộ

###### 4.3.1.3.3.1. Màn hình

![Màn hình Thêm mới tài khoản cán bộ](../../images/UC595/UC595_02_MH01_Them_moi_tai_khoan_can_bo.png)

###### 4.3.1.3.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ và tên | String(255) | Có | Trống | Control UI: Input text.<br>- Họ và tên đầy đủ của cán bộ. Loại bỏ khoảng trắng thừa. |
| Email | String(100) | Có | Trống | Control UI: Input text.<br>- Địa chỉ email cơ quan của cán bộ. Đúng định dạng Regex: `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`. Kiểm tra trùng lặp trên toàn hệ thống. |
| Tên đăng nhập | String(255) | Có | Theo Email | Control UI: Text hiển thị (Read-only).<br>- Hệ thống tự động lấy giá trị từ Email làm Tên đăng nhập. |
| Số điện thoại | String(10) | Có | Trống | Control UI: Input text.<br>- Đúng 10 chữ số, bắt đầu bằng 0, Regex: `/^0[35789]\d{8}$/`. Kiểm tra trùng lặp trên toàn hệ thống. |
| Đơn vị | Enum(String(100)) | Có | Trống | Control UI: Combobox dạng cây (Tree-Select).<br>- Chỉ hiển thị Đơn vị trực thuộc phạm vi quản lý của người dùng đang thực hiện trở xuống. |
| Phòng ban | Enum(String(50)) | Không | Trống | Control UI: Combobox.<br>- Danh sách Phòng ban trực thuộc Đơn vị đã chọn. Tự động reload khi Đơn vị thay đổi. |
| Chức vụ | Enum(String(50)) | Không | Trống | Control UI: Combobox.<br>- Chọn từ Danh mục Chức vụ. |
| Nhóm người sử dụng | Enum(String(50)) | Không* | Trống | Control UI: Ô tìm kiếm + checkbox chọn Nhóm người dùng. |
| Vai trò | Enum(String(50)) | Không* | Trống | Control UI: Ô tìm kiếm + checkbox chọn Vai trò. |
| Cây quyền hạn (Preview) | Boolean | - | Theo Nhóm/Vai trò | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>- Hiển thị trước các quyền được cộng dồn theo thời gian thực (Real-time). |

*Ghi chú*: (*): Bắt buộc phải chọn ít nhất một trong hai trường: Nhóm người sử dụng hoặc Vai trò.

###### 4.3.1.3.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, không lưu dữ liệu đã nhập. |
| 2 | Lưu & Cấp tài khoản | Button | Kiểm tra toàn bộ dữ liệu trên form:<br>- TH1 (Bỏ trống bắt buộc): Cảnh báo đỏ viền ô lỗi đầu tiên và hiển thị [MSG-ERR-VAL-001].<br>- TH2 (Bỏ trống cả Nhóm và Vai trò): Hiển thị cảnh báo lỗi bắt buộc chọn ít nhất một trường.<br>- TH3 (Sai định dạng/Vượt độ dài): Hiển thị thông báo lỗi tương ứng.<br>- TH4 (Trùng lặp Email/SĐT): Hiển thị [MSG-ERR-VAL-009].<br>- TH Hợp lệ:<br>+ Tự động gán Loại tài khoản tương ứng: `Cán bộ` (Đơn vị Nội bộ) hoặc `Cơ quan có thẩm quyền` (Đơn vị Cơ quan ngoài ngành).<br>+ Tự động sinh mật khẩu ngẫu nhiên khởi tạo, băm mật khẩu kèm Salt và lưu CSDL.<br>+ Gán trạng thái `Đang hoạt động` và bật cờ bắt buộc đổi mật khẩu ở lần đăng nhập đầu tiên.<br>+ Gửi Email thông báo tạo tài khoản kèm mật khẩu khởi tạo.<br>+ Ghi nhận Audit Log, hiển thị thông báo thành công [MSG-SUC-UC009-001], đóng form và tải lại danh sách tại MH01. |

---

##### 4.3.1.3.4. MH03 - Popup Chỉnh sửa tài khoản cán bộ

###### 4.3.1.3.4.1. Màn hình

![Màn hình Sửa thông tin tài khoản cán bộ](../../images/UC595/UC595_03_MH01_Sua_thong_tin_tai_khoan_can_bo.png)

###### 4.3.1.3.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ và tên | String(255) | Có | Theo bản ghi | Control UI: Input text. Cho phép cập nhật. |
| Email | String(100) | Có | Theo bản ghi | Control UI: Input text. Cho phép cập nhật. Kiểm tra trùng lặp (trừ bản ghi hiện tại). |
| Tên đăng nhập | String(255) | Có | Theo Email | Control UI: Text hiển thị (Read-only). Tự động cập nhật theo Email khi lưu. |
| Số điện thoại | String(10) | Có | Theo bản ghi | Control UI: Input text. Cho phép cập nhật. Kiểm tra trùng lặp (trừ bản ghi hiện tại). |
| Đơn vị | Enum(String(100)) | Có | Theo bản ghi | Control UI: Combobox dạng cây (Tree-Select). Phân quyền theo cấp đơn vị. |
| Phòng ban | Enum(String(50)) | Không | Theo bản ghi | Control UI: Combobox. Lọc theo Đơn vị đã chọn. |
| Chức vụ | Enum(String(50)) | Không | Theo bản ghi | Control UI: Combobox. Cho phép thay đổi. |
| Nhóm người sử dụng | Enum(String(50)) | Không* | Theo bản ghi | Control UI: Ô tìm kiếm + checkbox chọn Nhóm người dùng. |
| Vai trò | Enum(String(50)) | Không* | Theo bản ghi | Control UI: Ô tìm kiếm + checkbox chọn Vai trò. |
| Cây quyền hạn (Preview) | Boolean | - | Theo Nhóm/Vai trò | Control UI: Cây phân quyền chỉ đọc xem trước quyền cộng dồn. |

###### 4.3.1.3.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, không lưu các thay đổi đã nhập. |
| 2 | Đặt lại mật khẩu | Button | Mở **MH06 - Popup Đặt lại mật khẩu tài khoản cán bộ**. |
| 3 | Lưu cập nhật | Button | Kiểm tra toàn bộ dữ liệu cập nhật trên form:<br>- TH1 (Lỗi nhập liệu/trùng lặp): Hiển thị thông báo lỗi tương ứng.<br>- TH Hợp lệ:<br>+ Cập nhật thông tin cán bộ vào CSDL.<br>+ Nếu thay đổi Đơn vị: Cập nhật lại Loại tài khoản và làm mới danh sách nhóm/vai trò tương ứng.<br>+ Ghi nhận lịch sử Audit Log.<br>+ Hiển thị thông báo cập nhật thành công [MSG-SUC-UC009-001], đóng form và làm mới danh sách tại MH01. |

---

##### 4.3.1.3.5. MH04 - Popup Xác nhận Khóa tài khoản cán bộ

###### 4.3.1.3.5.1. Màn hình

![Màn hình Khóa tài khoản cán bộ](../../images/UC595/UC595_04_MH01_Khoa_tai_khoan_can_bo.png)

###### 4.3.1.3.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông báo xác nhận | String(255) | - | - | Control UI: Text hiển thị (Read-only). Hiển thị nội dung xác nhận khóa tài khoản cán bộ [MSG-CFM-UC009-003]. |

###### 4.3.1.3.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác và giữ nguyên trạng thái. |
| 2 | Đồng ý | Button | Thực hiện xử lý khóa tài khoản cán bộ:<br>+ Chuyển trạng thái tài khoản thành `Bị khóa`.<br>+ Thu hồi phiên đăng nhập hiện tại và quyền đăng nhập của tài khoản.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-004], đóng popup và làm mới danh sách kết quả tại MH01. |

---

##### 4.3.1.3.6. MH05 - Popup Xác nhận Mở khóa tài khoản cán bộ

###### 4.3.1.3.6.1. Màn hình

![Màn hình Mở khóa tài khoản cán bộ](../../images/UC595/UC595_04_MH01_Mo_khoa_tai_khoan_can_bo.png)

###### 4.3.1.3.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông báo xác nhận | String(255) | - | - | Control UI: Text hiển thị (Read-only). Hiển thị nội dung xác nhận mở khóa tài khoản cán bộ [MSG-CFM-UC009-004]. |

###### 4.3.1.3.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác và giữ nguyên trạng thái. |
| 2 | Đồng ý | Button | Thực hiện xử lý mở khóa tài khoản cán bộ:<br>+ Chuyển trạng thái tài khoản thành `Đang hoạt động`.<br>+ Khôi phục quyền đăng nhập hệ thống cho cán bộ.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-005], đóng popup và làm mới danh sách kết quả tại MH01. |

---

##### 4.3.1.3.7. MH06 - Popup Đặt lại mật khẩu tài khoản cán bộ

###### 4.3.1.3.7.1. Màn hình

![Màn hình Đặt lại mật khẩu](../../images/UC595/UC595_06_MH01_Dat_lai_mat_khau.png)

###### 4.3.1.3.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên đăng nhập | String(255) | Không | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Mật khẩu mới | Password | Có | Trống | Control UI: Input password. Cán bộ quản trị nhập mật khẩu mới, tuân thủ quy tắc độ phức tạp mật khẩu hệ thống. Có icon con mắt để ẩn/hiện ký tự. |
| Nhập lại mật khẩu mới | Password | Có | Trống | Control UI: Input password. Bắt buộc trùng khớp với Mật khẩu mới. Có icon con mắt để ẩn/hiện ký tự. |
| Yêu cầu đổi mật khẩu khi đăng nhập lần tiếp theo | Boolean | Không | Có | Control UI: Checkbox. Mặc định được tích chọn. |

###### 4.3.1.3.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác đặt lại mật khẩu. |
| 2 | Lưu mật khẩu mới | Button | Kiểm tra mật khẩu mới và nhập lại mật khẩu mới:<br>- TH1 (Lỗi nhập liệu/không khớp/sai quy tắc): Hiển thị thông báo lỗi tương ứng.<br>- TH Hợp lệ:<br>+ Mã hóa băm mật khẩu một chiều kết hợp Salt ngẫu nhiên và lưu CSDL.<br>+ Cập nhật cờ yêu cầu đổi mật khẩu ở lần đăng nhập tiếp theo.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-006] và đóng popup.<br>+ Tuyệt đối không gửi mật khẩu dạng văn bản rõ qua Email. |
| 3 | Ẩn/hiện mật khẩu | Icon | Chuyển đổi trạng thái hiển thị giữa che ký tự và hiện ký tự văn bản rõ. |

---

##### 4.3.1.3.8. MH07 - Popup Xem chi tiết tài khoản cán bộ

###### 4.3.1.3.8.1. Màn hình

![Màn hình Xem chi tiết tài khoản cán bộ](../../images/UC595/UC595_07_MH01_Xem_chi_tiet_tai_khoan_can_bo.png)

###### 4.3.1.3.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ và tên | String(100) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). Tên đầy đủ của cán bộ. |
| Tên đăng nhập | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Email | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Số điện thoại | String(20) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Đơn vị | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Phòng ban | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). Ẩn nếu không có dữ liệu gốc. |
| Chức vụ | String(100) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). Ẩn nếu không có dữ liệu gốc. |
| Nhóm người sử dụng | String(100) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). Ẩn nếu không có dữ liệu gốc. |
| Vai trò | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). Ẩn nếu không có dữ liệu gốc. |
| Cây quyền hạn | Boolean | - | Theo bản ghi | Control UI: Cây phân quyền chỉ đọc tổng hợp toàn bộ quyền cộng dồn của cán bộ. |

###### 4.3.1.3.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Đóng Popup xem chi tiết và quay lại danh sách MH01. |
| 2 | Chỉnh sửa | Button | Đóng popup xem chi tiết và chuyển sang **MH03 - Popup Chỉnh sửa tài khoản cán bộ**. |

---

##### 4.3.1.3.9. MH08 - Popup Xác nhận Đóng/Xóa tài khoản cán bộ

###### 4.3.1.3.9.1. Màn hình

![Popup Xác nhận Đóng/Xóa tài khoản cán bộ](../../images/UC595/UC595_04_MH01_Popup_xac_nhan_dong_xoa_tai_khoan_can_bo.png)

###### 4.3.1.3.9.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Loại thao tác | Enum(String(50)) | - | Theo thao tác chọn | Control UI: Text hiển thị (Read-only). Gồm: Đóng, Xóa. |
| Thông tin tài khoản | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). Gồm: Họ và tên cán bộ, Email (Tên đăng nhập), Đơn vị trực thuộc. |
| Thông báo cảnh báo | String(500) | - | Theo Loại thao tác | Control UI: Text hiển thị (Read-only).<br>- Nếu Loại thao tác = Đóng: Hiển thị nội dung xác nhận đóng tài khoản [MSG-CFM-UC009-001].<br>- Nếu Loại thao tác = Xóa: Hiển thị nội dung cảnh báo xóa tài khoản [MSG-CFM-SYS-001]. |

###### 4.3.1.3.9.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác và giữ nguyên trạng thái tài khoản. |
| 2 | Đồng ý | Button | Thực hiện xử lý theo Loại thao tác đã chọn:<br>- **TH1 (Loại thao tác = Đóng)**:<br>+ Chuyển trạng thái tài khoản thành `Đóng`.<br>+ Thu hồi phiên làm việc và quyền đăng nhập của tài khoản.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-002], đóng popup và làm mới danh sách tại MH01.<br>- **TH2 (Loại thao tác = Xóa)**:<br>+ Thực hiện xóa cứng tài khoản cán bộ và toàn bộ thông tin có liên quan khỏi hệ thống.<br>+ Xóa toàn bộ phân quyền, token phiên đăng nhập và dữ liệu cấu hình liên quan.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-SYS-004], đóng popup và làm mới danh sách tại MH01. |

---

##### 4.3.1.3.10. MH09 - Popup Import danh sách tài khoản cán bộ từ Excel

###### 4.3.1.3.10.1. Màn hình

![Màn hình Import Excel](../../images/UC595/UC595_01_MH02_Import_danh_sach_tai_khoan.png)

###### 4.3.1.3.10.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tệp tải lên | File (.xlsx, .xls) | Có | Trống | Control UI: Upload file.<br>- Chỉ cho phép tải lên file Excel biểu mẫu quy định. |
| Tải file biểu mẫu mẫu | File (.xlsx) | - | - | Control UI: Link tải file Excel mẫu chuẩn. |
| Bảng kết quả kiểm tra sơ bộ | - | - | - | Bảng hiển thị danh sách các dòng hợp lệ và các dòng lỗi kèm chi tiết lý do lỗi để người dùng kiểm tra trước khi thực hiện nạp vào hệ thống. |

###### 4.3.1.3.10.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup import. |
| 2 | Tải file mẫu | Link | Tải tệp tin Excel mẫu về máy tính. |
| 3 | Chọn file / Tải lên | Button | Tải file danh sách cán bộ lên hệ thống để thực hiện đọc và kiểm tra dữ liệu sơ bộ. |
| 4 | Thực hiện Import | Button | Tiến hành nạp các dòng dữ liệu hợp lệ vào CSDL, tự động sinh mật khẩu ngẫu nhiên, gửi email thông báo tài khoản cho cán bộ, hiển thị kết quả nạp và làm mới danh sách kết quả tại MH01. |
