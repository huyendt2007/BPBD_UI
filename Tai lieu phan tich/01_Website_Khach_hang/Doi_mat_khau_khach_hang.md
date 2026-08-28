### 4.1.9. UCPS006 - Đổi mật khẩu dành cho Khách hàng

#### 4.1.9.1. Mục đích

\- Cho phép người dùng (Cá nhân, Tài khoản chính của Tổ chức, hoặc Tài khoản con thuộc Tổ chức) có nguồn xác thực Nội bộ tự thực hiện thay đổi mật khẩu truy cập của mình nhằm tăng cường tính bảo mật.  
\- Chức năng này chỉ áp dụng cho nguồn xác thực Nội bộ của hồ sơ tài khoản khách hàng. Nếu hồ sơ chỉ có nguồn xác thực VNeID và chưa thiết lập nguồn xác thực Nội bộ thì không hiển thị chức năng Đổi mật khẩu.  

*a. Phân quyền*

\- Khách hàng đã đăng nhập thành công và hồ sơ tài khoản đang có nguồn xác thực Nội bộ.  

*b. Điều kiện thực hiện*

\- Khách hàng đã đăng nhập thành công vào Website Khách hàng.  
\- Hồ sơ tài khoản khách hàng có nguồn xác thực Nội bộ đang hoạt động.  
\- Hệ thống hoạt động bình thường.  

#### 4.1.9.2. UCPS006.MH01 - Màn hình Đổi mật khẩu

##### 4.1.9.2.1. Màn hình

\- Giao diện Form nhập liệu bao gồm 3 trường mật khẩu độc lập, có chức năng ẩn/hiện mật khẩu (icon Con mắt) để người dùng dễ dàng thao tác đối chiếu.  

##### 4.1.9.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mật khẩu hiện tại | String(20) | Có | Trống | \- Người dùng phải nhập mật khẩu đang sử dụng.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |
| Mật khẩu mới | String(20) | Có | Trống | \- Người dùng nhập mật khẩu mới muốn thay đổi.<br>- Mật khẩu mới phải đạt các điều kiện về độ mạnh theo chính sách mật khẩu hệ thống.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |
| Xác nhận mật khẩu mới | String(20) | Có | Trống | \- Người dùng nhập lại chính xác mật khẩu mới.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |

##### 4.1.9.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu mật khẩu | Nút | \- Thao tác: NSD click nút Lưu mật khẩu. |
| | | | \- Xử lý: Hệ thống kiểm tra dữ liệu đầu vào: |
| | | | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ trường trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không cho phép lưu. |
| | | | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép". Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH3 (Sai độ mạnh mật khẩu mới): Vi phạm quy tắc **[BR-VAL-006]**. Hệ thống hiển thị thông báo lỗi **[MSG-ERR-VAL-006]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH4 (Xác nhận mật khẩu không trùng khớp): Hệ thống hiển thị thông báo lỗi **[MSG-ERR-VAL-011]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH5 (Trùng mật khẩu cũ): Hệ thống hiển thị thông báo lỗi **[MSG-ERR-VAL-010]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH6 (Mật khẩu hiện tại không đúng): Mật khẩu hiện tại nhập vào không khớp với mật khẩu đã lưu trong DB. Hệ thống báo lỗi: "Mật khẩu hiện tại không chính xác." Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH Hợp lệ: Hệ thống thực hiện băm mật khẩu mới, cập nhật mật khẩu mới vào cơ sở dữ liệu, ghi nhận nhật ký hệ thống (Audit Log), hiển thị Toast thông báo thành công **[MSG-SUC-SYS-004]** và tự động chuyển hướng người dùng. |
| 2 | Hủy | Nút | \- Thao tác: NSD click nút Hủy. |
| | | | \- Xử lý: Không lưu thay đổi, hệ thống chuyển hướng người dùng quay về màn hình Xem chi tiết thông tin tài khoản tương ứng (UC002.MH01 / UC002.MH02 / UC002.MH03). |
| 3 | Ẩn/hiện mật khẩu | Icon | \- Khi click icon con mắt tại từng trường mật khẩu, hệ thống chuyển trạng thái hiển thị giữa che ký tự và hiện ký tự đã nhập. |
| | | | \- Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/lưu dữ liệu. |
