#### 4.3.3.10. UC481-482 - Kiến nghị cơ quan có thẩm quyền xử lý vi phạm trong việc GQBT, thực hiện trách nhiệm hoàn trả

##### 4.3.3.10.1. Mục đích

\- Cho phép cán bộ Sở Tư pháp lập, quản lý và theo dõi văn bản kiến nghị cơ quan có thẩm quyền xử lý vi phạm phát sinh trong quá trình giải quyết bồi thường (GQBT) hoặc thực hiện trách nhiệm hoàn trả tại địa phương, theo khoản 3 Điều 73 Luật Trách nhiệm bồi thường của Nhà nước; khoản 7 Điều 45 và Điều 47 dự thảo Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Trách nhiệm bồi thường của Nhà nước (bản gửi lấy ý kiến ngày 28/9/2026, sau đây gọi là Nghị định hướng dẫn). Sở Tư pháp giúp Ủy ban nhân dân cấp tỉnh nơi đặt trụ sở của cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại thực hiện kiến nghị.

\- Thời hạn ban hành văn bản kiến nghị: trong 02 ngày làm việc kể từ ngày có căn cứ kiến nghị (khoản 2 Điều 47 Nghị định hướng dẫn).

\- Cho phép theo dõi trạng thái xử lý và kết quả phản hồi của cơ quan nhận kiến nghị.

*a. Phân quyền*

\- Người dùng thuộc Sở Tư pháp: được tra cứu, xem chi tiết, thêm mới và gửi; sửa, xóa bản ghi ở trạng thái "Đã gửi - Chờ phản hồi" (chưa cập nhật kết quả phản hồi) do Sở mình tạo; cập nhật kết quả phản hồi cho bản ghi do Sở mình tạo.

\- Người dùng thuộc Bộ Tư pháp hoặc Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước: tra cứu, xem chi tiết bản ghi của mọi Sở Tư pháp; không thêm mới, không thao tác trên bản ghi.

\- Người dùng thuộc Sở Tư pháp chỉ xem bản ghi do Sở mình tạo; người dùng thuộc đơn vị khác không xem được dữ liệu.

\- Người dùng thuộc UBND cấp tỉnh: chỉ xem chi tiết bản ghi của Sở Tư pháp trực thuộc; không thêm mới, không thao tác.

\- Phạm vi dữ liệu theo [Quy tắc phạm vi dữ liệu Bộ Tư pháp - Sở Tư pháp - Danh mục và Phụ lục - Tài liệu tổng hợp](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#quy-tac-pham-vi-du-lieu-btp-stp).

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website quản trị.

\- Người dùng được phân quyền truy cập màn hình `Kiến nghị cơ quan có thẩm quyền xử lý vi phạm`.

\- Trạng thái xử lý gồm: "Đã gửi - Chờ phản hồi", "Đã có phản hồi", "Đã thực hiện", "Không thực hiện". Bản ghi được lưu và gửi trong cùng một thao tác nên trạng thái khởi tạo là "Đã gửi - Chờ phản hồi"; hệ thống tự chuyển trạng thái theo kết quả phản hồi, người dùng không sửa trực tiếp.

\- Cơ quan nhận kiến nghị tham chiếu Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`.

---

##### 4.3.3.10.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    A[Danh sách kiến nghị xử lý vi phạm] --> B[Tìm kiếm / Xóa bộ lọc / Sắp xếp / Phân trang / Kết xuất Excel]
    A --> G[Row click] --> K[Xem chi tiết]
    K --> E
    K --> F
    A --> C[Thêm mới] --> S{Gửi kiến nghị}
    S --> X1[Popup Xác nhận] --> W["Đã gửi - Chờ phản hồi"]
    A --> E[Sửa - khi Đã gửi - Chờ phản hồi] --> D[Lưu thông tin]
    A --> F[Xóa - khi Đã gửi - Chờ phản hồi] --> X2[Popup Xác nhận]
    A --> R[Cập nhật phản hồi] --> P[Popup Cập nhật kết quả phản hồi]
    P --> R1["Đã có phản hồi / Đã thực hiện / Không thực hiện"]
```

---

##### 4.3.3.10.3. MH01 - Màn hình Danh sách kiến nghị xử lý vi phạm

###### 4.3.3.10.3.1. Màn hình

![MH01 - Màn hình Danh sách kiến nghị xử lý vi phạm](images/UC481_482_MH01_Danh_sach_kien_nghi_xu_ly_vi_pham.png)

###### 4.3.3.10.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion).<br>- Không hiển thị tiêu đề khối.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Số văn bản kiến nghị | String(50) | Không | Trống | Control UI: Text input.<br>- Placeholder: "Nhập số văn bản kiến nghị...".<br>- Tìm gần đúng; không phân biệt hoa thường, có dấu/không dấu. |
| Cơ quan nhận kiến nghị | String(255) | Không | Trống | Control UI: Text input.<br>- Placeholder: "Nhập cơ quan nhận kiến nghị...".<br>- Tìm gần đúng; không phân biệt hoa thường, có dấu/không dấu. |
| Đơn vị thực hiện | List(String(50)) | Không | Tất cả | Control UI: Cây đơn vị chọn nhiều (Tree select) theo Cơ cấu tổ chức, có ô tìm kiếm theo tên.<br>- Chỉ hiển thị khi người dùng thuộc Bộ Tư pháp hoặc Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.<br>- Cây gồm các Sở Tư pháp và đơn vị trực thuộc, theo [Quy tắc phạm vi dữ liệu Bộ Tư pháp - Sở Tư pháp - Danh mục và Phụ lục - Tài liệu tổng hợp](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#quy-tac-pham-vi-du-lieu-btp-stp).<br>- Mỗi nút có ô tích; tích nút cha thì tích toàn bộ nút con.<br>- `Tất cả`: không lọc.<br>- Nút `Các Sở Tư pháp`: tích nhanh toàn bộ các Sở Tư pháp trong cây.<br>- Chọn từ 02 đơn vị trở lên: ô hiển thị "Đã chọn [n] đơn vị".<br>- Lọc bản ghi có `Đơn vị thực hiện` hoặc đơn vị công tác của `Cán bộ xử lý` thuộc các đơn vị đã tích. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đã gửi - Chờ phản hồi<br>+ Đã có phản hồi<br>+ Đã thực hiện<br>+ Không thực hiện |
| Từ ngày gửi | Date | Không | Trống | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy". |
| Đến ngày gửi | Date | Không | Trống | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy". |
| **II. Bảng danh sách kết quả** | - | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Không hiển thị tiêu đề và số lượng bản ghi phía trên bảng; tổng số bản ghi hiển thị tại thanh phân trang.<br>- Phạm vi bản ghi theo [Quy tắc phạm vi dữ liệu Bộ Tư pháp - Sở Tư pháp - Danh mục và Phụ lục - Tài liệu tổng hợp](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#quy-tac-pham-vi-du-lieu-btp-stp):<br>+ Người dùng thuộc Bộ Tư pháp hoặc Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước: bản ghi của mọi Sở Tư pháp; các icon thao tác hiển thị mờ.<br>+ Người dùng thuộc Sở Tư pháp: bản ghi do Sở mình tạo.<br>+ Người dùng thuộc UBND cấp tỉnh: bản ghi của Sở Tư pháp trực thuộc; các icon thao tác hiển thị mờ.<br>+ Người dùng thuộc đơn vị khác: không hiển thị bản ghi.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải Trang 1.<br>- Sắp xếp mặc định: theo "Ngày tạo" giảm dần.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | Không | Theo trang hiện tại | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Số văn bản kiến nghị | String(50) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Cơ quan nhận kiến nghị | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Vụ việc/QĐ liên quan | String(255) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi.<br>- Hiển thị `-` nếu chưa gắn thông tin. |
| Căn cứ phát sinh kiến nghị | Enum(String(255)) | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Ngày gửi | Date | Không | Theo dữ liệu hệ thống | - Chỉ đọc.<br>- Định dạng `dd/mm/yyyy`. |
| Cán bộ xử lý | String(100) | Không | Theo dữ liệu hệ thống | Control UI: Text (Read-only).<br>- Họ và tên cán bộ đã nhập bản ghi (người tạo). |
| Đơn vị thực hiện | String(255) | Không | Theo dữ liệu hệ thống | Control UI: Text (Read-only).<br>- Chỉ hiển thị khi người dùng thuộc Bộ Tư pháp hoặc Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước.<br>- Đặt ngay sau cột `Cán bộ xử lý`.<br>- Hiển thị tên đơn vị thực hiện của bản ghi. |
| Trạng thái | Enum(String(50)) | Không | Theo dữ liệu hệ thống | Control UI: Badge.<br>- Chỉ đọc.<br>- Theo dữ liệu bản ghi. |
| Thao tác | - | - | - | Control UI: Icon<br>+ Sửa<br>+ Xóa<br>+ Cập nhật phản hồi<br>- Cột cố định bên phải lưới khi cuộn ngang. |
| Phân trang | - | - | 20 bản ghi/trang | Phân trang, chuyển trang và cấu hình số dòng hiển thị theo quy tắc chung của hệ thống. |

###### 4.3.3.10.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày gửi` lớn hơn `Đến ngày gửi`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH2 - Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí đã nhập/chọn và đưa về Trang 1. |
|  |  |  | **TH3 - Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa (`colspan`), in nghiêng với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*, các nút điều hướng trang ở trạng thái khóa mờ. |
|  |  |  | **TH4 - Đơn vị của người dùng không thuộc phạm vi dữ liệu**: Người dùng không thuộc Bộ Tư pháp, Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước, Sở Tư pháp hoặc UBND cấp tỉnh; bảng kết quả hiển thị 01 dòng căn giữa, in nghiêng: "Đơn vị của người dùng không thuộc phạm vi dữ liệu của chức năng này.". |
| 2 | Xóa bộ lọc | Button | Hệ thống xóa toàn bộ tiêu chí tìm kiếm đã nhập/chọn, thiết lập các ô lọc về giá trị mặc định. |
| 3 | Thêm mới | Button | Chỉ hiển thị khi người dùng thuộc Sở Tư pháp.<br>- Hệ thống mở [MH03 - Màn hình Thêm mới/Sửa kiến nghị xử lý vi phạm](#433105-mh03---màn-hình-thêm-mớisửa-kiến-nghị-xử-lý-vi-phạm) ở chế độ Thêm mới với form thông tin để trống. |
| 4 | Kết xuất Excel | Button | Kết xuất danh sách ra tệp Excel theo [Quy chuẩn Kết xuất Excel dùng chung - Danh mục và Phụ lục - Tài liệu tổng hợp](../../Tai%20lieu%20tong%20hop/04_Danh_muc_va_Phu_luc.md#quy-chuan-ket-xuat-excel):<br>- Phạm vi: toàn bộ bản ghi thỏa mãn điều kiện tìm kiếm hiện hành, không giới hạn theo trang.<br>- Cột xuất theo thứ tự lưới, không gồm cột Thao tác: STT, Số văn bản kiến nghị, Cơ quan nhận kiến nghị, Vụ việc/QĐ liên quan, Căn cứ phát sinh kiến nghị, Ngày gửi, Trạng thái.<br>- Tên tệp: `yyyyMMdd_Danh_sach_kien_nghi_xu_ly_vi_pham.xlsx`. |
|  |  |  | **TH1 - Không có dữ liệu**: Hệ thống hiển thị [MSG-WRN-SYS-001] và không tải tệp. |
|  |  |  | **TH2 - Có dữ liệu**: Hệ thống tải tệp Excel về máy người dùng. |
| 5 | Sắp xếp cột | Header cột | Áp dụng trên các cột:<br>+ Số văn bản kiến nghị<br>+ Cơ quan nhận kiến nghị<br>+ Vụ việc/QĐ liên quan |
|  |  |  | **TH1 - Chọn lại cột đang sắp xếp**: Hệ thống đảo chiều sắp xếp tăng dần/giảm dần và cập nhật icon mũi tên trên tiêu đề cột. |
|  |  |  | **TH2 - Chọn cột khác**: Hệ thống sắp xếp danh sách theo cột được chọn. |
| 6 | Row click | Row click | Khi người dùng click vào bất kỳ vị trí nào trên dòng dữ liệu (trừ các nút thao tác), hệ thống mở [MH02 - Màn hình Chi tiết kiến nghị xử lý vi phạm](#433104-mh02---màn-hình-chi-tiết-kiến-nghị-xử-lý-vi-phạm). |
| 7 | Sửa | Icon button | Chỉ cho phép với bản ghi ở trạng thái "Đã gửi - Chờ phản hồi" do Sở Tư pháp của người dùng tạo; trường hợp khác icon hiển thị mờ, không cho thao tác.<br>- Hệ thống mở [MH03 - Màn hình Thêm mới/Sửa kiến nghị xử lý vi phạm](#433105-mh03---màn-hình-thêm-mớisửa-kiến-nghị-xử-lý-vi-phạm) ở chế độ Sửa với dữ liệu hiện tại của bản ghi được điền sẵn. |
| 8 | Xóa | Icon button | Chỉ cho phép với bản ghi ở trạng thái "Đã gửi - Chờ phản hồi" do Sở Tư pháp của người dùng tạo; trường hợp khác icon hiển thị mờ, không cho thao tác.<br>- Hệ thống mở [Popup Xác nhận](#433106-popup-xác-nhận). |
| 9 | Cập nhật phản hồi | Icon button | Chỉ cho phép với bản ghi ở trạng thái "Đã gửi - Chờ phản hồi" hoặc "Đã có phản hồi" do Sở Tư pháp của người dùng tạo; trường hợp khác icon hiển thị mờ.<br>- Hệ thống mở [Popup Cập nhật kết quả phản hồi](#433107-popup-cập-nhật-kết-quả-phản-hồi). |
| 10 | Phân trang & chuyển trang | Pagination | Phân trang, chuyển trang và cấu hình số dòng hiển thị theo quy tắc chung của hệ thống. |

---

##### 4.3.3.10.4. MH02 - Màn hình Chi tiết kiến nghị xử lý vi phạm

###### 4.3.3.10.4.1. Màn hình

![MH02 - Màn hình Chi tiết kiến nghị xử lý vi phạm](images/UC481_482_MH02_Chi_tiet_kien_nghi_xu_ly_vi_pham.png)

###### 4.3.3.10.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | - | - | - | Control UI: Label<br>Hiển thị "Xem chi tiết kiến nghị cơ quan có thẩm quyền xử lý vi phạm". |
| **I. Thông tin chung** |  |  |  |  |
| Trạng thái | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi (giá trị `Trạng thái`). |
| Cán bộ xử lý | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Ngày tạo/cập nhật | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Chế độ | - | - | - | Control UI: Label<br>Hiển thị "Chỉ xem". |
| **II. Thông tin kiến nghị** |  |  |  |  |
| Vụ việc/Quyết định liên quan | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Cơ quan nhận kiến nghị | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Căn cứ phát sinh kiến nghị | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Ngày có căn cứ kiến nghị | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Hạn ban hành văn bản kiến nghị | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Số văn bản kiến nghị | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Ngày lập văn bản | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Người ký | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Chức vụ | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Căn cứ pháp lý kiến nghị | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Nội dung vi phạm phát hiện | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Nội dung kiến nghị | - | - | - | Control UI: Label<br>Theo dữ liệu bản ghi. |
| **III. Tài liệu đính kèm** |  |  |  |  |
| Tài liệu đính kèm | - | - | - | Control UI: File link<br>Theo dữ liệu bản ghi. |

###### 4.3.3.10.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | Khi click vào liên kết "Xem file" của tài liệu đính kèm, hệ thống mở nội dung file tại một tab trình duyệt mới. |
| 2 | Sửa | Button | Chỉ hiển thị khi bản ghi ở trạng thái "Đã gửi - Chờ phản hồi" và do Sở Tư pháp của người dùng tạo.<br>- Hệ thống mở [MH03 - Màn hình Thêm mới/Sửa kiến nghị xử lý vi phạm](#433105-mh03---màn-hình-thêm-mớisửa-kiến-nghị-xử-lý-vi-phạm) ở chế độ Sửa với dữ liệu hiện tại của bản ghi được điền sẵn. |
| 3 | Xóa | Button | Chỉ hiển thị khi bản ghi ở trạng thái "Đã gửi - Chờ phản hồi" và do Sở Tư pháp của người dùng tạo.<br>- Hệ thống mở [Popup Xác nhận](#433106-popup-xác-nhận); nếu người dùng chọn `Đồng ý`, hệ thống xóa bản ghi, đóng màn hình chi tiết và quay lại [MH01 - Màn hình Danh sách kiến nghị xử lý vi phạm](#433103-mh01---màn-hình-danh-sách-kiến-nghị-xử-lý-vi-phạm). |
| 4 | Đóng | Button | Khi người dùng click nút "Đóng" ở góc phải tiêu đề hoặc ở chân màn hình, hệ thống đóng màn hình chi tiết và quay lại [MH01 - Màn hình Danh sách kiến nghị xử lý vi phạm](#433103-mh01---màn-hình-danh-sách-kiến-nghị-xử-lý-vi-phạm). |

---

##### 4.3.3.10.5. MH03 - Màn hình Thêm mới/Sửa kiến nghị xử lý vi phạm

###### 4.3.3.10.5.1. Màn hình

![MH03 - Màn hình Thêm mới/Sửa kiến nghị xử lý vi phạm](images/UC481_482_MH03_Them_moi_sua_kien_nghi_xu_ly_vi_pham.png)

###### 4.3.3.10.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | - | - | Theo ngữ cảnh | Control UI: Label<br>Hiển thị "Thêm mới kiến nghị cơ quan có thẩm quyền xử lý vi phạm" hoặc "Sửa kiến nghị cơ quan có thẩm quyền xử lý vi phạm". |
| **I. Thông tin chung** |  |  |  |  |
| Trạng thái | - | - | Theo ngữ cảnh | Control UI: Label<br>Thêm mới hiển thị "Đang nhập"; Sửa hiển thị theo dữ liệu bản ghi. |
| Cán bộ xử lý | - | - | Theo tài khoản đăng nhập | Control UI: Label<br>Theo dữ liệu bản ghi. |
| Ngày tạo/cập nhật | - | - | Theo dữ liệu hệ thống | Control UI: Label<br>Định dạng `dd/mm/yyyy`. |
| Chế độ | - | - | Theo ngữ cảnh | Control UI: Label<br>Hiển thị "Thêm mới" hoặc "Sửa". |
| **II. Thông tin kiến nghị** |  |  |  |  |
| Vụ việc/Quyết định liên quan | String(255) | Không | Trống | Control UI: Text input kèm nút `Tìm kiếm` và `Tìm kiếm nâng cao`.<br>- Placeholder: "Nhập mã vụ việc hoặc số quyết định...".<br>- Khi click nút tìm kiếm, hệ thống mở [Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan - SRS Giải quyết yêu cầu bồi thường - Giải quyết bồi thường](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#433110-popup-chuẩn-tìm-kiếm-vụ-việchồ-sơ-gốc-liên-quan).<br>- Chỉ lưu bản ghi được chọn từ popup, thuộc phạm vi dữ liệu theo cấp của người dùng đăng nhập; khi người dùng gõ tay hoặc sửa nội dung ô, hệ thống bỏ liên kết đã chọn. |
| Liên kết vụ việc/QĐ gốc | Link | Không | Ẩn | Control UI: Text link.<br>- Chỉ hiển thị sau khi người dùng chọn bản ghi từ popup tìm kiếm hoặc khi mở lại bản ghi đã có liên kết.<br>- Hiển thị `Mã vụ việc/Số quyết định - Họ và tên người yêu cầu bồi thường`; khi click, hệ thống mở [MH05 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường - SRS Giải quyết yêu cầu bồi thường - Giải quyết bồi thường](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43317-mh05---màn-hình-xem-chi-tiết-hồ-sơ-yêu-cầu-bồi-thường) hoặc [MH03 - Màn hình Chi tiết Quyết định giải quyết bồi thường - SRS Quyết định giải quyết bồi thường - Giải quyết bồi thường](SRS_BTNN_GiaiQuyetBT_QuyetDinh_GQBT.md#43336-mh03---màn-hình-chi-tiết-quyết-định-giải-quyết-bồi-thường) ở chế độ chỉ xem. |
| Cơ quan nhận kiến nghị | Enum(String(255)) | Có | Trống | Control UI: Combobox.<br>- Tham chiếu Danh mục các đơn vị trên hệ thống [DM_DON_VI]. |
| Căn cứ phát sinh kiến nghị | Enum(String(255)) | Có | Trống | Control UI: Combobox.<br>Gồm (khoản 1 Điều 47 Nghị định hướng dẫn):<br>+ Theo yêu cầu của người yêu cầu bồi thường hoặc cá nhân, tổ chức có liên quan<br>+ Theo đề nghị của cơ quan nhà nước<br>+ Phát hiện vi phạm trong quá trình thực hiện việc quản lý nhà nước về công tác bồi thường |
| Ngày có căn cứ kiến nghị | Date | Có | Trống | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy".<br>- Ngày nhận yêu cầu, đề nghị hoặc ngày phát hiện vi phạm.<br>- Không lớn hơn ngày hiện tại theo [BR-VAL-008]. |
| Hạn ban hành văn bản kiến nghị | Date | - | Tự tính | Control UI: Text input (chỉ đọc).<br>- Placeholder: "Tự tính theo Ngày có căn cứ kiến nghị".<br>- Tính theo quy tắc thời hạn ban hành bên dưới. |
| Số văn bản kiến nghị | String(50) | Có | Trống | Control UI: Text input.<br>- Placeholder: "Nhập số văn bản kiến nghị...". |
| Ngày lập văn bản | Date | Có | Ngày hiện tại | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy".<br>- Không lớn hơn ngày hiện tại theo [BR-VAL-008]. |
| Người ký | String(100) | Có | Trống | Control UI: Text input.<br>- Placeholder: "Nhập người ký...". |
| Chức vụ | String(100) | Có | Trống | Control UI: Text input.<br>- Placeholder: "Nhập chức vụ...". |
| Căn cứ pháp lý kiến nghị | Text(1000) | Không | Khoản 3 Điều 73 Luật Trách nhiệm bồi thường của Nhà nước; Điều 47 Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Trách nhiệm bồi thường của Nhà nước | Control UI: Textarea.<br>- Placeholder: "Nhập căn cứ pháp lý kiến nghị...".<br>- Cho phép sửa giá trị mặc định. |
| Nội dung vi phạm phát hiện | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập nội dung vi phạm phát hiện...". |
| Nội dung kiến nghị | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập nội dung kiến nghị...". |
| **III. Tài liệu đính kèm** |  |  |  |  |
| Tài liệu đính kèm | List(File) | Không | Trống | Control UI: Bảng tài liệu đính kèm gồm các cột `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác`; nút `Thêm tài liệu` dưới bảng.<br>- Cột `Tên tài liệu, văn bản`: Text input. Placeholder: "Nhập tên tài liệu, văn bản".<br>- Cột `File đính kèm`: khi dòng chưa có file hiển thị nút `Tải file`; khi đã có file hiển thị tên file.<br>- Cột `Thao tác` gồm:<br>+ Xem file (khóa mờ khi dòng chưa có file)<br>+ Xóa<br>- Áp dụng [BR-FILE-010]. |

**Quy tắc thời hạn ban hành văn bản kiến nghị**

\- `Hạn ban hành văn bản kiến nghị` = `Ngày có căn cứ kiến nghị` + 02 ngày làm việc (không tính ngày nghỉ hằng tuần, ngày nghỉ lễ, Tết). Hệ thống tính lại ngay khi người dùng thay đổi `Ngày có căn cứ kiến nghị`; để trống khi chưa nhập ngày có căn cứ.

\- Khi `Ngày lập văn bản` lớn hơn `Hạn ban hành văn bản kiến nghị`, hệ thống hiển thị cảnh báo inline *"Văn bản kiến nghị ban hành quá thời hạn 02 ngày làm việc kể từ ngày có căn cứ."* ngay dưới ô `Ngày lập văn bản`. Cảnh báo không chặn lưu/gửi.

###### 4.3.3.10.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Gửi kiến nghị | Button | Hiển thị ở chế độ Thêm mới. Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001] (chưa nhập/chọn các trường có dấu `*`). Hệ thống viền đỏ các ô lỗi, hiển thị "Đây là trường bắt buộc" ngay dưới từng ô và focus vào ô lỗi đầu tiên. |
|  |  |  | **TH2 - Ngày không hợp lệ**: `Ngày có căn cứ kiến nghị` hoặc `Ngày lập văn bản` lớn hơn ngày hiện tại vi phạm [BR-VAL-008], hiển thị [MSG-ERR-VAL-008]; `Ngày lập văn bản` nhỏ hơn `Ngày có căn cứ kiến nghị` vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007]. Hệ thống không cho phép lưu/gửi. |
|  |  |  | **TH2a - Quá thời hạn ban hành**: `Ngày lập văn bản` lớn hơn `Hạn ban hành văn bản kiến nghị`: hệ thống hiển thị cảnh báo inline quá hạn và vẫn cho phép gửi. |
|  |  |  | **TH2b - Vụ việc liên quan chưa được chọn từ popup**: Ô tìm kiếm vụ việc/quyết định liên quan có dữ liệu nhưng không phải bản ghi đã chọn từ popup trong phạm vi dữ liệu theo cấp của người dùng. Hệ thống viền đỏ ô, hiển thị "Vụ việc chưa được chọn từ danh sách tìm kiếm. Vui lòng bấm Tìm kiếm để chọn vụ việc hoặc để trống." và không cho phép lưu/gửi. |
|  |  |  | **TH3 - Trùng bản ghi**: Bản ghi được xác định bởi các thông tin `Số văn bản kiến nghị`, `Ngày lập văn bản`. Nếu các thông tin này trùng với một bản ghi khác đang tồn tại, hệ thống viền đỏ các ô tương ứng, hiển thị cảnh báo "Văn bản kiến nghị đã tồn tại trong hệ thống (trùng Số văn bản kiến nghị và Ngày lập văn bản)" dưới ô `Số văn bản kiến nghị` và không cho phép lưu.<br>- So sánh sau khi bỏ khoảng trắng thừa, không phân biệt hoa thường.<br>- Ở chế độ Sửa, hệ thống bỏ qua chính bản ghi đang sửa. |
|  |  |  | **TH4 - Hợp lệ**: Hệ thống mở [Popup Xác nhận](#433106-popup-xác-nhận) với nội dung xác nhận gửi kiến nghị. Nếu người dùng chọn `Đồng ý`, hệ thống lưu bản ghi ở trạng thái "Đã gửi - Chờ phản hồi", ghi nhận ngày gửi là ngày hiện tại, đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-SYS-003]. |
| 2 | Lưu thông tin | Button | Hiển thị ở chế độ Sửa. Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001] (chưa nhập/chọn các trường có dấu `*`). Hệ thống viền đỏ các ô lỗi, hiển thị "Đây là trường bắt buộc" ngay dưới từng ô và focus vào ô lỗi đầu tiên. |
|  |  |  | **TH2 - Ngày không hợp lệ**: `Ngày có căn cứ kiến nghị` hoặc `Ngày lập văn bản` lớn hơn ngày hiện tại vi phạm [BR-VAL-008], hiển thị [MSG-ERR-VAL-008]; `Ngày lập văn bản` nhỏ hơn `Ngày có căn cứ kiến nghị` vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007]. Hệ thống không cho phép lưu/gửi. |
|  |  |  | **TH2a - Quá thời hạn ban hành**: `Ngày lập văn bản` lớn hơn `Hạn ban hành văn bản kiến nghị`: hệ thống hiển thị cảnh báo inline quá hạn và vẫn cho phép lưu. |
|  |  |  | **TH2b - Vụ việc liên quan chưa được chọn từ popup**: Ô tìm kiếm vụ việc/quyết định liên quan có dữ liệu nhưng không phải bản ghi đã chọn từ popup trong phạm vi dữ liệu theo cấp của người dùng. Hệ thống viền đỏ ô, hiển thị "Vụ việc chưa được chọn từ danh sách tìm kiếm. Vui lòng bấm Tìm kiếm để chọn vụ việc hoặc để trống." và không cho phép lưu/gửi. |
|  |  |  | **TH3 - Trùng bản ghi**: Bản ghi được xác định bởi các thông tin `Số văn bản kiến nghị`, `Ngày lập văn bản`. Nếu các thông tin này trùng với một bản ghi khác đang tồn tại, hệ thống viền đỏ các ô tương ứng, hiển thị cảnh báo "Văn bản kiến nghị đã tồn tại trong hệ thống (trùng Số văn bản kiến nghị và Ngày lập văn bản)" dưới ô `Số văn bản kiến nghị` và không cho phép lưu.<br>- So sánh sau khi bỏ khoảng trắng thừa, không phân biệt hoa thường.<br>- Ở chế độ Sửa, hệ thống bỏ qua chính bản ghi đang sửa. |
|  |  |  | **TH4 - Hợp lệ**: Hệ thống lưu thông tin đã sửa, giữ nguyên trạng thái "Đã gửi - Chờ phản hồi" và ngày gửi, đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-SYS-002]. |
| 3 | Tìm kiếm | Button | Hệ thống mở [Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan - SRS Giải quyết yêu cầu bồi thường - Giải quyết bồi thường](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#433110-popup-chuẩn-tìm-kiếm-vụ-việchồ-sơ-gốc-liên-quan), tự điền giá trị đang nhập vào tiêu chí tìm kiếm và hiển thị danh sách bản ghi phù hợp để người dùng chọn. |
| 4 | Tìm kiếm nâng cao | Button | Hệ thống mở [Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan - SRS Giải quyết yêu cầu bồi thường - Giải quyết bồi thường](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#433110-popup-chuẩn-tìm-kiếm-vụ-việchồ-sơ-gốc-liên-quan) với đầy đủ tiêu chí tìm kiếm nâng cao. |
| 5 | Liên kết vụ việc/QĐ gốc | Link | Hệ thống mở [MH05 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường - SRS Giải quyết yêu cầu bồi thường - Giải quyết bồi thường](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43317-mh05---màn-hình-xem-chi-tiết-hồ-sơ-yêu-cầu-bồi-thường) hoặc [MH03 - Màn hình Chi tiết Quyết định giải quyết bồi thường - SRS Quyết định giải quyết bồi thường - Giải quyết bồi thường](SRS_BTNN_GiaiQuyetBT_QuyetDinh_GQBT.md#43336-mh03---màn-hình-chi-tiết-quyết-định-giải-quyết-bồi-thường) ở chế độ chỉ xem. |
| 6 | Tải lên | Button | Hệ thống mở trình chọn file cho dòng tài liệu tương ứng; sau khi chọn, hiển thị tên file tại cột `File đính kèm`. |
| 7 | Xem file | Link | Hệ thống mở file của dòng tài liệu tại một tab trình duyệt mới. |
| 8 | Xóa | Icon button | Hệ thống xóa dòng tài liệu khỏi bảng ngay, không hiển thị popup xác nhận. |
| 9 | Thêm tài liệu | Button | Hệ thống thêm 01 dòng tài liệu trống vào cuối bảng tài liệu đính kèm. |
| 10 | Hủy bỏ | Button | Khi người dùng click nút "Hủy bỏ" ở chân màn hình hoặc nút "Đóng" ở góc phải tiêu đề, hệ thống đóng màn hình, không lưu dữ liệu và quay lại [MH01 - Màn hình Danh sách kiến nghị xử lý vi phạm](#433103-mh01---màn-hình-danh-sách-kiến-nghị-xử-lý-vi-phạm). |

---

##### 4.3.3.10.6. Popup Xác nhận

###### 4.3.3.10.6.1. Màn hình

![Popup Xác nhận](images/UC481_482_POPUP_Xac_nhan.png)

###### 4.3.3.10.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label<br>Hiển thị "Xác nhận". |
| Nội dung xác nhận | - | - | - | Control UI: Label<br>Theo thao tác, áp dụng [MSG-CFM-SYS-001]:<br>+ Gửi kiến nghị: "Bạn có chắc chắn muốn gửi kiến nghị này không?"<br>+ Xóa bản ghi/tài liệu: "Bạn có chắc chắn muốn xóa vĩnh viễn bản ghi này không?" |

###### 4.3.3.10.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đồng ý | Button | Hệ thống đóng popup và thực hiện thao tác:<br>+ Gửi kiến nghị: lưu bản ghi ở trạng thái "Đã gửi - Chờ phản hồi", ghi nhận ngày gửi là ngày hiện tại, đóng màn hình, tải lại danh sách và hiển thị [MSG-SUC-SYS-003].<br>+ Xóa bản ghi: xóa vĩnh viễn bản ghi, tải lại danh sách và hiển thị [MSG-SUC-SYS-002].<br>+ Xóa tài liệu đính kèm: xóa dòng tài liệu khỏi bảng. |
| 2 | Hủy bỏ | Button | Khi người dùng click nút "Hủy bỏ" hoặc biểu tượng đóng ở góc phải tiêu đề popup, hệ thống đóng popup và không thực hiện thao tác. |

---

##### 4.3.3.10.7. Popup Cập nhật kết quả phản hồi

###### 4.3.3.10.7.1. Màn hình

![Popup Cập nhật kết quả phản hồi](images/UC481_482_POPUP_Cap_nhat_phan_hoi.png)

###### 4.3.3.10.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | - | - | - | Control UI: Label<br>Hiển thị "Cập nhật kết quả phản hồi kiến nghị". |
| Ngày phản hồi | Date | Có | Ngày hiện tại | Control UI: Date input.<br>- Placeholder: "dd/mm/yyyy".<br>- Không lớn hơn ngày hiện tại theo [BR-VAL-008]. |
| Kết quả phản hồi | Enum(String(50)) | Có | Đã có phản hồi | Control UI: Combobox.<br>Gồm:<br>+ Đã có phản hồi<br>+ Đã thực hiện<br>+ Không thực hiện |
| Nội dung phản hồi | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập nội dung phản hồi/kết quả xử lý...".<br>- Ghi nội dung phản hồi/kết quả xử lý của cơ quan nhận kiến nghị. |
| Tài liệu phản hồi đính kèm | File | Không | Trống | Control UI: Button `Tải lên`.<br>- Áp dụng [BR-FILE-010]. |

###### 4.3.3.10.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001]. Hệ thống viền đỏ các ô lỗi, hiển thị "Đây là trường bắt buộc" ngay dưới từng ô và focus vào ô lỗi đầu tiên. |
|  |  |  | **TH2 - Ngày phản hồi không hợp lệ**: `Ngày phản hồi` lớn hơn ngày hiện tại, vi phạm [BR-VAL-008]. Hệ thống hiển thị [MSG-ERR-VAL-008] và không cho phép lưu. |
|  |  |  | **TH3 - Hợp lệ**: Hệ thống lưu kết quả phản hồi, cập nhật trạng thái bản ghi theo `Kết quả phản hồi` đã chọn, đóng popup, tải lại danh sách và hiển thị [MSG-SUC-SYS-002]. |
| 2 | Tải lên | Button | Hệ thống mở trình chọn file cho `Tài liệu phản hồi đính kèm`; áp dụng [BR-FILE-010]. |
| 3 | Hủy bỏ | Button | Khi người dùng click nút "Hủy bỏ" hoặc biểu tượng đóng ở góc phải tiêu đề popup, hệ thống đóng popup và không lưu dữ liệu. |
