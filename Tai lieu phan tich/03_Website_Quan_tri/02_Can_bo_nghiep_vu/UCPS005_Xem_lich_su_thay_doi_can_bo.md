#### 4.3.2.6. UCPS005 - Xem chi tiết lịch sử Đăng ký thay đổi dành cho Cán bộ

##### 4.3.2.6.1. Mục đích

\- Cho phép Cán bộ kiểm duyệt (Cán bộ nghiệp vụ tại TTĐK và Lãnh đạo ký duyệt) xem chi tiết toàn bộ lịch sử biến động dữ liệu giữa các lần đăng ký thay đổi của một giao dịch bảo đảm hoặc hợp đồng.  
\- Cung cấp cơ chế dòng thời gian (Timeline) và đối chiếu trực quan (Diff Viewer) chênh lệch dữ liệu (Before/After) nhằm đảm bảo tính chính xác, toàn vẹn pháp lý và hỗ trợ công tác hậu kiểm, đối soát nhanh.  

*a. Phân quyền*

\- Cán bộ kiểm duyệt tại TTĐK (Cán bộ nghiệp vụ).  
\- Lãnh đạo có thẩm quyền ký duyệt (Cán bộ phê duyệt).  

*b. Điều kiện thực hiện*

\- Cán bộ kiểm duyệt đã đăng nhập thành công vào Hệ thống quản trị và được phân quyền truy cập chức năng xử lý hoặc tra cứu hồ sơ.  
\- Hệ thống đang hoạt động bình thường, kết nối cơ sở dữ liệu và chữ ký số ổn định.  

##### 4.3.2.6.2. UCPS005.MH01 - Màn hình Phiếu đăng ký - Xem chi tiết dành cho Cán bộ kiểm duyệt

###### 4.3.2.6.2.1. Màn hình

\- Giao diện dành cho Cán bộ kiểm duyệt được thiết kế theo bố cục chia đôi màn hình (Split-View): Nửa bên trái là Trình xem PDF dự thảo; Nửa bên phải là Dòng thời gian lịch sử, kết quả rà soát tự động, Bảng tổng hợp nhanh các lần thay đổi, và phần phê duyệt (ý kiến, các nút tác vụ).

![Màn hình Phiếu đăng ký - Xem chi tiết dành cho Cán bộ kiểm duyệt](images/UCPS003_Officer_Detail.png)

###### 4.3.2.6.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Vùng trái: Trình xem văn bản (PDF Viewer)** | | | | |
| Trình xem văn bản (PDF Viewer) | - | \- | \- | \- Hiển thị trực tiếp file PDF dự thảo văn bản kết quả hiện tại đang Duyệt chờ ký duyệt (Giấy chứng nhận đăng ký thay đổi hoặc Thông báo từ chối).<br>- Hỗ trợ các chức năng: Cuộn trang, Zoom In, Zoom Out, Tải xuống file nháp. |
| **II. Vùng phải: Chi tiết đối soát & Phê duyệt** | | | | |
| **1. Khối thông tin chung & Timeline** | | | | |
| Số đăng ký thay đổi hiện tại | String(255) | \- | Sinh tự động | Control UI: Hiển thị/Read-only.<br>\- Hiển thị mã số đăng ký thay đổi của hồ sơ hiện tại. |
| Số đăng ký lần đầu | String(255) | \- | Lấy từ hồ sơ gốc | Control UI: Hiển thị/Read-only.<br>\- Hiển thị Số đăng ký lần đầu (gốc). Hỗ trợ link click mở popup xem chi tiết hồ sơ gốc. |
| Dòng thời gian lịch sử (Timeline) | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Hiển thị timeline các phiên bản đăng ký thay đổi trước đây (tương tự Khách hàng). Khi click, cập nhật nội dung so sánh chênh lệch Before/After tương ứng bên dưới. |
| **2. Bảng tổng hợp nhanh các lần thay đổi** | | | | |
| Bảng tổng hợp nhanh các lần thay đổi | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Cho phép Cán bộ xem tổng hợp nhanh tất cả các thay đổi qua tất cả các phiên bản của giao dịch trong một bảng thống nhất.<br>- Mặc định phân trang **20 bản ghi/trang** (áp dụng cho danh sách nghiệp vụ phức tạp) để tối ưu hiệu năng. Chi tiết cột xem bên dưới. |
| Cột: STT | Integer(10) | \- | \- | \- Số thứ tự tăng dần. |
| Cột: Phiên bản | String(50) | \- | \- | \- Hiển thị mốc phiên bản thay đổi (Ví dụ: "Thay đổi lần 1", "Thay đổi lần 2"). |
| Cột: Khối thông tin | String(100) | \- | \- | \- Gồm:<br>  + Thông tin chung <br>  + Bên bảo đảm <br>  + Bên nhận bảo đảm <br>  + Tài sản bảo đảm |
| Cột: Trường thông tin | String(100) | \- | \- | \- Tên trường thông tin có biến động (Ví dụ: "Địa chỉ", "Số khung", "Tên Bên nhận bảo đảm"). |
| Cột: Trạng thái biến động | String(50) | \- | \- | \- Gồm:<br>  + `[Thêm mới]`: Chữ màu xanh lục.<br>  + `[Chỉnh sửa]`: Chữ màu cam.<br>  + `[Rút bớt]`: Chữ màu đỏ. |
| Cột: Giá trị cũ (Before) | String(500) | \- | \- | \- Hiển thị giá trị trước khi thay đổi. Nếu là Thêm mới thì hiển thị `N/A`. |
| Cột: Giá trị mới (After) | String(500) | \- | \- | \- Hiển thị giá trị mới sau khi thay đổi. Nếu là Rút bớt thì hiển thị chữ gạch quang (`<del>`). |
| **3. Khối kết quả rà soát rủi ro tự động** | | | | |
| Bảng đối soát rủi ro tự động | - | \- | \- | Control UI: Bảng/Lưới hiển thị.<br>\- Hiển thị các lỗi/cảnh báo rà soát tự động từ hệ thống (kê biên, trùng tài sản, bên bảo đảm bị khóa...).<br>- Nếu có rủi ro nghiêm trọng: tô nền màu đỏ nhạt (`#FEF2F2`), chữ đỏ sẫm. Nếu hợp lệ: chữ màu xanh lục (`#059669`). |
| **4. Ý kiến phê duyệt & Thao tác** | | | | |
| Ý kiến của Cán bộ | String(500) | Tùy điều kiện | Trống | \- Ô nhập văn bản tự do (textarea), hiển thị placeholder "Nhập ý kiến phê duyệt hoặc lý do từ chối/trả lại...".<br>- Bắt buộc nhập nếu thực hiện hành động "Từ chối" hoặc "Trả lại". |

###### 4.3.2.6.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Duyệt | Nút | \- Thao tác: Cán bộ click nút Duyệt.<br>- Kiểm tra: Hệ thống quét bảng đối soát rủi ro tự động để phát hiện lỗi chặn. |
|   |       |     | \- TH1 (Có rủi ro nghiêm trọng): Hiển thị thông báo chặn màu đỏ: "Hồ sơ chứa tài sản hoặc chủ thể đang bị ngăn chặn. Không thể duyệt." |
|   |       |     | \- TH Hợp lệ: Cập nhật trạng thái hồ sơ sang "Duyệt Duyệt chờ ký". Hệ thống hiển thị Toast báo thành công: "Phê duyệt hồ sơ thành công" và quay lại màn hình danh sách UC029.MH01. |
| 2 | Trình ký | Nút | \- Thao tác: Cán bộ click nút Trình ký.<br>- Kiểm tra: Hệ thống quét rủi ro tự động. |
|   |          |     | \- TH1 (Có rủi ro nghiêm trọng): Báo lỗi: "Hồ sơ chứa cảnh báo ngăn chặn. Không thể thực hiện trình ký." |
|   |          |     | \- TH Hợp lệ: Sinh file PDF dự thảo Giấy chứng nhận và hiển thị Popup Preview. Popup Preview bắt buộc hiển thị trường chọn Lãnh đạo ký dạng combobox có tìm kiếm; danh sách Lãnh đạo hiển thị lấy từ Cấu hình thông tin về người ký của đơn vị. Bấm **[Xác nhận]** sau khi đã chọn Lãnh đạo ký thì cập nhật trạng thái sang "Duyệt chờ ký" và gửi trình ký đúng Lãnh đạo đã chọn. Bấm **[Hủy]** để đóng popup. |
| 3 | Từ chối | Nút | \- Thao tác: Cán bộ click nút Từ chối.<br>- Kiểm tra: Bắt buộc trường "Ý kiến của Cán bộ" phải có dữ liệu. |
|   |         |     | \- TH1 (Ý kiến bị trống): Highlight đỏ ô nhập Ý kiến và hiển thị thông báo lỗi "Vui lòng nhập lý do từ chối". |
|   |         |     | \- TH Hợp lệ: Hệ thống sinh Dự thảo Thông báo từ chối (PDF) chứa lý do đã nhập, hiển thị Popup Preview. Popup Preview bắt buộc hiển thị trường chọn Lãnh đạo ký văn bản từ chối dạng combobox có tìm kiếm; danh sách Lãnh đạo hiển thị lấy từ Cấu hình thông tin về người ký của đơn vị. Bấm **[Xác nhận]** sau khi đã chọn Lãnh đạo ký thì cập nhật trạng thái sang "Duyệt chờ ký" và gửi văn bản từ chối đến đúng Lãnh đạo đã chọn. Bấm **[Hủy]** để đóng popup. |
| 4 | Trả lại | Nút | \- Thao tác: Cán bộ click nút Trả lại.<br>- Kiểm tra: Bắt buộc trường "Ý kiến của Cán bộ" phải có dữ liệu. |
|   |         |     | \- TH1 (Ý kiến bị trống): Highlight đỏ ô nhập Ý kiến và báo lỗi "Vui lòng nhập lý do trả lại". |
|   |         |     | \- TH Hợp lệ: Cập nhật trạng thái hồ sơ về "Lưu nháp" của Khách hàng, tự động gửi Email thông báo kèm lý do trả lại chi tiết, quay lại danh sách. |
| 5 | Đóng | Nút | \- Thao tác: Cán bộ click nút Đóng.<br>- Xử lý: Quay lại màn hình danh sách UC029.MH01. |
