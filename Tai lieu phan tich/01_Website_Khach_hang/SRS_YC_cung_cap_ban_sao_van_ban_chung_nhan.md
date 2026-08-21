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
| Loại cung cấp bản sao | Enum(String(50)) | Có | "Bản sao giấy" | - Chọn một trong hai giá trị:<br>+ Bản sao điện tử<br>+ Bản sao giấy<br>+ Khi chọn "Bản sao điện tử", hệ thống ẩn trường "Số lượng bản sao" và không yêu cầu nhập, do bản sao điện tử chỉ cấp 01 file PDF duy nhất cho mỗi yêu cầu.<br>+ Khi chọn "Bản sao giấy", hệ thống hiển thị lại trường "Số lượng bản sao" và bắt buộc nhập. |
| Số lượng bản sao (ví dụ 1,2,3) | Integer(10) | Tùy điều kiện | Trống | - Chỉ hiển thị và bắt buộc nhập khi Loại cung cấp bản sao là "Bản sao giấy".<br>- Nhập số lượng bản sao giấy mong muốn cần cấp.<br>- Định dạng nhập: Số nguyên dương. |
| Cơ quan tiếp nhận | Enum(String(100)) | Có | Lấy theo thiết lập của Tổ chức/Cá nhân | - Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08].<br>- Giá trị mặc định là Trung tâm đăng ký mặc định mà Cá nhân/Tổ chức đã thiết lập. Cho phép sửa lại.<br>- Hệ thống dùng giá trị này để đối chiếu với Cơ quan tiếp nhận thực tế đã xử lý hồ sơ gốc khi NSD bấm Tiếp tục, theo quy tắc [BR-DK-032]. |

##### 4.1.16.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thay đổi Loại cung cấp bản sao | Radio/Segment | Khi NSD chuyển từ "Bản sao giấy" sang "Bản sao điện tử", hệ thống ẩn trường "Số lượng bản sao" và xóa dữ liệu đã nhập ở trường này. Khi chuyển ngược lại sang "Bản sao giấy", hệ thống hiển thị lại trường "Số lượng bản sao" ở trạng thái trống, yêu cầu nhập lại. |
| 2 | Gửi yêu cầu | Nút bấm | - **Thao tác:** Người dùng bấm nút **[Gửi yêu cầu]**.<br>- **Kiểm tra nghiệp vụ (Validation Rules):** |
|  |  |  | - **TH1 (Bỏ trống trường bắt buộc):** Hệ thống kiểm tra nếu phát hiện trường bắt buộc nhập bị bỏ trống (Cơ quan tiếp nhận, Số đăng ký, hoặc Số lượng bản sao khi Loại cung cấp bản sao là "Bản sao giấy"). Vi phạm quy tắc [BR-VAL-001], hệ thống tô viền đỏ ô trống đầu tiên và hiển thị cảnh báo lỗi [MSG-ERR-VAL-001] ngay dưới trường thông tin bị bỏ trống. Chặn không cho gửi yêu cầu. |
|  |  |  | - **TH2 (Số lượng bản sao không hợp lệ):** Chỉ áp dụng khi Loại cung cấp bản sao là "Bản sao giấy". Nếu số lượng nhập vào không phải số nguyên dương (ví dụ: `<= 0` hoặc chứa chữ cái, ký tự đặc biệt), vi phạm [BR-UCPS-005], hiển thị [MSG-ERR-VAL-012]. Nếu vượt quá giới hạn hệ thống (ví dụ: `> 100`), vi phạm [BR-UCPS-005], hiển thị [MSG-ERR-BS-012]. Chặn không cho gửi yêu cầu. |
|  |  |  | - **TH3 (Số đăng ký không tồn tại):** Hệ thống truy vấn CSDL theo số đăng ký đã nhập. Nếu không tìm thấy số đăng ký nào trùng khớp, vi phạm [BR-BS-012], hiển thị [MSG-ERR-BS-010]. Chặn không cho gửi yêu cầu. |
|  |  |  | - **TH4 (Cơ quan tiếp nhận không khớp Số đăng ký):** Áp dụng quy tắc [BR-DK-032]. Hệ thống xác định Cơ quan tiếp nhận thực tế đã xử lý hồ sơ gốc gắn với Số đăng ký đã nhập. Nếu Cơ quan tiếp nhận NSD đang chọn trên form khác với Cơ quan tiếp nhận thực tế đó, hệ thống chặn không cho gửi yêu cầu và hiển thị Popup xác nhận cảnh báo [MSG-CFM-DK-012], cho phép NSD chọn:<br>+ **"Đồng ý, chuyển đúng cơ quan":** Hệ thống tự động cập nhật lại giá trị Cơ quan tiếp nhận trên form về đúng Cơ quan tiếp nhận thực tế của hồ sơ gốc, đóng popup, sau đó tiếp tục thực hiện các bước kiểm tra còn lại (TH5) khi NSD bấm lại Gửi yêu cầu hoặc tự động tiếp tục kiểm tra ngay sau khi cập nhật.<br>+ **"Hủy":** Đóng popup, giữ nguyên Cơ quan tiếp nhận hiện tại trên form, không gửi yêu cầu, cho phép NSD tự kiểm tra và chỉnh sửa lại. |
|  |  |  | - **TH5 (Hồ sơ chưa có hiệu lực pháp lý):** Nếu số đăng ký cần cấp bản sao chưa phải là "Hoàn thành" trong CSDL, vi phạm [BR-BS-012], hiển thị [MSG-ERR-BS-011]. Chặn không cho gửi yêu cầu. |
|  |  |  | - **Xử lý hợp lệ:** Hệ thống gửi yêu cầu ngay tại màn hình này (không điều hướng sang màn hình Xem trước), thực hiện tuần tự:<br>  + Bước 1: Lưu hồ sơ Yêu cầu cung cấp bản sao vào Cơ sở dữ liệu; lưu Số đăng ký đã kiểm tra hợp lệ (TH3/TH5) làm khóa tham chiếu tới hồ sơ gốc, không lưu bản sao dữ liệu tĩnh của hồ sơ gốc.<br>  + Bước 2: Tự động sinh **Mã hồ sơ yêu cầu** mới theo quy tắc: `BS-[YYYYMMDD]-[TỰ_TĂNG_6_SỐ]`. Ví dụ: `BS-20260601-000149`.<br>  + Bước 3: Ghi nhận Người yêu cầu (theo tài khoản đang đăng nhập), Thời điểm đăng ký, Nguồn tiếp nhận ("Website khách hàng"/"Mobile khách hàng").<br>  + Bước 4: Tính toán Tổng số tiền lệ phí cần thanh toán theo công thức:<br>+ Nếu Loại cung cấp bản sao là "Bản sao giấy": `Tổng tiền lệ phí = Đơn giá bản sao giấy (theo Danh mục biểu phí đã cấu hình) * Số lượng bản sao`.<br>+ Nếu Loại cung cấp bản sao là "Bản sao điện tử": `Tổng tiền lệ phí = Đơn giá bản sao điện tử (theo Danh mục biểu phí đã cấu hình)`, không nhân số lượng do mỗi yêu cầu chỉ cấp 01 bản điện tử duy nhất.<br>  + Bước 5: Nếu hồ sơ thuộc diện phải thu phí, lưu hồ sơ ở trạng thái **"Chờ thanh toán"**, đóng gói dữ liệu yêu cầu thanh toán (Mã hồ sơ gốc, Mã hồ sơ yêu cầu cấp bản sao, Loại cung cấp bản sao, Số tiền lệ phí, Nội dung thanh toán mặc định: *"Thanh toan phi cap ban sao ho so [MaHoSoYeuCau]"*, Mã đơn vị tiếp nhận thụ hưởng, Return URL) và chuyển hướng trình duyệt sang Cổng thanh toán trực tuyến thuộc [UC158 - Quản lý thanh toán phí](UC158_Quan_ly_thanh_toan_phi.md). Nếu hồ sơ thuộc diện miễn phí, lưu hồ sơ ở trạng thái **"Chờ duyệt"** và hiển thị thông báo Gửi hồ sơ thành công (Mã hồ sơ, Thời điểm đăng ký, Trạng thái).<br>  + Riêng phần hồ sơ gốc được truy vấn tham chiếu theo Số đăng ký tại thời điểm hiển thị (không lưu bản sao dữ liệu tĩnh), hiển thị theo cấu trúc dùng chung tại [4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong).<br>  + Chi tiết đầy đủ về bộ trạng thái hồ sơ và cách theo dõi hồ sơ sau khi gửi yêu cầu (Danh sách, Xem chi tiết, thanh toán qua UC158): Tham chiếu tại [SRS_Qly_yeu_cau_da_dky_YC Ban sao.md](SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md). |
| 3 | Lắng nghe trạng thái thanh toán & Hiển thị kết quả (Auto) | Background Task / Redirect | Hệ thống thực hiện lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook callback) và hiển thị kết quả giao dịch tại Màn hình Kết quả Giao dịch chung của hệ thống.<br>- Chi tiết quy trình xử lý Webhook cho các trường hợp TH1 đến TH7: Tham chiếu tại [4.1.2.3. Lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook Callback) của UC158](UC158_Quan_ly_thanh_toan_phi.md#4123-lang-nghe-trang-thai-thanh-toan-tu-cong-thanh-toan-webhook-callback).<br>- Chi tiết giao diện và cấu hình hiển thị kết quả giao dịch: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung). |

---

#### 4.1.16.3. Màn hình Kết quả thanh toán

> **Đã thay thế**: Thanh toán chỉ phát sinh sau khi Lãnh đạo duyệt hồ sơ, thực hiện từ Danh sách/Xem chi tiết yêu cầu tại [SRS_Qly_yeu_cau_da_dky_YC Ban sao.md](SRS_Qly_yeu_cau_da_dky_YC%20Ban%20sao.md).

- Sau khi thực hiện thanh toán xong trên Cổng thanh toán trực tuyến, hệ thống tự động chuyển hướng người dùng quay trở lại hệ thống và hiển thị kết quả giao dịch trên Màn hình kết quả giao dịch chung.
- Chi tiết thông tin giao diện và các quy tắc hiển thị động cho nghiệp vụ Yêu cầu cấp bản sao văn bản chứng nhận: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung).
