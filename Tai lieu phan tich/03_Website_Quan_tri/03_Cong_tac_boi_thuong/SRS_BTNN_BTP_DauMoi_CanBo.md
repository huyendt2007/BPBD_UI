#### 4.3.3.19. UC501-502 - Quản lý thông tin đầu mối Lãnh đạo, công chức thực hiện công tác BTNN tại địa phương

##### 4.3.3.19.1. Mục đích

\- Cho phép cán bộ nghiệp vụ BTNN (Bộ Tư pháp) ghi nhận, quản lý và tra cứu danh sách đầu mối Lãnh đạo và công chức trực tiếp thực hiện công tác bồi thường nhà nước (BTNN) tại các Sở Tư pháp địa phương, phục vụ liên hệ, phối hợp công tác và theo dõi công tác BTNN theo Điều 8-15 Thông tư 08/2019/TT-BTP.

\- Nội dung chỉ phục vụ nội bộ cán bộ quản lý, không công khai ra Website khách hàng.

*a. Phân quyền*

\- Cán bộ nghiệp vụ BTNN (Bộ Tư pháp): được tra cứu, xem chi tiết, thêm mới, chỉnh sửa, xóa bản ghi.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website quản trị.

\- Người dùng được phân quyền truy cập màn hình `Quản lý thông tin đầu mối Lãnh đạo, công chức thực hiện công tác BTNN tại địa phương`.

\- Tỉnh/Thành phố Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Đơn vị tham chiếu Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`.

---

##### 4.3.3.19.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    A[Danh sách đầu mối Lãnh đạo, công chức BTNN] --> B[Tìm kiếm / Xóa bộ lọc / Phân trang]
    A --> C[Thêm mới]
    C --> D[Lưu thông tin]
    A --> E[Chỉnh sửa]
    E --> D
    A --> F[Xóa]
    A --> G[Click dòng dữ liệu / Xem]
```

---

##### 4.3.3.19.3. MH01 - Màn hình Danh sách đầu mối Lãnh đạo, công chức thực hiện công tác BTNN

###### 4.3.3.19.3.1. Màn hình

![MH01 - Màn hình Danh sách đầu mối Lãnh đạo, công chức thực hiện công tác BTNN](images/UC501_502_MH01_Danh_sach_dau_moi_btnn.png)

###### 4.3.3.19.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa | String(255) | Không | Trống | Tìm kiếm gần đúng theo `Họ và tên` hoặc `Số điện thoại`. |
| Tỉnh/Thành phố | Enum(String(100)) | Không | Tất cả | Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. |
| Vai trò phụ trách | Enum(String(50)) | Không | Tất cả | \- Giá trị gồm:<br>+ Tất cả<br>+ Lãnh đạo phụ trách công tác BTNN<br>+ Công chức đầu mối |
| Trạng thái | Enum(String(50)) | Không | Tất cả | \- Giá trị gồm:<br>+ Tất cả<br>+ Đang phụ trách<br>+ Đã ngừng phụ trách |
| **II. Bảng danh sách kết quả** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* |
| Cột: STT | Integer(10) | Không | Theo trang hiện tại | Chỉ đọc. Căn giữa, tăng theo phân trang. |
| Cột: Tỉnh/Thành phố | Enum(String(100)) | Không | Theo dữ liệu hệ thống | Chỉ đọc. Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. |
| Cột: Đơn vị | String(255) | Không | Theo dữ liệu hệ thống | Chỉ đọc. |
| Cột: Họ và tên | String(100) | Không | Theo dữ liệu hệ thống | Chỉ đọc. |
| Cột: Chức vụ | String(100) | Không | Theo dữ liệu hệ thống | Chỉ đọc. |
| Cột: Vai trò phụ trách | Enum(String(50)) | Không | Theo dữ liệu hệ thống | Chỉ đọc. |
| Cột: Số điện thoại | String(20) | Không | Theo dữ liệu hệ thống | Chỉ đọc. |
| Cột: Email | String(255) | Không | Theo dữ liệu hệ thống | Chỉ đọc. Hiển thị `-` nếu chưa nhập. |
| Cột: Trạng thái | Enum(String(50)) | Không | Theo dữ liệu hệ thống | Chỉ đọc. Hiển thị badge màu theo giá trị. |
| Cột: Thao tác | String(255) | Không | Theo dữ liệu | Chỉ đọc. Gồm icon `Chỉnh sửa`, `Xóa`. |
| Phân trang | String(255) | Không | `20 bản ghi/trang` | Tuân thủ quy chuẩn phân trang chung [BR-UI-001]. |

###### 4.3.3.19.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Hệ thống lọc danh sách theo các tiêu chí đã nhập, cập nhật lưới kết quả và đưa về trang 1.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Button | Hệ thống đặt lại toàn bộ tiêu chí lọc về giá trị mặc định và tải lại danh sách. |
| 3 | Thêm mới | Button | Hệ thống mở **MH02 - Thêm mới/Chỉnh sửa đầu mối Lãnh đạo, công chức BTNN** ở chế độ thêm mới. |
| 4 | Chỉnh sửa | Icon button | Hệ thống mở **MH02 - Thêm mới/Chỉnh sửa đầu mối Lãnh đạo, công chức BTNN** ở chế độ chỉnh sửa. |
| 5 | Xóa | Icon button | Hệ thống mở **Popup Xác nhận** với nội dung [MSG-CFM-SYS-001]. Nếu xác nhận, hệ thống xóa vĩnh viễn bản ghi khỏi hệ thống và hiển thị [MSG-SUC-SYS-002]. |
| 6 | Click dòng dữ liệu | Row click | Hệ thống mở **MH02 - Thêm mới/Chỉnh sửa đầu mối Lãnh đạo, công chức BTNN** ở chế độ chỉ xem. |

---

##### 4.3.3.19.4. MH02 - Màn hình Thêm mới/Chỉnh sửa đầu mối Lãnh đạo, công chức BTNN

###### 4.3.3.19.4.1. Màn hình

![MH02 - Màn hình Thêm mới/Chỉnh sửa đầu mối Lãnh đạo, công chức BTNN](images/UC501_502_MH02_Nhap_lieu_dau_moi_btnn.png)

###### 4.3.3.19.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | Theo ngữ cảnh | Chỉ đọc. Hiển thị `THÊM MỚI ĐẦU MỐI LÃNH ĐẠO, CÔNG CHỨC BTNN` hoặc `CHỈNH SỬA ĐẦU MỐI LÃNH ĐẠO, CÔNG CHỨC BTNN`. |
| Tỉnh/Thành phố | Enum(String(100)) | Có | Trống | Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Áp dụng rule bắt buộc [BR-VAL-001]. |
| Đơn vị | Enum(String(255)) | Có | Trống | Tham chiếu Danh mục Cơ quan, Đơn vị giải quyết [DM_DON_VI]. Cho phép tìm kiếm nhanh theo `Mã đơn vị` hoặc `Tên đơn vị`; áp dụng tìm gần đúng. Áp dụng rule bắt buộc [BR-VAL-001]. |
| Họ và tên | String(100) | Có | Trống | Áp dụng rule bắt buộc [BR-VAL-001]. |
| Chức vụ | String(100) | Có | Trống | Áp dụng rule bắt buộc [BR-VAL-001]. |
| Vai trò phụ trách | Enum(String(50)) | Có | `Công chức đầu mối` | \- Giá trị gồm:<br>+ Lãnh đạo phụ trách công tác BTNN<br>+ Công chức đầu mối |
| Số điện thoại liên hệ | String(20) | Có | Trống | Áp dụng rule số điện thoại [BR-VAL-003]. |
| Email | String(255) | Không | Trống | Áp dụng rule Email [BR-VAL-002] khi có dữ liệu. |
| Ngày bắt đầu phụ trách | Date | Có | Ngày hiện tại | Áp dụng rule ngày quá khứ [BR-VAL-008]. |
| Trạng thái | Enum(String(50)) | Có | `Đang phụ trách` | \- Giá trị gồm:<br>+ Đang phụ trách<br>+ Đã ngừng phụ trách |
| Ghi chú | Text(500) | Không | Trống | Ghi chú thêm nếu cần. |
| Hủy bỏ | - | Không | Hiển thị | Chi tiết nghiệp vụ xem tại bảng Chức năng trên màn hình. |
| Lưu thông tin | - | Không | Hiển thị | Chi tiết nghiệp vụ xem tại bảng Chức năng trên màn hình. |

###### 4.3.3.19.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng màn hình, không lưu dữ liệu và quay lại **MH01 - Danh sách đầu mối Lãnh đạo, công chức thực hiện công tác BTNN**. |
| 2 | Lưu thông tin | Button | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001]. Hệ thống tô viền đỏ ô trống đầu tiên và hiển thị [MSG-ERR-VAL-001]. Không cho phép lưu. |
|  |  |  | TH2 (`Số điện thoại liên hệ` không đúng định dạng): Vi phạm [BR-VAL-003], hiển thị [MSG-ERR-VAL-003]. Không cho phép lưu. |
|  |  |  | TH3 (`Email` có dữ liệu nhưng không đúng định dạng): Vi phạm [BR-VAL-002], hiển thị [MSG-ERR-VAL-002]. Không cho phép lưu. |
|  |  |  | TH4 (`Ngày bắt đầu phụ trách` lớn hơn ngày hiện tại): Vi phạm [BR-VAL-008], hiển thị [MSG-ERR-VAL-008]. Không cho phép lưu. |
|  |  |  | TH5 (Hợp lệ - thêm mới): Hệ thống lưu bản ghi, đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-SYS-003]. |
|  |  |  | TH6 (Hợp lệ - chỉnh sửa): Hệ thống cập nhật bản ghi, đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-SYS-002]. |

---

##### 4.3.3.19.5. Popup Xác nhận

###### 4.3.3.19.5.1. Màn hình

![Popup Xác nhận](images/UC501_502_POPUP_Xac_nhan.png)

###### 4.3.3.19.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | Theo thao tác | Chỉ đọc. Hiển thị icon cảnh báo và nội dung xác nhận theo thao tác đang thực hiện. |
| Nội dung xác nhận | Text(2000) | - | Theo thao tác | Chỉ đọc. Áp dụng message xác nhận [MSG-CFM-SYS-001]. |
| Hủy bỏ | - | Không | Hiển thị | Đóng popup, không thực hiện callback. |
| Đồng ý | - | Không | Hiển thị | Xác nhận thực hiện callback của thao tác đã gọi popup. |

###### 4.3.3.19.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng popup xác nhận và không thực hiện thao tác. |
| 2 | Đồng ý | Button | Hệ thống đóng popup xác nhận và xóa vĩnh viễn bản ghi. |

---

##### 4.3.3.19.6. Ghi chú phạm vi đặc tả

\- Bản ghi áp dụng cơ chế xóa vĩnh viễn (hard delete), không lưu lại lịch sử sau khi xóa.

\- Màn hình chỉ phục vụ nội bộ cán bộ quản lý trên Website quản trị, không hiển thị trên Website khách hàng.

\- Mỗi Tỉnh/Thành phố có thể có nhiều bản ghi đầu mối (1 Lãnh đạo phụ trách và một hoặc nhiều Công chức đầu mối); hệ thống không giới hạn số lượng bản ghi theo từng Tỉnh/Thành phố.
