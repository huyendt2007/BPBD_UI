#### 4.3.1.9. UCPS002 - Quên mật khẩu

##### 4.3.1.9.1. Mục đích

\- Cho phép cán bộ nghiệp vụ hoặc quản trị viên yêu cầu khôi phục/đặt lại mật khẩu khi quên bằng cách sử dụng Email đã đăng ký.  

*a. Phân quyền*

\- Người dùng: Cán bộ nghiệp vụ, Đăng ký viên, Quản trị hệ thống.  

*b. Điều kiện thực hiện*

\- Hệ thống hoạt động bình thường, kết nối Internet ổn định.  
  \+ Tài khoản cán bộ đã được khởi tạo và liên kết với một địa chỉ Email hợp lệ trong CSDL.  

##### 4.3.1.9.2. UCPS002.MH01 - Màn hình Quên mật khẩu

###### 4.3.1.9.2.1. Màn hình

\- Giao diện màn hình nhập địa chỉ email để nhận liên kết/mật khẩu khôi phục tài khoản cán bộ.

![Màn hình Quên mật khẩu](images/UCPS002_ForgotPassword.png)

###### 4.3.1.9.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                           |
| :------------------ | :-------------- | :--------- | :---------- | :---------------------------------------------------------------- |
| Email               | String(100) | Có        | Trống      | Nhập địa chỉ Email đã liên kết với tài khoản cán bộ. |

###### 4.3.1.9.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Gửi yêu cầu   | Nút         | Cán bộ bấm nút để gửi yêu cầu khôi phục mật khẩu. Hệ thống thực hiện kiểm tra:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|     |                  |              | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Highlight đỏ trường nhập liệu và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. |
|     |                  |              | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|     |                  |              | \- TH3 (Email không tồn tại trong hệ thống): Nếu email nhập không khớp với bất kỳ tài khoản cán bộ nào hoạt động, hiển thị thông báo lỗi "Địa chỉ email không tồn tại trên hệ thống".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|     |                  |              | \- TH Hợp lệ:<br>  + Tạo ngẫu nhiên mật khẩu tạm thời mới đáp ứng quy chuẩn độ phức tạp tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong).<br>  + Thực hiện mã hóa băm một chiều mật khẩu tạm thời này trước khi cập nhật vào CSDL.<br>  + Kích hoạt cờ bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo (`ForcePasswordChange` = `True`).<br>  + Gửi email thông báo tài khoản kèm mật khẩu tạm thời dạng rõ cho cán bộ (sử dụng cấu hình máy chủ gửi mail tại cấu hình hệ thống).<br>  + Hiển thị thông báo thành công: "Mật khẩu tạm thời đã được gửi tới email của bạn. Vui lòng kiểm tra email và đăng nhập lại".<br>  + Tự động chuyển hướng quay lại màn hình Đăng nhập cán bộ (UCPS001.MH01). |
| 2   | Quay lại        | Nút         | Cán bộ hủy thao tác và quay trở lại màn hình Đăng nhập cán bộ (UCPS001.MH01).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
