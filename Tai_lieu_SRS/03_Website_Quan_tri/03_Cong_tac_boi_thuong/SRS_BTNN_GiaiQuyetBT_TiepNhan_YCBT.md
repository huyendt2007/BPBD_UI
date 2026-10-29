### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.1. Tiếp nhận hồ sơ

##### 4.3.3.1.1. Mục đích
Quản lý tập trung bước tiếp nhận ban đầu và phân công xử lý hồ sơ của 02 Loại hồ sơ: `Xác định cơ quan giải quyết bồi thường` và `Giải quyết yêu cầu bồi thường`, bao gồm:
- Tra cứu danh sách hồ sơ theo mã vụ việc, loại hồ sơ, nguồn hồ sơ, người yêu cầu, hình thức tiếp nhận, lĩnh vực phát sinh thiệt hại, trạng thái và khoảng thời gian tiếp nhận.
- Hồ sơ được nhận diện bằng `Mã vụ việc` và `Họ và tên người yêu cầu`.
- Tiếp nhận mới hồ sơ: Cán bộ tiếp nhận ghi nhận thông tin tổng quan (loại hồ sơ, hình thức tiếp nhận, lĩnh vực phát sinh thiệt hại), thông tin người yêu cầu, thông tin người bị thiệt hại (khi người yêu cầu không phải là người bị thiệt hại) và đính kèm tài liệu ban đầu.
- Duyệt tiếp nhận: hồ sơ `Tiếp nhận mới` có `Hình thức tiếp nhận` = `Trực tiếp` / `Qua dịch vụ bưu chính` sau khi lưu chuyển `Chờ duyệt tiếp nhận`, hệ thống sinh Phiếu tiếp nhận (Dự thảo) và trình Lãnh đạo các cấp ký duyệt theo luồng đã cấu hình; Lãnh đạo cấp cuối Ký duyệt thì hồ sơ chuyển `Chờ phân công`, Lãnh đạo Từ chối thì hồ sơ chuyển `Bị trả lại`, theo [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).
- Nhận hồ sơ từ các nguồn khác vào danh sách để Lãnh đạo phân công:
  + Hồ sơ gửi từ Dịch vụ công.
  + Hồ sơ do cơ quan khác Chuyển CQGQBT đến (thao tác Chuyển CQGQBT, hoặc Không thụ lý với lý do KTL_01 tại phân hệ Giải quyết yêu cầu bồi thường; Bộ Tư pháp / Sở Tư pháp nhận hồ sơ Loại hồ sơ `Xác định cơ quan giải quyết bồi thường` khi cơ quan chuyển chọn `Chuyển hồ sơ cho` = `Bộ Tư pháp` / `Sở Tư pháp [Tên tỉnh, thành phố]`, theo [Quy tắc Chuyển hồ sơ cho - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-ktl-quy-tac-chuyen)).
  + Hồ sơ do Bộ Tư pháp / Sở Tư pháp chuyển đến sau khi hoàn thành Xác định cơ quan giải quyết bồi thường.
  + Hồ sơ do cơ quan khác chuyển đến chỉ kèm văn bản đã ký và `Tài liệu ban hành kèm theo`; không kèm `Tài liệu không ban hành kèm theo` theo [Quy tắc Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#xd-tai-lieu-trinh-ky).
- Phân công: Lãnh đạo chuyển hồ sơ xuống đơn vị cấp dưới hoặc phân công trực tiếp cán bộ xử lý theo luồng tương ứng với Loại hồ sơ tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).
- Khi phân công cán bộ, hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ **Xác định cơ quan giải quyết bồi thường** hoặc phân hệ **Giải quyết yêu cầu bồi thường** theo Loại hồ sơ.
- Thu hồi: Lãnh đạo thu hồi lượt Chuyển đơn vị / Phân công cán bộ gần nhất của đơn vị mình khi bên nhận chưa xử lý.
- Lãnh đạo Phân công, Thu hồi hồ sơ tại màn hình này; Ký duyệt / Từ chối Phiếu tiếp nhận tại màn hình này hoặc màn hình Việc chờ Lãnh đạo xử lý.
- Danh sách chia 02 tab `Chờ xử lý` / `Đã xử lý` theo thao tác của người dùng đang đăng nhập trên từng hồ sơ.
- Hồ sơ cũng có thể được tạo trực tiếp tại phân hệ Xác định cơ quan giải quyết bồi thường và phân hệ Giải quyết yêu cầu bồi thường; hồ sơ tạo trực tiếp không đi qua màn hình này.

a. Phân quyền
Hệ thống phân quyền thao tác theo các quyền nghiệp vụ được cấp:
- **Xem**: Tra cứu danh sách hồ sơ, xem chi tiết, tài liệu đính kèm, quá trình phân công và lịch sử xử lý.
- **Tạo mới**: Tiếp nhận mới hồ sơ, nhập thông tin tiếp nhận ban đầu và đính kèm tài liệu.
- **Sửa**: Sửa thông tin tiếp nhận khi đồng thời:
  + Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`.
  + Hồ sơ do chính người dùng tiếp nhận.
  + Hồ sơ ở trạng thái `Bị trả lại` (cập nhật để trình lại Phiếu tiếp nhận).
  + Hồ sơ ở trạng thái khác (`Chờ duyệt tiếp nhận`, `Chờ phân công`, `Đang phân công` và các trạng thái sau) không được Sửa.
  + Hồ sơ thuộc các nguồn khác không được Sửa.
- **Xóa**: Cùng điều kiện với quyền Sửa.
- **Ký duyệt / Từ chối Phiếu tiếp nhận**: Người dùng thuộc Nhóm lãnh đạo của cấp đang ký duyệt Phiếu tiếp nhận, hồ sơ ở trạng thái `Chờ duyệt tiếp nhận`, theo [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).
- **Phân công**: Chuyển đơn vị hoặc Phân công cán bộ khi đồng thời:
  + Hồ sơ ở trạng thái `Chờ phân công` / `Đang phân công`.
  + Người dùng thuộc Nhóm lãnh đạo của đơn vị đang phân công.
  + Chi tiết tại [Quy tắc phân công - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-quy-tac-phan-cong).
- **Thu hồi**: Thu hồi lượt Chuyển đơn vị / Phân công cán bộ gần nhất do đơn vị của người dùng thực hiện, khi bên nhận chưa xử lý; chi tiết tại [Quy tắc Thu hồi - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-thu-hoi).
- **Lãnh đạo**: tài khoản thuộc Nhóm lãnh đạo của đơn vị tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).
  + Không có chức năng ủy quyền Phân công, Thu hồi.
- <a id="tn-pham-vi-loai-ho-so"></a>**Loại hồ sơ theo đơn vị**:
  + Ô chọn, bộ lọc `Loại hồ sơ` và danh sách hồ sơ chỉ gồm các giá trị của [Danh mục Loại hồ sơ - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_54] có `Đơn vị áp dụng` chứa đơn vị của người dùng, theo [Phân quyền theo đơn vị và Đơn vị áp dụng - Quản lý danh mục dùng chung (Master Data) - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md#dm-don-vi-ap-dung).
  + Tính cả đơn vị cha: chọn đơn vị cha thì áp dụng cho toàn bộ đơn vị trực thuộc.
  + `Xác định cơ quan giải quyết bồi thường` chỉ áp dụng cho Bộ Tư pháp và các Sở Tư pháp; Lãnh đạo đơn vị khác không thấy hồ sơ loại này.
  + Ủy ban nhân dân cấp tỉnh không tiếp nhận, không phân công, không phê duyệt hồ sơ Xác định cơ quan giải quyết bồi thường; chỉ xem hồ sơ của Sở Tư pháp trực thuộc tại phân hệ Xác định cơ quan giải quyết bồi thường.

b. Điều kiện thực hiện
- Người dùng đã đăng nhập vào hệ thống thành công (Website quản trị).
- Người dùng được phân quyền truy cập chức năng "Tiếp nhận hồ sơ".
- Phân công, Thu hồi: đơn vị gốc của hồ sơ đã được cấu hình luồng xử lý tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).

<a id="tn-nguon-ho-so"></a>
c. Nguồn hồ sơ

| Nguồn hồ sơ | Cách tạo | Loại hồ sơ | Hình thức tiếp nhận | Cán bộ tiếp nhận |
| :--- | :--- | :--- | :--- | :--- |
| `Tiếp nhận mới` | Cán bộ tiếp nhận nhập tại [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ). | Cán bộ chọn | Cán bộ chọn `Trực tiếp` hoặc `Qua dịch vụ bưu chính`. | Người tạo hồ sơ. |
| `Dịch vụ công` | - Hệ thống tự tạo khi nhận hồ sơ gửi từ Dịch vụ công.<br>- Đơn vị tiếp nhận là cơ quan giải quyết bồi thường người dân đã chọn.<br>- Hồ sơ gồm đầy đủ thông tin người dân đã nhập trên Dịch vụ công theo [Hồ sơ nguồn Dịch vụ công - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-dvc). | `Giải quyết yêu cầu bồi thường` (cố định) | `Dịch vụ công` (cố định). | - Người đầu tiên thao tác Phân công hồ sơ tại màn hình này.<br>- Trước đó hiển thị `-`. |
| `Chuyển CQGQBT` | - Hệ thống tự tạo tại phân hệ Giải quyết yêu cầu bồi thường khi:<br>+ Cấp cuối phê duyệt Nội dung trình `Chuyển CQGQBT`.<br>+ Cấp cuối phê duyệt Nội dung trình `Không thụ lý` với lý do `KTL_01`; hồ sơ được chuyển theo lựa chọn tại khối `Chuyển hồ sơ cho` ([Quy tắc Chuyển hồ sơ cho - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-ktl-quy-tac-chuyen)) ([Không thụ lý hồ sơ yêu cầu bồi thường - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-khong-thu-ly)).<br>- Đơn vị tiếp nhận là cơ quan được chuyển đến:<br>+ `Bộ Tư pháp`: Bộ Tư pháp (bộ phận Xác định CQGQBT).<br>+ `Sở Tư pháp [Tên tỉnh, thành phố]`: Sở Tư pháp cùng tỉnh, thành phố với đơn vị gốc của tài khoản Không thụ lý (bộ phận Xác định CQGQBT); UBND cấp tỉnh chỉ xem.<br>+ `Cơ quan giải quyết bồi thường khác` và thao tác `Chuyển CQGQBT`: đơn vị đã chọn tại `Cơ quan tiếp nhận mới`.<br>- Giữ nguyên `Mã vụ việc` của hồ sơ gốc; kèm văn bản Mẫu 04/BTNN - Thông báo không thụ lý hồ sơ yêu cầu bồi thường (với lý do `KTL_01`), Nội dung/Căn cứ chuyển, tài liệu đính kèm và toàn bộ tài liệu hồ sơ. | - `Xác định cơ quan giải quyết bồi thường`: Không thụ lý lý do `KTL_01`, lựa chọn `Bộ Tư pháp` hoặc `Sở Tư pháp [Tên tỉnh, thành phố]` (từ đơn vị thứ 2 của hồ sơ Tiếp nhận mới / Dịch vụ công chưa qua Xác định CQGQBT: bắt buộc, hệ thống tự tạo).<br>- `Giải quyết yêu cầu bồi thường`: thao tác `Chuyển CQGQBT`; Không thụ lý lý do `KTL_01`, lựa chọn `Cơ quan giải quyết bồi thường khác`. | Kế thừa từ hồ sơ gốc. | Như nguồn `Dịch vụ công`. |
| `Xác định CQGQBT` | - Hệ thống tự tạo khi Lãnh đạo cấp cuối của Bộ Tư pháp / Sở Tư pháp Ký duyệt văn bản Kết quả xác định CQGQBT tại phân hệ Xác định cơ quan giải quyết bồi thường (tự động chuyển CQGQBT, theo [Tự động chuyển CQGQBT - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md)).<br>- Đơn vị tiếp nhận là CQGQBT đã chọn tại kết quả xác định (`Chọn CQGQBT trên hệ thống`). | `Giải quyết yêu cầu bồi thường` | Kế thừa từ hồ sơ gốc. | Như nguồn `Dịch vụ công`. |

- Hồ sơ mới ở trạng thái `Chờ phân công` tại đơn vị gốc của đơn vị tiếp nhận, trừ hồ sơ `Tiếp nhận mới` có `Hình thức tiếp nhận` = `Trực tiếp` / `Qua dịch vụ bưu chính`:
  + Sau khi lưu: trạng thái `Chờ duyệt tiếp nhận`.
  + Lãnh đạo cấp cuối Ký duyệt Phiếu tiếp nhận: trạng thái `Chờ phân công` tại đơn vị gốc.
  + Chi tiết tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).
- `Hình thức tiếp nhận` tham chiếu [Danh mục Hình thức tiếp nhận - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_25].
  + Tại Tiếp nhận hồ sơ chỉ áp dụng `Dịch vụ công`, `Trực tiếp`, `Bộ phận Một cửa`, `Qua dịch vụ bưu chính`; giá trị `Cán bộ chủ động phục hồi danh dự khi có đủ thông tin` chỉ do hệ thống gán cho hồ sơ tạo tại [Hồ sơ cán bộ chủ động phục hồi danh dự - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-cdpd).
- Form Tiếp nhận mới chỉ cho chọn `Trực tiếp`, `Qua dịch vụ bưu chính`.

<a id="tn-ma-vu-viec"></a>
d. Mã vụ việc và mã hồ sơ
- `Mã vụ việc` (`VVBT-yyyy-xxx`) là mã toàn trình, duy nhất trên hệ thống; mỗi vụ việc chỉ quản lý 01 `Mã vụ việc`.
- Hệ thống sinh `Mã vụ việc` **01 lần** tại điểm vào đầu tiên của vụ việc:
  + Tiếp nhận mới tại [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ).
  + Nhận hồ sơ từ Dịch vụ công.
  + Thêm mới trực tiếp tại phân hệ Xác định cơ quan giải quyết bồi thường hoặc Giải quyết yêu cầu bồi thường, khi chọn `Mã vụ việc` = `Vụ việc mới`.
- Mọi bước xử lý sau kế thừa `Mã vụ việc`, không sinh lại.
- `Mã vụ việc` chỉ đọc, không cho sửa.
- Số thứ tự đã cấp không cấp lại, kể cả khi hồ sơ bị xóa.
- Mỗi phân hệ xử lý có `Mã hồ sơ` riêng, sinh khi hồ sơ vào phân hệ và luôn gắn với `Mã vụ việc`:
  + Phân hệ Xác định cơ quan giải quyết bồi thường: `XD-yyyy-xxx`.
  + Phân hệ Giải quyết yêu cầu bồi thường: `BT-yyyy-xxx`; dùng 01 mã cho cả 03 giá trị `Loại yêu cầu giải quyết bồi thường` (bồi thường tiền, phục hồi danh dự, cả hai).
  + Phân hệ Xem xét hoàn trả: `HT-yyyy-xxx`.
- Kế thừa mã khi hồ sơ chuyển tiếp:

| Chuyển tiếp | Mã vụ việc | Mã hồ sơ |
| :--- | :--- | :--- |
| Tiếp nhận hồ sơ → Xác định CQGQBT / Giải quyết YCBT | Giữ nguyên | Sinh `XD-` / `BT-` |
| Xác định CQGQBT → Giải quyết YCBT | Giữ nguyên | Sinh `BT-` |
| Chuyển CQGQBT sang cơ quan khác | Giữ nguyên | Sinh `BT-` mới tại cơ quan nhận; hồ sơ cũ đóng |
| Không thụ lý lý do `KTL_01` - `Bộ Tư pháp` / `Sở Tư pháp [Tên tỉnh, thành phố]` | Giữ nguyên | Sinh `XD-` ngay khi hệ thống tạo hồ sơ mới ở trạng thái `Chờ phân công` tại Bộ Tư pháp / Sở Tư pháp; hồ sơ cũ đóng |
| Không thụ lý lý do `KTL_01` - `Cơ quan giải quyết bồi thường khác` | Giữ nguyên | Sinh `BT-` mới ngay khi hệ thống tạo hồ sơ mới ở trạng thái `Chờ phân công` tại cơ quan nhận; hồ sơ cũ đóng |
| Giải quyết YCBT → Xem xét hoàn trả | Giữ nguyên | Sinh `HT-` |

- 01 vụ việc chỉ có 01 hồ sơ hoàn trả; danh sách người thi hành công vụ gây thiệt hại quản lý trong hồ sơ đó.
- Người yêu cầu nộp lại hồ sơ sau khi bị từ chối: hồ sơ là vụ việc mới, hệ thống sinh `Mã vụ việc` mới.
- Trường `Vụ việc liên quan` (không bắt buộc) ghi nhận vụ việc trước đó:
  + Có tại các form sinh `Mã vụ việc` mới: [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ), Thêm mới trực tiếp tại Xác định CQGQBT / Giải quyết YCBT khi chọn `Vụ việc mới`.
  + Chọn từ danh sách vụ việc trên hệ thống; hiển thị `Mã vụ việc - Họ và tên người yêu cầu`.
  + Kế thừa sang hồ sơ của các bước sau.
- Thêm mới trực tiếp tại Xác định CQGQBT / Giải quyết YCBT có trường `Mã vụ việc` (Radio button):
  + `Vụ việc mới` (mặc định): hệ thống sinh `Mã vụ việc` khi lưu.
  + `Vụ việc đã có Mã vụ việc`: bắt buộc chọn vụ việc; hồ sơ mới mang `Mã vụ việc` đã chọn, không sinh mã mới.
- Hiển thị thống nhất trên mọi phân hệ:
  + Cột/nhãn `Mã vụ việc` hiển thị `VVBT-...`.
  + Cột/nhãn `Mã hồ sơ` hiển thị mã của phân hệ đó.
  + Bộ lọc `Mã vụ việc` tìm theo `VVBT-...`.
  + Định danh vụ việc: `Mã vụ việc - Họ và tên người yêu cầu`.

<a id="tn-luong-phan-cong"></a>
e. Luồng phân công theo Loại hồ sơ

| Loại hồ sơ | Đơn vị tiếp nhận | Luồng áp dụng tại Cấu hình luồng xử lý | Nhánh luồng |
| :--- | :--- | :--- | :--- |
| Xác định cơ quan giải quyết bồi thường | Bộ Tư pháp | `Xác định CQGQBT - Bộ Tư pháp` | Lãnh đạo Bộ Tư pháp → Lãnh đạo Cục Giao dịch bảo đảm và bồi thường nhà nước → Lãnh đạo Phòng/Ban phụ trách → Cán bộ |
| Xác định cơ quan giải quyết bồi thường | Sở Tư pháp | `Xác định CQGQBT - Sở Tư pháp` của Sở Tư pháp đó | Lãnh đạo Sở Tư pháp → Lãnh đạo Phòng phụ trách → Cán bộ |
| Giải quyết yêu cầu bồi thường | Cơ quan giải quyết bồi thường | `Giải quyết YCBT` của đơn vị gốc | Theo cấu hình của từng cơ quan |

- Hệ thống chọn luồng theo Loại hồ sơ và đơn vị gốc tại thời điểm Lãnh đạo thao tác Phân công.

<a id="tn-quy-tac-phan-cong"></a>
f. Quy tắc phân công

| STT | Nội dung | Quy tắc |
| :-- | :--- | :--- |
| 1 | Đơn vị gốc và đơn vị đang phân công | - Đơn vị gốc là đơn vị cấp cao nhất trên cây Cơ cấu tổ chức chứa đơn vị tiếp nhận của hồ sơ theo [Nguồn hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-nguon-ho-so).<br>- Hồ sơ mới ở trạng thái `Chờ phân công`; đơn vị đang phân công là đơn vị gốc.<br>- Mỗi lần Chuyển đơn vị: đơn vị đang phân công đổi thành đơn vị nhận, hồ sơ chuyển `Đang phân công`. |
| 2 | Người phân công | - Bất kỳ tài khoản nào thuộc Nhóm lãnh đạo của đơn vị đang phân công đều được phân công hồ sơ.<br>- Người thao tác trước xử lý hồ sơ; hồ sơ không còn ở tab `Chờ xử lý` của các thành viên khác trong nhóm.<br>- Không có chức năng ủy quyền. |
| 3 | Hình thức phân công | - Chỉ dùng Hình thức phân công đã cấu hình cho đơn vị đang phân công, trong Loại luồng tương ứng với Loại hồ sơ theo [Luồng phân công theo Loại hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-luong-phan-cong).<br>- `Chuyển đơn vị`: chỉ chuyển đến đơn vị cấp dưới trực tiếp đã chọn tại cấu hình.<br>- `Phân công cán bộ`: chỉ chọn cán bộ đã chọn tại cấu hình.<br>- Không có thao tác "Trả lại" hồ sơ lên cấp trên; cấp trên dùng `Thu hồi`. |
| 4 | Thời hạn | - Không quy định thời hạn cho từng bước phân công. |
| 5 | Lượt chuyển và tình trạng | - Mỗi lần Chuyển đơn vị hoặc Phân công cán bộ tạo 01 lượt chuyển tại `Quá trình phân công`, Tình trạng ban đầu `Chưa xử lý`.<br>- Lượt chuyển đến đơn vị chuyển `Đã xử lý` khi Lãnh đạo đơn vị nhận Chuyển đơn vị hoặc Phân công cán bộ tiếp.<br>- Lượt chuyển đến cán bộ chuyển `Đã xử lý` khi cán bộ chủ trì thực hiện `Tiếp nhận` hồ sơ tại phân hệ xử lý.<br>- Bên nhận mở xem hồ sơ lần đầu (Lãnh đạo đơn vị nhận mở popup Phân công; cán bộ chủ trì mở hồ sơ): hệ thống ghi thời điểm xem, Tình trạng hiển thị `Chưa xử lý - Đã xem lúc [dd/mm/yyyy HH:mm]`.<br>- Chưa xem: hiển thị `Chưa xử lý - Chưa xem`.<br>- Việc xem hồ sơ không tính là đã xử lý. |
| 6 | Kiểm tra đồng thời | - Thao tác Phân công, Thu hồi kiểm tra lại trạng thái hồ sơ và quyền của người dùng tại máy chủ ngay khi mở popup và khi xác nhận.<br>- Mở popup Phân công mà hồ sơ đã được xử lý: hiển thị [MSG-ERR-BTNN-LXL-001], tải lại danh sách.<br>- Xác nhận Phân công mà không còn hợp lệ: hiển thị [MSG-ERR-BTNN-LXL-002].<br>- Thu hồi mà bên nhận đã xử lý: hiển thị [MSG-ERR-BTNN-LXL-004]. |
| 7 | Lịch sử xử lý | - Mỗi thao tác ghi 01 dòng `Lịch sử xử lý` gồm Hành động, Người thực hiện, Thời điểm, Nội dung.<br>- Hành động của Lãnh đạo tại Tiếp nhận hồ sơ:<br>+ `Chuyển đơn vị`<br>+ `Phân công cán bộ`<br>+ `Thu hồi` |

<a id="tn-trang-thai"></a>
g. Trạng thái tại màn hình Tiếp nhận hồ sơ

| Trạng thái | Ý nghĩa | Hiển thị với Lãnh đạo |
| :--- | :--- | :--- |
| `Chờ duyệt tiếp nhận` | - Hồ sơ `Tiếp nhận mới` có `Hình thức tiếp nhận` = `Trực tiếp` / `Qua dịch vụ bưu chính` đã lưu (hoặc đã cập nhật, trình lại).<br>- Phiếu tiếp nhận (Dự thảo) đang chờ Lãnh đạo các cấp ký duyệt theo luồng đã cấu hình.<br>- Chưa vào luồng phân công; chưa hiển thị tại các phân hệ xử lý. | - Tab `Chờ xử lý` của Nhóm lãnh đạo cấp đang ký duyệt.<br>- Tab `Đã xử lý` của Lãnh đạo đã Ký duyệt cấp trước. |
| `Bị trả lại` | - Lãnh đạo Từ chối Phiếu tiếp nhận.<br>- Cán bộ tiếp nhận cập nhật hồ sơ để trình lại. | - Tab `Đã xử lý` của Lãnh đạo đã Ký duyệt / Từ chối. |
| `Chờ phân công` | - Hồ sơ mới (nguồn khác `Tiếp nhận mới`), đang chờ Lãnh đạo đơn vị gốc phân công.<br>- Hồ sơ `Tiếp nhận mới` đã được Lãnh đạo cấp cuối Ký duyệt Phiếu tiếp nhận.<br>- Hoặc hồ sơ đã được thu hồi về đơn vị gốc. | - Tab `Chờ xử lý` của Nhóm lãnh đạo đơn vị gốc. |
| `Đang phân công` | - Lãnh đạo đã chuyển hồ sơ cho đơn vị cấp dưới.<br>- Hồ sơ đang chờ Lãnh đạo đơn vị nhận phân công tiếp. | - Tab `Chờ xử lý` của Nhóm lãnh đạo đơn vị đang phân công.<br>- Tab `Đã xử lý` của Lãnh đạo đã chuyển. |
| `Chờ tiếp nhận` | - Lãnh đạo đã phân công cán bộ chủ trì.<br>- Hồ sơ chờ cán bộ chủ trì tiếp nhận tại phân hệ xử lý tương ứng với `Loại hồ sơ` (Xác định cơ quan giải quyết bồi thường hoặc Giải quyết yêu cầu bồi thường). | - Tab `Đã xử lý` của Lãnh đạo đã phân công. |

- Trạng thái từ bước cán bộ chủ trì tiếp nhận trở đi mô tả tại [Xác định cơ quan giải quyết bồi thường - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md) và [Giải quyết yêu cầu bồi thường - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md).

<a id="tn-tab-xu-ly"></a>
h. Quy tắc 02 tab Chờ xử lý / Đã xử lý
- Tab của hồ sơ xác định theo thao tác của người dùng đang đăng nhập trên hồ sơ đó, không cố định theo trạng thái.
- Cùng 01 hồ sơ có thể nằm ở tab `Chờ xử lý` của người dùng này và tab `Đã xử lý` của người dùng khác.

| Vai trò | Tab `Chờ xử lý` | Tab `Đã xử lý` |
| :--- | :--- | :--- |
| Cán bộ tiếp nhận | - Hồ sơ do người dùng tiếp nhận (`Nguồn hồ sơ` = `Tiếp nhận mới`).<br>- Hồ sơ chưa được phân công đến cán bộ xử lý (`Chờ duyệt tiếp nhận`, `Bị trả lại`, `Chờ phân công`, `Đang phân công`). | - Hồ sơ do người dùng tiếp nhận.<br>- Hồ sơ đã được phân công cán bộ xử lý (từ `Chờ tiếp nhận` trở đi). |
| Lãnh đạo (thuộc Nhóm lãnh đạo tại Cấu hình luồng xử lý) | - Hồ sơ `Chờ phân công` / `Đang phân công`; đơn vị đang phân công là đơn vị mà Lãnh đạo thuộc Nhóm lãnh đạo, theo [Quy tắc phân công - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-quy-tac-phan-cong).<br>- Hồ sơ `Chờ duyệt tiếp nhận`; Lãnh đạo thuộc Nhóm lãnh đạo của cấp đang ký duyệt Phiếu tiếp nhận. | - Hồ sơ Lãnh đạo đã Chuyển đơn vị / Phân công cán bộ.<br>- Trạng thái có thể vẫn là `Đang phân công` khi đơn vị cấp dưới chưa phân công tiếp.<br>- Hồ sơ Lãnh đạo đã Ký duyệt / Từ chối Phiếu tiếp nhận, không còn chờ Lãnh đạo xử lý. |

- Luồng điển hình:
  + Cán bộ tiếp nhận lưu hồ sơ `Trực tiếp`: hồ sơ `Chờ duyệt tiếp nhận`, ở tab `Chờ xử lý` của cán bộ và của Nhóm lãnh đạo cấp ký duyệt 1.
  + Lãnh đạo cấp 1 Ký duyệt: hồ sơ sang tab `Đã xử lý` của Lãnh đạo cấp 1, hiển thị tại tab `Chờ xử lý` của Nhóm lãnh đạo cấp 2.
  + Lãnh đạo cấp cuối Ký duyệt: hồ sơ `Chờ phân công`, hiển thị tại tab `Chờ xử lý` của Nhóm lãnh đạo đơn vị gốc.
  + Cán bộ tiếp nhận của Sở Tư pháp tạo hồ sơ: hồ sơ ở tab `Chờ xử lý` của cán bộ.
  + Lãnh đạo Sở chuyển hồ sơ cho Lãnh đạo Phòng: hồ sơ sang tab `Đã xử lý` của Lãnh đạo Sở (trạng thái `Đang phân công`), hiển thị tại tab `Chờ xử lý` của Lãnh đạo Phòng, vẫn ở tab `Chờ xử lý` của cán bộ tiếp nhận.
  + Lãnh đạo Phòng phân công cán bộ xử lý: hồ sơ chuyển `Chờ tiếp nhận`, sang tab `Đã xử lý` của Lãnh đạo Phòng và của cán bộ tiếp nhận.
- Thu hồi thành công: hồ sơ trở lại tab `Chờ xử lý` của Lãnh đạo đã thu hồi.
- Badge số lượng tab `Chờ xử lý` và mục menu `Tiếp nhận hồ sơ`: theo trường `Tab danh sách` tại [MH01 - Màn hình Danh sách hồ sơ tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận); tab `Đã xử lý` không có badge.
- Mặc định mở tab `Chờ xử lý`.
- Nút `Tiếp nhận mới`: chỉ hiển thị khi chọn tab `Chờ xử lý`; khi chuyển sang tab `Đã xử lý` thì hệ thống tự động ẩn nút này.
- Trường `Trạng thái` của bộ lọc chỉ gồm các trạng thái đang có của hồ sơ thuộc tab đang chọn.
- Click dòng hồ sơ: mở [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận) của bản ghi.

<a id="tn-thu-hoi"></a>
i. Quy tắc Thu hồi

- Thu hồi dùng để lấy lại hồ sơ Lãnh đạo đã Chuyển đơn vị hoặc Phân công cán bộ khi bên nhận chưa xử lý. Không có thao tác "Trả lại" từ cấp dưới lên cấp trên; cấp trên dùng Thu hồi.
- **Người thực hiện**: Lãnh đạo thuộc Nhóm lãnh đạo (tại Cấu hình luồng xử lý) của đơn vị đã thực hiện lượt chuyển gần nhất của hồ sơ.
- **Vị trí thao tác**: tab `Đã xử lý` của [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận) và [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận).
- **Điều kiện thu hồi** (thỏa đồng thời):
  + Chỉ thu hồi **lượt chuyển gần nhất** trong `Quá trình phân công`; không thu hồi lượt chuyển trước đó khi đã có lượt chuyển tiếp theo.
  + Lượt chuyển gần nhất có Tình trạng `Chưa xử lý`.
  + Theo hình thức của lượt chuyển gần nhất:

| Hình thức lượt chuyển | Hồ sơ được thu hồi khi | Hồ sơ không còn được thu hồi khi |
| :--- | :--- | :--- |
| `Chuyển đơn vị` | Hồ sơ `Đang phân công` tại đơn vị nhận (Lãnh đạo đơn vị nhận chưa Chuyển đơn vị / Phân công cán bộ tiếp) | Lãnh đạo đơn vị nhận đã Chuyển đơn vị hoặc Phân công cán bộ |
| `Phân công cán bộ` | Hồ sơ `Chờ tiếp nhận` (cán bộ chủ trì chưa tiếp nhận tại phân hệ xử lý) | Cán bộ chủ trì đã thao tác trên hồ sơ tại phân hệ xử lý (Tiếp nhận, Yêu cầu bổ sung, Không thụ lý...) |

  + Bên nhận đã mở xem hồ sơ vẫn được thu hồi; việc xem không tính là đã xử lý.
- **Kết quả thu hồi**:
  + Xóa lượt chuyển gần nhất khỏi `Quá trình phân công`.
  + Hồ sơ trở lại đơn vị đã chuyển:
    - Không còn lượt chuyển nào (đơn vị đã chuyển là đơn vị gốc): trạng thái `Chờ phân công`.
    - Còn lượt chuyển trước đó: trạng thái `Đang phân công`; lượt chuyển liền trước trở lại Tình trạng `Chưa xử lý`.
  + Thu hồi lượt `Phân công cán bộ`: xóa cán bộ chủ trì; hồ sơ không còn hiển thị tại phân hệ xử lý (Xác định cơ quan giải quyết bồi thường / Giải quyết yêu cầu bồi thường) của cán bộ đó.
  + Hồ sơ trở lại tab `Chờ xử lý` của Lãnh đạo đã thu hồi; không còn ở tab `Chờ xử lý` của bên nhận (Lãnh đạo đơn vị nhận hoặc cán bộ chủ trì). Badge số lượng của các bên được cập nhật theo.
  + Ghi `Lịch sử xử lý`: hành động `Thu hồi`, nội dung "Thu hồi hồ sơ đã chuyển [Tên đơn vị nhận]." (Chuyển đơn vị) hoặc "Thu hồi phân công cán bộ [Họ và tên]." (Phân công cán bộ), kèm người thực hiện và thời điểm.
- **Kiểm tra đồng thời**: hệ thống kiểm tra lại điều kiện thu hồi tại máy chủ khi Lãnh đạo bấm `Thu hồi` và khi bấm `Đồng ý` trên popup; bên nhận đã xử lý trong lúc đó thì không thu hồi, hiển thị [MSG-ERR-BTNN-LXL-004].

<a id="tn-phieu-tiep-nhan"></a>
j. Quy tắc Phiếu tiếp nhận

| STT | Nội dung | Quy tắc |
| :-- | :--- | :--- |
| 1 | Văn bản | - Phiếu tiếp nhận là Mẫu số 02/BTNN - Giấy tiếp nhận yêu cầu bồi thường.<br>- Mỗi hồ sơ có 01 Phiếu tiếp nhận. |
| 2 | Hồ sơ áp dụng | - Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`.<br>- `Hình thức tiếp nhận` = `Trực tiếp` hoặc `Qua dịch vụ bưu chính`.<br>- Hồ sơ không thỏa điều kiện (nguồn `Dịch vụ công`, `Chuyển CQGQBT`, `Xác định CQGQBT`; hình thức tiếp nhận khác): không có Phiếu tiếp nhận, không qua bước duyệt tiếp nhận; hồ sơ mới ở trạng thái `Chờ phân công`.<br>- [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#tn-mh03-chi-tiet) của hồ sơ không thỏa điều kiện không hiển thị khối `Thông tin Phiếu tiếp nhận`. |
| 3 | Lập và trình Phiếu tiếp nhận | - Thực hiện khi Cán bộ tiếp nhận `Lưu thông tin` tại [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ); không có thao tác trình ký riêng.<br>- Hệ thống sinh Phiếu tiếp nhận (Dự thảo) theo Mẫu 02/BTNN từ thông tin hồ sơ và khối `Thông tin Phiếu tiếp nhận (Mẫu 02/BTNN)` của form.<br>- Hình thức ký: `Ký số trên hệ thống`.<br>- Hệ thống trình Lãnh đạo cấp 1, hồ sơ chuyển `Chờ duyệt tiếp nhận`.<br>- Chưa tạo hồ sơ luồng phân công; hồ sơ chưa hiển thị tại các phân hệ xử lý. |
| 4 | Luồng ký duyệt | - Các cấp ký duyệt theo luồng phê duyệt từ đơn vị của Cán bộ tiếp nhận lên đơn vị gốc, theo Loại luồng tương ứng với `Loại hồ sơ` tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).<br>- Người ký duyệt mỗi cấp:<br>+ Tự trình khi lưu lần đầu: bất kỳ tài khoản nào thuộc Nhóm lãnh đạo của cấp đó; người thao tác trước xử lý.<br>+ Trình ký lại tại [MH07 - Popup Trình ký lại Phiếu tiếp nhận hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh07-trinh-ky-ptn): Lãnh đạo được chọn cho từng cấp.<br>- Không xác định được cấp ký duyệt: không lưu hồ sơ, hiển thị *"Chưa xác định được cấp ký duyệt Phiếu tiếp nhận theo luồng đã cấu hình. Vui lòng liên hệ Quản trị hệ thống."* |
| 5 | Ký duyệt | - Lãnh đạo cấp trung gian Ký duyệt: hồ sơ giữ `Chờ duyệt tiếp nhận`, chuyển Nhóm lãnh đạo cấp tiếp theo.<br>- Lãnh đạo cấp cuối Ký duyệt:<br>+ Hệ thống ký số Phiếu tiếp nhận bằng chứng thư số của Lãnh đạo, ban hành Phiếu tiếp nhận.<br>+ Hồ sơ chuyển `Chờ phân công` tại đơn vị gốc; hiển thị tại tab `Chờ xử lý` của Nhóm lãnh đạo đơn vị gốc để Phân công theo [Quy tắc phân công - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-quy-tac-phan-cong). |
| 6 | Từ chối | - Lãnh đạo bất kỳ cấp nào Từ chối, bắt buộc nhập lý do từ chối.<br>- Hồ sơ chuyển `Bị trả lại`, trở về Cán bộ tiếp nhận.<br>- Cán bộ tiếp nhận `Sửa` (Cập nhật) hồ sơ; nút chính của form là `Trình ký`: hệ thống ghi nhận thông tin cập nhật, mở [MH07 - Popup Trình ký lại Phiếu tiếp nhận hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh07-trinh-ky-ptn), điền sẵn dữ liệu lần trình trước.<br>- `Trình Lãnh đạo` (Ký số): trình lại từ cấp 1, hồ sơ chuyển `Chờ duyệt tiếp nhận`.<br>- `Ban hành văn bản` (Ký ngoài): Phiếu tiếp nhận ban hành trực tiếp, hồ sơ chuyển `Chờ phân công`.<br>- Cán bộ tiếp nhận được `Xóa` hồ sơ `Bị trả lại`. |
| 7 | Lãnh đạo xử lý | - Hồ sơ `Chờ duyệt tiếp nhận` hiển thị với Nhóm lãnh đạo của cấp đang ký duyệt tại:<br>+ Tab `Chờ xử lý` của [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận), thao tác `Ký duyệt`, `Từ chối`.<br>+ [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#tn-mh03-chi-tiet), nút `Ký duyệt`, `Từ chối`.<br>+ Màn hình Việc chờ Lãnh đạo xử lý: Loại công việc `Phê duyệt`; Loại trình `Phiếu tiếp nhận`; Nội dung cần xử lý `Ký duyệt: Phiếu tiếp nhận - cấp [n]/[tổng số cấp]`; Trạng thái `Chờ duyệt tiếp nhận`.<br>- Màn hình Ký duyệt / Từ chối theo [Màn hình Ký duyệt / Từ chối - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#xd-ky-duyet); `Ý kiến ký duyệt` không bắt buộc, `Lý do từ chối` bắt buộc. |
| 8 | Trạng thái Phiếu tiếp nhận | - `Dự thảo`: hồ sơ `Chờ duyệt tiếp nhận` hoặc `Bị trả lại`.<br>- `Đã ký duyệt, ban hành`: Lãnh đạo cấp cuối đã Ký duyệt. |
| 9 | Ảnh hưởng tới hồ sơ | - Trạng thái hồ sơ theo STT 3, 5, 6.<br>- Phân công, Thu hồi hồ sơ không thay đổi Phiếu tiếp nhận. |
| 10 | Lịch sử xử lý | - Mỗi thao tác ghi 01 dòng `Lịch sử xử lý` của hồ sơ gồm Hành động, Người thực hiện, Thời điểm, Nội dung:<br>+ `Trình ký Phiếu tiếp nhận` / `Trình ký lại Phiếu tiếp nhận`: luồng ký duyệt, Lãnh đạo từng cấp, Nội dung trình.<br>+ `Ban hành Phiếu tiếp nhận (Ký ngoài)`: Số, ký hiệu văn bản, Ngày văn bản, Người ký, tệp đã ký.<br>+ `Ký duyệt Phiếu tiếp nhận`: cấp ký duyệt, Lãnh đạo cấp tiếp theo hoặc ký số và ban hành, ý kiến ký duyệt.<br>+ `Từ chối Phiếu tiếp nhận`: cấp ký duyệt, lý do từ chối.<br>+ `Tiếp nhận hồ sơ`: khi hồ sơ chuyển `Chờ phân công`. |
| 11 | Kiểm tra đồng thời | - Mở màn hình Ký duyệt / Từ chối hoặc xác nhận mà Phiếu tiếp nhận đã được xử lý: hiển thị [MSG-ERR-BTNN-LXL-001], tải lại danh sách. |
| 12 | Dữ liệu trước khi áp dụng | - Hồ sơ `Tiếp nhận mới` đã ở trạng thái `Chờ phân công` trở đi giữ nguyên trạng thái, không qua bước duyệt tiếp nhận.<br>- Phiếu tiếp nhận đã trình ký / ban hành trước đó (gồm `Ký ngoài`) vẫn hiển thị tại khối `Thông tin Phiếu tiếp nhận`. |

<a id="tn-dvc"></a>
k. Hồ sơ nguồn Dịch vụ công

| STT | Nội dung | Quy tắc |
| :-- | :--- | :--- |
| 1 | Giá trị cố định | - Dịch vụ công chỉ gửi hồ sơ `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`; không gửi hồ sơ `Xác định cơ quan giải quyết bồi thường`.<br>- `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`.<br>- `Nguồn hồ sơ` = `Dịch vụ công`.<br>- `Hình thức tiếp nhận` = `Dịch vụ công`.<br>- 03 giá trị do hệ thống gán, chỉ đọc tại mọi màn hình: danh sách, Xem chi tiết tại Tiếp nhận hồ sơ, form Tiếp nhận và các màn hình sau tiếp nhận tại phân hệ Giải quyết yêu cầu bồi thường. |
| 2 | Dữ liệu hồ sơ | - Người dân nhập trên Dịch vụ công đủ các trường của [MH02 - Màn hình Nhập liệu hồ sơ vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-mh02-nhap-lieu), trừ các trường liên kết Mã vụ việc và trường `Pháp luật áp dụng để giải quyết bồi thường`.<br>- Hệ thống lưu toàn bộ dữ liệu nhận được vào hồ sơ, không lược bớt trường. |
| 3 | Thành phần hồ sơ | - Tài liệu đính kèm nhận theo 04 thành phần hồ sơ tại [Thành phần hồ sơ - E-Form Dịch vụ công - Tài liệu tích hợp Dịch vụ công](../../../Tai_lieu_tich_hop/1.%20Dịch%20vụ%20công/EForm_DVC_YeuCauBoiThuong.md#ef-thanh-phan-ho-so):<br>+ (1) `Văn bản yêu cầu bồi thường`.<br>+ (2) `Văn bản làm căn cứ yêu cầu bồi thường`.<br>+ (3) `Văn bản ủy quyền thực hiện yêu cầu bồi thường`.<br>+ (4) `Các tài liệu kèm theo khác`.<br>- Hệ thống lưu mã thành phần của từng tệp để hiển thị theo nhóm.<br>- Thành phần (2) hiển thị tại bảng `Văn bản làm căn cứ yêu cầu bồi thường`.<br>- Thành phần (1), (3), (4) hiển thị tại bảng `Danh mục tài liệu gửi kèm`, nhóm theo thành phần. |
| 4 | Xem chi tiết | - Click dòng hồ sơ: mở [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#tn-mh03-chi-tiet) với bố cục hồ sơ nguồn Dịch vụ công theo [Khối thông tin hồ sơ nguồn Dịch vụ công - MH03 - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh03-dvc). |
| 5 | Tiếp nhận | - Sau khi Lãnh đạo phân công cán bộ, hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ Giải quyết yêu cầu bồi thường.<br>- Cán bộ chủ trì bấm `Tiếp nhận`: hệ thống mở [MH02 - Màn hình Nhập liệu hồ sơ vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-mh02-nhap-lieu), điền sẵn toàn bộ dữ liệu nhận từ Dịch vụ công.<br>- `Nguồn hồ sơ`, `Hình thức tiếp nhận`: chỉ đọc theo STT 1.<br>- `Pháp luật áp dụng để giải quyết bồi thường`: Dịch vụ công không gửi; hiển thị giá trị mặc định của MH02.<br>- Các trường còn lại: cán bộ được kiểm tra, sửa, bổ sung.<br>- Tài liệu theo STT 3: mỗi tệp của thành phần (1), (3), (4) là 01 dòng `Danh mục tài liệu gửi kèm`, `Tên tài liệu, văn bản` = `[Tên thành phần hồ sơ] - [Tên tài liệu]`; cán bộ được xem, xóa, bổ sung.<br>- Kiểm tra dữ liệu, lưu và trình duyệt theo chức năng `Trình duyệt` của MH02; luồng sau tiếp nhận như hồ sơ các nguồn khác. |
| 6 | Mã vụ việc | - Theo [Mã vụ việc và mã hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-ma-vu-viec): sinh khi nhận hồ sơ từ Dịch vụ công; phân hệ Giải quyết yêu cầu bồi thường kế thừa, chỉ sinh `Mã hồ sơ` `BT-`. |

---

##### 4.3.3.1.2. MH01 - Màn hình Danh sách hồ sơ tiếp nhận

###### 4.3.3.1.2.1. Màn hình

![Danh sách hồ sơ tiếp nhận](images/UC_Tiep_nhan_yeu_cau_MH01_Danh_sach.png)

###### 4.3.3.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | `Tiếp nhận hồ sơ` | Control UI: Text heading (Read-only).<br>- Hiển thị đúng tên mục Menu `Tiếp nhận hồ sơ`.<br>- Không có dòng mô tả dưới tiêu đề. |
| **Tab danh sách** | Tab | - | `Chờ xử lý` | Control UI: Tab.<br>- Đặt phía trên bộ lọc.<br>- Gồm tab `Chờ xử lý` và tab `Đã xử lý`.<br>- Badge số lượng: số bản ghi thuộc tab Chờ xử lý của người dùng; không hiển thị khi bằng 0.<br>- Badge số lượng tại mục menu `Tiếp nhận hồ sơ` bằng badge tab Chờ xử lý của Tiếp nhận hồ sơ.<br>- Tab `Đã xử lý` không có badge số lượng.<br>- Bản ghi của từng tab theo [Quy tắc 02 tab Chờ xử lý / Đã xử lý - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-tab-xu-ly). |
| **I. Bộ lọc tìm kiếm** | Section | - | Mở rộng | Control UI: Filter panel dạng thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Các tiêu chí có dữ liệu được kết hợp theo điều kiện AND.<br>- Click nút `Thu gọn`/`Mở rộng` để thu gọn/mở rộng khối.<br>- Khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`. |
| Loại hồ sơ | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Loại hồ sơ - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_54].<br>- Chỉ gồm các giá trị có `Đơn vị áp dụng` chứa đơn vị của người dùng.<br>- Có thêm giá trị `Tất cả`. |
| Nguồn hồ sơ | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Giá trị gồm:<br>+ `Tất cả`<br>+ `Tiếp nhận mới`<br>+ `Dịch vụ công`<br>+ `Chuyển CQGQBT`<br>+ `Xác định CQGQBT`<br>- Ý nghĩa từng giá trị theo [Nguồn hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-nguon-ho-so). |
| Tên cá nhân/Tổ chức yêu cầu | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên cá nhân/tổ chức yêu cầu...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Tên cá nhân/Tổ chức yêu cầu`. |
| Hình thức tiếp nhận | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Hình thức tiếp nhận - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_25].<br>- Có thêm giá trị `Tất cả`. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22].<br>- Có thêm giá trị `Tất cả`. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Gồm `Tất cả` và các trạng thái đang có của hồ sơ thuộc tab đang chọn. |
| Từ ngày | Date | Không | Cùng ngày của 03 tháng trước ngày hiện tại | Control UI: DatePicker (chọn ngày trên lịch hoặc nhập trực tiếp).<br>- Placeholder: `dd/mm/yyyy`.<br>- Định dạng `dd/mm/yyyy`.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- `Từ ngày` không được lớn hơn `Đến ngày`. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: DatePicker (chọn ngày trên lịch hoặc nhập trực tiếp).<br>- Placeholder: `dd/mm/yyyy`.<br>- Định dạng `dd/mm/yyyy`.<br>- Lọc theo `Thời điểm tiếp nhận`.<br>- `Đến ngày` không được nhỏ hơn `Từ ngày`. |
| **II. Bảng danh sách hồ sơ** | Section | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi truy cập màn hình, hệ thống tự động tải Trang 1 với 20 bản ghi.<br>- Sắp xếp mặc định theo "Thời điểm tiếp nhận" giảm dần (mới nhất lên đầu).<br>- Phạm vi dữ liệu theo tab đang chọn và người dùng đang đăng nhập ([Quy tắc 02 tab Chờ xử lý / Đã xử lý - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-tab-xu-ly)).<br>- Chỉ gồm hồ sơ có `Loại hồ sơ` thuộc các giá trị được áp dụng cho đơn vị của người dùng.<br>- Không có dữ liệu: bảng hiển thị 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng, nội dung theo [MSG-INF-SYS-001].<br>- Thanh phân trang phía dưới bảng: ô chọn `Số dòng hiển thị` (10, 20, 50, 100) và tổng số bản ghi. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã vụ việc | String(50) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hồ sơ có `Mã hồ sơ` khác `Mã vụ việc`: hiển thị thêm `Mã hồ sơ` ở dòng dưới. |
| Tên cá nhân/Tổ chức yêu cầu | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Loại hồ sơ | Enum(String(100)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Nguồn hồ sơ | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Hình thức tiếp nhận | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Thời điểm tiếp nhận | DateTime | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`.<br>- Hồ sơ nguồn khác `Tiếp nhận mới`: thời điểm hồ sơ được tạo tại màn hình này. |
| Cán bộ tiếp nhận | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo cột `Cán bộ tiếp nhận` tại [Nguồn hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-nguon-ho-so).<br>- Chưa có thì hiển thị `-`. |
| Đơn vị đang phân công | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Đơn vị mà Nhóm lãnh đạo đang giữ hồ sơ để phân công.<br>- Hồ sơ `Chờ phân công`: đơn vị gốc.<br>- Hồ sơ `Đang phân công`: đơn vị cấp dưới đã được chuyển.<br>- Hồ sơ `Chờ duyệt tiếp nhận` / `Bị trả lại`: hiển thị `-`.<br>- Hồ sơ đã phân công cán bộ: hiển thị `-`. |
| Trạng thái | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi. |
| Thao tác | Action Buttons | - | Theo tab/điều kiện | Control UI: Icon button group.<br>- Mỗi tab chỉ hiển thị các thao tác của tab đó.<br>- Thao tác của tab nhưng hồ sơ không thỏa điều kiện: hiển thị mờ (disabled), không cho click.<br>- Tooltip thao tác mờ: `[Tên thao tác] - [Lý do]`.<br>- `Ký duyệt`, `Từ chối`, `Phân công`: cố định vị trí, theo thứ tự này, đứng đầu nhóm thao tác ở cả 02 tab.<br>- **Tab `Chờ xử lý`** gồm các thao tác:<br>+ **Ký duyệt**, **Từ chối** (Phiếu tiếp nhận): luôn hiển thị; chỉ cho phép khi hồ sơ `Chờ duyệt tiếp nhận` và người dùng thuộc Nhóm lãnh đạo của cấp đang ký duyệt Phiếu tiếp nhận, theo [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan); trường hợp khác hiển thị mờ.<br>+ **Phân công**: luôn hiển thị; chỉ cho phép khi hồ sơ `Chờ phân công` / `Đang phân công` và người dùng thuộc Nhóm lãnh đạo của đơn vị đang phân công; trường hợp khác hiển thị mờ.<br>+ **Sửa**: Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`; do chính người dùng tiếp nhận; trạng thái `Bị trả lại`.<br>+ **Xóa**: Cùng điều kiện với **Sửa**.<br>- **Tab `Đã xử lý`** gồm các thao tác (không hiển thị Sửa, Xóa):<br>+ **Ký duyệt**, **Từ chối**, **Phân công**: luôn hiển thị; chỉ cho phép theo cùng điều kiện tại tab `Chờ xử lý`; trường hợp khác hiển thị mờ.<br>+ **Thu hồi**: Người dùng thuộc Nhóm lãnh đạo của đơn vị đã chuyển/phân công; hồ sơ thỏa điều kiện thu hồi tại [Quy tắc Thu hồi - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-thu-hoi) (hồ sơ `Đang phân công` tại đơn vị nhận, hoặc `Chờ tiếp nhận` khi cán bộ chưa tiếp nhận).<br>- Cột cố định bên phải lưới khi cuộn ngang. |

###### 4.3.3.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Khoảng ngày không hợp lệ**: `Từ ngày` lớn hơn `Đến ngày`.<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-VAL-007].<br>+ Không tìm kiếm.<br>- **TH2 - Có dữ liệu phù hợp**:<br>+ Hiển thị các bản ghi thuộc phạm vi dữ liệu của người dùng, thỏa mãn đồng thời các tiêu chí đã nhập/chọn.<br>+ Đưa về Trang 1.<br>- **TH3 - Không có dữ liệu**:<br>+ Bảng hiển thị 01 dòng căn giữa (`colspan`), in nghiêng, nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*.<br>+ Các nút điều hướng trang khóa mờ (Disabled). |
| 2 | Xóa bộ lọc | Button | - Đưa bộ lọc về giá trị mặc định và tải lại danh sách. |
| 3 | Tiếp nhận mới | Button | - Chỉ hiển thị khi chọn tab `Chờ xử lý`.<br>- Click nút: mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở trạng thái rỗng để nhập mới. |
| 4 | Click dòng dữ liệu | Row click | - Click dòng dữ liệu (trừ click vào icon trong cột `Thao tác`): mở [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#43314-mh03---màn-hình-xem-chi-tiết-hồ-sơ-tiếp-nhận) của bản ghi.<br>- Click icon trong cột `Thao tác`: thực hiện chức năng của icon, không kích hoạt row click. |
| 5 | Ký duyệt / Từ chối | Icon button | - Mở [MH04 - Màn hình Ký duyệt / Từ chối Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh04-ky-duyet-ptn) theo thao tác được chọn. |
| 6 | Sửa | Icon button | - Mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở chế độ sửa.<br>- Tự động điền dữ liệu của bản ghi. |
| 7 | Xóa | Icon button | - Click: hiển thị popup `Xác nhận xóa` với nội dung [MSG-CFM-SYS-001].<br>- Tại popup, người dùng chọn:<br>+ **Đồng ý**: Hệ thống **xóa mềm** hồ sơ (cập nhật cờ đã xóa, không xóa vật lý); gỡ hồ sơ khỏi tab `Chờ xử lý` của lãnh đạo; bản ghi không còn hiển thị trên danh sách; hiển thị thông báo thành công [MSG-SUC-BTNN-TN-001].<br>+ **Hủy bỏ**: Đóng popup, không xóa hồ sơ. |
| 8 | Chuyển tab | Tab | - Hiển thị danh sách của tab `Chờ xử lý` hoặc `Đã xử lý`.<br>- Nạp lại bộ lọc `Trạng thái` theo tab.<br>- Đưa về Trang 1. |
| 9 | Phân công | Icon button | - Mở [MH05 - Popup Phân công xử lý hồ sơ](#tn-mh05-phan-cong). |
| 10 | Thu hồi | Icon button | - Mở [MH06 - Popup Xác nhận thu hồi](#tn-mh06-thu-hoi).<br>- Thu hồi thành công: xử lý theo [Quy tắc Thu hồi - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-thu-hoi). |

---

##### 4.3.3.1.3. MH02 - Màn hình Tiếp nhận hồ sơ

###### 4.3.3.1.3.1. Màn hình

![Tiếp nhận hồ sơ](images/UC_Tiep_nhan_yeu_cau_MH02_Tiep_nhan.png)

###### 4.3.3.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | Theo ngữ cảnh | Control UI: Text heading (Read-only).<br>- Thêm mới: `TIẾP NHẬN HỒ SƠ`.<br>- Sửa bản ghi `Bị trả lại`: `SỬA THÔNG TIN TIẾP NHẬN`. |
| Mã vụ việc | String(50) | - | Tự sinh | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới** (mã chỉ được sinh sau khi lưu thành công).<br>- Sửa bản ghi: hiển thị mã đã sinh. |
| Thời điểm tiếp nhận | DateTime | - | Tự sinh | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới** (chỉ được ghi nhận sau khi lưu thành công).<br>- Mở lại bản ghi đã tồn tại: thời điểm người dùng bấm `Lưu thông tin` lần đầu.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Cán bộ tiếp nhận | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới**.<br>- Họ tên cán bộ đã tiếp nhận hồ sơ. |
| Trạng thái | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- **Không hiển thị khi thêm mới**.<br>- Theo dữ liệu bản ghi. |
| **Thông tin tổng quan vụ việc** | Section | - | - | Control UI: Section header.<br>- Luôn hiển thị. |
| Nguồn hồ sơ | Enum(String(50)) | - | `Tiếp nhận mới` | Control UI: Text (Read-only).<br>- **Không hiển thị khi thêm mới**.<br>- Hệ thống gán `Tiếp nhận mới` cho hồ sơ tạo tại màn hình này. |
| Loại hồ sơ | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn loại hồ sơ...`.<br>- Tham chiếu [Danh mục Loại hồ sơ - Quản lý danh mục - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_danh_muc.md) [DM_54].<br>- Chỉ gồm các giá trị có `Đơn vị áp dụng` chứa đơn vị của người dùng.<br>- Loại hồ sơ quyết định luồng phân công tại [Luồng phân công theo Loại hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-luong-phan-cong).<br>- Loại hồ sơ quyết định phân hệ xử lý hồ sơ sau khi lãnh đạo phân công cán bộ. |
| Hình thức tiếp nhận | Enum(String(50)) | Có | `Trực tiếp` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Hình thức tiếp nhận - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_25].<br>- Chỉ cho chọn 02 giá trị: `Trực tiếp`, `Qua dịch vụ bưu chính`. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn lĩnh vực...`.<br>- Tham chiếu danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Vụ việc liên quan | String(50) | Không | Trống | Control UI: Combobox có tìm kiếm.<br>- **Không hiển thị khi thêm mới**.<br>- Placeholder: `Gõ Mã vụ việc hoặc Họ và tên người yêu cầu...`.<br>- Danh sách gồm các vụ việc đã có `Mã vụ việc` trên hệ thống; không gồm vụ việc của chính hồ sơ đang sửa.<br>- Mỗi giá trị hiển thị `Mã vụ việc - Họ và tên người yêu cầu`.<br>- Cho phép gõ tìm theo `Mã vụ việc` hoặc `Họ và tên người yêu cầu`.<br>- Dùng khi người yêu cầu nộp lại hồ sơ sau khi bị từ chối: hồ sơ mới là vụ việc mới, ghi nhận vụ việc trước đó tại trường này.<br>- Hệ thống lưu `Mã vụ việc` của vụ việc được chọn; giá trị kế thừa sang hồ sơ tại phân hệ xử lý.<br>- Có dữ liệu nhưng không thuộc danh sách: không cho lưu.<br>- Quy tắc mã theo [Mã vụ việc và mã hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-ma-vu-viec). |
| Loại yêu cầu giải quyết bồi thường | Enum(String(100)) | Có (khi hiển thị) | `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)` | Control UI: Radio button.<br>- Chỉ hiển thị khi `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`.<br>- Giá trị gồm:<br>+ `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)`<br>+ `Chỉ yêu cầu bồi thường thiệt hại bằng tiền`<br>+ `Chỉ yêu cầu phục hồi danh dự`<br>- `Loại hồ sơ` khác: ẩn, không lưu giá trị.<br>- Giá trị kế thừa sang trường cùng tên tại [MH02 - Màn hình Nhập liệu hồ sơ vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43314-mh02---màn-hình-nhập-liệu-hồ-sơ-vụ-việc). |
| **Thông tin người yêu cầu** | Section | - | - | Control UI: Section header.<br>- Luôn hiển thị. |
| Loại người yêu cầu | Enum(String(20)) | Có | `Cá nhân` | Control UI: Radio button.<br>- Giá trị gồm:<br>+ `Cá nhân`<br>+ `Tổ chức`<br>- Đổi `Loại người yêu cầu`: nếu Tư cách đang chọn không thuộc danh sách của Loại mới thì hệ thống xóa giá trị Tư cách, người dùng chọn lại.<br>- `Cá nhân`: hiển thị `Loại giấy tờ thân nhân`, `Số giấy tờ thân nhân`; ẩn `Mã số tổ chức`.<br>- `Tổ chức`: hiển thị `Mã số tổ chức`; ẩn `Loại giấy tờ thân nhân`, `Số giấy tờ thân nhân`.<br>- Hồ sơ cũ chưa có giá trị: coi là `Cá nhân`. |
| Tư cách người yêu cầu bồi thường | Enum(String(100)) | Có | `Người bị thiệt hại` | Control UI: Combobox.<br>- Placeholder: `-- Chọn tư cách người yêu cầu --`.<br>- Tham chiếu [Danh mục Tư cách người yêu cầu bồi thường - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_26].<br>- Danh sách giá trị lọc theo `Loại người yêu cầu`:<br>+ `Cá nhân`: `Người bị thiệt hại`, `Người thừa kế của người bị thiệt hại`, `Người đại diện cho những người thừa kế của người bị thiệt hại`, `Người đại diện theo pháp luật của người bị thiệt hại`, `Cá nhân, pháp nhân được ủy quyền hợp pháp`.<br>+ `Tổ chức`: `Người bị thiệt hại`, `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`, `Cá nhân, pháp nhân được ủy quyền hợp pháp`.<br>- Chọn `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`: hiển thị khối `Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại`.<br>- Chọn giá trị khác (trừ `Người bị thiệt hại`): hiển thị khối `Thông tin người bị thiệt hại`.<br>- Chọn lại `Người bị thiệt hại`: ẩn khối, dữ liệu trong khối không được lưu. |
| Họ và tên / Tên tổ chức | String(255) | Có | Trống | Control UI: Input text.<br>- Nếu `Loại người yêu cầu` = `Cá nhân`:<br>+ Nhãn: `Họ và tên`.<br>+ Placeholder: `Nhập họ và tên...`.<br>- Nếu `Loại người yêu cầu` = `Tổ chức`:<br>+ Nhãn: `Tên tổ chức`.<br>+ Placeholder: `Nhập tên tổ chức...`. |
| Loại giấy tờ thân nhân | Enum(String(50)) | Không | Trống | Control UI: Combobox.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`.<br>- Hiển thị cùng ô `Số giấy tờ thân nhân` dưới nhãn `Giấy tờ thân nhân`.<br>- Placeholder: `-- Chọn loại giấy tờ --`.<br>- Tham chiếu [Danh mục Loại giấy tờ pháp lý - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_10].<br>- Chỉ gồm các giá trị dành cho cá nhân, không gồm `Mã số thuế`. |
| Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`.<br>- Placeholder: `Nhập số giấy tờ thân nhân...`. |
| Mã số tổ chức | String(50) | Có (khi hiển thị) | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`.<br>- Placeholder: `Mã số doanh nghiệp / mã số thuế / mã số khác...`. |
| Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`.<br>- Hệ thống bỏ khoảng trắng khi lưu.<br>- Kiểm tra định dạng theo `Quốc gia` của khối:<br>+ `Việt Nam`: 10-11 chữ số, bắt đầu bằng `0`.<br>+ Quốc gia khác: 8-15 chữ số, cho phép dấu `+` ở đầu.<br>- Sai định dạng: hiển thị [MSG-ERR-VAL-003] dưới ô nhập. |
| Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`.<br>- Có dữ liệu: kiểm tra định dạng `tên@tên miền`, phần sau dấu chấm cuối gồm tối thiểu 2 chữ cái.<br>- Sai định dạng: hiển thị [MSG-ERR-VAL-002] dưới ô nhập. |
| Quốc gia | Enum(String(100)) | Có | `Việt Nam` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Quốc tịch / Quốc gia - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_09].<br>- Quyết định kiểu nhập của `Tỉnh/Thành phố`, `Phường/Xã`. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`:<br>+ Combobox có tìm kiếm, tham chiếu Danh mục địa bàn (cấp Tỉnh/Thành phố).<br>+ Cho phép gõ tìm theo Mã hoặc Tên.<br>+ Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`.<br>- Nếu `Quốc gia` khác `Việt Nam`:<br>+ Input text nhập tự do.<br>+ Placeholder: `Nhập Tỉnh/Thành phố...`.<br>- Đổi `Quốc gia`: xóa giá trị `Tỉnh/Thành phố`, `Phường/Xã`. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`:<br>+ Combobox có tìm kiếm, tham chiếu Danh mục địa bàn (cấp Phường/Xã), lọc theo `Tỉnh/Thành phố` đã chọn.<br>+ Cho phép gõ tìm theo Mã hoặc Tên.<br>+ Placeholder: `Gõ Mã hoặc Tên Phường/Xã...`.<br>+ Chưa chọn `Tỉnh/Thành phố`: khóa (Disabled), placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- Nếu `Quốc gia` khác `Việt Nam`:<br>+ Input text nhập tự do.<br>+ Placeholder: `Nhập Phường/Xã...`. |
| Địa chỉ chi tiết (Số nhà, tên đường, thôn/xóm...) | String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số nhà, tên đường, thôn/xóm...`. |
| **Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu bồi thường` = `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`. |
| Tên tổ chức bị thiệt hại | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tổ chức bị thiệt hại...`. |
| Mã số tổ chức | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Mã số doanh nghiệp / mã số thuế / mã số khác...`. |
| Quốc gia | Enum(String(100)) | Không | `Việt Nam` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Quốc tịch / Quốc gia - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_09].<br>- Quyết định kiểu nhập của `Tỉnh/Thành phố`, `Phường/Xã` như trường `Quốc gia` của khối `Thông tin người yêu cầu`.<br>- Đổi `Quốc gia`: xóa giá trị `Tỉnh/Thành phố`, `Phường/Xã`. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`:<br>+ Combobox có tìm kiếm, tham chiếu Danh mục địa bàn (cấp Tỉnh/Thành phố).<br>+ Cho phép gõ tìm theo Mã hoặc Tên.<br>+ Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`.<br>- Nếu `Quốc gia` khác `Việt Nam`:<br>+ Input text nhập tự do.<br>+ Placeholder: `Nhập Tỉnh/Thành phố...`. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`:<br>+ Combobox có tìm kiếm, tham chiếu Danh mục địa bàn (cấp Phường/Xã), lọc theo `Tỉnh/Thành phố` đã chọn.<br>+ Cho phép gõ tìm theo Mã hoặc Tên.<br>+ Placeholder: `Gõ Mã hoặc Tên Phường/Xã...`.<br>+ Chưa chọn `Tỉnh/Thành phố`: khóa (Disabled), placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- Nếu `Quốc gia` khác `Việt Nam`:<br>+ Input text nhập tự do.<br>+ Placeholder: `Nhập Phường/Xã...`. |
| Địa chỉ chi tiết (Số nhà, tên đường, thôn/xóm...) | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số nhà, tên đường, thôn/xóm...`.<br>- Khối không có `Số điện thoại`, `Email`.<br>- Tiếp nhận hồ sơ không bắt buộc các trường của khối; bắt buộc khi trình Thông báo thụ lý theo [Chức năng Trình duyệt - MH02 - Màn hình Nhập liệu hồ sơ vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43314-mh02---màn-hình-nhập-liệu-hồ-sơ-vụ-việc). |
| **Thông tin người bị thiệt hại** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu bồi thường` khác `Người bị thiệt hại` và khác `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`.<br>- Bộ trường, nhãn, thứ tự, placeholder như khối `Thông tin người yêu cầu` (không có `Tư cách người yêu cầu bồi thường`), bổ sung `Ngày sinh`.<br>- Tiếp nhận hồ sơ không bắt buộc trường nào của khối; bắt buộc khi trình Thông báo thụ lý theo [Chức năng Trình duyệt - MH02 - Màn hình Nhập liệu hồ sơ vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43314-mh02---màn-hình-nhập-liệu-hồ-sơ-vụ-việc). |
| Loại người bị thiệt hại | Enum(String(20)) | Không | `Cá nhân` | Control UI: Radio button.<br>- Giá trị gồm:<br>+ `Cá nhân`<br>+ `Tổ chức`<br>- Giá trị được chọn theo `Tư cách người yêu cầu bồi thường`:<br>+ `Người thừa kế của người bị thiệt hại`, `Người đại diện cho những người thừa kế của người bị thiệt hại`: chỉ `Cá nhân`, khóa (Disabled).<br>+ `Người đại diện theo pháp luật của người bị thiệt hại`, `Cá nhân, pháp nhân được ủy quyền hợp pháp`: chọn `Cá nhân` hoặc `Tổ chức`.<br>- Đổi `Tư cách người yêu cầu bồi thường` sang giá trị chỉ áp dụng `Cá nhân` khi đang chọn `Tổ chức`: tự chuyển về `Cá nhân`, xóa dữ liệu `Mã số tổ chức`.<br>- `Cá nhân`: hiển thị `Ngày sinh`, `Loại giấy tờ thân nhân`, `Số giấy tờ thân nhân`; ẩn `Mã số tổ chức`.<br>- `Tổ chức`: hiển thị `Mã số tổ chức`; ẩn `Ngày sinh`, `Loại giấy tờ thân nhân`, `Số giấy tờ thân nhân`.<br>- Hồ sơ cũ chưa có giá trị: coi là `Cá nhân`. |
| Ngày sinh | Date | Không | Trống | Control UI: DatePicker.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Placeholder: `dd/mm/yyyy`.<br>- Định dạng `dd/mm/yyyy`. |
| Họ và tên / Tên tổ chức | String(255) | Không | Trống | Control UI: Input text.<br>- Nếu `Loại người bị thiệt hại` = `Cá nhân`:<br>+ Nhãn: `Họ và tên`.<br>+ Placeholder: `Nhập họ và tên...`.<br>- Nếu `Loại người bị thiệt hại` = `Tổ chức`:<br>+ Nhãn: `Tên tổ chức`.<br>+ Placeholder: `Nhập tên tổ chức...`. |
| Loại giấy tờ thân nhân | Enum(String(50)) | Không | Trống | Control UI: Combobox.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Hiển thị cùng ô `Số giấy tờ thân nhân` dưới nhãn `Giấy tờ thân nhân`.<br>- Placeholder: `-- Chọn loại giấy tờ --`.<br>- Tham chiếu [Danh mục Loại giấy tờ pháp lý - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_10].<br>- Chỉ gồm các giá trị dành cho cá nhân, không gồm `Mã số thuế`. |
| Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Placeholder: `Nhập số giấy tờ thân nhân...`. |
| Mã số tổ chức | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`.<br>- Placeholder: `Mã số doanh nghiệp / mã số thuế / mã số khác...`. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`.<br>- Hệ thống bỏ khoảng trắng khi lưu.<br>- Có dữ liệu: kiểm tra định dạng như `Số điện thoại` của người yêu cầu, theo `Quốc gia` của khối người bị thiệt hại.<br>- Sai định dạng: hiển thị [MSG-ERR-VAL-003] dưới ô nhập. |
| Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`.<br>- Có dữ liệu: kiểm tra định dạng như `Email` của người yêu cầu.<br>- Sai định dạng: hiển thị [MSG-ERR-VAL-002] dưới ô nhập. |
| Quốc gia | Enum(String(100)) | Không | `Việt Nam` | Control UI: Combobox.<br>- Tham chiếu [Danh mục Quốc tịch / Quốc gia - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_09].<br>- Quyết định kiểu nhập của `Tỉnh/Thành phố`, `Phường/Xã`.<br>- Đổi `Quốc gia`: xóa giá trị `Tỉnh/Thành phố`, `Phường/Xã`. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`:<br>+ Combobox có tìm kiếm, tham chiếu Danh mục địa bàn (cấp Tỉnh/Thành phố).<br>+ Cho phép gõ tìm theo Mã hoặc Tên.<br>+ Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`.<br>- Nếu `Quốc gia` khác `Việt Nam`:<br>+ Input text nhập tự do.<br>+ Placeholder: `Nhập Tỉnh/Thành phố...`. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`:<br>+ Combobox có tìm kiếm, tham chiếu Danh mục địa bàn (cấp Phường/Xã), lọc theo `Tỉnh/Thành phố` đã chọn.<br>+ Cho phép gõ tìm theo Mã hoặc Tên.<br>+ Placeholder: `Gõ Mã hoặc Tên Phường/Xã...`.<br>+ Chưa chọn `Tỉnh/Thành phố`: khóa (Disabled), placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- Nếu `Quốc gia` khác `Việt Nam`:<br>+ Input text nhập tự do.<br>+ Placeholder: `Nhập Phường/Xã...`. |
| Địa chỉ chi tiết (Số nhà, tên đường, thôn/xóm...) | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số nhà, tên đường, thôn/xóm...`. |
| **Thông tin hành vi gây thiệt hại** | Section | - | - | Control UI: Section header.<br>- Luôn hiển thị. |
| Hành vi gây thiệt hại của người thi hành công vụ | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: `Tóm tắt hành vi gây thiệt hại của người thi hành công vụ`.<br>- Tối đa 2000 ký tự.<br>- Áp dụng cho mọi `Loại hồ sơ`.<br>- Giá trị lưu vào hồ sơ tiếp nhận, kế thừa sang trường cùng tên tại [MH02 - Màn hình Tiếp nhận/Cập nhật xác định cơ quan giải quyết bồi thường - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#43314-mh02---màn-hình-tiếp-nhậncập-nhật-xác-định-cơ-quan-giải-quyết-bồi-thường) và [MH02 - Màn hình Nhập liệu hồ sơ vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43314-mh02---màn-hình-nhập-liệu-hồ-sơ-vụ-việc); cán bộ xử lý được sửa. |
| **Văn bản làm căn cứ yêu cầu bồi thường** | List(Object) | Không | 01 dòng trống | Control UI: Data grid nhiều dòng.<br>- Luôn hiển thị.<br>- Nút `Thêm tài liệu` dưới bảng.<br>- Dòng không có tên và không có file được bỏ qua khi lưu. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Tự tăng theo số dòng. |
| Tên văn bản căn cứ | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên văn bản căn cứ`.<br>- Tải file mà chưa nhập tên: hệ thống tự điền tên theo tên file (bỏ phần mở rộng). |
| File đính kèm | File | Không | Trống | Control UI: File upload (nút `Tải file`).<br>- Sau khi chọn hiển thị tên file.<br>- Định dạng cho phép: `.pdf`, `.jpg`, `.png`. |
| Thao tác | Action | - | - | Control UI: Icon button group.<br>- `Xem file`: khóa (Disabled) khi dòng chưa có file.<br>- `Xóa`. |
| **Bảng tài liệu đính kèm** | List(Object) | Có | 01 dòng `Văn bản yêu cầu bồi thường` | Control UI: Data grid nhiều dòng.<br>- Luôn hiển thị.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác`.<br>- Dòng đầu tiên mặc định là `Văn bản yêu cầu bồi thường`, có nhãn `Bắt buộc`.<br>- Nút `Thêm tài liệu` dưới bảng: thêm dòng tài liệu khác.<br>- Dòng không có tên và không có file được bỏ qua khi lưu.<br>- Hồ sơ đã có văn bản yêu cầu bồi thường (VD hồ sơ từ Dịch vụ công): file điền sẵn vào dòng `Văn bản yêu cầu bồi thường`.<br>- Hồ sơ cũ có tài liệu tên `Đơn yêu cầu bồi thường`: điền vào dòng `Văn bản yêu cầu bồi thường`. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Tự tăng theo số dòng. |
| Tên tài liệu, văn bản | String(255) | Có điều kiện | Dòng 1: `Văn bản yêu cầu bồi thường`; dòng khác: Trống | Control UI: Text (Read-only) / Input text.<br>- Dòng `Văn bản yêu cầu bồi thường`: Text (Read-only), không sửa tên.<br>- Dòng khác: Input text, placeholder `Nhập tên tài liệu, văn bản`.<br>- Bắt buộc khi dòng có file.<br>- Tải file lên mà chưa nhập tên: hệ thống lấy tên file (bỏ phần mở rộng) làm tên tài liệu. |
| File đính kèm | File | Có điều kiện | Trống | Control UI: File upload (nút `Tải file`).<br>- Bắt buộc với dòng `Văn bản yêu cầu bồi thường`.<br>- Sau khi chọn hiển thị tên file.<br>- Định dạng cho phép: `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`.<br>- Dung lượng tối đa 50MB/file. |
| Thao tác | Action | - | - | Control UI: Icon button group.<br>- `Xem file`: khóa (Disabled) khi dòng chưa có file.<br>- `Xóa`: dòng `Văn bản yêu cầu bồi thường` chỉ xóa file, không xóa dòng; khóa (Disabled) khi dòng chưa có file.<br>- Dòng khác: xóa dòng. |
| **Thông tin Phiếu tiếp nhận (Mẫu 02/BTNN)** | Section | - | - | Control UI: Section header.<br>- Chỉ hiển thị khi thêm mới.<br>- Cập nhật hồ sơ `Bị trả lại`: không hiển thị; thông tin nhập tại [MH07 - Popup Trình ký lại Phiếu tiếp nhận hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh07-trinh-ky-ptn).<br>- Đặt dưới `Bảng tài liệu đính kèm`.<br>- Dữ liệu điền vào Phiếu tiếp nhận (Dự thảo) theo [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan). |
| Số, ký hiệu văn bản | String(100) | Có | `/TB-` (để trống phần số) | Control UI: Textbox.<br>- Điền vào `##SoKyHieuVanBan##` của Mẫu 02/BTNN. |
| Ngày văn bản | Date | Có | Ngày hiện tại | Control UI: Datepicker.<br>- Định dạng `dd/mm/yyyy`.<br>- Điền vào `##NgayThangNamBanHanh##` của Mẫu 02/BTNN. |
| Nơi nhận | String(2000) | Không | `- Như trên;`, `- [Tên đơn vị gốc] (để biết);`, `- Lưu: VT, HSVV.` | Control UI: Textarea.<br>- Mỗi nơi nhận 01 dòng.<br>- Điền vào `##NoiNhan##` của Mẫu 02/BTNN. |
| Ghi chú luồng ký duyệt | Label | - | Theo luồng | Control UI: Dòng ghi chú kèm nút `Xem trước văn bản`.<br>- Nội dung: *"Khi lưu, hệ thống sinh Phiếu tiếp nhận (Dự thảo) theo Mẫu 02/BTNN và trình Lãnh đạo ký duyệt theo luồng đã cấu hình: Cấp [n] - [Tên đơn vị]; ..."*. |
| **Quá trình phân công** | List(Object) | - | Ẩn khi thêm mới | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị khi sửa bản ghi đã tồn tại.<br>- Không có dữ liệu: hiển thị `Không có dữ liệu`. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự lượt phân công. |
| Nội dung phân công | String(1000) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị `[Người chuyển] ([Đơn vị chuyển]) chuyển [Đơn vị nhận]` hoặc `[Người chuyển] ([Đơn vị chuyển]) phân công chủ trì [Cán bộ chủ trì]`.<br>- Có `Ý kiến chỉ đạo`: hiển thị thêm dòng `Ý kiến chỉ đạo: [Nội dung]`. |
| Thời điểm | DateTime | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Thời điểm chuyển/phân công.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Tình trạng | Enum(String(50)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Giá trị gồm:<br>+ `Đã xử lý`<br>+ `Chưa xử lý - Chưa xem`<br>+ `Chưa xử lý - Đã xem lúc [dd/mm/yyyy HH:mm]` |
| **Lịch sử xử lý** | List(Object) | - | Ẩn khi thêm mới | Control UI: Timeline (Read-only).<br>- Chỉ hiển thị khi sửa bản ghi đã tồn tại.<br>- Sắp xếp mới nhất lên đầu.<br>- Mỗi dòng gồm `[Hành động] - [Người thực hiện] - [Thời điểm]` và nội dung.<br>- Hành động gồm:<br>+ `Tiếp nhận hồ sơ`<br>+ `Nhận hồ sơ từ Dịch vụ công`<br>+ `Nhận hồ sơ chuyển CQGQBT`<br>+ `Nhận hồ sơ từ Xác định CQGQBT`<br>+ `Cập nhật thông tin tiếp nhận`<br>+ `Trình ký Phiếu tiếp nhận` / `Trình lại Phiếu tiếp nhận`<br>+ `Ký duyệt Phiếu tiếp nhận` / `Từ chối Phiếu tiếp nhận`<br>+ `Chuyển đơn vị`<br>+ `Phân công cán bộ`<br>+ `Thu hồi` |

###### 4.3.3.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | - Đóng màn hình tiếp nhận.<br>- Quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 2 | Thêm tài liệu | Button | - Thêm 01 dòng trống vào bảng `Văn bản làm căn cứ yêu cầu bồi thường` hoặc `Bảng tài liệu đính kèm` tương ứng. |
| 3 | Tải file / Tải lên | Button | Khi người dùng chọn tệp tin tải lên cho dòng của bảng `Văn bản làm căn cứ yêu cầu bồi thường` (nút `Tải file`) hoặc `Bảng tài liệu đính kèm` (nút `Tải file`), hệ thống xử lý theo các trường hợp:<br>- **TH1 - File sai định dạng**:<br>+ Định dạng cho phép của bảng `Văn bản làm căn cứ yêu cầu bồi thường`: `.pdf`, `.jpg`, `.png`.<br>+ Định dạng cho phép của `Bảng tài liệu đính kèm`: `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`.<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-FILE-001].<br>+ Không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng** (lớn hơn 50MB/file):<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-FILE-002].<br>+ Không tiếp nhận tệp.<br>- **TH3 - Hợp lệ**:<br>+ Tải tệp lên thành công.<br>+ Hiển thị tên tệp tại dòng.<br>+ Dòng chưa có tên: tự điền tên theo tên file (bỏ phần mở rộng). |
| 4 | Xem file | Link | - Mở xem nội dung tệp tin đã tải lên tại tab trình duyệt mới. |
| 5 | Xóa | Link | - Xóa dòng khỏi bảng, không hiển thị popup xác nhận.<br>- Bảng `Văn bản làm căn cứ yêu cầu bồi thường` chỉ còn 01 dòng: xóa dữ liệu của dòng, giữ lại 01 dòng trống.<br>- Dòng `Văn bản yêu cầu bồi thường` của `Bảng tài liệu đính kèm`: chỉ xóa file, giữ dòng. |
| 6 | Lưu thông tin / Trình ký | Button | - Nhãn nút: `Lưu thông tin` khi thêm mới; `Trình ký` khi cập nhật hồ sơ `Bị trả lại`.<br>- Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Bỏ trống trường bắt buộc** (gồm file của dòng `Văn bản yêu cầu bồi thường`, `Số, ký hiệu văn bản`, `Ngày văn bản`; không gồm các trường của khối `Thông tin người bị thiệt hại`, `Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại`): Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không lưu.<br>- **TH2 - `Số điện thoại` (người yêu cầu, người bị thiệt hại) có dữ liệu nhưng không đúng định dạng**:<br>+ Tô viền đỏ ô lỗi, hiển thị cảnh báo lỗi [MSG-ERR-VAL-003] dưới ô nhập, focus vào ô lỗi đầu tiên.<br>+ Không cho lưu.<br>- **TH3 - `Email` (người yêu cầu, người bị thiệt hại) có dữ liệu nhưng không đúng định dạng**:<br>+ Tô viền đỏ ô lỗi, hiển thị cảnh báo lỗi [MSG-ERR-VAL-002] dưới ô nhập, focus vào ô lỗi đầu tiên.<br>+ Không cho lưu.<br>- **TH4 - `Vụ việc liên quan` có dữ liệu nhưng không thuộc danh sách vụ việc trên hệ thống**:<br>+ Bôi đỏ viền ô `Vụ việc liên quan`.<br>+ Hiển thị cảnh báo lỗi "Vụ việc không tồn tại trên hệ thống" dưới ô nhập.<br>+ Không cho lưu.<br>- **TH5 - Thêm mới, dữ liệu hợp lệ** (áp dụng cho cả hai Loại hồ sơ):<br>+ Sinh `Mã vụ việc` (mã toàn trình) theo [Mã vụ việc và mã hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-ma-vu-viec).<br>+ Lưu `Vụ việc liên quan` (nếu có); giá trị được kế thừa sang hồ sơ tại phân hệ xử lý.<br>+ Gán `Nguồn hồ sơ` = `Tiếp nhận mới`.<br>+ Ghi nhận `Thời điểm tiếp nhận` và cán bộ tiếp nhận.<br>+ Lưu thông tin tổng quan, người yêu cầu, người bị thiệt hại và tài liệu đính kèm.<br>+ `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`: lưu `Loại yêu cầu giải quyết bồi thường`; giá trị được kế thừa sang hồ sơ tại phân hệ Giải quyết yêu cầu bồi thường.<br>+ Đơn vị tiếp nhận là đơn vị gốc của cán bộ tiếp nhận.<br>+ Không xác định được cấp ký duyệt Phiếu tiếp nhận: không lưu, hiển thị thông báo theo STT 4 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).<br>+ Sinh Phiếu tiếp nhận (Dự thảo), trình Lãnh đạo cấp 1; hồ sơ ở trạng thái `Chờ duyệt tiếp nhận` theo STT 3 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).<br>+ Lãnh đạo cấp cuối Ký duyệt Phiếu tiếp nhận: hồ sơ `Chờ phân công`, chuyển đến tab `Chờ xử lý` của Nhóm lãnh đạo đơn vị gốc theo [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md) đã cấu hình cho Loại hồ sơ của hồ sơ:<br>+ `Xác định cơ quan giải quyết bồi thường` tiếp nhận tại Bộ Tư pháp: luồng `Xác định CQGQBT - Bộ Tư pháp`.<br>+ `Xác định cơ quan giải quyết bồi thường` tiếp nhận tại Sở Tư pháp: luồng `Xác định CQGQBT - Sở Tư pháp` của Sở Tư pháp đó.<br>+ `Giải quyết yêu cầu bồi thường`: luồng `Giải quyết YCBT` của đơn vị gốc.<br>+ Ghi Lịch sử xử lý `Trình ký Phiếu tiếp nhận`.<br>+ Hiển thị thông báo thành công [MSG-SUC-BTNN-LXL-001].<br>+ Quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).<br>- **TH6 - Sửa, hồ sơ không còn `Bị trả lại`** (kiểm tra lại tại máy chủ):<br>+ Hiển thị cảnh báo lỗi [MSG-ERR-BTNN-LXL-003].<br>+ Không lưu.<br>+ Quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).<br>- **TH7 - Cập nhật hồ sơ `Bị trả lại`, dữ liệu hợp lệ** (nút hiển thị `Trình ký`):<br>+ Ghi nhận thông tin cập nhật (gồm `Vụ việc liên quan`, `Loại yêu cầu giải quyết bồi thường`).<br>+ Đổi `Loại hồ sơ` sang `Xác định cơ quan giải quyết bồi thường`: xóa giá trị `Loại yêu cầu giải quyết bồi thường`.<br>+ Ghi Lịch sử xử lý `Cập nhật thông tin tiếp nhận`.<br>+ Mở [MH07 - Popup Trình ký lại Phiếu tiếp nhận hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh07-trinh-ky-ptn); hồ sơ giữ `Bị trả lại` tới khi trình ký lại. |
| 7 | Xem trước văn bản | Button | - Tại khối `Thông tin Phiếu tiếp nhận (Mẫu 02/BTNN)`.<br>- **TH1 - Bỏ trống `Số, ký hiệu văn bản` hoặc `Ngày văn bản`**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên.<br>- **TH2 - Hợp lệ**: mở xem Phiếu tiếp nhận (Dự thảo) sinh theo Mẫu 02/BTNN từ dữ liệu đang nhập. |

---

<a id="tn-mh03-chi-tiet"></a>
##### 4.3.3.1.4. MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận

###### 4.3.3.1.4.1. Màn hình

![Chi tiết hồ sơ tiếp nhận](images/UC_Tiep_nhan_yeu_cau_MH03_Chi_tiet.png)

- Màn hình chỉ xem, mở khi người dùng click dòng hồ sơ tại tab `Chờ xử lý` / `Đã xử lý` của [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).
- Dùng chung cho hồ sơ mọi Nguồn hồ sơ, kể cả hồ sơ không do người dùng đang đăng nhập tiếp nhận.
- Hồ sơ `Nguồn hồ sơ` = `Dịch vụ công`: các khối từ `Thông tin tổng quan vụ việc` đến `Bảng tài liệu đính kèm` thay bằng [Khối thông tin hồ sơ nguồn Dịch vụ công - MH03 - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh03-dvc); các trường còn lại giữ nguyên.

###### 4.3.3.1.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | - | - | `CHI TIẾT HỒ SƠ TIẾP NHẬN` | Control UI: Text heading (Read-only). |
| Mã vụ việc | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Thời điểm tiếp nhận | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Cán bộ tiếp nhận | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Trạng thái | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| **Thông tin tổng quan vụ việc** | - | - | - | Control UI: Section header. |
| Nguồn hồ sơ | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Loại hồ sơ | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Hình thức tiếp nhận | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Lĩnh vực phát sinh thiệt hại | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Vụ việc liên quan | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Loại yêu cầu giải quyết bồi thường | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`. |
| **Thông tin người yêu cầu** | - | - | - | Control UI: Section header. |
| Loại người yêu cầu | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Tư cách người yêu cầu bồi thường | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Họ và tên / Tên tổ chức | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Giấy tờ thân nhân | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`. |
| Mã số tổ chức | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`. |
| Số điện thoại | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Email | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Quốc gia | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Địa chỉ đầy đủ | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| **Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại** | - | - | - | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu bồi thường` = `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`. |
| Tên tổ chức bị thiệt hại | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Mã số tổ chức | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Quốc gia | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Địa chỉ đầy đủ | - | - | Theo bản ghi | Control UI: Label.<br>- Ghép `Địa chỉ chi tiết`, `Phường/Xã`, `Tỉnh/Thành phố` của tổ chức bị thiệt hại.<br>- Không có dữ liệu: hiển thị `-`. |
| **Thông tin người bị thiệt hại** | - | - | - | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu bồi thường` khác `Người bị thiệt hại` và khác `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`. |
| Loại người bị thiệt hại | - | - | Theo bản ghi | Control UI: Radio button (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hồ sơ cũ chưa có giá trị: `Cá nhân`. |
| Ngày sinh | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`. |
| Họ và tên / Tên tổ chức | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Giấy tờ thân nhân | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`. |
| Mã số tổ chức | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`. |
| Số điện thoại | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Email | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Quốc gia | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Địa chỉ đầy đủ | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| **Thông tin hành vi gây thiệt hại** | - | - | - | Control UI: Section header. |
| Hành vi gây thiệt hại của người thi hành công vụ | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| **Văn bản làm căn cứ yêu cầu bồi thường** | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Cột: `STT`, `Tên văn bản căn cứ`, `File đính kèm`, `Thao tác` (`Xem file`, `Tải file`). |
| **Bảng tài liệu đính kèm** | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác` (`Xem file`, `Tải file`).<br>- Dòng `Văn bản yêu cầu bồi thường` (nếu có) hiển thị đầu bảng, không hiển thị nhãn `Bắt buộc`.<br>- Hồ sơ cũ có tài liệu tên `Đơn yêu cầu bồi thường`: hiển thị tên `Văn bản yêu cầu bồi thường`.<br>- Chỉ hiển thị khi có dữ liệu.<br>- Hồ sơ `Nguồn hồ sơ` = `Dịch vụ công`: hiển thị nhóm theo 04 thành phần hồ sơ tại [Thành phần hồ sơ - E-Form Dịch vụ công - Tài liệu tích hợp Dịch vụ công](../../../Tai_lieu_tich_hop/1.%20Dịch%20vụ%20công/EForm_DVC_YeuCauBoiThuong.md#ef-thanh-phan-ho-so), theo [Khối thông tin hồ sơ nguồn Dịch vụ công - MH03 - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh03-dvc). |
| **Lý do bị trả lại** | - | - | - | Control UI: Section header.<br>- Chỉ hiển thị khi hồ sơ ở trạng thái `Bị trả lại`.<br>- Đặt trên khối `Thông tin Phiếu tiếp nhận`.<br>- Mở màn hình: hệ thống tự cuộn tới khối, focus và làm nổi viền khối. |
| Lý do trả lại | - | - | Theo bản ghi | Control UI: Label.<br>- Lý do Lãnh đạo đã nhập khi Từ chối. |
| Lãnh đạo trả lại | - | - | Theo bản ghi | Control UI: Label.<br>- `[Họ và tên] - [Chức vụ]`. |
| Thời điểm trả lại | - | - | Theo bản ghi | Control UI: Label.<br>- Định dạng `HH:mm dd/mm/yyyy`. |
| Cấp ký duyệt | - | - | Theo bản ghi | Control UI: Label.<br>- `Cấp [n]/[tổng số cấp] - [Tên đơn vị]` của cấp trả lại. |
| **Thông tin Phiếu tiếp nhận** | - | - | - | Control UI: Section header.<br>- Chỉ hiển thị với hồ sơ thỏa STT 2 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan) và đã có Phiếu tiếp nhận. |
| Trạng thái Phiếu tiếp nhận | - | - | Theo bản ghi | Control UI: Badge (Read-only).<br>- `Dự thảo`: hồ sơ `Chờ duyệt tiếp nhận` / `Bị trả lại`.<br>- `Đã ký duyệt, ban hành`: Lãnh đạo cấp cuối đã Ký duyệt hoặc đã ban hành Ký ngoài. |
| Số, ký hiệu văn bản | - | - | Theo bản ghi | Control UI: Label.<br>- Giá trị đã nhập khi lưu / trình ký lại (`Ký ngoài`: giá trị đã ban hành).<br>- Chưa có giá trị: hiển thị `-`. |
| Ngày văn bản | - | - | Theo bản ghi | Control UI: Label.<br>- Định dạng `dd/mm/yyyy`.<br>- Chưa có giá trị: hiển thị `-`. |
| Phiếu tiếp nhận | - | - | Theo bản ghi | Control UI: Tên tệp kèm nút `Xem file`, `Tải file` trên cùng 01 dòng.<br>- Nhãn: `Phiếu tiếp nhận (Dự thảo đang trình)` khi `Dự thảo`; `Phiếu tiếp nhận đã ký duyệt` khi `Đã ký duyệt, ban hành`.<br>- Tệp luôn hiển thị định dạng PDF: `Dự thảo` là tệp dự thảo đang trình; sau ký duyệt là tệp đã ký số (Ký ngoài: tệp PDF đã ký tải lên).<br>- `Xem file`: mở màn hình xem văn bản.<br>- `Tải file`: tải tệp PDF về máy. |
| Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị khi có dữ liệu.<br>- Quyền xem theo [Quy tắc Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#xd-tai-lieu-trinh-ky). |
| **Thông tin trình ký** | - | - | - | Control UI: Section header.<br>- Hiển thị cùng khối `Thông tin Phiếu tiếp nhận`. |
| Hình thức ký | - | - | Theo bản ghi | Control UI: Label.<br>- `Ký số trên hệ thống` hoặc `Ký ngoài`. |
| Người trình / Thời điểm trình | - | - | Theo bản ghi | Control UI: Label.<br>- Lần trình gần nhất; thời điểm định dạng `HH:mm dd/mm/yyyy`.<br>- `Ký ngoài`: `Người thực hiện`, `Thời điểm ban hành`, `Người ký`. |
| Lãnh đạo được giao | - | - | Theo bản ghi | Control UI: Label.<br>- Chỉ hiển thị khi hồ sơ `Chờ duyệt tiếp nhận`.<br>- `Cấp [n]/[tổng số cấp] - [Tên đơn vị]`, dòng dưới: Lãnh đạo được chọn khi trình hoặc các Lãnh đạo thuộc Nhóm lãnh đạo của cấp. |
| Lãnh đạo trả lại | - | - | Theo bản ghi | Control UI: Label.<br>- Chỉ hiển thị khi hồ sơ `Bị trả lại`.<br>- `Cấp [n]/[tổng số cấp] - [Họ và tên] - [Chức vụ]`. |
| Người ký / Thời điểm ký | - | - | Theo bản ghi | Control UI: Label.<br>- Chỉ hiển thị khi Phiếu tiếp nhận `Đã ký duyệt, ban hành` (Ký số).<br>- Lãnh đạo cấp cuối và thời điểm ký số. |
| Nội dung trình | - | - | Theo bản ghi | Control UI: Label.<br>- Chưa có giá trị: hiển thị `-`. |
| Lịch sử trình ký | List(Object) | - | Theo bản ghi | Control UI: Timeline (Read-only).<br>- Các lần trình, trình ký lại, ký duyệt, trả lại theo STT 10 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan); mới nhất lên đầu. |
| **Quá trình phân công** | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Cột: `STT`, `Nội dung phân công`, `Thời điểm`, `Tình trạng`. |
| **Lịch sử xử lý** | - | - | Theo bản ghi | Control UI: Timeline (Read-only).<br>- Theo dữ liệu hồ sơ.<br>- Gồm cả các bước của Phiếu tiếp nhận theo STT 10 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan); sắp xếp theo thời điểm, mới nhất lên đầu. |

<a id="tn-mh03-dvc"></a>
**Khối thông tin hồ sơ nguồn Dịch vụ công**

- Áp dụng khi hồ sơ có `Nguồn hồ sơ` = `Dịch vụ công`.
- Tên khối, thứ tự khối, tên trường, điều kiện hiển thị trường theo [MH02 - Màn hình Nhập liệu hồ sơ vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-mh02-nhap-lieu); bảng dưới chỉ mô tả điểm khác.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Toàn bộ trường của khối | - | - | Theo bản ghi | Control UI: Text (Read-only).<br>- Theo dữ liệu nhận từ Dịch vụ công.<br>- Không có dữ liệu: hiển thị `-`.<br>- Không hiển thị dấu bắt buộc, placeholder, nút `Thêm tài liệu`, `Tải file`, `Xóa`, `Thêm thiệt hại khác`. |
| **Thông tin Hồ sơ yêu cầu** | Section | - | - | Control UI: Section header.<br>- Gồm: `Loại hồ sơ`, `Loại yêu cầu giải quyết bồi thường`, `Nguồn hồ sơ`, `Hình thức tiếp nhận`, `Lĩnh vực phát sinh thiệt hại`, `Ngày văn bản yêu cầu bồi thường`, `Cơ quan giải quyết bồi thường`, `Vụ việc liên quan`.<br>- Không hiển thị Khối Tìm nhanh từ vụ việc xác định cơ quan giải quyết bồi thường, trường `Mã vụ việc` dạng Radio button. |
| Loại hồ sơ | Enum(String(100)) | - | `Giải quyết yêu cầu bồi thường` | Control UI: Text (Read-only).<br>- Cố định theo [Hồ sơ nguồn Dịch vụ công - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-dvc). |
| Nguồn hồ sơ | Enum(String(50)) | - | `Dịch vụ công` | Control UI: Text (Read-only).<br>- Cố định. |
| Hình thức tiếp nhận | Enum(String(50)) | - | `Dịch vụ công` | Control UI: Text (Read-only).<br>- Cố định. |
| Cơ quan giải quyết bồi thường | String(255) | - | Theo bản ghi | Control UI: Text (Read-only).<br>- Đơn vị tiếp nhận người dân đã chọn trên Dịch vụ công. |
| **Thông tin chi tiết người yêu cầu bồi thường** | Section | - | - | Control UI: Section header.<br>- Trường theo `Loại người yêu cầu` như MH02.<br>- `Trạng thái người bị thiệt hại` (`Còn sống` / `Đã mất`): hiển thị trong khối này như MH02; ẩn khi người bị thiệt hại là tổ chức (`Tư cách` = `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`, hoặc `Người bị thiệt hại` và `Loại người yêu cầu` = `Tổ chức`). |
| **Thông tin người bị thiệt hại** | Section | - | Ẩn | Control UI: Section header.<br>- Điều kiện hiển thị, trường theo `Loại người bị thiệt hại` như MH02.<br>- `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`: khối `Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại` gồm `Tên tổ chức bị thiệt hại`, `Mã số tổ chức`, `Quốc gia`, `Tỉnh / Thành phố`, `Phường / Xã`, `Địa chỉ chi tiết`. |
| **Văn bản làm căn cứ yêu cầu bồi thường** | List(Object) | - | Theo bản ghi | Control UI: Section header kèm Data grid (Read-only).<br>- Thứ tự như MH02: Data grid trước, sau đó `Hành vi gây thiệt hại của người thi hành công vụ`, `Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại`.<br>- Data grid: tệp của thành phần hồ sơ `Văn bản làm căn cứ yêu cầu bồi thường`.<br>- Cột: `STT`, `Tên văn bản căn cứ`, `File đính kèm`.<br>- Click tên tệp: mở xem tệp tại tab mới. |
| **Phương thức đề nghị nhận thông báo về việc giải quyết yêu cầu bồi thường** | Section | - | - | Control UI: Section header.<br>- Gồm `Phương thức nhận thông báo`, `Địa chỉ, đầu mối nhận thông báo`.<br>- Nhãn trường địa chỉ theo phương thức như MH02. |
| **Thiệt hại yêu cầu bồi thường** | List(Object) | - | Theo bản ghi | Control UI: Bảng 02 cấp (Read-only).<br>- Ẩn khi `Loại yêu cầu giải quyết bồi thường` = `Chỉ yêu cầu phục hồi danh dự`.<br>- Chỉ hiển thị nhóm và mục thiệt hại có yêu cầu, theo [Danh mục Loại thiệt hại yêu cầu bồi thường - Danh mục dữ liệu dùng chung - Tổng quan và quy tắc chung](../../Tai%20lieu%20tong%20hop/00_Tong_quan_va_Quy_tac_chung.md#danh-muc-dung-chung) [DM_27].<br>- Cột: `Thiệt hại yêu cầu bồi thường`, `Cách tính / Diễn giải công thức áp dụng`, `Số tiền yêu cầu bồi thường (đồng)`.<br>- Dòng nhóm: tổng tiền của nhóm; dòng cuối: `Tổng cộng số tiền yêu cầu bồi thường`.<br>- Có nút `Mở rộng tất cả`, `Thu gọn tất cả`. |
| **Đề nghị tạm ứng kinh phí** | Section | - | - | Control UI: Section header.<br>- Ẩn khi `Chỉ yêu cầu phục hồi danh dự`.<br>- `Có đề nghị tạm ứng kinh phí bồi thường (Điều 44)`: `Có` / `Không`.<br>- `Có`: hiển thị thêm `Tạm ứng Thiệt hại tinh thần`, `Tạm ứng Thiệt hại khác tính được ngay`, `Tổng số tiền đề nghị tạm ứng`. |
| **Thông tin người nhận & phương thức chi trả** | Section | - | - | Control UI: Section header.<br>- Ẩn khi `Chỉ yêu cầu phục hồi danh dự`.<br>- Chỉ hiển thị khi có đề nghị tạm ứng hoặc có thiệt hại yêu cầu bồi thường (như MH02).<br>- `Phương thức nhận tiền` = `Nhận qua chuyển khoản`: hiển thị thêm `Chủ tài khoản`, `Số tài khoản`, `Tên ngân hàng`, `Chi nhánh`. |
| **Nội dung khác & Tài liệu đính kèm** | Section | - | - | Control UI: Section header.<br>- `Đề nghị cơ quan giải quyết chủ động tiến hành phục hồi danh dự (Điều 57)` (`Có` / `Không`), `Hình thức đề nghị phục hồi danh dự mong muốn (Điều 56)`: chỉ hiển thị khi `Loại yêu cầu giải quyết bồi thường` có phục hồi danh dự (như MH02).<br>- `Yêu cầu khôi phục quyền và lợi ích hợp pháp khác (nếu có)`: `Có` / `Không`; `Có`: hiển thị thêm nội dung yêu cầu. |
| **Danh mục tài liệu gửi kèm** | List(Object) | - | Theo bản ghi | Control UI: Data grid (Read-only), nhóm theo thành phần hồ sơ.<br>- Dòng nhóm theo thứ tự: `(1) Văn bản yêu cầu bồi thường`, `(3) Văn bản ủy quyền thực hiện yêu cầu bồi thường`, `(4) Các tài liệu kèm theo khác`.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`; STT đánh lại trong từng nhóm.<br>- Nhóm không có tệp: hiển thị `Không có dữ liệu`.<br>- Nhóm (3) khi `Tư cách người yêu cầu bồi thường` = `Người bị thiệt hại`: hiển thị `Không áp dụng (Người yêu cầu là Người bị thiệt hại)`.<br>- Click tên tệp: mở xem tệp tại tab mới. |

###### 4.3.3.1.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | - Luôn hiển thị.<br>- Đóng màn hình xem chi tiết, quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 2 | Ký duyệt / Từ chối | Button | - Luôn hiển thị.<br>- Chỉ cho phép khi đồng thời:<br>+ Hồ sơ ở trạng thái `Chờ duyệt tiếp nhận`.<br>+ Người dùng thuộc Nhóm lãnh đạo của cấp đang ký duyệt Phiếu tiếp nhận.<br>- Trường hợp khác: hiển thị mờ (disabled), tooltip `[Tên thao tác] - [Lý do]`.<br>- Click nút: mở [MH04 - Màn hình Ký duyệt / Từ chối Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-mh04-ky-duyet-ptn) theo thao tác được chọn. |
| 3 | Sửa | Button | - **Hiển thị khi** đồng thời:<br>+ Hồ sơ có `Nguồn hồ sơ` = `Tiếp nhận mới`.<br>+ Hồ sơ do chính người dùng tiếp nhận.<br>+ Hồ sơ ở trạng thái `Bị trả lại`.<br>- Click nút: mở [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) ở chế độ sửa. |
| 4 | Xóa | Button | - **Hiển thị khi**: Cùng điều kiện với nút `Sửa`.<br>- Click nút: hiển thị popup `Xác nhận xóa` với nội dung [MSG-CFM-SYS-001].<br>- Tại popup, người dùng chọn:<br>+ **Đồng ý**: Xóa mềm hồ sơ như chức năng Xóa tại [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận); hiển thị thông báo [MSG-SUC-BTNN-TN-001]; quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận).<br>+ **Hủy bỏ**: Đóng popup, giữ nguyên màn hình chi tiết. |
| 5 | Phân công | Button | - Luôn hiển thị.<br>- Chỉ cho phép khi đồng thời:<br>+ Người dùng thuộc Nhóm lãnh đạo của đơn vị đang phân công tại Cấu hình luồng xử lý.<br>+ Hồ sơ ở trạng thái `Chờ phân công` hoặc `Đang phân công`.<br>- Trường hợp khác: hiển thị mờ (disabled), tooltip `[Tên thao tác] - [Lý do]`.<br>- Click nút: mở [MH05 - Popup Phân công xử lý hồ sơ](#tn-mh05-phan-cong). |
| 6 | Thu hồi | Button | - **Hiển thị khi** đồng thời:<br>+ Người dùng thuộc Nhóm lãnh đạo của đơn vị đã chuyển/phân công hồ sơ.<br>+ Hồ sơ thỏa điều kiện thu hồi tại [Quy tắc Thu hồi - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-thu-hoi).<br>- Click nút: mở [MH06 - Popup Xác nhận thu hồi](#tn-mh06-thu-hoi). |

- Nút `Ký duyệt`, `Từ chối`, `Phân công`: cố định vị trí, theo thứ tự này, ngay sau nút `Đóng`.
- Nút khác không thỏa điều kiện hiển thị: không hiển thị trên thanh thao tác.

---

<a id="tn-mh04-ky-duyet-ptn"></a>
##### 4.3.3.1.5. MH04 - Màn hình Ký duyệt / Từ chối Phiếu tiếp nhận

###### 4.3.3.1.5.1. Màn hình

- Mở từ thao tác `Ký duyệt` / `Từ chối` tại [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận), [MH03 - Màn hình Xem chi tiết hồ sơ tiếp nhận](#tn-mh03-chi-tiet) và màn hình Việc chờ Lãnh đạo xử lý.
- Bố cục, hiển thị văn bản và lịch sử trình ký theo [Màn hình Ký duyệt / Từ chối - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#xd-ky-duyet).
- Văn bản hiển thị: Phiếu tiếp nhận (Dự thảo) theo Mẫu 02/BTNN.

###### 4.3.3.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Thông tin trình ký** | Section | - | - | Control UI: Khối thông tin (Read-only).<br>- Gồm `Loại trình` (`Phiếu tiếp nhận`), `Mã vụ việc`, `Người yêu cầu`, `Hình thức tiếp nhận`, `Trạng thái hồ sơ`, `Cán bộ trình`, `Cấp ký duyệt` (`[n]/[tổng số cấp] - [Tên đơn vị]`). |
| **Lịch sử trình ký** | List(Object) | - | Theo bản ghi | Control UI: Timeline (Read-only).<br>- Các bước theo STT 10 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).<br>- Sắp xếp mới nhất lên đầu. |
| Hình thức ký | Label | - | `Ký số trên hệ thống` | Control UI: Khối thông báo.<br>- Chỉ hiển thị khi `Ký duyệt`.<br>- Cấp trung gian: nêu Lãnh đạo cấp tiếp theo.<br>- Cấp cuối: nêu ký số bằng chứng thư số của Lãnh đạo, hồ sơ chuyển `Chờ phân công`, chuyển Lãnh đạo đơn vị gốc phân công. |
| Ý kiến ký duyệt | String(2000) | Không | Trống | Control UI: Textarea.<br>- Chỉ hiển thị khi `Ký duyệt`. |
| Lý do từ chối | String(2000) | Có | Trống | Control UI: Textarea.<br>- Chỉ hiển thị khi `Từ chối`.<br>- Ghi chú dưới ô: *"Sau khi từ chối, hồ sơ chuyển [Bị trả lại] cho Cán bộ tiếp nhận cập nhật, trình lại."* |

###### 4.3.3.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | - Đóng màn hình, không lưu. |
| 2 | Ký duyệt | Button | Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Phiếu tiếp nhận đã được xử lý bởi người khác**: hiển thị [MSG-ERR-BTNN-LXL-001], đóng màn hình, tải lại danh sách.<br>- **TH2 - Cấp trung gian**: ghi nhận Ký duyệt, chuyển Nhóm lãnh đạo cấp tiếp theo; hồ sơ giữ `Chờ duyệt tiếp nhận`; ghi Lịch sử xử lý `Ký duyệt Phiếu tiếp nhận`.<br>- **TH3 - Cấp cuối**: ký số, ban hành Phiếu tiếp nhận; hồ sơ chuyển `Chờ phân công` tại đơn vị gốc theo STT 5 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan); ghi Lịch sử xử lý `Ký duyệt Phiếu tiếp nhận`, `Tiếp nhận hồ sơ`.<br>- Hiển thị thông báo thành công, tải lại danh sách. |
| 3 | Từ chối | Button | Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Bỏ trống `Lý do từ chối`**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên.<br>- **TH2 - Phiếu tiếp nhận đã được xử lý bởi người khác**: hiển thị [MSG-ERR-BTNN-LXL-001], đóng màn hình, tải lại danh sách.<br>- **TH3 - Hợp lệ**: hồ sơ chuyển `Bị trả lại`; ghi Lịch sử xử lý `Từ chối Phiếu tiếp nhận`; hiển thị thông báo thành công, tải lại danh sách. |

---

<a id="tn-mh05-phan-cong"></a>
##### 4.3.3.1.6. MH05 - Popup Phân công xử lý hồ sơ

###### 4.3.3.1.6.1. Màn hình

![MH05 - Popup Phân công xử lý hồ sơ](images/UC_Tiep_nhan_ho_so_MH05_Popup_Phan_cong.png)

- Hình thức phân công bắt buộc theo đúng luồng xử lý đã cấu hình cho đơn vị đang phân công, trong luồng tương ứng với Loại hồ sơ tại [Luồng phân công theo Loại hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-luong-phan-cong); người dùng không chọn hình thức.
  + Hình thức phân công `Chuyển đơn vị`: popup chỉ hiển thị trường `Đơn vị nhận`.
  + Hình thức phân công `Phân công cán bộ`: popup chỉ hiển thị trường `Cán bộ chủ trì`.
- Trước khi mở popup, hệ thống kiểm tra lại trạng thái hồ sơ tại máy chủ; hồ sơ đã được thành viên khác trong Nhóm lãnh đạo xử lý thì hiển thị [MSG-ERR-BTNN-LXL-001], tải lại danh sách, không mở popup.
- Mở popup lần đầu bởi Lãnh đạo đơn vị nhận: hệ thống ghi thời điểm xem cho lượt chuyển gần nhất theo quy tắc Lượt chuyển và tình trạng tại [Quy tắc phân công - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-quy-tac-phan-cong).

###### 4.3.3.1.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | - | Control UI: Heading text (Read-only).<br>- Hiển thị "Phân công xử lý hồ sơ [Mã vụ việc]". |
| Thông tin ngữ cảnh | String(500) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị "Đơn vị đang phân công: [Tên đơn vị]". |
| Thông báo chưa cấu hình | String(255) | - | Ẩn | Control UI: Text (Read-only).<br>- Chỉ hiển thị khi đơn vị đang phân công chưa được cấu hình luồng xử lý.<br>- Nội dung: "Đơn vị chưa được cấu hình luồng xử lý." |
| Đơn vị nhận | Enum(String(255)) | Có (khi hiển thị) | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn đơn vị nhận...`.<br>- Placeholder ô tìm kiếm: `Tìm theo mã hoặc tên đơn vị...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo Mã đơn vị hoặc Tên đơn vị.<br>- Không có đơn vị phù hợp: hiển thị "Không tìm thấy đơn vị phù hợp".<br>- Chỉ hiển thị khi luồng xử lý của đơn vị đang phân công được cấu hình Hình thức phân công là `Chuyển đơn vị`.<br>- Danh sách: các đơn vị cấp dưới trực tiếp đã chọn tại cấu hình của đơn vị đang phân công. |
| Cán bộ chủ trì | Enum(String(255)) | Có (khi hiển thị) | Trống | Control UI: Combobox có tìm kiếm, chọn 01 cán bộ.<br>- Placeholder: `Chọn cán bộ chủ trì...`.<br>- Placeholder ô tìm kiếm: `Tìm theo tên cán bộ...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo Họ tên cán bộ.<br>- Không có cán bộ phù hợp: hiển thị "Không tìm thấy cán bộ phù hợp".<br>- Chỉ hiển thị khi luồng xử lý của đơn vị đang phân công được cấu hình Hình thức phân công là `Phân công cán bộ`.<br>- Danh sách: cán bộ đã chọn tại cấu hình của đơn vị đang phân công.<br>- Hiển thị dạng "[Họ tên] - [Chức vụ]". |
| Ý kiến chỉ đạo | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập ý kiến chỉ đạo...". |

###### 4.3.3.1.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận phân công | Button | Khi người dùng click nút, hệ thống xử lý theo các trường hợp:<br>- **TH1 - Bỏ trống trường bắt buộc**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không lưu.<br>- **TH2 - Hồ sơ không còn hợp lệ** (đã được thành viên khác xử lý, đã bị thu hồi hoặc người dùng không còn thuộc Nhóm lãnh đạo; hệ thống kiểm tra lại tại máy chủ):<br>+ Hiển thị thông báo lỗi [MSG-ERR-BTNN-LXL-002].<br>- **TH3 - Đơn vị nhận không còn thuộc cấu hình của đơn vị đang phân công**:<br>+ Hiển thị "Đơn vị nhận không thuộc cấu hình luồng của đơn vị hiện tại."<br>- **TH4 - Hình thức phân công của đơn vị đang phân công đã thay đổi** (không còn là `Phân công cán bộ`):<br>+ Hiển thị "Đơn vị hiện tại không được cấu hình phân công cán bộ."<br>- **TH5 - Hợp lệ, đã chọn Đơn vị nhận (Chuyển đơn vị)**:<br>+ Lượt chuyển gần nhất (nếu có) chuyển "Đã xử lý"; tạo lượt chuyển mới "Chưa xử lý".<br>+ Đơn vị đang phân công = Đơn vị nhận; hồ sơ chuyển `Đang phân công`.<br>+ Ghi Lịch sử xử lý "Chuyển đơn vị": "Chuyển [Đơn vị nhận] phân công. Ý kiến chỉ đạo: [Nội dung]".<br>- **TH6 - Hợp lệ, đã chọn Cán bộ chủ trì (Phân công cán bộ)**:<br>+ Lượt chuyển gần nhất (nếu có) chuyển "Đã xử lý"; tạo lượt chuyển mới "Chưa xử lý".<br>+ Lưu Cán bộ chủ trì.<br>+ Hồ sơ chuyển `Chờ tiếp nhận` tại phân hệ tương ứng với Loại hồ sơ (Xác định cơ quan giải quyết bồi thường hoặc Giải quyết yêu cầu bồi thường).<br>+ Ghi Lịch sử xử lý "Phân công cán bộ": "Chủ trì: [Họ tên]. Ý kiến chỉ đạo: [Nội dung]".<br>- Sau TH5, TH6:<br>+ Hồ sơ nguồn khác `Tiếp nhận mới` chưa có Cán bộ tiếp nhận: ghi người phân công làm Cán bộ tiếp nhận.<br>+ Đóng popup, tải lại danh sách; hồ sơ chuyển sang tab `Đã xử lý` của người phân công.<br>+ Hiển thị thông báo thành công [MSG-SUC-BTNN-LXL-003]: "Đã phân công hồ sơ [Mã vụ việc]. Trạng thái: [Trạng thái]." |
| 2 | Hủy bỏ / Đóng (x) | Button / Icon | - Đóng popup, không lưu. |

---

<a id="tn-mh06-thu-hoi"></a>
##### 4.3.3.1.7. MH06 - Popup Xác nhận thu hồi

###### 4.3.3.1.7.1. Màn hình

![MH06 - Popup Xác nhận thu hồi](images/UC_Tiep_nhan_ho_so_MH06_Popup_Thu_hoi.png)

- Popup mở khi Lãnh đạo click `Thu hồi` tại tab `Đã xử lý` của MH01 hoặc tại MH03.
- Trước khi mở popup, hệ thống kiểm tra điều kiện thu hồi theo [Quy tắc Thu hồi - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-thu-hoi); hồ sơ không còn thỏa điều kiện thì hiển thị [MSG-ERR-BTNN-LXL-004], tải lại danh sách, không mở popup.

###### 4.3.3.1.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(50) | - | `Xác nhận` | Control UI: Heading text (Read-only). |
| Nội dung xác nhận | String(500) | - | Theo dữ liệu bản ghi | Control UI: Text (Read-only).<br>- Nội dung theo [MSG-CFM-BTNN-LXL-001]: "Bạn có chắc chắn muốn thu hồi hồ sơ [Mã vụ việc]?".<br>- Bên nhận đã mở xem hồ sơ: thêm " Bên nhận đã xem lúc [dd/mm/yyyy HH:mm]." |

###### 4.3.3.1.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đồng ý | Button | Khi người dùng click nút, hệ thống kiểm tra lại điều kiện thu hồi và xử lý theo các trường hợp:<br>- **TH1 - Hồ sơ không còn thỏa điều kiện thu hồi** (bên nhận đã xử lý trong lúc popup đang mở):<br>+ Đóng popup.<br>+ Hiển thị thông báo lỗi [MSG-ERR-BTNN-LXL-004].<br>+ Tải lại danh sách; hồ sơ giữ nguyên.<br>- **TH2 - Hợp lệ**:<br>+ Thực hiện thu hồi theo Kết quả thu hồi tại [Quy tắc Thu hồi - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-thu-hoi).<br>+ Đóng popup, hiển thị thông báo thành công [MSG-SUC-BTNN-LXL-002]: "Đã thu hồi hồ sơ [Mã vụ việc]. Trạng thái: [Trạng thái]."<br>+ Tải lại danh sách và badge số lượng; hồ sơ hiển thị tại tab `Chờ xử lý` của Lãnh đạo đã thu hồi. |
| 2 | Hủy bỏ | Button / Icon | - Đóng popup, không thu hồi; hồ sơ giữ nguyên. |

---

<a id="tn-mh07-trinh-ky-ptn"></a>
##### 4.3.3.1.8. MH07 - Popup Trình ký lại Phiếu tiếp nhận hồ sơ

###### 4.3.3.1.8.1. Màn hình

![Popup Trình ký Phiếu tiếp nhận hồ sơ](images/UC_Tiep_nhan_yeu_cau_MH04_Trinh_ky_phieu_tiep_nhan.png)

- Mở từ nút `Trình ký` tại [MH02 - Màn hình Tiếp nhận hồ sơ](#43313-mh02---màn-hình-tiếp-nhận-hồ-sơ) khi Cập nhật hồ sơ `Bị trả lại`; hệ thống ghi nhận thông tin cập nhật của form trước khi mở popup.
- Hồ sơ `Tiếp nhận mới` lưu lần đầu không mở popup; hệ thống tự trình theo STT 3 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).
- Bố cục như [MH21 - Popup Trình ký Quyết định tạm ứng kinh phí - Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_KinhPhi_BT.md#kp-mh21).
- `Ký số trên hệ thống`: 02 bước `Nhập thông tin` → `Kéo ô ký & chọn Lãnh đạo`.
- `Ký ngoài`: không hiển thị Thanh bước; tải lên tệp PDF đã ký & đóng dấu, bấm `Ban hành văn bản`, xác nhận để ban hành trực tiếp, không trình Lãnh đạo.
- Điền sẵn dữ liệu lần trình trước, gồm `Hình thức ký`, nguồn tệp văn bản, thông tin điền vào Mẫu 02/BTNN, tệp văn bản trình ký đã tải lên, `Tài liệu ban hành kèm theo`, `Tài liệu không ban hành kèm theo`, Lãnh đạo từng cấp, vị trí ô ký, `Nội dung trình`.
- Nội dung văn bản: [Mẫu 02/BTNN - Giấy tiếp nhận yêu cầu bồi thường - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](../../../Bieu_mau/Boi_thuong_nha_nuoc/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md); template [Mau_02_BTNN_Template.docx](../../../Bieu_mau/Boi_thuong_nha_nuoc/Mau_02_BTNN_Template.docx).
- Các thông tin khác của Mẫu 02/BTNN hệ thống tự lấy theo hồ sơ khi sinh văn bản, không hiển thị trên form ([Mẫu 02/BTNN - Giấy tiếp nhận yêu cầu bồi thường - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](../../../Bieu_mau/Boi_thuong_nha_nuoc/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md)); Họ tên người ký theo Lãnh đạo cấp ký duyệt cuối cùng tại Bước 2.

###### 4.3.3.1.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(100) | - | `TRÌNH KÝ PHIẾU TIẾP NHẬN HỒ SƠ` | Control UI: Header popup.<br>- Icon, tiêu đề.<br>- Dòng phụ: Mã vụ việc, Người yêu cầu, Hình thức tiếp nhận. |
| **Khối Lý do bị trả lại** | Section | - | Theo bản ghi | Control UI: Khối nền đỏ nhạt (Read-only), đặt đầu Bước 1.<br>- Gồm `Lý do trả lại`, `Lãnh đạo trả lại`, `Thời điểm trả lại` của lần Lãnh đạo Từ chối gần nhất. |
| Thanh bước | Stepper | - | Bước 1 | Control UI: Stepper 2 bước.<br>- Bước 1: `Nhập thông tin`.<br>- Bước 2: `Kéo ô ký & chọn Lãnh đạo`.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`. |
| Hình thức ký | Radio card | Có | Theo lần trình trước (`Ký số trên hệ thống`) | Control UI: Radio button dạng 02 thẻ chọn cùng chiều cao, đặt đầu form.<br>- Mỗi thẻ gồm tiêu đề và mô tả bên dưới.<br>Gồm:<br>+ Ký số trên hệ thống: mô tả `Trình Lãnh đạo ký duyệt trên phần mềm`<br>+ Ký ngoài (Ban hành trực tiếp): mô tả `Tải lên văn bản PDF đã ký và đóng dấu` |
| Tệp văn bản trình ký | Segmented | Có | `Sinh văn bản theo mẫu 02/BTNN` | Control UI: Segmented button.<br>Gồm:<br>+ Sinh văn bản theo mẫu 02/BTNN<br>+ Tải lên từ máy<br>- Chỉ hiển thị khi `Ký số trên hệ thống`. |
| **Khối Thông tin điền vào Mẫu 02/BTNN** | Section | - | - | Control UI: Khối nền xám.<br>- Chỉ hiển thị khi `Ký số trên hệ thống` và `Sinh văn bản theo mẫu 02/BTNN`.<br>- Chỉ gồm 03 trường nhập `Số, ký hiệu văn bản`, `Ngày văn bản`, `Nơi nhận`.<br>- Điền lại giá trị lần trình trước. |
| Số, ký hiệu văn bản | String(100) | Có | Theo lần trình trước | Control UI: Input text.<br>- `Placeholder: Nhập số, ký hiệu văn bản`<br>- Điền vào `##SoKyHieuVanBan##` của Mẫu 02/BTNN. |
| Ngày văn bản | Date | Có | Theo lần trình trước | Control UI: Datepicker.<br>- Định dạng `dd/mm/yyyy`.<br>- `Placeholder: dd/mm/yyyy`<br>- Điền vào `##NgayThangNamBanHanh##` của Mẫu 02/BTNN. |
| Nơi nhận | Text(2000) | Không | `- Như trên;`<br>`- [Tên cơ quan tiếp nhận hồ sơ] (để biết);`<br>`- Lưu: VT, HSVV.` | Control UI: Textarea.<br>- Mỗi nơi nhận 01 dòng.<br>- `Placeholder: Nhập nơi nhận, mỗi nơi nhận 01 dòng`<br>- Điền vào `##NoiNhan##` của Mẫu 02/BTNN. |
| Văn bản sinh theo mẫu | Panel | - | - | Control UI: Dòng ghi chú `Hệ thống tự động sinh Giấy tiếp nhận yêu cầu bồi thường theo Mẫu 02/BTNN từ thông tin hồ sơ tiếp nhận.` cùng 01 dòng với nút `Xem trước văn bản`.<br>- Chỉ hiển thị khi `Sinh văn bản theo mẫu 02/BTNN`. |
| Tệp văn bản trình ký (Tải lên từ máy) | File | Có | Trống | Control UI: Vùng kéo thả tệp.<br>- Chỉ hiển thị khi `Tải lên từ máy`.<br>- Chưa có tệp: nội dung `Kéo thả tệp vào đây hoặc Chọn tệp từ máy`, ghi chú `Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)`.<br>- Tệp `.doc`, `.docx`: hệ thống chuyển đổi sang PDF; trong lúc chuyển đổi hiển thị `Đang chuyển đổi sang PDF...`, khóa nút `Tiếp tục`.<br>- Có tệp: Thẻ tệp gồm biểu tượng định dạng, tên tệp, dung lượng; nút `Xem file`, `Xóa`.<br>- Định dạng `.pdf`, `.doc`, `.docx`.<br>- Dung lượng tối đa 50MB/file. |
| Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo | List(Object) | Không | Theo lần trình trước | Control UI: Bảng động, đặt dưới khối Tệp văn bản trình ký.<br>- 02 khối riêng: `Tài liệu ban hành kèm theo`, `Tài liệu không ban hành kèm theo`.<br>- `Ký ngoài`: chỉ hiển thị khối `Tài liệu ban hành kèm theo`.<br>- Cột, nút, định dạng, dung lượng, cách nhập như bảng `Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo` tại [MH21 - Popup Trình ký Quyết định tạm ứng kinh phí - Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_KinhPhi_BT.md#kp-mh21).<br>- Quy tắc tại [Quy tắc Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#xd-tai-lieu-trinh-ky). |
| Số, ký hiệu văn bản | String(100) | Có (khi hiển thị) | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Ký ngoài`.<br>- `Placeholder: Nhập số, ký hiệu văn bản` |
| Ngày văn bản | Date | Có (khi hiển thị) | Trống | Control UI: Datepicker.<br>- Chỉ hiển thị khi `Ký ngoài`.<br>- Định dạng `dd/mm/yyyy`.<br>- `Placeholder: dd/mm/yyyy` |
| Người ký | Combobox | Có (khi hiển thị) | Trống | Control UI: Combobox.<br>- Chỉ hiển thị khi `Ký ngoài`.<br>- Danh sách Lãnh đạo các cấp của luồng ký duyệt. |
| Tệp văn bản PDF đã ký & đóng dấu | File | Có (khi hiển thị) | Trống | Control UI: Vùng kéo thả tệp.<br>- Chỉ hiển thị khi `Ký ngoài`.<br>- Nội dung: `Kéo thả tệp PDF đã ký & đóng dấu vào đây, hoặc bấm Tải file (Chỉ chấp nhận .pdf, tối đa 50MB)`.<br>- Có tệp: Thẻ tệp (biểu tượng định dạng, tên tệp, dung lượng; nút `Xem file`, `Xóa`).<br>- Định dạng `.pdf`.<br>- Dung lượng tối đa 50MB/file. |
| Thông báo trạng thái sau ban hành | Label | - | - | Control UI: Dòng thông báo dưới khối tệp.<br>- Chỉ hiển thị khi `Ký ngoài`.<br>- Nội dung: *"Khi bấm Ban hành văn bản, Phiếu tiếp nhận được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống), chuyển trạng thái Đã ban hành; hồ sơ chuyển Chờ phân công."* |
| Xem trước văn bản (Bước 2) | Panel | - | - | Control UI: Trang A4 văn bản trình ký.<br>- Ô ký của từng cấp kéo thả được trên văn bản. |
| Cấp ký duyệt | Card | - | Theo luồng | Control UI: 01 thẻ/cấp theo STT 4 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).<br>- Tiêu đề: `Cấp [n] - [Đơn vị]`.<br>- Nhãn `Ký nháy` hiển thị khi cấp đó được cấu hình Ký nháy tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).<br>- Nút `Đặt chữ ký`; sau khi đặt: `Nhỏ`, `Vừa`, `Lớn`, `Đặt lại`. |
| Lãnh đạo (từng cấp) | Combobox | Có | Lãnh đạo đã chọn lần trình trước; lần trước tự trình theo Nhóm lãnh đạo: Lãnh đạo đầu tiên của Nhóm lãnh đạo cấp đó | Control UI: Combobox.<br>- Danh sách Lãnh đạo của cấp theo cấu hình luồng xử lý. |
| Nội dung trình | Text(2000) | Không | Theo lần trình trước | Control UI: Textarea.<br>- `Placeholder: Nhập nội dung trình Lãnh đạo...` |

###### 4.3.3.1.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Hình thức ký | Radio card | - `Ký số trên hệ thống`: hiển thị Thanh bước, Tệp văn bản trình ký, khối theo nguồn tệp, 02 khối Tài liệu đính kèm; nút `Tiếp tục`.<br>- `Ký ngoài`: ẩn Thanh bước, Tệp văn bản trình ký, Khối Thông tin điền vào Mẫu 02/BTNN, khối `Tài liệu không ban hành kèm theo`; hiển thị Số, ký hiệu văn bản, Ngày văn bản, Người ký, Tệp văn bản PDF đã ký & đóng dấu; nút `Ban hành văn bản`. |
| 2 | Xem trước văn bản | Button | - **TH1 - Bỏ trống trường bắt buộc** (`Số, ký hiệu văn bản`, `Ngày văn bản`): Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên.<br>- **TH2 - Hợp lệ**: sinh văn bản Mẫu 02/BTNN từ thông tin hồ sơ tiếp nhận và Khối Thông tin điền vào Mẫu 02/BTNN (Họ tên người ký theo Lãnh đạo cấp cuối đang chọn), mở xem văn bản tại popup xem văn bản. |
| 3 | Tiếp tục | Button | - **TH1 - Bỏ trống trường bắt buộc** (gồm `Số, ký hiệu văn bản`, `Ngày văn bản` khi `Sinh văn bản theo mẫu 02/BTNN`; tệp văn bản trình ký khi `Tải lên từ máy`; dòng `Tài liệu ban hành kèm theo` / `Tài liệu không ban hành kèm theo` đã nhập thiếu `Tên tài liệu, văn bản` hoặc tệp): Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên.<br>- **TH2 - Hợp lệ**: sinh văn bản (Sinh văn bản theo mẫu 02/BTNN) hoặc dùng tệp đã tải lên; chuyển Bước 2. |
| 4 | Đặt chữ ký | Button | - Sinh ô ký của cấp tương ứng trên văn bản; kéo ô để đặt vị trí. |
| 5 | Quay lại | Button | - Về Bước 1, giữ dữ liệu đã nhập. |
| 6 | Trình Lãnh đạo | Button | - **TH1 - Bỏ trống Lãnh đạo hoặc chưa đặt chữ ký**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; cấp chưa đặt chữ ký hiển thị "Chưa đặt chữ ký".<br>- **TH2 - Hợp lệ**:<br>+ Hồ sơ chuyển `Chờ duyệt tiếp nhận`, trình lại từ cấp 1; Phiếu tiếp nhận (Dự thảo) lưu văn bản trình ký (sinh lại theo Lãnh đạo cấp cuối đã chọn), thông tin điền vào Mẫu 02/BTNN, Lãnh đạo từng cấp, vị trí chữ ký, Nội dung trình, Tài liệu đính kèm.<br>+ Lãnh đạo cấp 1 nhận công việc theo STT 7 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).<br>+ Ghi `Lịch sử xử lý` `Trình ký lại Phiếu tiếp nhận`.<br>+ Đóng popup và form, hiển thị thông báo thành công, quay về [MH01 - Màn hình Danh sách hồ sơ tiếp nhận](#43312-mh01---màn-hình-danh-sách-hồ-sơ-tiếp-nhận). |
| 7 | Ban hành văn bản | Button | - Chỉ hiển thị khi `Ký ngoài`.<br>- **TH1 - Bỏ trống trường bắt buộc** (gồm tệp PDF đã ký): Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không ban hành.<br>- **TH2 - Hợp lệ**: hiển thị popup xác nhận, tiêu đề `Xác nhận ban hành văn bản`, nội dung nêu việc ban hành trực tiếp bỏ qua bước duyệt của Lãnh đạo trên hệ thống và trạng thái `Đã ban hành` sau ban hành; nút `Ban hành`, `Hủy bỏ`.<br>- Xác nhận `Ban hành`:<br>+ Phiếu tiếp nhận chuyển `Đã ban hành`; lưu Số, ký hiệu văn bản, Ngày văn bản, Người ký, tệp đã ký, `Tài liệu ban hành kèm theo`.<br>+ Ghi `Lịch sử xử lý` `Ban hành Phiếu tiếp nhận (Ký ngoài)`.<br>+ Hồ sơ chuyển `Chờ phân công` tại đơn vị gốc theo STT 5 tại [Quy tắc Phiếu tiếp nhận - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](#tn-phieu-tiep-nhan).<br>+ Đóng popup và form, hiển thị thông báo thành công. |
| 8 | Hủy bỏ | Button | - Nút tại footer popup hoặc icon `×` trên header.<br>- Đóng popup, không trình; hồ sơ giữ `Bị trả lại`; thông tin cập nhật của form đã được ghi nhận. |
| 9 | Tải tệp | Vùng kéo thả | Kéo thả tệp vào vùng hoặc bấm vào vùng để mở trình chọn tệp:<br>- **TH1 - Sai định dạng file**: Tệp không thuộc `.pdf`, `.doc`, `.docx` (Ký ngoài: `.pdf`): hiển thị [MSG-ERR-FILE-001], không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng**: Tệp vượt quá 50MB: hiển thị [MSG-ERR-FILE-002], không tiếp nhận tệp.<br>- **TH3 - Tệp `.doc`, `.docx` (Ký số trên hệ thống)**: chuyển đổi tệp sang PDF; trong lúc chuyển đổi hiển thị `Đang chuyển đổi sang PDF...`, khóa nút `Tiếp tục`; chuyển đổi xong hiển thị Thẻ tệp của tệp PDF.<br>- **TH4 - Hợp lệ**: hiển thị Thẻ tệp thay cho vùng kéo thả. |
| 10 | Xem file / Xóa | Button | - Tại Thẻ tệp.<br>- `Xem file`: mở tệp đã tải lên tại tab mới.<br>- `Xóa`: gỡ tệp, hiển thị lại vùng kéo thả. |
| 11 | Thêm tài liệu / Tải file / Xem file / Xóa (Tài liệu đính kèm) | Button / Icon button | - Như chức năng `Thêm tài liệu`, `Tải file (Tài liệu ban hành / không ban hành kèm theo)`, `Xem file / Xóa (Tài liệu ban hành / không ban hành kèm theo)` tại [MH21 - Popup Trình ký Quyết định tạm ứng kinh phí - Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_KinhPhi_BT.md#kp-mh21). |
