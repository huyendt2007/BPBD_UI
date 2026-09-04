### 4.3.3. Tra cứu Vụ việc Bồi thường nhà nước

#### 4.3.3.4. Tra cứu vụ việc

##### 4.3.3.4.1. Mục đích

Cho phép quản lý hoạt động tra cứu, khai thác thông tin và kết xuất danh sách hồ sơ vụ việc bồi thường nhà nước tập trung trên hệ thống Website quản trị, bao gồm:

\- Tra cứu tập trung toàn bộ các vụ việc bồi thường nhà nước theo phân trang, phân tách độc lập qua 02 Tab nghiệp vụ chuyên biệt: Tab "Yêu cầu bồi thường" (các vụ việc độc lập không có nội dung phục hồi danh dự) và Tab "Phục hồi danh dự" (các vụ việc có yêu cầu hoặc phát sinh tiến trình trực tiếp xin lỗi, đăng báo).

\- Tự động thiết lập điều kiện lọc mặc định ưu tiên hiển thị các vụ việc ở trạng thái "Hoàn thành" có thời gian tiếp nhận trong 03 tháng gần nhất để tối ưu hiệu năng tra cứu, đồng thời cho phép người dùng chủ động tùy biến mở rộng phạm vi tra cứu toàn bộ các trạng thái vòng đời vụ việc.

\- Kết xuất danh sách kết quả tra cứu ra tệp tin Excel chuẩn định dạng phục vụ công tác báo cáo, thống kê và lưu trữ.

\- Xem chi tiết hồ sơ: Cho phép click dòng dữ liệu (Row click) để liên thông điều hướng mở màn hình chi tiết vụ việc (MH05 thuộc phân hệ Giải quyết yêu cầu bồi thường) tại một tab trình duyệt mới, tự động cuộn (focus) đúng tab/khối nghiệp vụ tương ứng theo trạng thái hồ sơ.

*a. Phân quyền*

Hệ thống phân quyền thao tác theo các quyền nghiệp vụ được cấp:

\- **Xem**: Tra cứu danh sách vụ việc theo phân trang trên cả 2 tab, chuyển đổi tab dữ liệu, click dòng dữ liệu để mở xem chi tiết vụ việc tại phân hệ giải quyết.

\- **Kết xuất Excel**: Tải danh sách kết quả tra cứu của tab hiện hành ra file Excel theo đúng điều kiện lọc và sắp xếp.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập vào hệ thống thành công (Website quản trị).

\- Người dùng được phân quyền truy cập chức năng "Tra cứu vụ việc".

\- Dữ liệu vụ việc được kế thừa tự động từ các phân hệ: Tiếp nhận yêu cầu, Giải quyết yêu cầu bồi thường, Quyết định giải quyết bồi thường, Quản lý kinh phí bồi thường.

---

##### 4.3.3.4.3. MH01 - Màn hình Tra cứu vụ việc

###### 4.3.3.4.3.1. Màn hình

![Màn hình Tra cứu vụ việc bồi thường nhà nước](images/UC_Tra_Cuu_Vu_Viec_BTNN_MH01.png)

###### 4.3.3.4.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối thông tin chung màn hình** | Section | - | - | Vùng thông tin chung phía trên màn hình tra cứu. |
| Tiêu đề màn hình | String(255) | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `TRA CỨU VỤ VIỆC BỒI THƯỜNG NHÀ NƯỚC`. |
| Tab tra cứu | Enum(String(100)) | Có | `Yêu cầu bồi thường` | Control UI: Tab navigation.<br>- Chuyển đổi giữa 2 tab nghiệp vụ độc lập:<br>+ `Yêu cầu bồi thường`: Hiển thị các vụ việc yêu cầu bồi thường độc lập không có nội dung phục hồi danh dự.<br>+ `Phục hồi danh dự`: Hiển thị các vụ việc có yêu cầu hoặc phát sinh tiến trình trực tiếp xin lỗi, đăng báo.<br>- Tính loại trừ dữ liệu: Một hồ sơ vụ việc chỉ được hiển thị tại duy nhất 01 trong 02 tab; Cán bộ chỉ tra cứu được các vụ việc thuộc phạm vi phân quyền quản lý của đơn vị mình. |
| **II. Tab Yêu cầu bồi thường** | Section | - | - | Phạm vi: Các vụ việc giải quyết yêu cầu bồi thường độc lập không có nội dung phục hồi danh dự. |
| *1. Bộ lọc tìm kiếm* | Section | - | - | Control UI: Filter panel.<br>- Hiển thị phía trên bảng kết quả của tab Yêu cầu bồi thường.<br>- Các tiêu chí lọc có dữ liệu được kết hợp theo điều kiện AND. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`, tự động cắt khoảng trắng đầu cuối (trim space). |
| Tên vụ việc | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Tên vụ việc`. |
| Tên người yêu cầu | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo họ tên người yêu cầu bồi thường. |
| Cơ quan giải quyết | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập cơ quan giải quyết...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo tên cơ quan giải quyết bồi thường. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Hình thức tiếp nhận | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu Danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Trạng thái giải quyết | Enum(String(50)) | Không | `Hoàn thành` | Control UI: Combobox.<br>- Lọc theo trạng thái giải quyết của vụ việc. Cho phép chọn tất cả các trạng thái trong vòng đời vụ việc. Mặc định ưu tiên chọn sẵn `Hoàn thành`, cho phép người dùng thay đổi lại. Gồm:<br>+ `Tất cả`<br>+ `Chờ nhập liệu`<br>+ `Chờ kiểm tra`<br>+ `Yêu cầu bổ sung`<br>+ `Bị từ chối`<br>+ `Chờ thụ lý`<br>+ `Từ chối thụ lý`<br>+ `Đang xác minh thiệt hại`<br>+ `Đang thương lượng`<br>+ `Thương lượng không thành công`<br>+ `Chờ ban hành QĐ`<br>+ `Hoãn giải quyết`<br>+ `Tạm đình chỉ giải quyết`<br>+ `Đình chỉ giải quyết`<br>+ `Chờ thực thi`<br>+ `Đang thực thi theo bản án`<br>+ `Hoàn thành` |
| Nhóm trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Lọc nhanh danh sách theo nhóm tiến trình xử lý vụ việc. Khi chọn một nhóm, hệ thống tự động lọc các hồ sơ có trạng thái giải quyết tương ứng gồm:<br>+ `Tất cả`: Lọc toàn bộ tất cả các trạng thái trong vòng đời vụ việc.<br>+ `Đang xử lý`: Tự động lọc các vụ việc có trạng thái giải quyết là một trong các trạng thái: `Chờ nhập liệu`, `Chờ kiểm tra`, `Yêu cầu bổ sung`, `Chờ thụ lý`, `Đang xác minh thiệt hại`, `Đang thương lượng`, `Thương lượng không thành công`, `Chờ ban hành QĐ`, `Chờ thực thi`, `Đang thực thi theo bản án`.<br>+ `Tạm dừng`: Tự động lọc các vụ việc có trạng thái giải quyết là: `Hoãn giải quyết`, `Tạm đình chỉ giải quyết`.<br>+ `Kết thúc`: Tự động lọc các vụ việc có trạng thái giải quyết là: `Bị từ chối`, `Từ chối thụ lý`, `Đình chỉ giải quyết`, `Hoàn thành`.<br>- Khi người dùng chọn một nhóm trạng thái cụ thể khác `Tất cả`, trường `Trạng thái giải quyết` tự động được reset về trạng thái trống. |
| Tiếp nhận từ ngày | Date | Không | Ngày đầu tháng của 3 tháng trước | Control UI: Datepicker `dd/mm/yyyy`.<br>- Lọc theo ngày tiếp nhận hồ sơ.<br>- Tuân thủ [BR-VAL-007]. |
| Tiếp nhận đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker `dd/mm/yyyy`.<br>- Lọc theo ngày tiếp nhận hồ sơ.<br>- Tuân thủ [BR-VAL-007]. |
| Hạn xử lý từ ngày | Date | Không | Trống | Control UI: Datepicker `dd/mm/yyyy`.<br>- Lọc theo thời hạn xử lý vụ việc.<br>- Tuân thủ [BR-VAL-007]. |
| Hạn xử lý đến ngày | Date | Không | Trống | Control UI: Datepicker `dd/mm/yyyy`.<br>- Lọc theo thời hạn xử lý vụ việc.<br>- Tuân thủ [BR-VAL-007]. |
| Xóa bộ lọc | Button | Không | - | Control UI: Button.<br>- Luôn hiển thị và cho phép click. |
| Tìm kiếm | Button | Không | - | Control UI: Button.<br>- Luôn hiển thị và cho phép click. |
| Kết xuất Excel | Button | Không | - | Control UI: Button.<br>- Hiển thị và cho phép click khi bảng có dữ liệu kết quả.<br>- Khóa mờ (Disabled) kèm tooltip khi bảng không có dữ liệu theo [BR-EXP-040]. |
| *2. Bảng kết quả tìm kiếm* | Section | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Ngày tiếp nhận" giảm dần (mới nhất hiển thị lên đầu).<br>- Chỉ hiển thị vụ việc thuộc phạm vi xử lý của người dùng đăng nhập.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Control UI: Text link (Read-only).<br>- Hiển thị mã vụ việc in đậm, ví dụ `BT-2026-001`. Người dùng có thể click dòng để mở chi tiết vụ việc tại tab mới. |
| Tên vụ việc | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị tên vụ việc bồi thường. |
| Tên người yêu cầu | String(100) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị họ tên cá nhân/tổ chức yêu cầu bồi thường. |
| Tỉnh/TP | String(100) | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị tỉnh/thành phố của người yêu cầu bồi thường. |
| Địa chỉ chi tiết | String(500) | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị địa chỉ chi tiết nơi cư trú/trụ sở của người yêu cầu. |
| Lĩnh vực | Enum(String(100)) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Tham chiếu Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]; trên lưới bỏ tiền tố `TRONG HOẠT ĐỘNG`. |
| Cơ quan giải quyết | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị tên cơ quan có trách nhiệm giải quyết bồi thường. |
| Cán bộ xử lý | String(255) | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị họ tên cán bộ thụ lý/giải quyết vụ việc. Nếu chưa phân công, để trống. |
| Ngày tiếp nhận | DateTime | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. Hỗ trợ sắp xếp động (Sortable); mặc định sắp xếp giảm dần. |
| Hạn xử lý | Date | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy`. Hiển thị hạn xử lý giải quyết vụ việc theo quy định. |
| Hình thức tiếp nhận | Enum(String(50)) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Tham chiếu Danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Trạng thái | Enum(String(50)) | Có | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Hiển thị badge trạng thái giải quyết tương ứng của vụ việc theo dữ liệu hệ thống. |
| Ngày cập nhật | Date | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy`. Ngày cập nhật trạng thái hoặc thông tin gần nhất của vụ việc. |
| **III. Tab Phục hồi danh dự** | Section | - | - | Phạm vi: Các vụ việc có yêu cầu hoặc phát sinh tiến trình phục hồi danh dự (trực tiếp xin lỗi, đăng báo). |
| *1. Bộ lọc tìm kiếm* | Section | - | - | Control UI: Filter panel.<br>- Hiển thị phía trên bảng kết quả của tab Phục hồi danh dự.<br>- Các tiêu chí lọc có dữ liệu được kết hợp theo điều kiện AND. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`, tự động cắt khoảng trắng đầu cuối (trim space). |
| Tên vụ việc | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập tên vụ việc...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo `Tên vụ việc`. |
| Người yêu cầu/người bị thiệt hại | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`.<br>- Tìm kiếm gần đúng, không phân biệt hoa thường theo họ tên người bị thiệt hại hoặc người yêu cầu. |
| Cơ quan giải quyết | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập cơ quan giải quyết...`.<br>- Tìm kiếm gần đúng theo tên cơ quan giải quyết bồi thường. |
| Trạng thái giải quyết | Enum(String(50)) | Không | `Hoàn thành` | Control UI: Combobox.<br>- Lọc theo trạng thái giải quyết của vụ việc có nội dung phục hồi danh dự. Cho phép chọn tất cả các trạng thái trong vòng đời vụ việc. Mặc định ưu tiên chọn sẵn `Hoàn thành`, cho phép người dùng thay đổi lại. Gồm:<br>+ `Tất cả`<br>+ `Chờ nhập liệu`<br>+ `Chờ kiểm tra`<br>+ `Yêu cầu bổ sung`<br>+ `Bị từ chối`<br>+ `Chờ thụ lý`<br>+ `Từ chối thụ lý`<br>+ `Đang xác minh thiệt hại`<br>+ `Đang thương lượng`<br>+ `Thương lượng không thành công`<br>+ `Chờ ban hành QĐ`<br>+ `Hoãn giải quyết`<br>+ `Tạm đình chỉ giải quyết`<br>+ `Đình chỉ giải quyết`<br>+ `Chờ thực thi`<br>+ `Đang thực thi theo bản án`<br>+ `Hoàn thành` |
| Nhóm trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Lọc nhanh danh sách theo nhóm tiến trình xử lý vụ việc. Khi chọn một nhóm, hệ thống tự động lọc các hồ sơ có trạng thái giải quyết tương ứng gồm:<br>+ `Tất cả`: Lọc toàn bộ tất cả các trạng thái trong vòng đời vụ việc.<br>+ `Đang xử lý`: Tự động lọc các vụ việc có trạng thái giải quyết là một trong các trạng thái: `Chờ nhập liệu`, `Chờ kiểm tra`, `Yêu cầu bổ sung`, `Chờ thụ lý`, `Đang xác minh thiệt hại`, `Đang thương lượng`, `Thương lượng không thành công`, `Chờ ban hành QĐ`, `Chờ thực thi`, `Đang thực thi theo bản án`.<br>+ `Tạm dừng`: Tự động lọc các vụ việc có trạng thái giải quyết là: `Hoãn giải quyết`, `Tạm đình chỉ giải quyết`.<br>+ `Kết thúc`: Tự động lọc các vụ việc có trạng thái giải quyết là: `Bị từ chối`, `Từ chối thụ lý`, `Đình chỉ giải quyết`, `Hoàn thành`.<br>- Khi người dùng chọn một nhóm trạng thái cụ thể khác `Tất cả`, trường `Trạng thái giải quyết` tự động được reset về trạng thái trống. |
| Hình thức phục hồi danh dự | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Chọn hình thức phục hồi danh dự cần tra cứu theo đúng dữ liệu đã ghi nhận trong hồ sơ YCBT gốc. Gồm:<br>+ `Tất cả`<br>+ `Trực tiếp xin lỗi và cải chính công khai`<br>+ `Đăng báo xin lỗi và cải chính công khai`<br>+ `Cả 2 hình thức` |
| Tiếp nhận từ ngày | Date | Không | Ngày đầu tháng của 3 tháng trước | Control UI: Datepicker `dd/mm/yyyy`.<br>- Lọc theo ngày tiếp nhận hồ sơ vụ việc có phục hồi danh dự.<br>- Tuân thủ [BR-VAL-007]. |
| Tiếp nhận đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker `dd/mm/yyyy`.<br>- Lọc theo ngày tiếp nhận hồ sơ vụ việc có phục hồi danh dự.<br>- Tuân thủ [BR-VAL-007]. |
| Xóa bộ lọc | Button | Không | - | Control UI: Button.<br>- Luôn hiển thị và cho phép click. |
| Tìm kiếm | Button | Không | - | Control UI: Button.<br>- Luôn hiển thị và cho phép click. |
| Kết xuất Excel | Button | Không | - | Control UI: Button.<br>- Hiển thị và cho phép click khi bảng có dữ liệu kết quả.<br>- Khóa mờ (Disabled) kèm tooltip khi bảng không có dữ liệu theo [BR-EXP-040]. |
| *2. Bảng kết quả tìm kiếm* | Section | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Ngày tiếp nhận" giảm dần (mới nhất hiển thị lên đầu).<br>- Chỉ hiển thị vụ việc thuộc phạm vi xử lý của người dùng đăng nhập.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Control UI: Text link (Read-only).<br>- Hiển thị mã vụ việc in đậm, ví dụ `BT-2026-012`. Người dùng có thể click dòng để mở chi tiết vụ việc tại tab mới. |
| Tên vụ việc | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị tên vụ việc có nội dung phục hồi danh dự. |
| Người yêu cầu | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị họ tên người bị thiệt hại hoặc người yêu cầu phục hồi danh dự. |
| Tỉnh/TP | String(100) | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị tỉnh/thành phố nơi cư trú của người yêu cầu. |
| Địa chỉ chi tiết | String(500) | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị địa chỉ chi tiết nơi cư trú của người yêu cầu. |
| Cơ quan giải quyết | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị cơ quan có trách nhiệm thực hiện phục hồi danh dự. |
| Cán bộ xử lý | String(255) | Không | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị cán bộ đang thụ lý hoặc phụ trách theo dõi phục hồi danh dự. |
| Hình thức phục hồi | Enum(String(100)) | Có | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Hiển thị badge hình thức phục hồi danh dự theo đúng dữ liệu đã ghi nhận trong hồ sơ YCBT gốc. Gồm:<br>+ `Trực tiếp xin lỗi và cải chính công khai`<br>+ `Đăng báo xin lỗi và cải chính công khai`<br>+ `Cả 2 hình thức` |
| Trạng thái | Enum(String(50)) | Có | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Hiển thị badge trạng thái giải quyết tương ứng của vụ việc theo dữ liệu hệ thống. |
| Ngày tiếp nhận | DateTime | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. Hỗ trợ sắp xếp động (Sortable); mặc định sắp xếp giảm dần. |

###### 4.3.3.4.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chuyển tab | Tab navigation | Khi người dùng click chọn tab `Yêu cầu bồi thường` hoặc `Phục hồi danh dự`:<br>- Hệ thống hiển thị khối bộ lọc và bảng dữ liệu kết quả tương ứng với tab được chọn.<br>- Tải lại danh sách kết quả theo điều kiện lọc mặc định của tab được chọn (Trạng thái giải quyết mặc định là `Hoàn thành`, thời gian tiếp nhận mặc định trong 3 tháng gần nhất) và đưa trang hiện tại về Trang 1.<br>- Dữ liệu giữa 2 tab là hoàn toàn độc lập theo nguyên tắc loại trừ, đảm bảo không trùng lặp vụ việc giữa 2 danh sách. |
| 2 | Tìm kiếm | Button | Khi người dùng click nút Tìm kiếm, hệ thống kiểm tra tính hợp lệ của các tiêu chí và thực hiện lọc dữ liệu theo các trường hợp bên dưới:<br>- **TH1 - Khoảng ngày tiếp nhận không hợp lệ**: Nếu `Tiếp nhận từ ngày` lớn hơn `Tiếp nhận đến ngày`, vi phạm quy tắc kiểm tra khoảng ngày [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] (*"Thời điểm từ ngày không được lớn hơn thời điểm đến ngày"*) và không thực hiện tìm kiếm.<br>- **TH2 - Khoảng hạn xử lý không hợp lệ** (chỉ áp dụng tại Tab Yêu cầu bồi thường): Nếu `Hạn xử lý từ ngày` lớn hơn `Hạn xử lý đến ngày`, vi phạm quy tắc [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH3 - Không có dữ liệu trả về (Empty State)**: Khi không tìm thấy bản ghi nào thỏa mãn đồng thời các điều kiện lọc, bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001] (*"Không tìm thấy vụ việc bồi thường nào phù hợp"*); thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng phân trang ở trạng thái khóa mờ (Disabled); nút "Kết xuất Excel" chuyển sang trạng thái khóa mờ (Disabled) kèm tooltip *"Không có dữ liệu để kết xuất Excel"* theo [BR-EXP-040].<br>- **TH4 - Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống thực hiện lọc các bản ghi thỏa mãn đồng thời tất cả các tiêu chí lọc đã nhập/chọn theo điều kiện AND, hiển thị danh sách kết quả lên bảng dữ liệu, đưa trang hiện tại về Trang 1 và kích hoạt trạng thái khả dụng cho nút "Kết xuất Excel". |
| 3 | Xóa bộ lọc | Button | Khi người dùng click nút Xóa bộ lọc, hệ thống xóa bỏ toàn bộ các điều kiện lọc đã nhập hoặc chọn trên form, khôi phục các trường về giá trị mặc định ban đầu (Trạng thái giải quyết mặc định là `Hoàn thành`, thời gian tiếp nhận mặc định trong 3 tháng gần nhất), đưa bảng về Trang 1 và tải lại danh sách kết quả. |
| 4 | Kết xuất Excel | Button | Khi người dùng click nút Kết xuất Excel, hệ thống xuất toàn bộ các bản ghi kết quả thỏa mãn điều kiện lọc hiện tại của tab đang chọn ra tệp tin định dạng `.xlsx`, tuân thủ đúng quy chuẩn kỹ thuật và định dạng kết xuất dùng chung tại **Mục 5.5 của 04_Danh_muc_va_Phu_luc.md** (Quy chuẩn kỹ thuật & nghiệp vụ Kết xuất Excel dùng chung). |
| 5 | Sắp xếp cột | Header cột | Khi người dùng click vào tiêu đề cột có hỗ trợ sắp xếp động (`Ngày tiếp nhận`):<br>- Lần click thứ nhất: Sắp xếp danh sách kết quả theo chiều tăng dần (cũ nhất lên đầu).<br>- Lần click thứ hai: Sắp xếp danh sách kết quả theo chiều giảm dần (mới nhất lên đầu).<br>- Lần click thứ ba: Đưa về trạng thái sắp xếp mặc định ban đầu của hệ thống (giảm dần theo Ngày tiếp nhận).<br>- Giữ nguyên các tiêu chí lọc đang thiết lập và đưa hiển thị về Trang 1. |
| 6 | Click dòng dữ liệu | Row click | Khi người dùng click vào bất kỳ vị trí nào trên một dòng dữ liệu của bảng kết quả (ngoại trừ thao tác chọn bôi đen văn bản):<br>- **Môi trường mở**: Hệ thống mở màn hình **MH05 - Xem chi tiết hồ sơ yêu cầu bồi thường** (thuộc tài liệu `SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md`) ở chế độ Chỉ đọc (Read-only) tương ứng với mã vụ việc của dòng được click tại một **tab trình duyệt mới** (`target="_blank"`), giữ nguyên tab tra cứu hiện tại.<br>- **Tự động focus khối nội dung**:<br>  + **Nếu click từ Tab Phục hồi danh dự**: Hệ thống tự động focus trực tiếp vào khối **"Phục hồi danh dự"** trên màn hình chi tiết để người dùng xem ngay kế hoạch, tiến trình xin lỗi, đăng báo.<br>  + **Nếu click từ Tab Yêu cầu bồi thường**: Hệ thống tự động cuộn (focus) đến khối nội dung tương ứng theo trạng thái hiện tại của hồ sơ:<br>    * Trạng thái `Chờ nhập liệu`, `Chờ kiểm tra`, `Yêu cầu bổ sung`, `Chờ thụ lý`, `Bị từ chối`, `Từ chối thụ lý`: Focus vào khối **"Thông tin chung vụ việc"**.<br>    * Trạng thái `Đang xác minh thiệt hại`: Focus vào khối **"Xác minh thiệt hại"**.<br>    * Trạng thái `Đang thương lượng`, `Thương lượng không thành công`: Focus vào khối **"Thương lượng bồi thường"**.<br>    * Trạng thái `Chờ ban hành QĐ`, `Hoãn giải quyết`, `Tạm đình chỉ giải quyết`, `Đình chỉ giải quyết`: Focus vào khối **"Quyết định giải quyết bồi thường"**.<br>    * Trạng thái `Chờ thực thi`, `Đang thực thi theo bản án`, `Hoàn thành`: Focus vào khối **"Kết quả giải quyết & Chi trả bồi thường"**.<br>- Khi người dùng đóng tab chi tiết để quay lại tab tra cứu: Hệ thống giữ nguyên tab đang chọn, các tiêu chí bộ lọc đã thiết lập và trang hiện tại của bảng kết quả. |
