#### 4.3.1.1. Quản lý vai trò

##### 4.3.1.1.1. Mục đích
Cho phép quản lý danh mục vai trò người dùng trong hệ thống, bao gồm:
- Tra cứu, tìm kiếm và hiển thị danh sách vai trò áp dụng cho các đối tượng (Cán bộ, Khách hàng, Cơ quan có thẩm quyền).
- Khởi tạo mới, cập nhật thông tin và trạng thái hoạt động của vai trò.
- Thiết lập phân quyền chi tiết các chức năng, menu và API theo từng vai trò.
- Quản lý danh sách tài khoản người dùng được gán vào vai trò và gán bổ sung tài khoản.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.1.2. MH01 - Màn hình Tra cứu vai trò

###### 4.3.1.1.2.1. Màn hình

![Màn hình Tra cứu vai trò](images/UC600.01.MH01.png)

###### 4.3.1.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Danh sách vai trò** | - | - | - | Khối tìm kiếm và bảng danh sách vai trò. |
| Tên vai trò | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm gần đúng theo Tên vai trò. |
| Loại tài khoản áp dụng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Tìm kiếm | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại khối tìm kiếm vai trò. |
| Xóa bộ lọc | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại khối tìm kiếm vai trò. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại header danh sách vai trò. |
| Bảng danh sách vai trò | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- **Mặc định khi truy cập:** Hiển thị danh sách toàn bộ vai trò trên hệ thống, mặc định 20 bản ghi/trang, sắp xếp theo Ngày tạo giảm dần và tự động chọn bản ghi đầu tiên để hiển thị chi tiết sang Panel phải.<br>- Cho phép chọn 10, 20, 50, 100 bản ghi/trang, mặc định 20.<br>- Click vào dòng dữ liệu để xem chi tiết thông tin ở Panel phải.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Mã vai trò | String(50) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên vai trò | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Loại tài khoản áp dụng | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |
| Ngày tạo | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Thao tác | String(255) | - | - | Control UI: Nhóm icon thao tác trên lưới.<br>- `Phân quyền`: Luôn hiển thị.<br>- `Cập nhật`: Luôn hiển thị.<br>- `Xóa`: Luôn hiển thị. |
| **II. Panel bên phải: Chi tiết vai trò** | - | - | - | Khối xem chi tiết quyền và danh sách người dùng được gán. |
| Tab Phân quyền | Tab | - | Mặc định chọn | Control UI: Tab điều hướng.<br>- Hiển thị cây danh mục quyền hạn mà vai trò đang sở hữu ở chế độ chỉ đọc. |
| Tìm kiếm quyền | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập Tên chức năng hoặc Mã chức năng để lọc trên cây quyền. |
| Tìm kiếm (Quyền) | String(50) | - | - | Control UI: Button/Icon.<br>- Luôn hiển thị cạnh ô tìm kiếm quyền. |
| Xóa bộ lọc (Quyền) | String(50) | - | - | Control UI: Button/Icon.<br>- Luôn hiển thị cạnh ô tìm kiếm quyền. |
| Cây quyền hạn | Tree | - | - | Control UI: Cây phân cấp chỉ đọc (Read-only).<br>- Chỉ hiển thị các chức năng/quyền mà vai trò đang được gán. |
| Tab Danh sách người dùng được gán | Tab | - | - | Control UI: Tab điều hướng.<br>- Hiển thị danh sách các tài khoản đang được gán vai trò này. |
| Họ và tên / Tên tổ chức | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo Họ và tên cá nhân hoặc Tên tổ chức. |
| Tên đăng nhập / Email | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo Tên đăng nhập hoặc Email tài khoản. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo số điện thoại. |
| Trạng thái tài khoản | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Bị khóa |
| Tìm kiếm (Người dùng) | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại khối tìm kiếm người dùng. |
| Xóa bộ lọc (Người dùng) | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại khối tìm kiếm người dùng. |
| Thêm người dùng | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại Tab Danh sách người dùng được gán. |
| Bảng người dùng được gán | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- **Mặc định khi truy cập:** Tự động tải danh sách các tài khoản được gán vai trò đang chọn, mặc định 20 bản ghi/trang, sắp xếp theo Ngày gán giảm dần.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only). |
| Họ và tên / Tên tổ chức | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Tên đăng nhập | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Loại tài khoản | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Cá nhân<br>+ Tổ chức<br>+ Cán bộ<br>+ Cơ quan có thẩm quyền |
| Email | String(255) | - | - | Control UI: Text hiển thị (Read-only). |
| Số điện thoại | String(20) | - | - | Control UI: Text hiển thị (Read-only). |
| Ngày gán | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái tài khoản | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa |
| Thao tác người dùng | Icon | - | - | Control UI: Icon `Gỡ khỏi vai trò`. |

###### 4.3.1.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Lọc danh sách vai trò theo các tiêu chí `Tên vai trò`, `Loại tài khoản áp dụng`, `Trạng thái`:<br>- **TH Không có dữ liệu**: Bảng danh sách hiển thị duy nhất 01 dòng căn giữa nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"* và các nút điều hướng khóa mờ.<br>- **TH Có dữ liệu**: Hiển thị danh sách các vai trò phù hợp điều kiện lọc, sắp xếp mặc định theo Ngày tạo giảm dần. |
| 2 | Xóa bộ lọc | Button | Đặt lại toàn bộ tiêu chí tìm kiếm vai trò về giá trị mặc định (`Trống`, `Tất cả`, `Tất cả`) và tải lại danh sách kết quả. |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới / Cập nhật vai trò** ở chế độ Thêm mới. |
| 4 | Cập nhật | Icon | Mở **MH02 - Popup Thêm mới / Cập nhật vai trò** ở chế độ Cập nhật cho vai trò tương ứng. |
| 5 | Xóa | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo cảnh báo [MSG-CFM-SYS-001]:<br>- **TH1 (Vai trò đang được sử dụng)**: Vai trò đang được gán cho ít nhất 01 tài khoản người dùng $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu gỡ vai trò khỏi người dùng trước.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống xóa vai trò khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và làm mới danh sách vai trò. |
| 6 | Phân quyền | Icon | Mở **MH03 - Popup Phân quyền theo vai trò** để cấu hình cây chức năng cho vai trò tương ứng. |
| 7 | Click dòng vai trò | Row Click | Tải dữ liệu chi tiết của vai trò được chọn sang Panel phải (Tab Phân quyền và Tab Danh sách người dùng được gán). |
| 8 | Tìm kiếm (Quyền) | Button/Icon | Lọc trực tiếp các chức năng trên cây quyền hạn ở Panel phải theo Tên hoặc Mã chức năng:<br>- **TH Có dữ liệu**: Tự động mở rộng (Expand) các nhánh cây chứa quyền thỏa mãn từ khóa và highlight màu nổi bật.<br>- **TH Không có dữ liệu**: Cây quyền hạn hiển thị thông báo *"Không tìm thấy chức năng/quyền phù hợp"*. |
| 9 | Xóa bộ lọc (Quyền) | Button/Icon | Xóa từ khóa tìm kiếm quyền và hiển thị lại toàn bộ cây quyền hạn của vai trò. |
| 10 | Tìm kiếm (Người dùng) | Button | Lọc danh sách người dùng được gán theo các tiêu chí `Họ và tên/Tên tổ chức`, `Tên đăng nhập/Email`, `Số điện thoại`, `Trạng thái tài khoản`:<br>- **TH Không có dữ liệu**: Bảng hiển thị duy nhất 01 dòng căn giữa nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng khóa mờ.<br>- **TH Có dữ liệu**: Hiển thị danh sách tài khoản thỏa mãn điều kiện lọc. |
| 11 | Xóa bộ lọc (Người dùng) | Button | Đặt lại toàn bộ tiêu chí tìm kiếm người dùng về mặc định và tải lại danh sách người dùng được gán. |
| 12 | Thêm người dùng | Button | Mở **MH04 - Popup Thêm người dùng vào vai trò** cho vai trò đang chọn. |
| 13 | Gỡ khỏi vai trò | Icon | Mở **[POPUP-CFM-001]** với `Loại thao tác` là `Xóa` kèm thông báo xác nhận. Khi chọn "Xác nhận", hệ thống gỡ tài khoản khỏi vai trò, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001] và tải lại bảng người dùng được gán. |

---

##### 4.3.1.1.3. MH02 - Popup Thêm mới / Cập nhật vai trò

###### 4.3.1.1.3.1. Màn hình

![Màn hình Thêm mới / Cập nhật vai trò](images/UC600.02.MH01.png)

###### 4.3.1.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Vai trò** | - | - | - | Hiển thị dạng Popup Modal. |
| Mã vai trò | String(50) | Có | Tự động sinh (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Text hiển thị (Read-only).<br>- Hệ thống tự động sinh mã định danh khi thêm mới. Không cho phép chỉnh sửa. |
| Tên vai trò | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên vai trò.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Loại tài khoản áp dụng | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền |
| Trạng thái | Enum(String(50)) | Có | Hoạt động (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox / Radio.<br>Gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |
| Lưu | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] và focus con trỏ vào ô lỗi.<br>- **TH2 (Sai độ dài dữ liệu)**: Tên vai trò vượt quá 255 ký tự (vi phạm [BR-VAL-003]) $\rightarrow$ Highlight viền đỏ, hiển thị thông báo lỗi [MSG-ERR-VAL-003] và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Tên vai trò` trên toàn hệ thống đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Ngừng hoạt động` theo [BR-VAL-009] (khi Sửa thì loại trừ chính vai trò đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vai trò vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới danh sách vai trò tại MH01. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và quay lại màn hình chính. |

---

##### 4.3.1.1.4. MH03 - Popup Phân quyền theo vai trò

###### 4.3.1.1.4.1. Màn hình

![Màn hình Phân quyền theo vai trò](images/UC600.05.MH01.png)

###### 4.3.1.1.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Popup Phân quyền** | - | - | - | Hiển thị dạng Popup Modal. |
| Mã vai trò | String(50) | - | Theo vai trò chọn | Control UI: Text hiển thị (Read-only). |
| Tên vai trò | String(255) | - | Theo vai trò chọn | Control UI: Text hiển thị (Read-only). |
| Số lượng quyền đã chọn | String(50) | - | Đã chọn: X/Y | Control UI: Badge hiển thị (Read-only). |
| Tìm kiếm | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa để lọc danh sách chức năng trên cây phân quyền. |
| Cây danh mục chức năng | Tree Checkbox | Có | Theo vai trò chọn | Control UI: Cây phân cấp kèm Checkbox chọn.<br>- Hiển thị đầy đủ cây chức năng các phân hệ.<br>- Cascade Checkbox: Tích/bỏ tích node cha tự động chọn/bỏ chọn tất cả node con. |
| Cập nhật | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.1.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Input text | Lọc trực tiếp các chức năng trên cây theo Tên hoặc Mã chức năng chứa từ khóa. |
| 2 | Chọn quyền trên cây | Checkbox | Thay đổi trạng thái tích chọn của chức năng, tự động cập nhật số lượng quyền đã chọn tại badge `Đã chọn: X/Y`. |
| 3 | Cập nhật | Button | Lưu danh sách các quyền đã tích chọn cho vai trò vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và làm mới thông tin tại MH01. |
| 4 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi và giữ nguyên cấu hình phân quyền hiện tại. |

---

##### 4.3.1.1.5. MH04 - Popup Thêm người dùng vào vai trò

###### 4.3.1.1.5.1. Màn hình

![Màn hình Thêm người dùng vào vai trò](images/UC600.06.MH01.png)

###### 4.3.1.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Popup Thêm người dùng** | - | - | - | Hiển thị dạng Popup Modal. |
| Tên vai trò | String(255) | - | Theo vai trò chọn | Control UI: Text hiển thị (Read-only). |
| Tìm kiếm tài khoản | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm theo Tên, Tên đăng nhập, Email hoặc Số điện thoại. |
| Bảng tài khoản khả dụng | - | - | Danh sách phù hợp | Control UI: Bảng có Checkbox chọn nhiều dòng.<br>- Chỉ hiển thị các tài khoản phù hợp với `Loại tài khoản áp dụng` của vai trò và chưa được gán vai trò này.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Số lượng đã chọn | String(50) | - | Đã chọn: 0 tài khoản | Control UI: Text hiển thị (Read-only). |
| Thêm vào vai trò | String(50) | - | - | Control UI: Button.<br>- Chỉ kích hoạt (Enable) khi đã tích chọn ít nhất 01 tài khoản. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer popup. |

###### 4.3.1.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm tài khoản | Input text | Lọc danh sách tài khoản khả dụng theo từ khóa đã nhập. |
| 2 | Chọn tài khoản | Checkbox | Tích chọn/bỏ chọn tài khoản để gán vai trò, cập nhật dòng số lượng `Đã chọn: X tài khoản` và kích hoạt nút `Thêm vào vai trò`. |
| 3 | Thêm vào vai trò | Button | Gán vai trò đang xem cho toàn bộ các tài khoản đã tích chọn, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup và tải lại Tab Danh sách người dùng được gán tại MH01. |
| 4 | Hủy | Button | Đóng Popup Modal, hủy bỏ thao tác và quay lại màn hình chính. |
