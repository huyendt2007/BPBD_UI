# Phân tích biểu mẫu báo cáo BTNN theo Thông tư 08/2019/TT-BTP

## 1. Thông tin nguồn

| Nội dung | Thông tin |
|---|---|
| Văn bản | Thông tư số 08/2019/TT-BTP ngày 10/12/2019 của Bộ Tư pháp |
| Tên văn bản | Quy định biện pháp thực hiện chức năng quản lý nhà nước về công tác bồi thường nhà nước |
| File nguồn nội bộ | `Tai lieu he thong/Tai lieu du an/8. Văn bản PL/Boi thuong nha nuoc/20191210_08_2019_TT-BTP_BPthuchienQLNN ve BTNN.doc` |
| File PDF nguồn nội bộ | `Tai lieu he thong/Tai lieu du an/8. Văn bản PL/Boi thuong nha nuoc/20191210_08_2019_TT-BTP_BPthuchienQLNN ve BTNN.pdf` |
| Mục đích tài liệu này | Chuẩn hóa danh sách biểu mẫu, trường dữ liệu và quy tắc tổng hợp để phục vụ thiết kế chức năng lập báo cáo, thống kê, kết xuất biểu mẫu trên hệ thống BTNN |

## 2. Phạm vi biểu mẫu cần xây dựng

Thông tư 08/2019/TT-BTP ban hành kèm theo 05 biểu mẫu phục vụ theo dõi, báo cáo, thống kê công tác bồi thường nhà nước.

| Mã biểu mẫu | Tên biểu mẫu | Căn cứ trong Thông tư | Tính chất hệ thống |
|---|---|---|---|
| BM01-TT08 | Danh mục vụ việc giải quyết yêu cầu bồi thường | Điều 10 | Danh sách chi tiết theo vụ việc |
| BM02-TT08 | Báo cáo công tác bồi thường nhà nước năm | Điều 24 | Báo cáo thuyết minh, nhập nội dung đánh giá và tổng hợp phụ lục số liệu |
| BM03-TT08 | Tổng hợp tình hình yêu cầu bồi thường, giải quyết bồi thường và chi trả tiền bồi thường | Điều 24 | Bảng thống kê tổng hợp theo lĩnh vực phát sinh thiệt hại |
| BM04-TT08 | Tình hình thực hiện trách nhiệm hoàn trả | Điều 24 | Bảng thống kê tổng hợp trách nhiệm hoàn trả |
| BM05-TT08 | Sổ thụ lý hồ sơ yêu cầu bồi thường tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại | Phụ lục biểu mẫu | Sổ theo dõi chi tiết quá trình xử lý từng vụ việc |

## 3. Quy tắc chung khi thiết kế dữ liệu biểu mẫu

| Nhóm quy tắc | Nội dung áp dụng |
|---|---|
| Định danh vụ việc | Trên hệ thống sử dụng thống nhất tên trường `Mã vụ việc`. Trường này dùng để liên kết dữ liệu giữa tiếp nhận yêu cầu bồi thường, giải quyết yêu cầu bồi thường, quyết định giải quyết, cấp kinh phí, chi trả, hoàn trả và phục hồi danh dự. |
| Thông tin vụ việc tối thiểu | Mỗi vụ việc cần có `Mã vụ việc`, `Tên vụ việc`, `Hình thức tiếp nhận hồ sơ`, `Lĩnh vực phát sinh thiệt hại`, `Người yêu cầu bồi thường`, `Địa chỉ chi tiết`, `Tỉnh/TP`, `Cơ quan giải quyết bồi thường`, `Thời điểm tiếp nhận`, `Trạng thái vụ việc`. |
| Lĩnh vực phát sinh thiệt hại | Dữ liệu thống kê cần phân nhóm theo 06 lĩnh vực: quản lý hành chính, tố tụng hình sự, tố tụng dân sự, tố tụng hành chính, thi hành án hình sự, thi hành án dân sự. |
| Đơn vị tiền | Các bảng thống kê theo Thông tư sử dụng đơn vị `nghìn đồng` đối với số tiền bồi thường, số tiền chi trả, số tiền hoàn trả. Khi nguồn nghiệp vụ lưu theo đồng, hệ thống cần quy đổi khi lập biểu mẫu. |
| File đính kèm | Các báo cáo/biểu mẫu sinh từ hệ thống cần lưu file kết xuất và cho phép đính kèm tài liệu liên quan nếu nghiệp vụ báo cáo yêu cầu. |
| Lịch sử số liệu | Dữ liệu báo cáo phải lưu kỳ báo cáo, đơn vị báo cáo, ngày chốt số liệu, người lập, người duyệt và phiên bản kết xuất. |
| Kết xuất | Nên hỗ trợ xuất Excel để tổng hợp số liệu, Word/PDF để trình ký hoặc gửi cơ quan quản lý nhà nước. |

## 4. Kỳ báo cáo và quy tắc tính số liệu

| Nội dung | Quy tắc |
|---|---|
| Báo cáo năm với số liệu thực tế | Lấy số liệu từ ngày 01/01 đến hết ngày 31/10 hằng năm. |
| Hạn Bộ Tư pháp nhận báo cáo năm | Trước ngày 08/12 của năm báo cáo. |
| Số liệu thống kê năm chính thức | Lấy số liệu từ ngày 01/01 đến hết ngày 31/12 hằng năm. |
| Hạn Bộ Tư pháp nhận số liệu chính thức | Trước ngày 31/01 của năm sau. |
| Số liệu ước tính | `Số liệu ước tính = Tổng số liệu thực tế x Số tháng ước tính / Số tháng lấy số liệu thực tế`. Với báo cáo 10 tháng đầu năm, công thức tương đương `Số liệu thực tế x 1.2`. |
| Làm tròn | Nếu phần thập phân từ 0,5 trở lên thì làm tròn lên; nếu nhỏ hơn 0,5 thì làm tròn xuống. |
| Ngày nghỉ, ngày lễ | Nếu thời hạn nhận báo cáo trùng ngày nghỉ hoặc ngày lễ thì tính sang ngày làm việc tiếp theo. |

## 5. Trạng thái vụ việc phục vụ tổng hợp báo cáo

| Nhóm trạng thái báo cáo | Trạng thái vụ việc trên hệ thống | Ghi chú tổng hợp |
|---|---|---|
| Chờ hoàn thiện, kiểm tra đầu vào | Chờ nhập liệu, Yêu cầu bổ sung, Chờ kiểm tra | Phục vụ theo dõi nội bộ; chưa tính là đã thụ lý nếu chưa có thao tác tiếp nhận/thụ lý theo quy trình nghiệp vụ. |
| Chờ xử lý thụ lý | Chờ thụ lý | Là vụ việc đã qua kiểm tra hồ sơ và chờ lãnh đạo/đơn vị có thẩm quyền thực hiện thụ lý. |
| Đang giải quyết | Đang xác minh thiệt hại, Đang thương lượng, Chờ ban hành quyết định, Chờ thực thi, Đang thực thi theo bản án | Được đưa vào nhóm đang giải quyết khi lập bảng thống kê tiến độ. |
| Tạm dừng xử lý | Hoãn giải quyết, Tạm đình chỉ giải quyết | Vẫn là vụ việc đang tồn tại trong quá trình giải quyết, cần theo dõi riêng để phục vụ sổ thụ lý và báo cáo. |
| Đình chỉ | Đình chỉ giải quyết | Tính vào nhóm đình chỉ khi lập BM03 và ghi rõ tại BM05. |
| Từ chối | Từ chối tiếp nhận, Từ chối thụ lý, Bị từ chối | Theo dõi nội bộ và tra cứu, không tính là vụ việc đã giải quyết bồi thường có văn bản có hiệu lực nếu không phát sinh quyết định giải quyết bồi thường. |
| Hoàn thành | Hoàn thành | Vụ việc kết thúc xử lý trên hệ thống; tùy nghiệp vụ có thể đồng thời có số liệu chi trả, phục hồi danh dự hoặc hoàn trả. |

## 6. BM01-TT08 - Danh mục vụ việc giải quyết yêu cầu bồi thường

### 6.1. Mục đích

BM01 dùng để lập danh mục chi tiết các vụ việc giải quyết yêu cầu bồi thường hằng năm. Biểu mẫu phục vụ theo dõi tiến độ, tổng hợp tình hình giải quyết và gửi kèm báo cáo công tác bồi thường nhà nước.

### 6.2. Cấu trúc dữ liệu đề xuất

| STT | Trường trên biểu mẫu | Kiểu dữ liệu | Bắt buộc | Nguồn dữ liệu hệ thống | Ghi chú xử lý |
|---|---|---|---|---|---|
| 1 | STT | Number | Có | Hệ thống tự sinh | Đánh số theo thứ tự hiển thị trong từng nhóm lĩnh vực. |
| 2 | Mã vụ việc | String | Có | Hồ sơ vụ việc BTNN | Bổ sung để hệ thống quản lý, tra cứu và đối chiếu dữ liệu. Khi kết xuất đúng mẫu pháp lý có thể ẩn nếu biểu mẫu gốc không yêu cầu. |
| 3 | Tên vụ việc | String | Có | Tiếp nhận YCBT/Giải quyết YCBT | Bổ sung để người dùng nhận diện nhanh vụ việc trên hệ thống. |
| 4 | Họ và tên của người yêu cầu bồi thường | String | Có | Tiếp nhận YCBT | Với tổ chức, ghi tên tổ chức và người đại diện theo pháp luật nếu có. |
| 5 | Địa chỉ của người yêu cầu bồi thường | String | Có | Tiếp nhận YCBT | Gồm địa chỉ chi tiết và Tỉnh/TP. |
| 6 | Cơ quan giải quyết bồi thường | String | Có | Xác định cơ quan/Giải quyết YCBT | Là cơ quan trực tiếp giải quyết hoặc cơ quan tham gia theo vụ việc. |
| 7 | Pháp luật áp dụng để giải quyết bồi thường | String | Có | Nhập liệu hồ sơ vụ việc | Ghi căn cứ pháp luật áp dụng trong quá trình giải quyết. |
| 8 | Tình hình giải quyết bồi thường | Text | Có | Trạng thái vụ việc và lịch sử xử lý | Mô tả ngắn trạng thái hiện tại, mốc xử lý chính, kết quả đã có nếu có. |
| 9 | Chi trả tiền bồi thường | Text/Amount | Không | Cấp kinh phí, chi trả | Ghi tình trạng chi trả và số tiền đã chi trả nếu có. |
| 10 | Khó khăn, vướng mắc | Text | Không | Người lập báo cáo nhập | Nhập thủ công hoặc chọn từ danh mục vướng mắc. |
| 11 | Ghi chú | Text | Không | Người lập báo cáo nhập | Thông tin bổ sung phục vụ quản lý. |

### 6.3. Nhóm dòng trên biểu mẫu

| Mã nhóm | Nhóm lĩnh vực |
|---|---|
| I | Trong hoạt động quản lý hành chính |
| II | Trong hoạt động tố tụng hình sự |
| III | Trong hoạt động tố tụng dân sự |
| IV | Trong hoạt động tố tụng hành chính |
| V | Trong hoạt động thi hành án hình sự |
| VI | Trong hoạt động thi hành án dân sự |
| TC | Tổng cộng |

### 6.4. Gợi ý chức năng hệ thống

| Chức năng | Mô tả |
|---|---|
| Lọc kỳ báo cáo | Cho phép chọn năm báo cáo, khoảng ngày chốt số liệu và đơn vị báo cáo. |
| Sinh danh mục | Hệ thống tự tổng hợp vụ việc theo lĩnh vực phát sinh thiệt hại. |
| Chỉnh sửa nội dung thuyết minh | Cho phép nhập khó khăn, vướng mắc và ghi chú trước khi kết xuất. |
| Kết xuất | Xuất Excel để rà soát, xuất Word/PDF để trình ký. |

## 7. BM02-TT08 - Báo cáo công tác bồi thường nhà nước năm

### 7.1. Mục đích

BM02 là báo cáo thuyết minh tổng hợp tình hình thực hiện công tác bồi thường nhà nước trong năm. Biểu mẫu này cần lấy số liệu từ các bảng tổng hợp, đồng thời cho phép người lập báo cáo nhập đánh giá, nhiệm vụ, giải pháp và kiến nghị.

### 7.2. Cấu trúc nội dung báo cáo

| STT | Khối nội dung | Kiểu nhập liệu | Nguồn dữ liệu gợi ý | Ghi chú xử lý |
|---|---|---|---|---|
| 1 | Kết quả công tác bồi thường năm | Section | Hệ thống + người lập báo cáo | Khối cha của các nội dung kết quả. |
| 2 | Tình hình yêu cầu bồi thường, kết quả giải quyết bồi thường | Rich text + số liệu tổng hợp | BM03, danh sách vụ việc | Nêu tình hình phát sinh, tiếp nhận, giải quyết, tồn đọng. |
| 3 | Cấp phát kinh phí và chi trả tiền bồi thường | Rich text + số liệu tổng hợp | Module cấp kinh phí, chi trả | Nêu số vụ việc, số tiền đã cấp, số tiền đã chi trả. |
| 4 | Xác định trách nhiệm hoàn trả | Rich text + số liệu tổng hợp | BM04, module hoàn trả | Nêu số vụ việc xem xét, quyết định hoàn trả, số tiền hoàn trả. |
| 5 | Xử lý kỷ luật người thi hành công vụ gây thiệt hại | Rich text | Nhập báo cáo hoặc nguồn quản lý cán bộ | Có thể nhập thủ công nếu hệ thống chưa có module kỷ luật. |
| 6 | Kết quả thực hiện công tác bồi thường nhà nước | Rich text | Người lập báo cáo nhập | Bao gồm kế hoạch công tác, thể chế, phổ biến pháp luật, hướng dẫn nghiệp vụ, theo dõi, đôn đốc, kiểm tra, khiếu nại tố cáo, phối hợp và báo cáo thống kê. |
| 7 | Đánh giá chung | Rich text | Người lập báo cáo nhập | Gồm kết quả đạt được, vướng mắc, bất cập và nguyên nhân. |
| 8 | Nhiệm vụ trọng tâm và giải pháp năm sau | Rich text | Người lập báo cáo nhập | Cho phép dùng mẫu nội dung năm trước để chỉnh sửa. |
| 9 | Đề xuất, kiến nghị | Rich text | Người lập báo cáo nhập | Ghi kiến nghị gửi cơ quan quản lý nhà nước có thẩm quyền. |
| 10 | Nơi nhận, người ký | Form fields | Cấu hình đơn vị/người dùng | Phục vụ kết xuất văn bản. |

### 7.3. Gợi ý chức năng hệ thống

| Chức năng | Mô tả |
|---|---|
| Tạo báo cáo năm | Chọn năm báo cáo, đơn vị báo cáo, loại số liệu thực tế/chính thức. |
| Tự động lấy số liệu | Lấy số liệu từ BM01, BM03, BM04 và các module nghiệp vụ liên quan. |
| Nhập nội dung thuyết minh | Cho phép soạn thảo nội dung báo cáo theo từng khối. |
| Kiểm tra thiếu dữ liệu | Cảnh báo nếu chưa có số liệu chi trả, hoàn trả, phục hồi danh dự hoặc nội dung bắt buộc. |
| Kết xuất văn bản | Xuất Word/PDF theo mẫu báo cáo. |

## 8. BM03-TT08 - Tổng hợp tình hình yêu cầu bồi thường, giải quyết bồi thường và chi trả tiền bồi thường

### 8.1. Mục đích

BM03 là bảng thống kê số liệu trọng tâm về thụ lý, giải quyết và chi trả tiền bồi thường. Dữ liệu cần tổng hợp theo từng lĩnh vực phát sinh thiệt hại và theo kỳ báo cáo.

### 8.2. Cấu trúc chỉ tiêu

| Số thứ tự chỉ tiêu | Tên chỉ tiêu | Đơn vị | Công thức/nguồn tính |
|---|---|---|---|
| 1 | Tổng số vụ việc thụ lý | Vụ việc | `2 + 3 + 4 + 5 + 6 + 7 + 8 + 9` |
| 2 | Số vụ việc thụ lý mới tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại | Vụ việc | Đếm vụ việc thụ lý mới trong kỳ tại cơ quan trực tiếp quản lý. |
| 3 | Số vụ việc thụ lý mới tại Tòa án theo điểm a khoản 1 Điều 52 | Vụ việc | Đếm vụ việc khởi kiện vụ án dân sự theo nhóm tương ứng. |
| 4 | Số vụ việc thụ lý mới tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52 | Vụ việc | Đếm vụ việc khởi kiện theo nhóm tương ứng. |
| 5 | Số vụ việc yêu cầu bồi thường trong quá trình tố tụng hình sự, tố tụng hành chính | Vụ việc | Đếm vụ việc yêu cầu bồi thường trong quá trình tố tụng. |
| 6 | Số vụ việc kỳ trước chuyển sang tại cơ quan trực tiếp quản lý | Vụ việc | Đếm vụ việc đã thụ lý trước kỳ báo cáo và còn chuyển sang kỳ này. |
| 7 | Số vụ việc kỳ trước chuyển sang tại Tòa án theo điểm a khoản 1 Điều 52 | Vụ việc | Đếm vụ việc chuyển kỳ theo nhóm tương ứng. |
| 8 | Số vụ việc kỳ trước chuyển sang tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52 | Vụ việc | Đếm vụ việc chuyển kỳ theo nhóm tương ứng. |
| 9 | Số vụ việc kỳ trước chuyển sang trong quá trình tố tụng hình sự, tố tụng hành chính | Vụ việc | Đếm vụ việc chuyển kỳ theo nhóm tương ứng. |
| 10 | Tổng số vụ việc đã có văn bản giải quyết bồi thường có hiệu lực pháp luật | Vụ việc | `11 + 12 + 13 + 14` |
| 11 | Đã giải quyết tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại | Vụ việc | Đếm vụ việc có quyết định giải quyết bồi thường có hiệu lực tại cơ quan trực tiếp quản lý. |
| 12 | Đã giải quyết tại Tòa án theo điểm a khoản 1 Điều 52 | Vụ việc | Đếm vụ việc đã có bản án/quyết định có hiệu lực theo nhóm tương ứng. |
| 13 | Đã giải quyết tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52 | Vụ việc | Đếm vụ việc đã có bản án/quyết định có hiệu lực theo nhóm tương ứng. |
| 14 | Đã giải quyết trong quá trình tố tụng hình sự, tố tụng hành chính | Vụ việc | Đếm vụ việc đã có văn bản giải quyết có hiệu lực trong quá trình tố tụng. |
| 15 | Số tiền bồi thường theo văn bản có hiệu lực pháp luật | Nghìn đồng | Tổng số tiền bồi thường theo quyết định/bản án có hiệu lực trong kỳ. |
| 16 | Tổng số vụ việc đang giải quyết | Vụ việc | `17 + 18 + 19 + 20` |
| 17 | Đang giải quyết tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại | Vụ việc | Đếm vụ việc đang xử lý tại cơ quan trực tiếp quản lý, bao gồm vụ việc hoãn hoặc tạm đình chỉ nếu chưa kết thúc. |
| 18 | Đang giải quyết tại Tòa án theo điểm a khoản 1 Điều 52 | Vụ việc | Đếm vụ việc đang giải quyết tại Tòa án theo nhóm tương ứng. |
| 19 | Đang giải quyết tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52 | Vụ việc | Đếm vụ việc đang giải quyết tại Tòa án theo nhóm tương ứng. |
| 20 | Đang giải quyết tại Tòa án trong quá trình tố tụng hình sự, tố tụng hành chính | Vụ việc | Đếm vụ việc đang giải quyết theo thủ tục tố tụng. |
| 21 | Đình chỉ tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại | Vụ việc | Đếm vụ việc có trạng thái đình chỉ giải quyết tại cơ quan trực tiếp quản lý. |
| 22 | Đình chỉ theo thủ tục tố tụng tại Tòa án | Vụ việc | Đếm vụ việc bị đình chỉ tại Tòa án. |
| 23 | Số vụ việc đã chi trả | Vụ việc | Đếm vụ việc đã chi trả xong tiền bồi thường. |
| 24 | Số tiền đã chi trả theo quyết định có hiệu lực của cơ quan trực tiếp quản lý người thi hành công vụ | Nghìn đồng | Tổng số tiền đã chi trả theo quyết định của cơ quan trực tiếp quản lý. |
| 25 | Số tiền đã chi trả theo bản án, quyết định có hiệu lực của Tòa án | Nghìn đồng | Tổng số tiền đã chi trả theo bản án/quyết định của Tòa án. |
| 26 | Ghi chú nội bộ hệ thống | Text | Không thuộc chỉ tiêu pháp lý chính; dùng để lưu cảnh báo sai lệch, nguồn số liệu hoặc giải trình khi cần. |

### 8.3. Dòng dữ liệu

| Mã dòng | Nhóm lĩnh vực |
|---|---|
| I | Trong hoạt động quản lý hành chính |
| II | Trong hoạt động tố tụng hình sự |
| III | Trong hoạt động tố tụng dân sự |
| IV | Trong hoạt động tố tụng hành chính |
| V | Trong hoạt động thi hành án hình sự |
| VI | Trong hoạt động thi hành án dân sự |
| TC | Tổng cộng |

### 8.4. Kiểm soát dữ liệu

| Kiểm soát | Cách xử lý |
|---|---|
| Không trùng vụ việc | Một `Mã vụ việc` chỉ được tính một lần trong cùng kỳ báo cáo, cùng lĩnh vực và cùng chỉ tiêu. |
| Kiểm tra tổng ngang | Hệ thống tự kiểm tra các công thức `1 = 2+3+4+5+6+7+8+9`, `10 = 11+12+13+14`, `16 = 17+18+19+20`. |
| Kiểm tra tổng dọc | Dòng tổng cộng bằng tổng các dòng lĩnh vực I đến VI. |
| Tiền theo nghìn đồng | Khi nguồn nghiệp vụ lưu theo đồng, kết xuất cần chia 1.000 và áp dụng quy tắc làm tròn thống nhất. |
| Giải trình số liệu | Cho phép lưu ghi chú/chênh lệch khi số liệu được điều chỉnh thủ công bởi người lập báo cáo có quyền. |

## 9. BM04-TT08 - Tình hình thực hiện trách nhiệm hoàn trả

### 9.1. Mục đích

BM04 dùng để thống kê tình hình xem xét trách nhiệm hoàn trả, số tiền phải hoàn trả, số tiền đã thu hồi và số tiền còn phải hoàn trả đối với người thi hành công vụ gây thiệt hại.

### 9.2. Cấu trúc chỉ tiêu

| Số thứ tự chỉ tiêu | Tên chỉ tiêu | Đơn vị | Công thức/nguồn tính |
|---|---|---|---|
| 1 | STT/nhóm lĩnh vực | Text | Hiển thị theo nhóm lĩnh vực hoặc dòng tổng. |
| 2 | Số tiền đã chi trả xong cho người yêu cầu bồi thường | Nghìn đồng | Tổng tiền đã chi trả xong, làm căn cứ xem xét hoàn trả. |
| 3 | Tổng số vụ việc xem xét trách nhiệm hoàn trả | Vụ việc | `4 + 6` |
| 4 | Số vụ việc có quyết định hoàn trả có hiệu lực pháp luật và đã thực hiện hoàn trả | Vụ việc | Đếm vụ việc đã có quyết định hoàn trả có hiệu lực và có phát sinh thực hiện hoàn trả. |
| 5 | Số tiền phải hoàn trả | Nghìn đồng | Tổng số tiền phải hoàn trả theo quyết định hoàn trả. |
| 6 | Số vụ việc đang xem xét trách nhiệm hoàn trả | Vụ việc | Đếm vụ việc đang ở quy trình xem xét trách nhiệm hoàn trả. |
| 7 | Số vụ việc không xem xét do người thi hành công vụ không có lỗi | Vụ việc | Đếm vụ việc được xác định không xem xét trách nhiệm hoàn trả theo lý do tương ứng. |
| 8 | Số vụ việc không xem xét do người thi hành công vụ chết trước khi ra quyết định hoàn trả | Vụ việc | Đếm vụ việc không xem xét theo lý do tương ứng. |
| 9 | Số vụ việc được giảm mức hoàn trả | Vụ việc | Đếm vụ việc có quyết định giảm mức hoàn trả. |
| 10 | Số tiền được giảm hoàn trả | Nghìn đồng | Tổng số tiền được giảm. |
| 11 | Số vụ việc hoãn hoàn trả | Vụ việc | Đếm vụ việc được hoãn thực hiện hoàn trả. |
| 12 | Tổng số tiền đã hoàn trả | Nghìn đồng | `13 + 14` |
| 13 | Số tiền đã hoàn trả trong kỳ báo cáo | Nghìn đồng | Tổng tiền đã thu hồi trong kỳ báo cáo. |
| 14 | Số tiền đã hoàn trả kỳ trước chuyển sang | Nghìn đồng | Tổng tiền kỳ trước chuyển sang và tiếp tục thu hồi trong kỳ này. |
| 15 | Số tiền còn phải hoàn trả | Nghìn đồng | Tổng tiền còn phải thu hồi sau khi trừ số đã hoàn trả và số được giảm nếu có. |

### 9.3. Kiểm soát dữ liệu

| Kiểm soát | Cách xử lý |
|---|---|
| Quan hệ với chi trả bồi thường | Chỉ xem xét trách nhiệm hoàn trả khi đã có căn cứ về số tiền chi trả hoặc quyết định/bản án liên quan. |
| Tránh tính trùng | Một người thi hành công vụ trong cùng một vụ việc cần được gắn định danh riêng để thống kê đúng trường hợp có nhiều người liên quan. |
| Theo dõi giảm, hoãn | Các quyết định giảm mức hoàn trả và hoãn hoàn trả cần lưu riêng số quyết định, ngày quyết định, lý do và file đính kèm. |
| Tổng hợp tiền | Các chỉ tiêu tiền sử dụng đơn vị nghìn đồng khi kết xuất theo biểu mẫu. |

## 10. BM05-TT08 - Sổ thụ lý hồ sơ yêu cầu bồi thường

### 10.1. Mục đích

BM05 là sổ theo dõi chi tiết toàn bộ quá trình thụ lý và giải quyết một vụ việc tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại. Trên hệ thống, biểu mẫu này nên được sinh từ lịch sử xử lý vụ việc, hồ sơ tài liệu, quyết định và các mốc nghiệp vụ đã nhập.

### 10.2. Cấu trúc dữ liệu đề xuất

| STT | Trường trên sổ | Kiểu dữ liệu | Bắt buộc | Nguồn dữ liệu hệ thống | Ghi chú xử lý |
|---|---|---|---|---|---|
| 1 | STT | Number | Có | Hệ thống tự sinh | Đánh số theo ngày thụ lý hoặc tiêu chí sắp xếp người dùng chọn. |
| 2 | Mã vụ việc | String | Có | Hồ sơ vụ việc BTNN | Bổ sung để quản lý hệ thống, tra cứu và liên kết dữ liệu. |
| 3 | Tên vụ việc | String | Có | Tiếp nhận YCBT/Giải quyết YCBT | Bổ sung theo yêu cầu quản lý vụ việc trên hệ thống. |
| 4 | Ngày thụ lý | Date/Text | Có | Thao tác thụ lý | Ghi ngày thụ lý và ngày ra thông báo thụ lý. |
| 5 | Họ tên, địa chỉ | String | Có | Tiếp nhận YCBT | Gồm họ tên người yêu cầu, địa chỉ chi tiết, Tỉnh/TP. |
| 6 | Văn bản làm căn cứ yêu cầu bồi thường | Text/File | Có | Nhập liệu hồ sơ vụ việc | Ghi số ký hiệu, ngày ban hành, kết quả xem xét lại nếu có. |
| 7 | Cử người giải quyết bồi thường | Text/File | Có | Phân công xử lý | Ghi người được cử, chức danh, số ký hiệu và ngày ban hành văn bản cử người giải quyết. |
| 8 | Tạm ứng kinh phí bồi thường | Text/Amount/File | Không | Cấp kinh phí tạm ứng | Ghi số văn bản, ngày ban hành, số tiền tạm ứng. |
| 9 | Xác minh thiệt hại | Text/File | Có | Xác minh thiệt hại | Ghi cách thức xác minh, thỏa thuận kéo dài thời hạn nếu có, ngày báo cáo xác minh. |
| 10 | Thương lượng việc bồi thường | Text/File | Có | Thương lượng | Ghi các lần thương lượng và ngày lập biên bản kết quả thương lượng. |
| 11 | Ra quyết định giải quyết bồi thường | Text/File | Có khi phát sinh | Quyết định giải quyết bồi thường | Ghi số, ngày quyết định, ngày trao quyết định, biên bản không nhận quyết định nếu có, quyết định sửa chữa/bổ sung nếu có. |
| 12 | Cấp kinh phí bồi thường | Text/File | Có khi phát sinh | Cấp kinh phí bồi thường | Ghi ngày, số ký hiệu văn bản cấp kinh phí. |
| 13 | Chi trả tiền bồi thường | Text/Amount/File | Có khi phát sinh | Chi trả tiền bồi thường | Ghi thông báo chi trả và ngày chi trả thực tế. |
| 14 | Hoãn/Tạm đình chỉ/Đình chỉ việc giải quyết yêu cầu bồi thường | Text/File | Không | Thao tác Hoãn giải quyết trên màn giải quyết YCBT | Ghi ngày, số quyết định, loại quyết định, lý do và tài liệu liên quan. |
| 15 | Khởi kiện yêu cầu Tòa án giải quyết bồi thường | Text/File | Không | Nhập liệu bổ sung/lịch sử xử lý | Ghi lý do, ngày khởi kiện, thông tin Tòa án thụ lý nếu có. |
| 16 | Phục hồi danh dự | Text/File | Không | Module phục hồi danh dự | Ghi ngày, địa điểm xin lỗi/cải chính công khai, thông tin báo đăng nếu có. |

### 10.3. Gợi ý chức năng hệ thống

| Chức năng | Mô tả |
|---|---|
| Sinh sổ thụ lý | Tự động sinh từ danh sách vụ việc đã thụ lý theo cơ quan, năm và lĩnh vực phát sinh thiệt hại. |
| Xem chi tiết vụ việc | Row click từ dòng sổ để mở màn chi tiết vụ việc, không cần thêm thao tác xem chi tiết trên từng dòng. |
| Đính kèm tài liệu | Mỗi mốc nghiệp vụ cho phép liên kết nhiều tài liệu hoặc quyết định tương ứng. |
| Cảnh báo thiếu mốc | Cảnh báo khi vụ việc ở trạng thái sau nhưng thiếu dữ liệu mốc trước, ví dụ đã thương lượng nhưng chưa có báo cáo xác minh. |
| Kết xuất | Xuất Excel để quản lý nội bộ; xuất PDF/Word khi cần in hoặc lưu trữ sổ. |

## 11. Dữ liệu danh mục cần chuẩn bị

| Mã danh mục | Tên danh mục | Giá trị khởi tạo |
|---|---|---|
| DM_BTNN_LINH_VUC_THIET_HAI | Lĩnh vực phát sinh thiệt hại | Quản lý hành chính; Tố tụng hình sự; Tố tụng dân sự; Tố tụng hành chính; Thi hành án hình sự; Thi hành án dân sự |
| DM_BTNN_CO_QUAN_BAO_CAO | Loại cơ quan báo cáo | UBND cấp tỉnh; Tòa án nhân dân tối cao; Viện kiểm sát nhân dân tối cao; Bộ/cơ quan ngang Bộ |
| DM_BTNN_LOAI_KY_BAO_CAO | Loại kỳ báo cáo | Báo cáo năm số liệu thực tế; Số liệu thống kê năm chính thức |
| DM_BTNN_NGUON_THU_LY | Nguồn thụ lý | Cơ quan trực tiếp quản lý người thi hành công vụ; Tòa án theo điểm a khoản 1 Điều 52; Tòa án theo điểm b khoản 1 và khoản 2 Điều 52; Trong quá trình tố tụng hình sự/tố tụng hành chính |
| DM_BTNN_NHOM_TRANG_THAI_BAO_CAO | Nhóm trạng thái báo cáo | Chờ hoàn thiện, kiểm tra đầu vào; Chờ xử lý thụ lý; Đang giải quyết; Tạm dừng xử lý; Đình chỉ; Từ chối; Hoàn thành |
| DM_BTNN_LOAI_VAN_BAN_BAO_CAO | Loại văn bản/tài liệu báo cáo | Quyết định giải quyết bồi thường; Bản án/quyết định của Tòa án; Quyết định hoàn trả; Quyết định giảm mức hoàn trả; Quyết định hoãn hoàn trả; Thông báo chi trả; Tài liệu khác |

## 12. Đề xuất màn hình nghiệp vụ báo cáo

| Mã màn hình | Tên màn hình | Mục đích | Biểu mẫu liên quan |
|---|---|---|---|
| MH-TT08-01 | Quản lý kỳ báo cáo BTNN | Tạo kỳ báo cáo, chọn đơn vị, loại kỳ, thời gian lấy số liệu và trạng thái lập báo cáo. | BM01, BM02, BM03, BM04 |
| MH-TT08-02 | Danh mục vụ việc giải quyết yêu cầu bồi thường | Tra cứu, rà soát, bổ sung thông tin danh mục vụ việc trước khi kết xuất. | BM01 |
| MH-TT08-03 | Báo cáo công tác bồi thường nhà nước năm | Soạn báo cáo thuyết minh, tự động lấy số liệu tổng hợp và xuất văn bản. | BM02 |
| MH-TT08-04 | Tổng hợp yêu cầu bồi thường, giải quyết và chi trả | Xem bảng số liệu tổng hợp theo 06 lĩnh vực, kiểm tra công thức và kết xuất Excel. | BM03 |
| MH-TT08-05 | Thống kê trách nhiệm hoàn trả | Xem bảng số liệu hoàn trả, giảm, hoãn, thu hồi và còn phải hoàn trả. | BM04 |
| MH-TT08-06 | Sổ thụ lý vụ việc bồi thường | Theo dõi chi tiết các mốc xử lý vụ việc và kết xuất sổ thụ lý. | BM05 |

## 13. Luồng xử lý đề xuất

| Bước | Tác nhân | Thao tác | Kết quả |
|---|---|---|---|
| 1 | Cán bộ báo cáo | Tạo kỳ báo cáo BTNN | Hệ thống tạo bản nháp kỳ báo cáo với thông tin đơn vị, năm, khoảng thời gian lấy số liệu. |
| 2 | Hệ thống | Tổng hợp dữ liệu vụ việc | Sinh dữ liệu BM01, BM03, BM04 từ các module nghiệp vụ. |
| 3 | Cán bộ báo cáo | Rà soát số liệu | Chỉnh sửa ghi chú, khó khăn, vướng mắc, giải trình nếu có. |
| 4 | Cán bộ báo cáo | Soạn nội dung BM02 | Nhập đánh giá, nhiệm vụ trọng tâm, giải pháp, đề xuất kiến nghị. |
| 5 | Lãnh đạo/Người duyệt | Kiểm tra và phê duyệt | Xác nhận số liệu, nội dung báo cáo và trạng thái kỳ báo cáo. |
| 6 | Hệ thống | Kết xuất biểu mẫu | Tạo file Excel/Word/PDF theo biểu mẫu đã chọn. |
| 7 | Cán bộ báo cáo | Lưu trữ/gửi báo cáo | Lưu phiên bản biểu mẫu và tài liệu gửi theo phương thức quy định. |

## 14. Yêu cầu kiểm tra dữ liệu trước khi kết xuất

| Nhóm kiểm tra | Nội dung kiểm tra |
|---|---|
| Dữ liệu định danh | Mỗi dòng vụ việc phải có `Mã vụ việc`, lĩnh vực phát sinh thiệt hại và cơ quan giải quyết bồi thường. |
| Dữ liệu thời gian | Ngày tiếp nhận, ngày thụ lý, ngày quyết định, ngày chi trả phải nằm trong kỳ báo cáo hoặc được xác định là kỳ trước chuyển sang. |
| Dữ liệu trạng thái | Trạng thái vụ việc phải ánh xạ được về nhóm đang giải quyết, đình chỉ, hoàn thành hoặc nhóm theo dõi nội bộ. |
| Dữ liệu tiền | Số tiền yêu cầu, số tiền quyết định, số tiền chi trả, số tiền hoàn trả phải có đơn vị rõ ràng và được quy đổi về nghìn đồng khi lập bảng thống kê. |
| Công thức tổng hợp | Các chỉ tiêu tổng phải bằng tổng các chỉ tiêu thành phần theo công thức đã nêu. |
| Dữ liệu thuyết minh | BM02 phải có nội dung đánh giá, vướng mắc, nhiệm vụ trọng tâm và đề xuất kiến nghị trước khi trình duyệt. |
| File kết xuất | File biểu mẫu sau khi sinh cần lưu phiên bản, người lập, thời điểm sinh và trạng thái phê duyệt. |

## 15. Ghi chú triển khai

| Nội dung | Khuyến nghị |
|---|---|
| Không thay đổi thuật ngữ hệ thống | Các màn nghiệp vụ mới đang dùng `Mã vụ việc`; khi xây báo cáo nên dùng thống nhất thuật ngữ này trong UI và cơ sở dữ liệu. |
| Tách dữ liệu pháp lý và dữ liệu quản trị | Một số trường như `Mã vụ việc`, `Tên vụ việc` là trường quản trị hệ thống, có thể không in ra biểu mẫu pháp lý nếu bản kết xuất cần giữ đúng mẫu gốc. |
| Cho phép tái tổng hợp | Kỳ báo cáo ở trạng thái nháp nên cho phép tổng hợp lại số liệu khi dữ liệu nghiệp vụ thay đổi. Khi đã phê duyệt, cần tạo phiên bản mới nếu điều chỉnh. |
| Lưu vết điều chỉnh | Mọi điều chỉnh thủ công vào số liệu hoặc nội dung báo cáo phải ghi người sửa, thời điểm sửa và lý do sửa. |
| Liên thông dữ liệu | Nguồn dữ liệu chính lấy từ các module Tiếp nhận YCBT, Giải quyết yêu cầu bồi thường, Quyết định giải quyết bồi thường, Cấp kinh phí tạm ứng/bồi thường, Xem xét trách nhiệm hoàn trả và Tra cứu vụ việc. |
