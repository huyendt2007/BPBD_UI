### 4.3.2.3. Xử lý Phiếu đăng ký

#### 4.3.2.3.1. Mục đích

\- Cho phép Cán bộ TTĐK kiểm tra, duyệt, trình ký hoặc từ chối Phiếu đăng ký biện pháp bảo đảm, hợp đồng và thông báo xử lý tài sản bảo đảm ở trạng thái **"Chờ duyệt"** thuộc đơn vị được phân công.

*a. Phân quyền*

\- Cán bộ TTĐK được phân quyền xử lý Phiếu đăng ký, chỉ được xem và xử lý hồ sơ thuộc đơn vị được phân công và đang ở trạng thái "Chờ duyệt".

*b. Điều kiện thực hiện*
- Cán bộ đã đăng nhập thành công vào Website Quản trị.
- Cán bộ được phân quyền truy cập menu "Biện pháp bảo đảm > Kiểm tra và xử lý hồ sơ".
- Hồ sơ đã hoàn tất bước nộp hồ sơ/thanh toán hoặc miễn phí và đang ở trạng thái "Chờ duyệt".
- Dữ liệu hồ sơ, file đính kèm, lịch sử xử lý và kết quả đối soát rủi ro của hồ sơ đã được hệ thống lưu trữ đầy đủ.

*c. Nguyên tắc bố trí màn hình*
- Tại các màn danh sách xử lý hồ sơ của Website Cán bộ, hệ thống hiển thị tầng tab nghiệp vụ gồm:
  - "Phiếu đăng ký".
  - "Yêu cầu cung cấp thông tin".
  - "Yêu cầu cung cấp bản sao".
- Tài liệu này chỉ mô tả chi tiết tab "Phiếu đăng ký".
- Tab "Hồ sơ chờ nhập liệu" không chia thành 3 khối Phiếu đăng ký/Yêu cầu cung cấp thông tin/Yêu cầu cung cấp bản sao. Đây là một danh sách hồ sơ giấy chờ nhập liệu duy nhất; khi Cán bộ chọn đúng Loại yêu cầu, hệ thống mới mở form nhập liệu tương ứng.

---

<a id="mh01"></a>
#### 4.3.2.3.2. MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt

##### 4.3.2.3.2.1. Màn hình

![Màn hình Danh sách Phiếu đăng ký chờ duyệt](images/UC_DK_CB_MH01_Danh_sach_Phieu_dang_ky_theo_trang_thai.png)

##### 4.3.2.3.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | |
| Tìm kiếm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký, mã PIN, tên bên bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Số đăng ký, Mã PIN, Tên bên bảo đảm hoặc Tên bên nhận bảo đảm. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng theo Mã khách hàng nộp hồ sơ. |
| Nguồn tiếp nhận | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Dịch vụ công<br>+ Trực tuyến |
| Loại đăng ký | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04].<br>- Chỉ lọc trong phạm vi nhóm Phiếu đăng ký, không trả về hồ sơ Yêu cầu cung cấp thông tin/Yêu cầu cung cấp bản sao. |
| Loại hình giao dịch | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại hình giao dịch [DM_01].<br>- Khi chọn "Biện pháp bảo đảm", hệ thống cập nhật danh sách Loại biện pháp/Hợp đồng theo Danh mục Loại biện pháp bảo đảm [DM_02].<br>- Khi chọn "Hợp đồng", hệ thống cập nhật danh sách Loại biện pháp/Hợp đồng theo Danh mục Loại hợp đồng [DM_03].<br>- Khi chọn "Thông báo xử lý tài sản", hệ thống lọc các hồ sơ thông báo xử lý tài sản trong [DM_04]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại biện pháp bảo đảm [DM_02] hoặc [DM_03] theo Loại hình giao dịch đã chọn.<br>- Nếu chưa chọn Loại hình giao dịch, chỉ hiển thị "Tất cả". |
| Loại tài sản | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại tài sản bảo đảm [DM_07].<br>- Nếu chọn một loại tài sản cụ thể, hệ thống hiển thị thêm **Khối lọc động theo Loại tài sản** và các cột động tương ứng trên Bảng danh sách. |
| **Khối lọc động theo Loại tài sản** | - | Không | Ẩn | Chỉ hiển thị khi Cán bộ chọn một giá trị cụ thể tại trường `Loại tài sản`. Các trường trong khối lọc động tương ứng với cấu trúc thông tin tài sản tại [Màn hình Nhập liệu Đăng ký mới BPBĐ - Đăng ký mới Biện pháp bảo đảm, Hợp đồng (Website Khách hàng)](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd), giống khối lọc tại [Tab Phiếu đăng ký - Quản lý yêu cầu đã đăng ký - Phiếu đăng ký (Website Khách hàng)](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41122-tab-phieu-dang-ky). |
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
| Mô tả | Text(1000) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại tài sản` là một trong các giá trị có trường Mô tả tại màn Đăng ký mới BPBĐ, gồm:<br>+ `Cây hằng năm, công trình tạm`<br>+ `Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)` |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| **II. Bảng danh sách Phiếu đăng ký chờ duyệt** | - | - | - | |
| Bảng danh sách Phiếu đăng ký | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm thanh phân trang.<br>- Chỉ hiển thị Phiếu đăng ký ở trạng thái "Chờ duyệt", thuộc đơn vị được phân công của Cán bộ đăng nhập.<br>- **Mặc định khi mở màn hình**: Thời điểm đăng ký từ ngày 01 của tháng hiện tại đến ngày hiện tại, các bộ lọc còn lại là "Tất cả"/Trống, không hiển thị cột động, 20 bản ghi/trang.<br>- Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên hồ sơ đến trước.<br>- Cho phép sắp xếp khi click tiêu đề tại 03 cột: Thời điểm đăng ký, Tên bên bảo đảm, Tên bên nhận bảo đảm. Các cột còn lại không hỗ trợ sắp xếp.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"* và các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| Thanh công cụ (Toolbar) | - | - | - | Control UI: Nhóm nút phía trên Bảng danh sách, dùng cho thao tác lô trên các hồ sơ đã tích chọn.<br>Gồm:<br>+ Duyệt<br>+ Trình ký<br>+ Từ chối |
| Checkbox | Boolean | Không | Không tích | Control UI: Checkbox chọn dòng / Chọn tất cả.<br>- Cho phép chọn một hoặc nhiều hồ sơ để thực hiện thao tác lô (Duyệt, Trình ký, Từ chối) trên thanh công cụ.<br>- Checkbox chọn tất cả tại tiêu đề bảng chỉ chọn các hồ sơ đang hiển thị trên trang hiện tại.<br>- Khi Cán bộ đổi Tab nhóm nghiệp vụ, bộ lọc tìm kiếm hoặc số bản ghi/trang, hệ thống xóa danh sách hồ sơ đã chọn. |
| STT | Integer(10) | - | Theo trang | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng tính liên tục theo trang kết quả hiện tại. |
| Thời điểm đăng ký | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Số đăng ký của Phiếu đăng ký. Click vào giá trị mở [MH02 - Màn hình Xem chi tiết Phiếu đăng ký](#mh02). |
| Mã PIN | String(20) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị mã PIN bảo mật của hồ sơ nếu đã phát sinh. |
| Tên bên bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Tên bên nhận bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại hình GD | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại tài sản | Enum(String(255)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu hồ sơ có nhiều Loại tài sản, hiển thị mỗi Loại tài sản trên một dòng riêng trong cùng ô. |
| Cột mở rộng theo Loại tài sản | - | - | Ẩn | Chỉ hiển thị khi Cán bộ chọn một loại tài sản cụ thể tại bộ lọc `Loại tài sản`. Các cột mở rộng hiển thị đúng các trường đang hiển thị tại **Khối lọc động theo Loại tài sản**, đặt ngay sau cột Loại tài sản. |
| Cột động: Tên phương tiện | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Số khung | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Số máy | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Biển số | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Tên phương tiện, nhãn hiệu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Tên/Họ tên chủ phương tiện/Chủ sở hữu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Số đăng ký phương tiện | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Cơ quan cấp giấy chứng nhận | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Cấp phương tiện | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Tên quyền | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản quyền tài sản hoặc một phần quyền tài sản. |
| Cột động: Căn cứ phát sinh quyền | Text(2000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản quyền tài sản hoặc một phần quyền tài sản. |
| Cột động: Hàng hóa luân chuyển / Kho hàng | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng. |
| Cột động: Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng. |
| Cột động: Địa chỉ kho hàng | String(500) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng và dữ liệu là Kho hàng. |
| Cột động: Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng và dữ liệu là Kho hàng. |
| Cột động: Thời điểm đăng ký tại VSDC | Datetime/String(16) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung. Giá trị hiển thị dạng `HH:mm dd/MM/yyyy`. |
| Cột động: Mô tả | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị khi bộ lọc đang chọn loại tài sản có trường `Mô tả`. |
| Mã khách hàng | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị Mã khách hàng nộp hồ sơ nếu có. |
| Số biên lai | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị số biên lai/biên nhận thanh toán lệ phí nếu có. |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Hiển thị trạng thái hiện tại của hồ sơ. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tên người yêu cầu đăng ký; nếu hồ sơ không lưu Người yêu cầu riêng, hệ thống hiển thị theo Tên bên bảo đảm/người nộp hồ sơ theo dữ liệu hồ sơ. |
| Nguồn tiếp nhận | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị "Dịch vụ công" hoặc "Trực tuyến". |
| Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tên Cán bộ đang được phân công xử lý hồ sơ. |
| Thao tác | - | - | - | Control UI: Nhóm icon thao tác trên dòng .<br>Gồm:<br>+ Duyệt<br>+ Trình ký<br>+ Từ chối |

##### 4.3.2.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống tìm kiếm Phiếu đăng ký ở trạng thái "Chờ duyệt" theo các điều kiện đã nhập tại Khối Bộ lọc tìm kiếm (bao gồm Khối lọc động theo Loại tài sản nếu đang hiển thị), trong phạm vi đơn vị được phân quyền của Cán bộ đăng nhập.<br>- **TH1 (Điều kiện ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày` (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày), hệ thống hiển thị [MSG-ERR-VAL-007], highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Hợp lệ (Có dữ liệu trả về)**: Hệ thống thực hiện:<br>+ Hiển thị danh sách Phiếu đăng ký thỏa mãn đồng thời các điều kiện lọc.<br>+ Sắp xếp mặc định theo `Thời điểm đăng ký` tăng dần.<br>+ Phân trang theo số dòng hiển thị đang chọn. |
| 2 | Xóa bộ lọc | Nút | Hệ thống thực hiện:<br>+ Đưa toàn bộ tiêu chí lọc về mặc định: Từ ngày là ngày hiện tại trừ 3 tháng, Đến ngày là ngày hiện tại, các Combobox về "Tất cả", các ô nhập về Trống.<br>+ Ẩn Khối lọc động và các cột động theo Loại tài sản.<br>+ Đặt lại phân trang về Trang 1 và tải lại danh sách. |
| 3 | Chọn Loại tài sản | Combobox | - **TH1 (Chọn một loại tài sản cụ thể)**: Hệ thống hiển thị **Khối lọc động theo Loại tài sản** với các trường tương ứng loại tài sản đã chọn, đồng thời hiển thị các **Cột động** tương ứng trên Bảng danh sách.<br>- **TH2 (Đổi sang loại tài sản khác)**: Hệ thống xóa giá trị đã nhập ở các trường lọc động của loại cũ, hiển thị bộ trường lọc động và cột động của loại mới.<br>- **TH3 (Chọn lại "Tất cả")**: Hệ thống ẩn Khối lọc động, xóa giá trị các trường lọc động và ẩn toàn bộ cột động. |
| 4 | Duyệt (thanh công cụ) | Nút trên Toolbar | Duyệt nhiều hồ sơ đã tích chọn trên lưới cùng một lúc.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-DK-008], không thực hiện duyệt.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Cập nhật toàn bộ hồ sơ đã chọn sang trạng thái "Duyệt chờ ký".<br>+ Ghi nhận Cán bộ duyệt, thời điểm duyệt, trạng thái trước/sau cho từng hồ sơ.<br>+ Ghi lịch sử xử lý và Audit log cho từng hồ sơ.<br>+ Loại các hồ sơ khỏi danh sách chờ duyệt.<br>+ Hiển thị thông báo thành công kèm tổng số hồ sơ đã duyệt. |
| 5 | Duyệt (trên lưới) | Icon trên dòng | Duyệt hồ sơ tại dòng được chọn.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Cập nhật hồ sơ sang trạng thái "Duyệt chờ ký".<br>+ Ghi nhận Cán bộ duyệt, thời điểm duyệt, trạng thái trước/sau.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Loại hồ sơ khỏi danh sách chờ duyệt.<br>+ Hiển thị [MSG-SUC-DK-KT-001]. |
| 6 | Trình ký (thanh công cụ) | Nút trên Toolbar | Trình ký nhiều hồ sơ đã tích chọn trên lưới cùng một lúc.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-DK-008], không mở popup trình ký.<br>- **TH2 (Vượt quá số lượng hồ sơ trình ký/lần)**: Nếu số hồ sơ được chọn lớn hơn giới hạn cấu hình (mặc định 20 hồ sơ/lần), hệ thống hiển thị cảnh báo theo [MSG-WRN-SYS-001] và không mở popup trình ký.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Mở [MH04 - Popup Trình ký Phiếu đăng ký](#mh04) và truyền danh sách hồ sơ đã chọn vào popup.<br>+ Trường "Lãnh đạo ký" chỉ hiển thị người có thẩm quyền ký toàn bộ hồ sơ trong danh sách. |
| 7 | Trình ký (trên lưới) | Icon trên dòng | Trình ký hồ sơ tại dòng được chọn.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Trình ký Phiếu đăng ký](#mh04) cho hồ sơ tại dòng được chọn. |
| 8 | Từ chối (thanh công cụ) | Nút trên Toolbar | Từ chối nhiều hồ sơ đã tích chọn trên lưới cùng một lúc.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-DK-008], không mở popup từ chối.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Mở [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) và truyền danh sách hồ sơ đã chọn vào popup.<br>+ Lý do từ chối áp dụng cho toàn bộ hồ sơ trong danh sách.<br>+ Trường "Lãnh đạo ký văn bản từ chối" chỉ hiển thị người có thẩm quyền ký toàn bộ văn bản từ chối trong danh sách. |
| 9 | Từ chối (trên lưới) | Icon trên dòng | Từ chối hồ sơ tại dòng được chọn.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) cho hồ sơ tại dòng được chọn. |
| 10 | Click dòng dữ liệu | Row click | Mở [MH02 - Màn hình Xem chi tiết Phiếu đăng ký](#mh02) của bản ghi được chọn. |
| 11 | Sắp xếp cột | Header cột | Chỉ áp dụng cho 03 cột: `Thời điểm đăng ký`, `Tên bên bảo đảm`, `Tên bên nhận bảo đảm`. Các cột còn lại không hỗ trợ sắp xếp. Khi Cán bộ click vào tiêu đề một trong 03 cột trên:<br>+ Lần click thứ nhất: Sắp xếp danh sách kết quả theo chiều tăng dần.<br>+ Lần click thứ hai: Sắp xếp danh sách kết quả theo chiều giảm dần.<br>+ Lần click thứ ba: Đưa về trạng thái sắp xếp mặc định ban đầu của hệ thống.<br>+ Giữ nguyên các tiêu chí lọc đang thiết lập và đưa hiển thị về Trang 1. |
| 12 | Chọn tất cả | Checkbox header | Tích chọn hoặc bỏ chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại phục vụ thao tác lô (Duyệt, Trình ký, Từ chối) trên thanh công cụ. |

---

<a id="mh02"></a>
#### 4.3.2.3.3. MH02 - Màn hình Xem chi tiết Phiếu đăng ký

##### 4.3.2.3.3.1. Màn hình

![Màn hình Xem chi tiết Phiếu đăng ký](images/UC_DK_CB_MH02_Xem_chi_tiet_Phieu_dang_ky.png)

##### 4.3.2.3.3.2. Mô tả thông tin trên màn hình

- Phạm vi màn hình này chỉ bao gồm các Phiếu đăng ký: Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản bảo đảm lần đầu, Thay đổi thông báo xử lý tài sản bảo đảm, Xóa đăng ký thông báo xử lý tài sản bảo đảm.
- **Mặc định khi mở màn hình**: hệ thống focus (chọn và tô nổi bật) vào đúng phiên bản tương ứng với bản ghi Cán bộ đã chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01) và hiển thị chi tiết của phiên bản đó.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Sidebar dòng thời gian lịch sử** | - | - | - | Hiển thị và xử lý giống khối **I. Sidebar dòng thời gian lịch sử** tại [Phiếu đăng ký - Xem chi tiết - Quản lý yêu cầu đã đăng ký - Phiếu đăng ký (Website Khách hàng)](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#411232-mo-ta-thong-tin-tren-man-hinh).<br>- Mặc định focus vào node phiên bản tương ứng với bản ghi Cán bộ đã chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01). |
| **II. Vùng tiêu đề và thao tác** | - | - | - | Hiển thị và xử lý giống khối **II. Vùng tiêu đề và thao tác** tại [Phiếu đăng ký - Xem chi tiết - Quản lý yêu cầu đã đăng ký - Phiếu đăng ký (Website Khách hàng)](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#411232-mo-ta-thong-tin-tren-man-hinh). |
| **III. Thông tin hồ sơ** | - | - | - | Hiển thị giống khối **III. Thông tin hồ sơ** tại [Phiếu đăng ký - Xem chi tiết - Quản lý yêu cầu đã đăng ký - Phiếu đăng ký (Website Khách hàng)](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#411232-mo-ta-thong-tin-tren-man-hinh). |
| **IV. Thông tin chi tiết phiên bản** | - | - | - | Hiển thị giống khối **IV. Thông tin chi tiết phiên bản** tại [Phiếu đăng ký - Xem chi tiết - Quản lý yêu cầu đã đăng ký - Phiếu đăng ký (Website Khách hàng)](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#411232-mo-ta-thong-tin-tren-man-hinh). |
| **V. Thông tin bổ sung của phiên bản đang chọn** | - | - | - | Hiển thị các thông tin bổ sung dành cho Cán bộ của phiên bản đang được chọn trên Sidebar. |
| Mã PIN | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Nguồn tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Mã khách hàng | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| **VI. Tài liệu đính kèm** | - | - | - | |
| Tài liệu đính kèm của Khách hàng | - | - | - | Control UI: Danh sách tệp đính kèm kèm link "Xem file", chỉ đọc. Hiển thị theo dữ liệu bản ghi.<br>- Hiển thị danh sách tệp đính kèm do Khách hàng đã gửi cùng hồ sơ. |

##### 4.3.2.3.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Hệ thống đóng màn hình Xem chi tiết và quay lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01), giữ nguyên tab nhóm nghiệp vụ, bộ lọc tìm kiếm và trang dữ liệu trước đó. |
| 2 | Duyệt | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt".<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Cập nhật hồ sơ sang trạng thái "Duyệt chờ ký".<br>+ Ghi nhận người duyệt, thời điểm duyệt, trạng thái trước/sau.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-KT-001].<br>+ Đóng màn hình chi tiết và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01). |
| 3 | Trình ký | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt".<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Trình ký Phiếu đăng ký](#mh04) để Cán bộ xem dự thảo Văn bản chứng nhận, chọn Lãnh đạo ký và xác nhận trình ký. |
| 4 | Từ chối | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt".<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) cho hồ sơ đang xem. |
| 5 | Xem file | Link / Nút | Hệ thống mở tệp tài liệu đính kèm, file PDF dự thảo hoặc file đã ký sang một tab trình duyệt mới để Cán bộ xem toàn văn nội dung. |
| 6 | Chọn phiên bản trên Timeline | Click item | Khi Cán bộ click vào một mốc phiên bản trên Timeline vòng đời giao dịch, hệ thống tải lại toàn bộ dữ liệu chi tiết của phiên bản tương ứng vào Khung đối chiếu dữ liệu chi tiết để Cán bộ kiểm tra, đối soát; không làm thay đổi trạng thái và phiên bản hồ sơ đang mở xử lý. |
| 7 | Lọc vùng biến động | Checkbox toggle | - **TH1 (Tích chọn "Chỉ hiển thị vùng dữ liệu có biến động")**: Hệ thống ẩn các vùng thông tin giống nhau giữa các phiên bản và chỉ hiển thị các khối dữ liệu có sự thay đổi.<br>- **TH2 (Bỏ tích chọn)**: Hệ thống hiển thị lại đầy đủ toàn bộ các khối thông tin. |

---

<a id="mh03"></a>
#### 4.3.2.3.4. MH03 - Popup Từ chối Phiếu đăng ký

##### 4.3.2.3.4.1. Màn hình

![Popup Từ chối Phiếu đăng ký](images/UC_DK_CB_MH03_Tu_choi_Phieu_dang_ky.png)

##### 4.3.2.3.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Số đăng ký | String(50) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị khi Cán bộ từ chối một hồ sơ (thao tác Từ chối trên lưới hoặc tại màn Xem chi tiết).<br>- Hiển thị Số đăng ký của hồ sơ bị từ chối. |
| **Danh sách Số đăng ký** | - | Có | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Chỉ hiển thị khi Cán bộ từ chối nhiều hồ sơ (thao tác Từ chối trên thanh công cụ).<br>- Hiển thị toàn bộ hồ sơ đã tích chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01). |
| Tổng số hồ sơ | Integer(10) | Có | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Hiển thị tổng số hồ sơ bị từ chối, đặt phía trên bảng. |
| STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng trong danh sách. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Số đăng ký của hồ sơ bị từ chối. |
| Tên bên bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên bảo đảm, hiển thị nối bằng dấu phẩy. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Loại hình đăng ký của hồ sơ. |
| Thao tác | - | - | - | Control UI: Icon.<br>- `Xem dự thảo từ chối` |
| Lý do từ chối tiếp nhận | Text(1000) | Có | Theo ý kiến đã nhập hoặc Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối hồ sơ...".<br>- Bắt buộc nhập trước khi bấm "Xem dự thảo từ chối" hoặc "Xác nhận".<br>- Tự động trim space và kiểm tra bỏ trống. |
| Xem dự thảo từ chối | - | - | - | Control UI: Button.<br>- Chỉ hiển thị khi Cán bộ từ chối một hồ sơ (thao tác Từ chối trên lưới hoặc tại màn Xem chi tiết).<br>- Khi Cán bộ từ chối nhiều hồ sơ (thao tác Từ chối trên thanh công cụ), thao tác "Xem dự thảo từ chối" nằm tại cột Thao tác trên từng dòng của Danh sách Số đăng ký.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Lãnh đạo ký văn bản từ chối | Enum(String(255)) | Có | Trống | Control UI: Dropdown list.<br>- Bắt buộc chọn trước khi bấm "Xác nhận".<br>- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký văn bản từ chối của hồ sơ được chọn.<br>- Với từ chối nhiều hồ sơ, danh sách Lãnh đạo ký chỉ hiển thị người có thẩm quyền ký tất cả văn bản từ chối trong danh sách đã chọn. |

##### 4.3.2.3.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình trước đó. |
| 2 | Xem dự thảo từ chối (một hồ sơ) | Nút trên popup | Chỉ hiển thị khi Cán bộ từ chối một hồ sơ (thao tác Từ chối trên lưới hoặc tại màn Xem chi tiết).<br>- **TH1 (Bỏ trống Lý do từ chối tiếp nhận)**: Quy định Lý do từ chối tiếp nhận là bắt buộc khi xem dự thảo từ chối. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập, tự động focus con trỏ vào ô nhập và không sinh dự thảo.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Sinh dự thảo Thông báo từ chối theo [Quy tắc sinh file PDF dự thảo Thông báo từ chối](#43237-quy-tac-sinh-file-pdf-du-thao-thong-bao-tu-choi), sử dụng Lý do từ chối tiếp nhận đã nhập.<br>+ Lưu file dự thảo vào hồ sơ.<br>+ Mở file dự thảo sang một tab trình duyệt mới để Cán bộ kiểm tra nội dung trước khi xác nhận. |
| 3 | Xem dự thảo từ chối (từng hồ sơ trong danh sách) | Nút trên dòng | Chỉ hiển thị khi Cán bộ từ chối nhiều hồ sơ (thao tác Từ chối trên thanh công cụ), tại cột Thao tác trên từng dòng của Danh sách Số đăng ký.<br>- **TH1 (Bỏ trống Lý do từ chối tiếp nhận)**: Quy định Lý do từ chối tiếp nhận là bắt buộc khi xem dự thảo từ chối. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập, tự động focus con trỏ vào ô nhập và không sinh dự thảo.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Sinh dự thảo Thông báo từ chối cho hồ sơ tại dòng được chọn theo [Quy tắc sinh file PDF dự thảo Thông báo từ chối](#43237-quy-tac-sinh-file-pdf-du-thao-thong-bao-tu-choi), sử dụng Lý do từ chối tiếp nhận đã nhập.<br>+ Lưu file dự thảo vào hồ sơ tương ứng.<br>+ Mở file dự thảo sang một tab trình duyệt mới để Cán bộ kiểm tra nội dung trước khi xác nhận. |
| 4 | Xác nhận | Nút | - **TH1 (Bỏ trống Lý do từ chối tiếp nhận)**: Quy định Lý do từ chối tiếp nhận là bắt buộc. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập và focus con trỏ vào ô nhập.<br>- **TH2 (Chưa xem dự thảo từ chối)**: Quy định Cán bộ phải xem dự thảo từ chối trước khi xác nhận; với từ chối nhiều hồ sơ, phải xem dự thảo của tất cả hồ sơ trong Danh sách Số đăng ký. Hệ thống hiển thị [MSG-ERR-SYS-001], không chuyển trạng thái hồ sơ.<br>- **TH3 (Chưa chọn Lãnh đạo ký văn bản từ chối hoặc Lãnh đạo đã chọn không còn hiệu lực/thẩm quyền)**: Quy định Lãnh đạo ký văn bản từ chối là bắt buộc. Hệ thống tô viền đỏ trường chọn, hiển thị [MSG-ERR-VAL-001] dạng Inline phía dưới ô chọn, focus con trỏ và không gửi trình ký.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Cập nhật hồ sơ sang trạng thái "Chờ ký" để Lãnh đạo ký số/ký duyệt văn bản từ chối.<br>+ Ghi nhận Cán bộ từ chối, thời điểm từ chối, lý do từ chối, phiên bản file dự thảo và Lãnh đạo ký văn bản từ chối đã chọn.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Chuyển hồ sơ đến đúng Lãnh đạo ký đã chọn.<br>+ Sau khi Lãnh đạo ký văn bản từ chối, tạo yêu cầu hoàn tiền theo [Quy tắc tạo yêu cầu hoàn tiền khi từ chối hồ sơ Online](../01_Quan_tri_he_thong/Quan_ly_doi_soat_thanh_toan.md#6-quy-tac-tao-yeu-cau-hoan-tien-khi-tu-choi-ho-so-online).<br>+ Hiển thị [MSG-SUC-DK-KT-003].<br>+ Đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01). |

---

<a id="mh04"></a>
#### 4.3.2.3.5. MH04 - Popup Trình ký Phiếu đăng ký

##### 4.3.2.3.5.1. Màn hình

![Popup Trình ký Phiếu đăng ký](images/UC_DK_CB_MH04_Trinh_ky_Phieu_dang_ky.png)

##### 4.3.2.3.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Thông tin hồ sơ trình ký** | - | - | - | Control UI: Khung thông tin, chỉ đọc.<br>- Chỉ hiển thị khi Cán bộ trình ký một hồ sơ (thao tác Trình ký trên lưới hoặc tại màn Xem chi tiết). |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Số đăng ký của hồ sơ trình ký. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại hình giao dịch | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| **Danh sách hồ sơ trình ký** | - | - | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Chỉ hiển thị khi Cán bộ trình ký nhiều hồ sơ (thao tác Trình ký trên thanh công cụ).<br>- Hiển thị toàn bộ hồ sơ đã tích chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01). |
| Tổng số hồ sơ trình ký | Integer(10) | - | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Hiển thị tổng số hồ sơ trong lần trình ký, đặt phía trên bảng.<br>- Không vượt quá giới hạn cấu hình, mặc định tối đa 20 hồ sơ/lần. |
| STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng trong danh sách. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Số đăng ký của hồ sơ trình ký. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại hình giao dịch | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Thao tác | - | - | - | Control UI: Icon.<br>- `Xem dự thảo Văn bản chứng nhận` |
| Xem dự thảo Văn bản chứng nhận | - | - | - | Control UI: Button.<br>- Chỉ hiển thị khi Cán bộ trình ký một hồ sơ (thao tác Trình ký trên lưới hoặc tại màn Xem chi tiết).<br>- Khi Cán bộ trình ký nhiều hồ sơ (thao tác Trình ký trên thanh công cụ), thao tác "Xem dự thảo Văn bản chứng nhận" nằm tại cột Thao tác trên từng dòng của Danh sách hồ sơ trình ký.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | Control UI: Dropdown list.<br>- Bắt buộc chọn trước khi bấm "Xác nhận trình ký".<br>- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký hồ sơ Phiếu đăng ký được chọn.<br>- Với trình ký nhiều hồ sơ, danh sách Lãnh đạo ký chỉ hiển thị người có thẩm quyền ký tất cả hồ sơ trong danh sách đã chọn. |
| Thời điểm trình ký | Datetime | Không | Thời điểm hệ thống | Control UI: Label, chỉ đọc.<br>- Ghi nhận thời điểm Cán bộ xác nhận trình ký thành công. |

##### 4.3.2.3.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình trước đó. |
| 2 | Xem dự thảo Văn bản chứng nhận (một hồ sơ) | Nút trên popup | Chỉ hiển thị khi Cán bộ trình ký một hồ sơ (thao tác Trình ký trên lưới hoặc tại màn Xem chi tiết).<br>- **TH1 (Không sinh được file PDF dự thảo)**: Hệ thống hiển thị [MSG-ERR-SYS-001]; không chuyển trạng thái hồ sơ và ghi nhận lỗi vào Audit log.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Sinh file PDF dự thảo Văn bản chứng nhận theo [Quy tắc sinh file PDF dự thảo Văn bản chứng nhận theo Mẫu số 05d](#43236-quy-tac-sinh-file-pdf-du-thao-van-ban-chung-nhan-theo-mau-so-05d).<br>+ Lưu file dự thảo vào hồ sơ.<br>+ Mở file dự thảo sang một tab trình duyệt mới để Cán bộ kiểm tra nội dung trước khi xác nhận trình ký. |
| 3 | Xem dự thảo Văn bản chứng nhận (từng hồ sơ trong danh sách) | Nút trên dòng | Chỉ hiển thị khi Cán bộ trình ký nhiều hồ sơ (thao tác Trình ký trên thanh công cụ), tại cột Thao tác trên từng dòng của Danh sách hồ sơ trình ký.<br>- **TH1 (Không sinh được file PDF dự thảo)**: Hệ thống hiển thị [MSG-ERR-SYS-001]; không chuyển trạng thái hồ sơ và ghi nhận lỗi vào Audit log.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Sinh file PDF dự thảo Văn bản chứng nhận cho hồ sơ tại dòng được chọn theo [Quy tắc sinh file PDF dự thảo Văn bản chứng nhận theo Mẫu số 05d](#43236-quy-tac-sinh-file-pdf-du-thao-van-ban-chung-nhan-theo-mau-so-05d).<br>+ Lưu file dự thảo vào hồ sơ tương ứng.<br>+ Mở file dự thảo sang một tab trình duyệt mới để Cán bộ kiểm tra nội dung trước khi xác nhận trình ký. |
| 4 | Xác nhận trình ký | Nút | - **TH1 (Chưa xem dự thảo Văn bản chứng nhận)**: Quy định Cán bộ phải xem dự thảo Văn bản chứng nhận trước khi trình ký; với trình ký nhiều hồ sơ, phải xem dự thảo của tất cả hồ sơ trong Danh sách hồ sơ trình ký. Hệ thống hiển thị [MSG-ERR-SYS-001], không chuyển trạng thái hồ sơ.<br>- **TH2 (Chưa chọn Lãnh đạo ký hoặc Lãnh đạo ký không còn hiệu lực/thẩm quyền)**: Quy định Lãnh đạo ký là bắt buộc. Hệ thống tô viền đỏ trường chọn, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô chọn, focus con trỏ và không trình ký.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Khóa phiên bản dữ liệu hồ sơ và phiên bản file PDF dự thảo được trình ký.<br>+ Ghi nhận Cán bộ trình ký, thời điểm trình ký, danh sách hồ sơ trình ký, Lãnh đạo ký đã chọn, trạng thái trước/sau.<br>+ Chuyển hồ sơ sang trạng thái "Chờ ký".<br>+ Chuyển hồ sơ vào danh sách ký duyệt của đúng Lãnh đạo ký đã chọn.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-KT-002].<br>+ Đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt](#mh01). |

---

#### 4.3.2.3.6. Quy tắc sinh file PDF dự thảo Văn bản chứng nhận theo Mẫu số 05d

##### 4.3.2.3.6.1. Nguyên tắc sinh file

- Thời điểm sinh file PDF dự thảo: khi Cán bộ bấm "Xem dự thảo Văn bản chứng nhận" tại [MH04 - Popup Trình ký Phiếu đăng ký](#mh04).
- Cán bộ phải xem dự thảo (sinh file PDF dự thảo) trước khi bấm "Xác nhận trình ký".
- Việc sinh file PDF dự thảo chưa làm thay đổi trạng thái hồ sơ. Hồ sơ chỉ chuyển sang "Chờ ký" sau khi Cán bộ xác nhận trình ký thành công tại Popup Trình ký.
- Với trình ký nhiều hồ sơ, hệ thống kiểm tra giới hạn số lượng hồ sơ trình ký/lần trước khi mở Popup Trình ký. Giới hạn lấy theo tham số cấu hình, mặc định tối đa 20 hồ sơ/lần.
- File PDF dự thảo được sinh theo đúng **Mẫu số 05d - Văn bản chứng nhận đăng ký biện pháp bảo đảm, thông báo xử lý tài sản bảo đảm** tại [Phụ lục Nghị định số 99/2022/NĐ-CP - Biểu mẫu (Tài liệu hệ thống)](../../../Tai%20lieu%20he%20thong/Bieu%20mau/phu-luc-nghi-dinh-99-2022-nd-cp.md).
- File PDF dự thảo gồm:
  + Lá mặt/trang ký theo Mẫu số 05d.
  + Phần chi tiết đăng ký/hồ sơ đính kèm phía sau trong cùng một file PDF.
- Phần chi tiết đăng ký/hồ sơ phía sau hiển thị theo cùng nguyên tắc với phụ lục chi tiết trong file kết quả cung cấp thông tin tại [Mapping dữ liệu chi tiết hồ sơ kết quả tra cứu - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#432274-mapping-du-lieu-chi-tiet-ho-so-ket-qua-tra-cuu): nằm sau lá mặt/trang ký, đánh số trang liên tục, không tách thành file riêng và được ký số cùng một file PDF khi Lãnh đạo ký.
- Nếu trình ký nhiều hồ sơ, hệ thống sinh một file PDF dự thảo riêng cho từng hồ sơ; mỗi file có mã hồ sơ, số đăng ký, dữ liệu chi tiết và vùng ký tương ứng với hồ sơ đó.
- Nếu Cán bộ bấm lại "Xem dự thảo Văn bản chứng nhận" trước khi xác nhận trình ký thành công, hệ thống sinh lại phiên bản PDF dự thảo mới theo dữ liệu hiện hành của hồ sơ; phiên bản mới nhất là phiên bản được sử dụng để trình ký.
- Khi Cán bộ xác nhận trình ký thành công, hệ thống khóa đúng phiên bản file PDF dự thảo được trình ký. Cán bộ và Lãnh đạo không được chỉnh sửa hoặc thay thế file PDF đã trình ký trong cùng phiên xử lý.
- Khi Lãnh đạo ký số thành công, chữ ký số/dấu điện tử được gắn lên cùng file PDF đã trình ký; lá mặt Mẫu số 05d và toàn bộ phần chi tiết đăng ký/hồ sơ phía sau thuộc cùng một tài liệu được ký.

##### 4.3.2.3.6.2. Mapping dữ liệu lá mặt/trang ký Mẫu số 05d

| STT | Thành phần trên lá mặt/trang ký | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Mẫu số 05d | Cấu hình biểu mẫu | Hiển thị cố định ở góc trên bên phải: "Mẫu số 05d". |
| 2 | Mã hồ sơ TTHC | Hồ sơ Phiếu đăng ký/hệ thống một cửa nếu có tích hợp | Hiển thị mã hồ sơ thủ tục hành chính tương ứng với Phiếu đăng ký. Nếu hồ sơ chưa có mã hồ sơ TTHC từ hệ thống một cửa, hiển thị theo mã hồ sơ nội bộ hoặc mã định danh hồ sơ được cấu hình dùng cho tra cứu TTHC. |
| 3 | Tên cơ quan đăng ký bên trái | Cấu hình đơn vị xử lý hồ sơ | Hiển thị tên cơ quan cấp trên và tên Trung tâm đăng ký xử lý hồ sơ theo đúng mẫu, ví dụ: "CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC" và "TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI". |
| 4 | Quốc hiệu, tiêu ngữ | Cấu hình biểu mẫu | Hiển thị cố định: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" và "Độc lập - Tự do - Hạnh phúc". |
| 5 | Địa danh, ngày tháng năm lập văn bản | Cấu hình đơn vị xử lý hồ sơ và thời điểm sinh PDF dự thảo | Địa danh lấy theo đơn vị xử lý hồ sơ. Ngày tháng năm lấy theo ngày hệ thống sinh file PDF dự thảo tại thao tác "Trình ký". Định dạng theo mẫu: "[Địa danh], ngày [dd] tháng [mm] năm [yyyy]". |
| 6 | Tên văn bản | Loại hồ sơ/Loại hình giao dịch | Hiển thị in hoa, in đậm. Tiêu đề động theo loại hồ sơ:<br>+ Nếu Loại hình giao dịch là "Biện pháp bảo đảm": "VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM".<br>+ Nếu Loại hình giao dịch là "Hợp đồng": "VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM, HỢP ĐỒNG".<br>+ Nếu hồ sơ là Thông báo xử lý tài sản bảo đảm: "VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM". |
| 7 | Tên Trung tâm chứng nhận | Đơn vị xử lý hồ sơ | Hiển thị tên Trung tâm đăng ký giao dịch, tài sản xử lý hồ sơ, in hoa, in đậm theo mẫu, kết thúc bằng từ "CHỨNG NHẬN". |
| 8 | Mục 1 - Nội dung chứng nhận | Dữ liệu Phiếu đăng ký, số đăng ký và thời điểm có hiệu lực đăng ký | Hiển thị đoạn văn theo mẫu: "1. Nội dung đăng ký của phiếu yêu cầu đăng ký số [Số đăng ký] đã được cập nhật vào Cơ sở dữ liệu về biện pháp bảo đảm; có hiệu lực đăng ký từ thời điểm [HH giờ mm phút, ngày dd tháng mm năm yyyy] và được Trung tâm Đăng ký giao dịch, tài sản gửi kèm theo Văn bản chứng nhận.". |
| 9 | Số đăng ký | Kết quả xử lý đăng ký | Mapping vào đoạn Mục 1 và phần chi tiết phía sau. Với hồ sơ đăng ký thay đổi/xóa đăng ký/thông báo xử lý tài sản, hiển thị số đăng ký/hồ sơ liên quan theo dữ liệu kết quả xử lý. |
| 10 | Thời điểm có hiệu lực đăng ký | Kết quả xử lý đăng ký | Mapping vào đoạn Mục 1. Định dạng theo mẫu: "[HH] giờ [mm] phút, ngày [dd] tháng [mm] năm [yyyy]". |
| 11 | Bên nhận bảo đảm / Bên nhận theo hợp đồng | Dữ liệu Bên nhận bảo đảm hoặc bên tương ứng theo Loại hình giao dịch | Tiêu đề dòng động theo Loại biện pháp/Hợp đồng. Cách xác định tiêu đề mapping theo đúng mô tả tại trường [IV. Bên nhận bảo đảm (Tiêu đề động) - Màn hình Nhập liệu Đăng ký mới BPBĐ - Đăng ký mới Biện pháp bảo đảm, Hợp đồng (Website Khách hàng)](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd). Hiển thị tên cá nhân/tổ chức đại diện theo dữ liệu hồ sơ. |
| 12 | Địa chỉ của Bên nhận bảo đảm / Bên nhận theo hợp đồng | Dữ liệu Bên nhận bảo đảm hoặc bên tương ứng theo Loại hình giao dịch | Hiển thị ngay dưới dòng Bên nhận bảo đảm/Bên nhận theo hợp đồng. Địa chỉ gộp theo định dạng: "[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], [Quốc gia]". |
| 13 | Bên bảo đảm / Bên theo nghĩa vụ | Dữ liệu Bên bảo đảm hoặc bên tương ứng theo Loại hình giao dịch | Tiêu đề dòng động theo Loại biện pháp/Hợp đồng. Cách xác định tiêu đề mapping theo đúng mô tả tại trường [III. Bên bảo đảm (Tiêu đề động) - Màn hình Nhập liệu Đăng ký mới BPBĐ - Đăng ký mới Biện pháp bảo đảm, Hợp đồng (Website Khách hàng)](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd). Hiển thị tên cá nhân/tổ chức đại diện theo dữ liệu hồ sơ. |
| 14 | Giấy tờ chứng minh tư cách pháp lý của Bên bảo đảm / Bên theo nghĩa vụ | Dữ liệu định danh của Bên bảo đảm hoặc bên tương ứng | Hiển thị đúng loại định danh và số định danh theo dữ liệu hồ sơ. Không hiển thị nhãn trung gian "Loại giấy tờ/Loại mã định danh". |
| 15 | Mã PIN | Mã PIN phát sinh sau khi đăng ký thành công | Hiển thị Mã PIN nếu hồ sơ được cấp Mã PIN. Giữ nguyên ghi chú theo mẫu: "(Người yêu cầu đăng ký hoàn toàn chịu trách nhiệm về việc bảo mật thông tin liên quan đến mã PIN do cơ quan đăng ký cấp)". |
| 16 | Mục 2 - Dòng kèm theo Văn bản chứng nhận | Cấu hình biểu mẫu và Nguồn tiếp nhận hồ sơ | Hiển thị theo mẫu 05d. Nếu Nguồn tiếp nhận là "Cán bộ nhập liệu"/hồ sơ giấy, ghi "Phiếu yêu cầu đăng ký kèm theo Văn bản chứng nhận này là một phần không thể tách rời của Văn bản chứng nhận.". Nếu Nguồn tiếp nhận là "Khách hàng"/trực tuyến, ghi "Chi tiết thông tin thể hiện trên giao diện đăng ký trực tuyến kèm theo Văn bản chứng nhận này là một phần không thể tách rời của Văn bản chứng nhận.". |
| 17 | Khối người có thẩm quyền | Lãnh đạo ký do Cán bộ chọn tại Popup Trình ký | Hiển thị tiêu đề "NGƯỜI CÓ THẨM QUYỀN CỦA TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN" hoặc chức danh được cấu hình theo đơn vị, ví dụ "GIÁM ĐỐC"; bên dưới hiển thị dòng hướng dẫn "(Ký, ghi rõ họ và tên, chức danh, đóng dấu)". File dự thảo chưa hiển thị chữ ký số/chữ ký ảnh chính thức. |
| 18 | QR code nếu hệ thống cấu hình hiển thị | Hệ thống quản lý văn bản/file PDF | QR được sinh khi hệ thống sinh file PDF dự thảo. Dữ liệu QR là URL tra cứu/xác thực văn bản điện tử do hệ thống cấu hình, gắn tối thiểu các tham số: mã hồ sơ, mã file, phiên bản file, mã kiểm tra bảo mật hoặc checksum/hash của file. Với file dự thảo, URL trả về trạng thái "Dự thảo/Chưa ký" hoặc chỉ cho phép kiểm tra metadata theo cấu hình. Sau khi Lãnh đạo ký số thành công, hệ thống cập nhật bản ghi xác thực để khi quét QR trả về trang xác thực văn bản đã ký, gồm: mã hồ sơ, số đăng ký, cơ quan ký, người ký, thời điểm ký, trạng thái chữ ký, hash file đã ký và đường dẫn xem/tải file PDF đã ký nếu người quét có quyền. |
| 19 | Vùng chữ ký số, dấu điện tử | Dịch vụ ký số và thông tin chứng thư số của Lãnh đạo | Trên file dự thảo, vùng ký là vùng chờ ký. Sau khi Lãnh đạo ký số, hệ thống gắn chữ ký số/dấu điện tử trên chính vùng ký của lá mặt/trang ký, đồng thời lưu metadata người ký, chứng thư số, thời điểm ký và phiên bản file đã ký. |

##### 4.3.2.3.6.3. Mapping dữ liệu phần chi tiết đăng ký/hồ sơ đính kèm

| STT | Thành phần trên file PDF | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Tiêu đề phần chi tiết | Cấu hình biểu mẫu và dữ liệu hồ sơ | Hiển thị tiêu đề động theo loại hồ sơ, ví dụ:<br>+ "CHI TIẾT ĐĂNG KÝ"<br>+ "CHI TIẾT ĐĂNG KÝ THAY ĐỔI"<br>+ "CHI TIẾT XÓA ĐĂNG KÝ"<br>+ "CHI TIẾT THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM"<br>+ "CHI TIẾT THAY ĐỔI THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM"<br>+ "CHI TIẾT XÓA THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM" |
| 2 | Thông tin định danh hồ sơ | Hồ sơ Phiếu đăng ký và kết quả xử lý | Hiển thị các thông tin nhận diện chính của hồ sơ ở đầu phần chi tiết, tối thiểu gồm: Số đăng ký lần đầu/Số đăng ký liên quan, Thời điểm đăng ký, Loại hình giao dịch, Loại đăng ký và các thông tin hồ sơ gốc/hồ sơ liên quan nếu có. |
| 3 | Khối chi tiết đăng ký/hồ sơ | Dữ liệu Review nghiệp vụ tương ứng | Hiển thị thông tin chi tiết đăng ký/hồ sơ trong file PDF. Tham chiếu **III. KHUNG ĐỐI CHIẾU DỮ LIỆU CHI TIẾT** tại [Phiếu đăng ký - Xem chi tiết - Quản lý yêu cầu đã đăng ký - Phiếu đăng ký (Website Khách hàng)](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41123-phieu-dang-ky---xem-chi-tiet) và [Mapping dữ liệu chi tiết hồ sơ kết quả tra cứu - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#432274-mapping-du-lieu-chi-tiet-ho-so-ket-qua-tra-cuu). |
| 4 | Tiêu đề động của các khối bên liên quan | Loại hình giao dịch, Loại biện pháp/Hợp đồng | Tiêu đề khối Bên bảo đảm/Bên theo nghĩa vụ và Bên nhận bảo đảm/Bên nhận theo hợp đồng mapping theo đúng mô tả tại các trường III. Bên bảo đảm (Tiêu đề động) và IV. Bên nhận bảo đảm (Tiêu đề động) của [Màn hình Nhập liệu Đăng ký mới BPBĐ - Đăng ký mới Biện pháp bảo đảm, Hợp đồng (Website Khách hàng)](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd). Với thông báo xử lý tài sản, tiêu đề khối xử lý tài sản hiển thị theo từng nhóm Loại tài sản được xử lý. |
| 5 | Khối Tài sản bảo đảm / Tài sản xử lý | Dữ liệu tài sản của hồ sơ và danh mục [DM_07] | Hiển thị theo từng Loại tài sản, mỗi Loại tài sản là một khối riêng; dữ liệu thuộc loại nào nằm ngay dưới tiêu đề loại đó. Không gom toàn bộ tài sản thành một bảng chung. Bảng thông tin Số khung, Bảng thông tin Phương tiện và các trường mô tả theo từng loại tài sản phải dùng đúng cấu trúc/cột đã mô tả tại màn Phiếu đăng ký - Xem chi tiết của Website Khách hàng và các màn Review được màn này tham chiếu. |
| 6 | Dấu phân tách giữa các hồ sơ / phiên bản | Trình sinh PDF | Khi file cần hiển thị nhiều hồ sơ/phiên bản liên quan, hết mỗi hồ sơ/phiên bản phải có dấu phân tách rõ ràng trước khi hiển thị hồ sơ/phiên bản tiếp theo, giống nguyên tắc hiển thị phần chi tiết hồ sơ trong kết quả cung cấp thông tin. |
| 7 | Liên kết với lá mặt / trang ký | File PDF Văn bản chứng nhận | Phần chi tiết đăng ký/hồ sơ nằm sau lá mặt/trang ký trong cùng một file PDF; không tách thành file riêng. Đánh số trang liên tục cho toàn bộ file PDF. |

---

#### 4.3.2.3.7. Quy tắc sinh file PDF dự thảo Thông báo từ chối

##### 4.3.2.3.7.1. Nguyên tắc sinh file

- Thời điểm sinh file PDF dự thảo: khi Cán bộ bấm "Xem dự thảo từ chối" tại [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) và đã nhập Lý do từ chối tiếp nhận hợp lệ.
- Văn bản được sinh: Thông báo về việc từ chối tiếp nhận, từ chối giải quyết hồ sơ đăng ký biện pháp bảo đảm. Biểu mẫu cụ thể được cấu hình theo mẫu chính thức do cơ quan có thẩm quyền ban hành.
- Việc sinh file PDF dự thảo chưa làm thay đổi trạng thái hồ sơ. Hồ sơ chỉ chuyển sang "Chờ ký" sau khi Cán bộ bấm "Xác nhận" thành công tại Popup Từ chối.
- File dự thảo chưa có chữ ký số, chưa có ngày ban hành; vùng ký là vùng chờ ký.
- Với từ chối nhiều hồ sơ, hệ thống sinh một file PDF dự thảo riêng cho từng hồ sơ; mỗi file có Số đăng ký, dữ liệu và vùng ký tương ứng với hồ sơ đó. Lý do từ chối dùng chung cho toàn bộ hồ sơ trong danh sách.
- Tên file: `ThongBaoTuChoi_[SoDangKy].pdf`.
- Nếu Cán bộ sửa Lý do từ chối tiếp nhận và bấm lại "Xem dự thảo từ chối", hệ thống sinh lại phiên bản PDF dự thảo mới; phiên bản mới nhất là phiên bản được sử dụng khi Cán bộ bấm "Xác nhận".
- Khi Cán bộ bấm "Xác nhận" thành công, hệ thống khóa đúng phiên bản file PDF dự thảo; Cán bộ và Lãnh đạo không được chỉnh sửa hoặc thay thế file đã gửi ký.
- Khi Lãnh đạo ký số thành công, chữ ký số/dấu điện tử được gắn lên cùng file PDF dự thảo đã khóa; hồ sơ chuyển sang "Bị từ chối".

##### 4.3.2.3.7.2. Mapping dữ liệu Thông báo từ chối

| STT | Thành phần trên file PDF | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Tên cơ quan đăng ký bên trái | Cấu hình đơn vị xử lý hồ sơ | Hiển thị tên cơ quan cấp trên và tên Trung tâm đăng ký giao dịch, tài sản xử lý hồ sơ, ví dụ: "CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC" và "TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI". |
| 2 | Quốc hiệu, tiêu ngữ | Cấu hình biểu mẫu | Hiển thị cố định: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" và "Độc lập - Tự do - Hạnh phúc". |
| 3 | Số thông báo | Hệ thống tự sinh khi sinh file PDF dự thảo | Định dạng hành chính: `[STT]/TBTC-[Tên viết tắt Trung tâm]`, ví dụ `15/TBTC-TTĐK1`. |
| 4 | Địa danh, ngày tháng năm ban hành | Cấu hình đơn vị xử lý hồ sơ và thời điểm Lãnh đạo ký số | Địa danh lấy theo đơn vị xử lý hồ sơ. Trên file dự thảo để trống ngày tháng năm; khi Lãnh đạo ký số thành công, hệ thống điền theo ngày ký. Định dạng: "[Địa danh], ngày [dd] tháng [mm] năm [yyyy]". |
| 5 | Tên văn bản | Cấu hình biểu mẫu | Hiển thị cố định, in hoa, in đậm: "THÔNG BÁO VỀ VIỆC TỪ CHỐI TIẾP NHẬN, TỪ CHỐI GIẢI QUYẾT HỒ SƠ ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM". |
| 6 | Kính gửi | Thông tin người nộp hồ sơ | Hiển thị "Kính gửi: [Họ và tên/Tên tổ chức người nộp hồ sơ]". |
| 7 | Địa chỉ người nộp hồ sơ | Thông tin người nộp hồ sơ | Địa chỉ gộp theo định dạng: "[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], [Quốc gia]". Cá nhân lấy theo thông tin cá nhân; cá nhân thuộc tổ chức lấy theo thông tin tổ chức. |
| 8 | Số đăng ký | Hồ sơ Phiếu đăng ký bị từ chối | Số đăng ký của hồ sơ bị từ chối. |
| 9 | Loại đăng ký | Hồ sơ Phiếu đăng ký bị từ chối | Hiển thị tên Loại hình đăng ký của hồ sơ (ví dụ: Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản bảo đảm). |
| 10 | Thời điểm tiếp nhận | Hồ sơ Phiếu đăng ký bị từ chối | Ngày giờ hệ thống tiếp nhận hồ sơ thành công. Định dạng: `dd/MM/yyyy HH:mm`. |
| 11 | Bên bảo đảm | Dữ liệu Bên bảo đảm của hồ sơ | Hiển thị tên chủ thể; nối bằng dấu phẩy nếu có nhiều Bên bảo đảm. |
| 12 | Bên nhận bảo đảm | Dữ liệu Bên nhận bảo đảm của hồ sơ | Hiển thị tên chủ thể; nối bằng dấu phẩy nếu có nhiều Bên nhận bảo đảm. |
| 13 | Lý do từ chối | Trường "Lý do từ chối tiếp nhận" tại [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) | Hiển thị nguyên văn nội dung Cán bộ đã nhập. |
| 14 | Khối người có thẩm quyền | Lãnh đạo ký văn bản từ chối do Cán bộ chọn tại Popup Từ chối | Hiển thị chức danh được cấu hình theo đơn vị, ví dụ "GIÁM ĐỐC"; bên dưới hiển thị dòng hướng dẫn "(Ký, ghi rõ họ và tên, chức danh, đóng dấu)". File dự thảo chưa hiển thị chữ ký số. |
| 15 | Vùng chữ ký số, dấu điện tử | Dịch vụ ký số và thông tin chứng thư số của Lãnh đạo | Trên file dự thảo, vùng ký là vùng chờ ký. Sau khi Lãnh đạo ký số, hệ thống gắn chữ ký số/dấu điện tử trên vùng ký, đồng thời lưu thông tin người ký, chứng thư số, thời điểm ký và phiên bản file đã ký. |
