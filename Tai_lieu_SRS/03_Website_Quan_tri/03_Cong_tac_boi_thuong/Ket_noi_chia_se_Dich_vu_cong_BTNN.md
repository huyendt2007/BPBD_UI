# TÀI LIỆU KẾT NỐI, CHIA SẺ DỮ LIỆU VỚI DỊCH VỤ CÔNG QUỐC GIA
## Hồ sơ Yêu cầu bồi thường nhà nước (Cá nhân / Tổ chức) - Hệ thống quản lý bồi thường nhà nước (BTNN)

---

## 1. Danh sách danh mục chia sẻ

| STT | Mã danh mục | Tên danh mục | Trường sử dụng |
| :-- | :--- | :--- | :--- |
| 1 | DM_10 | Loại giấy tờ pháp lý | Loại giấy tờ thân nhân |
| 2 | DM_26 | Tư cách người yêu cầu bồi thường | Tư cách người yêu cầu |
| 3 | DM_22 | Lĩnh vực phát sinh thiệt hại | Lĩnh vực phát sinh thiệt hại |
| 4 | - | Loại yêu cầu giải quyết bồi thường | Loại yêu cầu giải quyết bồi thường |
| 5 | - | Loại người yêu cầu | Loại người yêu cầu |
| 6 | - | Cơ quan giải quyết bồi thường | Cơ quan giải quyết bồi thường |
| 7 | DM_54 | Loại hồ sơ | Loại hồ sơ |
| 8 | DM_25 | Hình thức tiếp nhận | Hình thức tiếp nhận |

---

## 2. Giá trị danh mục

### Loại giấy tờ pháp lý (DM_10)

| Mã | Giá trị | Dùng trên E-Form |
| :--- | :--- | :--- |
| - | CMND/CCCD/Chứng minh quân đội | Có |
| - | Hộ chiếu | Có |
| - | Thẻ thường trú | Có |
| - | Mã số thuế | Không |
| - | Giấy tờ đi lại có giá trị quốc tế | Có |

### Tư cách người yêu cầu bồi thường (DM_26)

| Mã | Giá trị | Cá nhân | Tổ chức |
| :--- | :--- | :--- | :--- |
| - | Người bị thiệt hại | Có | Có |
| - | Người thừa kế của người bị thiệt hại | Có | Không |
| - | Người đại diện cho những người thừa kế của người bị thiệt hại | Có | Không |
| - | Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại | Không | Có |
| - | Người đại diện theo pháp luật của người bị thiệt hại | Có | Không |
| - | Cá nhân, pháp nhân được ủy quyền hợp pháp | Có | Có |

### Lĩnh vực phát sinh thiệt hại (DM_22)

| Mã | Giá trị |
| :--- | :--- |
| - | Trong hoạt động quản lý hành chính |
| - | Trong hoạt động tố tụng hình sự |
| - | Trong hoạt động tố tụng dân sự |
| - | Trong hoạt động tố tụng hành chính |
| - | Trong hoạt động thi hành án hình sự |
| - | Trong hoạt động thi hành án dân sự |

### Loại yêu cầu giải quyết bồi thường

| Mã | Giá trị |
| :--- | :--- |
| - | Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự) |
| - | Chỉ yêu cầu bồi thường thiệt hại bằng tiền |
| - | Chỉ yêu cầu phục hồi danh dự |

### Loại người yêu cầu

| Mã | Giá trị |
| :--- | :--- |
| - | Cá nhân |
| - | Tổ chức |

### Cơ quan giải quyết bồi thường

- Danh sách lấy theo danh mục cơ quan, đơn vị của Hệ thống BTNN.

### Loại hồ sơ (DM_54)

| Mã | Giá trị |
| :--- | :--- |
| LYC_01 | Xác định cơ quan giải quyết bồi thường |
| LYC_02 | Giải quyết yêu cầu bồi thường |

### Hình thức tiếp nhận (DM_25)

| Mã | Giá trị |
| :--- | :--- |
| - | Qua môi trường số (Dịch vụ Công) |
| - | Trực tiếp |
| - | Bộ phận Một cửa |
| - | Qua dịch vụ bưu chính |

---

## 3. Đặc tả trường dữ liệu

### Thông tin hồ sơ

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | Mã hồ sơ Dịch vụ công | String (50) | Có |
| 2 | Thời điểm nộp | DateTime (dd/mm/yyyy hh:mm:ss) | Có |
| 3 | Loại người yêu cầu | String (20) – Loại người yêu cầu | Có |
| 4 | Loại hồ sơ | String (20) – DM_54 | Có |
| 5 | Hình thức tiếp nhận | String (100) – DM_25 | Có |

### Cơ quan tiếp nhận và nội dung yêu cầu

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | Tỉnh/Thành phố cơ quan giải quyết | String (100) | Có |
| 2 | Cơ quan giải quyết bồi thường | String (50) – Cơ quan giải quyết bồi thường | Có |
| 3 | Loại yêu cầu giải quyết bồi thường | String (100) – Loại yêu cầu giải quyết bồi thường | Có |
| 4 | Lĩnh vực phát sinh thiệt hại | String (100) – DM_22 | Có |
| 5 | Hành vi gây thiệt hại của người thi hành công vụ | String (2000) | Không |

### Cá nhân – người yêu cầu

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | Tư cách người yêu cầu | String (100) – DM_26 | Có |
| 2 | Họ và tên | String (255) | Có |
| 3 | Loại giấy tờ thân nhân | String (50) – DM_10 | Có |
| 4 | Số giấy tờ thân nhân | String (50) | Có |
| 5 | Số điện thoại | String (20) | Có |
| 6 | Email | String (255) | Không |
| 7 | Quốc gia | String (100) | Có |
| 8 | Tỉnh/Thành phố | String (100) | Có |
| 9 | Phường/Xã | String (100) | Có |
| 10 | Địa chỉ chi tiết | String (500) | Có |

### Cá nhân – người bị thiệt hại

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | Họ và tên người bị thiệt hại | String (100) | Không |
| 2 | Ngày sinh | Date (dd/mm/yyyy) | Không |
| 3 | Loại giấy tờ thân nhân | String (50) – DM_10 | Không |
| 4 | Số giấy tờ thân nhân | String (50) | Không |
| 5 | Tỉnh/Thành phố | String (100) | Không |
| 6 | Phường/Xã | String (100) | Không |
| 7 | Địa chỉ chi tiết | String (500) | Không |

### Tổ chức – người yêu cầu

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | Tư cách người yêu cầu | String (100) – DM_26 | Có |
| 2 | Tên tổ chức | String (255) | Có |
| 3 | Mã số tổ chức | String (50) | Có |
| 4 | Số điện thoại | String (20) | Có |
| 5 | Email | String (255) | Không |
| 6 | Quốc gia | String (100) | Có |
| 7 | Tỉnh/Thành phố | String (100) | Có |
| 8 | Phường/Xã | String (100) | Có |
| 9 | Địa chỉ chi tiết | String (500) | Có |

### Tổ chức bị thiệt hại đã chấm dứt tồn tại

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | Tên tổ chức bị thiệt hại | String (255) | Không |
| 2 | Mã số tổ chức | String (50) | Không |

### Tổ chức – người bị thiệt hại

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | Họ và tên người bị thiệt hại | String (100) | Không |
| 2 | Ngày sinh | Date (dd/mm/yyyy) | Không |
| 3 | Loại giấy tờ thân nhân | String (50) – DM_10 | Không |
| 4 | Số giấy tờ thân nhân | String (50) | Không |
| 5 | Tỉnh/Thành phố | String (100) | Không |
| 6 | Phường/Xã | String (100) | Không |
| 7 | Địa chỉ chi tiết | String (500) | Không |

### Văn bản làm căn cứ

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | STT | Number (3) | Có |
| 2 | Tên văn bản, căn cứ | String (255) | Không |
| 3 | Tải file | File | Không |

### Tài liệu đính kèm

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc |
| :-- | :--- | :--- | :--- |
| 1 | STT | Number (3) | Có |
| 2 | Tên tài liệu | String (255) | Có điều kiện (dòng có tệp) |
| 3 | File đính kèm | File | Không |

### Thiệt hại, phục hồi danh dự, tạm ứng, người nhận tiền

- E-Form không có trường thuộc nhóm này.
