### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.1. Tiếp nhận hồ sơ

##### 4.3.3.1.1. Mục đích
Quản lý tập trung bước tiếp nhận ban đầu và phân công xử lý hồ sơ của 02 Loại hồ sơ: `Xác định cơ quan giải quyết bồi thường` và `Giải quyết yêu cầu bồi thường`, bao gồm:
- Tra cứu danh sách hồ sơ theo mã vụ việc, loại hồ sơ, nguồn hồ sơ, người yêu cầu, hình thức tiếp nhận, lĩnh vực phát sinh thiệt hại, trạng thái và khoảng thời gian tiếp nhận.
- Hồ sơ được nhận diện bằng `Mã vụ việc` và `Họ và tên người yêu cầu`.
- Tiếp nhận mới hồ sơ: Cán bộ tiếp nhận ghi nhận thông tin tổng quan (loại hồ sơ, hình thức tiếp nhận, lĩnh vực phát sinh thiệt hại), thông tin người yêu cầu, thông tin người bị thiệt hại (khi người yêu cầu không phải là người bị thiệt hại) và đính kèm tài liệu ban đầu.
- Nhận hồ sơ từ các nguồn khác vào danh sách để Lãnh đạo phân công:
  + Hồ sơ gửi từ Dịch vụ công quốc gia.
  + Hồ sơ do cơ quan khác Chuyển CQGQBT đến.
  + Hồ sơ do Bộ Tư pháp / Sở Tư pháp chuyển đến sau khi hoàn thành Xác định cơ quan giải quyết bồi thường.
- Phân công: Lãnh đạo chuyển hồ sơ xuống đơn vị cấp dưới hoặc phân công trực tiếp cán bộ xử lý theo luồng tương ứng với Loại hồ sơ tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).
- Khi phân công cán bộ, hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ **Xác định cơ quan giải quyết bồi thường** hoặc phân hệ **Giải quyết yêu cầu bồi thường** theo Loại hồ sơ.
- Danh sách chia 02 tab `Chờ xử lý` / `Đã xử lý` theo thao tác của người dùng đang đăng nhập trên từng hồ sơ.
- Số hồ sơ chờ phân công của Lãnh đạo hiển thị tại khối `Chờ phân công` của [MH01 - Màn hình Dashboard Lãnh đạo - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-mh01).
- Hồ sơ cũng có thể được tạo trực tiếp tại phân hệ Xác định cơ quan giải quyết bồi thường và phân hệ Giải quyết yêu cầu bồi thường; hồ sơ tạo trực tiếp không đi qua màn hình này.

a. Phân quyền
Hệ thống phân quyền thao tác theo các quyền nghiệp vụ được cấp:
- **Xem**: Tra cứu danh sách hồ sơ, xem chi tiết, tài liệu đính kèm, quá trình phân công và lịch sử xử lý.
- **Tạo mới**: Tiếp nhận mới hồ sơ, nhập thông tin tiếp nhận ban đầu và đính kèm tài liệu.
- **Sửa**: Sửa thông tin tiếp nhận khi đồng thời:
  + Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`.
  + Hồ sơ do chính người dùng tiếp nhận.
  + Hồ sơ ở trạng thái `Chờ phân công`, chưa có lãnh đạo nào thao tác (chưa có lượt chuyển/phân công).
  + Hồ sơ thuộc các nguồn khác không được Sửa.
- **Xóa**: Cùng điều kiện với quyền Sửa.
- **In phiếu tiếp nhận**: Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới` và `Hình thức tiếp nhận` = `Trực tiếp`, ở mọi trạng thái.
- **Phân công** (Lãnh đạo): Chuyển đơn vị hoặc Phân công cán bộ khi đồng thời:
  + Hồ sơ ở trạng thái `Chờ phân công` / `Đang phân công`.
  + Lãnh đạo thuộc Nhóm lãnh đạo của đơn vị đang phân công.
- **Thu hồi** (Lãnh đạo): Thu hồi hồ sơ đã chuyển đơn vị / phân công cán bộ khi bên nhận chưa xử lý.
- **Loại hồ sơ theo đơn vị**:
  + Ô chọn và bộ lọc `Loại hồ sơ` chỉ hiển thị các giá trị của [Danh mục Loại hồ sơ - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_54] có `Đơn vị áp dụng` chứa đơn vị của người dùng.
  + Tính cả đơn vị cha: chọn đơn vị cha thì áp dụng cho toàn bộ đơn vị trực thuộc.
  + `Xác định cơ quan giải quyết bồi thường` chỉ áp dụng cho Bộ Tư pháp và các Sở Tư pháp.
  + Ủy ban nhân dân cấp tỉnh không tiếp nhận, không phân công hồ sơ Xác định cơ quan giải quyết bồi thường; chỉ xem hồ sơ của Sở Tư pháp trực thuộc tại phân hệ Xác định cơ quan giải quyết bồi thường.

b. Điều kiện thực hiện
- Người dùng đã đăng nhập vào hệ thống thành công (Website quản trị).
- Người dùng được phân quyền truy cập chức năng "Tiếp nhận hồ sơ".

<a id="tn-nguon-ho-so"></a>
c. Nguồn hồ sơ

| Nguồn hồ sơ | Cách tạo | Loại hồ sơ | Hình thức tiếp nhận | Cán bộ tiếp nhận |
| :--- | :--- | :--- | :--- | :--- |
| `Tiếp nhận mới` | Cán bộ tiếp nhận nhập tại [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ). | Cán bộ chọn | Cán bộ chọn `Trực tiếp` hoặc `Qua dịch vụ bưu chính`. | Người tạo hồ sơ. |
| `Dịch vụ công quốc gia` | - Hệ thống tự tạo khi nhận hồ sơ gửi từ Dịch vụ công quốc gia.<br>- Đơn vị tiếp nhận là cơ quan giải quyết bồi thường người dân đã chọn. | `Giải quyết yêu cầu bồi thường` | Theo dữ liệu nhận từ Dịch vụ công quốc gia. | - Người đầu tiên thao tác Phân công hồ sơ tại màn hình này.<br>- Trước đó hiển thị `-`. |
| `Chuyển CQGQBT` | - Hệ thống tự tạo khi cấp cuối phê duyệt Chuyển CQGQBT tại phân hệ Giải quyết yêu cầu bồi thường.<br>- Đơn vị tiếp nhận là cơ quan được chuyển đến. | `Giải quyết yêu cầu bồi thường` | Kế thừa từ hồ sơ gốc. | Như nguồn `Dịch vụ công quốc gia`. |
| `Xác định CQGQBT` | - Hệ thống tự tạo khi Bộ Tư pháp / Sở Tư pháp hoàn thành Chuyển CQGQBT tại phân hệ Xác định cơ quan giải quyết bồi thường.<br>- Đơn vị tiếp nhận là cơ quan giải quyết bồi thường đã xác định. | `Giải quyết yêu cầu bồi thường` | Kế thừa từ hồ sơ gốc. | Như nguồn `Dịch vụ công quốc gia`. |

- Hồ sơ mới của mọi nguồn ở trạng thái `Chờ phân công` tại đơn vị gốc của đơn vị tiếp nhận.
- `Hình thức tiếp nhận` tham chiếu [Danh mục Hình thức tiếp nhận - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_25].
- Form Tiếp nhận mới chỉ cho chọn `Trực tiếp`, `Qua dịch vụ bưu chính`.

<a id="tn-ma-vu-viec"></a>
d. Mã vụ việc và mã hồ sơ
- `Mã vụ việc` (`VVBT-yyyy-xxx`) là mã toàn trình, duy nhất trên hệ thống; mỗi vụ việc chỉ quản lý 01 `Mã vụ việc`.
- Hệ thống sinh `Mã vụ việc` khi hồ sơ được tạo lần đầu: Tiếp nhận mới, nhận từ Dịch vụ công quốc gia, hoặc tạo trực tiếp tại phân hệ xử lý.
- Hồ sơ sinh ra từ Xác định CQGQBT hoặc Chuyển CQGQBT giữ nguyên `Mã vụ việc` của hồ sơ gốc.
- Mỗi hồ sơ tại phân hệ xử lý có mã riêng, sinh khi hồ sơ vào phân hệ:
  + Phân hệ Xác định cơ quan giải quyết bồi thường: mã yêu cầu xác định cơ quan giải quyết bồi thường.
  + Phân hệ Giải quyết yêu cầu bồi thường: mã hồ sơ `BT-yyyy-xxx`.

<a id="tn-luong-phan-cong"></a>
e. Luồng phân công theo Loại hồ sơ

| Loại hồ sơ | Đơn vị tiếp nhận | Luồng áp dụng tại Cấu hình luồng xử lý | Ví dụ nhánh luồng |
| :--- | :--- | :--- | :--- |
| Xác định cơ quan giải quyết bồi thường | Bộ Tư pháp | `Xác định CQGQBT - Bộ Tư pháp` | Lãnh đạo Bộ Tư pháp → Lãnh đạo Cục Giao dịch bảo đảm và bồi thường nhà nước → Lãnh đạo Phòng/Ban phụ trách → Cán bộ |
| Xác định cơ quan giải quyết bồi thường | Sở Tư pháp | `Xác định CQGQBT - Sở Tư pháp` của Sở Tư pháp đó | Lãnh đạo Sở Tư pháp → Lãnh đạo Phòng phụ trách → Cán bộ |
| Giải quyết yêu cầu bồi thường | Cơ quan giải quyết bồi thường | `Giải quyết YCBT` của đơn vị gốc | Theo cấu hình của từng cơ quan |

- Hệ thống chọn luồng theo Loại hồ sơ và đơn vị gốc tại thời điểm Lãnh đạo thao tác Phân công.

f. Trạng thái tại màn hình Tiếp nhận hồ sơ

| Trạng thái | Ý nghĩa |
| :--- | :--- |
| `Chờ phân công` | - Hồ sơ mới, đang chờ Lãnh đạo đơn vị gốc phân công.<br>- Hoặc hồ sơ đã được thu hồi về đơn vị gốc. |
| `Đang phân công` | - Lãnh đạo đã chuyển hồ sơ cho đơn vị cấp dưới.<br>- Hồ sơ đang chờ Lãnh đạo đơn vị nhận phân công tiếp. |

- Khi Lãnh đạo phân công cán bộ, hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ xử lý tương ứng với `Loại hồ sơ`.

<a id="tn-tab-xu-ly"></a>
g. Quy tắc 02 tab Chờ xử lý / Đã xử lý
- Tab của hồ sơ xác định theo thao tác của người dùng đang đăng nhập trên hồ sơ đó, không cố định theo trạng thái.
- Cùng 01 hồ sơ có thể nằm ở tab `Chờ xử lý` của người dùng này và tab `Đã xử lý` của người dùng khác.

| Vai trò | Tab `Chờ xử lý` | Tab `Đã xử lý` |
| :--- | :--- | :--- |
| Cán bộ tiếp nhận | - Hồ sơ do người dùng tiếp nhận (`Nguồn hồ sơ` = `Tiếp nhận mới`).<br>- Hồ sơ chưa được phân công đến cán bộ xử lý (`Chờ phân công`, `Đang phân công`). | - Hồ sơ do người dùng tiếp nhận.<br>- Hồ sơ đã được phân công cán bộ xử lý (từ `Chờ tiếp nhận` trở đi). |
| Lãnh đạo (thuộc Nhóm lãnh đạo tại Cấu hình luồng xử lý) | - Hồ sơ `Chờ phân công` / `Đang phân công`.<br>- Đơn vị đang phân công là đơn vị mà Lãnh đạo thuộc Nhóm lãnh đạo, theo [Quy tắc chung - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-quy-tac-chung). | - Hồ sơ Lãnh đạo đã Chuyển đơn vị / Phân công cán bộ.<br>- Trạng thái có thể vẫn là `Đang phân công` khi đơn vị cấp dưới chưa phân công tiếp. |

- Ví dụ:
  + Cán bộ tiếp nhận của Sở Tư pháp tạo hồ sơ: hồ sơ ở tab `Chờ xử lý` của cán bộ.
  + Lãnh đạo Sở chuyển hồ sơ cho Lãnh đạo Phòng: hồ sơ sang tab `Đã xử lý` của Lãnh đạo Sở (trạng thái `Đang phân công`), hiển thị tại tab `Chờ xử lý` của Lãnh đạo Phòng, vẫn ở tab `Chờ xử lý` của cán bộ tiếp nhận.
  + Lãnh đạo Phòng phân công cán bộ xử lý: hồ sơ chuyển `Chờ tiếp nhận`, sang tab `Đã xử lý` của Lãnh đạo Phòng và của cán bộ tiếp nhận.
- Thu hồi thành công: hồ sơ trở lại tab `Chờ xử lý` của Lãnh đạo đã thu hồi.
- Tab `Chờ xử lý` hiển thị badge số lượng hồ sơ chờ xử lý của người dùng đang đăng nhập; tab `Đã xử lý` không có badge.
- Mục menu trái `Tiếp nhận hồ sơ` hiển thị badge cùng số lượng với tab `Chờ xử lý`, tính theo người dùng đang đăng nhập; bằng 0 thì không hiển thị badge.
- Mặc định mở tab `Chờ xử lý`. Mở màn hình kèm tham số `tab=done` (từ Dashboard Lãnh đạo hoặc liên kết) thì chọn sẵn tab `Đã xử lý`.
- Trường `Trạng thái` của bộ lọc chỉ gồm các trạng thái đang có của hồ sơ thuộc tab đang chọn.
- Click dòng hồ sơ: mở [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận) của bản ghi.

---

##### 4.3.3.1.2. MH01 - Màn hình Danh sách hồ sơ tiếp nhận

###### 4.3.3.1.2.1. Màn hình

![Danh sách hồ sơ tiếp nhận](images/UC_Tiep_nhan_yeu_cau_MH01_Danh_sach.png)

###### 4.3.3.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `DANH SÁCH HỒ SƠ TIẾP NHẬN`.<br>- Dòng mô tả dưới tiêu đề: *"Tiếp nhận hồ sơ Xác định cơ quan giải quyết bồi thường và Giải quyết yêu cầu bồi thường; Lãnh đạo phân công đơn vị/cán bộ xử lý theo Cấu hình luồng xử lý."* |
| **Tab danh sách** | Tab | - | `Chờ xử lý` | Control UI: Tab.<br>- Đặt phía trên bộ lọc.<br>- Gồm tab `Chờ xử lý` và tab `Đã xử lý`.<br>- Tab `Chờ xử lý` kèm badge số lượng hồ sơ chờ xử lý của người dùng đang đăng nhập.<br>- Tab `Đã xử lý` không có badge số lượng.<br>- Mục menu trái `Tiếp nhận hồ sơ` hiển thị badge cùng số lượng với tab `Chờ xử lý`; bằng 0 thì không hiển thị badge.<br>- Bản ghi của từng tab theo [Quy tắc 02 tab Chờ xử lý / Đã xử lý - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-tab-xu-ly). |
| **I. Bộ lọc tìm kiếm** | Section | - | - | Control UI: Filter panel dạng thu gọn/mở rộng (Accordion).<br>- Hiển thị phía trên bảng danh sách.<br>- Các tiêu chí có dữ liệu được kết hợp theo điều kiện AND.<br>- Mặc định hiển thị dạng mở rộng.<br>- Click nút "Thu gọn"/"Mở rộng" ở góc phải khối để thu gọn/mở rộng.<br>- Khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`. |
| Loại hồ sơ | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Loại hồ sơ - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_54].<br>- Chỉ gồm các giá trị có `Đơn vị áp dụng` chứa đơn vị của người dùng.<br>- Có thêm giá trị `Tất cả`. |
| Nguồn hồ sơ | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Giá trị gồm:<br>+ `Tất cả`<br>+ `Tiếp nhận mới`<br>+ `Dịch vụ công quốc gia`<br>+ `Chuyển CQGQBT`<br>+ `Xác định CQGQBT`<br>- Ý nghĩa từng giá trị theo [Nguồn hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-nguon-ho-so). |
| Họ và tên người yêu cầu | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Họ và tên người yêu cầu`. |
| Hình thức tiếp nhận | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Hình thức tiếp nhận - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_25].<br>- Có thêm giá trị `Tất cả`. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22].<br>- Có thêm giá trị `Tất cả`. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Gồm `Tất cả` và các trạng thái đang có của hồ sơ thuộc tab đang chọn. |
| Từ ngày | Date | Không | Ngày hiện tại lùi 03 tháng | Control UI: DatePicker (chọn ngày trên lịch hoặc nhập trực tiếp).<br>- Định dạng `dd/mm/yyyy`.<br>- Mặc định là cùng ngày của 03 tháng trước ngày hiện tại (VD: ngày hiện tại 07/10/2026 thì Từ ngày là 07/07/2026).<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- `Từ ngày` không được lớn hơn `Đến ngày`. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: DatePicker (chọn ngày trên lịch hoặc nhập trực tiếp).<br>- Định dạng `dd/mm/yyyy`.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- `Đến ngày` không được nhỏ hơn `Từ ngày`. |
| **II. Bảng danh sách hồ sơ** | Section | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi truy cập màn hình, hệ thống tự động tải Trang 1 với 20 bản ghi.<br>- Sắp xếp mặc định theo "Thời điểm tiếp nhận" giảm dần (mới nhất lên đầu).<br>- Phạm vi dữ liệu theo tab đang chọn và vai trò người dùng ([Quy tắc 02 tab Chờ xử lý / Đã xử lý - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-tab-xu-ly)).<br>- Chỉ gồm hồ sơ có `Loại hồ sơ` thuộc các giá trị được áp dụng cho đơn vị của người dùng.<br>- Không có dữ liệu: bảng hiển thị 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng, nội dung theo [MSG-INF-SYS-001].<br>- Tổng số bản ghi hiển thị tại thanh phân trang phía dưới bảng. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã vụ việc | String(50) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị đậm.<br>- Theo dữ liệu bản ghi, ví dụ `VVBT-2026-xxx`. |
| Họ và tên người yêu cầu | String(100) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị đậm.<br>- Theo dữ liệu bản ghi. |
| Loại hồ sơ | Enum(String(100)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Nguồn hồ sơ | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Hình thức tiếp nhận | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Thời điểm tiếp nhận | DateTime | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`.<br>- Hồ sơ nguồn khác `Tiếp nhận mới`: thời điểm hồ sơ được tạo tại màn hình này. |
| Cán bộ tiếp nhận | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo cột `Cán bộ tiếp nhận` tại [Nguồn hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-nguon-ho-so).<br>- Chưa có thì hiển thị `-`. |
| Đơn vị đang phân công | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Đơn vị mà Nhóm lãnh đạo đang giữ hồ sơ để phân công.<br>- Hồ sơ `Chờ phân công`: đơn vị gốc.<br>- Hồ sơ `Đang phân công`: đơn vị cấp dưới đã được chuyển.<br>- Hồ sơ đã phân công cán bộ: hiển thị `-`. |
| Trạng thái | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Thao tác | Action Buttons | - | Theo tab/điều kiện | Control UI: Icon buttons (Fixed-slot Action Column).<br>- Mỗi tab chỉ hiển thị các thao tác của tab đó.<br>- Thao tác của tab nhưng hồ sơ không thỏa điều kiện: hiển thị mờ (disabled), không cho click.<br>- **Phân công**, **Thu hồi** chỉ hiển thị với người dùng thuộc Nhóm lãnh đạo tại Cấu hình luồng xử lý.<br>- **Tab `Chờ xử lý`** gồm 04 thao tác:<br>+ **Phân công**: Hồ sơ `Chờ phân công` / `Đang phân công`; người dùng thuộc Nhóm lãnh đạo của đơn vị đang phân công.<br>+ **In phiếu tiếp nhận**: Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới` và `Hình thức tiếp nhận` = `Trực tiếp`, ở mọi trạng thái.<br>+ **Sửa**: Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`; do chính người dùng tiếp nhận; trạng thái `Chờ phân công`, chưa có lãnh đạo nào thao tác.<br>+ **Xóa**: Cùng điều kiện với **Sửa**.<br>- **Tab `Đã xử lý`** gồm 02 thao tác (không hiển thị Phân công, Sửa, Xóa):<br>+ **In phiếu tiếp nhận**: Cùng điều kiện với tab `Chờ xử lý`.<br>+ **Thu hồi**: Người dùng thuộc Nhóm lãnh đạo của đơn vị đã chuyển/phân công; hồ sơ thỏa điều kiện thu hồi tại quy tắc 7 của [Quy tắc chung - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-quy-tac-chung) (hồ sơ `Đang phân công` tại đơn vị nhận, hoặc `Chờ tiếp nhận` khi cán bộ chưa tiếp nhận). |

###### 4.3.3.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Khoảng ngày không hợp lệ**: `Từ ngày` lớn hơn `Đến ngày`.<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-VAL-007].<br>+ Không tìm kiếm.<br>- **TH2 - Có dữ liệu phù hợp**:<br>+ Hiển thị các bản ghi thuộc phạm vi dữ liệu của người dùng, thỏa mãn đồng thời các tiêu chí đã nhập/chọn.<br>+ Đưa về Trang 1.<br>- **TH3 - Không có dữ liệu**:<br>+ Bảng hiển thị 01 dòng căn giữa (`colspan`), in nghiêng, nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*.<br>+ Các nút điều hướng trang khóa mờ (Disabled). |
| 2 | Xóa bộ lọc | Button | - Xóa các điều kiện lọc (gồm cả `Trạng thái`).<br>- Đưa Từ ngày, Đến ngày về khoảng 03 tháng gần nhất.<br>- Tải lại danh sách theo điều kiện mặc định. |
| 3 | Tiếp nhận mới | Button | - Nút nằm phía trên bên phải bảng danh sách.<br>- Click nút: mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở trạng thái rỗng để nhập mới. |
| 4 | Click dòng dữ liệu | Row click | - Click dòng dữ liệu (trừ click vào icon trong cột `Thao tác`): mở [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận) của bản ghi.<br>- Click icon trong cột `Thao tác`: thực hiện chức năng của icon, không kích hoạt row click. |
| 5 | In Phiếu tiếp nhận | Icon button | - Mở [MH04 - Popup In Phiếu tiếp nhận hồ sơ](#43315-mh04---popup-in-phiếu-tiếp-nhận-hồ-sơ) để xem trước và in Phiếu tiếp nhận hồ sơ. |
| 6 | Sửa | Icon button | - Mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở chế độ sửa.<br>- Tự động điền dữ liệu của bản ghi. |
| 7 | Xóa | Icon button | - Hiển thị popup xác nhận xóa (Custom Confirmation Modal) với nội dung [MSG-CFM-SYS-001].<br>- Tại popup, người dùng chọn:<br>+ **Đồng ý**: Hệ thống **xóa mềm** hồ sơ (cập nhật cờ đã xóa, không xóa vật lý) để lưu vết audit log và thanh tra; gỡ hồ sơ khỏi tab `Chờ xử lý` của lãnh đạo; bản ghi không còn hiển thị trên danh sách; hiển thị thông báo thành công [MSG-SUC-BTNN-TN-001].<br>+ **Hủy bỏ**: Đóng popup, không xóa hồ sơ. |
| 8 | Chuyển tab | Tab | - Hiển thị danh sách của tab `Chờ xử lý` hoặc `Đã xử lý`.<br>- Nạp lại bộ lọc `Trạng thái` theo tab.<br>- Đưa về Trang 1. |
| 9 | Phân công | Icon button | - Mở [MH05 - Popup Phân công xử lý hồ sơ](#tn-mh05-phan-cong). |
| 10 | Thu hồi | Icon button | - Mở [MH05 - Popup Xác nhận thu hồi - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-mh05).<br>- Thu hồi thành công: hồ sơ trở lại `Chờ phân công` / `Đang phân công` tại đơn vị đã chuyển, hiển thị lại tại tab `Chờ xử lý`. |

---

##### 4.3.3.1.3. MH02 - Màn hình Tiếp nhận hồ sơ

###### 4.3.3.1.3.1. Màn hình

![Tiếp nhận hồ sơ](images/UC_Tiep_nhan_yeu_cau_MH02_Tiep_nhan.png)

###### 4.3.3.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | Theo ngữ cảnh | Control UI: Text heading (Read-only).<br>- Thêm mới: `TIẾP NHẬN HỒ SƠ`.<br>- Sửa bản ghi `Chờ phân công`: `SỬA THÔNG TIN TIẾP NHẬN`. |
| Mã vụ việc | String(50) | - | Tự sinh | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới** (mã chỉ được sinh sau khi lưu thành công).<br>- Mở lại bản ghi đã tồn tại: hiển thị mã đã sinh, ví dụ `VVBT-2026-xxx`. |
| Thời điểm tiếp nhận | DateTime | - | Tự sinh | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới** (chỉ được ghi nhận sau khi lưu thành công).<br>- Mở lại bản ghi đã tồn tại: thời điểm người dùng bấm `Lưu thông tin` lần đầu.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Cán bộ tiếp nhận | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới**.<br>- Họ tên cán bộ đã tiếp nhận hồ sơ. |
| Trạng thái | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- **Không hiển thị khi thêm mới**.<br>- Theo dữ liệu bản ghi. |
| **Thông tin tổng quan vụ việc** | Section | - | - | Control UI: Section header. |
| Nguồn hồ sơ | Enum(String(50)) | - | `Tiếp nhận mới` | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới**.<br>- Hệ thống gán `Tiếp nhận mới` cho hồ sơ tạo tại màn hình này. |
| Loại hồ sơ | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn loại hồ sơ...`.<br>- Tham chiếu [Danh mục Loại hồ sơ - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_54].<br>- Chỉ gồm các giá trị có `Đơn vị áp dụng` chứa đơn vị của người dùng.<br>- Loại hồ sơ quyết định luồng phân công tại [Luồng phân công theo Loại hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-luong-phan-cong).<br>- Loại hồ sơ quyết định phân hệ xử lý hồ sơ sau khi lãnh đạo phân công cán bộ. |
| Hình thức tiếp nhận | Enum(String(50)) | Có | `Trực tiếp` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Hình thức tiếp nhận - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_25].<br>- Chỉ cho chọn 02 giá trị: `Trực tiếp`, `Qua dịch vụ bưu chính`. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn lĩnh vực...`.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| **Thông tin người yêu cầu** | Section | - | - | Control UI: Section header. |
| Họ và tên người yêu cầu | String(100) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Nhập họ tên cá nhân/người đại diện/tổ chức yêu cầu bồi thường. |
| Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`.<br>- Áp dụng quy tắc số điện thoại [BR-VAL-003]. |
| Tư cách người yêu cầu | Enum(String(100)) | Có | `Người bị thiệt hại` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Tư cách người yêu cầu bồi thường - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_26].<br>- Chọn giá trị khác `Người bị thiệt hại`: hiển thị khối `Thông tin người bị thiệt hại`.<br>- Chọn lại `Người bị thiệt hại`: ẩn khối, dữ liệu trong khối không được lưu. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`.<br>- `Quốc gia` = `Việt Nam`: tham chiếu Danh mục Tỉnh/Thành phố [DM_13].<br>- `Quốc gia` = `Việt Nam`: cho phép gõ tìm theo Mã hoặc Tên.<br>- `Quốc gia` khác `Việt Nam`: ô nhập văn bản tự do. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc `Tỉnh/Thành phố` đã chọn.<br>- `Quốc gia` = `Việt Nam`: tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15], lọc theo Tỉnh/Thành phố đã chọn.<br>- `Quốc gia` = `Việt Nam`: cho phép gõ tìm theo Mã hoặc Tên.<br>- Chưa chọn Tỉnh/Thành phố: khóa mờ (Disabled).<br>- Placeholder khi khóa: *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- `Quốc gia` khác `Việt Nam`: ô nhập văn bản tự do. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...`.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp... |
| **Thông tin người bị thiệt hại** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`. |
| Họ và tên người bị thiệt hại | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên người bị thiệt hại...`. |
| Ngày sinh | Date | Không | Trống | Control UI: DatePicker.<br>- Định dạng `dd/mm/yyyy`. |
| Loại giấy tờ thân nhân | Enum(String(50)) | Không | Trống | Control UI: Combobox.<br>- Giá trị mặc định: `-- Chọn loại giấy tờ --`.<br>- Tham chiếu danh mục loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...`. |
| Tỉnh/Thành phố | Enum(String(100)) | Không | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`.<br>- Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. |
| Phường/Xã | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập phường/xã...`. |
| Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...`. |
| **VĂN BẢN LÀM CĂN CỨ YÊU CẦU BỒI THƯỜNG** | List(Object) | Không | 01 dòng trống | Control UI: Data grid nhiều dòng.<br>- Không bắt buộc nhập.<br>- Cột: `STT` \| `Tên văn bản, căn cứ` \| `Tải file` \| `Thao tác`.<br>- Nút `Thêm dòng` dưới bảng để bổ sung văn bản, căn cứ.<br>- Dòng không có tên và không có file được bỏ qua khi lưu. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Căn giữa.<br>- Tự tăng theo số dòng. |
| Tên văn bản, căn cứ | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên văn bản, căn cứ...`.<br>- Tải file mà chưa nhập tên: hệ thống tự điền tên theo tên file (bỏ phần mở rộng). |
| Tải file | File | Không | Trống | Control UI: File upload (nút `Tải file`).<br>- Sau khi chọn hiển thị tên file.<br>- Chỉ hỗ trợ định dạng `.pdf`, `.jpg`, `.png`. |
| Thao tác | Action | - | - | Control UI: Link/Icon button.<br>- `Xem file`: mở file của dòng; mờ khi dòng chưa có file.<br>- `Xóa`: xóa dòng. |
| **Bảng tài liệu đính kèm** | List(Object) | Không | Trống | Control UI: Data grid nhiều dòng.<br>- Cho phép nhập nhiều tài liệu liên quan đến bước tiếp nhận.<br>- Mỗi dòng gồm tên tài liệu và file đính kèm. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Căn giữa.<br>- Tăng theo số dòng tài liệu. |
| Tên tài liệu | String(255) | Có khi dòng có file | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tài liệu...`.<br>- Bắt buộc khi dòng tài liệu có file.<br>- Tải file lên mà chưa nhập tên: hệ thống lấy tên file (bỏ phần mở rộng) làm tên tài liệu. |
| File đính kèm | File | Không | Trống | Control UI: File upload.<br>- Theo quy tắc file dùng chung.<br>- Định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`.<br>- Tối đa 20MB/file. |
| **Quá trình phân công** | List(Object) | - | Ẩn khi thêm mới | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị khi mở lại bản ghi đã tồn tại.<br>- Theo dõi quá trình chuyển tiếp và phân công hồ sơ.<br>- Không có dữ liệu: hiển thị `Không có dữ liệu`. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự lượt phân công. |
| Nội dung | String(1000) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Người chuyển, đơn vị chuyển, đơn vị/cán bộ nhận.<br>- `Ý kiến chỉ đạo` (nếu có). |
| Thời điểm | DateTime | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Thời điểm chuyển/phân công.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Tình trạng | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Giá trị gồm:<br>+ `Đã xử lý`<br>+ `Chưa xử lý - Chưa xem`<br>+ `Chưa xử lý - Đã xem lúc [hh:mm dd/mm/yyyy]` |
| **Lịch sử xử lý** | List(Object) | - | Ẩn khi thêm mới | Control UI: Timeline (Read-only).<br>- Chỉ hiển thị khi mở lại bản ghi đã tồn tại.<br>- Sắp xếp mới nhất lên đầu.<br>- Mỗi dòng gồm `[Hành động] - [Người thực hiện] - [Thời điểm]` và nội dung.<br>- Ví dụ hành động: `Tiếp nhận hồ sơ`, `Cập nhật thông tin tiếp nhận`, `Chuyển đơn vị`, `Thu hồi`. |

###### 4.3.3.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | - Đóng màn hình tiếp nhận.<br>- Quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 2 | Thêm dòng tài liệu | Button | - Nút `Thêm dòng`.<br>- Thêm một dòng tài liệu mới để nhập `Tên tài liệu` và chọn file đính kèm. |
| 3 | Tải lên | Button | Khi người dùng chọn tệp tin tải lên cho dòng tài liệu, hệ thống xử lý theo các trường hợp:<br>- **TH1 - File sai định dạng** (khác `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`):<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-FILE-001].<br>+ Không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng** (lớn hơn 20MB/file):<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-FILE-002].<br>+ Không tiếp nhận tệp.<br>- **TH3 - Hợp lệ**:<br>+ Tải tệp lên thành công.<br>+ Hiển thị tên tệp kèm liên kết "Xem file" và nút "Xóa". |
| 4 | Xem file | Link | - Mở xem nội dung tệp tin đã tải lên tại tab trình duyệt mới. |
| 5 | Xóa | Link/Icon button | - Click: hiển thị popup xác nhận gỡ bỏ tệp tin/dòng tài liệu (Custom Confirmation Modal) với nội dung [MSG-CFM-SYS-001].<br>- Tại popup, người dùng chọn:<br>+ **Đồng ý**: Gỡ dòng tài liệu hoặc tệp tin đính kèm khỏi biểu mẫu.<br>+ **Hủy bỏ**: Đóng popup, giữ nguyên tài liệu. |
| 6 | Lưu thông tin | Button | Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Bỏ trống trường bắt buộc** [BR-VAL-001]:<br>+ Bôi đỏ viền ô lỗi đầu tiên (class `.is-invalid`).<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-VAL-001] phía dưới ô nhập.<br>+ Focus vào ô lỗi đầu tiên.<br>+ Không cho lưu.<br>- **TH2 - `Số điện thoại` không đúng định dạng** [BR-VAL-003]:<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-VAL-003] dưới ô nhập.<br>+ Không cho lưu.<br>- **TH3 - Thêm mới, dữ liệu hợp lệ** (áp dụng cho cả hai Loại hồ sơ):<br>+ Sinh `Mã vụ việc` (mã toàn trình).<br>+ Gán `Nguồn hồ sơ` = `Tiếp nhận mới`.<br>+ Ghi nhận `Thời điểm tiếp nhận` và cán bộ tiếp nhận.<br>+ Lưu thông tin tổng quan, người yêu cầu, người bị thiệt hại và tài liệu đính kèm.<br>+ Hồ sơ ở trạng thái `Chờ phân công`; đơn vị tiếp nhận là đơn vị gốc của cán bộ tiếp nhận.<br>+ Hồ sơ chuyển đến tab `Chờ xử lý` của Nhóm lãnh đạo đơn vị gốc theo [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md) đã cấu hình cho Loại hồ sơ của hồ sơ:<br>+ `Xác định cơ quan giải quyết bồi thường` tiếp nhận tại Bộ Tư pháp: luồng `Xác định CQGQBT - Bộ Tư pháp`.<br>+ `Xác định cơ quan giải quyết bồi thường` tiếp nhận tại Sở Tư pháp: luồng `Xác định CQGQBT - Sở Tư pháp` của Sở Tư pháp đó.<br>+ `Giải quyết yêu cầu bồi thường`: luồng `Giải quyết YCBT` của đơn vị gốc.<br>+ Ghi Lịch sử xử lý `Tiếp nhận hồ sơ`.<br>+ Hiển thị thông báo thành công [MSG-SUC-BTNN-LXL-001].<br>+ Quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).<br>- **TH4 - Sửa, lãnh đạo đã thao tác** (hồ sơ không còn `Chờ phân công` hoặc lãnh đạo đã chuyển/phân công trong lúc sửa; kiểm tra lại tại máy chủ):<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-BTNN-LXL-003].<br>+ Không lưu.<br>+ Quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).<br>- **TH5 - Sửa, dữ liệu hợp lệ**:<br>+ Ghi nhận thông tin cập nhật, giữ nguyên trạng thái `Chờ phân công`.<br>+ Ghi Lịch sử xử lý `Cập nhật thông tin tiếp nhận`.<br>+ Hiển thị thông báo thành công [MSG-SUC-BTNN-TN-002].<br>+ Quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 7 | In Phiếu tiếp nhận | Button | - **Điều kiện hiển thị**: Mở lại bản ghi đã tồn tại có `Hình thức tiếp nhận` = `Trực tiếp`.<br>- Click nút: mở [MH04 - Popup In Phiếu tiếp nhận hồ sơ](#43315-mh04---popup-in-phiếu-tiếp-nhận-hồ-sơ) để xem trước và in Phiếu tiếp nhận hồ sơ. |

---

##### 4.3.3.1.4. MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận

###### 4.3.3.1.4.1. Màn hình

![Chi tiết hồ sơ tiếp nhận](images/UC_Tiep_nhan_yeu_cau_MH03_Chi_tiet.png)

###### 4.3.3.1.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | - | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `CHI TIẾT HỒ SƠ TIẾP NHẬN`. |
| Mã vụ việc | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi (ví dụ: `VVBT-2026-xxx`). |
| Thời điểm tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Cán bộ tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Chưa có thì hiển thị `-`. |
| Trạng thái | - | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Nguồn hồ sơ | - | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Loại hồ sơ | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Hình thức tiếp nhận | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Lĩnh vực phát sinh thiệt hại | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Họ và tên người yêu cầu | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Số điện thoại | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Tư cách người yêu cầu | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Tỉnh/Thành phố | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Phường/Xã | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Địa chỉ chi tiết | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| **Thông tin người bị thiệt hại** | - | - | Ẩn | Control UI: Section header (Read-only).<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`. |
| Họ và tên người bị thiệt hại | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Ngày sinh | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Định dạng `dd/mm/yyyy`. |
| Loại giấy tờ thân nhân | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Số giấy tờ thân nhân | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Tỉnh/Thành phố | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Phường/Xã | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Địa chỉ chi tiết | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| **Văn bản làm căn cứ yêu cầu bồi thường** | - | - | Theo dữ liệu | Control UI: Data grid (Read-only).<br>- Không có dữ liệu: hiển thị `Không có dữ liệu`. |
| STT | - | - | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự dòng văn bản. |
| Tên văn bản, căn cứ | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Tải file | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị tên file đã tải lên. |
| Thao tác | - | - | - | Control UI: Link.<br>- `Xem file`: mở file của dòng tại tab mới. |
| **Bảng tài liệu đính kèm** | - | - | Theo dữ liệu | Control UI: Data grid (Read-only).<br>- Danh sách tài liệu ban đầu đã đính kèm.<br>- Không có dữ liệu: hiển thị `Không có dữ liệu`. |
| STT | - | - | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự dòng tài liệu. |
| Tên tài liệu | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| File đính kèm | - | - | Theo dữ liệu | Control UI: Text link (Read-only).<br>- Hiển thị tên file.<br>- Liên kết `Xem file` mở tab mới. |
| **Quá trình phân công** | - | - | Theo dữ liệu | Control UI: Data grid (Read-only).<br>- Theo dõi quá trình chuyển tiếp và phân công hồ sơ.<br>- Không có dữ liệu: hiển thị `Không có dữ liệu`. |
| STT | - | - | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự lượt phân công. |
| Nội dung | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Người chuyển, đơn vị chuyển, đơn vị/cán bộ nhận.<br>- `Ý kiến chỉ đạo` (nếu có). |
| Thời điểm | - | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Thời điểm chuyển/phân công.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Tình trạng | - | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| **Lịch sử xử lý** | - | - | Theo dữ liệu | Control UI: Timeline (Read-only).<br>- Sắp xếp mới nhất lên đầu.<br>- Mỗi dòng gồm `[Hành động] - [Người thực hiện] - [Thời điểm]` và nội dung. |
| Thanh thao tác cuối màn hình | - | - | Theo điều kiện | Control UI: Action bar.<br>- Hiển thị các nút theo bảng Chức năng trên màn hình bên dưới. |

###### 4.3.3.1.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | - Luôn hiển thị.<br>- Đóng màn hình xem chi tiết, quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 2 | In Phiếu tiếp nhận | Button | - **Hiển thị khi**: Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới` và `Hình thức tiếp nhận` = `Trực tiếp`, ở mọi trạng thái.<br>- Click nút: mở [MH04 - Popup In Phiếu tiếp nhận hồ sơ](#43315-mh04---popup-in-phiếu-tiếp-nhận-hồ-sơ). |
| 3 | Sửa | Button | - **Hiển thị khi** đồng thời:<br>+ Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`.<br>+ Hồ sơ do chính người dùng tiếp nhận.<br>+ Hồ sơ ở trạng thái `Chờ phân công`, chưa có lãnh đạo nào thao tác (chưa có lượt chuyển/phân công).<br>- Click nút: mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở chế độ sửa. |
| 4 | Xóa | Button | - **Hiển thị khi**: Cùng điều kiện với nút `Sửa`.<br>- Click nút: hiển thị popup xác nhận xóa (Custom Confirmation Modal) với nội dung [MSG-CFM-SYS-001].<br>- Tại popup, người dùng chọn:<br>+ **Đồng ý**: Xóa mềm hồ sơ như chức năng Xóa (STT 7 của MH01); hiển thị thông báo [MSG-SUC-BTNN-TN-001]; quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).<br>+ **Hủy bỏ**: Đóng popup, giữ nguyên màn hình chi tiết. |
| 5 | Phân công | Button | - **Hiển thị khi** đồng thời:<br>+ Người dùng thuộc Nhóm lãnh đạo của đơn vị đang phân công tại Cấu hình luồng xử lý.<br>+ Hồ sơ ở trạng thái `Chờ phân công` hoặc `Đang phân công`.<br>- Click nút: mở [MH05 - Popup Phân công xử lý hồ sơ](#tn-mh05-phan-cong). |
| 6 | Thu hồi | Button | - **Hiển thị khi** đồng thời:<br>+ Người dùng thuộc Nhóm lãnh đạo của đơn vị đã chuyển/phân công hồ sơ.<br>+ Hồ sơ thỏa điều kiện thu hồi tại quy tắc 7 của [Quy tắc chung - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-quy-tac-chung): hồ sơ `Đang phân công` tại đơn vị nhận, hoặc `Chờ tiếp nhận` khi cán bộ chưa tiếp nhận.<br>- Click nút: mở [MH05 - Popup Xác nhận thu hồi - Dashboard Lãnh đạo - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_ViecChoLanhDaoXuLy.md#vcld-mh05). |

- Nút không thỏa điều kiện hiển thị: không hiển thị trên thanh thao tác.

---

##### 4.3.3.1.5. MH04 - Popup In Phiếu tiếp nhận hồ sơ

###### 4.3.3.1.5.1. Màn hình

![Popup In Phiếu tiếp nhận hồ sơ](images/UC_Tiep_nhan_yeu_cau_MH04_In_phieu_tiep_nhan.png)

###### 4.3.3.1.5.2. Mô tả thông tin trên màn hình

- Nội dung phiếu theo Mẫu số 02/BTNN - Giấy tiếp nhận yêu cầu bồi thường: [Mau_02_BTNN_Template.docx](Bieu_mau/Mau_02_BTNN_Template.docx).
- Dữ liệu điền vào phiếu theo [Mẫu số 02/BTNN - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md).

###### 4.3.3.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tải file | Button | - Tải phiếu về dạng file Word.<br>- Tên file: `Mau_02_BTNN_Giay_tiep_nhan_[Mã vụ việc].docx`. |
| 2 | In phiếu | Button | - Mở hộp thoại in của trình duyệt (`window.print()`) để in phiếu. |
| 3 | Đóng | Button | - Nút tại footer popup hoặc icon `×` trên header.<br>- Đóng popup, giữ nguyên màn hình làm việc hiện tại ([MH01](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận), [MH02](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) hoặc [MH03](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận)). |

---

<a id="tn-mh05-phan-cong"></a>
##### 4.3.3.1.6. MH05 - Popup Phân công xử lý hồ sơ

###### 4.3.3.1.6.1. Màn hình

![MH05 - Popup Phân công xử lý hồ sơ](images/UC_Tiep_nhan_ho_so_MH05_Popup_Phan_cong.png)

- Hình thức phân công bắt buộc theo đúng luồng xử lý đã cấu hình cho đơn vị đang phân công, trong luồng tương ứng với Loại hồ sơ tại [Luồng phân công theo Loại hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-luong-phan-cong); người dùng không chọn hình thức.
  + Hình thức phân công `Chuyển đơn vị`: popup chỉ hiển thị trường `Đơn vị nhận`.
  + Hình thức phân công `Phân công cán bộ`: popup chỉ hiển thị trường `Cán bộ chủ trì`.

###### 4.3.3.1.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | - | Control UI: Heading text (Read-only).<br>- Hiển thị "Phân công xử lý hồ sơ [Mã vụ việc]". |
| Thông tin ngữ cảnh | String(500) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị "Đơn vị đang phân công: [Tên đơn vị]". |
| Thông báo chưa cấu hình | String(255) | - | Ẩn | Control UI: Text (Read-only).<br>- Chỉ hiển thị khi đơn vị đang phân công chưa được cấu hình luồng xử lý.<br>- Nội dung: "Đơn vị chưa được cấu hình luồng xử lý." |
| Đơn vị nhận | Enum(String(255)) | Có (khi hiển thị) | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: "Chọn đơn vị nhận...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo Mã đơn vị hoặc Tên đơn vị.<br>- Không có đơn vị phù hợp: hiển thị "Không tìm thấy đơn vị phù hợp".<br>- Chỉ hiển thị khi luồng xử lý của đơn vị đang phân công được cấu hình Hình thức phân công là `Chuyển đơn vị`.<br>- Danh sách: các đơn vị cấp dưới trực tiếp đã chọn tại cấu hình của đơn vị đang phân công. |
| Cán bộ chủ trì | Enum(String(255)) | Có (khi hiển thị) | Trống | Control UI: Combobox có tìm kiếm, chọn 01 cán bộ.<br>- Placeholder ô tìm kiếm: "Tìm theo tên cán bộ...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo Họ tên cán bộ.<br>- Không có cán bộ phù hợp: hiển thị "Không tìm thấy cán bộ phù hợp".<br>- Chỉ hiển thị khi luồng xử lý của đơn vị đang phân công được cấu hình Hình thức phân công là `Phân công cán bộ`.<br>- Danh sách: cán bộ đã chọn tại cấu hình của đơn vị đang phân công.<br>- Hiển thị dạng "[Họ tên] - [Chức vụ]". |
| Ý kiến chỉ đạo | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập ý kiến chỉ đạo...". |

###### 4.3.3.1.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận phân công | Button | Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Bỏ trống trường bắt buộc** (Đơn vị nhận hoặc Cán bộ chủ trì):<br>+ Hiển thị "Đây là trường bắt buộc" dưới trường.<br>+ Không lưu.<br>- **TH2 - Hồ sơ không còn hợp lệ** (đã được thành viên khác xử lý, đã bị thu hồi hoặc người dùng không còn thuộc Nhóm lãnh đạo):<br>+ Hiển thị "Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phân công. Vui lòng tải lại danh sách."<br>- **TH3 - Đơn vị nhận không còn thuộc cấu hình của đơn vị đang phân công**:<br>+ Hiển thị "Đơn vị nhận không thuộc cấu hình luồng của đơn vị hiện tại."<br>- **TH4 - Hình thức phân công của đơn vị đang phân công đã thay đổi** (không còn là `Phân công cán bộ`):<br>+ Hiển thị "Đơn vị hiện tại không được cấu hình phân công cán bộ."<br>- **TH5 - Hợp lệ, đã chọn Đơn vị nhận (Chuyển đơn vị)**:<br>+ Lượt chuyển gần nhất (nếu có) chuyển "Đã xử lý"; tạo lượt chuyển mới "Chưa xử lý".<br>+ Đơn vị đang phân công = Đơn vị nhận; hồ sơ chuyển `Đang phân công`.<br>+ Ghi Lịch sử xử lý "Chuyển đơn vị": "Chuyển [Đơn vị nhận] phân công. Ý kiến chỉ đạo: [Nội dung]".<br>- **TH6 - Hợp lệ, đã chọn Cán bộ chủ trì (Phân công cán bộ)**:<br>+ Lượt chuyển gần nhất (nếu có) chuyển "Đã xử lý"; tạo lượt chuyển mới "Chưa xử lý".<br>+ Lưu Cán bộ chủ trì.<br>+ Hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ tương ứng với Loại hồ sơ (Xác định cơ quan giải quyết bồi thường hoặc Giải quyết yêu cầu bồi thường).<br>+ Ghi Lịch sử xử lý "Phân công cán bộ": "Chủ trì: [Họ tên]. Ý kiến chỉ đạo: [Nội dung]".<br>- Sau TH5, TH6:<br>+ Hồ sơ nguồn khác `Tiếp nhận mới` chưa có Cán bộ tiếp nhận: ghi người phân công làm Cán bộ tiếp nhận.<br>+ Đóng popup, tải lại danh sách; hồ sơ chuyển sang tab `Đã xử lý` của người phân công.<br>+ Hiển thị "Đã phân công hồ sơ [Mã vụ việc]. Trạng thái: [Trạng thái]." |
| 2 | Hủy bỏ / Đóng (x) | Button / Icon | - Đóng popup, không lưu. |

---
