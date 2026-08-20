##### 4.3.1.3.1. UC595.01 - Tra cứu danh sách tài khoản cán bộ

###### 4.3.1.3.1.1. Mục đích

\- Tra cứu và hiển thị danh sách tài khoản cán bộ.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.3.1.2. UC595.01.MH01 - Màn hình Tra cứu

**Màn hình**:

\- Giao diện danh sách (Grid) kèm bộ lọc tra cứu.

**Mô tả thông tin trên màn hình**:

| Trường thông tin          | Kiểu dữ liệu | Bắt buộc | Mặc định        | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :--------------------------- | :-------------- | :--------- | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Họ và tên | String(255) | Không | Trống | Tìm kiếm gần đúng theo họ và tên cán bộ. |
| Email | String(255) | Không | Trống | Tìm kiếm gần đúng theo Email cán bộ. |
| Số điện thoại | String(20) | Không | Trống | Tìm kiếm gần đúng theo số điện thoại cán bộ. |
| Đơn vị                    | Enum(String(100)) | Không     | Đơn vị của NSD | Control UI: Hộp chọn.<br>**Theo phân cấp quản lý:** Danh sách đơn vị hiển thị phụ thuộc vào Đơn vị của NSD đang đăng nhập (NSD chỉ được phép chọn chính Đơn vị mình trực thuộc và các Đơn vị cấp dưới trực thuộc, không hiển thị và không được chọn các Đơn vị cấp trên hoặc các Đơn vị cùng cấp khác). Tiêu chí tìm kiếm mặc định ban đầu là Đơn vị của chính NSD đang đăng nhập. |
| Loại đơn vị            | Enum(String(100)) | Không     | Tất cả           | Control UI: Hộp chọn.<br>Gồm:<br>- Tất cả<br>- Nội bộ<br>- Cơ quan ngoài ngành |
| Phòng ban                   | Enum(String(50)) | Không     | Tất cả           | Control UI: Hộp chọn.<br>Gồm: Tất cả, và các Phòng ban thuộc Đơn vị đã chọn. |
| Chức vụ                    | Enum(String(50)) | Không     | Tất cả           | Control UI: Hộp chọn.<br>Gồm: Tất cả, và các Chức vụ trong hệ thống. |
| Vai trò | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm: Tất cả và các vai trò đang có hiệu lực trên hệ thống. |
| Nhóm người dùng | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm: Tất cả và các nhóm người dùng đang có hiệu lực trên hệ thống. |
| Từ ngày | Date | Không | Trống | Lọc theo ngày tạo tài khoản từ ngày. Định dạng `dd/mm/yyyy`. |
| Đến ngày | Date | Không | Trống | Lọc theo ngày tạo tài khoản đến ngày. Định dạng `dd/mm/yyyy`. |
| Trạng thái                 | Enum(String(50)) | Không     | Tất cả           | Control UI: Hộp chọn.<br>Gồm:<br>- Đang hoạt động<br>- Bị khóa<br>- Đóng |
| Thêm mới                   | - | \- | \- | Control UI: Nút bấm.<br>Mở màn hình Thêm mới tài khoản. |
| Import Excel                 | - | \- | \- | Control UI: Nút bấm.<br>Mở popup Import danh sách tài khoản từ file Excel. Có link tải file mẫu. |
| Bảng danh sách cán bộ    | - | \- | 50 bản ghi/trang   | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách tài khoản dưới dạng lưới chỉ đọc.<br>- **Lưu ý phân quyền dữ liệu:** Chỉ hiển thị danh sách tài khoản thuộc Đơn vị của NSD đang đăng nhập trở xuống (không hiển thị tài khoản thuộc Đơn vị cấp trên hoặc Đơn vị ngang hàng khác).<br>- Sắp xếp theo Ngày tạo giảm dần.<br>- Hiển thị tổng số bản ghi phù hợp với bộ lọc **tại góc trái cuối danh sách** (cạnh tùy chọn số bản ghi/trang), không hiển thị lặp lại ở khu vực tiêu đề/nút Thêm mới tài khoản.<br>- Có phân trang và cho phép thiết lập số bản ghi/trang: `50`, `100`, `200`.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Cột: STT                    | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Số thứ tự tăng dần. |
| Cột: Họ và tên           | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Tên đầy đủ của cán bộ. |
| Cột: Tên đăng nhập      | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Tên đăng nhập. |
| Cột: Đơn vị - Phòng ban | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Thông tin Đơn vị và Phòng ban trực thuộc. |
| Cột: Loại đơn vị       | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Hiển thị Loại đơn vị của đơn vị trực thuộc (Nội bộ / Cơ quan ngoài ngành). |
| Cột: Chức vụ              | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Thông tin chức vụ. |
| Cột: Nhóm / Vai trò       | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Hiển thị danh sách Nhóm và Vai trò đã gán. |
| Cột: Ngày tạo             | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Ngày tạo tài khoản cán bộ. |
| Cột: Trạng thái           | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>Trạng thái tài khoản gồm: `Đang hoạt động`, `Bị khóa`, `Đóng`. |
| Cột: Thao tác              | String(255) | \- | \- | Gồm các thao tác:<br>- Sửa<br>- Khóa/Mở khóa<br>- Đặt lại mật khẩu<br>- Đóng<br>- Xóa<br>Xem chi tiết bằng cách click trực tiếp vào dòng dữ liệu. |

**Chức năng trên màn hình**:

| STT | Tên chức năng      | Định dạng  | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-- | :-------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Tìm kiếm            | Nút          | Hệ thống thực hiện tìm kiếm gần đúng theo Họ và tên, Email, Số điện thoại; tìm kiếm chính xác theo Đơn vị, Loại đơn vị, Phòng ban, Chức vụ, Vai trò, Nhóm người dùng, Trạng thái; lọc theo khoảng Ngày tạo từ ngày đến ngày.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính style="opacity: 0.35; pointer-events: none; cursor: not-allowed;" kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
|     |                       |               | \- TH có dữ liệu: Hiển thị danh sách lên lưới.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|     |                       |               | \- TH không có dữ liệu: Lưới trống, hiển thị dòng chữ 'Không tìm thấy dữ liệu'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2   | Thêm mới            | Nút          | Mở màn hình Thêm mới tài khoản (UC595.MH02).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 3   | Import Excel          | Nút          | Mở popup Import danh sách tài khoản từ file Excel.<br>- Chỉ cho phép tải lên file Excel (dạng .xls, .xlsx) theo biểu mẫu.<br>- Cho phép Import lên các dòng hợp lệ, dòng lỗi bị loại bỏ và hiển thị bảng chi tiết lỗi (Chi tiết Xem tại **Mục 3.3.1. Quy chuẩn xử lý tính năng Import File** và **A. Ma trận Ràng buộc dữ liệu tải lên (Import Danh sách Tài khoản)**).<br>- Tài khoản hợp lệ được sinh mật khẩu ngẫu nhiên, gửi [Email Tạo tài khoản thành công](#email-tao-tk) và gán Nhóm/Vai trò tự động. |
| 4   | Sửa                  | Icon (Lưới) | Mở màn hình Sửa thông tin tài khoản cán bộ (UC595.03) tương ứng với bản ghi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 5   | Đặt lại mật khẩu | Icon (Lưới) | Mở màn hình Đặt lại mật khẩu (UC595.06).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 6   | Khóa / Mở khóa     | Row Click | Thay đổi trạng thái tài khoản.<br>- Click: Bật popup cảnh báo xác nhận (Xem UC595.04 Khóa tài khoản cán bộ).                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 7   | Đóng tài khoản | Icon (Lưới) | Mở popup xác nhận đóng tài khoản. Khi xác nhận, hệ thống chuyển trạng thái tài khoản sang `Đóng`. Tài khoản ở trạng thái Đóng không được phép đăng nhập. |
| 8   | Xóa | Icon (Lưới) | Mở popup xác nhận xóa cứng tài khoản. Khi xác nhận, hệ thống xóa tài khoản trên hệ thống và xóa đồng thời toàn bộ dữ liệu cấu hình liên quan tới người dùng đó, không kiểm tra điều kiện chặn. |
| 9   | Click dòng dữ liệu | Row Click     | Khi click vào bất kỳ dòng dữ liệu nào trên lưới danh sách Cán bộ (ngoại trừ khi click trực tiếp vào các Icon chức năng tại cột Thao tác), hệ thống sẽ mở màn hình xem chi tiết[UC595.07 - Xem chi tiết tài khoản cán bộ](#uc59507---xem-chi-tiet-tai-khoan-can-bo).                                                                                                                                                                                                                                                                                                          |

**Quy tắc kiểm tra dữ liệu Import (Ma trận Ràng buộc)**:

**A. Ma trận Ràng buộc dữ liệu tải lên (Import Danh sách Tài khoản):**
*(Cơ chế Import chung của hệ thống được áp dụng theo **Mục 3.3.1. Quy chuẩn xử lý tính năng Import File**. Dưới đây là Ràng buộc cụ thể cho file Tài khoản).*

| Cột trong Excel | Tên Cột (Header)      | Kiểu Dữ liệu | Bắt buộc         | Độ dài Max | Quy tắc Ràng buộc đặc thù (Nghiệp vụ / Validate)                                                                                                                                                                                                                 | Thông báo lỗi cụ thể (Nếu vi phạm)                                                                                                                                                                                                                                                  |
| :--------------- | :---------------------- | :-------------- | :----------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A**      | Email / Tên đăng nhập | String(255) | **Có** | 100 | \- **Định dạng:** Phải đúng định dạng chuẩn Email.<br>- **Trùng lặp:** Không được trùng lặp.<br>- Hệ thống dùng chính Email làm Tên đăng nhập, không import một cột Tên đăng nhập riêng. | `Dòng [X]: Email không được để trống.<br>``Dòng [X]: Email sai định dạng.<br>``Dòng [X]: Email đã tồn tại trong hệ thống.<br>``Dòng [X]: Email vượt quá 100 ký tự.` |
| **B**      | Họ và tên            | String(100) | **Có**      | 255           | Không có ràng buộc đặc thù.                                                                                                                                                                                                                                       | `Dòng [X]: Họ và tên không được để trống.<br>``Dòng [X]: Họ và tên vượt quá 255 ký tự.`                                                                                                                                                                            |
| **C**      | Số điện thoại | String(20) | **Có** | 10 | \- **Định dạng:** Phải là số điện thoại hợp lệ.<br>- **Trùng lặp:** Không được trùng lặp. | `Dòng [X]: Số điện thoại không được để trống.<br>``Dòng [X]: Số điện thoại sai định dạng.<br>``Dòng [X]: Số điện thoại đã tồn tại.<br>``Dòng [X]: Số điện thoại vượt quá 10 ký tự.` |
| **D**      | Mã Đơn vị           | String(50) | **Có**      | 50            | \- **Độ dài:** Tối đa 50 ký tự.<br>- **Tham chiếu:** Phải tồn tại Mã Đơn vị trong danh mục.<br>- **Phân cấp:** Đơn vị phải thuộc cấp quản lý của NSD thực hiện import trở xuống (không được vượt cấp). | Dòng [X]: Mã Đơn vị không được để trống.<br>Dòng [X]: Mã Đơn vị vượt quá 50 ký tự.<br>Dòng [X]: Mã Đơn vị không tồn tại trong hệ thống.<br>Dòng [X]: Đơn vị vượt quá phạm vi phân cấp quản lý của tài khoản thực hiện import. |
| **E**      | Mã Phòng ban          | String(50) | **Không**   | 50            | \- **Độ dài:** Tối đa 50 ký tự.<br>- **Tham chiếu:** Nếu nhập, phải tồn tại Mã Phòng ban thuộc Đơn vị.                                                                                                                               | Dòng [X]: Mã Phòng ban vượt quá 50 ký tự.<br>Dòng [X]: Mã Phòng ban không tồn tại trong Đơn vị đã chọn.                                                                                                                                                            |
| **F**      | Mã Chức vụ           | String(50) | **Không**   | 50            | \- **Độ dài:** Tối đa 50 ký tự.<br>- **Tham chiếu:** Nếu nhập, phải tồn tại Mã Chức vụ trong danh mục.                                                                                                                                 | Dòng [X]: Mã Chức vụ vượt quá 50 ký tự.<br>Dòng [X]: Mã Chức vụ không tồn tại.                                                                                                                                                                                         |
| **G**      | Mã Nhóm người dùng | String(50) | **Không\*** | 255           | \- **Tham chiếu:** Mã phải tồn tại trong danh mục Nhóm người dùng.<br>- **Định dạng:** Cho phép nhập nhiều mã, phân cách bằng dấu chấm phẩy (`;`). Các khoảng trắng thừa sẽ tự động được loại bỏ.                 | `Dòng [X]: Mã Nhóm người dùng không tồn tại trong hệ thống.<br>``Dòng [X]: Mã Nhóm người dùng vượt quá 255 ký tự.`                                                                                                                                               |
| **H**      | Mã Vai trò            | Enum(String(50)) | **Không\*** | 255           | \- **Tham chiếu:** Mã phải tồn tại trong danh mục Vai trò.<br>- **Định dạng:** Cho phép nhập nhiều mã, phân cách bằng dấu chấm phẩy (`;`). Các khoảng trắng thừa sẽ tự động được loại bỏ.                            | `Dòng [X]: Mã Vai trò không tồn tại trong hệ thống.<br>``Dòng [X]: Mã Vai trò vượt quá 255 ký tự.`                                                                                                                                                                     |

(*): Bắt buộc phải nhập ít nhất một trong hai cột: Mã Nhóm người dùng hoặc Mã Vai trò (không được bỏ trống cả hai).

##### 4.3.1.3.2. UC595.02 - Thêm mới tài khoản cán bộ

###### 4.3.1.3.2.1. Mục đích

\- Thêm mới tài khoản cán bộ.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.3.2.2. UC595.02.MH01 - Màn hình Thêm mới tài khoản cán bộ

**Màn hình**:

\- Màn hình nhập liệu thông tin tài khoản dạng Modal (Popup) hoặc Split-view.

**Mô tả thông tin trên màn hình**:

| Trường thông tin        | Kiểu dữ liệu        | Bắt buộc | Mặc định | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------------- | :--------------------- | :--------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Họ và tên               | String(255) | Có        | Trống      | Tên đầy đủ của cán bộ. Loại bỏ khoảng trắng thừa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Email                      | String(100) | Có        | Trống      | Địa chỉ email của cán bộ. Bắt buộc đúng định dạng Regex:`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`. Kiểm tra trùng lặp trên toàn hệ thống. |
| Tên đăng nhập          | String(255) | Có        | Tự động lấy theo Email | Control UI: Hiển thị/Read-only.<br>Hệ thống tự động lấy giá trị từ trường Email làm Tên đăng nhập, không cho phép quản trị nhập hoặc sửa trực tiếp. Khi Email thay đổi trước khi lưu, Tên đăng nhập tự cập nhật theo Email. |
| Số điện thoại          | String(10) | Có        | Trống      | Số điện thoại liên hệ của cán bộ. Kiểm tra trùng lặp. Bắt buộc đúng 10 chữ số, bắt đầu bằng số 0 và đi kèm các đầu số mạng di động hợp lệ của Việt Nam. Regex:`/^0[35789]\d{8}$/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Đơn vị                  | Enum(String(100)) | Có        | Trống      | Control UI: Hộp chọn.<br>**Phân quyền theo cấp đơn vị:**<br>- Chỉ hiển thị và cho phép lựa chọn các Đơn vị trực thuộc phạm vi quản lý của người dùng đang thực hiện (gồm Đơn vị của chính người dùng đang đăng nhập và các Đơn vị cấp dưới trực thuộc).<br>- Hệ thống tuyệt đối không hiển thị và không cho phép lựa chọn các Đơn vị cấp trên hoặc các Đơn vị cùng cấp khác.<br>- Dữ liệu hiển thị dưới dạng sơ đồ cơ cấu tổ chức phân cấp (Tree-Select).<br>- Hỗ trợ gõ từ khóa lọc và tìm kiếm nhanh. |
| Phòng ban                 | Enum(String(50)) | Không     | Trống      | Control UI: Hộp chọn.<br>**Theo Đơn vị đã chọn:**<br>- Chỉ hiển thị danh sách các Phòng ban trực thuộc Đơn vị đã chọn ở trên.<br>- Dữ liệu tự động reload khi Đơn vị thay đổi.<br>- Hỗ trợ gõ từ khóa lọc và tìm kiếm nhanh theo Tên phòng ban. |
| Chức vụ                  | Enum(String(50)) | Không     | Trống      | Control UI: Hộp chọn.<br>Chọn từ Danh mục Chức vụ. |
| Nhóm người sử dụng    | Enum(String(50)) | Không*    | Trống      | Control UI: Hộp chọn.<br>Hiển thị danh sách nhóm người dùng tương ứng với Loại đơn vị đã chọn. |
| Vai trò                   | Enum(String(50)) | Không*    | Trống      | Control UI: Hộp chọn.<br>Hiển thị danh sách vai trò tương ứng với Loại đơn vị đã chọn. |
| Cây quyền hạn (Preview) | Date | \- | \- | Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)** để xem trước các quyền mà tài khoản cán bộ sở hữu:<br>- **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng được gán thông qua các Nhóm người sử dụng hoặc Vai trò được tích chọn. Các quyền khác không được chọn sẽ bị ẩn đi khỏi cây.<br>- **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà các Nhóm người sử dụng hoặc Vai trò được chọn có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào hoàn toàn không được chọn quyền sẽ không hiển thị làm node gốc trên cây.<br>- **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>- **Logic tích chọn tự động (Preview)**: Khi người dùng chọn/bỏ chọn các Nhóm người sử dụng hoặc Vai trò tại dropdown tương ứng, hệ thống sẽ tự động tính toán cộng dồn (Union) các quyền tương ứng của chúng để hiển thị và tích chọn các node trên cây tương ứng trong thời gian thực (Real-time). Các quyền không được chọn sẽ tự động ẩn đi khỏi cây. |

> [!NOTE]
> **Về Cây quyền hạn (Preview):** Cây phân quyền hiển thị trên form Thêm mới tài khoản cán bộ hoàn toàn là **Chỉ đọc (Read-only)**. Người dùng **không được phép trực tiếp chỉnh sửa** (tích/bỏ tích) các checkbox trên cây này. Việc phân quyền cho cán bộ bắt buộc phải thực hiện thông qua việc gán Nhóm người sử dụng hoặc Vai trò.

**Chức năng trên màn hình**:

| STT | Tên chức năng        | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-- | :---------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Hủy                    | Nút         | Đóng màn hình, không lưu thông tin.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2   | Lưu & Cấp tài khoản | Nút         | Khi click, hệ thống thực hiện validate dữ liệu trên form chính:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|     |                         |              | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi "Vui lòng nhập thông tin bắt buộc".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|     |                         |              | \- TH2 (Bỏ trống cả Nhóm người dùng và Vai trò): Hiển thị cảnh báo lỗi: "Vui lòng chọn ít nhất một trong hai trường Nhóm người dùng hoặc Vai trò".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|     |                         |              | \- TH3 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|     |                         |              | \- TH4 (Trùng lặp): Nếu Email/SĐT bị trùng, báo lỗi "[tên trường] đã tồn tại trên hệ thống". Tên đăng nhập được kiểm tra trùng theo chính giá trị Email. |
|     |                         |              | \- TH Hợp lệ:<br>&nbsp;&nbsp;\+ Hệ thống tự động gán "Loại tài khoản" tương ứng với Đơn vị đã chọn: là 'Cán bộ' (nếu Loại đơn vị của Đơn vị đã chọn là 'Nội bộ') hoặc 'Cơ quan có thẩm quyền' (nếu Loại đơn vị là 'Cơ quan ngoài ngành').<br>&nbsp;&nbsp;\+ Hệ thống tự động sinh ngẫu nhiên mật khẩu khởi tạo tuân thủ theo [quy tắc phức tạp mật khẩu cấu hình tại UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong).<br>&nbsp;&nbsp;\+ Thực hiện mã hóa băm một chiều kết hợp với chuỗi Salt ngẫu nhiên được sinh riêng biệt cho tài khoản này và lưu vào hệ thống theo [Quy tắc bảo mật mật khẩu](#7-quy-tac-bao-mat--luu-tru-mat-khau).<br>&nbsp;&nbsp;\+ Gán trạng thái "Đang hoạt động" và bật cờ bắt buộc đổi mật khẩu ở lần đăng nhập đầu tiên.<br>&nbsp;&nbsp;\+ Gửi Email thông báo tạo tài khoản thành công kèm thông tin đăng nhập và mật khẩu khởi tạo dạng rõ tới cán bộ/cán bộ cơ quan có thẩm quyền.<br>&nbsp;&nbsp;\+ Hiển thị thông báo "Thêm mới tài khoản thành công" và đóng màn hình. |

##### 4.3.1.3.3. UC595.03 - Sửa thông tin tài khoản cán bộ

###### 4.3.1.3.3.1. Mục đích

\- Sửa đổi thông tin của tài khoản cán bộ hiện có trên hệ thống.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.3.3.2. UC595.03.MH01 - Màn hình Sửa thông tin tài khoản cán bộ

**Màn hình**:

\- Màn hình sửa thông tin dưới dạng Popup Modal, dữ liệu được tự động tải sẵn từ bản ghi hiện hành.

**Mô tả thông tin trên màn hình**:

| Trường thông tin        | Kiểu dữ liệu        | Bắt buộc | Mặc định   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------- | :--------------------- | :--------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Họ và tên               | String(255) | Có        | Theo bản ghi | Cho phép cập nhật.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Email                      | String(100) | Có        | Theo bản ghi | Cho phép cập nhật. Kiểm tra trùng lặp (loại trừ chính tài khoản này). Bắt buộc đúng định dạng Regex:`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`. |
| Tên đăng nhập          | String(255) | Có        | Theo Email | Control UI: Hiển thị/Read-only.<br>Tên đăng nhập tự động lấy theo Email và không cho phép sửa trực tiếp. Khi lưu cập nhật Email, hệ thống cập nhật đồng thời Tên đăng nhập theo Email. |
| Số điện thoại          | String(10) | Có        | Theo bản ghi | Cho phép cập nhật. Kiểm tra trùng lặp (loại trừ chính tài khoản này). Bắt buộc đúng 10 chữ số, bắt đầu bằng số 0 và đi kèm các đầu số mạng di động hợp lệ của Việt Nam. Regex:`/^0[35789]\d{8}$/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Đơn vị                  | Enum(String(100)) | Có        | Theo bản ghi | Control UI: Hộp chọn.<br>**Phân quyền theo cấp đơn vị:**<br>- Chỉ hiển thị và cho phép lựa chọn các Đơn vị trực thuộc phạm vi quản lý của người dùng đang thực hiện (gồm Đơn vị của chính người dùng đang đăng nhập và các Đơn vị cấp dưới trực thuộc).<br>- Hệ thống tuyệt đối không hiển thị và không cho phép lựa chọn các Đơn vị cấp trên hoặc các Đơn vị cùng cấp khác.<br>- Dữ liệu hiển thị dưới dạng sơ đồ cơ cấu tổ chức phân cấp (Tree-Select).<br>- Hỗ trợ gõ từ khóa lọc và tìm kiếm nhanh. |
| Phòng ban                 | Enum(String(50)) | Không     | Theo bản ghi | Control UI: Hộp chọn.<br>**Theo Đơn vị đã chọn:**<br>- Chỉ hiển thị danh sách các Phòng ban trực thuộc Đơn vị đã chọn ở trên.<br>- Dữ liệu tự động reload khi Đơn vị thay đổi.<br>- Hỗ trợ gõ từ khóa lọc và tìm kiếm nhanh theo Tên phòng ban. |
| Chức vụ                  | Enum(String(50)) | Không     | Theo bản ghi | Control UI: Hộp chọn.<br>Cho phép thay đổi. |
| Nhóm người sử dụng    | Enum(String(50)) | Không*    | Theo bản ghi | Control UI: Hộp chọn.<br>Hiển thị danh sách nhóm người dùng tương ứng với Loại đơn vị đã chọn. |
| Vai trò                   | Enum(String(50)) | Không*    | Theo bản ghi | Control UI: Hộp chọn.<br>Hiển thị danh sách vai trò tương ứng với Loại đơn vị đã chọn. |
| Cây quyền hạn (Preview) | Date | \- | \- | Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)** để xem trước các quyền mà tài khoản cán bộ sở hữu:<br>- **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng được gán thông qua các Nhóm người sử dụng hoặc Vai trò được tích chọn. Các quyền khác không được chọn sẽ bị ẩn đi khỏi cây.<br>- **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà các Nhóm người sử dụng hoặc Vai trò được chọn có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào hoàn toàn không được chọn quyền sẽ không hiển thị làm node gốc trên cây.<br>- **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>- **Logic tích chọn tự động (Preview)**: Khi người dùng chọn/bỏ chọn các Nhóm người sử dụng hoặc Vai trò tại dropdown tương ứng, hệ thống sẽ tự động tính toán cộng dồn (Union) các quyền tương ứng của chúng để hiển thị và tích chọn các node trên cây tương ứng trong thời gian thực (Real-time). Các quyền không được chọn sẽ tự động ẩn đi khỏi cây. |

> [!NOTE]
> **Về Cây quyền hạn (Preview):** Cây phân quyền hiển thị trên form Sửa thông tin tài khoản cán bộ hoàn toàn là **Chỉ đọc (Read-only)**. Người dùng **không được phép trực tiếp chỉnh sửa** (tích/bỏ tích) các checkbox trên cây này. Việc phân quyền cho cán bộ bắt buộc phải thực hiện thông qua việc gán Nhóm người sử dụng hoặc Vai trò.

**Chức năng trên màn hình**:

| STT | Tên chức năng      | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :-- | :-------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Đặt lại mật khẩu | Nút         | Nút tiện ích trên form sửa. Mở popup Đặt lại mật khẩu (Chi tiết xem tại Mục**4.3.1.4.6. UC595.06 - Đặt lại mật khẩu**).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 3   | Hủy                  | Nút         | Đóng màn hình, không lưu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2   | Lưu cập nhật       | Nút         | Cập nhật thông tin vào CSDL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|     |                       |              | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi "Vui lòng nhập thông tin bắt buộc".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|     |                       |              | \- TH2 (Bỏ trống cả Nhóm người dùng và Vai trò): Hiển thị cảnh báo lỗi: "Vui lòng chọn ít nhất một trong hai trường Nhóm người dùng hoặc Vai trò".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|     |                       |              | \- TH3 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|     |                       |              | \- TH4 (Trùng lặp): Nếu Email/SĐT bị trùng với tài khoản khác, báo lỗi "[tên trường] đã tồn tại trên hệ thống".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|     |                       |              | \- TH Hợp lệ:<br>&nbsp;&nbsp;\+ Hệ thống thực hiện cập nhật thông tin thay đổi của cán bộ.<br>&nbsp;&nbsp;\+ **Trường hợp thay đổi Đơn vị:** Hệ thống tự động cập nhật lại **Loại tài khoản** tương ứng: là 'Cán bộ' (nếu Loại đơn vị của Đơn vị mới chọn là 'Nội bộ') hoặc 'Cơ quan có thẩm quyền' (nếu Loại đơn vị mới là 'Cơ quan ngoài ngành'), đồng thời reload danh sách nhóm/vai trò áp dụng và thu hồi các nhóm/vai trò cũ không còn phù hợp.<br>&nbsp;&nbsp;\+ Ghi nhận lịch sử Audit Log (Người thực hiện, Ngày thực hiện, Tên đăng nhập được sửa, Loại hành động: "Cập nhật thông tin cán bộ").<br>&nbsp;&nbsp;\+ Hiển thị thông báo "Cập nhật thông tin thành công" và đóng màn hình. |

##### 4.3.1.3.4. UC595.04 - Khóa tài khoản cán bộ

###### 4.3.1.3.4.1. Mục đích

\- Thay đổi trạng thái khóa/mở khóa tài khoản cán bộ.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.3.4.2. UC595.04.MH01 - Màn hình Khóa tài khoản cán bộ

**Màn hình**:

\- Popup xác nhận thao tác khóa tài khoản.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                            |
| :--------------------- | :-------------- | :--------- | :---------- | :--------------------------------------------------------------------------------- |
| Thông báo xác nhận | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>Hiển thị: "Bạn có chắc chắn muốn thay đổi trạng thái tài khoản này?" |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                   |
| :-- | :--------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Đồng ý        | Nút         | \- Hợp lệ: Đổi trạng thái (Đang hoạt động <-> Bị khóa). Hiển thị thông báo: "Cập nhật trạng thái thành công". (Tài khoản bị khóa sẽ không thể đăng nhập). |
| 2   | Hủy             | Nút         | Đóng Popup, hủy thao tác.                                                                                                                                                             |

##### 4.3.1.3.4A. UC595.04A - Đóng tài khoản cán bộ

###### 4.3.1.3.4A.1. Mục đích

\- Chuyển tài khoản cán bộ sang trạng thái `Đóng` khi không còn nhu cầu sử dụng nhưng vẫn cần lưu vết tài khoản trên hệ thống.

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.

###### 4.3.1.3.4A.2. UC595.04A.MH01 - Màn hình Đóng tài khoản cán bộ

**Màn hình**:

\- Popup xác nhận thao tác đóng tài khoản.

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :-- | :-- | :-- | :-- | :-- |
| Thông báo xác nhận | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>Hiển thị: "Bạn có chắc chắn muốn đóng tài khoản này không?" |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :-- | :-- | :-- |
| 1 | Đồng ý | Nút | Chuyển trạng thái tài khoản sang `Đóng`, thu hồi quyền đăng nhập, ghi nhận Audit Log và hiển thị thông báo "Đóng tài khoản thành công". |
| 2 | Hủy | Nút | Đóng popup, hủy thao tác. |

##### 4.3.1.3.5. UC595.05 - Xóa tài khoản cán bộ

###### 4.3.1.3.5.1. Mục đích

\- Xóa tài khoản cán bộ khỏi hệ thống.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.3.5.2. UC595.05.MH01 - Màn hình Xóa tài khoản cán bộ

**Màn hình**:

\- Popup xác nhận thao tác xóa tài khoản.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                   |
| :--------------------- | :-------------- | :--------- | :---------- | :-------------------------------------------------------------------------------------------------------- |
| Thông báo xác nhận | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>Hiển thị: "Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác!" |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                     |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Đồng ý        | Nút         | Hệ thống xóa cứng tài khoản cán bộ khỏi hệ thống, đồng thời xóa toàn bộ dữ liệu cấu hình liên quan tới người dùng đó như gán nhóm người dùng, gán vai trò, phiên đăng nhập, token, thiết lập cá nhân. Không kiểm tra điều kiện chặn. Sau khi xóa, hiển thị thông báo "Xóa tài khoản thành công" và tải lại danh sách. |
| 2   | Hủy             | Nút         | Đóng Popup, hủy thao tác.                                                                                                                                                                                               |

##### 4.3.1.3.6. UC595.06 - Đặt lại mật khẩu

###### 4.3.1.3.6.1. Mục đích

\- Cho phép Quản trị hệ thống tự nhập mật khẩu mới cho tài khoản cán bộ theo quy tắc mật khẩu chung của hệ thống.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.3.6.2. UC595.06.MH01 - Màn hình Đặt lại mật khẩu

**Màn hình**:
\- Popup nhập mật khẩu mới.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                     |
| :--------------------- | :-------------- | :--------- | :---------- | :---------------------------------------------------------------------------------------------------------- |
| Tên đăng nhập | String(255) | Không | Theo bản ghi | Control UI: Hiển thị/Read-only. |
| Mật khẩu mới | Password | Có | Trống | Quản trị nhập mật khẩu mới. Mật khẩu phải tuân thủ quy tắc phức tạp mật khẩu cấu hình tại UC561. |
| Nhập lại mật khẩu mới | Password | Có | Trống | Phải trùng khớp với trường Mật khẩu mới. |
| Yêu cầu đổi mật khẩu khi đăng nhập lần tiếp theo | Boolean | Không | Có | Control UI: Checkbox. Mặc định được tích chọn. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-- | :--------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Lưu mật khẩu mới | Nút | Kiểm tra mật khẩu mới và nhập lại mật khẩu mới không được bỏ trống, phải trùng khớp và tuân thủ quy tắc mật khẩu chung tại UC561. Nếu hợp lệ, hệ thống mã hóa băm một chiều kết hợp Salt ngẫu nhiên và lưu mật khẩu mới; cập nhật cờ yêu cầu đổi mật khẩu theo lựa chọn trên popup; ghi nhận Audit Log thao tác đặt lại mật khẩu; hiển thị thông báo "Đặt lại mật khẩu thành công" và đóng popup. Không gửi mật khẩu qua Email. |
| 2   | Hủy             | Nút         | Đóng Popup, hủy thao tác.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

##### 4.3.1.3.7. UC595.07 - Xem chi tiết tài khoản cán bộ

###### 4.3.1.3.7.1. Mục đích

\- Xem thông tin chi tiết của một tài khoản cán bộ ở chế độ chỉ đọc. **Phân quyền dữ liệu:** Người dùng chỉ có quyền xem chi tiết các tài khoản thuộc Đơn vị mình trực thuộc và các Đơn vị trực thuộc cấp dưới, tuyệt đối không cho phép truy cập thông tin tài khoản của Đơn vị cấp trên hoặc Đơn vị cùng cấp khác.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.3.7.2. UC595.07.MH01 - Màn hình Xem chi tiết tài khoản cán bộ

**Màn hình**:
\- Giao diện dạng Popup Modal, toàn bộ các trường thông tin ở trạng thái chỉ đọc (Read-only).

**Mô tả thông tin trên màn hình**:

| Trường thông tin     | Kiểu dữ liệu | Bắt buộc | Mặc định   | Mô tả                                                                                          |
| :---------------------- | :-------------- | :--------- | :------------ | :----------------------------------------------------------------------------------------------- |
| Họ và tên            | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Tên đầy đủ của cán bộ. |
| Tên đăng nhập       | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Tên đăng nhập của cán bộ. |
| Email                   | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Địa chỉ email của cán bộ. |
| Số điện thoại       | String(20) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Số điện thoại của cán bộ. |
| Đơn vị               | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Đơn vị trực thuộc. |
| Phòng ban              | String(255) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Phòng ban trực thuộc. Chỉ hiển thị trường này nếu có dữ liệu gốc. |
| Chức vụ               | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Chức vụ của cán bộ. Chỉ hiển thị trường này nếu có dữ liệu gốc. |
| Nhóm người sử dụng | String(100) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Danh sách nhóm người dùng đã gán. Chỉ hiển thị trường này nếu có dữ liệu gốc. |
| Vai trò                | Enum(String(50)) | \- | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Danh sách vai trò đã gán. Chỉ hiển thị trường này nếu có dữ liệu gốc. |
| Cây quyền hạn        | Boolean | \- | Theo bản ghi | Control UI: Checkbox.<br>Hiển thị cây danh mục quyền phân cấp (Cha - Con) dưới dạng **chỉ đọc (Read-only)**, tổng hợp tất cả các quyền được cộng dồn từ Nhóm người sử dụng và Vai trò mà tài khoản sở hữu:<br>- **Logic hiển thị (Chỉ hiển thị quyền được chọn)**: Cây chỉ hiển thị những quyền/chức năng mà tài khoản cán bộ này sở hữu (được cộng dồn từ danh sách Nhóm người sử dụng và Vai trò đang gán). Các quyền khác không được phân cho tài khoản sẽ bị ẩn đi khỏi cây.<br>- **Nhánh gốc cao nhất (Root nodes)**: Chỉ hiển thị các phân hệ chính mà tài khoản có quyền truy cập (tối đa 3 phân hệ: **Website Khách hàng**, **Ứng dụng Mobile**, **Website quản trị**). Phân hệ nào tài khoản không có quyền sẽ không hiển thị làm node gốc trên cây.<br>- **Định dạng hiển thị node**: Checkbox chỉ đọc (luôn ở trạng thái tích chọn) + Icon (Thư mục đối với MENU, Chìa khóa đối với API) + Tên chức năng (Mã chức năng).<br>- **Logic hiển thị (Quyền cộng dồn)**: Hệ thống tự động gộp/cộng dồn (Union) tất cả các quyền của tất cả các Nhóm người sử dụng và Vai trò đang gán cho tài khoản này để hiển thị các node tương ứng trên cây. |

> [!NOTE]
> **Nguyên tắc hiển thị thông tin không bắt buộc trên màn hình Xem chi tiết**:
>
> - Các trường không bắt buộc ở form Thêm mới gồm: `Phòng ban`, `Chức vụ`, `Nhóm người sử dụng` và `Vai trò`.
> - Trên giao diện Xem chi tiết tài khoản cán bộ, hệ thống kiểm tra dữ liệu gốc của các trường này. Nếu trường nào không có dữ liệu (trống), hệ thống tự động ẩn toàn bộ dòng/trường đó để đảm bảo tính tối giản, sạch sẽ cho giao diện, tránh hiển thị các dòng trống không cần thiết.

###### 4.3.1.3.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                  |
| :-- | :--------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Đóng           | Button       | Đóng Popup Modal xem chi tiết.                                                                                                                                                        |
| 2   | Chỉnh sửa      | Button       | Đóng popup xem chi tiết và chuyển sang màn hình Sửa thông tin tài khoản cán bộ ([UC595.03 - Sửa thông tin tài khoản cán bộ](#uc59503---sua-thong-tin-tai-khoan-can-bo)). |
