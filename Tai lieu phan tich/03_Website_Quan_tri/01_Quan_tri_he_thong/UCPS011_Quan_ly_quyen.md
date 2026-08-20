#### 4.3.1.11. UCPS011 - Quản lý quyền

##### 4.3.1.11.1. Mục đích

\- Cho phép Quản trị viên hệ thống (QTHT) quản lý, thiết lập danh sách các quyền và chức năng con (dưới dạng cây phân cấp) trên hệ thống cho từng Phân hệ cụ thể (Website Khách hàng, Ứng dụng Mobile, Website quản trị).  
\- Hỗ trợ định nghĩa cấu trúc menu hiển thị (MENU) và các quyền thực thi tính năng/API chi tiết (API) làm cơ sở dữ liệu để thực hiện phân quyền cho các Vai trò ([UC600](UC600_Quan_ly_vai_tro.md)) và Nhóm người dùng ([UC603](UC603_Nhom_nguoi_dung.md)).

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập thành công vào Website quản trị bằng tài khoản có vai trò Quản trị hệ thống.

##### 4.3.1.11.2. UCPS011.MH01 - Màn hình Quản lý quyền

###### 4.3.1.11.2.1. Màn hình

\- Giao diện màn hình dạng Split-view gồm hai phần (2 Panel):  
  \+ **Panel bên trái**: Gồm Dropdown lựa chọn Phân hệ, Textbox Tìm kiếm quyền theo tên và Cây danh sách quyền chức năng hiện có của phân hệ tương ứng.  
  \+ **Panel bên phải**: Khối hiển thị chi tiết thông tin và thực hiện các nghiệp vụ Xem, Thêm mới, Thêm con, Sửa, Xóa tương ứng với nút chức năng hoặc phần tử được chọn ở Panel trái.  
\- Giao diện có 2 trạng thái chính ở Panel bên phải:  
  \+ **Trạng thái Chưa chọn quyền chức năng (Chưa chọn node cây)**:  
![Giao diện Quản lý quyền khi chưa chọn node](images/UCPS011.MH01_Unselected.png)  
  \+ **Trạng thái Đã chọn quyền chức năng (Đã chọn node cây)**:  
![Giao diện Quản lý quyền khi đã chọn node](images/UCPS011.MH01_Selected.png)

###### 4.3.1.11.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. PANEL BÊN TRÁI** | | | | |
| Dropdown Phân hệ | Enum(String(50)) | Có | Website quản trị | Control UI: Hộp chọn.<br>Lựa chọn phân hệ của hệ thống để hiển thị cây quyền tương ứng, gồm:<br>- Website Khách hàng<br>- Ứng dụng Mobile<br>- Website quản trị |
| Tìm kiếm quyền | String(255) | Không | Trống | Control UI: Textbox.<br>Tìm kiếm trực tiếp (Live-search) theo tên quyền hoặc mã quyền hiển thị ở cây danh sách phía dưới. |
| Danh sách quyền chức năng | String(255) | \- | \- | Hiển thị danh sách quyền dưới dạng cây phân cấp (Cha - Con).<br>Mỗi node hiển thị gồm: Icon đại diện + Tên chức năng (Mã chức năng).<br>Ví dụ: `Dashboard (00)`, `Quản lý danh mục & đồng bộ (03)`. |
| **II. PANEL BÊN PHẢI** | | | | |
| **Trạng thái chưa chọn node** | | | | |
| Chọn chức năng bên trái... | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>Hiển thị dòng chữ cảnh báo: "Chọn một chức năng bên trái để xem chi tiết hoặc thêm mới". |
| THÊM MỚI | - | \- | \- | Control UI: Nút bấm.<br>Nút bấm để chuyển sang Form nhập liệu thêm mới chức năng gốc (Root - không có cha). |
| **Trạng thái đã chọn node** | | | | |
| THÊM CON | - | \- | \- | Control UI: Nút bấm.<br>Nút bấm để chuyển sang Form nhập liệu thêm mới chức năng con trực thuộc chức năng đang chọn. |
| XÓA | - | \- | \- | Control UI: Nút bấm.<br>Nút bấm để thực hiện xóa chức năng đang chọn. |
| SỬA | - | \- | \- | Control UI: Nút bấm.<br>Nút bấm để chuyển thông tin chi tiết của node đang chọn sang chế độ chỉnh sửa (Form nhập liệu). |
| Phân hệ | String(255) | Có | Lấy theo Dropdown Phân hệ ở Panel trái | Control UI: Hiển thị/Read-only.<br>Hiển thị phân hệ tương ứng đang chọn ở Panel trái. Không cho phép thay đổi. |
| Mã chức năng cha | String(50) | Không | Trống | Control UI: Hiển thị/Read-only.<br>\- Khi thêm mới chức năng cha (Root): Để trống.<br>\- Khi thêm con (chức năng con): Hệ thống tự động lấy giá trị từ trường "Mã chức năng" của node cha đang chọn và hiển thị dạng Read-only. |
| Mã chức năng | String(50) | Có | Trống | Nhập mã định danh duy nhất của chức năng. Chỉ cho phép nhập chữ cái không dấu, chữ số, ký tự gạch dưới (_).<br>*(Lưu ý: Bị khóa Read-only khi ở chế độ Xem chi tiết hoặc Sửa thông tin).* |
| Tên chức năng | String(255) | Có | Trống | Nhập tên chức năng hiển thị bằng tiếng Việt. |
| Tên chức năng (EN) | String(255) | Không | Trống | Nhập tên chức năng hiển thị bằng tiếng Anh. |
| Loại | Enum(String(50)) | Có | MENU | Control UI: Hộp chọn.<br>Lựa chọn loại chức năng, gồm:<br>- **MENU**: Là chức năng giao diện, hiển thị thành các danh mục điều hướng trên thanh Menu chính.<br>- **API**: Tính năng nghiệp vụ/Endpoint API chạy ngầm thuộc chức năng đó. |
| STT | Integer(10) | Không | Trống | Số thứ tự dùng để sắp xếp hiển thị trên cây và trên Menu. Hệ thống tự động sinh số lớn nhất tiếp theo nếu để trống. |
| Đường dẫn | String(500) | Không | Trống | Đường dẫn (Route/URL) trỏ đến tính năng tương ứng trong sourcecode hoặc endpoint gọi API (Ví dụ: `/api/users`). |
| Icon menu | String(100) | Không | Trống | Nhập tên Class icon hiển thị trên Menu (sử dụng thư viện `react-icons`, ví dụ: `io:IoIosPeople`). |
| Trạng thái | Boolean | Có | Hoạt động | Control UI: Checkbox.<br>Trạng thái hoạt động của chức năng, gồm:<br>- Hoạt động (Active)<br>- Ngừng hoạt động (Inactive) |
| LƯU | - | \- | \- | Control UI: Nút bấm.<br>Lưu dữ liệu đang nhập (Chỉ hiển thị khi thêm mới, thêm con hoặc sửa). |
| HỦY | - | \- | \- | Control UI: Nút bấm.<br>Hủy bỏ thay đổi và quay lại trạng thái trước đó (Chỉ hiển thị khi thêm mới, thêm con hoặc sửa). |

###### 4.3.1.11.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lọc theo phân hệ | Dropdown | \- Thao tác: QTHT chọn một phân hệ cụ thể từ Dropdown.<br>\- Xử lý: Hệ thống tải lại và hiển thị toàn bộ cây danh mục quyền của phân hệ tương ứng ở Panel trái. Panel bên phải tự động chuyển về trạng thái Chưa chọn node.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Tìm kiếm quyền | Textbox | \- Thao tác: QTHT nhập từ khóa vào ô Tìm kiếm quyền.<br>\- Xử lý: Hệ thống lọc trực tiếp (live-filter) trên cây danh sách quyền chức năng ở phía dưới theo Tên chức năng hoặc Mã chức năng chứa từ khóa. Tự động mở rộng (Expand) các node cha nếu có node con khớp kết quả.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 3 | Chọn node xem chi tiết | Phần tử cây | \- Thao tác: QTHT click chuột chọn một chức năng trên Cây danh sách quyền.<br>\- Xử lý: Hệ thống lấy dữ liệu chi tiết của chức năng đó và hiển thị sang Panel phải ở chế độ Xem (Read-only), đồng thời hiển thị 3 nút thao tác: **THÊM CON**, **XÓA**, **SỬA**. |
| 4 | Thêm mới (Root) | Nút | \- Thao tác: Tại trạng thái chưa chọn node, QTHT nhấn nút **+ Thêm mới**.<br>\- Xử lý: Panel phải chuyển sang Form nhập liệu trống:<br>  + Trường `Phân hệ` được khóa cứng theo phân hệ đang chọn ở Panel trái.<br>  + Trường `Mã chức năng cha` để trống và bị khóa (Disabled).<br>  + Nút thao tác chuyển thành **LƯU** và **HỦY**. |
| 5 | Thêm con | Nút | \- Thao tác: Tại trạng thái đã chọn node, QTHT nhấn nút **+ Thêm con**.<br>\- Xử lý: Panel phải chuyển sang Form nhập liệu trống để thêm con:<br>  + Trường `Phân hệ` được khóa cứng theo phân hệ đang chọn.<br>  + Trường `Mã chức năng cha` tự động điền Mã chức năng của node cha đang chọn và bị khóa (Disabled).<br>  + Nút thao tác chuyển thành **LƯU** và **HỦY**. |
| 6 | Sửa | Nút | \- Thao tác: Tại trạng thái đã chọn node, QTHT nhấn nút **Sửa**.<br>\- Xử lý: Cho phép chỉnh sửa các thông tin hiện tại của chức năng đang chọn. Riêng trường `Phân hệ`, `Mã chức năng cha` và `Mã chức năng` bị khóa cứng không cho phép sửa đổi để đảm bảo tính toàn vẹn dữ liệu. Nút thao tác chuyển thành **LƯU** và **HỦY**. |
| 7 | Xóa | Nút | \- Thao tác: Tại trạng thái đã chọn node, QTHT nhấn nút **Xóa**.<br>\- Xử lý: Hệ thống hiển thị popup xác nhận: *"Bạn có chắc chắn muốn xóa chức năng [Tên chức năng]?"*.<br>\- Kiểm tra ràng buộc khi xóa:<br>  + **TH1 (Có chức năng con)**: Nếu chức năng đang chọn có chứa bất kỳ chức năng con nào trực thuộc trên cây, hệ thống chặn xóa và báo lỗi: *"Không thể xóa do chức năng này đang chứa các chức năng con. Vui lòng xóa các chức năng con trước."*.<br>  + **TH2 (Đang sử dụng)**: Nếu chức năng đang chọn đã được cấu hình gán cho bất kỳ Vai trò ([UC600](UC600_Quan_ly_vai_tro.md)) hoặc Nhóm người dùng ([UC603](UC603_Nhom_nguoi_dung.md)) nào, hệ thống chặn xóa và báo lỗi: *"Không thể xóa do chức năng đang được gán quyền cho người dùng/vai trò. Vui lòng gỡ cấu hình phân quyền trước khi thực hiện."*.<br>  + **TH Hợp lệ**: Tiến hành xóa bản ghi khỏi hệ thống, cập nhật lại cây danh sách bên trái và đưa Panel phải về trạng thái Chưa chọn node. Hiển thị Toast thông báo: *"Xóa chức năng thành công."* |
| 8 | Lưu | Nút | \- Thao tác: QTHT click nút **LƯU** sau khi nhập liệu Form.<br>\- Kiểm tra và xử lý:<br>  + **TH1 (Bỏ trống bắt buộc)**: Vi phạm quy tắc **[BR-VAL-001]**. Nếu bỏ trống trường Mã chức năng, Tên chức năng hoặc Loại, focus vào ô trống và báo lỗi **[MSG-ERR-VAL-001]**.<br>  + **TH2 (Định dạng mã sai)**: Nếu trường `Mã chức năng` chứa ký tự tiếng Việt, dấu cách hoặc ký tự đặc biệt khác ngoài chữ cái, chữ số, dấu gạch dưới, báo lỗi: *"Mã chức năng chỉ cho phép nhập ký tự không dấu, số và ký tự _"**.<br>  + **TH3 (Vượt quá độ dài)**: Nếu vượt quá độ dài tối đa cho phép của các trường thông tin (VD: Mã chức năng > 50 ký tự, Tên chức năng > 255 ký tự...), báo lỗi tương ứng.<br>  + **TH4 (Trùng dữ liệu)**: Vi phạm quy tắc **[BR-VAL-009]**. Kiểm tra trùng khóa `Mã chức năng` hoặc `Tên chức năng` trong cùng một Phân hệ. Nếu trùng, hệ thống hiển thị thông báo lỗi **[MSG-ERR-VAL-009]**.<br>  + **TH Hợp lệ**: Cập nhật/Thêm mới thông tin vào CSDL, làm mới cây danh sách bên trái và hiển thị Toast thông báo thành công: *"Lưu thông tin chức năng thành công."*. Chuyển Panel phải về trạng thái Xem chi tiết bản ghi vừa lưu. <br> - Nếu Quyền mới thêm thuộc loại Menu, thì hệ thống tự động hiển thị Menu chức năng tương ứng với dữ liệu vừa thêm. | 9 | Hủy | Nút | \- Thao tác: QTHT click nút **HỦY** trên Form nhập liệu.<br>\- Xử lý: Hủy bỏ toàn bộ dữ liệu đang chỉnh sửa hoặc nhập dở dang. Đưa Panel phải quay lại trạng thái trước đó (nếu đang Sửa thì về Xem chi tiết node hiện tại; nếu đang Thêm mới/Thêm con thì về trạng thái Chưa chọn node hoặc Xem chi tiết node trước đó). |
