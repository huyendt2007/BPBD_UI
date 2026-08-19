### 4.1.24. UCPS017 - Thông tin liên kết

#### 4.1.24.1. Mục đích

\- Cung cấp menu "Liên kết" tại Top Navigation của Website khách hàng, cho phép Khách hàng điều hướng nhanh tới các cổng thông tin liên quan (Cổng thông tin điện tử Bộ Tư pháp, Trang thông tin Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước...).
\- Toàn bộ danh sách Link liên kết được quản trị tập trung tại Website quản trị ([UC540](../03_Website_Quan_tri/01_Quan_tri_he_thong/UC540_Quan_ly_noi_dung_ho_tro_nguoi_dung.md)), không hard-code trên giao diện.

*a. Phân quyền*

\- Mọi người dùng truy cập Website khách hàng, không phân biệt đã đăng nhập hay khách vãng lai.

*b. Điều kiện thực hiện*

\- Hệ thống hoạt động bình thường.

---

#### 4.1.24.2. UCPS017.MH01 - Menu Thông tin liên kết

##### 4.1.24.2.1. Vị trí chức năng

\- Menu dạng dropdown "Liên kết" nằm tại thanh Top Navigation của Website khách hàng, cạnh các mục "Trang chủ", "Tra cứu thông tin", "Tra cứu mã hồ sơ", "Hỗ trợ khách hàng".

##### 4.1.24.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Khối Danh sách liên kết** | — | — | — | Danh sách Link hiển thị trong menu "Liên kết", theo cấu hình [UC540](../03_Website_Quan_tri/01_Quan_tri_he_thong/UC540_Quan_ly_noi_dung_ho_tro_nguoi_dung.md). |
| Tên hiển thị | String(255) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Tên Link hiển thị trong menu, hiển thị đúng thứ tự đã cấu hình và chỉ hiển thị các Link đang ở trạng thái hiển thị. |

##### 4.1.24.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Liên kết | Nút/Link | Mở menu dropdown hiển thị danh sách Link liên kết đang ở trạng thái hiển thị. |
| 2 | [Tên hiển thị của từng Link] | Link | TH1: Nếu Link được cấu hình Mở tab mới, hệ thống mở Đường dẫn (URL) tại một tab trình duyệt mới. |
| | | | TH2: Nếu Link không được cấu hình Mở tab mới, hệ thống điều hướng ngay trên tab hiện tại tới Đường dẫn (URL) đã cấu hình. |

---

#### 4.1.24.3. Ánh xạ Business Rule và MessageList

Menu "Liên kết" chỉ hiển thị dữ liệu chỉ đọc, không phát sinh nghiệp vụ nhập liệu/validate; toàn bộ Business Rule liên quan đến kiểm soát dữ liệu Link liên kết được áp dụng tại [UC540](../03_Website_Quan_tri/01_Quan_tri_he_thong/UC540_Quan_ly_noi_dung_ho_tro_nguoi_dung.md), mục 4.3.1.13.4.

#### 4.1.24.4. Tiêu chí nghiệm thu

| Mã tiêu chí | Nội dung nghiệm thu |
| :--- | :--- |
| AC-UCPS017-001 | Menu "Liên kết" hiển thị đúng danh sách Link đang ở trạng thái hiển thị theo thứ tự đã cấu hình tại UC540, không hard-code trên giao diện. |
| AC-UCPS017-002 | Click vào Link mở đúng Đường dẫn (URL) đã cấu hình, đúng theo thiết lập Mở tab mới (tab mới hoặc tab hiện tại). |
