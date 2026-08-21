# UCPS008 - Quản lý đối soát thanh toán

## 1. Tổng quan

### 1.1. Mục đích

Tài liệu này đặc tả chức năng **Quản lý đối soát thanh toán** trên Website quản trị, dùng để theo dõi và xử lý các sai lệch thanh toán trực tuyến, giao dịch chưa xác định và yêu cầu hoàn tiền phát sinh từ hồ sơ Online đã thanh toán nhưng bị từ chối.

### 1.2. Phạm vi

Phạm vi bắt đầu khi hệ thống ghi nhận một trong các sự kiện:

- UCPS009 phát hiện sai lệch thanh toán lệch thiếu, lệch thừa hoặc giao dịch không xác định.
- Hồ sơ Online đã thanh toán bị Cán bộ hoặc Lãnh đạo từ chối, hệ thống tạo yêu cầu hoàn tiền.
- Cổng thanh toán trả kết quả hoàn tiền thành công, thất bại hoặc cần xử lý thủ công.

Phạm vi kết thúc khi bản ghi đối soát/hoàn tiền được xử lý xong, có kết quả cuối cùng và ghi lịch sử đầy đủ.

## 2. Nguyên tắc nghiệp vụ

1. Mỗi giao dịch thanh toán thành công chỉ được liên kết với một hồ sơ nghiệp vụ gốc.
2. Mỗi hồ sơ/giao dịch gốc chỉ được có một yêu cầu hoàn tiền đang mở tại một thời điểm.
3. Hoàn tiền Online phải đối chiếu được giao dịch thanh toán gốc, mã hồ sơ, số tiền đã thu và lý do hoàn tiền.
4. Hệ thống không tự ý hoàn tiền nếu dữ liệu giao dịch gốc không đủ điều kiện; bản ghi chuyển sang trạng thái "Cần xử lý thủ công".
5. Mọi thao tác xử lý sai lệch, gán giao dịch, gửi yêu cầu hoàn tiền, xác nhận hoàn tiền và đóng bản ghi phải ghi lịch sử đối soát.

## 3. Danh sách màn hình

| Mã màn hình | Tên màn hình | Mục đích |
| :--- | :--- | :--- |
| UCPS008.MH01 | Danh sách đối soát thanh toán | Tra cứu, lọc và xử lý các bản ghi đối soát thanh toán |
| UCPS008.MH02 | Chi tiết bản ghi đối soát | Xem thông tin giao dịch, hồ sơ liên quan, lịch sử xử lý và chứng từ |
| UCPS008.MH03 | Xử lý hoàn tiền | Gửi lại yêu cầu hoàn tiền, cập nhật kết quả hoặc chuyển xử lý thủ công |

## 4. UCPS008.MH01 - Danh sách đối soát thanh toán

### 4.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tab xử lý | Enum(String(50)) | Có | Sai lệch thanh toán | Gồm: Sai lệch thanh toán; Giao dịch chưa xác định; Hoàn tiền. |
| Mã hồ sơ | String(50) | Không | Trống | Tìm kiếm theo mã hồ sơ nghiệp vụ liên quan. |
| Mã giao dịch | String(100) | Không | Trống | Tìm kiếm theo mã giao dịch hệ thống hoặc mã giao dịch tại Cổng thanh toán. |
| Loại nghiệp vụ | Enum(String(100)) | Không | Tất cả | Lọc theo Phiếu đăng ký, Yêu cầu cung cấp thông tin, Yêu cầu cung cấp bản sao hoặc nghiệp vụ thanh toán khác. |
| Loại đối soát | Enum(String(50)) | Không | Tất cả | Gồm: Lệch thiếu; Lệch thừa; Nghi vấn; Giao dịch chưa xác định; Hoàn tiền. |
| Trạng thái xử lý | Enum(String(50)) | Không | Tất cả | Gồm: Chờ xử lý; Đang xử lý; Đã xử lý; Chờ gửi yêu cầu hoàn tiền; Đã gửi yêu cầu hoàn tiền; Hoàn tiền thành công; Hoàn tiền thất bại; Cần xử lý thủ công. |
| Từ ngày | Date | Không | Trống | Lọc theo ngày phát sinh bản ghi đối soát. |
| Đến ngày | Date | Không | Trống | Lọc theo ngày phát sinh bản ghi đối soát. |
| Bảng kết quả | Table | Không | 20 bản ghi/trang | Hiển thị danh sách bản ghi đối soát thuộc phạm vi quyền dữ liệu.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| STT | Integer | Không | Tự tăng | Số thứ tự bản ghi trên trang hiện tại. |
| Mã hồ sơ | String(50) | Có | Theo dữ liệu | Link mở chi tiết hồ sơ nghiệp vụ liên quan nếu đã xác định được hồ sơ. |
| Mã giao dịch | String(100) | Có | Theo dữ liệu | Mã giao dịch thanh toán/hoàn tiền. |
| Loại đối soát | Enum(String(50)) | Có | Theo dữ liệu | Lệch thiếu, lệch thừa, nghi vấn, giao dịch chưa xác định hoặc hoàn tiền. |
| Số tiền phải thu | Decimal(18,0) | Không | Theo hồ sơ | Số tiền hệ thống ghi nhận phải thu. |
| Số tiền thực thu | Decimal(18,0) | Không | Theo Cổng thanh toán | Số tiền Cổng thanh toán xác nhận thu thành công. |
| Số tiền hoàn | Decimal(18,0) | Không | Theo yêu cầu hoàn tiền | Hiển thị với tab Hoàn tiền. |
| Trạng thái xử lý | Enum(String(50)) | Có | Theo dữ liệu | Trạng thái hiện tại của bản ghi đối soát/hoàn tiền. |
| Ngày phát sinh | Datetime | Có | Theo dữ liệu | Thời điểm hệ thống tạo bản ghi đối soát/hoàn tiền. |
| Thao tác | String(255) | Không | Theo trạng thái | Hiển thị Xem chi tiết, Xử lý, Gửi lại yêu cầu hoàn tiền hoặc Đóng xử lý theo trạng thái bản ghi. |

### 4.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tìm kiếm bản ghi theo bộ lọc. Nếu không có dữ liệu, hiển thị trạng thái rỗng theo chuẩn danh sách.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Nút | Xóa toàn bộ tiêu chí lọc và tải lại danh sách mặc định. |
| 3 | Xem chi tiết | Link/Nút | Mở UCPS008.MH02 để xem thông tin giao dịch, hồ sơ liên quan và lịch sử xử lý. |
| 4 | Xử lý | Nút | Cho phép Cán bộ kế toán/Admin cập nhật hướng xử lý với bản ghi sai lệch hoặc giao dịch chưa xác định. |
| 5 | Gửi lại yêu cầu hoàn tiền | Nút | Chỉ khả dụng với yêu cầu hoàn tiền ở trạng thái "Hoàn tiền thất bại" hoặc "Cần xử lý thủ công" và còn đủ điều kiện gửi lại sang Cổng thanh toán. |

## 5. UCPS008.MH03 - Xử lý hoàn tiền

### 5.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã yêu cầu hoàn tiền | String(50) | Có | Theo hệ thống | Chỉ đọc. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc, link mở hồ sơ nghiệp vụ liên quan. |
| Mã giao dịch thanh toán gốc | String(100) | Có | Theo giao dịch gốc | Chỉ đọc. |
| Số tiền đã thu | Decimal(18,0) | Có | Theo giao dịch gốc | Chỉ đọc. |
| Số tiền đề nghị hoàn | Decimal(18,0) | Có | Theo yêu cầu | Chỉ đọc hoặc cho phép điều chỉnh theo quyền xử lý thủ công. |
| Lý do hoàn tiền | Text(1000) | Có | Theo hồ sơ bị từ chối | Chỉ đọc nếu phát sinh tự động từ hồ sơ bị từ chối. |
| Trạng thái hoàn tiền | Enum(String(50)) | Có | Theo dữ liệu | Chờ gửi yêu cầu hoàn tiền, Đã gửi yêu cầu hoàn tiền, Hoàn tiền thành công, Hoàn tiền thất bại, Cần xử lý thủ công. |
| Lịch sử hoàn tiền | Text(4000) | Không | Theo dữ liệu | Hiển thị các lần gửi yêu cầu, phản hồi từ Cổng thanh toán, lỗi và người xử lý thủ công. |

### 5.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Gửi yêu cầu hoàn tiền | Nút | Gửi yêu cầu hoàn tiền sang Cổng thanh toán nếu bản ghi đủ điều kiện và chưa có yêu cầu hoàn tiền đang mở khác cho cùng giao dịch gốc. |
| 2 | Cập nhật xử lý thủ công | Nút | Cho phép ghi nhận kết quả xử lý hoàn tiền ngoài hệ thống kèm chứng từ và ghi lịch sử. |
| 3 | Đóng xử lý | Nút | Chỉ cho phép đóng khi yêu cầu hoàn tiền đã có kết quả cuối cùng hoặc đã có ghi nhận xử lý thủ công hợp lệ. |
