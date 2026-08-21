### 4.1.17. UC152 - Lập yêu cầu cung cấp bản sao kèm thông báo về việc đăng ký thế chấp

#### 4.1.17.1. Mục đích
\- Cho phép Người sử dụng (NSD) là Khách hàng (Cá nhân, Tổ chức) thực hiện lập yêu cầu cung cấp bản sao kèm thông báo về việc đăng ký thế chấp đã được phê duyệt "Hoàn thành" trên hệ thống trực tuyến.
\- Người dùng chỉ cần nhập Số đăng ký. Hệ thống tự động xác thực và hiển thị thông tin hồ sơ gốc ở chế độ chỉ đọc (Read-only) với tiêu đề và nội dung động thay đổi theo từng loại nghiệp vụ gốc (Đăng ký lần đầu, Đăng ký thay đổi, Xóa đơn đăng ký, Thông báo xử lý tài sản bảo đảm, Xóa thông báo xử lý tài sản bảo đảm).
\- Hỗ trợ tính lệ phí tự động và liên kết trực tiếp sang Cổng thanh toán trực tuyến (`UC158`) để thu phí cung cấp bản sao kèm thông báo thế chấp theo quy định trước khi chuyển hồ sơ vào hàng đợi phê duyệt.

*a. Phân quyền*

\- Khách hàng (Cá nhân, Tổ chức).

*b. Điều kiện thực hiện*

\- Người dùng đã truy cập thành công vào hệ thống.
\- Hồ sơ/Số đăng ký yêu cầu cung cấp bản sao kèm thông báo thế chấp phải ở trạng thái "Hoàn thành" (đã có hiệu lực pháp lý) trong Cơ sở dữ liệu quốc gia về biện pháp bảo đảm.
\- Cổng thanh toán trực tuyến hoạt động bình thường.

---

#### 4.1.17.2. UC152.MH01 - Màn hình Yêu cầu cung cấp bản sao kèm thông báo về việc đăng ký thế chấp

##### 4.1.17.2.1. Màn hình
\- Giao diện gồm form nhập tiêu chí khởi tạo yêu cầu cung cấp bản sao kèm thông báo về việc đăng ký thế chấp.
\- Biểu mẫu hiển thị tiêu đề chính: **YÊU CẦU CUNG CẤP BẢN SAO KÈM THÔNG BÁO VỀ VIỆC ĐĂNG KÝ THẾ CHẤP**.
\- NSD thực hiện nhập thông tin bắt buộc là Số đăng ký cần cung cấp bản sao kèm thông báo thế chấp, sau đó click nút Tiếp tục.
\- Hình ảnh minh họa giao diện:
![Màn hình Khởi tạo yêu cầu cung cấp bản sao kèm thông báo thế chấp](images/UC152_MH01.png)

##### 4.1.17.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số đăng ký | String(50) | Có | Trống | - Nhập chính xác số đăng ký của hồ sơ cần yêu cầu cung cấp bản sao kèm thông báo thế chấp (có thể là số đăng ký gốc lần đầu hoặc số thay đổi, số xóa, số thông báo...). |

##### 4.1.17.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tiếp tục | Nút bấm | - **Thao tác:** Người dùng bấm nút **[Tiếp tục]**.<br>- **Kiểm tra nghiệp vụ (Validation Rules):**<br>  + **TH1 (Bỏ trống trường bắt buộc):** Hệ thống kiểm tra nếu phát hiện trường bắt buộc nhập bị bỏ trống. Hệ thống hiển thị cảnh báo lỗi *"Trường này bắt buộc nhập"* màu đỏ ngay dưới trường thông tin bị bỏ trống. Chặn không cho tiếp tục.<br>  + **TH2 (Số đăng ký không tồn tại):** Hệ thống truy vấn CSDL theo số đăng ký đã nhập. Nếu không tìm thấy số đăng ký nào trùng khớp, hệ thống hiển thị thông báo lỗi: *"Số đăng ký không tồn tại trên hệ thống. Vui lòng kiểm tra lại."* Chặn không cho tiếp tục.<br>  + **TH3 (Hồ sơ chưa có hiệu lực pháp lý):** Nếu số đăng ký cần cung cấp bản sao kèm thông báo thế chấp chưa phải là "Hoàn thành" trong CSDL, hệ thống báo lỗi: *"Số đăng ký này đang trong quá trình xử lý hoặc chưa được duyệt chính thức. Không thể yêu cầu cung cấp bản sao kèm thông báo thế chấp."* Chặn không cho tiếp tục.<br>+ **Xử lý hợp lệ:**<br>  + Hệ thống ghi nhận thông tin Số đăng ký hợp lệ.<br>  + Lấy thông tin Hồ sơ gắn với Số đăng ký đã nhập.<br>  + Điều hướng NSD sang màn hình Xem trước và xác nhận thông tin chi tiết (`UC152.MH02`). |

---

#### 4.1.17.3. UC152.MH02 - Màn hình Xem trước thông tin yêu cầu cung cấp bản sao kèm thông báo thế chấp (Review)

##### 4.1.17.3.1. Màn hình
![Màn hình Xem trước yêu cầu cung cấp bản sao kèm thông báo thế chấp](images/UC152_MH02.png)

##### 4.1.17.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông Tin Người Đăng Ký** | | | | |
| Họ và tên | String(100) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Nếu là cá nhân tự đăng ký:<br>+ Hiển thị Họ và tên của cá nhân.<br>+ Nếu là cá nhân thuộc tổ chức (đại diện tổ chức):<br>+ Hiển thị Tên đầy đủ của Tổ chức (Ví dụ: `Tài khoản test FPT`). |
| Địa chỉ | String(500) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Nếu là cá nhân tự đăng ký:<br>+ Hiển thị địa chỉ của cá nhân.<br>+ Nếu là cá nhân thuộc tổ chức:<br>+ Hiển thị địa chỉ của Tổ chức.<br>+ Định dạng hiển thị bắt buộc:<br>+ "Địa chỉ chi tiết - Tỉnh/Thành phố - Quốc gia" (Ví dụ: `25 Nguyễn Cơ Thạch, thành phố Hà Nội`). |
| **II. Hồ sơ gốc (tham chiếu theo Số đăng ký)** | Text(10000) | Có | Theo hồ sơ gốc | Control UI: Khối hiển thị chỉ đọc.<br>- Dữ liệu được truy vấn trực tiếp theo Số đăng ký tại thời điểm hiển thị, không lưu bản sao dữ liệu tĩnh.<br>- Từ dòng tiêu đề hồ sơ **"Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]"** trở xuống, hiển thị theo cấu trúc dùng chung tại [4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong). |

##### 4.1.17.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | QUAY LẠI | Nút bấm | - **Thao tác:** Người dùng bấm nút **[QUAY LẠI]**.<br>- **Xử lý:** Hệ thống chuyển người dùng quay trở lại màn hình khởi tạo `UC152.MH01` và giữ nguyên thông tin Số đăng ký vừa nhập để người dùng có thể chỉnh sửa lại. |
| 2 | Gửi đăng ký | Nút bấm | - **Thao tác:** Người dùng bấm nút **[Gửi đăng ký]** ở màn hình Review.<br>- **Xử lý:**<br>  + Bước 1: Hệ thống lưu trữ yêu cầu cung cấp bản sao kèm thông báo thế chấp vào Cơ sở dữ liệu dưới trạng thái **Chờ thanh toán**.<br>  + Bước 2: Tự động sinh **Mã hồ sơ yêu cầu** mới theo quy tắc: `BS-[YYYYMMDD]-[TỰ_TĂNG_6_SỐ]`. Ví dụ: `BS-20260601-000152`.<br>  + Bước 3: Xác định Tổng số tiền lệ phí cần thanh toán: Lấy trong Danh mục biểu phí tương ứng theo thông tin đã cấu hình.<br>  + Bước 4: Đóng gói dữ liệu yêu cầu thanh toán nghiệp vụ (Mã hồ sơ gốc, Mã hồ sơ yêu cầu cấp bản sao kèm thông báo, Số tiền lệ phí, Nội dung thanh toán mặc định: *"Thanh toan phi cung cap ban sao kem thong bao the chap ho so [MaHoSoYeuCau]"*, Mã đơn vị tiếp nhận thụ hưởng, Return URL).<br>  + Bước 5: Chuyển hướng trình duyệt của Khách hàng trực tiếp sang giao diện thanh toán trực tuyến của Cổng thanh toán thuộc Use Case [UC158 - Quản lý thanh toán phí](UC158_Quan_ly_thanh_toan_phi.md) để thực hiện nộp phí. |
| 3 | Lắng nghe trạng thái thanh toán & Hiển thị kết quả (Auto) | Background Task / Redirect | Hệ thống thực hiện lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook callback) và hiển thị kết quả giao dịch tại Màn hình Kết quả Giao dịch chung của hệ thống.<br>- Chi tiết quy trình xử lý Webhook cho các trường hợp TH1 đến TH7: Tham chiếu tại [4.1.2.3. Lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook Callback) của UC158](UC158_Quan_ly_thanh_toan_phi.md#4123-lang-nghe-trang-thai-thanh-toan-tu-cong-thanh-toan-webhook-callback).<br>- Chi tiết giao diện và cấu hình hiển thị kết quả giao dịch: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung). |

---

#### 4.1.17.4. Màn hình Kết quả thanh toán
- Sau khi thực hiện thanh toán xong trên Cổng thanh toán trực tuyến, hệ thống tự động chuyển hướng người dùng quay trở lại hệ thống và hiển thị kết quả giao dịch trên Màn hình kết quả giao dịch chung.
- Chi tiết thông tin giao diện và các quy tắc hiển thị động cho nghiệp vụ Yêu cầu cấp bản sao kèm thông báo thế chấp: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung).
