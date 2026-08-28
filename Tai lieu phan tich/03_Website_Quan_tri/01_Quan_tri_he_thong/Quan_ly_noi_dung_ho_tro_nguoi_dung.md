#### 4.3.1.13. UC540 - Quản lý nội dung hỗ trợ người dùng (Cấu hình Link liên kết)

##### 4.3.1.13.1. Mục đích

\- Cho phép Quản trị viên hệ thống (QTHT) quản lý danh sách các link/tin liên kết hiển thị tại menu "Liên kết" trên Top Navigation của Website khách hàng ([UCPS017](../../01_Website_Khach_hang/Thong_tin_lien_ket.md)), phục vụ điều hướng nhanh người dùng tới các cổng thông tin liên quan (Cổng thông tin điện tử Bộ Tư pháp, Trang thông tin Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước...) mà không cần can thiệp mã nguồn khi cần thêm/sửa/gỡ liên kết.
\- Thuộc phân hệ III.1 - Quản lý nội dung (CMS) theo Sơ đồ tính năng hệ thống.

> **Ghi chú mã UC**: Theo yêu cầu nghiệp vụ, tài liệu này sử dụng mã **UC540**. Danh sách UC gốc (`BPBD_Danh_sach_ma_UC.md`) hiện đang gán mã UC540 cho tính năng khác ("Tra cứu lịch sử hỏi đáp về lĩnh vực bồi thường nhà nước trên mobile"). Đây là ngoại lệ đã được xác nhận với người yêu cầu; cần cập nhật lại danh sách UC gốc để tránh trùng lặp khi rà soát tổng thể dự án.

*a. Phân quyền*

\- Quản trị hệ thống (QTHT) hoặc tài khoản được cấp quyền chức năng "Quản lý nội dung hỗ trợ người dùng".

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập thành công vào Website quản trị và có quyền chức năng tương ứng.

---

##### 4.3.1.13.2. UC540.MH01 - Màn hình Danh sách Link liên kết

###### 4.3.1.13.2.1. Màn hình

![Danh sách Link liên kết](images/UC540_MH01_Danh_sach_link_lien_ket.png)

###### 4.3.1.13.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Khối Lưới danh sách Link liên kết** | — | — | — | Danh sách toàn bộ Link liên kết đã cấu hình, sắp xếp theo Thứ tự hiển thị tăng dần. |
| Thứ tự hiển thị | Integer(10) | Có | Theo dữ liệu hệ thống | Số thứ tự Link hiển thị trong menu "Liên kết"; hỗ trợ kéo thả để sắp xếp lại. |
| Tên hiển thị | String(255) | Có | Theo dữ liệu hệ thống | Tên Link hiển thị trong menu "Liên kết" của Website khách hàng. |
| Đường dẫn (URL) | String(500) | Có | Theo dữ liệu hệ thống | Đường dẫn điều hướng khi Khách hàng click vào Link. |
| Mở tab mới | Boolean | Có | Theo dữ liệu hệ thống | Bật: mở Link ở tab trình duyệt mới. Tắt: điều hướng ngay trên tab hiện tại. |
| Trạng thái hiển thị | Boolean | Có | Hiển thị | Bật: Link hiển thị trong menu "Liên kết". Tắt: ẩn Link khỏi menu nhưng vẫn giữ trong danh sách quản trị. |
| Thao tác | Text(1000) | Có | Theo dữ liệu hệ thống | Hiển thị Sửa, Xóa theo quyền của người dùng. |

###### 4.3.1.13.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới | Nút | Mở **3. UC540.MH02 - Popup Thêm mới/Cập nhật Link liên kết** ở chế độ Thêm mới. |
| 2 | Sửa | Icon/Nút dòng | Mở **3. UC540.MH02 - Popup Thêm mới/Cập nhật Link liên kết** ở chế độ Cập nhật, tải sẵn dữ liệu Link được chọn. |
| 3 | Xóa | Icon/Nút dòng | Hiển thị **[MSG-CFM-SYS-001]**; khi xác nhận, hệ thống xóa Link và hiển thị **[MSG-SUC-CMS-008]**. |
| 4 | Bật/Tắt hiển thị | Toggle | Chuyển đổi Trạng thái hiển thị của Link trong menu "Liên kết". |
| 5 | Kéo thả sắp xếp | Kéo thả (Drag & Drop) | Cho phép kéo thả thay đổi Thứ tự hiển thị giữa các dòng; sau khi thả, hệ thống lưu lại thứ tự mới và hiển thị **[MSG-SUC-CMS-009]**. |

---

##### 4.3.1.13.3. UC540.MH02 - Popup Thêm mới/Cập nhật Link liên kết

###### 4.3.1.13.3.1. Màn hình

![Popup Thêm mới Cập nhật Link liên kết](images/UC540_MH02_Popup_them_moi_cap_nhat_link.png)

###### 4.3.1.13.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tên hiển thị | String(255) | Có | Trống | Không được chỉ gồm khoảng trắng. |
| Đường dẫn (URL) | String(500) | Có | Trống | Phải tuân thủ **[BR-CMS-003]**. |
| Mở tab mới | Boolean | Có | Có (Bật) | Mặc định bật, giữ hành vi hiện tại của Link liên kết. |
| Thứ tự hiển thị | Integer(10) | Có | Cuối danh sách hiện tại | Cho phép sửa để chèn Link vào vị trí mong muốn. |
| Trạng thái hiển thị | Boolean | Có | Hiển thị | Bật: hiển thị ngay trong menu "Liên kết" sau khi lưu. Tắt: lưu nhưng chưa hiển thị. |

###### 4.3.1.13.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | TH1: Nếu bỏ trống trường bắt buộc, áp dụng **[BR-VAL-001]** và hiển thị **[MSG-ERR-VAL-001]**. |
| | | | TH2: Nếu Đường dẫn (URL) sai định dạng, áp dụng **[BR-CMS-003]** và hiển thị **[MSG-ERR-CMS-004]**. |
| | | | TH3: Nếu hợp lệ, hệ thống lưu Link và hiển thị **[MSG-SUC-CMS-006]** (Thêm mới) hoặc **[MSG-SUC-CMS-007]** (Cập nhật). |
| 2 | Hủy | Nút | Đóng popup và quay về **2. UC540.MH01 - Màn hình Danh sách Link liên kết**, không ghi nhận dữ liệu chưa lưu. |

---

##### 4.3.1.13.4. Ánh xạ Business Rule và MessageList

| Nhóm xử lý | Business Rule áp dụng | MessageList tham chiếu | Ghi chú hiển thị |
| :--- | :--- | :--- | :--- |
| Bỏ trống trường bắt buộc | **[BR-VAL-001]** | **[MSG-ERR-VAL-001]** | Inline tại trường lỗi đầu tiên |
| Sai định dạng Đường dẫn (URL) | **[BR-CMS-003]** | **[MSG-ERR-CMS-004]** | Inline tại trường Đường dẫn |
| Xóa Link liên kết | Không áp dụng | **[MSG-CFM-SYS-001]**<br>**[MSG-SUC-CMS-008]** | Popup xác nhận, sau đó Toast |
| Thêm mới/Cập nhật Link liên kết thành công | Không áp dụng | **[MSG-SUC-CMS-006]**<br>**[MSG-SUC-CMS-007]** | Toast |
| Sắp xếp lại thứ tự Link liên kết | Không áp dụng | **[MSG-SUC-CMS-009]** | Toast |

##### 4.3.1.13.5. Yêu cầu nhật ký

Hệ thống ghi nhật ký đối với: Thêm mới/Cập nhật/Xóa Link liên kết, thay đổi Trạng thái hiển thị, sắp xếp lại thứ tự Link liên kết.

Thông tin nhật ký gồm: người thực hiện, vai trò, thời điểm, chức năng, dữ liệu thay đổi.

##### 4.3.1.13.6. Tiêu chí nghiệm thu

| Mã tiêu chí | Nội dung nghiệm thu |
| :--- | :--- |
| AC-UC540-001 | QTHT quản lý được danh sách Link liên kết: thêm mới, cập nhật, xóa, sắp xếp thứ tự, bật/tắt hiển thị. |
| AC-UC540-002 | Đường dẫn (URL) được kiểm tra đúng định dạng bắt buộc bắt đầu bằng http:// hoặc https://. |
| AC-UC540-003 | Menu "Liên kết" tại Website khách hàng ([UCPS017](../../01_Website_Khach_hang/Thong_tin_lien_ket.md)) hiển thị đúng danh sách Link đang ở trạng thái hiển thị, theo đúng thứ tự đã cấu hình. |
| AC-UC540-004 | Toàn bộ thao tác cấu hình được ghi nhật ký đầy đủ. |
