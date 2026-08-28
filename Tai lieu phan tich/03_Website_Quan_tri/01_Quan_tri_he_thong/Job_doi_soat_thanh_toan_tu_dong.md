### 5.1.3. UCPS009 - Tác vụ đối soát thanh toán tự động

#### 5.1.3.1. Mục đích
- Đặc tả quy trình tiến trình chạy ngầm tự động đối soát giao dịch thanh toán lệ phí trực tuyến giữa hệ thống Đăng ký biện pháp bảo đảm (BPBĐ) và Cổng thanh toán vào lúc 23:00 hàng ngày, nhằm đồng bộ trạng thái hồ sơ, xử lý các trường hợp mất thông báo thanh toán tự động từ Cổng thanh toán, phát hiện sai lệch số tiền, xử lý giao dịch không xác định và theo dõi kết quả hoàn tiền phát sinh khi hồ sơ Online đã thanh toán bị từ chối.

*a. Phân quyền*

- Hệ thống (Tiến trình chạy ngầm / Bộ lập lịch tự động).

*b. Điều kiện thực hiện*

- Đến thời điểm chạy cấu hình tự động (23:00 hàng ngày) hoặc được kích hoạt chạy đối soát thủ công bởi cán bộ Quản trị hệ thống tại màn hình quản lý kết nối.

---

#### 5.1.3.2. Quy trình và Phạm vi lấy dữ liệu đối soát từ Cổng thanh toán

##### 5.1.3.2.1. Phạm vi lấy dữ liệu
- Tiến trình đối soát tự động hàng ngày thực hiện lấy thông tin toàn bộ các giao dịch **Thành công** ghi nhận phía Cổng thanh toán phát sinh trong chu kỳ 48 giờ:
  - **Từ 00:00:00 ngày T-1 đến 23:59:59 ngày T** (với T là ngày chạy tiến trình đối soát hiện tại).

##### 5.1.3.2.2. Các thông tin thu thập từ Cổng thanh toán
Các thông tin thu thập từ Cổng thanh toán phục vụ đối soát bao gồm:
- **Mã giao dịch tại Cổng**: Mã duy nhất ghi nhận tại Cổng thanh toán.
- **Mã giao dịch hệ thống / Mã hồ sơ**: Mã tham chiếu gửi từ hệ thống BPBĐ để đối chiếu.
- **Số tiền thực thu**: Số tiền thực tế khách hàng đã thanh toán thành công ghi nhận tại Cổng.
- **Thời gian giao dịch**: Ngày giờ giao dịch thành công ghi nhận tại Cổng.
- **Phương thức thanh toán**: Thẻ nội địa, Ví điện tử, Mã QR, Thẻ quốc tế...
- **Mã ngân hàng**: Tên ngân hàng thực hiện giao dịch thanh toán.

---

#### 5.1.3.3. Đặc tả Logic Đối soát Chéo và Xử lý Sai lệch trạng thái Hồ sơ trên BPBĐ

Tiến trình đối soát tiến hành so khớp mã giao dịch và số tiền của các giao dịch Thành công nhận được từ Cổng thanh toán với dữ liệu nội bộ trên hệ thống BPBĐ. Kết quả đối soát và hành động xử lý tương ứng tập trung vào **Trạng thái của hồ sơ trên BPBĐ** được quy định chi tiết trong bảng ma trận dưới đây:

##### 5.1.3.3.1. Bảng ma trận đối soát trạng thái hồ sơ trên BPBĐ

| Kết quả so khớp Mã đối chiếu | Trạng thái Hồ sơ hiện tại trên BPBĐ | Kết quả so khớp Số tiền | Trạng thái Hồ sơ mới trên BPBĐ | Hành động xử lý của hệ thống & Điểm đến tra soát |
| :--- | :--- | :--- | :--- | :--- |
| **Trùng khớp** <br>(Tìm thấy mã trên hệ thống) | **Chờ thanh toán** | **Khớp 100%** <br>(Đúng số tiền) | `Chờ duyệt` <br>(hoặc `Đã thanh toán` đối với tra cứu) | Ghi nhận thanh toán thành công và gửi email biên nhận cho khách hàng. **Chỉ sinh mã PIN tra cứu hồ sơ nếu Loại đăng ký của hồ sơ là "Đăng ký mới" (UC024)** — hồ sơ đã có Mã PIN (thay đổi, xóa, thông báo xử lý tài sản, yêu cầu cung cấp bản sao/thông tin,...) không được sinh PIN mới. |
| **Trùng khớp** <br>(Tìm thấy mã trên hệ thống) | **Khác trạng thái** <br>*Sai lệch thanh toán* | **Lệch thiếu** <br>(Thực thu < Phải thu) | `Sai lệch thanh toán` <br>**(TẠM KHÓA)** | **Sai lệch thiếu**: Cập nhật trạng thái hồ sơ thành `Sai lệch thanh toán` để tạm khóa hồ sơ. Tạo yêu cầu xử lý vào Danh sách tra soát Lệch thiếu (Tab 1 của [UCPS008]). Gửi email cảnh báo kèm link nộp bổ sung cho khách hàng. |
| **Trùng khớp** <br>(Tìm thấy mã trên hệ thống) | **Chờ thanh toán** | **Lệch thừa** <br>(Thực thu > Phải thu) | `Chờ duyệt` <br>(hoặc `Đã thanh toán` đối với tra cứu) | **Sai lệch thừa**: Cập nhật trạng thái hồ sơ thành `Chờ duyệt`/`Đã thanh toán` để đi tiếp. Tạo yêu cầu xử lý hoàn tiền thừa vào Danh sách tra soát Lệch thừa (Tab 1 của [UCPS008]). Gửi email biên nhận và hẹn hoàn trả tiền thừa sau 3-5 ngày. |
| **Không trùng khớp** <br>(Không tìm thấy trên Cổng) | **Các trạng thái đã thanh toán** <br>(*Chờ duyệt / Duyệt chờ ký / Chờ ký / Bị từ chối*) | Không áp dụng | `Sai lệch thanh toán` <br>**(TẠM KHÓA KHẨN CẤP)** | **Nghi vấn bảo mật**: BPBĐ ghi nhận thành công nhưng Cổng báo không có giao dịch. Tạm khóa hồ sơ khẩn cấp. Tạo yêu cầu xử lý nghi vấn gửi sang [UCPS008] (Tab 1). Gửi email cảnh báo đỏ khẩn cấp cho Kế toán và Admin để kiểm tra dấu hiệu can thiệp dữ liệu. |
| **Không trùng khớp** <br>(Tìm kiếm mở rộng) | **Chờ thanh toán** | **Khớp 100%** <br>(Đúng số tiền) | `Chờ duyệt` <br>(hoặc `Đã thanh toán` đối với tra cứu) | **Tìm thấy mở rộng khớp tiền**: Cập nhật trạng thái hồ sơ sang tiếp nhận/trả kết quả, gửi email biên nhận (kèm PIN chỉ khi Loại đăng ký là "Đăng ký mới" - UC024). |
| **Không trùng khớp** <br>(Tìm kiếm mở rộng) | **Khác trạng thái** <br>*Sai lệch thanh toán* | **Lệch thiếu** <br>(Thực thu < Phải thu) | `Sai lệch thanh toán` <br>**(TẠM KHÓA)** | **Tìm thấy mở rộng lệch thiếu**: Tạm khóa hồ sơ sang `Sai lệch thanh toán`. Tạo yêu cầu xử lý vào Danh sách tra soát Lệch thiếu (Tab 1 của [UCPS008]). Gửi email cảnh báo kèm link nộp bổ sung. |
| **Không trùng khớp** <br>(Tìm kiếm mở rộng) | **Chờ thanh toán** | **Lệch thừa** <br>(Thực thu > Phải thu) | `Chờ duyệt` <br>(hoặc `Đã thanh toán` đối với tra cứu) | **Tìm thấy mở rộng lệch thừa**: Cập nhật trạng thái hồ sơ sang `Chờ duyệt`/`Đã thanh toán` để đi tiếp. Tạo yêu cầu xử lý hoàn tiền thừa vào Danh sách tra soát Lệch thừa (Tab 1 của [UCPS008]). Gửi email biên nhận và hẹn hoàn tiền thừa. |
| **Không trùng khớp** <br>(Hoàn toàn không tìm thấy) | Không áp dụng | Bất kỳ | **Giữ nguyên** <br>(Chưa liên kết hồ sơ) | **Giao dịch không xác định**: Đẩy giao dịch vào danh sách Giao dịch chưa xác định (Tab 2 của [UCPS008]) ở trạng thái `Chưa gán` để Kế toán đối chiếu thủ công ngân hàng và gán hồ sơ hoặc hoàn tiền. |

> **Lưu ý nghiệp vụ:** Đối với tất cả các trạng thái hồ sơ và kết quả so khớp khác không được liệt kê trong bảng trên (ví dụ: hồ sơ đã ở trạng thái *Chờ duyệt / Duyệt chờ ký / Chờ ký / Bị từ chối / Đã duyệt / Trả kết quả* mà đối soát khớp 100% tiền hoặc lệch thừa; hoặc hồ sơ đã ở trạng thái *Sai lệch thanh toán* mà đối soát báo lệch thiếu), hệ thống mặc định **Giữ nguyên trạng thái hiện tại của hồ sơ** và bỏ qua, không xử lý hay thực hiện thêm bất kỳ hành động nào khác (không sinh lại PIN, không gửi lại email biên nhận).

##### 5.1.3.3.2. Thuyết minh chi tiết logic xử lý từng trường hợp:

1. **Trường hợp trùng khớp Mã đối chiếu:**
   - **Đúng số tiền:**
     - Nếu hồ sơ đang ở trạng thái `Chờ thanh toán`: Cập nhật trạng thái hồ sơ thành `Chờ duyệt` (hoặc `Đã thanh toán` đối với tra cứu) và gửi email biên nhận. Chỉ sinh mã PIN mới khi Loại đăng ký của hồ sơ là "Đăng ký mới" (UC024); các loại hồ sơ khác không sinh PIN mới.
     - Các trạng thái khác: Giữ nguyên.
   - **Sai lệch thiếu:**
     - Nếu hồ sơ đang ở trạng thái khác `Sai lệch thanh toán`: Cập nhật trạng thái hồ sơ thành `Sai lệch thanh toán` (tạm khóa). Tạo yêu cầu tra soát lệch thiếu gửi sang [UCPS008]. Gửi email cảnh báo kèm link nộp bổ sung.
     - Trạng thái `Sai lệch thanh toán` sẵn có: Giữ nguyên.
   - **Sai lệch thừa:**
     - Nếu hồ sơ đang ở trạng thái `Chờ thanh toán`: Cập nhật trạng thái hồ sơ thành `Chờ duyệt`/`Đã thanh toán` để đi tiếp. Tạo yêu cầu tra soát lệch thừa gửi sang [UCPS008] để làm thủ tục hoàn trả. Gửi email biên nhận và hẹn hoàn tiền thừa sau 3-5 ngày.
     - Các trạng thái khác: Giữ nguyên.

2. **Trường hợp không trùng khớp Mã đối chiếu (Mở rộng tìm kiếm toàn bộ tập dữ liệu hoặc không tồn tại trên Cổng):**
   - **Giao dịch nghi vấn (BPBĐ ghi nhận thành công nhưng Cổng không tồn tại giao dịch):**
     - Nếu hồ sơ đang ở các trạng thái đã thanh toán (`Chờ duyệt`, `Duyệt chờ ký`, `Chờ ký`, `Bị từ chối`...): Hệ thống cập nhật trạng thái hồ sơ thành `Sai lệch thanh toán` để tạm khóa khẩn cấp. Tạo yêu cầu tra soát nghi vấn lỗi/bảo mật gửi sang [UCPS008]. Gửi email cảnh báo đỏ khẩn cấp cho Kế toán và Admin hệ thống.
   - **Tìm kiếm mở rộng trong CSDL lịch sử:**
     Hệ thống thực hiện quét tìm kiếm mở rộng trong Cơ sở dữ liệu lịch sử để tìm kiếm hồ sơ liên kết.
     - *Nếu tìm thấy hồ sơ liên kết trong CSDL:* Áp dụng logic xử lý tương tự như khi trùng khớp:
       - **Đúng số tiền:** Nếu hồ sơ là `Chờ thanh toán` -> Cập nhật thành `Chờ duyệt`/`Đã thanh toán`. Các trạng thái khác -> Giữ nguyên.
       - **Sai lệch thiếu:** Nếu khác trạng thái `Sai lệch thanh toán` -> Cập nhật thành `Sai lệch thanh toán` (Tạm khóa) và tạo yêu cầu tra soát lệch thiếu tại [UCPS008], gửi email cảnh báo. Trạng thái `Sai lệch thanh toán` sẵn có -> Giữ nguyên.
       - **Sai lệch thừa:** Nếu hồ sơ là `Chờ thanh toán` -> Cập nhật thành `Chờ duyệt`/`Đã thanh toán` để đi tiếp, tạo yêu cầu tra soát lệch thừa tại [UCPS008] để hoàn trả. Các trạng thái khác -> Giữ nguyên.
     - *Nếu hoàn toàn không tìm thấy thông tin hồ sơ:*
       - Ghi nhận là **Giao dịch không xác định**.
       - Đẩy bản ghi giao dịch này vào Danh sách giao dịch chưa xác định (Tab 2 của [UCPS008]) ở trạng thái `Chưa gán` để Cán bộ kế toán thực hiện đối chiếu thủ công và xử lý gán hồ sơ hoặc hoàn tiền.

---

#### 5.1.3.4. Đối soát yêu cầu hoàn tiền hồ sơ Online

##### 5.1.3.4.1. Nguồn phát sinh yêu cầu hoàn tiền

Yêu cầu hoàn tiền được tạo khi hồ sơ Online đã thanh toán thành công nhưng sau đó bị từ chối bởi Cán bộ hoặc Lãnh đạo tại các bước xử lý nghiệp vụ. Yêu cầu hoàn tiền phải liên kết với giao dịch thanh toán gốc, mã hồ sơ, số tiền đã thu, lý do từ chối và người/thời điểm phát sinh yêu cầu.

##### 5.1.3.4.2. Trạng thái yêu cầu hoàn tiền

| Trạng thái | Mô tả |
| :--- | :--- |
| Chờ gửi yêu cầu hoàn tiền | Hệ thống đã tạo yêu cầu hoàn tiền nhưng chưa gửi sang Cổng thanh toán. |
| Đã gửi yêu cầu hoàn tiền | Đã gửi yêu cầu hoàn tiền sang Cổng thanh toán, đang chờ kết quả cuối cùng. |
| Hoàn tiền thành công | Cổng thanh toán xác nhận hoàn tiền thành công. |
| Hoàn tiền thất bại | Cổng thanh toán trả kết quả thất bại hoặc quá hạn không hoàn tất. |
| Cần xử lý thủ công | Cần Cán bộ kế toán/Admin kiểm tra do sai lệch, mất kết nối hoặc dữ liệu giao dịch gốc không đủ điều kiện hoàn tiền tự động. |

##### 5.1.3.4.3. Nguyên tắc xử lý

1. Hệ thống không tự ý hoàn tiền nếu không tìm thấy giao dịch thanh toán gốc đã thành công.
2. Nếu Cổng thanh toán hỗ trợ API hoàn tiền, job gửi yêu cầu hoàn tiền theo đúng giao dịch gốc và cập nhật trạng thái theo phản hồi.
3. Nếu Cổng thanh toán không hỗ trợ hoặc phản hồi lỗi, yêu cầu hoàn tiền chuyển sang "Cần xử lý thủ công" tại [UCPS008].
4. Mỗi hồ sơ/giao dịch gốc chỉ được có một yêu cầu hoàn tiền đang mở tại một thời điểm để tránh hoàn trùng.
5. Mọi lần gửi yêu cầu, nhận phản hồi, lỗi kết nối, retry và cập nhật trạng thái hoàn tiền phải ghi lịch sử đối soát, phục vụ tra cứu tại Module Quản lý đối soát thanh toán.
