### 4.1.23. UCPS015 - Trang chủ Website khách hàng

#### 4.1.23.1. Mục đích

\- Là màn hình mặc định hiển thị khi Khách hàng (đã đăng nhập hoặc khách vãng lai) truy cập Website khách hàng, giới thiệu tổng quan hệ thống và điều hướng nhanh tới 3 nhóm chức năng chính: Tra cứu, Đăng ký, Hỗ trợ.
\- Toàn bộ nội dung hiển thị (Banner Slider và các khối giới thiệu) được quản trị tập trung tại Website quản trị ([UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/UCPS016_Quan_ly_cau_hinh_slider_trang_chu.md)), không hard-code trên giao diện.

*a. Phân quyền*

\- Mọi người dùng truy cập Website khách hàng, không phân biệt đã đăng nhập hay khách vãng lai.

*b. Điều kiện thực hiện*

\- Hệ thống hoạt động bình thường; đã có ít nhất cấu hình mặc định cho Slider và Nội dung Trang chủ.

---

#### 4.1.23.2. Phạm vi

\- Phạm vi tài liệu này chỉ đặc tả nội dung riêng của màn hình Trang chủ (Banner Slider và khối nội dung giới thiệu Tra cứu/Đăng ký/Hỗ trợ/Thông báo khẩn).
\- Không thuộc phạm vi tài liệu này: Header (thanh liên hệ, logo, chuyển đổi ngôn ngữ), Top Navigation và Sidebar menu nghiệp vụ - đây là khung giao diện dùng chung cho mọi màn hình của Website khách hàng, không riêng Trang chủ.
\- Không thuộc phạm vi tài liệu này: cấu hình Slider/Nội dung Trang chủ phía Website quản trị, xem [UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/UCPS016_Quan_ly_cau_hinh_slider_trang_chu.md).

---

#### 4.1.23.3. Tài liệu liên quan

| Tài liệu | Link |
| :--- | :--- |
| Đăng nhập dành cho Cá nhân/Tổ chức/Cơ quan có thẩm quyền | [UC001](UC001_Dang_nhap_khach_hang.md) |
| Tra cứu thông tin đăng ký | [UC027](UC027_Tra_cuu_thong_tin.md) |
| Khung giao diện tổng thể Trang Hỗ trợ khách hàng | [UC280_UC513_UC536, mục 4.1.22](UC280_UC513_UC536_Ho_tro_khach_hang.md#41222-uc_htkhmh01---khung-giao-dien-tong-the--module-switcher-che-do-da-dang-nhap) |
| Quản lý cấu hình Slider/Trang chủ (Website quản trị) | [UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/UCPS016_Quan_ly_cau_hinh_slider_trang_chu.md) |

---

#### 4.1.23.4. UCPS015.MH01 - Màn hình Trang chủ

##### 4.1.23.4.1. Màn hình

![Trang chủ Website khách hàng](images/UCPS015_MH01_Trang_chu_khach_hang.png)

##### 4.1.23.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Khối Banner Slider** | — | — | — | Băng ảnh quảng bá/thông báo hiển thị đầu Trang chủ, tự động luân phiên. |
| Ảnh Slide | File | Không | Theo cấu hình [UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/UCPS016_Quan_ly_cau_hinh_slider_trang_chu.md) | Chỉ đọc. Hiển thị tối đa 10 ảnh Slide đang ở trạng thái hiển thị, theo đúng thứ tự đã cấu hình. Nếu ảnh lỗi không tải được, hệ thống hiển thị nội dung thay thế theo Tên/Mô tả Slide đã cấu hình. |
| **Khối Nội dung giới thiệu Trang chủ** | — | — | — | Đoạn văn bản giới thiệu hệ thống và điều hướng nhanh, nội dung lấy theo cấu hình [UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/UCPS016_Quan_ly_cau_hinh_slider_trang_chu.md). |
| Đoạn giới thiệu chào mừng | Text(2000) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Đoạn văn bản chào mừng hiển thị đầu tiên. |
| Khối Tra cứu | Text(1000) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Gồm tiêu đề và nội dung giới thiệu chức năng Tra cứu, có liên kết "Tra cứu" điều hướng đến màn hình Tra cứu thông tin đăng ký. |
| Khối Đăng ký | Text(2000) | Không | Theo cấu hình Website quản trị | Chỉ đọc. Gồm tiêu đề và nội dung giới thiệu, có liên kết "Đăng nhập" điều hướng đến [UC001.MH01](UC001_Dang_nhap_khach_hang.md), liên kết "văn bản" mở popup tải tệp văn bản mẫu yêu cầu cấp Tài khoản đăng ký trực tuyến. |
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
| 6 | Đăng nhập | Link | Mở [UC001.MH01 - Màn hình Đăng nhập khách hàng](UC001_Dang_nhap_khach_hang.md). |
| 7 | Xem văn bản mẫu | Link | Mở popup hiển thị hướng dẫn và cho phép tải tệp văn bản mẫu yêu cầu cấp Tài khoản đăng ký trực tuyến (định dạng `.docx`), phục vụ trường hợp Khách hàng lựa chọn gửi văn bản giấy thay vì tự đăng ký trực tuyến. |
| 8 | Nhóm hỗ trợ của chúng tôi | Link | Mở Trang Hỗ trợ khách hàng ([UC280_UC513_UC536, mục 4.1.22](UC280_UC513_UC536_Ho_tro_khach_hang.md#41222-uc_htkhmh01---khung-giao-dien-tong-the--module-switcher-che-do-da-dang-nhap)). |

---

#### 4.1.23.5. Ánh xạ Business Rule và MessageList

Màn hình Trang chủ chỉ hiển thị dữ liệu chỉ đọc, không phát sinh nghiệp vụ nhập liệu/validate; toàn bộ Business Rule liên quan đến kiểm soát dữ liệu Slider/Nội dung Trang chủ được áp dụng tại [UCPS016](../03_Website_Quan_tri/01_Quan_tri_he_thong/UCPS016_Quan_ly_cau_hinh_slider_trang_chu.md), mục 4.3.1.12.5.

#### 4.1.23.6. Tiêu chí nghiệm thu

| Mã tiêu chí | Nội dung nghiệm thu |
| :--- | :--- |
| AC-UCPS015-001 | Trang chủ hiển thị đúng danh sách Slide đang ở trạng thái hiển thị theo thứ tự đã cấu hình tại UCPS016, tự động chuyển Slide và cho phép chuyển thủ công bằng nút trước/sau hoặc chọn chỉ số (dot). |
| AC-UCPS015-002 | Nội dung khối Chào mừng/Tra cứu/Đăng ký/Hỗ trợ/Thông báo khẩn hiển thị đúng theo dữ liệu đã cấu hình tại UCPS016, không hard-code trên giao diện. |
| AC-UCPS015-003 | Liên kết "Tra cứu", "Đăng nhập", "Nhóm hỗ trợ của chúng tôi" điều hướng đúng tới màn hình tương ứng. |
| AC-UCPS015-004 | Liên kết "văn bản" mở đúng popup và tải được tệp văn bản mẫu yêu cầu cấp Tài khoản đăng ký trực tuyến. |
