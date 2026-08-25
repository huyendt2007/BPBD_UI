##### 4.3.1.5.2. UCPS010 - Quản lý loại danh mục

###### 4.3.1.5.2.1. Mục đích

\- Cho phép Quản trị viên hệ thống (QTHT) thiết lập, thêm mới, cập nhật, tạm ngưng hoặc xóa các Loại danh mục trên hệ thống để định nghĩa các nhóm danh mục dùng chung (Master Data) khác nhau.

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống với vai trò Quản trị hệ thống.

###### 4.3.1.5.2.2. UCPS010.MH01 - Tra cứu và hiển thị Loại danh mục

####### 4.3.1.5.2.2.1. Màn hình

\- Giao diện gồm 2 phần: Bộ lọc tìm kiếm và Bảng danh sách kết quả (Grid).

####### 4.3.1.5.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa | String(255) | Không | Trống | Tìm kiếm gần đúng theo Mã loại danh mục, Tên loại danh mục hoặc Mô tả. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Ngừng hoạt động |
| TÌM KIẾM | - | Không | \- | Control UI: Nút bấm.<br>Click để tìm kiếm dữ liệu. Chi tiết xem ở bảng Chức năng trên màn hình. |
| **II. Bảng kết quả (Grid)** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| STT | Integer(10) | Không | \- | Số thứ tự tự tăng. |
| Cột: Mã loại danh mục | String(50) | Không | \- | Hiển thị mã duy nhất của loại danh mục. |
| Cột: Tên loại danh mục | String(255) | Không | \- | Hiển thị tên loại danh mục. |
| Cột: Mô tả | String(1000) | Không | \- | Hiển thị nội dung mô tả của loại danh mục. |
| Cột: Trạng thái | String(50) | Không | \- | Hiển thị trạng thái (Đang hoạt động/Ngừng hoạt động). |
| Cột: Thao tác | String(255) | Không | \- | Control UI: Hiển thị/Read-only.<br>Gồm các icon: Sửa, Xóa. Xem chi tiết bằng cách click trực tiếp vào dòng dữ liệu, không dùng icon con mắt riêng. |
| THÊM MỚI | - | Không | \- | Control UI: Nút bấm.<br>Nút bấm để mở Form Modal thêm mới loại danh mục (UCPS010.MH02). |

####### 4.3.1.5.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tìm kiếm | Nút | Hệ thống lọc dữ liệu lưới hiển thị theo Từ khóa, Trạng thái. Hỗ trợ phân trang (Pagination) mặc định 50 bản ghi/trang.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Thêm mới | Nút | Bật Form Modal (UCPS010.MH02) ở trạng thái rỗng để nhập mới. |
| 3 | Sửa | Icon | Bật Form Modal (UCPS010.MH02) và tự động load toàn bộ dữ liệu hiện tại của bản ghi đó lên Form. |
| 4 | Xóa | Icon | Bật Popup xác nhận xóa (UCPS010.MH04). |
| 5 | Click dòng dữ liệu | Row Click | Khi click vào bất kỳ dòng dữ liệu nào trên lưới danh sách (ngoại trừ khi click trực tiếp vào icon Sửa/Xóa tại cột Thao tác), hệ thống mở Form Modal (UCPS010.MH02) và tự động load toàn bộ dữ liệu hiện tại của bản ghi đó lên Form, tương tự thao tác Sửa. |

###### 4.3.1.5.2.3. UCPS010.MH02 - Form Thêm mới / Cập nhật Loại danh mục

####### 4.3.1.5.2.3.1. Màn hình

\- Hiển thị dưới dạng Modal Popup chồng lên màn hình danh sách.

####### 4.3.1.5.2.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã loại danh mục | String(50) | Không | Sinh tự động | Cho phép người dùng tự nhập hoặc hệ thống tự động sinh mã định danh duy nhất nếu để trống (Định dạng: LDM_xxxx).<br>*(Lưu ý: Không cho phép sửa nếu đang ở trạng thái Cập nhật bản ghi).* |
| Tên loại danh mục | String(255) | Có | Trống | Nhập tên loại danh mục. |
| Mô tả | Text(2000) | Không | Trống | Control UI: Textarea.<br>Nhập thông tin mô tả chi tiết khác nếu có. |
| Trạng thái | Enum(String(50)) | Có | Đang hoạt động | Control UI: Hộp chọn.<br>Gồm:<br>+ Đang hoạt động<br>+ Ngừng hoạt động |

####### 4.3.1.5.2.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | LƯU | Nút | \- Thao tác: NSD click nút LƯU.<br>- Kiểm tra: Hệ thống thực hiện validate dữ liệu.<br>- Xử lý:<br>  + TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Focus vào ô trống đầu tiên, báo lỗi **[MSG-ERR-VAL-001]**.<br>  + TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường vượt quá độ dài quy định. Nếu vi phạm, hiển thị cảnh báo lỗi tương ứng.<br>  + TH3 (Trùng lặp dữ liệu): Vi phạm quy tắc **[BR-VAL-009]**. Kiểm tra trùng `Mã loại danh mục` hoặc `Tên loại danh mục` trong hệ thống. Nếu trùng, hiển thị thông báo lỗi **[MSG-ERR-VAL-009]**.<br>  + TH4 (Để trống mã loại danh mục): Hệ thống tự động sinh mã định danh duy nhất (ví dụ: LDM_xxxx).<br>  + TH Hợp lệ: Cập nhật thông tin vào CSDL. Đóng Modal, báo thành công và reload lại lưới. |
| 2 | HỦY | Nút | \- Thao tác: NSD click nút HỦY.<br>- Xử lý: Hệ thống đóng Form Modal, hủy bỏ mọi thao tác nhập liệu và không lưu dữ liệu. |

###### 4.3.1.5.2.4. UCPS010.MH03 - Tạm ngưng Loại danh mục

####### 4.3.1.5.2.4.1. Màn hình

\- Thao tác thông qua Form Chỉnh sửa (UCPS010.MH02) bằng cách thay đổi trạng thái của Loại danh mục sang "Ngừng hoạt động".

####### 4.3.1.5.2.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Trạng thái | Enum(String(50)) | Có | Đang hoạt động | Control UI: Hộp chọn.<br>Gồm:<br>+ Đang hoạt động<br>+ Ngừng hoạt động |

####### 4.3.1.5.2.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Cập nhật trạng thái | Nút | NSD chuyển trạng thái sang "Ngừng hoạt động" và nhấn Lưu.<br>- **Hợp lệ:** Hệ thống lưu trạng thái mới. Loại danh mục này sẽ KHÔNG còn được load lên Dropdown chọn Loại danh mục khi thêm mới ở màn hình Quản lý danh mục dùng chung (UC596). Các danh mục cũ đã gắn với loại danh mục này vẫn hiển thị bình thường. |

###### 4.3.1.5.2.5. UCPS010.MH04 - Xóa Loại danh mục

####### 4.3.1.5.2.5.1. Màn hình

\- Popup xác nhận thao tác xóa loại danh mục.

####### 4.3.1.5.2.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thông báo xác nhận | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>Hiển thị: "Bạn có chắc chắn muốn xóa loại danh mục [Tên loại danh mục]?" |

####### 4.3.1.5.2.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Đồng ý | Nút | Bấm nút xác nhận xóa trên popup.<br>- **Ngoại lệ (ĐÃ SỬ DỤNG):** Hệ thống kiểm tra xem Loại danh mục này đã được gán cho bất kỳ bản ghi Danh mục dùng chung nào tại [UC596](UC596_Quan_ly_danh_muc.md) chưa. Nếu đã có dữ liệu danh mục liên kết, hệ thống chặn xóa và báo lỗi: *"Không thể xóa do Loại danh mục này đang được sử dụng. Vui lòng đổi trạng thái thành Ngừng hoạt động."*<br>- **Hợp lệ (CHƯA SỬ DỤNG):** Xóa cứng/mềm bản ghi khỏi Database, báo thành công và reload lại lưới. |
| 2 | Hủy | Nút | Đóng Popup, hủy thao tác. |
