#### 4.3.1.4. Quản lý tài khoản Khách hàng

##### 4.3.1.4.1. UC009.01 - Tra cứu danh sách tài khoản khách hàng

###### 4.3.1.4.1.1. Mục đích

- Cho phép Cán bộ vận hành (QTHT) tra cứu, lọc và xem danh sách các tài khoản khách hàng trên hệ thống.  

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  

###### 4.3.1.4.1.2. UC009.01.MH01 - Màn hình Tra cứu tài khoản khách hàng

**Màn hình**:
- Link ảnh màn hình: [UC009.01.MH01 - Tra cứu tài khoản khách hàng](../../images/UC009/UC009_01_MH01_Tra_cuu_tai_khoan_khach_hang.png).
- Giao diện danh sách chung, không tách Tab Khách hàng Cá nhân và Khách hàng Tổ chức.
- Danh sách hiển thị đồng thời tài khoản khách hàng cá nhân, tài khoản tổ chức và tài khoản phụ thuộc tổ chức.
- Mặc định sắp xếp theo Ngày tạo giảm dần.
- Tài khoản khách hàng Tổ chức phải hiển thị theo cấu trúc phân cấp: dòng đầu là **Tài khoản chính** của Tổ chức; ngay bên dưới là các **Tài khoản phụ** trực thuộc Tổ chức đó, không hiển thị rời rạc thành các dòng tách khỏi tài khoản chính.
- Mỗi dòng dữ liệu là một **hồ sơ tài khoản khách hàng**. Một hồ sơ có thể liên kết một hoặc nhiều nguồn xác thực, ví dụ: `VNeID`, `Nội bộ` hoặc đồng thời `VNeID, Nội bộ`.
- Quyền sử dụng hệ thống, trạng thái tài khoản, thông tin khách hàng và lịch sử hồ sơ được quản lý theo hồ sơ tài khoản khách hàng, không tách riêng theo từng nguồn xác thực.

**Mô tả thông tin trên màn hình**:

| Trường thông tin         | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                                                                                                                     |
| :-------------------------- | :-------------- | :--------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mã khách hàng | String(50) | Không | Trống | Tìm kiếm gần đúng theo mã khách hàng của tài khoản chính. Đối với tài khoản phụ thuộc tổ chức, tài khoản phụ không có Mã khách hàng riêng và không hiển thị Mã khách hàng trên lưới. |
| Tên | String(255) | Không | Trống | Tìm kiếm gần đúng theo tên cá nhân hoặc tên tổ chức. |
| Email | String(255) | Không | Trống | Tìm kiếm gần đúng theo địa chỉ Email (Tên đăng nhập) đã đăng ký. |
| Số điện thoại | String(20) | Không | Trống | Tìm kiếm gần đúng theo số điện thoại. |
| Trung tâm đăng ký | Enum(String(100)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08]. |
| Loại khách hàng | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Cá nhân<br>+ Tổ chức |
| Loại tài khoản | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Tài khoản chính<br>+ Tài khoản phụ |
| Nguồn xác thực | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ<br>Lọc chính xác theo (các) nguồn xác thực đang liên kết với hồ sơ tài khoản. Giá trị `VNeID, Nội bộ` lọc riêng các hồ sơ đồng thời liên kết cả hai nguồn xác thực. |
| Phân loại khách hàng | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Trong nước<br>+ Nước ngoài |
| Từ ngày | Date | Không | Trống | Lọc theo ngày tạo từ ngày. Định dạng `dd/mm/yyyy`. |
| Đến ngày | Date | Không | Trống | Lọc theo ngày tạo đến ngày. Định dạng `dd/mm/yyyy`. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Bảng danh sách tài khoản khách hàng | - | \- | 50 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách tài khoản khách hàng chung.<br>- Sắp xếp theo Ngày tạo giảm dần.<br>- Hiển thị tổng số bản ghi phù hợp bộ lọc.<br>- Có phân trang và cho phép thiết lập số bản ghi/trang: `50`, `100`, `200`.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Cột: STT | - | \- | \- | Số thứ tự tăng dần theo danh sách hiển thị. |
| Cột: Mã khách hàng | String(50) | \- | \- | Hiển thị Mã khách hàng của tài khoản chính. Đối với tài khoản phụ thuộc tổ chức, để trống vì tài khoản phụ không có Mã khách hàng. |
| Cột: Tên | String(255) | \- | \- | Họ tên cá nhân, tên tổ chức hoặc họ tên tài khoản phụ. Tài khoản phụ hiển thị thụt cấp ngay dưới tài khoản chính. |
| Cột: Email | String(255) | \- | \- | Địa chỉ email đăng ký. |
| Cột: Số điện thoại | String(20) | \- | \- | Số điện thoại liên hệ. |
| Cột: Trung tâm đăng ký | String(100) | \- | \- | Hiển thị **Tên viết tắt** của Trung tâm đăng ký mặc định theo Danh mục dùng chung - [DM_08 - Trung tâm giao dịch bảo đảm](../../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| Cột: Loại khách hàng | Enum(String(50)) | \- | \- | Gồm:<br>+ Cá nhân<br>+ Tổ chức<br>Tài khoản phụ thuộc tổ chức hiển thị là Tổ chức. |
| Cột: Loại tài khoản | Enum(String(50)) | \- | \- | Gồm:<br>+ Tài khoản chính<br>+ Tài khoản phụ<br>Khách hàng cá nhân luôn là Tài khoản chính. |
| Cột: Nguồn xác thực | String(100) | \- | \- | Hiển thị dạng nhãn/tag các nguồn xác thực đã liên kết với hồ sơ tài khoản khách hàng.<br>Gồm:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Cột: Phân loại khách hàng | Enum(String(50)) | \- | \- | Gồm:<br>+ Trong nước<br>+ Nước ngoài |
| Cột: Ngày tạo | DateTime | \- | \- | Hiển thị ngày tạo theo định dạng `dd/mm/yyyy HH:mm`. |
| Cột: Trạng thái | Enum(String(50)) | \- | \- | Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Cột: Thao tác | - | \- | \- | - Các thao tác:<br>+ Chỉnh sửa<br>+ Khóa/Mở khóa<br>+ Đặt lại mật khẩu<br>+ Đóng<br>+ Xóa<br>+ Quy tắc thao tác:<br>+ Đặt lại mật khẩu chỉ cho phép với hồ sơ tài khoản có nguồn xác thực Nội bộ.<br>+ Khóa/Mở khóa, Đóng, Xóa tác động ở cấp hồ sơ tài khoản khách hàng và áp dụng cho toàn bộ nguồn xác thực đang liên kết.<br>+ Xem chi tiết bằng cách click trực tiếp vào dòng dữ liệu. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Thực hiện tìm kiếm và tải lại danh sách khách hàng theo các tiêu chí bộ lọc. Tìm kiếm gần đúng theo Mã khách hàng, Tên, Email, Số điện thoại; tìm kiếm chính xác theo Trung tâm đăng ký, Loại khách hàng, Loại tài khoản, Nguồn xác thực, Phân loại khách hàng, Trạng thái; lọc theo khoảng Ngày tạo từ ngày đến ngày.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Link | Reset toàn bộ các ô nhập liệu và dropdown về trạng thái mặc định ban đầu và tải lại danh sách đầy đủ. |
| 3 | Thêm mới | Button | Mở màn hình Thêm mới tài khoản khách hàng (UC009.02). |
| 4 | Chỉnh sửa | Icon | Chỉ hiển thị ở cột Thao tác. Khi click, mở màn hình Sửa tài khoản khách hàng (UC009.03) tương ứng. |
| 5 | Đặt lại mật khẩu | Icon | Chỉ cho phép thực hiện đối với hồ sơ tài khoản có nguồn xác thực Nội bộ. Khi click, mở popup Đặt lại mật khẩu (UC009.09) để quản trị tự nhập mật khẩu mới cho nguồn xác thực Nội bộ. |
| 6 | Khóa / Mở khóa | Icon | Chỉ hiển thị ở cột Thao tác. Khi click, thực hiện popup cảnh báo xác nhận tương ứng tại [UC009.05 - Khóa tài khoản khách hàng](#uc00905---khoa-tai-khoan-khach-hang) hoặc [UC009.06 - Mở khóa tài khoản khách hàng](#uc00906---mo-khoa-tai-khoan-khach-hang) để thay đổi trạng thái hoạt động của hồ sơ tài khoản. |
| 7 | Kết xuất | Button | Nút kết xuất danh sách hiện tại ra file Excel. Chi tiết tại mục[UC009.07 - Kết xuất Excel](#uc00907---ket-xuat-excel). |
| 8 | Đóng | Icon | Mở [Popup xác nhận Đóng/Xóa tài khoản khách hàng](#uc00904---popup-xac-nhan-dongxoa-tai-khoan-khach-hang) với loại thao tác `Đóng`. |
| 9 | Xóa | Icon | Mở [Popup xác nhận Đóng/Xóa tài khoản khách hàng](#uc00904---popup-xac-nhan-dongxoa-tai-khoan-khach-hang) với loại thao tác `Xóa`. |
| 10 | Click dòng dữ liệu | Row Click | Khi click vào bất kỳ dòng dữ liệu nào trên lưới danh sách khách hàng (ngoại trừ khi click trực tiếp vào các Icon chức năng tại cột Thao tác), hệ thống mở màn hình xem chi tiết tương ứng với Loại khách hàng và Loại tài khoản của dòng được chọn. |

##### 4.3.1.4.2. UC009.02 - Thêm mới tài khoản khách hàng

###### 4.3.1.4.2.1. Mục đích

- Khởi tạo hồ sơ tài khoản khách hàng thủ công kèm nguồn xác thực Nội bộ cho các đối tượng Cá nhân hoặc Tổ chức cần được cấp tài khoản/mật khẩu trên hệ thống BPBĐ.  
- Admin không nhập thủ công TechID hoặc nguồn xác thực VNeID trên màn hình này. Nguồn xác thực VNeID chỉ được hệ thống liên kết khi khách hàng xác thực VNeID thành công theo luồng Website khách hàng.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  

###### 4.3.1.4.2.2. UC009.02.MH01 - Màn hình Thêm mới tài khoản khách hàng

**Màn hình**:
- Link ảnh màn hình: [UC009.02.MH01 - Thêm mới tài khoản khách hàng](../../images/UC009/UC009_02_MH01_Them_moi_tai_khoan_khach_hang.png).
- Giao diện dạng Popup Modal, trên cùng có trường chọn **Loại tài khoản** gồm 2 giá trị: `Cá nhân`, `Tổ chức`.
- Giá trị mặc định của trường chọn **Loại tài khoản** là `Cá nhân`. Người dùng có thể chủ động chuyển đổi loại tài khoản thông qua Dropdown chọn. Khi chuyển đổi, toàn bộ form nhập liệu phía dưới sẽ được làm sạch và hiển thị cấu trúc tương ứng.
- Khối thông tin Cá nhân và Tổ chức cùng nằm trên một form Thêm mới tài khoản khách hàng; hệ thống chỉ hiển thị khối thông tin tương ứng với giá trị đang chọn tại **Loại tài khoản**.
- **Lưu ý nghiệp vụ**: Trường **Loại tài khoản** tại đầu form dùng để chọn đối tượng khởi tạo `Cá nhân/Tổ chức`. Khi lưu dữ liệu, khách hàng Cá nhân luôn được ghi nhận là `Tài khoản chính`; bản ghi Tổ chức được ghi nhận là `Tài khoản chính`; các tài khoản phụ trực thuộc tổ chức được ghi nhận là `Tài khoản phụ` và không sinh Mã khách hàng riêng.


**Mô tả thông tin trên màn hình**:

**1. Khối thông tin Khách hàng Cá nhân (Chỉ hiển thị khi Loại tài khoản là Cá nhân)**:

| Trường thông tin               | Kiểu dữ liệu | Bắt buộc | Mặc định            | Mô tả                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------- | :-------------- | :--------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Loại tài khoản | Enum(String(50)) | Có | Cá nhân | Control UI: Hộp chọn ở đầu form.<br>Gồm:<br>+ Cá nhân<br>+ Tổ chức<br>Khi chọn Cá nhân, hệ thống hiển thị khối thông tin Khách hàng Cá nhân như hiện tại. |
| Loại khách hàng                | Enum(String(50)) | Có        | Cá nhân              | Control UI: Hiển thị/Read-only.<br>Hiển thị giá trị `Cá nhân` theo Loại tài khoản đã chọn ở đầu form. Kiểu Label, không cho phép sửa trong khối thông tin này. |
| Email (Tên đăng nhập) | String(255) | Có | Trống | Địa chỉ email đăng ký, đồng thời là Tên đăng nhập của tài khoản. Không hiển thị trường Tên đăng nhập riêng trên form. Ràng buộc định dạng chuẩn theo Regex: `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`. Ràng buộc tính duy nhất trên toàn hệ thống. |
| Nguồn xác thực | Enum(String(50)) | Có | Nội bộ | Control UI: Hiển thị/Read-only.<br>Hồ sơ được tạo từ Admin luôn khởi tạo nguồn xác thực Nội bộ để đăng nhập bằng Email/Mật khẩu. |
| Loại giấy tờ                   | Enum(String(50)) | Có        | Căn cước công dân | Control UI: Hộp chọn.<br>Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10]. |
| Số giấy tờ | String(255) | Có        | Trống                 | Số giấy tờ pháp lý của cá nhân. Ràng buộc tính duy nhất theo Loại giấy tờ trên toàn hệ thống. |
| Họ và tên                      | String(255) | Có        | Trống                 | Họ và tên đầy đủ của khách hàng cá nhân. Tự động chuyển thành chữ in hoa và loại bỏ khoảng trắng thừa.                                                                                                                                                                                                                                                  |
| Ngày sinh                        | Date            | Không     | Trống                 | Định dạng DD/MM/YYYY. Phải nhỏ hơn ngày hiện tại.                                                                                                                                                                                                                                                                                                                      |
| Giới tính                       | Enum(String(50)) | Không     | Trống                 | Control UI: Hộp chọn.<br>Tham chiếu Danh mục dùng chung - Giới tính (Nam, Nữ, Khác). |
| Quốc tịch                       | Enum(String(50)) | Có        | Việt Nam              | Control UI: Hộp chọn.<br>Tham chiếu Danh mục Quốc tịch / Quốc gia [DM_09]. Khi chọn Việt Nam, trường Phân loại khách hàng mặc định là `Trong nước`; khi chọn quốc tịch khác Việt Nam, trường Phân loại khách hàng mặc định là `Nước ngoài`. |
| Phân loại khách hàng | Enum(String(50)) | Có | Trong nước | Control UI: Hộp chọn.<br>Gồm:<br>+ Trong nước<br>+ Nước ngoài<br>+ Tự động gợi ý theo Quốc tịch nhưng cho phép quản trị kiểm tra/chỉnh lại trước khi lưu nếu nghiệp vụ yêu cầu. |
| Tỉnh/TP | Enum(String(50)) hoặc String(255) | Không | Trống | Control UI động theo Quốc tịch.<br>- Nếu Quốc tịch là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>- Nếu Quốc tịch khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập. |
| Địa chỉ chi tiết | String(500) | Không | Trống | Ghi thông tin địa chỉ chi tiết như Số nhà, đường phố, thôn xóm... |
| Số điện thoại                 | String(20) | Không        | Trống                 | Số điện thoại liên hệ.<br>- Ràng buộc định dạng (chỉ kiểm tra khi có nhập):<br>  + Nếu Quốc tịch là Việt Nam: Độ dài đúng 10 chữ số, bắt đầu bằng số 0, Regex: `/^0[35789]\d{8}$/`.<br>  + Nếu Quốc tịch là Nước ngoài: Độ dài từ 8 đến 15 ký tự, Regex: `/^\+?[1-9]\d{7,14}$/`.<br>  + Ràng buộc tính duy nhất trên toàn hệ thống. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có     | Theo đơn vị quản trị đăng nhập hoặc trung tâm mặc định của hệ thống | Control UI: Hộp chọn.<br>Hiển thị theo **Tên viết tắt** của Danh mục dùng chung - [DM_08 - Trung tâm giao dịch bảo đảm](../../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| Nhóm người dùng               | List(Enum(String(50))) | Không*    | Trống                 | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên nhóm người dùng**.<br>Cho phép tích chọn một hoặc nhiều Nhóm người dùng tương ứng với Loại tài khoản áp dụng cho Khách hàng. Khi chọn hoặc thay đổi giá trị, Cây phân quyền phía dưới được cập nhật để hiển thị trước các quyền tương ứng. |
| Vai trò                          | List(Enum(String(50))) | Không*    | Trống                 | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên vai trò**.<br>Cho phép tích chọn một hoặc nhiều Vai trò tương ứng với Loại tài khoản áp dụng là Khách hàng. Khi chọn hoặc thay đổi giá trị, Cây phân quyền phía dưới được cập nhật để hiển thị trước các quyền tương ứng. |
| Cây phân quyền                 | Boolean | \- | Theo Nhóm người dùng/Vai trò đã chọn              | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>Hiển thị danh mục quyền phân cấp (Cha - Con) để xem trước các quyền mà tài khoản khách hàng cá nhân sẽ sở hữu.<br>- **Logic hiển thị**: Cây chỉ hiển thị những quyền/chức năng được gán thông qua các Nhóm người dùng hoặc Vai trò được tích chọn.<br>- **Logic hiển thị quyền**: Khi người dùng chọn hoặc bỏ chọn Nhóm người dùng/Vai trò, hệ thống tính lại danh sách quyền theo cơ chế cộng dồn từ toàn bộ mục đã chọn và cập nhật Cây phân quyền để người dùng xem trước trước khi lưu. |
| Tài liệu đính kèm | Danh sách file | Không | Trống | Control UI: Bảng nhập nhiều dòng.<br>Mỗi dòng gồm: Tên tài liệu, File đính kèm, Thao tác.<br>Cho phép thêm nhiều tài liệu liên quan tới tài khoản khách hàng. Sau khi chọn file, hệ thống hiển thị tên file và cho phép **Xem file** hoặc **Xóa** file khỏi dòng tài liệu. |

**2. Khối thông tin Khách hàng Tổ chức (Chỉ hiển thị khi Loại tài khoản là Tổ chức)**:

Form hiển thị chia làm 2 Tab chính:

**Tab 1: Thông tin chung (Tạo lập Tài khoản chính)**:

Ghi chú: Trường **Loại tổ chức** quyết định trường mã định danh phải nhập và tự động xác định **Phân loại khách hàng** của tổ chức.

| Trường thông tin                                           | Kiểu dữ liệu | Bắt buộc | Mặc định            | Mô tả                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------------------------------------------------ | :-------------- | :--------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loại tài khoản | Enum(String(50)) | Có | Tổ chức | Control UI: Hộp chọn ở đầu form.<br>Gồm:<br>+ Cá nhân<br>+ Tổ chức<br>Khi chọn Tổ chức, hệ thống hiển thị form tổ chức gồm 2 Tab: **Thông tin chung** và **Tài khoản phụ trực thuộc**. |
| Loại khách hàng                                            | Enum(String(50)) | Có        | Tổ chức              | Control UI: Hiển thị/Read-only.<br>Hiển thị giá trị `Tổ chức` theo Loại tài khoản đã chọn ở đầu form. Kiểu Label, không cho phép sửa trong khối thông tin này. |
| Loại tổ chức | Enum(String(100)) | Có | Tổ chức có đăng ký kinh doanh trong nước | Control UI: Hộp chọn.<br>Gồm:<br>+ Tổ chức có đăng ký kinh doanh trong nước<br>+ Tổ chức nước ngoài |
| Mã định danh tổ chức | String(255) | Có khi Loại tổ chức là Tổ chức có đăng ký kinh doanh trong nước | Trống | Chỉ hiển thị khi **Loại tổ chức** = `Tổ chức có đăng ký kinh doanh trong nước`. Ràng buộc tính duy nhất trên toàn hệ thống. |
| Mã số thuế/Số giấy phép đầu tư | String(255) | Có khi Loại tổ chức là Tổ chức nước ngoài | Trống | Chỉ hiển thị khi **Loại tổ chức** = `Tổ chức nước ngoài`. Ràng buộc tính duy nhất trên toàn hệ thống. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Loại tổ chức | Control UI: Hiển thị/Read-only.<br>- Tự động là `Trong nước` nếu Loại tổ chức = `Tổ chức có đăng ký kinh doanh trong nước`.<br>- Tự động là `Nước ngoài` nếu Loại tổ chức = `Tổ chức nước ngoài`. |
| Tên tổ chức                                                | String(255) | Có        | Trống                 | Tên đầy đủ của Tổ chức.                                                                                                                                                                                                                                                                                                                                                        |
| Email tổ chức (Tên đăng nhập) | String(255) | Có | Trống | Địa chỉ email của tổ chức, đồng thời là Tên đăng nhập của Tài khoản chính. Không hiển thị trường Tên đăng nhập riêng trên form. Bắt buộc đúng định dạng Regex: `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`. Ràng buộc tính duy nhất trên toàn hệ thống. |
| Số điện thoại                                             | String(20) | Không        | Trống                 | Số điện thoại liên hệ của tổ chức. Validate động theo Quốc gia:<br>+ Việt Nam: Đúng 10 chữ số, bắt đầu bằng 0 và đi kèm các đầu số mạng hợp lệ. Regex: `/^0[35789]\d{8}$/`.<br>+ Quốc gia khác Việt Nam: Độ dài 8-15 ký tự, cho phép bắt đầu bằng dấu `+` ở đầu. Regex: `/^\+?[1-9]\d{7,14}$/`. |
| Nguồn xác thực | Enum(String(50)) | Có | Nội bộ | Control UI: Hiển thị/Read-only.<br>Hồ sơ được tạo từ Admin luôn khởi tạo nguồn xác thực Nội bộ để đăng nhập bằng Email/Mật khẩu. |
| Quốc gia | Enum(String(50)) | Có | Việt Nam | Control UI: Hộp chọn.<br>Tham chiếu Danh mục Quốc tịch / Quốc gia [DM_09]. |
| Tỉnh/TP | Enum(String(50)) hoặc String(255) | Không | Trống | Control UI động theo Quốc gia.<br>- Nếu Quốc gia là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>- Nếu Quốc gia khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập. |
| Địa chỉ chi tiết | String(500) | Không | Trống | Ghi thông tin địa chỉ chi tiết như Số nhà, đường phố, thôn xóm... |
| Trung tâm Đăng ký mặc định                             | Enum(String(100)) | Có     | Theo đơn vị quản trị đăng nhập hoặc trung tâm mặc định của hệ thống | Control UI: Hộp chọn.<br>Hiển thị theo **Tên viết tắt** của Danh mục dùng chung - [DM_08 - Trung tâm giao dịch bảo đảm](../../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| **Khối thông tin Người đại diện**                | String(100) | \- | \- | Thông tin người đại diện pháp luật của tổ chức.                                                                                                                                                                                                                                                                                                                             |
| > Họ và tên người đại diện | String(255) | Không | Trống | Họ và tên người đại diện theo pháp luật/người đại diện của tổ chức. |
| > Loại giấy tờ                                             | Enum(String(50)) | Không        | Căn cước công dân | Control UI: Hộp chọn.<br>Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10]. |
| > Số giấy tờ                                               | String(50) | Không        | Trống                 | Số giấy tờ pháp lý của người đại diện.                                                                                                                                                                                                                                                                                                                                      |
| **Thông tin liên lạc & phân quyền của Tổ chức** | String(255) | \- | \- | Các trường liên lạc và cấu hình quyền cho tài khoản tổ chức.                                                                                                                                                                                                                                                                                                              |
| Nhóm người dùng                                           | List(Enum(String(50))) | Không*    | Trống                 | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên nhóm người dùng**.<br>Cho phép tích chọn một hoặc nhiều Nhóm người dùng tương ứng với Loại tài khoản áp dụng cho Khách hàng. Khi chọn hoặc thay đổi giá trị, Cây phân quyền phía dưới được cập nhật để hiển thị trước các quyền tương ứng. |
| Vai trò                                                      | List(Enum(String(50))) | Không*    | Trống                 | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên vai trò**.<br>Cho phép tích chọn một hoặc nhiều Vai trò tương ứng với Loại tài khoản áp dụng là Khách hàng. Khi chọn hoặc thay đổi giá trị, Cây phân quyền phía dưới được cập nhật để hiển thị trước các quyền tương ứng. |
| Cây phân quyền cộng dồn | Boolean | \- | Theo Nhóm người dùng/Vai trò đã chọn | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>Hiển thị danh mục quyền phân cấp (Cha - Con) để xem trước các quyền mà tài khoản tổ chức sẽ sở hữu.<br>- **Logic hiển thị**: Cây chỉ hiển thị những quyền/chức năng được gán thông qua các Nhóm người dùng hoặc Vai trò được tích chọn.<br>- **Logic hiển thị quyền**: Khi người dùng chọn hoặc bỏ chọn Nhóm người dùng/Vai trò, hệ thống tính lại danh sách quyền theo cơ chế cộng dồn từ toàn bộ mục đã chọn và cập nhật Cây phân quyền để người dùng xem trước trước khi lưu. |
| Tài liệu đính kèm | Danh sách file | Không | Trống | Control UI: Bảng nhập nhiều dòng.<br>Mỗi dòng gồm: Tên tài liệu, File đính kèm, Thao tác.<br>Cho phép thêm nhiều tài liệu liên quan tới tài khoản tổ chức. Sau khi chọn file, hệ thống hiển thị tên file và cho phép **Xem file** hoặc **Xóa** file khỏi dòng tài liệu. |

**Tab 2: Tài khoản phụ trực thuộc (Tạo lập các Tài khoản phụ / Nhân viên)**:

| Trường thông tin                                | Kiểu dữ liệu | Bắt buộc | Mặc định            | Mô tả                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------------------------------------- | :-------------- | :--------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tìm kiếm nhanh                                   | String(255) | Không     | Trống                 | Tìm kiếm nhanh tài khoản phụ trên lưới tạm theo Tên khách hàng, Email hoặc Số giấy tờ.                                                                                                                                                                                                                                                                                                       |
| Nút: Thêm tài khoản phụ                        | - | \- | \- | Control UI: Nút bấm.<br>Nhấn để mở Form thêm tài khoản phụ phía dưới. Chỉ hiển thị tại Form Thêm mới/Cập nhật tài khoản chính của Tổ chức. |
| Bảng danh sách tài khoản phụ                   | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Lưới tạm thời lưu trữ danh sách tài khoản phụ trực thuộc chuẩn bị tạo cùng Tổ chức.<br>Các bản ghi trên lưới chưa được tạo tài khoản/chưa ghi vào CSDL cho tới khi người dùng bấm **Lưu & Cấp tài khoản** ở form chính.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| > Cột: STT | - | \- | \- | Số thứ tự tăng dần theo danh sách tài khoản phụ hiển thị. |
| > Cột: Tên | String(255) | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Họ tên tài khoản phụ trực thuộc tổ chức. |
| > Cột: Số giấy tờ                              | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Số giấy tờ của tài khoản trực thuộc. |
| > Cột: Email | String(255) | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Email đồng thời là Tên đăng nhập của tài khoản phụ. |
| > Cột: Địa chỉ chi tiết | String(500) | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Hiển thị đúng giá trị trường Địa chỉ chi tiết của tài khoản phụ. |
| > Cột: Trạng thái | - | \- | Đang hoạt động | Control UI: Bảng/Lưới hiển thị.<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| > Cột: Thao tác                                  | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>- Các thao tác:<br>+ Sửa<br>+ Đóng<br>+ Xóa |
| **Form Thêm/Sửa tài khoản phụ trực thuộc** | String(255) | \- | \- | Chỉ hiển thị khi bấm nút **Thêm tài khoản phụ** hoặc chọn **Sửa** tài khoản phụ trên lưới tạm.                                                                                                                                                                                                                                                                 |
| >> Tên khách hàng | String(255) | Có | Trống | Họ tên tài khoản phụ trực thuộc tổ chức. |
| >> Email (Tên đăng nhập) | String(255) | Có | Trống | Email tài khoản phụ, đồng thời là Tên đăng nhập. Không hiển thị trường Tên đăng nhập riêng trên form. Ràng buộc tính duy nhất trên toàn hệ thống và trong lưới tạm. Bắt buộc đúng định dạng Regex:`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`. |
| >> Số điện thoại | String(20) | Không | Trống | Số điện thoại liên hệ của tài khoản phụ. Nếu có nhập, validate động theo Quốc gia:<br>+ Việt Nam: Đúng 10 chữ số, bắt đầu bằng 0 và đi kèm các đầu số mạng hợp lệ. Regex: `/^0[35789]\d{8}$/`.<br>+ Quốc gia khác Việt Nam: Độ dài 8-15 ký tự, cho phép bắt đầu bằng dấu `+` ở đầu. Regex: `/^\+?[1-9]\d{7,14}$/`. |
| >> Đơn vị | String(255) | Không | Trống | Cho phép nhập text thông tin đơn vị/phòng ban/chi nhánh của tài khoản phụ trong Tổ chức. |
| >> Loại giấy tờ                                 | Enum(String(50)) | Có        | Căn cước công dân | Control UI: Hộp chọn.<br>Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10]. |
| >> Số giấy tờ               | String(255) | Có        | Trống                 | Số giấy tờ cá nhân. Kiểm tra trùng lặp đồng thời trên lưới tạm và tất cả tài khoản phụ khác trên toàn hệ thống đang ở trạng thái `Đang hoạt động`. Khóa (Read-only) khi Sửa. |
| >> Quốc gia | Enum(String(50)) | Có | Theo Quốc gia của Tổ chức | Control UI: Hộp chọn.<br>Tham chiếu Danh mục Quốc tịch / Quốc gia [DM_09]. |
| >> Tỉnh/TP | Enum(String(50)) hoặc String(255) | Có | Trống | Control UI động theo Quốc gia.<br>- Nếu Quốc gia là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>- Nếu Quốc gia khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập. |
| >> Địa chỉ chi tiết | String(500) | Có | Trống | Ghi thông tin địa chỉ chi tiết của tài khoản phụ. |
| >> Loại tài khoản | Enum(String(50)) | Có | Tài khoản phụ | Control UI: Hiển thị/Read-only.<br>Mặc định là `Tài khoản phụ`, không được phép chỉnh sửa. |
| >> Nguồn xác thực | Enum(String(50)) | Có | Nội bộ | Control UI: Hiển thị/Read-only.<br>Tài khoản phụ được tạo từ Admin luôn khởi tạo nguồn xác thực Nội bộ để đăng nhập bằng Email/Mật khẩu. |
| >> TechID | String(100) | \- | Theo nguồn xác thực VNeID | Control UI: Hiển thị/Read-only.<br>Chỉ hiển thị khi hồ sơ tài khoản phụ có Nguồn xác thực chứa `VNeID`. Khi thêm mới tài khoản phụ từ Admin thì chưa có TechID, hệ thống để trống và không cho nhập thủ công. |
| >> Nhóm người dùng                             | List(Enum(String(50))) | Không*    | Trống                 | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên nhóm người dùng** và tích chọn một hoặc nhiều Nhóm người dùng. |
| >> Vai trò                                        | List(Enum(String(50))) | Không*    | Trống                 | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên vai trò** và tích chọn một hoặc nhiều Vai trò. |
| >> Cây phân quyền cộng dồn | Boolean | \- | Theo Nhóm người dùng/Vai trò đã chọn | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>Hiển thị quyền cộng dồn từ toàn bộ Nhóm người dùng và Vai trò đã chọn; quyền của tài khoản phụ không được vượt quá quyền của Tổ chức mẹ. |
| >> Nút: Lưu                                     | - | \- | \- | Control UI: Nút bấm.<br>Chỉ hiển thị khi chọn Thêm tài khoản phụ.<br>Lưu thông tin tài khoản phụ mới vào danh sách tạm trên màn hình.<br>Không sinh tài khoản, không ghi CSDL, không sinh mật khẩu và không gửi Email tại bước này. |
| >> Nút: Cập nhật                                | - | \- | \- | Control UI: Nút bấm.<br>Chỉ hiển thị khi sửa tài khoản trực thuộc trên lưới tạm.<br>Cập nhật thông tin dòng được chọn trên danh sách tạm của màn hình.<br>Không cập nhật CSDL và không gửi Email tại bước này. |
| >> Nút: Hủy                                      | - | \- | \- | Control UI: Nút bấm.<br>Đóng form nhập liệu tài khoản phụ, không lưu thay đổi. |

**Ghi chú**:
(*): Bắt buộc phải chọn ít nhất một trong hai trường: **Nhóm người dùng** hoặc **Vai trò** (không được bỏ trống cả hai).

**Ghi chú nghiệp vụ về mã tài khoản**:
- Khi tạo tài khoản chính, hệ thống sinh Mã khách hàng riêng cho Cá nhân hoặc Tổ chức.
- Trên form **Thêm mới tài khoản khách hàng**, không hiển thị trường **Mã khách hàng** vì đây là thông tin hệ thống tự sinh sau khi lưu thành công.
- Khi tạo tài khoản phụ thuộc Tổ chức, hệ thống không sinh Mã khách hàng cho tài khoản phụ; trên lưới danh sách, cột Mã khách hàng của tài khoản phụ để trống và tài khoản phụ được nhận diện theo quan hệ trực thuộc Tổ chức mẹ.

**Ghi chú nghiệp vụ về cơ chế tạo/cập nhật tài khoản phụ trực thuộc**:
- Việc thêm/sửa tài khoản phụ trong Tab **Tài khoản phụ trực thuộc** luôn thực hiện theo cơ chế 2 bước.
- Bước 1: Người dùng nhập thông tin tài khoản phụ và bấm **Lưu** hoặc **Cập nhật** trong form tài khoản phụ. Hệ thống chỉ đưa dữ liệu vào lưới tạm/cập nhật dòng trên lưới tạm của màn hình.
- Bước 1 không tạo tài khoản trong CSDL, không cập nhật thông tin tài khoản phụ trong CSDL, không sinh mật khẩu, không gửi Email và không ghi Audit Log tạo/cập nhật tài khoản.
- Bước 2: Chỉ khi người dùng bấm **Lưu & Cấp tài khoản** ở form thêm mới Tổ chức hoặc **Lưu cập nhật** ở form cập nhật Tổ chức, hệ thống mới thực hiện validate tổng thể và ghi nhận vào CSDL.
- Khi thêm mới Tổ chức, hệ thống tạo tài khoản chính trước, sau đó tạo từng tài khoản phụ đang có trên lưới tạm và gắn quan hệ trực thuộc với Tổ chức mẹ.
- Khi cập nhật Tổ chức, hệ thống cập nhật tài khoản chính; với tài khoản phụ thêm mới trên lưới thì tạo mới trong CSDL; với tài khoản phụ đã sửa trên lưới thì cập nhật thông tin vào CSDL.
- Email thông tin tài khoản chỉ được gửi tại bước ghi nhận CSDL thành công.
- Tài khoản phụ được tạo từ Admin mặc định có nguồn xác thực Nội bộ; hệ thống gửi Email theo mẫu [Email thông báo khởi tạo tài khoản trực thuộc Nội bộ](../../04_Danh_muc_va_Phu_luc.md#email-khoi-tao-tk-noi-bo).
- Nếu tài khoản phụ phát sinh/liên kết VNeID sau này, nguồn xác thực VNeID và TechID được bổ sung vào cùng hồ sơ tài khoản phụ theo luồng xác thực VNeID, không tạo hồ sơ tài khoản phụ mới.
- TechID của tài khoản phụ chỉ phục vụ đối chiếu/xác thực VNeID, không cho phép Admin nhập hoặc chỉnh sửa thủ công.

###### 4.3.1.4.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu trữ dữ liệu đã nhập. |
| 2 | Thêm tài khoản phụ | Button | Khi click, hiển thị Form Thêm/Sửa tài khoản phụ trực thuộc ở phía dưới; chưa tạo tài khoản trong CSDL. |
| 3 | Lưu tài khoản phụ | Button | Validate dữ liệu Form Thêm/Sửa tài khoản phụ trực thuộc. |
| | | | - TH1 (Bỏ trống bắt buộc): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001]. |
| | | | - TH2 (Không hợp lệ): Kiểm tra định dạng (Regex), hiển thị [MSG-ERR-UC009-003] hoặc [MSG-ERR-UC009-004]. |
| | | | - TH3 (Trùng lặp): Kiểm tra đồng thời Email (Tên đăng nhập) và Số giấy tờ trên lưới tạm và tất cả tài khoản phụ khác trên toàn hệ thống đang ở trạng thái `Đang hoạt động`. Nếu trùng, hiển thị [MSG-ERR-UC009-001]. |
| | | | - TH Hợp lệ:<br>+ Đưa dữ liệu vào lưới tạm trên màn hình.<br>+ Không tạo tài khoản trong CSDL, không sinh mật khẩu và không gửi Email tại bước này.<br>+ Đóng form nhập tài khoản phụ. |
| 4 | Sửa tài khoản phụ | Icon | Hiển thị ở cột Thao tác trên lưới tài khoản phụ. Khi click, mở Form Thêm/Sửa, khóa trường Số giấy tờ ở chế độ Chỉ đọc. Nút Lưu đổi thành nút **Cập nhật**. |
| 5 | Đóng tài khoản phụ | Icon | Hiển thị ở cột Thao tác trên lưới tài khoản phụ. Khi click, mở [Popup xác nhận Đóng/Xóa tài khoản khách hàng](#uc00904---popup-xac-nhan-dongxoa-tai-khoan-khach-hang) với loại thao tác `Đóng`. |
| 6 | Xóa tài khoản phụ | Icon | Hiển thị ở cột Thao tác trên lưới tài khoản phụ. Khi click, mở [Popup xác nhận Đóng/Xóa tài khoản khách hàng](#uc00904---popup-xac-nhan-dongxoa-tai-khoan-khach-hang) với loại thao tác `Xóa`. |
| 7 | Lưu & Cấp tài khoản | Button | Validate form chính khi nhấn Lưu. |
| | | | - TH1 (Trường bắt buộc): Vi phạm [BR-VAL-001], highlight đỏ ô nhập liệu đầu tiên bị bỏ trống và hiển thị [MSG-ERR-VAL-001]. |
| | | | - TH2 (Nhóm/Vai trò): Nếu bỏ trống cả Nhóm người dùng và Vai trò, hiển thị [MSG-ERR-UC009-002]. |
| | | | - TH3 (Dữ liệu không hợp lệ): Báo lỗi tương ứng theo trường dữ liệu sai định dạng, vượt quá độ dài hoặc không đúng quy tắc nghiệp vụ; hiển thị [MSG-ERR-UC009-003] hoặc [MSG-ERR-UC009-004]. |
| | | | - TH4 (Trùng lặp tài khoản phụ): Kiểm tra Email (Tên đăng nhập) và Số giấy tờ của từng tài khoản phụ đồng thời trên lưới tạm và tất cả tài khoản phụ khác trên toàn hệ thống đang ở trạng thái `Đang hoạt động`. Nếu trùng, hiển thị [MSG-ERR-UC009-001]. |
| | | | - TH Hợp lệ:<br>+ Khởi tạo hồ sơ tài khoản chính của Cá nhân/Tổ chức và tạo nguồn xác thực Nội bộ tương ứng.<br>+ Sinh mật khẩu tài khoản chính theo quy tắc tại UC561 và mã hóa/băm mật khẩu theo quy định bảo mật.<br>+ Gửi thông tin tài khoản chính qua Email theo mẫu [Email Tạo tài khoản thành công](../../04_Danh_muc_va_Phu_luc.md#email-tao-tk).<br>+ Nếu lưới tạm có tài khoản phụ, hệ thống tạo từng hồ sơ tài khoản phụ trong CSDL, gắn quan hệ trực thuộc với Tổ chức mẹ vừa tạo và tạo nguồn xác thực Nội bộ cho từng tài khoản phụ.<br>+ Với tài khoản phụ tạo mới, hệ thống sinh mật khẩu theo quy tắc tại UC561, mã hóa/băm mật khẩu và gửi Email theo mẫu [Email thông báo khởi tạo tài khoản trực thuộc Nội bộ](../../04_Danh_muc_va_Phu_luc.md#email-khoi-tao-tk-noi-bo).<br>+ Ghi nhận Audit Log cho tài khoản chính và các tài khoản phụ được tạo. |

##### 4.3.1.4.3. UC009.03 - Sửa tài khoản khách hàng

###### 4.3.1.4.3.1. UC009.03 - UC.1: Sửa tài khoản khách hàng Cá nhân

###### 4.3.1.4.3.1.1. Mục đích
- Cho phép sửa đổi thông tin nghiệp vụ của hồ sơ tài khoản khách hàng cá nhân. Việc cập nhật thông tin hồ sơ áp dụng cho hồ sơ có nguồn xác thực Nội bộ, VNeID hoặc đồng thời cả hai nguồn xác thực.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  
  \+ Khách hàng là Cá nhân.  

###### 4.3.1.4.3.1.2. Màn hình
- Giao diện dạng Popup Modal, tự động tải sẵn thông tin cũ của khách hàng cá nhân lên các trường nhập liệu tương ứng.
- Link ảnh màn hình: [UC009.03.UC1 - Sửa tài khoản khách hàng Cá nhân](../../images/UC009/UC009_03_UC1_Sua_tai_khoan_khach_hang_ca_nhan.png).

**Mô tả thông tin trên màn hình**:

| Trường thông tin               | Kiểu dữ liệu | Bắt buộc | Mặc định   | Mô tả                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------- | :-------------- | :--------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loại khách hàng                | Enum(String(50)) | \- | Cá nhân     | Control UI: Hiển thị/Read-only.<br>Trực quan hóa loại tài khoản khách hàng dạng chỉ đọc (Read-only), không cho phép sửa. |
| Loại tài khoản                 | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Gồm:<br>+ Tài khoản chính<br>+ Tài khoản phụ<br>Chế độ Chỉ đọc, không cho phép sửa. |
| Loại giấy tờ                   | Enum(String(50)) | Có        | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Hiển thị hộp chọn và cho phép sửa. Tham chiếu Danh mục dùng chung - Loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(50) | Có        | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa. Ràng buộc tính duy nhất theo Loại giấy tờ trên toàn hệ thống đối với các tài khoản đang ở trạng thái `Đang hoạt động` (ngoại trừ bản ghi đang sửa). |
| Họ và tên                      | String(255) | Có        | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa. |
| Ngày sinh                        | Date            | Không     | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa. Phải nhỏ hơn ngày hiện tại. |
| Giới tính                       | Enum(String(50)) | Không     | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Hiển thị hộp chọn và cho phép sửa. |
| Quốc tịch                       | String(255) | Có        | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa theo danh mục/quy tắc nhập liệu hiện hành. |
| Tỉnh/TP | Enum(String(50)) hoặc String(255) | Không | Theo bản ghi | Cho phép sửa. Control UI động theo Quốc tịch:<br>+ Nếu Quốc tịch là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>+ Nếu Quốc tịch khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập. |
| Địa chỉ chi tiết | String(500) | Không | Theo bản ghi | Cho phép sửa. |
| Email (Tên đăng nhập) | String(255) | Có nếu hồ sơ có nguồn xác thực Nội bộ | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID`: Cho phép sửa Email vì Email chỉ là thông tin liên hệ, chưa dùng làm Tên đăng nhập Nội bộ.<br>- Nếu Nguồn xác thực là `Nội bộ` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only) vì Email là Tên đăng nhập của nguồn xác thực Nội bộ. |
| Nguồn xác thực | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các nguồn xác thực đã liên kết với hồ sơ:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Số điện thoại                 | String(20) | Có        | Theo bản ghi | Cho phép sửa. Ràng buộc định dạng chuẩn theo quốc tịch.<br>- Ràng buộc tính duy nhất trên toàn hệ thống đối với các tài khoản đang ở trạng thái `Đang hoạt động` (ngoại trừ bản ghi đang sửa). |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Không     | Theo bản ghi | Control UI: Hộp chọn.<br>Cho phép sửa đổi. Hiển thị theo **Tên viết tắt** của Danh mục dùng chung - [DM_08 - Trung tâm giao dịch bảo đảm](../../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| TechID | String(100) | \- | Theo nguồn xác thực VNeID | Control UI: Hiển thị/Read-only.<br>Chỉ hiển thị khi hồ sơ có Nguồn xác thực chứa `VNeID`. Hiển thị dạng che/mask theo chính sách bảo mật. Không cho phép Admin nhập, sửa hoặc xóa TechID trên form cập nhật. |
| Nhóm người dùng               | List(Enum(String(50))) | Không*    | Theo bản ghi | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên nhóm người dùng**.<br>Cho phép tích chọn một hoặc nhiều Nhóm người dùng. Khi chọn hoặc thay đổi giá trị, Cây phân quyền phía dưới được cập nhật để hiển thị trước các quyền tương ứng. |
| Vai trò                          | List(Enum(String(50))) | Không*    | Theo bản ghi | Control UI: Ô tìm kiếm + danh sách checkbox.<br>Cho phép tìm kiếm theo **Tên vai trò**.<br>Cho phép tích chọn một hoặc nhiều Vai trò. Khi chọn hoặc thay đổi giá trị, Cây phân quyền phía dưới được cập nhật để hiển thị trước các quyền tương ứng. |
| Cây phân quyền                 | Boolean | \- | Theo Nhóm người dùng/Vai trò đã chọn | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>Hiển thị cây danh mục quyền phân cấp (Cha - Con) để xem trước các quyền mà tài khoản khách hàng cá nhân sẽ sở hữu:<br>+ **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng được gán thông qua các Nhóm người dùng hoặc Vai trò được tích chọn. Các quyền khác không được chọn sẽ bị ẩn đi khỏi cây.<br>+ **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà các Nhóm người dùng hoặc Vai trò được chọn có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào hoàn toàn không được chọn quyền sẽ không hiển thị làm node gốc trên cây.<br>+ **Logic hiển thị quyền**: Khi người dùng chọn hoặc bỏ chọn Nhóm người dùng/Vai trò, hệ thống tính lại danh sách quyền theo cơ chế cộng dồn từ toàn bộ mục đã chọn và cập nhật Cây phân quyền để người dùng xem trước trước khi lưu. Các quyền không được chọn sẽ không hiển thị trên cây. |

**Ghi chú**:
(*): Bắt buộc phải chọn ít nhất một trong hai trường: **Nhóm người dùng** hoặc **Vai trò** (không được bỏ trống cả hai).

###### 4.3.1.4.3.1.3. Chức năng trên màn hình

| STT | Tên chức năng      | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :-- | :-------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Hủy                  | Button       | Đóng Popup Modal, không lưu trữ dữ liệu thay đổi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2   | Đặt lại mật khẩu | Button       | Chỉ cho phép nếu hồ sơ có nguồn xác thực Nội bộ. Khi click, mở popup Xác nhận đặt lại mật khẩu của nguồn xác thực Nội bộ. Chi tiết tại mục[UC009.09 - Đặt lại mật khẩu tài khoản khách hàng](#uc00909---dat-lai-mat-khau-tai-khoan-khach-hang).                                                                                                                                                                                                                                                                                                                         |
| 3   | Lưu cập nhật       | Button       | Khi click, hệ thống thực hiện validate dữ liệu trên form. |
| | | | - TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], highlight đỏ ô nhập liệu đầu tiên bị bỏ trống và hiển thị [MSG-ERR-VAL-001] bên dưới trường đó. |
| | | | - TH2 (Bỏ trống cả Nhóm người dùng và Vai trò): Hiển thị [MSG-ERR-UC009-002]. |
| | | | - TH3 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt. Nếu vi phạm, hiển thị [MSG-ERR-UC009-003] hoặc [MSG-ERR-UC009-004]. |
| | | | - TH4 (Trùng lặp dữ liệu): Kiểm tra tính duy nhất của Email, Số giấy tờ, Số điện thoại trên toàn hệ thống đối với các tài khoản đang ở trạng thái `Đang hoạt động` và các trường được phép cập nhật (ngoại trừ bản ghi hiện tại). Nếu bị trùng, hiển thị [MSG-ERR-VAL-009]. |
| | | | - TH Hợp lệ:<br>+ Thực hiện cập nhật thông tin khách hàng cá nhân.<br>+ Ghi nhận lịch sử **Audit Log** lưu trữ thông tin về hành động cập nhật.<br>+ Đóng form, hiển thị [MSG-SUC-UC009-001] và tải lại danh sách. |

###### 4.3.1.4.3.2. UC009.03 - UC.2: Sửa tài khoản khách hàng Tổ chức

###### 4.3.1.4.3.2.1. Mục đích
- Cho phép sửa đổi thông tin của tài khoản khách hàng tổ chức và quản lý danh sách tài khoản phụ trực thuộc tổ chức.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  
  \+ Khách hàng là Tổ chức.  
  \+ Tài khoản phụ trực thuộc không có Mã khách hàng riêng; tài khoản phụ được quản lý theo quan hệ trực thuộc Tổ chức mẹ.

###### 4.3.1.4.3.2.2. Màn hình

- Giao diện dạng Popup Modal.
- Link ảnh màn hình: [UC009.03.UC2 - Sửa tài khoản khách hàng Tổ chức](../../images/UC009/UC009_03_UC2_Sua_tai_khoan_khach_hang_to_chuc.png).
- Đối với **Tài khoản chính** của Tổ chức, màn hình chia thành 2 Tab chính: **Thông tin chung** và **Tài khoản phụ trực thuộc**.
- Đối với **Tài khoản phụ** thuộc Tổ chức, màn hình chỉ hiển thị khối **Thông tin chung**, đồng thời hiển thị thông tin **Tổ chức chủ quản**. Trường **Mã khách hàng** không hiển thị vì tài khoản phụ không có Mã khách hàng.
- Đối với tài khoản chính của Tổ chức, hệ thống xác định trạng thái cho phép sửa theo **Nguồn xác thực** của hồ sơ.
- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`, các trường định danh tổ chức không cho phép sửa (Read-only), gồm Loại tổ chức, Mã định danh tổ chức hoặc Mã số thuế/Số giấy phép đầu tư, Tên tổ chức, Quốc gia và thông tin Người đại diện.
- Nếu Nguồn xác thực là `Nội bộ`, các trường thông tin tổ chức được phép sửa theo phân quyền, gồm Loại tổ chức, Mã định danh tổ chức hoặc Mã số thuế/Số giấy phép đầu tư, Tên tổ chức, Quốc gia và thông tin Người đại diện.
- Các trường Tỉnh/TP, Địa chỉ chi tiết và Số điện thoại tổ chức cho phép sửa bất kể Nguồn xác thực.
- Các trường Loại khách hàng, Loại tài khoản, Nguồn xác thực, TechID, Phân loại khách hàng và Tổ chức chủ quản luôn hiển thị/Read-only.

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| **Tab 1: Thông tin chung** | - | - | - | Hiển thị thông tin tài khoản tổ chức chính hoặc tài khoản phụ trực thuộc. |
| Loại khách hàng | Enum(String(50)) | - | Tổ chức | Control UI: Hiển thị/Read-only. |
| Loại tài khoản | Enum(String(50)) | - | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Gồm:<br>+ Tài khoản chính<br>+ Tài khoản phụ |
| Nguồn xác thực | String(100) | - | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các nguồn xác thực đã liên kết với hồ sơ:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Tổ chức chủ quản | String(255) | - | Theo bản ghi | Chỉ hiển thị khi sửa/xem tài khoản phụ. Gồm Tên tổ chức, Mã khách hàng tổ chức, Email tổ chức, Số điện thoại tổ chức. |
| Loại tổ chức | Enum(String(100)) | Có | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Hiển thị hộp chọn và cho phép sửa.<br>Gồm:<br>+ Tổ chức có đăng ký kinh doanh trong nước<br>+ Tổ chức nước ngoài |
| Mã định danh tổ chức | String(255) | Có khi Loại tổ chức là Tổ chức có đăng ký kinh doanh trong nước | Theo bản ghi | Chỉ hiển thị đối với tài khoản chính khi **Loại tổ chức** = `Tổ chức có đăng ký kinh doanh trong nước`.<br>Control UI động theo Nguồn xác thực:<br>+ Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>+ Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa và kiểm tra trùng trên toàn hệ thống đối với các tài khoản đang ở trạng thái `Đang hoạt động` (ngoại trừ bản ghi đang sửa). |
| Mã số thuế/Số giấy phép đầu tư | String(255) | Có khi Loại tổ chức là Tổ chức nước ngoài | Theo bản ghi | Chỉ hiển thị đối với tài khoản chính khi **Loại tổ chức** = `Tổ chức nước ngoài`.<br>Control UI động theo Nguồn xác thực:<br>+ Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>+ Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa và kiểm tra trùng trên toàn hệ thống đối với các tài khoản đang ở trạng thái `Đang hoạt động` (ngoại trừ bản ghi đang sửa). |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Loại tổ chức | Control UI: Hiển thị/Read-only.<br>Chỉ hiển thị khi cập nhật Tài khoản chính của Tổ chức.<br>- Tự động là `Trong nước` nếu Loại tổ chức = `Tổ chức có đăng ký kinh doanh trong nước`.<br>- Tự động là `Nước ngoài` nếu Loại tổ chức = `Tổ chức nước ngoài`.<br>Không hiển thị trên form Thêm/Cập nhật tài khoản phụ vì đây là thông tin kế thừa từ Tổ chức mẹ. |
| Tên tổ chức / Tên khách hàng tài khoản phụ | String(255) | Có | Theo bản ghi | Đối với tài khoản chính của Tổ chức, Control UI động theo Nguồn xác thực:<br>+ Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>+ Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa.<br>Đối với tài khoản phụ: Cho phép sửa theo quy tắc cập nhật tài khoản phụ. |
| Email tổ chức (Tên đăng nhập) / Email tài khoản phụ (Tên đăng nhập) | String(255) | Có nếu hồ sơ có nguồn xác thực Nội bộ | Theo bản ghi | Đối với tài khoản chính của Tổ chức, Control UI động theo Nguồn xác thực:<br>+ Nếu Nguồn xác thực là `VNeID`: Cho phép sửa Email vì Email chỉ là thông tin liên hệ, chưa dùng làm Tên đăng nhập Nội bộ.<br>+ Nếu Nguồn xác thực là `Nội bộ` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only) vì Email là Tên đăng nhập của nguồn xác thực Nội bộ.<br>Đối với tài khoản phụ: Không cho phép sửa khi cập nhật vì Email là định danh đăng nhập của tài khoản phụ. |
| Số điện thoại tổ chức | String(20) | Không | Theo bản ghi | Chỉ áp dụng với tài khoản chính của Tổ chức. Cho phép sửa. Kiểm tra định dạng theo Quốc gia nếu có nhập. |
| Quốc gia | String(255) | Có | Theo bản ghi | Control UI động theo Nguồn xác thực.<br>- Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>- Nếu Nguồn xác thực là `Nội bộ`: Hiển thị hộp chọn và cho phép sửa theo danh mục Quốc gia [DM_09]. |
| Tỉnh/TP | Enum(String(50)) hoặc String(255) | Không | Theo bản ghi | Cho phép sửa. Control UI động theo Quốc gia:<br>+ Nếu Quốc gia là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>+ Nếu Quốc gia khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập. |
| Địa chỉ chi tiết | String(500) | Không | Theo bản ghi | Cho phép sửa. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có đối với tài khoản chính | Theo bản ghi | Control UI: Hộp chọn. Chỉ áp dụng với tài khoản chính của Tổ chức. Hiển thị theo **Tên viết tắt** của Danh mục dùng chung - [DM_08 - Trung tâm giao dịch bảo đảm](../../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| Người đại diện | String(255) | Không | Theo bản ghi | Chỉ áp dụng với tài khoản chính của Tổ chức.<br>Control UI động theo Nguồn xác thực:<br>+ Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>+ Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa. |
| Loại giấy tờ người đại diện | Enum(String(50)) | Không | Theo bản ghi | Chỉ áp dụng với tài khoản chính của Tổ chức.<br>Control UI động theo Nguồn xác thực:<br>+ Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>+ Nếu Nguồn xác thực là `Nội bộ`: Hiển thị hộp chọn và cho phép sửa. Tham chiếu Danh mục dùng chung - Loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ người đại diện | String(50) | Không | Theo bản ghi | Chỉ áp dụng với tài khoản chính của Tổ chức.<br>Control UI động theo Nguồn xác thực:<br>+ Nếu Nguồn xác thực là `VNeID` hoặc `VNeID, Nội bộ`: Không cho phép sửa (Read-only).<br>+ Nếu Nguồn xác thực là `Nội bộ`: Cho phép sửa. |
| TechID | String(100) | - | Theo nguồn xác thực VNeID | Chỉ hiển thị khi hồ sơ có Nguồn xác thực chứa `VNeID`. Nếu chưa liên kết VNeID thì để trống. Admin không được nhập/sửa TechID. |
| Nhóm người dùng | List(Enum(String(50))) | Không* | Theo bản ghi | Control UI: Ô tìm kiếm + danh sách checkbox. Cho phép tìm kiếm theo **Tên nhóm người dùng** và tích chọn một hoặc nhiều Nhóm người dùng. |
| Vai trò | List(Enum(String(50))) | Không* | Theo bản ghi | Control UI: Ô tìm kiếm + danh sách checkbox. Cho phép tìm kiếm theo **Tên vai trò** và tích chọn một hoặc nhiều Vai trò. |
| Cây phân quyền cộng dồn | - | - | Theo Nhóm người dùng/Vai trò đã chọn | Control UI: Cây phân quyền chỉ đọc. Hiển thị quyền cộng dồn từ toàn bộ Nhóm người dùng và Vai trò đã chọn; tài khoản phụ không được vượt quá quyền của Tổ chức mẹ. |
| Tài liệu đính kèm | Danh sách file | Không | Theo bản ghi | Control UI: Bảng nhập nhiều dòng. Cho phép Xem file/Xóa file đối với màn cập nhật. |
| **Tab 2: Tài khoản phụ trực thuộc** | - | - | - | Chỉ hiển thị khi cập nhật Tài khoản chính của Tổ chức. |
| Tìm kiếm nhanh | String(255) | Không | Trống | Tìm kiếm nhanh tài khoản phụ theo Tên khách hàng, Email hoặc Số giấy tờ. |
| Nút: Thêm tài khoản phụ | Button | - | - | Mở form thêm mới tài khoản phụ trực thuộc Tổ chức hiện tại. |
| Bảng danh sách tài khoản phụ | - | - | Theo bản ghi | Hiển thị danh sách tài khoản phụ trực thuộc Tổ chức hiện tại.<br>Lưới bao gồm tài khoản phụ đã có trong CSDL và các tài khoản phụ được thêm/sửa tạm trong phiên cập nhật hiện tại.<br>Các thay đổi trên lưới chỉ được ghi nhận vào CSDL khi người dùng bấm **Lưu cập nhật** ở form chính.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Cột: STT | - | - | - | Số thứ tự tăng dần theo danh sách hiển thị. |
| Cột: Tên | String(255) | - | Theo bản ghi | Họ tên tài khoản phụ. |
| Cột: Số giấy tờ | String(255) | - | Theo bản ghi | Số giấy tờ pháp lý của tài khoản phụ. |
| Cột: Email | String(255) | - | Theo bản ghi | Email đồng thời là Tên đăng nhập của tài khoản phụ. |
| Cột: Địa chỉ chi tiết | String(500) | - | Theo bản ghi | Hiển thị đúng giá trị trường Địa chỉ chi tiết của tài khoản phụ. |
| Cột: Trạng thái | Enum(String(50)) | - | Theo bản ghi | Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Cột: Thao tác | - | - | Theo trạng thái | Gồm:<br>+ Sửa<br>+ Đóng<br>+ Xóa |
| **Form Thêm/Sửa tài khoản phụ** | - | - | - | Hiển thị khi người dùng chọn Thêm tài khoản phụ hoặc Sửa tài khoản phụ. |
| Tên khách hàng | String(255) | Có | Theo bản ghi | Họ tên tài khoản phụ. |
| Email (Tên đăng nhập) | String(255) | Có | Theo bản ghi | Control UI: Hiển thị/Read-only khi cập nhật tài khoản phụ.<br>Email/Tên đăng nhập của tài khoản phụ. Không hiển thị trường Tên đăng nhập riêng trên form. Không cho phép sửa khi cập nhật vì Email là định danh đăng nhập của tài khoản. |
| Số điện thoại | String(20) | Không | Theo bản ghi | Số điện thoại liên hệ của tài khoản phụ. Nếu có nhập, kiểm tra định dạng theo Quốc gia. |
| Đơn vị | String(255) | Không | Theo bản ghi | Cho phép nhập text thông tin đơn vị/phòng ban/chi nhánh của tài khoản phụ trong Tổ chức. |
| Loại giấy tờ | Enum(String(50)) | Có | Căn cước công dân | Tham chiếu Danh mục dùng chung - Loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(255) | Có | Theo bản ghi | Khóa Read-only khi sửa. Kiểm tra trùng lặp đồng thời trên lưới tạm hiện tại của màn hình và tất cả tài khoản phụ khác trên toàn hệ thống đang ở trạng thái `Đang hoạt động`. |
| Quốc gia | Enum(String(50)) | Có | Theo bản ghi | Tham chiếu danh mục Quốc gia [DM_09]. |
| Tỉnh/TP | Enum(String(50)) hoặc String(255) | Có | Theo bản ghi | Control UI động theo Quốc gia.<br>- Nếu Quốc gia là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>- Nếu Quốc gia khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập. |
| Địa chỉ chi tiết | String(500) | Có | Theo bản ghi | Địa chỉ chi tiết của tài khoản phụ. |
| Loại tài khoản | Enum(String(50)) | Có | Tài khoản phụ | Control UI: Hiển thị/Read-only. Không được phép chỉnh sửa. |
| Nguồn xác thực | Enum(String(50)) | Có | Nội bộ | Control UI: Hiển thị/Read-only khi thêm mới tài khoản phụ từ Admin.<br>Nếu tài khoản phụ đã có liên kết VNeID, nguồn xác thực VNeID hiển thị tại trường Nguồn xác thực của hồ sơ. |
| TechID | String(100) | - | Theo nguồn xác thực VNeID | Control UI: Hiển thị/Read-only.<br>Chỉ hiển thị khi hồ sơ tài khoản phụ có Nguồn xác thực chứa `VNeID`. Nếu chưa liên kết VNeID thì để trống. Admin không được nhập/sửa TechID. |
| Nhóm người dùng | List(Enum(String(50))) | Không* | Theo bản ghi | Ô tìm kiếm + danh sách checkbox. Cho phép tích chọn một hoặc nhiều Nhóm người dùng. |
| Vai trò | List(Enum(String(50))) | Không* | Theo bản ghi | Ô tìm kiếm + danh sách checkbox. Cho phép tích chọn một hoặc nhiều Vai trò. |
| Cây phân quyền cộng dồn | - | - | Theo Nhóm người dùng/Vai trò đã chọn | Cây phân quyền chỉ đọc, hiển thị quyền cộng dồn và không vượt quá phạm vi quyền được phép của Tổ chức mẹ. |
| Nút: Lưu | Button | - | - | Chỉ hiển thị khi thêm mới tài khoản phụ.<br>Đưa dữ liệu tài khoản phụ vào lưới tạm trên màn hình.<br>Không tạo tài khoản trong CSDL, không sinh mật khẩu và không gửi Email tại bước này. |
| Nút: Cập nhật | Button | - | - | Chỉ hiển thị khi sửa tài khoản phụ.<br>Cập nhật dữ liệu dòng tài khoản phụ đang chọn trên lưới tạm của màn hình.<br>Không cập nhật CSDL và không gửi Email tại bước này. |
| Nút: Hủy | Button | - | - | Đóng form tài khoản phụ, không lưu thay đổi đang nhập. |

**Ghi chú**:
(*): Bắt buộc phải chọn ít nhất một trong hai trường: **Nhóm người dùng** hoặc **Vai trò**.

**Ghi chú nghiệp vụ khi cập nhật tài khoản phụ trực thuộc**:
- Tài khoản phụ thêm mới/sửa trong phiên cập nhật chỉ được ghi nhận trên lưới tạm của màn hình.
- Chỉ khi người dùng bấm **Lưu cập nhật** ở form chính, hệ thống mới tạo mới/cập nhật tài khoản phụ vào CSDL.
- Email thông tin tài khoản chỉ gửi cho tài khoản phụ được tạo mới thành công; không gửi Email khi chỉ cập nhật thông tin tài khoản phụ, trừ nghiệp vụ Đặt lại mật khẩu.
- Nếu tài khoản phụ có liên kết VNeID, hệ thống hiển thị TechID ở chế độ chỉ đọc để phục vụ đối chiếu/xác thực; Admin không được nhập hoặc chỉnh sửa thủ công TechID.

###### 4.3.1.4.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu dữ liệu đã nhập hoặc thay đổi. |
| 2 | Đặt lại mật khẩu | Button | Chỉ cho phép nếu hồ sơ tài khoản tổ chức hoặc tài khoản phụ đang chọn có nguồn xác thực Nội bộ. Khi click, mở popup xác nhận đặt lại mật khẩu cho nguồn xác thực Nội bộ. Chi tiết tại [UC009.09 - Đặt lại mật khẩu tài khoản khách hàng](#uc00909---dat-lai-mat-khau-tai-khoan-khach-hang). |
| 3 | Chuyển tab Thông tin chung | Tab | Hiển thị khối thông tin chung của tài khoản tổ chức chính. |
| 4 | Chuyển tab Tài khoản phụ trực thuộc | Tab | Hiển thị danh sách tài khoản phụ trực thuộc Tổ chức hiện tại. Chỉ áp dụng với tài khoản chính của Tổ chức. |
| 5 | Thêm tài khoản phụ | Button | Mở form Thêm tài khoản phụ trực thuộc. |
| | | | - TH Hợp lệ: Hiển thị form nhập tài khoản phụ trực thuộc ở chế độ thêm mới; chưa tạo tài khoản trong CSDL. |
| 6 | Sửa tài khoản phụ | Button/Icon | Mở form Sửa tài khoản phụ tương ứng. Khóa các thông tin định danh không được phép sửa theo quy tắc nghiệp vụ. |
| 7 | Đóng tài khoản phụ | Button/Icon | Mở [Popup xác nhận Đóng/Xóa tài khoản khách hàng](#uc00904---popup-xac-nhan-dongxoa-tai-khoan-khach-hang) với loại thao tác `Đóng`. |
| 8 | Xóa tài khoản phụ | Button/Icon | Mở [Popup xác nhận Đóng/Xóa tài khoản khách hàng](#uc00904---popup-xac-nhan-dongxoa-tai-khoan-khach-hang) với loại thao tác `Xóa`. |
| 9 | Lưu tài khoản phụ | Button | Validate dữ liệu form tài khoản phụ. |
| | | | - TH1 (Dữ liệu không hợp lệ): Nếu bỏ trống bắt buộc, vi phạm [BR-VAL-001] và hiển thị [MSG-ERR-VAL-001]. Nếu sai định dạng hoặc vượt quá độ dài, hiển thị [MSG-ERR-UC009-003] hoặc [MSG-ERR-UC009-004]. |
| | | | - TH2 (Trùng lặp tài khoản phụ): Kiểm tra Email (Tên đăng nhập) và Số giấy tờ của tài khoản phụ đang lưu đồng thời trên lưới tạm hiện tại của màn hình và tất cả tài khoản phụ khác trên toàn hệ thống đang ở trạng thái `Đang hoạt động`. Nếu trùng, hiển thị [MSG-ERR-UC009-001]. Khi sửa tài khoản phụ, bỏ qua chính bản ghi đang sửa khi kiểm tra trùng. |
| | | | - TH Hợp lệ:<br>+ Nếu là thêm mới: đưa dữ liệu tài khoản phụ vào lưới tạm của màn hình.<br>+ Nếu là sửa: cập nhật dữ liệu của dòng tài khoản phụ đang chọn trên lưới tạm của màn hình.<br>+ Không tạo tài khoản mới trong CSDL, không cập nhật tài khoản phụ trong CSDL, không sinh mật khẩu, không gửi Email và không ghi Audit Log tại bước này.<br>+ Làm mới danh sách tài khoản phụ trực thuộc trên màn hình theo dữ liệu tạm vừa lưu. |
| 10 | Lưu cập nhật | Button | Validate dữ liệu form chính. |
| | | | - TH1 (Dữ liệu không hợp lệ): Nếu bỏ trống bắt buộc, vi phạm [BR-VAL-001] và hiển thị [MSG-ERR-VAL-001]. Nếu sai định dạng hoặc vượt quá độ dài, hiển thị [MSG-ERR-UC009-003] hoặc [MSG-ERR-UC009-004]. |
| | | | - TH2 (Trùng lặp tài khoản chính tổ chức): Nếu Nguồn xác thực là `Nội bộ` và có cập nhật Mã định danh tổ chức hoặc Mã số thuế/Số giấy phép đầu tư, hệ thống kiểm tra trùng trên toàn hệ thống đối với các tài khoản chính tổ chức đang ở trạng thái `Đang hoạt động` (ngoại trừ bản ghi đang sửa). Nếu trùng, hiển thị [MSG-ERR-VAL-009]. |
| | | | - TH3 (Trùng lặp tài khoản phụ): Kiểm tra toàn bộ danh sách tài khoản phụ trực thuộc trước khi lưu cập nhật. Hệ thống kiểm tra đồng thời Email (Tên đăng nhập) và Số giấy tờ trên lưới tạm hiện tại của màn hình và tất cả tài khoản phụ khác trên toàn hệ thống đang ở trạng thái `Đang hoạt động`. Nếu trùng, hiển thị [MSG-ERR-UC009-001]. Khi sửa tài khoản phụ, bỏ qua chính bản ghi đang sửa khi kiểm tra trùng. |
| | | | - TH Hợp lệ:<br>+ Cập nhật thông tin hồ sơ tài khoản chính của Tổ chức vào CSDL.<br>+ Với tài khoản phụ thêm mới trên lưới tạm: tạo mới hồ sơ tài khoản phụ trong CSDL, không sinh Mã khách hàng riêng, gắn quan hệ trực thuộc với Tổ chức mẹ và tạo nguồn xác thực Nội bộ cho tài khoản phụ.<br>+ Với tài khoản phụ đã sửa trên lưới tạm: cập nhật thông tin thay đổi của hồ sơ tài khoản phụ vào CSDL.<br>+ Với tài khoản phụ thêm mới: sinh mật khẩu theo quy tắc tại UC561, mã hóa/băm mật khẩu và gửi Email theo mẫu [Email thông báo khởi tạo tài khoản trực thuộc Nội bộ](../../04_Danh_muc_va_Phu_luc.md#email-khoi-tao-tk-noi-bo).<br>+ Với tài khoản phụ chỉ cập nhật thông tin: không gửi Email thông tin tài khoản, trừ trường hợp nghiệp vụ riêng như Đặt lại mật khẩu tại [UC009.09 - Đặt lại mật khẩu tài khoản khách hàng](#uc00909---dat-lai-mat-khau-tai-khoan-khach-hang).<br>+ Không thay đổi TechID hoặc nguồn xác thực VNeID đã liên kết nếu không có nghiệp vụ riêng cho phép hủy/liên kết lại VNeID.<br>+ Ghi nhận Audit Log cho tài khoản chính và các tài khoản phụ được tạo mới/cập nhật.<br>+ Hiển thị [MSG-SUC-UC009-001] và tải lại danh sách. |
| 11 | Click dòng tài khoản phụ | Row Click | Mở màn hình xem chi tiết tài khoản phụ; màn hình chi tiết hiển thị thông tin Tổ chức chủ quản và không hiển thị trường Mã khách hàng của tài khoản phụ. |

##### 4.3.1.4.4. UC009.04 - Popup xác nhận Đóng/Xóa tài khoản khách hàng

###### 4.3.1.4.4.1. Mục đích

- Hiển thị popup xác nhận dùng chung trước khi thực hiện các thao tác có rủi ro đối với tài khoản khách hàng, bao gồm Đóng tài khoản và Xóa tài khoản.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.
- NSD chọn một trong các hành động sau:
  \+ Đóng tài khoản chính.
  \+ Xóa tài khoản chính.
  \+ Đóng tài khoản phụ trực thuộc tổ chức.
  \+ Xóa tài khoản phụ trực thuộc tổ chức.

###### 4.3.1.4.4.2. UC009.04.MH01 - Popup xác nhận Đóng/Xóa tài khoản khách hàng

**Màn hình**:
- Link ảnh màn hình: [UC009.04.MH01 - Popup xác nhận Đóng/Xóa tài khoản khách hàng](../../images/UC009/UC009_04_MH01_Popup_xac_nhan_dong_xoa_tai_khoan_khach_hang.png).
- Popup cảnh báo xác nhận thao tác Đóng/Xóa hồ sơ tài khoản khách hàng.
- Popup được dùng chung cho tài khoản chính và tài khoản phụ trực thuộc tổ chức.
- Thao tác Đóng/Xóa tác động ở cấp hồ sơ tài khoản khách hàng và áp dụng cho toàn bộ nguồn xác thực đang liên kết với hồ sơ đó.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                           |
| :--------------------- | :-------------- | :--------- | :---------- | :-------------------------------------------------------------------------------- |
| Loại thao tác | Enum(String(50)) | \- | Theo thao tác đã chọn | Control UI: Hiển thị/Read-only.<br>Gồm:<br>+ Đóng<br>+ Xóa |
| Thông tin tài khoản | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các thông tin nhận diện chính:<br>+ Tên khách hàng/Tên tổ chức<br>+ Email (Tên đăng nhập)<br>+ Loại tài khoản |
| Thông báo cảnh báo | String(500) | \- | Theo Loại thao tác | Control UI: Hiển thị/Read-only.<br>- Nếu Loại thao tác = `Đóng`: Hiển thị [MSG-CFM-UC009-001].<br>- Nếu Loại thao tác = `Xóa`: Hiển thị [MSG-CFM-UC009-002].<br>- Nếu là tài khoản phụ, bổ sung thông tin Tổ chức chủ quản để người dùng kiểm tra trước khi xác nhận. |

###### 4.3.1.4.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy thao tác. |
| 2 | Đồng ý | Button | Thực hiện xử lý theo Loại thao tác đã chọn. |
| | | | - TH1 (Loại thao tác = Đóng):<br>+ Chuyển trạng thái hồ sơ tài khoản khách hàng thành `Đóng`.<br>+ Thu hồi quyền đăng nhập của toàn bộ nguồn xác thực đang liên kết, bao gồm VNeID và Nội bộ nếu có.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị [MSG-SUC-UC009-002] và tải lại danh sách/lưới liên quan. |
| | | | - TH2 (Loại thao tác = Xóa):<br>+ Xóa cứng hồ sơ tài khoản khách hàng khỏi hệ thống.<br>+ Xóa toàn bộ nguồn xác thực và dữ liệu cấu hình liên quan tới hồ sơ đó như gán nhóm người dùng, gán vai trò, phiên đăng nhập, token, thiết lập cá nhân.<br>+ Không kiểm tra điều kiện chặn.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị [MSG-SUC-UC009-003] và tải lại danh sách/lưới liên quan. |

##### 4.3.1.4.5. UC009.05 - Khóa tài khoản khách hàng

###### 4.3.1.4.5.1. Mục đích

- Khóa hồ sơ tài khoản khách hàng, ngăn chặn đăng nhập vào hệ thống bằng toàn bộ nguồn xác thực đang liên kết.  

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  
- Chọn hành động Khóa trên màn hình danh sách hoặc form sửa.  
- Hồ sơ tài khoản khách hàng đang ở trạng thái `Đang hoạt động`.  

###### 4.3.1.4.5.2. UC009.05.MH01 - Màn hình Xác nhận Khóa tài khoản khách hàng

**Màn hình**:
- Link ảnh màn hình: [UC009.05.MH01 - Xác nhận Khóa tài khoản khách hàng](../../images/UC009/UC009_05_MH01_Xac_nhan_khoa_tai_khoan_khach_hang.png).
- Popup Custom Modal cảnh báo xác nhận khóa tài khoản khách hàng trước khi thực hiện thao tác.
- Popup hiển thị khi NSD click icon/nút **Khóa** trên màn hình danh sách hoặc form cập nhật.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                            |
| :--------------------- | :-------------- | :--------- | :---------- | :--------------------------------------------------------------------------------- |
| Loại thao tác | Enum(String(50)) | \- | Khóa | Control UI: Hiển thị/Read-only. |
| Thông tin tài khoản | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các thông tin nhận diện chính:<br>+ Tên khách hàng/Tên tổ chức<br>+ Email (Tên đăng nhập)<br>+ Loại tài khoản |
| Thông báo cảnh báo | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị [MSG-CFM-UC009-003]. |

###### 4.3.1.4.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                  |
| :-- | :--------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hủy             | Button       | Đóng popup, hủy thao tác.                                                                                                                                                                                                                                                                                                                                                            |
| 2   | Đồng ý        | Button       | Thực hiện xử lý khóa tài khoản khách hàng. |
| | | | - TH Hợp lệ:<br>+ Chuyển trạng thái hồ sơ tài khoản khách hàng thành `Bị khóa`.<br>+ Thu hồi quyền đăng nhập của toàn bộ nguồn xác thực đang liên kết, bao gồm VNeID và Nội bộ nếu có.<br>+ Người dùng không thể đăng nhập bằng bất kỳ phương thức đăng nhập nào đang gắn với hồ sơ tài khoản này.<br>+ Ghi nhận lịch sử Audit Log (Người thực hiện, Ngày thực hiện, Hồ sơ tài khoản bị khóa, Nguồn xác thực, Loại hành động: `Khóa tài khoản khách hàng`).<br>+ Hiển thị [MSG-SUC-UC009-004] và tải lại danh sách. |

##### 4.3.1.4.6. UC009.06 - Mở khóa tài khoản khách hàng

###### 4.3.1.4.6.1. Mục đích

- Khôi phục trạng thái hoạt động bình thường cho hồ sơ tài khoản khách hàng đang bị khóa và cho phép đăng nhập lại bằng các nguồn xác thực đang liên kết.  

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  
- Hồ sơ tài khoản khách hàng đang ở trạng thái `Bị khóa`.  

###### 4.3.1.4.6.2. UC009.06.MH01 - Màn hình Xác nhận Mở khóa tài khoản khách hàng

**Màn hình**:
- Link ảnh màn hình: [UC009.06.MH01 - Xác nhận Mở khóa tài khoản khách hàng](../../images/UC009/UC009_06_MH01_Xac_nhan_mo_khoa_tai_khoan_khach_hang.png).
- Popup Custom Modal cảnh báo xác nhận mở khóa tài khoản khách hàng trước khi thực hiện thao tác.
- Popup hiển thị khi NSD click icon/nút **Mở khóa** trên màn hình danh sách hoặc form cập nhật.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                |
| :--------------------- | :-------------- | :--------- | :---------- | :------------------------------------------------------------------------------------- |
| Loại thao tác | Enum(String(50)) | \- | Mở khóa | Control UI: Hiển thị/Read-only. |
| Thông tin tài khoản | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các thông tin nhận diện chính:<br>+ Tên khách hàng/Tên tổ chức<br>+ Email (Tên đăng nhập)<br>+ Loại tài khoản |
| Thông báo cảnh báo | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị [MSG-CFM-UC009-004]. |

###### 4.3.1.4.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hủy             | Button       | Đóng popup, hủy thao tác.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2   | Đồng ý        | Button       | Thực hiện xử lý mở khóa tài khoản khách hàng. |
| | | | - TH Hợp lệ:<br>+ Chuyển trạng thái hồ sơ tài khoản khách hàng thành `Đang hoạt động`.<br>+ Khách hàng có thể đăng nhập lại bằng các nguồn xác thực đang liên kết, bao gồm VNeID và Nội bộ nếu có.<br>+ Ghi nhận lịch sử Audit Log (Người thực hiện, Ngày thực hiện, Hồ sơ tài khoản được mở khóa, Nguồn xác thực, Loại hành động: `Mở khóa tài khoản khách hàng`).<br>+ Hiển thị [MSG-SUC-UC009-005] và tải lại danh sách. |

##### 4.3.1.4.7. UC009.07 - Kết xuất Excel

###### 4.3.1.4.7.1. Mục đích

- Xuất danh sách thông tin khách hàng cá nhân hoặc tổ chức ra file Excel (.xlsx) theo bộ lọc hiện hành phục vụ công tác báo cáo.  

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  

###### 4.3.1.4.7.2. UC009.07.MH01 - Màn hình Kết xuất Excel

**Màn hình**:
- Link ảnh màn hình: [UC009.07.MH01 - Kết xuất Excel](../../images/UC009/UC009_07_MH01_Ket_xuat_excel.png).
- Nút chức năng Kết xuất trên màn hình danh sách (UC009.01).

###### 4.3.1.4.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                  |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Kết xuất Excel | Button       | Thực hiện kiểm tra và xuất file dữ liệu. |
| | | | - TH1 (Không có dữ liệu): Hệ thống chặn thao tác và hiển thị [MSG-ERR-UC009-005]. |
| | | | - TH Hợp lệ:<br>+ Hệ thống xử lý xuất danh sách khách hàng tương ứng theo bộ lọc hiện tại trên lưới ra định dạng file Excel (.xlsx).<br>+ Tải file về thiết bị của NSD. |

##### 4.3.1.4.8. UC009.08 - Xem chi tiết tài khoản khách hàng

###### 4.3.1.4.8.1. UC009.08 - UC.1: Xem chi tiết tài khoản khách hàng Cá nhân

###### 4.3.1.4.8.1.1. Mục đích
- Cho phép xem chi tiết toàn bộ thông tin của một tài khoản khách hàng cá nhân.  

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  

###### 4.3.1.4.8.1.2. Màn hình
- Giao diện dạng Popup Modal. Toàn bộ các trường dữ liệu ở trạng thái chỉ đọc (Read-only).
- Link ảnh màn hình: [UC009.08.UC1 - Xem chi tiết tài khoản khách hàng Cá nhân](../../images/UC009/UC009_08_UC1_Xem_chi_tiet_tai_khoan_khach_hang_ca_nhan.png).
- Đối với các trường không bắt buộc (Ngày sinh, Giới tính, Tỉnh/TP, Địa chỉ chi tiết, Trung tâm Đăng ký mặc định, Nhóm người dùng, Vai trò) nếu không có dữ liệu gốc thì áp dụng quy tắc: **Chỉ hiển thị khi có dữ liệu gốc.** (ẩn khỏi màn hình nếu trống).

**Mô tả thông tin trên màn hình**:

| Trường thông tin               | Kiểu dữ liệu | Bắt buộc | Mặc định   | Mô tả                                            |
| :-------------------------------- | :-------------- | :--------- | :------------ | :------------------------------------------------- |
| Loại khách hàng                | Enum(String(50)) | \- | Cá nhân     | Control UI: Hiển thị/Read-only.<br>Read-only. |
| Loại tài khoản                | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Gồm:<br>+ Tài khoản chính<br>+ Tài khoản phụ<br>Khách hàng cá nhân luôn là Tài khoản chính. |
| Nguồn xác thực | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các nguồn xác thực đã liên kết với hồ sơ:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Phân loại khách hàng | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Gồm:<br>+ Trong nước<br>+ Nước ngoài |
| Loại giấy tờ                   | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. |
| Số giấy tờ | String(50) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. |
| Họ và tên                      | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. |
| Ngày sinh                        | Date | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. Chỉ hiển thị khi có dữ liệu gốc. |
| Giới tính                       | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. Chỉ hiển thị khi có dữ liệu gốc. |
| Quốc tịch                       | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. |
| Tỉnh/TP                          | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị giá trị Tỉnh/TP đã lưu theo quy tắc Quốc tịch tại form thêm mới/cập nhật. Chỉ hiển thị khi có dữ liệu gốc. |
| Địa chỉ chi tiết              | String(500) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. Chỉ hiển thị khi có dữ liệu gốc. |
| Email (Tên đăng nhập) | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Email đồng thời là Tên đăng nhập. |
| Số điện thoại                 | String(20) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. |
| Trung tâm Đăng ký mặc định | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. Chỉ hiển thị khi có dữ liệu gốc. |
| TechID | String(100) | \- | Theo nguồn xác thực VNeID | Chỉ hiển thị khi hồ sơ có Nguồn xác thực chứa `VNeID`. Nếu chưa liên kết VNeID thì để trống, không hiển thị nội dung thay thế như `Không áp dụng`. |
| Nhóm người dùng               | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. Chỉ hiển thị khi có dữ liệu gốc. |
| Vai trò                          | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Read-only. Chỉ hiển thị khi có dữ liệu gốc. |
| Cây phân quyền                 | Boolean | \- | Theo bản ghi | Control UI: Checkbox.<br>Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)**, tổng hợp tất cả các quyền được cộng dồn từ Nhóm người dùng và Vai trò mà tài khoản sở hữu:<br>+ **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng mà tài khoản khách hàng cá nhân này sở hữu (được cộng dồn từ danh sách Nhóm người dùng và Vai trò đang gán). Các quyền khác không được phân cho tài khoản sẽ bị ẩn đi khỏi cây.<br>+ **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà tài khoản có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào tài khoản không có quyền sẽ không hiển thị làm node gốc trên cây.<br>+ **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>+ **Logic hiển thị quyền**: Hệ thống hiển thị danh sách quyền mà tài khoản đang có theo Nhóm người dùng và Vai trò đã được gán. |

###### 4.3.1.4.8.1.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                            |
| :-- | :--------------- | :----------- | :--------------------------------------------------------------------------------- |
| 1   | Đóng           | Button       | Đóng Popup Modal xem chi tiết.                                                  |
| 2   | Cập nhật      | Button       | Chuyển sang màn hình Sửa tài khoản khách hàng cá nhân (UC009.03 - UC.1). |

###### 4.3.1.4.8.2. UC009.08 - UC.2: Xem chi tiết tài khoản khách hàng Tổ chức

###### 4.3.1.4.8.2.1. Mục đích
- Cho phép xem chi tiết thông tin tài khoản tổ chức chính và tài khoản phụ trực thuộc tổ chức.
- Cho phép xem danh sách chủ thể xác thực liên kết đã đăng nhập qua VNeID trong ngữ cảnh đại diện/ủy quyền của tổ chức.
- Phân biệt rõ chủ thể xác thực liên kết với tài khoản phụ trực thuộc tổ chức.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  

###### 4.3.1.4.8.2.2. Màn hình Xem chi tiết Tài khoản Tổ chức - Tài khoản chính

- Giao diện dạng Popup Modal, chia thành 3 Tab chính: **Thông tin chung**, **Tài khoản phụ trực thuộc** và **Chủ thể xác thực liên kết**.
- Link ảnh màn hình: [UC009.08.UC2 - Xem chi tiết tài khoản khách hàng Tổ chức](../../images/UC009/UC009_08_UC2_Xem_chi_tiet_tai_khoan_khach_hang_to_chuc.png).
- Thông tin hiển thị tương tự màn Thêm mới tài khoản tổ chức nhưng toàn bộ trường dữ liệu ở trạng thái chỉ đọc (Read-only).
- Có nút **Cập nhật** cho phép mở màn hình Cập nhật tài khoản tổ chức (UC009.03 - UC.2).
- Tab **Tài khoản phụ trực thuộc** trên màn Xem chi tiết chỉ phục vụ xem danh sách tài khoản phụ, không cho phép Thêm/Sửa/Đóng/Xóa tài khoản phụ tại màn này.
- Tab **Chủ thể xác thực liên kết** chỉ phục vụ xem danh sách cá nhân/tổ chức đã xác thực qua VNeID và được liên kết với tài khoản tổ chức trong ngữ cảnh đại diện/ủy quyền; không cho phép Thêm/Sửa/Đóng/Xóa tại màn này.
- Đối với các trường không bắt buộc nếu không có dữ liệu gốc thì áp dụng quy tắc: **Chỉ hiển thị khi có dữ liệu gốc.**

**Mô tả thông tin trên màn hình - Tài khoản chính**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| **Tab 1: Thông tin chung** | - | \- | - | Hiển thị thông tin chi tiết của tài khoản chính Tổ chức ở trạng thái chỉ đọc. |
| Loại khách hàng | Enum(String(50)) | \- | Tổ chức | Control UI: Hiển thị/Read-only. |
| Loại tài khoản | Enum(String(50)) | \- | Tài khoản chính | Control UI: Hiển thị/Read-only. |
| Loại tổ chức | Enum(String(100)) | \- | Theo bản ghi | Gồm:<br>+ Tổ chức có đăng ký kinh doanh trong nước<br>+ Tổ chức nước ngoài |
| Mã định danh tổ chức | String(255) | \- | Theo bản ghi | Chỉ hiển thị khi Loại tổ chức = `Tổ chức có đăng ký kinh doanh trong nước`. |
| Mã số thuế/Số giấy phép đầu tư | String(255) | \- | Theo bản ghi | Chỉ hiển thị khi Loại tổ chức = `Tổ chức nước ngoài`. |
| Phân loại khách hàng | Enum(String(50)) | \- | Theo Loại tổ chức | Control UI: Hiển thị/Read-only.<br>- Tự động là `Trong nước` nếu Loại tổ chức = `Tổ chức có đăng ký kinh doanh trong nước`.<br>- Tự động là `Nước ngoài` nếu Loại tổ chức = `Tổ chức nước ngoài`. |
| Tên tổ chức | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only. |
| Email tổ chức (Tên đăng nhập) | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only. Email đồng thời là Tên đăng nhập. |
| Nguồn xác thực | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các nguồn xác thực đã liên kết với hồ sơ:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Số điện thoại tổ chức | String(20) | \- | Theo bản ghi | Chỉ hiển thị khi có dữ liệu gốc. |
| Quốc gia | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only. |
| Tỉnh/TP | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị giá trị Tỉnh/TP đã lưu theo quy tắc Quốc gia tại form thêm mới/cập nhật. Chỉ hiển thị khi có dữ liệu gốc. |
| Địa chỉ chi tiết | String(500) | \- | Theo bản ghi | Chỉ hiển thị khi có dữ liệu gốc. |
| Trung tâm Đăng ký mặc định | String(255) | \- | Theo bản ghi | Chỉ hiển thị khi có dữ liệu gốc. |
| **Thông tin Người đại diện** | - | \- | - | Khối thông tin người đại diện của tổ chức. |
| > Họ và tên người đại diện | String(255) | \- | Theo bản ghi | Chỉ hiển thị khi có dữ liệu gốc. |
| > Loại giấy tờ | Enum(String(50)) | \- | Theo bản ghi | Chỉ hiển thị khi có dữ liệu gốc. |
| > Số giấy tờ | String(50) | \- | Theo bản ghi | Chỉ hiển thị khi có dữ liệu gốc. |
| Tài liệu đính kèm | Danh sách file | \- | Theo bản ghi | Chỉ cho phép **Xem/Tải về** tài liệu. |
| TechID | String(100) | \- | Theo nguồn xác thực VNeID | Chỉ hiển thị khi hồ sơ có Nguồn xác thực chứa `VNeID`. |
| Nhóm người dùng | String(255) | \- | Theo bản ghi | Chỉ hiển thị nếu có giá trị. |
| Vai trò | String(255) | \- | Theo bản ghi | Chỉ hiển thị nếu có giá trị. |
| Cây phân quyền cộng dồn | - | \- | Theo bản ghi | Hiển thị dạng chỉ xem, tổng hợp quyền từ Nhóm người dùng và Vai trò đang gán. |
| **Tab 2: Tài khoản phụ trực thuộc** | - | \- | - | Chỉ hiển thị khi xem tài khoản chính của tổ chức. |
| Tìm kiếm nhanh | String(255) | Không | Trống | Cho phép tìm kiếm theo Tên khách hàng, Email hoặc Số giấy tờ. |
| Bảng danh sách tài khoản phụ | - | \- | 50 bản ghi/trang | Control UI: Bảng/Lưới hiển thị ở dạng chỉ đọc.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| > Cột: STT | - | \- | - | Số thứ tự tăng dần. |
| > Cột: Tên | String(255) | \- | Theo bản ghi | Họ tên tài khoản phụ. |
| > Cột: Số giấy tờ | String(255) | \- | Theo bản ghi | Số giấy tờ pháp lý của tài khoản phụ. |
| > Cột: Email | String(255) | \- | Theo bản ghi | Email đồng thời là Tên đăng nhập của tài khoản phụ. |
| > Cột: Địa chỉ chi tiết | String(500) | \- | Theo bản ghi | Hiển thị đúng giá trị trường Địa chỉ chi tiết của tài khoản phụ. |
| > Cột: Trạng thái | Enum(String(50)) | \- | Theo bản ghi | Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| > Row click | Row Click | \- | \- | Khi click vào dòng dữ liệu tài khoản phụ trực thuộc ở Tab 2, hệ thống mở [Màn hình Xem chi tiết Tài khoản Tổ chức - Tài khoản phụ](#4314824-man-hinh-xem-chi-tiet-tai-khoan-to-chuc---tai-khoan-phu). |
| **Tab 3: Chủ thể xác thực liên kết** | - | \- | - | Chỉ hiển thị khi xem tài khoản chính của tổ chức. |
| Bảng danh sách chủ thể xác thực liên kết | - | \- | 50 bản ghi/trang | Control UI: Bảng/Lưới hiển thị ở dạng chỉ đọc.<br>- Ghi nhận các chủ thể đã xác thực qua VNeID/DVCQG trong ngữ cảnh đại diện/ủy quyền của tổ chức.<br>- Không phải tài khoản phụ trực thuộc và không hiển thị như tài khoản khách hàng độc lập nếu chưa được tạo theo nghiệp vụ tài khoản phụ.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| > Cột: STT | - | \- | - | Số thứ tự tăng dần. |
| > Cột: Họ tên | String(255) | \- | Theo bản ghi | Họ tên chủ thể xác thực do VNeID/DVCQG trả về. |
| > Cột: Số giấy tờ | String(255) | \- | Theo bản ghi | Số giấy tờ pháp lý của chủ thể xác thực. |
| > Cột: TechID | String(100) | \- | Theo bản ghi | Hiển thị dạng che/mask theo chính sách bảo mật, phục vụ đối chiếu nguồn xác thực. |
| > Cột: Vai trò đại diện/ủy quyền | String(255) | \- | Theo bản ghi | Vai trò/ngữ cảnh đại diện do VNeID/DVCQG trả về, nếu có. |
| > Cột: Nguồn xác thực | String(50) | \- | VNeID | Giá trị `VNeID`. |
| > Cột: Trạng thái liên kết | Enum(String(50)) | \- | Theo bản ghi | Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| > Cột: Lần xác thực gần nhất | DateTime | \- | Theo bản ghi | Hiển thị theo định dạng `dd/mm/yyyy HH:mm`. |

###### 4.3.1.4.8.2.3. Chức năng trên màn hình - Tài khoản chính

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1   | Đóng | Button | Đóng Popup Modal xem chi tiết. |
| 2   | Cập nhật | Button | Chuyển sang màn hình Cập nhật tài khoản khách hàng tổ chức (UC009.03 - UC.2). |
| 3   | Chuyển Tab | Tab | Cho phép chuyển đổi giữa Tab **Thông tin chung**, Tab **Tài khoản phụ trực thuộc** và Tab **Chủ thể xác thực liên kết**. |
| 4   | Click dòng dữ liệu tài khoản phụ (Tab 2) | Row Click | Khi click vào bất kỳ dòng nào trên lưới danh sách tài khoản phụ ở Tab 2, hệ thống mở [Màn hình Xem chi tiết Tài khoản Tổ chức - Tài khoản phụ](#4314824-man-hinh-xem-chi-tiet-tai-khoan-to-chuc---tai-khoan-phu) dạng chỉ đọc (Read-only). |
| 5   | Xem chủ thể xác thực liên kết (Tab 3) | Table | Hiển thị danh sách chủ thể xác thực liên kết ở chế độ chỉ đọc. Không mở form cập nhật, không tạo tài khoản phụ và không thay đổi quyền tài khoản. |

###### 4.3.1.4.8.2.4. Màn hình Xem chi tiết Tài khoản Tổ chức - Tài khoản phụ
- Giao diện dạng Popup Modal, hiển thị thông tin ở trạng thái chỉ đọc (Read-only).
- Link ảnh màn hình: [UC009.08.UC2.TKPhu - Xem chi tiết tài khoản phụ trực thuộc](../../images/UC009/UC009_08_UC2_Xem_chi_tiet_tai_khoan_phu_truc_thuoc.png).
- Tài khoản phụ không hiển thị Mã khách hàng riêng vì hệ thống không sinh Mã khách hàng cho tài khoản phụ.
- Các trường **Nhóm người dùng**, **Vai trò** chỉ hiển thị khi có giá trị.

**Mô tả thông tin trên màn hình - Tài khoản phụ**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| **Thông tin tổ chức chủ quản** | - | \- | Theo bản ghi | Khối thông tin tổ chức sở hữu tài khoản phụ. |
| > Mã khách hàng tổ chức | String(50) | \- | Theo tổ chức chủ quản | Mã khách hàng của Tài khoản chính tổ chức. |
| > Tên tổ chức | String(255) | \- | Theo tổ chức chủ quản | Tên tổ chức chủ quản. |
| > Email tổ chức (Tên đăng nhập) | String(255) | \- | Theo tổ chức chủ quản | Email đồng thời là Tên đăng nhập của tổ chức chủ quản. |
| > Số điện thoại tổ chức | String(20) | \- | Theo tổ chức chủ quản | Số điện thoại của tổ chức chủ quản. |
| **Thông tin tài khoản** | - | \- | Theo bản ghi | Khối thông tin tài khoản phụ. |
| Tên khách hàng | String(255) | \- | Theo bản ghi | Họ tên tài khoản phụ. |
| Email (Tên đăng nhập) | String(255) | \- | Theo bản ghi | Email đồng thời là Tên đăng nhập. |
| Đơn vị | String(255) | \- | Theo bản ghi | Đơn vị/phòng ban/chi nhánh của tài khoản phụ trong Tổ chức. |
| Số điện thoại | String(20) | \- | Theo bản ghi | Chỉ hiển thị khi có dữ liệu gốc. |
| Trạng thái | Enum(String(50)) | \- | Theo bản ghi | Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Loại giấy tờ | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only. |
| Số giấy tờ | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only. |
| Loại khách hàng | Enum(String(50)) | \- | Tổ chức | Control UI: Hiển thị/Read-only. |
| Loại tài khoản | Enum(String(50)) | \- | Tài khoản phụ | Control UI: Hiển thị/Read-only. |
| Nguồn xác thực | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Hiển thị các nguồn xác thực đã liên kết với hồ sơ tài khoản phụ:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Phân loại khách hàng | Enum(String(50)) | \- | Theo tổ chức chủ quản | Gồm:<br>+ Trong nước<br>+ Nước ngoài |
| Ngày tạo | DateTime | \- | Theo bản ghi | Hiển thị theo định dạng `dd/mm/yyyy HH:mm`. |
| Tài liệu đính kèm | Danh sách file | \- | Theo bản ghi | Chỉ cho phép **Xem/Tải về** tài liệu. |
| TechID | String(100) | \- | Theo nguồn xác thực VNeID | Chỉ hiển thị khi hồ sơ tài khoản phụ có Nguồn xác thực chứa `VNeID`. Nếu chưa liên kết VNeID thì để trống, không hiển thị nội dung thay thế như `Không áp dụng`. |
| Nhóm người dùng | String(255) | \- | Theo bản ghi | Chỉ hiển thị nếu có giá trị. |
| Vai trò | String(255) | \- | Theo bản ghi | Chỉ hiển thị nếu có giá trị. |
| Cây phân quyền cộng dồn | - | \- | Theo bản ghi | Hiển thị dạng chỉ xem, tổng hợp quyền từ Nhóm người dùng/Vai trò của tài khoản phụ trong phạm vi quyền của Tổ chức chủ quản. |

###### 4.3.1.4.8.2.5. Chức năng trên màn hình - Tài khoản phụ

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1   | Cập nhật | Button | Chuyển sang màn hình Cập nhật tài khoản phụ trực thuộc của Tài khoản Tổ chức. Chi tiết xử lý cập nhật theo mục **4.3.1.4.3.2. UC009.03 - UC.2: Sửa tài khoản khách hàng Tổ chức**. |
| 2   | Đóng | Button | Đóng Popup Modal xem chi tiết. |

##### 4.3.1.4.9. UC009.09 - Đặt lại mật khẩu tài khoản khách hàng

###### 4.3.1.4.9.1. Mục đích

- Cho phép Cán bộ vận hành tự nhập mật khẩu mới cho nguồn xác thực Nội bộ của hồ sơ tài khoản khách hàng.  
- Chỉ áp dụng đối với hồ sơ tài khoản khách hàng có nguồn xác thực Nội bộ. Nếu hồ sơ chỉ có nguồn xác thực VNeID thì không hiển thị hoặc vô hiệu hóa chức năng Đặt lại mật khẩu.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.  
  \+ Hồ sơ tài khoản khách hàng có nguồn xác thực Nội bộ.  

###### 4.3.1.4.9.2. UC009.09.MH01 - Màn hình Đặt lại mật khẩu

**Màn hình**:
- Link ảnh màn hình: [UC009.09.MH01 - Đặt lại mật khẩu](../../images/UC009/UC009_09_MH01_Dat_lai_mat_khau.png).
- Popup nhập mật khẩu mới.
- Các trường mật khẩu có nút/icon con mắt để ẩn/hiện ký tự đã nhập; mặc định hiển thị dạng che ký tự.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                |
| :--------------------- | :-------------- | :--------- | :---------- | :----------------------------------------------------------------------------------------------------- |
| Email (Tên đăng nhập) | String(255) | Không | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Email là Tên đăng nhập của nguồn xác thực Nội bộ. |
| Mật khẩu mới | Password | Có | Trống | Quản trị nhập mật khẩu mới.<br>- Mật khẩu phải tuân thủ quy tắc phức tạp mật khẩu cấu hình tại UC561.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |
| Nhập lại mật khẩu mới | Password | Có | Trống | Phải trùng khớp với trường Mật khẩu mới.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |
| Yêu cầu đổi mật khẩu khi đăng nhập lần tiếp theo | Boolean | Không | Có | Control UI: Checkbox. Mặc định được tích chọn. |

###### 4.3.1.4.9.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Hủy             | Button       | Đóng popup, hủy thao tác.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2   | Lưu mật khẩu mới | Button | Kiểm tra dữ liệu mật khẩu mới. |
| | | | - TH1 (Bỏ trống bắt buộc): Nếu Mật khẩu mới hoặc Nhập lại mật khẩu mới bỏ trống, vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001]. |
| | | | - TH2 (Mật khẩu không hợp lệ): Nếu mật khẩu mới không tuân thủ quy tắc mật khẩu chung tại UC561, hiển thị [MSG-ERR-VAL-006]. |
| | | | - TH3 (Nhập lại mật khẩu không khớp): Nếu Nhập lại mật khẩu mới không trùng khớp với Mật khẩu mới, hiển thị [MSG-ERR-UC009-006]. |
| | | | - TH Hợp lệ:<br>+ Hệ thống mã hóa băm một chiều kết hợp Salt ngẫu nhiên và lưu mật khẩu mới.<br>+ Cập nhật cờ yêu cầu đổi mật khẩu theo lựa chọn trên popup.<br>+ Ghi nhận Audit Log thao tác đặt lại mật khẩu.<br>+ Hiển thị [MSG-SUC-UC009-006] và đóng popup.<br>+ Không gửi mật khẩu qua Email. |
| 3   | Ẩn/hiện mật khẩu | Icon | Khi click icon con mắt tại từng trường mật khẩu, hệ thống chuyển trạng thái hiển thị giữa che ký tự và hiện ký tự đã nhập. Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/lưu dữ liệu. |
