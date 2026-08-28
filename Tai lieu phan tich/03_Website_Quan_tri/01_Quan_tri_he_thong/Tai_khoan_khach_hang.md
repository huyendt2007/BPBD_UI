#### 4.3.1.4. Quản lý tài khoản Khách hàng

##### 4.3.1.4.1. Mục đích
Quản lý toàn diện hồ sơ tài khoản khách hàng (cá nhân, tổ chức và tài khoản phụ trực thuộc) trên hệ thống Đăng ký biện pháp bảo đảm, bao gồm:
- Tra cứu, tìm kiếm và lọc danh sách tài khoản khách hàng theo nhiều tiêu chí nghiệp vụ linh hoạt; hỗ trợ xem cấu trúc phân cấp tài khoản tổ chức (tài khoản chính và tài khoản phụ).
- Khởi tạo mới hồ sơ tài khoản khách hàng cá nhân, tổ chức kèm nguồn xác thực Nội bộ và phân quyền tương ứng.
- Hiệu chỉnh, cập nhật thông tin hồ sơ tài khoản khách hàng cá nhân và tổ chức theo đúng nguồn xác thực (Nội bộ / VNeID).
- Thực hiện khóa, mở khóa, đóng tài khoản và xóa tài khoản khách hàng theo quy định nghiệp vụ và phân quyền quản trị.
- Đặt lại mật khẩu đăng nhập cho các tài khoản sử dụng nguồn xác thực Nội bộ.
- Xem chi tiết toàn diện thông tin hồ sơ tài khoản, tài liệu đính kèm, cây phân quyền và chủ thể xác thực liên kết.
- Kết xuất danh sách tài khoản khách hàng ra tệp Excel phục vụ công tác quản lý và báo cáo.

a. Phân quyền
- Quản trị hệ thống (QTHT).

b. Điều kiện thực hiện
- Cán bộ quản trị đã đăng nhập thành công vào Website Quản trị.

---

##### 4.3.1.4.2. MH01 - Màn hình Tra cứu danh sách tài khoản khách hàng

###### 4.3.1.4.2.1. Màn hình

![Màn hình Tra cứu tài khoản khách hàng](../../images/UC009/UC009_01_MH01_Tra_cuu_tai_khoan_khach_hang.png)

###### 4.3.1.4.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Khối tiêu chí tra cứu và lọc dữ liệu tài khoản khách hàng. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo mã khách hàng của tài khoản chính. Đối với tài khoản phụ thuộc tổ chức, tài khoản phụ không có Mã khách hàng riêng. |
| Tên | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo tên cá nhân hoặc tên tổ chức. |
| Email | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo địa chỉ Email (Tên đăng nhập) đã đăng ký. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Tìm kiếm gần đúng theo số điện thoại liên hệ. |
| Trung tâm đăng ký | Enum(String(100)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08]. |
| Loại khách hàng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Cá nhân<br>+ Tổ chức |
| Loại tài khoản | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Tài khoản chính<br>+ Tài khoản phụ |
| Nguồn xác thực | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ<br>- Lọc chính xác theo (các) nguồn xác thực đang liên kết với hồ sơ tài khoản. |
| Phân loại khách hàng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Trong nước<br>+ Nước ngoài |
| Từ ngày | Date | Không | Ngày hiện tại trừ 3 tháng | Control UI: Datepicker.<br>- Lọc theo ngày tạo hồ sơ tài khoản, định dạng nhập `dd/mm/yyyy`.<br>- Mặc định là ngày đầu tiên của khoảng 3 tháng gần nhất tính đến ngày hiện tại.<br>- Rule so sánh khoảng ngày - **[BR-VAL-007]**. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo ngày tạo hồ sơ tài khoản, định dạng nhập `dd/mm/yyyy`.<br>- Mặc định là ngày hiện tại.<br>- Nếu Từ ngày lớn hơn Đến ngày, vi phạm **[BR-VAL-007]**, hiển thị **[MSG-ERR-VAL-007]**. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| **II. Bảng danh sách kết quả** | - | - | 50 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách tài khoản khách hàng chung.<br>- Sắp xếp mặc định theo Ngày tạo giảm dần.<br>- Hiển thị tổng số bản ghi phù hợp bộ lọc.<br>- Tùy chọn số bản ghi/trang: 50, 100, 200, mặc định 50.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng, in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số thứ tự tăng dần theo danh sách hiển thị. |
| Mã khách hàng | String(50) | - | - | Control UI: Text hiển thị (Read-only).<br>- Hiển thị Mã khách hàng của tài khoản chính. Đối với tài khoản phụ thuộc tổ chức, để trống vì tài khoản phụ không có Mã khách hàng riêng. |
| Tên | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Họ tên cá nhân, tên tổ chức hoặc họ tên tài khoản phụ. Tài khoản phụ hiển thị thụt cấp ngay dưới tài khoản chính. |
| Email | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ email đăng ký (Tên đăng nhập). |
| Số điện thoại | String(20) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số điện thoại liên hệ. |
| Trung tâm đăng ký | String(100) | - | - | Control UI: Text hiển thị (Read-only).<br>- Hiển thị Tên viết tắt của Trung tâm đăng ký mặc định theo Danh mục dùng chung [DM_08]. |
| Loại khách hàng | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Cá nhân<br>+ Tổ chức<br>- Tài khoản phụ thuộc tổ chức hiển thị là Tổ chức. |
| Loại tài khoản | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Tài khoản chính<br>+ Tài khoản phụ<br>- Khách hàng cá nhân luôn là Tài khoản chính. |
| Nguồn xác thực | String(100) | - | - | Control UI: Badge/Tag hiển thị (Read-only).<br>Gồm:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Phân loại khách hàng | Enum(String(50)) | - | - | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Trong nước<br>+ Nước ngoài |
| Ngày tạo | DateTime | - | - | Control UI: Text hiển thị (Read-only).<br>- Hiển thị ngày tạo theo định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Thao tác | String(255) | - | - | Control UI: Nhóm nút/icon thao tác.<br>- **Điều kiện hiển thị từng nút**:<br>+ **Đặt lại mật khẩu**: Chỉ hiển thị khi hồ sơ có nguồn xác thực `Nội bộ` (hoặc `VNeID, Nội bộ`) VÀ trạng thái là `Đang hoạt động`.<br>+ **Cập nhật**: Chỉ hiển thị khi trạng thái là `Đang hoạt động`.<br>+ **Khóa / Mở khóa**: Chỉ hiển thị khi trạng thái là `Đang hoạt động` (icon Khóa) hoặc `Bị khóa` (icon Mở khóa).<br>+ **Đóng**: Chỉ hiển thị khi trạng thái là `Đang hoạt động` hoặc `Bị khóa`.<br>+ **Xóa**: Chỉ hiển thị khi người dùng được phân quyền.<br>- **Quy tắc làm mờ**: Với các thao tác không được phép thực hiện, hiển thị dạng khóa mờ không cho phép thao tác.<br>- **Xem chi tiết**: Thực hiện bằng sự kiện click trực tiếp vào dòng dữ liệu (Row-Click). |

###### 4.3.1.4.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | **TH1 (Tìm kiếm không hợp lệ)**: Nhập ngày sai định dạng `dd/mm/yyyy` hoặc Từ ngày lớn hơn Đến ngày. Vi phạm **[BR-VAL-007]**, hệ thống chặn tìm kiếm, cảnh báo đỏ viền ô nhập lỗi đầu tiên, hiển thị thông báo lỗi **[MSG-ERR-VAL-007]** ngay phía dưới ô nhập và tự động focus con trỏ vào ô lỗi đó. |
| | | | **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng, in nghiêng với nội dung theo MessageList dùng chung **[MSG-INF-SYS-001]**.<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel": Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| | | | **TH3 (Có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị danh sách các bản ghi thỏa mãn điều kiện lọc theo đúng cấu trúc các cột quy định, sắp xếp mặc định theo Ngày tạo giảm dần.<br>+ Thanh phân trang: Hiển thị thông tin phân trang thực tế (ví dụ: *"Hiển thị 1-10 của 25 bản ghi"*), kích hoạt khả dụng các nút điều hướng trang tương ứng theo số lượng trang.<br>+ Nút "Kết xuất Excel": Thiết lập ở trạng thái khả dụng (Enabled) cho phép người dùng click để xuất dữ liệu. |
| 2 | Xóa bộ lọc | Button/Link | Đặt lại toàn bộ tiêu chí Bộ lọc tìm kiếm về giá trị mặc định (Từ ngày trở về ngày hiện tại trừ 3 tháng, Đến ngày trở về ngày hiện tại, các ô nhập về trống, combobox về Tất cả) và tải lại danh sách kết quả. |
| 3 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới tài khoản khách hàng** ở chế độ thêm mới. |
| 4 | Đặt lại mật khẩu | Icon | Khi click, hệ thống mở **MH09 - Popup Đặt lại mật khẩu** để cán bộ quản trị nhập mật khẩu mới cho nguồn xác thực Nội bộ của tài khoản. |
| 5 | Cập nhật | Icon | Khi click, hệ thống mở **MH03 - Popup Chỉnh sửa tài khoản khách hàng** tương ứng theo Loại khách hàng (Cá nhân hoặc Tổ chức) của bản ghi được chọn. |
| 6 | Khóa / Mở khóa | Icon | - Nếu trạng thái bản ghi là `Đang hoạt động`: Click mở **MH05 - Popup Xác nhận Khóa tài khoản khách hàng** để thực hiện tạm khóa tài khoản (nếu khóa tài khoản chính tổ chức thì tự động khóa toàn bộ tài khoản phụ trực thuộc).<br>- Nếu trạng thái bản ghi là `Bị khóa`: Click mở **MH06 - Popup Xác nhận Mở khóa tài khoản khách hàng** để khôi phục trạng thái hoạt động cho tài khoản. |
| 7 | Đóng | Icon | Khi click, hệ thống mở **MH04 - Popup Xác nhận Đóng/Xóa tài khoản khách hàng** với loại thao tác là `Đóng` để xác nhận đóng vĩnh viễn tài khoản khách hàng (nếu đóng tài khoản chính tổ chức thì tự động đóng toàn bộ tài khoản phụ trực thuộc). |
| 8 | Xóa | Icon | - Khi click, hệ thống mở **MH04 - Popup Xác nhận Đóng/Xóa tài khoản khách hàng** với loại thao tác là `Xóa` kèm thông điệp cảnh báo [MSG-CFM-SYS-001].<br>- Khi người dùng xác nhận Đồng ý: Hệ thống thực hiện xóa cứng tài khoản khách hàng và toàn bộ thông tin có liên quan, hiển thị thông báo thành công [MSG-SUC-SYS-004] và làm mới danh sách kết quả. |
| 9 | Kết xuất Excel | Button | Nút kết xuất danh sách hiện tại ra tệp Excel (.xlsx) theo bộ lọc hiện hành. Chi tiết tại **MH07 - Kết xuất Excel**. |
| 10 | Click dòng dữ liệu (Row-click) | Row Click | Khi click vào bất kỳ dòng dữ liệu nào trên lưới (ngoại trừ click trực tiếp vào icon tại cột Thao tác), hệ thống mở **MH08 - Popup Xem chi tiết tài khoản khách hàng** tương ứng theo Loại khách hàng và Loại tài khoản của dòng được chọn. |

---

##### 4.3.1.4.3. MH02 - Popup Thêm mới tài khoản khách hàng

###### 4.3.1.4.3.1. Màn hình

![Màn hình Thêm mới tài khoản khách hàng](../../images/UC009/UC009_02_MH01_Them_moi_tai_khoan_khach_hang.png)

###### 4.3.1.4.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối thông tin chung đầu form** | - | - | - | Khối luôn hiển thị cho cả Khách hàng Cá nhân và Khách hàng Tổ chức ở đầu form. |
| Loại tài khoản | Enum(String(50)) | Có | Cá nhân | Control UI: Combobox.<br>Gồm:<br>+ Cá nhân<br>+ Tổ chức<br>- Dùng để chuyển đổi giữa form Khách hàng Cá nhân và Khách hàng Tổ chức. |
| **II. Khối thông tin Khách hàng Cá nhân** | - | - | - | Chỉ hiển thị khi `Loại tài khoản = Cá nhân` (giao diện là form nhập liệu đơn, không chia Tab). |
| Loại khách hàng | Enum(String(50)) | Có | Cá nhân | Control UI: Text hiển thị (Read-only).<br>- Tự động hiển thị `Cá nhân` theo Loại tài khoản đã chọn. |
| Email (Tên đăng nhập) | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Địa chỉ email đăng ký, đồng thời là Tên đăng nhập của tài khoản Nội bộ.<br>- Ràng buộc định dạng email chuẩn - **[BR-VAL-002]**.<br>- Kiểm tra tính duy nhất trên toàn hệ thống - **[BR-VAL-009]**. |
| Nguồn xác thực | Enum(String(50)) | Có | Nội bộ | Control UI: Text hiển thị (Read-only).<br>- Hồ sơ tạo thủ công từ Admin luôn khởi tạo nguồn xác thực Nội bộ. |
| Loại giấy tờ | Enum(String(50)) | Có | Căn cước công dân | Control UI: Combobox.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10]. |
| Số giấy tờ | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Số giấy tờ pháp lý của cá nhân. Ràng buộc tính duy nhất theo Loại giấy tờ trên toàn hệ thống - **[BR-VAL-009]**. |
| Họ và tên | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Họ và tên đầy đủ của khách hàng cá nhân. Tự động chuyển thành chữ in hoa và loại bỏ khoảng trắng thừa đầu cuối. |
| Ngày sinh | Date | Không | Trống | Control UI: Datepicker.<br>- Định dạng `dd/mm/yyyy`. Phải nhỏ hơn ngày hiện tại. |
| Giới tính | Enum(String(50)) | Không | Trống | Control UI: Combobox.<br>Gồm:<br>+ Nam<br>+ Nữ<br>+ Khác |
| Quốc tịch | Enum(String(50)) | Có | Việt Nam | Control UI: Combobox.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Tham chiếu Danh mục Quốc gia [DM_09]. Khi chọn Việt Nam, trường Phân loại khách hàng mặc định là `Trong nước`; khi chọn quốc tịch khác Việt Nam, Phân loại khách hàng mặc định là `Nước ngoài`. |
| Phân loại khách hàng | Enum(String(50)) | Có | Trong nước | Control UI: Combobox.<br>Gồm:<br>+ Trong nước<br>+ Nước ngoài<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Tự động gợi ý theo Quốc tịch đã chọn. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Số nhà, tên đường/phố, thôn/xóm/ấp... |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Số điện thoại liên hệ.<br>- Ràng buộc định dạng chuẩn số điện thoại - **[BR-VAL-003]**.<br>- Kiểm tra tính duy nhất trên toàn hệ thống - **[BR-VAL-009]**. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo đơn vị quản trị | Control UI: Combobox.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Hiển thị **Tên đầy đủ** của Trung tâm giao dịch bảo đảm theo Danh mục [DM_08]. |
| Nhóm người dùng | List(Enum(String(50))) | Không* | Trống | Control UI: Ô tìm kiếm + danh sách checkbox.<br>- Cho phép tích chọn một hoặc nhiều Nhóm người dùng áp dụng cho Khách hàng. Cây phân quyền tự động cập nhật hiển thị quyền tương ứng. |
| Vai trò | List(Enum(String(50))) | Không* | Trống | Control UI: Ô tìm kiếm + danh sách checkbox.<br>- Cho phép tích chọn một hoặc nhiều Vai trò áp dụng cho Khách hàng. Cây phân quyền tự động cập nhật hiển thị quyền tương ứng. |
| Cây phân quyền | Boolean | - | Theo Nhóm/Vai trò | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>- Hiển thị quyền chức năng cộng dồn theo Nhóm người dùng và vai trò đã tích chọn. |
| Tài liệu đính kèm | Danh sách file | Không | Trống | Control UI: Bảng nhập nhiều dòng.<br>- Cho phép đính kèm tệp tin tài liệu liên quan. Sau khi tải lên, hiển thị tên file kèm liên kết Xem file và Xóa file. |
| **III. Khối thông tin Khách hàng Tổ chức** | - | - | - | Chỉ hiển thị khi `Loại tài khoản = Tổ chức`. Giao diện tự động phân tách thành **02 Tab riêng biệt**: **Tab Thông tin chung** và **Tab Tài khoản phụ trực thuộc**. |
| **III.1. Tab Thông tin chung** | - | - | - | Hiển thị các trường thông tin của Tài khoản chính Tổ chức (khi đang chọn `Tab Thông tin chung`). |
| Loại khách hàng | Enum(String(50)) | Có | Tổ chức | Control UI: Text hiển thị (Read-only).<br>- Tự động hiển thị `Tổ chức`. |
| Loại tổ chức | Enum(String(100)) | Có | Tổ chức có ĐKKD trong nước | Control UI: Combobox.<br>Gồm:<br>+ Tổ chức có đăng ký kinh doanh trong nước<br>+ Tổ chức nước ngoài<br>- Bắt buộc nhập - **[BR-VAL-001]**. |
| Mã định danh tổ chức | String(255) | Có khi Loại tổ chức là Trong nước | Trống | Control UI: Input text.<br>- Chỉ hiển thị và bắt buộc nhập khi `Loại tổ chức = Tổ chức có đăng ký kinh doanh trong nước` - **[BR-VAL-001]**.<br>- Ràng buộc tính duy nhất trên toàn hệ thống - **[BR-VAL-009]**. |
| Mã số thuế/Số giấy phép đầu tư | String(255) | Có khi Loại tổ chức là Nước ngoài | Trống | Control UI: Input text.<br>- Chỉ hiển thị và bắt buộc nhập khi `Loại tổ chức = Tổ chức nước ngoài` - **[BR-VAL-001]**.<br>- Ràng buộc tính duy nhất trên toàn hệ thống - **[BR-VAL-009]**. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Loại tổ chức | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Trong nước (nếu Loại tổ chức Trong nước)<br>+ Nước ngoài (nếu Loại tổ chức Nước ngoài) |
| Tên tổ chức | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Tên đầy đủ của Tổ chức. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Địa chỉ email tổ chức (Tên đăng nhập tài khoản chính).<br>- Ràng buộc định dạng chuẩn - **[BR-VAL-002]**.<br>- Kiểm tra tính duy nhất trên toàn hệ thống - **[BR-VAL-009]**. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Số điện thoại liên hệ của tổ chức.<br>- Ràng buộc định dạng theo Quốc gia - **[BR-VAL-003]**.<br>- Kiểm tra tính duy nhất trên toàn hệ thống - **[BR-VAL-009]**. |
| Nguồn xác thực | Enum(String(50)) | Có | Nội bộ | Control UI: Text hiển thị (Read-only).<br>- Luôn là Nội bộ khi tạo từ Admin. |
| Quốc gia | Enum(String(50)) | Có | Việt Nam | Control UI: Combobox.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Tham chiếu Danh mục Quốc gia [DM_09]. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Địa chỉ trụ sở tổ chức. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo đơn vị quản trị | Control UI: Combobox.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Hiển thị **Tên đầy đủ** của Trung tâm giao dịch bảo đảm theo Danh mục [DM_08]. |
| Họ và tên người đại diện | String(255) | Không | Trống | Control UI: Input text.<br>- Họ tên người đại diện theo pháp luật của tổ chức. |
| Loại giấy tờ người đại diện | Enum(String(50)) | Không | Căn cước công dân | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ người đại diện | String(50) | Không | Trống | Control UI: Input text.<br>- Số giấy tờ pháp lý của người đại diện. |
| Nhóm người dùng | List(Enum(String(50))) | Không* | Trống | Control UI: Ô tìm kiếm + checkbox chọn Nhóm người dùng. |
| Vai trò | List(Enum(String(50))) | Không* | Trống | Control UI: Ô tìm kiếm + checkbox chọn Vai trò. |
| Cây phân quyền cộng dồn | Boolean | - | Theo Nhóm/Vai trò | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>- Hiển thị quyền chức năng cộng dồn theo Nhóm người dùng và vai trò đã tích chọn. |
| Tài liệu đính kèm | Danh sách file | Không | Trống | Control UI: Bảng đính kèm tệp tin, cho phép Xem file và Xóa file. |
| **III.2. Tab Tài khoản phụ trực thuộc** | - | - | - | Hiển thị chức năng tạo lập và quản lý các Tài khoản phụ / Nhân viên trực thuộc Tổ chức (khi đang chọn `Tab Tài khoản phụ trực thuộc`). |
| Tìm kiếm nhanh | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm nhanh trên lưới tạm theo Tên, Email, Số giấy tờ. |
| Nút Thêm tài khoản phụ | - | - | - | Control UI: Nút bấm.<br>- Mở form nhập thông tin tài khoản phụ phía dưới lưới. |
| **III.2.1. Lưới danh sách tài khoản phụ tạm thời** | - | - | - | Lưới tạm lưu danh sách tài khoản phụ chuẩn bị tạo cùng tổ chức (chưa ghi CSDL cho đến khi bấm Lưu & Cấp tài khoản ở form chính). |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số thứ tự tăng dần của tài khoản phụ trên lưới tạm. |
| Tên | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Họ tên tài khoản phụ trực thuộc tổ chức. |
| Số giấy tờ | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số giấy tờ cá nhân của tài khoản phụ. |
| Email | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Email đồng thời là Tên đăng nhập của tài khoản phụ. |
| Địa chỉ chi tiết | String(500) | - | - | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ chi tiết của tài khoản phụ. |
| Trạng thái | Enum(String(50)) | - | Đang hoạt động | Control UI: Badge/Tag hiển thị.<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Thao tác | String(255) | - | - | Control UI: Nhóm icon thao tác trên lưới tạm.<br>- "Sửa": Luôn hiển thị cho phép tải dữ liệu dòng tài khoản phụ lên form để chỉnh sửa lại thông tin.<br>- "Xóa": Luôn hiển thị cho phép gỡ bỏ dòng tài khoản phụ khỏi danh sách tạm. |
| **III.2.2. Form Nhập/Chỉnh sửa thông tin tài khoản phụ** | - | - | - | Khối nhập liệu chi tiết tài khoản phụ (hiển thị khi bấm nút "Thêm tài khoản phụ" hoặc click icon "Sửa" trên lưới tạm). |
| Tên khách hàng | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Họ tên tài khoản phụ trực thuộc tổ chức. |
| Email (Tên đăng nhập) | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Email đồng thời là Tên đăng nhập của tài khoản phụ.<br>- Ràng buộc định dạng chuẩn - **[BR-VAL-002]**.<br>- Kiểm tra tính duy nhất trên toàn hệ thống và trong lưới tạm - **[BR-VAL-009]** / **[BR-VAL-010]**. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text.<br>- Số điện thoại liên hệ của tài khoản phụ.<br>- Ràng buộc định dạng theo Quốc gia - **[BR-VAL-003]**.<br>- Kiểm tra tính duy nhất trên toàn hệ thống - **[BR-VAL-009]**. |
| Đơn vị | String(255) | Không | Trống | Control UI: Input text.<br>- Thông tin phòng ban/chi nhánh của tài khoản phụ trong tổ chức. |
| Loại giấy tờ | Enum(String(50)) | Có | Căn cước công dân | Control UI: Combobox.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Tham chiếu Danh mục Loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(255) | Có | Trống | Control UI: Input text.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Số giấy tờ cá nhân. Kiểm tra trùng lặp trên lưới tạm và toàn hệ thống - **[BR-VAL-009]** / **[BR-VAL-010]**. |
| Quốc gia | Enum(String(50)) | Có | Theo Quốc gia Tổ chức | Control UI: Combobox.<br>- Bắt buộc nhập - **[BR-VAL-001]**.<br>- Tham chiếu Danh mục Quốc gia [DM_09]. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text.<br>- Địa chỉ chi tiết của tài khoản phụ. |
| Loại tài khoản | Enum(String(50)) | Có | Tài khoản phụ | Control UI: Text hiển thị (Read-only).<br>- Cố định là `Tài khoản phụ`. |
| Nguồn xác thực | Enum(String(50)) | Có | Nội bộ | Control UI: Text hiển thị (Read-only).<br>- Cố định là `Nội bộ`. |
| Nhóm người dùng | List(Enum(String(50))) | Không* | Trống | Control UI: Ô tìm kiếm + checkbox chọn Nhóm người dùng cho tài khoản phụ. |
| Vai trò | List(Enum(String(50))) | Không* | Trống | Control UI: Ô tìm kiếm + checkbox chọn Vai trò cho tài khoản phụ. |
| Cây phân quyền cộng dồn | Boolean | - | Theo Nhóm/Vai trò | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>- Hiển thị quyền chức năng cộng dồn theo Nhóm người dùng và vai trò đã tích chọn. |

*Ghi chú*: (*): Bắt buộc phải chọn ít nhất một trong hai trường: Nhóm người dùng hoặc Vai trò.

###### 4.3.1.4.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu dữ liệu đã nhập. |
| 2 | Thêm tài khoản phụ | Button | Mở form nhập liệu tài khoản phụ trực thuộc phía dưới lưới tạm. |
| 3 | Lưu tài khoản phụ | Button | Kiểm tra tính hợp lệ và tính duy nhất của Email, Số giấy tờ của tài khoản phụ.<br>- Nếu hợp lệ: Đưa thông tin tài khoản phụ vào danh sách tạm trên màn hình (chưa ghi CSDL).<br>- Nếu không hợp lệ: Hiển thị thông báo lỗi tương ứng. |
| 4 | Sửa | Icon | Tải dữ liệu dòng tài khoản phụ tương ứng lên form chỉnh sửa phía dưới lưới tạm. |
| 5 | Xóa | Icon | Mở [POPUP-CFM-001] xác nhận gỡ tài khoản phụ. Khi chọn "Đồng ý", xóa dòng tài khoản phụ khỏi lưới tạm. |
| 6 | Lưu & Cấp tài khoản | Button | **TH1 (Bỏ trống trường bắt buộc)**: Cảnh báo đỏ viền ô lỗi đầu tiên, hiển thị thông báo [MSG-ERR-VAL-001] và tự động focus con trỏ vào ô lỗi. |
|  |  |  | **TH2 (Sai định dạng Email / Số điện thoại)**: Hiển thị thông báo lỗi định dạng tương ứng ([MSG-ERR-VAL-002] / [MSG-ERR-VAL-003]). |
|  |  |  | **TH3 (Trùng lặp dữ liệu Email / Số giấy tờ / Mã định danh)**: Hiển thị thông báo [MSG-ERR-VAL-009]. |
|  |  |  | **TH Hợp lệ**: Khởi tạo hồ sơ tài khoản chính (Cá nhân hoặc Tổ chức) và các tài khoản phụ (nếu có) vào CSDL, tự sinh Mã khách hàng, tạo mật khẩu ngẫu nhiên gửi email kích hoạt, ghi Audit Log và thông báo thành công [MSG-SUC-UC009-001], đóng form và làm mới danh sách tại MH01. |

---

##### 4.3.1.4.4. MH03 - Popup Chỉnh sửa tài khoản khách hàng

###### 4.3.1.4.4.1. Màn hình

![Màn hình Chỉnh sửa tài khoản khách hàng Cá nhân](../../images/UC009/UC009_03_UC1_Sua_tai_khoan_khach_hang_ca_nhan.png)
![Màn hình Chỉnh sửa tài khoản khách hàng Tổ chức](../../images/UC009/UC009_03_UC2_Sua_tai_khoan_khach_hang_to_chuc.png)

###### 4.3.1.4.4.2. Mô tả thông tin trên màn hình

Giao diện và các trường thông tin kế thừa hoàn toàn từ **MH02 - Popup Thêm mới tài khoản khách hàng**, với các quy tắc áp dụng riêng cho chế độ Cập nhật như sau:

- **1. Quy tắc chung khi Cập nhật**:
  - Các trường `Loại tài khoản`, `Loại khách hàng`, `Email (Tên đăng nhập)` luôn ở chế độ **Chỉ đọc (Read-only)**, không cho phép thay đổi.
- **2. Phân tách theo Nguồn xác thực**:
  - **Nếu Nguồn xác thực chứa `VNeID`**: Khóa chỉ đọc (Read-only) toàn bộ các trường định danh cá nhân / tổ chức (`Loại giấy tờ`, `Số giấy tờ`, `Họ và tên`, `Ngày sinh`, `Giới tính`, `Quốc tịch`, `Mã định danh/MST`, `Tên tổ chức`, `Người đại diện`). Chỉ cho phép cập nhật các trường liên hệ (`Số điện thoại`, `Địa chỉ chi tiết`, `Tỉnh/Thành phố`, `Phường/Xã`), `Trung tâm Đăng ký mặc định`, `Nhóm người dùng`, `Vai trò`, `Tài liệu đính kèm`.
  - **Nếu Nguồn xác thực là `Nội bộ`**: Cho phép cập nhật tất cả các trường thông tin theo phân quyền quản trị (ngoại trừ `Email / Tên đăng nhập`, `Loại tài khoản`).
- **3. Đối với Tài khoản phụ trực thuộc (Tab Thông tin tài khoản phụ của Tổ chức)**:
  - Khi chỉnh sửa tài khoản phụ: Trường `Email (Tên đăng nhập)` và `Số giấy tờ` ở chế độ **Chỉ đọc (Read-only)**.
  - Lưới danh sách tài khoản phụ hiển thị dữ liệu thực tế và cho phép Thêm mới, Sửa, Khóa/Mở khóa, Xóa tài khoản phụ.

###### 4.3.1.4.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng Popup Modal, không lưu trữ thay đổi. |
| 2 | Đặt lại mật khẩu | Button | Chỉ hiển thị khi hồ sơ có nguồn xác thực `Nội bộ`. Mở **MH09 - Popup Đặt lại mật khẩu** tại mục 4.3.1.4.10 trong tài liệu này. |
| 3 | Thêm tài khoản phụ | Button | Mở form nhập liệu thêm tài khoản phụ mới cho tổ chức. |
| 4 | Lưu tài khoản phụ | Button | Kiểm tra tính hợp lệ của tài khoản phụ và đưa vào danh sách cập nhật. |
| 5 | Sửa | Icon | Tải dữ liệu tài khoản phụ tương ứng lên form để chỉnh sửa. |
| 6 | Khóa | Icon | Chỉ hiển thị khi tài khoản phụ ở trạng thái "Đang hoạt động". Mở popup xác nhận khóa tài khoản phụ. |
| 7 | Mở khóa | Icon | Chỉ hiển thị khi tài khoản phụ ở trạng thái "Bị khóa". Mở popup xác nhận mở khóa tài khoản phụ. |
| 8 | Xóa | Icon | Chỉ hiển thị khi được phân quyền xóa. Mở popup xác nhận xóa tài khoản phụ. |
| 9 | Lưu cập nhật | Button | **TH1 (Lỗi nhập liệu hoặc Trùng lặp dữ liệu)**: Cảnh báo đỏ viền ô lỗi đầu tiên và hiển thị thông báo lỗi tương ứng ([MSG-ERR-VAL-001], [MSG-ERR-VAL-002], [MSG-ERR-VAL-003], [MSG-ERR-VAL-009]). |
|  |  |  | **TH Hợp lệ**: Cập nhật thông tin hồ sơ tài khoản và các tài khoản phụ vào CSDL, gửi Email thông tin đăng nhập đối với tài khoản phụ được tạo mới, ghi nhận lịch sử Audit Log, hiển thị thông báo cập nhật thành công [MSG-SUC-UC009-001], đóng form và làm mới danh sách tại MH01. |

---

##### 4.3.1.4.5. MH04 - Popup Xác nhận Đóng/Xóa tài khoản khách hàng

###### 4.3.1.4.5.1. Màn hình

![Popup Xác nhận Đóng/Xóa tài khoản khách hàng](../../images/UC009/UC009_04_MH01_Popup_xac_nhan_dong_xoa_tai_khoan_khach_hang.png)

###### 4.3.1.4.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Loại thao tác | Enum(String(50)) | - | Theo thao tác chọn | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Đóng<br>+ Xóa |
| Thông tin tài khoản | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Gồm: Tên khách hàng/Tên tổ chức, Email (Tên đăng nhập), Loại tài khoản. |
| Thông báo cảnh báo | String(500) | - | Theo Loại thao tác | Control UI: Text hiển thị (Read-only).<br>- Nếu Loại thao tác = Đóng: Hiển thị nội dung cảnh báo đóng tài khoản [MSG-CFM-UC009-001].<br>- Nếu Loại thao tác = Xóa: Hiển thị nội dung cảnh báo xóa tài khoản [MSG-CFM-UC009-002].<br>- Đối với tài khoản phụ, bổ sung thông tin Tổ chức chủ quản. |

###### 4.3.1.4.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác và giữ nguyên trạng thái tài khoản. |
| 2 | Đồng ý | Button | Thực hiện xử lý theo Loại thao tác đã chọn:<br>- **TH1 (Loại thao tác = Đóng)**:<br>+ Chuyển trạng thái hồ sơ tài khoản thành `Đóng`.<br>+ Thu hồi quyền đăng nhập của toàn bộ nguồn xác thực đang liên kết (VNeID và Nội bộ).<br>+ Nếu là tài khoản chính tổ chức: Tự động đóng toàn bộ tài khoản phụ trực thuộc.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-002], đóng popup và làm mới danh sách kết quả.<br>- **TH2 (Loại thao tác = Xóa)**:<br>+ Thực hiện xóa cứng tài khoản khách hàng và toàn bộ thông tin có liên quan khỏi hệ thống.<br>+ Xóa toàn bộ nguồn xác thực, phân quyền, token phiên đăng nhập và dữ liệu cấu hình liên quan.<br>+ Ghi nhận Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-SYS-004], đóng popup và làm mới danh sách kết quả. |

---

##### 4.3.1.4.6. MH05 - Popup Xác nhận Khóa tài khoản khách hàng

###### 4.3.1.4.6.1. Màn hình

![Màn hình Xác nhận Khóa tài khoản khách hàng](../../images/UC009/UC009_05_MH01_Xac_nhan_khoa_tai_khoan_khach_hang.png)

###### 4.3.1.4.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Loại thao tác | Enum(String(50)) | - | Khóa | Control UI: Text hiển thị (Read-only).<br>- Cố định là `Khóa`. |
| Thông tin tài khoản | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Gồm: Tên khách hàng/Tên tổ chức, Email (Tên đăng nhập), Loại tài khoản. |
| Thông báo cảnh báo | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị nội dung xác nhận tạm khóa tài khoản [MSG-CFM-UC009-003]. |

###### 4.3.1.4.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác và giữ nguyên trạng thái tài khoản. |
| 2 | Đồng ý | Button | Thực hiện xử lý khóa tài khoản khách hàng:<br>+ Chuyển trạng thái hồ sơ tài khoản thành `Bị khóa`.<br>+ Thu hồi quyền đăng nhập của toàn bộ nguồn xác thực đang liên kết (VNeID và Nội bộ).<br>+ Nếu là tài khoản chính tổ chức: Tự động khóa toàn bộ tài khoản phụ trực thuộc.<br>+ Ghi nhận lịch sử Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-004], đóng popup và làm mới danh sách kết quả tại MH01. |

---

##### 4.3.1.4.7. MH06 - Popup Xác nhận Mở khóa tài khoản khách hàng

###### 4.3.1.4.7.1. Màn hình

![Màn hình Xác nhận Mở khóa tài khoản khách hàng](../../images/UC009/UC009_06_MH01_Xac_nhan_mo_khoa_tai_khoan_khach_hang.png)

###### 4.3.1.4.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Loại thao tác | Enum(String(50)) | - | Mở khóa | Control UI: Text hiển thị (Read-only).<br>- Cố định là `Mở khóa`. |
| Thông tin tài khoản | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Gồm: Tên khách hàng/Tên tổ chức, Email (Tên đăng nhập), Loại tài khoản. |
| Thông báo cảnh báo | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Hiển thị nội dung xác nhận mở khóa tài khoản [MSG-CFM-UC009-004]. |

###### 4.3.1.4.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác và giữ nguyên trạng thái tài khoản. |
| 2 | Đồng ý | Button | Thực hiện xử lý mở khóa tài khoản khách hàng:<br>+ Chuyển trạng thái hồ sơ tài khoản thành `Đang hoạt động`.<br>+ Khôi phục quyền đăng nhập cho các nguồn xác thực đang liên kết (VNeID và Nội bộ).<br>+ Ghi nhận lịch sử Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-005], đóng popup và làm mới danh sách kết quả tại MH01. |

---

##### 4.3.1.4.8. MH07 - Kết xuất Excel

###### 4.3.1.4.8.1. Màn hình

![Màn hình Kết xuất Excel](../../images/UC009/UC009_07_MH01_Ket_xuat_excel.png)

###### 4.3.1.4.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Danh sách dữ liệu xuất | File (.xlsx) | - | - | Toàn bộ các trường thông tin hiển thị trên Bảng danh sách kết quả thỏa mãn điều kiện lọc hiện hành, định dạng file chuẩn Excel (.xlsx). |

###### 4.3.1.4.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Kết xuất Excel | Button | Kiểm tra dữ liệu và xuất file:<br>- TH1 (Không có dữ liệu): Hệ thống hiển thị cảnh báo không có dữ liệu để kết xuất [MSG-WRN-SYS-001].<br>- TH Hợp lệ: Hệ thống kết xuất toàn bộ dữ liệu tài khoản khách hàng theo đúng bộ lọc hiện tại ra tệp Excel (.xlsx) và tự động tải về máy tính người dùng. |

---

##### 4.3.1.4.9. MH08 - Popup Xem chi tiết tài khoản khách hàng

###### 4.3.1.4.9.1. Màn hình

![Màn hình Xem chi tiết tài khoản khách hàng Cá nhân](../../images/UC009/UC009_08_UC1_Xem_chi_tiet_tai_khoan_khach_hang_ca_nhan.png)
![Màn hình Xem chi tiết tài khoản khách hàng Tổ chức](../../images/UC009/UC009_08_UC2_Xem_chi_tiet_tai_khoan_khach_hang_to_chuc.png)
![Màn hình Xem chi tiết tài khoản phụ trực thuộc](../../images/UC009/UC009_08_UC2_Xem_chi_tiet_tai_khoan_phu_truc_thuoc.png)

###### 4.3.1.4.9.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối thông tin chung** | - | - | - | Khối luôn hiển thị cho cả Khách hàng Cá nhân và Khách hàng Tổ chức ở đầu form. Toàn bộ thông tin ở chế độ Chỉ đọc (Read-only) theo hồ sơ tài khoản. |
| Loại khách hàng | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Cá nhân<br>+ Tổ chức |
| Loại tài khoản | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Tài khoản chính<br>+ Tài khoản phụ |
| Mã khách hàng | String(50) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Hiển thị Mã khách hàng của tài khoản chính (để trống đối với tài khoản phụ). |
| Nguồn xác thực | Enum(String(50)) | - | Theo hồ sơ | Control UI: Badge/Tag hiển thị (Read-only).<br>Gồm:<br>+ VNeID<br>+ Nội bộ<br>+ VNeID, Nội bộ |
| Trạng thái | Enum(String(50)) | - | Theo hồ sơ | Control UI: Badge/Tag hiển thị (Read-only).<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Ngày tạo | DateTime | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| **II. Khối thông tin Khách hàng Cá nhân** | - | - | - | Chỉ hiển thị khi `Loại tài khoản = Cá nhân`. Toàn bộ thông tin ở chế độ Chỉ đọc (Read-only). |
| Họ và tên | String(255) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Họ và tên đầy đủ của khách hàng cá nhân. |
| Loại giấy tờ | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10]. |
| Số giấy tờ | String(255) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Số giấy tờ pháp lý của cá nhân. |
| Ngày sinh | Date | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Định dạng `dd/mm/yyyy`. |
| Giới tính | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Nam<br>+ Nữ<br>+ Khác |
| Quốc tịch | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Quốc gia [DM_09]. |
| Phân loại khách hàng | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Trong nước<br>+ Nước ngoài |
| Tỉnh/Thành phố | String(100) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tên Tỉnh/Thành phố theo hồ sơ. |
| Phường/Xã | String(100) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tên Phường/Xã theo hồ sơ. |
| Địa chỉ chi tiết | String(500) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ chi tiết cư trú/liên hệ. |
| Email (Tên đăng nhập) | String(255) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ email đăng ký (Tên đăng nhập). |
| Số điện thoại | String(20) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Số điện thoại liên hệ. |
| Trung tâm Đăng ký mặc định | String(100) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Hiển thị **Tên đầy đủ** của Trung tâm giao dịch bảo đảm theo Danh mục [DM_08]. |
| Nhóm người dùng | List(String) | - | Theo hồ sơ | Control UI: Chip danh sách (Read-only).<br>- Danh sách các Nhóm người dùng đã gán cho tài khoản. |
| Vai trò | List(String) | - | Theo hồ sơ | Control UI: Chip danh sách (Read-only).<br>- Danh sách các Vai trò đã gán cho tài khoản. |
| Cây phân quyền | Boolean | - | Theo hồ sơ | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>- Hiển thị quyền chức năng cộng dồn theo Nhóm người dùng và vai trò đã tích chọn. |
| Tài liệu đính kèm | Danh sách file | - | Theo hồ sơ | Control UI: Danh sách file đính kèm (Read-only).<br>- Hiển thị tên file kèm liên kết `Xem file` (mở file trong 1 tab mới trên trình duyệt). |
| **III. Khối thông tin Khách hàng Tổ chức** | - | - | - | Chỉ hiển thị khi `Loại tài khoản = Tổ chức`. Giao diện tự động phân tách thành **02 Tab riêng biệt**: **Tab Thông tin chung** và **Tab Tài khoản phụ trực thuộc**. |
| **III.1. Tab Thông tin chung** | - | - | - | Hiển thị các trường thông tin của Tài khoản chính Tổ chức (khi đang chọn `Tab Thông tin chung`). Toàn bộ thông tin ở chế độ Chỉ đọc (Read-only). |
| Tên tổ chức | String(255) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tên đầy đủ của Tổ chức. |
| Loại tổ chức | Enum(String(100)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Tổ chức có đăng ký kinh doanh trong nước<br>+ Tổ chức nước ngoài |
| Mã định danh / Mã số thuế | String(255) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Mã định danh hoặc Mã số thuế/Số giấy phép đầu tư của tổ chức. |
| Phân loại khách hàng | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>Gồm:<br>+ Trong nước<br>+ Nước ngoài |
| Quốc gia | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Quốc gia [DM_09]. |
| Tỉnh/Thành phố | String(100) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tên Tỉnh/Thành phố trụ sở tổ chức. |
| Phường/Xã | String(100) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tên Phường/Xã trụ sở tổ chức. |
| Địa chỉ chi tiết | String(500) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ trụ sở tổ chức. |
| Email tổ chức (Tên đăng nhập) | String(255) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ email tổ chức (Tên đăng nhập tài khoản chính). |
| Số điện thoại | String(20) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Số điện thoại liên hệ của tổ chức. |
| Trung tâm Đăng ký mặc định | String(100) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Hiển thị **Tên đầy đủ** của Trung tâm giao dịch bảo đảm theo Danh mục [DM_08]. |
| Họ và tên người đại diện | String(255) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Họ tên người đại diện theo pháp luật của tổ chức. |
| Loại giấy tờ người đại diện | Enum(String(50)) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Tham chiếu Danh mục Loại giấy tờ pháp lý [DM_10]. |
| Số giấy tờ người đại diện | String(50) | - | Theo hồ sơ | Control UI: Text hiển thị (Read-only).<br>- Số giấy tờ pháp lý của người đại diện. |
| Nhóm người dùng | List(String) | - | Theo hồ sơ | Control UI: Chip danh sách (Read-only).<br>- Danh sách Nhóm người dùng của tổ chức. |
| Vai trò | List(String) | - | Theo hồ sơ | Control UI: Chip danh sách (Read-only).<br>- Danh sách Vai trò của tổ chức. |
| Cây phân quyền cộng dồn | Boolean | - | Theo hồ sơ | Control UI: Cây phân quyền chỉ đọc (Read-only).<br>- Hiển thị quyền chức năng cộng dồn theo Nhóm người dùng và vai trò đã tích chọn. |
| Tài liệu đính kèm | Danh sách file | - | Theo hồ sơ | Control UI: Danh sách file đính kèm (Read-only).<br>- Hiển thị tên file kèm liên kết `Xem file` (mở file trong 1 tab mới trên trình duyệt). |
| **III.2. Tab Tài khoản phụ trực thuộc** | - | - | - | Hiển thị danh sách các Tài khoản phụ / Nhân viên trực thuộc Tổ chức (khi đang chọn `Tab Tài khoản phụ trực thuộc`). Toàn bộ thông tin ở chế độ Chỉ đọc (Read-only). |
| STT | Integer(10) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số thứ tự tăng dần của tài khoản phụ. |
| Tên | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Họ tên tài khoản phụ trực thuộc tổ chức. |
| Số giấy tờ | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Số giấy tờ cá nhân của tài khoản phụ. |
| Email | String(255) | - | - | Control UI: Text hiển thị (Read-only).<br>- Email đồng thời là Tên đăng nhập của tài khoản phụ. |
| Địa chỉ chi tiết | String(500) | - | - | Control UI: Text hiển thị (Read-only).<br>- Địa chỉ chi tiết của tài khoản phụ. |
| Trạng thái | Enum(String(50)) | - | - | Control UI: Badge/Tag hiển thị (Read-only).<br>Gồm:<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng |
| Thao tác | String(255) | - | - | Control UI: Nhóm icon thao tác trên lưới tài khoản phụ.<br>- "Xem chi tiết": Luôn hiển thị cho phép xem thông tin chi tiết tài khoản phụ.<br>- "Sửa": Chỉ hiển thị khi tài khoản phụ ở trạng thái "Đang hoạt động".<br>- "Khóa": Chỉ hiển thị khi tài khoản phụ ở trạng thái "Đang hoạt động".<br>- "Mở khóa": Chỉ hiển thị khi tài khoản phụ ở trạng thái "Bị khóa".<br>- "Đóng": Chỉ hiển thị khi tài khoản phụ ở trạng thái "Đang hoạt động" hoặc "Bị khóa".<br>- "Xóa": Chỉ hiển thị khi người dùng được phân quyền. |
| **IV. Nhóm nút thao tác chân form (Footer Buttons)** | - | - | - | Khối các nút hành động đặt tại footer của màn hình/popup chi tiết. Điều kiện hiển thị từng nút:<br>- **Quay lại** (hoặc **Đóng**): Luôn hiển thị.<br>- **Cập nhật**: Chỉ hiển thị khi trạng thái tài khoản là `Đang hoạt động`.<br>- **Đặt lại mật khẩu**: Chỉ hiển thị khi hồ sơ có Nguồn xác thực là `Nội bộ` (hoặc `VNeID, Nội bộ`) VÀ trạng thái tài khoản là `Đang hoạt động`.<br>- **Khóa**: Chỉ hiển thị khi trạng thái tài khoản là `Đang hoạt động`.<br>- **Mở khóa**: Chỉ hiển thị khi trạng thái tài khoản là `Bị khóa`.<br>- **Đóng**: Chỉ hiển thị khi trạng thái tài khoản là `Đang hoạt động` hoặc `Bị khóa`.<br>- **Xóa**: Chỉ hiển thị khi người dùng được phân quyền xóa tài khoản. |

###### 4.3.1.4.9.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Đóng Popup Modal xem chi tiết và quay lại danh sách kết quả tại MH01. |
| 2 | Cập nhật | Button | Mở **MH03 - Popup Chỉnh sửa tài khoản khách hàng** tương ứng theo loại tài khoản đang xem. |
| 3 | Đặt lại mật khẩu | Button | Mở **MH09 - Popup Đặt lại mật khẩu** cho tài khoản. |
| 4 | Khóa | Button | Mở **MH05 - Popup Xác nhận Khóa tài khoản khách hàng** để thực hiện tạm khóa tài khoản. |
| 5 | Mở khóa | Button | Mở **MH06 - Popup Xác nhận Mở khóa tài khoản khách hàng** để khôi phục trạng thái hoạt động cho tài khoản. |
| 6 | Đóng tài khoản | Button | Mở **MH04 - Popup Xác nhận Đóng/Xóa tài khoản khách hàng** với loại thao tác là `Đóng` để xác nhận đóng vĩnh viễn tài khoản. |
| 7 | Xóa | Button | Mở **MH04 - Popup Xác nhận Đóng/Xóa tài khoản khách hàng** với loại thao tác là `Xóa` để xác nhận xóa cứng tài khoản. |
| 8 | Xem file | Link | Mở file đính kèm trong 1 tab mới trên trình duyệt. |

---

##### 4.3.1.4.10. MH09 - Popup Đặt lại mật khẩu tài khoản khách hàng

###### 4.3.1.4.10.1. Màn hình

![Màn hình Đặt lại mật khẩu](../../images/UC009/UC009_09_MH01_Dat_lai_mat_khau.png)

###### 4.3.1.4.10.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Email (Tên đăng nhập) | String(255) | Không | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Email là Tên đăng nhập của nguồn xác thực Nội bộ. |
| Mật khẩu mới | Password | Có | Trống | Control UI: Input password.<br>- Mật khẩu mới do quản trị viên nhập, tuân thủ quy tắc phức tạp mật khẩu hệ thống cấu hình tại UC561.<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Nhập lại mật khẩu mới | Password | Có | Trống | Control UI: Input password.<br>- Nhập lại mật khẩu mới, bắt buộc phải trùng khớp với trường Mật khẩu mới.<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Yêu cầu đổi mật khẩu khi đăng nhập lần tiếp theo | Boolean | Không | Có | Control UI: Checkbox.<br>- Mặc định được tích chọn. |

###### 4.3.1.4.10.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Button | Đóng popup, hủy bỏ thao tác đặt lại mật khẩu. |
| 2 | Lưu mật khẩu mới | Button | Kiểm tra dữ liệu mật khẩu mới:<br>- TH1 (Bỏ trống bắt buộc): Nếu Mật khẩu mới hoặc Nhập lại mật khẩu mới bị bỏ trống, vi phạm [BR-VAL-001], hiển thị thông báo lỗi [MSG-ERR-VAL-001].<br>- TH2 (Mật khẩu không hợp lệ): Nếu mật khẩu mới không tuân thủ quy tắc độ phức tạp mật khẩu tại UC561, hiển thị thông báo lỗi [MSG-ERR-VAL-006].<br>- TH3 (Nhập lại mật khẩu không khớp): Nếu Nhập lại mật khẩu mới không trùng khớp với Mật khẩu mới, hiển thị thông báo lỗi [MSG-ERR-UC009-006].<br>- TH Hợp lệ:<br>+ Hệ thống thực hiện mã hóa băm mật khẩu một chiều kết hợp Salt ngẫu nhiên và lưu mật khẩu mới vào CSDL.<br>+ Cập nhật cờ yêu cầu đổi mật khẩu cho lần đăng nhập tiếp theo.<br>+ Ghi nhận lịch sử Audit Log.<br>+ Hiển thị thông báo thành công [MSG-SUC-UC009-006] và đóng popup.<br>+ Tuyệt đối không gửi mật khẩu dạng văn bản rõ qua Email. |
| 3 | Ẩn/hiện mật khẩu | Icon | Khi click biểu tượng con mắt tại từng ô mật khẩu, hệ thống chuyển đổi trạng thái hiển thị giữa che ký tự và hiện ký tự văn bản rõ. Thao tác này không làm thay đổi giá trị mật khẩu. |
