### 4.3.2.5. Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận

#### 4.3.2.5.1. Mục đích

\- Cho phép Cán bộ TTĐK xử lý (duyệt chờ ký, trình ký) hoặc từ chối hồ sơ Yêu cầu cung cấp bản sao văn bản chứng nhận trực tuyến ở trạng thái **"Chờ duyệt"**.

\- Hồ sơ giấy Yêu cầu cung cấp bản sao được mô tả tại [Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_ban_sao_Can_bo.md).

*a. Phân quyền*

\- Cán bộ TTĐK được phân quyền xử lý hồ sơ Yêu cầu cung cấp bản sao, chỉ được xử lý hồ sơ thuộc đơn vị được phân công và đang ở trạng thái "Chờ duyệt".

*b. Điều kiện thực hiện*

\- Cán bộ đã đăng nhập thành công vào Website Quản trị.

\- Hồ sơ Yêu cầu cung cấp bản sao Online đã thanh toán thành công/miễn phí và đang ở trạng thái "Chờ duyệt".

#### 4.3.2.5.2. MH01 - Màn hình Danh sách yêu cầu cung cấp bản sao chờ duyệt

##### 4.3.2.5.2.1. Màn hình

![Màn hình Danh sách yêu cầu cung cấp bản sao chờ duyệt](images/UC_BS_CB_MH01_Danh_sach_yeu_cau_cung_cap_ban_sao_cho_xu_ly.png)

##### 4.3.2.5.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã hồ sơ...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ Yêu cầu cung cấp bản sao. |
| Người yêu cầu | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên người yêu cầu...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo tên cá nhân/tổ chức yêu cầu. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng theo Mã khách hàng nộp yêu cầu. |
| Số đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký...".<br>- Tìm kiếm gần đúng, tự động trim space theo Số đăng ký của hồ sơ gốc gắn với yêu cầu. |
| Loại cung cấp bản sao | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Bản sao điện tử<br>+ Bản sao giấy |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| **II. Bảng danh sách hồ sơ chờ duyệt** | | | | |
| Bảng danh sách hồ sơ | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm phân trang.<br>- Chỉ hiển thị hồ sơ Yêu cầu cung cấp bản sao ở trạng thái "Chờ duyệt", thuộc phạm vi xử lý của Cán bộ.<br>- Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên xử lý hồ sơ đến trước.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Tự tăng | Control UI: Label.<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Label.<br>- Mã hồ sơ Yêu cầu cung cấp bản sao. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Control UI: Label.<br>- Thời điểm Khách hàng gửi yêu cầu.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Control UI: Label.<br>- Mã khách hàng gắn với tài khoản nộp yêu cầu, nếu có. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Control UI: Label.<br>- Tên cá nhân/tổ chức yêu cầu. |
| Số đăng ký | String(50) | Có | Theo hồ sơ | Control UI: Label.<br>- Số đăng ký của hồ sơ gốc Khách hàng đã nhập khi gửi yêu cầu. |
| Loại cung cấp bản sao | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label. |
| Số lượng bản sao | Integer(10) | Tùy điều kiện | Theo hồ sơ | Control UI: Label.<br>- Chỉ hiển thị giá trị khi Loại cung cấp bản sao là "Bản sao giấy"; nếu là "Bản sao điện tử", hiển thị `"—"`. |
| Trạng thái | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label dạng nhãn trạng thái (Badge).<br>- Hiển thị trạng thái hiện tại của hồ sơ. |
| Cán bộ xử lý | String(255) | Không | Theo phân công | Control UI: Label.<br>- Hiển thị Cán bộ đang được phân công xử lý, nếu đã có. |
| Thao tác | - | - | - | Control UI: Nhóm nút thao tác trên dòng.<br>Gồm:<br>+ Xử lý hồ sơ<br>+ Từ chối |

##### 4.3.2.5.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Điều kiện ngày không hợp lệ): Từ ngày lớn hơn Đến ngày (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày). Hệ thống hiển thị [MSG-ERR-VAL-007] dạng Inline dưới ô nhập tương ứng. Không thực hiện tìm kiếm.<br><br>TH2 (Không có dữ liệu trả về):<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br><br>TH Hợp lệ: Hệ thống tìm kiếm hồ sơ ở trạng thái "Chờ duyệt" theo các tiêu chí lọc đã nhập, trong phạm vi hồ sơ thuộc quyền xử lý của Cán bộ và hiển thị kết quả lên bảng danh sách. |
| 2 | Xóa bộ lọc | Nút | Đưa toàn bộ tiêu chí lọc về giá trị mặc định và tải lại danh sách hồ sơ chờ duyệt. |
| 3 | Xử lý hồ sơ | Nút | Hệ thống thực hiện: <br>- Thực hiện tra cứu hồ sơ gốc theo đúng Số đăng ký Khách hàng đã nhập khi gửi yêu cầu.<br>- Điền (fill) dữ liệu hồ sơ gốc tra cứu được vào khối **Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng**.<br>- Mở [MH02 - Xử lý hồ sơ yêu cầu cung cấp bản sao](#43253-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-ban-sao). |
| 4 | Từ chối | Nút | Mở [MH04 - Popup Từ chối yêu cầu cung cấp bản sao](#43255-mh04---popup-tu-choi-yeu-cau-cung-cap-ban-sao). |

#### 4.3.2.5.3. MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp bản sao

##### 4.3.2.5.3.1. Màn hình

![Màn hình Xử lý hồ sơ yêu cầu cung cấp bản sao](images/UC_BS_CB_MH02_Xu_ly_ho_so_yeu_cau_cung_cap_ban_sao.png)

##### 4.3.2.5.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin yêu cầu cung cấp bản sao** | | | | Toàn bộ dữ liệu chỉ đọc, không cho phép sửa. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Loại cung cấp bản sao | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số lượng bản sao | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi (kèm chữ "bản"), chỉ hiển thị khi Loại cung cấp bản sao là "Bản sao giấy". |
| **II. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng** | - | Có | Theo hồ sơ gốc | Control UI: Khối hiển thị chi tiết hồ sơ gốc, chỉ đọc.<br>- Dữ liệu được hệ thống tra cứu theo Số đăng ký Khách hàng đã nhập và tự động điền khi Cán bộ bấm "Xử lý hồ sơ".<br>- Toàn bộ cấu trúc khối và các trường thông tin chi tiết tham chiếu tại [Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng - Tra cứu hồ sơ theo mã số sử dụng CSDL - Website Khách hàng](../../01_Website_Khach_hang/SRS_Tra%20cứu%20theo%20mã%20số%20CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong). |

##### 4.3.2.5.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Duyệt chờ ký | Nút | Hệ thống thực hiện:<br>- Ghi nhận Cán bộ xử lý và thời điểm xử lý (dd/mm/yyyy hh:mm:ss).<br>- Chuyển hồ sơ sang trạng thái "Duyệt chờ ký".<br>- Ghi lịch sử xử lý và Audit log.<br>- Đóng màn hình xử lý, quay về [MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt](#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet) và hiển thị [MSG-SUC-BS-001] (*"Duyệt yêu cầu cung cấp bản sao thành công."*) dạng Toast. |
| 2 | Trình ký | Nút | Khi bấm, hệ thống phân biệt mở popup theo Loại cung cấp bản sao của hồ sơ:<br>+ **Nếu Loại cung cấp bản sao là "Bản sao điện tử"**: Hệ thống tự động trích xuất dữ liệu hồ sơ gốc theo Số đăng ký, tự động sinh file PDF dự thảo Bản sao điện tử văn bản chứng nhận đăng ký biện pháp bảo đảm (có watermark "DỰ THẢO" in chéo) theo đúng [Quy tắc sinh file PDF và Bảng Ánh xạ ra PDF Bản sao điện tử để Lãnh đạo ký sao điện tử - Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_ban_sao_Can_bo.md#432186-quy-tac-sinh-file-pdf-va-bang-anh-xa-ra-pdf-ban-sao-dien-tu-de-lanh-dao-ky-sao-dien-tu) và mở [MH03a - Popup Trình ký bản sao điện tử](#432541-mh03a---popup-trinh-ky-ban-sao-dien-tu).<br>+ **Nếu Loại cung cấp bản sao là "Bản sao giấy"**: Hệ thống không sinh file PDF và mở [MH03b - Popup Trình ký bản sao giấy](#432542-mh03b---popup-trinh-ky-ban-sao-giay). |
| 3 | Hủy bỏ | Nút | Đóng màn hình xử lý, không thay đổi trạng thái hồ sơ, quay về [MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt](#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet) và giữ nguyên bộ lọc trước đó. |

#### 4.3.2.5.4. Popup Trình ký yêu cầu cung cấp bản sao

##### 4.3.2.5.4.1. MH03a - Popup Trình ký bản sao điện tử

*a. Giao diện màn hình*

![Popup Trình ký bản sao điện tử](images/BS_MH03a_Popup_trinh_ky_ban_sao_dien_tu.png)

*b. Mô tả thông tin trên popup*

- **Quy chuẩn kích thước và bố cục**: Kích thước chiều ngang đạt chuẩn `800px`, `max-height: 90vh`; phần thân popup (Modal Body) đạt chuẩn padding `24px` kết hợp `overflow-y: auto`, tiêu đề (Header) và nút bấm (Footer) cố định (Sticky) theo Quy tắc thiết kế UI.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label, chỉ đọc. Hiển thị: **"Trình ký yêu cầu cung cấp bản sao điện tử: [Mã hồ sơ]"**. |
| **I. Thông tin trình ký** | - | - | - | |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số đăng ký hồ sơ gốc | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | Control UI: Dropdown list.<br>- Bắt buộc chọn trước khi xác nhận trình ký.<br>- Hiển thị danh sách Lãnh đạo có thẩm quyền ký số còn hiệu lực của Trung tâm đăng ký, lấy từ Cấu hình thông tin về người ký của đơn vị.<br>- Lãnh đạo được chọn là người thực hiện ký số file PDF bản sao điện tử tại trạng thái "Chờ ký". |
| **II. Khối Dự thảo Bản sao điện tử** | - | Có | Mở rộng | |
| File PDF dự thảo | File | Có | Tự động sinh | Control UI: Khung xem trước tệp PDF (PDF Viewer nhúng).<br>- Hiển thị bản dự thảo Bản sao điện tử văn bản chứng nhận (có watermark "DỰ THẢO") do hệ thống sinh khi Cán bộ bấm "Trình ký".<br>- Cho phép phóng to, thu nhỏ, cuộn các trang để Cán bộ đối soát trước khi trình ký.<br>- Kèm 02 liên kết: `Xem file` và `Tải tệp`. |

*c. Chức năng trên popup*

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Liên kết | Mở file PDF dự thảo Bản sao điện tử trong một tab mới của trình duyệt ở khổ xem đầy đủ. |
| 2 | Tải tệp | Liên kết | Tải file PDF dự thảo Bản sao điện tử về máy của Cán bộ. |
| 3 | Xác nhận trình ký | Nút | TH1 (Chưa chọn Lãnh đạo ký): Quy định Lãnh đạo ký là bắt buộc. Hệ thống tô viền đỏ ô chọn Lãnh đạo, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô chọn và tự động focus con trỏ vào ô lỗi. Không thực hiện trình ký.<br><br>TH Hợp lệ: Hệ thống thực hiện:<br>- Khóa phiên bản file PDF dự thảo Bản sao điện tử vừa sinh; Cán bộ và Lãnh đạo không được thay thế file đã trình ký.<br>- Ghi nhận Cán bộ trình ký, thời điểm trình ký (dd/mm/yyyy hh:mm:ss) và Lãnh đạo ký đã chọn.<br>- Chuyển trạng thái hồ sơ sang **"Chờ ký"**, chuyển hồ sơ vào hàng chờ ký số của Lãnh đạo đã chọn.<br>- Ghi lịch sử xử lý và Audit log.<br>- Đóng popup và [MH02 - Xử lý hồ sơ yêu cầu cung cấp bản sao](#43253-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-ban-sao), quay về [MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt](#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet) và hiển thị [MSG-SUC-BS-002] dạng Toast. |
| 4 | Hủy | Nút | Đóng popup, không lưu file PDF dự thảo vừa sinh vào hồ sơ, giữ nguyên trạng thái hồ sơ và quay lại [MH02 - Xử lý hồ sơ yêu cầu cung cấp bản sao](#43253-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-ban-sao). |

##### 4.3.2.5.4.2. MH03b - Popup Trình ký bản sao giấy

*a. Giao diện màn hình*

![Popup Trình ký bản sao giấy](images/BS_MH03b_Popup_trinh_ky_ban_sao_giay.png)

*b. Mô tả thông tin trên popup*

- **Quy chuẩn kích thước và bố cục**: Kích thước chiều ngang đạt chuẩn `650px`, `max-height: 90vh`; bố cục dạng lưới 2 cột song song (Grid 50%-50%), padding `24px`, tiêu đề và nút bấm cố định theo Quy tắc thiết kế UI.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label, chỉ đọc. Hiển thị: **"Trình ký yêu cầu cung cấp bản sao giấy: [Mã hồ sơ]"**. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số đăng ký hồ sơ gốc | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số lượng bản sao | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi (kèm chữ "bản"). |
| Lãnh đạo ký duyệt | Enum(String(255)) | Có | Trống | Control UI: Dropdown list.<br>- Bắt buộc chọn trước khi xác nhận trình ký.<br>- Hiển thị danh sách Lãnh đạo có thẩm quyền ký duyệt còn hiệu lực của đơn vị, lấy từ Cấu hình thông tin về người ký của đơn vị.<br>- Lãnh đạo được chọn thực hiện ký duyệt (không ký số) tại trạng thái "Chờ ký" trước bước trả kết quả giấy. |

*c. Chức năng trên popup*

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận trình ký | Nút | TH1 (Chưa chọn Lãnh đạo ký duyệt): Quy định Lãnh đạo ký duyệt là bắt buộc. Hệ thống tô viền đỏ ô chọn Lãnh đạo, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô chọn và tự động focus con trỏ vào ô lỗi. Không thực hiện trình ký.<br><br>TH Hợp lệ: Hệ thống thực hiện:<br>- Ghi nhận Cán bộ trình ký, thời điểm trình ký (dd/mm/yyyy hh:mm:ss) và Lãnh đạo ký duyệt đã chọn.<br>- Chuyển trạng thái hồ sơ sang **"Chờ ký"** để Lãnh đạo thực hiện ký duyệt.<br>- Ghi lịch sử xử lý và Audit log.<br>- Đóng popup và [MH02 - Xử lý hồ sơ yêu cầu cung cấp bản sao](#43253-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-ban-sao), quay về [MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt](#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet) và hiển thị [MSG-SUC-BS-002] dạng Toast. |
| 2 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại [MH02 - Xử lý hồ sơ yêu cầu cung cấp bản sao](#43253-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-ban-sao). |

#### 4.3.2.5.5. MH04 - Popup Từ chối yêu cầu cung cấp bản sao

##### 4.3.2.5.5.1. Màn hình

![Popup Từ chối yêu cầu cung cấp bản sao](images/UC_BS_CB_MH04_Popup_tu_choi_yeu_cau_cung_cap_ban_sao.png)

##### 4.3.2.5.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label, chỉ đọc. Hiển thị: **"Từ chối yêu cầu cung cấp bản sao: [Mã hồ sơ]"**. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Lý do từ chối | Text(1000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.5.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại [MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt](#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet). |
| 2 | Xác nhận từ chối | Nút | TH1 (Bỏ trống Lý do từ chối): Quy định Lý do từ chối là bắt buộc. Hệ thống tô viền đỏ ô Lý do từ chối, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập và focus vào ô lỗi. Không thực hiện từ chối.<br><br>TH2 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Quy định chỉ được từ chối hồ sơ đang ở trạng thái "Chờ duyệt". Hệ thống hiển thị [MSG-ERR-BS-002] dạng Toast. Không thực hiện từ chối.<br><br>TH Hợp lệ: Hệ thống thực hiện ngay, không hiển thị thêm bước xác nhận:<br>- Lưu người từ chối, thời điểm từ chối, lý do từ chối và ghi lịch sử xử lý.<br>- Chuyển hồ sơ sang trạng thái "Bị từ chối".<br>- Tạo yêu cầu hoàn tiền cho hồ sơ theo [Quy tắc tạo yêu cầu hoàn tiền khi từ chối hồ sơ Online](../01_Quan_tri_he_thong/Quan_ly_doi_soat_thanh_toan.md#6-quy-tac-tao-yeu-cau-hoan-tien-khi-tu-choi-ho-so-online).<br>- Đóng popup, tải lại [MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt](#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet), loại hồ sơ khỏi danh sách chờ duyệt và hiển thị [MSG-SUC-BS-004] dạng Toast. |

#### 4.3.2.5.6. MH05 - Màn hình Danh sách và Xác nhận trả kết quả bản sao giấy

##### 4.3.2.5.6.1. Màn hình

Áp dụng chung cho hồ sơ Loại cung cấp bản sao là "Bản sao giấy" ở trạng thái "Đã duyệt - chờ trả kết quả", bất kể Nguồn tiếp nhận là Online hay "Cán bộ nhập liệu" (hồ sơ giấy tham chiếu màn hình này từ [Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_ban_sao_Can_bo.md), không thiết kế màn hình riêng).

![Màn hình Danh sách và Xác nhận trả kết quả bản sao giấy](images/UC_BS_CB_MH05_Danh_sach_xac_nhan_tra_ket_qua_ban_sao_giay.png)

##### 4.3.2.5.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Tìm kiếm | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo Mã hồ sơ, Người yêu cầu hoặc Số đăng ký. |
| Nguồn tiếp nhận | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Dịch vụ công<br>+ Trực tuyến<br>+ Trực tiếp |
| **II. Bảng danh sách hồ sơ** | | | | |
| Bảng danh sách hồ sơ | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm phân trang.<br>- Chỉ hiển thị hồ sơ Loại "Bản sao giấy" ở trạng thái "Đã duyệt - chờ trả kết quả" thuộc phạm vi xử lý của Cán bộ.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Tự tăng | Control UI: Label.<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Label. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Control UI: Label. |
| Số đăng ký | String(50) | Có | Theo hồ sơ | Control UI: Label. |
| Số lượng bản sao | Integer(10) | Có | Theo hồ sơ | Control UI: Label. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label. |
| Thời điểm duyệt | Datetime | Có | Theo hồ sơ | Control UI: Label.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Thao tác | - | - | - | Control UI: Nút thao tác trên dòng.<br>- Hiển thị nút "Xác nhận trả kết quả". |

##### 4.3.2.5.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận trả kết quả | Nút | TH1 (Hồ sơ không còn ở trạng thái "Đã duyệt - chờ trả kết quả"): Quy định chỉ được xác nhận trả kết quả đối với hồ sơ "Bản sao giấy" đang ở trạng thái "Đã duyệt - chờ trả kết quả". Hệ thống hiển thị [MSG-ERR-DK-005] dạng Toast, không cho phép xác nhận.<br><br>TH Hợp lệ: Hệ thống hiển thị popup xác nhận [MSG-CFM-BS-005]:<br>+ Chọn "Có": Hệ thống lưu người xác nhận, thời điểm trả kết quả, chuyển hồ sơ sang "Hoàn thành" và hiển thị [MSG-SUC-BS-006] dạng Toast.<br>+ Chọn "Không": Đóng popup xác nhận, giữ nguyên trạng thái hồ sơ. |
