﻿## 4.3.2. Dành cho Cán bộ nghiệp vụ tại Trung tâm đăng ký (TTĐK)

### 4.3.2.2. UC-CCTT-CB - Xử lý yêu cầu cung cấp thông tin

#### 4.3.2.2.1. Mục đích

\- Cho phép Cán bộ TTĐK kiểm tra và xử lý hồ sơ Yêu cầu cung cấp thông tin ở trạng thái "Chờ duyệt" đối với hồ sơ Online đã thanh toán thành công/miễn phí hoặc trạng thái "Chờ giải quyết" đối với hồ sơ giấy đã hoàn tất thu phí/miễn phí.

\- Bảo đảm dữ liệu tra cứu không bị Cán bộ thay đổi trong quá trình xử lý.

\- Cho phép tra cứu dữ liệu đăng ký còn hiệu lực tại thời điểm tra cứu, kết xuất file PDF dự thảo kết quả cung cấp thông tin theo đúng mẫu `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf` và trình Lãnh đạo ký cho cả trường hợp có kết quả hoặc không có kết quả.

\- Bảo đảm trường hợp tra cứu hoàn thành về mặt kỹ thuật nhưng không tìm thấy dữ liệu còn hiệu lực vẫn sinh văn bản thông báo kết quả để Lãnh đạo ký số sau đó, không xử lý như hồ sơ bị từ chối do không có kết quả và không phát sinh thêm nghĩa vụ thanh toán.

*a. Phân quyền*

\- Cán bộ TTĐK được phân quyền xử lý hồ sơ Yêu cầu cung cấp thông tin.

\- Cán bộ chỉ được xử lý hồ sơ thuộc Trung tâm đăng ký giao dịch, tài sản/đơn vị được phân công.

\- Cán bộ không được xử lý hồ sơ đã chuyển khỏi trạng thái đầu vào được phép xử lý, gồm "Chờ duyệt", "Chờ giải quyết" hoặc "Bị trả lại".

*b. Điều kiện thực hiện*

\- Cán bộ đã đăng nhập thành công vào Website Quản trị.

\- Hồ sơ Yêu cầu cung cấp thông tin Online đã thanh toán thành công/miễn phí và đang ở trạng thái "Chờ duyệt", hoặc hồ sơ giấy đã hoàn tất thu phí/miễn phí và đang ở trạng thái "Chờ giải quyết".

\- Dịch vụ tra cứu dữ liệu đăng ký BPBĐ sẵn sàng tại thời điểm Cán bộ thực hiện tra cứu.

\- Hệ thống có cấu hình mẫu PDF kết quả cung cấp thông tin theo `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf` đang hiệu lực.

*c. Nguyên tắc dữ liệu tra cứu*

\- Hệ thống tự động xác định tiêu chí Khách hàng đã lựa chọn: "Số đăng ký", "Bên bảo đảm" hoặc "Số khung".

\- Hệ thống tự động hiển thị đúng form tra cứu và điền đúng dữ liệu Khách hàng đã gửi.

\- Toàn bộ dữ liệu tra cứu ở trạng thái chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001].

\- Cán bộ không được thay đổi tiêu chí, loại chủ thể, loại giấy tờ/loại định danh do hệ thống xác định, số giấy tờ, họ tên, tên tổ chức, số đăng ký, số khung hoặc thêm/bớt điều kiện tra cứu.

#### 4.3.2.2.2. UC-CCTT-CB.MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ xử lý

##### 4.3.2.2.2.1. Màn hình

![Màn hình Danh sách yêu cầu cung cấp thông tin chờ xử lý](images/UC_CCTT_CB_MH01_Danh_sach_yeu_cau_cung_cap_thong_tin_cho_xu_ly.png)

##### 4.3.2.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Tìm kiếm | String(255) | Không | Trống | Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ, Người yêu cầu, Mã khách hàng hoặc Dữ liệu Khách hàng đã nhập. |
| Mã khách hàng | String(50) | Không | Trống | Tìm kiếm chính xác hoặc gần đúng theo Mã khách hàng nộp yêu cầu. |
| Trạng thái hồ sơ | Enum(String(50)) | Không | "Chờ duyệt" | \- Tham chiếu bộ trạng thái hồ sơ Yêu cầu cung cấp thông tin.<br>\- "Chờ thanh toán": Hồ sơ Online đã gửi và đang chờ Khách hàng thanh toán; không hiển thị tại màn xử lý của Cán bộ.<br>\- "Chờ duyệt": Hồ sơ Online đã thanh toán thành công/miễn phí, đang chờ Cán bộ kiểm tra, tra cứu và xử lý.<br>\- "Chờ giải quyết": Hồ sơ giấy đã hoàn tất thu phí/miễn phí, đang chờ Cán bộ kiểm tra, tra cứu và xử lý.<br>\- "Chờ ký": Hồ sơ đã được Cán bộ trình Lãnh đạo ký, đang chờ Lãnh đạo ký số file PDF.<br>\- "Hoàn thành": Hồ sơ đã được Lãnh đạo ký số thành công và Khách hàng/Người yêu cầu được xem/tải file PDF đã ký.<br>\- "Bị từ chối": Hồ sơ bị Cán bộ hoặc Lãnh đạo từ chối theo điều kiện nghiệp vụ, không dùng riêng cho trường hợp tra cứu không có dữ liệu còn hiệu lực.<br>\- "Bị trả lại": Hồ sơ bị Lãnh đạo trả lại từ bước ký để Cán bộ xử lý lại.<br>\- Màn hình mặc định hiển thị hồ sơ ở trạng thái "Chờ duyệt" và "Chờ giải quyết". |
| Tiêu chí yêu cầu cung cấp thông tin | Enum(String(50)) | Không | Tất cả | \- Lọc theo tiêu chí Khách hàng đã chọn.<br>\- Các giá trị gồm:<br>\- Tất cả<br>\- Số đăng ký<br>\- Bên bảo đảm<br>\- Số khung |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Lọc theo Thời điểm đăng ký. Tuân thủ [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Lọc theo Thời điểm đăng ký. Tuân thủ [BR-VAL-007]. |
| **II. Bảng danh sách hồ sơ** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Bảng danh sách hồ sơ | Text(1000) | Không | 20 bản ghi/trang | \- Hiển thị danh sách hồ sơ Yêu cầu cung cấp thông tin thuộc phạm vi xử lý của Cán bộ.<br>\- Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên xử lý hồ sơ đến trước.<br>\- Click trực tiếp vào dòng dữ liệu để mở **4.3.2.2.3. UC-CCTT-CB.MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin**.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| STT | Integer(10) | Không | Tự tăng | Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Mã khách hàng gắn với tài khoản nộp yêu cầu, nếu có. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Tên cá nhân/tổ chức yêu cầu cung cấp thông tin. |
| Địa chỉ | Text(500) | Không | Theo hồ sơ | Địa chỉ của Người yêu cầu theo thông tin Khách hàng đã gửi trong hồ sơ. |
| Tiêu chí yêu cầu | Enum(String(50)) | Có | Theo hồ sơ | Hiển thị một trong các giá trị: "Số đăng ký", "Bên bảo đảm", "Số khung". |
| Dữ liệu đã nhập | Text(1000) | Có | Theo hồ sơ | Tóm tắt dữ liệu Khách hàng đã gửi theo tiêu chí yêu cầu. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị "Website Khách hàng" hoặc "Mobile Khách hàng". Màn hình này không hiển thị hồ sơ giấy có Nguồn tiếp nhận là "Cán bộ nhập liệu". |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Thời điểm Khách hàng gửi yêu cầu. Cột này đặt ngay sau cột Nguồn tiếp nhận. |
| Trạng thái | Enum(String(50)) | Có | "Chờ duyệt" | \- Hiển thị trạng thái hiện tại của hồ sơ.<br>\- "Chờ duyệt": Hồ sơ Online đã thanh toán thành công/miễn phí, đang chờ Cán bộ kiểm tra, tra cứu và xử lý.<br>\- "Chờ giải quyết": Hồ sơ giấy đã hoàn tất thu phí/miễn phí, đang chờ Cán bộ kiểm tra, tra cứu và xử lý.<br>\- "Chờ ký": Hồ sơ đã được Cán bộ trình Lãnh đạo ký, đang chờ Lãnh đạo ký số file PDF.<br>\- "Hoàn thành": Hồ sơ đã được Lãnh đạo ký số thành công và Khách hàng/Người yêu cầu được xem/tải file PDF đã ký.<br>\- "Bị từ chối": Hồ sơ bị Cán bộ hoặc Lãnh đạo từ chối theo điều kiện nghiệp vụ, không dùng riêng cho trường hợp tra cứu không có dữ liệu còn hiệu lực.<br>\- "Bị trả lại": Hồ sơ bị Lãnh đạo trả lại từ bước ký để Cán bộ xử lý lại.<br>\- Tại màn hình chờ xử lý, hệ thống mặc định hiển thị hồ sơ "Chờ duyệt" và "Chờ giải quyết". |
| Cán bộ xử lý | String(255) | Không | Theo phân công | Hiển thị Cán bộ đang được phân công xử lý, nếu đã có. |
| Thao tác | String(255) | Không | Theo trạng thái | Hiển thị "Xử lý hồ sơ" đối với hồ sơ ở trạng thái "Chờ duyệt", "Chờ giải quyết" hoặc "Bị trả lại". |

##### 4.3.2.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Điều kiện ngày không hợp lệ): Nếu Từ ngày lớn hơn Đến ngày, vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
|  |  |  | TH Hợp lệ: Hệ thống tìm kiếm theo bộ lọc trong phạm vi hồ sơ thuộc quyền xử lý của Cán bộ. Nếu không có dữ liệu phù hợp, hiển thị thông báo theo [MSG-WRN-SYS-001] hoặc trạng thái rỗng theo chuẩn danh sách. |
| 2 | Xóa bộ lọc | Nút | Xóa toàn bộ tiêu chí lọc, đưa Trạng thái hồ sơ về "Chờ duyệt/Chờ giải quyết", Tiêu chí yêu cầu cung cấp thông tin về "Tất cả", Từ ngày/Đến ngày về mặc định và tải lại danh sách mặc định. |
| 3 | Xử lý hồ sơ | Nút | TH1 (Hồ sơ không thuộc trạng thái Cán bộ được phép xử lý): Vi phạm [BR-CCTT-002], hiển thị [MSG-ERR-CCTT-002], không mở màn hình xử lý. |
|  |  |  | TH2 (Cán bộ không có quyền xử lý): Vi phạm [BR-CCTT-002], hiển thị [MSG-ERR-CCTT-003], không mở màn hình xử lý. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.2.3. UC-CCTT-CB.MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin**. |
| 4 | Click dòng dữ liệu | Row Click | Mở **4.3.2.2.3. UC-CCTT-CB.MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin** nếu hồ sơ còn thuộc quyền xử lý của Cán bộ. |

#### 4.3.2.2.3. UC-CCTT-CB.MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin

##### 4.3.2.2.3.1. Màn hình

![Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin](images/UC_CCTT_CB_MH02_Xu_ly_ho_so_yeu_cau_cung_cap_thong_tin.png)

##### 4.3.2.2.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ** | | | | |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. Thời điểm Khách hàng gửi yêu cầu. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Chỉ đọc. Tên cá nhân/tổ chức yêu cầu cung cấp thông tin. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Chỉ đọc. Chỉ hiển thị khi hồ sơ có dữ liệu. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | \- Chỉ đọc.<br>\- Các giá trị gồm:<br>\- Website Khách hàng<br>\- Mobile Khách hàng<br>\- Cán bộ nhập liệu<br>\- Màn hình này xử lý hồ sơ Online ở trạng thái "Chờ duyệt" và hồ sơ giấy ở trạng thái "Chờ giải quyết". |
| Tiêu chí yêu cầu cung cấp thông tin | Enum(String(50)) | Có | Theo hồ sơ | \- Chỉ đọc.<br>\- Các giá trị gồm:<br>\- Số đăng ký<br>\- Bên bảo đảm<br>\- Số khung |
| Dữ liệu Khách hàng đã nhập | Text(1000) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị nguyên dữ liệu tra cứu Khách hàng đã gửi, không cho phép chỉnh sửa. |
| Trạng thái | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Khi Cán bộ xử lý, trạng thái phải là "Chờ duyệt", "Chờ giải quyết" hoặc "Bị trả lại". |
| Cán bộ xử lý | String(255) | Không | Theo phân công | Chỉ đọc. Hiển thị Cán bộ đang xử lý hồ sơ; nếu chưa có, hệ thống ghi nhận Cán bộ hiện tại khi bắt đầu xử lý. |
| Lịch sử xử lý | Text(4000) | Không | Theo hồ sơ | Chỉ đọc. Hiển thị dòng thời gian các thao tác gửi yêu cầu/nhập liệu, thanh toán/thu phí, tra cứu, kết xuất, trình ký, ký số, từ chối, trả lại và các lần thay đổi trạng thái. |
| **II. Khu vực tra cứu** | | | | |
| Form tra cứu | Enum(String(50)) | Có | Theo tiêu chí hồ sơ | \- Chỉ đọc. Hệ thống tự động xác định form tra cứu theo tiêu chí Khách hàng đã lựa chọn.<br>\- Các giá trị gồm:<br>\- Tra cứu theo Số đăng ký<br>\- Tra cứu theo Bên bảo đảm<br>\- Tra cứu theo Số khung |
| Số đăng ký | String(50) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Số đăng ký".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Loại chủ thể | Enum(String(50)) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm".<br>\- Chỉ đọc, tham chiếu [DM_06]. |
| Số CMND/Căn cước công dân/Chứng minh quân đội | String(12) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và Loại chủ thể là "Công dân Việt Nam".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Mã số thuế/Số đăng ký kinh doanh | String(14) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và Loại chủ thể là "Tổ chức có đăng ký kinh doanh trong nước".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Họ và tên | String(255) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và Loại chủ thể là:<br>\- "Người nước ngoài"<br>\- "Người không quốc tịch cư trú tại Việt Nam"<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Số Hộ chiếu | String(50) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và Loại chủ thể là "Người nước ngoài".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Mã số thuế/Số giấy phép đầu tư | String(50) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và Loại chủ thể là "Tổ chức nước ngoài".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Tên tổ chức | String(255) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và Loại chủ thể là "Tổ chức khác".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Số thẻ cư trú | String(50) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Bên bảo đảm" và Loại chủ thể là "Người không quốc tịch cư trú tại Việt Nam".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| Số khung | String(50) | Tùy điều kiện | Theo hồ sơ | \- Chỉ hiển thị nếu Tiêu chí yêu cầu cung cấp thông tin là "Số khung".<br>\- Chỉ đọc, không cho phép chỉnh sửa theo [BR-CCTT-001]. |
| **III. Tệp kết xuất kết quả cung cấp thông tin** | | | | |
| File PDF dự thảo | File | Không | Theo kết xuất | \- Hiển thị ở đầu khu vực kết quả tra cứu sau khi Cán bộ bấm "Kết xuất kết quả", để Cán bộ không phải cuộn qua danh sách kết quả dài mới xem/tải/trình file.<br>\- File được sinh theo đúng mẫu `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf`.<br>\- File gồm lá mặt/trang ký Mẫu số 10d theo mục 4.3.2.2.7.2 và phần kết quả cung cấp thông tin/phụ lục phía sau theo mục 4.3.2.2.7.3.<br>\- Nếu tra cứu có dữ liệu, chi tiết hồ sơ kết quả tra cứu được hiển thị theo cùng cấu trúc tham chiếu tại mục 4.3.2.2.7.4.<br>\- Nếu tra cứu không có dữ liệu, file PDF hiển thị [MSG-WRN-CCTT-001] theo mục 4.3.2.2.7.3, không đính kèm chi tiết hồ sơ.<br>\- Đây là file dự thảo, chưa phải file ký số. |
| Thời điểm kết xuất | Datetime | Không | Theo kết xuất | Chỉ đọc. Thời điểm hệ thống sinh file PDF dự thảo. |
| Phiên bản PDF trình ký | String(50) | Không | Theo hồ sơ | Chỉ hiển thị sau khi Cán bộ trình ký thành công. Phiên bản này bị khóa theo [BR-CCTT-004]. |
| **IV. Kết quả tra cứu** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* |
| Trạng thái tra cứu | Enum(String(50)) | Không | Chưa tra cứu | \- Chỉ đọc.<br>\- Các giá trị gồm:<br>\- Chưa tra cứu<br>\- Đang tra cứu<br>\- Có kết quả<br>\- Không có kết quả<br>\- Lỗi dịch vụ |
| Thời điểm tra cứu | Datetime | Không | Theo lần tra cứu | Chỉ đọc. Hiển thị sau khi Cán bộ bấm "Tra cứu". |
| Tiêu chí tra cứu thực tế | Enum(String(50)) | Không | Theo hồ sơ | Chỉ đọc. Ghi nhận đúng tiêu chí đã sử dụng khi gọi dịch vụ tra cứu. |
| Dữ liệu đầu vào tra cứu | Text(1000) | Không | Theo hồ sơ | Chỉ đọc. Ghi nhận đúng dữ liệu đã dùng để gọi dịch vụ tra cứu. |
| Thông báo kết quả | Text(1000) | Không | Theo kết quả tra cứu | \- Chỉ hiển thị sau khi có kết quả tra cứu.<br>\- Nếu không có dữ liệu, hiển thị [MSG-WRN-CCTT-001] dạng Inline ngay trong khu vực kết quả tra cứu, không hiển thị Toast; đồng thời cho phép Cán bộ kết xuất file PDF thông báo không có kết quả để trình Lãnh đạo ký. |
| Bảng danh sách kết quả tra cứu | Text(4000) | Không | Theo kết quả tra cứu | \- Chỉ hiển thị khi tra cứu có kết quả.<br>\- Hiển thị giống hệt cấu trúc **VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký** tại màn Xem chi tiết hồ sơ của Website Khách hàng trong tài liệu [SRS yêu cầu cung cấp thông tin.md](../../01_Website_Khach_hang/SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md#vi-ket-qua-cung-cap-thong-tin-co-xac-nhan-cua-co-quan-dang-ky).<br>\- Không mô tả lại danh sách cột/khối chi tiết tại tài liệu này để bảo đảm Website Cán bộ, Lãnh đạo và Website Khách hàng hiển thị thống nhất.<br>\- Dữ liệu nguồn vẫn tuân thủ [BR-CCTT-002]: chỉ gồm hồ sơ ở trạng thái "Hoàn thành", còn hiệu lực tại thời điểm tra cứu.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| **V. Thông tin kết quả không có dữ liệu** | | | | |
| Nội dung thông báo không có kết quả | Text(1000) | Tùy điều kiện | [MSG-WRN-CCTT-001] | \- Chỉ hiển thị khi tra cứu hoàn thành về mặt kỹ thuật và không có kết quả.<br>\- Chỉ đọc tại màn hình xử lý.<br>\- Nội dung hiển thị lấy theo MessageList dùng chung [MSG-WRN-CCTT-001], không hard-code riêng tại màn hình.<br>\- Hiển thị Inline ngay trong khu vực kết quả tra cứu, không hiển thị Toast.<br>\- Nội dung này được đưa vào file PDF dự thảo theo đúng mẫu kết quả cung cấp thông tin CCTT để trình Lãnh đạo ký. |

##### 4.3.2.2.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tra cứu | Nút | TH1 (Hồ sơ không thuộc trạng thái Cán bộ được phép xử lý): Vi phạm [BR-CCTT-002], hiển thị [MSG-ERR-CCTT-002], không gọi dịch vụ tra cứu.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
|  |  |  | TH2 (Cán bộ không có quyền xử lý): Vi phạm [BR-CCTT-002], hiển thị [MSG-ERR-CCTT-003], không gọi dịch vụ tra cứu. |
|  |  |  | TH3 (Dữ liệu tra cứu không khớp dữ liệu đã khóa trong hồ sơ): Vi phạm [BR-CCTT-001], hiển thị [MSG-ERR-CCTT-001], không gọi dịch vụ tra cứu. |
|  |  |  | TH4 (Dịch vụ tra cứu lỗi hoặc không khả dụng): Vi phạm [BR-CCTT-002], hiển thị [MSG-ERR-CCTT-004], ghi nhận trạng thái lỗi vào hồ sơ và không cho phép kết xuất PDF/trình ký. |
|  |  |  | TH5 (Tra cứu thành công nhưng không có dữ liệu): Hệ thống hiển thị [MSG-WRN-CCTT-001] với nội dung lấy từ MessageList dùng chung, dạng Inline ngay trong khu vực kết quả tra cứu, không hiển thị Toast; ghi nhận kết quả không có dữ liệu vào hồ sơ, hiển thị Nội dung thông báo không có kết quả và cho phép Cán bộ thực hiện "Kết xuất kết quả" để sinh file PDF dự thảo trình ký. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>\- Gọi dịch vụ tra cứu theo đúng tiêu chí và dữ liệu Khách hàng đã gửi.<br>\- Chỉ lấy hồ sơ đăng ký ở trạng thái "Hoàn thành", còn hiệu lực tại thời điểm tra cứu theo [BR-CCTT-002].<br>\- Hiển thị danh sách kết quả.<br>\- Ghi nhận Cán bộ thực hiện, thời điểm tra cứu, tiêu chí tra cứu, dữ liệu đầu vào và kết quả tra cứu vào hồ sơ.<br>\- Ghi lịch sử xử lý của hồ sơ và Audit log hệ thống, gồm người thao tác, thời điểm, hành động "Tra cứu", tiêu chí tra cứu, dữ liệu đầu vào, trạng thái kết quả và mã lỗi nếu có.<br>\- Hiển thị [MSG-SUC-CCTT-001]. |
| 2 | Kết xuất kết quả | Nút | TH1 (Chưa có phiên tra cứu xử lý thành công): Vi phạm [BR-CCTT-004], hiển thị [MSG-ERR-CCTT-005], không sinh file PDF. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>\- Lưu kết quả tra cứu vào hồ sơ, bao gồm cả trường hợp không có dữ liệu.<br>\- Sinh file PDF dự thảo theo đúng mẫu `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf`, mapping lá mặt/trang ký tại mục 4.3.2.2.7.2 và mapping phần kết quả cung cấp thông tin/phụ lục tại mục 4.3.2.2.7.3.<br>\- Nếu có kết quả, đính kèm chi tiết hồ sơ kết quả tra cứu theo mục 4.3.2.2.7.4.<br>\- Nếu không có kết quả, hiển thị dòng thông báo không có kết quả theo đúng mẫu, không đính kèm chi tiết hồ sơ.<br>\- Gắn file PDF dự thảo vào hồ sơ.<br>\- Hiển thị [MSG-SUC-CCTT-002]. |
| 3 | Xem file | Link/Nút | Chỉ hiển thị sau khi có File PDF dự thảo. Cho phép xem file tại một tab riêng. |
| 4 | Trình ký | Nút | TH1 (Chưa có phiên tra cứu xử lý thành công hoặc chưa kết xuất PDF): Vi phạm [BR-CCTT-004], hiển thị [MSG-ERR-CCTT-005], không cho phép trình ký. |
|  |  |  | TH2 (Hồ sơ không thuộc trạng thái Cán bộ được phép xử lý): Vi phạm [BR-CCTT-002], hiển thị [MSG-ERR-CCTT-002], không cho phép trình ký. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.2.5. UC-CCTT-CB.MH04 - Popup Trình ký kết quả cung cấp thông tin** để Cán bộ chọn Lãnh đạo ký và xác nhận trình ký. |
| 5 | Từ chối | Nút | Hiển thị khi hồ sơ ở trạng thái "Chờ duyệt", "Chờ giải quyết" hoặc "Bị trả lại". Khi Cán bộ từ chối, hệ thống bắt buộc nhập lý do từ chối, lưu người từ chối, thời điểm từ chối, lý do từ chối, lịch sử xử lý và chuyển hồ sơ sang trạng thái "Bị từ chối" theo [BR-CCTT-007]. Nếu hồ sơ Online đã thanh toán, hệ thống tạo yêu cầu hoàn tiền và chuyển sang Module Quản lý đối soát thanh toán để theo dõi. Nếu hồ sơ giấy đã thu phí, hệ thống tạo khoản hoàn phí/thông báo kế toán xử lý tại Module Quản lý thu phí/hoàn phí hồ sơ giấy. Không dùng thao tác này cho riêng trường hợp tra cứu không có dữ liệu; trường hợp không có dữ liệu được xử lý bằng thao tác "Kết xuất kết quả" và "Trình ký" để Lãnh đạo ký file PDF thông báo kết quả. |
| 6 | Quay lại | Nút | Quay lại **4.3.2.2.2. UC-CCTT-CB.MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ xử lý**, giữ nguyên bộ lọc trước đó. |

#### 4.3.2.2.5. UC-CCTT-CB.MH04 - Popup Trình ký kết quả cung cấp thông tin

##### 4.3.2.2.5.1. Màn hình

![Popup Trình ký kết quả cung cấp thông tin](images/UC_CCTT_CB_MH04_Trinh_ky_ket_qua_cung_cap_thong_tin.png)

##### 4.3.2.2.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. Mã hồ sơ Yêu cầu cung cấp thông tin. |
| File PDF kết quả cung cấp thông tin | File | Có | Theo kết xuất | \- Chỉ đọc. Hiển thị file PDF dự thảo được sinh theo mẫu `GCN_Mau Giay chung nhan CCTT.pdf`.<br>\- File bắt đầu bằng tiêu đề "KẾT QUẢ CUNG CẤP THÔNG TIN CÓ XÁC NHẬN CỦA CƠ QUAN ĐĂNG KÝ".<br>\- Nếu phiên tra cứu có dữ liệu, file bao gồm phần chi tiết hồ sơ kết quả tra cứu.<br>\- Nếu phiên tra cứu không có dữ liệu, file hiển thị thông báo không có kết quả theo mẫu.<br>\- Phiên bản file này là phiên bản Cán bộ trình Lãnh đạo ký, được khóa khi trình ký thành công theo [BR-CCTT-004]. |
| Số lượng kết quả tra cứu | Integer(10) | Có | Theo kết quả | Chỉ đọc. Tổng số hồ sơ đăng ký còn hiệu lực được sử dụng để sinh PDF. |
| Người trình ký | String(255) | Có | Cán bộ hiện tại | Chỉ đọc. Cán bộ thực hiện trình ký. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | \- Control UI: Combobox có ô tìm kiếm.<br>\- Bắt buộc chọn trước khi xác nhận trình ký.<br>\- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>\- Cho phép Cán bộ tìm kiếm gần đúng theo tên Lãnh đạo, chức danh hoặc đơn vị trước khi chọn người ký.<br>\- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký hồ sơ cung cấp thông tin được chọn. |

##### 4.3.2.2.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại **4.3.2.2.3. UC-CCTT-CB.MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin**. |
| 2 | Xác nhận | Nút | TH1 (Hồ sơ không thuộc trạng thái Cán bộ được phép xử lý): Vi phạm [BR-CCTT-002], hiển thị [MSG-ERR-CCTT-002], không cho phép trình ký. |
|  |  |  | TH2 (Chưa có phiên tra cứu xử lý thành công hoặc không có file PDF hợp lệ): Vi phạm [BR-CCTT-004], hiển thị [MSG-ERR-CCTT-005], không cho phép trình ký. |
|  |  |  | TH3 (Chưa chọn Lãnh đạo ký hoặc Lãnh đạo ký không còn hiệu lực trong cấu hình): Vi phạm [BR-CCTT-004], hiển thị [MSG-ERR-VAL-001], không cho phép trình ký. |
|  |  |  | TH Hợp lệ: Hệ thống thực hiện:<br>\- Lưu kết quả tra cứu được sử dụng để trình ký.<br>\- Khóa kết quả tra cứu.<br>\- Khóa phiên bản file PDF dự thảo được trình ký.<br>\- Ghi nhận Cán bộ trình ký, thời điểm trình ký và Lãnh đạo ký đã chọn.<br>\- Chuyển hồ sơ sang trạng thái "Chờ ký".<br>\- Chuyển hồ sơ đến đúng Lãnh đạo ký đã chọn.<br>\- Ghi lịch sử xử lý của hồ sơ và Audit log hệ thống, gồm người thao tác, thời điểm, hành động "Trình ký", mã hồ sơ, phiên bản PDF trình ký và Lãnh đạo ký đã chọn.<br>\- Hiển thị [MSG-SUC-CCTT-003]. |

#### 4.3.2.2.6. UC-CCTT-CB.MH05 - Màn hình Xem trước file PDF dự thảo

##### 4.3.2.2.6.1. Màn hình

![Màn hình Xem trước file PDF dự thảo](images/UC_CCTT_CB_MH05_Xem_truoc_file_pdf_du_thao.png)

##### 4.3.2.2.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Trạng thái tra cứu | Enum(String(50)) | Có | Theo phiên tra cứu | Chỉ đọc. Hiển thị "Có kết quả" hoặc "Không có kết quả". |
| File PDF dự thảo | File | Có | Theo kết xuất | Chỉ đọc. Hiển thị bản xem trước file PDF kết quả cung cấp thông tin được sinh theo đúng mẫu `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf`. |
| Nội dung thông báo không có kết quả | Text(1000) | Tùy điều kiện | Theo kết quả tra cứu | Chỉ hiển thị trong bản PDF khi Trạng thái tra cứu là "Không có kết quả". Nội dung lấy theo [MSG-WRN-CCTT-001]. |

##### 4.3.2.2.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Đóng màn hình xem trước, giữ nguyên trạng thái hồ sơ và quay lại **4.3.2.2.3. UC-CCTT-CB.MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin**. |
| 2 | Tải file dự thảo | Nút | Cho phép Cán bộ tải file PDF dự thảo để kiểm tra nội dung trước khi trình ký. |
| 3 | Trình ký | Nút | Mở **4.3.2.2.5. UC-CCTT-CB.MH04 - Popup Trình ký kết quả cung cấp thông tin**. |

#### 4.3.2.2.7. Quy tắc xử lý kết quả tra cứu và kết xuất PDF kết quả cung cấp thông tin

| STT | Quy tắc | Mô tả |
| :--- | :--- | :--- |
| 1 | Sử dụng dữ liệu đã khóa | Hệ thống chỉ sử dụng tiêu chí và dữ liệu tra cứu đã lưu trong hồ sơ Khách hàng gửi; không sử dụng dữ liệu khác với dữ liệu đã khóa theo [BR-CCTT-001]. |
| 2 | Phạm vi kết quả tra cứu | Kết quả chỉ bao gồm hồ sơ đăng ký ở trạng thái "Hoàn thành", còn hiệu lực tại thời điểm tra cứu và chưa bị chấm dứt hiệu lực bởi hồ sơ xóa đăng ký/xóa thông báo xử lý tài sản đã hoàn thành theo [BR-CCTT-002]. |
| 3 | Thứ tự kết quả | Kết quả tra cứu hiển thị và kết xuất theo thứ tự Số hồ sơ tăng dần, bảo đảm liên tục từ hồ sơ đăng ký ban đầu đến các hồ sơ phát sinh sau đó như đăng ký thay đổi, xóa đăng ký, thông báo xử lý tài sản nếu còn hiệu lực. |
| 4 | Kết xuất PDF | File PDF phải sinh theo đúng mẫu `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf`; nội dung tiêu chí tra cứu, thời điểm tra cứu và kết quả tra cứu phải khớp với phiên tra cứu đã lưu trong hồ sơ. Nếu có kết quả, chi tiết hồ sơ kết quả tra cứu phải được đưa vào cùng file PDF. Nếu không có kết quả, file PDF hiển thị dòng thông báo không có dữ liệu theo mẫu và vẫn được trình Lãnh đạo ký, không phát sinh nghĩa vụ thanh toán. |
| 5 | Khóa khi trình ký | Khi trình ký thành công, hệ thống khóa kết quả tra cứu và khóa đúng phiên bản file PDF dự thảo được trình ký. Cán bộ và Lãnh đạo không được chỉnh sửa kết quả tra cứu hoặc thay thế file PDF đã trình ký. Trường hợp phát hiện sai sót, Lãnh đạo thực hiện "Từ chối"; hồ sơ chuyển sang trạng thái "Bị từ chối" theo luồng hiện tại. |
| 6 | Ghi log | Mọi thao tác mở xử lý, tra cứu, kết xuất, xem trước PDF, trình ký, từ chối và thay đổi trạng thái phải ghi lịch sử xử lý của hồ sơ và Audit log hệ thống. Log tối thiểu gồm: mã hồ sơ, người thao tác, vai trò, thời điểm, hành động, trạng thái trước/sau, dữ liệu đầu vào chính và kết quả xử lý/lỗi nếu có. |

##### 4.3.2.2.7.1. Nguyên tắc sinh file PDF kết quả cung cấp thông tin

\- Hệ thống sinh file PDF kết quả cung cấp thông tin khi Cán bộ đã thực hiện tra cứu và dịch vụ tra cứu trả về kết quả kỹ thuật thành công.

\- Hệ thống sinh file PDF cho cả 2 trường hợp:

\- Tra cứu có ít nhất một hồ sơ đăng ký còn hiệu lực tại thời điểm tra cứu.

\- Tra cứu không tìm thấy hồ sơ đăng ký còn hiệu lực tại thời điểm tra cứu.

\- File PDF được sinh tại thao tác "Kết xuất kết quả" và là file dự thảo để Cán bộ kiểm tra trước khi "Trình ký".

\- File PDF phải tuân thủ bố cục, tiêu đề, nội dung thông báo và thứ tự thông tin theo mẫu `docs/Bieu mau/GCN_Mau Giay chung nhan CCTT.pdf`.

\- File PDF kết quả cung cấp thông tin bao gồm:

\+ Lá mặt/trang ký theo Mẫu số 10d.

\+ Phần kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký.

\+ Phần chi tiết hồ sơ/phụ lục chi tiết chỉ hiển thị khi có dữ liệu đăng ký còn hiệu lực được tìm thấy.

\- File PDF dự thảo được gắn vào hồ sơ và là đúng file Cán bộ trình Lãnh đạo ký; không tách riêng file kết quả tra cứu và file phụ lục.

\- Khi Cán bộ "Trình ký" thành công, hệ thống khóa đúng phiên bản file PDF dự thảo đã được trình ký theo [BR-CCTT-004].

\- Khi Lãnh đạo ký số thành công ở bước "Chờ ký", chữ ký số được gắn lên cùng file PDF đã được duyệt; toàn bộ nội dung văn bản kết quả cung cấp thông tin và phần phụ lục chi tiết nếu có được ký trong cùng một tài liệu.

\- Nếu Cán bộ kết xuất lại trước khi trình ký, hệ thống tạo phiên bản PDF mới và phiên bản mới nhất được sử dụng để trình ký.

##### 4.3.2.2.7.2. Mapping dữ liệu lá mặt/trang ký Mẫu số 10d

| STT | Thành phần trên lá mặt/trang ký | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Mẫu số 10d | Cấu hình biểu mẫu | Hiển thị cố định ở góc trên bên phải: "Mẫu số 10d". |
| 2 | Mã hồ sơ TTHC | Hồ sơ Yêu cầu cung cấp thông tin/hệ thống một cửa nếu có tích hợp | Hiển thị mã hồ sơ thủ tục hành chính tương ứng với hồ sơ CCTT. Nếu hồ sơ chưa có mã hồ sơ TTHC từ hệ thống một cửa, hiển thị theo mã hồ sơ CCTT nội bộ hoặc mã định danh hồ sơ được cấu hình dùng cho tra cứu TTHC. |
| 3 | Tên cơ quan đăng ký bên trái | Cấu hình đơn vị xử lý hồ sơ | Hiển thị tên cơ quan cấp trên và tên Trung tâm đăng ký xử lý hồ sơ theo đúng mẫu, ví dụ: "CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC" và "TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI". |
| 4 | Quốc hiệu, tiêu ngữ | Cấu hình biểu mẫu | Hiển thị cố định: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" và "Độc lập - Tự do - Hạnh phúc". |
| 5 | Địa danh, ngày tháng năm lập văn bản | Cấu hình đơn vị xử lý hồ sơ và thời điểm kết xuất PDF | Địa danh lấy theo đơn vị xử lý hồ sơ. Ngày tháng năm lấy theo ngày hệ thống sinh file PDF dự thảo tại thao tác "Kết xuất kết quả". Định dạng theo mẫu: "[Địa danh], ngày [dd] tháng [mm] năm [yyyy]". |
| 6 | Tên văn bản | Cấu hình biểu mẫu | Hiển thị cố định, in hoa, in đậm: "VĂN BẢN CUNG CẤP THÔNG TIN VỀ BIỆN PHÁP BẢO ĐẢM BẰNG ĐỘNG SẢN, CÂY HẰNG NĂM, CÔNG TRÌNH TẠM". |
| 7 | Người yêu cầu cung cấp thông tin | Hồ sơ Yêu cầu cung cấp thông tin do Khách hàng gửi | Hiển thị tên cá nhân/tổ chức yêu cầu cung cấp thông tin. Định dạng: "Người yêu cầu cung cấp thông tin: [Tên người yêu cầu]". |
| 8 | Địa chỉ liên hệ | Hồ sơ Yêu cầu cung cấp thông tin do Khách hàng gửi | Hiển thị địa chỉ của người yêu cầu đã lưu trong hồ sơ. Định dạng: "Địa chỉ liên hệ: [Địa chỉ chi tiết], [Tỉnh/Thành phố], [Quốc gia]". |
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
| 8 | Thời điểm tra cứu | Kết quả tra cứu đã lưu trong hồ sơ | Hiển thị thời điểm dịch vụ tra cứu xử lý thành công, áp dụng cho cả trường hợp có kết quả và không có kết quả. Định dạng theo mẫu: "- Thời điểm tra cứu: dd-mm-yyyy HH:mm". |
| 9 | Đường kẻ phân tách | Cấu hình biểu mẫu | Hiển thị đường kẻ ngang sau nhóm thông tin tiêu chí tra cứu, trước phần kết quả. |
| 10 | Dòng kết quả không có dữ liệu | Kết quả tra cứu đã lưu trong hồ sơ | Chỉ hiển thị khi Trạng thái tra cứu là "Không có kết quả". Nội dung lấy theo [MSG-WRN-CCTT-001]. |
| 11 | Liên kết với lá mặt/trang ký | File PDF kết quả cung cấp thông tin | Phần kết quả cung cấp thông tin/phụ lục nằm sau lá mặt/trang ký trong cùng một file PDF; không tách thành file riêng. |

##### 4.3.2.2.7.4. Mapping dữ liệu chi tiết hồ sơ kết quả tra cứu

| STT | Thành phần kết quả đính kèm | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Chi tiết hồ sơ kết quả tra cứu | Kết quả tra cứu đã lưu trong hồ sơ và dữ liệu Review nghiệp vụ tương ứng | Phần chi tiết hồ sơ kết quả tra cứu trong file PDF dự thảo/trình ký/ký số phải hiển thị giống hệt **VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký** tại màn Xem chi tiết hồ sơ của Website Khách hàng trong tài liệu [SRS yêu cầu cung cấp thông tin.md](../../01_Website_Khach_hang/SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md#vi-ket-qua-cung-cap-thong-tin-co-xac-nhan-cua-co-quan-dang-ky). Không mô tả lại các khối/cột chi tiết tại tài liệu này để bảo đảm Website Cán bộ, Lãnh đạo và Website Khách hàng dùng chung một cấu trúc hiển thị. |
| 2 | Phạm vi hồ sơ đưa vào phần kết quả chi tiết | Kết quả tra cứu đã lưu trong hồ sơ | Chỉ đưa vào phần kết quả chi tiết các hồ sơ đăng ký ở trạng thái "Hoàn thành", còn hiệu lực tại thời điểm tra cứu và chưa có hồ sơ xóa đăng ký/xóa thông báo xử lý tài sản đã hoàn thành làm chấm dứt hiệu lực theo [BR-CCTT-002]. |
| 3 | Số trang và liên kết với file chính | Trình sinh PDF | Đánh số trang liên tục cho toàn bộ file PDF. Phần kết quả chi tiết nếu có phải nằm trong cùng file PDF được trình ký và ký số. |

