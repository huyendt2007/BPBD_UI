Bạn là Chuyên viên Phân tích Nghiệp vụ (BA) kiêm Technical Lead của dự án. Hãy rà soát toàn bộ các file SRS các Phần và thực hiện điều chỉnh lại cho tôi 1 cách chính xác theo các nguyên tắc

# 1. Tài liệu Giải quyết YCBT

- Bổ sung nhánh quay lui vào Sơ đồ luồng: Vụ việc đang `Chờ thực thi` mà Quyết định giải quyết bồi thường bị hủy thì chuyển sang `Đình chỉ giải quyết`.
- Khối 5 (Quyết định giải quyết bồi thường) trên màn Cập nhật kết quả xử lý: khi Quyết định gắn với hồ sơ đã ở trạng thái `Đã hủy` thì hiển thị cảnh báo kèm số Quyết định hủy và lý do hủy, giữ nguyên lịch sử Quyết định cũ.
- Khối 7 (Hoãn / Tạm đình chỉ / Đình chỉ giải quyết): bổ sung nguồn chuyển trạng thái `Đình chỉ giải quyết` đến từ việc hủy Quyết định, phân biệt với đình chỉ do cán bộ chủ động thao tác.

# 2. Quyết định giải quyết bồi thường

## 2.1. Nguyên tắc chung

- Sửa lại tuân thủ theo nguyên tắc: Hủy QĐ ⇒ QĐ gốc `Đã hủy` + vụ việc gốc `Đình chỉ giải quyết`.
- Chặn cứng Hủy và Sửa chữa, bổ sung khi đã có Đề nghị cấp kinh phí bồi thường ở trạng thái `Hoàn thành` hoặc `Sung quỹ nhà nước`.
- Toàn bộ quy tắc liên thông sang Module Kinh phí phải khai báo tập trung thành bộ `[BR-BTNN-QD-...]` đặt ở mục Quy tắc nghiệp vụ, KHÔNG viết rải rác trong cột Mô tả của từng chức năng. Hiện tài liệu chưa có mục Quy tắc nghiệp vụ nào, mà cùng một nội dung liên kết đang bị chép lại ở 3 nơi: chức năng `Ký số` (MH01), chức năng `Ký duyệt` (MH02) và chức năng `Ban hành QĐ` (MH05).
- Điểm kích hoạt của mọi quy tắc phải định nghĩa theo **sự kiện trạng thái**: *khi một Quyết định chuyển sang `Đã ban hành`*, không gắn vào từng nút bấm. Lý do: có 3 đường đi tới `Đã ban hành` (nút `Ký số` ở MH01, nút `Ký duyệt` ở MH02, nút `Ban hành QĐ` ở MH05 khi ký bên ngoài).

## 2.2. Tự động sinh Đề nghị cấp kinh phí khi ban hành Quyết định

Khi Ban hành QĐ hoặc Ký duyệt QĐ, hệ thống tự động sinh 01 bản ghi Đề nghị cấp kinh phí bồi thường ở trạng thái `Chờ lập đề nghị`.

**Điều kiện kích hoạt (phải thỏa đồng thời):**
- Loại quyết định = `Quyết định giải quyết bồi thường`. Quyết định hủy và Quyết định sửa chữa, bổ sung KHÔNG sinh bản ghi mới.
- Vụ việc có yêu cầu bồi thường bằng tiền.
- Chưa tồn tại Đề nghị cấp kinh phí bồi thường có hiệu lực cho vụ việc đó (tái dùng quy tắc chống trùng sẵn có).

**Bảng ánh xạ dữ liệu — phải định nghĩa rõ để Dev map được:**

| Trường trên Đề nghị cấp kinh phí | Nguồn dữ liệu |
| :--- | :--- |
| Mã đề xuất kinh phí | Hệ thống tự sinh `KP-YYYY-XXX` |
| Ngày lập đề nghị | Ngày ban hành Quyết định |
| Loại đề nghị | `Đề nghị cấp kinh phí bồi thường` (khóa, không cho đổi) |
| Trạng thái | `Chờ lập đề nghị` |
| **Số Quyết định làm căn cứ** | Số quyết định của Quyết định vừa ban hành *(trường mới, xem mục 4)* |
| **Ngày Quyết định làm căn cứ** | Ngày quyết định của Quyết định vừa ban hành *(trường mới, xem mục 4)* |
| Mã vụ việc gốc | Mã vụ việc trên Quyết định. Hiển thị dạng HyperLink, click vào thì mở ra màn Xem chi tiết vụ việc |
| Tên vụ việc | Tên vụ việc trên Quyết định |
| Họ và tên người yêu cầu bồi thường | Lấy theo Quyết định đã ban hành |
| Địa chỉ chi tiết / Phường, Xã / Tỉnh, Thành phố | Lấy theo Quyết định đã ban hành |
| Tổng số tiền bồi thường | Lấy theo Quyết định đã ban hành |
| Số tiền bồi thường đã tạm ứng | Lấy theo Quyết định đã ban hành |
| Số tiền bồi thường còn lại | Lấy theo Quyết định đã ban hành |
| Phương thức chi trả · Chủ tài khoản · Số tài khoản · Tên ngân hàng · Chi nhánh | Lấy theo Quyết định đã ban hành |
| Tài liệu gửi kèm — dòng *Quyết định giải quyết bồi thường* | Đính tự động tệp PDF Quyết định đã ký |
| Cơ quan cấp phát kinh phí · Ý kiến đề xuất / Trích yếu tờ trình · Các tài liệu gửi kèm còn lại | Để trống, cán bộ nhập khi mở form lập đề nghị |
| Cán bộ đề xuất xử lý | Gán theo người mở form lập đề nghị, KHÔNG gán lúc tự sinh (thời điểm đó chưa xác định được ai lập) |

**Quy tắc về số tiền:** Số tiền duyệt cấp pre-fill theo số tiền trên Quyết định. Cho phép sửa nhưng nếu lệch so với Quyết định thì bắt buộc nhập lý do — tái dùng cơ chế `Lý do điều chỉnh số liệu kinh phí` đã có sẵn bên màn Quyết định.

## 2.3. Hủy Quyết định giải quyết bồi thường

**Điều kiện chặn:**
- Chặn cứng, không cho phép hủy nếu đã tồn tại Đề nghị cấp kinh phí bồi thường ở trạng thái `Hoàn thành` hoặc `Sung quỹ nhà nước`.
- Kiểm tra phải chạy ngay từ bước `Trình ký`, không để ký xong mới báo lỗi.

**Xử lý liên thông sang Module Kinh phí sau khi ban hành Quyết định hủy:**

| Bản ghi kinh phí hiện có | Xử lý |
| :--- | :--- |
| Đề nghị tạm ứng ở trạng thái `Hoàn thành` | Cảnh báo bắt buộc xác nhận trước khi ban hành. Sau khi xác nhận: chuyển sang `Chờ thu hồi` |
| Đề nghị tạm ứng ở các trạng thái khác | Tự động chuyển sang `Đã hủy` |
| Đề nghị cấp kinh phí bồi thường ở các trạng thái khác (`Chờ lập đề nghị`, `Chờ duyệt`, `Chờ chi trả`) | Tự động chuyển sang `Đã hủy` |

**Cập nhật trạng thái:**
- Quyết định gốc chuyển sang `Đã hủy`, gắn liên kết Quyết định hủy vào hồ sơ Quyết định gốc.
- Vụ việc gốc gắn với Quyết định đó chuyển sang `Đình chỉ giải quyết`.
- Ghi mốc vào Lịch sử xử lý của CẢ vụ việc, không chỉ của quyết định.

**Yêu cầu hiển thị:** Khi mở Xem chi tiết bản ghi Đề nghị kinh phí đã bị chuyển `Đã hủy` hoặc `Chờ thu hồi`, phải có khối thông tin chứng minh được vì sao — nêu rõ số và ngày Quyết định hủy là căn cứ, lý do hủy, thời điểm hệ thống tự động chuyển trạng thái.

## 2.4. Sửa chữa, bổ sung Quyết định giải quyết bồi thường

**Điều kiện chặn:**
- Chặn cứng, không cho phép thực hiện nếu đã tồn tại Đề nghị cấp kinh phí bồi thường ở trạng thái `Hoàn thành` hoặc `Sung quỹ nhà nước`.

**Yêu cầu về nội dung sửa chữa:**
- Bắt buộc phải bóc tách, phân biệt được các nội dung sửa chữa, bổ sung, để hệ thống tự động cập nhật vào Đề nghị cấp kinh phí bồi thường tương ứng đang tồn tại.
- Do đó màn Hủy/Sửa chữa, bổ sung phải bổ sung khối `Chi tiết nội dung quyết định sau sửa chữa, bổ sung` — chỉ hiển thị khi loại là Sửa chữa, bổ sung, kế thừa đầy đủ từ Quyết định gốc và cho phép cập nhật. Hiện màn này KHÔNG có một trường số tiền nào nên cán bộ không có chỗ để sửa.
- Hệ thống tự đánh dấu các trường có thay đổi so với Quyết định gốc, phục vụ dựng nội dung "nội dung cũ → nội dung mới" của Mẫu 12/BTNN và phục vụ cập nhật ngược sang đề nghị kinh phí.

**Xử lý sau khi ban hành Quyết định sửa chữa, bổ sung:**
- Chuyển các Đề nghị cấp kinh phí bồi thường đang tồn tại về trạng thái `Chờ lập đề nghị`, cập nhật lại nội dung theo đúng phần đã điều chỉnh trên Quyết định.
- Lãnh đạo phải phê duyệt lại nếu trước đó bản ghi đang ở trạng thái `Chờ chi trả`.
- Khi mở Xem chi tiết đề nghị kinh phí, phải thể hiện được thông tin đã bị sửa chữa, bổ sung theo Quyết định nào (số, ngày, nội dung điều chỉnh, số tiền trước và sau).

**Cập nhật trạng thái:**
- Trạng thái Quyết định gốc ban đầu VẪN GIỮ `Đã ban hành`, chỉ gắn thêm liên kết Quyết định sửa chữa, bổ sung.
- Trạng thái vụ việc gốc VẪN GIỮ NGUYÊN, không thay đổi.

## 2.5. Các điều chỉnh khác trên tài liệu Quyết định

- MH01 — chức năng `Hủy quyết định` và `Sửa chữa, bổ sung`: bổ sung điều kiện ẩn nút khi vi phạm quy tắc chặn cứng, và khi vụ việc gốc đã ở `Đình chỉ giải quyết`.
- MH05 — bổ sung khối cảnh báo liên thông kinh phí: khi mở form, hiển thị ngay đề nghị kinh phí hiện có của vụ việc (loại, trạng thái, số tiền) để cán bộ biết mình sắp tác động vào cái gì.
- MH03 Chi tiết Quyết định — bổ sung 2 trường hiển thị: `Trạng thái vụ việc gốc` và `Đề nghị kinh phí liên quan`.

# 3. Đơn giản hóa thông tin nhập liệu

Nguyên tắc: chỉ giữ lại các trường thực sự cần cho việc lập văn bản và chi trả, cắt bỏ các khối nhân thân rườm rà.

**Trên màn Lập Quyết định và trên Đề nghị cấp kinh phí, khối thông tin người yêu cầu chỉ cần:**
- Họ và tên người yêu cầu bồi thường
- Địa chỉ: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố
- Tổng số tiền bồi thường và các số liệu tiền liên quan

**Bỏ hoàn toàn các trường đang đặc tả thừa trên Đề nghị cấp kinh phí:** Tư cách người yêu cầu bồi thường · Giới tính · Ngày tháng năm sinh · Số điện thoại liên hệ · Thư điện tử (Email) · Trạng thái người bị thiệt hại · Loại giấy tờ thân nhân · Số giấy tờ thân nhân · Ngày cấp · Nơi cấp · Quốc gia.

# 4. Tài liệu Kinh phí bồi thường

## 4.1. Trạng thái mới

Bổ sung 02 trạng thái: `Đã hủy` và `Chờ thu hồi`. Phải cập nhật đồng bộ ở: mục Mục đích, Sơ đồ luồng nghiệp vụ, bộ lọc `Trạng thái` (MH01), badge cột `Trạng thái`, cột `Hạn nhận / Sung quỹ` và các ô KPI tổng hợp.

Quy tắc chống trùng: bổ sung `Đã hủy` vào nhóm **không còn hiệu lực** (để hệ thống tự cho phép tạo đề nghị mới về sau). `Chờ thu hồi` vẫn thuộc nhóm **có hiệu lực**.

## 4.2. Trường mới

Bổ sung 02 trường `Số Quyết định làm căn cứ` và `Ngày Quyết định làm căn cứ` trên màn Lập/Cập nhật đề nghị cấp kinh phí. Hiện đề nghị chỉ liên kết tới *Mã vụ việc*, không liên kết tới *Quyết định*, nên khi Quyết định bị hủy hoặc bị sửa số tiền thì hệ thống không xác định được đề nghị nào phải bị tác động.

## 4.3. Nguồn dữ liệu theo Loại đề nghị

| Loại đề nghị | Nguồn dữ liệu |
| :--- | :--- |
| Đề nghị cấp kinh phí tạm ứng | Lấy theo thông tin Vụ việc đã nhập. Các trường cũng tối giản như mục 3 |
| Đề nghị cấp kinh phí bồi thường | Lấy theo thông tin trên Quyết định giải quyết bồi thường đã ban hành |

### 4.3.1. Bảng ánh xạ dữ liệu — Đề nghị cấp kinh phí tạm ứng (phải định nghĩa rõ để Dev map được)

**Điểm kích hoạt:** Hồ sơ yêu cầu bồi thường có yêu cầu tạm ứng kinh phí được xác nhận thụ lý hợp lệ, và chưa tồn tại Đề nghị tạm ứng có hiệu lực cho vụ việc đó.

| Trường trên Đề nghị cấp kinh phí | Nguồn dữ liệu |
| :--- | :--- |
| Mã đề xuất kinh phí | Hệ thống tự sinh `KP-YYYY-XXX` |
| Ngày lập đề nghị | Ngày xác nhận thụ lý hồ sơ |
| Loại đề nghị | `Đề nghị tạm ứng` (khóa, không cho đổi) |
| Trạng thái | `Chờ lập đề nghị` |
| **Số / Ngày Quyết định làm căn cứ** | **Để trống và ẩn.** Tạm ứng phát sinh sau thụ lý, TRƯỚC khi có Quyết định giải quyết bồi thường nên không có căn cứ Quyết định |
| Mã vụ việc gốc | Lấy theo hồ sơ vụ việc |
| Họ và tên người yêu cầu bồi thường | Lấy theo hồ sơ vụ việc |
| Địa chỉ chi tiết / Phường, Xã / Tỉnh, Thành phố | Lấy theo hồ sơ vụ việc |
| Bảng nội dung đề xuất cấp tạm ứng — cột `Nội dung tạm ứng` và `Mức đề nghị trong hồ sơ gốc` | Lấy theo khối yêu cầu tạm ứng kinh phí đã nhập trên hồ sơ vụ việc, tách theo từng loại thiệt hại |
| Bảng nội dung đề xuất cấp tạm ứng — cột `Số tiền duyệt cấp tạm ứng` | Để trống, cán bộ nhập. Giữ nguyên ràng buộc định mức tối thiểu 50% mức yêu cầu của từng loại thiệt hại |
| Phương thức chi trả · Chủ tài khoản · Số tài khoản · Tên ngân hàng · Chi nhánh | Lấy theo hồ sơ vụ việc |
| Cơ quan cấp phát kinh phí · Ý kiến đề xuất / Trích yếu tờ trình · Các tài liệu gửi kèm | Để trống, cán bộ nhập khi mở form lập đề nghị |
| Cán bộ đề xuất xử lý | Gán theo người mở form lập đề nghị, KHÔNG gán lúc tự sinh |

**Lưu ý phân biệt với Đề nghị cấp kinh phí bồi thường:** Đề nghị tạm ứng KHÔNG có các trường `Tổng số tiền bồi thường`, `Số tiền bồi thường đã tạm ứng`, `Số tiền bồi thường còn lại` — các trường này chỉ xuất hiện khi Loại đề nghị là cấp kinh phí bồi thường và lấy theo Quyết định đã ban hành (xem bảng ánh xạ tại mục 2.2).

## 4.4. Khối Tìm kiếm / Tìm kiếm nâng cao khi lập đề nghị

Phạm vi tìm kiếm khác nhau hoàn toàn theo `Loại đề nghị`, nên phải đặc tả thành **02 popup riêng biệt**, không gộp chung vào Popup chuẩn tìm kiếm vụ việc/hồ sơ gốc liên quan.

### 4.4.1. Popup Tìm kiếm Vụ việc (áp dụng cho Đề nghị cấp kinh phí tạm ứng)

- Tìm trên danh sách **Vụ việc**, chỉ lấy các vụ việc ở trạng thái: `Đang xác minh thiệt hại`, `Đang thương lượng`, `Chờ ban hành QĐ`.
- Dùng lại Popup chuẩn tìm kiếm vụ việc/hồ sơ gốc liên quan đã có, chỉ bổ sung điều kiện lọc trạng thái nêu trên.

### 4.4.2. Popup Tìm kiếm Quyết định giải quyết bồi thường (áp dụng cho Đề nghị cấp kinh phí bồi thường)

- Đặc tả thành **popup riêng**, KHÔNG dùng Popup chuẩn tìm kiếm vụ việc, vì đối tượng tìm kiếm là Quyết định chứ không phải Vụ việc, và bảng lưới kết quả khác hẳn.
- Tìm trên danh sách **Quyết định giải quyết bồi thường** ở trạng thái `Đã ban hành`.
- Loại trừ các Quyết định đã tồn tại Đề nghị cấp kinh phí bồi thường có hiệu lực, để tránh lập trùng.

**Bảng lưới kết quả tìm kiếm gồm các cột:**

| Cột | Ghi chú |
| :--- | :--- |
| Mã vụ việc | Liên kết mở chi tiết vụ việc |
| Số quyết định | |
| Ngày quyết định | Định dạng `dd/mm/yyyy` |
| Họ và tên người yêu cầu | |
| Trạng thái | Badge trạng thái Quyết định |
| Thao tác | Nút `Chọn` — chọn 01 Quyết định, đóng popup và điền dữ liệu về form lập đề nghị theo bảng ánh xạ tại mục 2.2 |

## 4.5. Trigger tự sinh và khối thu hồi

- Bổ sung trigger tự sinh thứ 3 vào mục Mục đích và Sơ đồ luồng: Quyết định giải quyết bồi thường chuyển sang `Đã ban hành`. Hiện chỉ có 2 trigger (tạm ứng khi thụ lý, và bản án/quyết định Tòa án), tức là luồng chính đang bị bỏ sót.
- MH05 Xem chi tiết đề nghị — bổ sung khối `Thu hồi kinh phí`, chỉ hiển thị khi đề nghị ở `Chờ thu hồi`. Gồm: căn cứ thu hồi (số, ngày Quyết định hủy), số tiền phải thu hồi, ngày ghi nhận thu hồi, số tiền đã thu hồi, tài liệu đính kèm và chức năng `Ghi nhận thu hồi`.
- MH01 — bổ sung nút mở khối thu hồi cho dòng ở trạng thái `Chờ thu hồi`.

# 5. Tài liệu Yêu cầu hủy Quyết định GQBT (STP)

Popup Cập nhật kết quả phản hồi: khi cơ quan quản lý phản hồi *đã hủy QĐ*, bổ sung liên kết tới Quyết định hủy thực tế bên Module Quyết định, tránh hai nơi ghi nhận lệch nhau.

# 6. Xây Dựng Module Cấu hình luồng báo cáo của phân hệ Bồi thường nhà nước

Cho phép khai báo thông tin cấu hình luồng đi của báo cáo
Các thông tin sẽ bao gồm:
- Tên Biểu mẫu báo cáo
- Đơn vị lập báo cáo: Cho phép chọn 1 hoặc nhiều báo cáo
- Đơn vị nhận báo cáo: Chỉ được phép chọn một
- Trạng thái: Hoạt động/Tạm ngưng
- Từ ngày: Không bắt buộc
- Đến ngày: Không bắt buộc

Sau khi lưu thông tin cấu hình, với cấu hình flow ở trạng thái Hoạt động, Hệ thống sẽ thực hiện tổng hợp báo cáo ưu tiên theo luồng động, Nếu luồng động không có thì sẽ tổng hợp dữ liệu báo cáo theo đúng cây cấp đơn vị đã khai báo trên hệ thống

---

# 7. Yêu cầu điều chỉnh giao diện giả lập (Mockup)

**Phạm vi:** Chỉ xây dựng giao diện. KHÔNG giả lập và KHÔNG viết logic kiểm tra điều kiện cho việc Ban hành QĐ và Ký duyệt QĐ (kiểm tra chặn theo kinh phí, cảnh báo xác nhận, chuyển trạng thái liên thông...). Phần luồng xử lý bên dưới do Dev tự triển khai sau.

## 7.1. Bổ sung Popup Tìm kiếm Quyết định giải quyết bồi thường

- Xây dựng mới popup này tại màn Lập/Cập nhật đề nghị cấp kinh phí, chỉ mở khi `Loại đề nghị` là `Đề nghị cấp kinh phí bồi thường`.
- Khi `Loại đề nghị` là `Đề nghị tạm ứng` thì vẫn mở Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan như hiện tại.
- Bảng lưới kết quả gồm các cột: `STT`, `Mã vụ việc` (dạng HyperLink mở xem chi tiết vụ việc), `Số quyết định`, `Ngày quyết định`, `Họ và tên người yêu cầu`, `Trạng thái`, `Thao tác` (nút `Chọn`).
- Không tự động tải dữ liệu khi mở popup, chỉ tải sau khi bấm `Tìm kiếm`.
- Có thanh phân trang, cho phép chọn số lượng bản ghi trên trang.
- Đặc tả chi tiết xem mục `4.3.3.2.8. Popup Tìm kiếm Quyết định giải quyết bồi thường` trong tài liệu SRS Kinh phí bồi thường.

## 7.2. Bổ sung nút Tạo yêu cầu tại Tab Vụ việc chờ tiếp nhận

- Bổ sung nút `Tạo yêu cầu` trên thanh công cụ của Tab `Vụ việc chờ tiếp nhận`.
- Khi người dùng click, hệ thống mở màn hình Nhập liệu hồ sơ vụ việc ở chế độ tạo mới.

## 7.3. Chuẩn hóa tên các cột tại lưới kết quả Popup tìm kiếm Vụ việc

Sửa lại đúng theo tài liệu đã đặc tả, bảng lưới gồm các cột:
- `STT`
- `Mã vụ việc` (dạng HyperLink, click mở màn Xem chi tiết vụ việc tại tab mới, không đóng popup đang mở)
- `Tên vụ việc`
- `Người yêu cầu`
- `Lĩnh vực phát sinh thiệt hại`
- `Tỉnh/Thành phố`
- `Ngày tiếp nhận`
- `Trạng thái`
- `Thao tác` (nút `Chọn`)

## 7.4. Sửa lại Form Quyết định giải quyết bồi thường theo đặc tả mới

Áp dụng cho cả 03 màn: Lập/Trình ký Quyết định, Hủy/Sửa chữa bổ sung Quyết định, và Xem chi tiết Quyết định.

- **Bỏ trường `Sổ văn bản áp dụng`** khỏi toàn bộ các form.
- **Tách `Địa chỉ người yêu cầu`** thành 03 trường riêng: `Địa chỉ chi tiết`, `Phường/Xã`, `Tỉnh/Thành phố`.
- **Màn Hủy/Sửa chữa, bổ sung**:
  + Trường `Quyết định gốc` hiển thị dạng HyperLink, click mở màn Xem chi tiết Quyết định gốc. Hiển thị mỗi thông tin trên 01 dòng riêng: Số quyết định gốc, Ngày ban hành, Trạng thái (dạng Badge), Cơ quan ban hành.
  + Trường `Mã vụ việc` hiển thị dạng HyperLink, click mở màn Xem chi tiết vụ việc.
  + Bổ sung **Khối cảnh báo liên thông kinh phí** đặt phía trên khối thông tin chung: hiển thị Mã đề xuất kinh phí, Loại đề nghị, Trạng thái, Số tiền của các đề nghị kinh phí hiện có của vụ việc. Chỉ dựng giao diện hiển thị, không cần xử lý logic chặn.
  + Bổ sung **Khối Chi tiết nội dung quyết định sau sửa chữa, bổ sung**, chỉ hiển thị khi loại là Sửa chữa, bổ sung. Kế thừa đầy đủ từ Quyết định gốc và cho phép cập nhật, gồm: `Tên vụ việc`, `Người yêu cầu bồi thường`, `Địa chỉ chi tiết`, `Phường/Xã`, `Tỉnh/Thành phố`, `Cơ quan quản lý người thi hành công vụ`, `Ngày thương lượng`, `Tổng số tiền bồi thường`, `Số tiền bồi thường đã tạm ứng`, `Số tiền bồi thường còn lại`, `Phương thức chi trả tiền bồi thường`, `Chủ tài khoản`, `Số tài khoản`, `Tên ngân hàng`, `Chi nhánh ngân hàng`, `Các quyền, lợi ích hợp pháp khác được khôi phục`.
- **Màn Xem chi tiết Quyết định**: Bổ sung 02 trường hiển thị `Trạng thái vụ việc gốc` (dạng Badge) và `Đề nghị kinh phí liên quan` (danh sách liên kết gồm Mã đề xuất kinh phí, Loại đề nghị, Trạng thái, Số tiền; click mở màn Xem chi tiết đề nghị cấp kinh phí).

## 7.5. Bổ sung dữ liệu giả lập cho Đề nghị cấp kinh phí

Giả lập đầy đủ các trạng thái của đề nghị kinh phí, gồm cả 02 trạng thái mới:
- `Chờ lập đề nghị`
- `Chờ duyệt`
- `Chờ chi trả`
- `Hoàn thành`
- `Sung quỹ nhà nước`
- `Bị từ chối`
- **`Đã hủy`** — kèm bản ghi minh họa bị hủy do Quyết định giải quyết bồi thường bị hủy, hiển thị được Khối Căn cứ thay đổi trạng thái theo Quyết định.
- **`Chờ thu hồi`** — kèm bản ghi minh họa là Đề nghị tạm ứng đã chi trả xong, phát sinh thu hồi do Quyết định bị hủy; mở chi tiết phải thấy Khối Thu hồi kinh phí.
- **`Chờ lập đề nghị` do bị sửa đổi, bổ sung** — bản ghi minh họa đã từng ở `Chờ chi trả`, bị đưa về `Chờ lập đề nghị` bởi một Quyết định sửa chữa, bổ sung cụ thể; mở chi tiết phải thấy được sửa theo Quyết định số nào, số tiền trước và sau điều chỉnh.

## 7.6. Sửa lại phần Khi Tìm kiếm loại

*(Nội dung yêu cầu chưa đầy đủ - cần bổ sung rõ tìm kiếm loại nào, tại màn hình nào và nội dung cần sửa là gì trước khi thực hiện.)*

## 7.7. Rà soát sau khi hoàn thành

Sau khi thực hiện xong toàn bộ các mục trên, phải tự rà soát đối chiếu lại với các tài liệu SRS đã viết để xác nhận giao diện đã thể hiện đầy đủ và đúng đặc tả, gồm:
- `SRS_BTNN_GiaiQuyetBT_QuyetDinh_GQBT.md`
- `SRS_BTNN_GiaiQuyetBT_KinhPhi_BT.md`
- `SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md`

Báo cáo lại các điểm còn thiếu hoặc còn lệch giữa giao diện và tài liệu (nếu có).

---

# 8. Chuẩn hóa giao diện Module Quyết định giải quyết bồi thường theo SRS

**Phạm vi:** File `Website_Quan_tri/quyet_dinh_giai_quyet_boi_thuong.html`. Chuẩn hóa toàn bộ giao diện cho khớp 100% với `SRS_BTNN_GiaiQuyetBT_QuyetDinh_GQBT.md`. Chỉ dựng giao diện và dữ liệu giả lập, không xây dựng logic nghiệp vụ thực.

## 8.1. MH01 - Màn hình Danh sách quyết định

**Khối Bộ lọc tìm kiếm** — chuẩn hóa đúng 10 tiêu chí theo SRS:
- Số quyết định
- Mã vụ việc
- Tên vụ việc
- Loại quyết định (3 giá trị: Quyết định giải quyết bồi thường / Quyết định hủy quyết định giải quyết bồi thường / Quyết định sửa chữa, bổ sung quyết định giải quyết bồi thường)
- Người ký quyết định
- Trạng thái quyết định (Lưu nháp / Chờ ký / Bị từ chối / Đã ban hành / Đã hủy)
- Hình thức ban hành (Ký số trên hệ thống / Ký bên ngoài)
- Đơn vị ban hành
- Ban hành: Từ ngày
- Ban hành: Đến ngày

**Bảng danh sách** — chuẩn hóa đúng 13 cột theo SRS, dùng chung cho cả 02 vai trò:

`STT` · `Số quyết định` · `Ngày ban hành` · `Loại quyết định` · `Người ký` · `Cán bộ xử lý` · `Hình thức ban hành` · `Đơn vị ban hành` · `Trích yếu quyết định` · `Mã vụ việc` · `Tên vụ việc` · `Trạng thái` · `Thao tác`

- Bỏ cột `Ngày hiệu lực` (không có trong SRS).
- Bổ sung cột `Người ký` cho vai trò Lãnh đạo và cột `Cán bộ xử lý` cho vai trò Cán bộ — hiện mỗi vai trò đang thiếu một cột.
- Cột `Mã vụ việc` hiển thị dạng HyperLink, click mở màn Xem chi tiết vụ việc.

## 8.2. Thao tác trên lưới phân theo vai trò giả lập

| Vai trò | Thao tác được hiển thị |
| :--- | :--- |
| **Lãnh đạo** | CHỈ hiển thị `Ký số` và `Từ chối` |
| **Cán bộ** | Hiển thị tất cả thao tác TRỪ `Ký số` và `Từ chối`, gồm: `Cập nhật`, `Xóa`, `Hủy quyết định`, `Sửa chữa, bổ sung` |

Điều kiện hiển thị theo trạng thái, áp dụng chồng lên quy tắc vai trò ở trên:
- `Cập nhật`: Chỉ với trạng thái `Lưu nháp` hoặc `Bị từ chối`
- `Xóa`: Chỉ với trạng thái `Lưu nháp`
- `Ký số`: Chỉ với trạng thái `Chờ ký`
- `Từ chối`: Chỉ với trạng thái `Chờ ký`
- `Hủy quyết định` và `Sửa chữa, bổ sung`: Chỉ với `Loại quyết định` là `Quyết định giải quyết bồi thường`, trạng thái `Đã ban hành`, vụ việc gốc chưa có đề nghị cấp kinh phí bồi thường ở `Hoàn thành`/`Sung quỹ nhà nước` và chưa ở `Đình chỉ giải quyết`

## 8.3. Giả lập POPUP-SIGN-001 khi Lãnh đạo Ký số

Xây dựng popup ký số đúng chuẩn, thay cho việc ký thẳng như hiện tại:
- Tiêu đề: `Ký số điện tử Quyết định`
- Khối thông tin quyết định chỉ đọc: Loại quyết định, Trích yếu, Mã vụ việc, Người yêu cầu bồi thường
- Khối xem tệp dự thảo: hiển thị tên tệp PDF dự thảo kèm nút `Xem tệp dự thảo` để Lãnh đạo mở xem trước khi ký
- Khối chọn chứng thư số: Combobox chọn USB Token/chứng thư số (giả lập 2 giá trị), ô nhập mã PIN
- Nút `Hủy bỏ` và nút `Xác nhận ký số`
- Khi xác nhận: giả lập cấp Số quyết định và Ngày quyết định tự động, chuyển trạng thái sang `Đã ban hành`, hiển thị thông báo thành công, tải lại danh sách

## 8.4. MH03 - Màn hình Xem chi tiết quyết định

- Dữ liệu kế thừa đúng theo bản ghi giả lập được chọn, không hiển thị dữ liệu mặc định cứng.
- Bổ sung 02 trường hiển thị còn thiếu: `Trạng thái vụ việc gốc` (dạng Badge) và `Đề nghị kinh phí liên quan` (danh sách liên kết).
- Thanh thao tác hiển thị đúng 9 chức năng theo SRS, kèm điều kiện:

| Thao tác | Điều kiện hiển thị |
| :--- | :--- |
| Đóng | Luôn hiển thị |
| Xem file / Tải file | Khi có tệp quyết định |
| Ký số | Trạng thái `Chờ ký` + vai trò Lãnh đạo |
| Từ chối | Trạng thái `Chờ ký` + vai trò Lãnh đạo |
| Cập nhật | Trạng thái `Lưu nháp` hoặc `Bị từ chối` + vai trò Cán bộ |
| Xóa | Trạng thái `Lưu nháp` + vai trò Cán bộ. Sau khi xóa thì đóng màn chi tiết, quay về danh sách |
| Hủy quyết định | Theo đúng 4 điều kiện đồng thời tại mục 8.2 + vai trò Cán bộ |
| Sửa chữa, bổ sung | Theo đúng 4 điều kiện đồng thời tại mục 8.2 + vai trò Cán bộ |

## 8.5. MH02 - Màn hình Tạo mới/Trình ký quyết định

Chuẩn hóa đủ các trường theo SRS, đúng tên và đúng thứ tự khối:

- **Khối Thông tin chung hồ sơ**: Mã vụ việc (kèm nút Tìm kiếm, Tìm kiếm nâng cao) · Đơn vị ban hành · Hình thức ban hành · Lãnh đạo ký ban hành · Số quyết định · Ngày quyết định · Tệp quyết định
- **Khối Chi tiết thông tin người yêu cầu bồi thường**: Họ và tên người yêu cầu bồi thường · Tỉnh/Thành phố · Phường/Xã · Địa chỉ chi tiết
- **Khối Bảng nội dung đề xuất cấp kinh phí bồi thường**: bảng 4 cột (STT, Loại thiệt hại được yêu cầu, Mức đề nghị trong hồ sơ gốc, Số tiền duyệt cấp bồi thường) + Tổng số tiền bồi thường + Tổng số tiền bồi thường bằng chữ + Số tiền bồi thường đã tạm ứng + Số tiền bồi thường còn lại sau khi đã tạm ứng
- **Khối Người nhận bồi thường và Phương thức chi trả**: Họ và tên người nhận · Số giấy tờ thân nhân người nhận · Địa chỉ chi tiết người nhận · Phương thức chi trả tiền bồi thường (2 giá trị: Chi trả trực tiếp bằng tiền mặt / Chi trả qua chuyển khoản) · Chủ tài khoản · Số tài khoản · Tên ngân hàng · Chi nhánh ngân hàng
- **Cảnh báo chênh lệch số liệu** và **Lý do điều chỉnh số liệu kinh phí**
- **Bảng Văn bản căn cứ**: STT · Tên văn bản · Ngày văn bản · File đính kèm · Thao tác (Tải lên / Xem file / Xóa)
- Bổ sung trường `Tổng số tiền bồi thường bằng chữ` (hiện chưa có trên giao diện).
- Đổi nhãn cột Thao tác của bảng văn bản căn cứ từ `Xóa dòng` thành `Xóa`.

## 8.6. MH05 - Màn hình Hủy/Sửa chữa, bổ sung quyết định

- Khối `Quyết định gốc` hiển thị 4 dòng riêng, Số quyết định dạng HyperLink mở chi tiết QĐ gốc **trong cùng tab**.
- `Mã vụ việc` dạng HyperLink mở chi tiết vụ việc **trong cùng tab**.
- Khối cảnh báo liên thông kinh phí.
- **Khối Chi tiết nội dung quyết định**: luôn hiển thị với cả 02 loại quyết định, kế thừa đầy đủ từ QĐ gốc.
  + `Quyết định sửa chữa, bổ sung`: cho phép chỉnh sửa, highlight vàng các trường thay đổi
  + `Quyết định hủy`: khóa chỉ xem toàn bộ, không cho chỉnh sửa
- Bỏ nút `Tải Word` và `Tải PDF`.
- Thêm bước cảnh báo xác nhận trước khi `Trình ký` và `Ban hành QĐ` đối với Quyết định hủy, nêu rõ 3 hệ quả: QĐ gốc chuyển `Đã hủy`, Vụ việc gốc chuyển `Đình chỉ giải quyết`, đề nghị kinh phí liên quan bị hủy hoặc chuyển chờ thu hồi.

## 8.7. Giả lập Xem trước Quyết định theo mẫu

Mở tại **tab trình duyệt mới**, trình bày dạng xem trước file PDF khổ A4 (nền trắng, canh lề, font chuẩn văn bản hành chính), nội dung dựng đúng theo bảng ánh xạ tương ứng trong SRS:

| Loại quyết định | Biểu mẫu | Bảng ánh xạ |
| :--- | :--- | :--- |
| Quyết định giải quyết bồi thường | Mẫu 09/BTNN | Bảng 1 |
| Quyết định hủy | Mẫu 11/BTNN | Bảng 2 |
| Quyết định sửa chữa, bổ sung | Mẫu 12/BTNN | Bảng 3 |

Yêu cầu bắt buộc khi dựng bản xem trước:
- Đầy đủ thể thức: Cơ quan chủ quản, Tên cơ quan ban hành, Số và ký hiệu văn bản, Địa danh và ngày tháng năm, Tên loại và trích yếu, Thẩm quyền ban hành, khối Căn cứ, các Điều, Nơi nhận, khối chữ ký.
- **Bảng chi tiết các khoản thiệt hại chỉ in các dòng có số tiền lớn hơn 0**, số thứ tự đánh lại liên tục từ 1.
- Khối thông tin tài khoản chỉ in khi Phương thức chi trả là `Chi trả qua chuyển khoản`.
- Dòng tạm ứng và số tiền còn lại chỉ in khi có phát sinh tạm ứng.
- Khi chưa cấp số, phần Số quyết định hiển thị `..../QĐ-...` theo đúng ký hiệu của loại quyết định.
- Riêng Mẫu 12: in bảng đối chiếu nội dung cũ và nội dung mới, chỉ gồm các trường thực sự thay đổi.
- Có nút `In` trên bản xem trước để người dùng in trực tiếp.

## 8.8. Dữ liệu giả lập

Bảo đảm có đủ bản ghi minh họa cho từng trạng thái để kiểm thử thao tác theo vai trò:
- `Lưu nháp` — để thử `Cập nhật`, `Xóa`
- `Chờ ký` — để thử `Ký số`, `Từ chối` với vai trò Lãnh đạo
- `Bị từ chối` — để thử `Cập nhật` và hiển thị khối Lý do bị từ chối
- `Đã ban hành` — để thử `Hủy quyết định`, `Sửa chữa, bổ sung`
- `Đã hủy` — để kiểm tra ẩn toàn bộ thao tác tác động
- Bản ghi `Đã ban hành` gắn vụ việc đã có đề nghị kinh phí `Hoàn thành` — để kiểm tra việc ẩn nút Hủy/Sửa chữa

## 8.9. Rà soát sau khi hoàn thành

Đối chiếu lại toàn bộ giao diện với `SRS_BTNN_GiaiQuyetBT_QuyetDinh_GQBT.md`, báo cáo các điểm còn lệch nếu có.

### Kết quả thực thi mục 8

| Mục | Nội dung | Trạng thái |
| :--- | :--- | :--- |
| 8.1 | Chuẩn hóa bộ lọc 10 tiêu chí và lưới 13 cột dùng chung cho 02 vai trò, bỏ cột `Ngày hiệu lực` | Đã thực hiện |
| 8.2 | Thao tác trên lưới phân theo vai trò Lãnh đạo/Cán bộ kèm điều kiện trạng thái | Đã thực hiện |
| 8.3 | Popup `Ký số điện tử Quyết định` với khối thông tin, xem tệp dự thảo, chứng thư số, mã PIN | Đã thực hiện |
| 8.4 | Màn Xem chi tiết: kế thừa dữ liệu bản ghi được chọn, bổ sung `Trạng thái vụ việc gốc` và `Đề nghị kinh phí liên quan`, thanh thao tác đúng điều kiện | Đã thực hiện |
| 8.5 | Màn Tạo mới: bổ sung `Tổng số tiền bồi thường bằng chữ`, tự sinh theo Tổng số tiền bồi thường | Đã thực hiện |
| 8.6 | Màn Hủy/Sửa chữa, bổ sung: khối Chi tiết nội dung quyết định luôn hiển thị (QĐ hủy ở dạng chỉ xem), bỏ `Tải Word`/`Tải PDF`, thêm cảnh báo xác nhận trước `Trình ký`/`Ban hành QĐ` cho QĐ hủy | Đã thực hiện |
| 8.7 | Xem trước theo đúng biểu mẫu của từng Loại quyết định, lọc khoản thiệt hại lớn hơn 0, bảng đối chiếu cũ/mới cho Mẫu 12, ký hiệu số quyết định đúng loại | Đã thực hiện |
| 8.8 | Bổ sung bản ghi `Đã hủy` và bản ghi `Đã ban hành` gắn vụ việc đã có đề nghị kinh phí `Hoàn thành` | Đã thực hiện |

**Điểm còn lệch giữa giao diện và tài liệu SRS, cần thống nhất để xử lý tiếp:**

- Tài liệu SRS của Module Quyết định giải quyết bồi thường chưa cập nhật theo cấu trúc khối mới của màn Tạo mới: `Bảng nội dung cấp kinh phí bồi thường`, khối `Người nhận bồi thường và Phương thức chi trả`, tên 03 trường số tiền và `Phương thức chi trả tiền bồi thường` chỉ còn 02 giá trị.
- Trường `Tổng số tiền bồi thường bằng chữ` đã bổ sung trên giao diện nhưng chưa có trong bảng mô tả thông tin của SRS.
- Danh mục thông báo còn 14 mã `MSG-*-BTNN-KP-*` được tham chiếu nhưng chưa định nghĩa.
- Liên kết `#433116-phu-luc-mau-email-he-thong` trong tài liệu Giải quyết yêu cầu bồi thường đang trỏ tới mục không tồn tại.

---

# 9. Xây dựng Module Quản lý nội dung (CMS) thuộc Quản trị hệ thống

**Mục tiêu:** Toàn bộ nội dung hiển thị trên Website khách hàng do Quản trị viên chủ động cấu hình, không phải sửa mã nguồn. Phạm vi phủ đủ 10 mã chức năng `520` – `529` trong tài liệu nghiệm thu.

## 9.1. Hiện trạng khảo sát Website khách hàng

Đã rà soát `HomePage_KH.html`, `ho_tro_khach_hang_main.html`, `chi_tiet_faq.html`, `chi_tiet_van_ban.html`, `dang_nhap_khach_hang.html`, `style.css`. Kết quả:

| Nhóm nội dung | Hiện trạng | Số mục |
| :--- | :--- | :--- |
| Đầu trang: logo, tên cơ quan, khẩu hiệu, đường dây nóng, email | Hard-code | 6 vùng |
| Menu chính | Hard-code | 4 mục + 1 dropdown |
| Menu Liên kết (link ngoài) | Hard-code | 2 link |
| Banner/slider trang chủ | Hard-code, ảnh trỏ host ngoài | 4 slide + 4 khối dự phòng |
| Khối nghiệp vụ trang chủ (Tra cứu/Đăng ký/Hỗ trợ) | Hard-code rich text | 3 khối |
| Thông tin liên hệ, Trung tâm đăng ký | Hard-code, **lặp ở 5 vị trí** | 4 nhóm + 3 trung tâm |
| Văn bản quy phạm pháp luật | Hard-code trong JS, **2 schema lệch nhau** | 10 văn bản, 17 tệp, 3 media |
| Câu hỏi thường gặp (FAQ) | Hard-code trong JS, **2 schema lệch nhau** | 10 câu hỏi |
| Chân trang: 3 cột, bản quyền, thông tin pháp lý | Hard-code | 3 link + 2 đoạn |
| Nhận diện thương hiệu (màu, font) | Biến CSS khai báo lại trong từng file | 5 file |

**Bốn rủi ro phải xử lý trước khi làm CMS:**

1. **Dữ liệu liên hệ bị nhân bản 5 nơi**, địa chỉ trụ sở có 2 phiên bản mâu thuẫn, tên cơ quan chủ quản có 3 biến thể khác nhau. Phải quy về một nguồn dữ liệu duy nhất.
2. **Bộ 10 FAQ và bộ 10 văn bản mỗi bộ tồn tại ở 2 file với schema khác nhau** (bản chi tiết có thêm `answer`, `signer`, `body`). Phải hợp nhất thành một schema đầy đủ.
3. **`style.css` không được nạp bởi 5 file chính**, mỗi file tự khai báo lại khối `:root`. Muốn cấu hình màu/font/logo toàn site thì phải gom về một nguồn CSS dùng chung trước.
4. Ảnh banner đang trỏ sang host ngoài `dktructuyen.moj.gov.vn`. Cần thư viện media nội bộ.

## 9.2. Phương án kiến trúc: tách 2 lớp

Không xây mỗi màn hình quản trị cho một vùng nội dung. Thay vào đó tách thành 2 lớp để mở rộng được về sau:

- **Lớp 1 — Khối nội dung (Content Block):** đơn vị nội dung nhỏ nhất, dùng lại được ở nhiều nơi. Mỗi khối có một `Loại khối` quy định bộ trường nhập liệu.
- **Lớp 2 — Trang nội dung (Content Page) và Vùng hiển thị (Zone):** khai báo trang nào có những vùng nào, mỗi vùng gắn khối nội dung nào, theo thứ tự nào.

Nhờ tách lớp, khối *Thông tin liên hệ* chỉ nhập một lần nhưng hiển thị được đồng thời ở Trang hỗ trợ, Chân trang và Đầu trang — giải quyết đúng vấn đề nhân bản 5 nơi nêu ở mục 9.1.

**Danh mục Loại khối đề xuất:**

| Mã loại | Tên loại khối | Bộ trường chính |
| :--- | :--- | :--- |
| `BANNER` | Biểu ngữ / Slider | Ảnh, Tiêu đề, Tiêu đề phụ, Mô tả, Link đích, Thứ tự, Hiệu lực từ/đến |
| `RICHTEXT` | Khối văn bản | Tiêu đề, Nội dung (trình soạn thảo), Ảnh minh họa |
| `LINKLIST` | Danh sách liên kết | Danh sách: Icon, Nhãn, URL, Mở tab mới, Thứ tự |
| `CONTACT` | Thông tin liên hệ | Tên đơn vị, Địa chỉ, Điện thoại theo bộ phận, Fax, Email |
| `FAQ` | Câu hỏi thường gặp | Lĩnh vực, Tiêu đề, Tóm tắt, Nội dung câu hỏi, Nội dung trả lời |
| `DOCUMENT` | Văn bản quy phạm pháp luật | Số hiệu, Loại VB, Cơ quan ban hành, Ngày ban hành, Ngày hiệu lực, Trạng thái hiệu lực, Lĩnh vực, Người ký, Chức danh, Trích yếu, Toàn văn, Tệp đính kèm, Media hướng dẫn |
| `NOTICE` | Thông báo nổi bật | Nội dung, Kiểu hiển thị, Hiệu lực từ/đến |
| `FILE` | Biểu mẫu tải về | Tên biểu mẫu, Tệp, Dung lượng, Năm cập nhật, Mô tả |

**Danh mục Trang và Vùng hiển thị đề xuất:**

| Trang | Các vùng hiển thị |
| :--- | :--- |
| Dùng chung toàn site | Đầu trang, Menu chính, Menu Liên kết, Chân trang |
| Trang chủ | Slider, Lời chào mừng, Khối nghiệp vụ, Thông báo đường dây nóng |
| Hỗ trợ khách hàng | Thông tin liên hệ, Trung tâm đăng ký, Văn bản QPPL, FAQ, Khối kêu gọi tạo yêu cầu |
| Đăng nhập | Banner cơ quan, Khẩu hiệu, Thẻ phương thức đăng nhập |
| Hướng dẫn thanh toán, thu phí | Nội dung hướng dẫn, Liên hệ thanh toán, Biểu phí |

## 9.3. Quy trình biên tập và duyệt

Bám đúng 3 chức năng `520` Tạo / `521` Biên tập / `522` Duyệt (áp dụng cho khối nội dung) và `523` / `524` / `525` (áp dụng cho trang nội dung):

`Lưu nháp` → `Chờ duyệt` → `Đã xuất bản`, kèm nhánh `Bị từ chối` và `Ngừng xuất bản`.

- Chỉ bản ghi ở trạng thái `Đã xuất bản` mới hiển thị ra Website khách hàng.
- Khi biên tập lại nội dung đang xuất bản, hệ thống tạo **phiên bản nháp mới**, bản đang chạy giữ nguyên cho tới khi phiên bản mới được duyệt.
- Lưu vết phiên bản, cho phép **xem trước** và **khôi phục về phiên bản trước**.
- Hỗ trợ **hẹn giờ xuất bản** qua cặp trường Hiệu lực từ/đến (phục vụ banner theo đợt).

## 9.4. Danh sách màn hình đề xuất

Menu `Quản trị hệ thống → Quản lý nội dung (CMS)` hiện đang trỏ `temp_placeholder.html`. Cây menu quản trị chỉ hỗ trợ 2 cấp, nên gom toàn bộ CMS vào **một màn hình có thanh tab**, mỗi tab là một nghiệp vụ.

| Tab | Màn hình | Mã chức năng phủ |
| :--- | :--- | :--- |
| Khối nội dung | MH01 Danh sách · MH02 Tạo/Biên tập · MH03 Xem chi tiết & Duyệt | 520, 521, 522 |
| Trang nội dung | MH04 Danh sách · MH05 Biên tập bố cục trang · MH06 Xem chi tiết & Duyệt | 523, 524, 525 |
| Thành phần trang tin | MH07 Cấu hình thành phần của trang tin | 526 |
| Biểu ngữ, Đầu trang, Chân trang | MH08 Quản lý Banner/Header/Footer | 527 |
| Thông tin liên kết | MH09 Quản lý danh sách liên kết | 528 |
| Hỗ trợ người dùng | MH10 Quản lý nội dung hỗ trợ (FAQ, Văn bản, Liên hệ, Hướng dẫn) | 529 |
| Thư viện media | MH11 Quản lý ảnh, video, tệp biểu mẫu | phục vụ 520, 523, 527 |

**MH01 — Danh sách khối nội dung.** Bộ lọc: Mã khối, Tên khối, Loại khối, Trang sử dụng, Trạng thái, Người cập nhật, Khoảng ngày cập nhật. Lưới: STT · Mã khối · Tên khối · Loại khối · Vị trí đang hiển thị · Phiên bản · Trạng thái · Người cập nhật · Ngày cập nhật · Thao tác. Thao tác: Xem chi tiết (click dòng) · Cập nhật · Xóa · Trình duyệt · Nhân bản.

**MH02 — Tạo/Biên tập khối nội dung.** Chọn `Loại khối` trước, hệ thống tự đổi bộ trường nhập liệu bên dưới. Có trình soạn thảo rich text cho loại `RICHTEXT`, `FAQ`, `DOCUMENT`; có nút `Đính kèm tệp` (mã 520) và nút `Xem trước` hiển thị đúng như trên Website khách hàng.

**MH03 — Xem chi tiết & Duyệt khối nội dung.** Hiển thị song song *Nội dung đang xuất bản* và *Nội dung chờ duyệt* để người duyệt đối chiếu. Thao tác `Duyệt` / `Từ chối` kèm ý kiến.

**MH05 — Biên tập bố cục trang.** Cột trái là danh sách Vùng hiển thị của trang, cột phải là kho khối nội dung; gắn khối vào vùng, sắp thứ tự, bật/tắt hiển thị. Có `Xem trước toàn trang`.

**MH07 — Cấu hình thành phần của trang tin.** Bật/tắt và đặt thứ tự các thành phần: Slider, Lời chào, Khối nghiệp vụ, Thông báo, Menu, Chân trang. Kèm cấu hình nhận diện: Logo, Màu chủ đạo, Font, Cỡ chữ.

**MH10 — Quản lý nội dung hỗ trợ người dùng.** Gom 4 nhóm con: `Câu hỏi thường gặp` · `Văn bản quy phạm pháp luật` · `Thông tin liên hệ và Trung tâm đăng ký` · `Hướng dẫn thanh toán, thu phí, sử dụng CSDL`. Mỗi nhóm là một lưới theo mẫu MH01.

## 9.5. Thứ tự triển khai đề xuất

1. Dựng khung màn hình CMS với 7 tab, thay `temp_placeholder.html` trong menu Quản trị hệ thống.
2. Làm trước tab **Hỗ trợ người dùng** (mã 529) vì đây là nhóm nội dung nhiều nhất và đang bị nhân bản nặng nhất.
3. Làm tab **Biểu ngữ, Đầu trang, Chân trang** (mã 527) và **Thông tin liên kết** (mã 528).
4. Làm tab **Khối nội dung** và **Trang nội dung** kèm quy trình duyệt (mã 520 – 525).
5. Làm tab **Thành phần trang tin** (mã 526) và **Thư viện media**.
6. Sau cùng mới đấu nối Website khách hàng đọc dữ liệu từ CMS.

## 9.6. Các quyết định đã chốt

| # | Nội dung | Quyết định |
| :--- | :--- | :--- |
| 1 | Phạm vi lần này | **Chỉ dựng giao diện quản trị và dữ liệu giả lập.** Chưa đấu nối Website khách hàng đọc dữ liệu động từ CMS. |
| 2 | Quy trình duyệt | **Có bước `Chờ duyệt`, tách riêng người biên tập và người duyệt.** Việc gán quyền Biên tập / Duyệt thực hiện tại Module Quản lý vai trò, không làm trong CMS. |
| 3 | Đa ngôn ngữ | **Có.** Mọi trường nội dung hiển thị ra Website khách hàng phải nhập được cả **Tiếng Việt** và **Tiếng Anh**. |
| 4 | Dữ liệu trùng lặp | **Hợp nhất.** Thông tin liên hệ quy về một khối dùng chung; hợp nhất 2 schema FAQ và 2 schema Văn bản thành một schema đầy đủ. |
| 5 | Menu chính và Sidebar nghiệp vụ | **Không cấu hình động** — hiển thị theo phân quyền. Nhưng **cho phép cấu hình bật/tắt hiển thị** từng thành phần như `Hỗ trợ khách hàng`, `Liên kết`. |
| 6 | Cấu hình nhận diện (logo, màu, font) | **Không làm trong lần này.** Do đó chưa cần gom `:root` của 5 file về một nguồn CSS dùng chung. |

## 9.7. Điều chỉnh phương án theo các quyết định trên

**Đa ngôn ngữ (theo quyết định 3).** Mỗi màn hình biên tập bố trí **tab `Tiếng Việt` / `Tiếng Anh`** ngay trong khối nhập liệu. Các trường mang nội dung hiển thị (Tiêu đề, Mô tả, Nội dung, Nhãn liên kết, Trích yếu, Câu hỏi, Câu trả lời) tách thành 2 bản. Các trường mang tính dữ liệu (Số hiệu văn bản, Ngày ban hành, Điện thoại, Email, URL, Thứ tự) chỉ nhập một lần, dùng chung cho cả 2 ngôn ngữ. Lưới danh sách bổ sung cột `Ngôn ngữ đã nhập` dạng badge `VI` / `EN` để biết bản ghi nào còn thiếu bản dịch.

**Phân vai biên tập và duyệt (theo quyết định 2).** Màn hình CMS có ô **giả lập vai trò** gồm `Cán bộ biên tập` và `Cán bộ duyệt nội dung`, tương tự cách đã làm ở Module Quyết định giải quyết bồi thường:

| Vai trò | Thao tác được hiển thị |
| :--- | :--- |
| Cán bộ biên tập | `Thêm mới`, `Cập nhật`, `Xóa`, `Trình duyệt`, `Nhân bản`, `Xem trước` |
| Cán bộ duyệt nội dung | `Duyệt`, `Từ chối`, `Ngừng xuất bản`, `Xem trước` |

Thao tác không thỏa điều kiện thì **ẩn hoàn toàn**, không hiển thị dạng mờ.

**Bỏ cấu hình nhận diện (theo quyết định 6).** MH07 thu hẹp lại, chỉ còn bật/tắt và sắp thứ tự các thành phần của trang tin, bỏ phần Logo / Màu chủ đạo / Font / Cỡ chữ.

**Cấu hình ẩn hiện thành phần (theo quyết định 5).** MH07 quản lý bảng thành phần với các trường: `Tên thành phần` · `Trang áp dụng` · `Hiển thị` (bật/tắt) · `Thứ tự` · `Ghi chú`. Danh sách thành phần giả lập:

- Trang chủ: `Slider biểu ngữ`, `Lời chào mừng`, `Khối nghiệp vụ Tra cứu`, `Khối nghiệp vụ Đăng ký`, `Khối nghiệp vụ Hỗ trợ`, `Thông báo đường dây nóng`
- Dùng chung: `Menu Hỗ trợ khách hàng`, `Menu Liên kết`, `Thanh đường dây nóng đầu trang`, `Chuyển ngôn ngữ`, `Chân trang - Liên kết hữu ích`, `Chân trang - Thông tin pháp lý`

**Loại khối `MENU` bị loại bỏ** khỏi danh mục Loại khối tại mục 9.2, vì menu chính và sidebar không cấu hình động. Danh mục còn lại 8 loại khối.

## 9.8. Kết quả thực thi

| Hạng mục | Trạng thái |
| :--- | :--- |
| Dựng màn hình `Website_Quan_tri/quan_ly_noi_dung_cms.html` với 7 tab nghiệp vụ | Đã thực hiện |
| Thay `temp_placeholder.html` tại menu `Quản trị hệ thống → Quản lý nội dung (CMS)` | Đã thực hiện |
| Giả lập 2 vai trò Cán bộ biên tập / Cán bộ duyệt nội dung, thao tác không thỏa điều kiện thì ẩn hoàn toàn | Đã thực hiện |
| Quy trình `Lưu nháp → Chờ duyệt → Đã xuất bản`, kèm `Bị từ chối` và `Ngừng xuất bản` | Đã thực hiện |
| Popup Duyệt nội dung đối chiếu song song bản đang xuất bản và bản chờ duyệt | Đã thực hiện |
| Nhập song ngữ Tiếng Việt / Tiếng Anh, lưới hiển thị badge `VI` / `EN` để biết bản ghi còn thiếu bản dịch | Đã thực hiện |
| Hợp nhất dữ liệu trùng lặp: thông tin liên hệ, FAQ, Văn bản QPPL quy về một schema chung | Đã thực hiện |
| Cấu hình bật/tắt hiển thị 12 thành phần trang tin, gồm `Menu Hỗ trợ khách hàng` và `Menu Liên kết` | Đã thực hiện |
| Xem trước nội dung và xem trước bố cục trang, mở tại tab trình duyệt mới | Đã thực hiện |
| Dữ liệu giả lập: 13 khối nội dung đủ 5 trạng thái, 4 trang, 12 thành phần, 3 liên kết, 6 tệp media | Đã thực hiện |

**Ghi chú phạm vi:** Đúng theo quyết định tại mục 9.6, lần này **chưa đấu nối Website khách hàng đọc dữ liệu động từ CMS** và **chưa làm cấu hình nhận diện** (logo, màu, font). Website khách hàng vẫn hiển thị nội dung tĩnh như hiện trạng.
