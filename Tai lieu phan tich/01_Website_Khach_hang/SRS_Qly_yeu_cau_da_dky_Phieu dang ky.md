﻿### 4.1.12. Quản lý yêu cầu đã đăng ký - Phiếu đăng ký dành cho Khách hàng

#### 4.1.12.1. Mục đích

- Cho phép Khách hàng quản lý, tra cứu và xử lý các Phiếu đăng ký BPBĐ/hợp đồng/thông báo xử lý tài sản bảo đảm đã đăng ký trên Website Khách hàng.
- Tài liệu này chỉ mô tả nhóm Phiếu đăng ký, gồm:<br>- Danh sách Phiếu đăng ký.<br>- Xem chi tiết Phiếu đăng ký.<br>- Các thao tác nghiệp vụ phát sinh từ Phiếu đăng ký.
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
| Trạng thái | Enum(String(50)) | Không | Tất cả | Gồm:<br>- Tất cả<br>- Lưu nháp<br>- Chờ thanh toán<br>- Chờ duyệt<br>- Chờ ký<br>- Hoàn thành<br>- Bị từ chối<br>- Sai lệch thanh toán |
| Loại đăng ký | Enum(String(100)) | Không | Tất cả | Lọc theo trường hợp đăng ký của Phiếu đăng ký. |
| Loại hình giao dịch | Enum(String(100)) | Không | Tất cả | Gồm:<br>- Tất cả<br>- Biện pháp bảo đảm<br>- Hợp đồng<br>- Thông báo xử lý tài sản bảo đảm |
| Loại Biện pháp/Loại HĐ | Enum(String(100)) | Không | Tất cả | Giá trị thay đổi theo `Loại hình giao dịch`. |
| Loại tài sản | Enum(String(255)) | Không | Tất cả | Lọc theo Danh mục Loại tài sản bảo đảm [DM_07]. Nếu chọn một loại tài sản cụ thể, hệ thống hiển thị thêm các trường lọc đặc thù của loại tài sản đó. |
| **Khối lọc động theo Loại tài sản** | - | Không | Ẩn | Chỉ hiển thị khi NSD chọn một giá trị cụ thể tại trường `Loại tài sản`. Các trường trong khối lọc động phải tương ứng với cấu trúc thông tin tài sản tại màn Đăng ký mới BPBĐ. |
| Tên phương tiện | Enum/String(255) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)`. Nếu có danh mục thì tham chiếu Danh mục dùng chung - Danh mục Tên phương tiện [DM_41]. |
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
| Hàng hóa luân chuyển / Kho hàng | Enum(String(50)) | Không | Tất cả | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ`. Gồm:<br>- Tất cả<br>- Hàng hóa luân chuyển<br>- Kho hàng |
| Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ`. |
| Địa chỉ kho hàng | String(500) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ` và `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ` và `Hàng hóa luân chuyển / Kho hàng` = `Kho hàng`. |
| Thời điểm đăng ký tại VSDC | Datetime/String(16) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` = `Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung`.<br>- Control UI: Ô nhập/chọn thời điểm dạng `HH:mm dd/MM/yyyy`.<br>- Hệ thống sử dụng giá trị gộp này để tìm kiếm theo dữ liệu gốc gồm Giờ, Phút, Ngày, Tháng, Năm. |
| Mô tả | Text(1000) | Không | Trống | Chỉ hiển thị khi `Loại tài sản` là một trong các giá trị có trường Mô tả tại màn Đăng ký mới BPBĐ, gồm:<br>- `Cây hằng năm, công trình tạm`<br>- `Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)` |
| Nút Tìm kiếm | Button | - | - | Thực hiện tìm kiếm theo điều kiện đã nhập. |
| Nút Xóa bộ lọc | Button | - | - | Xóa toàn bộ điều kiện lọc và tải lại danh sách mặc định. |
| **II. Vùng kết quả hiển thị** | - | - | 10 hồ sơ gốc/trang | Control UI: Tree Grid.<br>- Sắp xếp mặc định theo `Thời điểm đăng ký` giảm dần của hồ sơ gốc.<br>- Dòng con thụt vào dưới dòng cha tương ứng.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Cột: STT | Integer | - | - | Chỉ hiển thị STT ở dòng cha. |
| Cột: Số đăng ký | String(50) | - | - | Dòng cha hiển thị số đăng ký gốc; dòng con hiển thị số đăng ký của phiên bản/hồ sơ liên quan. |
| Cột: Số PIN | String(20) | - | - | Mã PIN chỉ được hệ thống cấp một lần duy nhất tại thời điểm Đăng ký mới (UC024). Do đó, cột này CHỈ hiển thị giá trị Số PIN đối với dòng có `Loại đăng ký` = "Đăng ký lần đầu" (hồ sơ gốc); các dòng con thuộc loại khác (Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản bảo đảm - lần đầu/thay đổi/xóa, Yêu cầu cung cấp bản sao, Yêu cầu cung cấp thông tin,...) không phát sinh PIN mới nên hiển thị trống/"-". |
| Cột: Loại đăng ký | String(100) | - | - | Hiển thị trường hợp đăng ký của dòng dữ liệu. |
| Cột: Tên bên bảo đảm | String(255) | - | - | Hiển thị tên Bên bảo đảm của phiên bản tương ứng. |
| Cột: Tên bên nhận bảo đảm | String(255) | - | - | Hiển thị tên Bên nhận bảo đảm của phiên bản tương ứng. |
| Cột: Loại hình GD | String(100) | - | - | Hiển thị loại hình giao dịch. |
| Cột: Loại BP/HĐ | String(100) | - | - | Hiển thị loại Biện pháp bảo đảm hoặc loại Hợp đồng. |
| Cột: Loại tài sản | String(2000) | - | - | Mỗi loại tài sản hiển thị trên một dòng riêng. Nếu quá dài, hiển thị rút gọn và tooltip. |
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
| Cột: Thời điểm đăng ký | Datetime | - | - | Định dạng `dd/mm/yyyy HH:mm`. |
| Thời điểm có hiệu lực | Datetime | - | Theo hồ sơ | Định dạng `dd/mm/yyyy HH:mm`. Hiển thị thời điểm hồ sơ/phiên bản phát sinh hiệu lực pháp lý; nếu chưa có hiệu lực, hiển thị `"—"`. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | - | Theo hồ sơ | Tiêu đề cột ghi rõ đơn vị tính `(VNĐ)`, dữ liệu từng dòng chỉ hiển thị số đã phân tách hàng nghìn, không lặp lại hậu tố `VNĐ`. Hiển thị tổng số tiền Khách hàng đã thanh toán thành công cho hồ sơ/phiên bản; nếu chưa thanh toán hoặc không phát sinh phí, hiển thị `"—"`. |
| Cột: Trạng thái | String(50) | - | - | Hiển thị trạng thái của hồ sơ/phiên bản. |
| Người tạo | String(255) | - | Theo hồ sơ | Hiển thị tên người đang đăng nhập đã tạo hồ sơ/phiên bản; không hiển thị account/email đăng nhập. |
| Cột: Thao tác | - | - | - | Hiển thị các thao tác động theo trạng thái, loại hồ sơ và vị trí của hồ sơ trong cây hồ sơ liên quan.<br>- `Cập nhật`: Chỉ hiển thị với hồ sơ ở trạng thái `Lưu nháp`.<br>- `Thanh toán`: Chỉ hiển thị với hồ sơ ở trạng thái `Chờ thanh toán`.<br>- `Xóa`: Chỉ hiển thị với hồ sơ ở trạng thái cho phép xóa bản ghi nháp/bị từ chối theo quy định nghiệp vụ.<br>- `Thao tác khác`: Hiển thị dạng Dropdown khi hồ sơ/phiên bản đang chọn ở trạng thái `Hoàn thành` và có ít nhất một thao tác nghiệp vụ tiếp theo phù hợp. Nếu không có thao tác phù hợp, hệ thống hiển thị icon `Thao tác khác` dạng mờ và không cho phép thao tác.<br>- Các thao tác trong Dropdown `Thao tác khác` được xác định động theo loại hồ sơ, vị trí của hồ sơ trong cây hồ sơ liên quan và trạng thái các hồ sơ liên quan.<br>+ `Đăng ký thay đổi`: Chỉ hiển thị khi hồ sơ đang chọn là hồ sơ gốc `Đăng ký lần đầu`, trạng thái `Hoàn thành`, và không tồn tại hồ sơ `Đăng ký thay đổi` liên quan đang trong trạng thái xử lý.<br>+ `Thông báo xử lý tài sản`: Chỉ hiển thị khi hồ sơ đang chọn là hồ sơ gốc `Đăng ký lần đầu`, trạng thái `Hoàn thành`, chưa có thông báo xử lý tài sản liên quan, và không có hồ sơ xóa đăng ký/hồ sơ liên quan đang chặn thao tác.<br>+ `Xóa đăng ký`: Chỉ hiển thị khi hồ sơ đang chọn là hồ sơ gốc `Đăng ký lần đầu`, trạng thái `Hoàn thành`, và chưa có hồ sơ `Xóa đăng ký` liên quan.<br>+ `Thay đổi thông báo`: Chỉ hiển thị khi hồ sơ đang chọn là `Thông báo xử lý tài sản bảo đảm lần đầu`, trạng thái `Hoàn thành`, và chưa có hồ sơ `Thay đổi thông báo` liên quan đang trong trạng thái xử lý.<br>+ `Xóa thông báo`: Chỉ hiển thị khi hồ sơ đang chọn là `Thông báo xử lý tài sản bảo đảm lần đầu`, trạng thái `Hoàn thành`, và chưa có hồ sơ `Xóa đăng ký thông báo xử lý tài sản bảo đảm` liên quan.<br>+ `Yêu cầu cung cấp thông tin`: Chỉ hiển thị khi hồ sơ đang chọn ở trạng thái `Hoàn thành`.<br>+ `Yêu cầu cung cấp bản sao`: Chỉ hiển thị khi hồ sơ đang chọn ở trạng thái `Hoàn thành`.<br>+ `Yêu cầu cung cấp bản sao kèm thông báo`: Chỉ hiển thị khi hồ sơ đang chọn ở trạng thái `Hoàn thành`. |

##### 4.1.12.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Tìm kiếm | Button | TH1 (Điều kiện ngày không hợp lệ): Nếu `Từ ngày` lớn hơn `Đến ngày`, hiển thị lỗi theo [BR-VAL-007].<br>TH Hợp lệ: Hệ thống tải danh sách Phiếu đăng ký thỏa mãn điều kiện tìm kiếm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Button | Đưa bộ lọc về mặc định và tải lại danh sách. |
| 3 | Xem | Button/Row Click | Mở màn hình Phiếu đăng ký - Xem chi tiết tại mục 4.1.12.4. Phiên bản mặc định được chọn là phiên bản tương ứng với dòng NSD click. |
| 4 | Thanh toán | Button | Khi NSD click, hệ thống chuyển sang luồng thanh toán theo UC158. |
| 5 | Cập nhật | Button | Khi NSD click, hệ thống chuyển sang màn hình cập nhật của nghiệp vụ tương ứng. |
| 6 | Xóa | Button | Khi NSD click, hệ thống thực hiện xóa bản ghi nháp/bị từ chối theo quy định nghiệp vụ sau khi NSD xác nhận. |
| 7 | Thao tác khác | Dropdown | Khi NSD chọn một thao tác trong Dropdown, hệ thống thực hiện theo thao tác được chọn. |
| | Đăng ký thay đổi | | Hệ thống chuyển sang [UC025_Dang_ky_thay_doi_BPBD.md](UC025_Dang_ky_thay_doi_BPBD.md), tự động kế thừa thông tin hồ sơ gốc được chọn và bỏ qua bước nhập Số đăng ký/PIN vì đã kế thừa từ hồ sơ gốc. |
| | Thông báo xử lý tài sản | | Hệ thống chuyển sang [UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md](UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md), tự động kế thừa thông tin hồ sơ gốc được chọn. |
| | Xóa đăng ký | | Hệ thống chuyển sang [UC026_Xoa_dang_ky_BPBD.md](UC026_Xoa_dang_ky_BPBD.md), tự động kế thừa thông tin hồ sơ gốc được chọn. |
| | Thay đổi thông báo | | Hệ thống chuyển sang màn lập thay đổi thông báo xử lý tài sản bảo đảm, tự động kế thừa thông tin thông báo đang có hiệu lực được chọn. |
| | Xóa thông báo | | Hệ thống chuyển sang màn lập xóa đăng ký thông báo xử lý tài sản bảo đảm, tự động kế thừa thông tin thông báo đang có hiệu lực được chọn. |
| | Yêu cầu cung cấp thông tin | | Hệ thống chuyển sang màn lập Yêu cầu cung cấp thông tin, bỏ qua bước nhập lại Số đăng ký/PIN nếu đã có đủ dữ liệu hồ sơ được chọn. |
| | Yêu cầu cung cấp bản sao | | Hệ thống chuyển sang [SRS_YC_cung_cap_ban_sao_van_ban_chung_nhan.md](SRS_YC_cung_cap_ban_sao_van_ban_chung_nhan.md), bỏ qua bước nhập lại Số đăng ký/PIN nếu đã có đủ dữ liệu hồ sơ được chọn. |
| | Yêu cầu cung cấp bản sao kèm thông báo | | Hệ thống chuyển sang [SRS_YC_cung_cap_ban_sao_kem_thong_bao.md](SRS_YC_cung_cap_ban_sao_kem_thong_bao.md), bỏ qua bước nhập lại Số đăng ký/PIN nếu đã có đủ dữ liệu hồ sơ được chọn. |

---

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
| Tìm kiếm nhanh phiên bản | String(255) | Không | Trống | Control UI: Ô nhập liệu.<br>- Chỉ cho phép nhập/lọc theo `Số đăng ký` của phiên bản. |
| Trường hợp đăng ký | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Lọc danh sách phiên bản theo trường hợp đăng ký.<br>- Gồm:<br>+ Tất cả<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Xóa đăng ký<br>+ Thông báo xử lý tài sản bảo đảm lần đầu<br>+ Thay đổi thông báo xử lý tài sản bảo đảm<br>+ Xóa đăng ký thông báo xử lý tài sản bảo đảm. |
| Từ ngày | Date | Không | Trống | Control UI: Datepicker.<br>- Lọc các phiên bản có `Thời điểm đăng ký` từ ngày này. |
| Đến ngày | Date | Không | Trống | Control UI: Datepicker.<br>- Lọc các phiên bản có `Thời điểm đăng ký` đến ngày này. |
| Tìm kiếm | Button | Không | Hiển thị | Khi NSD click, hệ thống áp dụng các điều kiện lọc đang nhập/chọn tại Sidebar dòng thời gian gồm: `Số đăng ký`, `Trường hợp đăng ký`, `Từ ngày`, `Đến ngày`. |
| Xóa lọc | Button | Không | Hiển thị | Khi NSD click, hệ thống xóa toàn bộ điều kiện lọc tại Sidebar dòng thời gian, đặt `Trường hợp đăng ký` về `Tất cả`, xóa `Từ ngày`, `Đến ngày`, xóa ô tìm kiếm theo `Số đăng ký` và hiển thị lại danh sách phiên bản mặc định. |
| Danh sách các phiên bản | - | - | 10 phiên bản gần nhất | Control UI: Danh sách node phiên bản.<br>- Danh sách hiển thị theo thứ tự `Thời điểm đăng ký` giảm dần.<br>- Mặc định hiển thị 10 bản ghi đầu tiên.<br>- Mỗi node hiển thị từng thông tin trên một dòng riêng.<br>- Dòng đầu hiển thị trực tiếp giá trị trường hợp đăng ký: `Đăng ký lần đầu`, `Đăng ký thay đổi`, `Xóa đăng ký`, `Thông báo xử lý tài sản bảo đảm lần đầu`, `Thay đổi thông báo xử lý tài sản bảo đảm` hoặc `Xóa đăng ký thông báo xử lý tài sản bảo đảm`; không hiển thị thêm tiền tố `Trường hợp đăng ký:` trên node.<br>- Số đăng ký.<br>- Thời điểm đăng ký theo định dạng `dd/mm/yyyy hh:mm:ss`.<br>- Trạng thái.<br>- Nếu phiên bản có văn bản kết quả và trạng thái đã hoàn thành, hiển thị icon tải/xem PDF văn bản kết quả. |
| Xem thêm | Button | Không | Ẩn | Hiển thị ở cuối danh sách khi còn phiên bản chưa hiển thị. Mỗi lần click tải thêm 10 phiên bản. |
| Thu gọn | Button | Không | Ẩn | Chỉ hiển thị khi danh sách phiên bản đang hiển thị nhiều hơn 10 phiên bản. Khi NSD click, hệ thống thu gọn danh sách về 10 phiên bản đầu tiên theo bộ lọc hiện tại. Nếu phiên bản đang chọn không nằm trong 10 phiên bản đầu tiên sau khi thu gọn, hệ thống tự động chọn phiên bản đầu tiên trong danh sách đang hiển thị. |
| **II. Vùng tiêu đề và thao tác** | - | - | - | Hiển thị phía trên vùng chi tiết phiên bản đang chọn. |
| Trường hợp đăng ký đang chọn | String(255) | - | Theo phiên bản đang chọn | Control UI: Hiển thị/Read-only. |
| Chỉ hiển thị vùng dữ liệu có biến động | Boolean | Không | Tắt | Control UI: Checkbox/Toggle.<br>- Chỉ hiển thị khi `Trường hợp đăng ký` là `Đăng ký thay đổi` hoặc `Thay đổi thông báo xử lý tài sản bảo đảm`.<br>- Khi bật, chỉ hiển thị các vùng/trường có thay đổi so với phiên bản gần nhất đã có hiệu lực.<br>- Khi tắt, hiển thị đầy đủ thông tin của phiên bản đang chọn. |
| Cập nhật | Button | Không | Theo trạng thái | Cách hiển thị và xử lý giống chức năng `Cập nhật` tại mục [4.1.12.3.3. Chức năng trên màn hình](#411233-chuc-nang-tren-man-hinh). |
| Thanh toán | Button | Không | Theo trạng thái | Cách hiển thị và xử lý giống chức năng `Thanh toán` tại mục [4.1.12.3.3. Chức năng trên màn hình](#411233-chuc-nang-tren-man-hinh). |
| Thao tác khác | Dropdown | Không | Theo trạng thái | Cách hiển thị giống `Cột: Thao tác` tại lưới danh sách bên ngoài ở mục [4.1.12.3.2](#411232-mo-ta-thong-tin-tren-man-hinh). |
| Đóng | Button | Có | - | Đóng màn hình chi tiết và quay lại màn hình danh sách trước đó. |
| **III. Thông tin hồ sơ** | - | - | - | Khối thông tin tổng quan của phiên bản đang chọn, hiển thị Read-only. |
| Trường hợp đăng ký | String(255) | Có | Theo phiên bản | Hiển thị đúng loại nghiệp vụ của phiên bản đang chọn. |
| Số đăng ký | String(50) | Có | Theo phiên bản | Hiển thị số đăng ký của phiên bản đang chọn. |
| Thời điểm đăng ký | Datetime | Có | Theo phiên bản | Thời điểm hệ thống ghi nhận hồ sơ/yêu cầu đăng ký, định dạng `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | Datetime | Không | Theo phiên bản | Chính là thời điểm hồ sơ được ký duyệt/có hiệu lực trên hệ thống, định dạng `dd/mm/yyyy hh:mm:ss`.<br>- Chỉ hiển thị khi phiên bản đã có hiệu lực. |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Theo phiên bản | Hiển thị trạng thái hiện tại của phiên bản/hồ sơ đang chọn. |
| Số đăng ký lần đầu | String(50) | Không | Theo hồ sơ gốc | Hiển thị khi phiên bản đang chọn không phải `Đăng ký lần đầu`. |
| Thời điểm đăng ký lần đầu | Datetime | Không | Theo hồ sơ gốc | Không hiển thị nếu `Trường hợp đăng ký` là `Đăng ký lần đầu`.<br>- Hiển thị thời điểm đăng ký của phiên bản đăng ký lần đầu theo định dạng `dd/mm/yyyy hh:mm:ss`. |
| Văn bản kết quả | File/Link | Không | Theo phiên bản | Chỉ hiển thị nếu phiên bản có văn bản kết quả đã sinh hoặc đã ký số. |
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
| | | | - TH1 (Phiên bản là Đăng ký lần đầu): Hiển thị chi tiết phiên bản đăng ký lần đầu dạng Read-only theo cấu trúc màn Review của [UC024_Dang_ky_moi_BPBD.md](UC024_Dang_ky_moi_BPBD.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | - TH2 (Phiên bản là Đăng ký thay đổi): Hiển thị chi tiết phiên bản đăng ký thay đổi dạng Read-only theo cấu trúc màn Review của [UC025_Dang_ky_thay_doi_BPBD.md](UC025_Dang_ky_thay_doi_BPBD.md), đồng thời so sánh với phiên bản gần nhất đã có hiệu lực trước đó gồm Đăng ký lần đầu hoặc Đăng ký thay đổi gần nhất; hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | - TH3 (Phiên bản là Xóa đăng ký): Hiển thị chi tiết phiên bản xóa đăng ký dạng Read-only theo cấu trúc màn Review của [UC026_Xoa_dang_ky_BPBD.md](UC026_Xoa_dang_ky_BPBD.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | - TH4 (Phiên bản là Thông báo xử lý tài sản bảo đảm lần đầu): Hiển thị chi tiết phiên bản thông báo xử lý tài sản bảo đảm lần đầu dạng Read-only theo cấu trúc màn Review của [UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md](UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | - TH5 (Phiên bản là Thay đổi thông báo xử lý tài sản bảo đảm): Hiển thị chi tiết phiên bản thay đổi thông báo xử lý tài sản bảo đảm dạng Read-only theo cấu trúc màn Review của [UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md](UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md), đồng thời so sánh với phiên bản thông báo gần nhất đã có hiệu lực trước đó gồm Thông báo xử lý tài sản bảo đảm lần đầu hoặc Thay đổi thông báo xử lý tài sản bảo đảm gần nhất; hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | - TH6 (Phiên bản là Xóa đăng ký thông báo xử lý tài sản bảo đảm): Hiển thị chi tiết phiên bản xóa thông báo xử lý tài sản bảo đảm dạng Read-only theo cấu trúc màn Review của [UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md](UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md), không hiển thị chức năng `Chỉ hiển thị vùng dữ liệu có biến động`. |
| | | | - TH7 (Phiên bản bị từ chối): Hiển thị thêm khối `Lý do bị từ chối`. |
| 2 | Bật/Tắt chỉ hiển thị vùng dữ liệu có biến động | Toggle | Chỉ thao tác được khi phiên bản đang chọn là `Đăng ký thay đổi` hoặc `Thay đổi thông báo xử lý tài sản bảo đảm`. |
| | | | - TH Hợp lệ: Khi bật, hệ thống chỉ hiển thị các vùng/trường có thay đổi so với phiên bản gần nhất đã có hiệu lực. Khi tắt, hệ thống hiển thị đầy đủ thông tin phiên bản. |
| 3 | Tìm kiếm nhanh phiên bản | Nhập liệu | NSD nhập từ khóa để lọc danh sách phiên bản theo `Số đăng ký`.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 4 | Lọc phiên bản theo Trường hợp đăng ký | Combobox | NSD chọn `Trường hợp đăng ký`; hệ thống chỉ hiển thị các phiên bản thuộc trường hợp đăng ký đã chọn. Nếu chọn `Tất cả`, hệ thống hiển thị toàn bộ phiên bản trong phạm vi hồ sơ.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 5 | Lọc phiên bản theo ngày | Chọn ngày | NSD chọn `Từ ngày`, `Đến ngày`; hệ thống lọc các phiên bản có `Thời điểm đăng ký` nằm trong khoảng đã chọn. Nếu `Từ ngày` lớn hơn `Đến ngày`, hiển thị lỗi theo [BR-VAL-007].<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 6 | Tải/Xem văn bản kết quả | Icon/Button | Chỉ hiển thị khi phiên bản có văn bản kết quả. Nếu văn bản chưa được sinh hoặc chưa được ký số, hệ thống hiển thị thông báo lỗi phù hợp. |
| 7 | Cập nhật | Button | Chuyển sang màn hình cập nhật của nghiệp vụ tương ứng nếu hồ sơ đang ở trạng thái cho phép cập nhật. |
| 8 | Thanh toán | Button | Chuyển sang luồng thanh toán nếu hồ sơ đang ở trạng thái `Chờ thanh toán`. |
| 9 | Thao tác khác | Dropdown | Thực hiện theo chức năng `Thao tác khác` tại mục [4.1.12.3.3](#411233-chuc-nang-tren-man-hinh). |
| 10 | Đóng | Button | Đóng màn hình và quay lại danh sách Phiếu đăng ký. |
