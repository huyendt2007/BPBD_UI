#### 4.3.1.2. Quản lý nhóm người dùng

##### 4.3.1.2.1. Mục đích
Cho phép quản lý danh mục nhóm người dùng và cơ chế phân quyền kế thừa trong hệ thống, bao gồm:
- Tra cứu, tìm kiếm và hiển thị danh sách các nhóm người dùng (Khách hàng, Cán bộ nội bộ, Cán bộ cơ quan ngoài ngành...).
- Khởi tạo mới, cập nhật thông tin nhóm và gán danh sách vai trò cho nhóm (hệ thống tự động cộng dồn/union quyền hạn của các vai trò).
- Xem trước (Preview) Cây chức năng phân quyền của nhóm ở chế độ chỉ đọc.
- Quản lý danh sách tài khoản người dùng được gán vào nhóm và gán bổ sung tài khoản.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.2.2. MH01 - Màn hình Tra cứu nhóm người dùng

###### 4.3.1.2.2.1. Màn hình

![Màn hình Tra cứu nhóm người dùng](images/UC603.01.MH01.png)

###### 4.3.1.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Danh sách nhóm** | - | - | - | Khối tìm kiếm và danh sách nhóm người dùng trong hệ thống. |
| Tìm kiếm nhóm | String(255) | Không | Trống | Control UI: Input text kèm icon kính lúp.<br>- Nhập từ khóa để tìm kiếm nhanh (Live-search) theo Tên nhóm hoặc Mã nhóm. |
| Danh sách nhóm | List | - | - | Control UI: Danh mục cuộn dọc.<br>- **Mặc định khi truy cập:** Hiển thị toàn bộ danh sách nhóm người dùng và tự động chọn nhóm đầu tiên trong danh sách để hiển thị dữ liệu sang Panel phải.<br>- Click chọn vào dòng nhóm: Highlight màu nền và hiển thị thông tin nhóm, Cây chức năng phân quyền cộng dồn cùng danh sách người dùng của nhóm tương ứng sang Panel phải.<br>- Khi không tìm thấy kết quả phù hợp với từ khóa tìm kiếm: Hiển thị dòng thông báo theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Tên nhóm | String(255) | - | - | Control UI: Text hiển thị (Read-only, chữ đậm). |
| Mã nhóm | String(50) | - | - | Control UI: Text hiển thị (Read-only, tiền tố `Mã: `). |
| Loại tài khoản áp dụng | Enum(String(50)) | - | - | Control UI: Badge nhãn màu hiển thị (Read-only).<br>Gồm:<br>+ Cán bộ (màu xanh lá)<br>+ Khách hàng (màu xanh dương)<br>+ Cơ quan có thẩm quyền (màu cam) |
| Thao tác nhanh | - | - | - | Control UI: Nhóm icon thao tác (hiển thị khi hover vào dòng nhóm).<br>- Sửa (Icon bút chì)<br>- Xóa (Icon thùng rác) |
| **II. Panel bên phải: Chi tiết nhóm** | - | - | - | Khối xem thông tin vai trò, Cây chức năng phân quyền cộng dồn và danh sách người dùng của nhóm đang chọn. |
| Dòng thông báo hướng dẫn | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị khi ở trạng thái Chưa chọn nhóm: *"Vui lòng chọn một Nhóm người dùng ở bên trái để xem thông tin và người dùng."* |
| Tiêu đề chi tiết | String(255) | - | Nhóm: [Tên nhóm] | Control UI: Text hiển thị (Read-only).<br>- Tự động hiển thị Tên nhóm đang được chọn. |
| **Hệ thống Tabs điều hướng** | Tab | - | Tab Vai trò & Quyền hạn | Control UI: Tab chuyển đổi giao diện.<br>Gồm:<br>+ Tab Vai trò & Quyền hạn (Mặc định chọn)<br>+ Tab Người dùng được gán (Tiêu đề Tab hiển thị tổng số người dùng đang thuộc nhóm: `Người dùng được gán ([Tổng số])`) |
| **II.1. Tab Vai trò & Quyền hạn** | - | - | - | Khối hiển thị danh sách các vai trò đã gán cho nhóm và Cây chức năng phân quyền kế thừa cộng dồn (Union) ở chế độ chỉ đọc. |
| Danh sách vai trò đã gán | List Tag | - | Theo nhóm chọn | Control UI: Danh sách Thẻ nhãn (Tags/Badges) hiển thị các vai trò được gán cho nhóm.<br>- **Tiêu đề khối**: `Vai trò đã gán ([Tổng số vai trò])`.<br>- Mỗi vai trò hiển thị dạng Tag/Badge nổi bật kèm icon vai trò và tên vai trò. |
| Thanh thống kê số lượng chức năng | Badge | - | Tự động đếm | Control UI: Nhóm Badge hiển thị tổng số lượng chức năng kế thừa từ các vai trò trong nhóm (Union) theo thời gian thực.<br>- **Các chỉ số thống kê**:<br>  + **Tổng số**: `Tổng số: X / Y chức năng` (Badge nền xanh dương nhạt, viền xanh dương, chữ xanh đậm).<br>  + **Website Cán bộ**: `Website Cán bộ: X_cb / Y_cb`.<br>  + **Website Khách hàng**: `Website Khách hàng: X_kh / Y_kh`.<br>  + **Mobile App**: `Mobile App: X_app / Y_app`.<br>- **Quy tắc hiển thị trạng thái màu sắc**: Giống với quy tắc hiển thị tại Quản lý vai trò (tham chiếu mục 4.3.1.1.2 tài liệu `Quan_ly_vai_tro.md`). |
| Tìm kiếm chức năng nhanh | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa lọc nhanh trên Cây chức năng phân quyền theo Tên chức năng. |
| Cây chức năng phân quyền | Tree | - | Theo nhóm chọn | Control UI: Cây phân cấp đa cấp ở chế độ chỉ đọc (Read-only), hiển thị danh sách các chức năng kế thừa cộng dồn (Union) từ tất cả các vai trò đã gán cho nhóm.<br>- **Quy tắc hiển thị**: Chỉ hiển thị các chức năng được tích chọn, cộng dồn theo các vai trò đã gán cho nhóm. Không hiển thị các chức năng không được chọn. Các phân hệ hoặc nhóm chức năng không có chức năng nào được chọn cũng sẽ được ẩn đi.<br>- **Thông tin hiển thị và cách hiển thị**: Cấu trúc phân cấp 3 cấp giống với Cây chức năng phân quyền tại Quản lý vai trò (tham chiếu mục 4.3.1.1.2 tài liệu `Quan_ly_vai_tro.md`), ở chế độ chỉ đọc (Read-only), không có Checkbox chọn quyền trực tiếp.<br>- **Cơ chế hoạt động & tương tác**:<br>  + Hỗ trợ đóng/mở từng nhánh cây (Accordion / Collapse).<br>  + Tìm kiếm chức năng nhanh: Lọc theo Tên chức năng, hệ thống tự động mở rộng nhánh cây chứa kết quả tìm kiếm. |
| **II.2. Tab Người dùng được gán** | - | - | - | Khối quản lý danh sách người dùng thuộc nhóm. Tiêu đề Tab hiển thị tổng số người dùng đang thuộc nhóm: `Người dùng được gán ([Tổng số])`.<br>- **Toàn bộ thông tin mô tả trường, bộ lọc tìm kiếm, bảng người dùng và các thao tác gán/gỡ người dùng**: Tham chiếu và giống với Phần quản lý vai trò (tham chiếu mục 4.3.1.1.2 tài liệu `Quan_ly_vai_tro.md`). |

###### 4.3.1.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới | Button | Nằm tại Header Panel trái. Mở **MH02 - Popup Thêm mới / Cập nhật nhóm người dùng** ở chế độ Thêm mới. |
| 2 | Tìm kiếm nhóm | Input text | Khi người dùng nhập từ khóa: Hệ thống tự động lọc trực tiếp danh sách nhóm ở Panel trái theo Tên hoặc Mã nhóm khớp từ khóa. |
| 3 | Chọn nhóm | Click Item | Khi click vào một nhóm trong danh sách:<br>- Đánh dấu trạng thái đang chọn (Highlight màu nền và viền xanh).<br>- Cập nhật tiêu đề Panel phải thành *"Nhóm: [Tên nhóm]"*.<br>- Tải danh sách các vai trò đã gán, cây chức năng phân quyền cộng dồn và tính toán số lượng chức năng kế thừa trên Thanh thống kê tại Tab Vai trò & Quyền hạn.<br>- Tải danh sách các tài khoản người dùng đang thuộc nhóm này sang Tab Người dùng được gán. |
| 4 | Sửa nhóm | Icon | Hiển thị khi hover vào dòng nhóm. Mở **MH02 - Popup Thêm mới / Cập nhật nhóm người dùng** ở chế độ Chỉnh sửa cho nhóm tương ứng. |
| 5 | Xóa nhóm | Icon | Hiển thị khi hover vào dòng nhóm. Mở **[POPUP-CFM-001]** để xác nhận thao tác xóa nhóm người dùng. |
| 6 | Chuyển Tab | Tab click | Chuyển đổi qua lại giữa 2 Tab tại Panel phải: Tab "Vai trò & Quyền hạn" và Tab "Người dùng được gán". Tiêu đề Tab "Người dùng được gán" hiển thị tổng số người dùng thuộc nhóm theo thời gian thực. |
| 7 | Tìm kiếm chức năng nhanh | Input text | Lọc trực tiếp các chức năng trên Cây chức năng phân quyền ở Tab Vai trò & Quyền hạn theo từ khóa. |

---

##### 4.3.1.2.3. MH02 - Popup Thêm mới / Cập nhật nhóm người dùng

###### 4.3.1.2.3.1. Màn hình

![Popup Thêm mới / Cập nhật nhóm người dùng](images/UC603.02.MH01.png)

###### 4.3.1.2.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã nhóm | String(50) | Có | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Text hiển thị (Read-only).<br>- Tự động sinh mã định danh khi thêm mới. Không cho phép sửa. |
| Tên nhóm | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên nhóm người dùng.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Loại tài khoản áp dụng | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền<br>- Khi thay đổi Loại tài khoản, danh sách Vai trò bên dưới sẽ tự động lọc hiển thị các vai trò thuộc Loại tài khoản tương ứng. |
| Danh sách Vai trò | List Checkbox | Không | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Khối danh sách các vai trò hiển thị dạng bảng cuộn hoặc danh sách thẻ chọn kèm Checkbox.<br>- **Phần đầu khối (Header)**: Hiển thị dòng thống kê số lượng: `Đã chọn: X / Y vai trò` (X là số vai trò đang được tích chọn, Y là tổng số vai trò khả dụng theo Loại tài khoản) kèm ô tìm kiếm nhanh vai trò theo tên/mã.<br>- **Mỗi dòng/mục vai trò trong danh sách hiển thị**:<br>  + Checkbox chọn/bỏ chọn vai trò.<br>  + Mã vai trò (ví dụ: `VT001`).<br>  + Tên vai trò (chữ in đậm, ví dụ: `Lãnh đạo Cục`).<br>  + Số lượng chức năng của vai trò: `(X chức năng)`<br>- **Cơ chế cập nhật**:<br>  + Khi tích chọn hoặc bỏ chọn một vai trò: Hệ thống tự động cập nhật số lượng trên dòng thống kê `Đã chọn: X / Y vai trò`, đồng thời tự động cộng dồn/hợp nhất quyền (Union) và cập nhật ngay lập tức lên Cây chức năng phân quyền bên cạnh theo thời gian thực (Real-time). |
| Tìm kiếm chức năng nhanh | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa để lọc các chức năng trên Cây chức năng phân quyền theo Tên chức năng. |
| Cây chức năng phân quyền | Tree | - | Tự động cộng dồn | Control UI: Cây phân cấp hiển thị xem trước (Preview) toàn bộ chức năng kế thừa cộng dồn (Union) từ các vai trò đang được tích chọn ở chế độ chỉ đọc.<br>- **Phía trên cây**: Có Thanh thống kê số lượng chức năng kế thừa (`Tổng số: X / Y chức năng`, `Website Cán bộ: X_cb / Y_cb`, `Website Khách hàng: X_kh / Y_kh`, `Mobile App: X_app / Y_app`).<br>- **Quy tắc hiển thị**: Chỉ hiển thị các chức năng được tích chọn, cộng dồn theo các vai trò đang chọn (không hiển thị các chức năng không được chọn). Khi tích chọn hoặc bỏ chọn vai trò bên Danh sách vai trò, cây sẽ tự động cập nhật danh sách chức năng hiển thị theo thời gian thực (Real-time). Các phân hệ hoặc nhóm chức năng không có chức năng nào được chọn cũng sẽ được ẩn đi.<br>- **Thông tin hiển thị và cách hiển thị**: Cấu trúc phân cấp 3 cấp giống với Cây chức năng phân quyền tại Quản lý vai trò (tham chiếu mục 4.3.1.1.2 tài liệu `Quan_ly_vai_tro.md`), hiển thị ở chế độ chỉ đọc (Read-only).<br>- **Cơ chế hoạt động**:<br>  + Tự động cộng dồn và cập nhật theo thời gian thực (Real-time) mỗi khi tích chọn hoặc bỏ chọn vai trò ở Danh sách vai trò.<br>  + Hỗ trợ đóng/mở từng nhánh cây và lọc tìm kiếm theo Tên chức năng. |

###### 4.3.1.2.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu lại | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai độ dài dữ liệu)**: Tên nhóm vượt quá 255 ký tự (vi phạm [BR-VAL-003]) $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Tên nhóm` đối với các bản ghi đang ở trạng thái `Đang hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính nhóm đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin nhóm và danh sách vai trò liên kết vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách nhóm tại MH01. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |

---

##### 4.3.1.2.4. [POPUP-CFM-001] - Popup Xác nhận xóa nhóm người dùng

###### 4.3.1.2.4.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(100) | - | Xác nhận xóa | Control UI: Text hiển thị (Header). |
| Nội dung cảnh báo | String(500) | - | Theo bản ghi | Control UI: Text hiển thị.<br>- Hiển thị nội dung: *"Bạn có chắc chắn muốn xóa nhóm [Tên nhóm]?"* kèm dòng cảnh báo màu đỏ: *"Hành động này không thể hoàn tác."*. |

###### 4.3.1.2.4.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xóa | Button | Khi người dùng click chọn "Xóa":<br>- **TH Xóa lỗi (Thất bại)**:<br>  + **TH Nhóm đang được sử dụng**: Nhóm đang có tài khoản người dùng trực thuộc $\rightarrow$ Hệ thống chặn xóa, đóng popup và hiển thị thông báo lỗi [MSG-ERR-SYS-003].<br>  + **TH Lỗi hệ thống**: Quá trình xử lý xóa bản ghi phát sinh lỗi kết nối cơ sở dữ liệu hoặc lỗi hệ thống $\rightarrow$ Hệ thống không xóa bản ghi, đóng popup và hiển thị thông báo lỗi [MSG-ERR-SYS-001] để người dùng thử lại sau.<br>- **TH Xóa thành công**: Nhóm không có người dùng đang gán $\rightarrow$ Hệ thống thực hiện xóa nhóm khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-006], đóng popup và làm mới danh sách nhóm tại Panel trái của MH01. Nếu nhóm vừa xóa đang được chọn ở Panel phải thì đưa Panel phải về trạng thái Chưa chọn nhóm (hiển thị thông báo Empty State). |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác xóa và giữ nguyên dữ liệu nhóm. |
