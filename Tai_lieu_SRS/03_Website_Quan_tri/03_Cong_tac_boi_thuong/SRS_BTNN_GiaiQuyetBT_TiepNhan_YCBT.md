### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.1. Tiếp nhận hồ sơ

##### 4.3.3.1.1. Mục đích
Quản lý tập trung bước tiếp nhận ban đầu và phân công xử lý hồ sơ của 02 Loại hồ sơ: `Xác định cơ quan giải quyết bồi thường` và `Giải quyết yêu cầu bồi thường`, bao gồm:
- Tra cứu danh sách hồ sơ theo mã vụ việc, loại hồ sơ, nguồn hồ sơ, người yêu cầu, hình thức tiếp nhận, lĩnh vực phát sinh thiệt hại, trạng thái và khoảng thời gian tiếp nhận. Hồ sơ được nhận diện bằng `Mã vụ việc` và `Họ và tên người yêu cầu`.
- Tiếp nhận mới hồ sơ: Cán bộ tiếp nhận ghi nhận thông tin tổng quan (loại hồ sơ, hình thức tiếp nhận, lĩnh vực phát sinh thiệt hại), thông tin người yêu cầu, thông tin người bị thiệt hại (khi người yêu cầu không phải là người bị thiệt hại) và đính kèm tài liệu ban đầu.
- Nhận hồ sơ từ các nguồn khác vào danh sách để Lãnh đạo phân công: hồ sơ gửi từ Dịch vụ công quốc gia, hồ sơ do cơ quan khác Chuyển CQGQBT đến, hồ sơ do Bộ Tư pháp / Sở Tư pháp chuyển đến sau khi hoàn thành Xác định cơ quan giải quyết bồi thường.
- Phân công: Lãnh đạo chuyển hồ sơ xuống đơn vị cấp dưới hoặc phân công trực tiếp cán bộ xử lý theo luồng tương ứng với Loại hồ sơ tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md). Khi phân công cán bộ, hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ **Xác định cơ quan giải quyết bồi thường** hoặc phân hệ **Giải quyết yêu cầu bồi thường** theo Loại hồ sơ.
- Danh sách chia 02 tab `Chờ xử lý` / `Đã xử lý` theo thao tác của người dùng đang đăng nhập trên từng hồ sơ. Số hồ sơ chờ phân công của Lãnh đạo hiển thị tại khối `Chờ phân công` của [MH01 - Màn hình Dashboard Lãnh đạo - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-mh01).
- Hồ sơ cũng có thể được tạo trực tiếp tại phân hệ Xác định cơ quan giải quyết bồi thường và phân hệ Giải quyết yêu cầu bồi thường; hồ sơ tạo trực tiếp không đi qua màn hình này.

a. Phân quyền
Hệ thống phân quyền thao tác theo các quyền nghiệp vụ được cấp:
- **Xem**: Tra cứu danh sách hồ sơ, xem chi tiết, tài liệu đính kèm, quá trình phân công và lịch sử xử lý.
- **Tạo mới**: Tiếp nhận mới hồ sơ, nhập thông tin tiếp nhận ban đầu và đính kèm tài liệu.
- **Sửa**: Sửa thông tin tiếp nhận khi đồng thời: hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`, do chính người dùng tiếp nhận, ở trạng thái `Chờ phân công` và chưa có lãnh đạo nào thao tác (chưa có lượt chuyển/phân công). Hồ sơ thuộc các nguồn khác không được Sửa.
- **Xóa**: Cùng điều kiện với quyền Sửa.
- **Phân công** (Lãnh đạo): Chuyển đơn vị hoặc Phân công cán bộ đối với hồ sơ `Chờ phân công` / `Đang phân công` khi Lãnh đạo thuộc Nhóm lãnh đạo của đơn vị đang phân công.
- **Thu hồi** (Lãnh đạo): Thu hồi hồ sơ đã chuyển đơn vị / phân công cán bộ khi bên nhận chưa xử lý.
- **Loại hồ sơ theo đơn vị**: Ô chọn và bộ lọc `Loại hồ sơ` chỉ hiển thị các giá trị của [Danh mục Loại hồ sơ - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_54] có `Đơn vị áp dụng` chứa đơn vị của người dùng (tính cả đơn vị cha: chọn đơn vị cha thì áp dụng cho toàn bộ đơn vị trực thuộc).
  + `Xác định cơ quan giải quyết bồi thường` chỉ áp dụng cho Bộ Tư pháp và các Sở Tư pháp.
  + Ủy ban nhân dân cấp tỉnh không tiếp nhận, không phân công hồ sơ Xác định cơ quan giải quyết bồi thường; chỉ xem hồ sơ của Sở Tư pháp trực thuộc tại phân hệ Xác định cơ quan giải quyết bồi thường.

b. Điều kiện thực hiện
- Người dùng đã đăng nhập vào hệ thống thành công (Website quản trị).
- Người dùng được phân quyền truy cập chức năng "Tiếp nhận hồ sơ".

<a id="tn-nguon-ho-so"></a>
c. Nguồn hồ sơ

| Nguồn hồ sơ | Cách tạo | Loại hồ sơ | Hình thức tiếp nhận | Cán bộ tiếp nhận |
| :--- | :--- | :--- | :--- | :--- |
| `Tiếp nhận mới` | Cán bộ tiếp nhận nhập tại [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) | Cán bộ chọn | Cán bộ chọn `Trực tiếp` hoặc `Dịch vụ bưu chính` | Người tạo hồ sơ |
| `Dịch vụ công quốc gia` | Hệ thống tự tạo khi nhận hồ sơ gửi từ Dịch vụ công quốc gia, đơn vị tiếp nhận là cơ quan giải quyết bồi thường người dân đã chọn | `Giải quyết yêu cầu bồi thường` | Hệ thống gán `Bộ phận Một cửa/Dịch vụ Công quốc gia` | Người đầu tiên thao tác Phân công hồ sơ tại màn hình này; trước đó hiển thị `-` |
| `Chuyển CQGQBT` | Hệ thống tự tạo khi cấp cuối phê duyệt Chuyển CQGQBT tại phân hệ Giải quyết yêu cầu bồi thường, đơn vị tiếp nhận là cơ quan được chuyển đến | `Giải quyết yêu cầu bồi thường` | Kế thừa từ hồ sơ gốc | Như nguồn `Dịch vụ công quốc gia` |
| `Xác định CQGQBT` | Hệ thống tự tạo khi Bộ Tư pháp / Sở Tư pháp hoàn thành Chuyển CQGQBT tại phân hệ Xác định cơ quan giải quyết bồi thường, đơn vị tiếp nhận là cơ quan giải quyết bồi thường đã xác định | `Giải quyết yêu cầu bồi thường` | Kế thừa từ hồ sơ gốc | Như nguồn `Dịch vụ công quốc gia` |

- Hồ sơ mới của mọi nguồn ở trạng thái `Chờ phân công` tại đơn vị gốc của đơn vị tiếp nhận.
- `Hình thức tiếp nhận` gồm 03 giá trị: `Trực tiếp`, `Dịch vụ bưu chính`, `Bộ phận Một cửa/Dịch vụ Công quốc gia`. Giá trị `Bộ phận Một cửa/Dịch vụ Công quốc gia` chỉ do hệ thống gán cho hồ sơ gửi từ Dịch vụ công quốc gia.

<a id="tn-ma-vu-viec"></a>
d. Mã vụ việc và mã hồ sơ
- `Mã vụ việc` (`VVBT-yyyy-xxx`) là mã toàn trình, duy nhất trên hệ thống. Hệ thống sinh `Mã vụ việc` khi hồ sơ được tạo lần đầu (Tiếp nhận mới, nhận từ Dịch vụ công quốc gia, hoặc tạo trực tiếp tại phân hệ xử lý).
- Hồ sơ sinh ra từ Xác định CQGQBT hoặc Chuyển CQGQBT giữ nguyên `Mã vụ việc` của hồ sơ gốc.
- Mỗi hồ sơ tại phân hệ xử lý có mã riêng, sinh khi hồ sơ vào phân hệ: mã yêu cầu xác định cơ quan giải quyết bồi thường tại phân hệ Xác định cơ quan giải quyết bồi thường; mã hồ sơ `BT-yyyy-xxx` tại phân hệ Giải quyết yêu cầu bồi thường.
- Hồ sơ Giải quyết yêu cầu bồi thường dùng 01 mã `BT-yyyy-xxx` cho cả 03 giá trị của `Loại yêu cầu giải quyết bồi thường`; không sinh mã `PHDD-` riêng.

<a id="tn-luong-phan-cong"></a>
e. Luồng phân công theo Loại hồ sơ

| Loại hồ sơ | Đơn vị tiếp nhận | Luồng áp dụng tại Cấu hình luồng xử lý | Ví dụ nhánh luồng |
| :--- | :--- | :--- | :--- |
| Xác định cơ quan giải quyết bồi thường | Bộ Tư pháp | `Xác định CQGQBT - Bộ Tư pháp` | Lãnh đạo Bộ Tư pháp → Lãnh đạo Cục Giao dịch bảo đảm và bồi thường nhà nước → Lãnh đạo Phòng/Ban phụ trách → Cán bộ |
| Xác định cơ quan giải quyết bồi thường | Sở Tư pháp | `Xác định CQGQBT - Sở Tư pháp` của Sở Tư pháp đó | Lãnh đạo Sở Tư pháp → Lãnh đạo Phòng phụ trách → Cán bộ |
| Giải quyết yêu cầu bồi thường | Cơ quan giải quyết bồi thường | `Giải quyết YCBT` của đơn vị gốc | Theo cấu hình của từng cơ quan |

- Hệ thống chọn luồng theo Loại hồ sơ và đơn vị gốc tại thời điểm Lãnh đạo thao tác Phân công.

<a id="tn-trang-thai-thao-tac"></a>
f. Trạng thái và thao tác tại màn hình Tiếp nhận hồ sơ

| Trạng thái | Ý nghĩa | Thao tác |
| :--- | :--- | :--- |
| `Chờ phân công` | Hồ sơ mới, đang chờ Lãnh đạo đơn vị gốc phân công hoặc đã được thu hồi về đơn vị gốc. | - **Phân công**: Lãnh đạo thuộc Nhóm lãnh đạo của đơn vị gốc.<br>- **In phiếu tiếp nhận**: Chỉ hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới` và `Hình thức tiếp nhận` = `Trực tiếp`.<br>- **Sửa**, **Xóa**: Theo điều kiện tại Phân quyền. |
| `Đang phân công` | Lãnh đạo đã chuyển hồ sơ cho đơn vị cấp dưới, đang chờ Lãnh đạo đơn vị nhận phân công tiếp. | - **Phân công**: Lãnh đạo thuộc Nhóm lãnh đạo của đơn vị đang phân công. Cho phép chuyển tiếp đơn vị cấp dưới hoặc phân công trực tiếp cán bộ xử lý.<br>- **Thu hồi**: Lãnh đạo của đơn vị đã chuyển, theo quy tắc 7 tại [Quy tắc chung - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-quy-tac-chung). |

- Khi Lãnh đạo phân công cán bộ, hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ xử lý tương ứng với `Loại hồ sơ`. Lãnh đạo đã phân công vẫn được **Thu hồi** khi cán bộ chưa tiếp nhận, theo quy tắc 7 nêu trên.

<a id="tn-tab-xu-ly"></a>
g. Quy tắc 02 tab Chờ xử lý / Đã xử lý
- Tab của hồ sơ xác định theo thao tác của người dùng đang đăng nhập trên hồ sơ đó, không cố định theo trạng thái. Cùng 01 hồ sơ có thể nằm ở tab `Chờ xử lý` của người dùng này và tab `Đã xử lý` của người dùng khác.

| Vai trò | Tab `Chờ xử lý` | Tab `Đã xử lý` |
| :--- | :--- | :--- |
| Cán bộ tiếp nhận | Hồ sơ do người dùng tiếp nhận (`Nguồn hồ sơ` = `Tiếp nhận mới`), chưa được phân công đến cán bộ xử lý (`Chờ phân công`, `Đang phân công`). | Hồ sơ do người dùng tiếp nhận đã được phân công cán bộ xử lý (từ `Chờ tiếp nhận` trở đi). |
| Lãnh đạo (thuộc Nhóm lãnh đạo tại Cấu hình luồng xử lý) | Hồ sơ `Chờ phân công` / `Đang phân công` mà đơn vị đang phân công là đơn vị Lãnh đạo thuộc Nhóm lãnh đạo, theo [Quy tắc chung - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-quy-tac-chung). | Hồ sơ Lãnh đạo đã Chuyển đơn vị / Phân công cán bộ. Trạng thái có thể vẫn là `Đang phân công` khi đơn vị cấp dưới chưa phân công tiếp. |

- Ví dụ: Cán bộ tiếp nhận của Sở Tư pháp tạo hồ sơ, hồ sơ ở tab `Chờ xử lý` của cán bộ. Lãnh đạo Sở chuyển hồ sơ cho Lãnh đạo Phòng: hồ sơ chuyển sang tab `Đã xử lý` của Lãnh đạo Sở (trạng thái `Đang phân công`), hiển thị tại tab `Chờ xử lý` của Lãnh đạo Phòng, và vẫn ở tab `Chờ xử lý` của cán bộ tiếp nhận. Lãnh đạo Phòng phân công cán bộ xử lý: hồ sơ chuyển `Chờ tiếp nhận`, sang tab `Đã xử lý` của Lãnh đạo Phòng và của cán bộ tiếp nhận.
- Thu hồi thành công: hồ sơ trở lại tab `Chờ xử lý` của Lãnh đạo đã thu hồi.
- Mỗi tab hiển thị số bản ghi; mặc định mở tab `Chờ xử lý`. Mở màn hình kèm tham số `tab=done` (từ Dashboard Lãnh đạo hoặc liên kết) thì chọn sẵn tab `Đã xử lý`.
- Trường `Trạng thái` của bộ lọc chỉ gồm các trạng thái đang có của hồ sơ thuộc tab đang chọn.
- Click dòng hồ sơ không do người dùng tiếp nhận (VD Lãnh đạo xem hồ sơ chờ phân công) mở [MH02 - Popup Chi tiết hồ sơ - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-mh02).

---

##### 4.3.3.1.2. MH01 - Màn hình Danh sách hồ sơ tiếp nhận

###### 4.3.3.1.2.1. Màn hình

![Danh sách hồ sơ tiếp nhận](images/UC_Tiep_nhan_yeu_cau_MH01_Danh_sach.png)

###### 4.3.3.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `DANH SÁCH HỒ SƠ TIẾP NHẬN`.<br>- Dòng mô tả dưới tiêu đề: *"Tiếp nhận hồ sơ Xác định cơ quan giải quyết bồi thường và Giải quyết yêu cầu bồi thường; Lãnh đạo phân công đơn vị/cán bộ xử lý theo Cấu hình luồng xử lý."* |
| **Tab danh sách** | Tab | - | `Chờ xử lý` | Control UI: 02 tab đặt phía trên bộ lọc, mỗi tab kèm số bản ghi:<br>+ Chờ xử lý<br>+ Đã xử lý<br>- Bản ghi của từng tab theo [Quy tắc 02 tab Chờ xử lý / Đã xử lý - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-tab-xu-ly). |
| **I. Bộ lọc tìm kiếm** | Section | - | - | Control UI: Filter panel dạng thu gọn/mở rộng (Accordion).<br>- Hiển thị phía trên bảng danh sách.<br>- Các tiêu chí có dữ liệu được kết hợp theo điều kiện AND.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`. |
| Loại hồ sơ | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Giá trị lấy theo Danh mục Loại hồ sơ [DM_54], chỉ gồm các giá trị có `Đơn vị áp dụng` chứa đơn vị của người dùng (gồm `Xác định cơ quan giải quyết bồi thường`, `Giải quyết yêu cầu bồi thường`). |
| Nguồn hồ sơ | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Giá trị gồm:<br>+ `Tất cả`<br>+ `Tiếp nhận mới`<br>+ `Dịch vụ công quốc gia`<br>+ `Chuyển CQGQBT`<br>+ `Xác định CQGQBT`<br>- Ý nghĩa từng giá trị theo [Nguồn hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-nguon-ho-so). |
| Họ và tên người yêu cầu | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Họ và tên người yêu cầu`. |
| Hình thức tiếp nhận | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Giá trị gồm:<br>+ `Tất cả`<br>+ `Trực tiếp`<br>+ `Dịch vụ bưu chính`<br>+ `Bộ phận Một cửa/Dịch vụ Công quốc gia` |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Giá trị gồm `Tất cả` và các trạng thái đang có của hồ sơ thuộc tab đang chọn (VD tab `Đã xử lý` của Lãnh đạo có thể gồm `Đang phân công`, `Chờ tiếp nhận` và các trạng thái tại phân hệ xử lý). |
| Từ ngày | Date | Không | Ngày hiện tại lùi 03 tháng | Control UI: DatePicker (chọn ngày trên lịch hoặc nhập trực tiếp), định dạng `dd/mm/yyyy`.<br>- Mặc định lấy dữ liệu trong 03 tháng gần nhất: Từ ngày là cùng ngày của 03 tháng trước ngày hiện tại (VD: ngày hiện tại 07/10/2026 thì Từ ngày là 07/07/2026).<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- `Từ ngày` không được lớn hơn `Đến ngày`. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: DatePicker (chọn ngày trên lịch hoặc nhập trực tiếp), định dạng `dd/mm/yyyy`.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- `Đến ngày` không được nhỏ hơn `Từ ngày`. |
| **II. Bảng danh sách hồ sơ** | Section | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Phía trên bảng hiển thị số bản ghi: *"Hiển thị [tổng số] bản ghi"*.<br>- Sắp xếp mặc định: Sắp xếp theo "Thời điểm tiếp nhận" giảm dần (mới nhất hiển thị lên đầu).<br>- **Phạm vi dữ liệu**: Theo tab đang chọn và vai trò người dùng ([Quy tắc 02 tab Chờ xử lý / Đã xử lý - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-tab-xu-ly)); chỉ gồm hồ sơ có `Loại hồ sơ` thuộc các giá trị được áp dụng cho đơn vị của người dùng.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Tự tăng | Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Chỉ đọc. Hiển thị đậm, ví dụ `VVBT-2026-xxx`. Mã toàn trình theo [Mã vụ việc và mã hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-ma-vu-viec). |
| Họ và tên người yêu cầu | String(100) | Có | Theo dữ liệu | Chỉ đọc. Hiển thị đậm. |
| Loại hồ sơ | Enum(String(100)) | Có | Theo dữ liệu | Control UI: Text hiển thị (Read-only).<br>- `Xác định cơ quan giải quyết bồi thường` hoặc `Giải quyết yêu cầu bồi thường`. |
| Loại yêu cầu giải quyết bồi thường | Enum(String(100)) | Không | Theo dữ liệu | Control UI: Text hiển thị (Read-only).<br>- Hiển thị loại yêu cầu giải quyết bồi thường (`Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)`, `Chỉ yêu cầu bồi thường thiệt hại bằng tiền`, `Chỉ yêu cầu phục hồi danh dự`). Đối với hồ sơ Xác định cơ quan giải quyết bồi thường, hiển thị `-` nếu chưa có thông tin. |
| Nguồn hồ sơ | Enum(String(50)) | Có | Theo dữ liệu | Chỉ đọc. Hiển thị dạng badge `Tiếp nhận mới`, `Dịch vụ công quốc gia`, `Chuyển CQGQBT` hoặc `Xác định CQGQBT`. |
| Hình thức tiếp nhận | Enum(String(50)) | Có | Theo dữ liệu | Chỉ đọc. Hiển thị dạng badge `Trực tiếp`, `Dịch vụ bưu chính` hoặc `Bộ phận Một cửa/Dịch vụ Công quốc gia`. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Thời điểm tiếp nhận | DateTime | Có | Theo dữ liệu | Chỉ đọc. Định dạng `dd/mm/yyyy HH:mm`. Với hồ sơ nguồn khác `Tiếp nhận mới`: thời điểm hồ sơ được tạo tại màn hình này. |
| Cán bộ tiếp nhận | String(255) | Không | Theo dữ liệu | Chỉ đọc. Theo cột `Cán bộ tiếp nhận` tại [Nguồn hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-nguon-ho-so); chưa có thì hiển thị `-`. |
| Đơn vị đang phân công | String(255) | Có | Theo dữ liệu | Chỉ đọc. Đơn vị mà Nhóm lãnh đạo đang giữ hồ sơ để phân công: đơn vị gốc khi hồ sơ `Chờ phân công`; đơn vị cấp dưới đã được chuyển khi hồ sơ `Đang phân công`. Hồ sơ đã phân công cán bộ: hiển thị `-`. |
| Trạng thái | Enum(String(50)) | Có | Theo dữ liệu | Hiển thị badge trạng thái hiện tại của hồ sơ (`Chờ phân công`, `Đang phân công`, hoặc trạng thái tại phân hệ xử lý khi hồ sơ đã phân công cán bộ, VD `Chờ tiếp nhận`). |
| Thao tác | Action Buttons | Không | Theo quyền/trạng thái | Control UI: Icon buttons (Fixed-slot Action Column), theo bảng thao tác tại [Trạng thái và thao tác - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-trang-thai-thao-tac):<br>+ **Phân công**: Lãnh đạo thuộc Nhóm lãnh đạo của đơn vị đang phân công; hồ sơ `Chờ phân công` / `Đang phân công` thuộc tab `Chờ xử lý`.<br>+ **In Phiếu tiếp nhận**: Hồ sơ `Chờ phân công` có `Nguồn hồ sơ` = `Tiếp nhận mới` và `Hình thức tiếp nhận` = `Trực tiếp`.<br>+ **Sửa**: Hồ sơ `Chờ phân công` có `Nguồn hồ sơ` = `Tiếp nhận mới`, do người dùng hiện tại tiếp nhận, lãnh đạo chưa thao tác (chưa có nội dung phân công).<br>+ **Xóa**: Cùng điều kiện hiển thị với **Sửa**.<br>+ **Thu hồi**: Lãnh đạo của đơn vị đã chuyển; hồ sơ thuộc tab `Đã xử lý` thỏa điều kiện thu hồi tại quy tắc 7 của [Quy tắc chung - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-quy-tac-chung).<br>- Các thao tác không thỏa mãn điều kiện hiển thị ở dạng mờ (disabled) theo quy chuẩn giao diện, không cho phép click. |

###### 4.3.3.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới:<br>- **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thuộc phạm vi dữ liệu của người dùng, thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn, hiển thị kết quả lên bảng và đưa về Trang 1.<br>- **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*, các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa các điều kiện lọc (gồm cả `Trạng thái`), đưa Từ ngày, Đến ngày về khoảng 03 tháng gần nhất, tải lại danh sách theo điều kiện mặc định. |
| 3 | Tiếp nhận mới | Button | Nút nằm phía trên bên phải bảng danh sách. Khi người dùng click nút, hệ thống mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở trạng thái rỗng để nhập mới. |
| 4 | Click dòng dữ liệu | Row click | Khi người dùng click vào dòng dữ liệu trên bảng (ngoại trừ click trực tiếp vào icon trong cột `Thao tác`), hệ thống mở [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận) tương ứng với bản ghi được chọn. Nếu người dùng click vào icon trong cột `Thao tác`, hệ thống thực hiện đúng chức năng của icon được click và không kích hoạt row click. |
| 5 | In Phiếu tiếp nhận | Icon button | - Khi người dùng click icon, hệ thống mở [MH04 - Popup In Phiếu tiếp nhận hồ sơ](#43315-mh04---popup-in-phiếu-tiếp-nhận-hồ-sơ) để xem trước và thực hiện in Phiếu tiếp nhận hồ sơ theo mẫu quy định. |
| 6 | Sửa | Icon button | - Khi người dùng click icon, hệ thống mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở chế độ sửa và tự động điền dữ liệu của bản ghi đó. |
| 7 | Xóa | Icon button | Khi người dùng click icon Xóa, hệ thống xử lý theo các trường hợp bên dưới:<br>- **TH1 - Mở popup xác nhận**: Hệ thống hiển thị Custom Confirmation Modal xác nhận xóa [MSG-CFM-SYS-001].<br>- **TH2 - Người dùng chọn "Đồng ý"**: Hệ thống thực hiện **xóa mềm** (cập nhật cờ/trạng thái đã xóa trong CSDL, không xóa vật lý bản ghi) để lưu vết phục vụ audit log và thanh tra; hồ sơ đồng thời được gỡ khỏi tab `Chờ xử lý` của lãnh đạo; bản ghi không còn hiển thị trên danh sách và hiển thị thông báo thành công [MSG-SUC-BTNN-TN-001].<br>- **TH3 - Người dùng chọn "Hủy bỏ"**: Hệ thống đóng popup xác nhận, không xóa hồ sơ. |
| 8 | Chuyển tab | Tab | Hiển thị danh sách của tab `Chờ xử lý` hoặc `Đã xử lý`, nạp lại bộ lọc `Trạng thái` theo tab và đưa về Trang 1. |
| 9 | Phân công | Icon button | Mở [MH03 - Popup Phân công xử lý hồ sơ - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-mh03). Hướng phân công lấy theo luồng tương ứng với Loại hồ sơ tại [Luồng phân công theo Loại hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-luong-phan-cong). Với hồ sơ nguồn khác `Tiếp nhận mới` chưa có Cán bộ tiếp nhận, hệ thống ghi người phân công làm Cán bộ tiếp nhận. Phân công thành công: hồ sơ rời tab `Chờ xử lý` của Lãnh đạo, hiển thị tại tab `Đã xử lý`. |
| 10 | Thu hồi | Icon button | Mở [MH05 - Popup Xác nhận thu hồi - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-mh05). Thu hồi thành công: hồ sơ trở lại `Chờ phân công` / `Đang phân công` tại đơn vị đã chuyển, hiển thị lại tại tab `Chờ xử lý`. |

---

##### 4.3.3.1.3. MH02 - Màn hình Tiếp nhận hồ sơ

###### 4.3.3.1.3.1. Màn hình

![Tiếp nhận hồ sơ](images/UC_Tiep_nhan_yeu_cau_MH02_Tiep_nhan.png)

###### 4.3.3.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | Theo ngữ cảnh | Control UI: Text heading (Read-only).<br>- Khi thêm mới hiển thị `TIẾP NHẬN HỒ SƠ`.<br>- Khi mở từ danh sách để sửa bản ghi `Chờ phân công`, hiển thị `SỬA THÔNG TIN TIẾP NHẬN`. |
| Mã vụ việc | String(50) | - | Tự sinh | Chỉ đọc. **Không hiển thị khi thêm mới** (vì mã vụ việc chỉ được sinh sau khi lưu thành công). Chỉ hiển thị khi mở lại bản ghi đã tồn tại, hiển thị đúng mã đã sinh, ví dụ `VVBT-2026-xxx`. |
| Thời điểm tiếp nhận | DateTime | - | Tự sinh | Chỉ đọc. **Không hiển thị khi thêm mới** (vì thời điểm tiếp nhận chỉ được ghi nhận sau khi lưu thành công). Chỉ hiển thị khi mở lại vụ việc đã tồn tại, theo thời điểm người dùng đã bấm `Lưu thông tin` lần đầu. Định dạng hiển thị `dd/mm/yyyy HH:mm`. |
| Cán bộ tiếp nhận | String(255) | - | Theo dữ liệu | Chỉ đọc. **Không hiển thị khi thêm mới**. Họ tên cán bộ đã tiếp nhận hồ sơ. |
| Trạng thái | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. **Không hiển thị khi thêm mới**. Badge trạng thái hiện tại của hồ sơ. |
| **Thông tin tổng quan vụ việc** | Section | - | - | Control UI: Section header. |
| Nguồn hồ sơ | Enum(String(50)) | - | `Tiếp nhận mới` | Chỉ đọc. **Không hiển thị khi thêm mới**. Hệ thống gán `Tiếp nhận mới` cho hồ sơ tạo tại màn hình này. |
| Loại hồ sơ | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn loại hồ sơ...`.<br>- Giá trị lấy theo Danh mục Loại hồ sơ [DM_54], chỉ gồm các giá trị có `Đơn vị áp dụng` chứa đơn vị của người dùng (gồm `Xác định cơ quan giải quyết bồi thường`, `Giải quyết yêu cầu bồi thường`).<br>- Loại hồ sơ quyết định luồng phân công tại [Luồng phân công theo Loại hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-luong-phan-cong) và phân hệ xử lý hồ sơ sau khi lãnh đạo phân công cán bộ. |
| Loại yêu cầu giải quyết bồi thường | Enum(String(100)) | Có | `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)` | Control UI: Radio button.<br>Gồm:<br>+ Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)<br>+ Chỉ yêu cầu bồi thường thiệt hại bằng tiền<br>+ Chỉ yêu cầu phục hồi danh dự<br>- **Điều kiện hiển thị**: Hiển thị và bắt buộc chọn khi `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`.<br>- **Quy tắc xử lý**: Xác định phạm vi nội dung yêu cầu bồi thường. Khi Lãnh đạo phân công cán bộ, hệ thống sinh 01 mã hồ sơ `BT-yyyy-xxx` cho cả 03 giá trị (không sinh mã `PHDD-` riêng) và hồ sơ hiển thị tại phân hệ **Giải quyết yêu cầu bồi thường**:<br>+ `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)`: Hồ sơ có cả nhánh Giải quyết YCBT và nhánh Phục hồi danh dự.<br>+ `Chỉ yêu cầu bồi thường thiệt hại bằng tiền`: Hồ sơ chỉ có nhánh Giải quyết YCBT.<br>+ `Chỉ yêu cầu phục hồi danh dự`: Hồ sơ chỉ có nhánh Phục hồi danh dự theo Điều 56-59 Luật TNBTCNN. |
| Hình thức tiếp nhận | Enum(String(50)) | Có | `Trực tiếp` | Control UI: Combobox.<br>- Giá trị gồm:<br>+ `Trực tiếp`<br>+ `Dịch vụ bưu chính`<br>- Không có giá trị `Bộ phận Một cửa/Dịch vụ Công quốc gia`; giá trị này chỉ do hệ thống gán cho hồ sơ gửi từ Dịch vụ công quốc gia. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn lĩnh vực...`.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| **Thông tin người yêu cầu** | Section | - | - | Control UI: Section header. |
| Họ và tên người yêu cầu | String(100) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Nhập họ tên cá nhân/người đại diện/tổ chức yêu cầu bồi thường. |
| Tư cách người yêu cầu | Enum(String(100)) | Có | `Người bị thiệt hại` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Tư cách người yêu cầu bồi thường - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_26].<br>- Khi chọn giá trị khác `Người bị thiệt hại`, hệ thống hiển thị khối `Thông tin người bị thiệt hại`; khi chọn lại `Người bị thiệt hại`, khối được ẩn và dữ liệu trong khối không được lưu. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...`.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp... |
| **Thông tin người bị thiệt hại** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`.<br>- Tại Tiếp nhận hồ sơ, các trường của khối không bắt buộc nhập; 04 trường `Họ và tên người bị thiệt hại`, `Ngày sinh`, `Loại giấy tờ thân nhân`, `Số giấy tờ thân nhân` bắt buộc khi Nhập liệu hồ sơ vụ việc tại phân hệ Giải quyết yêu cầu bồi thường. |
| Họ và tên người bị thiệt hại | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên người bị thiệt hại...`. |
| Ngày sinh | Date | Không | Trống | Control UI: Input date, định dạng `dd/mm/yyyy`. |
| Loại giấy tờ thân nhân | Enum(String(50)) | Không | Trống | Control UI: Combobox.<br>- Giá trị mặc định: `-- Chọn loại giấy tờ --`.<br>- Tham chiếu danh mục loại giấy tờ pháp lý [DM_10] (`Căn cước công dân / Thẻ căn cước`, `Chứng minh nhân dân`, `Hộ chiếu`). |
| Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...`. |
| Tỉnh/Thành phố | Enum(String(100)) | Không | Trống | Control UI: Combobox có tìm kiếm.<br>- Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]; placeholder `Gõ Mã hoặc Tên Tỉnh/Thành phố...`. |
| Phường/Xã | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập phường/xã...`. |
| Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...`. |
| **VĂN BẢN LÀM CĂN CỨ YÊU CẦU BỒI THƯỜNG** | List(Object) | Không | 01 dòng trống / Kế thừa | Control UI: Data grid nhiều dòng (không bắt buộc).<br>- Cột: `STT` \| `Tên văn bản, căn cứ` \| `Tải file` \| `Thao tác` (`Xem file`/`Xóa`).<br>- Tự động kế thừa từ hồ sơ Xác định cơ quan giải quyết bồi thường tương ứng nếu đã được nhập trước đó.<br>- Nút `Thêm dòng` dưới bảng để bổ sung văn bản, căn cứ.<br>- Dòng không có tên và không có file được bỏ qua khi lưu. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only). Căn giữa, tự tăng theo số dòng. |
| Tên văn bản, căn cứ | String(255) | Không | Trống / Kế thừa | Control UI: Input text.<br>- Placeholder: `Nhập tên văn bản, căn cứ...`.<br>- Khi tải file mà chưa nhập tên, hệ thống tự điền tên theo tên file (bỏ phần mở rộng). |
| Tải file | File | Không | Trống / Kế thừa | Control UI: Nút `Tải file`; sau khi chọn hiển thị tên file.<br>- Định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`. |
| Thao tác | Action | - | - | - `Xem file`: mở file của dòng; mờ khi dòng chưa có file.<br>- `Xóa`: xóa dòng; nếu là dòng cuối cùng thì đặt lại thành 01 dòng trống. |
| **Bảng tài liệu đính kèm** | List(Object) | Không | Trống | Cho phép nhập nhiều tài liệu liên quan đến bước tiếp nhận. Mỗi dòng gồm tên tài liệu và file đính kèm. |
| STT | Integer(10) | - | Tự tăng | Căn giữa, tăng theo số dòng tài liệu. |
| Tên tài liệu | String(255) | Có khi thêm dòng | Trống | Người dùng nhập tên tài liệu (placeholder `Nhập tên tài liệu...`). Bắt buộc khi dòng tài liệu có file. Khi tải file lên mà chưa nhập tên, hệ thống lấy tên file (bỏ phần mở rộng) làm tên tài liệu. |
| File đính kèm | File | Không | Trống | Cho phép chọn file tài liệu liên quan theo quy tắc file dùng chung (định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`; tối đa 20MB/file). |
| **Quá trình phân công** | List(Object) | - | Ẩn khi thêm mới | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị khi mở lại bản ghi đã tồn tại.<br>- Bảng theo dõi quá trình chuyển tiếp và phân công hồ sơ. Chưa có nội dung thì hiển thị *"Chưa có nội dung phân công."* |
| STT | Integer(10) | - | Tự tăng | Số thứ tự lượt phân công. |
| Nội dung | String(1000) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Người chuyển, đơn vị chuyển, đơn vị/cán bộ nhận, kèm `Ý kiến chỉ đạo` (nếu có). |
| Thời điểm | DateTime | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Thời điểm thực hiện chuyển/phân công, định dạng `dd/mm/yyyy HH:mm`. |
| Tình trạng | Enum(String(50)) | - | Theo dữ liệu | Control UI: Text/Badge (Read-only).<br>- Trạng thái tiếp nhận/xử lý (`Đã xử lý`, `Chưa xử lý - Chưa xem` hoặc `Chưa xử lý - Đã xem lúc [hh:mm dd/mm/yyyy]`). |
| **Lịch sử xử lý** | List(Object) | - | Ẩn khi thêm mới | Control UI: Timeline (Read-only).<br>- Chỉ hiển thị khi mở lại bản ghi đã tồn tại.<br>- Sắp xếp mới nhất lên đầu; mỗi dòng gồm `[Hành động] - [Người thực hiện] - [Thời điểm]` và nội dung (ví dụ `Tiếp nhận hồ sơ`, `Cập nhật thông tin tiếp nhận`, `Chuyển đơn vị`, `Thu hồi`). |

###### 4.3.3.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng màn hình tiếp nhận và quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 2 | Thêm dòng tài liệu | Button/Icon | Nút `Thêm dòng`. Hệ thống thêm một dòng tài liệu mới để người dùng nhập `Tên tài liệu` và chọn file đính kèm. |
| 3 | Tải lên | Button/Icon | Khi người dùng chọn tệp tin tải lên cho dòng tài liệu, hệ thống kiểm tra và xử lý theo các trường hợp bên dưới:<br>- **TH1 - File sai định dạng**: Nếu tệp tin không đúng định dạng cho phép (`.pdf`, `.doc`, `.docx`, `.jpg`, `.png`), hệ thống hiển thị cảnh báo lỗi [MSG-ERR-FILE-001] và không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng**: Nếu dung lượng tệp tin vượt quá 20MB/file, hệ thống hiển thị cảnh báo lỗi [MSG-ERR-FILE-002] và không tiếp nhận tệp.<br>- **TH3 - Hợp lệ**: Hệ thống tải tệp tin lên thành công, hiển thị tên tệp tin kèm liên kết "Xem file" và nút "Xóa". |
| 4 | Xem file | Link | Mở xem nội dung tệp tin đã tải lên tại tab trình duyệt mới. |
| 5 | Xóa | Link/Icon | Mở Custom Confirmation Modal xác nhận gỡ bỏ tệp tin/dòng tài liệu đã tải lên [MSG-CFM-SYS-001]:<br>- Khi người dùng chọn "Đồng ý": Hệ thống gỡ dòng tài liệu hoặc tệp tin đính kèm khỏi biểu mẫu.<br>- Khi người dùng chọn "Hủy bỏ": Đóng popup xác nhận và giữ nguyên tài liệu. |
| 6 | Lưu thông tin | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới:<br>- **TH1 - Bỏ trống trường bắt buộc**: Nếu bỏ trống một trong các trường bắt buộc đang hiển thị (không gồm các trường của khối `Thông tin người bị thiệt hại`) hoặc dòng tài liệu có file nhưng chưa có tên, vi phạm quy tắc [BR-VAL-001], hệ thống bôi đỏ viền ô lỗi đầu tiên (sử dụng class `.is-invalid`), hiển thị cảnh báo lỗi [MSG-ERR-VAL-001] ngay phía dưới ô nhập, tự động focus con trỏ vào ô nhập lỗi đầu tiên và không cho lưu.<br>- **TH2 - Thêm mới, dữ liệu hợp lệ** (áp dụng cho cả hai Loại hồ sơ): Hệ thống tự động sinh `Mã vụ việc` (mã toàn trình), gán `Nguồn hồ sơ` = `Tiếp nhận mới`, ghi nhận `Thời điểm tiếp nhận` và cán bộ tiếp nhận, lưu thông tin tổng quan, thông tin người yêu cầu, người bị thiệt hại và tài liệu đính kèm; hồ sơ ở trạng thái `Chờ phân công`, đơn vị tiếp nhận là đơn vị gốc của cán bộ tiếp nhận; hồ sơ được chuyển đến tab `Chờ xử lý` của Lãnh đạo đơn vị gốc tại màn hình này, phân công theo luồng tương ứng với Loại hồ sơ (theo [Quy tắc 02 tab Chờ xử lý / Đã xử lý - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-tab-xu-ly)); ghi Lịch sử xử lý `Tiếp nhận hồ sơ`; hiển thị thông báo thành công [MSG-SUC-BTNN-LXL-001] và quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). Khi lãnh đạo phân công cán bộ, hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ **Xác định cơ quan giải quyết bồi thường** (nếu Loại hồ sơ = `Xác định cơ quan giải quyết bồi thường`) hoặc phân hệ **Giải quyết yêu cầu bồi thường** (nếu Loại hồ sơ = `Giải quyết yêu cầu bồi thường`, gồm cả hồ sơ có nhánh Phục hồi danh dự).<br>- **TH3 - Sửa, lãnh đạo đã thao tác**: Khi lưu, hệ thống kiểm tra lại tại máy chủ; nếu hồ sơ không còn `Chờ phân công` hoặc lãnh đạo đã chuyển/phân công trong lúc đang cập nhật, hệ thống hiển thị cảnh báo lỗi [MSG-ERR-BTNN-LXL-003], không lưu và quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).<br>- **TH4 - Sửa, dữ liệu hợp lệ**: Hệ thống ghi nhận thông tin cập nhật, giữ nguyên trạng thái `Chờ phân công`, ghi Lịch sử xử lý `Cập nhật thông tin tiếp nhận`, hiển thị thông báo thành công [MSG-SUC-BTNN-TN-002] và quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 7 | In Phiếu tiếp nhận | Button | - **Điều kiện hiển thị**: Chỉ hiển thị khi sửa bản ghi đã tồn tại ở trạng thái `Chờ phân công` có `Hình thức tiếp nhận` = `Trực tiếp`.<br>- Khi người dùng click nút, hệ thống mở [MH04 - Popup In Phiếu tiếp nhận hồ sơ](#43315-mh04---popup-in-phiếu-tiếp-nhận-hồ-sơ) để xem trước và thực hiện in Phiếu tiếp nhận hồ sơ. |

---

##### 4.3.3.1.4. MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận

###### 4.3.3.1.4.1. Màn hình

![Chi tiết hồ sơ tiếp nhận](images/UC_Tiep_nhan_yeu_cau_MH03_Chi_tiet.png)

###### 4.3.3.1.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | - | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `CHI TIẾT HỒ SƠ TIẾP NHẬN`. |
| Mã vụ việc | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi (ví dụ: `VVBT-2026-xxx`). |
| Thời điểm tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi (định dạng `dd/mm/yyyy HH:mm`). |
| Cán bộ tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi; chưa có thì hiển thị `-`. |
| Trạng thái | - | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Trạng thái hiện tại của hồ sơ (`Chờ phân công`, `Đang phân công` hoặc trạng thái tại phân hệ xử lý khi đã phân công cán bộ). |
| Nguồn hồ sơ | - | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- `Tiếp nhận mới`, `Dịch vụ công quốc gia`, `Chuyển CQGQBT` hoặc `Xác định CQGQBT`. |
| Loại hồ sơ | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi (`Xác định cơ quan giải quyết bồi thường` hoặc `Giải quyết yêu cầu bồi thường`). |
| Loại yêu cầu giải quyết bồi thường | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi (`Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)`, `Chỉ yêu cầu bồi thường thiệt hại bằng tiền` hoặc `Chỉ yêu cầu phục hồi danh dự`). |
| Hình thức tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị `Trực tiếp`, `Dịch vụ bưu chính` hoặc `Bộ phận Một cửa/Dịch vụ Công quốc gia`. |
| Lĩnh vực phát sinh thiệt hại | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| Họ và tên người yêu cầu | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| Tư cách người yêu cầu | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi, tham chiếu Danh mục Tư cách người yêu cầu bồi thường [DM_26]. |
| Tỉnh/Thành phố | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| Phường/Xã | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| Địa chỉ chi tiết | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| **Thông tin người bị thiệt hại** | - | - | Ẩn | Control UI: Section header (Read-only).<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`. |
| Họ và tên người bị thiệt hại | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| Ngày sinh | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi (định dạng `dd/mm/yyyy`). |
| Loại giấy tờ thân nhân | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi, tham chiếu Danh mục loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ thân nhân | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| Tỉnh/Thành phố | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi, tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. |
| Phường/Xã | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| Địa chỉ chi tiết | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị theo dữ liệu bản ghi. |
| **Văn bản làm căn cứ yêu cầu bồi thường** | - | - | Theo hồ sơ | Control UI: Data grid (Read-only).<br>- Cột: `STT` \| `Tên văn bản, căn cứ` \| `Tải file` \| `Thao tác` (`Xem file`).<br>- Không có dữ liệu thì hiển thị `Chưa cung cấp`. |
| **Bảng tài liệu đính kèm** | - | - | Theo dữ liệu | Danh sách các tài liệu ban đầu đã đính kèm theo vụ việc ở dạng chỉ đọc. Không có tài liệu thì hiển thị *"Không có tài liệu đính kèm nào."* |
| STT | - | - | Tự tăng | Số thứ tự dòng tài liệu. |
| Tên tài liệu | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị tên tài liệu theo dữ liệu bản ghi. |
| File đính kèm | - | - | Theo dữ liệu | Control UI: Text link (Read-only).<br>- Hiển thị tên file kèm liên kết `Xem file` (mở tab mới). |
| **Quá trình phân công** | - | - | Theo dữ liệu | Control UI: Data grid (Read-only).<br>- Bảng theo dõi quá trình chuyển tiếp và phân công hồ sơ. Chưa có nội dung thì hiển thị *"Chưa có nội dung phân công."* |
| STT | - | - | Tự tăng | Số thứ tự lượt phân công. |
| Nội dung | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Người chuyển, đơn vị chuyển, đơn vị/cán bộ nhận, kèm `Ý kiến chỉ đạo` (nếu có). |
| Thời điểm | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Thời điểm thực hiện chuyển/phân công, định dạng `dd/mm/yyyy HH:mm`. |
| Tình trạng | - | - | Theo dữ liệu | Control UI: Text/Badge (Read-only).<br>- Trạng thái tiếp nhận/xử lý (`Đã xử lý`, `Chưa xử lý - Chưa xem` hoặc `Chưa xử lý - Đã xem lúc [hh:mm dd/mm/yyyy]`). |
| **Lịch sử xử lý** | - | - | Theo dữ liệu | Control UI: Timeline (Read-only).<br>- Sắp xếp mới nhất lên đầu; mỗi dòng gồm `[Hành động] - [Người thực hiện] - [Thời điểm]` và nội dung (ví dụ `Tiếp nhận hồ sơ`, `Cập nhật thông tin tiếp nhận`, `Chuyển đơn vị`, `Thu hồi`). |
| Thanh thao tác cuối màn hình | - | - | Theo trạng thái | Control UI: Action bar.<br>- Hiển thị các nút thao tác tương ứng theo trạng thái hồ sơ quy định tại bảng Chức năng trên màn hình bên dưới. |

###### 4.3.3.1.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Khi người dùng click nút, hệ thống đóng màn hình xem chi tiết và quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 2 | In Phiếu tiếp nhận | Button | - **Điều kiện hiển thị**: Chỉ hiển thị đối với hồ sơ ở trạng thái `Chờ phân công` có `Nguồn hồ sơ` = `Tiếp nhận mới` và `Hình thức tiếp nhận` = `Trực tiếp`.<br>- **Hành vi**: Khi người dùng click nút, hệ thống mở [MH04 - Popup In Phiếu tiếp nhận hồ sơ](#43315-mh04---popup-in-phiếu-tiếp-nhận-hồ-sơ). Hành vi xử lý chi tiết theo mô tả tại chức năng [In Phiếu tiếp nhận (STT 5 của MH01)](#433123-chức-năng-trên-màn-hình) hoặc [In Phiếu tiếp nhận (STT 7 của MH02)](#433133-chức-năng-trên-màn-hình). |
| 3 | Sửa | Button | - **Điều kiện hiển thị**: Chỉ hiển thị khi hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`, ở trạng thái `Chờ phân công`, lãnh đạo chưa thao tác (chưa có nội dung phân công) và do chính người dùng hiện tại tiếp nhận.<br>- **Hành vi**: Khi người dùng click nút, hệ thống mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở chế độ sửa. Hành vi xử lý chi tiết theo mô tả tại chức năng [Sửa (STT 6 của MH01)](#433123-chức-năng-trên-màn-hình). |
| 4 | Xóa | Button | - **Điều kiện hiển thị**: Cùng điều kiện hiển thị với nút `Sửa`.<br>- **Hành vi**: Khi người dùng click nút, hệ thống mở popup xác nhận xóa [MSG-CFM-SYS-001] và xử lý xóa mềm. Hành vi xử lý chi tiết theo mô tả tại chức năng [Xóa (STT 7 của MH01)](#433123-chức-năng-trên-màn-hình). Sau khi xóa thành công, hiển thị thông báo [MSG-SUC-BTNN-TN-001] và điều hướng quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |

---

##### 4.3.3.1.5. MH04 - Popup In Phiếu tiếp nhận hồ sơ

###### 4.3.3.1.5.1. Màn hình

![Popup In Phiếu tiếp nhận hồ sơ](images/UC_Tiep_nhan_yeu_cau_MH04_In_phieu_tiep_nhan.png)


###### 4.3.3.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | - | - | `IN PHIẾU TIẾP NHẬN HỒ SƠ` | Control UI: Heading text (Chỉ đọc).<br>- Thanh tiêu đề modal kèm icon `<i class="fa-solid fa-print"></i>` và nút đóng `×`. |
| Cơ quan tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc).<br>- Tên cơ quan/đơn vị tiếp nhận hồ sơ (ví dụ `SỞ TƯ PHÁP TP. HÀ NỘI`), hiển thị ở góc trái đầu văn bản, chữ in hoa, có gạch chân. |
| Quốc hiệu, Tiêu ngữ | - | - | Cố định | Control UI: Text (Chỉ đọc).<br>- Hiển thị ở góc phải đầu văn bản: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM` (in hoa, đậm) / `Độc lập - Tự do - Hạnh phúc` (in nghiêng, đậm), có gạch chân. |
| Tiêu đề văn bản | - | - | Theo dữ liệu | Control UI: Text heading (Chỉ đọc).<br>- Tiêu đề chính: `GIẤY TIẾP NHẬN HỒ SƠ` (in hoa, đậm, căn giữa).<br>- Dòng phụ phía dưới: `(Về việc: [Loại hồ sơ])`. |
| **Khối thông tin tiếp nhận** | - | - | - | Control UI: Bố cục lưới 2 cột (Grid layout, Read-only). |
| Mã vụ việc | - | - | Theo dữ liệu | Control UI: Text/Badge (Chỉ đọc).<br>- Mã vụ việc đã được hệ thống tự động sinh (ví dụ `VVBT-2026-001`). |
| Ngày tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc).<br>- Ngày tiếp nhận theo thông tin hồ sơ (định dạng `dd/mm/yyyy`). |
| Loại hồ sơ | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc).<br>- `Xác định cơ quan giải quyết bồi thường` hoặc `Giải quyết yêu cầu bồi thường`. |
| Lĩnh vực phát sinh thiệt hại | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc).<br>- Tên lĩnh vực phát sinh thiệt hại theo dữ liệu bản ghi. |
| Họ và tên người yêu cầu | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc).<br>- Họ tên cá nhân / người đại diện / tổ chức nộp hồ sơ yêu cầu. |
| Cán bộ tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc).<br>- Họ và tên cán bộ đã thực hiện tiếp nhận hồ sơ. |
| Địa chỉ người yêu cầu | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc, chiếm cả 2 cột).<br>- Cấu trúc hiển thị đầy đủ theo các trường địa chỉ: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`. |
| Đơn vị tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc, chiếm cả 2 cột).<br>- Tên cơ quan, đơn vị tiếp nhận hồ sơ. |
| Văn bản làm căn cứ yêu cầu bồi thường | - | - | Theo dữ liệu | Control UI: Text (Chỉ đọc, chiếm cả 2 cột).<br>- Liệt kê danh sách căn cứ: `[STT]. [Tên văn bản, căn cứ]` kèm tên file đính kèm (nếu có, dạng `(Đính kèm: [Tên file])`); trường hợp không có thì ẩn mục này. |
| **Nội dung biên nhận** | - | - | Theo dữ liệu | Control UI: Văn bản xác nhận (Chỉ đọc).<br>- Ghi nhận thời gian: *"Hôm nay, vào hồi [HH:mm] ngày [dd/mm/yyyy]"*.<br>- Thành phần gồm:<br>+ **Người tiếp nhận**: Ông/Bà `[Cán bộ tiếp nhận]` - Cán bộ tiếp nhận.<br>+ **Người nộp hồ sơ**: Ông/Bà `[Họ và tên người yêu cầu]`.<br>+ **Hình thức tiếp nhận**: `Trực tiếp`.<br>- Xác nhận: *"Đã tiếp nhận hồ sơ yêu cầu theo đúng các nội dung thông tin được ghi nhận ở trên."* |
| **Khối chữ ký** | - | - | Theo dữ liệu | Control UI: Khối chữ ký 2 cột (Chỉ đọc).<br>- Cột trái: `NGƯỜI NỘP HỒ SƠ` (Ký và ghi rõ họ tên), hiển thị họ tên người nộp ở chân chữ ký.<br>- Cột phải: `[Địa danh], ngày ... tháng ... năm [Năm]` / `CÁN BỘ TIẾP NHẬN HỒ SƠ` (Ký và ghi rõ họ tên), hiển thị họ tên cán bộ tiếp nhận ở chân chữ ký. |

###### 4.3.3.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | In phiếu | Button | Nút có icon `<i class="fa-solid fa-print"></i>`. Khi người dùng click nút, hệ thống kích hoạt hộp thoại in của trình duyệt (`window.print()`) để in trực tiếp qua máy in hoặc xuất/lưu dưới dạng file PDF. |
| 2 | Đóng | Button | Nút tại footer modal (hoặc icon `×` trên header). Hệ thống đóng popup xem trước và giữ nguyên màn hình làm việc hiện tại ([MH01](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận), [MH02](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) hoặc [MH03](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận)). |

---

