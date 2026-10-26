# ĐẶC TẢ YÊU CẦU KỸ THUẬT VÀ GIAO DIỆN BIỂU MẪU ĐIỆN TỬ (E-FORM)
## THỦ TỤC: YÊU CẦU BỒI THƯỜNG NHÀ NƯỚC
*(Tài liệu trích xuất phục vụ xây dựng E-Form trên Cổng Dịch vụ công Quốc gia / Hệ thống thông tin giải quyết thủ tục hành chính)*

---

### I. PHẠM VI ÁP DỤNG

- Áp dụng cho hồ sơ yêu cầu bồi thường nộp qua Cổng Dịch vụ công, người yêu cầu là **cá nhân** hoặc **tổ chức**.
- Một E-Form dùng chung cho 2 loại người yêu cầu:
  - Khối A, B, E, F: dùng chung.
  - Khối C, D: hiển thị trường theo `Loại người yêu cầu`.
- Dữ liệu E-Form khi nộp thành công được chuyển sang màn Tiếp nhận hồ sơ của Hệ thống quản lý bồi thường nhà nước theo bảng ánh xạ tại mục III.

---

### II. BẢNG ĐẶC TẢ CHI TIẾT CÁC TRƯỜNG THÔNG TIN TRÊN E-FORM

| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | **CƠ QUAN TIẾP NHẬN HỒ SƠ** | Section | - | - | Control UI: Section header.<br>- Chọn cơ quan có thẩm quyền tiếp nhận và giải quyết bồi thường. |
| 1 | Tỉnh/Thành phố cơ quan giải quyết | Enum | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- Giá trị theo Danh mục địa bàn. |
| 2 | Cơ quan giải quyết bồi thường | Enum | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn cơ quan giải quyết bồi thường...`<br>- Lọc theo `Tỉnh/Thành phố cơ quan giải quyết` đã chọn.<br>- Danh sách cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại.<br>- Giá trị theo Module Quản lý Cơ cấu tổ chức (Cơ quan giải quyết bồi thường). |
| **B** | **THÔNG TIN TỔNG QUAN NỘI DUNG YÊU CẦU** | Section | - | - | Control UI: Section header. |
| 3 | Loại yêu cầu giải quyết bồi thường | Enum | Có | Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự) | Control UI: Radio button.<br>- Giá trị theo Danh mục Loại yêu cầu giải quyết bồi thường (RESOLUTION_SCOPE). |
| 4 | Lĩnh vực phát sinh thiệt hại | Enum | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn lĩnh vực...`<br>- Giá trị theo Danh mục Lĩnh vực phát sinh thiệt hại (DM_22). |
| 5 | Hành vi gây thiệt hại của người thi hành công vụ | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: `Tóm tắt hành vi gây thiệt hại của người thi hành công vụ`<br>- Tối đa 2000 ký tự. |
| **C** | **THÔNG TIN NGƯỜI YÊU CẦU BỒI THƯỜNG** | Section | - | - | Control UI: Section header. |
| 6 | Loại người yêu cầu | Enum | Có | Cá nhân | Control UI: Radio button.<br>- Enum cố định: `CA_NHAN` = Cá nhân; `TO_CHUC` = Tổ chức.<br>- Chọn `Cá nhân`: hiển thị nhóm C1; khối D theo trường hợp Cá nhân.<br>- Chọn `Tổ chức`: hiển thị nhóm C2; khối D theo trường hợp Tổ chức (D1, D2).<br>- Đổi giá trị: ẩn nhóm không áp dụng, không lưu dữ liệu trong nhóm đó. |
| **C1** | **Trường hợp Loại người yêu cầu = Cá nhân** | Section | - | - | Control UI: Nhóm trường.<br>- Áp dụng khi `Loại người yêu cầu` = `Cá nhân`. |
| 7 | Tư cách người yêu cầu | Enum | Có | Người bị thiệt hại | Control UI: Combobox.<br>- Giá trị theo Danh mục Tư cách người yêu cầu bồi thường (DM_26), chỉ gồm `NGUOI_BI_THIET_HAI`, `NGUOI_THUA_KE`, `NGUOI_DAI_DIEN_THUA_KE`, `NGUOI_DAI_DIEN`, `NGUOI_DUOC_UY_QUYEN`.<br>- Chọn giá trị khác `Người bị thiệt hại`: hiển thị khối D (trường hợp Cá nhân).<br>- Chọn lại `Người bị thiệt hại`: ẩn khối D, không lưu dữ liệu trong khối. |
| 8 | Họ và tên | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`<br>- Tự động điền theo tài khoản đăng nhập Cổng Dịch vụ công (nếu có). |
| 9 | Loại giấy tờ thân nhân | Enum | Có | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn loại giấy tờ --`<br>- Giá trị theo Danh mục Loại giấy tờ pháp lý (DM_10), không gồm `MA_SO_THUE` - Mã số thuế. |
| 10 | Số giấy tờ thân nhân | String(50) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...`<br>- Tự động điền theo tài khoản đăng nhập Cổng Dịch vụ công (nếu có). |
| 11 | Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`<br>- Kiểm tra:<br>+ Đủ 10 chữ số.<br>+ Chỉ gồm chữ số.<br>+ Bắt đầu bằng đầu số di động hợp lệ tại Việt Nam: 03, 05, 07, 08, 09. |
| 12 | Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`<br>- Có dữ liệu: kiểm tra đúng định dạng email. |
| 13 | Quốc gia | Enum | Có | Việt Nam | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn quốc gia...`<br>- Giá trị theo Danh mục Quốc tịch / Quốc gia (DM_09).<br>- Quyết định kiểu nhập của `Tỉnh/Thành phố`, `Phường/Xã`. |
| 14 | Tỉnh/Thành phố | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- `Quốc gia` = `Việt Nam`: giá trị theo Danh mục địa bàn.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 15 | Phường/Xã | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Chọn phường/xã...`<br>- `Quốc gia` = `Việt Nam`: giá trị theo Danh mục địa bàn (lọc theo Tỉnh/Thành phố đã chọn).<br>- Chưa chọn `Tỉnh/Thành phố`: khóa, placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 16 | Địa chỉ chi tiết | String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| **C2** | **Trường hợp Loại người yêu cầu = Tổ chức** | Section | - | Ẩn | Control UI: Nhóm trường.<br>- Áp dụng khi `Loại người yêu cầu` = `Tổ chức`. |
| 17 | Tư cách người yêu cầu | Enum | Có | Người bị thiệt hại | Control UI: Combobox.<br>- Giá trị theo Danh mục Tư cách người yêu cầu bồi thường (DM_26), chỉ gồm `NGUOI_BI_THIET_HAI`, `TO_CHUC_KE_THUA`, `NGUOI_DUOC_UY_QUYEN`.<br>- Chọn giá trị khác `Người bị thiệt hại`: hiển thị khối D (trường hợp Tổ chức).<br>- Chọn `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`: khối D hiển thị dạng D1.<br>- Chọn `Cá nhân, pháp nhân được ủy quyền hợp pháp`: khối D hiển thị dạng D2.<br>- Chọn lại `Người bị thiệt hại`: ẩn khối D, không lưu dữ liệu trong khối. |
| 18 | Tên tổ chức | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tổ chức...`<br>- Tự động điền theo tài khoản tổ chức đăng nhập Cổng Dịch vụ công (nếu có). |
| 19 | Mã số tổ chức | String(50) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã số doanh nghiệp / mã số thuế / mã số khác...`<br>- Mã số doanh nghiệp, mã số thuế hoặc mã số khác của tổ chức.<br>- Tự động điền theo tài khoản tổ chức đăng nhập Cổng Dịch vụ công (nếu có). |
| 20 | Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`<br>- Kiểm tra:<br>+ Đủ 10 chữ số.<br>+ Chỉ gồm chữ số.<br>+ Bắt đầu bằng đầu số di động hợp lệ tại Việt Nam: 03, 05, 07, 08, 09. |
| 21 | Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`<br>- Có dữ liệu: kiểm tra đúng định dạng email. |
| 22 | Quốc gia | Enum | Có | Việt Nam | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn quốc gia...`<br>- Giá trị theo Danh mục Quốc tịch / Quốc gia (DM_09).<br>- Quyết định kiểu nhập của `Tỉnh/Thành phố`, `Phường/Xã`. |
| 23 | Tỉnh/Thành phố | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- `Quốc gia` = `Việt Nam`: giá trị theo Danh mục địa bàn.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 24 | Phường/Xã | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Chọn phường/xã...`<br>- `Quốc gia` = `Việt Nam`: giá trị theo Danh mục địa bàn (lọc theo Tỉnh/Thành phố đã chọn).<br>- Chưa chọn `Tỉnh/Thành phố`: khóa, placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 25 | Địa chỉ chi tiết | String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| **D** | **THÔNG TIN NGƯỜI BỊ THIỆT HẠI** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`.<br>- Trường hiển thị theo `Loại người yêu cầu`. |
| | **Trường hợp Loại người yêu cầu = Cá nhân** | Section | - | Ẩn | Control UI: Nhóm trường.<br>- Áp dụng khi `Loại người yêu cầu` = `Cá nhân`.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`. |
| 26 | Họ và tên người bị thiệt hại | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên người bị thiệt hại...` |
| 27 | Ngày sinh | Date | Không | Trống | Control UI: DatePicker.<br>- Placeholder: `dd/mm/yyyy` |
| 28 | Loại giấy tờ thân nhân | Enum | Không | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn loại giấy tờ --`<br>- Giá trị theo Danh mục Loại giấy tờ pháp lý (DM_10), không gồm `MA_SO_THUE` - Mã số thuế. |
| 29 | Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...` |
| 30 | Tỉnh/Thành phố | Enum | Không | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- Giá trị theo Danh mục địa bàn. |
| 31 | Phường/Xã | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập phường/xã...` |
| 32 | Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| | **Trường hợp Loại người yêu cầu = Tổ chức** | Section | - | Ẩn | Control UI: Nhóm trường.<br>- Áp dụng khi `Loại người yêu cầu` = `Tổ chức`.<br>- Hiển thị dạng D1 hoặc D2 theo `Tư cách người yêu cầu`. |
| **D1** | **THÔNG TIN TỔ CHỨC BỊ THIỆT HẠI ĐÃ CHẤM DỨT TỒN TẠI** | Section | - | Ẩn | Control UI: Section header.<br>- Áp dụng khi `Loại người yêu cầu` = `Tổ chức`.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` = `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`. |
| 33 | Tên tổ chức bị thiệt hại | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tổ chức bị thiệt hại...` |
| 34 | Mã số tổ chức | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã số doanh nghiệp / mã số thuế / mã số khác...` |
| **D2** | **THÔNG TIN NGƯỜI BỊ THIỆT HẠI (CÁ NHÂN)** | Section | - | Ẩn | Control UI: Section header.<br>- Áp dụng khi `Loại người yêu cầu` = `Tổ chức`.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` = `Cá nhân, pháp nhân được ủy quyền hợp pháp`. |
| 35 | Họ và tên người bị thiệt hại | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên người bị thiệt hại...` |
| 36 | Ngày sinh | Date | Không | Trống | Control UI: DatePicker.<br>- Placeholder: `dd/mm/yyyy` |
| 37 | Loại giấy tờ thân nhân | Enum | Không | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn loại giấy tờ --`<br>- Giá trị theo Danh mục Loại giấy tờ pháp lý (DM_10), không gồm `MA_SO_THUE` - Mã số thuế. |
| 38 | Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...` |
| 39 | Tỉnh/Thành phố | Enum | Không | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- Giá trị theo Danh mục địa bàn. |
| 40 | Phường/Xã | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập phường/xã...` |
| 41 | Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| **E** | **VĂN BẢN LÀM CĂN CỨ YÊU CẦU BỒI THƯỜNG** | List(Object) | Không | 01 dòng trống | Control UI: Data grid nhiều dòng. |
| 42 | STT | Integer | - | Tự tăng | Control UI: Text (Read-only).<br>- Tăng theo số dòng. |
| 43 | Tên văn bản, căn cứ | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên văn bản, căn cứ...`<br>- Tải file mà chưa nhập tên: tự điền theo tên file (bỏ phần mở rộng). |
| 44 | Tải file | File | Không | Trống | Control UI: Nút `Tải file`.<br>- Định dạng `.pdf`, `.jpg`, `.png`.<br>- Dung lượng tối đa 20MB/file.<br>- Sai định dạng hoặc vượt dung lượng: không tiếp nhận tệp, hiển thị cảnh báo. |
| 45 | Thao tác | Action | - | - | Control UI: Icon button group.<br>Gồm các icon:<br>+ `Xem file`: khóa mờ khi dòng chưa có file.<br>+ `Xóa`: xóa dòng. |
| 46 | Thêm dòng | Button | - | - | Control UI: Button.<br>- Thêm 01 dòng trống vào bảng. |
| **F** | **TÀI LIỆU ĐÍNH KÈM** | List(Object) | Không | Trống | Control UI: Data grid nhiều dòng. |
| 47 | STT | Integer | - | Tự tăng | Control UI: Text (Read-only).<br>- Tăng theo số dòng. |
| 48 | Tên tài liệu | String(255) | Có khi dòng có file | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tài liệu...`<br>- Tải file mà chưa nhập tên: tự điền theo tên file (bỏ phần mở rộng). |
| 49 | File đính kèm | File | Không | Trống | Control UI: Nút `Tải file`.<br>- Định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`.<br>- Dung lượng tối đa 20MB/file.<br>- Sai định dạng hoặc vượt dung lượng: không tiếp nhận tệp, hiển thị cảnh báo. |
| 50 | Thao tác | Action | - | - | Control UI: Icon button group.<br>Gồm các icon:<br>+ `Xem file`: khóa mờ khi dòng chưa có file.<br>+ `Xóa`: xóa dòng. |
| 51 | Thêm dòng | Button | - | - | Control UI: Button.<br>- Thêm 01 dòng trống vào bảng. |

---

### III. ÁNH XẠ DỮ LIỆU SANG TIẾP NHẬN HỒ SƠ

| Trường E-Form | Trường tại Tiếp nhận hồ sơ |
| :--- | :--- |
| Cơ quan giải quyết bồi thường (2) | Đơn vị tiếp nhận hồ sơ |
| Loại yêu cầu giải quyết bồi thường (3) | Loại yêu cầu giải quyết bồi thường (áp dụng khi `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`) |
| Lĩnh vực phát sinh thiệt hại (4) | Lĩnh vực phát sinh thiệt hại |
| Hành vi gây thiệt hại của người thi hành công vụ (5) | Hành vi gây thiệt hại của người thi hành công vụ |
| Loại người yêu cầu (6) | Loại người yêu cầu = giá trị đã chọn (`Cá nhân` / `Tổ chức`) |
| Tư cách người yêu cầu (7, 17) | Tư cách người yêu cầu |
| Họ và tên (8) - chỉ áp dụng khi `Loại người yêu cầu` = `Cá nhân` | Họ và tên |
| Loại giấy tờ thân nhân (9), Số giấy tờ thân nhân (10) - chỉ áp dụng khi `Loại người yêu cầu` = `Cá nhân` | Loại giấy tờ thân nhân, Số giấy tờ thân nhân |
| Tên tổ chức (18) - chỉ áp dụng khi `Loại người yêu cầu` = `Tổ chức` | Họ và tên / Tên tổ chức (nhãn `Tên tổ chức`) |
| Mã số tổ chức (19) - chỉ áp dụng khi `Loại người yêu cầu` = `Tổ chức` | Mã số tổ chức |
| Số điện thoại (11, 20), Email (12, 21) | Số điện thoại, Email |
| Quốc gia (13, 22), Tỉnh/Thành phố (14, 23), Phường/Xã (15, 24), Địa chỉ chi tiết (16, 25) | Quốc gia, Tỉnh/Thành phố, Phường/Xã, Địa chỉ chi tiết |
| Khối D (26 - 32) - chỉ áp dụng khi `Loại người yêu cầu` = `Cá nhân` | Khối Thông tin người bị thiệt hại (cá nhân), cùng tên trường |
| Khối D1 (33 - 34) - chỉ áp dụng khi `Loại người yêu cầu` = `Tổ chức` | Khối Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại: Tên tổ chức bị thiệt hại, Mã số tổ chức |
| Khối D2 (35 - 41) - chỉ áp dụng khi `Loại người yêu cầu` = `Tổ chức` | Khối Thông tin người bị thiệt hại (cá nhân), cùng tên trường |
| Khối E (42 - 46) | Văn bản làm căn cứ yêu cầu bồi thường |
| Khối F (47 - 51) | Bảng tài liệu đính kèm |
