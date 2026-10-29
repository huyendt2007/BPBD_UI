# ĐẶC TẢ YÊU CẦU KỸ THUẬT VÀ GIAO DIỆN BIỂU MẪU ĐIỆN TỬ (E-FORM)
## THỦ TỤC: YÊU CẦU BỒI THƯỜNG NHÀ NƯỚC
*(Tài liệu phục vụ xây dựng E-Form trên Cổng Dịch vụ công Quốc gia / Hệ thống thông tin giải quyết thủ tục hành chính)*

---

<a id="ef-pham-vi"></a>
### I. PHẠM VI ÁP DỤNG

- Áp dụng cho hồ sơ yêu cầu bồi thường nộp qua Cổng Dịch vụ công, người yêu cầu là **cá nhân** hoặc **tổ chức**.
- Một E-Form dùng chung cho 2 loại người yêu cầu; trường hiển thị theo `Loại người yêu cầu`, `Tư cách người yêu cầu bồi thường`, `Loại yêu cầu giải quyết bồi thường`.
- Dữ liệu E-Form khi nộp thành công được gửi sang Hệ thống quản lý bồi thường nhà nước (Hệ thống BTNN) theo mục IV.

---

<a id="ef-nguyen-tac"></a>
### II. NGUYÊN TẮC CHUNG

- Trường có danh mục: giá trị lấy theo danh mục Hệ thống BTNN chia sẻ, tại [Giá trị danh mục - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-danh-sach-danh-muc); E-Form hiển thị tên, gửi mã.
- Trường không có danh mục: giá trị ghi tại cột Mô tả.
- Cột `Bắt buộc` = `Có`: bắt buộc khi trường đang hiển thị.
- Trường, khối đang ẩn: không kiểm tra, không gửi dữ liệu.
- Ngày: định dạng `dd/mm/yyyy`.
- Số tiền: đơn vị đồng; chỉ nhập chữ số; tự phân tách hàng nghìn bằng dấu chấm.
- Nội dung, vị trí thông báo lỗi: theo quy định chung của Cổng Dịch vụ công.

---

<a id="ef-bang-truong"></a>
### III. BẢNG ĐẶC TẢ CHI TIẾT CÁC TRƯỜNG THÔNG TIN TRÊN E-FORM

| STT | Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | **THÔNG TIN HỒ SƠ YÊU CẦU** | Section | - | - | Control UI: Section header. |
| 1 | Loại yêu cầu giải quyết bồi thường | Enum(String(100)) | Có | `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)` | Control UI: Radio button.<br>- Giá trị theo [Danh mục Loại yêu cầu giải quyết bồi thường - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-resolution-scope) [RESOLUTION_SCOPE]. |
| 2 | Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn lĩnh vực phát sinh thiệt hại --`.<br>- Giá trị theo [Danh mục Lĩnh vực phát sinh thiệt hại - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dm-22) [DM_22]. |
| 3 | Ngày văn bản yêu cầu bồi thường | Date | Có | Trống | Control UI: DatePicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Ngày ghi trên văn bản yêu cầu bồi thường.<br>- Không lớn hơn ngày hiện tại. |
| 4 | Tỉnh/Thành phố (cơ quan giải quyết bồi thường) | Enum(String(100)) | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `-- Chọn tỉnh/thành phố --`.<br>- Giá trị theo [Danh mục địa bàn - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dia-ban), cấp Tỉnh/Thành phố.<br>- Dùng để lọc `Cơ quan giải quyết bồi thường`.<br>- Đổi giá trị: xóa giá trị `Cơ quan giải quyết bồi thường` đã chọn. |
| 5 | Cơ quan giải quyết bồi thường | Enum(String(255)) | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn cơ quan giải quyết bồi thường...`.<br>- Giá trị theo [Danh mục Cơ quan giải quyết bồi thường - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-co-quan-gqbt), lọc theo `Tỉnh/Thành phố (cơ quan giải quyết bồi thường)`.<br>- Chưa chọn `Tỉnh/Thành phố (cơ quan giải quyết bồi thường)`: khóa (Disabled).<br>- Tìm theo mã hoặc tên cơ quan, không phân biệt hoa/thường và dấu tiếng Việt.<br>- Là cơ quan tiếp nhận hồ sơ trên Hệ thống BTNN. |
| **B** | **THÔNG TIN NGƯỜI YÊU CẦU BỒI THƯỜNG** | Section | - | - | Control UI: Section header. |
| 6 | Loại người yêu cầu | Enum(String(20)) | Có | Theo tài khoản đăng nhập | Control UI: Text (Read-only).<br>- Giá trị gồm:<br>+ `Cá nhân`<br>+ `Tổ chức`<br>- Tự lấy theo loại tài khoản đăng nhập Cổng Dịch vụ công, không cho phép sửa. |
| 7 | Tư cách người yêu cầu bồi thường | Enum(String(100)) | Có | `Người bị thiệt hại` | Control UI: Combobox.<br>- Placeholder: `-- Chọn tư cách người yêu cầu --`.<br>- Giá trị theo [Danh mục Tư cách người yêu cầu bồi thường - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dm-26) [DM_26], lọc theo `Loại người yêu cầu`. |
| 8 | Họ và tên / Tên tổ chức | String(255) | Có | Theo tài khoản đăng nhập | Control UI: Text (Read-only).<br>- `Loại người yêu cầu` = `Cá nhân`: nhãn `Họ và tên`.<br>- `Loại người yêu cầu` = `Tổ chức`: nhãn `Tên tổ chức`.<br>- Tự lấy theo tài khoản đăng nhập Cổng Dịch vụ công, không cho phép sửa. |
| 9 | Ngày sinh | Date | Có | Trống | Control UI: DatePicker.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không lớn hơn ngày hiện tại. |
| 10 | Trạng thái người bị thiệt hại | Enum(String(50)) | Có | `Còn sống` | Control UI: Radio button.<br>- Nhãn phụ: `(đối chiếu theo bản án đính kèm)`.<br>- Chỉ hiển thị khi người bị thiệt hại là cá nhân:<br>+ `Tư cách người yêu cầu bồi thường` = `Người bị thiệt hại` và `Loại người yêu cầu` = `Cá nhân`; hoặc<br>+ Khối C đang hiển thị và `Loại người bị thiệt hại` (STT 27) = `Cá nhân`.<br>- Giá trị gồm:<br>+ `Còn sống`<br>+ `Đã mất`<br>- `Tư cách người yêu cầu bồi thường` = `Người thừa kế của người bị thiệt hại` hoặc `Người đại diện cho những người thừa kế của người bị thiệt hại`: tự chọn `Đã mất`, khóa trường. |
| 11 | Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`.<br>- `Quốc gia` (STT 23) = `Việt Nam`: đúng 10 chữ số, bắt đầu bằng `03`, `05`, `07`, `08` hoặc `09`.<br>- `Quốc gia` (STT 23) khác `Việt Nam`: 8-15 chữ số, cho phép dấu `+` ở đầu. |
| 12 | Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`.<br>- Có dữ liệu: đúng định dạng `tên@tên miền`, phần sau dấu chấm cuối tối thiểu 2 chữ cái. |
| 13 | Loại giấy tờ thân nhân | Enum(String(50)) | Có | Theo tài khoản đăng nhập | Control UI: Text (Read-only).<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`.<br>- Giá trị theo [Danh mục Loại giấy tờ pháp lý - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dm-10) [DM_10], không gồm `Mã số thuế`.<br>- Tự lấy theo tài khoản đăng nhập Cổng Dịch vụ công, không cho phép sửa. |
| 14 | Số giấy tờ thân nhân | String(20) | Có | Theo tài khoản đăng nhập | Control UI: Text (Read-only).<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`.<br>- Tự lấy theo tài khoản đăng nhập Cổng Dịch vụ công, không cho phép sửa. |
| 15 | Ngày cấp | Date | Không | Trống | Control UI: DatePicker.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không lớn hơn ngày hiện tại. |
| 16 | Nơi cấp | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Cá nhân`.<br>- Placeholder: `Nhập nơi cấp...`. |
| 17 | Mã số tổ chức | String(50) | Có | Theo tài khoản đăng nhập | Control UI: Text (Read-only).<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`.<br>- Tự lấy theo tài khoản tổ chức đăng nhập Cổng Dịch vụ công, không cho phép sửa. |
| 18 | Số giấy tờ thành lập/đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`.<br>- Placeholder: `Nhập số giấy tờ thành lập/đăng ký...`. |
| 19 | Ngày cấp | Date | Không | Trống | Control UI: DatePicker.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không lớn hơn ngày hiện tại. |
| 20 | Nơi cấp | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`.<br>- Placeholder: `Nhập nơi cấp...`. |
| 21 | Họ và tên người đại diện theo pháp luật | String(100) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`.<br>- Placeholder: `Nhập họ và tên người đại diện...`. |
| 22 | Chức vụ người đại diện | String(100) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người yêu cầu` = `Tổ chức`.<br>- Placeholder: `Nhập chức vụ...`. |
| 23 | Quốc gia | Enum(String(100)) | Có | `Việt Nam` | Control UI: Combobox.<br>- Placeholder: `-- Chọn quốc gia --`.<br>- Giá trị theo [Danh mục Quốc tịch / Quốc gia - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dm-09) [DM_09]. |
| 24 | Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- `Quốc gia` (STT 23) = `Việt Nam`: Combobox, giá trị theo [Danh mục địa bàn - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dia-ban) cấp Tỉnh/Thành phố; tìm theo mã hoặc tên; placeholder `-- Chọn tỉnh/thành phố --`.<br>- `Quốc gia` (STT 23) khác `Việt Nam`: Input text nhập tự do; placeholder `Nhập tỉnh/thành ngoại quốc...`. |
| 25 | Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- `Quốc gia` (STT 23) = `Việt Nam`: Combobox, giá trị theo [Danh mục địa bàn - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dia-ban) cấp Phường/Xã, lọc theo `Tỉnh/Thành phố` (STT 24) đã chọn; tìm theo mã hoặc tên; placeholder `Gõ Mã hoặc Tên Phường/Xã...`.<br>- Chưa chọn `Tỉnh/Thành phố` (STT 24): khóa (Disabled), placeholder `Vui lòng chọn Tỉnh/Thành phố trước`.<br>- `Quốc gia` (STT 23) khác `Việt Nam`: Input text nhập tự do. |
| 26 | Địa chỉ chi tiết | Text(1000) | Có | Trống | Control UI: Textarea (02 dòng).<br>- Placeholder: `Nhập số nhà, tên đường/phố, thôn/xóm/ấp...`. |
| <a id="ef-khoi-nguoi-bi-thiet-hai"></a>**C** | **THÔNG TIN NGƯỜI BỊ THIỆT HẠI** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu bồi thường` khác `Người bị thiệt hại` và khác `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`.<br>- Gồm STT 27 đến STT 45. |
| 27 | Loại người bị thiệt hại | Enum(String(20)) | Có | `Cá nhân` | Control UI: Radio button.<br>- Giá trị gồm:<br>+ `Cá nhân`<br>+ `Tổ chức`<br>- `Tư cách người yêu cầu bồi thường` = `Người thừa kế của người bị thiệt hại` hoặc `Người đại diện cho những người thừa kế của người bị thiệt hại`: chỉ `Cá nhân`, khóa trường.<br>- `Tư cách người yêu cầu bồi thường` = `Người đại diện theo pháp luật của người bị thiệt hại` hoặc `Cá nhân, pháp nhân được ủy quyền hợp pháp`: chọn `Cá nhân` hoặc `Tổ chức`.<br>- Đổi `Tư cách người yêu cầu bồi thường` sang giá trị chỉ áp dụng `Cá nhân` khi đang chọn `Tổ chức`: tự chuyển về `Cá nhân`, xóa dữ liệu STT 36 đến STT 41. |
| 28 | Họ và tên / Tên tổ chức | String(255) | Có | Trống | Control UI: Input text.<br>- `Loại người bị thiệt hại` = `Cá nhân`: nhãn `Họ và tên`, placeholder `Nhập họ và tên...`.<br>- `Loại người bị thiệt hại` = `Tổ chức`: nhãn `Tên tổ chức`, placeholder `Nhập tên tổ chức...`. |
| 29 | Ngày sinh | Date | Có | Trống | Control UI: DatePicker.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không lớn hơn ngày hiện tại. |
| 30 | Số điện thoại | String(20) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại...`.<br>- Định dạng như STT 11, theo `Quốc gia` (STT 42). |
| 31 | Email | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập email...`.<br>- Có dữ liệu: định dạng như STT 12. |
| 32 | Loại giấy tờ thân nhân | Enum(String(50)) | Có | `CMND/CCCD/Chứng minh quân đội` | Control UI: Combobox.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Placeholder: `-- Chọn loại giấy tờ --`.<br>- Giá trị theo [Danh mục Loại giấy tờ pháp lý - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dm-10) [DM_10], không gồm `Mã số thuế`. |
| 33 | Số giấy tờ thân nhân | String(20) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Placeholder: `Nhập số giấy tờ...`.<br>- `Loại giấy tờ thân nhân` (STT 32) = `CMND/CCCD/Chứng minh quân đội`: đúng 12 chữ số. |
| 34 | Ngày cấp | Date | Không | Trống | Control UI: DatePicker.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không lớn hơn ngày hiện tại. |
| 35 | Nơi cấp | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Cá nhân`.<br>- Placeholder: `Nhập nơi cấp...`. |
| 36 | Mã số tổ chức | String(50) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`.<br>- Placeholder: `Mã số doanh nghiệp / mã số thuế / mã số khác...`. |
| 37 | Số giấy tờ thành lập/đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`.<br>- Placeholder: `Nhập số giấy tờ thành lập/đăng ký...`. |
| 38 | Ngày cấp | Date | Không | Trống | Control UI: DatePicker.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không lớn hơn ngày hiện tại. |
| 39 | Nơi cấp | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`.<br>- Placeholder: `Nhập nơi cấp...`. |
| 40 | Họ và tên người đại diện theo pháp luật | String(100) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`.<br>- Placeholder: `Nhập họ và tên người đại diện...`. |
| 41 | Chức vụ người đại diện | String(100) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Loại người bị thiệt hại` = `Tổ chức`.<br>- Placeholder: `Nhập chức vụ...`. |
| 42 | Quốc gia | Enum(String(100)) | Có | `Việt Nam` | Control UI: Combobox.<br>- Giá trị và quy tắc như STT 23. |
| 43 | Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Giá trị và quy tắc như STT 24, theo `Quốc gia` (STT 42). |
| 44 | Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Giá trị và quy tắc như STT 25, lọc theo `Tỉnh/Thành phố` (STT 43). |
| 45 | Địa chỉ chi tiết | Text(1000) | Có | Trống | Control UI: Textarea (02 dòng).<br>- Placeholder: `Nhập số nhà, tên đường/phố, thôn/xóm/ấp...`. |
| <a id="ef-khoi-to-chuc-cham-dut"></a>**D** | **THÔNG TIN TỔ CHỨC BỊ THIỆT HẠI ĐÃ CHẤM DỨT TỒN TẠI** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu bồi thường` = `Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại`.<br>- Gồm STT 46 đến STT 51.<br>- Khối không có số điện thoại, email. |
| 46 | Tên tổ chức bị thiệt hại | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên tổ chức bị thiệt hại...`. |
| 47 | Mã số tổ chức | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Mã số doanh nghiệp / mã số thuế / mã số khác...`. |
| 48 | Quốc gia | Enum(String(100)) | Có | `Việt Nam` | Control UI: Combobox.<br>- Giá trị và quy tắc như STT 23. |
| 49 | Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Giá trị và quy tắc như STT 24, theo `Quốc gia` (STT 48). |
| 50 | Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Giá trị và quy tắc như STT 25, lọc theo `Tỉnh/Thành phố` (STT 49). |
| 51 | Địa chỉ chi tiết | Text(1000) | Có | Trống | Control UI: Textarea (02 dòng).<br>- Placeholder: `Nhập số nhà, tên đường/phố, thôn/xóm/ấp...`. |
| **E** | **HÀNH VI GÂY THIỆT HẠI** | Section | - | - | Control UI: Section header. |
| 52 | Hành vi gây thiệt hại của người thi hành công vụ | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: `Tóm tắt hành vi gây thiệt hại của người thi hành công vụ`. |
| 53 | Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: `Giải trình mối quan hệ nhân quả trực tiếp giữa hành vi và tổn thất...`. |
| **F** | **PHƯƠNG THỨC ĐỀ NGHỊ NHẬN THÔNG BÁO VỀ VIỆC GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG** | Section | - | - | Control UI: Section header. |
| 54 | Phương thức nhận thông báo | Enum(String(150)) | Có | `Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID)` | Control UI: Radio button.<br>- Giá trị gồm:<br>+ `Trực tiếp`<br>+ `Qua dịch vụ bưu chính`<br>+ `Qua thư điện tử`<br>+ `Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID)`<br>+ `Qua phương tiện điện tử khác` |
| 55 | Địa chỉ, đầu mối nhận thông báo | String(500) | Có | Theo `Phương thức nhận thông báo` | Control UI: Input text.<br>- Nhãn và giá trị gợi ý theo `Phương thức nhận thông báo`; người nộp được sửa:<br>+ `Trực tiếp`: nhãn `Địa chỉ, đầu mối nhận thông báo (Trực tiếp tại trụ sở)`; tự điền `Nhận trực tiếp tại trụ sở cơ quan giải quyết bồi thường`.<br>+ `Qua dịch vụ bưu chính`: nhãn `Địa chỉ nhận thông báo qua dịch vụ bưu chính`; gợi ý theo `Địa chỉ chi tiết` (STT 26).<br>+ `Qua thư điện tử`: nhãn `Thư điện tử (Email) nhận thông báo`; gợi ý theo `Email` (STT 12).<br>+ `Qua Cổng Dịch vụ công quốc gia hoặc Ứng dụng định danh quốc gia (VNeID)`: nhãn `Địa chỉ, đầu mối nhận thông báo (Tài khoản Cổng DVC / Số ĐDCN / VNeID)`; gợi ý theo `Số giấy tờ thân nhân` (STT 14).<br>+ `Qua phương tiện điện tử khác`: nhãn `Địa chỉ, đầu mối nhận thông báo qua phương tiện điện tử khác`; gợi ý theo `Số điện thoại` (STT 11). |
| <a id="ef-khoi-thiet-hai-tien"></a>**G** | **THÔNG TIN BỒI THƯỜNG THIỆT HẠI BẰNG TIỀN** | Section | - | Ẩn | Control UI: Section header.<br>- Chỉ hiển thị khi `Loại yêu cầu giải quyết bồi thường` = `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)` hoặc `Chỉ yêu cầu bồi thường thiệt hại bằng tiền`.<br>- Gồm khối G.1, G.2, G.3. |
| <a id="ef-bang-thiet-hai"></a>**G.1** | **Thiệt hại yêu cầu bồi thường** | List(Object) | Có | Nhóm thu gọn | Control UI: Data grid 02 cấp.<br>- Giá trị theo [Danh mục Loại thiệt hại yêu cầu bồi thường - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dm-27) [DM_27].<br>- Cấp 1: 07 dòng nhóm, từ `I. Thiệt hại do tài sản bị xâm phạm (Điều 23)` đến `VII. Các thiệt hại khác`.<br>- Cấp 2: nhóm I đến nhóm VI là 35 dòng mục chi tiết theo thứ tự danh mục; nhóm VII là các dòng thiệt hại khác do người nộp thêm.<br>- Tên nhóm, tên mục hiển thị đúng tên trong danh mục.<br>- Tối thiểu 01 mục chi tiết được tích hoặc 01 dòng thiệt hại khác.<br>- Gồm STT 56 đến STT 63. |
| 56 | Dòng nhóm thiệt hại | Label | - | Thu gọn | Control UI: Dòng tiêu đề nhóm, bấm để mở rộng / thu gọn.<br>- Nhóm I đến nhóm VI: tên nhóm, số mục đã tích / tổng số mục của nhóm.<br>- Nhóm VII: `VII. Các thiệt hại khác`, số dòng thiệt hại khác `(n dòng)`.<br>- Cột số tiền: tổng số tiền các dòng được tích (nhóm I đến nhóm VI) hoặc tổng `Số tiền` các dòng thiệt hại khác (nhóm VII); chỉ đọc. |
| 57 | Mục thiệt hại | Boolean | Không | Chưa chọn | Control UI: Checkbox trên từng dòng mục chi tiết, kèm số thứ tự trong nhóm và tên mục.<br>- Chỉ hiển thị tại nhóm I đến nhóm VI.<br>- Tích: mở nhập STT 58, STT 59 của dòng.<br>- Bỏ tích: xóa giá trị đã nhập của dòng, khóa STT 58, STT 59. |
| 58 | Cách tính / Diễn giải công thức áp dụng | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Chỉ hiển thị tại dòng mục chi tiết (nhóm I đến nhóm VI).<br>- Placeholder: `Nhập cách tính / diễn giải...`.<br>- Chỉ nhập được khi `Mục thiệt hại` của dòng được tích; còn lại khóa.<br>- Bắt buộc khi `Mục thiệt hại` của dòng được tích. |
| 59 | Số tiền yêu cầu bồi thường (đồng) | Decimal(18,0) | Có | Trống | Control UI: Input text định dạng tiền.<br>- Chỉ hiển thị tại dòng mục chi tiết (nhóm I đến nhóm VI).<br>- Placeholder: `0`.<br>- Chỉ nhập được khi `Mục thiệt hại` của dòng được tích; còn lại khóa.<br>- Bắt buộc khi `Mục thiệt hại` của dòng được tích.<br>- Lớn hơn 0. |
| 60 | Tên / nội dung thiệt hại | String(500) | Có | Trống | Control UI: Input text trên dòng thiệt hại khác.<br>- Chỉ hiển thị khi nhóm VII có dòng thiệt hại khác.<br>- Mỗi lần bấm `Thêm thiệt hại khác`: thêm 01 dòng gồm STT 60, STT 61, STT 62 và nút `Xóa`; thêm được nhiều dòng.<br>- Placeholder: `Nhập tên / nội dung thiệt hại...`. |
| 61 | Cách tính / diễn giải (thiệt hại khác) | Text(2000) | Có | Trống | Control UI: Input text trên dòng thiệt hại khác.<br>- Chỉ hiển thị khi nhóm VII có dòng thiệt hại khác.<br>- Placeholder: `Nhập cách tính / diễn giải...`. |
| 62 | Số tiền (thiệt hại khác) (đồng) | Decimal(18,0) | Có | Trống | Control UI: Input text định dạng tiền trên dòng thiệt hại khác.<br>- Chỉ hiển thị khi nhóm VII có dòng thiệt hại khác.<br>- Placeholder: `0`.<br>- Lớn hơn 0. |
| 63 | Tổng cộng số tiền yêu cầu bồi thường (đồng) | Decimal(18,0) | - | 0 | Control UI: Text (Read-only), dòng cuối bảng `TỔNG CỘNG SỐ TIỀN YÊU CẦU BỒI THƯỜNG`.<br>- Tổng STT 59 của các dòng được tích và STT 62 của các dòng thiệt hại khác.<br>- Hiển thị kèm số tiền viết bằng chữ. |
| **G.2** | **Đề nghị tạm ứng kinh phí** | Section | - | - | Control UI: Section header. |
| 64 | Có đề nghị tạm ứng kinh phí bồi thường (Điều 44) | Boolean | Không | Chưa chọn | Control UI: Checkbox. |
| 65 | Tạm ứng Thiệt hại tinh thần (đồng) | Decimal(18,0) | Không | Trống | Control UI: Input text định dạng tiền.<br>- Chỉ hiển thị khi `Có đề nghị tạm ứng kinh phí bồi thường (Điều 44)` được tích.<br>- Placeholder: `0`.<br>- Chỉ nhập được khi có ít nhất 01 mục thuộc nhóm `V. Thiệt hại về tinh thần` được tích; còn lại khóa.<br>- Có dữ liệu: lớn hơn 0 và nhỏ hơn tổng `Số tiền yêu cầu bồi thường (đồng)` của các mục được tích thuộc nhóm `V. Thiệt hại về tinh thần`. |
| 66 | Tạm ứng Thiệt hại khác tính được ngay (đồng) | Decimal(18,0) | Không | Trống | Control UI: Input text định dạng tiền.<br>- Chỉ hiển thị khi `Có đề nghị tạm ứng kinh phí bồi thường (Điều 44)` được tích.<br>- Placeholder: `0`.<br>- Nhập tổng số tiền đề nghị tạm ứng các thiệt hại khác tính được ngay.<br>- Có dữ liệu: lớn hơn 0 và nhỏ hơn tổng `Số tiền yêu cầu bồi thường (đồng)` của các dòng được tích thuộc các nhóm khác nhóm `V. Thiệt hại về tinh thần`.<br>- Tài liệu chứng minh đính kèm tại thành phần `Các tài liệu kèm theo khác` (STT 83). |
| 67 | Tổng số tiền đề nghị tạm ứng (đồng) | Decimal(18,0) | - | 0 | Control UI: Text (Read-only).<br>- Chỉ hiển thị khi `Có đề nghị tạm ứng kinh phí bồi thường (Điều 44)` được tích.<br>- Bằng STT 65 + STT 66.<br>- Hiển thị kèm số tiền viết bằng chữ. |
| <a id="ef-khoi-nguoi-nhan-tien"></a>**G.3** | **Thông tin người nhận & phương thức chi trả** | Section | - | Ẩn | Control UI: Section header `THÔNG TIN NGƯỜI NHẬN & PHƯƠNG THỨC CHI TRẢ`.<br>- Chỉ hiển thị khi `Có đề nghị tạm ứng kinh phí bồi thường (Điều 44)` được tích hoặc có ít nhất 01 dòng được tích / dòng thiệt hại khác tại khối G.1.<br>- Gồm STT 68 đến STT 75. |
| 68 | Họ và tên người nhận | String(100) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ tên người nhận...`. |
| 69 | Giấy tờ thân nhân | String(50) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số CCCD/Hộ chiếu...`. |
| 70 | Địa chỉ chi tiết | String(1000) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ nhận tiền...`. |
| 71 | Phương thức nhận tiền | Enum(String(100)) | Có | `Nhận tiền mặt` | Control UI: Combobox.<br>- Giá trị theo [Danh mục Phương thức nhận tiền bồi thường/tạm ứng - Kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - BTNN](Ket_noi_chia_se_Dich_vu_cong_BTNN.md#kn-dm-28) [DM_28]. |
| 72 | Chủ tài khoản | String(100) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Phương thức nhận tiền` = `Nhận qua chuyển khoản`.<br>- Placeholder: `Nhập tên chủ tài khoản...`. |
| 73 | Số tài khoản | String(50) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Phương thức nhận tiền` = `Nhận qua chuyển khoản`.<br>- Placeholder: `Nhập số tài khoản...`. |
| 74 | Tên ngân hàng | String(255) | Có | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Phương thức nhận tiền` = `Nhận qua chuyển khoản`.<br>- Placeholder: `Nhập tên ngân hàng...`. |
| 75 | Chi nhánh | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Phương thức nhận tiền` = `Nhận qua chuyển khoản`.<br>- Placeholder: `Nhập tên chi nhánh (nếu có)...`. |
| **H** | **NỘI DUNG KHÁC** | Section | - | - | Control UI: Section header. |
| **H.1** | **Yêu cầu cơ quan phục hồi danh dự** | Section | - | Ẩn | Control UI: Section header `YÊU CẦU CƠ QUAN PHỤC HỒI DANH DỰ (THEO LUẬT TNBTCNN)`.<br>- Chỉ hiển thị khi `Loại yêu cầu giải quyết bồi thường` = `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)` hoặc `Chỉ yêu cầu phục hồi danh dự`.<br>- Gồm STT 76, STT 77. |
| 76 | Đề nghị cơ quan giải quyết chủ động tiến hành phục hồi danh dự (Điều 57) | Boolean | Không | Chưa chọn | Control UI: Checkbox.<br>- `Loại yêu cầu giải quyết bồi thường` = `Chỉ yêu cầu phục hồi danh dự`: tự tích, khóa trường. |
| 77 | Hình thức đề nghị phục hồi danh dự mong muốn (Điều 56) | List(Enum(String(100))) | Không | `Trực tiếp xin lỗi và cải chính công khai tại nơi cư trú / trụ sở (Điều 58)` | Control UI: Nhóm Checkbox, chọn nhiều.<br>- Hiển thị cùng khối H.1, không phụ thuộc `Đề nghị cơ quan giải quyết chủ động tiến hành phục hồi danh dự (Điều 57)`.<br>- Giá trị gồm:<br>+ `Trực tiếp xin lỗi và cải chính công khai tại nơi cư trú / trụ sở (Điều 58)`<br>+ `Đăng báo xin lỗi và cải chính công khai (Điều 59)` |
| 78 | Yêu cầu khôi phục quyền và lợi ích hợp pháp khác (nếu có) | Boolean | Không | Chưa chọn | Control UI: Checkbox. |
| 79 | Nội dung yêu cầu khôi phục quyền và lợi ích hợp pháp khác | Text(2000) | Có | Trống | Control UI: Textarea (02 dòng).<br>- Chỉ hiển thị khi `Yêu cầu khôi phục quyền và lợi ích hợp pháp khác (nếu có)` được tích.<br>- Placeholder: `Nhập nội dung yêu cầu khôi phục quyền, lợi ích hợp pháp khác...`. |
| <a id="ef-thanh-phan-ho-so"></a>**I** | **THÀNH PHẦN HỒ SƠ** | List(Object) | - | 04 dòng thành phần | Control UI: Bảng tài liệu đính kèm, mỗi dòng 01 thành phần hồ sơ (STT 80 đến STT 83).<br>- Không thêm, không xóa dòng thành phần.<br>- Mỗi thành phần đính kèm **01 tệp**.<br>- Định dạng tệp: `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`.<br>- Dung lượng tối đa 20MB/tệp.<br>- Thành phần chưa có tệp: hiển thị nút `Tải file`.<br>- Thành phần đã có tệp: hiển thị loại tệp, tên tệp, dung lượng, nút `Xem file`, `Xóa`; ẩn nút `Tải file`; xóa tệp để tải tệp khác. |
| 80 | Văn bản yêu cầu bồi thường | File | Có | Chưa có tệp | Control UI: Dòng thành phần hồ sơ. |
| 81 | Văn bản làm căn cứ yêu cầu bồi thường | File | Không | Chưa có tệp | Control UI: Dòng thành phần hồ sơ.<br>- Tên văn bản căn cứ chuyển sang Hệ thống BTNN: tên tệp, bỏ phần mở rộng. |
| 82 | Văn bản ủy quyền thực hiện yêu cầu bồi thường | File | Có | Ẩn | Control UI: Dòng thành phần hồ sơ.<br>- Chỉ hiển thị khi `Tư cách người yêu cầu bồi thường` khác `Người bị thiệt hại`.<br>- Chọn lại `Người bị thiệt hại`: ẩn dòng, bỏ tệp đã tải. |
| 83 | Các tài liệu kèm theo khác | File | Không | Chưa có tệp | Control UI: Dòng thành phần hồ sơ. |


<a id="ef-chuc-nang"></a>
#### Chức năng trên E-Form

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Mở rộng tất cả / Thu gọn tất cả | Button | Đặt phía trên bảng thiệt hại (khối G.1); mở rộng / thu gọn tất cả các nhóm. |
| 2 | Thêm thiệt hại khác | Button | Đặt dưới các dòng nhóm `VII. Các thiệt hại khác`; thêm 01 dòng trống vào nhóm (thêm được nhiều dòng), mở rộng nhóm, focus ô `Tên / nội dung thiệt hại`. |
| 3 | Xóa (dòng thiệt hại khác) | Button | Xóa dòng thiệt hại khác, không hiển thị popup xác nhận; dòng nhóm và dòng tổng cộng tự tính lại. |
| 4 | Tải file (thành phần hồ sơ) | Button | Mở hộp thoại chọn tệp và xử lý theo các trường hợp:<br>- **TH1 - Sai định dạng tệp**: hiển thị thông báo lỗi, không tiếp nhận tệp.<br>- **TH2 - Tệp quá dung lượng**: hiển thị thông báo lỗi, không tiếp nhận tệp.<br>- **TH3 - Hợp lệ**: gắn tệp vào thành phần, hiển thị `Xem file`, `Xóa`. |
| 5 | Xem file | Icon button | Mở tệp tại tab mới. |
| 6 | Xóa (tệp) | Icon button | Xóa tệp khỏi thành phần, không hiển thị popup xác nhận; hiển thị lại nút `Tải file`. |
| 7 | Nộp hồ sơ | Button | Hệ thống kiểm tra các trường đang hiển thị và xử lý theo các trường hợp bên dưới; có lỗi: tô viền đỏ ô lỗi, hiển thị thông báo dưới ô lỗi, focus ô lỗi đầu tiên, không nộp hồ sơ. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc** hiển thị thông báo lỗi. |
|  |  |  | **TH2 - Bảng thiệt hại (khối G.1) đang hiển thị, chưa có dòng nào được tích và không có dòng thiệt hại khác**: hiển thị thông báo lỗi. |
|  |  |  | **TH3 - `Số điện thoại` sai định dạng** (STT 11, 30): hiển thị thông báo lỗi. |
|  |  |  | **TH4 - `Email` sai định dạng** (STT 12, 31): hiển thị thông báo lỗi. |
|  |  |  | **TH5 - `Số giấy tờ thân nhân` không đúng 12 chữ số khi loại giấy tờ là `CMND/CCCD/Chứng minh quân đội`** (STT 33): hiển thị thông báo lỗi. |
|  |  |  | **TH6 - Ngày lớn hơn ngày hiện tại** (STT 3, 9, 15, 19, 29, 34, 38): hiển thị thông báo lỗi. |
|  |  |  | **TH7 - `Số tiền yêu cầu bồi thường (đồng)` hoặc `Số tiền (thiệt hại khác) (đồng)` không lớn hơn 0** (STT 59, 62), **hoặc số tiền tạm ứng có dữ liệu mà không lớn hơn 0** (STT 65, 66): hiển thị thông báo lỗi. |
|  |  |  | **TH8 - `Tạm ứng Thiệt hại tinh thần (đồng)` không nhỏ hơn tổng số tiền các mục được tích thuộc nhóm `V. Thiệt hại về tinh thần`**: hiển thị thông báo lỗi. |
|  |  |  | **TH9 - `Tạm ứng Thiệt hại khác tính được ngay (đồng)` không nhỏ hơn tổng số tiền các dòng được tích thuộc các nhóm khác nhóm `V. Thiệt hại về tinh thần`**: hiển thị thông báo lỗi. |
|  |  |  | **TH10 - Hợp lệ**: Cổng Dịch vụ công gửi hồ sơ sang Hệ thống BTNN theo mục IV. |

---

<a id="ef-anh-xa"></a>
### IV. GỬI DỮ LIỆU SANG HỆ THỐNG QUẢN LÝ BỒI THƯỜNG NHÀ NƯỚC

- Cấu trúc dữ liệu, tên trường JSON theo [Ánh xạ trường E-Form sang JSON - Tài liệu hướng dẫn tích hợp API - Kết nối Dịch vụ công với BTNN](Tai_lieu_API_tich_hop_DVC_BTNN.md#api-anh-xa-eform).
- Hồ sơ nhận vào màn Tiếp nhận hồ sơ của `Cơ quan giải quyết bồi thường` (STT 5).
- Giá trị Hệ thống BTNN gán cố định:

| Trường tại Hệ thống BTNN | Giá trị |
| :--- | :--- |
| Loại hồ sơ | `Giải quyết yêu cầu bồi thường` |
| Nguồn hồ sơ | `Dịch vụ công` |
| Hình thức tiếp nhận | `Dịch vụ công` |
| Đơn vị tiếp nhận hồ sơ | `Cơ quan giải quyết bồi thường` (STT 5) |


| Thành phần hồ sơ | Tên tài liệu tại Hệ thống BTNN |
| :--- | :--- |
| Văn bản yêu cầu bồi thường (STT 80) | `Văn bản yêu cầu bồi thường` |
| Văn bản làm căn cứ yêu cầu bồi thường (STT 81) | Văn bản làm căn cứ yêu cầu bồi thường |
| Văn bản ủy quyền thực hiện yêu cầu bồi thường (STT 82) | Bảng tài liệu đính kèm|
| Các tài liệu kèm theo khác (STT 83) | Bảng tài liệu đính kèm |
