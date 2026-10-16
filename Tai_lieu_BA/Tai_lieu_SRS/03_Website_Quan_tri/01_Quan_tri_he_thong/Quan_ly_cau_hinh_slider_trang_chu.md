#### 4.3.1.12. UCPS016 - Quản lý cấu hình Slider/Trang chủ Website khách hàng

##### 4.3.1.12.1. Mục đích

\- Cho phép Quản trị viên hệ thống (QTHT) quản lý tập trung nội dung hiển thị tại Trang chủ Website khách hàng ([UCPS015](../../01_Website_Khach_hang/Trang_chu_khach_hang.md)), gồm Banner Slider ảnh và các khối nội dung giới thiệu (Tra cứu/Đăng ký/Hỗ trợ, dòng thông báo khẩn), mà không cần can thiệp mã nguồn khi cần cập nhật, thay đổi thông báo.
\- Thuộc phân hệ III.1 - Quản lý nội dung (CMS) theo Sơ đồ tính năng hệ thống.

*a. Phân quyền*

\- Quản trị hệ thống (QTHT) hoặc tài khoản được cấp quyền chức năng "Quản lý cấu hình Slider/Trang chủ".

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập thành công vào Website quản trị và có quyền chức năng tương ứng.

---

##### 4.3.1.12.2. UCPS016.MH01 - Màn hình Danh sách Slider Trang chủ

###### 4.3.1.12.2.1. Màn hình

![Danh sách Slider Trang chủ](images/UCPS016_MH01_Danh_sach_slider_trang_chu.png)

###### 4.3.1.12.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Khối Lưới danh sách Slide** | — | — | — | Danh sách toàn bộ Slide đã cấu hình, sắp xếp theo Thứ tự hiển thị tăng dần. |
| Thứ tự hiển thị | Integer(10) | Có | Theo dữ liệu hệ thống | Số thứ tự Slide hiển thị trên Trang chủ; hỗ trợ kéo thả để sắp xếp lại. |
| Ảnh Slider (Thumbnail) | File | Có | Theo dữ liệu hệ thống | Hiển thị ảnh thu nhỏ của Slide. |
| Tên/Mô tả Slide | String(255) | Có | Theo dữ liệu hệ thống | Tên nội bộ dùng để nhận diện Slide và làm văn bản thay thế (Alt text) khi ảnh lỗi. |
| Liên kết khi click | String(500) | Không | Trống | Đường dẫn điều hướng khi Khách hàng click vào Slide; để trống nếu Slide không điều hướng. |
| Trạng thái hiển thị | Boolean | Có | Hiển thị | Bật: Slide hiển thị trên Trang chủ. Tắt: ẩn Slide khỏi Trang chủ nhưng vẫn giữ trong danh sách quản trị. |
| Thao tác | Text(1000) | Có | Theo dữ liệu hệ thống | Hiển thị Sửa, Xóa theo quyền của người dùng. |

###### 4.3.1.12.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm mới | Nút | Mở **3. UCPS016.MH02 - Popup Thêm mới/Cập nhật Slide** ở chế độ Thêm mới. |
| 2 | Sửa | Icon/Nút dòng | Mở **3. UCPS016.MH02 - Popup Thêm mới/Cập nhật Slide** ở chế độ Cập nhật, tải sẵn dữ liệu Slide được chọn. |
| 3 | Xóa | Icon/Nút dòng | Hiển thị **[MSG-CFM-SYS-001]**; khi xác nhận, hệ thống xóa Slide và hiển thị **[MSG-SUC-CMS-003]**. |
| 4 | Bật/Tắt hiển thị | Toggle | Chuyển đổi Trạng thái hiển thị của Slide. Nếu bật hiển thị khi đã đủ 10 Slide đang hiển thị, áp dụng **[BR-CMS-002]** và hiển thị **[MSG-ERR-CMS-003]**, không cho bật. |
| 5 | Kéo thả sắp xếp | Kéo thả (Drag & Drop) | Cho phép kéo thả thay đổi Thứ tự hiển thị giữa các dòng; sau khi thả, hệ thống lưu lại thứ tự mới và hiển thị **[MSG-SUC-CMS-004]**. |
| 6 | Cấu hình Nội dung Trang chủ | Nút | Mở **4. UCPS016.MH03 - Màn hình Cấu hình Nội dung Trang chủ**. |

---

##### 4.3.1.12.3. UCPS016.MH02 - Popup Thêm mới/Cập nhật Slide

###### 4.3.1.12.3.1. Màn hình

![Popup Thêm mới Cập nhật Slide](images/UCPS016_MH02_Popup_them_moi_cap_nhat_slide.png)

###### 4.3.1.12.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Ảnh Slider | File | Có | Trống | Tải ảnh Banner hiển thị full-width tại Trang chủ. Tệp phải tuân thủ **[BR-CMS-001]**. |
| Tên/Mô tả Slide | String(255) | Có | Trống | Không được chỉ gồm khoảng trắng. |
| Liên kết khi click | String(500) | Không | Trống | Đường dẫn nội bộ (ví dụ màn hình Tra cứu) hoặc đường dẫn ngoài hệ thống; để trống nếu không điều hướng. |
| Thứ tự hiển thị | Integer(10) | Có | Cuối danh sách hiện tại | Cho phép sửa để chèn Slide vào vị trí mong muốn. |
| Trạng thái hiển thị | Boolean | Có | Hiển thị | Bật: hiển thị ngay trên Trang chủ sau khi lưu (nếu chưa vượt giới hạn 10 Slide theo **[BR-CMS-002]**). Tắt: lưu nhưng chưa hiển thị. |

###### 4.3.1.12.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn tệp | Nút | Cho phép chọn ảnh Slider. Nếu sai định dạng/dung lượng, áp dụng **[BR-CMS-001]** và hiển thị **[MSG-ERR-CMS-001]** hoặc **[MSG-ERR-CMS-002]**. |
| 2 | Lưu | Nút | TH1: Nếu bỏ trống trường bắt buộc, áp dụng **[BR-VAL-001]** và hiển thị **[MSG-ERR-VAL-001]**. |
| | | | TH2: Nếu bật Trạng thái hiển thị nhưng đã đủ 10 Slide đang hiển thị, áp dụng **[BR-CMS-002]** và hiển thị **[MSG-ERR-CMS-003]**, không cho lưu ở trạng thái hiển thị. |
| | | | TH3: Nếu hợp lệ, hệ thống lưu Slide và hiển thị **[MSG-SUC-CMS-001]** (Thêm mới) hoặc **[MSG-SUC-CMS-002]** (Cập nhật). |
| 3 | Hủy | Nút | Đóng popup và quay về **2. UCPS016.MH01 - Màn hình Danh sách Slider Trang chủ**, không ghi nhận dữ liệu chưa lưu. |

---

##### 4.3.1.12.4. UCPS016.MH03 - Màn hình Cấu hình Nội dung Trang chủ

###### 4.3.1.12.4.1. Màn hình

![Cấu hình nội dung Trang chủ](images/UCPS016_MH03_Cau_hinh_noi_dung_trang_chu.png)

###### 4.3.1.12.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Khối Đoạn giới thiệu chào mừng** | — | — | — | Đoạn văn bản chào mừng hiển thị đầu tiên tại Trang chủ Khách hàng. |
| Nội dung chào mừng | Text(2000) | Có | Theo dữ liệu hệ thống | Không được chỉ gồm khoảng trắng. |
| **Khối Tra cứu** | — | — | — | Nội dung khối giới thiệu chức năng Tra cứu tại Trang chủ. |
| Tiêu đề khối Tra cứu | String(100) | Có | "Tra cứu" | Tiêu đề hiển thị đậm phía trên đoạn nội dung. |
| Nội dung khối Tra cứu | Text(1000) | Có | Theo dữ liệu hệ thống | Cho phép chèn liên kết điều hướng đến màn hình Tra cứu thông tin. |
| **Khối Đăng ký** | — | — | — | Nội dung khối giới thiệu chức năng Đăng nhập/Đăng ký tại Trang chủ. |
| Tiêu đề khối Đăng ký | String(100) | Có | "Đăng ký" | Tiêu đề hiển thị đậm phía trên đoạn nội dung. |
| Nội dung khối Đăng ký | Text(2000) | Có | Theo dữ liệu hệ thống | Cho phép chèn liên kết Đăng nhập, Đăng ký và văn bản mẫu yêu cầu cấp tài khoản. |
| **Khối Hỗ trợ** | — | — | — | Nội dung khối giới thiệu kênh Hỗ trợ khách hàng tại Trang chủ. |
| Tiêu đề khối Hỗ trợ | String(100) | Có | "Hỗ trợ" | Tiêu đề hiển thị đậm phía trên đoạn nội dung. |
| Nội dung khối Hỗ trợ | Text(1000) | Có | Theo dữ liệu hệ thống | Cho phép chèn liên kết điều hướng đến màn hình Hỗ trợ khách hàng. |
| **Khối Thông báo khẩn** | — | — | — | Dòng thông báo nổi bật (màu đỏ) hiển thị cuối Trang chủ. |
| Nội dung thông báo khẩn | String(500) | Có | Theo dữ liệu hệ thống | Ví dụ số đường dây nóng tiếp nhận phản ánh, kiến nghị. |
| **Khối Văn bản mẫu** | — | — | — | Tệp văn bản mẫu tải xuống khi Khách hàng yêu cầu cấp Tài khoản đăng ký trực tuyến bằng văn bản giấy. |
| Tệp văn bản mẫu | File | Không | Theo dữ liệu hệ thống | Cho phép thay thế tệp `.docx` hiện hành. |

###### 4.3.1.12.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn tệp | Nút | Cho phép thay thế tệp văn bản mẫu. |
| 2 | Xem trước | Nút | Mở bản xem trước Trang chủ Khách hàng theo đúng nội dung đang soạn thảo (chưa lưu chính thức), hiển thị tại một tab riêng. |
| 3 | Lưu | Nút | TH1: Nếu bỏ trống trường bắt buộc, áp dụng **[BR-VAL-001]** và hiển thị **[MSG-ERR-VAL-001]**. |
| | | | TH2: Nếu hợp lệ, hệ thống cập nhật nội dung Trang chủ Khách hàng và hiển thị **[MSG-SUC-CMS-005]**. |
| 4 | Hủy | Nút | Khôi phục lại nội dung theo dữ liệu đã lưu gần nhất, không ghi nhận thay đổi chưa lưu. |

---

##### 4.3.1.12.5. Ánh xạ Business Rule và MessageList

| Nhóm xử lý | Business Rule áp dụng | MessageList tham chiếu | Ghi chú hiển thị |
| :--- | :--- | :--- | :--- |
| Bỏ trống trường bắt buộc | **[BR-VAL-001]** | **[MSG-ERR-VAL-001]** | Inline tại trường lỗi đầu tiên |
| Sai định dạng/dung lượng ảnh Slider | **[BR-CMS-001]** | **[MSG-ERR-CMS-001]**<br>**[MSG-ERR-CMS-002]** | Inline tại vùng chọn tệp |
| Vượt quá số lượng Slide đang hiển thị | **[BR-CMS-002]** | **[MSG-ERR-CMS-003]** | Toast |
| Xóa Slide | Không áp dụng | **[MSG-CFM-SYS-001]**<br>**[MSG-SUC-CMS-003]** | Popup xác nhận, sau đó Toast |
| Thêm mới/Cập nhật Slide thành công | Không áp dụng | **[MSG-SUC-CMS-001]**<br>**[MSG-SUC-CMS-002]** | Toast |
| Sắp xếp lại thứ tự Slide | Không áp dụng | **[MSG-SUC-CMS-004]** | Toast |
| Cập nhật nội dung Trang chủ thành công | Không áp dụng | **[MSG-SUC-CMS-005]** | Toast |

##### 4.3.1.12.6. Yêu cầu nhật ký

Hệ thống ghi nhật ký đối với: Thêm mới/Cập nhật/Xóa Slide, thay đổi Trạng thái hiển thị, sắp xếp lại thứ tự Slide, cập nhật Nội dung Trang chủ, thay thế tệp văn bản mẫu.

Thông tin nhật ký gồm: người thực hiện, vai trò, thời điểm, chức năng, dữ liệu thay đổi.

##### 4.3.1.12.7. Tiêu chí nghiệm thu

| Mã tiêu chí | Nội dung nghiệm thu |
| :--- | :--- |
| AC-UCPS016-001 | QTHT quản lý được danh sách Slide: thêm mới, cập nhật, xóa, sắp xếp thứ tự, bật/tắt hiển thị. |
| AC-UCPS016-002 | Hệ thống chặn thêm/bật hiển thị Slide thứ 11 khi đã có 10 Slide đang hiển thị. |
| AC-UCPS016-003 | Ảnh Slider được kiểm tra đúng định dạng .jpg/.jpeg/.png và dung lượng tối đa 5MB. |
| AC-UCPS016-004 | QTHT cập nhật được nội dung các khối Chào mừng/Tra cứu/Đăng ký/Hỗ trợ/Thông báo khẩn và tệp văn bản mẫu hiển thị tại Trang chủ Khách hàng ([UCPS015](../../01_Website_Khach_hang/Trang_chu_khach_hang.md)). |
| AC-UCPS016-005 | Toàn bộ thao tác cấu hình được ghi nhật ký đầy đủ. |
