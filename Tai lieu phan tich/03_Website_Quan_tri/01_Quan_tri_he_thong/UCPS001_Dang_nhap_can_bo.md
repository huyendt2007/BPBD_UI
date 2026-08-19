#### 4.3.1.8. UCPS001 - Đăng nhập tài khoản cán bộ

##### 4.3.1.8.1. Mục đích

\- Cho phép cán bộ thuộc các đơn vị của Bộ Tư pháp, các Trung tâm đăng ký và các cơ quan có thẩm quyền liên quan thực hiện đăng nhập vào Website quản trị để thực hiện công tác chuyên môn.  

\- Đảm bảo quy định bảo mật mật khẩu, yêu cầu bắt buộc đổi mật khẩu khởi tạo đối với cán bộ đăng nhập lần đầu tiên vào hệ thống.  

*a. Phân quyền*

\- Người dùng: Cán bộ nghiệp vụ ĐKBPBD, Cán bộ BTP, Cán bộ giải quyết hồ sơ, Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- Hệ thống hoạt động bình thường.  
  \+ Tài khoản cán bộ đã được khởi tạo thành công bởi Quản trị hệ thống.  

##### 4.3.1.8.2. UCPS001.MH01 - Màn hình Đăng nhập cán bộ

###### 4.3.1.8.2.1. Màn hình

\- Giao diện màn hình đăng nhập tài khoản cán bộ trên Website quản trị.

![Màn hình Đăng nhập cán bộ](images/UCPS001_Login.png)

###### 4.3.1.8.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                           |
| :------------------ | :-------------- | :--------- | :---------- | :------------------------------------------------ |
| Tên đăng nhập   | String(255) | Có        | Trống      | Nhập tên đăng nhập (Username) của cán bộ. |
| Mật khẩu          | String(20) | Có        | Trống      | Nhập mật khẩu.                                 |

###### 4.3.1.8.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Đăng nhập     | Nút         | Người dùng bấm nút để thực hiện đăng nhập vào hệ thống quản trị.                                                                                                                                                                                                                                                                                                                                                                                   |
|     |                  |              | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Highlight đỏ ô trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không cho phép đăng nhập. |
|     |                  |              | \- TH2 (Sai thông tin đăng nhập): Nếu tên đăng nhập hoặc mật khẩu không đúng, hệ thống tăng số lần nhập sai liên tiếp. Nếu vượt quá cấu hình tối đa tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong) (mặc định là 5 lần), tài khoản tự động bị khóa trong khoảng thời gian quy định tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong) và hiển thị thông báo lỗi tương ứng. |
|     |                  |              | \- TH3 (Tài khoản bị khóa): Nếu tài khoản cán bộ đang ở trạng thái khóa (bao gồm khóa tạm thời do nhập sai quá số lần theo [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong)), hiển thị thông báo lỗi "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin". Không cho phép đăng nhập.                                                                                                                       |
|     |                  |              | \- TH4 (Đăng nhập lần đầu): Nếu tài khoản có cờ đổi mật khẩu lần đầu active (`ForcePasswordChange` = `True`), hệ thống chuyển hướng cán bộ sang Màn hình Đổi mật khẩu lần đầu (UCPS001.MH02).                                                                                                                                                                                                                                 |
|     |                  |              | \- TH5 (Mật khẩu hết hạn): Nếu thời gian hoạt động của mật khẩu vượt quá thời hạn hiệu lực tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong) (mặc định là 90 ngày), hệ thống chuyển hướng cán bộ sang màn hình đổi mật khẩu (UCPS001.MH02).                                                                                                                                                                    |
|     |                  |              | \- TH6 (Xác thực MFA): Nếu nhóm tài khoản này được kích hoạt cơ chế xác thực đa nhân tố tại [UC562](#431613-uc562---thiet-lap-co-che-bao-mat-da-nhan-to-mfa), hệ thống chuyển hướng cán bộ sang màn hình nhập mã xác thực OTP gửi qua Email.                                                                                                                                                                                         |
|     |                  |              | \- TH Hợp lệ (Normal Login):<br>  + Khởi tạo phiên làm việc (Session) cho cán bộ với thời gian chờ (timeout) cấu hình tại [UC553](#43164-uc553---cau-hinh-thoi-gian-cho-timeout) (mặc định 15 phút).<br>  + Ghi nhận nhật ký đăng nhập (Audit Log) bao gồm Tên tài khoản, IP, thời gian đăng nhập.<br>  + Chuyển hướng cán bộ đến Dashboard Quản trị tương ứng với vai trò và phân quyền của tài khoản.  |
| 2   | Quên mật khẩu | Link         | Người dùng click link để khôi phục mật khẩu. Hệ thống chuyển sang màn hình Quên mật khẩu (UCPS002.MH01).                                                                                                                                                                                                                                                                                                                                           |

##### 4.3.1.8.3. UCPS001.MH02 - Màn hình Đổi mật khẩu lần đầu

###### 4.3.1.8.3.1. Màn hình

\- Giao diện màn hình bắt buộc đổi mật khẩu mới cho lần đăng nhập đầu tiên của cán bộ.
\- Các trường mật khẩu có nút/icon con mắt để ẩn/hiện ký tự đã nhập; mặc định hiển thị dạng che ký tự.

![Màn hình Đổi mật khẩu lần đầu](images/UCPS001_ChangePassword.png)

###### 4.3.1.8.3.2. Mô tả thông tin trên màn hình

| Trường thông tin        | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                                                                                                                                                                                                                                    |
| :------------------------- | :-------------- | :--------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mật khẩu hiện tại      | String(20) | Có        | Trống      | Nhập mật khẩu hiện tại (mật khẩu khởi tạo).<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập.                                                                                                                                                                                                                                                                       |
| Mật khẩu mới            | String(20) | Có        | Trống      | Nhập mật khẩu mới.<br>- Độ phức tạp và độ dài tối thiểu được quy định chi tiết tại cấu hình hệ thống [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong) (Mặc định: độ dài 8-20 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt).<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập. |
| Xác nhận mật khẩu mới | String(20) | Có        | Trống      | Nhập lại mật khẩu mới để so khớp.<br>- Có nút/icon con mắt để ẩn/hiện ký tự đã nhập.                                                                                                                                                                                                                                                                                  |

###### 4.3.1.8.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-- | :--------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Lưu mật khẩu  | Nút         | Người dùng bấm nút để cập nhật mật khẩu mới. Hệ thống thực hiện kiểm tra:                                                                                                                                                                                                                                                                                                                                                  |
|     |                  |              | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Highlight đỏ trường trống đầu tiên và báo: **[MSG-ERR-VAL-001]**. |
|     |                  |              | \- TH2 (Mật khẩu mới không đạt độ phức tạp): Nếu không đạt yêu cầu độ phức tạp cấu hình tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong), hiển thị thông báo lỗi tương ứng.                                                                                                                                                                                                                  |
|     |                  |              | \- TH3 (Xác nhận mật khẩu không khớp): Nếu mật khẩu xác nhận không khớp mật khẩu mới, hiển thị thông báo lỗi **[MSG-ERR-VAL-011]**. |
|     |                  |              | \- TH4 (Mật khẩu mới trùng mật khẩu cũ): Nếu mật khẩu mới giống hệt mật khẩu hiện tại đang nhập, hiển thị thông báo lỗi **[MSG-ERR-VAL-010]**. |
|     |                  |              | \- TH Hợp lệ:<br>  + Thực hiện mã hóa băm một chiều mật khẩu mới trước khi lưu.<br>  + Cập nhật mật khẩu mới vào CSDL.<br>  + Thiết lập cờ đổi mật khẩu lần đầu/hết hạn về trạng thái tắt.<br>  + Ghi nhận Audit Log hệ thống.<br>  + Hiển thị Toast thông báo: **[MSG-SUC-SYS-004]** và chuyển hướng cán bộ về Dashboard Quản trị. |
| 2   | Hủy             | Nút         | Người dùng hủy thao tác đổi mật khẩu. Hệ thống hủy phiên làm việc tạm thời và chuyển hướng quay lại màn hình Đăng nhập (UCPS001.MH01).                                                                                                                                                                                                                                                                           |
| 3   | Ẩn/hiện mật khẩu | Icon | Khi click icon con mắt tại từng trường mật khẩu, hệ thống chuyển trạng thái hiển thị giữa che ký tự và hiện ký tự đã nhập. Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/lưu dữ liệu. |
