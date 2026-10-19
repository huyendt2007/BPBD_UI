#### 4.3.1.6. Quản lý biểu phí

##### 4.3.1.6.1. Mục đích
Cho phép quản lý và cấu hình danh mục biểu phí, lệ phí quy định áp dụng cho từng loại dịch vụ công trực tuyến trong hệ thống, bao gồm:
- Tra cứu, tìm kiếm danh sách biểu phí theo loại dịch vụ, trạng thái và thời điểm áp dụng.
- Khởi tạo mới, cập nhật cấu hình mức thu phí, thời điểm áp dụng và trạng thái hiệu lực làm căn cứ tính phí tự động, phát hành biên nhận/thông báo nộp phí cho khách hàng.
- Xem chi tiết cấu hình, kết xuất danh sách ra file Excel và chuyển trạng thái ngừng áp dụng/xóa bản ghi nháp.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.6.2. MH01 - Màn hình Danh sách và Tra cứu biểu phí

###### 4.3.1.6.2.1. Màn hình

![Màn hình danh sách biểu phí](images/UC559_List.png)

###### 4.3.1.6.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối điều kiện tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng; cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Mã biểu phí | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã biểu phí...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã biểu phí. |
| Tên biểu phí | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên biểu phí...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Tên biểu phí (tiếng Việt hoặc tiếng Anh). |
| Loại dịch vụ | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đăng ký giao dịch bảo đảm<br>+ Thông báo xử lý tài sản<br>+ Thay đổi thông tin<br>+ Xóa đăng ký<br>+ Cung cấp thông tin<br>+ Cấp bản sao<br>+ Cấp mã số CSDL Một lần<br>+ Cấp mã số CSDL thường xuyên<br>+ Khác |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Hoạt động<br>+ Hết hiệu lực<br>+ Lưu nháp |
| Thời điểm áp dụng từ ngày | Date | Không | Ngày đầu tháng hiện tại | Control UI: Datepicker (`dd/mm/yyyy`).<br>- Tìm kiếm các biểu phí có Thời điểm áp dụng lớn hơn hoặc bằng giá trị đã chọn.<br>- Thời điểm áp dụng từ ngày phải nhỏ hơn hoặc bằng Thời điểm áp dụng đến ngày. |
| Thời điểm áp dụng đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker (`dd/mm/yyyy`).<br>- Tìm kiếm các biểu phí có Thời điểm áp dụng nhỏ hơn hoặc bằng giá trị đã chọn.<br>- Thời điểm áp dụng đến ngày phải lớn hơn hoặc bằng Thời điểm áp dụng từ ngày. |
| Tìm kiếm | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại Khối điều kiện tìm kiếm. |
| Xóa bộ lọc | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại Khối điều kiện tìm kiếm. |
| **II. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới dữ liệu.<br>- Không hiển thị tiêu đề phía trên bảng; các nút "Thêm mới", "Kết xuất Excel" đặt ở góc phải phía trên bảng.<br>- Cột Thao tác cố định cạnh phải bảng (Sticky) khi cuộn ngang.<br>- Cho phép chọn 10, 20, 50, 100 bản ghi/trang, mặc định 20.<br>- Click vào dòng dữ liệu để mở MH03 - Popup Chi tiết cấu hình biểu phí.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Mã biểu phí | String(50) | - | - | Control UI: Text hiển thị (Read-only). |
| Loại dịch vụ (Cột) | String(100) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên biểu phí | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Hiển thị song ngữ (Tên tiếng Việt ở trên, Tên tiếng Anh ở dưới). |
| Mức phí (VNĐ) | Decimal(18,0) | - | - | Control UI: Text hiển thị (Read-only).<br>- Căn phải, định dạng phân tách hàng nghìn (ví dụ: `300,000` VNĐ). |
| Thời điểm áp dụng | Date | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng: `dd/mm/yyyy`. |
| Trạng thái (Cột) | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Hoạt động<br>+ Hết hiệu lực<br>+ Lưu nháp |
| Thao tác | String(255) | - | - | Control UI: Nhóm icon thao tác cố định 3 slot.<br>- Cột cố định cạnh phải bảng (Sticky), luôn hiển thị khi cuộn ngang bảng.<br>- `Xem chi tiết`: Luôn kích hoạt.<br>- `Sửa`: Kích hoạt khi ở trạng thái Hoạt động hoặc Lưu nháp; làm mờ khóa (Disabled) kèm tooltip khi Hết hiệu lực.<br>- `Xóa / Ngưng dùng`: Kích hoạt khi ở trạng thái Lưu nháp (Xóa) hoặc Hoạt động (Ngưng áp dụng); làm mờ khóa (Disabled) kèm tooltip khi Hết hiệu lực. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị phía trên bảng dữ liệu. |
| Kết xuất Excel | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị phía trên bảng dữ liệu. |

###### 4.3.1.6.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút "Tìm kiếm":<br>- **TH Khoảng thời điểm áp dụng không hợp lệ**: Nếu `Thời điểm áp dụng từ ngày` lớn hơn `Thời điểm áp dụng đến ngày`, hệ thống hiển thị thông báo lỗi [MSG-ERR-VAL-007], highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH Không có dữ liệu**: Bảng hiển thị duy nhất 01 dòng căn giữa với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"* và các nút điều hướng bị khóa mờ; nút `Kết xuất Excel` bị khóa mờ.<br>- **TH Có dữ liệu**: Hiển thị danh sách các cấu hình biểu phí thỏa mãn đồng thời các điều kiện lọc, trong đó Thời điểm áp dụng nằm trong khoảng từ `Thời điểm áp dụng từ ngày` đến `Thời điểm áp dụng đến ngày`. |
| 2 | Xóa bộ lọc | Button | Đưa toàn bộ các trường trong Khối điều kiện tìm kiếm về giá trị mặc định (`Mã biểu phí` = Trống, `Tên biểu phí` = Trống, `Loại dịch vụ` = Tất cả, `Trạng thái` = Tất cả, `Thời điểm áp dụng từ ngày` = Ngày đầu tháng hiện tại, `Thời điểm áp dụng đến ngày` = Ngày hiện tại) và tải lại danh sách ban đầu. |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới / Cập nhật cấu hình biểu phí** ở trạng thái rỗng để nhập mới. |
| 4 | Kết xuất Excel | Button | Xử lý theo đúng Quy chuẩn Kỹ thuật & Nghiệp vụ Kết xuất Excel Dùng chung (Mục 5.5 trong Phụ lục `04_Danh_muc_va_Phu_luc.md`):<br>- **TH Không có dữ liệu**: Nút ở trạng thái khóa mờ (Disabled) kèm tooltip *"Không có dữ liệu để kết xuất Excel"* (hoặc hiển thị thông báo [MSG-WRN-SYS-001]).<br>- **TH Hợp lệ**: Hệ thống thực hiện kết xuất toàn bộ dữ liệu thỏa mãn bộ lọc hiện tại ra file Excel định dạng `.xlsx` (font `Times New Roman`, tên file `yyyyMMdd_Danh_sach_bieu_phi.xlsx`, tự động lấy theo các cột đang hiển thị trên lưới), tải tệp về máy tính người dùng và ghi Audit Log. |
| 5 | Xem chi tiết | Icon | Mở **MH03 - Popup Chi tiết cấu hình biểu phí** để xem toàn bộ thông tin chi tiết. |
| 6 | Sửa | Icon | Mở **MH02 - Popup Thêm mới / Cập nhật cấu hình biểu phí** và tải dữ liệu hiện tại của biểu phí để chỉnh sửa. |
| 7 | Xóa / Ngưng dùng | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` (đối với bản ghi Lưu nháp) hoặc `Ngừng hoạt động` (đối với bản ghi Hoạt động) kèm thông báo xác nhận [MSG-CFM-SYS-001]:<br>- **TH Lưu nháp (Xóa)**: Xóa hoàn toàn bản ghi khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới danh sách.<br>- **TH Hoạt động (Ngưng áp dụng)**: Chuyển trạng thái sang `Hết hiệu lực` để bảo toàn lịch sử giao dịch tài chính, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới danh sách. |
| 8 | Click dòng dữ liệu | Row Click | Mở **MH03 - Popup Chi tiết cấu hình biểu phí** tương tự thao tác Xem chi tiết. |

---

##### 4.3.1.6.3. MH02 - Popup Thêm mới / Cập nhật cấu hình biểu phí

###### 4.3.1.6.3.1. Màn hình

![Popup Thêm mới / Cập nhật biểu phí](images/UC559_Form.png)

###### 4.3.1.6.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Biểu phí** | - | - | - | Hiển thị dạng Popup Modal (Sticky Header & Footer). |
| Mã biểu phí | String(50) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Chỉ chấp nhận chữ in hoa, chữ số và dấu gạch ngang.<br>- Khóa chỉ đọc (Read-only) khi ở chế độ Cập nhật. |
| Loại dịch vụ | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm các loại dịch vụ công áp dụng tương tự MH01. |
| Tên biểu phí | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên tiếng Việt của biểu phí.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Tên biểu phí (EN) | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên tiếng Anh của biểu phí. |
| Mức phí (VNĐ) | Decimal(18,0) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập số tiền thu phí, tự động định dạng phân tách hàng nghìn khi gõ. |
| Thời điểm áp dụng | Date | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Datepicker (`dd/mm/yyyy`). |
| Trạng thái | Enum(String(50)) | Có | Hoạt động (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox / Radio.<br>Gồm:<br>+ Hoạt động<br>+ Lưu nháp |
| Mô tả / Ghi chú | Text(500) | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Textarea.<br>- Nhập căn cứ pháp lý hoặc ghi chú bổ sung. |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.6.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Mức phí không hợp lệ)**: Mức phí nhập là số âm ($< 0$) (vi phạm [BR-VAL-002]) $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-VAL-002] và focus con trỏ.<br>- **TH3 (Thời điểm áp dụng không hợp lệ)**: Khi thêm mới, chọn Thời điểm áp dụng nhỏ hơn ngày hiện tại (vi phạm [BR-VAL-002]) $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-VAL-002] và focus con trỏ.<br>- **TH4 (Trùng lặp Mã biểu phí)**: Khi thêm mới hoặc cập nhật, nhập Mã biểu phí trùng với mã đã có trên hệ thống đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Lưu nháp` theo [BR-VAL-009] $\rightarrow$ Hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách dữ liệu tại MH01. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |

---

##### 4.3.1.6.4. MH03 - Popup Chi tiết cấu hình biểu phí

###### 4.3.1.6.4.1. Màn hình

![Popup Chi tiết cấu hình biểu phí](images/UC559_Detail.png)

###### 4.3.1.6.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Chi tiết Biểu phí** | - | - | - | Hiển thị dạng Popup Modal ở chế độ Chỉ đọc (Read-only). |
| Mã biểu phí | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Loại dịch vụ | String(100) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Tên biểu phí | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Tên biểu phí (EN) | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Mức phí (VNĐ) | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Căn phải, có phân tách hàng nghìn (ví dụ: `300,000` VNĐ). |
| Thời điểm áp dụng | Date | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy`. |
| Trạng thái | Enum(String(50)) | - | Theo bản ghi | Control UI: Badge hiển thị (Read-only).<br>Gồm:<br>+ Hoạt động<br>+ Hết hiệu lực<br>+ Lưu nháp |
| Mô tả / Ghi chú | Text(500) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Đóng | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Chỉnh sửa | String(50) | - | - | Control UI: Button.<br>- Hiển thị kích hoạt khi ở trạng thái Hoạt động hoặc Lưu nháp; làm mờ khóa (Disabled) kèm tooltip khi Hết hiệu lực. |

###### 4.3.1.6.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Đóng Popup Chi tiết. |
| 2 | Chỉnh sửa | Button | Đóng Popup Chi tiết đồng thời mở **MH02 - Popup Thêm mới / Cập nhật cấu hình biểu phí** ở chế độ Sửa. |
