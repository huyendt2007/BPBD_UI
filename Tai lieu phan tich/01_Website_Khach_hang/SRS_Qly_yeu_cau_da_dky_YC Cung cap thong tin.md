## 4.1. Quản lý yêu cầu đã đăng ký - Yêu cầu cung cấp thông tin - Website Khách hàng

### 4.1.X. UC195-CCTT - Quản lý yêu cầu cung cấp thông tin đã đăng ký

#### 4.1.X.1. Mục đích

- Cho phép Khách hàng tra cứu, xem chi tiết, thanh toán và nhận kết quả đối với các hồ sơ Yêu cầu cung cấp thông tin đã gửi.
- Tài liệu này chỉ mô tả phần quản lý yêu cầu đã đăng ký, gồm:
  - Danh sách yêu cầu cung cấp thông tin.
  - Xem chi tiết yêu cầu cung cấp thông tin.
  - Thanh toán hồ sơ yêu cầu cung cấp thông tin.
  - Xem/tải file kết quả, xem/in biên lai nếu có.
- Tài liệu này không mô tả phần Lập yêu cầu cung cấp thông tin. Phần lập yêu cầu được mô tả tại [SRS yêu cầu cung cấp thông tin.md](SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md).

*a. Phân quyền*

- Khách hàng cá nhân đã đăng nhập.
- Khách hàng tổ chức/tài khoản phụ trực thuộc tổ chức đã đăng nhập và có quyền xem/quản lý hồ sơ.

*b. Điều kiện thực hiện*

- Hồ sơ Yêu cầu cung cấp thông tin đã được tạo trên hệ thống.
- Hồ sơ thuộc phạm vi tài khoản đang đăng nhập hoặc phạm vi được phân quyền.
- Hệ thống có cấu hình biểu phí cung cấp thông tin còn hiệu lực đối với hồ sơ phát sinh nghĩa vụ thanh toán.

---

#### 4.1.X.2. Bộ trạng thái hồ sơ Yêu cầu cung cấp thông tin

| STT | Trạng thái | Điều kiện chuyển vào trạng thái | Thao tác Khách hàng được phép |
| :-- | :-- | :-- | :-- |
| 1 | Chờ thanh toán | Khách hàng gửi hồ sơ hợp lệ và hồ sơ thuộc diện phải thu phí. | Xem chi tiết, Thanh toán. |
| 2 | Chờ duyệt | Hồ sơ đã thanh toán thành công hoặc thuộc diện miễn phí, đang chờ Cán bộ kiểm tra/xử lý. | Xem chi tiết, theo dõi trạng thái. |
| 3 | Chờ ký | Cán bộ đã tra cứu, kết xuất file PDF dự thảo và trình Lãnh đạo ký. | Xem chi tiết, theo dõi trạng thái. |
| 4 | Hoàn thành | Lãnh đạo ký số file PDF kết quả cung cấp thông tin thành công. | Xem chi tiết, xem/tải file kết quả đã ký, xem/in biên lai nếu có. |
| 5 | Bị từ chối | Cán bộ hoặc Lãnh đạo từ chối hồ sơ theo điều kiện nghiệp vụ. | Xem chi tiết và lý do từ chối. |
| 6 | Bị trả lại | Lãnh đạo trả lại hồ sơ từ bước Chờ ký để Cán bộ xử lý lại. | Xem chi tiết, theo dõi trạng thái. |

Ghi chú:

- Không dùng trạng thái `Bị từ chối` để thể hiện trường hợp tra cứu không có dữ liệu còn hiệu lực. Trường hợp không có dữ liệu còn hiệu lực vẫn được xử lý trong file PDF kết quả đã ký khi hồ sơ `Hoàn thành`.
- Các trạng thái thanh toán không thành công, đang xử lý, bị hủy hoặc hết hạn không làm thay đổi trạng thái hồ sơ; hồ sơ tiếp tục ở trạng thái `Chờ thanh toán`.

---

#### 4.1.X.3. UC195-CCTT.MH01 - Tab Yêu cầu cung cấp thông tin

##### 4.1.X.3.1. Màn hình

- Mở khi NSD chọn tab `Yêu cầu cung cấp thông tin` tại [SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md).
- Hiển thị danh sách hồ sơ Yêu cầu cung cấp thông tin thuộc phạm vi tài khoản đang đăng nhập.
- Dữ liệu sắp xếp mặc định theo `Thời điểm đăng ký` giảm dần.
- Link ảnh màn hình: [UC195-CCTT.MH01 - Danh sách yêu cầu cung cấp thông tin](images/UC195_CCTT_MH01_Danh_sach_yeu_cau_cung_cap_thong_tin.png).

##### 4.1.X.3.2. Mô tả thông tin trên màn hình

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
| **II. Bảng danh sách hồ sơ** | - | - | 20 bản ghi/trang | Control UI: Grid phẳng.<br>- Click trực tiếp vào dòng dữ liệu để mở màn hình chi tiết, ngoại trừ khi click nút tại cột Thao tác.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| STT | Integer | - | Tự tăng | Số thứ tự bản ghi trên trang hiện tại. |
| Mã hồ sơ | String(50) | - | Theo hồ sơ | Mã hồ sơ Yêu cầu cung cấp thông tin. |
| Tiêu chí yêu cầu | Enum(String(50)) | - | Theo hồ sơ | Một trong các giá trị: `Số đăng ký`, `Bên bảo đảm`, `Số khung`. |
| Dữ liệu đã nhập | Text(1000) | - | Theo hồ sơ | Hiển thị tóm tắt dữ liệu tra cứu đã gửi theo tiêu chí. |
| Thời điểm đăng ký | Datetime | - | Theo hồ sơ | Ngày giờ Khách hàng gửi hồ sơ, định dạng `dd/mm/yyyy HH:mm`. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | Không | Theo hồ sơ | Tiêu đề cột ghi rõ đơn vị tính `(VNĐ)`, dữ liệu từng dòng chỉ hiển thị số đã phân tách hàng nghìn, không lặp lại hậu tố `VNĐ`. Hiển thị tổng số tiền Khách hàng đã thanh toán thành công cho hồ sơ; hồ sơ đã chuyển sang trạng thái "Chờ duyệt" trở về sau (Chờ duyệt, Chờ ký, Hoàn thành) đồng nghĩa đã thanh toán xong (nếu thuộc diện phải thu phí) nên luôn có giá trị; chỉ hiển thị `"—"` khi hồ sơ đang ở trạng thái "Chờ thanh toán" hoặc thuộc diện miễn phí. |
| Trạng thái | Enum(String(50)) | - | Theo hồ sơ | Hiển thị trạng thái hiện tại của hồ sơ. |
| Người tạo | String(255) | - | Theo hồ sơ | Hiển thị tên người đang đăng nhập đã tạo Phiếu yêu cầu cung cấp thông tin; không hiển thị account/email đăng nhập. |
| Thao tác | - | - | Theo trạng thái | Gồm:<br>+ Thanh toán: chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`.<br>+ Xem file/Tải file: chỉ hiển thị khi hồ sơ ở trạng thái `Hoàn thành` và có file PDF kết quả đã ký.<br>+ In biên lai: chỉ hiển thị khi hồ sơ đã thanh toán trực tuyến thành công qua UC158 và có biên lai điện tử. |

##### 4.1.X.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Tìm kiếm | Button | TH1 (Điều kiện ngày không hợp lệ): Nếu `Từ ngày` lớn hơn `Đến ngày`, hiển thị [MSG-ERR-VAL-007] và không tìm kiếm.<br>TH2 (Không có dữ liệu): Nếu không có bản ghi phù hợp, hiển thị trạng thái rỗng theo chuẩn danh sách.<br>TH Hợp lệ: Hệ thống tải danh sách hồ sơ thỏa mãn điều kiện.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Button | Xóa toàn bộ tiêu chí lọc và tải lại danh sách mặc định theo `Thời điểm đăng ký` giảm dần. |
| 3 | Row Click | Row | Mở màn hình chi tiết hồ sơ Yêu cầu cung cấp thông tin tương ứng. |
| 4 | Thanh toán | Button | Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`. Khi click, hệ thống đóng gói tham số `Mã loại thanh toán = THANH_TOAN_CCTT`, `Mã hồ sơ`, `Số tiền phải thu`, `Mã đơn vị thụ hưởng`, `Return URL` và chuyển sang UC158 theo tài liệu [UC158_Thanh_toan_truc_tuyen.md](UC158_Thanh_toan_truc_tuyen.md). |
| 5 | Xem file | Link/Button | Chỉ hiển thị khi hồ sơ `Hoàn thành` và có file PDF kết quả đã ký. Cho phép mở file tại tab/trình xem riêng. |
| 6 | Tải file | Link/Button | Chỉ hiển thị khi hồ sơ `Hoàn thành` và có file PDF kết quả đã ký. |
| 7 | In biên lai | Button | Chỉ hiển thị khi hồ sơ đã thanh toán trực tuyến thành công qua UC158 và có biên lai điện tử. |

---

#### 4.1.X.4. UC195-CCTT.MH02 - Màn hình Chi tiết yêu cầu cung cấp thông tin

##### 4.1.X.4.1. Màn hình

- Mở khi NSD click vào một dòng dữ liệu tại tab `Yêu cầu cung cấp thông tin`.
- Toàn bộ thông tin hiển thị dạng Read-only.
- Các khối xử lý/thanh toán/kết quả hiển thị động theo trạng thái hồ sơ.
- Link ảnh màn hình: [UC195-CCTT.MH02 - Chi tiết yêu cầu cung cấp thông tin](images/UC195_CCTT_MH02_Chi_tiet_yeu_cau_cung_cap_thong_tin.png).

##### 4.1.X.4.2. Mô tả thông tin trên màn hình

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
| Số tiền phải thanh toán | Decimal(18,0) | Không | Theo hồ sơ | Lấy theo biểu phí cung cấp thông tin đang có hiệu lực tại thời điểm phát sinh nghĩa vụ thanh toán. |
| Mã giao dịch thanh toán | String(100) | Không | Theo UC158 | Chỉ hiển thị sau khi phát sinh giao dịch thanh toán. |
| Số biên lai | String(100) | Không | Theo hệ thống tài chính | Chỉ hiển thị nếu hệ thống phát hành biên lai điện tử. |
| Thời điểm thanh toán | Datetime | Không | Theo UC158 | Chỉ hiển thị khi thanh toán thành công. |
| **V. Kết quả cung cấp thông tin** | - | - | Theo hồ sơ | **Chỉ hiển thị toàn bộ khối này nếu Hồ sơ ở trạng thái "Hoàn thành".** |
| File PDF kết quả đã ký | File/Link | Có nếu Hoàn thành | Theo hồ sơ | Cho phép xem/tải file PDF kết quả cung cấp thông tin đã được Lãnh đạo ký số. |
| Nội dung kết quả cung cấp thông tin | Text/Grid | Không | Theo hồ sơ | Hiển thị nội dung kết quả được phê duyệt. Bao gồm tiêu đề phân khu `"Kết quả tra cứu hồ sơ liên quan"`, dòng mô tả `"Hiển thị theo thứ tự số hồ sơ tăng dần, mỗi hồ sơ được phân tách thành một khối riêng."` và nhãn/badge hiển thị rõ **Tổng số hồ sơ tra cứu được** (ví dụ: `Tổng số hồ sơ tra cứu được: 03 hồ sơ`).  |
| Danh sách hồ sơ liên quan | Grid/Khối thông tin | Không | Theo kết quả tra cứu | Hiển thị bên dưới tiêu đề và thông tin tổng số hồ sơ tra cứu được của **Nội dung kết quả cung cấp thông tin**. Chỉ hiển thị nếu Hồ sơ ở trạng thái "Hoàn thành" và kết quả tra cứu có hồ sơ còn hiệu lực.<br>- **Đánh số thứ tự (STT)**: Danh sách các hồ sơ được hiển thị lần lượt, mỗi hồ sơ được phân tách thành một khối riêng biệt và **đánh số thứ tự tăng dần** bằng huy hiệu/badge số nổi bật ở đầu tiêu đề khối (ví dụ: badge số `01`, `02`, `03`... đứng trước tiêu đề `Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]`, kèm badge trạng thái hồ sơ ở góc phải).<br>- **Hiển thị lần lượt theo từng bộ hồ sơ**: Hệ thống gom và hiển thị liên tục theo từng bộ hồ sơ liên quan: hiển thị đầy đủ chuỗi hồ sơ của cùng một hồ sơ gốc/hồ sơ liên quan (ví dụ: Đăng ký lần đầu, các Đăng ký thay đổi, các hồ sơ liên quan khác còn hiệu lực) theo thứ tự thời gian đăng ký tăng dần, hiển thị hết một bộ hồ sơ rồi mới chuyển sang bộ hồ sơ tiếp theo. Nếu tiêu chí tìm kiếm khớp với một hồ sơ bất kỳ trong một bộ hồ sơ, hệ thống phải hiển thị toàn bộ các hồ sơ liên quan thuộc cùng bộ hồ sơ đó.<br>- **Quy chuẩn cấu trúc**: Từng hồ sơ hiển thị theo cấu trúc dùng chung tại [4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong). Hồ sơ còn hiệu lực là hồ sơ vẫn đang được đăng ký bảo đảm, chưa có Yêu cầu Xóa đăng ký nào được phê duyệt hoàn thành. Không cho phép chỉnh sửa.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* |

##### 4.1.X.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Quay lại | Button | Quay lại tab `Yêu cầu cung cấp thông tin`, giữ nguyên bộ lọc và trang hiện tại. |
| 2 | Thanh toán | Button | Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`, có nghĩa vụ phí. Khi click, hệ thống đóng gói tham số `Mã loại thanh toán = THANH_TOAN_CCTT`, `Mã hồ sơ`, `Số tiền phải thu`, `Mã đơn vị thụ hưởng`, `Return URL` và chuyển sang UC158 theo tài liệu [UC158_Thanh_toan_truc_tuyen.md](UC158_Thanh_toan_truc_tuyen.md). |
| 3 | Xem file | Link/Button | Chỉ hiển thị khi hồ sơ `Hoàn thành` và có file PDF kết quả đã ký. |
| 4 | Tải file | Link/Button | Chỉ hiển thị khi hồ sơ `Hoàn thành` và có file PDF kết quả đã ký. |
| 5 | Xem/In biên lai | Link/Button | Chỉ hiển thị khi hồ sơ đã thanh toán trực tuyến thành công qua UC158 và có biên lai điện tử. |

---

#### 4.1.X.5. Tham chiếu phân hệ thanh toán trực tuyến UC158

Tài liệu quản lý yêu cầu CCTT đã đăng ký không đặc tả chi tiết quy tắc thanh toán, màn hình thanh toán, callback, kết quả thanh toán hoặc phát hành biên lai.

Khi Khách hàng bấm `Thanh toán` đối với hồ sơ CCTT ở trạng thái `Chờ thanh toán`, hệ thống chuyển hướng sang phân hệ thanh toán trực tuyến theo tài liệu [UC158_Thanh_toan_truc_tuyen.md](UC158_Thanh_toan_truc_tuyen.md), đồng thời truyền đủ bộ tham số đóng gói sau:

| Tham số | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :--: | :-- | :-- |
| Mã loại thanh toán | Enum(String(50)) | Có | `THANH_TOAN_CCTT` | Control UI: Hidden/System parameter.<br>- Xác định loại phí thanh toán là phí Yêu cầu cung cấp thông tin. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Hidden/System parameter.<br>- Mã hồ sơ Yêu cầu cung cấp thông tin cần thanh toán. |
| Số tiền phải thu | Decimal(18,0) | Có | Theo biểu phí | Control UI: Hidden/System parameter.<br>- Số tiền cần thu theo biểu phí cung cấp thông tin đang có hiệu lực. |
| Mã đơn vị thụ hưởng | String(50) | Có | Theo hồ sơ | Control UI: Hidden/System parameter.<br>- Mã Trung tâm đăng ký/đơn vị thụ hưởng phí của hồ sơ. |
| Return URL | String(500) | Có | Theo hệ thống | Control UI: Hidden/System parameter.<br>- Đường dẫn quay lại màn hình quản lý/chi tiết hồ sơ CCTT sau khi UC158 xử lý xong giao dịch. |

---

#### 4.1.X.6. Ràng buộc dữ liệu và bảo mật

| STT | Quy tắc | Mô tả |
| :-- | :-- | :-- |
| 1 | Quyền xem hồ sơ | Chỉ chủ hồ sơ hoặc người được phân quyền hợp lệ mới được xem danh sách, chi tiết, file PDF đã ký và biên lai. |
| 2 | Không sinh lại kết quả khi Khách hàng xem | Khi hồ sơ `Hoàn thành`, hệ thống không tự động tra cứu lại, sinh lại file PDF hoặc thay đổi nội dung kết quả đã được phê duyệt. |
| 3 | Tính toàn vẹn file kết quả | File PDF đã ký phải thuộc đúng hồ sơ, đúng phiên bản xử lý và đúng dữ liệu đã được phê duyệt. |
| 4 | Nhật ký hệ thống | Mọi thao tác xem chi tiết, thanh toán, xem/tải file, xem/in biên lai phải ghi nhật ký hệ thống. |
| 5 | Toàn vẹn biên lai điện tử | Biên lai điện tử chỉ phát hành khi UC158 xác nhận thanh toán thành công; không cho phép Khách hàng tự tạo hoặc chỉnh sửa biên lai. |

---

#### 4.1.X.7. Quan hệ với tài liệu khác

| Tài liệu | Vai trò |
| :-- | :-- |
| [SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md) | Màn hình tổng hợp/tab điều hướng quản lý yêu cầu đã đăng ký. |
| [SRS yêu cầu cung cấp thông tin.md](SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md) | Mô tả phần lập Yêu cầu cung cấp thông tin và quy trình nghiệp vụ gốc. |
| [UC158_Thanh_toan_truc_tuyen.md](UC158_Thanh_toan_truc_tuyen.md) | Mô tả luồng thanh toán trực tuyến, callback, kết quả thanh toán và phát hành biên lai điện tử. |
