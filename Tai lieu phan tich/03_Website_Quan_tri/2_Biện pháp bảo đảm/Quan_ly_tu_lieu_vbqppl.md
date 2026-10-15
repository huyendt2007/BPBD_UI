### 4.3.2.13. UC274_UC276 - Phân hệ Quản lý tư liệu VBQPPL (WebAdmin-08-09-02)

#### 4.3.2.13.1. Mục đích
\- Phân hệ Quản lý tư liệu VBQPPL (WebAdmin-08-09-02) số hóa việc quản lý, tra cứu, đăng tải và cập nhật các văn bản quy phạm pháp luật (VBQPPL) liên quan đến hoạt động nghiệp vụ đăng ký biện pháp bảo đảm. Cán bộ nghiệp vụ trực tiếp quản lý dữ liệu, không có luồng phê duyệt của Lãnh đạo; đồng thời quản lý Tình trạng hiệu lực pháp lý của từng văn bản.

*a. Phân quyền*
\- Cán bộ nghiệp vụ: Thực hiện tìm kiếm, xem chi tiết, thêm mới, chỉnh sửa và xóa tư liệu tại mọi thời điểm; bản ghi được lưu và hiển thị ngay khi bấm **[Lưu thông tin]**.

*b. Điều kiện thực hiện*
\- Cán bộ đã đăng nhập thành công vào hệ thống quản trị của NRAST.
\- Tài khoản được phân quyền chức năng Quản lý tư liệu VBQPPL.

---

#### 4.3.2.13.2. UC274_276.MH01 - Màn hình Tra cứu tư liệu VBQPPL

##### 4.3.2.13.2.1. Màn hình
\- Giao diện bao gồm vùng bộ lọc tìm kiếm phía trên, thanh thống kê KPI nhanh, thanh công cụ nút chức năng và lưới danh sách kết quả hỗ trợ phân trang ở phía dưới.
![Màn hình Tra cứu tư liệu VBQPPL](images/UC274_276_MH01.png)

##### 4.3.2.13.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Tên văn bản | String(500) | Không | Trống | Control UI: Textbox.<br>- Placeholder: "Nhập tên văn bản...".<br>- Tìm gần đúng theo Tên văn bản; không phân biệt hoa thường, có dấu/không dấu. |
| Số hiệu văn bản | String(50) | Không | Trống | Control UI: Textbox.<br>- Placeholder: "Nhập số hiệu văn bản...".<br>- Tìm gần đúng theo Số hiệu văn bản; không phân biệt hoa thường, có dấu/không dấu. |
| Loại văn bản | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Chọn loại văn bản quy phạm pháp luật.<br>- Danh sách giá trị bao gồm:<br>  + Tất cả loại văn bản<br>  + Luật<br>  + Nghị định<br>  + Thông tư<br>  + Nghị quyết |
| Cơ quan ban hành | String(200) | Không | Trống | - Tìm gần đúng theo tên Cơ quan ban hành văn bản. |
| Tình trạng hiệu lực | Enum(String(50)) | Không | "Tất cả" | Control UI: Combobox.<br>- Lọc theo Tình trạng hiệu lực của văn bản.<br>Gồm:<br>+ Tất cả<br>+ Còn hiệu lực<br>+ Hết hiệu lực<br>+ Bị sửa đổi bổ sung |
| Từ ngày ban hành | String(10) | Không | Ngày đầu tiên của tháng hiện tại | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ). |
| Đến ngày ban hành | String(10) | Không | Ngày hiện tại | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ). |
| **II. Thống kê nhanh KPI** | | | | |
| Chỉ số KPI | - | Không | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Hiển thị 4 thẻ đếm nhanh theo Tình trạng hiệu lực:<br>+ Tất cả: tổng số văn bản<br>+ Còn hiệu lực: số văn bản đang còn hiệu lực<br>+ Hết hiệu lực: số văn bản đã hết hiệu lực<br>+ Bị sửa đổi bổ sung: số văn bản bị sửa đổi, bổ sung một phần |
| **III. Bảng danh sách kết quả** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Lưới kết quả | - | Không | Lấy từ hệ thống | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách các văn bản quy phạm pháp luật thỏa mãn bộ lọc.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Cột: STT | Integer(10) | Có | Số thứ tự tăng dần | - Số thứ tự dòng dữ liệu (tính liên tục theo phân trang). |
| Cột: Tên văn bản | String(255) | Có | Lấy từ hệ thống | - Tên đầy đủ của văn bản quy phạm pháp luật. Dạng liên kết link, click mở xem chi tiết. |
| Cột: Số hiệu | String(255) | Có | Lấy từ hệ thống | - Số ký hiệu chính thức của văn bản. |
| Cột: Loại văn bản | Enum(String(50)) | Có | Lấy từ hệ thống | - Thể loại của văn bản (Luật, Nghị định, Thông tư, ...). |
| Cột: Cơ quan ban hành | String(255) | Có | Lấy từ hệ thống | - Tên cơ quan ban hành văn bản. |
| Cột: Ngày ban hành | Date | Có | Lấy từ hệ thống | - Ngày ban hành văn bản (định dạng `dd/mm/yyyy`). |
| Cột: Ngày có hiệu lực | Date | Không | Lấy từ hệ thống | - Ngày văn bản bắt đầu có hiệu lực (định dạng `dd/mm/yyyy`). |
| Cột: Tình trạng | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Badge.<br>- Nhãn màu biểu thị Tình trạng hiệu lực:<br>+ Còn hiệu lực: badge xanh lá (`badge-success`)<br>+ Bị sửa đổi bổ sung: badge cam/vàng (`badge-warning`)<br>+ Hết hiệu lực: badge đỏ (`badge-danger`) |
| Cột: Thao tác | - | Có | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Cột thao tác cố định của Cán bộ nghiệp vụ, áp dụng cho mọi bản ghi:<br>+ Chỉnh sửa (icon bút)<br>+ Xóa (icon thùng rác)<br>- Xem chi tiết thực hiện bằng cách click vào dòng dữ liệu hoặc tên văn bản. |

##### 4.3.2.13.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xóa bộ lọc | Nút | - Thao tác: Người dùng bấm nút **[Xóa bộ lọc]**.<br>- Xử lý: Thiết lập lại toàn bộ các bộ lọc tìm kiếm về giá trị mặc định (Tên văn bản, Số hiệu văn bản rỗng, Loại văn bản và Tình trạng hiệu lực về "Tất cả", Cơ quan ban hành rỗng, ngày ban hành từ đầu tháng đến ngày hiện tại). Tự động kích hoạt lại tìm kiếm để cập nhật lại lưới dữ liệu. |
| 2 | Tìm kiếm | Nút | - Thao tác: Người dùng bấm nút **[Tìm kiếm]**.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| | | | - TH1 (Từ ngày > Đến ngày): Hệ thống hiển thị thông báo lỗi: *"Từ ngày ban hành không được lớn hơn Đến ngày ban hành"* và chặn tìm kiếm. |
| | | | - TH Hợp lệ: Hệ thống lọc danh sách văn bản theo các tiêu chí đã nhập/chọn trên form bộ lọc, trả kết quả và phân trang lại lưới dữ liệu (20 bản ghi/trang). |
| 3 | Thêm mới | Nút | - Thao tác: Người dùng bấm nút **[Thêm mới]**.<br>- Xử lý: Mở Modal Thêm mới/Chỉnh sửa tư liệu VBQPPL (`UC274_276.MH03`). |
| 4 | Kết xuất Excel | Nút | - Thao tác: Người dùng bấm nút **[Kết xuất Excel]**. |
| | | | - TH1 (Danh sách kết quả rỗng): Hệ thống hiển thị thông báo lỗi: *"Không có dữ liệu để export"* và chặn thực hiện. |
| | | | - TH Hợp lệ: Hệ thống xuất toàn bộ danh sách đang hiển thị ra tệp Excel (.xlsx) với các thông tin tương ứng, đặt tên mặc định: `Danh_sach_Tu_lieu_VBQPPL_[YYYYMMDD].xlsx`. |
| 5 | Lọc theo KPI | Click khối số liệu | - Thao tác: Người dùng click vào một trong bốn khối KPI (Tất cả, Còn hiệu lực, Hết hiệu lực, Bị sửa đổi bổ sung).<br>- Xử lý: Hệ thống tự động lọc nhanh lưới dữ liệu theo Tình trạng hiệu lực tương ứng của KPI được chọn và cập nhật lại số lượng bản ghi hiển thị.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 6 | Xem chi tiết | Click dòng / Link | - Thao tác: Người dùng click vào dòng dữ liệu (trừ các nút thao tác) hoặc click vào tên văn bản.<br>- Xử lý: Hệ thống hiển thị Modal xem chi tiết tư liệu VBQPPL (`UC274_276.MH02`). |
| 7 | Chỉnh sửa | Nút trên dòng | - Thao tác: Người dùng click icon bút trên cột Thao tác (áp dụng cho mọi bản ghi).<br>- Xử lý: Mở Modal Thêm mới/Chỉnh sửa tư liệu VBQPPL (`UC274_276.MH03`) với dữ liệu hiện tại được điền sẵn. |
| 8 | Xóa | Nút trên dòng | - Thao tác: Người dùng click icon xóa trên cột Thao tác. |
| | | | - Xử lý: Hệ thống hiển thị Popup xác nhận tùy chỉnh (Custom Confirmation Modal), không dùng hộp thoại mặc định của trình duyệt: *"Bạn có chắc chắn muốn xóa văn bản [Số hiệu] - [Tên văn bản] không?"*. Nếu chọn **[Xóa]**, hệ thống xóa mềm bản ghi, ẩn khỏi danh sách, cập nhật KPI và hiển thị toast thông báo: *"Xóa văn bản thành công"*. Chọn **[Hủy]** thì đóng popup, không xóa. |

---

#### 4.3.2.13.3. UC274_276.MH02 - Màn hình Chi tiết tư liệu VBQPPL

##### 4.3.2.13.2.1. Màn hình
\- Hiển thị dạng Modal Popup cố định Header và Footer, cuộn nội dung độc lập ở phần Body.
![Màn hình Chi tiết tư liệu VBQPPL](images/UC274_276_MH02.png)

##### 4.3.2.13.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Tên văn bản | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Tên văn bản quy phạm pháp luật. |
| Số hiệu | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Số ký hiệu của văn bản. |
| Loại văn bản | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Luật, Nghị định, Thông tư, v.v. |
| Cơ quan ban hành | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Tên cơ quan ban hành. |
| Ngày ban hành | Date | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Ngày ban hành văn bản. |
| Ngày có hiệu lực | Date | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Ngày bắt đầu có hiệu lực (nếu có). |
| Tóm tắt nội dung | Text(2000) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Mô tả tóm tắt nội dung chính của văn bản. |
| Tình trạng | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Badge (Read-only).<br>- Hiển thị Tình trạng hiệu lực dạng badge màu theo quy tắc tại MH01.<br>Gồm:<br>+ Còn hiệu lực<br>+ Hết hiệu lực<br>+ Bị sửa đổi bổ sung |
| **II. Danh sách file đính kèm** | | | | |
| Văn bản QPPL | File | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Danh sách tệp Văn bản QPPL (PDF) đã đính kèm. Có liên kết "Xem file" để xem trước/tải về. |

##### 4.3.2.13.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | - Thao tác: NSD click liên kết "Xem file" cạnh tên tệp tin.<br>- Xử lý: Mở xem trực tiếp tệp tin PDF/ảnh trong tab mới hoặc thực hiện tải xuống tệp tin. |
| 2 | Đóng | Nút | - Thao tác: NSD click nút **[Đóng]** ở Footer hoặc nút `x` ở góc phải Header.<br>- Xử lý: Đóng Modal Popup và quay lại lưới tra cứu. Màn hình chi tiết không có nút lưu hay nút phê duyệt. |

---

#### 4.3.2.13.4. UC274_276.MH03 - Màn hình Thêm mới/Chỉnh sửa tư liệu VBQPPL

##### 4.3.2.13.2.1. Màn hình
\- Hiển thị dưới dạng Modal Popup khi người dùng click nút Thêm mới hoặc nút Sửa trên dòng bản ghi. Giao diện cố định Header và Footer, cuộn ở phần Body.
![Màn hình Thêm mới/Chỉnh sửa tư liệu VBQPPL](images/UC274_276_MH03.png)

##### 4.3.2.13.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên văn bản | String(500) | Có | Trống | - Nhập tên đầy đủ của văn bản quy phạm pháp luật. |
| Số hiệu văn bản | String(100) | Có | Trống | - Nhập số hiệu ký hiệu chính thức của văn bản. |
| Loại văn bản | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn thể loại văn bản.<br>- Danh sách giá trị bao gồm:<br>  + Luật<br>  + Nghị định<br>  + Thông tư<br>  + Nghị quyết |
| Cơ quan ban hành | String(200) | Có | Trống | - Nhập tên cơ quan ban hành văn bản. |
| Ngày ban hành | String(10) | Có | Trống | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy`. Validate nhỏ hơn hoặc bằng ngày hiện tại. |
| Ngày có hiệu lực | String(10) | Không | Trống | - Nhập tay hoặc chọn từ lịch theo định dạng `dd/mm/yyyy`. Nếu nhập, validate phải lớn hơn hoặc bằng Ngày ban hành. |
| Tình trạng | Enum(String(50)) | Có | Còn hiệu lực | Control UI: Combobox.<br>- Chọn Tình trạng hiệu lực pháp lý của văn bản; bắt buộc chọn.<br>Gồm:<br>+ Còn hiệu lực<br>+ Hết hiệu lực<br>+ Bị sửa đổi bổ sung |
| Tóm tắt nội dung | String(2000) | Không | Trống | - Nhập tóm tắt nội dung chính của văn bản. |
| Văn bản QPPL | File | Có | Trống | Control UI: Upload file.<br>- Bắt buộc đính kèm ít nhất 01 tệp.<br>- Quy tắc kỹ thuật:<br>+ Định dạng: chỉ nhận tệp PDF (`.pdf`)<br>+ Dung lượng: tối đa 10MB/tệp<br>+ Số lượng: tối đa 10 tệp<br>- Tệp vi phạm bị từ chối và báo lỗi đỏ ngay dưới vùng tải tệp: *"Định dạng tệp không hợp lệ. Văn bản QPPL chỉ nhận tệp .pdf."*, *"Dung lượng tệp không được vượt quá 10MB."* hoặc *"Hệ thống chỉ hỗ trợ tối đa 10 tệp Văn bản QPPL."*. |

##### 4.3.2.13.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu thông tin | Nút | - Thao tác: Người dùng nhập liệu và bấm nút **[Lưu thông tin]**. |
| | | | - TH1 (Bỏ trống trường bắt buộc): Hệ thống kiểm tra các trường bắt buộc (Tên văn bản, Số hiệu, Loại văn bản, Cơ quan ban hành, Ngày ban hành, Tình trạng, Văn bản QPPL). Ô thiếu được viền đỏ (`.is-invalid`), dòng cảnh báo đỏ *"Đây là trường bắt buộc"* hiển thị ngay dưới ô, con trỏ tự động focus vào ô lỗi đầu tiên; không dùng Toast; chặn lưu. |
| | | | - TH2 (Ngày không hợp lệ): Nếu Ngày ban hành lớn hơn ngày hiện tại, báo lỗi dưới ô: *"Ngày ban hành không được lớn hơn ngày hiện tại"*. Nếu Ngày có hiệu lực nhỏ hơn Ngày ban hành, báo lỗi dưới ô: *"Ngày có hiệu lực phải lớn hơn hoặc bằng Ngày ban hành"*. |
| | | | - TH3 (File không hợp lệ): Nếu có file vi phạm dung lượng/số lượng/định dạng, báo lỗi tương ứng bên dưới vùng chọn file và chặn lưu. |
| | | | - TH Hợp lệ (Thêm mới): Hệ thống lưu bản ghi trực tiếp vào cơ sở dữ liệu, ghi nhận người tạo và ngày tạo; đóng Modal, hiển thị ngay bản ghi trên lưới dữ liệu và toast thông báo: *"Thêm mới văn bản thành công"*. |
| | | | - TH Hợp lệ (Chỉnh sửa): Hệ thống cập nhật bản ghi, ghi nhận người cập nhật và ngày cập nhật; đóng Modal, tải lại lưới dữ liệu và hiển thị toast thông báo: *"Cập nhật văn bản thành công"*. |
| 2 | Xóa file | Link | - Thao tác: Người dùng click liên kết **[Xóa]** cạnh tên tệp đã tải lên.<br>- Xử lý: Hệ thống hiển thị Popup xác nhận tùy chỉnh (Custom Confirmation Modal): *"Bạn có chắc chắn muốn xóa tệp đính kèm [Tên tệp] không?"*. Chọn **[Xóa]** thì loại bỏ tệp khỏi danh sách; chọn **[Hủy]** thì giữ nguyên. |
| 3 | Hủy | Nút | - Thao tác: Người dùng bấm nút **[Hủy]** ở Footer hoặc nút `x` ở góc phải Header.<br>- Xử lý: Đóng Modal Popup và không lưu bất kỳ thay đổi nào. |
