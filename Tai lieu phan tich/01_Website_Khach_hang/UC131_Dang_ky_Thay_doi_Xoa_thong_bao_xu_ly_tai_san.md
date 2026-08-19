### 4.1.5. UC131 - Đăng ký thông báo xử lý tài sản bảo đảm, đăng ký thay đổi, xóa đăng ký thông báo xử lý tài sản bảo đảm

#### 4.1.5.1. Mục đích
- Cho phép Bên nhận bảo đảm (Khách hàng) hoặc người đại diện hợp pháp thực hiện đăng ký thông báo xử lý tài sản bảo đảm (lần đầu), đăng ký thay đổi nội dung thông báo, hoặc xóa đăng ký thông báo xử lý trên Website dành cho khách hàng khi Bên bảo đảm vi phạm nghĩa vụ hoặc theo thỏa thuận xử lý tài sản để thu hồi nợ.

*a. Phân quyền*

- Cá nhân, Tổ chức thực hiện giao dịch (Bên nhận bảo đảm, Chi nhánh của pháp nhân, Người đại diện hợp pháp).

*b. Điều kiện thực hiện (Pre-conditions)*

- Người dùng đã đăng nhập thành công vào hệ thống và được phân quyền thực hiện tính năng.
- Hồ sơ Đăng ký biện pháp bảo đảm gốc phải thỏa mãn:
  - Trạng thái pháp lý hiện tại của hồ sơ gốc phải là "Hoàn thành" (đã ký duyệt và đang có hiệu lực).
  - Hồ sơ gốc không nằm trong danh sách đang bị "Ngăn chặn / Tạm dừng" bởi quyết định của cơ quan thi hành án hoặc Tòa án.
  - Không tồn tại một yêu cầu "Xóa đăng ký biện pháp bảo đảm" (UC026) đang trong quá trình Chờ duyệt (trạng thái Chờ thanh toán, Chờ duyệt, Duyệt Duyệt chờ ký, Duyệt chờ ký).

#### 4.1.5.2. UC131.MH01 - Màn hình Tra cứu hồ sơ gốc và chọn loại thông báo

##### 4.1.5.2.1. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số đăng ký lần đầu | String(50) | Có | Trống | - Nhập chính xác số đăng ký của biện pháp bảo đảm gốc lần đầu đã được cấp. |
| Số PIN | String(50) | Có | Trống | - Nhập mã số PIN bảo mật của hồ sơ gốc tương ứng để xác thực quyền truy cập. |
| Loại thông báo | Enum(String(50)) | Có | - - Lựa chọn loại thông báo -- | Control UI: Hộp chọn.<br>- Chọn một trong các giá trị:<br>- **Thông báo lần đầu**<br>- **Thông báo thay đổi**<br>- **Xóa Thông báo** |

##### 4.1.5.2.2. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tiếp tục | Nút | - Thao tác: NSD click nút Tiếp tục để hệ thống kiểm tra điều kiện hồ sơ gốc và điều kiện nghiệp vụ ứng với Loại thông báo đã chọn.<br>- Kiểm tra:<br>- **TH1 (Bỏ trống trường bắt buộc):** Hệ thống hiển thị cảnh báo lỗi dưới các trường bắt buộc bị bỏ trống.<br>- **TH2 (Sai thông tin đăng ký):** Số đăng ký lần đầu hoặc Số PIN không tồn tại hoặc không khớp trong CSDL. Hệ thống hiển thị thông báo lỗi: "Số đăng ký lần đầu hoặc Số PIN không chính xác. Vui lòng kiểm tra lại."<br>- **TH3 (Hồ sơ gốc chưa hoàn thành):** Trạng thái của hồ sơ gốc tương ứng không phải là "Hoàn thành". Hệ thống hiển thị thông báo lỗi: "Hồ sơ gốc chưa ở trạng thái Hoàn thành. Không thể thực hiện đăng ký thông báo xử lý tài sản."<br>- **TH4 (Hồ sơ gốc bị ngăn chặn):** Hồ sơ gốc đang có quyết định ngăn chặn/tạm dừng bởi Cơ quan thi hành án hoặc Tòa án. Hệ thống chặn và hiển thị thông báo lỗi: "Hồ sơ gốc đang bị tạm dừng/ngăn chặn giao dịch. Không thể thực hiện thông báo xử lý."<br>- **TH5 (Có hồ sơ liên quan đang xử lý):** Đang tồn tại hồ sơ liên quan đang xử lý ở một trong các trạng thái: "Chờ thanh toán", "Chờ duyệt", "Duyệt chờ ký", "Sai lệch thanh toán". Hồ sơ liên quan bao gồm các loại:<br>- Đăng ký thay đổi<br>- Xóa đăng ký<br>- Hủy đăng ký<br>- Thông báo xử lý tài sản<br>- Thay đổi thông báo xử lý tài sản<br>- xóa thông báo xử lý tài sản<br>- Chỉnh lý thông tin có sai sót.<br>Hệ thống chặn không cho phép thực hiện, thông báo: "Tồn tại hồ sơ liên quan chưa được phê duyệt hoàn thành. Vui lòng kiểm tra lại."<br>  - **TH6 (Quy tắc theo loại thông báo chọn):**<br>    * *Nếu chọn "Thông báo lần đầu":* Hệ thống kiểm tra trong CSDL, nếu đã tồn tại Thông báo xử lý tài sản bảo đảm lần đầu ở trạng thái "Có hiệu lực" thì chặn và hiển thị thông báo lỗi: "Hồ sơ gốc đã được đăng ký thông báo xử lý tài sản bảo đảm lần đầu đang có hiệu lực. Vui lòng chọn loại hình Thay đổi hoặc Xóa thông báo."<br>    * *Nếu chọn "Thông báo thay đổi":* Hệ thống kiểm tra trong CSDL, nếu chưa tồn tại Thông báo xử lý tài sản bảo đảm lần đầu ở trạng thái "Có hiệu lực" thì chặn và hiển thị thông báo lỗi: "Hồ sơ gốc chưa được đăng ký thông báo xử lý tài sản bảo đảm lần đầu. Không thể thực hiện đăng ký thay đổi."<br>    * *Nếu chọn "Xóa Thông báo":* Hệ thống kiểm tra trong CSDL, nếu chưa tồn tại Thông báo xử lý tài sản bảo đảm lần đầu ở trạng thái "Có hiệu lực" thì chặn và hiển thị thông báo lỗi: "Hồ sơ gốc chưa được đăng ký thông báo xử lý tài sản bảo đảm lần đầu. Không thể thực hiện xóa thông báo."<br>  - **TH Hợp lệ:** Các điều kiện thỏa mãn. Hệ thống thực hiện chuyển hướng:<br>    * *Nếu chọn "Thông báo lần đầu":* Chuyển hướng sang luồng UC131.1 (Màn hình UC131.1.MH02).<br>    * *Nếu chọn "Thông báo thay đổi":* Chuyển hướng sang luồng UC131.2 (Màn hình UC131.2.MH02).<br>    * *Nếu chọn "Xóa Thông báo":* Chuyển hướng sang luồng UC131.3 (Màn hình UC131.3.MH02). |

---

#### 4.1.5.3. UC131.1 - Đăng ký thông báo xử lý tài sản bảo đảm lần đầu

##### 4.1.5.3.1. UC131.1.MH02 - Màn hình Nhập thông tin đăng ký thông báo xử lý lần đầu

##### 4.1.5.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin người yêu cầu đăng ký** | | | | |
| Người yêu cầu đăng ký | Enum(String(50)) | Có | "Bên nhận bảo đảm" | Control UI: Hộp chọn.<br>- Tham chiếu tại Danh mục dùng chung - Danh mục Người yêu cầu đăng ký [DM_17]. Chỉ hiển thị giá trị:<br>- Bên nhận bảo đảm |
| Tải lên tài liệu chứng minh (pdf) | File | Tùy điều kiện | Trống | - Tự động ẩn (do chỉ hiển thị và bắt buộc đính kèm khi Người yêu cầu đăng ký chọn đối tượng là "Chi nhánh của pháp nhân, người đại diện").<br>- Chỉ nhận tệp .pdf, dung lượng tối đa 20MB.<br>**- Xem file**: Chỉ hiển thị khi có file được tải lên. Cho phép mở file sang tab mới trên trình duyệt <br>**- Xóa**: Chỉ hiển thị khi có file được tải lên. Hiển thị cạnh tên file đã tải lên. Cho phép xóa file đã tải lên |
| **II. Thông tin tham chiếu hồ sơ gốc (Read-only)** | | | | |
| Trường hợp đăng ký | String(100) | Có | "Thông báo xử lý tài sản đảm bảo lần đầu" | - Hiển thị cố định dạng chỉ đọc. |
| Số đăng ký lần đầu | String(50) | Có | Theo hồ sơ gốc | - Hiển thị Số đăng ký lần đầu đã nhập ở bước tra cứu. |
| Thời điểm đăng ký lần đầu | String(255) | Có | Theo hồ sơ gốc | - Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Xem hồ sơ gốc | - | Có | - | Control UI: Label/Chỉ đọc - Read-only.<br>- Đường dẫn mở tệp PDF văn bản chứng nhận đăng ký biện pháp bảo đảm gốc. |
| **III. Thông tin chung & Nghĩa vụ được bảo đảm (Tự động điền)** | | | | |
| Thời điểm đăng ký | String(255) | Có | Thời điểm hiện tại | - Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss` khi gửi thành công. |
| Loại hình giao dịch | Enum(String(50)) | Có | "Thông báo xử lý tài sản bảo đảm" | Control UI: Hộp chọn.<br>- Hiển thị cố định dạng chỉ đọc. |
| Cơ quan tiếp nhận | Enum(String(100)) | Có | Theo hồ sơ gốc | Control UI: Hộp chọn.<br>- Mặc định hiển thị theo Cơ quan tiếp nhận của hồ sơ gốc.<br>- Cho phép NSD thay đổi Cơ quan tiếp nhận tại màn nhập liệu. |
| Loại biện pháp | Enum(String(50)) | Có | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Hộp chọn.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Biện pháp bảo đảm". |
| Loại hợp đồng | Enum(String(50)) | Có | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Hộp chọn.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Hợp đồng". |
| Số hợp đồng | String(100) | Có | Theo hồ sơ gốc/Thay đổi gần nhất | - Số hợp đồng đã đăng ký. |
| Ngày có hiệu lực của hợp đồng | Date | Có | Theo hồ sơ gốc/Thay đổi gần nhất | - Định dạng: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | Decimal(18,0) | Không | Theo hồ sơ gốc/Thay đổi gần nhất | - Giá trị khoản vay/nghĩa vụ của hồ sơ gốc. |
| Quy mô | Enum(String(50)) | Không | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Hộp chọn.<br>- Quy mô bên bảo đảm của hồ sơ gốc. |
| Chủ doanh nghiệp là nữ giới? | Boolean | Không | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Checkbox.<br>- Trạng thái tích chọn từ hồ sơ gốc. |
| **IV. Bộ dữ liệu xử lý tài sản** | | | | Control UI: Không hiển thị thành khối độc lập tách khỏi danh sách tài sản.<br>- Các trường Lý do xử lý, Thời gian xử lý, Địa điểm xử lý được hệ thống hiển thị trong khối **Thông tin xử lý tài sản** nằm ngay dưới từng nhóm Loại tài sản tại Mục V khi nhóm đó có tài sản được tích chọn.<br>- Nếu nhiều nhóm Loại tài sản có tài sản được chọn, khối **Thông tin xử lý tài sản** được hiển thị dưới từng nhóm đó nhưng sử dụng cùng một bộ dữ liệu chung của hồ sơ. |
| Lý do xử lý | String(500) | Có | Trống | - Nhập trực tiếp lý do xử lý tài sản bảo đảm. |
| Thời gian xử lý | Date | Có | Trống | - Dự kiến thời điểm bắt đầu thu giữ hoặc xử lý tài sản. Định dạng nhập liệu: `dd/mm/yyyy`. Phải lớn hơn hoặc bằng ngày hiện tại. |
| Địa điểm xử lý | String(500) | Có | Trống | - Địa điểm dự kiến tiến hành xử lý tài sản. |
| **V. Danh sách tài sản xử lý** | | | | |
| Lưới tài sản bảo đảm | - | Có | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Nhóm thông tin theo từng Loại tài sản.<br>- Hiển thị danh sách toàn bộ tài sản từ hồ sơ gốc/Thay đổi gần nhất để người dùng tích chọn thông báo xử lý.<br>- Hệ thống nhóm tài sản theo từng Loại tài sản bảo đảm [DM_07].<br>- Tên Loại tài sản hiển thị dạng tiêu đề/in đậm.<br>- Ngay dưới từng Loại tài sản, hệ thống hiển thị đúng khối thông tin tài sản thuộc loại đó.<br>- Với Loại tài sản có danh sách nhiều dòng, hệ thống hiển thị bảng/lưới ngay dưới tiêu đề Loại tài sản.<br>- Với Loại tài sản có mô tả dạng Textarea, hệ thống hiển thị nội dung mô tả ngay dưới tiêu đề Loại tài sản.<br>- Người dùng tích chọn tài sản tại đúng nhóm Loại tài sản tương ứng.<br>- Khi có ít nhất một tài sản trong nhóm được tích chọn, hệ thống hiển thị khối **Thông tin xử lý tài sản** ngay bên dưới nhóm Loại tài sản đó.<br>- Khối **Thông tin xử lý tài sản** đồng bộ với bộ dữ liệu xử lý chung tại Mục IV và hiển thị từng dòng riêng:<br>- Lý do xử lý.<br>- Thời gian xử lý.<br>- Địa điểm xử lý.<br>- Không đặt khối **Thông tin xử lý tài sản** ở cuối màn hình hoặc ngoài nhóm Loại tài sản.<br>- Dữ liệu tài sản ở trạng thái chỉ đọc; người dùng chỉ được tích/bỏ tích chọn tài sản. |
| Cột: Tích chọn thông báo | Boolean | Có | Trống | Control UI: Checkbox.<br>- NSD tích chọn để đưa tài sản vào danh sách thông báo xử lý tài sản bảo đảm. Cho phép tích chọn một hoặc nhiều tài sản. |
| Loại tài sản | Enum(String(50)) | - | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Hiển thị loại tài sản bảo đảm tương ứng theo [DM_07]. |
| Mô tả | Text(2000) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Hiển thị ngay bên dưới từng Loại tài sản tương ứng nếu tài sản thuộc một trong các loại:<br>- "Cây hằng năm, công trình tạm"<br>- "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)" |
| Vùng tìm kiếm nhanh - Bảng thông tin Số khung | - | Không | Trống | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Số khung.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập/ô chọn riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>- Tên phương tiện.<br>- Số khung.<br>- Số máy.<br>- Biển số.<br>- Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>- Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>- Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Số khung theo các tiêu chí đã nhập.<br>- Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>- Kết quả lọc không làm thay đổi dữ liệu gốc của bảng và không làm mất trạng thái checkbox các dòng đã chọn.<br>- Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Số khung | - | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)**.<br>- Tiêu đề bảng là **Số khung \***.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN**.<br>- NHÃN HIỆU, MÀU SƠN.<br>- SỐ KHUNG.<br>- SỐ MÁY.<br>- BIỂN SỐ.<br>- Cột TÊN PHƯƠNG TIỆN trong bảng hiển thị giá trị theo Danh mục dùng chung - Danh mục Tên phương tiện [DM_41], gồm "Mô tô", "Ô tô", "Xe máy chuyên dùng".<br>- Người dùng tích chọn tài sản xử lý tại cột Checkbox của từng dòng Số khung.<br>- Nếu có ít nhất một dòng được tích chọn, hệ thống hiển thị khối **Thông tin xử lý tài sản** ngay bên dưới Bảng thông tin Số khung. |
| Vùng tìm kiếm nhanh - Bảng thông tin Phương tiện | - | Không | Trống | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Phương tiện.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>- Tên phương tiện/Nhãn hiệu.<br>- Tên/Họ tên chủ phương tiện/chủ sở hữu.<br>- Số đăng ký.<br>- Cơ quan cấp giấy chứng nhận.<br>- Không tìm kiếm theo Cấp phương tiện.<br>- Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>- Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>- Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Phương tiện theo các tiêu chí đã nhập.<br>- Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>- Kết quả lọc không làm thay đổi dữ liệu gốc của bảng và không làm mất trạng thái checkbox các dòng đã chọn.<br>- Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Phương tiện | - | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt**.<br>- Tiêu đề bảng là **Phương tiện**.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN, NHÃN HIỆU**.<br>- TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>- SỐ ĐĂNG KÝ.<br>- CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>- CẤP PHƯƠNG TIỆN.<br>- Người dùng tích chọn tài sản xử lý tại cột Checkbox của từng dòng Phương tiện.<br>- Nếu có ít nhất một dòng được tích chọn, hệ thống hiển thị khối **Thông tin xử lý tài sản** ngay bên dưới Bảng thông tin Phương tiện. |
| Tên quyền | String(255) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi tài sản là "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Căn cứ phát sinh quyền | Text(2000) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi tài sản là "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Hàng hóa luân chuyển / Kho hàng | Enum(String(50)) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi tài sản là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh hoặc kho hàng. |
| Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi chọn "Hàng hóa luân chuyển" hoặc "Kho hàng". |
| Địa chỉ kho hàng | String(500) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi chọn "Kho hàng". Định dạng hiển thị: "Địa chỉ chi tiết, Tỉnh/Thành phố, Quốc gia". |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi chọn "Kho hàng". |
| Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam | - | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>Chỉ hiển thị khi tài sản là "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung". Hiển thị các cột GIỜ, PHÚT, NGÀY, THÁNG, NĂM giống hồ sơ gốc. |

##### 4.1.5.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | - Quay lại màn hình UC131.MH01, giữ nguyên Số đăng ký và Số PIN đã nhập. |
| 2 | Lưu nháp | Nút | - Lưu tạm hồ sơ dưới trạng thái "Lưu nháp" mà không kiểm tra tính đầy đủ thông tin. |
| 3 | Tiếp tục | Nút | - Thao tác: NSD click nút Tiếp tục.<br>- Kiểm tra:<br>- **TH1 (Bỏ trống trường bắt buộc):** Hệ thống hiển thị cảnh báo lỗi dưới các trường bắt buộc bị bỏ trống.<br>- **TH2 (Chưa chọn tài sản xử lý):** Chưa tích chọn ít nhất 1 tài sản trên lưới. Hệ thống báo lỗi: "Vui lòng tích chọn ít nhất một tài sản để thực hiện thông báo xử lý."<br>- **TH3 (Thời gian xử lý không hợp lệ):** Ngày xử lý nhỏ hơn ngày hiện tại. Báo lỗi: "Thời gian xử lý phải lớn hơn hoặc bằng ngày hiện tại".<br>- **TH4 (Tài sản bị khóa bởi giao dịch khác):** Có tài sản được chọn đang ở trạng thái `Đang xử lý tài sản` hoặc đang bị khóa bởi hồ sơ thay đổi/xóa khác đang chờ duyệt. Hệ thống báo lỗi: "Tài sản [Tên/Số khung] đang trong tiến trình xử lý khác. Không thể thực hiện."<br>- **TH Hợp lệ:** Chuyển hướng người dùng sang Màn hình Xem trước (UC131.1.MH03) kèm theo dữ liệu tạm của hồ sơ thông báo xử lý. |
| 4 | Cập nhật | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị đối với trường hợp Cập nhật Thông báo xử lý tài sản bảo đảm lần đầu (Người dùng chọn Cập nhật tại màn hình Quản lý yêu cầu đã đăng ký) và hồ sơ ở trạng thái Chờ duyệt hoặc Bị từ chối.<br>- **Thao tác**: NSD click nút "Cập nhật" ở cuối màn hình.<br>- **Kiểm tra**: Thực hiện các bước kiểm tra (validation) dữ liệu tương tự như khi thực hiện lần đầu (các bước validate khi bấm nút Tiếp tục tại STT 3).<br>- **Xử lý**:<br>- Nếu hồ sơ ở trạng thái Chờ duyệt: Thực hiện các bước kiểm tra (validation) dữ liệu tương tự như khi thực hiện lần đầu. Hệ thống lưu lại thông tin cập nhật và giữ nguyên trạng thái Chờ duyệt.<br>- Nếu hồ sơ ở trạng thái Bị từ chối: Hệ thống lưu lại thông tin cập nhật đồng thời chuyển hồ sơ sang trạng thái Chờ duyệt. Phiên bản lịch sử Bị từ chối (Rejected snapshot) cùng ý kiến từ chối của cán bộ vẫn được hiển thị đầy đủ khi xem chi tiết để đối chiếu.<br>- Hệ thống hiển thị thông báo thành công: "Cập nhật thông tin hồ sơ thành công."<br>- Chuyển hướng người dùng quay trở lại Màn hình Danh sách yêu cầu đã đăng ký ([SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md)). Đóng form cập nhật thông tin. |
| 5 | Hủy | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị đối với trường hợp Cập nhật Thông báo xử lý tài sản bảo đảm lần đầu (Người dùng chọn Cập nhật tại màn hình Quản lý yêu cầu đã đăng ký) và hồ sơ ở trạng thái Chờ duyệt hoặc Bị từ chối hoặc Chờ thanh toán.<br>- **Thao tác**: NSD click nút "Hủy" ở cuối màn hình.<br>- **Xử lý**: Hệ thống đóng màn hình Cập nhật và trở về màn Danh sách yêu cầu đã đăng ký ([SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md)). |

---

##### 4.1.5.3.4. UC131.1.MH03 - Màn hình Xem trước (Review) đăng ký lần đầu

##### 4.1.5.3.5. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin người yêu cầu đăng ký** | | | | |
| Người yêu cầu đăng ký | String(100) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Đối tượng thực hiện đăng ký đã chọn ở MH02. |
| Tài liệu chứng minh (pdf) | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Link xem/tải tệp đính kèm tài liệu chứng minh tư cách pháp lý (nếu có). |
| **II. Thông tin tham chiếu hồ sơ gốc** | | | | |
| Trường hợp đăng ký | String(255) | - | "Thông báo xử lý tài sản đảm bảo lần đầu" | Control UI: Label/Chỉ đọc - Read-only.<br>- Trạng thái chỉ đọc. |
| Số đăng ký lần đầu | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Số đăng ký lần đầu của hồ sơ gốc. |
| Thời điểm đăng ký lần đầu | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Xem hồ sơ gốc | - | - | - | Control UI: Label/Chỉ đọc - Read-only.<br>- Đường dẫn mở tệp PDF văn bản chứng nhận đăng ký biện pháp bảo đảm gốc. |
| **III. Thông tin chung & Nghĩa vụ được bảo đảm** | | | | |
| Thời điểm đăng ký | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Loại hình giao dịch | Enum(String(50)) | - | "Thông báo xử lý tài sản bảo đảm" | Control UI: Label/Chỉ đọc - Read-only.<br>- Trạng thái chỉ đọc. |
| Cơ quan tiếp nhận | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Cơ quan tiếp nhận hồ sơ. |
| Loại biện pháp | Enum(String(50)) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Biện pháp bảo đảm". |
| Loại hợp đồng | Enum(String(50)) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Hợp đồng". |
| Số hợp đồng | Decimal(18,0) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Số hợp đồng. |
| Ngày có hiệu lực của hợp đồng | Date | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Định dạng: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | Decimal(18,0) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Giá trị khoản vay/nghĩa vụ của hồ sơ gốc. |
| Quy mô | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Quy mô bên bảo đảm. |
| Chủ doanh nghiệp là nữ giới? | Boolean | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Hiển thị "Có" hoặc "Không" tương ứng trạng thái tích chọn. |
| **IV. Danh sách tài sản xử lý** | | | | |
| Lưới tài sản bảo đảm | - | - | Lấy từ MH02 | Control UI: Nhóm thông tin theo từng Loại tài sản, chỉ đọc.<br>- Chỉ hiển thị các tài sản đã được người dùng tích chọn xử lý ở MH02.<br>- Hiển thị theo đúng thứ tự và cấu trúc nhóm Loại tài sản tại màn nhập liệu.<br>- Tên Loại tài sản hiển thị dạng tiêu đề/in đậm.<br>- Ngay dưới từng Loại tài sản, hệ thống hiển thị **Danh sách tài sản xử lý** thuộc loại đó.<br>- Sau khi hiển thị xong **Danh sách tài sản xử lý**, hệ thống hiển thị khối **Thông tin xử lý tài sản** ở trạng thái chỉ đọc.<br>- Khối **Thông tin xử lý tài sản** hiển thị từng dòng riêng:<br>- Lý do xử lý.<br>- Thời gian xử lý.<br>- Địa điểm xử lý.<br>- Không hiển thị khối **Thông tin xử lý tài sản** thành một khối riêng ngoài nhóm Loại tài sản.<br>- Không cho phép sửa/xóa. |
| Loại tài sản | Enum(String(50)) | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>Hiển thị loại tài sản bảo đảm tương ứng theo [DM_07]. |
| Mô tả | Text(2000) | Tùy điều kiện | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>Hiển thị ngay bên dưới từng Loại tài sản tương ứng nếu tài sản thuộc một trong các loại:<br>- "Cây hằng năm, công trình tạm"<br>- "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)" |
| Bảng thông tin Số khung | - | Tùy điều kiện | Lấy từ MH02 | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)** nếu có tài sản Số khung được chọn xử lý.<br>- Tiêu đề bảng là **Số khung \***.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN**.<br>- NHÃN HIỆU, MÀU SƠN.<br>- SỐ KHUNG.<br>- SỐ MÁY.<br>- BIỂN SỐ.<br>- Cột TÊN PHƯƠNG TIỆN trong bảng hiển thị giá trị theo Danh mục dùng chung - Danh mục Tên phương tiện [DM_41], gồm "Mô tô", "Ô tô", "Xe máy chuyên dùng".<br>- Sau Bảng thông tin Số khung, hệ thống hiển thị khối **Thông tin xử lý tài sản** ở trạng thái chỉ đọc. |
| Bảng thông tin Phương tiện | - | Tùy điều kiện | Lấy từ MH02 | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt** nếu có tài sản Phương tiện được chọn xử lý.<br>- Tiêu đề bảng là **Phương tiện**.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN, NHÃN HIỆU**.<br>- TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>- SỐ ĐĂNG KÝ.<br>- CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>- CẤP PHƯƠNG TIỆN.<br>- Sau Bảng thông tin Phương tiện, hệ thống hiển thị khối **Thông tin xử lý tài sản** ở trạng thái chỉ đọc. |
| **V. Thông tin xử lý tài sản** | | | | Control UI: Label Chỉ đọc.<br>- Hiển thị sau **Danh sách tài sản xử lý** của từng Loại tài sản.<br>- Không hiển thị thành một khối độc lập tách khỏi từng Loại tài sản. |
| Lý do xử lý | Text(2000) | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>- Hiển thị thành một dòng riêng trong khối **Thông tin xử lý tài sản**. |
| Thời gian xử lý | Datetime | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>- Hiển thị thành một dòng riêng trong khối **Thông tin xử lý tài sản**.<br>- Định dạng: `dd/mm/yyyy`. |
| Địa điểm xử lý | String(255) | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>- Hiển thị thành một dòng riêng trong khối **Thông tin xử lý tài sản**. |

##### 4.1.5.3.6. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | - Thao tác: NSD click nút Quay lại.<br>- Xử lý: Đóng màn hình xem trước và quay trở về màn hình Nhập thông tin (UC131.1.MH02), giữ nguyên toàn bộ dữ liệu đã nhập trên form và trạng thái tích chọn trên lưới tài sản. |
| 2 | Tiếp tục | Nút | - Thao tác: NSD click nút Tiếp tục.<br>- Kiểm tra: Hệ thống phân loại tài khoản đăng nhập để xử lý lệ phí.<br>- Xử lý:<br>- **TH Hợp lệ 1 (Không được miễn phí):** Ghi nhận hồ sơ dưới trạng thái **"Chờ thanh toán"** (Chưa sinh mã PIN bảo mật và Số đăng ký chính thức), thực hiện đóng gói thông tin thanh toán (Mã hồ sơ, lệ phí xử lý lấy từ biểu phí, nội dung thanh toán). Chuyển hướng người dùng sang Cổng thanh toán [UC158 - Quản lý thanh toán phí](UC158_Quan_ly_thanh_toan_phi.md).<br>- **TH Hợp lệ 2 (Được miễn phí):** Ghi nhận hồ sơ dưới trạng thái **"Chờ duyệt"** (không cần thanh toán), sinh Mã hồ sơ phục vụ tra cứu, và chuyển tiếp trực tiếp sang Màn hình kết quả (UC131.1.MH04) hiển thị Modal thông báo tiếp nhận hồ sơ thành công. |
| 3 | Lắng nghe trạng thái thanh toán & Hiển thị kết quả (Auto) | Background Task / Redirect | Hệ thống thực hiện lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook callback) và hiển thị kết quả giao dịch tại Màn hình Kết quả Giao dịch chung của hệ thống.<br>- Chi tiết quy trình xử lý Webhook cho các trường hợp TH1 đến TH7: Tham chiếu tại [4.1.2.3. Lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook Callback) của UC158](UC158_Quan_ly_thanh_toan_phi.md#4123-lang-nghe-trang-thai-thanh-toan-tu-cong-thanh-toan-webhook-callback).<br>- Chi tiết giao diện và cấu hình hiển thị kết quả giao dịch: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung). |

---

##### 4.1.5.3.7. Màn hình Kết quả thanh toán
- Sau khi thực hiện thanh toán xong trên Cổng thanh toán trực tuyến, hệ thống tự động chuyển hướng người dùng quay trở lại hệ thống và hiển thị kết quả giao dịch trên Màn hình kết quả giao dịch chung.
- Chi tiết thông tin giao diện và các quy tắc hiển thị động cho nghiệp vụ Đăng ký thông báo xử lý tài sản bảo đảm lần đầu: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung).

---

#### 4.1.5.4. UC131.2 - Đăng ký thay đổi thông báo xử lý tài sản bảo đảm

##### 4.1.5.4.1. UC131.2.MH02 - Màn hình Nhập thông tin thay đổi thông báo xử lý

##### 4.1.5.4.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin người yêu cầu đăng ký** | | | | |
| Người yêu cầu đăng ký | Enum(String(50)) | Có | "Bên nhận bảo đảm" | Control UI: Hộp chọn.<br>- Tham chiếu tại Danh mục dùng chung - Danh mục Người yêu cầu đăng ký [DM_17]. Lấy từ thông báo gốc, chỉ hiển thị giá trị:<br>- Bên nhận bảo đảm |
| Tải lên tài liệu chứng minh (pdf) | File | Tùy điều kiện | Trống | - Tự động ẩn (do chỉ hiển thị và bắt buộc đính kèm khi Người yêu cầu đăng ký chọn đối tượng là "Chi nhánh của pháp nhân, người đại diện").<br>- Chỉ nhận tệp .pdf, dung lượng tối đa 20MB.<br>**- Xem file**: Chỉ hiển thị khi có file được tải lên. Cho phép mở file sang tab mới trên trình duyệt <br>**- Xóa**: Chỉ hiển thị khi có file được tải lên. Hiển thị cạnh tên file đã tải lên. Cho phép xóa file đã tải lên |
| **II. Thông tin tham chiếu hồ sơ gốc (Read-only)** | | | | |
| Trường hợp đăng ký | String(100) | Có | "Thay đổi thông báo xử lý tài sản bảo đảm" | Control UI: Label/Chỉ đọc - Read-only.<br>- Hiển thị cố định dạng chỉ đọc. |
| Số thông báo gốc | String(50) | Có | Theo thông báo gốc | Control UI: Label/Chỉ đọc - Read-only.<br>- Số thông báo xử lý tài sản gốc đã chọn ở bước tra cứu. |
| Số đăng ký lần đầu | String(50) | Có | Theo hồ sơ gốc | Control UI: Label/Chỉ đọc - Read-only.<br>- Số đăng ký lần đầu của biện pháp bảo đảm gốc. |
| Thời điểm đăng ký lần đầu | String(255) | Có | Theo hồ sơ gốc | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ đăng ký lần đầu của biện pháp bảo đảm gốc.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | Datetime | Không | Theo hồ sơ gốc | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ hồ sơ gốc được ký duyệt/có hiệu lực trên hệ thống.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`.<br>- Chỉ hiển thị khi hồ sơ gốc đã có hiệu lực. |
| Xem hồ sơ gốc | - | Có | - | Control UI: Label/Chỉ đọc - Read-only.<br>- Đường dẫn mở tệp PDF văn bản chứng nhận đăng ký biện pháp bảo đảm gốc. |
| **III. Thông tin chung & Nghĩa vụ được bảo đảm (Tự động điền)** | | | | Toàn bộ trường trong khối này ở trạng thái chỉ đọc (Read-only), không cho phép chỉnh sửa, ngoại trừ Cơ quan tiếp nhận. |
| Thời điểm đăng ký | String(255) | Có | Thời điểm hiện tại | Control UI: Label/Chỉ đọc - Read-only.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss` khi gửi thành công. |
| Loại hình giao dịch | Enum(String(50)) | Có | "Thông báo xử lý tài sản bảo đảm" | Control UI: Label/Chỉ đọc - Read-only.<br>- Hiển thị cố định dạng chỉ đọc. |
| Cơ quan tiếp nhận | Enum(String(100)) | Có | Theo hồ sơ gốc | Control UI: Hộp chọn.<br>- Mặc định hiển thị theo Cơ quan tiếp nhận của hồ sơ gốc/thông báo gốc hoặc thay đổi gần nhất.<br>- Cho phép NSD thay đổi Cơ quan tiếp nhận tại màn nhập liệu. |
| Loại biện pháp | Enum(String(50)) | Có | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label/Chỉ đọc - Read-only.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Biện pháp bảo đảm". |
| Loại hợp đồng | Enum(String(50)) | Có | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label/Chỉ đọc - Read-only.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Hợp đồng". |
| Số hợp đồng | String(100) | Có | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label/Chỉ đọc - Read-only.<br>- Số hợp đồng đã đăng ký. |
| Ngày có hiệu lực của hợp đồng | Date | Có | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label/Chỉ đọc - Read-only.<br>- Định dạng: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | Decimal(18,0) | Không | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label/Chỉ đọc - Read-only.<br>- Giá trị khoản vay/nghĩa vụ của hồ sơ gốc. |
| Quy mô | Enum(String(50)) | Không | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label/Chỉ đọc - Read-only.<br>- Quy mô bên bảo đảm. |
| Chủ doanh nghiệp là nữ giới? | Boolean | Không | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label/Chỉ đọc - Read-only (Checkbox vô hiệu hóa).<br>- Trạng thái tích chọn từ hồ sơ gốc, không cho phép chỉnh sửa. |
| **IV. Bộ dữ liệu xử lý tài sản** | | | | Control UI: Không hiển thị thành khối độc lập tách khỏi danh sách tài sản.<br>- Các trường Lý do xử lý, Thời gian xử lý, Địa điểm xử lý được hệ thống hiển thị trong khối **Thông tin xử lý tài sản** nằm ngay dưới từng nhóm Loại tài sản tại Mục V khi nhóm đó có tài sản được tích chọn.<br>- Nếu nhiều nhóm Loại tài sản có tài sản được chọn, khối **Thông tin xử lý tài sản** được hiển thị dưới từng nhóm đó nhưng sử dụng cùng một bộ dữ liệu chung của hồ sơ thay đổi. |
| Lý do xử lý | String(500) | Có | Theo thông báo gốc/Thay đổi gần nhất | - Cho phép chỉnh sửa, nhập trực tiếp lý do xử lý tài sản bảo đảm. |
| Thời gian xử lý | Date | Có | Theo thông báo gốc/Thay đổi gần nhất | - Dự kiến thời điểm bắt đầu xử lý tài sản. Định dạng nhập liệu: `dd/mm/yyyy`. Phải lớn hơn hoặc bằng ngày hiện tại. |
| Địa điểm xử lý | String(500) | Có | Theo thông báo gốc/Thay đổi gần nhất | - Địa điểm dự kiến tiến hành xử lý tài sản. |
| **V. Danh sách tài sản xử lý** | | | | |
| Cột: Tích chọn thông báo | Boolean | Có | Trống | Control UI: Checkbox.<br>- NSD tích chọn hoặc bỏ tích chọn để thay đổi danh sách tài sản xử lý. |
| Loại tài sản | Enum(String(50)) | - | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Hiển thị loại tài sản bảo đảm tương ứng theo [DM_07]. |
| Mô tả | Text(2000) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Hiển thị ngay bên dưới từng Loại tài sản tương ứng nếu tài sản thuộc một trong các loại:<br>- "Cây hằng năm, công trình tạm"<br>- "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)" |
| Vùng tìm kiếm nhanh - Bảng thông tin Số khung | - | Không | Trống | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Số khung.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập/ô chọn riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>- Tên phương tiện.<br>- Số khung.<br>- Số máy.<br>- Biển số.<br>- Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>- Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>- Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Số khung theo các tiêu chí đã nhập.<br>- Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>- Kết quả lọc không làm thay đổi dữ liệu gốc của bảng và không làm mất trạng thái checkbox các dòng đã chọn.<br>- Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Số khung | - | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)**.<br>- Tiêu đề bảng là **Số khung \***.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN**.<br>- NHÃN HIỆU, MÀU SƠN.<br>- SỐ KHUNG.<br>- SỐ MÁY.<br>- BIỂN SỐ.<br>- Cột TÊN PHƯƠNG TIỆN trong bảng hiển thị giá trị theo Danh mục dùng chung - Danh mục Tên phương tiện [DM_41], gồm "Mô tô", "Ô tô", "Xe máy chuyên dùng".<br>- Người dùng tích chọn/bỏ tích chọn tài sản xử lý tại cột Checkbox của từng dòng Số khung.<br>- Nếu có ít nhất một dòng được tích chọn, hệ thống hiển thị khối **Thông tin xử lý tài sản** ngay bên dưới Bảng thông tin Số khung. |
| Vùng tìm kiếm nhanh - Bảng thông tin Phương tiện | - | Không | Trống | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Phương tiện.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>- Tên phương tiện/Nhãn hiệu.<br>- Tên/Họ tên chủ phương tiện/chủ sở hữu.<br>- Số đăng ký.<br>- Cơ quan cấp giấy chứng nhận.<br>- Không tìm kiếm theo Cấp phương tiện.<br>- Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>- Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>- Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Phương tiện theo các tiêu chí đã nhập.<br>- Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>- Kết quả lọc không làm thay đổi dữ liệu gốc của bảng và không làm mất trạng thái checkbox các dòng đã chọn.<br>- Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Phương tiện | - | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt**.<br>- Tiêu đề bảng là **Phương tiện**.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN, NHÃN HIỆU**.<br>- TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>- SỐ ĐĂNG KÝ.<br>- CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>- CẤP PHƯƠNG TIỆN.<br>- Người dùng tích chọn/bỏ tích chọn tài sản xử lý tại cột Checkbox của từng dòng Phương tiện.<br>- Nếu có ít nhất một dòng được tích chọn, hệ thống hiển thị khối **Thông tin xử lý tài sản** ngay bên dưới Bảng thông tin Phương tiện. |
| Tên quyền | String(255) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi tài sản là "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Căn cứ phát sinh quyền | Text(2000) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi tài sản là "Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản". |
| Hàng hóa luân chuyển / Kho hàng | Enum(String(50)) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi tài sản là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh hoặc kho hàng. |
| Giá trị hàng hóa/Tên, loại hàng hóa | Text(2000) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi chọn "Hàng hóa luân chuyển" hoặc "Kho hàng". |
| Địa chỉ kho hàng | String(500) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi chọn "Kho hàng". Định dạng hiển thị: "Địa chỉ chi tiết, Tỉnh/Thành phố, Quốc gia". |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | String(255) | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Chỉ hiển thị khi chọn "Kho hàng". |
| Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung tại Tổng công ty lưu ký và bù trừ chứng khoán Việt Nam | - | Tùy điều kiện | Theo hồ sơ gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>Chỉ hiển thị khi tài sản là "Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung". Hiển thị các cột GIỜ, PHÚT, NGÀY, THÁNG, NĂM giống hồ sơ gốc. |
##### 4.1.5.4.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | - Quay lại màn hình UC131.MH01, giữ nguyên Số đăng ký và PIN. |
| 2 | Lưu nháp | Nút | - Lưu tạm hồ sơ thay đổi dưới dạng "Lưu nháp". |
| 3 | Tiếp tục | Nút | - Kiểm tra các ràng buộc thông tin bắt buộc và ngày xử lý tương tự đăng ký lần đầu.<br>- Kiểm tra tài sản: Cho phép NSD tích chọn thêm hoặc bỏ chọn tài sản. Nếu bỏ chọn toàn bộ tài sản, hệ thống báo lỗi: "Vui lòng tích chọn ít nhất một tài sản cần xử lý."<br>- **TH Hợp lệ:** Chuyển sang Màn hình Xem trước thay đổi (UC131.2.MH03). |
| 4 | Cập nhật | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị đối với trường hợp Cập nhật Thay đổi thông báo xử lý tài sản bảo đảm (Người dùng chọn Cập nhật tại màn hình Quản lý yêu cầu đã đăng ký) và hồ sơ ở trạng thái Chờ duyệt hoặc Bị từ chối.<br>- **Thao tác**: NSD click nút "Cập nhật" ở cuối màn hình.<br>- **Kiểm tra**: Thực hiện các bước kiểm tra (validation) dữ liệu tương tự như khi thực hiện lần đầu (các bước validate khi bấm nút Tiếp tục tại STT 3).<br>- **Xử lý**:<br>- Nếu hồ sơ ở trạng thái Chờ duyệt: Thực hiện các bước kiểm tra (validation) dữ liệu tương tự như khi thực hiện lần đầu. Hệ thống lưu lại thông tin cập nhật và giữ nguyên trạng thái Chờ duyệt.<br>- Nếu hồ sơ ở trạng thái Bị từ chối: Hệ thống lưu lại thông tin cập nhật đồng thời chuyển hồ sơ sang trạng thái Chờ duyệt. Phiên bản lịch sử Bị từ chối (Rejected snapshot) cùng ý kiến từ chối của cán bộ vẫn được hiển thị đầy đủ khi xem chi tiết để đối chiếu.<br>- Hệ thống hiển thị thông báo thành công: "Cập nhật thông tin hồ sơ thành công."<br>- Chuyển hướng người dùng quay trở lại Màn hình Danh sách yêu cầu đã đăng ký ([SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md)). Đóng form cập nhật thông tin. |
| 5 | Hủy | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị đối với trường hợp Cập nhật Thay đổi thông báo xử lý tài sản bảo đảm (Người dùng chọn Cập nhật tại màn hình Quản lý yêu cầu đã đăng ký) và hồ sơ ở trạng thái Chờ duyệt hoặc Bị từ chối hoặc Chờ thanh toán.<br>- **Thao tác**: NSD click nút "Hủy" ở cuối màn hình.<br>- **Xử lý**: Hệ thống đóng màn hình Cập nhật và trở về màn Danh sách yêu cầu đã đăng ký ([SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md)). |

---

##### 4.1.5.4.4. UC131.2.MH03 - Màn hình Xem trước (Review) thay đổi thông báo xử lý

##### 4.1.5.4.5. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin người yêu cầu đăng ký** | | | | |
| Người yêu cầu đăng ký | String(100) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Đối tượng thực hiện đăng ký đã chọn ở MH02. |
| Tài liệu chứng minh (pdf) | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Link xem/tải tệp đính kèm tài liệu chứng minh tư cách pháp lý (nếu có). |
| **II. Thông tin tham chiếu hồ sơ gốc** | | | | |
| Trường hợp đăng ký | String(255) | - | "Thay đổi thông báo xử lý tài sản bảo đảm" | Control UI: Label/Chỉ đọc - Read-only.<br>- Trạng thái chỉ đọc. |
| Số thông báo gốc | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Số thông báo xử lý tài sản gốc. |
| Số đăng ký lần đầu | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Số đăng ký lần đầu của hồ sơ gốc. |
| Thời điểm đăng ký lần đầu | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ đăng ký lần đầu của biện pháp bảo đảm gốc. Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | Datetime | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ hồ sơ gốc được ký duyệt/có hiệu lực trên hệ thống. Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. Chỉ hiển thị khi hồ sơ gốc đã có hiệu lực. |
| Xem hồ sơ gốc | - | - | - | Control UI: Label/Chỉ đọc - Read-only.<br>- Đường dẫn mở tệp PDF văn bản chứng nhận đăng ký biện pháp bảo đảm gốc. |
| **III. Thông tin chung & Nghĩa vụ được bảo đảm** | | | | |
| Thời điểm đăng ký | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Loại hình giao dịch | Enum(String(50)) | - | "Thông báo xử lý tài sản bảo đảm" | Control UI: Label/Chỉ đọc - Read-only.<br>- Trạng thái chỉ đọc. |
| Cơ quan tiếp nhận | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Cơ quan tiếp nhận hồ sơ. |
| Loại biện pháp | Enum(String(50)) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Biện pháp bảo đảm". |
| Loại hợp đồng | Enum(String(50)) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Chỉ hiển thị khi Loại hình giao dịch là "Hợp đồng". |
| Số hợp đồng | Decimal(18,0) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Số hợp đồng. |
| Ngày có hiệu lực của hợp đồng | Date | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Định dạng: `dd/mm/yyyy`. |
| Giá trị khoản vay hoặc nghĩa vụ (VND) | Decimal(18,0) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Giá trị khoản vay/nghĩa vụ của hồ sơ gốc. |
| Quy mô | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Quy mô bên bảo đảm. |
| Chủ doanh nghiệp là nữ giới? | Boolean | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Hiển thị "Có" hoặc "Không". |
| **IV. Danh sách tài sản xử lý** | | | | |
| Loại tài sản | Enum(String(50)) | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>Hiển thị loại tài sản bảo đảm tương ứng theo [DM_07]. |
| Mô tả | Text(2000) | Tùy điều kiện | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>Hiển thị ngay bên dưới từng Loại tài sản tương ứng nếu tài sản thuộc một trong các loại:<br>- "Cây hằng năm, công trình tạm"<br>- "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)" |
| Bảng thông tin Số khung | - | Tùy điều kiện | Lấy từ MH02 | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)** nếu có tài sản Số khung được chọn xử lý.<br>- Tiêu đề bảng là **Số khung \***.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN**.<br>- NHÃN HIỆU, MÀU SƠN.<br>- SỐ KHUNG.<br>- SỐ MÁY.<br>- BIỂN SỐ.<br>- Cột TÊN PHƯƠNG TIỆN trong bảng hiển thị giá trị theo Danh mục dùng chung - Danh mục Tên phương tiện [DM_41], gồm "Mô tô", "Ô tô", "Xe máy chuyên dùng".<br>- Sau Bảng thông tin Số khung, hệ thống hiển thị khối **Thông tin xử lý tài sản** ở trạng thái chỉ đọc. |
| Bảng thông tin Phương tiện | - | Tùy điều kiện | Lấy từ MH02 | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt** nếu có tài sản Phương tiện được chọn xử lý.<br>- Tiêu đề bảng là **Phương tiện**.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN, NHÃN HIỆU**.<br>- TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>- SỐ ĐĂNG KÝ.<br>- CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>- CẤP PHƯƠNG TIỆN.<br>- Sau Bảng thông tin Phương tiện, hệ thống hiển thị khối **Thông tin xử lý tài sản** ở trạng thái chỉ đọc. |
| **V. Thông tin xử lý tài sản** | | | | Control UI: Label Chỉ đọc.<br>- Hiển thị sau **Danh sách tài sản xử lý** của từng Loại tài sản.<br>- Không hiển thị thành một khối độc lập tách khỏi từng Loại tài sản. |
| Lý do xử lý | Text(2000) | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>- Hiển thị thành một dòng riêng trong khối **Thông tin xử lý tài sản**. |
| Thời gian xử lý | Datetime | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>- Hiển thị thành một dòng riêng trong khối **Thông tin xử lý tài sản**.<br>- Định dạng: `dd/mm/yyyy`. |
| Địa điểm xử lý | String(255) | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>- Hiển thị thành một dòng riêng trong khối **Thông tin xử lý tài sản**. |

##### 4.1.5.4.5.1. Quy định hiển thị nhãn biến động

So sánh với phiên bản thông báo gần nhất đã có hiệu lực (thông báo gốc hoặc lần thay đổi gần nhất), màn hình gắn nhãn biến động ngay tại vị trí dữ liệu tương ứng, tương tự cơ chế nhãn biến động tại màn hình Xem chi tiết Phiếu đăng ký:

| Nhãn hiển thị | Áp dụng tại | Điều kiện hiển thị | Cách hiển thị |
| :-- | :-- | :-- | :-- |
| Bổ sung mới | Mục IV. Danh sách tài sản xử lý | Tài sản chưa thuộc danh sách tài sản xử lý ở thông báo gần nhất đã có hiệu lực, nhưng được tích chọn xử lý trong hồ sơ thay đổi đang xem. | Tag màu xanh đặt ngay sau tên tài sản/dòng tài sản tương ứng. Không hiển thị icon hover giá trị cũ vì thông báo trước chưa có tài sản này. |
| Rút khỏi thông báo | Mục IV. Danh sách tài sản xử lý | Tài sản đang thuộc danh sách tài sản xử lý ở thông báo gần nhất đã có hiệu lực, nhưng bị bỏ tích chọn trong hồ sơ thay đổi đang xem. | Tag màu đỏ đặt ngay sau tên tài sản/dòng tài sản tương ứng. |
| Sửa thông tin | Mục III (Cơ quan tiếp nhận) và khối Thông tin xử lý tài sản (Lý do xử lý, Thời gian xử lý, Địa điểm xử lý) | Trường đã có giá trị ở thông báo gần nhất đã có hiệu lực nhưng giá trị trong hồ sơ thay đổi đang xem khác với giá trị đó. | Tag màu vàng/cam đặt ngay sau tên trường. Trường có icon lịch sử; NSD hover vào icon để xem lại giá trị cũ của trường tương ứng. |

- Không gắn nhãn biến động cho các trường thuộc Mục I, II (thông tin tham chiếu hồ sơ gốc) vì các trường này luôn ở trạng thái Read-only, không thể thay đổi.
- Nếu một tài sản vừa được **Bổ sung mới** vừa có **Sửa thông tin** (VD: NSD vừa tích chọn xử lý vừa nhập Lý do xử lý riêng), chỉ hiển thị nhãn **Bổ sung mới**.

##### 4.1.5.4.6. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | - Đóng màn hình xem trước và quay trở về màn hình Nhập thông tin thay đổi (UC131.2.MH02), giữ nguyên dữ liệu đã cập nhật. |
| 2 | Tiếp tục | Nút | - Thao tác: NSD click nút Tiếp tục.<br>- Xử lý:<br>- **TH Hợp lệ 1 (Không được miễn phí):** Lưu hồ sơ ở trạng thái **"Chờ thanh toán"** (Chưa sinh mã PIN bảo mật), thực hiện đóng gói thông tin thanh toán (Mã hồ sơ, lệ phí xử lý, nội dung thanh toán). Chuyển tiếp sang Cổng thanh toán [UC158](UC158_Quan_ly_thanh_toan_phi.md) để thanh toán.<br>- **TH Hợp lệ 2 (Được miễn phí):** Chuyển thẳng hồ sơ sang trạng thái **"Chờ duyệt"**, sinh Mã hồ sơ phục vụ tra cứu và đi tiếp sang Màn hình kết quả (UC131.2.MH04). |
| 3 | Lắng nghe trạng thái thanh toán & Hiển thị kết quả (Auto) | Background Task / Redirect | Hệ thống thực hiện lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook callback) và hiển thị kết quả giao dịch tại Màn hình Kết quả Giao dịch chung của hệ thống.<br>- Chi tiết quy trình xử lý Webhook cho các trường hợp TH1 đến TH7: Tham chiếu tại [4.1.2.3. Lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook Callback) của UC158](UC158_Quan_ly_thanh_toan_phi.md#4123-lang-nghe-trang-thai-thanh-toan-tu-cong-thanh-toan-webhook-callback).<br>- Chi tiết giao diện và cấu hình hiển thị kết quả giao dịch: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung). |

---

##### 4.1.5.4.7. Màn hình Kết quả thanh toán
- Sau khi thực hiện thanh toán xong trên Cổng thanh toán trực tuyến, hệ thống tự động chuyển hướng người dùng quay trở lại hệ thống và hiển thị kết quả giao dịch trên Màn hình kết quả giao dịch chung.
- Chi tiết thông tin giao diện và các quy tắc hiển thị động cho nghiệp vụ Đăng ký thay đổi thông báo xử lý tài sản bảo đảm: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung).

---

#### 4.1.5.5. UC131.3 - Xóa đăng ký thông báo xử lý tài sản bảo đảm

##### 4.1.5.5.1. UC131.3.MH02 - Màn hình Nhập thông tin xóa thông báo xử lý

##### 4.1.5.5.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin người yêu cầu xóa** | | | | |
| Người yêu cầu đăng ký | Enum(String(50)) | Có | "Bên nhận bảo đảm" | Control UI: Hộp chọn.<br>- Tham chiếu tại Danh mục dùng chung - Danh mục Người yêu cầu đăng ký [DM_17]. Chỉ hiển thị giá trị:<br>- Bên nhận bảo đảm |
| Tải lên tài liệu chứng minh (pdf) | File | Tùy điều kiện | Trống | - Tự động ẩn (do chỉ hiển thị và bắt buộc đính kèm khi Người yêu cầu đăng ký chọn đối tượng là "Chi nhánh của pháp nhân, người đại diện").<br>- Chỉ nhận tệp .pdf, dung lượng tối đa 20MB.<br>**- Xem file**: Chỉ hiển thị khi có file được tải lên. Cho phép mở file sang tab mới trên trình duyệt <br>**- Xóa**: Chỉ hiển thị khi có file được tải lên. Hiển thị cạnh tên file đã tải lên. Cho phép xóa file đã tải lên |
| **II. Thông tin tham chiếu thông báo xử lý gốc (Read-only)** | | | | |
| Trường hợp đăng ký | String(100) | Có | "Xóa đăng ký thông báo xử lý tài sản bảo đảm" | Control UI: Label/Chỉ đọc - Read-only.<br>- Hiển thị cố định dạng chỉ đọc. |
| Số thông báo xử lý gốc | String(50) | Có | Theo thông báo gốc | Control UI: Label/Chỉ đọc - Read-only.<br>- Số thông báo xử lý tài sản bảo đảm lần đầu đang có hiệu lực. |
| Thời điểm đăng ký lần đầu | String(255) | Có | Theo thông báo gốc | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ đăng ký thông báo xử lý lần đầu.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | Datetime | Không | Theo thông báo gốc | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ thông báo xử lý gốc được ký duyệt/có hiệu lực trên hệ thống.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`.<br>- Chỉ hiển thị khi thông báo gốc đã có hiệu lực. |
| **III. Lý do xóa thông báo** | | | | |
| Lý do xóa thông báo | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn các lý do:<br>- Các bên thỏa thuận không xử lý tài sản bảo đảm.<br>- Nghĩa vụ được bảo đảm đã hoàn thành.<br>- Bên bảo đảm đã thực hiện xong nghĩa vụ để nhận lại tài sản.<br>- Lý do khác. |
| Văn bản chứng minh đính kèm (pdf) | File | Có | Trống | - Cho phép người dùng tải lên văn bản thỏa thuận/chứng minh việc không xử lý tài sản bảo đảm hoặc đã hoàn thành nghĩa vụ.<br>- Chỉ nhận tệp .pdf, dung lượng tối đa 20MB.<br>**- Xem file**: Chỉ hiển thị khi có file được tải lên. Cho phép mở file sang tab mới trên trình duyệt <br>**- Xóa**: Chỉ hiển thị khi có file được tải lên. Hiển thị cạnh tên file đã tải lên. Cho phép xóa file đã tải lên |
| **IV. Danh sách tài sản đang xử lý (Read-only) / Theo thông báo gốc/Thay đổi gần nhất** | | | | |
| Loại tài sản | Enum(String(50)) | - | Theo thông báo gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Hiển thị loại tài sản bảo đảm tương ứng theo [DM_07]. |
| Mô tả | Text(2000) | Tùy điều kiện | Theo thông báo gốc/Thay đổi gần nhất | Control UI: Label Chỉ đọc.<br>Hiển thị ngay bên dưới từng Loại tài sản tương ứng nếu tài sản thuộc một trong các loại:<br>- "Cây hằng năm, công trình tạm"<br>- "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)" |
| Vùng tìm kiếm nhanh - Bảng thông tin Số khung | - | Không | Trống | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Số khung.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập/ô chọn riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>- Tên phương tiện.<br>- Số khung.<br>- Số máy.<br>- Biển số.<br>- Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>- Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>- Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Số khung theo các tiêu chí đã nhập.<br>- Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>- Kết quả lọc không làm thay đổi dữ liệu gốc của bảng.<br>- Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Số khung | - | Tùy điều kiện | Theo thông báo gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)** nếu có tài sản Số khung đang xử lý.<br>- Tiêu đề bảng là **Số khung \***.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN**.<br>- NHÃN HIỆU, MÀU SƠN.<br>- SỐ KHUNG.<br>- SỐ MÁY.<br>- BIỂN SỐ.<br>- Cột TÊN PHƯƠNG TIỆN trong bảng hiển thị giá trị theo Danh mục dùng chung - Danh mục Tên phương tiện [DM_41], gồm "Mô tô", "Ô tô", "Xe máy chuyên dùng".<br>- Sau Bảng thông tin Số khung, hệ thống hiển thị thông tin xử lý tài sản đang có hiệu lực ở trạng thái chỉ đọc để người dùng đối chiếu trước khi xóa thông báo. |
| Vùng tìm kiếm nhanh - Bảng thông tin Phương tiện | - | Không | Trống | Control UI: Khối tiêu chí tìm kiếm nhanh đặt ngay phía trên Bảng thông tin Phương tiện.<br>- Mỗi tiêu chí hiển thị thành 01 ô nhập riêng, không nhập đồng thời trên cùng một ô input.<br>- Gồm các tiêu chí:<br>- Tên phương tiện/Nhãn hiệu.<br>- Tên/Họ tên chủ phương tiện/chủ sở hữu.<br>- Số đăng ký.<br>- Cơ quan cấp giấy chứng nhận.<br>- Không tìm kiếm theo Cấp phương tiện.<br>- Có nút **Tìm kiếm** và nút/icon **Xóa lọc**.<br>- Khi NSD nhập hoặc thay đổi giá trị tại một tiêu chí, hệ thống chưa tự động lọc danh sách.<br>- Khi NSD click **Tìm kiếm**, hệ thống lọc danh sách đang hiển thị của Bảng thông tin Phương tiện theo các tiêu chí đã nhập.<br>- Nếu nhập nhiều tiêu chí, hệ thống lọc đồng thời theo tất cả tiêu chí đã nhập.<br>- Kết quả lọc không làm thay đổi dữ liệu gốc của bảng.<br>- Khi NSD click **Xóa lọc**, hệ thống đưa toàn bộ tiêu chí tìm kiếm nhanh của bảng về trạng thái trống và hiển thị lại toàn bộ danh sách đang có. |
| Bảng thông tin Phương tiện | - | Tùy điều kiện | Theo thông báo gốc/Thay đổi gần nhất | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt** nếu có tài sản Phương tiện đang xử lý.<br>- Tiêu đề bảng là **Phương tiện**.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN, NHÃN HIỆU**.<br>- TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>- SỐ ĐĂNG KÝ.<br>- CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>- CẤP PHƯƠNG TIỆN.<br>- Sau Bảng thông tin Phương tiện, hệ thống hiển thị thông tin xử lý tài sản đang có hiệu lực ở trạng thái chỉ đọc để người dùng đối chiếu trước khi xóa thông báo. |

##### 4.1.5.5.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | - Quay lại màn hình UC131.MH01, giữ nguyên Số đăng ký và PIN. |
| 2 | Tiếp tục | Nút | - Kiểm tra các trường thông tin bắt buộc (Người yêu cầu, tài liệu chứng minh nếu có, lý do xóa, văn bản chứng minh đính kèm). Báo lỗi dưới trường tương ứng nếu bị bỏ trống.<br>- **TH Hợp lệ:** Chuyển hướng người dùng sang Màn hình Xem trước xóa thông báo (UC131.3.MH03). |
| 3 | Cập nhật | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị đối với trường hợp Cập nhật Xóa đăng ký thông báo xử lý tài sản bảo đảm (Người dùng chọn Cập nhật tại màn hình Quản lý yêu cầu đã đăng ký) và hồ sơ ở trạng thái Chờ duyệt hoặc Bị từ chối.<br>- **Thao tác**: NSD click nút "Cập nhật" ở cuối màn hình.<br>- **Kiểm tra**: Thực hiện các bước kiểm tra (validation) dữ liệu tương tự như khi thực hiện lần đầu (các bước validate khi bấm nút Tiếp tục tại STT 2).<br>- **Xử lý**:<br>- Nếu hồ sơ ở trạng thái Chờ duyệt: Thực hiện các bước kiểm tra (validation) dữ liệu tương tự như khi thực hiện lần đầu. Hệ thống lưu lại thông tin cập nhật và giữ nguyên trạng thái Chờ duyệt.<br>- Nếu hồ sơ ở trạng thái Bị từ chối: Hệ thống lưu lại thông tin cập nhật đồng thời chuyển hồ sơ sang trạng thái Chờ duyệt. Phiên bản lịch sử Bị từ chối (Rejected snapshot) cùng ý kiến từ chối của cán bộ vẫn được hiển thị đầy đủ khi xem chi tiết để đối chiếu.<br>- Hệ thống hiển thị thông báo thành công: "Cập nhật thông tin hồ sơ thành công."<br>- Chuyển hướng người dùng quay trở lại Màn hình Danh sách yêu cầu đã đăng ký ([SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md)). Đóng form cập nhật thông tin. |
| 4 | Hủy | Nút | - **Điều kiện hiển thị**: Chỉ hiển thị đối với trường hợp Cập nhật Xóa đăng ký thông báo xử lý tài sản bảo đảm (Người dùng chọn Cập nhật tại màn hình Quản lý yêu cầu đã đăng ký) và hồ sơ ở trạng thái Chờ duyệt hoặc Bị từ chối hoặc Chờ thanh toán.<br>- **Thao tác**: NSD click nút "Hủy" ở cuối màn hình.<br>- **Xử lý**: Hệ thống đóng màn hình Cập nhật và trở về màn Danh sách yêu cầu đã đăng ký ([SRS_Qly_yeu_cau_da_dky_Phieu dang ky.md](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md)). |

---

##### 4.1.5.5.4. UC131.3.MH03 - Màn hình Xem trước (Review) xóa thông báo xử lý

##### 4.1.5.5.5. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin người yêu cầu xóa** | | | | |
| Người yêu cầu đăng ký | String(100) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Đối tượng thực hiện xóa đã chọn ở MH02. |
| Tài liệu chứng minh (pdf) | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Link xem/tải tệp đính kèm tài liệu chứng minh tư cách pháp lý (nếu có). |
| **II. Thông tin tham chiếu thông báo xử lý gốc** | | | | |
| Trường hợp đăng ký | String(255) | - | "Xóa đăng ký thông báo xử lý tài sản bảo đảm" | Control UI: Label/Chỉ đọc - Read-only.<br>- Trạng thái chỉ đọc. |
| Số thông báo xử lý gốc | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Số thông báo xử lý gốc. |
| Thời điểm đăng ký lần đầu | String(255) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ đăng ký thông báo xử lý lần đầu.<br>- Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. |
| Thời điểm có hiệu lực | Datetime | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Ngày giờ thông báo xử lý gốc được ký duyệt/có hiệu lực trên hệ thống. Định dạng hiển thị: `dd/mm/yyyy hh:mm:ss`. Chỉ hiển thị khi thông báo gốc đã có hiệu lực. |
| **III. Lý do xóa thông báo** | | | | |
| Lý do xóa thông báo | Text(2000) | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Lý do xóa thông báo đã chọn. |
| Văn bản chứng minh đính kèm (pdf) | File | - | Lấy từ MH02 | Control UI: Label/Chỉ đọc - Read-only.<br>- Link xem/tải văn bản chứng minh đính kèm. |
| **IV. Danh sách tài sản đang xử lý / Theo thông báo gốc/Thay đổi gần nhất** | | | | |
| Loại tài sản | Enum(String(50)) | - | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>Hiển thị loại tài sản bảo đảm tương ứng theo [DM_07]. |
| Mô tả | Text(2000) | Tùy điều kiện | Lấy từ MH02 | Control UI: Label Chỉ đọc.<br>Hiển thị ngay bên dưới từng Loại tài sản tương ứng nếu tài sản thuộc một trong các loại:<br>- "Cây hằng năm, công trình tạm"<br>- "Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)" |
| Bảng thông tin Số khung | - | Tùy điều kiện | Lấy từ MH02 | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)** nếu có tài sản Số khung đang xử lý.<br>- Tiêu đề bảng là **Số khung \***.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN**.<br>- NHÃN HIỆU, MÀU SƠN.<br>- SỐ KHUNG.<br>- SỐ MÁY.<br>- BIỂN SỐ.<br>- Cột TÊN PHƯƠNG TIỆN trong bảng hiển thị giá trị theo Danh mục dùng chung - Danh mục Tên phương tiện [DM_41], gồm "Mô tô", "Ô tô", "Xe máy chuyên dùng".<br>- Sau Bảng thông tin Số khung, hệ thống hiển thị thông tin xử lý tài sản đang có hiệu lực và lý do xóa thông báo ở trạng thái chỉ đọc. |
| Bảng thông tin Phương tiện | - | Tùy điều kiện | Lấy từ MH02 | Control UI: Bảng/Lưới chỉ đọc.<br>- Chỉ hiển thị dưới Loại tài sản **Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt** nếu có tài sản Phương tiện đang xử lý.<br>- Tiêu đề bảng là **Phương tiện**.<br>- Bảng nằm ngay dưới tiêu đề Loại tài sản tương ứng.<br>- Hiển thị các cột:<br>- Checkbox.<br>- STT.<br>- **TÊN PHƯƠNG TIỆN, NHÃN HIỆU**.<br>- TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU.<br>- SỐ ĐĂNG KÝ.<br>- CƠ QUAN CẤP GIẤY CHỨNG NHẬN.<br>- CẤP PHƯƠNG TIỆN.<br>- Sau Bảng thông tin Phương tiện, hệ thống hiển thị thông tin xử lý tài sản đang có hiệu lực và lý do xóa thông báo ở trạng thái chỉ đọc. |

##### 4.1.5.5.6. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | - Đóng màn hình xem trước và quay trở về màn hình Nhập thông tin xóa thông báo (UC131.3.MH02), giữ nguyên dữ liệu đã nhập. |
| 2 | Tiếp tục | Nút | - Thao tác: NSD click nút Tiếp tục.<br>- Xử lý:<br>- **TH Hợp lệ 1 (Không được miễn phí):** Lưu hồ sơ dưới trạng thái **"Chờ thanh toán"** (Chưa sinh mã PIN bảo mật), thực hiện đóng gói thông tin thanh toán (Mã hồ sơ, lệ phí xóa thông báo, nội dung thanh toán). Chuyển tiếp sang Cổng thanh toán [UC158](UC158_Quan_ly_thanh_toan_phi.md) to thanh toán lệ phí xóa thông báo.<br>- **TH Hợp lệ 2 (Được miễn phí):** Chuyển hồ sơ sang trạng thái **"Chờ duyệt"**, sinh Mã hồ sơ phục vụ tra cứu và đi tiếp sang Màn hình kết quả (UC131.3.MH04). |
| 3 | Lắng nghe trạng thái thanh toán & Hiển thị kết quả (Auto) | Background Task / Redirect | Hệ thống thực hiện lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook callback) và hiển thị kết quả giao dịch tại Màn hình Kết quả Giao dịch chung của hệ thống.<br>- Chi tiết quy trình xử lý Webhook cho các trường hợp TH1 đến TH7: Tham chiếu tại [4.1.2.3. Lắng nghe trạng thái thanh toán từ Cổng thanh toán (Webhook Callback) của UC158](UC158_Quan_ly_thanh_toan_phi.md#4123-lang-nghe-trang-thai-thanh-toan-tu-cong-thanh-toan-webhook-callback).<br>- Chi tiết giao diện và cấu hình hiển thị kết quả giao dịch: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung). |

---

##### 4.1.5.5.7. Màn hình Kết quả thanh toán
- Sau khi thực hiện thanh toán xong trên Cổng thanh toán trực tuyến, hệ thống tự động chuyển hướng người dùng quay trở lại hệ thống và hiển thị kết quả giao dịch trên Màn hình kết quả giao dịch chung.
- Chi tiết thông tin giao diện và các quy tắc hiển thị động cho nghiệp vụ Xóa đăng ký thông báo xử lý tài sản bảo đảm: Tham chiếu tại [4.1.2.4. UC158.MH02 - Màn hình Kết quả Giao dịch chung của UC158](UC158_Quan_ly_thanh_toan_phi.md#4124-uc158mh02---man-hinh-ket-qua-giao-dich-chung).
