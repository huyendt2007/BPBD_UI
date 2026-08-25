### 4.1.20. UC536 - Tra cứu Văn bản Quy phạm Pháp luật

#### 4.1.20.1. Mục đích
\- Cho phép khách hàng tra cứu, tìm kiếm, xem chi tiết và tải xuống các văn bản quy phạm pháp luật (QPPL) liên quan đến hai lĩnh vực nghiệp vụ chính: Đăng ký biện pháp bảo đảm (BPBĐ) và Bồi thường nhà nước (BTNN).  

*a. Phân quyền*
\- Mọi đối tượng người sử dụng truy cập Website Khách hàng (bao gồm cả khách hàng vãng lai chưa đăng nhập và khách hàng đã đăng nhập tài khoản).  

*b. Điều kiện thực hiện*
\- Người sử dụng truy cập vào Website Khách hàng.  
\- Hệ thống hoạt động bình thường, kết nối internet và máy chủ lưu trữ file PDF ổn định.  

---

#### 4.1.20.2. UC536.MH01 - Màn hình Tra cứu Văn bản Quy phạm Pháp luật

##### 4.1.20.2.1. Màn hình
\- Giao diện chính hiển thị bộ lọc tìm kiếm văn bản và lưới danh sách kết quả, được chia làm 2 Tab tương ứng với 2 lĩnh vực nghiệp vụ của hệ thống:  
  \+ **Tab Biện pháp bảo đảm**: Tìm kiếm và hiển thị các văn bản quy phạm pháp luật thuộc lĩnh vực bảo đảm thực hiện nghĩa vụ và đăng ký biện pháp bảo đảm (ví dụ: Bộ luật Dân sự, Nghị định 99/2022/NĐ-CP, Thông tư hướng dẫn...).  
  \+ **Tab Bồi thường nhà nước**: Tìm kiếm và hiển thị các văn bản quy phạm pháp luật thuộc lĩnh vực trách nhiệm bồi thường của Nhà nước (ví dụ: Luật Trách nhiệm bồi thường của Nhà nước 2017, các Nghị định và Thông tư hướng dẫn thi hành...).  
\- Phía dưới bộ lọc tìm kiếm là Lưới hiển thị danh sách các văn bản QPPL thỏa mãn điều kiện lọc.  
\- Mặc định sắp xếp danh sách văn bản theo thứ tự thời gian ban hành giảm dần (văn bản ban hành mới nhất hiển thị ở đầu).  
\- Hình ảnh minh họa giao diện:  
![Màn hình Tra cứu Văn bản Quy phạm Pháp luật](images/UC536_MH01.png)  

##### 4.1.20.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Chọn Phân hệ Nghiệp vụ (Tabs)** | | | | |
| Tab Biện pháp bảo đảm | String(255) | \- | Active | \- Click chọn để xem các văn bản quy phạm pháp luật thuộc lĩnh vực Biện pháp bảo đảm. |
| Tab Bồi thường nhà nước | String(255) | \- | \- | \- Click chọn để xem các văn bản quy phạm pháp luật thuộc lĩnh vực Bồi thường nhà nước. |
| **II. Bộ lọc Tìm kiếm (Áp dụng cho cả 2 Tabs)** | | | | |
| Số văn bản | String(50) | Không | Trống | \- Nhập số hiệu văn bản cần tìm kiếm.<br>\- Tự động cắt khoảng trắng thừa (Trim space). |
| Ngày văn bản | Date | Không | Trống | \- Chọn hoặc nhập ngày ban hành văn bản. Định dạng: dd/mm/yyyy. |
| Trích yếu | String(250) | Không | Trống | \- Nhập từ khóa trích yếu hoặc nội dung tóm tắt văn bản để tìm gần đúng. |
| Cơ quan ban hành | Enum(String(100)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>\- Chọn cơ quan ban hành văn bản để lọc kết quả.<br>\- Gồm các giá trị:<br>+ **Tất cả**<br>+ Các Cơ quan ban hành hiện có trên các văn bản QPPL |
| Tìm kiếm | - | \- | \- | Control UI: Nút bấm.<br>\- Nút kích hoạt tìm kiếm.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Xóa bộ lọc | - | \- | \- | Control UI: Nút bấm.<br>\- Nút thiết lập lại bộ lọc về mặc định.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **III. Bảng danh sách kết quả** | - | \- | 30 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>\- Lưới hiển thị danh sách các văn bản thỏa mãn bộ lọc tìm kiếm.<br>\- Sắp xếp mặc định: Thời gian ban hành giảm dần.<br>\- Phân trang: Mặc định hiển thị 30 dòng/trang. Cho phép người dùng tùy chọn hiển thị: 5, 10, 20, 30 dòng/trang. Có tích hợp nút chuyển trang Trước, Sau, trang Đầu, trang Cuối.<br>\- Thao tác: NSD nhấp đúp hoặc nhấp chuột trực tiếp vào dòng bản ghi, hoặc click chọn nút [Xem] tại cột Thao tác để xem chi tiết văn bản (mở màn hình UC536.MH02 tại Tab mới).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Cột: STT | Integer(10) | \- | \- | \- Số thứ tự dòng trên trang hiện tại, tự động tăng. |
| Cột: Số văn bản | String(50) | \- | \- | \- Số hiệu của văn bản luật. |
| Cột: Ngày văn bản | Date | \- | \- | \- Ngày ban hành văn bản (dd/mm/yyyy). |
| Cột: Ngày có hiệu lực | Date | \- | \- | \- Ngày văn bản bắt đầu có hiệu lực thi hành (dd/mm/yyyy). |
| Cột: Cơ quan ban hành | String(255) | \- | \- | \- Tên cơ quan ban hành văn bản luật. |
| Cột: Trích yếu | Text(2000) | \- | \- | \- Nội dung trích yếu của văn bản. |
| Cột: Thao tác | String(255) | \- | \- | \- Hiển thị nút hoặc liên kết [Xem] cho phép xem chi tiết file văn bản (mở màn hình UC536.MH02 tại Tab mới). |

##### 4.1.20.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | \- Thao tác: NSD click chọn nút Tìm kiếm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| | | | \- TH1 (Không tìm thấy kết quả): Bộ lọc không khớp với bất kỳ văn bản nào trong CSDL. Lưới kết quả hiển thị thông báo: "Không có dữ liệu phù hợp." |
| | | | \- TH Hợp lệ: Hệ thống thực hiện lọc gần đúng không phân biệt hoa thường theo các tiêu chí (Số văn bản, Ngày văn bản, Trích yếu, Cơ quan ban hành) của Tab nghiệp vụ hiện tại, cập nhật lại danh sách trên lưới. |
| 2 | Xóa bộ lọc | Nút | \- Thao tác: NSD click chọn nút Xóa bộ lọc. |
| | | | \- TH Hợp lệ: Reset toàn bộ các trường lọc về giá trị mặc định (Số văn bản, Ngày văn bản, Trích yếu về rỗng; Cơ quan ban hành về "Tất cả"). Tải lại lưới danh sách văn bản đầy đủ theo thứ tự thời gian ban hành giảm dần. |

---

#### 4.1.20.3. UC536.MH02 - Màn hình Chi tiết Văn bản QPPL (Xem tại Tab mới)

##### 4.1.20.3.1. Màn hình
\- Giao diện hiển thị chi tiết nội dung của văn bản quy phạm pháp luật đã chọn dưới dạng xem trực tuyến file tài liệu PDF toàn màn hình (PDF Viewer).  
\- Màn hình này được mở riêng sang một **Tab trình duyệt mới** để giữ lại Tab danh sách gốc cho NSD tiếp tục tra cứu các văn bản khác.  
\- Trên thanh công cụ trên cùng có tiêu đề file PDF, ô hiển thị số trang, bộ công cụ Thu nhỏ/Phóng to/Vừa khít màn hình, Xoay trang, Tải xuống và In ấn.  
\- Có icon "Thông tin" (info) ở góc màn hình cho phép mở/đóng (toggle) khối Sidebar metadata mô tả tại mục III bên dưới, hiển thị đè lên/thu gọn cạnh khung xem PDF.  
\- Hình ảnh minh họa giao diện:  
![Màn hình Chi tiết Văn bản QPPL](images/UC536_MH02.png)  

##### 4.1.20.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thanh công cụ (Toolbar)** | | | | |
| Tên file PDF | File | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Tên file văn bản định dạng `.pdf` (Ví dụ: `99_2022_ND-CP.pdf`). |
| Số trang | String(255) | Có | "1" | Control UI: Textbox.<br>\- Hiển thị trang hiện tại và tổng số trang của văn bản. |
| Thu nhỏ | - | \- | \- | Control UI: Nút bấm.<br>\- Nút giảm tỷ lệ hiển thị trang văn bản PDF. |
| Tỷ lệ hiển thị | Decimal(5,2) | Có | "100%" | Control UI: Hiển thị/Read-only.<br>\- Hiển thị tỷ lệ zoom hiện hành của tài liệu. |
| Phóng to | - | \- | \- | Control UI: Nút bấm.<br>\- Nút tăng tỷ lệ hiển thị trang văn bản PDF. |
| Vừa khít màn hình | - | \- | \- | Control UI: Nút bấm.<br>\- Nút reset tỷ lệ zoom về 100%. |
| Xoay trang | - | \- | \- | Control UI: Nút bấm.<br>\- Nút xoay trang văn bản 90 độ theo chiều kim đồng hồ.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Tải xuống | - | \- | \- | Control UI: Nút bấm.<br>\- Nút tải file văn bản PDF gốc về máy tính.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| In ấn | - | \- | \- | Control UI: Nút bấm.<br>\- Nút kết nối máy in để in trực tiếp văn bản.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **II. Khung hiển thị nội dung tài liệu** | | | | |
| Nội dung văn bản | File | Có | Lấy từ hệ thống | \- Vùng hiển thị toàn bộ trang tài liệu văn bản gốc có chữ ký và con dấu số của cơ quan ban hành. |
| **III. Sidebar Metadata (Bật/tắt bằng icon Thông tin)** | | | | |
| Số hiệu văn bản | String(50) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only. |
| Loại văn bản | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Tham chiếu Danh mục dùng chung - Loại văn bản quy phạm pháp luật **[DM_21]**. |
| Cơ quan ban hành | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only. |
| Ngày ban hành | Date | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only. Định dạng `DD/MM/YYYY`. |
| Ngày có hiệu lực | Date | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only. Định dạng `DD/MM/YYYY`. |
| Trạng thái hiệu lực | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị dạng Badge màu.<br>\- Hệ thống tự tính toán dựa trên Ngày có hiệu lực (và Ngày hết hiệu lực nếu có) so với ngày hiện tại. |
| Lĩnh vực nghiệp vụ | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Biện pháp bảo đảm hoặc Bồi thường nhà nước. |
| Người ký / Chức danh | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Chỉ hiển thị nếu có dữ liệu. |
| Trích yếu | Text(2000) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only. |
| Tài liệu đính kèm liên quan | File | Không | Lấy từ hệ thống | Control UI: Bảng/Danh sách hiển thị.<br>\- Danh sách các tệp tài liệu liên quan đến văn bản (nếu có), mỗi tệp có liên kết "Xem file" (mở tại một tab riêng) và "Tải về". Chỉ hiển thị nếu có dữ liệu. |
| Media hướng dẫn | File | Không | Lấy từ hệ thống | Control UI: Danh sách hiển thị.<br>\- Danh sách video hướng dẫn liên quan đến văn bản (nếu có). Chỉ hiển thị nếu có dữ liệu. |

##### 4.1.20.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xoay trang | Nút | \- Thao tác: NSD click chọn nút Xoay trang. |
| | | | \- TH Hợp lệ: Hệ thống xoay tài liệu PDF hiển thị góc 90 độ phục vụ đọc các trang nằm ngang. |
| 2 | Tải xuống | Nút | \- Thao tác: NSD click chọn nút Tải xuống. |
| | | | \- TH Hợp lệ: Hệ thống thực hiện tải file PDF gốc của văn bản QPPL tương ứng về thiết bị của người dùng. |
| 3 | In ấn | Nút | \- Thao tác: NSD click chọn nút In ấn. |
| | | | \- TH Hợp lệ: Hệ thống gọi hộp thoại in của trình duyệt để NSD thực hiện in tài liệu ra máy in. |
| 4 | Icon Thông tin (Toggle Sidebar) | Icon | \- Thao tác: NSD click chọn icon Thông tin. |
| | | | \- TH Hợp lệ: Bật/tắt hiển thị khối Sidebar Metadata (mục III tại 4.1.20.3.2) cạnh khung xem PDF. |

---

### 4.1.21. UC280 & UC513 - Tra cứu Câu hỏi và Câu trả lời thường gặp

#### 4.1.21.1. Mục đích
\- Cho phép người sử dụng (NSD) tra cứu, tìm kiếm và xem chi tiết nội dung các câu hỏi và câu trả lời thường gặp (FAQs) nhằm hỗ trợ giải đáp các thắc mắc nghiệp vụ và kỹ thuật liên quan đến hai lĩnh vực: Đăng ký biện pháp bảo đảm (UC280) và Bồi thường nhà nước (UC513).  

*a. Phân quyền*
\- Mọi đối tượng người sử dụng truy cập Website Khách hàng (bao gồm cả khách hàng vãng lai chưa đăng nhập và khách hàng đã đăng nhập tài khoản).  

*b. Điều kiện thực hiện*
\- Người sử dụng truy cập vào Website Khách hàng.  
\- Hệ thống hoạt động bình thường, kết nối cơ sở dữ liệu ổn định.  

---

#### 4.1.21.2. UC280_UC513.MH01 - Màn hình Tra cứu Câu hỏi và Câu trả lời thường gặp

##### 4.1.21.2.1. Màn hình
\- Giao diện chính hiển thị danh sách các câu hỏi thường gặp dưới dạng danh sách rút gọn hoặc danh mục, được chia làm 2 Tab tương ứng với 2 lĩnh vực nghiệp vụ của hệ thống:  
  \+ **Tab Biện pháp bảo đảm** (UC280): Tìm kiếm và hiển thị danh sách câu hỏi - câu trả lời liên quan đến quy trình đăng ký mới, thay đổi, xóa biện pháp bảo đảm, phí và lệ phí...  
  \+ **Tab Bồi thường nhà nước** (UC513): Tìm kiếm và hiển thị danh sách câu hỏi - câu trả lời liên quan đến quy trình giải quyết bồi thường, thụ lý hồ sơ, phục hồi danh dự...  
\- Phía trên là bộ lọc tìm kiếm theo từ khóa trong tiêu đề câu hỏi.  
\- Phía dưới hiển thị lưới danh sách kết quả gồm tiêu đề câu hỏi và tóm tắt nội dung câu hỏi.  
\- Sắp xếp mặc định theo thời gian tạo giảm dần (câu hỏi mới nhất ở đầu).  
\- NSD click chọn câu hỏi để mở sang Tab trình duyệt mới xem chi tiết nội dung trả lời (UC280_UC513.MH02).  
\- Hình ảnh minh họa giao diện:  
![Màn hình Tra cứu Câu hỏi và Câu trả lời thường gặp](images/UC280_UC513_MH01.png)  

##### 4.1.21.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Chọn Phân hệ Nghiệp vụ (Tabs)** | | | | |
| Tab Biện pháp bảo đảm | String(255) | \- | Active | \- Click chọn để xem các câu hỏi thường gặp thuộc lĩnh vực Biện pháp bảo đảm (UC280). |
| Tab Bồi thường nhà nước | String(255) | \- | \- | \- Click chọn để xem các câu hỏi thường gặp thuộc lĩnh vực Bồi thường nhà nước (UC513). |
| **II. Bộ lọc Tìm kiếm (Áp dụng cho cả 2 Tabs)** | | | | |
| Tiêu đề câu hỏi | String(250) | Không | Trống | \- Nhập từ khóa cần tìm kiếm trong tiêu đề câu hỏi gần đúng.<br>\- Tự động cắt khoảng trắng thừa (Trim space). |
| Tìm kiếm | - | \- | \- | Control UI: Nút bấm.<br>\- Nút kích hoạt tìm kiếm.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Xóa bộ lọc | - | \- | \- | Control UI: Nút bấm.<br>\- Nút thiết lập lại bộ lọc về mặc định.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **III. Bảng danh sách câu hỏi** | - | \- | 30 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>\- Lưới hiển thị danh sách các câu hỏi thường gặp thỏa mãn bộ lọc tìm kiếm.<br>\- Sắp xếp mặc định: Thời gian tạo giảm dần.<br>\- Phân trang: Mặc định hiển thị 30 dòng/trang. Cho phép người dùng tùy chọn hiển thị: 5, 10, 20, 30 dòng/trang. Có tích hợp nút chuyển trang Trước, Sau, trang Đầu, trang Cuối.<br>\- Thao tác: NSD nhấp chuột trực tiếp vào dòng bản ghi để xem chi tiết câu hỏi và câu trả lời ở Tab mới (mở màn hình UC280_UC513.MH02).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Cột: STT | Integer(10) | \- | \- | \- Số thứ tự dòng trên trang hiện tại, tự động tăng. |
| Cột: Tiêu đề câu hỏi | String(255) | \- | \- | \- Tiêu đề đầy đủ của câu hỏi thường gặp. |
| Cột: Nội dung tóm tắt | Text(2000) | \- | \- | \- Nội dung tóm tắt của câu hỏi thường gặp. Hiển thị tối đa **200 ký tự đầu tiên** của nội dung câu hỏi, nếu dài hơn thì hiển thị kèm dấu ba chấm "..." ở cuối. |

##### 4.1.21.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | \- Thao tác: NSD click chọn nút Tìm kiếm.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| | | | \- TH1 (Không tìm thấy kết quả): Bộ lọc không khớp với bất kỳ câu hỏi nào trong CSDL. Lưới danh sách hiển thị thông báo: "Không tìm thấy câu hỏi phù hợp." |
| | | | \- TH Hợp lệ: Hệ thống thực hiện tìm kiếm gần đúng không phân biệt hoa thường theo từ khóa Tiêu đề câu hỏi của Tab nghiệp vụ hiện tại, cập nhật lại danh sách trên lưới. |
| 2 | Xóa bộ lọc | Nút | \- Thao tác: NSD click chọn nút Xóa bộ lọc. |
| | | | \- TH Hợp lệ: Reset trường tiêu đề câu hỏi về rỗng. Tải lại lưới danh sách câu hỏi đầy đủ theo thứ tự thời gian tạo giảm dần. |

---

#### 4.1.21.3. UC280_UC513.MH02 - Màn hình Chi tiết Câu hỏi và Câu trả lời thường gặp (Xem tại Tab mới)

##### 4.1.21.3.1. Màn hình
\- Giao diện hiển thị chi tiết nội dung câu hỏi và câu trả lời chính thức của câu hỏi thường gặp được chọn, hiển thị dạng chỉ đọc (Read-only).  
\- Màn hình này được mở riêng sang một **Tab trình duyệt mới** để giữ lại Tab danh sách gốc cho NSD tiếp tục tra cứu các câu hỏi khác.  
\- Ở góc trên cùng hoặc dưới cùng có nút "Đóng" để NSD đóng Tab trình duyệt hiện hành.  
\- Hình ảnh minh họa giao diện:  
![Màn hình Chi tiết Câu hỏi và Câu trả lời thường gặp](images/UC280_UC513_MH02.png)  

##### 4.1.21.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề câu hỏi | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Tiêu đề đầy đủ của câu hỏi thường gặp. |
| Lĩnh vực nghiệp vụ | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Lĩnh vực nghiệp vụ tương ứng: Biện pháp bảo đảm hoặc Bồi thường nhà nước. |
| Nội dung câu hỏi chi tiết | Text(2000) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Nội dung đầy đủ của câu hỏi cần hỗ trợ giải đáp. |
| Nội dung câu trả lời | Text(2000) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>\- Nội dung chi tiết câu trả lời/giải đáp chính thức từ cơ quan quản lý. |
| Đóng | - | \- | \- | Control UI: Nút bấm.<br>\- Nút đóng tab hiện hành.<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.1.21.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | \- Thao tác: NSD click chọn nút Đóng. |
| | | | \- TH Hợp lệ: Hệ thống thực hiện đóng Tab trình duyệt hiện tại đang hiển thị chi tiết câu hỏi (NSD được đưa trở lại màn hình danh sách UC280_UC513.MH01 tại Tab trình duyệt cũ). |

---

### 4.1.22. Khung giao diện tổng thể Trang Hỗ trợ khách hàng (Module Switcher, Thông tin liên hệ, Chế độ Khách vãng lai)

#### 4.1.22.1. Mục đích

\- Trang "Hỗ trợ khách hàng" là khung giao diện cha bao bọc chung UC536 (Tra cứu Văn bản QPPL) và UC280 & UC513 (Tra cứu FAQ), cho phép NSD đã đăng nhập chuyển đổi qua lại giữa 2 module bằng thanh chuyển đổi (Module Switcher) trên cùng.
\- Cung cấp khối "Thông tin liên hệ" tĩnh (đường dây nóng, các phòng ban nghiệp vụ, 3 Trung tâm đăng ký giao dịch, tài sản) hiển thị song song cho cả NSD đã đăng nhập và Khách vãng lai.
\- Cung cấp riêng "Chế độ Khách vãng lai" (truy cập qua tham số đường dẫn `?guest=1`, không yêu cầu đăng nhập) cho phép tra cứu nhanh Văn bản/FAQ và gửi yêu cầu hỗ trợ nhanh không cần tài khoản.

*a. Phân quyền*

\- Mọi đối tượng NSD truy cập Website Khách hàng (đã đăng nhập hoặc Khách vãng lai chưa đăng nhập).

*b. Điều kiện thực hiện*

\- NSD truy cập trang Hỗ trợ khách hàng của Website Khách hàng.
\- Hệ thống hoạt động bình thường.

---

#### 4.1.22.2. UC_HTKH.MH01 - Khung giao diện tổng thể & Module Switcher (Chế độ đã đăng nhập)

##### 4.1.22.2.1. Màn hình

\- Giao diện chia 2 cột: cột trái là khối "Thông tin liên hệ" (mục 4.1.22.3), cột phải phía trên là Thanh chuyển đổi Module (Module Switcher), phía dưới là nội dung màn hình Tra cứu tương ứng của module đang chọn (UC536.MH01 hoặc UC280_UC513.MH01).
\- Thanh chuyển đổi Module **chỉ hiển thị khi NSD đã đăng nhập**; không hiển thị ở Chế độ Khách vãng lai (xem mục 4.1.22.4).
\- Nếu truy cập kèm tham số đường dẫn `?module=faqs` (không ở Chế độ Khách vãng lai), hệ thống tự động mở sẵn Module "Câu hỏi thường gặp (FAQs)"; mọi trường hợp khác (không có tham số hoặc giá trị khác) mặc định mở Module "Văn bản Quy phạm Pháp luật".

##### 4.1.22.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thẻ "Văn bản Quy phạm Pháp luật" | String(255) | \- | Active | Control UI: Nút chọn (Pill Button). Chuyển hiển thị sang màn hình UC536.MH01. |
| Thẻ "Câu hỏi thường gặp (FAQs)" | String(255) | \- | \- | Control UI: Nút chọn (Pill Button). Chuyển hiển thị sang màn hình UC280_UC513.MH01. |

##### 4.1.22.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn "Văn bản Quy phạm Pháp luật" | Nút | \- Thao tác: NSD click chọn thẻ.<br>\- TH Hợp lệ: Đánh dấu thẻ đang chọn (active), ẩn khối FAQs, hiển thị màn hình UC536.MH01 với Tab nghiệp vụ (Biện pháp bảo đảm/Bồi thường nhà nước) đang được chọn gần nhất. |
| 2 | Chọn "Câu hỏi thường gặp (FAQs)" | Nút | \- Thao tác: NSD click chọn thẻ.<br>\- TH Hợp lệ: Đánh dấu thẻ đang chọn (active), ẩn khối Văn bản QPPL, hiển thị màn hình UC280_UC513.MH01 với Tab nghiệp vụ đang được chọn gần nhất. |

---

#### 4.1.22.3. Thông tin liên hệ (Hiển thị ở cả 2 Chế độ - Đã đăng nhập và Khách vãng lai)

##### 4.1.22.3.1. Màn hình

\- Nội dung dữ liệu liên hệ giống nhau tuyệt đối ở cả 2 Chế độ, chỉ khác cách trình bày giao diện:
  \+ Chế độ Khách vãng lai: hiển thị dạng cột danh sách các mục liên hệ (1 cột).
  \+ Chế độ đã đăng nhập: hiển thị dạng 1 Card riêng nằm phía trên Module Switcher, chia 2 Panel: Panel trái "Liên hệ nhanh", Panel phải "Trung tâm đăng ký giao dịch tài sản" (dạng lưới 3 cột, tự động rút về 1 cột trên màn hình có độ rộng dưới 980px).

##### 4.1.22.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| **I. Liên hệ nhanh** | | |
| Đường dây nóng | String(500) | Control UI: Hiển thị/Read-only.<br>\- "Đường dây nóng tiếp nhận phản ánh, kiến nghị": `024.62739690`. |
| Kỹ thuật & tài khoản | String(500) | Control UI: Hiển thị/Read-only.<br>\- "Liên hệ cấp mới, cấp lại mã CSDL, tài khoản & hỗ trợ kỹ thuật" - Phòng Quản lý đăng ký trực tuyến và thông tin dữ liệu về biện pháp bảo đảm.<br>\- Điện thoại: `024.62739677`. Email: `tt_csdl@moj.gov.vn`. |
| Thanh toán phí CSDL | String(500) | Control UI: Hiển thị/Read-only.<br>\- Văn phòng Cục (Bộ phận Tài chính, kế toán).<br>\- Điện thoại: `024.62739678`. Email: `dangky@moj.gov.vn`. |
| Giải đáp pháp luật BPBĐ | String(500) | Control UI: Hiển thị/Read-only.<br>\- Phòng Quản lý nghiệp vụ.<br>\- Điện thoại: `024.62739676`. |
| **II. Trung tâm đăng ký giao dịch, tài sản** | | |
| Trung tâm tại Hà Nội | Text(1000) | Control UI: Hiển thị/Read-only.<br>\- Địa chỉ: Ngõ 25 Nguyễn Cơ Thạch, P. Mỹ Đình 2, Q. Nam Từ Liêm, Hà Nội.<br>\- Điện thoại đăng ký: `024.37227501` / `024.37227428`; Kế toán: `024.37227500`; Văn thư: `024.37227427`.<br>\- Email: `trungtamdangky1@moj.gov.vn` / `dangkytt1@gmail.com`. |
| Trung tâm tại TP. Hồ Chí Minh | Text(1000) | Control UI: Hiển thị/Read-only.<br>\- Địa chỉ: Số 30 Trần Cao Vân, P.6, Q.3, TP.HCM.<br>\- Điện thoại đăng ký: `028.22433557` / `028.22433558`; Kế toán: `028.22433556` / `028.22455201`; Văn thư: `028.22102461`; Fax: `02839291866`.<br>\- Email: `trungtamdangky2@moj.gov.vn` / `trungtamhcm@gmail.com`. |
| Trung tâm tại Đà Nẵng | Text(1000) | Control UI: Hiển thị/Read-only.<br>\- Địa chỉ: Số 109 Hoàng Sỹ Khải, P. An Hải Bắc, Q. Sơn Trà, Đà Nẵng.<br>\- Điện thoại đăng ký: `0236.3933111` / `0236.3933555`; Kế toán: `0236.3938355`; Giám đốc: `0236.3505638`; Phó giám đốc: `0236.3700486`.<br>\- Email: `trungtamdangkydanang@gmail.com` / `trungtamdangky3@moj.gov.vn`. |

*(Ghi chú: Toàn bộ nội dung tại mục này là dữ liệu tĩnh cấu hình sẵn (không phải nhập liệu động), không có chức năng thao tác nào khác ngoài hiển thị tham khảo.)*

---

#### 4.1.22.4. UC_HTKH.MH02 - Chế độ Khách vãng lai (Guest Support)

##### 4.1.22.4.1. Màn hình

\- Kích hoạt khi truy cập trang kèm tham số đường dẫn `?guest=1`. Ở chế độ này, Thanh chuyển đổi Module (mục 4.1.22.2) và các màn hình Tra cứu đầy đủ UC536.MH01/UC280_UC513.MH01 **không hiển thị**; thay vào đó cột phải hiển thị khối "Tra cứu nhanh" gồm:
  \+ 2 Tab con: "Câu hỏi thường gặp" (mặc định active) và "Văn bản QPPL".
  \+ 1 ô tìm kiếm nhanh duy nhất (dùng chung cho cả 2 Tab con), lọc kết quả theo thời gian thực ngay khi NSD gõ ký tự (không cần bấm nút Tìm kiếm).
  \+ Khu vực kết quả hiển thị tối đa **6 bản ghi** phù hợp nhất, có thanh cuộn riêng nếu danh sách bên trong dài hơn khung hiển thị (không có phân trang).
\- Bên dưới khối Tra cứu nhanh là 1 Card kêu gọi hành động (CTA) nổi bật "Tạo yêu cầu hỗ trợ" (có hiệu ứng nhấp nháy - pulse liên tục để thu hút chú ý).

##### 4.1.22.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tab "Câu hỏi thường gặp" | String(255) | \- | Active | Control UI: Nút chọn. |
| Tab "Văn bản QPPL" | String(255) | \- | \- | Control UI: Nút chọn. |
| Ô tìm kiếm nhanh | String(255) | Không | Trống | Placeholder: "Nhập từ khóa tra cứu (số văn bản, tiêu đề câu hỏi...)". Tìm kiếm gần đúng, không phân biệt hoa/thường và không phân biệt dấu tiếng Việt, theo thời gian thực (mỗi lần gõ ký tự).<br>\- Nếu đang ở Tab "Câu hỏi thường gặp": tìm theo Tiêu đề câu hỏi, Nội dung tóm tắt, Nội dung câu hỏi.<br>\- Nếu đang ở Tab "Văn bản QPPL": tìm theo Số văn bản, Trích yếu, Cơ quan ban hành. |
| Khu vực kết quả nhanh | - | \- | \- | Control UI: Danh sách hiển thị, giới hạn tối đa 6 bản ghi khớp điều kiện đầu tiên.<br>\- Mỗi kết quả có nút "Xem câu trả lời" (Tab FAQ, mở **[UC280_UC513.MH02]** tại tab trình duyệt mới) hoặc "Xem văn bản" (Tab Văn bản, mở **[UC536.MH02]** tại tab trình duyệt mới).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| Card "Tạo yêu cầu hỗ trợ" | String(255) | \- | \- | Control UI: Nút bấm nổi bật (hiệu ứng nhấp nháy liên tục).<br>\- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.1.22.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chuyển Tab "Câu hỏi thường gặp"/"Văn bản QPPL" | Nút | Đổi Tab con đang chọn và tải lại Khu vực kết quả nhanh theo từ khóa hiện có trong ô tìm kiếm. |
| 2 | Tìm kiếm nhanh (nhập ký tự) | Ô nhập | Mỗi lần NSD gõ ký tự, hệ thống tự động lọc lại và hiển thị tối đa 6 kết quả phù hợp nhất của Tab con đang chọn; không giới hạn số lượng kết quả tồn tại phía sau (chỉ hiển thị 6 kết quả đầu, không có cách xem thêm).<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 3 | Tạo yêu cầu hỗ trợ | Nút | Mở **UC_HTKH.MH03 - Popup Tạo yêu cầu hỗ trợ (Khách vãng lai)**. |

---

#### 4.1.22.5. UC_HTKH.MH03 - Popup Tạo yêu cầu hỗ trợ (Khách vãng lai)

##### 4.1.22.5.1. Màn hình

\- Popup Modal hiển thị form gửi nhanh yêu cầu hỗ trợ dành riêng cho Khách vãng lai ở Chế độ Khách vãng lai (mục 4.1.22.4), không yêu cầu đăng nhập.
\- Đóng Popup khi NSD click ra ngoài vùng nội dung Popup hoặc bấm nút Đóng/Hủy.

##### 4.1.22.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Người yêu cầu | String(200) | Có | Trống | Nhập họ và tên người yêu cầu hỗ trợ. |
| Email | String(200) | Có | Trống | Nhập địa chỉ email liên hệ để nhận phản hồi. Rule định dạng Email - **[BR-VAL-002]**. |
| Mức độ ưu tiên | Enum(String(50)) | Có | "Thấp" | Control UI: Hộp chọn. Gồm: **Thấp**, **Trung bình**, **Cao**. |
| Cơ quan tiếp nhận | Enum(String(255)) | Có | "Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước" (chọn sẵn) | Control UI: Hộp chọn. Gồm các giá trị:<br>  \+ Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước<br>  \+ Trung tâm đăng ký giao dịch, tài sản tại TP Hà Nội<br>  \+ Trung tâm đăng ký giao dịch, tài sản tại TP Hồ Chí Minh<br>  \+ Trung tâm đăng ký giao dịch, tài sản tại TP Đà Nẵng |
| Tiêu đề | String(200) | Có | Trống | Nhập tiêu đề tóm tắt ngắn gọn nội dung cần hỗ trợ. |
| Nội dung | Text(2000) | Có | Trống | Nhập chi tiết nội dung sự việc hoặc câu hỏi cần giải đáp. |
| File đính kèm | File | Không | Trống | Cho phép đính kèm tối đa **3 tệp tin**, định dạng `.pdf`, `.jpg`, `.jpeg`, `.png`, tối đa **20MB/tệp**. Kiểm tra định dạng/dung lượng ngay khi chọn tệp (không đợi đến lúc bấm Gửi yêu cầu); nếu có tệp vi phạm, hệ thống loại bỏ toàn bộ tệp vừa chọn và hiển thị lỗi tương ứng. |

##### 4.1.22.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng Popup, làm mới lại toàn bộ dữ liệu đã nhập trên form về trạng thái mặc định. |
| 2 | Gửi yêu cầu | Nút | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]** dưới từng ô lỗi tương ứng. Không cho phép gửi.<br>\- TH2 (Sai định dạng Email): Vi phạm **[BR-VAL-002]**, hiển thị **[MSG-ERR-VAL-002]**. Không cho phép gửi.<br>\- TH Hợp lệ: Hệ thống sinh Mã yêu cầu hỗ trợ theo quy tắc `HT-[YYYY]-[4_SỐ_NGẪU_NHIÊN]`, hiển thị thông báo Toast thành công kèm mã yêu cầu vừa sinh, đóng Popup và làm mới lại form. |

*(Lưu ý quan trọng khi triển khai chính thức: Theo mockup hiện tại, yêu cầu hỗ trợ tạo tại Popup này chỉ sinh mã hiển thị tạm thời trên Toast, **chưa được lưu vào danh sách quản lý yêu cầu hỗ trợ dùng chung** với **[UC266]**/**[UC267]** (không cùng cơ chế lưu trữ dữ liệu). Khi triển khai chính thức, cần bổ sung logic lưu yêu cầu này vào cùng cơ sở dữ liệu yêu cầu hỗ trợ tập trung — tương tự luồng tạo yêu cầu tại **[UC266]** — để Cán bộ nghiệp vụ có thể tiếp nhận và xử lý được yêu cầu của Khách vãng lai, đồng thời gửi email xác nhận tiếp nhận theo đúng Mẫu Email Tiếp nhận yêu cầu hỗ trợ đã áp dụng cho UC266. Ngoài ra, cần thống nhất giá trị mặc định duy nhất cho trường "Cơ quan tiếp nhận" khi mở Popup (hiện mockup chọn sẵn "Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước", nhưng sau khi đóng/gửi và mở lại, trường bị reset về rỗng — cần đồng bộ lại hành vi reset cho nhất quán).*
