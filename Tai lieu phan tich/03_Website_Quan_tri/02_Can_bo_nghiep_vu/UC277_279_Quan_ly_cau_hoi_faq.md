### 4.3.2.14. UC277_UC279 - Phân hệ Quản lý câu hỏi và trả lời thường gặp (FAQ) (WebAdmin-08-09-03)

#### 4.3.2.14.1. Mục đích
\- Phân hệ Quản lý câu hỏi và trả lời thường gặp (FAQ) (WebAdmin-08-09-03) số hóa việc quản lý, tra cứu, đăng tải, cập nhật và phê duyệt các câu hỏi thường gặp và câu trả lời giải đáp thắc mắc của người dùng về lĩnh vực đăng ký biện pháp bảo đảm.

*a. Phân quyền*
\- Chuyên viên nghiệp vụ: Thực hiện tìm kiếm, xem chi tiết câu hỏi FAQ, thêm mới, chỉnh sửa, xóa và gửi duyệt yêu cầu phê duyệt câu hỏi FAQ.
\- Lãnh đạo đơn vị (Người phê duyệt): Thực hiện toàn bộ quyền hạn của Chuyên viên nghiệp vụ, đồng thời có thêm quyền hạn phê duyệt hoặc từ chối duyệt các câu hỏi FAQ ở trạng thái Chờ duyệt.

*b. Điều kiện thực hiện*
\- Cán bộ đã đăng nhập thành công vào hệ thống quản trị của NRAST.
\- Tài khoản được phân vai trò tương ứng: Lãnh đạo đơn vị hoặc Chuyên viên nghiệp vụ.

---

#### 4.3.2.14.2. UC277_279.MH01 - Màn hình Tra cứu câu hỏi thường gặp (FAQ)

##### 4.3.2.14.2.1. Màn hình
\- Giao diện bao gồm vùng bộ lọc tìm kiếm phía trên, thanh thống kê KPI nhanh, thanh công cụ nút chức năng và lưới danh sách kết quả hỗ trợ phân trang ở phía dưới.
![Màn hình Tra cứu câu hỏi thường gặp (FAQ)](images/UC277_279_MH01.png)

##### 4.3.2.14.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa | String(255) | Không | Trống | - Nhập từ khóa tìm kiếm theo nội dung Câu hỏi hoặc nội dung Trả lời. |
| Nhóm chủ đề | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Chọn nhóm chủ đề phân loại câu hỏi FAQ.<br>- Danh sách giá trị bao gồm:<br>  + Tất cả nhóm chủ đề<br>  + Tài khoản và Phân quyền<br>  + Nghiệp vụ Đăng ký biện pháp bảo đảm<br>  + Thanh toán phí và Lệ phí<br>  + Sự cố kỹ thuật và lỗi hệ thống |
| Trạng thái | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Chọn trạng thái phê duyệt của bản ghi.<br>- Danh sách giá trị bao gồm:<br>  + Tất cả trạng thái<br>  + Lưu nháp<br>  + Chờ duyệt<br>  + Đã duyệt<br>  + Từ chối |
| Từ ngày tạo | String(10) | Không | Ngày đầu tiên của tháng hiện tại | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ). |
| Đến ngày tạo | String(10) | Không | Ngày hiện tại | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ). |
| **II. Thống kê nhanh KPI** | | | | |
| Chỉ số KPI | - | Không | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Hiển thị 3 khối đếm trạng thái động:<br>  + **Tất cả** (Tổng số lượng bản ghi)<br>  + **Chờ duyệt** (Số lượng bản ghi ở trạng thái Chờ duyệt)<br>  + **Từ chối** (Số lượng bản ghi ở trạng thái Từ chối) |
| **III. Bảng danh sách kết quả** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Lưới kết quả | - | Không | Lấy từ hệ thống | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách các câu hỏi FAQ thỏa mãn bộ lọc.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Cột: STT | Integer(10) | Có | Số thứ tự tăng dần | - Số thứ tự dòng dữ liệu (tính liên tục theo phân trang). |
| Cột: Câu hỏi | String(255) | Có | Lấy từ hệ thống | - Nội dung câu hỏi thường gặp. Dạng liên kết link, click mở xem chi tiết. |
| Cột: Nhóm chủ đề | String(255) | Có | Lấy từ hệ thống | - Tên nhóm chủ đề phân loại của câu hỏi. |
| Cột: Thứ tự hiển thị | Integer(10) | Không | Lấy từ hệ thống | - Số thứ tự ưu tiên hiển thị (số nguyên dương). |
| Cột: Ngày tạo | Date | Có | Lấy từ hệ thống | - Ngày tạo câu hỏi FAQ (định dạng `dd/mm/yyyy`). |
| Cột: Trạng thái | Enum(String(50)) | Có | Lấy từ hệ thống | - Nhãn màu biểu thị trạng thái phê duyệt:<br>  + **Lưu nháp**: Badge màu xám.<br>  + **Chờ duyệt**: Badge màu vàng.<br>  + **Đã duyệt**: Badge màu xanh lá.<br>  + **Từ chối**: Badge màu đỏ. |
| Cột: Thao tác | - | Có | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Tập hợp các hành động nghiệp vụ tương ứng cho mỗi vai trò.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.14.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xóa bộ lọc | Nút | - Thao tác: Người dùng bấm nút **[Xóa bộ lọc]**.<br>- Xử lý: Thiết lập lại toàn bộ các bộ lọc tìm kiếm về giá trị mặc định (Từ khóa rỗng, Nhóm chủ đề và Trạng thái về "Tất cả", ngày tạo từ đầu tháng đến ngày hiện tại). Tự động kích hoạt lại tìm kiếm để cập nhật lại lưới dữ liệu. |
| 2 | Tìm kiếm | Nút | - Thao tác: Người dùng bấm nút **[Tìm kiếm]**.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| | | | - TH1 (Từ ngày > Đến ngày): Hệ thống hiển thị thông báo lỗi: *"Từ ngày tạo không được lớn hơn Đến ngày tạo"* và chặn tìm kiếm. |
| | | | - TH Hợp lệ: Hệ thống lọc danh sách câu hỏi FAQ theo các tiêu chí đã nhập/chọn trên form bộ lọc, trả kết quả và phân trang lại lưới dữ liệu (20 bản ghi/trang). |
| 3 | Thêm mới | Nút | - Thao tác: Người dùng bấm nút **[Thêm mới]**.<br>- Xử lý: Mở Modal Thêm mới/Chỉnh sửa câu hỏi FAQ (`UC277_279.MH03`). |
| 4 | Kết xuất Excel | Nút | - Thao tác: Người dùng bấm nút **[Kết xuất Excel]**. |
| | | | - TH1 (Danh sách kết quả rỗng): Hệ thống hiển thị thông báo lỗi: *"Không có dữ liệu để export"* và chặn thực hiện. |
| | | | - TH Hợp lệ: Hệ thống xuất toàn bộ danh sách đang hiển thị ra tệp Excel (.xlsx) với các thông tin tương ứng, đặt tên mặc định: `Danh_sach_FAQ_[YYYYMMDD].xlsx`. |
| 5 | Lọc theo KPI | Click khối số liệu | - Thao tác: Người dùng click vào một trong ba khối KPI (Tất cả, Chờ duyệt, Từ chối).<br>- Xử lý: Hệ thống tự động lọc nhanh lưới dữ liệu theo trạng thái tương ứng của KPI được chọn và cập nhật lại số lượng bản ghi hiển thị.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 6 | Xem | Nút trên dòng | - Thao tác: Người dùng nhấp đúp vào dòng dữ liệu hoặc click row click trên cột Thao tác.<br>- Xử lý: Hệ thống hiển thị Modal xem chi tiết câu hỏi FAQ (`UC277_279.MH02`). |
| 7 | Sửa | Nút trên dòng | - Thao tác: Người dùng click icon sửa trên cột Thao tác.<br>- Xử lý: Chỉ khả dụng khi bản ghi ở trạng thái "Lưu nháp" hoặc "Từ chối". Mở Modal Thêm mới/Chỉnh sửa câu hỏi FAQ (`UC277_279.MH03`). Đối với trạng thái khác, nút sẽ bị làm mờ (opacity 0.35, pointer-events none). |
| 8 | Xóa | Nút trên dòng | - Thao tác: Người dùng click icon xóa trên cột Thao tác. |
| | | | - TH1 (Trạng thái khác Lưu nháp): Hệ thống không hiển thị nút hoặc vô hiệu hóa nút xóa. |
| | | | - TH Hợp lệ: Hệ thống hiển thị Popup xác nhận: *"Bạn có chắc chắn muốn xóa câu hỏi này không?"*. Nếu chọn Đồng ý, hệ thống cập nhật trạng thái bản ghi thành Đã xóa (Xóa mềm), ẩn khỏi danh sách và hiển thị toast thông báo: *"Xóa câu hỏi thành công"*. |
| 9 | Gửi duyệt | Nút trên dòng | - Thao tác: Người dùng click icon gửi duyệt trên cột Thao tác. |
| | | | - TH1 (Trạng thái khác Lưu nháp): Hệ thống vô hiệu hóa nút gửi duyệt. |
| | | | - TH Hợp lệ: Hệ thống chuyển trạng thái bản ghi từ "Lưu nháp" sang "Chờ duyệt", đồng thời gửi thông báo trong hệ thống đến Lãnh đạo có thẩm quyền duyệt và hiển thị toast thông báo: *"Gửi duyệt câu hỏi thành công"*. |

---

#### 4.3.2.14.3. UC277_279.MH02 - Màn hình Chi tiết câu hỏi thường gặp (FAQ)

##### 4.3.2.14.2.1. Màn hình
\- Hiển thị dạng Modal Popup cố định Header và Footer, cuộn nội dung độc lập ở phần Body.
![Màn hình Chi tiết câu hỏi thường gặp (FAQ)](images/UC277_279_MH02.png)

##### 4.3.2.14.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Câu hỏi | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Nội dung câu hỏi thường gặp. |
| Nội dung trả lời | Text(2000) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Nội dung giải đáp chi tiết (hiển thị định dạng văn bản giàu ký tự). |
| Nhóm chủ đề | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Tên nhóm chủ đề phân loại câu hỏi FAQ. |
| Thứ tự hiển thị | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Thứ tự sắp xếp hiển thị. |
| Tags | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Từ khóa phân loại (nếu có). |
| Trạng thái | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Nhãn trạng thái phê duyệt hiện tại. |
| **II. Danh sách file đính kèm** | | | | |
| File tài liệu đính kèm | File | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Danh sách các file tài liệu hướng dẫn (PDF, JPG, PNG). Có liên kết "Xem file" để xem/tải về. |
| File hướng dẫn media | File | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Danh sách các video/âm thanh hướng dẫn (MP4, MP3). Có liên kết "Xem file". |
| **III. Lịch sử duyệt (Chỉ hiển thị khi đã qua phê duyệt hoặc từ chối)** | | | | |
| Người gửi duyệt | String(100) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Họ và tên chuyên viên thực hiện gửi duyệt. |
| Ngày gửi duyệt | Date | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Thời gian bấm gửi duyệt. |
| Người duyệt | String(100) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Họ và tên Lãnh đạo thực hiện phê duyệt/từ chối. |
| Ngày duyệt | Date | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Thời gian thực hiện duyệt. |
| Lý do từ chối | Text(2000) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Chỉ hiển thị nếu trạng thái là "Từ chối". |
| **IV. Form Phê duyệt (Chỉ hiển thị với vai trò Lãnh đạo khi trạng thái là Chờ duyệt)** | | | | |
| Lý do từ chối nhập liệu | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Chỉ bắt buộc nhập khi chọn hành động **[Từ chối]**. Tối đa 1000 ký tự. |

##### 4.3.2.14.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị với người dùng là Lãnh đạo đơn vị khi bản ghi ở trạng thái "Chờ duyệt".<br>- **Thao tác**: Lãnh đạo bấm nút **[Phê duyệt]**.<br>- **Xử lý**: Hệ thống cập nhật trạng thái bản ghi sang "Đã duyệt"; ghi nhận thông tin người duyệt và ngày duyệt; hiển thị thông báo toast: *"Phê duyệt câu hỏi thành công"*; đóng Modal và tải lại danh sách. |
| 2 | Từ chối | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị với người dùng là Lãnh đạo đơn vị khi bản ghi ở trạng thái "Chờ duyệt".<br>- **Thao tác**: Lãnh đạo bấm nút **[Từ chối]**. |
| | | | - TH1 (Trống lý do): Nếu trường Lý do từ chối để trống hoặc chỉ nhập ký tự trắng, hệ thống hiển thị cảnh báo đỏ dưới ô nhập liệu: *"Vui lòng nhập lý do từ chối duyệt"*, highlight viền đỏ ô nhập và chặn từ chối. |
| | | | - TH Hợp lệ: Hệ thống cập nhật trạng thái bản ghi sang "Từ chối"; lưu lý do từ chối đã nhập; ghi nhận thông tin người duyệt; hiển thị thông báo toast: *"Từ chối duyệt câu hỏi thành công"*; đóng Modal và tải lại danh sách. |
| 3 | Xem file | Link | - Thao tác: NSD click liên kết "Xem file" cạnh tên tệp tin.<br>- Xử lý: Mở xem trực tiếp tệp tin PDF/ảnh trong tab mới hoặc thực hiện tải xuống tệp tin. |
| 4 | Đóng | Nút | - Thao tác: NSD click nút **[Đóng]** ở Footer hoặc nút `x` ở góc phải Header.<br>- Xử lý: Đóng Modal Popup và quay lại lưới tra cứu. |

---

#### 4.3.2.14.4. UC277_279.MH03 - Màn hình Thêm mới/Chỉnh sửa câu hỏi thường gặp (FAQ)

##### 4.3.2.14.2.1. Màn hình
\- Hiển thị dưới dạng Modal Popup khi người dùng click nút Thêm mới hoặc nút Sửa trên dòng bản ghi. Giao diện cố định Header và Footer, cuộn ở phần Body.
![Màn hình Thêm mới/Chỉnh sửa câu hỏi thường gặp (FAQ)](images/UC277_279_MH03.png)

##### 4.3.2.14.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Câu hỏi | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Nhập nội dung câu hỏi thường gặp của khách hàng. |
| Nội dung trả lời | Text(2000) | Có | Trống | - Nhập nội dung giải đáp, hướng dẫn chi tiết cho khách hàng. Hỗ trợ định dạng văn bản nâng cao (in đậm, in nghiêng, danh sách, chèn link...). |
| Nhóm chủ đề | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn nhóm chủ đề phân loại câu hỏi FAQ.<br>- Danh sách giá trị bao gồm:<br>  + Tài khoản và Phân quyền<br>  + Nghiệp vụ Đăng ký biện pháp bảo đảm<br>  + Thanh toán phí và Lệ phí<br>  + Sự cố kỹ thuật và lỗi hệ thống |
| Thứ tự hiển thị | Integer(10) | Không | Trống | - Nhập số nguyên dương thể hiện thứ tự ưu tiên hiển thị. |
| Tags / Từ khóa | String(255) | Không | Trống | Control UI: Textbox.<br>- Nhập các tag phân loại giúp tìm kiếm nhanh (nhấn Enter để thêm tag). Tối đa 10 tags. |
| File tài liệu đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Nhãn nút bấm: **[Chọn tệp]**, trạng thái: **"Chưa có tệp nào được chọn"** hoặc **"Đã chọn X tệp"**.<br>- Quy tắc kỹ thuật:<br>  + Số lượng: Tối đa **5 tệp tin**.<br>  + Dung lượng: Tối đa **10MB/tệp**.<br>  + Định dạng hợp lệ: `.pdf`, `.jpg`, `.png`, `.jpeg`. Chặn định dạng khác.<br>  + Tệp tải lên thành công hiển thị biểu tượng kẹp giấy, tên tệp tin (thu gọn bằng dấu `...` nếu quá dài) và hai liên kết **"Xem file"** / **"Xóa"** liền kề trên cùng một dòng. |
| File hướng dẫn media | File | Không | Trống | Control UI: Upload file.<br>- Nhãn nút bấm: **[Chọn tệp]**, trạng thái: **"Chưa có tệp nào được chọn"** hoặc **"Đã chọn X tệp"**.<br>- Quy tắc kỹ thuật:<br>  + Số lượng: Tối đa **3 tệp tin**.<br>  + Dung lượng: Tối đa **50MB/tệp**.<br>  + Định dạng hợp lệ: `.mp4`, `.mp3`. Chặn định dạng khác.<br>  + Tệp tải lên hiển thị biểu tượng, tên tệp tin (thu gọn bằng dấu `...` nếu quá dài) và hai liên kết **"Xem file"** / **"Xóa"** liền kề trên cùng một dòng. |

##### 4.3.2.14.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu nháp | Nút | - Thao tác: Người dùng nhập liệu và bấm nút **[Lưu nháp]**. |
| | | | - TH1 (Bỏ trống trường bắt buộc): Hệ thống kiểm tra các trường bắt buộc (Câu hỏi, Nội dung trả lời, Nhóm chủ đề). Nếu có trường trống, hiển thị báo lỗi đỏ dưới ô tương ứng: *"Trường này bắt buộc nhập"* và chặn lưu. |
| | | | - TH2 (Thứ tự hiển thị sai định dạng): Nếu Thứ tự hiển thị không phải số nguyên dương, hiển thị báo lỗi đỏ: *"Thứ tự hiển thị phải là số nguyên dương"*. |
| | | | - TH3 (File không hợp lệ): Nếu có file vi phạm dung lượng/số lượng/định dạng, báo lỗi tương ứng bên dưới vùng chọn file và chặn lưu. |
| | | | - TH Hợp lệ: Hệ thống lưu thông tin vào cơ sở dữ liệu ở trạng thái **Lưu nháp**; hiển thị thông báo toast: *"Lưu nháp câu hỏi FAQ thành công"*; đóng Modal và tải lại lưới dữ liệu. |
| 2 | Gửi duyệt | Nút | - Thao tác: Người dùng bấm nút **[Gửi duyệt]**. |
| | | | - TH1, TH2, TH3 (Lỗi nhập liệu/Validate): Thực hiện kiểm tra lỗi tương tự như chức năng Lưu nháp. Nếu phát hiện lỗi thì chặn gửi và báo đỏ. |
| | | | - TH Hợp lệ: Hệ thống lưu thông tin vào cơ sở dữ liệu và chuyển trực tiếp sang trạng thái **Chờ duyệt**; tự động gửi thông báo đến Lãnh đạo phê duyệt; hiển thị thông báo toast: *"Gửi duyệt câu hỏi FAQ thành công"*; đóng Modal và tải lại lưới dữ liệu. |
| 3 | Hủy | Nút | - Thao tác: Người dùng bấm nút **[Hủy]** ở Footer hoặc nút `x` ở góc phải Header.<br>- Xử lý: Hệ thống hiển thị hộp thoại xác nhận hủy thao tác (nếu đã có thay đổi thông tin). Nếu đồng ý, đóng Modal Popup và không lưu bất kỳ thay đổi nào. |
