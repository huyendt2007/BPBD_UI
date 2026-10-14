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
| 11 | Số giấy tờ thân nhân | String(50) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số CCCD/CMND/Hộ chiếu...`<br>- Kiểm tra định dạng: 12 chữ số đối với CCCD/Thẻ căn cước, 9 chữ số đối với CMND, 8 ký tự đối với Hộ chiếu. |
| 12 | Ngày cấp giấy tờ | Date | Không | Trống | Control UI: DatePicker (định dạng `dd/mm/yyyy`). Không được lớn hơn ngày hiện tại. |
| 13 | Nơi cấp giấy tờ | String(255) | Không | Trống | Control UI: Input text. Placeholder: `Nhập nơi cấp...` (ví dụ: Cục Cảnh sát QLHC về TTXH). |
| 14 | Số điện thoại liên hệ | String(15) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số điện thoại liên hệ...`<br>- Kiểm tra định dạng số điện thoại Việt Nam (10 chữ số, bắt đầu bằng đầu số hợp lệ 03, 05, 07, 08, 09). Bắt buộc để nhận tin nhắn SMS thông báo tiến độ. |
| 15 | Email liên hệ | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập địa chỉ email...`<br>- Không bắt buộc; khi có nhập, kiểm tra định dạng email hợp lệ. Dùng để nhận thông báo tiếp nhận, giấy mời và văn bản giải quyết điện tử. |
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
| 31 | Tệp tin đính kèm văn bản căn cứ | File | Có khi thêm dòng | Trống | Control UI: Nút `Chọn tệp / Tải lên`.<br>- **Chỉ chấp nhận định dạng**: `.pdf`, `.jpg`, `.jpeg`, `.png` (tuyệt đối không tiếp nhận tệp `.doc`, `.docx`).<br>- Dung lượng tối đa: 20MB/tệp.<br>- Hiển thị tên tệp sau khi tải lên thành công kèm nút `Xem file` (mở tab mới) và nút `Xóa tệp`. |
| 32 | Nút Thêm văn bản căn cứ | Action Button | - | - | Cho phép người dân thêm nhiều dòng văn bản căn cứ nếu vụ việc có nhiều văn bản chứng minh. |
| **F** | **THÀNH PHẦN HỒ SƠ / TÀI LIỆU ĐÍNH KÈM KHÁC** | List(Object) | Tùy điều kiện | - | Danh mục tài liệu, chứng từ chứng minh thiệt hại hoặc giấy tờ ủy quyền, thừa kế. |
| 33 | STT dòng tài liệu | Integer | - | Tự tăng | Số thứ tự tài liệu đính kèm (1, 2, 3...). |
| 34 | Tên tài liệu đính kèm | String(255) | Có khi thêm file | Trống | Control UI: Input text.<br>- Placeholder: `Ví dụ: Giấy ủy quyền hợp pháp; Hóa đơn viện phí; Hợp đồng thuê nhà...`<br>- **Bắt buộc đính kèm Giấy tờ chứng minh tư cách đại diện/thừa kế/ủy quyền** nếu Tư cách người yêu cầu khác "Người bị thiệt hại". |
| 35 | Tệp tin đính kèm | File | Có khi thêm dòng | Trống | Control UI: Nút `Chọn tệp / Tải lên`.<br>- **Chỉ chấp nhận định dạng**: `.pdf`, `.jpg`, `.jpeg`, `.png` (tuyệt đối không tiếp nhận tệp `.doc`, `.docx`). Dung lượng tối đa: 20MB/tệp.<br>- Có liên kết `Xem file` và nút `Xóa`. |
| 36 | Nút Thêm tài liệu | Action Button | - | - | Cho phép bổ sung thêm nhiều dòng tài liệu chứng minh thiệt hại. |

---

### II. QUY TẮC NGHIỆP VỤ & KIỂM TRA TÍNH HỢP LỆ

Đội ngũ phát triển E-Form cài đặt các hàm kiểm tra hợp lệ phía máy trạm (Client-side) và kiểm tra lại phía máy chủ (Server-side):

1. **Quy tắc bắt buộc nhập**:
   - Khi người dân thực hiện nộp hồ sơ, hệ thống kiểm tra toàn bộ các trường đánh dấu "Bắt buộc".
   - Nếu có trường bắt buộc chưa nhập hoặc chưa chọn, tự động cuộn màn hình đến ô lỗi đầu tiên, highlight đỏ viền/nền ô trống đầu tiên (class `.is-invalid`), hiển thị dòng chữ cảnh báo màu đỏ ngay dưới ô nhập: **"Đây là trường bắt buộc"** và tự động focus con trỏ vào ô nhập lỗi đầu tiên đó.
2. **Quy tắc kiểm tra định dạng Số điện thoại liên hệ**:
   - Trường "Số điện thoại liên hệ" phải đủ 10 chữ số, không chứa ký tự chữ hoặc ký tự đặc biệt, bắt đầu bằng các đầu số di động hợp lệ tại Việt Nam (03, 05, 07, 08, 09).
3. **Quy tắc kiểm tra định dạng Email liên hệ**:
   - Trường "Email liên hệ" không bắt buộc; khi người dân có nhập, giá trị phải đúng cấu trúc định dạng email (ví dụ: `nguyenvana@gmail.com`).
4. **Quy tắc thông tin người bị thiệt hại và giấy tờ chứng minh**:
   - Khi "Tư cách người yêu cầu" được chọn khác giá trị "Người bị thiệt hại":
     + Hiển thị khối Thông tin người bị thiệt hại. Các trường trong khối (Họ và tên người bị thiệt hại, Ngày tháng năm sinh, Giới tính, Loại giấy tờ thân nhân, Số giấy tờ thân nhân, địa chỉ) không bắt buộc; người dân kê khai nếu có thông tin.
     + Bắt buộc trong khối Thành phần hồ sơ / Tài liệu đính kèm khác phải có ít nhất 01 tệp tin là Giấy ủy quyền hợp pháp, Văn bản chỉ định người đại diện hoặc Giấy chứng nhận quyền thừa kế hợp pháp.
5. **Quy tắc tệp tin đính kèm**:
   - Văn bản làm căn cứ yêu cầu bồi thường là không bắt buộc. Trường hợp người dân có tải lên tệp tin tại khối Văn bản làm căn cứ hoặc khối Tài liệu đính kèm khác:
     + Chỉ chấp nhận các định dạng tệp: `.pdf`, `.jpg`, `.jpeg`, `.png` (tuyệt đối không chấp nhận các định dạng văn bản soạn thảo `.doc`, `.docx`).
     + Dung lượng tối đa cho mỗi tệp tin đính kèm là 20MB. Hệ thống thông báo lỗi rõ ràng nếu tệp tin vượt quá dung lượng hoặc sai định dạng cho phép.
