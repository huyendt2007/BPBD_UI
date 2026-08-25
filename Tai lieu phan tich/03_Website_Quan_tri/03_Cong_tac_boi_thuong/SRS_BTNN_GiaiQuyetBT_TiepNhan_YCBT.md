### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.0. UC - Tiếp nhận yêu cầu

##### 4.3.3.0.1. Mục đích

\- Cho phép Cán bộ tiếp nhận tra cứu, quản lý danh sách các yêu cầu đã tiếp nhận và ghi nhận thông tin tổng quan ban đầu trước khi chuyển sang phân hệ xử lý nghiệp vụ tương ứng.

\- Cho phép nhập thông tin chung của vụ việc, thông tin người yêu cầu và danh sách tài liệu đính kèm liên quan.

\- Sau khi tiếp nhận thành công, hệ thống tự động sinh mã hồ sơ/yêu cầu, ghi nhận `Thời điểm tiếp nhận` và tạo bản ghi ở trạng thái `Chờ tiếp nhận` tại phân hệ xử lý tương ứng theo `Loại yêu cầu`.

*a. Phân quyền*

\- Cán bộ tiếp nhận: Được tra cứu danh sách yêu cầu đã tiếp nhận, tạo mới yêu cầu, nhập thông tin tiếp nhận ban đầu, đính kèm tài liệu, lưu thông tin tiếp nhận, sửa hoặc xóa bản ghi do mình tiếp nhận khi bản ghi còn ở trạng thái `Chờ tiếp nhận`.

\- Cán bộ xử lý: Được tra cứu hồ sơ/yêu cầu đã tiếp nhận ở trạng thái `Chờ tiếp nhận` tại phân hệ Xác định cơ quan giải quyết bồi thường hoặc Giải quyết yêu cầu bồi thường để thực hiện bước tiếp nhận nghiệp vụ tiếp theo.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập Website quản trị và được phân quyền truy cập chức năng Tiếp nhận yêu cầu.

---

##### 4.3.3.0.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    Z[Danh sách quản lý các Yêu cầu] --> Z1[Tìm kiếm / Xóa bộ lọc / Phân trang]
    Z --> A[Tiếp nhận mới]
    Z --> Z2[Click dòng dữ liệu]
    Z2 -->|"Chờ tiếp nhận" - do mình tiếp nhận| A
    Z2 -->|Trạng thái khác| Z3[Mở chi tiết tại phân hệ xử lý tương ứng]
    Z --> Z4[Xóa bản ghi - chỉ "Chờ tiếp nhận" do mình tiếp nhận]
    A --> B[Nhập thông tin tổng quan vụ việc]
    B --> C[Nhập thông tin người yêu cầu]
    C --> D[Đính kèm tài liệu liên quan]
    D --> E{Bấm Lưu thông tin}
    E -->|Thiếu dữ liệu bắt buộc| F[Hiển thị lỗi kiểm tra dữ liệu]
    F --> B
    E -->|Dữ liệu hợp lệ| G[Hệ thống sinh mã hồ sơ/yêu cầu]
    G --> H[Ghi nhận Thời điểm tiếp nhận]
    H --> I[Lưu vụ việc và tài liệu đính kèm]
    I --> J{"Loại yêu cầu"}
    J -->|Xác định cơ quan giải quyết bồi thường| K["Tạo hồ sơ Xác định cơ quan - Chờ tiếp nhận"]
    J -->|Yêu cầu bồi thường| L["Tạo hồ sơ Giải quyết YCBT - Chờ tiếp nhận"]
    K --> Z
    L --> Z
```

---

##### 4.3.3.0.3. MH01 - Màn hình Danh sách quản lý các Yêu cầu

###### 4.3.3.0.3.1. Màn hình

Hình ảnh giao diện sẽ được cập nhật sau khi có mockup màn Danh sách quản lý yêu cầu riêng.

###### 4.3.3.0.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `DANH SÁCH QUẢN LÝ YÊU CẦU`. |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Filter panel.<br>- Hiển thị phía trên bảng danh sách.<br>- Các tiêu chí có dữ liệu được kết hợp theo điều kiện AND. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`. |
| Tên vụ việc | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Tên vụ việc`. |
| Loại yêu cầu | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Lọc theo loại yêu cầu tiếp nhận.<br>- Giá trị gồm:<br>+ `Xác định cơ quan giải quyết bồi thường`<br>+ `Yêu cầu bồi thường`. |
| Họ và tên người yêu cầu | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Họ và tên người yêu cầu`. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục trạng thái vụ việc/hồ sơ bồi thường [DM_24]. |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Datepicker.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- Tuân thủ [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- Tuân thủ [BR-VAL-007]. |
| **II. Bảng danh sách vụ việc** | - | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Ngày tạo" giảm dần (mới nhất hiển thị lên đầu).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Bảng danh sách vụ việc | Text(1000) | Không | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Thời điểm tiếp nhận" giảm dần (mới nhất hiển thị lên đầu).<br>- Chỉ hiển thị vụ việc thuộc phạm vi xử lý của người dùng đăng nhập.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
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
| Số dòng hiển thị | Enum(String(50)) | Không | `20` | Control UI: Dropdown.<br>- Cho phép chọn số bản ghi hiển thị trên mỗi trang.<br>- Giá trị gồm:<br>+ `10`<br>+ `20`<br>+ `50`<br>+ `100`. |
| Phân trang | String(255) | - | 20 bản ghi/trang | Control UI: Pagination.<br>- Cho phép chọn cấu hình số lượng bản ghi hiển thị trên mỗi trang gồm: 10, 20, 50, 100 bản ghi/trang; mặc định chọn sẵn 20 bản ghi/trang.<br>- Đầy đủ các nút điều hướng trang: Đầu (&#124;&lt;&lt;), Trước (&lt;), các số trang, Sau (&gt;), Cuối (&gt;&gt;&#124;).<br>- Hiển thị dải bản ghi: "Hiển thị [từ] - [đến] của [tổng số] bản ghi". |

###### 4.3.3.0.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn, hiển thị kết quả lên bảng và đưa về Trang 1. |
|  |  |  | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled); nút "Kết xuất Excel" (nếu có) ở trạng thái khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa `Mã vụ việc`, `Tên vụ việc`, `Họ và tên người yêu cầu`, đưa `Loại yêu cầu`/`Hình thức tiếp nhận hồ sơ`/`Lĩnh vực phát sinh thiệt hại`/`Trạng thái` về `Tất cả`, đặt lại `Từ ngày` = ngày 01 của tháng hiện tại và `Đến ngày` = ngày hiện tại, tải lại danh sách theo trang 1. |
| 3 | Tiếp nhận mới | Button | Nút nằm phía trên bên phải bảng danh sách. Khi người dùng click nút, hệ thống mở **MH02 - Tiếp nhận yêu cầu** ở trạng thái rỗng để nhập mới. |
| 4 | Click dòng dữ liệu | Row click | Khi người dùng click vào dòng dữ liệu, hệ thống xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bản ghi ở trạng thái `Chờ tiếp nhận` và do người dùng hiện tại tiếp nhận**: Hệ thống mở **MH02 - Tiếp nhận yêu cầu** và tự động điền dữ liệu của bản ghi đó. |
|  |  |  | **TH2 - Bản ghi ở trạng thái khác `Chờ tiếp nhận`**: Hệ thống mở chi tiết hồ sơ/yêu cầu tại phân hệ xử lý tương ứng theo `Mã vụ việc`/`Mã yêu cầu`. |
|  |  |  | TH3 (Click vào icon thao tác trong cột `Thao tác`): Không thực hiện row click; thực hiện đúng chức năng của icon được click. |
| 5 | Sửa | Icon button | Hiển thị và khả dụng khi bản ghi ở trạng thái `Chờ tiếp nhận` và do người dùng hiện tại tiếp nhận; khi đó hành vi giống TH1 của chức năng `Click dòng dữ liệu`. Các trường hợp còn lại icon hiển thị dạng mờ, không cho click. |
| 6 | Xóa | Icon button | Khi người dùng click icon, hệ thống xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bản ghi ở trạng thái `Chờ tiếp nhận` và do người dùng hiện tại tiếp nhận**: Hệ thống mở popup xác nhận [MSG-CFM-SYS-001] (`"Bạn có chắc chắn muốn xóa bản ghi [Tên vụ việc] không?"`). |
|  |  |  | TH2 (Người dùng chọn `Đồng ý` trên popup xác nhận): Hệ thống thực hiện **xóa mềm** (cập nhật cờ/trạng thái đã xóa trong CSDL, không xóa vật lý bản ghi) để lưu vết phục vụ audit log và thanh tra; bản ghi không còn hiển thị trên danh sách quản lý và hiển thị thông báo thành công [MSG-SUC-BTNN-TN-001]. |
|  |  |  | TH3 (Người dùng chọn `Hủy bỏ` trên popup xác nhận): Hệ thống đóng popup, không xóa vụ việc. |
|  |  |  | TH4 (Vụ việc không đủ điều kiện xóa): Icon hiển thị dạng mờ, không cho click. |
| 7 | Số dòng hiển thị | Dropdown | Khi người dùng chọn `10`, `20`, `50` hoặc `100`, hệ thống cập nhật số bản ghi hiển thị trên mỗi trang, đưa trang hiện tại về trang 1 và tải lại lưới dữ liệu; mặc định chọn sẵn `20`. |
| 8 | Phân trang | Pagination | Hệ thống chuyển đến trang đầu (&#124;&lt;&lt;), trang trước (&lt;), trang được chọn, trang sau (&gt;) hoặc trang cuối (&gt;&gt;&#124;) theo thao tác người dùng; dữ liệu hiển thị giữ nguyên tiêu chí lọc/sắp xếp hiện hành và cấu hình mặc định 20 bản ghi/trang. |

---

##### 4.3.3.0.4. MH02 - Màn hình Tiếp nhận yêu cầu

###### 4.3.3.0.4.1. Màn hình

Hình ảnh giao diện sẽ được cập nhật sau khi có mockup màn Tiếp nhận yêu cầu riêng.

###### 4.3.3.0.4.2. Mô tả thông tin trên màn hình

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

###### 4.3.3.0.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng màn hình tiếp nhận và quay về **MH01 - Danh sách quản lý các Yêu cầu**. |
| 2 | Thêm dòng tài liệu | Button/Icon | Hệ thống thêm một dòng tài liệu mới để người dùng nhập `Tên tài liệu` và chọn file đính kèm. |
| 3 | Tải lên | Button/Icon | Hệ thống mở trình chọn file cho dòng tài liệu tương ứng. |
| 4 | Xem file | Link | Cho phép xem file đã tải lên tại một tab riêng. |
| 5 | Xóa | Link/Icon | Hệ thống mở popup xác nhận. Nếu người dùng xác nhận, hệ thống gỡ dòng tài liệu hoặc file đính kèm khỏi form. |
| 6 | Lưu thông tin | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Nếu bỏ trống một trong các trường bắt buộc đang hiển thị, vi phạm [BR-VAL-001], hệ thống tô viền đỏ trường lỗi đầu tiên, hiển thị [MSG-ERR-VAL-001] và không cho lưu. |
|  |  |  | **TH2 - Thêm mới, Loại yêu cầu = `Xác định cơ quan giải quyết bồi thường`**: Hệ thống tự động sinh mã yêu cầu, ghi nhận `Thời điểm tiếp nhận`, lưu thông tin tổng quan và tài liệu đính kèm, tạo timeline tiếp nhận ban đầu, tạo hồ sơ tại phân hệ **Xác định cơ quan giải quyết bồi thường** ở trạng thái `Chờ tiếp nhận`, hiển thị thông báo thành công và quay về **MH01 - Danh sách quản lý các Yêu cầu**. |
|  |  |  | **TH3 - Thêm mới, Loại yêu cầu = `Yêu cầu bồi thường`**: Hệ thống tự động sinh `Mã vụ việc`, ghi nhận `Thời điểm tiếp nhận`, lưu thông tin tổng quan và tài liệu đính kèm, tạo timeline tiếp nhận ban đầu, tạo hồ sơ tại phân hệ **Giải quyết yêu cầu bồi thường** ở trạng thái `Chờ tiếp nhận`, hiển thị thông báo thành công và quay về **MH01 - Danh sách quản lý các Yêu cầu**. |
|  |  |  | **TH4 - Chỉnh sửa, dữ liệu hợp lệ**: Hệ thống cập nhật thông tin tổng quan và tài liệu đính kèm của bản ghi hiện tại, giữ nguyên mã đã sinh/`Thời điểm tiếp nhận`/trạng thái `Chờ tiếp nhận`, ghi nhận vào timeline, hiển thị thông báo thành công và quay về **MH01 - Danh sách quản lý các Yêu cầu**. |

---
|
