### 4.1.10. Quản lý tài khoản trực thuộc (Tài khoản con / Nhân viên)

#### 4.1.10.1. Mục đích

\- Cho phép tài khoản chính của Tổ chức quản lý danh sách các tài khoản con trực thuộc đơn vị của mình.  
\- Hỗ trợ tra cứu, tìm kiếm tài khoản con theo nhiều tiêu chí lọc và sắp xếp.  
\- Hỗ trợ thêm mới (tạo lập), cập nhật thông tin và thực hiện khóa/mở khóa (đóng) tài khoản con trực thuộc nhằm đảm bảo phân quyền vận hành và an ninh hệ thống.  

*a. Phân quyền*

\- Tài khoản chính của Tổ chức (đã đăng nhập thành công).  

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website Khách hàng bằng tài khoản Tổ chức (Tài khoản chính).  
\- Hệ thống hoạt động bình thường.  

#### 4.1.10.2. UC008 - Tra cứu người dùng trong tài khoản chính

##### 4.1.10.2.1. Màn hình Tra cứu tài khoản trực thuộc (UC008.MH01)

\- Giao diện chính của phân hệ Quản lý tài khoản trực thuộc, hiển thị lưới danh sách tài khoản con, bộ lọc tìm kiếm và các nút thao tác nghiệp vụ.  
\- Từ lưới danh sách này, người dùng có thể thực hiện tìm kiếm nhanh, thêm tài khoản (mở Form popup), sửa đổi (mở Form popup), khóa/đóng tài khoản, hoặc xuất danh sách ra file Excel.  

##### 4.1.10.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa tìm kiếm | String(255) | Không | Trống | \- Nhập từ khóa tìm kiếm: tìm kiếm gần đúng (chứa từ khóa) theo Họ tên, Email, Số điện thoại và tìm kiếm chính xác theo Số giấy tờ của tài khoản con. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>\- Gồm các giá trị: Tất cả, Đang hoạt động, Bị khóa. |
| **II. Bảng danh sách tài khoản con** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Bảng danh sách tài khoản con | - | \- | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách các tài khoản con trực thuộc.<br>- Hiển thị mặc định **20 bản ghi/trang**.<br>- Mặc định hiển thị danh sách theo ngày tạo giảm dần.<br>- Trường hợp không tìm thấy tài khoản con nào thỏa mãn bộ lọc hoặc danh sách trống, hiển thị dòng chữ: "Không có dữ liệu".<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| > Cột: Số giấy tờ | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Số giấy tờ pháp lý (CCCD/CMND/Hộ chiếu) của tài khoản con. |
| > Cột: Tên khách hàng | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Tên khách hàng/tên nhân viên thuộc Tổ chức.<br>- Cho phép sắp xếp theo bảng chữ cái tiếng Việt (A-Z/Z-A) khi bấm vào tiêu đề cột. |
| > Cột: Đơn vị | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Tên đơn vị/phòng ban trực thuộc của nhân viên. |
| > Cột: Email (Tên đăng nhập) | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Địa chỉ Email của tài khoản con, đồng thời là Tên đăng nhập. |
| > Cột: Số điện thoại | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Số điện thoại liên lạc của nhân viên. |
| > Cột: Trạng thái | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Trạng thái hoạt động: Đang hoạt động, Bị khóa. |
| > Cột: Ngày tạo | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Ngày tạo lập tài khoản con.<br>- Mặc định sắp xếp danh sách theo Ngày tạo giảm dần (mới nhất lên đầu). |
| > Cột: Thao tác | - | \- | \- | Control UI: Cột hiển thị icon thao tác cố định 03 vị trí (Fixed 3 Slots), thiết lập độ rộng `min-width: 120px; text-align: center;`.<br>- **Thứ tự 03 Slot thao tác cố định**:<br>  1. `Cập nhật` (`fa-solid fa-pen-to-square`)<br>  2. `Khóa / Mở khóa` (`fa-solid fa-lock` khi Đang hoạt động / `fa-solid fa-lock-open` khi Bị khóa)<br>  3. `Đóng tài khoản con` (`fa-solid fa-ban`)<br>- **Phạm vi phân quyền của Tổ chức**:<br>  + **Tuyệt đối không có thao tác `Đặt lại mật khẩu`**: Nhân viên trực thuộc tự quản lý mật khẩu qua chức năng Quên mật khẩu / Đổi mật khẩu cá nhân hoặc định danh qua VNeID.<br>  + **Tuyệt đối không có thao tác `Xóa`**: Tổ chức chỉ có quyền quản lý vận hành (Khóa/Đóng); quyền xóa dữ liệu chỉ thuộc về Quản trị hệ thống cấp cao (Admin).<br>- **Quy tắc hiển thị & Khóa mờ (Disabled)**: Luôn hiển thị đầy đủ 03 icon, không ẩn icon. Thao tác không khả dụng hiển thị khóa mờ (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`) kèm tooltip giải thích lý do. |
| Nút "Thêm tài khoản" | String(255) | Không | \- | \- Click để mở popup Form Thêm mới tài khoản con (UC005). |
| Nút "Kết xuất" | String(255) | Không | \- | \- Kết xuất danh sách hiển thị ra file Excel. |
##### 4.1.10.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | \- Thao tác: NSD click nút Tìm kiếm.<br>- Xử lý: Tự động cắt bỏ khoảng trắng thừa ở hai đầu từ khóa (Trim space). Lọc danh sách tài khoản con theo Từ khóa tìm kiếm và Trạng thái:<br>+ Tìm kiếm gần đúng (chứa từ khóa) đối với các trường: Tên khách hàng, Email, Số điện thoại.<br>+ Tìm kiếm chính xác đối với trường: Số giấy tờ (Số CCCD/CMND/Hộ chiếu).<br>+ **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Thêm tài khoản | Nút | \- Thao tác: NSD click nút "Thêm tài khoản".<br>- Xử lý: Hệ thống hiển thị popup Form Thêm mới tài khoản con (UC005.MH01). |
| 3 | Cập nhật | Icon (Slot 1) | \- **Khả dụng**: Khi tài khoản con ở trạng thái `Đang hoạt động` hoặc `Bị khóa`. NSD click icon Cập nhật ở cột Thao tác $\rightarrow$ hệ thống hiển thị popup Form Cập nhật tài khoản trực thuộc (UC006.MH01), điền sẵn thông tin bản ghi và cho phép chỉnh sửa thông tin hành chính cùng Cây phân quyền.<br>\- **Khóa mờ 35%**: Khi tài khoản con ở trạng thái `Đóng` (Tooltip: *"Tài khoản đã đóng không được phép chỉnh sửa"*). |
| 4 | Khóa / Mở khóa | Icon (Slot 2) | \- **Khả dụng**:<br>+ Nếu trạng thái `Đang hoạt động`: Hiển thị icon Khóa (`fa-lock`), click mở popup xác nhận Khóa tài khoản con (UC007). Sau khi khóa, nhân viên bị vô hiệu hóa phiên đăng nhập và không thể thực hiện giao dịch cho tổ chức.<br>+ Nếu trạng thái `Bị khóa`: Hiển thị icon Mở khóa (`fa-lock-open`), click mở popup xác nhận Mở khóa tài khoản con (UC007) để khôi phục trạng thái hoạt động.<br>\- **Khóa mờ 35%**: Khi tài khoản con ở trạng thái `Đóng` (Tooltip: *"Tài khoản đã đóng không thể Khóa/Mở khóa"*). |
| 5 | Đóng tài khoản con | Icon (Slot 3) | \- **Khả dụng**: Khi tài khoản con ở trạng thái `Đang hoạt động` hoặc `Bị khóa` (áp dụng khi nhân viên nghỉ việc hoặc ngừng công tác). Click mở popup xác nhận Đóng tài khoản con (UC007). Sau khi xác nhận, tài khoản con chuyển sang trạng thái `Đóng` vĩnh viễn.<br>\- **Khóa mờ 35%**: Khi tài khoản con đã ở trạng thái `Đóng` (Tooltip: *"Tài khoản đã ở trạng thái Đóng"*). |
| 6 | Kết xuất Excel | Nút | \- Thao tác: NSD click nút Kết xuất.<br>- Xử lý: Hệ thống kiểm tra dữ liệu trước khi xuất file. |
| | | | \- TH1 (Không có dữ liệu): Danh sách tài khoản con trên lưới rỗng. Hệ thống hiển thị thông báo lỗi: "Không có dữ liệu để xuất Excel." |
| | | | \- TH Hợp lệ: Hệ thống xuất toàn bộ danh sách tài khoản trực thuộc hiện tại theo kết quả lọc ra file Excel (.xlsx) với các thông tin: STT, Số giấy tờ, Tên khách hàng, Đơn vị, Email, Số điện thoại, Trạng thái, Ngày tạo. |

#### 4.1.10.3. UC005 - Thêm mới người dùng trong tài khoản chính

##### 4.1.10.3.1. Form Popup Thêm mới tài khoản trực thuộc (UC005.MH01)

\- Giao diện dạng Popup Modal hiển thị đè lên màn hình danh sách khi click nút "Thêm tài khoản".  
\- Cho phép tài khoản chính của Tổ chức mẹ nhập thông tin nhân viên mới và thực hiện phân quyền trực tiếp trên cây phân quyền để lưu vào hệ thống.  

##### 4.1.10.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Thêm mới tài khoản con** | String(255) | \- | \- | \- Hiển thị dạng Popup Modal. |
| Mã khách hàng (Tổ chức chủ quản) | String(50) | Không | Theo tài khoản Tổ chức đang đăng nhập | Control UI: Hiển thị/Read-only.<br>- Hiển thị Mã khách hàng của Tổ chức chủ quản.<br>- Không cho phép chỉnh sửa. |
| Tên khách hàng | String(255) | Có | Trống | \- Tên khách hàng/tên nhân viên thuộc Tổ chức. |
| Email (Tên đăng nhập) | String(255) | Có | Trống | \- Địa chỉ Email của tài khoản con, đồng thời là Tên đăng nhập.<br>- Sử dụng Email làm tên đăng nhập, không hiển thị trường Tên đăng nhập riêng.<br>- Ràng buộc định dạng chuẩn theo Regex: `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`.<br>- Ràng buộc tính duy nhất trên toàn hệ thống. |
| Loại giấy tờ | Enum(String(50)) | Có | Căn cước công dân | Control UI: Hộp chọn.<br>\- Tham chiếu Danh mục giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(255) | Có | Trống | \- Số giấy tờ pháp lý của tài khoản con.<br>- Ràng buộc kiểm tra tính duy nhất trên toàn hệ thống. |
| Nguồn định danh | Enum(String(50)) | Không | Theo Tổ chức chủ quản | Control UI: Hiển thị/Read-only hoặc tự động theo Tổ chức chủ quản.<br>- Gồm: `VNeID`, `Nội bộ`. |
| Số điện thoại | String(20) | Không | Trống | \- Số điện thoại liên hệ.<br>- Nếu có nhập, ràng buộc định dạng:<br>+ Nếu Quốc gia là Việt Nam: Độ dài đúng 10 chữ số, bắt đầu bằng số 0, Regex: `/^0[35789]\d{8}$/`.<br>+ Nếu Quốc gia khác Việt Nam: Độ dài từ 8 đến 15 ký tự, Regex: `/^\+?[1-9]\d{7,14}$/`. |
| Đơn vị | String(255) | Không | Trống | \- Tên đơn vị/phòng ban trực thuộc của nhân viên. |
| Ngày sinh | Date | Không | Trống | \- Ngày sinh của tài khoản con.<br>- Định dạng `DD/MM/YYYY`.<br>- Nếu có nhập, phải nhỏ hơn ngày hiện tại. |
| Quốc gia | Enum(String(50)) | Có | Việt Nam | Control UI: Hộp chọn.<br>\- Chọn quốc gia của tài khoản con.<br>\- Gồm các giá trị:<br>+ **Việt Nam**<br>+ **Nước ngoài** |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Có | Trống | Control UI: Textarea / Input text.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp...<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Cây phân quyền | Boolean | Có | Trống | Control UI: Checkbox.<br>\- Hiển thị Cây Phân quyền tương ứng với Vai trò của Cá nhân đã cấu hình trên hệ thống.<br>\- Hiển thị danh sách các quyền hạn/chức năng dưới dạng cấu trúc cây thư mục phân cấp (Cây phân quyền). Các nút trên cây gồm:<br>+ Tên quyền hạn/Chức năng tương ứng.<br>+ Checkbox trước mỗi tên quyền để NSD tích chọn/bỏ chọn.<br>+ Cung cấp các nút chức năng thao tác nhanh:<br>+ Chọn tất cả (Check all): Cho phép tích chọn toàn bộ các quyền trên cây.<br>+ Bỏ chọn tất cả (Clear all): Cho phép bỏ tích chọn toàn bộ các quyền trên cây.<br>+ Quy tắc hiển thị & thao tác:<br>+ Chỉ hiển thị đối với tài khoản chính của Tổ chức.<br>+ NSD tích chọn các tính năng phân quyền tương ứng trực tiếp trên cây quyền đối với tài khoản con này.<br>+ Phân quyền theo mô hình cha-con: Khi tích chọn quyền cha, tự động tích chọn tất cả các quyền con trực thuộc. Khi bỏ tích chọn quyền cha, tự động bỏ tích tất cả các quyền con.<br>+ Phạm vi quyền hạn tối đa không vượt quá tập quyền hiện có của Tổ chức mẹ.<br>+ **Các quyền giả định trên cây phân quyền bao gồm**:<br>&nbsp;&nbsp;1. Đăng ký Biện pháp bảo đảm<br>&nbsp;&nbsp;2. Đăng ký thay đổi<br>&nbsp;&nbsp;3. Xóa đăng ký<br>&nbsp;&nbsp;4. Đăng ký thông báo xử lý tài sản<br>&nbsp;&nbsp;5. Yêu cầu cấp bản sao văn bản<br>&nbsp;&nbsp;6. Yêu cầu cấp bản sao kèm thông báo<br>&nbsp;&nbsp;7. Quản lý yêu cầu đã đăng ký<br>&nbsp;&nbsp;8. Quản lý yêu cầu hỗ trợ<br>&nbsp;&nbsp;9. Hỗ trợ khách hàng |

##### 4.1.10.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | \- Thao tác: NSD click nút Lưu. |
| | | | \- Xử lý: Hệ thống thực hiện kiểm tra thông tin trên form: |
| | | | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt. Nếu vi phạm, hiển thị cảnh báo lỗi tương ứng. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH3 (Trùng lặp / Đã tồn tại):<br>+ Kiểm tra trùng lặp **Email (Tên đăng nhập)** trên toàn hệ thống. Nếu trùng, hiển thị **[MSG-ERR-VAL-009]**.<br>+ Kiểm tra trùng lặp **Số giấy tờ** trên toàn hệ thống. Nếu trùng, hiển thị **[MSG-ERR-VAL-009]**.<br>Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH Hợp lệ:<br>+ Hệ thống lưu thông tin tài khoản con trực thuộc vào Cơ sở dữ liệu theo dữ liệu đã nhập trên form, bao gồm Tỉnh/TP và Địa chỉ chi tiết.<br>+ Tạo tài khoản con ở trạng thái Đang hoạt động.<br>+ Nếu nguồn định danh Tổ chức là Nội bộ: Hệ thống sinh ngẫu nhiên mật khẩu khởi tạo, thực hiện băm mật khẩu và lưu vào hệ thống, kích hoạt cờ bắt buộc đổi mật khẩu lần đầu (ForcePasswordChange: true), gửi [Email thông báo khởi tạo tài khoản con Nội bộ tại Phụ lục Mẫu Email hệ thống](#email-khoi-tao-tk-noi-bo) cho nhân viên.<br>+ Nếu nguồn định danh Tổ chức là VNeID: Không sinh mật khẩu khởi tạo, gửi [Email thông báo tài khoản con được kích hoạt qua VNeID tại Phụ lục Mẫu Email hệ thống](#email-kich-hoat-tk-vneid) cho nhân viên.<br>+ Ghi nhận lịch sử Audit Log.<br>+ Đóng popup form.<br>+ Hiển thị Toast thông báo: "Thêm tài khoản con trực thuộc thành công!".<br>+ Tải lại lưới danh sách ở màn hình tra cứu. |
| 2 | Hủy | Nút | \- Thao tác: NSD click nút Hủy.<br>- Xử lý: Đóng popup form, không lưu thay đổi và quay lại màn hình tra cứu. |

#### 4.1.10.4. UC006 - Cập nhật thông tin người dùng trong tài khoản chính

##### 4.1.10.4.1. Form Popup Cập nhật tài khoản trực thuộc (UC006.MH01)

\- Giao diện dạng Popup Modal hiển thị đè lên màn hình danh sách khi click icon Sửa của tài khoản con tương ứng.  
\- Cho phép chỉnh sửa thông tin nhân viên trực thuộc và phân quyền chi tiết.  

##### 4.1.10.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Cập nhật tài khoản con** | String(255) | \- | \- | \- Hiển thị dạng Popup Modal. |
| Mã khách hàng (Tổ chức chủ quản) | String(50) | Không | Theo tài khoản Tổ chức đang đăng nhập | Control UI: Hiển thị/Read-only.<br>- Hiển thị Mã khách hàng của Tổ chức chủ quản.<br>- Không cho phép chỉnh sửa. |
| Tên khách hàng | String(255) | Có | Theo bản ghi được chọn | \- Tên khách hàng/tên nhân viên thuộc Tổ chức.<br>- Nếu Tổ chức mẹ liên kết định danh qua VNeID, và thông tin nhân viên được xác thực qua VNeID: Chỉ đọc (Read-only).<br>- Nếu Tổ chức Nội bộ: Cho phép chỉnh sửa. |
| Email (Tên đăng nhập) | String(255) | Có | Theo bản ghi được chọn | Control UI: Hiển thị/Read-only khi cập nhật.<br>- Địa chỉ Email của tài khoản con, đồng thời là Tên đăng nhập.<br>- Không cho phép sửa khi cập nhật thông tin vì Email là định danh đăng nhập của tài khoản.<br>- Không hiển thị trường Tên đăng nhập riêng. |
| Loại giấy tờ | Enum(String(50)) | Có | Theo bản ghi được chọn | Control UI: Hộp chọn.<br>\- Trạng thái: Chỉ đọc (Read-only).<br>- Tham chiếu Danh mục giấy tờ pháp lý [DM_10]. |
| Số giấy tờ | String(255) | Có | Theo bản ghi được chọn | \- Trạng thái: Chỉ đọc (Read-only). |
| Nguồn định danh | Enum(String(50)) | Không | Theo Tổ chức chủ quản | Control UI: Hiển thị/Read-only hoặc tự động theo Tổ chức chủ quản.<br>- Gồm: `VNeID`, `Nội bộ`. |
| Số điện thoại | String(20) | Không | Theo bản ghi được chọn | \- Số điện thoại liên hệ.<br>- Nếu có nhập, ràng buộc định dạng:<br>+ Nếu Quốc gia là Việt Nam: Độ dài đúng 10 chữ số, bắt đầu bằng số 0, Regex: `/^0[35789]\d{8}$/`.<br>+ Nếu Quốc gia khác Việt Nam: Độ dài từ 8 đến 15 ký tự, Regex: `/^\+?[1-9]\d{7,14}$/`. |
| Đơn vị | String(255) | Không | Theo bản ghi được chọn | \- Tên đơn vị/phòng ban trực thuộc của nhân viên. |
| Ngày sinh | Date | Không | Theo bản ghi được chọn | \- Ngày sinh của tài khoản con.<br>- Định dạng `DD/MM/YYYY`.<br>- Nếu có nhập, phải nhỏ hơn ngày hiện tại. |
| Quốc gia | Enum(String(50)) | Có | Theo bản ghi được chọn | Control UI: Hộp chọn.<br>\- Chọn quốc gia của tài khoản con.<br>\- Gồm các giá trị:<br>+ **Việt Nam**<br>+ **Nước ngoài** |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Theo bản ghi được chọn | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Theo bản ghi được chọn | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Có | Theo bản ghi được chọn | Control UI: Textarea / Input text.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp...<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Cây phân quyền | Boolean | Có | Theo bản ghi được chọn | Control UI: Checkbox.<br>\- Hiển thị Cây Phân quyền tương ứng với Vai trò của Cá nhân đã cấu hình trên hệ thống.<br>\- Hiển thị danh sách các quyền hạn/chức năng dưới dạng cấu trúc cây thư mục phân cấp (Cây phân quyền). Các nút trên cây gồm:<br>+ Tên quyền hạn/Chức năng tương ứng.<br>+ Checkbox trước mỗi tên quyền để NSD tích chọn/bỏ chọn.<br>+ Cung cấp các nút chức năng thao tác nhanh:<br>+ Chọn tất cả (Check all): Cho phép tích chọn toàn bộ các quyền trên cây.<br>+ Bỏ chọn tất cả (Clear all): Cho phép bỏ tích chọn toàn bộ các quyền trên cây.<br>+ Quy tắc hiển thị & thao tác:<br>+ Chỉ hiển thị đối với tài khoản chính của Tổ chức.<br>+ NSD tích chọn các tính năng phân quyền tương ứng trực tiếp trên cây quyền đối với tài khoản con này.<br>+ Phân quyền theo mô hình cha-con: Khi tích chọn quyền cha, tự động tích chọn tất cả các quyền con trực thuộc. Khi bỏ tích chọn quyền cha, tự động bỏ tích tất cả các quyền con.<br>+ Phạm vi quyền hạn tối đa không vượt quá tập quyền hiện có của Tổ chức mẹ.<br>+ **Các quyền giả định trên cây phân quyền bao gồm**:<br>&nbsp;&nbsp;1. Đăng ký Biện pháp bảo đảm<br>&nbsp;&nbsp;2. Đăng ký thay đổi<br>&nbsp;&nbsp;3. Xóa đăng ký<br>&nbsp;&nbsp;4. Đăng ký thông báo xử lý tài sản<br>&nbsp;&nbsp;5. Yêu cầu cấp bản sao văn bản<br>&nbsp;&nbsp;6. Yêu cầu cấp bản sao kèm thông báo<br>&nbsp;&nbsp;7. Quản lý yêu cầu đã đăng ký<br>&nbsp;&nbsp;8. Quản lý yêu cầu hỗ trợ<br>&nbsp;&nbsp;9. Hỗ trợ khách hàng |

##### 4.1.10.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Nút | \- Thao tác: NSD click nút Cập nhật. |
| | | | \- Xử lý: Hệ thống thực hiện kiểm tra thông tin trên form: |
| | | | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Focus và highlight viền đỏ ô lỗi. Không cho phép cập nhật. |
| | | | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt. Nếu vi phạm, hiển thị cảnh báo lỗi tương ứng. Focus và highlight viền đỏ ô lỗi. Không cho phép cập nhật. |
| | | | \- TH3 (Trùng lặp / Đã tồn tại):<br>+ Không kiểm tra thay đổi **Email (Tên đăng nhập)** khi cập nhật vì trường này ở trạng thái Read-only, không cho phép sửa.<br>+ Kiểm tra trùng lặp **Số giấy tờ** trên toàn hệ thống, ngoại trừ giá trị hiện tại của chính tài khoản con này. Nếu trùng, hiển thị **[MSG-ERR-VAL-009]**.<br>Focus và highlight viền đỏ ô lỗi. Không cho phép cập nhật. |
| | | | \- TH Hợp lệ:<br>+ Hệ thống lưu thông tin cập nhật và phân quyền mới của tài khoản con vào Cơ sở dữ liệu.<br>+ Ghi nhận nhật ký hệ thống (Audit Log).<br>+ Đóng popup form.<br>+ Hiển thị Toast thông báo: "Cập nhật thông tin tài khoản con thành công!".<br>+ Tải lại lưới danh sách ở màn hình tra cứu. |
| 2 | Hủy | Nút | \- Thao tác: NSD click nút Hủy.<br>- Xử lý: Đóng popup form, không lưu thay đổi và quay lại màn hình tra cứu. |

#### 4.1.10.5. UC007 - Đóng người dùng trong tài khoản chính

##### 4.1.10.5.1. Popup Xác nhận đóng tài khoản trực thuộc (UC007.MH01)

\- Giao diện Popup Modal nhỏ hiển thị cảnh báo xác nhận khi NSD click icon Khóa/Mở khóa ở cột Thao tác trên GridView.  

##### 4.1.10.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông báo xác nhận | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>\- Trường hợp Khóa: "Bạn có chắc chắn muốn khóa tài khoản [Tên khách hàng]?"<br>- Trường hợp Mở khóa: "Bạn có chắc chắn muốn mở khóa tài khoản [Tên khách hàng]?" |
| Nút Xác nhận | String(255) | Không | \- | \- Click để thực hiện cập nhật trạng thái hoạt động của tài khoản. |
| Nút Hủy | String(255) | Không | \- | \- Click để hủy bỏ thao tác và đóng popup. |

##### 4.1.10.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận | Nút | \- Thao tác: NSD click nút Xác nhận trên popup. |
| | | | \- Xử lý: Hệ thống thực hiện cập nhật trạng thái hoạt động của tài khoản con trong Cơ sở dữ liệu: |
| | | | \- TH1 (Trạng thái hiện tại là Đang hoạt động):<br>+ Hệ thống đổi trạng thái thành `Bị khóa` (Đóng tài khoản).<br>+ Thực hiện thu hồi/vô hiệu hóa lập tức toàn bộ các phiên làm việc (Revoke Access Tokens/Sessions) đang hoạt động của tài khoản con đó trên toàn hệ thống, cưỡng chế đăng xuất ngay lập tức.<br>+ Ghi nhận nhật ký hệ thống (Audit Log).<br>+ Đóng popup, hiển thị Toast thông báo: "Cập nhật trạng thái tài khoản trực thuộc thành công!".<br>+ Tải lại lưới danh sách ở màn hình tra cứu. |
| | | | \- TH2 (Trạng thái hiện tại là Bị khóa):<br>+ Hệ thống đổi trạng thái thành `Đang hoạt động` (Mở khóa tài khoản), cho phép tài khoản con đăng nhập lại bình thường.<br>+ Ghi nhận nhật ký hệ thống (Audit Log).<br>+ Đóng popup, hiển thị Toast thông báo: "Cập nhật trạng thái tài khoản trực thuộc thành công!".<br>+ Tải lại lưới danh sách ở màn hình tra cứu. |
| 2 | Hủy | Nút | \- Thao tác: NSD click nút Hủy.<br>- Xử lý: Đóng popup xác nhận, giữ nguyên trạng thái tài khoản con. |
