### 4.3.2.4. Ký duyệt Phiếu đăng ký

#### 4.3.2.4.1. Mục đích

\- Cho phép Lãnh đạo xem chi tiết, duyệt (ký số), từ chối hoặc trả lại (đối với hồ sơ có Nguồn tiếp nhận là "Trực tiếp") Phiếu đăng ký biện pháp bảo đảm, hợp đồng và thông báo xử lý tài sản bảo đảm đã được Cán bộ trình ký ở trạng thái **"Chờ ký"**.

*a. Phân quyền*

\- Lãnh đạo được phân quyền ký duyệt Phiếu đăng ký: Được phép xem, duyệt, từ chối và trả lại (chỉ với hồ sơ có Nguồn tiếp nhận là "Trực tiếp") các hồ sơ thuộc đơn vị quản lý, thuộc phạm vi thẩm quyền và được Cán bộ trình tới đúng Lãnh đạo đó.

\- Lãnh đạo không được sửa dữ liệu Phiếu đăng ký và không được thay thế file PDF đã được Cán bộ trình ký.

*b. Điều kiện thực hiện*

\- Lãnh đạo đã đăng nhập thành công vào Website Quản trị.

\- Hồ sơ đang ở trạng thái "Chờ ký" và đã có file PDF chờ ký được Cán bộ trình ký.

\- Máy trạm của Lãnh đạo có thành phần ký số cục bộ và USB Token/chứng thư số hợp lệ để thực hiện ký số.

---

<a id="mh01"></a>
#### 4.3.2.4.2. MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký

##### 4.3.2.4.2.1. Màn hình

![Màn hình Danh sách Phiếu đăng ký chờ ký](images/UC_DK_LD_MH01_Danh_sach_Phieu_dang_ky_cho_ky.png)

##### 4.3.2.4.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | - | - | - | Hiển thị và xử lý giống khối **I. Bộ lọc tìm kiếm** tại [Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh01), bao gồm cả Khối lọc động theo Loại tài sản.<br>- Bổ sung thêm trường **Cán bộ xử lý**. |
| Cán bộ xử lý | Enum(String(255)) | Không | Tất cả | Control UI: Combobox.<br>- Đặt ngay sau trường Nguồn tiếp nhận.<br>- Gồm:<br>+ Tất cả<br>+ Danh sách Cán bộ đã trình ký hồ sơ tới Lãnh đạo đăng nhập, thuộc đơn vị quản lý của Lãnh đạo.<br>- Lọc chính xác theo Cán bộ đã trình ký hồ sơ. |
| **II. Bảng danh sách Phiếu đăng ký chờ ký** | - | - | - | |
| Bảng danh sách Phiếu đăng ký | Text(1000) | Không | 20 bản ghi/trang | Control UI: Bảng dữ liệu (Grid) kèm thanh phân trang.<br>- Các cột hiển thị (bao gồm các Cột động theo Loại tài sản) giống khối **II. Bảng danh sách Phiếu đăng ký chờ duyệt** tại [Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh01), trừ Thanh công cụ và cột Thao tác mô tả tại màn hình này.<br>- Chỉ hiển thị Phiếu đăng ký ở trạng thái "Chờ ký" được Cán bộ trình tới Lãnh đạo đang đăng nhập.<br>- **Mặc định khi mở màn hình**: Thời điểm đăng ký trong 3 tháng gần nhất (từ ngày hiện tại trừ 3 tháng đến ngày hiện tại), các bộ lọc còn lại là "Tất cả"/Trống, không hiển thị cột động, 20 bản ghi/trang.<br>- Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên hồ sơ đến trước.<br>- Cột Cán bộ xử lý hiển thị Cán bộ đã trình ký hồ sơ.<br>- Trạng thái không có dữ liệu (Empty State): bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"* và các nút điều hướng trang ở trạng thái khóa mờ (Disabled). |
| Thanh công cụ (Toolbar) | - | - | - | Control UI: Nhóm nút phía trên Bảng danh sách, dùng cho thao tác lô trên các hồ sơ đã tích chọn.<br>Gồm:<br>+ Duyệt<br>+ Từ chối<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Checkbox | Boolean | Không | Không tích | Control UI: Checkbox chọn dòng / Chọn tất cả.<br>- Cho phép chọn một hoặc nhiều hồ sơ để thực hiện thao tác lô (Duyệt, Từ chối) trên thanh công cụ.<br>- Checkbox chọn tất cả tại tiêu đề bảng chỉ chọn các hồ sơ đang hiển thị trên trang hiện tại.<br>- Khi Lãnh đạo đổi bộ lọc tìm kiếm, trang dữ liệu hoặc số bản ghi/trang, hệ thống xóa danh sách hồ sơ đã chọn. |
| Thao tác | - | - | - | Control UI: Nhóm icon thao tác trên dòng.<br>Gồm:<br>+ Duyệt<br>+ Từ chối<br>+ Trả lại: chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.4.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống tìm kiếm Phiếu đăng ký ở trạng thái "Chờ ký" được trình tới Lãnh đạo đăng nhập theo các điều kiện đã nhập tại Khối Bộ lọc tìm kiếm (bao gồm Cán bộ xử lý và Khối lọc động theo Loại tài sản nếu đang hiển thị).<br>- **TH1 (Điều kiện ngày không hợp lệ)**: Nếu `Từ ngày` lớn hơn `Đến ngày` (quy định: Từ ngày phải nhỏ hơn hoặc bằng Đến ngày), hệ thống hiển thị [MSG-ERR-VAL-007], highlight viền đỏ ô nhập và không thực hiện tìm kiếm.<br>- **TH2 (Không có dữ liệu trả về)**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo [MSG-INF-SYS-001].<br>+ Thanh phân trang: Dòng số lượng hiển thị *"Hiển thị 0-0 trong tổng số 0 bản ghi"*; các nút điều hướng trang ở trạng thái khóa mờ (Disabled).<br>- **TH Hợp lệ (Có dữ liệu trả về)**: Hệ thống thực hiện:<br>+ Hiển thị danh sách Phiếu đăng ký thỏa mãn đồng thời các điều kiện lọc.<br>+ Sắp xếp mặc định theo `Thời điểm đăng ký` tăng dần.<br>+ Phân trang theo số dòng hiển thị đang chọn. |
| 2 | Xóa bộ lọc | Nút | Hệ thống thực hiện:<br>+ Đưa toàn bộ tiêu chí lọc về mặc định: Từ ngày là ngày hiện tại trừ 3 tháng, Đến ngày là ngày hiện tại, các Combobox (bao gồm Cán bộ xử lý) về "Tất cả", các ô nhập về Trống.<br>+ Ẩn Khối lọc động và các cột động theo Loại tài sản.<br>+ Đặt lại phân trang về Trang 1 và tải lại danh sách. |
| 3 | Chọn Loại tài sản | Combobox | Hiển thị và xử lý giống chức năng **Chọn Loại tài sản** tại [Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh01). |
| 4 | Duyệt (thanh công cụ) | Nút trên Toolbar | Duyệt nhiều hồ sơ đã tích chọn trên lưới cùng một lúc.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-DK-008], không mở popup.<br>- **TH2 (Vượt quá số lượng hồ sơ ký duyệt/lần)**: Nếu số hồ sơ được chọn lớn hơn giới hạn cấu hình (mặc định 20 hồ sơ/lần), hệ thống hiển thị [MSG-WRN-DK-002] và không mở popup.<br>- **TH3 (Có hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Duyệt Phiếu đăng ký](#mh03) và truyền danh sách hồ sơ đã chọn vào popup. |
| 5 | Duyệt (trên lưới) | Icon trên dòng | Duyệt hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Duyệt Phiếu đăng ký](#mh03) cho hồ sơ tại dòng được chọn. |
| 6 | Từ chối (thanh công cụ) | Nút trên Toolbar | Từ chối nhiều hồ sơ đã tích chọn trên lưới cùng một lúc.<br>- **TH1 (Chưa chọn hồ sơ)**: Quy định phải chọn ít nhất một hồ sơ trên lưới. Hệ thống hiển thị [MSG-ERR-DK-008], không mở popup.<br>- **TH2 (Có hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối Phiếu đăng ký](#mh04) và truyền danh sách hồ sơ đã chọn vào popup; Lý do từ chối áp dụng cho toàn bộ hồ sơ trong danh sách. |
| 7 | Từ chối (trên lưới) | Icon trên dòng | Từ chối hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối Phiếu đăng ký](#mh04) cho hồ sơ tại dòng được chọn. |
| 8 | Trả lại (trên lưới) | Icon trên dòng | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp". Trả lại hồ sơ tại dòng được chọn.<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Trả lại Phiếu đăng ký](#mh05) cho hồ sơ tại dòng được chọn. |
| 9 | Click dòng dữ liệu | Row click | Mở [MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký](#mh02) của bản ghi được chọn. |
| 10 | Sắp xếp cột | Header cột | Hiển thị và xử lý giống chức năng **Sắp xếp cột** tại [Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh01). |
| 11 | Chọn tất cả | Checkbox header | Tích chọn hoặc bỏ chọn toàn bộ các bản ghi đang hiển thị trên trang hiện tại phục vụ thao tác lô (Duyệt, Từ chối) trên thanh công cụ. |

---

<a id="mh02"></a>
#### 4.3.2.4.3. MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký

##### 4.3.2.4.3.1. Màn hình

![Màn hình Xem chi tiết Phiếu đăng ký chờ ký](images/UC_DK_LD_MH02_Xem_chi_tiet_Phieu_dang_ky_cho_ky.png)

##### 4.3.2.4.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Nội dung màn hình** | - | - | - | Hiển thị và xử lý giống các khối từ **I. Sidebar dòng thời gian lịch sử** đến **VI. Tài liệu đính kèm** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02).<br>- **Mặc định khi mở màn hình**: hệ thống focus (chọn và tô nổi bật) vào đúng phiên bản tương ứng với bản ghi Lãnh đạo đã chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01).<br>- Toàn bộ dữ liệu ở trạng thái chỉ đọc. |
| Thanh nút chức năng | - | - | - | Control UI: Nhóm nút cuối màn hình.<br>Gồm:<br>+ Đóng<br>+ Trả lại<br>+ Từ chối<br>+ Duyệt<br>- Nút Duyệt, Từ chối và Trả lại chỉ hiển thị khi hồ sơ ở trạng thái "Chờ ký".<br>- Nút Trả lại chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.4.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn phiên bản trên Timeline | Click item | Hiển thị và xử lý giống chức năng **Chọn phiên bản trên Timeline** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02). |
| 2 | Lọc vùng biến động | Checkbox toggle | Hiển thị và xử lý giống chức năng **Lọc vùng biến động** tại [Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#mh02). |
| 3 | Xem file | Link / Nút | Cho phép xem file tại một tab riêng. |
| 4 | Đóng | Nút | Hệ thống đóng màn hình Xem chi tiết và quay lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01), giữ nguyên bộ lọc tìm kiếm và trang dữ liệu trước đó. |
| 5 | Trả lại | Nút | Chỉ hiển thị với hồ sơ có Nguồn tiếp nhận là "Trực tiếp".<br>- **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH05 - Popup Trả lại Phiếu đăng ký](#mh05) cho hồ sơ đang xem. |
| 6 | Từ chối | Nút | - **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH04 - Popup Từ chối Phiếu đăng ký](#mh04) cho hồ sơ đang xem. |
| 7 | Duyệt | Nút | - **TH1 (Hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không mở popup.<br>- **TH Hợp lệ**: Hệ thống mở [MH03 - Popup Duyệt Phiếu đăng ký](#mh03) cho hồ sơ đang xem. |

---

<a id="mh03"></a>
#### 4.3.2.4.4. MH03 - Popup Duyệt Phiếu đăng ký

##### 4.3.2.4.4.1. Màn hình

![Popup Duyệt Phiếu đăng ký](images/UC_DK_LD_MH03_Popup_duyet_Phieu_dang_ky.png)

##### 4.3.2.4.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ ký số** | - | - | - | |
| Danh sách hồ sơ ký số | Text(4000) | Có | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Hiển thị một hoặc nhiều hồ sơ đã chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01) hoặc hồ sơ đang xem tại [MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký](#mh02). |
| Tổng số hồ sơ | Integer(10) | Có | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Hiển thị tổng số hồ sơ ký số, đặt phía trên bảng.<br>- Không vượt quá giới hạn cấu hình, mặc định tối đa 20 hồ sơ/lần. |
| Cột: STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng trong danh sách. |
| Cột: Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04]. |
| Cột: Người yêu cầu | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Loại file chờ ký | Enum(String(100)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>Gồm:<br>+ Văn bản chứng nhận<br>+ Thông báo từ chối |
| Cột: File PDF chờ ký | File | - | Lấy theo dữ liệu bản ghi | Control UI: Link `Xem file`, chỉ đọc.<br>- File PDF đã được Cán bộ trình ký và khóa phiên bản.<br>- Cho phép xem file tại một tab riêng. |
| Cột: Trạng thái ký số | Enum(String(50)) | - | Chưa ký | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa ký<br>+ Đang ký<br>+ Ký thành công<br>+ Ký lỗi |
| Hình thức ký số | Enum(String(100)) | Có | USB Token Ban Cơ yếu Chính phủ | Control UI: Label, chỉ đọc. |
| **II. Thông tin thiết bị ký số** | - | - | - | |
| Trạng thái USB Token | Enum(String(50)) | Không | Chưa kiểm tra | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>Gồm:<br>+ Chưa kiểm tra<br>+ Đã nhận thiết bị<br>+ Không nhận thiết bị<br>+ Chứng thư số không hợp lệ<br>+ Chứng thư số hợp lệ |
| Chứng thư số | Text(1000) | Không | Theo USB Token | Control UI: Label, chỉ đọc.<br>- Thông tin chứng thư số đọc được từ USB Token. |
| Người ký | String(255) | Không | Theo chứng thư số | Control UI: Label, chỉ đọc.<br>- Người sở hữu chứng thư số dùng để ký. |
| Thời hạn chứng thư số | String(255) | Không | Theo chứng thư số | Control UI: Label, chỉ đọc. |

##### 4.3.2.4.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 2 | Kiểm tra USB Token | Nút | - **TH1 (USB Token chưa sẵn sàng hoặc không đọc được chứng thư số hợp lệ)**: Hệ thống hiển thị [MSG-ERR-DK-011] và chưa cho phép ký số.<br>- **TH2 (Chứng thư số không khớp với Lãnh đạo được phân công ký)**: Hệ thống hiển thị [MSG-ERR-DK-012] và chưa cho phép ký số.<br>- **TH Hợp lệ**: Hệ thống thực hiện:<br>+ Nhận diện USB Token, đọc chứng thư số.<br>+ Kiểm tra thời hạn chứng thư số và trạng thái thu hồi (nếu có tích hợp OCSP/CRL).<br>+ Hiển thị Trạng thái USB Token là "Chứng thư số hợp lệ". |
| 3 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 4 | Ký số | Nút | Ký số toàn bộ hồ sơ trong danh sách chỉ với một lần xác nhận; hệ thống ký lần lượt từng file PDF, mỗi hồ sơ có kết quả ký độc lập.<br>- **TH1 (USB Token/chứng thư số chưa hợp lệ)**: Hệ thống hiển thị [MSG-ERR-DK-011] hoặc [MSG-ERR-DK-012], không thực hiện ký số.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có file PDF chờ ký hợp lệ)**: Hệ thống hiển thị [MSG-ERR-DK-005] hoặc [MSG-ERR-DK-010] và không ký hồ sơ đó; các hồ sơ hợp lệ khác vẫn được ký.<br>- **TH3 (Lãnh đạo hủy ký, nhập sai PIN hoặc thành phần ký số trả lỗi)**: Hệ thống hiển thị [MSG-ERR-DK-013], cập nhật Trạng thái ký số của hồ sơ là "Ký lỗi" và giữ nguyên trạng thái hồ sơ "Chờ ký".<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-013]. Sau khi Lãnh đạo xác nhận, hệ thống thực hiện:<br>+ Thành phần ký số cục bộ yêu cầu nhập PIN USB Token; hệ thống không lưu PIN.<br>+ Ký số trực tiếp trên file PDF chờ ký tại vùng ký của lá mặt/trang ký và xác minh chữ ký sau khi ký.<br>+ Lưu file PDF đã ký, thông tin chứng thư số, người ký, thời điểm ký, phiên bản file đã ký.<br>+ Hồ sơ có Loại file chờ ký là "Văn bản chứng nhận": chuyển sang trạng thái "Hoàn thành".<br>+ Hồ sơ có Loại file chờ ký là "Thông báo từ chối": chuyển sang trạng thái "Bị từ chối" và tạo yêu cầu hoàn tiền theo [Quy tắc tạo yêu cầu hoàn tiền khi từ chối hồ sơ Online - Quản lý đối soát thanh toán - Module Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_doi_soat_thanh_toan.md#6-quy-tac-tao-yeu-cau-hoan-tien-khi-tu-choi-ho-so-online) đối với hồ sơ trực tuyến.<br>+ Đồng bộ trạng thái và file kết quả sang Website Khách hàng.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-KT-005], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). |

---

<a id="mh04"></a>
#### 4.3.2.4.5. MH04 - Popup Từ chối Phiếu đăng ký

##### 4.3.2.4.5.1. Màn hình

![Popup Từ chối Phiếu đăng ký](images/UC_DK_LD_MH04_Popup_tu_choi_Phieu_dang_ky.png)

##### 4.3.2.4.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Danh sách hồ sơ từ chối | Text(4000) | Có | Theo hồ sơ đã chọn | Control UI: Bảng dữ liệu, chỉ đọc.<br>- Hiển thị một hoặc nhiều hồ sơ đã chọn tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01) hoặc hồ sơ đang xem tại [MH02 - Màn hình Xem chi tiết Phiếu đăng ký chờ ký](#mh02). |
| Tổng số hồ sơ | Integer(10) | Có | Theo hồ sơ đã chọn | Control UI: Label, chỉ đọc.<br>- Hiển thị tổng số hồ sơ bị từ chối, đặt phía trên bảng. |
| Cột: STT | Integer(10) | - | Tự tăng | Control UI: Label, chỉ đọc.<br>- Số thứ tự dòng trong danh sách. |
| Cột: Số đăng ký | String(50) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Cột: Tên bên bảo đảm | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Nếu có nhiều Bên bảo đảm, hiển thị nối bằng dấu phẩy. |
| Cột: Loại đăng ký | Enum(String(50)) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04]. |
| Cột: Cán bộ xử lý | String(255) | - | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ đã trình ký hồ sơ. |
| Lý do từ chối | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do từ chối hồ sơ...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.4.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 2 | Xác nhận | Nút | - **TH1 (Bỏ trống Lý do từ chối)**: Quy định Lý do từ chối là bắt buộc. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập và focus con trỏ vào ô nhập. Không thực hiện từ chối.<br>- **TH2 (Có hồ sơ không còn ở trạng thái "Chờ ký")**: Hệ thống hiển thị [MSG-ERR-DK-005], không thực hiện từ chối.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-015]. Sau khi Lãnh đạo xác nhận, hệ thống thực hiện:<br>+ Lưu người từ chối, thời điểm từ chối, lý do từ chối và phiên bản dữ liệu/file PDF bị từ chối.<br>+ Chuyển hồ sơ sang trạng thái "Bị từ chối".<br>+ Tạo yêu cầu hoàn tiền theo [Quy tắc tạo yêu cầu hoàn tiền khi từ chối hồ sơ Online - Quản lý đối soát thanh toán - Module Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Quan_ly_doi_soat_thanh_toan.md#6-quy-tac-tao-yeu-cau-hoan-tien-khi-tu-choi-ho-so-online) đối với hồ sơ trực tuyến.<br>+ Đồng bộ trạng thái sang Website Khách hàng.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-KT-003], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). |

---

<a id="mh05"></a>
#### 4.3.2.4.6. MH05 - Popup Trả lại Phiếu đăng ký

##### 4.3.2.4.6.1. Màn hình

![Popup Trả lại Phiếu đăng ký](images/UC_DK_LD_MH05_Popup_tra_lai_Phieu_dang_ky.png)

##### 4.3.2.4.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Số đăng ký | String(50) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Số đăng ký của hồ sơ bị trả lại. |
| Loại đăng ký | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Tham chiếu Danh mục Loại hình đăng ký [DM_04]. |
| Người yêu cầu | String(255) | Không | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Luôn hiển thị "Trực tiếp". |
| Cán bộ xử lý | String(255) | Có | Lấy theo dữ liệu bản ghi | Control UI: Label, chỉ đọc.<br>- Cán bộ đã trình ký hồ sơ, là người nhận lại hồ sơ để cập nhật. |
| File PDF chờ ký | File | Có | Lấy theo dữ liệu bản ghi | Control UI: Link `Xem file`, chỉ đọc.<br>- Cho phép xem file tại một tab riêng. |
| Lý do trả lại | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: "Nhập lý do trả lại hồ sơ...".<br>- Bắt buộc nhập; hệ thống tự động loại bỏ dấu cách thừa đầu/cuối trước khi kiểm tra. |

##### 4.3.2.4.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 2 | Hủy | Nút | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ và quay lại màn hình đã mở popup. |
| 3 | Xác nhận | Nút | - **TH1 (Bỏ trống Lý do trả lại)**: Quy định Lý do trả lại là bắt buộc. Hệ thống tô viền đỏ ô nhập, hiển thị [MSG-ERR-VAL-001] dạng Inline ngay phía dưới ô nhập và focus con trỏ vào ô nhập. Không thực hiện trả lại.<br>- **TH2 (Hồ sơ không còn ở trạng thái "Chờ ký" hoặc không có Nguồn tiếp nhận là "Trực tiếp")**: Quy định chỉ được trả lại hồ sơ có Nguồn tiếp nhận là "Trực tiếp" đang ở trạng thái "Chờ ký". Hệ thống hiển thị [MSG-ERR-DK-005], không thực hiện trả lại.<br>- **TH Hợp lệ**: Hệ thống yêu cầu xác nhận bằng [MSG-CFM-DK-014]. Sau khi Lãnh đạo xác nhận, hệ thống thực hiện:<br>+ Lưu người trả lại, thời điểm trả lại, lý do trả lại và phiên bản dữ liệu/file PDF bị trả lại.<br>+ Chuyển hồ sơ sang trạng thái "Bị trả lại" để Cán bộ cập nhật và trình ký lại tại Tab Hồ sơ Bị trả lại - [Kiểm tra và xử lý hồ sơ - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Kiem_tra_va_xu_ly_ho_so_Can_bo.md). Thao tác trả lại không phát sinh hoàn phí.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-KT-006], đóng popup và tải lại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ ký](#mh01). |