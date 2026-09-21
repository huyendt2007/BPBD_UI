### 4.3.3. Hỗ trợ tư liệu - Văn bản quy phạm pháp luật (VBQPPL)

#### 4.3.3.7. Quản lý thông tin tư liệu văn bản quy phạm pháp luật

##### 4.3.3.7.1. Mục đích

- Quản lý tập trung kho dữ liệu tư liệu văn bản quy phạm pháp luật, văn bản pháp quy phục vụ tra cứu, hướng dẫn áp dụng pháp luật trong công tác bồi thường nhà nước và công khai minh bạch hệ thống văn bản cho cá nhân, tổ chức.

- Kiểm soát toàn diện vòng đời số hóa văn bản: soạn thảo, lưu nháp, gửi phê duyệt, phê duyệt công khai, từ chối kèm lý do, chỉnh sửa và gỡ bỏ bản ghi theo đúng quy trình nghiệp vụ.

- Cho phép cán bộ nghiệp vụ thêm mới, chỉnh sửa, lưu nháp, gửi duyệt và xóa bản ghi tư liệu theo trạng thái xử lý cho phép.

- Cho phép cán bộ phê duyệt xem chi tiết, phê duyệt hoặc từ chối tư liệu ở trạng thái "Chờ duyệt".

*a. Phân quyền*

- Cán bộ nghiệp vụ: Quyền tra cứu/tìm kiếm, xem danh sách, lọc theo KPI, xem chi tiết, thêm mới bản ghi, chỉnh sửa bản ghi (khi ở trạng thái "Lưu nháp" hoặc "Từ chối"), xóa bản ghi (chỉ khi ở trạng thái "Lưu nháp"), gửi duyệt bản ghi (khi ở trạng thái "Lưu nháp" hoặc "Từ chối"), kết xuất Excel danh sách.

- Cán bộ phê duyệt / Lãnh đạo: Quyền tra cứu/tìm kiếm, xem danh sách, xem chi tiết bản ghi, phê duyệt bản ghi (khi ở trạng thái "Chờ duyệt" để chuyển sang "Đã duyệt"), từ chối phê duyệt (kèm lý do bắt buộc để chuyển sang "Từ chối"), kết xuất Excel danh sách.

*b. Điều kiện thực hiện*

- Người dùng đã đăng nhập thành công vào Website Quản trị.

- Người dùng được phân quyền truy cập chức năng `Quản lý thông tin tư liệu VBQPPL` thuộc phân hệ Hỗ trợ tư liệu.

- Nguồn giao diện: `UI_Mockups_Git_BPBD_UI/Website_Quan_tri/quan_ly_tu_lieu_vbqppl.html`.

- Dữ liệu tham chiếu:
  + Danh mục Loại văn bản quy phạm pháp luật [DM_21].
  + Danh mục Trạng thái nội dung [DM_35].

---

##### 4.3.3.7.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    A[Danh sách tư liệu VBQPPL] --> B[Tìm kiếm / Xóa bộ lọc / Lọc KPI / Sắp xếp / Phân trang]
    A --> C[Thêm mới tư liệu]
    C --> D[Lưu nháp]
    C --> E[Gửi duyệt]
    E --> F["Chờ duyệt"]
    A --> G[Xem chi tiết]
    A --> H[Chỉnh sửa tư liệu]
    H --> D
    H --> E
    A --> I[Xóa bản ghi lưu nháp]
    F --> J[Phê duyệt]
    F --> K[Từ chối]
    J --> L["Đã duyệt"]
    K --> M["Từ chối"]
```

---

##### 4.3.3.7.3. MH01 - Màn hình Danh sách thông tin tư liệu VBQPPL

###### 4.3.3.7.3.1. Màn hình

Nguồn UI: `UI_Mockups_Git_BPBD_UI/Website_Quan_tri/quan_ly_tu_lieu_vbqppl.html`.

###### 4.3.3.7.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa | String(255) | Không | Trống | Control UI: Text input.<br>- Tìm kiếm theo tên văn bản hoặc số hiệu văn bản (placeholder: "Tên văn bản hoặc số hiệu..."). |
| Loại văn bản | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại văn bản quy phạm pháp luật [DM_21].<br>Gồm:<br>+ Tất cả<br>+ Luật<br>+ Nghị định<br>+ Thông tư<br>+ Nghị quyết<br>+ Quyết định<br>+ Thông tư liên tịch |
| Cơ quan ban hành | String(255) | Không | Trống | Control UI: Text input.<br>- Tìm kiếm theo tên cơ quan ban hành văn bản (placeholder: "Ví dụ: Chính phủ, Bộ Tư pháp..."). |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>- Tham chiếu Danh mục Trạng thái nội dung [DM_35].<br>Gồm:<br>+ Tất cả<br>+ Lưu nháp<br>+ Chờ duyệt<br>+ Đã duyệt<br>+ Từ chối |
| Từ ngày ban hành | Date | Không | Ngày đầu tháng hiện tại | Control UI: Date input.<br>- Nhập điều kiện lọc ngày ban hành bắt đầu, định dạng `dd/mm/yyyy` (placeholder: "dd/mm/yyyy"). |
| Đến ngày ban hành | Date | Không | Ngày hiện tại | Control UI: Date input.<br>- Nhập điều kiện lọc ngày ban hành kết thúc, định dạng `dd/mm/yyyy` (placeholder: "dd/mm/yyyy"). |
| **II. Thống kê nhanh** | | | | |
| Tất cả | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị tổng số bản ghi đang không bị xóa mềm.<br>- Nhấp chọn để lọc nhanh danh sách toàn bộ tư liệu văn bản. |
| Chờ duyệt | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị số bản ghi ở trạng thái "Chờ duyệt".<br>- Nhấp chọn để lọc nhanh danh sách tư liệu đang chờ phê duyệt. |
| Từ chối | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị số bản ghi ở trạng thái "Từ chối".<br>- Nhấp chọn để lọc nhanh danh sách tư liệu bị từ chối phê duyệt. |
| **III. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Ngày ban hành" giảm dần (mới nhất hiển thị lên đầu).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Theo trang hiện tại | - Chỉ đọc.<br>- Hiển thị số thứ tự dòng dữ liệu theo phân trang. |
| Tên văn bản | String(500) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị tên văn bản tư liệu dưới dạng liên kết mở **MH02 - Màn hình Chi tiết thông tin tư liệu VBQPPL**. |
| Số hiệu | String(100) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị số hiệu văn bản pháp quy. |
| Loại văn bản | Enum(String(50)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Tham chiếu Danh mục Loại văn bản quy phạm pháp luật [DM_21].<br>Gồm:<br>+ Luật<br>+ Nghị định<br>+ Thông tư<br>+ Nghị quyết<br>+ Quyết định<br>+ Thông tư liên tịch |
| Cơ quan ban hành | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị tên cơ quan ban hành văn bản. |
| Ngày ban hành | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Định dạng `dd/mm/yyyy`. |
| Ngày có hiệu lực | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Định dạng `dd/mm/yyyy` (hoặc hiển thị "—" nếu chưa có ngày hiệu lực). |
| Trạng thái | Enum(String(50)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị trạng thái phê duyệt theo Danh mục Trạng thái nội dung [DM_35] dưới dạng badge màu.<br>Gồm:<br>+ Lưu nháp<br>+ Chờ duyệt<br>+ Đã duyệt<br>+ Từ chối |
| Thao tác | String(255) | Không | Theo quyền/trạng thái | - Chỉ đọc.<br>- Luôn hiển thị đầy đủ số slot nút thao tác cố định theo vai trò (Fixed-Slot Action Column):<br>+ Vai trò Cán bộ nghiệp vụ (3 nút thao tác): Chỉnh sửa, Xóa, Gửi phê duyệt.<br>+ Vai trò Cán bộ phê duyệt (2 nút thao tác): Phê duyệt, Từ chối.<br>- Các nút chưa đủ điều kiện hiển thị mờ ẩn (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`) kèm tooltip giải thích lý do không khả dụng. |
| Số dòng hiển thị | Enum(String(10)) | Không | `20` | Control UI: Dropdown.<br>- Cho phép chọn số bản ghi hiển thị trên mỗi trang.<br>Gồm:<br>+ `10`<br>+ `20`<br>+ `50`<br>+ `100` |
| Thông tin phân trang | String(255) | Không | 20 bản ghi/trang | Control UI: Pagination.<br>- Hiển thị dải bản ghi: "Hiển thị từ [từ] đến [đến] trong tổng số [tổng số] bản ghi".<br>- Đầy đủ các nút điều hướng trang: Đầu (&#124;&lt;&lt;), Trước (&lt;), các số trang, Sau (&gt;), Cuối (&gt;&gt;&#124;). |
| Nút điều hướng trang | String(50) | Không | Theo số trang | Control UI: Pagination buttons.<br>- Gồm các nút:<br>+ Trang đầu (&#124;&lt;&lt;)<br>+ Trang trước (&lt;)<br>+ Số trang cụ thể<br>+ Trang sau (&gt;)<br>+ Trang cuối (&gt;&gt;&#124;) |

###### 4.3.3.7.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới: |
| | | | **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày ban hành` lớn hơn `Đến ngày ban hành`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
| | | | **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn, hiển thị kết quả lên bảng và đưa về Trang 1. |
| | | | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái khóa mờ (Disabled); nút "Kết xuất Excel" ở trạng thái khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa toàn bộ tiêu chí tìm kiếm đã nhập/chọn, thiết lập các ô lọc về giá trị mặc định (`Từ khóa` và `Cơ quan ban hành` để trống, `Loại văn bản` và `Trạng thái` về "Tất cả", khoảng ngày về mặc định), đưa trang hiện tại về Trang 1 và tải lại danh sách tư liệu VBQPPL. |
| 3 | Lọc theo KPI | Button | Hệ thống lọc nhanh danh sách tư liệu theo thẻ KPI được chọn: `Tất cả`, `Chờ duyệt`, `Từ chối`; đồng thời cập nhật trạng thái kích hoạt (active) của khối KPI tương ứng và đưa danh sách về Trang 1. |
| | | | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa (`colspan`), in nghiêng với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang bị khóa mờ; nút "Kết xuất Excel" bị khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 4 | Thêm mới | Button | Hệ thống mở **MH03 - Màn hình Thêm mới/Chỉnh sửa thông tin tư liệu VBQPPL** ở chế độ Thêm mới với form thông tin để trống. |
| 5 | Kết xuất Excel | Button | **TH1 - Danh sách rỗng**: Vi phạm [BR-EXP-040]. Nút bị khóa mờ hoặc hiển thị cảnh báo [MSG-WRN-SYS-001] và không tải file. |
| | | | **TH Hợp lệ**: Hệ thống kết xuất toàn bộ danh sách tư liệu văn bản thỏa mãn tiêu chí lọc/sắp xếp hiện tại ra file Excel theo mẫu quy chuẩn, áp dụng [BR-EXP-040] và hiển thị thông báo thành công [MSG-SUC-BTNN-HTTL-003]. |
| 6 | Sắp xếp cột | Header cột | Áp dụng trên các cột: `Tên văn bản`, `Số hiệu`, `Loại văn bản`, `Cơ quan ban hành`, `Ngày ban hành`, `Ngày có hiệu lực`. |
| | | | **TH1 - Chọn lại cột đang sắp xếp**: Hệ thống đảo chiều sắp xếp tăng dần / giảm dần và cập nhật icon mũi tên trạng thái trên tiêu đề cột. |
| | | | **TH2 - Chọn cột khác**: Hệ thống thiết lập cột được chọn làm tiêu chí sắp xếp hiện hành và cập nhật lại thứ tự bản ghi trên bảng. |
| 7 | Xem chi tiết | Link / Row click | Khi người dùng click vào tên văn bản (dạng liên kết) hoặc click vào bất kỳ vị trí nào trên dòng dữ liệu (trừ các nút thao tác), hệ thống mở **MH02 - Màn hình Chi tiết thông tin tư liệu VBQPPL** ở chế độ chỉ xem. |
| 8 | Chỉnh sửa | Icon button | Thao tác dành cho vai trò Cán bộ nghiệp vụ. |
| | | | **TH1 - Bản ghi không ở trạng thái được chỉnh sửa**: Nếu bản ghi không ở trạng thái "Lưu nháp" hoặc "Từ chối", icon hiển thị mờ ẩn (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`) kèm tooltip *"Chỉ chỉnh sửa khi ở trạng thái Lưu nháp hoặc Từ chối"*. |
| | | | **TH Hợp lệ**: Hệ thống mở **MH03 - Màn hình Thêm mới/Chỉnh sửa thông tin tư liệu VBQPPL** ở chế độ Chỉnh sửa với toàn bộ dữ liệu hiện tại của văn bản được điền sẵn vào các trường. |
| 9 | Xóa tài liệu | Icon button | Thao tác dành cho vai trò Cán bộ nghiệp vụ. |
| | | | **TH1 - Bản ghi không ở trạng thái "Lưu nháp"**: Icon hiển thị mờ ẩn (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`) kèm tooltip *"Chỉ được xóa hồ sơ ở trạng thái Lưu nháp"*. |
| | | | **TH Hợp lệ**: Hệ thống hiển thị Popup Modal xác nhận xóa tùy chỉnh (Custom Confirmation Modal) [MSG-CFM-SYS-001] ("Bạn có chắc chắn muốn xóa thông tin tư liệu này không?"). Khi người dùng xác nhận "Đồng ý", hệ thống thực hiện xóa mềm bản ghi, ẩn khỏi bảng dữ liệu, cập nhật lại chỉ số KPI và hiển thị thông báo thành công [MSG-SUC-BTNN-HTTL-008]. |
| 10 | Gửi phê duyệt | Icon button | Thao tác dành cho vai trò Cán bộ nghiệp vụ. |
| | | | **TH1 - Bản ghi không ở trạng thái được gửi duyệt**: Nếu bản ghi không ở trạng thái "Lưu nháp" hoặc "Từ chối", icon hiển thị mờ ẩn (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`) kèm tooltip *"Chỉ được gửi phê duyệt hồ sơ Lưu nháp hoặc Từ chối"*. |
| | | | **TH Hợp lệ**: Hệ thống cập nhật trạng thái bản ghi sang "Chờ duyệt", ghi nhận thời điểm gửi duyệt, cập nhật lại bảng danh sách và chỉ số KPI, hiển thị thông báo thành công [MSG-SUC-BTNN-HTTL-005]. |
| 11 | Phê duyệt | Icon button | Thao tác dành cho vai trò Cán bộ phê duyệt. |
| | | | **TH1 - Bản ghi không ở trạng thái "Chờ duyệt"**: Icon hiển thị mờ ẩn (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`) kèm tooltip *"Chỉ phê duyệt hồ sơ ở trạng thái Chờ duyệt"*. |
| | | | **TH Hợp lệ**: Hệ thống mở **MH02 - Màn hình Chi tiết thông tin tư liệu VBQPPL**, cuộn đến khối phê duyệt và cho phép thực hiện phê duyệt bản ghi. |
| 12 | Từ chối | Icon button | Thao tác dành cho vai trò Cán bộ phê duyệt. |
| | | | **TH1 - Bản ghi không ở trạng thái "Chờ duyệt"**: Icon hiển thị mờ ẩn (`opacity: 0.35; pointer-events: none; cursor: not-allowed;`) kèm tooltip *"Chỉ từ chối hồ sơ ở trạng thái Chờ duyệt"*. |
| | | | **TH Hợp lệ**: Hệ thống mở **MH02 - Màn hình Chi tiết thông tin tư liệu VBQPPL**, cuộn đến khối phê duyệt, tự động focus vào ô nhập "Lý do từ chối". |
| 13 | Số dòng hiển thị | Select | Khi người dùng chọn `10`, `20`, `50` hoặc `100`, hệ thống cập nhật số bản ghi hiển thị trên mỗi trang, đưa trang hiện tại về Trang 1 và tải lại lưới dữ liệu; mặc định chọn sẵn `20`. |
| 14 | Chuyển trang | Pagination | Hệ thống chuyển đến trang đầu (&#124;&lt;&lt;), trang trước (&lt;), trang được chọn, trang sau (&gt;) hoặc trang cuối (&gt;&gt;&#124;) theo thao tác người dùng; dữ liệu hiển thị giữ nguyên tiêu chí lọc/sắp xếp hiện hành và cấu hình số dòng trên trang. |

---

##### 4.3.3.7.4. MH02 - Màn hình Chi tiết thông tin tư liệu VBQPPL

###### 4.3.3.7.4.1. Màn hình

Nguồn UI: modal `#docModal` với tiêu đề `Chi tiết thông tin tư liệu văn bản quy phạm pháp luật`.

###### 4.3.3.7.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin văn bản tư liệu** | | | | |
| Tên văn bản | String(500) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị tên văn bản tư liệu đầy đủ. |
| Số hiệu văn bản | String(100) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị số hiệu văn bản pháp quy. |
| Loại văn bản | Enum(String(50)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Tham chiếu Danh mục Loại văn bản quy phạm pháp luật [DM_21].<br>Gồm:<br>+ Luật<br>+ Nghị định<br>+ Thông tư<br>+ Nghị quyết<br>+ Quyết định<br>+ Thông tư liên tịch |
| Cơ quan ban hành | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị tên cơ quan ban hành văn bản. |
| Ngày ban hành | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Định dạng `dd/mm/yyyy`. |
| Ngày có hiệu lực | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Định dạng `dd/mm/yyyy` (hoặc hiển thị "—" nếu chưa có). |
| Tags / Từ khóa | String(500) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị các từ khóa phân tách bằng dấu phẩy. |
| Người ký | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị họ tên người ký ban hành văn bản. |
| Chức danh | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị chức danh của người ký văn bản. |
| Tóm tắt nội dung | Text(2000) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị tóm tắt nội dung chính của văn bản. |
| **II. Tài liệu đính kèm** | | | | |
| File dữ liệu văn bản | File | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị danh sách file văn bản đã đính kèm (PDF, DOCX).<br>- Kèm theo liên kết "Xem file" (mở xem tại tab mới). |
| File media đính kèm | File | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị danh sách file media đã đính kèm (MP4, MP3, JPG, PNG).<br>- Kèm theo liên kết "Xem file" (mở xem tại tab mới). |
| **III. Cán bộ phê duyệt hồ sơ** | | | | *(Khối này chỉ hiển thị khi tài khoản có vai trò Cán bộ phê duyệt hoặc khi xem bản ghi ở trạng thái "Từ chối" / "Đã duyệt")* |
| Người tạo / gửi duyệt | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị họ tên cán bộ đã tạo và gửi phê duyệt văn bản. |
| Ngày gửi duyệt | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị ngày gửi phê duyệt, định dạng `dd/mm/yyyy`. |
| Lý do từ chối | Text(1000) | Có (khi Từ chối) | Trống | - Hiển thị ô nhập lý do khi Cán bộ phê duyệt thực hiện từ chối.<br>- Bắt buộc nhập nếu nhấn nút "Từ chối".<br>- Khi xem lại bản ghi đã bị từ chối, trường ở chế độ chỉ đọc hiển thị lý do từ chối đã lưu. |

###### 4.3.3.7.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Button | Chức năng chỉ hiển thị đối với vai trò Cán bộ phê duyệt khi xem bản ghi ở trạng thái "Chờ duyệt".<br>- Khi click nút, hệ thống cập nhật trạng thái bản ghi sang "Đã duyệt", ghi nhận thông tin người duyệt và ngày phê duyệt, đóng popup modal, làm mới danh sách bản ghi và chỉ số KPI, hiển thị thông báo thành công [MSG-SUC-BTNN-HTTL-006]. |
| 2 | Từ chối | Button | Chức năng chỉ hiển thị đối với vai trò Cán bộ phê duyệt khi xem bản ghi ở trạng thái "Chờ duyệt". |
| | | | **TH1 - Bỏ trống lý do từ chối**: Vi phạm [BR-VAL-001]. Hệ thống highlight viền đỏ `.is-invalid` ô nhập "Lý do từ chối", hiển thị dòng cảnh báo "Đây là trường bắt buộc" ngay phía dưới và tự động focus con trỏ vào ô nhập lỗi (tuyệt đối không dùng toast). |
| | | | **TH Hợp lệ**: Hệ thống lưu lý do từ chối, cập nhật trạng thái bản ghi sang "Từ chối", ghi nhận thông tin người duyệt và ngày từ chối, đóng popup modal, làm mới danh sách bản ghi và chỉ số KPI, hiển thị thông báo thành công [MSG-SUC-BTNN-HTTL-007]. |
| 3 | Xem file | Link | Khi click vào liên kết "Xem file" cạnh tên tệp tin đính kèm, hệ thống mở nội dung file tại một tab trình duyệt mới. |
| 4 | Hủy | Button | Hệ thống đóng popup modal và quay lại màn hình danh sách tư liệu **MH01**. |
| 5 | Đóng | Icon button | Click vào icon `fa-xmark` ở góc phải tiêu đề modal, hệ thống đóng popup modal và quay lại màn hình danh sách tư liệu **MH01**. |

---

##### 4.3.3.7.5. MH03 - Màn hình Thêm mới/Chỉnh sửa thông tin tư liệu VBQPPL

###### 4.3.3.7.5.1. Màn hình

Nguồn UI: modal `#docModal` với tiêu đề `Thêm mới thông tin tư liệu văn bản quy phạm pháp luật` hoặc `Chỉnh sửa thông tin tư liệu văn bản quy phạm pháp luật`.

###### 4.3.3.7.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin văn bản tư liệu** | | | | |
| Tên văn bản | String(500) | Có | Trống | Control UI: Text input.<br>- Nhập tên văn bản tư liệu đầy đủ. |
| Số hiệu văn bản | String(100) | Có | Trống | Control UI: Text input.<br>- Nhập số hiệu văn bản pháp quy. |
| Loại văn bản | Enum(String(50)) | Có | Trống | Control UI: Combobox.<br>- Tham chiếu Danh mục Loại văn bản quy phạm pháp luật [DM_21].<br>Gồm:<br>+ Luật<br>+ Nghị định<br>+ Thông tư<br>+ Nghị quyết<br>+ Quyết định<br>+ Thông tư liên tịch |
| Cơ quan ban hành | String(255) | Có | Trống | Control UI: Text input.<br>- Nhập tên cơ quan ban hành văn bản. |
| Ngày ban hành | Date | Có | Trống | Control UI: Date input.<br>- Nhập hoặc chọn ngày ban hành văn bản, định dạng `dd/mm/yyyy`.<br>- Ngày ban hành phải nhỏ hơn hoặc bằng ngày hiện tại theo [BR-VAL-008]. |
| Ngày có hiệu lực | Date | Không | Trống | Control UI: Date input.<br>- Nhập hoặc chọn ngày có hiệu lực của văn bản, định dạng `dd/mm/yyyy`.<br>- Nếu nhập, ngày có hiệu lực phải lớn hơn hoặc bằng ngày ban hành theo [BR-VAL-007]. |
| Tags / Từ khóa | String(500) | Không | Trống | Control UI: Text input.<br>- Nhập tối đa 10 tags, phân tách bằng dấu phẩy (placeholder: "Tối đa 10 tags, phân tách bằng dấu phẩy..."). |
| Người ký | String(255) | Có | Trống | Control UI: Text input.<br>- Nhập họ tên người ký ban hành văn bản (placeholder: "Ví dụ: Phạm Minh Chính"). |
| Chức danh | String(255) | Có | Trống | Control UI: Text input.<br>- Nhập chức danh của người ký (placeholder: "Ví dụ: Thủ tướng"). |
| Tóm tắt nội dung | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Nhập tóm tắt nội dung chính của văn bản. |
| **II. Tài liệu đính kèm** | | | | |
| File dữ liệu văn bản | File | Có | Trống | Control UI: File Upload Area.<br>- Cho phép kéo thả hoặc click chọn nhiều file dữ liệu văn bản.<br>- Định dạng cho phép: PDF, DOCX.<br>- Dung lượng tối đa: 10MB/file, tối đa 10 file.<br>- Áp dụng [BR-BTNN-HTTL-001]. Bắt buộc đính kèm ít nhất 1 file dữ liệu văn bản.<br>- Sau khi tải lên thành công, hiển thị tên file kèm theo 2 liên kết:<br>+ Xem file (mở tab mới)<br>+ Xóa (xóa khỏi danh sách file trước khi lưu) |
| File media đính kèm | File | Không | Trống | Control UI: File Upload Area.<br>- Cho phép kéo thả hoặc click chọn nhiều file media.<br>- Định dạng cho phép: MP4, MP3, JPG, PNG.<br>- Dung lượng tối đa: 50MB/file, tối đa 5 file.<br>- Áp dụng [BR-BTNN-HTTL-002].<br>- Sau khi tải lên thành công, hiển thị tên file kèm theo 2 liên kết:<br>+ Xem file (mở tab mới)<br>+ Xóa (xóa khỏi danh sách file trước khi lưu) |

###### 4.3.3.7.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu nháp | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện lưu nháp theo các trường hợp bên dưới: |
| | | | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001] (chưa nhập `Tên văn bản`, `Số hiệu văn bản`, chưa chọn `Loại văn bản`, chưa nhập `Cơ quan ban hành`, `Ngày ban hành`, `Người ký`, `Chức danh` hoặc chưa đính kèm `File dữ liệu văn bản`). Hệ thống highlight viền đỏ `.is-invalid` ô trống đầu tiên, hiển thị dòng cảnh báo "Đây là trường bắt buộc" ngay phía dưới và tự động focus con trỏ vào ô đó (tuyệt đối không dùng toast). |
| | | | **TH2 - Dữ liệu không hợp lệ**: Kiểm tra và phát hiện lỗi:<br>+ `Ngày ban hành` lớn hơn ngày hiện tại: Vi phạm [BR-VAL-008], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-008] và không cho phép lưu.<br>+ `Ngày có hiệu lực` nhỏ hơn `Ngày ban hành`: Vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không cho phép lưu.<br>+ File dữ liệu văn bản vi phạm [BR-BTNN-HTTL-001] (sai định dạng, vượt dung lượng 10MB hoặc quá 10 file): Hệ thống hiển thị thông báo lỗi [MSG-ERR-BTNN-HTTL-001], [MSG-ERR-BTNN-HTTL-002] hoặc [MSG-ERR-BTNN-HTTL-003] tương ứng.<br>+ File media đính kèm vi phạm [BR-BTNN-HTTL-002] (sai định dạng, vượt dung lượng 50MB hoặc quá 5 file): Hệ thống hiển thị thông báo lỗi [MSG-ERR-BTNN-HTTL-004], [MSG-ERR-BTNN-HTTL-005] hoặc [MSG-ERR-BTNN-HTTL-006] tương ứng. |
| | | | **TH Hợp lệ**: Hệ thống lưu thông tin tư liệu ở trạng thái "Lưu nháp", đóng popup modal, làm mới danh sách bản ghi và chỉ số KPI, hiển thị thông báo thành công [MSG-SUC-BTNN-HTTL-004]. |
| 2 | Gửi duyệt | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện gửi duyệt theo các trường hợp bên dưới: |
| | | | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001]. Hệ thống highlight viền đỏ `.is-invalid` ô trống đầu tiên, hiển thị dòng cảnh báo "Đây là trường bắt buộc" ngay phía dưới và tự động focus con trỏ vào ô đó (tuyệt đối không dùng toast). |
| | | | **TH2 - Dữ liệu không hợp lệ**: Kiểm tra các điều kiện định dạng dữ liệu tương tự chức năng `Lưu nháp`. Nếu có lỗi, hiển thị mã MSG tương ứng và dừng xử lý. |
| | | | **TH Hợp lệ**: Hệ thống lưu thông tin tư liệu, chuyển trạng thái bản ghi sang "Chờ duyệt", ghi nhận thời điểm gửi duyệt, đóng popup modal, làm mới danh sách bản ghi và chỉ số KPI, hiển thị thông báo thành công [MSG-SUC-BTNN-HTTL-005]. |
| 3 | Xem file | Link | Cho phép xem trước file đính kèm tại một tab trình duyệt riêng biệt. |
| 4 | Xóa file | Link | Hệ thống hiển thị Popup Modal xác nhận tùy chỉnh. Khi người dùng xác nhận, loại bỏ file đã chọn khỏi danh sách tải lên trước khi lưu form. |
| 5 | Hủy | Button | Hệ thống đóng popup modal và quay lại màn hình danh sách **MH01**; mọi dữ liệu vừa nhập chưa lưu sẽ bị hủy bỏ. |
| 6 | Đóng | Icon button | Click vào icon `fa-xmark` ở góc phải tiêu đề modal, hệ thống đóng popup modal và quay lại màn hình danh sách **MH01**; mọi dữ liệu vừa nhập chưa lưu sẽ bị hủy bỏ. |
