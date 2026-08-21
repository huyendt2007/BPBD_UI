## 4.1. UC158 - Thanh toán trực tuyến

### 4.1.158.1. Mục đích

- Cho phép các phân hệ nghiệp vụ trên Website Khách hàng khởi tạo giao dịch thanh toán trực tuyến và chuyển người dùng sang Cổng thanh toán.
- Chuẩn hóa một luồng thanh toán dùng chung cho các nghiệp vụ Phiếu đăng ký, Yêu cầu cung cấp thông tin, Yêu cầu cung cấp bản sao và Cấp mã số sử dụng CSDL.
- Tiếp nhận kết quả trả về từ Cổng thanh toán, cập nhật trạng thái giao dịch, trạng thái hồ sơ nghiệp vụ, phát hành biên lai điện tử và hiển thị kết quả thanh toán cho Khách hàng.

*a. Phân quyền*

- Khách hàng cá nhân/tổ chức đã đăng nhập Website Khách hàng và có quyền thực hiện thanh toán đối với hồ sơ/mã số thuộc phạm vi tài khoản.
- Hệ thống nghiệp vụ nội bộ được phép gọi UC158 để khởi tạo giao dịch thanh toán cho hồ sơ hợp lệ.

*b. Điều kiện thực hiện*

- Hồ sơ nghiệp vụ hoặc yêu cầu cấp mã đã được tạo trên hệ thống và phát sinh nghĩa vụ phí.
- Hồ sơ/mã số đang ở trạng thái được phép thanh toán.
- Hệ thống đã xác định được số tiền phải thu, đơn vị thụ hưởng, nội dung thanh toán và Return URL.
- Cổng thanh toán đang sẵn sàng tiếp nhận giao dịch.

---

### 4.1.158.2. Phân loại loại thanh toán trên hệ thống

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Danh mục loại thanh toán** | - | - | - | Control UI: System enum.<br>- Dùng chung cho các UC nghiệp vụ khi gọi UC158.<br>- Không cho phép người dùng tự sửa mã loại thanh toán. |
| LOAI_01 - THANH_TOAN_DANG_KY | Enum(String(50)) | Có | Theo UC gọi sang | Control UI: Hidden/System parameter.<br>- Thanh toán phí hồ sơ thuộc nhóm Phiếu đăng ký.<br>- Áp dụng đầy đủ cho 06 trường hợp: Đăng ký mới biện pháp bảo đảm; Đăng ký thay đổi biện pháp bảo đảm; Xóa đăng ký biện pháp bảo đảm; Thông báo xử lý tài sản bảo đảm lần đầu; Thay đổi thông báo xử lý tài sản bảo đảm; Xóa thông báo xử lý tài sản bảo đảm. |
| LOAI_02 - THANH_TOAN_CCTT | Enum(String(50)) | Có | Theo UC gọi sang | Control UI: Hidden/System parameter.<br>- Thanh toán phí Yêu cầu cung cấp thông tin.<br>- Áp dụng cho hồ sơ CCTT ở trạng thái `Chờ thanh toán`. |
| LOAI_03 - THANH_TOAN_BAN_SAO | Enum(String(50)) | Có | Theo UC gọi sang | Control UI: Hidden/System parameter.<br>- Thanh toán phí Yêu cầu cung cấp bản sao văn bản chứng nhận/bản sao phiếu đăng ký.<br>- Áp dụng cho hồ sơ bản sao phát sinh nghĩa vụ phí. |
| LOAI_04 - THANH_TOAN_CAP_MA_CSDL | Enum(String(50)) | Có | Theo UC gọi sang | Control UI: Hidden/System parameter.<br>- Thanh toán phí cấp mã số sử dụng CSDL thường xuyên hoặc mua mã tra cứu một lần.<br>- Sau khi thanh toán thành công, mã số được kích hoạt theo loại mã đã đăng ký. |

---

### 4.1.158.3. UC158.MH01 - Khởi tạo giao dịch và chuyển Cổng thanh toán

#### 4.1.158.3.1. Màn hình

- UC158.MH01 là bước xử lý trung gian của hệ thống.
- Người dùng được chuyển từ UC nghiệp vụ sang Cổng thanh toán sau khi hệ thống tạo giao dịch thanh toán thành công.
- Trường hợp cần hiển thị trong thời gian chờ chuyển hướng, màn hình hiển thị thông báo ngắn: `Đang chuyển sang Cổng thanh toán...`.

#### 4.1.158.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin chuyển hướng thanh toán** | - | - | - | Control UI: System processing view.<br>- Khối xử lý trung gian, không cho phép người dùng chỉnh sửa dữ liệu. |
| Thông báo chuyển hướng | String(255) | Không | `Đang chuyển sang Cổng thanh toán...` | Control UI: Text hiển thị.<br>- Hiển thị trong thời gian hệ thống tạo giao dịch và chuyển người dùng sang Cổng thanh toán.<br>- Không hiển thị nếu hệ thống chuyển hướng tức thời. |
| Trạng thái khởi tạo giao dịch | Enum(String(50)) | Có | `Đang xử lý` | Control UI: Hidden/System state.<br>- Ghi nhận trạng thái nội bộ của phiên khởi tạo thanh toán.<br>- Giá trị được chuẩn hóa theo trạng thái xử lý của hệ thống thanh toán. |

#### 4.1.158.3.3. Cấu trúc dữ liệu đóng gói gửi sang Cổng thanh toán

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Request Payload Mapping** | - | - | - | Control UI: Hidden/System payload.<br>- Bộ tham số đầu vào bắt buộc khi các UC nghiệp vụ gọi sang UC158.<br>- Hệ thống không cho phép người dùng sửa trực tiếp các tham số này trên giao diện. |
| Mã loại thanh toán | Enum(String(50)) | Có | Theo UC nghiệp vụ | Control UI: Hidden/System parameter.<br>- Xác định loại phí cần thu theo nhóm loại thanh toán của UC158. |
| Mã giao dịch thanh toán | String(50) | Có | Theo hệ thống | Control UI: Hidden/System parameter.<br>- Mã duy nhất sinh tự động cho phiên thanh toán nội bộ.<br>- Dùng để đối soát giữa hệ thống BPBĐ và Cổng thanh toán. |
| Mã hồ sơ / Mã đối soát | String(50) | Có | Theo UC nghiệp vụ | Control UI: Hidden/System parameter.<br>- Mã hồ sơ nghiệp vụ tương ứng.<br>- Có thể là Mã hồ sơ Phiếu đăng ký, CCTT, Bản sao hoặc Mã yêu cầu cấp mã CSDL. |
| Số tiền thanh toán | Decimal(18,0) | Có | Theo biểu phí | Control UI: Hidden/System parameter.<br>- Số tiền cần thanh toán, lấy tự động theo biểu phí của loại nghiệp vụ tương ứng.<br>- Không cho phép âm, bằng 0 hoặc khác số tiền hệ thống đã tính. |
| Nội dung thanh toán | String(500) | Có | Theo hệ thống | Control UI: Hidden/System parameter.<br>- Nội dung thanh toán chuẩn hóa theo từng loại hồ sơ.<br>- Không cho phép người dùng nhập/sửa thủ công. |
| Mã đơn vị thụ hưởng | String(50) | Có | Theo hồ sơ | Control UI: Hidden/System parameter.<br>- Mã Trung tâm đăng ký/đơn vị thụ hưởng phí.<br>- Dùng để hạch toán, phát hành biên lai và đối soát thanh toán. |
| Return URL | String(500) | Có | Theo UC nghiệp vụ | Control UI: Hidden/System parameter.<br>- Đường dẫn quay về Website Khách hàng sau khi Cổng thanh toán xử lý xong giao dịch.<br>- Return URL phải gắn được ngữ cảnh nghiệp vụ để hiển thị đúng màn hình kết quả hoặc chi tiết hồ sơ. |

#### 4.1.158.3.4. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Khởi tạo giao dịch thanh toán | System action | Khi UC nghiệp vụ gọi sang UC158, hệ thống kiểm tra dữ liệu đầu vào và tạo phiên thanh toán nội bộ. |
|  |  |  | **TH1 - Thiếu tham số bắt buộc**: Nếu thiếu `Mã loại thanh toán`, `Mã hồ sơ / Mã đối soát`, `Số tiền thanh toán`, `Mã đơn vị thụ hưởng` hoặc `Return URL`, vi phạm [BR-VAL-001], hệ thống không tạo giao dịch, ghi log lỗi và trả thông báo [MSG-ERR-VAL-001] cho UC gọi sang. |
|  |  |  | **TH2 - Mã loại thanh toán không hợp lệ**: Nếu `Mã loại thanh toán` không thuộc nhóm loại thanh toán của UC158, vi phạm [BR-PAY-001], hệ thống không tạo giao dịch và trả thông báo [MSG-ERR-PAY-001]. |
|  |  |  | **TH3 - Hồ sơ không được phép thanh toán**: Nếu hồ sơ/mã số không tồn tại, không thuộc quyền người dùng hoặc không ở trạng thái được phép thanh toán, vi phạm [BR-PAY-002], hệ thống không tạo giao dịch và trả thông báo [MSG-ERR-PAY-002]. |
|  |  |  | **TH4 - Số tiền không khớp biểu phí**: Nếu số tiền đầu vào khác số tiền hệ thống tính lại theo biểu phí tại thời điểm thanh toán, vi phạm [BR-PAY-003], hệ thống không tạo giao dịch và trả thông báo [MSG-ERR-PAY-003]. |
|  |  |  | **TH Hợp lệ**: Hệ thống sinh `Mã giao dịch thanh toán`, lưu giao dịch ở trạng thái `Đang xử lý`, gọi Cổng thanh toán, ghi Audit Log và chuyển người dùng sang Cổng thanh toán. |
| 2 | Quay lại hồ sơ | Button/Link | Chỉ hiển thị khi khởi tạo giao dịch thất bại hoặc Cổng thanh toán không sẵn sàng. Khi click, hệ thống quay về `Return URL` của UC nghiệp vụ và giữ nguyên trạng thái hồ sơ trước thanh toán. |

---

### 4.1.158.4. Xử lý kết quả trả về từ Cổng thanh toán

#### 4.1.158.4.1. Mô tả thông tin kết quả trả về

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Response Payload Mapping** | - | - | - | Control UI: Hidden/System payload.<br>- Bộ dữ liệu do Cổng thanh toán trả về qua Return URL/callback.<br>- Hệ thống dùng để cập nhật giao dịch, hồ sơ nghiệp vụ và biên lai. |
| Mã giao dịch Cổng thanh toán | String(50) | Có | Theo Cổng thanh toán | Control UI: Hidden/System parameter.<br>- Mã giao dịch do Cổng thanh toán trả về.<br>- Dùng để tra soát, đối soát và hiển thị trên màn hình kết quả. |
| Mã giao dịch hệ thống | String(50) | Có | Theo hệ thống | Control UI: Hidden/System parameter.<br>- Mã phiên giao dịch nội bộ đã sinh tại bước khởi tạo. |
| Trạng thái thanh toán | Enum(String(50)) | Có | Theo Cổng thanh toán | Control UI: Hidden/System parameter.<br>- Ghi nhận trạng thái thanh toán do Cổng thanh toán trả về.<br>- Hệ thống chuẩn hóa trạng thái để xử lý tiếp theo. |
| Thời gian thanh toán | Datetime | Không | Theo Cổng thanh toán | Control UI: Hidden/System parameter.<br>- Thời điểm Cổng thanh toán xác nhận kết quả.<br>- Định dạng hiển thị `dd/mm/yyyy HH:mm:ss`. |
| Phương thức thanh toán | Enum(String(100)) | Không | Theo Cổng thanh toán | Control UI: Hidden/System parameter.<br>- Hiển thị phương thức thanh toán do Cổng thanh toán ghi nhận và trả về sau giao dịch. |
| Mã lỗi/Lý do lỗi | String(500) | Không | Theo Cổng thanh toán | Control UI: Hidden/System parameter.<br>- Chỉ ghi nhận khi giao dịch thất bại, bị hủy, hết hạn hoặc chưa có kết quả cuối cùng. |

#### 4.1.158.4.2. Chức năng xử lý kết quả

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tiếp nhận kết quả thanh toán | System action | Khi Cổng thanh toán trả kết quả, hệ thống xác thực giao dịch, cập nhật trạng thái và điều hướng người dùng theo từng trường hợp. |
|  |  |  | **TH1 - Thanh toán thành công hồ sơ Phiếu đăng ký**: Hệ thống cập nhật giao dịch thanh toán sang `Thành công`, cập nhật trạng thái hồ sơ sang `Chờ duyệt`, chuyển hồ sơ sang hàng đợi Cán bộ đăng ký tiếp nhận xử lý, cấp Số đăng ký và cấp Số PIN khi hồ sơ thuộc Đăng ký lần đầu hoặc Thông báo xử lý tài sản chưa đăng ký, phát hành biên lai điện tử, gửi email thông báo tiếp nhận hồ sơ kèm biên lai điện tử, ghi Audit Log và hiển thị màn hình **UC158.MH02 - Kết quả thanh toán thành công**. |
|  |  |  | **TH2 - Thanh toán thành công hồ sơ CCTT/Bản sao**: Hệ thống cập nhật giao dịch thanh toán sang `Thành công`, cập nhật trạng thái hồ sơ sang `Chờ duyệt`, chuyển hồ sơ sang hàng đợi Cán bộ chuyên trách xử lý, phát hành biên lai điện tử, gửi email xác nhận thanh toán kèm biên lai điện tử, ghi Audit Log và hiển thị màn hình **UC158.MH02 - Kết quả thanh toán thành công**. |
|  |  |  | **TH3 - Thanh toán thành công mã số sử dụng CSDL thường xuyên**: Hệ thống cập nhật giao dịch thanh toán sang `Thành công`, kích hoạt mã số sang trạng thái `Hoạt động`, tự động liên kết mã số vào tài khoản người dùng đang đăng nhập, thiết lập thời hạn sử dụng đến hết ngày 31/12 của năm cấp, phát hành biên lai điện tử, gửi email thông báo kích hoạt mã số kèm biên lai điện tử, ghi Audit Log và hiển thị màn hình **UC158.MH02 - Kết quả thanh toán thành công**. |
|  |  |  | **TH4 - Thanh toán thành công mã số sử dụng một lần**: Hệ thống cập nhật giao dịch thanh toán sang `Thành công`, kích hoạt mã số cho 01 lượt tra cứu thành công, không liên kết vĩnh viễn mã số vào tài khoản, phát hành biên lai điện tử, gửi email thông báo kích hoạt mã số kèm biên lai điện tử, ghi Audit Log và hiển thị màn hình **UC158.MH02 - Kết quả thanh toán thành công**. |
|  |  |  | **TH5 - Thanh toán thất bại / lỗi giao dịch**: Hệ thống cập nhật giao dịch thanh toán sang `Thất bại`, giữ nguyên hồ sơ/mã số ở trạng thái `Chờ thanh toán`, hiển thị lỗi chi tiết từ [MSG-ERR-PAY-004] hoặc mã lỗi Cổng thanh toán và hiển thị nút `Thanh toán lại`. |
|  |  |  | **TH6 - Người dùng hủy / hết hạn phiên**: Hệ thống cập nhật giao dịch sang `Bị hủy` hoặc `Hết hạn`, giữ nguyên hồ sơ/mã số ở trạng thái `Chờ thanh toán`, ghi Audit Log và cho phép người dùng tạo giao dịch thanh toán mới. |
|  |  |  | **TH7 - Không xác thực được chữ ký/kết quả trả về**: Nếu dữ liệu callback/return URL không hợp lệ hoặc không xác thực được chữ ký, vi phạm [BR-PAY-004], hệ thống không cập nhật trạng thái hồ sơ, ghi log cảnh báo và hiển thị [MSG-ERR-PAY-005]. |

---

### 4.1.158.5. UC158.MH02 - Màn hình Kết quả thanh toán thành công

#### 4.1.158.5.1. Màn hình

- Màn hình hiển thị sau khi UC158 xác nhận giao dịch thanh toán thành công.
- Bố cục gồm 02 phân khu:
  - Khối thông tin dùng chung, áp dụng cho mọi loại thanh toán.
  - Khối thông tin nghiệp vụ chi tiết, hiển thị theo từng loại thanh toán.

#### 4.1.158.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Khối thông tin dùng chung** | - | - | - | Control UI: Card Receipt.<br>- Luôn hiển thị khi giao dịch thanh toán thành công.<br>- Áp dụng cho mọi loại thanh toán.<br>- Dữ liệu chỉ đọc, lấy từ giao dịch thanh toán đã xác nhận. |
| Icon thành công | String(50) | Có | Circle check xanh lá | Control UI: Icon.<br>- Hiển thị biểu tượng hình tròn màu xanh lá cây có dấu tích trắng ở đầu màn hình kết quả. |
| Tiêu đề màn hình | String(255) | Có | `Thanh toán lệ phí thành công` | Control UI: Text heading.<br>- Hiển thị tiêu đề lớn, in đậm để xác nhận kết quả thanh toán thành công. |
| Mã giao dịch Cổng thanh toán | String(50) | Có | Theo Cổng thanh toán | Control UI: Text hiển thị (Read-only).<br>- Hiển thị mã giao dịch do Cổng thanh toán trả về. |
| Mã giao dịch hệ thống | String(50) | Có | Theo hệ thống | Control UI: Text hiển thị (Read-only).<br>- Hiển thị mã phiên giao dịch thanh toán nội bộ. |
| Thời gian thanh toán | Datetime | Có | Theo Cổng thanh toán | Control UI: Text hiển thị (Read-only).<br>- Hiển thị thời gian thanh toán thành công.<br>- Định dạng `dd/mm/yyyy HH:mm:ss`. |
| Số tiền thanh toán | Decimal(18,0) | Có | Theo giao dịch | Control UI: Text tiền tệ (Read-only).<br>- Hiển thị số tiền đã thanh toán.<br>- Định dạng tiền tệ VNĐ. |
| Phương thức thanh toán | Enum(String(100)) | Có | Theo Cổng thanh toán | Control UI: Text hiển thị (Read-only).<br>- Hiển thị phương thức thanh toán do Cổng thanh toán ghi nhận và trả về sau giao dịch. |
| Số biên lai điện tử | String(50) | Không | Theo hệ thống tài chính | Control UI: Text hiển thị (Read-only).<br>- Hiển thị mã biên lai nếu biên lai điện tử đã được phát hành tức thì.<br>- Nếu chưa phát hành tức thì, hiển thị trạng thái đang phát hành theo cấu hình hệ thống. |
| Đơn vị thụ hưởng | String(255) | Có | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Hiển thị tên Trung tâm đăng ký giao dịch bảo đảm/đơn vị tiếp nhận phí. |
| Khối Thông báo gửi Email | Text(1000) | Có | Theo hệ thống | Control UI: Alert/Notification.<br>- Tiêu đề hiển thị: `THÔNG BÁO GỬI EMAIL:` kèm icon check xanh.<br>- Nội dung hiển thị: *"Thông báo kích hoạt mã số kèm **Biên lai thu phí điện tử đã nộp (đã ký số điện tử)** đã được gửi thành công đến địa chỉ email đăng ký của bạn. Bạn cũng có thể bắt đầu sử dụng mã số này để tra cứu trực tiếp."* |
| **II.A. Thông tin nghiệp vụ - Thanh toán đăng ký biện pháp bảo đảm** | - | - | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_DANG_KY` | Control UI: Detail section.<br>- Chỉ hiển thị cho loại thanh toán Phiếu đăng ký. |
| Số đăng ký | String(50) | Có | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Hiển thị số đăng ký của hồ sơ. |
| Số PIN | String(50) | Không | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị khi hồ sơ thuộc trường hợp Đăng ký lần đầu hoặc Thông báo xử lý tài sản bảo đảm thuộc nguồn tài sản chưa đăng ký trên hệ thống BPBĐ.<br>- Các trường hợp khác để trống. |
| Dòng hướng dẫn đăng ký | Text(1000) | Có | Theo hệ thống | Control UI: Text hiển thị.<br>- Hiển thị hướng dẫn tiếp theo cho Khách hàng sau khi hồ sơ Phiếu đăng ký đã thanh toán thành công và được chuyển sang trạng thái `Chờ duyệt`. |
| **II.B. Thông tin nghiệp vụ - Thanh toán Yêu cầu cung cấp thông tin** | - | - | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_CCTT` | Control UI: Detail section.<br>- Chỉ hiển thị cho loại thanh toán Yêu cầu cung cấp thông tin. |
| Mã hồ sơ CCTT | String(50) | Có | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Hiển thị mã hồ sơ Yêu cầu cung cấp thông tin. |
| Dòng hướng dẫn CCTT | Text(1000) | Có | Theo hệ thống | Control UI: Text hiển thị.<br>- Hiển thị hướng dẫn tiếp theo cho Khách hàng sau khi yêu cầu CCTT đã thanh toán thành công và được chuyển sang trạng thái `Chờ duyệt`. |
| **II.C. Thông tin nghiệp vụ - Thanh toán Yêu cầu cung cấp bản sao** | - | - | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_BAN_SAO` | Control UI: Detail section.<br>- Chỉ hiển thị cho loại thanh toán Yêu cầu cung cấp bản sao. |
| Mã hồ sơ bản sao | String(50) | Có | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Hiển thị mã hồ sơ yêu cầu cung cấp bản sao. |
| Dòng hướng dẫn bản sao | Text(1000) | Có | Theo hệ thống | Control UI: Text hiển thị.<br>- Hiển thị hướng dẫn tiếp theo cho Khách hàng sau khi yêu cầu cung cấp bản sao đã thanh toán thành công và được chuyển sang trạng thái `Chờ duyệt`. |
| **II.D. Thông tin nghiệp vụ - Thanh toán Cấp mã số sử dụng CSDL** | - | - | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_CAP_MA_CSDL` | Control UI: Detail section.<br>- Chỉ hiển thị cho loại thanh toán cấp mã số sử dụng CSDL. |
| Dòng mô tả kết quả | Text(1000) | Có | Theo hệ thống | Control UI: Text hiển thị.<br>- Hiển thị nội dung: *"Yêu cầu cấp mã số sử dụng cơ sở dữ liệu thường xuyên đã được thanh toán và kích hoạt thành công. Dưới đây là mã số CSDL của bạn:"* |
| Khung hiển thị mã số | String(50) | Có | Theo hệ thống | Control UI: Box Badge.<br>- Hiển thị box viền nét đứt màu xanh lá nhạt, nền xanh nhạt.<br>- Nhãn trên: `MÃ SỐ SỬ DỤNG CSDL CỦA BẠN`.<br>- Mã số CSDL hiển thị nổi bật dạng `TX-xxxxxx`. |

#### 4.1.158.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem chi tiết hồ sơ | Button | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_DANG_KY`. Điều hướng sang màn hình Xem chi tiết hồ sơ đăng ký tương ứng. |
| 2 | Xem chi tiết yêu cầu CCTT | Button | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_CCTT`. Điều hướng sang màn hình Xem chi tiết yêu cầu cung cấp thông tin tương ứng. |
| 3 | Xem chi tiết yêu cầu bản sao | Button | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_BAN_SAO`. Điều hướng sang màn hình Xem chi tiết yêu cầu cung cấp bản sao tương ứng. |
| 4 | Tra cứu ngay | Button | Chỉ hiển thị khi `Mã loại thanh toán = THANH_TOAN_CAP_MA_CSDL`. Button primary xanh đậm kèm icon `fa-search`. |
|  |  |  | **TH Hợp lệ**: Khi người dùng click nút, hệ thống tự động chuyển người dùng quay trở lại màn hình Tra cứu thông tin trước đó theo `Return URL`, đồng thời tự động điền sẵn mã số CSDL vừa được cấp vào ô nhập mã số tra cứu để người dùng thực hiện tra cứu ngay. |
| 5 | Xem/Tải biên lai điện tử | Button/Link | Mở xem hoặc tải file biên lai thu phí điện tử dạng PDF nếu biên lai đã được phát hành. |
|  |  |  | **TH1 - Biên lai đã phát hành**: Hệ thống mở file biên lai điện tử đúng với giao dịch thanh toán hiện tại; cho phép người dùng tải file PDF. |
|  |  |  | **TH2 - Biên lai chưa phát hành tức thì**: Hệ thống hiển thị [MSG-WRN-PAY-001], không cho phép tải file cho đến khi biên lai được phát hành. |
| 6 | Quay lại trang chủ | Button | Button outline trắng/xám kèm icon `fa-home`. Quay về Trang chủ Website Khách hàng. |
| 7 | Gửi email xác nhận | System action | Hệ thống tự động gửi email xác nhận thanh toán thành công cho Khách hàng sau khi cập nhật giao dịch thành công. |
|  |  |  | **TH1 - Gửi email thành công**: Hệ thống ghi nhận trạng thái gửi email thành công vào Audit Log. |
|  |  |  | **TH2 - Gửi email thất bại**: Hệ thống ghi nhận lỗi gửi email vào hàng đợi email để retry; không rollback giao dịch thanh toán thành công. |
