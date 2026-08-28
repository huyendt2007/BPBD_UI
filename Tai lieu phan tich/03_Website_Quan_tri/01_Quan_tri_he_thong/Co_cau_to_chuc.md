#### 4.3.1.7. Quản lý cơ cấu tổ chức (Đơn vị)

##### 4.3.1.7.1. Mục đích
Cho phép quản lý và tra cứu cơ cấu tổ chức, sơ đồ đơn vị hành chính và cơ quan nhà nước dưới dạng phân cấp cây đa cội (Multi-root Tree), bao gồm:
- Quản lý sơ đồ cơ cấu tổ chức nội bộ của Bộ Tư pháp và các cơ quan có thẩm quyền ngoài ngành (Tòa án, Viện kiểm sát, Cơ quan điều tra, Thi hành án, Sở Tư pháp...).
- Khởi tạo, cập nhật thông tin đơn vị gốc, đơn vị trực thuộc/phòng ban và cấu hình phạm vi báo cáo BTNN (khoảng 22.000 đơn vị).
- Cấu hình biến động tổ chức (Sáp nhập, Chia tách, Giải thể, Đổi tên) và thiết lập ánh xạ kế thừa đơn vị (Succession Mapping).
- Nhận file (Import) đồng bộ danh mục đơn vị báo cáo BTNN hàng loạt từ file Excel.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.7.2. MH01 - Màn hình Tra cứu sơ đồ tổ chức

###### 4.3.1.7.2.1. Màn hình

![Màn hình Tra cứu sơ đồ tổ chức](images/UC604.01.MH01.png)

###### 4.3.1.7.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Sơ đồ tổ chức** | - | - | - | Khối tìm kiếm và cây cấu trúc đơn vị. |
| Tìm kiếm nhanh | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm theo Mã đơn vị hoặc Tên đơn vị (không phân biệt hoa thường/dấu tiếng Việt). |
| Cây sơ đồ đơn vị | Tree | - | - | Control UI: Cây phân cấp đa cội (Multi-root).<br>- Hỗ trợ lazy-load hiển thị cấu trúc đơn vị cha - con.<br>- Cho phép click chọn từng node để xem chi tiết ở Panel phải. |
| Thêm đơn vị gốc | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại header Panel trái. |
| **II. Panel bên phải: Chi tiết đơn vị** | - | - | - | Khối xem chi tiết và danh sách cán bộ. |
| Thêm đơn vị con | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi đã chọn 01 node trên cây. |
| Sửa | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi đã chọn 01 node trên cây. |
| Xóa | String(50) | - | - | Control UI: Button.<br>- Chỉ hiển thị khi đã chọn 01 node trên cây. |
| Cấu hình biến động | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại thanh công cụ. |
| Nhận file Excel | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại thanh công cụ. |
| Tab Thông tin chung | Tab | - | Mặc định chọn | Control UI: Tab điều hướng.<br>- Hiển thị thông tin chi tiết của đơn vị đang chọn trên cây. |
| Tab Cán bộ trực thuộc | Tab | - | - | Control UI: Tab điều hướng.<br>- Hiển thị danh sách cán bộ thuộc đơn vị. |
| Bảng danh sách cán bộ | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới dữ liệu.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |

###### 4.3.1.7.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm nhanh | Input text | Khi người dùng nhập từ khóa tìm kiếm:<br>- **TH Không có dữ liệu**: Cây đơn vị hiển thị thông báo [MSG-INF-SYS-001].<br>- **TH Có dữ liệu**: Lọc và hiển thị các node khớp từ khóa kèm đường dẫn phân cấp đơn vị cha. |
| 2 | Chọn node cây | Click Node | Tải thông tin chi tiết của đơn vị được chọn sang Panel phải (Tab Thông tin chung và Tab Cán bộ trực thuộc). |
| 3 | Thêm đơn vị gốc | Button | Mở **MH02 - Popup Thêm mới / Cập nhật đơn vị** với trường `Đơn vị cha` để trống. |
| 4 | Thêm đơn vị con | Button | Mở **MH02 - Popup Thêm mới / Cập nhật đơn vị** với trường `Đơn vị cha` tự động điền theo node đang chọn. |
| 5 | Sửa | Button | Mở **MH02 - Popup Thêm mới / Cập nhật đơn vị** ở chế độ Sửa cho đơn vị đang chọn. |
| 6 | Xóa | Button | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo xác nhận [MSG-CFM-SYS-001]:<br>- **TH1 (Có đơn vị con trực thuộc)**: Đơn vị đang chọn có chứa các đơn vị/phòng ban con $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu xóa các đơn vị con trước.<br>- **TH2 (Có cán bộ trực thuộc)**: Đơn vị đang có tài khoản cán bộ trực thuộc $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu thuyên chuyển cán bộ trước.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống xóa đơn vị khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới lại cây đơn vị. |
| 7 | Cấu hình biến động | Button | Mở **MH03 - Popup Cấu hình biến động tổ chức & Kế thừa đơn vị**. |
| 8 | Nhận file Excel | Button | Mở **MH04 - Popup Nhận file / Đồng bộ danh mục đơn vị báo cáo BTNN**. |

---

##### 4.3.1.7.3. MH02 - Popup Thêm mới / Cập nhật đơn vị

###### 4.3.1.7.3.1. Màn hình

![Popup Thêm mới / Cập nhật đơn vị](images/UC604.02.MH01.png)

###### 4.3.1.7.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Đơn vị** | - | - | - | Hiển thị dạng Popup Modal. |
| Đơn vị cha | String(255) | Không | Theo node chọn / Trống | Control UI: Text hiển thị (Read-only).<br>- Tự động điền theo node đang chọn khi Thêm con, để trống khi Thêm đơn vị gốc. |
| Loại đơn vị | Enum(String(100)) | Có | Nội bộ (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Nội bộ<br>+ Cơ quan ngoài ngành<br>*(Khóa chỉ đọc khi Sửa).* |
| Cấp đơn vị | Enum(String(100)) | Không | Cấp Trung ương (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Cấp Trung ương<br>+ Cấp Tỉnh/Thành phố<br>+ Cấp Xã/Phường/Đặc khu<br>+ Đơn vị trực thuộc/Phòng ban<br>+ Cấp Quận/Huyện (Dữ liệu lịch sử) |
| Mã Đơn vị | String(50) | Có | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Text hiển thị (Read-only).<br>- Tự động sinh mã định danh duy nhất. Không cho phép sửa. |
| Tên đơn vị | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên đầy đủ của đơn vị.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Mã định danh báo cáo BTNN | String(50) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Mã phục vụ báo cáo và đối soát BTNN. |
| Nhóm cơ quan báo cáo BTNN | Enum(String(100)) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại cơ quan báo cáo [DM_43]. |
| Vai trò báo cáo BTNN | Enum(String(100)) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox (Multi-select).<br>- Tham chiếu Danh mục Vai trò báo cáo của cơ quan [DM_46]. |
| Đầu mối tổng hợp trực tiếp | Enum(Tree) | Không | Theo bản ghi | Control UI: Tree Select.<br>- Chọn đơn vị tiếp nhận/tổng hợp báo cáo của đơn vị này. |
| Đơn vị được phép nhập thay | Enum(Tree/Multi-select) | Không | Theo bản ghi | Control UI: Tree Multi-select.<br>- Chọn các đơn vị được phép tạo/nhập kỳ báo cáo thay. |
| Cho phép tạo kỳ báo cáo BTNN | Boolean | Không | Có | Control UI: Checkbox.<br>- Nếu tắt, đơn vị không xuất hiện trong danh sách chọn Đơn vị báo cáo khi lập kỳ báo cáo mới. |
| Mã số thuế | String(50) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox có tìm kiếm.<br>- Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox có tìm kiếm.<br>- Tham chiếu Danh mục Xã/Phường [DM_15] (lọc theo Tỉnh/Thành phố). |
| Địa chỉ | String(500) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text. |
| Số điện thoại | String(10) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text. |
| Người đại diện | String(255) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text. |
| Trạng thái | Enum(String(50)) | Có | Hoạt động (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox / Radio.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.7.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai định dạng / Độ dài)**: Dữ liệu vi phạm quy tắc [BR-VAL-002] hoặc [BR-VAL-003] $\rightarrow$ Highlight viền đỏ ô lỗi, hiển thị thông báo lỗi [MSG-ERR-VAL-002] hoặc [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Mã định danh báo cáo BTNN` hoặc `Tên đơn vị` trong cùng nhánh cha đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Ngừng hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính đơn vị đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới lại cây đơn vị tại MH01. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |

---

##### 4.3.1.7.4. MH03 - Popup Cấu hình biến động tổ chức & Kế thừa đơn vị

###### 4.3.1.7.4.1. Màn hình

![Popup Cấu hình biến động tổ chức](images/UC604.05.MH01.png)

###### 4.3.1.7.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin văn bản pháp lý** | - | - | - | Khối thông tin quyết định biến động. |
| Loại biến động | Enum(String(50)) | Có | Trống | Control UI: Combobox.<br>Gồm:<br>+ Sáp nhập<br>+ Chia tách<br>+ Giải thể<br>+ Đổi tên |
| Số văn bản pháp lý | String(100) | Có | Trống | Control UI: Input text.<br>- Ví dụ: `668/QĐ-BTP`. |
| Cơ quan ban hành | String(255) | Có | Trống | Control UI: Input text.<br>- Ví dụ: *Bộ Tư pháp*, *Chính phủ*... |
| Ngày ban hành | Date | Có | Trống | Control UI: Datepicker (`dd/mm/yyyy`). |
| Ngày hiệu lực | Date | Có | Trống | Control UI: Datepicker (`dd/mm/yyyy`). |
| Mô tả chi tiết | Text(1000) | Không | Trống | Control UI: Textarea. |
| **II. Thiết lập Kế thừa đơn vị** | - | - | - | Khối chọn cơ quan cũ và cơ quan mới kế thừa. |
| Danh sách cơ quan cũ | Enum(String(100)) | Có | Trống | Control UI: Combobox (Multi-select).<br>- Chọn các đơn vị cũ sẽ chuyển sang trạng thái Ngừng hoạt động. |
| Cơ quan mới kế thừa | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Chọn cơ quan mới kế thừa quyền và nghĩa vụ. |
| Lưu cấu hình | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.7.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu cấu hình | Button | Kiểm tra và ghi nhận lịch sử biến động:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH Hợp lệ**: Tự động chuyển trạng thái các đơn vị cũ sang `Ngừng hoạt động` kể từ Ngày hiệu lực, lưu dữ liệu kế thừa vào bảng lịch sử phục vụ thuật toán gợi ý giải quyết bồi thường, tạm khóa tài khoản cán bộ trực thuộc đơn vị cũ, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới cây đơn vị. |
| 2 | Hủy | Button | Đóng Popup Modal, không lưu cấu hình biến động. |

---

##### 4.3.1.7.5. MH04 - Popup Nhận file / Đồng bộ danh mục đơn vị báo cáo BTNN

###### 4.3.1.7.5.1. Màn hình

![Popup Nhận file đơn vị báo cáo BTNN](images/UC604.06.MH01.png)

###### 4.3.1.7.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Popup Nhận file** | - | - | - | Hiển thị dạng Popup Modal. |
| Tệp dữ liệu | File | Có | Trống | Control UI: Upload file.<br>- Tải lên tệp Excel (`.xls`, `.xlsx`) theo biểu mẫu hệ thống. |
| Tải file mẫu | String(50) | - | - | Control UI: Link / Button.<br>- Tải biểu mẫu Excel chuẩn để nhập dữ liệu. |
| Chế độ import | Enum(String(100)) | Có | Thêm mới và cập nhật | Control UI: Combobox.<br>Gồm:<br>+ Kiểm tra dữ liệu<br>+ Thêm mới<br>+ Cập nhật bản ghi hiện có<br>+ Thêm mới và cập nhật |
| Bảng xem trước kết quả kiểm tra | Table | - | - | Control UI: Bảng/Lưới hiển thị chi tiết các dòng hợp lệ và dòng lỗi. |
| Nhận dữ liệu | String(50) | - | - | Control UI: Button.<br>- Chỉ kích hoạt khi tệp hợp lệ hoặc có ít nhất 01 dòng hợp lệ. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.7.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tải file mẫu | Button | Tải file Excel biểu mẫu chuẩn `yyyyMMdd_Bieu_mau_don_vi_BTNN.xlsx` về máy tính người dùng. |
| 2 | Nhận dữ liệu | Button | Xử lý theo đúng Quy chuẩn Xử lý Tính năng Nhận file (Mục 5.6 trong Phụ lục `04_Danh_muc_va_Phu_luc.md`):<br>- **Giai đoạn 1 (File Validation)**: Kiểm tra đuôi file, dung lượng $\le 20MB$ và cấu trúc header. Nếu sai, hiển thị thông báo lỗi tương ứng.<br>- **Giai đoạn 2 (Row Validation & Cơ chế Thành công một phần)**: Đọc từng dòng, kiểm tra trường bắt buộc, trùng mã, mã cha hợp lệ, cấp đơn vị, danh mục tham chiếu. Ghi nhận các dòng hợp lệ vào CSDL và tổng hợp danh sách dòng lỗi.<br>- **Kết quả**: Hiển thị popup báo cáo Thống kê (*Tải lên thành công: X bản ghi / Tải lên thất bại: Y bản ghi*) và Bảng chi tiết lỗi (nếu có $Y > 0$), cập nhật lại cây đơn vị tại MH01 và ghi Audit Log. |
| 3 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác. |
