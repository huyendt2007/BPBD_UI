#### 4.3.3.16. UC465-466 - Hợp tác quốc tế trong công tác BTNN

##### 4.3.3.16.1. Mục đích

\- Cho phép cán bộ Bộ Tư pháp (Cục Bồi thường nhà nước) ghi nhận, quản lý và tra cứu thông tin các hoạt động hợp tác quốc tế trong công tác bồi thường nhà nước (BTNN) theo khoản 8 Điều 44 dự thảo Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Trách nhiệm bồi thường của Nhà nước.

\- Nội dung chỉ phục vụ nội bộ cán bộ quản lý, không công khai ra Website khách hàng.

*a. Phân quyền*

\- Cán bộ Bộ Tư pháp: được tra cứu, xem chi tiết, thêm mới, sửa, xóa bản ghi.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website quản trị.

\- Người dùng được phân quyền truy cập màn hình `Hợp tác quốc tế trong công tác BTNN`.

\- Quốc gia đối tác tham chiếu Danh mục Quốc tịch/Quốc gia [DM_09]. Đơn vị chủ trì tham chiếu Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`.

---

##### 4.3.3.16.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    A[Danh sách hoạt động hợp tác quốc tế BTNN] --> B[Tìm kiếm / Xóa bộ lọc / Sắp xếp / Phân trang / Kết xuất Excel]
    A --> G[Row click] --> K[Xem chi tiết]
    K --> E
    K --> F
    A --> C[Thêm mới] --> D[Lưu thông tin]
    A --> E[Sửa] --> D
    A --> F[Xóa] --> X[Popup Xác nhận xóa]
```

---

##### 4.3.3.16.3. MH01 - Màn hình Danh sách hoạt động hợp tác quốc tế BTNN

###### 4.3.3.16.3.1. Màn hình

![MH01 - Màn hình Danh sách hoạt động hợp tác quốc tế BTNN](images/UC465_466_MH01_Danh_sach_hop_tac_quoc_te.png)

###### 4.3.3.16.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Tên hoạt động hợp tác quốc tế | String(255) | Không | Trống | Control UI: Text input.<br>- Placeholder: "Nhập tên hoạt động hợp tác quốc tế...".<br>- Tìm gần đúng; không phân biệt hoa thường, có dấu/không dấu. |
| Đối tác/Tổ chức quốc tế | String(255) | Không | Trống | Control UI: Text input.<br>- Placeholder: "Nhập đối tác/Tổ chức quốc tế...".<br>- Tìm gần đúng; không phân biệt hoa thường, có dấu/không dấu. |
| Quốc gia đối tác | Enum(String(100)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Quốc tịch/Quốc gia [DM_09]. |
| Hình thức hợp tác | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Hội thảo/Tọa đàm<br>+ Trao đổi đoàn công tác<br>+ Ký kết văn bản hợp tác<br>+ Hỗ trợ kỹ thuật<br>+ Khác |
| Từ ngày thực hiện | Date | Không | Trống | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy". |
| Đến ngày thực hiện | Date | Không | Trống | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy". |
| **II. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải Trang 1.<br>- Sắp xếp mặc định: theo "Ngày tạo" giảm dần.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Theo trang hiện tại | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Tên hoạt động hợp tác quốc tế | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Đối tác/Tổ chức quốc tế | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Quốc gia đối tác | Enum(String(100)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Hình thức hợp tác | Enum(String(50)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời gian thực hiện | String(50) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Hiển thị dạng `Từ ngày - Đến ngày`, định dạng `dd/mm/yyyy`. |
| Thao tác | - | - | - | Control UI: Icon<br>+ Sửa<br>+ Xóa<br>- Cột cố định bên phải lưới khi cuộn ngang. |
| Phân trang | - | - | 20 bản ghi/trang | Phân trang, chuyển trang và cấu hình số dòng hiển thị theo quy tắc chung của hệ thống. |

###### 4.3.3.16.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày thực hiện` lớn hơn `Đến ngày thực hiện`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH2 - Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí đã nhập/chọn và đưa về Trang 1. |
|  |  |  | **TH3 - Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa (`colspan`), in nghiêng với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*, các nút điều hướng trang ở trạng thái khóa mờ. |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa toàn bộ tiêu chí tìm kiếm đã nhập/chọn, thiết lập các ô lọc về giá trị mặc định. |
| 3 | Thêm mới | Button | Hệ thống mở [MH03 - Màn hình Thêm mới/Sửa hoạt động hợp tác quốc tế BTNN](#433165-mh03---màn-hình-thêm-mớisửa-hoạt-động-hợp-tác-quốc-tế-btnn) ở chế độ Thêm mới với form thông tin để trống. |
| 4 | Kết xuất Excel | Button | Kết xuất danh sách ra tệp Excel theo [Quy chuẩn Kết xuất Excel dùng chung - Danh mục và Phụ lục - Tài liệu tổng hợp](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md):<br>- Phạm vi: toàn bộ bản ghi thỏa mãn điều kiện tìm kiếm hiện hành, không giới hạn theo trang.<br>- Cột xuất theo thứ tự lưới, không gồm cột Thao tác: STT, Tên hoạt động hợp tác quốc tế, Đối tác/Tổ chức quốc tế, Quốc gia đối tác, Hình thức hợp tác, Thời gian thực hiện.<br>- Tên tệp: `yyyyMMdd_Danh_sach_hop_tac_quoc_te_BTNN.xlsx`. |
|  |  |  | **TH1 - Không có dữ liệu**: Hệ thống hiển thị [MSG-WRN-SYS-001] và không tải tệp. |
|  |  |  | **TH2 - Có dữ liệu**: Hệ thống tải tệp Excel về máy người dùng. |
| 5 | Sắp xếp cột | Header cột | Áp dụng trên các cột:<br>+ Tên hoạt động hợp tác quốc tế<br>+ Đối tác/Tổ chức quốc tế<br>+ Quốc gia đối tác |
|  |  |  | **TH1 - Chọn lại cột đang sắp xếp**: Hệ thống đảo chiều sắp xếp tăng dần/giảm dần và cập nhật icon mũi tên trên tiêu đề cột. |
|  |  |  | **TH2 - Chọn cột khác**: Hệ thống sắp xếp danh sách theo cột được chọn. |
| 6 | Row click | Row click | Khi người dùng click vào bất kỳ vị trí nào trên dòng dữ liệu (trừ các nút thao tác), hệ thống mở [MH02 - Màn hình Chi tiết hoạt động hợp tác quốc tế BTNN](#433164-mh02---màn-hình-chi-tiết-hoạt-động-hợp-tác-quốc-tế-btnn). |
| 7 | Sửa | Icon button | Hệ thống mở [MH03 - Màn hình Thêm mới/Sửa hoạt động hợp tác quốc tế BTNN](#433165-mh03---màn-hình-thêm-mớisửa-hoạt-động-hợp-tác-quốc-tế-btnn) ở chế độ Sửa với dữ liệu hiện tại của bản ghi được điền sẵn. |
| 8 | Xóa | Icon button | Hệ thống mở [Popup Xác nhận xóa](#433166-popup-xác-nhận-xóa). |
| 9 | Phân trang & chuyển trang | Pagination | Phân trang, chuyển trang và cấu hình số dòng hiển thị theo quy tắc chung của hệ thống. |

---

##### 4.3.3.16.4. MH02 - Màn hình Chi tiết hoạt động hợp tác quốc tế BTNN

###### 4.3.3.16.4.1. Màn hình

![MH02 - Màn hình Chi tiết hoạt động hợp tác quốc tế BTNN](images/UC465_466_MH02_Chi_tiet_hop_tac_quoc_te.png)

###### 4.3.3.16.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | - | - | - | Control UI: Label<br>Hiển thị "Xem chi tiết hợp tác quốc tế". |
| **I. Thông tin chung** |  |  |  |  |
| Người tạo/Cán bộ phụ trách | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Ngày tạo/cập nhật | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Chế độ | - | - | - | Control UI: Label<br>Hiển thị "Chỉ xem". |
| **II. Thông tin hoạt động hợp tác quốc tế** |  |  |  |  |
| Tên hoạt động hợp tác quốc tế | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Đối tác/Tổ chức quốc tế | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Quốc gia đối tác | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Hình thức hợp tác | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Đơn vị chủ trì | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Từ ngày thực hiện | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Đến ngày thực hiện | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Nội dung/Kết quả hợp tác | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| **III. Tài liệu đính kèm** |  |  |  |  |
| Tài liệu đính kèm | - | - | - | Control UI: File link<br>Theo dữ liệu bản ghi. |

###### 4.3.3.16.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | Khi click vào liên kết "Xem file" của tài liệu đính kèm, hệ thống mở nội dung file tại một tab trình duyệt mới. |
| 2 | Sửa | Button | Hệ thống mở [MH03 - Màn hình Thêm mới/Sửa hoạt động hợp tác quốc tế BTNN](#433165-mh03---màn-hình-thêm-mớisửa-hoạt-động-hợp-tác-quốc-tế-btnn) ở chế độ Sửa với dữ liệu hiện tại của bản ghi được điền sẵn. |
| 3 | Xóa | Button | Hệ thống mở [Popup Xác nhận xóa](#433166-popup-xác-nhận-xóa); nếu người dùng chọn `Đồng ý`, hệ thống xóa bản ghi, đóng màn hình chi tiết và quay lại [MH01 - Màn hình Danh sách hoạt động hợp tác quốc tế BTNN](#433163-mh01---màn-hình-danh-sách-hoạt-động-hợp-tác-quốc-tế-btnn). |
| 4 | Đóng | Button | Khi người dùng click nút "Đóng" ở góc phải tiêu đề hoặc ở chân màn hình, hệ thống đóng màn hình chi tiết và quay lại [MH01 - Màn hình Danh sách hoạt động hợp tác quốc tế BTNN](#433163-mh01---màn-hình-danh-sách-hoạt-động-hợp-tác-quốc-tế-btnn). |

---

##### 4.3.3.16.5. MH03 - Màn hình Thêm mới/Sửa hoạt động hợp tác quốc tế BTNN

###### 4.3.3.16.5.1. Màn hình

![MH03 - Màn hình Thêm mới/Sửa hoạt động hợp tác quốc tế BTNN](images/UC465_466_MH03_Them_moi_sua_hop_tac_quoc_te.png)

###### 4.3.3.16.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | - | - | Theo ngữ cảnh | Control UI: Label<br>Hiển thị "Thêm mới hợp tác quốc tế" hoặc "Sửa hợp tác quốc tế". |
| **I. Thông tin chung** |  |  |  |  |
| Người tạo/Cán bộ phụ trách | - | - | Theo tài khoản đăng nhập | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Ngày tạo/cập nhật | - | - | Theo dữ liệu hệ thống | Control UI: Label<br>Định dạng `dd/mm/yyyy`. |
| Chế độ | - | - | Theo ngữ cảnh | Control UI: Label<br>Hiển thị "Thêm mới" hoặc "Sửa". |
| **II. Thông tin hoạt động hợp tác quốc tế** |  |  |  |  |
| Tên hoạt động hợp tác quốc tế | String(255) | Có | Trống | Control UI: Text input.<br>- Placeholder: "Nhập tên hoạt động hợp tác quốc tế...". |
| Đối tác/Tổ chức quốc tế | String(255) | Có | Trống | Control UI: Text input.<br>- Placeholder: "Nhập đối tác/tổ chức quốc tế...". |
| Quốc gia đối tác | Enum(String(100)) | Có | Trống | Control UI: Combobox.<br>- Tham chiếu Danh mục Quốc tịch/Quốc gia [DM_09]. |
| Hình thức hợp tác | Enum(String(50)) | Có | Hội thảo/Tọa đàm | Control UI: Combobox.<br>Gồm:<br>+ Hội thảo/Tọa đàm<br>+ Trao đổi đoàn công tác<br>+ Ký kết văn bản hợp tác<br>+ Hỗ trợ kỹ thuật<br>+ Khác |
| Đơn vị chủ trì | Enum(String(255)) | Có | Trống | Control UI: Combobox.<br>- Tham chiếu Danh mục các đơn vị trên hệ thống [DM_DON_VI]. |
| Từ ngày thực hiện | Date | Có | Trống | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy". |
| Đến ngày thực hiện | Date | Có | Trống | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy".<br>- Lớn hơn hoặc bằng `Từ ngày thực hiện` theo [BR-VAL-007]. |
| Nội dung/Kết quả hợp tác | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập nội dung/kết quả hợp tác...". |
| **III. Tài liệu đính kèm** |  |  |  |  |
| Tài liệu đính kèm | List(File) | Không | Trống | Control UI: Bảng tài liệu đính kèm gồm các cột `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác`; nút `Thêm tài liệu` dưới bảng.<br>- Cột `Tên tài liệu, văn bản`: Text input. Placeholder: "Nhập tên tài liệu, văn bản".<br>- Cột `File đính kèm`: khi dòng chưa có file hiển thị nút `Tải file`; khi đã có file hiển thị tên file.<br>- Cột `Thao tác` gồm:<br>+ Xem file (khóa mờ khi dòng chưa có file)<br>+ Xóa<br>- Áp dụng [BR-FILE-010]. |

###### 4.3.3.16.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu thông tin | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001] (chưa nhập/chọn các trường có dấu `*`). Hệ thống viền đỏ các ô lỗi, hiển thị "Đây là trường bắt buộc" ngay dưới từng ô và focus vào ô lỗi đầu tiên. |
|  |  |  | **TH2 - Khoảng ngày không hợp lệ**: `Đến ngày thực hiện` nhỏ hơn `Từ ngày thực hiện`, vi phạm [BR-VAL-007]. Hệ thống hiển thị [MSG-ERR-VAL-007] ngay dưới ô và không cho phép lưu. |
|  |  |  | **TH3 - Trùng bản ghi**: Bản ghi được xác định bởi các thông tin `Tên hoạt động hợp tác quốc tế`, `Đối tác/Tổ chức quốc tế`, `Từ ngày thực hiện`. Nếu các thông tin này trùng với một bản ghi khác đang tồn tại, hệ thống viền đỏ các ô tương ứng, hiển thị cảnh báo "Hoạt động hợp tác quốc tế đã tồn tại trong hệ thống (trùng Tên hoạt động hợp tác quốc tế, Đối tác/Tổ chức quốc tế và Từ ngày thực hiện)" dưới ô `Tên hoạt động hợp tác quốc tế` và không cho phép lưu.<br>- So sánh sau khi bỏ khoảng trắng thừa, không phân biệt hoa thường.<br>- Ở chế độ Sửa, hệ thống bỏ qua chính bản ghi đang sửa. |
|  |  |  | **TH4 - Hợp lệ - Thêm mới**: Hệ thống lưu bản ghi, đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-SYS-003]. |
|  |  |  | **TH5 - Hợp lệ - Sửa**: Hệ thống cập nhật bản ghi, đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-SYS-002]. |
| 2 | Tải lên | Button | Hệ thống mở trình chọn file cho dòng tài liệu tương ứng; sau khi chọn, hiển thị tên file tại cột `File đính kèm`. |
| 3 | Xem file | Link | Hệ thống mở file của dòng tài liệu tại một tab trình duyệt mới. |
| 4 | Xóa | Icon button | Hệ thống xóa dòng tài liệu khỏi bảng ngay, không hiển thị popup xác nhận. |
| 5 | Thêm tài liệu | Button | Hệ thống thêm 01 dòng tài liệu trống vào cuối bảng tài liệu đính kèm. |
| 6 | Hủy bỏ | Button | Khi người dùng click nút "Hủy bỏ" ở chân màn hình hoặc nút "Đóng" ở góc phải tiêu đề, hệ thống đóng màn hình, không lưu dữ liệu và quay lại [MH01 - Màn hình Danh sách hoạt động hợp tác quốc tế BTNN](#433163-mh01---màn-hình-danh-sách-hoạt-động-hợp-tác-quốc-tế-btnn). |

---

##### 4.3.3.16.6. Popup Xác nhận xóa

###### 4.3.3.16.6.1. Màn hình

![Popup Xác nhận xóa](images/UC465_466_POPUP_Xac_nhan.png)

###### 4.3.3.16.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label<br>Hiển thị "Xác nhận". |
| Nội dung xác nhận | - | - | - | Control UI: Label<br>Áp dụng message xác nhận [MSG-CFM-SYS-001]. |

###### 4.3.3.16.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đồng ý | Button | Hệ thống đóng popup và thực hiện xóa:<br>+ Xóa bản ghi: xóa vĩnh viễn bản ghi khỏi hệ thống, tải lại danh sách và hiển thị [MSG-SUC-SYS-002].<br>+ Xóa tài liệu đính kèm: xóa dòng tài liệu khỏi bảng. |
| 2 | Hủy bỏ | Button | Khi người dùng click nút "Hủy bỏ" hoặc biểu tượng đóng ở góc phải tiêu đề popup, hệ thống đóng popup và không thực hiện thao tác. |
