#### 4.3.1.1. Thiết lập Vai trò & Phân quyền

##### 4.3.1.1.1. Mục đích
Cho phép quản lý danh mục vai trò người dùng trong hệ thống, thiết lập phân quyền chức năng và quản trị danh sách người dùng được gán vào từng vai trò, bao gồm:
- Thiết lập, tra cứu danh sách vai trò áp dụng cho các đối tượng (Cán bộ, Khách hàng, Cơ quan có thẩm quyền).
- Khởi tạo mới, cập nhật thông tin vai trò.
- Thiết lập phân quyền trực tiếp các chức năng/menu (đã được khai báo và quản lý tại phần Quản lý chức năng) cho từng vai trò trên 3 phân hệ (Website khách hàng, Ứng dụng Mobile App, Website Cán bộ).
- Quản lý danh sách tài khoản người dùng/cán bộ đang được gán vào từng vai trò.
- Cho phép gán thêm người dùng vào vai trò hoặc gỡ bỏ vai trò khỏi người dùng trực tiếp từ màn hình vai trò.
- Tra cứu nhanh thông tin chi tiết của tài khoản người dùng được gán (chuyển tiếp tới màn hình / popup chi tiết tương ứng theo loại tài khoản Cán bộ, Khách hàng hoặc Cơ quan có thẩm quyền).
- Xóa các vai trò không còn sử dụng.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.1.2. MH01 - Màn hình Thiết lập Vai trò & Phân quyền

###### 4.3.1.1.2.1. Màn hình

![Màn hình Thiết lập Vai trò & Phân quyền](images/UC600.01.MH01.png)

###### 4.3.1.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Danh sách vai trò** | - | - | - | Khối tìm kiếm và danh sách các vai trò trong hệ thống. |
| Tìm kiếm vai trò | String(255) | Không | Trống | Control UI: Input text kèm icon kính lúp.<br>- Nhập từ khóa để tìm kiếm nhanh (Live-search) theo Tên vai trò hoặc Mã vai trò. |
| Danh sách vai trò | List | - | - | Control UI: Danh mục cuộn dọc.<br>- **Mặc định khi truy cập:** Hiển thị toàn bộ danh sách vai trò và tự động chọn vai trò đầu tiên trong danh sách để hiển thị dữ liệu sang Panel phải.<br>- Click chọn vào dòng vai trò: Highlight màu nền và hiển thị dữ liệu phân quyền cùng danh sách người dùng của vai trò tương ứng sang Panel phải.<br>- Khi không tìm thấy kết quả phù hợp với từ khóa tìm kiếm: Hiển thị dòng thông báo theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Tên vai trò | String(255) | - | - | Control UI: Text hiển thị (Read-only, chữ đậm). |
| Mã vai trò | String(50) | - | - | Control UI: Text hiển thị (Read-only, tiền tố `Mã: `). |
| Phạm vi áp dụng | Enum(String(50)) | - | - | Control UI: Badge nhãn màu hiển thị (Read-only).<br>Gồm:<br>+ Cán bộ (màu xanh lá)<br>+ Khách hàng (màu xanh dương)<br>+ Cơ quan có thẩm quyền (màu cam) |
| Thao tác nhanh | - | - | - | Control UI: Nhóm icon thao tác (hiển thị khi hover vào dòng vai trò).<br>- Sửa (Icon bút chì)<br>- Xóa (Icon thùng rác) |
| **II. Panel bên phải: Quản lý Phân quyền & Người dùng** | - | - | - | Khối thiết lập cây phân quyền chức năng và quản lý danh sách người dùng được gán cho vai trò đang chọn. |
| Dòng thông báo hướng dẫn | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Chỉ hiển thị khi ở trạng thái Chưa chọn vai trò: *"Vui lòng chọn một Vai trò ở bên trái để thiết lập quyền và người dùng."* |
| Tiêu đề chi tiết | String(255) | - | Vai trò: [Tên vai trò] | Control UI: Text hiển thị (Read-only).<br>- Tự động hiển thị Tên vai trò đang được chọn (ví dụ: *"Vai trò: Lãnh đạo Cục"*). |
| **Hệ thống Tabs điều hướng** | Tab | - | Tab Phân quyền chức năng | Control UI: Tab chuyển đổi giao diện.<br>Gồm:<br>+ Tab Phân quyền chức năng (Mặc định chọn)<br>+ Tab Người dùng được gán (Tiêu đề Tab hiển thị thông tin tổng số người dùng đang được gán cho vai trò, định dạng: `Người dùng được gán ([Tổng số])`) |
| **II.1. Tab Phân quyền chức năng** | - | - | - | Khối thiết lập cây phân quyền chức năng của vai trò. |
| Thanh thống kê số lượng chức năng | Badge | - | Tự động đếm | Control UI: Nhóm Badge hiển thị số lượng chức năng được gán theo thời gian thực (Real-time).<br>- **Các chỉ số thống kê**:<br>  + **Tổng số**: `Tổng số: X / Y chức năng`<br>  + **Website Cán bộ**: `Website Cán bộ: X_cb / Y_cb`<br>  + **Website Khách hàng**: `Website Khách hàng: X_kh / Y_kh`<br>  + **Mobile App**: `Mobile App: X_app / Y_app`<br>- **Quy tắc hiển thị màu sắc**:<br>  + *Phân hệ có chức năng được chọn* (X > 0): Hiển thị màu sắc nổi bật đặc trưng của từng phân hệ (Website Cán bộ: màu xanh lá, Website Khách hàng: màu xanh dương, Mobile App: màu tím).<br>  + *Phân hệ chưa có chức năng nào được chọn* (X = 0): Hiển thị dạng chữ mờ xám để phân biệt trực quan các phân hệ chưa được phân quyền. |
| Tìm kiếm chức năng nhanh | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa để lọc trực tiếp các chức năng trên cây phân quyền theo Tên hoặc Mã chức năng. |
| Cây chức năng phân quyền | Tree Checkbox | - | Theo vai trò chọn | Control UI: Cây phân cấp đa cấp kèm Checkbox chọn quyền.<br>- **Cấu trúc hiển thị từng node trên cây**:<br>  + **Node Cấp 1 (Phân hệ)**: Icon đóng/mở nhánh (`>` / `v`), Checkbox chọn toàn bộ phân hệ (Cascade), Icon phân hệ (Website Cán bộ, Website Khách hàng, Mobile App), Tên phân hệ (chữ in đậm) và Badge đếm số lượng chức năng: `(X / Y)` (X là số chức năng con được chọn, Y là tổng số chức năng trực thuộc).<br>  + **Node Cấp 2 (Nhóm chức năng / Menu cha)**: Icon đóng/mở nhánh, Checkbox chọn toàn bộ nhóm, Icon thư mục/menu, Tên nhóm chức năng và Badge đếm số lượng chức năng: `(X / Y)`.<br>  + **Node Cấp 3 (Chức năng / Menu con)**: Checkbox chọn quyền và Tên chức năng.<br>- **Cơ chế hoạt động & tương tác**:<br>  + Hỗ trợ đóng/mở từng nhánh cây (Accordion / Collapse).<br>  + Checkbox đa cấp (Cascade Checkbox): Tích/bỏ tích node cha tự động chọn/bỏ chọn tất cả node con; tích/bỏ tích node con tự động cập nhật trạng thái của node cha liên quan và tự động tính toán lại các Badge số đếm trên từng node và Thanh thống kê.<br>  + Tìm kiếm chức năng nhanh: Nhập từ khóa lọc theo Tên chức năng, hệ thống tự động mở rộng nhánh cây chứa kết quả tìm kiếm và highlight từ khóa. |
| Lưu phân quyền | Button | - | - | Control UI: Nút bấm lưu phân quyền.<br>- Luôn hiển thị tại Footer của Tab Phân quyền chức năng. |
| **II.2. Tab Người dùng được gán** | - | - | - | Khối tìm kiếm và danh sách tài khoản người dùng được gán vào vai trò này. Tiêu đề Tab hiển thị tổng số người dùng đang được gán cho vai trò: `Người dùng được gán ([Tổng số])`. |
| **Bộ lọc tìm kiếm người dùng** | - | - | - | Khối các ô nhập tìm kiếm độc lập tại phần đầu của Tab. |
| Mã tài khoản | String(50) | Không | Trống | Control UI: Input text.<br>- Nhập mã tài khoản cần tìm kiếm (ví dụ: `CB0001`, `KH0002`...). |
| Tên tài khoản | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập tên tài khoản hoặc họ và tên cá nhân, tên tổ chức/doanh nghiệp. |
| Email (Tên đăng nhập) | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập địa chỉ Email hoặc Tên đăng nhập của tài khoản. |
| Tìm kiếm | Button | - | - | Control UI: Nút bấm.<br>- Luôn hiển thị tại thanh nút bấm bộ lọc để thực hiện tìm kiếm. |
| Xóa bộ lọc | Button | - | - | Control UI: Nút bấm.<br>- Xóa các tiêu chí lọc đã nhập, đưa về trạng thái mặc định và hiển thị danh sách ban đầu. |
| Gán người dùng | Button | - | - | Control UI: Nút bấm.<br>- Luôn hiển thị tại góc phải thanh công cụ để mở popup gán người dùng vào vai trò. |
| **Bảng người dùng được gán** | Table | - | - | Khối hiển thị danh sách người dùng đang nắm giữ vai trò. |
| STT | Integer | - | - | Control UI: Text hiển thị số thứ tự tăng dần (Read-only, căn giữa). |
| Mã tài khoản | String(50) | - | - | Control UI: Text link (chữ xanh, gạch chân khi hover).<br>- Click vào mã tài khoản hoặc click vào dòng dữ liệu để mở màn hình/popup Xem chi tiết tài khoản tương ứng với Loại tài khoản. |
| Tên | String(255) | - | - | Control UI: Text hiển thị (Read-only, in đậm).<br>- Hiển thị Họ và tên cá nhân hoặc Tên tổ chức/doanh nghiệp. |
| Email (Tên đăng nhập) | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Hiển thị địa chỉ Email hoặc Tên đăng nhập của tài khoản. |
| Loại tài khoản | Enum(String(50)) | - | - | Control UI: Badge nhãn màu hiển thị (Read-only).<br>Gồm:<br>+ Cán bộ (màu xanh lá)<br>+ Khách hàng (màu xanh dương)<br>+ Cơ quan có thẩm quyền (màu cam) |
| Đơn vị | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Với tài khoản Cán bộ: Ghi rõ Tên phòng ban - Tên đơn vị.<br>- Đối với tài khoản Loại Khách hàng: Hiển thị `-`.<br>- Với tài khoản Cơ quan có thẩm quyền: Hiển thị Tên cơ quan hoặc `-`. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge nhãn trạng thái hiển thị (Read-only).<br>Gồm:<br>+ Đang hoạt động (màu xanh lá)<br>+ Bị khóa (màu đỏ) |
| Thao tác | Action Button | - | - | Control UI: Nút thao tác .<br>- Gỡ vai trò. |

###### 4.3.1.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới | Button | Nằm tại Header Panel trái. Mở **MH02 - Popup Thêm mới / Sửa Vai trò** ở chế độ Thêm mới. |
| 2 | Tìm kiếm vai trò | Input text | Khi người dùng nhập từ khóa: Hệ thống tự động lọc trực tiếp danh sách vai trò ở Panel trái theo Tên hoặc Mã vai trò khớp từ khóa. |
| 3 | Chọn vai trò | Click Item | Khi click vào một vai trò trong danh sách:<br>- Đánh dấu trạng thái đang chọn (Highlight màu nền và viền xanh).<br>- Cập nhật tiêu đề Panel phải thành *"Vai trò: [Tên vai trò]"*.<br>- Tải toàn bộ cây phân quyền, tích chọn sẵn các quyền đang sở hữu, tính toán và hiển thị các chỉ số đếm số lượng chức năng trên Thanh thống kê và trên từng node phân hệ.<br>- Tải danh sách các tài khoản người dùng đang được gán vai trò này sang Tab Người dùng được gán. |
| 4 | Sửa vai trò | Icon | Hiển thị khi hover vào dòng vai trò. Mở **MH02 - Popup Thêm mới / Sửa Vai trò** ở chế độ Chỉnh sửa cho vai trò tương ứng. |
| 5 | Xóa vai trò | Icon | Hiển thị khi hover vào dòng vai trò. Mở **[POPUP-CFM-001]** để xác nhận thao tác xóa vai trò. |
| 6 | Chuyển Tab | Tab click | Chuyển đổi qua lại giữa Tab "Phân quyền chức năng" và Tab "Người dùng được gán" cho vai trò đang chọn. Tiêu đề Tab "Người dùng được gán" hiển thị tổng số người dùng đang được gán theo thời gian thực. |
| 7 | Tìm kiếm chức năng nhanh | Input text | Lọc trực tiếp các chức năng trên cây phân quyền theo Tên hoặc Mã chức năng chứa từ khóa. Tự động mở rộng (Expand) các nhánh cây chứa chức năng khớp điều kiện lọc. |
| 8 | Đóng/Mở nhánh cây | Icon | Click vào icon mũi tên (`>`) để đóng/mở các nhánh phân hệ hoặc nhóm chức năng con. |
| 9 | Chọn quyền trên cây | Checkbox | Tích chọn/bỏ chọn quyền hạn cho vai trò. Áp dụng quy tắc Cascade Checkbox (chọn cha tự động chọn con, tích con tự động cập nhật cha). Hệ thống tự động cập nhật số lượng đếm tại Thanh thống kê và các node gốc tương ứng theo thời gian thực (Real-time). |
| 10 | Lưu phân quyền | Button | Nằm tại Footer Tab Phân quyền. Khi click nút "Lưu phân quyền": Lưu danh sách các quyền đã tích chọn cho vai trò vào CSDL, ghi Audit Log và hiển thị thông báo thành công [MSG-SUC-SYS-002]. |
| 11 | Tìm kiếm | Button | Nằm tại Tab Người dùng được gán. Khi click nút "Tìm kiếm":<br>- Hệ thống tiến hành lọc danh sách người dùng được gán theo các tiêu chí đã nhập (kết hợp đồng thời: Mã tài khoản, Tên tài khoản, Email (Tên đăng nhập)).<br>- **TH Không tìm thấy dữ liệu phù hợp**: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng theo [MSG-INF-SYS-001].<br>- **TH Có dữ liệu trả về**: Hiển thị danh sách các tài khoản thỏa mãn bộ lọc. |
| 12 | Xóa bộ lọc | Button | Nằm tại Tab Người dùng được gán. Khi click nút "Xóa bộ lọc": Hệ thống xóa các tiêu chí lọc đã nhập, đưa về trạng thái mặc định và hiển thị danh sách ban đầu. |
| 13 | Gán người dùng | Button | Nằm tại Header Tab Người dùng được gán. Mở **MH03 - [POPUP-ASSIGN-001] - Popup Gán người dùng vào vai trò**. |
| 14 | Xem chi tiết tài khoản | Row Click / Link | Khi người dùng click vào dòng dữ liệu hoặc click vào Mã tài khoản tại bảng người dùng được gán:<br>- **Nếu `Loại tài khoản` là `Cán bộ` hoặc `Cơ quan có thẩm quyền`**: Hệ thống mở màn hình / popup Chi tiết tài khoản cán bộ (tham chiếu màn hình Xem chi tiết tại mục 4.3.1.3 tài liệu `Quan_ly_tai_khoan_can_bo.md`).<br>- **Nếu `Loại tài khoản` là `Khách hàng`**: Hệ thống mở màn hình / popup Chi tiết tài khoản khách hàng (tham chiếu tài liệu `Quan_ly_tk_khach_hang.md`) |
| 15 | Gỡ vai trò | Button | Mở **MH04 - [POPUP-CFM-002] - Popup Xác nhận gỡ vai trò khỏi người dùng** để xác nhận gỡ vai trò khỏi tài khoản tương ứng. |

---

##### 4.3.1.1.3. MH02 - Popup Thêm mới / Sửa Vai trò

###### 4.3.1.1.3.1. Màn hình

![Popup Thêm mới / Sửa Vai trò](images/UC600.02.MH01.png)

###### 4.3.1.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Vai trò** | - | - | - | Hiển thị dạng Popup Modal. |
| Mã vai trò | String(50) | Có | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Text hiển thị / Input text (Read-only).<br>- Thêm mới: Hệ thống tự động sinh mã định danh duy nhất (định dạng `R_xxxxxx`). Khóa chỉ đọc, không cho phép chỉnh sửa.<br>- Sửa: Hiển thị mã vai trò hiện tại. Khóa chỉ đọc, không cho phép chỉnh sửa. |
| Tên vai trò | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên hiển thị của vai trò.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Phạm vi áp dụng | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |

###### 4.3.1.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu lại | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001] (chưa nhập Tên vai trò hoặc chưa chọn Phạm vi áp dụng). Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai độ dài dữ liệu)**: Tên vai trò vượt quá 255 ký tự (vi phạm [BR-VAL-003]) $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Mã vai trò` hoặc `Tên vai trò` trên hệ thống đối với các bản ghi đang ở trạng thái `Đang hoạt động` theo [BR-VAL-009] (khi Sửa loại trừ chính vai trò đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vai trò vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách vai trò tại MH01. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |

---

##### 4.3.1.1.4. [POPUP-CFM-001] - Popup Xác nhận xóa vai trò

###### 4.3.1.1.4.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Popup Xác nhận xóa** | - | - | - | Hiển thị dạng Popup Modal xác nhận. |
| Tiêu đề popup | String(100) | - | Xác nhận xóa | Control UI: Text hiển thị (Header). |
| Nội dung cảnh báo | String(500) | - | Theo bản ghi | Control UI: Text hiển thị.<br>- Hiển thị nội dung: *"Bạn có chắc chắn muốn xóa vai trò [Tên vai trò]?"* kèm dòng cảnh báo màu đỏ: *"Hành động này không thể hoàn tác."*. |

###### 4.3.1.1.4.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xóa | Button | Khi người dùng click chọn "Xóa":<br>- **TH Xóa lỗi (Thất bại)**:<br>  + **TH Vai trò đang được sử dụng**: Vai trò đang được gán cho người dùng trong hệ thống $\rightarrow$ Hệ thống chặn xóa, đóng popup và hiển thị thông báo lỗi [MSG-ERR-SYS-003].<br>  + **TH Lỗi hệ thống**: Quá trình xử lý xóa bản ghi phát sinh lỗi kết nối cơ sở dữ liệu hoặc lỗi hệ thống $\rightarrow$ Hệ thống không xóa bản ghi, đóng popup và hiển thị thông báo lỗi [MSG-ERR-SYS-001] để người dùng thử lại sau.<br>- **TH Xóa thành công**: Vai trò không có người dùng đang gán $\rightarrow$ Hệ thống thực hiện xóa vai trò khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-006], đóng popup và làm mới danh sách vai trò tại Panel trái của MH01. Nếu vai trò vừa xóa đang được chọn ở Panel phải thì đưa Panel phải về trạng thái Chưa chọn vai trò (hiển thị thông báo Empty State). |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác xóa và giữ nguyên dữ liệu vai trò. |

---

##### 4.3.1.1.5. MH03 - [POPUP-ASSIGN-001] - Popup Gán người dùng vào vai trò

###### 4.3.1.1.5.1. Màn hình

Hiển thị dưới dạng Modal Popup "Gán người dùng vào vai trò: [Tên vai trò]".

###### 4.3.1.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(150) | - | Gán người dùng vào vai trò: [Tên vai trò] | Control UI: Text hiển thị (Header Modal). |
| **Bộ lọc tìm kiếm tài khoản** | - | - | - | Khối các tiêu chí lọc tài khoản người dùng tại phần đầu của popup. |
| Loại tài khoản | Enum(String(50)) | Không | Cán bộ | Control UI: Combobox.<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |
| Mã tài khoản | String(50) | Không | Trống | Control UI: Input text.<br>- Nhập mã tài khoản cần tìm kiếm (ví dụ: `CB0001`, `KH0001`...). |
| Họ và tên (Tên) | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập họ và tên cá nhân hoặc tên tổ chức/doanh nghiệp cần tìm kiếm. |
| Email (Tên đăng nhập) | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập địa chỉ email hoặc tên đăng nhập của tài khoản. |
| Đơn vị | String(255) | Không | Tất cả | Control UI: Combobox.<br>- Chọn từ danh sách đơn vị trên hệ thống. |
| Tìm kiếm | Button | - | - | Control UI: Nút bấm.<br>- Luôn hiển thị tại thanh nút bấm bộ lọc để thực hiện tìm kiếm tài khoản theo các điều kiện lọc. |
| Xóa bộ lọc | Button | - | - | Control UI: Nút bấm.<br>- Xóa các tiêu chí lọc đã nhập, đưa về trạng thái mặc định và hiển thị danh sách ban đầu. |
| **Bảng kết quả tìm kiếm tài khoản** | Table | - | - | Khối hiển thị danh sách tài khoản khả dụng để gán vai trò.<br>- **Khi mặc định mở Popup**: Hệ thống tự động tải và hiển thị danh sách các tài khoản thỏa mãn đồng thời: thuộc `Loại tài khoản` mặc định (`Cán bộ`), có trạng thái `Đang hoạt động` và chưa được gán vai trò đang chọn.<br>- **Số lượng bản ghi**: Mặc định hiển thị 10 bản ghi trên mỗi trang (có thanh phân trang phía dưới).<br>- **Quy tắc sắp xếp**: Mặc định sắp xếp theo `Ngày tạo` giảm dần.<br>- **Trạng thái không có dữ liệu (Empty State)**: Khi không tìm thấy kết quả phù hợp, bảng hiển thị 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Cột chọn | Checkbox | - | Bỏ chọn | Control UI: Checkbox chọn nhiều dòng.<br>- Checkbox chọn từng dòng và Checkbox Chọn tất cả trên Header bảng để chọn hàng loạt tài khoản gán vai trò. |
| STT | Integer | - | - | Control UI: Text hiển thị số thứ tự tăng dần (Read-only, căn giữa). |
| Mã tài khoản | String(50) | - | - | Control UI: Text hiển thị (Read-only).<br>- Hiển thị mã định danh tài khoản. |
| Họ và tên (Tên) | String(255) | - | - | Control UI: Text hiển thị (Read-only, in đậm).<br>- Hiển thị Họ và tên cá nhân hoặc Tên tổ chức/doanh nghiệp. |
| Email (Tên đăng nhập) | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Hiển thị địa chỉ Email hoặc Tên đăng nhập của tài khoản. |
| Đơn vị | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Với tài khoản Cán bộ: Ghi rõ Tên phòng ban - Tên đơn vị.<br>- Đối với tài khoản Loại Khách hàng: Hiển thị `-`.<br>- Với tài khoản Cơ quan có thẩm quyền: Hiển thị Tên cơ quan hoặc `-`. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge nhãn trạng thái hiển thị (Read-only).<br>- Chỉ tải lên các tài khoản có trạng thái:<br>+ Đang hoạt động (màu xanh lá) |
| Số lượng đã chọn | String(100) | - | Đã chọn: 0 tài khoản | Control UI: Text hiển thị số lượng bản ghi đang được tích chọn theo thời gian thực (ví dụ: *Đã chọn: X tài khoản*). |

###### 4.3.1.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút "Tìm kiếm":<br>- Hệ thống lọc danh sách tài khoản theo các tiêu chí đã nhập (kết hợp đồng thời: Loại tài khoản, Mã tài khoản, Họ và tên (Tên), Email (Tên đăng nhập), Đơn vị).<br>- Chỉ tải và hiển thị các tài khoản có trạng thái `Đang hoạt động` và chưa được gán vai trò này.<br>- **TH Không tìm thấy kết quả**: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng theo [MSG-INF-SYS-001].<br>- **TH Có kết quả**: Hiển thị danh sách các tài khoản thỏa mãn, giữ nguyên các lựa chọn đã tích trước đó (nếu có). |
| 2 | Xóa bộ lọc | Button | Khi người dùng click nút "Xóa bộ lọc": Hệ thống xóa các tiêu chí lọc đã nhập, đưa về trạng thái mặc định và hiển thị danh sách ban đầu. |
| 3 | Chọn tài khoản | Checkbox | Tích chọn/bỏ chọn từng tài khoản hoặc tích chọn tất cả trên Header. Hệ thống tự động cập nhật dòng thông tin `Đã chọn: X tài khoản` theo thời gian thực. |
| 4 | Lưu lại | Button | Khi người dùng click nút "Lưu lại":<br>- **TH Chưa chọn tài khoản**: Chưa có tài khoản nào được tích chọn $\rightarrow$ Hệ thống hiển thị thông báo lỗi [MSG-ERR-SYS-004] ("Vui lòng chọn ít nhất một người dùng để thực hiện thao tác.").<br>- **TH Hợp lệ**: Hệ thống gán vai trò đang xem cho toàn bộ các tài khoản đã tích chọn, lưu CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-002], đóng popup và làm mới bảng người dùng được gán tại Tab 2 của MH01. |
| 5 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác gán và giữ nguyên dữ liệu. |

---

##### 4.3.1.1.6. MH04 - [POPUP-CFM-002] - Popup Xác nhận gỡ vai trò khỏi người dùng

###### 4.3.1.1.6.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Popup Xác nhận gỡ vai trò** | - | - | - | Hiển thị dạng Popup Modal xác nhận. |
| Tiêu đề popup | String(100) | - | Xác nhận gỡ vai trò | Control UI: Text hiển thị (Header). |
| Nội dung cảnh báo | String(500) | - | Theo bản ghi | Control UI: Text hiển thị.<br>- Hiển thị nội dung: *"Bạn có chắc chắn muốn gỡ vai trò [Tên vai trò] khỏi người dùng [Tên người dùng] không?"*. |
| Đồng ý | Button | - | - | Control UI: Nút bấm xác nhận tại footer popup. |
| Hủy | Button | - | - | Control UI: Nút bấm hủy tại footer popup. |

###### 4.3.1.1.6.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đồng ý | Button | Khi người dùng click "Đồng ý":<br>- Hệ thống gỡ vai trò đang chọn khỏi tài khoản người dùng tương ứng, hủy liên kết vai trò trong CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-002], đóng popup và làm mới bảng người dùng được gán tại Tab 2 của MH01.<br>- Tài khoản người dùng sau khi bị gỡ khỏi vai trò sẽ không được phép truy cập và thao tác vào các chức năng theo phân quyền của vai trò đã gỡ bỏ (áp dụng ngay từ phiên làm việc tiếp theo hoặc sau khi làm mới trang). Các quyền hạn thuộc các vai trò khác của người dùng (nếu có) vẫn được giữ nguyên; trường hợp người dùng không còn vai trò nào thì không được phép truy cập vào các phân hệ nghiệp vụ. |
| 2 | Hủy | Button | Đóng Popup Modal, giữ nguyên vai trò của người dùng. |
