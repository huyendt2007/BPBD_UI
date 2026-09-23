### 4.3.2.19. Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin

#### 4.3.2.19.1. Mục đích

\- Cho phép Cán bộ giải quyết hồ sơ nhập dữ liệu nghiệp vụ Yêu cầu cung cấp thông tin từ hồ sơ giấy đã được tiếp nhận và đã hoàn tất thu phí/miễn phí tại quầy, thực hiện tra cứu theo tiêu chí (Số đăng ký, Bên bảo đảm, Số khung), kiểm tra kết quả tra cứu, đối soát dữ liệu và văn bản kết quả dự thảo, gửi duyệt hồ sơ.

\- Chức năng gồm 03 màn hình: Danh sách hồ sơ chờ nhập liệu, Xem chi tiết hồ sơ chờ nhập liệu và Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin.

\- Danh sách hồ sơ chờ nhập liệu tại chức năng này chỉ hiển thị hồ sơ giấy có Loại yêu cầu là "Yêu cầu cung cấp thông tin". Hồ sơ giấy của các nhóm nghiệp vụ khác được mô tả tại [Hồ sơ chờ nhập liệu - Website quản trị](SRS_Ho_so_cho_nhap_lieu.md).

\- Chức năng này áp dụng cho thủ tục "Yêu cầu cung cấp thông tin về biện pháp bảo đảm" theo quy định tại Nghị định số 99/2022/NĐ-CP (Phiếu yêu cầu theo Mẫu số 09d; Văn bản cung cấp thông tin về biện pháp bảo đảm theo Mẫu số 13).

\- Cán bộ nhập liệu được phép nhập/chỉnh sửa thông tin Người yêu cầu, Địa chỉ liên hệ, Phương thức nhận kết quả, Tiêu chí tra cứu và Dữ liệu tra cứu khi hồ sơ ở trạng thái "Chờ giải quyết" hoặc "Bị trả lại" theo [BR-CCTT-008], [BR-CCTT-009].

\- Quy định về thẩm quyền và phạm vi tra cứu: Hệ thống thực hiện tra cứu trực tiếp toàn bộ dữ liệu trên Cơ sở dữ liệu quốc gia về biện pháp bảo đảm trên phạm vi toàn quốc, không giới hạn thẩm quyền theo đơn vị tiếp nhận hồ sơ gốc. Cán bộ của bất kỳ Trung tâm đăng ký nào cũng có quyền tra cứu và cấp Văn bản cung cấp thông tin theo đúng quy định.

*a. Phân quyền*

\- NSD có vai trò Cán bộ giải quyết hồ sơ: Được phép mở hồ sơ giấy chờ nhập liệu, xem thông tin tiếp nhận/thu phí, nhập/cập nhật tiêu chí tra cứu và dữ liệu tra cứu, thực hiện tra cứu trên CSDL quốc gia, xem kết quả tra cứu và file PDF dự thảo, gửi duyệt hồ sơ, gửi duyệt lại hồ sơ bị trả lại và từ chối hồ sơ giấy trước khi gửi duyệt.
*b. Điều kiện thực hiện*

\- NSD đã đăng nhập Website quản trị và có quyền nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin.

\- Hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" và Loại yêu cầu là "Yêu cầu cung cấp thông tin".

\- Hồ sơ đang ở trạng thái "Chờ giải quyết" hoặc "Bị trả lại".

\- Hồ sơ có Trạng thái lệ phí là "Đã thu" hoặc "Miễn phí" theo [BR-UCPS-001] và [BR-UCPS-006].


#### 4.3.2.19.2. MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu

##### 4.3.2.19.2.1. Màn hình

![Danh sách hồ sơ chờ nhập liệu](images/CCTT_MH01_Danh_sach_ho_so_cho_nhap_lieu.png)

##### 4.3.2.19.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ | String(50) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Mã hồ sơ giấy, không phân biệt hoa thường, tự động trim space. |
| Số đơn giấy | String(50) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Số đơn giấy ghi nhận tại bước tiếp nhận. |
| Người yêu cầu | String(255) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường. |
| Tiêu chí tra cứu | Enum(String(50)) | Không | "Tất cả" | - Control UI: Dropdown list.<br>Gồm:<br>+ Tất cả<br>+ Số đăng ký<br>+ Bên bảo đảm<br>+ Số khung |
| Trạng thái lệ phí | Enum(String(50)) | Không | "Tất cả" | - Control UI: Dropdown list.<br>Gồm:<br>+ Tất cả<br>+ Đã thu<br>+ Miễn phí |
| Cán bộ tiếp nhận | String(255) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Họ và tên Cán bộ tiếp nhận. |
| Từ ngày tiếp nhận | Date | Không | Ngày 01 của tháng hiện tại | - Control UI: Datepicker.<br>- Lọc theo Thời điểm tiếp nhận.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Tuân thủ [BR-VAL-007]. |
| Đến ngày tiếp nhận | Date | Không | Ngày hiện tại | - Control UI: Datepicker.<br>- Lọc theo Thời điểm tiếp nhận.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Tuân thủ [BR-VAL-007]. |
| Tìm kiếm | - | Không | - | - Control UI: Button.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Xóa bộ lọc | - | Không | - | - Control UI: Button.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **II. Bảng danh sách hồ sơ chờ nhập liệu** | - | Có | 20 bản ghi/trang | - Control UI: Bảng dữ liệu (Grid) kèm phân trang.<br>- Chỉ hiển thị hồ sơ giấy có Loại yêu cầu là "Yêu cầu cung cấp thông tin", trạng thái "Chờ giải quyết" hoặc "Bị trả lại" và Trạng thái lệ phí là "Đã thu" hoặc "Miễn phí" theo [BR-UCPS-001].<br>- Chỉ hiển thị hồ sơ trong phạm vi đơn vị của Cán bộ đăng nhập.<br>- Sắp xếp mặc định theo Ngày tiếp nhận giảm dần.<br>- Phân trang 20 bản ghi/trang.<br>- Trạng thái không có dữ liệu: hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]. |
| STT | Integer(10) | Có | Theo trang | Số thứ tự dòng trên trang kết quả. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. |
| Số đơn giấy | String(50) | Có | Theo hồ sơ tiếp nhận | Chỉ đọc. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ tiếp nhận | Tên cá nhân/tổ chức yêu cầu cung cấp thông tin. |
| Mã khách hàng | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu `Loại khách hàng` là "Có tài khoản trực tuyến": Thì hiển thị Mã khách hàng đã nhập theo dữ liệu đã nhập.<br>* Nếu `Loại khách hàng` là "Khách hàng vãng lai": thì hiển thị "Vãng lai" |
| Ngày tiếp nhận | Datetime | Có | Theo hồ sơ tiếp nhận | Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Trạng thái lệ phí | Enum(String(50)) | Có | Theo thông tin thu phí | - Control UI: Label dạng nhãn trạng thái (Badge).<br>Gồm:<br>+ Đã thu<br>+ Miễn phí |
| Số tiền đã thu (VNĐ) | Decimal(18,0) | Có | Theo thông tin thu phí | Hiển thị số tiền đã thu (VNĐ); trường hợp miễn phí hiển thị "Miễn phí". |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Theo hồ sơ | - Control UI: Label dạng nhãn trạng thái (Badge).|
| Cán bộ tiếp nhận | String(255) | Có | Theo hồ sơ tiếp nhận | Họ và tên Cán bộ đã tiếp nhận hồ sơ giấy. |
| Thao tác | - | - | - | - Control UI: Icon <br> - Nút `Tạo hồ sơ` |

##### 4.3.2.19.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Khoảng ngày không hợp lệ): "Từ ngày tiếp nhận" lớn hơn "Đến ngày tiếp nhận". Vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007] dạng Inline dưới ô nhập tương ứng. Không thực hiện tìm kiếm.<br><br>TH2 (Không có dữ liệu trả về): Hệ thống hiển thị:<br>+ Bảng kết quả: 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br><br>TH Hợp lệ: Hệ thống tìm kiếm hồ sơ chờ nhập liệu theo điều kiện lọc và phạm vi quyền dữ liệu của Cán bộ, hiển thị kết quả lên bảng danh sách. |
| 2 | Xóa bộ lọc | Nút | Đưa toàn bộ tiêu chí lọc về giá trị mặc định và tải lại danh sách hồ sơ chờ nhập liệu. |
| 3 | Click dòng dữ liệu | Row Click | Mở [MH02 - Màn hình Xem chi tiết hồ sơ chờ nhập liệu](#432193-mh02---man-hinh-xem-chi-tiet-ho-so-cho-nhap-lieu). |
| 4 | Tạo hồ sơ | Nút | TH1 (Hồ sơ không còn đủ điều kiện nhập liệu): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại" hoặc `Trạng thái lệ phí` không còn là "Đã thu"/"Miễn phí". Vi phạm [BR-CCTT-008], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở màn hình nhập liệu.<br><br>TH Hợp lệ: Hệ thống mở [MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin](#432194-mh03---man-hinh-nhap-lieu-ho-so-giay-yeu-cau-cung-cap-thong-tin). |


#### 4.3.2.19.3. MH02 - Màn hình Xem chi tiết hồ sơ chờ nhập liệu

##### 4.3.2.19.3.1. Màn hình

![Xem chi tiết hồ sơ chờ nhập liệu](images/CCTT_MH02_Xem_chi_tiet_ho_so_cho_nhap_lieu.png)

##### 4.3.2.19.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề màn hình | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo cấu trúc "Chi tiết hồ sơ chờ nhập liệu: `Mã hồ sơ`". |
| **Khối Thông tin tiếp nhận** | - | - | - | |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số đơn giấy | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Nguồn tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Kênh tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Thời điểm tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Đơn vị tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Cán bộ tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| **Khối Thông tin người yêu cầu** | - | - | - | |
| Loại khách hàng | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>Gồm:<br>+ Có tài khoản trực tuyến<br>+ Khách hàng vãng lai |
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
| Phương thức nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>Gồm:<br>+ Trực tiếp tại bộ phận một cửa<br>+ Qua dịch vụ bưu chính<br>+ Cách thức điện tử |
| Địa chỉ nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Phương thức nhận kết quả` = "Qua dịch vụ bưu chính". |
| Email nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Phương thức nhận kết quả` = "Cách thức điện tử". |
| **Khối Thông tin loại yêu cầu và lệ phí** | - | - | - | |
| Loại yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Tên khoản phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Mã khoản phải thu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số tiền phải thu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số tiền đã thu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Hình thức thu phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Số biên lai/chứng từ | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Thời điểm thu phí/xác nhận miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Cán bộ thu phí/xác nhận miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Đối tượng miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi hồ sơ có ghi nhận đối tượng miễn phí. |
| Lý do miễn phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Trạng thái lệ phí` = "Miễn phí". |
| Trạng thái lệ phí | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Đã thu<br>+ Miễn phí |
| Trạng thái hồ sơ | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc. Lấy theo dữ liệu bản ghi.<br>Gồm:<br>+ Chờ giải quyết<br>+ Bị trả lại<br>+ Bị từ chối |
| **Khối Tài liệu đính kèm** | - | - | - | Control UI: Bảng dữ liệu 4 cột (`STT`, `Tên tài liệu`, `File đính kèm`, `Thao tác`), chỉ đọc.<br>- Ẩn toàn bộ nút `Tải lên` và liên kết `Xóa`. |
| STT | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Tên tài liệu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| File đính kèm | - | - | - | Control UI: Label kèm icon định dạng tệp, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị dấu `-` nếu dòng tài liệu chưa có tệp đính kèm. |
| Thao tác | - | - | - | Control UI: Nhóm liên kết thao tác trên dòng, hiển thị trên cùng một dòng.<br>- Gồm `Xem file` và `Tải tệp`, chỉ hiển thị khi dòng tài liệu đã có tệp đính kèm.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **Khối Lịch sử trạng thái** | - | - | - | Control UI: Danh sách dòng lịch sử, chỉ đọc. |
| Thời điểm | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Trạng thái | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Nội dung xử lý | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |

##### 4.3.2.19.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Liên kết | Hệ thống mở nội dung tệp tin đính kèm của dòng tài liệu trong một tab mới của trình duyệt. |
| 2 | Tải tệp | Liên kết | Hệ thống tải tệp tin đính kèm của dòng tài liệu về máy người dùng, giữ nguyên tên tệp và định dạng gốc đã đính kèm. |
| 3 | Tạo hồ sơ | Nút | TH1 (Hồ sơ không còn đủ điều kiện nhập liệu): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại" hoặc `Trạng thái lệ phí` không còn là "Đã thu"/"Miễn phí". Vi phạm [BR-CCTT-008], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở màn hình nhập liệu.<br><br>TH Hợp lệ: Hệ thống mở [MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin](#432194-mh03---man-hinh-nhap-lieu-ho-so-giay-yeu-cau-cung-cap-thong-tin). |


#### 4.3.2.19.4. MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin

##### 4.3.2.19.4.1. Màn hình

![Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin](images/CCTT_MH03_Nhap_lieu_ho_so_giay_CCTT.png)

##### 4.3.2.19.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin tiếp nhận và thu phí** | | | | |
| Khối Thông tin tiếp nhận và thu phí | Text(1000) | Có | Thu gọn | - Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Mặc định thu gọn, cho phép mở rộng.<br>- Toàn bộ dữ liệu chỉ đọc. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc.<br>- Mã hồ sơ giấy do hệ thống sinh khi tiếp nhận. |
| Số đơn giấy | String(50) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc. |
| Thời điểm tiếp nhận | Datetime | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Cán bộ tiếp nhận | String(255) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc. |
| Loại yêu cầu | Enum(String(100)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc.<br>- Lấy theo thông tin hồ sơ. |
| Số biên lai/chứng từ | String(50) | Không | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc. |
| Loại tài khoản | Enum(String(50)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label.<br>- Chỉ đọc.<br>Gồm:<br>+ Tài khoản thường<br>+ Tài khoản nộp phí sau |
| Tài liệu tiếp nhận | File | Không | Theo hồ sơ tiếp nhận | - Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Mặc định thu gọn, cho phép mở rộng chứa Danh sách link file kèm biểu tượng Tải xuống.<br>- Chỉ đọc.<br>- Cho phép xem file tại một tab riêng.<br>- Cho phép tải xuống theo quyền. |
| **II. Thông tin trả lại** | | | | |
| Khối Thông tin trả lại | Text(1000) | Không | Ẩn | - Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Chỉ hiển thị khi hồ sơ đang ở trạng thái "Bị trả lại". Hiển thị lần lượt danh sách các lần bị trả lại. Sắp xếp theo thứ tự thời điểm trả lại giảm dần. Mỗi khối thông tin trả lại gồm: |
| Lý do trả lại | Text(2000) | Có | Theo hồ sơ | - Control UI: Label.<br>- Chỉ đọc. |
| Lãnh đạo trả lại | String(255) | Có | Theo hồ sơ | - Control UI: Label.<br>- Chỉ đọc. |
| Thời điểm trả lại | Datetime | Có | Theo hồ sơ | - Control UI: Label.<br>- Chỉ đọc.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| **III. Thông tin Người yêu cầu cung cấp thông tin** | | | | |
| Khối Thông tin Người yêu cầu | - | Có | Mở rộng | - Control UI: Card thông tin.<br>- Cho phép Cán bộ đối soát và điều chỉnh theo hồ sơ giấy nếu khác thông tin ghi nhận tại bước tiếp nhận. Không sửa ngược lại dữ liệu tiếp nhận gốc. |
| Người yêu cầu cung cấp thông tin | String(255) | Có | Theo hồ sơ tiếp nhận | - Control UI: Textbox.<br>- Tên cá nhân/tổ chức yêu cầu cung cấp thông tin.<br>- Tự động trim space theo [BR-VAL-001]. |
| Địa chỉ liên hệ | Text(500) | Có | Theo hồ sơ tiếp nhận | - Control UI: Textarea.<br>- Địa chỉ liên hệ của Người yêu cầu (gồm Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia). |
| Phương thức nhận kết quả | Enum(String(50)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Dropdown list.<br>- Cho phép điều chỉnh theo hồ sơ giấy.<br>Gồm:<br>+ Trực tiếp tại bộ phận một cửa<br>+ Qua dịch vụ bưu chính<br>+ Cách thức điện tử |
| Địa chỉ nhận kết quả | Text(500) | Tùy điều kiện | Theo hồ sơ tiếp nhận | - Control UI: Textarea.<br>- Chỉ hiển thị và bắt buộc nhập khi `Phương thức nhận kết quả` = "Qua dịch vụ bưu chính". |
| Email nhận kết quả | String(255) | Tùy điều kiện | Theo hồ sơ tiếp nhận | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc nhập khi `Phương thức nhận kết quả` = "Cách thức điện tử". Kiểm tra hợp lệ theo [BR-VAL-002]. |
| **IV. Tra cứu thông tin** | | | | |
| Khối Tra cứu thông tin | - | Có | Mở rộng | - Control UI: Khối Card tra cứu độc lập ở đầu biểu mẫu.<br>- Mặc định mở rộng.<br>- Bao gồm trường chọn Tiêu chí, khối nhập dữ liệu tương ứng, dòng hướng dẫn và nút "Tra cứu". |
| Tiêu chí yêu cầu cung cấp thông tin | Enum(String(50)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Dropdown list hoặc Tab chọn.<br>- Cán bộ chọn theo hồ sơ giấy.<br>Gồm:<br>+ Số đăng ký<br>+ Bên bảo đảm<br>+ Số khung<br>- Khi thay đổi tiêu chí, hệ thống chuyển đổi linh hoạt form nhập liệu tương ứng; giữ nguyên dữ liệu đã nhập ở từng tiêu chí trong phiên làm việc. |
| Số đăng ký | String(50) | Tùy điều kiện | Trống hoặc theo hồ sơ | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Số đăng ký". Nhập Số đăng ký của biện pháp bảo đảm cần tra cứu.<br>- Tự động trim space theo [BR-VAL-001].<br>- **Không chuyển sang chế độ chỉ đọc sau khi tra cứu thành công**, cho phép Cán bộ nhập lại Số đăng ký khác và bấm lại nút "Tra cứu" bất kỳ lúc nào. |
| Loại chủ thể | Enum(String(50)) | Tùy điều kiện | "Công dân Việt Nam" | - Control UI: Dropdown list.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm". Tham chiếu Danh mục Loại bên bảo đảm (Chủ thể) [DM_06].<br>Gồm:<br>+ Công dân Việt Nam<br>+ Tổ chức có đăng ký kinh doanh trong nước<br>+ Người nước ngoài<br>+ Tổ chức nước ngoài<br>+ Tổ chức khác<br>+ Người không quốc tịch cư trú tại Việt Nam |
| Số CMND/Căn cước công dân/Chứng minh quân đội | String(12) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Công dân Việt Nam". Bắt buộc đúng 12 chữ số theo [BR-VAL-004]. |
| Mã số thuế/Số đăng ký kinh doanh | String(14) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Tổ chức có đăng ký kinh doanh trong nước". Bắt buộc đúng 10 hoặc 14 chữ số theo [BR-VAL-005]. |
| Họ và tên | String(255) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Người nước ngoài" hoặc "Người không quốc tịch cư trú tại Việt Nam". Tự động trim space theo [BR-VAL-001]. |
| Số Hộ chiếu | String(50) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Người nước ngoài". |
| Mã số thuế/Số giấy phép đầu tư | String(50) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Tổ chức nước ngoài". |
| Tên tổ chức | String(255) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Tổ chức khác". |
| Số thẻ cư trú | String(50) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Người không quốc tịch cư trú tại Việt Nam". |
| Số khung | String(50) | Tùy điều kiện | Trống | - Control UI: Textbox.<br>- Chỉ hiển thị và bắt buộc khi Tiêu chí là "Số khung". Nhập số khung phương tiện giao thông cơ giới đường bộ.<br>- Tự động trim space theo [BR-VAL-001].<br>- **Không chuyển sang chế độ chỉ đọc sau khi tra cứu thành công**, cho phép Cán bộ nhập lại Số khung khác và bấm lại nút "Tra cứu" bất kỳ lúc nào. |
| Ghi chú nhập liệu | Text(1000) | Không | Trống | - Control UI: Textarea.<br>- Cán bộ nhập ghi chú nội bộ nếu cần; không hiển thị trên file PDF kết quả cung cấp thông tin. |
| Tra cứu | - | Có | - | - Control UI: Button.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **V. Chi tiết kết quả tra cứu** | | | | Chỉ hiển thị sau khi hệ thống thực hiện tra cứu hợp lệ. Hiển thị toàn bộ các hồ sơ liên quan phù hợp với tiêu chí tìm kiếm và còn hiệu lực (chưa có Yêu cầu Xóa đăng ký được phê duyệt hoàn thành), được sắp xếp theo cây hồ sơ bắt đầu từ Hồ sơ đăng ký lần đầu tới các hồ sơ Đăng ký thay đổi, Thông báo xử lý tài sản bảo đảm... |
| Thời điểm tra cứu | Datetime | Có | Theo phiên tra cứu | - Control UI: Label, chỉ đọc.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm:ss. |
| Tiêu chí tra cứu thực tế | Enum(String(50)) | Có | Theo phiên tra cứu | - Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.|
| Dữ liệu đầu vào tra cứu | Text(1000) | Có | Theo phiên tra cứu | - Control UI: Label, chỉ đọc.|
| Số lượng hồ sơ tra cứu được | Integer(10) | Có | Theo kết quả | - Control UI: Label, chỉ đọc.<br>- Trường hợp có dữ liệu: Chỉ hiển thị nếu có hồ sơ được tìm thấy. <br> - Hiển thị tổng số hồ sơ đăng ký BPBĐ còn hiệu lực tìm thấy.|
| Dòng thông báo không có dữ liệu | Text(300) | Tùy điều kiện | Theo kết quả | - Control UI: Khung cảnh báo Inline (Alert warning).<br>- Chỉ hiển thị khi kết quả tra cứu không có dữ liệu <br> - Hiển thị [MSG-WRN-CCTT-001] dạng Inline. |
| Danh sách hồ sơ đăng ký giao dịch bảo đảm/hợp đồng tìm thấy | Text(10000) | Tùy điều kiện | Theo kết quả tra cứu | Chỉ hiển thị khi có kết quả. Hiển thị theo các trường thông tin chi tiết tham chiếu tại [4.1.12.7.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](../../01_Website_Khach_hang/SRS_Tra%20cứu%20theo%20mã%20số%20CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong) |
| File PDF dự thảo | File | Có | Theo kết xuất | - Control UI: Khung xem trước tệp PDF (PDF Viewer nhúng) kèm link tải tệp.<br>- Hệ thống tự động sinh file PDF dự thảo Văn bản cung cấp thông tin (Mẫu số 13) ngay sau khi có phiên tra cứu thành công (áp dụng cho cả trường hợp có dữ liệu và không có dữ liệu theo [BR-CCTT-003], [BR-CCTT-004]).<br>- File có watermark "DỰ THẢO" in chéo trên toàn bộ các trang.<br>- Kèm 02 liên kết `Xem file` (mở tab mới) và `Tải tệp`. |

##### 4.3.2.19.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tra cứu | Nút | Xử lý: <br>- **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001], hệ thống chặn thao tác, highlight đỏ viền ô nhập bị bỏ trống đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] ngay phía dưới ô nhập và tự động focus con trỏ vào ô lỗi đó.<br>- **TH2 - Dữ liệu không hợp lệ**: Vi phạm [BR-VAL-003], hệ thống chặn thao tác và hiển thị thông báo lỗi tương ứng tại trường dữ liệu (Số định danh CCCD sai định dạng hiển thị [MSG-ERR-VAL-004], Mã số thuế sai định dạng hiển thị [MSG-ERR-VAL-005]) Không mở Khối V.<br>**TH Hợp lệ**: Hệ thống thực hiện tra cứu gần đúng theo dữ liệu đã nhập tương ứng với tiêu chí tìm kiếm, và thực hiện trả về kết quả tra cứu tương ứng. <br> + Hiển thị Khối V - Chi tiết Kết quả tra cứu thông tin:<br>+ Giữ nguyên các ô nhập tiêu chí và dữ liệu tra cứu ở chế độ chỉnh sửa. <br>+ **Tự động sinh file PDF dự thảo**: Hệ thống tự động sinh file PDF dự thảo Văn bản cung cấp thông tin (Mẫu số 13 có watermark "DỰ THẢO") gắn kèm phiên tra cứu theo [BR-CCTT-004].<br>+ Tự động cuộn mượt màn hình xuống Khối V để Cán bộ đối soát kết quả và xem trước văn bản dự thảo.<br>+ Nút "Duyệt chờ ký" và nút "Trình ký" được kích hoạt sáng lên cho phép Cán bộ click. Khi chưa tra cứu hoặc tra cứu bị lỗi, nút "Gửi duyệt" ở trạng thái mờ (Disabled, không cho click). |
| 2 | Thay đổi Tiêu chí tra cứu | Dropdown / Tab | Khi Cán bộ thay đổi giữa các tiêu chí ("Số đăng ký", "Bên bảo đảm", "Số khung"):<br>- Hệ thống giữ nguyên toàn bộ dữ liệu Cán bộ đã nhập ở từng tiêu chí trong phiên làm việc.<br>- Ẩn/hiện khối nhập liệu tương ứng với tiêu chí đang chọn.<br>- Nếu đã có kết quả tra cứu trước đó, hệ thống ẩn Khối V kết quả tra cứu, thu hồi file PDF dự thảo cũ và yêu cầu Cán bộ bấm "Tra cứu" lại cho tiêu chí mới. Nút "Gửi duyệt" chuyển về trạng thái mờ (Disabled). |
| 3 | Thay đổi Loại chủ thể | Dropdown list | Khi chọn tiêu chí "Bên bảo đảm", Cán bộ thay đổi Loại chủ thể:<br>- Hệ thống tự động hiển thị đúng nhóm trường định danh tương ứng theo Danh mục Loại bên bảo đảm [DM_06].<br>- Giữ nguyên dữ liệu các trường chung và tự động đặt lại (reset) các trường định danh đặc thù của loại chủ thể cũ. |
| 2 | Duyệt chờ ký | Nút | .<br>- Khi bấm, hệ thống thực hiện:<br>- Ghi nhận các thông tin:<br>+ `Nguồn tiếp nhận` là "Trực tiếp".<br>+ `Cán bộ xử lý` là Họ và tên Cán bộ nhập liệu đang thực hiện thao tác.<br>+ `Mã khách hàng`:<br>* Nếu `Loại khách hàng` là "Có tài khoản trực tuyến": ghi nhận Mã khách hàng là Mã tài khoản trực tuyến của Người yêu cầu đăng ký.<br>* Nếu `Loại khách hàng` là "Khách hàng vãng lai": ghi nhận Mã khách hàng là "Vãng lai".<br>+ Ghi nhận `Thời điểm đăng ký` là ngày giờ hiện tại của hệ thống tại thời điểm thực hiện thành công, lưu đầy đủ theo định dạng dd/mm/yyyy hh:mm:ss.<br>- **Chuyển hồ sơ sang trạng thái "Duyệt chờ ký"**.<br>- Đóng màn hình nhập liệu, quay về [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu](#432182-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu) và hiển thị thông báo thành công [MSG-SUC-BS-001] (*"Duyệt yêu cầu cung cấp bản sao thành công."*) dạng Toast. |
| 3 | Trình ký | Nút | Nút chỉ sáng lên cho phép click khi đã bấm nút Tra cứu .<br>- Khi bấm, hệ thống phân biệt mở popup theo `Loại cung cấp bản sao` của hồ sơ:<br>+ **Nếu Loại cung cấp bản sao là "Bản sao điện tử"**: Hệ thống tự động trích xuất dữ liệu hồ sơ gốc theo Số đăng ký, tự động sinh file PDF dự thảo Bản sao điện tử văn bản chứng nhận đăng ký biện pháp bảo đảm (có watermark "DỰ THẢO" in chéo) theo đúng Quy tắc sinh và Ánh xạ dữ liệu tại mục [4.3.2.18.6](#432186-quy-tac-sinh-file-pdf-va-bang-anh-xa-ra-pdf-ban-sao-dien-tu-de-lanh-dao-ky-sao-dien-tu) và mở [MH03a - Popup Trình ký bản sao điện tử](#4321851-mh03a---popup-trinh-ky-ban-sao-dien-tu).<br>+ **Nếu Loại cung cấp bản sao là "Bản sao giấy"**: Hệ thống không sinh file PDF và mở [MH03b - Popup Trình ký bản sao giấy](#4321852-mh03b---popup-trinh-ky-ban-sao-giay). |
| 5 | Hủy | Nút | TH1 (Cán bộ chưa nhập hoặc chưa thay đổi dữ liệu nào): Hệ thống đóng màn hình nhập liệu và quay về màn hình nguồn đã mở hồ sơ, không hiển thị thông báo xác nhận.<br><br>TH Hợp lệ: Cán bộ đã nhập hoặc thay đổi dữ liệu nhưng chưa gửi duyệt. Hệ thống thực hiện:<br>+ Hiển thị popup xác nhận [MSG-CFM-UCPS-001] - *"Dữ liệu đang thao tác chưa được lưu. Bạn có chắc chắn muốn hủy bỏ?"* gồm 02 nút "Đồng ý" và "Hủy".<br>+ Chọn "Đồng ý": Hệ thống hủy toàn bộ dữ liệu đang thao tác, đóng màn hình nhập liệu, quay về màn hình nguồn đã mở hồ sơ và giữ nguyên trạng thái hồ sơ.<br>+ Chọn "Hủy": Hệ thống đóng popup, ở lại màn hình nhập liệu và giữ nguyên toàn bộ dữ liệu đang thao tác. |


#### 4.3.2.19.5. Quy tắc sinh file PDF Văn bản cung cấp thông tin về biện pháp bảo đảm

*a. Cấu trúc file Văn bản cung cấp thông tin (Mẫu số 13)*

\- File PDF Văn bản cung cấp thông tin được hệ thống sinh tự động dựa trên tiêu chí tra cứu và kết quả truy vấn từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm:

\+ Tiêu đề và biểu mẫu: Áp dụng chuẩn biểu mẫu **Mẫu số 13** ban hành kèm theo Nghị định số 99/2022/NĐ-CP ("VĂN BẢN CUNG CẤP THÔNG TIN VỀ BIỆN PHÁP BẢO ĐẢM").

\+ Cấu trúc văn bản gồm 02 phần chính:
  * **Trang 1 (Lá mặt / Phần chứng nhận cung cấp thông tin)**:
    - Quốc hiệu, Tiêu ngữ, Tên cơ quan cấp văn bản (Trung tâm Đăng ký giao dịch, tài sản).
    - Số văn bản: lấy theo Mã hồ sơ giấy Yêu cầu cung cấp thông tin (ví dụ: `CCTT-20260901-000086`).
    - Địa danh, ngày tháng năm cấp văn bản.
    - Kính gửi: Tên Người yêu cầu cung cấp thông tin kèm địa chỉ liên hệ.
    - Tiêu chí và dữ liệu tra cứu: ghi nhận rõ tiêu chí yêu cầu (Số đăng ký, hoặc Bên bảo đảm kèm thông tin định danh, hoặc Số khung phương tiện).
    - Nội dung xác nhận của Cơ quan đăng ký:
      + *Trường hợp có dữ liệu*: Xác nhận có thông tin về biện pháp bảo đảm đã đăng ký còn hiệu lực phù hợp với tiêu chí tra cứu; chi tiết thông tin đăng ký thể hiện tại Phụ lục đính kèm.
      + *Trường hợp không có dữ liệu*: Xác nhận không có thông tin đăng ký biện pháp bảo đảm phù hợp với tiêu chí tra cứu tại thời điểm tra cứu.
    - Vùng ký số: Đặt tại cuối trang lá mặt, thể hiện chữ ký số của Người có thẩm quyền (Lãnh đạo Trung tâm Đăng ký) và dấu điện tử của Trung tâm Đăng ký giao dịch, tài sản.
  * **Phần phụ lục chi tiết (áp dụng khi tra cứu có dữ liệu)**:
    - Bảng danh mục các biện pháp bảo đảm còn hiệu lực phù hợp với tiêu chí tra cứu tại thời điểm gọi dịch vụ.
    - Mỗi bản ghi thể hiện đầy đủ: Số đăng ký, Thời điểm đăng ký có hiệu lực, Bên bảo đảm, Bên nhận bảo đảm, Danh mục tài sản bảo đảm, Loại hợp đồng/biện pháp bảo đảm.
    - Trường hợp không có dữ liệu: Văn bản chỉ gồm duy nhất trang lá mặt xác nhận không có dữ liệu, không có trang phụ lục.

*b. Ánh xạ dữ liệu trên biểu mẫu Văn bản cung cấp thông tin*

| Vị trí trên biểu mẫu Mẫu 13 | Nguồn dữ liệu | Bản dự thảo | Bản chính thức |
| :--- | :--- | :--- | :--- |
| Tên cơ quan ban hành | Đơn vị tiếp nhận và giải quyết hồ sơ (Trung tâm Đăng ký giao dịch, tài sản). | Kết xuất tên cơ quan | Kết xuất tên cơ quan |
| Số văn bản | Mã hồ sơ giấy Yêu cầu cung cấp thông tin. | Kết xuất | Kết xuất |
| Địa danh, ngày tháng năm cấp văn bản | Địa danh của đơn vị; ngày tháng năm lấy theo thời điểm Lãnh đạo ký số phê duyệt. | Kết xuất địa danh, bỏ trống ngày tháng năm | Kết xuất đầy đủ ngày tháng năm |
| Thông tin Người yêu cầu (Kính gửi) | Họ và tên / Tên tổ chức và Địa chỉ liên hệ của Người yêu cầu đã nhập tại MH03. | Kết xuất | Kết xuất |
| Tiêu chí và Dữ liệu tra cứu | Tiêu chí yêu cầu và dữ liệu đầu vào tra cứu của phiên tra cứu thành công. | Kết xuất rõ ràng tiêu chí và thông tin định danh | Kết xuất rõ ràng tiêu chí và thông tin định danh |
| Thời điểm tra cứu dữ liệu | Thời điểm thực hiện cuộc gọi tra cứu vào CSDL quốc gia. | Kết xuất thời điểm (ngày, giờ, phút, giây) | Kết xuất thời điểm (ngày, giờ, phút, giây) |
| Nội dung xác nhận kết quả | Trạng thái tra cứu ("Có kết quả" hoặc "Không có kết quả"). | Kết xuất nội dung xác nhận tương ứng | Kết xuất nội dung xác nhận tương ứng |
| Danh mục phụ lục biện pháp bảo đảm | Dữ liệu chi tiết các hồ sơ đăng ký BPBĐ còn hiệu lực tra cứu được. | Kết xuất đầy đủ nếu có kết quả; không có nếu không tìm thấy dữ liệu | Kết xuất đầy đủ nếu có kết quả; không có nếu không tìm thấy dữ liệu |
| Vùng ký - Người có thẩm quyền của Trung tâm đăng ký giao dịch, tài sản | Người có thẩm quyền ký duyệt theo quy định tại bước Ký duyệt. | Bỏ trống vùng ký | Gắn chữ ký số và dấu điện tử của Lãnh đạo |

*c. Bản dự thảo và bản chính thức*

\- Bản dự thảo sinh ngay sau khi có phiên tra cứu thành công tại MH03:
+ Có dấu chìm (watermark) **"DỰ THẢO"** in chéo trên toàn bộ các trang.
+ Vùng ký để trống, chưa gắn chứng thư số.
+ Cho phép Cán bộ kiểm tra trước tính chính xác của toàn bộ nội dung văn bản trước khi gửi duyệt.

\- Bản chính thức sinh khi Lãnh đạo ký số thành công bằng USB Token/chứng thư số tại bước Ký duyệt:
+ Loại bỏ hoàn toàn watermark "DỰ THẢO".
+ Điền thời điểm ký chính thức và gắn chữ ký số, chứng thư số điện tử hợp lệ của Lãnh đạo.
+ Được lưu trữ chính thức vào hồ sơ và phục vụ việc kết xuất, in ấn hoặc trả kết quả điện tử cho Người yêu cầu.
+ Ngoài thời điểm ký và chữ ký số ở vùng ký, toàn bộ nội dung bản chính thức phải trùng khớp hoàn toàn 100% với bản dự thảo mà Cán bộ đã kiểm tra và gửi duyệt.
