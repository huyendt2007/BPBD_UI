﻿## 4.3.2. Dành cho Cán bộ nghiệp vụ tại Trung tâm đăng ký (TTĐK)

### 4.3.2.4. WebAdmin-024 - Ký duyệt Phiếu đăng ký

#### 4.3.2.4.1. Mục đích

- Cho phép Lãnh đạo TTĐK xem, đối chiếu và ký số/ký duyệt Phiếu đăng ký đã được Cán bộ trình ở trạng thái "Chờ ký".

- Lãnh đạo không có bước "Chờ duyệt/Chờ phê duyệt" riêng. Cán bộ là người kiểm tra, duyệt nghiệp vụ và trình hồ sơ sang "Chờ ký".

- Cho phép Lãnh đạo ký số file PDF chờ ký ở trạng thái "Chờ ký" bằng USB Token/chứng thư số hợp lệ; đối với trường hợp ký duyệt ngoài hệ thống, vẫn ghi nhận kết quả ký duyệt trên hồ sơ theo cấu hình nghiệp vụ.

- Hỗ trợ ký số một hoặc nhiều Phiếu đăng ký trong cùng một lần thao tác.

- Thống nhất cơ chế xem chi tiết bằng Row Click: Lãnh đạo click trực tiếp vào dòng dữ liệu trên lưới, ngoại trừ vùng checkbox/nút thao tác, để mở màn hình chi tiết Phiếu đăng ký.

- Tài liệu này chỉ áp dụng cho nhóm "Phiếu đăng ký". Không đặc tả nghiệp vụ "Yêu cầu cung cấp thông tin", "Yêu cầu cung cấp bản sao" hoặc "Yêu cầu cung cấp bản sao kèm thông báo".

*a. Phân quyền*

- Lãnh đạo được phân quyền ký số/ký duyệt Phiếu đăng ký.

- Lãnh đạo chỉ được xem, ký số/ký duyệt, từ chối hoặc trả lại hồ sơ thuộc đơn vị quản lý và phạm vi thẩm quyền tại trạng thái "Chờ ký".

- Hồ sơ được Cán bộ trình tới Lãnh đạo nào thì chỉ Lãnh đạo đó nhìn thấy và xử lý, trừ tài khoản có quyền giám sát/tra cứu thay theo cấu hình phân quyền.

- Lãnh đạo không được sửa dữ liệu Phiếu đăng ký, không được sửa nội dung file PDF và không được thay thế file PDF đã được Cán bộ trình.

*b. Điều kiện thực hiện*

- Lãnh đạo đã đăng nhập thành công vào Website Quản trị.

- Lãnh đạo được phân quyền truy cập menu "Biện pháp bảo đảm > Ký duyệt hồ sơ".

- Hồ sơ ký số/ký duyệt đang ở trạng thái "Chờ ký".

- Hồ sơ đã có file PDF dự thảo/chờ ký được Cán bộ trình và khóa phiên bản theo [BR-DK-026].

- Máy trạm của Lãnh đạo có thành phần ký số cục bộ và USB Token/chứng thư số hợp lệ để thực hiện ký số theo [BR-DK-034].

*c. Phạm vi Phiếu đăng ký*

- Nhóm Phiếu đăng ký bao gồm các loại hồ sơ đăng ký thuộc danh mục [DM_04]:

- "Đăng ký lần đầu".

- "Đăng ký thay đổi".

- "Xóa đăng ký".

- "Thông báo xử lý tài sản bảo đảm lần đầu".

- "Thay đổi thông báo xử lý tài sản bảo đảm".

- "Xóa đăng ký thông báo xử lý tài sản bảo đảm".

- Không bao gồm "Yêu cầu cung cấp thông tin", "Yêu cầu cung cấp bản sao" và "Yêu cầu cung cấp bản sao kèm thông báo".

*d. Nguyên tắc dữ liệu*

- Hệ thống chỉ cho phép Lãnh đạo ký số/ký duyệt đúng phiên bản dữ liệu và file PDF đã được Cán bộ trình, đang được khóa trong hồ sơ.

- File PDF trình ký/chờ ký có thể là:

- "Văn bản chứng nhận/Thông báo kết quả" theo Mẫu số 05d.

- "Văn bản từ chối" do Cán bộ lập và trình Lãnh đạo ký.

- Nếu Lãnh đạo từ chối hồ sơ đã thu tiền tại trạng thái "Chờ ký", hệ thống chuyển hồ sơ sang "Bị từ chối" và phát sinh luồng hoàn tiền/hoàn phí theo nguồn hồ sơ: Online theo dõi tại Module Quản lý đối soát thanh toán, hồ sơ giấy theo dõi tại Module Quản lý thu phí/hoàn phí hồ sơ giấy.

- Hồ sơ chỉ xuất hiện với Lãnh đạo khi đã ở trạng thái "Chờ ký"; các nghĩa vụ phí/miễn phí đã được xử lý trước đó theo nguồn hồ sơ.

- Nếu ký số thành công file "Văn bản chứng nhận/Thông báo kết quả", hồ sơ chuyển sang "Hoàn thành".

- Nếu ký số thành công file "Văn bản từ chối", hồ sơ chuyển sang "Bị từ chối".

- Nếu Lãnh đạo phát hiện hồ sơ/file trình ký chưa phù hợp nhưng còn có thể chỉnh sửa, Lãnh đạo thực hiện "Trả lại"; hồ sơ chuyển sang "Bị trả lại" để Cán bộ cập nhật và trình lại theo [BR-DK-035].

- Nếu Lãnh đạo quyết định không chấp thuận hồ sơ, Lãnh đạo thực hiện "Từ chối"; hồ sơ chuyển sang "Bị từ chối".

#### 4.3.2.4.2. UC-DK-LD.MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt (không áp dụng)

##### 4.3.2.4.2.1. Màn hình`r`n`r`n> Cập nhật theo Plan BTNN: màn hình này không còn hiển thị trên UI. Lãnh đạo chỉ xử lý Phiếu đăng ký tại danh sách "Chờ ký".

![Màn hình Danh sách Phiếu đăng ký chờ duyệt](images/UC_DK_LD_MH01_Danh_sach_Phieu_dang_ky_cho_duyet.png)

##### 4.3.2.4.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab nhóm nghiệp vụ** | | | | |
| Phiếu đăng ký | Enum(String(50)) | Có | "Phiếu đăng ký" | Tab đang được đặc tả trong tài liệu này. Chỉ hiển thị các hồ sơ thuộc nhóm Phiếu đăng ký tại mục 4.3.2.4.1.c. |
| Yêu cầu cung cấp thông tin | Enum(String(50)) | Không | Không chọn | Không thuộc phạm vi tài liệu này. Hiển thị theo tài liệu SRS ký duyệt Yêu cầu cung cấp thông tin của Lãnh đạo. |
| Yêu cầu cung cấp bản sao | Enum(String(50)) | Không | Không chọn | Không thuộc phạm vi tài liệu này. Hiển thị theo tài liệu SRS ký duyệt Yêu cầu cung cấp bản sao của Lãnh đạo. |
| **II. Bộ lọc tìm kiếm** | | | | |
| Tìm kiếm | String(255) | Không | Trống | Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ, Số đăng ký, Mã PIN, Tên bên bảo đảm hoặc Tên bên nhận bảo đảm. |
| Mã khách hàng | String(50) | Không | Trống | Tìm kiếm gần đúng theo Mã khách hàng nộp hồ sơ. |
| Cán bộ trình ký | String(255) | Không | Trống | Tìm kiếm gần đúng theo Cán bộ đã trình ký hồ sơ. |
| Lãnh đạo ký | String(255) | Không | Lãnh đạo đăng nhập | - Cho phép tìm kiếm gần đúng theo tên Lãnh đạo được phân công ký.<br>- Hiển thị thông tin Lãnh đạo được phép ký/duyệt của đơn vị tại Cấu hình thông tin về người ký.<br>- Mặc định giới hạn theo Lãnh đạo đang đăng nhập.<br>- Chỉ vai trò được phân quyền giám sát/tra cứu thay mới được nhập tên Lãnh đạo khác theo phạm vi thẩm quyền. |
| Loại đăng ký | Enum(String(50)) | Không | "Tất cả" | Tham chiếu [DM_04]. Chỉ lọc trong phạm vi nhóm Phiếu đăng ký. |
| Loại hình giao dịch | Enum(String(50)) | Không | "Tất cả" | Tham chiếu [DM_01]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | "Tất cả" | Tham chiếu [DM_02] hoặc [DM_03] theo Loại hình giao dịch đã chọn. |
| Loại tài sản bảo đảm | Enum(String(255)) | Không | "Tất cả" | Tham chiếu [DM_07]. |
| Nguồn tiếp nhận | Enum(String(50)) | Không | "Tất cả" | Giá trị gồm:<br>+ "Tất cả".<br>+ "Khách hàng".<br>+ "Cán bộ nhập liệu". |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Lọc theo Thời điểm đăng ký. Tuân thủ [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Lọc theo Thời điểm đăng ký. Tuân thủ [BR-VAL-007]. |
| **III. Bảng danh sách Phiếu đăng ký chờ duyệt** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Bảng danh sách Phiếu đăng ký chờ duyệt | Text(4000) | Không | 20 bản ghi/trang | Chỉ hiển thị Phiếu đăng ký ở trạng thái "Chờ duyệt", thuộc phạm vi duyệt của Lãnh đạo đăng nhập và đã được Cán bộ trình tới Lãnh đạo đó. Sắp xếp mặc định theo Thời điểm trình ký tăng dần. Click trực tiếp vào dòng dữ liệu, ngoại trừ vùng checkbox/nút thao tác, để mở **4.3.2.4.3. UC-DK-LD.MH02 - Màn hình Chi tiết Phiếu đăng ký chờ duyệt**. Không thiết kế icon "Xem chi tiết" riêng theo quy tắc Row Click dùng chung.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Checkbox chọn | Boolean | Không | Không tích | Cho phép chọn một hoặc nhiều hồ sơ đủ điều kiện để duyệt theo lô. Checkbox chọn tất cả tại tiêu đề bảng chỉ chọn các hồ sơ đủ điều kiện đang hiển thị trên trang hiện tại. |
| STT | Integer(10) | Không | Tự tăng | Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Thời điểm hồ sơ được hệ thống ghi nhận. Cho phép click tiêu đề cột để đổi chiều sắp xếp. |
| Số đăng ký/Mã hồ sơ | String(50) | Có | Theo hồ sơ | Số đăng ký hoặc Mã hồ sơ của Phiếu đăng ký. Click vào giá trị xử lý tương tự Row Click và mở **4.3.2.4.3. UC-DK-LD.MH02 - Màn hình Chi tiết Phiếu đăng ký chờ duyệt**. |
| Mã PIN | String(20) | Không | Theo hồ sơ | Hiển thị Mã PIN bảo mật của hồ sơ nếu đã phát sinh. |
| Tên bên bảo đảm | String(255) | Không | Theo hồ sơ | Hiển thị tên bên bảo đảm trong hồ sơ. |
| Tên bên nhận bảo đảm | String(255) | Không | Theo hồ sơ | Hiển thị tên bên nhận bảo đảm trong hồ sơ. |
| Loại đăng ký | Enum(String(50)) | Có | Theo hồ sơ | Tham chiếu [DM_04]. |
| Loại hình giao dịch | Enum(String(50)) | Có | Theo hồ sơ | Tham chiếu [DM_01]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | Theo hồ sơ | Tham chiếu [DM_02] nếu Loại hình giao dịch là "Biện pháp bảo đảm"; tham chiếu [DM_03] nếu Loại hình giao dịch là "Hợp đồng". |
| Loại tài sản | Enum(String(255)) | Không | Theo hồ sơ | Tham chiếu [DM_07]. Nếu hồ sơ có nhiều Loại tài sản, hiển thị mỗi Loại tài sản trên một dòng riêng trong cùng ô. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Hiển thị Mã khách hàng nộp hồ sơ nếu có. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | Giá trị gồm:<br>+ "Khách hàng".<br>+ "Cán bộ nhập liệu". |
| Cán bộ trình ký | String(255) | Có | Theo hồ sơ | Cán bộ đã trình ký hồ sơ. |
| Thời điểm trình ký | Datetime | Có | Theo hồ sơ | Thời điểm Cán bộ trình ký thành công. |
| Có phát sinh nghĩa vụ phí | Boolean | Có | Theo hồ sơ/biểu phí | Không áp dụng tại màn chờ duyệt cũ. Nghĩa vụ phí đã được xử lý trước khi hồ sơ vào "Chờ ký" của Lãnh đạo. |
| Trạng thái | Enum(String(50)) | Có | "Chờ duyệt" | Chỉ đọc. Tại màn hình này chỉ hiển thị hồ sơ ở trạng thái "Chờ duyệt". |
| Thao tác | String(255) | Không | Theo quyền | Việc xem chi tiết thực hiện bằng Row Click. Hiển thị các nút nghiệp vụ theo thứ tự:<br>+ "Duyệt".<br>+ "Từ chối". |

##### 4.3.2.4.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Điều kiện ngày không hợp lệ): Nếu Từ ngày lớn hơn Đến ngày, vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
|  |  |  | TH2 (Không có dữ liệu phù hợp): Hệ thống hiển thị trạng thái rỗng ngay trong vùng bảng danh sách với nội dung "Không có hồ sơ nào ở trạng thái này hoặc phù hợp với điều kiện tìm kiếm."; không hiển thị dòng dữ liệu giả, không reset bộ lọc đã nhập. |
|  |  |  | TH Hợp lệ: Hệ thống tìm kiếm theo bộ lọc hiện hành trong phạm vi Phiếu đăng ký thuộc quyền ký của Lãnh đạo và tải lại bảng danh sách theo kết quả tìm kiếm. |
| 2 | Xóa bộ lọc | Nút | Xóa toàn bộ tiêu chí lọc, đưa Loại đăng ký/Loại hình giao dịch/Loại biện pháp hoặc Hợp đồng/Loại tài sản/Nguồn tiếp nhận về "Tất cả", Từ ngày/Đến ngày về mặc định và tải lại danh sách hồ sơ "Chờ duyệt". |
| 3 | Duyệt | Nút/Icon | TH1 (Chưa chọn bản ghi khi thao tác lô): Vi phạm [BR-DK-024], hiển thị [MSG-ERR-DK-008], không thực hiện duyệt. |
|  |  |  | TH2 (Hồ sơ không còn ở trạng thái "Chờ duyệt", Lãnh đạo không có quyền ký hoặc file PDF dự thảo không hợp lệ): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005] hoặc [MSG-ERR-DK-010], không thực hiện duyệt. |
|  |  |  | Không áp dụng theo Plan BTNN. Lãnh đạo không thực hiện duyệt tại màn này. |
|  |  |  | TH Hợp lệ thao tác theo lô: Hệ thống kiểm tra toàn bộ danh sách hồ sơ đã chọn. Khi tất cả hồ sơ hợp lệ, hệ thống duyệt từng hồ sơ, chuyển trạng thái theo nghĩa vụ phí của từng hồ sơ và ghi nhận kết quả độc lập. |
| 4 | Từ chối | Nút/Icon | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005], không mở popup. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.4.4. UC-DK-LD.MH03 - Popup Từ chối Phiếu đăng ký chờ duyệt**. |
| 5 | Click dòng dữ liệu | Row Click | Mở **4.3.2.4.3. UC-DK-LD.MH02 - Màn hình Chi tiết Phiếu đăng ký chờ duyệt**. Đây là phương thức chính để xem chi tiết hồ sơ trên lưới, ngoại trừ khi Lãnh đạo click trực tiếp vào checkbox hoặc các nút thao tác nghiệp vụ. |

#### 4.3.2.4.3. UC-DK-LD.MH02 - Màn hình Chi tiết Phiếu đăng ký chờ duyệt (không áp dụng)

##### 4.3.2.4.3.1. Màn hình`r`n`r`n> Cập nhật theo Plan BTNN: màn hình này không còn hiển thị trên UI. Chi tiết hồ sơ của Lãnh đạo chỉ mở từ danh sách "Chờ ký".

![Màn hình Chi tiết Phiếu đăng ký chờ duyệt](images/UC_DK_LD_MH02_Chi_tiet_Phieu_dang_ky_cho_duyet.png)

##### 4.3.2.4.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ** | | | | |
| Số hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. Mã hồ sơ/số đăng ký của Phiếu đăng ký đang xem. |
| Trạng thái | Enum(String(50)) | Có | "Chờ duyệt" | Chỉ đọc. Hiển thị nổi bật theo trạng thái hiện tại của hồ sơ. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ có Mã khách hàng. |
| Mã PIN | String(20) | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ đã phát sinh Mã PIN. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. Thời điểm hồ sơ được hệ thống ghi nhận. |
| Loại đăng ký | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_04]. |
| Loại hình giao dịch | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_01]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_02] hoặc [DM_03] theo Loại hình giao dịch. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị "Khách hàng" hoặc "Cán bộ nhập liệu". |
| Cán bộ trình ký | String(255) | Có | Theo hồ sơ | Chỉ đọc. Cán bộ đã trình ký hồ sơ. |
| Thời điểm trình ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. Thời điểm Cán bộ trình ký thành công. |
| Lãnh đạo ký | String(255) | Có | Lãnh đạo đăng nhập | - Chỉ đọc.<br>- Lãnh đạo được Cán bộ chọn khi trình ký.<br>- Thông tin Lãnh đạo ký được xác định từ danh sách Lãnh đạo được phép ký/duyệt của đơn vị tại Cấu hình thông tin về người ký. |
| Có phát sinh nghĩa vụ phí | Boolean | Có | Theo hồ sơ/biểu phí | Không áp dụng tại màn chờ duyệt cũ. Nghĩa vụ phí đã được xử lý trước khi hồ sơ vào "Chờ ký" của Lãnh đạo. |
| **II. Trục vòng đời giao dịch** | | | | |
| Danh sách phiên bản hồ sơ | Text(4000) | Không | Theo hồ sơ | Hiển thị giống hệt **I. SIDEBAR: DÒNG THỜI GIAN LỊCH SỬ** tại [UCPS003.MH01 - Màn hình Phiếu đăng ký - Xem chi tiết dành cho Khách hàng](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet). Khi Lãnh đạo mở hồ sơ từ danh sách duyệt, hệ thống tự động chọn đúng phiên bản/bản ghi tương ứng với hồ sơ đang mở xử lý trên Timeline. Phiên bản/bản ghi đang mở xử lý phải được tô nổi bật trên Timeline. |
| Chỉ hiển thị vùng dữ liệu có biến động | Boolean | Không | Không tích | Hiển thị và xử lý giống hệt trường **Chỉ hiển thị vùng dữ liệu có biến động** tại [UCPS003.MH01](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet). |
| **III. Nhật ký phê duyệt nội bộ** | | | | |
| Nhật ký phê duyệt nội bộ | Text(4000) | Không | Theo hồ sơ | Chỉ đọc. Hiển thị lịch sử thao tác nội bộ: tiếp nhận, cập nhật, duyệt, hủy duyệt, trình ký, trả lại, từ chối, ký số và các thay đổi trạng thái. |
| **IV. Khu vực chi tiết Phiếu đăng ký** | | | | |
| Khung đối chiếu dữ liệu chi tiết | Text(4000) | Có | Theo phiên bản/bản ghi đang mở xử lý | Hiển thị giống hệt **III. KHUNG ĐỐI CHIẾU DỮ LIỆU CHI TIẾT** tại [UCPS003.MH01 - Màn hình Phiếu đăng ký - Xem chi tiết dành cho Khách hàng](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet). Toàn bộ dữ liệu trong khung ở trạng thái chỉ đọc. |
| **V. File PDF dự thảo trình ký** | | | | |
| File PDF dự thảo | File | Có | Theo hồ sơ | Chỉ đọc. Phiên bản file PDF đã được Cán bộ trình ký và khóa trong hồ sơ. Cho phép xem file tại một tab riêng. |
| Phiên bản file | String(50) | Có | Theo hồ sơ | Chỉ đọc. Phiên bản file PDF đang được trình ký. |
| Người tạo file | String(255) | Có | Theo hồ sơ | Chỉ đọc. Người tạo file PDF dự thảo. |
| Thời điểm tạo file | Datetime | Có | Theo hồ sơ | Chỉ đọc. Thời điểm hệ thống sinh file PDF dự thảo. |
| **VI. Thanh nút chức năng trên màn hình chi tiết** | | | | |
| Nút tại hồ sơ trạng thái "Chờ duyệt" | Text(1000) | Không | Theo trạng thái hồ sơ | Hiển thị tại cuối màn hình chi tiết, theo thứ tự từ trái sang phải:<br>+ "Quay lại".<br>+ "Từ chối".<br>+ "Duyệt". |

##### 4.3.2.4.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | Quay lại **4.3.2.4.2. UC-DK-LD.MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt**, giữ nguyên bộ lọc và trang dữ liệu trước đó. |
| 2 | Xem file | Link/Nút | Cho phép xem file PDF dự thảo tại một tab riêng. |
| 3 | Duyệt | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt", Lãnh đạo không có quyền ký hoặc file PDF dự thảo không hợp lệ): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005] hoặc [MSG-ERR-DK-010], không thực hiện duyệt. |
|  |  |  | Không áp dụng theo Plan BTNN. Lãnh đạo không thực hiện duyệt tại màn này. |
| 4 | Từ chối | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ duyệt" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005], không mở popup. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.4.4. UC-DK-LD.MH03 - Popup Từ chối Phiếu đăng ký chờ duyệt**. |

#### 4.3.2.4.4. UC-DK-LD.MH03 - Popup Từ chối Phiếu đăng ký chờ duyệt (không áp dụng)

##### 4.3.2.4.4.1. Màn hình`r`n`r`n> Cập nhật theo Plan BTNN: popup này không còn hiển thị trên UI. Từ chối của Lãnh đạo thực hiện tại trạng thái "Chờ ký".

![Popup Từ chối Phiếu đăng ký chờ duyệt](images/UC_DK_LD_MH03_Popup_tu_choi_Phieu_dang_ky_cho_duyet.png)

##### 4.3.2.4.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ/Số đăng ký | String(50) | Có | Theo hồ sơ | Chỉ đọc. |
| Loại đăng ký | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_04]. |
| Loại hình giao dịch | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_01]. |
| Người yêu cầu | String(255) | Không | Theo hồ sơ | Chỉ đọc. |
| Cán bộ trình ký | String(255) | Có | Theo hồ sơ | Chỉ đọc. |
| Thời điểm trình ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. |
| File PDF dự thảo | File | Có | Theo hồ sơ | Chỉ đọc. File PDF đã được Cán bộ trình ký và đang chờ Lãnh đạo ký. |
| Lý do từ chối | Text(2000) | Có | Trống | Lãnh đạo bắt buộc nhập lý do từ chối. Hệ thống tự động trim space theo [BR-VAL-001]. |

##### 4.3.2.4.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại giao diện trước đó. |
| 2 | Xác nhận từ chối | Nút | TH1 (Bỏ trống Lý do từ chối): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép xác nhận. |
|  |  |  | TH2 (Hồ sơ không còn ở trạng thái "Chờ duyệt" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005], không cho phép xác nhận. |
|  |  |  | TH Hợp lệ: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-015]. Sau khi Lãnh đạo xác nhận, hệ thống lưu người từ chối, thời điểm từ chối, lý do từ chối, file PDF dự thảo, phiên bản dữ liệu/PDF bị từ chối; chuyển hồ sơ sang "Bị từ chối"; hiển thị [MSG-SUC-DK-KT-003]. |

#### 4.3.2.4.5. UC-DK-LD.MH04 - Màn hình Danh sách Phiếu đăng ký chờ ký

##### 4.3.2.4.5.1. Màn hình

![Màn hình Danh sách Phiếu đăng ký chờ ký](images/UC_DK_LD_MH04_Danh_sach_Phieu_dang_ky_cho_ky.png)

##### 4.3.2.4.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab nhóm nghiệp vụ** | | | | |
| Phiếu đăng ký | Enum(String(50)) | Có | "Phiếu đăng ký" | Tab đang được đặc tả trong tài liệu này. Chỉ hiển thị các hồ sơ thuộc nhóm Phiếu đăng ký tại mục 4.3.2.4.1.c. |
| Yêu cầu cung cấp thông tin | Enum(String(50)) | Không | Không chọn | Không thuộc phạm vi tài liệu này. Hiển thị theo tài liệu SRS ký duyệt Yêu cầu cung cấp thông tin của Lãnh đạo. |
| Yêu cầu cung cấp bản sao | Enum(String(50)) | Không | Không chọn | Không thuộc phạm vi tài liệu này. Hiển thị theo tài liệu SRS ký duyệt Yêu cầu cung cấp bản sao của Lãnh đạo. |
| **II. Bộ lọc tìm kiếm** | | | | |
| Tìm kiếm | String(255) | Không | Trống | Tìm kiếm gần đúng, không phân biệt hoa thường, tự động trim space theo Mã hồ sơ, Số đăng ký, Mã PIN, Tên bên bảo đảm hoặc Tên bên nhận bảo đảm. |
| Mã khách hàng | String(50) | Không | Trống | Tìm kiếm gần đúng theo Mã khách hàng nộp hồ sơ. |
| Cán bộ trình ký | String(255) | Không | Trống | Tìm kiếm gần đúng theo Cán bộ đã trình ký hồ sơ. |
| Lãnh đạo ký | String(255) | Không | Lãnh đạo đăng nhập | - Cho phép tìm kiếm gần đúng theo tên Lãnh đạo được phân công ký.<br>- Thông tin Lãnh đạo ký được xác định từ danh sách Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>- Mặc định giới hạn theo Lãnh đạo đang đăng nhập.<br>- Chỉ vai trò được phân quyền giám sát/tra cứu thay mới được nhập tên Lãnh đạo khác theo phạm vi thẩm quyền. |
| Loại đăng ký | Enum(String(50)) | Không | "Tất cả" | Tham chiếu [DM_04]. Chỉ lọc trong phạm vi nhóm Phiếu đăng ký. |
| Loại hình giao dịch | Enum(String(50)) | Không | "Tất cả" | Tham chiếu [DM_01]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | "Tất cả" | Tham chiếu [DM_02] hoặc [DM_03] theo Loại hình giao dịch đã chọn. |
| Loại tài sản bảo đảm | Enum(String(255)) | Không | "Tất cả" | Tham chiếu [DM_07]. |
| Nguồn tiếp nhận | Enum(String(50)) | Không | "Tất cả" | Giá trị gồm:<br>+ "Tất cả".<br>+ "Khách hàng".<br>+ "Cán bộ nhập liệu". |
| Từ ngày | Date | Không | Ngày 01 của tháng hiện tại | Lọc theo Thời điểm đăng ký. Tuân thủ [BR-VAL-007]. |
| Đến ngày | Date | Không | Ngày hiện tại | Lọc theo Thời điểm đăng ký. Tuân thủ [BR-VAL-007]. |
| **III. Bảng danh sách Phiếu đăng ký chờ ký** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Bảng danh sách Phiếu đăng ký chờ ký | Text(4000) | Không | 20 bản ghi/trang | Chỉ hiển thị Phiếu đăng ký ở trạng thái "Chờ ký", thuộc phạm vi ký của Lãnh đạo đăng nhập và đã được Cán bộ trình tới Lãnh đạo đó. Sắp xếp mặc định theo Thời điểm chuyển sang "Chờ ký" tăng dần. Click trực tiếp vào dòng dữ liệu, ngoại trừ vùng checkbox/nút thao tác, để mở **4.3.2.4.6. UC-DK-LD.MH05 - Màn hình Chi tiết Phiếu đăng ký chờ ký**. Không thiết kế icon "Xem chi tiết" riêng theo quy tắc Row Click dùng chung.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| Checkbox chọn | Boolean | Không | Không tích | Cho phép chọn một hoặc nhiều hồ sơ đủ điều kiện để ký số theo lô. Checkbox chọn tất cả tại tiêu đề bảng chỉ chọn các hồ sơ đủ điều kiện đang hiển thị trên trang hiện tại. Khi đổi Tab nhóm nghiệp vụ, bộ lọc, trang dữ liệu hoặc số bản ghi/trang, hệ thống xóa danh sách hồ sơ đã chọn. |
| STT | Integer(10) | Không | Tự tăng | Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Thời điểm hồ sơ được hệ thống ghi nhận. |
| Số đăng ký/Mã hồ sơ | String(50) | Có | Theo hồ sơ | Số đăng ký hoặc Mã hồ sơ của Phiếu đăng ký. Click vào giá trị xử lý tương tự Row Click và mở **4.3.2.4.6. UC-DK-LD.MH05 - Màn hình Chi tiết Phiếu đăng ký chờ ký**. |
| Mã PIN | String(20) | Không | Theo hồ sơ | Hiển thị Mã PIN bảo mật của hồ sơ nếu đã phát sinh. |
| Tên bên bảo đảm | String(255) | Không | Theo hồ sơ | Hiển thị tên bên bảo đảm trong hồ sơ. |
| Tên bên nhận bảo đảm | String(255) | Không | Theo hồ sơ | Hiển thị tên bên nhận bảo đảm trong hồ sơ. |
| Loại đăng ký | Enum(String(50)) | Có | Theo hồ sơ | Tham chiếu [DM_04]. |
| Loại hình giao dịch | Enum(String(50)) | Có | Theo hồ sơ | Tham chiếu [DM_01]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | Theo hồ sơ | Tham chiếu [DM_02] nếu Loại hình giao dịch là "Biện pháp bảo đảm"; tham chiếu [DM_03] nếu Loại hình giao dịch là "Hợp đồng". |
| Loại tài sản | Enum(String(255)) | Không | Theo hồ sơ | Tham chiếu [DM_07]. Nếu hồ sơ có nhiều Loại tài sản, hiển thị mỗi Loại tài sản trên một dòng riêng trong cùng ô. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Hiển thị Mã khách hàng nộp hồ sơ nếu có. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | Giá trị gồm:<br>+ "Khách hàng".<br>+ "Cán bộ nhập liệu". |
| Cán bộ trình ký | String(255) | Có | Theo hồ sơ | Cán bộ đã trình ký hồ sơ. |
| Thời điểm trình ký | Datetime | Có | Theo hồ sơ | Thời điểm Cán bộ trình ký thành công hoặc thời điểm hồ sơ được chuyển sang "Chờ ký" sau thanh toán. |
| Loại file chờ ký | Enum(String(100)) | Có | Theo hồ sơ | Giá trị gồm:<br>+ "Văn bản chứng nhận/Thông báo kết quả".<br>+ "Văn bản từ chối". |
| Trạng thái | Enum(String(50)) | Có | "Chờ ký" | Chỉ đọc. Tại màn hình này chỉ hiển thị hồ sơ ở trạng thái "Chờ ký". |
| Thao tác | String(255) | Không | Theo quyền | Việc xem chi tiết thực hiện bằng Row Click. Hiển thị các nút nghiệp vụ theo thứ tự:<br>+ "Ký số".<br>+ "Từ chối".<br>+ "Trả lại". |

##### 4.3.2.4.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | TH1 (Điều kiện ngày không hợp lệ): Nếu Từ ngày lớn hơn Đến ngày, vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
|  |  |  | TH2 (Không có dữ liệu phù hợp): Hệ thống hiển thị trạng thái rỗng ngay trong vùng bảng danh sách với nội dung "Không có hồ sơ nào ở trạng thái này hoặc phù hợp với điều kiện tìm kiếm."; không hiển thị dòng dữ liệu giả, không reset bộ lọc đã nhập. |
|  |  |  | TH Hợp lệ: Hệ thống tìm kiếm theo bộ lọc hiện hành trong phạm vi Phiếu đăng ký thuộc quyền ký của Lãnh đạo và tải lại bảng danh sách theo kết quả tìm kiếm. |
| 2 | Xóa bộ lọc | Nút | Xóa toàn bộ tiêu chí lọc, đưa Loại đăng ký/Loại hình giao dịch/Loại biện pháp hoặc Hợp đồng/Loại tài sản/Nguồn tiếp nhận về "Tất cả", Từ ngày/Đến ngày về mặc định và tải lại danh sách hồ sơ "Chờ ký". |
| 3 | Ký số | Nút/Icon | TH1 (Chưa chọn bản ghi khi thao tác lô): Vi phạm [BR-DK-024], hiển thị [MSG-ERR-DK-008], không mở popup ký số. |
|  |  |  | TH2 (Hồ sơ không còn ở trạng thái "Chờ ký", Lãnh đạo không có quyền ký hoặc file PDF chờ ký không hợp lệ): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005] hoặc [MSG-ERR-DK-010], không mở popup ký số. |
|  |  |  | TH Hợp lệ thao tác dòng: Mở **4.3.2.4.7. UC-DK-LD.MH06 - Popup Ký số Phiếu đăng ký** ở chế độ ký một hồ sơ. |
|  |  |  | TH Hợp lệ thao tác theo lô: Hệ thống kiểm tra danh sách hồ sơ đã chọn. Khi tất cả hồ sơ hợp lệ, mở **4.3.2.4.7. UC-DK-LD.MH06 - Popup Ký số Phiếu đăng ký** ở chế độ ký nhiều hồ sơ. |
| 4 | Từ chối | Nút/Icon | TH1 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005], không mở popup. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.4.8. UC-DK-LD.MH07 - Popup Từ chối/Trả lại Phiếu đăng ký chờ ký** với Loại xử lý mặc định là "Từ chối". |
| 5 | Trả lại | Nút/Icon | TH1 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-035], hiển thị [MSG-ERR-DK-005], không mở popup. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.4.8. UC-DK-LD.MH07 - Popup Từ chối/Trả lại Phiếu đăng ký chờ ký** với Loại xử lý mặc định là "Trả lại". |
| 6 | Click dòng dữ liệu | Row Click | Mở **4.3.2.4.6. UC-DK-LD.MH05 - Màn hình Chi tiết Phiếu đăng ký chờ ký**. Đây là phương thức chính để xem chi tiết hồ sơ trên lưới, ngoại trừ khi Lãnh đạo click trực tiếp vào checkbox hoặc các nút thao tác nghiệp vụ. |

#### 4.3.2.4.6. UC-DK-LD.MH05 - Màn hình Chi tiết Phiếu đăng ký chờ ký

##### 4.3.2.4.6.1. Màn hình

![Màn hình Chi tiết Phiếu đăng ký chờ ký](images/UC_DK_LD_MH05_Chi_tiet_Phieu_dang_ky_cho_ky.png)

##### 4.3.2.4.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ** | | | | |
| Số hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. Mã hồ sơ/số đăng ký của Phiếu đăng ký đang xem. |
| Trạng thái | Enum(String(50)) | Có | "Chờ ký" | Chỉ đọc. Hiển thị nổi bật theo trạng thái hiện tại của hồ sơ. |
| Mã khách hàng | String(50) | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ có Mã khách hàng. |
| Mã PIN | String(20) | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ đã phát sinh Mã PIN. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. Thời điểm hồ sơ được hệ thống ghi nhận. |
| Loại đăng ký | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_04]. |
| Loại hình giao dịch | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_01]. |
| Loại biện pháp / Hợp đồng | Enum(String(50)) | Không | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_02] hoặc [DM_03] theo Loại hình giao dịch. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị "Khách hàng" hoặc "Cán bộ nhập liệu". |
| Cán bộ trình ký | String(255) | Có | Theo hồ sơ | Chỉ đọc. Cán bộ đã trình ký hồ sơ hoặc Cán bộ xử lý trước khi hồ sơ chuyển sang "Chờ ký". |
| Thời điểm trình ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. Thời điểm Cán bộ trình ký thành công hoặc thời điểm hồ sơ được chuyển sang "Chờ ký" sau thanh toán. |
| Lãnh đạo ký | String(255) | Có | Lãnh đạo đăng nhập | - Chỉ đọc.<br>- Lãnh đạo được Cán bộ chọn khi trình ký hoặc Lãnh đạo đã duyệt trước đó.<br>- Thông tin Lãnh đạo ký được xác định từ danh sách Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký. |
| **II. Trục vòng đời giao dịch** | | | | |
| Danh sách phiên bản hồ sơ | Text(4000) | Không | Theo hồ sơ | Hiển thị giống hệt **I. SIDEBAR: DÒNG THỜI GIAN LỊCH SỬ** tại [UCPS003.MH01 - Màn hình Phiếu đăng ký - Xem chi tiết dành cho Khách hàng](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet). Khi Lãnh đạo mở hồ sơ từ danh sách ký, hệ thống tự động chọn đúng phiên bản/bản ghi tương ứng với hồ sơ đang mở xử lý trên Timeline. Phiên bản/bản ghi đang mở xử lý phải được tô nổi bật trên Timeline. |
| Chỉ hiển thị vùng dữ liệu có biến động | Boolean | Không | Không tích | Hiển thị và xử lý giống hệt trường **Chỉ hiển thị vùng dữ liệu có biến động** tại [UCPS003.MH01](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet). |
| **III. Nhật ký phê duyệt nội bộ** | | | | |
| Nhật ký phê duyệt nội bộ | Text(4000) | Không | Theo hồ sơ | Chỉ đọc. Hiển thị lịch sử thao tác nội bộ: tiếp nhận, cập nhật, duyệt, hủy duyệt, trình ký, trả lại, từ chối, ký số và các thay đổi trạng thái. |
| **IV. Khu vực chi tiết Phiếu đăng ký** | | | | |
| Khung đối chiếu dữ liệu chi tiết | Text(4000) | Có | Theo phiên bản/bản ghi đang mở xử lý | Hiển thị giống hệt **III. KHUNG ĐỐI CHIẾU DỮ LIỆU CHI TIẾT** tại [UCPS003.MH01 - Màn hình Phiếu đăng ký - Xem chi tiết dành cho Khách hàng](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet). Toàn bộ dữ liệu trong khung ở trạng thái chỉ đọc. |
| Thông tin bổ sung đối với phiên bản bị từ chối | Text(4000) | Tùy điều kiện | Theo phiên bản đang chọn | Hiển thị giống hệt **IV. THÔNG TIN BỔ SUNG ĐỐI VỚI PHIÊN BẢN BỊ TỪ CHỐI** tại [UCPS003.MH01](../../01_Website_Khach_hang/SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet). Chỉ hiển thị khi phiên bản đang chọn trên Timeline có trạng thái "Bị từ chối". |
| **V. File PDF chờ ký** | | | | |
| Loại file chờ ký | Enum(String(100)) | Có | Theo hồ sơ | Giá trị gồm:<br>+ "Văn bản chứng nhận/Thông báo kết quả".<br>+ "Văn bản từ chối". |
| File PDF chờ ký | File | Có | Theo hồ sơ | Chỉ đọc. Phiên bản file PDF đã được Cán bộ trình ký và khóa trong hồ sơ. Cho phép xem file tại một tab riêng. |
| Phiên bản file | String(50) | Có | Theo hồ sơ | Chỉ đọc. Phiên bản file PDF đang chờ ký. |
| Người tạo file | String(255) | Có | Theo hồ sơ | Chỉ đọc. Người tạo file PDF dự thảo. |
| Thời điểm tạo file | Datetime | Có | Theo hồ sơ | Chỉ đọc. Thời điểm hệ thống sinh file PDF dự thảo. |
| Checksum/Hash file | String(255) | Không | Theo hệ thống | Chỉ đọc. Dùng để đối chiếu tính toàn vẹn của file PDF chờ ký nếu hệ thống có cấu hình kiểm tra hash. |
| **VI. Ý kiến xử lý của Lãnh đạo** | | | | |
| Lý do từ chối/trả lại | Text(2000) | Tùy điều kiện | Trống | Chỉ nhập tại Popup Từ chối/Trả lại. Bắt buộc khi Lãnh đạo thực hiện "Từ chối" hoặc "Trả lại" theo [BR-DK-025]/[BR-DK-035]. |
| **VII. Thanh nút chức năng trên màn hình chi tiết** | | | | |
| Nút tại hồ sơ trạng thái "Chờ ký" | Text(1000) | Không | Theo trạng thái hồ sơ | Hiển thị tại cuối màn hình chi tiết, theo thứ tự từ trái sang phải:<br>+ "Quay lại".<br>+ "Từ chối".<br>+ "Trả lại".<br>+ "Ký số". |

##### 4.3.2.4.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | Quay lại **4.3.2.4.5. UC-DK-LD.MH04 - Màn hình Danh sách Phiếu đăng ký chờ ký**, giữ nguyên bộ lọc và trang dữ liệu trước đó. |
| 2 | Xem file | Link/Nút | Cho phép xem file PDF chờ ký tại một tab riêng. |
| 3 | Ký số | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ ký", Lãnh đạo không có quyền ký hoặc file PDF chờ ký không hợp lệ): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005] hoặc [MSG-ERR-DK-010], không mở popup ký số. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.4.7. UC-DK-LD.MH06 - Popup Ký số Phiếu đăng ký** ở chế độ ký một hồ sơ. |
| 4 | Từ chối | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005], không mở popup. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.4.8. UC-DK-LD.MH07 - Popup Từ chối/Trả lại Phiếu đăng ký chờ ký** với Loại xử lý mặc định là "Từ chối". |
| 5 | Trả lại | Nút | TH1 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-035], hiển thị [MSG-ERR-DK-005], không mở popup. |
|  |  |  | TH Hợp lệ: Mở **4.3.2.4.8. UC-DK-LD.MH07 - Popup Từ chối/Trả lại Phiếu đăng ký chờ ký** với Loại xử lý mặc định là "Trả lại". |

#### 4.3.2.4.7. UC-DK-LD.MH06 - Popup Ký số Phiếu đăng ký

##### 4.3.2.4.7.1. Màn hình

![Popup Ký số Phiếu đăng ký](images/UC_DK_LD_MH06_Popup_ky_so_Phieu_dang_ky.png)

##### 4.3.2.4.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin ký số** | | | | |
| Chế độ ký số | Enum(String(50)) | Có | Theo thao tác mở popup | Chỉ đọc. Nếu Lãnh đạo bấm "Ký số" tại từng dòng hoặc tại màn chi tiết một hồ sơ, hiển thị "Ký một hồ sơ". Nếu Lãnh đạo tích chọn nhiều hồ sơ trên lưới và bấm "Ký số" trên Toolbar, hiển thị "Ký nhiều hồ sơ". |
| Thông tin hồ sơ ký số | Text(1000) | Có | Theo hồ sơ được chọn | Chỉ hiển thị khi Chế độ ký số là "Ký một hồ sơ". Hiển thị các thông tin tóm tắt: Mã hồ sơ/Số đăng ký, Loại đăng ký, Loại hình giao dịch, Người yêu cầu, Loại file chờ ký, Trạng thái hồ sơ. |
| Tổng số hồ sơ ký số | Integer(10) | Có | Theo hồ sơ được chọn | Chỉ hiển thị khi Chế độ ký số là "Ký nhiều hồ sơ". Chỉ đọc. Số hồ sơ ký số/lần không vượt quá giới hạn cấu hình, mặc định 20 hồ sơ/lần. |
| Danh sách hồ sơ ký số | Text(4000) | Có | Theo hồ sơ được chọn | Chỉ hiển thị khi Chế độ ký số là "Ký nhiều hồ sơ". Chỉ đọc. Hiển thị dạng bảng gồm các cột:<br>+ STT.<br>+ Mã hồ sơ/Số đăng ký.<br>+ Loại đăng ký.<br>+ Người yêu cầu.<br>+ Loại file chờ ký.<br>+ File PDF chờ ký.<br>+ Trạng thái ký số.<br>+ Kết quả ký. |
| File PDF chờ ký | File | Có | Theo hồ sơ được chọn | Chỉ đọc. Khi Chế độ ký số là "Ký một hồ sơ", hiển thị 01 file PDF chờ ký ngay dưới Thông tin hồ sơ ký số. Khi Chế độ ký số là "Ký nhiều hồ sơ", hiển thị file PDF chờ ký tại từng dòng trong Danh sách hồ sơ ký số. Cho phép xem file tại một tab riêng. |
| Hình thức ký số | Enum(String(100)) | Có | "USB Token Ban Cơ yếu Chính phủ" | Chỉ đọc. Hệ thống ký số thông qua thành phần ký số cục bộ kết nối USB Token/chứng thư số hợp lệ của Lãnh đạo theo [BR-DK-034]. |
| **II. Thông tin thiết bị ký số** | | | | |
| Trạng thái USB Token | Enum(String(50)) | Không | "Chưa kiểm tra" | Giá trị gồm:<br>+ "Chưa kiểm tra".<br>+ "Đã nhận thiết bị".<br>+ "Không nhận thiết bị".<br>+ "Chứng thư số không hợp lệ".<br>+ "Chứng thư số hợp lệ". |
| Chứng thư số | Text(1000) | Không | Theo USB Token | Chỉ đọc. Hiển thị thông tin chứng thư số đọc được từ USB Token. |
| Người ký | String(255) | Không | Theo chứng thư số | Chỉ đọc. Người sở hữu chứng thư số dùng để ký. |
| Thời hạn chứng thư số | String(255) | Không | Theo chứng thư số | Chỉ đọc. Thời hạn hiệu lực của chứng thư số. |
| Trạng thái ký số | Enum(String(50)) | Không | "Chưa ký" | Chỉ đọc. Hiển thị trạng thái ký số của từng hồ sơ trong lô ký. Giá trị gồm:<br>+ "Chưa ký".<br>+ "Đang ký".<br>+ "Ký thành công".<br>+ "Ký lỗi". |
| Kết quả ký từng hồ sơ | Text(4000) | Không | Theo kết quả ký | Chỉ đọc. Hiển thị kết quả ký thành công hoặc lỗi của từng hồ sơ khi ký số theo lô. |

##### 4.3.2.4.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Kiểm tra USB Token | Nút | TH1 (USB Token chưa sẵn sàng hoặc không đọc được chứng thư số hợp lệ): Vi phạm [BR-DK-034], hiển thị [MSG-ERR-DK-011] và chưa cho phép ký số. |
|  |  |  | TH2 (Chứng thư số không khớp với Lãnh đạo được phân công ký): Vi phạm [BR-DK-034], hiển thị [MSG-ERR-DK-012] và chưa cho phép ký số. |
|  |  |  | TH Hợp lệ: Hệ thống nhận diện USB Token, đọc chứng thư số, kiểm tra thời hạn chứng thư số, kiểm tra trạng thái thu hồi nếu có tích hợp OCSP/CRL và hiển thị trạng thái "Chứng thư số hợp lệ". |
| 2 | Ký số | Nút | Cho phép ký số toàn bộ hồ sơ hợp lệ trong danh sách đã chọn chỉ với một lần thao tác xác nhận ký số. Hệ thống ký lần lượt từng file PDF bằng USB Token/chứng thư số của Lãnh đạo; mỗi hồ sơ có kết quả ký độc lập. |
|  |  |  | TH1 (Chưa chọn hồ sơ hợp lệ): Vi phạm [BR-DK-024], hiển thị [MSG-ERR-DK-008], không thực hiện ký số. |
|  |  |  | TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc Lãnh đạo không có quyền ký hồ sơ): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005], không thực hiện ký số đối với hồ sơ đó. |
|  |  |  | TH3 (Không tìm thấy file PDF chờ ký hợp lệ): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-010], không thực hiện ký số đối với hồ sơ đó. |
|  |  |  | TH4 (USB Token/chứng thư số chưa hợp lệ): Vi phạm [BR-DK-034], hiển thị [MSG-ERR-DK-011] hoặc [MSG-ERR-DK-012], không thực hiện ký số. |
|  |  |  | TH5 (Lãnh đạo hủy ký, nhập sai PIN hoặc thành phần ký số trả lỗi): Vi phạm [BR-DK-034], hiển thị [MSG-ERR-DK-013], ghi nhận lỗi ký số và giữ nguyên trạng thái "Chờ ký" đối với hồ sơ ký lỗi. |
|  |  |  | TH Hợp lệ: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-013]. Sau khi Lãnh đạo xác nhận, thành phần ký số cục bộ yêu cầu nhập PIN USB Token; hệ thống không lưu PIN. Hệ thống ký số trực tiếp trên file PDF chờ ký tại vùng ký của lá mặt/trang ký Mẫu số 05d hoặc vùng ký của văn bản từ chối. Với ký theo lô, hệ thống ký lần lượt từng file PDF, xác minh chữ ký sau khi ký, lưu file PDF đã ký, thông tin chứng thư số, người ký, thời điểm ký, phiên bản file đã ký, ghi lịch sử xử lý của hồ sơ và Audit log hệ thống. Hồ sơ ký thành công file "Văn bản chứng nhận/Thông báo kết quả" chuyển sang "Hoàn thành"; hồ sơ ký thành công file "Văn bản từ chối" chuyển sang "Bị từ chối"; hồ sơ ký lỗi giữ nguyên "Chờ ký". Hiển thị [MSG-SUC-DK-KT-005]. |
| 3 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại giao diện trước đó. |

#### 4.3.2.4.8. UC-DK-LD.MH07 - Popup Từ chối/Trả lại Phiếu đăng ký chờ ký

##### 4.3.2.4.8.1. Màn hình

![Popup Từ chối/Trả lại Phiếu đăng ký chờ ký](images/UC_DK_LD_MH07_Popup_tu_choi_tra_lai_Phieu_dang_ky_cho_ky.png)

##### 4.3.2.4.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ/Số đăng ký | String(50) | Có | Theo hồ sơ | Chỉ đọc. |
| Loại đăng ký | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_04]. |
| Loại hình giao dịch | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc, tham chiếu [DM_01]. |
| Người yêu cầu | String(255) | Không | Theo hồ sơ | Chỉ đọc. |
| Cán bộ trình ký | String(255) | Có | Theo hồ sơ | Chỉ đọc. |
| Thời điểm trình ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. |
| File PDF chờ ký | File | Có | Theo hồ sơ | Chỉ đọc. File PDF đã được Cán bộ trình ký và đang chờ Lãnh đạo ký số. |
| Loại xử lý | Enum(String(50)) | Có | Theo nút đã chọn | Giá trị gồm:<br>+ "Từ chối".<br>+ "Trả lại". |
| Lý do | Text(2000) | Có | Trống | Lãnh đạo bắt buộc nhập lý do từ chối hoặc lý do trả lại. Hệ thống tự động trim space theo [BR-VAL-001]. |

##### 4.3.2.4.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại giao diện trước đó. |
| 2 | Xác nhận | Nút | TH1 (Bỏ trống Lý do): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép xác nhận. |
|  |  |  | TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc Lãnh đạo không có quyền xử lý): Vi phạm [BR-DK-033], hiển thị [MSG-ERR-DK-005], không cho phép xác nhận. |
|  |  |  | TH Hợp lệ với Loại xử lý là "Từ chối": Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-015]. Sau khi Lãnh đạo xác nhận, hệ thống lưu người từ chối, thời điểm từ chối, lý do từ chối, file PDF chờ ký, phiên bản dữ liệu/PDF bị từ chối; chuyển hồ sơ sang "Bị từ chối"; hiển thị [MSG-SUC-DK-KT-003]. |
|  |  |  | TH Hợp lệ với Loại xử lý là "Trả lại": Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-014]. Sau khi Lãnh đạo xác nhận, hệ thống lưu người trả lại, thời điểm trả lại, lý do trả lại, phiên bản dữ liệu/PDF bị trả lại; chuyển hồ sơ sang "Bị trả lại" để Cán bộ cập nhật và trình lại; hiển thị [MSG-SUC-DK-KT-006]. |

#### 4.3.2.4.9. Quy tắc duyệt, ký số, từ chối và trả lại Phiếu đăng ký

| STT | Quy tắc | Mô tả |
| :--- | :--- | :--- |
| 1 | Điều kiện hiển thị hồ sơ chờ ký | Danh sách chỉ hiển thị Phiếu đăng ký ở trạng thái "Chờ ký", thuộc đơn vị/phạm vi thẩm quyền của Lãnh đạo và được Cán bộ trình tới đúng Lãnh đạo đăng nhập theo [BR-DK-033]. |
| 2 | Điều kiện ký | Chỉ cho phép Lãnh đạo ký số/ký duyệt, từ chối hoặc trả lại hồ sơ ở trạng thái "Chờ ký", có file PDF chờ ký hợp lệ và phiên bản dữ liệu/file đã được khóa khi Cán bộ trình ký theo [BR-DK-033]. |
| 3 | Chuyển trạng thái sau ký | Nếu ký số/ký duyệt thành công, hồ sơ chuyển sang trạng thái sau ký tương ứng loại nghiệp vụ. Nếu từ chối, hồ sơ chuyển sang "Bị từ chối" và phát sinh yêu cầu hoàn tiền/hoàn phí tương ứng nguồn hồ sơ. Nếu trả lại, hồ sơ chuyển sang "Bị trả lại" để Cán bộ xử lý lại. |
| 4 | Điều kiện hiển thị hồ sơ chờ ký | Danh sách chỉ hiển thị Phiếu đăng ký ở trạng thái "Chờ ký", thuộc đơn vị/phạm vi thẩm quyền của Lãnh đạo và được chuyển tới đúng Lãnh đạo đăng nhập theo [BR-DK-033]. |
| 5 | Điều kiện ký số | Chỉ cho phép ký số khi hồ sơ ở trạng thái "Chờ ký", có file PDF chờ ký hợp lệ, file đã được khóa phiên bản và chứng thư số USB Token khớp Lãnh đạo được phân công ký theo [BR-DK-034]. |
| 6 | Ký số bằng USB Token | Hệ thống ký số bằng USB Token/chứng thư số hợp lệ của Lãnh đạo. PIN chỉ nhập tại thành phần ký số cục bộ, hệ thống không lưu PIN. |
| 7 | Ký nhiều hồ sơ | Cho phép ký nhiều Phiếu đăng ký trong một lần thao tác. Hệ thống ký lần lượt từng file PDF và ghi nhận kết quả độc lập cho từng hồ sơ theo [BR-DK-034]. Giới hạn mặc định 20 hồ sơ/lần, lấy theo tham số cấu hình. |
| 8 | Chuyển trạng thái sau ký số | Nếu ký file "Văn bản chứng nhận/Thông báo kết quả" thành công, hồ sơ chuyển sang "Hoàn thành". Nếu ký file "Văn bản từ chối" thành công, hồ sơ chuyển sang "Bị từ chối". Hồ sơ ký lỗi giữ nguyên trạng thái "Chờ ký". |
| 9 | Từ chối của Lãnh đạo | Lãnh đạo nhập lý do và xác nhận từ chối tại "Chờ ký". Hồ sơ chuyển sang "Bị từ chối"; nếu đã thu tiền, hệ thống phát sinh yêu cầu hoàn tiền/hoàn phí tương ứng nguồn hồ sơ. |
| 10 | Trả lại của Lãnh đạo | Lãnh đạo nhập lý do và xác nhận trả lại tại "Chờ ký". Hồ sơ chuyển sang "Bị trả lại" để Cán bộ cập nhật theo phạm vi được phép và trình lại theo [BR-DK-035]. |
| 11 | Không sửa dữ liệu/file | Lãnh đạo chỉ xem và xử lý file đã trình; không được chỉnh sửa dữ liệu Phiếu đăng ký, nội dung PDF, phiên bản file hoặc thay thế file. |

#### 4.3.2.4.10. Ghi log và liên kết nghiệp vụ

| STT | Nội dung | Mô tả |
| :--- | :--- | :--- |
| 1 | Ghi lịch sử xử lý hồ sơ | Mọi thao tác xem chi tiết, xem file, duyệt, kiểm tra USB Token, ký số, từ chối, trả lại và chuyển trạng thái phải ghi vào lịch sử xử lý của hồ sơ. |
| 2 | Ghi Audit log hệ thống | Log tối thiểu gồm: Mã hồ sơ, người thao tác, vai trò, đơn vị, thời điểm, hành động, trạng thái trước, trạng thái sau, loại file, phiên bản file, danh sách hồ sơ nếu thao tác lô và kết quả xử lý/lỗi nếu có. |
| 3 | Lưu metadata chữ ký số | Khi ký số thành công, hệ thống lưu thông tin chứng thư số, người ký, thời điểm ký, thuật toán ký, trạng thái xác minh chữ ký và phiên bản file PDF đã ký. |
| 4 | Đồng bộ trạng thái sang Website Khách hàng/Mobile | Khi trạng thái hồ sơ thay đổi sang "Chờ thanh toán", "Chờ ký", "Hoàn thành", "Bị từ chối" hoặc "Bị trả lại", hệ thống đồng bộ trạng thái và file kết quả tương ứng để Khách hàng theo dõi tại chức năng Quản lý yêu cầu đã đăng ký. |
| 5 | Nguy cơ nghiệp vụ cần kiểm soát | Đây là bước phê duyệt và ban hành kết quả có giá trị pháp lý. Nếu Lãnh đạo ký/ký sai file, ký sai hồ sơ hoặc bỏ qua cảnh báo file không khớp phiên bản trình, có thể phát sinh khiếu nại/khiếu kiện hoặc trách nhiệm bồi thường nhà nước. |





