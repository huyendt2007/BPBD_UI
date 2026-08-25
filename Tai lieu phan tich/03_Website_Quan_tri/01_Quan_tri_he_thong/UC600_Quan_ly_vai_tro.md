## 4.3 Webite Quản trị

### 4.3.1 Dành cho Quản trị hệ thống:

#### 4.3.1.1. Quản lý Vai trò

##### 4.3.1.1.1. UC600.01 - Tra cứu vai trò

###### 4.3.1.1.1.1. Mục đích

\- Cung cấp tính năng quản lý danh mục vai trò cốt lõi.  
\- Hiển thị danh sách vai trò.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.1.1.2. UC600.01.MH01 - Màn hình Tra cứu vai trò

**Màn hình**:
\- Giao diện Split-view. Panel trái: Lưới vai trò. Panel phải: Phân quyền.

**Mô tả thông tin trên màn hình**:

| Trường thông tin        | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                 |
| :------------------------- | :-------------- | :--------- | :---------- | :-------------------------------------------------------------------------------------- |
| **Bộ lọc**         |                 |            |             |                                                                                         |
| Tìm kiếm nhanh           | String(255) | Không     | Trống      | Control UI: Textbox.<br>Hệ thống lọc danh sách vai trò tức thời (live-search) theo từ khóa nhập vào. |
| Trạng thái               | Enum(String(50)) | Không     | Tất cả      | Control UI: Hộp chọn.<br>Lọc danh sách vai trò theo trạng thái, gồm:<br>+ Tất cả<br>+ Hoạt động<br>+ Ngừng hoạt động |
| **Lưới dữ liệu** |                 |            |             |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Tên vai trò              | Enum(String(50)) | \- | \- | Hiển thị tên vai trò.                                                               |
| Mô tả                    | Text(2000) | \- | \- | Hiển thị mô tả của vai trò.                                                             |
| Trạng thái               | Enum(String(50)) | \- | \- | Hiển thị trạng thái vai trò (Hoạt động/Ngừng hoạt động).                                |
| Thao tác                  | - | \- | \- | Chứa các Icon: Sửa, Xóa, Phân quyền chức năng. Nhấp chọn Icon Phân quyền chức năng sẽ mở màn hình phân quyền [UC600.05](UC600_Quan_ly_vai_tro.md#43115-uc60005---phan-quyen-theo-vai-tro). |
| **Panel phải: Chi tiết vai trò (Xem chi tiết)** | |          |             |                                                                                         |
| Tab Phân quyền           | - | \- | \- | Tab mặc định khi chọn 1 vai trò ở Panel trái. Hiển thị khối Tìm kiếm quyền và Cây quyền hạn như mô tả dưới đây. |
| Tìm kiếm quyền           | String(255) | Không     | Trống      | Control UI: Textbox.<br>Nhập từ khóa để lọc nhanh danh sách quyền trên cây bên dưới. |
| Cây quyền hạn            | Date | \- | \- | Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)**.<br>- **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng mà Vai trò này đang sở hữu. Các quyền khác không được gán cho Vai trò sẽ bị ẩn đi khỏi cây.<br>- **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà Vai trò có quyền truy cập (Ví dụ: Đối với vai trò thuộc loại **Khách hàng** chỉ hiển thị gốc gồm **Website Khách hàng** và **Ứng dụng Mobile**; đối với loại **Cán bộ** chỉ hiển thị gốc **Website quản trị**). Phân hệ nào Vai trò không có quyền sẽ không hiển thị làm node gốc trên cây.<br>- **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục/Chìa khóa) + Tên chức năng (Mã chức năng). |
| Tab Danh sách người dùng được gán | - | \- | \- | Hiển thị danh sách tài khoản (Khách hàng/Cán bộ/Cơ quan có thẩm quyền theo đúng `Loại tài khoản áp dụng` của vai trò đang xem) đang được gán vai trò này. |
| Tìm kiếm người dùng      | String(255) | Không     | Trống      | Control UI: Textbox.<br>Lọc nhanh (live-search) danh sách theo Họ và tên/Tên đăng nhập/Email/Số điện thoại. |
| Nút: Thêm người dùng     | - | \- | \- | Control UI: Nút bấm.<br>Mở popup Thêm người dùng vào vai trò (UC600.06) để chọn thêm tài khoản gán vào vai trò đang xem. |
| Bảng danh sách người dùng được gán | - | \- | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Cột: Họ và tên/Tên tổ chức | String(255) | \- | Theo bản ghi | Chỉ đọc.<br>Họ và tên (nếu là tài khoản Cá nhân/Cán bộ) hoặc Tên tổ chức (nếu là tài khoản Tổ chức). |
| Cột: Tên đăng nhập        | String(255) | \- | Theo bản ghi | Chỉ đọc.<br>Tên đăng nhập của tài khoản. |
| Cột: Loại tài khoản       | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc.<br>Hiển thị Cá nhân/Tổ chức nếu vai trò áp dụng cho Khách hàng, hoặc Cán bộ/Cơ quan có thẩm quyền tương ứng. |
| Cột: Email                | String(255) | \- | Theo bản ghi | Chỉ đọc. |
| Cột: Số điện thoại        | String(20) | \- | Theo bản ghi | Chỉ đọc. |
| Cột: Trạng thái tài khoản | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc.<br>Hiển thị Đang hoạt động hoặc Bị khóa. |
| Cột: Thao tác            | - | \- | \- | Control UI: Icon.<br>Icon **Gỡ khỏi vai trò**: mở xác nhận [MSG-CFM-SYS-001] dạng "Bạn có chắc chắn muốn gỡ [Tên người dùng] khỏi vai trò [Tên vai trò]?"; sau xác nhận, hệ thống xóa vai trò này khỏi danh sách Vai trò của tài khoản tương ứng và tải lại bảng. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng  | Mô tả                                        |
| :-- | :--------------- | :------------ | :--------------------------------------------- |
| 1   | Tìm kiếm       | Nút          | Lọc kết quả trên lưới.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2   | Thêm mới       | Nút          | Mở màn hình Thêm mới vai trò (UC600.02). |
| 3   | Sửa             | Icon (Lưới) | Mở màn hình Sửa vai trò (UC600.03).       |
| 4   | Xóa             | Icon (Lưới) | Gọi chức năng xóa (UC600.04).              |
| 5   | Phân quyền      | Icon (Lưới) | Mở màn hình Phân quyền theo vai trò (UC600.05). |
| 6   | Tìm kiếm quyền  | Textbox      | \- Thao tác: QTHT nhập từ khóa tại textbox Tìm kiếm quyền ở Tab Phân quyền.<br>\- Xử lý: Hệ thống thực hiện lọc (live-filter) danh sách chức năng trên cây quyền hạn chỉ đọc.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 7   | Chuyển Tab Danh sách người dùng được gán | Tab | Hiển thị bảng danh sách tài khoản đang được gán vai trò đang xem, theo đúng mô tả tại mục Panel phải. |
| 8   | Tìm kiếm người dùng | Textbox | \- Thao tác: QTHT nhập từ khóa tại textbox Tìm kiếm người dùng.<br>\- Xử lý: Hệ thống lọc (live-search) bảng danh sách người dùng được gán theo từ khóa.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 9   | Thêm người dùng | Nút | Mở popup Thêm người dùng vào vai trò (UC600.06). |
| 10  | Gỡ khỏi vai trò | Icon (Lưới) | Gỡ 1 tài khoản khỏi vai trò đang xem, chi tiết xem tại Cột: Thao tác. |

##### 4.3.1.1.2. UC600.02 - Thêm mới vai trò

###### 4.3.1.1.2.1. Mục đích

\- Cho phép Thêm mới vai trò.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.1.2.2. UC600.02.MH01 - Màn hình Thêm mới vai trò

**Màn hình**:
\- Hình ảnh minh họa giao diện.

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu        | Bắt buộc | Mặc định     | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------ | :--------------------- | :--------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mã vai trò        | Enum(String(50)) | Có        | Sinh tự động | Control UI: Hiển thị/Read-only.<br>Hệ thống tự động sinh mã định danh khi mở form. Không cho phép sửa. |
| Tên vai trò       | String(255) | Có        | Trống          | Nhập tên vai trò.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Loại tài khoản áp dụng | Enum(String(50)) | Có        | Trống          | Control UI: Hộp chọn.<br>Chọn 1 trong 3 loại:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền<br>Trong đó:<br>+ Cán bộ: Áp dụng cho Loại đơn vị là "Nội bộ"<br>+ Khách hàng: Áp dụng cho loại Khách hàng là Cá nhân/Tổ chức<br>+ Cơ quan có thẩm quyền: Áp dụng cho Loại đơn vị là "Cơ quan ngoài ngành" |
| Trạng thái        | Boolean | Có        | Hoạt động       | Control UI: Hộp chọn.<br>Lựa chọn trạng thái hoạt động của vai trò, gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                               |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Lưu lại        | Nút         | Ghi nhận dữ liệu vào CSDL.                                                                                                                                        |
|     |                  |              | \- TH1 (Trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Báo lỗi **[MSG-ERR-VAL-001]**. |
|     |                  |              | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra và phát hiện lỗi:<br>&nbsp;&nbsp;+ Độ dài Tên vai trò vượt quá 255 ký tự: Hiển thị cảnh báo lỗi "Tên vai trò vượt quá độ dài cho phép". |
|     |                  |              | \- TH3 (Trùng lặp): Vi phạm quy tắc **[BR-VAL-009]**. Nếu Tên vai trò đã có, hiển thị thông báo lỗi **[MSG-ERR-VAL-009]**. |
|     |                  |              | \- TH Hợp lệ: Đóng popup, hiển thị: "Thêm mới vai trò thành công".                                                                                         |
| 2   | Hủy             | Nút         | Đóng màn hình, không lưu dữ liệu.                                                                                                                             |

##### 4.3.1.1.3. UC600.03 - Sửa vai trò

###### 4.3.1.1.3.1. Mục đích

\- Cho phép Sửa thông tin vai trò hiện tại.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.1.3.2. UC600.03.MH01 - Màn hình Sửa vai trò

**Màn hình**:
\- Hình ảnh minh họa giao diện.

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu     | Bắt buộc | Mặc định  | Mô tả                    |
| :------------------ | :------------------ | :--------- | :----------- | :------------------------- |
| Mã vai trò        | Enum(String(50)) | Có        | Bản ghi cũ | Control UI: Hiển thị/Read-only.<br>Không cho phép sửa. |
| Tên vai trò       | String(255) | Có        | Bản ghi cũ | Cho phép cập nhật tên. |
| Loại tài khoản áp dụng | Enum(String(50)) | Có        | Theo bản ghi | Control UI: Hộp chọn.<br>Cho phép sửa. Chọn 1 trong 3 loại:<br>+ Cán bộ<br>+ Khách hàng<br>+ Cơ quan có thẩm quyền<br>Trong đó:<br>+ Cán bộ: Áp dụng cho Loại đơn vị là "Nội bộ"<br>+ Khách hàng: Áp dụng cho loại Khách hàng là Cá nhân/Tổ chức<br>+ Cơ quan có thẩm quyền: Áp dụng cho Loại đơn vị là "Cơ quan ngoài ngành" |
| Trạng thái        | Boolean | Có        | Theo bản ghi | Control UI: Hộp chọn.<br>Lựa chọn trạng thái hoạt động của vai trò, gồm:<br>+ Hoạt động<br>+ Ngừng hoạt động |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                               |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Cập nhật       | Nút         | Cập nhật CSDL.                                                                                                                                                      |
|     |                  |              | \- TH1 (Trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Báo lỗi **[MSG-ERR-VAL-001]**. |
|     |                  |              | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra và phát hiện lỗi:<br>&nbsp;&nbsp;+ Độ dài Tên vai trò vượt quá 255 ký tự: Hiển thị cảnh báo lỗi "Tên vai trò vượt quá độ dài cho phép". |
|     |                  |              | \- TH3 (Trùng lặp): Vi phạm quy tắc **[BR-VAL-009]**. Nếu Tên vai trò bị sửa trùng với bản ghi khác, hiển thị thông báo lỗi **[MSG-ERR-VAL-009]**. |
|     |                  |              | \- TH Hợp lệ: Báo: "Cập nhật thông tin thành công".                                                                                                           |
| 2   | Hủy             | Nút         | Đóng màn hình, không lưu dữ liệu.                                                                                                                             |

##### 4.3.1.1.4. UC600.04 - Xóa vai trò

###### 4.3.1.1.4.1. Mục đích

\- Cho phép Xóa một vai trò khỏi hệ thống.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.1.4.2. UC600.04.MH01 - Màn hình Xác nhận xóa vai trò

**Màn hình**:
\- Hình ảnh minh họa giao diện.

**Mô tả thông tin trên màn hình**:

| Trường thông tin  | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                       |
| :------------------- | :-------------- | :--------- | :---------- | :---------------------------------------------------------------------------- |
| Nội dung cảnh báo | Text(2000) | \- | \- | Control UI: Hiển thị/Read-only.<br>Bật cảnh báo: "Bạn có chắc chắn muốn xóa vai trò [Tên vai trò]?". |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                 |
| :-- | :--------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Đồng ý        | Nút         | Xác nhận xóa.<br>- Hợp lệ: Xóa vai trò và báo: "Đã xóa vai trò thành công".<br>- Ngoại lệ: Nếu vai trò đang được gán cho tài khoản nào đó, báo lỗi: "Không thể xóa do vai trò đang được sử dụng bởi người dùng". |
| 2   | Hủy             | Nút         | Đóng popup.                                                                                                                                                                                                                                                           |

##### 4.3.1.1.5. UC600.05 - Phân quyền theo vai trò

###### 4.3.1.1.5.1. Mục đích

\- Cho phép Quản trị viên hệ thống (QTHT) thực hiện phân quyền truy cập và thao tác các chức năng chi tiết cho từng Vai trò trên hệ thống.  
\- NSD được tích chọn chức năng nào thì sẽ được hiển thị menu điều hướng và thực thi các nghiệp vụ/API tương ứng trên phân hệ phần mềm đó.

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống thành công và đang thao tác tại màn hình Tra cứu vai trò (UC600.01).  

###### 4.3.1.1.5.2. UC600.05.MH01 - Màn hình Phân quyền theo vai trò

**Màn hình**:
\- Hiển thị dưới dạng Modal Popup "Phân quyền chức năng" nổi lên trên màn hình chính:  
![Màn hình Phân quyền theo vai trò](images/UC600.05.MH01.png)

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--------------------- | :-------------- | :--------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mã vai trò             | Enum(String(50)) | \- | Mã vai trò đang chọn | Control UI: Hiển thị/Read-only.<br>Hiển thị mã định danh của vai trò đang được thực hiện phân quyền (Ví dụ: `QTTT_VTT`). |
| Tên vai trò            | Enum(String(50)) | \- | Tên vai trò đang chọn | Control UI: Hiển thị/Read-only.<br>Hiển thị tên đầy đủ của vai trò đang được thực hiện phân quyền (Ví dụ: `Vai trò test`). |
| Phân hệ                | String(255) | \- | Tất cả / Tên phân hệ | Control UI: Hiển thị/Read-only.<br>Hiển thị thông tin phân hệ đang được phân quyền (Ví dụ hiển thị: `Tất cả` hoặc `Website quản trị` tùy theo bộ lọc chọn). |
| Badge trạng thái chọn   | Enum(String(50)) | \- | Đã chọn: X/Y | Control UI: Hiển thị/Read-only.<br>Hiển thị số lượng chức năng/quyền đã tích chọn trên tổng số quyền thuộc phạm vi quản lý của Vai trò đó (Ví dụ: `Đã chọn: 2/120`). |
| Tìm kiếm               | String(255) | Không     | Trống | Control UI: Textbox.<br>Nhập từ khóa để lọc nhanh danh sách chức năng trên cây bên dưới theo Tên chức năng hoặc Mã chức năng. |
| Danh sách chức năng    | String(255) | \- | \- | Hiển thị cây danh mục quyền phân cấp (Cha - Con) với các Checkbox lựa chọn:<br>+ **Nhánh gốc cao nhất (Root nodes)**: Hiển thị đầy đủ cả 3 phân hệ chính: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị** để QTHT có thể lựa chọn cấu hình phân quyền cho vai trò.<br>+ **Định dạng hiển thị node**: Checkbox + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>+ **Logic tích chọn (Cascade Checkbox)**:<br>  + Tích chọn node cha (Phân hệ hoặc Module) thì tự động tích chọn tất cả các quyền thao tác con trực thuộc ở các cấp dưới.<br>  + Bỏ tích node cha thì tự động bỏ tích tất cả các quyền con trực thuộc.<br>  + Cho phép tích chọn/bỏ tích chọn lẻ từng quyền thao tác cụ thể ở cấp lá (Leaf node).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Hủy                    | - | \- | \- | Control UI: Nút bấm.<br>Nút bấm để đóng popup, hủy bỏ mọi thay đổi phân quyền vừa thao tác. |
| Cập nhật               | - | \- | \- | Control UI: Nút bấm.<br>Nút bấm để xác nhận lưu thông tin phân quyền và đóng popup. |
| Nút Đóng (X)           | - | \- | \- | Control UI: Nút bấm.<br>Nút biểu tượng "X" ở góc trên bên phải popup để đóng modal và hủy bỏ thay đổi. |

**Chức năng trên màn hình**:

| STT | Tên chức năng  | Định dạng | Mô tả |
| :-- | :---------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Tìm kiếm | Textbox | \- Thao tác: QTHT nhập từ khóa tìm kiếm.<br>\- Xử lý: Hệ thống thực hiện lọc (live-filter) danh sách chức năng hiển thị trên cây. Các node không khớp sẽ bị ẩn đi, các node khớp sẽ được highlight và hiển thị kèm các node cha trực thuộc.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2   | Danh sách chức năng | Checkbox | \- Thao tác: QTHT bấm chọn hoặc bỏ chọn checkbox tại các node chức năng trên cây.<br>\- Xử lý: Hệ thống thay đổi trạng thái chọn của node và cập nhật lại số lượng đếm tại badge `Đã chọn: X/Y` tức thời. Thực hiện cascade select tự động lên các node con hoặc node cha liên quan. |
| 3   | Cập nhật | Nút | \- Thao tác: QTHT click nút **Cập nhật**.<br>\- Xử lý:<br>  + Hệ thống lưu thông tin các chức năng được tích chọn tương ứng với mã vai trò đang cấu hình vào CSDL.<br>  + Hiển thị Toast thông báo thành công: *"Cập nhật thông tin phân quyền thành công!"*.<br>  + Đóng popup modal và tải lại dữ liệu của màn hình chính. |
| 4   | Hủy | Nút / Icon X | \- Thao tác: QTHT click nút **Hủy** hoặc Icon **X** đóng popup.<br>\- Xử lý: Đóng popup modal phân quyền chức năng, hủy bỏ toàn bộ trạng thái tích chọn đang thực hiện, không lưu bất kỳ thay đổi nào vào hệ thống. |

##### 4.3.1.1.6. UC600.06 - Thêm người dùng vào vai trò

###### 4.3.1.1.6.1. Mục đích

\- Cho phép Quản trị hệ thống (QTHT) gán thêm tài khoản đã có sẵn trên hệ thống vào vai trò đang xem, từ Tab Danh sách người dùng được gán (UC600.01).  
\- Không tạo tài khoản mới tại màn hình này; chỉ chọn và gán quan hệ giữa tài khoản đã tồn tại với vai trò.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống thành công và đang thao tác tại Tab Danh sách người dùng được gán của màn hình Tra cứu vai trò (UC600.01).  

###### 4.3.1.1.6.2. UC600.06.MH01 - Màn hình Thêm người dùng vào vai trò

**Màn hình**:
\- Hiển thị dưới dạng Modal Popup "Thêm người dùng vào vai trò [Tên vai trò]".

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên vai trò | Enum(String(50)) | \- | Tên vai trò đang chọn | Control UI: Hiển thị/Read-only.<br>Hiển thị tên vai trò đang thực hiện gán thêm người dùng. |
| Tìm kiếm tài khoản | String(255) | Không | Trống | Control UI: Textbox.<br>Nhập từ khóa để lọc nhanh (live-search) danh sách tài khoản theo Họ và tên/Tên tổ chức, Tên đăng nhập, Email hoặc Số điện thoại. |
| Danh sách tài khoản khả dụng | - | \- | Theo `Loại tài khoản áp dụng` của vai trò | Control UI: Bảng có Checkbox chọn nhiều dòng.<br>Chỉ hiển thị tài khoản đúng `Loại tài khoản áp dụng` của vai trò đang xem: nếu vai trò áp dụng cho **Khách hàng** thì chỉ hiển thị tài khoản khách hàng (Cá nhân/Tổ chức); nếu áp dụng cho **Cán bộ** thì chỉ hiển thị tài khoản cán bộ thuộc Loại đơn vị "Nội bộ"; nếu áp dụng cho **Cơ quan có thẩm quyền** thì chỉ hiển thị tài khoản thuộc Loại đơn vị "Cơ quan ngoài ngành". Không hiển thị các tài khoản đã được gán vai trò này từ trước.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| Số lượng đã chọn | - | \- | 0 | Control UI: Hiển thị/Read-only.<br>Hiển thị dạng `Đã chọn: X tài khoản`. |
| Hủy | - | \- | \- | Control UI: Nút bấm.<br>Đóng popup, không lưu thay đổi. |
| Thêm vào vai trò | - | \- | \- | Control UI: Nút bấm.<br>Chỉ bật (enable) khi đã chọn ít nhất 1 tài khoản. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm tài khoản | Textbox | \- Thao tác: QTHT nhập từ khóa.<br>\- Xử lý: Hệ thống lọc (live-search) danh sách tài khoản khả dụng theo từ khóa, vẫn giữ nguyên phạm vi lọc theo `Loại tài khoản áp dụng` của vai trò.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Chọn tài khoản | Checkbox | \- Thao tác: QTHT tích chọn/bỏ chọn 1 hoặc nhiều dòng tài khoản.<br>\- Xử lý: Hệ thống cập nhật số lượng đã chọn và bật/tắt nút **Thêm vào vai trò** tương ứng. |
| 3 | Thêm vào vai trò | Nút | \- Thao tác: QTHT click nút **Thêm vào vai trò**.<br>\- Xử lý: Hệ thống gán vai trò đang xem vào danh sách Vai trò của toàn bộ tài khoản đã chọn, ghi nhận Audit Log (Người thực hiện, Ngày thực hiện, Vai trò, danh sách tài khoản được gán), hiển thị Toast "Đã thêm [X] tài khoản vào vai trò thành công", đóng popup và tải lại Tab Danh sách người dùng được gán. |
| 4 | Hủy | Nút | \- Thao tác: QTHT click nút **Hủy**.<br>\- Xử lý: Đóng popup, không lưu thay đổi. |
