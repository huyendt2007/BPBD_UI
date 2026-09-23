### 4.3.2.17. Nhập liệu hồ sơ giấy Phiếu đăng ký

#### 4.3.2.17.1. Mục đích

\- Cho phép Cán bộ giải quyết hồ sơ nhập dữ liệu nghiệp vụ Phiếu đăng ký từ hồ sơ giấy đã được tiếp nhận và đã hoàn tất thu phí/miễn phí tại quầy, xem trước dữ liệu và gửi duyệt hồ sơ.

\- Chức năng gồm 04 màn hình: Danh sách hồ sơ chờ nhập liệu, Xem chi tiết hồ sơ chờ nhập liệu, Nhập liệu hồ sơ giấy Phiếu đăng ký và Xem trước hồ sơ giấy Phiếu đăng ký.

\- Danh sách hồ sơ chờ nhập liệu tại chức năng này chỉ hiển thị hồ sơ giấy có Loại yêu cầu thuộc nhóm Phiếu đăng ký. Hồ sơ giấy của các nhóm nghiệp vụ khác được mô tả tại [Hồ sơ chờ nhập liệu - Website quản trị](SRS_Ho_so_cho_nhap_lieu.md).

\- Chức năng này áp dụng cho các Loại yêu cầu thuộc nhóm Phiếu đăng ký:

\+ "Đăng ký lần đầu".

\+ "Đăng ký thay đổi".

\+ "Xóa đăng ký".

\+ "Thông báo xử lý tài sản bảo đảm lần đầu".

\+ "Thông báo xử lý tài sản bảo đảm lần đầu (Trường hợp chưa đăng ký BPBĐ)".

\+ "Thay đổi thông báo xử lý tài sản bảo đảm".

\+ "Xóa đăng ký thông báo xử lý tài sản bảo đảm".

*a. Phân quyền*

\- NSD có vai trò Cán bộ giải quyết hồ sơ: Được phép mở hồ sơ giấy chờ nhập liệu, xem thông tin tiếp nhận/thu phí, tra cứu hồ sơ tham chiếu, nhập/cập nhật dữ liệu Phiếu đăng ký, xem trước, duyệt chờ ký, trình ký và hủy thao tác nhập liệu.

\- NSD có vai trò Cán bộ tiếp nhận: Không được nhập dữ liệu nghiệp vụ Phiếu đăng ký; chỉ được xem thông tin tiếp nhận nếu được phân quyền.

\- NSD có vai trò Cán bộ kế toán: Không được nhập dữ liệu nghiệp vụ Phiếu đăng ký; chỉ được xem thông tin thu phí nếu được phân quyền.

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập Website quản trị và có quyền nhập liệu hồ sơ giấy Phiếu đăng ký.

\- Hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" và Loại yêu cầu thuộc nhóm Phiếu đăng ký.

\- Hồ sơ đang ở trạng thái "Chờ giải quyết" hoặc "Bị trả lại".

\- Hồ sơ có Trạng thái lệ phí là "Đã thu" hoặc "Miễn phí" theo [BR-UCPS-001] và [BR-UCPS-006].


#### 4.3.2.17.2. MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu

##### 4.3.2.17.2.1. Màn hình

![Danh sách hồ sơ chờ nhập liệu](images/MH01_Danh_sach_ho_so_cho_nhap_lieu.png)

##### 4.3.2.17.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ | String(50) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Mã hồ sơ giấy, không phân biệt hoa thường, tự động trim space. |
| Số đơn giấy | String(50) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Số đơn giấy ghi nhận tại bước tiếp nhận. |
| Người yêu cầu | String(255) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường. |
| Người nộp hồ sơ | String(255) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường. |
| Loại yêu cầu | Enum(String(100)) | Không | "Tất cả" | - Control UI: Dropdown list.<br>- Gồm các giá trị:<br>- "Tất cả"<br>- "Đăng ký lần đầu"<br>- "Đăng ký thay đổi"<br>- "Xóa đăng ký"<br>- "Thông báo xử lý tài sản bảo đảm lần đầu"<br>- "Thông báo xử lý tài sản bảo đảm lần đầu (Trường hợp chưa đăng ký BPBĐ)"<br>- "Thay đổi thông báo xử lý tài sản bảo đảm"<br>- "Xóa đăng ký thông báo xử lý tài sản bảo đảm" |
| Trạng thái lệ phí | Enum(String(50)) | Không | "Tất cả" | - Control UI: Dropdown list.<br>- Gồm các giá trị:<br>- "Tất cả"<br>- "Đã thu"<br>- "Miễn phí" |
| Cán bộ tiếp nhận | String(255) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Họ và tên Cán bộ tiếp nhận. |
| Từ ngày tiếp nhận | Date | Không | Ngày 01 của tháng hiện tại | - Control UI: Datepicker.<br>- Lọc theo Thời điểm tiếp nhận.<br>- Tuân thủ [BR-VAL-007]. |
| Đến ngày tiếp nhận | Date | Không | Ngày hiện tại | - Control UI: Datepicker.<br>- Lọc theo Thời điểm tiếp nhận.<br>- Tuân thủ [BR-VAL-007]. |
| Tìm kiếm | - | Không | - | - Control UI: Button .<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Xóa bộ lọc | - | Không | - | - Control UI: Button.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **II. Bảng danh sách hồ sơ chờ nhập liệu** | - | Có | 20 bản ghi/trang | - Control UI: Bảng dữ liệu (Grid) kèm phân trang.<br>- Chỉ hiển thị hồ sơ giấy có Loại yêu cầu thuộc nhóm Phiếu đăng ký, trạng thái "Chờ giải quyết" hoặc "Bị trả lại" và Trạng thái lệ phí là "Đã thu" hoặc "Miễn phí" theo [BR-UCPS-001].<br>- Chỉ hiển thị hồ sơ trong phạm vi đơn vị của Cán bộ đăng nhập.<br>- Sắp xếp mặc định theo Ngày tiếp nhận giảm dần.<br>- Phân trang 20 bản ghi/trang.<br>- Trạng thái không có dữ liệu: hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]. |
| STT | Integer(10) | Có | Theo trang | Số thứ tự dòng trên trang kết quả. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. |
| Số đơn giấy | String(50) | Có | Theo hồ sơ tiếp nhận | Chỉ đọc. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ tiếp nhận | Tên cá nhân/tổ chức yêu cầu đăng ký. |
| Người nộp hồ sơ | String(255) | Không | Theo hồ sơ tiếp nhận | Người trực tiếp nộp hồ sơ giấy. |
| Loại yêu cầu | Enum(String(100)) | Có | Theo hồ sơ tiếp nhận | Xác định khối nhập liệu nghiệp vụ được mở khi Cán bộ chọn "Tạo hồ sơ". |
| Ngày tiếp nhận | Datetime | Có | Theo hồ sơ tiếp nhận | Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Trạng thái lệ phí | Enum(String(50)) | Có | Theo thông tin thu phí | Hiển thị dạng nhãn trạng thái (Badge), gồm:<br>- "Đã thu"<br>- "Miễn phí" |
|  Số tiền đã thu | Decimal(18,0) | Có | Theo thông tin thu phí | Hiển thị số tiền đã thu; trường hợp miễn phí hiển thị "Miễn phí". |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Theo hồ sơ | Hiển thị dạng nhãn trạng thái (Badge), gồm:<br>- "Chờ giải quyết"<br>- "Bị trả lại" |
| Cán bộ tiếp nhận | String(255) | Có | Theo hồ sơ tiếp nhận | Họ và tên Cán bộ đã tiếp nhận hồ sơ giấy. |
| Thao tác | - | - | - | - Control UI: Nút trên dòng dữ liệu.<br>- Gồm:<br>- Tạo hồ sơ<br>- Từ chối |

##### 4.3.2.17.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Khoảng ngày không hợp lệ): "Từ ngày tiếp nhận" lớn hơn "Đến ngày tiếp nhận". Vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007] dạng Inline dưới ô nhập tương ứng. Không thực hiện tìm kiếm. |
|  |  |  | TH2 (Không có dữ liệu trả về): Hệ thống hiển thị:<br>+ Bảng kết quả: 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
|  |  |  | TH Hợp lệ: Hệ thống tìm kiếm hồ sơ chờ nhập liệu theo điều kiện lọc và phạm vi quyền dữ liệu của Cán bộ, hiển thị kết quả lên bảng danh sách. |
| 2 | Xóa bộ lọc | Nút | Đưa toàn bộ tiêu chí lọc về giá trị mặc định và tải lại danh sách hồ sơ chờ nhập liệu. |
| 3 | Click dòng dữ liệu | Row Click | Mở [MH02 - Màn hình Xem chi tiết hồ sơ chờ nhập liệu](#432173-mh02---man-hinh-xem-chi-tiet-ho-so-cho-nhap-lieu). |
| 4 | Tạo hồ sơ | Nút | Hệ thống xác định Loại yêu cầu của dòng hồ sơ và mở [MH03 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký](#432174-mh03---man-hinh-nhap-lieu-ho-so-giay-phieu-dang-ky) với khối nhập liệu nghiệp vụ tương ứng. |
| 5 | Từ chối | Nút | Hiển thị trên dòng dữ liệu tại cột Thao tác, theo quyền của Cán bộ giải quyết. |
|  |  |  | TH1 (Hồ sơ không còn đủ điều kiện xử lý): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại". Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở popup từ chối. |
|  |  |  | TH2 (Bỏ trống Lý do từ chối): Vi phạm [BR-DK-025]. Hệ thống tô viền đỏ ô trống và hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập. Không thực hiện từ chối. |
|  |  |  | TH3 (File căn cứ không hợp lệ): File không đúng định dạng `.pdf` hoặc vượt quá 20MB. Vi phạm [BR-FILE-010], hiển thị [MSG-ERR-FILE-010] dạng Inline dưới ô đính kèm. Không thực hiện từ chối. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>- Mở popup Từ chối hồ sơ gồm:<br>+ `Lý do từ chối`: Control UI Textarea, Text(2000), bắt buộc nhập theo [BR-DK-025].<br>+ `File căn cứ`: Control UI Nút chọn tệp, không bắt buộc, cho phép đính kèm 01 file theo [BR-FILE-010].<br>+ 02 nút "Xác nhận" và "Hủy".<br>- Chọn "Hủy": đóng popup, giữ nguyên trạng thái hồ sơ.<br>- Chọn "Xác nhận": hiển thị thông báo xác nhận [MSG-CFM-DK-015]. Sau khi Cán bộ đồng ý, hệ thống lưu Lý do từ chối và File căn cứ, ghi nhận Cán bộ từ chối và thời điểm từ chối, chuyển hồ sơ sang trạng thái "Bị từ chối", loại hồ sơ khỏi danh sách chờ nhập liệu và hiển thị [MSG-SUC-DK-KT-003]. |

#### 4.3.2.17.3. MH02 - Màn hình Xem chi tiết hồ sơ chờ nhập liệu

##### 4.3.2.17.3.1. Màn hình

![Xem chi tiết hồ sơ chờ nhập liệu](images/MH02_Xem_chi_tiet_ho_so_cho_nhap_lieu.png)

##### 4.3.2.17.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề màn hình | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo cấu trúc "Chi tiết hồ sơ chờ nhập liệu: `Mã hồ sơ`". |
| **Khối Thông tin tiếp nhận** | - | - | - | |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số đơn giấy | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Nguồn tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Kênh tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Thời điểm tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Đơn vị tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Cán bộ tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| **Khối Thông tin người yêu cầu** | - | - | - | |
| Loại khách hàng | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Mã tài khoản trực tuyến | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại khách hàng` = "Có tài khoản trực tuyến". |
| Họ tên/Tên tổ chức | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số điện thoại | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Email | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Quốc gia | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Tỉnh/thành phố | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Phường/Xã | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Địa chỉ chi tiết | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Ghi chú tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| **Khối Thông tin người nộp hồ sơ** | - | - | - | |
| Họ tên | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Giấy tờ định danh | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số điện thoại | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Email | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Quan hệ với người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Phương thức nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Địa chỉ nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Phương thức nhận kết quả` = "Qua dịch vụ bưu chính". |
| Email nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Phương thức nhận kết quả` = "Cách thức điện tử". |
| **Khối Thông tin loại yêu cầu và lệ phí** | - | - | - | |
| Loại yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Xác định khối nhập liệu nghiệp vụ được mở khi Cán bộ chọn "Tạo hồ sơ". |
| Tham số tính phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Tên khoản phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Mã khoản phải thu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số tiền phải thu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số tiền đã thu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Hình thức thu phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số biên lai/chứng từ | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Thời điểm thu phí/xác nhận miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Cán bộ thu phí/xác nhận miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Đối tượng miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi hồ sơ có ghi nhận đối tượng miễn phí. |
| Lý do miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Trạng thái lệ phí` = "Miễn phí". |
| Trạng thái lệ phí | - | - | - | Control UI: Badge trạng thái, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Trạng thái hồ sơ | - | - | - | Control UI: Badge trạng thái, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| **Khối Tài liệu đính kèm** | - | - | - | Control UI: Bảng dữ liệu 4 cột (`STT`, `Tên tài liệu`, `File đính kèm`, `Thao tác`), chỉ đọc.<br>- Ẩn toàn bộ nút `Tải lên` và liên kết `Xóa`. |
| STT | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Tên tài liệu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| File đính kèm | - | - | - | Control UI: Label kèm icon định dạng tệp, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị dấu `-` nếu dòng tài liệu chưa có tệp đính kèm. |
| Thao tác | - | - | - | Control UI: Nhóm liên kết thao tác trên dòng, hiển thị trên cùng một dòng.<br>- Gồm `Xem file` và `Tải tệp`, chỉ hiển thị khi dòng tài liệu đã có tệp đính kèm.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **Khối Lịch sử trạng thái** | - | - | - | Control UI: Danh sách dòng lịch sử, chỉ đọc. |
| Thời điểm | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Trạng thái | - | - | - | Control UI: Badge trạng thái, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Nội dung xử lý | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |

##### 4.3.2.17.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Liên kết | Hệ thống mở nội dung tệp tin đính kèm của dòng tài liệu trong một tab mới của trình duyệt. |
| 2 | Tải tệp | Liên kết | Hệ thống tải tệp tin đính kèm của dòng tài liệu về máy người dùng, giữ nguyên tên tệp và định dạng gốc đã đính kèm. |
| 3 | Tạo hồ sơ | Nút | TH1 (Hồ sơ không còn đủ điều kiện nhập liệu): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại" hoặc `Trạng thái lệ phí` không còn là "Đã thu"/"Miễn phí". Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở màn hình nhập liệu. |
|  |  |  | TH Hợp lệ: Hệ thống xác định `Loại yêu cầu` của hồ sơ và mở [MH03 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký](#432174-mh03---man-hinh-nhap-lieu-ho-so-giay-phieu-dang-ky) với khối nhập liệu nghiệp vụ tương ứng. |
| 4 | Từ chối | Nút | TH1 (Hồ sơ không còn đủ điều kiện xử lý): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại". Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở popup từ chối. |
|  |  |  | TH2 (Bỏ trống Lý do từ chối): Vi phạm [BR-DK-025]. Hệ thống tô viền đỏ ô trống và hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập. Không thực hiện từ chối. |
|  |  |  | TH3 (File căn cứ không hợp lệ): File không đúng định dạng `.pdf` hoặc vượt quá 20MB. Vi phạm [BR-FILE-010], hiển thị [MSG-ERR-FILE-010] dạng Inline dưới ô đính kèm. Không thực hiện từ chối. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>- Mở popup Từ chối hồ sơ gồm:<br>+ `Lý do từ chối`: Control UI Textarea, Text(2000), bắt buộc nhập theo [BR-DK-025].<br>+ `File căn cứ`: Control UI Nút chọn tệp, không bắt buộc, cho phép đính kèm 01 file theo [BR-FILE-010].<br>+ 02 nút "Xác nhận" và "Hủy".<br>- Chọn "Hủy": đóng popup, giữ nguyên trạng thái hồ sơ.<br>- Chọn "Xác nhận": hiển thị thông báo xác nhận [MSG-CFM-DK-015]. Sau khi Cán bộ đồng ý, hệ thống lưu Lý do từ chối và File căn cứ, ghi nhận Cán bộ từ chối và thời điểm từ chối, chuyển hồ sơ sang trạng thái "Bị từ chối" và hiển thị [MSG-SUC-DK-KT-003]. |
|  |  |  | Sau khi hồ sơ chuyển sang trạng thái "Bị từ chối", hệ thống ẩn toàn bộ nút thao tác nghiệp vụ trên màn hình chi tiết (bao gồm "Tạo hồ sơ" và "Từ chối"), chỉ cho phép xem thông tin và đóng màn hình. Hồ sơ không còn hiển thị trong danh sách hồ sơ chờ nhập liệu. |
| 5 | Đóng | Nút | Hệ thống đóng màn hình chi tiết và quay về [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu](#432172-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu), giữ nguyên điều kiện tìm kiếm trước đó. |

#### 4.3.2.17.4. MH03 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký

##### 4.3.2.17.4.1. Màn hình

![Nhập liệu hồ sơ giấy Phiếu đăng ký](images/MH03_Nhap_lieu_ho_so_giay_Phieu_dang_ky.png)

##### 4.3.2.17.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin tiếp nhận và thu phí** | | | | |
| Khối Thông tin tiếp nhận và thu phí | Text(1000) | Có | Thu gọn | - Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Mặc định thu gọn, cho phép mở rộng.<br>- Toàn bộ dữ liệu chỉ đọc. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc.<br>- Mã hồ sơ giấy do hệ thống sinh khi tiếp nhận. |
| Số đơn giấy | String(50) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc. |
| Thời điểm tiếp nhận | Datetime | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Cán bộ tiếp nhận | String(255) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc. |
| Loại yêu cầu | Enum(String(100)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc.<br>- Lấy theo thông tin hồ sơ. |
| Số biên lai/chứng từ | String(50) | Không | Theo hồ sơ tiếp nhận| - Control UI: Label.<br>- Chỉ đọc. |
| Loại tài khoản | Decimal(18,0) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc. |
| Tài liệu tiếp nhận | File | Không | Theo hồ sơ tiếp nhận | - Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Mặc định thu gọn, cho phép mở rộng chứa Danh sách link file kèm biểu tượng Tải xuống.<br>- Chỉ đọc.<br>- Cho phép xem file tại một tab riêng.<br>- Cho phép tải xuống theo quyền. |
| **II. Thông tin trả lại** | | | | |
| Khối Thông tin trả lại | Text(1000) | Không | Ẩn | - Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Chỉ hiển thị khi hồ sơ đang ở trạng thái "Bị trả lại". Hiển thị lần lượt danh sách các lần bị trả lại. Sắp xếp theo thứ tự thời điểm trả lại giảm dần. Mỗi khối thông tin trả lại gồm:|
| Lý do trả lại | Text(2000) | Có | Theo hồ sơ | - Control UI: Label <br>- Chỉ đọc. |
| Lãnh đạo trả lại | String(255) | Có | Theo hồ sơ | - Control UI: Label.<br>- Chỉ đọc. |
| Thời điểm trả lại | Datetime | Có | Theo hồ sơ | - Control UI: Label.<br>- Chỉ đọc.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| **III. Tra cứu hồ sơ tham chiếu** | | | | |
| *Khối Tra cứu hồ sơ tham chiếu* | - | Không | Ẩn | - Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Chỉ hiển thị khi Loại yêu cầu là:<br>- "Đăng ký thay đổi"<br>- "Xóa đăng ký"<br>- "Thông báo xử lý tài sản bảo đảm lần đầu"<br>- "Thay đổi thông báo xử lý tài sản bảo đảm"<br>- "Xóa đăng ký thông báo xử lý tài sản bảo đảm" <br> - Bao gồm thông tin: <br>+ `Số đăng ký lần đầu` <br>+ Nút `Tra cứu`|
| Số đăng ký lần đầu | String(50) | Có | Trống | - Control UI: Textbox. <br> - Hệ thống Tự động trim space theo [BR-VAL-001]. |
| Tra cứu | - | Có | - | - Control UI: Button |
| **IV. Chi tiết Nhập liệu hồ sơ** | | | | |
| Khối Chi tiết hồ sơ Phiếu đăng ký | -| Có | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Hiển thị màn hình nhập liệu nghiệp vụ tương ứng theo từng Loại yêu cầu. Giữ nguyên cấu trúc trường dữ liệu, điều kiện hiển thị, điều kiện bắt buộc, bảng con, popup và quy tắc kiểm tra của màn hình nguồn. <br> - Tại các màn hình nhập liệu thì Hệ thống tự động điền sẵn ` Cơ quan tiếp nhận` dựa trên Thông tin Hồ sơ tiếp nhận đã nhập. Tự động ghi nhận thông tin Người yêu cầu đăng ký theo thông tin Hồ sơ tiếp nhận đã nhập liệu.|
| Thêm Người đăng ký làm Bên bảo đảm | - | Không | Theo màn hình nguồn | - Control UI: Nút có tên động.<br>- Hiển thị tại Bảng Bên bảo đảm của màn hình nhập liệu Loại yêu cầu "Đăng ký lần đầu" và "Đăng ký thay đổi".<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Thêm Người đăng ký làm Bên nhận bảo đảm | - | Không | Theo màn hình nguồn | - Control UI: Nút có tên động.<br>- Hiển thị tại Bảng Bên nhận bảo đảm của màn hình nhập liệu Loại yêu cầu "Đăng ký lần đầu" và "Đăng ký thay đổi".<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **Nếu Loại yêu cầu là "Đăng ký lần đầu"** | | | | |
| Màn hình nhập liệu Đăng ký lần đầu | - | Có | Hiển thị | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Hiển thị ngay khi mở màn hình, không phụ thuộc kết quả tra cứu.<br>- Hiển thị các trường thông tin giống [Màn hình Nhập liệu Đăng ký mới BPBĐ - Đăng ký mới Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd)|
| **Nếu Loại yêu cầu là "Đăng ký thay đổi"** | | | | |
| Màn hình nhập liệu Đăng ký thay đổi | - | Không | Ẩn | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Chỉ hiển thị sau khi Cán bộ bấm "Tra cứu" tại Khối III và hệ thống trả về hồ sơ tham chiếu hợp lệ.<br>- Hiển thị giống [Màn hình Nhập thông tin đăng ký thay đổi - Đăng ký thay đổi Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_thay_doi_BPBD.md#4123-uc0025mh02---man-hinh-nhap-thong-tin-dang-ky-thay-doi).<br>- Hệ thống tự động điền sẵn các giá trị trên màn hình theo thông tin tương ứng của Hồ sơ tra cứu được. |
| **Nếu Loại yêu cầu là "Xóa đăng ký"** | | | | |
| Màn hình nhập liệu Xóa đăng ký | - | Không | Ẩn | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Chỉ hiển thị sau khi Cán bộ bấm "Tra cứu" tại Khối III và hệ thống trả về hồ sơ tham chiếu hợp lệ.<br>- Hiển thị giống [Màn hình Nhập thông tin xóa đăng ký - Xóa đăng ký Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Xoa_dang_ky_BPBD.md#4133-uc026mh02---man-hinh-nhap-thong-tin-xoa-dang-ky).<br>- Dữ liệu hồ sơ gốc/đăng ký thay đổi gần nhất được tự động điền vào form.  |
| **Nếu Loại yêu cầu là "Thông báo xử lý tài sản bảo đảm lần đầu (Trường hợp chưa đăng ký BPBĐ)"** | | | | |
| Màn hình nhập liệu Thông báo xử lý tài sản bảo đảm lần đầu (Trường hợp chưa đăng ký BPBĐ) | - | Có | Hiển thị | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Hiển thị ngay khi mở màn hình, không phụ thuộc kết quả tra cứu.<br>- Hiển thị giống [Màn hình Nhập thông tin đăng ký thông báo xử lý lần đầu - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41531-uc1311mh02---man-hinh-nhap-thong-tin-dang-ky-thong-bao-xu-ly-lan-dau).<br>- Các thông tin hiển thị mặc định trống để cán bộ nhập liệu. |
| **Nếu Loại yêu cầu là "Thông báo xử lý tài sản bảo đảm lần đầu"** | | | | |
| Màn hình nhập liệu Thông báo xử lý tài sản bảo đảm lần đầu | - | Không | Ẩn | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Chỉ hiển thị sau khi Cán bộ bấm "Tra cứu" tại Khối III và hệ thống trả về hồ sơ tham chiếu hợp lệ.<br>- Hiển thị giống [Màn hình Nhập thông tin đăng ký thông báo xử lý lần đầu - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41531-uc1311mh02---man-hinh-nhap-thong-tin-dang-ky-thong-bao-xu-ly-lan-dau).<br>- Dữ liệu hồ sơ gốc được tự động điền vào form.<br>- Danh sách tài sản bảo đảm được tự động điền để Cán bộ tích chọn tài sản xử lý. |
| **Nếu Loại yêu cầu là "Thay đổi thông báo xử lý tài sản bảo đảm"** | | | | |
| Màn hình nhập liệu Thay đổi thông báo xử lý tài sản bảo đảm | - | Không | Ẩn | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Chỉ hiển thị sau khi Cán bộ bấm "Tra cứu" tại Khối III và hệ thống trả về hồ sơ tham chiếu hợp lệ.<br>- Hiển thị giống [Màn hình Nhập thông tin thay đổi thông báo xử lý - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41541-uc1312mh02---man-hinh-nhap-thong-tin-thay-doi-thong-bao-xu-ly).<br>- Dữ liệu thông báo có hiệu lực gần nhất được tự động điền vào form. |
| **Nếu Loại yêu cầu là "Xóa đăng ký thông báo xử lý tài sản bảo đảm"** | | | | |
| Màn hình nhập liệu Xóa đăng ký thông báo xử lý tài sản bảo đảm | - | Không | Ẩn | - Control UI: Khối nhúng màn hình nhập liệu nghiệp vụ.<br>- Chỉ hiển thị sau khi Cán bộ bấm "Tra cứu" tại Khối III và hệ thống trả về hồ sơ tham chiếu hợp lệ.<br>- Hiển thị giống [Màn hình Nhập thông tin xóa thông báo xử lý - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41551-uc1313mh02---man-hinh-nhap-thong-tin-xoa-thong-bao-xu-ly).<br>- Dữ liệu thông báo đang có hiệu lực được tự động điền vào form.|
##### 4.3.2.17.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tra cứu | Nút | Chỉ hiển thị tại Khối III khi Loại yêu cầu cần hồ sơ tham chiếu theo [BR-DK-036]. |
|  |  |  | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001]. Hệ thống tô viền đỏ ô trống và hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập tương ứng. Không thực hiện tra cứu. |
|  |  |  | TH2 (Không tìm thấy hồ sơ theo số đăng ký đã nhập): Vi phạm [BR-DK-036], hiển thị [MSG-ERR-DK-014] dạng Inline tại Khối III. |
|  |  |  | TH3 (Hồ sơ tham chiếu chưa ở trạng thái "Hoàn thành"): Vi phạm [BR-DK-020], hiển thị [MSG-ERR-DK-002]. |
|  |  |  | TH4 (Hồ sơ tham chiếu bị ngăn chặn/tạm dừng giao dịch): Vi phạm [BR-DK-021], hiển thị [MSG-ERR-DK-003]. |
|  |  |  | TH5 (Tồn tại hồ sơ liên quan đang xử lý): Vi phạm [BR-DK-022], hiển thị [MSG-ERR-DK-004]. |
|  |  |  | TH6 (Không thỏa điều kiện loại thông báo xử lý tài sản): Vi phạm [BR-DK-023], hiển thị [MSG-ERR-DK-006] hoặc [MSG-ERR-DK-007] theo tình huống. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>+ Hiển thị Khối IV - Chi tiết Nhập liệu hồ sơ tương ứng với Loại yêu cầu của hồ sơ.<br>+ Tự động điền dữ liệu hồ sơ gốc/thông báo gốc vào Khối IV.<br>+ Đưa con trỏ vào trường nhập liệu đầu tiên cần Cán bộ bổ sung. |
|  |  |  | TH7 (Cán bộ sửa lại "Số đăng ký lần đầu" sau khi đã tra cứu thành công): Hệ thống thực hiện tra cứu theo các TH đã nêu ở trên. |
| 2 | Thêm Người đăng ký làm Bên bảo đảm | Nút | - Hiển thị tại Bảng Bên bảo đảm của màn hình nhập liệu Loại yêu cầu "Đăng ký lần đầu" và "Đăng ký thay đổi".<br>- Nhãn tên động và quy tắc ẩn/hiện áp dụng đúng theo quy định đã nêu tại [Màn hình Nhập liệu Đăng ký mới BPBĐ - Đăng ký mới Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd) và [Màn hình Nhập thông tin đăng ký thay đổi - Đăng ký thay đổi Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_thay_doi_BPBD.md#4123-uc0025mh02---man-hinh-nhap-thong-tin-dang-ky-thay-doi): nút chỉ hiển thị ở lần nhập liệu đầu tiên, sau khi Cán bộ click 01 lần thì ẩn nút.<br>- Xử lý khi click nút: Hệ thống tự động điền dữ liệu của Người yêu cầu đăng ký theo thông tin Hồ sơ tiếp nhận đã nhập vào các trường Tên, Quốc gia [DM_01], Tỉnh/Thành phố [DM_02], Quận/Huyện [DM_03], Phường/Xã [DM_04], Địa chỉ chi tiết; cho phép Cán bộ chỉnh sửa lại dòng vừa thêm theo đúng hồ sơ giấy. |
| 3 | Thêm Người đăng ký làm Bên nhận bảo đảm | Nút | - Hiển thị tại Bảng Bên nhận bảo đảm của màn hình nhập liệu Loại yêu cầu "Đăng ký lần đầu" và "Đăng ký thay đổi".<br>- Nhãn tên động và quy tắc ẩn/hiện áp dụng đúng theo quy định đã nêu tại [Màn hình Nhập liệu Đăng ký mới BPBĐ - Đăng ký mới Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd) và [Màn hình Nhập thông tin đăng ký thay đổi - Đăng ký thay đổi Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_thay_doi_BPBD.md#4123-uc0025mh02---man-hinh-nhap-thong-tin-dang-ky-thay-doi): nút chỉ hiển thị ở lần nhập liệu đầu tiên, sau khi Cán bộ click 01 lần thì ẩn nút.<br>- Xử lý khi click nút: Hệ thống tự động điền dữ liệu của Người yêu cầu đăng ký theo thông tin Hồ sơ tiếp nhận đã nhập vào các trường Tên, Quốc gia [DM_01], Tỉnh/Thành phố [DM_02], Quận/Huyện [DM_03], Phường/Xã [DM_04], Địa chỉ chi tiết; cho phép Cán bộ chỉnh sửa lại dòng vừa thêm theo đúng hồ sơ giấy. |
| 4 | Tiếp tục | Nút | TH1 (Dữ liệu chưa hợp lệ): Hệ thống kiểm tra theo quy tắc của màn hình nhập liệu Website khách hàng tương ứng với Loại yêu cầu; nếu vi phạm, hiển thị lỗi tại trường/khối tương ứng theo Business Rule và MessageList đã tham chiếu trong tài liệu nguồn. Không mở màn hình Xem trước. |
|  |  |  | TH2 (Loại yêu cầu cần hồ sơ tham chiếu nhưng chưa tra cứu thành công hoặc dữ liệu tham chiếu đã hết hiệu lực khi kiểm tra lại): Vi phạm [BR-DK-036], hiển thị [MSG-ERR-DK-014], [MSG-ERR-DK-002], [MSG-ERR-DK-003] hoặc [MSG-ERR-DK-004] theo tình huống. Không mở màn hình Xem trước. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>+ Ghi nhận thông tin Người yêu cầu đăng ký của hồ sơ theo đúng thông tin Người yêu cầu đã nhập tại Hồ sơ tiếp nhận, không lấy theo tài khoản Cán bộ đang thao tác.<br>+ Mở [MH04 - Màn hình Xem trước hồ sơ giấy Phiếu đăng ký](#432175-mh04---man-hinh-xem-truoc-ho-so-giay-phieu-dang-ky).<br>+ Giữ nguyên trạng thái hồ sơ là "Chờ giải quyết" hoặc "Bị trả lại". |
| 5 | Hủy bỏ | Nút | TH1 (Cán bộ chưa nhập hoặc chưa thay đổi dữ liệu nào): Hệ thống đóng màn hình nhập liệu và quay về màn hình nguồn đã mở hồ sơ, không hiển thị thông báo xác nhận. |
|  |  |  | TH Hợp lệ: Cán bộ đã nhập hoặc thay đổi dữ liệu nhưng chưa được lưu. Hệ thống thực hiện:<br>+ Hiển thị popup xác nhận [MSG-CFM-UCPS-001] - *"Dữ liệu đang nhập chưa được lưu. Bạn có chắc chắn muốn hủy bỏ?"* gồm 02 nút "Đồng ý" và "Hủy".<br>+ Chọn "Đồng ý": Hệ thống hủy toàn bộ dữ liệu đang nhập, đóng màn hình nhập liệu, quay về màn hình nguồn đã mở hồ sơ và giữ nguyên trạng thái hồ sơ.<br>+ Chọn "Hủy": Hệ thống đóng popup, ở lại màn hình nhập liệu và giữ nguyên toàn bộ dữ liệu đang nhập. |

#### 4.3.2.17.5. MH04 - Màn hình Xem trước hồ sơ giấy Phiếu đăng ký

##### 4.3.2.17.5.1. Màn hình

![Xem trước hồ sơ giấy Phiếu đăng ký](images/MH04_Xem_truoc_ho_so_giay_Phieu_dang_ky.png)

##### 4.3.2.17.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Khối Xem trước chi tiết Phiếu đăng ký | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị lại dữ liệu Cán bộ đã nhập ở bước trước dưới dạng chỉ đọc.<br>- Hiển thị đúng màn hình xem trước Website khách hàng tương ứng với Loại yêu cầu của hồ sơ.<br>- Không cho phép sửa/xóa dữ liệu trên màn hình này. |
| **Nếu Loại yêu cầu là "Đăng ký lần đầu"** | | | | |
| Màn hình xem trước Đăng ký lần đầu | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị giống [Màn hình Xem trước (Review) - Đăng ký mới Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_moi_BPBD.md#4113-uc024mh02---man-hinh-xem-truoc-review). |
| **Nếu Loại yêu cầu là "Đăng ký thay đổi"** | | | | |
| Màn hình xem trước Đăng ký thay đổi | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị giống [Màn hình Xem trước (Review) - Đăng ký thay đổi Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_thay_doi_BPBD.md#4124-uc0025mh03---man-hinh-xem-truoc-review). |
| **Nếu Loại yêu cầu là "Xóa đăng ký"** | | | | |
| Màn hình xem trước Xóa đăng ký | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị giống [Màn hình Xem trước (Review) - Xóa đăng ký Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Xoa_dang_ky_BPBD.md#4134-uc026mh03---man-hinh-xem-truoc-review). |
| **Nếu Loại yêu cầu là "Thông báo xử lý tài sản bảo đảm lần đầu (Trường hợp chưa đăng ký BPBĐ)"** | | | | |
| Màn hình xem trước Thông báo xử lý tài sản bảo đảm lần đầu (Trường hợp chưa đăng ký BPBĐ) | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị giống [Màn hình Xem trước (Review) đăng ký lần đầu - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41534-uc1311mh03---man-hinh-xem-truoc-review-dang-ky-lan-dau). |
| **Nếu Loại yêu cầu là "Thông báo xử lý tài sản bảo đảm lần đầu"** | | | | |
| Màn hình xem trước Thông báo xử lý tài sản bảo đảm lần đầu | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị giống [Màn hình Xem trước (Review) đăng ký lần đầu - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41534-uc1311mh03---man-hinh-xem-truoc-review-dang-ky-lan-dau). |
| **Nếu Loại yêu cầu là "Thay đổi thông báo xử lý tài sản bảo đảm"** | | | | |
| Màn hình xem trước Thay đổi thông báo xử lý tài sản bảo đảm | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị giống [Màn hình Xem trước (Review) thay đổi thông báo xử lý - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41544-uc1312mh03---man-hinh-xem-truoc-review-thay-doi-thong-bao-xu-ly). |
| **Nếu Loại yêu cầu là "Xóa đăng ký thông báo xử lý tài sản bảo đảm"** | | | | |
| Màn hình xem trước Xóa đăng ký thông báo xử lý tài sản bảo đảm | Label | Không | Theo Loại yêu cầu | - Control UI: Khối nhúng màn hình xem trước, chỉ đọc.<br>- Hiển thị giống [Màn hình Xem trước (Review) xóa thông báo xử lý - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41554-uc1313mh03---man-hinh-xem-truoc-review-xoa-thong-bao-xu-ly). |

##### 4.3.2.17.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | Quay về [MH03 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký](#432174-mh03---man-hinh-nhap-lieu-ho-so-giay-phieu-dang-ky) và giữ nguyên toàn bộ dữ liệu Cán bộ đã nhập. |
| 2 | Gửi duyệt | Nút | TH Hợp lệ: Hệ thống thực hiện:<br>- Lưu dữ liệu nghiệp vụ và khóa phiên bản dữ liệu đã duyệt.<br>- Ghi nhận các thông tin:<br>+ `Nguồn tiếp nhận` là "Trực tiếp".<br>+ `Cán bộ xử lý` là Họ và tên Cán bộ nhập liệu đang thực hiện thao tác.<br>+ `Mã khách hàng`:<br>* Nếu `Loại khách hàng` là "Có tài khoản trực tuyến": ghi nhận Mã khách hàng là Mã tài khoản trực tuyến của Người yêu cầu đăng ký.<br>* Nếu `Loại khách hàng` là "Khách hàng vãng lai": ghi nhận Mã khách hàng là "Vãng lai".<br>+ Ghi nhận `Thời điểm đăng ký` là ngày giờ hiện tại của hệ thống tại thời điểm thực hiện thành công, lưu đầy đủ theo định dạng dd/mm/yyyy hh:mm:ss.<br>- Thực hiện cấp `Số đăng ký` cho hồ sơ. Cấp `Mã PIN` cho hồ sơ (chỉ áp dụng khi Loại yêu cầu là "Đăng ký lần đầu" hoặc "Thông báo xử lý tài sản bảo đảm lần đầu (Trường hợp chưa đăng ký BPBĐ)"; các Loại yêu cầu còn lại không cấp Mã PIN).<br>- Chuyển hồ sơ sang trạng thái "Chờ duyệt", đóng màn hình xem trước, quay về [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu](#432172-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu) và hiển thị thông báo thành công [MSG-SUC-DK-KT-002] dạng Toast. |