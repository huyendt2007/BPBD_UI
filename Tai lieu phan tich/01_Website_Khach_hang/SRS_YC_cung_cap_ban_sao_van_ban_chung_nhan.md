### 4.1.16. UC149 - Lập yêu cầu cung cấp bản sao văn bản chứng nhận đăng ký biện pháp bảo đảm

#### 4.1.16.1. Mục đích
- Cho phép Người sử dụng (NSD) là Khách hàng (Cá nhân, Tổ chức) thực hiện lập yêu cầu cung cấp bản sao văn bản chứng nhận đăng ký biện pháp bảo đảm hoặc hợp đồng đã được phê duyệt "Hoàn thành" trên hệ thống trực tuyến.
- Người dùng chỉ cần nhập Số đăng ký và Số lượng bản sao cần cấp. Hệ thống tự động xác thực và hiển thị thông tin hồ sơ gốc ở chế độ chỉ đọc (Read-only) với tiêu đề và nội dung động thay đổi theo từng loại nghiệp vụ gốc (Đăng ký lần đầu, Đăng ký thay đổi, Xóa đơn đăng ký, Thông báo xử lý tài sản bảo đảm, Xóa thông báo xử lý tài sản bảo đảm).
- Hỗ trợ tính lệ phí tự động và liên kết trực tiếp sang Cổng thanh toán trực tuyến (`UC158`) để thu phí cấp bản sao theo quy định trước khi chuyển hồ sơ vào hàng đợi phê duyệt.

*a. Phân quyền*

- Khách hàng (Cá nhân, Tổ chức).

*b. Điều kiện thực hiện*

- Người dùng đã truy cập thành công vào hệ thống.
- Hồ sơ/Số đăng ký yêu cầu cấp bản sao phải ở trạng thái "Hoàn thành" (đã có hiệu lực pháp lý) trong Cơ sở dữ liệu quốc gia về biện pháp bảo đảm.
- Cổng thanh toán trực tuyến hoạt động bình thường.

---

#### 4.1.16.2. UC149.MH01 - Màn hình Yêu cầu cấp bản sao văn bản chứng nhận đăng ký biện pháp bảo đảm

##### 4.1.16.2.1. Màn hình
- Giao diện gồm form nhập tiêu chí khởi tạo yêu cầu cấp bản sao.
- Biểu mẫu hiển thị tiêu đề chính: **YÊU CẦU CẤP BẢN SAO VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM**.
- NSD thực hiện nhập các thông tin bắt buộc gồm Số đăng ký cần cấp bản sao, Loại cung cấp bản sao, Số lượng bản sao mong muốn (nếu có) và Cơ quan tiếp nhận, sau đó click nút Tiếp tục.
- Hình ảnh minh họa giao diện:
![Màn hình Khởi tạo yêu cầu cung cấp bản sao](images/UC149_MH01.png)

##### 4.1.16.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số đăng ký | String(50) | Có | Trống | - Nhập chính xác số đăng ký của hồ sơ cần yêu cầu cấp bản sao (có thể là số đăng ký gốc lần đầu hoặc số thay đổi, số xóa, số thông báo...). |
| Loại cung cấp bản sao | Enum(String(50)) | Có | "Bản sao giấy" | - Chọn một trong hai giá trị:<br>- Bản sao điện tử<br>- Bản sao giấy<br>- Khi chọn "Bản sao điện tử", hệ thống ẩn trường "Số lượng bản sao" và không yêu cầu nhập, do bản sao điện tử chỉ cấp 01 file PDF duy nhất cho mỗi yêu cầu.<br>- Khi chọn "Bản sao giấy", hệ thống hiển thị lại trường "Số lượng bản sao" và bắt buộc nhập. |
| Số lượng bản sao (ví dụ 1,2,3) | Integer(10) | Tùy điều kiện | Trống | - Chỉ hiển thị và bắt buộc nhập khi Loại cung cấp bản sao là "Bản sao giấy".<br>- Nhập số lượng bản sao giấy mong muốn cần cấp.<br>- Định dạng nhập: Số nguyên dương. |
| Cơ quan tiếp nhận | Enum(String(100)) | Có | Lấy theo thiết lập của Tổ chức/Cá nhân | - Tham chiếu tại Danh mục dùng chung - Trung tâm giao dịch bảo đảm [DM_08].<br>- Giá trị mặc định là Trung tâm đăng ký mặc định mà Cá nhân/Tổ chức đã thiết lập. Cho phép sửa lại.<br>- Hệ thống dùng giá trị này để đối chiếu với Cơ quan tiếp nhận thực tế đã xử lý hồ sơ gốc khi NSD bấm Tiếp tục, theo quy tắc [BR-DK-032]. |

##### 4.1.16.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thay đổi Loại cung cấp bản sao | Radio/Segment | Khi NSD chuyển từ "Bản sao giấy" sang "Bản sao điện tử", hệ thống ẩn trường "Số lượng bản sao" và xóa dữ liệu đã nhập ở trường này. Khi chuyển ngược lại sang "Bản sao giấy", hệ thống hiển thị lại trường "Số lượng bản sao" ở trạng thái trống, yêu cầu nhập lại. |
| 2 | Gửi yêu cầu | Nút bấm | - **Thao tác:** Người dùng bấm nút **[Gửi yêu cầu]**.<br>- **Kiểm tra nghiệp vụ (Validation Rules):**<br>  - **TH1 (Bỏ trống trường bắt buộc):** Hệ thống kiểm tra nếu phát hiện trường bắt buộc nhập bị bỏ trống (Cơ quan tiếp nhận, Số đăng ký, hoặc Số lượng bản sao khi Loại cung cấp bản sao là "Bản sao giấy"). Vi phạm quy tắc [BR-VAL-001], hệ thống tô viền đỏ ô trống đầu tiên và hiển thị cảnh báo lỗi [MSG-ERR-VAL-001] ngay dưới trường thông tin bị bỏ trống. Chặn không cho gửi yêu cầu.<br>  - **TH2 (Số lượng bản sao không hợp lệ):** Chỉ áp dụng khi Loại cung cấp bản sao là "Bản sao giấy". Nếu số lượng nhập vào không phải số nguyên dương (ví dụ: `<= 0` hoặc chứa chữ cái, ký tự đặc biệt), vi phạm [BR-UCPS-005], hiển thị [MSG-ERR-VAL-012]. Nếu vượt quá giới hạn hệ thống (ví dụ: `> 100`), vi phạm [BR-UCPS-005], hiển thị [MSG-ERR-BS-012]. Chặn không cho gửi yêu cầu.<br>  - **TH3 (Số đăng ký không tồn tại):** Hệ thống truy vấn CSDL theo số đăng ký đã nhập. Nếu không tìm thấy số đăng ký nào trùng khớp, vi phạm [BR-BS-012], hiển thị [MSG-ERR-BS-010]. Chặn không cho gửi yêu cầu.<br>  - **TH4 (Cơ quan tiếp nhận không khớp Số đăng ký):** Áp dụng quy tắc [BR-DK-032]. Hệ thống xác định Cơ quan tiếp nhận thực tế đã xử lý hồ sơ gốc gắn với Số đăng ký đã nhập. Nếu Cơ quan tiếp nhận NSD đang chọn trên form khác với Cơ quan tiếp nhận thực tế đó, hệ thống chặn không cho gửi yêu cầu và hiển thị Popup xác nhận cảnh báo [MSG-CFM-DK-012], cho phép NSD chọn:<br>- **"Đồng ý, chuyển đúng cơ quan":** Hệ thống tự động cập nhật lại giá trị Cơ quan tiếp nhận trên form về đúng Cơ quan tiếp nhận thực tế của hồ sơ gốc, đóng popup, sau đó tiếp tục thực hiện các bước kiểm tra còn lại (TH5) khi NSD bấm lại Gửi yêu cầu hoặc tự động tiếp tục kiểm tra ngay sau khi cập nhật.<br>- **"Hủy":** Đóng popup, giữ nguyên Cơ quan tiếp nhận hiện tại trên form, không gửi yêu cầu, cho phép NSD tự kiểm tra và chỉnh sửa lại.<br>  - **TH5 (Hồ sơ chưa có hiệu lực pháp lý):** Nếu số đăng ký cần cấp bản sao chưa phải là "Hoàn thành" trong CSDL, vi phạm [BR-BS-012], hiển thị [MSG-ERR-BS-011]. Chặn không cho gửi yêu cầu.<br>- **Xử lý hợp lệ:** Xem chi tiết quy trình Gửi yêu cầu (sinh Mã hồ sơ, lưu Số đăng ký làm khóa tham chiếu tới hồ sơ gốc, tạo hồ sơ ở trạng thái "Chờ tiếp nhận") tại [SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md](SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md#41x2-dieu-chinh-uc149mh01---bo-man-hinh-xem-truoc-review-gui-yeu-cau-truc-tiep). Tài liệu này không còn điều hướng sang màn hình Xem trước (`UC149.MH02`); `UC149.MH02` chỉ giữ phần mô tả thông tin riêng của yêu cầu cung cấp bản sao. Riêng phần hồ sơ gốc được truy vấn tham chiếu theo Số đăng ký, không lưu bản sao dữ liệu tĩnh, và hiển thị theo cấu trúc dùng chung tại [4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong). |

---

#### 4.1.16.3. UC149.MH02 - Màn hình Xem trước thông tin yêu cầu cung cấp bản sao (Review)

> **Không còn là màn hình tương tác riêng**: Theo [SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md](SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md), NSD bấm "Gửi yêu cầu" ngay tại `UC149.MH01`, không còn điều hướng qua bước Xem trước này. Nội dung dưới đây chỉ còn giữ vai trò mô tả các thông tin riêng của yêu cầu cung cấp bản sao và tham chiếu cấu trúc hiển thị hồ sơ gốc dùng chung, được hệ thống dùng để hiển thị lại (chỉ đọc) tại màn hình Chi tiết yêu cầu và các tài liệu khác có tham chiếu tới mục này.

##### 4.1.16.3.1. Màn hình
![Màn hình Xem trước yêu cầu cung cấp bản sao](images/UC149_MH02.png)

##### 4.1.16.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông Tin Người Đăng Ký** | | | | |
| Họ và tên | String(100) | Có | Lấy từ hệ thống | Control UI: Label Chỉ đọc.<br>- Nếu là cá nhân tự đăng ký:<br>- Hiển thị Họ và tên của cá nhân.<br>- Nếu là cá nhân thuộc tổ chức (đại diện tổ chức):<br>- Hiển thị Tên đầy đủ của Tổ chức (Ví dụ: `Tài khoản test FPT`). |
| Địa chỉ | String(500) | Có | Lấy từ hệ thống | Control UI: Label Chỉ đọc.<br>- Nếu là cá nhân tự đăng ký:<br>- Hiển thị địa chỉ của cá nhân.<br>- Nếu là cá nhân thuộc tổ chức:<br>- Hiển thị địa chỉ của Tổ chức.<br>- Định dạng hiển thị bắt buộc:<br>- "Địa chỉ chi tiết - Tỉnh/Thành phố - Quốc gia" (Ví dụ: `25 Nguyễn Cơ Thạch, thành phố Hà Nội`). |
| **II. Thông tin loại và số lượng bản sao** | | | | |
| Cơ quan tiếp nhận | Enum(String(100)) | Có | Lấy từ MH01 | Control UI: Label Chỉ đọc.<br>Hiển thị Cơ quan tiếp nhận đã chọn/đã được chuyển đổi hợp lệ ở màn hình trước. Tham chiếu Danh mục dùng chung - Trung tâm giao dịch bảo đảm [DM_08]. |
| Loại cung cấp bản sao | Enum(String(50)) | Có | Lấy từ MH01 | Control UI: Label Chỉ đọc.<br>Hiển thị giá trị đã chọn ở màn hình trước: "Bản sao điện tử" hoặc "Bản sao giấy". |
| Số lượng bản sao của đăng ký | Integer(10) | Tùy điều kiện | Lấy từ MH01 | Control UI: Label Chỉ đọc.<br>- Chỉ hiển thị khi Loại cung cấp bản sao là "Bản sao giấy".<br>- Số lượng bản sao yêu cầu đã nhập ở màn hình trước. |
| **III. Hồ sơ gốc (tham chiếu theo Số đăng ký)** | Text(10000) | Có | Theo hồ sơ gốc | Control UI: Khối hiển thị chỉ đọc.<br>- Dữ liệu được truy vấn trực tiếp theo Số đăng ký tại thời điểm hiển thị, không lưu bản sao dữ liệu tĩnh.<br>- Từ dòng tiêu đề hồ sơ **"Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]"** trở xuống, hiển thị theo cấu trúc dùng chung tại [4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong). |

##### 4.1.16.3.3. Chức năng trên màn hình

> **Đã thay thế**: Bảng chức năng cũ dưới đây (nút "Gửi đăng ký" lưu hồ sơ thẳng vào "Chờ thanh toán" và chuyển hướng ngay sang UC158) không còn áp dụng, vì màn hình Review này không còn được điều hướng tới (xem ghi chú tại mục 4.1.16.3). Quy trình Gửi yêu cầu, sinh Mã hồ sơ, gắn kèm hồ sơ gốc và tạo hồ sơ ở trạng thái "Chờ tiếp nhận" nay thực hiện ngay tại `UC149.MH01` (mục 4.1.16.2.3, chức năng "Gửi yêu cầu"). Việc tính lệ phí và chuyển hướng UC158 chỉ phát sinh sau khi Lãnh đạo duyệt hồ sơ, theo [SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md](SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md#41x6-quy-tac-thanh-toan-ho-so-yeu-cau-cung-cap-ban-sao). Nội dung bảng dưới đây chỉ giữ lại để tham chiếu lịch sử.

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | QUAY LẠI | Nút bấm | - **Thao tác:** Người dùng bấm nút **[QUAY LẠI]**.<br>- **Xử lý:** Hệ thống chuyển người dùng quay trở lại màn hình khởi tạo `UC149.MH01` và giữ nguyên thông tin Cơ quan tiếp nhận, Số đăng ký, Loại cung cấp bản sao, Số lượng bản sao (nếu có) vừa nhập để người dùng có thể chỉnh sửa lại. |
| 2 | Gửi đăng ký | Nút bấm | - **Thao tác:** Người dùng bấm nút **[Gửi đăng ký]** ở màn hình Review.<br>- **Xử lý:**<br>  - Bước 1: Hệ thống lưu trữ yêu cầu cấp bản sao vào Cơ sở dữ liệu dưới trạng thái **Chờ thanh toán**.<br>  - Bước 2: Tự động sinh **Mã hồ sơ yêu cầu** mới theo quy tắc: `BS-[YYYYMMDD]-[TỰ_TĂNG_6_SỐ]`. Ví dụ: `BS-20260601-000149`.<br>  - Bước 3: Tính toán Tổng số tiền lệ phí cần thanh toán theo công thức:<br>- Nếu Loại cung cấp bản sao là "Bản sao giấy": `Tổng tiền lệ phí = Đơn giá bản sao giấy (lấy trong Danh mục biểu phí tương ứng theo thông tin đã cấu hình) * Số lượng bản sao`.<br>- Nếu Loại cung cấp bản sao là "Bản sao điện tử": `Tổng tiền lệ phí = Đơn giá bản sao điện tử (lấy trong Danh mục biểu phí tương ứng theo thông tin đã cấu hình)`, không nhân với số lượng do mỗi yêu cầu chỉ cấp 01 bản điện tử duy nhất.<br>  - Bước 4: Đóng gói dữ liệu yêu cầu thanh toán nghiệp vụ (Mã hồ sơ gốc, Mã hồ sơ yêu cầu cấp bản sao, Loại cung cấp bản sao, Số tiền lệ phí, Nội dung thanh toán mặc định: *"Thanh toan phi cap ban sao ho so [MaHoSoYeuCau]"*, Mã đơn vị tiếp nhận thụ hưởng, Return URL).<br>  - Bước 5: Chuyển hướng trình duyệt của Khách hàng trực tiếp sang giao diện thanh toán trực tuyến của Cổng thanh toán thuộc Use Case [UC158 - Quản lý thanh toán phí](UC158_Quan_ly_thanh_toan_phi.md) để thực hiện nộp phí. |
| 3 | Lắng nghe trạng thái thanh toán & Hiển thị kết quả (Auto) | Background Task / Redirect | Hệ thống thực hiện lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook callback) và hiển thị kết quả giao dịch tại Màn hình Kết quả Giao dịch chung của hệ thống.<br>- Chi tiết quy trình xử lý Webhook cho các trường hợp TH1 đến TH7: Tham chiếu tại [4.1.2.3. Lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook Callback) của UC158](UC158_Quan_ly_thanh_toan_phi.md#4123-lang-nghe-trang-thai-thanh-toan-tu-cong-thanh-toan-webhook-callback).<br>- Chi tiết giao diện và cấu hình hiển thị kết quả giao dịch: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung). |

---

#### 4.1.16.4. Màn hình Kết quả thanh toán

> **Đã thay thế**: Xem quy tắc thanh toán hiện hành (chỉ phát sinh sau khi Lãnh đạo duyệt) tại [SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md](SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md#41x6-quy-tac-thanh-toan-ho-so-yeu-cau-cung-cap-ban-sao).

- Sau khi thực hiện thanh toán xong trên Cổng thanh toán trực tuyến, hệ thống tự động chuyển hướng người dùng quay trở lại hệ thống và hiển thị kết quả giao dịch trên Màn hình kết quả giao dịch chung.
- Chi tiết thông tin giao diện và các quy tắc hiển thị động cho nghiệp vụ Yêu cầu cấp bản sao văn bản chứng nhận: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung).

