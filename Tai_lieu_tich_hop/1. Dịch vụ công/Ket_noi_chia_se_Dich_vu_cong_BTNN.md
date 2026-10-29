# TÀI LIỆU KẾT NỐI, CHIA SẺ DỮ LIỆU VỚI DỊCH VỤ CÔNG QUỐC GIA
## Hồ sơ Yêu cầu bồi thường nhà nước (Cá nhân / Tổ chức) - Hệ thống quản lý bồi thường nhà nước (BTNN)

---

<a id="kn-danh-sach-danh-muc"></a>
## 1. Danh sách danh mục chia sẻ

STT trường theo bảng III của `EForm_DVC_YeuCauBoiThuong.md`.

| STT | Mã danh mục | Tên danh mục | Trường sử dụng trên E-Form |
| :-- | :--- | :--- | :--- |
| 1 | DM_09 | [Quốc tịch / Quốc gia](#kn-dm-09) | Quốc gia (STT 23, 42, 48) |
| 2 | DM_10 | [Loại giấy tờ pháp lý](#kn-dm-10) | Loại giấy tờ thân nhân (STT 13, 32) |
| 3 | - | [Danh mục địa bàn](#kn-dia-ban) | Tỉnh/Thành phố (STT 4, 24, 43, 49), Phường/Xã (STT 25, 44, 50) |
| 4 | DM_22 | [Lĩnh vực phát sinh thiệt hại](#kn-dm-22) | Lĩnh vực phát sinh thiệt hại (STT 2) |
| 5 | DM_25 | [Hình thức tiếp nhận hồ sơ bồi thường](#kn-dm-25) | Không hiển thị trên E-Form; hệ thống gán cố định `Dịch vụ công` |
| 6 | DM_26 | [Tư cách người yêu cầu bồi thường](#kn-dm-26) | Tư cách người yêu cầu bồi thường (STT 7) |
| 7 | DM_27 | [Loại thiệt hại yêu cầu bồi thường](#kn-dm-27) | Bảng thiệt hại yêu cầu bồi thường (STT 56 đến STT 63) |
| 8 | DM_28 | [Phương thức nhận tiền bồi thường/tạm ứng](#kn-dm-28) | Phương thức nhận tiền (STT 71) |
| 9 | RESOLUTION_SCOPE | [Loại yêu cầu giải quyết bồi thường](#kn-resolution-scope) | Loại yêu cầu giải quyết bồi thường (STT 1) |
| 10 | - | [Cơ quan giải quyết bồi thường](#kn-co-quan-gqbt) (Module Quản lý Cơ cấu tổ chức) | Cơ quan giải quyết bồi thường (STT 5) |

---

## 2. Giá trị danh mục

<a id="kn-dm-09"></a>
### Quốc tịch / Quốc gia (DM_09)

- Chia sẻ qua API danh mục; nguồn: danh sách quốc gia theo chuẩn ISO 3166 (mã giá trị là mã quốc gia, VD `VN` - Việt Nam).

<a id="kn-dm-10"></a>
### Loại giấy tờ pháp lý (DM_10)

| Mã | Giá trị |
| :--- | :--- |
| CCCD | CMND/CCCD/Chứng minh quân đội |
| HO_CHIEU | Hộ chiếu |
| THE_THUONG_TRU | Thẻ thường trú |
| MA_SO_THUE | Mã số thuế |
| GIAY_TO_DI_LAI_QUOC_TE | Giấy tờ đi lại có giá trị quốc tế |

- E-Form không dùng giá trị `MA_SO_THUE`.

<a id="kn-dia-ban"></a>
### Danh mục địa bàn

- Chia sẻ qua API danh mục.
- Gồm cấp Tỉnh/Thành phố và cấp Phường/Xã.
- Phường/Xã lọc theo mã Tỉnh/Thành phố.

<a id="kn-dm-22"></a>
### Lĩnh vực phát sinh thiệt hại (DM_22)

| Mã | Giá trị |
| :--- | :--- |
| QUAN_LY_HANH_CHINH | Trong hoạt động quản lý hành chính |
| TO_TUNG_HINH_SU | Trong hoạt động tố tụng hình sự |
| TO_TUNG_DAN_SU | Trong hoạt động tố tụng dân sự |
| TO_TUNG_HANH_CHINH | Trong hoạt động tố tụng hành chính |
| THI_HANH_AN_HINH_SU | Trong hoạt động thi hành án hình sự |
| THI_HANH_AN_DAN_SU | Trong hoạt động thi hành án dân sự |

<a id="kn-dm-25"></a>
### Hình thức tiếp nhận hồ sơ bồi thường (DM_25)

| Mã | Giá trị |
| :--- | :--- |
| DICH_VU_CONG | Dịch vụ công |

- Giá trị cố định: hồ sơ từ Dịch vụ công luôn gửi `DICH_VU_CONG`.

<a id="kn-dm-26"></a>
### Tư cách người yêu cầu bồi thường (DM_26)

| Mã | Giá trị | Cá nhân | Tổ chức |
| :--- | :--- | :--- | :--- |
| NGUOI_BI_THIET_HAI | Người bị thiệt hại | Có | Có |
| NGUOI_THUA_KE | Người thừa kế của người bị thiệt hại | Có | Không |
| NGUOI_DAI_DIEN_THUA_KE | Người đại diện cho những người thừa kế của người bị thiệt hại | Có | Không |
| TO_CHUC_KE_THUA | Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại | Không | Có |
| NGUOI_DAI_DIEN | Người đại diện theo pháp luật của người bị thiệt hại | Có | Không |
| NGUOI_DUOC_UY_QUYEN | Cá nhân, pháp nhân được ủy quyền hợp pháp | Có | Có |

- Cột `Cá nhân` / `Tổ chức`: giá trị được chọn khi `Loại người yêu cầu` tương ứng (thuộc tính `for_individual` / `for_organization` trên API).

<a id="kn-dm-27"></a>
### Loại thiệt hại yêu cầu bồi thường (DM_27)

- Danh mục 02 cấp:
  - Cấp nhóm: mã nhóm, tên nhóm.
  - Cấp mục chi tiết: mã mục = mã nhóm + `_` + số thứ tự 02 chữ số; thuộc đúng 01 nhóm; tên mục.
- 06 nhóm, 35 mục chi tiết; nhóm `VII. Các thiệt hại khác` không có mục chi tiết.

| Mã | Cấp | Tên |
| :--- | :--- | :--- |
| **TH_TS** | Nhóm | **I. Thiệt hại do tài sản bị xâm phạm (Điều 23)** |
| TH_TS_01 | Mục | Tài sản đã bị phát mại, bị mất (Khoản 1, Điều 23) |
| TH_TS_02 | Mục | Tài sản bị hư hỏng có thể sửa chữa, khôi phục (Khoản 2, Điều 23) |
| TH_TS_03 | Mục | Tài sản bị hư hỏng không thể sửa chữa, khôi phục (Khoản 2, Điều 23) |
| TH_TS_04 | Mục | Thu nhập thực tế bị mất do không sử dụng, khai thác được tài sản - Đối với tài sản có cho thuê trên thị trường (Khoản 3, Điều 23) |
| TH_TS_05 | Mục | Thu nhập thực tế bị mất do không sử dụng, khai thác được tài sản - Đối với tài sản không có cho thuê trên thị trường (Khoản 3, Điều 23) |
| TH_TS_06 | Mục | Hoàn trả các khoản tiền đã nộp vào ngân sách nhà nước, bị tịch thu, thi hành án, khoản tiền đặt để bảo đảm và khoản lãi (Khoản 4, Điều 23) |
| TH_TS_07 | Mục | Tiền phạt do vi phạm nghĩa vụ trong giao dịch dân sự, kinh tế đã có hiệu lực và khoản lãi của khoản tiền phạt (Khoản 5, Điều 23) |
| **TH_TN** | Nhóm | **II. Thiệt hại do thu nhập thực tế bị mất hoặc bị giảm sút (Điều 24)** |
| TH_TN_01 | Mục | Thu nhập ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân (Điểm a, Khoản 1, Điều 24) |
| TH_TN_02 | Mục | Thu nhập không ổn định từ tiền lương, tiền công bị mất hoặc bị giảm sút của cá nhân (Điểm b, Khoản 1, Điều 24) |
| TH_TN_03 | Mục | Thu nhập không ổn định theo mùa vụ bị mất hoặc bị giảm sút của cá nhân (Điểm c, Khoản 1, Điều 24) |
| TH_TN_04 | Mục | Thu nhập thực tế bị mất hoặc bị giảm sút của tổ chức (Khoản 2, Điều 24) |
| **TH_CHET** | Nhóm | **III. Thiệt hại về vật chất do người bị thiệt hại chết (Điều 25)** |
| TH_CHET_01 | Mục | Chi phí khám bệnh, chữa bệnh cho người bị thiệt hại trước khi chết (Khoản 1, Điều 25) |
| TH_CHET_02 | Mục | Chi phí bồi dưỡng sức khỏe cho người bị thiệt hại trước khi chết (Khoản 2, Điều 25) |
| TH_CHET_03 | Mục | Chi phí cho người chăm sóc người bị thiệt hại trong thời gian khám bệnh, chữa bệnh trước khi chết (Khoản 3, Điều 25) |
| TH_CHET_04 | Mục | Chi phí cho việc mai táng người bị thiệt hại chết (Khoản 4, Điều 25) |
| TH_CHET_05 | Mục | Tiền cấp dưỡng cho những người mà người bị thiệt hại chết đang thực hiện nghĩa vụ cấp dưỡng (Khoản 5, Điều 25) |
| **TH_SK** | Nhóm | **IV. Thiệt hại về vật chất do sức khỏe bị xâm phạm (Điều 26)** |
| TH_SK_01 | Mục | Chi phí khám bệnh, chữa bệnh cho người bị thiệt hại do sức khỏe bị xâm phạm (Khoản 1, Điều 26) |
| TH_SK_02 | Mục | Chi phí bồi dưỡng sức khỏe cho người bị thiệt hại trong thời gian khám bệnh, chữa bệnh (Khoản 2, Điều 26) |
| TH_SK_03 | Mục | Chi phí cho người chăm sóc người bị thiệt hại trong thời gian khám bệnh, chữa bệnh (Khoản 3, Điều 26) |
| TH_SK_04 | Mục | Chi phí cho người thường xuyên chăm sóc trong trường hợp người bị thiệt hại mất khả năng lao động (Điểm a, Khoản 4, Điều 26) |
| TH_SK_05 | Mục | Tiền cấp dưỡng cho những người mà người bị thiệt hại mất khả năng lao động đang thực hiện nghĩa vụ cấp dưỡng (Điểm b, Khoản 4, Điều 26) |
| **TH_TT** | Nhóm | **V. Thiệt hại về tinh thần (Điều 27)** |
| TH_TT_01 | Mục | Thiệt hại về tinh thần do bị áp dụng biện pháp xử lý hành chính giáo dục tại xã, phường, thị trấn (Khoản 1, Điều 27) |
| TH_TT_02 | Mục | Thiệt hại về tinh thần do bị áp dụng biện pháp tạm giữ người theo thủ tục hành chính, bị đưa vào trường giáo dưỡng, cơ sở giáo dục bắt buộc, cơ sở cai nghiện bắt buộc (Khoản 2, Điều 27) |
| TH_TT_03 | Mục | Thiệt hại về tinh thần do bị giữ trong trường hợp khẩn cấp trong hoạt động tố tụng hình sự (Điểm a, Khoản 3, Điều 27) |
| TH_TT_04 | Mục | Thiệt hại về tinh thần do bị bắt, tạm giữ, tạm giam, chấp hành hình phạt tù (Điểm b, Khoản 3, Điều 27) |
| TH_TT_05 | Mục | Thiệt hại về tinh thần khi bị khởi tố, truy tố, xét xử mà không bị bắt, tạm giữ, tạm giam hoặc chấp hành hình phạt không phải là hình phạt tù (Điểm c, Khoản 3, Điều 27) |
| TH_TT_06 | Mục | Thiệt hại về tinh thần khi chấp hành hình phạt cải tạo không giam giữ, phạt tù cho hưởng án treo (Điểm d, Khoản 3, Điều 27) |
| TH_TT_07 | Mục | Thiệt hại về tinh thần trong thời gian đã chấp hành xong hình phạt đến khi có bản án, quyết định xác định thuộc trường hợp được bồi thường (Điểm đ, Khoản 3, Điều 27) |
| TH_TT_08 | Mục | Thiệt hại về tinh thần trong trường hợp người bị thiệt hại chết (Khoản 4, Điều 27) |
| TH_TT_09 | Mục | Thiệt hại về tinh thần trong trường hợp sức khỏe bị xâm phạm (Khoản 5, Điều 27) |
| TH_TT_10 | Mục | Thiệt hại về tinh thần trong trường hợp công chức bị xử lý kỷ luật buộc thôi việc trái pháp luật (Khoản 6, Điều 27) |
| **TH_CPK** | Nhóm | **VI. Các chi phí khác được bồi thường (Điều 28)** |
| TH_CPK_01 | Mục | Chi phí thuê phòng nghỉ, chi phí đi lại, in ấn tài liệu trong quá trình khiếu nại, tố cáo, tham gia tố tụng (Điểm a, Khoản 1 và Điểm a, Khoản 2, Điều 28) |
| TH_CPK_02 | Mục | Chi phí gửi đơn thư đến cơ quan nhà nước, người có thẩm quyền giải quyết (Điểm a, Khoản 1 và Điểm b, Khoản 2, Điều 28) |
| TH_CPK_03 | Mục | Chi phí thuê người bào chữa, người bảo vệ quyền và lợi ích hợp pháp của người bị thiệt hại (Điểm a, Khoản 1 và Điểm c, Khoản 2, Điều 28) |
| TH_CPK_04 | Mục | Chi phí đi lại để thăm gặp của thân nhân người bị tạm giữ, người bị tạm giam, người chấp hành án phạt tù trong tố tụng hình sự (Điểm b, Khoản 1 và Khoản 3, Điều 28) |
| **TH_KHAC** | Nhóm | **VII. Các thiệt hại khác** |

- Nhóm `TH_KHAC`: không có mục chi tiết; người nộp thêm được nhiều dòng, mỗi dòng nhập `Tên / nội dung thiệt hại`, `Cách tính / diễn giải`, `Số tiền`.
- Chia sẻ qua API danh mục `DM_27`:
  - Bản ghi nhóm: `depth` = 0, `parent_code` rỗng.
  - Bản ghi mục chi tiết: `depth` = 1, `parent_code` = mã nhóm.
  - Thứ tự hiển thị: `sort_order`.

<a id="kn-dm-28"></a>
### Phương thức nhận tiền bồi thường/tạm ứng (DM_28)

| Mã | Giá trị |
| :--- | :--- |
| TIEN_MAT | Nhận tiền mặt |
| CHUYEN_KHOAN | Nhận qua chuyển khoản |

<a id="kn-resolution-scope"></a>
### Loại yêu cầu giải quyết bồi thường (RESOLUTION_SCOPE)

| Mã | Giá trị |
| :--- | :--- |
| CA_HAI | Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự) |
| CHI_BOI_THUONG | Chỉ yêu cầu bồi thường thiệt hại bằng tiền |
| CHI_PHUC_HOI | Chỉ yêu cầu phục hồi danh dự |

<a id="kn-co-quan-gqbt"></a>
### Cơ quan giải quyết bồi thường (Module Quản lý Cơ cấu tổ chức)

- Chia sẻ qua API; nguồn: Module Quản lý Cơ cấu tổ chức của Hệ thống BTNN, lọc theo Tỉnh/Thành phố.
