### 4.3.2.26. Nhận dữ liệu BPBĐ bằng tàu bay

#### 4.3.2.26.1. Mục đích

\- Cho phép Người dùng nhận vào hệ thống dữ liệu hồ sơ đăng ký biện pháp bảo đảm bằng tàu bay do Cục Hàng không Việt Nam thực hiện đăng ký và gửi về.

\- Thông tin hồ sơ theo các mẫu phiếu tại Phụ lục ban hành kèm theo Nghị định số 99/2022/NĐ-CP, chi tiết tại mục [Cấu trúc dữ liệu tàu bay](#cau-truc-du-lieu-tau-bay):

\+ Mẫu số 01b - Phiếu yêu cầu đăng ký biện pháp bảo đảm bằng tàu bay (Đăng ký lần đầu).

\+ Mẫu số 02b - Phiếu yêu cầu đăng ký thay đổi nội dung biện pháp bảo đảm bằng tàu bay (Đăng ký thay đổi).

\+ Mẫu số 03b - Phiếu yêu cầu xóa đăng ký biện pháp bảo đảm bằng tàu bay (Xóa đăng ký).

\- Gồm các chức năng:

\+ Tìm kiếm dữ liệu hồ sơ đã nhận vào hệ thống.

\+ Xem chi tiết dữ liệu hồ sơ đã nhận.

\+ Nhận thủ công dữ liệu hồ sơ vào hệ thống theo 02 cách: Nhận từ Excel theo biểu mẫu tàu bay (nhiều hồ sơ một lần, cách chính) và Thêm mới thủ công từng hồ sơ (cách phụ, dùng khi nhận bản giấy hoặc hồ sơ lẻ).

\+ Đính kèm file liên quan đến dữ liệu hồ sơ (nếu có) khi Nhận từ Excel, Thêm mới, Sửa.

\+ Sửa, Hủy bản ghi đã nhận (hủy từng bản ghi hoặc chọn nhiều bản ghi để hủy, xử lý trường hợp nhận nhầm, nhận sai).

\- Mỗi lần Nhận từ Excel thành công, hệ thống sinh 01 Mã lô và gắn vào từng hồ sơ được ghi nhận, kèm thông tin tệp dữ liệu, công văn gửi kèm. Mã lô dùng để lọc các hồ sơ của cùng một lần nhận (VD: hủy toàn bộ khi nhận nhầm cả tệp); không có màn hình quản lý lô riêng. Hồ sơ Thêm mới thủ công không có Mã lô.

\- Phạm vi, bản chất dữ liệu nhận thực hiện theo [BR-NDL-001]: dữ liệu không qua luồng kiểm tra, phê duyệt, ký số; không thu phí; không cấp Số đăng ký, mã PIN mới; giữ nguyên Cơ quan đăng ký, Số đăng ký, Thời điểm đăng ký theo dữ liệu Cục Hàng không Việt Nam gửi.

*a. Phân quyền*

\- Menu "Biện pháp bảo đảm > Nhận dữ liệu BPBĐ từ cơ quan đăng ký khác" mở 01 màn hình gồm 04 tab theo Loại tài sản. Tab Tàu bay là 01 chức năng phân quyền riêng.

\- Người dùng được phân quyền chức năng này thì xem Tab Tàu bay và dữ liệu tàu bay; được thực hiện toàn bộ thao tác Tìm kiếm, Xem chi tiết, Nhận từ Excel, Thêm mới, Sửa, Hủy.

\- Vai trò thực hiện dự kiến: Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website Quản trị và được phân quyền chức năng Nhận dữ liệu BPBĐ bằng tàu bay.

---

<a id="tb-mh01"></a>
#### 4.3.2.26.2. MH01 - Màn hình Danh sách dữ liệu tàu bay đã nhận

##### 4.3.2.26.2.1. Màn hình

![Màn hình Danh sách dữ liệu tàu bay đã nhận](images/NDL_TB_MH01_Danh_sach_du_lieu_da_nhan.png)

##### 4.3.2.26.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tiêu đề màn hình** | - | - | - | Control UI: Label.<br>- Tiêu đề: "Nhận dữ liệu BPBĐ từ cơ quan đăng ký khác".<br>- Dòng mô tả: "Dữ liệu hồ sơ đăng ký biện pháp bảo đảm do cơ quan đăng ký khác gửi về để lưu trữ, tra cứu nội bộ và báo cáo".<br>- Góc phải: Nút "Cấu hình cơ quan đăng ký" (chỉ hiển thị khi được phân quyền), mở 
| **II. Tab Loại tài sản** | - | - | Tab đầu tiên được phân quyền | Control UI: Tab, chỉ hiển thị tên Loại tài sản (không có icon, không có badge số lượng).<br>Gồm:<br>+ Quyền sử dụng đất, tài sản gắn liền với đất<br>+ Tàu bay<br>+ Tàu biển<br>+ Chứng khoán đã lưu ký tập trung<br>- Chỉ hiển thị tab được phân quyền.<br>- Tài liệu này mô tả Tab Tàu bay; các tab còn lại tại [Mục đích - Nhận dữ liệu BPBĐ từ cơ quan đăng ký khác - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhan_du_lieu_BPBD_tu_co_quan_dang_ky_khac.md). |
| **III. Bộ lọc tìm kiếm** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion), mặc định mở rộng. |
| Số đăng ký | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập số đăng ký...".<br>- Tìm gần đúng theo Số đăng ký hoặc Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp; không phân biệt hoa thường, bỏ qua dấu cách và ký tự - . /. |
| Loại đăng ký | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Xóa đăng ký |
| Cơ quan đăng ký | Enum(String(255)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Các cơ quan đăng ký đã cấu hình cho Loại tài sản Tàu bay tại [MH06 - Popup Cấu hình cơ quan đăng ký - Nhận dữ liệu BPBĐ từ cơ quan đăng ký khác - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhan_du_lieu_BPBD_tu_co_quan_dang_ky_khac.md#mh06) theo [BR-NDL-011] (VD: Cục Hàng không Việt Nam). |
| Bên bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Tên hoặc số giấy tờ...".<br>- Tìm gần đúng theo Tên đầy đủ hoặc Số giấy tờ của bất kỳ Bên bảo đảm nào của bản ghi. |
| Bên nhận bảo đảm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Tên hoặc số giấy tờ...".<br>- Tìm gần đúng như trường Bên bảo đảm. |
| Số hiệu đăng ký | String(20) | Không | Trống | Control UI: Input text.<br>- Placeholder: "VD: VN-A321".<br>- Tìm gần đúng theo Số hiệu đăng ký của bất kỳ tàu bay nào thuộc bản ghi; không phân biệt hoa thường, bỏ qua dấu cách và ký tự - . /. |
| Loại tàu bay | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: "Nhập loại tàu bay...".<br>- Tìm gần đúng theo Loại tàu bay của bất kỳ tàu bay nào thuộc bản ghi; không phân biệt hoa thường, bỏ qua dấu cách và ký tự - . /. |
| Kiểu tàu bay | String(100) | Không | Trống | Control UI: Input text.<br>- Placeholder: "VD: A321-200".<br>- Tìm gần đúng theo Kiểu tàu bay của bất kỳ tàu bay nào thuộc bản ghi; không phân biệt hoa thường, bỏ qua dấu cách và ký tự - . /. |
| Thời điểm đăng ký | Date | Không | Trống | Control UI: Cặp ô chọn ngày Từ ngày - Đến ngày (dd/mm/yyyy).<br>- Kiểm tra theo [BR-VAL-007], vi phạm hiển thị [MSG-ERR-VAL-007]. |
| Nguồn nhận | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Nhận từ file<br>+ Thêm mới thủ công |
| Mã lô | String(20) | Không | Trống | Control UI: Input text.<br>- Placeholder: "VD: LO-2026-0001".<br>- Tìm gần đúng. |
| Trạng thái bản ghi | Enum(String(50)) | Không | Hiệu lực | Control UI: Hộp chọn.<br>Gồm:<br>+ Tất cả<br>+ Hiệu lực<br>+ Đã hủy |
| **IV. Danh sách** | - | - | - | Control UI: Bảng/Lưới hiển thị, phân trang 10 bản ghi/trang.<br>- Thanh công cụ phía trên bảng: bên trái hiển thị tổng số bản ghi; bên phải gồm các nút theo thứ tự: Hủy bản ghi đã chọn (chỉ hiển thị khi có bản ghi được chọn), Thêm mới, Nhận từ Excel, Kết xuất Excel.<br>- Sắp xếp mặc định: Ngày nhận giảm dần, sau đó Thời điểm đăng ký giảm dần.<br>- Click vào dòng mở [MH03 - Màn hình Xem chi tiết hồ sơ tàu bay đã nhận](#tb-mh03).<br>- Dòng có trạng thái "Đã hủy" hiển thị chữ màu xám. |
| Chọn | Boolean | - | Không chọn | Control UI: Checkbox.<br>- Tiêu đề cột là checkbox Chọn tất cả: chọn/bỏ chọn toàn bộ bản ghi "Hiệu lực" trên trang hiện tại.<br>- Bản ghi "Đã hủy": checkbox vô hiệu hóa.<br>- Danh sách đã chọn được xóa khi Tìm kiếm, Xóa bộ lọc. |
| STT | Integer(10) | - | Tự sinh | Số thứ tự tăng dần theo trang. |
| Số đăng ký | String(50) | - | Theo dữ liệu | Control UI: Link.<br>- Loại đăng ký khác Đăng ký lần đầu: hiển thị thêm dòng phụ "Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp: [Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp]".<br>- Bản ghi có cảnh báo theo [BR-NDL-005], [BR-NDL-007]: hiển thị icon cảnh báo màu vàng, hover hiển thị nội dung cảnh báo. |
| Loại đăng ký | Enum(String(50)) | - | Theo dữ liệu | Control UI: Tag màu theo Loại đăng ký.<br>Gồm:<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Xóa đăng ký |
| Thời điểm đăng ký | DateTime | - | Theo dữ liệu | Định dạng dd/mm/yyyy hh:mm. |
| Cơ quan đăng ký | String(255) | - | Theo dữ liệu | |
| Bên bảo đảm | String(255) | - | Theo dữ liệu | Tên đầy đủ của Bên bảo đảm thứ nhất; nhiều chủ thể hiển thị thêm "(+n)".<br>- Đăng ký thay đổi, Xóa đăng ký: hiển thị "-". |
| Bên nhận bảo đảm | String(255) | - | Theo dữ liệu | Tên đầy đủ của Bên nhận bảo đảm thứ nhất; nhiều chủ thể hiển thị thêm "(+n)".<br>- Đăng ký thay đổi, Xóa đăng ký: hiển thị "-". |
| Tài sản | String(500) | - | Theo dữ liệu | Tóm tắt tàu bay thứ nhất theo cú pháp "[Loại tàu bay] [Kiểu tàu bay] - [Số hiệu đăng ký] (S/N [Số xuất xưởng tàu bay])"; nhiều tàu bay hiển thị thêm "(+n tài sản)".<br>- Đăng ký thay đổi, Xóa đăng ký: hiển thị "-". |
| Nguồn nhận | Enum(String(50)) | - | Theo dữ liệu | Nhận từ file hoặc Thêm mới thủ công; Nhận từ file hiển thị thêm Mã lô. |
| Ngày nhận | DateTime | - | Theo dữ liệu | Thời điểm ghi nhận bản ghi vào hệ thống, định dạng dd/mm/yyyy hh:mm. |
| Trạng thái | Enum(String(50)) | - | Theo [BR-NDL-006] | Control UI: Tag.<br>Gồm:<br>+ Hiệu lực<br>+ Đã hủy |
| Thao tác | - | - | - | Control UI: Cột cố định bên phải, gồm các nút thao tác:<br>+ Sửa: Cho phép sửa khi bản ghi "Hiệu lực" (bản ghi "Đã hủy" hiển thị mờ/vô hiệu hóa).<br>+ Hủy bản ghi: Cho phép hủy khi bản ghi "Hiệu lực" (bản ghi "Đã hủy" hiển thị mờ/vô hiệu hóa).<br>*(Thao tác xem chi tiết được thực hiện bằng cách click vào dòng trên bảng)*. |

##### 4.3.2.26.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Chuyển tab Loại tài sản | Tab | - Mở danh sách của Loại tài sản được chọn, các tiêu chí lọc về mặc định. |
| 2 | Thêm mới | Nút (Thanh công cụ lưới) | - Mở [MH04 - Màn hình Thêm mới/Sửa hồ sơ tàu bay](#tb-mh04) ở chế độ Thêm mới. |
| 3 | Nhận từ Excel | Nút (Thanh công cụ lưới) | - Mở [MH02 - Popup Nhận dữ liệu tàu bay từ Excel](#tb-mh02). |
| 4 | Kết xuất Excel | Nút (Thanh công cụ lưới) | - Kiểm tra theo yêu cầu tại [BR-EXP-040].<br>- TH1 (Danh sách rỗng): Hiển thị [MSG-WRN-SYS-001].<br>- TH Hợp lệ: Xuất tệp Excel theo kết quả tìm kiếm hiện hành, gồm các cột: STT, Số đăng ký, Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Loại đăng ký, Thời điểm đăng ký, Cơ quan đăng ký, Bên bảo đảm, Bên nhận bảo đảm, Tài sản, Nguồn nhận, Mã lô, Ngày nhận, Trạng thái, Cảnh báo. |
| 5 | Tìm kiếm | Nút | - TH1 (Khoảng ngày không hợp lệ): Vi phạm [BR-VAL-007], hiển thị [MSG-ERR-VAL-007].<br>- TH Hợp lệ: Lọc danh sách theo đồng thời các tiêu chí đã nhập/chọn, về trang 1, bỏ chọn các bản ghi đã chọn. |
| 6 | Xóa bộ lọc | Nút | - Xóa các tiêu chí đã nhập, đưa Trạng thái bản ghi về "Hiệu lực", tải lại danh sách, bỏ chọn các bản ghi đã chọn. |
| 7 | Xem chi tiết | Click dòng trên bảng | - Click vào dòng bất kỳ trên bảng (trừ cột Chọn, Thao tác) để mở [MH03 - Màn hình Xem chi tiết hồ sơ tàu bay đã nhận](#tb-mh03). |
| 8 | Sửa | Icon | - Mở [MH04 - Màn hình Thêm mới/Sửa hồ sơ tàu bay](#tb-mh04) ở chế độ Sửa. |
| 9 | Hủy bản ghi | Icon | - Kiểm tra theo yêu cầu tại [BR-NDL-010].<br>- TH1 (Bản ghi Đăng ký lần đầu đang có bản ghi Đăng ký thay đổi, Xóa đăng ký "Hiệu lực" cùng hồ sơ): Hiển thị [MSG-ERR-NDL-007], không mở popup.<br>- TH Hợp lệ: Mở [MH05 - Popup Hủy bản ghi](#tb-mh05) với nội dung [MSG-CFM-NDL-002]. |
| 10 | Chọn / Chọn tất cả | Checkbox | - Chọn hoặc bỏ chọn bản ghi; nhãn nút Hủy bản ghi đã chọn hiển thị số bản ghi đang chọn. |
| 11 | Hủy bản ghi đã chọn ([N]) | Nút (Thanh công cụ lưới) | - Chỉ hiển thị khi có ít nhất 01 bản ghi được chọn.<br>- Dùng khi nhận nhầm nhiều hồ sơ, VD: nhận nhầm cả tệp thì lọc theo Mã lô, Chọn tất cả rồi hủy.<br>- Kiểm tra theo yêu cầu tại [BR-NDL-010].<br>- TH1 (Có bản ghi Đăng ký lần đầu đang được bản ghi "Hiệu lực" ngoài danh sách đã chọn liên kết): Hiển thị [MSG-ERR-NDL-007], không mở popup.<br>- TH Hợp lệ: Mở [MH05 - Popup Hủy bản ghi](#tb-mh05) với nội dung [MSG-CFM-NDL-003]. |
| 12 | Cấu hình cơ quan đăng ký | Nút (Góc phải tiêu đề) | - Chỉ hiển thị khi được phân quyền chức năng Cấu hình cơ quan đăng ký.<br>- Mở [MH06 - Popup Cấu hình cơ quan đăng ký - Nhận dữ liệu BPBĐ từ cơ quan đăng ký khác - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhan_du_lieu_BPBD_tu_co_quan_dang_ky_khac.md#mh06). |

---

<a id="tb-mh02"></a>
#### 4.3.2.26.3. MH02 - Popup Nhận dữ liệu tàu bay từ Excel

##### 4.3.2.26.3.1. Màn hình

![Popup Nhận dữ liệu tàu bay từ Excel](images/NDL_TB_MH02_Popup_Nhan_du_lieu_tu_file.png)

![Popup Nhận dữ liệu tàu bay từ Excel - Bước 2 Kết quả kiểm tra](images/NDL_TB_MH02_Buoc2_Ket_qua_kiem_tra.png)

##### 4.3.2.26.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thanh bước** | - | - | Bước 1 | Control UI: Thanh tiến trình 02 bước: Bước 1 "Chọn tệp dữ liệu", Bước 2 "Kết quả kiểm tra và ghi nhận". |
| **II. Bước 1 - Chọn tệp dữ liệu** | - | - | - | |
| **Khối Tải file mẫu** | - | - | - | Control UI: Khối thông báo màu xanh lá đặt đầu Bước 1, gồm icon Excel, tiêu đề "File mẫu nhận dữ liệu - [Tên Loại tài sản]", dòng hướng dẫn và nút "Tải file mẫu" nổi bật (nút màu xanh lá) bên phải. |
| Tệp dữ liệu Excel | File | Có | Trống | Control UI: Upload file.<br>- Kiểm tra theo yêu cầu tại [BR-NDL-002]: định dạng .xls, .xlsx; tối đa 20MB.<br>- Vi phạm hiển thị [MSG-ERR-IMP-001] hoặc [MSG-ERR-IMP-002] dạng Inline. |
| Tệp nén file đính kèm của hồ sơ | File | Không | Trống | Control UI: Upload file.<br>- Kiểm tra theo yêu cầu tại [BR-NDL-008]: định dạng .zip; tối đa 100MB.<br>- Vi phạm hiển thị [MSG-ERR-NDL-002]; không đọc được tệp hiển thị [MSG-ERR-NDL-008].<br>- Đọc hợp lệ: hiển thị tên tệp và số tệp bên trong. |
| Công văn, tài liệu gửi kèm | File | Không | Trống | Control UI: Upload nhiều file, hiển thị dạng chip có nút xóa.<br>- Kiểm tra theo yêu cầu tại [BR-NDL-008]: .pdf, .jpg, .jpeg, .png; tối đa 20MB/tệp.<br>- Vi phạm hiển thị [MSG-ERR-FILE-003] hoặc [MSG-ERR-FILE-004]. |
| Ghi chú | Text(500) | Không | Trống | Control UI: Textarea.<br>- Placeholder: "VD: Dữ liệu tháng 10/2026". |
| **III. Bước 2 - Kết quả kiểm tra** | - | - | - | Control UI: Khối thông tin chỉ đọc, gồm 03 thẻ số liệu và khối File kết quả. |
| Tổng số bản ghi | Integer(10) | - | Theo kết quả | Control UI: Thẻ số liệu.<br>- Số hồ sơ (số dòng dữ liệu của sheet HO_SO) đọc được từ tệp. |
| Tổng số hợp lệ | Integer(10) | - | Theo kết quả | Control UI: Thẻ số liệu, số màu xanh lá.<br>- Số hồ sơ không có lỗi, được ghi nhận khi chọn "Ghi nhận [N] hồ sơ".<br>- Gồm cả hồ sơ có cảnh báo theo [BR-NDL-005], [BR-NDL-007] (cảnh báo không chặn ghi nhận). |
| Tổng số lỗi | Integer(10) | - | Theo kết quả | Control UI: Thẻ số liệu, số màu đỏ.<br>- Số hồ sơ không được ghi nhận do vi phạm [BR-NDL-003], [BR-NDL-005], [BR-NDL-008] hoặc trùng theo [BR-NDL-004] (gồm cả hồ sơ đã tồn tại trên hệ thống). |
| **Khối File kết quả** | - | - | Ẩn | Control UI: Khối màu đỏ nhạt, gồm icon Excel, tiêu đề "File kết quả", tên tệp và nút "Tải về".<br>- Chỉ hiển thị khi Tổng số lỗi lớn hơn 0 hoặc có dòng không xác định được hồ sơ (dòng ở sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN có Mã hồ sơ không có trong sheet HO_SO). |
| Tên File kết quả | String(255) | - | Theo dữ liệu | Control UI: Label.<br>- Định dạng "Ket_qua_[Tên Tệp dữ liệu Excel].xlsx". |

##### 4.3.2.26.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tải file mẫu | Nút (Bước 1) | - Hệ thống tải xuống file mẫu Excel tàu bay theo mục [Cấu trúc dữ liệu tàu bay](#cau-truc-du-lieu-tau-bay). |
| 2 | Kiểm tra dữ liệu | Nút (Bước 1) | - TH1 (Bỏ trống trường bắt buộc): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001] dưới Tệp dữ liệu Excel.<br>- TH2 (Tệp sai cấu trúc): Thiếu sheet hoặc tên, thứ tự cột khác biểu mẫu tàu bay theo [BR-NDL-002]. Hiển thị [MSG-ERR-IMP-003], giữ nguyên Bước 1.<br>- TH3 (Tệp không có dữ liệu): Hiển thị [MSG-ERR-NDL-001], giữ nguyên Bước 1.<br>- TH Hợp lệ: Hệ thống đọc dữ liệu, kiểm tra từng hồ sơ theo yêu cầu tại [BR-NDL-003], [BR-NDL-004], [BR-NDL-005], [BR-NDL-007], [BR-NDL-008] và mục [Kiểm tra dữ liệu tàu bay](#kiem-tra-du-lieu-tau-bay), chuyển sang Bước 2.<br>- Thứ tự kiểm tra trong cùng tệp: Đăng ký lần đầu trước, sau đó Đăng ký thay đổi, Xóa đăng ký theo Thời điểm đăng ký tăng dần.<br>- Bước kiểm tra chưa ghi nhận dữ liệu vào hệ thống. |
| 3 | Dùng dữ liệu mẫu | Link (Bước 1) | - Chỉ dùng trên bản giả lập (Mockup) để xem thử kết quả kiểm tra với bộ dữ liệu mẫu có đủ các Loại đăng ký, gồm cả hồ sơ hợp lệ và hồ sơ lỗi. Không thuộc phạm vi hệ thống chính thức. |
| 4 | Hủy | Nút (Bước 1) | - Đóng popup, không lưu dữ liệu. |
| 5 | Tải về | Nút (Khối File kết quả) | - Tải xuống File kết quả theo mục [Cấu trúc File kết quả](#tb-file-ket-qua).<br>- Người dùng sửa dữ liệu trực tiếp trên File kết quả và nhận lại bằng chức năng Nhận từ Excel; hệ thống bỏ qua cột "Mô tả lỗi" theo [BR-NDL-002]. |
| 6 | Quay lại | Nút (Bước 2) | - Quay về Bước 1, giữ nguyên các thông tin đã chọn. |
| 7 | Ghi nhận [N] hồ sơ | Nút (Bước 2) | - Nhãn nút hiển thị số hồ sơ sẽ ghi nhận (Tổng số hợp lệ).<br>- TH1 (Không có hồ sơ được ghi nhận): Hiển thị [MSG-ERR-NDL-003].<br>- TH Hợp lệ: Hiển thị popup xác nhận [MSG-CFM-NDL-001]:<br>+ Chọn "Hủy": Đóng popup xác nhận, giữ nguyên Bước 2.<br>+ Chọn "Đồng ý": Hệ thống thực hiện:<br>* Sinh Mã lô cho lần nhận (định dạng LO-[yyyy]-[Số thứ tự 4 chữ số]; Mã lô không có trong file Excel); lưu thông tin lần nhận gồm Cơ quan gửi dữ liệu (các Cơ quan đăng ký có trong tệp), Tệp dữ liệu, Tệp nén, Công văn tài liệu gửi kèm, Ghi chú, Người nhận, Thời điểm nhận, Tổng số bản ghi, Tổng số hợp lệ, Tổng số lỗi.<br>* Ghi nhận từng hồ sơ hợp lệ thành 01 bản ghi: Cơ quan đăng ký, Loại đăng ký theo dữ liệu, Nguồn nhận "Nhận từ file", Mã lô, Người nhận, Ngày nhận là thời điểm hiện tại, trạng thái "Hiệu lực"; lưu các tệp đã khai báo tại cột "Tên file đính kèm" theo [BR-NDL-008]; tệp trong tệp nén không được hồ sơ hợp lệ nào khai báo thì không lưu.<br>* Liên kết các lần đăng ký của hồ sơ theo [BR-NDL-005].<br>* Ghi lịch sử thao tác "Nhận từ file (lô [Mã lô])".<br>* Đóng popup, tải lại danh sách, hiển thị [MSG-SUC-NDL-001]. |
| 8 | Đóng (x) | Icon | - Đóng popup, không lưu dữ liệu. |

<a id="tb-file-ket-qua"></a>
##### 4.3.2.26.3.4. Cấu trúc File kết quả

| STT | Thành phần | Mô tả |
| :-- | :--- | :--- |
| 1 | Định dạng tệp | Tệp .xlsx, đúng biểu mẫu Excel đã nhận của Loại tài sản. |
| 2 | Sheet | Giữ nguyên tên, thứ tự các sheet của tệp đã nhận: HUONG_DAN, HO_SO, BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN, DANH_MUC. |
| 3 | Cột dữ liệu | Giữ nguyên tên, thứ tự cột và danh sách chọn của biểu mẫu. |
| 4 | Dòng 1, dòng 2 | Giữ nguyên dòng tên cột (dòng 1) và dòng hướng dẫn nhập (dòng 2). |
| 5 | Dòng dữ liệu sheet HO_SO | Chỉ giữ dòng của hồ sơ lỗi (hồ sơ tính vào Tổng số lỗi), giữ nguyên giá trị đã nhập. |
| 6 | Dòng dữ liệu sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN | Giữ toàn bộ các dòng có Mã hồ sơ trong file thuộc hồ sơ lỗi (kể cả dòng không có lỗi) để người dùng sửa và nhận lại đầy đủ hồ sơ. |
| 7 | Dòng không xác định được hồ sơ | Giữ các dòng ở sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN có Mã hồ sơ không có trong sheet HO_SO. |
| 8 | Dòng không giữ lại | Dòng của hồ sơ hợp lệ, dòng ví dụ (Mã hồ sơ bắt đầu bằng "VD") và dòng trống. |
| 9 | Cột "Mô tả lỗi" | Thêm vào sau cột cuối cùng của các sheet HO_SO, BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.<br>- Dòng 2: "Lỗi của dòng dữ liệu. Sửa dữ liệu theo nội dung này rồi nhận lại; hệ thống bỏ qua cột này khi nhận."<br>- Mỗi lỗi ghi trên 01 dòng trong ô.<br>- Dòng không có lỗi: Để trống. |
| 10 | Nội dung lỗi gắn với cột | Định dạng "Cột "[Tên cột]": [Nội dung lỗi]". |
| 11 | Nội dung lỗi chung của hồ sơ | Ghi tại dòng sheet HO_SO, định dạng "[Nội dung lỗi]" (VD: Thiếu Bên bảo đảm, Bên nhận bảo đảm hoặc tài sản). |
| 12 | Hồ sơ đã tồn tại trên hệ thống | Ghi tại dòng sheet HO_SO: "Đã tồn tại trên hệ thống (bản ghi [Mã bản ghi]), không ghi nhận lại." |
| 13 | Hồ sơ có lỗi tại sheet khác | Ghi thêm tại dòng sheet HO_SO: "Hồ sơ có lỗi tại sheet [Tên sheet] (xem cột "Mô tả lỗi" của sheet đó)." |
| 14 | Dòng không xác định được hồ sơ | Ghi: "Mã hồ sơ trong file không có trong sheet HO_SO." |

---

<a id="tb-mh03"></a>
#### 4.3.2.26.4. MH03 - Màn hình Xem chi tiết hồ sơ tàu bay đã nhận

##### 4.3.2.26.4.1. Màn hình

![Màn hình Xem chi tiết hồ sơ tàu bay đã nhận](images/NDL_TB_MH03_Xem_chi_tiet_ho_so.png)

##### 4.3.2.26.4.2. Mô tả thông tin trên màn hình

\- Màn hình chỉ xem, các thông tin hiển thị theo dữ liệu đã ghi nhận của bản ghi; trường không có dữ liệu hiển thị "-".

\- Thông tin, khối thông tin không áp dụng cho Loại đăng ký của bản ghi thì không hiển thị (theo điều kiện tại cột Mô tả).

\- Trên giao diện, tên các khối không đánh số La Mã (số La Mã chỉ dùng để tham chiếu trong tài liệu).

\- Các nút thao tác (Hủy bản ghi, Sửa, Đóng) đặt tại thanh cố định cuối màn hình, luôn hiển thị khi cuộn trang: Hủy bản ghi và Sửa bên trái; nút Đóng nằm ở trong cùng góc phải màn hình.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Tiêu đề màn hình** | - | - | - | Control UI: Label "Chi tiết hồ sơ đã nhận [Số đăng ký]". |
| **Khối thông báo** | - | - | - | Control UI: Khối thông báo đặt dưới tiêu đề; chỉ hiển thị khi bản ghi đã hủy. |
| Thông báo bản ghi đã hủy | - | - | Theo dữ liệu bản ghi | Control UI: Khối màu đỏ "Bản ghi đã bị hủy. Lý do: [Lý do hủy]".<br>- Chỉ hiển thị khi Trạng thái bản ghi là "Đã hủy". |
| **I. Thông tin đăng ký** | - | - | - | Control UI: Khối thông tin chỉ đọc, lưới 4 cột.<br>- Luôn hiển thị. |
| Trạng thái bản ghi | - | - | Theo dữ liệu bản ghi | Control UI: Tag tại góc phải tiêu đề khối. |
| Tình trạng hồ sơ | - | - | Theo dữ liệu bản ghi | Control UI: Tag tại góc phải tiêu đề khối, cạnh Trạng thái bản ghi. |
| Loại tài sản | - | - | Theo dữ liệu bản ghi | Control UI: Label, giá trị "Tàu bay". |
| Cơ quan đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Loại đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Tag. |
| Số đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Label, chữ đậm. |
| Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp | - | - | Theo dữ liệu bản ghi | Control UI: Label.<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký thay đổi hoặc Xóa đăng ký. |
| Thời điểm đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Label, định dạng dd/mm/yyyy hh:mm. |
| Thời điểm có hiệu lực | - | - | Theo dữ liệu bản ghi | Control UI: Label, định dạng dd/mm/yyyy hh:mm. |
| Loại hình đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Label (mục 1.1).<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu hoặc Đăng ký thay đổi. |
| Nội dung thay đổi | - | - | Theo dữ liệu bản ghi | Control UI: Label, chiếm cả dòng (mục 5 Mẫu số 02b).<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký thay đổi. |
| Căn cứ xóa đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Label (mục 4 Mẫu số 03b).<br>- Chỉ hiển thị nếu Loại đăng ký là Xóa đăng ký. |
| Giấy tờ kèm theo | - | - | Theo dữ liệu bản ghi | Control UI: Label, chiếm cả dòng. |
| Ghi chú | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| **II. Người yêu cầu đăng ký** | - | - | - | Control UI: Khối thông tin chỉ đọc, lưới 4 cột (mục 1.2).<br>- Luôn hiển thị. |
| Người yêu cầu đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Họ và tên / Tên tổ chức | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Địa chỉ liên hệ | - | - | Theo dữ liệu bản ghi | Control UI: Label, chiếm cả dòng. |
| Loại giấy tờ | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Số giấy tờ | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Cơ quan cấp | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Ngày cấp | - | - | Theo dữ liệu bản ghi | Control UI: Label, định dạng dd/mm/yyyy. |
| Số điện thoại | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Fax | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Thư điện tử | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| **III. Hợp đồng bảo đảm, nghĩa vụ được bảo đảm** | - | - | - | Control UI: Khối thông tin chỉ đọc (mục 2, 5 Mẫu số 01b).<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu. |
| Số hợp đồng bảo đảm | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Thời điểm có hiệu lực của hợp đồng | - | - | Theo dữ liệu bản ghi | Control UI: Label, định dạng dd/mm/yyyy. |
| Nghĩa vụ được bảo đảm | - | - | Theo dữ liệu bản ghi | Control UI: Label, chiếm cả dòng. |
| **IV. Bên bảo đảm** | - | - | - | Control UI: Bảng chỉ đọc (mục 3); góc phải tiêu đề khối hiển thị "[N] chủ thể".<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu. |
| STT | - | - | Theo dữ liệu bản ghi | Số thứ tự tăng dần. |
| Tên đầy đủ | - | - | Theo dữ liệu bản ghi | Chữ IN HOA. |
| Địa chỉ | - | - | Theo dữ liệu bản ghi | Hiển thị theo [BR-VAL-015]. |
| Loại giấy tờ xác định tư cách pháp lý | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Số giấy tờ | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Cơ quan cấp | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Ngày cấp | - | - | Theo dữ liệu bản ghi | Định dạng dd/mm/yyyy. |
| Số điện thoại | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Fax | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Thư điện tử | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Ghi chú | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| **V. Bên nhận bảo đảm** | - | - | - | Control UI: Bảng chỉ đọc (mục 4); góc phải tiêu đề khối hiển thị "[N] chủ thể".<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu. |
| STT | - | - | Theo dữ liệu bản ghi | Số thứ tự tăng dần. |
| Tên đầy đủ | - | - | Theo dữ liệu bản ghi | Chữ IN HOA. |
| Địa chỉ | - | - | Theo dữ liệu bản ghi | Hiển thị theo [BR-VAL-015]. |
| Loại giấy tờ xác định tư cách pháp lý | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Số giấy tờ | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Cơ quan cấp | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Ngày cấp | - | - | Theo dữ liệu bản ghi | Định dạng dd/mm/yyyy. |
| Số điện thoại | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Fax | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Thư điện tử | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Ghi chú | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| **VI. Tài sản bảo đảm** | - | - | - | Control UI: Bảng chỉ đọc (mục 6), cuộn ngang; mỗi dòng là 01 tàu bay; góc phải tiêu đề khối hiển thị "[N] tài sản".<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu. |
| STT | - | - | Theo dữ liệu bản ghi | Số thứ tự tăng dần. |
| Số hiệu đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Loại tàu bay | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Kiểu tàu bay | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Nhà sản xuất | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Số xuất xưởng tàu bay | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Năm xuất xưởng | - | - | Theo dữ liệu bản ghi | Định dạng yyyy. |
| Kiểu loại động cơ | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Thời điểm hình thành | - | - | Theo dữ liệu bản ghi | Định dạng dd/mm/yyyy. |
| Ghi chú | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Tình trạng tài sản | - | - | Theo dữ liệu bản ghi | Control UI: Tag.<br>- Bản ghi "Đã hủy": hiển thị "-". |
| **VII. Tài liệu đính kèm** | - | - | - | Control UI: Bảng chỉ đọc; góc phải tiêu đề khối hiển thị "[N] tệp".<br>- Chỉ hiển thị khi bản ghi có ít nhất 01 tệp; không có tệp thì ẩn toàn bộ khối.<br>- Không có chức năng đính kèm thêm tại màn hình này (đính kèm tại [MH04 - Màn hình Thêm mới/Sửa hồ sơ tàu bay](#tb-mh04)). |
| STT | - | - | Theo dữ liệu bản ghi | Số thứ tự tăng dần. |
| Tên tệp | - | - | Theo dữ liệu bản ghi | Control UI: Link, click mở tệp. |
| Nguồn | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Người đính kèm | - | - | Theo dữ liệu bản ghi | Họ tên Người dùng đính kèm tệp. |
| Thời điểm | - | - | Theo dữ liệu bản ghi | Định dạng dd/mm/yyyy hh:mm. |
| **VIII. Thông tin nhận dữ liệu** | - | - | - | Control UI: Khối thông tin chỉ đọc.<br>- Luôn hiển thị; các thông tin hiển thị theo điều kiện dưới. |
| Mã bản ghi | - | - | Theo dữ liệu bản ghi | Control UI: Label.<br>- Luôn hiển thị.<br>- Mã định danh bản ghi do hệ thống tự sinh khi ghi nhận, định dạng NDL-[Số thứ tự 6 chữ số]. |
| Nguồn nhận | - | - | Theo dữ liệu bản ghi | Control UI: Label.<br>- Luôn hiển thị. |
| Mã lô | - | - | Theo dữ liệu bản ghi | Control UI: Label.<br>- Chỉ hiển thị nếu Nguồn nhận là "Nhận từ file".<br>- Mã do hệ thống tự sinh khi người dùng chọn "Ghi nhận [N] hồ sơ" tại [MH02 - Popup Nhận dữ liệu tàu bay từ Excel](#tb-mh02), định dạng LO-[yyyy]-[Số thứ tự 4 chữ số]; mỗi lần Nhận từ Excel sinh 01 Mã lô, dùng chung cho mọi hồ sơ được ghi nhận trong lần đó.<br>- Không có trong file Excel, người dùng không nhập. |
| Tệp dữ liệu | - | - | Theo dữ liệu bản ghi | Control UI: Label, tên tệp Excel đã tải lên khi Nhận từ Excel.<br>- Chỉ hiển thị nếu Nguồn nhận là "Nhận từ file". |
| Người nhận | - | - | Theo dữ liệu bản ghi | Control UI: Label, họ tên Người dùng thực hiện Nhận từ Excel hoặc Thêm mới.<br>- Luôn hiển thị. |
| Thời điểm nhận | - | - | Theo dữ liệu bản ghi | Control UI: Label, định dạng dd/mm/yyyy hh:mm.<br>- Luôn hiển thị. |
| **IX. Lịch sử hồ sơ** | - | - | - | Control UI: Dòng thời gian (Timeline).<br>- Luôn hiển thị.<br>- Liệt kê các bản ghi cùng hồ sơ (cùng Cơ quan đăng ký và Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp) theo [BR-NDL-005], gồm cả bản ghi "Đã hủy", sắp xếp Thời điểm đăng ký tăng dần. |
| Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp | - | - | Theo dữ liệu bản ghi | Control UI: Label tại góc phải tiêu đề khối.<br>- Đăng ký lần đầu: là Số đăng ký của bản ghi.<br>- Chưa có bản ghi Đăng ký lần đầu "Hiệu lực": hiển thị thêm "(chưa có hồ sơ gốc)". |
| Thời điểm đăng ký | - | - | Theo dữ liệu bản ghi | Định dạng dd/mm/yyyy hh:mm; mỗi dòng của Timeline là 01 bản ghi. |
| Loại đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Tag. |
| Số đăng ký | - | - | Theo dữ liệu bản ghi | Control UI: Link, click mở màn hình Xem chi tiết của bản ghi đó. |
| Trạng thái | - | - | Theo dữ liệu bản ghi | Control UI: Tag (Hiệu lực, Đã hủy). |
| Đang xem | - | - | Theo dữ liệu bản ghi | Dòng của bản ghi đang xem in đậm, kèm chữ "(đang xem)". |
| **X. Lịch sử thao tác** | - | - | - | Control UI: Bảng, sắp xếp Thời điểm giảm dần.<br>- Luôn hiển thị. |
| Thời điểm | - | - | Theo dữ liệu bản ghi | Định dạng dd/mm/yyyy hh:mm. |
| Người thực hiện | - | - | Theo dữ liệu bản ghi | Họ tên Người dùng thực hiện thao tác. |
| Thao tác | - | - | Theo dữ liệu bản ghi | Control UI: Label. |
| Lý do | - | - | Theo dữ liệu bản ghi | Lý do sửa, Lý do hủy; không có hiển thị "-". |
| Nội dung thay đổi | - | - | Theo dữ liệu bản ghi | Theo [BR-NDL-009]; không có hiển thị "-". |

##### 4.3.2.26.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Đóng | Nút (Góc phải thanh cố định cuối màn hình) | - Đóng màn hình xem chi tiết, quay về [MH01 - Màn hình Danh sách dữ liệu tàu bay đã nhận](#tb-mh01). |
| 2 | Sửa | Nút (Thanh cố định cuối màn hình) | - Hiển thị khi bản ghi "Hiệu lực".<br>- Mở [MH04 - Màn hình Thêm mới/Sửa hồ sơ tàu bay](#tb-mh04) ở chế độ Sửa. |
| 3 | Hủy bản ghi | Nút (Thanh cố định cuối màn hình) | - Hiển thị khi bản ghi "Hiệu lực".<br>- Xử lý như chức năng Hủy bản ghi tại [MH01 - Màn hình Danh sách dữ liệu tàu bay đã nhận](#tb-mh01). |
| 4 | Xem bản ghi khác của hồ sơ | Link Số đăng ký (Khối IX. Lịch sử hồ sơ) | - Mở màn hình Xem chi tiết của bản ghi được chọn. |

---

<a id="tb-mh04"></a>
#### 4.3.2.26.5. MH04 - Màn hình Thêm mới/Sửa hồ sơ tàu bay

##### 4.3.2.26.5.1. Màn hình

![Màn hình Thêm mới/Sửa hồ sơ tàu bay](images/NDL_TB_MH04_Them_moi_Sua_ho_so.png)

##### 4.3.2.26.5.2. Mô tả thông tin trên màn hình

\- Các trường nhập liệu sử dụng đúng danh sách trường, bắt buộc, định dạng và danh sách chọn của biểu mẫu Excel tàu bay tại mục [Cấu trúc dữ liệu tàu bay](#cau-truc-du-lieu-tau-bay).

\- Không áp dụng các nghiệp vụ của màn hình Đăng ký mới BPBĐ: lệ phí, thanh toán, mã PIN, kiểm tra thẩm quyền, danh sách thi hành án, đối chiếu C08.

\- Trên giao diện, tên các khối không đánh số La Mã; không hiển thị dòng chú thích, hướng dẫn dưới các trường. Ô nhập ngày, thời điểm hiển thị placeholder định dạng (dd/mm/yyyy, dd/mm/yyyy hh:mm, yyyy).

\- Bố cục: các khối Thông tin đăng ký, Người yêu cầu đăng ký, Hợp đồng bảo đảm hiển thị dạng lưới 4 cột cố định; trường địa chỉ, Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp chiếm 02 cột; trường văn bản dài (Nội dung thay đổi, Giấy tờ kèm theo, Ghi chú, Nghĩa vụ được bảo đảm) chiếm cả dòng.

\- Màn hình không hiển thị Loại tài sản (xác định theo Tab Tàu bay).

\- Khi thay đổi Loại đăng ký, hệ thống hiển thị/ẩn các trường, khối phụ thuộc theo mô tả dưới; trường bị ẩn không kiểm tra khi lưu.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Tiêu đề** | String(255) | - | - | Thêm mới: "Thêm mới hồ sơ".<br>Sửa: "Sửa hồ sơ [Số đăng ký]", dòng phụ kèm Mã bản ghi. |
| **Khối thông báo lỗi** | - | - | Ẩn | Control UI: Khối màu đỏ dưới tiêu đề, liệt kê lỗi theo dạng "[Khối] [dòng] - [Tên trường]: [Nội dung lỗi]"; các ô lỗi tô viền đỏ. |
| **I. Thông tin đăng ký** | - | - | - | Control UI: Khối nhập liệu dạng lưới 4 cột. |
| Cơ quan đăng ký | Enum(String(255)) | Có | Loại tài sản chỉ có 01 cơ quan: chọn sẵn cơ quan đó (VD: Cục Hàng không Việt Nam) | Control UI: Hộp chọn, chiếm 02 cột.<br>- Danh sách: Các cơ quan đăng ký đã cấu hình cho Loại tài sản Tàu bay tại [MH06 - Popup Cấu hình cơ quan đăng ký - Nhận dữ liệu BPBĐ từ cơ quan đăng ký khác - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhan_du_lieu_BPBD_tu_co_quan_dang_ky_khac.md#mh06) theo [BR-NDL-011].<br>- Dùng cho kiểm tra trùng hồ sơ theo [BR-NDL-004], liên kết các lần đăng ký theo [BR-NDL-005].<br>- Chế độ Sửa: cho phép sửa; giá trị mới phải thuộc danh sách đã cấu hình; thay đổi được ghi vào Nội dung thay đổi của lịch sử thao tác theo [BR-NDL-009]. |
| Loại đăng ký | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>Gồm:<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Xóa đăng ký<br>- Chưa chọn: hiển thị các trường theo Đăng ký lần đầu.<br>- Chế độ Sửa: chỉ đọc theo [BR-NDL-009]. |
| Số đăng ký | String(50) | Có | Trống | Control UI: Input text.<br>- Số đăng ký do Cục Hàng không Việt Nam cấp cho lần đăng ký này. |
| Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp | String(50) | Tùy điều kiện | Trống | Control UI: Input text, chiếm 02 cột.<br>- Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp (mục 2 Mẫu số 02b, 03b).<br>- Chỉ hiển thị và bắt buộc khi Loại đăng ký là Đăng ký thay đổi, Xóa đăng ký. |
| Thời điểm đăng ký | DateTime | Có | Trống | Control UI: Input text, định dạng dd/mm/yyyy hh:mm.<br>- Không lớn hơn thời điểm hiện tại. |
| Thời điểm có hiệu lực | DateTime | Có | Trống | Control UI: Input text, định dạng dd/mm/yyyy hh:mm.<br>- Không nhỏ hơn Thời điểm đăng ký. |
| Loại hình đăng ký | Enum(String(50)) | Tùy điều kiện | Trống | Control UI: Hộp chọn (mục 1.1).<br>Gồm:<br>+ Cầm cố<br>+ Thế chấp<br>+ Bảo lưu quyền sở hữu<br>- Hiển thị và bắt buộc khi Loại đăng ký là Đăng ký lần đầu, Đăng ký thay đổi; ẩn khi Xóa đăng ký. |
| Nội dung thay đổi | Text(2000) | Tùy điều kiện | Trống | Control UI: Textarea, chiếm cả dòng (mục 5 Mẫu số 02b).<br>- Chỉ hiển thị và bắt buộc khi Loại đăng ký là Đăng ký thay đổi.<br>- Ghi căn cứ đăng ký thay đổi và nội dung yêu cầu thay đổi. |
| Căn cứ xóa đăng ký | Enum(String(255)) | Tùy điều kiện | Trống | Control UI: Hộp chọn (mục 4 Mẫu số 03b).<br>- Chỉ hiển thị và bắt buộc khi Loại đăng ký là Xóa đăng ký.<br>Gồm:<br>+ Chấm dứt nghĩa vụ được bảo đảm<br>+ Hủy bỏ hoặc thay thế biện pháp bảo đảm<br>+ Tài sản bảo đảm đã được xử lý xong<br>+ Theo bản án, quyết định của Tòa án hoặc cơ quan có thẩm quyền<br>+ Bên nhận bảo đảm đồng ý xóa đăng ký<br>+ Căn cứ khác |
| Giấy tờ kèm theo | Text(2000) | Không | Trống | Control UI: Textarea, chiếm cả dòng.<br>- Liệt kê giấy tờ kèm theo Phiếu yêu cầu (mục 7 Mẫu số 01b, mục 6 Mẫu số 02b, mục 5 Mẫu số 03b).<br>- Hiển thị với mọi Loại đăng ký. |
| Ghi chú | Text(1000) | Không | Trống | Control UI: Textarea, chiếm cả dòng.<br>- Hiển thị với mọi Loại đăng ký. |
| **II. Người yêu cầu đăng ký** | - | - | - | Control UI: Khối nhập liệu dạng lưới 4 cột (mục 1.2). |
| Người yêu cầu đăng ký | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Gồm:<br>+ Bên nhận bảo đảm<br>+ Bên bảo đảm<br>+ Quản tài viên; Doanh nghiệp quản lý, thanh lý tài sản<br>+ Người đại diện |
| Họ và tên / Tên tổ chức | String(255) | Có | Trống | Control UI: Input text.<br>- Tự động chuyển chữ IN HOA khi nhập. |
| Địa chỉ liên hệ | String(500) | Có | Trống | Control UI: Input text, chiếm 02 cột.<br>- Nhập theo cú pháp "Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia" theo [BR-VAL-015]. |
| Loại giấy tờ | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Gồm:<br>+ Chứng minh nhân dân, Căn cước công dân, Chứng minh quân đội<br>+ Hộ chiếu<br>+ Thẻ thường trú<br>+ Mã số thuế |
| Số giấy tờ | String(50) | Có | Trống | Control UI: Input text.<br>- Loại giấy tờ là Mã số thuế và giá trị nhập là chữ số: Kiểm tra theo [BR-VAL-005]. |
| Cơ quan cấp | String(255) | Không | Trống | Control UI: Input text. |
| Ngày cấp | Date | Không | Trống | Control UI: Input text, định dạng dd/mm/yyyy.<br>- Không lớn hơn ngày hiện tại. |
| Số điện thoại | String(20) | Có | Trống | Control UI: Input text. |
| Fax | String(20) | Không | Trống | Control UI: Input text. |
| Thư điện tử | String(100) | Không | Trống | Control UI: Input text.<br>- Đúng định dạng thư điện tử. |
| **III. Hợp đồng bảo đảm, nghĩa vụ được bảo đảm** | - | - | - | Control UI: Khối nhập liệu dạng lưới 4 cột (mục 2, 5 Mẫu số 01b).<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu; Loại đăng ký khác: ẩn khối, không kiểm tra các trường của khối khi lưu. |
| Số hợp đồng bảo đảm | String(50) | Có | Trống | Control UI: Input text. |
| Thời điểm có hiệu lực của hợp đồng | Date | Có | Trống | Control UI: Input text, định dạng dd/mm/yyyy. |
| Nghĩa vụ được bảo đảm | Text(2000) | Có | Trống | Control UI: Textarea, chiếm cả dòng. |
| **Thông báo không nhập chủ thể, tài sản** | - | - | Ẩn | Control UI: Khối thông báo màu xanh, thay cho các khối IV, V, VI.<br>- Chỉ hiển thị nếu Loại đăng ký khác Đăng ký lần đầu.<br>- Đăng ký thay đổi: "Đăng ký thay đổi không nhập Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm (chỉ nhập với Đăng ký lần đầu)."<br>- Xóa đăng ký: "Xóa đăng ký không yêu cầu nhập Bên bảo đảm, Bên nhận bảo đảm, Tài sản. Khi lưu, toàn bộ tài sản của hồ sơ chuyển "Đã giải chấp"." |
| **IV. Bên bảo đảm** | - | Có | Chế độ Thêm mới: 01 dòng trống | Control UI: Lưới nhập liệu, cuộn ngang (mục 3); mỗi dòng là 01 chủ thể.<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu.<br>- Nút "Thêm dòng" tại góc phải tiêu đề khối: thêm 01 dòng trống.<br>- Dòng không nhập giá trị nào được bỏ qua khi lưu. |
| STT | Integer(10) | - | Tự sinh | Số thứ tự tăng dần. |
| Tên đầy đủ | String(255) | Có | Trống | Control UI: Input text.<br>- Tự động chuyển chữ IN HOA khi nhập. |
| Địa chỉ | String(500) | Có | Trống | Control UI: Input text.<br>- Nhập theo cú pháp tại [BR-VAL-015]. |
| Loại giấy tờ xác định tư cách pháp lý | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>- Danh sách như trường Loại giấy tờ của Người yêu cầu đăng ký. |
| Số giấy tờ | String(50) | Có | Trống | Control UI: Input text. |
| Cơ quan cấp | String(255) | Không | Trống | Control UI: Input text. |
| Ngày cấp | Date | Không | Trống | Control UI: Input text, định dạng dd/mm/yyyy. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text. |
| Fax | String(20) | Không | Trống | Control UI: Input text. |
| Thư điện tử | String(100) | Không | Trống | Control UI: Input text.<br>- Đúng định dạng thư điện tử. |
| Ghi chú | Text(1000) | Không | Trống | Control UI: Input text. |
| Xóa dòng | - | - | - | Control UI: Icon tại cột cố định cuối dòng; xóa dòng khỏi lưới. |
| **V. Bên nhận bảo đảm** | - | Có | Chế độ Thêm mới: 01 dòng trống | Control UI: Lưới nhập liệu, cuộn ngang (mục 4); mỗi dòng là 01 chủ thể.<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu.<br>- Nút "Thêm dòng" tại góc phải tiêu đề khối: thêm 01 dòng trống.<br>- Dòng không nhập giá trị nào được bỏ qua khi lưu. |
| STT | Integer(10) | - | Tự sinh | Số thứ tự tăng dần. |
| Tên đầy đủ | String(255) | Có | Trống | Control UI: Input text.<br>- Tự động chuyển chữ IN HOA khi nhập. |
| Địa chỉ | String(500) | Có | Trống | Control UI: Input text.<br>- Nhập theo cú pháp tại [BR-VAL-015]. |
| Loại giấy tờ xác định tư cách pháp lý | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>- Danh sách như trường Loại giấy tờ của Người yêu cầu đăng ký. |
| Số giấy tờ | String(50) | Có | Trống | Control UI: Input text. |
| Cơ quan cấp | String(255) | Không | Trống | Control UI: Input text. |
| Ngày cấp | Date | Không | Trống | Control UI: Input text, định dạng dd/mm/yyyy. |
| Số điện thoại | String(20) | Không | Trống | Control UI: Input text. |
| Fax | String(20) | Không | Trống | Control UI: Input text. |
| Thư điện tử | String(100) | Không | Trống | Control UI: Input text.<br>- Đúng định dạng thư điện tử. |
| Ghi chú | Text(1000) | Không | Trống | Control UI: Input text. |
| Xóa dòng | - | - | - | Control UI: Icon tại cột cố định cuối dòng; xóa dòng khỏi lưới. |
| **VI. Tài sản bảo đảm** | - | Có | Chế độ Thêm mới: 01 dòng trống | Control UI: Lưới nhập liệu, cuộn ngang (mục 6); mỗi dòng là 01 tàu bay.<br>- Chỉ hiển thị nếu Loại đăng ký là Đăng ký lần đầu.<br>- Nút "Thêm dòng" tại góc phải tiêu đề khối: thêm 01 dòng trống.<br>- Dòng không nhập giá trị nào được bỏ qua khi lưu. |
| STT | Integer(10) | - | Tự sinh | Số thứ tự tăng dần. |
| Số hiệu đăng ký | String(20) | Có | Trống | Control UI: Input text. |
| Loại tàu bay | String(255) | Có | Trống | Control UI: Input text. |
| Kiểu tàu bay | String(100) | Có | Trống | Control UI: Input text. |
| Nhà sản xuất | String(255) | Có | Trống | Control UI: Input text. |
| Số xuất xưởng tàu bay | String(50) | Có | Trống | Control UI: Input text. |
| Năm xuất xưởng | Integer(4) | Không | Trống | Control UI: Input text, placeholder "yyyy".<br>- Gồm 04 chữ số. |
| Kiểu loại động cơ | String(255) | Không | Trống | Control UI: Input text. |
| Thời điểm hình thành | Date | Không | Trống | Control UI: Input text, định dạng dd/mm/yyyy. |
| Ghi chú | Text(1000) | Không | Trống | Control UI: Input text. |
| Xóa dòng | - | - | - | Control UI: Icon tại cột cố định cuối dòng; xóa dòng khỏi lưới. |
| **VII. Tài liệu đính kèm** | File | Không | Chế độ Sửa: các tệp đã có | Control UI: Upload nhiều file.<br>- Danh sách tệp đã tải lên hiển thị phía trên, mỗi tệp 01 dòng gồm: icon loại tệp, Tên tệp, Dung lượng, link "Xem file", link "Xóa".<br>- Chưa có tệp: hiển thị "Chưa có tệp đính kèm.".<br>- Nút "Chọn tệp" đặt phía dưới danh sách tệp.<br>- Kiểm tra theo yêu cầu tại [BR-NDL-008]. |
| **VIII. Lý do sửa** | Text(1000) | Có (chế độ Sửa) | Trống | Control UI: Textarea, chỉ hiển thị ở chế độ Sửa. |

##### 4.3.2.26.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Lưu | Nút | - Kiểm tra theo yêu cầu tại [BR-NDL-003], [BR-NDL-004], [BR-NDL-005], [BR-NDL-007] và mục [Kiểm tra dữ liệu tàu bay](#kiem-tra-du-lieu-tau-bay) (chế độ Sửa thêm [BR-NDL-009]).<br>- TH1 (Dữ liệu chưa hợp lệ): Hiển thị Khối thông báo lỗi, tô viền đỏ các ô lỗi, cuộn lên đầu màn hình; không lưu. Gồm các lỗi:<br>+ Bỏ trống trường bắt buộc (gồm Cơ quan đăng ký): [MSG-ERR-VAL-001].<br>+ Đăng ký lần đầu thiếu chủ thể, tài sản: [MSG-ERR-NDL-005].<br>+ Trùng hồ sơ đã có: [MSG-ERR-NDL-004].<br>+ Hồ sơ gốc đã xóa đăng ký: [MSG-ERR-NDL-006].<br>+ Sai định dạng, vi phạm quy tắc tại mục [Kiểm tra dữ liệu tàu bay](#kiem-tra-du-lieu-tau-bay).<br>+ Chế độ Sửa bỏ trống Lý do sửa: [MSG-ERR-VAL-001] dưới trường Lý do sửa.<br>- TH2 (Có cảnh báo): Hiển thị popup [MSG-CFM-NDL-004] liệt kê cảnh báo [MSG-WRN-NDL-001], [MSG-WRN-NDL-002]:<br>+ Chọn "Hủy": Đóng popup, giữ nguyên màn hình.<br>+ Chọn "Đồng ý": Thực hiện như TH Hợp lệ.<br>- TH Hợp lệ:<br>+ Chế độ Thêm mới: Ghi nhận bản ghi với Cơ quan đăng ký, Loại đăng ký đã nhập/chọn, Nguồn nhận "Thêm mới thủ công", không có Mã lô, Người nhận, Ngày nhận là thời điểm hiện tại, trạng thái "Hiệu lực"; liên kết các lần đăng ký theo [BR-NDL-005]; ghi lịch sử thao tác "Thêm mới thủ công"; hiển thị [MSG-SUC-NDL-002].<br>+ Chế độ Sửa: Cập nhật bản ghi; ghi lịch sử thao tác "Sửa bản ghi" kèm Lý do và Nội dung thay đổi theo [BR-NDL-009]; hiển thị [MSG-SUC-NDL-003].<br>+ Chuyển sang [MH03 - Màn hình Xem chi tiết hồ sơ tàu bay đã nhận](#tb-mh03) của bản ghi. |
| 2 | Hủy bỏ | Nút | - TH1 (Chưa nhập hoặc chưa thay đổi dữ liệu): Quay về màn hình trước (Thêm mới về MH01, Sửa về MH03), không hiển thị xác nhận.<br>- TH Hợp lệ (Có dữ liệu chưa lưu): Hiển thị [MSG-CFM-UCPS-001]; chọn "Đồng ý" quay về màn hình trước, không lưu; chọn "Hủy" đóng popup. |
| 3 | Thêm dòng / Xóa dòng | Nút / Icon | - Thêm hoặc xóa dòng tại lưới Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm (chỉ có khi Loại đăng ký là Đăng ký lần đầu). |
| 4 | Chọn tệp | Nút (Khối VII) | - Cho phép chọn nhiều tệp, kiểm tra theo [BR-NDL-008].<br>- TH1 (Tệp không hợp lệ): Hiển thị [MSG-ERR-FILE-003] hoặc [MSG-ERR-FILE-004], bỏ qua tệp đó.<br>- TH Hợp lệ: Thêm tệp vào danh sách, hiển thị link "Xem file", "Xóa" của tệp. |
| 5 | Xem file | Link (Khối VII) | - Mở tệp trên tab mới của trình duyệt. |
| 6 | Xóa | Link (Khối VII) | - Hiển thị popup xác nhận "Bạn có chắc chắn muốn xóa tệp [Tên tệp]?":<br>+ Chọn "Hủy": Đóng popup, giữ nguyên tệp.<br>+ Chọn "Đồng ý": Gỡ tệp khỏi danh sách (chỉ có hiệu lực khi Lưu). |

---

<a id="tb-mh05"></a>
#### 4.3.2.26.6. MH05 - Popup Hủy bản ghi

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Nội dung xác nhận | String(500) | - | - | Hủy bản ghi: [MSG-CFM-NDL-002].<br>Hủy bản ghi đã chọn: [MSG-CFM-NDL-003]. |
| Lý do hủy | Text(1000) | Có | Trống | Control UI: Textarea. Lý do được lưu cho từng bản ghi bị hủy. |

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Đồng ý | Nút | - TH1 (Bỏ trống Lý do hủy): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001].<br>- TH Hợp lệ: Thực hiện theo [BR-NDL-010]:<br>+ Chuyển bản ghi (hoặc toàn bộ bản ghi đã chọn) sang "Đã hủy", lưu Lý do hủy, ghi lịch sử thao tác "Hủy bản ghi" cho từng bản ghi.<br>+ Tính lại Tình trạng hồ sơ, tài sản theo [BR-NDL-006]; tải lại màn hình, bỏ chọn các bản ghi đã chọn.<br>+ Hiển thị [MSG-SUC-NDL-004] (hủy 01 bản ghi) hoặc [MSG-SUC-NDL-005] (hủy bản ghi đã chọn). |
| 2 | Hủy / Đóng (x) | Nút / Icon | - Đóng popup, không thay đổi dữ liệu. |

---

<a id="cau-truc-du-lieu-tau-bay"></a>
#### 4.3.2.26.7. Cấu trúc dữ liệu tàu bay (Chuẩn Mẫu số 01b, 02b, 03b Nghị định số 99/2022/NĐ-CP)

\- Tệp biểu mẫu (bản dự thảo đề xuất, chờ khách hàng xác nhận): [Mau_Nhan_du_lieu_BPBD_Tau_bay.xlsx](../Bieu_mau_nhan_du_lieu_BPBD/Mau_Nhan_du_lieu_BPBD_Tau_bay.xlsx).

\- Cấu trúc tệp theo [BR-NDL-002]:

\+ Gồm các sheet HUONG_DAN, HO_SO, BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN, DANH_MUC.

\+ Các sheet dữ liệu liên kết với nhau qua cột "Mã hồ sơ trong file".

\+ Dòng 1 là tên cột (tiếng Việt), dòng 2 là hướng dẫn nhập kèm tên tiếng Anh theo mẫu phiếu; dữ liệu đọc từ dòng 3.

\+ Dòng ví dụ VD01 (Đăng ký lần đầu), VD02 (Đăng ký thay đổi), VD03 (Xóa đăng ký) tô vàng, hệ thống bỏ qua khi nhận.

\- Mỗi dòng sheet HO_SO là 01 lần đăng ký; một tệp có thể gồm cả Đăng ký lần đầu, Đăng ký thay đổi, Xóa đăng ký.

\- Ngoài các mục của mẫu phiếu, biểu mẫu có thêm các cột kỹ thuật: Mã hồ sơ trong file, Loại đăng ký, Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, STT chủ thể, STT tài sản, Tên file đính kèm, Ghi chú.

##### 4.3.2.26.7.1. Sheet HO_SO (mỗi dòng là 01 lần đăng ký)

| STT | Cột | Mục mẫu phiếu | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :-- | :--- | :--- | :--- | :---: | :--- |
| 1 | Mã hồ sơ trong file | - | String(20) | Có | Do đơn vị lập file tự đặt, không trùng trong file. VD: HS001. |
| 2 | Cơ quan đăng ký | - | Enum(String(255)) | Có | Danh sách CO_QUAN_DK (sheet DANH_MUC) gồm các cơ quan đăng ký đã cấu hình cho Loại tài sản Tàu bay theo [BR-NDL-011]; Loại tài sản chỉ có 01 cơ quan thì file mẫu điền sẵn. |
| 3 | Loại đăng ký | - | Enum(String(50)) | Có | Danh sách:<br>+ Đăng ký lần đầu<br>+ Đăng ký thay đổi<br>+ Xóa đăng ký |
| 4 | Số đăng ký | Số đăng ký | String(50) | Có | Số đăng ký do Cục Hàng không Việt Nam cấp cho lần đăng ký này. |
| 5 | Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp | Mục 2 Mẫu số 02b, 03b | String(50) | Tùy điều kiện | Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp.<br>- Bắt buộc với Đăng ký thay đổi, Xóa đăng ký.<br>- Đăng ký lần đầu: để trống hoặc trùng Số đăng ký. |
| 6 | Thời điểm đăng ký | Thời điểm đăng ký | DateTime | Có | dd/mm/yyyy hh:mm (24 giờ). |
| 7 | Thời điểm có hiệu lực | Thời điểm có hiệu lực | DateTime | Có | dd/mm/yyyy hh:mm (24 giờ). |
| 8 | Loại hình đăng ký | 1.1 Mẫu số 01b, 02b | Enum(String(50)) | Tùy điều kiện | Danh sách:<br>+ Cầm cố<br>+ Thế chấp<br>+ Bảo lưu quyền sở hữu<br>- Bắt buộc với Đăng ký lần đầu, Đăng ký thay đổi; để trống với Xóa đăng ký. |
| 9 | Nội dung thay đổi | 5 Mẫu số 02b | Text(2000) | Tùy điều kiện | Bắt buộc với Đăng ký thay đổi: căn cứ đăng ký thay đổi và nội dung yêu cầu thay đổi. |
| 10 | Căn cứ xóa đăng ký | 4 Mẫu số 03b | Enum(String(255)) | Tùy điều kiện | Bắt buộc với Xóa đăng ký. Danh sách:<br>+ Chấm dứt nghĩa vụ được bảo đảm<br>+ Hủy bỏ hoặc thay thế biện pháp bảo đảm<br>+ Tài sản bảo đảm đã được xử lý xong<br>+ Theo bản án, quyết định của Tòa án hoặc cơ quan có thẩm quyền<br>+ Bên nhận bảo đảm đồng ý xóa đăng ký<br>+ Căn cứ khác |
| 11 | Người yêu cầu đăng ký | 1.2 | Enum(String(100)) | Có | Danh sách:<br>+ Bên nhận bảo đảm<br>+ Bên bảo đảm<br>+ Quản tài viên; Doanh nghiệp quản lý, thanh lý tài sản<br>+ Người đại diện |
| 12 | Họ và tên / Tên tổ chức | Full name | String(255) | Có | Viết chữ IN HOA. |
| 13 | Địa chỉ liên hệ | Address | String(500) | Có | Theo cú pháp "Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia" tại [BR-VAL-015]. |
| 14 | Loại giấy tờ | - | Enum(String(100)) | Có | Danh sách:<br>+ Chứng minh nhân dân, Căn cước công dân, Chứng minh quân đội<br>+ Hộ chiếu<br>+ Thẻ thường trú<br>+ Mã số thuế |
| 15 | Số giấy tờ | No. | String(50) | Có | Nhập dạng văn bản, giữ số 0 ở đầu. |
| 16 | Cơ quan cấp | Issued by | String(255) | Không | |
| 17 | Ngày cấp | Date | Date | Không | dd/mm/yyyy. |
| 18 | Số điện thoại | Tel | String(20) | Có | |
| 19 | Fax | Fax | String(20) | Không | |
| 20 | Thư điện tử | Email | String(100) | Không | |
| 21 | Số hợp đồng bảo đảm | 2 Mẫu số 01b - No. | String(50) | Tùy điều kiện | Bắt buộc với Đăng ký lần đầu; để trống với Loại đăng ký khác. |
| 22 | Thời điểm có hiệu lực của hợp đồng | 2 Mẫu số 01b - Effective date | Date | Tùy điều kiện | dd/mm/yyyy. Bắt buộc với Đăng ký lần đầu; để trống với Loại đăng ký khác. |
| 23 | Nghĩa vụ được bảo đảm | 5 Mẫu số 01b | Text(2000) | Tùy điều kiện | Bắt buộc với Đăng ký lần đầu; để trống với Loại đăng ký khác. |
| 24 | Giấy tờ kèm theo | 7 Mẫu số 01b; 6 Mẫu số 02b; 5 Mẫu số 03b | Text(2000) | Không | Liệt kê giấy tờ kèm theo Phiếu yêu cầu. |
| 25 | Tên file đính kèm | - | String(1000) | Không | Tên tệp trong tệp nén .zip tải lên kèm, nhiều tệp cách nhau bởi dấu ";" theo [BR-NDL-008]. |
| 26 | Ghi chú | - | Text(1000) | Không | |

##### 4.3.2.26.7.2. Sheet BEN_BAO_DAM (mục 3), BEN_NHAN_BAO_DAM (mục 4) (mỗi dòng là 01 chủ thể)

\- Chỉ nhập với Đăng ký lần đầu; Đăng ký thay đổi, Xóa đăng ký không nhập (có dòng của hồ sơ thì hồ sơ bị đánh dấu Lỗi).

| STT | Cột | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :-- | :--- | :--- | :---: | :--- |
| 1 | Mã hồ sơ trong file | String(20) | Có | Trùng với Mã hồ sơ ở sheet HO_SO. |
| 2 | STT chủ thể | Integer(10) | Có | 1, 2, 3... trong cùng hồ sơ. |
| 3 | Tên đầy đủ | String(255) | Có | Full name. Viết chữ IN HOA. |
| 4 | Địa chỉ | String(500) | Có | Address. Theo cú pháp "Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia" tại [BR-VAL-015]. |
| 5 | Loại giấy tờ xác định tư cách pháp lý | Enum(String(100)) | Có | Identification documents. Danh sách như cột Loại giấy tờ của sheet HO_SO. |
| 6 | Số giấy tờ | String(50) | Có | No. Nhập dạng văn bản, giữ số 0 ở đầu. |
| 7 | Cơ quan cấp | String(255) | Không | Issued by. |
| 8 | Ngày cấp | Date | Không | dd/mm/yyyy. |
| 9 | Số điện thoại | String(20) | Không | Tel. |
| 10 | Fax | String(20) | Không | |
| 11 | Thư điện tử | String(100) | Không | Email. |
| 12 | Ghi chú | Text(1000) | Không | |

\- Không có các cột Loại chủ thể, Quốc tịch / Quốc gia.

##### 4.3.2.26.7.3. Sheet TAI_SAN (mục 6 - Mô tả tài sản bảo đảm, mỗi dòng là 01 tàu bay)

\- Chỉ nhập với Đăng ký lần đầu; Đăng ký thay đổi, Xóa đăng ký không nhập (có dòng của hồ sơ thì hồ sơ bị đánh dấu Lỗi).

| STT | Cột | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :-- | :--- | :--- | :---: | :--- |
| 1 | Mã hồ sơ trong file | String(20) | Có | Trùng với Mã hồ sơ ở sheet HO_SO. |
| 2 | STT tài sản | Integer(10) | Có | 1, 2, 3... trong cùng hồ sơ. |
| 3 | Số hiệu đăng ký | String(20) | Có | Registration Mark. VD: VN-A000. |
| 4 | Loại tàu bay | String(255) | Có | Type of Aircraft. |
| 5 | Kiểu tàu bay | String(100) | Có | Designation of Aircraft. VD: A321-200. |
| 6 | Nhà sản xuất | String(255) | Có | Manufacturer. |
| 7 | Số xuất xưởng tàu bay | String(50) | Có | Aircraft Serial Number. |
| 8 | Năm xuất xưởng | Integer(4) | Không | Year of Delivery from the Manufacturer. yyyy. |
| 9 | Kiểu loại động cơ | String(255) | Không | Designation of Engines. |
| 10 | Thời điểm hình thành | Date | Không | Time of Formation. dd/mm/yyyy, với tàu bay hình thành trong tương lai. |
| 11 | Ghi chú | Text(1000) | Không | |

##### 4.3.2.26.7.4. Sheet DANH_MUC, HUONG_DAN

\- Sheet DANH_MUC gồm 06 danh sách:

\+ Cơ quan đăng ký (sinh theo cấu hình cơ quan đăng ký của Loại tài sản tại thời điểm tải file mẫu).

\+ Loại đăng ký.

\+ Loại hình đăng ký.

\+ Người yêu cầu đăng ký.

\+ Loại giấy tờ.

\+ Căn cứ xóa đăng ký.

\- Sheet HUONG_DAN gồm: cấu trúc tệp, quy tắc nhập, cách nhập theo Loại đăng ký, cách khai báo file đính kèm.

<a id="kiem-tra-du-lieu-tau-bay"></a>
#### 4.3.2.26.8. Kiểm tra dữ liệu tàu bay

\- Áp dụng chung cho Nhận từ Excel, Thêm mới thủ công và Sửa; đơn vị kiểm tra là hồ sơ theo [BR-NDL-003].

\- Ngoài các quy tắc chung tại [BR-NDL-003], dữ liệu tàu bay được kiểm tra:

\+ Cột có dấu (*) bắt buộc nhập; cột có danh sách chọn chỉ nhận giá trị thuộc sheet DANH_MUC; Cơ quan đăng ký phải thuộc danh sách cơ quan đăng ký đã cấu hình cho Tàu bay theo [BR-NDL-011]. Cột chỉ áp dụng cho một số Loại đăng ký (Loại hình đăng ký, Số hợp đồng bảo đảm, Thời điểm có hiệu lực của hợp đồng, Nghĩa vụ được bảo đảm) không kiểm tra với Loại đăng ký không áp dụng.

\+ Bắt buộc theo Loại đăng ký:

\* Đăng ký lần đầu: Loại hình đăng ký, Số hợp đồng bảo đảm, Thời điểm có hiệu lực của hợp đồng, Nghĩa vụ được bảo đảm; Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp để trống hoặc trùng Số đăng ký.

\* Đăng ký thay đổi: Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Loại hình đăng ký, Nội dung thay đổi.

\* Xóa đăng ký: Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp, Căn cứ xóa đăng ký.

\+ Đăng ký lần đầu: Hồ sơ phải có ít nhất 01 Bên bảo đảm, 01 Bên nhận bảo đảm, 01 tàu bay; vi phạm hiển thị [MSG-ERR-NDL-005].

\+ Đăng ký thay đổi, Xóa đăng ký: Không nhập Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm; tệp có dòng của hồ sơ tại sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN thì hồ sơ bị đánh dấu Lỗi với nội dung "[Loại đăng ký] không nhập Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm (chỉ nhập với Đăng ký lần đầu). Vui lòng xóa các dòng của hồ sơ tại sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.".

\+ Thời điểm đăng ký, Thời điểm có hiệu lực theo định dạng dd/mm/yyyy hh:mm; Thời điểm đăng ký không lớn hơn thời điểm hiện tại.

\+ Thời điểm có hiệu lực không nhỏ hơn Thời điểm đăng ký; vi phạm hiển thị "Thời điểm có hiệu lực không được nhỏ hơn Thời điểm đăng ký.".

\+ Thời điểm có hiệu lực của hợp đồng, Ngày cấp, Thời điểm hình thành theo định dạng dd/mm/yyyy; Ngày cấp không lớn hơn ngày hiện tại.

\+ Họ và tên / Tên tổ chức của Người yêu cầu đăng ký, Tên đầy đủ của Bên bảo đảm, Bên nhận bảo đảm viết chữ IN HOA; vi phạm hiển thị "Phải viết chữ IN HOA.".

\+ Thư điện tử đúng định dạng thư điện tử.

\+ Loại giấy tờ là Mã số thuế và Số giấy tờ là chữ số: Kiểm tra theo [BR-VAL-005].

\+ Năm xuất xưởng gồm 04 chữ số.

\- Kiểm tra trùng hồ sơ theo [BR-NDL-004]: cùng Cơ quan đăng ký, Số đăng ký và Loại đăng ký với bản ghi tàu bay trạng thái "Hiệu lực".

\- Liên kết các lần đăng ký theo [BR-NDL-005]: Đăng ký thay đổi, Xóa đăng ký liên kết với hồ sơ gốc theo Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp.

\+ Chưa có hồ sơ gốc "Hiệu lực": Vẫn ghi nhận, hiển thị cảnh báo [MSG-WRN-NDL-001].

\+ Hồ sơ gốc đã có bản ghi Xóa đăng ký "Hiệu lực": Không ghi nhận, hiển thị [MSG-ERR-NDL-006].

\- Cảnh báo trùng tàu bay theo [BR-NDL-007]: trùng Nhà sản xuất và Số xuất xưởng tàu bay với tàu bay của hồ sơ khác đang có Tình trạng "Đang bảo đảm"; hiển thị [MSG-WRN-NDL-002], không chặn ghi nhận.

\- Nội dung chưa đưa vào biểu mẫu, chờ khách hàng xác nhận: dữ liệu Thông báo xử lý tài sản bảo đảm (Mẫu số 04b).
