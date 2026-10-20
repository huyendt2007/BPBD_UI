# BẢNG MAPPING TRƯỜNG DỮ LIỆU CÁC BIỂU MẪU BỒI THƯỜNG NHÀ NƯỚC (BTNN)

> **TÀI LIỆU ĐẶC TẢ KỸ THUẬT SINH VĂN BẢN VÀ MAPPING DỮ LIỆU TỰ ĐỘNG**
> - **Dự án**: Hệ thống Cơ sở dữ liệu quốc gia về Biện pháp bảo đảm và Bồi thường nhà nước
> - **Phân hệ**: Website Quản trị - Quản lý công tác Bồi thường nhà nước
> - **Căn cứ pháp lý**: 
>   + Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 81/2025/QH15 và Luật số 15/2026/QH16).
>   + Dự thảo Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Trách nhiệm bồi thường của Nhà nước.
>   + Nghị định số 30/2020/NĐ-CP ngày 05/03/2020 của Chính phủ về công tác văn thư.
> - **Danh sách 23 biểu mẫu đặc tả**: Mẫu 02, 03, 04, 05, 06, 07, 08, 18, 20, 21, 22, 23, 24, 25, 26, 32, 33, 34, 35, 36, 37, 38, 39.

---

## PHẦN I. QUY TẮC CHUNG ÁP DỤNG CHO TOÀN BỘ CÁC BIỂU MẪU

### 1. Quy tắc thay thế biến giữ chỗ (Placeholder)
1. **Định dạng biến**: Toàn bộ các vị trí cần điền dữ liệu động trên tệp phôi văn bản `.docx` đều được thiết lập dạng `##TenTruong##` theo quy tắc CamelCase (ví dụ: `##TenCoQuanGiaiQuyetBoiThuong##`, `##TongSoTienBoiThuong##`).
2. **Tuyệt đối không để sót ký tự placeholder thủ công**: Loại bỏ hoàn toàn các ký hiệu ba chấm (`..........`), dòng kẻ chấm (`.....`), gạch chân (`_____`) hoặc số thứ tự chú thích mẫu `(1)`, `(2)`, `(3)`... trong tệp văn bản xuất ra.
3. **Quy tắc xử lý trường bỏ trống / chưa có dữ liệu**:
   - Nếu trường thông tin người dùng chưa nhập hoặc dữ liệu chưa phát sinh: Thay thế bằng dấu chấm lửng `……` (ví dụ: `Số: ……/TB-STP`, `ngày … tháng … năm …`).
   - Riêng trường `##TenCoQuanChuQuan##`: Nếu cơ quan giải quyết bồi thường không có cơ quan chủ quản cấp trên (ví dụ: UBND cấp tỉnh, Bộ Tư pháp...), hệ thống tự động ẩn hoàn toàn dòng này, không để lại dòng trống.

### 2. Quy tắc định dạng ngày tháng
- **Phần địa danh, ngày tháng ban hành** (dưới Quốc hiệu - Tiêu ngữ): Định dạng chuẩn tiếng Việt theo Nghị định 30/2020/NĐ-CP: `[Địa danh], ngày dd tháng mm năm yyyy`. Đối với ngày dưới 10 và tháng 1, tháng 2 phải ghi thêm số `0` phía trước (ví dụ: `Hà Nội, ngày 05 tháng 02 năm 2026`).
- **Trong thân văn bản**: Tùy theo mẫu hiển thị dạng `ngày dd/mm/yyyy` hoặc `ngày dd tháng mm năm yyyy` theo đúng quy định tại từng điều khoản.

### 3. Quy tắc định dạng tiền tệ và chuyển đổi chữ
- **Số tiền bằng số**: Định dạng có dấu chấm (`.`) phân cách hàng nghìn, đơn vị hiển thị là `đồng` hoặc `VNĐ` (ví dụ: `150.000.000 đồng`).
- **Số tiền bằng chữ**: Tự động chuyển đổi từ số tiền sang chữ tiếng Việt chuẩn xác theo quy tắc kế toán tài chính, viết hoa chữ cái đầu tiên và kết thúc bằng chữ `đồng` (ví dụ: `Một trăm năm mươi triệu đồng`).

### 4. Quy tắc xử lý thông tin Người yêu cầu bồi thường (Cá nhân hoặc Tổ chức)
- **Phân loại đối tượng**: Người yêu cầu bồi thường được chia làm 2 loại đối tượng theo trường `Loại người yêu cầu`: `Cá nhân` hoặc `Tổ chức`.
- **Tên người yêu cầu (`##TenNguoiYeuCauBoiThuong##`)**:
  + Khi `Loại người yêu cầu` = `Cá nhân`: Lấy từ trường **"Họ và tên"** (ví dụ: `Nguyễn Văn Nam`).
  + Khi `Loại người yêu cầu` = `Tổ chức`: Lấy từ trường **"Tên tổ chức"** (ví dụ: `Công ty TNHH Xây dựng và Thương mại Ánh Dương`).
- **Xưng hô / Kính gửi trong biểu mẫu văn bản**:
  + Đối với `Cá nhân`: Hiển thị dạng `Ông/Bà [Họ và tên]` (hoặc `[Họ và tên]` tùy theo mẫu).
  + Đối với `Tổ chức`: Hiển thị tên đầy đủ của tổ chức `[Tên tổ chức]` (hoặc kèm thông tin Người đại diện theo pháp luật: `[Tên tổ chức] (Người đại diện theo pháp luật: Ông/Bà [Họ và tên người đại diện] - [Chức vụ])` nếu văn bản yêu cầu ghi rõ thông tin người đại diện).
- **Thông tin giấy tờ pháp lý / định danh**:
  + Đối với `Cá nhân`: Lấy từ trường `Loại giấy tờ thân nhân` và `Số giấy tờ thân nhân` (ví dụ: `CCCD số 001090001234`).
  + Đối với `Tổ chức`: Lấy từ trường `Mã số tổ chức` (mã số doanh nghiệp, mã số thuế hoặc mã định danh tổ chức) và `Số giấy tờ thành lập/đăng ký` (nếu có).
- **Thông tin Người đại diện theo pháp luật (áp dụng khi là Tổ chức)**:
  + Lấy theo 02 trường: `Họ và tên người đại diện theo pháp luật` và `Chức vụ người đại diện` trên form Nhập liệu hồ sơ vụ việc / Thông tin hồ sơ yêu cầu bồi thường.
- **Địa chỉ liên hệ (`##DiaChiNguoiYeuCauBoiThuong##`)**:
  + Đối với `Cá nhân`: Địa chỉ nơi cư trú của cá nhân.
  + Đối với `Tổ chức`: Địa chỉ trụ sở chính của tổ chức.

### 5. Quy tắc ghép địa chỉ người yêu cầu bồi thường (Địa chỉ chi tiết)
- **Áp dụng cho**: Biến `##DiaChiNguoiYeuCauBoiThuong##` (và các trường địa chỉ khác như `##DiaChiNguoiBiThietHai##`, `##DiaChiNguoiNhanTien##`...).
- **Mô tả trường**: Địa chỉ của người yêu cầu bồi thường (đối với Cá nhân là nơi cư trú; đối với Tổ chức là địa chỉ trụ sở chính).
- **Nguồn dữ liệu trên Form**: Ghép 4 trường: `Địa chỉ chi tiết`, `Phường/Xã`, `Tỉnh/Thành phố`, `Quốc gia` ở trên Form chức năng tương ứng (ví dụ: màn hình *Tiếp nhận hồ sơ* đối với Mẫu 02; màn hình *Nhập liệu hồ sơ vụ việc* đối với Mẫu 03; hoặc *Thông tin hồ sơ yêu cầu bồi thường* đối với các mẫu tiếp theo).
- **Quy tắc ghép chuỗi tự động**:
  1. Ghép tuần tự: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]` (cách nhau bởi dấu phẩy và khoảng trắng `, `).
  2. Tự động bỏ qua các thành phần bỏ trống hoặc không có dữ liệu (không để lại dấu phẩy thừa).
  3. Trường hợp trường `Quốc gia` có giá trị khác "Việt Nam", hệ thống tự động ghép thêm tên `[Quốc gia]` ở cuối chuỗi.

### 6. Quy tắc số điện thoại và email liên hệ người yêu cầu bồi thường
- **Áp dụng cho**: Biến `##SoDienThoaiNguoiYeuCau##` và `##EmailNguoiYeuCau##`.
- **Mô tả trường**: Số điện thoại và thư điện tử (email) liên hệ của người yêu cầu bồi thường (áp dụng cho cả Cá nhân và Tổ chức).
- **Nguồn dữ liệu trên Form**: Lấy từ trường **"Số điện thoại"** và **"Email"** của người yêu cầu trên form tương ứng (ví dụ: màn hình *Tiếp nhận hồ sơ*, màn hình *Nhập liệu hồ sơ vụ việc*).
- **Quy tắc định dạng**: Định dạng số điện thoại chuẩn Việt Nam (chuỗi số, tự động loại bỏ khoảng trắng thừa); email chuẩn định dạng RFC.

---

### 7. Quy tắc thể thức văn bản hành chính (Nghị định 30/2020/NĐ-CP)
- **Khổ giấy**: A4 đứng (`210 mm x 297 mm`), chuẩn Microsoft Word OpenXML (`.docx`).
- **Lề trang chuẩn**: Lề trên 20 mm, lề dưới 20 mm, lề trái 30 mm, lề phải 15 mm.
- **Phông chữ**: Thống nhất 100% phông chữ **Times New Roman**.
- **Cỡ chữ và kiểu dáng**:
  + Quốc hiệu: 12-13pt in hoa đứng, in đậm (`CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM`).
  + Tiêu ngữ: 13-14pt in thường, in đậm, có đường gạch chân liền nét dưới (`Độc lập - Tự do - Hạnh phúc`).
  + Tên cơ quan chủ quản: 12-13pt in hoa đứng.
  + Tên cơ quan GQBT: 12-13pt in hoa đứng, in đậm, có đường kẻ ngang dưới.
  + Số, ký hiệu: 13pt in thường, đứng.
  + Tên văn bản (QUYẾT ĐỊNH, THÔNG BÁO...): 14pt in hoa, in đậm, căn giữa.
  + Trích yếu nội dung: 13-14pt in thường, in đậm, căn giữa.
  + Thân văn bản: 14pt in thường, giãn dòng 1.15 - 1.2 lines, thụt đầu dòng 1 cm, căn đều 2 bên (Justified).
  + Nơi nhận: Tiêu đề 12pt in đậm, nghiêng; danh sách nơi nhận 11pt in thường, đứng.
  + Chức vụ người ký: 14pt in hoa, in đậm, căn giữa.

---

### 8. Bảng trường thông tin dùng chung (Shared Header & Footer)

> [!NOTE]
> Các thông tin **Số, ký hiệu văn bản (`##SoKyHieuVanBan##`)** và **Ngày tháng năm ban hành văn bản (`##NgayThangNamBanHanh##`)** theo từng biểu mẫu phải nhập trực tiếp trên Form tương ứng của từng màn hình, do đó không nằm ở bảng thông tin dùng chung này mà được đặc tả chi tiết tại từng biểu mẫu ở Phần II.

| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Góc trên cùng | `##SoHieuNghiDinh##` | Cấu hình tham số hệ thống | Số ký hiệu Nghị định | Giá trị cố định toàn hệ thống. Nếu chưa ban hành: thay bằng `.../.../NĐ-CP` | `.../.../NĐ-CP` |
| 2 | Góc trên cùng | `##NgayBanHanhNghiDinh##` | Cấu hình tham số hệ thống | Ngày ban hành Nghị định | Định dạng `dd/mm/yyyy`. Nếu chưa ban hành: thay bằng `.../.../...` | `.../.../...` |
| 3 | Bảng đầu trang - Ô trái (dòng trên) | `##TenCoQuanChuQuan##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Tên cơ quan, đơn vị | Tên đơn vị mà cán bộ đang đăng nhập. Lấy theo thông tin Tên cơ quan, đơn vị trong phần Quản lý cơ cấu tổ chức. Viết in hoa toàn bộ. Nếu cơ quan không có cơ quan chủ quản cấp trên thì để trống dòng này | `ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI` |
| 4 | Bảng đầu trang - Ô trái (dòng dưới) | `##TenCoQuanGiaiQuyetBoiThuong##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Tên cơ quan, đơn vị | Tên đơn vị mà cán bộ đang đăng nhập (Cơ quan giải quyết bồi thường). Lấy theo thông tin Tên cơ quan, đơn vị trong phần Quản lý cơ cấu tổ chức. Viết in hoa, in đậm toàn bộ | `SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 5 | Bảng đầu trang - Ô phải | `##DiaDanh##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Tỉnh/Thành phố | Lấy theo Tỉnh/Thành phố của đơn vị Tên đơn vị mà cán bộ đang đăng nhập ở phần Quản lý cơ cấu tổ chức Hoặc Phường/Xã... tùy theo Loại cơ quan, đơn vị. Quy tắc: Bỏ các tiền tố "Tỉnh", "Thành phố", "Phường", "Xã" | `Hà Nội` |
| 6 | Bảng ký - Ô phải | `##ChucVuNguoiDungDau##` | Quản lý cơ cấu tổ chức > Danh mục chức vụ [DM_58] | Tên chức vụ | Chức vụ của người đứng đầu cơ quan giải quyết bồi thường hoặc người có thẩm quyền ký ban hành văn bản. In hoa toàn bộ | `GIÁM ĐỐC` hoặc `CHỦ TỊCH` |
| 7 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Quản lý tài khoản cán bộ / Form ký ban hành | Họ và tên người ký | Họ và tên của cán bộ, lãnh đạo ký văn bản. In hoa, in đậm dưới phần chữ ký | `NGUYỄN VĂN AN` |
| 8 | Bảng nơi nhận / Thân văn bản | `##TenCoQuanQuanLyNhaNuocBTNN##` | Cấu hình hệ thống > Danh mục cơ quan QLNN về BTNN | Tên cơ quan quản lý nhà nước về công tác BTNN | Phụ thuộc cấp cơ quan giải quyết bồi thường: Cấp Trung ương là Cục Bồi thường nhà nước - Bộ Tư pháp; Cấp địa phương là Sở Tư pháp tỉnh/thành phố | `Sở Tư pháp thành phố Hà Nội` |

---

## PHẦN II. ĐẶC TẢ CHI TIẾT MAPPING TỪNG BIỂU MẪU

### 1. MẪU SỐ 02/BTNN: GIẤY TIẾP NHẬN YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_02_BTNN_Template.docx`
- **Mục đích**: Cơ quan giải quyết bồi thường lập và giao/gửi cho người yêu cầu bồi thường để xác nhận thời điểm và thành phần hồ sơ đã tiếp nhận.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Tiếp nhận hồ sơ > Chi tiết hồ sơ tiếp nhận (hoặc Danh sách hồ sơ / Tiếp nhận hồ sơ) > Thao tác "In Phiếu tiếp nhận"*.
- **Quy tắc đặt tên file tải về**: `Mau_02_BTNN_Giay_tiep_nhan_[Mã vụ việc].docx`
- **Ghi chú về Số, ký hiệu văn bản**: Thông tin Số, ký hiệu văn bản không thực hiện mapping từ phần mềm; trên mẫu in hiển thị để trống dạng `Số: ……` để cán bộ tự điền/đóng dấu số sau khi in ra.

#### Bảng mapping chi tiết Mẫu 02/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Tiếp nhận hồ sơ > Form In Phiếu tiếp nhận | Ngày lập phiếu tiếp nhận | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 10 tháng 03 năm 2026` |
| 2 | Kính gửi | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ | Họ và tên / Tên tổ chức yêu cầu | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Nguyễn Văn Nam` hoặc `Công ty CP Đầu tư & Xây dựng Lam Sơn` |
| 3 | Dưới Kính gửi | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Số 12 phố Hàng Bông, Phường Hàng Gai, Quận Hoàn Kiếm, TP. Hà Nội` |
| 4 | Dưới Địa chỉ | `##SoDienThoaiNguoiYeuCau##` | Tiếp nhận hồ sơ | Số điện thoại | Số điện thoại liên hệ của người yêu cầu bồi thường. Lấy từ trường Số điện thoại của người yêu cầu trên màn hình Tiếp nhận hồ sơ. Định dạng số điện thoại chuẩn. | `0912345678` |
| 5 | Đoạn 1 | `##NgayTiepNhan##` | Tiếp nhận hồ sơ | Thời điểm tiếp nhận | Định dạng: `ngày dd tháng mm năm yyyy` | `ngày 10 tháng 03 năm 2026` |
| 6 | Đoạn 1 | `##HinhThucNopHoSo##` | Tiếp nhận hồ sơ | Hình thức nộp hồ sơ | Lấy theo đúng giá trị của trường Hình thức nộp hồ sơ (hoặc Hình thức tiếp nhận) trên màn hình Tiếp nhận hồ sơ trong tài liệu (gồm "Trực tiếp" hoặc "Qua dịch vụ bưu chính"). Khi đưa vào biểu mẫu văn bản, hiển thị chữ thường: `trực tiếp` hoặc `qua dịch vụ bưu chính` | `trực tiếp` hoặc `qua dịch vụ bưu chính` |
| 7 | Đoạn 2 | `##DanhSachGiayToTiepNhan##` | Tiếp nhận hồ sơ | Tên văn bản, căn cứ & Tên tài liệu | Lấy danh sách tài liệu từ cả 2 phần trên màn hình Tiếp nhận hồ sơ:<br>+ Phần **Văn bản làm căn cứ yêu cầu bồi thường**: Lấy theo trường `Tên văn bản, căn cứ`.<br>+ Phần **Bảng tài liệu đính kèm**: Lấy theo trường `Tên tài liệu` (bao gồm giấy tờ tùy thân CCCD đối với cá nhân, hoặc Giấy chứng nhận ĐKKD / quyết định thành lập, giấy ủy quyền đối với tổ chức).<br>Tự động đánh số thứ tự liên tục từng dòng dạng:<br>`- 1. [Tên văn bản, căn cứ / Tên tài liệu]` | `- 1. Bản án hình sự phúc thẩm số 18/2025/HSPT<br>- 2. Đơn yêu cầu bồi thường<br>- 3. Giấy chứng nhận thương tật (hoặc Giấy chứng nhận ĐKKD)` |

---

### 2. MẪU SỐ 03/BTNN: THÔNG BÁO VỀ VIỆC BỔ SUNG HỒ SƠ YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_03_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người yêu cầu bồi thường biết các tài liệu, giấy tờ còn thiếu cần phải bổ sung trong thời hạn 15 ngày làm việc theo quy định tại khoản 3 Điều 16 Nghị định hướng dẫn.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Nhập liệu hồ sơ vụ việc > Thao tác "Yêu cầu bổ sung hồ sơ"*.
- **Quy tắc đặt tên file tải về**: `Mau_03_BTNN_Thong_bao_bo_sung_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 03/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Nhập liệu hồ sơ vụ việc > Form Yêu cầu bổ sung hồ sơ | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `15/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Nhập liệu hồ sơ vụ việc > Form Yêu cầu bổ sung hồ sơ | Ngày văn bản | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 05 tháng 03 năm 2026` |
| 3 | Kính gửi | `##TenNguoiYeuCauBoiThuong##` | Nhập liệu hồ sơ vụ việc | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Trần Thị Mai` hoặc `Công ty TNHH Cơ khí & Xây dựng Ánh Dương` |
| 4 | Dưới Kính gửi | `##DiaChiNguoiYeuCauBoiThuong##` | Nhập liệu hồ sơ vụ việc | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Số 45 đường Lê Lợi, Phường Máy Tơ, Quận Ngô Quyền, TP. Hải Phòng` |
| 5 | Thân văn bản | `##NgayTiepNhan##` | Nhập liệu hồ sơ vụ việc | Ngày văn bản yêu cầu bồi thường | Lấy theo thông tin Ngày văn bản yêu cầu bồi thường trên màn hình Nhập liệu hồ sơ vụ việc. Định dạng: `ngày dd tháng mm năm yyyy` | `ngày 05 tháng 03 năm 2026` |
| 6 | Thân văn bản | `##HinhThucNopHoSo##` | Nhập liệu hồ sơ vụ việc | Hình thức tiếp nhận | Lấy theo thông tin Hình thức tiếp nhận trên màn hình Nhập liệu hồ sơ vụ việc. Hiển thị chữ thường: `trực tiếp` hoặc `qua dịch vụ bưu chính` | `qua dịch vụ bưu chính` |
| 7 | Thân văn bản | `##DanhSachGiayToBoSung##` | Nhập liệu hồ sơ vụ việc > Form Yêu cầu bổ sung hồ sơ | Nội dung yêu cầu bổ sung | Mỗi dòng chuyển thành dạng `1. [Tên giấy tờ]`. Loại bỏ dòng trống | `1. Bản sao có chứng thực giấy tờ tùy thân / giấy tờ pháp lý của tổ chức<br>2. Hóa đơn chứng từ chứng minh thiệt hại thực tế` |

---

### 3. MẪU SỐ 04/BTNN: THÔNG BÁO VỀ VIỆC THỤ LÝ / KHÔNG THỤ LÝ HỒ SƠ YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_04_BTNN_Template.docx`
- **Mục đích**: Thông báo chính thức cho người yêu cầu về việc cơ quan có thẩm quyền thụ lý hồ sơ (đủ điều kiện) hoặc không thụ lý hồ sơ (không đủ điều kiện, kèm lý do và trả lại hồ sơ).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Thụ lý hồ sơ > Thao tác "Thụ lý hồ sơ" HOẶC "Không thụ lý hồ sơ"*.
- **Quy tắc đặt tên file tải về**: `Mau_04_BTNN_Thong_bao_thu_ly_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 04/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Thụ lý hồ sơ > Form Ban hành thông báo thụ lý / không thụ lý | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `24/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Thụ lý hồ sơ > Form Ban hành thông báo thụ lý / không thụ lý | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 12 tháng 03 năm 2026` |
| 3 | Tiêu đề trích yếu | `##TieuDeThongBaoThuLy##` | Thụ lý hồ sơ | Kết quả thụ lý | Control UI: Radio.<br>Gồm:<br>+ thụ lý hồ sơ yêu cầu bồi thường<br>+ không thụ lý hồ sơ yêu cầu bồi thường | Chữ thường, hiển thị theo kết quả phê duyệt | `thụ lý hồ sơ yêu cầu bồi thường` |
| 4 | Kính gửi | `##TenNguoiYeuCauBoiThuong##` | Thụ lý hồ sơ | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Lê Văn Chung` hoặc `Công ty TNHH Vận tải & Xây lắp An Phát` |
| 5 | Dưới Kính gửi | `##DiaChiNguoiYeuCauBoiThuong##` | Thụ lý hồ sơ | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Số 88 đường Giải Phóng, TP. Nam Định` |
| 6 | Thân văn bản | `##NgayTiepNhan##` | Thụ lý hồ sơ | Thời điểm tiếp nhận hồ sơ | Định dạng `ngày dd/mm/yyyy` | `ngày 12/03/2026` |
| 7 | Thân văn bản | `##NoiDungThongBaoThuLy##` | Thụ lý hồ sơ > Form Ban hành thông báo thụ lý / không thụ lý | Nội dung kết luận thụ lý / lý do không thụ lý | - Trường hợp Thụ lý: sinh câu văn thụ lý theo khoản 1 Điều 43 (đối với Cá nhân: "Hồ sơ của Ông/Bà..."; đối với Tổ chức: "Hồ sơ của [Tên tổ chức]...").<br>- Trường hợp Không thụ lý: viện dẫn điểm/khoản Điều 43, nêu rõ lý do và thông báo trả lại hồ sơ | *"Hồ sơ của Ông/Bà đầy đủ điều kiện thụ lý theo quy định..."* HOẶC *"Hồ sơ của Công ty... đầy đủ điều kiện thụ lý..."* HOẶC *"Căn cứ điểm b khoản 2 Điều 43 Luật TNBTCNN, không thụ lý do..."* |

---

### 4. MẪU SỐ 05/BTNN: THÔNG BÁO VỀ VIỆC DỪNG GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_05_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người yêu cầu biết việc cơ quan GQBT dừng giải quyết yêu cầu bồi thường và trả lại hồ sơ hoặc chuyển hồ sơ đến cơ quan có thẩm quyền theo khoản 6 Điều 43 Luật TNBTCNN (sửa đổi 2026).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Dừng giải quyết bồi thường"*.
- **Quy tắc đặt tên file tải về**: `Mau_05_BTNN_Thong_bao_dung_giai_quyet_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 05/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Dừng giải quyết bồi thường | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `30/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Dừng giải quyết bồi thường | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 18 tháng 03 năm 2026` |
| 3 | Kính gửi | `##TenNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Hoàng Văn Phúc` hoặc `Công ty Cổ phần Thương mại Sao Việt` |
| 4 | Dưới Kính gửi | `##DiaChiNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Xã Tân Triều, Huyện Thanh Trì, TP. Hà Nội` |
| 5 | Đoạn 1 | `##SoThongBaoThuLy##` | Quá trình giải quyết hồ sơ | Số thông báo thụ lý trước đó | Lấy từ văn bản thông báo thụ lý đã ban hành của hồ sơ | `24/TB-STP` |
| 6 | Đoạn 1 | `##NgayThongBaoThuLy##` | Quá trình giải quyết hồ sơ | Ngày ban hành thông báo thụ lý | Định dạng `dd/mm/yyyy` | `15/02/2026` |
| 7 | Đoạn 1 | `##LyDoDungGiaiQuyet##` | Quá trình giải quyết > Form Dừng giải quyết bồi thường | Lý do dừng giải quyết | Nêu rõ lý do tương ứng khoản 2 hoặc khoản 4 Điều 43 | `yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước` |
| 8 | Đoạn 1 | `##CanCuDungGiaiQuyet##` | Quá trình giải quyết > Form Dừng giải quyết bồi thường | Căn cứ dừng giải quyết | Control UI: Combobox.<br>Gồm:<br>+ điểm a khoản 2<br>+ điểm b khoản 2<br>+ điểm c khoản 2<br>+ khoản 4 | Chọn điều khoản tương ứng căn cứ pháp lý | `điểm b khoản 2` |
| 9 | Đoạn 2 | `##BienPhapXuLyTiepTheo##` | Quá trình giải quyết > Form Dừng giải quyết bồi thường | Biện pháp xử lý hồ sơ tiếp theo | Control UI: Radio.<br>Gồm:<br>+ trả lại hồ sơ yêu cầu bồi thường cho Ông/Bà hoặc Quý cơ quan/tổ chức (gửi kèm Thông báo này)<br>+ chuyển hồ sơ đến cơ quan có thẩm quyền giải quyết | Tùy chọn theo căn cứ dừng: trả lại hồ sơ HOẶC chuyển tiếp hồ sơ kèm tên cơ quan tiếp nhận | `trả lại hồ sơ yêu cầu bồi thường cho Ông/Bà (gửi kèm Thông báo này)` |

---

### 5. MẪU SỐ 06/BTNN: QUYẾT ĐỊNH CỬ NGƯỜI GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_06_BTNN_Template.docx`
- **Mục đích**: Thủ trưởng cơ quan giải quyết bồi thường ban hành quyết định phân công công chức/cán bộ trực tiếp thụ lý, giải quyết vụ việc bồi thường theo khoản 1 Điều 43 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Thụ lý hồ sơ > Thao tác "Phân công người giải quyết"*.
- **Quy tắc đặt tên file tải về**: `Mau_06_BTNN_Quyet_dinh_cu_nguoi_GQBT_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 06/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Thụ lý hồ sơ > Form Phân công người giải quyết | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `16/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Thụ lý hồ sơ > Form Phân công người giải quyết | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 15 tháng 03 năm 2026` |
| 3 | Căn cứ & Điều 1 | `##TenNguoiYeuCauBoiThuong##` | Thụ lý hồ sơ | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Phạm Minh Tuấn` hoặc `Công ty TNHH Xây dựng Phú Thịnh` |
| 4 | Điều 1 | `##DiaChiNguoiYeuCauBoiThuong##` | Thụ lý hồ sơ | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Phường Hàng Đào, Quận Hoàn Kiếm, TP. Hà Nội` |
| 5 | Điều 1, 2, 4 | `##HoTenNguoiGiaiQuyet##` | Thụ lý hồ sơ > Form Phân công người giải quyết | Người giải quyết được phân công | Điền vào Điều 1, 2 và Điều 4 | `Nguyễn Thị Lan` |
| 6 | Điều 1 | `##ChucVuNguoiGiaiQuyet##` | Thụ lý hồ sơ > Form Phân công người giải quyết | Chức vụ cán bộ được phân công | Chức danh công tác của cán bộ | `Chuyên viên chính` |
| 7 | Điều 1 | `##DonViCongTacNguoiGQ##` | Thụ lý hồ sơ > Form Phân công người giải quyết | Đơn vị, phòng ban công tác | Tên phòng ban trực thuộc cơ quan giải quyết | `Phòng Bổ trợ tư pháp` |

---

### 6. MẪU SỐ 07/BTNN: QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ BỒI THƯỜNG
- **Tên tệp template**: `Mau_07_BTNN_Template.docx`
- **Mục đích**: Quyết định tạm ứng một phần kinh phí bồi thường đối với các thiệt hại về tính mạng, sức khỏe, tài sản hoặc thiệt hại cấp bách theo quy định tại Điều 44 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Lập quyết định tạm ứng"*.
- **Quy tắc đặt tên file tải về**: `Mau_07_BTNN_Quyet_dinh_tam_ung_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 07/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Quyết định tạm ứng kinh phí | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `25/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Quyết định tạm ứng kinh phí | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 22 tháng 03 năm 2026` |
| 3 | Căn cứ | `##SoKyHieuVanBanCanCu##` | Thông tin hồ sơ yêu cầu bồi thường | Số, ký hiệu văn bản làm căn cứ | Giữ nguyên số hiệu văn bản căn cứ | `05/2025/HSST` |
| 4 | Căn cứ | `##NgayBanHanhVanBanCanCu##` | Thông tin hồ sơ yêu cầu bồi thường | Ngày ban hành văn bản làm căn cứ | Định dạng `dd/mm/yyyy` | `15/08/2025` |
| 5 | Căn cứ | `##CoQuanBanHanhVanBanCanCu##` | Thông tin hồ sơ yêu cầu bồi thường | Cơ quan ban hành văn bản làm căn cứ | Tên cơ quan ban hành | `Tòa án nhân dân tỉnh Vĩnh Phúc` |
| 6 | Căn cứ | `##NgayYeuCauTamUng##` | Quá trình giải quyết > Đơn yêu cầu tạm ứng | Ngày nộp đơn yêu cầu tạm ứng | Định dạng `dd/mm/yyyy` | `20/02/2026` |
| 7 | Điều 1 | `##TongSoTienTamUng##` | Quá trình giải quyết > Form Quyết định tạm ứng kinh phí | Tổng số tiền tạm ứng | Định dạng phân cách hàng nghìn bằng dấu chấm | `50.000.000` |
| 8 | Điều 1 | `##TongSoTienTamUngBangChu##` | Quá trình giải quyết > Form Quyết định tạm ứng kinh phí | Tổng số tiền tạm ứng bằng chữ | Chuyển đổi từ số tiền, viết hoa chữ cái đầu, có chữ "đồng" | `Năm mươi triệu đồng` |
| 9 | Điều 1 | `##ChiTietCacKhoanTamUng##` | Quá trình giải quyết > Form Quyết định tạm ứng kinh phí | Nội dung chi tiết các khoản tạm ứng | Liệt kê chi phí: chi phí cứu chữa, bồi dưỡng sức khỏe, phục hồi chức năng... | `chi phí khám chữa bệnh: 30.000.000 đồng; chi phí thu nhập thực tế bị mất: 20.000.000 đồng` |
| 10 | Điều 2 | `##PhuongThucChiTraTamUng##` | Quá trình giải quyết > Form Quyết định tạm ứng kinh phí | Phương thức chi trả tiền tạm ứng | Control UI: Radio.<br>Gồm:<br>+ chuyển khoản<br>+ tiền mặt | Ghi rõ hình thức chi trả | `chuyển khoản qua tài khoản ngân hàng` |
| 11 | Điều 2 | `##ThongTinTaiKhoanNhanTamUng##` | Quá trình giải quyết > Form Quyết định tạm ứng kinh phí | Ghép các trường: Số tài khoản, Chủ tài khoản, Ngân hàng | Nếu chuyển khoản: ghi rõ `Số TK: ..., Chủ TK: ..., Mở tại: ...`. Nếu tiền mặt: ghi `tại trụ sở cơ quan giải quyết bồi thường` | `Số tài khoản: 19028888888, Chủ tài khoản: Nguyễn Văn A (hoặc Công ty TNHH Phú Thịnh), Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank) - Chi nhánh Hà Nội` |
| 12 | Nơi nhận | `##TenCoQuanTaiChinh##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Cơ quan tài chính cấp phát kinh phí | Tên cơ quan cấp phát kinh phí bồi thường | `Sở Tài chính thành phố Hà Nội` |

---

### 7. MẪU SỐ 08/BTNN: THÔNG BÁO YÊU CẦU CUNG CẤP TÀI LIỆU, CHỨNG CỨ PHỤC VỤ XÁC MINH THIỆT HẠI
- **Tên tệp template**: `Mau_08_BTNN_Template.docx`
- **Mục đích**: Gửi các cơ quan, tổ chức, cá nhân có liên quan yêu cầu cung cấp hồ sơ, tài liệu, số liệu kế toán hoặc chứng cứ phục vụ việc xác minh các khoản thiệt hại theo Điều 45 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Xác minh thiệt hại > Thao tác "Yêu cầu cung cấp tài liệu"*.
- **Quy tắc đặt tên file tải về**: `Mau_08_BTNN_Thong_bao_yeu_cau_tai_lieu_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 08/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Xác minh thiệt hại > Form Yêu cầu tài liệu | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `32/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Xác minh thiệt hại > Form Yêu cầu tài liệu | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 25 tháng 03 năm 2026` |
| 3 | Kính gửi | `##TenCoQuanToChucNhanYeuCau##` | Quá trình giải quyết > Xác minh thiệt hại > Form Yêu cầu tài liệu | Tên cơ quan, tổ chức nhận yêu cầu | Tên cơ quan lưu giữ tài liệu, chứng cứ | `Bệnh viện Đa khoa tỉnh Hà Nam` |
| 4 | Dưới Kính gửi | `##DiaChiCoQuanToChucNhanYeuCau##` | Quá trình giải quyết > Xác minh thiệt hại > Form Yêu cầu tài liệu | Địa chỉ cơ quan, tổ chức nhận yêu cầu | Địa chỉ gửi công văn yêu cầu | `Số 15 đường Trần Hưng Đạo, TP. Phủ Lý, Tỉnh Hà Nam` |
| 5 | Đoạn 1 | `##TenNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu` (Cá nhân: Họ và tên; Tổ chức: Tên tổ chức) | `Bùi Văn Hùng` hoặc `Hợp tác xã Nông nghiệp Tiến Đạt` |
| 6 | Đoạn 1 | `##TrichYeuVuViecYeuCau##` | Thông tin hồ sơ yêu cầu bồi thường | Trích yếu nội dung vụ việc yêu cầu bồi thường | Tóm tắt ngắn gọn nội dung vụ việc | `yêu cầu bồi thường thiệt hại do bị tạm giam oan từ ngày 01/01/2023 đến 01/01/2024` |
| 7 | Đoạn 2 | `##DanhSachTaiLieuChungCuYeuCau##` | Quá trình giải quyết > Xác minh thiệt hại > Form Yêu cầu tài liệu | Danh mục tài liệu, chứng cứ cần cung cấp | Đánh số thứ tự từng tài liệu cần trích lục, sao y | `1. Bệnh án điều trị ngoại trú số 452/BA từ ngày 10/02/2024 đến 25/03/2024.<br>2. Toàn bộ hóa đơn, phiếu thu tiền thuốc và viện phí kèm theo.` |
| 8 | Đoạn 3 | `##DiaChiCoQuanGiaiQuyetBoiThuong##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Địa chỉ trụ sở cơ quan giải quyết | Địa chỉ trụ sở cơ quan giải quyết bồi thường | `Số 221 phố Trần Phú, Quận Hà Đông, TP. Hà Nội` |
| 9 | Đoạn 3 | `##ThoiHanCungCapTaiLieu##` | Quá trình giải quyết > Xác minh thiệt hại > Form Yêu cầu tài liệu | Thời hạn cung cấp tài liệu | Định dạng `dd/mm/yyyy` | `15/04/2026` |

---

### 8. MẪU SỐ 18/BTNN: QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_18_BTNN_Template.docx`
- **Mục đích**: Quyết định giải quyết bồi thường chính thức của cơ quan giải quyết bồi thường sau khi kết thúc thương lượng hoặc theo các trường hợp quy định tại khoản 1 Điều 47 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thương lượng bồi thường > Thao tác "Lập quyết định giải quyết bồi thường"*.
- **Quy tắc đặt tên file tải về**: `Mau_18_BTNN_Quyet_dinh_giai_quyet_BTNN_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 18/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Quyết định giải quyết bồi thường | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `18/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Quyết định giải quyết bồi thường | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 28 tháng 03 năm 2026` |
| 3 | Căn cứ | `##SoKyHieuVanBanCanCu##` | Thông tin hồ sơ yêu cầu bồi thường | Văn bản làm căn cứ yêu cầu bồi thường | Số hiệu, ngày ban hành và cơ quan ban hành | `Bản án hình sự phúc thẩm số 18/2025/HSPT ngày 10/11/2025 của Tòa án nhân dân cấp cao tại Hà Nội` |
| 4 | Căn cứ | `##SoQDTamUng##` | Quá trình giải quyết hồ sơ | Số quyết định tạm ứng kinh phí | Nếu có tạm ứng thì hiển thị căn cứ này, không có thì bỏ căn cứ | `Quyết định số 12/QĐ-STP ngày 25/01/2026 của Giám đốc Sở Tư pháp` |
| 5 | Căn cứ | `##NgayLapBienBanThuongLuong##` | Quá trình giải quyết > Kết quả thương lượng | Ngày lập biên bản thương lượng | Định dạng `dd/mm/yyyy` | `28/03/2026` |
| 6 | Điều 1 | `##TongSoTienBoiThuong##` | Quá trình giải quyết > Form Quyết định giải quyết bồi thường | Tổng số tiền bồi thường | Định dạng số phân cách hàng nghìn bằng dấu chấm | `350.000.000` |
| 7 | Điều 1 | `##TongSoTienBoiThuongBangChu##` | Quá trình giải quyết > Form Quyết định giải quyết bồi thường | Tổng số tiền bồi thường bằng chữ | Chữ tiếng Việt chuẩn có chữ "đồng" | `Ba trăm năm mươi triệu đồng` |
| 8 | Điều 1 | `##ThietHaiTaiSan##` | Quá trình giải quyết > Bảng chi tiết thiệt hại | Thiệt hại do tài sản bị xâm phạm | Số tiền (định dạng dấu chấm) | `50.000.000` |
| 9 | Điều 1 | `##ThietHaiThuNhap##` | Quá trình giải quyết > Bảng chi tiết thiệt hại | Thiệt hại do thu nhập bị mất hoặc giảm sút | Số tiền (định dạng dấu chấm) | `120.000.000` |
| 10 | Điều 1 | `##ThietHaiTinhThan##` | Quá trình giải quyết > Bảng chi tiết thiệt hại | Thiệt hại về tinh thần | Số tiền (định dạng dấu chấm) | `150.000.000` |
| 11 | Điều 1 | `##ThietHaiKhac##` | Quá trình giải quyết > Bảng chi tiết thiệt hại | Các chi phí thiệt hại khác | Số tiền (chi phí đi lại, thuê luật sư...) | `30.000.000` |
| 12 | Điều 1 | `##SoTienDaTamUng##` | Quá trình giải quyết > Bảng thanh toán kinh phí | Số tiền đã tạm ứng trước đó | Số tiền tạm ứng (nếu có, không có thì ghi `0`) | `50.000.000` |
| 13 | Điều 1 | `##SoTienConLaiPhaiChiTra##` | Quá trình giải quyết > Bảng thanh toán kinh phí | Số tiền còn lại thực tế phải chi trả | Số tiền còn lại phải thanh toán | `300.000.000` |
| 14 | Điều 1 | `##SoTienConLaiBangChu##` | Quá trình giải quyết > Bảng thanh toán kinh phí | Số tiền còn lại viết bằng chữ | Viết bằng chữ số tiền còn lại | `Ba trăm triệu đồng` |
| 15 | Điều 2 | `##PhuongThucChiTraBoiThuong##` | Quá trình giải quyết > Kết quả thương lượng | Phương thức chi trả tiền bồi thường | Control UI: Radio.<br>Gồm:<br>+ chi trả qua chuyển khoản ngân hàng<br>+ chi trả trực tiếp bằng tiền mặt | Phương thức thanh toán thỏa thuận | `chi trả qua chuyển khoản ngân hàng` |
| 16 | Điều 2 | `##ThongTinTaiKhoanChiTra##` | Quá trình giải quyết > Kết quả thương lượng | Ghép các trường: Số tài khoản, Chủ tài khoản, Ngân hàng | Chi tiết tài khoản nhận chi trả (của cá nhân hoặc tổ chức) hoặc địa điểm nhận tiền mặt | `Số tài khoản: 001100222333, Chủ tài khoản: Nguyễn Văn Nam (hoặc Công ty...), tại Ngân hàng Ngoại thương Việt Nam` |
| 17 | Điều 3 | `##QuyenLoiIchHopPhapKhac##` | Quá trình giải quyết > Kết quả thương lượng | Quyền, lợi ích hợp pháp khác được khôi phục | Căn cứ Điều 29 Luật TNBTCNN (khôi phục chức vụ, trả lại giấy tờ, bằng cấp...). Nếu không có ghi: `Không` | `Khôi phục quyền sử dụng đất và cấp lại Giấy chứng nhận quyền sử dụng đất đối với thửa đất số 45` |
| 18 | Điều 5 | `##ThoiDiemHieuLucQuyetDinh##` | Quá trình giải quyết > Form Quyết định giải quyết bồi thường | Thời điểm quyết định có hiệu lực | Theo thỏa thuận tại biên bản thương lượng hoặc ghi `sau 60 ngày kể từ ngày người yêu cầu bồi thường (cá nhân hoặc tổ chức) nhận được Quyết định này` | `sau 15 ngày kể từ ngày ký` |
| 19 | Nơi nhận | `##TenNguoiThiHanhCongVuGayThietHai##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên người thi hành công vụ gây thiệt hại | Họ tên cán bộ gây thiệt hại gửi để biết và thực hiện trách nhiệm hoàn trả | `Ông Vũ Đình Trọng (cựu Điều tra viên)` |

---

### 9. MẪU SỐ 20/BTNN: QUYẾT ĐỊNH HỦY QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_20_BTNN_Template.docx`
- **Mục đích**: Hủy quyết định giải quyết bồi thường đã ban hành khi có một trong các căn cứ theo Điều 48 Luật TNBTCNN (để đình chỉ giải quyết hoặc giải quyết lại vụ việc).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Hủy quyết định giải quyết bồi thường"*.
- **Quy tắc đặt tên file tải về**: `Mau_20_BTNN_Quyet_dinh_huy_QDGQBT_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 20/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `20/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 10 tháng 04 năm 2026` |
| 3 | Căn cứ | `##CanCuKhoanDieu48##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Khoản, điều căn cứ hủy quyết định | Control UI: Combobox.<br>Gồm:<br>+ khoản 1, 2 và 5<br>+ khoản 3, 3a và 5 | - Hủy để đình chỉ: ghi `khoản 1, 2 và 5`.<br>- Hủy để giải quyết lại: ghi `khoản 3, 3a và 5` | `khoản 3, 3a và 5` |
| 4 | Căn cứ | `##SoKyHieuVanBanXacDinh##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Văn bản xác định trường hợp hủy quyết định | Số hiệu văn bản kết luận thanh tra / bản án hủy | `Kết luận thanh tra số 45/KL-TTr ngày 10/02/2026 của Thanh tra Bộ Tư pháp` |
| 5 | Điều 1 | `##SoQDGiaiQuyetBiHuy##` | Thông tin hồ sơ yêu cầu bồi thường | Số quyết định giải quyết bồi thường bị hủy | Lấy số hiệu Quyết định đã ban hành trước đó | `18/QĐ-STP` |
| 6 | Điều 1 | `##NgayBanHanhQDBiHuy##` | Thông tin hồ sơ yêu cầu bồi thường | Ngày ban hành quyết định bị hủy | Định dạng `dd/mm/yyyy` | `15/01/2026` |
| 7 | Điều 1 | `##CoQuanBanHanhQDBiHuy##` | Thông tin hồ sơ yêu cầu bồi thường | Cơ quan ban hành quyết định bị hủy | Tên cơ quan ban hành | `Giám đốc Sở Tư pháp thành phố Hà Nội` |
| 8 | Điều 1 | `##LyDoHuyQuyetDinh##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Lý do hủy quyết định | Ghi lý do tương ứng từng điểm tại khoản 1 hoặc khoản 3 Điều 48 | `có hành vi cố ý làm sai lệch hồ sơ giải quyết bồi thường dẫn đến xác định sai mức thiệt hại` |
| 9 | Điều 2 | `##HauQuaPhapLyVaBienPhapXuLy##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Hậu quả pháp lý và biện pháp xử lý | Control UI: Radio.<br>Gồm:<br>+ Đình chỉ việc giải quyết bồi thường<br>+ Giải quyết lại | Tùy chọn: `Đình chỉ việc giải quyết bồi thường` HOẶC `Giải quyết lại` | `Giải quyết lại` |
| 10 | Điều 2 | `##NoiDungGiaiQuyetLaiChiTiet##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Nội dung giải quyết lại cụ thể | Nếu giải quyết lại: ghi `Việc giải quyết lại từ việc: [nêu rõ công việc/thủ tục bắt đầu lại]`. Nếu đình chỉ: để trống | `Việc giải quyết lại từ việc xác minh thiệt hại đối với các khoản thiệt hại về tài sản.` |
| 11 | Điều 3 | `##NgayHieuLucQDHuy##` | Quá trình giải quyết > Form Hủy quyết định giải quyết bồi thường | Ngày có hiệu lực của quyết định hủy | Định dạng `ngày dd/mm/yyyy` | `ngày 15/04/2026` |

---

### 10. MẪU SỐ 21/BTNN: QUYẾT ĐỊNH SỬA CHỮA, BỔ SUNG QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_21_BTNN_Template.docx`
- **Mục đích**: Sửa đổi, bổ sung lỗi kỹ thuật, sai sót số liệu, tài khoản ngân hàng hoặc nội dung câu chữ trong Quyết định GQBT mà không làm thay đổi bản chất vụ việc.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Sửa chữa, bổ sung quyết định"*.
- **Quy tắc đặt tên file tải về**: `Mau_21_BTNN_Quyet_dinh_sua_chua_bo_sung_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 21/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Sửa chữa, bổ sung quyết định | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `21/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Sửa chữa, bổ sung quyết định | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 12 tháng 04 năm 2026` |
| 3 | Căn cứ & Điều 1 | `##SoQDDuocSuaDoiBoSung##` | Thông tin hồ sơ yêu cầu bồi thường | Số quyết định giải quyết bồi thường được sửa đổi | Số hiệu quyết định gốc | `18/QĐ-STP` |
| 4 | Căn cứ & Điều 1 | `##NgayBanHanhQDCu##` | Thông tin hồ sơ yêu cầu bồi thường | Ngày ban hành quyết định gốc | Định dạng `dd/mm/yyyy` | `20/01/2026` |
| 5 | Căn cứ & Điều 1 | `##CoQuanBanHanhQDCu##` | Thông tin hồ sơ yêu cầu bồi thường | Cơ quan ban hành quyết định gốc | Tên cơ quan ban hành | `Giám đốc Sở Tư pháp thành phố Hà Nội` |
| 6 | Căn cứ | `##LyDoSuaChuaBoSung##` | Quá trình giải quyết > Form Sửa chữa, bổ sung quyết định | Lý do cần sửa chữa, bổ sung | Nêu rõ sai sót kỹ thuật / nhầm lẫn | `nhầm lẫn về thông tin số tài khoản ngân hàng của người yêu cầu bồi thường (cá nhân hoặc tổ chức) tại Điều 2` |
| 7 | Điều 1 | `##NoiDungSuaChuaBoSung##` | Quá trình giải quyết > Form Sửa chữa, bổ sung quyết định | Nội dung chi tiết sửa đổi, bổ sung | Trình bày rõ: Sửa đổi đoạn/khoản nào thành nội dung nào | `Sửa đổi đoạn 2 Điều 2 như sau: "Phương thức chi trả qua chuyển khoản vào số tài khoản: 19039999999 mang tên Nguyễn Văn Nam mở tại Ngân hàng Techcombank Chi nhánh Ba Đình".` |

---

### 11. MẪU SỐ 22/BTNN: QUYẾT ĐỊNH HOÃN GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_22_BTNN_Template.docx`
- **Mục đích**: Hoãn giải quyết bồi thường khi phát sinh các sự kiện theo quy định tại khoản 1 Điều 49 Luật TNBTCNN (người yêu cầu ốm nặng, sự kiện bất khả kháng hoặc trở ngại khách quan).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Hoãn giải quyết bồi thường"*.
- **Quy tắc đặt tên file tải về**: `Mau_22_BTNN_Quyet_dinh_hoan_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 22/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Hoãn giải quyết bồi thường | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `22/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Hoãn giải quyết bồi thường | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 10 tháng 03 năm 2026` |
| 3 | Căn cứ | `##NgayXacDinhLyDoHoan##` | Quá trình giải quyết > Form Hoãn giải quyết bồi thường | Ngày xác định tài liệu, căn cứ hoãn | Định dạng `dd/mm/yyyy` | `10/03/2026` |
| 4 | Điều 1 | `##TenNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Đỗ Quốc Hưng` hoặc `Hợp tác xã Vận tải Thăng Long` |
| 5 | Điều 1 | `##DiaChiNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Số 12 phố Thợ Nhuộm, Quận Hoàn Kiếm, TP. Hà Nội` |
| 6 | Điều 1 | `##LyDoHoanGiaiQuyet##` | Quá trình giải quyết > Form Hoãn giải quyết bồi thường | Lý do hoãn giải quyết | Control UI: Combobox.<br>Gồm:<br>+ người yêu cầu bồi thường bị ốm nặng có xác nhận của cơ sở y tế<br>+ người đại diện theo pháp luật của tổ chức yêu cầu bồi thường gặp sự cố hoặc thay đổi cần kiện toàn<br>+ vì lý do bất khả kháng do thiên tai, bão lũ<br>+ trở ngại khách quan khác | Nêu cụ thể sự kiện dẫn đến phải hoãn | `Người yêu cầu bồi thường bị ốm nặng phải điều trị nội trú tại bệnh viện theo Giấy xác nhận số 88/GCN của Bệnh viện Bạch Mai` |
| 7 | Điều 1 | `##ThoiGianHoanDuKien##` | Quá trình giải quyết > Form Hoãn giải quyết bồi thường | Thời gian hoãn dự kiến | Ghi khoảng thời gian hoặc điều kiện kết thúc | `30 ngày kể từ ngày ký Quyết định này` HOẶC `cho đến khi người yêu cầu bồi thường hồi phục sức khỏe` |
| 8 | Nơi nhận | `##HoTenNguoiGiaiQuyet##` | Thông tin hồ sơ yêu cầu bồi thường | Cán bộ trực tiếp giải quyết bồi thường | Gửi để nắm thời hạn giải quyết | `Đ/c Lê Thị Dung (Chuyên viên)` |

---

### 12. MẪU SỐ 23/BTNN: QUYẾT ĐỊNH TIẾP TỤC GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_23_BTNN_Template.docx`
- **Mục đích**: Ban hành quyết định tiếp tục giải quyết bồi thường khi lý do hoãn quy định tại Điều 49 không còn, thời hạn giải quyết tiếp tục được tính.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Tiếp tục giải quyết bồi thường"*.
- **Quy tắc đặt tên file tải về**: `Mau_23_BTNN_Quyet_dinh_tiep_tuc_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 23/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Tiếp tục giải quyết bồi thường | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `23/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Tiếp tục giải quyết bồi thường | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 10 tháng 04 năm 2026` |
| 3 | Căn cứ | `##SoQDHoanGiaiQuyet##` | Quá trình giải quyết hồ sơ | Số quyết định hoãn ban hành trước đó | Số hiệu quyết định hoãn | `15/QĐ-STP` |
| 4 | Căn cứ | `##NgayBanHanhQDHoan##` | Quá trình giải quyết hồ sơ | Ngày ban hành quyết định hoãn | Định dạng `dd/mm/yyyy` | `12/03/2026` |
| 5 | Căn cứ | `##CoQuanBanHanhQDHoan##` | Quá trình giải quyết hồ sơ | Cơ quan ban hành quyết định hoãn | Tên cơ quan đã ký QĐ hoãn | `Giám đốc Sở Tư pháp thành phố Hà Nội` |
| 6 | Điều 1 | `##LyDoTiepTucGiaiQuyet##` | Quá trình giải quyết > Form Tiếp tục giải quyết bồi thường | Lý do tiếp tục giải quyết bồi thường | Nêu rõ căn cứ lý do hoãn đã hết | `lý do hoãn giải quyết bồi thường không còn (Người yêu cầu bồi thường đã xuất viện và có đơn đề nghị tiếp tục giải quyết)` |

---

### 13. MẪU SỐ 24/BTNN: QUYẾT ĐỊNH TẠM ĐÌNH CHỈ GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_24_BTNN_Template.docx`
- **Mục đích**: Tạm dừng việc giải quyết yêu cầu bồi thường khi phát sinh các trường hợp theo quy định tại Điều 50 Luật TNBTCNN (chờ kết quả xác minh cơ quan khác, xem xét lại văn bản làm căn cứ...).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Tạm đình chỉ giải quyết"*.
- **Quy tắc đặt tên file tải về**: `Mau_24_BTNN_Quyet_dinh_tam_dinh_chi_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 24/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Tạm đình chỉ giải quyết | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `24/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Tạm đình chỉ giải quyết | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 15 tháng 03 năm 2026` |
| 3 | Căn cứ | `##NgayXacDinhLyDoTamDinhChi##` | Quá trình giải quyết > Form Tạm đình chỉ giải quyết | Ngày xác định tài liệu tạm đình chỉ | Định dạng `dd/mm/yyyy` | `15/03/2026` |
| 4 | Điều 1 | `##TenNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Phan Thành Đạt` hoặc `Công ty TNHH Đầu tư Thương mại Toàn Cầu` |
| 5 | Điều 1 | `##DiaChiNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Thị trấn Sóc Sơn, Huyện Sóc Sơn, TP. Hà Nội` |
| 6 | Điều 1 | `##LyDoTamDinhChi##` | Quá trình giải quyết > Form Tạm đình chỉ giải quyết | Lý do tạm đình chỉ | Control UI: Combobox.<br>Gồm:<br>+ cần chờ kết quả giám định thiệt hại<br>+ cần chờ kết quả xử lý của cơ quan có thẩm quyền khác<br>+ văn bản làm căn cứ đang được xem xét lại theo trình tự giám đốc thẩm | Ghi rõ lý do tạm đình chỉ tương ứng Điều 50 Luật TNBTCNN | `Văn bản làm căn cứ yêu cầu bồi thường đang được Tòa án nhân dân tối cao xem xét lại theo thủ tục giám đốc thẩm` |

---

### 14. MẪU SỐ 25/BTNN: QUYẾT ĐỊNH ĐÌNH CHỈ GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_25_BTNN_Template.docx`
- **Mục đích**: Chấm dứt việc giải quyết bồi thường theo Điều 51 Luật TNBTCNN (người yêu cầu rút đơn, người yêu cầu chết không có người thừa kế, tổ chức chấm dứt tồn tại không có tổ chức kế thừa, văn bản căn cứ bị hủy...). Quyết định đồng thời thu hồi khoản kinh phí đã tạm ứng (nếu có).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Thao tác "Đình chỉ giải quyết"*.
- **Quy tắc đặt tên file tải về**: `Mau_25_BTNN_Quyet_dinh_dinh_chi_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 25/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Form Đình chỉ giải quyết | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `25/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Form Đình chỉ giải quyết | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 22 tháng 03 năm 2026` |
| 3 | Điều 1 | `##LyDoDinhChi##` | Quá trình giải quyết > Form Đình chỉ giải quyết | Căn cứ, lý do đình chỉ giải quyết | Control UI: Combobox.<br>Gồm:<br>+ người yêu cầu bồi thường rút yêu cầu bồi thường<br>+ người yêu cầu bồi thường chết mà không có người thừa kế (đối với cá nhân) hoặc tổ chức yêu cầu bồi thường chấm dứt tồn tại mà không có tổ chức kế thừa quyền, nghĩa vụ (đối với tổ chức)<br>+ văn bản làm căn cứ không còn là văn bản làm căn cứ bồi thường | Căn cứ đình chỉ tương ứng quy định khoản 1 Điều 51 | `Người yêu cầu bồi thường có đơn tự nguyện rút toàn bộ yêu cầu bồi thường ngày 20/03/2026` |
| 4 | Điều 3 | `##SoTienTamUngPhaiHoanTra##` | Quá trình giải quyết > Form Đình chỉ giải quyết | Số tiền tạm ứng phải hoàn trả | Số tiền tạm ứng đã chi (nếu có, không có thì ghi `0 đồng`) | `50.000.000` |
| 5 | Điều 3 | `##SoQDTamUng##` | Quá trình giải quyết hồ sơ | Số quyết định tạm ứng kinh phí trước đó | Số Quyết định tạm ứng (nếu có) | `07/QĐ-STP` |
| 6 | Điều 3 | `##NgayQDTamUng##` | Quá trình giải quyết hồ sơ | Ngày ban hành quyết định tạm ứng | Định dạng `dd/mm/yyyy` | `10/02/2026` |

---

### 15. MẪU SỐ 26/BTNN: THÔNG BÁO VỀ VIỆC TỔ CHỨC THỰC HIỆN PHỤC HỒI DANH DỰ
- **Tên tệp template**: `Mau_26_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người bị thiệt hại biết kế hoạch tổ chức trực tiếp xin lỗi, cải chính công khai hoặc đăng báo cải chính theo Điều 57 Luật TNBTCNN (sửa đổi 2026).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Phục hồi danh dự > Thao tác "Lập kế hoạch phục hồi danh dự"*.
- **Quy tắc đặt tên file tải về**: `Mau_26_BTNN_Thong_bao_phuc_hoi_danh_du_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 26/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Phục hồi danh dự > Form Lập kế hoạch | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `26/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Phục hồi danh dự > Form Lập kế hoạch | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 15 tháng 04 năm 2026` |
| 3 | Kính gửi | `##TenNguoiBiThietHai##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên người bị thiệt hại | Họ tên người được phục hồi danh dự | `Ông Nguyễn Khắc Hoài` |
| 4 | Dưới Kính gửi | `##DiaChiNguoiBiThietHai##` | Thông tin hồ sơ yêu cầu bồi thường | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người bị thiệt hại: Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Xã Chàng Sơn, Huyện Thạch Thất, TP. Hà Nội` |
| 5 | Thân văn bản | `##VanBanCanCuPhucHoiDanhDu##` | Thông tin hồ sơ yêu cầu bồi thường | Văn bản làm căn cứ phục hồi danh dự | Tên bản án, quyết định đình chỉ làm căn cứ | `Quyết định đình chỉ điều tra vụ án đối với bị can số 02/QĐ-ĐCSHS ngày 12/01/2026 của Cơ quan CSĐT Công an TP. Hà Nội` |
| 6 | Thân văn bản | `##KeHoachToChucPhucHoiDanhDu##` | Quá trình giải quyết > Phục hồi danh dự > Form Lập kế hoạch | Chi tiết kế hoạch tổ chức xin lỗi, cải chính | - Hoạt động tố tụng hình sự: ghi rõ thời gian, địa điểm tổ chức trực tiếp và tờ báo đăng.<br>- Hoạt động quản lý hành chính: ghi rõ tờ báo và Cổng thông tin điện tử đăng tải | `Về việc tổ chức trực tiếp xin lỗi và cải chính công khai:<br>- Dự kiến thời gian: 08 giờ 30 ngày 25/04/2026.<br>- Dự kiến địa điểm: Hội trường UBND xã Chàng Sơn, Huyện Thạch Thất, TP. Hà Nội.<br>Về việc đăng báo xin lỗi và cải chính công khai:<br>- Dự kiến tờ báo đăng: Báo Hà Nội mới (03 số liên tiếp).<br>- Đăng tải trên Cổng thông tin điện tử Sở Tư pháp TP. Hà Nội.` |

---

### 16. MẪU SỐ 32/BTNN: THÔNG BÁO VỀ VIỆC CHI TRẢ TIỀN BỒI THƯỜNG
- **Tên tệp template**: `Mau_32_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người được bồi thường biết về thời gian, địa điểm, số tiền và các giấy tờ cần mang theo để nhận tiền chi trả bồi thường theo Điều 62 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quá trình giải quyết > Chi trả tiền bồi thường > Thao tác "Lập Thông báo chi trả"*.
- **Quy tắc đặt tên file tải về**: `Mau_32_BTNN_Thong_bao_chi_tra_tien_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 32/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quá trình giải quyết > Chi trả tiền > Form Thông báo chi trả | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `32/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quá trình giải quyết > Chi trả tiền > Form Thông báo chi trả | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 10 tháng 04 năm 2026` |
| 3 | Kính gửi | `##TenNguoiNhanTienBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên / Tên tổ chức nhận tiền bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên` người thụ hưởng (hoặc người đại diện thừa kế/ủy quyền).<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức` được bồi thường. | `Bà Trần Thị Thơm` hoặc `Công ty CP Thương mại & Xây dựng Thăng Long` |
| 4 | Dưới Kính gửi | `##DiaChiNguoiNhanTien##` | Thông tin hồ sơ yêu cầu bồi thường | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người nhận tiền bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Số 56 phố Hai Bà Trưng, Quận Hoàn Kiếm, TP. Hà Nội` |
| 5 | Căn cứ | `##SoQDGiaiQuyetBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Số quyết định giải quyết bồi thường hoặc bản án | Số hiệu quyết định có hiệu lực | `18/QĐ-STP` |
| 6 | Căn cứ | `##NgayQDGiaiQuyet##` | Thông tin hồ sơ yêu cầu bồi thường | Ngày ban hành quyết định giải quyết bồi thường | Định dạng `dd/mm/yyyy` | `20/03/2026` |
| 7 | Căn cứ | `##CoQuanBanHanhQDGQBT##` | Thông tin hồ sơ yêu cầu bồi thường | Cơ quan ban hành quyết định giải quyết | Tên cơ quan ban hành | `Sở Tư pháp thành phố Hà Nội` |
| 8 | Thân văn bản | `##TongSoTienChiTra##` | Quá trình giải quyết > Chi trả tiền > Form Thông báo chi trả | Tổng số tiền thực tế chi trả | Số tiền thực trả (sau khi trừ tạm ứng nếu có) | `300.000.000` |
| 9 | Thân văn bản | `##TongSoTienChiTraBangChu##` | Quá trình giải quyết > Chi trả tiền > Form Thông báo chi trả | Tổng số tiền chi trả bằng chữ | Viết bằng chữ số tiền chi trả | `Ba trăm triệu đồng` |
| 10 | Thân văn bản | `##ThongTinChiTraTien##` | Quá trình giải quyết > Chi trả tiền > Form Thông báo chi trả | Thông tin chi tiết phương thức, thời gian, địa điểm chi trả | Ghi rõ tài khoản chuyển khoản hoặc lịch hẹn nhận tiền mặt tại cơ quan | `Vào hồi 09 giờ 00 ngày 20/04/2026 tại Bộ phận Kế toán - Sở Tư pháp thành phố Hà Nội (Số 221 Trần Phú, Hà Đông, Hà Nội)` |
| 11 | Thân văn bản | `##GiayToMangTheo##` | Quá trình giải quyết > Chi trả tiền > Form Thông báo chi trả | Danh mục giấy tờ cần xuất trình khi nhận tiền | Căn cứ loại đối tượng nhận tiền:<br>- Khi là `Cá nhân`: CCCD/Hộ chiếu (bản chính); Thông báo chi trả; Văn bản ủy quyền hợp pháp (nếu nhận thay).<br>- Khi là `Tổ chức`: Giấy giới thiệu / Văn bản ủy quyền của người đại diện hợp pháp kèm CCCD của người đến nhận; Thông báo chi trả; Bản sao Giấy chứng nhận ĐKKD / Quyết định thành lập. | `Căn cước công dân (bản chính); Thông báo này; Văn bản ủy quyền nhận tiền bồi thường hợp pháp (trường hợp ủy quyền)` hoặc `Giấy giới thiệu/Ủy quyền của người đại diện pháp luật tổ chức; Thông báo này; Bản sao ĐKKD` |

---

### 17. MẪU SỐ 33/BTNN: QUYẾT ĐỊNH THÀNH LẬP HỘI ĐỒNG XEM XÉT TRÁCH NHIỆM HOÀN TRẢ
- **Tên tệp template**: `Mau_33_BTNN_Template.docx`
- **Mục đích**: Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả đối với người thi hành công vụ gây thiệt hại sau khi Nhà nước đã hoàn thành chi trả tiền bồi thường theo Điều 66 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Trách nhiệm hoàn trả > Thao tác "Thành lập Hội đồng hoàn trả"*.
- **Quy tắc đặt tên file tải về**: `Mau_33_BTNN_Quyet_dinh_thanh_lap_hoi_dong_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 33/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Trách nhiệm hoàn trả > Form Thành lập Hội đồng hoàn trả | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `33/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Trách nhiệm hoàn trả > Form Thành lập Hội đồng hoàn trả | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 25 tháng 04 năm 2026` |
| 3 | Căn cứ | `##SoQDGiaiQuyetDaChiTra##` | Thông tin hồ sơ yêu cầu bồi thường | Số quyết định giải quyết bồi thường đã chi trả | Số hiệu quyết định chi trả bồi thường | `18/QĐ-STP` |
| 4 | Căn cứ | `##NgayQDGiaiQuyetDaChiTra##` | Thông tin hồ sơ yêu cầu bồi thường | Ngày ban hành quyết định đã chi trả | Định dạng `dd/mm/yyyy` | `20/03/2026` |
| 5 | Căn cứ & Điều 1 | `##TenNguoiYeuCauBoiThuong##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên / Tên tổ chức yêu cầu đã được bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên` người được bồi thường.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức` được bồi thường. | `Nguyễn Văn Nam` hoặc `Công ty CP Xây dựng Đông Á` |
| 6 | Điều 1 | `##DanhSachThanhVienHoiDong##` | Trách nhiệm hoàn trả > Form Thành lập Hội đồng hoàn trả | Danh sách thành viên Hội đồng hoàn trả | Ghi rõ Họ tên, Chức vụ, Đơn vị và vai trò:<br>1. Chủ tịch Hội đồng<br>2. Thư ký Hội đồng<br>3. Các Ủy viên | `1. Ông Trần Văn A - Phó Giám đốc Sở - Chủ tịch Hội đồng;<br>2. Bà Lê Thị B - Trưởng phòng Kế hoạch - Tài chính - Ủy viên;<br>3. Ông Phạm Văn C - Phó Trưởng phòng Bổ trợ tư pháp - Thư ký Hội đồng.` |
| 7 | Điều 2 | `##TenNguoiThiHanhCongVuHoanTra##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên người thi hành công vụ bị xem xét hoàn trả | Cán bộ phải hoàn trả | `Ông Vũ Đình Trọng` |

---

### 18. MẪU SỐ 34/BTNN: BIÊN BẢN LÀM VIỆC CỦA HỘI ĐỒNG XEM XÉT TRÁCH NHIỆM HOÀN TRẢ
- **Tên tệp template**: `Mau_34_BTNN_Template.docx`
- **Mục đích**: Ghi lại toàn bộ diễn biến cuộc họp, ý kiến của các thành viên Hội đồng, lời trình bày của người thi hành công vụ và kết luận kiến nghị của Hội đồng về trách nhiệm hoàn trả.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Thao tác "Lập Biên bản cuộc họp"*.
- **Quy tắc đặt tên file tải về**: `Mau_34_BTNN_Bien_ban_hop_hoi_dong_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 34/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Mở đầu | `##ThoiGianBatDauHop##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Thời gian bắt đầu cuộc họp | Định dạng `... giờ ... ngày dd/mm/yyyy` | `08 giờ 30 phút ngày 10/05/2026` |
| 2 | Mở đầu | `##DiaDiemHop##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Địa điểm tổ chức cuộc họp | Phòng họp, trụ sở cơ quan | `Phòng họp số 2, Trụ sở Sở Tư pháp TP. Hà Nội` |
| 3 | Mở đầu | `##SoQDThanhLapHoiDong##` | Trách nhiệm hoàn trả | Số quyết định thành lập Hội đồng | Số hiệu quyết định thành lập | `33/QĐ-STP` |
| 4 | Mở đầu | `##NgayThanhLapHoiDong##` | Trách nhiệm hoàn trả | Ngày ký quyết định thành lập Hội đồng | Định dạng `dd/mm/yyyy` | `25/04/2026` |
| 5 | Mở đầu | `##CoQuanThanhLapHoiDong##` | Trách nhiệm hoàn trả | Cơ quan ban hành quyết định thành lập Hội đồng | Tên cơ quan thành lập Hội đồng | `Giám đốc Sở Tư pháp thành phố Hà Nội` |
| 6 | Phần I | `##ThanhPhanHoiDongThamDu##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Thành phần tham dự phiên họp | Liệt kê đầy đủ người có mặt, vắng mặt | `- Có mặt: 03/03 thành viên (Ông Trần Văn A - Chủ tịch; Bà Lê Thị B - Ủy viên; Ông Phạm Văn C - Thư ký).<br>- Người thi hành công vụ có mặt: Ông Vũ Đình Trọng.` |
| 7 | Phần II.1 | `##YKienNguoiThiHanhCongVu##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Ý kiến trình bày của cán bộ gây thiệt hại | Trình bày nguyên nhân, mức độ lỗi, hoàn cảnh kinh tế gia đình | `Thừa nhận thiếu sót trong quá trình kiểm tra hồ sơ, cam kết chấp hành việc hoàn trả và đề nghị xem xét hoàn cảnh kinh tế gia đình khó khăn để xin trừ dần qua lương hàng tháng.` |
| 8 | Phần II.2 | `##YKienCacThanhVienHoiDong##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Ý kiến thảo luận của các thành viên Hội đồng | Đánh giá mức độ lỗi vô ý/cố ý | `Các thành viên thống nhất đánh giá hành vi của cán bộ là lỗi vô ý do năng lực nghiệp vụ chưa theo kịp khối lượng công việc, không có động cơ vụ lợi.` |
| 9 | Phần III | `##KetLuanMucDoLoi##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Kết luận về mức độ lỗi của cán bộ | Control UI: Combobox.<br>Gồm:<br>+ Vô ý<br>+ Cố ý | Kết luận lỗi chính thức | `Lỗi vô ý` |
| 10 | Phần III | `##KienNghiSoTienHoanTra##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Số tiền Hội đồng kiến nghị hoàn trả | Định dạng phân cách hàng nghìn bằng dấu chấm | `50.000.000` |
| 11 | Phần III | `##KienNghiSoTienHoanTraBangChu##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Số tiền kiến nghị hoàn trả bằng chữ | Chuyển đổi tự động | Viết bằng chữ số tiền hoàn trả | `Năm mươi triệu đồng` |
| 12 | Phần III | `##KienNghiPhuongThucHoanTra##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Phương thức hoàn trả kiến nghị | Control UI: Radio.<br>Gồm:<br>+ trừ dần vào lương hàng tháng (tối đa 30% lương)<br>+ nộp một lần vào ngân sách | Ghi rõ hình thức trừ lương hoặc nộp tiền | `Trừ dần vào lương hàng tháng, mức trừ 20% tổng thu nhập hàng tháng kể từ tháng 06/2026 cho đến khi hoàn thành` |
| 13 | Kết thúc | `##ThoiGianKetThucHop##` | Trách nhiệm hoàn trả > Cuộc họp Hội đồng > Form Lập biên bản | Thời gian kết thúc cuộc họp | Định dạng `... giờ ... cùng ngày` | `11 giờ 30 phút cùng ngày` |
| 14 | Chữ ký | `##ChuTichHoiDong##` | Trách nhiệm hoàn trả | Họ và tên Chủ tịch Hội đồng | Họ tên Chủ tịch Hội đồng ký biên bản | `Trần Văn A` |

---

### 19. MẪU SỐ 35/BTNN: VĂN BẢN KIẾN NGHỊ VIỆC BAN HÀNH QUYẾT ĐỊNH HOÀN TRẢ
- **Tên tệp template**: `Mau_35_BTNN_Template.docx`
- **Mục đích**: Hội đồng xem xét trách nhiệm hoàn trả gửi văn bản kiến nghị lên Thủ trưởng cơ quan có thẩm quyền để ban hành Quyết định hoàn trả chính thức theo Điều 66 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Trách nhiệm hoàn trả > Báo cáo kiến nghị > Thao tác "Lập Văn bản kiến nghị"*.
- **Quy tắc đặt tên file tải về**: `Mau_35_BTNN_Van_ban_kien_nghi_hoan_tra_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 35/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Trách nhiệm hoàn trả > Form Lập văn bản kiến nghị | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `01/KN-HĐHT` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Trách nhiệm hoàn trả > Form Lập văn bản kiến nghị | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 12 tháng 05 năm 2026` |
| 3 | Kính gửi | `##ThuTruongCoQuanCoThamQuyen##` | Trách nhiệm hoàn trả | Chức vụ người đứng đầu cơ quan có thẩm quyền | Chức vụ người đứng đầu cơ quan nhận kiến nghị | `Giám đốc Sở Tư pháp thành phố Hà Nội` |
| 4 | Căn cứ | `##NgayHopHoiDong##` | Trách nhiệm hoàn trả > Biên bản họp Hội đồng | Ngày tổ chức phiên họp Hội đồng | Định dạng `dd/mm/yyyy` | `10/05/2026` |
| 5 | Mục 1 | `##TomTatVuViecBoiThuong##` | Trách nhiệm hoàn trả > Form Lập văn bản kiến nghị | Tóm tắt hồ sơ vụ việc và kết quả giải quyết | Tóm tắt ngắn gọn hồ sơ vụ việc đã chi trả (nêu rõ cá nhân hoặc tổ chức yêu cầu bồi thường) | `Hồ sơ yêu cầu bồi thường của Ông Nguyễn Văn Nam (hoặc Công ty TNHH Ánh Dương) do hành vi giải quyết chậm trễ hồ sơ... Tổng số tiền bồi thường đã chi trả là 350.000.000 đồng theo Quyết định số 18/QĐ-STP ngày 20/03/2026.` |
| 6 | Mục 2 | `##DanhGiaMucDoLoi##` | Trách nhiệm hoàn trả > Form Lập văn bản kiến nghị | Đánh giá mức độ lỗi và căn cứ pháp lý | Nhận định về lỗi vô ý/cố ý | `Hội đồng xác định hành vi của Ông Vũ Đình Trọng là lỗi vô ý, thuộc trường hợp hoàn trả kinh phí theo quy định tại khoản 2 Điều 65 Luật TNBTCNN.` |
| 7 | Mục 3 | `##KienNghiSoTienHoanTra##` | Trách nhiệm hoàn trả > Form Lập văn bản kiến nghị | Kiến nghị mức tiền hoàn trả | Số tiền hoàn trả (định dạng dấu chấm) | `50.000.000` |
| 8 | Mục 3 | `##KienNghiSoTienHoanTraBangChu##` | Trách nhiệm hoàn trả > Form Lập văn bản kiến nghị | Kiến nghị mức tiền hoàn trả bằng chữ | Chuyển đổi tự động | Viết bằng chữ số tiền | `Năm mươi triệu đồng` |
| 9 | Mục 4 | `##KienNghiPhuongThucHoanTra##` | Trách nhiệm hoàn trả > Form Lập văn bản kiến nghị | Kiến nghị phương thức hoàn trả | Nộp một lần hoặc trừ dần lương | `Khấu trừ 20% tiền lương hàng tháng của Ông Vũ Đình Trọng cho đến khi nộp đủ số tiền hoàn trả vào Ngân sách nhà nước.` |

---

### 20. MẪU SỐ 36/BTNN: QUYẾT ĐỊNH HOÀN TRẢ
- **Tên tệp template**: `Mau_36_BTNN_Template.docx`
- **Mục đích**: Quyết định của Thủ trưởng cơ quan có thẩm quyền buộc người thi hành công vụ gây thiệt hại phải hoàn trả số tiền bồi thường vào ngân sách nhà nước theo Điều 65, 66 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Trách nhiệm hoàn trả > Quyết định hoàn trả > Thao tác "Ban hành Quyết định hoàn trả"*.
- **Quy tắc đặt tên file tải về**: `Mau_36_BTNN_Quyet_dinh_hoan_tra_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 36/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Trách nhiệm hoàn trả > Form Ban hành Quyết định hoàn trả | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `36/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Trách nhiệm hoàn trả > Form Ban hành Quyết định hoàn trả | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 15 tháng 05 năm 2026` |
| 3 | Căn cứ | `##SoVBKienNghi##` | Trách nhiệm hoàn trả | Số văn bản kiến nghị của Hội đồng hoàn trả | Số hiệu văn bản kiến nghị Mẫu 35 | `01/KN-HĐHT` |
| 4 | Căn cứ | `##NgayVBKienNghi##` | Trách nhiệm hoàn trả | Ngày ban hành văn bản kiến nghị | Định dạng `dd/mm/yyyy` | `12/05/2026` |
| 5 | Điều 1 | `##TenNguoiThiHanhCongVu##` | Trách nhiệm hoàn trả | Họ và tên cán bộ phải hoàn trả | Họ tên người thi hành công vụ | `Ông Vũ Đình Trọng` |
| 6 | Điều 1 | `##ChucVuNguoiThiHanhCongVu##` | Trách nhiệm hoàn trả | Chức vụ cán bộ tại thời điểm gây thiệt hại | Chức vụ công tác | `Chuyên viên chính` |
| 7 | Điều 1 | `##DonViCongTacNguoiTHCV##` | Trách nhiệm hoàn trả | Đơn vị phòng ban công tác của cán bộ | Đơn vị công tác | `Phòng Bổ trợ tư pháp - Sở Tư pháp TP. Hà Nội` |
| 8 | Điều 1 | `##TongSoTienPhaiHoanTra##` | Trách nhiệm hoàn trả > Form Ban hành Quyết định hoàn trả | Tổng số tiền phải hoàn trả | Định dạng phân cách hàng nghìn bằng dấu chấm | `50.000.000` |
| 9 | Điều 1 | `##TongSoTienPhaiHoanTraBangChu##` | Trách nhiệm hoàn trả > Form Ban hành Quyết định hoàn trả | Tổng số tiền phải hoàn trả bằng chữ | Chuyển đổi tự động | Viết bằng chữ | `Năm mươi triệu đồng` |
| 10 | Điều 1 | `##MucDoLoi##` | Trách nhiệm hoàn trả > Form Ban hành Quyết định hoàn trả | Mức độ lỗi chính thức | Control UI: Combobox.<br>Gồm:<br>+ Lỗi vô ý<br>+ Lỗi cố ý | Kết luận lỗi chính thức | `Lỗi vô ý` |
| 11 | Điều 1 | `##PhuongThucHoanTra##` | Trách nhiệm hoàn trả > Form Ban hành Quyết định hoàn trả | Phương thức hoàn trả | Trừ lương hoặc nộp trực tiếp | `Trừ dần vào lương hàng tháng (20% lương thực lĩnh hàng tháng)` |
| 12 | Điều 1 | `##ThoiHanHoanTra##` | Trách nhiệm hoàn trả > Form Ban hành Quyết định hoàn trả | Thời hạn hoàn thành nghĩa vụ hoàn trả | Hạn chót hoàn thành | `Bắt đầu từ kỳ lương tháng 06/2026 cho đến khi hoàn trả đủ số tiền` |
| 13 | Nơi nhận | `##TenCoQuanTaiChinh##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Cơ quan tài chính / Kho bạc nhận tiền hoàn trả | Cơ quan theo dõi nộp ngân sách | `Kho bạc Nhà nước khu vực Hà Đông - Hà Nội` |

---

### 21. MẪU SỐ 37/BTNN: QUYẾT ĐỊNH GIẢM MỨC HOÀN TRẢ
- **Tên tệp template**: `Mau_37_BTNN_Template.docx`
- **Mục đích**: Giảm một phần số tiền phải hoàn trả cho người thi hành công vụ khi đáp ứng các điều kiện theo khoản 4 Điều 65 Luật TNBTCNN (lỗi vô ý và hoàn cảnh kinh tế gia đình đặc biệt khó khăn).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Trách nhiệm hoàn trả > Xem xét giảm hoàn trả > Thao tác "Lập Quyết định giảm mức hoàn trả"*.
- **Quy tắc đặt tên file tải về**: `Mau_37_BTNN_Quyet_dinh_giam_muc_hoan_tra_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 37/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `37/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 15 tháng 06 năm 2026` |
| 3 | Căn cứ | `##SoQDHoanTraGoc##` | Trách nhiệm hoàn trả | Số quyết định hoàn trả đã ban hành | Số hiệu quyết định hoàn trả gốc | `36/QĐ-STP` |
| 4 | Căn cứ | `##NgayQDHoanTraGoc##` | Trách nhiệm hoàn trả | Ngày ký quyết định hoàn trả gốc | Định dạng `dd/mm/yyyy` | `15/05/2026` |
| 5 | Căn cứ | `##CoQuanBanHanhQDHoanTraGoc##` | Trách nhiệm hoàn trả | Cơ quan ban hành quyết định hoàn trả gốc | Tên cơ quan ban hành QĐ gốc | `Giám đốc Sở Tư pháp thành phố Hà Nội` |
| 6 | Căn cứ | `##NgayDeNghiGiam##` | Trách nhiệm hoàn trả > Đơn xin giảm mức hoàn trả | Ngày cán bộ nộp đơn đề nghị giảm | Định dạng `dd/mm/yyyy` | `10/06/2026` |
| 7 | Điều 1 | `##LyDoGiamMucHoanTra##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Căn cứ, lý do giảm mức hoàn trả | Căn cứ hoàn cảnh khó khăn theo khoản 4 Điều 65 | `Người thi hành công vụ có lỗi vô ý và có hoàn cảnh kinh tế gia đình đặc biệt khó khăn (vợ mắc bệnh hiểm nghèo đang điều trị dài ngày theo xác nhận của chính quyền địa phương)` |
| 8 | Điều 1 | `##MucDoLoi##` | Trách nhiệm hoàn trả | Mức độ lỗi của cán bộ | Xác nhận lại mức độ lỗi | `Lỗi vô ý` |
| 9 | Điều 1 | `##SoTienHoanTraBanDau##` | Trách nhiệm hoàn trả | Số tiền phải hoàn trả ban đầu | Định dạng phân cách hàng nghìn bằng dấu chấm | `50.000.000` |
| 10 | Điều 1 | `##SoTienHoanTraBanDauBangChu##` | Trách nhiệm hoàn trả | Số tiền phải hoàn trả ban đầu bằng chữ | Viết bằng chữ | `Năm mươi triệu đồng` |
| 11 | Điều 1 | `##SoTienHoanTraDuocGiam##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Số tiền được giảm | Số tiền được miễn giảm | `20.000.000` |
| 12 | Điều 1 | `##SoTienHoanTraDuocGiamBangChu##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Số tiền được giảm bằng chữ | Chuyển đổi tự động | Viết bằng chữ số tiền giảm | `Hai mươi triệu đồng` |
| 13 | Điều 1 | `##SoTienConPhaiHoanTra##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Số tiền còn lại phải tiếp tục hoàn trả | Số tiền còn lại thực tế phải nộp | `30.000.000` |
| 14 | Điều 1 | `##SoTienConPhaiHoanTraBangChu##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Số tiền còn lại phải hoàn trả bằng chữ | Chuyển đổi tự động | Viết bằng chữ số tiền còn lại | `Ba mươi triệu đồng` |
| 15 | Điều 1 | `##PhuongThucHoanTraConLai##` | Trách nhiệm hoàn trả > Form Lập Quyết định giảm mức hoàn trả | Phương thức hoàn trả đối với số tiền còn lại | Trừ lương hoặc nộp một lần | `Trừ dần vào lương 15% lương hàng tháng cho đến khi nộp đủ 30.000.000 đồng` |

---

### 22. MẪU SỐ 38/BTNN: QUYẾT ĐỊNH MIỄN HOÀN TRẢ
- **Tên tệp template**: `Mau_38_BTNN_Template.docx`
- **Mục đích**: Miễn toàn bộ trách nhiệm hoàn trả cho người thi hành công vụ theo khoản 4a Điều 65 Luật TNBTCNN (sửa đổi 2026) khi người thi hành công vụ chết, mất tích hoặc hoàn cảnh đặc biệt hiểm nghèo.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Trách nhiệm hoàn trả > Xem xét miễn hoàn trả > Thao tác "Lập Quyết định miễn hoàn trả"*.
- **Quy tắc đặt tên file tải về**: `Mau_38_BTNN_Quyet_dinh_mien_hoan_tra_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 38/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Trách nhiệm hoàn trả > Form Lập Quyết định miễn hoàn trả | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `38/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Trách nhiệm hoàn trả > Form Lập Quyết định miễn hoàn trả | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 25 tháng 06 năm 2026` |
| 3 | Căn cứ | `##SoQDHoanTraGoc##` | Trách nhiệm hoàn trả | Số quyết định hoàn trả hoặc quyết định giải quyết bồi thường | Số hiệu quyết định (nếu đã ban hành) | `36/QĐ-STP` |
| 4 | Căn cứ | `##NgayQDHoanTraGoc##` | Trách nhiệm hoàn trả | Ngày ban hành quyết định gốc | Định dạng `dd/mm/yyyy` | `15/05/2026` |
| 5 | Điều 1 | `##TenNguoiThiHanhCongVu##` | Trách nhiệm hoàn trả | Họ và tên cán bộ được miễn hoàn trả | Họ tên cán bộ | `Ông Vũ Đình Trọng` |
| 6 | Điều 1 | `##MucDoLoi##` | Trách nhiệm hoàn trả | Mức độ lỗi của cán bộ | Xác nhận lại mức độ lỗi | `Lỗi vô ý` |
| 7 | Điều 1 | `##SoTienHoanTraBanDau##` | Trách nhiệm hoàn trả | Số tiền phải hoàn trả theo quyết định ban đầu | Định dạng số phân cách hàng nghìn bằng dấu chấm | `50.000.000` |
| 8 | Điều 1 | `##SoTienHoanTraBanDauBangChu##` | Trách nhiệm hoàn trả | Số tiền phải hoàn trả ban đầu bằng chữ | Viết bằng chữ | `Năm mươi triệu đồng` |
| 9 | Điều 1 | `##SoTienHoanTraDuocMien##` | Trách nhiệm hoàn trả > Form Lập Quyết định miễn hoàn trả | Số tiền được miễn toàn bộ | Bằng toàn bộ số tiền phải hoàn trả | `50.000.000` |
| 10 | Điều 1 | `##SoTienHoanTraDuocMienBangChu##` | Trách nhiệm hoàn trả > Form Lập Quyết định miễn hoàn trả | Số tiền được miễn bằng chữ | Chuyển đổi tự động | Viết bằng chữ số tiền được miễn | `Năm mươi triệu đồng` |
| 11 | Điều 1 | `##LyDoMienHoanTra##` | Trách nhiệm hoàn trả > Form Lập Quyết định miễn hoàn trả | Căn cứ, lý do miễn hoàn trả | Control UI: Combobox.<br>Gồm:<br>+ người thi hành công vụ chết<br>+ người thi hành công vụ bị Tòa án tuyên bố mất tích<br>+ người thi hành công vụ mắc bệnh hiểm nghèo không còn khả năng lao động | Nêu rõ căn cứ quy định tại khoản 4a Điều 65 Luật TNBTCNN | `Người thi hành công vụ bị mắc bệnh hiểm nghèo, suy giảm khả năng lao động vĩnh viễn từ 81% trở lên theo Biên bản giám định y khoa số 12/GĐYK ngày 20/06/2026` |

---

### 23. MẪU SỐ 39/BTNN: QUYẾT ĐỊNH ĐÌNH CHỈ VIỆC XEM XÉT TRÁCH NHIỆM HOÀN TRẢ
- **Tên tệp template**: `Mau_39_BTNN_Template.docx`
- **Mục đích**: Đình chỉ việc xem xét trách nhiệm hoàn trả theo khoản 2 Điều 69 Luật TNBTCNN (sửa đổi 2026) khi văn bản làm căn cứ yêu cầu bồi thường đã bị cơ quan nhà nước có thẩm quyền thu hồi, sửa đổi, hủy bỏ hoặc không còn là căn cứ bồi thường.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Trách nhiệm hoàn trả > Xem xét đình chỉ > Thao tác "Lập Quyết định đình chỉ xem xét hoàn trả"*.
- **Quy tắc đặt tên file tải về**: `Mau_39_BTNN_Quyet_dinh_dinh_chi_xem_xet_hoan_tra_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 39/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Trách nhiệm hoàn trả > Form Lập Quyết định đình chỉ xem xét hoàn trả | Số, ký hiệu văn bản | Cán bộ nhập trên form hoặc hệ thống tự động sinh số. Nếu chưa có: hiển thị `……` | `39/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Trách nhiệm hoàn trả > Form Lập Quyết định đình chỉ xem xét hoàn trả | Ngày ký | Định dạng: `ngày dd tháng mm năm yyyy`. Chưa nhập: `ngày … tháng … năm …` | `ngày 12 tháng 06 năm 2026` |
| 3 | Căn cứ | `##SoVBThuHoiCanCu##` | Trách nhiệm hoàn trả > Form Lập Quyết định đình chỉ xem xét hoàn trả | Số hiệu văn bản thu hồi, hủy bỏ căn cứ | Số hiệu văn bản hủy bỏ căn cứ bồi thường | `Quyết định giám đốc thẩm số 05/2026/GĐT-HS` |
| 4 | Căn cứ | `##NgayVBThuHoiCanCu##` | Trách nhiệm hoàn trả > Form Lập Quyết định đình chỉ xem xét hoàn trả | Ngày ban hành văn bản thu hồi, hủy bỏ căn cứ | Định dạng `dd/mm/yyyy` | `10/06/2026` |
| 5 | Căn cứ | `##CoQuanBanHanhVBThuHoi##` | Trách nhiệm hoàn trả > Form Lập Quyết định đình chỉ xem xét hoàn trả | Cơ quan ban hành văn bản thu hồi, hủy bỏ căn cứ | Tên cơ quan ra quyết định hủy bỏ căn cứ | `Hội đồng Thẩm phán Tòa án nhân dân tối cao` |
| 6 | Điều 1 | `##TenNguoiBiThietHai##` | Thông tin hồ sơ yêu cầu bồi thường | Họ và tên / Tên tổ chức bị thiệt hại | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên` người bị thiệt hại.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức` bị thiệt hại. | `Ông Nguyễn Khắc Hoài` hoặc `Hợp tác xã Nông nghiệp Hòa Bình` |
| 7 | Điều 1 | `##SoKyHieuVanBanCanCu##` | Thông tin hồ sơ yêu cầu bồi thường | Số, ký hiệu văn bản căn cứ trước đây | Số hiệu văn bản căn cứ cũ bị hủy | `Bản án hình sự phúc thẩm số 18/2025/HSPT` |
| 8 | Điều 1 | `##NgayBanHanhVanBanCanCu##` | Thông tin hồ sơ yêu cầu bồi thường | Ngày ban hành văn bản căn cứ cũ | Định dạng `dd/mm/yyyy` | `10/11/2025` |
| 9 | Điều 1 | `##CoQuanBanHanhVanBanCanCu##` | Thông tin hồ sơ yêu cầu bồi thường | Cơ quan ban hành văn bản căn cứ cũ | Tên cơ quan ban hành văn bản cũ | `Tòa án nhân dân cấp cao tại Hà Nội` |
| 10 | Nơi nhận | `##TenNguoiThiHanhCongVu##` | Trách nhiệm hoàn trả | Họ và tên cán bộ liên quan đến hoàn trả | Gửi cán bộ để thông báo đình chỉ nghĩa vụ | `Ông Vũ Đình Trọng` |

---

## PHẦN III. QUY TẮC KIỂM TRA TÍNH HỢP LỆ VÀ XỬ LÝ LỖI (VALIDATION RULES)

1. **Quy tắc cảnh báo lỗi bỏ trống (Mandatory Field Validation)**:
   - Đối với các trường bắt buộc trên màn hình sinh văn bản (ví dụ: Số ký hiệu, Ngày ban hành, Căn cứ pháp lý, Người giải quyết, Số tiền tạm ứng/hoàn trả...):
   - Nếu người dùng để trống và bấm "Xem dự thảo" hoặc "Tải file/Ban hành":
     + Tuyệt đối không sử dụng thông báo Toast chung chung.
     + Thực hiện highlight đỏ viền/nền ô nhập lỗi đầu tiên (class `.is-invalid`), hiển thị thông báo lỗi màu đỏ **"Đây là trường bắt buộc"** ngay phía dưới ô nhập.
     + Tự động focus con trỏ vào ô nhập lỗi đầu tiên đó.

2. **Quy tắc xác nhận thao tác (Confirmation Dialogs)**:
   - Khi thực hiện các thao tác mang tính pháp lý quan trọng như: Ban hành Quyết định giải quyết bồi thường (Mẫu 18), Hủy quyết định (Mẫu 20), Đình chỉ (Mẫu 25, 39):
   - Bắt buộc hiển thị hộp thoại Popup xác nhận tùy chỉnh (Custom Confirmation Modal) đồng bộ với giao diện hệ thống. Tuyệt đối không dùng `confirm()` mặc định của trình duyệt.

3. **Quy tắc hiển thị danh sách các giá trị Enum**:
   - Tuân thủ quy định chuẩn SRS: Toàn bộ các trường dữ liệu dạng danh mục hoặc lựa chọn cố định (Combobox, Radio, Badge...) trong tài liệu đặc tả đều được trình bày thành từng dòng riêng biệt bằng cú pháp:
     ```markdown
     Control UI: Combobox.<br>Gồm:<br>+ Giá trị 1<br>+ Giá trị 2<br>+ Giá trị 3
     ```

---

## PHẦN IV. DANH MỤC 23 PHÔI BIỂU MẪU .DOCX ĐÃ XÂY DỰNG

| STT | Mã biểu mẫu | Tên biểu mẫu văn bản | Tên tệp tin phôi `.docx` |
|:---:|---|---|---|
| 1 | Mẫu 02/BTNN | Giấy tiếp nhận yêu cầu bồi thường | [Mau_02_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_02_BTNN_Template.docx) |
| 2 | Mẫu 03/BTNN | Thông báo về việc bổ sung hồ sơ yêu cầu bồi thường | [Mau_03_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_03_BTNN_Template.docx) |
| 3 | Mẫu 04/BTNN | Thông báo về việc thụ lý / không thụ lý hồ sơ yêu cầu bồi thường | [Mau_04_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_04_BTNN_Template.docx) |
| 4 | Mẫu 05/BTNN | Thông báo về việc dừng giải quyết yêu cầu bồi thường | [Mau_05_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_05_BTNN_Template.docx) |
| 5 | Mẫu 06/BTNN | Quyết định cử người giải quyết bồi thường | [Mau_06_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_06_BTNN_Template.docx) |
| 6 | Mẫu 07/BTNN | Quyết định tạm ứng kinh phí bồi thường | [Mau_07_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_07_BTNN_Template.docx) |
| 7 | Mẫu 08/BTNN | Thông báo yêu cầu cung cấp tài liệu, chứng cứ phục vụ xác minh thiệt hại | [Mau_08_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_08_BTNN_Template.docx) |
| 8 | Mẫu 18/BTNN | Quyết định giải quyết bồi thường | [Mau_18_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_18_BTNN_Template.docx) |
| 9 | Mẫu 20/BTNN | Quyết định hủy quyết định giải quyết bồi thường | [Mau_20_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_20_BTNN_Template.docx) |
| 10 | Mẫu 21/BTNN | Quyết định sửa chữa, bổ sung quyết định giải quyết bồi thường | [Mau_21_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_21_BTNN_Template.docx) |
| 11 | Mẫu 22/BTNN | Quyết định hoãn giải quyết bồi thường | [Mau_22_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_22_BTNN_Template.docx) |
| 12 | Mẫu 23/BTNN | Quyết định tiếp tục giải quyết bồi thường | [Mau_23_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_23_BTNN_Template.docx) |
| 13 | Mẫu 24/BTNN | Quyết định tạm đình chỉ giải quyết yêu cầu bồi thường | [Mau_24_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_24_BTNN_Template.docx) |
| 14 | Mẫu 25/BTNN | Quyết định đình chỉ giải quyết yêu cầu bồi thường | [Mau_25_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_25_BTNN_Template.docx) |
| 15 | Mẫu 26/BTNN | Thông báo về việc tổ chức thực hiện phục hồi danh dự | [Mau_26_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_26_BTNN_Template.docx) |
| 16 | Mẫu 32/BTNN | Thông báo về việc chi trả tiền bồi thường | [Mau_32_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_32_BTNN_Template.docx) |
| 17 | Mẫu 33/BTNN | Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả | [Mau_33_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_33_BTNN_Template.docx) |
| 18 | Mẫu 34/BTNN | Biên bản làm việc của Hội đồng xem xét trách nhiệm hoàn trả | [Mau_34_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_34_BTNN_Template.docx) |
| 19 | Mẫu 35/BTNN | Văn bản kiến nghị việc ban hành quyết định hoàn trả | [Mau_35_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_35_BTNN_Template.docx) |
| 20 | Mẫu 36/BTNN | Quyết định hoàn trả | [Mau_36_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_36_BTNN_Template.docx) |
| 21 | Mẫu 37/BTNN | Quyết định giảm mức hoàn trả | [Mau_37_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_37_BTNN_Template.docx) |
| 22 | Mẫu 38/BTNN | Quyết định miễn hoàn trả | [Mau_38_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_38_BTNN_Template.docx) |
| 23 | Mẫu 39/BTNN | Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả | [Mau_39_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_39_BTNN_Template.docx) |

---
*Tài liệu được cập nhật tự động và đồng bộ trực tiếp với bộ mã nguồn phôi văn bản `.docx` của phân hệ Bồi thường nhà nước.*
