### 4.3.2.7. Ký duyệt yêu cầu cung cấp thông tin

#### 4.3.2.7.1. Mục đích

\- Cho phép Lãnh đạo xem chi tiết, ký số, từ chối hoặc trả lại (đối với hồ sơ có Nguồn tiếp nhận là "Trực tiếp") hồ sơ Yêu cầu cung cấp thông tin đã được Cán bộ trình ký ở trạng thái **"Chờ ký"**.

*a. Phân quyền*

\- Lãnh đạo được phân quyền ký duyệt Yêu cầu cung cấp thông tin: Được phép xem, ký số, từ chối và trả lại (chỉ với hồ sơ có Nguồn tiếp nhận là "Trực tiếp") các hồ sơ thuộc đơn vị quản lý, thuộc phạm vi thẩm quyền và được Cán bộ trình tới đúng Lãnh đạo đó.

\- Lãnh đạo không được sửa dữ liệu hồ sơ, kết quả tra cứu và không được thay thế file PDF kết quả cung cấp thông tin đã được Cán bộ trình ký.

*b. Điều kiện thực hiện*

\- Lãnh đạo đã đăng nhập thành công vào Website Quản trị.

\- Hồ sơ đang ở trạng thái "Chờ ký" và đã có file PDF kết quả cung cấp thông tin được Cán bộ trình ký.

\- Lãnh đạo có chứng thư số hợp lệ theo Hình thức ký số sử dụng (USB Token Ban Cơ yếu Chính phủ, SIM ký số hoặc Ký số từ xa). Với Hình thức ký số là USB Token, máy trạm của Lãnh đạo đã cài đặt thành phần ký số cục bộ.

---

<a id="mh01"></a>
#### 4.3.2.7.2. MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký

##### 4.3.2.7.2.1. Màn hình

![Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](images/UC_CCTT_LD_MH04_Danh_sach_yeu_cau_cung_cap_thong_tin_cho_ky.png)

##### 4.3.2.7.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Mã hồ sơ | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã hồ sơ...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Người yêu cầu | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên người yêu cầu...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo tên cá nhân/tổ chức yêu cầu. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã khách hàng nộp yêu cầu. |
| Nguồn tiếp nhận | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Trực tuyến<br>+ Trực tiếp |
| Cán bộ xử lý | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Danh sách Cán bộ đã trình ký hồ sơ tới Lãnh đạo đăng nhập, thuộc đơn vị quản lý của Lãnh đạo.<br>- Lọc chính xác theo Cán bộ đã trình ký hồ sơ. |
| Tiêu chí yêu cầu cung cấp thông tin | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Số đăng ký<br>+ Bên bảo đảm<br>+ Số khung |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm đăng ký.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| **II. Bảng danh sách yêu cầu cung cấp thông tin chờ ký** | - | - | - | |
| Bảng danh sách hồ sơ | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm thanh phân trang.<br>- Không hiển thị tiêu đề phía trên bảng; Thanh công cụ đặt ở góc phải phía trên bảng.<br>- Chỉ hiển thị hồ sơ Yêu cầu cung cấp thông tin ở trạng thái "Chờ ký" được Cán bộ trình tới Lãnh đạo đang đăng nhập.<br>- **Mặc định khi mở màn hình**: Thời điểm đăng ký từ ngày 01 của tháng hiện tại đến ngày hiện tại, các bộ lọc còn lại là "Tất cả"/Trống, 20 bản ghi/trang.<br>- Sắp xếp mặc định theo Thời điểm trình ký tăng dần để ưu tiên hồ sơ được trình trước.<br>- Cho phép sắp xếp khi click tiêu đề tại 02 cột: Thời điểm đăng ký, Thời điểm trình ký. Các cột còn lại không hỗ trợ sắp xếp.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"* và các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| Thanh công cụ (Toolbar) | - | - | - | Control UI: Nhóm nút phía trên Bảng danh sách, dùng cho thao tác lô trên các hồ sơ đã tích chọn.<br>Gồm:<br>+ Ký số<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Checkbox | Boolean | Không | Không tích | Control UI: Checkbox chọn dòng / Chọn tất cả.<br>- Cho phép chọn một hoặc nhiều hồ sơ để thực hiện Ký số trên thanh công cụ.<br>- Hồ sơ không có file PDF chờ ký hợp lệ: checkbox ở trạng thái khóa mờ (Disabled) kèm tooltip lý do.<br>- Checkbox chọn tất cả tại tiêu đề bảng chỉ chọn các hồ sơ đủ điều kiện đang hiển thị trên trang hiện tại.<br>- Khi Lãnh đạo đổi bộ lọc tìm kiếm, trang dữ liệu hoặc số bản ghi/trang, hệ thống xóa danh sách hồ sơ đã chọn. |
| STT | Integer(10) | - | Theo trang | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng tính liên tục theo trang kết quả hiện tại. |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Mã hồ sơ Yêu cầu cung cấp thông tin. Click vào giá trị mở [MH02 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin chờ ký](#mh02). |
| Thời điểm đăng ký | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Mã khách hàng | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Mã khách hàng gắn với tài khoản nộp yêu cầu, nếu có. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tên cá nhân/tổ chức yêu cầu cung cấp thông tin. |
| Địa chỉ | Text(500) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Địa chỉ của Người yêu cầu, hiển thị đầy đủ theo thứ tự: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia (Quốc gia khác Việt Nam không có Phường/Xã, theo [BR-VAL-015]). |
| Tiêu chí yêu cầu | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị một trong các giá trị: "Số đăng ký", "Bên bảo đảm", "Số khung". |
| Dữ liệu tra cứu | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Dữ liệu tra cứu tương ứng Tiêu chí yêu cầu. |
| Nguồn tiếp nhận | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị "Trực tuyến" hoặc "Trực tiếp". |
| Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tên Cán bộ đã trình ký hồ sơ. |
| Thời điểm trình ký | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Hiển thị trạng thái hiện tại của hồ sơ. |
| Thao tác | - | - | - | Control UI: Nhóm icon thao tác trên dòng.<br>Gồm:<br>+ Ký số<br>+ Từ chối: chỉ khả dụng với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"; hồ sơ khác hiển thị icon dạng mờ (Disabled), không ẩn.<br>+ Trả lại: chỉ khả dụng với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"; hồ sơ khác hiển thị icon dạng mờ (Disabled), không ẩn.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.7.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống tìm kiếm hồ sơ Yêu cầu cung cấp thông tin ở trạng thái "Chờ ký" được trình tới Lãnh đạo đăng nhập theo các điều kiện đã nhập tại Khối Bộ lọc tìm kiếm.<br>- **TH1 (Điều kiện ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày` (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày), hệ thống hiển thị [MSG-ERR-VAL-007], highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Hợp lệ (Có dữ liệu trả về)**: Hệ thống thực hiện:<br>+ Hiển thị danh sách hồ sơ thỏa mãn đồng thời các điều kiện lọc.<br>+ Sắp xếp mặc định theo `Thời điểm trình ký` tăng dần.<br>+ Phân trang theo số dòng hiển thị đang chọn. |
| 2 | Xóa bộ lọc | Nút | Hệ thống thực hiện:<br>+ Đưa toàn bộ tiêu chí lọc về mặc định: Từ ngày là ngày 01 của tháng hiện tại, Đến ngày là ngày hiện tại, các Combobox về "Tất cả", các ô nhập về Trống.<br>+ Đặt lại phân trang về Trang 1 và tải lại danh sách. |
| 3 | Ký số (thanh công cụ) | Nút trên Toolbar | Ký số các hồ sơ đã tích chọn trên lưới cùng một lúc, không giới hạn số lượng hồ sơ.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-CCTT-008], không mở popup.<br>- **TH2 (Có hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-CCTT-013], không mở popup.<br>- **TH3 (Có hồ sơ không có file PDF chờ ký hợp lệ)**: Hệ thống hiển thị [MSG-ERR-CCTT-009], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Ký số yêu cầu cung cấp thông tin](#mh03) và truyền danh sách hồ sơ đã chọn vào popup:<br>+ Chọn 01 hồ sơ: popup hiển thị theo trường hợp Ký 01 hồ sơ.<br>+ Chọn từ 02 hồ sơ trở lên: popup hiển thị theo trường hợp Ký đồng thời nhiều hồ sơ. |
| 4 | Ký số (trên lưới) | Icon trên dòng | Ký số hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-CCTT-013], không mở popup.<br>- **TH2 (Hồ sơ không có file PDF chờ ký hợp lệ)**: Hệ thống hiển thị [MSG-ERR-CCTT-009], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Ký số yêu cầu cung cấp thông tin](#mh03) theo trường hợp Ký 01 hồ sơ cho hồ sơ tại dòng được chọn. |
| 5 | Từ chối (trên lưới) | Icon trên dòng | Chỉ khả dụng với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"; hồ sơ khác hiển thị icon dạng mờ (Disabled), không ẩn. Từ chối hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-CCTT-013], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối yêu cầu cung cấp thông tin](#mh04) cho hồ sơ tại dòng được chọn. |
| 6 | Trả lại (trên lưới) | Icon trên dòng | Chỉ khả dụng với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"; hồ sơ khác hiển thị icon dạng mờ (Disabled), không ẩn. Trả lại hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-CCTT-013], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Trả lại yêu cầu cung cấp thông tin](#mh05) cho hồ sơ tại dòng được chọn. |
| 7 | Click dòng dữ liệu | Row click | Mở [MH02 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin chờ ký](#mh02) của bản ghi được chọn. |
| 8 | Sắp xếp cột | Header cột | Chỉ áp dụng cho 02 cột: `Thời điểm đăng ký`, `Thời điểm trình ký`. Các cột còn lại không hỗ trợ sắp xếp. Khi Lãnh đạo click vào tiêu đề một trong 02 cột trên:<br>+ Lần click thứ nhất: Sắp xếp danh sách kết quả theo chiều tăng dần.<br>+ Lần click thứ hai: Sắp xếp danh sách kết quả theo chiều giảm dần.<br>+ Lần click thứ ba: Đưa về trạng thái sắp xếp mặc định (Thời điểm trình ký tăng dần).<br>+ Giữ nguyên các tiêu chí lọc đang thiết lập và đưa hiển thị về Trang 1. |
| 9 | Chọn tất cả | Checkbox header | Tích chọn hoặc bỏ chọn toàn bộ các hồ sơ đủ điều kiện đang hiển thị trên trang hiện tại phục vụ thao tác Ký số trên thanh công cụ. |

---

<a id="mh02"></a>
#### 4.3.2.7.3. MH02 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin chờ ký

##### 4.3.2.7.3.1. Màn hình

![Màn hình Xem chi tiết yêu cầu cung cấp thông tin chờ ký](images/UC_CCTT_LD_MH02_Chi_tiet_ho_so_cho_duyet.png)

##### 4.3.2.7.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Nội dung màn hình** | - | - | - | Hiển thị và xử lý giống các khối từ **I. Thông tin chung** đến **V. Kết quả tra cứu** tại [MH05 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin - Kiểm tra và xử lý hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Kiem_tra_va_xu_ly_ho_so_Can_bo.md#43216-mh05---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-thong-tin), giống màn Xem chi tiết khi mở từ màn hình Hồ sơ đang chờ ký.<br>- Khối II. Thông tin trả lại: với hồ sơ đã từng bị trả lại và được Cán bộ cập nhật, trình ký lại, hệ thống hiển thị lại vết lịch sử các lần trả lại trước đó (Lý do trả lại, Lãnh đạo trả lại, Thời điểm trả lại, Thời điểm trình ký lại).<br>- Toàn bộ dữ liệu ở trạng thái chỉ đọc. |
| **VI. File PDF chờ ký** | - | - | - | |
| File PDF kết quả cung cấp thông tin | File | - | Lấy theo dữ liệu bản ghi | Control UI: Link `Xem file`, chỉ đọc.<br>- File PDF kết quả cung cấp thông tin đã được Cán bộ trình ký và khóa phiên bản. |
| Thanh nút chức năng | - | - | - | Control UI: Thanh nút cố định (Sticky) ở cuối màn hình, luôn hiển thị kể cả khi nội dung ngắn hoặc khi cuộn trang.<br>Gồm:<br>+ Đóng<br>+ Trả lại: Chỉ hiển thị đối với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"<br>+ Từ chối: Chỉ hiển thị đối với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"<br>+ Ký số |

##### 4.3.2.7.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thu gọn/Mở rộng Thông tin chung, Thông tin trả lại | Click tiêu đề khối | Hiển thị và xử lý giống chức năng **Thu gọn/Mở rộng Thông tin chung** và **Thu gọn/Mở rộng Thông tin trả lại** tại [MH05 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin - Kiểm tra và xử lý hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Kiem_tra_va_xu_ly_ho_so_Can_bo.md#43216-mh05---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-thong-tin). |
| 2 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 3 | Đóng | Nút | Hệ thống đóng màn hình Xem chi tiết và quay lại [MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](#mh01), giữ nguyên bộ lọc tìm kiếm và trang dữ liệu trước đó. |
| 4 | Trả lại | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-CCTT-013], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Trả lại yêu cầu cung cấp thông tin](#mh05) cho hồ sơ đang xem. |
| 5 | Từ chối | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-CCTT-013], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối yêu cầu cung cấp thông tin](#mh04) cho hồ sơ đang xem. |
| 6 | Ký số | Nút | - **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-CCTT-013], không mở popup.<br>- **TH2 (Hồ sơ không có file PDF chờ ký hợp lệ)**: Hệ thống hiển thị [MSG-ERR-CCTT-009], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Ký số yêu cầu cung cấp thông tin](#mh03) theo trường hợp Ký 01 hồ sơ cho hồ sơ đang xem. |

---

<a id="mh03"></a>
#### 4.3.2.7.4. MH03 - Popup Ký số yêu cầu cung cấp thông tin

##### 4.3.2.7.4.1. Màn hình

![Popup Ký số yêu cầu cung cấp thông tin](images/UC_CCTT_LD_MH05_Popup_ky_so_yeu_cau_cung_cap_thong_tin.png)

##### 4.3.2.7.4.2. Mô tả thông tin trên màn hình

\- Popup có 02 trường hợp hiển thị:

\+ **Ký 01 hồ sơ**: khi Lãnh đạo bấm Ký số trên lưới, bấm Ký số tại [MH02 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin chờ ký](#mh02), hoặc bấm Ký số trên thanh công cụ khi chỉ tích chọn 01 hồ sơ. Popup hiển thị khung **Thông tin hồ sơ ký số**.

\+ **Ký đồng thời nhiều hồ sơ**: khi Lãnh đạo bấm Ký số trên thanh công cụ và tích chọn từ 02 hồ sơ trở lên. Popup hiển thị **Danh sách hồ sơ ký số**. Không giới hạn số lượng hồ sơ trong một lần ký.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ ký số** | - | - | - | Control UI: Khung thông tin, chỉ đọc.<br>- Chỉ hiển thị với trường hợp Ký 01 hồ sơ. |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Tiêu chí yêu cầu | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Dữ liệu tra cứu | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Nguồn tiếp nhận | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| File PDF chờ ký | File | - | Lấy theo dữ liệu bản ghi | Control UI: Link `Xem file`, chỉ đọc.<br>- File PDF kết quả cung cấp thông tin đã được Cán bộ trình ký và khóa phiên bản. |
| **Danh sách hồ sơ ký số** | - | - | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Chỉ hiển thị với trường hợp Ký đồng thời nhiều hồ sơ.<br>- Hiển thị toàn bộ hồ sơ đã tích chọn tại [MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](#mh01). |
| Tổng số hồ sơ | Integer(10) | - | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Hiển thị tổng số hồ sơ ký số, đặt phía trên bảng. |
| Cột: STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng trong danh sách. |
| Cột: Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Tiêu chí yêu cầu | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Dữ liệu tra cứu | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Nguồn tiếp nhận | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: File PDF chờ ký | File | - | Lấy theo dữ liệu bản ghi | Control UI: Link `Xem file`, chỉ đọc.<br>- File PDF kết quả cung cấp thông tin đã được Cán bộ trình ký và khóa phiên bản. |
| Cột: Trạng thái ký số | Enum(String(50)) | - | Chưa ký | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Chỉ hiển thị với trường hợp Ký đồng thời nhiều hồ sơ, giúp Lãnh đạo theo dõi kết quả ký của từng hồ sơ trong danh sách.<br>Gồm:<br>+ Chưa ký<br>+ Đang ký<br>+ Ký thành công<br>+ Ký lỗi<br>- Cập nhật theo kết quả ký của từng hồ sơ. |
| **II. Thông tin ký số** | - | - | - | |
| Hình thức ký số | Enum(String(100)) | Có | USB Token Ban Cơ yếu Chính phủ | Control UI: Radio button.<br>Gồm:<br>+ USB Token Ban Cơ yếu Chính phủ<br>+ SIM ký số<br>+ Ký số từ xa (HSM / Cloud CA)<br>- Khi Lãnh đạo đổi Hình thức ký số, hệ thống đưa Trạng thái chứng thư số về "Chưa kiểm tra" và xóa thông tin Chứng thư số, Thời hạn chứng thư số đã đọc trước đó. |
| Trạng thái chứng thư số | Enum(String(50)) | Không | Chưa kiểm tra | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa kiểm tra<br>+ Không tìm thấy thiết bị/tài khoản ký số<br>+ Chứng thư số không hợp lệ<br>+ Chứng thư số hợp lệ |
| Chứng thư số | Enum(String(500)) | Có | Chứng thư số hợp lệ đầu tiên | Control UI: Combobox.<br>- Chứng thư số là "giấy chứng nhận điện tử" do tổ chức cung cấp dịch vụ chứng thực chữ ký số (ví dụ: Ban Cơ yếu Chính phủ) cấp cho Lãnh đạo, dùng để xác định danh tính người ký trên file PDF.<br>- Hiển thị danh sách chứng thư số hợp lệ của Lãnh đạo đọc được sau khi bấm "Kiểm tra chứng thư số", theo Hình thức ký số đã chọn.<br>- Mỗi giá trị hiển thị theo định dạng: `[Tên chủ thể chứng thư số] - [Tổ chức cấp] - Số serial: [Số serial]`.<br>- Nếu chỉ có 01 chứng thư số hợp lệ, hệ thống tự động chọn chứng thư số đó.<br>- Bị khóa (Disabled) khi Trạng thái chứng thư số khác "Chứng thư số hợp lệ". |
| Thời hạn chứng thư số | String(50) | - | Theo chứng thư số | Control UI: Label, chỉ đọc.<br>- Hiển thị theo định dạng: `Từ dd/mm/yyyy đến dd/mm/yyyy` của chứng thư số đang chọn. |

##### 4.3.2.7.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 2 | Kiểm tra chứng thư số | Nút | Hệ thống đọc chứng thư số của Lãnh đạo theo Hình thức ký số đã chọn:<br>+ USB Token Ban Cơ yếu Chính phủ: nhận diện USB Token cắm trên máy trạm qua thành phần ký số cục bộ.<br>+ SIM ký số: kết nối dịch vụ ký số của nhà cung cấp theo số điện thoại ký số của Lãnh đạo.<br>+ Ký số từ xa (HSM / Cloud CA): kết nối dịch vụ ký số từ xa theo tài khoản ký số của Lãnh đạo.<br>- **TH1 (Không tìm thấy thiết bị/tài khoản ký số hoặc không đọc được chứng thư số hợp lệ)**: Hệ thống hiển thị [MSG-ERR-CCTT-010], cập nhật Trạng thái chứng thư số tương ứng và chưa cho phép ký số.<br>- **TH2 (Chứng thư số không thuộc Lãnh đạo đang đăng nhập)**: Hệ thống hiển thị [MSG-ERR-CCTT-012], cập nhật Trạng thái chứng thư số là "Chứng thư số không hợp lệ" và chưa cho phép ký số.<br>- **TH Hợp lệ**: Hệ thống kiểm tra thời hạn chứng thư số và trạng thái thu hồi (nếu có tích hợp OCSP/CRL), hiển thị danh sách chứng thư số hợp lệ, Thời hạn chứng thư số và cập nhật Trạng thái chứng thư số là "Chứng thư số hợp lệ". |
| 3 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 4 | Ký số | Nút | - **TH1 (Chứng thư số chưa hợp lệ)**: Quy định phải kiểm tra chứng thư số hợp lệ trước khi ký. Nếu Trạng thái chứng thư số khác "Chứng thư số hợp lệ", hệ thống hiển thị [MSG-ERR-CCTT-010], không thực hiện ký số.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có file PDF chờ ký hợp lệ)**: Hệ thống hiển thị [MSG-ERR-CCTT-013] hoặc [MSG-ERR-CCTT-009] và không ký hồ sơ đó.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-CCTT-002]. Sau khi Lãnh đạo xác nhận, hệ thống yêu cầu xác thực ký số theo Hình thức ký số đã chọn (USB Token: nhập mã PIN tại thành phần ký số cục bộ; SIM ký số: xác nhận trên điện thoại; Ký số từ xa: nhập mã OTP hoặc xác nhận trên ứng dụng ký số từ xa; hệ thống không lưu mã PIN/mã xác thực).<br>Sau khi xác thực thành công, hệ thống hiển thị trạng thái đang xử lý và khóa các nút thao tác trên popup trong thời gian ký, xử lý theo từng trường hợp:<br>**a. Ký 01 hồ sơ**:<br>+ Ký số trên file PDF chờ ký tại vùng ký của lá mặt/trang ký bằng chứng thư số đã chọn và xác minh chữ ký sau khi ký.<br>+ **Ký lỗi** (Lãnh đạo hủy xác thực, nhập sai PIN/OTP hoặc dịch vụ ký số trả lỗi): Hệ thống hiển thị [MSG-ERR-CCTT-011], giữ nguyên trạng thái hồ sơ "Chờ ký" và giữ popup để Lãnh đạo ký lại.<br>+ **Ký thành công**: Hệ thống thực hiện xử lý sau ký (mô tả bên dưới), hiển thị [MSG-SUC-CCTT-007], đóng popup và tải lại [MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](#mh01).<br>**b. Ký đồng thời nhiều hồ sơ**:<br>+ Lãnh đạo chỉ xác thực ký số 01 lần cho toàn bộ danh sách.<br>+ Hệ thống ký lần lượt từng file PDF theo thứ tự trong Danh sách hồ sơ ký số; cột Trạng thái ký số của từng dòng cập nhật lần lượt "Đang ký" → "Ký thành công"/"Ký lỗi". Hồ sơ ký lỗi không làm dừng việc ký các hồ sơ còn lại.<br>+ Hồ sơ ký thành công: hệ thống thực hiện xử lý sau ký (mô tả bên dưới).<br>+ Hồ sơ ký lỗi: giữ nguyên trạng thái "Chờ ký".<br>+ Khi ký xong toàn bộ danh sách: Nếu tất cả hồ sơ ký thành công, hệ thống hiển thị [MSG-SUC-CCTT-007], đóng popup và tải lại [MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](#mh01). Nếu có hồ sơ ký lỗi, hệ thống hiển thị [MSG-WRN-CCTT-002] kèm số hồ sơ ký thành công/tổng số hồ sơ, giữ popup để Lãnh đạo xem Trạng thái ký số của từng hồ sơ và bấm Ký số lại; khi ký lại, hệ thống chỉ ký các hồ sơ có Trạng thái ký số là "Ký lỗi".<br>**Xử lý sau ký đối với từng hồ sơ ký thành công**:<br>+ Lưu file PDF đã ký, thông tin chứng thư số, Hình thức ký số, người ký (Lãnh đạo đang đăng nhập), thời điểm ký, phiên bản file đã ký.<br>+ Chuyển hồ sơ sang trạng thái "Hoàn thành".<br>+ Đồng bộ trạng thái và file PDF đã ký sang Website Khách hàng để Khách hàng xem/tải kết quả cung cấp thông tin.<br>+ Ghi lịch sử xử lý và Audit log. |

---

<a id="mh04"></a>
#### 4.3.2.7.5. MH04 - Popup Từ chối yêu cầu cung cấp thông tin

##### 4.3.2.7.5.1. Màn hình

![Popup Từ chối yêu cầu cung cấp thông tin](images/UC_CCTT_LD_MH06_Popup_tu_choi_tra_lai_ho_so_giay_CCTT.png)

##### 4.3.2.7.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số đơn giấy | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Tiêu chí yêu cầu | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Dữ liệu tra cứu | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ đã trình ký hồ sơ. |
| Lý do từ chối | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối hồ sơ...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.7.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 2 | Xác nhận | Nút | - **TH1 (Bỏ trống Lý do từ chối)**: Quy định Lý do từ chối là bắt buộc. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập và focus con trỏ vào ô nhập. Không thực hiện từ chối.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có Nguồn tiếp nhận là "Trực tiếp")**: Quy định chỉ được từ chối hồ sơ có Nguồn tiếp nhận là "Trực tiếp" đang ở trạng thái "Chờ ký". Hệ thống hiển thị [MSG-ERR-CCTT-013], không thực hiện từ chối.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-CCTT-001]. Sau khi Lãnh đạo xác nhận, hệ thống thực hiện:<br>+ Lưu người từ chối, thời điểm từ chối, lý do từ chối, file PDF chờ ký và kết quả tra cứu tại thời điểm từ chối.<br>+ Chuyển hồ sơ sang trạng thái "Bị từ chối".<br>+ Tạo khoản hoàn phí/thông báo kế toán tại [Quản lý thu phí/hoàn phí hồ sơ giấy - Module Biện pháp bảo đảm (Website Quản trị)](Quan_ly_thu_phi_ho_so_giay_Can_bo_ke_toan.md) đối với hồ sơ đã thu phí.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-CCTT-006], đóng popup và tải lại [MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](#mh01). |

---

<a id="mh05"></a>
#### 4.3.2.7.6. MH05 - Popup Trả lại yêu cầu cung cấp thông tin

##### 4.3.2.7.6.1. Màn hình

![Popup Trả lại yêu cầu cung cấp thông tin](images/UC_CCTT_LD_MH06_Popup_tu_choi_tra_lai_ho_so_giay_CCTT.png)

##### 4.3.2.7.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ | String(50) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số đơn giấy | String(50) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | Không | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Tiêu chí yêu cầu | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Dữ liệu tra cứu | Text(1000) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cán bộ xử lý | String(255) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ đã trình ký hồ sơ. |
| Lý do trả lại | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do trả lại hồ sơ...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.7.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 2 | Xác nhận | Nút | - **TH1 (Bỏ trống Lý do trả lại)**: Quy định Lý do trả lại là bắt buộc. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập và focus con trỏ vào ô nhập. Không thực hiện trả lại.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có Nguồn tiếp nhận là "Trực tiếp")**: Quy định chỉ được trả lại hồ sơ có Nguồn tiếp nhận là "Trực tiếp" đang ở trạng thái "Chờ ký". Hệ thống hiển thị [MSG-ERR-CCTT-013], không thực hiện trả lại.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-CCTT-003]. Sau khi Lãnh đạo xác nhận, hệ thống thực hiện:<br>+ Lưu người trả lại, thời điểm trả lại, lý do trả lại và phiên bản dữ liệu/file PDF bị trả lại vào lịch sử trả lại của hồ sơ. Lịch sử này được giữ lại và hiển thị tại Khối Thông tin trả lại khi hồ sơ được Cán bộ cập nhật, trình ký lại.<br>+ Chuyển hồ sơ sang trạng thái "Bị trả lại".<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-CCTT-009], đóng popup và tải lại [MH01 - Màn hình Danh sách yêu cầu cung cấp thông tin chờ ký](#mh01). |
