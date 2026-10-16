#### 4.3.1.2. Quản lý nhóm người dùng

##### 4.3.1.2.1. Mục đích
Cho phép quản lý danh mục nhóm người dùng và cơ chế phân quyền kế thừa trong hệ thống, bao gồm:
- Tra cứu, tìm kiếm và hiển thị danh sách các nhóm người dùng.
- Khởi tạo mới, cập nhật thông tin nhóm và gán danh sách vai trò cho nhóm (hệ thống tự động cộng dồn/union quyền hạn của các vai trò).
- Xem trước (Preview) Cây chức năng phân quyền của nhóm ở chế độ chỉ đọc.
- Quản lý danh sách tài khoản người dùng được gán vào nhóm và gán bổ sung tài khoản.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

<a id="nnd-pham-vi-don-vi"></a>
*c. Phạm vi dữ liệu theo đơn vị*
- Tài khoản Cán bộ, Cơ quan có thẩm quyền được hiển thị và được chọn để gán vào nhóm theo phân cấp quản lý của người dùng đang đăng nhập: chỉ gồm tài khoản thuộc Đơn vị mà người dùng trực thuộc và các Đơn vị cấp dưới trực thuộc; không gồm tài khoản thuộc Đơn vị cấp trên hoặc Đơn vị cùng cấp khác. Quy tắc thống nhất với [Phạm vi dữ liệu theo đơn vị - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-pham-vi-don-vi).
- Tài khoản Khách hàng không thuộc Đơn vị nên không áp dụng phạm vi theo đơn vị.

---

<a id="nnd-mh01"></a>
##### 4.3.1.2.2. MH01 - Màn hình Tra cứu nhóm người dùng

###### 4.3.1.2.2.1. Màn hình

![Màn hình Tra cứu nhóm người dùng](images/UC603.01.MH01.png)

###### 4.3.1.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Danh sách nhóm** | - | - | - | Khối tìm kiếm và danh sách nhóm người dùng trong hệ thống. |
| Tìm kiếm nhóm | String(255) | Không | Trống | Control UI: Input text, placeholder "Tìm kiếm theo Tên hoặc Mã nhóm...".<br>- Nhập từ khóa để tìm kiếm nhanh (Live-search), gần đúng theo Tên nhóm hoặc Mã nhóm. |
| Danh sách nhóm | List | - | - | Control UI: Danh mục cuộn dọc.<br>- **Mặc định khi truy cập:** Hiển thị toàn bộ danh sách nhóm người dùng và tự động chọn nhóm đầu tiên trong danh sách để hiển thị dữ liệu sang Panel phải.<br>- Click chọn vào dòng nhóm: Đánh dấu dòng đang chọn và hiển thị thông tin nhóm, Cây chức năng phân quyền cộng dồn cùng danh sách người dùng của nhóm tương ứng sang Panel phải.<br>- Khi không tìm thấy kết quả phù hợp với từ khóa tìm kiếm: Hiển thị dòng thông báo theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Tên nhóm | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Mã nhóm | String(50) | - | - | Control UI: Text hiển thị (Read-only, tiền tố `Mã: `). |
| Loại tài khoản áp dụng | Enum(String(50)) | - | - | Control UI: Badge (Read-only).<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |
| Thao tác nhanh | - | - | - | Control UI: Nhóm nút thao tác (hiển thị khi rê chuột vào dòng nhóm).<br>- Sửa<br>- Xóa |
| **II. Panel bên phải: Chi tiết nhóm** | - | - | - | Khối xem thông tin vai trò, Cây chức năng phân quyền cộng dồn và danh sách người dùng của nhóm đang chọn. |
| Dòng thông báo hướng dẫn | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị khi ở trạng thái Chưa chọn nhóm: *"Vui lòng chọn một Nhóm người dùng ở bên trái để xem thông tin và người dùng."* |
| Tiêu đề chi tiết | String(255) | - | Theo nhóm chọn | Control UI: Text hiển thị (Read-only).<br>- Hiển thị "Nhóm: [Tên nhóm]". |
| **Hệ thống Tabs điều hướng** | Tab | - | Tab Vai trò & Quyền hạn | Control UI: Tab chuyển đổi giao diện.<br>Gồm:<br>+ Tab Vai trò & Quyền hạn (Mặc định chọn)<br>+ Tab Người dùng được gán |
| **II.1. Tab Vai trò & Quyền hạn** | - | - | - | Khối hiển thị danh sách các vai trò đã gán cho nhóm và Cây chức năng phân quyền kế thừa cộng dồn (Union) ở chế độ chỉ đọc. |
| Danh sách vai trò đã gán | List Tag | - | Theo nhóm chọn | Control UI: Danh sách thẻ nhãn (Tags) hiển thị tên các vai trò được gán cho nhóm.<br>- **Tiêu đề khối**: `Vai trò đã gán ([Tổng số vai trò])`. |
| Thanh thống kê số lượng chức năng | Badge | - | Tự động đếm | Control UI: Nhóm Badge hiển thị tổng số lượng chức năng kế thừa từ các vai trò trong nhóm (Union) theo thời gian thực.<br>- **Các chỉ số thống kê**:<br>  + **Tổng số**: `Tổng số: X / Y chức năng`.<br>  + **Website Cán bộ**: `Website Cán bộ: X_cb / Y_cb`.<br>  + **Website Khách hàng**: `Website Khách hàng: X_kh / Y_kh`.<br>  + **Mobile App**: `Mobile App: X_app / Y_app`. |
| Tìm kiếm | String(255) | Không | Trống | Control UI: Input text, placeholder "Nhập tên tính năng".<br>- Cho phép tìm kiếm gần đúng theo tên tính năng, không phân biệt hoa thường; lọc trực tiếp trên Cây chức năng phân quyền. |
| Cây chức năng phân quyền | Tree | - | Theo nhóm chọn | Control UI: Cây phân cấp đa cấp ở chế độ chỉ đọc (Read-only), hiển thị danh sách các chức năng kế thừa cộng dồn (Union) từ tất cả các vai trò đã gán cho nhóm.<br>- **Quy tắc hiển thị**: Chỉ hiển thị các chức năng được tích chọn, cộng dồn theo các vai trò đã gán cho nhóm. Không hiển thị các chức năng không được chọn. Các phân hệ hoặc nhóm chức năng không có chức năng nào được chọn cũng được ẩn đi.<br>- **Thông tin hiển thị**: Cấu trúc phân cấp 3 cấp giống Cây chức năng phân quyền tại [MH01 - Màn hình Thiết lập Vai trò & Phân quyền - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-mh01), ở chế độ chỉ đọc, không có Checkbox chọn quyền trực tiếp.<br>- **Cơ chế hoạt động & tương tác**:<br>  + Hỗ trợ đóng/mở từng nhánh cây (Accordion / Collapse).<br>  + Tìm kiếm: hệ thống chỉ hiển thị các node có tên tính năng chứa từ khóa và các node cha của chúng, tự động mở rộng nhánh cây chứa kết quả. |
| **II.2. Tab Người dùng được gán** | - | - | - | Khối quản lý danh sách người dùng thuộc nhóm. Tiêu đề Tab hiển thị tổng số người dùng đang thuộc nhóm: `Người dùng được gán ([Tổng số])`.<br>- Bộ lọc tìm kiếm người dùng (Mã tài khoản, Tên tài khoản, Email (Tên đăng nhập) và placeholder tương ứng), bảng người dùng được gán và các thao tác: giống Tab Người dùng được gán tại [MH01 - Màn hình Thiết lập Vai trò & Phân quyền - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-mh01), áp dụng cho nhóm đang chọn.<br>- Nút `Gán người dùng` mở [MH03 - Popup Gán người dùng vào nhóm - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-mh03). |

###### 4.3.1.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới | Button | Nằm tại Header Panel trái. Mở [MH02 - Popup Thêm mới / Cập nhật nhóm người dùng - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-mh02) ở chế độ Thêm mới. |
| 2 | Tìm kiếm nhóm | Input text | Khi người dùng nhập từ khóa: Hệ thống tự động lọc trực tiếp danh sách nhóm ở Panel trái theo Tên hoặc Mã nhóm khớp từ khóa. |
| 3 | Chọn nhóm | Click Item | Khi click vào một nhóm trong danh sách:<br>- Đánh dấu dòng nhóm đang chọn.<br>- Cập nhật tiêu đề Panel phải thành "Nhóm: [Tên nhóm]".<br>- Tải danh sách các vai trò đã gán, cây chức năng phân quyền cộng dồn và tính toán số lượng chức năng kế thừa trên Thanh thống kê tại Tab Vai trò & Quyền hạn.<br>- Tải danh sách các tài khoản người dùng đang thuộc nhóm này sang Tab Người dùng được gán. |
| 4 | Sửa nhóm | Button | Hiển thị khi rê chuột vào dòng nhóm. Mở [MH02 - Popup Thêm mới / Cập nhật nhóm người dùng - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-mh02) ở chế độ Chỉnh sửa cho nhóm tương ứng. |
| 5 | Xóa nhóm | Button | Hiển thị khi rê chuột vào dòng nhóm. Mở [POPUP-CFM-001 - Popup Xác nhận xóa nhóm người dùng - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-popup-xoa) để xác nhận thao tác xóa nhóm người dùng. |
| 6 | Chuyển Tab | Tab click | Chuyển đổi qua lại giữa 2 Tab tại Panel phải: Tab "Vai trò & Quyền hạn" và Tab "Người dùng được gán". Tiêu đề Tab "Người dùng được gán" hiển thị tổng số người dùng thuộc nhóm theo thời gian thực. |
| 7 | Tìm kiếm (Tab Vai trò & Quyền hạn) | Input text | Lọc trực tiếp các chức năng trên Cây chức năng phân quyền ở Tab Vai trò & Quyền hạn theo tên tính năng chứa từ khóa (tìm kiếm gần đúng, không phân biệt hoa thường). |
| 8 | Tìm kiếm / Xóa bộ lọc / Xem chi tiết tài khoản (Tab Người dùng được gán) | Button / Row Click | Xử lý như chức năng cùng tên tại [MH01 - Màn hình Thiết lập Vai trò & Phân quyền - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-mh01), áp dụng cho danh sách người dùng của nhóm. |
| 9 | Gán người dùng | Button | Nằm tại Header Tab Người dùng được gán. Mở [MH03 - Popup Gán người dùng vào nhóm - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-mh03). |
| 10 | Gỡ khỏi nhóm | Button | Mở popup xác nhận gỡ người dùng khỏi nhóm, nội dung *"Bạn có chắc chắn muốn gỡ người dùng [Tên người dùng] khỏi nhóm [Tên nhóm] không?"*; xử lý như [MH04 - Popup Xác nhận gỡ vai trò khỏi người dùng - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-mh04), áp dụng cho nhóm. |

---

<a id="nnd-mh02"></a>
##### 4.3.1.2.3. MH02 - Popup Thêm mới / Cập nhật nhóm người dùng

###### 4.3.1.2.3.1. Màn hình

![Popup Thêm mới / Cập nhật nhóm người dùng](images/UC603.02.MH01.png)

###### 4.3.1.2.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã nhóm | String(50) | Có | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Text hiển thị (Read-only).<br>- Tự động sinh mã định danh khi thêm mới. Không cho phép sửa. |
| Tên nhóm | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text, placeholder "Nhập tên nhóm người dùng...".<br>- Nhập tên nhóm người dùng.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Loại tài khoản áp dụng | Enum(String(50)) | Có | `-- Chọn loại tài khoản áp dụng --` (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>- Thêm mới: hiển thị giá trị mặc định `-- Chọn loại tài khoản áp dụng --` (chưa chọn), người dùng bắt buộc chọn 01 giá trị.<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền<br>- Khi thay đổi Loại tài khoản, danh sách Vai trò bên dưới tự động lọc hiển thị các vai trò thuộc Loại tài khoản tương ứng. |
| Danh sách Vai trò | List Checkbox | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Khối danh sách các vai trò kèm Checkbox.<br>- **Phần đầu khối (Header)**: Hiển thị dòng thống kê số lượng: `Đã chọn: X / Y vai trò` (X là số vai trò đang được tích chọn, Y là tổng số vai trò khả dụng theo Loại tài khoản) kèm ô tìm kiếm vai trò, placeholder "Tìm kiếm vai trò theo tên/mã...", tìm kiếm gần đúng theo Tên hoặc Mã vai trò.<br>- **Mỗi dòng vai trò trong danh sách hiển thị**:<br>  + Checkbox chọn/bỏ chọn vai trò.<br>  + Mã vai trò.<br>  + Tên vai trò.<br>  + Số lượng chức năng của vai trò: `(X chức năng)`<br>- **Cơ chế cập nhật**:<br>  + Khi tích chọn hoặc bỏ chọn một vai trò: Hệ thống tự động cập nhật số lượng trên dòng thống kê `Đã chọn: X / Y vai trò`, đồng thời tự động cộng dồn/hợp nhất quyền (Union) và cập nhật ngay lên Cây chức năng phân quyền bên cạnh theo thời gian thực (Real-time). |
| Tìm kiếm | String(255) | Không | Trống | Control UI: Input text, placeholder "Nhập tên tính năng".<br>- Cho phép tìm kiếm gần đúng theo tên tính năng, không phân biệt hoa thường; lọc các chức năng trên Cây chức năng phân quyền. |
| Cây chức năng phân quyền | Tree | - | Tự động cộng dồn | Control UI: Cây phân cấp hiển thị xem trước (Preview) toàn bộ chức năng kế thừa cộng dồn (Union) từ các vai trò đang được tích chọn ở chế độ chỉ đọc.<br>- **Phía trên cây**: Có Thanh thống kê số lượng chức năng kế thừa (`Tổng số: X / Y chức năng`, `Website Cán bộ: X_cb / Y_cb`, `Website Khách hàng: X_kh / Y_kh`, `Mobile App: X_app / Y_app`).<br>- **Quy tắc hiển thị**: Chỉ hiển thị các chức năng được tích chọn, cộng dồn theo các vai trò đang chọn (không hiển thị các chức năng không được chọn). Khi tích chọn hoặc bỏ chọn vai trò bên Danh sách vai trò, cây tự động cập nhật danh sách chức năng hiển thị theo thời gian thực (Real-time). Các phân hệ hoặc nhóm chức năng không có chức năng nào được chọn cũng được ẩn đi.<br>- **Thông tin hiển thị**: Cấu trúc phân cấp 3 cấp giống Cây chức năng phân quyền tại [MH01 - Màn hình Thiết lập Vai trò & Phân quyền - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-mh01), hiển thị ở chế độ chỉ đọc (Read-only).<br>- **Cơ chế hoạt động**:<br>  + Tự động cộng dồn và cập nhật theo thời gian thực (Real-time) mỗi khi tích chọn hoặc bỏ chọn vai trò ở Danh sách vai trò.<br>  + Hỗ trợ đóng/mở từng nhánh cây và lọc tìm kiếm theo tên tính năng. |

###### 4.3.1.2.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Đánh dấu lỗi ô đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai độ dài dữ liệu)**: Tên nhóm vượt quá 255 ký tự (vi phạm [BR-VAL-003]) $\rightarrow$ Đánh dấu lỗi, hiển thị thông báo lỗi [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Tên nhóm` đối với các bản ghi đang ở trạng thái `Đang hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính nhóm đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin nhóm và danh sách vai trò liên kết vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách nhóm tại [MH01 - Màn hình Tra cứu nhóm người dùng - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-mh01). |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |

---

<a id="nnd-popup-xoa"></a>
##### 4.3.1.2.4. [POPUP-CFM-001] - Popup Xác nhận xóa nhóm người dùng

###### 4.3.1.2.4.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(100) | - | Xác nhận xóa | Control UI: Text hiển thị (Header). |
| Nội dung cảnh báo | String(500) | - | Theo bản ghi | Control UI: Text hiển thị.<br>- Hiển thị nội dung: *"Bạn có chắc chắn muốn xóa nhóm [Tên nhóm]?"* kèm dòng cảnh báo: *"Hành động này không thể hoàn tác."*. |

###### 4.3.1.2.4.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xóa | Button | Khi người dùng click chọn "Xóa":<br>- **TH Xóa lỗi (Thất bại)**:<br>  + **TH Nhóm đang được sử dụng**: Nhóm đang có tài khoản người dùng trực thuộc $\rightarrow$ Hệ thống chặn xóa, đóng popup và hiển thị thông báo lỗi [MSG-ERR-SYS-003].<br>  + **TH Lỗi hệ thống**: Quá trình xử lý xóa bản ghi phát sinh lỗi kết nối cơ sở dữ liệu hoặc lỗi hệ thống $\rightarrow$ Hệ thống không xóa bản ghi, đóng popup và hiển thị thông báo lỗi [MSG-ERR-SYS-001] để người dùng thử lại sau.<br>- **TH Xóa thành công**: Nhóm không có người dùng đang gán $\rightarrow$ Hệ thống thực hiện xóa nhóm khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-006], đóng popup và làm mới danh sách nhóm tại Panel trái của [MH01 - Màn hình Tra cứu nhóm người dùng - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-mh01). Nếu nhóm vừa xóa đang được chọn ở Panel phải thì đưa Panel phải về trạng thái Chưa chọn nhóm (hiển thị thông báo Empty State). |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác xóa và giữ nguyên dữ liệu nhóm. |

---

<a id="nnd-mh03"></a>
##### 4.3.1.2.5. MH03 - Popup Gán người dùng vào nhóm

###### 4.3.1.2.5.1. Màn hình

Hiển thị dưới dạng Modal Popup "Gán người dùng vào nhóm: [Tên nhóm]".

###### 4.3.1.2.5.2. Mô tả thông tin trên màn hình

- Bộ lọc tìm kiếm tài khoản (Loại tài khoản, Mã tài khoản, Họ và tên (Tên), Email (Tên đăng nhập), Đơn vị và placeholder tương ứng), bảng kết quả tìm kiếm tài khoản và dòng `Đã chọn: [Số lượng] tài khoản`: giống [MH03 - Popup Gán người dùng vào vai trò - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-mh03).
- **Đơn vị**: Danh sách chỉ gồm Đơn vị mà người dùng đang đăng nhập trực thuộc và các Đơn vị cấp dưới trực thuộc, theo [Phạm vi dữ liệu theo đơn vị - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-pham-vi-don-vi).
- **Loại tài khoản**: Mặc định theo `Loại tài khoản áp dụng` của nhóm đang chọn.
- **Bảng kết quả tìm kiếm tài khoản**: Chỉ gồm tài khoản thuộc phạm vi dữ liệu theo đơn vị nêu trên, trạng thái `Đang hoạt động` và chưa thuộc nhóm đang chọn.

###### 4.3.1.2.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm / Xóa bộ lọc / Chọn tài khoản | Button / Checkbox | Xử lý như chức năng cùng tên tại [MH03 - Popup Gán người dùng vào vai trò - Thiết lập Vai trò & Phân quyền - Quản trị hệ thống (Website Quản trị)](Quan_ly_vai_tro.md#vt-mh03), trong phạm vi dữ liệu theo đơn vị. |
| 2 | Lưu | Button | - **TH Chưa chọn tài khoản**: hiển thị thông báo lỗi [MSG-ERR-SYS-004].<br>- **TH Hợp lệ**: Hệ thống gán toàn bộ tài khoản đã tích chọn vào nhóm đang xem, lưu CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-002], đóng popup và làm mới bảng người dùng tại Tab Người dùng được gán của [MH01 - Màn hình Tra cứu nhóm người dùng - Quản lý nhóm người dùng - Quản trị hệ thống (Website Quản trị)](#nnd-mh01). |
| 3 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác gán và giữ nguyên dữ liệu. |
