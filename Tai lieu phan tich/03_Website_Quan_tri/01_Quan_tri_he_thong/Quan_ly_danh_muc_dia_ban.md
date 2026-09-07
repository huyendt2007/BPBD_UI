#### 4.3.1.8. Quản lý danh mục Địa bàn (Đơn vị hành chính)

##### 4.3.1.8.1. Mục đích
Quản lý danh mục địa bàn, đơn vị hành chính phân cấp của hệ thống, bao gồm:
- Tra cứu, tìm kiếm đơn vị hành chính theo mã và tên theo cấu trúc cây phân cấp (Tỉnh/Thành phố $\rightarrow$ Xã/Phường/Thị trấn).
- Thêm mới, chỉnh sửa thông tin đơn vị hành chính, xác lập quan hệ cấp trên - cấp dưới, ngày thành lập và giải thể.
- Theo dõi lịch sử biến động địa giới hành chính (sáp nhập, chia tách, giải thể, đổi tên) qua sơ đồ kế thừa và trục thời gian.
- Xóa đơn vị chưa phát sinh dữ liệu, kết xuất và nhận dữ liệu danh mục qua tệp Excel.

*a. Phân quyền*
- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
- Cán bộ quản trị đã đăng nhập thành công vào Website quản trị.
- Hệ thống hoạt động bình thường.

---

##### 4.3.1.8.2. MH01 - Màn hình Quản lý đơn vị hành chính

###### 4.3.1.8.2.1. Màn hình

![Màn hình Quản lý đơn vị hành chính - Tab Thông tin chung](images/MH_DanhMucDiaBan_01.png)

![Màn hình Quản lý đơn vị hành chính - Tab Lịch sử biến động](images/MH_DanhMucDiaBan_04_LichSuBienDong.png)

![Màn hình Quản lý đơn vị hành chính - Tab Dòng thời gian](images/MH_DanhMucDiaBan_05_DongThoiGian.png)

###### 4.3.1.8.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Panel bên trái: Cây đơn vị hành chính** | - | - | - | Khối tìm kiếm và cây phân cấp địa bàn hành chính. |
| Mã đơn vị (Tìm kiếm) | String(50) | Không | Trống | Control UI: Input text.<br>- Nhập mã đơn vị hành chính cần tìm kiếm (không phân biệt hoa thường). |
| Tên đơn vị (Tìm kiếm) | String(255) | Không | Trống | Control UI: Input text.<br>- Nhập tên đơn vị hành chính cần tìm kiếm (không phân biệt hoa thường/dấu tiếng Việt). |
| Mở rộng / Thu gọn cây | String(50) | - | - | Control UI: Button.<br>- Gồm 02 nút bấm: `Mở rộng` (mở toàn bộ các nhánh Cấp 1, Cấp 2) và `Thu gọn` (thu gọn chỉ giữ lại danh sách Cấp 1). |
| Cây đơn vị hành chính | Tree | - | Mở rộng sẵn Cấp 1 | Control UI: Cây phân cấp đa tầng (Hierarchical Tree View).<br>- Hiển thị cấu trúc cây gồm 2 cấp:<br>+ Cấp 1: Tỉnh / Thành phố trực thuộc Trung ương (Icon địa cầu).<br>+ Cấp 2: Phường / Xã / Thị trấn (Icon tọa độ).<br>- Cấu trúc hiển thị của mỗi node:<br>+ Dòng chính: Tên đơn vị.<br>+ Dòng phụ: [Mã đơn vị] • [Loại đơn vị].<br>- Các đơn vị đã giải thể không hiển thị độc lập trên cây; toàn bộ lịch sử kế thừa được tra cứu qua tìm kiếm hoặc hiển thị tại Tab Lịch sử biến động của đơn vị tiếp nhận.<br>- Cho phép click chọn từng node để xem chi tiết bên Panel phải.<br>- Nút `[+]` / `[-]` hoặc click đúp vào dòng: Mở rộng hoặc thu gọn các nhánh con. |
| **II. Thanh công cụ hành động** | - | - | - | Khối nút bấm chức năng phía trên bên phải màn hình. |
| Thêm mới | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại thanh công cụ. |
| Sửa | String(50) | - | - | Control UI: Button.<br>- Khóa mờ (Disabled) khi chưa chọn node nào trên cây địa bàn.<br>- Hiển thị khả dụng khi đã chọn 01 node trên cây địa bàn. |
| Kết xuất Excel | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại thanh công cụ.<br>- Khóa mờ (Disabled) kèm tooltip nếu danh sách cây địa bàn không có dữ liệu. |
| Nhận Excel | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại thanh công cụ. |
| Xóa bộ lọc | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại thanh công cụ. |
| Xóa | String(50) | - | - | Control UI: Button.<br>- Khóa mờ (Disabled) khi chưa chọn node nào trên cây địa bàn.<br>- Hiển thị khả dụng khi đã chọn 01 node trên cây địa bàn. |
| **III. Panel bên phải: Chi tiết đơn vị hành chính** | - | - | - | Khối hiển thị thuộc tính chi tiết đơn vị hành chính đang chọn gồm 3 tab: Thông tin chung, Lịch sử biến động, Dòng thời gian. |
| Trạng thái chưa chọn đơn vị | Text | - | Hiển thị mặc định | Control UI: Khung hiển thị rỗng (Empty State).<br>- Hiển thị icon thư mục mở và thông điệp: *"Vui lòng chọn một tổ chức để xem chi tiết"*. |
| **1. Tab Thông tin chung** | - | - | - | Khối hiển thị các thuộc tính hành chính cơ bản của đơn vị đang chọn. |
| Tên đơn vị | String(255) | - | Theo node chọn | Control UI: Text hiển thị (Read-only).<br>- Định dạng chữ đậm (Bold). |
| Mã đơn vị | String(50) | - | Theo node chọn | Control UI: Text hiển thị (Read-only). |
| Cấp đơn vị | Enum(String(50)) | - | Theo node chọn | Control UI: Badge/Tag hiển thị (Read-only).<br>- Hiển thị cấp đơn vị hành chính của địa bàn đang chọn. |
| Loại đơn vị | String(100) | - | Theo node chọn | Control UI: Text hiển thị (Read-only).<br>- Hiển thị loại đơn vị hành chính của địa bàn đang chọn. |
| Ngày thành lập | Date | - | Theo node chọn | Control UI: Text hiển thị (Read-only).<br>- Định dạng: `dd/mm/yyyy`. |
| Đang hoạt động | Boolean | - | Theo node chọn | Control UI: Switch toggle (Read-only).<br>- Bật (Xanh): Đang hoạt động bình thường. |
| Hiện trạng sắp xếp | Enum(String(100)) | - | Theo node chọn | Control UI: Badge/Tag hiển thị (Read-only).<br>- Hiển thị hiện trạng sắp xếp theo thông tin của địa bàn. |
| Căn cứ pháp lý biến động | String(255) | - | Theo node chọn | Control UI: Text hiển thị kèm icon (Read-only).<br>- Hiển thị số hiệu văn bản pháp lý điều chỉnh địa giới hành chính (Ví dụ: *Nghị quyết 1199/NQ-UBTVQH15*, *Nghị quyết 1278/NQ-UBTVQH15*...). |
| **2. Tab Lịch sử biến động** | - | - | - | Khối hiển thị sơ đồ phân nhánh kế thừa biến động địa giới hành chính (Succession Node Graph). |
| Tiêu đề biến động | String(255) | - | Theo bản ghi | Control UI: Text hiển thị (Read-only).<br>- Định dạng: `Đã kế thừa bởi (đi đâu) — [Loại biến động] · QĐ [Số QĐ]`. |
| Node đơn vị nguồn (Source Node) | Box | - | Node đang chọn | Control UI: Khung đồ họa viền liền màu xanh dương (`border: 2px solid #0284c7`).<br>- Hiển thị: Tên đơn vị, Mã đơn vị, Thời kỳ hoạt động (`[Ngày thành lập] - [Ngày giải thể]`). |
| Đường nối biến động (Edge Connector) | SVG Line | - | Đường cong nét đứt | Control UI: Đường kết nối có nhãn phân loại.<br>- Hiển thị nhãn loại biến động (Ví dụ: `Chia tách`, `Sáp nhập`, `Đổi tên`). |
| Node đơn vị đích (Target Node) | Box | - | Đơn vị kế thừa | Control UI: Khung đồ họa viền nét đứt (`border: 2px dashed #94A3B8`).<br>- Hiển thị: Tên đơn vị kế thừa, Mã đơn vị, Ngày hiệu lực. |
| Nút thu phóng to (+) | String(50) | - | - | Control UI: Button icon.<br>- Nằm tại cụm điều khiển góc trái dưới sơ đồ. |
| Nút thu nhỏ lại (-) | String(50) | - | - | Control UI: Button icon.<br>- Nằm tại cụm điều khiển góc trái dưới sơ đồ. |
| Nút vừa khung nhìn | String(50) | - | - | Control UI: Button icon.<br>- Nằm tại cụm điều khiển góc trái dưới sơ đồ. |
| Nút khóa sơ đồ | String(50) | - | - | Control UI: Button icon.<br>- Nằm tại cụm điều khiển góc trái dưới sơ đồ. |
| **3. Tab Dòng thời gian** | - | - | - | Khối hiển thị tuần tự lịch sử theo trục thời gian dọc (Vertical Timeline). |
| Trục thời gian (Timeline List) | List | - | Thứ tự thời gian | Control UI: Vertical Timeline Component.<br>- Hiển thị danh sách các mốc sự kiện lịch sử của đơn vị theo chiều dọc.<br>- Mỗi mốc sự kiện hiển thị gồm các thông tin:<br>+ Huy hiệu Ngày tháng (định dạng `dd/mm/yyyy`)<br>+ Tiêu đề sự kiện / Tên biến động<br>+ Mã đơn vị<br>+ Nội dung chi tiết sự kiện |

###### 4.3.1.8.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Mã đơn vị (Tìm kiếm) | Input text | Khi người dùng nhập từ khóa mã đơn vị:<br>- **TH1 (Không trả về dữ liệu)**: Cây hiển thị 01 dòng căn giữa in nghiêng thông báo [MSG-INF-SYS-001]. Nút "Kết xuất Excel" bị khóa mờ.<br>- **TH2 (Trả về dữ liệu)**: Hệ thống tự động lọc và hiển thị các node khớp mã địa bàn, đồng thời tự động mở rộng nhánh cây tương ứng để hiển thị đường dẫn phân cấp đến đơn vị. |
| 2 | Tên đơn vị (Tìm kiếm) | Input text | Khi người dùng nhập từ khóa tên đơn vị:<br>- **TH1 (Không trả về dữ liệu)**: Cây hiển thị 01 dòng căn giữa in nghiêng thông báo [MSG-INF-SYS-001]. Nút "Kết xuất Excel" bị khóa mờ.<br>- **TH2 (Trả về dữ liệu)**: Hệ thống tự động lọc và hiển thị các node khớp tên địa bàn (áp dụng cả tên đơn vị cũ đã sáp nhập theo cơ chế Smart Search), đồng thời tự động mở rộng nhánh cây tương ứng để hiển thị đường dẫn phân cấp đến đơn vị. |
| 3 | Mở rộng / Thu gọn cây | Button | - Khi click **Mở rộng**: Hệ thống tự động mở bung toàn bộ các cấp nhánh con (Cấp 1 $\rightarrow$ Cấp 2) trên toàn bộ danh mục Tỉnh/Thành phố trực thuộc Trung ương.<br>- Khi click **Thu gọn**: Hệ thống thu gọn lại toàn bộ các nhánh con, chỉ giữ lại danh sách Cấp 1 (Tỉnh/Thành phố TW). |
| 4 | Chọn node cây | Click Node | - Đổi trạng thái highlight dòng được chọn trên cây (màu nền xanh nhạt).<br>- Mở khóa khả dụng (Enable) cho các nút "Sửa" và "Xóa" trên thanh công cụ.<br>- Ẩn màn hình rỗng (Empty State), nạp dữ liệu của đơn vị vào Panel bên phải (Tab Thông tin chung, Tab Lịch sử biến động và Tab Dòng thời gian). |
| 5 | Thêm mới | Button | Mở **MH02 - Popup Thêm mới đơn vị hành chính** ở chế độ thêm mới. Nếu đang chọn 01 node trên cây, hệ thống tự động điền sẵn đơn vị đó vào trường `Chọn đơn vị cấp trên` và `Đơn vị nguồn`. |
| 6 | Sửa | Button | Mở **MH02 - Popup Chỉnh sửa đơn vị hành chính** và nạp toàn bộ thông tin hiện tại của đơn vị đang chọn lên form để chỉnh sửa; trường `Mã đơn vị` bị khóa chỉ đọc (Read-only). |
| 7 | Kết xuất Excel | Button | Tuân thủ quy chuẩn kỹ thuật Mục 5.5 của 04_Danh_muc_va_Phu_luc.md:<br>- **TH1 (Không có dữ liệu)**: Nút bị khóa mờ kèm tooltip thông báo không có dữ liệu để kết xuất.<br>- **TH2 (Hợp lệ)**: Hệ thống xuất toàn bộ dữ liệu danh mục địa bàn theo điều kiện bộ lọc hiện tại ra file Excel định dạng chuẩn: `yyyyMMdd_Danh_muc_Dia_ban.xlsx`.<br>+ Font chữ: `Times New Roman`.<br>+ Danh sách cột xuất: STT, Mã đơn vị, Tên đơn vị, Cấp đơn vị, Loại đơn vị, Đơn vị cấp trên, Ngày thành lập, Trạng thái hoạt động, Hiện trạng sắp xếp/biến động. |
| 8 | Nhận Excel | Button | Mở **MH03 - Popup Nhận Excel danh mục địa bàn** cho phép tải về file mẫu chuẩn hoặc nạp dữ liệu địa bàn từ file Excel vào hệ thống theo cơ chế Thành công một phần. (Chi tiết xem tại [Mục 4.3.1.8.4 - MH03 - Popup Nhận Excel danh mục địa bàn](#43184-mh03---popup-nhan-excel-danh-muc-dia-ban)). |
| 9 | Xóa bộ lọc | Button | Đưa ô `Mã đơn vị` và `Tên đơn vị` về trống, tải lại toàn bộ cây danh mục địa bàn ban đầu và hiển thị thông báo [MSG-SUC-SYS-001]. |
| 10 | Xóa | Button | Khi người dùng click nút "Xóa":<br>- Mở Popup Xác nhận xóa dùng chung của hệ thống (tham chiếu `[POPUP-CFM-001]` với `Loại thao tác` là `Xóa`).<br>- **TH1 (Đơn vị có nhánh con trực thuộc)**: Đơn vị đang chọn có chứa các đơn vị hành chính cấp con $\rightarrow$ Hệ thống chặn thao tác xóa, hiển thị cảnh báo lỗi [MSG-ERR-SYS-001] yêu cầu điều chỉnh hoặc xóa các đơn vị con trước.<br>- **TH2 (Đơn vị đã phát sinh ràng buộc dữ liệu)**: Đơn vị đã được sử dụng trong hồ sơ đăng ký BPBĐ, hồ sơ giải quyết BTNN hoặc tài khoản cán bộ $\rightarrow$ Hệ thống chặn xóa, hiển thị thông báo lỗi yêu cầu chuyển trạng thái giải thể thay vì xóa.<br>- **TH Hợp lệ**: Khi người dùng chọn "Xác nhận", hệ thống xóa bản ghi đơn vị khỏi CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng popup xác nhận, làm mới lại cây đơn vị và đưa Panel bên phải về trạng thái rỗng (Empty State). |
| 11 | Nút thu phóng to (+) | Button icon | Tăng tỷ lệ hiển thị sơ đồ quan hệ kế thừa thêm 10% (giới hạn tối đa 200%). |
| 12 | Nút thu nhỏ lại (-) | Button icon | Giảm tỷ lệ hiển thị sơ đồ quan hệ kế thừa bớt 10% (giới hạn tối thiểu 50%). |
| 13 | Nút vừa khung nhìn | Button icon | Đưa sơ đồ quan hệ kế thừa về tỷ lệ chuẩn 100% căn giữa khung hiển thị. |
| 14 | Nút khóa sơ đồ | Button icon | Cố định vị trí sơ đồ, ngăn chặn thao tác kéo rê chuột (Pan) trên canvas. |

---

##### 4.3.1.8.3. MH02 - Popup Thêm mới / Chỉnh sửa đơn vị hành chính

###### 4.3.1.8.3.1. Màn hình

![Popup Thêm mới đơn vị hành chính](images/MH_DanhMucDiaBan_02_ThemMoi.png)

![Popup Chỉnh sửa đơn vị hành chính](images/MH_DanhMucDiaBan_03_ChinhSua.png)

###### 4.3.1.8.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Form Đơn vị hành chính** | - | - | - | Hiển thị dạng Popup Modal chuẩn 800px, 2 cột song song, Sticky Header & Footer. |
| Mã đơn vị | String(50) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập mã định danh đơn vị (Ví dụ: HN, 01, 001, 00004...).<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001].<br>- Khóa chỉ đọc (Read-only / Disabled) khi ở chế độ Chỉnh sửa. |
| Tên đơn vị | String(255) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập tên đầy đủ của đơn vị hành chính.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Cấp đơn vị | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Cấp 1 (Tỉnh/Thành phố TW)<br>+ Cấp 2 (Xã/Phường/Thị trấn)<br>- Khi chọn "Cấp 1": Trường `Chọn đơn vị cấp trên` tự động khóa mờ và hiển thị chú thích "(Cấp 1 không có cấp trên)". |
| Loại đơn vị | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Lấy dữ liệu từ Danh mục dùng chung Loại đơn vị hành chính, gồm:<br>+ Tỉnh<br>+ Thành phố trực thuộc Trung ương<br>+ Phường<br>+ Xã<br>+ Thị trấn<br>*(Tự động lọc theo Cấp đơn vị: Cấp 1 gồm Tỉnh, Thành phố trực thuộc Trung ương; Cấp 2 gồm Phường, Xã, Thị trấn).*<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Chọn đơn vị cấp trên | Enum(String(50)) | Tùy điều kiện | Theo node cha / Trống | Control UI: Combobox.<br>- Danh sách hiển thị các đơn vị hành chính cấp trên hợp lệ trong hệ thống.<br>- Bắt buộc khi `Cấp đơn vị` là Cấp 2.<br>- Khóa chỉ đọc và không bắt buộc khi `Cấp đơn vị` là Cấp 1. |
| Ngày thành lập | Date | Có | Ngày hiện tại (`dd/mm/yyyy`) | Control UI: Datepicker có icon lịch.<br>- Nhập hoặc chọn ngày thành lập đơn vị.<br>- Định dạng chuẩn: `dd/mm/yyyy`.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Ngày giải thể | Date | Không | Trống | Control UI: Datepicker có icon lịch.<br>- Định dạng: `dd/mm/yyyy`.<br>- Nếu nhập, phải lớn hơn hoặc bằng `Ngày thành lập` theo [BR-VAL-007]. |
| **Khối Lịch sử biến động** | - | - | - | Phân vùng card màu xám nhạt nằm trong thân modal. |
| Loại biến động | Enum(String(50)) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Combobox.<br>Gồm:<br>+ Thành lập mới<br>+ Chia tách<br>+ Sáp nhập<br>+ Đổi tên<br>+ Giải thể<br>+ Điều chỉnh địa giới<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Số QĐ | String(100) | Có | Trống (Thêm mới) / Theo bản ghi (Sửa) | Control UI: Input text.<br>- Nhập số quyết định / nghị quyết biến động (Ví dụ: 171/2025/NQ-CP, QĐ 323...).<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Cơ quan ban hành | Enum(String(100)) | Không | Trống | Control UI: Combobox.<br>Gồm:<br>+ Chính phủ<br>+ Ủy ban Thường vụ Quốc hội<br>+ Bộ Tư pháp<br>+ UBND Tỉnh/Thành phố |
| Ngày ban hành QĐ | Date | Không | Trống | Control UI: Datepicker có icon lịch.<br>- Định dạng: `dd/mm/yyyy`. |
| Đơn vị nguồn | Enum(String(50)) | Có | Theo node chọn / Trống | Control UI: Combobox.<br>- Chọn đơn vị hành chính gốc làm nguồn biến động (kế thừa từ đâu).<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Lý do giải thể | Text(500) | Không | Trống | Control UI: Input text.<br>- Nhập lý do giải thể hoặc ghi chú biến động. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer modal. |
| Thêm mới / Lưu thay đổi | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer modal (nhãn "Thêm mới" khi tạo mới, nhãn "Lưu thay đổi" khi sửa). |

###### 4.3.1.8.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới / Lưu thay đổi | Button | Khi người dùng click nút "Thêm mới" hoặc "Lưu thay đổi", hệ thống thực hiện kiểm tra tuần tự:<br>- **TH1 (Bỏ trống trường bắt buộc)**: Áp dụng quy tắc [BR-VAL-001] và Rule 9 (AGENTS.md). Hệ thống highlight viền đỏ/nền đỏ nhạt (class `.is-invalid`), hiển thị dòng chữ cảnh báo đỏ *"Đây là trường bắt buộc"* ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập lỗi đầu tiên (không dùng Toast).<br>- **TH2 (Ngày giải thể không hợp lệ)**: Nếu người dùng nhập `Ngày giải thể` nhỏ hơn `Ngày thành lập` $\rightarrow$ Vi phạm quy tắc [BR-VAL-007], highlight viền đỏ ô `Ngày giải thể`, hiển thị cảnh báo *"Ngày giải thể phải lớn hơn hoặc bằng Ngày thành lập"* và focus con trỏ.<br>- **TH3 (Trùng lặp dữ liệu)**: Kiểm tra trùng `Mã đơn vị` hoặc `Tên đơn vị` trong cùng phạm vi đơn vị cấp trên đối với các bản ghi đang ở trạng thái `Hoạt động` hoặc `Ngừng hoạt động` theo [BR-VAL-009] (khi Sửa loại trừ chính bản ghi đang xử lý). Nếu trùng, hiển thị thông báo lỗi [MSG-ERR-VAL-009].<br>- **TH Hợp lệ**: Lưu thông tin vào CSDL, ghi Audit Log, hiển thị thông báo thành công [MSG-SUC-SYS-001], đóng Popup Modal, làm mới danh sách cây địa bàn và tự động focus hiển thị thông tin bản ghi vừa cập nhật tại MH01. |
| 2 | Hủy | Button | Đóng Popup Modal, hủy bỏ các thay đổi dữ liệu chưa lưu và quay lại màn hình chính MH01. |

---

##### 4.3.1.8.4. MH03 - Popup Nhận Excel danh mục địa bàn

###### 4.3.1.8.4.1. Màn hình

![Popup Nhận Excel danh mục địa bàn](images/MH_DanhMucDiaBan_06_NhanExcel.png)

###### 4.3.1.8.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề Popup | String(100) | - | Nhận dữ liệu đơn vị hành chính từ Excel | Control UI: Text hiển thị (Read-only) tại Header modal. |
| Hướng dẫn nạp file | String(255) | - | Theo quy định | Control UI: Text hiển thị (Read-only).<br>- Nội dung: *"Vui lòng tải tệp tin biểu mẫu chuẩn, điền đầy đủ và chính xác thông tin theo hướng dẫn trước khi tải lên hệ thống."* |
| Tải file mẫu | Link / Button | - | - | Control UI: Link tải file kèm icon Excel.<br>- Tên file tải về: `yyyyMMdd_Bieu_mau_import_danh_muc_dia_ban.xlsx`. |
| Chọn tệp tin | File (.xls, .xlsx) | Có | Trống | Control UI: Vùng kéo thả hoặc nút chọn file.<br>- Chỉ cho phép tải lên file Excel (định dạng `.xls`, `.xlsx`), dung lượng tối đa $\le 20MB$.<br>- Sau khi chọn tệp: Hiển thị tên file, dung lượng kèm liên kết `Xóa tệp`. |
| Hủy | String(50) | - | - | Control UI: Button.<br>- Luôn hiển thị tại footer modal. |
| Nhận dữ liệu | String(50) | - | - | Control UI: Button.<br>- Kích hoạt xử lý nạp dữ liệu khi đã chọn tệp tin. |

###### 4.3.1.8.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tải file mẫu | Link / Button | Hệ thống tự động xuất và tải tệp tin Excel biểu mẫu chuẩn `yyyyMMdd_Bieu_mau_import_danh_muc_dia_ban.xlsx` về thiết bị người dùng (tệp cấu hình sẵn 02 sheet gồm Sheet 1 `Danh_Muc_Dia_Ban` và Sheet 2 `Huong_Dan_Nhap_Lieu` theo đúng quy định tại mục 4.3.1.8.4.4). |
| 2 | Chọn tệp tin | Upload Button / Vùng kéo thả | Cho phép người dùng chọn tệp tin từ máy tính hoặc kéo thả trực tiếp tệp tin Excel (`.xls`, `.xlsx`) vào vùng upload. Sau khi chọn tệp, hệ thống hiển thị tên tệp tin, dung lượng kèm liên kết `Xóa tệp`. |
| 3 | Xóa tệp | Link | Gỡ bỏ tệp vừa chọn và đưa vùng upload về trạng thái ban đầu chưa chọn tệp. |
| 4 | Nhận dữ liệu | Button | Khi người dùng click nút "Nhận dữ liệu", hệ thống thực hiện kiểm tra và xử lý tuần tự qua các trường hợp riêng biệt sau:<br>- **TH1 (Chưa chọn tệp tin)**: Khi người dùng click nút "Nhận dữ liệu" mà chưa thực hiện chọn hoặc tải tệp tin lên hệ thống $\rightarrow$ Hệ thống highlight viền đỏ vùng chọn tệp tin, hiển thị dòng cảnh báo đỏ *"Vui lòng chọn tệp tin Excel trước khi nhận dữ liệu"* (áp dụng quy tắc [BR-VAL-001]).<br>- **TH2 (Định dạng file không hợp lệ)**: Nếu tệp tin người dùng tải lên có phần mở rộng không phải định dạng `.xls` hoặc `.xlsx` (ví dụ: `.doc`, `.pdf`, `.csv`, `.exe`, `.zip`...) $\rightarrow$ Hệ thống từ chối nhận file, hiển thị thông báo lỗi [MSG-ERR-IMP-001]: *"Định dạng tệp tin không hợp lệ. Hệ thống chỉ hỗ trợ tệp tin định dạng .xls, .xlsx."*<br>- **TH3 (Dung lượng file vượt quá giới hạn)**: Nếu dung lượng tệp tin tải lên lớn hơn 20MB $\rightarrow$ Hệ thống từ chối nhận file, hiển thị thông báo lỗi [MSG-ERR-IMP-002]: *"Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại."*<br>- **TH4 (Sai cấu trúc biểu mẫu)**: Nếu tệp tin tải lên không đúng cấu trúc theo file mẫu chuẩn quy định tại mục 4.3.1.8.4.4 (sai số lượng cột, thiếu cột, thừa cột, sai tên tiêu đề cột Header ở dòng 1, hoặc tệp bị đặt mật khẩu bảo vệ không thể đọc dữ liệu) $\rightarrow$ Hệ thống từ chối xử lý, hiển thị thông báo lỗi [MSG-ERR-IMP-003]: *"Tệp tin không đúng cấu trúc biểu mẫu quy định. Vui lòng tải lại biểu mẫu chuẩn để thực hiện."* kèm liên kết tải lại biểu mẫu chuẩn.<br>- **TH5 (Tệp tin không có dữ liệu)**: Nếu tệp tin tải lên là tệp rỗng hoặc chỉ có dòng tiêu đề Header mà không chứa bất kỳ dòng dữ liệu nào $\rightarrow$ Hệ thống từ chối xử lý, hiển thị thông báo lỗi [MSG-ERR-IMP-004]: *"Tệp tin không có dữ liệu. Vui lòng kiểm tra lại nội dung tệp tin."*<br>- **TH6 (Nạp dữ liệu theo cơ chế Thành công một phần - Tồn tại dòng lỗi)**: Trong trường hợp tệp tin có dòng dữ liệu hợp lệ và dòng dữ liệu lỗi vi phạm quy tắc tại Ma trận ràng buộc dữ liệu (mục 4.3.1.8.4.4):<br>+ Tự động bỏ qua các dòng rỗng hoàn toàn.<br>+ Với từng dòng dữ liệu: Hệ thống quét, bóc tách và kiểm tra tính hợp lệ theo Ma trận ràng buộc dữ liệu tại mục 4.3.1.8.4.4.<br>+ Đối với dòng dữ liệu hợp lệ: Nạp thành công vào CSDL hệ thống, ghi Audit Log.<br>+ Đối với dòng dữ liệu không hợp lệ: Bị loại bỏ không nạp vào hệ thống, ghi nhận chính xác số thứ tự dòng và nội dung chi tiết lỗi vi phạm.<br>+ Báo cáo kết quả nạp: Hiển thị Popup Modal thống kê kết quả (*Tổng số dòng: N \| Thành công: X dòng \| Thất bại: Y dòng*).<br>+ Cung cấp nút bấm **"Tải file kết quả lỗi"**: Cho phép người dùng tải về file Excel danh sách các dòng bị lỗi kèm theo cột ghi rõ nguyên nhân lỗi cụ thể ở cuối mỗi dòng để người dùng chỉnh sửa và nạp lại.<br>+ Đóng Popup Modal MH03, tự động làm mới lại danh mục cây địa bàn tại MH01 đối với các bản ghi đã thêm thành công.<br>- **TH7 (Toàn bộ dữ liệu hợp lệ)**: Nếu 100% dòng dữ liệu trong tệp tin đều thỏa mãn quy tắc tại Ma trận ràng buộc dữ liệu mục 4.3.1.8.4.4:<br>+ Hệ thống nạp toàn bộ dữ liệu vào CSDL, ghi Audit Log.<br>+ Đóng Popup Modal MH03, hiển thị thông báo thành công [MSG-SUC-SYS-001]: *"Nhận dữ liệu danh mục địa bàn từ Excel thành công (Tổng số: N bản ghi)."*<br>+ Tự động làm mới danh sách cây địa bàn tại MH01 và tự động mở rộng nhánh cây hiển thị các đơn vị vừa được nạp. |
| 5 | Hủy | Button | Đóng Popup Modal MH03, hủy bỏ thao tác nạp dữ liệu và quay lại màn hình chính MH01. |

###### 4.3.1.8.4.4. Ma trận Ràng buộc dữ liệu trong file Excel mẫu

File Excel biểu mẫu chuẩn `yyyyMMdd_Bieu_mau_import_danh_muc_dia_ban.xlsx` được cấu hình sẵn gồm **02 Sheet**:

*1. Sheet 2: `Huong_Dan_Nhap_Lieu` (Sheet Hướng dẫn nhập liệu & Danh mục giá trị lựa chọn):*

Cung cấp bảng hướng dẫn chi tiết quy cách nhập liệu và danh sách giá trị cố định (Enum) từ Danh mục dùng chung để người dùng tra cứu hoặc lựa chọn cho các cột chọn giá trị:
- **Bảng danh mục Cấp đơn vị**:
  + `Cấp 1`: Đơn vị hành chính cấp tỉnh / thành phố trực thuộc Trung ương.
  + `Cấp 2`: Đơn vị hành chính cấp xã / phường / thị trấn trực thuộc cấp tỉnh/thành phố.
- **Bảng danh mục Loại đơn vị** (Thống nhất với Danh mục dùng chung Loại đơn vị hành chính trên hệ thống):
  + Đơn vị Cấp 1 gồm:
    - `Tỉnh`
    - `Thành phố trực thuộc Trung ương`
  + Đơn vị Cấp 2 gồm:
    - `Phường`
    - `Xã`
    - `Thị trấn`
- **Quy tắc thiết lập Mã đơn vị cấp trên**:
  + Dòng có Cấp đơn vị là `Cấp 1`: Cột `Mã đơn vị cấp trên` bắt buộc **để trống**.
  + Dòng có Cấp đơn vị là `Cấp 2`: Cột `Mã đơn vị cấp trên` bắt buộc phải điền chính xác `Mã đơn vị` của đơn vị Cấp 1 quản lý trực tiếp (đã có sẵn trong CSDL hệ thống hoặc được khai báo ở các dòng phía trước trong cùng file Excel).
- **Quy chuẩn định dạng ngày tháng**: Toàn bộ các cột ngày tháng (`Ngày thành lập`, `Ngày giải thể`) bắt buộc nhập theo đúng định dạng chuẩn Việt Nam: `dd/mm/yyyy` (Ví dụ: `01/07/2025`).

*2. Sheet 1: `Danh_Muc_Dia_Ban` (Sheet nhập dữ liệu):*

Bao gồm dòng tiêu đề Header chuẩn tại Dòng 1 và các dòng nhập dữ liệu từ Dòng 2 trở đi gồm 09 cột thông tin từ Cột A đến Cột I theo ma trận ràng buộc dưới đây:

| Cột trong Excel | Tên Cột (Header) | Kiểu Dữ liệu | Bắt buộc | Độ dài Max | Quy tắc Ràng buộc đặc thù (Nghiệp vụ / Validate) | Thông báo lỗi cụ thể (Nếu vi phạm) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | STT | Integer | **Có** | - | - Số thứ tự tăng dần (1, 2, 3...).<br>- Bỏ qua dòng nếu toàn bộ các ô trong dòng đều rỗng. | `Dòng [X]: STT không hợp lệ.` |
| **B** | Mã đơn vị | String(50) | **Có** | 50 | - Mã định danh đơn vị hành chính.<br>- Chỉ bao gồm ký tự chữ cái (a-z, A-Z), chữ số (0-9) và dấu gạch dưới `_`.<br>- **Trùng lặp:** Kiểm tra duy nhất trên danh sách các dòng của file import và kiểm tra duy nhất với CSDL hệ thống theo [BR-VAL-009]. | `Dòng [X]: Mã đơn vị không được để trống.<br>Dòng [X]: Mã đơn vị chứa ký tự không hợp lệ.<br>Dòng [X]: Mã đơn vị bị trùng lặp trong file hoặc đã tồn tại trên hệ thống.<br>Dòng [X]: Mã đơn vị vượt quá 50 ký tự.` |
| **C** | Tên đơn vị | String(255) | **Có** | 255 | - Tên đầy đủ của đơn vị hành chính.<br>- Không chứa ký tự đặc biệt nguy hiểm. Áp dụng quy tắc bắt buộc [BR-VAL-001]. | `Dòng [X]: Tên đơn vị không được để trống.<br>Dòng [X]: Tên đơn vị vượt quá 255 ký tự.` |
| **D** | Cấp đơn vị | Enum(String(50)) | **Có** | 50 | - Lấy giá trị theo danh mục tại Sheet `Huong_Dan_Nhap_Lieu`, gồm:<br>+ `Cấp 1`<br>+ `Cấp 2` | `Dòng [X]: Cấp đơn vị không được để trống.<br>Dòng [X]: Cấp đơn vị không hợp lệ (chỉ nhận Cấp 1 hoặc Cấp 2).` |
| **E** | Loại đơn vị | Enum(String(100)) | **Có** | 100 | - Thống nhất với Danh mục dùng chung Loại đơn vị hành chính trên hệ thống, gồm các giá trị:<br>+ `Tỉnh`<br>+ `Thành phố trực thuộc Trung ương`<br>+ `Phường`<br>+ `Xã`<br>+ `Thị trấn`<br>- **Ràng buộc tương thích theo Cấp đơn vị:**<br>+ Nếu `Cấp đơn vị` là `Cấp 1`: Chỉ chấp nhận giá trị `Tỉnh` hoặc `Thành phố trực thuộc Trung ương`.<br>+ Nếu `Cấp đơn vị` là `Cấp 2`: Chỉ chấp nhận giá trị `Phường`, `Xã` hoặc `Thị trấn`. | `Dòng [X]: Loại đơn vị không được để trống.<br>Dòng [X]: Loại đơn vị không tồn tại trong Danh mục dùng chung.<br>Dòng [X]: Loại đơn vị không tương thích với Cấp đơn vị (Cấp 1 chỉ chấp nhận: Tỉnh, Thành phố trực thuộc Trung ương; Cấp 2 chỉ chấp nhận: Phường, Xã, Thị trấn).` |
| **F** | Mã đơn vị cấp trên | String(50) | Tùy ĐK | 50 | - **Phụ thuộc logic:**<br>+ Bắt buộc đối với `Cấp 2`.<br>+ Bắt buộc để trống đối với `Cấp 1`.<br>- **Ràng buộc quan hệ:** Mã phải tồn tại trong CSDL hoặc đã được khai báo ở các dòng Cấp 1 phía trước trong cùng file Excel.<br>- Cấp của đơn vị cấp trên phải thuộc `Cấp 1`. | `Dòng [X]: Mã đơn vị cấp trên không được để trống đối với đơn vị Cấp 2.<br>Dòng [X]: Mã đơn vị cấp trên phải để trống đối với đơn vị Cấp 1.<br>Dòng [X]: Mã đơn vị cấp trên không tồn tại trên hệ thống hoặc trong file import.<br>Dòng [X]: Đơn vị cấp trên không thuộc Cấp 1.` |
| **G** | Ngày thành lập | Date | **Có** | 10 | - Ngày thành lập đơn vị.<br>- Định dạng chuẩn: `dd/mm/yyyy`.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. | `Dòng [X]: Ngày thành lập không được để trống.<br>Dòng [X]: Ngày thành lập không đúng định dạng dd/mm/yyyy.` |
| **H** | Ngày giải thể | Date | Không | 10 | - Ngày giải thể / chấm dứt hoạt động của đơn vị.<br>- Định dạng chuẩn: `dd/mm/yyyy`.<br>- Nếu có nhập, phải lớn hơn hoặc bằng `Ngày thành lập` theo [BR-VAL-007]. | `Dòng [X]: Ngày giải thể không đúng định dạng dd/mm/yyyy.<br>Dòng [X]: Ngày giải thể phải lớn hơn hoặc bằng Ngày thành lập.` |
| **I** | Ghi chú | String(500) | Không | 500 | - Nhập ghi chú nếu có.<br>- Tối đa 500 ký tự. | `Dòng [X]: Ghi chú vượt quá 500 ký tự.` |

