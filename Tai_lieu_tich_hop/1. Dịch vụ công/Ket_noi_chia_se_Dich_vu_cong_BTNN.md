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
- 06 nhóm, 36 mục chi tiết; nhóm `VII. Các thiệt hại khác` không có mục chi tiết.

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
| TH_TS_08 | Mục | Thiệt hại xảy ra do vượt quá yêu cầu của tình thế cấp thiết (Khoản 6, Điều 23) |
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

---

<a id="dvc-gui-ket-qua"></a>
## 3. Gửi kết quả xử lý hồ sơ về Dịch vụ công

- Áp dụng cho hồ sơ có `Nguồn hồ sơ` = `Dịch vụ công`. Hồ sơ nguồn khác không gửi, kể cả hồ sơ đã chuyển sang cơ quan giải quyết bồi thường khác.
- Tại mỗi bước ở mục 3.1, hệ thống BTNN gửi sang Dịch vụ công các thông tin:
  + Mã hồ sơ Dịch vụ công, `Mã vụ việc`, `Mã hồ sơ`.
  + Sự kiện kích hoạt (bước).
  + Trạng thái vụ việc sau bước, theo mục 3.2.
  + Văn bản tương ứng của bước: link tệp PDF kèm mã băm; không gửi nội dung tệp.
- Cách thức gửi (giao thức, xác thực, gửi lại khi lỗi) do Dev thống nhất với Dịch vụ công.

<a id="dvc-gui-ket-qua-buoc"></a>
### 3.1. Các bước cần gửi

- Văn bản tương ứng:
  + Ký số: tệp PDF Lãnh đạo đã ký số.
  + Ký ngoài: tệp PDF đã ký, đóng dấu được tải lên khi `Ban hành văn bản`.
  + Báo cáo xác minh thiệt hại, Biên bản kết quả thương lượng việc giải quyết bồi thường: tệp PDF của dòng bắt buộc cùng tên trong bảng `Tài liệu đính kèm` của bước.
  + Mỗi bước gửi 01 văn bản; không gửi `Tài liệu ban hành kèm theo`, `Tài liệu không ban hành kèm theo`.

| Bước | Sự kiện kích hoạt | Văn bản tương ứng | Trạng thái vụ việc |
| :--- | :--- | :--- | :--- |
| 1 | Ký duyệt cấp cuối / Ban hành Thông báo yêu cầu bổ sung | Thông báo về việc yêu cầu bổ sung hồ sơ yêu cầu bồi thường (Mẫu 03/BTNN) | Yêu cầu bổ sung |
| 2 | Ký duyệt cấp cuối / Ban hành Thông báo không thụ lý | Thông báo không thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN) | Không thụ lý<br>Lý do `Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình`: Đã chuyển CQGQBT |
| 3 | Ký duyệt cấp cuối / Ban hành Thông báo thụ lý | Thông báo thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN) | Cử người giải quyết bồi thường |
| 4 | Ký duyệt cấp cuối / Ban hành Quyết định cử người giải quyết bồi thường | Quyết định cử người giải quyết bồi thường (Mẫu 06/BTNN) | Xác minh thiệt hại<br>Vụ việc chỉ yêu cầu phục hồi danh dự: Đang phục hồi danh dự |
| 5 | Hoàn thành xác minh | Báo cáo xác minh thiệt hại | Thương lượng |
| 6 | Lưu kết quả thương lượng với `Tình trạng tham gia thương lượng` = `Đồng ý thương lượng` | Biên bản kết quả thương lượng việc giải quyết bồi thường | Chờ ban hành QĐ |
| 7 | Ký duyệt cấp cuối / Ban hành Quyết định giải quyết bồi thường | Quyết định giải quyết bồi thường (Mẫu 18/BTNN) | Chờ chi trả |
| 8 | Ký duyệt cấp cuối / Ban hành Quyết định hủy quyết định giải quyết bồi thường | Quyết định hủy quyết định giải quyết bồi thường (Mẫu 20/BTNN) | Trạng thái vụ việc hiện hành (không đổi) |
| 9 | Ký duyệt cấp cuối / Ban hành Quyết định sửa chữa, bổ sung | Quyết định sửa chữa, bổ sung quyết định giải quyết bồi thường (Mẫu 21/BTNN) | Trạng thái vụ việc hiện hành (không đổi) |
| 10 | Ký duyệt cấp cuối / Ban hành Quyết định hoãn | Quyết định hoãn giải quyết bồi thường (Mẫu 22/BTNN) | Hoãn giải quyết |
| 11 | Ký duyệt cấp cuối / Ban hành Quyết định tiếp tục | Quyết định tiếp tục giải quyết bồi thường (Mẫu 23/BTNN) | Trạng thái trước khi hoãn / tạm đình chỉ |
| 12 | Ký duyệt cấp cuối / Ban hành Quyết định tạm đình chỉ | Quyết định tạm đình chỉ giải quyết yêu cầu bồi thường (Mẫu 24/BTNN) | Tạm đình chỉ |
| 13 | Ký duyệt cấp cuối / Ban hành Quyết định đình chỉ | Quyết định đình chỉ giải quyết yêu cầu bồi thường (Mẫu 25/BTNN) | Đình chỉ giải quyết |
| 14 | Ký duyệt cấp cuối / Ban hành Thông báo dừng giải quyết | Thông báo về việc dừng giải quyết yêu cầu bồi thường (Mẫu 05/BTNN) | Dừng giải quyết |
| 15 | Ký duyệt cấp cuối / Ban hành Thông báo tổ chức thực hiện phục hồi danh dự | Thông báo về việc tổ chức thực hiện phục hồi danh dự (Mẫu 26/BTNN) | Trạng thái vụ việc hiện hành<br>Vụ việc chỉ yêu cầu phục hồi danh dự: Đang phục hồi danh dự |
| 16 | Ký duyệt cấp cuối / Ban hành Thông báo chi trả | Thông báo về việc chi trả tiền bồi thường (Mẫu 32/BTNN) | Chờ chi trả |

- Bước lặp lại (VD hoãn giải quyết nhiều lần): mỗi lần ban hành gửi 01 lần.
- Vụ việc yêu cầu cả bồi thường thiệt hại và phục hồi danh dự: gửi 01 trạng thái vụ việc tổng hợp.
- Không gửi:
  + Hoàn thành phục hồi danh dự.
  + Chuyển CQGQBT.
  + Hoàn thành chi trả, Trả lại ngân sách nhà nước.
  + Kết quả thương lượng có `Tình trạng tham gia thương lượng` khác `Đồng ý thương lượng`.

<a id="dvc-ma-trang-thai"></a>
### 3.2. Mã trạng thái vụ việc

Cột `Mã trạng thái DVC` để trống, mapping khi thống nhất với Dịch vụ công.

| STT | Mã trạng thái BTNN | Trạng thái vụ việc | Mã trạng thái DVC |
| :--- | :--- | :--- | :--- |
| 1 | CHO_PHAN_CONG | Chờ phân công | |
| 2 | CHO_TIEP_NHAN | Chờ tiếp nhận | |
| 3 | CHO_DUYET | Chờ duyệt | |
| 4 | BI_TRA_LAI | Bị trả lại | |
| 5 | YEU_CAU_BO_SUNG | Yêu cầu bổ sung | |
| 6 | KHONG_THU_LY | Không thụ lý | |
| 7 | DA_CHUYEN_CQGQBT | Đã chuyển CQGQBT | |
| 8 | CU_NGUOI_GIAI_QUYET | Cử người giải quyết bồi thường | |
| 9 | CU_NGUOI_PHUC_HOI_DANH_DU | Cử người phục hồi danh dự | |
| 10 | XAC_MINH_THIET_HAI | Xác minh thiệt hại | |
| 11 | THUONG_LUONG | Thương lượng | |
| 12 | CHO_BAN_HANH_QD | Chờ ban hành QĐ | |
| 13 | CHO_CHI_TRA | Chờ chi trả | |
| 14 | DANG_PHUC_HOI_DANH_DU | Đang phục hồi danh dự | |
| 15 | HOAN_PHUC_HOI_DANH_DU | Hoãn phục hồi danh dự | |
| 16 | TU_CHOI_PHUC_HOI_DANH_DU | Từ chối phục hồi danh dự | |
| 17 | HOAN_GIAI_QUYET | Hoãn giải quyết | |
| 18 | TAM_DINH_CHI | Tạm đình chỉ | |
| 19 | DINH_CHI_GIAI_QUYET | Đình chỉ giải quyết | |
| 20 | DUNG_GIAI_QUYET | Dừng giải quyết | |
| 21 | HOAN_THANH | Hoàn thành | |
