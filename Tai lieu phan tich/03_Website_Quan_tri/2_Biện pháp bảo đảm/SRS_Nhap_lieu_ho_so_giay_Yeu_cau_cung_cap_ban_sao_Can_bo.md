### 4.3.2.18. Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao

#### 4.3.2.18.1. Mục đích

\- Cho phép Cán bộ giải quyết hồ sơ nhập dữ liệu nghiệp vụ Yêu cầu cung cấp bản sao từ hồ sơ giấy đã được tiếp nhận và đã hoàn tất thu phí/miễn phí tại quầy, tra cứu hồ sơ gốc theo Số đăng ký, kiểm tra tính hợp lệ và thẩm quyền, đối soát thông tin hồ sơ gốc, thực hiện Duyệt chờ ký hoặc Trình ký hồ sơ.

\- Chức năng gồm 03 màn hình chính và các Popup nghiệp vụ: Danh sách hồ sơ chờ nhập liệu (MH01), Xem chi tiết hồ sơ chờ nhập liệu (MH02), Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao (MH03), Popup Trình ký bản sao điện tử và Popup Trình ký bản sao giấy.

\- Danh sách hồ sơ chờ nhập liệu tại chức năng này chỉ hiển thị hồ sơ giấy có Loại yêu cầu thuộc nhóm Yêu cầu cung cấp bản sao. Hồ sơ giấy của các nhóm nghiệp vụ khác được mô tả tại [Hồ sơ chờ nhập liệu - Website quản trị](SRS_Ho_so_cho_nhap_lieu.md).

\- Chức năng này áp dụng cho các Loại yêu cầu thuộc nhóm Yêu cầu cung cấp bản sao theo quy định tại Nghị định số 99/2022/NĐ-CP:
+ "Yêu cầu cung cấp bản sao văn bản chứng nhận đăng ký biện pháp bảo đảm" (Mẫu số 11đ).
+ "Yêu cầu cung cấp bản sao kèm thông báo về việc đăng ký thế chấp" (Mẫu số 12đ).

\- Cán bộ nhập liệu được phép nhập và chỉnh sửa Số đăng ký của hồ sơ gốc khi hồ sơ ở trạng thái "Chờ giải quyết" hoặc "Bị trả lại" theo [BR-BS-008], [BR-BS-009]. Các thông tin về Loại cung cấp bản sao và Số lượng bản sao được kế thừa cố định từ bước tiếp nhận hồ sơ giấy, không cho phép chỉnh sửa.

\- Quy định về thẩm quyền cấp bản sao:
+ Đối với "Bản sao điện tử": Cơ quan tiếp nhận giải quyết có thể thực hiện tra cứu và cấp bản sao điện tử trích xuất từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm.
+ Đối với "Bản sao giấy": Đơn vị đang đăng nhập của Cán bộ (Trung tâm đăng ký) phải trùng khớp với Cơ quan tiếp nhận/giải quyết của Hồ sơ gốc theo Số đăng ký. Trường hợp không trùng khớp thẩm quyền, hệ thống tự động cảnh báo và hiển thị popup cho Cán bộ thực hiện từ chối hồ sơ với lý do điền sẵn.

*a. Phân quyền*

\- NSD có vai trò Cán bộ giải quyết hồ sơ: Được phép mở hồ sơ giấy chờ nhập liệu, xem thông tin tiếp nhận/thu phí, tra cứu hồ sơ gốc theo Số đăng ký, kiểm tra cấu trúc chi tiết hồ sơ gốc, thực hiện Duyệt chờ ký (chuyển hồ sơ sang "Duyệt chờ ký"), thực hiện Trình ký (trình ký bản điện tử kèm xem trước dự thảo PDF hoặc trình ký bản giấy), trình ký lại hồ sơ bị trả lại và từ chối hồ sơ giấy (bao gồm cả trường hợp từ chối do không đúng thẩm quyền cấp bản sao giấy).

\- NSD có vai trò Cán bộ tiếp nhận: Không được nhập dữ liệu nghiệp vụ Yêu cầu cung cấp bản sao; chỉ được xem thông tin tiếp nhận nếu được phân quyền.

\- NSD có vai trò Cán bộ kế toán: Không được nhập dữ liệu nghiệp vụ Yêu cầu cung cấp bản sao; chỉ được xem thông tin thu phí nếu được phân quyền.

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập Website quản trị và có quyền nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao.

\- Hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" và Loại yêu cầu thuộc nhóm Yêu cầu cung cấp bản sao.

\- Hồ sơ đang ở trạng thái "Chờ giải quyết" hoặc "Bị trả lại".

\- Hồ sơ có Trạng thái lệ phí là "Đã thu" hoặc "Miễn phí" theo [BR-UCPS-001] và [BR-UCPS-006].


#### 4.3.2.18.2. MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu

##### 4.3.2.18.2.1. Màn hình

![Danh sách hồ sơ chờ nhập liệu](images/BS_MH01_Danh_sach_ho_so_cho_nhap_lieu.png)

##### 4.3.2.18.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ | String(50) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Mã hồ sơ giấy, không phân biệt hoa thường, tự động trim space. |
| Số đơn giấy | String(50) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Số đơn giấy ghi nhận tại bước tiếp nhận. |
| Người yêu cầu | String(255) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường. |
| Loại cung cấp bản sao | Enum(String(50)) | Không | "Tất cả" | - Control UI: Dropdown list.<br>Gồm:<br>+ Tất cả<br>+ Bản sao điện tử<br>+ Bản sao giấy |
| Cán bộ tiếp nhận | String(255) | Không | Trống | - Control UI: Textbox.<br>- Tìm kiếm gần đúng theo Họ và tên Cán bộ tiếp nhận. |
| Từ ngày tiếp nhận | Date | Không | Ngày 01 của tháng hiện tại | - Control UI: Datepicker.<br>- Lọc theo Thời điểm tiếp nhận.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Tuân thủ [BR-VAL-007]. |
| Đến ngày tiếp nhận | Date | Không | Ngày hiện tại | - Control UI: Datepicker.<br>- Lọc theo Thời điểm tiếp nhận.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Tuân thủ [BR-VAL-007]. |
| Tìm kiếm | - | Không | - | - Control UI: Button.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Xóa bộ lọc | - | Không | - | - Control UI: Button.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **II. Bảng danh sách hồ sơ chờ nhập liệu** | - | Có | 20 bản ghi/trang | - Control UI: Bảng dữ liệu (Grid) kèm phân trang.<br>- Chỉ hiển thị hồ sơ giấy có Loại yêu cầu thuộc nhóm Yêu cầu cung cấp bản sao, trạng thái "Chờ giải quyết" hoặc "Bị trả lại" và Trạng thái lệ phí là "Đã thu" hoặc "Miễn phí".<br>- Chỉ hiển thị hồ sơ trong phạm vi đơn vị của Cán bộ đăng nhập.<br>- Sắp xếp mặc định theo Ngày tiếp nhận giảm dần.<br>- Phân trang 20 bản ghi/trang.<br>- Trạng thái không có dữ liệu: hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]. |
| STT | Integer(10) | Có | Theo trang | Số thứ tự dòng trên trang kết quả. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. |
| Số đơn giấy | String(50) | Có | Theo hồ sơ tiếp nhận | Chỉ đọc. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ tiếp nhận | Tên cá nhân/tổ chức yêu cầu cấp bản sao. |
| Loại yêu cầu | Enum(String(100)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label. <br>- Theo thông tin bản ghi |
| Loại cung cấp bản sao | Enum(String(50)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label dạng nhãn (Badge).<br>- Theo thông tin bản ghi.<br>Gồm:<br>+ Bản sao điện tử<br>+ Bản sao giấy |
| Số lượng bản sao | Integer(10) | Tùy điều kiện | Theo hồ sơ tiếp nhận | Chỉ hiển thị số lượng khi Loại cung cấp bản sao là "Bản sao giấy"; trường hợp "Bản sao điện tử" hiển thị dấu `-`. |
| Ngày tiếp nhận | Datetime | Có | Theo hồ sơ tiếp nhận | Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Trạng thái lệ phí | Enum(String(50)) | Có | Theo thông tin thu phí | - Control UI: Label dạng nhãn trạng thái (Badge).<br>Gồm:<br>+ Đã thu<br>+ Miễn phí |
| Số tiền đã thu (VNĐ) | Decimal(18,0) | Có | Theo thông tin thu phí | Hiển thị số tiền đã thu (VNĐ); trường hợp miễn phí hiển thị "Miễn phí". |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Theo hồ sơ | - Control UI: Label dạng nhãn trạng thái (Badge).<br>Gồm:<br>+ Chờ giải quyết<br>+ Bị trả lại |
| Cán bộ tiếp nhận | String(255) | Có | Control UI: Label <br>- Theo hồ sơ tiếp nhận | Họ và tên Cán bộ đã tiếp nhận hồ sơ giấy. |
| Thao tác | - | - | - | - Control UI: Nút trên dòng dữ liệu.<br>Gồm:<br>+ Tạo hồ sơ<br>+ Từ chối |

##### 4.3.2.18.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Khoảng ngày không hợp lệ): "Từ ngày tiếp nhận" lớn hơn "Đến ngày tiếp nhận". Vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007] dạng Inline dưới ô nhập tương ứng. Không thực hiện tìm kiếm. |
|  |  |  | TH2 (Không có dữ liệu trả về): Hệ thống hiển thị:<br>+ Bảng kết quả: 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
|  |  |  | TH Hợp lệ: Hệ thống tìm kiếm hồ sơ chờ nhập liệu theo điều kiện lọc và phạm vi quyền dữ liệu của Cán bộ, hiển thị kết quả lên bảng danh sách. |
| 2 | Xóa bộ lọc | Nút | Đưa toàn bộ tiêu chí lọc về giá trị mặc định và tải lại danh sách hồ sơ chờ nhập liệu. |
| 3 | Click dòng dữ liệu | Row Click | Mở [MH02 - Màn hình Xem chi tiết hồ sơ chờ nhập liệu](#432183-mh02---man-hinh-xem-chi-tiet-ho-so-cho-nhap-lieu). |
| 4 | Tạo hồ sơ | Nút | TH1 (Hồ sơ không còn đủ điều kiện nhập liệu): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại" hoặc `Trạng thái lệ phí` không còn là "Đã thu"/"Miễn phí". Vi phạm [BR-BS-008], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở màn hình nhập liệu. |
|  |  |  | TH Hợp lệ: Hệ thống mở [MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao](#432184-mh03---man-hinh-nhap-lieu-ho-so-giay-yeu-cau-cung-cap-ban-sao). |
| 5 | Từ chối | Nút | Hiển thị trên dòng dữ liệu tại cột Thao tác, theo quyền của Cán bộ giải quyết. |
|  |  |  | TH1 (Hồ sơ không còn đủ điều kiện xử lý): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại". Vi phạm [BR-BS-007], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở popup từ chối. |
|  |  |  | TH2 (Bỏ trống Lý do từ chối): Vi phạm [BR-VAL-001]. Hệ thống tô viền đỏ ô trống và hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập. Không thực hiện từ chối. |
|  |  |  | TH3 (File căn cứ không hợp lệ): File không đúng định dạng `.pdf` hoặc vượt quá 20MB. Vi phạm [BR-FILE-010], hiển thị [MSG-ERR-FILE-010] dạng Inline dưới ô đính kèm. Không thực hiện từ chối. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>- Mở popup Từ chối hồ sơ gồm:<br>+ `Lý do từ chối`: Control UI Textarea, Text(2000), bắt buộc nhập theo [BR-DK-025].<br>+ `File căn cứ`: Control UI Nút chọn tệp, không bắt buộc, cho phép đính kèm 01 file theo [BR-FILE-010].<br>+ 02 nút "Xác nhận" và "Hủy".<br>- Chọn "Hủy": đóng popup, giữ nguyên trạng thái hồ sơ.<br>- Chọn "Xác nhận": hiển thị thông báo xác nhận [MSG-CFM-BS-001]. Sau khi Cán bộ đồng ý, hệ thống lưu Lý do từ chối và File căn cứ, ghi nhận Cán bộ từ chối và thời điểm từ chối, chuyển hồ sơ sang trạng thái "Bị từ chối", loại hồ sơ khỏi danh sách chờ nhập liệu và hiển thị [MSG-SUC-BS-004]. |


#### 4.3.2.18.3. MH02 - Màn hình Xem chi tiết hồ sơ chờ nhập liệu

##### 4.3.2.18.3.1. Màn hình

![Xem chi tiết hồ sơ chờ nhập liệu](images/BS_MH02_Xem_chi_tiet_ho_so_cho_nhap_lieu.png)

##### 4.3.2.18.3.2. Mô tả thông tin trên màn hình

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
| Phương thức nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Địa chỉ nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Phương thức nhận kết quả` = "Qua dịch vụ bưu chính". |
| Email nhận kết quả | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Phương thức nhận kết quả` = "Cách thức điện tử". |
| **Khối Thông tin loại yêu cầu và lệ phí** | - | - | - | |
| Loại yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
| Loại cung cấp bản sao | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc. Lấy theo dữ liệu bản ghi.<br>Gồm:<br>+ Bản sao điện tử<br>+ Bản sao giấy |
| Số lượng bản sao | Integer(10) | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại cung cấp bản sao` = "Bản sao giấy". |
| Tham số tính phí | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi. |
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
| **Khối Thanh tác vụ** | - | - | - | |
| Tạo hồ sơ | - | - | - | Control UI: Nút, hiển thị cuối màn hình.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Từ chối | - | - | - | Control UI: Nút, hiển thị cuối màn hình.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Đóng | - | - | - | Control UI: Nút, hiển thị cuối màn hình.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.18.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Liên kết | Hệ thống mở nội dung tệp tin đính kèm của dòng tài liệu trong một tab mới của trình duyệt. |
| 2 | Tải tệp | Liên kết | Hệ thống tải tệp tin đính kèm của dòng tài liệu về máy người dùng, giữ nguyên tên tệp và định dạng gốc đã đính kèm. |
| 3 | Tạo hồ sơ | Nút | TH1 (Hồ sơ không còn đủ điều kiện nhập liệu): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại" hoặc `Trạng thái lệ phí` không còn là "Đã thu"/"Miễn phí". Vi phạm [BR-BS-008], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở màn hình nhập liệu. |
|  |  |  | TH Hợp lệ: Hệ thống mở [MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao](#432184-mh03---man-hinh-nhap-lieu-ho-so-giay-yeu-cau-cung-cap-ban-sao). |
| 4 | Từ chối | Nút | TH1 (Hồ sơ không còn đủ điều kiện xử lý): Hồ sơ không còn ở trạng thái "Chờ giải quyết"/"Bị trả lại". Vi phạm [BR-BS-007], hiển thị [MSG-ERR-DK-005] dạng Toast. Không mở popup từ chối. |
|  |  |  | TH2 (Bỏ trống Lý do từ chối): Vi phạm [BR-VAL-001]. Hệ thống tô viền đỏ ô trống và hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập. Không thực hiện từ chối. |
|  |  |  | TH3 (File căn cứ không hợp lệ): File không đúng định dạng `.pdf` hoặc vượt quá 20MB. Vi phạm [BR-FILE-010], hiển thị [MSG-ERR-FILE-010] dạng Inline dưới ô đính kèm. Không thực hiện từ chối. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>- Mở popup Từ chối hồ sơ gồm:<br>+ `Lý do từ chối`: Control UI Textarea, Text(2000), bắt buộc nhập.<br>+ `File căn cứ`: Control UI Nút chọn tệp, không bắt buộc, cho phép đính kèm 01 file theo [BR-FILE-010].<br>+ 02 nút "Xác nhận" và "Hủy".<br>- Chọn "Hủy": đóng popup, giữ nguyên trạng thái hồ sơ.<br>- Chọn "Xác nhận": hiển thị thông báo xác nhận [MSG-CFM-BS-001]. Sau khi Cán bộ đồng ý, hệ thống lưu Lý do từ chối và File căn cứ, ghi nhận Cán bộ từ chối và thời điểm từ chối, chuyển hồ sơ sang trạng thái "Bị từ chối" và hiển thị [MSG-SUC-BS-004]. |
|  |  |  | Sau khi hồ sơ chuyển sang trạng thái "Bị từ chối", hệ thống ẩn toàn bộ nút thao tác nghiệp vụ trên màn hình chi tiết (bao gồm "Tạo hồ sơ" và "Từ chối"), chỉ cho phép xem thông tin và đóng màn hình. Hồ sơ không còn hiển thị trong danh sách hồ sơ chờ nhập liệu. |
| 5 | Đóng | Nút | Hệ thống đóng màn hình chi tiết và quay về [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu](#432182-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu), giữ nguyên điều kiện tìm kiếm trước đó. |


#### 4.3.2.18.4. MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao

##### 4.3.2.18.4.1. Màn hình

![Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao](images/BS_MH03_Nhap_lieu_ho_so_giay_ban_sao.png)

##### 4.3.2.18.4.2. Mô tả thông tin trên màn hình

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
| **III. Tra cứu hồ sơ gốc** | | | | |
| Khối Tra cứu hồ sơ gốc | - | Có | Mở rộng | - Control UI: Khối Card tra cứu độc lập ở đầu biểu mẫu.<br>- Mặc định mở rộng và tự động focus con trỏ vào trường "Số đăng ký" khi mở màn hình.<br>- Bao gồm:<br>+ Trường "Số đăng ký"<br>+ Dòng hướng dẫn: *"Vui lòng nhập Số đăng ký và nhấn nút 'Tra cứu' để hệ thống kiểm tra thẩm quyền và nạp dữ liệu hồ sơ gốc vào biểu mẫu nhập liệu."*<br>+ Nút "Tra cứu" |
| Số đăng ký | String(50) | Có | Trống hoặc theo hồ sơ tiếp nhận | - Control UI: Textbox.<br>- Cán bộ nhập Số đăng ký của hồ sơ gốc cần yêu cầu cấp bản sao.<br>- Hệ thống tự động trim space theo [BR-VAL-001].<br>- **Không chuyển sang chế độ chỉ đọc sau khi tra cứu thành công**, cho phép Cán bộ nhập lại Số đăng ký khác và bấm lại nút "Tra cứu" bất kỳ lúc nào. |
| Tra cứu | - | Có | - | - Control UI: Button.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **IV. Chi tiết Nhập liệu yêu cầu cung cấp bản sao** | | | | |
| Khối Chi tiết hồ sơ Yêu cầu cung cấp bản sao | - | Có | Ẩn | - Control UI: Khối Card chi tiết hiển thị nội dung hồ sơ yêu cầu cấp bản sao và thông tin hồ sơ gốc.<br>- **Mặc định ẩn, chỉ hiển thị sau khi Cán bộ bấm "Tra cứu" và hệ thống xác thực hồ sơ gốc hợp lệ, đúng thẩm quyền**.<br>- Bao gồm nhóm thông tin yêu cầu cấp bản sao và Khối cấu trúc chi tiết hồ sơ gốc tham chiếu. |
| Số đăng ký hồ sơ gốc | String(50) | Có | Theo kết quả tra cứu | - Control UI: Label, chỉ đọc.<br>- Hiển thị Số đăng ký của hồ sơ gốc đã tra cứu thành công. |
| Loại cung cấp bản sao | Enum(String(50)) | Có | Theo hồ sơ tiếp nhận | - Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Lấy cố định theo thông tin Hồ sơ tiếp nhận đã nhập, **không cho phép chỉnh sửa** |
| Số lượng bản sao | Integer(10) | Tùy điều kiện | Theo hồ sơ tiếp nhận | - Control UI: Label, chỉ đọc.<br>- Lấy cố định theo thông tin Hồ sơ tiếp nhận đã nhập, **không cho phép chỉnh sửa**.<br>- Chỉ hiển thị khi `Loại cung cấp bản sao` là "Bản sao giấy" (kèm chữ "bản") |
| **Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng** | - | Có | Theo hồ sơ gốc | - Control UI: Khối hiển thị chi tiết hồ sơ gốc chỉ đọc, truy vấn trực tiếp theo Số đăng ký theo [BR-BS-011].<br>- Toàn bộ cấu trúc khối và các trường thông tin chi tiết tham chiếu tại [4.1.12.7.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](../../01_Website_Khach_hang/SRS_Tra%20cứu%20theo%20mã%20số%20CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong). |

##### 4.3.2.18.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tra cứu | Nút | TH1 (Bỏ trống trường bắt buộc): Bỏ trống ô nhập "Số đăng ký". Vi phạm [BR-VAL-001], hệ thống tô viền đỏ ô trống và hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập. Không thực hiện tra cứu. |
|  |  |  | TH2 (Không tìm thấy hồ sơ gốc theo Số đăng ký đã nhập): Vi phạm [BR-BS-012], hiển thị [MSG-ERR-BS-010] dạng Inline tại Khối III. Không hiển thị Khối IV. |
|  |  |  | TH3 (Hồ sơ gốc chưa có hiệu lực pháp lý - chưa ở trạng thái "Hoàn thành"): Vi phạm [BR-BS-012], hiển thị [MSG-ERR-BS-011] dạng Inline tại Khối III. Không hiển thị Khối IV. |
|  |  |  | **TH4 (Không đúng thẩm quyền cấp Bản sao giấy)**: Áp dụng khi `Loại cung cấp bản sao` của hồ sơ là "Bản sao giấy":<br>- Hệ thống đối chiếu `Đơn vị đang đăng nhập của Cán bộ` với `Cơ quan tiếp nhận / giải quyết của Hồ sơ gốc theo Số đăng ký`.<br>- **Nếu không trùng khớp đơn vị**: Hệ thống hiển thị thông báo lỗi thẩm quyền và tự động bật **Popup Từ chối hồ sơ**:<br>+ Tự động điền trước nội dung `Lý do từ chối`: *"Cơ quan tiếp nhận hiện tại không đúng thẩm quyền cấp bản sao giấy đối với hồ sơ đăng ký số [Số đăng ký]. Hồ sơ gốc thuộc thẩm quyền giải quyết của [Tên cơ quan tiếp nhận hồ sơ gốc]."*<br>+ Cho phép Cán bộ trực tiếp chỉnh sửa, bổ sung nội dung `Lý do từ chối` nếu cần thiết.<br>+ Popup có 02 nút hành động:<br>  * Chọn **"Xác nhận từ chối"**: Hệ thống lưu Lý do từ chối, ghi nhận Cán bộ và thời điểm từ chối, chuyển hồ sơ sang trạng thái **"Bị từ chối"**, loại hồ sơ khỏi danh sách chờ nhập liệu và hiển thị thông báo [MSG-SUC-BS-004].<br>  * Chọn **"Hủy"**: Đóng popup từ chối, giữ nguyên màn hình nhập liệu và trạng thái hồ sơ để Cán bộ có thể kiểm tra lại hoặc nhập lại Số đăng ký khác. Không mở Khối IV. |
|  |  |  | **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Giữ nguyên ô nhập "Số đăng ký" ở chế độ chỉnh sửa, cho phép Cán bộ nhập lại số khác và bấm lại "Tra cứu" khi cần.<br>+ Hiển thị Khối IV - Chi tiết Nhập liệu yêu cầu cung cấp bản sao kèm toàn bộ Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng được truy vấn trực tiếp theo [BR-BS-011].<br>+ Tự động cuộn mượt màn hình xuống Khối IV để Cán bộ đối soát dữ liệu.<br>+ **Kích hoạt sáng 02 nút "Duyệt chờ ký" và "Trình ký"** cho phép Cán bộ click. Khi chưa tra cứu hoặc tra cứu không hợp lệ, 02 nút này ở trạng thái mờ (Disabled, không cho click). |
| 2 | Duyệt chờ ký | Nút | Nút chỉ sáng lên cho phép click khi Tra cứu hồ sơ gốc hợp lệ.<br>- Khi bấm, hệ thống thực hiện:<br>- Ghi nhận các thông tin:<br>+ `Nguồn tiếp nhận` là "Trực tiếp".<br>+ `Cán bộ xử lý` là Họ và tên Cán bộ nhập liệu đang thực hiện thao tác.<br>+ `Mã khách hàng`:<br>* Nếu `Loại khách hàng` là "Có tài khoản trực tuyến": ghi nhận Mã khách hàng là Mã tài khoản trực tuyến của Người yêu cầu đăng ký.<br>* Nếu `Loại khách hàng` là "Khách hàng vãng lai": ghi nhận Mã khách hàng là "Vãng lai".<br>+ Ghi nhận `Thời điểm đăng ký` là ngày giờ hiện tại của hệ thống tại thời điểm thực hiện thành công, lưu đầy đủ theo định dạng dd/mm/yyyy hh:mm:ss.<br>- **Chuyển hồ sơ sang trạng thái "Duyệt chờ ký"**.<br>- Đóng màn hình nhập liệu, quay về [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu](#432182-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu) và hiển thị thông báo thành công [MSG-SUC-BS-001] (*"Duyệt yêu cầu cung cấp bản sao thành công."*) dạng Toast. |
| 3 | Trình ký | Nút | Nút chỉ sáng lên cho phép click khi Tra cứu hồ sơ gốc hợp lệ.<br>- Khi bấm, hệ thống phân biệt mở popup theo `Loại cung cấp bản sao` của hồ sơ:<br>+ **Nếu Loại cung cấp bản sao là "Bản sao điện tử"**: Hệ thống tự động trích xuất dữ liệu hồ sơ gốc theo Số đăng ký, tự động sinh file PDF dự thảo Bản sao điện tử văn bản chứng nhận đăng ký biện pháp bảo đảm (có watermark "DỰ THẢO" in chéo) theo đúng Quy tắc sinh và Ánh xạ dữ liệu tại mục [4.3.2.18.6](#432186-quy-tac-sinh-file-pdf-va-bang-anh-xa-ra-pdf-ban-sao-dien-tu-de-lanh-dao-ky-sao-dien-tu) và mở [MH03a - Popup Trình ký bản sao điện tử](#4321851-mh03a---popup-trinh-ky-ban-sao-dien-tu).<br>+ **Nếu Loại cung cấp bản sao là "Bản sao giấy"**: Hệ thống không sinh file PDF và mở [MH03b - Popup Trình ký bản sao giấy](#4321852-mh03b---popup-trinh-ky-ban-sao-giay). |
| 4 | Hủy | Nút | TH1 (Cán bộ chưa nhập hoặc chưa thay đổi dữ liệu nào): Hệ thống đóng màn hình nhập liệu và quay về màn hình nguồn đã mở hồ sơ, không hiển thị thông báo xác nhận. |
|  |  |  | TH Hợp lệ: Cán bộ đã nhập hoặc thay đổi Số đăng ký nhưng chưa duyệt/trình ký. Hệ thống thực hiện:<br>+ Hiển thị popup xác nhận [MSG-CFM-UCPS-001] - *"Dữ liệu đang thao tác chưa được lưu. Bạn có chắc chắn muốn hủy bỏ?"* gồm 02 nút "Đồng ý" và "Hủy".<br>+ Chọn "Đồng ý": Hệ thống hủy toàn bộ dữ liệu đang thao tác, đóng màn hình nhập liệu, quay về màn hình nguồn đã mở hồ sơ và giữ nguyên trạng thái hồ sơ.<br>+ Chọn "Hủy": Hệ thống đóng popup, ở lại màn hình nhập liệu và giữ nguyên toàn bộ dữ liệu đang thao tác. |


#### 4.3.2.18.5. Popup Trình ký yêu cầu cung cấp bản sao

##### 4.3.2.18.5.1. MH03a - Popup Trình ký bản sao điện tử

*a. Giao diện màn hình*

![Popup Trình ký bản sao điện tử](images/BS_MH03a_Popup_trinh_ky_ban_sao_dien_tu.png)

*b. Mô tả thông tin trên popup*

- **Quy chuẩn kích thước và bố cục**: Kích thước chiều ngang đạt chuẩn `800px`, `max-height: 90vh`; phần thân popup (Modal Body) đạt chuẩn padding `24px` kết hợp `overflow-y: auto`, tiêu đề (Header) và nút bấm (Footer) cố định (Sticky) theo Quy tắc thiết kế UI.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label, chỉ đọc. Hiển thị: **"Trình ký yêu cầu cung cấp bản sao điện tử: [Mã hồ sơ]"**. |
| **I. Thông tin trình ký** | - | - | - | |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc. |
| Số đăng ký hồ sơ gốc | String(50) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | - Control UI: Combobox có ô tìm kiếm.<br>- Bắt buộc chọn trước khi xác nhận trình ký theo [BR-VAL-001].<br>- Hiển thị danh sách Lãnh đạo có thẩm quyền ký số còn hiệu lực của Trung tâm đăng ký.<br>- Cho phép tìm kiếm nhanh theo tên Lãnh đạo hoặc chức vụ.<br>- Lãnh đạo được chọn là người sẽ thực hiện ký số file PDF bản sao điện tử tại trạng thái "Chờ ký". |
| **II. Khối Dự thảo Bản sao điện tử** | - | Có | Mở rộng | |
| File PDF dự thảo | File | Có | Tự động sinh | - Control UI: Khung xem trước tệp PDF (PDF Viewer nhúng) hiển thị trực quan bản dự thảo Bản sao điện tử văn bản chứng nhận (có watermark "DỰ THẢO").<br>- Cho phép phóng to, thu nhỏ, cuộn các trang để Cán bộ đối soát kỹ trước khi trình ký.<br>- Kèm 02 nút liên kết: `Xem file` (mở tab mới trên trình duyệt) và `Tải tệp`. |

*c. Chức năng trên popup*

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Liên kết | Mở nội dung file PDF dự thảo Bản sao điện tử trong một tab mới của trình duyệt ở khổ xem đầy đủ. |
| 2 | Tải tệp | Liên kết | Tải file PDF dự thảo Bản sao điện tử về máy trạm của Cán bộ. |
| 3 | Xác nhận trình ký | Nút | TH1 (Chưa chọn Lãnh đạo ký): Vi phạm [BR-VAL-001]. Hệ thống tô viền đỏ ô chọn Lãnh đạo, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô chọn và tự động focus con trỏ vào ô lỗi. Không thực hiện trình ký.<br><br>TH Hợp lệ: Hệ thống thực hiện:<br>- Khóa phiên bản file PDF dự thảo Bản sao điện tử vừa sinh theo [BR-BS-004].<br>- Ghi nhận các thông tin:<br>+ `Nguồn tiếp nhận` là "Trực tiếp".<br>+ `Cán bộ xử lý` là Họ và tên Cán bộ nhập liệu đang thực hiện thao tác.<br>+ `Mã khách hàng`:<br>* Nếu `Loại khách hàng` là "Có tài khoản trực tuyến": ghi nhận Mã khách hàng là Mã tài khoản trực tuyến của Người yêu cầu đăng ký.<br>* Nếu `Loại khách hàng` là "Khách hàng vãng lai": ghi nhận Mã khách hàng là "Vãng lai".<br>+ Ghi nhận `Thời điểm đăng ký` là ngày giờ hiện tại của hệ thống tại thời điểm thực hiện thành công, lưu đầy đủ theo định dạng dd/mm/yyyy hh:mm:ss.<br>- Chuyển trạng thái hồ sơ sang **"Chờ ký"**, chuyển hồ sơ vào hàng chờ ký số của Lãnh đạo đã chọn.<br>- Đóng popup, đóng màn hình MH03, quay về [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu](#432182-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu) và hiển thị thông báo thành công [MSG-SUC-BS-002] dạng Toast. |
| 4 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và dữ liệu đang thao tác tại màn hình MH03. |


##### 4.3.2.18.5.2. MH03b - Popup Trình ký bản sao giấy

*a. Giao diện màn hình*

![Popup Trình ký bản sao giấy](images/BS_MH03b_Popup_trinh_ky_ban_sao_giay.png)

*b. Mô tả thông tin trên popup*

- **Quy chuẩn kích thước và bố cục**: Kích thước chiều ngang đạt chuẩn `650px`, `max-height: 90vh`; bố cục dạng lưới 2 cột song song (Grid 50%-50%), padding `24px`, tiêu đề và nút bấm cố định theo Quy tắc thiết kế UI.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label, chỉ đọc. Hiển thị: **"Trình ký yêu cầu cung cấp bản sao giấy: [Mã hồ sơ]"**. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc. |
| Số đăng ký hồ sơ gốc | String(50) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc. |
| Số lượng bản sao | Integer(10) | Có | Theo hồ sơ tiếp nhận | Control UI: Label, chỉ đọc. Hiển thị số lượng bản sao giấy đã yêu cầu (kèm chữ "bản"). |
| Lãnh đạo ký duyệt | Enum(String(255)) | Có | Trống | - Control UI: Combobox có ô tìm kiếm.<br>- Bắt buộc chọn trước khi xác nhận trình ký theo [BR-VAL-001].<br>- Hiển thị danh sách Lãnh đạo có thẩm quyền ký duyệt của đơn vị.<br>- Lãnh đạo được chọn sẽ thực hiện ký duyệt trên hệ thống theo [BR-BS-013]. |

*c. Chức năng trên popup*

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận trình ký | Nút | TH1 (Chưa chọn Lãnh đạo ký duyệt): Vi phạm [BR-VAL-001]. Hệ thống tô viền đỏ ô chọn Lãnh đạo, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô chọn và tự động focus con trỏ vào ô lỗi. Không thực hiện trình ký.<br><br>TH Hợp lệ: Hệ thống thực hiện:<br>- Ghi nhận Cán bộ trình ký, thời điểm trình ký và Lãnh đạo ký duyệt đã chọn.<br>- Ghi nhận các thông tin:<br>+ `Nguồn tiếp nhận` là "Trực tiếp".<br>+ `Cán bộ xử lý` là Họ và tên Cán bộ nhập liệu đang thực hiện thao tác.<br>+ `Mã khách hàng`:<br>* Nếu `Loại khách hàng` là "Có tài khoản trực tuyến": ghi nhận Mã khách hàng là Mã tài khoản trực tuyến của Người yêu cầu đăng ký.<br>* Nếu `Loại khách hàng` là "Khách hàng vãng lai": ghi nhận Mã khách hàng là "Vãng lai".<br>+ Ghi nhận `Thời điểm đăng ký` là ngày giờ hiện tại của hệ thống tại thời điểm thực hiện thành công, lưu đầy đủ theo định dạng dd/mm/yyyy hh:mm:ss.<br>- Chuyển trạng thái hồ sơ sang **"Chờ ký"** (để Lãnh đạo thực hiện ký duyệt theo [BR-BS-013]).<br>- Đóng popup, đóng màn hình MH03, quay về [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu](#432182-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu) và hiển thị thông báo thành công [MSG-SUC-BS-002] dạng Toast. |
| 2 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và dữ liệu đang thao tác tại màn hình MH03. |


#### 4.3.2.18.6. Quy tắc sinh file PDF và Bảng Ánh xạ ra PDF Bản sao điện tử để Lãnh đạo ký sao điện tử

*a. Cấu trúc file Bản sao điện tử văn bản chứng nhận đăng ký biện pháp bảo đảm*

\- File PDF Bản sao điện tử được hệ thống sinh tự động dựa trên thông tin hồ sơ gốc tra cứu được theo Số đăng ký và thông tin hồ sơ yêu cầu cấp bản sao:

\+ Tiêu đề và thể thức: Tuân thủ quy định tại Nghị định số 99/2022/NĐ-CP và chuẩn thể thức văn bản hành chính điện tử:
  * Quốc hiệu, Tiêu ngữ, Tên cơ quan cấp bản sao (Trung tâm Đăng ký giao dịch, tài sản...).
  * Dòng chữ nổi bật ở đầu trang: **"BẢN SAO ĐIỆN TỬ"** (in hoa, đậm).
  * Tiêu đề văn bản: Trích xuất theo đúng Loại hình đăng ký của hồ sơ gốc (ví dụ: *"VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM - BẢN SAO ĐIỆN TỬ"*, *"VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ THAY ĐỔI BIỆN PHÁP BẢO ĐẢM - BẢN SAO ĐIỆN TỬ"*...).
  * Căn cứ trích xuất: *"Trích xuất từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm"*.

\+ Cấu trúc văn bản gồm 03 khối nội dung:
  * **Khối 1 (Thông tin yêu cầu cấp bản sao)**:
    - Mã hồ sơ yêu cầu cấp bản sao (Mã hồ sơ giấy: `BS-YYYYMMDD-xxxxxx`).
    - Thời điểm tiếp nhận yêu cầu cấp bản sao.
    - Họ và tên / Tên tổ chức Người yêu cầu cấp bản sao.
  * **Khối 2 (Nội dung văn bản chứng nhận của hồ sơ gốc)**:
    - Kế thừa toàn bộ nội dung thông tin đăng ký có hiệu lực pháp lý của hồ sơ gốc truy vấn theo Số đăng ký tại thời điểm cấp bản sao (theo [BR-BS-011]):
      + Số đăng ký hồ sơ gốc.
      + Thời điểm đăng ký hồ sơ gốc (ngày, giờ, phút, giây).
      + Thông tin Bên bảo đảm (Họ tên/tên tổ chức, giấy tờ định danh/mã số thuế, địa chỉ).
      + Thông tin Bên nhận bảo đảm (Họ tên/tên tổ chức, giấy tờ định danh/mã số thuế, địa chỉ).
      + Thông tin Tài sản bảo đảm (Mô tả chi tiết tài sản, số khung phương tiện, giấy tờ tài sản...).
      + Thông tin Hợp đồng bảo đảm (Số hợp đồng, ngày ký kết hợp đồng).
  * **Khối 3 (Vùng ký sao điện tử của Cơ quan đăng ký)**:
    - Lời chứng trích xuất bản sao: *"Xác nhận bản sao điện tử được trích xuất đúng từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm đối với hồ sơ đăng ký số [Số đăng ký], đăng ký lúc [Thời điểm đăng ký] tại [Tên cơ quan tiếp nhận hồ sơ gốc]."*
    - Địa danh, ngày tháng năm cấp bản sao.
    - Chức danh người có thẩm quyền ký sao (GIÁM ĐỐC / PHÓ GIÁM ĐỐC).
    - Vùng chữ ký số: Đặt tại cuối văn bản, hiển thị Chữ ký số và Dấu điện tử của Trung tâm Đăng ký giao dịch, tài sản thuộc Cục Đăng ký quốc gia giao dịch bảo đảm.

*b. Bảng Ánh xạ dữ liệu ra PDF Bản sao điện tử để Lãnh đạo ký sao điện tử*

| Vị trí trên PDF Bản sao điện tử | Nguồn dữ liệu | Bản dự thảo (Cán bộ xem trước tại MH03a) | Bản chính thức (Lãnh đạo ký số tại "Chờ ký") |
| :--- | :--- | :--- | :--- |
| Quốc hiệu, Tiêu ngữ | Chuẩn thể thức văn bản quản lý nhà nước | Kết xuất đầy đủ | Kết xuất đầy đủ |
| Tên cơ quan cấp bản sao | Trung tâm Đăng ký giao dịch, tài sản thụ lý hồ sơ giấy | Kết xuất tên cơ quan | Kết xuất tên cơ quan |
| Dòng chữ "BẢN SAO ĐIỆN TỬ" | Cố định trên biểu mẫu trích xuất bản sao điện tử | Hiển thị in hoa, đậm ở phần đầu văn bản | Hiển thị in hoa, đậm ở phần đầu văn bản |
| Căn cứ trích xuất CSDL | Chuẩn quy định Nghị định 99/2022/NĐ-CP | *"Trích xuất từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm"* | *"Trích xuất từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm"* |
| Mã hồ sơ yêu cầu cấp bản sao | Mã hồ sơ giấy Yêu cầu cung cấp bản sao (`BS-YYYYMMDD-xxxxxx`) | Kết xuất | Kết xuất |
| Thời điểm tiếp nhận yêu cầu | Thời điểm tiếp nhận hồ sơ giấy | Kết xuất (dd/mm/yyyy hh:mm) | Kết xuất (dd/mm/yyyy hh:mm) |
| Người yêu cầu cấp bản sao | Tên cá nhân/tổ chức Người yêu cầu từ hồ sơ tiếp nhận | Kết xuất | Kết xuất |
| Tiêu đề văn bản chứng nhận gốc | Loại hình đăng ký của hồ sơ gốc tra cứu được | Kết xuất tiêu đề tương ứng | Kết xuất tiêu đề tương ứng |
| Số đăng ký hồ sơ gốc | Số đăng ký của hồ sơ gốc tra cứu thành công | Kết xuất | Kết xuất |
| Thời điểm đăng ký của hồ sơ gốc | Thời điểm đăng ký có hiệu lực pháp lý của hồ sơ gốc | Kết xuất (dd/mm/yyyy hh:mm:ss) | Kết xuất (dd/mm/yyyy hh:mm:ss) |
| Thông tin Bên bảo đảm | Dữ liệu Bên bảo đảm của hồ sơ gốc tra cứu được | Kết xuất đầy đủ họ tên, giấy tờ định danh, địa chỉ | Kết xuất đầy đủ họ tên, giấy tờ định danh, địa chỉ |
| Thông tin Bên nhận bảo đảm | Dữ liệu Bên nhận bảo đảm của hồ sơ gốc tra cứu được | Kết xuất đầy đủ tên, giấy tờ định danh, địa chỉ | Kết xuất đầy đủ tên, giấy tờ định danh, địa chỉ |
| Thông tin Tài sản bảo đảm | Danh mục tài sản bảo đảm của hồ sơ gốc tra cứu được | Kết xuất đầy đủ mô tả, số lượng, đặc điểm nhận dạng | Kết xuất đầy đủ mô tả, số lượng, đặc điểm nhận dạng |
| Thông tin Hợp đồng bảo đảm | Số và ngày ký hợp đồng của hồ sơ gốc | Kết xuất | Kết xuất |
| Lời chứng trích xuất bản sao | Quy chuẩn trích xuất CSDL quốc gia | Kết xuất lời chứng xác nhận trích xuất đúng từ CSDL quốc gia | Kết xuất lời chứng xác nhận trích xuất đúng từ CSDL quốc gia |
| Địa danh, ngày tháng năm cấp bản sao | Địa danh của đơn vị; ngày tháng năm lấy theo thời điểm Lãnh đạo ký số | Kết xuất địa danh, bỏ trống ngày tháng | Kết xuất đầy đủ ngày tháng năm ký chính thức |
| Vùng ký sao điện tử của Lãnh đạo | Dịch vụ ký số và chứng thư số của Lãnh đạo tại bước "Chờ ký" | **Bỏ trống vùng ký** (hiển thị khung chờ ký) | **Gắn chữ ký số và dấu điện tử hợp lệ** của Lãnh đạo Trung tâm Đăng ký |

*c. Bản dự thảo và bản chính thức*

\- Bản dự thảo sinh tự động khi Cán bộ bấm "Trình ký" tại MH03 đối với hồ sơ Loại "Bản sao điện tử":
+ Có dấu chìm (watermark) **"DỰ THẢO"** in chéo trên toàn bộ các trang.
+ Vùng ký để trống, chưa gắn chứng thư số.
+ Hiển thị trực quan tại khung xem trước của Popup Trình ký bản sao điện tử (MH03a) để Cán bộ và Lãnh đạo kiểm tra trước tính chính xác của toàn bộ dữ liệu trước khi thực hiện ký.

\- Bản chính thức sinh khi Lãnh đạo ký số thành công bằng USB Token/chứng thư số hợp lệ tại bước "Chờ ký" theo [BR-BS-006]:
+ Loại bỏ hoàn toàn watermark "DỰ THẢO".
+ Điền thời điểm ký chính thức và gắn chữ ký số, chứng thư số điện tử hợp lệ của Lãnh đạo kèm dấu điện tử của đơn vị.
+ Được lưu trữ chính thức vào hồ sơ và phục vụ việc kết xuất, in ấn hoặc trả kết quả điện tử cho Người yêu cầu.
+ Ngoài thời điểm ký và chữ ký số ở vùng ký, toàn bộ nội dung bản chính thức phải trùng khớp hoàn toàn 100% với bản dự thảo mà Cán bộ đã kiểm tra và trình ký.



