### 4.3.2.22. Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký biện pháp bảo đảm

#### 4.3.2.22.1. Mục đích

- Cho phép người dùng lập đề nghị và thực hiện xử lý đối với các trường hợp: Chỉnh lý thông tin sai sót, Hủy đăng ký (Toàn phần hoặc Một phần), Khôi phục việc đăng ký đã bị hủy.

- Việc phê duyệt đề nghị, phân công người thực hiện và ký số văn bản để hoàn tất việc cập nhật dữ liệu trên hệ thống do Lãnh đạo thực hiện tại [Ký duyệt đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Chinh_ly_huy_khoi_phuc_dang_ky_Lanh_dao.md).

- Đảm bảo tính toàn vẹn dữ liệu và lưu trữ vết kiểm toán (Audit Trail) minh bạch phục vụ công tác thanh tra, kiểm tra.

*a. Phân quyền*

- Người dùng được phân quyền truy cập menu "Biện pháp bảo đảm > Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký", chỉ được xem và xử lý hồ sơ thuộc đơn vị được phân công.

*b. Điều kiện thực hiện*

- Người dùng đã đăng nhập thành công vào Website Quản trị.
- Người dùng được phân quyền truy cập menu "Biện pháp bảo đảm > Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký", hệ thống mở trực tiếp [MH01 - Màn hình Danh sách đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh01) (mặc định tại Tab Tất cả).

---

<a id="mh01"></a>
#### 4.3.2.22.2. MH01 - Màn hình Danh sách đề nghị chỉnh lý, hủy và khôi phục đăng ký

##### 4.3.2.22.2.1. Màn hình

![Màn hình Danh sách đề nghị chỉnh lý, hủy và khôi phục đăng ký](images/CLDK_MH01_Danh_sach_ban_lam_viec.png)

##### 4.3.2.22.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Tầng Tab điều hướng nhanh** | - | - | - | Control UI: Nhóm Tab kèm Badge đếm số lượng công việc.<br>Gồm các Tab:<br>+ **Tất cả**: Hiển thị toàn bộ hồ sơ thuộc thẩm quyền quản lý ở tất cả các trạng thái (Chờ duyệt đề nghị, Bị từ chối đề nghị, Chờ thực hiện, Chờ ký số, Bị trả lại, Hoàn thành).<br>+ **Chờ xử lý**: Lọc và hiển thị danh sách hồ sơ ở các trạng thái: Bị từ chối đề nghị, Chờ thực hiện, Bị trả lại.<br>+ **Chờ duyệt đề nghị**: Hiển thị danh sách hồ sơ ở trạng thái "Chờ duyệt đề nghị", chỉ để theo dõi.<br>+ **Chờ ký số**: Hiển thị danh sách hồ sơ ở trạng thái "Chờ ký số", chỉ để theo dõi.<br>- Thao tác Duyệt đề nghị, Từ chối đề nghị, Ký số hồ sơ, Trả lại hồ sơ do Lãnh đạo thực hiện tại [Ký duyệt đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Chinh_ly_huy_khoi_phuc_dang_ky_Lanh_dao.md). |
| Badge Tab | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm, chỉ đọc, hiển thị bên phải tên từng Tab.<br>- Giá trị badge theo Tab:<br>+ Tất cả: Tổng số đề nghị ở tất cả các trạng thái.<br>+ Chờ xử lý: Số đề nghị ở trạng thái "Bị từ chối đề nghị", "Chờ thực hiện", "Bị trả lại".<br>+ Chờ duyệt đề nghị: Số đề nghị ở trạng thái "Chờ duyệt đề nghị".<br>+ Chờ ký số: Số đề nghị ở trạng thái "Chờ ký số".<br>- Chỉ đếm đề nghị thuộc đơn vị quản lý của Người dùng đăng nhập.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge, không hiển thị số 0. |
| Badge menu "Chỉnh lý thông tin/Hủy/Khôi phục đăng ký" | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm, chỉ đọc, hiển thị bên phải tên menu "Biện pháp bảo đảm > Chỉnh lý thông tin/Hủy/Khôi phục đăng ký" trên Left Menu.<br>- Giá trị bằng Badge Tab "Chờ xử lý" (số đề nghị đang chờ phía Cán bộ xử lý).<br>- Chỉ đếm đề nghị thuộc đơn vị quản lý của Người dùng đăng nhập.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge, không hiển thị số 0.<br>- Hệ thống cập nhật lại badge ngay, không cần tải lại trang, sau mỗi thao tác làm thay đổi trạng thái đề nghị. |
| **Bộ lọc tìm kiếm** | - | - | - | Control UI: Khung tìm kiếm hỗ trợ thu gọn/mở rộng. Mặc định hiển thị dạng mở rộng; khi thu gọn các giá trị đã chọn được giữ nguyên. |
| Mã đề nghị | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã đề nghị...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã đề nghị. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng theo Mã khách hàng. |
| Số đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký...".<br>- Tìm kiếm gần đúng theo Số đăng ký phiên bản, Số đăng ký lần đầu hoặc Số đăng ký hủy. |
| Loại đề nghị | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Chỉnh lý thông tin sai sót<br>+ Hủy đăng ký (Toàn phần)<br>+ Hủy đăng ký (Một phần)<br>+ Khôi phục hủy đăng ký |
| Loại đăng ký | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Thông báo xử lý tài sản bảo đảm lần đầu<br>+ Thay đổi thông báo xử lý tài sản bảo đảm |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Danh sách giá trị thay đổi theo Tab đang chọn, chỉ gồm các trạng thái thuộc Tab đó:<br>  * Tab "Tất cả" gồm: <br>+ Tất cả <br>+ Chờ duyệt đề nghị <br>+ Bị từ chối đề nghị <br>+ Chờ thực hiện <br>+ Chờ ký số <br>+ Bị trả lại <br>+ Hoàn thành.<br>  * Tab "Chờ xử lý" gồm: <br>+ Tất cả <br>+ Bị từ chối đề nghị <br>+ Chờ thực hiện <br>+ Bị trả lại.<br>  * Tab "Chờ duyệt đề nghị", "Chờ ký số": Không hiển thị tiêu chí Trạng thái. |
| Tên bên bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên bên bảo đảm...".<br>- Tìm kiếm gần đúng theo tên cá nhân/tổ chức là Bên bảo đảm. |
| Tên bên nhận bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên bên nhận bảo đảm...".<br>- Tìm kiếm gần đúng theo tên Bên nhận bảo đảm. |
| Cán bộ lập đề nghị | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên cán bộ lập đề nghị...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo họ tên Cán bộ lập đề nghị. |
| Cán bộ xử lý | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên cán bộ xử lý...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo họ tên Cán bộ xử lý (cán bộ được phân công thực hiện). |
| Từ ngày | Date | Không | Ngày hiện tại trừ 03 tháng | Control UI: Input text dạng ô chọn ngày (Datepicker).<br>- Lọc theo Thời điểm gửi.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Mặc định: Ngày hiện tại trừ 03 tháng.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Input text dạng ô chọn ngày (Datepicker).<br>- Lọc theo Thời điểm gửi.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Mặc định: Ngày hiện tại.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| **Bảng danh sách đề nghị chỉnh lý, hủy và khôi phục đăng ký** | - | - | - | Control UI: Bảng dữ liệu hiển thị danh sách đề nghị chỉnh lý, hủy và khôi phục đăng ký.<br>- Phía trên góc phải bảng danh sách bố trí Thanh công cụ gồm:<br>  * Nút **"Kết xuất Excel"**: Hiển thị tại mọi Tab.<br>  * Nút **"Lập đề nghị mới"**: Hiển thị tại Tab "Tất cả" và Tab "Chờ xử lý", tự động ẩn ở Tab "Chờ duyệt đề nghị" và Tab "Chờ ký số".<br>- Hỗ trợ sắp xếp động (Sortable) bằng cách click tiêu đề cột.<br>- Trạng thái không có dữ liệu: Hiển thị thông báo theo [[MSG-INF-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-sys-001). |
| STT | Integer(10) | Có | Tự tăng | Control UI: Label, căn giữa.<br>- Số thứ tự dòng trên trang hiện tại. |
| Mã đề nghị | String(50) | Có | Theo hồ sơ | Control UI: Hyperlink.<br>- Mã đề nghị do hệ thống sinh tự động dạng `ĐN-YYYY/STT`.<br>- Khi click: Mở màn hình xem chi tiết đề nghị. |
| Loại đề nghị | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label dạng nhãn trạng thái (Badge).<br>Gồm:<br>+ Chỉnh lý thông tin sai sót<br>+ Hủy đăng ký (Toàn phần)<br>+ Hủy đăng ký (Một phần)<br>+ Khôi phục hủy đăng ký |
| Mã KH | String(50) | Có | Theo hồ sơ | Control UI: Label, căn giữa.<br>- Mã khách hàng của người yêu cầu đăng ký. |
| Số đăng ký | String(50) | Có | Theo hồ sơ | Control UI: Label, căn giữa, in đậm.<br>- Tùy theo Loại đề nghị mà hiển thị số tương ứng:<br>  * Chỉnh lý: Hiển thị Số đăng ký phiên bản sai sót.<br>  * Hủy đăng ký: Hiển thị Số đăng ký lần đầu.<br>  * Khôi phục: Hiển thị Số đăng ký hủy. |
| Loại đăng ký | String(255) | Có | Theo hồ sơ | Control UI: Label, căn giữa.<br>- Theo dữ liệu bản ghi. |
| Tên bên bảo đảm | Text | Có | Theo hồ sơ | Control UI: Label, căn trái, in đậm vừa.<br>- Tên cá nhân hoặc tổ chức là Bên bảo đảm của hồ sơ gốc. Cột riêng biệt, không gộp chung với Bên nhận bảo đảm. |
| Tên bên nhận bảo đảm | Text | Có | Theo hồ sơ | Control UI: Label, căn trái, in đậm vừa.<br>- Tên cá nhân hoặc tổ chức tín dụng là Bên nhận bảo đảm của hồ sơ gốc. Cột riêng biệt, không gộp chung với Bên bảo đảm. |
| Cán bộ lập đề nghị | String(255) | Có | Theo hồ sơ | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Cán bộ xử lý | String(255) | Không | Theo hồ sơ | Control UI: Label.<br>- Cán bộ được phân công thực hiện tại [MH04 - Popup Duyệt đề nghị và Phân công người thực hiện - Ký duyệt đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Chinh_ly_huy_khoi_phuc_dang_ky_Lanh_dao.md#mh04).<br>- Đề nghị chưa được phê duyệt (trạng thái "Chờ duyệt đề nghị", "Bị từ chối đề nghị"): Hiển thị "-". |
| Thời điểm gửi | Datetime | Có | Theo hồ sơ | Control UI: Label, căn giữa.<br>- Thời điểm gửi đề nghị hoặc gửi trình ký số.<br>- Định dạng chuẩn: `dd/mm/yyyy hh:mm`. |
| Trạng thái | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label dạng nhãn trạng thái (Badge). |
| Thao tác | - | - | - | Control UI: Icon.<br>Chi tiết xem ở Chức năng trên màn hình theo Từng Tab nghiệp vụ.<br>- Không hiển thị cột Thao tác tại Tab "Chờ duyệt đề nghị" và Tab "Chờ ký số". |

<a id="mh01_chuc_nang"></a>
##### 4.3.2.22.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Tab | Tab | Hệ thống thực hiện:<br>+ Lọc và hiển thị danh sách hồ sơ tương ứng theo Tab được chọn (Tất cả / Chờ xử lý / Chờ duyệt đề nghị / Chờ ký số).<br>+ Tính lại Badge số lượng công việc trên từng Tab.<br>+ Nạp lại danh sách giá trị của tiêu chí Trạng thái theo Tab được chọn (ẩn tiêu chí Trạng thái tại Tab chỉ có 01 trạng thái). Nếu trạng thái đang chọn không thuộc Tab mới, hệ thống đưa tiêu chí Trạng thái về "Tất cả".<br>+ Giữ nguyên các điều kiện bộ lọc tìm kiếm khác đang nhập và đưa phân trang về Trang 1. |
| 2 | Tìm kiếm | Nút | Hệ thống tìm kiếm theo các điều kiện đã chọn tại Khối Bộ lọc tìm kiếm trong phạm vi đơn vị được phân quyền của Người dùng đăng nhập.<br>- **TH1 (Điều kiện ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày` (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày), hệ thống hiển thị [[MSG-ERR-VAL-007]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-007), highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [[MSG-INF-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-sys-001).<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Hợp lệ (Có dữ liệu trả về)**: Hệ thống thực hiện:<br>+ Hiển thị danh sách đề nghị thỏa mãn đồng thời các điều kiện lọc.<br>+ Sắp xếp mặc định theo `Thời điểm gửi` giảm dần.<br>+ Phân trang theo số dòng hiển thị đang chọn. |
| 3 | Xóa bộ lọc | Nút | Hệ thống thực hiện:<br>+ Đưa toàn bộ các tiêu chí lọc về giá trị mặc định ban đầu.<br>+ Đặt lại phân trang về Trang 1 và tải lại danh sách dữ liệu. |
| 4 | Kết xuất Excel | Nút trên thanh công cụ | Hiển thị tại mọi Tab trên thanh công cụ phía trên bảng danh sách.<br>- Khi bấm: Xuất toàn bộ danh sách kết quả tìm kiếm theo Tab và điều kiện lọc hiện tại ra tệp định dạng `.xlsx`. Tên tệp xuất theo quy chuẩn: `Danh_sach_de_nghi_chinh_ly_huy_khoi_phuc_ddmmyyyy.xlsx`. |
| 5 | Lập đề nghị mới | Nút trên thanh công cụ | - Điều kiện hiển thị: Hiển thị tại Tab "Tất cả" và Tab "Chờ xử lý". Tự động ẩn tại Tab "Chờ duyệt đề nghị" và Tab "Chờ ký số".<br>- Thao tác: Khi bấm, mở [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh02) ở chế độ tạo mới. |
| **Chức năng trên Tab Tất cả** | | | |
| 6 | Click dòng dữ liệu | Row Click | Thao tác click trực tiếp vào dòng dữ liệu hoặc click liên kết Mã đề nghị:<br>- Nếu hồ sơ ở trạng thái "Chờ duyệt đề nghị", "Bị từ chối đề nghị", "Chờ thực hiện", "Bị trả lại": Mở [MH03 - Màn hình Xem chi tiết đề nghị](#mh03).<br>- Nếu hồ sơ ở trạng thái "Chờ ký số" hoặc "Hoàn thành": Mở [MH05 - Màn hình Xem chi tiết hồ sơ trình ký](#mh05) ở chế độ chỉ đọc. |
| 7 | Cập nhật đề nghị | Nút trên dòng | - Điều kiện hiển thị: Chỉ hiển thị đối với hồ sơ ở trạng thái "Bị từ chối đề nghị".<br>- Thao tác: Mở lại [MH02](#mh02) ở chế độ chỉnh sửa để cập nhật nội dung đề xuất và gửi đề nghị lại. |
| 8 | Thực hiện đề nghị | Nút trên dòng | - Điều kiện hiển thị: Chỉ hiển thị đối với hồ sơ ở trạng thái "Chờ thực hiện".<br>- Chỉ hiển thị đối với cán bộ được phân công thực hiện; đối với cán bộ khác, ẩn nút.<br>- Thao tác: Mở [MH04 - Màn hình Thực hiện chỉnh lý, hủy và khôi phục đăng ký](#mh04). |
| 9 | Sửa hồ sơ trình ký | Nút trên dòng | - Điều kiện hiển thị: Chỉ hiển thị đối với hồ sơ ở trạng thái "Bị trả lại".<br>- Thao tác: Mở lại [MH04](#mh04) để chỉnh sửa và hoàn thiện lại hồ sơ trước khi trình ký lại. |
| **Chức năng trên Tab Chờ xử lý** | | | |
| 10 | Click dòng dữ liệu | Row Click | Thao tác click trực tiếp vào dòng dữ liệu hoặc click liên kết Mã đề nghị:<br>- Mở [MH03 - Màn hình Xem chi tiết đề nghị](#mh03). |
| 11 | Cập nhật đề nghị | Nút trên dòng | - Điều kiện hiển thị: Chỉ hiển thị đối với hồ sơ ở trạng thái "Bị từ chối đề nghị".<br>- Thao tác: Mở [MH02](#mh02) ở chế độ chỉnh sửa để cập nhật nội dung đề xuất và gửi đề nghị lại. |
| 12 | Thực hiện đề nghị | Nút trên dòng | - Điều kiện hiển thị: Chỉ hiển thị đối với hồ sơ ở trạng thái "Chờ thực hiện".<br>- Chỉ hiển thị đối với cán bộ được phân công thực hiện; đối với cán bộ khác, ẩn nút.<br>- Thao tác: Mở [MH04](#mh04). |
| 13 | Sửa hồ sơ trình ký | Nút trên dòng | - Điều kiện hiển thị: Chỉ hiển thị đối với hồ sơ ở trạng thái "Bị trả lại".<br>- Thao tác: Mở [MH04](#mh04). |
| **Chức năng trên Tab Chờ duyệt đề nghị** | | | |
| 14 | Click dòng dữ liệu | Row Click | Mở [MH03 - Màn hình Xem chi tiết đề nghị](#mh03) ở chế độ chỉ đọc, chỉ có chức năng Đóng. |
| **Chức năng trên Tab Chờ ký số** | | | |
| 15 | Click dòng dữ liệu | Row Click | Mở [MH05 - Màn hình Xem chi tiết hồ sơ trình ký](#mh05) ở chế độ chỉ đọc, chỉ có chức năng Đóng. |

---

<a id="mh02"></a>
#### 4.3.2.22.3. MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký

##### 4.3.2.22.3.1. Màn hình

![Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](images/CLDK_MH02_Lap_de_nghi.png)

##### 4.3.2.22.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Chế độ Cập nhật đề nghị** | - | - | - | Áp dụng khi mở màn hình từ chức năng "Cập nhật đề nghị" tại [MH01](#mh01) hoặc "Cập nhật lại đề nghị" tại [MH03 - Màn hình Xem chi tiết đề nghị](#mh03) (đề nghị ở trạng thái "Bị từ chối đề nghị").<br>- Hệ thống nạp lại toàn bộ dữ liệu đề nghị đã lập (Loại đề nghị, Số đăng ký, Căn cứ và nội dung đề xuất, tài sản đã chọn hủy, Tệp tin đính kèm) và tự động tra cứu lại Số đăng ký.<br>- Mã đề nghị, Cán bộ lập đề nghị, Đơn vị công tác, Thời điểm lập giữ nguyên theo đề nghị đã lập.<br>- Hiển thị thêm **Khối Thông tin từ chối đề nghị**. |
| **I. Thông tin chung đề nghị** | - | - | - | |
| Mã đề nghị | String(50) | Có | Tự động sinh | Control UI: Input text, chỉ đọc.<br>- Hệ thống tự động sinh theo quy tắc: `ĐN-YYYY/STT`. |
| Cán bộ lập đề nghị | String(255) | Có | Theo tài khoản | Control UI: Input text, chỉ đọc.<br>- Họ tên Người dùng đang đăng nhập. |
| Đơn vị công tác | String(255) | Có | Theo tài khoản | Control UI: Input text, chỉ đọc.<br>- Tên Trung tâm đăng ký hoặc Chi nhánh của Người dùng. |
| Thời điểm lập | Datetime | Có | Thời điểm hiện tại | Control UI: Input text, chỉ đọc.<br>- Định dạng chuẩn: `dd/mm/yyyy hh:mm`. |
| Loại đề nghị | Enum(String(50)) | Có | Chỉnh lý thông tin sai sót | Control UI: Combobox.<br>Gồm:<br>+ Chỉnh lý thông tin sai sót<br>+ Hủy đăng ký (Toàn phần)<br>+ Hủy đăng ký (Một phần)<br>+ Khôi phục hủy đăng ký<br>- Trong tài liệu này, "Loại đề nghị là Hủy đăng ký" được hiểu bao gồm cả "Hủy đăng ký (Toàn phần)" và "Hủy đăng ký (Một phần)".<br>- Khi thay đổi Loại đề nghị, hệ thống tự động xóa trắng ô Số đăng ký, ẩn nút "Gửi đề nghị" và ẩn toàn bộ các khối nội dung chi tiết phía dưới cho đến khi thực hiện tra cứu lại.<br>- Riêng khi chuyển giữa "Hủy đăng ký (Toàn phần)" và "Hủy đăng ký (Một phần)" sau khi đã tra cứu hợp lệ: Hệ thống giữ nguyên Số đăng ký, kết quả tra cứu và dữ liệu đã nhập; chỉ hiển thị lại khối **IV. Thông tin hồ sơ gốc** theo quy tắc của Loại đề nghị mới (chuyển sang "Hủy đăng ký (Một phần)" thì hiển thị cột Checkbox, chưa tích tài sản nào để Người dùng tự chọn; chuyển sang "Hủy đăng ký (Toàn phần)" thì ẩn cột Checkbox).<br>- Ở Chế độ Cập nhật đề nghị: Hệ thống chọn sẵn "Hủy đăng ký (Toàn phần)" hoặc "Hủy đăng ký (Một phần)" theo hình thức hủy của đề nghị đã lập. |
| Số đăng ký | String(50) | Có | Trống | Control UI: Input text.<br>- Nhãn hiển thị và placeholder thay đổi động theo Loại đề nghị:<br>  * Nếu Loại đề nghị là "Chỉnh lý thông tin sai sót": Nhãn là **Số đăng ký phiên bản sai sót**, placeholder: "Nhập số đăng ký phiên bản cần chỉnh lý...".<br>  * Nếu Loại đề nghị là "Hủy đăng ký": Nhãn là **Số đăng ký lần đầu**, placeholder: "Nhập số đăng ký lần đầu cần hủy...".<br>  * Nếu Loại đề nghị là "Khôi phục hủy đăng ký": Nhãn là **Số đăng ký hủy**, placeholder: "Nhập số đăng ký hủy cần khôi phục...". |
| Tra cứu | - | - | - | Control UI: Button. |
| Thông báo lỗi tra cứu | Text | Không | Trống | Control UI: Label hiển thị cảnh báo lỗi dạng inline chữ màu đỏ ngay phía dưới ô nhập Số đăng ký khi có lỗi tra cứu. |
| **Khối Thông tin từ chối đề nghị** | - | - | - | Chỉ hiển thị ở Chế độ Cập nhật đề nghị.<br>- Hiển thị giống **Khối Thông tin từ chối đề nghị** tại [MH03 - Màn hình Xem chi tiết đề nghị](#mh03), đặt ngay dưới Khối I, mặc định mở rộng. |
| **II. Căn cứ và nội dung đề xuất (Hiển thị theo từng Loại đề nghị)** | - | - | - | Hiển thị sau khi tra cứu hợp lệ: |
| **Nếu Loại đề nghị là "Chỉnh lý thông tin sai sót"** | - | - | - | Hiển thị các trường văn bản mô tả cụ thể: |
| Nội dung sai sót | Text | Có | Trống | Control UI: Textarea (Chiều cao tối thiểu 3 dòng).<br>- Nhập chi tiết thông tin bị sai sót trong phiên bản đã đăng ký. |
| Nội dung đề nghị chỉnh lý | Text | Có | Trống | Control UI: Textarea (Chiều cao tối thiểu 3 dòng).<br>- Nhập chi tiết nội dung đề xuất sửa đổi chuẩn xác. |
| Căn cứ & Lý do sai sót | Text | Có | Trống | Control UI: Textarea.<br>- Nhập nguyên nhân dẫn đến sai sót. |
| **Nếu Loại đề nghị là "Hủy đăng ký"** | - | - | - | Hiển thị trường nhập lý do hủy: |
| Căn cứ & Lý do đề nghị hủy | Text | Có | Trống | Control UI: Textarea (Tối thiểu 3 dòng).<br>- Nhập căn cứ pháp lý và lý do hủy hồ sơ.<br>- Bắt buộc nhập.<br>- **Quy tắc tích chọn tài sản theo Loại đề nghị** (chỉ tính trên các tài sản còn hiệu lực của hồ sơ gốc, không tính các tài sản đã bị hủy tại giao dịch Hủy đăng ký một phần trước đó ở trạng thái "Hoàn thành" và chưa được khôi phục):<br>  * "Hủy đăng ký (Toàn phần)": Hệ thống mặc định hủy toàn bộ tài sản còn hiệu lực (toàn bộ các dòng tài sản tại các bảng danh sách và toàn bộ các loại tài sản không có bảng danh sách); không hiển thị cột Checkbox chọn tài sản, Người dùng không phải tích chọn.<br>  * "Hủy đăng ký (Một phần)": Người dùng tự tích chọn tài sản đề nghị hủy, bắt buộc tối thiểu 01 tài sản. Nếu Người dùng tích chọn toàn bộ tài sản còn hiệu lực, hệ thống tự động chuyển Loại đề nghị sang "Hủy đăng ký (Toàn phần)", ẩn cột Checkbox và hiển thị [[MSG-INF-CLDK-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-cldk-001). |
| **Nếu Loại đề nghị là "Khôi phục hủy đăng ký"** | - | - | - | Hiển thị trường nhập lý do khôi phục: |
| Căn cứ & Lý do đề nghị khôi phục việc đăng ký | Text | Có | Trống | Control UI: Textarea (Tối thiểu 3 dòng).<br>- Nhập căn cứ pháp lý và lý do đề nghị khôi phục hiệu lực việc đăng ký.<br>- Bắt buộc nhập. |
| **III. Tệp tin đính kèm** | - | - | - | Chỉ hiển thị sau khi tra cứu Số đăng ký hợp lệ và hồ sơ ở trạng thái "Hoàn thành": |
| Tải tệp đính kèm | File | Có | Trống | Control UI: Component tải file Việt hóa.<br>- Định dạng hỗ trợ: `.pdf`, `.doc`, `.docx`, `.png`, `.jpg` (Dung lượng tối đa 20MB/file).<br>- Cho phép đính kèm nhiều file.<br>- Ngay sau khi tải lên thành công: Hiển thị tên file kèm liên kết `Xem file` (mở tab mới) và nút `Xóa` ngay cạnh tên file.<br>- Tệp không đúng định dạng hỗ trợ: Hệ thống không tải tệp lên, hiển thị [[MSG-ERR-CLDK-003]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-003) ngay dưới component tải file.<br>- Tệp vượt quá 20MB: Hệ thống không tải tệp lên, hiển thị [[MSG-ERR-FILE-004]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-file-004) ngay dưới component tải file.<br>- Khi click `Xóa`: Hệ thống hiển thị [[MSG-CFM-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-cfm-sys-001) (Tên bản ghi là tên tệp). Chọn Đồng ý: xóa tệp khỏi danh sách; chọn Hủy: giữ nguyên. |
| **Khối Thông tin giao dịch hủy đã thực hiện trước đây** | - | - | - | Control UI: Khối thông tin mở rộng/thu gọn, chỉ đọc, mặc định mở rộng, đặt ngay sau khối **III. Tệp tin đính kèm**.<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Loại đề nghị là "Khôi phục hủy đăng ký" và tra cứu Số đăng ký hủy hợp lệ.<br>- Hiển thị đầy đủ hồ sơ của giao dịch hủy theo Số đăng ký hủy đã nhập, bố cục giống màn hình Xem chi tiết phiên bản đăng ký; không hiển thị Sidebar dòng thời gian lịch sử.<br>- Toàn bộ dữ liệu lấy theo dữ liệu bản ghi của giao dịch hủy (dữ liệu hồ sơ tại thời điểm hủy). |
| Tiêu đề giao dịch hủy | - | - | - | Control UI: Label, chỉ đọc, gồm 2 dòng:<br>- Dòng 1 (chữ in đậm): `Hủy đăng ký - Trạng thái: [Trạng thái]`.<br>- Dòng 2 (chữ nhỏ, màu nhạt): `Số đăng ký: [Số đăng ký hủy] \| Thời điểm đăng ký: [Thời điểm thực hiện hủy]`; Thời điểm hiển thị định dạng `dd/mm/yyyy hh:mm:ss`. |
| **1. Thông tin hồ sơ** | - | - | - | |
| Loại đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số đăng ký hủy | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm thực hiện hủy | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Trạng thái hồ sơ | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số đăng ký lần đầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm đăng ký lần đầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Văn bản xác nhận hủy | - | - | - | Control UI: Link "Xem file".<br>- Văn bản xác nhận hủy đã ký số, theo dữ liệu bản ghi.<br>- Khi click: Mở file PDF tại tab mới. |
| **2. Thông tin hủy đăng ký** | - | - | - | |
| Mã đề nghị hủy | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Hình thức hủy | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi: "Hủy đăng ký toàn phần" hoặc "Hủy đăng ký một phần". |
| Người thực hiện hủy | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Người ký duyệt | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Lý do đã hủy trước đây | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Tệp tin đính kèm của đề nghị hủy | - | - | - | Control UI: Danh sách file, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Mỗi file có liên kết `Xem file` (mở tab mới) và `Tải xuống`. |
| **3. Thông tin chung & Nghĩa vụ được bảo đảm (Tiêu đề động)** | - | - | - | Tiêu đề khối thay đổi theo Loại biện pháp / Loại hợp đồng. Chỉ đọc. |
| Loại hình giao dịch | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại biện pháp / Loại hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Ngày có hiệu lực của hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Quy mô | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Chủ doanh nghiệp là nữ giới? | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi: "Có" hoặc "Không". |
| **4. Bên bảo đảm (Tiêu đề động)** | - | - | - | Control UI: Bảng dữ liệu chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Hiển thị các cột: STT, LOẠI CHỦ THỂ, SỐ GIẤY TỜ CHỨNG MINH TƯ CÁCH PHÁP LÝ, TÊN, ĐỊA CHỈ. |
| **5. Bên nhận bảo đảm (Tiêu đề động)** | - | - | - | Control UI: Bảng dữ liệu chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Hiển thị các cột: STT, TÊN, ĐỊA CHỈ. |
| **6. Tài sản bảo đảm (Tiêu đề động)** | - | - | - | Control UI: Các bảng/khối tài sản chỉ đọc.<br>- Hiển thị toàn bộ tài sản của hồ sơ tại thời điểm hủy, cấu trúc các bảng/trường giống khối **4. Tài sản bảo đảm** của khối IV. Thông tin hồ sơ gốc (không hiển thị cột Checkbox, không có vùng tìm kiếm nhanh).<br>- Các bảng danh sách tài sản bổ sung cột **TRẠNG THÁI** ở cuối bảng:<br>  * Tài sản đã bị hủy trong giao dịch hủy: Dòng nền đỏ nhạt, tag `[Đã hủy]` màu đỏ.<br>  * Tài sản không bị hủy: tag `[Đang bảo đảm]` màu xám.<br>- Loại tài sản không có bảng danh sách: Hiển thị tag `[Đã hủy]` hoặc `[Đang bảo đảm]` ngay dưới tiêu đề Loại tài sản. |
| **IV. Thông tin hồ sơ gốc** | - | - | - | Control UI: Khối thông tin mở rộng/thu gọn (mặc định hiển thị dạng mở rộng, cho phép thu gọn).<br>- Tải và hiển thị thông tin của Hồ sơ gốc ở chế độ chỉ đọc khi Loại đề nghị là "Chỉnh lý thông tin sai sót" hoặc "Hủy đăng ký".<br>- Không hiển thị khối này nếu Loại đề nghị là "Khôi phục hủy đăng ký"; thông tin hồ sơ đã được hiển thị đầy đủ tại **Khối Thông tin giao dịch hủy đã thực hiện trước đây**.<br>- Riêng nếu Loại đề nghị là "Hủy đăng ký (Một phần)": Hiển thị thêm cột Checkbox tại Bảng tài sản bảo đảm để người dùng tích chọn tài sản đề nghị hủy. Nếu Loại đề nghị là "Hủy đăng ký (Toàn phần)": Không hiển thị cột Checkbox; toàn bộ tài sản còn hiệu lực được xác định là tài sản đề nghị hủy.<br>- Nếu hồ sơ đã có giao dịch Hủy đăng ký một phần ở trạng thái "Hoàn thành" và chưa được khôi phục: Các tài sản đã bị hủy vẫn hiển thị, kèm nhãn `[Đã hủy]` màu đỏ (dòng tài sản tại các bảng danh sách: nhãn đặt ở cuối dòng; loại tài sản không có bảng danh sách: nhãn đặt ngay sau tiêu đề Loại tài sản), toàn bộ chỉ đọc; với Loại đề nghị là "Hủy đăng ký (Một phần)", Checkbox của các tài sản này ở trạng thái khóa (Disabled), không cho tích chọn. |
| **1. Thông tin chung hồ sơ gốc** | - | - | - | Hiển thị dạng khối thông tin chỉ đọc: |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi: Số đăng ký của phiên bản hồ sơ được nạp (Chỉnh lý: phiên bản sai sót; Hủy đăng ký: phiên bản mới nhất theo Số đăng ký lần đầu). |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Số đăng ký lần đầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị nếu Loại đề nghị là "Hủy đăng ký". |
| Thời điểm đăng ký lần đầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị nếu Loại đề nghị là "Hủy đăng ký".<br>- Định dạng chuẩn: `dd/mm/yyyy hh:mm:ss`. |
| Loại hình giao dịch | - | - | - | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Biện pháp bảo đảm<br>+ Hợp đồng |
| Loại biện pháp / Loại hợp đồng | - | - | - | Control UI: Label, chỉ đọc. |
| Số hợp đồng | - | - | - | Control UI: Label, chỉ đọc. |
| Ngày có hiệu lực của hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Định dạng chuẩn: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | - | - | - | Control UI: Label, chỉ đọc. |
| Quy mô | - | - | - | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Quy mô bên bảo đảm [DM_12]. |
| Chủ doanh nghiệp là nữ giới? | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị "Có" hoặc "Không". |
| **2. Bên bảo đảm (Tiêu đề động)** | - | - | - | Tiêu đề khối thay đổi động theo Loại biện pháp / Loại hợp đồng tương tự quy tắc tại Màn hình Đăng ký mới BPBĐ trên Website khách hàng. |
| Bảng danh sách Bên bảo đảm | - | - | - | Control UI: Bảng dữ liệu chỉ đọc hiển thị danh sách các chủ thể Bên bảo đảm của hồ sơ gốc. |
| STT | - | - | - | Control UI: Label, căn giữa.<br>- Số thứ tự dòng dữ liệu. |
| LOẠI CHỦ THỂ | - | - | - | Control UI: Label.<br>- Loại chủ thể của Bên bảo đảm. |
| SỐ GIẤY TỜ CHỨNG MINH TƯ CÁCH PHÁP LÝ | - | - | - | Control UI: Label, căn giữa.<br>- Số CMND, CCCD, Hộ chiếu, Mã định danh cá nhân, Mã số thuế hoặc ĐKKD. |
| TÊN | - | - | - | Control UI: Label, in đậm vừa.<br>- Họ và tên cá nhân hoặc tên tổ chức. |
| ĐỊA CHỈ | - | - | - | Control UI: Label.<br>- Định dạng: "Địa chỉ chi tiết - Phường/Xã - Tỉnh/Thành phố - Quốc gia". |
| **3. Bên nhận bảo đảm (Tiêu đề động)** | - | - | - | Tiêu đề khối thay đổi động theo Loại biện pháp / Loại hợp đồng tương tự quy tắc tại Màn hình Đăng ký mới BPBĐ trên Website khách hàng. |
| Bảng danh sách Bên nhận bảo đảm | - | - | - | Control UI: Bảng dữ liệu chỉ đọc hiển thị danh sách các chủ thể Bên nhận bảo đảm của hồ sơ gốc. |
| STT | - | - | - | Control UI: Label, căn giữa.<br>- Số thứ tự dòng dữ liệu. |
| TÊN | - | - | - | Control UI: Label, in đậm vừa.<br>- Tên đầy đủ của tổ chức tín dụng hoặc cá nhân nhận bảo đảm. |
| ĐỊA CHỈ | - | - | - | Control UI: Label.<br>- Định dạng: "Địa chỉ chi tiết - Phường/Xã - Tỉnh/Thành phố - Quốc gia". |
| **4. Tài sản bảo đảm (Tiêu đề động)** | - | - | - | Tự động điều chỉnh theo loại hình giao dịch là "Biện pháp bảo đảm" hoặc "Hợp đồng".<br>- Nếu Loại hình giao dịch là "Biện pháp bảo đảm" thì hiển thị "Tài sản bảo đảm".<br>- Nếu Loại hình giao dịch là "Hợp đồng" thì hiển thị tương ứng theo Loại Hợp đồng ("Tài sản cho thuê tài chính", "Tài sản thuê", "Quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác được chuyển giao", "Hàng hóa ký gửi").<br>- **Chế độ hiển thị**: Toàn bộ các thông tin tài sản hiển thị ở chế độ chỉ đọc. Riêng nếu Loại đề nghị là "Hủy đăng ký": các bảng danh sách tài sản sẽ hiển thị thêm cột Checkbox (và ô Checkbox "Chọn tất cả" tại tiêu đề bảng) để Người dùng tích chọn tài sản đề nghị hủy.<br>- **Loại tài sản không có bảng danh sách** (Cây hằng năm, công trình tạm; Các động sản khác; Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản; Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng): Nếu Loại đề nghị là "Hủy đăng ký", hiển thị 01 Checkbox ngay trước tiêu đề Loại tài sản để chọn hủy toàn bộ thông tin của loại tài sản đó. Mỗi loại tài sản này được tính là 01 tài sản khi xác định hình thức hủy. |
| Mô tả | - | - | - | Control UI: Textarea/Label chỉ đọc.<br>- Hiển thị nội dung mô tả tài sản khi hồ sơ gốc có đăng ký "Cây hằng năm, công trình tạm" hoặc "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)". |
| Vùng tìm kiếm nhanh - Bảng thông tin Số khung | - | - | - | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Số khung.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập/ô chọn riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>+ Tên phương tiện.<br>+ Số khung.<br>+ Số máy.<br>+ Biển số.<br>+ Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>+ Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>+ Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Số khung theo các tiêu chí đã nhập.<br>+ Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>+ Kết quả lọc không làm thay đổi dữ liệu gốc của bảng và không làm mất trạng thái checkbox các dòng đã chọn.<br>+ Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Số khung | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Chỉ hiển thị ngay bên dưới khi hồ sơ gốc có loại tài sản "Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)".<br>- Tiêu đề bảng là **Số khung**.<br>- Hiển thị các cột:<br>+ Checkbox (Chỉ hiển thị khi Loại đề nghị là "Hủy đăng ký").<br>+ STT.<br>+ **TÊN PHƯƠNG TIỆN**.<br>+ NHÃN HIỆU, MÀU SƠN.<br>+ SỐ KHUNG.<br>+ SỐ MÁY.<br>+ BIỂN SỐ. |
| Checkbox | Boolean | Có | Mặc định chưa tích | Control UI: Checkbox chọn tài sản hủy.<br>- Chỉ hiển thị khi Loại đề nghị là "Hủy đăng ký (Một phần)".<br>- Header có Checkbox "Chọn tất cả" để tích chọn/bỏ chọn toàn bộ dòng.<br>- Checkbox tại mỗi dòng dùng để chọn tài sản đề nghị hủy.<br>- Loại đề nghị là "Hủy đăng ký (Toàn phần)": Không hiển thị cột Checkbox; hệ thống mặc định hủy toàn bộ tài sản còn hiệu lực.<br>- Loại đề nghị là "Hủy đăng ký (Một phần)": Cho phép tích chọn/bỏ chọn; tích chọn toàn bộ tài sản thì tự động chuyển sang "Hủy đăng ký (Toàn phần)".<br>- Tài sản đã bị hủy tại giao dịch Hủy đăng ký một phần trước đó: Checkbox ở trạng thái khóa (Disabled), không tích chọn được; Checkbox "Chọn tất cả" chỉ chọn các tài sản chưa bị hủy. |
| STT | - | - | - | Control UI: Label, căn giữa.<br>- Số thứ tự dòng. |
| TÊN PHƯƠNG TIỆN | - | - | - | Control UI: Label. |
| NHÃN HIỆU, MÀU SƠN | - | - | - | Control UI: Label. |
| SỐ KHUNG | - | - | - | Control UI: Label, in đậm. |
| SỐ MÁY | - | - | - | Control UI: Label. |
| BIỂN SỐ | - | - | - | Control UI: Label. |
| Vùng tìm kiếm nhanh - Bảng thông tin Phương tiện | - | - | - | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Phương tiện.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>+ Tên phương tiện.<br>+ Tên chủ phương tiện.<br>+ Số đăng ký.<br>+ Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>+ Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>+ Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Phương tiện theo các tiêu chí đã nhập.<br>+ Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>+ Kết quả lọc không làm thay đổi dữ liệu gốc của bảng và không làm mất trạng thái checkbox các dòng đã chọn.<br>+ Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Phương tiện | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Chỉ hiển thị ngay bên dưới khi hồ sơ gốc có loại tài sản "Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt".<br>- Tiêu đề bảng là **Phương tiện**.<br>- Hiển thị các cột:<br>+ Checkbox (Chỉ hiển thị khi Loại đề nghị là "Hủy đăng ký").<br>+ STT.<br>+ **TÊN PHƯƠNG TIỆN, NHÃN HIỆU**.<br>+ TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>+ SỐ ĐĂNG KÝ.<br>+ CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>+ CẤP PHƯƠNG TIỆN. |
| Checkbox | Boolean | Có | Mặc định chưa tích | Control UI: Checkbox chọn tài sản hủy.<br>- Chỉ hiển thị khi Loại đề nghị là "Hủy đăng ký (Một phần)".<br>- Header có Checkbox "Chọn tất cả" để tích chọn/bỏ chọn toàn bộ dòng.<br>- Loại đề nghị là "Hủy đăng ký (Toàn phần)": Không hiển thị cột Checkbox; hệ thống mặc định hủy toàn bộ tài sản còn hiệu lực.<br>- Loại đề nghị là "Hủy đăng ký (Một phần)": Cho phép tích chọn/bỏ chọn; tích chọn toàn bộ tài sản thì tự động chuyển sang "Hủy đăng ký (Toàn phần)".<br>- Tài sản đã bị hủy tại giao dịch Hủy đăng ký một phần trước đó: Checkbox ở trạng thái khóa (Disabled), không tích chọn được; Checkbox "Chọn tất cả" chỉ chọn các tài sản chưa bị hủy. |
| STT | - | - | - | Control UI: Label, căn giữa.<br>- Số thứ tự dòng. |
| TÊN PHƯƠNG TIỆN, NHÃN HIỆU | - | - | - | Control UI: Label. |
| TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU | - | - | - | Control UI: Label. |
| SỐ ĐĂNG KÝ | - | - | - | Control UI: Label. |
| CƠ QUAN CẤP GIẤY CHỨNG NHẬN | - | - | - | Control UI: Label. |
| CẤP PHƯƠNG TIỆN | - | - | - | Control UI: Label. |
| Tên quyền | - | - | - | Control UI: Label/Textarea, chỉ đọc.<br>- Chỉ hiển thị khi hồ sơ gốc có Loại tài sản "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Căn cứ phát sinh quyền | - | - | - | Control UI: Label/Textarea, chỉ đọc.<br>- Chỉ hiển thị khi hồ sơ gốc có Loại tài sản "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Hàng hóa luân chuyển / Kho hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị khi hồ sơ gốc có Loại tài sản "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ".<br>Gồm:<br>+ Hàng hóa luân chuyển<br>+ Kho hàng |
| Giá trị hàng hóa/Tên, loại hàng hóa | - | - | - | Control UI: Label/Textarea, chỉ đọc.<br>- Chỉ hiển thị khi chọn là "Hàng hóa luân chuyển" hoặc "Kho hàng". |
| Địa chỉ kho hàng | - | - | - | Control UI: Label/Textarea, chỉ đọc.<br>- Chỉ hiển thị khi chọn là "Kho hàng". Định dạng: "Địa chỉ chi tiết - Phường/Xã - Tỉnh/Thành phố - Quốc gia". |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | - | - | - | Control UI: Label/Textarea, chỉ đọc.<br>- Chỉ hiển thị khi chọn là "Kho hàng". |
| Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Chỉ hiển thị ngay bên dưới khi hồ sơ gốc có loại tài sản "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung".<br>- Bảng dữ liệu hiển thị thông tin thời gian và tệp tin chứng nhận đính kèm.<br>- Hiển thị các cột:<br>+ Checkbox (Chỉ hiển thị khi Loại đề nghị là "Hủy đăng ký").<br>+ STT.<br>+ GIỜ.<br>+ PHÚT.<br>+ NGÀY.<br>+ THÁNG.<br>+ NĂM.<br>+ ĐÍNH KÈM FILE .PDF. |
| Checkbox | Boolean | Có | Mặc định chưa tích | Control UI: Checkbox chọn tài sản hủy.<br>- Chỉ hiển thị khi Loại đề nghị là "Hủy đăng ký (Một phần)".<br>- Loại đề nghị là "Hủy đăng ký (Toàn phần)": Không hiển thị cột Checkbox; hệ thống mặc định hủy toàn bộ tài sản còn hiệu lực.<br>- Loại đề nghị là "Hủy đăng ký (Một phần)": Cho phép tích chọn/bỏ chọn; tích chọn toàn bộ tài sản thì tự động chuyển sang "Hủy đăng ký (Toàn phần)".<br>- Tài sản đã bị hủy tại giao dịch Hủy đăng ký một phần trước đó: Checkbox ở trạng thái khóa (Disabled), không tích chọn được; Checkbox "Chọn tất cả" chỉ chọn các tài sản chưa bị hủy. |
| STT | - | - | - | Control UI: Label, căn giữa.<br>- Số thứ tự dòng. |
| GIỜ | - | - | - | Control UI: Label, căn giữa.<br>- Giờ đăng ký tại VSDC. |
| PHÚT | - | - | - | Control UI: Label, căn giữa.<br>- Phút đăng ký tại VSDC. |
| NGÀY | - | - | - | Control UI: Label, căn giữa.<br>- Ngày đăng ký tại VSDC. |
| THÁNG | - | - | - | Control UI: Label, căn giữa.<br>- Tháng đăng ký tại VSDC. |
| NĂM | - | - | - | Control UI: Label, căn giữa.<br>- Năm đăng ký tại VSDC. |
| ĐÍNH KÈM FILE .PDF | - | - | - | Control UI: File đính kèm.<br>- Hiển thị tên file kèm liên kết `Xem file` (mở tab mới) và `Tải xuống`. |

<a id="mh02_chuc_nang"></a>
##### 4.3.2.22.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tra cứu | Nút | - Thao tác: NSD click nút Tra cứu hoặc nhấn Enter tại ô Số đăng ký.<br>- Xử lý: Hệ thống kiểm tra lần lượt theo thứ tự các trường hợp dưới đây, dừng tại trường hợp vi phạm đầu tiên:<br>  * **TH1 (Bỏ trống trường bắt buộc)**: Highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) ngay dưới ô nhập và tự động focus con trỏ.<br>  * **TH2 (Số đăng ký không tồn tại)**: Hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-001) ngay dưới ô nhập và tự động focus con trỏ.<br>  * **TH3 (Số đăng ký không đúng loại theo Loại đề nghị)**:<br>    + Loại đề nghị là "Chỉnh lý thông tin sai sót": Quy định chỉ được chỉnh lý phiên bản có Loại đăng ký là "Đăng ký lần đầu", "Đăng ký thay đổi", "Thông báo xử lý tài sản bảo đảm lần đầu" hoặc "Thay đổi thông báo xử lý tài sản bảo đảm". Nếu Số đăng ký nhập vào thuộc phiên bản có Loại đăng ký khác (Xóa đăng ký, Xóa đăng ký thông báo xử lý tài sản bảo đảm, Chỉnh lý thông tin, Hủy đăng ký, Khôi phục hủy đăng ký), hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-008]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-008) ngay dưới ô nhập và tự động focus con trỏ.<br>    + Loại đề nghị là "Hủy đăng ký": Quy định phải nhập Số đăng ký lần đầu của hồ sơ. Nếu Số đăng ký nhập vào không phải Số đăng ký lần đầu (VD: Số đăng ký của phiên bản thay đổi, Số đăng ký hủy), hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-009]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-009) ngay dưới ô nhập và tự động focus con trỏ.<br>    + Loại đề nghị là "Khôi phục hủy đăng ký": Quy định phải nhập Số đăng ký hủy. Nếu Số đăng ký nhập vào không phải Số đăng ký hủy, hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-010]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-010) ngay dưới ô nhập và tự động focus con trỏ.<br>  * **TH4 (Hồ sơ chưa ở trạng thái hoàn thành)**: Hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-002]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-002) ngay dưới ô nhập và tự động focus con trỏ.<br>  * **TH5 (Hồ sơ đã bị xóa đăng ký)**: Áp dụng cho cả 03 Loại đề nghị. Quy định chỉ được lập đề nghị khi hồ sơ chưa có hồ sơ Xóa đăng ký ở trạng thái "Hoàn thành" (hồ sơ chưa bị xóa đăng ký); với Loại đề nghị là "Khôi phục hủy đăng ký", kiểm tra theo hồ sơ gốc của Số đăng ký hủy (hồ sơ gốc đã bị xóa đăng ký sau thời điểm hủy thì không được khôi phục). Nếu vi phạm, hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-004]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-004) ngay dưới ô nhập và tự động focus con trỏ.<br>  * **TH6 (Hồ sơ đã bị hủy đăng ký toàn phần)**: Chỉ áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót" hoặc "Hủy đăng ký". Quy định không được lập đề nghị khi hồ sơ đã có giao dịch Hủy đăng ký toàn phần ở trạng thái "Hoàn thành" và chưa được khôi phục (đăng ký đã hết hiệu lực toàn bộ; trường hợp việc hủy có sai sót thì phải lập đề nghị Khôi phục hủy đăng ký trước). Nếu vi phạm, hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-005]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-005) ngay dưới ô nhập và tự động focus con trỏ.<br>  * **TH7 (Số đăng ký hủy đã được khôi phục)**: Chỉ áp dụng khi Loại đề nghị là "Khôi phục hủy đăng ký". Quy định mỗi giao dịch hủy chỉ được khôi phục 01 lần. Nếu Số đăng ký hủy đã có đề nghị Khôi phục hủy đăng ký ở trạng thái "Hoàn thành", hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-007]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-007) ngay dưới ô nhập và tự động focus con trỏ.<br>  * **TH8 (Hồ sơ đang có đề nghị khác chưa kết thúc)**: Áp dụng cho cả 03 Loại đề nghị. Quy định mỗi hồ sơ (xác định theo Số đăng ký lần đầu) chỉ được có 01 đề nghị Chỉnh lý thông tin sai sót / Hủy đăng ký / Khôi phục hủy đăng ký đang xử lý tại một thời điểm. Nếu hồ sơ đang có đề nghị khác ở trạng thái "Chờ duyệt đề nghị", "Bị từ chối đề nghị", "Chờ thực hiện", "Chờ ký số" hoặc "Bị trả lại", hệ thống highlight đỏ viền ô nhập (`.is-invalid`), hiển thị [[MSG-ERR-CLDK-006]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-cldk-006) ngay dưới ô nhập và tự động focus con trỏ. Ở Chế độ Cập nhật đề nghị, không tính chính đề nghị đang được cập nhật.<br>  *(Tại TH1 đến TH8: Nút "Gửi đề nghị" ẩn; các khối chi tiết phía dưới ẩn)*.<br>  * **TH Hợp lệ (Không thuộc các trường hợp TH1 đến TH8)**:<br>    + Viền ô nhập trở lại bình thường, ẩn thông báo lỗi inline.<br>    + Hiển thị nút **"Gửi đề nghị"**.<br>    + Hiển thị khối Căn cứ và nội dung đề xuất tương ứng theo Loại đề nghị.<br>    + Hiển thị khối Tệp tin đính kèm.<br>    + Hiển thị khối **Thông tin hồ sơ gốc** (mặc định mở rộng, cho phép thu gọn, toàn bộ dữ liệu dạng chỉ đọc; riêng trường hợp Loại đề nghị là Hủy đăng ký (Một phần) thì có thêm Checkbox chọn tài sản; không hiển thị nếu Loại đề nghị là Khôi phục hủy đăng ký). |
| 2 | Chọn tài sản đề nghị hủy | Checkbox | - Điều kiện: Chỉ áp dụng khi Loại đề nghị là "Hủy đăng ký (Một phần)". Khi Loại đề nghị là "Hủy đăng ký (Toàn phần)", không hiển thị cột Checkbox và hệ thống mặc định hủy toàn bộ tài sản còn hiệu lực.<br>- Thao tác: NSD tích chọn hoặc bỏ chọn ô checkbox tại tiêu đề bảng (Chọn tất cả), tại từng dòng tài sản hoặc tại tiêu đề Loại tài sản không có bảng danh sách.<br>- Xử lý & Quy tắc tự động:<br>     * Tài sản đã bị hủy tại giao dịch Hủy đăng ký một phần trước đó: Không cho tích chọn và không được tính vào tổng số tài sản.<br>     * **TH1 (Tích chọn một phần tài sản)**: Hệ thống cập nhật Hình thức hủy hiển thị là "Hủy đăng ký một phần" kèm số tài sản đã chọn/tổng số tài sản còn hiệu lực.<br>     * **TH2 (Tích chọn toàn bộ tài sản còn hiệu lực)**: Hệ thống tự động chuyển Loại đề nghị sang "Hủy đăng ký (Toàn phần)", ẩn cột Checkbox và hiển thị [[MSG-INF-CLDK-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-cldk-001).<br>     * Yêu cầu bắt buộc: Phải tích chọn tối thiểu 01 tài sản đề nghị hủy. |
| 3 | Thu gọn / Mở rộng Thông tin hồ sơ gốc | Icon | - Thao tác: NSD click vào icon hoặc tiêu đề khối Thông tin hồ sơ gốc.<br>- Xử lý: Cho phép thu gọn nội dung khối hồ sơ gốc để tiết kiệm diện tích màn hình hoặc mở rộng để xem đầy đủ chi tiết. |
| 4 | Gửi đề nghị | Nút | - **Điều kiện hiển thị**: Nút chỉ hiển thị khi đã tra cứu Số đăng ký hợp lệ và có dữ liệu hồ sơ ở trạng thái "Hoàn thành".<br>- Thao tác: NSD click nút Gửi đề nghị.<br>- Xử lý:<br>  * **TH1 (Bỏ trống trường bắt buộc)**: Hệ thống quét các trường bắt buộc (theo từng loại đề nghị; riêng trường hợp Hủy đăng ký bắt buộc phải chọn ít nhất 01 tài sản). Nếu có trường chưa nhập, highlight đỏ viền ô trống đầu tiên (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) ngay dưới ô đó và tự động focus con trỏ vào ô nhập lỗi đầu tiên. Không cho phép gửi.<br>  * **TH2 (Hồ sơ không còn đủ điều kiện lập đề nghị)**: Trước khi lưu, hệ thống kiểm tra lại các trường hợp từ TH3 đến TH8 của chức năng **Tra cứu** theo dữ liệu hiện tại của hồ sơ (áp dụng cả ở Chế độ Cập nhật đề nghị), do hồ sơ có thể đã thay đổi sau thời điểm tra cứu. Nếu vi phạm, hệ thống hiển thị thông báo tương ứng của trường hợp đó ngay dưới ô Số đăng ký, highlight đỏ viền ô nhập (`.is-invalid`) và không cho phép gửi.<br>  * **TH3 (Hợp lệ)**: Hệ thống lưu đề nghị với trạng thái **"Chờ duyệt đề nghị"**, sinh Mã đề nghị tự động theo quy tắc `ĐN-YYYY/STT`, ghi lịch sử xử lý và Audit log. Đóng màn hình lập đề nghị, chuyển về [MH01](#mh01) và hiển thị [[MSG-SUC-CLDK-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-suc-cldk-001).<br>  * **TH4 (Hợp lệ, ở Chế độ Cập nhật đề nghị)**: Hệ thống giữ nguyên Mã đề nghị, cập nhật nội dung đề nghị, ghi nhận Thời điểm gửi lại cho lần từ chối gần nhất, chuyển trạng thái đề nghị sang **"Chờ duyệt đề nghị"**, ghi lịch sử xử lý và Audit log. Đóng màn hình, chuyển về [MH01](#mh01) và hiển thị [[MSG-SUC-CLDK-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-suc-cldk-001). |
| 5 | Hủy bỏ | Nút | Đóng màn hình lập đề nghị, không lưu bất kỳ dữ liệu nào vào hệ thống, quay trở về [MH01](#mh01), mở đúng Tab đang chọn trước khi mở màn hình. |

---

<a id="mh03"></a>
#### 4.3.2.22.4. MH03 - Màn hình Xem chi tiết đề nghị

##### 4.3.2.22.4.1. Màn hình

![Màn hình Xem chi tiết đề nghị](images/CLDK_MH03_Xem_chi_tiet_de_nghi.png)

##### 4.3.2.22.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin chung đề nghị** | - | - | - | Toàn bộ dạng Label chỉ đọc: |
| Mã đề nghị | - | - | - | Control UI: Label in đậm, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Cán bộ lập đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Đơn vị công tác | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm lập | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`. |
| Trạng thái đề nghị | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại đề nghị | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| **Khối Thông tin từ chối đề nghị** | - | - | - | Control UI: Khối thông tin thu gọn/mở rộng (Accordion) viền đỏ, chỉ đọc, đặt ngay sau Khối Thông tin chung đề nghị.<br>- **Điều kiện hiển thị**: Hiển thị khi hồ sơ đang ở trạng thái **"Bị từ chối đề nghị"**, hoặc hồ sơ đã từng bị từ chối và được Người lập cập nhật gửi lại (hệ thống lưu giữ vết lịch sử các lần từ chối trước đó).<br>- Mặc định mở rộng khi hồ sơ đang ở trạng thái "Bị từ chối đề nghị"; mặc định thu gọn khi hồ sơ đã được gửi lại.<br>- Sắp xếp các lần từ chối theo thời gian giảm dần (lần gần nhất ở trên cùng). |
| Người từ chối | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm từ chối | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`. |
| Lý do từ chối | - | - | - | Control UI: Label chữ màu đỏ, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm gửi lại | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`.<br>- Chỉ hiển thị nếu đề nghị đã được gửi lại sau lần từ chối đó. |
| **Khối Thông tin trả lại hồ sơ** | - | - | - | Control UI: Khối thông tin thu gọn/mở rộng (Accordion) viền đỏ, chỉ đọc, đặt ngay dưới Khối Thông tin chung đề nghị (hoặc dưới Khối Thông tin từ chối đề nghị nếu có).<br>- **Điều kiện hiển thị**: Hiển thị khi hồ sơ đang ở trạng thái **"Bị trả lại"**, hoặc hồ sơ đã từng bị trả lại và được Người thực hiện sửa, trình ký lại (hệ thống lưu vết lịch sử các lần trả lại trước đó).<br>- Mặc định mở rộng khi hồ sơ đang ở trạng thái "Bị trả lại"; mặc định thu gọn khi hồ sơ đã được trình ký lại.<br>- Sắp xếp các lần trả lại theo thời gian giảm dần (lần gần nhất ở trên cùng). |
| Người trả lại | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm trả lại | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`. |
| Lý do trả lại | - | - | - | Control UI: Label chữ màu đỏ, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm trình ký lại | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`.<br>- Chỉ hiển thị nếu hồ sơ đã được trình ký lại sau lần trả lại đó. |
| **Khối Thông tin phê duyệt và phân công** | - | - | - | Control UI: Khối thông tin chỉ đọc, đặt dưới khối gần nhất phía trên đang hiển thị.<br>- **Điều kiện hiển thị**: Hiển thị khi đề nghị đã được phê duyệt (hồ sơ ở trạng thái "Chờ thực hiện", "Chờ ký số", "Bị trả lại", "Hoàn thành"). |
| Người phê duyệt | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm phê duyệt | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`. |
| Người thực hiện được phân công | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Hạn hoàn thành | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Ý kiến chỉ đạo | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| **II. Căn cứ và nội dung đề xuất (Hiển thị theo từng Loại đề nghị)** | - | - | - | Toàn bộ dạng Label chỉ đọc: |
| **Nếu Loại đề nghị là "Chỉnh lý thông tin sai sót"** | - | - | - | |
| Nội dung sai sót | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Nội dung đề nghị chỉnh lý | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Căn cứ & Lý do sai sót | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| **Nếu Loại đề nghị là "Hủy đăng ký"** | - | - | - | |
| Hình thức hủy | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi: "Hủy đăng ký toàn phần" hoặc "Hủy đăng ký một phần". |
| Căn cứ & Lý do đề nghị hủy | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| **Nếu Loại đề nghị là "Khôi phục hủy đăng ký"** | - | - | - | |
| Căn cứ & Lý do đề nghị khôi phục việc đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| **III. Tệp tin đính kèm** | - | - | - | |
| Danh sách tệp đính kèm | - | - | - | Control UI: Danh sách file, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Mỗi file có liên kết `Xem file` (mở tab mới) và `Tải xuống`. |
| **Khối Thông tin giao dịch hủy đã thực hiện trước đây** | - | - | - | Control UI: Khối thông tin mở rộng/thu gọn (Accordion), **mặc định hiển thị dạng thu gọn**, toàn bộ chỉ đọc.<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Loại đề nghị là "Khôi phục hủy đăng ký".<br>- Đặt ngay sau khối **III. Tệp tin đính kèm**.<br>- Hiển thị giống **Khối Thông tin giao dịch hủy đã thực hiện trước đây** tại [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh02). |
| **IV. Thông tin hồ sơ gốc** | - | - | - | Control UI: Khối thông tin mở rộng/thu gọn, **mặc định hiển thị dạng thu gọn**, toàn bộ chỉ đọc.<br>- Hiển thị giống khối **IV. Thông tin hồ sơ gốc** tại [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh02), theo dữ liệu bản ghi tại thời điểm lập đề nghị.<br>- Không hiển thị cột Checkbox chọn tài sản đề nghị hủy.<br>- Không hiển thị khối này nếu Loại đề nghị là "Khôi phục hủy đăng ký". |
| Tài sản bảo đảm (nếu Loại đề nghị là "Hủy đăng ký") | - | - | - | Control UI: Các bảng/khối tài sản chỉ đọc.<br>- Chỉ hiển thị các tài sản thuộc danh sách đề nghị hủy (gồm các dòng tài sản và các loại tài sản không có bảng danh sách đã chọn hủy); không hiển thị các tài sản không đề nghị hủy của hồ sơ gốc. |

##### 4.3.2.22.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật lại đề nghị | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Bị từ chối đề nghị".<br>Khi bấm: Cho phép mở lại form [MH02](#mh02) để chỉnh sửa nội dung và gửi đề nghị lại. |
| 2 | Thực hiện đề nghị | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ thực hiện".<br>Chỉ hiển thị đối với cán bộ được phân công thực hiện; đối với cán bộ khác, ẩn nút.<br>Khi bấm: Mở [MH04 - Màn hình Thực hiện chỉnh lý, hủy và khôi phục đăng ký](#mh04) để thực hiện đề nghị. |
| 3 | Sửa hồ sơ trình ký | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Bị trả lại".<br>Khi bấm: Mở [MH04 - Màn hình Thực hiện chỉnh lý, hủy và khôi phục đăng ký](#mh04) để chỉnh sửa và trình ký lại. |
| 4 | Thu gọn / Mở rộng khối | Click tiêu đề khối | Áp dụng cho khối Thông tin từ chối, Thông tin trả lại và Thông tin hồ sơ gốc.<br>TH1 (Khối đang mở rộng): Hệ thống thu gọn khối.<br>TH2 (Khối đang thu gọn): Hệ thống mở rộng khối, hiển thị đầy đủ nội dung. |
| 5 | Xem file / Tải xuống | Link | Áp dụng tại khối Tệp tin đính kèm và các file đính kèm của hồ sơ gốc.<br>- Xem file: Mở file tại một tab mới.<br>- Tải xuống: Tải file về máy. |
| 6 | Đóng | Nút | Đóng màn hình xem chi tiết, quay về [MH01](#mh01), mở đúng Tab đang chọn trước khi mở màn hình xem chi tiết. |

---

<a id="mh04"></a>
#### 4.3.2.22.5. MH04 - Màn hình Thực hiện chỉnh lý, hủy và khôi phục đăng ký

##### 4.3.2.22.5.1. Màn hình

![Màn hình Thực hiện chỉnh lý, hủy và khôi phục đăng ký](images/CLDK_MH06_Thuc_hien_chinh_ly_huy.png)

##### 4.3.2.22.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Khối Tham chiếu đề nghị đã duyệt** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion), chỉ đọc, mặc định mở rộng.<br>- Hiển thị thông tin đề nghị đã được phê duyệt để Người thực hiện đối chiếu trong quá trình xử lý. |
| Mã đề nghị | - | - | - | Control UI: Hyperlink.<br>- Theo dữ liệu bản ghi.<br>- Khi click: Mở [MH03 - Màn hình Xem chi tiết đề nghị](#mh03) tại tab mới, không làm mất dữ liệu đang cập nhật trên màn hình. |
| Loại đề nghị | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Cán bộ lập đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm lập | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`. |
| Người phê duyệt | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm phê duyệt | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm`. |
| Hạn hoàn thành | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Ý kiến chỉ đạo | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Căn cứ và nội dung đề xuất | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị các trường theo Loại đề nghị giống khối **II. Căn cứ và nội dung đề xuất** tại [MH03 - Màn hình Xem chi tiết đề nghị](#mh03).<br>- Riêng nếu Loại đề nghị là "Khôi phục hủy đăng ký": chỉ hiển thị Căn cứ & Lý do đề nghị khôi phục việc đăng ký; Khối Thông tin giao dịch hủy đã thực hiện trước đây hiển thị tại phần nội dung theo Loại đề nghị bên dưới. |
| **Khối Thông tin trả lại hồ sơ** | - | - | - | Hiển thị giống **Khối Thông tin trả lại hồ sơ** tại [MH03 - Màn hình Xem chi tiết đề nghị](#mh03), đặt ngay dưới Khối Tham chiếu đề nghị đã duyệt.<br>- Chỉ hiển thị khi hồ sơ đang ở trạng thái "Bị trả lại" hoặc đã từng bị trả lại. |
| **Nếu Loại đề nghị là "Chỉnh lý thông tin sai sót"** | - | - | - | Hiển thị Form nhập thông tin giống [Màn hình Nhập thông tin đăng ký thay đổi - Đăng ký thay đổi Biện pháp bảo đảm, Hợp đồng - Website khách hàng](../../01_Website_Khach_hang/Dang_ky_thay_doi_BPBD.md#4123-uc0025mh02---man-hinh-nhap-thong-tin-dang-ky-thay-doi), gồm các khối: Thông tin chung & Nghĩa vụ được bảo đảm, Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm.<br>- Hệ thống nạp sẵn toàn bộ dữ liệu của phiên bản sai sót theo Số đăng ký đã nhập trong đề nghị.<br>- Khác với Đăng ký thay đổi trên Website khách hàng:<br>  * Toàn bộ thông tin trên form ở chế độ cho phép cập nhật ngay khi mở màn hình; không có nút "Mở khóa chỉnh sửa" tại từng khối.<br>  * Không khóa chỉnh sửa bất kỳ thông tin nào.<br>  * Không hiển thị khối Thông tin người yêu cầu đăng ký, khối Thông tin tham chiếu hồ sơ gốc và các thông tin liên quan đến lệ phí (Trường hợp được miễn nghĩa vụ nộp phí, Tải tài liệu chứng minh miễn lệ phí).<br>- Các quy tắc kiểm tra dữ liệu nhập (bắt buộc, định dạng, trùng lặp) áp dụng giống form Đăng ký thay đổi.<br>- Trong quá trình cập nhật, các trường và dòng dữ liệu đã thay đổi được đánh dấu theo **Quy tắc đánh dấu thông tin đã chỉnh lý** tại [MH05 - Màn hình Xem chi tiết và Ký số hồ sơ](#mh05).<br>- Nếu hồ sơ đã có giao dịch Hủy đăng ký một phần ở trạng thái "Hoàn thành" và chưa được khôi phục: Các tài sản đã bị hủy hiển thị kèm nhãn `[Đã hủy]` màu đỏ, chỉ đọc, không cho sửa hoặc xóa. |
| **Nếu Loại đề nghị là "Hủy đăng ký"** | - | - | - | Hiển thị thông tin hồ sơ giống khối **IV. Thông tin hồ sơ gốc** tại [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh02), toàn bộ chỉ đọc.<br>- Hệ thống nạp dữ liệu mới nhất của hồ sơ theo Số đăng ký lần đầu.<br>- Tài sản bảo đảm: Cột Checkbox và Checkbox tại tiêu đề Loại tài sản không có bảng danh sách ở trạng thái khóa (Disabled), các tài sản đề nghị hủy đã được phê duyệt được tích sẵn. Người thực hiện không được thay đổi tài sản hủy. |
| **Nếu Loại đề nghị là "Khôi phục hủy đăng ký"** | - | - | - | Hiển thị **Khối Thông tin giao dịch hủy đã thực hiện trước đây** giống tại [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh02), toàn bộ chỉ đọc, mặc định mở rộng.<br>- Hệ thống nạp dữ liệu theo Số đăng ký hủy đã nhập trong đề nghị, lấy theo dữ liệu đã ghi nhận tại thời điểm hủy.<br>- Người thực hiện không được thêm, bớt tài sản khôi phục.<br>- Phạm vi khôi phục: Khi hồ sơ được ký số hoàn thành, hệ thống khôi phục hiệu lực cho toàn bộ các tài sản đã bị hủy trong giao dịch hủy (các tài sản gắn nhãn `[Đã hủy]`); các tài sản khác của hồ sơ giữ nguyên dữ liệu và trạng thái hiện tại. |

##### 4.3.2.22.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem chi tiết đề nghị | Hyperlink | Thao tác: Click Mã đề nghị tại Khối Tham chiếu đề nghị đã duyệt.<br>Xử lý: Mở [MH03 - Màn hình Xem chi tiết đề nghị](#mh03) tại tab mới; màn hình hiện tại giữ nguyên dữ liệu đang cập nhật. |
| 2 | Thu gọn / Mở rộng Khối Tham chiếu đề nghị đã duyệt | Click tiêu đề khối | TH1 (Khối đang mở rộng): Hệ thống thu gọn khối.<br>TH2 (Khối đang thu gọn): Hệ thống mở rộng khối, hiển thị đầy đủ thông tin. |
| 3 | Chọn / Bỏ chọn Loại tài sản | Checkbox | Chỉ áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót".<br>- Tích chọn: Hệ thống hiển thị khối nhập thông tin của loại tài sản đó ngay bên dưới Loại tài sản được chọn (giống Đăng ký thay đổi trên Website khách hàng); nếu loại tài sản đã có trong phiên bản sai sót thì nạp lại dữ liệu trước chỉnh lý.<br>- Bỏ chọn: Hệ thống ẩn khối thông tin của loại tài sản đó và ghi nhận loại tài sản bị xóa khi chỉnh lý. |
| 4 | Thêm dòng dữ liệu | Nút | Chỉ áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót", tại các bảng Bên bảo đảm, Bên nhận bảo đảm, Số khung, Phương tiện, Thời điểm đăng ký chứng khoán.<br>- Hệ thống mở popup nhập thông tin theo các cột của bảng.<br>- TH1 (Bỏ trống trường bắt buộc): Highlight đỏ viền ô lỗi (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) và tự động focus. Không lưu.<br>- TH Hợp lệ: Hệ thống thêm dòng vào bảng, đánh dấu `[Bổ sung mới]`. |
| 5 | Sửa dòng dữ liệu | Icon | Chỉ áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót".<br>- Hệ thống mở popup nạp sẵn thông tin của dòng.<br>- TH1 (Bỏ trống trường bắt buộc): Xử lý giống chức năng Thêm dòng dữ liệu.<br>- TH Hợp lệ: Hệ thống cập nhật dòng; các ô có giá trị khác với trước chỉnh lý được đánh dấu, dòng gắn `[Sửa thông tin]`. |
| 6 | Xóa dòng dữ liệu | Icon | Chỉ áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót".<br>- Hệ thống hiển thị [[MSG-CFM-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-cfm-sys-001).<br>- Chọn Đồng ý: Dòng đã có ở phiên bản sai sót được giữ hiển thị với nền đỏ nhạt, chữ gạch ngang, đánh dấu `[Đã xóa]`; dòng mới thêm khi chỉnh lý bị loại bỏ khỏi bảng.<br>- Chọn Hủy: Giữ nguyên dòng. |
| 7 | Hoàn tác xóa | Icon | Chỉ hiển thị tại dòng đánh dấu `[Đã xóa]`. Hệ thống khôi phục dòng về giá trị trước chỉnh lý và bỏ đánh dấu `[Đã xóa]`. |
| 8 | Trình ký | Nút | TH1 (Dữ liệu chưa hợp lệ): Áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót" và dữ liệu trên form chưa thỏa mãn các quy tắc kiểm tra dữ liệu nhập. Highlight đỏ viền ô lỗi đầu tiên (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) và tự động focus. Không mở popup trình ký.<br><br>TH Hợp lệ: Mở [MH06 - Popup Trình ký](#mh06) để chọn Lãnh đạo ký duyệt và xem dự thảo trước khi trình ký. |
| 9 | Hủy bỏ | Nút | Đóng màn hình, không lưu các thay đổi, quay về [MH01](#mh01), mở đúng Tab đang chọn trước khi mở màn hình. |

---

<a id="mh05"></a>
#### 4.3.2.22.6. MH05 - Màn hình Xem chi tiết hồ sơ trình ký

##### 4.3.2.22.6.1. Màn hình

![Màn hình Xem chi tiết hồ sơ trình ký](images/CLDK_MH07_Ky_so_ho_so.png)

##### 4.3.2.22.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tóm tắt thông tin hồ sơ trình ký** | - | - | - | |
| Mã đề nghị | - | - | - | Control UI: Hyperlink.<br>- Theo dữ liệu bản ghi.<br>- Khi click: Mở [MH03 - Màn hình Xem chi tiết đề nghị](#mh03) tại tab mới. |
| Loại đề nghị | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Người trình ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi, hiển thị kèm Thời điểm trình ký.<br>- Định dạng hiển thị Thời điểm trình ký: `dd/mm/yyyy hh:mm`. |
| Người phê duyệt đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi, hiển thị kèm Ý kiến chỉ đạo khi phê duyệt. |
| **II. Khung Xem trước Văn bản / Chứng thư (PDF Viewer nhúng)** | - | - | - | |
| File PDF văn bản | File PDF | Có | Hiển thị trực tiếp | Control UI: Trình đọc PDF tích hợp đầy đủ công cụ phóng to, thu nhỏ, xoay, xem số trang.<br>- Kèm liên kết: `Xem file` (mở tab mới) và `Tải tệp`. |
| **III. Thông tin hồ sơ sau chỉnh lý** | - | - | - | Control UI: Khối thông tin mở rộng/thu gọn, chỉ đọc, mặc định mở rộng.<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Loại đề nghị là "Chỉnh lý thông tin sai sót". Áp dụng cả khi xem ở trạng thái "Chờ ký số" và khi xem lại ở trạng thái "Hoàn thành".<br>- Hiển thị toàn bộ thông tin của phiên bản sai sót theo dữ liệu sau chỉnh lý do Người thực hiện cập nhật tại [MH04 - Màn hình Thực hiện chỉnh lý, hủy và khôi phục đăng ký](#mh04).<br>- Hệ thống so sánh với dữ liệu của phiên bản sai sót trước khi chỉnh lý và đánh dấu các thông tin đã chỉnh lý theo **Quy tắc đánh dấu thông tin đã chỉnh lý** bên dưới.<br>- Không hiển thị Sidebar dòng thời gian lịch sử phiên bản.<br>- Không hiển thị thao tác thêm/sửa/xóa/import trên các bảng dữ liệu. |
| **1. Vùng tiêu đề và thao tác** | - | - | - | Đặt ở đầu Khối III. |
| Tiêu đề phiên bản | - | - | - | Control UI: Label, chỉ đọc, gồm 2 dòng:<br>- Dòng 1 (chữ in đậm): `[Loại đăng ký] - Trạng thái: [Trạng thái hồ sơ]` theo dữ liệu bản ghi của phiên bản sai sót.<br>- Dòng 2 (chữ nhỏ, màu nhạt): `Số đăng ký: [Số đăng ký] \| Thời điểm đăng ký: [Thời điểm đăng ký]` theo dữ liệu bản ghi; Thời điểm đăng ký hiển thị định dạng `dd/mm/yyyy hh:mm:ss`. |
| Chỉ hiển thị vùng dữ liệu có biến động | Boolean | Không | Tắt | Control UI: Toggle switch, đặt bên phải Tiêu đề phiên bản.<br>- Tắt: Hiển thị đầy đủ thông tin của hồ sơ; các nhóm/dòng/trường đã chỉnh lý vẫn giữ nhãn để Người dùng nhận biết.<br>- Bật: Chỉ hiển thị các nhóm/dòng/trường có nhãn chỉnh lý; các khối không có thay đổi được ẩn. |
| **2. Thông tin hồ sơ** | - | - | - | Khối thông tin tổng quan của phiên bản sai sót, chỉ đọc. |
| Loại đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Trạng thái hồ sơ | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số đăng ký lần đầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Không hiển thị nếu Loại đăng ký là "Đăng ký lần đầu". |
| Thời điểm đăng ký lần đầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`.<br>- Không hiển thị nếu Loại đăng ký là "Đăng ký lần đầu". |
| Văn bản kết quả | - | - | - | Control UI: Link "Xem file".<br>- Văn bản kết quả đã ký số của phiên bản sai sót, theo dữ liệu bản ghi.<br>- Khi click: Mở file PDF tại tab mới. |
| **3. Thông tin người yêu cầu đăng ký** | - | - | - | Chỉ đọc, theo dữ liệu bản ghi của phiên bản sai sót. |
| Họ và tên/Tên tổ chức | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Địa chỉ | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: "Địa chỉ chi tiết - Phường/Xã - Tỉnh/Thành phố - Quốc gia". |
| Tài liệu chứng minh | - | - | - | Control UI: Link "Xem file".<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có tài liệu chứng minh. |
| **4. Thông tin chung & Nghĩa vụ được bảo đảm (Tiêu đề động)** | - | - | - | Tiêu đề khối thay đổi theo Loại biện pháp / Loại hợp đồng. Chỉ đọc. |
| Cơ quan tiếp nhận | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại hình giao dịch | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại biện pháp | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Biện pháp bảo đảm". |
| Loại hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Hợp đồng". |
| Số hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Ngày có hiệu lực của hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Quy mô | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Chủ doanh nghiệp là nữ giới? | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi: "Có" hoặc "Không". |
| Trường hợp được miễn nghĩa vụ nộp phí | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi phiên bản sai sót thuộc trường hợp được miễn nghĩa vụ nộp phí. |
| Tài liệu chứng minh miễn lệ phí | - | - | - | Control UI: Link "Xem file".<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có tài liệu chứng minh miễn lệ phí. |
| **5. Bên bảo đảm (Tiêu đề động)** | - | - | - | Tiêu đề khối thay đổi theo Loại biện pháp / Loại hợp đồng. Chỉ đọc. |
| Bảng danh sách Bên bảo đảm | - | - | - | Control UI: Bảng dữ liệu chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Hiển thị các cột:<br>+ STT.<br>+ LOẠI CHỦ THỂ.<br>+ SỐ GIẤY TỜ CHỨNG MINH TƯ CÁCH PHÁP LÝ.<br>+ TÊN.<br>+ ĐỊA CHỈ (định dạng "Địa chỉ chi tiết - Phường/Xã - Tỉnh/Thành phố - Quốc gia").<br>+ TRẠNG THÁI CHỈNH LÝ.<br>- Không có dữ liệu: Bảng hiển thị 01 dòng căn giữa toàn bộ chiều rộng bảng (`colspan`), in nghiêng, nội dung theo [[MSG-INF-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-sys-001). |
| **6. Bên nhận bảo đảm (Tiêu đề động)** | - | - | - | Tiêu đề khối thay đổi theo Loại biện pháp / Loại hợp đồng. Chỉ đọc. |
| Bảng danh sách Bên nhận bảo đảm | - | - | - | Control UI: Bảng dữ liệu chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Hiển thị các cột:<br>+ STT.<br>+ TÊN.<br>+ ĐỊA CHỈ (định dạng "Địa chỉ chi tiết - Phường/Xã - Tỉnh/Thành phố - Quốc gia").<br>+ TRẠNG THÁI CHỈNH LÝ.<br>- Không có dữ liệu: Bảng hiển thị 01 dòng căn giữa toàn bộ chiều rộng bảng (`colspan`), in nghiêng, nội dung theo [[MSG-INF-SYS-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-inf-sys-001). |
| **7. Tài sản bảo đảm (Tiêu đề động)** | - | - | - | Tiêu đề khối thay đổi theo Loại hình giao dịch:<br>- "Biện pháp bảo đảm": Hiển thị "Tài sản bảo đảm".<br>- "Hợp đồng": Hiển thị theo Loại hợp đồng ("Tài sản cho thuê tài chính", "Tài sản thuê", "Quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác được chuyển giao", "Hàng hóa ký gửi").<br>- Chỉ đọc. Chỉ hiển thị các loại tài sản có trong dữ liệu bản ghi (gồm cả loại tài sản đã bị bỏ khi chỉnh lý, hiển thị theo Quy tắc đánh dấu). |
| Loại tài sản | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Hiển thị tên từng Loại tài sản làm tiêu đề cho nhóm thông tin tài sản tương ứng bên dưới. |
| Mô tả | - | - | - | Control UI: Label, chỉ đọc (giữ nguyên xuống dòng).<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có Loại tài sản "Cây hằng năm, công trình tạm" hoặc "Các động sản khác". |
| Bảng thông tin Số khung | - | - | - | Control UI: Bảng dữ liệu chỉ đọc, tiêu đề bảng **Số khung**.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có Loại tài sản "Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung".<br>- Hiển thị các cột:<br>+ STT.<br>+ TÊN PHƯƠNG TIỆN (theo Danh mục Tên phương tiện [DM_41]).<br>+ NHÃN HIỆU, MÀU SƠN.<br>+ SỐ KHUNG.<br>+ SỐ MÁY.<br>+ BIỂN SỐ.<br>+ TRẠNG THÁI CHỈNH LÝ. |
| Bảng thông tin Phương tiện | - | - | - | Control UI: Bảng dữ liệu chỉ đọc, tiêu đề bảng **Phương tiện**.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có Loại tài sản "Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt".<br>- Hiển thị các cột:<br>+ STT.<br>+ TÊN PHƯƠNG TIỆN, NHÃN HIỆU.<br>+ TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>+ SỐ ĐĂNG KÝ.<br>+ CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>+ CẤP PHƯƠNG TIỆN.<br>+ TRẠNG THÁI CHỈNH LÝ. |
| Tên quyền | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có Loại tài sản "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Căn cứ phát sinh quyền | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có Loại tài sản "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Hàng hóa luân chuyển / Kho hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi: "Hàng hóa luân chuyển" hoặc "Kho hàng".<br>- Chỉ hiển thị khi có Loại tài sản "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng". |
| Giá trị hàng hóa/Tên, loại hàng hóa | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Địa chỉ kho hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: "Địa chỉ chi tiết - Phường/Xã - Tỉnh/Thành phố - Quốc gia".<br>- Chỉ hiển thị khi giá trị là "Kho hàng". |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi giá trị là "Kho hàng". |
| Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam | - | - | - | Control UI: Bảng dữ liệu chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi có Loại tài sản "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung".<br>- Hiển thị các cột:<br>+ STT.<br>+ GIỜ.<br>+ PHÚT.<br>+ NGÀY.<br>+ THÁNG.<br>+ NĂM.<br>+ ĐÍNH KÈM FILE .PDF (Link "Xem file", mở tab mới).<br>+ TRẠNG THÁI CHỈNH LÝ. |
| **8. Quy tắc đánh dấu thông tin đã chỉnh lý** | - | - | - | Áp dụng cho các khối 4, 5, 6, 7 của Khối III.<br>- Giá trị trước chỉnh lý là dữ liệu của phiên bản sai sót tại thời điểm hệ thống nạp lên [MH04](#mh04), trước khi Người thực hiện cập nhật.<br>- Hệ thống tự động so sánh từng trường, từng dòng dữ liệu để gắn nhãn; Người thực hiện không phải tự đánh dấu. |
| Trường thông tin đơn | - | - | - | Áp dụng cho các trường dạng Label (VD: Số hợp đồng, Ngày có hiệu lực của hợp đồng, Giá trị khoản vay, Mô tả, Tên quyền).<br>- Trường không thay đổi: Hiển thị bình thường.<br>- Trường đã chỉnh lý: Ô giá trị nền vàng nhạt, viền cam, hiển thị giá trị sau chỉnh lý, kèm icon lịch sử màu cam ngay sau giá trị.<br>- Khi rê chuột vào ô giá trị hoặc icon lịch sử: Hiển thị Tooltip *"Giá trị trước chỉnh lý: [giá trị cũ]"*; nếu giá trị cũ để trống thì hiển thị *"Giá trị trước chỉnh lý: (Để trống)"*. Rời chuột, Tooltip tự ẩn.<br>- Nếu giá trị sau chỉnh lý để trống: Ô giá trị hiển thị "-" và vẫn được đánh dấu như trường đã chỉnh lý. |
| Dòng dữ liệu trong bảng | - | - | - | Áp dụng cho các bảng: Bên bảo đảm, Bên nhận bảo đảm, Số khung, Phương tiện, Thời điểm đăng ký chứng khoán. Nhãn hiển thị tại cột TRẠNG THÁI CHỈNH LÝ.<br>- Cột TRẠNG THÁI CHỈNH LÝ chỉ hiển thị khi bảng có ít nhất 01 dòng thay đổi (`[Sửa thông tin]`, `[Bổ sung mới]` hoặc `[Đã xóa]`); bảng không có thay đổi thì ẩn cột này.<br>- Dòng không thay đổi: Không đổi màu, cột Trạng thái chỉnh lý (nếu hiển thị) để trống.<br>- `[Sửa thông tin]` (màu vàng/cam): Dòng đã có ở phiên bản sai sót nhưng có thay đổi một hoặc nhiều ô. Viền dòng màu vàng/cam nhạt; ô bị sửa được đánh dấu và hover xem giá trị cũ như Trường thông tin đơn.<br>- `[Bổ sung mới]` (màu xanh lá): Dòng được thêm khi chỉnh lý. Viền dòng màu xanh lá; không hiển thị Tooltip giá trị cũ.<br>- `[Đã xóa]` (màu đỏ): Dòng đã có ở phiên bản sai sót nhưng bị xóa khi chỉnh lý. Vẫn hiển thị dòng với nền đỏ nhạt, chữ gạch ngang; không hiển thị Tooltip giá trị cũ. |
| Loại tài sản | - | - | - | - Loại tài sản được bổ sung khi chỉnh lý: Tiêu đề loại tài sản hiển thị nhãn `[Bổ sung mới]` màu xanh lá.<br>- Loại tài sản bị bỏ khi chỉnh lý: Vẫn hiển thị tiêu đề và dữ liệu cũ của loại tài sản đó với nền đỏ nhạt, chữ gạch ngang, nhãn `[Đã xóa]` màu đỏ. |
| **IV. Thông tin hồ sơ đề nghị hủy** | - | - | - | Control UI: Khối thông tin mở rộng/thu gọn, chỉ đọc, mặc định mở rộng.<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Loại đề nghị là "Hủy đăng ký". Áp dụng cả khi xem ở trạng thái "Chờ ký số" và khi xem lại ở trạng thái "Hoàn thành".<br>- Hiển thị thông tin hồ sơ giống khối **IV. Thông tin hồ sơ gốc** tại [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh02), toàn bộ chỉ đọc, theo dữ liệu bản ghi.<br>- Không hiển thị cột Checkbox chọn tài sản. |
| Hình thức hủy | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc, đặt ở đầu Khối IV.<br>- Theo dữ liệu bản ghi: "Hủy đăng ký toàn phần" hoặc "Hủy đăng ký một phần". |
| Tài sản bảo đảm (nếu Loại đề nghị là "Hủy đăng ký") | - | - | - | Control UI: Các bảng/khối tài sản chỉ đọc.<br>- Chỉ hiển thị các tài sản thuộc danh sách đề nghị hủy đã được phê duyệt (gồm các dòng tài sản và các loại tài sản không có bảng danh sách đã chọn hủy); không hiển thị các tài sản không đề nghị hủy của hồ sơ. |
| **V. Khối Thông tin giao dịch hủy đã thực hiện trước đây** | - | - | - | Control UI: Khối thông tin mở rộng/thu gọn, chỉ đọc, mặc định mở rộng.<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Loại đề nghị là "Khôi phục hủy đăng ký". Áp dụng cả khi xem ở trạng thái "Chờ ký số" và khi xem lại ở trạng thái "Hoàn thành".<br>- Hiển thị giống **Khối Thông tin giao dịch hủy đã thực hiện trước đây** tại [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký](#mh02). |

##### 4.3.2.22.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem chi tiết đề nghị | Hyperlink | Thao tác: Click Mã đề nghị tại khối **I. Tóm tắt thông tin hồ sơ trình ký**.<br>Xử lý: Mở [MH03 - Màn hình Xem chi tiết đề nghị](#mh03) tại tab mới; màn hình hiện tại giữ nguyên. |
| 2 | Xem giá trị trước chỉnh lý | Hover | Chỉ áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót".<br>- Thao tác: NSD rê chuột vào ô giá trị đã chỉnh lý hoặc icon lịch sử.<br>- Xử lý: Hệ thống hiển thị Tooltip *"Giá trị trước chỉnh lý: [giá trị cũ]"*. Rời chuột, Tooltip tự ẩn. |
| 3 | Bật/Tắt chỉ hiển thị vùng dữ liệu có biến động | Toggle | Chỉ áp dụng khi Loại đề nghị là "Chỉnh lý thông tin sai sót".<br>- TH1 (Bật): Hệ thống chỉ hiển thị các nhóm/dòng/trường có nhãn chỉnh lý, ẩn các khối không có thay đổi.<br>- TH2 (Tắt): Hệ thống hiển thị đầy đủ thông tin hồ sơ, các thông tin đã chỉnh lý vẫn giữ nhãn. |
| 4 | Thu gọn / Mở rộng Khối III, Khối IV, Khối V | Click tiêu đề khối | Áp dụng cho Khối III (Loại đề nghị là "Chỉnh lý thông tin sai sót"), Khối IV (Loại đề nghị là "Hủy đăng ký") và Khối V (Loại đề nghị là "Khôi phục hủy đăng ký").<br>- TH1 (Khối đang mở rộng): Hệ thống thu gọn khối.<br>- TH2 (Khối đang thu gọn): Hệ thống mở rộng khối, hiển thị đầy đủ thông tin. |
| 5 | Xem file | Link | Áp dụng tại File PDF văn bản, Văn bản kết quả, Tài liệu chứng minh, Tài liệu chứng minh miễn lệ phí và cột ĐÍNH KÈM FILE .PDF của Khối III.<br>- Xử lý: Mở file tại một tab mới. |
| 6 | Đóng | Nút | Đóng màn hình xem chi tiết, quay về [MH01](#mh01), mở đúng Tab đang chọn trước khi mở màn hình xem chi tiết. |

---

<a id="mh06"></a>
#### 4.3.2.22.7. MH06 - Popup Trình ký

##### 4.3.2.22.7.1. Giao diện màn hình

![Popup Trình ký](images/CLDK_MH09_Popup_Trinh_ky.png)

##### 4.3.2.22.7.2. Mô tả thông tin trên popup

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label in đậm: **"Trình ký hồ sơ: [Mã đề nghị]"**. |
| Mã đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Loại đề nghị | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Lãnh đạo ký duyệt | Enum(String(255)) | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Danh sách Lãnh đạo có thẩm quyền ký số của đơn vị.<br>- Cho phép tìm kiếm theo Họ và tên hoặc Tên đăng nhập. |
| Xem dự thảo | - | - | - | Control UI: Button "Xem dự thảo".<br>- Khi click: Mở file PDF dự thảo văn bản trình Lãnh đạo tại một tab mới. |

##### 4.3.2.22.7.3. Chức năng trên popup

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem dự thảo | Nút | Áp dụng cho cả 03 Loại đề nghị.<br>Xử lý: Hệ thống sinh file PDF dự thảo theo dữ liệu đang cập nhật tại [MH04 - Màn hình Thực hiện chỉnh lý, hủy và khôi phục đăng ký](#mh04) (Văn bản chỉnh lý / Văn bản xác nhận hủy / Quyết định khôi phục đăng ký), có Watermark mờ in chéo `"BẢN DỰ THẢO - CHỜ KÝ SỐ"`, và mở file tại một tab mới. Không lưu dữ liệu, không thay đổi trạng thái hồ sơ, popup vẫn giữ nguyên. |
| 2 | Xác nhận trình ký | Nút | TH1 (Chưa chọn Lãnh đạo ký duyệt): Highlight đỏ viền ô chọn (`.is-invalid`), hiển thị [[MSG-ERR-VAL-001]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-err-val-001) và tự động focus. Không thực hiện trình ký.<br><br>TH Hợp lệ: Hệ thống đóng băng phiên bản dữ liệu vừa cập nhật, sinh file PDF dự thảo chính thức; chuyển trạng thái hồ sơ sang **"Chờ ký số"**; chuyển việc vào danh sách chờ ký của Lãnh đạo được chọn tại [Ký duyệt đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Chinh_ly_huy_khoi_phuc_dang_ky_Lanh_dao.md). Đóng popup và [MH04](#mh04), quay về [MH01](#mh01) và hiển thị [[MSG-SUC-CLDK-004]](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#msg-suc-cldk-004). |
| 3 | Hủy bỏ | Nút | Đóng popup, quay lại [MH04](#mh04), giữ nguyên dữ liệu đang cập nhật trên màn hình. |

