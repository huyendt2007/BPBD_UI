### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.8. UC508-510 - Quản lý câu hỏi và trả lời thường gặp

##### 4.3.3.8.1. Mục đích

\- Cho phép cán bộ quản lý danh sách câu hỏi và nội dung trả lời thường gặp phục vụ hướng dẫn, hỗ trợ người dùng tra cứu nghiệp vụ.

\- Cho phép cán bộ nghiệp vụ thêm mới, chỉnh sửa, lưu nháp, gửi duyệt và xóa bản ghi câu hỏi thường gặp theo trạng thái xử lý.

\- Cho phép cán bộ phê duyệt xem chi tiết, phê duyệt hoặc từ chối câu hỏi thường gặp ở trạng thái "Chờ duyệt".

*a. Phân quyền*

\- Cán bộ nghiệp vụ: được tra cứu, xem chi tiết, thêm mới, chỉnh sửa bản ghi ở trạng thái "Lưu nháp" hoặc "Từ chối", xóa bản ghi ở trạng thái "Lưu nháp" và gửi duyệt bản ghi ở trạng thái "Lưu nháp" hoặc "Từ chối".

\- Cán bộ phê duyệt: được tra cứu, xem chi tiết, phê duyệt hoặc từ chối bản ghi ở trạng thái "Chờ duyệt".

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website quản trị.

\- Người dùng được phân quyền truy cập màn hình `Quản lý câu hỏi và trả lời thường gặp (FAQ)`.

\- Nguồn giao diện: `UI_Mockups/Website_Quan_tri/UC505_UC510/quan_ly_cau_hoi_faq.html`.

\- Nhóm chủ đề câu hỏi thường gặp Tham chiếu Danh mục Nhóm chủ đề câu hỏi thường gặp [DM_36].

\- Trạng thái phê duyệt FAQ Tham chiếu Danh mục Trạng thái nội dung [DM_35].

---

##### 4.3.3.8.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    A[Danh sách câu hỏi FAQ] --> B[Tìm kiếm / Xóa bộ lọc / Lọc KPI / Sắp xếp / Phân trang]
    A --> C[Thêm mới câu hỏi thường gặp]
    C --> D[Lưu nháp]
    C --> E[Gửi duyệt]
    E --> F["Chờ duyệt"]
    A --> G[Xem chi tiết]
    A --> H[Chỉnh sửa câu hỏi thường gặp]
    H --> D
    H --> E
    A --> I[Xóa bản ghi lưu nháp]
    F --> J[Phê duyệt]
    F --> K[Từ chối]
    J --> L["Đã duyệt"]
    K --> M["Từ chối"]
```

---

##### 4.3.3.8.3. MH01 - Màn hình Danh sách câu hỏi và trả lời thường gặp

###### 4.3.3.8.3.1. Màn hình

Nguồn UI: `UI_Mockups/Website_Quan_tri/UC505_UC510/quan_ly_cau_hoi_faq.html`.

###### 4.3.3.8.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa | String(255) | Không | Trống | Tìm kiếm theo nội dung câu hỏi hoặc nội dung câu trả lời. |
| Nhóm chủ đề | Enum(String(100)) | Không | Tất cả | - Tham chiếu Danh mục Nhóm chủ đề câu hỏi thường gặp [DM_36]. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | - Tham chiếu Danh mục Trạng thái nội dung [DM_35]. |
| Từ ngày tạo | Date | Không | Theo dữ liệu hệ thống | Nhập điều kiện lọc ngày tạo bắt đầu, định dạng `dd/mm/yyyy`. |
| Đến ngày tạo | Date | Không | Theo dữ liệu hệ thống | Nhập điều kiện lọc ngày tạo kết thúc, định dạng `dd/mm/yyyy`. |
| **II. Thống kê nhanh** | | | | |
| Tổng số câu hỏi | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị tổng số bản ghi đang không bị xóa mềm. |
| Số câu hỏi chờ duyệt | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị số bản ghi ở trạng thái "Chờ duyệt". |
| Số câu hỏi từ chối | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị số bản ghi ở trạng thái "Từ chối". |
| **III. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Ngày tạo" giảm dần (mới nhất hiển thị lên đầu).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* |
| Cột: STT | Integer(10) | Không | Theo trang hiện tại | - Chỉ đọc.<br>- Hiển thị số thứ tự dòng dữ liệu theo phân trang. |
| Cột: Câu hỏi | Text(1000) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị nội dung câu hỏi dưới dạng liên kết mở **MH02 - Chi tiết câu hỏi thường gặp**. |
| Cột: Nhóm chủ đề | Enum(String(100)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Tham chiếu Danh mục Nhóm chủ đề câu hỏi thường gặp [DM_36]. |
| Cột: Thứ tự hiển thị | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị số thứ tự ưu tiên khi công bố câu hỏi. |
| Cột: Ngày tạo | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Định dạng `dd/mm/yyyy`. |
| Cột: Trạng thái | Enum(String(50)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị trạng thái phê duyệt theo Danh mục Trạng thái nội dung [DM_35] dưới dạng badge màu. |
| Cột: Thao tác | String(255) | Không | Theo quyền/trạng thái | - Chỉ đọc.<br>- Hiển thị các icon thao tác phù hợp với quyền tài khoản và trạng thái bản ghi.<br>- Các icon chưa đủ điều kiện hiển thị dạng mờ và không cho thao tác. |
| Số dòng hiển thị | Enum(String(10)) | Không | `20` | Control UI: Dropdown.<br>- Cho phép chọn số bản ghi hiển thị trên mỗi trang.<br>- Giá trị gồm:<br>+ `10`<br>+ `20`<br>+ `50`<br>+ `100`. |
| Thông tin phân trang | String(255) | Không | 20 bản ghi/trang | Control UI: Pagination.<br>- Cho phép chọn cấu hình số lượng bản ghi hiển thị trên mỗi trang gồm: 10, 20, 50, 100 bản ghi/trang; mặc định chọn sẵn 20 bản ghi/trang.<br>- Đầy đủ các nút điều hướng trang: Đầu (&#124;&lt;&lt;), Trước (&lt;), các số trang, Sau (&gt;), Cuối (&gt;&gt;&#124;).<br>- Hiển thị dải bản ghi: "Hiển thị [từ] - [đến] của [tổng số] bản ghi". |
| Nút phân trang | String(50) | Không | Theo số trang | - Chỉ đọc.<br>- Gồm các nút:<br>+ Trang đầu<br>+ Trang trước<br>+ Số trang<br>+ Trang sau<br>+ Trang cuối |

###### 4.3.3.8.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn, hiển thị kết quả lên bảng và đưa về Trang 1. |
|  |  |  | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled); nút "Kết xuất Excel" (nếu có) ở trạng thái khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa toàn bộ tiêu chí tìm kiếm, đặt các bộ lọc về giá trị mặc định, đưa trang hiện tại về trang 1 và hiển thị [MSG-SUC-BTNN-FAQ-002]. |
| 3 | Lọc theo KPI | Button | Hệ thống lọc nhanh danh sách theo nhóm thống kê được chọn: `Tất cả`, `Chờ duyệt`, `Từ chối`; đồng thời cập nhật trạng thái chọn của khối KPI.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 4 | Thêm mới | Button | Hệ thống mở **MH03 - Thêm mới/Chỉnh sửa câu hỏi thường gặp** ở chế độ thêm mới. |
| 5 | Kết xuất Excel | Button | TH1 (Danh sách rỗng): Vi phạm [BR-EXP-040]. Hệ thống hiển thị [MSG-WRN-SYS-001] và không tải file. |
|  |  |  | TH Hợp lệ: Hệ thống kết xuất danh sách câu hỏi FAQ hiện hành ra file Excel theo tiêu chí lọc/sắp xếp hiện tại, áp dụng [BR-EXP-040] và hiển thị [MSG-SUC-BTNN-FAQ-003]. |
| 6 | Sắp xếp cột | Header cột | TH1 (Chọn lại cột đang sắp xếp): Hệ thống đảo chiều sắp xếp tăng/giảm và cập nhật icon sắp xếp trên tiêu đề cột. |
|  |  |  | TH2 (Chọn cột khác): Hệ thống đặt cột được chọn làm cột sắp xếp hiện hành và cập nhật danh sách. Các cột hỗ trợ sắp xếp gồm `Câu hỏi`, `Nhóm chủ đề`, `Thứ tự hiển thị`, `Ngày tạo`. |
| 7 | Xem | Row Click | Hệ thống mở **MH02 - Chi tiết câu hỏi thường gặp** ở chế độ chỉ xem. |
| 8 | Chỉnh sửa | Icon button | TH1 (Bản ghi không ở trạng thái được chỉnh sửa): Icon hiển thị dạng mờ và không cho thao tác nếu bản ghi không ở trạng thái "Lưu nháp" hoặc "Từ chối". |
|  |  |  | TH Hợp lệ: Hệ thống mở **MH03 - Thêm mới/Chỉnh sửa câu hỏi thường gặp** ở chế độ chỉnh sửa. |
| 9 | Xóa câu hỏi FAQ | Icon button | TH1 (Bản ghi không ở trạng thái "Lưu nháp"): Icon hiển thị dạng mờ và không cho thao tác. |
|  |  |  | TH Hợp lệ: Hệ thống hiển thị [MSG-CFM-SYS-001]. Nếu người dùng xác nhận, hệ thống xóa mềm bản ghi, ẩn khỏi danh sách và hiển thị [MSG-SUC-BTNN-FAQ-008]. |
| 10 | Gửi phê duyệt | Icon button | TH1 (Bản ghi không ở trạng thái được gửi duyệt): Icon hiển thị dạng mờ và không cho thao tác nếu bản ghi không ở trạng thái "Lưu nháp" hoặc "Từ chối". |
|  |  |  | TH Hợp lệ: Hệ thống chuyển bản ghi sang trạng thái "Chờ duyệt", cập nhật danh sách và hiển thị [MSG-SUC-BTNN-FAQ-005]. |
| 11 | Phê duyệt | Icon button | TH1 (Bản ghi không ở trạng thái "Chờ duyệt"): Icon hiển thị dạng mờ và không cho thao tác. |
|  |  |  | TH Hợp lệ: Hệ thống mở **MH02 - Chi tiết câu hỏi thường gặp** và hiển thị khối phê duyệt. |
| 12 | Từ chối | Icon button | TH1 (Bản ghi không ở trạng thái "Chờ duyệt"): Icon hiển thị dạng mờ và không cho thao tác. |
|  |  |  | TH Hợp lệ: Hệ thống mở **MH02 - Chi tiết câu hỏi thường gặp** và hiển thị khối phê duyệt. |
| 13 | Click câu hỏi | Link | Hệ thống mở **MH02 - Chi tiết câu hỏi thường gặp** ở chế độ chỉ xem. |
| 14 | Click dòng dữ liệu | Row click | Hệ thống mở **MH02 - Chi tiết câu hỏi thường gặp** ở chế độ chỉ xem. |
| 15 | Số dòng hiển thị | Select | Khi người dùng chọn `10`, `20`, `50` hoặc `100`, hệ thống cập nhật số bản ghi hiển thị trên mỗi trang, đưa trang hiện tại về trang 1 và tải lại lưới dữ liệu; mặc định chọn sẵn `20`. |
| 16 | Chuyển trang | Pagination | Hệ thống chuyển đến trang đầu (&#124;&lt;&lt;), trang trước (&lt;), trang được chọn, trang sau (&gt;) hoặc trang cuối (&gt;&gt;&#124;) theo thao tác người dùng; dữ liệu hiển thị giữ nguyên tiêu chí lọc/sắp xếp hiện hành và cấu hình mặc định 20 bản ghi/trang. |

---

##### 4.3.3.8.4. MH02 - Màn hình Chi tiết câu hỏi thường gặp

###### 4.3.3.8.4.1. Màn hình

Nguồn UI: modal `faqModal` với tiêu đề `Chi tiết câu hỏi thường gặp`.

###### 4.3.3.8.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Nội dung câu hỏi & Trả lời** | | | | |
| Câu hỏi | Text(1000) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị nội dung câu hỏi thường gặp. |
| Nội dung trả lời | Text(4000) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị nội dung câu trả lời chi tiết. |
| Nhóm chủ đề | Enum(String(100)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Tham chiếu Danh mục Nhóm chủ đề câu hỏi thường gặp [DM_36]. |
| Thứ tự hiển thị | Integer(10) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị thứ tự ưu tiên khi công bố câu hỏi. |
| Tags / Từ khóa | String(500) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị các từ khóa phân tách bằng dấu phẩy. |
| **II. Tài liệu hướng dẫn đi kèm** | | | | |
| File tài liệu đính kèm | File | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị danh sách file PDF/JPG/PNG đã đính kèm.<br>- Mỗi file hiển thị tên file và liên kết `Xem file`. |
| File hướng dẫn media | File | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Hiển thị danh sách file MP4/MP3 đã đính kèm.<br>- Mỗi file hiển thị tên file và liên kết `Xem file`. |
| **III. Cán bộ phê duyệt câu hỏi FAQ** | | | | |
| Người tạo / gửi duyệt | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Chỉ hiển thị trong khối phê duyệt hoặc khi xem bản ghi bị từ chối. |
| Ngày gửi duyệt | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Chỉ hiển thị trong khối phê duyệt hoặc khi xem bản ghi bị từ chối. |
| Lý do từ chối | Text(1000) | Không | Trống | - Bắt buộc nhập khi thực hiện chức năng `Từ chối`.<br>- Khi bản ghi ở trạng thái "Từ chối", trường hiển thị chỉ đọc lý do đã lưu. |

###### 4.3.3.8.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Button | Chỉ hiển thị với tài khoản Cán bộ phê duyệt khi bản ghi ở trạng thái "Chờ duyệt". Hệ thống cập nhật trạng thái bản ghi sang "Đã duyệt", ghi nhận người duyệt/ngày duyệt, đóng màn hình chi tiết, tải lại danh sách và hiển thị [MSG-SUC-BTNN-FAQ-006]. |
| 2 | Từ chối | Button | TH1 (Bỏ trống lý do từ chối): Vi phạm [BR-VAL-001]. Hệ thống hiển thị [MSG-ERR-VAL-001] dưới trường `Lý do từ chối`, không cho phép từ chối. |
|  |  |  | TH Hợp lệ: Chỉ hiển thị với tài khoản Cán bộ phê duyệt khi bản ghi ở trạng thái "Chờ duyệt". Hệ thống cập nhật trạng thái bản ghi sang "Từ chối", lưu lý do từ chối, ghi nhận người duyệt/ngày duyệt, đóng màn hình chi tiết, tải lại danh sách và hiển thị [MSG-SUC-BTNN-FAQ-007]. |
| 3 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 4 | Hủy | Button | Hệ thống đóng màn hình chi tiết và quay lại **MH01 - Danh sách câu hỏi và trả lời thường gặp**. |
| 5 | Đóng | Icon button | Hệ thống đóng màn hình chi tiết và quay lại **MH01 - Danh sách câu hỏi và trả lời thường gặp**. |

---

##### 4.3.3.8.5. MH03 - Màn hình Thêm mới/Chỉnh sửa câu hỏi thường gặp

###### 4.3.3.8.5.1. Màn hình

Nguồn UI: modal `faqModal` với tiêu đề `Thêm mới câu hỏi thường gặp (FAQ)` hoặc `Chỉnh sửa câu hỏi thường gặp`.

###### 4.3.3.8.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Nội dung câu hỏi & Trả lời** | | | | |
| Câu hỏi | Text(1000) | Có | Trống | Nhập nội dung câu hỏi thường gặp. |
| Nội dung trả lời | Text(4000) | Có | Trống | - Nhập nội dung câu trả lời chi tiết.<br>- Hỗ trợ định dạng nội dung theo các thao tác trên thanh công cụ UI:<br>+ In đậm<br>+ In nghiêng<br>+ Danh sách không thứ tự<br>+ Danh sách có thứ tự<br>+ Chèn liên kết |
| Nhóm chủ đề | Enum(String(100)) | Có | Trống | - Tham chiếu Danh mục Nhóm chủ đề câu hỏi thường gặp [DM_36]. |
| Thứ tự hiển thị | Integer(10) | Không | Trống | Nhập số nguyên dương để xác định thứ tự ưu tiên hiển thị. |
| Tags / Từ khóa | String(500) | Không | Trống | Nhập tối đa 10 tags, phân tách bằng dấu phẩy theo UI. |
| **II. Tài liệu hướng dẫn đi kèm** | | | | |
| File tài liệu đính kèm | File | Không | Trống | - Cho phép chọn đồng thời nhiều file.<br>- Áp dụng [BR-BTNN-FAQ-001].<br>- Sau khi tải lên, mỗi file hiển thị tên file và các thao tác:<br>+ Xem file<br>+ Xóa |
| File hướng dẫn media | File | Không | Trống | - Cho phép chọn đồng thời nhiều file.<br>- Áp dụng [BR-BTNN-FAQ-002].<br>- Sau khi tải lên, mỗi file hiển thị tên file và các thao tác:<br>+ Xem file<br>+ Xóa |

###### 4.3.3.8.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu nháp | Button | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001]. Hệ thống hiển thị [MSG-ERR-VAL-001] và không cho phép lưu. |
|  |  |  | TH2 (Dữ liệu không hợp lệ): Kiểm tra và phát hiện lỗi:<br>+ `Thứ tự hiển thị` không phải số nguyên dương: Hệ thống hiển thị [MSG-ERR-BTNN-FAQ-007] và không cho phép lưu.<br>+ File tài liệu đính kèm vi phạm [BR-BTNN-FAQ-001], hiển thị [MSG-ERR-BTNN-FAQ-001], [MSG-ERR-BTNN-FAQ-002] hoặc [MSG-ERR-BTNN-FAQ-003] theo lỗi phát sinh, không cho phép lưu.<br>+ File hướng dẫn media vi phạm [BR-BTNN-FAQ-002], hiển thị [MSG-ERR-BTNN-FAQ-004], [MSG-ERR-BTNN-FAQ-005] hoặc [MSG-ERR-BTNN-FAQ-006] theo lỗi phát sinh, không cho phép lưu. |
|  |  |  | TH Hợp lệ: Hệ thống lưu câu hỏi ở trạng thái "Lưu nháp", đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-BTNN-FAQ-004]. |
| 2 | Gửi duyệt | Button | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001]. Hệ thống hiển thị [MSG-ERR-VAL-001] và không cho phép gửi duyệt. |
|  |  |  | TH2 (Dữ liệu không hợp lệ): Kiểm tra dữ liệu tương tự chức năng `Lưu nháp`. Nếu có lỗi, hệ thống hiển thị mã MSG tương ứng và không cho phép gửi duyệt. |
|  |  |  | TH Hợp lệ: Hệ thống lưu câu hỏi, chuyển trạng thái bản ghi sang "Chờ duyệt", đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-BTNN-FAQ-005]. |
| 3 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 4 | Xóa | Link | Hệ thống xóa file khỏi danh sách file đã chọn trên màn hình trước khi lưu. |
| 5 | Hủy | Button | Hệ thống đóng màn hình thêm mới/chỉnh sửa và quay lại **MH01 - Danh sách câu hỏi và trả lời thường gặp**; các dữ liệu chưa lưu không được ghi nhận. |
| 6 | Đóng | Icon button | Hệ thống đóng màn hình thêm mới/chỉnh sửa và quay lại **MH01 - Danh sách câu hỏi và trả lời thường gặp**; các dữ liệu chưa lưu không được ghi nhận. |
