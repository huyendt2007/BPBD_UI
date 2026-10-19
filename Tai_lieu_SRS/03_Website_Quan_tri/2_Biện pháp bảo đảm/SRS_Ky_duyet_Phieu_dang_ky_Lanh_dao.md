### 4.3.2.4. Ký duyệt Phiếu đăng ký

#### 4.3.2.4.1. Mục đích

\- Cho phép Lãnh đạo xem chi tiết, duyệt (ký số), từ chối hoặc trả lại (đối với hồ sơ có Nguồn tiếp nhận là "Trực tiếp") Phiếu đăng ký biện pháp bảo đảm, hợp đồng và thông báo xử lý tài sản bảo đảm đã được Cán bộ trình ký ở trạng thái **"Chờ ký"**.

*a. Phân quyền*

\- Lãnh đạo được phân quyền ký duyệt Phiếu đăng ký: Được phép xem, duyệt, từ chối và trả lại (chỉ với hồ sơ có Nguồn tiếp nhận là "Trực tiếp") các hồ sơ thuộc đơn vị quản lý, thuộc phạm vi thẩm quyền và được Cán bộ trình tới đúng Lãnh đạo đó.

\- Lãnh đạo không được sửa dữ liệu Phiếu đăng ký và không được thay thế file PDF đã được Cán bộ trình ký.

*b. Điều kiện thực hiện*

\- Lãnh đạo đã đăng nhập thành công vào Website Quản trị.

\- Hồ sơ đang ở trạng thái "Chờ ký" và đã có file PDF chờ ký được Cán bộ trình ký.

\- Lãnh đạo có chứng thư số hợp lệ theo Hình thức ký số sử dụng (USB Token Ban Cơ yếu Chính phủ, SIM ký số hoặc Ký số từ xa). Với Hình thức ký số là USB Token, máy trạm của Lãnh đạo đã cài đặt thành phần ký số cục bộ.

---

<a id="mh01"></a>
#### 4.3.2.4.2. MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký

##### 4.3.2.4.2.1. Màn hình

![Màn hình Danh sách Phiếu đăng ký chờ ký](images/UC_DK_LD_MH01_Danh_sach_Phieu_dang_ky_cho_ky.png)

##### 4.3.2.4.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Số đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Số đăng ký của Phiếu đăng ký. |
| Tên bên bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên bên bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Tên bên bảo đảm; hồ sơ có nhiều Bên bảo đảm được trả về nếu một trong các Bên bảo đảm thỏa mãn. |
| Tên bên nhận bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên bên nhận bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Tên bên nhận bảo đảm; hồ sơ có nhiều Bên nhận bảo đảm được trả về nếu một trong các Bên nhận bảo đảm thỏa mãn. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã khách hàng nộp hồ sơ. |
| Số biên lai | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số biên lai...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Số biên lai/biên nhận thanh toán lệ phí của hồ sơ. |
| Nguồn tiếp nhận | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Dịch vụ công<br>+ Trực tuyến<br>+ Trực tiếp |
| Cán bộ xử lý | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Danh sách Cán bộ đã trình ký hồ sơ tới Lãnh đạo đăng nhập, thuộc đơn vị quản lý của Lãnh đạo.<br>- Lọc chính xác theo Cán bộ đã trình ký hồ sơ. |
| Loại đăng ký | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04].<br>- Chỉ lọc trong phạm vi nhóm Phiếu đăng ký. |
| Loại hình giao dịch | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại hình giao dịch [DM_01].<br>- Khi chọn "Biện pháp bảo đảm", hệ thống cập nhật danh sách Loại biện pháp / Hợp đồng theo Danh mục Loại biện pháp bảo đảm [DM_02].<br>- Khi chọn "Hợp đồng", hệ thống cập nhật danh sách Loại biện pháp / Hợp đồng theo Danh mục Loại hợp đồng [DM_03]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại biện pháp bảo đảm [DM_02] hoặc Danh mục Loại hợp đồng [DM_03] theo Loại hình giao dịch đã chọn.<br>- Nếu chưa chọn Loại hình giao dịch, chỉ hiển thị "Tất cả". |
| Loại tài sản | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại tài sản bảo đảm [DM_07].<br>- Nếu chọn một loại tài sản cụ thể, hệ thống hiển thị thêm **Khối lọc động theo Loại tài sản** và các Cột động tương ứng trên Bảng danh sách. |
| **Khối lọc động theo Loại tài sản** | - | Không | Ẩn | - Không hiển thị tiêu đề khối; các trường lọc động hiển thị ngay dưới các trường lọc chung.<br>- Chỉ hiển thị khi Lãnh đạo chọn một giá trị cụ thể tại trường `Loại tài sản`.<br>- Gồm các trường lọc tương ứng với Loại tài sản đã chọn như mô tả tại các dòng dưới đây.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space đối với các trường Input text; lọc chính xác đối với các trường Combobox. |
| Tên phương tiện | Enum(String(255)) | Không | Trống | Control UI: Combobox.<br>- Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`.<br>- Tham chiếu Danh mục Tên phương tiện giao thông [DM_41]. |
| Số khung | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`. |
| Số máy | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`. |
| Biển số | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`. |
| Tên phương tiện, nhãn hiệu | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Tên/Họ tên chủ phương tiện/Chủ sở hữu | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Số đăng ký phương tiện | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Cơ quan cấp giấy chứng nhận | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Cấp phương tiện | String(100) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Tên quyền | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản`. |
| Căn cứ phát sinh quyền | Text(2000) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản`. |
| Hàng hóa luân chuyển / Kho hàng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ`.<br>Gồm:<br>+ Tất cả<br>+ Hàng hóa luân chuyển<br>+ Kho hàng |
| Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ`. |
| Địa chỉ kho hàng | String(500) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ` và `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ` và `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Thời điểm đăng ký tại VSDC | Datetime/String(16) | Không | Trống | Control UI: Ô nhập/chọn thời điểm dạng `HH:mm dd/MM/yyyy`.<br>- Chỉ hiển thị khi `Loại tài sản` = `Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung`.<br>- Hệ thống sử dụng giá trị gộp này để tìm kiếm theo dữ liệu gốc gồm Giờ, Phút, Ngày, Tháng, Năm. |
| Mô tả | Text(1000) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` là một trong các giá trị:<br>+ `Cây hằng năm, công trình tạm`<br>+ `Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)` |
| Từ ngày | Date | Không | Ngày hiện tại trừ 3 tháng | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| Trùng lặp | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Lọc theo kết quả xác định trùng lặp theo [BR-DK-037]; chỉ áp dụng với Phiếu Đăng ký lần đầu và Đăng ký thay đổi.<br>Gồm:<br>+ Tất cả<br>+ Có hồ sơ trùng chưa rà soát<br>+ Có hồ sơ trùng đã rà soát<br>+ Không trùng lặp |
| **II. Bảng danh sách Phiếu đăng ký chờ ký** | - | - | - | |
| Bảng danh sách Phiếu đăng ký | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm thanh phân trang.<br>- Không hiển thị tiêu đề phía trên bảng; Thanh công cụ đặt ở góc phải phía trên bảng.<br>- Chỉ hiển thị Phiếu đăng ký ở trạng thái "Chờ ký" được Cán bộ trình tới Lãnh đạo đang đăng nhập.<br>- **Mặc định khi mở màn hình**: Thời điểm đăng ký trong 3 tháng gần nhất (từ ngày hiện tại trừ 3 tháng đến ngày hiện tại), các bộ lọc còn lại là "Tất cả"/Trống, không hiển thị Cột động, 20 bản ghi/trang.<br>- Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên hồ sơ đến trước.<br>- Cho phép sắp xếp khi click tiêu đề tại 03 cột: Thời điểm đăng ký, Tên bên bảo đảm, Tên bên nhận bảo đảm. Các cột còn lại không hỗ trợ sắp xếp.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"* và các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| Thanh công cụ (Toolbar) | - | - | - | Control UI: Nhóm nút phía trên Bảng danh sách, dùng cho thao tác lô trên các hồ sơ đã tích chọn.<br>Gồm:<br>+ Ký số<br>+ Từ chối<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Checkbox | Boolean | Không | Không tích | Control UI: Checkbox chọn dòng / Chọn tất cả.<br>- Cho phép chọn một hoặc nhiều hồ sơ để thực hiện thao tác lô (Ký số, Từ chối) trên thanh công cụ.<br>- Checkbox chọn tất cả tại tiêu đề bảng chỉ chọn các hồ sơ đang hiển thị trên trang hiện tại.<br>- Khi Lãnh đạo đổi bộ lọc tìm kiếm, trang dữ liệu hoặc số bản ghi/trang, hệ thống xóa danh sách hồ sơ đã chọn. |
| STT | Integer(10) | - | Theo trang | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng tính liên tục theo trang kết quả hiện tại. |
| Thời điểm đăng ký | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Số đăng ký của Phiếu đăng ký. Click vào giá trị mở [MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký](#mh02).<br>- Nếu phiếu thuộc nhóm trùng lặp theo [BR-DK-037] chưa được đánh dấu đã rà soát: Hiển thị nhãn `[Có hồ sơ trùng]` màu cam ngay dưới Số đăng ký; rê chuột vào nhãn hiển thị Tooltip gồm Mức trùng và Số phiếu trùng. |
| Mã PIN | String(20) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị mã PIN bảo mật của hồ sơ nếu đã phát sinh. |
| Tên bên bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên bảo đảm, hiển thị nối bằng dấu phẩy.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Tên bên nhận bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên nhận bảo đảm, hiển thị nối bằng dấu phẩy.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại hình GD | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại tài sản | Enum(String(255)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu hồ sơ có nhiều Loại tài sản, hiển thị mỗi Loại tài sản trên một dòng riêng trong cùng ô. |
| **Cột động theo Loại tài sản** | - | - | Ẩn | Chỉ hiển thị khi Lãnh đạo chọn một loại tài sản cụ thể tại bộ lọc `Loại tài sản`.<br>- Các Cột động hiển thị đúng các trường đang hiển thị tại **Khối lọc động theo Loại tài sản**, đặt ngay sau cột Loại tài sản.<br>- Khi đổi Loại tài sản, hệ thống thay bộ Cột động theo loại mới; khi chọn lại "Tất cả", hệ thống ẩn toàn bộ Cột động.<br>- Nếu hồ sơ có nhiều tài sản cùng loại, mỗi tài sản hiển thị trên một dòng riêng trong cùng ô; trường không có dữ liệu hiển thị "-". |
| Cột động: Tên phương tiện | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng có số khung. |
| Cột động: Số khung | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng có số khung. |
| Cột động: Số máy | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng có số khung. |
| Cột động: Biển số | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng có số khung. |
| Cột động: Tên phương tiện, nhãn hiệu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là tàu cá, phương tiện giao thông đường thủy nội địa, phương tiện giao thông đường sắt. |
| Cột động: Tên/Họ tên chủ phương tiện/Chủ sở hữu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là tàu cá, phương tiện giao thông đường thủy nội địa, phương tiện giao thông đường sắt. |
| Cột động: Số đăng ký phương tiện | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là tàu cá, phương tiện giao thông đường thủy nội địa, phương tiện giao thông đường sắt. |
| Cột động: Cơ quan cấp giấy chứng nhận | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là tàu cá, phương tiện giao thông đường thủy nội địa, phương tiện giao thông đường sắt. |
| Cột động: Cấp phương tiện | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là tàu cá, phương tiện giao thông đường thủy nội địa, phương tiện giao thông đường sắt. |
| Cột động: Tên quyền | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là quyền tài sản hoặc một phần quyền tài sản. |
| Cột động: Căn cứ phát sinh quyền | Text(2000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là quyền tài sản hoặc một phần quyền tài sản. |
| Cột động: Hàng hóa luân chuyển / Kho hàng | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là hàng hóa luân chuyển, kho hàng. |
| Cột động: Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là hàng hóa luân chuyển, kho hàng. |
| Cột động: Địa chỉ kho hàng | String(500) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là hàng hóa luân chuyển, kho hàng và bộ lọc `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Cột động: Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là hàng hóa luân chuyển, kho hàng và bộ lọc `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Cột động: Thời điểm đăng ký tại VSDC | Datetime/String(16) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản là chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung.<br>- Định dạng `HH:mm dd/MM/yyyy`. |
| Cột động: Mô tả | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn Loại tài sản có trường Mô tả (Cây hằng năm, công trình tạm; Các động sản khác). |
| Mã khách hàng | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị Mã khách hàng nộp hồ sơ nếu có. |
| Số biên lai | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị số biên lai/biên nhận thanh toán lệ phí nếu có. |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Hiển thị trạng thái hiện tại của hồ sơ. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tên người yêu cầu đăng ký; nếu hồ sơ không lưu Người yêu cầu riêng, hệ thống hiển thị theo Tên bên bảo đảm/người nộp hồ sơ theo dữ liệu hồ sơ. |
| Nguồn tiếp nhận | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc |
| Thao tác | - | - | - | Control UI: Nhóm icon thao tác trên dòng.<br>Gồm:<br>+ Ký số<br>+ Từ chối<br>+ Trả lại: chỉ khả dụng với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"; hồ sơ khác hiển thị icon dạng mờ (Disabled), không ẩn.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.4.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống tìm kiếm Phiếu đăng ký ở trạng thái "Chờ ký" được trình tới Lãnh đạo đăng nhập theo các điều kiện đã nhập tại Khối Bộ lọc tìm kiếm (bao gồm Cán bộ xử lý và Khối lọc động theo Loại tài sản nếu đang hiển thị).<br>- **TH1 (Điều kiện ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày` (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày), hệ thống hiển thị [MSG-ERR-VAL-007], highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Hợp lệ (Có dữ liệu trả về)**: Hệ thống thực hiện:<br>+ Hiển thị danh sách Phiếu đăng ký thỏa mãn đồng thời các điều kiện lọc.<br>+ Sắp xếp mặc định theo `Thời điểm đăng ký` tăng dần.<br>+ Phân trang theo số dòng hiển thị đang chọn. |
| 2 | Xóa bộ lọc | Nút | Hệ thống thực hiện:<br>+ Đưa toàn bộ tiêu chí lọc về mặc định: Từ ngày là ngày hiện tại trừ 3 tháng, Đến ngày là ngày hiện tại, các Combobox (bao gồm Cán bộ xử lý) về "Tất cả", các ô nhập về Trống.<br>+ Ẩn Khối lọc động và các Cột động theo Loại tài sản.<br>+ Đặt lại phân trang về Trang 1 và tải lại danh sách. |
| 3 | Chọn Loại tài sản | Combobox | - **TH1 (Chọn một loại tài sản cụ thể)**: Hệ thống hiển thị **Khối lọc động theo Loại tài sản** với các trường tương ứng loại tài sản đã chọn, đồng thời hiển thị các **Cột động** tương ứng trên Bảng danh sách.<br>- **TH2 (Đổi sang loại tài sản khác)**: Hệ thống xóa giá trị đã nhập ở các trường lọc động của loại cũ, hiển thị bộ trường lọc động và Cột động của loại mới.<br>- **TH3 (Chọn lại "Tất cả")**: Hệ thống ẩn Khối lọc động, xóa giá trị các trường lọc động và ẩn toàn bộ Cột động. |
| 4 | Ký số (thanh công cụ) | Nút trên Toolbar | Ký số các hồ sơ đã tích chọn trên lưới cùng một lúc, không giới hạn số lượng hồ sơ.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-DK-008], không mở popup.<br>- **TH2 (Có hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Ký số Phiếu đăng ký](#mh03) và truyền danh sách hồ sơ đã chọn vào popup:<br>+ Chọn 01 hồ sơ: popup hiển thị theo trường hợp Ký 01 hồ sơ.<br>+ Chọn từ 02 hồ sơ trở lên: popup hiển thị theo trường hợp Ký đồng thời nhiều hồ sơ. |
| 5 | Ký số (trên lưới) | Icon trên dòng | Ký số hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Ký số Phiếu đăng ký](#mh03) theo trường hợp Ký 01 hồ sơ cho hồ sơ tại dòng được chọn. |
| 6 | Từ chối (thanh công cụ) | Nút trên Toolbar | Từ chối các hồ sơ đã tích chọn trên lưới cùng một lúc, không giới hạn số lượng hồ sơ.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-DK-008], không mở popup.<br>- **TH2 (Có hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối Phiếu đăng ký](#mh04) và truyền danh sách hồ sơ đã chọn vào popup; Lý do từ chối áp dụng cho toàn bộ hồ sơ trong danh sách:<br>+ Chọn 01 hồ sơ: popup hiển thị theo trường hợp Từ chối 01 hồ sơ.<br>+ Chọn từ 02 hồ sơ trở lên: popup hiển thị theo trường hợp Từ chối đồng thời nhiều hồ sơ. |
| 7 | Từ chối (trên lưới) | Icon trên dòng | Từ chối hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối Phiếu đăng ký](#mh04) theo trường hợp Từ chối 01 hồ sơ cho hồ sơ tại dòng được chọn. |
| 8 | Trả lại (trên lưới) | Icon trên dòng | Chỉ khả dụng với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"; hồ sơ khác hiển thị icon dạng mờ (Disabled), không ẩn. Trả lại hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Trả lại Phiếu đăng ký](#mh05) cho hồ sơ tại dòng được chọn. |
| 9 | Click dòng dữ liệu | Row click | Mở [MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký](#mh02) của bản ghi được chọn. |
| 10 | Sắp xếp cột | Header cột | Chỉ áp dụng cho 03 cột: `Thời điểm đăng ký`, `Tên bên bảo đảm`, `Tên bên nhận bảo đảm`. Các cột còn lại không hỗ trợ sắp xếp. Khi Lãnh đạo click vào tiêu đề một trong 03 cột trên:<br>+ Lần click thứ nhất: Sắp xếp danh sách kết quả theo chiều tăng dần.<br>+ Lần click thứ hai: Sắp xếp danh sách kết quả theo chiều giảm dần.<br>+ Lần click thứ ba: Đưa về trạng thái sắp xếp mặc định (Thời điểm đăng ký tăng dần).<br>+ Giữ nguyên các tiêu chí lọc đang thiết lập và đưa hiển thị về Trang 1. |
| 11 | Chọn tất cả | Checkbox header | Tích chọn hoặc bỏ chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại phục vụ thao tác lô (Ký số, Từ chối) trên thanh công cụ. |

---

<a id="mh02"></a>
#### 4.3.2.4.3. MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký

##### 4.3.2.4.3.1. Màn hình

![Màn hình Xem chi tiết Phiếu đăng ký chờ ký](images/UC_DK_LD_MH02_Xem_chi_tiet_Phieu_dang_ky_cho_ky.png)

##### 4.3.2.4.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Nội dung màn hình** | - | - | - | Hiển thị và xử lý giống các khối từ **I. Sidebar dòng thời gian lịch sử** đến **VIII. Hồ sơ trùng lặp** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02).<br>- **Mặc định khi mở màn hình**: hệ thống focus (chọn và tô nổi bật) vào đúng phiên bản tương ứng với bản ghi Lãnh đạo đã chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01).<br>- Toàn bộ dữ liệu ở trạng thái chỉ đọc. |
| Thanh nút chức năng | - | - | - | Control UI: Thanh nút cố định (Sticky) ở cuối màn hình, luôn hiển thị kể cả khi nội dung ngắn hoặc khi cuộn trang.<br>Gồm:<br>+ Đóng<br>+ Trả lại: chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"<br>+ Từ chối<br>+ Ký số.|

##### 4.3.2.4.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn phiên bản trên Timeline | Click item | Hiển thị và xử lý giống chức năng **Chọn phiên bản trên Timeline** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02). |
| 2 | Lọc vùng biến động | Checkbox toggle | Hiển thị và xử lý giống chức năng **Lọc vùng biến động** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02). |
| 3 | Xem file | Link / Nút | Cho phép xem file tại một tab riêng. |
| 4 | Đóng | Nút | Hệ thống đóng màn hình Xem chi tiết và quay lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01), giữ nguyên bộ lọc tìm kiếm và trang dữ liệu trước đó. |
| 5 | Trả lại | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Trả lại Phiếu đăng ký](#mh05) cho hồ sơ đang xem. |
| 6 | Từ chối | Nút | - **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối Phiếu đăng ký](#mh04) theo trường hợp Từ chối 01 hồ sơ cho hồ sơ đang xem. |
| 7 | Ký số | Nút | - **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Ký số Phiếu đăng ký](#mh03) theo trường hợp Ký 01 hồ sơ cho hồ sơ đang xem. |
| 8 | Xem so sánh | Nút | Áp dụng tại Khối VIII. Hồ sơ trùng lặp. Hiển thị và xử lý giống chức năng **Xem so sánh** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02). |
| 9 | Đánh dấu đã rà soát | Nút | Áp dụng tại Khối VIII. Hồ sơ trùng lặp. Hiển thị và xử lý giống chức năng **Đánh dấu đã rà soát** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02). |

---

<a id="mh03"></a>
#### 4.3.2.4.4. MH03 - Popup Ký số Phiếu đăng ký

##### 4.3.2.4.4.1. Màn hình

![Popup Ký số Phiếu đăng ký](images/UC_DK_LD_MH03_Popup_duyet_Phieu_dang_ky.png)

##### 4.3.2.4.4.2. Mô tả thông tin trên màn hình

\- Popup có 02 trường hợp hiển thị:

\+ **Ký 01 hồ sơ**: khi Lãnh đạo bấm Ký số trên lưới, bấm Ký số tại [MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký](#mh02), hoặc bấm Ký số trên thanh công cụ khi chỉ tích chọn 01 hồ sơ. Popup hiển thị khung **Thông tin hồ sơ ký số**.

\+ **Ký đồng thời nhiều hồ sơ**: khi Lãnh đạo bấm Ký số trên thanh công cụ và tích chọn từ 02 hồ sơ trở lên. Popup hiển thị **Danh sách hồ sơ ký số**. Không giới hạn số lượng hồ sơ trong một lần ký.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ ký số** | - | - | - | Control UI: Khung thông tin, chỉ đọc.<br>- Chỉ hiển thị với trường hợp Ký 01 hồ sơ. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại file chờ ký | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Văn bản chứng nhận<br>+ Thông báo từ chối |
| File PDF chờ ký | File | - | Lấy theo dữ liệu bản ghi | Control UI: Link `Xem file`, chỉ đọc.<br>- File PDF đã được Cán bộ trình ký và khóa phiên bản. |
| **Danh sách hồ sơ ký số** | - | - | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Chỉ hiển thị với trường hợp Ký đồng thời nhiều hồ sơ.<br>- Hiển thị toàn bộ hồ sơ đã tích chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). |
| Tổng số hồ sơ | Integer(10) | - | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Hiển thị tổng số hồ sơ ký số, đặt phía trên bảng. |
| Cột: STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng trong danh sách. |
| Cột: Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Loại file chờ ký | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Văn bản chứng nhận<br>+ Thông báo từ chối |
| Cột: File PDF chờ ký | File | - | Lấy theo dữ liệu bản ghi | Control UI: Link `Xem file`, chỉ đọc.<br>- File PDF đã được Cán bộ trình ký và khóa phiên bản. |
| Cột: Trạng thái ký số | Enum(String(50)) | - | Chưa ký | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Chỉ hiển thị với trường hợp Ký đồng thời nhiều hồ sơ, giúp Lãnh đạo theo dõi kết quả ký của từng hồ sơ trong danh sách.<br>Gồm:<br>+ Chưa ký<br>+ Đang ký<br>+ Ký thành công<br>+ Ký lỗi<br>- Cập nhật theo kết quả ký của từng hồ sơ. |
| **II. Thông tin ký số** | - | - | - | |
| Hình thức ký số | Enum(String(100)) | Có | USB Token Ban Cơ yếu Chính phủ | Control UI: Radio button.<br>Gồm:<br>+ USB Token Ban Cơ yếu Chính phủ<br>+ SIM ký số<br>+ Ký số từ xa (HSM / Cloud CA)<br>- Khi Lãnh đạo đổi Hình thức ký số, hệ thống đưa Trạng thái chứng thư số về "Chưa kiểm tra" và xóa thông tin Chứng thư số, Thời hạn chứng thư số đã đọc trước đó. |
| Trạng thái chứng thư số | Enum(String(50)) | Không | Chưa kiểm tra | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa kiểm tra<br>+ Không tìm thấy thiết bị/tài khoản ký số<br>+ Chứng thư số không hợp lệ<br>+ Chứng thư số hợp lệ |
| Chứng thư số | Enum(String(500)) | Có | Chứng thư số hợp lệ đầu tiên | Control UI: Combobox.<br>- Chứng thư số là "giấy chứng nhận điện tử" do tổ chức cung cấp dịch vụ chứng thực chữ ký số (ví dụ: Ban Cơ yếu Chính phủ) cấp cho Lãnh đạo, dùng để xác định danh tính người ký trên file PDF. Mỗi chứng thư số gắn với một thiết bị hoặc tài khoản ký số của Lãnh đạo.<br>- Hiển thị danh sách chứng thư số hợp lệ của Lãnh đạo đọc được sau khi bấm "Kiểm tra chứng thư số", theo Hình thức ký số đã chọn.<br>- Mỗi giá trị hiển thị theo định dạng: `[Tên chủ thể chứng thư số] - [Tổ chức cấp] - Số serial: [Số serial]`.<br>- Nếu chỉ có 01 chứng thư số hợp lệ, hệ thống tự động chọn chứng thư số đó.<br>- Bị khóa (Disabled) khi Trạng thái chứng thư số khác "Chứng thư số hợp lệ". |
| Thời hạn chứng thư số | String(50) | - | Theo chứng thư số | Control UI: Label, chỉ đọc.<br>- Hiển thị theo định dạng: `Từ dd/mm/yyyy đến dd/mm/yyyy` của chứng thư số đang chọn. |

##### 4.3.2.4.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 2 | Kiểm tra chứng thư số | Nút | Hệ thống đọc chứng thư số của Lãnh đạo theo Hình thức ký số đã chọn:<br>+ USB Token Ban Cơ yếu Chính phủ: nhận diện USB Token cắm trên máy trạm qua thành phần ký số cục bộ.<br>+ SIM ký số: kết nối dịch vụ ký số của nhà cung cấp theo số điện thoại ký số của Lãnh đạo.<br>+ Ký số từ xa (HSM / Cloud CA): kết nối dịch vụ ký số từ xa theo tài khoản ký số của Lãnh đạo.<br>- **TH1 (Không tìm thấy thiết bị/tài khoản ký số hoặc không đọc được chứng thư số hợp lệ)**: Hệ thống hiển thị [MSG-ERR-DK-011], cập nhật Trạng thái chứng thư số tương ứng ("Không tìm thấy thiết bị/tài khoản ký số" hoặc "Chứng thư số không hợp lệ") và chưa cho phép ký số.<br>- **TH2 (Chứng thư số không thuộc Lãnh đạo đang đăng nhập)**: Hệ thống hiển thị [MSG-ERR-DK-012], cập nhật Trạng thái chứng thư số là "Chứng thư số không hợp lệ" và chưa cho phép ký số.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Kiểm tra thời hạn chứng thư số và trạng thái thu hồi (nếu có tích hợp OCSP/CRL).<br>+ Hiển thị danh sách chứng thư số hợp lệ tại trường Chứng thư số và Thời hạn chứng thư số của chứng thư số đang chọn.<br>+ Cập nhật Trạng thái chứng thư số là "Chứng thư số hợp lệ". |
| 3 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 4 | Ký số | Nút | - **TH1 (Chứng thư số chưa hợp lệ)**: Quy định phải kiểm tra chứng thư số hợp lệ trước khi ký. Nếu Trạng thái chứng thư số khác "Chứng thư số hợp lệ", hệ thống hiển thị [MSG-ERR-DK-011], không thực hiện ký số.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có file PDF chờ ký hợp lệ)**: Hệ thống hiển thị [MSG-ERR-DK-005] hoặc [MSG-ERR-DK-010] và không ký hồ sơ đó.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-013]. Sau khi Lãnh đạo xác nhận, hệ thống yêu cầu xác thực ký số theo Hình thức ký số đã chọn (hệ thống không lưu mã PIN/mã xác thực):<br>+ USB Token Ban Cơ yếu Chính phủ: nhập mã PIN USB Token tại thành phần ký số cục bộ.<br>+ SIM ký số: xác nhận ký trên điện thoại chứa SIM ký số.<br>+ Ký số từ xa (HSM / Cloud CA): nhập mã OTP hoặc xác nhận trên ứng dụng ký số từ xa.<br>Sau khi xác thực thành công, hệ thống hiển thị trạng thái đang xử lý và khóa các nút thao tác trên popup trong thời gian ký, xử lý theo từng trường hợp:<br>**a. Ký 01 hồ sơ**:<br>+ Với file Văn bản chứng nhận: Hệ thống điền Thời điểm cập nhật vào Cơ sở dữ liệu và Ngày tháng năm của văn bản theo thời điểm Lãnh đạo xác thực ký số thành công vào các vị trí để trống trên file (theo [Quy tắc sinh file PDF dự thảo Văn bản chứng nhận theo Mẫu số 05d - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#noi-dung-file-theo-loai-dang-ky)).<br>+ Ký số trên file PDF chờ ký tại vùng ký của lá mặt/trang ký bằng chứng thư số đã chọn và xác minh chữ ký sau khi ký.<br>+ **Ký lỗi** (Lãnh đạo hủy xác thực, nhập sai PIN/OTP hoặc dịch vụ ký số trả lỗi): Hệ thống hiển thị [MSG-ERR-DK-013], giữ nguyên trạng thái hồ sơ "Chờ ký" và giữ popup để Lãnh đạo ký lại.<br>+ **Ký thành công**: Hệ thống thực hiện xử lý sau ký (mô tả bên dưới), hiển thị [MSG-SUC-DK-KT-005], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01).<br>**b. Ký đồng thời nhiều hồ sơ**:<br>+ Lãnh đạo chỉ xác thực ký số 01 lần cho toàn bộ danh sách.<br>+ Hệ thống ký lần lượt từng file PDF theo thứ tự trong Danh sách hồ sơ ký số (điền thời điểm vào file Văn bản chứng nhận như trường hợp ký 01 hồ sơ, theo thời điểm ký thành công của từng hồ sơ); cột Trạng thái ký số của từng dòng cập nhật lần lượt "Đang ký" → "Ký thành công"/"Ký lỗi". Hồ sơ ký lỗi không làm dừng việc ký các hồ sơ còn lại.<br>+ Hồ sơ ký thành công: hệ thống thực hiện xử lý sau ký (mô tả bên dưới).<br>+ Hồ sơ ký lỗi: giữ nguyên trạng thái "Chờ ký".<br>+ Khi ký xong toàn bộ danh sách: Nếu tất cả hồ sơ ký thành công, hệ thống hiển thị [MSG-SUC-DK-KT-005], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). Nếu có hồ sơ ký lỗi, hệ thống hiển thị [MSG-WRN-DK-003] kèm số hồ sơ ký thành công/tổng số hồ sơ, giữ popup để Lãnh đạo xem Trạng thái ký số của từng hồ sơ và bấm Ký số lại; khi ký lại, hệ thống chỉ ký các hồ sơ có Trạng thái ký số là "Ký lỗi".<br>**Xử lý sau ký đối với từng hồ sơ ký thành công**:<br>+ Lưu file PDF đã ký, thông tin chứng thư số, Hình thức ký số, người ký (Lãnh đạo đang đăng nhập), thời điểm ký, phiên bản file đã ký.<br>+ Hồ sơ có Loại file chờ ký là "Văn bản chứng nhận": chuyển sang trạng thái "Hoàn thành" tại đúng thời điểm đã điền vào file; cập nhật hồ sơ gốc, phiên bản, Mã PIN và Trạng thái tài sản theo Loại đăng ký quy định tại [BR-DK-039]; ghi nhận sự kiện xác định trùng lặp theo [BR-DK-037].<br>+ Hồ sơ có Loại file chờ ký là "Thông báo từ chối": chuyển sang trạng thái "Bị từ chối"; tạo yêu cầu hoàn tiền theo [Quy tắc tạo yêu cầu hoàn tiền khi từ chối hồ sơ Online - Quản lý đối soát thanh toán - Module Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_doi_soat_thanh_toan.md#6-quy-tac-tao-yeu-cau-hoan-tien-khi-tu-choi-ho-so-online) đối với hồ sơ trực tuyến; gửi email thông báo đến người yêu cầu đăng ký theo [Email Thông báo từ chối hồ sơ đăng ký - Phụ lục Mẫu Email hệ thống - Danh mục và Phụ lục](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#email-tu-choi-ho-so-dang-ky), đính kèm file Thông báo từ chối đã ký số.<br>+ Đồng bộ trạng thái và file kết quả sang Website Khách hàng.<br>+ Ghi lịch sử xử lý và Audit log. |

---

<a id="mh04"></a>
#### 4.3.2.4.5. MH04 - Popup Từ chối Phiếu đăng ký

##### 4.3.2.4.5.1. Màn hình

![Popup Từ chối Phiếu đăng ký](images/UC_DK_LD_MH04_Popup_tu_choi_Phieu_dang_ky.png)

##### 4.3.2.4.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ từ chối** | - | - | - | Control UI: Khung thông tin, chỉ đọc.<br>- Chỉ hiển thị với trường hợp Từ chối 01 hồ sơ. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Tên bên bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên bảo đảm, hiển thị nối bằng dấu phẩy. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ đã trình ký hồ sơ. |
| Xem dự thảo từ chối | - | - | - | Control UI: Button.<br>- Chỉ hiển thị với trường hợp Từ chối 01 hồ sơ.<br>- Không bắt buộc xem dự thảo trước khi ký số.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **Danh sách hồ sơ từ chối** | - | - | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Chỉ hiển thị với trường hợp Từ chối đồng thời nhiều hồ sơ.<br>- Hiển thị toàn bộ hồ sơ đã tích chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). |
| Tổng số hồ sơ | Integer(10) | - | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Hiển thị tổng số hồ sơ bị từ chối, đặt phía trên bảng. |
| Cột: STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng trong danh sách. |
| Cột: Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Tên bên bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên bảo đảm, hiển thị nối bằng dấu phẩy. |
| Cột: Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ đã trình ký hồ sơ. |
| Cột: Trạng thái ký số | Enum(String(50)) | - | Chưa ký | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Chỉ hiển thị với trường hợp Từ chối đồng thời nhiều hồ sơ, giúp Lãnh đạo theo dõi kết quả ký Thông báo từ chối của từng hồ sơ trong danh sách.<br>Gồm:<br>+ Chưa ký<br>+ Đang ký<br>+ Ký thành công<br>+ Ký lỗi<br>- Cập nhật theo kết quả ký của từng hồ sơ. |
| Cột: Thao tác | - | - | - | Control UI: Icon.<br>- `Xem dự thảo từ chối`<br>- Không bắt buộc xem dự thảo trước khi ký số. |
| Lý do từ chối | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối hồ sơ...".<br>- Bắt buộc nhập trước khi bấm "Xem dự thảo từ chối" hoặc "Ký số"; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra.<br>- Với Từ chối đồng thời nhiều hồ sơ, Lý do từ chối áp dụng cho toàn bộ hồ sơ trong danh sách. |
| **II. Thông tin ký số** | - | - | - | |
| Hình thức ký số | Enum(String(100)) | Có | USB Token Ban Cơ yếu Chính phủ | Control UI: Radio button.<br>Gồm:<br>+ USB Token Ban Cơ yếu Chính phủ<br>+ SIM ký số<br>+ Ký số từ xa (HSM / Cloud CA)<br>- Khi Lãnh đạo đổi Hình thức ký số, hệ thống đưa Trạng thái chứng thư số về "Chưa kiểm tra" và xóa thông tin Chứng thư số, Thời hạn chứng thư số đã đọc trước đó. |
| Trạng thái chứng thư số | Enum(String(50)) | Không | Chưa kiểm tra | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa kiểm tra<br>+ Không tìm thấy thiết bị/tài khoản ký số<br>+ Chứng thư số không hợp lệ<br>+ Chứng thư số hợp lệ |
| Chứng thư số | Enum(String(500)) | Có | Chứng thư số hợp lệ đầu tiên | Control UI: Combobox.<br>- Chứng thư số là "giấy chứng nhận điện tử" do tổ chức cung cấp dịch vụ chứng thực chữ ký số (ví dụ: Ban Cơ yếu Chính phủ) cấp cho Lãnh đạo, dùng để xác định danh tính người ký trên file PDF.<br>- Hiển thị danh sách chứng thư số hợp lệ của Lãnh đạo đọc được sau khi bấm "Kiểm tra chứng thư số", theo Hình thức ký số đã chọn.<br>- Mỗi giá trị hiển thị theo định dạng: `[Tên chủ thể chứng thư số] - [Tổ chức cấp] - Số serial: [Số serial]`.<br>- Nếu chỉ có 01 chứng thư số hợp lệ, hệ thống tự động chọn chứng thư số đó.<br>- Bị khóa (Disabled) khi Trạng thái chứng thư số khác "Chứng thư số hợp lệ". |
| Thời hạn chứng thư số | String(50) | - | Theo chứng thư số | Control UI: Label, chỉ đọc.<br>- Hiển thị theo định dạng: `Từ dd/mm/yyyy đến dd/mm/yyyy` của chứng thư số đang chọn. |

##### 4.3.2.4.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. Các file dự thảo đã sinh không được sử dụng. |
| 2 | Xem dự thảo từ chối (01 hồ sơ) | Nút trên popup | Chỉ hiển thị với trường hợp Từ chối 01 hồ sơ.<br>- **TH1 (Bỏ trống Lý do từ chối)**: Quy định Lý do từ chối là bắt buộc khi xem dự thảo từ chối. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập, tự động focus con trỏ vào ô nhập và không sinh dự thảo.<br>- **TH2 (Không sinh được file PDF dự thảo)**: Hệ thống hiển thị [MSG-ERR-DK-017] và ghi nhận lỗi vào Audit log.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Sinh file PDF dự thảo Thông báo từ chối theo [Quy tắc sinh file PDF dự thảo Thông báo từ chối - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43237-quy-tac-sinh-file-pdf-du-thao-thong-bao-tu-choi), với nội dung tương ứng theo Loại đăng ký của hồ sơ (Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản bảo đảm...); Lý do từ chối lấy theo nội dung Lãnh đạo đã nhập; Khối người có thẩm quyền lấy theo Lãnh đạo đang đăng nhập.<br>+ Lưu file dự thảo vào hồ sơ.<br>+ Mở file dự thảo sang một tab trình duyệt mới để Lãnh đạo kiểm tra nội dung trước khi ký số (không bắt buộc). |
| 3 | Xem dự thảo từ chối (từng hồ sơ trong danh sách) | Icon trên dòng | Chỉ hiển thị với trường hợp Từ chối đồng thời nhiều hồ sơ, tại cột Thao tác trên từng dòng của Danh sách hồ sơ từ chối.<br>- **TH1 (Bỏ trống Lý do từ chối)**: Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập, tự động focus con trỏ vào ô nhập và không sinh dự thảo.<br>- **TH2 (Không sinh được file PDF dự thảo)**: Hệ thống hiển thị [MSG-ERR-DK-017] và ghi nhận lỗi vào Audit log.<br>- **TH Hợp lệ**: Hệ thống sinh file PDF dự thảo Thông báo từ chối cho hồ sơ tại dòng được chọn theo cùng quy tắc với chức năng Xem dự thảo từ chối (01 hồ sơ), lưu file dự thảo vào hồ sơ tương ứng và mở file sang một tab trình duyệt mới. |
| 4 | Kiểm tra chứng thư số | Nút | Hệ thống đọc chứng thư số của Lãnh đạo theo Hình thức ký số đã chọn:<br>+ USB Token Ban Cơ yếu Chính phủ: nhận diện USB Token cắm trên máy trạm qua thành phần ký số cục bộ.<br>+ SIM ký số: kết nối dịch vụ ký số của nhà cung cấp theo số điện thoại ký số của Lãnh đạo.<br>+ Ký số từ xa (HSM / Cloud CA): kết nối dịch vụ ký số từ xa theo tài khoản ký số của Lãnh đạo.<br>- **TH1 (Không tìm thấy thiết bị/tài khoản ký số hoặc không đọc được chứng thư số hợp lệ)**: Hệ thống hiển thị [MSG-ERR-DK-011], cập nhật Trạng thái chứng thư số tương ứng và chưa cho phép ký số.<br>- **TH2 (Chứng thư số không thuộc Lãnh đạo đang đăng nhập)**: Hệ thống hiển thị [MSG-ERR-DK-012], cập nhật Trạng thái chứng thư số là "Chứng thư số không hợp lệ" và chưa cho phép ký số.<br>- **TH Hợp lệ**: Hệ thống kiểm tra thời hạn chứng thư số và trạng thái thu hồi (nếu có tích hợp OCSP/CRL), hiển thị danh sách chứng thư số hợp lệ, Thời hạn chứng thư số và cập nhật Trạng thái chứng thư số là "Chứng thư số hợp lệ". |
| 5 | Ký số | Nút | - **TH1 (Bỏ trống Lý do từ chối)**: Quy định Lý do từ chối là bắt buộc. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập và focus con trỏ vào ô nhập. Không thực hiện ký số.<br>- **TH2 (Chứng thư số chưa hợp lệ)**: Nếu Trạng thái chứng thư số khác "Chứng thư số hợp lệ", hệ thống hiển thị [MSG-ERR-DK-011], không thực hiện ký số.<br>- **TH3 (Có hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không thực hiện ký số.<br>- **TH4 (Không sinh được file PDF Thông báo từ chối)**: Hệ thống hiển thị [MSG-ERR-DK-017], ghi nhận lỗi vào Audit log và không thực hiện ký số hồ sơ đó.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-016]. Sau khi Lãnh đạo xác nhận, hệ thống thực hiện:<br>+ Với hồ sơ Lãnh đạo chưa xem dự thảo, hoặc Lý do từ chối đã thay đổi sau lần xem dự thảo gần nhất: hệ thống tự động sinh file PDF Thông báo từ chối theo cùng quy tắc với chức năng Xem dự thảo từ chối (01 hồ sơ). Với hồ sơ đã xem dự thảo: sử dụng file dự thảo phiên bản mới nhất.<br>+ Yêu cầu xác thực ký số theo Hình thức ký số đã chọn (USB Token: nhập mã PIN tại thành phần ký số cục bộ; SIM ký số: xác nhận trên điện thoại; Ký số từ xa: nhập mã OTP hoặc xác nhận trên ứng dụng ký số từ xa; hệ thống không lưu mã PIN/mã xác thực).<br>Sau khi xác thực thành công, hệ thống hiển thị trạng thái đang xử lý và khóa các nút thao tác trên popup trong thời gian ký, xử lý theo từng trường hợp:<br>**a. Từ chối 01 hồ sơ**:<br>+ Ký số trên file PDF Thông báo từ chối bằng chứng thư số đã chọn và xác minh chữ ký sau khi ký.<br>+ **Ký lỗi**: Hệ thống hiển thị [MSG-ERR-DK-013], giữ nguyên trạng thái hồ sơ "Chờ ký" và giữ popup để Lãnh đạo ký lại.<br>+ **Ký thành công**: Hệ thống thực hiện xử lý sau ký (mô tả bên dưới), hiển thị [MSG-SUC-DK-KT-003], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01).<br>**b. Từ chối đồng thời nhiều hồ sơ**:<br>+ Lãnh đạo chỉ xác thực ký số 01 lần cho toàn bộ danh sách.<br>+ Hệ thống ký lần lượt từng file PDF Thông báo từ chối theo thứ tự trong Danh sách hồ sơ từ chối; cột Trạng thái ký số của từng dòng cập nhật lần lượt "Đang ký" → "Ký thành công"/"Ký lỗi". Hồ sơ ký lỗi không làm dừng việc ký các hồ sơ còn lại.<br>+ Hồ sơ ký thành công: hệ thống thực hiện xử lý sau ký (mô tả bên dưới).<br>+ Hồ sơ ký lỗi: giữ nguyên trạng thái "Chờ ký".<br>+ Khi ký xong toàn bộ danh sách: Nếu tất cả hồ sơ ký thành công, hệ thống hiển thị [MSG-SUC-DK-KT-003], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). Nếu có hồ sơ ký lỗi, hệ thống hiển thị [MSG-WRN-DK-003] kèm số hồ sơ ký thành công/tổng số hồ sơ, giữ popup để Lãnh đạo xem Trạng thái ký số của từng hồ sơ và bấm Ký số lại; khi ký lại, hệ thống chỉ ký các hồ sơ có Trạng thái ký số là "Ký lỗi".<br>**Xử lý sau ký đối với từng hồ sơ ký thành công**:<br>+ Lưu người từ chối (Lãnh đạo đang đăng nhập), thời điểm từ chối, lý do từ chối, phiên bản dữ liệu hồ sơ bị từ chối; lưu file Thông báo từ chối đã ký, thông tin chứng thư số, Hình thức ký số, thời điểm ký, phiên bản file đã ký.<br>+ Chuyển hồ sơ sang trạng thái "Bị từ chối".<br>+ Tạo yêu cầu hoàn tiền theo [Quy tắc tạo yêu cầu hoàn tiền khi từ chối hồ sơ Online - Quản lý đối soát thanh toán - Module Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_doi_soat_thanh_toan.md#6-quy-tac-tao-yeu-cau-hoan-tien-khi-tu-choi-ho-so-online) đối với hồ sơ trực tuyến.<br>+ Gửi email thông báo đến người yêu cầu đăng ký theo [Email Thông báo từ chối hồ sơ đăng ký - Phụ lục Mẫu Email hệ thống - Danh mục và Phụ lục](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#email-tu-choi-ho-so-dang-ky), đính kèm file Thông báo từ chối đã ký số.<br>+ Đồng bộ trạng thái và file Thông báo từ chối đã ký sang Website Khách hàng.<br>+ Ghi lịch sử xử lý và Audit log. |

---

<a id="mh05"></a>
#### 4.3.2.4.6. MH05 - Popup Trả lại Phiếu đăng ký

##### 4.3.2.4.6.1. Màn hình

![Popup Trả lại Phiếu đăng ký](images/UC_DK_LD_MH05_Popup_tra_lai_Phieu_dang_ky.png)

##### 4.3.2.4.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Số đăng ký | String(50) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Số đăng ký của hồ sơ bị trả lại. |
| Loại đăng ký | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | Không | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cán bộ xử lý | String(255) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ đã trình ký hồ sơ. |
| Lý do trả lại | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do trả lại hồ sơ...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.4.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 2 | Xác nhận | Nút | - **TH1 (Bỏ trống Lý do trả lại)**: Quy định Lý do trả lại là bắt buộc. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập và focus con trỏ vào ô nhập. Không thực hiện trả lại.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có Nguồn tiếp nhận là "Trực tiếp")**: Quy định chỉ được trả lại hồ sơ có Nguồn tiếp nhận là "Trực tiếp" đang ở trạng thái "Chờ ký". Hệ thống hiển thị [MSG-ERR-DK-005], không thực hiện trả lại.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-014]. Sau khi Lãnh đạo xác nhận, hệ thống thực hiện:<br>+ Lưu người trả lại, thời điểm trả lại, lý do trả lại và phiên bản dữ liệu/file PDF bị trả lại.<br>+ Chuyển hồ sơ sang trạng thái "Bị trả lại".<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-KT-006], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). |
