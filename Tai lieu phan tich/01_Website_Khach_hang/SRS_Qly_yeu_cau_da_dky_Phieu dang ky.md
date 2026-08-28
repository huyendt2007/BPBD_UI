### 4.1.12. Quản lý yêu cầu đã đăng ký - Phiếu đăng ký dành cho Khách hàng

#### 4.1.12.1. Mục đích

- Cho phép Khách hàng quản lý, tra cứu và xử lý các Phiếu đăng ký BPBĐ/hợp đồng/thông báo xử lý tài sản bảo đảm đã đăng ký trên Website Khách hàng.
- Tài liệu này chỉ mô tả nhóm Phiếu đăng ký, gồm:<br>+ Danh sách Phiếu đăng ký.<br>+ Xem chi tiết Phiếu đăng ký.<br>+ Các thao tác nghiệp vụ phát sinh từ Phiếu đăng ký.
- Không mô tả Yêu cầu cung cấp bản sao và Yêu cầu cung cấp thông tin trong tài liệu này.

*a. Phân quyền*

- Khách hàng cá nhân đã đăng nhập.
- Khách hàng tổ chức/tài khoản phụ trực thuộc tổ chức đã đăng nhập và có quyền thực hiện chức năng.

*b. Điều kiện thực hiện*

- NSD đã đăng nhập thành công.
- Phiếu đăng ký thuộc phạm vi tài khoản đang đăng nhập hoặc tài khoản được phân quyền.
- Hệ thống hoạt động bình thường.

---

#### 4.1.12.2. MH01 - Màn hình Danh sách Phiếu đăng ký

##### 4.1.12.2.1. Giao diện

- Chức năng hiển thị trên Sidebar Website Khách hàng với tên `Quản lý yêu cầu đã đăng ký`.
- Màn hình mặc định hiển thị danh sách Phiếu đăng ký.
- Bộ lọc và vùng kết quả chỉ áp dụng cho nhóm Phiếu đăng ký.
- Hệ thống giữ trạng thái lọc/trang hiện tại của danh sách Phiếu đăng ký trong phiên làm việc.

##### 4.1.12.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| Danh sách Phiếu đăng ký | Tree Grid | Có | Hiển thị | Hiển thị danh sách Phiếu đăng ký BPBĐ/hợp đồng/thông báo xử lý tài sản bảo đảm. Chi tiết tại mục 4.1.12.3. |

##### 4.1.12.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Ghi nhớ trạng thái danh sách | Tự động | Hệ thống ghi nhớ bộ lọc, trang hiện tại, thứ tự sắp xếp của danh sách Phiếu đăng ký trong phiên làm việc. |
| 2 | Row Click | Thao tác dòng | Mở màn hình xem chi tiết Phiếu đăng ký tương ứng với dòng dữ liệu được chọn. |

---

#### 4.1.12.3. Danh sách Phiếu đăng ký

##### 4.1.12.3.1. Giao diện

- Màn hình hiển thị danh sách các Phiếu đăng ký dưới dạng Tree Grid.
- Dòng cha là hồ sơ/phiên bản gốc của nhóm Phiếu đăng ký.
- Dòng con là các phiên bản/hồ sơ liên quan phát sinh sau đó, gồm:
  - Đăng ký thay đổi.
  - Xóa đăng ký.
  - Thông báo xử lý tài sản bảo đảm lần đầu.
  - Thay đổi thông báo xử lý tài sản bảo đảm.
  - Xóa đăng ký thông báo xử lý tài sản bảo đảm.
- `Yêu cầu cung cấp bản sao` và `Yêu cầu cung cấp thông tin` không hiển thị trong Tree Grid của Phiếu đăng ký.

##### 4.1.12.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| **I. Vùng tìm kiếm/lọc** | - | - | - | Bộ lọc áp dụng cho danh sách Phiếu đăng ký. |
| Số đăng ký | String(50) | Không | Trống | Tìm kiếm theo số đăng ký gốc hoặc số đăng ký của phiên bản liên quan. |
| Tên bên bảo đảm | String(255) | Không | Trống | Tìm kiếm gần đúng theo tên Bên bảo đảm. |
| Người tạo | String(255) | Không | Trống | Tìm kiếm gần đúng theo tên người đang đăng nhập đã tạo hồ sơ/phiên bản. |
| Từ ngày | Date | Không | Trống | Lọc theo `Thời điểm đăng ký`. |
| Đến ngày | Date | Không | Trống | Lọc theo `Thời điểm đăng ký`. Nếu nhập cùng `Từ ngày`, áp dụng [BR-VAL-007]. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Gồm:<br>+ Tất cả<br>+ Lưu nháp<br>+ Chờ thanh toán<br>+ Chờ duyệt<br>+ Chờ ký<br>+ Hoàn thành<br>+ Bị từ chối<br>+ Sai lệch thanh toán |
| Loại đăng ký | Enum(String(100)) | Không | Tất cả | Control UI: Combobox.<br>- Lọc theo loại đăng ký của Phiếu đăng ký.<br>- Tham chiếu Danh mục Loại trường hợp đăng ký [DM_01]. |
| Loại hình giao dịch | Enum(String(100)) | Không | Tất cả | Gồm:<br>+ Tất cả<br>+ Biện pháp bảo đảm<br>+ Hợp đồng<br>+ Thông báo xử lý tài sản bảo đảm |
| Loại Biện pháp/Loại HĐ | Enum(String(100)) | Không | Tất cả | Control UI: Combobox.<br>- Giá trị phụ thuộc theo trường `Loại hình giao dịch`.<br>- Khi `Loại hình giao dịch` = `Biện pháp bảo đảm`: Tham chiếu Danh mục Loại biện pháp bảo đảm [DM_04].<br>- Khi `Loại hình giao dịch` = `Hợp đồng`: Tham chiếu Danh mục Loại hợp đồng [DM_05].<br>- Không hiển thị nếu `Loại hình giao dịch` = `Thông báo xử lý tài sản bảo đảm`. |
| Loại tài sản | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại tài sản bảo đảm [DM_07].<br>- Nếu chọn một loại tài sản cụ thể, hệ thống hiển thị thêm các trường lọc đặc thù của loại tài sản đó. |
| **Khối lọc động theo Loại tài sản** | - | Không | Ẩn | Chỉ hiển thị khi NSD chọn một giá trị cụ thể tại trường `Loại tài sản`. Các trường trong khối lọc động phải tương ứng với cấu trúc thông tin tài sản tại màn Đăng ký mới BPBĐ. |
| Tên phương tiện | Enum(String(255)) | Không | Trống | Control UI: Combobox.<br>- Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`.<br>- Tham chiếu Danh mục Tên phương tiện giao thông [DM_41]. |
| Số khung | String(50) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`. |
| Số máy | String(50) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`. |
| Biển số | String(50) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`. |
| Tên phương tiện, nhãn hiệu | String(255) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Tên/Họ tên chủ phương tiện/Chủ sở hữu | String(255) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Số đăng ký phương tiện | String(50) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Cơ quan cấp giấy chứng nhận | String(255) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Cấp phương tiện | String(100) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt`. |
| Tên quyền | String(255) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản`. |
| Căn cứ phát sinh quyền | Text(2000) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản`. |
| Hàng hóa luân chuyển / Kho hàng | Enum(String(50)) | Không | Tất cả | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ`. Gồm:<br>+ Tất cả<br>+ Hàng hóa luân chuyển<br>+ Kho hàng |
| Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ`. |
| Địa chỉ kho hàng | String(500) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ` và `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ` và `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Thời điểm đăng ký tại VSDC | Datetime/String(16) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung`.<br>- Control UI: Ô nhập/chọn thời điểm dạng `HH:mm dd/MM/yyyy`.<br>- Hệ thống sử dụng giá trị gộp này để tìm kiếm theo dữ liệu gốc gồm Giờ, Phút, Ngày, Tháng, Năm. |
| Mô tả | Text(1000) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` là một trong các giá trị có trường Mô tả tại màn Đăng ký mới BPBĐ, gồm:<br>+ `Cây hằng năm, công trình tạm`<br>+ `Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)` |
| **II. Vùng kết quả hiển thị** | - | - | 10 hồ sơ gốc/trang | Control UI: Tree Grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải danh sách các hồ sơ gốc thuộc quyền tài khoản đang đăng nhập.<br>- Bộ lọc tìm kiếm mặc định ở trạng thái trống, các combobox ở giá trị `Tất cả`.<br>- Sắp xếp mặc định theo `Thời điểm đăng ký` giảm dần của hồ sơ gốc.<br>- Mặc định hiển thị 10 hồ sơ gốc/trang, kèm các dòng con thụt lề bên dưới từng hồ sơ gốc.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer | - | - | Chỉ hiển thị STT ở dòng cha. |
| Số đăng ký | String(50) | - | - | Dòng cha hiển thị số đăng ký gốc; dòng con hiển thị số đăng ký của phiên bản/hồ sơ liên quan. |
| Số PIN | String(20) | - | - | Mã PIN chỉ được hệ thống cấp một lần duy nhất tại thời điểm Đăng ký mới (UC024). Do đó, cột này CHỈ hiển thị giá trị Số PIN đối với dòng có `Loại đăng ký` = "Đăng ký lần đầu" (hồ sơ gốc); các dòng con thuộc loại khác (Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản bảo đảm - lần đầu/thay đổi/xóa, Yêu cầu cung cấp bản sao, Yêu cầu cung cấp thông tin,...) không phát sinh PIN mới nên hiển thị trống/"-". |
| Loại đăng ký | String(100) | - | - | Hiển thị trường hợp đăng ký của dòng dữ liệu. |
| Tên bên bảo đảm | String(255) | - | - | Hiển thị tên Bên bảo đảm của phiên bản tương ứng. |
| Tên bên nhận bảo đảm | String(255) | - | - | Hiển thị tên Bên nhận bảo đảm của phiên bản tương ứng. |
| Loại hình GD | String(100) | - | - | Hiển thị loại hình giao dịch. |
| Loại BP/HĐ | String(100) | - | - | Hiển thị loại Biện pháp bảo đảm hoặc loại Hợp đồng. |
| Loại tài sản | String(2000) | - | - | Mỗi loại tài sản hiển thị trên một dòng riêng. Nếu quá dài, hiển thị rút gọn và tooltip. |
| Cột mở rộng theo Loại tài sản | - | - | Ẩn | Chỉ hiển thị khi NSD chọn một loại tài sản cụ thể tại bộ lọc `Loại tài sản`. Các cột mở rộng trên lưới kết quả phải hiển thị đúng các trường đang hiển thị tại **Khối lọc động theo Loại tài sản**. |
| Cột động: Tên phương tiện | String(255) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Số khung | String(50) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Số máy | String(50) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Biển số | String(50) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản phương tiện giao thông cơ giới đường bộ có số khung. |
| Cột động: Tên phương tiện, nhãn hiệu | String(255) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Tên/Họ tên chủ phương tiện/Chủ sở hữu | String(255) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Số đăng ký phương tiện | String(50) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Cơ quan cấp giấy chứng nhận | String(255) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Cấp phương tiện | String(100) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản tàu cá/phương tiện giao thông đường thủy nội địa/đường sắt. |
| Cột động: Tên quyền | String(255) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản quyền tài sản hoặc một phần quyền tài sản. |
| Cột động: Căn cứ phát sinh quyền | Text(2000) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản quyền tài sản hoặc một phần quyền tài sản. |
| Cột động: Hàng hóa luân chuyển / Kho hàng | String(50) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng. |
| Cột động: Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng. |
| Cột động: Địa chỉ kho hàng | String(500) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng và dữ liệu là Kho hàng. |
| Cột động: Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản hàng hóa luân chuyển/kho hàng và dữ liệu là Kho hàng. |
| Cột động: Thời điểm đăng ký tại VSDC | Datetime/String(16) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung. Giá trị hiển thị dạng `HH:mm dd/MM/yyyy`. |
| Cột động: Mô tả | Text(1000) | - | Theo hồ sơ | Hiển thị khi bộ lọc đang chọn loại tài sản có trường `Mô tả`. |
| Thời điểm đăng ký | Datetime | - | - | Định dạng `dd/mm/yyyy HH:mm`. |
| Thời điểm có hiệu lực | Datetime | - | Theo hồ sơ | Định dạng `dd/mm/yyyy HH:mm`. Hiển thị thời điểm hồ sơ/phiên bản phát sinh hiệu lực pháp lý; nếu chưa có hiệu lực, hiển thị `"—"`. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | - | Theo hồ sơ | Tiêu đề cột ghi rõ đơn vị tính `(VNĐ)`, dữ liệu từng dòng chỉ hiển thị số đã phân tách hàng nghìn, không lặp lại hậu tố `VNĐ`. Hiển thị tổng số tiền Khách hàng đã thanh toán thành công cho hồ sơ/phiên bản; nếu chưa thanh toán hoặc không phát sinh phí, hiển thị `"—"`. |
| Trạng thái | String(50) | - | - | Hiển thị trạng thái của hồ sơ/phiên bản. |
| Người tạo | String(255) | - | Theo hồ sơ | Hiển thị tên người đang đăng nhập đã tạo hồ sơ/phiên bản; không hiển thị account/email đăng nhập. |
| Thao tác | Text(1000) | Không | Theo trạng thái hồ sơ | Control UI: Fixed-slot Action Column.<br>- Hiển thị động các icon/nút thao tác theo trạng thái hồ sơ, loại hồ sơ và vị trí của hồ sơ/phiên bản trong cây hồ sơ liên quan.<br>- `Cập nhật`: Chỉ hiển thị khi hồ sơ ở trạng thái `Lưu nháp`.<br>- `Thanh toán`: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`.<br>- `Xóa`: Chỉ hiển thị khi hồ sơ ở trạng thái `Lưu nháp` và chỉ thực hiện sau khi NSD xác nhận tại popup xác nhận xóa.<br>- Hồ sơ ở trạng thái `Bị từ chối` tuyệt đối không được xóa vì đã được lưu vết chính thức trong CSDL hệ thống.<br>- `Thao tác khác`: Hiển thị dạng Dropdown khi hồ sơ/phiên bản đang chọn ở trạng thái `Hoàn thành` và có ít nhất một thao tác nghiệp vụ tiếp theo phù hợp.<br>- Nếu không có thao tác nghiệp vụ tiếp theo phù hợp, icon/nút `Thao tác khác` hiển thị ở trạng thái khóa mờ (Disabled).<br>- Các thao tác trong Dropdown `Thao tác khác` được xác định động theo loại hồ sơ, vị trí của hồ sơ trong cây hồ sơ liên quan và trạng thái các hồ sơ liên quan:<br>+ `Đăng ký thay đổi`: Hiển thị khi hồ sơ đang chọn là hồ sơ gốc `Đăng ký lần đầu`, trạng thái `Hoàn thành`, và không tồn tại hồ sơ `Đăng ký thay đổi` liên quan đang trong trạng thái xử lý.<br>+ `Thông báo xử lý tài sản`: Hiển thị khi hồ sơ đang chọn là hồ sơ gốc `Đăng ký lần đầu`, trạng thái `Hoàn thành`, chưa có thông báo xử lý tài sản liên quan và không có hồ sơ xóa đăng ký/hồ sơ liên quan đang chặn thao tác.<br>+ `Xóa đăng ký`: Hiển thị khi hồ sơ đang chọn là hồ sơ gốc `Đăng ký lần đầu`, trạng thái `Hoàn thành`, và chưa có hồ sơ `Xóa đăng ký` liên quan.<br>+ `Thay đổi thông báo`: Hiển thị khi hồ sơ đang chọn là `Thông báo xử lý tài sản bảo đảm lần đầu`, trạng thái `Hoàn thành`, và không tồn tại hồ sơ `Thay đổi thông báo` liên quan đang trong trạng thái xử lý.<br>+ `Xóa thông báo`: Hiển thị khi hồ sơ đang chọn là `Thông báo xử lý tài sản bảo đảm lần đầu`, trạng thái `Hoàn thành`, và không tồn tại hồ sơ `Xóa đăng ký thông báo xử lý tài sản bảo đảm` liên quan.<br>+ `Yêu cầu cung cấp thông tin`: Hiển thị khi hồ sơ đang chọn ở trạng thái `Hoàn thành`.<br>+ `Yêu cầu cung cấp bản sao`: Hiển thị khi hồ sơ đang chọn ở trạng thái `Hoàn thành`.<br>- Không bố trí nút `Xem` riêng trên từng dòng; xem chi tiết thực hiện bằng Row-Click trên dòng dữ liệu. |

##### 4.1.12.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Tìm kiếm | Button | Khi NSD click nút `Tìm kiếm`, hệ thống thực hiện kiểm tra điều kiện và lọc tìm danh sách các bản ghi thỏa mãn đồng thời các tiêu chí đã nhập/chọn. |
| | | | **TH1 - Điều kiện ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị thông báo lỗi theo MessageList dùng chung. Không thực hiện tìm kiếm. |
| | | | **TH Hợp lệ**: Hệ thống tải danh sách Phiếu đăng ký thỏa mãn đồng thời các điều kiện tìm kiếm, sắp xếp theo `Thời điểm đăng ký` giảm dần và hiển thị 10 hồ sơ gốc/trang. |
| | | | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 yêu cầu"* và các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled); nút `Kết xuất Excel` nếu có được khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Button | Đưa toàn bộ bộ lọc về mặc định: các ô nhập về trống, các combobox về `Tất cả`; tải lại danh sách hồ sơ gốc thuộc quyền tài khoản đang đăng nhập theo thứ tự mặc định. |
| 3 | Xem chi tiết hồ sơ | Row Click | Không bố trí nút/button `Xem` riêng biệt trên từng dòng. Khi NSD click trực tiếp vào một dòng dữ liệu trên Tree Grid, hệ thống mở màn hình **MH02 - Phiếu đăng ký - Xem chi tiết** và chọn mặc định đúng phiên bản tương ứng với dòng được click. |
| 4 | Thanh toán | Button/Icon | Khi NSD click nút `Thanh toán`, hệ thống chuyển sang luồng thanh toán trực tuyến theo UC158. |
| 5 | Cập nhật | Button/Icon | Khi NSD click nút `Cập nhật`, hệ thống chuyển sang màn hình cập nhật của nghiệp vụ tương ứng. |
| 6 | Xóa | Button/Icon | Khi NSD click nút `Xóa`, hệ thống hiển thị popup xác nhận trước khi thực hiện xóa hồ sơ. |
| | | | **TH1 - NSD hủy xác nhận xóa**: Hệ thống đóng popup xác nhận và giữ nguyên hồ sơ. |
| | | | **TH Hợp lệ**: Sau khi NSD xác nhận, hệ thống xóa hồ sơ `Lưu nháp`, ghi Audit Log và tải lại danh sách. |
| 7 | Thao tác khác | Dropdown | Khi NSD click chọn một thao tác trong Dropdown, hệ thống kiểm tra điều kiện nghiệp vụ của hồ sơ/phiên bản đang chọn và điều hướng sang màn hình nghiệp vụ tương ứng. |
| | | | **TH Đăng ký thay đổi**: Hệ thống chuyển sang màn hình **Đăng ký thay đổi biện pháp bảo đảm** (UC025), kế thừa toàn bộ thông tin hồ sơ gốc gồm `Số đăng ký`, `Số PIN`, thông tin bên bảo đảm, bên nhận bảo đảm, tài sản bảo đảm và các thông tin liên quan; hệ thống đưa NSD tới bước nhập nội dung thay đổi mà không yêu cầu nhập lại số đăng ký/số PIN. |
| | | | **TH Thông báo xử lý tài sản**: Hệ thống chuyển sang màn hình **Thông báo xử lý tài sản bảo đảm lần đầu** (UC131), kế thừa toàn bộ thông tin hồ sơ gốc gồm `Số đăng ký`, `Số PIN`, thông tin bên bảo đảm, bên nhận bảo đảm, tài sản bảo đảm và các thông tin liên quan; hệ thống mặc định `Nguồn tài sản thông báo xử lý` là `Từ hồ sơ BPBĐ đã đăng ký` và đưa NSD tới màn nhập liệu tương ứng để khai báo thông tin xử lý tài sản. |
| | | | **TH Xóa đăng ký**: Hệ thống chuyển sang màn hình **Xóa đăng ký biện pháp bảo đảm** (UC026), kế thừa thông tin hồ sơ gốc gồm `Số đăng ký`, `Số PIN`, thông tin bên bảo đảm, bên nhận bảo đảm, tài sản bảo đảm và các thông tin liên quan; hệ thống đưa NSD tới bước xác nhận yêu cầu xóa đăng ký. |
| | | | **TH Thay đổi thông báo**: Hệ thống chuyển sang màn hình **Thay đổi thông báo xử lý tài sản bảo đảm** (UC131), kế thừa thông tin của thông báo xử lý tài sản bảo đảm đang có hiệu lực gần nhất; hệ thống đưa NSD tới form cập nhật nội dung thay đổi thông báo. |
| | | | **TH Xóa thông báo**: Hệ thống chuyển sang màn hình **Xóa đăng ký thông báo xử lý tài sản bảo đảm** (UC131), kế thừa thông tin của thông báo xử lý tài sản bảo đảm đang có hiệu lực để NSD lập yêu cầu xóa thông báo. |
| | | | **TH Yêu cầu cung cấp thông tin**: Hệ thống chuyển sang màn hình **Yêu cầu cung cấp thông tin**, tự động điền `Số đăng ký` và `Số PIN` của hồ sơ đang chọn vào tiêu chí tra cứu tương ứng để NSD tiếp tục gửi yêu cầu. |
| | | | **TH Yêu cầu cung cấp bản sao**: Hệ thống chuyển sang màn hình **Yêu cầu cung cấp bản sao văn bản chứng nhận**, tự động điền `Số đăng ký` và `Số PIN` của hồ sơ gốc để NSD tiếp tục gửi yêu cầu. |

#### 4.1.12.4. MH02 - Màn hình Phiếu đăng ký - Xem chi tiết

- Phạm vi màn hình này chỉ bao gồm các Phiếu đăng ký: Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản bảo đảm lần đầu, Thay đổi thông báo xử lý tài sản bảo đảm, Xóa đăng ký thông báo xử lý tài sản bảo đảm.
- Không hiển thị chi tiết Yêu cầu cung cấp bản sao và Yêu cầu cung cấp thông tin trên màn hình này.

##### 4.1.12.4.1. Giao diện

- Màn hình hiển thị chi tiết phiên bản Phiếu đăng ký đang được chọn.
- Nếu hồ sơ có từ 2 phiên bản trở lên, hiển thị Sidebar dòng thời gian bên trái và vùng chi tiết phiên bản bên phải.
- Nếu hồ sơ chỉ có 1 phiên bản, ẩn Sidebar dòng thời gian và vùng chi tiết hiển thị toàn chiều rộng.
- Toàn bộ dữ liệu hiển thị dạng Read-only.
- Link ảnh màn hình: [UCPS003.MH01 - Phiếu đăng ký - Xem chi tiết](images/UCPS003_MH01_Phieu_dang_ky_xem_chi_tiet.png).

##### 4.1.12.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| **I. Sidebar dòng thời gian lịch sử** | - | - | - | Chỉ hiển thị khi hồ sơ có từ 2 phiên bản trở lên. |
| Số đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Lọc danh sách phiên bản theo số đăng ký của phiên bản trong Sidebar dòng thời gian. |
| Loại đăng ký | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Lọc danh sách phiên bản theo loại đăng ký.<br>- Tham chiếu Danh mục Loại trường hợp đăng ký [DM_01]. |
| Từ ngày | Date | Không | Trống | Control UI: Datepicker.<br>- Lọc các phiên bản có `Thời điểm đăng ký` từ ngày này. |
| Đến ngày | Date | Không | Trống | Control UI: Datepicker.<br>- Lọc các phiên bản có `Thời điểm đăng ký` đến ngày này.<br>- Nếu nhập cùng `Từ ngày`, áp dụng [BR-VAL-007]. |
| Danh sách các phiên bản | Text(4000) | Không | 10 phiên bản gần nhất | Control UI: Danh sách node phiên bản.<br>- Khi mở màn hình, Sidebar bên trái hiển thị tối đa 10 phiên bản gần nhất, sắp xếp theo `Thời điểm đăng ký` giảm dần.<br>- Nếu người dùng mở từ màn hình danh sách, hệ thống chọn mặc định phiên bản được click; nếu mở trực tiếp từ hồ sơ, hệ thống chọn mặc định phiên bản mới nhất đang có hiệu lực.<br>- Mỗi node hiển thị từng thông tin trên một dòng riêng.<br>- Dòng đầu hiển thị trực tiếp giá trị `Loại đăng ký`: `Đăng ký lần đầu`, `Đăng ký thay đổi`, `Xóa đăng ký`, `Thông báo xử lý tài sản bảo đảm lần đầu`, `Thay đổi thông báo xử lý tài sản bảo đảm`, `Xóa đăng ký thông báo xử lý tài sản bảo đảm`, `Hủy đăng ký`, `Khôi phục hủy` hoặc `Chỉnh lý thông tin`.<br>- Số đăng ký.<br>- Thời điểm đăng ký theo định dạng `dd/mm/yyyy hh:mm:ss`.<br>- Trạng thái.<br>- Người tạo.<br>- Nếu phiên bản có văn bản kết quả, trạng thái `Hoàn thành` và đã sinh/ký số file kết quả, hiển thị icon tải/xem PDF văn bản kết quả. |
| **II. Vùng tiêu đề và thao tác** | - | - | - | Hiển thị phía trên vùng chi tiết phiên bản đang chọn. |
| Loại đăng ký đang chọn | String(255) | - | Theo phiên bản đang chọn | Control UI: Text hiển thị (Read-only).<br>- Hiển thị loại đăng ký của phiên bản đang chọn. |
| Chỉ hiển thị vùng dữ liệu có biến động | Boolean | Không | Tắt | Control UI: Checkbox/Toggle.<br>- Chỉ hiển thị khi `Loại đăng ký` là `Đăng ký thay đổi` hoặc `Thay đổi thông báo xử lý tài sản bảo đảm`.<br>- Khi bật, chỉ hiển thị các vùng/trường có thay đổi so với phiên bản gần nhất đã có hiệu lực.<br>- Khi tắt, hiển thị đầy đủ thông tin của phiên bản đang chọn. |
| **III. Thông tin hồ sơ** | - | - | - | Khối thông tin tổng quan của phiên bản đang chọn, hiển thị Read-only. |
| Loại đăng ký | String(255) | Có | Theo phiên bản | Control UI: Text hiển thị (Read-only).<br>- Hiển thị đúng loại nghiệp vụ của phiên bản đang chọn. |
| Số đăng ký | String(50) | Có | Theo phiên bản | Hiển thị số đăng ký của phiên bản đang chọn. |
| Thời điểm đăng ký | Datetime | Có | Theo phiên bản | Thời điểm hệ thống ghi nhận hồ sơ/yêu cầu đăng ký, định dạng `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | Datetime | Không | Theo phiên bản | Chính là thời điểm hồ sơ được ký duyệt/có hiệu lực trên hệ thống, định dạng `dd/mm/yyyy hh:mm:ss`.<br>- Chỉ hiển thị khi phiên bản đã có hiệu lực. |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Theo phiên bản | Hiển thị trạng thái hiện tại của phiên bản/hồ sơ đang chọn. |
| Số đăng ký lần đầu | String(50) | Không | Theo hồ sơ gốc | Hiển thị khi phiên bản đang chọn không phải `Đăng ký lần đầu`. |
| Thời điểm đăng ký lần đầu | Datetime | Không | Theo hồ sơ gốc | Không hiển thị nếu `Loại đăng ký` là `Đăng ký lần đầu`.<br>- Hiển thị thời điểm đăng ký của phiên bản đăng ký lần đầu theo định dạng `dd/mm/yyyy hh:mm:ss`. |
| Văn bản kết quả | File | Không | Theo phiên bản | Control UI: Link/Icon tải file.<br>- Chỉ hiển thị khi hồ sơ đã có file văn bản kết quả, trạng thái `Hoàn thành` và file kết quả đã được sinh/ký số.<br>- Khi hiển thị, cho phép mở xem hoặc tải file PDF trực tiếp. |
| **IV. Thông tin chi tiết phiên bản** | - | - | - | Hiển thị phần thông tin nghiệp vụ chi tiết của phiên bản đang chọn. |
| Khối chi tiết phiên bản | - | Có | Theo phiên bản | Hiển thị dữ liệu Read-only theo màn Review của tài liệu nghiệp vụ tương ứng được mô tả tại chức năng `Chọn phiên bản` mục [4.1.12.4.3](#411243-chuc-nang-tren-man-hinh).<br>- Chỉ hiển thị các nhóm thông tin nghiệp vụ chưa được thể hiện tại khối **III. Thông tin hồ sơ**, tránh lặp lại cùng một nội dung trên màn hình.<br>- Chi tiết trường/cột lấy theo tài liệu nghiệp vụ được tham chiếu tương ứng.<br>- Tại khối `Thông tin người yêu cầu đăng ký`/`Thông tin người đăng ký`, trường `Họ và tên/Tên tổ chức` hiển thị tên chủ thể yêu cầu: nếu tài khoản là cá nhân thì hiển thị họ tên cá nhân; nếu tài khoản là tổ chức thì hiển thị tên tổ chức. Không dùng giá trị vai trò `Người yêu cầu đăng ký` như `Bên bảo đảm`/`Bên nhận bảo đảm` để thay cho tên chủ thể.<br>- Không hiển thị thao tác thêm/sửa/xóa/import trên các bảng dữ liệu. |
| Thông tin so sánh biến động | - | Không | Theo phiên bản | Chỉ hiển thị với `Đăng ký thay đổi` và `Thay đổi thông báo xử lý tài sản bảo đảm`.<br>- So sánh với phiên bản gần nhất đã có hiệu lực.<br>- Trường/dòng có thay đổi được đánh dấu trực quan ngay tại vị trí dữ liệu thay đổi.<br>- Cho phép xem giá trị trước đó của trường/dòng thay đổi bằng tooltip/popover lịch sử.<br>- Quy tắc hiển thị nhãn biến động:<br>+ `Đăng ký thay đổi` - `Bổ sung mới`: Hiển thị với chủ thể/tài sản/dòng dữ liệu phát sinh thêm trong phiên bản đăng ký thay đổi so với phiên bản gần nhất đã có hiệu lực. Hiển thị tag màu xanh đặt ngay sau tên dòng dữ liệu hoặc trong dòng dữ liệu tương ứng. Không hiển thị tooltip giá trị cũ vì phiên bản trước chưa có dòng dữ liệu này.<br>+ `Đăng ký thay đổi` - `Sửa thông tin`: Hiển thị với chủ thể/tài sản/dòng dữ liệu đã tồn tại ở phiên bản gần nhất đã có hiệu lực nhưng có thay đổi một hoặc nhiều trường thông tin trong phiên bản đang xem. Hiển thị tag màu vàng/cam đặt ngay sau tên dòng dữ liệu hoặc trong dòng dữ liệu tương ứng. Trường thông tin có thay đổi được đánh dấu tại đúng vị trí dữ liệu và có icon lịch sử để hover xem giá trị cũ.<br>+ `Đăng ký thay đổi` - `Rút bớt`: Hiển thị với chủ thể/tài sản/dòng dữ liệu đã tồn tại ở phiên bản gần nhất đã có hiệu lực nhưng bị rút khỏi hồ sơ trong phiên bản đăng ký thay đổi. Hiển thị tag màu đỏ đặt ngay sau tên dòng dữ liệu hoặc trong dòng dữ liệu tương ứng. Không bắt buộc hiển thị tooltip giá trị cũ nếu toàn bộ dòng dữ liệu đã được thể hiện là dòng bị rút bớt.<br>+ `Thay đổi thông báo xử lý tài sản bảo đảm` - `Bổ sung xử lý`: Hiển thị với tài sản chưa thuộc danh sách tài sản xử lý ở thông báo gần nhất đã có hiệu lực nhưng được bổ sung vào danh sách xử lý trong phiên bản thay đổi thông báo đang xem. Hiển thị tag màu xanh đặt ngay sau tên tài sản hoặc trong dòng tài sản tương ứng. Không hiển thị tooltip giá trị cũ tại các trường Thời gian xử lý/Địa điểm xử lý/Lý do xử lý cho riêng tài sản này vì phiên bản trước chưa có tài sản trong danh sách xử lý.<br>+ `Thay đổi thông báo xử lý tài sản bảo đảm` - `Rút khỏi thông báo`: Hiển thị với tài sản đang thuộc danh sách tài sản xử lý ở thông báo gần nhất đã có hiệu lực nhưng bị rút khỏi danh sách xử lý trong phiên bản thay đổi thông báo đang xem. Hiển thị tag màu đỏ đặt ngay sau tên tài sản hoặc trong dòng tài sản tương ứng. Không hiển thị tooltip giá trị cũ tại các trường Thời gian xử lý/Địa điểm xử lý/Lý do xử lý cho riêng tài sản này vì tài sản bị loại khỏi thông báo xử lý đang xem.<br>+ `Thay đổi thông báo xử lý tài sản bảo đảm` - `Sửa thông tin`: Hiển thị khi thông tin xử lý tài sản của nhóm tài sản đang tiếp tục được xử lý có thay đổi so với thông báo gần nhất đã có hiệu lực, gồm Lý do xử lý, Thời gian xử lý hoặc Địa điểm xử lý. Hiển thị tag màu vàng/cam tại khối **Thông tin xử lý tài sản** hoặc trường dữ liệu tương ứng. Trường có thay đổi hiển thị icon lịch sử để hover xem giá trị cũ.<br>- Khi bật `Chỉ hiển thị vùng dữ liệu có biến động`, hệ thống chỉ hiển thị các nhóm/dòng/trường có một trong các nhãn biến động nêu trên.<br>- Khi tắt `Chỉ hiển thị vùng dữ liệu có biến động`, hệ thống hiển thị đầy đủ dữ liệu của phiên bản đang chọn; các nhóm/dòng/trường có biến động vẫn giữ nhãn để NSD nhận biết.<br>- Không hiển thị nhãn biến động đối với `Đăng ký lần đầu`, `Xóa đăng ký`, `Thông báo xử lý tài sản bảo đảm lần đầu` và `Xóa đăng ký thông báo xử lý tài sản bảo đảm`.<br>- Đối với `Xóa đăng ký thông báo xử lý tài sản bảo đảm`, màn hình hiển thị danh sách tài sản đang thuộc thông báo xử lý có hiệu lực để đối chiếu trước khi xóa thông báo, không hiển thị các nhãn `Bổ sung xử lý`, `Rút khỏi thông báo`, `Sửa thông tin`. |
| **V. Khối lý do bị từ chối** | - | - | Ẩn | Chỉ hiển thị khi phiên bản đang chọn có trạng thái `Bị từ chối`. |
| Lý do bị từ chối | Text(2000) | Có nếu trạng thái Bị từ chối | Theo hồ sơ | Hiển thị lý do từ chối do Cán bộ/Lãnh đạo ghi nhận tại thời điểm xử lý. |
| Thời điểm từ chối | Datetime | Không | Theo hồ sơ | Hiển thị thời điểm từ chối nếu hệ thống có ghi nhận. |
| Người từ chối | String(255) | Không | Theo hồ sơ | Hiển thị người từ chối nếu hệ thống có ghi nhận. |
| Văn bản từ chối | File/Link | Không | Theo hồ sơ | Hiển thị nếu hồ sơ có file thông báo từ chối đã sinh/đã ký số. |

##### 4.1.12.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Chọn phiên bản | Row Click | Khi NSD click một node tại Sidebar dòng thời gian, hệ thống tải thông tin phiên bản tương ứng và hiển thị tại vùng chi tiết. |
| | | | **TH1 - Phiên bản là Đăng ký lần đầu**: Hiển thị chi tiết phiên bản đăng ký lần đầu dạng Read-only theo cấu trúc màn Review của [Dang_ky_moi_BPBD.md](Dang_ky_moi_BPBD.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | **TH2 - Phiên bản là Đăng ký thay đổi**: Hiển thị chi tiết phiên bản đăng ký thay đổi dạng Read-only theo cấu trúc màn Review của [Dang_ky_thay_doi_BPBD.md](Dang_ky_thay_doi_BPBD.md), đồng thời so sánh với phiên bản gần nhất đã có hiệu lực trước đó gồm Đăng ký lần đầu hoặc Đăng ký thay đổi gần nhất; hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | **TH3 - Phiên bản là Xóa đăng ký**: Hiển thị chi tiết phiên bản xóa đăng ký dạng Read-only theo cấu trúc màn Review của [Xoa_dang_ky_BPBD.md](Xoa_dang_ky_BPBD.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | **TH4 - Phiên bản là Thông báo xử lý tài sản bảo đảm lần đầu**: Hiển thị chi tiết phiên bản thông báo xử lý tài sản bảo đảm lần đầu dạng Read-only theo cấu trúc màn Review của [Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md](Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | **TH5 - Phiên bản là Thay đổi thông báo xử lý tài sản bảo đảm**: Hiển thị chi tiết phiên bản thay đổi thông báo xử lý tài sản bảo đảm dạng Read-only theo cấu trúc màn Review của [Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md](Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md), đồng thời so sánh với phiên bản thông báo gần nhất đã có hiệu lực trước đó gồm Thông báo xử lý tài sản bảo đảm lần đầu hoặc Thay đổi thông báo xử lý tài sản bảo đảm gần nhất; hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | **TH6 - Phiên bản là Xóa đăng ký thông báo xử lý tài sản bảo đảm**: Hiển thị chi tiết phiên bản xóa thông báo xử lý tài sản bảo đảm dạng Read-only theo cấu trúc màn Review của [Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md](Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | **TH7 - Phiên bản là Hủy đăng ký/Khôi phục hủy/Chỉnh lý thông tin**: Hiển thị chi tiết phiên bản dạng Read-only theo cấu trúc màn hình nghiệp vụ tương ứng và ghi nhận đầy đủ lịch sử xử lý. |
| | | | **TH8 - Phiên bản bị từ chối**: Hiển thị thêm khối `Lý do bị từ chối`. |
| 2 | Bật/Tắt chỉ hiển thị vùng dữ liệu có biến động | Toggle | Khi NSD bật, hệ thống chỉ hiển thị các vùng/trường có thay đổi so với phiên bản gần nhất đã có hiệu lực; khi tắt, hệ thống hiển thị đầy đủ thông tin phiên bản. |
| 3 | Tìm kiếm phiên bản trên Sidebar | Button | Khi NSD click nút `Tìm kiếm` tại Sidebar, hệ thống kiểm tra tính hợp lệ của khoảng ngày theo [BR-VAL-007] và lọc danh sách node phiên bản thỏa mãn đồng thời các tiêu chí `Số đăng ký`, `Loại đăng ký`, `Từ ngày`, `Đến ngày`. |
| | | | **TH1 - Điều kiện ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị thông báo lỗi theo MessageList dùng chung. Không thực hiện lọc. |
| | | | **TH Hợp lệ**: Hệ thống hiển thị danh sách node phiên bản thỏa mãn điều kiện lọc, sắp xếp theo `Thời điểm đăng ký` giảm dần; nếu không có dữ liệu, Sidebar hiển thị thông báo rỗng theo MessageList dùng chung [MSG-INF-SYS-001]. Sidebar tiếp tục sử dụng cơ chế danh sách cuộn với `Xem thêm`/`Thu gọn`. |
| 4 | Xóa lọc phiên bản trên Sidebar | Button | Xóa toàn bộ tiêu chí lọc tại Sidebar, đặt `Loại đăng ký` về `Tất cả`, xóa `Số đăng ký`, `Từ ngày`, `Đến ngày` và hiển thị lại tối đa 10 phiên bản gần nhất theo thứ tự mặc định. |
| 5 | Xem thêm | Button | Hiển thị ở cuối danh sách khi còn phiên bản chưa hiển thị. Mỗi lần click, hệ thống tải thêm 10 phiên bản theo bộ lọc hiện tại. |
| 6 | Thu gọn | Button | Chỉ hiển thị khi danh sách phiên bản đang hiển thị nhiều hơn 10 phiên bản. Khi NSD click, hệ thống thu gọn danh sách về 10 phiên bản đầu tiên theo bộ lọc hiện tại. |
| 7 | Tải/Xem văn bản kết quả | Icon/Button | Khi NSD click, hệ thống mở xem hoặc tải file PDF văn bản kết quả trực tiếp. |
| | | | **TH Ngoại lệ - Kết nối bị gián đoạn**: Nếu kết nối mạng hoặc hệ thống lưu trữ file bị gián đoạn, hệ thống hiển thị thông báo lỗi theo MessageList dùng chung và không tải file. |
| 8 | Cập nhật | Button | Khi NSD click nút `Cập nhật`, hệ thống chuyển sang màn hình cập nhật của nghiệp vụ tương ứng. |
| 9 | Thanh toán | Button | Khi NSD click nút `Thanh toán`, hệ thống chuyển sang luồng thanh toán trực tuyến theo UC158. |
| 10 | Thao tác khác | Dropdown | Thực hiện theo chức năng `Thao tác khác` tại mục [4.1.12.3.3](#411233-chuc-nang-tren-man-hinh). |
| 11 | Đóng | Button | Đóng màn hình và quay lại danh sách Phiếu đăng ký. |
