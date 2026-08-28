#### 4.3.1.5.2. Quản lý loại danh mục

##### 4.3.1.5.2.1. Mục đích
Quản lý danh sách các Loại danh mục dùng chung (Master Data Types) trong hệ thống, bao gồm:
- Tra cứu, tìm kiếm và hiển thị danh sách các Loại danh mục.
- Khởi tạo mới, cập nhật thông tin và chuyển đổi trạng thái hoạt động (Hoạt động / Ngừng hoạt động) của Loại danh mục.
- Xóa các Loại danh mục chưa phát sinh dữ liệu danh mục chi tiết liên kết.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.5.2.2. MH01 - Màn hình Tra cứu loại danh mục

###### 4.3.1.5.2.2.1. Màn hình

![Màn hình Tra cứu loại danh mục](images/UCPS010.MH01.png)

###### 4.3.1.5.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Khối điều kiện tìm kiếm loại danh mục. |
| Từ khóa | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm theo Mã loại danh mục, Tên loại danh mục hoặc Mô tả. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Tìm kiếm | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại bộ lọc. |
| Xóa bộ lọc | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại bộ lọc. |
| **II. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới dữ liệu.<br>- Cho phép chọn 10, 20, 50, 100 bản ghi/trang, mặc định 20.<br>- Click vào dòng dữ liệu để mở MH02 ở chế độ Sửa.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Mã loại danh mục | String(50) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên loại danh mục | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Mô tả | String(1000) | - | - | Control UI: Text hiển thị (Read-only). |
| Trạng thái (Cột) | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Thao tác | String(255) | - | - | Control UI: Nhóm icon thao tác.<br>- `Sửa`: Luôn hiển thị.<br>- `Xóa`: Luôn hiển thị. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị phía trên bảng dữ liệu. |

###### 4.3.1.5.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút "Tìm kiếm":<br>- **TH Không có dữ liệu**: Bảng hiển thị duy nhất 01 dòng căn giữa với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"* và các nút điều hướng bị khóa mờ.<br>- **TH Có dữ liệu**: Hiển thị danh sách các Loại danh mục thỏa mãn điều kiện lọc. |
| 2 | Xóa bộ lọc | Button | Đưa toàn bộ các trường trong bộ lọc tìm kiếm về giá trị mặc định (`Từ khóa` = Trống, `Trạng thái` = Tất cả) và tải lại danh sách ban đầu. |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới / Cập nhật Loại danh mục** ở trạng thái rỗng để nhập mới. |
| 4 | Sửa | Icon | Mở **MH02 - Popup Thêm mới / Cập nhật Loại danh mục** và tải toàn bộ dữ liệu hiện tại của bản ghi để chỉnh sửa. |
| 5 | Xóa | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo xác nhận [MSG-CFM-SYS-001]:<br>- **TH1 (Loại danh mục đang được sử dụng)**: Loại danh mục đã phát sinh các bản ghi danh mục chi tiết liên kết tại màn hình Quản lý danh mục $\rightarrow$ Hệ thống chặn xóa, hiển thị cảnh báo lỗi yêu cầu chuyển trạng thái sang Ngừng hoạt động.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống xóa bản ghi khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới danh sách bảng kết quả. |
| 6 | Click dòng dữ liệu | Row Click | Mở **MH02 - Popup Thêm mới / Cập nhật Loại danh mục** tương tự thao tác Sửa. |

---

##### 4.3.1.5.2.3. MH02 - Popup Thêm mới / Cập nhật Loại danh mục

###### 4.3.1.5.2.3.1. Màn hình

![Popup Thêm mới / Cập nhật Loại danh mục](images/UCPS010.MH02.png)

###### 4.3.1.5.2.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Loại danh mục** | - | - | - | Hiển thị dạng Popup Modal. |
| Mã loại danh mục | String(50) | Không | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text / Read-only.<br>- Cho phép người dùng tự nhập hoặc hệ thống tự động sinh mã duy nhất (định dạng `LDM_xxxx`) nếu để trống khi thêm mới.<br>- Khóa chỉ đọc (Read-only) khi ở chế độ Sửa. |
| Tên loại danh mục | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên loại danh mục.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Mô tả | Text(2000) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Textarea.<br>- Nhập thông tin mô tả chi tiết nếu có. |
| Trạng thái | Enum(String(50)) | Có | Hoạt động (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox / Radio.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.5.2.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai định dạng / Độ dài)**: Dữ liệu vi phạm quy tắc [BR-VAL-002] hoặc [BR-VAL-003] $\rightarrow$ Highlight viền đỏ ô lỗi, hiển thị thông báo lỗi [MSG-ERR-VAL-002] hoặc [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Mã loại danh mục` hoặc `Tên loại danh mục` đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Ngừng hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính bản ghi đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách dữ liệu tại MH01. Loại danh mục có trạng thái "Ngừng hoạt động" sẽ không xuất hiện trong dropdown chọn Loại danh mục khi thêm mới danh mục chi tiết nhưng vẫn duy trì toàn vẹn dữ liệu cho các bản ghi lịch sử. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |
