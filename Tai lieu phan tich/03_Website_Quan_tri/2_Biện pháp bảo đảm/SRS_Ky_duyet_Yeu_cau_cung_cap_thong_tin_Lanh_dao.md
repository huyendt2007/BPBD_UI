### 4.3.2.3. Ký số yêu cầu cung cấp thông tin

#### 4.3.2.3.1. Mục đích

\- Cho phép Lãnh đạo ký số, từ chối hoặc trả lại (đối với hồ sơ giấy) hồ sơ Yêu cầu cung cấp thông tin đã được Cán bộ trình ký ở trạng thái **"Chờ ký"**.

*a. Phân quyền*

\- Lãnh đạo được phân quyền ký số hồ sơ Yêu cầu cung cấp thông tin, chỉ được xem và xử lý hồ sơ thuộc đơn vị quản lý, thuộc phạm vi thẩm quyền và được Cán bộ trình tới đúng Lãnh đạo đó.

*b. Điều kiện thực hiện*

\- Lãnh đạo đã đăng nhập thành công vào Website Quản trị.

\- Hồ sơ đang ở trạng thái "Chờ ký" và đã có file PDF kết quả cung cấp thông tin được Cán bộ trình ký.

\- Máy trạm của Lãnh đạo có thành phần ký số cục bộ và USB Token/chứng thư số hợp lệ để thực hiện ký số.

#### 4.3.2.3.2. MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký

##### 4.3.2.3.2.1. Màn hình

![Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](images/UC_CCTT_LD_MH04_Danh_sach_yeu_cau_cung_cap_thong_tin_cho_ky.png)

##### 4.3.2.3.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã hồ sơ CCTT...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng theo Mã khách hàng nộp yêu cầu. |
| Nguồn tiếp nhận | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Trực tuyến<br>+ Trực tiếp |
| Cán bộ xử lý | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Chọn Cán bộ đã xử lý và trình ký hồ sơ hoặc chọn "Tất cả".<br>- Danh sách lấy theo cán bộ thuộc đơn vị quản lý của Lãnh đạo đăng nhập. |
| Tiêu chí yêu cầu cung cấp thông tin | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Số đăng ký<br>+ Bên bảo đảm<br>+ Số khung |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| **II. Bảng danh sách hồ sơ chờ ký** | | | | |
| Bảng danh sách hồ sơ | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm phân trang.<br>- **Mặc định khi mở màn hình**: hiển thị các hồ sơ Yêu cầu cung cấp thông tin ở trạng thái "Chờ ký" được Cán bộ trình tới Lãnh đạo đang đăng nhập, có Thời điểm đăng ký từ ngày 01 của tháng hiện tại đến ngày hiện tại, các bộ lọc còn lại là "Tất cả"/Trống, 20 bản ghi/trang.<br>- Sắp xếp mặc định theo Thời điểm trình ký tăng dần để ưu tiên hồ sơ được trình trước.<br>- Click trực tiếp vào dòng dữ liệu để mở [MH02 - Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ ký](#43233-mh02---man-hinh-xem-chi-tiet-ho-so-yeu-cau-cung-cap-thong-tin-cho-ky).<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]. |
| Checkbox chọn tất cả | Boolean | Không | Không chọn | Control UI: Checkbox tại dòng tiêu đề bảng.<br>- Chọn/bỏ chọn toàn bộ hồ sơ đủ điều kiện ký trên trang hiện tại. |
| Checkbox chọn | Boolean | Không | Không chọn | Control UI: Checkbox tại từng dòng.<br>- Chọn một hoặc nhiều hồ sơ để ký số cùng một lúc.<br>- Hồ sơ không có file PDF chờ ký hợp lệ: checkbox ở trạng thái mờ (Disabled) kèm tooltip lý do. |
| STT | Integer(10) | Không | Tự tăng | Control UI: Label.<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã hồ sơ | String(50) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Mã khách hàng | String(50) | Không | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Mã khách hàng gắn với tài khoản nộp yêu cầu, nếu có. |
| Người yêu cầu | String(255) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Tên cá nhân/tổ chức yêu cầu cung cấp thông tin. |
| Địa chỉ | Text(500) | Không | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Địa chỉ của Người yêu cầu theo thông tin trong hồ sơ. |
| Tiêu chí yêu cầu | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Hiển thị một trong các giá trị: "Số đăng ký", "Bên bảo đảm", "Số khung". |
| Dữ liệu đã nhập | Text(1000) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Tóm tắt dữ liệu tra cứu theo tiêu chí yêu cầu. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Hiển thị "Trực tuyến" hoặc "Trực tiếp". |
| Thời điểm đăng ký | Datetime | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Cán bộ xử lý | String(255) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Cán bộ đã xử lý và trình ký hồ sơ. |
| Thời điểm trình ký | Datetime | Có | Lấy theo dữ liệu bản ghi | Control UI: Label.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Trạng thái | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge).<br>- Hiển thị trạng thái hiện tại của hồ sơ. |
| Thao tác | - | - | - | Control UI: Nhóm nút thao tác trên dòng.<br>Gồm:<br>+ Ký số<br>+ Từ chối: chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>+ Trả lại: chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp". |

##### 4.3.2.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Điều kiện ngày không hợp lệ): Từ ngày lớn hơn Đến ngày (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày). Hệ thống hiển thị [MSG-ERR-VAL-007] dạng Inline dưới ô nhập tương ứng. Không thực hiện tìm kiếm.<br><br>TH2 (Không có dữ liệu trả về):<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br><br>TH Hợp lệ: Hệ thống tìm kiếm hồ sơ ở trạng thái "Chờ ký" được trình tới Lãnh đạo đăng nhập theo các tiêu chí lọc đã nhập và hiển thị kết quả lên bảng danh sách. |
| 2 | Xóa bộ lọc | Nút | Đưa toàn bộ tiêu chí lọc về giá trị mặc định và tải lại danh sách hồ sơ chờ ký. |
| 3 | Click dòng dữ liệu | Row Click | Mở [MH02 - Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ ký](#43233-mh02---man-hinh-xem-chi-tiet-ho-so-yeu-cau-cung-cap-thong-tin-cho-ky) của hồ sơ được chọn. |
| 4 | Ký số | Nút | Cho phép ký số một hồ sơ (nút trên dòng) hoặc nhiều hồ sơ cùng lúc (nút trên thanh công cụ, theo các hồ sơ đã tích chọn).<br>TH1 (Chưa chọn hồ sơ khi ký nhiều hồ sơ): Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-CCTT-008] dạng Toast. Không mở popup ký số.<br><br>TH2 (Có hồ sơ không còn ở trạng thái "Chờ ký"): Hệ thống hiển thị [MSG-ERR-CCTT-013] dạng Toast. Không mở popup ký số.<br><br>TH3 (Có hồ sơ không có file PDF chờ ký hợp lệ): Hệ thống hiển thị [MSG-ERR-CCTT-009] dạng Toast. Không mở popup ký số.<br><br>TH Hợp lệ: Mở [MH03 - Popup Ký số yêu cầu cung cấp thông tin](#43234-mh03---popup-ky-so-yeu-cau-cung-cap-thong-tin) với danh sách hồ sơ đã chọn. |
| 5 | Từ chối | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>TH1 (Hồ sơ không còn ở trạng thái "Chờ ký"): Hệ thống hiển thị [MSG-ERR-CCTT-013] dạng Toast. Không mở popup.<br><br>TH Hợp lệ: Mở [MH04 - Popup Từ chối/Trả lại hồ sơ giấy yêu cầu cung cấp thông tin](#43235-mh04---popup-tu-choitra-lai-ho-so-giay-yeu-cau-cung-cap-thong-tin) với Loại xử lý mặc định là "Từ chối". |
| 6 | Trả lại | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>TH1 (Hồ sơ không còn ở trạng thái "Chờ ký"): Hệ thống hiển thị [MSG-ERR-CCTT-013] dạng Toast. Không mở popup.<br><br>TH Hợp lệ: Mở [MH04 - Popup Từ chối/Trả lại hồ sơ giấy yêu cầu cung cấp thông tin](#43235-mh04---popup-tu-choitra-lai-ho-so-giay-yeu-cau-cung-cap-thong-tin) với Loại xử lý mặc định là "Trả lại". |

#### 4.3.2.3.3. MH02 - Màn hình Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ ký

##### 4.3.2.3.3.1. Màn hình

![Màn hình Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ ký](images/UC_CCTT_LD_MH02_Chi_tiet_ho_so_cho_duyet.png)

##### 4.3.2.3.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ** | | | | Toàn bộ dữ liệu chỉ đọc, không cho phép sửa. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Mã khách hàng | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Địa chỉ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Nguồn tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Tiêu chí yêu cầu cung cấp thông tin | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Dữ liệu tra cứu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Trạng thái hồ sơ | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Cán bộ xử lý | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Thời điểm trình ký | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| **II. File PDF chờ ký** | | | | |
| File PDF kết quả cung cấp thông tin | File | Có | Lấy theo dữ liệu bản ghi | Control UI: Khung xem trước tệp PDF (PDF Viewer nhúng), chỉ đọc, kèm 02 liên kết `Xem file` và `Tải tệp`.<br>- Hiển thị file PDF đã được Cán bộ trình ký và khóa phiên bản, sinh theo [Quy tắc xử lý kết quả tra cứu và kết xuất PDF kết quả cung cấp thông tin - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#43227-quy-tac-xu-ly-ket-qua-tra-cuu-va-ket-xuat-pdf-ket-qua-cung-cap-thong-tin). |
| **III. Kết quả tra cứu** | | | | |
| Thông báo không có dữ liệu | Text(1000) | Tùy điều kiện | [MSG-WRN-CCTT-001] | Control UI: Khung cảnh báo Inline (Alert warning).<br>- Chỉ hiển thị khi kết quả tra cứu đã trình ký không có dữ liệu. |
| Bảng danh sách kết quả tra cứu | Text(4000) | Tùy điều kiện | Lấy theo dữ liệu bản ghi | Control UI: Khối hiển thị danh sách hồ sơ, chỉ đọc.<br>- Chỉ hiển thị khi kết quả tra cứu đã trình ký có dữ liệu.<br>- Hiển thị giống hệt [VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký - Yêu cầu cung cấp thông tin (Website Khách hàng)](../../01_Website_Khach_hang/SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md#vi-ket-qua-cung-cap-thong-tin-co-xac-nhan-cua-co-quan-dang-ky). |

##### 4.3.2.3.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Liên kết | Mở file PDF kết quả cung cấp thông tin trong một tab mới của trình duyệt. |
| 2 | Tải tệp | Liên kết | Tải file PDF kết quả cung cấp thông tin về máy của Lãnh đạo. |
| 3 | Ký số | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ ký"): Hệ thống hiển thị [MSG-ERR-CCTT-013] dạng Toast. Không mở popup ký số.<br><br>TH Hợp lệ: Mở [MH03 - Popup Ký số yêu cầu cung cấp thông tin](#43234-mh03---popup-ky-so-yeu-cau-cung-cap-thong-tin) cho hồ sơ đang xem. |
| 4 | Từ chối | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp". Mở [MH04 - Popup Từ chối/Trả lại hồ sơ giấy yêu cầu cung cấp thông tin](#43235-mh04---popup-tu-choitra-lai-ho-so-giay-yeu-cau-cung-cap-thong-tin) với Loại xử lý mặc định là "Từ chối". |
| 5 | Trả lại | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp". Mở [MH04 - Popup Từ chối/Trả lại hồ sơ giấy yêu cầu cung cấp thông tin](#43235-mh04---popup-tu-choitra-lai-ho-so-giay-yeu-cau-cung-cap-thong-tin) với Loại xử lý mặc định là "Trả lại". |
| 6 | Đóng | Nút | Đóng màn hình xem chi tiết, quay về [MH01 - Danh sách yêu cầu cung cấp thông tin chờ ký](#43232-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-thong-tin-cho-ky) và giữ nguyên bộ lọc trước đó. |

#### 4.3.2.3.4. MH03 - Popup Ký số yêu cầu cung cấp thông tin

##### 4.3.2.3.4.1. Màn hình

![Popup Ký số yêu cầu cung cấp thông tin](images/UC_CCTT_LD_MH05_Popup_ky_so_yeu_cau_cung_cap_thong_tin.png)

##### 4.3.2.3.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin ký số** | | | | |
| Danh sách hồ sơ ký số | Text(4000) | Có | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Hiển thị một hoặc nhiều hồ sơ đã chọn tại [MH01 - Danh sách yêu cầu cung cấp thông tin chờ ký](#43232-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-thong-tin-cho-ky) hoặc hồ sơ đang xem tại [MH02 - Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ ký](#43233-mh02---man-hinh-xem-chi-tiet-ho-so-yeu-cau-cung-cap-thong-tin-cho-ky).<br>- Gồm các cột: Mã hồ sơ, Người yêu cầu, Tiêu chí yêu cầu, Dữ liệu đã nhập, Nguồn tiếp nhận, File PDF chờ ký (liên kết `Xem file`), Trạng thái ký số. |
| Số lượng hồ sơ | Integer(10) | Có | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Tổng số hồ sơ được chọn để ký số. |
| Hình thức ký số | Enum(String(50)) | Có | "USB Token Ban Cơ yếu Chính phủ" | Control UI: Label, chỉ đọc. |
| **II. Thông tin thiết bị ký số** | | | | |
| Trạng thái USB Token | Enum(String(50)) | Không | Chưa kiểm tra | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa kiểm tra<br>+ Đã nhận thiết bị<br>+ Không nhận thiết bị<br>+ Chứng thư số không hợp lệ<br>+ Chứng thư số hợp lệ |
| Chứng thư số | Text(1000) | Không | Theo USB Token | Control UI: Label, chỉ đọc.<br>- Thông tin chứng thư số đọc được từ USB Token. |
| Người ký | String(255) | Không | Theo chứng thư số | Control UI: Label, chỉ đọc.<br>- Người sở hữu chứng thư số dùng để ký. |
| Thời hạn chứng thư số | String(255) | Không | Theo chứng thư số | Control UI: Label, chỉ đọc. |
| Trạng thái ký số | Enum(String(50)) | Không | "Chưa ký" | Control UI: Label dạng nhãn trạng thái (Badge) tại từng dòng của Danh sách hồ sơ ký số, chỉ đọc.<br>Gồm:<br>+ Chưa ký<br>+ Đang ký<br>+ Ký thành công<br>+ Ký lỗi |

##### 4.3.2.3.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Kiểm tra USB Token | Nút | TH1 (USB Token chưa sẵn sàng hoặc không đọc được chứng thư số hợp lệ): Hệ thống hiển thị [MSG-ERR-CCTT-010] và chưa cho phép ký số.<br><br>TH2 (Chứng thư số không khớp với Lãnh đạo được phân công ký): Hệ thống hiển thị [MSG-ERR-CCTT-012] và chưa cho phép ký số.<br><br>TH Hợp lệ: Hệ thống nhận diện USB Token, đọc chứng thư số, kiểm tra thời hạn chứng thư số, kiểm tra trạng thái thu hồi nếu có tích hợp OCSP/CRL và hiển thị trạng thái "Chứng thư số hợp lệ". |
| 2 | Ký số | Nút | Ký số toàn bộ hồ sơ trong danh sách chỉ với một lần xác nhận; hệ thống ký lần lượt từng file PDF, mỗi hồ sơ có kết quả ký độc lập.<br>TH1 (USB Token/chứng thư số chưa hợp lệ): Hệ thống hiển thị [MSG-ERR-CCTT-010] hoặc [MSG-ERR-CCTT-012]. Không thực hiện ký số.<br><br>TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có file PDF chờ ký hợp lệ): Hệ thống hiển thị [MSG-ERR-CCTT-013] hoặc [MSG-ERR-CCTT-009] và không ký hồ sơ đó; các hồ sơ hợp lệ khác vẫn được ký.<br><br>TH3 (Lãnh đạo hủy ký, nhập sai PIN hoặc thành phần ký số trả lỗi): Hệ thống hiển thị [MSG-ERR-CCTT-011], ghi nhận lỗi ký số, cập nhật Trạng thái ký số của hồ sơ là "Ký lỗi" và giữ nguyên trạng thái hồ sơ "Chờ ký".<br><br>TH Hợp lệ: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-CCTT-002]. Sau khi Lãnh đạo xác nhận:<br>- Thành phần ký số cục bộ yêu cầu nhập PIN USB Token; hệ thống không lưu PIN.<br>- Hệ thống ký số trực tiếp trên file PDF chờ ký tại vùng ký của lá mặt/trang ký, xác minh chữ ký sau khi ký.<br>- Lưu file PDF đã ký, thông tin chứng thư số, người ký, thời điểm ký, phiên bản file đã ký; ghi lịch sử xử lý và Audit log.<br>- Chuyển hồ sơ ký thành công sang trạng thái "Hoàn thành"; file PDF đã ký là file Khách hàng được xem/tải trên Website Khách hàng.<br>- Hiển thị [MSG-SUC-CCTT-007], đóng popup và tải lại [MH01 - Danh sách yêu cầu cung cấp thông tin chờ ký](#43232-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-thong-tin-cho-ky). |
| 3 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |

#### 4.3.2.3.5. MH04 - Popup Từ chối/Trả lại hồ sơ giấy yêu cầu cung cấp thông tin

##### 4.3.2.3.5.1. Màn hình

![Popup Từ chối/Trả lại hồ sơ giấy yêu cầu cung cấp thông tin](images/UC_CCTT_LD_MH06_Popup_tu_choi_tra_lai_ho_so_giay_CCTT.png)

##### 4.3.2.3.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label, chỉ đọc. Hiển thị: **"Từ chối/Trả lại yêu cầu cung cấp thông tin: [Mã hồ sơ]"**. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số đơn giấy | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Tiêu chí yêu cầu cung cấp thông tin | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Dữ liệu tra cứu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| File PDF chờ ký | File | Có | Lấy theo dữ liệu bản ghi | Control UI: Liên kết `Xem file`, chỉ đọc.<br>- File PDF đã được Cán bộ trình ký và đang chờ Lãnh đạo ký số. |
| Loại xử lý | Enum(String(50)) | Có | Theo nút đã chọn | Control UI: Radio button.<br>Gồm:<br>+ Từ chối<br>+ Trả lại |
| Lý do | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối/trả lại...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.3.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 2 | Xác nhận | Nút | TH1 (Bỏ trống Lý do): Quy định Lý do là bắt buộc. Hệ thống tô viền đỏ ô Lý do, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập và focus vào ô lỗi. Không thực hiện.<br><br>TH2 (Hồ sơ không phải hồ sơ giấy hoặc không còn ở trạng thái "Chờ ký"): Quy định chỉ được từ chối/trả lại hồ sơ có Nguồn tiếp nhận là "Trực tiếp" đang ở trạng thái "Chờ ký". Hệ thống hiển thị [MSG-ERR-CCTT-013] dạng Toast. Không thực hiện.<br><br>TH Hợp lệ với Loại xử lý là "Từ chối": Hệ thống thực hiện ngay, không hiển thị thêm bước xác nhận:<br>- Lưu người từ chối, thời điểm từ chối, lý do từ chối, file PDF chờ ký, kết quả tra cứu và ghi lịch sử xử lý.<br>- Chuyển hồ sơ sang trạng thái "Bị từ chối".<br>- Tạo khoản hoàn phí/thông báo kế toán tại Module Quản lý thu phí/hoàn phí hồ sơ giấy (nếu hồ sơ đã thu phí).<br>- Hiển thị [MSG-SUC-CCTT-006], đóng popup và tải lại [MH01 - Danh sách yêu cầu cung cấp thông tin chờ ký](#43232-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-thong-tin-cho-ky).<br><br>TH Hợp lệ với Loại xử lý là "Trả lại": Hệ thống thực hiện ngay, không hiển thị thêm bước xác nhận:<br>- Lưu người trả lại, thời điểm trả lại, lý do trả lại, phiên bản dữ liệu/PDF bị trả lại và ghi lịch sử xử lý.<br>- Chuyển hồ sơ sang trạng thái "Bị trả lại" để Cán bộ giải quyết sửa dữ liệu, tra cứu lại và trình ký lại tại [Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_thong_tin_Can_bo.md). Thao tác trả lại không phát sinh hoàn phí.<br>- Hiển thị [MSG-SUC-CCTT-009], đóng popup và tải lại [MH01 - Danh sách yêu cầu cung cấp thông tin chờ ký](#43232-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-thong-tin-cho-ky). |
