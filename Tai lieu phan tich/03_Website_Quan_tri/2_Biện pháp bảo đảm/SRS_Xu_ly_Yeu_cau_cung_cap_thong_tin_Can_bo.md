### 4.3.2.2. Xử lý yêu cầu cung cấp thông tin

#### 4.3.2.2.1. Mục đích

\- Cho phép Cán bộ TTĐK thực hiện tra cứu, xử lý hoặc từ chối hồ sơ Yêu cầu cung cấp thông tin trực tuyến ở trạng thái **"Chờ duyệt"**.

\- Hồ sơ giấy Yêu cầu cung cấp thông tin được mô tả tại [Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_thong_tin_Can_bo.md).

*a. Phân quyền*

\- Cán bộ TTĐK được phân quyền xử lý hồ sơ Yêu cầu cung cấp thông tin.

\- Cán bộ chỉ được xử lý hồ sơ thuộc Trung tâm đăng ký giao dịch, tài sản/đơn vị được phân công.

\- Cán bộ chỉ được xử lý hoặc từ chối hồ sơ đang ở trạng thái "Chờ duyệt".

*b. Điều kiện thực hiện*

\- Cán bộ đã đăng nhập thành công vào Website Quản trị.

\- Hồ sơ Yêu cầu cung cấp thông tin Online đã thanh toán thành công/miễn phí và đang ở trạng thái "Chờ duyệt".

\- Hệ thống có cấu hình mẫu PDF kết quả cung cấp thông tin theo `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf` đang hiệu lực.

*c. Nguyên tắc dữ liệu tra cứu*

\- Hệ thống tự động xác định tiêu chí Khách hàng đã lựa chọn: "Số đăng ký", "Bên bảo đảm" hoặc "Số khung", tự động điền dữ liệu Khách hàng đã gửi vào khối tra cứu và tự động thực hiện kiểm tra khi Cán bộ mở màn hình xử lý.

\- Toàn bộ dữ liệu tra cứu ở trạng thái chỉ đọc. Cán bộ không được thay đổi tiêu chí, loại chủ thể, số giấy tờ, họ tên, tên tổ chức, số đăng ký, số khung hoặc thêm/bớt điều kiện tra cứu.

#### 4.3.2.2.2. MH01 - Màn hình Danh sách hồ sơ chờ duyệt

##### 4.3.2.2.2.1. Màn hình

![Màn hình Danh sách hồ sơ chờ duyệt](images/UC_CCTT_CB_MH01_Danh_sach_yeu_cau_cung_cap_thong_tin_cho_xu_ly.png)

##### 4.3.2.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã hồ sơ CCTT...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng theo Mã khách hàng nộp yêu cầu. |
| Cán bộ xử lý | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Chọn Cán bộ xử lý hồ sơ hoặc chọn "Tất cả".<br>- Danh sách lấy theo cán bộ thuộc phạm vi Trung tâm đăng ký của người dùng đăng nhập. |
| Tiêu chí yêu cầu cung cấp thông tin | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Số đăng ký<br>+ Bên bảo đảm<br>+ Số khung |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| **II. Bảng danh sách hồ sơ chờ duyệt** | | | | |
| Bảng danh sách hồ sơ | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm phân trang.<br>- Chỉ hiển thị hồ sơ Yêu cầu cung cấp thông tin ở trạng thái "Chờ duyệt", thuộc phạm vi xử lý của Cán bộ.<br>- Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên xử lý hồ sơ đến trước.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Tự tăng | Control UI: Label.<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Label.<br>- Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Control UI: Label.<br>- Mã khách hàng gắn với tài khoản nộp yêu cầu, nếu có. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Control UI: Label.<br>- Tên cá nhân/tổ chức yêu cầu cung cấp thông tin. |
| Địa chỉ | Text(500) | Không | Theo hồ sơ | Control UI: Label.<br>- Địa chỉ của Người yêu cầu theo thông tin Khách hàng đã gửi trong hồ sơ. |
| Tiêu chí yêu cầu | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label.<br>- Hiển thị theo dữ liệu bản ghi |
| Dữ liệu đã nhập | Text(1000) | Có | Theo hồ sơ | Control UI: Label.<br>- Tóm tắt dữ liệu Khách hàng đã gửi theo tiêu chí yêu cầu. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label.<br>- Hiển thị nguồn tiếp nhận của hồ sơ. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Control UI: Label.<br>- Thời điểm Khách hàng gửi yêu cầu.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Trạng thái | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label dạng nhãn trạng thái (Badge).<br>- Hiển thị trạng thái hiện tại của hồ sơ. |
| Cán bộ xử lý | String(255) | Không | Theo phân công | Control UI: Label.<br>- Hiển thị Cán bộ đang được phân công xử lý, nếu đã có. |
| Thao tác | - | - | - | Control UI: Nhóm nút thao tác trên dòng.<br>Gồm:<br>+ Xử lý hồ sơ<br>+ Từ chối |

##### 4.3.2.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Điều kiện ngày không hợp lệ): Từ ngày lớn hơn Đến ngày (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày). Hệ thống hiển thị [MSG-ERR-VAL-007] dạng Inline dưới ô nhập tương ứng. Không thực hiện tìm kiếm.<br><br>TH2 (Không có dữ liệu trả về):<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br><br>TH Hợp lệ: Hệ thống tìm kiếm hồ sơ ở trạng thái "Chờ duyệt" theo bộ lọc, trong phạm vi hồ sơ thuộc quyền xử lý của Cán bộ và hiển thị kết quả lên bảng danh sách. |
| 2 | Xóa bộ lọc | Nút | Đưa toàn bộ tiêu chí lọc về giá trị mặc định và tải lại danh sách hồ sơ chờ duyệt. |
| 3 | Click dòng dữ liệu | Row Click | Mở [MH03 - Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ xử lý](#43224-mh03---man-hinh-xem-chi-tiet-ho-so-yeu-cau-cung-cap-thong-tin-cho-xu-ly). |
| 4 | Xử lý hồ sơ | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Quy định chỉ được xử lý hồ sơ đang ở trạng thái "Chờ duyệt". Hệ thống hiển thị [MSG-ERR-CCTT-002] dạng Toast. Không mở màn hình xử lý.<br><br>TH Hợp lệ: Hệ thống thực hiện:<br>- Ghi nhận Cán bộ hiện tại là Cán bộ xử lý hồ sơ (nếu hồ sơ chưa có Cán bộ xử lý).<br>- Mở [MH02 - Xử lý hồ sơ yêu cầu cung cấp thông tin](#43223-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-thong-tin), tự động điền sẵn tiêu chí và dữ liệu tra cứu theo thông tin hồ sơ, tự động kiểm tra và hiển thị kết quả tra cứu. |
| 5 | Từ chối | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Quy định chỉ được từ chối hồ sơ đang ở trạng thái "Chờ duyệt". Hệ thống hiển thị [MSG-ERR-CCTT-002] dạng Toast. Không mở popup từ chối.<br><br>TH Hợp lệ: Mở [MH05 - Popup Từ chối yêu cầu cung cấp thông tin](#43226-mh05---popup-tu-choi-yeu-cau-cung-cap-thong-tin). |

#### 4.3.2.2.3. MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin

##### 4.3.2.2.3.1. Màn hình

![Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin](images/UC_CCTT_CB_MH02_Xu_ly_ho_so_yeu_cau_cung_cap_thong_tin.png)

##### 4.3.2.2.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Khối tra cứu** | | | | Toàn bộ dữ liệu chỉ đọc, hệ thống tự động điền theo thông tin hồ sơ khi mở màn hình, không cho phép sửa. |
| Tiêu chí yêu cầu cung cấp thông tin | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Segmented control (nhóm 03 nút chọn liền nhau trên một hàng), chỉ đọc.<br>- Lấy theo thông tin hồ sơ: segment tương ứng với tiêu chí của hồ sơ được tô nổi bật (active), các segment còn lại ở trạng thái mờ (Disabled), không cho phép chuyển.<br>Gồm:<br>+ Số đăng ký<br>+ Bên bảo đảm<br>+ Số khung |
| Số đăng ký | String(50) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí yêu cầu cung cấp thông tin là "Số đăng ký".<br>- Lấy theo thông tin hồ sơ. |
| Loại chủ thể | String(50) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm".<br>- Lấy theo thông tin hồ sơ. |
| Số CMND/Căn cước công dân/Chứng minh quân đội | String(12) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Công dân Việt Nam".<br>- Lấy theo thông tin hồ sơ. |
| Mã số thuế/Số đăng ký kinh doanh | String(14) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Tổ chức có đăng ký kinh doanh trong nước".<br>- Lấy theo thông tin hồ sơ. |
| Họ và tên | String(255) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Người nước ngoài" hoặc "Người không quốc tịch cư trú tại Việt Nam".<br>- Lấy theo thông tin hồ sơ. |
| Số Hộ chiếu | String(50) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Người nước ngoài".<br>- Lấy theo thông tin hồ sơ. |
| Mã số thuế/Số giấy phép đầu tư | String(50) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Tổ chức nước ngoài".<br>- Lấy theo thông tin hồ sơ. |
| Tên tổ chức | String(255) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Tổ chức khác".<br>- Lấy theo thông tin hồ sơ. |
| Số thẻ cư trú | String(50) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm" và Loại chủ thể là "Người không quốc tịch cư trú tại Việt Nam".<br>- Lấy theo thông tin hồ sơ. |
| Số khung | String(50) | Tùy điều kiện | Theo hồ sơ | Control UI: Textbox, chỉ đọc (Disabled).<br>- Chỉ hiển thị khi Tiêu chí yêu cầu cung cấp thông tin là "Số khung".<br>- Lấy theo thông tin hồ sơ. |
| **II. Kết quả tra cứu** | | | | Hiển thị ngay sau khi hệ thống hoàn tất kiểm tra theo tiêu chí tra cứu. |
| Thời điểm tra cứu | Datetime | Có | Theo lần tra cứu | Control UI: Label, chỉ đọc.<br>- Thời điểm hệ thống thực hiện kiểm tra.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm:ss. |
| Tiêu chí tra cứu thực tế | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc.<br>- Tiêu chí hệ thống đã dùng để kiểm tra. |
| Dữ liệu đầu vào tra cứu | Text(1000) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc.<br>- Dữ liệu hệ thống đã dùng để kiểm tra. |
| Thông báo không có dữ liệu | Text(1000) | Tùy điều kiện | [MSG-WRN-CCTT-001] | Control UI: Khung cảnh báo Inline (Alert warning).<br>- Chỉ hiển thị khi không tìm thấy Hồ sơ biện pháp bảo đảm phù hợp với tiêu chí tra cứu.<br>- Nội dung theo [MSG-WRN-CCTT-001], không hiển thị Toast. |
| Bảng danh sách kết quả tra cứu | Text(4000) | Tùy điều kiện | Theo kết quả tra cứu | Control UI: Khối hiển thị danh sách hồ sơ, chỉ đọc.<br>- Chỉ hiển thị khi tìm thấy Hồ sơ biện pháp bảo đảm phù hợp.<br>- Hiển thị toàn bộ hồ sơ từ Hồ sơ đăng ký lần đầu đến các hồ sơ có liên quan tới Hồ sơ đăng ký lần đầu đó, sắp xếp theo Thời điểm đăng ký tăng dần.<br>- Hiển thị giống hệt cấu trúc **VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký** tại màn Xem chi tiết hồ sơ của Website Khách hàng trong tài liệu [SRS yêu cầu cung cấp thông tin.md](../../01_Website_Khach_hang/SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md#vi-ket-qua-cung-cap-thong-tin-co-xac-nhan-cua-co-quan-dang-ky). |

##### 4.3.2.2.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tự động tra cứu | Sự kiện mở màn hình | Khi mở màn hình, hệ thống tự động điền tiêu chí và dữ liệu tra cứu theo thông tin hồ sơ, sau đó thực hiện kiểm tra trên toàn hệ thống các Hồ sơ biện pháp bảo đảm theo tiêu chí tra cứu và trả về kết quả:<br>- **Phạm vi kiểm tra**: Tập Hồ sơ biện pháp bảo đảm đang có hiệu lực, chưa có yêu cầu Xóa đăng ký được phê duyệt Hoàn thành.<br>- **Kết quả trả về**: Với mỗi Hồ sơ biện pháp bảo đảm thỏa mãn tiêu chí, hệ thống trả về toàn bộ hồ sơ bắt đầu từ Hồ sơ đăng ký lần đầu đến tất cả các hồ sơ có liên quan tới Hồ sơ đăng ký lần đầu đó (Đăng ký thay đổi, Thông báo xử lý tài sản bảo đảm...), sắp xếp theo Thời điểm đăng ký tăng dần.<br><br>TH1 (Không có dữ liệu): Không tìm thấy Hồ sơ biện pháp bảo đảm phù hợp. Hệ thống thực hiện:<br>- Hiển thị Khối II với [MSG-WRN-CCTT-001] dạng Inline.<br>- Ghi nhận kết quả không có dữ liệu vào hồ sơ.<br>- Kích hoạt nút "Duyệt chờ ký" và "Trình ký". Hồ sơ không bị chuyển sang "Bị từ chối" và không phát sinh thêm nghĩa vụ thanh toán.<br><br>TH2 (Có dữ liệu): Hệ thống thực hiện:<br>- Hiển thị Khối II - Kết quả tra cứu với danh sách hồ sơ tìm thấy.<br>- Ghi nhận Cán bộ thực hiện, thời điểm tra cứu, tiêu chí tra cứu, dữ liệu đầu vào và kết quả tra cứu vào hồ sơ; ghi lịch sử xử lý và Audit log.<br>- Kích hoạt nút "Duyệt chờ ký" và "Trình ký". |
| 2 | Duyệt chờ ký | Nút | Nút chỉ sáng lên cho phép click khi đã có kết quả tra cứu (có dữ liệu hoặc không có dữ liệu).<br>TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Quy định chỉ được xử lý hồ sơ đang ở trạng thái "Chờ duyệt". Hệ thống hiển thị [MSG-ERR-CCTT-002] dạng Toast. Không thực hiện.<br><br>TH Hợp lệ: Hệ thống thực hiện:<br>- Lưu kết quả tra cứu vào hồ sơ.<br>- Ghi nhận Cán bộ xử lý và thời điểm xử lý (dd/mm/yyyy hh:mm:ss).<br>- Chuyển hồ sơ sang trạng thái "Duyệt chờ ký".<br>- Ghi lịch sử xử lý và Audit log.<br>- Đóng màn hình xử lý, quay về [MH01 - Danh sách hồ sơ chờ duyệt](#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet) và hiển thị [MSG-SUC-CCTT-005] dạng Toast. |
| 3 | Trình ký | Nút | Nút chỉ sáng lên cho phép click khi đã có kết quả tra cứu (có dữ liệu hoặc không có dữ liệu).<br>TH1 (Chưa có kết quả tra cứu): Quy định chỉ được trình ký khi đã có kết quả tra cứu. Hệ thống hiển thị [MSG-ERR-CCTT-005] dạng Toast. Không mở popup trình ký.<br><br>TH Hợp lệ: Hệ thống thực hiện:<br>- Tự động sinh file PDF dự thảo kết quả cung cấp thông tin theo [4.3.2.2.7. Quy tắc xử lý kết quả tra cứu và kết xuất PDF kết quả cung cấp thông tin](#43227-quy-tac-xu-ly-ket-qua-tra-cuu-va-ket-xuat-pdf-ket-qua-cung-cap-thong-tin).<br>- Mở [MH04 - Popup Trình ký kết quả cung cấp thông tin](#43225-mh04---popup-trinh-ky-ket-qua-cung-cap-thong-tin). |
| 4 | Hủy bỏ | Nút | Đóng màn hình xử lý, không thay đổi trạng thái hồ sơ, quay về [MH01 - Danh sách hồ sơ chờ duyệt](#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet) và giữ nguyên bộ lọc trước đó. |

#### 4.3.2.2.4. MH03 - Màn hình Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ xử lý

##### 4.3.2.2.4.1. Màn hình

![Màn hình Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ xử lý](images/CCTT_CB_MH03_Xem_chi_tiet_ho_so_cho_xu_ly.png)

##### 4.3.2.2.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Mã khách hàng | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Nguồn tiếp nhận | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Tiêu chí yêu cầu cung cấp thông tin | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Loại chủ thể | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số CMND/Căn cước công dân/Chứng minh quân đội | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Mã số thuế/Số đăng ký kinh doanh | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Họ và tên | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số Hộ chiếu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Tên tổ chức | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số thẻ cư trú | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Số khung | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |

##### 4.3.2.2.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xử lý hồ sơ | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Hệ thống hiển thị [MSG-ERR-CCTT-002] dạng Toast. Không mở màn hình xử lý.<br><br>TH Hợp lệ: Mở [MH02 - Xử lý hồ sơ yêu cầu cung cấp thông tin](#43223-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-thong-tin). |
| 2 | Từ chối | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Hệ thống hiển thị [MSG-ERR-CCTT-002] dạng Toast. Không mở popup từ chối.<br><br>TH Hợp lệ: Mở [MH05 - Popup Từ chối yêu cầu cung cấp thông tin](#43226-mh05---popup-tu-choi-yeu-cau-cung-cap-thong-tin). |
| 3 | Đóng | Nút | Đóng màn hình xem chi tiết, quay về [MH01 - Danh sách hồ sơ chờ duyệt](#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet) và giữ nguyên bộ lọc trước đó. |

#### 4.3.2.2.5. MH04 - Popup Trình ký kết quả cung cấp thông tin

##### 4.3.2.2.5.1. Màn hình

![Popup Trình ký kết quả cung cấp thông tin](images/UC_CCTT_CB_MH04_Trinh_ky_ket_qua_cung_cap_thong_tin.png)

##### 4.3.2.2.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Label, chỉ đọc.<br>\- Mã hồ sơ Yêu cầu cung cấp thông tin. |
| File PDF kết quả cung cấp thông tin | File | Có | Theo kết xuất | Control UI: Khung xem trước tệp PDF (PDF Viewer nhúng), chỉ đọc.<br>\- Hiển thị file PDF dự thảo được hệ thống sinh khi Cán bộ bấm "Trình ký", theo mẫu `GCN_Mau Giay chung nhan CCTT.pdf` và quy tắc tại [4.3.2.2.7](#43227-quy-tac-xu-ly-ket-qua-tra-cuu-va-ket-xuat-pdf-ket-qua-cung-cap-thong-tin).<br>\- Kèm liên kết `Xem file` (mở tab mới) và `Tải tệp`.<br>\- Nếu có dữ liệu, file bao gồm phần chi tiết hồ sơ kết quả tra cứu.<br>\- Nếu không có dữ liệu, file hiển thị thông báo không có kết quả theo mẫu. |
| Số lượng kết quả tra cứu | Integer(10) | Có | Theo kết quả | Control UI: Label, chỉ đọc.<br>\- Tổng số hồ sơ tìm thấy được sử dụng để sinh PDF. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | Control UI: Dropdown list.<br>\- Bắt buộc chọn trước khi xác nhận trình ký.<br>\- Hiển thị danh sách Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký, chỉ gồm Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký hồ sơ cung cấp thông tin. |

##### 4.3.2.2.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, không lưu file PDF dự thảo vừa sinh vào hồ sơ, giữ nguyên trạng thái hồ sơ và quay lại [MH02 - Xử lý hồ sơ yêu cầu cung cấp thông tin](#43223-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-thong-tin). |
| 2 | Xác nhận | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Quy định chỉ được trình ký hồ sơ đang ở trạng thái "Chờ duyệt". Hệ thống hiển thị [MSG-ERR-CCTT-002], không cho phép trình ký. |
|  |  |  | TH2 (Chưa có kết quả tra cứu hoặc không có file PDF hợp lệ): Quy định chỉ được trình ký khi đã có kết quả tra cứu và file PDF dự thảo. Hệ thống hiển thị [MSG-ERR-CCTT-005], không cho phép trình ký. |
|  |  |  | TH3 (Chưa chọn Lãnh đạo ký hoặc Lãnh đạo ký không còn hiệu lực trong cấu hình): Hệ thống tô viền đỏ ô chọn Lãnh đạo ký, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô chọn, không cho phép trình ký. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>\- Lưu kết quả tra cứu được sử dụng để trình ký.<br>\- Khóa kết quả tra cứu và khóa phiên bản file PDF dự thảo được trình ký; Cán bộ và Lãnh đạo không được chỉnh sửa kết quả tra cứu hoặc thay thế file PDF đã trình ký.<br>\- Ghi nhận Cán bộ trình ký, thời điểm trình ký và Lãnh đạo ký đã chọn.<br>\- Chuyển hồ sơ sang trạng thái "Chờ ký" và chuyển đến đúng Lãnh đạo ký đã chọn.<br>\- Ghi lịch sử xử lý của hồ sơ và Audit log hệ thống, gồm người thao tác, thời điểm, hành động "Trình ký", mã hồ sơ, phiên bản PDF trình ký và Lãnh đạo ký đã chọn.<br>\- Đóng popup và [MH02 - Xử lý hồ sơ yêu cầu cung cấp thông tin](#43223-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-thong-tin), quay về [MH01 - Danh sách hồ sơ chờ duyệt](#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet) và hiển thị [MSG-SUC-CCTT-003]. |

#### 4.3.2.2.6. MH05 - Popup Từ chối yêu cầu cung cấp thông tin

##### 4.3.2.2.6.1. Màn hình

![Popup Từ chối yêu cầu cung cấp thông tin](images/CCTT_CB_MH05_Popup_tu_choi.png)

##### 4.3.2.2.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label, chỉ đọc. Hiển thị: **"Từ chối yêu cầu cung cấp thông tin: [Mã hồ sơ]"**. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Hiển thị theo dữ liệu bản ghi. |
| Lý do từ chối | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.2.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 2 | Xác nhận từ chối | Nút | TH1 (Bỏ trống Lý do từ chối): Quy định Lý do từ chối là bắt buộc. Hệ thống tô viền đỏ ô Lý do từ chối, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập và focus vào ô lỗi. Không thực hiện từ chối.<br><br>TH2 (Hồ sơ không còn ở trạng thái "Chờ duyệt"): Quy định chỉ được từ chối hồ sơ đang ở trạng thái "Chờ duyệt". Hệ thống hiển thị [MSG-ERR-CCTT-002] dạng Toast. Không thực hiện từ chối.<br><br>TH Hợp lệ: Hệ thống thực hiện ngay, không hiển thị thêm bước xác nhận:<br>- Lưu người từ chối, thời điểm từ chối, lý do từ chối và ghi lịch sử xử lý.<br>- Chuyển hồ sơ sang trạng thái "Bị từ chối".<br>- Tạo yêu cầu hoàn tiền cho hồ sơ theo [Quy tắc tạo yêu cầu hoàn tiền khi từ chối hồ sơ Online](../01_Quan_tri_he_thong/Quan_ly_doi_soat_thanh_toan.md#6-quy-tac-tao-yeu-cau-hoan-tien-khi-tu-choi-ho-so-online).<br>- Đóng popup (và đóng [MH03 - Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ xử lý](#43224-mh03---man-hinh-xem-chi-tiet-ho-so-yeu-cau-cung-cap-thong-tin-cho-xu-ly) nếu popup được mở từ màn này), quay về [MH01 - Danh sách hồ sơ chờ duyệt](#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet), loại hồ sơ khỏi danh sách chờ duyệt và hiển thị [MSG-SUC-CCTT-004] dạng Toast. |

#### 4.3.2.2.7. Quy tắc xử lý kết quả tra cứu và kết xuất PDF kết quả cung cấp thông tin

##### 4.3.2.2.7.1. Nguyên tắc sinh file PDF kết quả cung cấp thông tin

\- Hệ thống sinh file PDF kết quả cung cấp thông tin khi đã có kết quả tra cứu và Cán bộ bấm "Trình ký".

\- Hệ thống sinh file PDF cho cả 2 trường hợp:

\+ Tìm thấy ít nhất một Hồ sơ biện pháp bảo đảm phù hợp với tiêu chí tra cứu.

\+ Không tìm thấy Hồ sơ biện pháp bảo đảm phù hợp với tiêu chí tra cứu.

\- File PDF chỉ được sinh khi Cán bộ bấm "Trình ký" và là file dự thảo hiển thị tại Popup Trình ký để Cán bộ kiểm tra trước khi xác nhận trình ký.

\- File PDF phải tuân thủ bố cục, tiêu đề, nội dung thông báo và thứ tự thông tin theo mẫu `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf`.

\- File PDF kết quả cung cấp thông tin bao gồm:

\+ Lá mặt/trang ký theo Mẫu số 10d.

\+ Phần kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký.

\+ Phần chi tiết hồ sơ/phụ lục chi tiết chỉ hiển thị khi có dữ liệu đăng ký còn hiệu lực được tìm thấy.

\- File PDF dự thảo được gắn vào hồ sơ và là đúng file Cán bộ trình Lãnh đạo ký; không tách riêng file kết quả tra cứu và file phụ lục.

\- Khi Cán bộ "Trình ký" thành công, hệ thống khóa đúng phiên bản file PDF dự thảo đã được trình ký; Cán bộ và Lãnh đạo không được chỉnh sửa kết quả tra cứu hoặc thay thế file PDF đã trình ký.

\- Khi Lãnh đạo ký số thành công ở bước "Chờ ký", chữ ký số được gắn lên cùng file PDF đã được duyệt; toàn bộ nội dung văn bản kết quả cung cấp thông tin và phần phụ lục chi tiết nếu có được ký trong cùng một tài liệu.

\- Mỗi lần Cán bộ bấm "Trình ký", hệ thống sinh phiên bản PDF dự thảo mới theo phiên tra cứu gần nhất; phiên bản chỉ được lưu vào hồ sơ khi Cán bộ xác nhận trình ký thành công.

##### 4.3.2.2.7.2. Mapping dữ liệu lá mặt/trang ký Mẫu số 10d

| STT | Thành phần trên lá mặt/trang ký | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Mẫu số 10d | Cấu hình biểu mẫu | Hiển thị cố định ở góc trên bên phải: "Mẫu số 10d". |
| 2 | Mã hồ sơ TTHC | Hồ sơ Yêu cầu cung cấp thông tin/hệ thống một cửa nếu có tích hợp | Hiển thị mã hồ sơ thủ tục hành chính tương ứng với hồ sơ CCTT. Nếu hồ sơ chưa có mã hồ sơ TTHC từ hệ thống một cửa, hiển thị theo mã hồ sơ CCTT nội bộ hoặc mã định danh hồ sơ được cấu hình dùng cho tra cứu TTHC. |
| 3 | Tên cơ quan đăng ký bên trái | Cấu hình đơn vị xử lý hồ sơ | Hiển thị tên cơ quan cấp trên và tên Trung tâm đăng ký xử lý hồ sơ theo đúng mẫu, ví dụ: "CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC" và "TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI". |
| 4 | Quốc hiệu, tiêu ngữ | Cấu hình biểu mẫu | Hiển thị cố định: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" và "Độc lập - Tự do - Hạnh phúc". |
| 5 | Địa danh, ngày tháng năm lập văn bản | Cấu hình đơn vị xử lý hồ sơ và thời điểm kết xuất PDF | Địa danh lấy theo đơn vị xử lý hồ sơ. Ngày tháng năm lấy theo ngày hệ thống sinh file PDF dự thảo tại thao tác "Trình ký". Định dạng theo mẫu: "[Địa danh], ngày [dd] tháng [mm] năm [yyyy]". |
| 6 | Tên văn bản | Cấu hình biểu mẫu | Hiển thị cố định, in hoa, in đậm: "VĂN BẢN CUNG CẤP THÔNG TIN VỀ BIỆN PHÁP BẢO ĐẢM BẰNG ĐỘNG SẢN, CÂY HẰNG NĂM, CÔNG TRÌNH TẠM". |
| 7 | Người yêu cầu cung cấp thông tin | Hồ sơ Yêu cầu cung cấp thông tin do Khách hàng gửi | Hiển thị tên cá nhân/tổ chức yêu cầu cung cấp thông tin. Định dạng: "Người yêu cầu cung cấp thông tin: [Tên người yêu cầu]". |
| 8 | Địa chỉ liên hệ | Hồ sơ Yêu cầu cung cấp thông tin do Khách hàng gửi | Hiển thị địa chỉ của người yêu cầu đã lưu trong hồ sơ. Định dạng: "Địa chỉ liên hệ: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], [Quốc gia]". |
| 9 | Tên Trung tâm chứng nhận | Đơn vị xử lý hồ sơ | Hiển thị tên Trung tâm đăng ký giao dịch, tài sản xử lý hồ sơ, in hoa, in đậm theo mẫu. |
| 10 | Mục 1 - Dòng dẫn tiêu chí tra cứu | Cấu hình biểu mẫu | Hiển thị cố định: "1. Việc tra cứu thông tin được thực hiện theo tiêu chí sau đây:". |
| 11 | Checkbox "Số giấy tờ xác định tư cách pháp lý của bên bảo đảm" | Tiêu chí và dữ liệu tra cứu đã khóa trong hồ sơ | Hiển thị checkbox. Tích chọn nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và dữ liệu tra cứu là số giấy tờ/số định danh của Bên bảo đảm. Sau nhãn hiển thị giá trị theo đúng dữ liệu đã khóa nếu được tích chọn. |
| 12 | Checkbox "Tên của bên bảo đảm là tổ chức nước ngoài" | Tiêu chí và dữ liệu tra cứu đã khóa trong hồ sơ | Hiển thị checkbox. Tích chọn nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và dữ liệu tra cứu là tên tổ chức nước ngoài. Sau nhãn hiển thị tên tổ chức đã khóa nếu được tích chọn. |
| 13 | Checkbox "Số khung của phương tiện giao thông cơ giới" | Tiêu chí và dữ liệu tra cứu đã khóa trong hồ sơ | Hiển thị checkbox. Tích chọn nếu Tiêu chí yêu cầu cung cấp thông tin là "Số khung". Sau nhãn hiển thị Số khung đã khóa nếu được tích chọn. |
| 14 | Checkbox "Số đăng ký biện pháp bảo đảm" | Tiêu chí và dữ liệu tra cứu đã khóa trong hồ sơ | Hiển thị checkbox. Tích chọn nếu Tiêu chí yêu cầu cung cấp thông tin là "Số đăng ký". Sau nhãn hiển thị Số đăng ký đã khóa nếu được tích chọn. |
| 15 | Nguyên tắc checkbox tiêu chí | Dữ liệu tra cứu đã khóa trong hồ sơ | Trong 4 checkbox tiêu chí tại Mục 1, hệ thống chỉ được tích chọn đúng 1 checkbox tương ứng tiêu chí Khách hàng đã gửi. Các checkbox còn lại không tích chọn và không hiển thị giá trị phía sau. |
| 16 | Mục 2 - Thông tin cung cấp kèm văn bản | Kết quả tra cứu đã lưu trong hồ sơ và đơn vị xử lý | Hiển thị đoạn văn theo mẫu: "2. Thông tin về biện pháp bảo đảm bằng động sản, cây hằng năm, công trình tạm tra cứu tại thời điểm [HH giờ mm phút, ngày dd tháng mm năm yyyy] được [Tên Trung tâm đăng ký] cung cấp kèm theo Văn bản này.". Áp dụng cho cả trường hợp có kết quả và không có kết quả. |
| 17 | QR code | Hệ thống quản lý văn bản/file PDF | QR được sinh khi hệ thống kết xuất file PDF dự thảo. Dữ liệu QR là URL tra cứu/xác thực văn bản điện tử do hệ thống cấu hình, gắn tối thiểu các tham số: mã hồ sơ CCTT, mã file, phiên bản file, mã kiểm tra bảo mật hoặc checksum/hash của file. Với file dự thảo, URL trả về trạng thái "Dự thảo/Chưa ký" hoặc chỉ cho phép kiểm tra metadata theo cấu hình. Sau khi Lãnh đạo ký số thành công, hệ thống cập nhật bản ghi xác thực để khi quét QR trả về trang xác thực văn bản đã ký, gồm: mã hồ sơ, số cung cấp thông tin, cơ quan ký, người ký, thời điểm ký, trạng thái chữ ký, hash file đã ký và đường dẫn xem/tải file PDF đã ký nếu người quét có quyền. |
| 18 | Khối người có thẩm quyền | Lãnh đạo ký/ký do Cán bộ chọn tại Popup Trình ký | Hiển thị tiêu đề "NGƯỜI CÓ THẨM QUYỀN CỦA TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN" và dòng hướng dẫn "(Ký, ghi rõ họ và tên, chức danh, đóng dấu)". File dự thảo hiển thị thông tin người ký dự kiến nếu đã chọn Lãnh đạo ký/ký; chưa hiển thị chữ ký số/chữ ký ảnh chính thức. |
| 19 | Vùng chữ ký số, dấu điện tử | Dịch vụ ký số và thông tin chứng thư số của Lãnh đạo | Trên file dự thảo, vùng ký là vùng chờ ký. Sau khi Lãnh đạo ký số, hệ thống gắn chữ ký số/dấu điện tử trên chính vùng ký của lá mặt/trang ký, đồng thời lưu metadata người ký, chứng thư số, thời điểm ký và phiên bản file đã ký. |

##### 4.3.2.2.7.3. Mapping dữ liệu phần kết quả cung cấp thông tin/phụ lục theo mẫu GCN CCTT

| STT | Thành phần trên file PDF | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Tiêu đề văn bản | Cấu hình biểu mẫu | Hiển thị cố định, in hoa, in đậm: "KẾT QUẢ CUNG CẤP THÔNG TIN CÓ XÁC NHẬN CỦA CƠ QUAN ĐĂNG KÝ". |
| 2 | Câu mô tả nguồn dữ liệu | Cấu hình biểu mẫu | Hiển thị cố định: "Thông tin đã được tìm thấy trong cơ sở dữ liệu của Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước thỏa mãn các tiêu chí tra cứu thông tin như sau:". |
| 3 | Số cung cấp thông tin | Hồ sơ Yêu cầu cung cấp thông tin | Hiển thị theo Mã hồ sơ/Số đơn Yêu cầu cung cấp thông tin. Định dạng: "- Số cung cấp thông tin: [Mã hồ sơ/Số đơn]". |
| 4 | Dòng tiêu chí "Số đăng ký" | Dữ liệu tra cứu đã khóa trong hồ sơ | Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Số đăng ký". Định dạng: "- Số đăng ký: [Giá trị]". |
| 5 | Dòng loại chủ thể | Dữ liệu tra cứu đã khóa trong hồ sơ | Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm". Hiển thị trực tiếp giá trị Loại chủ thể thành một dòng riêng theo mẫu, không ghi nhãn "Loại chủ thể". Ví dụ: "- Tổ chức có đăng ký kinh doanh trong nước". |
| 6 | Dòng định danh của Bên bảo đảm | Dữ liệu tra cứu đã khóa trong hồ sơ | Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm". Hiển thị đúng dòng dữ liệu tương ứng với Loại chủ thể, không hiển thị thông tin "Loại giấy tờ/Loại mã định danh":<br>\- Công dân Việt Nam: "- Số CMND/Căn cước công dân/Chứng minh quân đội: [Giá trị]".<br>\- Tổ chức có đăng ký kinh doanh trong nước: "- Mã số thuế/Số đăng ký kinh doanh: [Giá trị]".<br>\- Người nước ngoài: "- Số Hộ chiếu: [Giá trị]".<br>\- Tổ chức nước ngoài: "- Mã số thuế/Số giấy phép đầu tư: [Giá trị]".<br>\- Tổ chức khác: "- Tên tổ chức: [Giá trị]".<br>\- Người không quốc tịch cư trú tại Việt Nam: "- Số thẻ cư trú: [Giá trị]". |
| 7 | Dòng tiêu chí "Số khung" | Dữ liệu tra cứu đã khóa trong hồ sơ | Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Số khung". Định dạng: "- Số khung: [Giá trị]". |
| 8 | Thời điểm tra cứu | Kết quả tra cứu đã lưu trong hồ sơ | Hiển thị thời điểm hệ thống thực hiện kiểm tra, áp dụng cho cả trường hợp có kết quả và không có kết quả. Định dạng theo mẫu: "- Thời điểm tra cứu: dd-mm-yyyy HH:mm". |
| 9 | Đường kẻ phân tách | Cấu hình biểu mẫu | Hiển thị đường kẻ ngang sau nhóm thông tin tiêu chí tra cứu, trước phần kết quả. |
| 10 | Dòng kết quả không có dữ liệu | Kết quả tra cứu đã lưu trong hồ sơ | Chỉ hiển thị khi Trạng thái tra cứu là "Không có kết quả". Nội dung lấy theo [MSG-WRN-CCTT-001]. |
| 11 | Liên kết với lá mặt/trang ký | File PDF kết quả cung cấp thông tin | Phần kết quả cung cấp thông tin/phụ lục nằm sau lá mặt/trang ký trong cùng một file PDF; không tách thành file riêng. |

##### 4.3.2.2.7.4. Mapping dữ liệu chi tiết hồ sơ kết quả tra cứu

| STT | Thành phần kết quả đính kèm | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Chi tiết hồ sơ kết quả tra cứu | Kết quả tra cứu đã lưu trong hồ sơ và dữ liệu Review nghiệp vụ tương ứng | Phần chi tiết hồ sơ kết quả tra cứu trong file PDF dự thảo/trình ký/ký số phải hiển thị giống hệt **VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký** tại màn Xem chi tiết hồ sơ của Website Khách hàng trong tài liệu [SRS yêu cầu cung cấp thông tin.md](../../01_Website_Khach_hang/SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md#vi-ket-qua-cung-cap-thong-tin-co-xac-nhan-cua-co-quan-dang-ky). Không mô tả lại các khối/cột chi tiết tại tài liệu này để bảo đảm Website Cán bộ, Lãnh đạo và Website Khách hàng dùng chung một cấu trúc hiển thị. |
| 2 | Phạm vi hồ sơ đưa vào phần kết quả chi tiết | Kết quả tra cứu đã lưu trong hồ sơ | Chỉ đưa vào phần kết quả chi tiết các Hồ sơ biện pháp bảo đảm đang có hiệu lực, chưa có yêu cầu Xóa đăng ký được phê duyệt Hoàn thành; mỗi kết quả gồm toàn bộ hồ sơ từ Hồ sơ đăng ký lần đầu đến các hồ sơ có liên quan tới Hồ sơ đăng ký lần đầu đó, sắp xếp theo Thời điểm đăng ký tăng dần. |
| 3 | Số trang và liên kết với file chính | Trình sinh PDF | Đánh số trang liên tục cho toàn bộ file PDF. Phần kết quả chi tiết nếu có phải nằm trong cùng file PDF được trình ký và ký số. |
