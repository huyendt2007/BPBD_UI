#### 4.3.2.15. Quản lý yêu cầu và cấp mã số sử dụng CSDL

##### 4.3.2.15.1. Tổng quan & Mục đích

**Mục đích**:

Cho phép Cán bộ nghiệp vụ quản lý tập trung toàn bộ danh sách các yêu cầu đăng ký cấp mã số sử dụng CSDL và các mã số sử dụng Cơ sở dữ liệu (CSDL) đã được cấp trên hệ thống, bao gồm:

\- Quản lý tập trung toàn bộ danh sách các yêu cầu đăng ký cấp mã số sử dụng CSDL và các mã số sử dụng CSDL đã được cấp trên hệ thống.

\- Tạo mới yêu cầu cấp mã số sử dụng CSDL.

\- Kích hoạt yêu cầu cấp mã số sử dụng CSDL sau khi đối soát thành công thông tin thanh toán (chuyển khoản ngân hàng hoặc tiền mặt).

\- Từ chối các yêu cầu cấp mã số sử dụng CSDL không hợp lệ hoặc chưa nộp phí đầy đủ.

\- Gia hạn thời hạn sử dụng đối với các mã số sử dụng CSDL thường xuyên của Cá nhân/Tổ chức khi hết hạn.

\- Khóa hoặc Mở khóa đối với các mã số sử dụng CSDL đã cấp.

*a. Phân quyền*

\- Chỉ người dùng có vai trò được gán quyền mới được truy cập và thao tác trên chức năng 
\- Các quyền có thể tách nhỏ: Xem danh sách, Tạo mới yêu cầu, Sửa, Xóa, Gia hạn, Kích hoạt, Ngưng sử dụng, Khóa/Mở khóa; hệ thống phân quyền có thể cấu hình bật/tắt từng quyền theo từng vai trò
\- Người dùng không có quyền:
+ Không nhìn thấy menu/chức năng trên giao diện,  hoặc
+ Nếu truy cập trực tiếp qua URL, hệ thống trả về thông báo không đủ quyền (ví dụ: "Bạn không có quyền truy cập chức năng này")


*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào phân hệ Website Quản trị.
\- Người dùng được cấp quyền truy cập chức năng "Quản lý yêu cầu và cấp mã số sử dụng CSDL".

---

##### 4.3.2.15.2. MH01 - Màn hình Danh sách yêu cầu và mã số sử dụng CSDL

###### 4.3.2.15.2.1. Màn hình

![Màn hình Danh sách yêu cầu và mã số sử dụng CSDL](images/UC015_017_List.png)

###### 4.3.2.15.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Bộ lọc tìm kiếm** | - | - | - | |
| Mã yêu cầu | String(50) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm chính xác hoặc gần đúng (không phân biệt chữ hoa, chữ thường; tự động cắt khoảng trắng thừa đầu và cuối chuỗi - Trim space) theo Mã yêu cầu. |
| Mã số sử dụng CSDL | String(50) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm chính xác hoặc gần đúng (không phân biệt chữ hoa, chữ thường; tự động cắt khoảng trắng thừa đầu và cuối chuỗi - Trim space) theo Mã số sử dụng CSDL. |
| Tên đối tượng đề nghị | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng (không phân biệt chữ hoa, chữ thường; tự động cắt khoảng trắng thừa đầu và cuối chuỗi - Trim space) theo Tên đối tượng đăng ký/đề nghị cấp mã. |
| Loại đối tượng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại đối tượng đề nghị cấp mã số sử dụng CSDL [DM_37]. |
| Loại mã số CSDL | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại mã số sử dụng CSDL [DM_38]. |
| Phương thức thanh toán | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Phương thức thanh toán cấp mã số sử dụng CSDL [DM_40]. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Lọc theo trạng thái yêu cầu / mã số sử dụng CSDL, gồm các giá trị: `Tất cả`, `Lưu nháp`, `Chờ thanh toán`, `Hoạt động`, `Hết hạn`, `Khóa`, `Ngưng sử dụng`, `Bị từ chối`. |
| Từ ngày | Date | Không | Ngày hiện tại trừ 2 tháng | Control UI: Datepicker.<br>- Lọc theo Ngày tạo yêu cầu, định dạng nhập `dd/mm/yyyy`.<br>- Rule so sánh khoảng ngày - **[BR-VAL-007]**. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Ngày tạo yêu cầu, định dạng nhập `dd/mm/yyyy`.<br>- Nếu Từ ngày lớn hơn Đến ngày, vi phạm **[BR-VAL-007]**, hiển thị **[MSG-ERR-VAL-007]**. |
| **Bảng danh sách kết quả** | - | - | 10 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị đồng thời yêu cầu đang xử lý và mã số sử dụng CSDL đã cấp.<br>- Sắp xếp mặc định theo Ngày tạo giảm dần.<br>- Tùy chọn số bản ghi/trang: 10/20/50/100, mặc định **10**.<br>- Chỉ hiển thị bản ghi trong phạm vi đơn vị Cán bộ nghiệp vụ đăng nhập.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số thứ tự tăng dần theo trang hiện hành. |
| Mã yêu cầu | String(50) | - | - | Control UI: Text hiển thị (Read-only).<br>- Mã số yêu cầu do hệ thống tự sinh, định dạng `RQ-YYYYMMDD-XXXX` (ví dụ: `RQ-20260625-0001`). |
| Mã số sử dụng CSDL | String(50) | - | - | Control UI: Text hiển thị (Read-only).<br>- Mã truy cập CSDL, định dạng `CQ-XXXXXX` (Cơ quan), `TX-XXXXXX` (Thường xuyên) hoặc `1L-XXXXXX` (Một lần).<br>- Hiển thị `"—"` nếu yêu cầu chưa được cấp mã. |
| Tên đối tượng đề nghị | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tên đối tượng đăng ký cấp mã theo dữ liệu hồ sơ. |
| Mã tài khoản trực tuyến | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị đối với khách hàng có liên kết Tài khoản trực tuyến (quản lý tại Module Quản lý tài khoản khách hàng), theo đúng giá trị Mã Tài khoản trực tuyến (Tên đăng nhập) đã liên kết.<br>- Hiển thị `"—"` đối với các bản ghi không liên kết tài khoản trực tuyến. |
| Loại đối tượng | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại đối tượng đề nghị cấp mã số sử dụng CSDL [DM_37]. |
| Loại mã số CSDL | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại mã số sử dụng CSDL [DM_38]. |
| Phương thức thanh toán | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Phương thức thanh toán cấp mã số sử dụng CSDL [DM_40]. |
| Ngày tạo | Date | - | - | Control UI: Text hiển thị (Read-only).<br>- Ngày tạo yêu cầu, định dạng hiển thị: `dd/mm/yyyy`. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge/Tag trạng thái.<br>- Hiển thị badge theo trạng thái hồ sơ: `Lưu nháp`, `Chờ thanh toán`, `Hoạt động`, `Hết hạn`, `Khóa`, `Ngưng sử dụng`, `Bị từ chối`.<br>- Riêng trạng thái `Bị từ chối` hiển thị thêm biểu tượng gợi ý (tooltip), di chuột vào hiển thị Lý do từ chối theo dữ liệu hồ sơ. |
| Thao tác | String(255) | - | - | Control UI: Nhóm nút thao tác.<br>- Hiển thị các nút/icon thao tác tương ứng theo trạng thái bản ghi:<br>+ **Sửa**: Chỉ hiển thị thao tác được khi bản ghi ở trạng thái "Lưu nháp"; các trạng thái khác hiển thị icon ở dạng làm mờ.<br>+ **Kích hoạt**: Chỉ hiển thị thao tác được khi bản ghi ở trạng thái "Chờ thanh toán"; các trạng thái khác hiển thị icon ở dạng làm mờ.<br>+ **Từ chối**: Chỉ hiển thị thao tác được khi bản ghi ở trạng thái "Chờ thanh toán"; các trạng thái khác hiển thị icon ở dạng làm mờ.<br>+ **Gia hạn**: Chỉ hiển thị thao tác được khi bản ghi ở trạng thái "Hết hạn"; các trạng thái khác hiển thị icon ở dạng làm mờ.<br>+ **Công tắc bật/tắt (Khóa / Mở khóa)**: Chỉ cho phép thao tác khi bản ghi ở trạng thái "Hoạt động" hoặc "Khóa"; các trạng thái khác ("Lưu nháp", "Chờ thanh toán", "Hết hạn", "Ngưng sử dụng", "Bị từ chối") hiển thị công tắc ở dạng làm mờ.<br>+ **Nguyên tắc đối với trạng thái "Ngưng sử dụng"**: Toàn bộ các nút thao tác và công tắc đều ở trạng thái khóa mờ hoàn toàn, không cho phép thực hiện bất kỳ thao tác nào.<br>*Lưu ý*: Đối với thao tác **Xóa** bản ghi ở trạng thái "Lưu nháp", Cán bộ nghiệp vụ click vào dòng bản ghi để mở **MH07 - Popup Xem chi tiết** và thực hiện thao tác xóa tại màn hình chi tiết (Bảng danh sách kết quả MH01 không hiển thị nút Xóa). |

###### 4.3.2.15.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | **TH1 (Tìm kiếm không hợp lệ)**: Nhập ngày sai định dạng `dd/mm/yyyy` hoặc Từ ngày lớn hơn Đến ngày. Vi phạm **[BR-VAL-007]**, hệ thống chặn tìm kiếm, highlight đỏ viền ô nhập lỗi đầu tiên (class `.is-invalid`), hiển thị thông báo lỗi **[MSG-ERR-VAL-007]** ngay phía dưới ô nhập và tự động focus con trỏ vào ô lỗi đó. |
| | | | **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung **[MSG-INF-SYS-001]**.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel": Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| | | | **TH3 (Có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị danh sách các bản ghi thỏa mãn điều kiện lọc theo đúng cấu trúc các cột quy định, sắp xếp mặc định theo Ngày tạo giảm dần.<br>+ Thanh phân trang (Pagination): Hiển thị thông tin phân trang thực tế (ví dụ: *"Hiển thị 1-10 của 25 bản ghi"*), kích hoạt khả dụng các nút điều hướng trang tương ứng theo số lượng trang.<br>+ Nút "Kết xuất Excel": Thiết lập ở trạng thái khả dụng (Enabled) cho phép người dùng click để xuất dữ liệu. |
| 2 | Xóa bộ lọc | Button | Đặt lại toàn bộ tiêu chí Bộ lọc tìm kiếm về giá trị mặc định (riêng Từ ngày/Đến ngày trở về khoảng 2 tháng gần nhất tính đến ngày hiện tại) và làm mới Bảng danh sách kết quả. |
| 3 | Tạo mới yêu cầu | Button | Mở **MH02 - Popup Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL** ở chế độ Tạo mới. |
| 4 | Kết xuất Excel | Button | Rule Export Excel - **[BR-EXP-040]**.<br>- Xuất tệp Excel theo đúng kết quả tìm kiếm/lọc hiện hành trên Bảng danh sách kết quả.<br>- Nếu danh sách rỗng, hiển thị **[MSG-WRN-SYS-001]** và không thực hiện xuất tệp. |
| 5 | Click dòng (Row-click) | Row Click | Khi người dùng click vào bất kỳ dòng bản ghi nào trên bảng kết quả, hệ thống mở **MH07 - Popup Xem chi tiết yêu cầu và mã số sử dụng CSDL** để xem toàn bộ thông tin chi tiết (bao gồm cả thao tác Xóa đối với hồ sơ Lưu nháp). |
| 6 | Sửa | Icon | Chỉ khả dụng khi bản ghi ở trạng thái "Lưu nháp". Mở **MH02 - Popup Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL** ở chế độ Chỉnh sửa với toàn bộ thông tin của bản ghi hiện hành. |
| 7 | Kích hoạt | Icon | Chỉ khả dụng khi bản ghi ở trạng thái "Chờ thanh toán". Mở **MH03 - Popup Kích hoạt yêu cầu cấp mã số sử dụng CSDL**. |
| 8 | Từ chối | Icon | Chỉ khả dụng khi bản ghi ở trạng thái "Chờ thanh toán". Mở **MH04 - Popup Từ chối yêu cầu cấp mã số sử dụng CSDL**. |
| 9 | Gia hạn | Icon | Chỉ khả dụng khi bản ghi ở trạng thái "Hết hạn". Mở **MH05 - Popup Gia hạn mã số sử dụng CSDL**. |
| 10 | Công tắc bật/tắt (Khóa / Mở khóa) | Toggle/Switch | - Chỉ khả dụng khi bản ghi ở trạng thái "Hoạt động" hoặc "Khóa".<br>- Trạng thái bật (ON) tương ứng "Hoạt động"; trạng thái tắt (OFF) tương ứng "Khóa".<br>- Gạt công tắc theo bất kỳ chiều nào (Hoạt động → Khóa, hoặc Khóa → Mở khóa) đều không thay đổi trạng thái ngay lập tức, mà mở **MH06 - Popup Khóa / Mở khóa mã số sử dụng CSDL** với "Hành động yêu cầu" được gợi ý sẵn tương ứng chiều gạt (Khóa hoặc Mở khóa) để người dùng xác nhận lý do trước khi hệ thống thực sự cập nhật trạng thái.<br>- Nếu người dùng bấm Hủy tại popup, công tắc tự động khôi phục về đúng trạng thái hiện hành trên hệ thống (không giữ theo vị trí vừa gạt). |

---

##### 4.3.2.15.3. MH02 - Popup Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL

###### 4.3.2.15.3.1. Màn hình

![Màn hình Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL](images/UC015_017_Create.png)

###### 4.3.2.15.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Loại đối tượng | Enum(String(50)) | Có | Trống | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại đối tượng đề nghị cấp mã số sử dụng CSDL [DM_37].<br>- Rule bắt buộc nhập - **[BR-VAL-001]**.<br>- Khi chọn "Cơ quan có thẩm quyền": ẩn trường Loại mã số sử dụng CSDL (mặc định luôn là "Sử dụng thường xuyên", Vô thời hạn) và mức phí luôn là Miễn phí. |
| Loại mã số sử dụng CSDL | Enum(String(50)) | Có | Sử dụng thường xuyên | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại mã số sử dụng CSDL [DM_38].<br>- Chỉ hiển thị khi Loại đối tượng là "Cá nhân" hoặc "Tổ chức". |
| Mã Tài khoản trực tuyến (Tên đăng nhập) | String(255) | Có* | Trống | Control UI: Input text kèm nút Tìm kiếm.<br>- (*) Bắt buộc và hiển thị khi: Loại đối tượng là "Cá nhân"/"Tổ chức" và Loại mã số là "Sử dụng thường xuyên", hoặc Loại đối tượng là "Cơ quan có thẩm quyền". Ẩn hoàn toàn với trường hợp "Cá nhân"/"Tổ chức" chọn "Sử dụng một lần".<br>- Nhập tên đăng nhập để tìm và liên kết tài khoản khách hàng quản lý tại Module Quản lý tài khoản khách hàng.<br>- Nếu tìm thấy: Hệ thống tự động điền và chuyển các trường Tên đối tượng đề nghị, Số CCCD/MST, Email, Số điện thoại, Địa chỉ liên hệ sang chế độ Chỉ đọc theo đúng dữ liệu tài khoản.<br>- Nếu không tìm thấy: Hiển thị trạng thái không tìm thấy, giữ nguyên các trường thông tin ở chế độ nhập tay. |
| Tên đối tượng đề nghị | String(255) | Có | Trống | Control UI: Input text.<br>- Rule bắt buộc nhập - **[BR-VAL-001]**.<br>- Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay. |
| Số CCCD/MST | String(50) | Không | Trống | Control UI: Input text.<br>- Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay.<br>- Nếu nhập CCCD: Rule định dạng CCCD - **[BR-VAL-004]**.<br>- Nếu nhập Mã số thuế: Rule định dạng MST - **[BR-VAL-005]**. |
| Email nhận thông tin | String(255) | Không | Trống | Control UI: Input text.<br>- Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay.<br>- Rule định dạng Email - **[BR-VAL-002]**. |
| Số điện thoại liên hệ | String(20) | Không | Trống | Control UI: Input text.<br>- Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay.<br>- Rule định dạng Số điện thoại - **[BR-VAL-003]**. |
| Địa chỉ liên hệ | String(500) | Không | Trống | Control UI: Input text.<br>- Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay. |
| Ngày tạo | Datetime | - | Ngày giờ hiện tại | Control UI: Text hiển thị (Read-only).<br>- Ghi nhận thời điểm lập yêu cầu, định dạng hiển thị: `dd/mm/yyyy HH:mm:ss`. |
| Ngày hết hạn | Date | - | Theo cấu hình | Control UI: Text hiển thị (Read-only).<br>- Hiển thị ngày hết hạn dự kiến; giá trị chính thức được hệ thống tính lại tại thời điểm Kích hoạt/Cấp mã theo quy tắc:<br>+ Cơ quan có thẩm quyền: Vô thời hạn (hiển thị `"—"`).<br>+ Cá nhân/Tổ chức (Sử dụng thường xuyên): Ngày `31/12` của năm cấp mã.<br>+ Cá nhân/Tổ chức (Sử dụng một lần): Không giới hạn thời gian (hiển thị `"—"`); mã có hiệu lực cho tới khi được sử dụng (tra cứu) đúng 01 lần. |
| Phương thức thanh toán | Enum(String(50)) | Không | Chuyển khoản ngân hàng | Control UI: Combobox.<br>- Tham chiếu Danh mục Phương thức thanh toán cấp mã số sử dụng CSDL [DM_40] (không hiển thị tùy chọn "Tất cả").<br>- Tự động khóa cố định về "Miễn phí" (không cho chọn lại) khi Loại đối tượng là "Cơ quan có thẩm quyền". |
| Mức phí cần thu | Decimal(18,0) | - | Theo cấu hình | Control UI: Text hiển thị (Read-only).<br>- Hệ thống tự động tính theo Loại đối tượng, Loại mã số sử dụng CSDL và thời điểm lập yêu cầu:<br>+ Cơ quan có thẩm quyền: Miễn phí.<br>+ Cá nhân/Tổ chức, Sử dụng một lần: Lấy theo cấu hình biểu phí dịch vụ cấp mã tra cứu một lần.<br>+ Cá nhân/Tổ chức, Sử dụng thường xuyên: Lấy theo cấu hình biểu phí dịch vụ cấp mã tra cứu thường xuyên (yêu cầu lập trước ngày 01/07 thu 100%; yêu cầu lập từ ngày 01/07 trở đi thu 50%). |
| Ghi chú thanh toán | String(500) | Không | Trống | Control UI: Textarea.<br>- Ghi chú thêm về thông tin thanh toán. |

###### 4.3.2.15.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Lưu nháp | Button | **TH1 (Trống trường bắt buộc)**: Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]** dưới ô nhập lỗi đầu tiên. Không cho phép lưu. |
| | | | **TH2 (Trùng đối tượng đã được cấp mã CSDL)**: Vi phạm **[BR-DK-027]**; Cá nhân/Tổ chức hiển thị **[MSG-ERR-VAL-009]** và chặn lưu; Cơ quan có thẩm quyền hiển thị **[MSG-CFM-DK-009]** cho phép chọn Tiếp tục hoặc Hủy. |
| | | | **TH Hợp lệ**:<br>+ Lưu yêu cầu với trạng thái "Lưu nháp", tự sinh Mã yêu cầu `RQ-YYYYMMDD-XXXX`.<br>+ Tự động sinh trước Mã số sử dụng CSDL duy nhất (không trùng lặp - **[BR-VAL-009]**) tương ứng theo loại đối tượng/loại mã (`CQ-XXXXXX`, `TX-XXXXXX`, hoặc `1L-XXXXXX`), lưu ở trạng thái "Lưu nháp" (chưa thể tra cứu, chưa liên kết tài khoản).<br>+ Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-001]** (chế độ Tạo mới) hoặc **[MSG-SUC-DK-CSDL-003]** (chế độ Chỉnh sửa) và làm mới Bảng danh sách kết quả. |
| 3 | Cấp mã | Button | **TH1 (Trống trường bắt buộc)**: Tương tự chức năng Lưu nháp - **[BR-VAL-001]**/**[MSG-ERR-VAL-001]**. |
| | | | **TH2 (Trùng đối tượng đã được cấp mã CSDL)**: Tương tự chức năng Lưu nháp - **[BR-DK-027]**. |
| | | | **TH Hợp lệ**:<br>+ Tự sinh Mã yêu cầu `RQ-YYYYMMDD-XXXX`.<br>+ Sinh ngẫu nhiên Mã số sử dụng CSDL duy nhất (không trùng lặp - **[BR-VAL-009]**): dạng `CQ-XXXXXX` (Cơ quan có thẩm quyền), `TX-XXXXXX` (Cá nhân/Tổ chức sử dụng thường xuyên), hoặc `1L-XXXXXX` (Cá nhân/Tổ chức sử dụng một lần); thiết lập trạng thái bản ghi / mã số sang "Hoạt động".<br>+ Thiết lập Ngày cấp: Ngày hiện tại (định dạng `dd/mm/yyyy`).<br>+ Thiết lập Ngày hết hạn:<br>&nbsp;&nbsp;• **Cơ quan có thẩm quyền**: Vô thời hạn (`—`, lưu giá trị NULL).<br>&nbsp;&nbsp;• **Sử dụng thường xuyên**: Ngày `31/12` của năm cấp mã.<br>&nbsp;&nbsp;• **Sử dụng một lần**: Không giới hạn thời gian (`—`, lưu giá trị NULL; mã có hiệu lực cho tới khi được sử dụng tra cứu đúng 01 lần).<br>+ Ghi nhận thông tin đóng phí tương ứng phương thức thanh toán đã chọn.<br>+ Tự động gửi email thông báo cấp mã/kích hoạt thành công kèm thông tin tài khoản cho khách hàng.<br>+ Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-002]** và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.4. MH03 - Popup Kích hoạt yêu cầu cấp mã số sử dụng CSDL

###### 4.3.2.15.4.1. Màn hình

![Màn hình Kích hoạt yêu cầu cấp mã số sử dụng CSDL](images/UC015_017_Approve.png)

###### 4.3.2.15.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã yêu cầu | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Loại mã số sử dụng CSDL | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại mã số sử dụng CSDL [DM_38]. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng đề nghị | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Loại đối tượng | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại đối tượng đề nghị cấp mã số sử dụng CSDL [DM_37]. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Mức phí cần thanh toán | Decimal(18,0) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Phương thức thanh toán | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Phương thức thanh toán cấp mã số sử dụng CSDL [DM_40]. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Số biên lai / Mã giao dịch | String(50) | Có | Trống | Control UI: Input text.<br>- Nhập số biên lai/mã giao dịch thực tế đã đối soát thành công.<br>- Rule bắt buộc nhập - **[BR-VAL-001]**. |
| Ngày giao dịch | Date | Có | Ngày hiện tại | Control UI: Datepicker.<br>- Định dạng nhập `dd/mm/yyyy`.<br>- Rule logic ngày quá khứ - **[BR-VAL-008]** (phải nhỏ hơn hoặc bằng ngày hiện tại). |
| Tệp chứng từ thanh toán | File | Có | Trống | Control UI: Upload file.<br>- Rule File chứng từ thanh toán (đơn) - **[BR-FILE-012]** (.pdf/.jpg/.png, tối đa 1 tệp, 20MB). |
| Ghi chú kích hoạt | String(500) | Không | Trống | Control UI: Textarea.<br>- Ghi chú thêm về thông tin đối soát nếu cần. |

###### 4.3.2.15.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Kích hoạt | Button | **TH1 (Trống trường bắt buộc)**: Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu. |
| | | | **TH2 (Dữ liệu không hợp lệ)**: Tệp chứng từ đính kèm không đúng định dạng hoặc vượt quá 20MB, hoặc đính kèm quá 1 tệp: Vi phạm **[BR-FILE-012]**, hiển thị **[MSG-ERR-FILE-003]**/**[MSG-ERR-FILE-004]** màu đỏ dưới ô tải tệp. Không cho phép lưu. |
| | | | **TH3 (Trùng Số biên lai/Mã giao dịch)**: Vi phạm **[BR-DK-028]**, hiển thị **[MSG-ERR-VAL-009]** dưới ô nhập tương ứng. Không cho phép lưu. |
| | | | **TH Hợp lệ**:<br>+ Cập nhật trạng thái bản ghi / Mã số sử dụng CSDL từ "Chờ thanh toán" sang "Hoạt động".<br>+ Thiết lập Ngày cấp: Ngày hiện tại (định dạng `dd/mm/yyyy`).<br>+ Thiết lập Ngày hết hạn:<br>&nbsp;&nbsp;• **Cơ quan có thẩm quyền**: Vô thời hạn (`—`, lưu giá trị NULL).<br>&nbsp;&nbsp;• **Sử dụng thường xuyên**: Ngày `31/12` của năm cấp mã.<br>&nbsp;&nbsp;• **Sử dụng một lần**: Không giới hạn thời gian (`—`, lưu giá trị NULL; mã có hiệu lực cho tới khi được sử dụng tra cứu đúng 01 lần).<br>+ Ghi nhận giao dịch đóng phí kèm Số biên lai/Mã giao dịch và tệp chứng từ đính kèm.<br>+ Tự động gửi email thông báo kích hoạt mã số thành công cho khách hàng.<br>+ Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-004]** và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.5. MH04 - Popup Từ chối yêu cầu cấp mã số sử dụng CSDL

###### 4.3.2.15.5.1. Màn hình

![Màn hình Từ chối yêu cầu cấp mã số sử dụng CSDL](images/UC015_017_Reject.png)

###### 4.3.2.15.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã yêu cầu | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng đề nghị | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Lý do từ chối | Text(500) | Có | Trống | Control UI: Textarea.<br>- Rule bắt buộc nhập ý kiến/lý do từ chối hồ sơ - **[BR-DK-025]**. |

###### 4.3.2.15.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Xác nhận từ chối | Button | **TH1 (Bỏ trống Lý do từ chối)**: Vi phạm **[BR-DK-025]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu. |
| | | | **TH Hợp lệ**: Cập nhật trạng thái yêu cầu thành "Bị từ chối", lưu Lý do từ chối vào hồ sơ. Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-005]** và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.6. MH05 - Popup Gia hạn mã số sử dụng CSDL

###### 4.3.2.15.6.1. Màn hình

![Màn hình Gia hạn mã số sử dụng CSDL](images/UC015_017_Renew.png)

###### 4.3.2.15.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã số sử dụng CSDL | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng sử dụng | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Ngày hết hạn hiện tại | Date | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Phí gia hạn | Decimal(18,0) | - | Theo cấu hình | Control UI: Text hiển thị (Read-only).<br>- Mức phí gia hạn lấy tự động từ cấu hình biểu phí dịch vụ cấp mã thường xuyên. |
| Phương thức thanh toán | Enum(String(50)) | Có | Chuyển khoản ngân hàng | Control UI: Combobox.<br>- Tham chiếu Danh mục Phương thức thanh toán cấp mã số sử dụng CSDL [DM_40]. |
| Số biên lai / Mã giao dịch | String(50) | Có | Trống | Control UI: Input text.<br>- Rule bắt buộc nhập - **[BR-VAL-001]**. |
| Tệp chứng từ thanh toán | File | Có | Trống | Control UI: Upload file.<br>- Rule File đính kèm hỗ trợ - **[BR-FILE-011]** (.pdf/.jpg/.jpeg/.png, tối đa 3 tệp, 20MB/tệp).<br>- Hiển thị danh sách tên tệp đã tải kèm chức năng Xem file (mở tab mới) và Xóa file đã tải. |
| Ghi chú gia hạn | String(500) | Không | Trống | Control UI: Textarea.<br>- Nhập ghi chú về thông tin gia hạn nếu cần. |

###### 4.3.2.15.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Xác nhận gia hạn | Button | **TH1 (Trống trường bắt buộc)**: Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu. |
| | | | **TH2 (Dữ liệu không hợp lệ)**: Tệp đính kèm không đúng định dạng hoặc vượt quá 20MB, hoặc vượt quá 3 tệp: Vi phạm **[BR-FILE-011]**, hiển thị **[MSG-ERR-FILE-003]**/**[MSG-ERR-FILE-004]**/**[MSG-ERR-FILE-005]** tương ứng. Không cho phép lưu. |
| | | | **TH3 (Trùng Số biên lai/Mã giao dịch)**: Vi phạm **[BR-DK-028]**, hiển thị **[MSG-ERR-VAL-009]**. Không cho phép lưu. |
| | | | **TH Hợp lệ**:<br>+ Nếu mã số chưa hết hạn tại thời điểm gia hạn: Ngày hết hạn mới là `31/12` của năm tiếp theo.<br>+ Nếu mã số đã hết hạn tại thời điểm gia hạn: Ngày hết hạn mới là `31/12` của năm thực hiện gia hạn.<br>+ Cập nhật trạng thái mã số sử dụng CSDL về "Hoạt động".<br>+ Ghi nhận lịch sử đóng phí gia hạn.<br>+ Gửi email thông báo gia hạn thành công, xác nhận thời hạn sử dụng mới.<br>+ Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-006]** và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.7. MH06 - Popup Khóa / Mở khóa mã số sử dụng CSDL

###### 4.3.2.15.7.1. Màn hình

![Màn hình Khóa / Mở khóa mã số sử dụng CSDL](images/UC015_017_Status.png)

###### 4.3.2.15.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã số sử dụng CSDL | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng sử dụng | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Trạng thái hiện tại | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị trạng thái hiện tại của mã số (`Hoạt động` hoặc `Khóa`). |
| Hành động yêu cầu | Enum(String(50)) | Có | Theo chiều gạt Công tắc | Control UI: Combobox.<br>- Rule bắt buộc nhập - **[BR-VAL-001]**.<br>- Tùy chọn hiển thị phụ thuộc Trạng thái hiện tại:<br>+ Nếu đang "Hoạt động": Hiển thị cố định `Khóa`.<br>+ Nếu đang "Khóa": Hiển thị cố định `Mở khóa`. |
| Lý do thay đổi | Text(500) | Có | Trống | Control UI: Textarea.<br>- Rule bắt buộc nhập - **[BR-VAL-001]**.<br>- Nhập lý do chi tiết Khóa hoặc Mở khóa mã số sử dụng CSDL. |

###### 4.3.2.15.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, khôi phục Công tắc về đúng trạng thái hiện hành, không lưu thay đổi. |
| 2 | Xác nhận | Button | **TH1 (Trống trường bắt buộc)**: Chưa chọn Hành động yêu cầu hoặc chưa nhập Lý do thay đổi. Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu. |
| | | | **TH Hợp lệ**: Cập nhật trạng thái mã số sử dụng CSDL theo Hành động yêu cầu (`Khóa` hoặc `Hoạt động`), đồng thời tạm khóa / mở khóa tương ứng quyền tra cứu của tài khoản liên kết. Ghi nhật ký hệ thống (Audit Log) lưu lịch sử thay đổi kèm lý do. Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-007]** (Khóa) hoặc **[MSG-SUC-DK-CSDL-009]** (Mở khóa) tương ứng và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.8. MH07 - Popup Xem chi tiết yêu cầu và mã số sử dụng CSDL

###### 4.3.2.15.8.1. Màn hình

![Màn hình Xem chi tiết yêu cầu và mã số sử dụng CSDL](images/UC015_017_View.png)

###### 4.3.2.15.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | - | - | - | Nhóm thông tin định danh yêu cầu và đối tượng đăng ký. |
| Mã yêu cầu | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Loại mã số sử dụng CSDL | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại mã số sử dụng CSDL [DM_38]. |
| Ngày yêu cầu | Datetime | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Trạng thái | Enum(String(50)) | - | Theo bản ghi | Control UI: Badge/Tag trạng thái.<br>- Hiển thị trạng thái của yêu cầu / mã số. |
| Lý do từ chối | Text(2000) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị khi yêu cầu ở trạng thái "Bị từ chối" và có dữ liệu. |
| Loại đối tượng | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại đối tượng đề nghị cấp mã số sử dụng CSDL [DM_37]. |
| Mã tài khoản trực tuyến | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị nếu yêu cầu có liên kết tài khoản trực tuyến từ Module Quản lý tài khoản khách hàng. |
| Tên đối tượng đề nghị | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Số CCCD/MST | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị nếu có dữ liệu gốc. |
| Email | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị nếu có dữ liệu gốc. |
| Số điện thoại | String(20) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị nếu có dữ liệu gốc. |
| Địa chỉ | String(500) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị nếu có dữ liệu gốc. |
| **II. Thông tin mã số sử dụng CSDL** | - | - | - | Chỉ hiển thị toàn bộ nhóm này khi yêu cầu đã được cấp mã (Mã số sử dụng CSDL khác `"—"`). |
| Mã số sử dụng CSDL | String(50) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Tên đăng nhập liên kết | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Chính là mã số sử dụng CSDL được cấp hoặc tên đăng nhập của tài khoản khách hàng được liên kết. |
| Ngày cấp | Date | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Ngày hết hạn | Date | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Định dạng hiển thị: `dd/mm/yyyy` hoặc `—` (đối với Cơ quan có thẩm quyền hoặc Sử dụng một lần). |
| **III. Thông tin đóng phí** | - | - | - | Nhóm thông tin thanh toán của yêu cầu. |
| Mức phí | Decimal(18,0) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only). |
| Phương thức thanh toán | Enum(String(50)) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Phương thức thanh toán cấp mã số sử dụng CSDL [DM_40]. |
| **IV. Lịch sử xử lý** | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Sắp xếp theo Ngày thực hiện giảm dần. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số thứ tự tăng dần. |
| Ngày thực hiện | Datetime | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng hiển thị: `dd/mm/yyyy HH:mm:ss`. |
| Hành động | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Gồm các giá trị: Tạo yêu cầu, Kích hoạt (Cấp mã/Phê duyệt), Từ chối, Gia hạn, Khóa, Mở khóa. |
| Người thực hiện | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Họ tên Cán bộ nghiệp vụ thực hiện thao tác, hoặc "Khách hàng" nếu là yêu cầu gửi trực tuyến. |
| Ghi chú | Text(2000) | - | - | Control UI: Text hiển thị (Read-only).<br>- Lý do thay đổi hoặc ghi chú giao dịch tương ứng. |

###### 4.3.2.15.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Luôn hiển thị ở mọi trạng thái. Đóng Popup Modal và quay lại **MH01**. |
| 2 | Sửa | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Lưu nháp"**.<br>- Khi click, hệ thống đóng MH07 và mở **MH02 - Popup Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL** ở chế độ Chỉnh sửa với toàn bộ thông tin của bản ghi hiện hành. |
| 3 | Xóa | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Lưu nháp"**.<br>- Khi click, hệ thống mở **[POPUP-CFM-001]** (Popup Xác nhận dùng chung quy định tại Phụ lục) hiển thị nội dung thông điệp **[MSG-CFM-SYS-001]**: *"Bạn có chắc chắn muốn xóa yêu cầu cấp mã số sử dụng CSDL [Mã yêu cầu] không?"*.<br>- Nếu người dùng chọn **Đồng ý**: Hệ thống thực hiện xóa vĩnh viễn bản ghi, đóng MH07, hiển thị thông báo thành công theo quy chuẩn dùng chung **[MSG-SUC-SYS-004]** và làm mới Bảng danh sách kết quả tại **MH01**.<br>- Nếu chọn **Hủy**: Đóng popup xác nhận và giữ nguyên màn hình MH07. |
| 4 | Kích hoạt | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Chờ thanh toán"**.<br>- Khi click, hệ thống đóng MH07 và mở **MH03 - Popup Kích hoạt yêu cầu cấp mã số sử dụng CSDL** để Cán bộ nghiệp vụ nhập thông tin đối soát chứng từ thanh toán. |
| 5 | Từ chối | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Chờ thanh toán"**.<br>- Khi click, hệ thống đóng MH07 và mở **MH04 - Popup Từ chối yêu cầu cấp mã số sử dụng CSDL** để Cán bộ nghiệp vụ nhập lý do từ chối yêu cầu. |
| 6 | Gia hạn | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Hết hạn"**.<br>- Khi click, hệ thống đóng MH07 và mở **MH05 - Popup Gia hạn mã số sử dụng CSDL** để Cán bộ nghiệp vụ thực hiện gia hạn thời hạn sử dụng. |
| 7 | Khóa | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Hoạt động"**.<br>- Khi click, hệ thống đóng MH07 và mở **MH06 - Popup Khóa / Mở khóa mã số sử dụng CSDL** với Hành động yêu cầu được chọn sẵn là `Khóa` để nhập lý do tạm khóa mã số. |
| 8 | Mở khóa | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Khóa"**.<br>- Khi click, hệ thống đóng MH07 và mở **MH06 - Popup Khóa / Mở khóa mã số sử dụng CSDL** với Hành động yêu cầu được chọn sẵn là `Mở khóa` để kích hoạt lại mã số. |
| 9 | Tạo bản sao | Button | **Điều kiện hiển thị**: Chỉ hiển thị khi bản ghi ở trạng thái **"Bị từ chối"**.<br>- Khi click, hệ thống đóng MH07 và mở **MH02** ở chế độ Tạo mới, tự động điền sẵn Loại đối tượng, Loại mã số, Tên đối tượng đề nghị, Số CCCD/MST, Email, Số điện thoại, Địa chỉ liên hệ, Phương thức thanh toán theo dữ liệu của yêu cầu bị từ chối để Cán bộ nghiệp vụ chỉnh sửa và gửi lại. |

*Ghi chú*: Đối với bản ghi ở trạng thái **"Ngưng sử dụng"**, màn hình chỉ hiển thị duy nhất nút **Đóng**, không hiển thị bất kỳ nút thao tác xử lý nghiệp vụ nào.
