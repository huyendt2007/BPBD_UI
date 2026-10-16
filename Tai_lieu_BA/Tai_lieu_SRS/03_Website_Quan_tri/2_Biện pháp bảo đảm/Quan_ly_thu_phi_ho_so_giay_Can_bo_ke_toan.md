### 4.3.2.21. Quản lý thu phí/hoàn phí hồ sơ giấy

#### 4.3.2.21.1. Mục đích

\- Cho phép Cán bộ kế toán xử lý các khoản phải thu phát sinh từ hồ sơ giấy đã hoàn tất tiếp nhận tại [Tiếp nhận hồ sơ giấy - Module Biện pháp bảo đảm (Website Quản trị)](Tiep_nhan_ho_so_giay_Can_bo_tiep_nhan.md) và các khoản phải hoàn phát sinh khi hồ sơ giấy đã thu phí bị từ chối.

\- Chức năng gồm: tra cứu khoản phải thu/khoản phải hoàn; xem chi tiết; xác nhận thu phí theo hình thức Tiền mặt, Chuyển khoản hoặc Miễn phí; phát hành và in biên lai thu phí, lệ phí; xác nhận hoàn phí và in chứng từ hoàn phí.

\- Sau khi xác nhận thu phí/miễn phí thành công, hồ sơ chuyển sang trạng thái "Chờ giải quyết" và hiển thị tại [Tab Hồ sơ chờ nhập liệu - Kiểm tra và xử lý hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Kiem_tra_va_xu_ly_ho_so_Can_bo.md).

*a. Phân quyền*

\- Cán bộ kế toán/Cán bộ thu phí: Được phép xem danh sách và chi tiết khoản phải thu/khoản phải hoàn, xác nhận thu phí, xác nhận miễn phí, xác nhận hoàn phí, đính kèm chứng từ, in biên lai và in chứng từ hoàn phí trong phạm vi đơn vị được phân công.

\- Cán bộ kế toán không được sửa Loại yêu cầu, Người yêu cầu, Người nộp hồ sơ, tham số tính phí và dữ liệu nghiệp vụ của hồ sơ.

\- Cán bộ tiếp nhận, Cán bộ giải quyết: Chỉ được theo dõi/xem thông tin thu phí, không được xác nhận thu phí, hoàn phí và không được sửa thông tin tài chính.

*b. Điều kiện thực hiện*

\- Cán bộ đã đăng nhập thành công vào Website Quản trị và được phân quyền menu "Quản lý phí > Quản lý thu phí/hoàn phí".

\- Khoản phải thu đã được hệ thống tạo khi hoàn tất tiếp nhận hồ sơ giấy (trạng thái "Chờ thu phí"), hoặc khoản phải hoàn đã được tạo khi hồ sơ giấy đã thu phí bị từ chối (trạng thái "Chờ hoàn phí").

---

<a id="mh01"></a>
#### 4.3.2.21.2. MH01 - Màn hình Danh sách thu phí/hoàn phí

##### 4.3.2.21.2.1. Màn hình

![Danh sách thu phí/hoàn phí](images/UCPS013_MH01_Danh_sach_khoan_phai_thu.png)

##### 4.3.2.21.2.2. Mô tả thông tin trên màn hình

- Màn hình gồm 01 Khối Bộ lọc tìm kiếm động theo ngữ cảnh và 02 Tab nghiệp vụ riêng biệt: **Tab 1: Khoản phải thu** và **Tab 2: Khoản phải hoàn phí**. Thanh Tab đặt ngay dưới tiêu đề màn hình, phía trên Khối Bộ lọc tìm kiếm; Tab đang chọn quyết định cả các trường của Khối Bộ lọc tìm kiếm và Bảng dữ liệu hiển thị bên dưới.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Hệ thống Tab nghiệp vụ** | - | - | - | Control UI: Thanh chuyển Tab đặt ngay dưới tiêu đề màn hình, phía trên Khối Bộ lọc tìm kiếm.<br>- Tab đang chọn điều khiển đồng thời Khối Bộ lọc tìm kiếm (các trường lọc theo Tab) và Bảng dữ liệu bên dưới.<br>- Gồm 02 Tab: "Khoản phải thu" và "Khoản phải hoàn phí".<br>- Mỗi Tab có badge đếm số lượng bản ghi thỏa mãn điều kiện lọc tương ứng. |
| Tab Khoản phải thu | Button / Tab | - | Active mặc định | Control UI: Nút Tab kèm icon `fa-file-invoice-dollar` và badge số lượng.<br>- Khi click: hiển thị Bảng Danh sách khoản phải thu và cấu hình bộ lọc tương ứng với khoản phải thu. |
| Tab Khoản phải hoàn phí | Button / Tab | - | - | Control UI: Nút Tab kèm icon `fa-money-bill-transfer` và badge số lượng.<br>- Khi click: hiển thị Bảng Danh sách khoản phải hoàn phí và cấu hình bộ lọc tương ứng với khoản phải hoàn. |
| **II. Khối Bộ lọc tìm kiếm (Động theo Tab)** | - | - | - | Control UI: Khối lọc có nút Xóa bộ lọc và Tìm kiếm, đặt ngay dưới thanh Tab.<br>- Hiển thị động các trường tìm kiếm theo Tab đang active.<br>- Mặc định giá trị Từ ngày là ngày đầu tháng hiện tại, Đến ngày là ngày hiện tại. |
| Mã hồ sơ/Mã QR | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: "HS-2026-000128".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ hoặc Mã QR.<br>- Hiển thị trên cả 02 Tab. |
| Số đơn giấy | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "PG-0128".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Số đơn giấy.<br>- Hiển thị trên cả 02 Tab. |
| Người yêu cầu | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Tên cá nhân/tổ chức".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo tên cá nhân/tổ chức yêu cầu.<br>- Hiển thị trên cả 02 Tab. |
| Loại yêu cầu | Enum(String(100)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Xóa đăng ký<br>+ Yêu cầu cung cấp bản sao<br>+ Thông báo xử lý tài sản bảo đảm<br>- Chỉ hiển thị khi chọn Tab Khoản phải thu (ẩn khi chọn Tab Khoản phải hoàn phí). |
| Hình thức thanh toán | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Tiền mặt<br>+ Chuyển khoản<br>+ Miễn phí<br>- Chỉ hiển thị khi chọn Tab Khoản phải thu (ẩn khi chọn Tab Khoản phải hoàn phí). |
| Trạng thái thu phí | Enum(String(50)) | Không | Chờ thu phí | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Chờ thu phí<br>+ Đã thu<br>+ Miễn phí<br>- Chỉ hiển thị khi chọn Tab Khoản phải thu (ẩn khi chọn Tab Khoản phải hoàn phí). |
| Trạng thái hoàn phí | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Chờ hoàn phí<br>+ Cần bổ sung chứng từ<br>+ Đã hoàn<br>- Chỉ hiển thị khi chọn Tab Khoản phải hoàn phí (ẩn khi chọn Tab Khoản phải thu). |
| Từ ngày tiếp nhận / Từ ngày phát sinh | Date | Không | Ngày đầu tháng | Control UI: Input text kèm icon lịch (`dd/mm/yyyy`).<br>- Mặc định ngày đầu tháng hiện tại.<br>- Đổi nhãn động: "Từ ngày tiếp nhận" (ở Tab Khoản phải thu) hoặc "Từ ngày phát sinh" (ở Tab Khoản phải hoàn phí).<br>- Phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày tiếp nhận / Đến ngày phát sinh | Date | Không | Ngày hiện tại | Control UI: Input text kèm icon lịch (`dd/mm/yyyy`).<br>- Mặc định ngày hiện tại.<br>- Đổi nhãn động: "Đến ngày tiếp nhận" (ở Tab Khoản phải thu) hoặc "Đến ngày phát sinh" (ở Tab Khoản phải hoàn phí).<br>- Phải lớn hơn hoặc bằng Từ ngày. |
| **III. Quy định chung của Bảng dữ liệu theo Tab** | - | - | - | Control UI: Bảng dữ liệu (Grid) kèm thanh phân trang riêng cho từng Tab.<br>- Chỉ hiển thị khoản phải thu/khoản phải hoàn thuộc đơn vị được phân công của Cán bộ đăng nhập.<br>- Cột Thao tác: Tuân thủ quy chuẩn số slot nút bấm cố định (03 slot). Luôn hiển thị đầy đủ các thao tác, các nút không khả dụng ở trạng thái hiện tại hiển thị dạng mờ (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`), tuyệt đối không ẩn đi.<br>- Phân trang chuẩn: Mặc định 10 bản ghi/trang; cho phép chọn cấu hình 10, 20, 50, 100 bản ghi/trang. Có đầy đủ nút điều hướng Đầu (`\|<<`), Trước (`<`), các số trang, Sau (`>`), Cuối (`>>\|`).<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị 01 dòng căn giữa (`colspan`), in nghiêng theo [MSG-INF-SYS-001]; phân trang hiển thị *"Đang hiển thị 0–0 trong tổng số 0 hồ sơ"* và các nút điều hướng bị khóa mờ (Disabled). |
| **IV. Tab Khoản phải thu - Bảng danh sách** | - | - | 10 bản ghi/trang | Tiêu đề bảng: "Danh sách khoản phải thu" kèm badge số khoản. |
| STT | Integer(10) | - | Theo trang | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng tính liên tục theo trang kết quả hiện tại. |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Click mở [MH02 - Màn hình Chi tiết khoản phải thu/khoản phải hoàn](#mh02). |
| Số đơn giấy | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người nộp | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại yêu cầu | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Hình thức TT | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Tiền mặt<br>+ Chuyển khoản<br>+ Miễn phí<br>- Khoản chưa xác nhận hiển thị "-". |
| Phải thu | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc, căn phải.<br>- Định dạng phân tách hàng nghìn, đơn vị VNĐ. |
| Đã thu | Decimal(18,0) | - | 0 VNĐ | Control UI: Label, chỉ đọc, căn phải.<br>- Bằng 0 với khoản đang "Chờ thu phí" hoặc "Miễn phí". |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chờ thu phí<br>+ Đã thu<br>+ Miễn phí |
| Số biên lai | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị số biên lai sau khi xác nhận; chưa có hiển thị "-". |
| Ngày tiếp nhận | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Cán bộ tiếp nhận | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Thao tác | - | - | - | Control UI: Nhóm 03 icon thao tác cố định (Fixed-Slot) trên mỗi dòng.<br>Gồm:<br>+ Slot 1 (Xem chi tiết): Icon mắt, luôn khả dụng, click mở [MH02](#mh02).<br>+ Slot 2 (Xác nhận thu phí): Icon hóa đơn (`fa-receipt`), mở popup nhập liệu xác nhận [MH03](#mh03); khả dụng khi Trạng thái là "Chờ thu phí" (trạng thái khác hiển thị mờ, disabled).<br>+ Slot 3 (In biên lai): Icon máy in (`fa-print`), mở [MH04](#mh04); khả dụng khi Trạng thái là "Đã thu" hoặc "Miễn phí" (trạng thái khác hiển thị mờ, disabled). |
| **V. Tab Khoản phải hoàn phí - Bảng danh sách** | - | - | 10 bản ghi/trang | Tiêu đề bảng: "Danh sách khoản phải hoàn phí" kèm badge số khoản. |
| STT | Integer(10) | - | Theo trang | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng tính liên tục theo trang kết quả hiện tại. |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Click mở [MH02 - Màn hình Chi tiết khoản phải thu/khoản phải hoàn](#mh02). |
| Số đơn giấy | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Lý do hoàn phí | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Lấy theo lý do từ chối hồ sơ. |
| Phải hoàn | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc, căn phải.<br>- Định dạng phân tách hàng nghìn, đơn vị VNĐ. |
| Đã hoàn | Decimal(18,0) | - | 0 VNĐ | Control UI: Label, chỉ đọc, căn phải.<br>- Định dạng phân tách hàng nghìn, đơn vị VNĐ. |
| Hình thức hoàn | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Tiền mặt<br>+ Chuyển khoản |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chờ hoàn phí<br>+ Cần bổ sung chứng từ<br>+ Đã hoàn |
| Ngày phát sinh | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Thời điểm phát sinh khoản phải hoàn, định dạng `dd/mm/yyyy HH:mm`. |
| Cán bộ xử lý | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Thao tác | - | - | - | Control UI: Nhóm 03 icon thao tác cố định (Fixed-Slot) trên mỗi dòng.<br>Gồm:<br>+ Slot 1 (Xem chi tiết): Icon mắt, luôn khả dụng, click mở [MH02](#mh02).<br>+ Slot 2 (Xác nhận hoàn phí): Icon chuyển tiền (`fa-money-bill-transfer`), mở popup nhập liệu xác nhận [MH05](#mh05); khả dụng khi Trạng thái là "Chờ hoàn phí" hoặc "Cần bổ sung chứng từ" (trạng thái "Đã hoàn" hiển thị mờ, disabled).<br>+ Slot 3 (In chứng từ hoàn phí): Icon máy in (`fa-print`), mở [MH06](#mh06); khả dụng khi Trạng thái là "Đã hoàn" (trạng thái khác hiển thị mờ, disabled). |

##### 4.3.2.21.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chuyển Tab | Nút Tab | Hệ thống chuyển đổi giữa 2 Tab: "Khoản phải thu" và "Khoản phải hoàn phí". Đồng thời tự động cập nhật hiển thị các trường lọc ngữ cảnh và nhãn ngày tương ứng với Tab được chọn. |
| 2 | Tìm kiếm | Nút | Hệ thống thực hiện tìm kiếm/lọc dữ liệu theo các điều kiện lọc đang nhập:<br>- **TH1 (Khoảng ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày`, hệ thống highlight viền đỏ ô nhập (class `.is-invalid`), hiển thị cảnh báo đỏ *"Từ ngày không được lớn hơn Đến ngày"* ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập lỗi (Rule 9 Validation).<br>- **TH2 (Không có dữ liệu)**: Bảng tương ứng hiển thị trạng thái không có dữ liệu theo [MSG-INF-SYS-001].<br>- **TH Hợp lệ**: Hệ thống hiển thị danh sách thỏa mãn điều kiện lọc, cập nhật badge số lượng trên thanh Tab và đưa phân trang về Trang 1. |
| 3 | Xóa bộ lọc | Nút | Hệ thống xóa các điều kiện tìm kiếm, đặt lại `Từ ngày` là ngày đầu tháng, `Đến ngày` là ngày hiện tại, `Trạng thái thu phí` về "Chờ thu phí", các trường còn lại về "Tất cả"/Trống và tải lại danh sách. |
| 4 | Quét mã | Nút | Cho phép quét mã QR trên phiếu tiếp nhận để tự động điền mã hồ sơ vào bộ lọc và mở chi tiết khoản phải thu/hoàn. |
| 5 | Xem chi tiết | Link / Icon mắt | Hệ thống mở [MH02 - Màn hình Chi tiết khoản phải thu/khoản phải hoàn](#mh02) của khoản thu hoặc khoản hoàn tương ứng. |
| 6 | Xác nhận thu phí | Icon | Hệ thống mở [MH03 - Popup Xác nhận thu phí & Phát hành biên lai](#mh03) để Cán bộ kế toán nhập liệu thông tin thu phí. |
| 7 | In biên lai | Icon | Hệ thống mở [MH04 - Popup Biên lai thu phí, lệ phí](#mh04). |
| 8 | Xác nhận hoàn phí | Icon | Hệ thống mở [MH05 - Popup Xác nhận hoàn phí](#mh05) để Cán bộ kế toán nhập liệu thông tin hoàn phí. |
| 9 | In chứng từ hoàn phí | Icon | Hệ thống mở [MH06 - Popup Chứng từ hoàn phí](#mh06). |

---

<a id="mh02"></a>
#### 4.3.2.21.3. MH02 - Màn hình Chi tiết khoản phải thu/khoản phải hoàn

##### 4.3.2.21.3.1. Màn hình

![Chi tiết khoản phải thu](images/UCPS013_MH02_Chi_tiet_khoan_phai_thu.png)

##### 4.3.2.21.3.2. Mô tả thông tin trên màn hình

- Toàn bộ thông tin trên màn hình ở chế độ chỉ đọc; Cán bộ kế toán chỉ xem/tải để đối chiếu, không được thêm, sửa, xóa.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin tiếp nhận** | - | - | - | Hiển thị lại thông tin tiếp nhận hồ sơ giấy tại [Tiếp nhận hồ sơ giấy - Module Biện pháp bảo đảm (Website Quản trị)](Tiep_nhan_ho_so_giay_Can_bo_tiep_nhan.md). |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số đơn giấy | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Kênh tiếp nhận | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Trực tiếp tại quầy<br>+ Qua bưu điện<br>+ Fax<br>+ Email |
| Thời điểm tiếp nhận | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Đơn vị tiếp nhận | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cán bộ tiếp nhận | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| **II. Thông tin người yêu cầu** | - | - | - | |
| Loại khách hàng | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Có tài khoản trực tuyến<br>+ Khách hàng vãng lai |
| Mã tài khoản trực tuyến | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị khi Loại khách hàng là "Có tài khoản trực tuyến". |
| Họ tên/Tên tổ chức | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số điện thoại người yêu cầu | String(20) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Email người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Ghi chú tiếp nhận | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Ẩn trường nếu không có dữ liệu. |
| **III. Thông tin người nộp hồ sơ** | - | - | - | |
| Họ tên người nộp | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Giấy tờ định danh | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Số CCCD/CMND/Hộ chiếu/giấy tờ định danh. |
| Số điện thoại người nộp | String(20) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Email người nộp | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Quan hệ với người yêu cầu | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Người được ủy quyền<br>+ Người yêu cầu<br>+ Nhân viên tổ chức<br>+ Khác |
| Phương thức nhận kết quả | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Trực tiếp tại cơ quan<br>+ Qua dịch vụ bưu chính<br>+ Cách thức điện tử |
| Địa chỉ nhận kết quả | String(500) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị khi Phương thức nhận kết quả là "Qua dịch vụ bưu chính". |
| Email nhận kết quả | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị khi Phương thức nhận kết quả là "Cách thức điện tử". |
| **IV. Thông tin loại yêu cầu và lệ phí** | - | - | - | |
| Loại yêu cầu | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Tham số tính phí | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Ví dụ: số lượng bản sao. |
| Đối tượng miễn phí | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị khi hồ sơ có căn cứ miễn phí tại bước tiếp nhận. |
| Mã biểu phí | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu [Quản lý biểu phí - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_bieu_phi.md). |
| Tên khoản phí | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số tiền phải thu | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng phân tách hàng nghìn, đơn vị VNĐ. |
| Số tiền đã thu | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Bằng 0 nếu đang "Chờ thu phí" hoặc "Miễn phí". |
| Hình thức thanh toán | Enum(String(50)) | - | Chưa xác nhận | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Chưa xác nhận<br>+ Tiền mặt<br>+ Chuyển khoản<br>+ Miễn phí |
| Trạng thái thu phí | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chờ thu phí<br>+ Đã thu<br>+ Miễn phí |
| Trạng thái hồ sơ | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Ví dụ: "Chờ thu phí", "Chờ giải quyết". |
| Số biên lai | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chưa có hiển thị "-". |
| **V. Thông tin hoàn phí** | - | - | - | Chỉ hiển thị khi mở chi tiết từ Danh sách khoản phải hoàn phí. |
| Mã khoản thu gốc | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Mã khoản thu/biên lai thu phí ban đầu. |
| Lý do phát sinh hoàn phí | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Lấy theo lý do từ chối hồ sơ. |
| Số tiền phải hoàn | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số tiền đã hoàn | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Hình thức hoàn phí | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Tiền mặt<br>+ Chuyển khoản |
| Trạng thái hoàn phí | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chờ hoàn phí<br>+ Cần bổ sung chứng từ<br>+ Đã hoàn |
| Số chứng từ hoàn phí | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chưa có hiển thị "-". |
| **VI. Tài liệu đính kèm** | - | - | - | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Hiển thị danh sách tài liệu đã tiếp nhận. |
| STT | Integer(10) | - | Theo thứ tự | Control UI: Label, chỉ đọc. |
| Tên tài liệu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Đánh dấu tài liệu bắt buộc nếu có cấu hình. |
| File đính kèm | File | - | Lấy theo dữ liệu bản ghi | Control UI: Link "Xem file", "Tải tệp". |
| **VII. Lịch sử trạng thái** | - | - | - | Control UI: Bảng dữ liệu, chỉ đọc. |
| Thời điểm | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Nội dung xử lý | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| **VIII. Thanh nút chức năng** | - | - | - | Control UI: Thanh nút cố định ở cuối màn hình (Sticky footer).<br>Gồm:<br>+ Đóng<br>+ Xác nhận thu phí: Chỉ hiển thị với Khoản phải thu; khả dụng khi trạng thái là "Chờ thu phí".<br>+ In biên lai: Chỉ hiển thị với Khoản phải thu; khả dụng khi trạng thái là "Đã thu" hoặc "Miễn phí".<br>+ Xác nhận hoàn phí: Chỉ hiển thị với Khoản phải hoàn ở trạng thái "Chờ hoàn phí" hoặc "Cần bổ sung chứng từ".<br>+ In chứng từ hoàn phí: Chỉ hiển thị với Khoản phải hoàn ở trạng thái "Đã hoàn". |

##### 4.3.2.21.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Hệ thống đóng màn hình chi tiết và quay lại [MH01 - Màn hình Danh sách thu phí/hoàn phí](#mh01), giữ nguyên bộ lọc và trang dữ liệu. |
| 2 | Xác nhận thu phí | Nút | Hệ thống mở [MH03 - Popup Xác nhận thu phí & Phát hành biên lai](#mh03). |
| 3 | In biên lai | Nút | Hệ thống mở [MH04 - Popup Biên lai thu phí, lệ phí](#mh04). |
| 4 | Xác nhận hoàn phí | Nút | Hệ thống mở [MH05 - Popup Xác nhận hoàn phí](#mh05). |
| 5 | In chứng từ hoàn phí | Nút | Hệ thống mở [MH06 - Popup Chứng từ hoàn phí](#mh06). |
| 6 | Xem file / Tải tệp | Link | Hệ thống mở tài liệu đính kèm tại tab trình duyệt mới hoặc tải tệp về máy. |

---

<a id="mh03"></a>
#### 4.3.2.21.4. MH03 - Popup Xác nhận thu phí & Phát hành biên lai

##### 4.3.2.21.4.1. Màn hình

![Xác nhận thu phí](images/UCPS013_MH03_Xac_nhan_thu_phi.png)

##### 4.3.2.21.4.2. Mô tả thông tin trên màn hình

- **Quy chuẩn hiển thị Popup**: Thiết kế kích thước chiều ngang lớn (`min(850px, 94vw)`), bố cục các trường dữ liệu dạng 2 cột song song (Grid 50%-50%), khoảng cách lề chuẩn 24px; Tiêu đề (Header) và Nút bấm (Footer) cố định ở đầu và chân popup (Sticky), chỉ cuộn độc lập phần thân nội dung (Modal body, `max-height: 80vh; overflow-y: auto`).
- **Quy chuẩn kiểm tra dữ liệu (Rule 9 Validation)**: Khi bấm "Chỉ xác nhận thu" hoặc "Xác nhận & In biên lai", nếu có trường bắt buộc chưa nhập hoặc không hợp lệ, hệ thống highlight viền đỏ ô nhập (class `.is-invalid`), hiển thị thông báo lỗi màu đỏ ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập lỗi đầu tiên. Tuyệt đối không dùng thông báo dạng Alert hay Toast.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tóm tắt khoản phải thu** | - | - | - | Hiển thị dạng khối thẻ tóm tắt ở đầu popup để Cán bộ kế toán đối chiếu trước khi xác nhận. |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người yêu cầu / Khách hàng | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Loại yêu cầu | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số tiền phải thu | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc, hiển thị màu xanh nổi bật.<br>- Định dạng phân tách hàng nghìn, đơn vị VNĐ. |
| **II. Hình thức thanh toán** | - | - | - | |
| Hình thức thanh toán | Enum(String(50)) | Có | Tiền mặt (nếu Số tiền phải thu > 0) / Miễn phí (nếu Số tiền phải thu = 0) | Control UI: Radio button.<br>Gồm:<br>+ Tiền mặt<br>+ Chuyển khoản<br>+ Miễn phí<br>- Khi chọn từng giá trị, hệ thống hiển thị khối trường tương ứng tại các Khối III, IV, V. |
| **III. Nếu chọn: Tiền mặt** | - | - | - | |
| Số tiền khách nộp | Decimal(18,0) | Có | Bằng Số tiền phải thu | Control UI: Input number.<br>- Tự động định dạng phân tách hàng nghìn khi nhập.<br>- Phải lớn hơn hoặc bằng Số tiền phải thu. |
| Số tiền trả lại | Decimal(18,0) | - | 0 VNĐ | Control UI: Label, chỉ đọc, hiển thị màu xanh.<br>- Hệ thống tự tính = Số tiền khách nộp - Số tiền phải thu; nếu âm hiển thị 0. |
| Ghi chú / Số biên lai giấy nếu có | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập ghi chú hoặc số biên lai giấy". |
| **IV. Nếu chọn: Chuyển khoản** | - | - | - | Cán bộ kế toán xác nhận theo khoản ghi Có trên tài khoản thụ hưởng của đơn vị. |
| Nguồn xác nhận | Enum(String(100)) | Có | Sao kê tài khoản/KBNN | Control UI: Combobox.<br>Gồm:<br>+ Sao kê tài khoản/KBNN<br>+ Thông báo ghi Có ngân hàng<br>+ Chứng từ khách hàng cung cấp |
| Tài khoản thụ hưởng | Enum(String(255)) | Có | Tài khoản đầu tiên trong danh sách | Control UI: Combobox.<br>- Danh sách tài khoản nhận tiền của đơn vị. Ví dụ: "7111.0.1054837 - Kho bạc Nhà nước", "102010000123456 - VietinBank". |
| Mã tham chiếu/Số bút toán | String(100) | Có | Theo gợi ý hệ thống | Control UI: Input text.<br>- Mã tham chiếu, số bút toán hoặc mã giao dịch trên sao kê/thông báo ghi Có. |
| Ngày ghi Có | Date | Có | Ngày hiện tại | Control UI: Datepicker (`dd/mm/yyyy`). |
| Số tiền ghi Có | Decimal(18,0) | Có | Bằng Số tiền phải thu | Control UI: Input number.<br>- Tự động định dạng phân tách hàng nghìn khi nhập.<br>- Phải lớn hơn hoặc bằng Số tiền phải thu. |
| Nội dung chuyển khoản | String(500) | Có | Mã hồ sơ + Người yêu cầu | Control UI: Input text.<br>- Nội dung chuyển khoản trên sao kê. |
| Tên người chuyển theo sao kê | String(255) | Không | Người yêu cầu | Control UI: Input text.<br>- Placeholder: "Nếu sao kê hiển thị".<br>- Chỉ nhập khi sao kê/chứng từ có hiển thị. |
| Số tài khoản chuyển | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nếu sao kê hiển thị". |
| Ngân hàng chuyển tiền | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nếu sao kê hiển thị". |
| Đính kèm sao kê/chứng từ | File | Không | Chưa chọn tệp | Control UI: Upload file 01 tệp.<br>- Nút "Chọn tệp"; khi chưa có file hiển thị "Chưa chọn tệp"; sau khi chọn file thành công hiển thị tên file cùng dòng với link "Xem file" và "Xóa".<br>- Chấp nhận định dạng .pdf, .jpg, .jpeg, .png; tối đa 20MB/tệp. |
| **V. Nếu chọn: Miễn phí** | - | - | - | |
| Lý do miễn phí | Enum(String(100)) | Có | Đối tượng ưu tiên | Control UI: Combobox.<br>Gồm:<br>+ Đối tượng ưu tiên<br>+ Theo quy định pháp luật<br>+ Khác |
| Văn bản / Căn cứ miễn phí | String(500) | Không | "Hồ sơ thuộc trường hợp miễn lệ phí theo quy định." | Control UI: Input text. |
| Tài liệu đính kèm căn cứ | File | Không | Chưa chọn tệp | Control UI: Upload file 01 tệp, hiển thị và xử lý giống trường Đính kèm sao kê/chứng từ tại Khối IV. |
| **VI. Thanh nút chức năng** | - | - | - | Control UI: Thanh nút cố định ở cuối popup (Sticky footer).<br>Gồm:<br>+ Hủy bỏ<br>+ Chỉ xác nhận thu<br>+ Xác nhận & In biên lai |

##### 4.3.2.21.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Nút | Hệ thống đóng popup, không lưu dữ liệu đã nhập. |
| 2 | Chọn hình thức thanh toán | Radio button | Hệ thống hiển thị khối trường tương ứng hình thức đã chọn (Khối III, IV hoặc V) và ẩn các khối còn lại. |
| 3 | Đính kèm / Xem file / Xóa | Nút / Link | - **TH1 (Sai định dạng hoặc vượt dung lượng)**: Hệ thống hiển thị [MSG-ERR-FILE-003] và không nhận tệp.<br>- **TH Hợp lệ**: Hệ thống hiển thị tên tệp cùng link "Xem file" (mở tệp tại tab trình duyệt mới) và "Xóa" (gỡ tệp, đưa về trạng thái "Chưa chọn tệp"). |
| 4 | Chỉ xác nhận thu | Nút | Hệ thống kiểm tra dữ liệu theo hình thức thanh toán đã chọn:<br>- **TH1 (Khoản không ở trạng thái "Chờ thu phí")**: Hệ thống hiển thị [MSG-ERR-UCPS-006] và không xác nhận.<br>- **TH2 (Bỏ trống trường bắt buộc)**: Hệ thống highlight viền đỏ ô nhập lỗi (class `.is-invalid`), hiển thị thông báo lỗi *"Đây là trường bắt buộc"* ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập lỗi đầu tiên (Rule 9 Validation).<br>- **TH3 (Tiền mặt: Số tiền khách nộp nhỏ hơn Số tiền phải thu)**: Hệ thống highlight viền đỏ ô Số tiền khách nộp, hiển thị thông báo lỗi *"Số tiền khách nộp phải lớn hơn hoặc bằng số tiền phải thu"* và focus vào ô nhập.<br>- **TH4 (Chuyển khoản: Số tiền ghi Có nhỏ hơn Số tiền phải thu)**: Hệ thống highlight viền đỏ ô Số tiền ghi Có, hiển thị thông báo lỗi *"Số tiền ghi Có phải lớn hơn hoặc bằng số tiền phải thu"* và focus vào ô nhập.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Lưu thông tin xác nhận thu phí (với Chuyển khoản: lưu thông tin đối soát khoản ghi Có; với Miễn phí: lưu căn cứ miễn phí).<br>+ Cập nhật khoản phải thu sang "Đã thu" (Tiền mặt, Chuyển khoản; Số tiền đã thu = Số tiền phải thu) hoặc "Miễn phí".<br>+ Sinh số biên lai/chứng từ và liên kết với Mã hồ sơ.<br>+ Chuyển hồ sơ sang trạng thái "Chờ giải quyết"; hồ sơ hiển thị tại [Tab Hồ sơ chờ nhập liệu - Kiểm tra và xử lý hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Kiem_tra_va_xu_ly_ho_so_Can_bo.md).<br>+ Ghi lịch sử trạng thái và Audit log (người thực hiện, thời điểm, hình thức thanh toán, số tiền, trạng thái trước/sau).<br>+ Hiển thị [MSG-SUC-UCPS-002] (Tiền mặt, Chuyển khoản) hoặc [MSG-SUC-UCPS-003] (Miễn phí), đóng popup và tải lại danh sách. |
| 5 | Xác nhận & In biên lai | Nút | Hệ thống kiểm tra và xử lý giống chức năng Chỉ xác nhận thu; **TH Hợp lệ**: sau khi xác nhận thành công, hệ thống mở [MH04 - Popup Biên lai thu phí, lệ phí](#mh04). |

---

<a id="mh04"></a>
#### 4.3.2.21.5. MH04 - Popup Biên lai thu phí, lệ phí

##### 4.3.2.21.5.1. Màn hình

![Biên lai thu phí lệ phí](images/UCPS013_MH04_Bien_lai_thu_phi_le_phi.png)

##### 4.3.2.21.5.2. Mô tả thông tin trên màn hình

- Toàn bộ thông tin biên lai ở chế độ chỉ đọc, không cho phép sửa trực tiếp trên popup.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tiêu ngữ và thông tin biên lai** | - | - | - | |
| Tên cơ quan | String(255) | - | Theo cấu hình đơn vị | Control UI: Label, chỉ đọc, hiển thị bên trái phần đầu biên lai.<br>- Ví dụ: "BỘ TƯ PHÁP / CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC". |
| Quốc hiệu, tiêu ngữ | String(255) | - | "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM / Độc lập - Tự do - Hạnh phúc" | Control UI: Label, chỉ đọc, hiển thị bên phải phần đầu biên lai. |
| Ký hiệu | String(50) | - | "BLĐT/2026" hoặc "MPĐT/2026" | Control UI: Label, chỉ đọc.<br>- "BLĐT/[Năm]" với khoản Đã thu; "MPĐT/[Năm]" với khoản Miễn phí. |
| Số | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Số biên lai/chứng từ do hệ thống sinh. |
| Tiêu đề biên lai | String(100) | - | "BIÊN LAI THU PHÍ, LỆ PHÍ" | Control UI: Label, chỉ đọc, căn giữa, in hoa; dòng dưới hiển thị "(Bản điện tử / Mã QR)". |
| **II. Thông tin người nộp phí** | - | - | - | |
| Cơ quan thu phí | String(255) | - | "Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước" | Control UI: Label, chỉ đọc. |
| Mã số thuế cơ quan | String(50) | - | Theo cấu hình đơn vị | Control UI: Label, chỉ đọc.<br>- Chưa có dữ liệu hiển thị dòng chấm. |
| Người nộp phí | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Theo Người yêu cầu/Người nộp. |
| Mã số thuế/CCCD | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chưa có dữ liệu hiển thị dòng chấm. |
| Địa chỉ | String(500) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Chưa có dữ liệu hiển thị dòng chấm. |
| **III. Bảng khoản thu** | - | - | - | Control UI: Bảng dữ liệu, chỉ đọc. |
| STT | Integer(10) | - | Theo thứ tự | Control UI: Label, chỉ đọc. |
| Nội dung khoản thu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Mệnh giá (VNĐ) | Decimal(18,0) | - | Theo biểu phí | Control UI: Label, chỉ đọc. |
| Số tiền (VNĐ) | Decimal(18,0) | - | Theo số tiền đã thu/miễn phí | Control UI: Label, chỉ đọc. |
| Tổng cộng tiền phí, lệ phí thanh toán | Decimal(18,0) | - | Theo số tiền đã thu/miễn phí | Control UI: Label, chỉ đọc, đơn vị VNĐ. |
| Số tiền bằng chữ | String(500) | - | Hệ thống tự sinh | Control UI: Label, chỉ đọc.<br>- Đọc số tiền thành chữ tiếng Việt, kết thúc bằng "đồng chẵn./.". |
| Ngày tháng năm | Date | - | Ngày xác nhận thu phí | Control UI: Label, chỉ đọc, dạng "Ngày ... tháng ... năm ...". |
| Tổ chức thu phí | String(100) | - | "TỔ CHỨC THU PHÍ / (Chữ ký số)" | Control UI: Label, chỉ đọc, khu vực ký số cuối biên lai. |
| **IV. Thanh nút chức năng** | - | - | - | Gồm:<br>+ Đóng<br>+ In biên lai |

##### 4.3.2.21.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Hệ thống đóng popup và quay lại màn hình trước đó. |
| 2 | In biên lai | Nút | - **TH1 (Khoản chưa ở trạng thái "Đã thu" hoặc "Miễn phí")**: Hệ thống hiển thị [MSG-WRN-UCPS-002] và không in.<br>- **TH Hợp lệ**: Hệ thống gửi lệnh in biên lai theo mẫu đang hiển thị và ghi Audit log thao tác in (cho phép in lại nhiều lần). |

---

<a id="mh05"></a>
#### 4.3.2.21.6. MH05 - Popup Xác nhận hoàn phí

##### 4.3.2.21.6.1. Màn hình

![Xác nhận hoàn phí](images/TP_MH05_Xac_nhan_hoan_phi.png)

##### 4.3.2.21.6.2. Mô tả thông tin trên màn hình

- **Quy chuẩn hiển thị Popup**: Thiết kế kích thước chiều ngang lớn (`min(850px, 94vw)`), bố cục các trường dữ liệu dạng 2 cột song song (Grid 50%-50%), khoảng cách lề chuẩn 24px; Tiêu đề (Header) và Nút bấm (Footer) cố định ở đầu và chân popup (Sticky), chỉ cuộn độc lập phần thân nội dung (Modal body, `max-height: 80vh; overflow-y: auto`).
- **Quy chuẩn kiểm tra dữ liệu (Rule 9 Validation)**: Khi bấm "Xác nhận hoàn phí", nếu có trường bắt buộc chưa nhập hoặc không hợp lệ, hệ thống highlight viền đỏ ô nhập (class `.is-invalid`), hiển thị thông báo lỗi màu đỏ ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập lỗi đầu tiên. Tuyệt đối không dùng thông báo dạng Alert hay Toast.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin khoản phải hoàn** | - | - | - | Hiển thị dạng khối thẻ tóm tắt ở đầu popup để Cán bộ kế toán đối chiếu trước khi xác nhận. |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Click mở [MH02 - Màn hình Chi tiết khoản phải thu/khoản phải hoàn](#mh02). |
| Mã khoản thu gốc | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Liên kết tới biên lai/chứng từ thu phí ban đầu. |
| Lý do phát sinh hoàn phí | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Lấy theo lý do từ chối hồ sơ. |
| Số tiền phải hoàn | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc, hiển thị màu xanh nổi bật.<br>- Định dạng phân tách hàng nghìn, đơn vị VNĐ. |
| **II. Thông tin hoàn phí** | - | - | - | |
| Người được hoàn phí | String(255) | Có | Người nộp phí ban đầu | Control UI: Input text.<br>- Cho phép điều chỉnh nếu khác người nộp ban đầu; khi điều chỉnh, bắt buộc nhập lý do tại trường Ghi chú. |
| Hình thức hoàn phí | Enum(String(50)) | Có | Chuyển khoản | Control UI: Radio button.<br>Gồm:<br>+ Tiền mặt<br>+ Chuyển khoản |
| Số tiền hoàn thực tế | Decimal(18,0) | Có | Bằng Số tiền phải hoàn | Control UI: Input number.<br>- Tự động định dạng phân tách hàng nghìn khi nhập.<br>- Không được lớn hơn Số tiền phải hoàn. |
| Thông tin nhận chuyển khoản | Text(1000) | Có (khi Chuyển khoản) | Trống | Control UI: Textarea.<br>- Chỉ hiển thị và bắt buộc khi Hình thức hoàn phí là "Chuyển khoản" (số tài khoản, ngân hàng, chủ tài khoản nhận tiền). |
| Số chứng từ hoàn phí | String(100) | Có | Trống | Control UI: Input text.<br>- Số phiếu chi/số chứng từ kế toán hoặc số bút toán hoàn phí. |
| Ngày hoàn phí | Date | Có | Ngày hiện tại | Control UI: Datepicker (`dd/mm/yyyy`). |
| Tài liệu chứng từ | File | Không | Chưa chọn tệp | Control UI: Upload file.<br>- Nút "Chọn tệp"; hiển thị tên tệp cùng link "Xem file" và "Xóa" sau khi chọn tệp.<br>- Chấp nhận định dạng .pdf, .jpg, .jpeg, .png; tối đa 20MB/tệp. |
| Ghi chú | Text(1000) | Không | Trống | Control UI: Textarea.<br>- Bắt buộc nhập lý do khi điều chỉnh Người được hoàn phí khác với ban đầu. |
| **III. Thanh nút chức năng** | - | - | - | Control UI: Thanh nút cố định ở cuối popup (Sticky footer).<br>Gồm:<br>+ Hủy bỏ<br>+ Lưu nháp<br>+ Xác nhận hoàn phí |

##### 4.3.2.21.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Nút | Hệ thống đóng popup, không thay đổi trạng thái khoản phải hoàn. |
| 2 | Lưu nháp | Nút | Hệ thống lưu thông tin đang nhập; khoản phải hoàn giữ nguyên trạng thái hiện tại. |
| 3 | Xác nhận hoàn phí | Nút | - **TH1 (Khoản không ở trạng thái "Chờ hoàn phí" hoặc "Cần bổ sung chứng từ")**: Hệ thống hiển thị [MSG-ERR-UCPS-006] và không xác nhận.<br>- **TH2 (Bỏ trống trường bắt buộc)**: Hệ thống highlight viền đỏ ô nhập lỗi (class `.is-invalid`), hiển thị thông báo lỗi *"Đây là trường bắt buộc"* ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập lỗi đầu tiên (Rule 9 Validation).<br>- **TH3 (Số tiền hoàn thực tế lớn hơn Số tiền phải hoàn)**: Hệ thống highlight viền đỏ ô Số tiền hoàn thực tế, hiển thị thông báo lỗi *"Số tiền hoàn thực tế không được lớn hơn Số tiền phải hoàn"* và focus vào ô nhập.<br>- **TH4 (Thay đổi người nhận nhưng không nhập ghi chú)**: Hệ thống highlight viền đỏ ô Ghi chú, hiển thị thông báo lỗi *"Vui lòng nhập lý do điều chỉnh Người được hoàn phí tại Ghi chú"* và focus vào ô nhập.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Lưu kết quả hoàn phí (hình thức, số tiền hoàn, người nhận, chứng từ).<br>+ Cập nhật khoản phải hoàn sang "Đã hoàn".<br>+ Sinh chứng từ hoàn phí và ghi lịch sử tài chính của hồ sơ, Audit log.<br>+ Hiển thị [MSG-SUC-SYS-001], đóng popup và tải lại danh sách. |

---

<a id="mh06"></a>
#### 4.3.2.21.7. MH06 - Popup Chứng từ hoàn phí

##### 4.3.2.21.7.1. Màn hình

![Chứng từ hoàn phí](images/TP_MH06_Chung_tu_hoan_phi.png)

##### 4.3.2.21.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Thông tin cơ quan hoàn phí | Text(1000) | - | Theo cấu hình đơn vị | Control UI: Label, chỉ đọc.<br>- Tên đơn vị, mã đơn vị và thông tin liên hệ. |
| Số chứng từ hoàn phí | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Mã hồ sơ | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Người được hoàn phí | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Số tiền hoàn | Decimal(18,0) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị kèm số tiền bằng chữ. |
| Lý do hoàn phí | Text(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Ngày hoàn phí | Date | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Chữ ký/xác nhận | Text(1000) | - | Theo cấu hình đơn vị | Control UI: Label, chỉ đọc, khu vực ký/xác nhận của đơn vị. |
| **Thanh nút chức năng** | - | - | - | Gồm:<br>+ Đóng<br>+ In chứng từ<br>+ Xuất PDF |

##### 4.3.2.21.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Hệ thống đóng popup và quay lại màn hình trước đó. |
| 2 | In chứng từ | Nút | Hệ thống gửi lệnh in chứng từ hoàn phí và ghi Audit log thao tác in. |
| 3 | Xuất PDF | Nút | Hệ thống xuất chứng từ hoàn phí ra file PDF và tải về máy. |
