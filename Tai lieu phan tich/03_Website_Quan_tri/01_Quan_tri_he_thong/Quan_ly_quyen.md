#### 4.3.1.11. Quản lý quyền

##### 4.3.1.11.1. Mục đích
Cho phép quản lý cây phân cấp quyền và chức năng trên hệ thống cho từng phân hệ (Website Khách hàng, Ứng dụng Mobile, Website quản trị), bao gồm:
- Thiết lập, tra cứu và hiển thị danh mục quyền theo cấu trúc cây phân cấp đa cấp (Cha - Con).
- Định nghĩa các loại chức năng hiển thị menu điều hướng (MENU) và các quyền thực thi tính năng/endpoint (API).
- Thêm mới chức năng gốc, thêm chức năng con, cập nhật thông tin và xóa chức năng phục vụ cấu hình phân quyền cho Vai trò và Nhóm người dùng.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.11.2. MH01 - Màn hình Quản lý quyền

###### 4.3.1.11.2.1. Màn hình

![Giao diện Quản lý quyền khi chưa chọn node](images/UCPS011.MH01_Unselected.png)
![Giao diện Quản lý quyền khi đã chọn node](images/UCPS011.MH01_Selected.png)

###### 4.3.1.11.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Danh sách cây quyền** | - | - | - | Khối chọn phân hệ và cây danh mục quyền. |
| Phân hệ | Enum(String(50)) | Có | Website quản trị | Control UI: Combobox.<br>Gồm:<br>+ Website Khách hàng<br>+ Ứng dụng Mobile<br>+ Website quản trị |
| Tìm kiếm quyền | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm trực tiếp (Live-search) theo Tên quyền hoặc Mã quyền. |
| Cây danh sách quyền chức năng | Tree | - | - | Control UI: Cây phân cấp (Cha - Con).<br>- Hiển thị Icon + Tên chức năng (Mã chức năng).<br>- Cho phép click chọn từng node để xem chi tiết ở Panel phải. |
| **II. Panel bên phải: Chi tiết & Thao tác** | - | - | - | Khối xem chi tiết và form cập nhật quyền. |
| Dòng thông báo hướng dẫn | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị ở trạng thái Chưa chọn node: *"Chọn một chức năng bên trái để xem chi tiết hoặc thêm mới"*. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi ở trạng thái Chưa chọn node hoặc trạng thái Xem chi tiết. |
| Thêm con | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi ở trạng thái Đã chọn node trên cây. |
| Sửa | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi ở trạng thái Đã chọn node trên cây. |
| Xóa | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi ở trạng thái Đã chọn node trên cây. |
| Phân hệ (Chi tiết) | String(50) | Có | Theo Panel trái | Control UI: Text hiển thị (Read-only).<br>- Tự động hiển thị theo phân hệ đang chọn ở Panel trái. |
| Mã chức năng cha | String(50) | Không | Trống | Control UI: Text hiển thị (Read-only).<br>- Khi thêm chức năng gốc (Root): Để trống.<br>- Khi thêm chức năng con: Tự động điền Mã chức năng của node cha đang chọn. |
| Mã chức năng | String(50) | Có | Trống | Control UI: Input text.<br>- Nhập mã định danh duy nhất của chức năng (chỉ cho phép chữ cái không dấu, chữ số và ký tự gạch dưới `_`).<br>- Khóa chỉ đọc (Read-only) khi ở chế độ Xem chi tiết hoặc Sửa. |
| Tên chức năng | String(255) | Có | Trống | Control UI: Input text.<br>- Nhập tên hiển thị tiếng Việt của chức năng.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Tên chức năng (EN) | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập tên hiển thị tiếng Anh của chức năng. |
| Loại | Enum(String(50)) | Có | MENU | Control UI: Combobox.<br>Gồm:<br>+ MENU<br>+ API |
| STT | Integer(10) | Không | Tự tăng | Control UI: Input number.<br>- Số thứ tự hiển thị sắp xếp trên menu. |
| Đường dẫn | String(500) | Không | Trống | Control UI: Input text.<br>- Đường dẫn Route/URL giao diện hoặc Endpoint API. |
| Icon menu | String(100) | Không | Trống | Control UI: Input text.<br>- Tên class icon hiển thị trên menu điều hướng. |
| Trạng thái | Enum(String(50)) | Có | Hoạt động | Control UI: Checkbox / Badge.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi ở chế độ Thêm mới, Thêm con hoặc Sửa. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi ở chế độ Thêm mới, Thêm con hoặc Sửa. |

###### 4.3.1.11.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phân hệ | Combobox | Khi người dùng thay đổi lựa chọn Phân hệ:<br>- Hệ thống tự động tải lại cây danh mục quyền tương ứng ở Panel trái.<br>- Đưa Panel phải về trạng thái Chưa chọn node. |
| 2 | Tìm kiếm quyền | Input text | Khi người dùng nhập từ khóa tìm kiếm:<br>- **TH Không có dữ liệu**: Cây danh sách hiển thị thông báo [MSG-INF-SYS-001].<br>- **TH Có dữ liệu**: Hệ thống tự động lọc trực tiếp các node có Tên hoặc Mã khớp từ khóa và tự động mở rộng (Expand) các nhánh cha liên quan. |
| 3 | Chọn node cây | Click Node | Khi click vào một node trên cây:<br>- Hệ thống tải toàn bộ thông tin chi tiết của quyền sang Panel phải ở chế độ Xem (Read-only).<br>- Hiển thị các nút thao tác: `Thêm con`, `Sửa`, `Xóa`, `Thêm mới`. |
| 4 | Thêm mới | Button | Chuyển Panel phải sang Form nhập liệu thêm chức năng gốc (Root):<br>- Trường `Phân hệ` khóa theo Panel trái, `Mã chức năng cha` để trống.<br>- Các ô nhập liệu ở trạng thái trống để nhập mới.<br>- Hiển thị nút `Lưu` và `Hủy`. |
| 5 | Thêm con | Button | Chuyển Panel phải sang Form nhập liệu thêm chức năng con:<br>- Trường `Phân hệ` khóa theo Panel trái, `Mã chức năng cha` tự động điền theo node đang chọn.<br>- Các ô nhập liệu ở trạng thái trống để nhập mới.<br>- Hiển thị nút `Lưu` và `Hủy`. |
| 6 | Sửa | Button | Chuyển Panel phải sang chế độ chỉnh sửa thông tin:<br>- Các trường `Phân hệ`, `Mã chức năng cha`, `Mã chức năng` bị khóa chỉ đọc (Read-only).<br>- Cho phép sửa Tên chức năng, Loại, STT, Đường dẫn, Icon, Trạng thái.<br>- Hiển thị nút `Lưu` và `Hủy`. |
| 7 | Xóa | Button | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo xác nhận [MSG-CFM-SYS-001]:<br>- **TH1 (Chứa chức năng con)**: Chức năng đang chọn có chứa các node con trực thuộc $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu xóa các chức năng con trước.<br>- **TH2 (Đang được gán quyền)**: Chức năng đã được phân quyền cho Vai trò hoặc Nhóm người dùng $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu gỡ cấu hình phân quyền trước.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống thực hiện xóa bản ghi, cập nhật lại cây danh sách, đưa Panel phải về trạng thái Chưa chọn node, ghi Audit Log và hiển thị thông báo thành công [MSG-SUC-SYS-001]. |
| 8 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai định dạng Mã chức năng)**: Mã chức năng chứa dấu cách, tiếng Việt có dấu hoặc ký tự đặc biệt khác ngoài `_` (vi phạm [BR-VAL-002]) $\rightarrow$ Highlight viền đỏ ô lỗi, hiển thị thông báo lỗi [MSG-ERR-VAL-002] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Mã chức năng` hoặc `Tên chức năng` trong cùng Phân hệ đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Ngừng hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính bản ghi đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vào CSDL, làm mới cây danh mục quyền bên trái, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và chuyển Panel phải về chế độ Xem chi tiết bản ghi vừa lưu. |
| 9 | Hủy | Button | Hủy bỏ toàn bộ dữ liệu đang nhập dở dang, đóng form nhập liệu và quay về trạng thái trước đó. |
