# ĐẶC TẢ YÊU CẦU KỸ THUẬT VÀ GIAO DIỆN BIỂU MẪU ĐIỆN TỬ (E-FORM)
## THỦ TỤC: YÊU CẦU BỒI THƯỜNG NHÀ NƯỚC
*(Tài liệu trích xuất phục vụ xây dựng E-Form trên Cổng Dịch vụ công Quốc gia / Hệ thống thông tin giải quyết thủ tục hành chính)*

---

### I. BẢNG ĐẶC TẢ CHI TIẾT CÁC TRƯỜNG THÔNG TIN TRÊN E-FORM

Biểu mẫu E-Form được bố cục theo các khối thông tin logic, thân thiện với người dân:

| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Giá trị mặc định / Ràng buộc | Hướng dẫn giao diện & Quy tắc nhập (Control UI / Description) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | **CƠ QUAN TIẾP NHẬN HỒ SƠ** | Section | - | - | Khối chọn cơ quan có thẩm quyền tiếp nhận và giải quyết bồi thường. |
| 1 | Tỉnh/Thành phố cơ quan giải quyết | Enum | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- Danh sách Tỉnh/Thành phố trực thuộc Trung ương. |
| 2 | Cơ quan giải quyết bồi thường | Enum | Có | Trống | Control UI: Combobox có tìm kiếm (lọc theo Tỉnh/Thành phố đã chọn).<br>- Placeholder: `Chọn cơ quan giải quyết bồi thường...`<br>- Danh sách Cơ quan giải quyết bồi thường (Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại: UBND cấp huyện, UBND cấp tỉnh, Tòa án, Viện kiểm sát, Công an, Cơ quan THADS...). |
| **B** | **THÔNG TIN TỔNG QUAN NỘI DUNG YÊU CẦU** | Section | - | - | Khối phân loại yêu cầu bồi thường và lĩnh vực phát sinh thiệt hại. |
| 3 | Loại yêu cầu giải quyết bồi thường | Enum | Có | Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự) | Control UI: Radio button.<br>Gồm:<br>+ Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)<br>+ Chỉ yêu cầu bồi thường thiệt hại bằng tiền<br>+ Chỉ yêu cầu phục hồi danh dự<br>- Mặc định chọn `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)`. |
| 4 | Lĩnh vực phát sinh thiệt hại | Enum | Có | Trống | Control UI: Combobox.<br>Gồm:<br>+ Trong hoạt động quản lý hành chính<br>+ Trong hoạt động tố tụng hình sự<br>+ Trong hoạt động tố tụng dân sự<br>+ Trong hoạt động tố tụng hành chính<br>+ Trong hoạt động thi hành án hình sự<br>+ Trong hoạt động thi hành án dân sự<br>- Placeholder: `Chọn lĩnh vực phát sinh thiệt hại...` |
| 5 | Tóm tắt hành vi trái pháp luật gây thiệt hại | Text(2000) | Có | Trống | Control UI: Textarea (Chiều cao tối thiểu 3 dòng, tối đa 2000 ký tự).<br>- Placeholder: `Mô tả tóm tắt hành vi trái pháp luật của người thi hành công vụ và vụ việc xảy ra...`<br>- Căn cứ điểm c khoản 1 Điều 41 Luật TNBTCNN. |
| **C** | **THÔNG TIN NGƯỜI YÊU CẦU BỒI THƯỜNG** | Section | - | - | Khối thông tin của cá nhân, tổ chức trực tiếp nộp hồ sơ yêu cầu bồi thường. |
| 6 | Họ và tên người yêu cầu | String(100) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên người yêu cầu...`<br>- Tự động điền theo thông tin tài khoản đăng nhập Cổng Dịch vụ công (VNeID/DVCQG). |
| 7 | Ngày tháng năm sinh | Date | Không | Trống | Control UI: DatePicker (định dạng `dd/mm/yyyy`).<br>- Tự động điền theo tài khoản định danh VNeID nếu có. |
| 8 | Giới tính | Enum | Không | Trống | Control UI: Combobox.<br>Gồm:<br>+ Nam<br>+ Nữ<br>+ Khác |
| 9 | Tư cách người yêu cầu | Enum | Có | Người bị thiệt hại | Control UI: Combobox.<br>Gồm:<br>+ Người bị thiệt hại<br>+ Người thừa kế của người bị thiệt hại<br>+ Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại<br>+ Người đại diện theo pháp luật của người bị thiệt hại<br>+ Cá nhân, pháp nhân được ủy quyền hợp pháp<br>- **Quy tắc hiển thị động**: Khi chọn giá trị khác `Người bị thiệt hại`, hệ thống **bắt buộc hiển thị khối D (Thông tin người bị thiệt hại)** và yêu cầu đính kèm văn bản chứng minh tư cách đại diện/thừa kế/ủy quyền tại khối Thành phần hồ sơ / Tài liệu đính kèm khác. Khi chọn `Người bị thiệt hại`, khối D tự động ẩn và xóa dữ liệu bên trong. |
| 10 | Loại giấy tờ thân nhân | Enum | Có | Căn cước công dân / Thẻ căn cước | Control UI: Combobox.<br>Gồm:<br>+ Căn cước công dân / Thẻ căn cước<br>+ Chứng minh nhân dân<br>+ Hộ chiếu<br>+ Giấy tờ khác |
| 11 | Số giấy tờ thân nhân | String(50) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số CCCD/CMND/Hộ chiếu...`<br>- Các trường hợp cần kiểm tra:<br>+ Loại giấy tờ là Căn cước công dân / Thẻ căn cước: đủ 12 chữ số.<br>+ Loại giấy tờ là Chứng minh nhân dân: đủ 9 chữ số.<br>+ Loại giấy tờ là Hộ chiếu: đủ 8 ký tự. |
| 12 | Ngày cấp giấy tờ | Date | Không | Trống | Control UI: DatePicker (định dạng `dd/mm/yyyy`).<br>- Các trường hợp cần kiểm tra:<br>+ Không lớn hơn ngày hiện tại. |
| 13 | Nơi cấp giấy tờ | String(255) | Không | Trống | Control UI: Input text. Placeholder: `Nhập nơi cấp...` (ví dụ: Cục Cảnh sát QLHC về TTXH). |
| 14 | Số điện thoại liên hệ | String(15) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại liên hệ...`<br>- Dùng để nhận tin nhắn SMS thông báo tiến độ.<br>- Các trường hợp cần kiểm tra:<br>+ Đủ 10 chữ số.<br>+ Chỉ gồm chữ số, không chứa chữ cái hoặc ký tự đặc biệt.<br>+ Bắt đầu bằng đầu số di động hợp lệ tại Việt Nam: 03, 05, 07, 08, 09. |
| 15 | Email liên hệ | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ email...`<br>- Dùng để nhận thông báo tiếp nhận, giấy mời và văn bản giải quyết điện tử.<br>- Các trường hợp cần kiểm tra (khi người dân có nhập):<br>+ Đúng cấu trúc định dạng email. |
| 16 | Quốc gia | Enum | Có | Việt Nam | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Chọn Quốc gia...`<br>- Mặc định chọn `Việt Nam`. |
| 17 | Tỉnh/Thành phố | Enum | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `Gõ Mã hoặc Tên Tỉnh/Thành phố...`<br>- Hiển thị và bắt buộc chọn khi Quốc gia là Việt Nam. |
| 18 | Phường/Xã | Enum / String(100) | Có | Trống | Control UI: Combobox có tìm kiếm (khi là Việt Nam, lọc động theo Tỉnh/TP đã chọn) hoặc Input text tự do (khi là Quốc gia khác).<br>- Placeholder: `Chọn Phường/Xã/Thị trấn...` |
| 19 | Địa chỉ chi tiết | String(500) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số nhà, tên đường, thôn, xóm, tổ dân phố...` |
| **D** | **THÔNG TIN NGƯỜI BỊ THIỆT HẠI** | Section | - | - | Khối hiển thị động. **Chỉ hiển thị khi Tư cách người yêu cầu khác "Người bị thiệt hại".** Các trường trong khối không bắt buộc; người dân kê khai nếu có thông tin. |
| 20 | Họ và tên người bị thiệt hại | String(100) | Không | Trống | Control UI: Input text. Placeholder: `Nhập họ và tên người bị thiệt hại...` |
| 21 | Ngày tháng năm sinh | Date | Không | Trống | Control UI: DatePicker (định dạng `dd/mm/yyyy`). |
| 22 | Giới tính | Enum | Không | Trống | Control UI: Combobox.<br>Gồm:<br>+ Nam<br>+ Nữ<br>+ Khác |
| 23 | Loại giấy tờ thân nhân | Enum | Không | Căn cước công dân / Thẻ căn cước | Control UI: Combobox.<br>Gồm:<br>+ Căn cước công dân / Thẻ căn cước<br>+ Chứng minh nhân dân<br>+ Hộ chiếu<br>+ Giấy khai sinh<br>+ Giấy tờ khác |
| 24 | Số giấy tờ thân nhân | String(50) | Không | Trống | Control UI: Input text. Placeholder: `Nhập số CCCD/CMND/Hộ chiếu/Giấy khai sinh...` |
| 25 | Quốc gia | Enum | Không | Việt Nam | Control UI: Combobox có tìm kiếm. Mặc định `Việt Nam`. |
| 26 | Tỉnh/Thành phố | Enum | Không | Trống | Control UI: Combobox có tìm kiếm. |
| 27 | Phường/Xã | String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text. Placeholder: `Nhập Phường/Xã/Thị trấn...` |
| 28 | Địa chỉ chi tiết | String(500) | Không | Trống | Control UI: Input text. Placeholder: `Nhập số nhà, tên đường, thôn, xóm...` |
| **E** | **VĂN BẢN LÀM CĂN CỨ YÊU CẦU BỒI THƯỜNG** | List(Object) | Không | Tùy chọn | Bảng danh sách văn bản làm căn cứ yêu cầu bồi thường đã có hiệu lực pháp luật xác định hành vi trái pháp luật của người thi hành công vụ (điểm a khoản 2 Điều 41 Luật TNBTCNN). |
| 29 | STT dòng căn cứ | Integer | - | Tự tăng | Số thứ tự văn bản căn cứ (1, 2, 3...). |
| 30 | Tên văn bản làm căn cứ | String(255) | Có khi thêm file | Trống | Control UI: Input text.<br>- Placeholder: `Ví dụ: Bản án số 12/2026/HS-ST; Quyết định giải quyết khiếu nại số 45/QĐ-UBND...`<br>- Nếu người dân tải file trước thì hệ thống tự động điền tên file vào trường này. |
| 31 | Tệp tin đính kèm văn bản căn cứ | File | Có khi thêm dòng | Trống | Control UI: Nút `Chọn tệp / Tải lên`.<br>- Các trường hợp cần kiểm tra:<br>+ Định dạng tệp là `.pdf`, `.jpg`, `.jpeg` hoặc `.png` (không tiếp nhận `.doc`, `.docx`).<br>+ Dung lượng không quá 20MB/tệp.<br>- Hiển thị tên tệp sau khi tải lên thành công kèm nút `Xem file` (mở tab mới) và nút `Xóa tệp`. |
| 32 | Nút Thêm văn bản căn cứ | Action Button | - | - | Cho phép người dân thêm nhiều dòng văn bản căn cứ nếu vụ việc có nhiều văn bản chứng minh. |
| **F** | **THÀNH PHẦN HỒ SƠ / TÀI LIỆU ĐÍNH KÈM KHÁC** | List(Object) | Tùy điều kiện | - | Danh mục tài liệu, chứng từ chứng minh thiệt hại hoặc giấy tờ ủy quyền, thừa kế. |
| 33 | STT dòng tài liệu | Integer | - | Tự tăng | Số thứ tự tài liệu đính kèm (1, 2, 3...). |
| 34 | Tên tài liệu đính kèm | String(255) | Có khi thêm file | Trống | Control UI: Input text.<br>- Placeholder: `Ví dụ: Giấy ủy quyền hợp pháp; Hóa đơn viện phí; Hợp đồng thuê nhà...`<br>- Các trường hợp cần kiểm tra:<br>+ Khi `Tư cách người yêu cầu` khác `Người bị thiệt hại`: khối có ít nhất 01 tệp là Giấy ủy quyền hợp pháp, Văn bản chỉ định người đại diện hoặc Giấy chứng nhận quyền thừa kế hợp pháp. |
| 35 | Tệp tin đính kèm | File | Có khi thêm dòng | Trống | Control UI: Nút `Chọn tệp / Tải lên`.<br>- Các trường hợp cần kiểm tra:<br>+ Định dạng tệp là `.pdf`, `.jpg`, `.jpeg` hoặc `.png` (không tiếp nhận `.doc`, `.docx`).<br>+ Dung lượng không quá 20MB/tệp.<br>- Có liên kết `Xem file` và nút `Xóa`. |
| 36 | Nút Thêm tài liệu | Action Button | - | - | Cho phép bổ sung thêm nhiều dòng tài liệu chứng minh thiệt hại. |
