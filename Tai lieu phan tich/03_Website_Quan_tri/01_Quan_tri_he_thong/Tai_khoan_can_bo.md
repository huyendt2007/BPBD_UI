#### 4.3.1.3. Quản lý tài khoản cán bộ

##### 4.3.1.3.1. Mục đích
Cho phép quản lý hồ sơ tài khoản cán bộ và cán bộ thuộc cơ quan ngoài ngành trên toàn hệ thống Đăng ký biện pháp bảo đảm, bao gồm:
- Tra cứu, lọc và xem danh sách tài khoản cán bộ theo phân cấp quản lý của đơn vị trực thuộc.
- Khởi tạo mới hoặc cập nhật thông tin hồ sơ tài khoản cán bộ, cơ cấu tổ chức và cấu hình phân quyền theo nhóm người dùng/vai trò.
- Nạp dữ liệu tài khoản cán bộ hàng loạt từ tệp Excel (Import).
- Khóa, mở khóa, đóng tài khoản và xóa tài khoản cán bộ.
- Đặt lại mật khẩu khởi tạo cho cán bộ.
- Xem chi tiết đầy đủ thông tin tài khoản và cây phân quyền chỉ đọc.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website Quản trị.
- Hệ thống hoạt động bình thường.

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
| Vai trò | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Các vai trò ở trạng thái Hoạt động có Loại tài khoản áp dụng là Cán bộ |
| Nhóm người dùng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Các nhóm người dùng ở trạng thái Hoạt động có Loại tài khoản áp dụng là Cán bộ |
| Từ ngày | Date | Không | Ngày đầu tháng hiện tại | Control UI: Datepicker (`dd/mm/yyyy`).<br>- Mặc định là ngày đầu tiên của tháng hiện tại.<br>- Áp dụng quy tắc so sánh khoảng ngày [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker (`dd/mm/yyyy`).<br>- Mặc định là ngày hiện tại.<br>- Áp dụng quy tắc so sánh khoảng ngày [BR-VAL-007]. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Tìm kiếm | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại khối bộ lọc. |
| Xóa bộ lọc | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại khối bộ lọc. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại header bảng dữ liệu. |
| Import Excel | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại header bảng dữ liệu. |
| **II. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách tài khoản thuộc Đơn vị của NSD đang đăng nhập trở xuống.<br>- Sắp xếp mặc định theo Ngày tạo giảm dần.<br>- Cho phép chọn cấu hình 10, 20, 50, 100 bản ghi/trang, mặc định 20.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Họ và tên | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên đăng nhập | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Đơn vị - Phòng ban | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Loại đơn vị | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Nội bộ<br>+ Cơ quan ngoài ngành |
| Chức vụ | String(100) | - | - | Control UI: Text hiển thị (Read-only). |
| Nhóm / Vai trò | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Ngày tạo | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Thao tác | String(255) | - | - | Control UI: Nhóm nút/icon thao tác.<br>- `Đặt lại mật khẩu`: Chỉ hiển thị khi trạng thái là `Đang hoạt động`.<br>- `Cập nhật`: Chỉ hiển thị khi trạng thái là `Đang hoạt động`.<br>- `Khóa / Mở khóa`: Hiển thị icon Khóa khi trạng thái là `Đang hoạt động`; hiển thị icon Mở khóa khi trạng thái là `Bị khóa`.<br>- `Đóng`: Chỉ hiển thị khi trạng thái là `Đang hoạt động` hoặc `Bị khóa`.<br>- `Xóa`: Luôn hiển thị.<br>- Với các thao tác không được phép thực hiện, hiển thị dạng nút mờ (Disabled) không cho phép click. |

###### 4.3.1.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút "Tìm kiếm":<br>- **TH1 (Dữ liệu lọc không hợp lệ)**: Nhập ngày sai định dạng `dd/mm/yyyy` hoặc Từ ngày lớn hơn Đến ngày $\rightarrow$ Vi phạm [BR-VAL-007], highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-007] và focus con trỏ vào ô lỗi.<br>- **TH2 (Không có dữ liệu trả về)**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"* và các nút điều hướng khóa mờ.<br>- **TH3 (Có dữ liệu trả về)**: Hiển thị danh sách các bản ghi thỏa mãn điều kiện lọc, sắp xếp mặc định theo Ngày tạo giảm dần. |
| 2 | Xóa bộ lọc | Button | Đặt lại toàn bộ tiêu chí Bộ lọc tìm kiếm về giá trị mặc định ban đầu và tải lại danh sách kết quả. |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới / Cập nhật tài khoản cán bộ** ở chế độ Thêm mới. |
| 4 | Import Excel | Button | Mở **MH05 - Popup Import danh sách tài khoản cán bộ từ Excel**. |
| 5 | Đặt lại mật khẩu | Icon | Mở **MH03 - Popup Đặt lại mật khẩu tài khoản cán bộ**. |
| 6 | Cập nhật | Icon | Mở **MH02 - Popup Thêm mới / Cập nhật tài khoản cán bộ** ở chế độ Cập nhật cho tài khoản tương ứng. |
| 7 | Khóa / Mở khóa | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Khóa` hoặc `Mở khóa` kèm thông báo xác nhận [MSG-CFM-UC009-003] hoặc [MSG-CFM-UC009-004]. Khi người dùng chọn "Xác nhận", hệ thống cập nhật trạng thái tài khoản, thu hồi/khôi phục quyền đăng nhập, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-UC009-004] hoặc [MSG-SUC-UC009-005] và làm mới danh sách. |
| 8 | Đóng | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Đóng` kèm thông báo xác nhận [MSG-CFM-UC009-001]. Khi người dùng chọn "Xác nhận", hệ thống chuyển trạng thái tài khoản thành `Đóng`, thu hồi quyền truy cập, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-UC009-002] và làm mới danh sách. |
| 9 | Xóa | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo cảnh báo [MSG-CFM-SYS-001]:<br>- **TH1 (Tài khoản đang có ràng buộc xử lý hồ sơ)**: Cán bộ đang được phân công xử lý hồ sơ chưa hoàn thành $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu chuyển giao hồ sơ trước.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống xóa tài khoản cán bộ khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới danh sách kết quả. |
| 10 | Click dòng dữ liệu | Row Click | Mở **MH04 - Popup Xem chi tiết tài khoản cán bộ** ở chế độ chỉ đọc. |

---

##### 4.3.1.3.3. MH02 - Popup Thêm mới / Cập nhật tài khoản cán bộ

###### 4.3.1.3.3.1. Màn hình

![Popup Thêm mới / Cập nhật tài khoản cán bộ](../../images/UC595/UC595_02_MH01_Them_moi_tai_khoan_can_bo.png)

###### 4.3.1.3.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Tài khoản cán bộ** | - | - | - | Hiển thị dạng Popup Modal (Sticky Header & Footer). |
| Họ và tên | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Họ và tên đầy đủ của cán bộ. Loại bỏ khoảng trắng thừa.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Email | String(100) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Địa chỉ email cơ quan của cán bộ.<br>- Áp dụng quy tắc [BR-VAL-EMAIL] và [BR-VAL-009] kiểm tra trùng lặp trên toàn hệ thống (khi Sửa thì loại trừ chính tài khoản đang thao tác). |
| Tên đăng nhập | String(255) | Có | Theo Email | Control UI: Text hiển thị (Read-only).<br>- Tự động lấy giá trị từ trường Email làm Tên đăng nhập. |
| Số điện thoại | String(10) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Áp dụng quy tắc [BR-VAL-PHONE] và [BR-VAL-009] kiểm tra trùng lặp trên toàn hệ thống (khi Sửa thì loại trừ chính tài khoản đang thao tác). |
| Đơn vị | Enum(String(100)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox dạng cây (Tree-Select).<br>- Chỉ hiển thị Đơn vị trực thuộc phạm vi quản lý của người dùng đang thực hiện trở xuống. |
| Phòng ban | Enum(String(50)) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>- Danh sách Phòng ban trực thuộc Đơn vị đã chọn. Tự động cập nhật khi Đơn vị thay đổi. |
| Chức vụ | Enum(String(50)) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>- Chọn từ Danh mục Chức vụ. |
| Nhóm người dùng | Enum(String(50)) | Không* | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox (Multi-select) / Checkbox có ô tìm kiếm.<br>- **Chỉ hiển thị các Nhóm người dùng ở trạng thái `Hoạt động` có `Loại tài khoản áp dụng` là `Cán bộ`.** |
| Vai trò | Enum(String(50)) | Không* | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox (Multi-select) / Checkbox có ô tìm kiếm.<br>- **Chỉ hiển thị các Vai trò ở trạng thái `Hoạt động` có `Loại tài khoản áp dụng` là `Cán bộ`.** |
| Cây quyền hạn (Preview) | Tree | - | Theo Nhóm/Vai trò | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>- Hiển thị trước các quyền được cộng dồn theo thời gian thực (Real-time). |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Đặt lại mật khẩu | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị tại footer popup khi ở chế độ Cập nhật. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

*Ghi chú*: (*): Bắt buộc phải chọn ít nhất một trong hai trường: Nhóm người dùng hoặc Vai trò.

###### 4.3.1.3.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra toàn bộ dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Bỏ trống cả Nhóm người dùng và Vai trò)**: Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-UC009-002] yêu cầu chọn ít nhất một trường.<br>- **TH3 (Sai định dạng Email / SĐT)**: Vi phạm [BR-VAL-EMAIL] hoặc [BR-VAL-PHONE] $\rightarrow$ Highlight viền đỏ ô lỗi, hiển thị thông báo lỗi [MSG-ERR-VAL-002] và focus con trỏ.<br>- **TH4 (Trùng lặp Email / SĐT)**: Vi phạm [BR-VAL-009] $\rightarrow$ Hiển thị thông báo lỗi [MSG-ERR-VAL-009] và focus con trỏ.<br>- **TH Hợp lệ (Tuần tự xử lý của hệ thống)**:<br>1. *Lưu dữ liệu và gán loại tài khoản*:<br>+ Nếu là Thêm mới: Tự động gán `Loại tài khoản` là `Cán bộ` (nếu thuộc Đơn vị Nội bộ) hoặc `Cơ quan có thẩm quyền` (nếu thuộc Đơn vị Cơ quan ngoài ngành). Lưu thông tin vào CSDL ở trạng thái `Đang hoạt động`.<br>+ Nếu là Cập nhật: Lưu các thông tin thay đổi vào CSDL; nếu thay đổi Đơn vị thì cập nhật lại Loại tài khoản và danh sách nhóm/vai trò tương ứng.<br>2. *Xử lý mật khẩu (chỉ áp dụng khi Thêm mới)*: Tự động sinh mật khẩu tạm ngẫu nhiên, mã hóa băm mật khẩu kèm Salt lưu CSDL, bật cờ bắt buộc đổi mật khẩu ở lần đăng nhập đầu tiên, gửi Email thông báo tạo tài khoản kèm mật khẩu khởi tạo cho cán bộ.<br>3. *Hoàn tất*: Ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng form và tải lại danh sách tại MH01. |
| 2 | Đặt lại mật khẩu | Button | Mở **MH03 - Popup Đặt lại mật khẩu tài khoản cán bộ** cho tài khoản đang chọn. |
| 3 | Hủy | Button | Đóng popup, hủy bỏ các thông tin đã nhập và quay lại màn hình chính. |

---

##### 4.3.1.3.4. MH03 - Popup Đặt lại mật khẩu tài khoản cán bộ

###### 4.3.1.3.4.1. Màn hình

![Màn hình Đặt lại mật khẩu](../../images/UC595/UC595_06_MH01_Dat_lai_mat_khau.png)

###### 4.3.1.3.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên đăng nhập | String(255) | Không | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Mật khẩu mới | Password | Có | Trống | Control UI: Input password.<br>- Nhập mật khẩu mới tuân thủ quy tắc độ phức tạp của hệ thống.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Nhập lại mật khẩu mới | Password | Có | Trống | Control UI: Input password.<br>- Bắt buộc trùng khớp với Mật khẩu mới.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Yêu cầu đổi mật khẩu khi đăng nhập lần tiếp theo | Boolean | Không | Có | Control UI: Checkbox.<br>- Mặc định được tích chọn. |
| Lưu mật khẩu mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.3.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu mật khẩu mới | Button | Kiểm tra mật khẩu mới và nhập lại mật khẩu mới:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ.<br>- **TH2 (Không trùng khớp mật khẩu)**: Mật khẩu mới và Nhập lại mật khẩu không trùng khớp $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-UC009-006] và focus con trỏ.<br>- **TH3 (Không đạt độ phức tạp)**: Vi phạm quy định mật khẩu $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-VAL-002] và focus con trỏ.<br>- **TH Hợp lệ**: Mã hóa băm mật khẩu một chiều kết hợp Salt ngẫu nhiên và lưu CSDL, cập nhật cờ đổi mật khẩu, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-UC009-006] và đóng popup. |
| 2 | Hủy | Button | Đóng popup, hủy bỏ thao tác đặt lại mật khẩu. |

---

##### 4.3.1.3.5. MH04 - Popup Xem chi tiết tài khoản cán bộ

###### 4.3.1.3.5.1. Màn hình

![Màn hình Xem chi tiết tài khoản cán bộ](../../images/UC595/UC595_07_MH01_Xem_chi_tiet_tai_khoan_can_bo.png)

###### 4.3.1.3.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ và tên | String(100) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Tên đăng nhập | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Email | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Số điện thoại | String(20) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Đơn vị | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Phòng ban | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Chức vụ | String(100) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Nhóm người dùng | String(100) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Vai trò | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Cây quyền hạn | Tree | - | Theo bản ghi | Control UI: Cây phân quyền chỉ đọc tổng hợp toàn bộ quyền cộng dồn của cán bộ. |

###### 4.3.1.3.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Button | Đóng popup xem chi tiết và chuyển sang **MH02 - Popup Thêm mới / Cập nhật tài khoản cán bộ** ở chế độ Cập nhật. |
| 2 | Đóng | Button | Đóng Popup xem chi tiết và quay lại danh sách MH01. |

---

##### 4.3.1.3.6. MH05 - Popup Import danh sách tài khoản cán bộ từ Excel

###### 4.3.1.3.6.1. Màn hình

![Màn hình Import Excel](../../images/UC595/UC595_01_MH02_Import_danh_sach_tai_khoan.png)

###### 4.3.1.3.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề Popup | String(100) | - | Nhận danh sách tài khoản cán bộ từ Excel | Control UI: Text hiển thị (Read-only) tại Header của Modal. |
| Hướng dẫn nạp file | String(255) | - | Theo quy định | Control UI: Text hiển thị (Read-only).<br>- Nội dung: *"Vui lòng tải tệp tin biểu mẫu chuẩn, điền đầy đủ và chính xác thông tin theo hướng dẫn trước khi tải lên hệ thống."* |
| Tải file mẫu | Link | - | - | Control UI: Link tải file kèm icon tệp Excel.<br>- Tên file tải về: `yyyyMMdd_Bieu_mau_import_tai_khoan_can_bo.xlsx`. |
| Tải tệp lên | File (.xlsx) | Có | Trống | Control UI: Vùng kéo thả / Nút chọn file.<br>- Giới hạn định dạng `.xlsx`, dung lượng tối đa 20MB.<br>- Sau khi chọn tệp: Hiển thị tên tệp, dung lượng kèm link `Xóa tệp`. |
| Thống kê kiểm tra | String(100) | - | - | Control UI: Text Badge hiển thị (Read-only).<br>- **Điều kiện hiển thị:** Chỉ xuất hiện sau khi người dùng đã tải tệp lên và hệ thống hoàn tất kiểm tra sơ bộ.<br>- Định dạng hiển thị: `Tổng số: X dòng \| Hợp lệ: Y dòng \| Lỗi: Z dòng`. |
| Bảng xem trước kết quả | Table | - | - | Control UI: Bảng/Lưới hiển thị.<br>- **Điều kiện hiển thị:** Tự động xuất hiện sau khi tải tệp lên thành công và hoàn tất kiểm tra sơ bộ; tự động ẩn đi khi người dùng bấm Xóa tệp.<br>- Cấu trúc các cột: `STT`, `Dòng Excel`, `Họ và tên`, `Email`, `Số điện thoại`, `Đơn vị`, `Trạng thái kiểm tra` (Nhãn: Hợp lệ / Lỗi), `Chi tiết lỗi`. |

###### 4.3.1.3.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tải file mẫu | Link | Tải tệp tin Excel biểu mẫu chuẩn `yyyyMMdd_Bieu_mau_import_tai_khoan_can_bo.xlsx` về máy tính người dùng theo đúng cấu trúc định nghĩa tại mục 4.3.1.3.6.4. |
| 2 | Chọn file / Tải lên | Upload Button | Người dùng chọn tệp từ máy tính hoặc kéo thả tệp vào vùng upload. Hệ thống tự động kích hoạt kiểm tra sơ bộ (Giai đoạn 1 & Giai đoạn 2), tự động hiển thị `Bảng xem trước kết quả` và dòng `Thống kê kiểm tra`. |
| 3 | Xóa tệp | Link | Gỡ bỏ tệp vừa chọn, ẩn `Bảng xem trước kết quả` và đưa vùng upload về trạng thái ban đầu. |
| 4 | Nhận Excel | Button | Chỉ kích hoạt khi có ít nhất 01 dòng dữ liệu `Hợp lệ`:<br>- **TH Hợp lệ (Áp dụng Cơ chế Thành công một phần theo Mục 5.6 Phụ lục)**:<br>1. Nạp toàn bộ các dòng dữ liệu hợp lệ vào CSDL hệ thống.<br>2. Tự động gán `Loại tài khoản`: `Cán bộ` (nếu thuộc Đơn vị Nội bộ) hoặc `Cơ quan có thẩm quyền` (nếu thuộc Đơn vị Cơ quan ngoài ngành).<br>3. Tự động sinh mật khẩu tạm thời ngẫu nhiên cho từng tài khoản, mã hóa băm lưu CSDL, bật cờ bắt buộc đổi mật khẩu ở lần đăng nhập đầu tiên.<br>4. Gửi Email thông báo tài khoản kèm thông tin đăng nhập theo đúng Mẫu Email hệ thống cho từng cán bộ được nạp thành công.<br>5. Hiển thị Popup báo cáo thống kê kết quả nạp (*Tổng số: N dòng / Thành công: X dòng / Thất bại: Y dòng*). Nếu có dòng lỗi ($Y > 0$), cung cấp nút **"Tải báo cáo lỗi"** (file Excel chứa danh sách các dòng lỗi kèm cột nguyên nhân lỗi chi tiết).<br>6. Đóng popup, ghi Audit Log và làm mới danh sách tài khoản tại MH01. |
| 5 | Hủy | Button | Đóng Popup Modal, hủy bỏ toàn bộ thao tác và quay lại màn hình chính. |

###### 4.3.1.3.6.4. Cấu trúc dữ liệu và Quy tắc kiểm tra (Validation) file Excel mẫu import

**1. Cấu trúc các cột trong tệp Excel mẫu (`Bieu_mau_import_tai_khoan_can_bo.xlsx`)**:

| STT | Tên cột trong file Excel | Kiểu dữ liệu | Bắt buộc | Mô tả & Quy tắc kiểm tra dữ liệu (Validation Rules) |
| :-- | :--- | :--- | :--- | :--- |
| 1 | STT | Integer | Có | Số thứ tự tăng dần (1, 2, 3...). |
| 2 | Họ và tên | String(255) | Có | Họ và tên đầy đủ của cán bộ. Loại bỏ khoảng trắng thừa ở hai đầu. Áp dụng quy tắc [BR-VAL-001]. |
| 3 | Email | String(100) | Có | Địa chỉ email cơ quan của cán bộ.<br>- Phải đúng định dạng chuẩn Email theo [BR-VAL-EMAIL].<br>- Không được trùng lặp với các dòng khác trong cùng file Excel.<br>- Không được trùng lặp với Email của tài khoản đã tồn tại trên hệ thống theo [BR-VAL-009]. |
| 4 | Số điện thoại | String(10) | Có | Số điện thoại liên hệ của cán bộ.<br>- Phải đúng định dạng 10 chữ số bắt đầu bằng đầu số hợp lệ theo [BR-VAL-PHONE].<br>- Không được trùng lặp với các dòng khác trong cùng file Excel.<br>- Không được trùng lặp với Số điện thoại của tài khoản đã tồn tại trên hệ thống theo [BR-VAL-009]. |
| 5 | Mã đơn vị | String(50) | Có | Mã định danh đơn vị công tác của cán bộ.<br>- Bắt buộc phải tồn tại trong danh mục Cơ cấu tổ chức trên hệ thống.<br>- Đơn vị phải thuộc phạm vi quản lý của người dùng đang thực hiện import (chỉ được import cho đơn vị của mình và các đơn vị con trực thuộc). |
| 6 | Mã phòng ban | String(50) | Không | Mã định danh phòng ban trực thuộc đơn vị.<br>- Nếu có nhập: Mã phòng ban phải tồn tại trên hệ thống và phải trực thuộc đúng `Mã đơn vị` đã khai báo ở cột 5. |
| 7 | Mã chức vụ | String(50) | Không | Mã định danh chức vụ của cán bộ.<br>- Nếu có nhập: Mã chức vụ phải tồn tại trong danh mục chức vụ đang hoạt động trên hệ thống. |
| 8 | Danh sách Mã nhóm người dùng | String(500) | Không* | Danh sách mã nhóm người dùng gán cho cán bộ, phân cách nhau bằng dấu phẩy `,` (Ví dụ: `GRP_CB_TIEPNHAN, GRP_CB_TRAKETQUA`).<br>- Toàn bộ các mã nhóm khai báo phải tồn tại trên hệ thống, đang ở trạng thái `Hoạt động` và có `Loại tài khoản áp dụng` là `Cán bộ`. |
| 9 | Danh sách Mã vai trò | String(500) | Không* | Danh sách mã vai trò gán cho cán bộ, phân cách nhau bằng dấu phẩy `,` (Ví dụ: `ROLE_CANBO_XULY, ROLE_CANBO_VIEW`).<br>- Toàn bộ các mã vai trò khai báo phải tồn tại trên hệ thống, đang ở trạng thái `Hoạt động` và có `Loại tài khoản áp dụng` là `Cán bộ`. |
| 10 | Ghi chú | String(500) | Không | Ghi chú bổ sung (nếu có). |

*Ghi chú*: (*): Bắt buộc mỗi dòng dữ liệu phải khai báo ít nhất một trong hai thông tin: `Danh sách Mã nhóm người dùng` (cột 8) hoặc `Danh sách Mã vai trò` (cột 9). Nếu bỏ trống cả hai, hệ thống báo lỗi dòng [MSG-ERR-UC009-002].

**2. Quy trình kiểm tra dữ liệu 2 giai đoạn (Validation Process)**:
- **Giai đoạn 1 - Kiểm tra tệp tin (File Validation)**:
  + Tệp tin phải đúng định dạng `.xlsx`, dung lượng không vượt quá 20MB.
  + Kiểm tra cấu trúc sheet và tên 10 cột dữ liệu phải khớp 100% với biểu mẫu chuẩn của hệ thống. Nếu sai cấu trúc hoặc file rỗng không có dữ liệu, chặn đọc file và hiển thị thông báo lỗi [MSG-ERR-FILE-003].
- **Giai đoạn 2 - Kiểm tra từng dòng dữ liệu (Row-level Validation) & Cơ chế Thành công một phần**:
  + Hệ thống quét tuần tự từng dòng từ dòng dữ liệu đầu tiên đến hết file.
  + Đối chiếu dữ liệu từng ô theo bảng quy tắc trên. Phân loại các dòng hợp lệ và dòng lỗi kèm thông tin chi tiết: `Dòng số`, `Trường lỗi`, `Giá trị nhập`, `Lý do lỗi cụ thể`.
  + Áp dụng cơ chế **Thành công một phần** theo Mục 5.6 Phụ lục: Các dòng hợp lệ sẵn sàng nạp vào hệ thống; các dòng lỗi được tổng hợp danh sách để người dùng tải file báo cáo lỗi về chỉnh sửa.
