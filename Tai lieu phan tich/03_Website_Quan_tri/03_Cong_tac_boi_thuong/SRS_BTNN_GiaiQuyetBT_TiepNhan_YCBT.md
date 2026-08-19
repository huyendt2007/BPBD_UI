### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.0. UC - Tiếp nhận yêu cầu bồi thường

##### 4.3.3.0.1. Mục đích

\- Cho phép Cán bộ tiếp nhận tra cứu, quản lý danh sách các yêu cầu bồi thường đã tiếp nhận và ghi nhận thông tin tổng quan ban đầu của yêu cầu bồi thường nhà nước trước khi chuyển sang bước nhập liệu hồ sơ vụ việc chi tiết.

\- Cho phép nhập thông tin chung của vụ việc, thông tin người yêu cầu và danh sách tài liệu đính kèm liên quan.

\- Sau khi tiếp nhận thành công, hệ thống tự động sinh `Mã vụ việc`, ghi nhận `Thời điểm tiếp nhận` và chuyển vụ việc sang trạng thái `Chờ nhập liệu`.

*a. Phân quyền*

\- Cán bộ tiếp nhận: Được tra cứu danh sách yêu cầu bồi thường đã tiếp nhận, tạo mới yêu cầu bồi thường, nhập thông tin tiếp nhận ban đầu, đính kèm tài liệu, lưu thông tin tiếp nhận, sửa hoặc xóa vụ việc do mình tiếp nhận khi vụ việc còn ở trạng thái `Chờ nhập liệu`.

\- Cán bộ nhập liệu/Cán bộ xử lý: Được tra cứu vụ việc đã tiếp nhận ở trạng thái `Chờ nhập liệu` tại module Giải quyết yêu cầu bồi thường để thực hiện nhập liệu hồ sơ vụ việc.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập Website quản trị và được phân quyền truy cập chức năng Tiếp nhận yêu cầu bồi thường.

\- Danh mục `Hình thức tiếp nhận hồ sơ` tham chiếu [DM_25].

\- Danh mục `Lĩnh vực phát sinh thiệt hại` tham chiếu [DM_22].

\- Trạng thái vụ việc/hồ sơ bồi thường tham chiếu [DM_24].

---

##### 4.3.3.0.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    Z[Danh sách quản lý các Yêu cầu bồi thường] --> Z1[Tìm kiếm / Xóa bộ lọc / Phân trang]
    Z --> A[Tiếp nhận mới]
    Z --> Z2[Click dòng dữ liệu]
    Z2 -->|"Chờ nhập liệu" - do mình tiếp nhận| A
    Z2 -->|Trạng thái khác| Z3[Mở chi tiết tại module Giải quyết yêu cầu bồi thường]
    Z --> Z4[Xóa vụ việc - chỉ "Chờ nhập liệu" do mình tiếp nhận]
    A --> B[Nhập thông tin tổng quan vụ việc]
    B --> C[Nhập thông tin người yêu cầu]
    C --> D[Đính kèm tài liệu liên quan]
    D --> E{Bấm Lưu thông tin}
    E -->|Thiếu dữ liệu bắt buộc| F[Hiển thị lỗi kiểm tra dữ liệu]
    F --> B
    E -->|Dữ liệu hợp lệ| G[Hệ thống sinh Mã vụ việc]
    G --> H[Ghi nhận Thời điểm tiếp nhận]
    H --> I[Lưu vụ việc và tài liệu đính kèm]
    I --> J["Trạng thái: Chờ nhập liệu"]
    J --> K[Vụ việc hiển thị tại module Giải quyết yêu cầu bồi thường]
    J --> Z
```

---

##### 4.3.3.0.3. MH01 - Màn hình Danh sách quản lý các Yêu cầu bồi thường

###### 4.3.3.0.3.1. Màn hình

Hình ảnh giao diện sẽ được cập nhật sau khi có mockup màn Danh sách quản lý YCBT riêng.

###### 4.3.3.0.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | - | Chỉ đọc. `DANH SÁCH QUẢN LÝ YÊU CẦU BỒI THƯỜNG`. |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã vụ việc | String(50) | Không | Trống | Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`. |
| Tên vụ việc | String(255) | Không | Trống | Tìm kiếm gần đúng, không phân biệt hoa thường theo `Tên vụ việc`. |
| Họ và tên người yêu cầu | String(100) | Không | Trống | Tìm kiếm gần đúng, không phân biệt hoa thường theo `Họ và tên người yêu cầu`. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Không | `Tất cả` | Tham chiếu danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Tham chiếu danh mục trạng thái vụ việc/hồ sơ bồi thường [DM_24]. |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Lọc theo `Thời điểm tiếp nhận`. Tuân thủ [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Lọc theo `Thời điểm tiếp nhận`. Tuân thủ [BR-VAL-007]. |
| Tìm kiếm | - | Không | Hiển thị | Chi tiết nghiệp vụ xem tại bảng Chức năng trên màn hình. |
| Xóa bộ lọc | - | Không | Hiển thị | Chi tiết nghiệp vụ xem tại bảng Chức năng trên màn hình. |
| Tiếp nhận mới | - | Không | Hiển thị | Nằm phía trên bên phải bảng danh sách. Chi tiết nghiệp vụ xem tại bảng Chức năng trên màn hình. |
| **II. Bảng danh sách vụ việc** | | | | |
| Bảng danh sách vụ việc | Text(1000) | Không | 20 bản ghi/trang | Chỉ hiển thị vụ việc thuộc phạm vi xử lý của người dùng đăng nhập. Sắp xếp mặc định theo `Thời điểm tiếp nhận` giảm dần. |
| STT | Integer(10) | Không | Tự tăng | Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Chỉ đọc. Hiển thị đậm, ví dụ `VVBT-2026-xxx`. |
| Tên vụ việc | String(255) | Có | Theo dữ liệu | Chỉ đọc. Nếu chưa nhập hiển thị `(Chưa nhập)`. |
| Họ và tên người yêu cầu | String(100) | Có | Theo dữ liệu | Chỉ đọc. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Có | Theo dữ liệu | Chỉ đọc. Tham chiếu [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Theo dữ liệu | Chỉ đọc. Tham chiếu [DM_22]; trên lưới bỏ tiền tố `TRONG HOẠT ĐỘNG`. |
| Thời điểm tiếp nhận | DateTime | Có | Theo dữ liệu | Chỉ đọc. Định dạng `dd/mm/yyyy HH:mm`. |
| Cán bộ tiếp nhận | String(255) | Không | Theo dữ liệu | Chỉ đọc. Người đã tiếp nhận vụ việc. |
| Trạng thái | Enum(String(50)) | Có | Theo dữ liệu | Hiển thị badge theo danh mục trạng thái [DM_24]. |
| Thao tác | String(255) | Không | Theo quyền/trạng thái | Gồm icon `Sửa`, `Xóa`. Chi tiết điều kiện hiển thị/khả dụng xem tại bảng Chức năng trên màn hình. |
| Số dòng hiển thị | Enum(String(50)) | Không | `20` | Giá trị gồm:<br>- `20`<br>- `30`<br>- `50` |
| Phân trang | String(255) | - | Trang 1 | Gồm nút `<<`, `<`, số trang, `>`, `>>`. |

###### 4.3.3.0.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | TH1 (Khoảng ngày không hợp lệ): Vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007], không thực hiện tìm kiếm. |
|  |  |  | TH Hợp lệ: Hệ thống lọc danh sách theo `Mã vụ việc`, `Tên vụ việc`, `Họ và tên người yêu cầu`, `Hình thức tiếp nhận hồ sơ`, `Lĩnh vực phát sinh thiệt hại`, `Trạng thái`, `Từ ngày`, `Đến ngày` đang nhập/chọn (các tiêu chí kết hợp theo AND), hiển thị kết quả lên bảng và đưa về trang 1. Nếu không có dữ liệu phù hợp, hiển thị trạng thái rỗng theo chuẩn danh sách. |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa `Mã vụ việc`, `Tên vụ việc`, `Họ và tên người yêu cầu`, đưa `Hình thức tiếp nhận hồ sơ`/`Lĩnh vực phát sinh thiệt hại`/`Trạng thái` về `Tất cả`, đặt lại `Từ ngày` = ngày 01 của tháng hiện tại và `Đến ngày` = ngày hiện tại, tải lại danh sách theo trang 1. |
| 3 | Tiếp nhận mới | Button | Hệ thống mở **4.3.3.0.4. MH02 - Màn hình Tiếp nhận YCBT** ở trạng thái rỗng để nhập mới. |
| 4 | Click dòng dữ liệu | Row click | TH1 (Vụ việc ở trạng thái `Chờ nhập liệu` và do người dùng hiện tại tiếp nhận): Hệ thống mở **4.3.3.0.4. MH02** và tự động điền dữ liệu của vụ việc đó. |
|  |  |  | TH2 (Vụ việc ở trạng thái khác `Chờ nhập liệu`): Hệ thống mở chi tiết vụ việc tại module Giải quyết yêu cầu bồi thường theo `Mã vụ việc`. |
|  |  |  | TH3 (Click vào icon thao tác trong cột `Thao tác`): Không thực hiện row click; thực hiện đúng chức năng của icon được click. |
| 5 | Sửa | Icon button | Hiển thị và khả dụng khi vụ việc ở trạng thái `Chờ nhập liệu` và do người dùng hiện tại tiếp nhận; khi đó hành vi giống TH1 của chức năng `Click dòng dữ liệu`. Các trường hợp còn lại icon hiển thị dạng mờ, không cho click. |
| 6 | Xóa | Icon button | TH1 (Vụ việc ở trạng thái `Chờ nhập liệu` và do người dùng hiện tại tiếp nhận): Hệ thống mở popup xác nhận [MSG-CFM-SYS-001] (`"Bạn có chắc chắn muốn xóa bản ghi [Tên vụ việc] không?"`). |
|  |  |  | TH2 (Người dùng chọn `Đồng ý` trên popup xác nhận): Hệ thống thực hiện **xóa mềm** (cập nhật cờ/trạng thái đã xóa trong CSDL, không xóa vật lý bản ghi) để lưu vết phục vụ audit log và thanh tra; bản ghi không còn hiển thị trên danh sách quản lý và hiển thị thông báo thành công [MSG-SUC-BTNN-TN-001]. |
|  |  |  | TH3 (Người dùng chọn `Hủy bỏ` trên popup xác nhận): Hệ thống đóng popup, không xóa vụ việc. |
|  |  |  | TH4 (Vụ việc không đủ điều kiện xóa): Icon hiển thị dạng mờ, không cho click. |
| 7 | Số dòng hiển thị | Dropdown | Khi người dùng chọn `20`, `30` hoặc `50`, hệ thống cập nhật số bản ghi hiển thị trên mỗi trang và render lại bảng danh sách. |
| 8 | Phân trang | Pagination | Cho phép chuyển về trang đầu `<<`, trang trước `<`, chọn số trang, trang sau `>`, trang cuối `>>`. Nút phân trang không khả dụng khi không còn trang tương ứng. |

---

##### 4.3.3.0.4. MH02 - Màn hình Tiếp nhận YCBT

###### 4.3.3.0.4.1. Màn hình

Hình ảnh giao diện sẽ được cập nhật sau khi có mockup màn Tiếp nhận YCBT riêng.

###### 4.3.3.0.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | Theo ngữ cảnh | Chỉ đọc. Khi thêm mới hiển thị `TIẾP NHẬN YÊU CẦU BỒI THƯỜNG`; khi mở từ danh sách để chỉnh sửa vụ việc `Chờ nhập liệu` hiển thị `CHỈNH SỬA THÔNG TIN TIẾP NHẬN`. |
| Mã vụ việc | String(50) | - | Tự sinh | Chỉ đọc. **Không hiển thị khi thêm mới** (vì mã vụ việc chỉ được sinh sau khi lưu thành công). Chỉ hiển thị khi mở lại vụ việc đã tồn tại (chỉnh sửa/xem chi tiết `Chờ nhập liệu`), hiển thị đúng mã vụ việc đã sinh, ví dụ `VVBT-2026-xxx`. |
| Thời điểm tiếp nhận | DateTime | - | Tự sinh | Chỉ đọc. **Không hiển thị khi thêm mới** (vì thời điểm tiếp nhận chỉ được ghi nhận sau khi lưu thành công). Chỉ hiển thị khi mở lại vụ việc đã tồn tại, theo thời điểm người dùng đã bấm `Lưu thông tin` lần đầu. Định dạng hiển thị `dd/mm/yyyy HH:mm`. |
| Tên vụ việc | String(255) | Có | Trống | Nhập tên/tóm tắt vụ việc để phục vụ tra cứu và nhận diện nhanh. Áp dụng [BR-VAL-001]. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Có | `Trực tiếp` | Tham chiếu danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Trống | Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Họ và tên người yêu cầu | String(100) | Có | Trống | Nhập họ tên cá nhân/người đại diện/tổ chức yêu cầu bồi thường. Áp dụng [BR-VAL-001]. |
| Tỉnh/TP | Enum(String(100)) | Có | Trống | Chọn tỉnh/thành phố của người yêu cầu hoặc địa bàn phát sinh vụ việc. Tham chiếu [DM_13]. |
| Địa chỉ chi tiết | Text(1000) | Có | Trống | Nhập địa chỉ chi tiết của người yêu cầu/vụ việc. Áp dụng [BR-VAL-001]. |
| Bảng tài liệu đính kèm | List(Object) | Không | Trống | Cho phép nhập nhiều tài liệu liên quan đến bước tiếp nhận. Mỗi dòng gồm tên tài liệu và file đính kèm. |
| STT | Integer(10) | - | Tự tăng | Căn giữa, tăng theo số dòng tài liệu. |
| Tên tài liệu | String(255) | Có khi thêm dòng | Trống | Người dùng nhập tên tài liệu. Áp dụng [BR-VAL-001] khi dòng tài liệu có file hoặc được lưu. |
| File đính kèm | File | Không | Trống | Cho phép chọn file tài liệu liên quan. Áp dụng quy tắc file dùng chung [BR-FILE-010]. |
| Thao tác tài liệu | String(255) | - | Theo dòng | Gồm `Thêm dòng`, `Tải lên`, `Xem file`, `Xóa`. |

###### 4.3.3.0.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng màn hình tiếp nhận và quay về **4.3.3.0.3. MH01 - Màn hình Danh sách quản lý các Yêu cầu bồi thường**. |
| 2 | Thêm dòng tài liệu | Button/Icon | Hệ thống thêm một dòng tài liệu mới để người dùng nhập `Tên tài liệu` và chọn file đính kèm. |
| 3 | Tải lên | Button/Icon | Hệ thống mở trình chọn file cho dòng tài liệu tương ứng. |
| 4 | Xem file | Link | Cho phép xem file đã tải lên tại một tab riêng. |
| 5 | Xóa | Link/Icon | Hệ thống mở popup xác nhận. Nếu người dùng xác nhận, hệ thống gỡ dòng tài liệu hoặc file đính kèm khỏi form. |
| 6 | Lưu thông tin | Button | TH1 (Bỏ trống trường bắt buộc): Hệ thống áp dụng [BR-VAL-001], tô viền đỏ trường lỗi và không cho lưu. |
|  |  |  | TH2 (Thêm mới, dữ liệu hợp lệ): Hệ thống tự động sinh `Mã vụ việc`, ghi nhận `Thời điểm tiếp nhận`, lưu thông tin tổng quan và tài liệu đính kèm, tạo timeline tiếp nhận ban đầu, chuyển vụ việc sang trạng thái `Chờ nhập liệu`, hiển thị thông báo thành công và quay về **4.3.3.0.3. MH01**. |
|  |  |  | TH3 (Chỉnh sửa, dữ liệu hợp lệ): Hệ thống cập nhật thông tin tổng quan và tài liệu đính kèm của vụ việc hiện tại, giữ nguyên `Mã vụ việc`/`Thời điểm tiếp nhận`/trạng thái `Chờ nhập liệu`, ghi nhận vào timeline, hiển thị thông báo thành công và quay về **4.3.3.0.3. MH01**. |

---

##### 4.3.3.0.5. Dữ liệu đầu ra sau tiếp nhận

| Thông tin đầu ra | Mô tả |
| :--- | :--- |
| Mã vụ việc | Mã định danh vụ việc bồi thường do hệ thống tự sinh. |
| Thời điểm tiếp nhận | Thời điểm ghi nhận tiếp nhận yêu cầu bồi thường. |
| Trạng thái vụ việc | `Chờ nhập liệu`. |
| Thông tin tổng quan | Gồm tên vụ việc, hình thức tiếp nhận hồ sơ, lĩnh vực phát sinh thiệt hại, họ tên người yêu cầu, Tỉnh/TP và địa chỉ chi tiết. |
| Tài liệu tiếp nhận | Danh sách tài liệu đã nhập tên và đính kèm file ở bước tiếp nhận. |
| Liên kết xử lý tiếp theo | Vụ việc được hiển thị tại module Giải quyết yêu cầu bồi thường để cán bộ thực hiện `Nhập liệu hồ sơ vụ việc`. |

---

##### 4.3.3.0.6. Quy tắc trạng thái

| Trạng thái | Điều kiện phát sinh | Thao tác tiếp theo |
| :--- | :--- | :--- |
| `Chờ nhập liệu` | Phát sinh sau khi người dùng bấm `Lưu thông tin` và dữ liệu hợp lệ. | Cán bộ nhập liệu mở module Giải quyết yêu cầu bồi thường, chọn vụ việc và thực hiện `Nhập liệu hồ sơ vụ việc`. |
