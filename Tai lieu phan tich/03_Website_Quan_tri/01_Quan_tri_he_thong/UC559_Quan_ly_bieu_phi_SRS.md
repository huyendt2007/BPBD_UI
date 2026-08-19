# TÀI LIỆU YÊU CẦU PHẦN MỀM (SRS) - UC559: CẤU HÌNH THÔNG TIN BIỂU PHÍ
## HỆ THỐNG QUẢN TRỊ NGHIỆP VỤ - PORTAL CÁN BỘ

---

### 4.3.1.6.10. UC559 - Cấu hình thông tin về biểu phí

#### 4.3.1.6.10.1. Mục đích
\- Cho phép cán bộ quản trị hệ thống (QTHT) cấu hình, cập nhật và quản lý danh mục biểu phí, lệ phí quy định áp dụng cho từng loại dịch vụ công trực tuyến của Cục Đăng ký quốc gia giao dịch bảo đảm.
\- Cấu hình này làm căn cứ tính phí tự động và phát hành biên lai thu tiền/thông báo thanh toán cho khách hàng.

*a. Phân quyền*
\- NSD có vai trò Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
\- NSD đã đăng nhập thành công vào Hệ thống quản trị.
\- NSD truy cập đúng đường dẫn chức năng từ Menu: `Biện pháp bảo đảm` -> `Quản lý phí` -> `Quản lý Biểu phí`.

#### 4.3.1.6.10.2. UC559.MH01 - Màn hình Danh sách và Tra cứu cấu hình biểu phí

##### 4.3.1.6.10.2.1. Màn hình
![Màn hình danh sách](images/UC559_List.png)

##### 4.3.1.6.10.2.2. Mô tả thông tin trên màn hình
Bảng dưới đây mô tả toàn bộ các trường thông tin lọc và lưới kết quả hiển thị trên màn hình:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Nhập Mã biểu phí hoặc Tên biểu phí (tiếng Việt hoặc tiếng Anh) để tìm kiếm gần đúng. |
| Loại dịch vụ | Enum(String(50)) | Không | `-- Tất cả dịch vụ --` | Control UI: Hộp chọn.<br>Nhóm danh mục dịch vụ công áp dụng. Gồm:<br>- Đăng ký giao dịch bảo đảm<br>- Thông báo xử lý tài sản<br>- Thay đổi thông tin<br>- Xóa đăng ký<br>- Cung cấp thông tin<br>- Cấp bản sao<br>- Cấp mã số CSDL Một lần<br>- Cấp mã số CSDL thường xuyên<br>- Khác |
| Trạng thái | Enum(String(50)) | Không | `-- Tất cả trạng thái --` | Control UI: Hộp chọn.<br>Trạng thái hiệu lực của biểu phí. Gồm:<br>- Hoạt động (Active)<br>- Hết hiệu lực (Inactive)<br>- Lưu nháp (Draft) |
| Hiệu lực từ ngày | Date | Không | Ngày đầu tháng hiện tại | Control UI: Datepicker.<br>Bộ chọn ngày Flatpickr (định dạng `dd/mm/yyyy`). |
| Hiệu lực đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>Bộ chọn ngày Flatpickr (định dạng `dd/mm/yyyy`). |
| Tìm kiếm | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Xóa bộ lọc | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Thêm mới | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Kết xuất Excel | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Bảng lưới kết quả | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>Lưới hiển thị danh sách biểu phí phù hợp bộ lọc. Mặc định sắp xếp giảm dần theo thời điểm áp dụng. Phân trang mặc định 50 bản ghi/trang. Xem chi tiết bằng cách click đúp/Row Click vào dòng. |
| STT | Integer(10) | - | - | Control UI: Hiển thị/Read-only.<br>Số thứ tự tăng dần. |
| Mã biểu phí | Decimal(18,0) | - | - | Control UI: Hiển thị/Read-only.<br>Mã định danh duy nhất của biểu phí. |
| Loại dịch vụ | Enum(String(50)) | - | - | Control UI: Hiển thị/Read-only.<br>Loại dịch vụ công áp dụng. |
| Tên biểu phí | Decimal(18,0) | - | - | Control UI: Hiển thị/Read-only.<br>Hiển thị song ngữ: Tên tiếng Việt ở trên, Tên tiếng Anh (`name_en`) ở dưới dạng chữ nghiêng màu xám. |
| Mức phí (VNĐ) | Decimal(18,0) | - | - | Control UI: Hiển thị/Read-only.<br>Mức thu tiền của biểu phí, định dạng dấu chấm phân tách hàng nghìn theo chuẩn `vi-VN` (ví dụ: `300.000` VNĐ). |
| Ngày áp dụng | Date | - | - | Control UI: Hiển thị/Read-only.<br>Ngày bắt đầu có hiệu lực (định dạng `dd/mm/yyyy`). |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Hiển thị/Read-only.<br>Trạng thái của biểu phí (Hoạt động, Hết hiệu lực, Lưu nháp). |
| Thao tác | - | - | - | Control UI: Nút bấm.<br>Hiển thị cố định 3 nút bấm tác vụ:<br>- Xem chi tiết: Luôn hoạt động, bấm mở popup UC559.MH03.<br>- Chỉnh sửa: Chỉ hoạt động khi ở trạng thái Hoạt động hoặc Lưu nháp (mở popup UC559.MH02). Vơ hiệu hóa (mờ ẩn opacity: 0.35, pointer-events: none, cursor: not-allowed) kèm tooltip "Biểu phí đã hết hiệu lực, không được phép chỉnh sửa" khi ở trạng thái Hết hiệu lực.<br>- Xóa / Ngưng dùng: Khi ở trạng thái Lưu nháp, bấm mở popup xác nhận xóa vật lý. Khi ở trạng thái Hoạt động, bấm mở popup xác nhận ngưng áp dụng. Vơ hiệu hóa (mờ ẩn opacity: 0.35, pointer-events: none, cursor: not-allowed) kèm tooltip "Biểu phí đã hết hiệu lực ngưng hoạt động" khi ở trạng thái Hết hiệu lực. |

##### 4.3.1.6.10.2.3. Chức năng trên màn hình
Mô tả các luồng hành động xử lý cấp trang:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | \- Hệ thống thực hiện lọc danh sách lưới kết quả theo tiêu chí lọc được chọn.<br>\- Trả về danh sách rỗng nếu không tìm thấy bản ghi phù hợp. |
| 2 | Xóa bộ lọc | Nút | \- Đặt lại tất cả các bộ lọc tìm kiếm về giá trị mặc định.<br>\- Gọi API nạp lại lưới dữ liệu đầy đủ.<br>\- Hiển thị thông báo: "Đã xóa bộ lọc tìm kiếm và tải lại danh sách!" |
| 3 | Thêm mới | Nút | \- Mở Popup Thêm mới biểu phí (UC559.MH02) với các trường trống. |
| 4 | Kết xuất Excel | Nút | \- TH1: Lưới dữ liệu rỗng.<br>  \+ Hệ thống chặn thao tác.<br>  \+ Hiển thị cảnh báo vi phạm quy tắc **[BR-EXP-040]** với thông báo **[MSG-WRN-SYS-001]** ("Không có dữ liệu để xuất Excel.").<br>\- TH Hợp lệ:<br>  \+ Thực hiện xuất dữ liệu lưới hiện hành ra file Excel dạng `.xlsx`.<br>  \+ Hiển thị thông báo: "Kết xuất Excel thành công!" |

---

#### 4.3.1.6.10.3. UC559.MH02 - Popup Thêm mới / Cập nhật cấu hình biểu phí

##### 4.3.1.6.10.3.1. Màn hình
![Màn hình thêm mới cập nhật](images/UC559_Form.png)

##### 4.3.1.6.10.3.2. Mô tả thông tin trên màn hình
Popup được thiết kế theo quy tắc Sticky Modal (Header và Footer luôn cố định, chỉ cuộn phần Body):

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã biểu phí | String(50) | Có | Trống | Mã định danh duy nhất của cấu hình. Chỉ chấp nhận chữ in hoa, số và dấu gạch ngang. Khóa không cho phép sửa (Read-only) khi ở chế độ Cập nhật. |
| Loại dịch vụ | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>Chọn loại dịch vụ công áp dụng. Các tùy chọn giống như MH01. |
| Tên biểu phí | String(255) | Có | Trống | Tên tiếng Việt của biểu phí. |
| Tên biểu phí (EN) | String(255) | Có | Trống | Tên tiếng Anh tương ứng để dùng cho đa ngôn ngữ. |
| Mức phí (VNĐ) | String(20) | Có | Trống | Số tiền phí quy định. Tự động định dạng dấu chấm phân tách hàng nghìn khi người dùng gõ. |
| Ngày áp dụng | Date | Có | Trống | Control UI: Datepicker.<br>Tích hợp lịch Flatpickr. Định dạng hiển thị: `dd/mm/yyyy`. |
| Trạng thái | - | Có | Hoạt động | Control UI: Nút bấm.<br>Gồm 2 lựa chọn:<br>- Hoạt động (Active)<br>- Lưu nháp (Draft) |
| Mô tả / Ghi chú | String(500) | Không | Trống | Textarea nhập tự do về căn cứ pháp lý hoặc ghi chú bổ sung. |
| Lưu | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Hủy | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.1.6.10.3.3. Chức năng trên màn hình
Mô tả chi tiết các trường hợp và quy tắc ràng buộc nghiệp vụ khi bấm nút:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | \- TH1: Để trống một trong các trường bắt buộc (Mã, Loại dịch vụ, Tên, Tên EN, Mức phí, Ngày áp dụng).<br>  \+ Hệ thống chặn lưu dữ liệu.<br>  \+ Áp dụng quy tắc bẫy lỗi **[BR-VAL-001]**, viền đỏ ô lỗi đầu tiên bằng class `.is-invalid` và hiển thị cảnh báo đỏ **[MSG-ERR-VAL-001]** ("Đây là trường bắt buộc") ngay phía dưới ô nhập đó.<br>  \+ Tự động focus con trỏ vào ô nhập lỗi đầu tiên đó. |
| | | | \- TH2: Nhập Mức phí là số âm (< 0).<br>  \+ Hệ thống chặn lưu.<br>  \+ Bôi đỏ viền ô nhập mức phí và hiển thị cảnh báo đỏ phía dưới: "Mức phí dịch vụ không được phép nhỏ hơn 0 VNĐ".<br>  \+ Focus con trỏ vào ô nhập mức phí. |
| | | | \- TH3: Khi Thêm mới, chọn Ngày áp dụng nhỏ hơn ngày hiện tại.<br>  \+ Hệ thống chặn lưu.<br>  \+ Bôi đỏ viền ô Ngày áp dụng và hiển thị cảnh báo đỏ phía dưới: "Ngày áp dụng phải lớn hơn hoặc bằng ngày hiện tại".<br>  \+ Focus con trỏ vào ô chọn ngày. |
| | | | \- TH4: Khi Thêm mới, nhập Mã biểu phí bị trùng với mã đã tồn tại.<br>  \+ Hệ thống chặn lưu.<br>  \+ Áp dụng quy tắc bẫy lỗi **[BR-VAL-009]** và hiển thị cảnh báo đỏ **[MSG-ERR-VAL-009]** ("Dữ liệu Mã biểu phí '[Mã_Biểu_Phí]' đã tồn tại trên hệ thống. Vui lòng kiểm tra lại.") bên dưới ô nhập mã biểu phí. |
| | | | \- TH Hợp lệ:<br>  \+ Loại bỏ toàn bộ dấu chấm phân tách trong ô nhập Mức phí và lưu dữ liệu vào CSDL.<br>  \+ Đóng Popup và gọi API nạp lại danh sách dữ liệu trên MH01.<br>  \+ Hiển thị thông báo Toast thành công: **[MSG-SUC-SYS-002]** ("Cập nhật dữ liệu thành công.") đối với Cập nhật, hoặc "Thêm mới biểu phí thành công!" đối với Thêm mới. |
| 2 | Hủy | Nút | \- TH Hợp lệ:<br>  \+ Đóng Popup lập tức, không lưu lại dữ liệu thay đổi. |

---

#### 4.3.1.6.10.4. UC559.MH03 - Popup Chi tiết cấu hình biểu phí

##### 4.3.1.6.10.4.1. Màn hình
![Màn hình xem chi tiết](images/UC559_Detail.png)

##### 4.3.1.6.10.4.2. Mô tả thông tin trên màn hình
Hiển thị toàn bộ thông tin chi tiết của biểu phí đã chọn ở chế độ Chỉ đọc (Read-only):

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông tin chi tiết | String(255) | - | - | Control UI: Hiển thị/Read-only.<br>Hiển thị lại toàn bộ dữ liệu cấu hình biểu phí ở dạng chỉ đọc (Mã, Loại dịch vụ, Tên, Tên EN, Mức phí định dạng dấu chấm phân tách hàng nghìn, Ngày áp dụng, Trạng thái, Mô tả). |
| Đóng | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Chỉnh sửa | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.1.6.10.4.3. Chức năng trên màn hình
Mô tả hoạt động của các nút tại Footer của màn hình Xem chi tiết:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | \- TH Hợp lệ: Đóng popup Xem chi tiết. |
| 2 | Chỉnh sửa | Nút | \- TH1: Biểu phí đang ở trạng thái Hết hiệu lực.<br>  \+ Nút Chỉnh sửa bị vô hiệu hóa (làm mờ ẩn `opacity: 0.35; pointer-events: none; cursor: not-allowed;`).<br>  \+ Rê chuột hiển thị tooltip: "Biểu phí đã hết hiệu lực, không được phép chỉnh sửa".<br>\- TH Hợp lệ (Trạng thái Hoạt động / Lưu nháp):<br>  \+ Đóng popup Xem chi tiết đồng thời mở nhanh popup Cập nhật biểu phí (UC559.MH02). |

---

#### 4.3.1.6.10.5. UC559.MH04 - Popup Xác nhận Xóa/Ngưng áp dụng

##### 4.3.1.6.10.5.1. Màn hình
![Popup xác nhận](images/UC559_Confirm.png)

##### 4.3.1.6.10.5.2. Mô tả thông tin trên màn hình
Popup Custom Modal xác nhận nghiệp vụ (không sử dụng hộp thoại confirm mặc định của trình duyệt):

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề & Nội dung | Text(2000) | - | - | Control UI: Hiển thị/Read-only.<br>Hiển thị thông báo xác nhận: **[MSG-CFM-SYS-001]** ("Bạn có chắc chắn muốn xóa bản ghi [Tên bản ghi] không?") hoặc câu hỏi ngưng áp dụng cụ thể kèm theo mã biểu phí. |
| Đồng ý | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Hủy bỏ | - | Có | - | Control UI: Nút bấm.<br>Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.1.6.10.5.3. Chức năng trên màn hình
Mô tả chi tiết logic xóa vật lý và xóa mềm của biểu phí:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đồng ý | Nút | \- TH1: Biểu phí ở trạng thái Lưu nháp.<br>  \+ Hệ thống thực hiện xóa vật lý (xóa hoàn toàn bản ghi khỏi CSDL).<br>  \+ Đóng popup xác nhận, cập nhật lại lưới dữ liệu MH01.<br>  \+ Hiển thị thông báo thành công: "Đã xóa vĩnh viễn cấu hình nháp [MÃ_BIỂU_PHÍ]!"<br>\- TH2: Biểu phí ở trạng thái Hoạt động.<br>  \+ Hệ thống chuyển trạng thái hoạt động sang Hết hiệu lực (Inactive) để bảo vệ log tài chính lịch sử, không xóa vật lý bản ghi.<br>  \+ Đóng popup xác nhận, cập nhật lại lưới dữ liệu MH01.<br>  \+ Hiển thị thông báo: "Đã ngừng hoạt động cấu hình biểu phí [MÃ_BIỂU_PHÍ] thành công!" |
| 2 | Hủy bỏ | Nút | \- TH Hợp lệ:<br>  \+ Đóng popup xác nhận và không thực hiện thay đổi trạng thái biểu phí. |
