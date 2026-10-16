### 4.3.2.14. UC277_UC279 - Phân hệ Quản lý câu hỏi và trả lời thường gặp (FAQ) (WebAdmin-08-09-03)

#### 4.3.2.14.1. Mục đích
\- Phân hệ Quản lý câu hỏi và trả lời thường gặp (FAQ) (WebAdmin-08-09-03) số hóa việc quản lý, tra cứu, đăng tải và cập nhật các câu hỏi thường gặp và câu trả lời giải đáp thắc mắc của người dùng về lĩnh vực đăng ký biện pháp bảo đảm. Cán bộ nghiệp vụ trực tiếp quản lý, không có luồng phê duyệt của Lãnh đạo; câu hỏi được lưu và công khai/áp dụng ngay khi bấm **[Lưu thông tin]**.

*a. Phân quyền*
\- Cán bộ nghiệp vụ: Thực hiện tìm kiếm, xem chi tiết, thêm mới, chỉnh sửa và xóa câu hỏi FAQ tại mọi thời điểm.

*b. Điều kiện thực hiện*
\- Cán bộ đã đăng nhập thành công vào hệ thống quản trị của NRAST.
\- Tài khoản được phân quyền chức năng Quản lý câu hỏi và trả lời thường gặp (FAQ).

---

#### 4.3.2.14.2. UC277_279.MH01 - Màn hình Tra cứu câu hỏi thường gặp (FAQ)

##### 4.3.2.14.2.1. Màn hình
\- Giao diện bao gồm vùng bộ lọc tìm kiếm phía trên, thanh thống kê KPI nhanh, thanh công cụ nút chức năng và lưới danh sách kết quả hỗ trợ phân trang ở phía dưới.
![Màn hình Tra cứu câu hỏi thường gặp (FAQ)](images/UC277_279_MH01.png)

##### 4.3.2.14.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Nội dung câu hỏi | String(500) | Không | Trống | Control UI: Textbox.<br>- Placeholder: "Nhập nội dung câu hỏi...".<br>- Tìm gần đúng theo Nội dung câu hỏi; không phân biệt hoa thường, có dấu/không dấu. |
| Nội dung câu trả lời | String(500) | Không | Trống | Control UI: Textbox.<br>- Placeholder: "Nhập nội dung câu trả lời...".<br>- Tìm gần đúng theo Nội dung câu trả lời; không phân biệt hoa thường, có dấu/không dấu. |
| Nhóm chủ đề | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Chọn nhóm chủ đề phân loại câu hỏi FAQ.<br>- Danh sách giá trị bao gồm:<br>  + Tất cả nhóm chủ đề<br>  + Tài khoản và Phân quyền<br>  + Nghiệp vụ Đăng ký biện pháp bảo đảm<br>  + Thanh toán phí và Lệ phí<br>  + Sự cố kỹ thuật và lỗi hệ thống |
| Từ ngày tạo | String(10) | Không | Ngày đầu tiên của tháng hiện tại | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ). |
| Đến ngày tạo | String(10) | Không | Ngày hiện tại | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ). |
| **II. Thống kê nhanh KPI** | | | | |
| Chỉ số KPI | - | Không | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Hiển thị các thẻ đếm nhanh theo Nhóm chủ đề:<br>+ Tất cả: tổng số câu hỏi đang áp dụng<br>+ Mỗi Nhóm chủ đề (theo danh sách giá trị của trường Nhóm chủ đề): số câu hỏi thuộc nhóm đó<br>- Không còn thẻ đếm theo trạng thái phê duyệt. |
| **III. Bảng danh sách kết quả** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Lưới kết quả | - | Không | Lấy từ hệ thống | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách các câu hỏi FAQ thỏa mãn bộ lọc.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Cột: STT | Integer(10) | Có | Số thứ tự tăng dần | - Số thứ tự dòng dữ liệu (tính liên tục theo phân trang). |
| Cột: Câu hỏi | String(255) | Có | Lấy từ hệ thống | - Nội dung câu hỏi thường gặp. Dạng liên kết link, click mở xem chi tiết. |
| Cột: Nhóm chủ đề | String(255) | Có | Lấy từ hệ thống | - Tên nhóm chủ đề phân loại của câu hỏi. |
| Cột: Thứ tự hiển thị | Integer(10) | Không | Lấy từ hệ thống | - Số thứ tự ưu tiên hiển thị (số nguyên dương). |
| Cột: Ngày tạo | Date | Có | Lấy từ hệ thống | - Ngày tạo câu hỏi FAQ (định dạng `dd/mm/yyyy`). |
| Cột: Thao tác | - | Có | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Cột thao tác cố định của Cán bộ nghiệp vụ, áp dụng cho mọi bản ghi:<br>+ Chỉnh sửa (icon bút)<br>+ Xóa (icon thùng rác)<br>- Xem chi tiết thực hiện bằng cách click vào dòng dữ liệu hoặc nội dung câu hỏi. |

##### 4.3.2.14.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xóa bộ lọc | Nút | - Thao tác: Người dùng bấm nút **[Xóa bộ lọc]**.<br>- Xử lý: Thiết lập lại toàn bộ các bộ lọc tìm kiếm về giá trị mặc định (Nội dung câu hỏi, Nội dung câu trả lời rỗng, Nhóm chủ đề về "Tất cả", ngày tạo từ đầu tháng đến ngày hiện tại). Tự động kích hoạt lại tìm kiếm để cập nhật lại lưới dữ liệu. |
| 2 | Tìm kiếm | Nút | - Thao tác: Người dùng bấm nút **[Tìm kiếm]**.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| | | | - TH1 (Từ ngày > Đến ngày): Hệ thống hiển thị thông báo lỗi: *"Từ ngày tạo không được lớn hơn Đến ngày tạo"* và chặn tìm kiếm. |
| | | | - TH Hợp lệ: Hệ thống lọc danh sách câu hỏi FAQ theo các tiêu chí đã nhập/chọn trên form bộ lọc, trả kết quả và phân trang lại lưới dữ liệu (20 bản ghi/trang). |
| 3 | Thêm mới | Nút | - Thao tác: Người dùng bấm nút **[Thêm mới]**.<br>- Xử lý: Mở Modal Thêm mới/Chỉnh sửa câu hỏi FAQ (`UC277_279.MH03`). |
| 4 | Kết xuất Excel | Nút | - Thao tác: Người dùng bấm nút **[Kết xuất Excel]**. |
| | | | - TH1 (Danh sách kết quả rỗng): Hệ thống hiển thị thông báo lỗi: *"Không có dữ liệu để export"* và chặn thực hiện. |
| | | | - TH Hợp lệ: Hệ thống xuất toàn bộ danh sách đang hiển thị ra tệp Excel (.xlsx) với các thông tin tương ứng, đặt tên mặc định: `Danh_sach_FAQ_[YYYYMMDD].xlsx`. |
| 5 | Lọc theo KPI | Click khối số liệu | - Thao tác: Người dùng click vào thẻ KPI Tất cả hoặc thẻ của một Nhóm chủ đề.<br>- Xử lý: Hệ thống tự động lọc nhanh lưới dữ liệu theo Nhóm chủ đề tương ứng của KPI được chọn và cập nhật lại số lượng bản ghi hiển thị.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 6 | Xem chi tiết | Click dòng / Link | - Thao tác: Người dùng click vào dòng dữ liệu (trừ các nút thao tác) hoặc click vào nội dung câu hỏi.<br>- Xử lý: Hệ thống hiển thị Modal xem chi tiết câu hỏi FAQ (`UC277_279.MH02`). |
| 7 | Chỉnh sửa | Nút trên dòng | - Thao tác: Người dùng click icon bút trên cột Thao tác (áp dụng cho mọi bản ghi).<br>- Xử lý: Mở Modal Thêm mới/Chỉnh sửa câu hỏi FAQ (`UC277_279.MH03`) với dữ liệu hiện tại được điền sẵn. |
| 8 | Xóa | Nút trên dòng | - Thao tác: Người dùng click icon xóa trên cột Thao tác. |
| | | | - Xử lý: Hệ thống hiển thị Popup xác nhận tùy chỉnh (Custom Confirmation Modal), không dùng hộp thoại mặc định của trình duyệt: *"Bạn có chắc chắn muốn xóa câu hỏi [Nội dung câu hỏi] không?"*. Nếu chọn **[Xóa]**, hệ thống xóa mềm bản ghi, ẩn khỏi danh sách, cập nhật KPI và hiển thị toast thông báo: *"Xóa câu hỏi thành công"*. Chọn **[Hủy]** thì đóng popup, không xóa. |

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
| **II. Danh sách file đính kèm** | | | | |
| File tài liệu đính kèm | File | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Danh sách các file tài liệu hướng dẫn (PDF, JPG, PNG). Có liên kết "Xem file" để xem/tải về. |
| File hướng dẫn media | File | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Danh sách các video/âm thanh hướng dẫn (MP4, MP3). Có liên kết "Xem file". |

##### 4.3.2.14.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | - Thao tác: NSD click liên kết "Xem file" cạnh tên tệp tin.<br>- Xử lý: Mở xem trực tiếp tệp tin PDF/ảnh trong tab mới hoặc thực hiện tải xuống tệp tin. |
| 2 | Đóng | Nút | - Thao tác: NSD click nút **[Đóng]** ở Footer hoặc nút `x` ở góc phải Header.<br>- Xử lý: Đóng Modal Popup và quay lại lưới tra cứu. Màn hình chi tiết không có nút lưu, nút phê duyệt hay từ chối. |

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
| File tài liệu đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Nhãn nút bấm: **[Chọn tệp]**, trạng thái: **"Chưa có tệp nào được chọn"** hoặc **"Đã chọn X tệp"**.<br>- Quy tắc kỹ thuật:<br>  + Số lượng: Tối đa **5 tệp tin**.<br>  + Dung lượng: Tối đa **10MB/tệp**.<br>  + Định dạng hợp lệ: `.pdf`, `.jpg`, `.png`, `.jpeg`. Chặn định dạng khác.<br>  + Tệp tải lên thành công hiển thị biểu tượng kẹp giấy, tên tệp tin (thu gọn bằng dấu `...` nếu quá dài) và hai liên kết **"Xem file"** / **"Xóa"** liền kề trên cùng một dòng. |
| File hướng dẫn media | File | Không | Trống | Control UI: Upload file.<br>- Nhãn nút bấm: **[Chọn tệp]**, trạng thái: **"Chưa có tệp nào được chọn"** hoặc **"Đã chọn X tệp"**.<br>- Quy tắc kỹ thuật:<br>  + Số lượng: Tối đa **3 tệp tin**.<br>  + Dung lượng: Tối đa **50MB/tệp**.<br>  + Định dạng hợp lệ: `.mp4`, `.mp3`. Chặn định dạng khác.<br>  + Tệp tải lên hiển thị biểu tượng, tên tệp tin (thu gọn bằng dấu `...` nếu quá dài) và hai liên kết **"Xem file"** / **"Xóa"** liền kề trên cùng một dòng. |

##### 4.3.2.14.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu thông tin | Nút | - Thao tác: Người dùng nhập Câu hỏi, Câu trả lời, chọn Nhóm chủ đề, đính kèm tệp (nếu có) và bấm nút **[Lưu thông tin]**. |
| | | | - TH1 (Bỏ trống trường bắt buộc): Hệ thống kiểm tra các trường bắt buộc (Câu hỏi, Nội dung trả lời, Nhóm chủ đề). Ô thiếu được viền đỏ (`.is-invalid`), dòng cảnh báo đỏ *"Đây là trường bắt buộc"* hiển thị ngay dưới ô, con trỏ tự động focus vào ô lỗi đầu tiên; không dùng Toast; chặn lưu. |
| | | | - TH2 (Thứ tự hiển thị sai định dạng): Nếu Thứ tự hiển thị không phải số nguyên dương, hiển thị báo lỗi đỏ dưới ô: *"Thứ tự hiển thị phải là số nguyên dương"*. |
| | | | - TH3 (File không hợp lệ): Nếu có file vi phạm dung lượng/số lượng/định dạng, báo lỗi tương ứng bên dưới vùng chọn file và chặn lưu. |
| | | | - TH Hợp lệ (Thêm mới): Hệ thống lưu bản ghi trực tiếp vào cơ sở dữ liệu, ghi nhận người tạo và ngày tạo; câu hỏi được công khai/áp dụng ngay; đóng Modal, tải lại lưới dữ liệu và hiển thị toast thông báo: *"Thêm mới câu hỏi thành công"*. |
| | | | - TH Hợp lệ (Chỉnh sửa): Hệ thống cập nhật bản ghi, ghi nhận người cập nhật và ngày cập nhật; nội dung mới được áp dụng ngay; đóng Modal, tải lại lưới dữ liệu và hiển thị toast thông báo: *"Cập nhật câu hỏi thành công"*. |
| 2 | Xóa file | Link | - Thao tác: Người dùng click liên kết **[Xóa]** cạnh tên tệp đã tải lên.<br>- Xử lý: Hệ thống hiển thị Popup xác nhận tùy chỉnh (Custom Confirmation Modal): *"Bạn có chắc chắn muốn xóa tệp đính kèm [Tên tệp] không?"*. Chọn **[Xóa]** thì loại bỏ tệp khỏi danh sách; chọn **[Hủy]** thì giữ nguyên. |
| 3 | Hủy | Nút | - Thao tác: Người dùng bấm nút **[Hủy]** ở Footer hoặc nút `x` ở góc phải Header.<br>- Xử lý: Đóng Modal Popup và không lưu bất kỳ thay đổi nào. |
