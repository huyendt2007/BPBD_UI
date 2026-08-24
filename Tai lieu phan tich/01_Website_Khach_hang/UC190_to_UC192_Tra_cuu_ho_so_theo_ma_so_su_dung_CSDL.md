### 4.1.12. UC190-UC192 - Tra cứu hồ sơ theo mã số sử dụng CSDL

#### 4.1.12.1. Mục đích
\- Cho phép Người sử dụng (NSD) và Cơ quan Nhà nước có thẩm quyền thực hiện tra cứu thông tin đăng ký biện pháp bảo đảm (BPBĐ) và hợp đồng đã được lưu trữ trong Cơ sơ dữ liệu quốc gia về biện pháp bảo đảm trên Website Khách hàng, theo 3 tiêu chí tra cứu: Số đăng ký, Bên bảo đảm, hoặc Số khung phương tiện giao thông đường bộ.<br>
\- Sử dụng mã số sử dụng CSDL (mã truy cập CSDL) được cấp để xác thực quyền tra cứu và thực hiện khấu trừ phí tra cứu hoặc đối soát theo quy định pháp luật.<br>
\- Hỗ trợ kết xuất văn bản kết quả tra cứu điện tử có chữ ký số của cơ quan đăng ký để làm chứng cứ pháp lý hoặc chứng nhận tình trạng pháp lý của tài sản bảo đảm.<br>

*a. Phân quyền*
\- Khách hàng (Cá nhân, Tổ chức) đã được cấp mã số sử dụng CSDL thường xuyên hoặc mua mã số sử dụng một lần.<br>
\- Cơ quan Nhà nước có thẩm quyền (Cục Thi hành án, Tòa án, Viện kiểm sát, Cơ quan điều tra,...) được cấp mã số sử dụng CSDL cơ quan (miễn phí).<br>

*b. Điều kiện thực hiện (Pre-conditions)*
\- Người dùng đã truy cập thành công vào phân hệ tra cứu trực tuyến trên Website Khách hàng.<br>
\- Người dùng có mã số sử dụng CSDL còn hiệu lực (trạng thái "Hoạt động", chưa hết hạn, và đối với mã sử dụng một lần thì không ở trạng thái "Đã sử dụng").<br>
\- Hệ thống hoạt động bình thường, kết nối cơ sở dữ liệu và phân hệ xác thực mã số sử dụng CSDL ổn định.<br>

---

#### 4.1.12.2. Khối Tab tra cứu (UC190-UC192)

##### 4.1.12.2.1. UC190-UC192.MH01 - Màn hình Tra cứu thông tin

###### 4.1.12.2.1.1. Màn hình
\- Giao diện màn hình gồm bộ chọn hình thức tra cứu dưới dạng Tab chức năng, gồm 3 Tab: **Tra cứu theo Số đăng ký** (mặc định), **Tra cứu theo Bên bảo đảm**, **Tra cứu theo Số khung**.<br>
\- Khối **Bạn chưa có mã số sử dụng cơ sở dữ liệu** hiển thị phía trên khu vực Tab tra cứu để NSD có thể khởi tạo yêu cầu cấp mã số sử dụng CSDL trước khi thực hiện tra cứu.<br>
\- Luồng cấp mã Một lần/Thường xuyên và giao diện xác nhận biểu phí/thanh toán khi tài khoản ở trạng thái Chờ kích hoạt được xử lý từ các nút trong khối này.<br>
\- Khối nhập thông tin mã số sử dụng CSDL hiển thị phía trên các Tab tra cứu, là tiêu chí bắt buộc chung cho cả 3 Tab.<br>
\- Khi NSD chọn một Tab, hệ thống chỉ hiển thị khối tiêu chí tương ứng với Tab đó.<br>

###### 4.1.12.2.1.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối Bạn chưa có mã số sử dụng cơ sở dữ liệu** | | | | |
| Thanh thông tin yêu cầu cấp mã số sử dụng CSDL | String(50) | Không | - | - Hiển thị khối thông tin (CTA block) gồm tiêu đề, icon và 2 nút lựa chọn: **Cấp mã Một lần** và **Cấp mã Thường xuyên**.<br>+ Quy tắc hiển thị:<br>+ Đối với khách vãng lai và tài khoản đã đăng nhập nhưng chưa liên kết mã: Hiển thị đầy đủ cả 2 lựa chọn.<br>+ Quy tắc ẩn: Hệ thống tự động ẩn nếu tài khoản đã liên kết mã thường xuyên ở trạng thái `Hoạt động`, hoặc đã tồn tại một yêu cầu cấp mã thường xuyên đang ở trạng thái `Chờ kích hoạt`. |
| **II. Khối xác thực quyền tra cứu** | | | | |
| Mã số sử dụng CSDL | String(50) | Có | Trống / Tự động điền | - Nhập mã số sử dụng CSDL được cấp (dạng `CQ-XXXXXX`, `TX-XXXXXX`, `1L-XXXXXX` hoặc `OL-XXXXXX`).<br>+ Nếu người dùng đã đăng nhập và tài khoản đã liên kết mã thường xuyên: Hệ thống tự điền mã liên kết và để ở trạng thái chỉ đọc (Read-only). |
| **III. Khối Tab tra cứu** | | | | |
| Tab Tra cứu theo Số đăng ký | Tab | Có | Đang chọn | Hiển thị mặc định khi mở màn hình Tra cứu thông tin. Khi được chọn, hệ thống hiển thị **Khối tiêu chí - Tra cứu theo Số đăng ký**. |
| Tab Tra cứu theo Bên bảo đảm | Tab | Không | Không chọn | Khi được chọn, hệ thống hiển thị **Khối tiêu chí - Tra cứu theo Bên bảo đảm**. |
| Tab Tra cứu theo Số khung | Tab | Không | Không chọn | Khi được chọn, hệ thống hiển thị **Khối tiêu chí - Tra cứu theo Số khung**. |
| **IV. Khối tiêu chí - Tra cứu theo Số đăng ký** | | | | Chỉ hiển thị khi NSD chọn Tab **Tra cứu theo Số đăng ký**. |
| Số đăng ký | String(50) | Có | Trống | - Nhập số đăng ký của bất kỳ hồ sơ nào trong chuỗi giao dịch (số đăng ký gốc hoặc số thay đổi/xóa/thông báo) cần tra cứu. |
| **V. Khối tiêu chí - Tra cứu theo Bên bảo đảm** | | | | Chỉ hiển thị khi NSD chọn Tab **Tra cứu theo Bên bảo đảm**. |
| Loại chủ thể | Enum(String(50)) | Có | Công dân Việt Nam | Control UI: Hộp chọn.<br>Tham chiếu Danh mục Loại bên bảo đảm (Chủ thể) [DM_06]. |
| Họ và tên | String(255) | Có | Trống | Chỉ hiển thị khi Loại chủ thể chọn là:<br>+ "Công dân Việt Nam"<br>+ "Người nước ngoài"<br>+ "Người không quốc tịch cư trú tại Việt Nam" |
| Số CMND/Căn cước công dân/Chứng minh quân đội | String(12) | Có | Trống | - Chỉ hiển thị khi Loại chủ thể là "Công dân Việt Nam".<br>+ Nhập số CMND/Căn cước công dân/Chứng minh quân đội hợp lệ (12 chữ số). Không chấp nhận chữ cái hay ký tự đặc biệt. |
| Mã số thuế | String(50) | Có | Trống | Chỉ hiển thị khi Loại chủ thể chọn là:<br>+ "Tổ chức có đăng ký kinh doanh trong nước"<br>+ "Tổ chức nước ngoài" |
| Số Hộ chiếu | String(50) | Có | Trống | Chỉ hiển thị khi Loại chủ thể là:<br>+ "Người nước ngoài" |
| **VI. Khối tiêu chí - Tra cứu theo Số khung** | | | | Chỉ hiển thị khi NSD chọn Tab **Tra cứu theo Số khung**. |
| Số khung | String(50) | Có | Trống | - Nhập chính xác số khung của phương tiện giao thông cơ giới đường bộ cần kiểm tra. |

###### 4.1.12.2.1.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Khởi tạo màn hình | Hệ thống | - Hệ thống tự động kiểm tra thông tin tài khoản đăng nhập của người dùng:<br>+ Nếu tài khoản đang có yêu cầu cấp mã số sử dụng CSDL thường xuyên ở trạng thái `Chờ kích hoạt`: Hệ thống tự động ẩn toàn bộ Form nhập tiêu chí tìm kiếm của Tab đang mở; đồng thời hiển thị giao diện xác nhận biểu phí và thanh toán tại mục [4.1.12.3](#41123-uc190mh02---man-hinh-xac-nhan-bieu-phi-va-thanh-toan-ma-thuong-xuyen).<br>+ Các trường hợp khác: Hiển thị giao diện màn hình tra cứu bình thường. |
| 2 | Cấp mã Một lần | Button | Khi NSD click chọn nút **Cấp mã Một lần** trên thanh thông tin, hệ thống chuyển thẳng NSD sang giao diện Yêu cầu cung cấp mã tra cứu CSDL Một lần tại mục [4.1.12.4](#41124-uc190mh03---man-hinh-yeu-cau-cung-cap-ma-tra-cuu-co-so-du-lieu-mot-lan). |
| 3 | Cấp mã Thường xuyên | Button | Khi NSD click chọn nút **Cấp mã Thường xuyên** trên thanh thông tin:<br>+ Nếu chưa đăng nhập: Hệ thống chuyển sang form yêu cầu đăng nhập tại [UC001.MH01 - Màn hình Đăng nhập khách hàng](UC001_Dang_nhap_khach_hang.md#4152-uc001mh01---man-hinh-dang-nhap-khach-hang). Sau khi đăng nhập thành công, hệ thống chuyển tiếp tới màn hình xác nhận biểu phí trước khi thanh toán tại [UC190.MH02 - Màn hình xác nhận biểu phí và thanh toán (Mã thường xuyên)](#41123-uc190mh02---man-hinh-xac-nhan-bieu-phi-va-thanh-toan-ma-thuong-xuyen).<br>+ Nếu đã đăng nhập: Hệ thống chuyển tiếp trực tiếp tới màn hình xác nhận biểu phí trước khi thanh toán tại [UC190.MH02 - Màn hình xác nhận biểu phí và thanh toán (Mã thường xuyên)](#41123-uc190mh02---man-hinh-xac-nhan-bieu-phi-va-thanh-toan-ma-thuong-xuyen). |
| 4 | Chọn Tab Tra cứu theo Số đăng ký | Tab | Khi NSD chọn Tab, hệ thống hiển thị **Khối tiêu chí - Tra cứu theo Số đăng ký** và ẩn các khối tiêu chí của 2 Tab còn lại. |
| 5 | Chọn Tab Tra cứu theo Bên bảo đảm | Tab | Khi NSD chọn Tab, hệ thống hiển thị **Khối tiêu chí - Tra cứu theo Bên bảo đảm** và ẩn các khối tiêu chí của 2 Tab còn lại. |
| 6 | Chọn Tab Tra cứu theo Số khung | Tab | Khi NSD chọn Tab, hệ thống hiển thị **Khối tiêu chí - Tra cứu theo Số khung** và ẩn các khối tiêu chí của 2 Tab còn lại. |
| 7 | Tìm kiếm | Nút | Khi NSD bấm **Tìm kiếm**, hệ thống kiểm tra và xử lý theo các trường hợp bên dưới.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
| | | | **TH1: Bỏ trống trường bắt buộc**: Nếu trường **Mã số sử dụng CSDL** hoặc tiêu chí bắt buộc của Tab đang chọn bị bỏ trống, hệ thống chặn thao tác, highlight đỏ viền trường tương ứng và hiển thị cảnh báo lỗi **"Trường này bắt buộc nhập"** ngay phía dưới trường đó. Tiêu chí bắt buộc được xác định theo Tab đang chọn và quy tắc hiển thị/bắt buộc tại mục [4.1.12.2.1.2](#4112212-mo-ta-thong-tin-tren-man-hinh). |
| | | | **TH2: Dữ liệu không hợp lệ**: Hệ thống chặn thao tác và hiển thị lỗi tương ứng theo trường không hợp lệ:<br>+ Nếu NSD đang chọn Tab **Tra cứu theo Số đăng ký** và **Số đăng ký** chứa ký tự đặc biệt không được phép, hiển thị lỗi **"Số đăng ký không hợp lệ"**.<br>+ Nếu NSD đang chọn Tab **Tra cứu theo Bên bảo đảm**, Loại chủ thể là **"Công dân Việt Nam"** và **Số CMND/Căn cước công dân/Chứng minh quân đội** không đúng định dạng 12 chữ số hoặc chứa chữ cái/ký tự đặc biệt, hiển thị lỗi **"Số CMND/Căn cước công dân/Chứng minh quân đội không hợp lệ"**.<br>+ Nếu NSD đang chọn Tab **Tra cứu theo Số khung** và **Số khung** chứa ký tự đặc biệt không được phép, hiển thị lỗi **"Số khung không hợp lệ"**. |
| | | | **TH3: Mã số sử dụng CSDL không tồn tại**: Nếu mã số sử dụng CSDL không tồn tại trên hệ thống, hệ thống chặn thao tác và hiển thị lỗi **"Mã số sử dụng CSDL không tồn tại trên hệ thống"**. |
| | | | **TH4: Mã số sử dụng CSDL đang chờ kích hoạt**: Nếu mã số sử dụng CSDL ở trạng thái **"Chờ kích hoạt"**, hệ thống chặn thao tác và hiển thị lỗi **"Mã số sử dụng CSDL đang ở trạng thái chờ kích hoạt. Vui lòng hoàn tất thanh toán để sử dụng"**. |
| | | | **TH5: Mã số sử dụng CSDL bị khóa/ngưng sử dụng/đã sử dụng**: Nếu mã số sử dụng CSDL ở trạng thái **"Khóa"**, **"Ngưng sử dụng"**, hoặc là mã một lần ở trạng thái **"Đã sử dụng"**, hệ thống chặn thao tác và hiển thị lỗi **"Mã số sử dụng CSDL đang bị khóa, ngưng sử dụng hoặc đã hết lượt sử dụng"**. |
| | | | **TH6: Mã số sử dụng CSDL hết hạn**: Nếu mã số sử dụng CSDL ở trạng thái **"Hết hạn"**, hệ thống chặn thao tác và hiển thị lỗi **"Mã số sử dụng CSDL đã hết hạn sử dụng. Vui lòng liên hệ hỗ trợ hoặc thực hiện gia hạn để tiếp tục"**. |
| | | | **TH7: Hợp lệ**: Hệ thống quét trên phạm vi toàn bộ CSDL theo đúng tiêu chí đã tìm kiếm của Tab đang chọn. Nếu tồn tại hồ sơ phù hợp với tiêu chí tìm kiếm, hệ thống hiển thị toàn bộ cây hồ sơ liên quan, bắt đầu từ hồ sơ đăng ký lần đầu đến toàn bộ các hồ sơ thuộc cùng cây hồ sơ đó. Hồ sơ còn hiệu lực là hồ sơ chưa bị **Xóa đăng ký** tại thời điểm tra cứu. Hệ thống ghi nhật ký tra cứu (Audit Log). Nếu **Mã số sử dụng CSDL** là mã sử dụng một lần (`1L-XXXXXX` hoặc `OL-XXXXXX`), ngay sau khi kết quả tra cứu được hiển thị và ghi nhận nhật ký thành công, hệ thống tự động cập nhật trạng thái của mã này thành **`Đã sử dụng`** và ghi nhận lịch sử thời gian sử dụng. Hệ thống hiển thị **Màn hình Chi tiết kết quả tra cứu** dùng chung tại mục [4.1.12.6](#41126-man-hinh-chi-tiet-ket-qua-tra-cuu-dung-chung-sau-khi-bam-tim-kiem). |
| 8 | Nhập lại | Nút | Làm trống toàn bộ dữ liệu đã nhập trên form tìm kiếm của Tab đang chọn và reset về trạng thái mặc định (ngoại trừ mã số sử dụng CSDL nếu được pre-fill từ tài khoản đăng nhập). |

---

#### 4.1.12.3. UC190.MH02 - Màn hình xác nhận biểu phí và thanh toán (Mã thường xuyên)

##### 4.1.12.3.1. Màn hình
\- Hiển thị khi NSD chọn **Cấp mã Thường xuyên** và đã đăng nhập hợp lệ, hoặc sau khi NSD đăng nhập thành công từ luồng yêu cầu cấp mã thường xuyên.<br>
\- Tiêu đề màn hình: **"YÊU CẦU CẤP MÃ SỐ SỬ DỤNG CƠ SỞ DỮ LIỆU THƯỜNG XUYÊN"**.<br>
\- Màn hình hiển thị bảng xác nhận biểu phí dịch vụ cấp mã số sử dụng CSDL thường xuyên trước khi NSD thực hiện thanh toán trực tuyến.<br>
\- Sau khi thanh toán thành công, hệ thống hiển thị màn hình **Thanh toán lệ phí thành công** tại mục [4.1.12.5](#41125-uc190mh04---man-hinh-thanh-toan-le-phi-thanh-cong).<br>

##### 4.1.12.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | Có | "YÊU CẦU CẤP MÃ SỐ SỬ DỤNG CƠ SỞ DỮ LIỆU THƯỜNG XUYÊN" | Hiển thị ở đầu màn hình. |
| Mô tả phụ | Text(500) | Không | "Xác nhận biểu phí dịch vụ cấp mã số sử dụng cơ sở dữ liệu" | Hiển thị ngay dưới tiêu đề màn hình. |
| **I. Bảng xác nhận biểu phí** | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>Hiển thị dịch vụ đăng ký và mức phí trước khi thanh toán. |
| STT | Integer(10) | - | `1` | Số thứ tự dòng dữ liệu. Chỉ đọc. |
| Loại yêu cầu cấp | Enum(String(50)) | - | `Mã tra cứu cơ sở dữ liệu (Thường xuyên)` | Tên dịch vụ yêu cầu cấp. Chỉ đọc. |
| Số lượng | Integer(10) | - | `1` | Số lượng mã đăng ký cấp. Chỉ đọc. |
| Mức phí | Decimal(18,0) | - | `300.000 VNĐ / năm` | Mức phí cấp mã thường xuyên lấy tự động từ cấu hình Biểu phí CSDL. Chỉ đọc. |
| Thao tác trực tuyến | Button | Có | `THANH TOÁN` | Nút thanh toán trực tuyến để NSD thực hiện nộp phí qua Cổng thanh toán. |
| Lưu ý thanh toán | Text(2000) | Không | Theo hệ thống | Hiển thị nội dung: Sau khi thanh toán thành công, mã số thường xuyên sẽ được kích hoạt liên kết với tài khoản. Đồng thời Biên lai thu phí điện tử và mã số sẽ được gửi vào email đăng ký của người dùng. |
| Quay lại | Button | Không | - | Cho phép NSD quay lại màn hình lựa chọn hình thức cấp mã. |

##### 4.1.12.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | THANH TOÁN | Button | Khi click, hệ thống thực hiện khởi tạo yêu cầu cấp mã Thường xuyên và chuyển hướng NSD sang Cổng thanh toán trực tuyến (`UC158`). Chi tiết logic khởi tạo yêu cầu và thanh toán xem tại mục [4.1.12.7](#41127-quy-tac-nghiep-vu-cap-ma-so-su-dung-csdl-va-tich-hop-cong-thanh-toan). Sau khi thanh toán thành công, hệ thống hiển thị màn hình [UC190.MH04 - Màn hình thanh toán lệ phí thành công](#41125-uc190mh04---man-hinh-thanh-toan-le-phi-thanh-cong). |
| 2 | Quay lại | Button | Khi click, hệ thống quay lại màn hình lựa chọn hình thức cấp mã số sử dụng CSDL. |

#### 4.1.12.4. UC190.MH03 - Màn hình Yêu cầu cung cấp mã tra cứu cơ sở dữ liệu (Một lần)

##### 4.1.12.4.1. Màn hình
\- Hiển thị khi người dùng vãng lai click vào liên kết đăng ký cấp mã trên màn hình tra cứu thông tin và lựa chọn hình thức cấp mã "Một lần".<br>
\- Màn hình hiển thị bảng tóm tắt phí cần đóng cho 1 lần cấp mã tra cứu CSDL. Không yêu cầu NSD nhập bất kỳ thông tin cá nhân hay thông tin liên hệ nào khác để tối giản hóa quy trình.<br>

##### 4.1.12.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bảng biểu phí cần nộp** | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>Hiển thị dịch vụ đăng ký và mức phí. |
| Loại yêu cầu cấp | Enum(String(50)) | - | `Mã tra cứu cơ sở dữ liệu` | Tên dịch vụ yêu cầu cấp. Chỉ đọc. |
| Số lượng | Integer(10) | - | `1` | Số lượng mã đăng ký cấp. Chỉ đọc. |
| Mức phí | Decimal(18,0) | - | `10.000` VNĐ | Mức phí cấp 1 lần lấy tự động từ cấu hình Biểu phí CSDL. Chỉ đọc. |
| Ghi chú chân trang | Text(2000) | - | Ghi chú điều khoản Nghị định 99/2022/NĐ-CP | Quy định về việc người yêu cầu tự chịu phí thanh toán không dùng tiền mặt (nếu có). |

##### 4.1.12.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Cấp mã Một lần | Nút | Khi click, hệ thống thực hiện khởi tạo quy trình cấp mã Một lần. Hệ thống tự động chuyển hướng NSD sang Cổng thanh toán trực tuyến (`UC158`). Chi tiết logic khởi tạo yêu cầu và thanh toán xem tại mục [4.1.12.7](#41127-quy-tac-nghiep-vu-cap-ma-so-su-dung-csdl-va-tich-hop-cong-thanh-toan). |
| 2 | Quay lại | Nút | Quay lại màn hình Tra cứu thông tin. |

#### 4.1.12.5. UC190.MH04 - Màn hình thanh toán lệ phí thành công

##### 4.1.12.5.1. Màn hình
\- Hiển thị sau khi NSD thanh toán thành công phí cấp mã số sử dụng CSDL qua Cổng thanh toán trực tuyến (`UC158`) và hệ thống đã kích hoạt mã số sử dụng CSDL tương ứng.<br>
\- Đối với yêu cầu cấp mã thường xuyên: Hệ thống hiển thị mã số sử dụng CSDL thường xuyên vừa sinh/kích hoạt và thông báo mã đã được liên kết với tài khoản đăng nhập.<br>
\- Màn hình có nút **Tra cứu ngay** để NSD quay lại màn hình tra cứu và sử dụng ngay mã số vừa được cấp.<br>

##### 4.1.12.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Trạng thái thanh toán | String(255) | Có | "Thanh toán lệ phí thành công" | Hiển thị kèm icon check màu xanh để xác nhận giao dịch thanh toán thành công. |
| Nội dung thông báo thành công | Text(1000) | Có | Theo loại mã được cấp | Đối với mã thường xuyên, hiển thị nội dung: Yêu cầu cấp mã số sử dụng cơ sở dữ liệu thường xuyên đã được thanh toán và kích hoạt thành công. Dưới đây là mã số CSDL của bạn. |
| Mã số sử dụng CSDL của bạn | String(50) | Có | Theo mã vừa sinh | Hiển thị mã số sử dụng CSDL vừa được sinh và kích hoạt sau thanh toán thành công. Đối với mã thường xuyên, định dạng `TX-XXXXXX`. |
| Thông báo gửi email | Text(1000) | Có | Theo hệ thống | Chỉ hiển thị đối với mã thường xuyên. Thông báo kích hoạt mã số kèm **Biên lai thu phí điện tử đã nộp (đã ký số điện tử)** được gửi thành công đến địa chỉ email đăng ký của NSD. |
| Quay lại trang chủ | Button | Không | - | Cho phép NSD quay lại trang chủ Website Khách hàng. |
| Tra cứu ngay | Button | Có | - | Cho phép NSD quay lại màn hình Tra cứu thông tin và sử dụng ngay mã số vừa được cấp. |

##### 4.1.12.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Quay lại trang chủ | Button | Khi click, hệ thống chuyển NSD về trang chủ Website Khách hàng. |
| 2 | Tra cứu ngay | Button | Khi click, hệ thống chuyển NSD về màn hình Tra cứu thông tin, hiển thị lại Tab tra cứu đang được chọn trước đó hoặc Tab mặc định **Tra cứu theo Số đăng ký** nếu chưa xác định được Tab trước đó. Hệ thống tự động điền sẵn mã số sử dụng CSDL thường xuyên vừa sinh/kích hoạt vào trường **Mã số sử dụng CSDL** để NSD có thể nhập tiêu chí còn lại và thực hiện tra cứu. |

---

#### 4.1.12.6. Màn hình Chi tiết kết quả tra cứu (dùng chung sau khi bấm Tìm kiếm)

##### 4.1.12.6.1. Nguyên tắc hiển thị
\- Màn hình này chỉ hiển thị sau khi người dùng bấm **Tìm kiếm** tại một trong 3 Tab: **Tra cứu theo Số đăng ký**, **Tra cứu theo Bên bảo đảm**, hoặc **Tra cứu theo Số khung**, và hệ thống xử lý tra cứu hợp lệ.<br>
\- Kết quả hiển thị theo phong cách trình bày của phần **VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký** trong tài liệu [SRS yêu cầu cung cấp thông tin.md](SRS%20y%C3%AAu%20c%E1%BA%A7u%20cung%20c%E1%BA%A5p%20th%C3%B4ng%20tin.md#vi-ket-qua-cung-cap-thong-tin-co-xac-nhan-cua-co-quan-dang-ky), bắt đầu từ phần thông tin tiêu chí đã tra cứu, nhưng tiêu đề khối trên màn hình tra cứu trực tuyến là **"TRA CỨU THÔNG TIN"**.<br>
\- Mỗi lần tra cứu chỉ có 01 loại tiêu chí tương ứng với Tab người dùng vừa thao tác. Phần **Tra cứu thông tin** chỉ hiển thị các tiêu chí của Tab đó và **Thời điểm tra cứu**.<br>
\- Kết quả hiển thị toàn bộ cây hồ sơ liên quan nếu tồn tại hồ sơ phù hợp với tiêu chí tìm kiếm. Cây hồ sơ bắt đầu từ hồ sơ đăng ký lần đầu đến toàn bộ các hồ sơ thuộc cùng cây hồ sơ đó. Hồ sơ còn hiệu lực là hồ sơ chưa bị **Xóa đăng ký** tại thời điểm tra cứu.<br>
\- Danh sách hồ sơ trong phần **Chi tiết kết quả tra cứu** được sắp xếp theo **Thời điểm đăng ký tăng dần**.<br>
\- Nếu không có hồ sơ đang có hiệu lực thỏa mãn tiêu chí tra cứu, hệ thống hiển thị dòng thông báo không có dữ liệu ngay trong khu vực kết quả tra cứu, không hiển thị danh sách hồ sơ chi tiết.<br>
\- Từ phần **Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]** trở xuống, hệ thống hiển thị theo cấu trúc chi tiết được mô tả trực tiếp tại mục [4.1.12.6.2](#411262-mo-ta-thong-tin-hien-thi).<br>

##### 4.1.12.6.2. Mô tả thông tin hiển thị

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Tra cứu thông tin** | | | | Tiêu đề khối hiển thị là **"TRA CỨU THÔNG TIN"**, in hoa/in đậm. Khối này echo lại đúng tiêu chí người dùng đã sử dụng để tra cứu và thời điểm hệ thống thực hiện tra cứu. |
| Loại tra cứu | Enum(String(50)) | Có | Theo Tab vừa bấm Tìm kiếm | Chỉ đọc. Xác định theo Tab người dùng thực hiện tra cứu, gồm: **Số đăng ký**, **Bên bảo đảm**, **Số khung**. Không bắt buộc hiển thị thành dòng riêng nếu tiêu đề/tiêu chí bên dưới đã thể hiện rõ loại tra cứu. |
| Số đăng ký | String(50) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Số đăng ký**. Định dạng hiển thị: `Số đăng ký: [Giá trị]`. |
| Bên bảo đảm | String(255) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm** và tiêu chí có nhập tên bên bảo đảm. Định dạng hiển thị: `Bên bảo đảm: [Giá trị]`. |
| Loại chủ thể | Enum(String(50)) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm**. Tham chiếu Danh mục dùng chung - Loại bên bảo đảm (Chủ thể) [DM_06]. |
| Số CMND/Căn cước công dân/Chứng minh quân đội | String(12) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm** và Loại chủ thể là **Công dân Việt Nam**. Định dạng hiển thị: `Số CMND/Căn cước công dân/Chứng minh quân đội: [Giá trị]`. |
| Mã số thuế/Số đăng ký kinh doanh | String(14) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm** và Loại chủ thể là **Tổ chức có đăng ký kinh doanh trong nước**. Định dạng hiển thị: `Mã số thuế/Số đăng ký kinh doanh: [Giá trị]`. |
| Số Hộ chiếu | String(50) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm** và Loại chủ thể là **Người nước ngoài**. Định dạng hiển thị: `Số Hộ chiếu: [Giá trị]`. |
| Mã số thuế/Số giấy phép đầu tư | String(50) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm** và Loại chủ thể là **Tổ chức nước ngoài**. Định dạng hiển thị: `Mã số thuế/Số giấy phép đầu tư: [Giá trị]`. |
| Tên tổ chức | String(255) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm** và Loại chủ thể là **Tổ chức khác**. Định dạng hiển thị: `Tên tổ chức: [Giá trị]`. |
| Số thẻ cư trú | String(50) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Bên bảo đảm** và Loại chủ thể là **Người không quốc tịch cư trú tại Việt Nam**. Định dạng hiển thị: `Số thẻ cư trú: [Giá trị]`. |
| Số khung | String(50) | Tùy điều kiện | Theo tiêu chí nhập | Chỉ hiển thị nếu Loại tra cứu là **Số khung**. Định dạng hiển thị: `Số khung: [Giá trị]`. |
| Thời điểm tra cứu | Datetime | Có | Thời điểm hệ thống xử lý tìm kiếm | Chỉ đọc. Định dạng hiển thị: `dd/mm/yyyy HH:mm`. |
| **II. Chi tiết kết quả tra cứu** | | | | Chỉ hiển thị sau khi hệ thống thực hiện tra cứu hợp lệ. Hiển thị lần lượt danh sách các hồ sơ đang có hiệu lực tại thời điểm tra cứu theo thứ tự thời gian đăng ký tăng dần, đúng tiêu chí tìm kiếm. |
| Dòng kết quả không có dữ liệu | Text(500) | Tùy điều kiện | Theo hệ thống | Chỉ hiển thị khi không tìm thấy hồ sơ đang có hiệu lực thỏa mãn tiêu chí tra cứu. Hiển thị Inline trong khu vực kết quả tra cứu, không hiển thị Toast. |
| Danh sách hồ sơ đăng ký giao dịch bảo đảm/hợp đồng tìm thấy | Text(10000) | Tùy điều kiện | Theo kết quả tra cứu | Chỉ hiển thị khi có kết quả. Từ dòng tiêu đề hồ sơ **"Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]"** trở xuống, hiển thị theo cấu trúc chi tiết tại mục [4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng](#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* |

<a id="cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong"></a>

###### 4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng** | Text(10000) | Tùy điều kiện | Theo dữ liệu nguồn của tính năng gọi | Control UI: Khối hiển thị chỉ đọc. Mỗi hồ sơ hiển thị thành 01 khối riêng theo cấu trúc các thông tin bên dưới. Không cho phép thêm, sửa, xóa hoặc thay đổi dữ liệu tại các màn hình sử dụng cấu trúc dùng chung này.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* |
| Tiêu đề hồ sơ | String(255) | Có | Theo hồ sơ | Chỉ đọc. Định dạng **"Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]"**. |
| Loại hình giao dịch | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị **Biện pháp bảo đảm** hoặc **Hợp đồng**. |
| Loại biện pháp | Enum(String(255)) | Tùy điều kiện | Theo hồ sơ | Chỉ đọc. Chỉ hiển thị khi Loại hình giao dịch là **Biện pháp bảo đảm**; Tham chiếu Danh mục Loại biện pháp bảo đảm [DM_02]. |
| Loại hợp đồng | Enum(String(255)) | Tùy điều kiện | Theo hồ sơ | Chỉ đọc. Chỉ hiển thị khi Loại hình giao dịch là **Hợp đồng**; Tham chiếu Danh mục Loại hợp đồng [DM_03]. |
| Trường hợp đăng ký | Enum(String(255)) | Có | Theo hồ sơ | Chỉ đọc. Tham chiếu Danh mục Loại hình đăng ký [DM_04]. |
| Trạng thái | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị trạng thái xử lý thực tế của hồ sơ theo dữ liệu nguồn của tính năng gọi. |
| Số hợp đồng | String(100) | Tùy điều kiện | Theo hồ sơ | Chỉ đọc. Chỉ hiển thị nếu hồ sơ có kê khai Số hợp đồng. |
| Ngày có hiệu lực của hợp đồng | Date | Tùy điều kiện | Theo hồ sơ | Chỉ đọc. Chỉ hiển thị nếu hồ sơ có kê khai Ngày có hiệu lực của hợp đồng; định dạng `dd/mm/yyyy`. |
| **II. Thông tin người đăng ký** | - | Có | Theo hồ sơ | Chỉ đọc. Hiển thị thông tin người/tổ chức đã thực hiện đăng ký hồ sơ. |
| Họ và tên | String(255) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị họ tên người đăng ký hoặc tên tổ chức/ngân hàng thực hiện đăng ký theo dữ liệu hồ sơ. |
| Địa chỉ | String(500) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị theo quy tắc **Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia**. |
| **III. Thông tin đăng ký** | - | Có | Theo hồ sơ | Chỉ đọc. Hiển thị thông tin số đăng ký và thời điểm của hồ sơ. |
| Số đăng ký | String(50) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị số đăng ký của hồ sơ. |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. Định dạng `dd/mm/yyyy HH:mm`. |
| Thời điểm có hiệu lực | Datetime | Có | Theo hồ sơ | Chỉ đọc. Định dạng `dd/mm/yyyy HH:mm`. |
| **IV. Bên bảo đảm (Tiêu đề động)** | - | Có | Theo hồ sơ | Chỉ đọc. Tự động điều chỉnh theo Loại hình giao dịch là **Biện pháp bảo đảm** hoặc **Hợp đồng**.<br>Nếu Loại hình giao dịch là **Biện pháp bảo đảm** thì hiển thị tương ứng, cụ thể:<br>+ **Thế chấp**: Hiển thị **Bên thế chấp**.<br>+ **Bảo lưu quyền sở hữu**: Hiển thị **Bên mua**.<br>+ **Cầm cố**: Hiển thị **Bên cầm cố**.<br>+ **Đặt cọc**: Hiển thị **Bên đặt cọc**.<br>+ **Ký cược**: Hiển thị **Bên ký cược**.<br>+ **Ký quỹ**: Hiển thị **Bên ký quỹ**.<br>Nếu Loại hình giao dịch là **Hợp đồng** thì hiển thị tương ứng, cụ thể:<br>+ **Hợp đồng cho thuê tài chính**: Hiển thị **Bên thuê tài chính**.<br>+ **Hợp đồng thuê tài sản có thời hạn 1 năm trở lên**: Hiển thị **Bên thuê tài sản**.<br>+ **Hợp đồng chuyển giao đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác**: Hiển thị **Bên chuyển giao quyền**.<br>+ **Hợp đồng ký gửi**: Hiển thị **Bên nhận ký gửi**. |
| Loại chủ thể | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Tham chiếu Danh mục Loại bên bảo đảm (Chủ thể) [DM_06]. |
| Số giấy tờ chứng minh tư cách pháp lý | String(50) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị số giấy tờ tương ứng với Loại chủ thể. |
| Tên | String(255) | Có | Theo hồ sơ | Chỉ đọc. |
| Địa chỉ | String(500) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị theo quy tắc **Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia**. |
| **V. Bên nhận bảo đảm (Tiêu đề động)** | - | Có | Theo hồ sơ | Chỉ đọc. Tự động điều chỉnh theo Loại hình giao dịch là **Biện pháp bảo đảm** hoặc **Hợp đồng**.<br>Nếu Loại hình giao dịch là **Biện pháp bảo đảm** thì hiển thị tương ứng, cụ thể:<br>+ **Thế chấp**: Hiển thị **Bên nhận thế chấp**.<br>+ **Bảo lưu quyền sở hữu**: Hiển thị **Bên bán**.<br>+ **Cầm cố**: Hiển thị **Bên nhận cầm cố**.<br>+ **Đặt cọc**: Hiển thị **Bên nhận đặt cọc**.<br>+ **Ký cược**: Hiển thị **Bên nhận ký cược**.<br>+ **Ký quỹ**: Hiển thị **Bên có quyền trong ký quỹ**.<br>Nếu Loại hình giao dịch là **Hợp đồng** thì hiển thị tương ứng, cụ thể:<br>+ **Hợp đồng cho thuê tài chính**: Hiển thị **Bên cho thuê tài chính**.<br>+ **Hợp đồng thuê tài sản có thời hạn 1 năm trở lên**: Hiển thị **Bên cho thuê tài sản**.<br>+ **Hợp đồng chuyển giao đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác**: Hiển thị **Bên nhận chuyển giao quyền**.<br>+ **Hợp đồng ký gửi**: Hiển thị **Bên ký gửi**. |
| Tên | String(255) | Có | Theo hồ sơ | Chỉ đọc. |
| Địa chỉ | String(500) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị theo quy tắc **Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia**. |
| **VI. Tài sản bảo đảm (Tên động)** | - | Có | Theo hồ sơ | Control UI: Khối hiển thị chỉ đọc.<br>Tự động điều chỉnh theo Loại hình giao dịch là **Biện pháp bảo đảm** hoặc **Hợp đồng**.<br>Nếu Loại hình giao dịch là **Biện pháp bảo đảm** thì hiển thị **Tài sản bảo đảm**.<br>Nếu Loại hình giao dịch là **Hợp đồng** thì hiển thị tương ứng theo Loại hợp đồng, cụ thể:<br>+ **Hợp đồng cho thuê tài chính**: Hiển thị **Tài sản cho thuê tài chính**.<br>+ **Hợp đồng thuê tài sản có thời hạn 1 năm trở lên**: Hiển thị **Tài sản thuê**.<br>+ **Hợp đồng chuyển giao đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác**: Hiển thị **Quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác được chuyển giao**.<br>+ **Hợp đồng ký gửi**: Hiển thị **Hàng hóa ký gửi**.|
| Loại tài sản | Enum(String(50)) | Có | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Hiển thị một hoặc nhiều Loại tài sản đã kê khai trong hồ sơ, lấy theo Danh mục Loại tài sản bảo đảm [DM_07]. Trường hợp hồ sơ có nhiều Loại tài sản, hệ thống hiển thị lần lượt từng Loại tài sản; thông tin chi tiết của từng loại nằm ngay bên dưới Loại tài sản tương ứng, không gom thành một bảng chung. |
| Mô tả | Text(2000) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Chỉ hiển thị ngay bên dưới từng Loại tài sản tương ứng nếu hồ sơ có kê khai nội dung Mô tả cho Loại tài sản đó. Trường hợp hồ sơ có nhiều Loại tài sản có nội dung Mô tả, hệ thống hiển thị riêng từng nội dung Mô tả ngay bên dưới từng Loại tài sản tương ứng. |
| Bảng thông tin Số khung | - | Tùy điều kiện | Theo hồ sơ | Control UI: Bảng/Lưới chỉ đọc.<br>Chỉ hiển thị ngay bên dưới Loại tài sản **Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)** nếu hồ sơ có kê khai loại tài sản này.<br>Tiêu đề bảng là **Số khung**. Bảng hiển thị danh sách phương tiện có số khung theo dữ liệu đã kê khai trong hồ sơ. Không hiển thị checkbox thao tác, icon xóa dòng, nút thêm, nút xóa, nút File mẫu hoặc nút import. Các thông tin hiển thị gồm: **STT**, **Tên phương tiện**, **Nhãn hiệu, màu sơn**, **Số khung**, **Số máy**, **Biển số**. |
| Tên phương tiện | Enum/String(255) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Số khung.<br>Hiển thị tên phương tiện đã kê khai trong hồ sơ. Nếu hệ thống có cấu hình danh mục phương tiện thì hiển thị giá trị đã chọn từ danh mục tương ứng. |
| Nhãn hiệu, màu sơn | String(255) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Số khung.<br>Hiển thị nhãn hiệu, màu sơn của phương tiện theo dữ liệu đã kê khai trong hồ sơ. |
| Số khung | String(50) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Số khung.<br>Hiển thị số khung của phương tiện theo dữ liệu đã kê khai trong hồ sơ. |
| Số máy | String(50) | Không | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Số khung.<br>Hiển thị số máy của phương tiện nếu hồ sơ có kê khai; trường hợp không có dữ liệu thì để trống. |
| Biển số | String(50) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Số khung.<br>Hiển thị biển số của phương tiện nếu hồ sơ có kê khai; trường hợp không có dữ liệu thì để trống. |
| Bảng thông tin Phương tiện | - | Tùy điều kiện | Theo hồ sơ | Control UI: Bảng/Lưới chỉ đọc.<br>Chỉ hiển thị ngay bên dưới Loại tài sản **Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt** nếu hồ sơ có kê khai loại tài sản này.<br>Tiêu đề bảng là **Phương tiện**. Bảng hiển thị danh sách phương tiện theo dữ liệu đã kê khai trong hồ sơ. Không hiển thị checkbox thao tác, icon xóa dòng, nút thêm, nút xóa, nút File mẫu hoặc nút import. Các thông tin hiển thị gồm: **STT**, **Tên phương tiện, nhãn hiệu**, **Tên/Họ tên chủ phương tiện/Chủ sở hữu**, **Số đăng ký**, **Cơ quan cấp giấy chứng nhận**, **Cấp phương tiện**. |
| Tên phương tiện, nhãn hiệu | String(255) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Phương tiện.<br>Hiển thị tên phương tiện, nhãn hiệu theo dữ liệu đã kê khai trong hồ sơ. |
| Tên/Họ tên chủ phương tiện/Chủ sở hữu | String(255) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Phương tiện.<br>Hiển thị tên hoặc họ tên chủ phương tiện/chủ sở hữu theo dữ liệu đã kê khai trong hồ sơ. |
| Số đăng ký | String(50) | Không | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Phương tiện.<br>Hiển thị số đăng ký của phương tiện do cơ quan đăng ký phương tiện cấp nếu hồ sơ có kê khai; trường hợp không có dữ liệu thì để trống. |
| Cơ quan cấp giấy chứng nhận | String(100) | Không | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Phương tiện.<br>Hiển thị cơ quan cấp giấy chứng nhận của phương tiện nếu hồ sơ có kê khai; trường hợp không có dữ liệu thì để trống. |
| Cấp phương tiện | String(100) | Không | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Phương tiện.<br>Hiển thị cấp phương tiện nếu hồ sơ có kê khai; trường hợp không có dữ liệu thì để trống. |
| Tên quyền | String(255) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Chỉ hiển thị ngay bên dưới Loại tài sản **Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản** nếu hồ sơ có kê khai loại tài sản này. Hiển thị tên quyền theo dữ liệu đã kê khai trong hồ sơ. |
| Căn cứ phát sinh quyền | Text(2000) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Chỉ hiển thị ngay bên dưới Loại tài sản **Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản** nếu hồ sơ có kê khai loại tài sản này. Hiển thị căn cứ phát sinh quyền theo dữ liệu đã kê khai trong hồ sơ. |
| Hàng hóa luân chuyển / Kho hàng | Enum(String(50)) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Chỉ hiển thị ngay bên dưới Loại tài sản **Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ** nếu hồ sơ có kê khai loại tài sản này. Hiển thị giá trị hồ sơ đã chọn là **Hàng hóa luân chuyển** hoặc **Kho hàng**. |
| Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Chỉ hiển thị khi hồ sơ kê khai **Hàng hóa luân chuyển** hoặc **Kho hàng**. Hiển thị giá trị hàng hóa hoặc tên, loại hàng hóa theo dữ liệu đã kê khai trong hồ sơ. |
| Địa chỉ kho hàng | String(500) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Chỉ hiển thị khi hồ sơ kê khai là **Kho hàng**. Hiển thị địa chỉ kho hàng theo quy tắc **Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia**. |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | Tùy điều kiện | Theo hồ sơ | Control UI: Label chỉ đọc.<br>Chỉ hiển thị khi hồ sơ kê khai là **Kho hàng**. Hiển thị số hiệu kho hàng hoặc dấu hiệu khác của vị trí kho hàng theo dữ liệu đã kê khai trong hồ sơ. |
| Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam | - | Tùy điều kiện | Theo hồ sơ | Control UI: Bảng/Lưới chỉ đọc.<br>Chỉ hiển thị ngay bên dưới Loại tài sản **Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung** nếu hồ sơ có kê khai loại tài sản này. Bảng hiển thị 01 dòng thông tin thời điểm đăng ký theo dữ liệu đã kê khai trong hồ sơ. Các thông tin hiển thị gồm: **Giờ**, **Phút**, **Ngày**, **Tháng**, **Năm**. |
| Giờ | Integer(10) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam.<br>Hiển thị giờ theo dữ liệu đã kê khai trong hồ sơ. |
| Phút | Integer(10) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam.<br>Hiển thị phút theo dữ liệu đã kê khai trong hồ sơ. |
| Ngày | Date | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam.<br>Hiển thị ngày theo dữ liệu đã kê khai trong hồ sơ. |
| Tháng | Integer(10) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam.<br>Hiển thị tháng theo dữ liệu đã kê khai trong hồ sơ. |
| Năm | Integer(10) | Có | Theo hồ sơ | Control UI: Label chỉ đọc trong Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam.<br>Hiển thị năm theo dữ liệu đã kê khai trong hồ sơ. |

##### 4.1.12.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | Chuyển hướng NSD quay lại đúng Tab đã thực hiện tra cứu trước đó và giữ nguyên các tiêu chí vừa nhập. |
| 2 | Xem | Link / Button | Chỉ hiển thị nếu hệ thống thiết kế thêm thao tác mở chi tiết trên từng hồ sơ trong khu vực **Chi tiết kết quả tra cứu**. Khi click, hệ thống chuyển hướng người dùng sang **Màn hình Phiếu đăng ký - Xem chi tiết dành cho Khách hàng** (Link tới [SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41124-ucps007mh02---man-hinh-phieu-dang-ky---xem-chi-tiet)). |
| 3 | Xuất văn bản kết quả tra cứu điện tử | Nút | - Bước 1: Hệ thống truy xuất dữ liệu chi tiết của tất cả hồ sơ đang hiển thị trong **Chi tiết kết quả tra cứu**.<br>+ Bước 2: Sinh file văn bản kết quả tra cứu chính thức định dạng PDF theo mẫu biểu do Bộ Tư pháp quy định.<br>+ Bước 3: Hệ thống thực hiện ký số tự động lên file PDF bằng chữ ký số chuyên dùng (ký số tổ chức) của Cơ quan đăng ký quốc gia giao dịch bảo đảm.<br>+ Bước 4: Tải tệp PDF đã ký số xuống máy tính cá nhân của người dùng, hiển thị thông báo: "Xuất văn bản kết quả tra cứu thành công". |

---

#### 4.1.12.7. Quy tắc Nghiệp vụ cấp mã số sử dụng CSDL và tích hợp Cổng thanh toán

*Áp dụng chung cho Khối Tab tra cứu tại mục 4.1.12.2.*

##### 4.1.12.7.1. Logic Khởi tạo Yêu cầu cấp mã số sử dụng CSDL
Khi người dùng click chọn **Cấp mã Một lần** hoặc **Cấp mã Thường xuyên**, hệ thống thực hiện khởi tạo đối tượng nghiệp vụ với các thông tin sau:
\- **Mã số yêu cầu (Request ID):** Tự động sinh theo cấu trúc duy nhất: `RQ-YYYYMMDD-XXXX` (trong đó `YYYYMMDD` là ngày hiện tại, `XXXX` là số thứ tự tự tăng trong ngày, khớp 100% với cấu trúc mã yêu cầu hiển thị tại phân hệ Cán bộ).<br>
\- **Loại yêu cầu cấp mã:** `Một lần` hoặc `Thường xuyên` (khớp với cột Loại yêu cầu tại phân hệ Cán bộ).<br>
\- **Tên khách hàng (Tên đối tượng đề nghị):**<br>
  \+ *Nếu là Vãng lai (không đăng nhập, yêu cầu cấp mã Một lần):* Tự động lưu giá trị là `"Vãng lai"`.<br>
  \+ *Nếu Khách hàng đã đăng nhập tài khoản:* Hệ thống tự động lấy theo **[Tên Cá nhân]** (nếu tài khoản liên kết là loại tài khoản cá nhân) hoặc lấy theo **[Tên Tổ chức]** (nếu tài khoản liên kết là loại tài khoản tổ chức).<br>
\- **Email nhận thông tin:** Không bắt buộc đối với loại yêu cầu Một lần; Bắt buộc đối với loại yêu cầu Thường xuyên.<br>
\- **Phương thức thanh toán:** Không bắt buộc, bao gồm các giá trị: `Tất cả` (áp dụng khi tra cứu bộ lọc), `Thanh toán trực tuyến`, `Chuyển khoản ngân hàng`, `Nộp tiền mặt`, và `Miễn phí` (chỉ áp dụng cho nhóm Cơ quan nhà nước).<br>
\- **Mức phí phải nộp (Số tiền):**<br>
  \+ *Một lần:* `10.000 VNĐ` (Cố định).<br>
  \+ *Thường xuyên:* `300.000 VNĐ / năm` (Gửi trước 1/7) hoặc `150.000 VNĐ / năm` (Gửi từ ngày 1/7 trở đi).<br>
\- **Ngày yêu cầu:** Thời điểm khởi tạo yêu cầu (lưu ngày/giờ hiện tại của hệ thống).<br>
\- **Mã số CSDL dự kiến sinh:** Hệ thống tự động sinh ngẫu nhiên mã số sử dụng CSDL theo quy tắc:<br>
  \+ *Đối với Một lần:* Cấu trúc `1L-XXXXXX` (với `XXXXXX` là chuỗi 6 ký tự số ngẫu nhiên).<br>
  \+ *Đối với Thường xuyên:* Cấu trúc `TX-XXXXXX` (với `XXXXXX` là chuỗi 6 ký tự số ngẫu nhiên).<br>
\- **Trạng thái ban đầu của Yêu cầu:** Hệ thống lưu trạng thái là `Đang xử lý` trong cơ sở dữ liệu (tương ứng hiển thị ở phía Cán bộ là `Đang xử lý`, hiển thị phía Khách hàng là `Chờ thanh toán`).<br>
\- **Trạng thái ban đầu của Mã CSDL:** `Chờ kích hoạt` (Chưa được phép thực hiện tra cứu).<br>
\- **Thời gian khởi tạo:** Ngày/giờ hiện tại.<br>

##### 4.1.12.7.2. Logic Lắng nghe và Xử lý phản hồi từ Cổng thanh toán (API IPN/Webhook)
Hệ thống kết nối trực tiếp với Cổng thanh toán trực tuyến (`UC158`) và thực hiện lắng nghe tín hiệu trạng thái thanh toán từ Ngân hàng/Cổng trung gian:
\- **Trường hợp thanh toán THÀNH CÔNG:**<br>
  \+ Cập nhật trạng thái của **Yêu cầu cấp mã** thành `Hoàn thành` (ở cả 2 phía Khách hàng và Cán bộ).<br>
  \+ Cập nhật trạng thái của **Mã số CSDL** tương ứng thành `Hoạt động` (ở cả 2 phía Khách hàng và Cán bộ).<br>
  \+ Thiết lập **Ngày cấp (Ngày kích hoạt)**: Ngày/giờ nhận được phản hồi thanh toán thành công.<br>
  \+ Thiết lập **Ngày hết hạn**:<br>
    \+ *Đối với Một lần:* Ngày kích hoạt + 30 ngày. (Lưu ý: Mã số Một lần sẽ chuyển sang trạng thái `Đã sử dụng` ngay sau khi người dùng thực hiện xong 01 lượt tra cứu thành công, hoặc chuyển sang `Hết hạn` khi vượt quá 30 ngày).<br>
    \+ *Đối với Thường xuyên:* Ngày **31/12 của năm cấp mã số** (theo đúng quy tắc quản lý mã của Cán bộ, chuyển sang `Hết hạn` từ ngày 01/01 năm tiếp theo).<br>
  \+ Đồng bộ liên kết mã truy cập vào tài khoản khách hàng (đối với mã Thường xuyên) để tự động điền trong các phiên làm việc tiếp theo.<br>
  \+ Hệ thống tự động xuất và gửi Biên lai thu phí điện tử (PDF) kèm thông báo Mã truy cập CSDL vào email đăng ký của người dùng.<br>
  \+ Hệ thống hiển thị [UC190.MH04 - Màn hình thanh toán lệ phí thành công](#41125-uc190mh04---man-hinh-thanh-toan-le-phi-thanh-cong). Đối với mã thường xuyên, nếu NSD chọn **Tra cứu ngay**, hệ thống tự động điền sẵn mã số sử dụng CSDL thường xuyên vừa sinh/kích hoạt vào trường **Mã số sử dụng CSDL** trên màn hình Tra cứu thông tin.<br>
\- **Trường hợp thanh toán THẤT BẠI hoặc HỦY GIAO DỊCH:**<br>
  \+ Trạng thái **Yêu cầu cấp mã** giữ nguyên là `Đang xử lý` (hiển thị phía Khách hàng là `Chờ thanh toán`, hiển thị phía Cán bộ là `Đang xử lý`).<br>
  \+ Trạng thái **Mã số CSDL** giữ nguyên là `Chờ kích hoạt`.<br>
  \+ Người dùng có thể bấm thanh toán lại trực tuyến tại [UC190.MH02 - Màn hình xác nhận biểu phí và thanh toán (Mã thường xuyên)](#41123-uc190mh02---man-hinh-xac-nhan-bieu-phi-va-thanh-toan-ma-thuong-xuyen) (Hệ thống sẽ giữ nguyên yêu cầu ở trạng thái `Đang xử lý` cho đến khi thanh toán thành công hoặc nhận được xác nhận dòng tiền từ Cán bộ).<br>

##### 4.1.12.7.3. Quy tắc Đồng nhất với Phân hệ Quản lý cấp mã số CSDL của Cán bộ Đăng ký
Để đảm bảo tính nhất quán dữ liệu trong toàn hệ thống, mọi thông tin khởi tạo từ Website Khách hàng phải đồng bộ trực tiếp với màn hình Quản lý cấp mã số truy cập CSDL của Cán bộ đăng ký tại phân hệ Back-office:
\- **Bảng đối chiếu trường thông tin (Đồng nhất 1:1):**<br>

  | Thông tin Khách hàng (Website Khách) | Thông tin Cán bộ (Website Quản trị) | Kiểu dữ liệu | Ghi chú |
  | :--- | :--- | :--- | :--- |
  | **Mã số yêu cầu** | **Mã yêu cầu** | String(50) | Khớp cấu trúc `RQ-YYYYMMDD-XXXX`. |
  | **Loại yêu cầu** | **Loại yêu cầu** | Enum(String(50)) | `Một lần` hoặc `Thường xuyên`. |
  | **Tên khách hàng yêu cầu** | **Tên đối tượng đề nghị** | String(255) | Tên cá nhân/tổ chức đăng ký cấp mã (Vãng lai hoặc Tên Cá nhân/Tên Tổ chức). |
  | **Email nhận thông tin** | **Email nhận thông tin** | String(255) | Không bắt buộc với Một lần, Bắt buộc với Thường xuyên. |
  | **Mức phí** | **Số tiền** | Decimal(18,0) | Số tiền thu phí đăng ký cấp mã. |
  | **Phương thức thanh toán** | **Phương thức thanh toán** | Enum(String(50)) | Không bắt buộc, gồm: `Tất cả` / `Thanh toán trực tuyến` / `Chuyển khoản ngân hàng` / `Nộp tiền mặt` / `Miễn phí`. |
  | **Ngày yêu cầu** | **Ngày yêu cầu** | Date | Thời điểm khởi tạo yêu cầu. |
  | **Trạng thái** (Khách hàng xem) | **Trạng thái** (Cán bộ xem) | Enum(String(50)) | - Khách hàng xem: `Chờ thanh toán` / `Hoàn thành` / `Bị từ chối`.<br>+ Cán bộ xem: `Đang xử lý` / `Hoàn thành` / `Bị từ chối`. |
  | **Mã số sử dụng CSDL** | **Mã số sử dụng CSDL** | String(50) | Khớp mã dạng `1L-XXXXXX` hoặc `TX-XXXXXX`. |
  | **Trạng thái hoạt động** | **Trạng thái hoạt động** | Enum(String(50)) | Khớp bộ trạng thái đồng nhất: `Chờ kích hoạt` / `Hoạt động` / `Đã sử dụng` / `Hết hạn` / `Ngưng sử dụng` / `Khóa`. |
  | **Ngày kích hoạt** | **Ngày cấp** | Date | Ngày duyệt cấp hoặc thanh toán thành công. |
  | **Ngày hết hạn** | **Ngày hết hạn** | Date | Hạn dùng cuối cùng của mã số CSDL. |

\- **Cơ chế kích hoạt thủ công (Manual Override) của Cán bộ:**<br>
  \+ Cán bộ đăng ký có chức năng **Phê duyệt kích hoạt** trên trang Quản lý. Khi cán bộ kiểm tra tài khoản ngân hàng chuyên thu thấy khớp đúng dòng tiền chuyển khoản thủ công có nội dung `"Nop phi cap ma CSDL [Số thông báo phí]"`, cán bộ click phê duyệt thủ công.<br>
  \+ Sau khi cán bộ click phê duyệt: Trạng thái Yêu cầu chuyển thành `Hoàn thành`, trạng thái Mã CSDL chuyển thành `Hoạt động` tương tự như cơ chế tự động từ cổng thanh toán trực tuyến.<br>
