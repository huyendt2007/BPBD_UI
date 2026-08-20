#### 4.3.1.2. Quản lý Nhóm người dùng

##### 4.3.1.2.1. UC603.01 - Tra cứu và hiển thị nhóm người dùng

###### 4.3.1.2.1.1. Mục đích

\- Quản lý và thiết lập danh sách Nhóm người dùng trên hệ thống.  
\- **Tiện ích và lợi ích:** Việc thiết lập Nhóm người dùng cho phép hệ thống Đăng ký Biện pháp bảo đảm và Bồi thường nhà nước phân quyền theo cơ chế "Kế thừa".  
\- Thay vì phải gán Vai trò (Roles) lẻ tẻ cho hàng ngàn chủ thể, Quản trị viên chỉ cần phân bổ các đối tượng (như nhóm Khách hàng Cá nhân/Tổ chức, nhóm Cán bộ BTP, nhóm Cán bộ Sở Tư pháp (STP), hay nhóm Cơ quan có thẩm quyền...) vào các Nhóm tương ứng và gán quyền cho Nhóm đó.  
\- Toàn bộ người dùng thuộc Nhóm sẽ tự động được hưởng quyền hạn xử lý hồ sơ tương ứng.  
\- Khi có người dùng luân chuyển công tác hoặc có tổ chức mới tham gia hệ thống, quản trị viên chỉ cần thêm/bớt họ vào Nhóm, giúp hệ thống vận hành trơn tru, tiết kiệm thời gian và triệt tiêu rủi ro sai sót trong phân quyền nghiệp vụ.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  
  \+ NSD được Phân quyền thực hiện tính năng.  

###### 4.3.1.2.1.2. UC603.01.MH01 - Màn hình Tra cứu nhóm người dùng

**Màn hình**:
\- Hình ảnh minh họa giao diện.

**Mô tả thông tin trên màn hình**:

| Trường thông tin                        | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                                                                                                    |
| :----------------------------------------- | :-------------- | :--------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Panel Trái: Nhóm người dùng** |                 |            |             |                                                                                                                                                                                            |
| Tìm kiếm nhanh                           | String(255) | Không     | Trống      | Control UI: Textbox.<br>Hệ thống lọc danh sách tức thời. |
| Bảng Nhóm                                | - | \- | 50 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị tên nhóm.<br>- Mặc định phân trang **50 bản ghi/trang**. |
| **Panel Phải: Chi tiết Nhóm**     |                 |            |             |                                                                                                                                                                                            |
| Tab Thông tin chung                       | String(255) | \- | \- | Hiển thị Tên nhóm, Mã nhóm, Loại tài khoản.                                                                                                                                       |
| Tab Danh sách người dùng được gán      | - | \- | \- | Hiển thị danh sách tài khoản (Khách hàng/Cán bộ/Cơ quan có thẩm quyền theo đúng `Loại tài khoản áp dụng` của nhóm đang xem) đang được gán vào nhóm này. |
| Tìm kiếm người dùng                     | String(255) | Không | Trống | Control UI: Textbox.<br>Lọc nhanh (live-search) danh sách theo Họ và tên/Tên đăng nhập/Email/Số điện thoại. |
| Nút: Thêm người dùng                    | - | \- | \- | Control UI: Nút bấm.<br>Mở popup Thêm người dùng vào nhóm (UC603.05) để chọn thêm tài khoản gán vào nhóm đang xem. |
| Bảng danh sách người dùng được gán    | - | \- | 20 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Cột: Họ và tên/Tên tổ chức (Tab Danh sách người dùng được gán) | String(255) | \- | Theo bản ghi | Chỉ đọc.<br>Họ và tên (nếu là tài khoản Cá nhân/Cán bộ) hoặc Tên tổ chức (nếu là tài khoản Tổ chức). |
| Cột: Tên đăng nhập (Tab Danh sách người dùng được gán) | String(255) | \- | Theo bản ghi | Chỉ đọc.<br>Tên đăng nhập của tài khoản. |
| Cột: Loại tài khoản (Tab Danh sách người dùng được gán) | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc.<br>Hiển thị Cá nhân/Tổ chức nếu nhóm áp dụng cho Khách hàng, hoặc Cán bộ/Cơ quan có thẩm quyền tương ứng. |
| Cột: Email (Tab Danh sách người dùng được gán) | String(255) | \- | Theo bản ghi | Chỉ đọc. |
| Cột: Số điện thoại (Tab Danh sách người dùng được gán) | String(20) | \- | Theo bản ghi | Chỉ đọc. |
| Cột: Trạng thái tài khoản (Tab Danh sách người dùng được gán) | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc.<br>Hiển thị Đang hoạt động hoặc Bị khóa. |
| Cột: Thao tác (Tab Danh sách người dùng được gán) | - | \- | \- | Control UI: Icon.<br>Icon **Gỡ khỏi nhóm**: mở xác nhận [MSG-CFM-SYS-001] dạng "Bạn có chắc chắn muốn gỡ [Tên người dùng] khỏi nhóm [Tên nhóm]?"; sau xác nhận, hệ thống xóa nhóm này khỏi danh sách Nhóm người dùng của tài khoản tương ứng và tải lại bảng. |
| Tab Vai trò                               | Enum(String(50)) | \- | \- | Hiển thị danh sách Vai trò mà nhóm đang được gán.                                                                                                                               |
| **Tab Cây quyền hạn**                     | Date | \- | \- | Tab hiển thị quyền hạn cộng dồn của Nhóm người dùng, bao gồm:                                                                                                                     |
| Tìm kiếm quyền                          | String(255) | Không     | Trống       | Control UI: Textbox.<br>Nhập từ khóa để lọc nhanh danh sách chức năng trên cây bên dưới theo Tên chức năng hoặc Mã chức năng. |
| Cây quyền hạn                           | Date | \- | \- | Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)**, tổng hợp tất cả các quyền được cộng dồn từ danh sách Vai trò mà Nhóm đang sở hữu:<br>- **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng mà Nhóm người dùng này sở hữu (được cộng dồn từ danh sách Vai trò đang gán cho Nhóm). Các quyền khác không được phân cho Nhóm sẽ bị ẩn đi khỏi cây.<br>- **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà Nhóm có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào Nhóm không có quyền sẽ không hiển thị làm node gốc trên cây.<br>- **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>- **Logic hiển thị (Quyền cộng dồn)**: Hệ thống tự động gộp/cộng dồn (Union) tất cả các quyền của tất cả các Vai trò đang gán cho Nhóm người dùng này để hiển thị các node tương ứng trên cây. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                             |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------ |
| 1   | Xem chi tiết    | Click (Row)  | Click vào 1 Nhóm ở Panel trái, load chi tiết sang Panel phải. |
| 2   | Thêm mới       | Nút         | Mở màn hình Thêm mới nhóm (UC603.02).                         |
| 3   | Sửa             | Icon         | Mở màn hình Sửa nhóm (UC603.03) ứng với bản ghi.            |
| 4   | Xóa             | Icon         | Gọi chức năng xóa (UC603.04).                                   |
| 5   | Tìm kiếm quyền  | Textbox     | \- Thao tác: QTHT nhập từ khóa tìm kiếm tại textbox Tìm kiếm quyền trên tab Cây quyền hạn.<br>\- Xử lý: Hệ thống thực hiện lọc (live-filter) danh sách chức năng hiển thị trên cây. Các node không khớp sẽ bị ẩn đi, các node khớp sẽ được hiển thị kèm các node cha trực thuộc.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 6   | Chuyển Tab Danh sách người dùng được gán | Tab | Hiển thị bảng danh sách tài khoản đang được gán vào nhóm đang xem, theo đúng mô tả tại mục Panel Phải. |
| 7   | Tìm kiếm người dùng | Textbox | \- Thao tác: QTHT nhập từ khóa tại textbox Tìm kiếm người dùng.<br>\- Xử lý: Hệ thống lọc (live-search) bảng danh sách người dùng được gán theo từ khóa.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 8   | Thêm người dùng | Nút | Mở popup Thêm người dùng vào nhóm (UC603.05). |
| 9   | Gỡ khỏi nhóm | Icon (Lưới) | Gỡ 1 tài khoản khỏi nhóm đang xem, chi tiết xem tại Cột: Thao tác (Tab Danh sách người dùng được gán). |

##### 4.3.1.2.2. UC603.02 - Thêm mới nhóm người dùng

###### 4.3.1.2.2.1. Mục đích

\- Cho phép Thêm mới một nhóm người dùng vào hệ thống.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.2.2.2. UC603.02.MH01 - Màn hình Thêm mới nhóm người dùng

**Màn hình**:
\- Hình ảnh minh họa giao diện.

**Mô tả thông tin trên màn hình**:

| Trường thông tin         | Kiểu dữ liệu     | Bắt buộc | Mặc định     | Mô tả                                                                                                                                                            |
| :-------------------------- | :------------------ | :--------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mã nhóm                   | String(50) | Có        | Sinh tự động | Control UI: Hiển thị/Read-only.<br>Hệ thống tự động sinh mã định danh khi mở form thêm mới. Không cho phép sửa. |
| Tên nhóm                  | String(255) | Có        | Trống          | Nhập tên nhóm.                                                                                                                                                  |
| Loại tài khoản áp dụng | Enum(String(50)) | Có        | Trống          | Control UI: Hộp chọn.<br>Chọn 1 trong 3 loại:<br>- Cán bộ<br>- Khách hàng<br>- Cơ quan có thẩm quyền<br>Trong đó:<br>- Cán bộ: Áp dụng cho Loại đơn vị là "Nội bộ"<br>- Khách hàng: Áp dụng cho loại Khách hàng là Cá nhân/Tổ chức<br>- Cơ quan có thẩm quyền: Áp dụng cho Loại đơn vị là "Cơ quan ngoài ngành" |
| Danh sách Vai trò         | Enum(String(50)) | Không     | Trống          | Control UI: Hộp chọn.<br>Chọn các Vai trò muốn gán cho Nhóm. |
| Tìm kiếm quyền (Preview)  | String(255) | Không     | Trống          | Control UI: Textbox.<br>Nhập từ khóa để lọc nhanh danh sách chức năng trên cây xem trước. |
| Cây quyền hạn (Preview)   | Date | \- | \- | Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)** để xem trước các quyền mà nhóm người dùng sở hữu:<br>- **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng được gán thông qua các vai trò được tích chọn. Các quyền khác không được chọn sẽ bị ẩn đi khỏi cây.<br>- **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà các vai trò được chọn có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào hoàn toàn không được chọn quyền sẽ không hiển thị làm node gốc trên cây.<br>- **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>- **Logic tích chọn tự động (Preview)**: Khi người dùng chọn/bỏ chọn các vai trò tại dropdown **Danh sách Vai trò**, hệ thống sẽ tự động tính toán cộng dồn (Union) các quyền tương ứng của các vai trò đó để hiển thị và tích chọn các node trên cây tương ứng trong thời gian thực (Real-time). Các quyền không được chọn sẽ tự động ẩn đi khỏi cây. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                               |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Lưu lại        | Nút         | Lưu thông tin vào CSDL.                                                                                                                                            |
|     |                  |              | \- TH1 (Trống trường bắt buộc): Báo lỗi "Vui lòng nhập thông tin bắt buộc".                                                                               |
|     |                  |              | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép". |
|     |                  |              | \- TH3 (Trùng lặp): Nếu Tên nhóm trùng lặp, báo lỗi: "Tên nhóm đã tồn tại".                                                                            |
|     |                  |              | \- TH Hợp lệ: Báo: "Thêm mới nhóm thành công" và đóng form.                                                                                                |
| 2   | Hủy             | Nút         | Đóng Form Modal, không lưu dữ liệu.                                                                                                                             |
| 3   | Tìm kiếm quyền (Preview) | Textbox     | \- Thao tác: QTHT nhập từ khóa tìm kiếm tại textbox Tìm kiếm quyền (Preview).<br>\- Xử lý: Hệ thống lọc danh sách chức năng hiển thị trên cây xem trước tương ứng.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|

##### 4.3.1.2.3. UC603.03 - Sửa nhóm người dùng

###### 4.3.1.2.3.1. Mục đích

\- Cho phép Sửa thông tin nhóm người dùng.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.2.3.2. UC603.03.MH01 - Màn hình Sửa nhóm người dùng

**Màn hình**:
\- Hình ảnh minh họa giao diện.

**Mô tả thông tin trên màn hình**:

| Trường thông tin         | Kiểu dữ liệu     | Bắt buộc | Mặc định   | Mô tả                                                                                                                                                            |
| :-------------------------- | :------------------ | :--------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mã nhóm                   | String(50) | Có        | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Không cho phép sửa. |
| Tên nhóm                  | String(255) | Có        | Theo bản ghi | Cho phép sửa.                                                                                                                                                    |
| Loại tài khoản áp dụng | Enum(String(50)) | Có        | Theo bản ghi | Control UI: Hộp chọn.<br>Cho phép sửa. Chọn 1 trong 3 loại:<br>- Cán bộ<br>- Khách hàng<br>- Cơ quan có thẩm quyền<br>Trong đó:<br>- Cán bộ: Áp dụng cho Loại đơn vị là "Nội bộ"<br>- Khách hàng: Áp dụng cho loại Khách hàng là Cá nhân/Tổ chức<br>- Cơ quan có thẩm quyền: Áp dụng cho Loại đơn vị là "Cơ quan ngoài ngành" |
| Danh sách Vai trò         | Enum(String(50)) | Không     | Theo bản ghi | Control UI: Hộp chọn.<br>Thêm/bớt các Vai trò của Nhóm. |
| Tìm kiếm quyền (Preview)  | String(255) | Không     | Trống          | Control UI: Textbox.<br>Nhập từ khóa để lọc nhanh danh sách chức năng trên cây xem trước. |
| Cây quyền hạn (Preview)   | Date | \- | \- | Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)** để xem trước các quyền mà nhóm người dùng sở hữu:<br>- **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng được gán thông qua các vai trò được tích chọn. Các quyền khác không được chọn sẽ bị ẩn đi khỏi cây.<br>- **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà các vai trò được chọn có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào hoàn toàn không được chọn quyền sẽ không hiển thị làm node gốc trên cây.<br>- **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>- **Logic tích chọn tự động (Preview)**: Khi người dùng chọn/bỏ chọn các vai trò tại dropdown **Danh sách Vai trò**, hệ thống sẽ tự động tính toán cộng dồn (Union) các quyền tương ứng của các vai trò đó để hiển thị và tích chọn các node trên cây tương ứng trong thời gian thực (Real-time). Các quyền không được chọn sẽ tự động ẩn đi khỏi cây. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                               |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Cập nhật       | Nút         | Cập nhật thông tin vào CSDL.                                                                                                                                      |
|     |                  |              | \- TH1 (Trống trường bắt buộc): Báo lỗi "Vui lòng nhập thông tin bắt buộc".                                                                               |
|     |                  |              | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép". |
|     |                  |              | \- TH3 (Trùng lặp): Nếu Tên nhóm sửa bị trùng, báo lỗi: "Tên nhóm đã tồn tại".                                                                        |
|     |                  |              | \- TH Hợp lệ: Đóng popup, báo: "Cập nhật thành công".                                                                                                        |
| 2   | Hủy             | Nút         | Đóng Form Modal, không lưu dữ liệu.                                                                                                                             |
| 3   | Tìm kiếm quyền (Preview) | Textbox     | \- Thao tác: QTHT nhập từ khóa tìm kiếm tại textbox Tìm kiếm quyền (Preview).<br>\- Xử lý: Hệ thống lọc danh sách chức năng hiển thị trên cây xem trước tương ứng.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|

##### 4.3.1.2.4. UC603.04 - Xóa nhóm người dùng

###### 4.3.1.2.4.1. Mục đích

\- Cho phép xóa nhóm người dùng khỏi hệ thống.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.2.4.2. UC603.04.MH01 - Màn hình Xác nhận xóa nhóm

**Màn hình**:
\- Hình ảnh minh họa giao diện.

**Mô tả thông tin trên màn hình**:

| Trường thông tin  | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                         |
| :------------------- | :-------------- | :--------- | :---------- | :-------------------------------------------------------------- |
| Nội dung cảnh báo | Text(2000) | \- | \- | Control UI: Hiển thị/Read-only.<br>Bật cảnh báo: "Bạn có chắc chắn muốn xóa nhóm này?". |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                     |
| :-- | :--------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Đồng ý        | Nút         | Xác nhận xóa.<br>- Hợp lệ: Xóa nhóm và báo: "Xóa dữ liệu thành công".<br>- Không hợp lệ: Nếu nhóm đang có thành viên hoặc đang được gán vai trò, báo: "Không thể xóa do nhóm đang có dữ liệu ràng buộc". |
| 2   | Hủy             | Nút         | Đóng popup.                                                                                                                                                                                                                                               |

##### 4.3.1.2.5. UC603.05 - Thêm người dùng vào nhóm người dùng

###### 4.3.1.2.5.1. Mục đích

\- Cho phép Quản trị hệ thống (QTHT) gán thêm tài khoản đã có sẵn trên hệ thống vào nhóm người dùng đang xem, từ Tab Danh sách người dùng được gán (UC603.01).  
\- Không tạo tài khoản mới tại màn hình này; chỉ chọn và gán quan hệ giữa tài khoản đã tồn tại với nhóm.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống thành công và đang thao tác tại Tab Danh sách người dùng được gán của màn hình Tra cứu nhóm người dùng (UC603.01).  

###### 4.3.1.2.5.2. UC603.05.MH01 - Màn hình Thêm người dùng vào nhóm người dùng

**Màn hình**:
\- Hiển thị dưới dạng Modal Popup "Thêm người dùng vào nhóm [Tên nhóm]".

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên nhóm | String(255) | \- | Tên nhóm đang chọn | Control UI: Hiển thị/Read-only.<br>Hiển thị tên nhóm đang thực hiện gán thêm người dùng. |
| Tìm kiếm tài khoản | String(255) | Không | Trống | Control UI: Textbox.<br>Nhập từ khóa để lọc nhanh (live-search) danh sách tài khoản theo Họ và tên/Tên tổ chức, Tên đăng nhập, Email hoặc Số điện thoại. |
| Danh sách tài khoản khả dụng | - | \- | Theo `Loại tài khoản áp dụng` của nhóm | Control UI: Bảng có Checkbox chọn nhiều dòng.<br>Chỉ hiển thị tài khoản đúng `Loại tài khoản áp dụng` của nhóm đang xem: nếu nhóm áp dụng cho **Khách hàng** thì chỉ hiển thị tài khoản khách hàng (Cá nhân/Tổ chức); nếu áp dụng cho **Cán bộ** thì chỉ hiển thị tài khoản cán bộ thuộc Loại đơn vị "Nội bộ"; nếu áp dụng cho **Cơ quan có thẩm quyền** thì chỉ hiển thị tài khoản thuộc Loại đơn vị "Cơ quan ngoài ngành". Không hiển thị các tài khoản đã được gán nhóm này từ trước. |
| Số lượng đã chọn | - | \- | 0 | Control UI: Hiển thị/Read-only.<br>Hiển thị dạng `Đã chọn: X tài khoản`. |
| Hủy | - | \- | \- | Control UI: Nút bấm.<br>Đóng popup, không lưu thay đổi. |
| Thêm vào nhóm | - | \- | \- | Control UI: Nút bấm.<br>Chỉ bật (enable) khi đã chọn ít nhất 1 tài khoản. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm tài khoản | Textbox | \- Thao tác: QTHT nhập từ khóa.<br>\- Xử lý: Hệ thống lọc (live-search) danh sách tài khoản khả dụng theo từ khóa, vẫn giữ nguyên phạm vi lọc theo `Loại tài khoản áp dụng` của nhóm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Chọn tài khoản | Checkbox | \- Thao tác: QTHT tích chọn/bỏ chọn 1 hoặc nhiều dòng tài khoản.<br>\- Xử lý: Hệ thống cập nhật số lượng đã chọn và bật/tắt nút **Thêm vào nhóm** tương ứng. |
| 3 | Thêm vào nhóm | Nút | \- Thao tác: QTHT click nút **Thêm vào nhóm**.<br>\- Xử lý: Hệ thống gán nhóm đang xem vào danh sách Nhóm người dùng của toàn bộ tài khoản đã chọn, ghi nhận Audit Log (Người thực hiện, Ngày thực hiện, Nhóm, danh sách tài khoản được gán), hiển thị Toast "Đã thêm [X] tài khoản vào nhóm thành công", đóng popup và tải lại Tab Danh sách người dùng được gán. |
| 4 | Hủy | Nút | \- Thao tác: QTHT click nút **Hủy**.<br>\- Xử lý: Đóng popup, không lưu thay đổi. |

#### 4.3.1.3. Quản lý tài khoản cán bộ
