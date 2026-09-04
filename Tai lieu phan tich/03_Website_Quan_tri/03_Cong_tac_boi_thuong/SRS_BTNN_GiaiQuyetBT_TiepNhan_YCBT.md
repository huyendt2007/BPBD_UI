### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.1. Tiếp nhận yêu cầu

##### 4.3.3.1.1. Mục đích
Quản lý tập trung quy trình tiếp nhận ban đầu các yêu cầu bồi thường nhà nước và yêu cầu xác định cơ quan giải quyết bồi thường, bao gồm:
- Tra cứu và quản lý danh sách các yêu cầu đã tiếp nhận theo phân trang, hỗ trợ tìm kiếm và lọc đa tiêu chí theo mã vụ việc, tên vụ việc, loại yêu cầu, người yêu cầu, hình thức tiếp nhận, lĩnh vực phát sinh, trạng thái và khoảng thời gian tiếp nhận.
- Tiếp nhận mới yêu cầu: Ghi nhận thông tin tổng quan vụ việc (loại yêu cầu, tên vụ việc, hình thức tiếp nhận hồ sơ, lĩnh vực phát sinh thiệt hại, họ tên và địa chỉ người yêu cầu) và đính kèm các tài liệu/hồ sơ ban đầu.
- Tự động điều hướng và liên thông sau tiếp nhận: Khởi tạo hồ sơ tại phân hệ **Xác định cơ quan giải quyết bồi thường** hoặc phân hệ **Giải quyết yêu cầu bồi thường** ở trạng thái `Chờ tiếp nhận`.
- Chỉnh sửa thông tin tiếp nhận hoặc xóa bản ghi do chính người dùng tiếp nhận khi hồ sơ còn ở trạng thái `Chờ tiếp nhận`.

a. Phân quyền
Hệ thống phân quyền thao tác theo các quyền nghiệp vụ được cấp:
- **Xem**: Tra cứu danh sách yêu cầu tiếp nhận, xem chi tiết vụ việc, xem tài liệu đính kèm.
- **Tạo mới**: Tiếp nhận yêu cầu mới, nhập thông tin tiếp nhận ban đầu và đính kèm tài liệu.
- **Chỉnh sửa**: Cập nhật thông tin tiếp nhận ban đầu khi bản ghi do chính người dùng tiếp nhận và còn ở trạng thái `Chờ tiếp nhận`.
- **Xóa**: Xóa bản ghi tiếp nhận do chính người dùng tiếp nhận khi bản ghi còn ở trạng thái `Chờ tiếp nhận`.

b. Điều kiện thực hiện
- Người dùng đã đăng nhập vào hệ thống thành công (Website quản trị).
- Người dùng được phân quyền truy cập chức năng "Tiếp nhận yêu cầu".

---

##### 4.3.3.1.2. MH01 - Màn hình Danh sách quản lý các Yêu cầu

###### 4.3.3.1.2.1. Màn hình

Hình ảnh giao diện sẽ được cập nhật sau khi có mockup màn Danh sách quản lý yêu cầu riêng.

###### 4.3.3.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `DANH SÁCH QUẢN LÝ YÊU CẦU`. |
| **I. Bộ lọc tìm kiếm** | Section | - | - | Control UI: Filter panel.<br>- Hiển thị phía trên bảng danh sách.<br>- Các tiêu chí có dữ liệu được kết hợp theo điều kiện AND. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`. |
| Tên vụ việc | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Tên vụ việc`. |
| Loại yêu cầu | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Lọc theo loại yêu cầu tiếp nhận.<br>- Giá trị gồm:<br>+ `Xác định cơ quan giải quyết bồi thường`<br>+ `Yêu cầu bồi thường`. |
| Họ và tên người yêu cầu | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Họ và tên người yêu cầu`. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục trạng thái vụ việc/hồ sơ bồi thường [DM_24]. |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Datepicker.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- Tuân thủ [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- Tuân thủ [BR-VAL-007]. |
| **II. Bảng danh sách vụ việc** | Section | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Thời điểm tiếp nhận" giảm dần (mới nhất hiển thị lên đầu).<br>- Chỉ hiển thị vụ việc thuộc phạm vi xử lý của người dùng đăng nhập.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Tự tăng | Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Chỉ đọc. Hiển thị đậm, ví dụ `VVBT-2026-xxx`. |
| Tên vụ việc | String(255) | Có | Theo dữ liệu | Chỉ đọc. Nếu chưa có dữ liệu, để trống. |
| Họ và tên người yêu cầu | String(100) | Có | Theo dữ liệu | Chỉ đọc. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Có | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]; trên lưới bỏ tiền tố `TRONG HOẠT ĐỘNG`. |
| Loại yêu cầu | Enum(String(100)) | Có | Theo dữ liệu | Control UI: Text hiển thị (Read-only).<br>- Hiển thị loại yêu cầu đã chọn ở bước tiếp nhận.<br>- Giá trị gồm:<br>+ `Xác định cơ quan giải quyết bồi thường`<br>+ `Yêu cầu bồi thường`. |
| Thời điểm tiếp nhận | DateTime | Có | Theo dữ liệu | Chỉ đọc. Định dạng `dd/mm/yyyy HH:mm`. |
| Cán bộ tiếp nhận | String(255) | Không | Theo dữ liệu | Chỉ đọc. Người đã tiếp nhận vụ việc. |
| Trạng thái | Enum(String(50)) | Có | Theo dữ liệu | Hiển thị badge theo danh mục trạng thái [DM_24]. |
| Thao tác | String(255) | Không | Theo quyền/trạng thái | Gồm icon `Sửa`, `Xóa`. Chi tiết điều kiện hiển thị/khả dụng xem tại bảng Chức năng trên màn hình. |

###### 4.3.3.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới:<br>- **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn, hiển thị kết quả lên bảng và đưa về Trang 1.<br>- **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled). |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa các điều kiện lọc, tải lại danh sách theo điều kiện mặc định. |
| 3 | Tiếp nhận mới | Button | Nút nằm phía trên bên phải bảng danh sách. Khi người dùng click nút, hệ thống mở **MH02 - Tiếp nhận yêu cầu** ở trạng thái rỗng để nhập mới. |
| 4 | Click dòng dữ liệu | Row click | Khi người dùng click vào dòng dữ liệu, hệ thống xử lý theo các trường hợp bên dưới:<br>- **TH1 - Bản ghi ở trạng thái `Chờ tiếp nhận` và do người dùng hiện tại tiếp nhận**: Hệ thống mở **MH02 - Tiếp nhận yêu cầu** và tự động điền dữ liệu của bản ghi đó.<br>- **TH2 - Bản ghi ở trạng thái khác `Chờ tiếp nhận`**: Hệ thống mở chi tiết hồ sơ/yêu cầu tại phân hệ xử lý tương ứng theo `Mã vụ việc`/`Mã yêu cầu`.<br>- **TH3 (Click vào icon thao tác trong cột `Thao tác`)**: Không thực hiện row click; thực hiện đúng chức năng của icon được click. |
| 5 | Sửa | Icon button | Hiển thị và khả dụng khi bản ghi ở trạng thái `Chờ tiếp nhận` và do người dùng hiện tại tiếp nhận; khi đó hành vi giống TH1 của chức năng `Click dòng dữ liệu`. Các trường hợp còn lại icon hiển thị dạng mờ, không cho click. |
| 6 | Xóa | Icon button | Khi người dùng click icon Xóa, hệ thống xử lý theo các trường hợp bên dưới:<br>- **TH1 - Mở popup xác nhận**: Hệ thống hiển thị Custom Confirmation Modal xác nhận xóa [MSG-CFM-SYS-001] với nội dung: *"Bạn có chắc chắn muốn xóa bản ghi [Tên vụ việc] không?"*.<br>- **TH2 - Người dùng chọn "Đồng ý"**: Hệ thống thực hiện **xóa mềm** (cập nhật cờ/trạng thái đã xóa trong CSDL, không xóa vật lý bản ghi) để lưu vết phục vụ audit log và thanh tra; bản ghi không còn hiển thị trên danh sách quản lý và hiển thị thông báo thành công [MSG-SUC-BTNN-TN-001].<br>- **TH3 - Người dùng chọn "Hủy bỏ"**: Hệ thống đóng popup xác nhận, không xóa vụ việc. |

---

##### 4.3.3.1.3. MH02 - Màn hình Tiếp nhận yêu cầu

###### 4.3.3.1.3.1. Màn hình

Hình ảnh giao diện sẽ được cập nhật sau khi có mockup màn Tiếp nhận yêu cầu riêng.

###### 4.3.3.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | Theo ngữ cảnh | Control UI: Text heading (Read-only).<br>- Khi thêm mới hiển thị `TIẾP NHẬN YÊU CẦU`.<br>- Khi mở từ danh sách để chỉnh sửa bản ghi `Chờ tiếp nhận`, hiển thị `CHỈNH SỬA THÔNG TIN TIẾP NHẬN`. |
| Mã vụ việc | String(50) | - | Tự sinh | Chỉ đọc. **Không hiển thị khi thêm mới** (vì mã vụ việc/mã yêu cầu chỉ được sinh sau khi lưu thành công). Chỉ hiển thị khi mở lại bản ghi đã tồn tại (chỉnh sửa/xem chi tiết `Chờ tiếp nhận`), hiển thị đúng mã đã sinh, ví dụ `VVBT-2026-xxx`. |
| Thời điểm tiếp nhận | DateTime | - | Tự sinh | Chỉ đọc. **Không hiển thị khi thêm mới** (vì thời điểm tiếp nhận chỉ được ghi nhận sau khi lưu thành công). Chỉ hiển thị khi mở lại vụ việc đã tồn tại, theo thời điểm người dùng đã bấm `Lưu thông tin` lần đầu. Định dạng hiển thị `dd/mm/yyyy HH:mm`. |
| Loại yêu cầu | Enum(String(100)) | Có | `Yêu cầu bồi thường` | Control UI: Combobox.<br>- Chọn loại yêu cầu cần tiếp nhận để hệ thống điều hướng liên thông sang phân hệ xử lý tương ứng sau khi lưu.<br>- Giá trị gồm:<br>+ `Xác định cơ quan giải quyết bồi thường`<br>+ `Yêu cầu bồi thường`.<br>- Áp dụng [BR-VAL-001]. |
| Tên vụ việc | String(255) | Có | Trống | Control UI: Input text.<br>- Nhập tên/tóm tắt vụ việc để phục vụ tra cứu và nhận diện nhanh.<br>- Áp dụng [BR-VAL-001]. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Có | `Trực tiếp` | Control UI: Combobox.<br>- Tham chiếu danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Họ và tên người yêu cầu | String(100) | Có | Trống | Control UI: Input text.<br>- Nhập họ tên cá nhân/người đại diện/tổ chức yêu cầu bồi thường.<br>- Áp dụng [BR-VAL-001]. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Có | Trống | Control UI: Textarea / Input text.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp...<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Bảng tài liệu đính kèm | List(Object) | Không | Trống | Cho phép nhập nhiều tài liệu liên quan đến bước tiếp nhận. Mỗi dòng gồm tên tài liệu và file đính kèm. |
| STT | Integer(10) | - | Tự tăng | Căn giữa, tăng theo số dòng tài liệu. |
| Tên tài liệu | String(255) | Có khi thêm dòng | Trống | Người dùng nhập tên tài liệu. Áp dụng [BR-VAL-001] khi dòng tài liệu có file hoặc được lưu. |
| File đính kèm | File | Không | Trống | Cho phép chọn file tài liệu liên quan. Áp dụng quy tắc file dùng chung [BR-FILE-010]. |
| Thao tác tài liệu | String(255) | - | Theo dòng | Gồm `Thêm dòng`, `Tải lên`, `Xem file`, `Xóa`. |

###### 4.3.3.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng màn hình tiếp nhận và quay về **MH01 - Danh sách quản lý các Yêu cầu**. |
| 2 | Thêm dòng tài liệu | Button/Icon | Hệ thống thêm một dòng tài liệu mới để người dùng nhập `Tên tài liệu` và chọn file đính kèm. |
| 3 | Tải lên | Button/Icon | Khi người dùng chọn tệp tin tải lên cho dòng tài liệu, hệ thống kiểm tra và xử lý theo các trường hợp bên dưới:<br>- **TH1 - File sai định dạng**: Nếu tệp tin không đúng định dạng cho phép theo [BR-FILE-010] (cho phép: `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`), hệ thống hiển thị cảnh báo lỗi [MSG-ERR-FILE-001] và không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng**: Nếu dung lượng tệp tin vượt quá dung lượng tối đa cho phép theo [BR-FILE-010] (tối đa 20MB/file), hệ thống hiển thị cảnh báo lỗi [MSG-ERR-FILE-002] và không tiếp nhận tệp.<br>- **TH3 - Hợp lệ**: Hệ thống tải tệp tin lên thành công, hiển thị tên tệp tin kèm liên kết "Xem file" (mở tab mới) và nút "Xóa" ngay cạnh tên tệp tin. |
| 4 | Xem file | Link | Mở xem nội dung tệp tin đã tải lên tại tab trình duyệt mới. |
| 5 | Xóa | Link/Icon | Mở Custom Confirmation Modal xác nhận gỡ bỏ tệp tin/dòng tài liệu đã tải lên với nội dung [MSG-CFM-SYS-001] (*"Bạn có chắc chắn muốn xóa tài liệu này không?"*):<br>- Khi người dùng chọn "Đồng ý": Hệ thống gỡ dòng tài liệu hoặc tệp tin đính kèm khỏi biểu mẫu.<br>- Khi người dùng chọn "Hủy bỏ": Đóng popup xác nhận và giữ nguyên tài liệu. |
| 6 | Lưu thông tin | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới:<br>- **TH1 - Bỏ trống trường bắt buộc**: Nếu bỏ trống một trong các trường bắt buộc đang hiển thị, vi phạm [BR-VAL-001], hệ thống tô viền đỏ trường lỗi đầu tiên, hiển thị [MSG-ERR-VAL-001] và không cho lưu.<br>- **TH2 - Thêm mới, Loại yêu cầu = `Xác định cơ quan giải quyết bồi thường`**: Hệ thống tự động sinh mã yêu cầu, ghi nhận `Thời điểm tiếp nhận`, lưu thông tin tổng quan và tài liệu đính kèm, tạo timeline tiếp nhận ban đầu, tạo hồ sơ tại phân hệ **Xác định cơ quan giải quyết bồi thường** ở trạng thái `Chờ tiếp nhận`, hiển thị thông báo thành công và quay về **MH01 - Danh sách quản lý các Yêu cầu**.<br>- **TH3 - Thêm mới, Loại yêu cầu = `Yêu cầu bồi thường`**: Hệ thống tự động sinh `Mã vụ việc`, ghi nhận `Thời điểm tiếp nhận`, lưu thông tin tổng quan và tài liệu đính kèm, tạo timeline tiếp nhận ban đầu, tạo hồ sơ tại phân hệ **Giải quyết yêu cầu bồi thường** ở trạng thái `Chờ tiếp nhận`, hiển thị thông báo thành công và quay về **MH01 - Danh sách quản lý các Yêu cầu**.<br>- **TH4 - Chỉnh sửa, dữ liệu hợp lệ**: Hệ thống ghi nhận thông tin cập nhật, giữ nguyên trạng thái `Chờ tiếp nhận`, hiển thị thông báo thành công và quay về **MH01 - Danh sách quản lý các Yêu cầu**. |

---
