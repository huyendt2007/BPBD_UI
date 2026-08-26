### 4.1.8. UC003 - Cập nhật thông tin tài khoản dành cho Khách hàng

#### 4.1.8.1. Mục đích

- Cho phép Khách hàng cập nhật thông tin hồ sơ tài khoản sau khi đăng nhập thành công.
- Đảm bảo thông tin trên màn hình cập nhật đồng nhất với màn hình xem chi tiết tài khoản UC002 và UI mockup `Hồ sơ cá nhân`.
- Áp dụng chung cho tài khoản **Cá nhân** và tài khoản **Tổ chức** trên cùng một màn hình UC003.MH01.
- Kiểm soát trường được sửa theo nguồn xác thực của hồ sơ: `VNeID`, `Nội bộ`, `VNeID, Nội bộ`.
- Người dùng truy cập UC003 từ màn hình UC002 bằng nút `Cập nhật`.

#### 4.1.8.3. UC003.MH01 - Cập nhật thông tin tài khoản

##### 4.1.8.3.1. Màn hình

- Màn hình hiển thị form cập nhật thông tin tài khoản của người dùng đang đăng nhập.
- Tiêu đề màn hình hiển thị động theo `Loại khách hàng` của hồ sơ: `Cập nhật thông tin tài khoản Cá nhân` hoặc `Cập nhật thông tin tài khoản Tổ chức`.
- Dữ liệu được tự động điền theo hồ sơ tài khoản hiện tại của người dùng đang đăng nhập.
- Form gồm các khối thông tin: `Thông tin chung tài khoản`, `Thông tin khách hàng Cá nhân`, `Thông tin khách hàng Tổ chức`, `Thông tin địa chỉ & Thiết lập sử dụng`.
- Cuối màn hình hiển thị 02 nút thao tác: `Hủy`, `Lưu cập nhật`.

##### 4.1.8.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung tài khoản** | - | - | - | - Khối luôn hiển thị cho cả Cá nhân và Tổ chức.<br>- Toàn bộ thông tin trong khối là chỉ đọc. |
| Loại khách hàng | Enum(String(50)) | Không | Theo hồ sơ tài khoản | - Control UI: Text hiển thị (Read-only).<br>- Giá trị: `Cá nhân` hoặc `Tổ chức` |
| Loại tài khoản | Enum(String(50)) | Không | Theo người dùng đang đăng nhập | - Control UI: Text hiển thị (Read-only).<br>- Giá trị: `Tài khoản chính` hoặc `Tài khoản phụ`.|
| Nguồn xác thực | Enum(String(100)) | Không | Theo hồ sơ tài khoản | - Control UI: Text hiển thị (Read-only).<br>- Giá trị bao gồm: <br> + `VNeID` <br> + `Nội bộ` <br> + `VNeID, Nội bộ`|
| **II.A. Thông tin khách hàng Cá nhân** | - | - | - | - Khối chỉ hiển thị khi `Loại khách hàng = Cá nhân`. |
| Loại giấy tờ | Enum(String(50)) | Có | Theo hồ sơ tài khoản | - Control UI: Combobox.<br>- Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10].<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`|
| Số giấy tờ | String(50) | Có | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`.|
| Tên khách hàng | String(255) | Có | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Ngày sinh | Date | Không | Theo hồ sơ tài khoản | - Control UI: Datepicker, định dạng `dd/mm/yyyy`.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Giới tính | Enum(String(20)) | Không | Theo hồ sơ tài khoản | - Control UI: Combobox.<br>- Giá trị: `Nam`, `Nữ`, `Khác`.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Quốc tịch | Enum(String(255)) | Có | Theo hồ sơ tài khoản | - Control UI: Combobox.<br>- Tham chiếu Danh mục Quốc tịch / Quốc gia [DM_09].<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`.<br>- Tác vụ khi thay đổi: Tự động cập nhật `Phân loại khách hàng` và chuyển đổi cách nhập của trường `Tỉnh/Thành phố`. |
| Email cá nhân (Tên đăng nhập) | String(255) | Có nếu hồ sơ có Nội bộ | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Cho phép sửa khi hồ sơ chỉ có `VNeID`; khóa chỉ đọc khi có `Nội bộ` hoặc `VNeID, Nội bộ`<br>- Ràng buộc: Kiểm tra định dạng email theo [BR-VAL-002].|
| Số điện thoại cá nhân | String(20) | Có | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Luôn cho phép chỉnh sửa ở mọi nguồn xác thực.<br>- Ràng buộc: Kiểm tra định dạng số điện thoại và kiểm tra trùng [BR-VAL-009]. |
| **II.B. Thông tin khách hàng Tổ chức** | - | - | - | - Khối chỉ hiển thị khi `Loại khách hàng = Tổ chức`. |
| Loại tổ chức | Enum(String(100)) | Có | Theo hồ sơ tài khoản | - Control UI: Combobox.<br>- Giá trị gồm: `Tổ chức có đăng ký kinh doanh trong nước`, `Tổ chức nước ngoài`.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`.<br>- Tác vụ khi thay đổi: Cập nhật nhãn hiển thị và quy tắc bắt buộc của trường định danh tổ chức. |
| Mã định danh tổ chức / Mã số thuế/Số giấy phép đầu tư | String(100) | Có theo loại tổ chức | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Hiển thị khi: Nhãn và ô nhập tự động đổi theo `Loại tổ chức`.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi có `VNeID`. |
| Tên tổ chức | String(255) | Có | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Quốc gia đăng ký | Enum(String(255)) | Có | Theo hồ sơ tài khoản | - Control UI: Combobox.<br>- Tham chiếu Danh mục Quốc tịch / Quốc gia [DM_09].<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`.<br>- Tác vụ khi thay đổi: Tự động cập nhật `Phân loại khách hàng` và chuyển đổi cách nhập của trường `Tỉnh/Thành phố`. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có nếu hồ sơ có Nội bộ | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Cho phép sửa khi hồ sơ chỉ có `VNeID`; khóa chỉ đọc khi có `Nội bộ` hoặc `VNeID, Nội bộ`.|
| Số điện thoại tổ chức | String(20) | Không | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. |
| Họ và tên người đại diện | String(255) | Không | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Loại giấy tờ người đại diện | Enum(String(50)) | Không | Theo hồ sơ tài khoản | - Control UI: Combobox.<br>- Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10].<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi có `VNeID`. |
| Số giấy tờ người đại diện | String(50) | Không | Theo hồ sơ tài khoản | - Control UI: Input text.<br>- Quyền chỉnh sửa: Cho phép sửa khi `Nguồn xác thực = Nội bộ`; khóa chỉ đọc khi có `VNeID`. |
| **III. Thông tin địa chỉ & Thiết lập sử dụng** | - | - | - | - Khối luôn hiển thị cho cả Cá nhân và Tổ chức. |
| Phân loại khách hàng | Enum(String(50)) | Không | Tự động theo Quốc tịch/Quốc gia đăng ký | - Control UI: Text hiển thị (Read-only).<br>- Giá trị: Tự động hiển thị `Trong nước` nếu Quốc tịch/Quốc gia là `Việt Nam`; hiển thị `Nước ngoài` nếu khác `Việt Nam`.<br>- Quyền chỉnh sửa: Luôn chỉ đọc. |
| Trung tâm Đăng ký mặc định | Enum(String(255)) | Không | Theo hồ sơ tài khoản | - Control UI: Combobox.<br>- Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08].<br>- Quyền chỉnh sửa: Luôn cho phép chỉnh sửa. |
| Nhu cầu sử dụng tài khoản | List(String) | Không | Theo hồ sơ tài khoản | - Control UI: Chip (Chọn nhiều).<br>- Giá trị: `Đăng ký`, `Tra cứu`.<br>- Quyền chỉnh sửa: Cho phép chỉnh sửa. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Theo hồ sơ tài khoản | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Theo hồ sơ tài khoản | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Không | Theo hồ sơ tài khoản | Control UI: Textarea / Input text.<br>- Nhập/hiển thị số nhà, tên đường/phố, thôn/xóm/ấp... |

##### 4.1.8.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu cập nhật | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
| | | | **TH1 - Bỏ trống trường bắt buộc**: Nếu một hoặc nhiều trường bắt buộc đang cho phép nhập bị bỏ trống, vi phạm [BR-VAL-001], hệ thống tô viền đỏ ô trống đầu tiên, hiển thị cảnh báo [MSG-ERR-VAL-001] và tự động focus con trỏ vào ô lỗi đầu tiên. Không cho phép lưu. |
| | | | **TH2 - Email sai định dạng**: Nếu trường Email được phép sửa và nhập sai định dạng, vi phạm [BR-VAL-002], hệ thống hiển thị thông báo lỗi [MSG-ERR-VAL-002]. Không cho phép lưu. |
| | | | **TH3 - Email đã tồn tại**: Nếu Email được phép sửa và trùng với email đã đăng ký của tài khoản khác ở trạng thái **Đang hoạt động** và **Khóa** trên hệ thống, vi phạm [BR-VAL-009], hệ thống hiển thị thông báo lỗi [MSG-ERR-VAL-009]. Không cho phép lưu. |
| | | | **TH4 - Số điện thoại không hợp lệ**: Nếu Số điện thoại nhập sai định dạng hoặc trùng với tài khoản khác ở trạng thái **Đang hoạt động** và **Khóa** trên hệ thống, vi phạm [BR-VAL-009], hệ thống hiển thị thông báo lỗi tương ứng. Không cho phép lưu. |
| | | | **TH5 - Số giấy tờ/Mã định danh trùng**: Nếu trường định danh được phép sửa nhưng bị trùng với hồ sơ tài khoản khác ở trạng thái **Đang hoạt động** và **Khóa** trên toàn hệ thống, ngoại trừ hồ sơ hiện tại, vi phạm [BR-VAL-009], hệ thống hiển thị thông báo lỗi dưới ô tương ứng. Không cho phép lưu. |
| | | | **TH6 - Chưa chọn/nhập Tỉnh Thành phố**: Nếu Quốc gia là `Việt Nam` nhưng chưa chọn Tỉnh/Thành phố, hoặc Quốc gia khác `Việt Nam` nhưng chưa nhập Tỉnh/Thành phố, vi phạm [BR-VAL-001], hệ thống báo lỗi trường bắt buộc. Không cho phép lưu. |
| | | | **TH Hợp lệ**: Hệ thống lưu thông tin cập nhật vào CSDL, tự động tính lại `Phân loại khách hàng`, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-ACC-001], cập nhật lại tên/email hiển thị trên Header người dùng và quay về màn hình Xem chi tiết tài khoản (UC002). |
| 2 | Hủy | Button | Đóng form cập nhật, không lưu bất kỳ thay đổi nào và quay về màn hình Xem chi tiết tài khoản (UC002). |
