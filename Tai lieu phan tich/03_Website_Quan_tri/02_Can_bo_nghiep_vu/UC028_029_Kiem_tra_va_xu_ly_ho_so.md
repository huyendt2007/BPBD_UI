﻿### 4.3.2. Dành cho Cán bộ nghiệp vụ tại Trung tâm đăng ký (TTĐK):

#### 4.3.2.1. UC028 & UC029 - Kiểm tra và Xử lý hồ sơ Đăng ký Biện pháp bảo đảm, Hợp đồng

##### 4.3.2.1.1. Mục đích

\- Cho phép Cán bộ TTĐK xem danh sách và chi tiết toàn bộ hồ sơ thuộc 9 loại giao dịch (Đăng ký mới, Đăng ký thay đổi, Xóa đăng ký, Yêu cầu cung cấp bản sao, Yêu cầu cung cấp bản sao kèm thông báo, Yêu cầu cung cấp thông tin, Thông báo xử lý tài sản, Thay đổi thông báo xử lý tài sản, Xóa thông báo xử lý tài sản) trên cùng một màn hình thống nhất, từ đó thực hiện kiểm tra, duyệt, từ chối, trình ký hoặc cập nhật hồ sơ bị trả lại.

\- Tài liệu này đại diện chung cho toàn bộ các Mã UC lặp lại của nghiệp vụ Kiểm tra và Xử lý hồ sơ trên 8 loại tài sản bảo đảm/hợp đồng theo danh mục khảo sát gốc (Mã Chức năng `WebAdmin-08-02`, đại diện bởi UC028 - Kiểm tra hồ sơ Đăng ký mới và UC029 - Kiểm tra hồ sơ Đăng ký thay đổi), vì toàn bộ nghiệp vụ được xử lý thống nhất trên cùng một giao diện, không tách màn hình riêng theo từng loại tài sản.

*a. Phân quyền*

\- Người dùng: Cán bộ TTĐK.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập vào hệ thống thành công bằng tài khoản Cán bộ TTĐK.
\- Người dùng được phân quyền thực hiện tính năng.
\- Hệ thống đang hoạt động bình thường, kết nối cơ sở dữ liệu ổn định.

*c. Nguyên tắc phân quyền dữ liệu (Data Isolation)*

\- Để đảm bảo an toàn thông tin và phân định trách nhiệm xử lý hồ sơ giữa các Trung tâm đăng ký giao dịch, tài sản (TTĐK):
\- Cán bộ TTĐK trực thuộc Trung tâm nào thì hệ thống chỉ hiển thị danh sách hồ sơ được định tuyến/tiếp nhận bởi Trung tâm đó (dựa trên Trung tâm đăng ký giao dịch, tài sản được người nộp lựa chọn tại Phần II của hồ sơ).
\- Cán bộ TTĐK tuyệt đối không được xem, tìm kiếm, kiểm tra, hoặc thực hiện bất kỳ thao tác nào đối với các hồ sơ thuộc về Trung tâm đăng ký khác.

*d. Ghi chú về phạm vi tài liệu*

\- Không thuộc phạm vi tài liệu này: Tab tiếp nhận hồ sơ giấy nộp trực tiếp tại quầy/qua bưu chính chưa số hóa ("Chờ nhập liệu") thuộc nhóm tính năng Tiếp nhận và nhập liệu hồ sơ (`WebAdmin-08-01`, tham chiếu **[UC024]** cho bước số hóa/nhập liệu).
\- Không thuộc phạm vi tài liệu này: Danh sách "Hồ sơ đang chờ Lãnh đạo ký số" và "Hồ sơ đã xử lý (Hoàn thành/Bị từ chối)" - thuộc phạm vi tra cứu, xem lại của **[UC219]** (Quản lý Trả kết quả hồ sơ) và **[UC030_02]** (Tra cứu hồ sơ đăng ký BPBĐ dành cho Đăng ký viên); màn hình tại đây chỉ thao tác trên các hồ sơ đang thuộc thẩm quyền xử lý của Cán bộ nghiệp vụ (Chờ duyệt, Duyệt chờ ký, Bị trả lại).

---

##### 4.3.2.1.2. UC028_029.MH01 - Màn hình Danh sách hồ sơ

###### 4.3.2.1.2.1. Màn hình

\- Màn hình chứa 3 tab:
\- Tab 1: Hồ sơ chờ duyệt (Hiển thị các hồ sơ đang có trạng thái là "Chờ duyệt").
\- Tab 2: Hồ sơ duyệt chờ ký (Hiển thị các hồ sơ đang có trạng thái là "Duyệt chờ ký" - đã được Cán bộ duyệt, đang chờ Cán bộ trình ký).
\- Tab 3: Hồ sơ Bị trả lại (Hiển thị các hồ sơ bị Lãnh đạo trả lại trong quá trình ký duyệt, cần Cán bộ nghiệp vụ xử lý lại).

![Màn hình Danh sách hồ sơ Kiểm tra và Xử lý](images/UC028.MH01.png)

###### 4.3.2.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Tìm kiếm | String(255) | Không | Trống | Placeholder: "Mã số đăng ký, PIN, Tên bên bảo đảm...". Tìm kiếm gần đúng (không phân biệt hoa/thường, Trim space) theo Số đăng ký, Mã PIN, Tên bên bảo đảm. |
| Mã khách hàng | String(50) | Không | Trống | Ô nhập riêng biệt (không gộp chung với ô Tìm kiếm). Placeholder: "Nhập mã khách hàng...". Tìm kiếm theo mã khách hàng nộp hồ sơ. |
| Loại đăng ký | Enum(String(50)) | Không | Tất cả | Tham chiếu **[DM_04]**. Gồm: Tất cả, Đăng ký mới, Đăng ký thay đổi, Xóa đăng ký, Yêu cầu cung cấp bản sao, Yêu cầu cung cấp bản sao kèm thông báo, Yêu cầu cung cấp thông tin, Thông báo xử lý tài sản, Thay đổi thông báo xử lý tài sản, Xóa thông báo xử lý tài sản. |
| Loại hình giao dịch | Enum(String(50)) | Không | Tất cả | Tham chiếu **[DM_01]**. Thay đổi giá trị sẽ tự động cập nhật lại danh sách tùy chọn của trường Loại biện pháp/Loại hợp đồng bên dưới. |
| Loại biện pháp/Loại hợp đồng | Enum(String(50)) | Không | Tất cả | Danh mục con phụ thuộc (Cascading) theo Loại hình giao dịch đang chọn:<br>\- "Biện pháp bảo đảm": Tham chiếu **[DM_02]**.<br>\- "Hợp đồng": Tham chiếu **[DM_03]**.<br>\- Chưa chọn Loại hình giao dịch: Chỉ hiển thị "Tất cả". |
| Loại tài sản bảo đảm | Enum(String(50)) | Không | Tất cả | Tham chiếu **[DM_07]**. |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Lọc theo Thời điểm đăng ký. Rule logic khoảng ngày - **[BR-VAL-007]**. |
| Đến ngày | Date | Không | Ngày hiện tại | Lọc theo Thời điểm đăng ký. Rule logic khoảng ngày - **[BR-VAL-007]**. |
| **II. Bảng danh sách kết quả** | - | \- | 10 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>**Lưu ý phân quyền dữ liệu:** Chỉ hiển thị hồ sơ được định tuyến/tiếp nhận bởi Trung tâm đăng ký giao dịch, tài sản mà Cán bộ đang đăng nhập trực thuộc.<br>\- Cho phép chọn phân trang **10, 20, 50, 100** bản ghi/trang.<br>\- Mặc định sắp xếp theo Thời điểm đăng ký giảm dần; cho phép click tiêu đề cột Thời điểm đăng ký, Tên bên bảo đảm, Tên bên nhận bảo đảm để đổi chiều sắp xếp.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Cột: Checkbox | Boolean | \- | \- | Hiển thị ở cả 3 Tab, nhưng chỉ thực sự phát huy tác dụng thao tác hàng loạt (Duyệt/Từ chối/Trình ký) ở Tab 1 (Chờ duyệt) và Tab 2 (Duyệt chờ ký); ở Tab 3 (Bị trả lại) không có thanh công cụ thao tác hàng loạt tương ứng. |
| Cột: STT | Integer(10) | \- | \- | Số thứ tự tăng dần theo trang hiện hành. |
| Cột: Thời điểm đăng ký | Datetime | \- | \- | Cho phép click tiêu đề cột để đổi chiều sắp xếp. |
| Cột: Số đăng ký | String(50) | \- | \- | Hiển thị dạng link (action-link), click vào mở **4.3.2.1.3. UC028_029.MH02 - Màn hình Xem chi tiết hồ sơ**. |
| Cột: Mã PIN | String(20) | \- | \- | Mã PIN chỉ được hệ thống cấp một lần duy nhất tại thời điểm Đăng ký mới (UC024). Cột này CHỈ hiển thị giá trị đối với hồ sơ có Loại đăng ký = "Đăng ký mới"; các loại hồ sơ khác (Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản, Yêu cầu cung cấp bản sao/thông tin,...) không phát sinh PIN mới nên hiển thị trống/"-". |
| Cột: Tên bên bảo đảm | String(255) | \- | \- | Cho phép click tiêu đề cột để đổi chiều sắp xếp. |
| Cột: Tên bên nhận bảo đảm | String(255) | \- | \- | Cho phép click tiêu đề cột để đổi chiều sắp xếp. |
| Cột: Loại đăng ký | String(50) | \- | \- | Tham chiếu **[DM_04]**. |
| Cột: Loại hình GD | String(50) | \- | \- | Tham chiếu **[DM_01]**. |
| Cột: Loại biện pháp/Hợp đồng | String(50) | \- | \- | Tham chiếu **[DM_02]** hoặc **[DM_03]** tùy Loại hình giao dịch của hồ sơ. |
| Cột: Loại tài sản | String(100) | \- | \- | Tham chiếu **[DM_07]**. Nếu hồ sơ có nhiều tài sản/nhiều loại, hiển thị tách dòng trong cùng ô. |
| Cột: Mã khách hàng | String(50) | \- | \- | Hiển thị `"—"` nếu không có dữ liệu. |
| Cột: Số biên lai | String(50) | \- | \- | Số biên lai thu lệ phí. Hiển thị `"—"` nếu chưa thanh toán/không có dữ liệu. |
| Cột: Trạng thái | String(50) | \- | \- | Tham chiếu **[DM_05]**, hiển thị dạng Tag màu tương ứng với giá trị mặc định khớp Tab đang chọn (Chờ duyệt/Duyệt chờ ký/Bị trả lại). |
| Cột: Người yêu cầu | String(255) | \- | \- | Tên người yêu cầu nộp hồ sơ; nếu hồ sơ không có dữ liệu Người yêu cầu riêng, mặc định lấy theo Tên bên bảo đảm. |
| Cột: Nguồn tiếp nhận | String(50) | \- | \- | Gồm 2 giá trị:<br>\- `Khách hàng`: Hồ sơ do khách hàng tự nộp theo hình thức điện tử (Portal/Mobile).<br>\- `Cán bộ nhập liệu`: Hồ sơ do Cán bộ nhập liệu hộ (nộp trực tiếp tại quầy hoặc qua bưu chính). |
| Cột: Cán bộ xử lý | String(255) | \- | \- | Tên Cán bộ nghiệp vụ đang phụ trách xử lý hồ sơ. Hiển thị `"—"` nếu chưa phân công. |
| Cột: Thao tác | String(255) | \- | \- | Chứa các icon thao tác nhanh trên từng dòng, khác nhau theo từng Tab, chi tiết xem mục Chức năng trên màn hình bên dưới. Click trực tiếp vào dòng dữ liệu (ngoại trừ icon thao tác) để mở **4.3.2.1.3. UC028_029.MH02 - Màn hình Xem chi tiết hồ sơ**. |

###### 4.3.2.1.2.3. Chức năng trên Tab 1 (Hồ sơ chờ duyệt)

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống truy vấn dữ liệu theo các điều kiện lọc đã nhập và hiển thị kết quả ra lưới danh sách.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Nút | Đặt lại toàn bộ tiêu chí Bộ lọc về giá trị mặc định và tải lại danh sách kết quả. |
| 3 | Từ chối | Nút | Từ chối hàng loạt các hồ sơ đã tích chọn ở Checkbox.<br>TH1 (Chưa chọn bản ghi): Vi phạm **[BR-DK-024]**, hiển thị **[MSG-ERR-DK-008]**.<br>TH Hợp lệ: Mở **4.3.2.1.4. UC028_029.MH03 - Popup Từ chối hồ sơ** cho toàn bộ các hồ sơ đã chọn. |
| 4 | Duyệt | Nút | Duyệt hàng loạt các hồ sơ đã tích chọn ở Checkbox.<br>TH1 (Chưa chọn bản ghi): Vi phạm **[BR-DK-024]**, hiển thị **[MSG-ERR-DK-008]**.<br>TH2 (Phát hiện hồ sơ trùng lặp): Vi phạm **[BR-DK-029]**, hiển thị **[MSG-CFM-DK-010]**, cho phép chọn Tiếp tục hoặc Hủy.<br>TH Hợp lệ: Cập nhật trạng thái các hồ sơ đã chọn sang "Duyệt chờ ký" (tự động chuyển sang Tab 2), hiển thị **[MSG-SUC-DK-KT-001]** và loại bỏ các hồ sơ vừa thao tác khỏi danh sách Tab 1 hiện hành. |
| 5 | Trình ký | Nút | Trình ký hàng loạt các hồ sơ đã tích chọn ở Checkbox.<br>TH1 (Chưa chọn bản ghi): Vi phạm **[BR-DK-024]**, hiển thị **[MSG-ERR-DK-008]**.<br>TH Hợp lệ: Mở **4.3.2.1.5. UC028_029.MH04 - Popup Trình ký hồ sơ** cho toàn bộ các hồ sơ đã chọn. |
| 6 | Xem | Row Click | Luôn khả dụng. Mở **4.3.2.1.3. UC028_029.MH02 - Màn hình Xem chi tiết hồ sơ**. |
| 7 | Cập nhật (Icon dòng) | Icon | Rule hạn chế cập nhật hồ sơ nguồn điện tử - **[BR-DK-030]**. Chỉ khả dụng (không làm mờ) đối với hồ sơ có Nguồn tiếp nhận là "Cán bộ nhập liệu" (nộp trực tiếp tại quầy/qua bưu chính); hồ sơ có Nguồn tiếp nhận là "Khách hàng" (nộp theo hình thức điện tử) hiển thị Icon ở dạng làm mờ kèm tooltip "Hồ sơ từ nguồn Khách hàng không được cập nhật", không cho phép bấm. Mở màn hình nhập liệu tương ứng loại hồ sơ (tham chiếu **[UC024]**) để Cán bộ chỉnh sửa lại thông tin trước khi duyệt. |
| 8 | Duyệt (Icon dòng) | Icon | Phê duyệt nhanh 01 hồ sơ trên dòng tương ứng. Xử lý tương tự chức năng Duyệt (hàng loạt) ở trên nhưng chỉ áp dụng cho 01 hồ sơ. |
| 9 | Trình ký (Icon dòng) | Icon | Mở **4.3.2.1.5. UC028_029.MH04** cho 01 hồ sơ trên dòng tương ứng. |
| 10 | Từ chối (Icon dòng) | Icon | Mở **4.3.2.1.4. UC028_029.MH03** cho 01 hồ sơ trên dòng tương ứng. |
| 11 | Click dòng dữ liệu | Row Click | Mở **4.3.2.1.3. UC028_029.MH02 - Màn hình Xem chi tiết hồ sơ**. |

*Ghi chú thứ tự icon trên lưới (đúng theo giao diện)*: Xem → Cập nhật → Duyệt → Trình ký → Từ chối.

###### 4.3.2.1.2.4. Chức năng trên Tab 2 (Hồ sơ duyệt chờ ký)

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tương tự Tab 1.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Nút | Tương tự Tab 1. |
| 3 | Từ chối | Nút | Từ chối hàng loạt các hồ sơ đã tích chọn. Xử lý tương tự chức năng Từ chối tại Tab 1. |
| 4 | Trình ký | Nút | Trình ký hàng loạt các hồ sơ đã tích chọn. Xử lý tương tự chức năng Trình ký tại Tab 1. |
| 5 | Xem | Row Click | Luôn khả dụng. Mở **4.3.2.1.3. UC028_029.MH02**. |
| 6 | Trình ký (Icon dòng) | Icon | Mở **4.3.2.1.5. UC028_029.MH04** cho 01 hồ sơ trên dòng tương ứng. |
| 7 | Hủy duyệt (Icon dòng) | Icon | Chỉ áp dụng cho 01 hồ sơ trên dòng tương ứng (không hỗ trợ hàng loạt). Rule luồng trạng thái - **[BR-DK-026]**.<br>TH Hợp lệ: Đưa hồ sơ về lại trạng thái "Chờ duyệt" (hồ sơ tự động chuyển về Tab 1), hiển thị **[MSG-SUC-DK-KT-004]** và loại bỏ hồ sơ khỏi danh sách Tab 2 hiện hành. |
| 8 | Từ chối (Icon dòng) | Icon | Mở **4.3.2.1.4. UC028_029.MH03** cho 01 hồ sơ trên dòng tương ứng. |
| 9 | Click dòng dữ liệu | Row Click | Mở **4.3.2.1.3. UC028_029.MH02**. |

*Ghi chú thứ tự icon trên lưới (đúng theo giao diện)*: Xem → Trình ký → Hủy duyệt → Từ chối.

###### 4.3.2.1.2.5. Chức năng trên Tab 3 (Hồ sơ Bị trả lại)

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tương tự Tab 1.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | Xóa bộ lọc | Nút | Tương tự Tab 1. |
| 3 | Xem | Row Click | Luôn khả dụng. Mở **4.3.2.1.3. UC028_029.MH02**. |
| 4 | Cập nhật (Icon dòng) | Icon | Luôn khả dụng (không áp dụng hạn chế theo Nguồn tiếp nhận, khác với icon Cập nhật ở Tab 1). Mở màn hình nhập liệu tương ứng loại hồ sơ (tham chiếu **[UC024]**) để Cán bộ chỉnh sửa lại thông tin theo đúng ý kiến/lý do trả lại của Lãnh đạo, sau đó gửi lại vào luồng xử lý. |
| 5 | Từ chối (Icon dòng) | Icon | Mở **4.3.2.1.4. UC028_029.MH03** cho 01 hồ sơ trên dòng tương ứng. |
| 6 | Click dòng dữ liệu | Row Click | Mở **4.3.2.1.3. UC028_029.MH02**. |

*Ghi chú thứ tự icon trên lưới (đúng theo giao diện)*: Xem → Cập nhật → Từ chối. Tab này không có thanh công cụ thao tác hàng loạt (Checkbox chỉ hiển thị theo cấu trúc lưới chung, không có nút thao tác lô tương ứng).

---

##### 4.3.2.1.3. UC028_029.MH02 - Màn hình Xem chi tiết hồ sơ

\- Thao tác Xem chi tiết (click dòng dữ liệu hoặc click trực tiếp vào dòng dữ liệu, ngoại trừ các icon thao tác khác) điều hướng sang màn hình Xem chi tiết lịch sử hồ sơ dành cho Cán bộ kiểm duyệt, đã được đặc tả đầy đủ tại **[UCPS005]**(UCPS005_Xem_lich_su_thay_doi_can_bo.md) (mục 4.3.2.6), bao gồm: dòng thời gian lịch sử phiên bản, kết quả rà soát rủi ro tự động, bảng đối chiếu chênh lệch Before/After theo từng loại hồ sơ và các nút thao tác Duyệt/Trình ký/Từ chối/Trả lại/Đóng.

\- Màn hình danh sách tại đây (**4.3.2.1.2. UC028_029.MH01**) không hiển thị lại nội dung chi tiết hồ sơ; toàn bộ nghiệp vụ Duyệt/Trình ký/Từ chối/Hủy duyệt hàng loạt hoặc theo dòng đã được đặc tả tại mục 4.3.2.1.2.3-4.3.2.1.2.5, thao tác trên màn hình chi tiết (UCPS005) chỉ là kênh xử lý bổ sung cho từng hồ sơ đơn lẻ sau khi đã xem đối soát chi tiết.

*(Ghi chú: Tại thời điểm biên soạn, UCPS005 mô tả 3 loại hồ sơ và một số hành động (Duyệt/Trình ký/Từ chối/Trả lại/Đóng) theo tên trạng thái cũ. Khi cập nhật UCPS005, cần đối chiếu bổ sung: đủ 9 loại hồ sơ tại mục 4.3.2.1.2.1, tên trạng thái "Duyệt chờ ký"/"Bị trả lại" theo tài liệu này, và bổ sung hành động Hủy duyệt/Cập nhật tương ứng.)*

---

##### 4.3.2.1.4. UC028_029.MH03 - Popup Từ chối hồ sơ

###### 4.3.2.1.4.1. Popup nhập lý do từ chối

*a. Màn hình*

\- Giao diện Popup hiển thị khi Cán bộ nghiệp vụ bấm nút/icon "Từ chối" (đơn lẻ hoặc hàng loạt) tại Màn hình danh sách hoặc Màn hình xem chi tiết.

![Popup nhập lý do từ chối](images/UC028_MH03_Popup.png)

*b. Mô tả thông tin trên màn hình*

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số đăng ký | String(255) | \- | Theo hồ sơ đang chọn | Chỉ đọc. Hiển thị Số đăng ký của (các) hồ sơ đang thực hiện từ chối; nếu từ chối hàng loạt, hiển thị dạng danh sách rút gọn. |
| Lý do từ chối | Text(1000) | Có | Trống | Rule bắt buộc nhập ý kiến/lý do từ chối - **[BR-DK-025]**. |
| Nội dung hướng dẫn bổ sung | Text(1000) | Không | Trống | Nội dung hướng dẫn người nộp sửa đổi, bổ sung thông tin hồ sơ. |

*c. Chức năng trên màn hình*

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại giao diện trước đó. |
| 2 | Xác nhận | Nút | TH1 (Bỏ trống Lý do từ chối): Vi phạm **[BR-DK-025]**, hiển thị **[MSG-ERR-VAL-001]**, highlight viền đỏ và focus vào ô lỗi.<br>TH Hợp lệ: Lưu dữ liệu lý do và hướng dẫn bổ sung vào bộ nhớ tạm, đóng popup nhập lý do và tự động hiển thị Preview văn bản thông báo từ chối. |

###### 4.3.2.1.4.2. Preview văn bản thông báo từ chối

*a. Màn hình*

\- Giao diện xem trước văn bản Thông báo từ chối, tự động hiển thị sau khi Cán bộ nhấn Xác nhận và nhập thông tin hợp lệ tại Popup nhập lý do từ chối.

![Preview văn bản thông báo từ chối](images/UC028_MH03_Preview.png)

*b. Mô tả thông tin trên màn hình*

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| PDF Viewer | File | \- | \- | Hiển thị nguyên bản nội dung dự thảo Văn bản Thông báo từ chối. Hỗ trợ Phóng to/Thu nhỏ, Cuộn trang, Tải xuống file PDF dự thảo tạm thời. Văn bản chỉ đọc, không cho phép chỉnh sửa trực tiếp. |
| Lãnh đạo ký văn bản từ chối | Enum(String(255)) | Có | Trống | \- Control UI: Combobox có ô tìm kiếm.<br>\- Bắt buộc chọn trước khi xác nhận gửi ký văn bản từ chối.<br>\- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>\- Cho phép tìm kiếm gần đúng theo tên Lãnh đạo, chức danh hoặc đơn vị.<br>\- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký văn bản từ chối của hồ sơ được chọn.<br>\- Với từ chối hàng loạt, danh sách Lãnh đạo ký chỉ hiển thị người có thẩm quyền ký tất cả văn bản từ chối trong danh sách đã chọn. |

*c. Chức năng trên màn hình*

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng phần Preview, quay lại giao diện Popup Nhập lý do từ chối để chỉnh sửa thông tin. |
| 2 | Xác nhận | Nút | TH1 (Chưa chọn Lãnh đạo ký văn bản từ chối hoặc Lãnh đạo đã chọn không còn hiệu lực/không có thẩm quyền tại thời điểm xác nhận): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không gửi trình ký.<br>TH Hợp lệ: Hệ thống thực hiện:<br>\- Lưu tệp dự thảo PDF chính thức vào database (tên file: `ThongBaoTuChoi_[SoDangKy].pdf`).<br>\- Ghi nhận Cán bộ từ chối, thời điểm từ chối và Lãnh đạo ký văn bản từ chối đã chọn.<br>\- Cập nhật trạng thái (các) hồ sơ sang "Chờ ký" và chuyển đến đúng Lãnh đạo ký đã chọn trên danh sách Lãnh đạo ký duyệt - **[UC219]**.<br>\- Loại bỏ hồ sơ khỏi danh sách hiện hành.<br>\- Đóng toàn bộ Popup/màn hình chi tiết, quay lại danh sách. Hiển thị **[MSG-SUC-DK-KT-003]**. |

###### 4.3.2.1.4.3. Quy tắc Khớp nối dữ liệu (Mapping) sinh Văn bản từ chối

\- **Văn bản được sinh ra**: Văn bản Thông báo về việc từ chối tiếp nhận, từ chối giải quyết hồ sơ đăng ký biện pháp bảo đảm (biểu mẫu cụ thể sẽ được thống nhất khi có biểu mẫu chính thức từ cơ quan ban hành).
*(Ghi chú: Danh sách bên dưới phục vụ đội ngũ phát triển xây dựng cấu trúc DB; các thẻ từ khóa sẽ được điều chỉnh khi có mẫu PDF chính xác)*

| STT | Biến (Placeholder) trên Biểu mẫu PDF | Lấy từ trường dữ liệu (Giao diện / Database) | Ghi chú |
| :-- | :--- | :--- | :--- |
| 1 | `<<SoThongBaoTuChoi>>` | Số văn bản thông báo do hệ thống tự sinh khi bắt đầu tiến trình từ chối | Định dạng hành chính: `[STT]/TBTC-[TenTrungTamVietTat]` |
| 2 | `<<TenCoQuanDangKy>>` | Tên Trung tâm đăng ký giao dịch, tài sản tiếp nhận xử lý hồ sơ | Lấy từ thông tin Đơn vị hành chính của Cán bộ tiếp nhận đang đăng nhập |
| 3 | `<<SoDangKy>>` | Số đăng ký của hồ sơ bị từ chối (tương ứng từng loại hồ sơ) | Sinh ra khi khách hàng nộp hồ sơ thành công |
| 4 | `<<TenNguoiNop>>` | Thông tin người nộp hồ sơ → Họ và tên | Người thực tế thực hiện nộp hồ sơ |
| 5 | `<<DiaChiNguoiNop>>` | Địa chỉ chi tiết - Tỉnh/Thành phố - Quốc gia của người nộp hồ sơ | Cá nhân lấy theo thông tin cá nhân; Cá nhân thuộc tổ chức lấy theo thông tin tổ chức |
| 6 | `<<TenBenBaoDam>>` | Bảng Bên bảo đảm → Tên chủ thể | Nối bằng dấu phẩy nếu có nhiều bên bảo đảm |
| 7 | `<<TenBenNhanBaoDam>>` | Bảng Bên nhận bảo đảm → Tên chủ thể | |
| 8 | `<<ThoiDiemTiepNhan>>` | Ngày giờ hệ thống tiếp nhận hồ sơ thành công | Format: `dd/MM/yyyy HH:mm` |
| 9 | `<<LoaiDangKy>>` | Loại hình đăng ký/loại hồ sơ | Tham chiếu **[DM_04]** |
| 10 | `<<LyDoTuChoi>>` | Nội dung Cán bộ nhập tại ô Lý do từ chối | |
| 11 | `<<HuongDanHoanThien>>` | Nội dung hướng dẫn bổ sung, sửa đổi hồ sơ | |
| 12 | `<<TenTrungTamVietTat>>` | Tên viết tắt Trung tâm tiếp nhận xử lý hồ sơ | Dùng cho số văn bản hành chính (VD: Cục GDBD, TTĐK1...) |
| 13 | `<<NgayBanHanhTB>>` | Ngày, tháng, năm ban hành thông báo từ chối | Lấy theo thời gian thực khi Lãnh đạo ký số |

---

##### 4.3.2.1.5. UC028_029.MH04 - Popup Trình ký hồ sơ

###### 4.3.2.1.5.1. Màn hình

\- Popup hiển thị khi Cán bộ bấm nút/icon "Trình ký" (đơn lẻ hoặc hàng loạt). Giao diện hiển thị trình duyệt xem trước văn bản Giấy chứng nhận/Thông báo kết quả tương ứng loại hồ sơ.

![Màn hình Trình ký hồ sơ](images/UC028_MH04.png)

###### 4.3.2.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| PDF Viewer | File | \- | \- | Hiển thị nguyên bản nội dung Dự thảo Giấy chứng nhận/Thông báo kết quả tương ứng (một hoặc nhiều tệp nếu trình ký hàng loạt). Hỗ trợ Phóng to/Thu nhỏ, Cuộn trang, Tải xuống file PDF dự thảo tạm thời. Văn bản chỉ đọc, không cho phép chỉnh sửa trực tiếp. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | \- Control UI: Combobox có ô tìm kiếm.<br>\- Bắt buộc chọn trước khi xác nhận trình ký.<br>\- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>\- Cho phép tìm kiếm gần đúng theo tên Lãnh đạo, chức danh hoặc đơn vị.<br>\- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký hồ sơ được chọn.<br>\- Với trình ký hàng loạt, danh sách Lãnh đạo ký chỉ hiển thị người có thẩm quyền ký tất cả hồ sơ trong danh sách đã chọn. |

###### 4.3.2.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng màn hình Preview, quay lại màn hình trước đó và giữ nguyên trạng thái hồ sơ. |
| 2 | Xác nhận | Nút | TH1 (Chưa chọn Lãnh đạo ký hoặc Lãnh đạo ký không còn hiệu lực/không có thẩm quyền tại thời điểm xác nhận): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không trình ký.<br>TH Hợp lệ: Hệ thống thực hiện:<br>\- Lưu tệp dự thảo PDF chính thức vào database.<br>\- Ghi nhận Cán bộ trình ký, thời điểm trình ký và Lãnh đạo ký đã chọn.<br>\- Cập nhật trạng thái (các) hồ sơ sang "Chờ ký" và chuyển đến đúng Lãnh đạo ký đã chọn trên danh sách Lãnh đạo ký duyệt - **[UC219]**.<br>\- Loại bỏ hồ sơ khỏi danh sách hiện hành (Tab 1 hoặc Tab 2).<br>\- Đóng toàn bộ Popup/màn hình chi tiết, quay lại danh sách. Hiển thị **[MSG-SUC-DK-KT-002]**. |

###### 4.3.2.1.5.4. Quy tắc Khớp nối dữ liệu (Mapping) sinh Giấy chứng nhận/Thông báo kết quả

\- Hệ thống lấy dữ liệu từ CSDL để điền vào các trường động (Placeholder) trên file Word mẫu (Template) và xuất ra file PDF dự thảo. Văn bản chỉ có 01 chữ ký số duy nhất của Lãnh đạo duyệt (Cán bộ TTĐK không cần ký).

**a. Mapping Giấy chứng nhận đăng ký biện pháp bảo đảm (Đăng ký mới)**

| STT | Tên Placeholder trên Mẫu | Lấy từ trường dữ liệu (Giao diện / Database) | Ghi chú |
| :-- | :--- | :--- | :--- |
| 1 | `<<SoDangKy>>` | Số đăng ký biện pháp bảo đảm sinh tự động | |
| 2 | `<<ThoiDiemDangKy>>` | Ngày giờ phê duyệt hồ sơ (thời điểm Lãnh đạo ký số) | Format: `dd/MM/yyyy HH:mm:ss` |
| 3 | `<<TenBenBaoDam>>` | Bảng Bên bảo đảm → Tên chủ thể (nối dấu phẩy nếu nhiều) | |
| 4 | `<<SoGiayToBBD>>` | Bảng Bên bảo đảm → Số CMND/CCCD/Mã số thuế | |
| 5 | `<<DiaChiBBD>>` | Bảng Bên bảo đảm → Địa chỉ liên hệ | |
| 6 | `<<TenBenNhanBaoDam>>` | Bảng Bên nhận bảo đảm → Tên chủ thể | |
| 7 | `<<SoGiayToBNBD>>` | Bảng Bên nhận bảo đảm → Số CMND/CCCD/Mã số thuế | |
| 8 | `<<MoTaTaiSan>>` | Bảng Thông tin tài sản → Gộp hiển thị toàn bộ mô tả tài sản | Có thể sinh bảng động nếu tài sản dạng danh sách |
| 9 | `<<ThongTinHopDong>>` | Loại hợp đồng + Số hợp đồng + Ngày ký kết | |

**b. Mapping Giấy chứng nhận đăng ký thay đổi biện pháp bảo đảm (Biểu mẫu 02a/2026/ĐKTĐ)**

| Biến trên Biểu mẫu PDF | Trường dữ liệu tương ứng trong hồ sơ | Định dạng hiển thị | Ghi chú |
| :--- | :--- | :--- | :--- |
| `{{SoDangKyThayDoi}}` | Mã hồ sơ đăng ký thay đổi | Ký tự | Số định danh duy nhất của hồ sơ thay đổi |
| `{{NgayGioDangKyThayDoi}}` | Thời điểm Lãnh đạo ký số hoàn thành | Date/Time (dd/mm/yyyy hh:mm) | Ghi nhận thời gian giao dịch chính thức có hiệu lực |
| `{{SoDangKyLanDau}}` | Số đăng ký biện pháp bảo đảm lần đầu | Ký tự | Mã số hồ sơ gốc |
| `{{NgayDangKyLanDau}}` | Thời điểm đăng ký hồ sơ gốc | Date (dd/mm/yyyy) | Ngày đăng ký lần đầu |
| `{{TenTrungTamTiepNhan}}` | Cơ quan tiếp nhận hồ sơ | Ký tự | Tên Trung tâm đăng ký giao dịch tài sản tiếp nhận |
| `{{BenBaoDamTruoc}}` | Danh sách Bên bảo đảm cũ (Before) | GridView | Hiển thị danh sách trước khi thay đổi |
| `{{BenBaoDamSau}}` | Danh sách Bên bảo đảm mới (After) | GridView | Hiển thị danh sách sau khi thay đổi, highlight chủ thể mới bổ sung |
| `{{BenNhanBaoDamTruoc}}` | Danh sách Bên nhận bảo đảm cũ (Before) | GridView | Thông tin trước thay đổi |
| `{{BenNhanBaoDamSau}}` | Danh sách Bên nhận bảo đảm mới (After) | GridView | Thông tin sau thay đổi |
| `{{MoTaTaiSanTruoc}}` | Mô tả tài sản bảo đảm cũ (Before) | Text(1000) | Mô tả chung trước thay đổi |
| `{{MoTaTaiSanSau}}` | Mô tả tài sản bảo đảm mới (After) | Text(1000) | Mô tả chung sau thay đổi |
| `{{DanhSachSoKhungRutBot}}` | Danh sách số khung phương tiện rút bớt | GridView | Chỉ liệt kê tài sản có trạng thái "Rút bớt" |
| `{{DanhSachSoKhungBoSung}}` | Danh sách số khung phương tiện bổ sung mới | GridView | Chỉ liệt kê tài sản có trạng thái "Bổ sung mới" |
| `{{TomTatNoiDungThayDoi}}` | Thông tin thay đổi nhập tại Khối VIII | Text(1000) | Mô tả bằng ngôn ngữ tự nhiên do khách hàng nhập |

---

##### 4.3.2.1.6. Ghi chú tham chiếu liên kết nghiệp vụ chéo

*(Theo Danh sách kiểm tra ràng buộc chéo tại [Feature_Map.md](../../../../docs/Context/Feature_Map.md))*

\- **Ràng buộc đầu vào**: Không gọi trực tiếp tích hợp V.1 tại màn hình này; dữ liệu tài sản/chủ thể đã được kiểm tra chéo với C08/VSDC/ĐKKD ngay tại bước tiếp nhận hồ sơ (I.1.2), kết quả kiểm tra được hiển thị lại tại Panel đối soát rủi ro tự động trên màn hình Xem chi tiết (**[UCPS005]**).

\- **Tham chiếu Danh mục**: **[DM_01]** (Loại hình giao dịch), **[DM_02]**/**[DM_03]** (Loại biện pháp/Loại hợp đồng), **[DM_04]** (Loại hình đăng ký), **[DM_05]** (Trạng thái hồ sơ), **[DM_07]** (Loại tài sản bảo đảm), **[DM_19]** (Căn cứ xóa đăng ký).

\- **Phát sinh Nhật ký**: Toàn bộ thao tác Duyệt, Từ chối, Trình ký, Hủy duyệt, Cập nhật hồ sơ Bị trả lại đều ghi log vào Nhật ký phê duyệt nội bộ (đặc tả tại **[UCPS005]**) và Nhật ký hệ thống **III.6**.

\- **Nguy cơ phát sinh bồi thường**: Đây là khâu trọng yếu nhất có nguy cơ dẫn đến khiếu kiện/bồi thường nhà nước (phân hệ **II**) nếu Cán bộ duyệt/trình ký sai sót (ví dụ bỏ sót cảnh báo tài sản bị ngăn chặn tại Panel đối soát rủi ro của **[UCPS005]**, hoặc phê duyệt hồ sơ trùng lặp mà không kiểm tra theo **[BR-DK-029]**). Việc chốt chặn 3 lớp qua Panel đối soát rủi ro và cảnh báo trùng lặp là cơ chế phòng ngừa chính.

\- **Đồng bộ Web/Mobile**: Không có phiên bản Mobile tương ứng cho màn hình kiểm tra/xử lý nội bộ này; kết quả xử lý (Hoàn thành/Bị từ chối) được đồng bộ để hiển thị trạng thái hồ sơ trên cả Web và Mobile App phía Khách hàng (I.1 ⟷ I.2).

\- **Cập nhật Dashboard**: Kết quả xử lý (số hồ sơ chờ duyệt, thời gian xử lý trung bình, tỷ lệ từ chối/trả lại) được đẩy vào Dashboard trực quan tình hình đăng ký BPBĐ (**IV.1**) và báo cáo giám sát hồ sơ trễ hạn (**IV.3-IV.5**).
