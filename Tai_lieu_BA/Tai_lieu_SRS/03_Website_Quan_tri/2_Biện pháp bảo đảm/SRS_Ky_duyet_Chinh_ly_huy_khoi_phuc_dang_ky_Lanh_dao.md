### 4.3.2.23. Ký duyệt đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký

#### 4.3.2.23.1. Mục đích

\- Cho phép Lãnh đạo xử lý tập trung tại màn hình [Ký duyệt hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_ho_so_Lanh_dao.md) các đề nghị Chỉnh lý thông tin sai sót, Hủy đăng ký (Toàn phần hoặc Một phần) và Khôi phục hủy đăng ký đang chờ Lãnh đạo xử lý, gồm 02 bước:

\+ **Duyệt đề nghị** (đề nghị ở trạng thái **"Chờ duyệt đề nghị"**): Lãnh đạo xem chi tiết đề nghị, quyết định phê duyệt kèm phân công người thực hiện hoặc từ chối đề nghị. Duyệt đề nghị là quyết định phê duyệt chủ trương, không thực hiện ký số và không dùng chứng thư số.

\+ **Ký số hồ sơ** (đề nghị ở trạng thái **"Chờ ký số"**): Lãnh đạo xem chi tiết hồ sơ đã được Người thực hiện trình ký, ký số văn bản (Văn bản chỉnh lý / Văn bản xác nhận hủy / Quyết định khôi phục đăng ký) để hoàn tất việc cập nhật dữ liệu, hoặc trả lại hồ sơ để Người thực hiện chỉnh sửa.

\- Nội dung đề nghị, nội dung hồ sơ và các popup được lấy theo tài liệu [Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md). Các thao tác Duyệt đề nghị, Từ chối đề nghị, Ký số hồ sơ, Trả lại hồ sơ chỉ được thực hiện tại màn hình này; màn hình Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chỉ hiển thị các đề nghị/hồ sơ ở 02 trạng thái này để theo dõi.

*a. Phân quyền*

\- Lãnh đạo được phân quyền menu "Biện pháp bảo đảm > Ký duyệt hồ sơ" và được phân quyền ký duyệt nhóm nghiệp vụ Chỉnh lý thông tin, Hủy và Khôi phục đăng ký.

\- Đề nghị ở trạng thái "Chờ duyệt đề nghị": Lãnh đạo được xem, duyệt và từ chối các đề nghị thuộc đơn vị quản lý của Lãnh đạo.

\- Đề nghị ở trạng thái "Chờ ký số": Lãnh đạo được xem, ký số và trả lại các hồ sơ thuộc đơn vị quản lý và được Người thực hiện trình ký tới đúng Lãnh đạo đó tại [MH06 - Popup Trình ký - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh06).

\- Lãnh đạo không được sửa nội dung đề nghị, dữ liệu hồ sơ và không được thay thế file PDF đã được Người thực hiện trình ký.

*b. Điều kiện thực hiện*

\- Lãnh đạo đã đăng nhập thành công vào Website Quản trị.

\- Đề nghị đang ở trạng thái "Chờ duyệt đề nghị" hoặc "Chờ ký số". Với trạng thái "Chờ ký số", hồ sơ đã có file PDF chờ ký được Người thực hiện trình ký.

\- Với thao tác Ký số: Lãnh đạo có chứng thư số hợp lệ theo Hình thức ký số sử dụng (USB Token Ban Cơ yếu Chính phủ, SIM ký số hoặc Ký số từ xa). Với Hình thức ký số là USB Token, máy trạm của Lãnh đạo đã cài đặt thành phần ký số cục bộ.

---

<a id="mh01"></a>
#### 4.3.2.23.2. MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt

##### 4.3.2.23.2.1. Màn hình

![Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](images/KDCL_MH01_Danh_sach_de_nghi_cho_ky_duyet.png)

##### 4.3.2.23.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Badge Tab "Chỉnh lý/Hủy/Khôi phục đăng ký"** | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm, chỉ đọc, hiển thị bên phải tên Tab "Chỉnh lý/Hủy/Khôi phục đăng ký" tại [MH01 - Màn hình Ký duyệt hồ sơ - Ký duyệt hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_ho_so_Lanh_dao.md#mh01).<br>- Giá trị bằng tổng của:<br>+ Số đề nghị ở trạng thái "Chờ duyệt đề nghị" thuộc đơn vị quản lý của Lãnh đạo đăng nhập.<br>+ Số hồ sơ ở trạng thái "Chờ ký số" được trình ký tới đúng Lãnh đạo đăng nhập.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập (kể cả tiêu chí Trạng thái).<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge, không hiển thị số 0.<br>- Hệ thống cập nhật lại badge khi mở màn hình và sau mỗi thao tác Duyệt đề nghị, Từ chối đề nghị, Ký số, Trả lại hồ sơ. |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Mã đề nghị | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã đề nghị...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã đề nghị. |
| Số đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Số đăng ký phiên bản, Số đăng ký lần đầu hoặc Số đăng ký hủy. |
| Loại đề nghị | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Chỉnh lý thông tin sai sót<br>+ Hủy đăng ký (Toàn phần)<br>+ Hủy đăng ký (Một phần)<br>+ Khôi phục hủy đăng ký |
| Loại đăng ký | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Lọc theo Loại đăng ký của hồ sơ được đề nghị.<br>Gồm:<br>+ Tất cả<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Thông báo xử lý tài sản bảo đảm lần đầu<br>+ Thay đổi thông báo xử lý tài sản bảo đảm |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Chờ duyệt đề nghị<br>+ Chờ ký số |
| Tên bên bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên bên bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo tên cá nhân/tổ chức là Bên bảo đảm của hồ sơ gốc. |
| Tên bên nhận bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên bên nhận bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo tên Bên nhận bảo đảm của hồ sơ gốc. |
| Cán bộ lập đề nghị | Enum(String(255)) | Không | Tất cả | Control UI: Combobox có tìm kiếm.<br>Gồm:<br>+ Tất cả<br>+ Danh sách Cán bộ lập đề nghị của các đề nghị/hồ sơ đang hiển thị với Lãnh đạo đăng nhập.<br>- Lọc chính xác theo Cán bộ lập đề nghị. |
| Cán bộ xử lý | Enum(String(255)) | Không | Tất cả | Control UI: Combobox có tìm kiếm.<br>Gồm:<br>+ Tất cả<br>+ Danh sách Cán bộ xử lý (cán bộ được phân công thực hiện, đã trình ký) của các hồ sơ đang hiển thị với Lãnh đạo đăng nhập.<br>- Lọc chính xác theo Cán bộ xử lý. |
| Từ ngày | Date | Không | Ngày hiện tại trừ 03 tháng | Control UI: Datepicker.<br>- Lọc theo Thời điểm gửi.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm gửi.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| **II. Bảng danh sách đề nghị chờ ký duyệt** | - | - | - | |
| Bảng danh sách đề nghị | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm thanh phân trang.<br>- Hiển thị:<br>+ Đề nghị ở trạng thái "Chờ duyệt đề nghị" thuộc đơn vị quản lý của Lãnh đạo đăng nhập.<br>+ Hồ sơ ở trạng thái "Chờ ký số" được trình ký tới Lãnh đạo đăng nhập.<br>- **Mặc định khi mở màn hình**: Thời điểm gửi từ ngày hiện tại trừ 03 tháng đến ngày hiện tại, các bộ lọc còn lại là "Tất cả"/Trống, 20 bản ghi/trang.<br>- Sắp xếp mặc định theo Thời điểm gửi tăng dần để ưu tiên đề nghị/hồ sơ được gửi trước.<br>- Cho phép sắp xếp khi click tiêu đề tại 02 cột: Mã đề nghị, Thời điểm gửi. Các cột còn lại không hỗ trợ sắp xếp.<br>- Không hỗ trợ thao tác lô (không có Checkbox chọn dòng và Thanh công cụ), do mỗi đề nghị cần phân công người thực hiện riêng khi duyệt và cần đối chiếu nội dung trước khi ký số.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [[MSG-INF-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-sys-001); thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"* và các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| STT | Integer(10) | - | Theo trang | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng tính liên tục theo trang kết quả hiện tại. |
| Mã đề nghị | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Khi click: Mở màn hình xem chi tiết theo chức năng Click dòng dữ liệu tại bảng Chức năng trên màn hình. |
| Loại đề nghị | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn (Badge), chỉ đọc. |
| Mã KH | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Mã khách hàng của người yêu cầu đăng ký. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tùy theo Loại đề nghị mà hiển thị số tương ứng:<br>  * Chỉnh lý: Hiển thị Số đăng ký phiên bản sai sót.<br>  * Hủy đăng ký: Hiển thị Số đăng ký lần đầu.<br>  * Khôi phục: Hiển thị Số đăng ký hủy. |
| Loại đăng ký | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Tên bên bảo đảm | Text | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên bảo đảm, hiển thị nối bằng dấu chấm phẩy. |
| Tên bên nhận bảo đảm | Text | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên nhận bảo đảm, hiển thị nối bằng dấu chấm phẩy. |
| Cán bộ lập đề nghị | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ được phân công thực hiện, là người trình ký hồ sơ.<br>- Trạng thái "Chờ duyệt đề nghị" (chưa phân công): Hiển thị "-". |
| Thời điểm gửi | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Trạng thái "Chờ duyệt đề nghị": Thời điểm gửi đề nghị.<br>- Trạng thái "Chờ ký số": Thời điểm trình ký.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc. |
| Thao tác | - | - | - | Control UI: Icon.<br>Chi tiết xem ở Chức năng trên màn hình. |

##### 4.3.2.23.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống tìm kiếm đề nghị chờ ký duyệt của Lãnh đạo đăng nhập theo các điều kiện đã chọn tại Khối Bộ lọc tìm kiếm.<br>- **TH1 (Điều kiện ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày` (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày), hệ thống hiển thị [[MSG-ERR-VAL-007]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-007), highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [[MSG-INF-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-sys-001).<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Hợp lệ (Có dữ liệu trả về)**: Hệ thống thực hiện:<br>+ Hiển thị danh sách đề nghị thỏa mãn đồng thời các điều kiện lọc.<br>+ Sắp xếp mặc định theo `Thời điểm gửi` tăng dần.<br>+ Phân trang theo số dòng hiển thị đang chọn. |
| 2 | Xóa bộ lọc | Nút | Hệ thống thực hiện:<br>+ Đưa toàn bộ tiêu chí lọc về mặc định: Từ ngày là ngày hiện tại trừ 03 tháng, Đến ngày là ngày hiện tại, các Combobox về "Tất cả", các ô nhập về Trống.<br>+ Đặt lại phân trang về Trang 1 và tải lại danh sách. |
| 3 | Click dòng dữ liệu | Row click | Thao tác click trực tiếp vào dòng dữ liệu hoặc click liên kết Mã đề nghị:<br>- Nếu đề nghị ở trạng thái "Chờ duyệt đề nghị": Mở [MH02 - Màn hình Xem chi tiết đề nghị chờ duyệt](#mh02).<br>- Nếu hồ sơ ở trạng thái "Chờ ký số": Mở [MH03 - Màn hình Xem chi tiết và Ký số hồ sơ](#mh03). |
| 4 | Duyệt đề nghị | Icon trên dòng | Chỉ hiển thị đối với đề nghị ở trạng thái "Chờ duyệt đề nghị".<br>- **TH1 (Đề nghị không còn ở trạng thái "Chờ duyệt đề nghị")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Duyệt đề nghị và Phân công người thực hiện](#mh04) cho đề nghị tại dòng được chọn. |
| 5 | Từ chối đề nghị | Icon trên dòng | Chỉ hiển thị đối với đề nghị ở trạng thái "Chờ duyệt đề nghị".<br>- **TH1 (Đề nghị không còn ở trạng thái "Chờ duyệt đề nghị")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Từ chối đề nghị](#mh05) cho đề nghị tại dòng được chọn. |
${1}popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH07 - Popup Ký số hồ sơ](#mh07) cho hồ sơ tại dòng được chọn. |
| 7 | Trả lại hồ sơ | Icon trên dòng | Chỉ hiển thị đối với hồ sơ ở trạng thái "Chờ ký số".<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký số")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH06 - Popup Trả lại hồ sơ](#mh06) cho hồ sơ tại dòng được chọn. |
| 8 | Sắp xếp cột | Header cột | Chỉ áp dụng cho 02 cột: `Mã đề nghị`, `Thời điểm gửi`. Các cột còn lại không hỗ trợ sắp xếp. Khi Lãnh đạo click vào tiêu đề một trong 02 cột trên:<br>+ Lần click thứ nhất: Sắp xếp danh sách kết quả theo chiều tăng dần.<br>+ Lần click thứ hai: Sắp xếp danh sách kết quả theo chiều giảm dần.<br>+ Lần click thứ ba: Đưa về trạng thái sắp xếp mặc định (Thời điểm gửi tăng dần).<br>+ Giữ nguyên các tiêu chí lọc đang thiết lập và đưa hiển thị về Trang 1. |

---

<a id="mh02"></a>
#### 4.3.2.23.3. MH02 - Màn hình Xem chi tiết đề nghị chờ duyệt

##### 4.3.2.23.3.1. Màn hình

![Màn hình Xem chi tiết đề nghị chờ duyệt](images/KDCL_MH02_Xem_chi_tiet_de_nghi_cho_duyet.png)

##### 4.3.2.23.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Nội dung màn hình** | - | - | - | Hiển thị giống các khối từ **I. Thông tin chung đề nghị** đến **IV. Thông tin hồ sơ gốc** tại [MH03 - Màn hình Xem chi tiết đề nghị - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh03), theo đề nghị ở trạng thái "Chờ duyệt đề nghị".<br>- Khối Thông tin từ chối đề nghị: với đề nghị đã từng bị từ chối và được Cán bộ lập đề nghị cập nhật, gửi lại, hệ thống hiển thị lại vết lịch sử các lần từ chối trước đó, mặc định thu gọn.<br>- Toàn bộ dữ liệu ở trạng thái chỉ đọc. |
| Thanh nút chức năng | - | - | - | Control UI: Thanh nút cố định (Sticky) ở cuối màn hình, luôn hiển thị kể cả khi nội dung ngắn hoặc khi cuộn trang.<br>Gồm:<br>+ Đóng<br>+ Từ chối đề nghị<br>+ Duyệt đề nghị |

##### 4.3.2.23.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thu gọn / Mở rộng khối | Click tiêu đề khối | Thực hiện giống chức năng **Thu gọn / Mở rộng khối** tại [MH03 - Màn hình Xem chi tiết đề nghị - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh03). |
| 2 | Xem file / Tải xuống | Link | Áp dụng tại khối Tệp tin đính kèm và các file đính kèm của hồ sơ gốc.<br>- Xem file: Mở file tại một tab mới.<br>- Tải xuống: Tải file về máy. |
| 3 | Đóng | Nút | Hệ thống đóng màn hình Xem chi tiết và quay lại [MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](#mh01), giữ nguyên bộ lọc tìm kiếm và trang dữ liệu trước đó. |
| 4 | Từ chối đề nghị | Nút | - **TH1 (Đề nghị không còn ở trạng thái "Chờ duyệt đề nghị")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Từ chối đề nghị](#mh05) cho đề nghị đang xem. |
| 5 | Duyệt đề nghị | Nút | - **TH1 (Đề nghị không còn ở trạng thái "Chờ duyệt đề nghị")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Duyệt đề nghị và Phân công người thực hiện](#mh04) cho đề nghị đang xem. |

---

<a id="mh03"></a>
#### 4.3.2.23.4. MH03 - Màn hình Xem chi tiết và Ký số hồ sơ

##### 4.3.2.23.4.1. Màn hình

![Màn hình Xem chi tiết và Ký số hồ sơ](images/KDCL_MH03_Xem_chi_tiet_va_ky_so_ho_so.png)

##### 4.3.2.23.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Nội dung màn hình** | - | - | - | Hiển thị giống các khối từ **I. Tóm tắt thông tin hồ sơ trình ký** đến **V. Khối Thông tin giao dịch hủy đã thực hiện trước đây** tại [MH05 - Màn hình Xem chi tiết hồ sơ trình ký - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh05), theo hồ sơ ở trạng thái "Chờ ký số"; Mã đề nghị tại khối **I. Tóm tắt thông tin hồ sơ trình ký** hiển thị dạng Hyperlink:<br>+ Loại đề nghị "Chỉnh lý thông tin sai sót": Hiển thị khối **III. Thông tin hồ sơ sau chỉnh lý**, gồm Quy tắc đánh dấu thông tin đã chỉnh lý.<br>+ Loại đề nghị "Hủy đăng ký": Hiển thị khối **IV. Thông tin hồ sơ đề nghị hủy**.<br>+ Loại đề nghị "Khôi phục hủy đăng ký": Hiển thị khối **V. Khối Thông tin giao dịch hủy đã thực hiện trước đây**.<br>- Khối Thông tin trả lại hồ sơ: với hồ sơ đã từng bị trả lại và được Người thực hiện sửa, trình ký lại, hệ thống hiển thị lại vết lịch sử các lần trả lại trước đó (Người trả lại, Thời điểm trả lại, Lý do trả lại, Thời điểm trình ký lại), mặc định thu gọn.<br>- Toàn bộ dữ liệu ở trạng thái chỉ đọc. |
| Thanh nút chức năng | - | - | - | Control UI: Thanh nút cố định (Sticky) ở cuối màn hình, luôn hiển thị kể cả khi nội dung ngắn hoặc khi cuộn trang.<br>Gồm:<br>+ Đóng<br>+ Trả lại hồ sơ<br>+ Ký số |

##### 4.3.2.23.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem chi tiết đề nghị | Hyperlink | Thao tác: Click Mã đề nghị (hiển thị dạng Hyperlink) tại khối **I. Tóm tắt thông tin hồ sơ trình ký**.<br>Xử lý: Mở [MH02 - Màn hình Xem chi tiết đề nghị chờ duyệt](#mh02) ở chế độ chỉ đọc tại tab mới để Lãnh đạo xem lại nội dung đề nghị đã phê duyệt; màn hình hiện tại giữ nguyên. |
| 2 | Xem giá trị trước chỉnh lý | Hover | Thực hiện giống chức năng **Xem giá trị trước chỉnh lý** tại [MH05 - Màn hình Xem chi tiết hồ sơ trình ký - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh05). |
| 3 | Bật/Tắt chỉ hiển thị vùng dữ liệu có biến động | Toggle | Thực hiện giống chức năng **Bật/Tắt chỉ hiển thị vùng dữ liệu có biến động** tại [MH05 - Màn hình Xem chi tiết hồ sơ trình ký - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh05). |
| 4 | Thu gọn / Mở rộng khối | Click tiêu đề khối | Thực hiện giống chức năng **Thu gọn / Mở rộng Khối III, Khối IV, Khối V** tại [MH05 - Màn hình Xem chi tiết hồ sơ trình ký - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh05); áp dụng thêm cho Khối Thông tin trả lại hồ sơ. |
| 5 | Xem file | Link | Áp dụng tại File PDF văn bản, Văn bản kết quả, Tài liệu chứng minh, Tài liệu chứng minh miễn lệ phí và cột ĐÍNH KÈM FILE .PDF.<br>- Xử lý: Mở file tại một tab mới. |
| 6 | Đóng | Nút | Hệ thống đóng màn hình Xem chi tiết và quay lại [MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](#mh01), giữ nguyên bộ lọc tìm kiếm và trang dữ liệu trước đó. |
| 7 | Trả lại hồ sơ | Nút | - **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký số")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH06 - Popup Trả lại hồ sơ](#mh06) cho hồ sơ đang xem. |
| 8 | Ký số | Nút | - **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký số")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH07 - Popup Ký số hồ sơ](#mh07) cho hồ sơ đang xem. |

---

<a id="mh04"></a>
#### 4.3.2.23.5. MH04 - Popup Duyệt đề nghị và Phân công người thực hiện

##### 4.3.2.23.5.1. Màn hình

![Popup Duyệt đề nghị và Phân công người thực hiện](images/CLDK_MH04_Popup_Duyet_de_nghi.png)

##### 4.3.2.23.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label in đậm: **"Phê duyệt đề nghị: [Mã đề nghị]"**. |
| Mã đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Cán bộ lập đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Người thực hiện | Enum(String(255)) | Có | Cán bộ lập đề nghị | Control UI: Combobox có tìm kiếm.<br>- Danh sách người dùng nghiệp vụ trong cùng đơn vị.<br>- Mặc định là Cán bộ lập đề nghị.<br>- Cho phép thay đổi sang người khác trong danh sách; cho phép tìm kiếm theo Họ và tên hoặc Tên đăng nhập. |
| Hạn hoàn thành | Date | Không | Ngày hiện tại + 3 ngày | Control UI: Datepicker (`dd/mm/yyyy`).<br>- Mặc định gợi ý thời hạn xử lý 03 ngày làm việc. |
| Ý kiến chỉ đạo | Text | Không | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập ý kiến chỉ đạo...". |

##### 4.3.2.23.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Nút | Hệ thống đóng popup, giữ nguyên trạng thái đề nghị và quay lại màn hình đã mở popup. |
| 2 | Xác nhận duyệt | Nút | - **TH1 (Bỏ trống Người thực hiện)**: Quy định Người thực hiện là bắt buộc. Hệ thống tô viền đỏ ô chọn Người thực hiện (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) và tự động focus. Không thực hiện duyệt.<br>- **TH2 (Hồ sơ không còn đủ điều kiện thực hiện đề nghị)**: Hệ thống kiểm tra lại điều kiện của hồ sơ theo dữ liệu hiện tại: hồ sơ chưa bị xóa đăng ký; với Loại đề nghị là "Chỉnh lý thông tin sai sót" hoặc "Hủy đăng ký" thì hồ sơ chưa bị hủy đăng ký toàn phần; với Loại đề nghị là "Khôi phục hủy đăng ký" thì Số đăng ký hủy chưa được khôi phục và hồ sơ gốc chưa bị xóa đăng ký. Nếu vi phạm, hệ thống hiển thị [[MSG-ERR-CLDK-011]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-011), không thực hiện duyệt; Lãnh đạo thực hiện Từ chối đề nghị.<br>- **TH3 (Đề nghị không còn ở trạng thái "Chờ duyệt đề nghị")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không thực hiện duyệt.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Lưu Người phê duyệt (Lãnh đạo đang đăng nhập), Thời điểm phê duyệt, Người thực hiện được phân công, Hạn hoàn thành và Ý kiến chỉ đạo.<br>+ Chuyển trạng thái đề nghị sang **"Chờ thực hiện"**.<br>+ Gửi thông báo đến Người thực hiện.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [[MSG-SUC-CLDK-002]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-suc-cldk-002), đóng popup (và [MH02 - Màn hình Xem chi tiết đề nghị chờ duyệt](#mh02) nếu mở từ màn hình này), tải lại [MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](#mh01). |

---

<a id="mh05"></a>
#### 4.3.2.23.6. MH05 - Popup Từ chối đề nghị

##### 4.3.2.23.6.1. Màn hình

![Popup Từ chối đề nghị](images/CLDK_MH05_Popup_Tu_choi_de_nghi.png)

##### 4.3.2.23.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label in đậm: **"Từ chối phê duyệt đề nghị: [Mã đề nghị]"**. |
| Mã đề nghị | String(50) | Có | Theo đề nghị | Control UI: Label, chỉ đọc. |
| Cán bộ lập đề nghị | String(255) | Có | Theo đề nghị | Control UI: Label, chỉ đọc. |
| Lý do từ chối | Text | Có | Trống | Control UI: Textarea (Tối thiểu 3 dòng).<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra.<br>- Placeholder: "Nhập chi tiết lý do từ chối đề nghị...". |

##### 4.3.2.23.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Nút | Hệ thống đóng popup, giữ nguyên trạng thái đề nghị và quay lại màn hình đã mở popup. |
| 2 | Xác nhận từ chối | Nút | - **TH1 (Bỏ trống Lý do từ chối)**: Quy định Lý do từ chối là bắt buộc. Hệ thống tô viền đỏ ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) dưới ô nhập và tự động focus. Không thực hiện từ chối.<br>- **TH2 (Đề nghị không còn ở trạng thái "Chờ duyệt đề nghị")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không thực hiện từ chối.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Lưu Người từ chối (Lãnh đạo đang đăng nhập), Thời điểm từ chối và Lý do từ chối vào lịch sử từ chối của đề nghị. Lịch sử này được giữ lại và hiển thị tại Khối Thông tin từ chối đề nghị khi đề nghị được Cán bộ lập đề nghị cập nhật, gửi lại.<br>+ Chuyển trạng thái đề nghị sang **"Bị từ chối đề nghị"**.<br>+ Gửi thông báo đến Cán bộ lập đề nghị.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [[MSG-SUC-CLDK-003]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-suc-cldk-003), đóng popup (và [MH02 - Màn hình Xem chi tiết đề nghị chờ duyệt](#mh02) nếu mở từ màn hình này), tải lại [MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](#mh01). |

---

<a id="mh06"></a>
#### 4.3.2.23.7. MH06 - Popup Trả lại hồ sơ

##### 4.3.2.23.7.1. Màn hình

![Popup Trả lại hồ sơ](images/CLDK_MH08_Popup_Tra_lai_ho_so.png)

##### 4.3.2.23.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label in đậm: **"Trả lại hồ sơ trình ký: [Mã đề nghị]"**. |
| Mã đề nghị | String(50) | Có | Theo đề nghị | Control UI: Label, chỉ đọc. |
| Người thực hiện | String(255) | Có | Theo đề nghị | Control UI: Label, chỉ đọc. |
| Lý do trả lại | Text | Có | Trống | Control UI: Textarea (Tối thiểu 3 dòng).<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra.<br>- Placeholder: "Nhập chi tiết sai sót, lý do trả lại để người thực hiện chỉnh sửa lại...". |

##### 4.3.2.23.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 2 | Xác nhận trả lại | Nút | - **TH1 (Bỏ trống Lý do trả lại)**: Quy định Lý do trả lại là bắt buộc. Hệ thống tô viền đỏ ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) ngay dưới ô nhập và tự động focus. Không thực hiện trả lại.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký số")**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005), không thực hiện trả lại.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Lưu Người trả lại (Lãnh đạo đang đăng nhập), Thời điểm trả lại, Lý do trả lại và phiên bản dữ liệu/file bị trả lại vào lịch sử trả lại của hồ sơ. Lịch sử này được giữ lại và hiển thị tại Khối Thông tin trả lại hồ sơ khi hồ sơ được Người thực hiện sửa, trình ký lại.<br>+ Chuyển trạng thái hồ sơ sang **"Bị trả lại"**.<br>+ Gửi thông báo đến Người thực hiện.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [[MSG-SUC-CLDK-006]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-suc-cldk-006), đóng popup (và [MH03 - Màn hình Xem chi tiết và Ký số hồ sơ](#mh03) nếu mở từ màn hình này), tải lại [MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](#mh01). |

---

<a id="mh07"></a>
#### 4.3.2.23.8. MH07 - Popup Ký số hồ sơ

##### 4.3.2.23.8.1. Màn hình

![Popup Ký số hồ sơ](images/CLDK_MH10_Popup_Ky_so_ho_so.png)

##### 4.3.2.23.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label in đậm: **"Ký số hồ sơ: [Mã đề nghị]"**. |
| **I. Thông tin hồ sơ ký số** | - | - | - | Control UI: Khung thông tin, chỉ đọc. |
| Mã đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại đề nghị | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Người trình ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại file chờ ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi: "Văn bản chỉnh lý", "Văn bản xác nhận hủy" hoặc "Quyết định khôi phục đăng ký". |
| File PDF chờ ký | - | - | - | Control UI: Link `Xem file`, chỉ đọc.<br>- File PDF đã được Người thực hiện trình ký và khóa phiên bản. |
| **II. Thông tin ký số** | - | - | - | |
| Hình thức ký số | Enum(String(100)) | Có | USB Token Ban Cơ yếu Chính phủ | Control UI: Radio button.<br>Gồm:<br>+ USB Token Ban Cơ yếu Chính phủ<br>+ SIM ký số<br>+ Ký số từ xa (HSM / Cloud CA)<br>- Khi Lãnh đạo đổi Hình thức ký số, hệ thống đưa Trạng thái chứng thư số về "Chưa kiểm tra" và xóa thông tin Chứng thư số, Thời hạn chứng thư số đã đọc trước đó. |
| Trạng thái chứng thư số | Enum(String(50)) | Không | Chưa kiểm tra | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa kiểm tra<br>+ Không tìm thấy thiết bị/tài khoản ký số<br>+ Chứng thư số không hợp lệ<br>+ Chứng thư số hợp lệ |
| Chứng thư số | Enum(String(500)) | Có | Chứng thư số hợp lệ đầu tiên | Control UI: Combobox.<br>- Hiển thị danh sách chứng thư số hợp lệ của Lãnh đạo đọc được sau khi bấm "Kiểm tra chứng thư số", theo Hình thức ký số đã chọn.<br>- Mỗi giá trị hiển thị theo định dạng: `[Tên chủ thể chứng thư số] - [Tổ chức cấp] - Số serial: [Số serial]`.<br>- Nếu chỉ có 01 chứng thư số hợp lệ, hệ thống tự động chọn chứng thư số đó.<br>- Bị khóa (Disabled) khi Trạng thái chứng thư số khác "Chứng thư số hợp lệ". |
| Thời hạn chứng thư số | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo chứng thư số đang chọn.<br>- Định dạng hiển thị: `Từ dd/mm/yyyy đến dd/mm/yyyy`. |

##### 4.3.2.23.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | Mở File PDF chờ ký tại một tab mới. |
| 2 | Kiểm tra chứng thư số | Nút | Hệ thống đọc chứng thư số của Lãnh đạo theo Hình thức ký số đã chọn:<br>+ USB Token Ban Cơ yếu Chính phủ: nhận diện USB Token cắm trên máy trạm qua thành phần ký số cục bộ.<br>+ SIM ký số: kết nối dịch vụ ký số của nhà cung cấp theo số điện thoại ký số của Lãnh đạo.<br>+ Ký số từ xa (HSM / Cloud CA): kết nối dịch vụ ký số từ xa theo tài khoản ký số của Lãnh đạo.<br>- **TH1 (Không tìm thấy thiết bị/tài khoản ký số hoặc không đọc được chứng thư số hợp lệ)**: Hệ thống hiển thị [[MSG-ERR-DK-011]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-011), cập nhật Trạng thái chứng thư số tương ứng ("Không tìm thấy thiết bị/tài khoản ký số" hoặc "Chứng thư số không hợp lệ") và chưa cho phép ký số.<br>- **TH2 (Chứng thư số không thuộc Lãnh đạo được chọn ký duyệt khi trình ký)**: Hệ thống hiển thị [[MSG-ERR-DK-012]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-012), cập nhật Trạng thái chứng thư số là "Chứng thư số không hợp lệ" và chưa cho phép ký số.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Kiểm tra thời hạn chứng thư số và trạng thái thu hồi (nếu có tích hợp OCSP/CRL).<br>+ Hiển thị danh sách chứng thư số hợp lệ tại trường Chứng thư số và Thời hạn chứng thư số của chứng thư số đang chọn.<br>+ Cập nhật Trạng thái chứng thư số là "Chứng thư số hợp lệ". |
| 3 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup ([MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](#mh01) hoặc [MH03 - Màn hình Xem chi tiết và Ký số hồ sơ](#mh03)). |
| 4 | Ký số | Nút | - **TH1 (Chứng thư số chưa hợp lệ)**: Quy định phải kiểm tra chứng thư số hợp lệ trước khi ký. Nếu Trạng thái chứng thư số khác "Chứng thư số hợp lệ", hệ thống hiển thị [[MSG-ERR-DK-011]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-011), không thực hiện ký số.<br>- **TH2 (Hồ sơ không còn đủ điều kiện thực hiện đề nghị)**: Hệ thống kiểm tra lại điều kiện của hồ sơ theo dữ liệu hiện tại: hồ sơ chưa bị xóa đăng ký; với Loại đề nghị là "Chỉnh lý thông tin sai sót" hoặc "Hủy đăng ký" thì hồ sơ chưa bị hủy đăng ký toàn phần; với Loại đề nghị là "Khôi phục hủy đăng ký" thì Số đăng ký hủy chưa được khôi phục và hồ sơ gốc chưa bị xóa đăng ký. Nếu vi phạm, hệ thống hiển thị [[MSG-ERR-CLDK-011]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-011), không thực hiện ký số; Lãnh đạo thực hiện Trả lại hồ sơ.<br>- **TH3 (Hồ sơ không còn ở trạng thái "Chờ ký số" hoặc không có file PDF chờ ký hợp lệ)**: Hệ thống hiển thị [[MSG-ERR-DK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-005) hoặc [[MSG-ERR-DK-010]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-010), không thực hiện ký số.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [[MSG-CFM-DK-013]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-cfm-dk-013). Sau khi Lãnh đạo xác nhận, hệ thống yêu cầu xác thực ký số theo Hình thức ký số đã chọn (hệ thống không lưu mã PIN/mã xác thực):<br>+ USB Token Ban Cơ yếu Chính phủ: nhập mã PIN USB Token tại thành phần ký số cục bộ.<br>+ SIM ký số: xác nhận ký trên điện thoại chứa SIM ký số.<br>+ Ký số từ xa (HSM / Cloud CA): nhập mã OTP hoặc xác nhận trên ứng dụng ký số từ xa.<br>Sau khi xác thực thành công, hệ thống hiển thị trạng thái đang xử lý và khóa các nút thao tác trên popup trong thời gian ký:<br>+ Ký số trên File PDF chờ ký tại vùng ký bằng chứng thư số đã chọn và xác minh chữ ký sau khi ký.<br>+ **Ký lỗi** (Lãnh đạo hủy xác thực, nhập sai PIN/OTP hoặc dịch vụ ký số trả lỗi): Hệ thống hiển thị [[MSG-ERR-DK-013]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-dk-013), giữ nguyên trạng thái hồ sơ "Chờ ký số" và giữ popup để Lãnh đạo ký lại.<br>+ **Ký thành công**: Hệ thống thực hiện xử lý sau ký (mô tả bên dưới), hiển thị [[MSG-SUC-CLDK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-suc-cldk-005), đóng popup (và [MH03 - Màn hình Xem chi tiết và Ký số hồ sơ](#mh03) nếu mở từ màn hình này), tải lại [MH01 - Màn hình Danh sách đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký chờ ký duyệt](#mh01).<br>**Xử lý sau ký**:<br>+ Lưu file PDF đã ký, thông tin chứng thư số, Hình thức ký số, người ký (Lãnh đạo đang đăng nhập), thời điểm ký, phiên bản file đã ký.<br>+ Chuyển trạng thái đề nghị sang **"Hoàn thành"**.<br>+ Cập nhật dữ liệu hồ sơ theo Loại đề nghị:<br>  * Chỉnh lý thông tin sai sót: Cập nhật dữ liệu của phiên bản sai sót theo dữ liệu sau chỉnh lý; đồng thời cập nhật các thông tin đã chỉnh lý cho toàn bộ các phiên bản phát sinh sau phiên bản sai sót của cùng hồ sơ (từ phiên bản sai sót trở về sau).<br>  * Hủy đăng ký: Ghi nhận hủy đăng ký và sinh Số đăng ký hủy. Hủy đăng ký toàn phần áp dụng cho toàn bộ hồ sơ; Hủy đăng ký một phần chỉ áp dụng cho các tài sản đã được duyệt hủy.<br>  * Khôi phục hủy đăng ký: Khôi phục hiệu lực cho toàn bộ các tài sản thuộc Số đăng ký hủy; các tài sản khác của hồ sơ giữ nguyên dữ liệu và trạng thái hiện tại.<br>+ Ghi nhận phiên bản Chỉnh lý thông tin / Hủy đăng ký / Khôi phục hủy đăng ký vào lịch sử phiên bản của hồ sơ, kèm file PDF đã ký.<br>+ Đồng bộ trạng thái và file kết quả sang Website Khách hàng.<br>+ Gửi thông báo đến Cán bộ lập đề nghị và Người thực hiện.<br>+ Ghi lịch sử xử lý và Audit log. |
