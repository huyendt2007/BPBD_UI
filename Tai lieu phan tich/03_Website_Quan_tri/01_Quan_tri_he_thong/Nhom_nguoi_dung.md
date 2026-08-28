#### 4.3.1.2. Quản lý nhóm người dùng

##### 4.3.1.2.1. Mục đích
Cho phép quản lý danh mục nhóm người dùng và cơ chế phân quyền kế thừa trong hệ thống, bao gồm:
- Tra cứu, tìm kiếm và hiển thị danh sách các nhóm người dùng (Khách hàng, Cán bộ nội bộ, Cán bộ cơ quan ngoài ngành...).
- Khởi tạo mới, cập nhật thông tin nhóm và gán danh sách vai trò cho nhóm (hệ thống tự động cộng dồn/union quyền hạn của các vai trò).
- Xem trước (Preview) cây quyền hạn tổng hợp của nhóm ở chế độ chỉ đọc.
- Quản lý danh sách tài khoản người dùng được gán vào nhóm và gán bổ sung tài khoản.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.2.2. MH01 - Màn hình Tra cứu nhóm người dùng

###### 4.3.1.2.2.1. Màn hình

![Màn hình Tra cứu nhóm người dùng](images/UC603.01.MH01.png)

###### 4.3.1.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Danh sách nhóm** | - | - | - | Khối tìm kiếm và bảng nhóm người dùng. |
| Tìm kiếm nhanh | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm theo Tên nhóm hoặc Mã nhóm. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại header danh sách nhóm. |
| Bảng danh sách nhóm | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- **Mặc định khi truy cập:** Hiển thị danh sách toàn bộ nhóm người dùng trên hệ thống, mặc định 20 bản ghi/trang, sắp xếp theo Ngày tạo giảm dần và tự động chọn bản ghi đầu tiên để hiển thị chi tiết sang Panel phải.<br>- Cho phép chọn 10, 20, 50, 100 bản ghi/trang, mặc định 20.<br>- Click vào dòng dữ liệu để xem chi tiết thông tin ở Panel phải.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Mã nhóm | String(50) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên nhóm | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Loại tài khoản áp dụng | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |
| Ngày tạo | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Thao tác nhóm | String(255) | - | - | Control UI: Nhóm icon thao tác.<br>- `Cập nhật`: Luôn hiển thị.<br>- `Xóa`: Luôn hiển thị. |
| **II. Panel bên phải: Chi tiết nhóm** | - | - | - | Khối xem chi tiết thông tin, quyền cộng dồn và danh sách thành viên. |
| Tab Thông tin chung | Tab | - | Mặc định chọn | Control UI: Tab điều hướng.<br>- Hiển thị thông tin chi tiết: Tên nhóm, Mã nhóm, Loại tài khoản áp dụng, Danh sách vai trò đã gán. |
| Tab Danh sách người dùng được gán | Tab | - | - | Control UI: Tab điều hướng.<br>- Hiển thị danh sách các tài khoản đang thuộc nhóm này. |
| Tìm kiếm người dùng | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm theo Họ tên, Tên đăng nhập, Email hoặc Số điện thoại. |
| Thêm người dùng | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại Tab Danh sách người dùng được gán. |
| Bảng người dùng được gán | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- **Mặc định khi truy cập:** Tự động tải danh sách các tài khoản thuộc nhóm đang chọn, mặc định 20 bản ghi/trang, sắp xếp theo Ngày gán giảm dần.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Họ và tên / Tên tổ chức | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên đăng nhập | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Loại tài khoản | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Cá nhân<br>+ Tổ chức<br>+ Cán bộ<br>+ Cơ quan có thẩm quyền |
| Email | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Số điện thoại | String(20) | - | - | Control UI: Text hiển thị (Read-only). |
| Ngày gán | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái tài khoản | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa |
| Thao tác người dùng | Icon | - | - | Control UI: Icon `Gỡ khỏi nhóm`. |
| Tab Cây quyền hạn | Tab | - | - | Control UI: Tab điều hướng.<br>- Hiển thị toàn bộ quyền hạn cộng dồn (Union) từ tất cả các vai trò của nhóm ở chế độ chỉ đọc (Read-only). |
| Tìm kiếm quyền | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa lọc nhanh trên cây quyền hạn. |
| Cây quyền hạn tổng hợp | Tree | - | - | Control UI: Cây phân cấp chỉ đọc (Read-only). |

###### 4.3.1.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm nhanh | Input text | Khi người dùng nhập từ khóa tìm kiếm nhóm:<br>- **TH Không có dữ liệu**: Bảng danh sách hiển thị duy nhất 01 dòng căn giữa nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"* và các nút điều hướng khóa mờ.<br>- **TH Có dữ liệu**: Hiển thị danh sách các nhóm người dùng thỏa mãn điều kiện tìm kiếm. |
| 2 | Click dòng nhóm | Row Click | Tải dữ liệu chi tiết của nhóm được chọn sang Panel phải (Tab Thông tin chung, Tab Danh sách người dùng được gán và Tab Cây quyền hạn). |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới / Cập nhật nhóm người dùng** ở chế độ Thêm mới. |
| 4 | Sửa | Icon | Mở **MH02 - Popup Thêm mới / Cập nhật nhóm người dùng** ở chế độ Cập nhật cho nhóm tương ứng. |
| 5 | Xóa | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo xác nhận [MSG-CFM-SYS-001]:<br>- **TH1 (Nhóm đang có dữ liệu ràng buộc)**: Nhóm đang có thành viên trực thuộc hoặc đang được gán quyền $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu gỡ người dùng khỏi nhóm trước.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống xóa nhóm khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới danh sách nhóm. |
| 6 | Tìm kiếm người dùng | Input text | Lọc danh sách tài khoản tại Tab Danh sách người dùng được gán theo từ khóa. |
| 7 | Thêm người dùng | Button | Mở **MH03 - Popup Thêm người dùng vào nhóm** cho nhóm đang chọn. |
| 8 | Gỡ khỏi nhóm | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo xác nhận. Khi chọn "Xác nhận", hệ thống gỡ tài khoản khỏi nhóm, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và tải lại bảng người dùng được gán. |
| 9 | Tìm kiếm quyền | Input text | Lọc trực tiếp các chức năng trên cây quyền hạn tổng hợp ở Tab Cây quyền hạn theo từ khóa. |

---

##### 4.3.1.2.3. MH02 - Popup Thêm mới / Cập nhật nhóm người dùng

###### 4.3.1.2.3.1. Màn hình

![Popup Thêm mới / Cập nhật nhóm người dùng](images/UC603.02.MH01.png)

###### 4.3.1.2.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Nhóm người dùng** | - | - | - | Hiển thị dạng Popup Modal (Sticky Header & Footer). |
| Mã nhóm | String(50) | Có | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Text hiển thị (Read-only).<br>- Tự động sinh mã định danh khi thêm mới. Không cho phép sửa. |
| Tên nhóm | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên nhóm người dùng.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Loại tài khoản áp dụng | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |
| Danh sách Vai trò | Enum(String(50)) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox (Multi-select).<br>- Chọn danh sách các Vai trò muốn gán cho Nhóm. |
| Tìm kiếm quyền (Xem trước) | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa để lọc cây quyền xem trước. |
| Cây quyền hạn (Xem trước) | Tree | - | - | Control UI: Cây phân cấp chỉ đọc (Read-only).<br>- Tự động cộng dồn (Union) quyền của các vai trò đã chọn theo thời gian thực (Real-time). |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.2.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai độ dài dữ liệu)**: Tên nhóm vượt quá 255 ký tự (vi phạm [BR-VAL-003]) $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Tên nhóm` đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Ngừng hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính nhóm đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin nhóm và danh sách vai trò liên kết vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách nhóm tại MH01. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |

---

##### 4.3.1.2.4. MH03 - Popup Thêm người dùng vào nhóm

###### 4.3.1.2.4.1. Màn hình

![Popup Thêm người dùng vào nhóm](images/UC603.05.MH01.png)

###### 4.3.1.2.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Popup Thêm người dùng** | - | - | - | Hiển thị dạng Popup Modal. |
| Tên nhóm | String(255) | - | Theo nhóm chọn | Control UI: Text hiển thị (Read-only). |
| Tìm kiếm tài khoản | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm theo Tên, Tên đăng nhập, Email hoặc Số điện thoại. |
| Bảng tài khoản khả dụng | - | - | Danh sách phù hợp | Control UI: Bảng có Checkbox chọn nhiều dòng.<br>- Chỉ hiển thị các tài khoản phù hợp với `Loại tài khoản áp dụng` của nhóm và chưa thuộc nhóm này.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Số lượng đã chọn | String(50) | - | Đã chọn: 0 tài khoản | Control UI: Text hiển thị (Read-only). |
| Thêm vào nhóm | String(50) | - | - | Control UI: Button.<br>- Chỉ kích hoạt (Enable) khi đã tích chọn ít nhất 01 tài khoản. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.2.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm tài khoản | Input text | Lọc danh sách tài khoản khả dụng theo từ khóa đã nhập. |
| 2 | Chọn tài khoản | Checkbox | Tích chọn/bỏ chọn tài khoản để thêm vào nhóm, cập nhật dòng số lượng `Đã chọn: X tài khoản` và kích hoạt nút `Thêm vào nhóm`. |
| 3 | Thêm vào nhóm | Button | Gán nhóm đang xem cho toàn bộ các tài khoản đã tích chọn, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và tải lại Tab Danh sách người dùng được gán tại MH01. |
| 4 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác và quay lại màn hình chính. |
