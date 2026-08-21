#### 4.3.1.6. Quản lý cấu hình

##### 4.3.1.6.1. Giải pháp tối ưu hóa trải nghiệm người dùng (UX/UI Optimization)

Để tối ưu hóa thao tác của người dùng (Quản trị viên) và tăng hiệu năng của hệ thống, thay vì thiết kế các màn hình cấu hình phân mảnh và rời rạc, hệ thống áp dụng phương án **Bảng điều khiển cấu hình hệ thống tập trung (Centralized Configuration Grid)**:

* **Giao diện hợp nhất (Unified Console):** Tất cả các cấu hình của 12 Use Cases từ UC551 đến UC562 được biểu diễn dưới dạng các bản ghi tham số (Key-Value) trong cùng một lưới dữ liệu tập trung. Người dùng có thể lọc nhanh (Tra cứu) theo Nhóm cấu hình (API, Tiến trình, Timeout, IP mạng, Email/Web, Người ký, Con dấu, Thanh toán, Biểu phí, Kiểm tra, Tham số bảo mật, MFA).
* **Thao tác nhanh (Fast-action Popup):** Hỗ trợ thêm mới hoặc cập nhật các tham số trực tiếp qua cửa sổ Popup tại chỗ hoặc sửa inline trên lưới, giảm thiểu số lần click chuột và chuyển hướng trang.
* **Cơ chế bảo vệ tham số cốt lõi (Core Parameter Protection):** Đối với các tham số hệ thống cốt lõi (như thời gian chờ, số lần đăng nhập sai, độ phức tạp mật khẩu, các kết nối API mặc định), hệ thống chỉ cho phép **Cập nhật** giá trị mà **không cho phép Xóa**, tránh rủi ro sập hệ thống. Quyền **Xóa** chỉ áp dụng cho các cấu hình/quy tắc tự tạo thêm.

---

##### 4.3.1.6.2. UC551 - Cấu hình quản lý chung API

###### 4.3.1.6.2.1. Mục đích

\- Quản lý danh sách cấu hình kết nối API tích hợp với các hệ thống bên ngoài (DVCQG, hệ thống xác thực tập trung, CSDL dân cư...).  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.2.2. UC551.MH01 - Màn hình Danh sách và Tra cứu cấu hình API

####### 4.3.1.6.2.2.1. Màn hình
\- Giao diện danh sách lưới các cấu hình API, bộ lọc theo nhóm hoặc trạng thái và các nút chức năng.

####### 4.3.1.6.2.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Mã kết nối hoặc Tên kết nối API. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách theo trạng thái hoạt động (Hoạt động / Tắt). |

####### 4.3.1.6.2.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Lọc danh sách cấu hình API trên lưới theo từ khóa và trạng thái đã chọn.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới cấu hình API (UC551.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật cấu hình API (UC551.MH02) đã điền sẵn dữ liệu. |
| 4 | Xóa | Icon (Dòng) | Thực hiện kiểm tra ràng buộc. Các kết nối API hệ thống cốt lõi không được xóa (báo lỗi: "Kết nối mặc định hệ thống không được phép xóa"). Chỉ cho phép xóa đối với kết nối tự tạo thêm. |

###### 4.3.1.6.2.3. UC551.MH02 - Popup Thêm mới / Cập nhật cấu hình API

####### 4.3.1.6.2.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã kết nối | String(50) | Có | Trống | Mã định danh duy nhất của API. Bị khóa nếu ở chế độ Cập nhật. |
| Tên kết nối | String(255) | Có | Trống | Tên mô tả cho kết nối API này. |
| Endpoint URL | String(500) | Có | Trống | Địa chỉ URL gọi API (bắt buộc đúng định dạng URL http/https). |
| Loại xác thực | Enum(String(50)) | Có | Bearer Token | Control UI: Hộp chọn.<br>Phương thức bảo mật (None / Basic / Bearer Token / OAuth2). |
| Khóa bảo mật / Token | String(1000) | Không | Trống | Token bảo mật hoặc thông tin cấu hình xác thực tương ứng. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái hoạt động (Hoạt động / Tắt). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết về API. |

####### 4.3.1.6.2.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Sai định dạng Endpoint URL): Báo lỗi: "Endpoint URL phải là địa chỉ web http/https hợp lệ". |
|  |  |  | \- TH3 (Trùng Mã kết nối khi thêm mới): Báo lỗi: "Mã kết nối API đã tồn tại". |
|  |  |  | \- TH Hợp lệ: Lưu cấu hình thành công, báo Toast "Lưu cấu hình API thành công" và đóng Popup. |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.3. UC552 - Cấu hình quản lý tiến trình tự động

###### 4.3.1.6.3.1. Mục đích

\- Quản lý, giám sát và cấu hình các tiến trình tự động (Jobs) chạy ngầm của hệ thống (như tiến trình đồng bộ tài khoản tự động từ DVCQG, tiến trình gửi email hàng loạt, tiến trình dọn dẹp log...).  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.3.2. UC552.MH01 - Màn hình Danh sách và Tra cứu tiến trình tự động

####### 4.3.1.6.3.2.1. Màn hình
\- Lưới danh sách hiển thị các tiến trình tự động đang có trong hệ thống, bộ lọc tìm kiếm và các nút chức năng.

####### 4.3.1.6.3.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Mã tiến trình hoặc Tên tiến trình. |
| Trạng thái hoạt động | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách tiến trình theo trạng thái (Hoạt động / Tạm dừng). |

####### 4.3.1.6.3.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Thực hiện lọc dữ liệu hiển thị trên lưới theo từ khóa và bộ lọc trạng thái.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới cấu hình tiến trình tự động (UC552.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật cấu hình tiến trình tự động (UC552.MH02) đã điền sẵn dữ liệu. |
| 4 | Xóa | Icon (Dòng) | Thực hiện kiểm tra ràng buộc. Các tiến trình hệ thống cốt lõi không được xóa (báo lỗi: "Tiến trình hệ thống không được phép xóa"). Chỉ cho phép xóa đối với tiến trình tự thêm mới. |
| 5 | Chạy thủ công | Icon (Dòng) | Kích hoạt tiến trình chạy ngay lập tức.<br>- Hợp lệ: Kích hoạt thành công, báo Toast: "Kích hoạt chạy tiến trình thành công".<br>- Ngoại lệ: Nếu tiến trình đang chạy, báo lỗi: "Tiến trình đang xử lý, không được chạy chồng chéo". |

###### 4.3.1.6.3.3. UC552.MH02 - Popup Thêm mới / Cập nhật cấu hình tiến trình tự động

####### 4.3.1.6.3.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã tiến trình | String(50) | Có | Trống | Mã định danh duy nhất của tiến trình. Bị khóa nếu ở chế độ Cập nhật. |
| Tên tiến trình | String(255) | Có | Trống | Tên mô tả nhiệm vụ của tiến trình. |
| Tần suất chạy (Cron) | String(100) | Có | Trống | Định dạng chuẩn Cron Expression (Ví dụ:`0 0 * * *` cho chạy hàng ngày lúc 00:00). |
| Tham số đầu vào | String(1000) | Không | Trống | Các tham số cấu hình định dạng JSON truyền vào tiến trình khi thực thi. |
| Trạng thái hoạt động | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái (Hoạt động / Tạm dừng). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết về tiến trình. |

####### 4.3.1.6.3.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Sai định dạng Cron Expression): Hệ thống báo lỗi đỏ: "Định dạng Cron Expression không hợp lệ". |
|  |  |  | \- TH3 (Trùng Mã tiến trình khi thêm mới): Báo lỗi: "Mã tiến trình đã tồn tại". |
|  |  |  | \- TH Hợp lệ: Lưu thành công, báo Toast "Lưu cấu hình tiến trình thành công" và đóng Popup. |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.4. UC553 - Cấu hình thời gian chờ (timeout)

###### 4.3.1.6.4.1. Mục đích

\- Quản lý danh sách khoảng thời gian không hoạt động tối đa của phiên làm việc (Session) đối với từng nhóm đối tượng người dùng.  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.4.2. UC553.MH01 - Màn hình Danh sách và Tra cứu cấu hình thời gian chờ

####### 4.3.1.6.4.2.1. Màn hình
\- Giao diện dạng lưới hiển thị danh sách các cấu hình thời gian chờ, kèm bộ lọc tìm kiếm và các nút Thêm mới, Sửa, Xóa.

####### 4.3.1.6.4.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Mã cấu hình hoặc Tên cấu hình. |
| Đối tượng áp dụng | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách theo đối tượng áp dụng (Khách hàng, Cán bộ nội bộ, Cơ quan ngoài ngành). |

####### 4.3.1.6.4.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Thực hiện lọc dữ liệu trên lưới theo từ khóa tìm kiếm và bộ lọc đối tượng áp dụng.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới cấu hình thời gian chờ (UC553.MH02) với các trường trống để nhập liệu. |
| 3 | Cập nhật | Icon (Dòng) | Hiển thị tại cột Thao tác của từng dòng. Khi click, mở Popup Cập nhật cấu hình thời gian chờ (UC553.MH02) đã điền sẵn dữ liệu. |
| 4 | Xóa | Icon (Dòng) | Hiển thị tại cột Thao tác. Khi click, kiểm tra ràng buộc hệ thống:<br>+ Nếu là cấu hình mặc định bắt buộc của hệ thống: Hiển thị cảnh báo lỗi "Đây là cấu hình hệ thống cốt lõi, không được phép xóa".<br>+ Nếu là cấu hình tùy biến: Hiển thị xác nhận "Bạn có chắc chắn muốn xóa cấu hình thời gian chờ này?". Chọn Đồng ý để xóa mềm trong CSDL. |

###### 4.3.1.6.4.3. UC553.MH02 - Popup Thêm mới / Cập nhật cấu hình thời gian chờ

####### 4.3.1.6.4.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã cấu hình | String(50) | Có | Trống | Mã duy nhất của cấu hình. Nếu là Cập nhật, trường này bị khóa (Read-only). |
| Tên cấu hình | String(255) | Có | Trống | Tên mô tả cho cấu hình thời gian chờ. |
| Đối tượng áp dụng | Enum(String(50)) | Có | Khách hàng | Control UI: Hộp chọn.<br>Đối tượng áp dụng cấu hình (Khách hàng / Cán bộ nội bộ / Cơ quan ngoài ngành). |
| Thời gian chờ (phút) | Datetime | Có | 15 | Thiết lập số phút không hoạt động tối đa. Giá trị nhập vào bắt buộc > 0. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái hoạt động (Hoạt động / Không hoạt động). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết về cấu hình. |

####### 4.3.1.6.4.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Thời gian chờ <= 0 hoặc không nguyên): Báo lỗi "Thời gian chờ phải là số nguyên lớn hơn 0". |
|  |  |  | \- TH3 (Trùng Mã cấu hình khi thêm mới): Báo lỗi "Mã cấu hình đã tồn tại". |
|  |  |  | \- TH Hợp lệ: Lưu thành công, thông báo Toast "Lưu cấu hình thời gian chờ thành công" và đóng Popup. |
| 2 | Hủy | Nút | Đóng Popup và không lưu các thay đổi. |

---

##### 4.3.1.6.5. UC554 - Cấu hình giới hạn địa chỉ mạng quản trị

###### 4.3.1.6.5.1. Mục đích

\- Quản lý danh sách các địa chỉ IP hoặc dải IP được phép truy cập vào Website quản trị hệ thống nhằm ngăn chặn các truy cập trái phép.  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình dải IP.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.5.2. UC554.MH01 - Màn hình Danh sách và Tra cứu địa chỉ mạng

####### 4.3.1.6.5.2.1. Màn hình
\- Lưới hiển thị danh sách các dải IP được cấu hình, bộ lọc tìm kiếm và các nút thao tác.

####### 4.3.1.6.5.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Địa chỉ IP tìm kiếm | String(50) | Không | Trống | Tìm kiếm theo địa chỉ IP hoặc dải CIDR cụ thể. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách theo trạng thái hoạt động (Hoạt động / Tắt). |

####### 4.3.1.6.5.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tìm kiếm dải IP trên lưới cấu hình theo dải IP và trạng thái đã lọc.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới địa chỉ mạng (UC554.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật dải IP (UC554.MH02) đối với dòng đang chọn. |
| 4 | Xóa | Icon (Dòng) | Xác nhận xóa dải IP khỏi danh sách trắng (Whitelist). Hiển thị: "Bạn có chắc chắn muốn xóa giới hạn IP này?". |

###### 4.3.1.6.5.3. UC554.MH02 - Popup Thêm mới / Cập nhật giới hạn địa chỉ mạng

####### 4.3.1.6.5.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Dải IP (CIDR) | String(50) | Có | Trống | Địa chỉ IP hoặc dải mạng (Ví dụ:`192.168.1.5` hoặc `10.0.0.0/24`). |
| Loại giới hạn | Enum(String(50)) | Có | Allow | Control UI: Hộp chọn.<br>Loại hành động áp dụng (Allow - Cho phép truy cập / Deny - Chặn truy cập). |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái (Hoạt động / Tắt). |
| Ghi chú | String(500) | Không | Trống | Mô tả mục đích cấp phép cho dải IP này. |

####### 4.3.1.6.5.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Sai định dạng IP/CIDR): Báo lỗi đỏ: "Định dạng địa chỉ IP hoặc dải CIDR không hợp lệ". |
|  |  |  | \- TH3 (Trùng dải IP đã cấu hình): Báo lỗi: "Dải IP này đã tồn tại trong danh sách". |
|  |  |  | \- TH Hợp lệ: Lưu cấu hình thành công, báo Toast "Cấu hình địa chỉ mạng thành công". |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.6. UC555 - Cấu hình thông tin email, địa chỉ, trang web

###### 4.3.1.6.6.1. Mục đích

\- Cấu hình các thông tin hiển thị dùng chung trên toàn hệ thống (bao gồm email hỗ trợ khách hàng, hotline, địa chỉ cơ quan, trang web chính thức).  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.6.2. UC555.MH01 - Màn hình Danh sách và Tra cứu thông tin email, địa chỉ, web

####### 4.3.1.6.6.2.1. Màn hình
\- Lưới hiển thị danh sách các cấu hình thông tin liên hệ, kèm bộ lọc và các nút chức năng.

####### 4.3.1.6.6.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Mã cấu hình hoặc Tên cấu hình. |
| Loại thông tin | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách theo loại (Email / Địa chỉ / Hotline / Website). |

####### 4.3.1.6.6.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tìm kiếm thông tin liên hệ trên lưới cấu hình theo từ khóa và Loại thông tin.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới thông tin liên hệ (UC555.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật thông tin liên hệ (UC555.MH02) đối với dòng đang chọn. |
| 4 | Xóa | Icon (Dòng) | Xác nhận xóa cấu hình. Các thông số liên hệ mặc định của hệ thống không cho phép xóa, chỉ cho phép chỉnh sửa. |

###### 4.3.1.6.6.3. UC555.MH02 - Popup Thêm mới / Cập nhật thông tin email, địa chỉ, web

####### 4.3.1.6.6.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã cấu hình | String(50) | Có | Trống | Mã duy nhất của cấu hình. Bị khóa nếu ở chế độ Cập nhật. |
| Tên cấu hình | String(255) | Có | Trống | Tên mô tả (Ví dụ: Email hỗ trợ đăng ký trực tuyến). |
| Loại thông tin | Enum(String(50)) | Có | Email | Control UI: Hộp chọn.<br>Phân nhóm thông tin (Email / Địa chỉ / Hotline / Website). |
| Giá trị cấu hình | String(500) | Có | Trống | Nội dung giá trị thiết lập. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái (Hoạt động / Tắt). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết. |

####### 4.3.1.6.6.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Sai định dạng theo loại):<br>&nbsp;&nbsp;+ Nếu chọn Email: Báo lỗi "Địa chỉ Email không hợp lệ" nếu sai định dạng email.<br>&nbsp;&nbsp;+ Nếu chọn Website: Báo lỗi "Địa chỉ URL không hợp lệ" nếu sai định dạng http/https.<br>&nbsp;&nbsp;+ Nếu chọn Hotline: Báo lỗi "Số điện thoại không hợp lệ" nếu chứa ký tự chữ cái. |
|  |  |  | \- TH3 (Trùng mã cấu hình): Báo lỗi "Mã cấu hình đã tồn tại". |
|  |  |  | \- TH Hợp lệ: Lưu cấu hình thành công, báo Toast "Cập nhật thông tin liên hệ thành công". |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.7. UC556 - Cấu hình thông tin về người ký

###### 4.3.1.6.7.1. Mục đích

\- Quản lý danh sách các cán bộ quản lý (Người ký) được cấu hình chứng thư số để thực hiện ký số điện tử lên giấy chứng nhận và văn bản thông báo kết quả giao dịch bảo đảm.  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình người ký.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.7.2. UC556.MH01 - Màn hình Danh sách và Tra cứu thông tin người ký

####### 4.3.1.6.7.2.1. Màn hình
\- Lưới hiển thị danh sách cán bộ được cấu hình ký số, bộ lọc theo họ tên, đơn vị và các nút chức năng.

####### 4.3.1.6.7.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Tên người ký hoặc Chức vụ. |
| Đơn vị trực thuộc | Enum(String(100)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách người ký theo cơ quan/đơn vị hành chính. |

####### 4.3.1.6.7.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tìm kiếm thông tin người ký trên lưới cấu hình theo từ khóa và Đơn vị.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới người ký (UC556.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật thông tin người ký (UC556.MH02) đối với dòng đang chọn. |
| 4 | Xóa | Icon (Dòng) | Thực hiện kiểm tra ràng buộc. Nếu cán bộ này đã từng thực hiện ký số hồ sơ nào trong hệ thống, hệ thống chuyển sang trạng thái "Không hoạt động" để bảo toàn dữ liệu lịch sử ký số, không cho phép xóa vật lý. |

###### 4.3.1.6.7.3. UC556.MH02 - Popup Thêm mới / Cập nhật cấu hình người ký

####### 4.3.1.6.7.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã cán bộ ký | String(50) | Có | Trống | Mã duy nhất của cán bộ ký. Bị khóa nếu ở chế độ Cập nhật. |
| Tên người ký | String(255) | Có | Trống | Họ và tên đầy đủ của cán bộ. |
| Chức vụ | String(100) | Có | Trống | Chức vụ đảm nhiệm (Ví dụ: Đăng ký viên, Trưởng phòng). |
| Đơn vị áp dụng | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Chọn Cơ quan/Đơn vị hành chính áp dụng (Load từ danh sách đơn vị). |
| Serial Chứng thư số | String(100) | Có | Trống | Mã Serial của USB Token hoặc chữ ký số từ xa. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái (Hoạt động / Tắt). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết. |

####### 4.3.1.6.7.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Trùng Serial chứng thư số): Báo lỗi: "Chứng thư số đã được đăng ký cho cán bộ khác trong hệ thống". |
|  |  |  | \- TH3 (Trùng mã cán bộ): Báo lỗi: "Mã cán bộ ký đã tồn tại". |
|  |  |  | \- TH Hợp lệ: Lưu cấu hình thành công, báo Toast "Cập nhật người ký thành công". |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.8. UC557 - Cấu hình thông tin về con dấu

###### 4.3.1.6.8.1. Mục đích

\- Quản lý danh sách hình ảnh mẫu con dấu của các cơ quan đăng ký, phục vụ tích hợp chèn tự động con dấu số hóa lên văn bản chứng nhận kết quả.  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình con dấu.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.8.2. UC557.MH01 - Màn hình Danh sách và Tra cứu cấu hình con dấu

####### 4.3.1.6.8.2.1. Màn hình
\- Lưới hiển thị danh sách các mẫu con dấu đã cấu hình, bộ lọc và các nút chức năng.

####### 4.3.1.6.8.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên con dấu tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo tên con dấu hoặc mã con dấu. |
| Đơn vị áp dụng | Enum(String(100)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách con dấu theo Đơn vị/Cơ quan quản lý. |

####### 4.3.1.6.8.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tìm kiếm thông tin con dấu trên lưới cấu hình theo từ khóa và Đơn vị.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới con dấu (UC557.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật thông tin con dấu (UC557.MH02) đối với dòng đang chọn. |
| 4 | Xóa | Icon (Dòng) | Xác nhận xóa con dấu. Nếu con dấu đã được sử dụng đóng dấu văn bản thực tế, chuyển trạng thái "Không hoạt động" để đảm bảo toàn vẹn lịch sử, không cho phép xóa vật lý. |
| 5 | Data Isolation | Rule | Dữ liệu cấu hình con dấu của mỗi Đơn vị chỉ được xem và quản lý bởi người dùng thuộc chính đơn vị đó hoặc Admin hệ thống có phân quyền cấp cao. |

###### 4.3.1.6.8.3. UC557.MH02 - Popup Thêm mới / Cập nhật cấu hình con dấu

####### 4.3.1.6.8.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã con dấu | String(50) | Có | Trống | Mã duy nhất định danh con dấu. Bị khóa nếu ở chế độ Cập nhật. |
| Tên con dấu | String(255) | Có | Trống | Tên mô tả của mẫu con dấu (Ví dụ: Con dấu Cục Đăng ký Giao dịch bảo đảm). |
| Đơn vị sở hữu | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Đơn vị/Cơ quan sử dụng con dấu này. |
| Hình ảnh con dấu | File | Có | Trống | Control UI: Upload file.<br>Tệp ảnh tải lên định dạng PNG (yêu cầu nền trong suốt để chèn đè chữ ký số), dung lượng tối đa 2MB. |
| Kích thước (px) | String(255) | Có | 150 | Kích thước hiển thị con dấu khi xuất file (Rộng x Cao). Giá trị bắt buộc > 0. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái (Hoạt động / Tắt). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết. |

####### 4.3.1.6.8.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Sai định dạng tệp ảnh hoặc dung lượng > 2MB): Báo lỗi đỏ: "Hình ảnh con dấu phải là tệp định dạng PNG nền trong suốt và dung lượng dưới 2MB". |
|  |  |  | \- TH3 (Kích thước <= 0): Báo lỗi: "Kích thước hiển thị phải lớn hơn 0". |
|  |  |  | \- TH4 (Trùng mã con dấu): Báo lỗi: "Mã con dấu đã tồn tại". |
|  |  |  | \- TH Hợp lệ: Lưu cấu hình thành công, báo Toast "Cập nhật con dấu thành công". |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.9. UC558 - Cấu hình thông tin về tài khoản thanh toán

###### 4.3.1.6.9.1. Mục đích

\- Quản lý các tài khoản ngân hàng thụ hưởng nhận tiền phí và lệ phí đăng ký giao dịch bảo đảm trực tuyến của người dân.  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình tài khoản thanh toán.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.9.2. UC558.MH01 - Màn hình Danh sách và Tra cứu cấu hình tài khoản thanh toán

####### 4.3.1.6.9.2.1. Màn hình
\- Lưới hiển thị danh sách tài khoản thanh toán, bộ lọc theo ngân hàng/chi nhánh và các nút chức năng.

####### 4.3.1.6.9.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Số tài khoản hoặc Tên chủ tài khoản. |
| Ngân hàng | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc danh sách tài khoản theo ngân hàng cấu hình. |

####### 4.3.1.6.9.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tìm kiếm thông tin tài khoản trên lưới cấu hình theo từ khóa và Ngân hàng.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới tài khoản thanh toán (UC558.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật thông tin tài khoản (UC558.MH02) đối với dòng đang chọn. |
| 4 | Xóa | Icon (Dòng) | Xác nhận xóa cấu hình tài khoản thanh toán. Chỉ cho phép xóa khi tài khoản này chưa phát sinh giao dịch thanh toán trực tuyến nào trên hệ thống. Ngược lại phải chuyển sang trạng thái "Không hoạt động". |

###### 4.3.1.6.9.3. UC558.MH02 - Popup Thêm mới / Cập nhật cấu hình tài khoản thanh toán

####### 4.3.1.6.9.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số tài khoản | String(30) | Có | Trống | Số tài khoản ngân hàng (Chỉ chứa các ký tự số). Bị khóa nếu ở chế độ Cập nhật. |
| Tên chủ tài khoản | String(255) | Có | Trống | Tên chủ tài khoản thụ hưởng (In hoa không dấu). |
| Ngân hàng | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>Ngân hàng thụ hưởng (Load danh mục ngân hàng từ hệ thống). |
| Chi nhánh | String(255) | Có | Trống | Chi nhánh mở tài khoản ngân hàng. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái (Hoạt động / Tắt). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết. |

####### 4.3.1.6.9.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Số tài khoản sai định dạng): Báo lỗi đỏ: "Số tài khoản chỉ được phép chứa các ký tự số". |
|  |  |  | \- TH3 (Trùng số tài khoản ngân hàng): Báo lỗi: "Số tài khoản ngân hàng đã được cấu hình từ trước". |
|  |  |  | \- TH Hợp lệ: Lưu cấu hình thành công, báo Toast "Cập nhật tài khoản thanh toán thành công". |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.10. UC559 - Cấu hình thông tin về biểu phí

###### 4.3.1.6.10.1. Mục đích

\- Quản lý danh mục biểu phí, lệ phí quy định cho từng loại hồ sơ/thực hiện dịch vụ công trực tuyến.  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình biểu phí.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.10.2. UC559.MH01 - Màn hình Danh sách và Tra cứu cấu hình biểu phí

####### 4.3.1.6.10.2.1. Màn hình
\- Giao diện danh sách lưới các cấu hình biểu phí dịch vụ công, bộ lọc theo dịch vụ và nút chức năng.
\- Tên biểu phí hiển thị song ngữ (Tên tiếng Việt và Tên tiếng Anh `name_en` ở dưới dạng chữ nghiêng màu xám).
\- Mức phí hiển thị có dấu chấm phân tách hàng nghìn theo định dạng `vi-VN` (ví dụ: `80.000` VNĐ).

####### 4.3.1.6.10.2.2. Mô tả thông tin trên bộ lọc tìm kiếm

| Trường thông tin  | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :------------------- | :-------------- | :--------- | :---------- | :-------------------------------------------------------------------------------------------------------- |
| Từ khóa tìm kiếm | String(255) | Không     | Trống      | Tìm kiếm theo Mã biểu phí hoặc Tên biểu phí (tiếng Việt hoặc tiếng Anh). |
| Loại dịch vụ      | Enum(String(50)) | Không     | Tất cả    | Control UI: Hộp chọn.<br>Lọc theo loại thủ tục: Đăng ký mới, Thay đổi, Xóa đăng ký, Cấp bản sao, Cấp mã số CSDL Một lần, Cấp mã số CSDL thường xuyên, Khác. |
| Trạng thái        | Enum(String(50)) | Không     | Tất cả    | Control UI: Hộp chọn.<br>Lọc theo trạng thái hiệu lực: Hoạt động (Active), Hết hiệu lực (Inactive), Lưu nháp (Draft). |
| Hiệu lực từ ngày  | Date | Không    | Đầu tháng  | Control UI: Datepicker.<br>Bộ chọn ngày Flatpickr (định dạng `dd/mm/yyyy`). Mặc định ngày đầu tháng hiện tại. |
| Hiệu lực đến ngày  | Date | Không    | Hiện tại   | Control UI: Datepicker.<br>Bộ chọn ngày Flatpickr (định dạng `dd/mm/yyyy`). Mặc định ngày hiện tại. |

####### 4.3.1.6.10.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Tìm kiếm       | Nút         | Tìm kiếm thông tin biểu phí trên lưới cấu hình theo từ khóa, Loại dịch vụ, Trạng thái và khoảng ngày hiệu lực.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2   | Xóa bộ lọc       | Nút         | Xóa các tiêu chí tìm kiếm đã chọn, đặt lại khoảng ngày mặc định, nạp lại dữ liệu đầy đủ. |
| 3   | Thêm mới       | Nút         | Mở Popup Thêm mới biểu phí (UC559.MH02). |
| 4   | Kết xuất Excel | Nút         | Xuất danh sách biểu phí hiện có ra tệp Excel. |
| 5   | Xem chi tiết   | Row Click | Mở Popup chi tiết biểu phí (UC559.MH03) hiển thị thông tin dạng chỉ đọc. |
| 6   | Chỉnh sửa       | Icon (Dòng) | Chỉ hoạt động đối với trạng thái Hoạt động hoặc Lưu nháp. Mở Popup Cập nhật cấu hình biểu phí (UC559.MH02). Bị vô hiệu hóa đối với trạng thái Hết hiệu lực. |
| 7   | Xóa / Ngưng dùng| Icon (Dòng) | Mở Popup xác nhận xóa (UC559.MH04). Nếu là Lưu nháp: Xóa vật lý; Nếu là Hoạt động: Chuyển trạng thái sang Hết hiệu lực để bảo vệ log tài chính. Bị vô hiệu hóa đối với trạng thái Hết hiệu lực. |

###### 4.3.1.6.10.3. UC559.MH02 - Popup Thêm mới / Cập nhật cấu hình biểu phí

####### 4.3.1.6.10.3.1. Mô tả thông tin trên màn hình (Quy tắc Sticky Modal)

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định     | Mô tả |
| :------------------ | :-------------- | :--------- | :-------------- | :--------------------------------------------------------------------- |
| Mã biểu phí      | String(50) | Có        | Trống          | Mã duy nhất của biểu phí. Bị khóa nếu ở chế độ Cập nhật. |
| Tên biểu phí     | String(255) | Có        | Trống          | Tên mô tả của biểu phí dịch vụ (Tiếng Việt). |
| Tên biểu phí (EN)| String(255) | Có        | Trống          | Tên mô tả của biểu phí bằng tiếng Anh phục vụ đa ngôn ngữ. |
| Loại dịch vụ     | Enum(String(50)) | Có        | Trống          | Control UI: Hộp chọn.<br>Dịch vụ công được áp dụng biểu phí này. |
| Mức phí (VNĐ)    | Decimal(18,0) | Có        | Trống          | Số tiền phí quy định. Tự động định dạng dấu phân tách hàng nghìn khi gõ, giá trị thực tế >= 0. |
| Ngày áp dụng     | Date | Có       | Trống          | Control UI: Datepicker.<br>Bộ chọn ngày Flatpickr. Khi thêm mới bắt buộc lớn hơn hoặc bằng ngày hiện tại. |
| Trạng thái        | - | Có        | Hoạt động      | Control UI: Nút bấm.<br>Chọn Hoạt động (Active) hoặc Lưu nháp (Draft). |
| Mô tả             | String(500) | Không     | Trống          | Ghi chú thêm chi tiết về cơ sở pháp lý ban hành biểu phí. |

####### 4.3.1.6.10.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Lưu             | Nút         | Thực hiện kiểm tra dữ liệu và lưu vào CSDL:<br>+ Bỏ trống trường bắt buộc: Hiển thị viền đỏ (``.is-invalid``), chữ báo lỗi đỏ phía dưới ô và tự động focus vào ô bị lỗi đầu tiên.<br>+ Mức phí < 0: Báo lỗi "Mức phí dịch vụ không được phép nhỏ hơn 0 VNĐ".<br>+ Ngày áp dụng ở quá khứ khi thêm mới: Báo lỗi "Ngày áp dụng phải lớn hơn hoặc bằng ngày hiện tại".<br>+ Trùng mã biểu phí: Báo lỗi "Mã biểu phí đã tồn tại".<br>+ TH Hợp lệ: Lưu cấu hình thành công, báo Toast thành công. |
| 2   | Hủy             | Nút         | Đóng Popup và không lưu thay đổi. |



##### 4.3.1.6.11. UC560 - Cấu hình thông tin kiểm tra

###### 4.3.1.6.11.1. Mục đích

\- Cấu hình các quy tắc validate dữ liệu tự động của hệ thống khi tiếp nhận hồ sơ đầu vào (như biểu thức chính quy Regex kiểm tra số khung, số máy, kiểm tra logic nghiệp vụ).  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình quy tắc kiểm tra.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.11.2. UC560.MH01 - Màn hình Danh sách và Tra cứu cấu hình quy tắc kiểm tra

####### 4.3.1.6.11.2.1. Màn hình
\- Lưới danh sách các quy tắc validate dữ liệu, bộ lọc theo phân loại và các nút chức năng.

####### 4.3.1.6.11.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Mã quy tắc hoặc Tên quy tắc kiểm tra. |
| Loại kiểm tra | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Lọc theo loại (Kiểm tra định dạng / Kiểm tra logic nghiệp vụ). |

####### 4.3.1.6.11.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Tìm kiếm quy tắc trên lưới cấu hình theo từ khóa và Loại kiểm tra.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới quy tắc (UC560.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật thông tin quy tắc (UC560.MH02) đối với dòng đang chọn. |
| 4 | Xóa | Icon (Dòng) | Xác nhận xóa quy tắc kiểm tra. Các quy tắc hệ thống cốt lõi không cho phép xóa, chỉ cho phép chỉnh sửa hoặc đổi trạng thái tắt kích hoạt. |

###### 4.3.1.6.11.3. UC560.MH02 - Popup Thêm mới / Cập nhật cấu hình quy tắc kiểm tra

####### 4.3.1.6.11.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã quy tắc | String(50) | Có | Trống | Mã duy nhất của quy tắc. Bị khóa nếu ở chế độ Cập nhật. |
| Tên quy tắc | String(255) | Có | Trống | Tên mô tả nhiệm vụ kiểm tra dữ liệu. |
| Loại kiểm tra | Enum(String(50)) | Có | Regex | Control UI: Hộp chọn.<br>Phân loại quy tắc (Regex - Định dạng / Logic - Nghiệp vụ). |
| Biểu thức kiểm tra | String(500) | Có | Trống | Biểu thức Regex hoặc công thức logic kiểm tra (Ví dụ:`^[A-Z0-9]{9,17}$` kiểm tra số khung xe). |
| Câu thông báo lỗi | String(500) | Có | Trống | Câu báo lỗi đỏ hiển thị cho người dùng nếu nhập sai dữ liệu. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái (Hoạt động / Tắt). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết. |

####### 4.3.1.6.11.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Sai cú pháp Regex): Nếu chọn loại Regex, hệ thống biên dịch thử biểu thức. Nếu lỗi cú pháp, báo: "Biểu thức Regular Expression không hợp lệ". |
|  |  |  | \- TH3 (Trùng mã quy tắc): Báo lỗi: "Mã quy tắc đã tồn tại". |
|  |  |  | \- TH Hợp lệ: Lưu cấu hình thành công, báo Toast "Cập nhật quy tắc kiểm tra thành công". |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.12. UC561 - Cấu hình các tham số khác của hệ thống

###### 4.3.1.6.12.1. Mục đích

\- Quản lý danh sách các tham số vận hành chung của hệ thống (chính sách bảo mật mật khẩu, khóa đăng nhập, giới hạn tệp tin...).  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.12.2. UC561.MH01 - Màn hình Danh sách và Tra cứu tham số hệ thống

####### 4.3.1.6.12.2.1. Màn hình
\- Giao diện danh sách lưới các tham số cấu hình, kèm bộ lọc theo Phân nhóm tham số và công cụ tìm kiếm.

####### 4.3.1.6.12.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo Mã tham số hoặc Tên tham số. |
| Nhóm tham số | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Phân loại theo nhóm (Đăng nhập & Khóa / Độ phức tạp mật khẩu / Giới hạn dung lượng). |

####### 4.3.1.6.12.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Lọc danh sách tham số trên lưới theo từ khóa và Nhóm tham số đã chọn.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới tham số hệ thống (UC561.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật tham số hệ thống (UC561.MH02) đối với dòng đang chọn. |
| 4 | Xóa | Icon (Dòng) | Thực hiện kiểm tra ràng buộc. Các tham số mặc định của hệ thống sẽ không được phép xóa (báo lỗi: "Tham số mặc định hệ thống không được phép xóa"). Chỉ cho phép xóa đối với tham số tùy biến tự thêm. |

###### 4.3.1.6.12.3. UC561.MH02 - Popup Thêm mới / Cập nhật tham số hệ thống

####### 4.3.1.6.12.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã tham số | String(50) | Có | Trống | Mã duy nhất của tham số. Bị khóa nếu ở chế độ Cập nhật. |
| Tên tham số | String(255) | Có | Trống | Tên hiển thị của tham số cấu hình. |
| Nhóm tham số | Enum(String(50)) | Có | Bảo mật | Control UI: Hộp chọn.<br>Phân loại nhóm của tham số hệ thống. |
| Giá trị tham số | String(500) | Có | Trống | Giá trị thiết lập cho tham số. |
| Trạng thái | Boolean | Có | Active | Control UI: Checkbox.<br>Trạng thái hoạt động (Hoạt động / Không hoạt động). |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết về tham số. |

####### 4.3.1.6.12.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL. Validate theo từng tham số cụ thể:<br>+ **Số lần đăng nhập sai tối đa (LOCKOUT_MAX_ATTEMPTS):** Nhập số nguyên từ 3 đến 10 (Mặc định: 5).<br>+ **Thời gian khóa tài khoản tạm thời (LOCKOUT_DURATION):** Nhập số nguyên lớn hơn hoặc bằng 0 đại diện cho số phút. Giá trị mặc định là 3 (3 phút). Nhập 0 nếu muốn khóa vĩnh viễn.<br>+ **Thời hạn hiệu lực của mật khẩu (PASSWORD_EXPIRY_DAYS):** Nhập số nguyên từ 30 đến 365 ngày (Mặc định: 90).<br>+ **Yêu cầu độ phức tạp mật khẩu (PASSWORD_COMPLEXITY_REQUIRED):** Cấu hình độ phức tạp mật khẩu bắt buộc: độ dài từ 8 đến 20 ký tự, chứa ít nhất một chữ hoa (A-Z), một chữ thường (a-z), một chữ số (0-9), và một ký tự đặc biệt (!@#$%^&*...).<br>+ **Kích thước tập tin tối đa (MAX_FILE_SIZE_MB):** Nhập số nguyên (MB) từ 1 đến 100 (Mặc định: 20). |
| 2 | Hủy | Nút | Đóng Popup và không lưu thay đổi. |

---

##### 4.3.1.6.13. UC562 - Thiết lập cơ chế bảo mật đa nhân tố (MFA)

###### 4.3.1.6.13.1. Mục đích

\- Quản lý cấu hình kích hoạt và thiết lập phương thức xác thực bảo mật 2 lớp (MFA) cho từng nhóm đối tượng người dùng.  
\- Hỗ trợ đầy đủ các tính năng Tra cứu, Thêm mới, Cập nhật và Xóa cấu hình.  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Đăng nhập hợp lệ.  

###### 4.3.1.6.13.2. UC562.MH01 - Màn hình Danh sách và Tra cứu cấu hình MFA

####### 4.3.1.6.13.2.1. Màn hình
\- Lưới danh sách các cấu hình MFA của hệ thống cho các nhóm đối tượng người dùng, kèm các bộ lọc tìm kiếm và nút chức năng.

####### 4.3.1.6.13.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm theo nhóm đối tượng áp dụng hoặc mô tả. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Trạng thái kích hoạt MFA (Kích hoạt / Chưa kích hoạt). |

####### 4.3.1.6.13.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Lọc thông tin hiển thị trên lưới cấu hình MFA.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Thêm mới | Nút | Mở Popup Thêm mới thiết lập MFA cho nhóm đối tượng mới (UC562.MH02). |
| 3 | Cập nhật | Icon (Dòng) | Mở Popup Cập nhật thiết lập MFA (UC562.MH02) cho dòng đang chọn để chỉnh sửa phương thức hoặc bật/tắt kích hoạt. |
| 4 | Xóa | Icon (Dòng) | Thực hiện kiểm tra ràng buộc. Các cấu hình MFA mặc định cho các nhóm đối tượng cơ bản (như Quản trị hệ thống) không được xóa mà chỉ được đổi trạng thái tắt kích hoạt. Chỉ cho phép xóa các cấu hình tạo thêm. |

###### 4.3.1.6.13.3. UC562.MH02 - Popup Thêm mới / Cập nhật cấu hình MFA

####### 4.3.1.6.13.3.1. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Nhóm đối tượng áp dụng | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>Chọn nhóm đối tượng áp dụng (Quản trị hệ thống / Cán bộ nghiệp vụ / Đăng ký viên / Khách hàng v.v.). Bị khóa nếu ở chế độ Cập nhật. |
| Phương thức xác thực MFA | Enum(String(50)) | Có | Email OTP | Control UI: Hộp chọn.<br>Lựa chọn phương thức xác thực hỗ trợ:<br>+ Email OTP<br>+ Authenticator App (Google/Microsoft Authenticator) |
| Trạng thái kích hoạt | Boolean | Không | Unchecked | Control UI: Checkbox.<br>Cho phép bật/tắt xác thực 2 lớp đối với nhóm đối tượng đã chọn. |
| Mô tả | String(500) | Không | Trống | Ghi chú thêm chi tiết về cấu hình MFA này. |

####### 4.3.1.6.13.3.2. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu | Nút | Thực hiện kiểm tra dữ liệu và lưu vào CSDL: |
|  |  |  | \- TH1 (Bỏ trống trường bắt buộc): Báo lỗi đỏ dưới ô tương ứng. |
|  |  |  | \- TH2 (Kích hoạt MFA nhưng không chọn phương thức xác thực): Báo lỗi "Vui lòng chọn phương thức xác thực MFA". |
|  |  |  | \- TH3 (Trùng lặp cấu hình cho nhóm đối tượng): Nếu nhóm đối tượng đã được thiết lập trước đó, báo lỗi: "Nhóm đối tượng này đã được cấu hình MFA. Vui lòng cập nhật cấu hình cũ". |
|  |  |  | \- TH Hợp lệ: Cập nhật thành công, báo Toast "Lưu cấu hình bảo mật MFA thành công" và đóng Popup. |
| 2 | Hủy | Nút | Đóng Popup và hủy thao tác. |
