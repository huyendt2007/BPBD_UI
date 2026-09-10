## 4.1. Quản lý yêu cầu đã đăng ký - Website Khách hàng

### 4.1.1. Quản lý yêu cầu cung cấp thông tin đã đăng ký

#### 4.1.1.1. Mục đích

- Cho phép Khách hàng tra cứu, theo dõi trạng thái, xem chi tiết, thanh toán phí và xem/tải kết quả đối với các hồ sơ Yêu cầu cung cấp thông tin đã gửi trên Website Khách hàng.

*a. Phân quyền*

- Khách hàng cá nhân, tổ chức đã đăng nhập hệ thống và có quyền quản lý hồ sơ thuộc phạm vi tài khoản.

*b. Điều kiện thực hiện*

- Hồ sơ Yêu cầu cung cấp thông tin đã được tạo thành công trên hệ thống.
- Hồ sơ thuộc phạm vi tài khoản đang đăng nhập hoặc phạm vi được phân quyền.

---

#### 4.1.1.2. MH01 - Tab Yêu cầu cung cấp thông tin

##### 4.1.1.2.1. Màn hình

![Danh sách yêu cầu cung cấp thông tin](images/UC195_CCTT_MH01_Danh_sach_yeu_cau_cung_cap_thong_tin.png)

##### 4.1.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Vùng nhập điều kiện tìm kiếm danh sách hồ sơ. |
| Mã hồ sơ | String(50) | Không | Trống | Tìm kiếm chính xác hoặc gần đúng theo Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Tiêu chí yêu cầu | Enum(String(50)) | Không | Tất cả | Gồm:<br>+ Tất cả<br>+ Số đăng ký<br>+ Bên bảo đảm<br>+ Số khung |
| Trạng thái hồ sơ | Enum(String(50)) | Không | Tất cả | Gồm:<br>+ Tất cả<br>+ Chờ thanh toán<br>+ Chờ duyệt<br>+ Chờ ký<br>+ Hoàn thành<br>+ Bị từ chối<br>+ Bị trả lại |
| Người tạo | String(255) | Không | Trống | Tìm kiếm gần đúng theo tên người đang đăng nhập đã tạo Phiếu yêu cầu cung cấp thông tin. |
| Từ ngày | Date | Không | Trống | Lọc theo `Thời điểm đăng ký`. Nếu nhập cùng `Đến ngày`, áp dụng [BR-VAL-007]. |
| Đến ngày | Date | Không | Trống | Lọc theo `Thời điểm đăng ký`. Nếu nhập cùng `Từ ngày`, áp dụng [BR-VAL-007]. |
| Nút Tìm kiếm | Button | - | - | Thực hiện tìm kiếm theo bộ lọc đã nhập. |
| Nút Xóa bộ lọc | Button | - | - | Xóa toàn bộ tiêu chí lọc, đưa `Trạng thái hồ sơ` và `Tiêu chí yêu cầu` về `Tất cả`, các ô nhập liệu về trống. |
| **II. Bảng danh sách hồ sơ** | - | - | 20 bản ghi/trang | Control UI: Grid phẳng.<br>- Sắp xếp mặc định theo `Thời điểm đăng ký` giảm dần.<br>- Click trực tiếp vào dòng dữ liệu để mở màn hình chi tiết, ngoại trừ khi click nút tại cột Thao tác.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer | - | Tự tăng | Số thứ tự bản ghi trên trang hiện tại. |
| Mã hồ sơ | String(50) | - | Theo hồ sơ | Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Tiêu chí yêu cầu | Enum(String(50)) | - | Theo hồ sơ | Một trong các giá trị: `Số đăng ký`, `Bên bảo đảm`, `Số khung`. |
| Dữ liệu đã nhập | Text(1000) | - | Theo hồ sơ | Hiển thị tóm tắt dữ liệu tra cứu đã gửi theo tiêu chí. |
| Thời điểm đăng ký | Datetime | - | Theo hồ sơ | Ngày giờ Khách hàng gửi hồ sơ, định dạng `dd/mm/yyyy HH:mm`. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | Không | Theo hồ sơ | - Tiêu đề cột ghi rõ đơn vị tính `(VNĐ)`.<br>- Dữ liệu từng dòng chỉ hiển thị số đã phân tách hàng nghìn, không lặp lại hậu tố `VNĐ`.<br>- Hiển thị tổng số tiền Khách hàng đã thanh toán thành công cho hồ sơ.<br>- Hồ sơ đã chuyển sang trạng thái "Chờ duyệt" trở về sau (Chờ duyệt, Chờ ký, Hoàn thành) đồng nghĩa đã thanh toán xong (nếu thuộc diện phải thu phí) nên luôn có giá trị.<br>- Chỉ hiển thị `"—"` khi hồ sơ đang ở trạng thái "Chờ thanh toán" hoặc thuộc diện miễn phí. |
| Trạng thái | Enum(String(50)) | - | Theo hồ sơ | Hiển thị trạng thái hiện tại của hồ sơ. |
| Người tạo | String(255) | - | Theo hồ sơ | Hiển thị tên người đang đăng nhập đã tạo Phiếu yêu cầu cung cấp thông tin; không hiển thị account/email đăng nhập. |
| Thao tác | - | - | Theo trạng thái | Control UI: Nhóm nút/icon thao tác.<br>- Thanh toán: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`.<br>- Xem file/Tải file: Chỉ hiển thị khi hồ sơ ở trạng thái `Hoàn thành` và có file PDF kết quả đã ký.<br>- In biên lai: Chỉ hiển thị khi hồ sơ đã thanh toán trực tuyến thành công và có biên lai điện tử. |

##### 4.1.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới:<br>- **TH1 (Khoảng ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thuộc tài khoản Khách hàng thỏa mãn tiêu chí tìm kiếm/lọc, đưa về Trang 1, sắp xếp theo `Thời điểm đăng ký` giảm dần.<br>- **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled). |
| 2 | Xóa bộ lọc | Button | Xóa toàn bộ tiêu chí lọc và tải lại danh sách mặc định theo `Thời điểm đăng ký` giảm dần. |
| 3 | Row Click | Row | Mở màn hình chi tiết hồ sơ Yêu cầu cung cấp thông tin tương ứng. |
| 4 | Thanh toán | Button | Khi người dùng click nút:<br>- Hệ thống kiểm tra trạng thái hồ sơ. Nếu trạng thái hồ sơ đã thay đổi hoặc đã được thanh toán, hiển thị thông báo lỗi [MSG-ERR-DK-005] và tải lại danh sách.<br>- Nếu hợp lệ, hệ thống đóng gói thông tin thanh toán (Mã hồ sơ, Số tiền phải thu, Mã đơn vị thụ hưởng, Return URL) và điều hướng sang phân hệ [Thanh toán trực tuyến](SRS_Thanh%20toan%20truc%20tuyen.md).<br>- Sau khi thanh toán thành công, hệ thống tiếp nhận kết quả phản hồi, cập nhật trạng thái hồ sơ sang `Chờ duyệt` và làm mới danh sách. |
| 5 | Xem file | Link/Button | Cho phép mở file tại tab/trình xem riêng. |
| 6 | Tải file | Link/Button | Tải file PDF kết quả xuống thiết bị của Khách hàng. |
| 7 | In biên lai | Button | Mở/in biên lai điện tử của giao dịch thanh toán. |

---

#### 4.1.1.3. MH02 - Màn hình Chi tiết yêu cầu cung cấp thông tin

##### 4.1.1.3.1. Màn hình

![Chi tiết yêu cầu cung cấp thông tin](images/UC195_CCTT_MH02_Chi_tiet_yeu_cau_cung_cap_thong_tin.png)

##### 4.1.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| **I. Thông tin hồ sơ** | - | - | - | Khối thông tin chung của hồ sơ. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Hiển thị/Read-only. |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Badge trạng thái. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Thời điểm Khách hàng gửi hồ sơ. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Website Khách hàng | Hiển thị nguồn tạo hồ sơ. |
| **II. Thông tin yêu cầu cung cấp thông tin** | - | - | - | Dữ liệu yêu cầu do Khách hàng đã gửi. |
| Tiêu chí yêu cầu | Enum(String(50)) | Có | Theo hồ sơ | `Số đăng ký`, `Bên bảo đảm` hoặc `Số khung`. |
| Dữ liệu đã nhập | Text(1000) | Có | Theo hồ sơ | Hiển thị dữ liệu tra cứu đã gửi theo tiêu chí. |
| Thời điểm tra cứu | Datetime | Không | Theo hồ sơ | Chỉ hiển thị khi Cán bộ đã thực hiện tra cứu. |
| **III. Thông tin xử lý** | - | - | Theo trạng thái | Hiển thị động theo trạng thái hồ sơ. |
| Lý do từ chối | Text(2000) | Có nếu Bị từ chối | Theo hồ sơ | Chỉ hiển thị khi hồ sơ ở trạng thái `Bị từ chối`. |
| Thời điểm trình ký | Datetime | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ đã được trình Lãnh đạo ký. |
| Thời điểm ký | Datetime | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ đã được Lãnh đạo ký số. |
| Người ký/Đơn vị ký | String(255) | Không | Theo hồ sơ | Hiển thị trong phạm vi thông tin được công khai cho Khách hàng. |
| **IV. Thông tin thanh toán** | - | - | Theo hồ sơ | Chỉ hiển thị khi hồ sơ có phát sinh nghĩa vụ phí hoặc đã có giao dịch thanh toán. |
| Trạng thái thanh toán | Enum(String(50)) | Không | Theo hồ sơ | Control UI: Badge trạng thái.<br>Gồm:<br>+ Chưa thanh toán<br>+ Đã thanh toán<br>+ Miễn phí |
| Số tiền phải thanh toán | Decimal(18,0) | Không | Theo hồ sơ | Lấy theo biểu phí cung cấp thông tin đang có hiệu lực tại thời điểm phát sinh nghĩa vụ thanh toán. |
| Mã giao dịch thanh toán | String(100) | Không | Theo cổng thanh toán | Chỉ hiển thị sau khi phát sinh giao dịch thanh toán. |
| Số biên lai | String(100) | Không | Theo hệ thống tài chính | Chỉ hiển thị nếu hệ thống phát hành biên lai điện tử. |
| Thời điểm thanh toán | Datetime | Không | Theo cổng thanh toán | Chỉ hiển thị khi thanh toán thành công. |
| **V. Kết quả cung cấp thông tin** | - | - | Theo hồ sơ | **Chỉ hiển thị toàn bộ khối này nếu Hồ sơ ở trạng thái "Hoàn thành".** |
| File PDF kết quả đã ký | File/Link | Có nếu Hoàn thành | Theo hồ sơ | Cho phép xem/tải file PDF kết quả cung cấp thông tin đã được Lãnh đạo ký số. |
| Nội dung kết quả cung cấp thông tin | Text/Grid | Không | Theo hồ sơ | Hiển thị nội dung kết quả được phê duyệt. Bao gồm tiêu đề phân khu `"Kết quả tra cứu hồ sơ liên quan"` và nhãn/badge hiển thị **Tổng số hồ sơ tra cứu được** (ví dụ: `Tổng số hồ sơ tra cứu được: 03 hồ sơ`). |
| Danh sách hồ sơ liên quan | Grid/Khối thông tin | Không | Theo kết quả tra cứu | Hiển thị danh sách các bản ghi liên quan từ kết quả thực hiện chức năng Cung cấp thông tin (chi tiết hiển thị như thế nào đã được mô tả khi thực hiện chức năng Cung cấp thông tin rồi). Dữ liệu chỉ đọc, không cho phép chỉnh sửa. |

##### 4.1.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Quay lại | Button | Bố trí tại Header góc trên bên phải màn hình. Khi click: Quay lại tab `Yêu cầu cung cấp thông tin`, giữ nguyên bộ lọc và trang hiện tại. |
| 2 | Thanh toán | Button | Bố trí tại Header góc trên bên phải màn hình (chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`). Khi người dùng click nút:<br>- Hệ thống kiểm tra trạng thái hồ sơ. Nếu trạng thái hồ sơ đã thay đổi hoặc đã được thanh toán, hiển thị thông báo lỗi [MSG-ERR-DK-005] và tải lại màn hình chi tiết.<br>- Nếu hợp lệ, hệ thống đóng gói thông tin thanh toán (Mã hồ sơ, Số tiền phải thu, Mã đơn vị thụ hưởng, Return URL) và điều hướng sang phân hệ [Thanh toán trực tuyến](SRS_Thanh%20toan%20truc%20tuyen.md).<br>- Sau khi thanh toán thành công, hệ thống tiếp nhận kết quả phản hồi, cập nhật trạng thái hồ sơ sang `Chờ duyệt`, làm mới dữ liệu màn hình chi tiết và mở khóa các khối thông tin tương ứng. |
| 3 | Xem file | Link/Button | Bố trí tại Header góc trên bên phải màn hình và cạnh trường file đính kèm. Mở file PDF kết quả đã ký tại tab/trình xem riêng. |
| 4 | Tải file | Link/Button | Bố trí tại Header góc trên bên phải màn hình và cạnh trường file đính kèm. Tải file PDF kết quả đã ký xuống thiết bị của Khách hàng. |
| 5 | Xem/In biên lai | Link/Button | Bố trí tại Header góc trên bên phải màn hình (hiển thị khi hồ sơ đã thanh toán thành công). Mở/in biên lai điện tử của giao dịch thanh toán. |
