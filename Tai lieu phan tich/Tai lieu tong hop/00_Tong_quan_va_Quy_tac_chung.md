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

- (Cập nhật quy trình nghiệp vụ L1, L2 tại đây)

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
| **[DM_15]** | Phường/Xã                                      | *Danh mục động. Lọc theo Mã Tỉnh/TP (Cascading).* |
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
| **[DM_47]** | Trạng thái hồ sơ xem xét trách nhiệm hoàn trả | \- Chờ thành lập Hội đồng<br>- Chờ duyệt QĐ thành lập<br>- Từ chối duyệt QĐ thành lập<br>- Đang họp Hội đồng<br>- Không xem xét trách nhiệm hoàn trả<br>- Chờ trình ký QĐ hoàn trả<br>- Chờ duyệt QĐ hoàn trả<br>- Từ chối duyệt QĐ hoàn trả<br>- Chờ ban hành QĐ hoàn trả<br>- Đang thi hành thu hồi<br>- Hoàn thành |
| **[DM_48]** | Mức độ lỗi của người thi hành công vụ gây thiệt hại | \- Lỗi vô ý gây hậu quả không nghiêm trọng<br>- Lỗi vô ý gây hậu quả nghiêm trọng<br>- Lỗi cố ý |
| **[DM_49]** | Phương thức thực hiện hoàn trả | \- Nộp một lần<br>- Nộp nhiều lần |
| **[DM_50]** | Hình thức nộp tiền hoàn trả | \- Khấu trừ lương tại cơ quan<br>- BHXH khấu trừ lương hưu<br>- Nộp tiền mặt trực tiếp<br>- Chuyển khoản vào Kho bạc Nhà nước |
| **[DM_51]** | Nhiệm vụ thành viên Hội đồng xem xét trách nhiệm hoàn trả | \- Chủ tịch Hội đồng<br>- Phó Chủ tịch Hội đồng<br>- Thư ký Hội đồng<br>- Ủy viên<br>- Khác (người dùng nhập tên nhiệm vụ cụ thể) |
| **[DM_52]** | Lý do hoãn thực hiện nghĩa vụ hoàn trả | \- Đang mắc bệnh hiểm nghèo cần điều trị nội trú lâu dài<br>- Hoàn cảnh gia đình đặc biệt khó khăn (mất mùa, thiên tai)<br>- Lý do bất khả kháng khác được cơ quan có thẩm quyền xác nhận |
| **[DM_53]** | Hình thức ban hành văn bản | \- Ký số trên hệ thống<br>- Ký ngoài hệ thống |


## 3.3. Các Quy tắc Xử lý Dùng chung (Common Processing Rules)

Toàn bộ các quy tắc xử lý kỹ thuật và nghiệp vụ dùng chung trên toàn hệ thống Xem tại Phụ lục kèm theo tài liệu bao gồm: 
\- Danh mục Business Rules `[BR]`,
\- Danh mục MessageList `[MSG]`
\- Tooltip & Hướng dẫn
\- Danh mục Popup Dùng chung `[POPUP]`, 
\- Quy chuẩn Kết xuất Excel
\- Quy chuẩn Nhận file/Import Excel,
\- và Quy chuẩn Phân trang

# 4. ĐẶC TẢ CHI TIẾT YÊU CẦU CHỨC NĂNG

