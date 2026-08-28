### 4.1.23. UCPS015 - Trang chủ Website khách hàng

#### 4.1.23.1. Mục đích

\- Hiển thị các thông tin trang chủ theo nội dung được cấu hình trên Website quản trị

*a. Phân quyền*

\- Mọi người dùng truy cập Website khách hàng, không phân biệt đã đăng nhập hay khách vãng lai.

*b. Điều kiện thực hiện*

\- Hệ thống hoạt động bình thường; đã có ít nhất cấu hình mặc định cho Slider và Nội dung Trang chủ.

---

#### 4.1.23.4. UCPS015.MH01 - Màn hình Trang chủ

##### 4.1.23.4.1. Màn hình

![Trang chủ Website khách hàng](images/UCPS015_MH01_Trang_chu_khach_hang.png)

##### 4.1.23.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Khối Banner Slider** | — | — | — | Băng ảnh quảng bá/thông báo hiển thị đầu Trang chủ, tự động luân phiên. |
| Ảnh Slide | File | Không | Theo cấu hình [UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/Quan_ly_cau_hinh_slider_trang_chu.md) | Chỉ đọc. Hiển thị tối đa 10 ảnh Slide đang ở trạng thái hiển thị, theo đúng thứ tự đã cấu hình. Nếu ảnh lỗi không tải được, hệ thống hiển thị nội dung thay thế theo Tên/Mô tả Slide đã cấu hình. |
| **Khối Nội dung giới thiệu Trang chủ** | — | — | — | Đoạn văn bản giới thiệu hệ thống và điều hướng nhanh, nội dung lấy theo cấu hình [UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/Quan_ly_cau_hinh_slider_trang_chu.md). |
| Đoạn giới thiệu chào mừng | Text(2000) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Đoạn văn bản chào mừng hiển thị đầu tiên. |
| Khối Tra cứu | Text(1000) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Gồm tiêu đề và nội dung giới thiệu chức năng Tra cứu, có liên kết "Tra cứu" điều hướng đến màn hình Tra cứu thông tin đăng ký. |
| Khối Đăng ký | Text(2000) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Gồm tiêu đề và nội dung giới thiệu, có liên kết "Đăng nhập" điều hướng đến [UC001.MH01](Dang_nhap_khach_hang.md), liên kết "văn bản" mở popup tải tệp văn bản mẫu yêu cầu cấp Tài khoản đăng ký trực tuyến. |
| Khối Hỗ trợ | Text(1000) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Gồm tiêu đề và nội dung giới thiệu, có liên kết "Nhóm hỗ trợ của chúng tôi" điều hướng đến Trang Hỗ trợ khách hàng. |
| Thông báo khẩn (Hotline) | String(500) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Dòng chữ màu đỏ, nổi bật, hiển thị cuối màn hình. |

##### 4.1.23.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chuyển Slide trước | Icon/Nút | Chuyển hiển thị về Slide liền trước; nếu đang ở Slide đầu tiên thì quay vòng về Slide cuối cùng. Đồng thời khởi động lại đếm giờ tự động chuyển Slide. |
| 2 | Chuyển Slide sau | Icon/Nút | Chuyển hiển thị sang Slide liền sau; nếu đang ở Slide cuối cùng thì quay vòng về Slide đầu tiên. Đồng thời khởi động lại đếm giờ tự động chuyển Slide. |
| 3 | Chọn Slide qua chỉ số (dot) | Icon/Nút | Chuyển thẳng tới Slide tương ứng với chỉ số được chọn. Đồng thời khởi động lại đếm giờ tự động chuyển Slide. |
| 4 | Tự động chuyển Slide | Tự động | Hệ thống tự động chuyển sang Slide kế tiếp sau mỗi khoảng thời gian cố định; đếm giờ được khởi động lại mỗi khi NSD thao tác thủ công tại chức năng 1, 2 hoặc 3. |
| 5 | Tra cứu | Link | Mở màn hình Tra cứu thông tin đăng ký ([UC027](UC027_Tra_cuu_thong_tin.md)).<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 6 | Đăng nhập | Link | Mở [UC001.MH01 - Màn hình Đăng nhập khách hàng](Dang_nhap_khach_hang.md). |
| 7 | Xem văn bản mẫu | Link | Mở popup hiển thị hướng dẫn và cho phép tải tệp văn bản mẫu yêu cầu cấp Tài khoản đăng ký trực tuyến (định dạng `.docx`), phục vụ trường hợp Khách hàng lựa chọn gửi văn bản giấy thay vì tự đăng ký trực tuyến. |
| 8 | Nhóm hỗ trợ của chúng tôi | Link | Mở Trang Hỗ trợ khách hàng ([UC280_UC513_UC536, mục 4.1.22](Ho_tro_khach_hang.md#41222-uc_htkhmh01---khung-giao-dien-tong-the--module-switcher-che-do-da-dang-nhap)). |

---