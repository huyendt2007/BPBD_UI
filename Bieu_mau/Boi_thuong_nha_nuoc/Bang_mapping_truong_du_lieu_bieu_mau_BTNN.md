# BẢNG MAPPING TRƯỜNG DỮ LIỆU CÁC BIỂU MẪU BỒI THƯỜNG NHÀ NƯỚC (BTNN)

> **TÀI LIỆU ĐẶC TẢ KỸ THUẬT SINH VĂN BẢN VÀ MAPPING DỮ LIỆU TỰ ĐỘNG**
> - **Dự án**: Hệ thống Cơ sở dữ liệu quốc gia về Biện pháp bảo đảm và Bồi thường nhà nước
> - **Phân hệ**: Website Quản trị - Quản lý công tác Bồi thường nhà nước
> - **Căn cứ pháp lý**: 
>   + Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 81/2025/QH15 và Luật số 15/2026/QH16).
>   + Dự thảo Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Trách nhiệm bồi thường của Nhà nước.
>   + Nghị định số 30/2020/NĐ-CP ngày 05/03/2020 của Chính phủ về công tác văn thư.
> - **Danh sách 27 biểu mẫu đặc tả**: Mẫu 02, 03, 04, 05, 06, 07, 08, 18, 20, 21, 22, 23, 24, 25, 26, 32, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43 và Mẫu số 04 (TT 08/2019).

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
- **Tên người yêu cầu (`##TenNguoiYeuCauBoiThuong##`)**: Lấy từ trường `Họ và tên / Tên tổ chức` (màn hình *Tiếp nhận hồ sơ*, khối Thông tin người yêu cầu):
  + Khi `Loại người yêu cầu` = `Cá nhân`: Họ và tên (ví dụ: `Nguyễn Văn Nam`).
  + Khi `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức (ví dụ: `Công ty TNHH Xây dựng và Thương mại Ánh Dương`).
- **Xưng hô / Kính gửi trong biểu mẫu văn bản**:
  + Đối với `Cá nhân`: Hiển thị dạng `Ông/Bà [Họ và tên]` (hoặc `[Họ và tên]` tùy theo mẫu).
  + Đối với `Tổ chức`: Hiển thị tên đầy đủ của tổ chức `[Tên tổ chức]`, không có tiền tố `Ông/Bà`.
- **Thông tin giấy tờ pháp lý / định danh**:
  + Đối với `Cá nhân`: Lấy từ trường `Loại giấy tờ thân nhân` và `Số giấy tờ thân nhân` (ví dụ: `CCCD số 001090001234`).
  + Đối với `Tổ chức`: Lấy từ trường `Mã số tổ chức`.
- **Địa chỉ liên hệ (`##DiaChiNguoiYeuCauBoiThuong##`)**:
  + Đối với `Cá nhân`: Địa chỉ nơi cư trú của cá nhân.
  + Đối với `Tổ chức`: Địa chỉ trụ sở chính của tổ chức.

### 5. Quy tắc ghép địa chỉ người yêu cầu bồi thường (Địa chỉ chi tiết)
- **Áp dụng cho**: Biến `##DiaChiNguoiYeuCauBoiThuong##` (và các trường địa chỉ khác như `##DiaChiNguoiBiThietHai##`, `##DiaChiNguoiNhanTien##`...).
- **Mô tả trường**: Địa chỉ của người yêu cầu bồi thường (đối với Cá nhân là nơi cư trú; đối với Tổ chức là địa chỉ trụ sở chính).
- **Nguồn dữ liệu trên Form**: Ghép 4 trường: `Địa chỉ chi tiết`, `Phường/Xã`, `Tỉnh/Thành phố`, `Quốc gia` tại khối Thông tin người yêu cầu của màn hình *Tiếp nhận hồ sơ* (hoặc trường địa chỉ tương ứng của màn hình nêu tại từng mẫu).
- **Quy tắc ghép chuỗi tự động**:
  1. Ghép tuần tự: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]` (cách nhau bởi dấu phẩy và khoảng trắng `, `).
  2. Tự động bỏ qua các thành phần bỏ trống hoặc không có dữ liệu (không để lại dấu phẩy thừa).
  3. Trường hợp trường `Quốc gia` có giá trị khác "Việt Nam", hệ thống tự động ghép thêm tên `[Quốc gia]` ở cuối chuỗi.

### 6. Quy tắc số điện thoại và email liên hệ người yêu cầu bồi thường
- **Áp dụng cho**: Biến `##SoDienThoaiNguoiYeuCau##` và `##EmailNguoiYeuCau##`.
- **Mô tả trường**: Số điện thoại và thư điện tử (email) liên hệ của người yêu cầu bồi thường (áp dụng cho cả Cá nhân và Tổ chức).
- **Nguồn dữ liệu trên Form**: Lấy từ trường **"Số điện thoại"** và **"Email"** của người yêu cầu trên màn hình *Tiếp nhận hồ sơ*.
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
| 6 | Dưới tên văn bản (3) | `##ChucVuNguoiDungDau##` | Quản lý cơ cấu tổ chức > Danh mục Chức vụ [DM_58]; Quản lý cơ cấu tổ chức > Quản lý đơn vị | Tên chức vụ; Tên cơ quan, đơn vị | Ghép Chức vụ đầu tiên theo Loại cơ quan [DM_57] của cơ quan ban hành trong Danh mục Chức vụ [DM_58] và Tên cơ quan, đơn vị của cơ quan ban hành.<br>- Từ cuối của chức vụ trùng từ đầu của tên cơ quan thì không lặp.<br>- In hoa toàn bộ. | `GIÁM ĐỐC SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 7 | Bảng ký - Ô phải | `##ChucVuNguoiKy##` | Quản lý cơ cấu tổ chức > Danh mục Chức vụ [DM_58] | Tên chức vụ | Chức vụ đầu tiên theo Loại cơ quan [DM_57] của cơ quan ban hành trong Danh mục Chức vụ [DM_58].<br>- In hoa toàn bộ. | `GIÁM ĐỐC` |
| 8 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Popup trình ký của từng biểu mẫu (Bước 2 - Kéo ô ký & chọn Lãnh đạo) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Nguyễn Văn An` |
| 9 | Bảng nơi nhận / Thân văn bản | `##TenCoQuanQuanLyNhaNuocBTNN##` | Cấu hình hệ thống > Danh mục cơ quan QLNN về BTNN | Tên cơ quan quản lý nhà nước về công tác BTNN | Phụ thuộc cấp cơ quan giải quyết bồi thường: Cấp Trung ương là Cục Bồi thường nhà nước - Bộ Tư pháp; Cấp địa phương là Sở Tư pháp tỉnh/thành phố | `Sở Tư pháp thành phố Hà Nội` |

---

## PHẦN II. ĐẶC TẢ CHI TIẾT MAPPING TỪNG BIỂU MẪU

### 1. MẪU SỐ 02/BTNN: GIẤY TIẾP NHẬN YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_02_BTNN_Template.docx`
- **Mục đích**: Cơ quan giải quyết bồi thường lập và giao/gửi cho người yêu cầu bồi thường để xác nhận thời điểm và thành phần hồ sơ đã tiếp nhận.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Tiếp nhận hồ sơ > Thao tác "Trình ký Phiếu tiếp nhận" (Danh sách hồ sơ tiếp nhận, Màn hình Xem chi tiết hồ sơ tiếp nhận) > MH04 - Popup Trình ký Phiếu tiếp nhận hồ sơ > Hình thức ký `Ký số trên hệ thống`, Tệp văn bản trình ký `Sinh văn bản theo mẫu 02/BTNN`*. Chỉ áp dụng hồ sơ Nguồn `Tiếp nhận mới`, Hình thức tiếp nhận `Trực tiếp` / `Qua dịch vụ bưu chính`.
- **Quy tắc đặt tên file tải về**: `Mau_02_BTNN_Giay_tiep_nhan_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (tên cơ quan tiếp nhận yêu cầu bồi thường - (1)), `##DiaDanh##` (2), `##ChucVuNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: không có (Số, ký hiệu văn bản, Nơi nhận, Họ tên người ký lấy theo biến tại bảng dưới).

#### Bảng mapping chi tiết Mẫu 02/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Tiếp nhận hồ sơ > MH04 - Popup Trình ký Phiếu tiếp nhận hồ sơ | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện.<br>- Gồm chữ viết tắt tên cơ quan giải quyết bồi thường (1). | `15/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Tiếp nhận hồ sơ > MH04 - Popup Trình ký Phiếu tiếp nhận hồ sơ | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 10 tháng 03 năm 2026` |
| 3 | Kính gửi | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Nguyễn Văn Nam` |
| 4 | Dưới Kính gửi | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Số 12 phố Hàng Bông, Phường Hoàn Kiếm, Thành phố Hà Nội` |
| 5 | Dưới Địa chỉ | `##SoDienThoaiNguoiYeuCau##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Số điện thoại | Theo giá trị trường `Số điện thoại` trên giao diện. | `0912345678` |
| 6 | Đoạn 1 | `##NgayTiepNhan##` | Tiếp nhận hồ sơ | Thời điểm tiếp nhận | Theo phần ngày của giá trị trường `Thời điểm tiếp nhận` trên giao diện.<br>Định dạng: `dd/mm/yyyy`. | `10/03/2026` |
| 7 | Đoạn 1 (3) | `##HinhThucNopHoSo##` | Tiếp nhận hồ sơ > Thông tin tổng quan vụ việc | Hình thức tiếp nhận | Theo giá trị trường `Hình thức tiếp nhận` trên giao diện.<br>- Viết thường; bỏ chữ `Qua ` ở đầu giá trị (câu mẫu đã có chữ "qua"). | `trực tiếp` |
| 8 | Đoạn 2 | `##DanhSachGiayToTiepNhan##` | Tiếp nhận hồ sơ | Tên tài liệu (Bảng tài liệu đính kèm); Tên văn bản, căn cứ (Văn bản làm căn cứ yêu cầu bồi thường) | Theo giá trị trường `Tên tài liệu` của Bảng tài liệu đính kèm và trường `Tên văn bản, căn cứ` của Văn bản làm căn cứ yêu cầu bồi thường trên giao diện.<br>- Mỗi tài liệu 01 dòng dạng `- [Tên]`; bỏ dòng trống, bỏ tên trùng.<br>- Không có tài liệu: bỏ cả dòng "Hồ sơ yêu cầu bồi thường gồm: (nếu có)". | `- Đơn yêu cầu bồi thường`<br>`- Bản án hình sự phúc thẩm số 18/2025/HSPT` |
| 9 | Nơi nhận | `##NoiNhan##` | Tiếp nhận hồ sơ > MH04 - Popup Trình ký Phiếu tiếp nhận hồ sơ | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống. | `- Như trên;`<br>`- Bộ Tư pháp (để biết);`<br>`- Lưu: VT, HSVV.` |
| 10 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Tiếp nhận hồ sơ > MH04 - Popup Trình ký Phiếu tiếp nhận hồ sơ (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Nguyễn Văn An` |

---

### 2. MẪU SỐ 03/BTNN: THÔNG BÁO VỀ VIỆC BỔ SUNG HỒ SƠ YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_03_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người yêu cầu bồi thường biết các tài liệu, giấy tờ còn thiếu cần phải bổ sung trong thời hạn 15 ngày làm việc theo quy định tại khoản 3 Điều 16 Nghị định hướng dẫn.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Popup Yêu cầu bổ sung hồ sơ (Hình thức ký `Ký số trên hệ thống`, Tệp văn bản trình ký `Sinh văn bản theo mẫu 03/BTNN`)*.
- **Quy tắc đặt tên file tải về**: `Mau_03_BTNN_Thong_bao_yeu_cau_bo_sung_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##` (dòng ban hành kèm theo và các câu "Nghị định số ..."), `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (1), (5), `##DiaDanh##` (2), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Nơi nhận `- Như trên;` / `- Lưu: VT, HSVV.` (không nhập trên popup).

#### Bảng mapping chi tiết Mẫu 03/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Yêu cầu bổ sung hồ sơ | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `15/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Yêu cầu bổ sung hồ sơ | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 05 tháng 03 năm 2026` |
| 3 | Kính gửi (3) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Trần Thị Mai` |
| 4 | Dưới Kính gửi (4) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Số 45 đường Lê Lợi, Phường Ngô Quyền, Thành phố Hải Phòng` |
| 5 | Đoạn 1 | `##NgayTiepNhan##` | Tiếp nhận hồ sơ | Thời điểm tiếp nhận | Theo phần ngày của giá trị trường `Thời điểm tiếp nhận` trên giao diện.<br>Định dạng: `dd tháng mm năm yyyy` (câu mẫu đã có chữ "Ngày"). | `05 tháng 03 năm 2026` |
| 6 | Đoạn 1 (6) | `##HinhThucNopHoSo##` | Tiếp nhận hồ sơ > Thông tin tổng quan vụ việc | Hình thức tiếp nhận | Theo giá trị trường `Hình thức tiếp nhận` trên giao diện.<br>- Viết thường. | `qua dịch vụ bưu chính` |
| 7 | Đoạn 3 (7) | `##DanhSachGiayToBoSung##` | Giải quyết yêu cầu bồi thường > Popup Yêu cầu bổ sung hồ sơ | Nội dung yêu cầu bổ sung hồ sơ | Theo giá trị trường `Nội dung yêu cầu bổ sung hồ sơ` trên giao diện.<br>- Mỗi dòng 01 giấy tờ, sinh 01 đoạn dạng `[STT]. [Tên giấy tờ]`; bỏ dòng trống, bỏ số thứ tự/gạch đầu dòng đã nhập ở đầu dòng. | `1. Bản sao có chứng thực giấy tờ tùy thân`<br>`2. Hóa đơn, chứng từ chứng minh thiệt hại thực tế` |

---

### 3. MẪU SỐ 04/BTNN: THÔNG BÁO VỀ VIỆC THỤ LÝ / KHÔNG THỤ LÝ HỒ SƠ YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_04_BTNN_Template.docx` (dùng chung cho 02 trường hợp; hệ thống điền biến theo trường hợp sinh văn bản).
- **Mục đích**: Thông báo chính thức cho người yêu cầu bồi thường về việc cơ quan giải quyết bồi thường thụ lý hoặc không thụ lý hồ sơ yêu cầu bồi thường.
- **Phân tách trường hợp**: Mẫu 04/BTNN được sinh theo 01 trong 02 trường hợp dưới đây, mỗi trường hợp có bảng mapping riêng. Tính năng gọi Mẫu 04/BTNN phải ghi rõ trường hợp:
  + `Mẫu 04/BTNN - Thông báo thụ lý hồ sơ yêu cầu bồi thường`: theo [3.1](#mau-04-thu-ly).
  + `Mẫu 04/BTNN - Thông báo không thụ lý hồ sơ yêu cầu bồi thường`: theo [3.2](#mau-04-khong-thu-ly).
- **Ghi chú (7) của mẫu**: nội dung đoạn sau câu "...nhận thấy:" ghi theo đúng 01 trong 02 trường hợp; không ghi đồng thời cả hai.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (1), (6), `##DiaDanh##` (2), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).

<a id="mau-04-thu-ly"></a>
#### 3.1. Trường hợp Thông báo thụ lý hồ sơ yêu cầu bồi thường
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Popup Trình duyệt Thông báo thụ lý hồ sơ yêu cầu bồi thường* (Cán bộ xử lý trình Lãnh đạo Nội dung trình `Tiếp nhận hồ sơ` sau khi Nhập liệu hồ sơ vụ việc; nút `Xem dự thảo`, `Tải file`).
- **Lưu và ban hành**: Văn bản sinh khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 04/BTNN` tại Popup Trình duyệt Thông báo thụ lý hồ sơ yêu cầu bồi thường; văn bản lưu cùng phiếu trình `Tiếp nhận hồ sơ` và được Lãnh đạo cấp cuối ký số khi Ký duyệt. Hình thức `Ký ngoài`: cán bộ tải lên văn bản PDF đã ký và đóng dấu, không sinh văn bản theo mẫu.
- **Quy tắc đặt tên file tải về**: `Mau_04_BTNN_Thong_bao_thu_ly_[Mã vụ việc].docx`

| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Thông báo thụ lý hồ sơ yêu cầu bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `24/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Thông báo thụ lý hồ sơ yêu cầu bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 12 tháng 03 năm 2026` |
| 3 | Tiêu đề trích yếu | `##TieuDeThongBaoThuLy##` | - | - | Giá trị cố định: `thụ lý hồ sơ yêu cầu bồi thường` | `thụ lý hồ sơ yêu cầu bồi thường` |
| 4 | Kính gửi (4) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Lê Văn Chung` |
| 5 | Dưới Kính gửi (5) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Số 88 đường Giải Phóng, Phường Nam Định, Tỉnh Ninh Bình` |
| 6 | Đoạn 1 | `##NgayTiepNhan##` | Tiếp nhận hồ sơ | Thời điểm tiếp nhận | Theo phần ngày của giá trị trường `Thời điểm tiếp nhận` trên giao diện.<br>Định dạng: `dd/mm/yyyy`. | `12/03/2026` |
| 7 | Thân văn bản (Ghi chú 7) | `##NoiDungThongBaoThuLy##` | - | - | Giá trị cố định, thay `[Tên CQGQBT]` bằng `##TenCoQuanGiaiQuyetBoiThuong##`:<br>*"Hồ sơ của Ông/Bà đầy đủ điều kiện thụ lý hồ sơ yêu cầu bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước. Căn cứ quy định tại khoản 1 Điều 43 Luật Trách nhiệm bồi thường của nhà nước, [Tên CQGQBT] thụ lý hồ sơ yêu cầu bồi thường của Ông/Bà và thông báo để Ông/Bà được biết."* | *"Hồ sơ của Ông/Bà đầy đủ điều kiện thụ lý hồ sơ yêu cầu bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước. Căn cứ quy định tại khoản 1 Điều 43 Luật Trách nhiệm bồi thường của nhà nước, Sở Tư pháp Thành phố Hà Nội thụ lý hồ sơ yêu cầu bồi thường của Ông/Bà và thông báo để Ông/Bà được biết."* |
| 8 | Nơi nhận (8) | `##NoiNhan##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Thông báo thụ lý hồ sơ yêu cầu bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống. | `- Như trên;`<br>`- Sở Tư pháp Thành phố Hà Nội (để biết);`<br>`- Lưu: VT, HSVV.` |

<a id="mau-04-khong-thu-ly"></a>
#### 3.2. Trường hợp Thông báo không thụ lý hồ sơ yêu cầu bồi thường
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Popup Không thụ lý hồ sơ* (Cán bộ xử lý trình Lãnh đạo; văn bản dự thảo `Theo Mẫu 04/BTNN do hệ thống tự động sinh`).
- **Quy tắc đặt tên file tải về**: `Mau_04_BTNN_Thong_bao_khong_thu_ly_[Mã vụ việc].docx`
- **Quy tắc riêng cho lý do `Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình`**: Đoạn 2 của `##NoiDungThongBaoThuLy##` không ghi trả lại hồ sơ mà ghi chuyển hồ sơ cho đơn vị được chuyển đến chọn tại khối `Chuyển cơ quan tiếp nhận mới` (STT 7).

| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Không thụ lý hồ sơ | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `25/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Không thụ lý hồ sơ | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 12 tháng 03 năm 2026` |
| 3 | Tiêu đề trích yếu | `##TieuDeThongBaoThuLy##` | - | - | Giá trị cố định: `không thụ lý hồ sơ yêu cầu bồi thường` | `không thụ lý hồ sơ yêu cầu bồi thường` |
| 4 | Kính gửi (4) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Lê Văn Chung` |
| 5 | Dưới Kính gửi (5) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Số 88 đường Giải Phóng, Phường Nam Định, Tỉnh Ninh Bình` |
| 6 | Đoạn 1 | `##NgayTiepNhan##` | Tiếp nhận hồ sơ | Thời điểm tiếp nhận | Theo phần ngày của giá trị trường `Thời điểm tiếp nhận` trên giao diện.<br>Định dạng: `dd/mm/yyyy`. | `12/03/2026` |
| 7 | Thân văn bản (Ghi chú 7) | `##NoiDungThongBaoThuLy##` | Giải quyết yêu cầu bồi thường > Popup Không thụ lý hồ sơ | Lý do không thụ lý, Diễn giải, Chuyển cơ quan tiếp nhận mới | Sinh 02 đoạn, thay `[Tên CQGQBT]` bằng `##TenCoQuanGiaiQuyetBoiThuong##`:<br>- Đoạn 1: *"Căn cứ theo quy định tại [Điểm, khoản] Điều 43 Luật Trách nhiệm bồi thường của Nhà nước, [Tên CQGQBT] không thụ lý hồ sơ yêu cầu bồi thường của Ông/Bà vì [Lý do không thụ lý]."*<br>+ `[Điểm, khoản]`: lấy theo căn cứ ghi kèm giá trị `Lý do không thụ lý` đã chọn, viết thường.<br>+ `[Lý do không thụ lý]`: giá trị `Lý do không thụ lý` đã chọn, viết thường chữ cái đầu, bỏ phần căn cứ trong ngoặc; có `Diễn giải` thì nối thêm `: [Diễn giải]`.<br>- Đoạn 2 (lý do khác `Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình`): *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."*<br>- Đoạn 2 (lý do `Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình`): *"Do vậy, [Tên CQGQBT] chuyển hồ sơ yêu cầu bồi thường của Ông/Bà cho [Tên đơn vị được chuyển đến] và thông báo để Ông/Bà được biết."*<br>+ `[Tên đơn vị được chuyển đến]`: tùy chọn `Chuyển Bộ Tư pháp`: `Bộ Tư pháp`; tùy chọn `Chuyển Sở Tư pháp`: tên Sở Tư pháp quản lý đơn vị do hệ thống xác định; tùy chọn `Chuyển trực tiếp tới Cơ quan giải quyết bồi thường`: tên đơn vị chọn tại `Cơ quan tiếp nhận mới`. | - Lý do thời hiệu đã hết: *"Căn cứ theo quy định tại điểm b khoản 2 Điều 43 Luật Trách nhiệm bồi thường của Nhà nước, Sở Tư pháp Thành phố Hà Nội không thụ lý hồ sơ yêu cầu bồi thường của Ông/Bà vì thời hiệu yêu cầu bồi thường đã hết.<br>Do vậy, Sở Tư pháp Thành phố Hà Nội trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."*<br>- Lý do không thuộc thẩm quyền, tùy chọn `Chuyển Sở Tư pháp`: *"Căn cứ theo quy định tại điểm a khoản 2 Điều 43 Luật Trách nhiệm bồi thường của Nhà nước, Ủy ban nhân dân quận Hoàng Mai không thụ lý hồ sơ yêu cầu bồi thường của Ông/Bà vì yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình.<br>Do vậy, Ủy ban nhân dân quận Hoàng Mai chuyển hồ sơ yêu cầu bồi thường của Ông/Bà cho Sở Tư pháp Thành phố Hà Nội và thông báo để Ông/Bà được biết."* |
| 8 | Nơi nhận (8) | `##NoiNhan##` | Giải quyết yêu cầu bồi thường > Popup Không thụ lý hồ sơ | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống. | `- Như trên;`<br>`- Sở Tư pháp Thành phố Hà Nội (để biết);`<br>`- Lưu: VT, HSVV.` |


**Đoạn 2 của `##NoiDungThongBaoThuLy##` theo từng Lý do không thụ lý:**

| STT | Lý do không thụ lý | `[Điểm, khoản]` Điều 43 | Xử lý hồ sơ | Đoạn 2 |
|:---:|---|---|---|---|
| 1 | Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình | `điểm a khoản 2` | Chuyển hồ sơ | *"Do vậy, [Tên CQGQBT] chuyển hồ sơ yêu cầu bồi thường của Ông/Bà cho [Tên đơn vị được chuyển đến] và thông báo để Ông/Bà được biết."* |
| 2 | Thời hiệu yêu cầu bồi thường đã hết | `điểm b khoản 2` | Trả lại hồ sơ | *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."* |
| 3 | Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước được quy định tại Chương II của Luật này | `điểm c khoản 2` | Trả lại hồ sơ | *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."* |
| 4 | Người yêu cầu bồi thường không phải là người có quyền yêu cầu bồi thường theo quy định tại Điều 5 của Luật này | `điểm d khoản 2` | Trả lại hồ sơ | *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."* |
| 5 | Hồ sơ không đầy đủ theo quy định tại Điều 41 của Luật này mà người yêu cầu bồi thường không bổ sung trong thời hạn quy định tại khoản 3 Điều 42 của Luật này | `điểm đ khoản 2` | Trả lại hồ sơ | *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."* |
| 6 | Yêu cầu bồi thường đã được thực hiện theo quy định tại điểm a khoản 1 Điều 52 của Luật này và đã được Tòa án có thẩm quyền thụ lý theo thủ tục tố tụng dân sự | `điểm e khoản 2` | Trả lại hồ sơ | *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."* |
| 7 | Yêu cầu bồi thường đã được Tòa án có thẩm quyền chấp nhận theo quy định tại khoản 1 Điều 55 của Luật này | `điểm g khoản 2` | Trả lại hồ sơ | *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."* |
| 8 | Yêu cầu bồi thường đã được giải quyết bằng bản án, quyết định đã có hiệu lực pháp luật | `điểm h khoản 2` | Trả lại hồ sơ | *"Do vậy, [Tên CQGQBT] trả lại hồ sơ yêu cầu bồi thường (gửi kèm Thông báo này) và thông báo để Ông/Bà được biết."* |
- `[Tên đơn vị được chuyển đến]`: tùy chọn `Chuyển Bộ Tư pháp`: `Bộ Tư pháp`; tùy chọn `Chuyển Sở Tư pháp`: tên Sở Tư pháp quản lý đơn vị do hệ thống xác định; tùy chọn `Chuyển trực tiếp tới Cơ quan giải quyết bồi thường`: tên đơn vị chọn tại `Cơ quan tiếp nhận mới`.

---

### 4. MẪU SỐ 05/BTNN: THÔNG BÁO VỀ VIỆC DỪNG GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_05_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người yêu cầu biết việc cơ quan GQBT dừng giải quyết yêu cầu bồi thường và trả lại hồ sơ hoặc chuyển hồ sơ đến cơ quan có thẩm quyền theo khoản 6 Điều 43 Luật TNBTCNN (sửa đổi 2026).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Thao tác khác "Dừng giải quyết" > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường* (hồ sơ `Cử người giải quyết bồi thường`, `Xác minh thiệt hại`, `Thương lượng`, `Chờ ban hành QĐ`, hoặc `Cập nhật` hồ sơ `Bị trả lại` có Loại trình `Dừng giải quyết`; nút `Xem trước văn bản`).
- **Lưu và ban hành**: Văn bản sinh khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 05/BTNN`; văn bản lưu cùng phiếu trình `Dừng giải quyết` và được Lãnh đạo cấp cuối ký số khi Ký duyệt. Hình thức `Ký ngoài`: chỉ tải lên văn bản PDF đã ký và đóng dấu, không sinh văn bản theo mẫu.
- **Quy tắc đặt tên file tải về**: `Mau_05_BTNN_Thong_bao_dung_giai_quyet_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (1), (5), `##DiaDanh##` (2), `##TenCoQuanQuanLyNhaNuocBTNN##` (10), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Nơi nhận `- Như trên;` / `- ##TenCoQuanQuanLyNhaNuocBTNN## (để biết);` / `- Lưu: VT, HSVV.`

#### Bảng mapping chi tiết Mẫu 05/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` (khối `Thông tin điền vào Mẫu 05/BTNN`) trên giao diện. | `30/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` (khối `Thông tin điền vào Mẫu 05/BTNN`) trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 18 tháng 03 năm 2026` |
| 3 | Kính gửi (3) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Hoàng Văn Phúc` |
| 4 | Dưới Kính gửi (4) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Thôn Tân Triều, Xã Thanh Trì, Thành phố Hà Nội` |
| 5 | Đoạn 1 (6) | `##SoThongBaoThuLy##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường | Thông báo thụ lý hồ sơ yêu cầu bồi thường | Theo Số, ký hiệu văn bản của Thông báo thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN) đã được ký duyệt/ban hành của vụ việc, hiển thị tại trường `Thông báo thụ lý hồ sơ yêu cầu bồi thường` trên giao diện.<br>Vụ việc chưa có Thông báo thụ lý: giữ dấu chấm. | `24/TB-STP` |
| 6 | Đoạn 1 (6) | `##NgayThongBaoThuLy##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường | Thông báo thụ lý hồ sơ yêu cầu bồi thường | Theo Ngày văn bản của Thông báo thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN) đã được ký duyệt/ban hành của vụ việc, hiển thị tại trường `Thông báo thụ lý hồ sơ yêu cầu bồi thường` trên giao diện.<br>Định dạng: `dd/mm/yyyy`.<br>Vụ việc chưa có Thông báo thụ lý: giữ dấu chấm. | `15/02/2026` |
| 7 | Đoạn 1 (7) | `##LyDoDungGiaiQuyet##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường | Lý do dừng giải quyết | Theo giá trị trường `Lý do dừng giải quyết` trên giao diện; bỏ dấu câu cuối.<br>- Mặc định theo `Căn cứ dừng giải quyết`: nội dung căn cứ bỏ phần điểm, khoản trong ngoặc, chữ đầu viết thường.<br>- Căn cứ khoản 4 Điều 43: cán bộ tự nhập. | `yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước` |
| 8 | Đoạn 1 (8) | `##CanCuDungGiaiQuyet##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường | Căn cứ dừng giải quyết | Điểm, khoản của giá trị trường `Căn cứ dừng giải quyết` trên giao diện; viết thường.<br>- Điểm b, c, d, đ, e, g khoản 2 Điều 43: `điểm [x] khoản 2`.<br>- Khoản 4 Điều 43: `khoản 4`. | `điểm c khoản 2` |
| 9 | Đoạn 2 (9) | `##BienPhapXuLyTiepTheo##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo dừng giải quyết yêu cầu bồi thường | Biện pháp xử lý hồ sơ; Cơ quan có thẩm quyền giải quyết bồi thường | Theo trường `Biện pháp xử lý hồ sơ` (hệ thống xác định theo `Căn cứ dừng giải quyết`):<br>- Điểm b, c, d, đ, e, g khoản 2 Điều 43 (`Trả lại hồ sơ yêu cầu bồi thường cho người yêu cầu bồi thường`): `trả lại hồ sơ yêu cầu bồi thường cho Ông/Bà (gửi kèm Thông báo này)`.<br>- Khoản 4 Điều 43 (`Chuyển hồ sơ đến cơ quan có thẩm quyền giải quyết bồi thường`): `chuyển hồ sơ đến [Cơ quan có thẩm quyền giải quyết bồi thường] để giải quyết`; `[Cơ quan có thẩm quyền giải quyết bồi thường]` theo giá trị trường cùng tên trên giao diện. | `trả lại hồ sơ yêu cầu bồi thường cho Ông/Bà (gửi kèm Thông báo này)` |

---

<a id="mau-06"></a>
### 5. MẪU SỐ 06/BTNN: QUYẾT ĐỊNH CỬ NGƯỜI GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_06_BTNN_Template.docx`
- **Mục đích**: Thủ trưởng cơ quan giải quyết bồi thường ban hành quyết định phân công công chức/cán bộ trực tiếp thụ lý, giải quyết vụ việc bồi thường theo khoản 1 Điều 43 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Popup Cử người giải quyết bồi thường* (lập Quyết định cử người giải quyết cho hồ sơ `Cử người giải quyết bồi thường` hoặc cập nhật hồ sơ `Bị trả lại` có Loại trình `Cử người giải quyết bồi thường`; nút `Xem trước văn bản`).
- **Lưu và ban hành**: Văn bản sinh khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 06/BTNN`; văn bản lưu cùng phiếu trình `Cử người giải quyết bồi thường` và được Lãnh đạo cấp cuối ký số khi Ký duyệt. Hình thức `Ký ngoài`: chỉ tải lên văn bản PDF đã ký và đóng dấu, không nhập Số, ký hiệu văn bản, Ngày văn bản, không sinh văn bản theo mẫu.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Quy tắc đặt tên file tải về**: `Mau_06_BTNN_Quyet_dinh_cu_nguoi_GQBT_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 06/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Cử người giải quyết bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `16/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Cử người giải quyết bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện. Định dạng trên mẫu: `ngày dd tháng mm năm yyyy` | `ngày 15 tháng 03 năm 2026` |
| 3 | Căn cứ & Điều 1 | `##TenNguoiYeuCauBoiThuong##` | Giải quyết yêu cầu bồi thường | Họ và tên / Tên tổ chức yêu cầu bồi thường | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức`. | `Phạm Minh Tuấn` hoặc `Công ty TNHH Xây dựng Phú Thịnh` |
| 4 | Điều 1 | `##DiaChiNguoiYeuCauBoiThuong##` | Giải quyết yêu cầu bồi thường | Ghép các trường: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia | Địa chỉ của người yêu cầu bồi thường (nơi cư trú đối với Cá nhân, hoặc địa chỉ trụ sở chính đối với Tổ chức): Ghép theo thứ tự: [Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], cách nhau bằng ", ". Bỏ qua phần không có dữ liệu. Nếu Quốc gia khác Việt Nam thì ghép thêm [Quốc gia] ở cuối. | `Phường Hàng Đào, Quận Hoàn Kiếm, TP. Hà Nội` |
| 5 | Điều 1, 2, 4 | `##HoTenNguoiGiaiQuyet##` | Giải quyết yêu cầu bồi thường > Popup Cử người giải quyết bồi thường | Họ và tên | Theo giá trị trường `Họ và tên` (nhập text) trên giao diện (Danh sách cán bộ giải quyết bồi thường, theo thứ tự dòng; cán bộ chủ trì đầu tiên). Điền vào Điều 1, 2 và Điều 4.<br>- Nhiều cán bộ, Điều 1: cụm `Ông/Bà ##HoTenNguoiGiaiQuyet## Chức vụ: ##ChucVuNguoiGiaiQuyet##` lặp theo từng cán bộ, nối bằng `; `.<br>- Nhiều cán bộ, Điều 2, 4: họ và tên các cán bộ nối bằng `, Ông/Bà `. | `Nguyễn Thị Lan`<br>Nhiều cán bộ (Điều 2): `Nguyễn Thị Lan, Ông/Bà Trần Văn Minh` |
| 6 | Điều 1 | `##ChucVuNguoiGiaiQuyet##` | Giải quyết yêu cầu bồi thường > Popup Cử người giải quyết bồi thường | Chức vụ | Theo giá trị trường `Chức vụ` trên giao diện, tương ứng từng cán bộ.<br>- Nhiều cán bộ: lặp theo quy tắc Điều 1 tại `##HoTenNguoiGiaiQuyet##`. | `Chuyên viên chính` |
| 7 | Nơi nhận (6) | `##NoiNhan##` | Giải quyết yêu cầu bồi thường > Popup Cử người giải quyết bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện. Mỗi dòng là 01 nơi nhận; dòng (6) là tên cơ quan quản lý nhà nước về công tác bồi thường nhà nước | `- Như Điều 4;`<br>`- Sở Tư pháp Thành phố Hà Nội;`<br>`- Lưu: VT, HSVV.` |

---

<a id="mau-07-tam-ung"></a>
### 6. MẪU SỐ 07/BTNN: QUYẾT ĐỊNH TẠM ỨNG KINH PHÍ BỒI THƯỜNG
- **Tên tệp template**: `Mau_07_BTNN_Template.docx`
- **Mục đích**: Quyết định tạm ứng kinh phí bồi thường theo quy định tại Điều 44 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Nút "Tạo QĐ tạm ứng" > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí > Nút "Tiếp tục" > MH21 - Popup Trình ký Quyết định tạm ứng kinh phí (Sinh văn bản theo mẫu 07/BTNN)*.
- **Quy tắc đặt tên file tải về**: `Mau_07_BTNN_Quyet_dinh_tam_ung_[Mã vụ việc].docx`
- **Biến dùng chung**: `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##` theo Bảng trường thông tin dùng chung (Phần I mục 8); Cơ quan giải quyết bồi thường theo giá trị trường `Cơ quan giải quyết bồi thường` trên MH20.
- **Ghi chú điều kiện Điều 2**: Khối Điều 2 (dòng 15, 16, 17) chỉ sinh khi Người nhận tạm ứng khác Người yêu cầu bồi thường: giá trị trường `Họ và tên người nhận tạm ứng kinh phí bồi thường` khác `Họ và tên/Tên tổ chức`, hoặc giá trị trường `Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế` (người nhận) khác `Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế/Mã số của tổ chức` (người yêu cầu); luôn so sánh cả Họ và tên và Số giấy tờ (các trường bắt buộc nhập); so sánh không phân biệt hoa thường, bỏ khoảng trắng thừa.
- **Quy tắc đánh số lại khi không có Điều 2**: Bỏ toàn bộ khối Điều 2; Điều 3 → Điều 2, Điều 4 → Điều 3, Điều 5 → Điều 4; trong `##NoiNhan##` thay "Như Điều 5" bằng "Như Điều 4".

#### Bảng mapping chi tiết Mẫu 07/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH21 - Popup Trình ký Quyết định tạm ứng kinh phí | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện.<br>- Gồm chữ viết tắt tên cơ quan giải quyết bồi thường (1). | `25/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH21 - Popup Trình ký Quyết định tạm ứng kinh phí | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 22 tháng 10 năm 2026` |
| 3 | Dưới tên văn bản (3) | `##ChucVuNguoiDungDau##` | Quản lý cơ cấu tổ chức > Danh mục Chức vụ [DM_58]; Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Tên chức vụ; Cơ quan giải quyết bồi thường | Ghép Chức vụ đầu tiên của Loại cơ quan của cơ quan giải quyết bồi thường trong Danh mục Chức vụ [DM_58] và Tên cơ quan, đơn vị theo giá trị trường `Cơ quan giải quyết bồi thường` trên giao diện.<br>- Từ cuối của chức vụ trùng từ đầu của tên cơ quan thì không lặp.<br>- In hoa toàn bộ. | `GIÁM ĐỐC SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 4 | Căn cứ (4), (5) | `##CanCu##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH21 - Popup Trình ký Quyết định tạm ứng kinh phí | Căn cứ | Theo giá trị trường `Căn cứ` trên giao diện (01 biến chứa toàn bộ các căn cứ của Quyết định: Điều 44 Luật, văn bản làm căn cứ yêu cầu bồi thường (4), văn bản yêu cầu bồi thường của người yêu cầu (5)).<br>- Mỗi dòng 01 căn cứ, sinh 01 đoạn in nghiêng theo thứ tự nhập; bỏ dòng trống.<br>- Mỗi dòng kết thúc bằng dấu `;`. | `Căn cứ Điều 44 Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14...;` |
| 5 | Xét đề nghị (6) | `##HoTenNguoiGiaiQuyetBoiThuong##` | Hệ thống tự lấy theo hồ sơ vụ việc (Giải quyết yêu cầu bồi thường > Cử người giải quyết bồi thường) | - (không có trường trên giao diện) | Hệ thống tự lấy họ tên cán bộ giải quyết bồi thường được cử của vụ việc theo `Mã vụ việc` đã chọn trên MH20.<br>- Vụ việc chưa có cán bộ được cử: để dòng chấm `……`.<br>- Dòng "Xét đề nghị của Ông/Bà ...," kết thúc bằng dấu `,`. | `Phạm Minh Đức` |
| 6 | Điều 1 (5) | `##TenNguoiYeuCauBoiThuong##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Họ và tên/Tên tổ chức | Theo giá trị trường `Họ và tên/Tên tổ chức` trên giao diện.<br>- Cá nhân: tiền tố `Ông/Bà`; Tổ chức: không có tiền tố (Phần I mục 4). | `Ông/Bà Trịnh Văn Hải` |
| 7 | Điều 1 (7) | `##SoDinhDanhNguoiYeuCauBoiThuong##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế/Mã số của tổ chức | Theo giá trị trường `Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế/Mã số của tổ chức` trên giao diện. | `001082003377` |
| 8 | Điều 1 (8) | `##DiaChiNguoiYeuCauBoiThuong##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Địa chỉ (Khối Thông tin người yêu cầu bồi thường) | Theo giá trị trường `Địa chỉ` của Khối Thông tin người yêu cầu bồi thường trên giao diện. | `Số 9 phố Hàng Chuối, Phường Hai Bà Trưng, Thành phố Hà Nội, Việt Nam` |
| 9 | Điều 1 | `##SoTienTamUng##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Số tiền tạm ứng kinh phí bồi thường (đồng) | Theo giá trị trường `Số tiền tạm ứng kinh phí bồi thường (đồng)` trên giao diện.<br>Định dạng phân cách hàng nghìn bằng dấu chấm. | `60.000.000` |
| 10 | Điều 1 | `##SoTienTamUngBangChu##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Viết bằng chữ | Theo giá trị trường `Viết bằng chữ` trên giao diện.<br>- Viết hoa chữ cái đầu, kết thúc bằng "đồng" (Phần I mục 3). | `Sáu mươi triệu đồng` |
| 11 | Điều 1 | `##TyLeTamUng##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Tỷ lệ tạm ứng trên tổng số tiền thiệt hại (%) | Theo giá trị trường `Tỷ lệ tạm ứng trên tổng số tiền thiệt hại (%)` trên giao diện.<br>- Cách tính trên giao diện: `Số tiền tạm ứng` = (`Thiệt hại về tinh thần` + `Thiệt hại khác có thể tính được ngay mà không cần xác minh`) × `Tỷ lệ` / 100, làm tròn đến đồng; cán bộ sửa `Số tiền tạm ứng` thì `Tỷ lệ` = `Số tiền tạm ứng` / tổng 02 khoản × 100; tổng 02 khoản = 0 thì giữ nguyên `Tỷ lệ`.<br>- Định dạng: tối đa 02 chữ số thập phân, bỏ số 0 thừa, dấu phẩy thập phân. | `75` hoặc `41,67` |
| 12 | Điều 1 | `##ThietHaiTinhThan##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Thiệt hại về tinh thần (đồng) | Theo giá trị trường `Thiệt hại về tinh thần (đồng)` trên giao diện.<br>Định dạng phân cách hàng nghìn bằng dấu chấm. | `50.000.000` |
| 13 | Điều 1 | `##ThietHaiKhacTinhDuocNgay##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Thiệt hại khác có thể tính được ngay mà không cần xác minh (đồng) | Theo giá trị trường `Thiệt hại khác có thể tính được ngay mà không cần xác minh (đồng)` trên giao diện.<br>Định dạng phân cách hàng nghìn bằng dấu chấm. | `30.000.000` |
| 14 | Điều 2 | Khối Điều 2 | - | - | Chỉ sinh khi Người nhận tạm ứng khác Người yêu cầu bồi thường (Ghi chú điều kiện Điều 2); không sinh thì đánh số lại các Điều sau. | - |
| 15 | Điều 2 (9) | `##HoTenNguoiNhanTamUng##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Họ và tên người nhận tạm ứng kinh phí bồi thường | Theo giá trị trường `Họ và tên người nhận tạm ứng kinh phí bồi thường` trên giao diện. | `Trịnh Thị Hoa` |
| 16 | Điều 2 (10) | `##SoDinhDanhNguoiNhanTamUng##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế (Khối Thông tin người nhận tiền bồi thường) | Theo giá trị trường `Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế` của Khối Thông tin người nhận tiền bồi thường trên giao diện.<br>- Chỉ in số giấy tờ. | `001195008866` |
| 17 | Điều 2 (11) | `##DiaChiNguoiNhanTamUng##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Địa chỉ (Khối Thông tin người nhận tiền bồi thường) | Theo giá trị trường `Địa chỉ` của Khối Thông tin người nhận tiền bồi thường trên giao diện. | `Số 9 phố Hàng Chuối, Phường Hai Bà Trưng, Thành phố Hà Nội, Việt Nam` |
| 18 | Điều 3 (Điều 2 khi không có Điều 2) (12) | `##PhuongThucChiTamUng##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Phương thức nhận tiền; Cơ quan chi trả tiền mặt; Chủ tài khoản; Số tài khoản ngân hàng; Tên ngân hàng; Chi nhánh ngân hàng | Theo giá trị trường `Phương thức nhận tiền` trên giao diện:<br>- `Nhận tiền mặt`: `chi trực tiếp bằng tiền mặt cho người nhận tạm ứng kinh phí bồi thường tại trụ sở [Cơ quan chi trả tiền mặt]`.<br>- `Nhận qua chuyển khoản`: `chi qua chuyển khoản vào tài khoản số [Số tài khoản ngân hàng], chủ tài khoản: [Chủ tài khoản], nơi mở tài khoản: [Tên ngân hàng] - [Chi nhánh ngân hàng]`; Chi nhánh trống thì bỏ ` - [Chi nhánh ngân hàng]`. | `chi qua chuyển khoản vào tài khoản số 0011002233445, chủ tài khoản: Lê Thị Minh Thu, nơi mở tài khoản: Vietcombank - Chi nhánh Thành Công` |
| 19 | Điều 5 (Điều 4 khi không có Điều 2) (5), (9) | `##DoiTuongThiHanh##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH20 - Màn hình Tạo Quyết định tạm ứng kinh phí | Họ và tên/Tên tổ chức; Họ và tên người nhận tạm ứng kinh phí bồi thường | Theo giá trị trường `Họ và tên/Tên tổ chức` trên giao diện (tiền tố như dòng 6).<br>- Có Điều 2: thêm `, Ông/Bà [Họ và tên người nhận tạm ứng kinh phí bồi thường]`. | `Ông/Bà Trịnh Văn Hải, Ông/Bà Trịnh Thị Hoa` |
| 20 | Nơi nhận (13) | `##NoiNhan##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH21 - Popup Trình ký Quyết định tạm ứng kinh phí | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống.<br>- Không có Điều 2: thay "Như Điều 5" bằng "Như Điều 4". | `- Như Điều 5;`<br>`- Sở Tư pháp Thành phố Hà Nội;`<br>`- Lưu: VT, HSVV.` |
| 21 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > MH21 - Popup Trình ký Quyết định tạm ứng kinh phí (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện. | `Nguyễn Văn An` |

---

### 7. MẪU SỐ 08/BTNN: THÔNG BÁO YÊU CẦU CUNG CẤP TÀI LIỆU, CHỨNG CỨ PHỤC VỤ XÁC MINH THIỆT HẠI
- **Tên tệp template**: `Mau_08_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người yêu cầu bồi thường bổ sung tài liệu, chứng cứ phục vụ xác minh thiệt hại theo khoản 1 Điều 45 Luật TNBTCNN.
- **Màn hình kích hoạt**: Chưa có chức năng sinh văn bản Mẫu 08/BTNN trên giao diện (bước Xác minh thiệt hại của Giải quyết yêu cầu bồi thường). Các dòng ghi `(chưa có trường trên giao diện)` cần bổ sung khi thiết kế chức năng.
- **Quy tắc đặt tên file tải về**: `Mau_08_BTNN_Thong_bao_cung_cap_tai_lieu_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (1), (5), `##DiaDanh##` (2), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Nơi nhận `- Như trên;` / `- Lưu: VT, HSVV.`

#### Bảng mapping chi tiết Mẫu 08/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | - | Số, ký hiệu văn bản (chưa có trường trên giao diện) | Theo giá trị trường `Số, ký hiệu văn bản` của popup sinh văn bản Mẫu 08/BTNN. | `32/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | - | Ngày văn bản (chưa có trường trên giao diện) | Theo giá trị trường `Ngày văn bản` của popup sinh văn bản Mẫu 08/BTNN.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 25 tháng 03 năm 2026` |
| 3 | Kính gửi (3) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Bùi Văn Hùng` |
| 4 | Dưới Kính gửi (4) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Số 15 đường Trần Hưng Đạo, Phường Phủ Lý, Tỉnh Ninh Bình` |
| 5 | Dưới Địa chỉ | `##SoDienThoaiNguoiYeuCau##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Số điện thoại | Theo giá trị trường `Số điện thoại` trên giao diện. | `0912345678` |
| 6 | Đoạn 1 | `##NgayTiepNhan##` | Tiếp nhận hồ sơ | Thời điểm tiếp nhận | Theo phần ngày của giá trị trường `Thời điểm tiếp nhận` trên giao diện.<br>Định dạng: `dd tháng mm năm yyyy` (câu mẫu đã có chữ "Ngày"). | `05 tháng 03 năm 2026` |
| 7 | Đoạn 4 (6) | `##DanhSachTaiLieuChungCuYeuCau##` | - | Tài liệu, chứng cứ yêu cầu bổ sung (chưa có trường trên giao diện) | Mỗi dòng 01 tài liệu, sinh 01 đoạn dạng `[STT]. [Tên, loại giấy tờ, tài liệu chứng cứ]`; bỏ dòng trống. | `1. Bệnh án điều trị ngoại trú số 452/BA`<br>`2. Hóa đơn, phiếu thu viện phí` |

---

### 8. MẪU SỐ 18/BTNN: QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_18_BTNN_Template.docx`
- **Mục đích**: Quyết định giải quyết bồi thường chính thức của cơ quan giải quyết bồi thường sau khi kết thúc thương lượng hoặc theo các trường hợp quy định tại khoản 1 Điều 47 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường > MH02b - Popup Trình ký Quyết định giải quyết bồi thường*.
- **Quy tắc đặt tên file tải về**: `Mau_18_BTNN_Quyet_dinh_giai_quyet_BTNN_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).

#### Bảng mapping chi tiết Mẫu 18/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quyết định giải quyết bồi thường > MH02b - Popup Trình ký Quyết định giải quyết bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `18/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quyết định giải quyết bồi thường > MH02b - Popup Trình ký Quyết định giải quyết bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 28 tháng 03 năm 2026` |
| 3 | Căn cứ | `##CanCu##` | Quyết định giải quyết bồi thường > MH02b - Popup Trình ký Quyết định giải quyết bồi thường | Căn cứ | Theo giá trị trường `Căn cứ` trên giao diện.<br>- Mỗi dòng 01 căn cứ, sinh 01 đoạn theo thứ tự nhập; bỏ dòng trống.<br>- Dòng cuối kết thúc bằng dấu `,`, các dòng khác bằng dấu `;`.<br>- Trường để trống: giữ các dòng chấm (4), (5), (6) của mẫu. | `Căn cứ Điều 47 Luật Trách nhiệm bồi thường của Nhà nước...;` |
| 4 | Điều 1, Điều 6 (7) | `##TenNguoiYeuCauBoiThuong##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Khối Thông tin người yêu cầu bồi thường) | Họ và tên | Theo giá trị trường `Họ và tên` trên giao diện. | `Nguyễn Văn Nam` |
| 5 | Điều 1 (8) | `##DiaChiNguoiYeuCauBoiThuong##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Khối Thông tin người yêu cầu bồi thường) | Địa chỉ | Theo giá trị trường `Địa chỉ` trên giao diện. | `Số 12 phố Hàng Bông, Phường Hoàn Kiếm, Thành phố Hà Nội` |
| 6 | Điều 1 | `##TongSoTienBoiThuong##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường | Tổng số tiền bồi thường (VNĐ) | Theo giá trị trường `Tổng số tiền bồi thường (VNĐ)` trên giao diện.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm (Phần I mục 3). | `350.000.000` |
| 7 | Điều 1 | `##TongSoTienBoiThuongBangChu##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường | Tổng số tiền bồi thường (VNĐ) | Theo giá trị trường `Tổng số tiền bồi thường (VNĐ)` trên giao diện, chuyển thành chữ (Phần I mục 3). | `Ba trăm năm mươi triệu đồng` |
| 8 | Điều 1 - Trong đó gồm | `##ThietHaiTaiSan##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Mức bồi thường (đ) | Tổng cột `Mức bồi thường (đ)` của các mục chi tiết thuộc nhóm `I. Thiệt hại do tài sản bị xâm phạm (mã TH_TS)` trong Bảng nội dung đề xuất bồi thường (bảng 02 cấp theo Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]).<br>- Không có mục thuộc nhóm: `0`.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `50.000.000` |
| 9 | Điều 1 - Trong đó gồm | `##ThietHaiThuNhap##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Mức bồi thường (đ) | Tổng cột `Mức bồi thường (đ)` của các mục chi tiết thuộc nhóm `II. Thiệt hại do thu nhập thực tế bị mất hoặc bị giảm sút (mã TH_TN)` trong Bảng nội dung đề xuất bồi thường (bảng 02 cấp theo Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]).<br>- Không có mục thuộc nhóm: `0`.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `120.000.000` |
| 10 | Điều 1 - Trong đó gồm | `##ThietHaiDoNguoiBiThietHaiChet##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Mức bồi thường (đ) | Tổng cột `Mức bồi thường (đ)` của các mục chi tiết thuộc nhóm `III. Thiệt hại về vật chất do người bị thiệt hại chết (mã TH_CHET)` trong Bảng nội dung đề xuất bồi thường (bảng 02 cấp theo Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]).<br>- Không có mục thuộc nhóm: `0`.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `0` |
| 11 | Điều 1 - Trong đó gồm | `##ThietHaiDoSucKhoeBiXamPham##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Mức bồi thường (đ) | Tổng cột `Mức bồi thường (đ)` của các mục chi tiết thuộc nhóm `IV. Thiệt hại về vật chất do sức khỏe bị xâm phạm (mã TH_SK)` trong Bảng nội dung đề xuất bồi thường (bảng 02 cấp theo Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]).<br>- Không có mục thuộc nhóm: `0`.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `0` |
| 12 | Điều 1 - Trong đó gồm | `##ThietHaiTinhThan##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Mức bồi thường (đ) | Tổng cột `Mức bồi thường (đ)` của các mục chi tiết thuộc nhóm `V. Thiệt hại về tinh thần (mã TH_TT)` trong Bảng nội dung đề xuất bồi thường (bảng 02 cấp theo Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]).<br>- Không có mục thuộc nhóm: `0`.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `150.000.000` |
| 13 | Điều 1 - Trong đó gồm | `##ThietHaiKhac##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Mức bồi thường (đ) | Tổng cột `Mức bồi thường (đ)` của các mục thuộc nhóm `VI. Các chi phí khác được bồi thường` (mã TH_CPK) và nhóm `VII. Các thiệt hại khác` (mã TH_KHAC) trong Bảng nội dung đề xuất bồi thường.<br>- Không tạo biến riêng cho nhóm VII; không đổi câu chữ mẫu.<br>- Không có mục: `0`.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `30.000.000` |
| 14 | Điều 1 | `##SoTienDaTamUng##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường | Số tiền bồi thường đã tạm ứng (VNĐ) | Theo giá trị trường `Số tiền bồi thường đã tạm ứng (VNĐ)` trên giao diện.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `50.000.000` |
| 15 | Điều 1 | `##SoTienDaTamUngBangChu##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường | Số tiền bồi thường đã tạm ứng (VNĐ) | Theo giá trị trường `Số tiền bồi thường đã tạm ứng (VNĐ)` trên giao diện, chuyển thành chữ (Phần I mục 3). | `Năm mươi triệu đồng` |
| 16 | Điều 1 | `##SoTienConLaiPhaiChiTra##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường | Số tiền bồi thường còn lại sau khi đã tạm ứng (VNĐ) | Theo giá trị trường `Số tiền bồi thường còn lại sau khi đã tạm ứng (VNĐ)` trên giao diện.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `300.000.000` |
| 17 | Điều 1 | `##SoTienConLaiBangChu##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường | Số tiền bồi thường còn lại sau khi đã tạm ứng (VNĐ) | Theo giá trị trường `Số tiền bồi thường còn lại sau khi đã tạm ứng (VNĐ)` trên giao diện, chuyển thành chữ (Phần I mục 3). | `Ba trăm triệu đồng` |
| 18 | Điều 1 - câu "Trong đó có các nội dung ..." | `##NoiDungThuongLuongThanh##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Trạng thái thương lượng | Ghép giá trị cột `Thiệt hại yêu cầu bồi thường` của các dòng có `Trạng thái thương lượng` = `Thành công`, nối bằng `, `.<br>- Quyết định không lập từ kết quả thương lượng: `kết quả xác minh thống nhất`. | `Tài sản bị xâm phạm, Thiệt hại về tinh thần` |
| 19 | Điều 1 - câu "Trong đó có các nội dung ..." | `##NoiDungThuongLuongKhongThanh##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Bảng nội dung đề xuất bồi thường) | Thiệt hại yêu cầu bồi thường; Trạng thái thương lượng | Ghép giá trị cột `Thiệt hại yêu cầu bồi thường` của các dòng có `Trạng thái thương lượng` = `Không thành`, nối bằng `, `.<br>- Không có dòng `Không thành`: bỏ cụm `; nội dung ##NoiDungThuongLuongKhongThanh## thương lượng không thành`. | `Thu nhập thực tế bị mất/giảm sút` |
| 20 | Điều 2 (9) | `##PhuongThucChiTraBoiThuong##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường (Khối Người nhận tiền bồi thường, Khối Phương thức chi trả tiền bồi thường) | Phương thức nhận tiền; Cơ quan / Địa chỉ chi trả tiền mặt; Họ và tên người nhận; Số định danh cá nhân/CCCD; Số tài khoản ngân hàng; Tên ngân hàng; Chi nhánh ngân hàng; Chủ tài khoản | Theo giá trị trường `Phương thức nhận tiền` trên giao diện:<br>- `Nhận tiền mặt`: `chi trả trực tiếp bằng tiền mặt tại [Cơ quan / Địa chỉ chi trả tiền mặt], người nhận: [Họ và tên người nhận], số định danh cá nhân/CCCD: [Số định danh cá nhân/CCCD]`.<br>- `Nhận qua chuyển khoản`: `chuyển khoản vào tài khoản số [Số tài khoản ngân hàng] mở tại [Tên ngân hàng] - [Chi nhánh ngân hàng], chủ tài khoản: [Chủ tài khoản]`; Chi nhánh trống thì bỏ ` - [Chi nhánh ngân hàng]`.<br>- `[...]`: theo giá trị trường cùng tên trên giao diện. | `chuyển khoản vào tài khoản số 001100222333 mở tại Vietcombank - Chi nhánh Thăng Long, chủ tài khoản: Nguyễn Văn Nam` |
| 21 | Điều 3 (10) | `##QuyenLoiIchHopPhapKhac##` | - | - (không có trường trên giao diện) | Giao diện chưa có trường nhập quyền, lợi ích hợp pháp khác được khôi phục (Điều 29 Luật TNBTCNN); in `Không có`. | `Không có` |
| 22 | Điều 5 (11) | `##ThoiDiemHieuLucQuyetDinh##` | Quyết định giải quyết bồi thường > MH02 - Màn hình Lập/Cập nhật Quyết định giải quyết bồi thường | Thời điểm có hiệu lực | Theo giá trị trường `Thời điểm có hiệu lực` trên giao diện.<br>- Khi chọn vụ việc, trường được tự điền: có tích `Thỏa thuận hiệu lực sớm hơn của Quyết định giải quyết bồi thường` tại Kết quả thương lượng thì lấy nội dung thỏa thuận; không tích thì `60 ngày kể từ ngày người yêu cầu bồi thường nhận được quyết định`.<br>- Viết thường chữ cái đầu. | `kể từ ngày ký` |
| 23 | Nơi nhận (12), (13) | `##NoiNhan##` | Quyết định giải quyết bồi thường > MH02b - Popup Trình ký Quyết định giải quyết bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống. | `- Như Điều 6;`<br>`- Sở Tư pháp Thành phố Hà Nội;`<br>`- Ông Vũ Đình Trọng;`<br>`- Lưu: VT, HSVV.` |

---

### 9. MẪU SỐ 20/BTNN: QUYẾT ĐỊNH HỦY QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_20_BTNN_Template.docx`
- **Mục đích**: Hủy quyết định giải quyết bồi thường đã ban hành khi có một trong các căn cứ theo Điều 48 Luật TNBTCNN (để đình chỉ giải quyết hoặc giải quyết lại vụ việc).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quyết định giải quyết bồi thường > Thao tác "Hủy QĐ" (tại Danh sách hoặc Xem chi tiết Quyết định) > Popup Hủy Quyết định giải quyết bồi thường*.
- **Quy tắc đặt tên file tải về**: `Mau_20_BTNN_Quyet_dinh_huy_QDGQBT_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).

#### Bảng mapping chi tiết Mẫu 20/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quyết định giải quyết bồi thường > Popup Hủy Quyết định giải quyết bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `20/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quyết định giải quyết bồi thường > Popup Hủy Quyết định giải quyết bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 10 tháng 04 năm 2026` |
| 3 | Căn cứ | `##CanCu##` | Quyết định giải quyết bồi thường > Popup Hủy Quyết định giải quyết bồi thường | Căn cứ | Theo giá trị trường `Căn cứ` trên giao diện.<br>- Mỗi dòng sinh 01 đoạn căn cứ theo thứ tự nhập; bỏ dòng trống. | `Căn cứ khoản 3, 3a và 5 Điều 48 Luật Trách nhiệm bồi thường của Nhà nước năm 2017 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16);`<br>`Căn cứ văn bản xác định trường hợp hủy số 45/KL-TTr ngày 10/02/2026 của Thanh tra Bộ Tư pháp,` |
| 4 | Điều 1 | `##SoQDGiaiQuyetBiHuy##` | Quyết định giải quyết bồi thường > Danh sách / Xem chi tiết Quyết định (Quyết định bị hủy) | Số quyết định | Số quyết định của bản ghi Quyết định giải quyết bồi thường đang được chọn khi bấm thao tác `Hủy QĐ` (tại lưới danh sách hoặc màn Xem chi tiết Quyết định). | `18/QĐ-STP` |
| 5 | Điều 1 | `##NgayBanHanhQDBiHuy##` | Quyết định giải quyết bồi thường > Danh sách / Xem chi tiết Quyết định (Quyết định bị hủy) | Ngày quyết định (Danh sách) / Ngày ban hành (Xem chi tiết) | Ngày ban hành của bản ghi Quyết định giải quyết bồi thường đang được chọn khi bấm thao tác `Hủy QĐ`.<br>Định dạng `dd/mm/yyyy`. | `15/01/2026` |
| 6 | Điều 1 | `##CoQuanBanHanhQDBiHuy##` | Quyết định giải quyết bồi thường > Danh sách / Xem chi tiết Quyết định (Quyết định bị hủy) | Cơ quan ban hành | Nối `Chức vụ của người đứng đầu cơ quan` + " " + `Cơ quan ban hành` của bản ghi Quyết định giải quyết bồi thường đang được chọn khi bấm thao tác `Hủy QĐ`.<br>- Chức vụ của người đứng đầu cơ quan: chức vụ đầu tiên trong danh mục Chức vụ [DM_58] của cơ quan ban hành. | `Giám đốc Sở Tư pháp Thành phố Hà Nội` |
| 7 | Điều 1 | `##LyDoHuyQuyetDinh##` | Quyết định giải quyết bồi thường > Popup Hủy Quyết định giải quyết bồi thường | Lý do hủy Quyết định | Theo giá trị trường `Lý do hủy Quyết định` trên giao diện. | `có hành vi cố ý làm sai lệch hồ sơ giải quyết bồi thường dẫn đến xác định sai mức thiệt hại` |
| 8 | Điều 2 | `##HauQuaPhapLyVaBienPhapXuLy##` | Quyết định giải quyết bồi thường > Popup Hủy Quyết định giải quyết bồi thường | Hậu quả pháp lý và biện pháp xử lý | Theo giá trị trường `Hậu quả pháp lý và biện pháp xử lý` trên giao diện.<br>- Dòng đầu điền trước cụm "đối với vụ việc yêu cầu bồi thường của Ông/Bà ..."; các dòng sau là đoạn tiếp theo của Điều 2; bỏ dòng trống. | `Hoàn trả số tiền đã chi trả theo Quyết định bị hủy và giải quyết lại yêu cầu bồi thường` |
| 9 | Điều 2, Điều 4 | `##TenNguoiYeuCauBoiThuong##` | Quyết định giải quyết bồi thường > Danh sách / Xem chi tiết Quyết định (Quyết định bị hủy) | Người yêu cầu | Họ và tên người yêu cầu bồi thường của bản ghi Quyết định giải quyết bồi thường đang được chọn khi bấm thao tác `Hủy QĐ`. | `Trần Thị Mai` |
| 10 | Nơi nhận | `##NoiNhan##` | Quyết định giải quyết bồi thường > Popup Hủy Quyết định giải quyết bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống. | `- Như Điều 4;`<br>`- Sở Tư pháp Thành phố Hà Nội;`<br>`- Ông Vũ Đình Trọng;`<br>`- Lưu: VT, HSVV.` |

- Hiệu lực cố định trong mẫu: kể từ ngày ký (Điều 3: "Quyết định này có hiệu lực kể từ ngày ký."); không dùng biến.

---

### 10. MẪU SỐ 21/BTNN: QUYẾT ĐỊNH SỬA CHỮA, BỔ SUNG QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_21_BTNN_Template.docx`
- **Mục đích**: Sửa đổi, bổ sung lỗi kỹ thuật, sai sót số liệu, tài khoản ngân hàng hoặc nội dung câu chữ trong Quyết định GQBT mà không làm thay đổi bản chất vụ việc.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quyết định giải quyết bồi thường > Thao tác "Sửa chữa, bổ sung QĐ" > Popup Trình ký Quyết định Sửa chữa, Bổ sung Quyết định giải quyết bồi thường*.
- **Quy tắc đặt tên file tải về**: `Mau_21_BTNN_Quyet_dinh_sua_chua_bo_sung_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Căn cứ `Căn cứ khoản 4, 5 Điều 48 Luật Trách nhiệm bồi thường của Nhà nước năm 2017,` theo mẫu.

#### Bảng mapping chi tiết Mẫu 21/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Quyết định giải quyết bồi thường > Popup Trình ký Quyết định Sửa chữa, Bổ sung Quyết định giải quyết bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `21/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quyết định giải quyết bồi thường > Popup Trình ký Quyết định Sửa chữa, Bổ sung Quyết định giải quyết bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 12 tháng 04 năm 2026` |
| 3 | Điều 1 | `##SoQDDuocSuaDoiBoSung##` | Quyết định giải quyết bồi thường > Chi tiết Quyết định (Quyết định được sửa chữa, bổ sung) | Số quyết định | Số, ký hiệu của Quyết định giải quyết bồi thường được sửa chữa, bổ sung. | `18/QĐ-STP` |
| 4 | Điều 1 | `##NgayBanHanhQDCu##` | Quyết định giải quyết bồi thường > Chi tiết Quyết định (Quyết định được sửa chữa, bổ sung) | Ngày ban hành | Định dạng `dd/mm/yyyy`. | `20/01/2026` |
| 5 | Điều 1 | `##CoQuanBanHanhQDCu##` | Quyết định giải quyết bồi thường > Chi tiết Quyết định (Quyết định được sửa chữa, bổ sung) | Cơ quan ban hành | Tên cơ quan ban hành Quyết định giải quyết bồi thường được sửa chữa, bổ sung. | `Sở Tư pháp Thành phố Hà Nội` |
| 6 | Điều 1 - đoạn (4), (5) | `##NoiDungSuaChuaBoSung##` | Quyết định giải quyết bồi thường > Popup Trình ký Quyết định Sửa chữa, Bổ sung Quyết định giải quyết bồi thường | Nội dung sửa chữa, bổ sung | Theo giá trị trường `Nội dung sửa chữa, bổ sung` trên giao diện.<br>- Mỗi dòng sinh 01 đoạn theo thứ tự nhập; bỏ dòng trống. | `Tại dòng thứ 5 trang 2 Điều 2 của Quyết định số 18/QĐ-STP đã ghi: số tài khoản 0123456789`<br>`Nay sửa chữa, bổ sung như sau: số tài khoản 0123456788` |
| 7 | Điều 2 | `##NgayCoHieuLuc##` | Quyết định giải quyết bồi thường > Popup Trình ký Quyết định Sửa chữa, Bổ sung Quyết định giải quyết bồi thường | Hiệu lực của Quyết định | Theo giá trị trường `Hiệu lực của Quyết định` (nhập text) trên giao diện.<br>- Mặc định: hiệu lực của Quyết định giải quyết bồi thường gốc; không có thì `60 ngày kể từ ngày người yêu cầu bồi thường nhận được quyết định`.<br>- Câu trong mẫu: `Quyết định này có hiệu lực ##NgayCoHieuLuc##.`; điền nguyên nội dung đã nhập, viết thường chữ cái đầu. | `kể từ ngày ký` |
| 8 | Điều 3 - (6) | `##TenNguoiYeuCauBoiThuong##` | Quyết định giải quyết bồi thường > Chi tiết Quyết định (Quyết định được sửa chữa, bổ sung) | Người yêu cầu bồi thường | Họ và tên người yêu cầu bồi thường của Quyết định được sửa chữa, bổ sung. | `Trần Thị Mai` |
| 9 | Nơi nhận | `##NoiNhan##` | Quyết định giải quyết bồi thường > Popup Trình ký Quyết định Sửa chữa, Bổ sung Quyết định giải quyết bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống. | `- Như Điều 3;`<br>`- Sở Tư pháp Thành phố Hà Nội;`<br>`- Ông Vũ Đình Trọng;`<br>`- Lưu: VT, HSVV.` |

---

### 11. MẪU SỐ 22/BTNN: QUYẾT ĐỊNH HOÃN GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_22_BTNN_Template.docx`
- **Mục đích**: Cơ quan giải quyết bồi thường quyết định hoãn giải quyết yêu cầu bồi thường theo khoản 1 Điều 49 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Thao tác khác "Hoãn giải quyết" > Popup Trình duyệt Hoãn giải quyết bồi thường* (hoặc `Cập nhật` hồ sơ `Bị trả lại` có Loại trình `Hoãn giải quyết bồi thường`; nút `Xem trước văn bản`).
- **Lưu và ban hành**: Văn bản sinh khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 22/BTNN`; văn bản lưu cùng phiếu trình `Hoãn giải quyết bồi thường` và được Lãnh đạo cấp cuối ký số khi Ký duyệt. Hình thức `Ký ngoài`: chỉ tải lên văn bản PDF đã ký và đóng dấu, không sinh văn bản theo mẫu.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: `ngày…/…/….` tại câu "Xét đề nghị hoãn giải quyết yêu cầu bồi thường của Ông/Bà … ngày…/…/….," giữ nguyên dấu chấm (giao diện không có trường ngày đề nghị hoãn).
- **Quy tắc đặt tên file tải về**: `Mau_22_BTNN_Quyet_dinh_hoan_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 22/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Hoãn giải quyết bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `22/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Hoãn giải quyết bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện. Định dạng trên mẫu: `ngày dd tháng mm năm yyyy` | `ngày 10 tháng 03 năm 2026` |
| 3 | Căn cứ (Xét đề nghị), Điều 1, Điều 4 (4) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Đỗ Quốc Hưng` |
| 4 | Điều 1 | `##LyDoHoanGiaiQuyet##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Hoãn giải quyết bồi thường | Lý do hoãn giải quyết | (5) Theo giá trị trường `Lý do hoãn giải quyết` trên giao diện. | `người yêu cầu bồi thường bị ốm nặng phải điều trị nội trú tại bệnh viện` |
| 5 | Điều 2 | `##ThoiHanHoan##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Hoãn giải quyết bồi thường | Thời hạn hoãn (ngày) | Theo giá trị trường `Thời hạn hoãn (ngày)` trên giao diện (số ngày tính từ `Từ ngày` đến `Đến ngày`, tính cả ngày đầu và ngày cuối). | `30` |
| 6 | Điều 2 | `##TuNgayHoan##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Hoãn giải quyết bồi thường | Từ ngày | Theo giá trị trường `Từ ngày` trên giao diện. Định dạng `dd/mm/yyyy` | `01/11/2026` |
| 7 | Điều 2 | `##DenNgayHoan##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Hoãn giải quyết bồi thường | Đến ngày | Theo giá trị trường `Đến ngày` trên giao diện. Định dạng `dd/mm/yyyy` | `30/11/2026` |
| 8 | Nơi nhận (6), (7), (8) | `##NoiNhan##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Hoãn giải quyết bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện. Mỗi dòng là 01 nơi nhận. | `- Như Điều 4;`<br>`- Sở Tư pháp thành phố Hà Nội;`<br>`- Lê Thị Dung;`<br>`- Vũ Đình Trọng;`<br>`- Lưu: VT, HSVV.` |

---

### 12. MẪU SỐ 23/BTNN: QUYẾT ĐỊNH TIẾP TỤC GIẢI QUYẾT BỒI THƯỜNG
- **Tên tệp template**: `Mau_23_BTNN_Template.docx`
- **Mục đích**: Ban hành quyết định tiếp tục giải quyết bồi thường khi lý do hoãn (khoản 3 Điều 49) hoặc lý do tạm đình chỉ (khoản 2, khoản 3 Điều 50 Luật TNBTCNN) không còn.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Thao tác khác "Tiếp tục giải quyết" > Popup Trình ký Quyết định tiếp tục giải quyết bồi thường* (hồ sơ `Hoãn giải quyết`, `Tạm đình chỉ`, hoặc `Cập nhật` hồ sơ `Bị trả lại` có Loại trình `Tiếp tục giải quyết bồi thường`; nút `Xem trước văn bản`).
- **Lưu và ban hành**: Văn bản sinh khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 23/BTNN`; văn bản lưu cùng phiếu trình `Tiếp tục giải quyết bồi thường` và được Lãnh đạo cấp cuối ký số khi Ký duyệt. Hình thức `Ký ngoài`: chỉ tải lên văn bản PDF đã ký và đóng dấu, không sinh văn bản theo mẫu.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Quy tắc đặt tên file tải về**: `Mau_23_BTNN_Quyet_dinh_tiep_tuc_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 23/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định tiếp tục giải quyết bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `23/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định tiếp tục giải quyết bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện. Định dạng trên mẫu: `ngày dd tháng mm năm yyyy` | `ngày 10 tháng 04 năm 2026` |
| 3 | Căn cứ (4) | `##CanCuTiepTucGiaiQuyet##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định tiếp tục giải quyết bồi thường | Căn cứ | Theo giá trị trường `Căn cứ` trên giao diện. | `khoản 3 Điều 49` |
| 4 | Căn cứ, Điều 2 (5) | `##LoaiQDHoanTamDinhChi##` | Giải quyết yêu cầu bồi thường > Danh sách vụ việc | Trạng thái vụ việc | Theo giá trị trường `Trạng thái vụ việc` khi mở popup:<br>- `Hoãn giải quyết`: `hoãn`.<br>- `Tạm đình chỉ`: `tạm đình chỉ`. | `hoãn` |
| 5 | Căn cứ, Điều 2 (5) | `##SoQDHoanTamDinhChi##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định tiếp tục giải quyết bồi thường | Số QĐ hoãn giải quyết bồi thường / Số QĐ tạm đình chỉ giải quyết bồi thường | Theo giá trị trường `Số QĐ hoãn giải quyết bồi thường` / `Số QĐ tạm đình chỉ giải quyết bồi thường` trên giao diện. | `15/QĐ-STP` |
| 6 | Căn cứ, Điều 2 (5) | `##NgayQDHoanTamDinhChi##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định tiếp tục giải quyết bồi thường | Ngày QĐ hoãn giải quyết bồi thường / Ngày QĐ tạm đình chỉ giải quyết bồi thường | Theo giá trị trường `Ngày QĐ hoãn giải quyết bồi thường` / `Ngày QĐ tạm đình chỉ giải quyết bồi thường` trên giao diện. Định dạng: `dd/mm/yyyy` | `12/03/2026` |
| 7 | Căn cứ (5) | `##CoQuanBanHanhQDHoanTamDinhChi##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Tên cơ quan, đơn vị | Tên cơ quan giải quyết bồi thường của vụ việc. | `Sở Tư pháp thành phố Hà Nội` |
| 8 | Điều 1, Điều 3 (6) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Đỗ Quốc Hưng` |
| 9 | Điều 1 (7) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Số 5 phố Huế, Phường Hai Bà Trưng, Thành phố Hà Nội` |
| 10 | Nơi nhận (8), (9), (10) | `##NoiNhan##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định tiếp tục giải quyết bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện. Mỗi dòng là 01 nơi nhận. | `- Như Điều 3;`<br>`- Sở Tư pháp thành phố Hà Nội;`<br>`- Lê Thị Dung;`<br>`- Vũ Đình Trọng;`<br>`- Lưu: VT, HSVV.` |

---

### 13. MẪU SỐ 24/BTNN: QUYẾT ĐỊNH TẠM ĐÌNH CHỈ GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_24_BTNN_Template.docx`
- **Mục đích**: Tạm dừng việc giải quyết yêu cầu bồi thường khi phát sinh các trường hợp theo quy định tại Điều 50 Luật TNBTCNN (chờ kết quả xác minh cơ quan khác, xem xét lại văn bản làm căn cứ...).
- **Màn hình kích hoạt**: Giải quyết yêu cầu bồi thường > Popup Trình duyệt Tạm đình chỉ giải quyết bồi thường; popup hiện chỉ cho phép `Tải lên từ máy`, chưa có tùy chọn `Sinh văn bản theo mẫu 24/BTNN`. Các dòng ghi `(chưa có trường trên giao diện)` cần bổ sung khi thiết kế chức năng.
- **Quy tắc đặt tên file tải về**: `Mau_24_BTNN_Quyet_dinh_tam_dinh_chi_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##TenCoQuanQuanLyNhaNuocBTNN##` (7), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Nơi nhận `- Như Điều 3;` / `- ##TenCoQuanQuanLyNhaNuocBTNN##;` / `- ##HoTenNguoiGiaiQuyet##;` / `- ##TenNguoiThiHanhCongVuGayThietHai##;` / `- Lưu: VT, HSVV.`

#### Bảng mapping chi tiết Mẫu 24/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | - | Số, ký hiệu văn bản (chưa có trường trên giao diện) | Theo giá trị trường `Số, ký hiệu văn bản` của popup sinh văn bản Mẫu 24/BTNN. | `24/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Tạm đình chỉ giải quyết bồi thường | Ngày tạm đình chỉ | Theo giá trị trường `Ngày tạm đình chỉ` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 15 tháng 03 năm 2026` |
| 3 | Điều 1, Điều 3 (4) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Phan Thành Đạt` |
| 4 | Điều 1 (5) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Thôn Đông, Xã Sóc Sơn, Thành phố Hà Nội` |
| 5 | Điều 1, Điều 2 (6) | `##LyDoTamDinhChi##` | Giải quyết yêu cầu bồi thường > Popup Trình duyệt Tạm đình chỉ giải quyết bồi thường | Lý do tạm đình chỉ | Theo giá trị trường `Lý do tạm đình chỉ` trên giao diện.<br>- Nội dung tương ứng điểm a hoặc điểm b khoản 1 Điều 50 Luật TNBTCNN. | `Văn bản làm căn cứ yêu cầu bồi thường đang được cơ quan, người có thẩm quyền xem xét lại.` |
| 6 | Nơi nhận (8) | `##HoTenNguoiGiaiQuyet##` | Giải quyết yêu cầu bồi thường > Popup Cử người giải quyết bồi thường | Họ và tên | Theo giá trị trường `Họ và tên` của cán bộ giải quyết bồi thường được cử của vụ việc; nhiều cán bộ: mỗi cán bộ 01 dòng Nơi nhận. | `Lê Thị Dung` |
| 7 | Nơi nhận (9) | `##TenNguoiThiHanhCongVuGayThietHai##` | Giải quyết yêu cầu bồi thường > Thông tin người thi hành công vụ gây thiệt hại | Họ và tên | Theo giá trị trường `Họ và tên` người thi hành công vụ gây thiệt hại của vụ việc; nhiều người: mỗi người 01 dòng Nơi nhận. | `Vũ Đình Trọng` |

---

### 14. MẪU SỐ 25/BTNN: QUYẾT ĐỊNH ĐÌNH CHỈ GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_25_BTNN_Template.docx`
- **Mục đích**: Cơ quan giải quyết bồi thường quyết định đình chỉ giải quyết yêu cầu bồi thường theo khoản 1 Điều 51 hoặc khoản 2 Điều 50 Luật TNBTCNN; người yêu cầu bồi thường trả lại tiền đã được tạm ứng kinh phí bồi thường (nếu có).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Thao tác khác "Đình chỉ giải quyết" > Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường* (hồ sơ `Xác minh thiệt hại`, `Thương lượng`, `Chờ ban hành QĐ`, hoặc `Cập nhật` hồ sơ `Bị trả lại` có Loại trình `Đình chỉ giải quyết bồi thường`; nút `Xem trước văn bản`).
- **Lưu và ban hành**: Văn bản sinh khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 25/BTNN`; văn bản lưu cùng phiếu trình `Đình chỉ giải quyết bồi thường` và được Lãnh đạo cấp cuối ký số khi Ký duyệt. Hình thức `Ký ngoài`: chỉ tải lên văn bản PDF đã ký và đóng dấu, không sinh văn bản theo mẫu.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Quy tắc đặt tên file tải về**: `Mau_25_BTNN_Quyet_dinh_dinh_chi_[Mã vụ việc].docx`
- **Ghi chú điều kiện Điều 3**: Trường `Thu hồi kinh phí bồi thường đã chi` = `Không thu hồi`: không in Điều 3 (trả lại tiền đã được tạm ứng, dòng 6, 7). `Thu hồi` hoặc trường không hiển thị (vụ việc không có khoản kinh phí đã chi): giữ Điều 3.
- **Quy tắc đánh số lại khi không có Điều 3**: Bỏ toàn bộ khối Điều 3; Điều 4 → Điều 3; trong `##NoiNhan##` thay "Như Điều 4" thành "Như Điều 3".

#### Bảng mapping chi tiết Mẫu 25/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `25/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện. Định dạng trên mẫu: `ngày dd tháng mm năm yyyy` | `ngày 22 tháng 03 năm 2026` |
| 3 | Điều 1, Điều 3, đoạn sau Điều 4 (đoạn sau Điều 3 khi không in Điều 3) (4) | `##TenNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Họ và tên / Tên tổ chức | Theo giá trị trường `Họ và tên / Tên tổ chức` trên giao diện (Phần I mục 4):<br>- `Loại người yêu cầu` = `Cá nhân`: Họ và tên.<br>- `Loại người yêu cầu` = `Tổ chức`: Tên tổ chức. | `Phạm Minh Tuấn` |
| 4 | Điều 1 (5) | `##DiaChiNguoiYeuCauBoiThuong##` | Tiếp nhận hồ sơ > Thông tin người yêu cầu | Địa chỉ chi tiết; Phường/Xã; Tỉnh/Thành phố; Quốc gia | Ghép theo Phần I mục 5: `[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố]`; bỏ phần trống; `Quốc gia` khác `Việt Nam` thì ghép thêm `[Quốc gia]` ở cuối. | `Số 15 Trần Hưng Đạo, Phường Hoàn Kiếm, Thành phố Hà Nội` |
| 5 | Điều 1 | `##LyDoDinhChi##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường | Căn cứ đình chỉ; Diễn giải | (6) Theo giá trị trường `Căn cứ đình chỉ` trên giao diện, bỏ phần điểm, khoản, điều trong ngoặc, chữ đầu viết thường; trường `Diễn giải` có giá trị thì ghép sau, cách bằng ": ". | `người yêu cầu bồi thường rút toàn bộ yêu cầu bồi thường: Đơn rút yêu cầu ngày 20/03/2026` |
| 6 | Điều 3 | `##SoQDTamUng##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường | Quyết định tạm ứng kinh phí bồi thường (Điều 3) | Theo Số của Quyết định tạm ứng kinh phí bồi thường đã ban hành của vụ việc, hiển thị tại trường `Quyết định tạm ứng kinh phí bồi thường (Điều 3)` trên giao diện. Vụ việc chưa có Quyết định tạm ứng: giữ `…..`.<br>- Không in khi `Thu hồi kinh phí bồi thường đã chi` = `Không thu hồi` (Ghi chú điều kiện Điều 3). | `07/QĐ-STP` |
| 7 | Điều 3 | `##NgayQDTamUng##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường | Quyết định tạm ứng kinh phí bồi thường (Điều 3) | Theo Ngày của Quyết định tạm ứng kinh phí bồi thường đã ban hành của vụ việc, hiển thị tại trường `Quyết định tạm ứng kinh phí bồi thường (Điều 3)` trên giao diện. Định dạng trên mẫu: `dd tháng mm năm yyyy`. Vụ việc chưa có Quyết định tạm ứng: giữ `… tháng … năm ….`.<br>- Không in khi `Thu hồi kinh phí bồi thường đã chi` = `Không thu hồi` (Ghi chú điều kiện Điều 3). | `10 tháng 02 năm 2026` |
| 8 | Nơi nhận | `##NoiNhan##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Quyết định Đình chỉ giải quyết yêu cầu bồi thường | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện. Mỗi dòng là 01 nơi nhận.<br>- Không in Điều 3: thay "Như Điều 4" thành "Như Điều 3". | `- Như Điều 4;`<br>`- Cục Bồi thường nhà nước;`<br>`- Lê Thị Dung;`<br>`- Vũ Đình Trọng;`<br>`- Lưu: VT, HSVV.` |

---

### 15. MẪU SỐ 26/BTNN: THÔNG BÁO VỀ VIỆC TỔ CHỨC THỰC HIỆN PHỤC HỒI DANH DỰ
- **Tên tệp template**: `Mau_26_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người bị thiệt hại về việc tổ chức thực hiện phục hồi danh dự theo Điều 57 Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Giải quyết yêu cầu bồi thường > Xem chi tiết vụ việc > Tab Phục hồi danh dự > Khối Thông báo tổ chức phục hồi danh dự > `Trình ký Thông báo tổ chức thực hiện phục hồi danh dự` > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự* (hoặc `Cập nhật` vụ việc `Bị trả lại` có Loại trình `Thông báo tổ chức thực hiện phục hồi danh dự`; nút `Xem trước văn bản`).
- **Lưu và ban hành**: Văn bản sinh khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 26/BTNN`; văn bản lưu cùng phiếu trình `Thông báo tổ chức thực hiện phục hồi danh dự` và được Lãnh đạo cấp cuối ký số khi Ký duyệt. Hình thức `Ký ngoài`: chỉ tải lên văn bản PDF đã ký và đóng dấu, không sinh văn bản theo mẫu.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (tên cơ quan, tổ chức), `##DiaDanh##` (2), `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Câu chữ theo Mẫu số 26/BTNN; khối ký `Thủ trưởng cơ quan` / `(Ký, ghi rõ họ tên và đóng dấu)`.
- **Quy tắc đặt tên file tải về**: `Mau_26_BTNN_Thong_bao_phuc_hoi_danh_du_[Mã vụ việc].docx`

#### Quy tắc sinh đoạn (7) theo Hình thức phục hồi danh dự
- Đoạn (7) `##NoiDungPhucHoiDanhDu##` sinh dựa vào **Hình thức phục hồi danh dự** của hồ sơ (Hình thức đề nghị phục hồi danh dự: trực tiếp xin lỗi và cải chính công khai; đăng báo xin lỗi và cải chính công khai) và lựa chọn đăng tải trên Cổng thông tin điện tử tại popup; mỗi hình thức sinh 01 khối nội dung, theo thứ tự khối A rồi khối B; bỏ khối của hình thức không có.
- **Khối A - Hình thức có trực tiếp xin lỗi và cải chính công khai**:
  + Dòng 1: `Về việc tổ chức trực tiếp xin lỗi và cải chính công khai:`
  + Dòng 2: `- Dự kiến thời gian :##ThoiGianDuKienXinLoi##`
  + Dòng 3: `- Dự kiến địa điểm :##DiaDiemDuKienXinLoi##`
- **Khối B - Hình thức có đăng báo xin lỗi và cải chính công khai**:
  + Dòng 1: `Về việc đăng báo xin lỗi và cải chính công khai:`
  + Dòng 2: `- Dự kiến tờ báo đăng:##TenBaoDuKienDang##`
  + Dòng 3 (chỉ khi chọn `Dự kiến đăng tải trên Cổng thông tin điện tử`): `- Dự kiến việc đăng tải nội dung xin lỗi và cải chính công khai trên Cổng thông tin điện tử của ##TenCoQuanQuanLyNguoiThiHanhCongVu##`
- Đối chiếu hướng dẫn Mẫu 26/BTNN: yêu cầu bồi thường trong hoạt động tố tụng hình sự ghi khối A và khối B; trong hoạt động quản lý hành chính ghi khối B. Hệ thống sinh theo Hình thức phục hồi danh dự của hồ sơ, không tự suy theo lĩnh vực.
- Biến chưa có giá trị: giữ `………` tại vị trí biến.

#### Bảng mapping chi tiết Mẫu 26/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `26/TB-STP` |
| 2 | Bảng đầu trang - Ô phải (2) | `##NgayThangNamBanHanh##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng trên mẫu: `ngày dd tháng mm năm yyyy`. | `ngày 15 tháng 04 năm 2026` |
| 3 | Kính gửi (3) | `##TenNguoiBiThietHai##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự > Khối Thông tin phục hồi danh dự | Người bị thiệt hại | Theo giá trị trường `Người bị thiệt hại` trên giao diện. | `Nguyễn Khắc Hoài` |
| 4 | Địa chỉ (4) | `##DiaChiNguoiBiThietHai##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự > Khối Thông tin phục hồi danh dự | Địa chỉ | Theo giá trị trường `Địa chỉ` trên giao diện (ghép theo Phần I mục 5). | `Thôn 3, Xã Chàng Sơn, Thành phố Hà Nội` |
| 5 | Thân văn bản (5) | `##VanBanCanCuYeuCauBoiThuong##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự > Khối Thông tin phục hồi danh dự | Văn bản làm căn cứ yêu cầu bồi thường | Theo giá trị trường `Văn bản làm căn cứ yêu cầu bồi thường` trên giao diện. | `Quyết định đình chỉ điều tra vụ án đối với bị can số 02/QĐ-ĐCSHS ngày 12/01/2026 của Cơ quan CSĐT Công an TP. Hà Nội` |
| 6 | Thân văn bản, đoạn thời hạn trả lời (6) | `##TenCoQuanThucHienPhucHoiDanhDu##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Cơ quan thực hiện việc phục hồi danh dự | Theo giá trị trường `Cơ quan thực hiện việc phục hồi danh dự` trên giao diện.<br>- Điền cả 03 vị trí (6). | `Sở Tư pháp thành phố Hà Nội` |
| 7 | Thân văn bản (7) | `##NoiDungPhucHoiDanhDu##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Hình thức phục hồi danh dự; các trường của nhóm (7) | Ghép theo **Quy tắc sinh đoạn (7) theo Hình thức phục hồi danh dự** ở trên.<br>- Mỗi dòng là 01 đoạn văn. | `Về việc tổ chức trực tiếp xin lỗi và cải chính công khai:`<br>`- Dự kiến thời gian : 08 giờ 30 ngày 25/04/2026`<br>`- Dự kiến địa điểm : Hội trường UBND xã Chàng Sơn`<br>`Về việc đăng báo xin lỗi và cải chính công khai:`<br>`- Dự kiến tờ báo đăng: Báo Hà Nội mới`<br>`- Dự kiến việc đăng tải nội dung xin lỗi và cải chính công khai trên Cổng thông tin điện tử của Công an thành phố Hà Nội` |
| 7.1 | Khối A (7) | `##ThoiGianDuKienXinLoi##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Dự kiến thời gian | Theo giá trị trường `Dự kiến thời gian` trên giao diện.<br>Định dạng trên mẫu: `HH giờ mm ngày dd/mm/yyyy`. | `08 giờ 30 ngày 25/04/2026` |
| 7.2 | Khối A (7) | `##DiaDiemDuKienXinLoi##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Dự kiến địa điểm | Theo giá trị trường `Dự kiến địa điểm` trên giao diện. | `Hội trường UBND xã Chàng Sơn` |
| 7.3 | Khối B (7) | `##TenBaoDuKienDang##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Dự kiến tờ báo đăng | Theo giá trị trường `Dự kiến tờ báo đăng` trên giao diện. | `Báo Hà Nội mới` |
| 7.4 | Khối B (7) | `##TenCoQuanQuanLyNguoiThiHanhCongVu##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Tên cơ quan trực tiếp quản lý người thi hành công vụ | Theo giá trị trường `Tên cơ quan trực tiếp quản lý người thi hành công vụ` trên giao diện.<br>- Chỉ sinh dòng khi chọn `Dự kiến đăng tải trên Cổng thông tin điện tử`. | `Công an thành phố Hà Nội` |
| 8 | Nơi nhận | `##NoiNhan##` | Giải quyết yêu cầu bồi thường > Popup Trình ký Thông báo tổ chức thực hiện phục hồi danh dự | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện. Mỗi dòng là 01 nơi nhận. | `- Như trên;`<br>`- Lưu: VT, HSVV.` |

---

### 16. MẪU SỐ 32/BTNN: THÔNG BÁO VỀ VIỆC CHI TRẢ TIỀN BỒI THƯỜNG
- **Tên tệp template**: `Mau_32_BTNN_Template.docx`
- **Mục đích**: Thông báo cho người yêu cầu bồi thường về việc chi trả tiền bồi thường theo Điều 62 Luật TNBTCNN (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Nút "Tạo thông báo chi trả" > Màn hình Tạo thông báo chi trả > Nút "Tiếp tục" > Popup Trình ký thông báo chi trả (Ký số trên hệ thống, Sinh văn bản theo mẫu 32/BTNN)*; hoặc *Thao tác "Trình thông báo chi trả" của bản ghi `Chờ thông báo chi trả` > Popup Trình ký thông báo chi trả*.
- **Quy tắc đặt tên file tải về**: `Mau_32_BTNN_Thong_bao_chi_tra_[Mã hồ sơ].docx`
- **Nơi nhận**: theo biến `##NoiNhan##`; dòng (8) tại Nơi nhận của mẫu là cơ quan quản lý nhà nước về công tác bồi thường nhà nước.
- **Đoạn (7)**: theo biến `##NoiDungChiTra##`, nội dung theo `Phương thức nhận tiền` của Quyết định giải quyết bồi thường.
- **Biến dùng chung** (`##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##`, `##DiaDanh##`, `##ChucVuNguoiKy##`, `##HoTenNguoiKy##`): theo Bảng trường thông tin dùng chung (Phần I mục 8); `##HoTenNguoiKy##` là Lãnh đạo ký duyệt cấp cuối được chọn tại Popup Trình ký thông báo chi trả.

#### Bảng mapping chi tiết Mẫu 32/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái | `##SoKyHieuVanBan##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Popup Trình ký thông báo chi trả | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `35/TB-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Popup Trình ký thông báo chi trả | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 17 tháng 10 năm 2026` |
| 3 | Kính gửi (3) | `##TenNguoiYeuCauBoiThuong##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Màn hình Tạo thông báo chi trả | Họ và tên (Khối Thông tin người yêu cầu) | Theo giá trị trường `Họ và tên` của Khối Thông tin người yêu cầu trên giao diện.<br>- Trình từ bản ghi `Chờ thông báo chi trả`: theo giá trị trường `Họ và tên` người yêu cầu bồi thường của Quyết định giải quyết bồi thường; bản ghi tạo từ vụ việc tại Tòa án: theo giá trị trường `Họ và tên` người yêu cầu bồi thường tại Theo dõi vụ việc tại Tòa án > Màn hình Thêm mới/Cập nhật vụ việc. | `Ngô Thị Thanh Tâm` |
| 4 | Địa chỉ (4) | `##DiaChiNguoiYeuCauBoiThuong##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Màn hình Tạo thông báo chi trả | Địa chỉ chi tiết (Khối Thông tin người yêu cầu) | Theo giá trị trường `Địa chỉ chi tiết` của Khối Thông tin người yêu cầu trên giao diện.<br>- Trình từ bản ghi `Chờ thông báo chi trả`: theo giá trị trường `Địa chỉ` người yêu cầu bồi thường của Quyết định giải quyết bồi thường; bản ghi tạo từ vụ việc tại Tòa án: ghép địa chỉ người yêu cầu bồi thường của vụ việc. | `Số 7 phố Lò Đúc, Phường Hai Bà Trưng, Thành phố Hà Nội` |
| 5 | Căn cứ (5) | `##CanCuChiTraBoiThuong##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Màn hình Tạo thông báo chi trả (Khối Quyết định giải quyết bồi thường) | Số quyết định; Ngày quyết định; Cơ quan giải quyết bồi thường | Ghép `Quyết định giải quyết bồi thường số [Số quyết định] ngày [Ngày quyết định] của [Cơ quan giải quyết bồi thường]` theo giá trị các trường tương ứng của Quyết định đã chọn trên giao diện.<br>- Bản ghi tạo từ vụ việc tại Tòa án: `Bản án/Quyết định của Tòa án số [Số Bản án/Quyết định] ngày [Ngày Bản án/Quyết định có hiệu lực] của [Cơ quan bị khởi kiện]` theo giá trị các trường tương ứng tại Theo dõi vụ việc tại Tòa án > Màn hình Thêm mới/Cập nhật vụ việc. | `Quyết định giải quyết bồi thường số 42/QĐ-STP ngày 20/10/2026 của Sở Tư pháp Thành phố Hà Nội` |
| 6 | Căn cứ; đoạn hết thời hạn 03 năm (6) | `##TenCoQuanGiaiQuyetBoiThuong##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Màn hình Tạo thông báo chi trả | Cơ quan giải quyết bồi thường | Theo giá trị trường `Cơ quan giải quyết bồi thường` trên giao diện (cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại). | `Sở Tư pháp Thành phố Hà Nội` |
| 7 | Thân văn bản (7) | `##NoiDungChiTra##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Màn hình Tạo thông báo chi trả (Khối Phương thức chi trả tiền bồi thường) | Phương thức nhận tiền; Cơ quan chi trả tiền bồi thường; Thời gian nhận tiền; Địa điểm nhận tiền; Số quyết định | Theo giá trị trường `Phương thức nhận tiền` trên giao diện:<br>- `Nhận tiền mặt`: sinh 03 đoạn `[Cơ quan chi trả tiền bồi thường] mời Ông/Bà đến nhận tiền bồi thường:`, `- Thời gian: [Thời gian nhận tiền]`, `- Địa điểm: [Địa điểm nhận tiền]`.<br>- `Nhận qua chuyển khoản`: sinh 01 đoạn `[Cơ quan chi trả tiền bồi thường] sẽ tiến hành chi trả tiền bồi thường cho Ông/Bà bằng phương thức chuyển khoản theo thông tin ghi trong Quyết định giải quyết bồi thường số [Số quyết định].`<br>- `[...]`: theo giá trị trường cùng tên trên giao diện.<br>- Trình từ bản ghi `Chờ thông báo chi trả`: `[Thời gian nhận tiền]`, `[Địa điểm nhận tiền]` theo giá trị trường `Thời gian`, `Địa điểm` tại Popup Trình ký thông báo chi trả; `[Cơ quan chi trả tiền bồi thường]` theo giá trị trường `Cơ quan giải quyết bồi thường`. | `Sở Tư pháp Thành phố Hà Nội mời Ông/Bà đến nhận tiền bồi thường:`<br>`- Thời gian: 09:00 30/10/2026`<br>`- Địa điểm: Sở Tư pháp Thành phố Hà Nội` |
| 8 | Nơi nhận (8) | `##NoiNhan##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Popup Trình ký thông báo chi trả | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng 01 nơi nhận, in đúng thứ tự nhập; bỏ dòng trống. | `- Như trên;`<br>`- Sở Tư pháp Thành phố Hà Nội;`<br>`- Lưu: VT, HSVV.` |
| 9 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường > Popup Trình ký thông báo chi trả (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện. | `Nguyễn Văn An` |

---

<a id="mau-33"></a>
### 17. MẪU SỐ 33/BTNN: QUYẾT ĐỊNH THÀNH LẬP HỘI ĐỒNG XEM XÉT TRÁCH NHIỆM HOÀN TRẢ
- **Tên tệp template**: `Mau_33_BTNN_Template.docx`
- **Mục đích**: Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả đối với người thi hành công vụ gây thiệt hại sau khi Nhà nước đã hoàn thành chi trả tiền bồi thường theo Điều 66 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) > Nút "Thành lập hội đồng" > Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả (Hình thức ký `Ký số trên hệ thống`, Tệp văn bản trình ký `Sinh văn bản theo mẫu 33/BTNN`)*.
- **Quy tắc đặt tên file tải về**: `Mau_33_BTNN_Quyet_dinh_thanh_lap_hoi_dong_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##` (dòng ban hành kèm theo và đoạn Căn cứ Nghị định), `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (tên cơ quan đã chi trả tiền bồi thường), `##DiaDanh##` (2) theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Ghi chú Nơi nhận**: Nơi nhận cố định theo mẫu, không có biến và không có trường trên giao diện: `- Như Điều 1;` / `- Lưu: VT, HSVV.`

#### Bảng mapping chi tiết Mẫu 33/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả | Số quyết định | Theo giá trị trường `Số quyết định` trên giao diện. | `12/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải (2) | `##NgayThangNamBanHanh##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả | Ngày quyết định | Theo giá trị trường `Ngày quyết định` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 22 tháng 10 năm 2026` |
| 3 | Dưới tên văn bản (3) | `##ChucVuNguoiDungDau##` | Quản lý cơ cấu tổ chức > Danh mục Chức vụ [DM_58]; Quản lý xem xét trách nhiệm hoàn trả > Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả (dòng phụ đề) | Tên chức vụ; Đơn vị chi trả bồi thường | Ghép Chức vụ đầu tiên của Loại cơ quan của cơ quan đã chi trả tiền bồi thường trong Danh mục Chức vụ [DM_58] và Tên cơ quan, đơn vị theo giá trị trường `Đơn vị chi trả bồi thường` trên giao diện.<br>- Từ cuối của chức vụ trùng từ đầu của tên cơ quan thì không lặp.<br>- In hoa toàn bộ. | `GIÁM ĐỐC SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 4 | Căn cứ (4) | `##TenNguoiYeuCauBoiThuong##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả (dòng phụ đề) | Người yêu cầu bồi thường | Theo giá trị trường `Người yêu cầu bồi thường` trên giao diện.<br>- Cá nhân: tiền tố `Ông/Bà`; Tổ chức: không có tiền tố (Phần I mục 4).<br>- Dòng Căn cứ kết thúc bằng dấu `,`. | `Ông/Bà Nguyễn Văn Nam` |
| 5 | Điều 1 (5) | `##DanhSachThanhVienHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả | Bảng danh sách thành viên trong hội đồng | Theo giá trị trường `Bảng danh sách thành viên trong hội đồng` trên giao diện.<br>- Sinh ngay dưới dòng "Điều 1. Thành lập Hội đồng xem xét trách nhiệm hoàn trả gồm các Ông/Bà có tên sau đây:"; không sinh dạng bảng.<br>- Mỗi thành viên 01 dòng (01 đoạn), theo thứ tự trên giao diện, dạng `[STT]. [Họ và tên], [Chức vụ], [Đơn vị công tác] - [Chức danh trong hội đồng]`.<br>- `STT`: hệ thống tự sinh 1, 2, 3...<br>- `Họ và tên`, `Chức danh trong hội đồng`: theo giá trị cột tương ứng trên giao diện.<br>- `Chức vụ`: tên chức vụ đã chọn.<br>- `Đơn vị công tác`: tên cơ quan, đơn vị đã chọn, không kèm mã đơn vị.<br>- Định dạng đoạn theo đoạn chứa biến trên mẫu. | Dòng 1: `1. Nguyễn Văn An, Giám đốc Sở, Sở Tư pháp Thành phố Hà Nội - Chủ tịch Hội đồng`<br>Dòng 2: `2. Trần Thị Bình, Trưởng phòng, Phòng Hành chính tư pháp - Thành viên` |
| 6 | Bảng ký - Ô phải | `##ChucVuNguoiKy##` | Quản lý cơ cấu tổ chức > Danh mục Chức vụ [DM_58] | Chức vụ của người đứng đầu cơ quan đã chi trả tiền bồi thường | Chức vụ đầu tiên trong Danh mục Chức vụ [DM_58] theo Loại cơ quan [DM_57] của cơ quan đã chi trả tiền bồi thường.<br>Định dạng chữ in hoa. | `GIÁM ĐỐC` |
| 7 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Phạm Quang Huy` |

---

### 18. MẪU SỐ 34/BTNN: BIÊN BẢN LÀM VIỆC CỦA HỘI ĐỒNG XEM XÉT TRÁCH NHIỆM HOÀN TRẢ
- **Tên tệp template**: `Mau_34_BTNN_Template.docx`
- **Mục đích**: Ghi lại toàn bộ diễn biến cuộc họp, ý kiến của các thành viên Hội đồng, lời trình bày của người thi hành công vụ và kết luận kiến nghị của Hội đồng về trách nhiệm hoàn trả.
- **Màn hình kích hoạt**: Chưa có chức năng sinh văn bản Mẫu 34/BTNN trên giao diện (Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả). Các dòng ghi `(chưa có trường trên giao diện)` cần bổ sung khi thiết kế chức năng.
- **Quy tắc đặt tên file tải về**: `Mau_34_BTNN_Bien_ban_hop_hoi_dong_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##` (dòng ban hành kèm theo) theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Mẫu không có tên cơ quan, số ký hiệu, Nơi nhận; dòng `…….., ngày……. tháng…… năm…….` trên chữ ký Chủ tịch Hội đồng giữ nguyên dấu chấm.

#### Bảng mapping chi tiết Mẫu 34/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Tiêu đề | `##MaVuViec##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả | Mã vụ việc | Theo giá trị trường `Mã vụ việc` trên giao diện, chỉ lấy mã. | `VVBT-2026-0012` |
| 2 | Mở đầu | `##NgayHopHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Ngày họp / Lập biên bản kiến nghị | Theo giá trị trường `Ngày họp / Lập biên bản kiến nghị` trên giao diện.<br>Định dạng: `dd/mm/yyyy`. | `10/05/2026` |
| 3 | Mở đầu | `##DiaDiemHop##` | - | Địa điểm họp (chưa có trường trên giao diện) | Nơi tổ chức cuộc họp Hội đồng. | `Phòng họp số 2, Sở Tư pháp Thành phố Hà Nội` |
| 4 | Mở đầu (1) | `##TenDiaChiNguoiYeuCauBoiThuong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả | Mã vụ việc | Ghép `[Họ và tên người yêu cầu], [Địa chỉ người yêu cầu]` của vụ việc theo giá trị trường `Mã vụ việc` trên giao diện. | `Nguyễn Văn Nam, Số 12 phố Hàng Bông, Phường Hoàn Kiếm, Thành phố Hà Nội` |
| 5 | Mở đầu (2) | `##TenCoQuanDaChiTraBoiThuong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Thông tin vụ việc) | Đơn vị chi trả bồi thường | Theo giá trị trường `Đơn vị chi trả bồi thường` trên giao diện. | `Sở Tư pháp Thành phố Hà Nội` |
| 6 | Mục I (3) | `##ThanhPhanHop##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Bảng danh sách thành viên trong hội đồng | Theo giá trị trường `Bảng danh sách thành viên trong hội đồng` trên giao diện, mỗi thành viên 01 mục đánh số 1, 2, 3...:<br>- Chủ tịch Hội đồng: `[STT]. Ông (bà): [Họ và tên]    Chủ tịch Hội đồng;`.<br>- Thành viên khác: `[STT]. Ông (bà): [Họ và tên] Chức vụ: [Chức vụ]` và dòng `Đại diện [Đơn vị công tác]`. | `1. Ông (bà): Nguyễn Văn An    Chủ tịch Hội đồng;` |
| 7 | Mục II.1 - 1.1 | `##ThaoLuanNguoiThiHanhCongVu##` | - | Xác định người thi hành công vụ gây thiệt hại (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.1; mỗi dòng sinh 01 đoạn. | `Ông Vũ Đình Trọng, Chuyên viên Sở Tư pháp` |
| 8 | Mục II.1 - 1.2 | `##ThaoLuanMucDoLoi##` | - | Xác định mức độ lỗi (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.2; mỗi dòng sinh 01 đoạn. | `Lỗi vô ý` |
| 9 | Mục II.1 - 1.3 | `##ThaoLuanTrachNhiemHoanTra##` | - | Trách nhiệm hoàn trả và mức hoàn trả (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.3; mỗi dòng sinh 01 đoạn. | `Hoàn trả 50.000.000 đồng` |
| 10 | Mục II.1 - 1.4 | `##ThaoLuanGiamMucHoanTra##` | - | Xác định việc giảm mức hoàn trả (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.4; mỗi dòng sinh 01 đoạn. | `Không` |
| 11 | Mục II.1 - 1.5 | `##ThaoLuanMienHoanTra##` | - | Xác định việc miễn hoàn trả (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.5; mỗi dòng sinh 01 đoạn. | `Không` |
| 12 | Mục II.1 - 1.6 | `##ThaoLuanDieuKienHoan##` | - | Điều kiện hoãn thực hiện việc hoàn trả (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.6; mỗi dòng sinh 01 đoạn. | `Không` |
| 13 | Mục II.1 - 1.7 | `##ThaoLuanPhuongThucHoanTra##` | - | Phương thức hoàn trả (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.7; mỗi dòng sinh 01 đoạn. | `Nhiều lần` |
| 14 | Mục II.1 - 1.8 | `##ThaoLuanKienNghi##` | - | Kiến nghị (chưa có trường trên giao diện) | Nội dung thảo luận mục 1.8; mỗi dòng sinh 01 đoạn. | `Kiến nghị Giám đốc Sở Tư pháp ban hành Quyết định hoàn trả` |
| 15 | Mục II.2 - 2.1 | `##BieuQuyetNguoiThiHanhCongVu##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Họ và tên cán bộ; Chức vụ; Đơn vị công tác | Theo giá trị các trường tương ứng trên giao diện; mỗi cán bộ 01 dòng `[Họ và tên cán bộ] - [Chức vụ], [Đơn vị công tác]`. | `Vũ Đình Trọng - Chuyên viên, Sở Tư pháp Thành phố Hà Nội` |
| 16 | Mục II.2 - 2.2 | `##BieuQuyetMucDoLoi##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Mức độ lỗi; Nội dung mức độ lỗi | Theo quy tắc `##MucDoLoi##` của Mẫu 35/BTNN; mỗi cán bộ 01 dòng `[Họ và tên cán bộ]: [Giá trị]`. | `Vũ Đình Trọng: Lỗi vô ý` |
| 17 | Mục II.2 - 2.3 | `##BieuQuyetTrachNhiemHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Trách nhiệm hoàn trả và mức hoàn trả; Số tiền phải hoàn trả (đ) | Theo quy tắc `##TrachNhiemHoanTra##` của Mẫu 35/BTNN; mỗi cán bộ 01 dòng `[Họ và tên cán bộ]: [Giá trị]`. | `Vũ Đình Trọng: Hoàn trả một phần. Số tiền phải hoàn trả: 50.000.000 đồng` |
| 18 | Mục II.2 - 2.4 | `##BieuQuyetGiamMucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Giảm mức hoàn trả | Theo quy tắc `##GiamMucHoanTra##` của Mẫu 35/BTNN; mỗi cán bộ 01 dòng `[Họ và tên cán bộ]: [Giá trị]`. | `Vũ Đình Trọng: Không` |
| 19 | Mục II.2 - 2.5 | `##BieuQuyetMienHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Miễn hoàn trả | Theo quy tắc `##MienHoanTra##` của Mẫu 35/BTNN; mỗi cán bộ 01 dòng `[Họ và tên cán bộ]: [Giá trị]`. | `Vũ Đình Trọng: Không` |
| 20 | Mục II.2 - 2.6 | `##BieuQuyetDieuKienHoan##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Điều kiện hoãn thực hiện việc hoàn trả (nếu có); Ngày bắt đầu hoãn; Ngày kết thúc hoãn (nếu có) | Theo quy tắc `##DieuKienHoanHoanTra##` của Mẫu 35/BTNN; mỗi cán bộ 01 dòng `[Họ và tên cán bộ]: [Giá trị]`. | `Vũ Đình Trọng: Không` |
| 21 | Mục II.2 - 2.7 | `##BieuQuyetPhuongThucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Phương thức hoàn trả | Theo giá trị trường `Phương thức hoàn trả` trên giao diện; mỗi cán bộ 01 dòng `[Họ và tên cán bộ]: [Giá trị]`. | `Vũ Đình Trọng: Nhiều lần` |
| 22 | Kết thúc | `##GioKetThucHop##` | - | Giờ kết thúc cuộc họp (chưa có trường trên giao diện) | Định dạng `HH:mm`. | `11:30` |
| 23 | Kết thúc | `##NgayKetThucHop##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Ngày họp / Lập biên bản kiến nghị | Theo giá trị trường `Ngày họp / Lập biên bản kiến nghị` trên giao diện.<br>Định dạng: `dd/mm/yyyy`. | `10/05/2026` |
| 24 | Bảng ký - Ô trái | `##NguoiLapBienBan##` | - | Người lập biên bản (chưa có trường trên giao diện) | Họ và tên người lập biên bản. | `Phạm Văn C` |
| 25 | Bảng ký - Ô phải | `##ChuTichHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Bảng danh sách thành viên trong hội đồng | Theo giá trị trường `Họ và tên` của thành viên có `Chức danh trong hội đồng` là Chủ tịch Hội đồng trong `Bảng danh sách thành viên trong hội đồng` trên giao diện. | `Nguyễn Văn An` |

---

### 19. MẪU SỐ 35/BTNN: VĂN BẢN KIẾN NGHỊ VIỆC BAN HÀNH QUYẾT ĐỊNH HOÀN TRẢ
- **Tên tệp template**: `Mau_35_BTNN_Template.docx`
- **Mục đích**: Hội đồng xem xét trách nhiệm hoàn trả gửi văn bản kiến nghị lên Thủ trưởng cơ quan có thẩm quyền để ban hành Quyết định hoàn trả chính thức theo Điều 66 Luật TNBTCNN.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) > Khối Ý kiến kiến nghị của Hội đồng đối với từng cán bộ > Liên kết "Tải Mẫu 35/BTNN" tại trường `Văn bản kiến nghị về việc ban hành quyết định hoàn trả đối với vụ việc yêu cầu bồi thường`*.
- **Quy tắc đặt tên file tải về**: `Mau_35_BTNN_Van_ban_kien_nghi_hoan_tra_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##` (dòng ban hành kèm theo và đoạn III. Kiến nghị) theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Khối lặp theo từng người thi hành công vụ gây thiệt hại**: Đoạn từ `##BatDauKhoiCanBo##` đến `##KetThucKhoiCanBo##` lặp theo thứ tự thẻ trong `Danh sách ý kiến của Hội đồng theo từng người thi hành công vụ gây thiệt hại` (toàn bộ cán bộ của hồ sơ); mỗi cán bộ 01 khối gồm dòng `[STT]. Trường hợp ông (bà) [Họ và tên cán bộ] thuộc [Đơn vị công tác]` và các mục 1 - 6; hai biến đánh dấu không in ra văn bản.
- **Nội dung cố định**: Đầu văn bản chỉ ghi `HỘI ĐỒNG XEM XÉT TRÁCH NHIỆM HOÀN TRẢ` (không có Số, ký hiệu, Nơi nhận); dòng `…….., ngày……. tháng…… năm…….` trên chữ ký Chủ tịch Hội đồng giữ nguyên dấu chấm; `khoản 7, Điều ….` của Nghị định giữ nguyên theo mẫu.

#### Bảng mapping chi tiết Mẫu 35/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Trích yếu, Mở đầu (1) | `##TenDiaChiNguoiYeuCauBoiThuong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả | Mã vụ việc | Ghép `[Họ và tên người yêu cầu], [Địa chỉ người yêu cầu]` của vụ việc theo giá trị trường `Mã vụ việc` trên giao diện. | `Nguyễn Văn Nam, Số 12 phố Hàng Bông, Phường Hoàn Kiếm, Thành phố Hà Nội` |
| 2 | Mở đầu | `##NgayHopHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Ngày họp / Lập biên bản kiến nghị | Theo giá trị trường `Ngày họp / Lập biên bản kiến nghị` trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `10/05/2026` |
| 3 | Mở đầu | `##DiaDiemHop##` | - | Địa điểm họp (chưa có trường trên giao diện) | Nơi tổ chức cuộc họp Hội đồng. | `Phòng họp số 2, Sở Tư pháp Thành phố Hà Nội` |
| 4 | Mở đầu (2) | `##SoQDThanhLapHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Số quyết định | Theo giá trị trường `Số quyết định` trên giao diện. | `33/QĐ-STP` |
| 5 | Mở đầu (2) | `##NgayThanhLapHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Ngày quyết định | Theo giá trị trường `Ngày quyết định` trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `25/04/2026` |
| 6 | Mở đầu (2) | `##CoQuanThanhLapHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Đơn vị ban hành | Theo giá trị trường `Đơn vị ban hành` trên giao diện. | `Sở Tư pháp Thành phố Hà Nội` |
| 7 | Mục I | `##ThanhPhanHop##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Bảng danh sách thành viên trong hội đồng | Theo giá trị trường `Bảng danh sách thành viên trong hội đồng` trên giao diện, mỗi thành viên 01 mục đánh số 1, 2, 3...:<br>- Chủ tịch Hội đồng: `[STT]. Ông (bà): [Họ và tên]    Chủ tịch Hội đồng;`.<br>- Thành viên khác: `[STT]. Ông (bà): [Họ và tên] Chức vụ: [Chức vụ]` và dòng `Đại diện [Đơn vị công tác]`. | `1. Ông (bà): Nguyễn Văn An    Chủ tịch Hội đồng;` |
| 8 | Khối lặp - Đầu khối | `##BatDauKhoiCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Danh sách ý kiến của Hội đồng theo từng người thi hành công vụ gây thiệt hại | Đánh dấu bắt đầu khối lặp; mỗi thẻ cán bộ trên giao diện sinh 01 khối. Không in ra văn bản. | - |
| 9 | Khối lặp - Dòng cán bộ | `##SttCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Dòng thông tin cán bộ | Theo số thứ tự thẻ cán bộ trên giao diện (1, 2, 3...); dùng làm số mục và tiền tố các mục `.1`-`.6`. | `1` |
| 10 | Khối lặp - Dòng cán bộ (3) | `##HoTenCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Họ và tên cán bộ | Theo giá trị trường `Họ và tên cán bộ` trên giao diện. | `Vũ Đình Trọng` |
| 11 | Khối lặp - Dòng cán bộ (4) | `##DonViCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Đơn vị công tác | Theo giá trị trường `Đơn vị công tác` trên giao diện, lấy Tên đơn vị. | `Sở Tư pháp Thành phố Hà Nội` |
| 12 | Khối lặp - Mục 1 | `##MucDoLoi##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Mức độ lỗi; Nội dung mức độ lỗi | Theo giá trị trường `Mức độ lỗi` trên giao diện:<br>- `Vô ý`: in `Lỗi vô ý`.<br>- `Cố ý nhưng không bị truy cứu trách nhiệm hình sự`: in `Lỗi cố ý nhưng không bị truy cứu trách nhiệm hình sự`.<br>- `Cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội`: in `Lỗi cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội`.<br>- `Khác`: in theo giá trị trường `Nội dung mức độ lỗi` trên giao diện. | `Lỗi vô ý` |
| 13 | Khối lặp - Mục 2 | `##TrachNhiemHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Trách nhiệm hoàn trả và mức hoàn trả; Số tiền phải hoàn trả (đ) | Ghép theo giá trị các trường trên giao diện: `[Trách nhiệm hoàn trả và mức hoàn trả] Số tiền phải hoàn trả: [Số tiền phải hoàn trả (đ)] đồng (Bằng chữ: [Số tiền bằng chữ]).`<br>- Số tiền định dạng phân cách hàng nghìn bằng dấu chấm; bằng chữ theo Phần I mục 3. | `Ông Vũ Đình Trọng có trách nhiệm hoàn trả một phần số tiền Nhà nước đã bồi thường. Số tiền phải hoàn trả: 50.000.000 đồng (Bằng chữ: Năm mươi triệu đồng).` |
| 14 | Khối lặp - Mục 3 | `##GiamMucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Giảm mức hoàn trả | Theo giá trị trường `Giảm mức hoàn trả` trên giao diện.<br>- Trường trống: in `Không`. | `Không` |
| 15 | Khối lặp - Mục 4 | `##MienHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Miễn hoàn trả | Theo giá trị trường `Miễn hoàn trả` trên giao diện.<br>- Trường trống: in `Không`. | `Không` |
| 16 | Khối lặp - Mục 5 | `##DieuKienHoanHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Điều kiện hoãn thực hiện việc hoàn trả (nếu có); Ngày bắt đầu hoãn; Ngày kết thúc hoãn (nếu có) | Theo giá trị trường `Điều kiện hoãn thực hiện việc hoàn trả (nếu có)` trên giao diện.<br>- Có nội dung: ghép ` (hoãn từ ngày dd/mm/yyyy đến ngày dd/mm/yyyy)` theo giá trị trường `Ngày bắt đầu hoãn`, `Ngày kết thúc hoãn (nếu có)`; không có Ngày kết thúc hoãn thì chỉ ghép ` (hoãn từ ngày dd/mm/yyyy)`.<br>- Trường trống: in `Không`. | `Đang điều trị bệnh hiểm nghèo (hoãn từ ngày 01/11/2026 đến ngày 01/05/2027)` |
| 17 | Khối lặp - Mục 6 | `##KienNghiPhuongThucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Phương thức hoàn trả | Theo giá trị trường `Phương thức hoàn trả` trên giao diện. | `Nhiều lần` |
| 18 | Khối lặp - Cuối khối | `##KetThucKhoiCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Danh sách ý kiến của Hội đồng theo từng người thi hành công vụ gây thiệt hại | Đánh dấu kết thúc khối lặp. Không in ra văn bản. | - |
| 19 | Mục III (4) | `##DanhSachCoQuanQuanLyNguoiTHCV##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Đơn vị công tác | Ghép Tên đơn vị theo giá trị trường `Đơn vị công tác` của các cán bộ trong `Danh sách ý kiến của Hội đồng theo từng người thi hành công vụ gây thiệt hại`; bỏ trùng, nối bằng `, `. | `Sở Tư pháp Thành phố Hà Nội` |
| 20 | Bảng ký - Ô phải | `##ChuTichHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Bảng danh sách thành viên trong hội đồng | Theo giá trị trường `Họ và tên` của thành viên có `Chức danh trong hội đồng` là Chủ tịch Hội đồng trong `Bảng danh sách thành viên trong hội đồng` trên giao diện. | `Trần Văn A` |

---

### 20. MẪU SỐ 36/BTNN: QUYẾT ĐỊNH HOÀN TRẢ
- **Tên tệp template**: `Mau_36_BTNN_Template.docx`
- **Mục đích**: Quyết định của Thủ trưởng cơ quan có thẩm quyền buộc người thi hành công vụ gây thiệt hại phải hoàn trả số tiền bồi thường vào ngân sách nhà nước theo Điều 65, 66 Luật TNBTCNN.
- **Màn hình kích hoạt**: Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) hiện chỉ đính kèm Quyết định đã ký (Người ký, Chức vụ người ký, Số quyết định, Ngày quyết định, Ngày quyết định hoàn trả có hiệu lực, Trích yếu / Nội dung ngắn); chưa có chức năng sinh văn bản Mẫu 36/BTNN. Các dòng ghi `(chưa có trường trên giao diện)` cần bổ sung khi thiết kế chức năng.
- **Quy tắc đặt tên file tải về**: `Mau_36_BTNN_Quyet_dinh_hoan_tra_[Mã vụ việc].docx`
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##` (dòng ban hành kèm theo và đoạn Căn cứ Nghị định), `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (tên đơn vị ban hành Quyết định hoàn trả - (1): lĩnh vực tố tụng hình sự là cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại; lĩnh vực khác là đơn vị tạo Quyết định thành lập Hội đồng), `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##TenCoQuanQuanLyNhaNuocBTNN##` (6) theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Khối lặp theo từng người thi hành công vụ**: Đoạn từ `##BatDauKhoiCanBo##` đến `##KetThucKhoiCanBo##` lặp theo thứ tự thẻ trong `Danh sách ý kiến của Hội đồng theo từng người thi hành công vụ gây thiệt hại` (Bước 2: Ý kiến của hội đồng); hai biến đánh dấu không in ra văn bản. Chỉ có 01 người thi hành công vụ: in 01 khối (mục (5) của mẫu không ghi).
- **Nội dung cố định**: Nơi nhận `- Như Điều 3;` / `##NoiNhanCoQuanTraLuong##` / `- ##TenCoQuanQuanLyNhaNuocBTNN##;` / `- Lưu: VT, HSVV.`

#### Bảng mapping chi tiết Mẫu 36/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Số quyết định | Theo giá trị trường `Số quyết định` trên giao diện. | `36/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Ngày quyết định | Theo giá trị trường `Ngày quyết định` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 15 tháng 05 năm 2026` |
| 3 | Căn cứ | `##SoQDThanhLapHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Số quyết định | Theo giá trị trường `Số quyết định` trên giao diện. | `33/QĐ-STP` |
| 4 | Căn cứ | `##NgayThanhLapHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Ngày quyết định | Theo giá trị trường `Ngày quyết định` trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `25/04/2026` |
| 5 | Căn cứ | `##CoQuanThanhLapHoiDong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 1: Thành lập Hội đồng) | Đơn vị ban hành | Theo giá trị trường `Đơn vị ban hành` trên giao diện. | `Sở Tư pháp Thành phố Hà Nội` |
| 6 | Khối lặp - Đầu khối | `##BatDauKhoiCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Danh sách ý kiến của Hội đồng theo từng người thi hành công vụ gây thiệt hại | Đánh dấu bắt đầu khối lặp; mỗi thẻ cán bộ sinh 01 khối. Không in ra văn bản. | - |
| 7 | Khối lặp - Điều 1 | `##SttCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Dòng thông tin cán bộ | Theo số thứ tự thẻ cán bộ trên giao diện (1, 2, 3...). | `1` |
| 8 | Khối lặp - Điều 1 | `##HoTenCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Họ và tên cán bộ | Theo giá trị trường `Họ và tên cán bộ` trên giao diện. | `Vũ Đình Trọng` |
| 9 | Khối lặp - Điều 1 | `##ChucVuCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Chức vụ | Theo giá trị trường `Chức vụ` trên giao diện. | `Chuyên viên` |
| 10 | Khối lặp - Điều 1 | `##DonViCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Đơn vị công tác | Theo giá trị trường `Đơn vị công tác` trên giao diện, lấy Tên đơn vị. | `Sở Tư pháp Thành phố Hà Nội` |
| 11 | Khối lặp - Điều 1 | `##MucDoLoi##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Mức độ lỗi; Nội dung mức độ lỗi | Theo giá trị trường `Mức độ lỗi` trên giao diện:<br>- `Vô ý`: in `Lỗi vô ý`.<br>- `Cố ý nhưng không bị truy cứu trách nhiệm hình sự`: in `Lỗi cố ý nhưng không bị truy cứu trách nhiệm hình sự`.<br>- `Cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội`: in `Lỗi cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội`.<br>- `Khác`: in theo giá trị trường `Nội dung mức độ lỗi`. | `Lỗi vô ý` |
| 12 | Khối lặp - Điều 1 | `##SoTienHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Số tiền phải hoàn trả (đ) | Theo giá trị trường `Số tiền phải hoàn trả (đ)` trên giao diện.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `50.000.000` |
| 13 | Khối lặp - Điều 1 | `##SoTienHoanTraBangChu##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Số tiền phải hoàn trả (đ) | Theo giá trị trường `Số tiền phải hoàn trả (đ)` trên giao diện, chuyển thành chữ (Phần I mục 3). | `Năm mươi triệu đồng` |
| 14 | Khối lặp - Điều 1 | `##DieuKienHoanHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Điều kiện hoãn thực hiện việc hoàn trả (nếu có); Ngày bắt đầu hoãn; Ngày kết thúc hoãn (nếu có) | Theo quy tắc `##DieuKienHoanHoanTra##` của Mẫu 35/BTNN. | `Không` |
| 15 | Khối lặp - Điều 1 | `##GiamMucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Giảm mức hoàn trả | Theo giá trị trường `Giảm mức hoàn trả` trên giao diện.<br>- Trường trống: in `Không`. | `Không` |
| 16 | Khối lặp - Điều 1 | `##MienHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Miễn hoàn trả | Theo giá trị trường `Miễn hoàn trả` trên giao diện.<br>- Trường trống: in `Không`. | `Không` |
| 17 | Khối lặp - Điều 1 (4) | `##PhuongThucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Phương thức hoàn trả | Theo giá trị trường `Phương thức hoàn trả` trên giao diện. | `Nhiều lần` |
| 18 | Khối lặp - Cuối khối | `##KetThucKhoiCanBo##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 2: Ý kiến của hội đồng) | Danh sách ý kiến của Hội đồng theo từng người thi hành công vụ gây thiệt hại | Đánh dấu kết thúc khối lặp. Không in ra văn bản. | - |
| 19 | Bảng ký - Ô phải | `##ChucVuNguoiKy##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Chức vụ người ký | Theo giá trị trường `Chức vụ người ký` trên giao diện.<br>- In hoa toàn bộ. | `GIÁM ĐỐC` |
| 20 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Người ký | Theo giá trị trường `Người ký` trên giao diện. | `Phạm Quang Huy` |
| 21 | Nơi nhận | `##NoiNhanCoQuanTraLuong##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương | Danh sách `Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương` (không trùng) của các cán bộ trong Quyết định; mỗi cơ quan 01 dòng `- [Tên cơ quan];`.<br>- Bỏ cơ quan trùng `##TenCoQuanQuanLyNhaNuocBTNN##`.<br>- Không có cơ quan: bỏ dòng. | `- Ủy ban nhân dân phường Bồ Đề;` |

---

### 21. MẪU SỐ 37/BTNN: QUYẾT ĐỊNH GIẢM MỨC HOÀN TRẢ
- **Tên tệp template**: `Mau_37_BTNN_Template.docx`
- **Mục đích**: Giảm một phần số tiền phải hoàn trả cho người thi hành công vụ khi đáp ứng các điều kiện theo khoản 4 Điều 65 Luật TNBTCNN (lỗi vô ý và hoàn cảnh kinh tế gia đình đặc biệt khó khăn).
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quản lý xem xét trách nhiệm hoàn trả > Màn hình Xem chi tiết / Cập nhật hồ sơ hoàn trả (Bước 4: Thu tiền hoàn trả - chọn 01 / nhiều cán bộ, nút "Trình QĐ giảm bổ sung") > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả (Hình thức ký `Ký số trên hệ thống`, Tệp văn bản trình ký `Sinh văn bản theo mẫu 37/BTNN`)*.
- **Quy tắc đặt tên file tải về**: `Mau_37_BTNN_Quyet_dinh_giam_muc_hoan_tra_[Mã vụ việc].docx`
- **Khối lặp theo cán bộ**: 01 Quyết định chung cho các cán bộ được chọn của phần đơn vị; nội dung Điều 1 theo từng cán bộ (biến STT 8 - 16) lặp lại cho mỗi cán bộ, đánh số `1.`, `2.`, ... theo thứ tự trên popup. Giảm mức hoàn trả theo ý kiến của Hội đồng thể hiện trong Quyết định hoàn trả (Mẫu 36/BTNN), không sinh Mẫu 37/BTNN riêng.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (tên cơ quan ra quyết định giảm mức hoàn trả - (1)), `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##TenCoQuanQuanLyNhaNuocBTNN##` (11), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: Nơi nhận `- Như Điều 1 (để thực hiện);` / `- ##TenCoQuanQuanLyNhaNuocBTNN##;` / `- Lưu: VT, HSVV.`

#### Bảng mapping chi tiết Mẫu 37/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `37/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 15 tháng 06 năm 2026` |
| 3 | Căn cứ | `##SoQDGiaiQuyetBoiThuong##` | Quyết định giải quyết bồi thường > MH03 - Màn hình Chi tiết Quyết định giải quyết bồi thường | Số quyết định | Theo giá trị trường `Số quyết định` của Quyết định giải quyết bồi thường đã chi trả của vụ việc. | `18/QĐ-STP` |
| 4 | Căn cứ | `##NgayQDGiaiQuyetBoiThuong##` | Quyết định giải quyết bồi thường > MH03 - Màn hình Chi tiết Quyết định giải quyết bồi thường | Ngày ban hành | Theo giá trị trường `Ngày ban hành` của Quyết định giải quyết bồi thường đã chi trả của vụ việc.<br>Định dạng `dd/mm/yyyy`. | `20/01/2026` |
| 5 | Căn cứ (4) | `##TenNguoiYeuCauBoiThuong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả | Mã vụ việc | Họ và tên người yêu cầu bồi thường của vụ việc theo giá trị trường `Mã vụ việc` trên giao diện. | `Nguyễn Văn Nam` |
| 6 | Căn cứ, Điều 1 | `##SoQDHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Số quyết định | Theo giá trị trường `Số quyết định` (Quyết định hoàn trả) trên giao diện. | `36/QĐ-STP` |
| 7 | Căn cứ, Điều 1 | `##NgayQDHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Ngày quyết định | Theo giá trị trường `Ngày quyết định` (Quyết định hoàn trả) trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `15/05/2026` |
| 8 | Điều 1 (5) | `##TenNguoiThiHanhCongVu##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Họ và tên cán bộ | Theo giá trị trường `Họ và tên cán bộ` của cán bộ được giảm mức hoàn trả. | `Vũ Đình Trọng` |
| 9 | Điều 1 (6) | `##LyDoGiamMucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại (Bước 2); Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả (giảm bổ sung tại Bước 4) | Lý do giảm | Theo giá trị trường `Lý do giảm` của cán bộ; giảm bổ sung tại Bước 4: theo `Lý do giảm` nhập tại popup trình ký. | `có lỗi vô ý và có hoàn cảnh kinh tế gia đình đặc biệt khó khăn` |
| 10 | Điều 1 (7) | `##MucDoLoi##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Mức độ lỗi; Nội dung mức độ lỗi | Theo quy tắc `##MucDoLoi##` của Mẫu 35/BTNN. | `Lỗi vô ý` |
| 11 | Điều 1 | `##SoTienHoanTraBanDau##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả | Số tiền phải hoàn trả (đ) | Theo giá trị trường `Số tiền phải hoàn trả (đ)` của cán bộ trên popup (số tiền phải hoàn trả hiện tại của cán bộ, đã trừ các lần giảm trước).<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `50.000.000` |
| 12 | Điều 1 | `##SoTienHoanTraBanDauBangChu##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Số tiền cần hoàn trả (đ) | Theo giá trị `##SoTienHoanTraBanDau##`, chuyển thành chữ (Phần I mục 3). | `Năm mươi triệu đồng` |
| 13 | Điều 1 (8) | `##SoTienHoanTraDuocGiam##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả (giảm bổ sung tại Bước 4) | Số tiền hoàn trả được giảm (đ) | Theo giá trị trường `Số tiền hoàn trả được giảm (đ)` trên popup.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `20.000.000` |
| 14 | Điều 1 | `##SoTienConPhaiHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả (giảm bổ sung tại Bước 4) | Số tiền còn phải hoàn trả (đ) | Theo giá trị trường `Số tiền còn phải hoàn trả (đ)` trên popup (hệ thống tính = `##SoTienHoanTraBanDau##` - `##SoTienHoanTraDuocGiam##`).<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `30.000.000` |
| 15 | Điều 1 | `##SoTienConPhaiHoanTraBangChu##` | - | - | Chuyển `##SoTienConPhaiHoanTra##` thành chữ (Phần I mục 3). | `Ba mươi triệu đồng` |
| 16 | Điều 1 (9) | `##PhuongThucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Phương thức hoàn trả | Theo giá trị trường `Phương thức hoàn trả` trên giao diện. | `Nhiều lần` |

---

### 22. MẪU SỐ 38/BTNN: QUYẾT ĐỊNH MIỄN HOÀN TRẢ
- **Tên tệp template**: `Mau_38_BTNN_Template.docx`
- **Mục đích**: Miễn toàn bộ trách nhiệm hoàn trả cho người thi hành công vụ theo khoản 4a Điều 65 Luật TNBTCNN (sửa đổi 2026) khi người thi hành công vụ chết, mất tích hoặc hoàn cảnh đặc biệt hiểm nghèo.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quản lý xem xét trách nhiệm hoàn trả > Màn hình Xem chi tiết / Cập nhật hồ sơ hoàn trả (Bước 4: Thu tiền hoàn trả - chọn 01 / nhiều cán bộ, nút "Trình QĐ miễn bổ sung") > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả (Hình thức ký `Ký số trên hệ thống`, Tệp văn bản trình ký `Sinh văn bản theo mẫu 38/BTNN`)*.
- **Quy tắc đặt tên file tải về**: `Mau_38_BTNN_Quyet_dinh_mien_hoan_tra_[Mã vụ việc].docx`
- **Khối lặp theo cán bộ**: 01 Quyết định chung cho các cán bộ được chọn của phần đơn vị; nội dung Điều 1 theo từng cán bộ (biến STT 8 - 14) lặp lại cho mỗi cán bộ, đánh số `1.`, `2.`, ... theo thứ tự trên popup. Miễn hoàn trả theo ý kiến của Hội đồng thể hiện trong Quyết định hoàn trả (Mẫu 36/BTNN), không sinh Mẫu 38/BTNN riêng.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (tên cơ quan ra quyết định miễn hoàn trả - (1)), `##DiaDanh##` (2), `##ChucVuNguoiDungDau##` (3), `##TenCoQuanQuanLyNhaNuocBTNN##` (11), `##ChucVuNguoiKy##`, `##HoTenNguoiKy##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Nội dung cố định**: `- Số tiền còn phải hoàn trả: 0 VNĐ` / `(Bằng chữ: không đồng).`; Nơi nhận `- Như Điều 1 (để thực hiện);` / `- ##TenCoQuanQuanLyNhaNuocBTNN##;` / `- Lưu: VT, HSVV.`
- **Ghi chú (7) của mẫu**: Miễn hoàn trả quyết định ngay khi họp Hội đồng thì không khai các mục (5), (6), (8), (9).

#### Bảng mapping chi tiết Mẫu 38/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `38/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng: `ngày dd tháng mm năm yyyy`. | `ngày 25 tháng 06 năm 2026` |
| 3 | Căn cứ | `##SoQDGiaiQuyetBoiThuong##` | Quyết định giải quyết bồi thường > MH03 - Màn hình Chi tiết Quyết định giải quyết bồi thường | Số quyết định | Theo giá trị trường `Số quyết định` của Quyết định giải quyết bồi thường đã chi trả của vụ việc. | `18/QĐ-STP` |
| 4 | Căn cứ | `##NgayQDGiaiQuyetBoiThuong##` | Quyết định giải quyết bồi thường > MH03 - Màn hình Chi tiết Quyết định giải quyết bồi thường | Ngày ban hành | Theo giá trị trường `Ngày ban hành` của Quyết định giải quyết bồi thường đã chi trả của vụ việc.<br>Định dạng `dd/mm/yyyy`. | `20/01/2026` |
| 5 | Căn cứ (4) | `##TenNguoiYeuCauBoiThuong##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả | Mã vụ việc | Họ và tên người yêu cầu bồi thường của vụ việc theo giá trị trường `Mã vụ việc` trên giao diện. | `Nguyễn Văn Nam` |
| 6 | Căn cứ, Điều 1 | `##SoQDHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Số quyết định | Theo giá trị trường `Số quyết định` (Quyết định hoàn trả) trên giao diện. | `36/QĐ-STP` |
| 7 | Căn cứ, Điều 1 | `##NgayQDHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Màn hình Cập nhật hồ sơ hoàn trả (Bước 3: Ban hành QĐ) | Ngày quyết định | Theo giá trị trường `Ngày quyết định` (Quyết định hoàn trả) trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `15/05/2026` |
| 8 | Điều 1 (5) | `##TenNguoiThiHanhCongVu##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Họ và tên cán bộ | Theo giá trị trường `Họ và tên cán bộ` của cán bộ được miễn hoàn trả. | `Vũ Đình Trọng` |
| 9 | Điều 1 (6) | `##MucDoLoi##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Mức độ lỗi; Nội dung mức độ lỗi | Theo quy tắc `##MucDoLoi##` của Mẫu 35/BTNN. | `Lỗi vô ý` |
| 10 | Điều 1 (7) | `##SoTienHoanTraBanDau##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Số tiền cần hoàn trả (đ) | Theo giá trị trường `Số tiền cần hoàn trả (đ)` trên giao diện; miễn bổ sung tại Bước 4: số tiền phải hoàn trả hiện tại của cán bộ.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `50.000.000` |
| 11 | Điều 1 | `##SoTienHoanTraBanDauBangChu##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Số tiền cần hoàn trả (đ) | Theo giá trị `##SoTienHoanTraBanDau##`, chuyển thành chữ (Phần I mục 3). | `Năm mươi triệu đồng` |
| 12 | Điều 1 (8) | `##PhuongThucHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại | Phương thức hoàn trả | Theo giá trị trường `Phương thức hoàn trả` trên giao diện. | `Một lần` |
| 13 | Điều 1 (9) | `##SoTienHoanTraDuocMien##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại (Bước 2); Màn hình Cập nhật hồ sơ hoàn trả (Bước 4: Thu tiền hoàn trả) | Số tiền cần hoàn trả (đ); Còn phải thu | Bằng `##SoTienHoanTraBanDau##` (miễn toàn bộ); miễn bổ sung tại Bước 4: bằng `Còn phải thu` của cán bộ.<br>- Định dạng phân cách hàng nghìn bằng dấu chấm. | `50.000.000` |
| 14 | Điều 1 (10) | `##LyDoMienHoanTra##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Thêm/Cập nhật người thi hành công vụ gây thiệt hại (Bước 2); Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả (miễn bổ sung tại Bước 4) | Lý do miễn | Theo giá trị trường `Lý do miễn` của cán bộ; miễn bổ sung tại Bước 4: theo `Lý do miễn` nhập tại popup trình ký. | `người thi hành công vụ đã chết` |

---

<a id="mau-39"></a>
### 23. MẪU SỐ 39/BTNN: QUYẾT ĐỊNH ĐÌNH CHỈ VIỆC XEM XÉT TRÁCH NHIỆM HOÀN TRẢ
- **Tên tệp template**: `Mau_39_BTNN_Template.docx`
- **Mục đích**: Đình chỉ việc xem xét trách nhiệm hoàn trả theo khoản 2 Điều 69 Luật TNBTCNN (sửa đổi 2026) khi văn bản làm căn cứ yêu cầu bồi thường đã bị cơ quan nhà nước có thẩm quyền thu hồi, sửa đổi, hủy bỏ hoặc không còn là căn cứ bồi thường.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Quản lý xem xét trách nhiệm hoàn trả > Màn hình Xem chi tiết / Cập nhật hồ sơ hoàn trả > Nút "Đình chỉ" (hoặc "Trình ký lại" với hồ sơ `Bị trả lại QĐ đình chỉ`) > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả (Hình thức ký `Ký số trên hệ thống`, Tệp văn bản trình ký `Sinh văn bản theo mẫu 39/BTNN`; nút `Xem trước văn bản`)*; đình chỉ cấp cán bộ: *Bước 3 (Quyết định hoàn trả của phần đơn vị chưa ban hành) > Phần đơn vị > chọn cán bộ > Nút "Trình ký QĐ đình chỉ" (hoặc "Trình ký lại" tại khối Quyết định đình chỉ) > cùng Popup ở chế độ cấp cán bộ*; các trường `Căn cứ`, `Văn bản làm căn cứ yêu cầu bồi thường`, `Nơi nhận` lấy tại khối `Lý do, căn cứ đình chỉ`; đơn vị ban hành là cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##TenCoQuanChuQuan##`, `##TenCoQuanGiaiQuyetBoiThuong##` (tên cơ quan đã chi trả tiền bồi thường), `##DiaDanh##` (2) theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Đình chỉ cấp cán bộ**: `##TenCoQuanGiaiQuyetBoiThuong##`, `##TenCoQuanChuQuan##`, `##ChucVuNguoiDungDau##`, `##ChucVuNguoiKy##` lấy theo cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại (đơn vị ban hành Quyết định đình chỉ). Template không có vị trí ghi danh sách cán bộ được đình chỉ nên không bổ sung biến; danh sách cán bộ lưu theo lượt trình trên hệ thống.
- **Quy tắc đặt tên file tải về**: `Mau_39_BTNN_Quyet_dinh_dinh_chi_xem_xet_hoan_tra_[Mã vụ việc].docx`

#### Bảng mapping chi tiết Mẫu 39/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái (1) | `##SoKyHieuVanBan##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả | Số, ký hiệu văn bản | Theo giá trị trường `Số, ký hiệu văn bản` trên giao diện. | `39/QĐ-STP` |
| 2 | Bảng đầu trang - Ô phải (2) | `##NgayThangNamBanHanh##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả | Ngày văn bản | Theo giá trị trường `Ngày văn bản` trên giao diện.<br>Định dạng trên mẫu: `ngày dd tháng mm năm yyyy`. | `ngày 12 tháng 06 năm 2026` |
| 3 | Dưới tên văn bản (3) | `##ChucVuNguoiDungDau##` | Quản lý cơ cấu tổ chức > Danh mục Chức vụ [DM_58]; Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả (dòng phụ đề) | Tên chức vụ; Đơn vị chi trả bồi thường | Ghép Chức vụ đầu tiên của Loại cơ quan của cơ quan đã chi trả tiền bồi thường trong Danh mục Chức vụ [DM_58] và Tên cơ quan, đơn vị theo giá trị trường `Đơn vị chi trả bồi thường` trên giao diện.<br>- Từ cuối của chức vụ trùng từ đầu của tên cơ quan thì không lặp.<br>- In hoa toàn bộ. | `GIÁM ĐỐC SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 4 | Căn cứ (4) | `##CanCu##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả | Căn cứ | Theo giá trị trường `Căn cứ` trên giao diện.<br>- Mỗi dòng 01 căn cứ, sinh 01 đoạn in nghiêng theo thứ tự nhập; bỏ dòng trống. | `Căn cứ khoản 2 Điều 69 của Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (đã được sửa đổi, bổ sung bởi Luật số 15/2026/QH16);`<br>`Căn cứ Quyết định giám đốc thẩm số 05/2026/GĐT-HS ngày 10/06/2026 của Hội đồng Thẩm phán Tòa án nhân dân tối cao,` |
| 5 | Điều 1 (5) | `##TenNguoiBiThietHai##` | Quản lý xem xét trách nhiệm hoàn trả > Thông tin vụ việc bồi thường gốc | Họ và tên / Tên tổ chức bị thiệt hại | Lấy theo trường `Loại người yêu cầu`:<br>- Khi là `Cá nhân`: Lấy theo trường `Họ và tên` người bị thiệt hại, tiền tố `Ông/Bà`.<br>- Khi là `Tổ chức`: Lấy theo trường `Tên tổ chức` bị thiệt hại, không có tiền tố. | `Ông/Bà Nguyễn Khắc Hoài` hoặc `Hợp tác xã Nông nghiệp Hòa Bình` |
| 6 | Điều 1 (6) | `##VanBanLamCanCuYCBT##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả | Văn bản làm căn cứ yêu cầu bồi thường | Theo giá trị trường `Văn bản làm căn cứ yêu cầu bồi thường` trên giao diện. | `Bản án hình sự phúc thẩm số 18/2025/HSPT ngày 10/11/2025 của Tòa án nhân dân cấp cao tại Hà Nội` |
| 7 | Nơi nhận (7), (8) | `##NoiNhan##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả | Nơi nhận | Theo giá trị trường `Nơi nhận` trên giao diện.<br>- Mỗi dòng là 01 nơi nhận. | `- Ông Vũ Đình Trọng;`<br>`- Sở Tư pháp Thành phố Hà Nội;`<br>`- Lưu: VT, HSVV.` |
| 8 | Bảng ký - Ô phải | `##ChucVuNguoiKy##` | Quản lý cơ cấu tổ chức > Danh mục Chức vụ [DM_58] | Chức vụ của người đứng đầu cơ quan đã chi trả tiền bồi thường | Chức vụ đầu tiên trong Danh mục Chức vụ [DM_58] theo Loại cơ quan [DM_57] của cơ quan đã chi trả tiền bồi thường.<br>Định dạng chữ in hoa. | `GIÁM ĐỐC` |
| 9 | Bảng ký - Ô phải | `##HoTenNguoiKy##` | Quản lý xem xét trách nhiệm hoàn trả > Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Phạm Quang Huy` |

---

### 24. MẪU SỐ 41/BTNN: DANH MỤC VỤ VIỆC GIẢI QUYẾT YÊU CẦU BỒI THƯỜNG
- **Tên tệp template**: `Mau_41_BTNN_Template.docx`
- **Mục đích**: Danh mục vụ việc giải quyết yêu cầu bồi thường theo 06 nhóm lĩnh vực, thuộc bộ Báo cáo công tác bồi thường nhà nước của Sở Tư pháp.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo > Tab Mẫu 41/BTNN*; sinh văn bản khi `Xem trước PDF`, `Gửi phê duyệt` (Popup Gửi phê duyệt) và khi Lãnh đạo cấp cuối Ký duyệt (văn bản ban hành).
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Khối lặp theo nhóm lĩnh vực**: Mỗi nhóm I - VI có 01 dòng lặp, đánh dấu bằng cặp biến `##BatDauDongVuViecM41Nhom[I..VI]##` (ô STT) và `##KetThucDongVuViecM41Nhom[I..VI]##` (ô Ghi chú); mỗi vụ việc của nhóm trên giao diện sinh 01 dòng theo thứ tự nhập. Nhóm không có vụ việc: bỏ dòng lặp, giữ dòng tên nhóm. Hai biến đánh dấu không in ra văn bản.
- **Quy tắc đặt tên file tải về**: `Mau_41_BTNN_Danh_muc_vu_viec_[Năm báo cáo]_[Mã đơn vị].pdf`

#### Bảng mapping chi tiết Mẫu 41/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Ô "CƠ QUAN LẬP DANH MỤC" | `##TenCoQuanBaoCao##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Tên cơ quan, đơn vị | Tên đơn vị báo cáo của bản ghi (Sở Tư pháp lập báo cáo).<br>- In hoa toàn bộ. | `SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 2 | Khối lặp - Đầu dòng (ô STT) | `##BatDauDongVuViecM41NhomI##` ... `##BatDauDongVuViecM41NhomVI##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Danh sách vụ việc của nhóm | Đánh dấu bắt đầu dòng lặp của nhóm tương ứng. Không in ra văn bản. | - |
| 3 | Khối lặp - STT | `##SttVuViecM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | STT | Theo số thứ tự dòng vụ việc trong nhóm (1, 2, 3...). | `1` |
| 4 | Khối lặp - Cột (1) | `##HoTenNguoiYeuCauM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Họ và tên của người yêu cầu bồi thường (1) | Theo giá trị trường `Họ và tên của người yêu cầu bồi thường (1)` trên giao diện. | `Nguyễn Văn Hùng` |
| 5 | Khối lặp - Cột (2) | `##DiaChiNguoiYeuCauM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Địa chỉ của người yêu cầu bồi thường (2) | Theo giá trị trường `Địa chỉ của người yêu cầu bồi thường (2)` trên giao diện. | `Số 10 đường Trần Phú, phường Ba Đình, Thành phố Hà Nội` |
| 6 | Khối lặp - Cột (3) | `##CoQuanGiaiQuyetM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Cơ quan giải quyết bồi thường (3) | Theo giá trị trường `Cơ quan giải quyết bồi thường (3)` trên giao diện. | `UBND Thành phố Hà Nội` |
| 7 | Khối lặp - Cột (4) | `##TinhHinhGiaiQuyetM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Tình hình giải quyết bồi thường (4) | Theo giá trị trường `Tình hình giải quyết bồi thường (4)` trên giao diện.<br>- Giữ nguyên xuống dòng. | `Có văn bản yêu cầu bồi thường ngày 10/03/2026; đã thụ lý, đang xác minh thiệt hại.` |
| 8 | Khối lặp - Cột (5) | `##KhoKhanVuongMacM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Khó khăn, vướng mắc (5) | Theo giá trị trường `Khó khăn, vướng mắc (5)` trên giao diện. | `Chậm cung cấp tài liệu chứng minh thiệt hại.` |
| 9 | Khối lặp - Cột (6) | `##GhiChuM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Ghi chú (6) | Theo giá trị trường `Ghi chú (6)` trên giao diện. | `Luật TNBTCNN năm 2017` |
| 10 | Khối lặp - Cuối dòng (ô Ghi chú) | `##KetThucDongVuViecM41NhomI##` ... `##KetThucDongVuViecM41NhomVI##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Danh sách vụ việc của nhóm | Đánh dấu kết thúc dòng lặp của nhóm tương ứng. Không in ra văn bản. | - |
| 11 | Dòng Tổng cộng | `##TongSoVuViecM41##` | Báo cáo Công tác BTNN > Tab Mẫu 41/BTNN | Tổng cộng | Tổng số dòng vụ việc của 06 nhóm.<br>- Định dạng `[Số] vụ việc`. | `3 vụ việc` |
| 12 | Bảng ký - NGƯỜI LẬP DANH MỤC | `##ChuKyNguoiLap##` | Thông tin cá nhân cán bộ (Hồ sơ cá nhân) | Chữ ký hình ảnh | Ảnh chữ ký hình ảnh gán với tài khoản cán bộ lập báo cáo (cán bộ thực hiện `Gửi phê duyệt`).<br>- Chưa có ảnh chữ ký: để trống. | (ảnh chữ ký) |
| 13 | Bảng ký - NGƯỜI LẬP DANH MỤC | `##HoTenNguoiLap##` | Thông tin cá nhân cán bộ (Hồ sơ cá nhân) | Họ và tên | Họ và tên của cán bộ lập báo cáo. | `Đỗ Văn Chung` |
| 14 | Bảng ký - THỦ TRƯỞNG CƠ QUAN LẬP DANH MỤC | `##HoTenNguoiKy##` | Báo cáo Công tác BTNN > Popup Gửi phê duyệt (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Phạm Quang Huy` |

---

### 25. MẪU SỐ 42/BTNN: BÁO CÁO CÔNG TÁC BỒI THƯỜNG NHÀ NƯỚC
- **Tên tệp template**: `Mau_42_BTNN_Template.docx`
- **Mục đích**: Báo cáo thuyết minh công tác bồi thường nhà nước năm, thuộc bộ Báo cáo công tác bồi thường nhà nước của Sở Tư pháp; mỗi mục trên mẫu là 01 ô nhập liệu.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo > Tab Mẫu 42/BTNN*; sinh văn bản như Mẫu 41/BTNN.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##`, `##DiaDanh##` theo Bảng trường thông tin dùng chung (Phần I mục 8); `##DiaDanh##` lấy theo đơn vị báo cáo của bản ghi.
- **Nội dung từng mục**: Mỗi biến nội dung được chèn thành 01 đoạn ngay dưới dòng tên mục tương ứng của mẫu; giữ nguyên xuống dòng; mục bỏ trống in `……`.
- **Quy tắc đặt tên file tải về**: `Mau_42_BTNN_Bao_cao_cong_tac_BTNN_[Năm báo cáo]_[Mã đơn vị].pdf`

#### Bảng mapping chi tiết Mẫu 42/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Bảng đầu trang - Ô trái "CƠ QUAN BÁO CÁO" | `##TenCoQuanBaoCao##` | Quản lý cơ cấu tổ chức > Quản lý đơn vị | Tên cơ quan, đơn vị | Tên đơn vị báo cáo của bản ghi.<br>- In hoa toàn bộ. | `SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 2 | Bảng đầu trang - Ô phải | `##NgayThangNamBanHanh##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Ngày báo cáo | Theo giá trị trường `Ngày báo cáo` trên giao diện.<br>Định dạng trên mẫu: `ngày dd tháng mm năm yyyy`. | `ngày 20 tháng 11 năm 2026` |
| 3 | Tên báo cáo; Mục I; Mục I.2 dòng 1 | `##NamBaoCaoM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Năm báo cáo | Theo giá trị trường `Năm báo cáo` trên giao diện. | `2026` |
| 4 | Mục II | `##NamKeHoachM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Năm báo cáo | Giá trị trường `Năm báo cáo` cộng 01. | `2027` |
| 5 | Mục I.1 - dòng 1 | `##DanhGiaTinhHinhYeuCauBoiThuongM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Đánh giá tình hình yêu cầu bồi thường, kết quả giải quyết bồi thường | Theo giá trị trường `Đánh giá tình hình yêu cầu bồi thường, kết quả giải quyết bồi thường` trên giao diện. | `Trong kỳ, trên địa bàn phát sinh 05 yêu cầu bồi thường...` |
| 6 | Mục I.1 - dòng 2 | `##CapPhatKinhPhiChiTraBoiThuongM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Việc cấp phát kinh phí và chi trả tiền bồi thường | Theo giá trị trường `Việc cấp phát kinh phí và chi trả tiền bồi thường` trên giao diện. | `Kinh phí bồi thường được cấp phát kịp thời...` |
| 7 | Mục I.1 - dòng 3 | `##XacDinhTrachNhiemHoanTraM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Việc xác định trách nhiệm hoàn trả của người thi hành công vụ gây thiệt hại | Theo giá trị trường cùng tên trên giao diện. | `Đã xem xét trách nhiệm hoàn trả 01 vụ việc.` |
| 8 | Mục I.1 - dòng 4 | `##XuLyKyLuatNguoiThiHanhCongVuM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Việc xử lý kỷ luật người thi hành công vụ gây thiệt hại | Theo giá trị trường cùng tên trên giao diện. | `Không phát sinh.` |
| 9 | Mục I.2 - dòng 1 | `##KeHoachCongTacBoiThuongM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Xây dựng và thực hiện Kế hoạch công tác bồi thường nhà nước năm [Năm báo cáo] | Theo giá trị trường cùng tên trên giao diện. | `Ban hành Kế hoạch số 12/KH-STP ngày 15/01/2026.` |
| 10 | Mục I.2 - dòng 2 | `##XayDungHoanThienTheCheM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Công tác xây dựng, hoàn thiện thể chế về trách nhiệm bồi thường của Nhà nước (đối với Bộ, ngành Trung ương) | Theo giá trị trường cùng tên trên giao diện. | `……` |
| 11 | Mục I.2 - dòng 3 | `##PhoBienGiaoDucPhapLuatM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Công tác phổ biến, giáo dục pháp luật về trách nhiệm bồi thường của Nhà nước | Theo giá trị trường cùng tên trên giao diện. | `Tổ chức 02 hội nghị phổ biến Luật số 15/2026/QH16.` |
| 12 | Mục I.2 - dòng 4 | `##QuanLyChuyenNganhBoiThuongM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Thực hiện quản lý chuyên ngành về bồi thường nhà nước | Theo giá trị trường cùng tên trên giao diện. | `Hướng dẫn nghiệp vụ cho 05 cơ quan giải quyết bồi thường.` |
| 13 | Mục I.2 - dòng 5 | `##ChiDaoGiaiQuyetBoiThuongM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Chỉ đạo cơ quan giải quyết bồi thường thực hiện giải quyết bồi thường, xác định trách nhiệm hoàn trả... | Theo giá trị trường cùng tên trên giao diện. | `……` |
| 14 | Mục I.2 - dòng 6 | `##ChiDaoXuLyViPhamM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Chỉ đạo xử lý vi phạm trong việc giải quyết bồi thường, thực hiện trách nhiệm hoàn trả | Theo giá trị trường cùng tên trên giao diện. | `……` |
| 15 | Mục I.2 - dòng 7 | `##CongTacPhoiHopM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Công tác phối hợp thực hiện công tác bồi thường nhà nước | Theo giá trị trường cùng tên trên giao diện. | `……` |
| 16 | Mục I.2 - dòng 8 | `##CongTacBaoCaoThongKeM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Công tác báo cáo, thống kê về công tác bồi thường nhà nước | Theo giá trị trường cùng tên trên giao diện. | `……` |
| 17 | Mục I.3 - dòng 1 | `##KetQuaDatDuocM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Đánh giá chung những kết quả đạt được | Theo giá trị trường cùng tên trên giao diện. | `Công tác bồi thường được triển khai đồng bộ.` |
| 18 | Mục I.3 - dòng 2 | `##VuongMacBatCapNguyenNhanM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Những vướng mắc, bất cập và nguyên nhân | Theo giá trị trường cùng tên trên giao diện. | `Việc xác minh thiệt hại còn kéo dài.` |
| 19 | Mục II | `##NhiemVuTrongTamGiaiPhapM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Nhiệm vụ trọng tâm và giải pháp thực hiện công tác bồi thường nhà nước năm [Năm báo cáo + 1] | Theo giá trị trường cùng tên trên giao diện. | `Tiếp tục hướng dẫn nghiệp vụ...` |
| 20 | Mục III | `##DeXuatKienNghiM42##` | Báo cáo Công tác BTNN > Tab Mẫu 42/BTNN | Đề xuất, kiến nghị | Theo giá trị trường `Đề xuất, kiến nghị` trên giao diện. | `Đề nghị Bộ Tư pháp tổ chức tập huấn...` |
| 21 | Bảng ký - THỦ TRƯỞNG ĐƠN VỊ | `##HoTenNguoiKy##` | Báo cáo Công tác BTNN > Popup Gửi phê duyệt (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Phạm Quang Huy` |

---

### 26. MẪU SỐ 43/BTNN: TỔNG HỢP TÌNH HÌNH YÊU CẦU BỒI THƯỜNG, GIẢI QUYẾT BỒI THƯỜNG VÀ CHI TRẢ TIỀN BỒI THƯỜNG
- **Tên tệp template**: `Mau_43_BTNN_Template.docx`
- **Mục đích**: Bảng số liệu 27 cột theo 06 nhóm lĩnh vực, thuộc bộ Báo cáo công tác bồi thường nhà nước của Sở Tư pháp.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo > Tab Mẫu 43/BTNN*; sinh văn bản như Mẫu 41/BTNN.
- **Biến dùng chung**: `##SoHieuNghiDinh##`, `##NgayBanHanhNghiDinh##` theo Bảng trường thông tin dùng chung (Phần I mục 8).
- **Quy tắc ô số liệu**: `[k]` là thứ tự nhóm (1 - I. Quản lý hành chính; 2 - II. Tố tụng hình sự; 3 - III. Tố tụng dân sự; 4 - IV. Tố tụng hành chính; 5 - V. Thi hành án hình sự; 6 - VI. Thi hành án dân sự); `[n]` là số cột từ 2 đến 27. Cột 2 = Cột 3+4+5+6+7+8+9+10; Cột 11 = Cột 12+13+14+15; Cột 17 = Cột 18+19+20+21 (hệ thống tự tính). Cột 16, 26, 27 (nghìn đồng): phân cách hàng nghìn bằng dấu chấm; các cột khác là số nguyên; giá trị 0 in `0`.
- **Quy tắc đặt tên file tải về**: `Mau_43_BTNN_Tong_hop_tinh_hinh_[Năm báo cáo]_[Mã đơn vị].pdf`

#### Bảng mapping chi tiết Mẫu 43/BTNN:
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Dưới tên biểu - Từ ngày | `##TuNgaySoLieuM43##` | Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo | Thời gian số liệu (Từ ngày) | Theo giá trị Từ ngày của trường `Thời gian số liệu` trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `01/01/2026` |
| 2 | Dưới tên biểu - Đến ngày | `##DenNgaySoLieuM43##` | Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo | Thời gian số liệu (Đến ngày) | Theo giá trị Đến ngày của trường `Thời gian số liệu` trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `31/10/2026` |
| 3 | Dòng tổng (dưới dòng số thứ tự cột) - Cột [n] | `##M43TongCot[n]##` (`##M43TongCot2##` ... `##M43TongCot27##`) | Báo cáo Công tác BTNN > Tab Mẫu 43/BTNN | Dòng Tổng cộng - Cột [n] | Theo giá trị ô `Cột [n]` của dòng `Tổng cộng` trên giao diện (tổng 06 nhóm). | `44` |
| 4 | Dòng số liệu của nhóm [k] - Cột [n] | `##M43Nhom[k]Cot[n]##` (`##M43Nhom1Cot2##` ... `##M43Nhom6Cot27##`) | Báo cáo Công tác BTNN > Tab Mẫu 43/BTNN | Nhóm [k] - Cột [n] | Theo giá trị ô `Cột [n]` của nhóm [k] trên giao diện. | `5` |
| 5 | Bảng ký - Người lập biểu | `##ChuKyNguoiLap##` | Thông tin cá nhân cán bộ (Hồ sơ cá nhân) | Chữ ký hình ảnh | Ảnh chữ ký hình ảnh gán với tài khoản cán bộ lập báo cáo (cán bộ thực hiện `Gửi phê duyệt`).<br>- Chưa có ảnh chữ ký: để trống. | (ảnh chữ ký) |
| 6 | Bảng ký - Người lập biểu | `##HoTenNguoiLap##` | Thông tin cá nhân cán bộ (Hồ sơ cá nhân) | Họ và tên | Họ và tên của cán bộ lập báo cáo. | `Đỗ Văn Chung` |
| 7 | Bảng ký - Ngày | `##NgayLapBieuM43##` | Báo cáo Công tác BTNN > Màn hình Ký duyệt / Từ chối | Thời điểm Ký duyệt của Lãnh đạo cấp cuối | Ngày (dd) Lãnh đạo cấp cuối Ký duyệt.<br>- Văn bản dự thảo: in `........`. | `09` |
| 8 | Bảng ký - Tháng | `##ThangLapBieuM43##` | Báo cáo Công tác BTNN > Màn hình Ký duyệt / Từ chối | Thời điểm Ký duyệt của Lãnh đạo cấp cuối | Tháng (mm) Lãnh đạo cấp cuối Ký duyệt.<br>- Văn bản dự thảo: in `........`. | `11` |
| 9 | Bảng ký - Năm | `##NamLapBieuM43##` | Báo cáo Công tác BTNN > Màn hình Ký duyệt / Từ chối | Thời điểm Ký duyệt của Lãnh đạo cấp cuối | Năm (yyyy) Lãnh đạo cấp cuối Ký duyệt.<br>- Văn bản dự thảo: in `.......`. | `2026` |
| 10 | Bảng ký - Thủ trưởng đơn vị | `##HoTenNguoiKy##` | Báo cáo Công tác BTNN > Popup Gửi phê duyệt (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Phạm Quang Huy` |

### 27. MẪU SỐ 04 (TT 08/2019): TÌNH HÌNH THỰC HIỆN TRÁCH NHIỆM HOÀN TRẢ
- **Tên tệp template**: `Mau_04_TT08_Template.docx`
- **Mục đích**: Bảng số liệu 15 cột theo 06 nhóm lĩnh vực về tình hình thực hiện trách nhiệm hoàn trả, theo Biểu mẫu số 04 ban hành kèm theo Thông tư số 08/2019/TT-BTP ngày 10/12/2019; thuộc bộ Báo cáo công tác bồi thường nhà nước của Sở Tư pháp và báo cáo tổng hợp của Bộ Tư pháp.
- **Màn hình kích hoạt**: *Website Quản trị > Công tác bồi thường nhà nước > Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo (hoặc Màn hình Báo cáo tổng hợp của Bộ Tư pháp) > Tab Mẫu số 04 (TT 08/2019)*; sinh văn bản như Mẫu 41/BTNN.
- **Phần giữ nguyên câu chữ của mẫu**: tiêu đề `BIỂU MẪU SỐ 04`, dòng ban hành kèm theo, Quốc hiệu, Tiêu ngữ, tên biểu, tiêu đề cột, tên 06 nhóm, nhãn ký, mục `Nguồn lấy số liệu` và `Hướng dẫn thống kê số liệu tình hình thực hiện trách nhiệm hoàn trả`.
- **Quy tắc ô số liệu**: `[k]` là thứ tự nhóm (1 - I. Quản lý hành chính; 2 - II. Tố tụng hình sự; 3 - III. Tố tụng dân sự; 4 - IV. Tố tụng hành chính; 5 - V. Thi hành án hình sự; 6 - VI. Thi hành án dân sự); `[n]` là số cột từ 2 đến 15. Cột 3 = Cột 4 + 6; Cột 12 = Cột 13 + 14 (hệ thống tự tính). Cột 2, 5, 10, 12, 13, 14, 15 (nghìn đồng): phân cách hàng nghìn bằng dấu chấm; các cột khác là số nguyên; giá trị 0 in `0`.
- **Quy tắc đặt tên file tải về**: `Mau_04_TT08_Tinh_hinh_hoan_tra_[Năm báo cáo]_[Mã đơn vị].pdf`

#### Bảng mapping chi tiết Mẫu số 04 (TT 08/2019):
| STT | Vị trí trên mẫu | Tên biến | Màn hình nguồn | Trường dữ liệu trên giao diện | Quy tắc xử lý & Định dạng | Ví dụ |
|:---:|---|---|---|---|---|---|
| 1 | Góc trái đầu văn bản (Cơ quan báo cáo) | `##TenCoQuanBaoCao##` | Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo | Đơn vị báo cáo | Theo giá trị trường `Đơn vị báo cáo` trên giao diện.<br>- In hoa toàn bộ. | `SỞ TƯ PHÁP THÀNH PHỐ HÀ NỘI` |
| 2 | Dưới tên biểu - Từ ngày | `##TuNgaySoLieuM04##` | Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo | Thời gian số liệu (Từ ngày) | Theo giá trị Từ ngày của trường `Thời gian số liệu` trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `01/01/2026` |
| 3 | Dưới tên biểu - Đến ngày | `##DenNgaySoLieuM04##` | Báo cáo Công tác BTNN > Màn hình Chi tiết / Nhập liệu báo cáo | Thời gian số liệu (Đến ngày) | Theo giá trị Đến ngày của trường `Thời gian số liệu` trên giao diện.<br>Định dạng `dd/mm/yyyy`. | `31/10/2026` |
| 4 | Dòng tổng (dưới dòng số thứ tự cột) - Cột [n] | `##M04TongCot[n]##` (`##M04TongCot2##` ... `##M04TongCot15##`) | Báo cáo Công tác BTNN > Tab Mẫu số 04 (TT 08/2019) | Dòng Tổng cộng - Cột [n] | Theo giá trị ô `Cột [n]` của dòng `Tổng cộng` trên giao diện (tổng 06 nhóm). | `695.000` |
| 5 | Dòng số liệu của nhóm [k] - Cột [n] | `##M04Nhom[k]Cot[n]##` (`##M04Nhom1Cot2##` ... `##M04Nhom6Cot15##`) | Báo cáo Công tác BTNN > Tab Mẫu số 04 (TT 08/2019) | Nhóm [k] - Cột [n] | Theo giá trị ô `Cột [n]` của nhóm [k] trên giao diện. | `94.000` |
| 6 | Bảng ký - Người lập biểu | `##ChuKyNguoiLap##` | Thông tin cá nhân cán bộ (Hồ sơ cá nhân) | Chữ ký hình ảnh | Ảnh chữ ký hình ảnh gán với tài khoản cán bộ lập báo cáo (cán bộ thực hiện `Gửi phê duyệt`).<br>- Chưa có ảnh chữ ký: để trống. | (ảnh chữ ký) |
| 7 | Bảng ký - Người lập biểu | `##HoTenNguoiLap##` | Thông tin cá nhân cán bộ (Hồ sơ cá nhân) | Họ và tên | Họ và tên của cán bộ lập báo cáo. | `Đỗ Văn Chung` |
| 8 | Bảng ký - Ngày | `##NgayLapBieuM04##` | Báo cáo Công tác BTNN > Màn hình Ký duyệt / Từ chối | Thời điểm Ký duyệt của Lãnh đạo cấp cuối | Ngày (dd) Lãnh đạo cấp cuối Ký duyệt.<br>- Văn bản dự thảo: in `........`. | `09` |
| 9 | Bảng ký - Tháng | `##ThangLapBieuM04##` | Báo cáo Công tác BTNN > Màn hình Ký duyệt / Từ chối | Thời điểm Ký duyệt của Lãnh đạo cấp cuối | Tháng (mm) Lãnh đạo cấp cuối Ký duyệt.<br>- Văn bản dự thảo: in `........`. | `11` |
| 10 | Bảng ký - Năm | `##NamLapBieuM04##` | Báo cáo Công tác BTNN > Màn hình Ký duyệt / Từ chối | Thời điểm Ký duyệt của Lãnh đạo cấp cuối | Năm (yyyy) Lãnh đạo cấp cuối Ký duyệt.<br>- Văn bản dự thảo: in `.......`. | `2026` |
| 11 | Bảng ký - Thủ trưởng cơ quan | `##HoTenNguoiKy##` | Báo cáo Công tác BTNN > Popup Gửi phê duyệt (Bước 2) | Lãnh đạo (cấp ký duyệt cuối cùng) | Theo giá trị trường `Lãnh đạo` của cấp ký duyệt cuối cùng trên giao diện.<br>- Chỉ lấy Họ và tên. | `Phạm Quang Huy` |

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

## PHẦN IV. DANH MỤC 27 PHÔI BIỂU MẪU .DOCX ĐÃ XÂY DỰNG

| STT | Mã biểu mẫu | Tên biểu mẫu văn bản | Tên tệp tin phôi `.docx` |
|:---:|---|---|---|
| 1 | Mẫu 02/BTNN | Giấy tiếp nhận yêu cầu bồi thường | [Mau_02_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_02_BTNN_Template.docx) |
| 2 | Mẫu 03/BTNN | Thông báo về việc bổ sung hồ sơ yêu cầu bồi thường | [Mau_03_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_03_BTNN_Template.docx) |
| 3 | Mẫu 04/BTNN | Thông báo về việc thụ lý / không thụ lý hồ sơ yêu cầu bồi thường (02 trường hợp: Thông báo thụ lý hồ sơ yêu cầu bồi thường; Thông báo không thụ lý hồ sơ yêu cầu bồi thường) | [Mau_04_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_04_BTNN_Template.docx) |
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
| 24 | Mẫu 41/BTNN | Danh mục vụ việc giải quyết yêu cầu bồi thường | [Mau_41_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_41_BTNN_Template.docx) |
| 25 | Mẫu 42/BTNN | Báo cáo công tác bồi thường nhà nước | [Mau_42_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_42_BTNN_Template.docx) |
| 26 | Mẫu 43/BTNN | Tổng hợp tình hình yêu cầu bồi thường, giải quyết bồi thường và chi trả tiền bồi thường | [Mau_43_BTNN_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_43_BTNN_Template.docx) |
| 27 | Mẫu số 04 (TT 08/2019) | Tình hình thực hiện trách nhiệm hoàn trả | [Mau_04_TT08_Template.docx](file:///g:/My%20Drive/FIS/1.%20Giao%20dich%20dam%20bao_Ca%20nhan/Giao%20dich%20bao%20dam%20va%20BTNN_Project/UI_Mockups_Git_BPBD_UI/Bieu_mau/Boi_thuong_nha_nuoc/Mau_04_TT08_Template.docx) |

---
*Tài liệu được cập nhật tự động và đồng bộ trực tiếp với bộ mã nguồn phôi văn bản `.docx` của phân hệ Bồi thường nhà nước.*
