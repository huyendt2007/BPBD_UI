#### 4.3.1.5. Quản lý danh mục dùng chung (Master Data)

##### 4.3.1.5.1. Mục đích
Cho phép quản lý danh mục dữ liệu dùng chung (Master Data) của hệ thống Đăng ký biện pháp bảo đảm và Bồi thường nhà nước, bao gồm:
- Tra cứu, lọc danh mục theo Loại danh mục, từ khóa và trạng thái hoạt động.
- Thêm mới, chỉnh sửa thông tin danh mục hỗ trợ cả cấu trúc danh mục phẳng (Flat List) và danh mục phân cấp đa cấp (Hierarchical Tree List).
- Chuyển đổi trạng thái hoạt động (Hoạt động / Ngừng hoạt động) và xóa các bản ghi danh mục chưa phát sinh ràng buộc dữ liệu.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.5.2. MH01 - Màn hình Tra cứu danh mục dùng chung

###### 4.3.1.5.2.1. Màn hình

![Màn hình Tra cứu danh mục dùng chung](images/UC596.MH01.png)

###### 4.3.1.5.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Khối điều kiện tìm kiếm danh mục. |
| Loại danh mục | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Lấy danh sách các Loại danh mục đang hoạt động từ hệ thống. |
| Từ khóa | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm theo Mã danh mục, Tên danh mục hoặc Nội dung mô tả. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Tìm kiếm | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại bộ lọc. |
| Xóa bộ lọc | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại bộ lọc. |
| **II. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới dữ liệu.<br>- Cho phép chọn 10, 20, 50, 100 bản ghi/trang, mặc định 20.<br>- Click vào dòng dữ liệu để mở MH02 ở chế độ Sửa thông tin.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên danh mục | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tên hiển thị tiếng Việt của danh mục. |
| Tên danh mục (EN) | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tên hiển thị tiếng Anh của danh mục. |
| Loại danh mục (Cột) | String(100) | - | - | Control UI: Text hiển thị (Read-only). |
| Viết tắt / Mô tả | String(1000) | - | - | Control UI: Text hiển thị (Read-only).<br>- Cắt ngắn kèm tooltip nếu nội dung quá dài. |
| Viết tắt / Mô tả (EN) | String(1000) | - | - | Control UI: Text hiển thị (Read-only). |
| Trạng thái (Cột) | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Thao tác | String(255) | - | - | Control UI: Nhóm icon thao tác.<br>- `Sửa`: Luôn hiển thị.<br>- `Xóa`: Luôn hiển thị. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị phía trên bảng dữ liệu. |

###### 4.3.1.5.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút "Tìm kiếm":<br>- **TH Không có dữ liệu**: Bảng hiển thị duy nhất 01 dòng căn giữa với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"* và các nút điều hướng bị khóa mờ.<br>- **TH Có dữ liệu**: Hiển thị danh sách các bản ghi danh mục thỏa mãn điều kiện lọc. |
| 2 | Xóa bộ lọc | Button | Đưa toàn bộ các trường trong bộ lọc tìm kiếm về giá trị mặc định (`Loại danh mục` = Tất cả, `Từ khóa` = Trống, `Trạng thái` = Tất cả) và tải lại danh sách ban đầu. |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới / Cập nhật Danh mục** ở trạng thái rỗng để nhập mới. Nếu đang lọc sẵn một Loại danh mục thì tự động điền sẵn Loại danh mục đó. |
| 4 | Sửa | Icon | Mở **MH02 - Popup Thêm mới / Cập nhật Danh mục** và tải toàn bộ dữ liệu hiện tại của bản ghi để chỉnh sửa. |
| 5 | Xóa | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo xác nhận [MSG-CFM-SYS-001]:<br>- **TH1 (Danh mục đang được sử dụng)**: Danh mục đã được sử dụng trong các hồ sơ, tài khoản hoặc đang làm Danh mục cha cho các danh mục con khác $\rightarrow$ Hệ thống chặn xóa, hiển thị cảnh báo lỗi yêu cầu chuyển trạng thái sang Ngừng hoạt động.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống xóa bản ghi khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới danh sách bảng kết quả. |
| 6 | Click dòng dữ liệu | Row Click | Mở **MH02 - Popup Thêm mới / Cập nhật Danh mục** tương tự thao tác Sửa. |

---

##### 4.3.1.5.3. MH02 - Popup Thêm mới / Cập nhật Danh mục

###### 4.3.1.5.3.1. Màn hình

![Popup Thêm mới / Cập nhật Danh mục](images/UC596.MH02.png)

###### 4.3.1.5.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Danh mục** | - | - | - | Hiển thị dạng Popup Modal. |
| Loại danh mục | Enum(String(50)) | Có | Lựa chọn hiện tại (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>- Danh sách lấy từ các Loại danh mục đang hoạt động.<br>- Khóa chỉ đọc (Read-only) khi ở chế độ Sửa. |
| Mã danh mục | String(50) | Có | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Text hiển thị (Read-only).<br>- Tự động sinh mã định danh duy nhất. Không cho phép sửa. |
| Tên danh mục | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên tiếng Việt của danh mục.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Tên danh mục (EN) | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên tiếng Anh của danh mục.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Viết tắt / Mô tả | Text(2000) | Tùy điều kiện | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Textarea.<br>- Bắt buộc đối với các loại danh mục đặc thù (như Tooltip, Mẫu email...). |
| Viết tắt / Mô tả (EN) | Text(2000) | Tùy điều kiện | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Textarea.<br>- Bắt buộc đối với các loại danh mục đặc thù cần đa ngôn ngữ. |
| Danh mục cha (Trực thuộc) | Enum(String(50)) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>- Chọn danh mục cha đã có trên hệ thống (đối với danh mục dạng cây phân cấp). |
| Ghi chú | Text(2000) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Textarea.<br>- Ghi chú nội bộ dành cho quản trị viên. |
| Trạng thái | Enum(String(50)) | Có | Hoạt động (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox / Radio.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.5.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai định dạng / Độ dài)**: Dữ liệu vi phạm quy tắc [BR-VAL-002] hoặc [BR-VAL-003] $\rightarrow$ Highlight viền đỏ ô lỗi, hiển thị thông báo lỗi [MSG-ERR-VAL-002] hoặc [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Tên danh mục` trong cùng một `Loại danh mục` đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Ngừng hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính bản ghi đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách dữ liệu tại MH01. Dữ liệu có trạng thái "Ngừng hoạt động" sẽ không xuất hiện trong các combobox nghiệp vụ mới nhưng vẫn duy trì toàn vẹn dữ liệu cho các hồ sơ lịch sử. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |
