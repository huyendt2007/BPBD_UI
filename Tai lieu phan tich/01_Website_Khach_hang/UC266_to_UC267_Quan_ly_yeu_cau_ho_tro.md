### 4.1.19. UC266-UC267 - Quản lý yêu cầu hỗ trợ về ĐBPBĐ/BTNN

#### 4.1.19.1. Mục đích
- Cho phép Người sử dụng (NSD) là Khách hàng (Cá nhân, Tổ chức) gửi yêu cầu hỗ trợ trực tuyến, lựa chọn đúng Cơ quan tiếp nhận xử lý (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước, hoặc 1 trong 3 Trung tâm đăng ký giao dịch, tài sản).
- Cho phép Người sử dụng (NSD) là Khách hàng (Cá nhân, Tổ chức) đã đăng nhập hệ thống thực hiện tra cứu, tìm kiếm, lọc và theo dõi danh sách, trạng thái và chi tiết phản hồi của toàn bộ các yêu cầu hỗ trợ đã gửi trên một danh sách thống nhất (không phân tách theo lĩnh vực nghiệp vụ trên giao diện).
- Cho phép Khách hàng thực hiện kết xuất danh sách yêu cầu ra file Excel phục vụ lưu trữ, đối chiếu.
- Cho phép Khách hàng xem chi tiết lịch sử phản hồi (chuỗi các câu trả lời của cán bộ theo trình tự thời gian) và thực hiện đánh giá mức độ hài lòng đối với câu trả lời nhận được (Hài lòng/Không hài lòng).
- Cho phép Khách hàng thực hiện cập nhật lại thông tin đối với các yêu cầu bị yêu cầu bổ sung làm rõ (trạng thái "Yêu cầu làm rõ").

*a. Phân quyền*
- Khách hàng (Cá nhân, Tổ chức) đã đăng nhập hệ thống: được phép Tạo, Theo dõi, Xem chi tiết, Đánh giá và Cập nhật yêu cầu hỗ trợ.
- Khách vãng lai (chưa đăng nhập): chỉ được phép Tạo yêu cầu hỗ trợ mới, không có quyền tra cứu/theo dõi danh sách yêu cầu đã gửi.

*b. Điều kiện thực hiện*
- Người dùng đã truy cập thành công vào hệ thống. Đăng nhập là bắt buộc đối với các chức năng Theo dõi, Xem chi tiết, Đánh giá và Cập nhật; không bắt buộc đối với chức năng Tạo yêu cầu hỗ trợ.

---

#### 4.1.19.2. UC267.MH01 - Màn hình Theo dõi yêu cầu hỗ trợ

##### 4.1.19.2.1. Màn hình
- Giao diện gồm một danh sách thống nhất (không chia Tab theo lĩnh vực nghiệp vụ), tích hợp bộ lọc tìm kiếm ở phía trên và bảng dữ liệu hiển thị toàn bộ các yêu cầu hỗ trợ đã gửi ở phía dưới (với các nút thao tác xếp dọc đứng thẳng hàng), kèm chức năng kết xuất Excel.
- Tích hợp nút **[TẠO YÊU CẦU HỖ TRỢ]** phía trên bảng danh sách. Khi NSD nhấn nút này, hệ thống mở màn hình Tạo yêu cầu hỗ trợ (`UC266.MH01`).
- Tiêu đề chính: **THEO DÕI YÊU CẦU HỖ TRỢ**.
- Biểu đồ minh họa màn hình:
![Màn hình Theo dõi yêu cầu hỗ trợ](images/UC267_MH01.png)

##### 4.1.19.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ ngày | Date | Không | Trống | - Nhập hoặc chọn ngày bắt đầu lọc theo ngày tạo yêu cầu. |
| Đến ngày | Date | Không | Ngày hiện tại | - Nhập hoặc chọn ngày kết thúc lọc theo ngày tạo yêu cầu. |
| Mức độ ưu tiên | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Lọc theo mức độ ưu tiên của yêu cầu: **Tất cả**, **Thấp**, **Trung bình**, **Cao**. |
| Trạng thái | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Lọc theo trạng thái xử lý yêu cầu: **Tất cả**, **Chờ tiếp nhận**, **Đang xử lý**, **Yêu cầu làm rõ**, **Hoàn thành**. |
| Từ khóa tìm kiếm | String(255) | Không | Trống | - Nhập từ khóa tìm kiếm theo Tiêu đề hoặc Nội dung của yêu cầu hỗ trợ. |
| **II. Bảng danh sách kết quả** | | | |<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*|
| STT | Integer(5) | Có | Số thứ tự tăng dần | - Số thứ tự dòng trên bảng kết quả. |
| Tiêu đề | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Tiêu đề ngắn gọn của yêu cầu hỗ trợ. Gắn kèm biểu tượng ghim giấy `📎` nếu yêu cầu có file đính kèm. |
| Nội dung | Text(2000) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị tối đa **100 ký tự đầu tiên** của nội dung yêu cầu, nếu dài hơn thì hiển thị kèm dấu ba chấm "...". |
| Nội dung phản hồi | Text(2000) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị tối đa **100 ký tự đầu tiên** của phản hồi mới nhất từ phía cán bộ xử lý, kèm dấu ba chấm "..." nếu dài hơn. |
| Mức độ ưu tiên | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Tag màu: **Thấp** (Xanh lá), **Trung bình** (Vàng/Cam), **Cao** (Đỏ). |
| Trạng thái | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Tag màu: **Chờ tiếp nhận** (Xanh lam nhạt), **Đang xử lý** (Cam/Hổ phách), **Yêu cầu làm rõ** (Tím), **Hoàn thành** (Xanh lục đậm). |
| Ngày tạo | Date | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Ngày giờ gửi yêu cầu hỗ trợ. Định dạng: `DD/MM/YYYY hh:mm`. |
| Đánh giá | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị kết quả đánh giá dưới dạng nhãn (Pill Badge) bo tròn kèm icon và màu sắc tương ứng:<br>+ **Hài lòng**: Nhãn màu xanh lá nhạt, viền xanh nhạt, chữ xanh đậm kèm biểu tượng thumbs-up (`fa-solid fa-thumbs-up`).<br>+ **Không hài lòng**: Nhãn màu đỏ nhạt, viền đỏ nhạt, chữ đỏ đậm kèm biểu tượng thumbs-down (`fa-solid fa-thumbs-down`).<br>+ **Ý kiến khác**: Nhãn màu xám nhạt, viền xám nhạt, chữ xám đậm kèm biểu tượng info tròn (`fa-solid fa-circle-info`).<br>+ Mặc định để trống (hiển thị dấu `-`) nếu chưa đánh giá. |
| Thao tác | - | Không | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Cột Thao tác (rộng 120px) chứa các nút xếp ngang cố định để tránh xê dịch giao diện, gồm:<br>+ **Xem**: Xem chi tiết yêu cầu hỗ trợ.<br>+ **Đánh giá**: Chỉ hiển thị đối với bản ghi có trạng thái **Hoàn thành** và chưa thực hiện đánh giá. Khi click vào sẽ hiển thị menu lựa chọn gồm 3 mức: **[Hài lòng]**, **[Không hài lòng]**, **[Ý kiến khác]**.<br>+ **Cập nhật**: Chỉ hiển thị ở trạng thái **Yêu cầu làm rõ**.<br>+ Các nút thao tác không khả dụng ở dòng tương ứng sẽ được hiển thị mờ ẩn (disabled) với độ mờ 0.35, chặn sự kiện click. |

##### 4.1.19.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | TÌM KIẾM | Nút bấm | - **Thao tác:** Người dùng bấm nút **[TÌM KIẾM]**.<br>- **Xử lý:** Kiểm tra nếu *Từ ngày* > *Đến ngày*, hiển thị cảnh báo: *"Từ ngày không được lớn hơn Đến ngày"* và chặn tìm kiếm. Nếu hợp lệ, hệ thống truy vấn CSDL theo các điều kiện lọc (ngày tạo, mức độ ưu tiên, trạng thái, từ khóa) và tải lại bảng.<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*; các nút điều hướng trang (&#124;&lt;&lt;, &lt;, các số trang, &gt;, &gt;&gt;&#124;) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.|
| 2 | KẾT XUẤT (EXCEL) | Nút bấm | - **Thao tác:** Người dùng bấm nút **[KẾT XUẤT]**.<br>- **Xử lý:** Xuất toàn bộ danh sách đang hiển thị ra tệp Excel (.xlsx) với các thông tin tương ứng, đặt tên mặc định: `Danh_sach_Yeu_cau_Ho_tro_[YYYYMMDD].xlsx`. |
| 3 | TẠO YÊU CẦU HỖ TRỢ | Nút bấm | - **Thao tác:** NSD click chọn **[TẠO YÊU CẦU HỖ TRỢ]**.<br>- **Xử lý:** Chuyển hướng sang Màn hình Tạo yêu cầu hỗ trợ tại mục [4.1.19.3](#41193-uc266mh01---man-hinh-tao-yeu-cau-ho-tro), tự động điền thông tin người tạo/email nếu đã đăng nhập (Chỉ đọc); nếu là khách vãng lai thì để trống cho phép nhập tay. |
| 4 | Xem | Nút bấm | - **Điều kiện hiển thị:** Luôn hiển thị cố định trên tất cả dòng bản ghi.<br>- **Thao tác:** Khách hàng click nút **[Xem]** trên dòng bản ghi hoặc click đúp vào dòng bản ghi.<br>- **Xử lý:** Chuyển hướng sang Màn hình Xem chi tiết yêu cầu hỗ trợ (`UC267.MH02`). |
| 5 | Đánh giá | Dropdown Button | - **Điều kiện hiển thị:** Chỉ ở trạng thái **Hoàn thành** và chưa thực hiện đánh giá.<br>- **Thao tác:** Nhấn nút Đánh giá (biểu tượng hình sao vàng) để mở menu lựa chọn ngay tại dòng dữ liệu (Dropdown inline, không mở Modal ngay từ bước này):<br>+ **Xử lý [Hài lòng]:** Hệ thống hiển thị hộp thoại xác nhận của trình duyệt (Confirm Dialog) yêu cầu xác nhận trước khi lưu; nếu NSD xác nhận, hệ thống lưu đánh giá vào cơ sở dữ liệu, hiển thị Badge Đánh giá **Hài lòng** (màu xanh lá) tại dòng tương ứng và hiển thị thông báo toast: *"Gửi đánh giá thành công."*; nếu NSD hủy hộp thoại xác nhận, không thực hiện gì thêm.<br>+ **Xử lý [Không hài lòng] & [Ý kiến khác]:** Mở Modal/Popup yêu cầu người dùng nhập lý do hoặc góp ý thêm.<br>+ **Quy chuẩn Modal Đánh giá nhanh (Quick Rating Modal):**<br>+ Khi chọn *Không hài lòng*: Tiêu đề Modal là *"Đánh giá câu trả lời - Không hài lòng"*, nhãn yêu cầu: *"Ý kiến đóng góp / Lý do không hài lòng"*, bắt buộc nhập lý do.<br>+ Khi chọn *Ý kiến khác*: Tiêu đề Modal là *"Đánh giá câu trả lời - Ý kiến khác"*, nhãn yêu cầu: *"Nội dung ý kiến khác"*, bắt buộc nhập ý kiến.<br>+ Nhập xong bấm **[GỬI ĐÁNH GIÁ]**: Hệ thống kiểm tra nếu trống thì báo lỗi bắt buộc nhập. Nếu hợp lệ, hệ thống cập nhật kết quả đánh giá tương ứng cùng nội dung đóng góp vào CSDL, đóng Modal, hiển thị Badge đánh giá tại dòng và hiển thị thông báo toast thành công. |
| 6 | Cập nhật | Nút bấm | - **Điều kiện hiển thị:** Chỉ hiển thị đối với bản ghi ở trạng thái **Yêu cầu làm rõ**.<br>- **Thao tác:** Khách hàng click nút **[Cập nhật]** màu xanh lục.<br>- **Xử lý:** Chuyển hướng người dùng sang Màn hình Cập nhật yêu cầu hỗ trợ (`UC267.MH03`). |

---

#### 4.1.19.3. UC266.MH01 - Màn hình Tạo yêu cầu hỗ trợ

##### 4.1.19.3.1. Màn hình
- Giao diện gồm biểu mẫu (form) cho phép NSD soạn thảo và gửi yêu cầu hỗ trợ đến cơ quan tiếp nhận xử lý.
- Tiêu đề chính: **TẠO YÊU CẦU HỖ TRỢ NGHIỆP VỤ**.
- Biểu đồ minh họa màn hình:
![Màn hình Tạo yêu cầu hỗ trợ](images/UC266_MH01.png)

##### 4.1.19.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Người yêu cầu | String(200) | Có | Lấy từ thông tin đăng nhập | - Điền tên cá nhân hoặc tên tổ chức đang đăng nhập.<br>- Quy tắc xử lý:<br>+ **Đối với Người dùng đã đăng nhập**: Tự động lấy tên cá nhân/tên tổ chức từ thông tin đăng nhập hiện tại, hiển thị dạng Chỉ đọc (Read-only/Disabled) và không được phép sửa đổi.<br>+ **Đối với Khách hàng vãng lai (Chưa đăng nhập)**: Trường này để trống, cho phép nhập thủ công họ tên người cần hỗ trợ. |
| Email | String(200) | Có | Lấy từ thông tin đăng nhập | - Điền địa chỉ email liên hệ.<br>- Quy tắc xử lý:<br>+ **Đối với Người dùng đã đăng nhập**: Tự động lấy địa chỉ email từ tài khoản đăng nhập hiện tại, hiển thị dạng Chỉ đọc (Read-only/Disabled) và không được phép sửa đổi.<br>+ **Đối với Khách hàng vãng lai (Chưa đăng nhập)**: Trường này để trống, cho phép nhập thủ công địa chỉ email liên hệ để nhận phản hồi. |
| Mức độ ưu tiên | Enum(String(50)) | Có | "Thấp" | Control UI: Hộp chọn.<br>- Chọn mức độ khẩn cấp của yêu cầu hỗ trợ:<br>+ **Thấp**<br>+ **Trung bình**<br>+ **Cao** |
| Cơ quan tiếp nhận | Enum(String(255)) | Có | Trống ("Chọn cơ quan tiếp nhận...") | Control UI: Hộp chọn.<br>- Chọn cơ quan/đơn vị tiếp nhận xử lý yêu cầu hỗ trợ. Gồm các giá trị:<br>+ Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước<br>+ Trung tâm đăng ký giao dịch, tài sản tại TP Hà Nội<br>+ Trung tâm đăng ký giao dịch, tài sản tại TP Hồ Chí Minh<br>+ Trung tâm đăng ký giao dịch, tài sản tại TP Đà Nẵng |
| Tiêu đề | String(200) | Có | Trống | - Nhập tiêu đề tóm tắt ngắn gọn nội dung cần hỗ trợ. |
| Nội dung | String(2000) | Có | Trống | - Nhập chi tiết nội dung sự việc, câu hỏi hoặc vấn đề cần hỗ trợ giải đáp. |
| File đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Cho phép đính kèm các tài liệu, hình ảnh, file chứng minh hoặc mô tả lỗi.<br>- Quy tắc kỹ thuật:<br>+ Số lượng tệp đính kèm: Tối đa **3 tệp tin** trong một yêu cầu.<br>+ Dung lượng mỗi tệp tin: Tối đa **20MB/tệp**.<br>+ Các định dạng tệp tin được phép tải lên: `.pdf`, `.jpg`, `.jpeg`, `.png`.<br>+ Quy cách hiển thị giao diện:<br>+ Sử dụng bộ chọn tệp đã được Việt hóa (hiển thị nhãn **[Chọn tệp]** và dòng trạng thái **"Chưa có tệp nào được chọn"** hoặc **"Đã chọn X tệp"**).<br>+ Danh sách tệp đính kèm đã chọn hiển thị phía dưới, mỗi tệp hiển thị biểu tượng kẹp giấy, tên tệp tin và hai liên kết **"Xem file"** và **"Xóa"** nằm liền kề bên phải trên cùng một dòng.<br>+ Nếu tên tệp tin quá dài, hệ thống tự động thu gọn ở giữa hoặc cuối tên dạng dấu ba chấm (`...`) để đảm bảo tên tệp và các liên kết hành động luôn nằm trên cùng một dòng. |

##### 4.1.19.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | GỬI YÊU CẦU | Nút bấm | - Thao tác: Người dùng bấm nút **[GỬI YÊU CẦU]**. |
| | | | - TH1 (Bỏ trống trường bắt buộc): Hệ thống kiểm tra các trường bắt buộc nhập gồm: Người yêu cầu (nếu là khách vãng lai), Email (nếu là khách vãng lai), Cơ quan tiếp nhận, Tiêu đề, Nội dung.<br>\- Nếu phát hiện trường nào bị bỏ trống, hiển thị cảnh báo đỏ dưới trường tương ứng: *"Trường này bắt buộc nhập"* (riêng trường Cơ quan tiếp nhận: *"Trường này bắt buộc chọn"*).<br>\- Focus và highlight viền đỏ ô lỗi. Chặn không cho gửi. (Người yêu cầu/Email đối với thành viên đã đăng nhập đã được tự động điền sẵn và khóa nên không thể bỏ trống). |
| | | | - TH1.1 (Sai định dạng Email): Hệ thống kiểm tra đối với Khách vãng lai, nếu địa chỉ email nhập vào không đúng định dạng chuẩn, hiển thị cảnh báo đỏ dưới trường Email: *"Định dạng email không hợp lệ"*. Chặn không cho gửi. |
| | | | - TH2 (Sai định dạng file đính kèm): Hệ thống kiểm tra nếu có tệp đính kèm tải lên không đúng định dạng.<br>\- Định dạng tệp tin đính kèm hợp lệ: `.pdf`, `.jpg`, `.jpeg`, `.png`.<br>\- Nếu phát hiện có tệp tin tải lên có đuôi mở rộng sai định dạng, hiển thị thông báo lỗi: *"Định dạng tệp tin [Tên tệp] không hợp lệ. Chỉ chấp nhận các định dạng .pdf, .jpg, .jpeg, .png."*.<br>\- Focus và highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH3 (Vượt quá dung lượng / số lượng / độ dài): Hệ thống kiểm tra ràng buộc về kích thước và số lượng dữ liệu đầu vào:<br>  \+ Tiêu đề vượt quá độ dài: Nếu độ dài ký tự nhập vào Tiêu đề > 200 ký tự, hiển thị thông báo lỗi: *"Tiêu đề không được vượt quá 200 ký tự."*<br>  \+ Nội dung vượt quá độ dài: Nếu độ dài ký tự nhập vào Nội dung > 2000 ký tự, hiển thị thông báo lỗi: *"Nội dung yêu cầu không được vượt quá 2000 ký tự."*<br>  \+ Vượt dung lượng tệp tin: Nếu có tệp đính kèm dung lượng > 20MB, hiển thị thông báo lỗi: *"Dung lượng tệp tin [Tên tệp] vượt quá 20MB. Vui lòng kiểm tra lại."*<br>  \+ Vượt quá số lượng tệp tin: Nếu số lượng tệp tải lên > 3 tệp, hiển thị thông báo lỗi: *"Hệ thống chỉ hỗ trợ đính kèm tối đa 3 tệp tin."*<br>  \+ Focus và highlight viền đỏ ô lỗi tương ứng. Chặn không cho gửi. |
| | | | - TH4 (Trùng lặp yêu cầu): Hệ thống kiểm tra nếu phát hiện trong cơ sở dữ liệu đã có yêu cầu hỗ trợ của cùng một người dùng (NSD) có trạng thái "Chờ tiếp nhận" hoặc "Đang xử lý" và có cùng Tiêu đề trong ngày hiện tại.<br>\- Nếu trùng, hiển thị cảnh báo dưới trường Tiêu đề: *"Yêu cầu hỗ trợ với tiêu đề này đang được tiếp nhận xử lý. Vui lòng không gửi yêu cầu trùng lặp."*<br>\- Focus và highlight viền đỏ ô Tiêu đề. Chặn không cho gửi. |
| | | | - TH Hợp lệ (Xử lý gửi thành công): Nếu tất cả thông tin hợp lệ, hệ thống thực hiện:<br>  \+ Lưu thông tin yêu cầu hỗ trợ vào Cơ sở dữ liệu ở trạng thái: **Chờ tiếp nhận**.<br>  \+ Tự động sinh **Mã yêu cầu hỗ trợ** mới theo quy tắc: `HT-[YYYYMMDD]-[TỰ_TĂNG_6_SỐ]`. Ví dụ: `HT-20260601-000049`.<br>  \+ Gửi email thông báo tự động xác nhận tiếp nhận yêu cầu hỗ trợ về địa chỉ email của người tạo yêu cầu theo [Mẫu Email Tiếp nhận yêu cầu hỗ trợ](../04_Danh_muc_va_Phu_luc.md#email-tiep-nhan-yc-ho-tro).<br>  \+ Chuyển hướng người dùng sang Màn hình Kết quả tiếp nhận yêu cầu hỗ trợ tại mục [4.1.19.4](#41194-uc266mh02---man-hinh-ket-qua-tiep-nhan-yeu-cau-ho-tro). |
| 2 | HỦY | Nút bấm | - **Thao tác:** Người dùng bấm nút **[HỦY]**.<br>- **Xử lý:** Quay lại trang chủ hoặc danh sách giao dịch cũ, không lưu thông tin vừa nhập. |

---

#### 4.1.19.4. UC266.MH02 - Màn hình Kết quả tiếp nhận yêu cầu hỗ trợ

##### 4.1.19.4.1. Màn hình
- Giao diện hiển thị thông báo gửi thành công và hiển thị các thông tin xác nhận.
- Tiêu đề chính: **KẾT QUẢ GỬI YÊU CẦU HỖ TRỢ**.

##### 4.1.19.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| Thông điệp thông báo | String(255) | Control UI: Hiển thị/Read-only.<br>- Hiển thị: "Yêu cầu hỗ trợ của bạn đã được gửi thành công đến cơ quan quản lý. Hệ thống đã gửi email xác nhận kèm thông tin chi tiết. Trân trọng!" |
| Mã yêu cầu hỗ trợ | String(50) | Control UI: Hiển thị/Read-only.<br>- Hiển thị mã số yêu cầu vừa được sinh ra (Ví dụ: `HT-20260601-000049`) dạng chữ nổi bật (bold). |
| Trở lại trang chủ | - | Control UI: Nút bấm.<br>- NSD click để quay trở lại Màn hình trang chủ của khách hàng. |

---

#### 4.1.19.5. UC267.MH02 - Màn hình Xem chi tiết yêu cầu hỗ trợ

##### 4.1.19.5.1. Màn hình
- Giao diện hiển thị chi tiết toàn bộ thông tin yêu cầu hỗ trợ của khách hàng và lịch sử các phản hồi, giải đáp theo trình tự thời gian từ phía cán bộ nghiệp vụ.
- Đối với yêu cầu ở trạng thái **Yêu cầu làm rõ**: Giao diện hiển thị thông tin yêu cầu gốc, các tệp đính kèm gốc của khách hàng, và đầy đủ chuỗi các phản hồi làm rõ từ phía Cán bộ. Phía dưới cùng của màn hình **chỉ có duy nhất nút [Quay lại]** để quay về màn hình danh sách theo dõi (không hiển thị biểu mẫu đánh giá).
- Tiêu đề chính: **CHI TIẾT YÊU CẦU HỖ TRỢ**.
- Biểu đồ minh họa màn hình:
  ![Màn hình Xem chi tiết yêu cầu hỗ trợ](images/UC267_MH02.png)

##### 4.1.19.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| **I. Thông tin Yêu cầu hỗ trợ (Read-only)** | | | |
| Mã yêu cầu hỗ trợ | String(50) | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Mã số yêu cầu hỗ trợ duy nhất. |
| Ngày tạo | Date | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Ngày giờ gửi yêu cầu hỗ trợ. Định dạng `DD/MM/YYYY hh:mm`. |
| Loại yêu cầu hỗ trợ | Enum(String(50)) | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị theo dữ liệu hệ thống ghi nhận tại thời điểm tạo yêu cầu (Biện pháp bảo đảm/Bồi thường nhà nước). Không có control chỉnh sửa; chỉ hiển thị tham khảo tại màn Chi tiết. |
| Mức độ ưu tiên | Enum(String(50)) | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Thấp, Trung bình hoặc Cao. |
| Trạng thái | Enum(String(50)) | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Trạng thái hiện tại: Chờ tiếp nhận / Đang xử lý / Yêu cầu làm rõ / Hoàn thành. |
| Tiêu đề | String(255) | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Nội dung tiêu đề của yêu cầu hỗ trợ. Ghi nhận kèm file đính kèm gốc của khách hàng. |
| Nội dung yêu cầu | Text(2000) | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị đầy đủ nội dung chi tiết yêu cầu hỗ trợ gốc của khách hàng. |
| File đính kèm | File | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Danh sách các tệp đính kèm gốc của yêu cầu (nếu có). Click để tải về. |
| **II. Lịch sử phản hồi từ Cán bộ (Chỉ hiển thị khi Trạng thái khác Chờ tiếp nhận)** | | | |
| Danh sách phản hồi nhiều vòng | String(255) | Lấy từ hệ thống | - Trường hợp phát sinh nhiều vòng trao đổi (Cán bộ gửi yêu cầu bổ sung thông tin -> Khách hàng cập nhật -> Cán bộ tiếp tục xử lý và trả lời), hệ thống hiển thị toàn bộ lịch sử này dưới dạng **một danh sách tuần tự (List of Boxes) theo trình tự thời gian tăng dần** (Lần phản hồi #1, Lần phản hồi #2...).<br>- Mỗi hộp phản hồi hiển thị chi tiết:<br>+ Thông tin Cán bộ phản hồi (Họ tên + Phòng ban)<br>+ Thời gian cán bộ gửi phản hồi (`DD/MM/YYYY hh:mm`) và số thứ tự lần phản hồi (Lần phản hồi #1, Lần phản hồi #2...)<br>+ Nội dung chi tiết câu trả lời / yêu cầu bổ sung làm rõ của lần đó.<br>+ Tải về các file đính kèm phản hồi từ cán bộ trong lần đó (nếu có). |
| **III. Đánh giá câu trả lời (Chỉ hiển thị khi Trạng thái là Hoàn thành)** | | | |
| Mức độ hài lòng | - | Trống | Control UI: Nút bấm.<br>- Cho phép người dùng đánh giá mức độ hài lòng: **Hài lòng**, **Không hài lòng** hoặc **Ý kiến khác**. Chỉ đọc (Read-only) nếu đã đánh giá. |
| Ý kiến đóng góp / Lý do | Text(2000) | Trống | Control UI: Textarea.<br>- Bắt buộc nhập nếu NSD chọn "Không hài lòng" hoặc "Ý kiến khác". Chỉ đọc (Read-only) nếu đã đánh giá.<br>- Quy tắc hiển thị nhãn và placeholder động:<br>+ Nếu chọn **Không hài lòng**: Nhãn là *"Ý kiến đóng góp / Lý do không hài lòng"*, placeholder: *"Vui lòng nhập lý do/ý kiến đóng góp khi đánh giá Không hài lòng..."*.<br>+ Nếu chọn **Ý kiến khác**: Nhãn là *"Nội dung ý kiến khác"*, placeholder: *"Vui lòng nhập nội dung ý kiến đóng góp khác..."*. |

##### 4.1.19.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | GỬI ĐÁNH GIÁ | Nút bấm | - **Điều kiện hiển thị:** Chỉ hiển thị khi trạng thái là **Hoàn thành** và chưa từng đánh giá trước đó.<br>- **Thao tác:** Người dùng chọn mức độ hài lòng (Hài lòng, Không hài lòng hoặc Ý kiến khác), nhập ý kiến đóng góp (nếu chọn Không hài lòng hoặc Ý kiến khác) và bấm **[GỬI ĐÁNH GIÁ]**.<br>- **Kiểm tra nghiệp vụ (Validation Rules):**<br>+ **TH1 (Bỏ trống ý kiến đóng góp khi Không hài lòng hoặc Ý kiến khác):** Nếu chọn "Không hài lòng" hoặc "Ý kiến khác" và để trống trường "Ý kiến đóng góp / Lý do", hệ thống hiển thị cảnh báo lỗi màu đỏ dưới trường nhập liệu tương ứng: *"Vui lòng nhập lý do/ý kiến đóng góp khi đánh giá Không hài lòng."* hoặc *"Vui lòng nhập nội dung ý kiến đóng góp khác."*, highlight viền đỏ ô nhập và chặn không cho gửi.<br>+ **Xử lý hợp lệ:** Lưu kết quả đánh giá, ẩn khối form đánh giá, hiển thị nhãn kết quả đánh giá trực tiếp trên màn chi tiết dưới dạng Badge có màu sắc và icon đi kèm, đồng thời cập nhật trạng thái ra bảng ngoài danh sách. |
| 2 | QUAY LẠI | Nút bấm | - **Thao tác:** Người dùng bấm nút **[QUAY LẠI]**.<br>- **Xử lý:** Chuyển hướng người dùng quay trở lại Màn hình Danh sách theo dõi yêu cầu hỗ trợ (`UC267.MH01`). |

---

#### 4.1.19.6. UC267.MH03 - Màn hình Cập nhật yêu cầu hỗ trợ

##### 4.1.19.6.1. Màn hình
- Giao diện gồm biểu mẫu (form) cho phép khách hàng chỉnh sửa và cập nhật lại thông tin đối với yêu cầu đang bị cán bộ yêu cầu bổ sung làm rõ (trạng thái "Yêu cầu làm rõ").
- Màn hình bao gồm hai nút bấm chính ở phía dưới: **[Cập nhật]** và **[Quay lại]**.
- Màn hình hiển thị đầy đủ thông tin yêu cầu, file đính kèm gốc của khách hàng, kèm theo **đầy đủ Lịch sử phản hồi từ Cán bộ qua từng lần trao đổi** để người dùng tiện đối chiếu, bổ sung thông tin cần thiết.
- Tiêu đề chính: **CẬP NHẬT YÊU CẦU HỖ TRỢ**.

##### 4.1.19.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Lịch sử phản hồi từ Cán bộ | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị đầy đủ lịch sử các phản hồi, yêu cầu bổ sung làm rõ thông tin từ cán bộ qua từng lần trao đổi (Lần 1, Lần 2...) kèm các file đính kèm của cán bộ nếu có. (Giống với Phần Danh sách phản hồi nhiều vòng tại mục [4.1.19.5](#41195-uc267mh02---man-hinh-xem-chi-tiet-yeu-cau-ho-tro) - Màn hình Xem chi tiết yêu cầu hỗ trợ). |
| Mức độ ưu tiên | Enum(String(50)) | Có | Lấy từ yêu cầu gốc | Control UI: Hộp chọn.<br>- Cho phép chỉnh sửa lại mức độ khẩn cấp: **Thấp**, **Trung bình**, **Cao**. |
| Tiêu đề | String(200) | Có | Lấy từ yêu cầu gốc | - Cho phép chỉnh sửa lại tiêu đề yêu cầu hỗ trợ. |
| Nội dung | String(2000) | Có | Lấy từ yêu cầu gốc | - Cho phép chỉnh sửa, viết lại nội dung cần hỗ trợ chi tiết hoặc bổ sung các thông tin cán bộ đã yêu cầu làm rõ ở lần phản hồi trước. |
| File đính kèm | File | Không | Danh sách tệp tin cũ | Control UI: Upload file.<br>- Hiển thị danh sách tệp đính kèm cũ của khách hàng kèm nút Xóa nhanh.<br>- Cho phép đính kèm bổ sung hoặc thay thế tệp tin mới (Tổng số tệp tối đa 3 file, <20MB, định dạng `.pdf`, `.jpg`, `.jpeg`, `.png`).<br>- Quy cách hiển thị giao diện:<br>+ Sử dụng bộ chọn tệp đã được Việt hóa (hiển thị nhãn **[Chọn tệp]** và dòng trạng thái **"Chưa có tệp nào được chọn"** hoặc **"Đã chọn X tệp"**).<br>+ Danh sách tệp đính kèm đã chọn hiển thị phía dưới, mỗi tệp hiển thị biểu tượng kẹp giấy, tên tệp tin và hai liên kết **"Xem file"** và **"Xóa"** nằm liền kề bên phải trên cùng một dòng.<br>+ Nếu tên tệp tin quá dài, hệ thống tự động thu gọn ở giữa hoặc cuối tên dạng dấu ba chấm (`...`) để đảm bảo tên tệp và các liên kết hành động luôn nằm trên cùng một dòng. |

##### 4.1.19.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | CẬP NHẬT | Nút bấm | - **Thao tác:** Người dùng nhập liệu và bấm nút **[CẬP NHẬT]**.<br>- **Kiểm tra nghiệp vụ (Validation Rules):** Giống với trường hợp Tạo yêu cầu hỗ trợ tại mục [4.1.19.3](#41193-uc266mh01---man-hinh-tao-yeu-cau-ho-tro), bao gồm:<br>+ **TH1 (Bỏ trống trường bắt buộc):** Kiểm tra Mức độ ưu tiên, Tiêu đề, Nội dung.<br>+ **TH2 (Sai định dạng tệp đính kèm):** Kiểm tra định dạng tệp tin đính kèm.<br>+ **TH3 (Vượt quá giới hạn):** Kiểm tra độ dài Tiêu đề, Nội dung, dung lượng và số lượng tệp tin.<br>+ **TH4 (Trùng lặp tiêu đề):** Kiểm tra trùng lặp tiêu đề với các yêu cầu khác ở trạng thái "Chờ tiếp nhận" hoặc "Đang xử lý".<br>+ **Xử lý hợp lệ:** Nếu dữ liệu hợp lệ:<br>+ Lưu thông tin đã chỉnh sửa vào CSDL.<br>+ Cập nhật trạng thái yêu cầu chuyển sang **Chờ tiếp nhận**.<br>+ Giữ nguyên toàn bộ lịch sử phản hồi cũ của cán bộ để theo dõi tiến độ.<br>- Hiển thị thông báo Toast thành công và quay lại màn hình danh sách (`UC267.MH01`). |
| 2 | QUAY LẠI | Nút bấm | - **Thao tác:** Người dùng bấm nút **[QUAY LẠI]**.<br>- **Xử lý:** Hủy bỏ thao tác cập nhật, quay trở lại Màn hình Danh sách theo dõi yêu cầu hỗ trợ (`UC267.MH01`), không lưu bất kỳ thay đổi nào. |
