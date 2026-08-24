# SRS Module Xem Xét Trách Nhiệm Hoàn Trả

## 1. Thông Tin Chung

| Nội dung | Mô tả |
|---|---|
| Tên nhóm tính năng | Xem xét trách nhiệm hoàn trả |
| Website | Website Quản trị |
| Phân hệ | Công tác bồi thường |
| Nguồn UI | `UI_Mockups/Website_Quan_tri/UC431_to_UC466/xem_xet_trach_nhiem_hoan_tra.html`<br>`UI_Mockups/Website_Quan_tri/UC431_to_UC466/chi_tiet_ho_so_hoan_tra.html` |
| Mục tiêu | Quản lý toàn bộ tiến trình xem xét trách nhiệm hoàn trả từ lập hồ sơ, thành lập Hội đồng, cập nhật kiến nghị, ban hành quyết định hoàn trả đến ghi nhận thu hồi. |
| Tác nhân chính | Cán bộ xử lý, Lãnh đạo phê duyệt |

## 2. Nguyên Tắc Nghiệp Vụ

| Mã | Quy tắc |
|---|---|
| HT-BR-001 | Hồ sơ hoàn trả được lập từ hồ sơ yêu cầu bồi thường đã hoàn tất chi trả theo dữ liệu hệ thống. |
| HT-BR-002 | Trạng thái hồ sơ gồm: "Chờ thành lập hội đồng", "Đang họp hội đồng", "Chờ ban hành QĐ", "Đang thi hành", "Hoàn thành", "Không xem xét trách nhiệm hoàn trả". |
| HT-BR-019 | Khi Hội đồng kết luận `Không có lỗi` hoặc `Người thi hành công vụ đã chết trước khi ra quyết định hoàn trả` tại MH04 (hoặc tại Khối "Kết luận của Hội đồng" đầu Bước 2 của MH07 - mục 4.7.3.0), hồ sơ chuyển thẳng sang trạng thái "Không xem xét trách nhiệm hoàn trả" và kết thúc tiến trình, không mở bước Ban hành Quyết định (MH05/Bước 3). |
| HT-BR-003 | Khi mở chi tiết hồ sơ, hệ thống focus vào bước nghiệp vụ tương ứng với trạng thái hồ sơ. Các bước đã hoàn thành hiển thị chỉ đọc; các bước chưa đến bị khóa. |
| HT-BR-004 | Các trường bắt buộc tuân thủ [BR-VAL-001], hiển thị cảnh báo [MSG-ERR-VAL-001] khi bỏ trống và không cho phép lưu/trình. |
| HT-BR-005 | Trường ngày tuân thủ [BR-VAL-007]. Ngày hiệu lực quyết định không được nhỏ hơn ngày ký. |
| HT-BR-006 | Trường số tiền tuân thủ [BR-VAL-010]. |
| HT-BR-007 | Tệp đính kèm văn bản quyết định/biên bản/chứng từ ưu tiên định dạng PDF; quy tắc kiểm tra tệp áp dụng [BR-FILE-010]. |
| HT-BR-008 | Khi lãnh đạo từ chối phê duyệt, hệ thống bắt buộc nhập lý do từ chối và ghi nhận vào lịch sử xử lý của bước tương ứng. |
| HT-BR-009 | Khi quyết định hoàn trả ở trạng thái "Đã ban hành", bước thu hồi được mở để cán bộ ghi nhận nộp tiền/khấu trừ. |
| HT-BR-010 | `Giảm mức hoàn trả`, `Hoãn hoàn trả`, `Miễn hoàn trả` là nghiệp vụ điều chỉnh nghĩa vụ hoàn trả phát sinh sau khi đã có quyết định hoàn trả hoặc trong quá trình thực hiện thu hồi; mỗi nghiệp vụ phải có thông tin quyết định, căn cứ/lý do, tài liệu đính kèm và lịch sử xử lý riêng. |
| HT-BR-011 | Khi `Giảm mức hoàn trả` được phê duyệt/ban hành, hệ thống cập nhật lại số tiền phải hoàn trả còn hiệu lực và tính lại tiến độ thu hồi. |
| HT-BR-012 | Khi `Hoãn hoàn trả` được phê duyệt/ban hành, hệ thống ghi nhận khoảng thời gian hoãn và tạm dừng cảnh báo quá hạn thu hồi trong khoảng thời gian đó. |
| HT-BR-013 | Khi `Miễn hoàn trả` được phê duyệt/ban hành, hệ thống cập nhật nghĩa vụ còn lại về 0 hoặc theo phần được miễn, khóa thao tác thu hồi tiếp theo đối với nghĩa vụ đã được miễn. |
| HT-BR-014 | Hệ thống phân biệt `Đơn vị nhập liệu` và `Đơn vị ban hành` đối với các quyết định trong hồ sơ hoàn trả. Khi BTP/STP nhập thay cho đơn vị cấp dưới, số quyết định, lãnh đạo ký và sổ văn bản vẫn xác định theo `Đơn vị ban hành`. |
| HT-BR-015 | Mỗi quyết định phải gắn với `Sổ văn bản áp dụng` theo tổ hợp `Đơn vị ban hành + Loại quyết định/văn bản + Năm sổ`. Quyết định ký số trên hệ thống và quyết định ký bên ngoài dùng chung sổ, không tách sổ riêng theo hình thức ký. |
| HT-BR-016 | Với `Ký số trên hệ thống`, cán bộ trình lãnh đạo thuộc `Đơn vị ban hành` hoặc người được ủy quyền ký cho đơn vị ban hành; sau khi lãnh đạo phê duyệt/ký thành công, hệ thống cấp số/ngày ban hành từ `Sổ văn bản áp dụng` và chuyển quyết định sang `Đã ban hành`. |
| HT-BR-017 | Với `Ký bên ngoài`, hệ thống không trình lãnh đạo trên hệ thống; cán bộ bắt buộc nhập số quyết định, ngày quyết định, người ký/chức vụ, tải file quyết định đã ký ngoài và ghi nhận vào sổ văn bản của `Đơn vị ban hành`. |
| HT-BR-018 | Khi ghi nhận quyết định ký bên ngoài, hệ thống kiểm tra trùng số trong cùng sổ/năm và cảnh báo nếu số không liền kề số hiện tại của sổ; trường hợp vẫn ghi nhận số ngoài không tuần tự phải nhập lý do và lưu lịch sử xử lý. Ghi chú giới hạn UI mockup: do mockup không mô phỏng dữ liệu lịch sử số hiệu đã cấp của từng sổ văn bản, các màn hình popup (MH03/MH05/MH08/MH09/MH10 và Bước 1/Bước 3/Bước 4 của MH07) hiện chưa dựng giao diện cảnh báo trùng số/không liền kề; quy tắc này cần được hệ thống backend thực thi khi triển khai. |

## 3. Danh Sách Màn Hình

| Mã màn hình | Tên màn hình | Mục đích |
|---|---|---|
| MH01 | Quản lý xem xét trách nhiệm hoàn trả | Tra cứu, lọc, lập mới và mở chi tiết hồ sơ hoàn trả. |
| MH02 | Popup Lập hồ sơ hoàn trả: Chọn vụ việc bồi thường | Chọn hồ sơ bồi thường đã chi trả xong để khởi tạo hồ sơ hoàn trả. |
| MH03 | Popup Quyết định thành lập Hội đồng hoàn trả | Nhập quyết định thành lập Hội đồng và thành phần Hội đồng. |
| MH04 | Popup Cập nhật kiến nghị của Hội đồng hoàn trả | Cập nhật kết quả xác minh lỗi, mức đề xuất hoàn trả và biên bản kiến nghị. |
| MH05 | Popup Quyết định hoàn trả chính thức | Nhập quyết định hoàn trả và phương thức thực hiện. |
| MH06 | Popup Ghi nhận tiến độ thu hồi công quỹ | Ghi nhận giao dịch nộp tiền/khấu trừ hoàn trả. |
| MH07 | Hồ sơ hoàn trả chi tiết | Theo dõi và xử lý tiến trình 5 bước của hồ sơ hoàn trả (kể cả nhánh kết thúc sớm "Không xem xét trách nhiệm hoàn trả" tại Bước 2); tại Bước 4 cho phép ghi nhận nộp tiền, hoãn, giảm mức và miễn hoàn trả trực tiếp theo từng cán bộ. |
| MH08 | Popup Giảm mức hoàn trả | Nhập quyết định/căn cứ giảm mức hoàn trả và cập nhật nghĩa vụ phải thu hồi. |
| MH09 | Popup Hoãn hoàn trả | Nhập quyết định/căn cứ hoãn hoàn trả và khoảng thời gian hoãn. |
| MH10 | Popup Miễn hoàn trả | Nhập quyết định/căn cứ miễn hoàn trả và cập nhật nghĩa vụ còn lại. |

## 4. Đặc Tả Màn Hình

### 4.1. MH01 - Quản lý xem xét trách nhiệm hoàn trả

#### 4.1.1. Điều Kiện Truy Cập

Người dùng thuộc nhóm có quyền quản lý công tác bồi thường truy cập menu Xem xét trách nhiệm hoàn trả.

#### 4.1.2. Khối Thống Kê Tổng Quan

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Số vụ việc đã lập quyết định | Integer(10) | Không | 0 | Chỉ đọc.<br>Control UI: [Thẻ thống kê "Số vụ việc đã lập quyết định"]<br>- Đếm tổng số hồ sơ hoàn trả đã có Quyết định thành lập Hội đồng trở lên, tính theo bộ lọc hiện tại. |
| 2 | Tổng số tiền phải hoàn trả | Decimal(18,0) | Không | 0 đ | Chỉ đọc.<br>Control UI: [Thẻ thống kê "Tổng số tiền phải hoàn trả"]<br>- Tổng số tiền phải hoàn trả của các hồ sơ theo bộ lọc hiện tại, hiển thị màu cảnh báo (đỏ). |
| 3 | Số tiền đã thu hồi thực tế | Decimal(18,0) | Không | 0 đ | Chỉ đọc.<br>Control UI: [Thẻ thống kê "Số tiền đã thu hồi thực tế"]<br>- Tổng số tiền đã ghi nhận thu hồi thực tế của các hồ sơ theo bộ lọc hiện tại, hiển thị màu thành công (xanh lá). |

#### 4.1.3. Thông Tin Tìm Kiếm

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Tìm kiếm nhanh | String(255) | Không | Trống | Control UI: [Ô nhập tìm kiếm nhanh]<br>- Nhập mã vụ việc bồi thường, mã vụ việc hoàn trả hoặc tên cán bộ để lọc danh sách.<br>- Kết quả tìm kiếm và cách hiển thị khi không có dữ liệu trả về được đặc tả tại chức năng "Tìm kiếm" ở mục 4.1.5. |
| 2 | Trạng thái tiến trình | Enum(String(50)) | Không | Tất cả tiến trình | Giá trị: "Chờ thành lập hội đồng", "Đang họp hội đồng", "Chờ ban hành QĐ", "Đang thi hành", "Hoàn thành", "Không xem xét trách nhiệm hoàn trả". |
| 3 | Số tiền cần thu hồi | Enum(String(50)) | Không | Tất cả số tiền | Giá trị: "Dưới 50 triệu", "Từ 50 triệu - 200 triệu", "Trên 200 triệu". |

#### 4.1.4. Lưới Danh Sách Hồ Sơ Hoàn Trả

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---|---|---|---|---|
| Bảng danh sách hồ sơ hoàn trả | List(Object) | Không | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Ngày tạo" giảm dần (mới nhất hiển thị lên đầu).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* |
| Phân trang | String(255) | Không | 20 bản ghi/trang | Control UI: Pagination.<br>- Cho phép chọn cấu hình số lượng bản ghi hiển thị trên mỗi trang gồm: 10, 20, 50, 100 bản ghi/trang; mặc định chọn sẵn 20 bản ghi/trang.<br>- Đầy đủ các nút điều hướng trang: Đầu (&#124;&lt;&lt;), Trước (&lt;), các số trang, Sau (&gt;), Cuối (&gt;&gt;&#124;).<br>- Hiển thị dải bản ghi: "Hiển thị [từ] - [đến] của [tổng số] bản ghi". |

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | STT | Integer(5) | Số thứ tự dòng trên trang hiện tại. |
| 2 | Mã vụ việc HT | String(50) | Mã vụ việc hoàn trả. Cho phép mở chi tiết MH07. |
| 3 | Cán bộ gây sai phạm | String(255) | Họ tên cán bộ thuộc diện xem xét trách nhiệm hoàn trả. |
| 4 | Cơ quan công tác | String(255) | Cơ quan/đơn vị công tác của cán bộ. |
| 5 | Vụ việc YCBT liên quan | String(50) | Mã vụ việc yêu cầu bồi thường liên quan. Cho phép mở chi tiết vụ việc gốc tại module Giải quyết yêu cầu bồi thường trong cùng tab. |
| 6 | Tên vụ việc | String(255) | Tên vụ việc yêu cầu bồi thường liên quan. |
| 7 | Tỉnh/TP | Enum(String(100)) | Tỉnh/thành phố của người yêu cầu hoặc địa bàn phát sinh vụ việc. |
| 8 | Địa chỉ chi tiết | Text(1000) | Địa chỉ chi tiết của người yêu cầu/vụ việc. |
| 9 | Tiền bồi thường (đ) | Decimal(18,0) | Tổng số tiền bồi thường đã chi theo vụ việc gốc. |
| 10 | Tiền phải hoàn trả (đ) | Decimal(18,0) | Tổng số tiền cán bộ phải hoàn trả. |
| 11 | Tiến độ thu hồi | Decimal(5,2) | Tỷ lệ phần trăm đã thu hồi. |
| 12 | Trạng thái | Enum(String(50)) | Trạng thái vụ việc hoàn trả. |
| 13 | Thao tác | String(100) | Nhóm biểu tượng thao tác theo quyền và trạng thái vụ việc.<br>Control UI: [Cột "Thao tác" - Fixed-slot Action Column]<br>- Toàn bộ dòng dữ liệu áp dụng Row-Click: click vào bất kỳ vị trí nào trên dòng (trừ vùng nút bấm) sẽ mở MH07 - Hồ sơ hoàn trả chi tiết; không có nút "Xem" riêng trong cột Thao tác.<br>- Nút "Cập nhật kết quả" (bút chì): luôn hiển thị đúng vị trí; khóa mờ (Disabled) kèm tooltip *"Không có kết quả cần cập nhật ở bước này"* khi trạng thái không cho phép cập nhật trực tiếp từ danh sách; kích hoạt và mở đúng popup theo trạng thái (MH04 khi "Đang họp hội đồng", MH05 khi "Chờ ban hành QĐ", MH06 khi "Đang thi hành").<br>- Nút "Thao tác khác" (dấu ba chấm): luôn hiển thị đúng vị trí; khóa mờ (Disabled) kèm tooltip *"Chỉ thực hiện khi đã ban hành Quyết định hoàn trả"* khi hồ sơ chưa ở trạng thái "Đang thi hành"/"Hoàn thành"; khi kích hoạt, mở menu xổ xuống gồm 3 mục: "Giảm mức hoàn trả" (mở MH08), "Hoãn hoàn trả" (mở MH09), "Miễn hoàn trả" (mở MH10).<br>- Nút "Xóa" (thùng rác): luôn hiển thị đúng vị trí; khóa mờ (Disabled) kèm tooltip *"Hồ sơ đã họp hội đồng/ban hành QĐ không thể xóa"* khi hồ sơ không còn ở trạng thái "Chờ thành lập hội đồng". |

#### 4.1.5. Chức Năng Trên Màn Hình

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn, hiển thị kết quả lên bảng và đưa về Trang 1. |
|  |  |  | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled); nút "Kết xuất Excel" (nếu có) ở trạng thái khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Người dùng chọn nút Xóa bộ lọc | Hệ thống đưa các tiêu chí về giá trị mặc định và tải lại danh sách. |
| 3 | Lập hồ sơ hoàn trả mới | Người dùng chọn nút Lập hồ sơ hoàn trả mới | Hệ thống mở MH02 - Popup Lập hồ sơ hoàn trả: Chọn vụ việc bồi thường. |
| 4 | Kết xuất Excel | Danh sách đang có dữ liệu | Hệ thống kết xuất danh sách theo bộ lọc hiện tại, áp dụng [BR-EXP-040]. |
| 5 | Xem chi tiết (Row-Click) | Người dùng click vào dòng dữ liệu (ngoài vùng nút bấm cột Thao tác) hoặc chọn mã vụ việc HT | Hệ thống mở MH07 - Vụ việc hoàn trả chi tiết của vụ việc được chọn. |
| 6 | Sửa/Cập nhật kết quả | Người dùng có quyền cập nhật và hồ sơ ở trạng thái cho phép cập nhật ("Đang họp hội đồng", "Chờ ban hành QĐ", "Đang thi hành"); nút khóa mờ (Disabled) nếu bước hiện tại không có kết quả cần cập nhật | Hệ thống mở đúng popup theo trạng thái hồ sơ (MH04/MH05/MH06) để cập nhật. |
| 7 | Giảm mức hoàn trả | Hồ sơ ở trạng thái "Đang thi hành" hoặc "Hoàn thành" (trong menu Thao tác khác); nút khóa mờ (Disabled) nếu chưa đủ điều kiện | Hệ thống mở MH08 - Popup Giảm mức hoàn trả. |
| 8 | Hoãn hoàn trả | Hồ sơ ở trạng thái "Đang thi hành" hoặc "Hoàn thành" (trong menu Thao tác khác); nút khóa mờ (Disabled) nếu chưa đủ điều kiện | Hệ thống mở MH09 - Popup Hoãn hoàn trả. |
| 9 | Miễn hoàn trả | Hồ sơ ở trạng thái "Đang thi hành" hoặc "Hoàn thành" (trong menu Thao tác khác); nút khóa mờ (Disabled) nếu chưa đủ điều kiện | Hệ thống mở MH10 - Popup Miễn hoàn trả. |
| 10 | Xóa | Người dùng có quyền xóa và hồ sơ đang ở trạng thái "Chờ thành lập hội đồng"; nút khóa mờ (Disabled) đối với các trạng thái khác | Hệ thống hiển thị popup xác nhận trước khi xóa. |

### 4.2. MH02 - Popup Lập hồ sơ hoàn trả: Chọn vụ việc bồi thường

#### 4.2.1. Thông Tin Hiển Thị

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | Mã vụ việc | String(50) | Mã vụ việc bồi thường đã hoàn tất chi trả. |
| 2 | Tên vụ việc | String(255) | Tên vụ việc bồi thường. |
| 3 | Người yêu cầu | String(255) | Họ tên người yêu cầu bồi thường. |
| 4 | Tỉnh/TP | Enum(String(100)) | Tỉnh/thành phố của người yêu cầu hoặc địa bàn phát sinh vụ việc. |
| 5 | Địa chỉ chi tiết | Text(1000) | Địa chỉ chi tiết của người yêu cầu/vụ việc. |
| 6 | Số tiền bồi thường (đ) | Decimal(18,0) | Số tiền đã chi trả theo vụ việc bồi thường. |
| 7 | Ngày hoàn tất chi | Date | Ngày hoàn tất chi trả bồi thường. |
| 8 | Thao tác | String(100) | Hiển thị nút Khởi tạo vụ việc hoàn trả. |

#### 4.2.2. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Khởi tạo hồ sơ | Người dùng chọn một hồ sơ bồi thường đủ điều kiện | Hệ thống tạo hồ sơ hoàn trả mới ở trạng thái "Chờ thành lập hội đồng", đóng popup và mở MH07 tại bước Thành lập Hội đồng. |
| 2 | Đóng | Người dùng chọn Đóng | Hệ thống đóng popup và giữ nguyên danh sách MH01. |

### 4.3. MH03 - Popup Quyết định thành lập Hội đồng hoàn trả

#### 4.3.1. Thông Tin Liên Kết Vụ Việc Bồi Thường

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Chọn vụ việc bồi thường liên quan | Enum(String(50)) | Có | Trống | Chọn vụ việc bồi thường đã chi trả xong để lập vụ việc hoàn trả. |
| 2 | Tên vụ việc | String(255) | Không | Theo vụ việc liên kết | Chỉ đọc. |
| 3 | Tỉnh/TP | Enum(String(100)) | Không | Theo vụ việc liên kết | Chỉ đọc. |
| 4 | Địa chỉ chi tiết | Text(1000) | Không | Theo vụ việc liên kết | Chỉ đọc. |
| 5 | Cơ quan chi trả bồi thường | String(255) | Không | Theo vụ việc liên kết | Chỉ đọc. |
| 6 | Số tiền bồi thường đã chi (đ) | Decimal(18,0) | Không | Theo vụ việc liên kết | Chỉ đọc. |
| 7 | Ngày hoàn tất chi trả bồi thường | Date | Không | Theo vụ việc liên kết | Chỉ đọc. |

#### 4.3.2. Thành Phần Hội Đồng

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Chủ tịch Hội đồng | String(255) | Có | Trống | Lãnh đạo cơ quan làm Chủ tịch Hội đồng. |
| 2 | Ủy viên đại diện tổ chức công đoàn | String(255) | Có | Trống | Đại diện tổ chức công đoàn. |
| 3 | Ủy viên đại diện đơn vị tài chính/kế toán | String(255) | Có | Trống | Đại diện đơn vị tài chính hoặc kế toán. |
| 4 | Ủy viên đại diện đơn vị quản lý cán bộ trực tiếp | String(255) | Có | Trống | Đại diện đơn vị quản lý cán bộ gây thiệt hại. |
| 5 | Thư ký Hội đồng hoàn trả | String(255) | Có | Trống | Người thực hiện vai trò thư ký. |

#### 4.3.3. Văn Bản Quyết Định Thành Lập Hội Đồng

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Đơn vị nhập liệu | String(255) | Không | Theo tài khoản đăng nhập | Chỉ đọc. Ghi nhận đơn vị đang nhập/thao tác trên hệ thống. |
| 2 | Đơn vị ban hành | Enum(String(255)) | Có | Theo vụ việc/đơn vị quản lý cán bộ gây thiệt hại | Đơn vị có thẩm quyền ban hành quyết định thành lập Hội đồng; là căn cứ xác định lãnh đạo ký và sổ văn bản. |
| 3 | Sổ văn bản áp dụng | Enum(String(255)) | Có | Tự động theo đơn vị ban hành | Hệ thống xác định theo `Đơn vị ban hành + Loại quyết định + Năm sổ`. |
| 4 | Hình thức ban hành | Enum(String(50)) | Có | `Ký bên ngoài` | Gồm `Ký số trên hệ thống` và `Ký bên ngoài`. Với ký số, trình lãnh đạo thuộc đơn vị ban hành. Với ký bên ngoài, chỉ ghi nhận số/ngày/file quyết định đã ký. |
| 5 | Lãnh đạo ký ban hành | Enum(String(255)) | Có khi `Hình thức ban hành` = `Ký số trên hệ thống` | Trống | Chỉ hiển thị lãnh đạo còn hiệu lực, thuộc `Đơn vị ban hành` hoặc phạm vi được ủy quyền ký cho đơn vị ban hành. |
| 6 | Số quyết định thành lập | String(100) | Có điều kiện | Trống | Với ký số, hệ thống cấp số khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập số quyết định đã ký; hệ thống kiểm tra trùng số và cảnh báo tính tuần tự theo sổ. |
| 7 | Ngày quyết định thành lập | Date | Có điều kiện | Trống | Với ký số, hệ thống ghi nhận ngày ban hành khi ký thành công. Với ký bên ngoài, cán bộ nhập ngày quyết định đã ký bằng datepicker. |
| 8 | Người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Người ký trên quyết định đã ký bên ngoài. |
| 9 | Chức vụ người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Chức vụ của người ký trên quyết định đã ký bên ngoài. |
| 10 | Tài liệu quyết định thành lập | File | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Đính kèm file quyết định đã ký/đóng dấu. Với ký số, file ban hành do hệ thống sinh/lưu sau khi ký thành công. |

#### 4.3.4. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Lưu lại | Người dùng nhập thông tin quyết định | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (Dữ liệu không hợp lệ):** Vi phạm quy tắc ngày/tệp tương ứng trong mục 2, hiển thị MessageList chung, không cho phép lưu. |
|  |  |  | **TH3 (`Ký bên ngoài` nhưng trùng số quyết định trong cùng sổ/năm):** Hệ thống không cho lưu và hiển thị cảnh báo theo MessageList chung. |
|  |  |  | **TH4 (`Ký bên ngoài` và số quyết định không liền kề số hiện tại của sổ):** Hệ thống cảnh báo và yêu cầu nhập lý do ghi nhận số ngoài không tuần tự; nếu không nhập lý do thì không cho lưu. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu thông tin Hội đồng, ghi nhận `Đơn vị nhập liệu`, `Đơn vị ban hành`, `Sổ văn bản áp dụng`, hình thức ban hành, số/ngày/file quyết định nếu có và cập nhật trạng thái hồ sơ theo bước nghiệp vụ tiếp theo. |
| 2 | Hủy bỏ | Người dùng chọn Hủy bỏ | Hệ thống đóng popup, không lưu dữ liệu chưa xác nhận. |

### 4.4. MH04 - Popup Cập nhật kiến nghị của Hội đồng hoàn trả

#### 4.4.1. Thông Tin Xác Minh Lỗi Và Đề Xuất Hoàn Trả

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Mã vụ việc hoàn trả | String(50) | Không | Theo vụ việc | Chỉ đọc. |
| 2 | Mã vụ việc YCBT liên quan | String(50) | Không | Theo vụ việc | Chỉ đọc. |
| 3 | Tên vụ việc | String(255) | Không | Theo vụ việc | Chỉ đọc. |
| 4 | Tỉnh/TP | Enum(String(100)) | Không | Theo vụ việc | Chỉ đọc. |
| 5 | Địa chỉ chi tiết | Text(1000) | Không | Theo vụ việc | Chỉ đọc. |
| 6 | Quyết định thành lập | String(100) | Không | Theo bước 1 | Chỉ đọc. |
| 7 | Ngày quyết định | Date | Không | Theo bước 1 | Chỉ đọc. |
| 8 | Họ tên cán bộ gây sai phạm | String(255) | Có | Theo dữ liệu vụ việc | Cán bộ thuộc diện xem xét. |
| 9 | Chức vụ / Chức danh công tác | String(255) | Có | Trống | Chức vụ hiện tại của cán bộ. |
| 10 | Kết luận của Hội đồng | Enum(String(100)) | Có | `Có lỗi - Kiến nghị hoàn trả` | Giá trị: "Có lỗi - Kiến nghị hoàn trả", "Không xem xét - Người thi hành công vụ không có lỗi", "Không xem xét - Người thi hành công vụ đã chết trước khi ra quyết định hoàn trả". Phục vụ tổng hợp báo cáo theo Mẫu số 04 Thông tư 08/2019/TT-BTP. |
| 11 | Đánh giá yếu tố lỗi | Enum(String(100)) | Có khi `Kết luận của Hội đồng` = `Có lỗi - Kiến nghị hoàn trả` | Trống | Giá trị: "Lỗi vô ý gây hậu quả không nghiêm trọng", "Lỗi vô ý gây hậu quả nghiêm trọng", "Lỗi cố ý gây hậu quả". |
| 12 | Mức lương làm căn cứ (đ) | Decimal(18,0) | Có khi `Kết luận của Hội đồng` = `Có lỗi - Kiến nghị hoàn trả` | Trống | Mức lương dùng làm căn cứ xác định mức hoàn trả. |
| 13 | Mức đề xuất hoàn trả (đ) | Decimal(18,0) | Có khi `Kết luận của Hội đồng` = `Có lỗi - Kiến nghị hoàn trả` | Trống | Số tiền Hội đồng kiến nghị hoàn trả. |
| 14 | Ngày họp / Lập biên bản kiến nghị | Date | Có | Trống | Ngày lập biên bản kiến nghị/kết luận của Hội đồng, áp dụng cho cả trường hợp có lỗi và không xem xét. |
| 15 | Biên bản kiến nghị/kết luận đính kèm | File | Không | Trống | Cho phép đính kèm file biên bản kiến nghị hoặc biên bản kết luận không xem xét trách nhiệm hoàn trả. |

#### 4.4.2. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Lưu lại | Người dùng nhập kiến nghị | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (Số tiền không hợp lệ):** Vi phạm [BR-VAL-010], hiển thị MessageList chung, không cho phép lưu. |
|  |  |  | **TH3 (`Kết luận của Hội đồng` = `Có lỗi - Kiến nghị hoàn trả`, hợp lệ):** Hệ thống lưu kiến nghị Hội đồng và cập nhật dữ liệu bước Ban hành Quyết định (MH05). |
|  |  |  | **TH4 (`Kết luận của Hội đồng` thuộc nhóm `Không xem xét`, hợp lệ):** Theo [HT-BR-019], hệ thống lưu kết luận, chuyển trạng thái hồ sơ sang "Không xem xét trách nhiệm hoàn trả", kết thúc tiến trình và hiển thị [MSG-SUC-SYS-002]. |
| 2 | Hủy bỏ | Người dùng chọn Hủy bỏ | Hệ thống đóng popup, không lưu dữ liệu chưa xác nhận. |

### 4.5. MH05 - Popup Quyết định hoàn trả chính thức

#### 4.5.1. Thông Tin Quyết Định

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Đơn vị nhập liệu | String(255) | Không | Theo tài khoản đăng nhập | Chỉ đọc. Ghi nhận đơn vị đang nhập/thao tác trên hệ thống. |
| 2 | Đơn vị ban hành | Enum(String(255)) | Có | Theo hồ sơ hoàn trả | Đơn vị có thẩm quyền ban hành quyết định hoàn trả; là căn cứ xác định lãnh đạo ký và sổ văn bản. |
| 3 | Sổ văn bản áp dụng | Enum(String(255)) | Có | Tự động theo đơn vị ban hành | Hệ thống xác định theo `Đơn vị ban hành + Loại quyết định + Năm sổ`; dùng chung cho ký số và ký bên ngoài. |
| 4 | Hình thức ban hành | Enum(String(50)) | Có | `Ký số trên hệ thống` | Gồm `Ký số trên hệ thống` và `Ký bên ngoài`. |
| 5 | Lãnh đạo ký ban hành | Enum(String(255)) | Có khi `Hình thức ban hành` = `Ký số trên hệ thống` | Trống | Chỉ hiển thị lãnh đạo còn hiệu lực, thuộc `Đơn vị ban hành` hoặc phạm vi được ủy quyền ký cho đơn vị ban hành. |
| 6 | Số quyết định hoàn trả | String(100) | Có điều kiện | Trống | Với ký số, hệ thống cấp số khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập số quyết định đã ký; hệ thống kiểm tra trùng số và cảnh báo tính tuần tự theo sổ. |
| 7 | Ngày quyết định hoàn trả | Date | Có điều kiện | Trống | Với ký số, hệ thống ghi nhận ngày ban hành khi ký thành công. Với ký bên ngoài, cán bộ nhập ngày quyết định đã ký bằng datepicker. |
| 7b | Ngày quyết định hoàn trả có hiệu lực | Date | Có | Theo `Ngày quyết định hoàn trả` | Mặc định lấy theo `Ngày quyết định hoàn trả`; cho phép chỉnh sửa nếu văn bản quyết định quy định thời điểm có hiệu lực khác ngày ký/ban hành. Áp dụng [HT-BR-005]. Phục vụ tổng hợp báo cáo theo Mẫu số 04 Thông tư 08/2019/TT-BTP. |
| 8 | Người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Người ký trên quyết định đã ký bên ngoài. |
| 9 | Chức vụ người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Chức vụ của người ký trên quyết định đã ký bên ngoài. |
| 10 | Tài liệu Quyết định hoàn trả đính kèm | File | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Với ký bên ngoài, bắt buộc đính kèm văn bản quyết định đã ký/đóng dấu; với ký số, file ban hành do hệ thống sinh/lưu sau khi ký thành công. |
| 11 | Số tiền phải hoàn trả chính thức (đ) | Decimal(18,0) | Có | Theo kiến nghị | Số tiền phải hoàn trả theo quyết định. |
| 12 | Phương thức thu hồi thực tế | Enum(String(100)) | Có | Trống | Giá trị: "Khấu trừ lương hàng tháng", "Nộp chuyển khoản một lần vào KBNN". |
| 13 | Số tiền khấu trừ / tháng (đ) | Decimal(18,0) | Có điều kiện | Trống | Bắt buộc khi phương thức thu hồi là "Khấu trừ lương hàng tháng". |

#### 4.5.2. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Lưu lại | Người dùng nhập thông tin quyết định | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (Số tiền không hợp lệ):** Vi phạm [BR-VAL-010], hiển thị MessageList chung, không cho phép lưu. |
|  |  |  | **TH3 (`Ký bên ngoài` nhưng trùng số quyết định trong cùng sổ/năm):** Hệ thống không cho lưu và hiển thị cảnh báo theo MessageList chung. |
|  |  |  | **TH4 (`Ký bên ngoài` và số quyết định không liền kề số hiện tại của sổ):** Hệ thống cảnh báo và yêu cầu nhập lý do ghi nhận số ngoài không tuần tự; nếu không nhập lý do thì không cho lưu. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu quyết định hoàn trả chính thức, ghi nhận `Đơn vị nhập liệu`, `Đơn vị ban hành`, `Sổ văn bản áp dụng`, hình thức ban hành, số/ngày/file quyết định nếu có và chuyển hồ sơ sang bước thực hiện thu hồi theo trạng thái nghiệp vụ. |
| 2 | Hủy bỏ | Người dùng chọn Hủy bỏ | Hệ thống đóng popup, không lưu dữ liệu chưa xác nhận. |

Ghi chú: Sau khi lưu, dữ liệu `Quyết định hoàn trả chính thức` được lưu như dữ liệu con của hồ sơ hoàn trả, gồm tối thiểu `Mã vụ việc HT`, `Mã vụ việc YCBT liên quan`, `Đơn vị nhập liệu`, `Đơn vị ban hành`, `Sổ văn bản áp dụng`, `Hình thức ban hành`, `Số quyết định`, `Ngày quyết định`, `Ngày quyết định hoàn trả có hiệu lực`, `Người ký`, `Chức vụ người ký`, `Số tiền phải hoàn trả chính thức`, `Trạng thái hiệu lực` và `Tài liệu đính kèm`. Dữ liệu này là nguồn tra cứu/liên kết cho module `Kiến nghị xem xét lại quyết định hoàn trả/giảm mức hoàn trả`.

### 4.6. MH06 - Popup Ghi nhận tiến độ thu hồi công quỹ

#### 4.6.1. Thông Tin Giao Dịch Thu Hồi

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Cán bộ | String(255) | Không | Theo hồ sơ | Chỉ đọc. |
| 2 | Tổng tiền phải thu | Decimal(18,0) | Không | Theo quyết định | Chỉ đọc. |
| 3 | Phương thức | Enum(String(100)) | Không | Theo quyết định | Chỉ đọc. |
| 4 | Kỳ thu hồi / Tháng thu hồi | String(20) | Có | Trống | Kỳ ghi nhận giao dịch thu hồi. |
| 5 | Số tiền thực nộp (đ) | Decimal(18,0) | Có | Trống | Số tiền thực nộp/khấu trừ trong kỳ. |
| 6 | Ngày nộp thực tế | Date | Có | Trống | Ngày phát sinh giao dịch. |
| 7 | Số biên lai / Số chứng từ kho bạc | String(100) | Có | Trống | Mã chứng từ nộp tiền. |
| 8 | Biên lai / Chứng nhận nộp tiền đính kèm | File | Không | Trống | Cho phép đính kèm chứng từ. |

#### 4.6.2. Danh Sách Giao Dịch Tạm Nhập

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | STT | Integer(5) | Số thứ tự. |
| 2 | Kỳ thu hồi | String(20) | Kỳ thu hồi. |
| 3 | Số tiền thu (đ) | Decimal(18,0) | Số tiền thu trong kỳ. |
| 4 | Ngày nộp | Date | Ngày nộp thực tế. |
| 5 | Số biên lai | String(100) | Số chứng từ/biên lai. |
| 6 | Thao tác | String(100) | Cho phép xóa dòng chưa lưu. |

#### 4.6.3. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Thêm giao dịch vào danh sách | Người dùng nhập thông tin giao dịch | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép thêm. |
|  |  |  | **TH2 (Số tiền/ngày không hợp lệ):** Vi phạm [BR-VAL-010] hoặc [BR-VAL-007], hiển thị MessageList chung, không cho phép thêm. |
|  |  |  | **TH Hợp lệ:** Hệ thống thêm giao dịch vào danh sách tạm nhập. |
| 2 | Lưu lại | Danh sách tạm nhập có ít nhất một giao dịch hợp lệ | Hệ thống lưu tiến độ thu hồi và cập nhật tỷ lệ hoàn trả của hồ sơ. |
| 3 | Hủy bỏ | Người dùng chọn Hủy bỏ | Hệ thống đóng popup, không lưu dữ liệu chưa xác nhận. |

### 4.7. MH07 - Hồ sơ hoàn trả chi tiết

#### 4.7.1. Khối Thông Tin Chung

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Mã vụ việc hoàn trả | String(50) | Không | Theo vụ việc | Mã vụ việc đang xem. |
| 2 | Vụ việc bồi thường gốc | String(50) | Không | Theo vụ việc | Cho phép mở chi tiết vụ việc gốc tại module Giải quyết yêu cầu bồi thường trong cùng tab. |
| 3 | Tên vụ việc | String(255) | Không | Theo vụ việc | Chỉ đọc. |
| 4 | Tỉnh/TP | Enum(String(100)) | Không | Theo vụ việc | Chỉ đọc. |
| 5 | Địa chỉ chi tiết | Text(1000) | Không | Theo vụ việc | Chỉ đọc. |
| 6 | Trạng thái vụ việc | Enum(String(50)) | Không | Theo vụ việc | Trạng thái hiện tại của vụ việc. |
| 7 | Góc nhìn xử lý | Enum(String(50)) | Không | Theo quyền người dùng | Giá trị: "Cán bộ xử lý", "Lãnh đạo phê duyệt". |

#### 4.7.2. Bước 1 - Thành Lập Hội Đồng

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Mã vụ việc gốc | String(50) | Không | Theo vụ việc | Chỉ đọc. |
| 2 | Ngày chi trả | Date | Không | Theo vụ việc gốc | Chỉ đọc. |
| 3 | Tóm tắt nội dung | Text(1000) | Không | Theo vụ việc gốc | Chỉ đọc. |
| 4 | Cơ quan chi trả | String(255) | Không | Theo vụ việc gốc | Chỉ đọc. |
| 5 | Tổng tiền bồi thường | Decimal(18,0) | Không | Theo vụ việc gốc | Chỉ đọc. |
| 6 | Đơn vị nhập liệu | String(255) | Không | Theo tài khoản đăng nhập | Ngầm định theo tài khoản đăng nhập; không hiển thị thành control riêng trên UI hiện tại (không cần người dùng xác nhận lại). |
| 7 | Đơn vị ban hành | Enum(String(255)) | Có | Theo vụ việc/đơn vị quản lý cán bộ gây thiệt hại | Đơn vị có thẩm quyền ban hành quyết định thành lập Hội đồng. |
| 8 | Sổ văn bản áp dụng | Enum(String(255)) | Có | Tự động theo đơn vị ban hành | Hệ thống xác định theo `Đơn vị ban hành + Loại quyết định + Năm sổ`. |
| 9 | Hình thức ban hành | Enum(String(50)) | Có | Trống | Gồm `Ký số trên hệ thống` và `Ký bên ngoài`. |
| 10 | Lãnh đạo ký duyệt | Enum(String(255)) | Có khi `Hình thức ban hành` = `Ký số trên hệ thống` | Trống | Chỉ hiển thị lãnh đạo còn hiệu lực, thuộc `Đơn vị ban hành` hoặc phạm vi được ủy quyền ký cho đơn vị ban hành. |
| 11 | Số quyết định thành lập | String(100) | Có điều kiện | Trống | Với ký số, hệ thống cấp số khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập số quyết định đã ký; hệ thống kiểm tra theo sổ văn bản. |
| 12 | Ngày ký/ngày quyết định | Date | Có điều kiện | Trống | Với ký số, hệ thống ghi nhận ngày ký/ban hành khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập ngày quyết định đã ký. |
| 13 | Ngày hiệu lực | Date | Có | Trống | Ngày hiệu lực quyết định. |
| 14 | Người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Người ký trên quyết định ký bên ngoài. |
| 15 | Chức vụ người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Chức vụ người ký trên quyết định ký bên ngoài. |
| 16 | Đính kèm Quyết định ký đóng dấu đỏ | File | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Cho phép chọn nhiều file. Với ký số, file ban hành do hệ thống sinh/lưu sau khi ký thành công. |
| 17 | Họ và tên thành viên | String(255) | Có | Trống | Thành viên Hội đồng. |
| 18 | Chức vụ hiện tại | String(255) | Không | Trống | Chức vụ hiện tại của thành viên. |
| 19 | Đơn vị công tác | String(255) | Không | Trống | Đơn vị công tác của thành viên. |
| 20 | Chức vụ Hội đồng | Enum(String(100)) | Có | Trống | Giá trị: "Chủ tịch Hội đồng", "Phó Chủ tịch Hội đồng", "Thư ký Hội đồng", "Ủy viên", "Khác". Khi chọn "Khác", hệ thống hiển thị ô nhập chức vụ tùy chỉnh String(255). |

#### 4.7.3. Bước 2 - Có Kiến Nghị

##### 4.7.3.0. Khối 0 - Kết Luận Của Hội Đồng (HT-BR-019)

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Kết luận của Hội đồng | Enum(String(100)) | Có | `Có lỗi - Kiến nghị hoàn trả` | Control UI: [Combobox "Kết luận của Hội đồng xem xét trách nhiệm hoàn trả" - đầu Bước 2]<br>- Giá trị: "Có lỗi - Kiến nghị hoàn trả", "Không xem xét - Người thi hành công vụ không có lỗi", "Không xem xét - Người thi hành công vụ đã chết trước khi ra quyết định hoàn trả".<br>- Khi chọn `Có lỗi - Kiến nghị hoàn trả`: hiển thị Khối 1 (Thành phần Hội đồng) và Khối 2 (danh sách cán bộ chịu trách nhiệm) như mô tả tại khối **Thành phần Hội đồng** và khối **Danh sách cán bộ chịu trách nhiệm hoàn trả**.<br>- Khi chọn một trong hai giá trị `Không xem xét`: ẩn Khối 2 và khu vực trình duyệt kiến nghị; hiển thị khu vực cảnh báo kết thúc hồ sơ (xem HT-BR-019). Chức năng lưu tương ứng từng nhánh được đặc tả tại khối **Chức năng trên màn hình**. |
| 2 | Ngày họp / Lập biên bản kiến nghị | Date | Có | Trống | Ngày lập biên bản kiến nghị/kết luận của Hội đồng; áp dụng cho cả hai nhánh Có lỗi và Không xem xét. |
| 3 | Biên bản kiến nghị/kết luận đính kèm | File | Không | Trống | Cho phép đính kèm file biên bản kiến nghị hoặc biên bản kết luận không xem xét trách nhiệm hoàn trả. |

Ghi chú: Khi `Kết luận của Hội đồng` thuộc nhóm `Không xem xét`, hệ thống chuyển hồ sơ sang trạng thái "Không xem xét trách nhiệm hoàn trả", kết thúc tiến trình và hiển thị trạng thái này ở một khối tổng kết riêng (không mở Bước 3/4/5); thanh tiến trình 5 bước hiển thị Bước 2 dưới dạng nút "X" (kết thúc bất thường), các bước sau bị khóa mờ (Disabled).

##### 4.7.3.1. Khối 1 - Thành Phần Hội Đồng (Chỉ đọc)

Hiển thị lại 5 vai trò chuẩn của Hội đồng (Chủ tịch, Đại diện công đoàn, Đại diện tài chính/kế toán, Đại diện đơn vị quản lý cán bộ, Thư ký) cùng họ tên và đơn vị công tác đã ghi nhận tại Bước 1, ở chế độ chỉ đọc.

##### 4.7.3.2. Khối 2 - Danh Sách Cán Bộ Chịu Trách Nhiệm Hoàn Trả (Khi Kết Luận = Có Lỗi)

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | STT | Integer(5) | Số thứ tự dòng. |
| 2 | Cán bộ gây thiệt hại | String(255) | Họ tên; kèm chức vụ và đơn vị công tác hiển thị dưới tên. |
| 3 | Mức độ lỗi | Enum(String(100)) | Mức độ lỗi theo kết quả xem xét. |
| 4 | Số tiền hoàn trả (đ) | Decimal(18,0) | Số tiền kiến nghị hoàn trả. |
| 5 | Phương thức | Enum(String(100)) | Phương thức nộp/khấu trừ dự kiến. |
| 6 | Trạng thái hoãn | Enum(String(50)) | Hiển thị nhãn "Hoãn [✓]" khi cán bộ đã đăng ký hoãn thực hiện hoàn trả (xem trường 7 bên dưới), ngược lại hiển thị "-". |
| 7 | Thao tác | String(100) | Control UI: [Cột "Thao tác" - Fixed-slot Action Column]<br>- Nút "Xem" (kính lúp): luôn hiển thị đúng vị trí; mở popup chi tiết kiến nghị chỉ đọc của cán bộ.<br>- Nút "Sửa" (bút chì): luôn hiển thị đúng vị trí; khóa mờ (Disabled) kèm tooltip *"Chỉ được xem ở bước hiện tại"* khi hồ sơ ở chế độ chỉ đọc (góc nhìn Lãnh đạo hoặc bước đã hoàn thành và không thuộc luồng trình ký lại); kích hoạt mở popup "Thêm/Sửa cán bộ chịu trách nhiệm" khi được phép cập nhật.<br>- Nút "Xóa" (thùng rác): luôn hiển thị đúng vị trí; khóa mờ (Disabled) cùng điều kiện với nút Sửa; kích hoạt mở popup xác nhận xóa khi được phép cập nhật. |

Danh sách cán bộ trên được thu thập qua popup "Thêm/Sửa cán bộ chịu trách nhiệm" với các trường:

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Cán bộ gây thiệt hại | String(255) | Có | Trống | Cán bộ được Hội đồng kiến nghị trách nhiệm hoàn trả.<br>Control UI: [Popup "Thêm cán bộ chịu trách nhiệm"]<br>- Trường "Họ và tên cán bộ". |
| 2 | Chức vụ | String(255) | Có | Trống | Chức vụ hiện tại của cán bộ chịu trách nhiệm hoàn trả. |
| 3 | Đơn vị công tác | String(255) | Có | Trống | Đơn vị/cơ quan công tác hiện tại của cán bộ chịu trách nhiệm hoàn trả. |
| 4 | Mức độ lỗi | Enum(String(100)) | Có | Trống | Mức độ lỗi theo kết quả xem xét. |
| 5 | Số tiền hoàn trả (đ) | Decimal(18,0) | Có | Trống | Số tiền kiến nghị hoàn trả. |
| 6 | Phương thức | Enum(String(100)) | Có | Trống | Phương thức nộp/khấu trừ dự kiến. |
| 7 | Trạng thái hoãn | Enum(String(50)) | Không | Theo hồ sơ | Trạng thái hoãn nghĩa vụ nếu có. |
| 8 | Mô tả khác | Text(2000) | Không | Trống | Cho phép nhập thông tin mô tả khác liên quan đến trách nhiệm hoàn trả của cán bộ (nếu có). |

#### 4.7.4. Bước 3 - Ban Hành Quyết Định

Ghi chú thiết kế: Việc trình ký và ban hành Quyết định hoàn trả trên UI thực tế chia làm 2 giai đoạn. Giai đoạn 1 (Dự thảo) chỉ thu thập `Lãnh đạo phê duyệt/ký dự thảo`, `Trích yếu/Nội dung ngắn dự thảo` và `Tệp đính kèm dự thảo`, luôn qua luồng trình ký nội bộ trên hệ thống (Trình lãnh đạo phê duyệt → Phê duyệt/Từ chối). Các trường `Đơn vị ban hành`, `Sổ văn bản áp dụng`, `Hình thức ban hành`, `Số quyết định`, `Ngày ban hành`, `Ngày quyết định hoàn trả có hiệu lực`, `Người ký`, `Chức vụ người ký` và `File quyết định` chỉ được nhập ở giai đoạn 2 (popup "Ban hành Quyết định hoàn trả"), mở ra sau khi dự thảo đã được lãnh đạo phê duyệt (trạng thái "Chờ ban hành"). Đây là khác biệt thiết kế hợp lý so với mô tả gộp 1 giai đoạn trước đây: tách biệt bước trình duyệt nội dung dự thảo và bước ban hành chính thức giúp đúng với HT-BR-016/017 (số/ngày/sổ văn bản chỉ phát sinh khi văn bản thực sự được ban hành).

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Đơn vị nhập liệu | String(255) | Không | Theo tài khoản đăng nhập | Ngầm định theo tài khoản đăng nhập; không hiển thị thành control riêng trên UI hiện tại (không cần người dùng xác nhận lại). |
| 2 | Đơn vị ban hành | Enum(String(255)) | Có | Theo hồ sơ hoàn trả | Đơn vị có thẩm quyền ban hành quyết định hoàn trả.<br>Control UI: [Popup "Ban hành Quyết định hoàn trả" - Giai đoạn 2]. |
| 3 | Sổ văn bản áp dụng | Enum(String(255)) | Có | Tự động theo đơn vị ban hành | Hệ thống xác định theo `Đơn vị ban hành + Loại quyết định + Năm sổ`. |
| 4 | Hình thức ban hành | Enum(String(50)) | Có | `Ký số trên hệ thống` | Gồm `Ký số trên hệ thống` và `Ký bên ngoài`; khi đổi giá trị, hệ thống chuyển đổi hiển thị giữa trường `Lãnh đạo ký ban hành` (ký số) và cặp trường `Người ký`/`Chức vụ người ký` (ký bên ngoài). |
| 5 | Lãnh đạo phê duyệt/ký dự thảo | String(255) | Có khi `Hình thức ban hành` = `Ký số trên hệ thống` | Trống | Chỉ hiển thị lãnh đạo thuộc `Đơn vị ban hành` hoặc phạm vi được ủy quyền ký cho đơn vị ban hành. Control UI hiển thị nhãn "Lãnh đạo ký ban hành" tại popup Giai đoạn 2; nhãn "Lãnh đạo phê duyệt dự thảo" dùng ở Giai đoạn 1 (form dự thảo). |
| 6 | Trích yếu / Nội dung ngắn dự thảo | Text(1000) | Có | Trống | Nội dung tóm tắt quyết định; nhập tại Giai đoạn 1, mang sang làm giá trị mặc định tại Giai đoạn 2. |
| 7 | Tệp đính kèm dự thảo / Tài liệu trình | File | Không | Trống | Cho phép đính kèm file Word/PDF; cho phép xem file tại một tab riêng và xóa file đã chọn. |
| 8 | Số quyết định | String(100) | Có điều kiện | Trống | Với ký số, hệ thống cấp số khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập số quyết định đã ký; hệ thống kiểm tra theo sổ văn bản. |
| 9 | Ngày ban hành | Date | Có điều kiện | Trống | Với ký số, hệ thống ghi nhận ngày ban hành khi ký thành công. Với ký bên ngoài, cán bộ nhập ngày quyết định đã ký. |
| 9b | Ngày quyết định hoàn trả có hiệu lực | Date | Có | Theo `Ngày ban hành` | Mặc định lấy theo `Ngày ban hành`; cho phép chỉnh sửa nếu văn bản quy định thời điểm có hiệu lực khác ngày ký/ban hành, áp dụng [HT-BR-005]. Phục vụ tổng hợp báo cáo theo Mẫu số 04 Thông tư 08/2019/TT-BTP. |
| 10 | Người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Người ký trên quyết định đã ký bên ngoài; là control nhập liệu riêng (tách khỏi trường Lãnh đạo ký ban hành của nhánh ký số). |
| 11 | Chức vụ người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Chức vụ người ký trên quyết định đã ký bên ngoài. |
| 12 | Tổng tiền hoàn trả | Decimal(18,0) | Không | Theo quyết định | Hiển thị khi quyết định đã ban hành; tự tính bằng tổng `Số tiền hoàn trả` của toàn bộ cán bộ trong danh sách kiến nghị đã duyệt (mục 4.7.4.1). |
| 13 | Nguyên nhân/Căn cứ | Text(2000) | Không | Theo quyết định | Hiển thị khi quyết định đã ban hành. |
| 14 | File quyết định | File | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Bắt buộc khi xác nhận ban hành quyết định ký bên ngoài; với ký số, file ban hành do hệ thống sinh/lưu sau khi ký thành công. |

##### 4.7.4.1. Bảng Kết Quả Kiến Nghị Đã Phê Duyệt (Chỉ Đọc)

Hiển thị bên trái Bước 3, liệt kê lại toàn bộ cán bộ đã được kiến nghị tại Bước 2 để đối chiếu trước khi ban hành quyết định.

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | Cán bộ | String(255) | Họ tên và chức vụ cán bộ. |
| 2 | Mức độ lỗi | Enum(String(100)) | Mức độ lỗi đã kiến nghị. |
| 3 | Số tiền nộp (đ) | Decimal(18,0) | Số tiền hoàn trả theo kiến nghị. |
| 4 | Số tiền bằng chữ | String(255) | Control UI: hệ thống tự sinh cách đọc số tiền bằng chữ tiếng Việt tương ứng cột "Số tiền nộp", chỉ hiển thị, không phải trường nhập liệu. |
| 5 | Phương thức hoàn trả | Enum(String(100)) | Phương thức nộp/khấu trừ đã kiến nghị. |
| 6 | Thao tác | String(100) | Control UI: [Cột "Thao tác" - Fixed-slot Action Column]<br>- Nút "Sửa" và nút "Xóa": luôn hiển thị đúng vị trí; chỉ kích hoạt khi quyết định hoàn trả đang ở trạng thái "Bị từ chối" và người dùng là cán bộ xử lý (cho phép quay lại chỉnh danh sách cán bộ trước khi trình ký lại); các trường hợp còn lại khóa mờ (Disabled) kèm tooltip *"Chỉ được sửa/xóa khi dự thảo bị từ chối"*. |

Lịch sử xử lý Quyết định hoàn trả hiển thị full width dưới bước 3.

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | Thời gian | Datetime | Thời điểm phát sinh tác vụ. |
| 2 | Người thực hiện | String(255) | Họ tên, chức vụ/đơn vị người thực hiện. |
| 3 | Hành động/Tác vụ | String(255) | Tác vụ phát sinh trong tiến trình quyết định. |
| 4 | Nội dung chi tiết/Lý do từ chối | Text(2000) | Nội dung xử lý hoặc lý do từ chối. |
| 5 | Tệp đính kèm | File | Tệp liên quan nếu có; cho phép xem file tại một tab riêng. |

#### 4.7.5. Bước 4 - Thực Hiện Thu Hồi

Ghi chú thiết kế: Một hồ sơ hoàn trả có thể có nhiều cán bộ chịu trách nhiệm (theo danh sách kiến nghị tại Bước 2). Do đó các trường 1-6 dưới đây không phải trường đơn của hồ sơ mà là các cột lặp lại theo từng dòng cán bộ trong bảng "Theo dõi và cập nhật nộp tiền thực tế theo từng cán bộ".

##### 4.7.5.0. Bảng Danh Sách Cán Bộ Chịu Trách Nhiệm Theo Quyết Định (Chỉ Đọc)

Hiển thị ngay đầu Bước 4, đối chiếu lại danh sách cán bộ và số tiền chính thức theo Quyết định hoàn trả đã ban hành.

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | STT | Integer(5) | Số thứ tự. |
| 2 | Họ và tên | String(255) | Tên cán bộ. |
| 3 | Chức vụ | String(255) | Chức vụ cán bộ. |
| 4 | Mức độ lỗi | Enum(String(100)) | Mức độ lỗi theo Quyết định. |
| 5 | Phương thức nộp | Enum(String(100)) | Phương thức thu hồi. |
| 6 | Số tiền (VNĐ) | Decimal(18,0) | Số tiền phải hoàn trả chính thức theo Quyết định. |

##### 4.7.5.1. Bảng Theo Dõi Và Cập Nhật Nộp Tiền Thực Tế Theo Từng Cán Bộ

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Cán bộ nộp hoàn trả | String(255) | Không | Theo quyết định | Cán bộ phải hoàn trả (một dòng/cán bộ). |
| 2 | Hình thức hoàn trả | Enum(String(100)) | Không | Theo quyết định | Phương thức thu hồi. |
| 3 | Số tiền phải nộp | Decimal(18,0) | Không | Theo quyết định | Tổng số tiền phải nộp; giảm tương ứng khi có Quyết định Giảm mức/Miễn hoàn trả (mục 4.7.5.2). |
| 4 | Đã nộp | Decimal(18,0) | Không | Theo dữ liệu thu hồi | Số tiền đã ghi nhận. |
| 5 | Còn thiếu | Decimal(18,0) | Không | Theo dữ liệu thu hồi | Số tiền còn phải thu. |
| 6 | Tiến độ thu hồi tiền | Decimal(5,2) | Không | Theo dữ liệu thu hồi | Tỷ lệ thu hồi; kèm nhãn trạng thái "Đã hoàn thành"/"Quá hạn kỳ nộp"/"Đang thu nộp"/"ĐANG HOÃN". |
| 7 | Thao tác | String(100) | Không | - | Control UI: [Cột "Thao tác" - Fixed-slot Action Column, 4 khe cố định]<br>- Nút "Xem" (chi tiết tiến trình nộp tiền): luôn hiển thị đúng vị trí, mở popup chỉ đọc lịch sử các đợt nộp tiền của cán bộ.<br>- Nút "Ghi nhận nộp tiền" (bút chì): luôn hiển thị đúng vị trí; khóa mờ (Disabled) kèm tooltip *"Cán bộ đã hoàn thành toàn bộ nghĩa vụ hoàn trả"* khi đã hoàn tất, hoặc *"Nghĩa vụ đang bị đóng băng tạm hoãn"* khi đang hoãn; kích hoạt mở MH06.<br>- Nút "Giảm mức hoàn trả": luôn hiển thị đúng vị trí; khóa mờ (Disabled) kèm tooltip *"Cán bộ đã hoàn thành/miễn toàn bộ nghĩa vụ, không thể giảm mức"* khi cán bộ đã hoàn tất nghĩa vụ; kích hoạt mở form Giảm mức hoàn trả (tương đương MH08, xem mục 4.7.5.2) áp dụng riêng cho cán bộ trên dòng.<br>- Nút "Miễn hoàn trả": luôn hiển thị đúng vị trí; khóa mờ (Disabled) cùng điều kiện với nút Giảm mức; kích hoạt mở form Miễn hoàn trả (tương đương MH10, xem mục 4.7.5.2) áp dụng riêng cho cán bộ trên dòng.<br>- Cả 4 nút cùng khóa mờ khi hồ sơ đã "Hoàn thành" hoặc góc nhìn đang là Lãnh đạo phê duyệt (chỉ xem). |

##### 4.7.5.2. Giảm Mức Hoàn Trả / Miễn Hoàn Trả Theo Từng Cán Bộ (HT-BR-010/011/013)

Bổ sung so với thiết kế trước: tại Bước 4 của MH07, nút "Giảm mức hoàn trả" và "Miễn hoàn trả" trên mỗi dòng cán bộ mở trực tiếp một form cùng bộ trường với MH08 (mục 4.8.1) và MH10 (mục 4.10.1) — gồm `Đơn vị ban hành`, `Sổ văn bản áp dụng`, `Hình thức ban hành` (Ký số hệ thống/Ký bên ngoài), `Lãnh đạo ký ban hành` hoặc cặp `Người ký`/`Chức vụ người ký`, `Số quyết định`, `Ngày quyết định`, `Căn cứ/Lý do`, `Tài liệu liên quan` — khác biệt duy nhất là ngữ cảnh cán bộ được xác định sẵn theo dòng đã chọn (không cần chọn lại hồ sơ/cán bộ từ danh sách). Sau khi lưu, hệ thống trừ trực tiếp vào `Số tiền phải nộp` của cán bộ tương ứng tại bảng 4.7.5.1, ghi lịch sử xử lý và tính lại tiến độ thu hồi/tiến độ hồ sơ; khi `Miễn hoàn trả` ở phạm vi `Miễn toàn bộ` (hoặc số tiền còn lại về 0), cán bộ chuyển trạng thái "Đã hoàn thành" và khóa các thao tác thu hồi tiếp theo đối với cán bộ đó.

##### 4.7.5.3. Khối Đăng Ký Hoãn Thực Hiện Nghĩa Vụ Hoàn Trả

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Cho phép tạm hoãn | Boolean | Không | Không | Control UI: [Toggle "Yêu cầu Hoãn thực hiện nghĩa vụ hoàn trả"] - Khi bật, mở rộng khối nhập các trường 2-6 bên dưới. |
| 2 | Cán bộ xin tạm hoãn nghĩa vụ | String(255) | Có điều kiện | Trống | Chọn 1 cán bộ trong danh sách cán bộ chưa hoàn tất nghĩa vụ; bắt buộc khi chọn tạm hoãn. |
| 3 | Lý do hoãn thi hành quyết định | Enum(String(255)) | Có điều kiện | Trống | Giá trị: "Đang mắc bệnh hiểm nghèo cần điều trị", "Hoàn cảnh gia đình đặc biệt khó khăn", "Lý do bất khả kháng được cơ quan có thẩm quyền xác nhận". |
| 4 | Thời gian tạm hoãn từ ngày | Date | Có điều kiện | Trống | Bắt buộc khi chọn tạm hoãn. |
| 5 | Thời gian tạm hoãn đến ngày | Date | Có điều kiện | Trống | Bắt buộc khi chọn tạm hoãn. |
| 6 | Văn bản quyết định cho phép tạm hoãn | File | Có điều kiện | Trống | Bắt buộc khi chọn tạm hoãn. |

Ghi chú: Đây là cơ chế hoãn rút gọn áp dụng trực tiếp theo từng cán bộ ngay tại Bước 4 của MH07 (không mở popup MH09 riêng); MH09 (mục 4.9) là kênh thao tác đầy đủ hơn (có Đơn vị ban hành/Sổ văn bản/Hình thức ban hành) được truy cập từ menu "Thao tác khác" tại MH01. Đây là khác biệt thiết kế hợp lý: cơ chế rút gọn tại MH07 phục vụ thao tác nhanh ngay trong luồng xử lý, còn MH09 phục vụ trường hợp cần đầy đủ thông tin văn bản hành chính.

#### 4.7.6. Bước 5 - Hoàn Thành

| STT | Tên cột | Kiểu dữ liệu | Mô tả |
|---:|---|---|---|
| 1 | Mã biên lai | String(100) | Mã biên lai/chứng từ thu hồi. |
| 2 | Cán bộ nộp tiền | String(255) | Người nộp tiền. |
| 3 | Ngày nộp | Date | Ngày ghi nhận nộp tiền. |
| 4 | Phương thức | Enum(String(100)) | Phương thức nộp tiền. |
| 5 | Số tiền đã nộp (đ) | Decimal(18,0) | Số tiền đã nộp. |
| 6 | Trạng thái chứng từ | Enum(String(50)) | Trạng thái xác nhận chứng từ. |

#### 4.7.7. Chức Năng Trên Màn Hình Chi Tiết

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Đóng | Người dùng chọn Đóng | Hệ thống đóng màn hình chi tiết và quay về màn hình danh sách đã mở trước đó. |
| 2 | Tạo hội đồng | Hồ sơ ở trạng thái "Chờ thành lập hội đồng" và người dùng là cán bộ xử lý | Hệ thống mở form nhập thông tin quyết định thành lập Hội đồng tại Bước 1. |
| 3 | Thêm thành viên | Form Hội đồng đang ở chế độ cập nhật | Hệ thống thêm một dòng thành viên Hội đồng. |
| 4 | Xem trước Quyết định | Hồ sơ có đủ dữ liệu dự thảo quyết định | Hệ thống sinh bản xem trước quyết định theo mẫu và hiển thị để kiểm tra. |
| 5 | Trình ký Quyết định | Cán bộ nhập đủ thông tin trình ký và `Hình thức ban hành` = `Ký số trên hệ thống` | TH1 (Bỏ trống trường bắt buộc hoặc chưa chọn Lãnh đạo ký duyệt): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép trình ký. |
|  |  |  | **TH2 (Tệp/ngày không hợp lệ):** Vi phạm [BR-FILE-010] hoặc [BR-VAL-007], hiển thị MessageList chung, không cho phép trình ký. |
|  |  |  | **TH3 (Lãnh đạo ký không thuộc phạm vi đơn vị ban hành):** Hệ thống không cho trình ký và hiển thị cảnh báo theo MessageList chung. |
|  |  |  | **TH Hợp lệ:** Hệ thống chuyển quyết định sang trạng thái "Chờ ký", ghi nhận Lãnh đạo ký duyệt thuộc `Đơn vị ban hành`, chuyển quyết định đến đúng Lãnh đạo đã chọn và ghi lịch sử xử lý. |
| 6 | Phê duyệt/ký số | Người dùng là lãnh đạo phê duyệt của `Đơn vị ban hành` và hồ sơ đang chờ phê duyệt | Hệ thống ghi nhận phê duyệt/ký số, cấp số/ngày ban hành từ `Sổ văn bản áp dụng`, cập nhật trạng thái quyết định thành "Đã ban hành", cập nhật trạng thái bước tương ứng và ghi lịch sử xử lý. |
| 7 | Từ chối | Người dùng là lãnh đạo phê duyệt và hồ sơ đang chờ phê duyệt | Hệ thống mở popup nhập lý do từ chối; sau khi xác nhận, ghi lý do vào lịch sử xử lý và chuyển trạng thái hồ sơ/quyết định sang "Bị từ chối". |
| 8 | Cập nhật kiến nghị | Bước 2 đang thực hiện, `Kết luận của Hội đồng` = `Có lỗi - Kiến nghị hoàn trả` và người dùng có quyền cập nhật | Hệ thống lưu danh sách cán bộ chịu trách nhiệm hoàn trả theo kiến nghị Hội đồng và trình duyệt sang Bước 3. |
| 8b | Lưu kết luận Không xem xét (HT-BR-019) | Bước 2 đang thực hiện, `Kết luận của Hội đồng` thuộc nhóm `Không xem xét` và người dùng là cán bộ xử lý | TH1 (Bỏ trống `Ngày họp/Lập biên bản kiến nghị`): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép lưu. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu kết luận, chuyển trạng thái hồ sơ sang "Không xem xét trách nhiệm hoàn trả", ghi lịch sử xử lý, hiển thị [MSG-SUC-SYS-002] và kết thúc tiến trình (không mở Bước 3/4/5); thanh tiến trình 5 bước đánh dấu Bước 2 bằng biểu tượng "X", các bước sau khóa mờ (Disabled). |
| 9 | Cập nhật danh sách cán bộ | Người dùng chọn nút tại Bước 3 | Hệ thống focus về Bước 2 - Có kiến nghị để chỉnh sửa danh sách cán bộ chịu trách nhiệm. |
| 10 | Trình ký lại | Quyết định ở trạng thái "Bị từ chối" và `Hình thức ban hành` = `Ký số trên hệ thống` | TH1 (Bỏ trống trường bắt buộc hoặc chưa chọn Lãnh đạo ký duyệt): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép trình ký lại. |
|  |  |  | **TH2 (Lãnh đạo ký không thuộc phạm vi đơn vị ban hành):** Hệ thống không cho trình ký lại và hiển thị cảnh báo theo MessageList chung. |
|  |  |  | **TH Hợp lệ:** Hệ thống chuyển quyết định từ "Bị từ chối" sang "Chờ ký", ghi nhận Lãnh đạo ký duyệt thuộc `Đơn vị ban hành`, chuyển quyết định đến đúng Lãnh đạo đã chọn và ghi lịch sử xử lý. |
| 11 | Ban hành Quyết định ký bên ngoài | Quyết định ở trạng thái "Chờ ban hành" hoặc đang nhập mới, `Hình thức ban hành` = `Ký bên ngoài` và người dùng là cán bộ xử lý | TH1 (Bỏ trống trường bắt buộc gồm số quyết định, ngày quyết định, người ký/chức vụ nếu áp dụng, file quyết định): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép ban hành. |
|  |  |  | **TH2 (Tệp/ngày không hợp lệ):** Vi phạm [BR-FILE-010] hoặc [BR-VAL-007], hiển thị MessageList chung, không cho phép ban hành. |
|  |  |  | **TH3 (Trùng số quyết định trong cùng sổ/năm):** Hệ thống không cho ban hành và hiển thị cảnh báo theo MessageList chung. |
|  |  |  | **TH4 (Số quyết định không liền kề số hiện tại của sổ):** Hệ thống cảnh báo và yêu cầu nhập lý do ghi nhận số ngoài không tuần tự; nếu không nhập lý do thì không cho ban hành. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu thông tin văn bản đã ban hành, ghi nhận `Đơn vị nhập liệu`, `Đơn vị ban hành`, `Sổ văn bản áp dụng`, số/ngày/file quyết định, chuyển quyết định sang "Đã ban hành" và mở bước Thực hiện thu hồi. |
| 12 | Ghi nhận nộp tiền | Bước 4 đang thực hiện | Hệ thống mở MH06 - Popup Ghi nhận tiến độ thu hồi công quỹ. |
| 13 | Gửi đề nghị tạm hoãn | Người dùng nhập thông tin tạm hoãn tại Bước 4 | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không cho phép gửi. |
|  |  |  | **TH2 (Khoảng ngày không hợp lệ):** Vi phạm [BR-VAL-007], hiển thị MessageList chung, không cho phép gửi. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu thông tin tạm hoãn và cập nhật trạng thái hoãn của cán bộ tương ứng. |
| 14 | In báo cáo | Hồ sơ ở bước Hoàn thành | Hệ thống xuất báo cáo theo dữ liệu hồ sơ hoàn trả đã hoàn thành, áp dụng [BR-EXP-040]. |
| 15 | Giảm mức hoàn trả | Tại Bước 4, dòng cán bộ đã có quyết định hoàn trả và còn nghĩa vụ phải thu hồi; người dùng là cán bộ xử lý (không áp dụng góc nhìn Lãnh đạo) | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (Số tiền được giảm không hợp lệ hoặc lớn hơn số tiền còn phải hoàn trả hiện tại):** Vi phạm [BR-VAL-010], không cho phép lưu. |
|  |  |  | **TH3 (`Ký bên ngoài` nhưng chưa đính kèm tài liệu quyết định):** Hệ thống không cho lưu. |
|  |  |  | **TH Hợp lệ:** Hệ thống mở form Giảm mức hoàn trả (tương đương MH08) ngay trên dòng cán bộ tại Bước 4 (mục 4.7.5.2), lưu quyết định giảm mức, cập nhật số tiền phải nộp còn lại của cán bộ, tính lại tiến độ thu hồi và ghi lịch sử xử lý. Nếu cán bộ đã hoàn tất/đã miễn toàn bộ nghĩa vụ hoặc hồ sơ đang ở chế độ chỉ xem, nút hiển thị mờ và không cho bấm. |
| 16 | Hoãn hoàn trả | Tại Bước 4, người dùng bật toggle "Yêu cầu Hoãn thực hiện nghĩa vụ hoàn trả" và chọn 1 cán bộ chưa hoàn tất nghĩa vụ (mục 4.7.5.3); người dùng là cán bộ xử lý | TH1 (Bỏ trống trường bắt buộc hoặc chưa đính kèm văn bản cho phép tạm hoãn): Vi phạm [BR-VAL-001], không cho phép gửi. |
|  |  |  | **TH Hợp lệ:** Hệ thống đóng băng nghĩa vụ thu hồi của cán bộ được chọn (nhãn "ĐANG HOÃN"), khóa nút Ghi nhận nộp tiền của cán bộ đó và ghi lịch sử xử lý. Đây là kênh thao tác rút gọn ngay trong Bước 4 của MH07; kênh đầy đủ hơn (có Đơn vị ban hành/Sổ văn bản/Hình thức ban hành) là MH09, truy cập từ menu "Thao tác khác" tại MH01 khi hồ sơ đã có quyết định hoàn trả, còn nghĩa vụ phải thu hồi và chưa trong thời gian hoãn còn hiệu lực. |
| 17 | Miễn hoàn trả | Tại Bước 4, dòng cán bộ đã có quyết định hoàn trả và còn nghĩa vụ phải thu hồi; người dùng là cán bộ xử lý | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (`Miễn một phần` nhưng số tiền được miễn không hợp lệ hoặc lớn hơn số tiền còn phải hoàn trả):** Vi phạm [BR-VAL-010], không cho phép lưu. |
|  |  |  | **TH3 (`Ký bên ngoài` nhưng chưa đính kèm tài liệu quyết định):** Hệ thống không cho lưu. |
|  |  |  | **TH Hợp lệ:** Hệ thống mở form Miễn hoàn trả (tương đương MH10) ngay trên dòng cán bộ tại Bước 4 (mục 4.7.5.2), lưu quyết định miễn, cập nhật nghĩa vụ còn lại theo phạm vi miễn (toàn bộ hoặc một phần), khóa thao tác thu hồi tiếp theo nếu miễn toàn bộ và ghi lịch sử xử lý. Nếu cán bộ đã hoàn tất nghĩa vụ hoặc hồ sơ đang ở chế độ chỉ xem, nút hiển thị mờ và không cho bấm. |

### 4.8. MH08 - Popup Giảm mức hoàn trả

#### 4.8.1. Thông Tin Nhập Liệu

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Mã vụ việc hoàn trả | String(50) | Không | Theo vụ việc | Chỉ đọc. |
| 2 | Cán bộ phải hoàn trả | String(255) | Không | Theo quyết định hoàn trả | Chỉ đọc. |
| 3 | Số tiền phải hoàn trả hiện tại (đ) | Decimal(18,0) | Không | Theo dữ liệu hiệu lực | Chỉ đọc. |
| 4 | Đơn vị ban hành | Enum(String(255)) | Có | Theo quyết định hoàn trả | Đơn vị có thẩm quyền ban hành quyết định giảm mức hoàn trả. |
| 5 | Sổ văn bản áp dụng | Enum(String(255)) | Có | Tự động theo đơn vị ban hành | Hệ thống xác định theo `Đơn vị ban hành + Loại quyết định + Năm sổ`. |
| 6 | Hình thức ban hành | Enum(String(50)) | Có | `Ký bên ngoài` | Gồm `Ký số trên hệ thống` và `Ký bên ngoài`. |
| 7 | Lãnh đạo ký ban hành | Enum(String(255)) | Có khi `Hình thức ban hành` = `Ký số trên hệ thống` | Trống | Chỉ hiển thị lãnh đạo thuộc `Đơn vị ban hành` hoặc phạm vi được ủy quyền. |
| 8 | Số quyết định giảm mức hoàn trả | String(100) | Có điều kiện | Trống | Với ký số, hệ thống cấp số khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập số quyết định đã ký; hệ thống kiểm tra theo sổ văn bản. |
| 9 | Ngày quyết định | Date | Có điều kiện | Trống | Với ký số, hệ thống ghi nhận ngày ban hành khi ký thành công. Với ký bên ngoài, cán bộ nhập ngày quyết định bằng datepicker. |
| 10 | Người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Người ký trên quyết định đã ký bên ngoài. |
| 10b | Chức vụ người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Chức vụ người ký trên quyết định đã ký bên ngoài. |
| 11 | Số tiền được giảm (đ) | Decimal(18,0) | Có | Trống | Số tiền được giảm, không được lớn hơn số tiền còn phải hoàn trả. |
| 12 | Số tiền còn phải hoàn trả sau giảm (đ) | Decimal(18,0) | Không | Tự tính | Bằng số tiền phải hoàn trả hiện tại trừ số tiền được giảm. |
| 13 | Căn cứ/Lý do giảm | Text(2000) | Có | Trống | Căn cứ pháp lý và lý do giảm mức hoàn trả. |
| 14 | Tài liệu liên quan | File/List(File) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Với ký bên ngoài, bắt buộc có file quyết định đã ký; cho phép đính kèm thêm nhiều file căn cứ, hỗ trợ `Xem file` và `Xóa`. |

#### 4.8.2. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Lưu lại | Người dùng nhập thông tin giảm mức hoàn trả | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (Số tiền được giảm không hợp lệ):** Vi phạm [BR-VAL-010], không cho phép lưu. |
|  |  |  | **TH3 (`Ký bên ngoài` nhưng trùng số quyết định trong cùng sổ/năm):** Hệ thống không cho lưu. |
|  |  |  | **TH4 (`Ký bên ngoài` và số quyết định không liền kề số hiện tại của sổ):** Hệ thống cảnh báo và yêu cầu nhập lý do ghi nhận số ngoài không tuần tự. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu quyết định giảm mức hoàn trả, ghi nhận đơn vị ban hành/sổ văn bản/hình thức ban hành, cập nhật số tiền còn phải hoàn trả, tính lại tiến độ thu hồi và ghi lịch sử xử lý. |
| 2 | Hủy bỏ | Người dùng chọn Hủy bỏ | Đóng popup và không lưu dữ liệu chưa xác nhận. |

Ghi chú: Sau khi lưu, dữ liệu `Quyết định giảm mức hoàn trả` được lưu như dữ liệu con của hồ sơ hoàn trả, gồm tối thiểu `Mã vụ việc HT`, `Mã vụ việc YCBT liên quan`, `Số quyết định giảm mức hoàn trả`, `Ngày quyết định`, `Số tiền được giảm`, `Số tiền còn phải hoàn trả sau giảm`, `Trạng thái hiệu lực` và `Tài liệu liên quan`. Dữ liệu này được phép tra cứu/liên kết khi lập kiến nghị xem xét lại quyết định hoàn trả/giảm mức hoàn trả.

### 4.9. MH09 - Popup Hoãn hoàn trả

#### 4.9.1. Thông Tin Nhập Liệu

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Mã vụ việc hoàn trả | String(50) | Không | Theo vụ việc | Chỉ đọc. |
| 2 | Cán bộ phải hoàn trả | String(255) | Không | Theo quyết định hoàn trả | Chỉ đọc. |
| 3 | Đơn vị ban hành | Enum(String(255)) | Có | Theo quyết định hoàn trả | Đơn vị có thẩm quyền ban hành quyết định hoãn hoàn trả. |
| 4 | Sổ văn bản áp dụng | Enum(String(255)) | Có | Tự động theo đơn vị ban hành | Hệ thống xác định theo `Đơn vị ban hành + Loại quyết định + Năm sổ`. |
| 5 | Hình thức ban hành | Enum(String(50)) | Có | `Ký bên ngoài` | Gồm `Ký số trên hệ thống` và `Ký bên ngoài`. |
| 6 | Lãnh đạo ký ban hành | Enum(String(255)) | Có khi `Hình thức ban hành` = `Ký số trên hệ thống` | Trống | Chỉ hiển thị lãnh đạo thuộc `Đơn vị ban hành` hoặc phạm vi được ủy quyền. |
| 7 | Số quyết định hoãn hoàn trả | String(100) | Có điều kiện | Trống | Với ký số, hệ thống cấp số khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập số quyết định đã ký; hệ thống kiểm tra theo sổ văn bản. |
| 8 | Ngày quyết định | Date | Có điều kiện | Trống | Với ký số, hệ thống ghi nhận ngày ban hành khi ký thành công. Với ký bên ngoài, cán bộ nhập ngày quyết định bằng datepicker. |
| 9 | Người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Người ký trên quyết định đã ký bên ngoài. |
| 9b | Chức vụ người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Chức vụ người ký trên quyết định đã ký bên ngoài. |
| 10 | Thời gian hoãn từ ngày | Date | Có | Trống | Ngày bắt đầu hoãn nghĩa vụ hoàn trả. |
| 11 | Thời gian hoãn đến ngày | Date | Có | Trống | Ngày kết thúc hoãn nghĩa vụ hoàn trả. |
| 12 | Lý do hoãn hoàn trả | Text(2000) | Có | Trống | Lý do/căn cứ hoãn hoàn trả. |
| 13 | Tài liệu liên quan | File/List(File) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Với ký bên ngoài, bắt buộc có file quyết định đã ký; cho phép đính kèm thêm nhiều file căn cứ, hỗ trợ `Xem file` và `Xóa`. |

#### 4.9.2. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Lưu lại | Người dùng nhập thông tin hoãn hoàn trả | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (Khoảng ngày hoãn không hợp lệ):** Vi phạm [BR-VAL-007], không cho phép lưu. |
|  |  |  | **TH3 (`Ký bên ngoài` nhưng trùng số quyết định trong cùng sổ/năm):** Hệ thống không cho lưu. |
|  |  |  | **TH4 (`Ký bên ngoài` và số quyết định không liền kề số hiện tại của sổ):** Hệ thống cảnh báo và yêu cầu nhập lý do ghi nhận số ngoài không tuần tự. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu quyết định hoãn hoàn trả, ghi nhận đơn vị ban hành/sổ văn bản/hình thức ban hành, ghi nhận khoảng thời gian hoãn, tạm dừng cảnh báo quá hạn thu hồi trong thời gian hoãn và ghi lịch sử xử lý. |
| 2 | Hủy bỏ | Người dùng chọn Hủy bỏ | Đóng popup và không lưu dữ liệu chưa xác nhận. |

### 4.10. MH10 - Popup Miễn hoàn trả

#### 4.10.1. Thông Tin Nhập Liệu

| STT | Tên trường | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
|---:|---|---|---|---|---|
| 1 | Mã vụ việc hoàn trả | String(50) | Không | Theo vụ việc | Chỉ đọc. |
| 2 | Cán bộ phải hoàn trả | String(255) | Không | Theo quyết định hoàn trả | Chỉ đọc. |
| 3 | Số tiền còn phải hoàn trả (đ) | Decimal(18,0) | Không | Theo dữ liệu hiệu lực | Chỉ đọc. |
| 4 | Đơn vị ban hành | Enum(String(255)) | Có | Theo quyết định hoàn trả | Đơn vị có thẩm quyền ban hành quyết định miễn hoàn trả. |
| 5 | Sổ văn bản áp dụng | Enum(String(255)) | Có | Tự động theo đơn vị ban hành | Hệ thống xác định theo `Đơn vị ban hành + Loại quyết định + Năm sổ`. |
| 6 | Hình thức ban hành | Enum(String(50)) | Có | `Ký bên ngoài` | Gồm `Ký số trên hệ thống` và `Ký bên ngoài`. |
| 7 | Lãnh đạo ký ban hành | Enum(String(255)) | Có khi `Hình thức ban hành` = `Ký số trên hệ thống` | Trống | Chỉ hiển thị lãnh đạo thuộc `Đơn vị ban hành` hoặc phạm vi được ủy quyền. |
| 8 | Số quyết định miễn hoàn trả | String(100) | Có điều kiện | Trống | Với ký số, hệ thống cấp số khi lãnh đạo phê duyệt/ký thành công. Với ký bên ngoài, cán bộ nhập số quyết định đã ký; hệ thống kiểm tra theo sổ văn bản. |
| 9 | Ngày quyết định | Date | Có điều kiện | Trống | Với ký số, hệ thống ghi nhận ngày ban hành khi ký thành công. Với ký bên ngoài, cán bộ nhập ngày quyết định bằng datepicker. |
| 10 | Người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Người ký trên quyết định đã ký bên ngoài. |
| 10b | Chức vụ người ký | String(255) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Chức vụ người ký trên quyết định đã ký bên ngoài. |
| 11 | Phạm vi miễn | Enum(String(50)) | Có | `Miễn toàn bộ` | Gồm `Miễn toàn bộ` và `Miễn một phần`. |
| 12 | Số tiền được miễn (đ) | Decimal(18,0) | Có khi `Phạm vi miễn` = `Miễn một phần` | Trống | Không được lớn hơn số tiền còn phải hoàn trả. |
| 13 | Căn cứ/Lý do miễn | Text(2000) | Có | Trống | Căn cứ pháp lý và lý do miễn hoàn trả. |
| 14 | Tài liệu liên quan | File/List(File) | Có khi `Hình thức ban hành` = `Ký bên ngoài` | Trống | Với ký bên ngoài, bắt buộc có file quyết định đã ký; cho phép đính kèm thêm nhiều file căn cứ, hỗ trợ `Xem file` và `Xóa`. |

#### 4.10.2. Chức Năng

| STT | Chức năng | Điều kiện | Xử lý |
|---:|---|---|---|
| 1 | Lưu lại | Người dùng nhập thông tin miễn hoàn trả | TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], không cho phép lưu. |
|  |  |  | **TH2 (Số tiền miễn một phần không hợp lệ):** Vi phạm [BR-VAL-010], không cho phép lưu. |
|  |  |  | **TH3 (`Ký bên ngoài` nhưng trùng số quyết định trong cùng sổ/năm):** Hệ thống không cho lưu. |
|  |  |  | **TH4 (`Ký bên ngoài` và số quyết định không liền kề số hiện tại của sổ):** Hệ thống cảnh báo và yêu cầu nhập lý do ghi nhận số ngoài không tuần tự. |
|  |  |  | **TH Hợp lệ:** Hệ thống lưu quyết định miễn hoàn trả, ghi nhận đơn vị ban hành/sổ văn bản/hình thức ban hành, cập nhật nghĩa vụ còn lại theo phạm vi miễn và ghi lịch sử xử lý. |
| 2 | Hủy bỏ | Người dùng chọn Hủy bỏ | Đóng popup và không lưu dữ liệu chưa xác nhận. |
