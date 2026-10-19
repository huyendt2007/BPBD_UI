#### 4.3.1.8. Đăng nhập tài khoản cán bộ

##### 4.3.1.8.1. Mục đích
\- Cho phép cán bộ thuộc các đơn vị của Bộ Tư pháp, các Trung tâm đăng ký và các cơ quan có thẩm quyền liên quan thực hiện đăng nhập vào Website Quản trị để thực hiện công tác chuyên môn.
\- Đảm bảo quy định bảo mật mật khẩu, yêu cầu bắt buộc đổi mật khẩu khởi tạo đối với cán bộ đăng nhập lần đầu tiên vào hệ thống hoặc mật khẩu đã hết hạn định kỳ.
\- Cho phép cán bộ tự khôi phục mật khẩu khi quên bằng Email đã đăng ký, nhận mật khẩu tạm thời tự động mà không cần liên hệ Quản trị hệ thống.

*a. Phân quyền*
\- Người dùng: Cán bộ nghiệp vụ ĐKBPBD, Cán bộ BTP, Cán bộ giải quyết hồ sơ, Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*
\- Hệ thống hoạt động bình thường.
\- Tài khoản cán bộ đã được khởi tạo thành công bởi Quản trị hệ thống (Tên đăng nhập và mật khẩu khởi tạo).
\- Đối với chức năng Quên mật khẩu: Tài khoản cán bộ đã được liên kết với một địa chỉ Email hợp lệ trong CSDL.

---

##### 4.3.1.8.2. MH01 - Màn hình Đăng nhập cán bộ

###### 4.3.1.8.2.1. Màn hình
![Màn hình Đăng nhập cán bộ](images/UCPS001_Login.png)

###### 4.3.1.8.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tên đăng nhập | String(255) | Có | Trống | Control UI: Ô nhập văn bản (Input text).<br>- Nhập Tên đăng nhập (Username) hoặc Email của cán bộ được cấp. |
| Mật khẩu | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu (Password).<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Ghi nhớ đăng nhập | Boolean | Không | Uncheck | Control UI: Hộp kiểm (Checkbox).<br>- Cho phép lựa chọn ghi nhớ phiên đăng nhập (30 ngày) trên trình duyệt hiện tại. |

###### 4.3.1.8.2.3. Chức năng trên màn hình
<table>
  <thead>
    <tr>
      <th style="text-align: center; width: 60px;">STT</th>
      <th style="text-align: left; width: 240px;">Tên chức năng</th>
      <th style="text-align: center; width: 110px;">Định dạng</th>
      <th style="text-align: left;">Mô tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center; vertical-align: middle;">1</td>
      <td style="vertical-align: middle;">Tích/Bỏ tích "Ghi nhớ đăng nhập"</td>
      <td style="text-align: center; vertical-align: middle;">Checkbox</td>
      <td>Người dùng click chọn hoặc bỏ chọn hộp kiểm để thiết lập thời hạn phiên làm việc:<br>- <b>Tích chọn (Check)</b>: Kích hoạt cơ chế ghi nhớ phiên. Khi cán bộ đăng nhập thành công, hệ thống tạo mã Token an toàn (RememberMe Token) và ghi vào cookie bảo mật trên trình duyệt với thời hạn hiệu lực là 30 ngày.<br>- <b>Bỏ tích (Uncheck)</b>: Hủy cơ chế ghi nhớ phiên. Phiên đăng nhập chỉ có hiệu lực theo thời gian chờ phiên thông thường (Session Timeout mặc định 15 phút cấu hình tại <a href="Cau_hinh.md#43164-uc553---cấu-hình-thời-gian-chờ-timeout">UC553</a>).</td>
    </tr>
    <tr>
      <td rowspan="8" style="text-align: center; vertical-align: middle; font-weight: bold;">2</td>
      <td rowspan="8" style="vertical-align: middle; font-weight: bold;">Đăng nhập</td>
      <td rowspan="8" style="text-align: center; vertical-align: middle;">Button</td>
      <td><b>TH1 (Bỏ trống trường bắt buộc)</b>: Vi phạm quy tắc <b>[BR-VAL-001]</b>. Hệ thống highlight viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi <b>[MSG-ERR-VAL-001]</b> và tự động focus con trỏ vào ô lỗi. Không thực hiện đăng nhập.</td>
    </tr>
    <tr>
      <td><b>TH2 (Dữ liệu không hợp lệ)</b>: Dữ liệu vượt quá độ dài quy định (Tên đăng nhập > 255 ký tự, Mật khẩu > 20 ký tự): Hiển thị cảnh báo lỗi <b>[MSG-ERR-UCPS001-008]</b> tại trường tương ứng. Không thực hiện đăng nhập.</td>
    </tr>
    <tr>
      <td><b>TH3 (Sai thông tin đăng nhập)</b>: Nếu Tên đăng nhập hoặc Mật khẩu không chính xác, tăng số lần nhập sai liên tiếp thêm 1 và hiển thị thông báo lỗi <b>[MSG-ERR-UCPS001-007]</b>. Nếu số lần nhập sai liên tiếp vượt quá giới hạn tối đa cấu hình tại <b>[Cấu hình các tham số khác của hệ thống - BR-SEC-050 / UC561]</b> (mặc định là 5 lần), hệ thống tạm khóa quyền đăng nhập của tài khoản trong thời gian cấu hình (mặc định là 15 phút) và hiển thị thông báo lỗi <b>[MSG-ERR-SEC-001]</b>. Việc tạm khóa này không làm thay đổi trạng thái hoạt động chính của hồ sơ tài khoản.</td>
    </tr>
    <tr>
      <td><b>TH4 (Tài khoản Bị khóa hoặc Đóng)</b>: Nếu tài khoản cán bộ đang ở trạng thái <code>Bị khóa</code> hoặc <code>Đóng</code>, hệ thống từ chối đăng nhập và hiển thị thông báo lỗi <b>[MSG-ERR-UCPS001-006]</b> ("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản trị hệ thống").</td>
    </tr>
    <tr>
      <td><b>TH5 (Đổi mật khẩu lần đầu)</b>: Nếu tài khoản hợp lệ nhưng cờ bắt buộc đổi mật khẩu lần đầu đang bật (<code>ForcePasswordChange</code> = true), hệ thống chuyển hướng cán bộ sang màn hình <a href="#43183-mh02---màn-hình-đổi-mật-khẩu-lần-đầu--mật-khẩu-hết-hạn">MH02 - Màn hình Đổi mật khẩu lần đầu / Mật khẩu hết hạn</a>.</td>
    </tr>
    <tr>
      <td><b>TH6 (Mật khẩu hết hạn)</b>: Nếu khoảng thời gian từ lần đổi mật khẩu gần nhất vượt quá thời hạn hiệu lực cấu hình tại <b>[Cấu hình thời hạn mật khẩu của hệ thống - BR-SEC-052 / UC561]</b> (mặc định là 90 ngày), hệ thống chuyển hướng sang <a href="#43183-mh02---màn-hình-đổi-mật-khẩu-lần-đầu--mật-khẩu-hết-hạn">MH02</a> kèm thông báo yêu cầu cập nhật mật khẩu đã hết hạn.</td>
    </tr>
    <tr>
      <td><b>TH7 (Xác thực MFA)</b>: Nếu nhóm tài khoản cán bộ được kích hoạt cơ chế xác thực đa nhân tố tại <b>[Cấu hình bảo mật đa nhân tố - MFA / UC562]</b>, hệ thống sinh mã OTP ngẫu nhiên gửi qua Email đăng ký và chuyển hướng sang màn hình nhập mã xác thực OTP.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ (Đăng nhập thành công)</b>: Reset số lần nhập sai về 0, khởi tạo phiên làm việc (Session) với thời gian timeout cấu hình tại <a href="Cau_hinh.md#43164-uc553---cấu-hình-thời-gian-chờ-timeout">UC553</a> (mặc định 15 phút), ghi nhận nhật ký đăng nhập (Audit Log) gồm Tên tài khoản, Địa chỉ IP, Thời gian đăng nhập, và chuyển hướng cán bộ đến Dashboard Quản trị tương ứng với vai trò và phân quyền.</td>
    </tr>
    <tr>
      <td rowspan="4" style="text-align: center; vertical-align: middle; font-weight: bold;">3</td>
      <td rowspan="4" style="vertical-align: middle; font-weight: bold;">Quên mật khẩu?</td>
      <td rowspan="4" style="text-align: center; vertical-align: middle;">Link</td>
      <td><b>TH1 (Chưa nhập Tên đăng nhập)</b>: Nếu ô "Tên đăng nhập" đang để trống, vi phạm <b>[BR-VAL-001]</b>. Hệ thống focus, highlight viền đỏ ô "Tên đăng nhập" và hiển thị thông báo lỗi <b>[MSG-ERR-VAL-001]</b> yêu cầu nhập Tên đăng nhập trước khi yêu cầu cấp lại mật khẩu. Không thực hiện gửi yêu cầu.</td>
    </tr>
    <tr>
      <td><b>TH2 (Tên đăng nhập không tồn tại)</b>: Nếu giá trị nhập không khớp với bất kỳ tài khoản cán bộ nào trên hệ thống, hệ thống hiển thị thông báo lỗi <b>[MSG-ERR-UCPS001-003]</b>.</td>
    </tr>
    <tr>
      <td><b>TH3 (Tài khoản Bị khóa hoặc Đóng)</b>: Nếu tài khoản cán bộ đang ở trạng thái <code>Bị khóa</code> hoặc <code>Đóng</code>, hệ thống từ chối cấp lại mật khẩu và hiển thị <b>[MSG-ERR-UCPS001-006]</b>.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ</b>: Hệ thống tự động tạo mật khẩu tạm thời ngẫu nhiên mới đáp ứng quy chuẩn độ phức tạp <b>[BR-VAL-006]</b>; mã hóa băm một chiều (Hash + Salt) mật khẩu tạm thời trước khi cập nhật vào CSDL; kích hoạt cờ bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo (<code>ForcePasswordChange</code> = <code>True</code>); gửi email thông báo tài khoản kèm mật khẩu tạm thời mới đến địa chỉ Email đã liên kết với tài khoản cán bộ; ghi nhận nhật ký hệ thống (Audit Log); hiển thị thông báo thành công <b>[MSG-SUC-UCPS001-001]</b>; giữ nguyên tại màn hình MH01 (không chuyển trang) để cán bộ nhập mật khẩu tạm thời vừa nhận được và đăng nhập lại.</td>
    </tr>
  </tbody>
</table>

---

##### 4.3.1.8.3. MH02 - Màn hình Đổi mật khẩu lần đầu / Mật khẩu hết hạn

###### 4.3.1.8.3.1. Màn hình
![Màn hình Đổi mật khẩu lần đầu](images/UCPS001_ChangePassword.png)

###### 4.3.1.8.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mật khẩu hiện tại | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu hiện tại (mật khẩu khởi tạo hoặc mật khẩu tạm thời).<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Mật khẩu mới | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu mới.<br>- Áp dụng quy tắc phức tạp mật khẩu <b>[BR-VAL-006]</b> theo cấu hình tại <a href="Cau_hinh.md#431612-uc561---cấu-hình-các-tham-số-khác-của-hệ-thống">UC561</a> (mặc định: 8-20 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt).<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Xác nhận mật khẩu mới | String(20) | Có | Trống | Control UI: Ô nhập lại mật khẩu mới để so khớp.<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |

###### 4.3.1.8.3.3. Chức năng trên màn hình
<table>
  <thead>
    <tr>
      <th style="text-align: center; width: 60px;">STT</th>
      <th style="text-align: left; width: 240px;">Tên chức năng</th>
      <th style="text-align: center; width: 110px;">Định dạng</th>
      <th style="text-align: left;">Mô tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="7" style="text-align: center; vertical-align: middle; font-weight: bold;">1</td>
      <td rowspan="7" style="vertical-align: middle; font-weight: bold;">Lưu mật khẩu</td>
      <td rowspan="7" style="text-align: center; vertical-align: middle;">Button</td>
      <td><b>TH1 (Bỏ trống trường bắt buộc)</b>: Vi phạm quy tắc <b>[BR-VAL-001]</b>, focus và highlight viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi <b>[MSG-ERR-VAL-001]</b>.</td>
    </tr>
    <tr>
      <td><b>TH2 (Dữ liệu vượt quá độ dài hoặc ký tự không hợp lệ)</b>: Hiển thị cảnh báo lỗi <b>[MSG-ERR-UCPS001-008]</b> tại trường tương ứng.</td>
    </tr>
    <tr>
      <td><b>TH3 (Mật khẩu mới không đạt độ phức tạp)</b>: Vi phạm quy tắc độ phức tạp mật khẩu <b>[BR-VAL-006]</b> theo cấu hình tại <a href="Cau_hinh.md#431612-uc561---cấu-hình-các-tham-số-khác-của-hệ-thống">UC561</a>, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-006]</b>.</td>
    </tr>
    <tr>
      <td><b>TH4 (Xác nhận mật khẩu mới không khớp)</b>: Hiển thị thông báo lỗi <b>[MSG-ERR-VAL-011]</b> tại ô Xác nhận mật khẩu mới.</td>
    </tr>
    <tr>
      <td><b>TH5 (Mật khẩu mới trùng mật khẩu cũ)</b>: Vi phạm quy tắc không được đặt trùng mật khẩu hiện tại <b>[BR-VAL-010]</b>, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-010]</b>.</td>
    </tr>
    <tr>
      <td><b>TH6 (Mật khẩu hiện tại không chính xác)</b>: Nếu Mật khẩu hiện tại nhập vào không khớp với mật khẩu đang lưu trong hệ thống, hiển thị thông báo lỗi <b>[MSG-ERR-UCPS001-012]</b>.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ (Lưu mật khẩu thành công)</b>: Hệ thống mã hóa băm mật khẩu mới (Hash + Salt) lưu CSDL, tắt cờ bắt buộc đổi mật khẩu (<code>ForcePasswordChange</code> = false), cập nhật ngày đổi mật khẩu gần nhất, ghi nhận nhật ký hệ thống (Audit Log), hiển thị thông báo thành công <b>[MSG-SUC-SYS-004]</b> và chuyển hướng cán bộ về Dashboard Quản trị.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">2</td>
      <td style="vertical-align: middle;">Hủy</td>
      <td style="text-align: center; vertical-align: middle;">Button</td>
      <td>Hủy phiên đăng nhập tạm thời và quay về <a href="#43182-mh01---màn-hình-đăng-nhập-cán-bộ">MH01 - Màn hình Đăng nhập cán bộ</a>.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">3</td>
      <td style="vertical-align: middle;">Ẩn/hiện mật khẩu</td>
      <td style="text-align: center; vertical-align: middle;">Icon</td>
      <td>Khi click icon con mắt tại từng trường mật khẩu, hệ thống chuyển đổi hiển thị giữa che ký tự và hiện ký tự đã nhập. Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/lưu dữ liệu.</td>
    </tr>
  </tbody>
</table>
