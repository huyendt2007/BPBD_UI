### 4.3.2.24. Lọc phiếu trùng lặp

#### 4.3.2.24.1. Mục đích

\- Cho phép Người dùng rà soát các Phiếu đăng ký có tài sản bảo đảm trùng lặp với Phiếu đăng ký khác trên hệ thống, gồm 02 chức năng:

\+ Lọc các phiếu trùng lặp đăng ký mới: Rà soát các Phiếu Đăng ký lần đầu.

\+ Lọc các phiếu trùng lặp đăng ký thay đổi: Rà soát các Phiếu Đăng ký thay đổi.

\- Việc xác định phiếu trùng lặp thực hiện theo [BR-DK-037]. Hệ thống không chặn đăng ký trùng tài sản (do một tài sản có thể được bảo đảm cho nhiều nghĩa vụ); chức năng này chỉ phục vụ rà soát, phát hiện các trường hợp nộp trùng hồ sơ.

\- Kết quả xác định trùng lặp được hệ thống cập nhật tại thời điểm phát sinh sự kiện theo [BR-DK-037] (phiếu gửi duyệt, bị từ chối, hoàn thành, bị hủy, được khôi phục, được chỉnh lý...); các màn hình trong chức năng này chỉ hiển thị kết quả đã lưu.

\- Màn hình chỉ phục vụ xem và rà soát, không cho phép sửa, xóa Phiếu đăng ký. Trường hợp xác định phiếu bị nộp trùng:

\+ Phiếu chưa hoàn thành (Chờ duyệt, Duyệt chờ ký, Chờ ký): Xử lý Từ chối tại [Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md) hoặc [Ký duyệt Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao.md).

\+ Phiếu đã hoàn thành: Lập đề nghị Hủy đăng ký tại [Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md).

\- Cảnh báo trùng lặp đồng thời được hiển thị tại các bước xử lý hồ sơ:

\+ Nhập liệu hồ sơ giấy: [MH03 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký - Nhập liệu hồ sơ giấy Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhap_lieu_ho_so_giay_Phieu_dang_ky_Can_bo.md#432174-mh03---man-hinh-nhap-lieu-ho-so-giay-phieu-dang-ky).

\+ Cán bộ duyệt hồ sơ: [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh01) và [MH02 - Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02).

\+ Lãnh đạo ký duyệt: [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký - Ký duyệt Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao.md#mh01) và [MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký - Ký duyệt Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao.md#mh02).

*a. Phân quyền*

\- Người dùng được phân quyền menu "Biện pháp bảo đảm > Lọc phiếu trùng lặp".

\- Tab "Đăng ký mới" chỉ hiển thị với Người dùng được phân quyền "Lọc các phiếu trùng lặp đăng ký mới"; Tab "Đăng ký thay đổi" chỉ hiển thị với Người dùng được phân quyền "Lọc các phiếu trùng lặp đăng ký thay đổi".

\- Cán bộ xử lý hồ sơ và Lãnh đạo có thẩm quyền ký đều được thực hiện "Đánh dấu đã rà soát" theo [BR-DK-038].

\- Phạm vi đối chiếu trùng lặp là toàn hệ thống. Danh sách chỉ hiển thị các nhóm trùng lặp có ít nhất 01 phiếu thuộc đơn vị quản lý của Người dùng đăng nhập; các phiếu thuộc đơn vị khác trong cùng nhóm vẫn hiển thị để đối chiếu.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website Quản trị.

---

<a id="mh01"></a>
#### 4.3.2.24.2. MH01 - Màn hình Danh sách nhóm phiếu trùng lặp

##### 4.3.2.24.2.1. Màn hình

![Màn hình Danh sách nhóm phiếu trùng lặp](images/LPTL_MH01_Danh_sach_nhom_phieu_trung_lap.png)

##### 4.3.2.24.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab nghiệp vụ** | - | - | - | Control UI: Tab, đặt ngay dưới tiêu đề màn hình, phía trên Khối Bộ lọc tìm kiếm. |
| Tab nghiệp vụ | Enum(String(50)) | Có | Đăng ký mới | Control UI: Tab, kèm badge số lượng.<br>Gồm:<br>+ Đăng ký mới: Các nhóm trùng lặp có ít nhất 01 Phiếu Đăng ký lần đầu.<br>+ Đăng ký thay đổi: Các nhóm trùng lặp có ít nhất 01 Phiếu Đăng ký thay đổi.<br>- Mỗi Tab chỉ hiển thị với Người dùng có quyền tương ứng; nếu Người dùng chỉ có 01 quyền thì mặc định chọn Tab đó. |
| Badge Tab nghiệp vụ | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm, chỉ đọc, hiển thị bên phải tên Tab.<br>- Giá trị bằng số nhóm trùng lặp **chưa được đánh dấu đã rà soát** của Tab, theo phạm vi đơn vị của Người dùng đăng nhập.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0. |
| **II. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Số đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Số đăng ký hoặc Số đăng ký lần đầu của phiếu; nhóm được trả về nếu có ít nhất 01 phiếu thỏa mãn. |
| Từ ngày | Date | Không | Ngày hiện tại trừ 30 ngày | Control UI: Datepicker.<br>- Lọc theo Thời điểm phát hiện của nhóm theo [BR-DK-037] (thời điểm nhóm được tạo hoặc thời điểm gần nhất nhóm có thêm phiếu mới).<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Lọc theo Thời điểm phát hiện của nhóm giống trường Từ ngày.<br>- Định dạng hiển thị: dd/mm/yyyy.<br>- Đến ngày phải lớn hơn hoặc bằng Từ ngày. |
| Loại tài sản | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Chỉ gồm các Loại tài sản được đối chiếu trùng lặp theo [BR-DK-037]:<br>Gồm:<br>+ Tất cả<br>+ Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)<br>+ Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt<br>+ Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ (chỉ đối chiếu Kho hàng)<br>- Khi chọn một loại cụ thể, hệ thống hiển thị **Khối lọc động theo Loại tài sản** ngay dưới các trường lọc chung. |
| **Khối lọc động theo Loại tài sản** | - | Không | Ẩn | - Không hiển thị tiêu đề khối.<br>- Chỉ hiển thị khi chọn một giá trị cụ thể tại trường Loại tài sản.<br>- Các trường tìm kiếm gần đúng, không phân biệt hoa thường, sau khi chuẩn hóa dữ liệu theo [BR-DK-037]. |
| Số khung | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi Loại tài sản là "Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)". |
| Số máy | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi Loại tài sản là "Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)". |
| Biển số | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi Loại tài sản là "Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)". |
| Số đăng ký phương tiện | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi Loại tài sản là "Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt". |
| Cơ quan cấp giấy chứng nhận | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi Loại tài sản là "Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt". |
| Địa chỉ kho hàng | String(500) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi Loại tài sản là "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ". |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi Loại tài sản là "Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ". |
| Mức trùng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Trùng hoàn toàn<br>+ Trùng tài sản |
| Trạng thái hồ sơ | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Lọc nhóm có ít nhất 01 phiếu ở trạng thái đã chọn.<br>Gồm:<br>+ Tất cả<br>+ Chờ duyệt<br>+ Duyệt chờ ký<br>+ Chờ ký<br>+ Hoàn thành |
| Tên/Số giấy tờ bên bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên hoặc số giấy tờ bên bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space; nhóm được trả về nếu có ít nhất 01 phiếu thỏa mãn. |
| Tên bên nhận bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập tên bên nhận bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space; nhóm được trả về nếu có ít nhất 01 phiếu thỏa mãn. |
| Bao gồm nhóm đã rà soát | Boolean | Không | Không tích | Control UI: Checkbox.<br>- Không tích: Chỉ hiển thị các nhóm chưa được đánh dấu đã rà soát.<br>- Tích: Hiển thị cả các nhóm đã được đánh dấu đã rà soát. |
| **III. Bảng danh sách nhóm phiếu trùng lặp** | - | - | - | |
| Bảng danh sách nhóm | Text(1000) | Không | 20 nhóm/trang | Control UI: Bảng dữ liệu (Grid) dạng nhóm, kèm thanh phân trang (phân trang theo nhóm).<br>- Khi mở màn hình, hệ thống tự động tải danh sách theo giá trị mặc định của Bộ lọc tìm kiếm, không cần chọn "Tìm kiếm".<br>- Không hiển thị các nhóm đã đóng theo [BR-DK-037].<br>- Mỗi nhóm gồm 01 **dòng nhóm** và các **dòng phiếu** thuộc nhóm.<br>- Mặc định các nhóm ở dạng thu gọn, chỉ hiển thị dòng nhóm; click biểu tượng mũi tên đầu dòng nhóm để mở rộng/thu gọn các dòng phiếu; click vào các vị trí khác trên dòng nhóm để xem chi tiết nhóm.<br>- Sắp xếp mặc định theo thứ tự ưu tiên:<br>+ (1) Nhóm "Chưa rà soát" trước nhóm "Đã rà soát" (khi tích "Bao gồm nhóm đã rà soát").<br>+ (2) Nhóm có phiếu đang xử lý (Chờ duyệt, Duyệt chờ ký, Chờ ký) trước nhóm chỉ gồm phiếu "Hoàn thành".<br>+ (3) Nhóm "Trùng hoàn toàn" trước nhóm "Trùng tài sản".<br>+ (4) Thời điểm phát hiện giảm dần.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"* và các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| **Dòng nhóm** | - | - | - | Dòng tiêu đề của nhóm, nền khác màu dòng phiếu. |
| Mức trùng | Enum(String(50)) | - | Theo dữ liệu hệ thống | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- "Trùng hoàn toàn": màu đỏ.<br>- "Trùng tài sản": màu cam. |
| Loại tài sản | Enum(String(255)) | - | Theo dữ liệu hệ thống | Control UI: Label, chỉ đọc. |
| Đặc điểm trùng | String(500) | - | Theo dữ liệu hệ thống | Control UI: Label, chỉ đọc.<br>- Hiển thị các đặc điểm được xác định trùng theo [BR-DK-037] kèm giá trị, VD: "Số khung: RLGBF3FK7MN012345; Biển số: 30H-123.45". |
| Số phiếu trùng | Integer(10) | - | Theo dữ liệu hệ thống | Control UI: Label, chỉ đọc.<br>- Số Phiếu đăng ký thuộc nhóm.<br>- Nếu nhóm có phiếu đang xử lý (Chờ duyệt, Duyệt chờ ký, Chờ ký): Hiển thị kèm số phiếu đang xử lý ngay bên dưới, VD: "3" và "(1 đang xử lý)". |
| Thời điểm phát hiện | Datetime | - | Theo dữ liệu hệ thống | Control UI: Label, chỉ đọc.<br>- Thời điểm phát hiện của nhóm theo [BR-DK-037], định dạng `dd/mm/yyyy HH:mm`. |
| Trạng thái rà soát | Enum(String(50)) | - | Chưa rà soát | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa rà soát (màu xám)<br>+ Đã rà soát (màu xanh lá); rê chuột hiển thị Tooltip: Người rà soát, Thời điểm rà soát, Kết quả rà soát, Ghi chú rà soát. |
| Thao tác (Dòng nhóm) | - | - | - | Control UI: Icon.<br>Gồm:<br>+ Đánh dấu đã rà soát: Chỉ hiển thị với nhóm có Trạng thái rà soát là "Chưa rà soát".<br>- Chi tiết nghiệp vụ xem ở Chức năng trên màn hình. |
| **Dòng phiếu** | - | - | - | Hiển thị khi mở rộng nhóm, mỗi Phiếu đăng ký thuộc nhóm trên 01 dòng, sắp xếp theo Thời điểm đăng ký tăng dần. |
| STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự phiếu trong nhóm. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Hyperlink.<br>- Khi click: Mở màn hình Xem chi tiết Phiếu đăng ký tại tab mới, hiển thị giống [Màn hình Xem chi tiết hồ sơ - Tra cứu hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Tra_cuu_ho_so_Can_bo.md). |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- "Đăng ký lần đầu" hoặc "Đăng ký thay đổi". |
| Thời điểm đăng ký | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Tài sản trùng | String(1000) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị các trường dùng để đối chiếu trùng lặp của tài sản thuộc nhóm theo [BR-DK-037]:<br>+ Phương tiện giao thông cơ giới đường bộ: Số khung, Số máy, Biển số.<br>+ Tàu cá; phương tiện giao thông đường thủy nội địa; đường sắt: Số đăng ký phương tiện, Cơ quan cấp giấy chứng nhận.<br>+ Kho hàng: Địa chỉ kho hàng, Số hiệu kho hàng.<br>- Giá trị thuộc đặc điểm trùng của nhóm được tô nền cam nhạt và in đậm. |
| Bên bảo đảm | String(500) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị Tên kèm Số giấy tờ chứng minh tư cách pháp lý; nếu có nhiều Bên bảo đảm, mỗi bên trên 01 dòng trong cùng ô. |
| Bên nhận bảo đảm | String(500) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên nhận bảo đảm, mỗi bên trên 01 dòng trong cùng ô. |
| Số hợp đồng | String(100) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cơ quan tiếp nhận | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc. |
| Thao tác (Dòng phiếu) | - | - | - | Control UI: Icon.<br>Gồm:<br>+ Lập đề nghị Hủy đăng ký: Chỉ hiển thị với phiếu ở trạng thái "Hoàn thành", thuộc đơn vị quản lý của Người dùng và Người dùng có quyền lập đề nghị tại [Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md).<br>- Chi tiết nghiệp vụ xem ở Chức năng trên màn hình. |

##### 4.3.2.24.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Tab nghiệp vụ | Tab | Hệ thống thực hiện:<br>+ Hiển thị danh sách nhóm trùng lặp theo Tab được chọn.<br>+ Giữ nguyên các điều kiện bộ lọc đang nhập và đưa phân trang về Trang 1. |
| 2 | Chọn Loại tài sản | Combobox | - **TH1 (Chọn một loại tài sản cụ thể)**: Hệ thống hiển thị **Khối lọc động theo Loại tài sản** với các trường tương ứng loại tài sản đã chọn.<br>- **TH2 (Đổi sang loại tài sản khác)**: Hệ thống xóa giá trị đã nhập ở các trường lọc động của loại cũ, hiển thị bộ trường lọc động của loại mới.<br>- **TH3 (Chọn lại "Tất cả")**: Hệ thống ẩn Khối lọc động và xóa giá trị các trường lọc động. |
| 3 | Tìm kiếm | Nút | Hệ thống tìm kiếm nhóm trùng lặp theo Tab đang chọn và các điều kiện đã nhập tại Khối Bộ lọc tìm kiếm.<br>- **TH1 (Điều kiện ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày` (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày), hệ thống hiển thị [MSG-ERR-VAL-007], highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH2 (Không có dữ liệu trả về)**: Bảng kết quả hiển thị trạng thái không có dữ liệu theo [MSG-INF-SYS-001]; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Hợp lệ (Có dữ liệu trả về)**: Hệ thống hiển thị danh sách nhóm thỏa mãn đồng thời các điều kiện lọc, sắp xếp theo quy tắc mặc định và phân trang theo số nhóm/trang đang chọn. |
| 4 | Xóa bộ lọc | Nút | Hệ thống thực hiện:<br>+ Đưa toàn bộ tiêu chí lọc về mặc định: Từ ngày là ngày hiện tại trừ 30 ngày, Đến ngày là ngày hiện tại, các Combobox về "Tất cả", các ô nhập về Trống, bỏ tích "Bao gồm nhóm đã rà soát".<br>+ Ẩn Khối lọc động theo Loại tài sản.<br>+ Đặt lại phân trang về Trang 1 và tải lại danh sách. |
| 5 | Mở rộng / Thu gọn nhóm | Click biểu tượng mũi tên đầu dòng nhóm | - **TH1 (Nhóm đang thu gọn)**: Hệ thống hiển thị các dòng phiếu thuộc nhóm; tô nổi giá trị đặc điểm trùng tại cột tương ứng.<br>- **TH2 (Nhóm đang mở rộng)**: Hệ thống ẩn các dòng phiếu thuộc nhóm. |
| 6 | Xem chi tiết nhóm | Click dòng nhóm | Click vào bất kỳ vị trí nào trên dòng nhóm (ngoại trừ biểu tượng mũi tên đầu dòng và icon thao tác): Hệ thống mở [MH02 - Màn hình Xem chi tiết nhóm phiếu trùng lặp](#mh02) của nhóm được chọn. |
| 7 | Đánh dấu đã rà soát | Icon trên dòng nhóm | Chỉ hiển thị với nhóm có Trạng thái rà soát là "Chưa rà soát". Hệ thống mở [MH03 - Popup Đánh dấu đã rà soát](#mh03) cho nhóm được chọn. |
| 8 | Xem chi tiết Phiếu đăng ký | Hyperlink | Click Số đăng ký tại dòng phiếu: Hệ thống mở màn hình Xem chi tiết Phiếu đăng ký tại tab mới; màn hình hiện tại giữ nguyên. |
| 9 | Lập đề nghị Hủy đăng ký | Icon trên dòng phiếu | Hệ thống mở [MH02 - Màn hình Lập đề nghị chỉnh lý, hủy và khôi phục đăng ký - Quản lý Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Quan_ly_chinh_ly_huy_khoi_phuc_dang_ky.md#mh02) tại tab mới với Loại đề nghị là "Hủy đăng ký" và Số đăng ký lần đầu của phiếu được điền sẵn; hệ thống tự động thực hiện Tra cứu theo quy định của màn hình đó. |

---

<a id="mh02"></a>
#### 4.3.2.24.3. MH02 - Màn hình Xem chi tiết nhóm phiếu trùng lặp

##### 4.3.2.24.3.1. Màn hình

![Màn hình Xem chi tiết nhóm phiếu trùng lặp](images/LPTL_MH02_Xem_chi_tiet_nhom_phieu_trung_lap.png)

##### 4.3.2.24.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin nhóm trùng lặp** | - | - | - | Control UI: Khối thông tin, chỉ đọc. |
| Mức trùng | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu hệ thống. |
| Loại tài sản | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu hệ thống. |
| Đặc điểm trùng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu hệ thống. |
| Số phiếu trùng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu hệ thống; nếu nhóm có phiếu đang xử lý, hiển thị kèm số phiếu đang xử lý giống trường Số phiếu trùng tại [MH01 - Màn hình Danh sách nhóm phiếu trùng lặp](#mh01). |
| Thời điểm phát hiện | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu hệ thống.<br>- Định dạng hiển thị: `dd/mm/yyyy HH:mm`. |
| Trạng thái rà soát | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu hệ thống. |
| Người rà soát | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Trạng thái rà soát là "Đã rà soát". |
| Thời điểm rà soát | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy HH:mm`.<br>- Chỉ hiển thị khi Trạng thái rà soát là "Đã rà soát". |
| Kết quả rà soát | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Trạng thái rà soát là "Đã rà soát". |
| Ghi chú rà soát | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Trạng thái rà soát là "Đã rà soát". |
| **II. Bảng so sánh các phiếu trong nhóm** | - | - | - | Control UI: Bảng so sánh, chỉ đọc, có đường kẻ phân cách giữa các cột.<br>- Mỗi cột là 01 Phiếu đăng ký thuộc nhóm, sắp xếp theo Thời điểm đăng ký tăng dần; mỗi dòng là 01 trường thông tin.<br>- Nếu nhóm có nhiều hơn 04 phiếu, bảng cho phép cuộn ngang; cột tên trường được cố định bên trái.<br>- **Quy tắc tô nổi**: Ô có giá trị giống nhau giữa tất cả các phiếu trong nhóm được tô nền vàng nhạt; ô thuộc đặc điểm trùng được tô nền cam nhạt và in đậm. |
| Số đăng ký | - | - | - | Control UI: Hyperlink.<br>- Theo dữ liệu bản ghi.<br>- Khi click: Mở màn hình Xem chi tiết Phiếu đăng ký tại tab mới. |
| Loại đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy HH:mm`. |
| Trạng thái | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Cơ quan tiếp nhận | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Nguồn tiếp nhận | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Người yêu cầu đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Bên bảo đảm | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi: Tên kèm Số giấy tờ chứng minh tư cách pháp lý; nếu có nhiều bên, mỗi bên trên 01 dòng. |
| Bên nhận bảo đảm | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi; nếu có nhiều bên, mỗi bên trên 01 dòng. |
| Loại biện pháp / Loại hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Ngày có hiệu lực của hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Định dạng hiển thị: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Tài sản trùng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị các trường của tài sản được xác định trùng theo Loại tài sản của nhóm:<br>+ Phương tiện giao thông cơ giới đường bộ: Tên phương tiện, Nhãn hiệu màu sơn, Số khung, Số máy, Biển số.<br>+ Tàu cá; phương tiện giao thông đường thủy nội địa; đường sắt: Tên phương tiện nhãn hiệu, Tên chủ phương tiện, Số đăng ký, Cơ quan cấp giấy chứng nhận, Cấp phương tiện.<br>+ Kho hàng: Giá trị hàng hóa/Tên, loại hàng hóa, Địa chỉ kho hàng, Số hiệu kho hàng. |
| Tổng số tài sản của phiếu | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu bản ghi: Tổng số tài sản bảo đảm của phiếu. |
| Thanh nút chức năng | - | - | - | Control UI: Thanh nút cố định (Sticky) ở cuối màn hình.<br>Gồm:<br>+ Đóng<br>+ Đánh dấu đã rà soát: Chỉ hiển thị khi Trạng thái rà soát là "Chưa rà soát". |

##### 4.3.2.24.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem chi tiết Phiếu đăng ký | Hyperlink | Click Số đăng ký: Hệ thống mở màn hình Xem chi tiết Phiếu đăng ký tại tab mới; màn hình hiện tại giữ nguyên. |
| 2 | Đóng | Nút | TH1 (Mở từ [MH01 - Màn hình Danh sách nhóm phiếu trùng lặp](#mh01)): Hệ thống quay lại MH01, giữ nguyên Tab, bộ lọc tìm kiếm và trang dữ liệu trước đó.<br>TH2 (Mở tại tab mới từ khối Hồ sơ trùng lặp của màn hình xử lý hồ sơ): Hệ thống đóng tab hiện tại. |
| 3 | Đánh dấu đã rà soát | Nút | Hệ thống mở [MH03 - Popup Đánh dấu đã rà soát](#mh03) cho nhóm đang xem. |

---

<a id="mh03"></a>
#### 4.3.2.24.4. MH03 - Popup Đánh dấu đã rà soát

##### 4.3.2.24.4.1. Màn hình

![Popup Đánh dấu đã rà soát](images/LPTL_MH03_Popup_Danh_dau_da_ra_soat.png)

##### 4.3.2.24.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label in đậm: **"Đánh dấu đã rà soát nhóm phiếu trùng lặp"**. |
| Mức trùng | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Theo dữ liệu hệ thống. |
| Đặc điểm trùng | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu hệ thống. |
| Danh sách Số đăng ký trong nhóm | - | - | - | Control UI: Label, chỉ đọc.<br>- Theo dữ liệu hệ thống, các Số đăng ký cách nhau bởi dấu phẩy. |
| Kết quả rà soát | Enum(String(50)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: "-- Chọn kết quả rà soát --".<br>Gồm:<br>+ Hợp lệ - bảo đảm nhiều nghĩa vụ<br>+ Nộp trùng - đã xử lý<br>+ Khác |
| Ghi chú rà soát | Text(1000) | Có | Trống | Control UI: Textarea (Tối thiểu 3 dòng).<br>- Placeholder: "Nhập kết quả rà soát, VD: Tài sản bảo đảm cho nhiều nghĩa vụ khác nhau, không phải nộp trùng...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.24.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Nút | Hệ thống đóng popup, không thay đổi Trạng thái rà soát của nhóm và quay lại màn hình đã mở popup. |
| 2 | Xác nhận | Nút | - **TH1 (Bỏ trống trường bắt buộc)**: Quy định Kết quả rà soát và Ghi chú rà soát là bắt buộc. Hệ thống tô viền đỏ các trường bị bỏ trống (`.is-invalid`), hiển thị [MSG-ERR-VAL-001] dạng Inline ngay dưới từng trường và tự động focus vào trường lỗi đầu tiên. Không thực hiện đánh dấu.<br>- **TH2 (Nhóm đã được Người dùng khác đánh dấu đã rà soát)**: Hệ thống hiển thị [MSG-ERR-DK-005], đóng popup và tải lại màn hình đã mở popup.<br>- **TH Hợp lệ**: Hệ thống thực hiện theo [BR-DK-038]:<br>+ Lưu Trạng thái rà soát "Đã rà soát", Người rà soát (Người dùng đang đăng nhập), Thời điểm rà soát, Kết quả rà soát, Ghi chú rà soát và danh sách Số đăng ký của nhóm tại thời điểm rà soát.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-TL-001], đóng popup, cập nhật Badge Tab nghiệp vụ và tải lại màn hình đã mở popup. |
