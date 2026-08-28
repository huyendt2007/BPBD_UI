### 4.1.10. Quản lý tài khoản trực thuộc (Tài khoản phụ)

#### 4.1.10.1. Mục đích

- Cho phép tài khoản chính của Tổ chức quản lý danh sách các tài khoản phụ trực thuộc đơn vị của mình.  
- Hỗ trợ tra cứu, tìm kiếm tài khoản phụ theo nhiều tiêu chí lọc và sắp xếp độc lập.  
- Hỗ trợ thêm mới (tạo lập), cập nhật thông tin và thực hiện khóa/mở khóa/đóng tài khoản phụ trực thuộc nhằm đảm bảo phân quyền vận hành và an ninh hệ thống.  

*a. Phân quyền*

- Tài khoản chính của Tổ chức (đã đăng nhập thành công).  

*b. Điều kiện thực hiện*

- Người dùng đã đăng nhập thành công vào Website Khách hàng bằng tài khoản Tổ chức (Tài khoản chính).  
- Hệ thống hoạt động bình thường.  

---

#### 4.1.10.2. MH01 - Màn hình Tra cứu danh sách tài khoản phụ

##### 4.1.10.2.1. Màn hình

- Giao diện chính của phân hệ Quản lý tài khoản trực thuộc, hiển thị bộ lọc tìm kiếm đa tiêu chí, lưới danh sách tài khoản phụ và các nút thao tác nghiệp vụ.  
- Từ lưới danh sách này, người dùng có thể thực hiện tìm kiếm nhanh, xem chi tiết (bằng thao tác Row-click), thêm mới tài khoản phụ (mở Form popup), cập nhật thông tin (mở Form popup), khóa/mở khóa/đóng tài khoản phụ, hoặc kết xuất danh sách ra file Excel.  

##### 4.1.10.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Khối các tiêu chí lọc tìm kiếm tài khoản phụ. |
| Tên khách hàng | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm gần đúng theo Họ và tên của tài khoản phụ. |
| Email | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm gần đúng theo địa chỉ Email / Tên đăng nhập. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm gần đúng theo Số điện thoại liên hệ. |
| Số giấy tờ | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm gần đúng theo Số giấy tờ pháp lý (CCCD/CMND/Hộ chiếu). |
| Đơn vị | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập từ khóa tìm kiếm theo Tên đơn vị / Phòng ban trực thuộc. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Nút "Tìm kiếm" | String(255) | Không | - | Control UI: Button.<br>- Thực hiện lọc dữ liệu danh sách tài khoản phụ theo các tiêu chí đã nhập. |
| Nút "Xóa bộ lọc" | String(255) | Không | - | Control UI: Button.<br>- Đặt lại toàn bộ ô nhập liệu về trống, Combobox Trạng thái về `Tất cả` và tự động tải lại danh sách ban đầu. |
| Nút "Thêm tài khoản" | String(255) | Không | - | Control UI: Button.<br>- Click để mở popup Form Thêm mới / Cập nhật tài khoản phụ (MH02) ở chế độ Thêm mới. |
| Nút "Kết xuất Excel" | String(255) | Không | - | Control UI: Button.<br>- Kết xuất toàn bộ danh sách tài khoản phụ theo điều kiện lọc hiện tại ra file Excel (.xlsx). |
| **II. Bảng danh sách tài khoản phụ** | - | - | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách các tài khoản phụ trực thuộc Tổ chức.<br>- Cho phép chọn cấu hình số lượng bản ghi hiển thị: 10, 20, 50, 100 bản ghi/trang (mặc định **20 bản ghi/trang**).<br>- Tích hợp thanh phân trang (Pagination) đồng bộ: Đầu (`\|<<`), Trước (`<`), các số trang cụ thể, Sau (`>`), Cuối (`>>\|`).<br>- Hỗ trợ xem chi tiết bằng thao tác click trực tiếp vào dòng dữ liệu (Row-click).<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số thứ tự tăng dần của bản ghi trên trang. |
| Tên khách hàng | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Họ và tên tài khoản phụ/nhân viên thuộc Tổ chức.<br>- Hỗ trợ sắp xếp Sortable khi bấm vào tiêu đề cột. |
| Số giấy tờ | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số giấy tờ pháp lý (CCCD/CMND/Hộ chiếu) của tài khoản phụ. |
| Email | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ Email của tài khoản phụ, đồng thời là Tên đăng nhập đối với nguồn xác thực Nội bộ. |
| Số điện thoại | String(20) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số điện thoại liên lạc của tài khoản phụ. |
| Đơn vị | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Tên đơn vị / Phòng ban trực thuộc của nhân viên. |
| Nguồn xác thực | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị (Read-only).<br>Gồm:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị (Read-only).<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Ngày tạo | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Ngày tạo lập tài khoản phụ, định dạng `dd/mm/yyyy HH:mm`.<br>- Mặc định sắp xếp danh sách theo Ngày tạo giảm dần (mới nhất lên đầu). Hỗ trợ sắp xếp Sortable khi bấm vào tiêu đề cột. |
| Thao tác | String(255) | - | - | Control UI: Nhóm icon thao tác trên lưới tài khoản phụ, căn giữa.<br>- `Cập nhật`<br>- `Khóa / Mở khóa` (Khóa khi Đang hoạt động / Mở khóa khi Bị khóa)<br>- `Đóng` |

##### 4.1.10.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Tự động cắt bỏ khoảng trắng thừa ở hai đầu từ khóa (Trim space). Lọc danh sách tài khoản phụ theo các tiêu chí đã nhập (Tên khách hàng, Email, Số điện thoại, Số giấy tờ, Đơn vị, Trạng thái):<br>- **TH Dữ liệu không hợp lệ**: Khi dữ liệu nhập tại các ô lọc không đúng định dạng quy định, hiển thị thông báo lỗi tương ứng.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel": Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Button | Đặt lại toàn bộ các ô nhập liệu về rỗng, Combobox Trạng thái về giá trị `Tất cả` và tự động tải lại dữ liệu danh sách tài khoản phụ ban đầu. |
| 3 | Thêm tài khoản | Button | Mở Popup Form Thêm mới / Cập nhật tài khoản phụ (MH02) ở chế độ Thêm mới. |
| 4 | Cập nhật | Icon | Mở Popup Form Thêm mới / Cập nhật tài khoản phụ (MH02) ở chế độ Cập nhật cho tài khoản phụ tương ứng. |
| 5 | Khóa | Icon | Mở **MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng** (trong tài liệu `SRS_Quan_ly_tai_khoan_khach_hang.md`) với `Loại thao tác` là `Khóa`. |
| 6 | Mở khóa | Icon | Mở **MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng** (trong tài liệu `SRS_Quan_ly_tai_khoan_khach_hang.md`) với `Loại thao tác` là `Mở khóa`. |
| 7 | Đóng | Icon | Mở **MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng** (trong tài liệu `SRS_Quan_ly_tai_khoan_khach_hang.md`) với `Loại thao tác` là `Đóng`. |
| 8 | Click dòng dữ liệu (Row-click) | Row Click | Khi click vào bất kỳ dòng dữ liệu nào trên bảng (ngoại trừ click trực tiếp vào icon tại cột Thao tác), hệ thống mở Popup Xem chi tiết tài khoản phụ (MH03). |
| 9 | Kết xuất Excel | Button | Kiểm tra dữ liệu và kết xuất file Excel (.xlsx):<br>- **TH Không có dữ liệu**: Danh sách tài khoản phụ trên lưới rỗng, hệ thống hiển thị thông báo: *"Không có dữ liệu để kết xuất Excel."* (nút ở trạng thái khóa mờ kèm tooltip).<br>- **TH Hợp lệ**: Hệ thống thực hiện kết xuất toàn bộ danh sách tài khoản phụ theo kết quả lọc hiện tại ra file Excel (`.xlsx`) gồm các cột: `STT`, `Tên khách hàng`, `Số giấy tờ`, `Email`, `Số điện thoại`, `Đơn vị`, `Nguồn xác thực`, `Trạng thái`, `Ngày tạo`. |

---

#### 4.1.10.3. MH02 - Popup Thêm mới / Cập nhật tài khoản phụ

##### 4.1.10.3.1. Màn hình

- Giao diện dạng Popup Modal hiển thị khi người dùng click nút "Thêm tài khoản" (chế độ Thêm mới) hoặc click icon "Cập nhật" tại dòng tài khoản phụ tương ứng trên bảng danh sách (chế độ Cập nhật).  
- Cho phép tài khoản chính của Tổ chức khai báo thông tin nhân viên trực thuộc và thiết lập phân quyền chức năng cho tài khoản phụ.  

##### 4.1.10.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Thêm mới / Cập nhật tài khoản phụ** | - | - | - | Hiển thị dạng Popup Modal (bố cục 2 cột cân đối). |
| Tên khách hàng | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Input text.<br>- Nhập Họ và tên của tài khoản phụ/nhân viên.<br>- Tự động chuyển đổi thành chữ in hoa và cắt bỏ khoảng trắng thừa đầu cuối.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Nguồn xác thực | Enum(String(50)) | Có | Nội bộ (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Combobox (khi Thêm mới) / Text hiển thị Read-only (khi Cập nhật).<br>Gồm:<br>+ Nội bộ<br>+ VNeID<br>+ VNeID, Nội bộ<br>- Mặc định khi Thêm mới chọn `Nội bộ`. Khi Cập nhật không cho phép thay đổi Nguồn xác thực. |
| Email (Tên đăng nhập) | String(255) | Tùy thuộc Nguồn xác thực | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Input text (khi Thêm mới, hoặc khi Cập nhật Nguồn VNeID) / Text hiển thị Read-only (khi Cập nhật Nguồn Nội bộ, VNeID Nội bộ).<br>- **Nếu Nguồn xác thực là `Nội bộ` hoặc `VNeID, Nội bộ`**: Bắt buộc nhập, sử dụng Email làm Tên đăng nhập chính để đăng nhập hệ thống. Khi Cập nhật ở trạng thái Chỉ đọc (Read-only).<br>- **Nếu Nguồn xác thực là `VNeID`**: Không bắt buộc nhập. Khi Cập nhật cho phép chỉnh sửa địa chỉ email liên hệ.<br>- Áp dụng quy tắc kiểm tra định dạng email [BR-VAL-EMAIL].<br>- Ràng buộc kiểm tra tính duy nhất trên toàn hệ thống đối với các tài khoản phụ khác đang ở trạng thái `Đang hoạt động` hoặc `Bị khóa` (khi Cập nhật thì loại trừ chính tài khoản đang xử lý) - [BR-VAL-009]. |
| Loại giấy tờ | Enum(String(50)) | Có | Căn cước công dân (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Combobox.<br>- Tham chiếu Danh mục giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Input text.<br>- Số giấy tờ pháp lý của tài khoản phụ.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001].<br>- Ràng buộc kiểm tra tính duy nhất theo Loại giấy tờ trên toàn hệ thống đối với các tài khoản phụ khác đang ở trạng thái `Đang hoạt động` hoặc `Bị khóa` (khi Cập nhật thì loại trừ chính tài khoản đang xử lý) - [BR-VAL-009]. |
| Số điện thoại | String(20) | Không | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Input text.<br>- Số điện thoại liên lạc của nhân viên.<br>- Nếu có nhập, áp dụng quy tắc kiểm tra định dạng số điện thoại [BR-VAL-PHONE] và kiểm tra tính duy nhất trên toàn hệ thống đối với các tài khoản phụ khác đang ở trạng thái `Đang hoạt động` hoặc `Bị khóa` (khi Cập nhật thì loại trừ chính tài khoản đang xử lý) - [BR-VAL-009]. |
| Đơn vị | String(255) | Không | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Input text.<br>- Tên đơn vị / Phòng ban trực thuộc của nhân viên trong Tổ chức. |
| Ngày sinh | Date | Không | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: DatePicker.<br>- Ngày sinh của nhân viên, định dạng `dd/mm/yyyy`.<br>- Nếu có nhập, giá trị phải nhỏ hơn ngày hiện tại. |
| Quốc gia | Enum(String(50)) | Có | Việt Nam (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Combobox.<br>- Tham chiếu Danh mục Quốc gia [DM_09]. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản tự do. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản tự do. |
| Địa chỉ chi tiết | String(500) | Không | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Input text.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp... |
| Cây phân quyền | Boolean | Có | Trống (Thêm mới) / Theo bản ghi (Cập nhật) | Control UI: Cây phân quyền kèm Checkbox.<br>- Hiển thị Danh sách các chức năng kèm checkbox giả lập gồm:<br>&nbsp;&nbsp;1. Đăng ký Biện pháp bảo đảm<br>&nbsp;&nbsp;2. Đăng ký thay đổi<br>&nbsp;&nbsp;3. Xóa đăng ký<br>&nbsp;&nbsp;4. Đăng ký thông báo xử lý tài sản<br>&nbsp;&nbsp;5. Yêu cầu cấp bản sao văn bản<br>&nbsp;&nbsp;6. Yêu cầu cấp bản sao kèm thông báo|

##### 4.1.10.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Kiểm tra dữ liệu trên form:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Vi phạm quy tắc [BR-VAL-001]. Hệ thống highlight viền đỏ ô lỗi đầu tiên, hiển thị thông báo lỗi [MSG-ERR-VAL-001] ngay phía dưới ô nhập và tự động focus con trỏ vào ô lỗi đầu tiên đó. Không cho phép lưu.<br>- **TH2 (Dữ liệu không hợp lệ)**: Kiểm tra định dạng Email theo [BR-VAL-EMAIL], Số điện thoại theo [BR-VAL-PHONE], Ngày sinh (vi phạm [BR-VAL-002]). Nếu vi phạm, highlight viền đỏ ô lỗi, hiển thị thông báo lỗi [MSG-ERR-VAL-002] và focus con trỏ vào ô lỗi. Không cho phép lưu.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng lặp dữ liệu đối với các tài khoản phụ khác trên toàn hệ thống đang ở trạng thái `Đang hoạt động` hoặc `Bị khóa` (khi Cập nhật thì ngoại trừ chính tài khoản phụ đang xử lý):<br>+ Kiểm tra trùng lặp Email (nếu Nguồn xác thực là `Nội bộ` hoặc `VNeID, Nội bộ`)<br>+ Kiểm tra trùng lặp Số giấy tờ theo Loại giấy tờ<br>+ Kiểm tra trùng lặp Số điện thoại (nếu có nhập)<br>Nếu phát hiện trùng lặp, hiển thị thông báo lỗi [MSG-ERR-VAL-009], highlight viền đỏ ô lỗi đầu tiên và không cho phép lưu.<br>- **TH Hợp lệ (Tuần tự các hành động của hệ thống)**:<br>1. *Lưu CSDL và phân quyền*:<br>+ Đối với chế độ Thêm mới: Lưu thông tin tài khoản phụ vào CSDL ở trạng thái `Đang hoạt động`, liên kết trực thuộc Tổ chức chủ quản.<br>+ Đối với chế độ Cập nhật: Lưu thông tin chỉnh sửa và phân quyền mới của tài khoản phụ vào CSDL.<br>2. *Xử lý mật khẩu (nếu Nguồn xác thực là `Nội bộ` hoặc `VNeID, Nội bộ`)*:<br>+ Tự động sinh mật khẩu tạm thời ngẫu nhiên tuân thủ theo [Quy định độ phức tạp mật khẩu trong Cấu hình tham số hệ thống].<br>+ Thực hiện mã hóa băm mật khẩu một chiều kết hợp Salt ngẫu nhiên lưu vào CSDL.<br>+ Thiết lập cờ `Yêu cầu đổi mật khẩu trong lần đăng nhập đầu tiên`.<br>3. *Gửi Email thông báo*:<br>+ Nếu Nguồn xác thực là `Nội bộ` hoặc `VNeID, Nội bộ`: Gửi email thông báo cấp tài khoản kèm thông tin đăng nhập theo đúng **Mẫu 5: Email thông báo khởi tạo tài khoản trực thuộc Nội bộ** (Phụ lục Mẫu Email hệ thống) đến địa chỉ email đã đăng ký.<br>+ Nếu Nguồn xác thực là `VNeID`: Không tự động sinh mật khẩu, gửi email thông báo kích hoạt tài khoản phụ liên kết VNeID theo đúng **Mẫu 4: Email thông báo tài khoản trực thuộc được kích hoạt qua VNeID** (Phụ lục Mẫu Email hệ thống) đến địa chỉ email của nhân viên (nếu có nhập Email).<br>4. *Ghi Audit Log & Hoàn tất*:<br>+ Ghi nhận toàn bộ thông tin tạo mới/thay đổi vào lịch sử Audit Log hệ thống.<br>+ Hiển thị thông báo thành công [MSG-SUC-SYS-001].<br>+ Đóng popup form và tự động làm mới lại lưới danh sách ở màn hình tra cứu (MH01). |
| 2 | Hủy | Button | Đóng popup form, không lưu thay đổi và quay lại màn hình tra cứu. |

---

#### 4.1.10.4. MH03 - Popup Xem chi tiết tài khoản phụ

##### 4.1.10.4.1. Màn hình

- Giao diện dạng Popup Modal hiển thị khi người dùng click vào bất kỳ dòng dữ liệu tài khoản phụ nào trên bảng danh sách tại MH01.  
- Toàn bộ thông tin tài khoản phụ được hiển thị ở chế độ Chỉ đọc (Read-only).  

##### 4.1.10.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Thông tin tài khoản phụ** | - | - | - | Theo thông tin bản ghi, dạng chỉ đọc (Read-only). |
| Tên khách hàng | String(255) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Nguồn xác thực | Enum(String(50)) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Email (Tên đăng nhập) | String(255) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Loại giấy tờ | Enum(String(50)) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Số giấy tờ | String(255) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Số điện thoại | String(20) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Đơn vị | String(255) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Ngày sinh | Date | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc.<br>- Định dạng `dd/mm/yyyy`. |
| Quốc gia | Enum(String(50)) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Tỉnh/Thành phố | String(100) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Phường/Xã | String(100) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Địa chỉ chi tiết | String(500) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Trạng thái | Enum(String(50)) | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc. |
| Ngày tạo | DateTime | - | Theo hồ sơ | Theo thông tin bản ghi, dạng chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Cây phân quyền | Boolean | - | Theo hồ sơ | Control UI: Cây phân quyền chỉ đọc (Read-only). |
| **Nhóm nút thao tác cuối form** | - | - | - | Khối các nút hành động đặt tại footer của popup xem chi tiết.<br>- **Đóng**: Luôn hiển thị.<br>- **Cập nhật**: Chỉ hiển thị khi trạng thái là `Đang hoạt động`.<br>- **Khóa**: Chỉ hiển thị khi trạng thái là `Đang hoạt động`.<br>- **Mở khóa**: Chỉ hiển thị khi trạng thái là `Bị khóa`.<br>- **Đóng**: Chỉ hiển thị khi trạng thái là `Đang hoạt động` hoặc `Bị khóa`. |

##### 4.1.10.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Đóng Popup Modal xem chi tiết và quay lại danh sách kết quả tại MH01. |
| 2 | Cập nhật | Button | Mở **MH02 - Popup Thêm mới / Cập nhật tài khoản phụ** ở chế độ Cập nhật. |
| 3 | Khóa | Button | Mở **MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng** (trong tài liệu `SRS_Quan_ly_tai_khoan_khach_hang.md`) với `Loại thao tác` là `Khóa`. |
| 4 | Mở khóa | Button | Mở **MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng** (trong tài liệu `SRS_Quan_ly_tai_khoan_khach_hang.md`) với `Loại thao tác` là `Mở khóa`. |
| 5 | Đóng | Button | Mở **MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng** (trong tài liệu `SRS_Quan_ly_tai_khoan_khach_hang.md`) với `Loại thao tác` là `Đóng`. |
