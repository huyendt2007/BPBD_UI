### 4.1.8. UC003 - Cập nhật thông tin tài khoản dành cho Khách hàng

#### 4.1.8.1. Mục đích

- Cho phép Khách hàng cập nhật thông tin hồ sơ tài khoản sau khi đăng nhập thành công.
- Đảm bảo thông tin trên màn hình cập nhật đồng nhất với màn hình xem chi tiết tài khoản UC002 và UI mockup `Hồ sơ cá nhân`.
- Áp dụng cho tài khoản **Cá nhân** và tài khoản **Tổ chức**.
- Kiểm soát trường được sửa theo nguồn xác thực của hồ sơ:
  - `VNeID`
  - `Nội bộ`
  - `VNeID, Nội bộ`

**Phân quyền**

- Khách hàng đã đăng nhập thành công vào Website Khách hàng.
- Áp dụng cho tài khoản Cá nhân và tài khoản Tổ chức.

**Điều kiện thực hiện**

- Người dùng truy cập từ UC002 bằng nút `Cập nhật`.
- Hồ sơ tài khoản đang ở trạng thái cho phép cập nhật.
- Hệ thống hoạt động bình thường.

#### 4.1.8.2. Quy định chung về cập nhật

- Màn hình có tiêu đề động:
  - Cá nhân: `Cập nhật thông tin tài khoản Cá nhân`.
  - Tổ chức: `Cập nhật thông tin tài khoản Tổ chức`.
- Dưới tiêu đề có alert thông tin giải thích quy tắc chỉnh sửa theo nguồn xác thực.
- Cuối màn hình hiển thị 2 nút:
  - `Hủy`: quay về UC002, không lưu thay đổi.
  - `Lưu cập nhật`: validate và lưu dữ liệu hợp lệ.
- Các trường `Loại khách hàng`, `Loại tài khoản`, `Nguồn xác thực`, `Phân loại khách hàng` luôn hiển thị chỉ đọc.
- Trường định danh cá nhân/tổ chức:
  - Nếu hồ sơ có nguồn xác thực `VNeID` hoặc `VNeID, Nội bộ`: khóa chỉ đọc.
  - Nếu hồ sơ chỉ có nguồn xác thực `Nội bộ`: cho phép chỉnh sửa và kiểm tra trùng lặp theo quy định nghiệp vụ.
- Trường Email (Tên đăng nhập):
  - Cho phép sửa khi hồ sơ chỉ có `VNeID` và chưa thiết lập Nội bộ, vì email lúc này chỉ là thông tin liên hệ.
  - Không cho phép sửa khi hồ sơ có `Nội bộ` hoặc `VNeID, Nội bộ`, vì email đang là tên đăng nhập hệ thống.
- Các trường liên hệ/địa chỉ sau được phép sửa ở mọi nguồn xác thực, trừ khi trường đang bị hệ thống khóa theo trạng thái hồ sơ:
  - `Số điện thoại`
  - `Tỉnh/Thành phố`
  - `Địa chỉ chi tiết`
  - `Trung tâm Đăng ký mặc định`
- Quy tắc `Tỉnh/Thành phố`:
  - Nếu `Quốc tịch`/`Quốc gia đăng ký` là `Việt Nam`: hiển thị combobox lấy từ Danh mục Tỉnh/Thành phố [DM_13].
  - Nếu `Quốc tịch`/`Quốc gia đăng ký` khác `Việt Nam`: hiển thị ô nhập văn bản.
- UC003 không xử lý thiết lập/đổi phương thức đăng nhập. Các thao tác này thuộc UC002 và UCPS006.

#### 4.1.8.3. UC003.MH01 - Cập nhật thông tin tài khoản Cá nhân

##### 4.1.8.3.1. Màn hình

- Màn hình hiển thị form cập nhật thông tin tài khoản Cá nhân.
- Form gồm các khối:
  - Khối I: `Thông tin chung tài khoản`.
  - Khối II.A: `Thông tin định danh Cá nhân`.
  - Khối III: `Thông tin địa chỉ & Thiết lập sử dụng`.
- Dữ liệu được tự động điền theo hồ sơ hiện tại.

##### 4.1.8.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung tài khoản** | - | - | - | Khối luôn hiển thị. Toàn bộ trường trong khối chỉ đọc, không cho phép chỉnh sửa. |
| Loại khách hàng | Enum(String(50)) | Không | `Cá nhân` | Read-only. Hiển thị loại chủ thể của hồ sơ tài khoản đang cập nhật. |
| Loại tài khoản | Enum(String(50)) | Không | Theo người dùng đang đăng nhập | Read-only. Hiển thị `Tài khoản chính` hoặc `Tài khoản phụ` theo thông tin người dùng đang đăng nhập. |
| Nguồn xác thực | Enum(String(100)) | Không | Theo hồ sơ tài khoản | Read-only. Giá trị gồm: `VNeID`, `Nội bộ`, `VNeID, Nội bộ`. Hệ thống căn cứ giá trị này để khóa/mở các trường định danh và email. |
| **II.A. Thông tin định danh Cá nhân** | - | - | - | Khối chỉ hiển thị khi `Loại khách hàng = Cá nhân`; ẩn khi `Loại khách hàng = Tổ chức`. Các trường định danh trong khối bị khóa nếu hồ sơ có `VNeID` hoặc `VNeID, Nội bộ`; cho phép chỉnh sửa nếu hồ sơ chỉ có `Nội bộ`. |
| Loại giấy tờ | Enum(String(50)) | Có | Theo hồ sơ tài khoản | Combobox tham chiếu [DM_10]. Giá trị gồm: `CCCD`, `CMND`, `Hộ chiếu`. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, hệ thống kiểm tra trùng lặp theo bộ thông tin định danh cá nhân. |
| Số giấy tờ | String(50) | Có | Theo hồ sơ tài khoản | Input. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, hệ thống kiểm tra trùng số giấy tờ trên toàn hệ thống, ngoại trừ hồ sơ hiện tại. |
| Tên khách hàng | String(255) | Có | Theo hồ sơ tài khoản | Input. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, hệ thống kiểm tra trùng lặp theo bộ thông tin định danh cá nhân. |
| Ngày sinh | Date | Không | Theo hồ sơ tài khoản | Date/Input theo định dạng `DD/MM/YYYY`. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, hệ thống kiểm tra trùng lặp theo bộ thông tin định danh cá nhân. |
| Giới tính | Enum(String(20)) | Không | Theo hồ sơ tài khoản | Combobox. Giá trị gồm: `Nam`, `Nữ`, `Khác`. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Quốc tịch | Enum(String(255)) | Có | Theo hồ sơ tài khoản | Combobox tham chiếu [DM_09]. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi thay đổi, hệ thống tự động tính lại `Phân loại khách hàng` và cập nhật cách nhập `Tỉnh/Thành phố`. |
| Email cá nhân (Tên đăng nhập) | String(255) | Có nếu hồ sơ có Nội bộ | Theo hồ sơ tài khoản | Input. Cho phép chỉnh sửa khi hồ sơ chỉ có `VNeID` và chưa thiết lập tài khoản Nội bộ; khi đó email đóng vai trò email liên hệ. Read-only khi hồ sơ có `Nội bộ` hoặc `VNeID, Nội bộ`, vì email đang là tên đăng nhập hệ thống. Khi được sửa, kiểm tra định dạng email [BR-VAL-002]. |
| Số điện thoại cá nhân | String(20) | Có | Theo hồ sơ tài khoản | Input. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. Kiểm tra định dạng số điện thoại và kiểm tra trùng trên toàn hệ thống, ngoại trừ hồ sơ hiện tại. |
| **III. Thông tin địa chỉ & Thiết lập sử dụng** | - | - | - | Khối dùng chung cho cả Cá nhân và Tổ chức. Các trường liên hệ/địa chỉ trong khối được phép chỉnh sửa ở mọi nguồn xác thực, trừ `Phân loại khách hàng` luôn read-only. |
| Phân loại khách hàng | Enum(String(50)) | Không | Tự động theo Quốc tịch | Read-only. Tự động hiển thị `Trong nước` nếu `Quốc tịch = Việt Nam`; hiển thị `Nước ngoài` nếu khác `Việt Nam`. |
| Trung tâm Đăng ký mặc định | Enum(String(255)) | Không | Theo hồ sơ tài khoản | Dropdown tham chiếu [DM_08]. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. |
| Nhu cầu sử dụng tài khoản | List(String) | Không | Theo hồ sơ tài khoản | Dạng chip/chọn nhiều. Giá trị gồm: `Đăng ký`, `Tra cứu`. Cho phép chỉnh sửa theo nhu cầu sử dụng của khách hàng. |
| Tỉnh/Thành phố | Enum/String(255) | Có | Theo hồ sơ tài khoản | Nếu `Quốc tịch = Việt Nam`, hiển thị Dropdown [DM_13]. Nếu `Quốc tịch` khác `Việt Nam`, hiển thị Textbox để nhập giá trị văn bản. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. |
| Địa chỉ chi tiết | String(500) | Không | Theo hồ sơ tài khoản | Textarea. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. |

##### 4.1.8.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu cập nhật | Button | Validate dữ liệu đang được phép nhập/sửa. Nếu hợp lệ, hệ thống lưu thông tin tài khoản Cá nhân, tính lại `Phân loại khách hàng`, ghi Audit Log, cập nhật thông tin hiển thị trên header/dropdown người dùng và quay về UC002.MH01 - Xem chi tiết tài khoản. |
| 2 | Hủy | Button | Hủy thao tác cập nhật, không lưu dữ liệu đã thay đổi và quay về UC002.MH01 - Xem chi tiết tài khoản. |

#### 4.1.8.4. UC003.MH02 - Cập nhật thông tin tài khoản Tổ chức

##### 4.1.8.4.1. Màn hình

- Màn hình hiển thị form cập nhật thông tin tài khoản Tổ chức.
- Form gồm các khối:
  - Khối I: `Thông tin chung tài khoản`.
  - Khối II.B: `Thông tin định danh & Người đại diện Tổ chức`.
  - Khối III: `Thông tin địa chỉ & Thiết lập sử dụng`.
- Dữ liệu được tự động điền theo hồ sơ hiện tại.
- Nhãn trường định danh tổ chức hiển thị động theo `Loại tổ chức`.

##### 4.1.8.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung tài khoản** | - | - | - | Khối luôn hiển thị. Toàn bộ trường trong khối chỉ đọc, không cho phép chỉnh sửa. |
| Loại khách hàng | Enum(String(50)) | Không | `Tổ chức` | Read-only. Hiển thị loại chủ thể của hồ sơ tài khoản đang cập nhật. |
| Loại tài khoản | Enum(String(50)) | Không | Theo người dùng đang đăng nhập | Read-only. Hiển thị `Tài khoản chính` hoặc `Tài khoản phụ` theo thông tin người dùng đang đăng nhập. |
| Nguồn xác thực | Enum(String(100)) | Không | Theo hồ sơ tài khoản | Read-only. Giá trị gồm: `VNeID`, `Nội bộ`, `VNeID, Nội bộ`. Hệ thống căn cứ giá trị này để khóa/mở các trường định danh và email. |
| **II.B. Thông tin định danh & Người đại diện Tổ chức** | - | - | - | Khối chỉ hiển thị khi `Loại khách hàng = Tổ chức`; ẩn khi `Loại khách hàng = Cá nhân`. Các trường định danh trong khối bị khóa nếu hồ sơ có `VNeID` hoặc `VNeID, Nội bộ`; cho phép chỉnh sửa nếu hồ sơ chỉ có `Nội bộ`. |
| Loại tổ chức | Enum(String(100)) | Có | Theo hồ sơ tài khoản | Combobox. Giá trị gồm: `Tổ chức có đăng ký kinh doanh trong nước`, `Tổ chức nước ngoài`. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi thay đổi, hệ thống cập nhật nhãn và quy tắc bắt buộc của trường định danh tổ chức. |
| Mã định danh tổ chức | String(100) | Có theo loại tổ chức | Theo hồ sơ tài khoản | Input. Hiển thị khi `Loại tổ chức = Tổ chức có đăng ký kinh doanh trong nước`. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, kiểm tra trùng mã định danh tổ chức trên toàn hệ thống, ngoại trừ hồ sơ hiện tại. |
| Mã số thuế/Số giấy phép đầu tư | String(100) | Có theo loại tổ chức | Theo hồ sơ tài khoản | Input. Hiển thị khi `Loại tổ chức = Tổ chức nước ngoài`. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, kiểm tra trùng mã số thuế/số giấy phép đầu tư trên toàn hệ thống, ngoại trừ hồ sơ hiện tại. |
| Tên tổ chức | String(255) | Có | Theo hồ sơ tài khoản | Input. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, hệ thống kiểm tra trùng lặp theo bộ thông tin định danh tổ chức. |
| Quốc gia đăng ký | Enum(String(255)) | Có | Theo hồ sơ tài khoản | Combobox tham chiếu [DM_09]. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi thay đổi, hệ thống tự động tính lại `Phân loại khách hàng` và cập nhật cách nhập `Tỉnh/Thành phố`. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có nếu hồ sơ có Nội bộ | Theo hồ sơ tài khoản | Input. Cho phép chỉnh sửa khi hồ sơ chỉ có `VNeID` và chưa thiết lập tài khoản Nội bộ; khi đó email đóng vai trò email liên hệ. Read-only khi hồ sơ có `Nội bộ` hoặc `VNeID, Nội bộ`, vì email đang là tên đăng nhập hệ thống. Khi được sửa, kiểm tra định dạng email [BR-VAL-002]. |
| Số điện thoại tổ chức | String(20) | Không | Theo hồ sơ tài khoản | Input. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. Kiểm tra định dạng số điện thoại và kiểm tra trùng trên toàn hệ thống nếu có nhập, ngoại trừ hồ sơ hiện tại. |
| Họ và tên người đại diện | String(255) | Không | Theo hồ sơ tài khoản | Input. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Loại giấy tờ người đại diện | Enum(String(50)) | Không | Theo hồ sơ tài khoản | Combobox tham chiếu [DM_10]. Giá trị gồm: `CCCD`, `CMND`, `Hộ chiếu`. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. |
| Số giấy tờ người đại diện | String(50) | Không | Theo hồ sơ tài khoản | Input. Cho phép chỉnh sửa khi `Nguồn xác thực = Nội bộ`; read-only khi `Nguồn xác thực = VNeID` hoặc `VNeID, Nội bộ`. Khi được sửa, kiểm tra trùng số giấy tờ người đại diện theo quy định nghiệp vụ, ngoại trừ hồ sơ hiện tại. |
| **III. Thông tin địa chỉ & Thiết lập sử dụng** | - | - | - | Khối dùng chung cho cả Cá nhân và Tổ chức. Các trường liên hệ/địa chỉ trong khối được phép chỉnh sửa ở mọi nguồn xác thực, trừ `Phân loại khách hàng` luôn read-only. |
| Phân loại khách hàng | Enum(String(50)) | Không | Tự động theo Quốc gia đăng ký | Read-only. Tự động hiển thị `Trong nước` nếu `Quốc gia đăng ký = Việt Nam`; hiển thị `Nước ngoài` nếu khác `Việt Nam`. |
| Trung tâm Đăng ký mặc định | Enum(String(255)) | Không | Theo hồ sơ tài khoản | Dropdown tham chiếu [DM_08]. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. |
| Nhu cầu sử dụng tài khoản | List(String) | Không | Theo hồ sơ tài khoản | Dạng chip/chọn nhiều. Giá trị gồm: `Đăng ký`, `Tra cứu`. Cho phép chỉnh sửa theo nhu cầu sử dụng của khách hàng. |
| Tỉnh/Thành phố | Enum/String(255) | Có | Theo hồ sơ tài khoản | Nếu `Quốc gia đăng ký = Việt Nam`, hiển thị Dropdown [DM_13]. Nếu `Quốc gia đăng ký` khác `Việt Nam`, hiển thị Textbox để nhập giá trị văn bản. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. |
| Địa chỉ chi tiết | String(500) | Không | Theo hồ sơ tài khoản | Textarea. Luôn cho phép chỉnh sửa ở mọi nguồn xác thực. |

##### 4.1.8.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu cập nhật | Button | Validate dữ liệu đang được phép nhập/sửa. Nếu hợp lệ, hệ thống lưu thông tin tài khoản Tổ chức, tính lại `Phân loại khách hàng`, ghi Audit Log, cập nhật thông tin hiển thị trên header/dropdown người dùng và quay về UC002.MH01 - Xem chi tiết tài khoản. |
| 2 | Hủy | Button | Hủy thao tác cập nhật, không lưu dữ liệu đã thay đổi và quay về UC002.MH01 - Xem chi tiết tài khoản. |

#### 4.1.8.5. Xử lý validate chung

| Trường hợp | Điều kiện | Xử lý |
| :--- | :--- | :--- |
| TH1 - Bỏ trống trường bắt buộc | Một hoặc nhiều trường bắt buộc, đang cho phép nhập, bị bỏ trống | Áp dụng [BR-VAL-001]. Hệ thống highlight trường lỗi, hiển thị [MSG-ERR-VAL-001] và focus trường lỗi đầu tiên. |
| TH2 - Email sai định dạng | Trường Email được phép sửa và giá trị không đúng định dạng email | Áp dụng [BR-VAL-002], hiển thị [MSG-ERR-VAL-002]. |
| TH3 - Email trùng | Email được phép sửa nhưng đã tồn tại ở hồ sơ khác theo quy tắc kiểm tra trùng của hệ thống | Áp dụng [BR-VAL-009], hiển thị [MSG-ERR-VAL-009]. |
| TH4 - Số điện thoại sai định dạng | Số điện thoại không đúng định dạng cho phép | Hiển thị lỗi dưới trường `Số điện thoại`. |
| TH5 - Số điện thoại trùng | Số điện thoại đã được dùng bởi tài khoản khác đang hoạt động | Áp dụng [BR-VAL-009], hiển thị lỗi dưới trường `Số điện thoại`. |
| TH6 - Số giấy tờ/Mã định danh trùng | Trường định danh được phép sửa nhưng trùng hồ sơ khác | Áp dụng [BR-VAL-009], hiển thị lỗi dưới trường tương ứng. |
| TH7 - Quốc gia/Tỉnh TP không hợp lệ | Quốc tịch/Quốc gia đăng ký là `Việt Nam` nhưng chưa chọn tỉnh/thành phố, hoặc khác `Việt Nam` nhưng chưa nhập tỉnh/thành phố khi trường đang bắt buộc | Áp dụng [BR-VAL-001]. |
| TH8 - Hợp lệ | Tất cả kiểm tra hợp lệ | Lưu dữ liệu, ghi Audit Log, hiển thị Toast `Cập nhật thông tin tài khoản thành công!`, quay về màn hình UC002. |

#### 4.1.8.6. Dữ liệu sau cập nhật

- Sau khi lưu thành công, hệ thống cập nhật các trường hồ sơ tương ứng trong CSDL.
- Nếu `Tên khách hàng` hoặc `Tên tổ chức` thay đổi, hệ thống cập nhật tên hiển thị trên header/dropdown người dùng.
- Nếu `Email` được phép sửa và đã thay đổi, hệ thống cập nhật email hiển thị trên header/dropdown người dùng. Nếu hồ sơ đã có nguồn Nội bộ, email không được sửa trong UC003.
- `Phân loại khách hàng` được tính lại theo Quốc tịch/Quốc gia đăng ký:
  - `Việt Nam`: `Trong nước`.
  - Khác `Việt Nam`: `Nước ngoài`.
- `Trung tâm Đăng ký mặc định` sau cập nhật được dùng làm giá trị mặc định ở các nghiệp vụ có trường Cơ quan tiếp nhận/Trung tâm đăng ký.
