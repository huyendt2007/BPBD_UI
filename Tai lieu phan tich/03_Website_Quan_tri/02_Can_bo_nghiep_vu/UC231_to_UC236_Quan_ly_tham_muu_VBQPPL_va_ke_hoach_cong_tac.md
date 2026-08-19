### 4.3.2.10. UC231_to_UC236 - Phân hệ Quản lý tham mưu VBQPPL và Chương trình, kế hoạch công tác

#### 4.3.2.10.1. Tổng quan & Mục đích
Phân hệ **Quản lý tham mưu VBQPPL và Chương trình, kế hoạch công tác** được thiết kế dành riêng cho Cán bộ nghiệp vụ và Lãnh đạo thuộc Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước - Bộ Tư pháp. Phân hệ này số hóa toàn bộ quy trình lập hồ sơ, theo dõi và báo cáo tình hình tham mưu xây dựng văn bản quy phạm pháp luật (VBQPPL), chương trình, kế hoạch công tác năm/quý/tháng, cũng như công tác rà soát, hệ thống hóa, hợp nhất văn bản quy phạm pháp luật và pháp điển hệ thống QPPL thuộc lĩnh vực Cục quản lý.

\* **Đối tượng sử dụng (Tác nhân)**:

  \- **Cán bộ nghiệp vụ**: Nhập mới, cập nhật thông tin tham mưu, lập báo cáo, đính kèm tài liệu và tìm kiếm hồ sơ.
  \- **Lãnh đạo Cục**: Tra cứu, theo dõi tiến độ công việc, chỉ đạo định hướng và kết xuất các báo cáo tổng hợp.

\* **Kiến trúc giao diện & Nguyên tắc chung**:

  \- **Bố cục giao diện dạng Tab thống nhất (Single Page Application - SPA)**: Toàn bộ phân hệ được tổ chức thành 3 Tab điều hướng chuyên biệt trong cùng một trang màn hình:
    1. **Tab 1: Xây dựng văn bản QPPL**: Quản lý quy trình tham mưu soạn thảo các dự thảo Luật, Nghị định, Thông tư (tương ứng UC231, UC232).
    2. **Tab 2: Chương trình, Kế hoạch công tác**: Quản lý các chương trình, kế hoạch công tác trọng tâm, đề án năm/quý/tháng (tương ứng UC233, UC234).
    3. **Tab 3: Rà soát, Hệ thống hóa, Hợp nhất & Pháp điển**: Quản lý chuyên sâu các hồ sơ tham mưu rà soát, hệ thống hóa, hợp nhất VBHN và pháp điển hệ thống QPPL (tương ứng UC235, UC236).
  \- **Thẻ thống kê KPI (KPI Cards Dashboard)**: Mỗi Tab giao diện đều tích hợp các thẻ chỉ số KPI ở đầu trang (Tổng số hồ sơ, Tiến độ soạn thảo/triển khai, Kết quả hoàn thành/sửa đổi/bãi bỏ) để phục vụ theo dõi trực quan cho Cán bộ và Lãnh đạo.
  \- **Cấu trúc Form nhập liệu & Form Stepper**:
    \- Các form thêm mới, chỉnh sửa của Tab 1 và Tab 2 được thiết kế dạng **Inline Form** hiển thị linh hoạt ngay trong khung làm việc.
    \- Form của Tab 3 được thiết kế dạng **Quy trình nhiều bước (Form Stepper 6 bước)**: Bước 1 (Định danh), Bước 2 (Văn bản gốc), Bước 3 (Đánh giá/Kiến nghị), Bước 4 (Nghiệp vụ chuyên sâu hiển thị động theo loại tham mưu: Hệ thống hóa / Pháp điển / Hợp nhất / Rà soát thường xuyên), Bước 5 (Tiến độ), Bước 6 (Tài liệu đính kèm).
  \- **Popup xác nhận xóa tùy chỉnh (Custom Delete Confirmation Modal)**: Thao tác xóa hồ sơ ở cả 3 Tab không chuyển hướng trang mà hiển thị hộp thoại Popup xác nhận tùy chỉnh (`modal-delete-confirm`) yêu cầu Cán bộ bắt buộc nhập Lý do xóa trước khi thực hiện xóa logic (xóa mềm).
  \- **Xem trước văn bản & Dấu ký số điện tử (Document Preview Modal)**: Tích hợp công cụ xem trước tài liệu đính kèm (`modal-document-preview`) chuẩn cấu hình thể thức văn bản hành chính của Bộ Tư pháp, hỗ trợ hiển thị dấu xác thực **ĐÃ KÝ SỐ ĐIỆN TỬ** của Cục.
  \- **Giả lập vai trò Cán bộ/Lãnh đạo**: Trên tiêu đề trang có công cụ giả lập người dùng đăng nhập (Cán bộ lập/soạn thảo, Cán bộ rà soát khác, Lãnh đạo Cục) để kiểm thử phân quyền các thao tác xem/sửa/xóa động.
  \- **Bảo mật và phân quyền**: Cán bộ chỉ có quyền chỉnh sửa đối với các hồ sơ tham mưu do mình được phân công phụ trách hoặc chủ trì. Lãnh đạo Cục có quyền xem và tra cứu toàn bộ dữ liệu thuộc đơn vị.
  \- **Toàn vẹn tài liệu**: Các văn bản dự thảo, tờ trình, báo cáo tiến độ phải được tải lên dưới dạng file PDF, DOCX, XLS, XLSX, hoặc lưu trữ dạng nén (.zip, .rar). Dung lượng tối đa 25MB/tệp. Hệ thống ghi nhật ký (Audit Log) cho mỗi lần thay đổi thông tin hoặc tải tệp đính kèm mới.

---

#### 4.3.2.10.2. UC231 - Nhập thông tin tham mưu xây dựng văn bản QPPL

##### 4.3.2.10.2.1. Mục đích
Cho phép Cán bộ nghiệp vụ khởi tạo mới, cập nhật thông tin, xem chi tiết và xóa hồ sơ tham mưu xây dựng các dự thảo văn bản quy phạm pháp luật (Luật, Nghị định, Thông tư, Quyết định...) do Cục tham mưu chủ trì soạn thảo hoặc tham gia phối hợp.

*a. Phân quyền*

\- Cán bộ nghiệp vụ được giao phụ trách xây dựng văn bản QPPL.

*b. Điều kiện thực hiện*

\- Cán bộ nghiệp vụ đã đăng nhập thành công vào hệ thống.
\- Hệ thống hoạt động bình thường.

##### 4.3.2.10.2.2. UC231.MH01 - Màn hình Nhập mới hồ sơ tham mưu xây dựng VBQPPL
Màn hình cung cấp biểu mẫu nhập dữ liệu trực quan để khởi tạo hồ sơ tham mưu.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Mã hồ sơ tham mưu | String(30) | Có | Tự động sinh | - Trạng thái: Chỉ đọc.<br>- Định dạng: `TM-VB-[NĂM]-[STT]` (Ví dụ: `TM-VB-2026-0001`). |
| Tên văn bản/dự thảo | String(500) | Có | Trống | - Nhập tên đầy đủ của dự thảo văn bản quy phạm pháp luật cần tham mưu. |
| Loại văn bản | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn từ Danh mục dùng chung - Loại văn bản quy phạm pháp luật `[DM_LOAI_VBQPPL]` (Luật, Nghị định, Thông tư, Quyết định, Nghị quyết...). |
| Vai trò của Cục | Enum(String(50)) | Có | Chủ trì soạn thảo | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Chủ trì soạn thảo<br>- Phối hợp soạn thảo |
| Đơn vị chủ trì soạn thảo | Enum(String(100)) | Có | Lựa chọn đơn vị soạn thảo | Control UI: Hộp chọn.<br>- Mặc định hiển thị giá trị "Lựa chọn đơn vị soạn thảo".<br>- Cho phép chọn từ Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`. |
| Đơn vị phối hợp | Enum(String(100)) | Không | Trống | Control UI: Hộp chọn.<br>- Cho phép chọn một hoặc nhiều đơn vị phối hợp.<br>- Dạng Dropdown các đơn vị nội bộ trên hệ thống `[DM_DON_VI]`. |
| **II. Quản lý tiến độ** | | | | |
| Cán bộ tham mưu phụ trách | Enum(String(50)) | Có | Cán bộ hiện hành | Control UI: Hộp chọn.<br>- Cho phép chọn Cán bộ nghiệp vụ được phân công theo dõi dự thảo. |
| Ngày bắt đầu thực hiện | Date | Có | Ngày hiện tại | - Ngày chính thức đưa dự thảo vào chương trình xây dựng văn bản. |
| Ngày hoàn thành dự kiến | Date | Có | Trống | - Hạn định trình dự thảo lên cấp thẩm quyền. Phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện. |
| Ngày ban hành thực tế | Date | Không | Trống | - Chỉ cho phép nhập khi trạng thái hồ sơ chuyển sang "Đã ban hành". Phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện. |
| Trạng thái tiến độ | Enum(String(50)) | Có | Đang soạn thảo | Control UI: Hộp chọn.<br>- Gồm các trạng thái:<br>- Đang soạn thảo<br>- Đang lấy ý kiến<br>- Đang thẩm định<br>- Đang trình ký<br>- Đã ban hành<br>- Tạm dừng/Hủy bỏ. |
| **III. Tệp tài liệu đính kèm**| | | | |
| Danh sách tệp đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Cho phép upload nhiều file liên quan (Tờ trình, Dự thảo văn bản, Bản tổng hợp ý kiến, Báo cáo thẩm định...). Dung lượng tối đa: 25MB/file.<br>- **Xem file**: Chỉ hiển thị cạnh tên file sau khi tệp tin đã được tải lên thành công. Cho phép mở xem tệp tin trong tab mới.<br>- **Xóa**: Chỉ hiển thị cạnh tên file sau khi tệp tin đã được tải lên thành công. Cho phép gỡ bỏ tệp tin khỏi danh sách đính kèm. |
| Ghi chú hồ sơ | String(1000) | Không | Trống | - Các ghi chú đặc biệt về tiến độ hoặc khó khăn vướng mắc. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | - Thao tác: NSD click nút Lưu. |
|  |  |  | - Xử lý: Hệ thống thực hiện các bước kiểm tra dữ liệu: |
|  |  |  | - TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ trường trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không thực hiện lưu. |
|  |  |  | - TH2 (Trùng tên văn bản/dự thảo): Tên văn bản/dự thảo nhập trùng lặp với bản ghi đã tồn tại trong Cơ sở dữ liệu. Hệ thống hiển thị thông báo lỗi: "Tên văn bản/dự thảo đã tồn tại trên hệ thống. Vui lòng nhập tên khác." Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH3 (Sai logic ngày hoàn thành): Ngày hoàn thành dự kiến được điền và có giá trị nhỏ hơn Ngày bắt đầu thực hiện. Hệ thống hiển thị thông báo lỗi tại trường tương ứng: "Ngày hoàn thành dự kiến phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH4 (Sai logic ngày ban hành): Trạng thái tiến độ chọn là "Đã ban hành" nhưng Ngày ban hành thực tế bị bỏ trống hoặc có giá trị nhỏ hơn Ngày bắt đầu thực hiện. Hệ thống hiển thị cảnh báo: "Ngày ban hành thực tế bắt buộc nhập và phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH5 (Sai logic ngày bắt đầu với ngày hiện tại): Ngày bắt đầu thực hiện được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày bắt đầu thực hiện phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH6 (Sai logic ngày ban hành với ngày hiện tại): Ngày ban hành thực tế được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày ban hành thực tế phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH Hợp lệ: Hệ thống lưu mới hồ sơ tham mưu vào Cơ sở dữ liệu, ghi nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Thêm mới thông tin tham mưu thành công" và chuyển hướng về màn hình Tra cứu (UC232.MH01). |
| 2 | Tải tệp lên | Nút | - Thao tác: NSD click chọn tệp hoặc kéo thả tệp vào vùng upload. |
|  |  |  | - Xử lý: Hệ thống kiểm tra tệp tin: |
|  |  |  | - TH1 (Sai định dạng tệp): Tệp không có đuôi mở rộng thuộc danh sách: `.pdf, .doc, .docx, .zip, .rar, .xls, .xlsx`. Hệ thống hiển thị cảnh báo lỗi "Định dạng tệp tin không hợp lệ". Không thực hiện tải lên. |
|  |  |  | - TH2 (Vượt dung lượng): Dung lượng tệp tin lớn hơn 25MB. Hệ thống hiển thị cảnh báo lỗi "Dung lượng tệp tin vượt quá 25MB. Vui lòng kiểm tra lại". Không thực hiện tải lên. |
|  |  |  | - TH Hợp lệ: Tải tệp lên thành công, hiển thị tên tệp kèm theo liên kết **Xem file** và nút **Xóa** ở danh sách đính kèm. |
| 3 | Hủy | Nút | - Thao tác: NSD click nút Hủy. |
|  |  |  | - Xử lý: Hệ thống đóng form nhập liệu, không lưu trữ thông tin vừa nhập và điều hướng quay lại màn hình Tra cứu (UC232.MH01). |

##### 4.3.2.10.2.3. UC231.MH02 - Màn hình Cập nhật hồ sơ tham mưu xây dựng VBQPPL
Màn hình cho phép Cán bộ nghiệp vụ điều chỉnh thông tin hồ sơ tham mưu đã được tạo lập.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Mã hồ sơ tham mưu | String(30) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Trạng thái: Chỉ đọc. |
| Tên văn bản/dự thảo | String(500) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Nhập tên đầy đủ của dự thảo văn bản quy phạm pháp luật cần tham mưu. |
| Loại văn bản | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Chọn từ Danh mục dùng chung - Loại văn bản quy phạm pháp luật `[DM_LOAI_VBQPPL]`. |
| Vai trò của Cục | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Gồm các giá trị:<br>- Chủ trì soạn thảo<br>- Phối hợp soạn thảo |
| Đơn vị chủ trì soạn thảo | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Cho phép chọn từ Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`. |
| Đơn vị phối hợp | Enum(String(100)) | Không | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Dạng Dropdown các đơn vị nội bộ trên hệ thống `[DM_DON_VI]`. |
| **II. Quản lý tiến độ** | | | | |
| Cán bộ tham mưu phụ trách | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Chọn Cán bộ nghiệp vụ được phân công theo dõi dự thảo. |
| Ngày bắt đầu thực hiện | Date | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Ngày chính thức đưa dự thảo vào chương trình xây dựng văn bản. |
| Ngày hoàn thành dự kiến | Date | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Hạn định trình dự thảo lên cấp thẩm quyền. Phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện. |
| Ngày ban hành thực tế | Date | Không | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Chỉ cho phép nhập khi trạng thái hồ sơ chuyển sang "Đã ban hành". Phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện. |
| Trạng thái tiến độ | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Gồm các trạng thái:<br>- Đang soạn thảo<br>- Đang lấy ý kiến<br>- Đang thẩm định<br>- Đang trình ký<br>- Đã ban hành<br>- Tạm dừng/Hủy bỏ. |
| **III. Tệp tài liệu đính kèm**| | | | |
| Danh sách tệp đính kèm | File | Không | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Upload file.<br>- Cho phép upload nhiều file liên quan (Tờ trình, Dự thảo văn bản, Bản tổng hợp ý kiến, Báo cáo thẩm định...). Dung lượng tối đa: 25MB/file.<br>- **Xem file**: Chỉ hiển thị cạnh tên file sau khi tệp tin đã được tải lên thành công. Cho phép mở xem tệp tin trong tab mới.<br>- **Xóa**: Chỉ hiển thị cạnh tên file sau khi tệp tin đã được tải lên thành công. Cho phép gỡ bỏ tệp tin khỏi danh sách đính kèm. |
| Ghi chú hồ sơ | String(1000) | Không | Lấy theo dữ liệu hiện tại của hồ sơ | - Các ghi chú đặc biệt về tiến độ hoặc khó khăn vướng mắc. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | - Thao tác: NSD click nút Lưu. |
|  |  |  | - Xử lý: Hệ thống thực hiện các bước kiểm tra dữ liệu: |
|  |  |  | - TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ trường trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không thực hiện lưu. |
|  |  |  | - TH2 (Trùng tên văn bản/dự thảo): Tên văn bản/dự thảo nhập trùng lặp với bản ghi khác đã tồn tại trong Cơ sở dữ liệu (ngoại trừ chính bản ghi đang cập nhật). Hệ thống hiển thị thông báo lỗi: "Tên văn bản/dự thảo đã tồn tại trên hệ thống. Vui lòng nhập tên khác." Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH3 (Sai logic ngày hoàn thành): Ngày hoàn thành dự kiến được điền và có giá trị nhỏ hơn Ngày bắt đầu thực hiện. Hệ thống hiển thị thông báo lỗi tại trường tương ứng: "Ngày hoàn thành dự kiến phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH4 (Sai logic ngày ban hành): Trạng thái tiến độ chọn là "Đã ban hành" nhưng Ngày ban hành thực tế bị bỏ trống hoặc có giá trị nhỏ hơn Ngày bắt đầu thực hiện. Hệ thống hiển thị cảnh báo: "Ngày ban hành thực tế bắt buộc nhập và phải lớn hơn hoặc bằng Ngày bắt đầu thực hiện". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH5 (Sai logic ngày bắt đầu với ngày hiện tại): Ngày bắt đầu thực hiện được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày bắt đầu thực hiện phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH6 (Sai logic ngày ban hành với ngày hiện tại): Ngày ban hành thực tế được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày ban hành thực tế phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH Hợp lệ: Cập nhật thông tin hồ sơ tham mưu vào Cơ sở dữ liệu, ghi nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Cập nhật thông tin tham mưu thành công" và điều hướng về màn hình Tra cứu (UC232.MH01). |
| 2 | Tải tệp lên | Nút | - Thao tác: NSD click chọn tệp hoặc kéo thả tệp vào vùng upload. |
|  |  |  | - Xử lý: Hệ thống kiểm tra tệp tin: |
|  |  |  | - TH1 (Sai định dạng tệp): Tệp không có đuôi mở rộng thuộc danh sách: `.pdf, .doc, .docx, .zip, .rar, .xls, .xlsx`. Hệ thống hiển thị cảnh báo lỗi "Định dạng tệp tin không hợp lệ". Không thực hiện tải lên. |
|  |  |  | - TH2 (Vượt dung lượng): Dung lượng tệp tin lớn hơn 25MB. Hệ thống hiển thị cảnh báo lỗi "Dung lượng tệp tin vượt quá 25MB. Vui lòng kiểm tra lại". Không thực hiện tải lên. |
|  |  |  | - TH Hợp lệ: Tải tệp lên thành công, hiển thị tên tệp kèm theo liên kết **Xem file** và nút **Xóa** ở danh sách đính kèm. |
| 3 | Hủy | Nút | - Thao tác: NSD click nút Hủy. |
|  |  |  | - Xử lý: Hệ thống đóng form chỉnh sửa, không lưu trữ thông tin thay đổi và quay lại màn hình Tra cứu (UC232.MH01). |

##### 4.3.2.10.2.4. UC231.MH03 - Màn hình Xem chi tiết hồ sơ tham mưu xây dựng VBQPPL
Màn hình cung cấp giao diện chỉ đọc để người dùng xem thông tin chi tiết và tiến trình của một hồ sơ tham mưu cụ thể.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Mã hồ sơ tham mưu | String(50) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị mã hồ sơ tham mưu. |
| Tên văn bản/dự thảo | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên đầy đủ của dự thảo văn bản quy phạm pháp luật. |
| Loại văn bản | Enum(String(50)) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị loại văn bản. |
| Vai trò của Cục | Enum(String(50)) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị vai trò. |
| Đơn vị chủ trì soạn thảo | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị đơn vị chủ trì. |
| Đơn vị phối hợp | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị danh sách các đơn vị phối hợp. |
| **II. Quản lý tiến độ** | | | | |
| Cán bộ tham mưu phụ trách | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị họ tên cán bộ phụ trách. |
| Ngày bắt đầu thực hiện | Date | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày bắt đầu. |
| Ngày hoàn thành dự kiến | Date | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày hoàn thành dự kiến. |
| Ngày ban hành thực tế | Date | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày ban hành thực tế (chỉ hiển thị nếu có dữ liệu). |
| Trạng thái tiến độ | Enum(String(50)) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị trạng thái tiến độ hiện hành. |
| **III. Tệp tài liệu đính kèm**| | | | |
| Danh sách tệp đính kèm | File | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- **Xem file**: Hiển thị cạnh tên file đã tải lên. Cho phép mở xem tệp tin trong tab mới.<br>- Không có nút Xóa file hoặc nút tải tệp mới. |
| Ghi chú hồ sơ | Text(2000) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ghi chú của hồ sơ (nếu có). |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Nút | - Thao tác: NSD click nút Cập nhật. |
|  |  |  | - Xử lý: Hệ thống chuyển hướng người dùng sang màn hình Cập nhật hồ sơ tham mưu xây dựng VBQPPL (UC231.MH02). |
| 2 | Xóa | Nút | - Thao tác: NSD click nút Xóa. |
|  |  |  | - Xử lý: Hệ thống chuyển hướng người dùng sang màn hình Xóa hồ sơ tham mưu xây dựng VBQPPL (UC231.MH04). |
| 3 | Quay lại | Nút | - Thao tác: NSD click nút Quay lại. |
|  |  |  | - Xử lý: Hệ thống điều hướng quay lại màn hình Tra cứu (UC232.MH01). |

##### 4.3.2.10.2.5. UC231.MH04 - Màn hình Xóa hồ sơ tham mưu xây dựng VBQPPL
Màn hình hiển thị thông tin hồ sơ và yêu cầu người dùng xác nhận trước khi thực hiện xóa.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã hồ sơ tham mưu | String(50) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị mã hồ sơ tham mưu cần xóa. |
| Tên văn bản/dự thảo | String(255) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên đầy đủ của dự thảo văn bản cần xóa. |
| Trạng thái tiến độ | Enum(String(50)) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị trạng thái tiến độ hiện tại. |
| Lý do xóa | String(500) | Có | Trống | - Người dùng bắt buộc nhập lý do thực hiện xóa hồ sơ. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận xóa | Nút | - Thao tác: NSD click nút Xác nhận xóa. |
|  |  |  | - Xử lý: Hệ thống thực hiện kiểm tra dữ liệu: |
|  |  |  | - TH1 (Bỏ trống lý do xóa): Trường Lý do xóa bị bỏ trống. Hệ thống hiển thị lỗi: "Lý do xóa là trường bắt buộc". Focus và highlight viền đỏ ô nhập liệu. Không thực hiện xóa. |
|  |  |  | - TH Hợp lệ: Hệ thống cập nhật trạng thái xóa logic cho hồ sơ trong Cơ sở dữ liệu, lưu lý do xóa, ghi nhận nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Xóa hồ sơ thành công" và chuyển hướng về màn hình Tra cứu (UC232.MH01). |
| 2 | Hủy | Nút | - Thao tác: NSD click nút Hủy. |
|  |  |  | - Xử lý: Đóng màn hình xác nhận xóa, quay lại màn hình Xem chi tiết hồ sơ tham mưu (UC231.MH03). |

---

#### 4.3.2.10.3. UC232 - Tra cứu thông tin tham mưu xây dựng văn bản QPPL

##### 4.3.2.10.3.1. Mục đích
Cho phép Cán bộ nghiệp vụ và Lãnh đạo thực hiện tìm kiếm, theo dõi tiến độ và điều hướng thực hiện các thao tác (Xem, Cập nhật, Xóa) trên danh sách các hồ sơ tham mưu xây dựng văn bản QPPL.

*a. Phân quyền*

\- Cán bộ nghiệp vụ.
\- Lãnh đạo Cục.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào hệ thống.
\- Hệ thống hoạt động bình thường.

##### 4.3.2.10.3.2. UC232.MH01 - Màn hình Tra cứu danh sách văn bản QPPL đang xây dựng

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa tìm kiếm | String(255) | Không | Trống | - Nhập mã hồ sơ hoặc một phần tên văn bản cần tra cứu. |
| Bộ lọc Loại văn bản | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn từ Danh mục dùng chung - Loại văn bản quy phạm pháp luật `[DM_LOAI_VBQPPL]`. |
| Bộ lọc Trạng thái tiến độ| Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Lọc theo tình trạng tiến độ (Đang soạn thảo, Đang lấy ý kiến, Đang thẩm định, Đang trình ký, Đã ban hành, Tạm dừng/Hủy bỏ). |
| Người phụ trách | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Lọc theo Cán bộ tham mưu phụ trách. |
| Khoảng thời gian bắt đầu | Date | Không | Trống | - Lọc hồ sơ có Ngày bắt đầu thực hiện trong khoảng "Từ ngày" đến "Đến ngày". |
| **II. Thống kê KPI** | String(255) | - | - | - Hiển thị 3 khối thống kê nhanh:<br>- 1. Tổng số dự thảo<br>- 2. Số dự thảo đang soạn thảo<br>- 3. Số dự thảo đã ban hành. |
| **III. Bảng danh sách kết quả**| - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Phân trang mặc định **10 bản ghi/trang** (cho phép chọn 10, 20, 50, 100). Hỗ trợ sắp xếp động theo tiêu đề cột.<br>- Click tên văn bản để mở Form xem/chỉnh sửa chi tiết. |
| Cột: STT | Integer(10) | - | - | - Số thứ tự dòng. |
| Cột: Mã hồ sơ | String(30) | - | - | - Mã hồ sơ tham mưu (Ví dụ: `TM-VB-2026-0001`). |
| Cột: Tên văn bản/dự thảo | String(500) | - | - | - Tên dự thảo văn bản. Hiển thị dạng đường liên kết (Link). Khi click vào sẽ xem chi tiết hoặc chuyển form cập nhật. |
| Cột: Đơn vị chủ trì | String(255) | - | - | - Tên phòng ban chủ trì. |
| Cột: Đơn vị phối hợp | String(500) | - | - | - Tên các đơn vị phối hợp. |
| Cột: Loại văn bản | String(50) | - | - | - Loại văn bản (Luật, Nghị định...). |
| Cột: Cán bộ tham mưu phụ trách | String(100) | - | - | - Họ tên cán bộ nghiệp vụ phụ trách. |
| Cột: Trạng thái tiến độ | String(50) | - | - | - Trạng thái hiện tại của tiến độ. |
| Cột: Ngày bắt đầu thực hiện | Date | - | - | - Ngày bắt đầu thực hiện xây dựng văn bản. |
| Cột: Ngày hoàn thành dự kiến | Date | - | - | - Ngày hoàn thành dự kiến trình. |
| Cột: Ngày ban hành thực tế | Date | - | - | - Ngày ban hành thực tế (nếu có). |
| Cột: Thao tác | String(255) | - | - | - Gồm các tác vụ con:<br>- **Xem**: Biểu tượng Xem chi tiết. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- **Cập nhật**: Biểu tượng Sửa. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- **Xóa**: Biểu tượng Xóa. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | - Thao tác: NSD click nút Tìm kiếm. |
|  |  |  | - Xử lý: Lấy danh sách hồ sơ khớp bộ lọc từ CSDL. |
|  |  |  | - TH1 (Không tìm thấy): Không có bản ghi nào khớp điều kiện lọc. Hệ thống hiển thị thông điệp cảnh báo "Không tìm thấy kết quả phù hợp" trên lưới kết quả. |
|  |  |  | - TH Hợp lệ: Tải danh sách kết quả tìm kiếm lên lưới, phân trang 20 dòng/trang. |
| 2 | Xóa bộ lọc | Nút | - Thao tác: NSD click nút Xóa bộ lọc. |
|  |  |  | - Xử lý: Đưa toàn bộ các trường nhập liệu và Dropdown trên Bộ lọc tìm kiếm về giá trị mặc định ban đầu và tự động tải lại danh sách đầy đủ ban đầu. |
| 3 | Kết xuất Excel | Nút | - Thao tác: NSD click nút Kết xuất Excel. |
|  |  |  | - Xử lý: Hệ thống kiểm tra dữ liệu kết quả tìm kiếm: |
|  |  |  | - TH1 (Không có dữ liệu): Danh sách kết quả rỗng. Hệ thống hiển thị thông báo lỗi: "Không có dữ liệu để kết xuất Excel". Không thực hiện xuất file. |
|  |  |  | - TH Hợp lệ: Kết xuất toàn bộ danh sách kết quả tìm kiếm hiện tại ra file Excel định dạng báo cáo của Bộ Tư pháp và tự động tải xuống. |
| 4 | Thêm mới tham mưu | Nút | - Thao tác: NSD click nút Thêm mới tham mưu. |
|  |  |  | - Xử lý: Chuyển hướng người dùng sang màn hình Nhập mới hồ sơ tham mưu xây dựng VBQPPL (UC231.MH01). |
| 5 | Xem | Row Click | - Thao tác: NSD click dòng dữ liệu trên cột Thao tác của một dòng bản ghi. |
|  |  |  | - Xử lý: Chuyển hướng người dùng sang màn hình Xem chi tiết hồ sơ tham mưu xây dựng VBQPPL (UC231.MH03). |
| 6 | Cập nhật | Biểu tượng | - Thao tác: NSD click biểu tượng Cập nhật trên cột Thao tác của một dòng bản ghi. |
|  |  |  | - Xử lý: Hệ thống kiểm tra quyền. Nếu tài khoản có quyền cập nhật, chuyển hướng sang màn hình Cập nhật hồ sơ tham mưu xây dựng VBQPPL (UC231.MH02). Ngược lại, hiển thị thông báo lỗi: "Bạn không có quyền chỉnh sửa hồ sơ này". |
| 7 | Xóa | Biểu tượng | - Thao tác: NSD click biểu tượng Xóa trên cột Thao tác của một dòng bản ghi. |
|  |  |  | - Xử lý: Hệ thống kiểm tra quyền. Nếu tài khoản có quyền xóa, chuyển hướng sang màn hình Xóa hồ sơ tham mưu xây dựng VBQPPL (UC231.MH04). Ngược lại, hiển thị thông báo lỗi: "Bạn không có quyền xóa hồ sơ này". |

---

#### 4.3.2.10.4. UC233 - Nhập thông tin tham mưu về chương trình, kế hoạch công tác

##### 4.3.2.10.4.1. Mục đích
Hỗ trợ Cán bộ nghiệp vụ thực hiện lập mới, cập nhật, xem chi tiết và xóa các chương trình, kế hoạch công tác năm, quý, tháng hoặc chuyên đề đột xuất của Cục.

*a. Phân quyền*

\- Cán bộ nghiệp vụ được phân công lập kế hoạch công tác.

*b. Điều kiện thực hiện*

\- Cán bộ nghiệp vụ đã đăng nhập thành công vào hệ thống.
\- Hệ thống hoạt động bình thường.

##### 4.3.2.10.4.2. UC233.MH01 - Màn hình Nhập mới chương trình, kế hoạch công tác
Màn hình cung cấp biểu mẫu nhập dữ liệu để khởi tạo một kế hoạch công tác mới.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung kế hoạch**| | | | |
| Mã chương trình/kế hoạch | String(30) | Có | Tự động sinh | - Trạng thái: Chỉ đọc.<br>- Định dạng: `KH-CT-[NĂM]-[STT]` (Ví dụ: `KH-CT-2026-0005`). |
| Tên Chương trình/kế hoạch | String(500) | Có | Trống | - Nhập tên gọi chính thức của chương trình, kế hoạch công tác. |
| Nội dung chương trình/kế hoạch | String(2000) | Có | Trống | - Nhập nội dung chi tiết hoặc mục tiêu thực hiện kế hoạch. |
| Đơn vị chủ trì | Enum(String(100)) | Có | Lựa chọn đơn vị | Control UI: Hộp chọn.<br>- Mặc định hiển thị giá trị "Lựa chọn đơn vị".<br>- Cho phép chọn từ Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`. |
| Đơn vị thực hiện | Enum(String(100)) | Có | Lựa chọn đơn vị | Control UI: Hộp chọn.<br>- Mặc định hiển thị giá trị "Lựa chọn đơn vị".<br>- Cho phép chọn từ Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`. |
| **II. Thời gian & Tiến độ** | | | | |
| Số Quyết định | String(100) | Không | Trống | - Nhập số hiệu quyết định ban hành kế hoạch (nếu có). |
| Ngày ban hành | Date | Không | Trống | - Ngày quyết định ban hành được ký. Phải nhỏ hơn hoặc bằng ngày hiện tại. |
| Ngày bắt đầu triển khai | Date | Có | Ngày hiện tại | - Ngày bắt đầu triển khai kế hoạch thực tế. |
| Hạn hoàn thành | Date | Có | Trống | - Hạn định báo cáo kết quả hoàn thành chương trình/kế hoạch. Phải lớn hơn hoặc bằng Ngày bắt đầu triển khai. |
| Tỉ lệ hoàn thành (%) | String(255) | Có | 0 | - Số nguyên từ 0 đến 100 biểu diễn tỷ lệ hoàn thành công việc. |
| Ngày thực tế hoàn thành | Date | Không | Trống | - Chỉ cho phép nhập khi trạng thái là "Đã hoàn thành". Phải lớn hơn hoặc bằng Ngày bắt đầu triển khai. |
| Trạng thái | Enum(String(50)) | Có | Chưa thực hiện | Control UI: Hộp chọn.<br>- Gồm các trạng thái:<br>- Chưa thực hiện<br>- Đang triển khai<br>- Đã hoàn thành<br>- Tạm dừng/Hủy bỏ. |
| **III. Tài liệu đính kèm** | | | | |
| Tài liệu đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Cho phép upload nhiều file liên quan (Quyết định ban hành, Kế hoạch chi tiết, Đề án...). Dung lượng tối đa: 25MB/file.<br>- **Xem file**: Chỉ hiển thị cạnh tên file sau khi đã tải lên thành công. Cho phép xem file trong tab mới.<br>- **Xóa**: Chỉ hiển thị cạnh tên file sau khi đã tải lên thành công. Cho phép gỡ bỏ file. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | - Thao tác: NSD click nút Lưu. |
|  |  |  | - Xử lý: Hệ thống thực hiện các bước kiểm tra dữ liệu: |
|  |  |  | - TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ trường trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không thực hiện lưu. |
|  |  |  | - TH2 (Trùng tên chương trình/kế hoạch): Tên Chương trình/kế hoạch nhập trùng lặp với bản ghi đã tồn tại trong Cơ sở dữ liệu. Hệ thống hiển thị thông báo lỗi: "Tên chương trình/kế hoạch đã tồn tại trên hệ thống. Vui lòng nhập tên khác." Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH3 (Sai logic hạn hoàn thành): Hạn hoàn thành nhỏ hơn Ngày bắt đầu triển khai. Hệ thống hiển thị thông báo lỗi: "Hạn hoàn thành phải lớn hơn hoặc bằng Ngày bắt đầu triển khai". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH4 (Sai logic ngày ban hành): Ngày ban hành được nhập lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày ban hành phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH5 (Sai logic ngày bắt đầu triển khai với ngày hiện tại): Ngày bắt đầu triển khai được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày bắt đầu triển khai phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH6 (Sai logic ngày thực tế hoàn thành với ngày hiện tại): Ngày thực tế hoàn thành được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày thực tế hoàn thành phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH7 (Sai logic ngày thực tế hoàn thành): Trạng thái chọn là "Đã hoàn thành" nhưng Ngày thực tế hoàn thành bị bỏ trống hoặc có giá trị nhỏ hơn Ngày bắt đầu triển khai. Hệ thống hiển thị lỗi: "Ngày thực tế hoàn thành bắt buộc nhập và phải lớn hơn hoặc bằng Ngày bắt đầu triển khai". Focus và highlight viền đỏ. Không thực hiện lưu. |
|  |  |  | - TH8 (Sai tỉ lệ hoàn thành): Tỉ lệ hoàn thành nhập giá trị không phải số nguyên hoặc ngoài phạm vi từ 0 đến 100. Hệ thống báo lỗi: "Tỉ lệ hoàn thành phải là số nguyên từ 0 đến 100". Focus và highlight viền đỏ. Không thực hiện lưu. |
|  |  |  | - TH Hợp lệ: Hệ thống lưu mới kế hoạch vào CSDL, ghi nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Thêm mới kế hoạch công tác thành công" và điều hướng về màn hình Tra cứu (UC234.MH01). |
| 2 | Tải tệp lên | Nút | - Thao tác: NSD click chọn tệp hoặc kéo thả tệp vào vùng upload. |
|  |  |  | - Xử lý: Hệ thống kiểm tra tệp tin: |
|  |  |  | - TH1 (Sai định dạng tệp): Tệp không thuộc danh sách: `.pdf, .doc, .docx, .zip, .rar, .xls, .xlsx`. Hệ thống hiển thị cảnh báo lỗi "Định dạng tệp tin không hợp lệ". Không thực hiện tải lên. |
|  |  |  | - TH2 (Vượt dung lượng): Dung lượng tệp tin lớn hơn 25MB. Hệ thống hiển thị cảnh báo lỗi "Dung lượng tệp tin vượt quá 25MB". Không thực hiện tải lên. |
|  |  |  | - TH Hợp lệ: Tải tệp lên thành công, hiển thị tên tệp kèm theo liên kết **Xem file** và nút **Xóa** ở danh sách đính kèm. |
| 3 | Hủy | Nút | - Thao tác: NSD click nút Hủy. |
|  |  |  | - Xử lý: Hệ thống đóng form nhập liệu, không lưu trữ thông tin và điều hướng quay lại màn hình Tra cứu (UC234.MH01). |

##### 4.3.2.10.4.3. UC233.MH02 - Màn hình Cập nhật chương trình, kế hoạch công tác
Màn hình cho phép Cán bộ nghiệp vụ điều chỉnh tiến độ, nội dung hoặc trạng thái của kế hoạch công tác đã tạo.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung kế hoạch**| | | | |
| Mã chương trình/kế hoạch | String(30) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Trạng thái: Chỉ đọc. |
| Tên Chương trình/kế hoạch | String(500) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Nhập tên gọi chính thức của chương trình, kế hoạch công tác. |
| Nội dung chương trình/kế hoạch | String(2000) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Nhập nội dung chi tiết hoặc mục tiêu thực hiện kế hoạch. |
| Đơn vị chủ trì | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Chọn từ Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`. |
| Đơn vị thực hiện | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Chọn từ Danh mục các đơn vị trên hệ thống `[DM_DON_VI]`. |
| **II. Thời gian & Tiến độ** | | | | |
| Số Quyết định | String(100) | Không | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Nhập số hiệu quyết định ban hành kế hoạch (nếu có). |
| Ngày ban hành | Date | Không | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Ngày quyết định ban hành được ký. Phải nhỏ hơn hoặc bằng ngày hiện tại. |
| Ngày bắt đầu triển khai | Date | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Ngày bắt đầu triển khai kế hoạch thực tế. |
| Hạn hoàn thành | Date | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Hạn định báo cáo kết quả hoàn thành chương trình/kế hoạch. Phải lớn hơn hoặc bằng Ngày bắt đầu triển khai. |
| Tỉ lệ hoàn thành (%) | String(255) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Số nguyên từ 0 đến 100 biểu diễn tỷ lệ hoàn thành công việc. |
| Ngày thực tế hoàn thành | Date | Không | Lấy theo dữ liệu hiện tại của hồ sơ | - Cho phép chỉnh sửa. Chỉ cho phép nhập khi trạng thái là "Đã hoàn thành". Phải lớn hơn hoặc bằng Ngày bắt đầu triển khai. |
| Trạng thái | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. Gồm các trạng thái:<br>- Chưa thực hiện<br>- Đang triển khai<br>- Đã hoàn thành<br>- Tạm dừng/Hủy bỏ. |
| **III. Tài liệu đính kèm** | | | | |
| Tài liệu đính kèm | File | Không | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Upload file.<br>- Cho phép upload nhiều file liên quan (Quyết định ban hành, Kế hoạch chi tiết, Đề án...). Dung lượng tối đa: 25MB/file.<br>- **Xem file**: Chỉ hiển thị cạnh tên file sau khi đã tải lên thành công. Cho phép xem file trong tab mới.<br>- **Xóa**: Chỉ hiển thị cạnh tên file sau khi đã tải lên thành công. Cho phép gỡ bỏ file. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | - Thao tác: NSD click nút Lưu. |
|  |  |  | - Xử lý: Hệ thống thực hiện các bước kiểm tra dữ liệu: |
|  |  |  | - TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ trường trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không thực hiện lưu. |
|  |  |  | - TH2 (Trùng tên chương trình/kế hoạch): Tên Chương trình/kế hoạch nhập trùng lặp với bản ghi khác đã tồn tại trong Cơ sở dữ liệu (ngoại trừ chính bản ghi đang cập nhật). Hệ thống hiển thị thông báo lỗi: "Tên chương trình/kế hoạch đã tồn tại trên hệ thống. Vui lòng nhập tên khác." Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH3 (Sai logic hạn hoàn thành): Hạn hoàn thành nhỏ hơn Ngày bắt đầu triển khai. Hệ thống hiển thị thông báo lỗi: "Hạn hoàn thành phải lớn hơn hoặc bằng Ngày bắt đầu triển khai". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH4 (Sai logic ngày ban hành): Ngày ban hành được nhập lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày ban hành phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH5 (Sai logic ngày bắt đầu triển khai với ngày hiện tại): Ngày bắt đầu triển khai được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày bắt đầu triển khai phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH6 (Sai logic ngày thực tế hoàn thành với ngày hiện tại): Ngày thực tế hoàn thành được điền lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày thực tế hoàn thành phải nhỏ hơn hoặc bằng ngày hiện tại". Focus và highlight viền đỏ ô lỗi. Không thực hiện lưu. |
|  |  |  | - TH7 (Sai logic ngày thực tế hoàn thành): Trạng thái chọn là "Đã hoàn thành" nhưng Ngày thực tế hoàn thành bị bỏ trống hoặc có giá trị nhỏ hơn Ngày bắt đầu triển khai. Hệ thống hiển thị lỗi: "Ngày thực tế hoàn thành bắt buộc nhập và phải lớn hơn hoặc bằng Ngày bắt đầu triển khai". Focus và highlight viền đỏ. Không thực hiện lưu. |
|  |  |  | - TH8 (Sai tỉ lệ hoàn thành): Tỉ lệ hoàn thành nhập giá trị không phải số nguyên hoặc ngoài phạm vi từ 0 đến 100. Hệ thống báo lỗi: "Tỉ lệ hoàn thành phải là số nguyên từ 0 đến 100". Focus và highlight viền đỏ. Không thực hiện lưu. |
|  |  |  | - TH Hợp lệ: Hệ thống cập nhật kế hoạch vào CSDL, ghi nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Cập nhật chương trình, kế hoạch công tác thành công" và điều hướng về màn hình Tra cứu (UC234.MH01). |
| 2 | Tải tệp lên | Nút | - Thao tác: NSD click chọn tệp hoặc kéo thả tệp vào vùng upload. |
|  |  |  | - Xử lý: Hệ thống kiểm tra tệp tin tương tự như mô tả tại màn hình Nhập mới (UC233.MH01). |
| 3 | Hủy | Nút | - Thao tác: NSD click nút Hủy. |
|  |  |  | - Xử lý: Hệ thống đóng form chỉnh sửa, không lưu trữ thông tin thay đổi và quay lại màn hình Tra cứu (UC234.MH01). |

##### 4.3.2.10.4.4. UC233.MH03 - Màn hình Xem chi tiết chương trình, kế hoạch công tác
Màn hình hiển thị đầy đủ thông tin chi tiết của một chương trình, kế hoạch công tác dưới dạng chỉ đọc.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung kế hoạch**| | | | |
| Mã chương trình/kế hoạch | String(50) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị mã chương trình/kế hoạch. |
| Tên Chương trình/kế hoạch | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên gọi chính thức của chương trình, kế hoạch công tác. |
| Nội dung chương trình/kế hoạch | Text(2000) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị nội dung chi tiết. |
| Đơn vị chủ trì | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên đơn vị chủ trì thực hiện. |
| Đơn vị thực hiện | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên đơn vị triển khai thực tế. |
| **II. Thời gian & Tiến độ** | | | | |
| Số Quyết định | String(50) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị số hiệu quyết định (nếu có). |
| Ngày ban hành | Date | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày quyết định ban hành (nếu có). |
| Ngày bắt đầu triển khai | Date | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày bắt đầu. |
| Hạn hoàn thành | Date | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị hạn hoàn thành. |
| Tỉ lệ hoàn thành (%) | String(255) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tỷ lệ phần trăm (ví dụ: `45%`). |
| Ngày thực tế hoàn thành | Date | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày thực tế hoàn thành (nếu có). |
| Trạng thái | Enum(String(50)) | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị trạng thái của kế hoạch. |
| **III. Tài liệu đính kèm** | | | | |
| Tài liệu đính kèm | File | - | Lấy theo dữ liệu hiện tại của hồ sơ | Control UI: Hiển thị/Read-only.<br>- **Xem file**: Hiển thị cạnh tên file đã tải lên. Cho phép mở xem tệp tin trong tab mới.<br>- Không có nút Xóa file hoặc nút tải tệp mới. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Nút | - Thao tác: NSD click nút Cập nhật. |
|  |  |  | - Xử lý: Hệ thống chuyển hướng người dùng sang màn hình Cập nhật chương trình, kế hoạch công tác (UC233.MH02). |
| 2 | Xóa | Nút | - Thao tác: NSD click nút Xóa. |
|  |  |  | - Xử lý: Hệ thống chuyển hướng người dùng sang màn hình Xóa chương trình, kế hoạch công tác (UC233.MH04). |
| 3 | Quay lại | Nút | - Thao tác: NSD click nút Quay lại. |
|  |  |  | - Xử lý: Hệ thống điều hướng quay lại màn hình Tra cứu (UC234.MH01). |

##### 4.3.2.10.4.5. UC233.MH04 - Màn hình Xóa chương trình, kế hoạch công tác
Màn hình hiển thị thông tin tóm tắt của chương trình, kế hoạch công tác và yêu cầu người dùng nhập lý do xác nhận trước khi thực hiện xóa.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã chương trình/kế hoạch | String(50) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị mã chương trình/kế hoạch cần xóa. |
| Tên Chương trình/kế hoạch | String(255) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên gọi chương trình/kế hoạch cần xóa. |
| Trạng thái | Enum(String(50)) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị trạng thái hiện tại. |
| Lý do xóa | String(500) | Có | Trống | - Người dùng bắt buộc nhập lý do thực hiện xóa kế hoạch. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận xóa | Nút | - Thao tác: NSD click nút Xác nhận xóa. |
|  |  |  | - Xử lý: Hệ thống thực hiện kiểm tra dữ liệu: |
|  |  |  | - TH1 (Bỏ trống lý do xóa): Trường Lý do xóa bị bỏ trống. Hệ thống hiển thị lỗi: "Lý do xóa là trường bắt buộc". Focus và highlight viền đỏ ô nhập liệu. Không thực hiện xóa. |
|  |  |  | - TH Hợp lệ: Hệ thống cập nhật trạng thái xóa logic cho kế hoạch công tác trong Cơ sở dữ liệu, lưu lý do xóa, ghi nhận nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Xóa kế hoạch công tác thành công" và chuyển hướng về màn hình Tra cứu (UC234.MH01). |
| 2 | Hủy | Nút | - Thao tác: NSD click nút Hủy. |
|  |  |  | - Xử lý: Đóng màn hình xác nhận xóa, quay lại màn hình Xem chi tiết chương trình, kế hoạch công tác (UC233.MH03). |

---

#### 4.3.2.10.5. UC234 - Tra cứu thông tin tham mưu về chương trình, kế hoạch công tác

##### 4.3.2.10.5.1. Mục đích
Cho phép cán bộ nghiệp vụ theo dõi tiến độ hoàn thành các mốc kế hoạch công tác và Lãnh đạo Cục đánh giá hiệu quả hoàn thành công việc của từng phòng ban, cá nhân qua công cụ tra cứu và danh sách kết quả.

*a. Phân quyền*

\- Cán bộ nghiệp vụ.
\- Lãnh đạo Cục.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào hệ thống.
\- Hệ thống hoạt động bình thường.

##### 4.3.2.10.5.2. UC234.MH01 - Màn hình Tra cứu chương trình, kế hoạch công tác

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa tìm kiếm | String(255) | Không | Trống | - Tìm kiếm theo tên kế hoạch hoặc số quyết định ban hành. |
| Loại kế hoạch | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Lọc theo Kế hoạch năm, quý, tháng, chuyên đề. |
| Trạng thái thực hiện | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Lọc theo Đang triển khai, Hoàn thành, Trễ hạn... |
| Đơn vị chủ trì | Enum(String(100)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Lọc theo Phòng ban chủ trì thực hiện. |
| Năm thực hiện | Enum(String(50)) | Có | Năm hiện tại | Control UI: Hộp chọn.<br>- Lọc các kế hoạch thuộc năm cụ thể. |
| **II. Thống kê KPI** | String(255) | - | - | - Hiển thị 3 khối thống kê nhanh:<br>- 1. Tổng số kế hoạch<br>- 2. Số kế hoạch đang triển khai<br>- 3. Số kế hoạch đã hoàn thành. |
| **III. Bảng danh sách kết quả**| - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh mục kế hoạch kèm thanh tiến độ trực quan (Progress Bar). Phân trang mặc định **10 bản ghi/trang** (cho phép chọn 10, 20, 50, 100). Hỗ trợ sắp xếp động theo tiêu đề cột. |
| Cột: STT | Integer(10) | - | - | - Số thứ tự dòng. |
| Cột: Mã chương trình/KH | String(30) | - | - | - Mã định danh kế hoạch (Ví dụ: `KH-CT-2026-0001`). |
| Cột: Tên Chương trình/kế hoạch | String(500) | - | - | - Tên chương trình/kế hoạch dạng liên kết (Link). Khi click vào sẽ xem chi tiết hoặc mở form cập nhật. |
| Cột: Đơn vị chủ trì | String(255) | - | - | - Tên đơn vị chủ trì. |
| Cột: Đơn vị thực hiện | String(255) | - | - | - Tên đơn vị thực hiện. |
| Cột: Số Quyết định | String(100) | - | - | - Số hiệu quyết định ban hành kế hoạch. |
| Cột: Ngày ban hành | Date | - | - | - Ngày ban hành quyết định. |
| Cột: Bắt đầu | Date | - | - | - Ngày bắt đầu triển khai. |
| Cột: Hạn hoàn thành | Date | - | - | - Hạn chót hoàn thành kế hoạch. |
| Cột: Tỷ lệ (%) | String(255) | - | - | - Hiển thị biểu đồ thanh ngang phần trăm (%) hoàn thành (ví dụ: 80%). |
| Cột: Trạng thái | String(50) | - | - | - Nhãn màu tương ứng (Hoàn thành, Đang triển khai, Chưa thực hiện). |
| Cột: Thao tác | String(255) | - | - | - Gồm các tác vụ con:<br>- **Xem**: Biểu tượng Xem chi tiết. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- **Cập nhật**: Biểu tượng Sửa. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- **Xóa**: Biểu tượng Xóa. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | - Thao tác: NSD click nút Tìm kiếm. |
|  |  |  | - Xử lý: Lấy danh sách kế hoạch khớp bộ lọc từ CSDL. |
|  |  |  | - TH1 (Không tìm thấy): Không có bản ghi nào khớp bộ lọc. Hệ thống hiển thị thông điệp "Không tìm thấy kết quả phù hợp" trên lưới. |
|  |  |  | - TH Hợp lệ: Tải danh sách kết quả lên lưới, phân trang 20 dòng/trang. |
| 2 | Xóa bộ lọc | Nút | - Thao tác: NSD click nút Xóa bộ lọc. |
|  |  |  | - Xử lý: Đưa toàn bộ các trường nhập liệu và Dropdown trên Bộ lọc tìm kiếm về giá trị mặc định ban đầu và tự động tải lại danh sách đầy đủ ban đầu. |
| 3 | Kết xuất Excel | Nút | - Thao tác: NSD click nút Kết xuất Excel. |
|  |  |  | - Xử lý: Hệ thống kiểm tra dữ liệu kết quả tìm kiếm: |
|  |  |  | - TH1 (Không có dữ liệu): Danh sách kết quả rỗng. Hệ thống hiển thị thông báo lỗi: "Không có dữ liệu để kết xuất Excel". Không thực hiện xuất file. |
|  |  |  | - TH Hợp lệ: Kết xuất toàn bộ danh sách kết quả kế hoạch hiện tại ra file Excel và tự động tải xuống. |
| 4 | Lập kế hoạch mới | Nút | - Thao tác: NSD click nút Lập kế hoạch mới. |
|  |  |  | - Xử lý: Chuyển hướng sang màn hình Nhập mới kế hoạch công tác (UC233.MH01). |
| 5 | Xem | Row Click | - Thao tác: NSD click dòng dữ liệu trên cột Thao tác của một dòng bản ghi. |
|  |  |  | - Xử lý: Chuyển hướng người dùng sang màn hình Xem chi tiết chương trình, kế hoạch công tác (UC233.MH03). |
| 6 | Cập nhật | Biểu tượng | - Thao tác: NSD click biểu tượng Cập nhật trên cột Thao tác của một dòng bản ghi. |
|  |  |  | - Xử lý: Hệ thống kiểm tra quyền. Nếu hợp lệ, chuyển hướng sang màn hình Cập nhật chương trình, kế hoạch công tác (UC233.MH02). Ngược lại, hiển thị thông báo lỗi: "Bạn không có quyền chỉnh sửa kế hoạch này". |
| 7 | Xóa | Biểu tượng | - Thao tác: NSD click biểu tượng Xóa trên cột Thao tác của một dòng bản ghi. |
|  |  |  | - Xử lý: Hệ thống kiểm tra quyền. Nếu hợp lệ, chuyển hướng sang màn hình Xóa chương trình, kế hoạch công tác (UC233.MH04). Ngược lại, hiển thị thông báo lỗi: "Bạn không có quyền xóa kế hoạch này". |

---


#### 4.3.2.10.6. UC235 - Nhập thông tin tham mưu rà soát, hệ thống hóa, hợp nhất VBQPPL và pháp điển

##### 4.3.2.10.6.1. Mục đích
Cho phép Cán bộ nghiệp vụ lập mới hồ sơ, cập nhật tiến độ thực tế và kết quả rà soát, hệ thống hóa, hợp nhất văn bản quy phạm pháp luật và pháp điển hệ thống QPPL.

*a. Phân quyền*
\- Cán bộ nghiệp vụ thuộc Cục Đăng ký giao dịch bảo đảm.
\- Cán bộ nghiệp vụ thuộc Cục Bồi thường nhà nước.

*b. Điều kiện thực hiện*
\- Người dùng đã đăng nhập thành công vào hệ thống.
\- Hệ thống hoạt động bình thường.

##### 4.3.2.10.6.2. UC235.MH01 - Màn hình Thêm mới hồ sơ tham mưu rà soát, hệ thống hóa, hợp nhất và pháp điển

**4.3.2.10.6.2.1. Màn hình**
![Màn hình Thêm mới hồ sơ tham mưu rà soát, hệ thống hóa, hợp nhất và pháp điển](images/UC235_Create.png)

**4.3.2.10.6.2.2. Mô tả thông tin trên màn hình**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Bước 1: Định danh hồ sơ** | | | | |
| Số hiệu hồ sơ | String(30) | Có | Tự động sinh | - Chỉ đọc.<br>- Định dạng: `HS-[NĂM]-[STT]` (Ví dụ: `HS-2026-0001`). |
| Ngày lập hồ sơ | Date | Có | Ngày hiện tại | - Chỉ đọc.<br>- Lưu trữ thời gian khởi tạo hồ sơ. |
| Loại tham mưu | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Rà soát<br>- Hệ thống hóa<br>- Hợp nhất<br>- Pháp điển. |
| Lĩnh vực pháp luật | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Giao dịch bảo đảm<br>- Bồi thường nhà nước<br>- Hộ tịch<br>- Thi hành án dân sự<br>- Khác. |
| Năm thực hiện | String(255) | Có | Năm hiện tại | - Nhập năm thực hiện công việc (Ví dụ: 2026). |
| Số/Kế hoạch căn cứ thực hiện | String(100) | Không | Trống | - Nhập số hiệu hoặc tên kế hoạch làm căn cứ thực hiện. |
| Đơn vị chủ trì | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn từ Danh mục đơn vị trên hệ thống `[DM_DON_VI]`. |
| Cán bộ phụ trách | Enum(String(50)) | Có | Cán bộ hiện hành | Control UI: Hộp chọn.<br>- Chọn từ danh sách Cán bộ nghiệp vụ của đơn vị. |
| Ghi chú định danh | String(1000) | Không | Trống | - Nhập ghi chú về định danh hồ sơ. |
| **Bước 2: Thông tin văn bản QPPL** | | | | |
| Tên văn bản | String(500) | Có | Trống | - Nhập tên đầy đủ của văn bản quy phạm pháp luật cần tham mưu. |
| Số, ký hiệu văn bản | String(100) | Có | Trống | - Nhập số, ký hiệu văn bản (Ví dụ: `99/2022/NĐ-CP`). Không kiểm tra trùng lặp. |
| Loại văn bản | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn từ Danh mục loại văn bản QPPL `[DM_LOAI_VBQPPL]` (Luật, Nghị định, Thông tư, Thông tư liên tịch, Quyết định, Nghị quyết). |
| Cơ quan ban hành | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn từ Danh mục cơ quan ban hành văn bản `[DM_CO_QUAN_BH]`. |
| Ngày ban hành | Date | Có | Trống | - Nhập ngày ban hành. Validate nhỏ hơn hoặc bằng ngày hiện tại. |
| Ngày có hiệu lực | Date | Có | Trống | - Nhập ngày có hiệu lực. |
| Ngày hết hiệu lực | Date | Không | Trống | - Nhập ngày hết hiệu lực (nếu có). Validate lớn hơn hoặc bằng Ngày có hiệu lực. |
| Hiệu lực hiện tại | Enum(String(50)) | Có | Còn hiệu lực | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Còn hiệu lực<br>- Hết hiệu lực<br>- Hết hiệu lực một phần. |
| Văn bản thay thế/sửa đổi liên quan | String(500) | Không | Trống | - Nhập số hiệu văn bản thay thế hoặc sửa đổi liên quan nếu có. |
| Tóm tắt nội dung văn bản | String(2000) | Không | Trống | - Nhập tóm tắt nội dung chính của văn bản. |
| **Bước 3: Kết quả rà soát & đánh giá** | | | | |
| Kết quả rà soát | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Còn phù hợp<br>- Cần sửa đổi<br>- Cần thay thế<br>- Cần bãi bỏ<br>- Cần đình chỉ thi hành<br>- Cần ban hành mới. |
| Nội dung cụ thể cần sửa đổi/bổ sung | String(2000) | Có | Trống | - Hiển thị động và bắt buộc nhập khi Kết quả rà soát là "Cần sửa đổi". |
| Mâu thuẫn/chồng chéo với văn bản khác | String(1000) | Không | Trống | - Nhập nội dung mâu thuẫn chồng chéo với các văn bản khác (nếu có). |
| Bất cập, vướng mắc trong thực tiễn thi hành | String(1000) | Không | Trống | - Nhập các bất cập, vướng mắc thực tiễn (nếu có). |
| Kiến nghị xử lý | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Giữ nguyên<br>- Sửa đổi, bổ sung<br>- Thay thế<br>- Bãi bỏ toàn bộ hoặc một phần<br>- Đình chỉ thi hành hoặc ngưng hiệu lực<br>- Hợp nhất<br>- Ban hành mới. |
| Cơ quan có thẩm quyền xử lý | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn từ Danh mục cơ quan giải quyết kiến nghị. |
| Mức độ ưu tiên | Enum(String(50)) | Có | Theo kế hoạch | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Khẩn cấp<br>- Cần thiết<br>- Theo kế hoạch. |
| Thời hạn xử lý kiến nghị | Date | Không | Trống | - Nhập thời hạn xử lý. Validate lớn hơn hoặc bằng Ngày lập hồ sơ. |
| **Bước 4: Hệ thống hóa & Hợp nhất & Pháp điển (Hiển thị động theo Loại tham mưu)** | | | | |
| **Nếu Loại tham mưu = Hệ thống hóa (Nhóm 4A)** | | | | |
| Tên kỳ hệ thống hóa | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn kỳ hệ thống hóa 5 năm/lần theo quy định (Ví dụ: Kỳ hệ thống hóa 2019-2023, Kỳ 2024-2028). |
| Thời điểm hệ thống hóa | Date | Có | Tự động tính | - Chỉ đọc.<br>- Hệ thống tự động lấy ngày 31/12 của năm cuối kỳ được chọn. |
| Kết quả xếp loại trong danh mục | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Còn hiệu lực toàn bộ<br>- Còn hiệu lực một phần<br>- Hết hiệu lực toàn bộ<br>- Hết hiệu lực một phần<br>- Ngưng hiệu lực toàn bộ<br>- Ngưng hiệu lực một phần. |
| Loại danh mục đầu ra | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- 1. Danh mục văn bản còn hiệu lực (bao gồm cả văn bản hết hiệu lực/ngưng hiệu lực một phần)<br>- 2. Danh mục văn bản hết hiệu lực, ngưng hiệu lực toàn bộ hoặc một phần<br>- 3. Danh mục văn bản cần sửa đổi, bổ sung, thay thế, bãi bỏ hoặc ban hành mới. |
| Cơ quan chủ trì hệ thống hóa | Enum(String(100)) | Có | Bộ Tư pháp | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Bộ Tư pháp<br>- Bộ chủ quản<br>- UBND tỉnh. |
| Quyết định công bố kết quả hệ thống hóa của Bộ trưởng Bộ Tư pháp | String(100) | Có | Trống | - Nhập số quyết định công bố. Không kiểm tra trùng lặp. |
| Ngày công bố kết quả | Date | Có | Trống | - Nhập ngày công bố. Validate nhỏ hơn hoặc bằng ngày hiện tại. |
| **Nếu Loại tham mưu = Pháp điển (Nhóm 4B)** | | | | |
| Hình thức thực hiện pháp điển | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Pháp điển đề mục mới<br>- Cập nhật đề mục đã công bố. |
| Đề mục cần cập nhật | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Hiển thị động và bắt buộc khi chọn Hình thức thực hiện pháp điển là "Cập nhật đề mục đã công bố". Lấy từ Danh mục đề mục đã công bố. |
| Chủ đề pháp điển | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Lấy từ danh mục 45 chủ đề pháp điển. |
| Tên đề mục pháp điển | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Lấy từ danh mục 265 đề mục thuộc chủ đề được chọn. |
| Mã đề mục | String(50) | Có | Tự động sinh | - Chỉ đọc.<br>- Tự sinh theo chủ đề + đề mục được chọn. |
| Vị trí trong đề mục | String(250) | Không | Trống | - Nhập chi tiết Phần / Chương / Mục / Tiểu mục / Điều / Điểm theo cấu trúc thực tế. |
| Bộ/cơ quan thực hiện pháp điển | Enum(String(100)) | Có | Bộ Tư pháp | Control UI: Hộp chọn.<br>- Chọn từ Danh mục cơ quan thực hiện pháp điển. |
| Ngày hoàn thành pháp điển | Date | Không | Trống | - Nhập ngày hoàn thành pháp điển. Validate lớn hơn hoặc bằng Ngày bắt đầu rà soát. |
| **Nếu Loại tham mưu = Hợp nhất (Nhóm 5)** | | | | |
| Danh sách văn bản gốc được hợp nhất | String(500) | Có | Trống | - Nhập số hiệu/tên văn bản gốc được hợp nhất. |
| Danh sách văn bản sửa đổi, bổ sung qua từng lần | String(1000) | Có | Trống | - Nhập số hiệu/tên các văn bản sửa đổi qua từng lần. |
| Số, ký hiệu văn bản hợp nhất | String(100) | Có | Trống | - Nhập số ký hiệu văn bản hợp nhất (Ví dụ: `02/VBHN-BTP`). Không kiểm tra trùng lặp. |
| Ngày ký văn bản hợp nhất | Date | Có | Trống | - Nhập ngày ký văn bản hợp nhất. |
| Người ký | String(100) | Có | Trống | - Nhập họ tên, chức danh người ký văn bản hợp nhất. |
| Thời hạn hoàn thành hợp nhất theo quy định | Date | Có | Tự động tính | - Chỉ đọc.<br>- Tự động tính: +5 ngày làm việc đối với VB thông thường; +10 ngày làm việc đối với VB phức tạp kể từ ngày VB sửa đổi được ban hành. |
| Ghi chú nội dung hợp nhất | String(1000) | Không | Trống | - Nhập ghi chú về nội dung hợp nhất văn bản. |
| **Bước 5: Tiến độ thực hiện** | | | | |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Mới tạo | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Mới tạo<br>- Đang thực hiện<br>- Hoàn thành. |
| Căn cứ thực hiện | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Kế hoạch công tác<br>- Chỉ đạo lãnh đạo<br>- Yêu cầu Bộ<br>- Chương trình XDVB. |
| Giai đoạn hiện tại | Enum(String(50)) | Có | Thu thập | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Thu thập<br>- Phân tích<br>- Dự thảo báo cáo<br>- Hoàn thành. |
| Ngày bắt đầu rà soát | Date | Có | Ngày hiện tại | - Lưu trữ thời gian bắt đầu triển khai rà soát. |
| Ngày hoàn thành dự kiến | Date | Có | Trống | - Nhập hạn hoàn thành công việc. Validate lớn hơn hoặc bằng Ngày bắt đầu rà soát. |
| Ngày hoàn thành thực tế | Date | Không | Trống | - Bắt buộc khi Trạng thái hồ sơ = Hoàn thành. Validate lớn hơn hoặc bằng Ngày bắt đầu rà soát và nhỏ hơn hoặc bằng ngày hiện tại. |
| Ghi chú tiến độ | String(1000) | Không | Trống | - Nhập ghi chú chi tiết về tiến độ thực hiện. |
| **Bước 6: Đính kèm tài liệu** | | | | |
| File văn bản gốc | File | Có | Trống | Control UI: Upload file.<br>- Upload tệp đính kèm văn bản gốc (.pdf, .doc, .docx, .zip, .rar). Dung lượng tối đa: 20MB. |
| Phiếu rà soát/đánh giá | File | Không | Trống | Control UI: Upload file.<br>- Upload phiếu rà soát đã điền (.pdf, .doc, .docx). Dung lượng tối đa: 20MB. |
| Báo cáo kết quả rà soát | File | Không | Trống | Control UI: Upload file.<br>- Upload báo cáo kết quả rà soát (.pdf, .doc, .docx). Dung lượng tối đa: 20MB. |
| Tờ trình / Công văn liên quan | File | Không | Trống | Control UI: Upload file.<br>- Upload tờ trình, công văn liên quan (.pdf, .doc, .docx). Dung lượng tối đa: 20MB. |
| File văn bản hợp nhất/pháp điển đầu ra | File | Có | Trống | Control UI: Upload file.<br>- Bắt buộc khi Loại tham mưu là Hợp nhất hoặc Pháp điển. Upload file đầu ra (.pdf, .doc, .docx, .zip). Dung lượng tối đa: 20MB. |
| Tài liệu khác | File | Không | Trống | Control UI: Upload file.<br>- Upload tài liệu khác (.pdf, .doc, .docx, .zip, .rar). Dung lượng tối đa: 20MB. |
| **Nút chức năng** | | | | (Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình) |
| Lưu nháp | - | - | - | - Hiển thị ở mọi bước trong Stepper. |
| Tiếp tục | String(255) | - | - | - Hiển thị ở các bước từ 1 đến 5. |
| Quay lại | String(255) | - | - | - Hiển thị ở các bước từ 2 đến 6. |
| Lưu | - | - | - | - Chỉ hiển thị ở bước 6. |
| Hủy | - | - | - | - Hiển thị ở mọi bước trong Stepper. |

**4.3.2.10.6.2.3. Chức năng trên màn hình**
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tiếp tục | Nút | - Thao tác: NSD click nút Tiếp tục.<br>- Xử lý: Hệ thống thực hiện các bước kiểm tra dữ liệu:<br>- TH1 (Bỏ trống trường bắt buộc): Một trong các trường bắt buộc của bước hiện tại bị bỏ trống hoặc chưa chọn. Hệ thống hiển thị thông báo lỗi: "Vui lòng nhập đầy đủ các trường thông tin bắt buộc." Focus và highlight viền đỏ trường trống đầu tiên. Không chuyển bước. |
|  |  |  | - TH2 (Sai định dạng/logic ngày ở bước hiện tại): Các trường hợp vi phạm quy tắc định dạng (Email, SĐT, Định dạng năm) hoặc logic ngày: Ngày có hiệu lực nhỏ hơn Ngày ban hành; Ngày ban hành lớn hơn ngày hiện tại; Ngày hết hiệu lực nhỏ hơn Ngày có hiệu lực. Hệ thống hiển thị thông báo lỗi tại trường tương ứng: "Dữ liệu nhập vào không hợp lệ. Vui lòng kiểm tra lại." Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH Hợp lệ: Hệ thống chuyển sang bước tiếp theo trong Stepper. |
| 2 | Quay lại | Nút | - Thao tác: NSD click nút Quay lại.<br>- Xử lý: Hệ thống chuyển về bước trước đó trong Stepper, giữ nguyên dữ liệu đã nhập. |
| 3 | Lưu nháp | Nút | - Thao tác: NSD click nút Lưu nháp.<br>- Xử lý: Hệ thống kiểm tra dữ liệu:<br>- TH1 (Bỏ trống các trường định danh cơ bản): Bỏ trống các trường Số hiệu hồ sơ, Ngày lập hồ sơ hoặc Loại tham mưu. Hệ thống hiển thị lỗi: "Thông tin định danh hồ sơ không được để trống." Focus và highlight viền đỏ. Không lưu nháp. |
|  |  |  | - TH Hợp lệ: Hệ thống lưu tạm các thông tin đã nhập vào CSDL dưới dạng bản nháp (Trạng thái hồ sơ giữ nguyên: Mới tạo, Giai đoạn: bước hiện tại), hiển thị thông báo thành công: "Lưu nháp hồ sơ thành công" và quay lại màn hình Tra cứu (UC236.MH01). |
| 4 | Lưu | Nút | - Thao tác: NSD click nút Lưu ở bước 6.<br>- Xử lý: Hệ thống thực hiện kiểm tra dữ liệu trên cả 6 bước:<br>- TH1 (Bỏ trống trường bắt buộc): Một trong các trường bắt buộc ở bất kỳ bước nào bị bỏ trống. Hệ thống tự động chuyển Stepper về bước chứa trường lỗi đầu tiên, highlight viền đỏ và hiển thị cảnh báo: "Vui lòng hoàn thiện đầy đủ thông tin bắt buộc tại các bước trước khi Lưu." |
|  |  |  | - TH2 (Sai logic ngày hoàn thành dự kiến): Ngày hoàn thành dự kiến nhỏ hơn Ngày bắt đầu rà soát. Hệ thống báo lỗi tại trường: "Ngày hoàn thành dự kiến phải lớn hơn hoặc bằng Ngày bắt đầu rà soát." Focus và highlight viền đỏ. |
|  |  |  | - TH3 (Sai logic ngày hoàn thành thực tế): Trạng thái hồ sơ chọn là "Hoàn thành" nhưng Ngày hoàn thành thực tế bị trống hoặc nhỏ hơn Ngày bắt đầu rà soát hoặc lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày hoàn thành thực tế bắt buộc nhập, phải lớn hơn hoặc bằng Ngày bắt đầu rà soát và nhỏ hơn hoặc bằng ngày hiện tại." Focus và highlight viền đỏ. |
|  |  |  | - TH Hợp lệ: Hệ thống lưu mới hồ sơ vào CSDL, ghi nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Thêm mới hồ sơ tham mưu thành công" và chuyển hướng về màn hình Tra cứu (UC236.MH01). |
| 5 | Hủy | Nút | - Thao tác: NSD click nút Hủy.<br>- Xử lý: Đóng form thêm mới, không lưu dữ liệu vừa nhập, quay lại màn hình Tra cứu (UC236.MH01). |

##### 4.3.2.10.6.3. UC235.MH02 - Màn hình Cập nhật hồ sơ tham mưu rà soát, hệ thống hóa, hợp nhất và pháp điển

**4.3.2.10.6.3.1. Màn hình**
![Màn hình Cập nhật hồ sơ tham mưu rà soát, hệ thống hóa, hợp nhất và pháp điển](images/UC235_Update.png)

**4.3.2.10.6.3.2. Mô tả thông tin trên màn hình**
Màn hình cập nhật tải toàn bộ thông tin hiện tại của hồ sơ vào form dạng Stepper tương tự như màn hình Thêm mới (UC235.MH01) và cho phép người dùng chỉnh sửa.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Bước 1: Định danh hồ sơ** | | | | |
| Số hiệu hồ sơ | String(30) | Có | Lấy theo dữ liệu hiện tại | - Chỉ đọc.<br>- Mã hồ sơ không thay đổi. |
| Ngày lập hồ sơ | Date | Có | Lấy theo dữ liệu hiện tại | - Chỉ đọc. |
| Loại tham mưu | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Gồm các giá trị:<br>- Rà soát<br>- Hệ thống hóa<br>- Hợp nhất<br>- Pháp điển. |
| Lĩnh vực pháp luật | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Năm thực hiện | String(255) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Số/Kế hoạch căn cứ thực hiện | String(100) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Đơn vị chủ trì | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Cán bộ phụ trách | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Ghi chú định danh | String(1000) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| **Bước 2: Thông tin văn bản QPPL** | | | | |
| Tên văn bản | String(500) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Số, ký hiệu văn bản | String(100) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. Không kiểm tra trùng lặp. |
| Loại văn bản | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Cơ quan ban hành | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Ngày ban hành | Date | Có | Lấy theo dữ liệu hiện tại | - Validate nhỏ hơn hoặc bằng ngày hiện tại. |
| Ngày có hiệu lực | Date | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Ngày hết hiệu lực | Date | Không | Lấy theo dữ liệu hiện tại | - Validate lớn hơn hoặc bằng Ngày có hiệu lực. |
| Hiệu lực hiện tại | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Văn bản thay thế/sửa đổi liên quan | String(500) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Tóm tắt nội dung văn bản | String(2000) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| **Bước 3: Kết quả rà soát & đánh giá** | | | | |
| Kết quả rà soát | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Nội dung cụ thể cần sửa đổi/bổ sung | String(2000) | Có | Lấy theo dữ liệu hiện tại | - Hiển thị động và bắt buộc nhập khi Kết quả rà soát là "Cần sửa đổi". |
| Mâu thuẫn/chồng chéo với văn bản khác | String(1000) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Bất cập, vướng mắc trong thực tiễn thi hành | String(1000) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Kiến nghị xử lý | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Cơ quan có thẩm quyền xử lý | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Mức độ ưu tiên | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Thời hạn xử lý kiến nghị | Date | Không | Lấy theo dữ liệu hiện tại | - Validate lớn hơn hoặc bằng Ngày lập hồ sơ. |
| **Bước 4: Hệ thống hóa & Hợp nhất & Pháp điển (Hiển thị động theo Loại tham mưu)** | | | | |
| **Nếu Loại tham mưu = Hệ thống hóa (Nhóm 4A)** | | | | |
| Tên kỳ hệ thống hóa | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Thời điểm hệ thống hóa | Date | Có | Lấy theo dữ liệu hiện tại | - Chỉ đọc.<br>- Tự động cập nhật theo kỳ được chọn. |
| Kết quả xếp loại trong danh mục | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Loại danh mục đầu ra | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Cơ quan chủ trì hệ thống hóa | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Quyết định công bố kết quả hệ thống hóa của Bộ trưởng Bộ Tư pháp | String(100) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. Không kiểm tra trùng lặp. |
| Ngày công bố kết quả | Date | Có | Lấy theo dữ liệu hiện tại | - Validate nhỏ hơn hoặc bằng ngày hiện tại. |
| **Nếu Loại tham mưu = Pháp điển (Nhóm 4B)** | | | | |
| Hình thức thực hiện pháp điển | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Đề mục cần cập nhật | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Hiển thị động và bắt buộc khi chọn "Cập nhật đề mục đã công bố". |
| Chủ đề pháp điển | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Tên đề mục pháp điển | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Mã đề mục | String(50) | Có | Lấy theo dữ liệu hiện tại | - Chỉ đọc.<br>- Tự sinh theo chủ đề + đề mục được chọn. |
| Vị trí trong đề mục | String(250) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Bộ/cơ quan thực hiện pháp điển | Enum(String(100)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Ngày hoàn thành pháp điển | Date | Không | Lấy theo dữ liệu hiện tại | - Validate lớn hơn hoặc bằng Ngày bắt đầu rà soát. |
| **Nếu Loại tham mưu = Hợp nhất (Nhóm 5)** | | | | |
| Danh sách văn bản gốc được hợp nhất | String(500) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Danh sách văn bản sửa đổi, bổ sung qua từng lần | String(1000) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Số, ký hiệu văn bản hợp nhất | String(100) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. Không kiểm tra trùng lặp. |
| Ngày ký văn bản hợp nhất | Date | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Người ký | String(100) | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Thời hạn hoàn thành hợp nhất theo quy định | Date | Có | Lấy theo dữ liệu hiện tại | - Chỉ đọc.<br>- Tự động cập nhật nếu thông tin liên quan thay đổi. |
| Ghi chú nội dung hợp nhất | String(1000) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| **Bước 5: Tiến độ thực hiện** | | | | |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Gồm các trạng thái:<br>- Mới tạo<br>- Đang thực hiện<br>- Hoàn thành. |
| Căn cứ thực hiện | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Giai đoạn hiện tại | Enum(String(50)) | Có | Lấy theo dữ liệu hiện tại | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa. |
| Ngày bắt đầu rà soát | Date | Có | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| Ngày hoàn thành dự kiến | Date | Có | Lấy theo dữ liệu hiện tại | - Validate lớn hơn hoặc bằng Ngày bắt đầu rà soát. |
| Ngày hoàn thành thực tế | Date | Không | Lấy theo dữ liệu hiện tại | - Bắt buộc khi Trạng thái hồ sơ = Hoàn thành. Validate lớn hơn hoặc bằng Ngày bắt đầu rà soát và nhỏ hơn hoặc bằng ngày hiện tại. |
| Ghi chú tiến độ | String(1000) | Không | Lấy theo dữ liệu hiện tại | - Cho phép chỉnh sửa. |
| **Bước 6: Đính kèm tài liệu** | | | | |
| (Các trường tệp đính kèm tương tự MH01) | File | - | - | Control UI: Upload file.<br>- Cho phép tải tệp mới lên, hiển thị liên kết xem tệp hiện hành, hoặc xóa tệp đính kèm cũ. |
| **Nút chức năng** | | | | (Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình) |
| Lưu nháp | - | - | - | - Hiển thị ở mọi bước trong Stepper. |
| Tiếp tục | String(255) | - | - | - Hiển thị ở các bước từ 1 đến 5. |
| Quay lại | String(255) | - | - | - Hiển thị ở các bước từ 2 đến 6. |
| Lưu | - | - | - | - Chỉ hiển thị ở bước 6. |
| Hủy | - | - | - | - Hiển thị ở mọi bước trong Stepper. |

**4.3.2.10.6.3.3. Chức năng trên màn hình**
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tiếp tục | Nút | - Thao tác: NSD click nút Tiếp tục.<br>- Xử lý: Hệ thống thực hiện kiểm tra dữ liệu tương tự MH01. Nếu không có lỗi, chuyển bước. |
|  |  |  | - TH Hợp lệ: Hệ thống chuyển sang bước tiếp theo trong Stepper. |
| 2 | Quay lại | Nút | - Thao tác: NSD click nút Quay lại.<br>- Xử lý: Hệ thống chuyển về bước trước đó trong Stepper, giữ nguyên dữ liệu đã nhập. |
| 3 | Lưu nháp | Nút | - Thao tác: NSD click nút Lưu nháp.<br>- Xử lý: Hệ thống kiểm tra và thực hiện cập nhật các thông tin tạm thời của hồ sơ (không validate bắt buộc toàn bộ). Lưu nháp với trạng thái "Mới tạo". Hiển thị thông báo thành công: "Lưu nháp hồ sơ thành công" và quay lại màn hình Tra cứu (UC236.MH01). |
| 4 | Lưu | Nút | - Thao tác: NSD click nút Lưu ở bước 6.<br>- Xử lý: Hệ thống thực hiện kiểm tra dữ liệu toàn bộ 6 bước:<br>- TH1 (Bỏ trống trường bắt buộc): Có trường bắt buộc bị bỏ trống. Hệ thống tự động chuyển Stepper về bước chứa trường lỗi đầu tiên, highlight viền đỏ và hiển thị cảnh báo: "Vui lòng hoàn thiện đầy đủ thông tin bắt buộc tại các bước trước khi Lưu." |
|  |  |  | - TH2 (Sai logic ngày hoàn thành dự kiến): Ngày hoàn thành dự kiến nhỏ hơn Ngày bắt đầu rà soát. Hệ thống báo lỗi tại trường: "Ngày hoàn thành dự kiến phải lớn hơn hoặc bằng Ngày bắt đầu rà soát." Focus và highlight viền đỏ. |
|  |  |  | - TH3 (Sai logic ngày hoàn thành thực tế): Trạng thái hồ sơ chọn là "Hoàn thành" nhưng Ngày hoàn thành thực tế bị trống hoặc nhỏ hơn Ngày bắt đầu rà soát hoặc lớn hơn ngày hiện tại. Hệ thống hiển thị thông báo lỗi: "Ngày hoàn thành thực tế bắt buộc nhập, phải lớn hơn hoặc bằng Ngày bắt đầu rà soát và nhỏ hơn hoặc bằng ngày hiện tại." Focus và highlight viền đỏ. |
|  |  |  | - TH Hợp lệ: Hệ thống lưu cập nhật thông tin hồ sơ vào CSDL, ghi nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Cập nhật hồ sơ tham mưu thành công" và chuyển hướng về màn hình Tra cứu (UC236.MH01). |
| 5 | Hủy | Nút | - Thao tác: NSD click nút Hủy.<br>- Xử lý: Đóng form cập nhật, không lưu dữ liệu vừa thay đổi, quay lại màn hình Tra cứu (UC236.MH01). |

##### 4.3.2.10.6.4. UC235.MH03 - Panel xem chi tiết hồ sơ tham mưu

**4.3.2.10.6.4.1. Màn hình**
![Màn hình Xem chi tiết hồ sơ tham mưu](images/UC235_Detail.png)

**4.3.2.10.6.4.2. Mô tả thông tin trên màn hình**
Màn hình xem chi tiết hiển thị dưới dạng Panel chỉ đọc (inline dưới bảng kết quả tra cứu, không dùng popup). Các trường dữ liệu không bắt buộc và bị trống sẽ tự động được ẩn đi.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin định danh hồ sơ** | | | | |
| Số hiệu hồ sơ | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị số hiệu hồ sơ kèm badge loại tham mưu và trạng thái. |
| Ngày lập hồ sơ | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày lập hồ sơ. |
| Lĩnh vực pháp luật | Enum(String(50)) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị lĩnh vực pháp luật. |
| Năm thực hiện | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị năm thực hiện. |
| Số/Kế hoạch căn cứ thực hiện | Text(2000) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| Đơn vị chủ trì | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên đơn vị chủ trì. |
| Cán bộ phụ trách | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị họ tên cán bộ phụ trách. |
| Ghi chú định danh | Text(2000) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| **II. Thông tin văn bản QPPL** | | | | |
| Tên văn bản | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên văn bản. |
| Số, ký hiệu văn bản | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị số ký hiệu. |
| Loại văn bản | Enum(String(50)) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị loại văn bản. |
| Cơ quan ban hành | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị cơ quan ban hành. |
| Ngày ban hành | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày ban hành. |
| Ngày có hiệu lực | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày có hiệu lực. |
| Ngày hết hiệu lực | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| Hiệu lực hiện tại | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị hiệu lực hiện tại. |
| Văn bản thay thế/sửa đổi liên quan | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| Tóm tắt nội dung văn bản | Text(2000) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| **III. Kết quả rà soát, kiến nghị, mức độ ưu tiên** | | | | |
| Kết quả rà soát | Text(2000) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị kết quả rà soát. |
| Nội dung cụ thể cần sửa đổi/bổ sung | Text(2000) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Chỉ hiển thị nếu Kết quả rà soát là "Cần sửa đổi". |
| Mâu thuẫn/chồng chéo với văn bản khác | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| Bất cập, vướng mắc trong thực tiễn thi hành | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| Kiến nghị xử lý | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị kiến nghị. |
| Cơ quan có thẩm quyền xử lý | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên cơ quan. |
| Mức độ ưu tiên | Enum(String(50)) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị mức ưu tiên. |
| Thời hạn xử lý kiến nghị | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| **IV. Thông tin Hệ thống hóa / Pháp điển / Hợp nhất** | | | | (Chỉ hiển thị phần tương ứng với Loại tham mưu) |
| *Nếu Loại tham mưu = Hệ thống hóa* | Enum(String(50)) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị các trường: Tên kỳ hệ thống hóa, Thời điểm hệ thống hóa, Kết quả xếp loại, Loại danh mục đầu ra, Cơ quan chủ trì, Số quyết định công bố, Ngày công bố. |
| *Nếu Loại tham mưu = Pháp điển* | Enum(String(50)) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị các trường: Hình thức pháp điển, Đề mục cần cập nhật (nếu có), Chủ đề pháp điển, Tên đề mục pháp điển, Mã đề mục, Vị trí trong đề mục, Bộ/cơ quan thực hiện, Ngày hoàn thành. |
| *Nếu Loại tham mưu = Hợp nhất* | Enum(String(50)) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị các trường: Danh sách VB gốc, Danh sách VB sửa đổi, Số ký hiệu VBHN, Ngày ký VBHN, Người ký, Thời hạn hoàn thành quy định, Ghi chú nội dung hợp nhất. |
| **V. Tiến độ thực hiện** | | | | |
| Trạng thái hồ sơ | Enum(String(50)) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị trạng thái tiến độ hiện tại. |
| Căn cứ thực hiện | Text(2000) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị căn cứ thực hiện. |
| Giai đoạn hiện tại | String(255) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị giai đoạn công việc. |
| Ngày bắt đầu rà soát | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị ngày bắt đầu. |
| Ngày hoàn thành dự kiến | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị hạn dự kiến. |
| Ngày hoàn thành thực tế | Date | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị nếu có dữ liệu. |
| Ghi chú tiến độ | Text(2000) | - | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Ẩn nếu trống. |
| **VI. Danh sách file đính kèm** | File | - | Lấy theo dữ liệu hồ sơ | - Hiển thị danh mục tệp tin dạng bảng chỉ đọc. Hỗ trợ click vào tên file để tải xuống trực tiếp. Không cho phép xóa file. |
| **Nút chức năng** | | | | (Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình) |
| Chỉnh sửa | String(255) | - | - | - Nút hiển thị ở góc trên bên phải của Panel. |
| In hồ sơ | String(255) | - | - | - Nút hiển thị ở góc trên bên phải của Panel. |
| Xóa | - | - | - | - Nút hiển thị ở góc trên bên phải của Panel. |
| Quay lại | String(255) | - | - | - Nút đóng Panel xem chi tiết. |

**4.3.2.10.6.4.3. Chức năng trên màn hình**
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chỉnh sửa | Nút | - Thao tác: NSD click nút Chỉnh sửa.<br>- Xử lý: Hệ thống chuyển hướng sang màn hình Cập nhật hồ sơ tham mưu (UC235.MH02). |
| 2 | In hồ sơ | Nút | - Thao tác: NSD click nút In hồ sơ.<br>- Xử lý: Hệ thống kết xuất thông tin chi tiết của hồ sơ ra định dạng PDF và kích hoạt tính năng tải xuống. |
| 3 | Xóa | Nút | - Thao tác: NSD click nút Xóa.<br>- Xử lý: Hệ thống mở Popup xác nhận xóa hồ sơ tham mưu (UC235.MH04). |
| 4 | Quay lại | Nút | - Thao tác: NSD click nút Quay lại.<br>- Xử lý: Hệ thống đóng Panel xem chi tiết và đưa giao diện về trạng thái lưới kết quả tìm kiếm thông thường. |

##### 4.3.2.10.6.5. UC235.MH04 - Popup xác nhận xóa hồ sơ tham mưu

**4.3.2.10.6.5.1. Màn hình**
![Popup xác nhận xóa hồ sơ tham mưu](images/UC235_Delete.png)

**4.3.2.10.6.5.2. Mô tả thông tin trên màn hình**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số hiệu hồ sơ | String(255) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị số hiệu hồ sơ cần xóa. |
| Tên văn bản | String(255) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị tên văn bản quy phạm pháp luật của hồ sơ cần xóa. |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Lấy theo dữ liệu hồ sơ | Control UI: Hiển thị/Read-only.<br>- Hiển thị trạng thái hiện tại. |
| Lý do xóa | String(500) | Có | Trống | - Người dùng bắt buộc nhập lý do thực hiện xóa hồ sơ. |
| Xác nhận xóa | String(255) | - | - | - Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Hủy | - | - | - | - Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

**4.3.2.10.6.5.3. Chức năng trên màn hình**
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận xóa | Nút | - Thao tác: NSD click nút Xác nhận xóa.<br>- Xử lý: Hệ thống thực hiện kiểm tra dữ liệu:<br>- TH1 (Bỏ trống lý do xóa): Trường Lý do xóa bị bỏ trống. Hệ thống hiển thị thông báo lỗi: "Lý do xóa là trường bắt buộc." Focus và highlight viền đỏ ô nhập liệu. Không thực hiện xóa. |
|  |  |  | - TH Hợp lệ: Hệ thống cập nhật trạng thái xóa logic cho hồ sơ tham mưu trong Cơ sở dữ liệu (xóa mềm), ghi nhận lý do xóa, ghi nhận nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Xóa hồ sơ tham mưu thành công", đóng popup và làm mới lưới kết quả tra cứu (UC236.MH01). |
| 2 | Hủy | Nút | - Thao tác: NSD click nút Hủy.<br>- Xử lý: Đóng popup xác nhận xóa và quay lại Panel xem chi tiết hồ sơ (UC235.MH03) mà không thực hiện thay đổi nào. |

---

#### 4.3.2.10.7. UC236 - Tra cứu thông tin tham mưu rà soát, hệ thống hóa, hợp nhất VBQPPL và pháp điển

##### 4.3.2.10.7.1. Mục đích
Cho phép Cán bộ nghiệp vụ và Lãnh đạo Cục thực hiện tìm kiếm hồ sơ tham mưu, theo dõi các mốc tiến độ, xem KPI thống kê và kết xuất dữ liệu báo cáo ra các định dạng Excel, Word, PDF theo nhu cầu.

*a. Phân quyền*
\- Cán bộ nghiệp vụ.
\- Lãnh đạo Cục.

*b. Điều kiện thực hiện*
\- Người dùng đã đăng nhập thành công vào hệ thống.
\- Hệ thống hoạt động bình thường.

##### 4.3.2.10.7.2. UC236.MH01 - Màn hình Tra cứu hồ sơ tham mưu rà soát, hệ thống hóa, hợp nhất và pháp điển

**4.3.2.10.7.2.1. Màn hình**
![Màn hình Tra cứu hồ sơ tham mưu](images/UC236_Search.png)

**4.3.2.10.7.2.2. Mô tả thông tin trên màn hình**
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tra cứu** | | | | |
| Từ khóa tìm kiếm | String(255) | Không | Trống | - Tìm gần đúng không phân biệt hoa thường theo Tên văn bản, Số hiệu văn bản, Mã hồ sơ. |
| Loại tham mưu | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn lọc theo Loại tham mưu (Rà soát / Hệ thống hóa / Hợp nhất / Pháp điển / Tất cả). |
| Lĩnh vực pháp luật | Enum(String(100)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn lọc theo Lĩnh vực pháp luật (GDBĐ / Bồi thường NN / Hộ tịch / THADS / Tất cả). |
| Kết quả rà soát | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn lọc theo Kết quả rà soát (Còn phù hợp / Cần sửa đổi / Cần thay thế / Cần bãi bỏ / Cần đình chỉ thi hành / Cần ban hành mới / Tất cả). |
| Trạng thái hồ sơ | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn lọc theo Trạng thái hồ sơ (Mới tạo / Đang thực hiện / Hoàn thành / Tất cả). |
| Năm thực hiện | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn lọc theo năm thực hiện hồ sơ. |
| Từ ngày ban hành | Date | Không | Trống | - Lọc văn bản ban hành từ ngày. |
| Đến ngày ban hành | Date | Không | Trống | - Lọc văn bản ban hành đến ngày. Validate Từ ngày phải nhỏ hơn hoặc bằng Đến ngày. |
| **II. Thống kê KPI** | String(255) | - | - | - Hiển thị 4 khối thống kê nhanh:<br>- 1. Tổng số hồ sơ tìm được<br>- 2. Số hồ sơ hoàn thành<br>- 3. Số hồ sơ cần sửa đổi<br>- 4. Số hồ sơ cần bãi bỏ. |
| **III. Bảng danh sách kết quả (Grid)** | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Phân trang mặc định **20 bản ghi/trang**.<br>- Sắp xếp mặc định: Ngày lập hồ sơ giảm dần. Cho phép sắp xếp theo: Tên VB A-Z, Năm thực hiện, Trạng thái.<br>- Cơ chế Row Click: Click vào dòng dữ liệu (ngoại trừ khi click các icon ở cột Thao tác nhanh) sẽ mở Panel xem chi tiết (UC235.MH03) ngay dưới bảng. |
| Cột: Checkbox chọn nhiều | Boolean | - | Unchecked | Control UI: Checkbox.<br>- Cho phép tích chọn một hoặc nhiều hồ sơ để thực hiện xuất file theo lô. |
| Cột: Số hồ sơ | String(30) | - | - | - Hiển thị số hiệu hồ sơ. |
| Cột: Tên văn bản QPPL | String(500) | - | - | - Hiển thị tên văn bản dạng liên kết. Click vào liên kết để mở Panel xem chi tiết (UC235.MH03) phía dưới. |
| Cột: Loại tham mưu | String(50) | - | - | - Badge màu:<br>- Rà soát (Xanh dương)<br>- Hệ thống hóa/Hợp nhất/Pháp điển (Tím). |
| Cột: Năm thực hiện | String(255) | - | - | - Hiển thị năm thực hiện công việc. |
| Cột: Kết quả rà soát | String(100) | - | - | - Badge màu:<br>- Còn phù hợp (Xanh lá)<br>- Cần sửa đổi (Vàng)<br>- Cần bãi bỏ (Đỏ)<br>- Các kết quả khác (Không màu). |
| Cột: Trạng thái hồ sơ | String(50) | - | - | - Badge màu:<br>- Hoàn thành (Xanh lá)<br>- Đang thực hiện (Xanh dương)<br>- Mới tạo (Không màu). |
| Cột: Thao tác nhanh | String(255) | - | - | - Gồm các tác vụ con:<br>- **Cập nhật**: Biểu tượng Sửa. Chi tiết nghiệp vụ xem ở bảng Chức năng.<br>- **Tải file**: Biểu tượng Tải file. Chi tiết nghiệp vụ xem ở bảng Chức năng. |
| **Nút chức năng** | | | | (Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình) |
| Tìm kiếm | String(255) | - | - | - Hiển thị cạnh Bộ lọc tra cứu. |
| Xóa bộ lọc | - | - | - | - Hiển thị cạnh Bộ lọc tra cứu. |
| Thêm mới hồ sơ | - | - | - | - Hiển thị ở góc trên bên phải của bảng kết quả. |
| Xuất Excel | String(255) | - | - | - Hiển thị ở góc dưới bên trái của bảng kết quả. |
| Xuất Word | String(255) | - | - | - Hiển thị ở góc dưới bên trái của bảng kết quả. |
| Xuất PDF | String(255) | - | - | - Hiển thị ở góc dưới bên trái của bảng kết quả. |

**4.3.2.10.7.2.3. Chức năng trên màn hình**
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | - Thao tác: NSD click nút Tìm kiếm.<br>- Xử lý: Lấy danh sách hồ sơ khớp bộ lọc lọc từ Cơ sở dữ liệu:<br>- TH1 (Không tìm thấy): Không có hồ sơ nào thỏa mãn điều kiện. Hệ thống hiển thị thông điệp "Không tìm thấy kết quả phù hợp" trên lưới. |
|  |  |  | - TH Hợp lệ: Tải danh sách kết quả lên lưới, phân trang 20 dòng/trang, cập nhật các chip tag lọc đang áp dụng và số liệu KPI thống kê đầu trang. |
| 2 | Xóa bộ lọc | Nút | - Thao tác: NSD click nút Xóa bộ lọc.<br>- Xử lý: Reset toàn bộ các tham số lọc về giá trị mặc định, tự động load lại danh sách đầy đủ ban đầu. |
| 3 | Thêm mới hồ sơ | Nút | - Thao tác: NSD click nút Thêm mới hồ sơ.<br>- Xử lý: Hệ thống chuyển hướng người dùng sang màn hình Thêm mới hồ sơ tham mưu (UC235.MH01). |
| 4 | Cập nhật | Biểu tượng | - Thao tác: NSD click biểu tượng Cập nhật trên dòng kết quả.<br>- Xử lý: Hệ thống kiểm tra quyền chỉnh sửa hồ sơ:<br>- TH1 (Không có quyền): Người dùng không thuộc đơn vị chủ trì hoặc không được phân công hồ sơ này. Hệ thống hiển thị cảnh báo lỗi: "Bạn không có quyền chỉnh sửa hồ sơ này." |
|  |  |  | - TH Hợp lệ: Hệ thống điều hướng sang màn hình Cập nhật hồ sơ tham mưu (UC235.MH02). |
| 5 | Tải file | Biểu tượng | - Thao tác: NSD click biểu tượng Tải file trên dòng kết quả.<br>- Xử lý: Hệ thống kiểm tra tệp đính kèm đầu ra của hồ sơ:<br>- TH1 (Không có tệp đầu ra): Hồ sơ chưa tải lên văn bản hợp nhất, kết quả pháp điển hoặc báo cáo rà soát đầu ra. Hệ thống hiển thị thông báo lỗi: "Hồ sơ chưa có tệp đính kèm kết quả đầu ra để tải xuống." |
|  |  |  | - TH Hợp lệ: Kích hoạt tính năng tải xuống tệp kết quả đầu ra chính của hồ sơ (file văn bản hợp nhất hoặc file kết quả pháp điển hoặc báo cáo rà soát). |
| 6 | Xuất Excel | Nút | - Thao tác: NSD click nút Xuất Excel.<br>- Xử lý: Hệ thống kiểm tra danh sách kết quả tìm kiếm:<br>- TH1 (Danh sách rỗng): Không có dữ liệu trên bảng kết quả. Hệ thống hiển thị thông báo lỗi: "Không có dữ liệu để xuất Excel." |
|  |  |  | - TH Hợp lệ: Hệ thống kết xuất toàn bộ danh sách kết quả tìm kiếm hiện tại ra file Excel (.xlsx) theo cấu trúc báo cáo của Bộ Tư pháp và tải xuống máy. |
| 7 | Xuất Word | Nút | - Thao tác: NSD click nút Xuất Word.<br>- Xử lý: Hệ thống kiểm tra các hồ sơ được chọn:<br>- TH1 (Chưa chọn hồ sơ): Chưa tích chọn bất kỳ checkbox nào trên lưới. Hệ thống hiển thị thông báo lỗi: "Vui lòng chọn ít nhất một hồ sơ để kết xuất Word." |
|  |  |  | - TH Hợp lệ: Hệ thống kết xuất báo cáo tổng hợp theo biểu mẫu của các hồ sơ được chọn ra file Word (.docx) và tự động tải xuống. |
| 8 | Xuất PDF | Nút | - Thao tác: NSD click nút Xuất PDF.<br>- Xử lý: Hệ thống kiểm tra các hồ sơ được chọn:<br>- TH1 (Chưa chọn hồ sơ): Chưa tích chọn bất kỳ checkbox nào trên lưới. Hệ thống hiển thị thông báo lỗi: "Vui lòng chọn ít nhất một hồ sơ để kết xuất PDF." |
|  |  |  | - TH Hợp lệ: Hệ thống kết xuất danh sách hoặc thông tin chi tiết các hồ sơ được chọn ra file PDF (tối đa 40 dòng/trang, lặp lại tiêu đề bảng ở mỗi trang) và tải xuống máy. |
