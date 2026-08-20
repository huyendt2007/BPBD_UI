﻿##### 4.3.1.5.1. UC596 - Quản lý danh mục dùng chung (Master Data)

###### 4.3.1.5.1.1. Mục đích

\- Cho phép Quản trị viên hệ thống thiết lập, thêm, sửa, xóa các giá trị thuộc nhóm Danh mục dùng chung (Master Data) của hệ thống.  

\- Thiết kế một Form đa dụng (Generic Form) để hỗ trợ cả danh mục dạng phẳng (Flat List) lẫn danh mục phân cấp (Hierarchical List).  

###### 4.3.1.5.1.2. UC596.MH01 - Tra cứu và hiển thị Danh mục

####### 4.3.1.5.1.2.1. Màn hình

\- Giao diện gồm 2 phần: Bộ lọc tìm kiếm và Bảng danh sách kết quả (Grid).

####### 4.3.1.5.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin                  | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                                                                                                                                                                              |
| :----------------------------------- | :-------------- | :--------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **I. Bộ lọc tìm kiếm**     |                 |            |             |                                                                                                                                                                                                                                                                      |
| Loại danh mục                      | Enum(String(50)) | Không     | Tất cả    | Control UI: Hộp chọn.<br>Cho phép chọn 1 trong các loại danh mục hệ thống. Danh sách lựa chọn được lấy ra từ Danh sách Loại danh mục đang hoạt động trên hệ thống (Trạng thái = Đang hoạt động). |
| Từ khóa                            | String(255) | Không     | Trống      | Tìm kiếm linh hoạt theo Mã danh mục, Tên giá trị hoặc Nội dung danh mục.                                                                                                                                                                                  |
| Trạng thái                         | Enum(String(50)) | Không     | Tất cả    | Control UI: Hộp chọn.<br>Gồm:<br>- Tất cả<br>- Hoạt động<br>- Ngừng hoạt động |
| TÌM KIẾM                           | - | Không     | \- | Control UI: Nút bấm.<br>Click để tìm kiếm dữ liệu. Chi tiết xem ở bảng Chức năng trên màn hình. |
| **II. Bảng kết quả (Grid)** |                 |            |             |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| STT                                  | Integer(10) | Không     | \- | Số thứ tự tự tăng.                                                                                                                                                                                                                                              |
| Cột: Tên danh mục                    | String(255) | Không     | \- | Hiển thị tên định danh tiếng Việt của danh mục (Ví dụ: "Biện pháp bảo đảm").                                                                                                                                                                                                             |
| Cột: Tên danh mục (EN)               | String(255) | Không     | \- | Hiển thị tên định danh tiếng Anh của danh mục (Ví dụ: "Secured measures").                                                                                                                                                                                                             |
| Cột: Loại danh mục                   | String(50) | Không     | \- | Hiển thị loại danh mục (Ví dụ: "Loại biện pháp bảo đảm").                                                                                                                                                                                                           |
| Cột: Viết tắt/Mô tả                  | String(1000) | Không     | \- | Hiển thị viết tắt tiếng Việt hoặc nội dung chi tiết/mô tả của danh mục. Cắt ngắn kèm tooltip nếu quá dài.                                                                                                                                                                                                 |
| Cột: Viết tắt/Mô tả (EN)             | String(1000) | Không     | \- | Hiển thị viết tắt tiếng Anh hoặc nội dung chi tiết/mô tả của danh mục. Cắt ngắn kèm tooltip nếu quá dài.                                                                                                                                                                                                 |
| Cột: Trạng thái                      | String(50) | Không     | \- | Hiển thị trạng thái (Hoạt động/Ngừng hoạt động) bằng Tag màu tương ứng.                                                                                                                                                                              |
| Cột: Thao tác                        | String(255) | Không     | \- | Control UI: Hiển thị/Read-only.<br>Gồm các nút: Sửa (icon bút chì), Xóa (icon thùng rác). Xem chi tiết bằng cách click trực tiếp vào dòng dữ liệu, không dùng icon con mắt riêng. |
| THÊM MỚI                             | - | Không     | \- | Control UI: Nút bấm.<br>Nút bấm để mở Form Modal thêm mới danh mục (UC596.MH02). |

####### 4.3.1.5.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-- | :--------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Tìm kiếm       | Nút         | Hệ thống lọc dữ liệu lưới hiển thị theo Từ khóa, Loại danh mục, Trạng thái. Hỗ trợ phân trang (Pagination).<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2   | Thêm mới       | Nút         | Bật Form Modal (UC596.MH02) ở trạng thái rỗng để nhập mới.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 3   | Sửa             | Icon         | Bật Form Modal (UC596.MH02) và tự động load toàn bộ dữ liệu hiện tại của bản ghi đó lên Form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 4   | Xóa             | Row Click | Bật Popup xác nhận:*"Bạn có chắc chắn muốn xóa danh mục [Tên danh mục]?"*.<br>- Hệ thống kiểm tra xem Mã danh mục này **ĐÃ ĐƯỢC SỬ DỤNG** ở bất kỳ hồ sơ/tài khoản hay có làm Danh mục cha cho danh mục con nào chưa.<br>- Nếu ĐÃ SỬ DỤNG: Hệ thống chặn thao tác Xóa và hiển thị cảnh báo lỗi: *"Không thể xóa do danh mục này đang được sử dụng. Vui lòng đổi trạng thái thành Ngừng hoạt động."*<br>- Nếu CHƯA SỬ DỤNG: Xóa bản ghi khỏi Database, báo Toast thành công và reload lại lưới. |
| 5   | Click dòng dữ liệu | Row Click | Khi click vào bất kỳ dòng dữ liệu nào trên lưới danh sách (ngoại trừ khi click trực tiếp vào icon Sửa/Xóa tại cột Thao tác), hệ thống mở Form Modal (UC596.MH02) và tự động load toàn bộ dữ liệu hiện tại của bản ghi đó lên Form, tương tự thao tác Sửa. |

###### 4.3.1.5.1.3. UC596.MH02 - Form Thêm mới / Cập nhật Danh mục

####### 4.3.1.5.1.3.1. Màn hình

\- Hiển thị dưới dạng Modal Popup chồng lên màn hình danh sách, giúp NSD không phải chuyển trang.

####### 4.3.1.5.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin          | Kiểu dữ liệu         | Bắt buộc        | Mặc định     | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :--------------------------- | :---------------------- | :---------------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loại danh mục              | Enum(String(50)) | Có               | (Tùy chọn)    | Control UI: Hộp chọn.<br>Load danh sách các loại danh mục đang hoạt động trên hệ thống (Trạng thái = Đang hoạt động).<br>*Tiện ích UX:* Nếu NSD đang đứng ở màn hình tìm kiếm đã filter sẵn loại danh mục thì lúc thêm mới tự động mồi sẵn giá trị này.<br>*(Lưu ý: Không cho phép sửa nếu đang ở trạng thái Cập nhật bản ghi).* |
| Mã danh mục                | String(50) | Có               | Sinh tự động | Control UI: Hiển thị/Read-only.<br>Hệ thống tự động sinh mã định danh duy nhất khi mở form thêm mới<br>*(Lưu ý: Không cho phép sửa).* |
| Tên danh mục               | String(255) | Có               | Trống          | Tên tiếng Việt của danh mục hiển thị trên giao diện người dùng để định danh. (VD: "Việt Nam", "Mẫu email Đăng ký"). |
| Tên danh mục (EN)           | String(255) | Có               | Trống          | Tên tiếng Anh của danh mục. (VD: "Vietnam", "Registration Email Template"). |
| Viết tắt/Mô tả             | Text(2000) | Tùy điều kiện | Trống          | Control UI: Textarea.<br>Viết tắt hoặc nội dung chi tiết của bản ghi bằng tiếng Việt.<br>- Đối với danh mục thông thường (VD: Quốc gia): Có thể để trống.<br>- Đối với danh mục đặc thù (VD: Danh mục Tooltip, Template Email): Đây sẽ là trường bắt buộc chứa nội dung text/HTML dài để hiển thị. |
| Viết tắt/Mô tả (EN)         | Text(2000) | Tùy điều kiện | Trống          | Control UI: Textarea.<br>Viết tắt hoặc nội dung chi tiết của bản ghi bằng tiếng Anh.<br>- Đối với danh mục thông thường (VD: Quốc gia): Có thể để trống.<br>- Đối với danh mục đặc thù (VD: Danh mục Tooltip, Template Email): Đây sẽ là trường bắt buộc chứa nội dung tiếng Anh. |
| Danh mục cha (Trực thuộc) | Enum(String(50)) | Không            | Trống          | Control UI: Hộp chọn.<br>Cho phép chọn một bản ghi danh mục ĐÃ TỒN TẠI trên hệ thống để làm cấp cha (Dành cho cấu trúc cây phân cấp). Box tìm kiếm hiển thị Tên danh mục cha để người dùng lựa chọn, hệ thống ngầm lưu Mã danh mục cha. |
| Mô tả / Ghi chú           | Text(2000) | Không            | Trống          | Control UI: Textarea.<br>Ghi chú nội bộ dành riêng cho Quản trị viên (Admin), không hiển thị ra người dùng cuối. |
| Trạng thái                 | Enum(String(50)) | Có               | Hoạt động    | Control UI: Hộp chọn.<br>Gồm:<br>- Hoạt động<br>- Ngừng hoạt động<br>Các dữ liệu "Ngừng hoạt động" sẽ không xuất hiện trong Dropdown ở các form nghiệp vụ. |

####### 4.3.1.5.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                            |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2   | HỦY             | Nút         | \- Thao tác: NSD click nút HỦY.<br>- Xử lý: Hệ thống đóng Form Modal, hủy bỏ mọi thao tác nhập liệu và không lưu dữ liệu. |

###### 4.3.1.5.1.4. UC596.MH03 - Tạm ngưng Danh mục

####### 4.3.1.5.1.4.1. Màn hình

| 1 | LƯU | Nút | \- Thao tác: NSD click nút LƯU.<br>- Kiểm tra: Hệ thống thực hiện validate dữ liệu.<br>- Xử lý: |
|   |   |   | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Focus vào ô trống đầu tiên, highlight viền đỏ và hiển thị báo lỗi **[MSG-ERR-VAL-001]**. |
|   |   |   | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép". |
|   |   |   | \- TH3 (Trùng lặp dữ liệu): Kiểm tra trùng `Tên giá trị` trong cùng một `Loại danh mục`. Nếu phát hiện trùng, hiển thị thông báo lỗi "Giá trị danh mục này đã tồn tại trên hệ thống". |
|   |   |   | \- TH Hợp lệ: Cập nhật thông tin vào CSDL. Đóng Modal, hiển thị thông báo thành công và Refresh lại lưới danh sách. |

####### 4.3.1.5.1.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định  | Mô tả                                                    |
| :------------------ | :-------------- | :--------- | :----------- | :--------------------------------------------------------- |
| Trạng thái        | Enum(String(50)) | Có        | Hoạt động | Control UI: Hộp chọn.<br>Gồm:<br>- Hoạt động<br>- Ngừng hoạt động |

####### 4.3.1.5.1.4.3. Chức năng trên màn hình

| STT | Tên chức năng        | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-- | :---------------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Cập nhật trạng thái | Nút         | Chuyển trạng thái của Danh mục từ "Hoạt động" sang "Ngừng hoạt động" thông qua Form Chỉnh sửa.<br>- **Hợp lệ:** Dữ liệu này sẽ KHÔNG còn được load lên các Combobox/Dropdown chọn danh mục ở màn hình nghiệp vụ (VD: Form Đăng ký mới hồ sơ). Tuy nhiên, các hồ sơ cũ trong quá khứ đã trỏ vào danh mục này vẫn hiển thị bình thường để đảm bảo tính toàn vẹn dữ liệu lịch sử. |

###### 4.3.1.5.1.5. UC596.MH04 - Xóa Danh mục

####### 4.3.1.5.1.5.1. Màn hình

\- Popup xác nhận thao tác xóa danh mục.

####### 4.3.1.5.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                   |
| :--------------------- | :-------------- | :--------- | :---------- | :------------------------------------------------------------------------ |
| Thông báo xác nhận | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>Hiển thị: "Bạn có chắc chắn muốn xóa danh mục [Tên danh mục]?" |

####### 4.3.1.5.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :-- | :--------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Đồng ý        | Nút         | Bấm Icon [Xóa] trên lưới danh sách danh mục để kích hoạt xác nhận.<br>- **Hợp lệ (CHƯA SỬ DỤNG):** Xóa cứng/mềm bản ghi khỏi Database, báo Toast thành công và reload lại lưới.<br>- **Ngoại lệ (ĐÃ SỬ DỤNG):** Hệ thống kiểm tra xem Mã danh mục này ĐÃ ĐƯỢC SỬ DỤNG ở bất kỳ hồ sơ, tài khoản hay có đang đóng vai trò làm Danh mục cha cho danh mục con nào khác chưa. Nếu ĐÃ SỬ DỤNG, Hệ thống chặn thao tác Xóa và hiển thị cảnh báo lỗi (Màu đỏ): *"Không thể xóa do danh mục này đang được sử dụng. Vui lòng đổi trạng thái thành Ngừng hoạt động."* |
| 2   | Hủy             | Nút         | Đóng Popup, hủy thao tác.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
