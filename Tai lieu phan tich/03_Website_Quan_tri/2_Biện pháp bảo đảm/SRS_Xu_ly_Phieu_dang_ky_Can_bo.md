## 4.3.2. Dành cho Cán bộ nghiệp vụ tại Trung tâm đăng ký (TTĐK)

### 4.3.2.3. WebAdmin-025 - Phiếu đăng ký

#### 4.3.2.3.1. Mục đích

Cho phép quản lý công tác kiểm tra, đối soát, phê duyệt, trình ký, từ chối và xử lý lại các Phiếu đăng ký biện pháp bảo đảm, hợp đồng và thông báo xử lý tài sản bảo đảm trên Website Cán bộ thuộc phạm vi đơn vị được phân công, bao gồm:
- Tra cứu, theo dõi và lọc danh sách Phiếu đăng ký theo từng trạng thái xử lý ("Hồ sơ chờ duyệt", "Hồ sơ duyệt chờ ký", "Hồ sơ bị trả lại", "Hồ sơ đang chờ ký", "Hồ sơ đã xử lý").
- Xem chi tiết dữ liệu Phiếu đăng ký đồng bộ với giao diện Review Khách hàng kèm trục thời gian (Timeline) vòng đời biến động giao dịch và nhật ký phê duyệt nội bộ.
- Phê duyệt Phiếu đăng ký hợp lệ và chuyển sang trạng thái chờ trình ký.
- Trình ký Phiếu đăng ký (đơn lẻ hoặc theo lô) lên Lãnh đạo có thẩm quyền kèm dự thảo Văn bản chứng nhận (Mẫu số 05d).
- Từ chối Phiếu đăng ký (đơn lẻ hoặc theo lô) kèm lý do và dự thảo Thông báo từ chối gửi Lãnh đạo ký số.
- Hủy duyệt để chuyển hồ sơ từ trạng thái "Duyệt chờ ký" về "Chờ duyệt" khi cần rà soát lại thông tin.
- Cập nhật thông tin hồ sơ giấy (Nguồn tiếp nhận "Cán bộ nhập liệu") hoặc hồ sơ ở trạng thái "Bị trả lại" theo ý kiến của Lãnh đạo.

*a. Phân quyền*
- Cán bộ nghiệp vụ TTĐK: Được xem, kiểm tra, duyệt, trình ký, từ chối, hủy duyệt hoặc cập nhật hồ sơ bị trả lại theo quyền được phân công.
- Cán bộ chỉ được xem và xử lý hồ sơ thuộc Trung tâm đăng ký giao dịch, tài sản/đơn vị quản lý của mình.
- Cán bộ không được thao tác trên hồ sơ đã chuyển khỏi trạng thái cho phép xử lý theo [BR-DK-026].

*b. Điều kiện thực hiện*
- Cán bộ đã đăng nhập thành công vào Website Quản trị.
- Cán bộ được phân quyền truy cập menu "Biện pháp bảo đảm > Kiểm tra và xử lý hồ sơ".
- Hồ sơ đã hoàn tất bước nộp hồ sơ/thanh toán hoặc miễn phí theo luồng tương ứng và đang thuộc một trong các trạng thái được màn hình hỗ trợ.
- Dữ liệu hồ sơ, file đính kèm, lịch sử xử lý và kết quả đối soát rủi ro của hồ sơ đã được hệ thống lưu trữ đầy đủ.

*c. Nguyên tắc trạng thái và thanh toán/hoàn phí*
- Hồ sơ Online có phí đi theo luồng `Lưu nháp -> Chờ thanh toán -> Chờ duyệt`. Sau khi UC158 xác nhận thanh toán thành công, hồ sơ mới xuất hiện tại hàng chờ xử lý của Cán bộ ở trạng thái "Chờ duyệt".
- Hồ sơ Online miễn phí đi thẳng từ bước gửi hợp lệ sang trạng thái "Chờ duyệt".
- Hồ sơ giấy đi theo luồng `Chờ thu phí -> Chờ giải quyết -> Duyệt chờ ký -> Chờ ký`. Sau khi kế toán xác nhận đã thu phí hoặc hồ sơ thuộc diện miễn phí, hồ sơ giấy xuất hiện tại hàng chờ xử lý của Cán bộ ở trạng thái "Chờ giải quyết".
- Lãnh đạo không có bước "Chờ phê duyệt/Chờ duyệt" riêng. Cán bộ chịu trách nhiệm kiểm tra, duyệt nghiệp vụ và trình hồ sơ sang trạng thái "Chờ ký" để Lãnh đạo ký số/ký duyệt.
- Khi hồ sơ đã thu tiền bị từ chối, hệ thống phải phát sinh luồng tài chính tương ứng: hồ sơ Online tạo yêu cầu hoàn tiền tại Module Quản lý đối soát thanh toán; hồ sơ giấy tạo khoản hoàn phí/thông báo kế toán tại Module Quản lý thu phí/hoàn phí hồ sơ giấy.

*d. Phạm vi Phiếu đăng ký*
- Nhóm Phiếu đăng ký Tham chiếu Danh mục Loại hình đăng ký [DM_04] và được xác định theo cấu hình nhóm nghiệp vụ trên hệ thống.

*e. Nguyên tắc bố trí màn hình*
- Tại các màn danh sách xử lý hồ sơ của Website Cán bộ, hệ thống hiển thị tầng tab nghiệp vụ gồm:
  - "Phiếu đăng ký".
  - "Yêu cầu cung cấp thông tin".
  - "Yêu cầu cung cấp bản sao".
- Tài liệu này chỉ mô tả chi tiết tab "Phiếu đăng ký".
- Tab "Hồ sơ chờ nhập liệu" không chia thành 3 khối Phiếu đăng ký/Yêu cầu cung cấp thông tin/Yêu cầu cung cấp bản sao. Đây là một danh sách hồ sơ giấy chờ nhập liệu duy nhất; khi Cán bộ chọn đúng Loại yêu cầu, hệ thống mới mở form nhập liệu tương ứng.

---

<a id="mh01"></a>
#### 4.3.2.3.2. MH01 - Màn hình Danh sách Phiếu đăng ký theo trạng thái

##### 4.3.2.3.2.1. Màn hình

![Màn hình Danh sách Phiếu đăng ký theo trạng thái](images/UC_DK_CB_MH01_Danh_sach_Phieu_dang_ky_theo_trang_thai.png)

##### 4.3.2.3.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab trạng thái hồ sơ** | - | - | - | |
| Hồ sơ chờ duyệt | Enum(String(50)) | Không | Theo menu truy cập | Control UI: Tab chuyển trạng thái.<br>- Hiển thị danh sách Phiếu đăng ký Online ở trạng thái "Chờ duyệt" và hồ sơ giấy ở trạng thái "Chờ giải quyết".<br>- Cán bộ được phép duyệt, trình ký, từ chối hoặc cập nhật nếu hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" theo [BR-DK-026] và [BR-DK-030]. |
| Hồ sơ duyệt chờ ký | Enum(String(50)) | Không | Theo menu truy cập | Control UI: Tab chuyển trạng thái.<br>- Hiển thị danh sách Phiếu đăng ký ở trạng thái "Duyệt chờ ký".<br>- Cán bộ được phép trình ký, hủy duyệt hoặc từ chối theo [BR-DK-026]. |
| Hồ sơ bị trả lại | Enum(String(50)) | Không | Theo menu truy cập | Control UI: Tab chuyển trạng thái.<br>- Hiển thị danh sách Phiếu đăng ký ở trạng thái "Bị trả lại".<br>- Cán bộ được phép cập nhật hồ sơ theo nội dung trả lại hoặc từ chối theo [BR-DK-026]. |
| Hồ sơ đang chờ ký | Enum(String(50)) | Không | Theo menu truy cập | Control UI: Tab chuyển trạng thái.<br>- Hiển thị danh sách Phiếu đăng ký ở trạng thái "Chờ ký".<br>- Cán bộ chỉ được xem theo thẩm quyền, không được duyệt/trình ký/từ chối trên danh sách này theo [BR-DK-026]. |
| Hồ sơ đã xử lý | Enum(String(50)) | Không | Theo menu truy cập | Control UI: Tab chuyển trạng thái.<br>- Hiển thị danh sách Phiếu đăng ký ở trạng thái "Hoàn thành" hoặc "Bị từ chối".<br>- Cán bộ chỉ được xem lại thông tin, lịch sử và file kết quả theo thẩm quyền. |
| **II. Tab nhóm nghiệp vụ** | - | - | - | |
| Phiếu đăng ký | Enum(String(50)) | Có | "Phiếu đăng ký" | Control UI: Tab chuyển nhóm nghiệp vụ.<br>- Tab đang được đặc tả trong tài liệu này.<br>- Chỉ hiển thị các hồ sơ thuộc nhóm Phiếu đăng ký tại mục 4.3.2.3.1.d. |
| Yêu cầu cung cấp thông tin | Enum(String(50)) | Không | Không chọn | Control UI: Tab chuyển nhóm nghiệp vụ.<br>- Hiển thị theo tài liệu [SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md). |
| Yêu cầu cung cấp bản sao | Enum(String(50)) | Không | Không chọn | Control UI: Tab chuyển nhóm nghiệp vụ.<br>- Hiển thị trạng thái "Đang phát triển" hoặc theo tài liệu SRS riêng của nghiệp vụ cung cấp bản sao khi được ban hành. |
| **III. Bộ lọc tìm kiếm** | - | - | - | |
| Tìm kiếm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký, mã PIN, tên bên bảo đảm...".<br>- Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Số đăng ký, Mã PIN, Tên bên bảo đảm hoặc Tên bên nhận bảo đảm. |
| Mã khách hàng | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập mã khách hàng...".<br>- Tìm kiếm gần đúng theo Mã khách hàng nộp hồ sơ. |
| Loại đăng ký | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04].<br>- Chỉ lọc trong phạm vi nhóm Phiếu đăng ký, không trả về hồ sơ Yêu cầu cung cấp thông tin/Yêu cầu cung cấp bản sao. |
| Loại hình giao dịch | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại hình giao dịch [DM_01].<br>- Khi chọn "Biện pháp bảo đảm", hệ thống cập nhật danh sách Loại biện pháp/Hợp đồng theo Danh mục Loại biện pháp bảo đảm [DM_02].<br>- Khi chọn "Hợp đồng", hệ thống cập nhật danh sách Loại biện pháp/Hợp đồng theo Danh mục Loại hợp đồng [DM_03].<br>- Khi chọn "Thông báo xử lý tài sản", hệ thống lọc các hồ sơ thông báo xử lý tài sản trong [DM_04]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại biện pháp bảo đảm [DM_02] hoặc [DM_03] theo Loại hình giao dịch đã chọn.<br>- Nếu chưa chọn Loại hình giao dịch, chỉ hiển thị "Tất cả". |
| Loại tài sản đảm bảo | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại tài sản bảo đảm [DM_07]. |
| Trạng thái xử lý | Enum(String(50)) | Tùy điều kiện | Tất cả | Control UI: Combobox.<br>- Chỉ hiển thị tại danh sách "Hồ sơ đã xử lý".<br>- Gồm:<br>+ Tất cả<br>+ Hoàn thành<br>+ Bị từ chối |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Control UI: Input date kèm icon lịch, định dạng `dd/mm/yyyy`.<br>- Lọc theo Thời điểm đăng ký. Tuân thủ quy tắc so sánh ngày [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Input date kèm icon lịch, định dạng `dd/mm/yyyy`.<br>- Lọc theo Thời điểm đăng ký. Tuân thủ quy tắc so sánh ngày [BR-VAL-007]. |
| **IV. Bảng danh sách Phiếu đăng ký** | - | - | - | Control UI: Bảng dữ liệu kèm thanh phân trang theo quy chuẩn phân trang dùng chung.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định. Mặc định sắp xếp theo **"Thời điểm đăng ký" tăng dần** trong nhóm hồ sơ cần xử lý để ưu tiên hồ sơ đến trước; tại danh sách tra cứu/xem lại sắp xếp **giảm dần theo Thời điểm đăng ký** để thuận tiện theo dõi hồ sơ mới nhất.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung **[MSG-INF-SYS-001]**; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"* và các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| Checkbox | Boolean | Không | Không tích | Control UI: Checkbox chọn dòng / Chọn tất cả.<br>- Chỉ hiển thị tại Tab "Hồ sơ chờ duyệt" và Tab "Hồ sơ duyệt chờ ký".<br>- Cho phép chọn một hoặc nhiều hồ sơ để thực hiện thao tác lô trên Toolbar.<br>- Checkbox chọn tất cả tại tiêu đề bảng chỉ chọn các hồ sơ đang hiển thị trên trang hiện tại.<br>- Khi Cán bộ đổi Tab trạng thái, Tab nhóm nghiệp vụ, bộ lọc tìm kiếm hoặc số bản ghi/trang, hệ thống xóa danh sách hồ sơ đã chọn. |
| STT | Integer(10) | - | Theo trang | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng tính liên tục theo trang kết quả hiện tại. |
| Thời điểm đăng ký | Datetime | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Định dạng `dd/mm/yyyy HH:mm`.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Link, chỉ đọc.<br>- Mã hồ sơ/số đăng ký của Phiếu đăng ký. Click vào giá trị mở [MH02 - Màn hình Xem chi tiết Phiếu đăng ký](#mh02). |
| Mã PIN | String(20) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị mã PIN bảo mật của hồ sơ nếu đã phát sinh. |
| Tên bên bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Tên bên nhận bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hỗ trợ sắp xếp động (Sortable) khi click vào tiêu đề cột. |
| Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04]. |
| Loại hình GD | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Loại hình giao dịch [DM_01]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Loại biện pháp bảo đảm [DM_02] nếu Loại hình giao dịch là "Biện pháp bảo đảm"; Tham chiếu Danh mục Loại hợp đồng [DM_03] nếu Loại hình giao dịch là "Hợp đồng". |
| Loại tài sản | Enum(String(255)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Loại tài sản bảo đảm [DM_07].<br>- Nếu hồ sơ có nhiều Loại tài sản, hiển thị mỗi Loại tài sản trên một dòng riêng trong cùng ô. |
| Mã khách hàng | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị Mã khách hàng nộp hồ sơ nếu có. |
| Số biên lai | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Hiển thị số biên lai/biên nhận thanh toán lệ phí nếu có. |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Badge trạng thái, chỉ đọc.<br>- Gồm:<br>+ Chờ thanh toán<br>+ Chờ duyệt<br>+ Chờ giải quyết<br>+ Duyệt chờ ký<br>+ Bị trả lại<br>+ Chờ ký<br>+ Hoàn thành<br>+ Bị từ chối |
| Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tên người yêu cầu đăng ký; nếu hồ sơ không lưu Người yêu cầu riêng, hệ thống hiển thị theo Tên bên bảo đảm/người nộp hồ sơ theo dữ liệu hồ sơ. |
| Nguồn tiếp nhận | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Badge/Label, chỉ đọc.<br>- Gồm:<br>+ Khách hàng<br>+ Cán bộ nhập liệu |
| Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tên Cán bộ đang được phân công hoặc đã xử lý hồ sơ. |
| Thao tác | - | - | - | Control UI: Nhóm icon thao tác trên dòng (tuân thủ quy chuẩn Fixed-Slot Action Column Alignment).<br>- Cập nhật: Chỉ khả dụng khi hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" tại Tab "Hồ sơ chờ duyệt" hoặc hồ sơ tại Tab "Hồ sơ bị trả lại". Đối với hồ sơ nguồn Khách hàng, icon hiển thị khóa mờ kèm tooltip "Hồ sơ từ nguồn Khách hàng không được cập nhật".<br>- Duyệt: Chỉ hiển thị và khả dụng tại Tab "Hồ sơ chờ duyệt".<br>- Trình ký: Chỉ hiển thị và khả dụng tại Tab "Hồ sơ chờ duyệt" và Tab "Hồ sơ duyệt chờ ký".<br>- Hủy duyệt: Chỉ hiển thị và khả dụng tại Tab "Hồ sơ duyệt chờ ký".<br>- Từ chối: Chỉ hiển thị và khả dụng tại Tab "Hồ sơ chờ duyệt", Tab "Hồ sơ duyệt chờ ký" và Tab "Hồ sơ bị trả lại".<br>- Tại Tab "Hồ sơ đang chờ ký" và "Hồ sơ đã xử lý": Các icon thao tác hiển thị ở trạng thái khóa mờ (chỉ xem chi tiết qua Row-click). |

##### 4.3.2.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống tìm kiếm hồ sơ theo các điều kiện đã nhập tại Khối Bộ lọc tìm kiếm, trong phạm vi đơn vị được phân quyền của Cán bộ đăng nhập.<br>- **TH Dữ liệu lọc không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị [MSG-ERR-VAL-007], highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH Không trả về dữ liệu (Empty State)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Trả về dữ liệu**: Hiển thị danh sách Phiếu đăng ký thỏa mãn điều kiện lọc, sắp xếp mặc định theo `Thời điểm đăng ký` tăng dần (tại các tab chờ xử lý) hoặc giảm dần (tại tab đã xử lý), phân trang theo số dòng hiển thị đang chọn. |
| 2 | Xóa bộ lọc | Nút | Hệ thống đưa toàn bộ tiêu chí lọc về mặc định (Từ ngày là ngày 01 của tháng hiện tại, Đến ngày là ngày hiện tại, các Combobox về "Tất cả"), đặt lại phân trang về Trang 1 và tải lại danh sách. |
| 3 | Duyệt | Nút / Icon | TH1 (Chưa chọn bản ghi khi thao tác lô trên Toolbar): Vi phạm [BR-DK-024], hiển thị [MSG-ERR-DK-008], không thực hiện duyệt.<br>- TH2 (Có hồ sơ trong lô không ở trạng thái "Chờ duyệt" hoặc "Chờ giải quyết", đã thay đổi trạng thái hoặc Cán bộ không còn quyền xử lý): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không thực hiện duyệt cho toàn bộ lô.<br>- TH3 (Phát hiện hồ sơ trùng lặp): Đối với hồ sơ "Đăng ký lần đầu" hoặc "Đăng ký thay đổi", hệ thống kiểm tra theo [BR-DK-029] cho từng hồ sơ trong danh sách đã chọn. Nếu phát hiện trùng lặp, hiển thị [MSG-CFM-DK-010] kèm danh sách hồ sơ có cảnh báo để Cán bộ chọn tiếp tục hoặc hủy thao tác.<br>- TH Hợp lệ thao tác dòng: Hệ thống cập nhật hồ sơ tại dòng được chọn sang trạng thái "Duyệt chờ ký"; ghi nhận Cán bộ duyệt, thời điểm duyệt, ý kiến duyệt nếu có, trạng thái trước/sau, lịch sử xử lý và Audit log; hiển thị [MSG-SUC-DK-KT-001].<br>- TH Hợp lệ thao tác theo lô: Hệ thống kiểm tra toàn bộ danh sách hồ sơ đã chọn trước khi xử lý. Khi tất cả hồ sơ hợp lệ hoặc Cán bộ đã xác nhận tiếp tục với cảnh báo trùng lặp, hệ thống cập nhật toàn bộ hồ sơ đã chọn sang trạng thái "Duyệt chờ ký"; ghi nhận Cán bộ duyệt, thời điểm duyệt, trạng thái trước/sau, lịch sử xử lý và Audit log cho từng hồ sơ; hiển thị thông báo thành công kèm tổng số hồ sơ đã duyệt. |
| 4 | Trình ký | Nút / Icon | TH1 (Chưa chọn bản ghi khi thao tác lô trên Toolbar): Vi phạm [BR-DK-024], hiển thị [MSG-ERR-DK-008], không mở popup trình ký.<br>- TH2 (Có hồ sơ trong lô không ở trạng thái cho phép trình ký: không ở trạng thái "Chờ duyệt", "Chờ giải quyết" hoặc "Duyệt chờ ký", đã thay đổi trạng thái hoặc Cán bộ không còn quyền xử lý): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không mở popup trình ký cho toàn bộ lô.<br>- TH3 (Vượt quá số lượng hồ sơ trình ký/lần): Nếu số hồ sơ được chọn lớn hơn giới hạn cấu hình (mặc định 20 hồ sơ/lần), hệ thống hiển thị cảnh báo theo [MSG-WRN-SYS-001], không sinh file PDF dự thảo và không mở popup trình ký.<br>- TH Hợp lệ thao tác dòng: Ngay sau khi Cán bộ bấm "Trình ký" và hồ sơ hợp lệ, hệ thống sinh file PDF dự thảo theo mục **4.3.2.3.6**, sau đó mở [MH04 - Popup Trình ký Phiếu đăng ký](#mh04) cho hồ sơ tại dòng được chọn.<br>- TH Hợp lệ thao tác theo lô: Hệ thống kiểm tra toàn bộ danh sách hồ sơ đã chọn. Khi tất cả hồ sơ hợp lệ, hệ thống sinh file PDF dự thảo riêng cho từng hồ sơ theo mục **4.3.2.3.6**, sau đó mở [MH04 - Popup Trình ký Phiếu đăng ký](#mh04) ở chế độ trình ký nhiều hồ sơ; trường "Lãnh đạo ký" chỉ hiển thị người có thẩm quyền ký toàn bộ hồ sơ trong lô. |
| 5 | Từ chối | Nút / Icon | TH1 (Chưa chọn bản ghi khi thao tác lô trên Toolbar): Vi phạm [BR-DK-024], hiển thị [MSG-ERR-DK-008], không mở popup từ chối.<br>- TH2 (Có hồ sơ trong lô không ở trạng thái cho phép từ chối: không ở trạng thái "Chờ duyệt", "Chờ giải quyết", "Duyệt chờ ký" hoặc "Bị trả lại", đã thay đổi trạng thái hoặc Cán bộ không còn quyền xử lý): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không mở popup từ chối cho toàn bộ lô.<br>- TH Hợp lệ thao tác dòng: Hệ thống mở [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) cho hồ sơ tại dòng được chọn.<br>- TH Hợp lệ thao tác theo lô: Hệ thống kiểm tra toàn bộ danh sách hồ sơ đã chọn trước khi mở popup. Khi tất cả hồ sơ hợp lệ, hệ thống mở [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) và truyền danh sách hồ sơ đã chọn vào popup; lý do từ chối áp dụng cho toàn bộ hồ sơ trong lô; trường "Lãnh đạo ký văn bản từ chối" chỉ hiển thị người có thẩm quyền ký toàn bộ văn bản từ chối trong lô. |
| 6 | Cập nhật | Icon | TH1 (Hồ sơ nguồn Khách hàng tại trạng thái "Chờ duyệt"): Theo [BR-DK-030], icon hiển thị dạng làm mờ kèm tooltip "Hồ sơ từ nguồn Khách hàng không được cập nhật", không cho phép thao tác.<br>- TH Hợp lệ: Hệ thống mở form nhập liệu tương ứng loại hồ sơ để Cán bộ cập nhật theo phạm vi được phép khi hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" tại trạng thái "Chờ duyệt" hoặc hồ sơ ở trạng thái "Bị trả lại". |
| 7 | Hủy duyệt | Icon | TH1 (Hồ sơ không ở trạng thái "Duyệt chờ ký"): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không thực hiện hủy duyệt.<br>- TH Hợp lệ: Hệ thống chuyển hồ sơ từ trạng thái "Duyệt chờ ký" về "Chờ duyệt"; ghi nhận Cán bộ hủy duyệt, thời điểm hủy duyệt, trạng thái trước/sau; ghi lịch sử xử lý và Audit log; hiển thị [MSG-SUC-DK-KT-004]. |
| 8 | Click dòng dữ liệu | Row click | Mở [MH02 - Màn hình Xem chi tiết Phiếu đăng ký](#mh02) của bản ghi được chọn ở chế độ chỉ đọc. Đây là phương thức chính để xem chi tiết hồ sơ trên lưới, ngoại trừ khi Cán bộ click trực tiếp vào checkbox hoặc các nút thao tác nghiệp vụ. |
| 9 | Sắp xếp cột | Header cột | Khi người dùng click vào tiêu đề cột có hỗ trợ sắp xếp động (`Thời điểm đăng ký`, `Tên bên bảo đảm`, `Tên bên nhận bảo đảm`):<br>- Lần click thứ nhất: Sắp xếp danh sách kết quả theo chiều tăng dần.<br>- Lần click thứ hai: Sắp xếp danh sách kết quả theo chiều giảm dần.<br>- Lần click thứ ba: Đưa về trạng thái sắp xếp mặc định ban đầu của hệ thống.<br>- Giữ nguyên các tiêu chí lọc đang thiết lập và đưa hiển thị về Trang 1. |
| 10 | Phân trang | Pagination | Cho phép chuyển trang và cấu hình số lượng bản ghi hiển thị trên mỗi trang (10, 20, 50, 100 bản ghi/trang). Khi chuyển trang hoặc thay đổi số lượng bản ghi, hệ thống giữ nguyên các điều kiện lọc và tải lại danh sách tương ứng. |
| 11 | Chọn tất cả | Checkbox header | Tích chọn hoặc bỏ chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại phục vụ thao tác lô (Duyệt, Trình ký, Từ chối) trên Toolbar. |

---

<a id="mh02"></a>
#### 4.3.2.3.3. MH02 - Màn hình Xem chi tiết Phiếu đăng ký

##### 4.3.2.3.3.1. Màn hình

![Màn hình Xem chi tiết Phiếu đăng ký](images/UC_DK_CB_MH02_Xem_chi_tiet_Phieu_dang_ky.png)

##### 4.3.2.3.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :---: | :---: | :---: | :--- |
| **I. Thông tin hồ sơ** | - | - | - | |
| Số hồ sơ | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Mã hồ sơ/số đăng ký của Phiếu đăng ký đang xem. |
| Trạng thái | - | - | - | Control UI: Badge trạng thái, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị trạng thái hiện tại của hồ sơ theo workflow đăng ký. |
| Mã khách hàng | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi hồ sơ có Mã khách hàng. |
| Mã PIN | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi hồ sơ đã phát sinh Mã PIN. |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị định dạng `dd/mm/yyyy HH:mm`. |
| Loại đăng ký | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04]. |
| Loại hình giao dịch | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Tham chiếu Danh mục Loại hình giao dịch [DM_01]. |
| Loại biện pháp / Hợp đồng | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Tham chiếu Danh mục Loại biện pháp bảo đảm [DM_02] hoặc [DM_03] theo Loại hình giao dịch. |
| Loại tài sản | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Tham chiếu Danh mục Loại tài sản bảo đảm [DM_07]. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Tên người yêu cầu đăng ký theo dữ liệu hồ sơ. |
| Nguồn tiếp nhận | - | - | - | Control UI: Badge/Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị "Khách hàng" hoặc "Cán bộ nhập liệu". |
| Cán bộ xử lý | - | - | - | Control UI: Label, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Tên Cán bộ đang hoặc đã xử lý hồ sơ. |
| **II. Trục vòng đời giao dịch** | - | - | - | |
| Danh sách phiên bản hồ sơ | - | - | - | Control UI: Sidebar Timeline lịch sử, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị chuỗi phiên bản/bản ghi lịch sử của giao dịch.<br>- Phiên bản đang mở xử lý được tô nổi bật trên Timeline.<br>- Cho phép Cán bộ click chọn các phiên bản khác trên Timeline để đối chiếu dữ liệu. |
| Chỉ hiển thị vùng dữ liệu có biến động | Boolean | Không | Không tích | Control UI: Checkbox.<br>- Tích chọn để lọc và chỉ hiển thị các khối dữ liệu có thay đổi giữa các phiên bản. |
| **III. Nhật ký phê duyệt nội bộ** | - | - | - | |
| Nhật ký phê duyệt nội bộ | - | - | - | Control UI: Bảng lịch sử thao tác, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị lịch sử thao tác nội bộ: tiếp nhận, cập nhật, duyệt, hủy duyệt, trình ký, trả lại, từ chối, ký số và các thay đổi trạng thái kèm thời gian và người thực hiện. |
| **IV. Khu vực chi tiết Phiếu đăng ký** | - | - | - | |
| Khung đối chiếu dữ liệu chi tiết | - | - | - | Control UI: Khung đối chiếu dữ liệu chi tiết, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị toàn bộ các khối thông tin tương ứng của phiên bản đang chọn trên Timeline: Thông tin người đăng ký, Thông tin chung, Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm.<br>- Cấu trúc hiển thị đồng nhất với màn hình Review trên Website Khách hàng.<br>- Toàn bộ dữ liệu trong khung ở trạng thái chỉ đọc. |
| Thông tin bổ sung đối với phiên bản bị từ chối | - | - | - | Control UI: Khung thông tin từ chối, chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi phiên bản đang chọn trên Timeline có trạng thái "Bị từ chối". |
| **V. Tệp hồ sơ và kết quả** | - | - | - | |
| Tài liệu đính kèm của Khách hàng | - | - | - | Control UI: Danh sách tệp đính kèm kèm link "Xem file", chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Hiển thị danh sách tệp đính kèm do Khách hàng/Cán bộ nhập liệu đã gửi cùng hồ sơ. |
| Dự thảo Văn bản chứng nhận / Thông báo kết quả | - | - | - | Control UI: Link "Xem file", chỉ đọc.<br>- Chỉ hiển thị sau khi hệ thống sinh file PDF dự thảo để Cán bộ trình ký (theo Mẫu số 05d).<br>- Cho phép click để mở file tại tab trình duyệt mới. |
| File đã ký | - | - | - | Control UI: Link "Xem file", chỉ đọc. Lấy theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi hồ sơ ở trạng thái "Hoàn thành" và đã có file PDF ký số của Lãnh đạo. |
| **VI. Ý kiến phê duyệt của Cán bộ** | - | - | - | |
| Ý kiến phê duyệt của Cán bộ | Text(1000) | Tùy điều kiện | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập ý kiến phê duyệt hoặc lý do từ chối...".<br>- Cho phép nhập khi hồ sơ ở trạng thái "Chờ duyệt" hoặc "Duyệt chờ ký".<br>- Bắt buộc nhập khi Cán bộ thực hiện "Từ chối" theo [BR-DK-025] và [BR-VAL-001]. Tự động trim space theo [BR-VAL-001]. |

##### 4.3.2.3.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Hệ thống đóng màn hình Xem chi tiết và quay lại [MH01 - Màn hình Danh sách Phiếu đăng ký theo trạng thái](#mh01), giữ nguyên tab trạng thái, tab nhóm nghiệp vụ, bộ lọc tìm kiếm và trang dữ liệu trước đó. |
| 2 | Cập nhật | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị khi hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" tại trạng thái "Chờ duyệt" hoặc hồ sơ ở trạng thái "Bị trả lại". Ẩn hoàn toàn đối với các trạng thái khác hoặc khi hồ sơ có Nguồn tiếp nhận là "Khách hàng" tại trạng thái "Chờ duyệt" theo [BR-DK-030].<br>- TH1 (Hồ sơ không ở trạng thái cho phép cập nhật): Vi phạm [BR-DK-026], hệ thống hiển thị [MSG-ERR-DK-005], không mở form cập nhật.<br>- TH Hợp lệ: Hệ thống mở form nhập liệu tương ứng loại hồ sơ để Cán bộ cập nhật dữ liệu theo nội dung trả lại của Lãnh đạo hoặc hoàn thiện dữ liệu nhập liệu. |
| 3 | Duyệt | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt" hoặc "Chờ giải quyết". Ẩn hoàn toàn tại các trạng thái khác.<br>- TH1 (Hồ sơ không ở trạng thái cho phép duyệt hoặc đã thay đổi trạng thái): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không thực hiện duyệt.<br>- TH2 (Phát hiện hồ sơ trùng lặp): Hệ thống kiểm tra theo [BR-DK-029]; nếu có cảnh báo trùng lặp, hiển thị [MSG-CFM-DK-010] để Cán bộ chọn tiếp tục hoặc hủy.<br>- TH Hợp lệ: Hệ thống cập nhật hồ sơ sang trạng thái "Duyệt chờ ký", ghi nhận người duyệt, thời điểm duyệt, ý kiến duyệt nếu có, trạng thái trước/sau, lịch sử xử lý và Audit log; hiển thị [MSG-SUC-DK-KT-001]; tự động làm mới màn hình chi tiết. |
| 4 | Trình ký | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt", "Chờ giải quyết" hoặc "Duyệt chờ ký". Ẩn hoàn toàn tại các trạng thái khác.<br>- TH1 (Hồ sơ không ở trạng thái cho phép trình ký): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không mở popup trình ký.<br>- TH2 (Không sinh được file PDF dự thảo Văn bản chứng nhận): Hệ thống hiển thị [MSG-ERR-SYS-001]; không mở popup trình ký, không chuyển trạng thái hồ sơ và ghi nhận lỗi vào Audit log.<br>- TH Hợp lệ: Ngay sau khi Cán bộ bấm "Trình ký" và hồ sơ hợp lệ, hệ thống sinh file PDF dự thảo Văn bản chứng nhận theo mục **4.3.2.3.6**, sau đó mở [MH04 - Popup Trình ký Phiếu đăng ký](#mh04) để Cán bộ kiểm tra file, chọn Lãnh đạo ký và xác nhận trình ký. |
| 5 | Từ chối | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt", "Chờ giải quyết", "Duyệt chờ ký" hoặc "Bị trả lại". Ẩn hoàn toàn tại các trạng thái khác.<br>- TH1 (Bỏ trống Ý kiến phê duyệt của Cán bộ / Lý do từ chối): Vi phạm [BR-DK-025] và [BR-VAL-001], hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập, tự động focus con trỏ vào ô nhập và không cho phép tiếp tục.<br>- TH2 (Hồ sơ không ở trạng thái cho phép từ chối): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không thực hiện từ chối.<br>- TH Hợp lệ: Hệ thống mở [MH03 - Popup Từ chối Phiếu đăng ký](#mh03) và tự động điền sẵn lý do từ chối đã nhập vào popup. |
| 6 | Xem file | Link / Nút | Hệ thống mở tệp tài liệu đính kèm, file PDF dự thảo hoặc file đã ký sang một tab trình duyệt mới để Cán bộ xem toàn văn nội dung. |
| 7 | Chọn phiên bản trên Timeline | Click item | Khi Cán bộ click vào một mốc phiên bản trên Timeline vòng đời giao dịch, hệ thống tải lại toàn bộ dữ liệu chi tiết của phiên bản tương ứng vào Khung đối chiếu dữ liệu chi tiết để Cán bộ kiểm tra, đối soát; không làm thay đổi trạng thái và phiên bản hồ sơ đang mở xử lý. |
| 8 | Lọc vùng biến động | Checkbox toggle | Khi Cán bộ tích chọn "Chỉ hiển thị vùng dữ liệu có biến động", hệ thống tự động ẩn các vùng thông tin giống nhau giữa các phiên bản và chỉ hiển thị các khối dữ liệu có sự thay đổi. Khi bỏ tích chọn, hệ thống hiển thị lại đầy đủ toàn bộ các khối thông tin. |

---

<a id="mh03"></a>
#### 4.3.2.3.4. MH03 - Popup Từ chối Phiếu đăng ký

##### 4.3.2.3.4.1. Màn hình

![Popup Từ chối Phiếu đăng ký](images/UC_DK_CB_MH03_Tu_choi_Phieu_dang_ky.png)

##### 4.3.2.3.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ / Số đăng ký | String(255) | Có | Theo hồ sơ được chọn | Control UI: Label, chỉ đọc.<br>- Nếu từ chối một hồ sơ: hiển thị Mã hồ sơ/Số đăng ký của hồ sơ đó.<br>- Nếu từ chối nhiều hồ sơ: hiển thị danh sách rút gọn các hồ sơ đã chọn kèm tổng số hồ sơ. |
| Lý do từ chối tiếp nhận | Text(1000) | Có | Theo ý kiến đã nhập hoặc Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối hồ sơ...".<br>- Bắt buộc nhập theo [BR-DK-025] và [BR-VAL-001].<br>- Tự động trim space và kiểm tra bỏ trống. |
| Văn bản dự thảo thông báo từ chối | File | Không | Theo hệ thống sinh | Control UI: Link "Xem file", chỉ đọc.<br>- Chỉ hiển thị sau khi hệ thống sinh dự thảo thông báo từ chối thành công.<br>- Cho phép click để mở xem file tại một tab riêng. |
| Lãnh đạo ký văn bản từ chối | Enum(String(255)) | Có | Trống | Control UI: Combobox có ô tìm kiếm.<br>- Bắt buộc chọn trước khi xác nhận gửi Lãnh đạo ký từ chối.<br>- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>- Cho phép tìm kiếm gần đúng theo tên Lãnh đạo, chức danh hoặc đơn vị.<br>- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký văn bản từ chối của hồ sơ được chọn.<br>- Với từ chối nhiều hồ sơ, danh sách Lãnh đạo ký chỉ hiển thị người có thẩm quyền ký tất cả văn bản từ chối trong danh sách đã chọn. |

##### 4.3.2.3.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình trước đó. |
| 2 | Sinh dự thảo từ chối | Nút | - **TH Bỏ trống Lý do từ chối tiếp nhận**: Vi phạm [BR-DK-025] và [BR-VAL-001], hệ thống tô viền đỏ ô nhập, hiển thị cảnh báo đỏ "Đây là trường bắt buộc" ngay phía dưới ô nhập, tự động focus con trỏ vào ô nhập và không sinh dự thảo.<br>- **TH Hồ sơ không ở trạng thái cho phép từ chối**: Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không sinh dự thảo.<br>- **TH Hợp lệ**: Hệ thống sinh dự thảo Thông báo từ chối theo mẫu được cấu hình; lưu file dự thảo vào hồ sơ; hiển thị link xem file dự thảo để Cán bộ kiểm tra trước khi gửi trình ký. |
| 3 | Xác nhận gửi Lãnh đạo ký từ chối | Nút | - **TH Chưa sinh file dự thảo thông báo từ chối hợp lệ**: Hệ thống hiển thị thông báo lỗi [MSG-ERR-SYS-001], không chuyển trạng thái hồ sơ.<br>- **TH Chưa chọn Lãnh đạo ký văn bản từ chối hoặc Lãnh đạo đã chọn không còn hiệu lực/thẩm quyền**: Vi phạm [BR-VAL-001], tô viền đỏ trường chọn, hiển thị cảnh báo đỏ "Đây là trường bắt buộc" phía dưới ô chọn, focus con trỏ và không gửi trình ký.<br>- **TH Hợp lệ**: Hệ thống cập nhật hồ sơ sang trạng thái "Chờ ký" để Lãnh đạo ký số/ký duyệt văn bản từ chối; ghi nhận Cán bộ từ chối, thời điểm từ chối, lý do từ chối, phiên bản file dự thảo, Lãnh đạo ký văn bản từ chối đã chọn, lịch sử xử lý và Audit log; chuyển hồ sơ đến đúng Lãnh đạo ký đã chọn. Nếu hồ sơ đã thu tiền, tạo yêu cầu hoàn tiền/hoàn phí tương ứng nguồn hồ sơ để xử lý sau khi Lãnh đạo ký văn bản từ chối; hiển thị [MSG-SUC-DK-KT-003]; đóng popup và tự động làm mới danh sách. |
| 4 | Xem file | Link / Nút | Hệ thống mở file dự thảo văn bản thông báo từ chối sang tab trình duyệt mới để Cán bộ kiểm tra nội dung. |

---

<a id="mh04"></a>
#### 4.3.2.3.5. MH04 - Popup Trình ký Phiếu đăng ký

##### 4.3.2.3.5.1. Màn hình

![Popup Trình ký Phiếu đăng ký](images/UC_DK_CB_MH04_Trinh_ky_Phieu_dang_ky.png)

##### 4.3.2.3.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Chế độ trình ký | Enum(String(50)) | Có | Theo thao tác mở popup | Control UI: Label, chỉ đọc.<br>- Gồm:<br>+ Trình ký một hồ sơ<br>+ Trình ký nhiều hồ sơ |
| Thông tin hồ sơ trình ký | Text(1000) | Có | Lấy theo dữ liệu bản ghi | Control UI: Khung thông tin tóm tắt, chỉ đọc.<br>- Chỉ hiển thị khi Chế độ trình ký là "Trình ký một hồ sơ".<br>- Hiển thị các thông tin tóm tắt: Mã hồ sơ/Số đăng ký, Loại đăng ký, Loại hình giao dịch, Người yêu cầu, Trạng thái hồ sơ. |
| Tổng số hồ sơ trình ký | Integer(10) | Có | Theo số lượng chọn | Control UI: Label, chỉ đọc.<br>- Chỉ hiển thị khi Chế độ trình ký là "Trình ký nhiều hồ sơ".<br>- Hiển thị tổng số Phiếu đăng ký trong lần trình ký. Số hồ sơ trình ký/lần không vượt quá giới hạn cấu hình, mặc định tối đa 20 hồ sơ/lần. |
| Danh sách hồ sơ trình ký | Text(4000) | Có | Theo hồ sơ được chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Chỉ hiển thị khi Chế độ trình ký là "Trình ký nhiều hồ sơ".<br>- Trạng thái có dữ liệu: Hiển thị danh sách các hồ sơ được chọn gồm các cột: STT, Mã hồ sơ/Số đăng ký, Loại đăng ký, Loại hình giao dịch, Người yêu cầu, Trạng thái hồ sơ, File PDF dự thảo, Kết quả kiểm tra.<br>- Trạng thái không có dữ liệu (Empty State): Khi không có dữ liệu, hiển thị 01 dòng căn giữa bảng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| File PDF dự thảo | File | Có | Theo hệ thống sinh | Control UI: Link "Xem file", chỉ đọc.<br>- Là bản nháp Văn bản chứng nhận/Thông báo kết quả (sinh theo Mẫu số 05d) để Cán bộ xem trước trước khi gửi Lãnh đạo ký.<br>- Khi Chế độ trình ký là "Trình ký một hồ sơ": hiển thị 01 file PDF dự thảo ngay dưới Thông tin hồ sơ trình ký.<br>- Khi Chế độ trình ký là "Trình ký nhiều hồ sơ": hiển thị link xem file PDF dự thảo tại từng dòng trong Bảng danh sách hồ sơ trình ký.<br>- Cho phép click "Xem file" để mở từng file PDF dự thảo sang tab riêng. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | Control UI: Combobox có ô tìm kiếm.<br>- Bắt buộc chọn trước khi xác nhận trình ký.<br>- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>- Cho phép tìm kiếm gần đúng theo tên Lãnh đạo, chức danh hoặc đơn vị.<br>- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký hồ sơ Phiếu đăng ký được chọn.<br>- Với trình ký nhiều hồ sơ, danh sách Lãnh đạo ký chỉ hiển thị người có thẩm quyền ký tất cả hồ sơ trong danh sách đã chọn. |
| Người trình ký | String(255) | Có | Lấy theo tài khoản đăng nhập | Control UI: Label, chỉ đọc.<br>- Tên Cán bộ thực hiện trình ký. |
| Thời điểm trình ký | Datetime | Không | Thời điểm hệ thống | Control UI: Label, chỉ đọc.<br>- Ghi nhận thời điểm Cán bộ xác nhận trình ký thành công. |

##### 4.3.2.3.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình trước đó. |
| 2 | Xác nhận trình ký | Nút | - **TH Hồ sơ không ở trạng thái cho phép trình ký**: Nếu hồ sơ không ở trạng thái "Chờ duyệt", "Chờ giải quyết" hoặc "Duyệt chờ ký", vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không trình ký.<br>- **TH Chưa chọn Lãnh đạo ký hoặc Lãnh đạo ký không còn hiệu lực/thẩm quyền**: Vi phạm [BR-VAL-001], tô viền đỏ trường chọn, hiển thị cảnh báo đỏ "Đây là trường bắt buộc" ngay phía dưới ô chọn, focus con trỏ và không trình ký.<br>- **TH Không có file PDF dự thảo hợp lệ**: Hệ thống hiển thị thông báo lỗi [MSG-ERR-SYS-001]; không chuyển trạng thái hồ sơ và ghi nhận lỗi vào Audit log.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>1. Khóa phiên bản dữ liệu hồ sơ và phiên bản file PDF dự thảo được trình ký.<br>2. Ghi nhận Cán bộ trình ký, thời điểm trình ký, danh sách hồ sơ trình ký, Lãnh đạo ký đã chọn, trạng thái trước/sau.<br>3. Chuyển hồ sơ sang trạng thái "Chờ ký".<br>4. Chuyển hồ sơ vào danh sách ký duyệt của đúng Lãnh đạo ký đã chọn.<br>5. Ghi lịch sử xử lý và Audit log.<br>6. Hiển thị [MSG-SUC-DK-KT-002]; đóng popup và tự động làm mới danh sách. |
| 3 | Xem file | Link / Nút | Hệ thống mở file PDF dự thảo Văn bản chứng nhận (Mẫu số 05d) sang tab trình duyệt mới để Cán bộ kiểm tra nội dung trước khi xác nhận trình ký. |

---

#### 4.3.2.3.6. Quy tắc sinh file PDF dự thảo Văn bản chứng nhận theo Mẫu số 05d

##### 4.3.2.3.6.1. Nguyên tắc sinh file

- Thời điểm sinh file PDF dự thảo: ngay sau khi Cán bộ bấm "Trình ký" và hệ thống kiểm tra Phiếu đăng ký đủ điều kiện trình ký.
- File PDF dự thảo phải được sinh trước khi mở [MH04 - Popup Trình ký Phiếu đăng ký](#mh04) để Cán bộ xem/đối chiếu file trước khi xác nhận trình ký.
- Việc sinh file PDF dự thảo chưa làm thay đổi trạng thái hồ sơ. Hồ sơ chỉ chuyển sang "Chờ ký" sau khi Cán bộ xác nhận trình ký thành công tại Popup Trình ký.
- Với trình ký nhiều hồ sơ, hệ thống kiểm tra giới hạn số lượng hồ sơ trình ký/lần trước khi sinh PDF dự thảo. Giới hạn lấy theo tham số cấu hình, mặc định tối đa 20 hồ sơ/lần.
- File PDF dự thảo được sinh theo đúng **Mẫu số 05d - Văn bản chứng nhận đăng ký biện pháp bảo đảm, thông báo xử lý tài sản bảo đảm** tại [phu-luc-nghi-dinh-99-2022-nd-cp.md](../../../Tai%20lieu%20he%20thong/Bieu%20mau/phu-luc-nghi-dinh-99-2022-nd-cp.md).
- File PDF dự thảo gồm:
  + Lá mặt/trang ký theo Mẫu số 05d.
  + Phần chi tiết đăng ký/hồ sơ đính kèm phía sau trong cùng một file PDF.
- Phần chi tiết đăng ký/hồ sơ phía sau hiển thị theo cùng nguyên tắc với phụ lục chi tiết trong file kết quả cung cấp thông tin tại **4.3.2.2.7.4. Mapping dữ liệu chi tiết hồ sơ kết quả tra cứu** của tài liệu [SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md): nằm sau lá mặt/trang ký, đánh số trang liên tục, không tách thành file riêng và được ký số cùng một file PDF khi Lãnh đạo ký.
- Nếu trình ký nhiều hồ sơ, hệ thống sinh một file PDF dự thảo riêng cho từng hồ sơ; mỗi file có mã hồ sơ, số đăng ký, dữ liệu chi tiết và vùng ký tương ứng với hồ sơ đó.
- Nếu Cán bộ thực hiện lại thao tác "Trình ký" trước khi xác nhận trình ký thành công, hệ thống sinh lại phiên bản PDF dự thảo mới theo dữ liệu hiện hành của hồ sơ; phiên bản mới nhất trong popup là phiên bản được sử dụng để trình ký.
- Khi Cán bộ xác nhận trình ký thành công, hệ thống khóa đúng phiên bản file PDF dự thảo được trình ký. Cán bộ và Lãnh đạo không được chỉnh sửa hoặc thay thế file PDF đã trình ký trong cùng phiên xử lý.
- Khi Lãnh đạo ký số thành công, chữ ký số/dấu điện tử được gắn lên cùng file PDF đã trình ký; lá mặt Mẫu số 05d và toàn bộ phần chi tiết đăng ký/hồ sơ phía sau thuộc cùng một tài liệu được ký.

##### 4.3.2.3.6.2. Mapping dữ liệu lá mặt/trang ký Mẫu số 05d

| STT | Thành phần trên lá mặt/trang ký | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Mẫu số 05d | Cấu hình biểu mẫu | Hiển thị cố định ở góc trên bên phải: "Mẫu số 05d". |
| 2 | Mã hồ sơ TTHC | Hồ sơ Phiếu đăng ký/hệ thống một cửa nếu có tích hợp | Hiển thị mã hồ sơ thủ tục hành chính tương ứng với Phiếu đăng ký. Nếu hồ sơ chưa có mã hồ sơ TTHC từ hệ thống một cửa, hiển thị theo mã hồ sơ nội bộ hoặc mã định danh hồ sơ được cấu hình dùng cho tra cứu TTHC. |
| 3 | Tên cơ quan đăng ký bên trái | Cấu hình đơn vị xử lý hồ sơ | Hiển thị tên cơ quan cấp trên và tên Trung tâm đăng ký xử lý hồ sơ theo đúng mẫu, ví dụ: "CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC" và "TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI". |
| 4 | Quốc hiệu, tiêu ngữ | Cấu hình biểu mẫu | Hiển thị cố định: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" và "Độc lập - Tự do - Hạnh phúc". |
| 5 | Địa danh, ngày tháng năm lập văn bản | Cấu hình đơn vị xử lý hồ sơ và thời điểm sinh PDF dự thảo | Địa danh lấy theo đơn vị xử lý hồ sơ. Ngày tháng năm lấy theo ngày hệ thống sinh file PDF dự thảo tại thao tác "Trình ký". Định dạng theo mẫu: "[Địa danh], ngày [dd] tháng [mm] năm [yyyy]". |
| 6 | Tên văn bản | Loại hồ sơ/Loại hình giao dịch | Hiển thị in hoa, in đậm. Tiêu đề động theo loại hồ sơ:<br>+ Nếu Loại hình giao dịch là "Biện pháp bảo đảm": "VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM".<br>+ Nếu Loại hình giao dịch là "Hợp đồng": "VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM, HỢP ĐỒNG".<br>+ Nếu hồ sơ là Thông báo xử lý tài sản bảo đảm: "VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM". |
| 7 | Tên Trung tâm chứng nhận | Đơn vị xử lý hồ sơ | Hiển thị tên Trung tâm đăng ký giao dịch, tài sản xử lý hồ sơ, in hoa, in đậm theo mẫu, kết thúc bằng từ "CHỨNG NHẬN". |
| 8 | Mục 1 - Nội dung chứng nhận | Dữ liệu Phiếu đăng ký, số đăng ký và thời điểm có hiệu lực đăng ký | Hiển thị đoạn văn theo mẫu: "1. Nội dung đăng ký của phiếu yêu cầu đăng ký số [Số hồ sơ/Số đăng ký] đã được cập nhật vào Cơ sở dữ liệu về biện pháp bảo đảm; có hiệu lực đăng ký từ thời điểm [HH giờ mm phút, ngày dd tháng mm năm yyyy] và được Trung tâm Đăng ký giao dịch, tài sản gửi kèm theo Văn bản chứng nhận.". |
| 9 | Số đăng ký | Kết quả xử lý đăng ký | Mapping vào đoạn Mục 1 và phần chi tiết phía sau. Với hồ sơ đăng ký thay đổi/xóa đăng ký/thông báo xử lý tài sản, hiển thị số đăng ký/hồ sơ liên quan theo dữ liệu kết quả xử lý. |
| 10 | Thời điểm có hiệu lực đăng ký | Kết quả xử lý đăng ký | Mapping vào đoạn Mục 1. Định dạng theo mẫu: "[HH] giờ [mm] phút, ngày [dd] tháng [mm] năm [yyyy]". |
| 11 | Bên nhận bảo đảm / Bên nhận theo hợp đồng | Dữ liệu Bên nhận bảo đảm hoặc bên tương ứng theo Loại hình giao dịch | Tiêu đề dòng động theo Loại biện pháp/Hợp đồng. Cách xác định tiêu đề mapping theo đúng mô tả tại trường **IV. Bên nhận bảo đảm (Tiêu đề động)** của [UC024.MH01 - Màn hình nhập liệu Đăng ký mới BPBĐ](../../01_Website_Khach_hang/UC024_Dang_ky_moi_BPBD_Ver2.md). Hiển thị tên cá nhân/tổ chức đại diện theo dữ liệu hồ sơ. |
| 12 | Địa chỉ của Bên nhận bảo đảm / Bên nhận theo hợp đồng | Dữ liệu Bên nhận bảo đảm hoặc bên tương ứng theo Loại hình giao dịch | Hiển thị ngay dưới dòng Bên nhận bảo đảm/Bên nhận theo hợp đồng. Địa chỉ gộp theo định dạng: "[Địa chỉ chi tiết], [Phường/Xã], [Tỉnh/Thành phố], [Quốc gia]". |
| 13 | Bên bảo đảm / Bên theo nghĩa vụ | Dữ liệu Bên bảo đảm hoặc bên tương ứng theo Loại hình giao dịch | Tiêu đề dòng động theo Loại biện pháp/Hợp đồng. Cách xác định tiêu đề mapping theo đúng mô tả tại trường **III. Bên bảo đảm (Tiêu đề động)** của [UC024.MH01 - Màn hình nhập liệu Đăng ký mới BPBĐ](../../01_Website_Khach_hang/UC024_Dang_ky_moi_BPBD_Ver2.md). Hiển thị tên cá nhân/tổ chức đại diện theo dữ liệu hồ sơ. |
| 14 | Giấy tờ chứng minh tư cách pháp lý của Bên bảo đảm / Bên theo nghĩa vụ | Dữ liệu định danh của Bên bảo đảm hoặc bên tương ứng | Hiển thị đúng loại định danh và số định danh theo dữ liệu hồ sơ. Không hiển thị nhãn trung gian "Loại giấy tờ/Loại mã định danh". |
| 15 | Mã PIN | Mã PIN phát sinh sau khi đăng ký thành công | Hiển thị Mã PIN nếu hồ sơ được cấp Mã PIN. Giữ nguyên ghi chú theo mẫu: "(Người yêu cầu đăng ký hoàn toàn chịu trách nhiệm về việc bảo mật thông tin liên quan đến mã PIN do cơ quan đăng ký cấp)". |
| 16 | Mục 2 - Dòng kèm theo Văn bản chứng nhận | Cấu hình biểu mẫu và Nguồn tiếp nhận hồ sơ | Hiển thị theo mẫu 05d. Nếu Nguồn tiếp nhận là "Cán bộ nhập liệu"/hồ sơ giấy, ghi "Phiếu yêu cầu đăng ký kèm theo Văn bản chứng nhận này là một phần không thể tách rời của Văn bản chứng nhận.". Nếu Nguồn tiếp nhận là "Khách hàng"/trực tuyến, ghi "Chi tiết thông tin thể hiện trên giao diện đăng ký trực tuyến kèm theo Văn bản chứng nhận này là một phần không thể tách rời của Văn bản chứng nhận.". |
| 17 | Khối người có thẩm quyền | Lãnh đạo ký do Cán bộ chọn tại Popup Trình ký | Hiển thị tiêu đề "NGƯỜI CÓ THẨM QUYỀN CỦA TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN" hoặc chức danh được cấu hình theo đơn vị, ví dụ "GIÁM ĐỐC"; bên dưới hiển thị dòng hướng dẫn "(Ký, ghi rõ họ và tên, chức danh, đóng dấu)". File dự thảo chưa hiển thị chữ ký số/chữ ký ảnh chính thức. |
| 18 | QR code nếu hệ thống cấu hình hiển thị | Hệ thống quản lý văn bản/file PDF | QR được sinh khi hệ thống sinh file PDF dự thảo. Dữ liệu QR là URL tra cứu/xác thực văn bản điện tử do hệ thống cấu hình, gắn tối thiểu các tham số: mã hồ sơ, mã file, phiên bản file, mã kiểm tra bảo mật hoặc checksum/hash của file. Với file dự thảo, URL trả về trạng thái "Dự thảo/Chưa ký" hoặc chỉ cho phép kiểm tra metadata theo cấu hình. Sau khi Lãnh đạo ký số thành công, hệ thống cập nhật bản ghi xác thực để khi quét QR trả về trang xác thực văn bản đã ký, gồm: mã hồ sơ, số đăng ký, cơ quan ký, người ký, thời điểm ký, trạng thái chữ ký, hash file đã ký và đường dẫn xem/tải file PDF đã ký nếu người quét có quyền. |
| 19 | Vùng chữ ký số, dấu điện tử | Dịch vụ ký số và thông tin chứng thư số của Lãnh đạo | Trên file dự thảo, vùng ký là vùng chờ ký. Sau khi Lãnh đạo ký số, hệ thống gắn chữ ký số/dấu điện tử trên chính vùng ký của lá mặt/trang ký, đồng thời lưu metadata người ký, chứng thư số, thời điểm ký và phiên bản file đã ký. |

##### 4.3.2.3.6.3. Mapping dữ liệu phần chi tiết đăng ký/hồ sơ đính kèm

| STT | Thành phần trên file PDF | Nguồn dữ liệu hệ thống | Quy tắc mapping/xử lý |
| :--- | :--- | :--- | :--- |
| 1 | Tiêu đề phần chi tiết | Cấu hình biểu mẫu và dữ liệu hồ sơ | Hiển thị tiêu đề động theo loại hồ sơ, ví dụ:<br>+ "CHI TIẾT ĐĂNG KÝ"<br>+ "CHI TIẾT ĐĂNG KÝ THAY ĐỔI"<br>+ "CHI TIẾT XÓA ĐĂNG KÝ"<br>+ "CHI TIẾT THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM"<br>+ "CHI TIẾT THAY ĐỔI THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM"<br>+ "CHI TIẾT XÓA THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM" |
| 2 | Thông tin định danh hồ sơ | Hồ sơ Phiếu đăng ký và kết quả xử lý | Hiển thị các thông tin nhận diện chính của hồ sơ ở đầu phần chi tiết, tối thiểu gồm: Số đăng ký lần đầu/Số đăng ký liên quan, Thời điểm đăng ký, Loại hình giao dịch, Loại đăng ký và các thông tin hồ sơ gốc/hồ sơ liên quan nếu có. |
| 3 | Khối chi tiết đăng ký/hồ sơ | Dữ liệu Review nghiệp vụ tương ứng | Hiển thị thông tin chi tiết đăng ký/hồ sơ trong file PDF. Tham chiếu **III. KHUNG ĐỐI CHIẾU DỮ LIỆU CHI TIẾT** tại [UCPS003.MH01 - Màn hình Phiếu đăng ký - Xem chi tiết dành cho Khách hàng](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet) và mục **4.3.2.2.7.4. Mapping dữ liệu chi tiết hồ sơ kết quả tra cứu** tại [SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md). |
| 4 | Tiêu đề động của các khối bên liên quan | Loại hình giao dịch, Loại biện pháp/Hợp đồng | Tiêu đề khối Bên bảo đảm/Bên theo nghĩa vụ và Bên nhận bảo đảm/Bên nhận theo hợp đồng mapping theo đúng mô tả tại các trường **III. Bên bảo đảm (Tiêu đề động)** và **IV. Bên nhận bảo đảm (Tiêu đề động)** của [UC024.MH01 - Màn hình nhập liệu Đăng ký mới BPBĐ](../../01_Website_Khach_hang/UC024_Dang_ky_moi_BPBD_Ver2.md). Với thông báo xử lý tài sản, tiêu đề khối xử lý tài sản hiển thị theo từng nhóm Loại tài sản được xử lý. |
| 5 | Khối Tài sản bảo đảm / Tài sản xử lý | Dữ liệu tài sản của hồ sơ và danh mục [DM_07] | Hiển thị theo từng Loại tài sản, mỗi Loại tài sản là một khối riêng; dữ liệu thuộc loại nào nằm ngay dưới tiêu đề loại đó. Không gom toàn bộ tài sản thành một bảng chung. Bảng thông tin Số khung, Bảng thông tin Phương tiện và các trường mô tả theo từng loại tài sản phải dùng đúng cấu trúc/cột đã mô tả tại UCPS003 và các màn Review được UCPS003 tham chiếu. |
| 6 | Dấu phân tách giữa các hồ sơ / phiên bản | Trình sinh PDF | Khi file cần hiển thị nhiều hồ sơ/phiên bản liên quan, hết mỗi hồ sơ/phiên bản phải có dấu phân tách rõ ràng trước khi hiển thị hồ sơ/phiên bản tiếp theo, giống nguyên tắc hiển thị phần chi tiết hồ sơ trong kết quả cung cấp thông tin. |
| 7 | Liên kết với lá mặt / trang ký | File PDF Văn bản chứng nhận | Phần chi tiết đăng ký/hồ sơ nằm sau lá mặt/trang ký trong cùng một file PDF; không tách thành file riêng. Đánh số trang liên tục cho toàn bộ file PDF. |

---

#### 4.3.2.3.7. Quy tắc hiển thị và xử lý trạng thái Phiếu đăng ký

| STT | Trạng thái hồ sơ | Màn/Danh sách hiển thị | Quyền thao tác của Cán bộ | Trạng thái sau xử lý |
| :--- | :--- | :--- | :--- | :--- |
| 1 | "Chờ duyệt" | Hồ sơ chờ duyệt/chờ giải quyết > Phiếu đăng ký | - Xem chi tiết bằng Row click.<br>- Duyệt.<br>- Trình ký.<br>- Từ chối.<br>- Cập nhật nếu Nguồn tiếp nhận là "Cán bộ nhập liệu"; không cho cập nhật hồ sơ nguồn "Khách hàng" theo [BR-DK-030]. | - "Duyệt chờ ký" khi Duyệt.<br>- "Chờ ký" khi Trình ký.<br>- "Chờ ký" khi sinh văn bản từ chối để trình Lãnh đạo ký.<br>- Giữ nguyên "Chờ duyệt" nếu chỉ xem hoặc hủy thao tác. |
| 1a | "Chờ giải quyết" | Hồ sơ chờ duyệt/chờ giải quyết > Phiếu đăng ký | - Xem chi tiết bằng Row click.<br>- Duyệt.<br>- Trình ký.<br>- Từ chối.<br>- Cập nhật nếu hồ sơ cần hoàn thiện thông tin nhập liệu. | - "Duyệt chờ ký" khi Duyệt.<br>- "Chờ ký" khi Trình ký.<br>- "Chờ ký" khi sinh văn bản từ chối để trình Lãnh đạo ký.<br>- Giữ nguyên "Chờ giải quyết" nếu chỉ xem hoặc hủy thao tác. |
| 2 | "Duyệt chờ ký" | Hồ sơ duyệt chờ ký > Phiếu đăng ký | - Xem chi tiết bằng Row click.<br>- Trình ký.<br>- Hủy duyệt.<br>- Từ chối. | - "Chờ ký" khi Trình ký.<br>- "Chờ duyệt" khi Hủy duyệt.<br>- "Chờ ký" khi sinh văn bản từ chối để trình Lãnh đạo ký. |
| 3 | "Bị trả lại" | Hồ sơ bị trả lại > Phiếu đăng ký | - Xem chi tiết bằng Row click.<br>- Cập nhật thông tin theo ý kiến trả lại.<br>- Từ chối nếu hồ sơ không đủ điều kiện tiếp tục xử lý. | - Theo form cập nhật tương ứng loại hồ sơ sau khi Cán bộ hoàn tất cập nhật/trình lại.<br>- "Chờ ký" khi sinh văn bản từ chối để trình Lãnh đạo ký. |
| 4 | "Chờ ký" | Hồ sơ đang chờ ký > Phiếu đăng ký | Chỉ xem thông tin, lịch sử và file dự thảo theo thẩm quyền. | Không thay đổi tại màn của Cán bộ. |
| 5 | "Hoàn thành" | Hồ sơ đã xử lý > Phiếu đăng ký | Chỉ xem thông tin, lịch sử và file đã ký theo thẩm quyền. | Không thay đổi tại màn của Cán bộ. |
| 6 | "Bị từ chối" | Hồ sơ đã xử lý > Phiếu đăng ký | Chỉ xem thông tin, lịch sử, lý do từ chối và văn bản từ chối đã ký theo thẩm quyền. | Không thay đổi tại màn của Cán bộ. |

---

#### 4.3.2.3.8. Ghi log và liên kết nghiệp vụ

| STT | Nội dung | Mô tả |
| :--- | :--- | :--- |
| 1 | Ghi lịch sử xử lý hồ sơ | Mọi thao tác xem chi tiết, duyệt, hủy duyệt, trình ký, từ chối, cập nhật hồ sơ bị trả lại và chuyển trạng thái phải ghi vào lịch sử xử lý của hồ sơ. |
| 2 | Ghi Audit log hệ thống | Log tối thiểu gồm: Mã hồ sơ, người thao tác, vai trò, đơn vị, thời điểm, hành động, trạng thái trước, trạng thái sau, dữ liệu đầu vào chính, danh sách hồ sơ nếu thao tác lô và kết quả xử lý/lỗi nếu có. |
| 3 | Đồng bộ trạng thái sang Website Khách hàng / Mobile | Khi trạng thái hồ sơ thay đổi, hệ thống đồng bộ trạng thái và file kết quả tương ứng để Khách hàng theo dõi tại chức năng Quản lý yêu cầu đã đăng ký. |
| 4 | Kết nối ký của Lãnh đạo | Hồ sơ ở trạng thái "Chờ ký" được chuyển sang danh sách ký của Lãnh đạo theo phân quyền đơn vị; Cán bộ không thực hiện ký số tại màn hình này. |
| 5 | Nguy cơ nghiệp vụ cần kiểm soát | Đây là bước kiểm tra trọng yếu trước khi trình ký. Nếu Cán bộ bỏ qua cảnh báo trùng lặp, cảnh báo dữ liệu chủ thể/tài sản hoặc trình ký sai hồ sơ, có thể phát sinh khiếu nại/khiếu kiện hoặc trách nhiệm bồi thường nhà nước. |
