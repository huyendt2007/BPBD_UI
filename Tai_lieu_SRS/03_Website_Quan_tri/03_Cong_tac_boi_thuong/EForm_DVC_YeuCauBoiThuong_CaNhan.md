# ĐẶC TẢ YÊU CẦU KỸ THUẬT VÀ GIAO DIỆN BIỂU MẪU ĐIỆN TỬ (E-FORM)
## THỦ TỤC: YÊU CẦU BỒI THƯỜNG NHÀ NƯỚC - NGƯỜI YÊU CẦU LÀ CÁ NHÂN
*(Tài liệu trích xuất phục vụ xây dựng E-Form trên Cổng Dịch vụ công Quốc gia / Hệ thống thông tin giải quyết thủ tục hành chính)*

---

### I. PHẠM VI ÁP DỤNG

- Áp dụng khi người nộp hồ sơ yêu cầu bồi thường là **cá nhân** (`Loại người yêu cầu` = `Cá nhân`).
- Người yêu cầu là tổ chức: thực hiện theo E-Form Yêu cầu bồi thường nhà nước (Tổ chức) - `EForm_DVC_YeuCauBoiThuong_ToChuc.md`.
- Hai E-Form Cá nhân và Tổ chức dùng chung bố cục: khối A, B, E, F giống nhau; khối C, D khác nhau theo `Loại người yêu cầu`.
- Dữ liệu E-Form khi nộp thành công được chuyển sang màn Tiếp nhận hồ sơ của Hệ thống quản lý bồi thường nhà nước theo bảng ánh xạ tại mục III.

---

### II. BẢNG ĐẶC TẢ CHI TIẾT CÁC TRƯỜNG THÔNG TIN TRÊN E-FORM

| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | **CƠ QUAN TIẾP NHẬN HỒ SƠ** | Section | - | - | Control UI: Section header.<br>- Chọn cơ quan có thẩm quyền tiếp nhận và giải quyết bồi thường. |
| 1 | Tỉnh/Thành phố cơ quan giải quyết | Enum | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- Danh sách Tỉnh/Thành phố trực thuộc Trung ương. |
| 2 | Cơ quan giải quyết bồi thường | Enum | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn cơ quan giải quyết bồi thường...`<br>- Lọc theo `Tỉnh/Thành phố cơ quan giải quyết` đã chọn.<br>- Danh sách cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại. |
| **B** | **THÔNG TIN TỔNG QUAN NỘI DUNG YÊU CẦU** | Section | - | - | Control UI: Section header. |
| 3 | Loại yêu cầu giải quyết bồi thường | Enum | Có | Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự) | Control UI: Radio button.<br>Gồm:<br>+ Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)<br>+ Chỉ yêu cầu bồi thường thiệt hại bằng tiền<br>+ Chỉ yêu cầu phục hồi danh dự |
| 4 | Lĩnh vực phát sinh thiệt hại | Enum | Có | Trống | Control UI: Combobox.<br>- Placeholder: `Chọn lĩnh vực...`<br>Gồm:<br>+ TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH<br>+ TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ<br>+ TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ<br>+ TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH<br>+ TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ<br>+ TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ |
| 5 | Hành vi gây thiệt hại của người thi hành công vụ | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: `Tóm tắt hành vi gây thiệt hại của người thi hành công vụ`<br>- Tối đa 2000 ký tự. |
| **C** | **THÔNG TIN NGƯỜI YÊU CẦU BỒI THƯỜNG** | Section | - | - | Control UI: Section header. |
| 6 | Loại người yêu cầu | Enum | - | Cá nhân | Control UI: Hidden field.<br>- Giá trị cố định `Cá nhân`. |
| 7 | Tư cách người yêu cầu | Enum | Có | Người bị thiệt hại | Control UI: Combobox.<br>Gồm:<br>+ Người bị thiệt hại<br>+ Người thừa kế của người bị thiệt hại<br>+ Người đại diện cho những người thừa kế của người bị thiệt hại<br>+ Người đại diện theo pháp luật của người bị thiệt hại<br>+ Cá nhân, pháp nhân được ủy quyền hợp pháp<br>- Chọn giá trị khác `Người bị thiệt hại`: hiển thị khối D.<br>- Chọn lại `Người bị thiệt hại`: ẩn khối D, không lưu dữ liệu trong khối. |
| 8 | Họ và tên | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`<br>- Tự động điền theo tài khoản đăng nhập Cổng Dịch vụ công (nếu có). |
| 9 | Loại giấy tờ thân nhân | Enum | Có | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn loại giấy tờ --`<br>Gồm:<br>+ CMND/CCCD/Chứng minh quân đội<br>+ Hộ chiếu<br>+ Thẻ thường trú<br>+ Giấy tờ đi lại có giá trị quốc tế |
| 10 | Số giấy tờ thân nhân | String(50) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...`<br>- Tự động điền theo tài khoản đăng nhập Cổng Dịch vụ công (nếu có). |
| 11 | Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`<br>- Kiểm tra:<br>+ Đủ 10 chữ số.<br>+ Chỉ gồm chữ số.<br>+ Bắt đầu bằng đầu số di động hợp lệ tại Việt Nam: 03, 05, 07, 08, 09. |
| 12 | Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`<br>- Có dữ liệu: kiểm tra đúng định dạng email. |
| 13 | Quốc gia | Enum | Có | Việt Nam | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn quốc gia...`<br>- Quyết định kiểu nhập của `Tỉnh/Thành phố`, `Phường/Xã`. |
| 14 | Tỉnh/Thành phố | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- `Quốc gia` = `Việt Nam`: chọn trong danh mục Tỉnh/Thành phố.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 15 | Phường/Xã | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Chọn phường/xã...`<br>- `Quốc gia` = `Việt Nam`: chọn trong danh mục Phường/Xã, lọc theo `Tỉnh/Thành phố` đã chọn.<br>- Chưa chọn `Tỉnh/Thành phố`: khóa, placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 16 | Địa chỉ chi tiết | String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| **D** | **THÔNG TIN NGƯỜI BỊ THIỆT HẠI** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`. |
| 17 | Họ và tên người bị thiệt hại | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên người bị thiệt hại...` |
| 18 | Ngày sinh | Date | Không | Trống | Control UI: DatePicker.<br>- Placeholder: `dd/mm/yyyy` |
| 19 | Loại giấy tờ thân nhân | Enum | Không | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn loại giấy tờ --`<br>- Giá trị như trường 9. |
| 20 | Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...` |
| 21 | Tỉnh/Thành phố | Enum | Không | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...` |
| 22 | Phường/Xã | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập phường/xã...` |
| 23 | Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| **E** | **VĂN BẢN LÀM CĂN CỨ YÊU CẦU BỒI THƯỜNG** | List(Object) | Không | 01 dòng trống | Control UI: Data grid nhiều dòng. |
| 24 | STT | Integer | - | Tự tăng | Control UI: Text (Read-only).<br>- Tăng theo số dòng. |
| 25 | Tên văn bản, căn cứ | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên văn bản, căn cứ...`<br>- Tải file mà chưa nhập tên: tự điền theo tên file (bỏ phần mở rộng). |
| 26 | Tải file | File | Không | Trống | Control UI: Nút `Tải file`.<br>- Định dạng `.pdf`, `.jpg`, `.png`.<br>- Dung lượng tối đa 20MB/file.<br>- Sai định dạng hoặc vượt dung lượng: không tiếp nhận tệp, hiển thị cảnh báo. |
| 27 | Thao tác | Action | - | - | Control UI: Icon button group.<br>Gồm các icon:<br>+ `Xem file`: khóa mờ khi dòng chưa có file.<br>+ `Xóa`: xóa dòng. |
| 28 | Thêm dòng | Button | - | - | Control UI: Button.<br>- Thêm 01 dòng trống vào bảng. |
| **F** | **TÀI LIỆU ĐÍNH KÈM** | List(Object) | Không | Trống | Control UI: Data grid nhiều dòng. |
| 29 | STT | Integer | - | Tự tăng | Control UI: Text (Read-only).<br>- Tăng theo số dòng. |
| 30 | Tên tài liệu | String(255) | Có khi dòng có file | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tài liệu...`<br>- Tải file mà chưa nhập tên: tự điền theo tên file (bỏ phần mở rộng). |
| 31 | File đính kèm | File | Không | Trống | Control UI: Nút `Tải file`.<br>- Định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`.<br>- Dung lượng tối đa 20MB/file.<br>- Sai định dạng hoặc vượt dung lượng: không tiếp nhận tệp, hiển thị cảnh báo. |
| 32 | Thao tác | Action | - | - | Control UI: Icon button group.<br>Gồm các icon:<br>+ `Xem file`: khóa mờ khi dòng chưa có file.<br>+ `Xóa`: xóa dòng. |
| 33 | Thêm dòng | Button | - | - | Control UI: Button.<br>- Thêm 01 dòng trống vào bảng. |

---

### III. ÁNH XẠ DỮ LIỆU SANG TIẾP NHẬN HỒ SƠ

| Trường E-Form | Trường tại Tiếp nhận hồ sơ |
| :--- | :--- |
| Cơ quan giải quyết bồi thường (2) | Đơn vị tiếp nhận hồ sơ |
| Loại yêu cầu giải quyết bồi thường (3) | Loại yêu cầu giải quyết bồi thường (áp dụng khi `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`) |
| Lĩnh vực phát sinh thiệt hại (4) | Lĩnh vực phát sinh thiệt hại |
| Hành vi gây thiệt hại của người thi hành công vụ (5) | Hành vi gây thiệt hại của người thi hành công vụ |
| Loại người yêu cầu (6) | Loại người yêu cầu = `Cá nhân` |
| Tư cách người yêu cầu (7) | Tư cách người yêu cầu |
| Họ và tên (8) | Họ và tên |
| Loại giấy tờ thân nhân (9), Số giấy tờ thân nhân (10) | Loại giấy tờ thân nhân, Số giấy tờ thân nhân |
| Số điện thoại (11), Email (12) | Số điện thoại, Email |
| Quốc gia (13), Tỉnh/Thành phố (14), Phường/Xã (15), Địa chỉ chi tiết (16) | Quốc gia, Tỉnh/Thành phố, Phường/Xã, Địa chỉ chi tiết |
| Khối D (17 - 23) | Khối Thông tin người bị thiệt hại (cá nhân), cùng tên trường |
| Khối E (24 - 28) | Văn bản làm căn cứ yêu cầu bồi thường |
| Khối F (29 - 33) | Bảng tài liệu đính kèm |
