### 4.1.7. UC002 - Xem thông tin tài khoản dành cho Khách hàng

#### 4.1.7.1. Mục đích

\- Cho phép người dùng đã đăng nhập (Cá nhân hoặc Tổ chức) xem thông tin chi tiết tài khoản của mình trên hệ thống.  
\- Đối với tài khoản chính của Tổ chức, cho phép xem danh sách và trạng thái các tài khoản con trực thuộc đơn vị của mình.  
\- Đối với tài khoản con trực thuộc Tổ chức, cho phép xem thông tin cá nhân của chính mình, thông tin của tổ chức mẹ và danh sách các tài khoản con khác cùng đơn vị ở chế độ chỉ đọc.  
\- Cho phép người dùng xem và quản lý các phương thức đăng nhập đang liên kết với cùng hồ sơ tài khoản khách hàng.

*a. Phân quyền*

\- Khách hàng đã có tài khoản và đăng nhập thành công (Cá nhân, Tài khoản chính của Tổ chức, hoặc Tài khoản con thuộc Tổ chức).  

*b. Điều kiện thực hiện*

\- Khách hàng đã đăng nhập thành công vào Website Khách hàng.  
\- Hệ thống hoạt động bình thường.  

#### 4.1.7.2. Quy định chung - Block Phương thức đăng nhập

##### 4.1.7.2.1. Màn hình

\- Block **Phương thức đăng nhập** hiển thị trên các màn hình Xem thông tin tài khoản UC002.MH01, UC002.MH02 và UC002.MH03.  
\- Block được thiết kế dạng Card riêng, tách biệt với các khối thông tin cá nhân/tổ chức hiện có.  
\- Block thuộc nhóm thông tin bảo mật/đăng nhập, không thuộc nhóm thông tin hồ sơ khách hàng.  
\- Card hiển thị danh sách phương thức đăng nhập dưới dạng chip/tag kèm trạng thái và nút thao tác tương ứng.

##### 4.1.7.2.2. Mô tả thông tin trên block Phương thức đăng nhập

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Phương thức đăng nhập | Card | \- | Theo hồ sơ tài khoản | Control UI: Card riêng.<br>- Hiển thị trong màn Xem thông tin tài khoản sau khi người dùng đã đăng nhập.<br>- Không hiển thị chung trong bảng thông tin cá nhân/tổ chức.<br>- Card thuộc nhóm bảo mật/đăng nhập, dùng để thể hiện các nguồn xác thực đang liên kết với cùng một hồ sơ tài khoản khách hàng. |
| VNeID | Chip/Tag | \- | Theo Nguồn xác thực | Control UI: Chip/Tag.<br>- Nếu hồ sơ đã liên kết nguồn xác thực VNeID: Hiển thị trạng thái `Đã liên kết`.<br>- Nếu hồ sơ chưa liên kết nguồn xác thực VNeID: Hiển thị trạng thái `Chưa liên kết` ở trạng thái mờ.<br>- Hiển thị mô tả `Đăng nhập bằng TechID đã xác thực qua DVCQG/VNeID`.<br>- Không hiển thị trường TechID dạng rõ trên màn hình khách hàng; TechID chỉ phục vụ nhận diện nguồn xác thực VNeID trong hệ thống.<br>- Không hiển thị nút thiết lập VNeID tại block này; việc liên kết VNeID thực hiện theo luồng đăng nhập/xác thực VNeID. |
| Nội bộ (Email/Mật khẩu) | Chip/Tag | \- | Theo Nguồn xác thực | Control UI: Chip/Tag.<br>- Nếu hồ sơ đã có nguồn xác thực Nội bộ: Hiển thị trạng thái `Đã liên kết`, hiển thị Email (Tên đăng nhập) của nguồn xác thực Nội bộ và nút `Đổi mật khẩu`.<br>- Nếu hồ sơ chưa có nguồn xác thực Nội bộ: Hiển thị trạng thái `Chưa thiết lập`, chip ở trạng thái mờ và hiển thị nút `Thiết lập ngay`.<br>- Email (Tên đăng nhập) chỉ được hiển thị tại block này để thể hiện định danh đăng nhập Nội bộ, không tách thành trường Tên đăng nhập riêng trong khối hồ sơ. |

**Quy tắc hiển thị trạng thái**:

- TH1 (Chỉ có VNeID): Chip `VNeID` hiển thị `Đã liên kết`; chip `Nội bộ (Email/Mật khẩu)` hiển thị `Chưa thiết lập` và nút `Thiết lập ngay`.
- TH2 (Chỉ có Nội bộ): Chip `Nội bộ (Email/Mật khẩu)` hiển thị `Đã liên kết` và nút `Đổi mật khẩu`; chip `VNeID` hiển thị `Chưa liên kết` ở trạng thái mờ.
- TH3 (Có đồng thời VNeID và Nội bộ): Cả hai chip hiển thị `Đã liên kết`; chip `Nội bộ (Email/Mật khẩu)` hiển thị nút `Đổi mật khẩu`.

##### 4.1.7.2.3. Chức năng trên block Phương thức đăng nhập

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thiết lập ngay | Button | Chỉ hiển thị tại chip `Nội bộ (Email/Mật khẩu)` khi hồ sơ tài khoản chưa có nguồn xác thực Nội bộ. Khi click, hệ thống mở popup [UC002.MH04 - Thiết lập phương thức đăng nhập Nội bộ](#4176-uc002mh04---popup-thiet-lap-phuong-thuc-dang-nhap-noi-bo), không điều hướng sang màn hình khác. |
| 2 | Đổi mật khẩu | Button | Chỉ hiển thị tại chip `Nội bộ (Email/Mật khẩu)` khi hồ sơ tài khoản đã có nguồn xác thực Nội bộ. Khi click, hệ thống mở chức năng [UCPS006 - Đổi mật khẩu dành cho Khách hàng](UCPS006_Doi_mat_khau_khach_hang.md). |

#### 4.1.7.3. UC002.MH01 - Màn hình Xem chi tiết Tài khoản cá nhân

##### 4.1.7.3.1. Màn hình

\- Giao diện dạng trang thông tin cá nhân chỉ đọc (Read-only), hiển thị toàn bộ thông tin đăng ký của Khách hàng cá nhân.  
\- Ở góc trên bên phải màn hình có các nút `Cập nhật` và `Đóng` để người dùng thao tác.  
\- Bên dưới khối thông tin cá nhân hiển thị block **Phương thức đăng nhập** theo quy định tại mục [4.1.7.2](#4172-quy-dinh-chung---block-phuong-thuc-dang-nhap).

##### 4.1.7.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin định danh và tài khoản** | | | | |
| Loại tài khoản | Enum(String(50)) | Có | Cá nhân | Control UI: Hiển thị/Read-only.<br>- Giá trị: `Cá nhân`. |
| Loại giấy tờ | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Tham chiếu tại Danh mục dùng chung - Loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(50) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Số CMND/CCCD/Hộ chiếu của khách hàng cá nhân. |
| Tên khách hàng | String(100) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Tên đầy đủ của khách hàng cá nhân. |
| Ngày sinh | Date | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Định dạng DD/MM/YYYY. |
| Giới tính | Enum(String(50)) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Nam, Nữ hoặc Khác. |
| Quốc tịch | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Tham chiếu Danh mục quốc gia [DM_09]. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc tịch | Control UI: Hiển thị/Read-only.<br>Gồm:<br>- Trong nước<br>- Nước ngoài |
| Tỉnh/TP | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Hiển thị giá trị đã lưu theo quy tắc Quốc tịch: nếu Quốc tịch là `Việt Nam` thì dữ liệu được chọn từ Danh mục dùng chung - Tỉnh/Thành phố [DM_13], nếu khác `Việt Nam` thì là giá trị văn bản người dùng tự nhập. |
| Địa chỉ chi tiết | String(500) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Địa chỉ cư trú chi tiết. |
| Email (Tên đăng nhập) | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Địa chỉ email của khách hàng, đồng thời là Tên đăng nhập nếu hồ sơ có nguồn xác thực Nội bộ. Không hiển thị trường Tên đăng nhập riêng. |
| Số điện thoại | String(20) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Số điện thoại liên lạc. |
| Trung tâm Đăng ký mặc định | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Tên trung tâm giao dịch bảo đảm NRAST được gán mặc định cho tài khoản. |
| Nhu cầu sử dụng tài khoản | List(String) | \- | Theo hồ sơ | Control UI: Hiển thị/Read-only dạng nhãn/chip.<br>Gồm:<br>- Tài khoản đăng ký<br>- Tài khoản tra cứu |

##### 4.1.7.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Nút | \- Thao tác: NSD click nút Cập nhật. |
| | | | \- Xử lý: Hệ thống chuyển hướng người dùng sang Màn hình Cập nhật Tài khoản cá nhân (UC003.MH01). |
| 2 | Thao tác trên block Phương thức đăng nhập | Card action | Thực hiện theo quy định tại mục [4.1.7.2.3](#41723-chuc-nang-tren-block-phuong-thuc-dang-nhap). |
| 3 | Đóng | Nút | \- Thao tác: NSD click nút Đóng. |
| | | | \- Xử lý: Hệ thống chuyển hướng người dùng trở về trang chủ Website Khách hàng. |

#### 4.1.7.4. UC002.MH02 - Màn hình Xem chi tiết tài khoản Tổ chức (Tài khoản chính)

##### 4.1.7.4.1. Màn hình

\- Giao diện hiển thị thông tin hồ sơ của Tổ chức gồm các phần chỉ đọc (Read-only):  
  \+ Phần 1: Thông tin chung & thông tin liên lạc của Tổ chức.  
  \+ Phần 2: Thông tin Người đại diện theo pháp luật của Tổ chức.  
\- Ở góc trên bên phải màn hình có các nút `Cập nhật` và `Đóng` để người dùng thao tác.  
\- Bên dưới các khối thông tin tổ chức hiển thị block **Phương thức đăng nhập** theo quy định tại mục [4.1.7.2](#4172-quy-dinh-chung---block-phuong-thuc-dang-nhap).

##### 4.1.7.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung & liên lạc của Tổ chức** | | | | |
| Loại tài khoản | Enum(String(50)) | Có | Tổ chức | Control UI: Hiển thị/Read-only.<br>- Giá trị: `Tổ chức`. |
| Loại tổ chức | Enum(String(100)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>Gồm:<br>- Tổ chức có đăng ký kinh doanh trong nước<br>- Tổ chức nước ngoài |
| Mã định danh tổ chức/Mã số thuế/Số giấy phép đầu tư | String(100) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị tại cùng một vị trí thông tin trên màn hình, nhãn trường thay đổi theo Loại tổ chức.<br>- Nếu Loại tổ chức = `Tổ chức có đăng ký kinh doanh trong nước`: Hiển thị nhãn `Mã định danh tổ chức`.<br>- Nếu Loại tổ chức = `Tổ chức nước ngoài`: Hiển thị nhãn `Mã số thuế/Số giấy phép đầu tư`. |
| Tên tổ chức | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Tên đầy đủ của tổ chức. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Email của tổ chức, đồng thời là Tên đăng nhập nếu hồ sơ có nguồn xác thực Nội bộ. Không hiển thị trường Tên đăng nhập riêng. |
| Số điện thoại tổ chức | String(20) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. |
| Quốc gia đăng ký | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Tham chiếu Danh mục quốc gia [DM_09]. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc gia đăng ký/Loại tổ chức | Control UI: Hiển thị/Read-only.<br>Gồm:<br>- Trong nước<br>- Nước ngoài |
| Tỉnh/TP | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc.<br>- Hiển thị giá trị đã lưu theo quy tắc Quốc gia đăng ký: nếu Quốc gia đăng ký là `Việt Nam` thì dữ liệu được chọn từ Danh mục dùng chung - Tỉnh/Thành phố [DM_13], nếu khác `Việt Nam` thì là giá trị văn bản người dùng tự nhập. |
| Địa chỉ chi tiết | String(500) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Địa chỉ chi tiết trụ sở chính của Tổ chức. |
| Trung tâm Đăng ký mặc định | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Tên trung tâm giao dịch bảo đảm gán mặc định. |
| Nhu cầu sử dụng tài khoản | List(String) | \- | Theo hồ sơ | Control UI: Hiển thị/Read-only dạng nhãn/chip.<br>Gồm:<br>- Tài khoản đăng ký<br>- Tài khoản tra cứu |
| **II. Thông tin Người đại diện pháp luật** | | | | |
| Họ và tên người đại diện | String(100) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Họ và tên người đại diện hợp pháp. |
| Loại giấy tờ | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Tham chiếu Danh mục loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(50) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Số CMND/CCCD/Hộ chiếu người đại diện. |

##### 4.1.7.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Nút | \- Thao tác: NSD click nút Cập nhật. |
| | | | \- Xử lý: Hệ thống chuyển hướng người dùng sang Màn hình Cập nhật tài khoản Tổ chức (UC003.MH02). |
| 2 | Thao tác trên block Phương thức đăng nhập | Card action | Thực hiện theo quy định tại mục [4.1.7.2.3](#41723-chuc-nang-tren-block-phuong-thuc-dang-nhap). |
| 3 | Đóng | Nút | \- Thao tác: NSD click nút Đóng. |
| | | | \- Xử lý: Hệ thống chuyển hướng người dùng trở về trang chủ Website Khách hàng. |

#### 4.1.7.5. UC002.MH03 - Màn hình Xem chi tiết tài khoản con thuộc Tổ chức

##### 4.1.7.5.1. Màn hình

\- Giao diện hiển thị hồ sơ thông tin cho đối tượng là tài khoản con (nhân viên) đăng nhập.  
\- Giao diện chia làm 2 phần chính chỉ đọc:  
  \+ Phần 1: Thông tin cá nhân của chính mình.  
  \+ Phần 2: Thông tin của Tổ chức mẹ quản lý (chỉ đọc, địa chỉ chi tiết hiển thị thừa hưởng từ tổ chức mẹ).  
\- Ở góc trên khối thông tin cá nhân có các nút `Cập nhật` và `Đóng` để người dùng thao tác.  
\- Bên dưới các khối thông tin tài khoản con hiển thị block **Phương thức đăng nhập** theo quy định tại mục [4.1.7.2](#4172-quy-dinh-chung---block-phuong-thuc-dang-nhap).

##### 4.1.7.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin cá nhân của chính mình** | | | | |
| Mã khách hàng (Tổ chức chủ quản) | String(50) | \- | Theo Tổ chức chủ quản | Control UI: Hiển thị/Read-only.<br>- Hiển thị mã khách hàng của Tổ chức chủ quản. |
| Loại tài khoản | Enum(String(50)) | Có | Tài khoản phụ | Control UI: Hiển thị/Read-only.<br>- Giá trị: `Tài khoản phụ`. |
| Loại giấy tờ | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. CMND/CCCD/Hộ chiếu. |
| Số giấy tờ | String(50) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Số giấy tờ của tài khoản con. |
| Tên khách hàng | String(100) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Tên đầy đủ của tài khoản phụ. |
| Email (Tên đăng nhập) | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Email đồng thời là Tên đăng nhập nếu hồ sơ có nguồn xác thực Nội bộ. Không hiển thị trường Tên đăng nhập riêng. |
| Số điện thoại | String(20) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Số điện thoại cá nhân. |
| Đơn vị | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Đơn vị/phòng ban/chi nhánh của tài khoản phụ trong Tổ chức. |
| Quốc gia | String(50) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only. |
| Tỉnh/TP | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị giá trị đã lưu theo quy tắc Quốc gia. |
| Địa chỉ chi tiết | String(500) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only. |
| **II. Thông tin Tổ chức quản lý (Tổ chức mẹ) - Read-only** | | | | |
| Mã số tổ chức | String(50) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Mã số thuế của Tổ chức mẹ. |
| Tên tổ chức | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Tên đầy đủ của Tổ chức mẹ. |
| Địa chỉ của tổ chức | String(500) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Trạng thái: Chỉ đọc. Địa chỉ chi tiết của Tổ chức mẹ. Nhân viên tự động dùng chung địa chỉ này. |

##### 4.1.7.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Nút | \- Thao tác: NSD click nút Cập nhật. |
| | | | \- Xử lý: Hệ thống chuyển hướng người dùng đến Màn hình Cập nhật tài khoản con (UC003.MH03). |
| 2 | Thao tác trên block Phương thức đăng nhập | Card action | Thực hiện theo quy định tại mục [4.1.7.2.3](#41723-chuc-nang-tren-block-phuong-thuc-dang-nhap). |
| 3 | Đóng | Nút | \- Thao tác: NSD click nút Đóng. |
| | | | \- Xử lý: Hệ thống chuyển hướng người dùng trở về trang chủ Website Khách hàng. |

#### 4.1.7.6. UC002.MH04 - Popup Thiết lập phương thức đăng nhập Nội bộ

##### 4.1.7.6.1. Màn hình

\- Popup Custom Modal hiển thị khi người dùng click nút `Thiết lập ngay` tại chip `Nội bộ (Email/Mật khẩu)`.  
\- Popup hiển thị trên cùng màn hình Xem thông tin tài khoản hiện tại, không điều hướng sang trang khác.  
\- Popup dùng để gắn thêm nguồn xác thực Nội bộ vào cùng hồ sơ tài khoản khách hàng đang đăng nhập, không tạo hồ sơ tài khoản khách hàng mới.  
\- Các trường mật khẩu có nút/icon con mắt để ẩn/hiện ký tự đã nhập; mặc định hiển thị dạng che ký tự.

##### 4.1.7.6.2. Mô tả thông tin trên popup

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Email (Tên đăng nhập) | String(255) | Có | Theo dữ liệu sẵn có | Control UI: Input.<br>- Nếu nguồn VNeID/hồ sơ tài khoản có trả về hoặc đang lưu Email, hệ thống prefill giá trị Email.<br>- Cho phép người dùng sửa trước khi lưu thiết lập.<br>- Email được sử dụng làm Tên đăng nhập của nguồn xác thực Nội bộ.<br>- Áp dụng quy tắc định dạng Email **[BR-VAL-002]**.<br>- Kiểm tra duy nhất Email trên toàn hệ thống theo **[BR-VAL-009]**. |
| Mật khẩu mới | Password | Có | Trống | Control UI: Password input.<br>- Áp dụng quy tắc độ phức tạp mật khẩu **[BR-VAL-006]**.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |
| Nhập lại mật khẩu | Password | Có | Trống | Control UI: Password input.<br>- Phải trùng khớp với trường `Mật khẩu mới`.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |

##### 4.1.7.6.3. Chức năng trên popup

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, không lưu dữ liệu và giữ nguyên trạng thái block Phương thức đăng nhập. |
| 2 | Lưu thiết lập | Button | Khi click, hệ thống kiểm tra dữ liệu trên popup. |
| | | | - TH1 (Bỏ trống trường bắt buộc): Nếu Email (Tên đăng nhập), Mật khẩu mới hoặc Nhập lại mật khẩu bỏ trống, vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]** tại trường lỗi. Không cho phép lưu. |
| | | | - TH2 (Email sai định dạng): Nếu Email (Tên đăng nhập) không đúng định dạng, vi phạm **[BR-VAL-002]**, hiển thị **[MSG-ERR-VAL-002]** tại trường Email. Không cho phép lưu. |
| | | | - TH3 (Mật khẩu không đạt độ phức tạp): Nếu Mật khẩu mới không đạt quy tắc mật khẩu, vi phạm **[BR-VAL-006]**, hiển thị **[MSG-ERR-VAL-006]** tại trường Mật khẩu mới. Không cho phép lưu. |
| | | | - TH4 (Nhập lại mật khẩu không trùng khớp): Nếu Nhập lại mật khẩu không khớp Mật khẩu mới, hiển thị **[MSG-ERR-VAL-011]** tại trường Nhập lại mật khẩu. Không cho phép lưu. |
| | | | - TH5 (Email đã tồn tại): Nếu Email (Tên đăng nhập) đã tồn tại ở nguồn xác thực Nội bộ của bất kỳ hồ sơ tài khoản nào trên toàn hệ thống, vi phạm **[BR-VAL-009]**, hiển thị **[MSG-ERR-VAL-009]** tại trường Email. Không cho phép lưu. |
| | | | - TH6 (Hồ sơ đã có nguồn xác thực Nội bộ): Nếu trong quá trình xử lý, hệ thống phát hiện hồ sơ tài khoản hiện tại đã được gắn nguồn xác thực Nội bộ bởi phiên khác, hiển thị **[MSG-ERR-UC002-001]**, không tạo thêm nguồn xác thực trùng. |
| | | | - TH Hợp lệ:<br>- Gắn thêm nguồn xác thực Nội bộ vào cùng hồ sơ tài khoản khách hàng đang đăng nhập.<br>- Sử dụng Email làm Tên đăng nhập của nguồn xác thực Nội bộ.<br>- Băm/mã hóa mật khẩu theo quy định bảo mật trước khi lưu.<br>- Không tạo mới hồ sơ tài khoản khách hàng, không tách dữ liệu hồ sơ VNeID hiện có.<br>- Ghi nhận Audit Log thao tác thiết lập phương thức đăng nhập Nội bộ.<br>- Đóng popup, cập nhật ngay chip `Nội bộ (Email/Mật khẩu)` sang trạng thái `Đã liên kết`, thay nút `Thiết lập ngay` bằng nút `Đổi mật khẩu`.<br>- Hiển thị **[MSG-SUC-UC002-001]**. |
| 3 | Ẩn/hiện mật khẩu | Icon | Khi click icon con mắt tại từng trường mật khẩu, hệ thống chuyển trạng thái hiển thị giữa che ký tự và hiện ký tự đã nhập. Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/lưu dữ liệu. |
