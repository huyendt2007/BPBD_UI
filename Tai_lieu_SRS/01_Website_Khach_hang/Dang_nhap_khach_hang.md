### 4.1.5. Đăng nhập dành cho Cá nhân/Tổ chức/Cơ quan có thẩm quyền

#### 4.1.5.1. Mục đích
\- Cung cấp cơ chế xác thực danh tính cho Cá nhân, Tổ chức và Cơ quan có thẩm quyền truy cập vào Website Khách hàng qua VNeID hoặc tài khoản cấp bởi hệ thống.

*a. Phân quyền*

- Người dùng thuộc các nhóm đối tượng sau có tài khoản VNeID hoặc tài khoản do hệ thống cấp:  
  + Cá nhân.  
  + Tổ chức.  
  + Cơ quan có thẩm quyền.  

*b. Điều kiện thực hiện*

- Điều kiện chung của hệ thống:  
  + Hệ thống CSDL Biện pháp bảo đảm và Bồi thường nhà nước hoạt động bình thường.  
- Đối với luồng Đăng nhập qua VNeID:  
  + Thiết bị người dùng có kết nối mạng ổn định với Cổng Dịch vụ công Quốc gia (DVCQG) / CSDL Quốc gia về dân cư.  
  + Tài khoản VNeID của người dùng đã được kích hoạt định danh điện tử Mức độ 2 (IAL2) trở lên.  
- Đối với luồng Đăng nhập bằng tài khoản được cấp:  
  + Người dùng đã được cấp tài khoản nội bộ (Tên đăng nhập và mật khẩu khởi tạo đang ở trạng thái hoạt động).  

---

#### 4.1.5.2. MH01 - Màn hình Đăng nhập khách hàng (Gateway Grid)

##### 4.1.5.2.1. Màn hình
![Màn hình Đăng nhập khách hàng](images/UC001_Login.png)

##### 4.1.5.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Tiêu đề màn hình** | String(255) | - | "ĐĂNG NHẬP HỆ THỐNG ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC" | Control UI: Banner tiêu đề chính có biểu tượng cán cân công lý, đặt ở phần trên cùng của màn hình/popup. |
| **Thẻ "Tài khoản Định danh điện tử (VNeID)"** | String(255) | - | - | Control UI: Thẻ chọn (Card) dành cho công dân đăng nhập bằng VNeID, bao gồm:<br>- Tiêu đề nhóm: **CÔNG DÂN**.<br>- Hình ảnh đại diện (Icon/Logo): Logo VNeID của Bộ Công An (nguồn: `https://xacthuc.dichvucong.gov.vn/authenticationendpoint/images/logo_bca.png`).<br>- Văn bản nhãn thẻ: **Tài khoản Định danh điện tử (VNeID)**. |
| **Thẻ "Tài khoản cấp bởi Hệ thống đăng ký trực tuyến"** | String(255) | - | - | Control UI: Thẻ chọn (Card) dành cho người dùng đăng nhập bằng tài khoản được cấp, bao gồm:<br>- Tiêu đề nhóm: **TÀI KHOẢN ĐƯỢC CẤP**.<br>- Hình ảnh đại diện (Icon/Logo): Logo Cục Đăng ký quốc gia giao dịch bảo đảm (nguồn: `https://dktructuyen.moj.gov.vn/skin/frontend/rwd/default/images/logo_cucdangky.png`).<br>- Văn bản nhãn thẻ: **Tài khoản cấp bởi Hệ thống đăng ký trực tuyến**. |
| **Quay lại trang chủ** | Link/Button | - | - | Control UI: Nút bấm có icon mũi tên quay lại (`fa-arrow-left`), nhãn văn bản: **Quay lại trang chủ**, đặt ở phía dưới cùng căn giữa màn hình. |

##### 4.1.5.2.3. Chức năng trên màn hình
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
      <td rowspan="8" style="text-align: center; vertical-align: middle; font-weight: bold;">1</td>
      <td rowspan="8" style="vertical-align: middle; font-weight: bold;">Chọn Thẻ "Tài khoản Định danh điện tử (VNeID)"</td>
      <td rowspan="8" style="text-align: center; vertical-align: middle;">Card</td>
      <td>Người dùng click chọn Thẻ Hệ thống redirect sang trang Xác thực đăng nhập của CSDL Quốc gia về dân cư  <code>https://sso.dancuquocgia.gov.vn</code> để thực hiện xác thực thông tin đăng nhập qua VNeID: </td>
    </tr>
    <tr>
      <td><b>TH1 (Mất kết nối)</b>: Khi gọi API xác thực bị lỗi (Timeout, lỗi kết nối mạng...), hệ thống hiển thị thông báo lỗi <b>[MSG-ERR-SYS-002]</b>.</td>
    </tr>
    <tr>
      <td><b>TH2 (Xác thực thất bại trên DVCQG/VNeID)</b>: Khi người dùng thực hiện xác thực không thành công trên giao diện VNeID, hệ thống hiển thị <b>[MSG-ERR-UC001-004]</b> và giữ nguyên màn hình đăng nhập.</td>
    </tr>
    <tr>
      <td><b>TH3 (Mức độ định danh chưa đạt IAL2)</b>: Nếu trả về thông tin xác thực nhưng mức độ đảm bảo danh tính (IAL) thấp hơn mức 2, hệ thống từ chối đăng nhập và hiển thị <b>[MSG-ERR-UC001-005]</b>.</td>
    </tr>
    <tr>
      <td><b>TH4 (Tài khoản Bị khóa hoặc Đóng)</b>: Nếu tài khoản đang ở trạng thái <code>Bị khóa</code> hoặc <code>Đóng</code>, hệ thống từ chối đăng nhập và hiển thị <b>[MSG-ERR-UC001-006]</b>.</td>
    </tr>
    <tr>
      <td><b>TH5 (Đã tồn tại tài khoản trên hệ thống)</b>: Hệ thống căn cứ dữ liệu do VNeID trả về để xác định tài khoản xử lý theo từng trường hợp:<br>- <i>Cá nhân đăng nhập cho chính mình</i>: Xác định theo TechID/Số giấy tờ cá nhân. Nếu tài khoản cá nhân đã liên kết nguồn xác thực VNeID và đang <code>Đang hoạt động</code>: đăng nhập vào tài khoản đó.<br>- <i>Tổ chức đăng nhập bằng định danh của tổ chức</i>: Xác định theo Mã định danh tổ chức/Mã số thuế/Số giấy phép đầu tư và TechID tổ chức (nếu có). Nếu tài khoản chính tổ chức đã tồn tại và đang <code>Đang hoạt động</code>: đăng nhập vào tài khoản đó.<br>- <i>Cá nhân đăng nhập với vai trò đại diện/ủy quyền của tổ chức</i>: Xác định thông tin đăng nhập theo VNeID của cá nhân gắn với tài khoản của tổ chức, Tài khoản của Tổ chức ở trạng thái <code>Đang hoạt động</code>.</td>
    </tr>
    <tr>
      <td><b>TH6 (Chưa tồn tại tài khoản trên hệ thống)</b>: Nếu hệ thống chưa tìm thấy tài khoản phù hợp theo ngữ cảnh VNeID, xử lý theo từng trường hợp:<br>- <i>Cá nhân thuộc tổ chức, nhưng không phải đại diện/ủy quyền của tổ chức</i>: Hệ thống chặn đăng nhập, không hiển thị màn hình đăng ký và hiển thị <b>[MSG-ERR-UC001-014]</b>.<br>- <i>Cá nhân</i>: Hệ thống hiển thị màn hình <a href="#4154-mh03---màn-hình-xác-nhận-và-đăng-ký-thông-tin-tài-khoản-qua-vneid">MH03 - Màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID</a> với Loại chủ thể là <b>Cá nhân</b>.<br>- <i>Cá nhân là đại diện của tổ chức</i>: Hệ thống hiển thị màn hình <a href="#4154-mh03---màn-hình-xác-nhận-và-đăng-ký-thông-tin-tài-khoản-qua-vneid">MH03</a> với Loại chủ thể là <b>Tổ chức</b>.<br>- <i>Tổ chức</i>: Hệ thống hiển thị màn hình <a href="#4154-mh03---màn-hình-xác-nhận-và-đăng-ký-thông-tin-tài-khoản-qua-vneid">MH03</a> với Loại chủ thể là <b>Tổ chức</b>.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ (Đăng nhập thành công)</b>: Khởi tạo phiên làm việc (Session), ghi nhận nhật ký đăng nhập (Audit Log) và chuyển hướng người dùng về Trang chủ theo đúng phân quyền.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">2</td>
      <td style="vertical-align: middle;">Chọn Thẻ "Tài khoản cấp bởi Hệ thống đăng ký trực tuyến"</td>
      <td style="text-align: center; vertical-align: middle;">Card</td>
      <td>Khi click chọn Thẻ, hệ thống mở màn hình <a href="#4153-mh02---màn-hình-đăng-nhập-bằng-tài-khoản-và-mật-khẩu">MH02 - Màn hình Đăng nhập bằng tài khoản và mật khẩu</a>.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">3</td>
      <td style="vertical-align: middle;">Quay lại trang chủ</td>
      <td style="text-align: center; vertical-align: middle;">Link/Button</td>
      <td>Chuyển hướng người dùng quay về Trang chủ Website Khách hàng (hoặc đóng modal đăng nhập).</td>
    </tr>
  </tbody>
</table>

---

#### 4.1.5.3. MH02 - Màn hình Đăng nhập bằng tài khoản và mật khẩu

##### 4.1.5.3.1. Màn hình
![Màn hình Đăng nhập bằng tài khoản và mật khẩu](images/UC001_Login.png)

##### 4.1.5.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Tên đăng nhập | String(255) | Có | Trống | Control UI: Ô nhập văn bản (Input text).<br>- Nhập Tên đăng nhập, Email hoặc Mã số thuế doanh nghiệp được cấp. |
| Mật khẩu tài khoản | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu (Password).<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Ghi nhớ đăng nhập | Boolean | Không | Uncheck | Control UI: Hộp kiểm (Checkbox).<br>- Cho phép lựa chọn ghi nhớ phiên đăng nhập (30 ngày) trên trình duyệt hiện tại. |
| Quên mật khẩu? | Link | - | - | Control UI: Liên kết văn bản (Link), đặt cùng hàng với checkbox "Ghi nhớ đăng nhập". |

##### 4.1.5.3.3. Chức năng trên màn hình
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
      <td>Người dùng click chọn hoặc bỏ chọn hộp kiểm để thiết lập thời hạn phiên làm việc:<br>- <b>Tích chọn (Check)</b>: Kích hoạt cơ chế ghi nhớ phiên. Khi người dùng đăng nhập thành công, hệ thống tạo mã Token an toàn (RememberMe Token) và ghi vào cookie bảo mật trên trình duyệt với thời hạn hiệu lực là 30 ngày.<br>- <b>Bỏ tích (Uncheck)</b>: Hủy cơ chế ghi nhớ phiên. Phiên đăng nhập chỉ có hiệu lực theo thời gian chờ phiên thông thường (Session Timeout mặc định 15 phút).</td>
    </tr>
    <tr>
      <td rowspan="8" style="text-align: center; vertical-align: middle; font-weight: bold;">2</td>
      <td rowspan="8" style="vertical-align: middle; font-weight: bold;">Đăng nhập</td>
      <td rowspan="8" style="text-align: center; vertical-align: middle;">Button</td>
      <td><b>TH1 (Bỏ trống trường bắt buộc)</b>: Vi phạm quy tắc <b>[BR-VAL-001]</b>. Hệ thống highlight viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi <b>[MSG-ERR-VAL-001]</b> và tự động focus con trỏ vào ô lỗi. Không thực hiện đăng nhập.</td>
    </tr>
    <tr>
      <td><b>TH2 (Dữ liệu không hợp lệ)</b>:<br>- Tên đăng nhập nhập theo định dạng Email nhưng không đúng chuẩn: Vi phạm quy tắc <b>[BR-VAL-002]</b>, hiển thị cảnh báo lỗi <b>[MSG-ERR-VAL-002]</b>.<br>- Dữ liệu vượt quá độ dài quy định (Tên đăng nhập > 255 ký tự, Mật khẩu > 20 ký tự): Hiển thị cảnh báo lỗi <b>[MSG-ERR-UC001-008]</b> tại trường tương ứng. Không thực hiện đăng nhập.</td>
    </tr>
    <tr>
      <td><b>TH3 (Sai thông tin đăng nhập)</b>: Nếu Tên đăng nhập hoặc Mật khẩu không chính xác, tăng số lần nhập sai liên tiếp thêm 1 và hiển thị thông báo lỗi <b>[MSG-ERR-UC001-007]</b>. Nếu số lần nhập sai liên tiếp vượt quá giới hạn tối đa cấu hình tại <b>[Cấu hình các tham số bảo mật của hệ thống - BR-SEC-050]</b> (mặc định là 5 lần), hệ thống tạm khóa quyền đăng nhập của tài khoản trong thời gian cấu hình (mặc định là 15 phút) và hiển thị thông báo lỗi <b>[MSG-ERR-SEC-001]</b>. Việc tạm khóa này không làm thay đổi trạng thái hoạt động chính của hồ sơ tài khoản.</td>
    </tr>
    <tr>
      <td><b>TH4 (Tài khoản Bị khóa hoặc Đóng)</b>: Nếu tài khoản đang ở trạng thái <code>Bị khóa</code> hoặc <code>Đóng</code>, hệ thống từ chối cấp lại mật khẩu và hiển thị <b>[MSG-ERR-UC001-006]</b>.</td>
    </tr>
    <tr>
      <td><b>TH5 (Đổi mật khẩu lần đầu)</b>: Nếu tài khoản hợp lệ nhưng cờ bắt buộc đổi mật khẩu lần đầu đang bật (<code>ForcePasswordChange</code> = true), hệ thống chuyển hướng người dùng sang màn hình <a href="#4155-mh04---màn-hình-đổi-mật-khẩu-lần-đầu--mật-khẩu-hết-hạn">MH04 - Màn hình Đổi mật khẩu lần đầu / Mật khẩu hết hạn</a>.</td>
    </tr>
    <tr>
      <td><b>TH6 (Mật khẩu hết hạn)</b>: Nếu khoảng thời gian từ lần đổi mật khẩu gần nhất vượt quá thời hạn hiệu lực cấu hình tại <b>[Cấu hình thời hạn mật khẩu của hệ thống - BR-SEC-052]</b> (mặc định là 90 ngày), hệ thống chuyển hướng người dùng sang màn hình <a href="#4155-mh04---màn-hình-đổi-mật-khẩu-lần-đầu--mật-khẩu-hết-hạn">MH04</a> kèm thông báo yêu cầu cập nhật mật khẩu đã hết hạn.</td>
    </tr>
    <tr>
      <td><b>TH7 (Xác thực MFA)</b>: Nếu nhóm tài khoản được kích hoạt cơ chế xác thực đa nhân tố tại <b>[Cấu hình bảo mật đa nhân tố - MFA]</b>, hệ thống sinh mã OTP ngẫu nhiên gửi qua Email đăng ký và chuyển hướng sang màn hình <a href="#4156-mh05---màn-hình-xác-thực-otp-qua-email-mfa">MH05 - Màn hình Xác thực OTP qua Email (MFA)</a>.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ (Đăng nhập thành công)</b>: Reset số lần nhập sai về 0, khởi tạo phiên làm việc (Session) với thời gian timeout cấu hình (mặc định 15 phút), ghi nhận nhật ký đăng nhập (Audit Log) và chuyển hướng người dùng về Trang chủ.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">3</td>
      <td style="vertical-align: middle;">Quên mật khẩu?</td>
      <td style="text-align: center; vertical-align: middle;">Link</td>
      <td>Khi người dùng click chọn "Quên mật khẩu?", hệ thống mở hộp thoại <a href="#41534-popup-quên-mật-khẩu">Popup Quên mật khẩu</a>:<br>- <b>Tự động điền dữ liệu (Pre-fill)</b>: Nếu tại ô "Tên đăng nhập" trên màn hình MH02 đã có giá trị, hệ thống tự động trích xuất và điền sẵn giá trị này vào ô <b>Tên đăng nhập (Email)</b> trên Popup.<br>- Nếu ô "Tên đăng nhập" trên MH02 đang để trống, mở Popup với ô nhập trống để người dùng chủ động nhập thông tin.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">4</td>
      <td style="vertical-align: middle;">Chọn phương thức khác</td>
      <td style="text-align: center; vertical-align: middle;">Link</td>
      <td>Đóng form đăng nhập bằng tài khoản/mật khẩu, xóa dữ liệu đã nhập và quay lại màn hình <a href="#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid">MH01 - Màn hình Đăng nhập khách hàng</a>.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">5</td>
      <td style="vertical-align: middle;">Ẩn/hiện mật khẩu</td>
      <td style="text-align: center; vertical-align: middle;">Icon</td>
      <td>Khi click icon con mắt tại trường Mật khẩu tài khoản, hệ thống chuyển đổi hiển thị giữa che ký tự và hiện ký tự đã nhập. Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/đăng nhập.</td>
    </tr>
  </tbody>
</table>

##### 4.1.5.3.4. Popup Quên mật khẩu

###### 4.1.5.3.4.1. Giao diện Popup
- Giao diện dạng Popup Modal hiển thị đè lên màn hình MH02 khi người dùng click vào liên kết "Quên mật khẩu?". Thiết kế Header và Footer cố định, lề trong đạt chuẩn 24px, chiều cao tối đa không vượt quá 90vh (`max-height: 90vh`).  
- Tiêu đề popup: **Quên mật khẩu**, góc trên bên phải có nút Đóng [X].  

###### 4.1.5.3.4.2. Mô tả thông tin trên Popup
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Tiêu đề Popup** | String(100) | - | "Quên mật khẩu" | Control UI: Tiêu đề hộp thoại kèm icon chìa khóa/khóa bảo mật, đặt tại phần header của popup kèm nút Đóng [X]. |
| **Tên đăng nhập (Email)** | String(255) | Có | Lấy từ MH02 nếu có | Control UI: Ô nhập văn bản (Input text).<br>- Tự động điền giá trị từ ô "Tên đăng nhập" của màn hình MH02 sang nếu người dùng đã nhập trước đó.<br>- Cho phép người dùng nhập Email đã đăng ký với hệ thống để nhận mật khẩu tạm thời. Gợi ý placeholder: *"Nhập email đã đăng ký"*.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001] và quy tắc định dạng Email [BR-VAL-002]. |

###### 4.1.5.3.4.3. Chức năng trên Popup
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
      <td rowspan="5" style="text-align: center; vertical-align: middle; font-weight: bold;">1</td>
      <td rowspan="5" style="vertical-align: middle; font-weight: bold;">Gửi yêu cầu</td>
      <td rowspan="5" style="text-align: center; vertical-align: middle;">Button</td>
      <td><b>TH1 (Bỏ trống trường bắt buộc)</b>: Vi phạm quy tắc <b>[BR-VAL-001]</b>. Hệ thống highlight viền đỏ ô nhập (<code>.is-invalid</code>), hiển thị cảnh báo lỗi <b>[MSG-ERR-VAL-001]</b> ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập. Không thực hiện gửi yêu cầu.</td>
    </tr>
    <tr>
      <td><b>TH2 (Sai định dạng Email)</b>: Người dùng nhập giá trị không đúng định dạng địa chỉ Email chuẩn. Vi phạm quy tắc <b>[BR-VAL-002]</b>, hệ thống highlight viền đỏ ô nhập (<code>.is-invalid</code>), hiển thị cảnh báo lỗi <b>[MSG-ERR-VAL-002]</b> ngay phía dưới ô nhập và tự động focus con trỏ vào ô nhập. Không thực hiện gửi yêu cầu.</td>
    </tr>
    <tr>
      <td><b>TH3 (Tài khoản không tồn tại hoặc không có phương thức đăng nhập Nội bộ)</b>: Nếu giá trị nhập không khớp với bất kỳ tài khoản nào trên hệ thống hoặc tài khoản này chỉ đăng nhập qua VNeID mà không quản lý mật khẩu Nội bộ, hệ thống hiển thị thông báo lỗi <b>[MSG-ERR-UC001-003]</b>.</td>
    </tr>
    <tr>
      <td><b>TH4 (Tài khoản Bị khóa hoặc Đóng)</b>: Nếu tài khoản đang ở trạng thái <code>Bị khóa</code> hoặc <code>Đóng</code>, hệ thống từ chối cấp lại mật khẩu và hiển thị <b>[MSG-ERR-UC001-006]</b>.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ</b>: Hệ thống tự động tạo mật khẩu tạm thời ngẫu nhiên mới đáp ứng quy chuẩn độ phức tạp <b>[BR-VAL-006]</b>; mã hóa băm một chiều (Hash + Salt) mật khẩu tạm thời trước khi cập nhật vào CSDL; kích hoạt cờ bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo (<code>ForcePasswordChange</code> = <code>True</code>); gửi email thông báo tài khoản kèm mật khẩu tạm thời mới đến địa chỉ Email đã liên kết với tài khoản; ghi nhận nhật ký hệ thống (Audit Log); đóng Popup Quên mật khẩu; hiển thị thông báo thành công <b>[MSG-SUC-UC001-001]</b> trên màn hình đăng nhập MH02 để người dùng nhập mật khẩu tạm thời vừa nhận được và đăng nhập lại.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">2</td>
      <td style="vertical-align: middle;">Hủy</td>
      <td style="text-align: center; vertical-align: middle;">Button/Icon</td>
      <td>Đóng Popup Quên mật khẩu và quay về màn hình Đăng nhập MH02 (giữ nguyên dữ liệu hiện có trên MH02). Thao tác này có thể thực hiện bằng cách click nút "Hủy", click icon [X] ở góc trên bên phải hoặc nhấn phím ESC.</td>
    </tr>
  </tbody>
</table>

---

#### 4.1.5.4. MH03 - Màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID

##### 4.1.5.4.1. Màn hình
![Màn hình Xác nhận và Đăng ký thông tin qua VNeID](images/UC001_VNeIDRegister.png)

##### 4.1.5.4.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Tài khoản đăng ký | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Chọn nhu cầu sử dụng nhóm chức năng đăng ký BPBĐ. |
| Tài khoản tra cứu | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Chọn nhu cầu sử dụng nhóm chức năng tra cứu/cấp mã số sử dụng CSDL. |
| Thiết lập đăng nhập bằng Email/Mật khẩu | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Nếu tích chọn: hiển thị các trường nhập Email và Mật khẩu trên form. |
| **II. Thông tin Cá nhân** | | | | Chỉ hiển thị khi loại chủ thể là Cá nhân. |
| Loại tài khoản | Enum(String(50)) | Có | Cá nhân | Chỉ đọc. |
| Email (Tên đăng nhập) | String(255) | Có điều kiện | Theo Email VNeID nếu có | Chỉ hiển thị và bắt buộc khi chọn "Thiết lập đăng nhập bằng Email/Mật khẩu". Áp dụng [BR-VAL-002] và [BR-VAL-009]. |
| Mật khẩu đăng nhập | Password | Có điều kiện | Trống | Control UI: Ô nhập mật khẩu.<br>- Chỉ hiển thị và bắt buộc khi chọn "Thiết lập đăng nhập bằng Email/Mật khẩu". Áp dụng [BR-VAL-006].<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Nhập lại mật khẩu | Password | Có điều kiện | Trống | Control UI: Ô nhập lại mật khẩu.<br>- Chỉ hiển thị và bắt buộc khi chọn "Thiết lập đăng nhập bằng Email/Mật khẩu".<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Loại giấy tờ | Enum(String(50)) | Có | Lấy từ VNeID | Chỉ đọc. |
| Số giấy tờ | String(255) | Có | Lấy từ VNeID | Chỉ đọc. |
| Họ và tên | String(255) | Có | Lấy từ VNeID | Chỉ đọc. |
| Ngày sinh | Date | Không | Lấy từ VNeID | Lấy từ VNeID nếu có, cho phép nhập nếu trống. |
| Giới tính | Enum(String(50)) | Không | Lấy từ VNeID | Lấy từ VNeID nếu có, cho phép chọn nếu trống. |
| Quốc tịch | Enum(String(100)) | Có | Lấy từ VNeID | Control UI: Hộp chọn. |
| Số điện thoại | String(20) | Không | Lấy từ VNeID | Cho phép bổ sung/cập nhật. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc tịch | Tự động gợi ý: `Trong nước` (nếu Quốc tịch Việt Nam) hoặc `Nước ngoài`. |
| Tỉnh/Thành phố | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. |
| Phường/Xã | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15]. |
| Địa chỉ chi tiết | Text(1000) | Có | Lấy từ VNeID nếu có | Nhập số nhà, tên đường/thôn xóm. Áp dụng [BR-VAL-001]. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo cấu hình | Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08]. |
| Cây phân quyền | Tree/Checkbox | Có | Theo nhu cầu sử dụng | Danh sách quyền tương ứng nhóm chức năng đã chọn. |
| **III. Thông tin Tổ chức** | | | | Chỉ hiển thị khi chủ thể là Tổ chức hoặc Đại diện tổ chức. |
| Loại tài khoản | Enum(String(50)) | Có | Tổ chức | Chỉ đọc. |
| Loại tổ chức | Enum(String(100)) | Có | Theo VNeID/cấu hình | Control UI: Hộp chọn. |
| Mã định danh tổ chức | String(100) | Có | Lấy từ VNeID | Chỉ đọc. |
| Mã số thuế/Số giấy phép | String(100) | Có | Lấy từ VNeID nếu có | Cho phép nhập nếu VNeID không trả về. |
| Tên tổ chức | String(255) | Có | Lấy từ VNeID | Chỉ đọc. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có điều kiện | Theo Email VNeID nếu có | Áp dụng [BR-VAL-002] và [BR-VAL-009]. |
| Mật khẩu đăng nhập | Password | Có điều kiện | Trống | Control UI: Ô nhập mật khẩu.<br>- Áp dụng [BR-VAL-006].<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Nhập lại mật khẩu | Password | Có điều kiện | Trống | Control UI: Ô nhập lại mật khẩu.<br>- Phải trùng khớp với Mật khẩu đăng nhập.<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Quốc gia đăng ký | Enum(String(100)) | Có | Lấy từ VNeID | Control UI: Hộp chọn. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc gia đăng ký | Gồm `Trong nước` hoặc `Nước ngoài`. |
| Tỉnh/Thành phố | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu [DM_13]. |
| Phường/Xã | Enum(String(100)) | Có | Lấy từ VNeID nếu có | Tham chiếu [DM_15]. |
| Địa chỉ chi tiết | Text(1000) | Có | Lấy từ VNeID nếu có | Áp dụng [BR-VAL-001]. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo cấu hình | Tham chiếu [DM_08]. |
| Khối Người đại diện / Chủ thể xác thực | - | - | Lấy từ VNeID | Chỉ đọc (Họ tên, Loại giấy tờ, Số giấy tờ, TechID, Vai trò). |
| Cây phân quyền | Tree/Checkbox | Có | Theo nhu cầu sử dụng | Danh sách quyền tương ứng nhóm chức năng đã chọn. |

##### 4.1.5.4.3. Chức năng trên màn hình
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
      <td style="vertical-align: middle;">Chọn/Bỏ chọn Tài khoản đăng ký / Tài khoản tra cứu</td>
      <td style="text-align: center; vertical-align: middle;">Checkbox</td>
      <td>Cập nhật Cây phân quyền tương ứng trên form theo nhu cầu sử dụng.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">2</td>
      <td style="vertical-align: middle;">Chọn/Bỏ chọn Thiết lập đăng nhập bằng Email/Mật khẩu</td>
      <td style="text-align: center; vertical-align: middle;">Checkbox</td>
      <td>Ẩn/hiện các ô nhập Email và Mật khẩu tương ứng.</td>
    </tr>
    <tr>
      <td rowspan="8" style="text-align: center; vertical-align: middle; font-weight: bold;">3</td>
      <td rowspan="8" style="vertical-align: middle; font-weight: bold;">Hoàn tất đăng ký</td>
      <td rowspan="8" style="text-align: center; vertical-align: middle;">Button</td>
      <td><b>TH1 (Bỏ trống trường bắt buộc)</b>: Vi phạm quy tắc <b>[BR-VAL-001]</b>, hệ thống focus và highlight viền đỏ ô trống đầu tiên, hiển thị cảnh báo lỗi <b>[MSG-ERR-VAL-001]</b>.</td>
    </tr>
    <tr>
      <td><b>TH2 (Chưa chọn nhu cầu sử dụng)</b>: Nếu người dùng không chọn "Tài khoản đăng ký" và không chọn "Tài khoản tra cứu", hệ thống hiển thị thông báo lỗi <b>[MSG-ERR-UC001-010]</b>. Không cho phép hoàn tất.</td>
    </tr>
    <tr>
      <td><b>TH3 (Email sai định dạng)</b>: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Email nhập không đúng định dạng, vi phạm <b>[BR-VAL-002]</b>, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-002]</b>.</td>
    </tr>
    <tr>
      <td><b>TH4 (Mật khẩu không đạt độ phức tạp)</b>: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Mật khẩu không đáp ứng quy chuẩn độ dài 8-20 ký tự gồm chữ hoa, chữ thường, số, ký tự đặc biệt, vi phạm <b>[BR-VAL-006]</b>, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-006]</b>.</td>
    </tr>
    <tr>
      <td><b>TH5 (Nhập lại mật khẩu không khớp)</b>: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Nhập lại mật khẩu không trùng khớp, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-011]</b>.</td>
    </tr>
    <tr>
      <td><b>TH6 (Email đăng nhập Nội bộ bị trùng)</b>: Nếu có chọn Thiết lập đăng nhập bằng Email/Mật khẩu và Email đã tồn tại ở nguồn xác thực Nội bộ của tài khoản khác trên hệ thống, vi phạm <b>[BR-VAL-009]</b>, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-009]</b>.</td>
    </tr>
    <tr>
      <td><b>TH7 (Đăng ký thành công - Chỉ chọn Tài khoản đăng ký)</b>: Hệ thống tạo/liên kết hồ sơ tài khoản khách hàng với nguồn xác thực VNeID (và nguồn xác thực Nội bộ nếu có chọn), tự động gán tài khoản vào Nhóm người dùng (User Group) tương ứng: nhóm <b>Đăng ký cá nhân</b> (nếu chủ thể là Cá nhân) hoặc nhóm <b>Đăng ký tổ chức</b> (nếu chủ thể là Tổ chức); khởi tạo phiên đăng nhập và chuyển hướng về Trang chủ.</td>
    </tr>
    <tr>
      <td><b>TH8 (Đăng ký thành công - Có chọn Tài khoản tra cứu)</b>: Hệ thống tạo/liên kết hồ sơ tài khoản khách hàng, tự động gán tài khoản vào Nhóm người dùng: nhóm <b>Tài khoản tra cứu</b> (nếu chỉ chọn tra cứu) hoặc gán đồng thời cả hai nhóm (<b>Tài khoản tra cứu</b> và <b>Đăng ký cá nhân</b> / <b>Đăng ký tổ chức</b>) nếu chọn cả hai nhu cầu; đồng thời khởi tạo Yêu cầu cấp mã số sử dụng CSDL loại <code>Thường xuyên</code> theo đúng quy định và chuyển hướng người dùng sang Cổng thanh toán.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">4</td>
      <td style="vertical-align: middle;">Quay lại</td>
      <td style="text-align: center; vertical-align: middle;">Link/Button</td>
      <td>Hủy dữ liệu đang nhập và quay lại <a href="#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid">MH01 - Màn hình Đăng nhập khách hàng</a>.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">5</td>
      <td style="vertical-align: middle;">Ẩn/hiện mật khẩu</td>
      <td style="text-align: center; vertical-align: middle;">Icon</td>
      <td>Khi click icon con mắt tại các trường mật khẩu, hệ thống chuyển đổi hiển thị giữa che ký tự và hiện ký tự đã nhập. Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/lưu dữ liệu.</td>
    </tr>
  </tbody>
</table>

---

#### 4.1.5.5. MH04 - Màn hình Đổi mật khẩu lần đầu / Mật khẩu hết hạn

##### 4.1.5.5.1. Màn hình
![Màn hình Đổi mật khẩu lần đầu](images/UC001_ChangePassword.png)

##### 4.1.5.5.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mật khẩu hiện tại | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu hiện tại.<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Mật khẩu mới | String(20) | Có | Trống | Control UI: Ô nhập mật khẩu mới. Áp dụng quy tắc phức tạp [BR-VAL-006].<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |
| Xác nhận mật khẩu mới | String(20) | Có | Trống | Control UI: Ô nhập lại mật khẩu mới.<br>- Có biểu tượng con mắt để ẩn/hiện ký tự đã nhập. |

##### 4.1.5.5.3. Chức năng trên màn hình
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
      <td><b>TH2 (Dữ liệu vượt quá độ dài hoặc ký tự không hợp lệ)</b>: Hiển thị cảnh báo lỗi <b>[MSG-ERR-UC001-008]</b> tại trường tương ứng.</td>
    </tr>
    <tr>
      <td><b>TH3 (Mật khẩu mới không đạt độ phức tạp)</b>: Vi phạm quy tắc độ phức tạp mật khẩu <b>[BR-VAL-006]</b>, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-006]</b>.</td>
    </tr>
    <tr>
      <td><b>TH4 (Xác nhận mật khẩu mới không khớp)</b>: Hiển thị thông báo lỗi <b>[MSG-ERR-VAL-011]</b> tại ô Nhập lại mật khẩu mới.</td>
    </tr>
    <tr>
      <td><b>TH5 (Mật khẩu mới trùng mật khẩu cũ)</b>: Vi phạm quy tắc không được đặt trùng mật khẩu hiện tại <b>[BR-VAL-010]</b>, hiển thị thông báo lỗi <b>[MSG-ERR-VAL-010]</b>.</td>
    </tr>
    <tr>
      <td><b>TH6 (Mật khẩu hiện tại không chính xác)</b>: Nếu Mật khẩu hiện tại nhập vào không khớp với mật khẩu đang lưu trong hệ thống, hiển thị thông báo lỗi <b>[MSG-ERR-UC001-012]</b>.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ (Lưu mật khẩu thành công)</b>: Hệ thống mã hóa băm mật khẩu mới (Hash + Salt) lưu CSDL, tắt cờ bắt buộc đổi mật khẩu (<code>ForcePasswordChange</code> = false), cập nhật ngày đổi mật khẩu gần nhất, ghi nhận nhật ký (Audit Log), hiển thị thông báo thành công <b>[MSG-SUC-SYS-004]</b> và chuyển hướng về Trang chủ.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">2</td>
      <td style="vertical-align: middle;">Hủy</td>
      <td style="text-align: center; vertical-align: middle;">Button</td>
      <td>Hủy phiên đăng nhập tạm thời và quay về <a href="#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid">MH01 - Màn hình Đăng nhập khách hàng</a>.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">3</td>
      <td style="vertical-align: middle;">Ẩn/hiện mật khẩu</td>
      <td style="text-align: center; vertical-align: middle;">Icon</td>
      <td>Khi click icon con mắt tại từng trường mật khẩu, hệ thống chuyển đổi hiển thị giữa che ký tự và hiện ký tự đã nhập. Thao tác này không làm thay đổi giá trị mật khẩu và không kích hoạt validate/lưu dữ liệu.</td>
    </tr>
  </tbody>
</table>

---

#### 4.1.5.6. MH05 - Màn hình Xác thực OTP qua Email (MFA)

##### 4.1.5.6.1. Màn hình
![Màn hình Xác thực OTP](images/UC001_OTP.png)

##### 4.1.5.6.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Mã xác thực OTP** | String(6) | Có | Trống | Control UI: Ô nhập 6 chữ số OTP. |
| **Bộ đếm ngược thời gian** | Datetime | - | 120 giây | Control UI: Đồng hồ đếm ngược hiệu lực của mã OTP. |

##### 4.1.5.6.3. Chức năng trên màn hình
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
      <td rowspan="5" style="text-align: center; vertical-align: middle; font-weight: bold;">1</td>
      <td rowspan="5" style="vertical-align: middle; font-weight: bold;">Xác nhận</td>
      <td rowspan="5" style="text-align: center; vertical-align: middle;">Button</td>
      <td><b>TH1 (Bỏ trống mã OTP)</b>: Vi phạm [BR-VAL-001], highlight viền đỏ ô nhập OTP và hiển thị [MSG-ERR-VAL-001].</td>
    </tr>
    <tr>
      <td><b>TH2 (Sai định dạng mã OTP)</b>: Nếu mã OTP không đủ 6 chữ số hoặc chứa ký tự khác số, hiển thị thông báo lỗi [MSG-ERR-SEC-004].</td>
    </tr>
    <tr>
      <td><b>TH3 (Mã OTP đã hết hiệu lực)</b>: Nếu thời gian nhập vượt quá 120 giây của đồng hồ đếm ngược, hiển thị thông báo lỗi <b>[MSG-ERR-SEC-003]</b>.</td>
    </tr>
    <tr>
      <td><b>TH4 (Mã OTP không chính xác)</b>: Nếu mã nhập vào không trùng khớp với mã OTP hệ thống đã sinh, tăng số lần nhập sai và hiển thị thông báo lỗi <b>[MSG-ERR-SEC-002]</b>. Nếu sai quá 3 lần, hủy hiệu lực mã OTP và yêu cầu lấy mã mới.</td>
    </tr>
    <tr>
      <td><b>TH Hợp lệ (Xác thực OTP thành công)</b>: Khởi tạo phiên làm việc chính thức (Session), ghi nhận nhật ký đăng nhập (Audit Log) và chuyển hướng người dùng về Trang chủ.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">2</td>
      <td style="vertical-align: middle;">Gửi lại mã OTP</td>
      <td style="text-align: center; vertical-align: middle;">Link</td>
      <td>Sinh mã OTP ngẫu nhiên mới, gửi email xác thực đến địa chỉ email tài khoản và reset lại đồng hồ đếm ngược 120 giây.</td>
    </tr>
    <tr>
      <td style="text-align: center; vertical-align: middle;">3</td>
      <td style="vertical-align: middle;">Quay lại</td>
      <td style="text-align: center; vertical-align: middle;">Link</td>
      <td>Hủy luồng xác thực OTP hiện tại và quay về <a href="#4152-mh01---màn-hình-đăng-nhập-khách-hàng-gateway-grid">MH01 - Màn hình Đăng nhập khách hàng</a>.</td>
    </tr>
  </tbody>
</table>