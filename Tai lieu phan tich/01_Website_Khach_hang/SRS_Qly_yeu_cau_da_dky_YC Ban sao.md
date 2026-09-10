## 4.1. Quản lý yêu cầu đã đăng ký - Website Khách hàng

### 4.1.1. Quản lý yêu cầu cung cấp bản sao văn bản chứng nhận

#### 4.1.1.1. Mục đích

- Cho phép Khách hàng tra cứu, theo dõi tiến trình xử lý, xem chi tiết, thanh toán phí và xem/tải kết quả đối với các yêu cầu cung cấp bản sao văn bản chứng nhận đăng ký biện pháp bảo đảm đã đăng ký trên Website Khách hàng.

*a. Phân quyền*

- Khách hàng cá nhân, tổ chức đã đăng nhập hệ thống và có quyền quản lý hồ sơ thuộc phạm vi tài khoản.

*b. Điều kiện thực hiện*

- Khách hàng đã đăng nhập thành công vào Website Khách hàng.
- Tài khoản Khách hàng đang ở trạng thái được phép giao dịch.
- Hồ sơ Yêu cầu cung cấp bản sao đã được tạo trên hệ thống và thuộc phạm vi tài khoản quản lý.

---

#### 4.1.1.2. MH01 - Tab Yêu cầu cung cấp bản sao

##### 4.1.1.2.1. Màn hình

![Tab Yêu cầu cung cấp bản sao](images/UC149_MH01_Danh_sach_yeu_cau_cung_cap_ban_sao.png)

##### 4.1.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Vùng nhập điều kiện tìm kiếm danh sách yêu cầu. |
| Mã hồ sơ | String(50) | Không | Trống | Tìm kiếm chính xác hoặc gần đúng theo Mã hồ sơ (`BS-[YYYYMMDD]-[TỰ_TĂNG_6_SỐ]`); tự động cắt khoảng trắng đầu cuối [BR-VAL-001]. |
| Số đăng ký | String(50) | Không | Trống | Tìm kiếm theo Số đăng ký của hồ sơ gốc gắn với yêu cầu. |
| Loại cung cấp bản sao | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Bản sao điện tử<br>+ Bản sao giấy |
| Trạng thái hồ sơ | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Chờ thanh toán<br>+ Chờ duyệt<br>+ Chờ ký<br>+ Đã duyệt - chờ trả kết quả<br>+ Hoàn thành<br>+ Bị từ chối<br>+ Bị trả lại |
| Người tạo | String(255) | Không | Trống | Tìm kiếm gần đúng theo tên người đang đăng nhập đã tạo Yêu cầu cung cấp bản sao. |
| Từ ngày | Date | Không | Trống | Lọc theo `Thời điểm đăng ký`. Nếu nhập cùng `Đến ngày`, áp dụng [BR-VAL-007]. |
| Đến ngày | Date | Không | Trống | Lọc theo `Thời điểm đăng ký`. Nếu nhập cùng `Từ ngày`, áp dụng [BR-VAL-007]. |
| Nút Tìm kiếm | Button | - | - | Thực hiện tìm kiếm theo bộ lọc đã nhập. |
| Nút Xóa bộ lọc | Button | - | - | Xóa toàn bộ tiêu chí lọc, đưa `Trạng thái hồ sơ` và `Loại cung cấp bản sao` về `Tất cả`, các ô nhập liệu về trống. |
| **II. Bảng danh sách hồ sơ** | - | - | 20 bản ghi/trang | Control UI: Grid phẳng.<br>- Sắp xếp mặc định theo `Thời điểm đăng ký` giảm dần.<br>- Click trực tiếp vào dòng dữ liệu để mở màn hình chi tiết, ngoại trừ khi click nút tại cột Thao tác.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | Tự tăng | Số thứ tự bản ghi trên trang hiện tại. |
| Mã hồ sơ | String(50) | - | Theo hồ sơ | Mã hồ sơ yêu cầu cung cấp bản sao. |
| Số đăng ký | String(50) | - | Theo hồ sơ | Số đăng ký của hồ sơ gốc gắn với yêu cầu. |
| Loại cung cấp bản sao | String(50) | - | Theo hồ sơ | Hiển thị "Bản sao điện tử" hoặc "Bản sao giấy". |
| Số lượng bản sao | Integer(10) | - | Theo hồ sơ | Chỉ hiển thị giá trị khi Loại cung cấp bản sao là "Bản sao giấy"; nếu là "Bản sao điện tử", hiển thị `"—"`. |
| Thời điểm đăng ký | Datetime | - | Theo hồ sơ | Ngày giờ Khách hàng gửi hồ sơ, định dạng `dd/mm/yyyy HH:mm`. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | Không | Theo hồ sơ | - Tiêu đề cột ghi rõ đơn vị tính `(VNĐ)`.<br>- Dữ liệu từng dòng chỉ hiển thị số đã phân tách hàng nghìn, không lặp lại hậu tố `VNĐ`.<br>- Hiển thị tổng số tiền Khách hàng đã thanh toán thành công cho yêu cầu.<br>- Hồ sơ đã chuyển sang trạng thái "Chờ duyệt" trở về sau (Chờ duyệt, Chờ ký, Đã duyệt - chờ trả kết quả, Hoàn thành) đồng nghĩa đã thanh toán xong (nếu thuộc diện phải thu phí) nên luôn có giá trị.<br>- Chỉ hiển thị `"—"` khi hồ sơ đang ở trạng thái "Chờ thanh toán" hoặc thuộc diện miễn phí. |
| Trạng thái | Enum(String(50)) | - | Theo hồ sơ | Control UI: Badge trạng thái phân biệt trực quan. |
| Người tạo | String(255) | - | Theo hồ sơ | Hiển thị tên người đang đăng nhập đã tạo Yêu cầu cung cấp bản sao; không hiển thị account/email đăng nhập. |
| Thao tác | - | - | Theo trạng thái | Control UI: Nhóm nút/icon thao tác.<br>- Thanh toán: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`.<br>- Tải file: Chỉ hiển thị khi hồ sơ ở trạng thái `Hoàn thành` và Loại cung cấp bản sao là `Bản sao điện tử`. |

##### 4.1.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới:<br>- **TH1 (Khoảng ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thuộc tài khoản Khách hàng thỏa mãn tiêu chí tìm kiếm/lọc, đưa về Trang 1, sắp xếp theo `Thời điểm đăng ký` giảm dần.<br>- **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled). |
| 2 | Xóa bộ lọc | Button | Đưa toàn bộ tiêu chí lọc về mặc định (trống hoặc "Tất cả") và tải lại lưới kết quả theo `Thời điểm đăng ký` giảm dần. |
| 3 | Row Click | Row | Mở màn hình Chi tiết yêu cầu cung cấp bản sao tương ứng với yêu cầu được chọn. |
| 4 | Thanh toán | Button | Khi người dùng click nút:<br>- Hệ thống kiểm tra trạng thái hồ sơ. Nếu trạng thái hồ sơ đã thay đổi hoặc đã được thanh toán, hiển thị thông báo lỗi [MSG-ERR-DK-005] và tải lại danh sách.<br>- Nếu hợp lệ, hệ thống đóng gói thông tin thanh toán (Mã hồ sơ, Số tiền phải thu, Mã đơn vị thụ hưởng, Return URL) và điều hướng sang phân hệ [Thanh toán trực tuyến](SRS_Thanh%20toan%20truc%20tuyen.md).<br>- Sau khi thanh toán thành công, hệ thống tiếp nhận kết quả phản hồi, cập nhật trạng thái hồ sơ sang `Chờ duyệt` và làm mới danh sách. |
| 5 | Tải file | Button | Tải đúng file PDF bản sao văn bản chứng nhận đã được Lãnh đạo ký số xuống thiết bị của Khách hàng. |

---

#### 4.1.1.3. MH02 - Màn hình Chi tiết yêu cầu cung cấp bản sao

##### 4.1.1.3.1. Màn hình

![Chi tiết yêu cầu cung cấp bản sao](images/UC149_MH02_Chi_tiet_yeu_cau_cung_cap_ban_sao.png)

##### 4.1.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ** | - | - | - | Khối thông tin chung của hồ sơ yêu cầu. |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Control UI: Hiển thị/Read-only. |
| Trạng thái | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Badge trạng thái. |
| Số đăng ký | String(50) | Có | Theo hồ sơ | Control UI: Hiển thị/Read-only. Số đăng ký của hồ sơ gốc gắn với yêu cầu. |
| Cơ quan tiếp nhận | Enum(String(100)) | Có | Theo hồ sơ | Control UI: Hiển thị/Read-only. Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08]. |
| Loại cung cấp bản sao | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Hiển thị/Read-only. `Bản sao điện tử` hoặc `Bản sao giấy`. |
| Số lượng bản sao | Integer(10) | Tùy điều kiện | Theo hồ sơ | Control UI: Hiển thị/Read-only. Chỉ hiển thị khi Loại cung cấp bản sao là `Bản sao giấy`. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Control UI: Hiển thị/Read-only, định dạng `dd/mm/yyyy HH:mm`. |
| Người tạo | String(255) | Có | Theo hồ sơ | Control UI: Hiển thị/Read-only. Tên người tạo Yêu cầu cung cấp bản sao. |
| **II. Thông tin chi tiết hồ sơ gốc** | - | - | - | **Hiển thị khối này khi hồ sơ Yêu cầu cung cấp bản sao ở Trạng thái "Đã duyệt - chờ trả kết quả" hoặc "Hoàn thành".** |
| Khối thông tin chi tiết hồ sơ gốc | Block/Grid | Có | Theo hồ sơ gốc | Hiển thị đầy đủ chi tiết hồ sơ gốc gắn với Số đăng ký của yêu cầu này theo cấu trúc quy định tại phân hệ Tra cứu [SRS_Tra cứu theo mã số CSDL.md](SRS_Tra%20c%E1%BB%A9u%20theo%20m%C3%A3%20s%E1%BB%91%20CSDL.md). Dữ liệu chỉ đọc, không cho phép chỉnh sửa. |
| **III. Thông tin xử lý** | - | - | - | Hiển thị thông tin tổng quan theo tiến trình xử lý thực tế của hồ sơ; trường nào có thông tin thì hiển thị, chưa phát sinh thì để trống hoặc ẩn. |
| Thời điểm tiếp nhận | Datetime | Không | Theo hồ sơ | Chỉ hiển thị từ khi hồ sơ đã được Cán bộ tiếp nhận. |
| Thời điểm duyệt | Datetime | Không | Theo hồ sơ | Chỉ hiển thị từ khi hồ sơ đã được Cán bộ kiểm tra/xử lý. |
| Người duyệt | String(255) | Không | Theo hồ sơ | Họ và tên Cán bộ đã kiểm tra/xử lý hồ sơ. |
| Thời điểm trình ký | Datetime | Không | Theo hồ sơ | Chỉ hiển thị từ khi hồ sơ đã được Cán bộ trình Lãnh đạo ký. |
| Thời điểm ký duyệt / ký số | Datetime | Không | Theo hồ sơ | Thời điểm Lãnh đạo phê duyệt/ký số văn bản bản sao. |
| Người ký duyệt | String(255) | Không | Theo hồ sơ | Họ và tên Lãnh đạo ký duyệt/ký số. |
| Số tiền phải thanh toán | Decimal(18,0) | Không | Theo hồ sơ | Hiển thị đối với hồ sơ thuộc diện phải thu phí. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | Không | Theo hồ sơ | Hiển thị số tiền đã thanh toán sau khi giao dịch thanh toán thành công. |
| Thời điểm thanh toán | Datetime | Không | Theo cổng thanh toán | Thời điểm thanh toán thành công qua cổng thanh toán. |
| Mã giao dịch thanh toán | String(100) | Không | Theo cổng thanh toán | Mã giao dịch do cổng thanh toán cấp. |
| Số biên lai | String(100) | Không | Theo hệ thống tài chính | Số biên lai thu phí điện tử (nếu có). |
| File bản sao điện tử đã ký | File/Link | Không | Theo hồ sơ | Chỉ hiển thị link Xem file / Tải file khi Loại cung cấp bản sao là `Bản sao điện tử` và hồ sơ ở trạng thái `Hoàn thành`. |
| Hướng dẫn nhận kết quả bản sao giấy | Text(500) | Không | Theo hồ sơ | Chỉ hiển thị khi Loại cung cấp bản sao là `Bản sao giấy` và hồ sơ từ trạng thái `Đã duyệt - chờ trả kết quả` trở đi. |
| Thông tin trả bản sao giấy | Text(500) | Không | Theo hồ sơ | Hiển thị khi Cán bộ đã hoàn tất xác nhận bàn giao bản sao giấy cho Khách hàng. |
| Lý do từ chối | Text(1000) | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ ở trạng thái `Bị từ chối`. |
| Thời điểm từ chối | Datetime | Không | Theo hồ sơ | Thời điểm Cán bộ/Lãnh đạo từ chối hồ sơ. |
| Người từ chối | String(255) | Không | Theo hồ sơ | Họ và tên người thực hiện từ chối hồ sơ. |

##### 4.1.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Quay lại | Button | Bố trí tại Header góc trên bên phải màn hình. Khi click: Quay lại Tab "Yêu cầu cung cấp bản sao", giữ nguyên bộ lọc và trang hiện tại. |
| 2 | Thanh toán | Button | Bố trí tại Header góc trên bên phải màn hình (chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thanh toán`). Khi người dùng click nút:<br>- Hệ thống kiểm tra trạng thái hồ sơ. Nếu trạng thái hồ sơ đã thay đổi hoặc đã được thanh toán, hiển thị thông báo lỗi [MSG-ERR-DK-005] và tải lại màn hình chi tiết.<br>- Nếu hợp lệ, hệ thống đóng gói thông tin thanh toán (Mã hồ sơ, Số tiền phải thu, Mã đơn vị thụ hưởng, Return URL) và điều hướng sang phân hệ [Thanh toán trực tuyến](SRS_Thanh%20toan%20truc%20tuyen.md).<br>- Sau khi thanh toán thành công, hệ thống tiếp nhận kết quả phản hồi, cập nhật trạng thái hồ sơ sang `Chờ duyệt`, làm mới dữ liệu màn hình chi tiết và mở khóa các khối thông tin tương ứng. |
| 3 | Xem file | Link/Button | Bố trí tại Header góc trên bên phải màn hình và cạnh trường file đính kèm. Cho phép xem file PDF bản sao đã ký số tại một tab riêng. |
| 4 | Tải file | Link/Button | Bố trí tại Header góc trên bên phải màn hình và cạnh trường file đính kèm. Tải file PDF bản sao văn bản chứng nhận đã ký số xuống thiết bị của Khách hàng. |
