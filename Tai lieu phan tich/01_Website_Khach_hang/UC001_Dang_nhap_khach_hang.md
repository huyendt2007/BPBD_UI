### 4.1.5. UC001 - Đăng nhập dành cho Cá nhân/Tổ chức/Cơ quan có thẩm quyền

#### 4.1.5.1. Mục đích

\- Cung cấp cơ chế xác thực danh tính cho Cá nhân, Tổ chức và Cơ quan có thẩm quyền truy cập vào Website Khách hàng thông qua 2 hình thức:  
 \+ Đăng nhập qua VNeID (tích hợp qua Cổng Dịch vụ công Quốc gia).  
 \+ Đăng nhập bằng tài khoản và mật khẩu được cấp bởi hệ thống.  
\- Đảm bảo an toàn bảo mật, phân quyền đúng vai trò và ghi nhận nhật ký truy cập (Audit Logs).  

*a. Phân quyền*

\- Người dùng: Cá nhân/Tổ chức/Cơ quan có thẩm quyền có tài khoản VNeID hoặc tài khoản do hệ thống cấp.  

*b. Điều kiện thực hiện*

\- Hệ thống hoạt động bình thường.  
\- Đối với Đăng nhập qua VNeID: Có kết nối mạng ổn định với Cổng Dịch vụ công Quốc gia (DVCQG) và tài khoản VNeID của người dùng đã được kích hoạt định danh điện tử Mức độ 2 (IAL2) trở lên.  
\- Đối với Đăng nhập bằng tài khoản được cấp: Người dùng đã được Cục Đăng ký quốc gia giao dịch bảo đảm (NRAST) cấp tài khoản nội bộ (Tên đăng nhập và mật khẩu khởi tạo).  

#### 4.1.5.2. UC001.MH01 - Màn hình Đăng nhập khách hàng

##### 4.1.5.2.1. Màn hình

\- Giao diện dạng Cổng lựa chọn phương thức đăng nhập (Gateway Grid), gồm 2 thẻ (card) lựa chọn phương thức đặt song song:
  \+ Thẻ 1 "Đăng nhập qua VNeID": Đăng nhập bằng tài khoản định danh điện tử VNeID thông qua kênh tích hợp Cổng DVCQG.
  \+ Thẻ 2 "Đăng nhập bằng tài khoản/mật khẩu BPBĐ": Đăng nhập bằng Tên đăng nhập/Email và Mật khẩu do hệ thống BPBĐ quản lý.
\- Khi NSD click chọn Thẻ 2, Gateway Grid ẩn đi và hệ thống hiển thị Panel nhập liệu "Đăng nhập Tài khoản chuyên dùng" (Tên đăng nhập/Email, Mật khẩu, Ghi nhớ đăng nhập, liên kết "Quên mật khẩu?", nút "Đăng nhập"), kèm nút "Chọn phương thức khác" ở góc trên để quay lại Gateway Grid.
\- Khi NSD click chọn Thẻ 1, hệ thống điều hướng toàn trang (redirect) sang Cổng DVCQG để thực hiện xác thực VNeID; sau khi Cổng DVCQG xác thực xong sẽ gọi lại (callback) hệ thống để tiếp tục xử lý kết quả đăng nhập.

![Màn hình Đăng nhập khách hàng](images/UC001_Login.png)

##### 4.1.5.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Gateway Grid - Lựa chọn phương thức đăng nhập** | | | | |
| Thẻ "Đăng nhập qua VNeID" | String(255) | Có | - | Control UI: Thẻ chọn (Card).<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Thẻ "Đăng nhập bằng tài khoản/mật khẩu BPBĐ" | String(255) | Có | - | Control UI: Thẻ chọn (Card).<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **II. Panel "Đăng nhập Tài khoản chuyên dùng" (chỉ hiển thị sau khi chọn Thẻ 2)** | | | | |
| Tên đăng nhập| String(255) | Có | Trống | Nhập Tên đăng nhập, Email hoặc Mã số thuế doanh nghiệp đã được cấp. |
| Mật khẩu tài khoản | String(20) | Có | Trống | Nhập mật khẩu tài khoản. Có icon con mắt để ẩn/hiện ký tự đã nhập. |
| Ghi nhớ đăng nhập | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Tích chọn để ghi nhớ phiên đăng nhập trên trình duyệt hiện tại.<br>- Trạng thái:<br>- Check: Kích hoạt ghi nhớ phiên (30 ngày)<br>- Uncheck: Không kích hoạt. |
| Quên mật khẩu? | String(255) | Không | - | Control UI: Liên kết (Link), đặt cùng hàng với checkbox "Ghi nhớ đăng nhập".<br>- Không điều hướng sang màn hình khác; xử lý nội tuyến ngay tại Panel này bằng cách sử dụng giá trị đã nhập tại ô "Tên đăng nhập" phía trên.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Đăng nhập | String(255) | Có | - | - Nút xác nhận đăng nhập bằng nguồn xác thực Nội bộ.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Chọn phương thức khác | String(255) | Không | - | Control UI: Liên kết, đặt ở góc trên Panel.<br>- Đóng Panel, xóa dữ liệu đã nhập (Tên đăng nhập/Email, Mật khẩu) và hiển thị lại Gateway Grid. |

##### 4.1.5.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Thẻ "Đăng nhập qua VNeID" | Thẻ chọn (Card) | Người dùng click chọn Thẻ để thực hiện xác thực bằng tài khoản định danh VNeID qua kênh tích hợp Cổng DVCQG. |
| | | | \- TH1 (Mất kết nối Cổng DVCQG): Khi gọi API xác thực bị lỗi (Timeout, lỗi kết nối mạng...), hệ thống hiển thị thông báo lỗi **[MSG-ERR-SYS-002]**. |
| | | | \- TH2 (Xác thực thất bại trên DVCQG/VNeID): Khi người dùng thực hiện xác thực không thành công trên giao diện của Cổng DVCQG, hệ thống hiển thị **[MSG-ERR-UC001-004]** và giữ nguyên màn hình đăng nhập. |
| | | | \- TH3 (Mức độ định danh chưa đạt IAL2): Nếu DVCQG trả về thông tin xác thực nhưng mức độ đảm bảo danh tính (IAL) thấp hơn mức 2, hệ thống từ chối đăng nhập và hiển thị **[MSG-ERR-UC001-005]**. |
| | | | \- TH4 (Hồ sơ tài khoản không được phép đăng nhập): Nếu hồ sơ tài khoản khách hàng đang ở trạng thái `Bị khóa` hoặc `Đóng`, hệ thống từ chối đăng nhập và hiển thị **[MSG-ERR-UC001-006]**. |
| | | | \- TH5 (Đã tồn tại tài khoản trên hệ thống): Hệ thống căn cứ dữ liệu do VNeID/DVCQG trả về để xác định tài khoản xử lý, không cho phép người dùng tự chọn thủ công ngữ cảnh đại diện tổ chức nếu dữ liệu không trả về. Xử lý theo từng ngữ cảnh: |
| | | | **a) Cá nhân đăng nhập cho chính mình**: Xác định theo TechID/Số giấy tờ cá nhân. Nếu tài khoản cá nhân đã liên kết nguồn xác thực VNeID và đang `Đang hoạt động`: đăng nhập vào tài khoản đó. |
| | | | **b) Tổ chức đăng nhập bằng định danh của tổ chức**: Xác định theo Mã định danh tổ chức/Mã số thuế/Số giấy phép đầu tư và TechID tổ chức (nếu có). Nếu tài khoản chính tổ chức đã tồn tại và đang `Đang hoạt động`: đăng nhập vào tài khoản đó. |
| | | | **c) Cá nhân đăng nhập với vai trò đại diện/ủy quyền của tổ chức**: Tài khoản xử lý là tài khoản chính của tổ chức, xác định theo thông tin tổ chức trong ngữ cảnh đại diện (không theo TechID cá nhân của người đại diện).<br>- Cá nhân đại diện/ủy quyền (chủ thể xác thực) không tự động được tạo thành tài khoản phụ; chỉ được lưu/cập nhật vào danh sách chủ thể xác thực liên kết của tài khoản tổ chức theo TechID/Số giấy tờ cá nhân để phục vụ tra cứu, đối chiếu, audit.<br>- Nếu TechID đã từng liên kết cùng tổ chức: chỉ cập nhật lần xác thực gần nhất, không tạo bản ghi liên kết trùng.<br>- Một tổ chức có thể có nhiều cá nhân đại diện/ủy quyền; một cá nhân cũng có thể là chủ thể xác thực liên kết của nhiều tổ chức khác nhau theo từng ngữ cảnh VNeID/DVCQG trả về tương ứng. Hệ thống không chặn chỉ vì TechID/Số giấy tờ cá nhân đã từng liên kết với tổ chức khác. |
| | | | **d) Cá nhân đăng nhập thuộc tổ chức, không phải đại diện/ủy quyền** (thành viên/nhân viên trực thuộc tổ chức): Xác định tài khoản chính tổ chức theo định danh tổ chức, sau đó xác định tài khoản phụ đã tồn tại sẵn theo TechID/Số giấy tờ cá nhân trong phạm vi tổ chức đó (hệ thống không tự động khởi tạo tài khoản chính tổ chức hoặc tài khoản phụ mới trong ngữ cảnh này).<br>- Nếu tài khoản phụ đã tồn tại và đã có nguồn xác thực VNeID liên kết: đăng nhập bình thường vào tài khoản phụ.<br>- Nếu tài khoản phụ đã tồn tại nhưng hiện chỉ có nguồn xác thực Nội bộ (chưa liên kết VNeID): hệ thống tự động bổ sung thêm nguồn xác thực VNeID (lưu TechID) vào tài khoản phụ đó rồi đăng nhập; không tạo tài khoản phụ mới, không ảnh hưởng tới nguồn xác thực Nội bộ đã có. |
| | | | Ở mọi ngữ cảnh (a, b, c, d), nếu tài khoản xác định được đang `Bị khóa` hoặc `Đóng`, áp dụng TH4. |
| | | | \- TH6 (Chưa tồn tại tài khoản trên hệ thống - cần đăng ký/liên kết hoặc bị chặn): Nếu hệ thống chưa tìm thấy tài khoản phù hợp theo ngữ cảnh VNeID/DVCQG, xử lý theo từng trường hợp: |
| | | | **a)** Ngữ cảnh là Cá nhân hoặc Tổ chức/người đại diện hợp pháp của Tổ chức và dữ liệu VNeID/DVCQG đủ điều kiện tạo/liên kết tài khoản: Hệ thống hiển thị màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID tại UC001.MH04. |
| | | | **b)** Ngữ cảnh là Đại diện tổ chức nhưng VNeID/DVCQG không trả về đủ thông tin tối thiểu của tổ chức được đại diện: Hệ thống hiển thị **[MSG-ERR-UC001-013]**. |
| | | | **c)** Ngữ cảnh là Cá nhân thuộc tổ chức, không phải đại diện/ủy quyền, và tổ chức được trả về **chưa tồn tại** trên hệ thống: Hệ thống chặn đăng nhập, không hiển thị màn hình đăng ký UC001.MH04, và hiển thị **[MSG-ERR-UC001-014]**. |
| | | | **d)** Ngữ cảnh là Cá nhân thuộc tổ chức, không phải đại diện/ủy quyền, tổ chức đã tồn tại nhưng cá nhân đó **chưa tồn tại là tài khoản phụ** trực thuộc tổ chức: Hệ thống chặn đăng nhập, không hiển thị màn hình đăng ký UC001.MH04, và hiển thị **[MSG-ERR-UC001-015]**. |
| | | | **e)** Thông tin xác định là Cơ quan có thẩm quyền: Hệ thống từ chối và hiển thị **[MSG-ERR-UC001-002]**. |
| | | | \- TH Hợp lệ (Đăng nhập thành công): |
| | | | \+ Khởi tạo phiên làm việc (Session) cho người dùng với thời gian chờ (timeout) cấu hình tại [UC553](#43164-uc553---cau-hinh-thoi-gian-cho-timeout) (mặc định 15 phút không hoạt động). |
| | | | \+ Nếu người dùng tích chọn "Ghi nhớ đăng nhập": Hệ thống tạo mã Token Ghi nhớ đăng nhập an toàn (RememberMe Token) và ghi vào cookie bảo mật (Secure & HttpOnly) trên trình duyệt với thời hạn hiệu lực cấu hình tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong) (mặc định là 30 ngày). |
| | | | \+ Hệ thống ghi nhận nhật ký đăng nhập (Audit Log) gồm: Tài khoản (Mã tài khoản khách hàng, Loại khách hàng, Loại tài khoản, Trạng thái tài khoản); Chủ thể xác thực (Loại chủ thể xác thực, TechID nếu đăng nhập qua VNeID, Email nếu đăng nhập Nội bộ); Ngữ cảnh đăng nhập (Cá nhân, Tổ chức, Đại diện tổ chức, hoặc Cá nhân thuộc tổ chức không phải đại diện/ủy quyền); Thời gian đăng nhập, địa chỉ IP, thiết bị/trình duyệt, phương thức đăng nhập. |
| | | | \+ Riêng ngữ cảnh Đại diện tổ chức, ghi thêm: Thông tin tổ chức được đại diện (Mã định danh tổ chức/Mã số thuế/Số giấy phép đầu tư, Tên tổ chức); Thông tin cá nhân đại diện (Họ tên, Loại giấy tờ, Số giấy tờ, TechID, Vai trò đại diện/ủy quyền nếu VNeID/DVCQG trả về); Kết quả liên kết chủ thể xác thực (Tạo mới liên kết hoặc cập nhật lần xác thực gần nhất). |
| | | | \+ Nếu là ngữ cảnh Đại diện tổ chức, hệ thống cập nhật danh sách chủ thể xác thực liên kết của tài khoản tổ chức trước khi chuyển hướng vào hệ thống. |
| | | | \+ Chuyển hướng người dùng về Trang chủ và hiển thị các tính năng đã được phân quyền tương ứng theo tài khoản. |
| 2 | Chọn Thẻ "Hệ thống đăng ký trực tuyến giao dịch bảo đảm" | Thẻ chọn (Card) | Người dùng click chọn Thẻ. Hệ thống ẩn Gateway Grid, hiển thị Panel "Đăng nhập Tài khoản chuyên dùng" và đảm bảo các ô Tên đăng nhập/Email, Mật khẩu đang ở trạng thái trống (reset dữ liệu của lần thao tác trước, nếu có). |
| 3 | Đăng nhập | Nút | Người dùng bấm chọn để thực hiện đăng nhập bằng Tên đăng nhập/Email và Mật khẩu được cấp. |
| | | | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ trường trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không thực hiện đăng nhập. |
| | | | \- TH2 (Dữ liệu không hợp lệ): Hệ thống kiểm tra dữ liệu theo từng trường:<br>- Tên đăng nhập/Email sai định dạng Email: Vi phạm **[BR-VAL-002]**, hiển thị **[MSG-ERR-VAL-002]** nếu người dùng nhập theo dạng Email.<br>- Dữ liệu vượt quá độ dài hoặc chứa ký tự không hợp lệ: Hiển thị **[MSG-ERR-UC001-008]** tại trường tương ứng.<br>Không thực hiện đăng nhập. |
| | | | \- TH3 (Sai thông tin đăng nhập): Nếu Tên đăng nhập/Email hoặc Mật khẩu nhập vào không chính xác, hệ thống tăng số lần nhập sai liên tiếp của tài khoản thêm 1 và hiển thị **[MSG-ERR-UC001-007]**. Nếu số lần sai liên tiếp vượt quá cấu hình tối đa theo **[BR-SEC-050]**, hệ thống tạm khóa quyền đăng nhập trong 15 phút và hiển thị **[MSG-ERR-SEC-001]**. Việc tạm khóa quyền đăng nhập không làm phát sinh thêm trạng thái tài khoản ngoài bộ trạng thái `Đang hoạt động`, `Bị khóa`, `Đóng`. |
| | | | \- TH4 (Tài khoản không được phép đăng nhập): Nếu hồ sơ tài khoản đang ở trạng thái `Bị khóa` hoặc `Đóng`, hệ thống từ chối đăng nhập và hiển thị **[MSG-ERR-UC001-006]**. |
| | | | \- TH5 (Đăng nhập lần đầu): Nếu tài khoản hợp lệ nhưng cờ bắt buộc đổi mật khẩu lần đầu hoạt động (`ForcePasswordChange` = true), hệ thống chuyển hướng người dùng sang Màn hình Đổi mật khẩu lần đầu (UC001.MH02). |
| | | | \- TH6 (Mật khẩu hết hạn): Nếu khoảng thời gian từ lần đổi mật khẩu gần nhất vượt quá hiệu lực cấu hình tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong) (mặc định là 90 ngày), hệ thống chuyển hướng người dùng sang Màn hình Đổi mật khẩu (UC001.MH02) với thông báo yêu cầu cập nhật mật khẩu hết hạn. |
| | | | \- TH7 (Xác thực MFA): Nếu nhóm tài khoản này được kích hoạt cơ chế xác thực đa nhân tố tại [UC562](#431613-uc562---thiet-lap-co-che-bao-mat-da-nhan-to-mfa), hệ thống sinh mã OTP ngẫu nhiên gửi qua [Mẫu Email gửi mã OTP xác thực đăng nhập tại Phụ lục Mẫu Email hệ thống](#email-gui-otp) và chuyển hướng người dùng sang Màn hình Xác thực OTP qua Email (UC001.MH03). |
| | | | \- TH Hợp lệ (Đăng nhập thành công):<br>  \+ Reset số lần nhập sai liên tiếp về 0.<br>  \+ Khởi tạo phiên làm việc (Session) với thời gian chờ (timeout) cấu hình tại [UC553](#43164-uc553---cau-hinh-thoi-gian-cho-timeout) (mặc định 15 phút không hoạt động).<br>  \+ Nếu người dùng tích chọn "Ghi nhớ đăng nhập": Hệ thống tạo mã Token Ghi nhớ đăng nhập an toàn (RememberMe Token) và ghi vào cookie bảo mật (Secure & HttpOnly) trên trình duyệt với thời hạn hiệu lực cấu hình tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong) (mặc định là 30 ngày).<br>  \+ Ghi nhận nhật ký đăng nhập (Audit Log) bao gồm: Tên đăng nhập, Địa chỉ IP đăng nhập, Thời gian đăng nhập và Phương thức: "Nội bộ".<br>  \+ Chuyển hướng người dùng về Trang chủ và hiển thị các tính năng đã được phân quyền tương ứng. |
| 4 | Quên mật khẩu? | Link | Người dùng bấm chọn khi không nhớ mật khẩu, ngay tại Panel "Đăng nhập Tài khoản chuyên dùng" (không điều hướng sang màn hình/popup khác). Hệ thống lấy giá trị hiện có tại ô "Tên đăng nhập" phía trên để xác định tài khoản cần khôi phục. |
| | | | \- TH1 (Chưa nhập Tên đăng nhập/Email): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ ô "Tên đăng nhập" và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không thực hiện gửi yêu cầu. |
| | | | \- TH2 (Không tồn tại nguồn xác thực Nội bộ hoặc không quản lý mật khẩu Nội bộ): Nếu giá trị nhập không khớp với bất kỳ nguồn xác thực Nội bộ nào đang hoạt động của hồ sơ tài khoản khách hàng, hệ thống hiển thị **[MSG-ERR-UC001-003]**. Không tiết lộ thêm thông tin về nguồn xác thực đang liên kết để tránh rò rỉ thông tin định danh. |
| | | | \- TH Hợp lệ:<br>  \+ Tạo ngẫu nhiên mật khẩu tạm thời mới đáp ứng quy chuẩn độ phức tạp - **[BR-VAL-006]**.<br>  \+ Thực hiện mã hóa băm một chiều mật khẩu tạm thời trước khi cập nhật vào CSDL.<br>  \+ Kích hoạt cờ bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo (`ForcePasswordChange` = `True`).<br>  \+ Gửi email thông báo tài khoản kèm mật khẩu tạm thời dạng rõ đến địa chỉ Email đã liên kết với tài khoản.<br>  \+ Ghi nhận nhật ký hệ thống (Audit Log): Tên đăng nhập, Email, Địa chỉ IP yêu cầu, Thời gian yêu cầu.<br>  \+ Hiển thị **[MSG-SUC-UC001-001]**.<br>  \+ Vẫn giữ nguyên tại Panel đăng nhập hiện tại (không điều hướng đi đâu) để NSD tự nhập lại mật khẩu tạm thời vừa nhận được. |
| 5 | Chọn phương thức khác | Link | Người dùng bấm chọn để đóng Panel "Đăng nhập Tài khoản chuyên dùng", xóa dữ liệu đã nhập (Tên đăng nhập/Email, Mật khẩu) và quay lại hiển thị Gateway Grid. |

#### 4.1.5.3. UC001.MH02 - Màn hình Đổi mật khẩu lần đầu / Mật khẩu hết hạn

##### 4.1.5.3.1. Màn hình

\- Giao diện màn hình yêu cầu bắt buộc thay đổi mật khẩu dành cho tài khoản đăng nhập bằng mật khẩu cấp bởi hệ thống trong lần đăng nhập đầu tiên hoặc khi mật khẩu cũ hết hạn sử dụng.

![Màn hình Đổi mật khẩu lần đầu](images/UC001_ChangePassword.png)

##### 4.1.5.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mật khẩu hiện tại | String(20) | Có | Trống | - Nhập mật khẩu hiện tại (mật khẩu khởi tạo được cấp qua email hoặc mật khẩu đã hết hạn). |
| Mật khẩu mới | String(20) | Có | Trống | - Nhập mật khẩu mới mong muốn.<br>- Ràng buộc độ phức tạp: Độ dài từ 8 đến 20 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt theo cấu hình tại [UC561](#431612-uc561---cau-hinh-cac-tham-so-khac-cua-he-thong). |
| Xác nhận mật khẩu mới | String(20) | Có | Trống | - Nhập lại mật khẩu mới để kiểm tra trùng khớp. |
| Lưu mật khẩu | - | Có | - | - Nút xác nhận thay đổi mật khẩu.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Hủy | - | Có | - | - Nút hủy bỏ thao tác đổi mật khẩu.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.1.5.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu mật khẩu | Nút | Người dùng bấm nút để cập nhật mật khẩu mới. Hệ thống thực hiện kiểm tra: |
| | | | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Hệ thống focus và highlight viền đỏ trường trống đầu tiên và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không cho phép lưu. |
| | | | \- TH2 (Dữ liệu không hợp lệ): Nếu dữ liệu vượt quá độ dài hoặc chứa ký tự không hợp lệ, hệ thống hiển thị **[MSG-ERR-UC001-008]** tại trường tương ứng. Không cho phép lưu. |
| | | | \- TH3 (Mật khẩu mới không đạt độ phức tạp): Vi phạm quy tắc **[BR-VAL-006]**. Hệ thống hiển thị thông báo lỗi **[MSG-ERR-VAL-006]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH4 (Xác nhận mật khẩu không khớp): Hệ thống hiển thị thông báo lỗi **[MSG-ERR-VAL-011]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH5 (Mật khẩu mới trùng mật khẩu cũ): Hệ thống hiển thị thông báo lỗi **[MSG-ERR-VAL-010]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH6 (Mật khẩu hiện tại không chính xác): Nếu Mật khẩu hiện tại không khớp với mật khẩu đang lưu của nguồn xác thực Nội bộ, hệ thống hiển thị **[MSG-ERR-UC001-012]**. Focus và highlight viền đỏ ô lỗi. Không cho phép lưu. |
| | | | \- TH Hợp lệ:<br>  \+ Thực hiện mã hóa băm mật khẩu mới kết hợp chuỗi Salt và lưu vào CSDL.<br>  \+ Tắt cờ bắt buộc đổi mật khẩu (`ForcePasswordChange` = false) và cập nhật thời gian đổi mật khẩu gần nhất.<br>  \+ Ghi nhật ký hệ thống (Audit Log).<br>  \+ Hiển thị Toast thông báo **[MSG-SUC-SYS-004]** và tự động chuyển hướng người dùng về Trang chủ. |
| 2 | Hủy | Nút | Người dùng hủy thao tác đổi mật khẩu. Hệ thống hủy phiên đăng nhập tạm thời, xóa dữ liệu nhập và chuyển hướng quay lại Màn hình Đăng nhập (UC001.MH01). |

#### 4.1.5.4. UC001.MH03 - Màn hình Xác thực OTP qua Email (MFA)

##### 4.1.5.4.1. Màn hình

\- Giao diện màn hình nhập mã xác thực OTP gửi qua Email đăng ký khi tài khoản đăng nhập bằng mật khẩu cấp bởi hệ thống được kích hoạt chế độ bảo mật đa nhân tố (MFA).

![Màn hình Xác thực OTP](images/UC001_OTP.png)

##### 4.1.5.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã xác thực OTP | String(6) | Có | Trống | - Nhập mã OTP gồm 6 chữ số được gửi qua email của người dùng. |
| Gửi lại mã OTP | String(50) | Không | - | Control UI: Hiển thị/Read-only.<br>- Click để gửi lại mã OTP mới.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Bộ đếm ngược thời gian | Datetime | Không | 120 giây | Control UI: Hiển thị/Read-only.<br>- Hiển thị đếm ngược thời gian hiệu lực của mã OTP. |
| Xác nhận | String(255) | Có | - | - Nút xác nhận mã OTP để hoàn tất đăng nhập.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Quay lại | String(255) | Không | - | Control UI: Hiển thị/Read-only.<br>- Liên kết quay về màn hình đăng nhập chính.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.1.5.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận | Nút | Người dùng bấm nút để kiểm tra mã xác thực OTP đã nhập. |
| | | | \- TH1 (Bỏ trống trường bắt buộc): Vi phạm quy tắc **[BR-VAL-001]**. Focus và highlight viền đỏ ô nhập OTP và hiển thị cảnh báo lỗi **[MSG-ERR-VAL-001]**. Không cho phép thực hiện. |
| | | | \- TH2 (Dữ liệu không hợp lệ): Nếu Mã xác thực OTP không đúng 6 chữ số hoặc chứa ký tự khác ngoài số, hệ thống hiển thị **[MSG-ERR-UC001-009]**. Focus và highlight viền đỏ ô lỗi. |
| | | | \- TH3 (Mã OTP hết hiệu lực): Vi phạm quy tắc **[BR-SEC-051]**. Hệ thống hiển thị thông báo lỗi **[MSG-ERR-SEC-003]**. Focus và highlight viền đỏ ô lỗi. Không cho phép thực hiện. |
| | | | \- TH4 (Mã OTP không chính xác): Vi phạm quy tắc **[BR-SEC-051]**. Hệ thống tăng số lần nhập sai OTP. Nếu vượt quá quy định, hệ thống hủy phiên đăng nhập, tạm khóa quyền đăng nhập và hiển thị thông báo lỗi **[MSG-ERR-SEC-002]**. Việc tạm khóa quyền đăng nhập không làm phát sinh thêm trạng thái tài khoản ngoài bộ trạng thái `Đang hoạt động`, `Bị khóa`, `Đóng`. |
| | | | \- TH Hợp lệ:<br>  \+ Thực hiện xác thực thành công.<br>  \+ Reset số lần nhập sai OTP về 0.<br>  \+ Khởi tạo phiên làm việc chính thức (Session) với thời gian chờ (timeout) mặc định 15 phút.<br>  \+ Ghi nhận nhật ký đăng nhập (Audit Log).<br>  \+ Chuyển hướng người dùng về Trang chủ. |
| 2 | Gửi lại mã OTP | Link | Người dùng bấm chọn để nhận mã OTP mới qua email. |
| | | | \- TH Hợp lệ:<br>  \+ Sinh ngẫu nhiên mã OTP mới gồm 6 chữ số.<br>  \+ Gửi [Mẫu Email gửi mã OTP xác thực đăng nhập tại Phụ lục Mẫu Email hệ thống](#email-gui-otp) mới đến hòm thư đăng ký của người dùng.<br>  \+ Khởi động lại Bộ đếm ngược thời gian (120 giây).<br>  \+ Hiển thị **[MSG-SUC-UC001-002]**. |
| 3 | Quay lại | Link | Người dùng bấm để hủy luồng xác thực OTP hiện tại. Hệ thống hủy phiên đăng nhập tạm thời và quay về Màn hình Đăng nhập (UC001.MH01). |

#### 4.1.5.6. UC001.MH04 - Màn hình Xác nhận và Đăng ký thông tin tài khoản qua VNeID

##### 4.1.5.6.1. Màn hình

\- Giao diện trung gian xuất hiện sau khi người dùng xác thực VNeID thành công nhưng TechID chưa được liên kết với hồ sơ tài khoản khách hàng trên hệ thống BPBĐ.  
\- Màn hình áp dụng cho Cá nhân, Tổ chức và Cá nhân đăng nhập với vai trò đại diện/ủy quyền của Tổ chức theo dữ liệu VNeID/DVCQG trả về.  
\- Toàn bộ nội dung được hiển thị trên **một form thống nhất**, không tách phần lựa chọn nhu cầu sử dụng tài khoản thành popup riêng.  
\- Khối **Nhu cầu sử dụng tài khoản** hiển thị ngay trên form; khi người dùng tích chọn các tùy chọn, hệ thống show/hide các trường liên quan trực tiếp trên cùng form.  
\- Hệ thống chỉ quản lý **một hồ sơ tài khoản khách hàng** cho một chủ thể. Hồ sơ này có thể liên kết đồng thời nhiều nguồn xác thực:
  \+ Nguồn xác thực VNeID: dùng TechID để đăng nhập qua VNeID ở các lần sau.  
  \+ Nguồn xác thực Nội bộ: dùng Email (Tên đăng nhập) và Mật khẩu để đăng nhập bằng tài khoản/mật khẩu BPBĐ.  
\- Nếu ngữ cảnh Đại diện tổ chức nhưng dữ liệu VNeID/DVCQG không có đủ thông tin tối thiểu để xác định tổ chức được đại diện, hệ thống không hiển thị form đăng ký và hiển thị **[MSG-ERR-UC001-013]**.  

![Màn hình Xác nhận và Đăng ký thông tin qua VNeID](images/UC001_VNeIDRegister.png)

##### 4.1.5.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Nhu cầu sử dụng tài khoản** | | | | Khối tùy chọn hiển thị trên cùng form đăng ký. |
| Ngữ cảnh đăng nhập | Enum(String(50)) | Có | Theo VNeID/DVCQG | Control UI: Hiển thị/Read-only.<br>Gồm:<br>- Cá nhân<br>- Tổ chức<br>- Đại diện tổ chức<br>- Hệ thống tự xác định theo response VNeID/DVCQG, người dùng không được sửa. |
| Tài khoản đăng ký | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Cho phép người dùng chọn nhu cầu sử dụng nhóm chức năng đăng ký BPBĐ.<br>- Có thể chọn đồng thời với Tài khoản tra cứu. |
| Tài khoản tra cứu | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Cho phép người dùng chọn nhu cầu sử dụng nhóm chức năng tra cứu/cấp mã số sử dụng CSDL.<br>- Khi tích chọn và hoàn tất đăng ký, hệ thống khởi tạo yêu cầu cấp mã số sử dụng CSDL loại `Thường xuyên` theo Danh mục dùng chung - Loại mã số sử dụng CSDL [DM_38].<br>- Có thể chọn đồng thời với Tài khoản đăng ký. |
| Thiết lập đăng nhập bằng Email/Mật khẩu | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Nếu tích chọn, hệ thống hiển thị các trường Email (Tên đăng nhập), Mật khẩu đăng nhập và Nhập lại mật khẩu trên cùng form.<br>- Nếu không tích chọn, hệ thống chỉ tạo/liên kết nguồn xác thực VNeID cho hồ sơ tài khoản khách hàng. |
| **II. Thông tin Cá nhân** | | | | Chỉ hiển thị khi VNeID trả về loại chủ thể Cá nhân. |
| Loại tài khoản | Enum(String(50)) | Có | Cá nhân | Control UI: Hiển thị/Read-only. Không cho phép sửa. |
| Email (Tên đăng nhập) | String(255) | Có điều kiện | Theo Email VNeID nếu có | Chỉ hiển thị và bắt buộc nếu tích chọn **Thiết lập đăng nhập bằng Email/Mật khẩu**.<br>- Email được sử dụng làm Tên đăng nhập nguồn xác thực Nội bộ.<br>- Cho phép người dùng sửa trước khi hoàn tất đăng ký.<br>- Áp dụng **[BR-VAL-002]** và **[BR-VAL-009]**. |
| Mật khẩu đăng nhập | Password | Có điều kiện | Trống | Chỉ hiển thị và bắt buộc nếu tích chọn **Thiết lập đăng nhập bằng Email/Mật khẩu**.<br>- Mật khẩu phải tuân thủ quy tắc phức tạp mật khẩu **[BR-VAL-006]**.<br>- Có icon con mắt để ẩn/hiện ký tự đã nhập. |
| Nhập lại mật khẩu | Password | Có điều kiện | Trống | Chỉ hiển thị và bắt buộc nếu tích chọn **Thiết lập đăng nhập bằng Email/Mật khẩu**.<br>- Phải trùng khớp với Mật khẩu đăng nhập.<br>- Có icon con mắt để ẩn/hiện ký tự đã nhập. |
| Loại giấy tờ | Enum(String(50)) | Có | Lấy từ VNeID | Control UI: Hiển thị/Read-only. Không cho phép sửa. |
| Số giấy tờ | String(255) | Có | Lấy từ VNeID | Control UI: Hiển thị/Read-only. Không cho phép sửa. |
| Họ và tên | String(255) | Có | Lấy từ VNeID | Control UI: Hiển thị/Read-only. Không cho phép sửa. |
| Ngày sinh | Date | Không | Lấy từ VNeID | Nếu VNeID có dữ liệu thì hiển thị theo VNeID; nếu không có thì cho phép người dùng nhập. |
| Giới tính | Enum(String(50)) | Không | Lấy từ VNeID | Nếu VNeID có dữ liệu thì hiển thị theo VNeID; nếu không có thì cho phép người dùng chọn. |
| Quốc tịch | Enum(String(100)) | Có | Lấy từ VNeID | Control UI: Hộp chọn. |
| Số điện thoại | String(20) | Không | Lấy từ VNeID nếu có | Cho phép người dùng bổ sung/cập nhật. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc tịch | Gồm:<br>- Trong nước<br>- Nước ngoài<br>- Tự động gợi ý là Trong nước nếu Quốc tịch = Việt Nam, ngược lại là Nước ngoài; cho phép điều chỉnh. |
| Tỉnh/TP | Enum/String(100) | Có | Lấy từ VNeID nếu có | Control UI động theo Quốc tịch/Quốc gia.<br>- Nếu Quốc tịch/Quốc gia là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>- Nếu Quốc tịch/Quốc gia khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập.<br>- Nếu VNeID có dữ liệu thì tự động điền theo dữ liệu VNeID; nếu không có thì người dùng nhập/chọn theo quy tắc trên. |
| Địa chỉ chi tiết | String(500) | Có | Lấy từ VNeID nếu có | Nếu VNeID có dữ liệu thì tự động điền; nếu không có thì cho phép người dùng nhập. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo cấu hình hệ thống | Control UI: Hộp chọn. Danh sách lấy từ Danh mục dùng chung - [DM_08 - Trung tâm giao dịch bảo đảm](../../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| Cây phân quyền | Tree/Checkbox | Có | Theo lựa chọn nhu cầu sử dụng | Hiển thị danh sách quyền được phép tích chọn.<br>- Nhóm Tài khoản đăng ký: gồm các quyền/thủ tục đăng ký BPBĐ như Đăng ký mới BPBĐ, Đăng ký thay đổi BPBĐ, Xóa đăng ký BPBĐ và các thủ tục đăng ký liên quan.<br>- Nhóm Tài khoản tra cứu: gồm các quyền tra cứu/cấp mã số sử dụng CSDL. |
| **III. Thông tin Tổ chức** | | | | Chỉ hiển thị khi VNeID/DVCQG trả về loại chủ thể Tổ chức hoặc ngữ cảnh Đại diện tổ chức. |
| Loại tài khoản | Enum(String(50)) | Có | Tổ chức | Control UI: Hiển thị/Read-only. Không cho phép sửa. |
| Loại tổ chức | Enum(String(100)) | Có | Theo thông tin VNeID/cấu hình | Control UI: Hộp chọn. |
| Mã định danh tổ chức | String(100) | Có | Lấy từ VNeID | Control UI: Hiển thị/Read-only. Không cho phép sửa. |
| Mã số thuế/Số giấy phép đầu tư | String(100) | Có | Lấy từ VNeID nếu có | Cho phép nhập nếu VNeID không trả về dữ liệu. |
| Tên tổ chức | String(255) | Có | Lấy từ VNeID | Control UI: Hiển thị/Read-only. Không cho phép sửa. |
| Email tổ chức (Tên đăng nhập) | String(255) | Có điều kiện | Theo Email VNeID nếu có | Chỉ hiển thị và bắt buộc nếu tích chọn **Thiết lập đăng nhập bằng Email/Mật khẩu**.<br>- Email được sử dụng làm Tên đăng nhập nguồn xác thực Nội bộ.<br>- Cho phép người dùng sửa trước khi hoàn tất đăng ký.<br>- Áp dụng **[BR-VAL-002]** và **[BR-VAL-009]**. |
| Mật khẩu đăng nhập | Password | Có điều kiện | Trống | Chỉ hiển thị và bắt buộc nếu tích chọn **Thiết lập đăng nhập bằng Email/Mật khẩu**.<br>- Mật khẩu phải tuân thủ quy tắc phức tạp mật khẩu **[BR-VAL-006]**.<br>- Có icon con mắt để ẩn/hiện ký tự đã nhập. |
| Nhập lại mật khẩu | Password | Có điều kiện | Trống | Chỉ hiển thị và bắt buộc nếu tích chọn **Thiết lập đăng nhập bằng Email/Mật khẩu**.<br>- Phải trùng khớp với Mật khẩu đăng nhập.<br>- Có icon con mắt để ẩn/hiện ký tự đã nhập. |
| Loại giấy tờ | Enum(String(50)) | Có | Lấy từ VNeID | Loại giấy tờ của người đại diện. Control UI: Hiển thị/Read-only. |
| Số giấy tờ | String(255) | Có | Lấy từ VNeID | Số giấy tờ của người đại diện. Control UI: Hiển thị/Read-only. |
| Số điện thoại | String(20) | Không | Lấy từ VNeID nếu có | Cho phép người dùng bổ sung/cập nhật. |
| Quốc gia đăng ký | Enum(String(100)) | Có | Lấy từ VNeID | Control UI: Hộp chọn. |
| Phân loại khách hàng | Enum(String(50)) | Có | Theo Quốc gia đăng ký | Gồm:<br>- Trong nước<br>- Nước ngoài<br>- Tự động gợi ý là Trong nước nếu Quốc gia đăng ký = Việt Nam, ngược lại là Nước ngoài; cho phép điều chỉnh. |
| Tỉnh/TP | Enum/String(100) | Có | Lấy từ VNeID nếu có | Control UI động theo Quốc gia đăng ký.<br>- Nếu Quốc gia đăng ký là "Việt Nam": Hiển thị hộp chọn và cho phép chọn tại Danh mục dùng chung - Tỉnh/Thành phố [DM_13].<br>- Nếu Quốc gia đăng ký khác "Việt Nam": Hiển thị ô nhập liệu dạng văn bản để người dùng tự nhập.<br>- Nếu VNeID có dữ liệu thì tự động điền theo dữ liệu VNeID; nếu không có thì người dùng nhập/chọn theo quy tắc trên. |
| Địa chỉ chi tiết | String(500) | Có | Lấy từ VNeID nếu có | Nếu VNeID có dữ liệu thì tự động điền; nếu không có thì cho phép người dùng nhập. |
| Trung tâm Đăng ký mặc định | Enum(String(100)) | Có | Theo cấu hình hệ thống | Control UI: Hộp chọn. Danh sách lấy từ Danh mục dùng chung - [DM_08 - Trung tâm giao dịch bảo đảm](../../00_Tong_quan_va_Quy_tac_chung.md#dm_08). |
| **Khối thông tin Người đại diện/Chủ thể xác thực** | - | - | Lấy từ VNeID | Control UI: Hiển thị/Read-only.<br>- Chỉ hiển thị khi ngữ cảnh đăng nhập là Đại diện tổ chức hoặc VNeID/DVCQG trả về thông tin người đại diện.<br>- Đây là thông tin chủ thể xác thực liên kết với tài khoản tổ chức, không phải tài khoản phụ trực thuộc. |
| > Họ và tên người đại diện | String(255) | Có | Lấy từ VNeID | Không cho phép sửa. |
| > Loại giấy tờ | Enum(String(50)) | Có | Lấy từ VNeID | Không cho phép sửa. |
| > Số giấy tờ | String(255) | Có | Lấy từ VNeID | Không cho phép sửa. |
| > TechID người đại diện | String(100) | Có điều kiện | Lấy từ VNeID | Không cho phép sửa. Chỉ lưu nội bộ để phục vụ xác thực và audit; không hiển thị dạng rõ nếu chính sách bảo mật yêu cầu che/mask. |
| > Vai trò đại diện/ủy quyền | String(255) | Không | Lấy từ VNeID nếu có | Không cho phép sửa. Hiển thị theo vai trò/ngữ cảnh do VNeID/DVCQG trả về. |
| Cây phân quyền | Tree/Checkbox | Có | Theo lựa chọn nhu cầu sử dụng | Hiển thị danh sách quyền được phép tích chọn.<br>- Nhóm Tài khoản đăng ký: gồm các quyền/thủ tục đăng ký BPBĐ như Đăng ký mới BPBĐ, Đăng ký thay đổi BPBĐ, Xóa đăng ký BPBĐ và các thủ tục đăng ký liên quan.<br>- Nhóm Tài khoản tra cứu: gồm các quyền tra cứu/cấp mã số sử dụng CSDL. |
| Hoàn tất đăng ký | Button | Có | - | Nút hoàn tất đăng ký/liên kết tài khoản. |
| Quay lại | Link/Button | Không | - | Hủy dữ liệu đang nhập trên form và quay lại màn hình Đăng nhập khách hàng (UC001.MH01). |

##### 4.1.5.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn/Bỏ chọn Tài khoản đăng ký | Checkbox | Hệ thống cập nhật lại Cây phân quyền tương ứng nhóm chức năng đăng ký BPBĐ ngay trên form. |
| 2 | Chọn/Bỏ chọn Tài khoản tra cứu | Checkbox | Hệ thống cập nhật lại Cây phân quyền tương ứng nhóm chức năng tra cứu/cấp mã số sử dụng CSDL ngay trên form. |
| 3 | Chọn/Bỏ chọn Thiết lập đăng nhập bằng Email/Mật khẩu | Checkbox | Nếu tích chọn, hệ thống hiển thị các trường Email (Tên đăng nhập), Mật khẩu đăng nhập và Nhập lại mật khẩu trên cùng form. Nếu bỏ chọn, hệ thống ẩn các trường này và xóa dữ liệu đã nhập tại các trường này. |
| 4 | Hoàn tất đăng ký | Button | Hệ thống kiểm tra dữ liệu trên form trước khi tạo/liên kết hồ sơ tài khoản khách hàng. |
| | | | - TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], hệ thống focus trường lỗi đầu tiên và hiển thị [MSG-ERR-VAL-001]. |
| | | | - TH2 (Chưa chọn nhu cầu sử dụng): Nếu người dùng không chọn Tài khoản đăng ký và không chọn Tài khoản tra cứu, hệ thống hiển thị **[MSG-ERR-UC001-010]**. Không cho phép hoàn tất. |
| | | | - TH3 (Email sai định dạng): Nếu có chọn **Thiết lập đăng nhập bằng Email/Mật khẩu** và Email (Tên đăng nhập) không đúng định dạng, vi phạm **[BR-VAL-002]**, hiển thị **[MSG-ERR-VAL-002]**. Không cho phép hoàn tất. |
| | | | - TH4 (Mật khẩu không đạt độ phức tạp): Nếu có chọn **Thiết lập đăng nhập bằng Email/Mật khẩu** và Mật khẩu đăng nhập không đạt quy tắc **[BR-VAL-006]**, hiển thị **[MSG-ERR-VAL-006]**. Không cho phép hoàn tất. |
| | | | - TH5 (Nhập lại mật khẩu không khớp): Nếu có chọn **Thiết lập đăng nhập bằng Email/Mật khẩu** và Nhập lại mật khẩu không khớp Mật khẩu đăng nhập, hiển thị **[MSG-ERR-VAL-011]**. Không cho phép hoàn tất. |
| | | | - TH6 (Dữ liệu khác không hợp lệ): Nếu dữ liệu sai định dạng, vượt quá độ dài hoặc không đáp ứng quy tắc tại trường thông tin, hệ thống hiển thị MessageList tương ứng theo từng trường. Không cho phép hoàn tất. |
| | | | - TH7 (TechID đã liên kết hồ sơ khác): Nếu TechID từ VNeID đã liên kết với hồ sơ tài khoản khách hàng khác, hệ thống chặn thao tác và hiển thị **[MSG-ERR-UC001-011]**. |
| | | | - TH8 (Email đăng nhập Nội bộ trùng): Nếu có chọn **Thiết lập đăng nhập bằng Email/Mật khẩu** và Email (Tên đăng nhập) đã tồn tại ở nguồn xác thực Nội bộ của hồ sơ khác, hệ thống chặn thao tác và hiển thị **[MSG-ERR-VAL-009]**. |
| | | | - TH9 (VNeID/DVCQG không trả về đủ thông tin tổ chức được đại diện): Nếu ngữ cảnh đăng nhập là Đại diện tổ chức nhưng dữ liệu VNeID/DVCQG không có đủ thông tin tối thiểu để xác định tổ chức được đại diện, gồm mã định danh tổ chức/mã số thuế/số giấy phép đầu tư và tên tổ chức, hệ thống hiển thị **[MSG-ERR-UC001-013]**. Không cho phép hoàn tất. |
| | | | - TH10 (Không chọn Thiết lập đăng nhập bằng Email/Mật khẩu):<br>- Hệ thống tạo mới hoặc cập nhật hồ sơ tài khoản khách hàng theo thông tin VNeID/DVCQG và thông tin người dùng bổ sung.<br>- Hệ thống tạo nguồn xác thực VNeID và lưu TechID liên kết với hồ sơ tài khoản khách hàng.<br>- Nếu ngữ cảnh là Đại diện tổ chức, hệ thống lưu/cập nhật người đại diện vào danh sách chủ thể xác thực liên kết của tài khoản tổ chức; không tạo tài khoản phụ trực thuộc.<br>- Hệ thống không tạo nguồn xác thực Nội bộ, không tạo mật khẩu và không gửi Email thông tin đăng nhập.<br>- Các trường VNeID/DVCQG không trả về dữ liệu được để trống nếu không bắt buộc trên form. |
| | | | - TH11 (Có chọn Thiết lập đăng nhập bằng Email/Mật khẩu):<br>- Hệ thống thực hiện toàn bộ xử lý tại TH10.<br>- Đồng thời tạo thêm nguồn xác thực Nội bộ trên cùng hồ sơ tài khoản khách hàng, sử dụng Email làm Tên đăng nhập.<br>- Hệ thống lưu mật khẩu theo cơ chế mã hóa/băm mật khẩu và gắn trạng thái nguồn xác thực Nội bộ là Đang hoạt động.<br>- Hệ thống gửi Email thông báo thông tin khởi tạo tài khoản theo mẫu cấu hình. |
| | | | - TH12 (Có chọn Tài khoản tra cứu):<br>- Hệ thống tạo/liên kết hồ sơ tài khoản khách hàng và nguồn xác thực VNeID/Nội bộ theo TH10/TH11 trước khi khởi tạo giao dịch cấp mã số sử dụng CSDL. Việc tạo/liên kết tài khoản không bị rollback nếu người dùng thanh toán lỗi, hủy giao dịch hoặc không hoàn tất thanh toán tại Cổng thanh toán.<br>- Hệ thống khởi tạo Yêu cầu cấp mã số sử dụng CSDL với **Loại yêu cầu/Loại mã số sử dụng CSDL = `Thường xuyên`** theo Danh mục dùng chung [DM_38] và Mã số CSDL theo đúng quy tắc tại [4.1.12.6.1. Logic Khởi tạo Yêu cầu cấp mã số sử dụng CSDL](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#41126-quy-tac-nghiep-vu-cap-ma-so-su-dung-csdl-va-tich-hop-cong-thanh-toan).<br>- Hệ thống xác định biểu phí cấp mã số sử dụng CSDL loại `Thường xuyên` theo cấu hình biểu phí đang có hiệu lực tại [UC559 - Cấu hình thông tin về biểu phí](../03_Website_Quan_tri/01_Quan_tri_he_thong/UC559_Quan_ly_bieu_phi_SRS.md). Mốc thời gian xác định biểu phí là **thời điểm hoàn tất đăng ký/khởi tạo Yêu cầu cấp mã số sử dụng CSDL** trên UC001; không lấy theo thời điểm thanh toán, thời điểm kích hoạt mã hoặc thời điểm cán bộ đối soát.<br>- Nếu không tìm thấy biểu phí đang có hiệu lực tương ứng với loại `Thường xuyên` tại mốc thời gian trên, hệ thống hiển thị **[MSG-ERR-UCPS-003]**, không khởi tạo Yêu cầu cấp mã số sử dụng CSDL, không sinh Mã số CSDL và không chuyển sang Cổng thanh toán. Hồ sơ tài khoản khách hàng đã tạo/liên kết theo TH10/TH11 vẫn được giữ nguyên.<br>- Trường hợp thanh toán thành công/thất bại/hủy giao dịch/không hoàn tất thanh toán: không viết lại tại UC001, áp dụng theo [4.1.12.6.2. Logic Lắng nghe và Xử lý phản hồi từ Cổng thanh toán](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#41126-quy-tac-nghiep-vu-cap-ma-so-su-dung-csdl-va-tich-hop-cong-thanh-toan) và cơ chế Cổng thanh toán chung của UC158.<br>- Nếu thanh toán không thành công hoặc người dùng không hoàn tất thanh toán: Yêu cầu cấp mã giữ trạng thái `Đang xử lý`/hiển thị phía Khách hàng là `Chờ thanh toán`, Mã số CSDL giữ trạng thái `Chờ kích hoạt`; người dùng thực hiện thanh toán lại hoặc xử lý theo kênh đối soát/kích hoạt thủ công đã mô tả tại UC190. |
| | | | - TH13 (Chỉ chọn Tài khoản đăng ký): Sau khi tạo/liên kết hồ sơ tài khoản thành công, hệ thống khởi tạo phiên đăng nhập và redirect về Trang chủ. |
| 5 | Quay lại | Link/Button | Hệ thống hủy dữ liệu đang nhập trên form, hủy luồng xác thực VNeID hiện tại và chuyển hướng quay lại màn hình Đăng nhập khách hàng (UC001.MH01). |

**Nguyên tắc liên kết và đồng bộ tài khoản**:
- Mỗi Cá nhân/Tổ chức chỉ có một hồ sơ tài khoản khách hàng nghiệp vụ trên hệ thống BPBĐ.
- Một hồ sơ tài khoản khách hàng có thể có đồng thời nguồn xác thực VNeID và nguồn xác thực Nội bộ.
- Quyền sử dụng hệ thống, trạng thái hồ sơ, thông tin khách hàng và lịch sử giao dịch được quản lý theo hồ sơ tài khoản khách hàng, không tách riêng theo từng nguồn xác thực.
- TechID chỉ dùng để nhận diện nguồn xác thực VNeID và phục vụ đăng nhập VNeID ở các lần sau.
- Email (Tên đăng nhập) chỉ dùng để nhận diện nguồn xác thực Nội bộ khi người dùng có chọn **Thiết lập đăng nhập bằng Email/Mật khẩu**.
- Khi đăng nhập bằng VNeID hoặc bằng Email/Mật khẩu, hệ thống đều đưa người dùng vào cùng một hồ sơ tài khoản khách hàng nếu các nguồn xác thực đã liên kết cùng hồ sơ.
- Với tài khoản tổ chức, TechID cá nhân đại diện/ủy quyền được lưu như chủ thể xác thực liên kết, không dùng làm định danh chính của tài khoản tổ chức.
- Chủ thể xác thực liên kết của tài khoản tổ chức không phải là tài khoản phụ trực thuộc và không được hiển thị như một tài khoản khách hàng độc lập nếu chưa được tạo riêng theo nghiệp vụ tài khoản phụ.
- Ngữ cảnh Cá nhân thuộc tổ chức nhưng không phải đại diện/ủy quyền không tự tạo mới tài khoản chính tổ chức hoặc tài khoản phụ; tài khoản phụ phải được Đại diện tổ chức khởi tạo trước (qua UC005/UC006 phía Website Khách hàng hoặc UC009 phía Website Quản trị). Khi tài khoản phụ đã tồn tại và đăng nhập VNeID hợp lệ, hệ thống chỉ bổ sung nguồn xác thực VNeID vào đúng tài khoản phụ đó, không tạo bản ghi tài khoản mới.

**MessageList bổ sung cho UC001**:

| Mã Message | Nội dung |
| :--- | :--- |
| MSG-ERR-UC001-013 | VNeID/DVCQG không trả về đủ thông tin tổ chức được đại diện. Vui lòng kiểm tra lại ngữ cảnh xác thực hoặc liên hệ đơn vị hỗ trợ. |
| MSG-ERR-UC001-014 | Tổ chức của bạn chưa có tài khoản trên hệ thống BPBĐ. Vui lòng liên hệ Đại diện tổ chức để được khởi tạo tài khoản. |
| MSG-ERR-UC001-015 | Tài khoản của bạn chưa được khởi tạo trong tổ chức trên hệ thống BPBĐ. Vui lòng liên hệ Đại diện tổ chức để được thêm mới tài khoản. |
