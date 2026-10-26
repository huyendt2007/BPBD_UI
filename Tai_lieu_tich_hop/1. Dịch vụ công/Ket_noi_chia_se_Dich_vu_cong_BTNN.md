# TÀI LIỆU KẾT NỐI, CHIA SẺ DỮ LIỆU VỚI DỊCH VỤ CÔNG QUỐC GIA
## Hồ sơ Yêu cầu bồi thường nhà nước (Cá nhân / Tổ chức) - Hệ thống quản lý bồi thường nhà nước (BTNN)

---

## 1. Danh sách danh mục chia sẻ

| STT | Mã danh mục | Tên danh mục | Trường sử dụng |
| :-- | :--- | :--- | :--- |
| 1 | DM_09 | Quốc tịch / Quốc gia | Quốc gia |
| 2 | DM_10 | Loại giấy tờ pháp lý | Loại giấy tờ thân nhân |
| 3 | - | Danh mục địa bàn | Tỉnh/Thành phố, Phường/Xã |
| 4 | DM_22 | Lĩnh vực phát sinh thiệt hại | Lĩnh vực phát sinh thiệt hại |
| 5 | DM_25 | Hình thức tiếp nhận hồ sơ bồi thường | Hình thức tiếp nhận |
| 6 | DM_26 | Tư cách người yêu cầu bồi thường | Tư cách người yêu cầu |
| 7 | RESOLUTION_SCOPE | Loại yêu cầu giải quyết bồi thường | Loại yêu cầu giải quyết bồi thường |
| 8 | - | Cơ quan giải quyết bồi thường (Module Quản lý Cơ cấu tổ chức) | Cơ quan giải quyết bồi thường |

---

## 2. Giá trị danh mục

### Quốc tịch / Quốc gia (DM_09)

- Chia sẻ qua API danh mục; nguồn: danh sách quốc gia theo chuẩn ISO 3166 (mã giá trị là mã quốc gia, VD `VN` - Việt Nam).

### Loại giấy tờ pháp lý (DM_10)

| Mã | Giá trị |
| :--- | :--- |
| CCCD | CMND/CCCD/Chứng minh quân đội |
| HO_CHIEU | Hộ chiếu |
| THE_THUONG_TRU | Thẻ thường trú |
| MA_SO_THUE | Mã số thuế |
| GIAY_TO_DI_LAI_QUOC_TE | Giấy tờ đi lại có giá trị quốc tế |

### Danh mục địa bàn

- Chia sẻ qua API danh mục.
- Gồm cấp Tỉnh/Thành phố và cấp Phường/Xã.
- Phường/Xã lọc theo mã Tỉnh/Thành phố.

### Lĩnh vực phát sinh thiệt hại (DM_22)

| Mã | Giá trị |
| :--- | :--- |
| QUAN_LY_HANH_CHINH | Trong hoạt động quản lý hành chính |
| TO_TUNG_HINH_SU | Trong hoạt động tố tụng hình sự |
| TO_TUNG_DAN_SU | Trong hoạt động tố tụng dân sự |
| TO_TUNG_HANH_CHINH | Trong hoạt động tố tụng hành chính |
| THI_HANH_AN_HINH_SU | Trong hoạt động thi hành án hình sự |
| THI_HANH_AN_DAN_SU | Trong hoạt động thi hành án dân sự |

### Hình thức tiếp nhận hồ sơ bồi thường (DM_25)

| Mã | Giá trị |
| :--- | :--- |
| DICH_VU_CONG | Qua môi trường số (Dịch vụ Công) |

- Giá trị cố định: hồ sơ từ Dịch vụ công luôn gửi `DICH_VU_CONG`.

### Tư cách người yêu cầu bồi thường (DM_26)

| Mã | Giá trị |
| :--- | :--- |
| NGUOI_BI_THIET_HAI | Người bị thiệt hại |
| NGUOI_THUA_KE | Người thừa kế của người bị thiệt hại |
| NGUOI_DAI_DIEN_THUA_KE | Người đại diện cho những người thừa kế của người bị thiệt hại |
| TO_CHUC_KE_THUA | Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại |
| NGUOI_DAI_DIEN | Người đại diện theo pháp luật của người bị thiệt hại |
| NGUOI_DUOC_UY_QUYEN | Cá nhân, pháp nhân được ủy quyền hợp pháp |

### Loại yêu cầu giải quyết bồi thường (RESOLUTION_SCOPE)

| Mã | Giá trị |
| :--- | :--- |
| CA_HAI | Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự) |
| CHI_BOI_THUONG | Chỉ yêu cầu bồi thường thiệt hại bằng tiền |
| CHI_PHUC_HOI | Chỉ yêu cầu phục hồi danh dự |

### Cơ quan giải quyết bồi thường (Module Quản lý Cơ cấu tổ chức)

- Chia sẻ qua API; nguồn: Module Quản lý Cơ cấu tổ chức của Hệ thống BTNN, lọc theo Tỉnh/Thành phố.
