# ĐẶC TẢ YÊU CẦU KỸ THUẬT VÀ GIAO DIỆN BIỂU MẪU ĐIỆN TỬ (E-FORM)
## THỦ TỤC: YÊU CẦU BỒI THƯỜNG NHÀ NƯỚC - NGƯỜI YÊU CẦU LÀ TỔ CHỨC
*(Tài liệu trích xuất phục vụ xây dựng E-Form trên Cổng Dịch vụ công Quốc gia / Hệ thống thông tin giải quyết thủ tục hành chính)*

---

### I. PHẠM VI ÁP DỤNG

- Áp dụng khi người nộp hồ sơ yêu cầu bồi thường là **tổ chức** (`Loại người yêu cầu` = `Tổ chức`).
- Người yêu cầu là cá nhân: thực hiện theo E-Form Yêu cầu bồi thường nhà nước (Cá nhân) - `EForm_DVC_YeuCauBoiThuong_CaNhan.md`.
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
| 6 | Loại người yêu cầu | Enum | - | Tổ chức | Control UI: Hidden field.<br>- Giá trị cố định `Tổ chức`. |
| 7 | Tư cách người yêu cầu | Enum | Có | Người bị thiệt hại | Control UI: Combobox.<br>Gồm:<br>+ Người bị thiệt hại<br>+ Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại<br>+ Cá nhân, pháp nhân được ủy quyền hợp pháp<br>- Chọn giá trị khác `Người bị thiệt hại`: hiển thị khối D.<br>- Chọn `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`: khối D hiển thị dạng D1.<br>- Chọn `Cá nhân, pháp nhân được ủy quyền hợp pháp`: khối D hiển thị dạng D2.<br>- Chọn lại `Người bị thiệt hại`: ẩn khối D, không lưu dữ liệu trong khối. |
| 8 | Tên tổ chức | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tổ chức...`<br>- Tự động điền theo tài khoản tổ chức đăng nhập Cổng Dịch vụ công (nếu có). |
| 9 | Mã số tổ chức | String(50) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã số doanh nghiệp / mã số thuế / mã số khác...`<br>- Mã số doanh nghiệp, mã số thuế hoặc mã số khác của tổ chức.<br>- Tự động điền theo tài khoản tổ chức đăng nhập Cổng Dịch vụ công (nếu có). |
| 10 | Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`<br>- Kiểm tra:<br>+ Đủ 10 chữ số.<br>+ Chỉ gồm chữ số.<br>+ Bắt đầu bằng đầu số di động hợp lệ tại Việt Nam: 03, 05, 07, 08, 09. |
| 11 | Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`<br>- Có dữ liệu: kiểm tra đúng định dạng email. |
| 12 | Quốc gia | Enum | Có | Việt Nam | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn quốc gia...`<br>- Quyết định kiểu nhập của `Tỉnh/Thành phố`, `Phường/Xã`. |
| 13 | Tỉnh/Thành phố | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- `Quốc gia` = `Việt Nam`: chọn trong danh mục Tỉnh/Thành phố.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 14 | Phường/Xã | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Placeholder: `Chọn phường/xã...`<br>- `Quốc gia` = `Việt Nam`: chọn trong danh mục Phường/Xã, lọc theo `Tỉnh/Thành phố` đã chọn.<br>- Chưa chọn `Tỉnh/Thành phố`: khóa, placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- `Quốc gia` khác `Việt Nam`: nhập văn bản tự do. |
| 15 | Địa chỉ chi tiết | String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| **D** | **THÔNG TIN NGƯỜI BỊ THIỆT HẠI** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`. |
| **D1** | **THÔNG TIN TỔ CHỨC BỊ THIỆT HẠI ĐÃ CHẤM DỨT TỒN TẠI** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` = `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`. |
| 16 | Tên tổ chức bị thiệt hại | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tổ chức bị thiệt hại...` |
| 17 | Mã số tổ chức | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã số doanh nghiệp / mã số thuế / mã số khác...` |
| **D2** | **THÔNG TIN NGƯỜI BỊ THIỆT HẠI (CÁ NHÂN)** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu` = `Cá nhân, pháp nhân được ủy quyền hợp pháp`. |
| 18 | Họ và tên người bị thiệt hại | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên người bị thiệt hại...` |
| 19 | Ngày sinh | Date | Không | Trống | Control UI: DatePicker.<br>- Placeholder: `dd/mm/yyyy` |
| 20 | Loại giấy tờ thân nhân | Enum | Không | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn loại giấy tờ --`<br>Gồm:<br>+ CMND/CCCD/Chứng minh quân đội<br>+ Hộ chiếu<br>+ Thẻ thường trú<br>+ Giấy tờ đi lại có giá trị quốc tế |
| 21 | Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số giấy tờ thân nhân...` |
| 22 | Tỉnh/Thành phố | Enum | Không | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...` |
| 23 | Phường/Xã | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập phường/xã...` |
| 24 | Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ chi tiết...` |
| **E** | **VĂN BẢN LÀM CĂN CỨ YÊU CẦU BỒI THƯỜNG** | List(Object) | Không | 01 dòng trống | Control UI: Data grid nhiều dòng. |
| 25 | STT | Integer | - | Tự tăng | Control UI: Text (Read-only).<br>- Tăng theo số dòng. |
| 26 | Tên văn bản, căn cứ | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên văn bản, căn cứ...`<br>- Tải file mà chưa nhập tên: tự điền theo tên file (bỏ phần mở rộng). |
| 27 | Tải file | File | Không | Trống | Control UI: Nút `Tải file`.<br>- Định dạng `.pdf`, `.jpg`, `.png`.<br>- Dung lượng tối đa 20MB/file.<br>- Sai định dạng hoặc vượt dung lượng: không tiếp nhận tệp, hiển thị cảnh báo. |
| 28 | Thao tác | Action | - | - | Control UI: Icon button group.<br>Gồm các icon:<br>+ `Xem file`: khóa mờ khi dòng chưa có file.<br>+ `Xóa`: xóa dòng. |
| 29 | Thêm dòng | Button | - | - | Control UI: Button.<br>- Thêm 01 dòng trống vào bảng. |
| **F** | **TÀI LIỆU ĐÍNH KÈM** | List(Object) | Không | Trống | Control UI: Data grid nhiều dòng. |
| 30 | STT | Integer | - | Tự tăng | Control UI: Text (Read-only).<br>- Tăng theo số dòng. |
| 31 | Tên tài liệu | String(255) | Có khi dòng có file | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tài liệu...`<br>- Tải file mà chưa nhập tên: tự điền theo tên file (bỏ phần mở rộng). |
| 32 | File đính kèm | File | Không | Trống | Control UI: Nút `Tải file`.<br>- Định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.png`.<br>- Dung lượng tối đa 20MB/file.<br>- Sai định dạng hoặc vượt dung lượng: không tiếp nhận tệp, hiển thị cảnh báo. |
| 33 | Thao tác | Action | - | - | Control UI: Icon button group.<br>Gồm các icon:<br>+ `Xem file`: khóa mờ khi dòng chưa có file.<br>+ `Xóa`: xóa dòng. |
| 34 | Thêm dòng | Button | - | - | Control UI: Button.<br>- Thêm 01 dòng trống vào bảng. |

---

### III. ÁNH XẠ DỮ LIỆU SANG TIẾP NHẬN HỒ SƠ

| Trường E-Form | Trường tại Tiếp nhận hồ sơ |
| :--- | :--- |
| Cơ quan giải quyết bồi thường (2) | Đơn vị tiếp nhận hồ sơ |
| Loại yêu cầu giải quyết bồi thường (3) | Loại yêu cầu giải quyết bồi thường (áp dụng khi `Loại hồ sơ` = `Giải quyết yêu cầu bồi thường`) |
| Lĩnh vực phát sinh thiệt hại (4) | Lĩnh vực phát sinh thiệt hại |
| Hành vi gây thiệt hại của người thi hành công vụ (5) | Hành vi gây thiệt hại của người thi hành công vụ |
| Loại người yêu cầu (6) | Loại người yêu cầu = `Tổ chức` |
| Tư cách người yêu cầu (7) | Tư cách người yêu cầu |
| Tên tổ chức (8) | Họ và tên / Tên tổ chức (nhãn `Tên tổ chức`) |
| Mã số tổ chức (9) | Mã số tổ chức |
| Số điện thoại (10), Email (11) | Số điện thoại, Email |
| Quốc gia (12), Tỉnh/Thành phố (13), Phường/Xã (14), Địa chỉ chi tiết (15) | Quốc gia, Tỉnh/Thành phố, Phường/Xã, Địa chỉ chi tiết |
| Khối D1 (16 - 17) | Khối Thông tin tổ chức bị thiệt hại đã chấm dứt tồn tại: Tên tổ chức bị thiệt hại, Mã số tổ chức |
| Khối D2 (18 - 24) | Khối Thông tin người bị thiệt hại (cá nhân), cùng tên trường |
| Khối E (25 - 29) | Văn bản làm căn cứ yêu cầu bồi thường |
| Khối F (30 - 34) | Bảng tài liệu đính kèm |
