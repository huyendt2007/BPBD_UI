**TÀI LIỆU PHÂN TÍCH YÊU CẦU CHI TIẾT**
**PHẦN MỀM Hệ thống Đăng ký trực tuyến BPBĐ bằng động sản**

Mã hiệu dự án: BTP_GDBD_S7_2026
Mã hiệu tài liệu: BPBD&BTNN_SRS
Phiên bản: 1.0

DỰ ÁN: Xây dựng Hệ thống đăng ký trực tuyến biện pháp bảo đảm bằng động sản
Hợp đồng số: [Số hợp đồng]
Gói thầu: [Tên gói thầu]

## LỊCH SỬ THAY ĐỔI

| Ngày | Phiên bản | Người thực hiện | Mục, bảng sơ đồ được thay đổi | Lý do | Mô tả |
| :---- | :---------- | :------------------ | :-------------------------------------- | :----- | :------ |
|       |             |                     |                                         |        |         |

# 1. TÓM TẮT

## 1.1. Mục đích tài liệu:

\- Cung cấp đặc tả phân tích yêu cầu chi tiết cho các Use Case thuộc nhóm tính năng Quản lý hồ sơ đăng ký biện pháp bảo đảm (từ UC119 đến UC150).  

## 1.2. Tài liệu tham khảo:

## 1.3. Thuật ngữ và từ viết tắt:

\- GDBĐ: Giao dịch bảo đảm.
\- BPBĐ: Biện pháp bảo đảm.
\- TTĐK: Trung tâm đăng ký giao dịch, tài sản.
\- NSD: Người sử dụng.

## 1.4. Các ký hiệu sử dụng trong tài liệu:

\- N/A

# 2. MÔ HÌNH KIẾN TRÚC TỔNG THỂ PHẦN MỀM

## 2.1. Mô hình kiến trúc tổng thể phần mềm

\- (Cập nhật sau)

## 2.2. Mô tả tổng quan phần mềm

\- (Cập nhật sau)

# 3. MÔ HÌNH QUY TRÌNH NGHIỆP VỤ

## 3.1. Quản lý đăng ký, cung cấp thông tin về biện pháp bảo đảm

### 3.1.1. Quản lý hồ sơ đăng ký biện pháp bảo đảm

\- (Cập nhật quy trình nghiệp vụ L1, L2 tại đây)

### 3.1.2. Vòng đời trạng thái của hồ sơ đăng ký

Dưới đây là danh sách các trạng thái áp dụng chung cho các loại hồ sơ Đăng ký mới, Đăng ký thay đổi, và Xóa đăng ký.

| STT | Tên trạng thái | Ý nghĩa nghiệp vụ                                                                                                                                                    | Vai trò tác động chính                   |
| :-- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| 1   | Lưu nháp        | Hồ sơ đã được tạo nhưng chưa nộp. Người dùng có thể tiếp tục chỉnh sửa hoặc xóa bỏ.                                                               | NSD (Người khởi tạo)                      |
| 2   | Chờ thanh toán  | Hồ sơ đã được nộp nhưng hệ thống đang chờ xác nhận thanh toán phí/lệ phí theo quy định trước khi chuyển sang các bước phê duyệt tiếp theo. | NSD (Khách hàng) / Hệ thống thanh toán   |
| 3   | Sai lệch thanh toán | Hồ sơ đã trừ tiền thành công trên Cổng thanh toán nhưng số tiền không khớp với lệ phí của hồ sơ. Bị tạm khóa chờ kế toán đối soát thủ công. | Hệ thống / Kế toán đối soát               |
| 4   | Chờ duyệt  | Hồ sơ đã thanh toán thành công hợp lệ (hoặc đã đối soát khớp tiền) và đang chờ chuyên viên kiểm tra tính hợp lệ của thông tin.                             | Chuyên viên phê duyệt / Trưởng phòng   |
| 5   | Duyệt Duyệt chờ ký   | Hồ sơ đã qua bước kiểm tra chuyên môn, chốt dữ liệu thành công. Dữ liệu lúc này bị khóa (Read-only) và chờ để chuyển sang luồng trình ký.    | Chuyên viên phê duyệt / Lãnh đạo       |
| 6   | Duyệt chờ ký          | Hồ sơ đang nằm trong khay công việc của người có thẩm quyền ký. Chờ thực hiện ép chữ ký số (USB Token/HSM) vào file hồ sơ.                        | Lãnh đạo / Người đại diện pháp luật |
| 7   | Hoàn thành      | Hồ sơ đã được ký số, nộp thành công và đã được Cục đăng ký giao dịch bảo đảm và bồi thường nhà nước cấp chứng nhận. **Lưu ý:** Số PIN chỉ được cấp mới duy nhất một lần đối với hồ sơ Đăng ký mới (UC024); các loại hồ sơ khác (Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản,...) khi đạt trạng thái Hoàn thành chỉ được cấp chứng nhận, không cấp Số PIN mới. | Hệ thống NRAST / Bộ Tư pháp              |
| 8   | Bị từ chối     | Hồ sơ bị từ chối do sai sót thông tin nội bộ hoặc bị cơ quan quản lý nhà nước từ chối cấp chứng nhận. Hệ thống có lưu kèm lý do từ chối.   | Người phê duyệt / Cơ quan quản lý      |

## 3.2. Danh mục dữ liệu dùng chung (Master Data Dictionary)

Danh sách các danh mục dùng chung (Master Data) áp dụng xuyên suốt toàn bộ hệ thống Đăng ký trực tuyến BPBĐ bằng động sản. Khi đặc tả các trường dữ liệu ở từng màn hình, tài liệu sẽ chỉ tham chiếu đến mã danh mục [DM_xx] để tránh lặp lại.

| Mã DM            | Tên Danh mục                                    | Các giá trị cụ thể (Options)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------- | :------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[DM_01]** | Loại hình giao dịch                            | \- Biện pháp bảo đảm<br>- Hợp đồng<br>- Thông báo xử lý tài sản                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **[DM_02]** | Loại biện pháp bảo đảm                      | \- Thế chấp<br>+ Cầm cố<br>- Bảo lưu quyền sở hữu<br>+ Đặt cọc<br>+ Ký cược<br>+ Ký quỹ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **[DM_03]** | Loại hợp đồng                                 | \- Hợp đồng cho thuê tài chính<br>- Hợp đồng thuê tài sản có thời hạn 1 năm trở lên<br>- Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác<br>- Hợp đồng ký gửi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **[DM_04]** | Loại hình đăng ký                            | \- Đăng ký lần đầu<br>- Đăng ký thay đổi<br>- Xóa đăng ký<br>- Thông báo xử lý tài sản đảm bảo lần đầu<br>- Thay đổi thông báo xử lý tài sản bảo đảm<br>- Xóa đăng ký thông báo xử lý tài sản bảo đảm<br>- Yêu cầu cung cấp bản sao<br>- Yêu cầu cung cấp bản sao kèm thông báo<br>- Yêu cầu cung cấp thông tin<br>- Chỉnh lý thông tin<br>- Hủy đăng ký<br>- Khôi phục hủy đăng ký |
| **[DM_06]** | Loại bên bảo đảm (Chủ thể)                 | \- Công dân Việt Nam<br>- Tổ chức có đăng ký kinh doanh trong nước<br>- Người nước ngoài<br>- Tổ chức nước ngoài<br>- Tổ chức khác<br>- Người không quốc tịch cư trú tại Việt Nam |
| **[DM_07]** | Loại tài sản bảo đảm                        | \- Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)<br>- Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt<br>- Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản<br>- Cây hằng năm, công trình tạm<br>- Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ<br>- Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung<br>- Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...) |
| **[DM_08]** | Trung tâm giao dịch bảo đảm                  | \- Trung tâm đăng ký, giao dịch tài sản tại TP Hà Nội<br>- Trung tâm đăng ký, giao dịch tài sản tại TP Đà Nẵng<br>- Trung tâm đăng ký, giao dịch tài sản tại TP HCM |
| **[DM_09]** | Quốc tịch / Quốc gia                           | \- Việt Nam<br>- Các quốc gia khác (theo chuẩn ISO 3166) |
| **[DM_10]** | Loại giấy tờ pháp lý                         | \- CMND/CCCD/Chứng minh quân đội<br>- Hộ chiếu<br>- Thẻ thường trú<br>- Mã số thuế |
| **[DM_11]** | Loại hình tổ chức                             | \- Tổ chức nước ngoài<br>- Tổ chức quốc tế<br>- Tổ chức khác |
| **[DM_12]** | Quy mô bên bảo đảm                           | \- Bên bảo đảm sử dụng khoản vay cho tiêu dùng cá nhân<br>- Bên bảo đảm là công ty có ít hơn 10 nhân viên<br>- Bên bảo đảm là công ty có từ 10 đến 299 nhân viên<br>- Bên bảo đảm là công ty có từ 300 nhân viên hoặc nhiều hơn |
| **[DM_13]** | Tỉnh/Thành phố                                 | *Danh mục động đồng bộ từ CSDL hành chính quốc gia* |
| **[DM_14]** | Quận/Huyện                                      | *Danh mục động. Lọc theo Mã Tỉnh/TP (Cascading).* |
| **[DM_15]** | Phường/Xã                                      | *Danh mục động. Lọc theo Mã Quận/Huyện (Cascading).* |
| **[DM_16]** | Danh mục Hint Tooltip                            | Gồm các văn bản hướng dẫn hiển thị trên giao diện:<br>+ Tooltip Hướng dẫn Ngày có hiệu lực HĐ<br>+ Tooltip Hướng dẫn Chủ doanh nghiệp là nữ giới<br>+ Tooltip Hướng dẫn Số giấy tờ<br>+ Tooltip Hướng dẫn Loại tài sản<br>+ Tooltip Hướng dẫn Biển số<br>+ Hướng dẫn thanh toán QR Code<br>*(Chi tiết giá trị tham chiếu tại Bảng Danh mục Tooltip, Hướng dẫn ở cuối tài liệu)* |
| **[DM_17]** | Danh mục Người yêu cầu đăng ký | \- Bên bảo đảm<br>- Bên nhận bảo đảm<br>+ Bên bảo đảm mới<br>+ Bên nhận bảo đảm mới<br>+ Quản tài viên/Doanh nghiệp quản lý, thanh lý tài sản<br>+ Cơ quan khác có thẩm quyền, người khác có thẩm quyền<br>+ Cơ quan thi hành án dân sự, Chấp hành viên<br>+ Chi nhánh của pháp nhân, người đại diện<br>+ Bên kế thừa bên bảo đảm, bên nhận bảo đảm<br>- Tổ chức, cá nhân khác |
| **[DM_19]** | Danh mục Căn cứ xóa đăng ký | Các căn cứ pháp lý để thực hiện xóa đăng ký biện pháp bảo đảm. Gồm:<br>+ Theo thỏa thuận giữa bên bảo đảm và bên nhận bảo đảm<br>+ Toàn bộ nghĩa vụ được bảo đảm bị chấm dứt<br>+ Toàn bộ/một phần nội dung hợp đồng bảo đảm có biện pháp bảo đảm bị hủy bỏ<br>+ Biện pháp bảo đảm được thay thế bằng biện pháp bảo đảm khác<br>+ Tài sản bảo đảm không còn<br>+ Tài sản bảo đảm đã được xử lý xong bởi bên nhận bảo đảm/cơ quan thi hành án dân sự<br>+ Tài sản bảo đảm là Cây hằng năm, công trình tạm trên đất thuê trả tiền hàng năm mà Nhà nước thu hồi đất<br>+ Cây hằng năm được thu hoạch, công trình tạm bị phá dỡ<br>+ Bên nhận bảo đảm là pháp nhân bị giải thể<br>+ Theo bản án, quyết định có hiệu lực pháp luật của Tòa án (Khách hàng không chọn căn cứ này)<br>+ Đã thực hiện thủ tục chuyển tiếp đăng ký thế chấp tại Văn phòng đăng ký đất đai (Khách hàng không chọn căn cứ này) |
| **[DM_20]** | Danh mục Căn cứ hủy đăng ký | Các căn cứ pháp lý để thực hiện hủy đăng ký biện pháp bảo đảm (Khoản 1 Điều 21 Nghị định 99/2022/NĐ-CP). Gồm:<br>+ Biện pháp bảo đảm đã được đăng ký mà cơ quan đăng ký nhận được bản án, quyết định của Tòa án có hiệu lực pháp luật hoặc quyết định của Trọng tài thương mại có hiệu lực pháp luật có nội dung quyết định về việc cơ quan đăng ký phải hủy toàn bộ hoặc một phần nội dung đăng ký (Điểm a Khoản 1 Điều 21)<br>+ Biện pháp bảo đảm đã được đăng ký nhưng cơ quan đăng ký phát hiện nội dung đăng ký có sai sót do lỗi của cơ quan đăng ký, của người yêu cầu đăng ký mà nội dung sai sót đó không thuộc trường hợp đăng ký thay đổi hoặc không thể khắc phục bằng việc đăng ký thay đổi (Điểm b Khoản 1 Điều 21) |
| **[DM_21]** | Loại văn bản quy phạm pháp luật | \- Luật<br>- Nghị định<br>- Thông tư<br>- Quyết định<br>- Nghị quyết<br>- Chỉ thị<br>- Thông tư liên tịch<br>- Khác |
| **[DM_22]** | Lĩnh vực phát sinh thiệt hại | \- TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH<br>- TRONG HOẠT ĐỘNG TỐ TỤNG HÌNH SỰ<br>- TRONG HOẠT ĐỘNG TỐ TỤNG DÂN SỰ<br>- TRONG HOẠT ĐỘNG TỐ TỤNG HÀNH CHÍNH<br>- TRONG HOẠT ĐỘNG THI HÀNH ÁN HÌNH SỰ<br>- TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ |
| **[DM_23]** | Giới tính | \- Nam<br>- Nữ<br>- Khác |
| **[DM_25]** | Hình thức tiếp nhận hồ sơ bồi thường | \- Tiếp nhận trực tiếp<br>- Nhận qua bưu điện/Bưu chính<br>- Dịch vụ công<br>- Cán bộ chủ động nhập theo tố tụng/thi hành án |
| **[DM_26]** | Tư cách người yêu cầu bồi thường | \- Người bị thiệt hại<br>- Người thừa kế của người bị thiệt hại<br>- Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại<br>- Người đại diện theo pháp luật của người bị thiệt hại<br>- Cá nhân, pháp nhân được ủy quyền hợp pháp |
| **[DM_27]** | Loại thiệt hại yêu cầu bồi thường | \- Tài sản bị xâm phạm<br>- Thu nhập thực tế bị mất/giảm sút<br>- Vật chất do người bị thiệt hại chết<br>- Vật chất do sức khỏe bị xâm phạm<br>- Thiệt hại về tinh thần<br>- Các chi phí hợp lý khác |
| **[DM_28]** | Phương thức nhận tiền bồi thường/tạm ứng | \- Nhận tiền mặt<br>- Nhận qua chuyển khoản |
| **[DM_29]** | Tình trạng công tác hiện tại của người thi hành công vụ | \- Vẫn công tác tại đơn vị cũ<br>- Đã chuyển công tác<br>- Đã nghỉ hưu / nghỉ việc<br>- Không rõ |
| **[DM_31]** | Hình thức phục hồi danh dự | \- Trực tiếp xin lỗi<br>- Đăng báo<br>- Cả hai hình thức |
| **[DM_33]** | Xếp loại chấm điểm công tác BTNN | \- Tốt<br>- Khá<br>- Trung bình<br>- Yếu<br>- Chưa xếp loại<br>- Không đánh giá |
| **[DM_34]** | Nhóm tiêu chí chấm điểm công tác BTNN | \- Nhóm I: Đánh giá thực hiện quản lý nhà nước về công tác bồi thường nhà nước<br>- Nhóm II: Đánh giá tổ chức các hoạt động phối hợp thực hiện quản lý nhà nước về công tác bồi thường nhà nước<br>- Nhóm III: Đánh giá tham gia giải quyết yêu cầu bồi thường theo quy định tại khoản 4 Điều 45 và khoản 3 Điều 46 Luật Trách nhiệm bồi thường của Nhà nước<br>- Nhóm IV: Đánh giá điều kiện bảo đảm thực hiện quản lý nhà nước về công tác bồi thường nhà nước<br>- Nhóm V: Đánh giá của cơ quan giải quyết bồi thường, cơ quan nhà nước khác có liên quan tại địa phương trong việc thực hiện quản lý nhà nước về công tác bồi thường nhà nước và tham gia giải quyết yêu cầu bồi thường |
| **[DM_36]** | Nhóm chủ đề câu hỏi thường gặp | \- Đăng ký biện pháp bảo đảm<br>- Lệ phí và thanh toán<br>- Tài khoản và phân quyền<br>- Xử lý hồ sơ và biểu mẫu |
| **[DM_37]** | Loại đối tượng đề nghị cấp mã số sử dụng CSDL | \- Cá nhân<br>- Tổ chức<br>- Cơ quan có thẩm quyền |
| **[DM_38]** | Loại mã số sử dụng CSDL | \- Sử dụng thường xuyên (hiển thị rút gọn "Thường xuyên" tại bộ lọc/lưới)<br>- Sử dụng một lần (hiển thị rút gọn "Một lần" tại bộ lọc/lưới) |
| **[DM_40]** | Phương thức thanh toán cấp mã số sử dụng CSDL | \- Thanh toán trực tuyến<br>- Chuyển khoản ngân hàng<br>- Nộp tiền mặt<br>- Miễn phí |
| **[DM_41]** | Danh mục Tên phương tiện | \- Mô tô<br>- Ô tô<br>- Xe máy chuyên dùng |
| **[DM_43]** | Loại cơ quan báo cáo (thống kê BTNN theo Thông tư 08/2019/TT-BTP) | \- UBND cấp tỉnh<br>- Tòa án nhân dân tối cao<br>- Viện kiểm sát nhân dân tối cao<br>- Bộ/cơ quan ngang Bộ |
| **[DM_44]** | Loại kỳ báo cáo (thống kê BTNN theo Thông tư 08/2019/TT-BTP) | \- Báo cáo năm số liệu thực tế (01/01 - 31/10)<br>- Số liệu thống kê năm chính thức (01/01 - 31/12) |
| **[DM_46]** | Vai trò báo cáo của cơ quan (thống kê BTNN theo Thông tư 08/2019/TT-BTP, khoản 1 Điều 26) | \- Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại<br>- Cơ quan là bị đơn/bị đơn dân sự/người bị kiện trong vụ án |


## 3.3. Các Quy tắc Xử lý chung (Common Business Rules)

### 3.3.1. Quy chuẩn xử lý tính năng Import File (Tải lên danh sách)

- Toàn bộ các tính năng Import Excel trên hệ thống bắt buộc tuân thủ cơ chế **"Thành công một phần"**. Luồng xử lý được chia làm 2 giai đoạn kiểm tra cực kỳ nghiêm ngặt:
- **1. Kiểm tra mức độ File - Xử lý vòng ngoài:**
- Ngay khi người dùng thao tác chọn file hoặc kéo thả file, hệ thống sẽ kiểm tra cấu trúc vỏ trước khi đọc dữ liệu. Nếu vi phạm, hệ thống **chặn toàn bộ quá trình Import** và hiển thị **Toast báo lỗi** (nền màu đỏ).
- **Lỗi sai định dạng tệp:** Người dùng tải lên tệp không phải đuôi `.xls` hoặc `.xlsx` (VD: .pdf, .doc). Hiển thị Toast: *"Định dạng tệp không hợp lệ. Vui lòng tải lên tệp .xls hoặc .xlsx"*.
- **Lỗi vượt quá dung lượng:** Kích thước file lớn hơn mức cấu hình hệ thống (Mặc định: 20MB). Hiển thị Toast: *"Tệp tải lên vượt quá dung lượng cho phép (Tối đa 20MB)."*
- **Lỗi sai cấu trúc biểu mẫu:** Số lượng cột, tên tiêu đề các cột trong file không khớp chính xác với File mẫu do hệ thống xuất ra (do người dùng tự ý xóa/sửa cột). Hiển thị Toast: *"Cấu trúc file không đúng biểu mẫu. Vui lòng tải 'File mẫu' để nhập dữ liệu."*
- **2. Kiểm tra mức độ Dòng & Cơ chế Thành công một phần:**
- Nếu file hợp lệ, hệ thống tiến hành đọc dữ liệu từng dòng:
- **Xử lý Dòng rỗng:** Nếu một dòng trong Excel không chứa bất kỳ dữ liệu nào ở TẤT CẢ các cột -> Hệ thống tự động **Bỏ qua** dòng này, không tính là dữ liệu hợp lệ, cũng KHÔNG cộng vào tổng số dòng lỗi.
- **Dòng hợp lệ:** Được tự động đưa vào hệ thống (VD: đẩy lên lưới).
- **Dòng lỗi:** Bị loại bỏ, hệ thống ghi nhận lại vị trí dòng và nguyên nhân lỗi theo định nghĩa của *Ma trận Ràng buộc dữ liệu*.
- **3. Quy chuẩn giao diện báo cáo Kết quả:**
- Sau khi quét xong dữ liệu, bắt buộc hiển thị một **Popup** ở giữa màn hình để báo cáo chi tiết kết quả xử lý. Popup bao gồm 2 phần:
- **Phần Thống kê:**

  \- Hiển thị chữ màu xanh: *"Tải lên thành công: **[X]** bản ghi."* (Trong đó X là số dòng hợp lệ).

  \- Hiển thị chữ màu đỏ: *"Tải lên thất bại: **[Y]** bản ghi."* (Y là số dòng bị lỗi).

\- **Phần Bảng chi tiết lỗi:**

  \- *Điều kiện hiển thị:* Chỉ hiển thị bảng này nếu số dòng lỗi **Y > 0**.

  \- *Cấu trúc bảng:* Gồm 2 cột.

    \- **Cột 1 (Vị trí lỗi):** Hiển thị `"Dòng [Số thứ tự dòng trong file Excel]"`. *(Ví dụ: Dòng 5)*.

    \- **Cột 2 (Chi tiết lỗi):** Hiển thị câu thông báo lỗi chuẩn đã được quy định trong *Ma trận Ràng buộc dữ liệu* của từng màn hình. *(Ví dụ: "Số khung không được để trống")*.

  \- *Gộp lỗi:* Nếu 1 dòng vi phạm nhiều lỗi ở nhiều cột khác nhau, hệ thống gộp các câu lỗi lại, phân cách bằng dấu phẩy (`, `) hoặc xuống dòng. *(Ví dụ: "Số khung không được để trống, Nhãn hiệu vượt quá 255 ký tự")*.

\- **4. Quy định xử lý dữ liệu đặc thù:**

\- **Với các trường Yêu cầu xác nhận (Chọn/Không chọn):** Trên biểu mẫu Excel không thể để kiểu dữ liệu Checkbox, do đó quy định sử dụng kiểu `Số`. Các trường này (Ví dụ: Yêu cầu thông báo) chỉ nhận giá trị `1` (Chọn) hoặc `0` (Không chọn). Nếu NSD nhập khoảng trắng, chữ cái, hay bất kỳ số nào khác, hệ thống bắt buộc bắn lỗi: *"Sai định dạng dữ liệu (chỉ chấp nhận 1 hoặc 0)"*.

### 3.3.2. Quy chuẩn nhất quán giữa nhãn giao diện và bảng mô tả chức năng

Để đảm bảo tính đồng nhất tuyệt đối giữa thiết kế giao diện (UI/UX) và tài liệu đặc tả chức năng (SRS):
- **Tên chức năng trong bảng mô tả**: Bắt buộc phải ghi chính xác theo nhãn (label)/tên hiển thị của nút bấm, trường thông tin hoặc chức năng trên màn hình thiết kế. Không tự ý sáng tạo hoặc diễn giải dài dòng.
- **Ví dụ cụ thể**:
  - Nếu nút bấm trên thiết kế giao diện là **[Thêm mới]**, tên chức năng trong bảng mô tả SRS phải ghi là **Thêm mới** (không ghi là *Thêm mới quyền*, *Thêm mới thông tin*,...).
  - Nếu nút là **[Lưu]**, tên chức năng phải là **Lưu** (không ghi là *Lưu thông tin*, *Lưu cấu hình*,...).
  - Nếu nút là **[Hủy]**, tên chức năng phải là **Hủy** (không ghi là *Hủy thao tác*,...).
  - Nếu nút là **[Sửa]**, tên chức năng phải là **Sửa** (không ghi là *Sửa chức năng*,...).
  - Nếu nút là **[Cập nhật]**, tên chức năng phải là **Cập nhật** (không ghi là *Cập nhật phân quyền*,...).

Quy chuẩn này là bắt buộc đối với tất cả các tài liệu đặc tả Use Case nhằm tránh gây hiểu lầm hoặc sai lệch giữa đội ngũ Thiết kế, Lập trình và Kiểm thử.

### 3.3.3. Quy chuẩn phân trang danh sách (Pagination)

Áp dụng thống nhất cho mọi màn hình danh sách/bảng dữ liệu trong toàn hệ thống, trừ khi SRS của màn hình cụ thể nêu rõ lý do cần áp dụng khác:

- Giá trị số bản ghi/trang cho phép chọn: `10`, `20`, `50`, `100`.
- Giá trị mặc định khi mở màn hình lần đầu: `20 bản ghi/trang`.

Tham chiếu quy tắc [BR-UI-001] tại Danh mục Business Rule (`04_Danh_muc_va_Phu_luc.md`). Các tài liệu SRS đặc tả từng màn hình không lặp lại đầy đủ bộ giá trị này; chỉ cần ghi mặc định của màn hình và tham chiếu [BR-UI-001].

# 4. ĐẶC TẢ CHI TIẾT YÊU CẦU CHỨC NĂNG
