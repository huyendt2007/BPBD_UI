### 4.3.2.11. UC260_to_UC262 - Phân hệ Quản lý tiếp công dân và giải quyết khiếu nại, tố cáo

#### 4.3.2.11.1. Tổng quan & Mục đích
Phân hệ **Quản lý tiếp công dân và giải quyết khiếu nại, tố cáo** số hóa toàn bộ quy trình tiếp nhận, theo dõi, phân công, xử lý và cập nhật kết quả giải quyết các đơn thư khiếu nại, tố cáo, kiến nghị, phản ánh, yêu cầu cung cấp thông tin liên quan đến đăng ký biện pháp bảo đảm (BPBĐ) bằng động sản trực thuộc thẩm quyền của Cục Đăng ký quốc gia giao dịch bảo đảm (NRAST) - Bộ Tư pháp.

\* **Đối tượng sử dụng (Tác nhân)**:
  \- **Cán bộ tiếp công dân / Cán bộ nghiệp vụ**: Tiếp nhận, nhập mới vụ việc, theo dõi tiến trình và cập nhật thông tin giải quyết đơn thư.
  \- **Cán bộ Quản trị nghiệp vụ**: Thao tác xóa mềm và phê duyệt khôi phục dữ liệu hồ sơ nhập sai.
  \- **Quản trị hệ thống (System Admin)**: Thực hiện xóa vĩnh viễn dữ liệu hồ sơ đã xóa mềm quá hạn.
  \- **Lãnh đạo đơn vị**: Xem, tra cứu chi tiết và giám sát toàn bộ hoạt động tiếp công dân & giải quyết khiếu nại, tố cáo.

\* **Nguyên tắc chung**:
  \- **Tính toàn vẹn và phân quyền**: Hồ sơ tiếp công dân sau khi hoàn thành giải quyết sẽ được khóa cứng dữ liệu (Read-only) để đảm bảo tính pháp lý. Cán bộ trực tiếp nhập và Lãnh đạo đơn vị là các tác nhân duy nhất được xem chi tiết các hồ sơ có chế độ bảo mật danh tính người tố cáo.
  \- **Lưu vết và Nhật ký (Audit Trail)**: Mọi thao tác cập nhật trạng thái, xóa mềm, khôi phục hoặc xóa vĩnh viễn đều được ghi nhật ký hệ thống đầy đủ phục vụ thanh tra.

---

#### 4.3.2.11.2. UC260 - Nhập thông tin tiếp công dân và xử lý đơn thư

##### 4.3.2.11.2.1. Mục đích
Cho phép Cán bộ nghiệp vụ lập mới hoặc cập nhật thông tin chi tiết của vụ việc tiếp công dân, khiếu nại, tố cáo, kiến nghị, phản ánh phát sinh trực tiếp tại quầy hoặc gián tiếp qua bưu điện, email. Đồng thời, hỗ trợ cán bộ phân công, theo dõi tiến độ xử lý và cập nhật kết quả giải quyết chính thức.

*a. Phân quyền*

\- Cán bộ nghiệp vụ ĐKBPBĐ.
\- Cán bộ tiếp công dân tại quầy.
\- Lãnh đạo đơn vị.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào hệ thống.
\- Tài khoản được phân quyền chức năng tương ứng.

##### 4.3.2.11.2.2. UC260.MH01 - Màn hình Thêm mới / Cập nhật hồ sơ tiếp công dân
Màn hình cung cấp biểu mẫu nhập thông tin tiếp công dân chia làm 4 khối nội dung (Khối A, B, C, D) giúp cán bộ nghiệp vụ nhập liệu và cập nhật hồ sơ vụ việc.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Khối A - Thông tin tiếp nhận hồ sơ** | | | | |
| Mã hồ sơ tiếp công dân | String(50) | Có | Tự động sinh | - Chỉ đọc.<br>- Định dạng: `TCD-[NĂM]-[THÁNG]-[STT]` (Ví dụ: `TCD-2026-06-0001`). |
| Ngày tiếp nhận | Date | Có | Ngày hiện tại | - Định dạng: dd/mm/yyyy.<br>- Kiểm tra nhỏ hơn hoặc bằng ngày hiện tại. |
| Hình thức tiếp nhận | Enum(String(50)) | Có | Trực tiếp tại trụ sở | Control UI: Hộp chọn.<br>- Chọn từ Danh mục hình thức tiếp nhận dùng chung.<br>- Gồm:<br>- Trực tiếp tại trụ sở<br>- Qua bưu điện<br>- Qua email<br>- Qua điện thoại<br>- Khác |
| Loại vụ việc | Enum(String(50)) | Có | Khiếu nại | Control UI: Hộp chọn.<br>- Chọn từ Danh mục loại vụ việc dùng chung.<br>- Gồm:<br>- Khiếu nại<br>- Tố cáo<br>- Kiến nghị<br>- Phản ánh<br>- Yêu cầu cung cấp thông tin |
| Cán bộ tiếp nhận | String(100) | Có | Tài khoản đang đăng nhập | - Chỉ đọc.<br>- Họ tên cán bộ tiếp nhận trực tiếp nhập hồ sơ. |
| Đơn vị tiếp nhận | String(255) | Có | Đơn vị của cán bộ hiện hành | - Chỉ đọc.<br>- Tên cơ quan tiếp nhận hồ sơ. |
| **Khối B - Thông tin người gửi phản ánh, khiếu nại, tố cáo** | | | | |
| Loại đối tượng | Enum(String(50)) | Có | Cá nhân | Control UI: Hộp chọn.<br>- Gồm:<br>- Cá nhân<br>- Tổ chức |
| **Nếu chọn đối tượng là: [Cá nhân]** | | | | |
| Họ và tên công dân | String(255) | Có | Trống | - Nhập đầy đủ họ tên cá nhân gửi đơn thư. |
| Số CMND/CCCD/Hộ chiếu | String(50) | Có | Trống | - Nhập số giấy tờ định danh của cá nhân.<br>- Nếu là CCCD, kiểm tra đúng 12 chữ số. |
| Ngày sinh | Date | Có | Trống | - Định dạng: dd/mm/yyyy. Validate nhỏ hơn ngày hiện tại. |
| Giới tính | Enum(String(50)) | Có | Nam | Control UI: Hộp chọn.<br>- Gồm:<br>- Nam<br>- Nữ<br>- Khác |
| Ngày cấp định danh | Date | Không | Trống | - Định dạng: dd/mm/yyyy. Validate nhỏ hơn ngày hiện tại và lớn hơn Ngày sinh. |
| **Nếu chọn đối tượng là: [Tổ chức]** | | | | |
| Tên tổ chức/doanh nghiệp | String(255) | Có | Trống | - Nhập đầy đủ tên pháp nhân gửi đơn thư. |
| Mã số thuế / Số đăng ký doanh nghiệp | String(50) | Có | Trống | - Nhập mã số doanh nghiệp/tổ chức. Validate đúng 10 hoặc 14 chữ số. |
| Người đại diện pháp luật | String(255) | Có | Trống | - Nhập họ tên người đại diện theo pháp luật của tổ chức. |
| Chức vụ đại diện | String(100) | Không | Trống | - Nhập chức vụ của người đại diện (ví dụ: Giám đốc, Chủ tịch...). |
| **Thông tin liên hệ chung** | | | | |
| Số điện thoại liên hệ | String(20) | Có | Trống | - Nhập số điện thoại liên hệ.<br>- Validate định dạng số điện thoại Việt Nam (10 số, bắt đầu bằng 0) hoặc nước ngoài (8-15 ký tự, cho phép dấu `+`). |
| Email nhận phản hồi | String(100) | Có | Trống | - Nhập email liên hệ.<br>- Validate đúng định dạng email tiêu chuẩn.<br>- Bắt buộc phải nhập để hệ thống gửi thông báo kết quả. |
| Tỉnh/Thành phố | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn từ Danh mục Tỉnh/Thành phố hành chính `[DM_13]`. |
| Địa chỉ liên hệ / Thường trú | String(500) | Có | Trống | - Nhập chi tiết địa chỉ liên hệ của chủ thể (số nhà, tên đường, phường/xã, quận/huyện). |
| Có văn bản ủy quyền hợp pháp của bên liên quan | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Gồm:<br>- Check (Có ủy quyền)<br>- Uncheck (Không ủy quyền) |
| **Nếu chọn: [Có ủy quyền]** | | | | |
| Họ tên người được ủy quyền | String(255) | Có | Trống | - Nhập họ tên cá nhân được ủy quyền hợp pháp. |
| CMND/CCCD người được ủy quyền | String(50) | Có | Trống | - Nhập số giấy tờ định danh của người được ủy quyền. |
| Tệp đính kèm văn bản ủy quyền | File | Có | Trống | Control UI: Upload file.<br>- Tải lên bản quét văn bản ủy quyền hợp pháp (định dạng PDF/JPG/PNG, tối đa 20MB). |
| **Khối C - Nội dung vụ việc liên quan đăng ký biện pháp bảo đảm** | | | | |
| Số đăng ký BPBĐ liên quan | String(50) | Không | Trống | - Nhập số đăng ký BPBĐ cần đối chiếu.<br>- Hỗ trợ nút **Liên thông** để tự động điền thông tin tài sản từ hệ thống NRAST. |
| Số hợp đồng bảo đảm | String(50) | Không | Trống | - Tự động lấy từ Số đăng ký liên thông hoặc cho phép nhập tay. |
| Loại hình giao dịch | String(100) | Không | Trống | - Tự động lấy từ Số đăng ký liên thông hoặc cho phép nhập tay. |
| Bên bảo đảm | String(255) | Không | Trống | - Tự động lấy từ Số đăng ký liên thông hoặc cho phép nhập tay. |
| Bên nhận bảo đảm | String(255) | Không | Trống | - Tự động lấy từ Số đăng ký liên thông hoặc cho phép nhập tay. |
| Tài sản bảo đảm mô tả | String(500) | Không | Trống | - Tự động lấy từ Số đăng ký liên thông hoặc cho phép nhập tay. |
| Tóm tắt nội dung yêu cầu, phản ánh | String(250) | Có | Trống | - Nhập tóm tắt nội dung vụ việc (tối đa 250 ký tự). |
| Nội dung chi tiết vụ việc | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Trình bày chi tiết vụ việc, diễn biến và nội dung phản ánh. |
| Căn cứ pháp lý do công dân nêu | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Ghi nhận các điều khoản luật công dân nêu ra trong đơn. |
| Yêu cầu cụ thể của công dân | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Nêu rõ yêu cầu cụ thể đề nghị giải quyết. |
| Tài liệu, tài sản chứng minh đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Hỗ trợ kéo thả hoặc click tải lên nhiều file (Đơn thư gốc, giấy tờ tài sản...).<br>- Chi tiết xem ở bảng Chức năng trên màn hình. |
| Danh sách tệp đã đính kèm | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách tệp đính kèm dưới dạng lưới thẻ card. Đối với từng tệp:<br>- **Xem**: Click nút Xem để mở popup Xem trước (UC260.MH03).<br>- **Xóa**: Click nút Xóa để gỡ bỏ tệp khỏi danh sách. |
| **Khối D - Phân công, theo dõi giải quyết và cập nhật kết quả** | | | | |
| Cán bộ được phân công xử lý | Enum(String(50)) | Có | Cán bộ đang đăng nhập | Control UI: Hộp chọn.<br>- Chọn cán bộ phụ trách từ danh sách cán bộ nghiệp vụ NRAST. |
| Trạng thái xử lý hồ sơ | Enum(String(50)) | Có | Mới tiếp nhận | Control UI: Hộp chọn.<br>- Gồm:<br>- Mới tiếp nhận<br>- Đang xử lý<br>- Chờ bổ sung hồ sơ<br>- Đã trả lời |
| Thời hạn giải quyết theo luật định | Date | Có | Tự động tính | - Chỉ đọc. Tính dựa trên Loại vụ việc:<br>- Khiếu nại, Tố cáo = Ngày tiếp nhận + 30 ngày<br>- Kiến nghị, Phản ánh = Ngày tiếp nhận + 20 ngày<br>- Yêu cầu cung cấp thông tin = Ngày tiếp nhận + 10 ngày |
| Phân loại nội dung xử lý | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm:<br>- Thuộc thẩm quyền giải quyết<br>- Chuyển cơ quan có thẩm quyền khác<br>- Không đủ điều kiện thụ lý (Trả hồ sơ) |
| **Nếu chọn phân loại là: [Thuộc thẩm quyền giải quyết] & Trạng thái: [Đã trả lời]** | | | | |
| Kết luận giải quyết | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Gồm:<br>- Chấp nhận toàn bộ<br>- Chấp nhận một phần<br>- Bác đơn phản ánh<br>- Đình chỉ giải quyết |
| Số văn bản kết quả | String(50) | Có | Trống | - Nhập số hiệu văn bản quyết định giải quyết được ban hành. |
| Ngày ban hành kết quả | Date | Có | Ngày hiện tại | - Ngày ký ban hành quyết định giải quyết chính thức. Validate nhỏ hơn hoặc bằng ngày hiện tại. |
| Tóm tắt kết luận trả lời công dân | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Nhập tóm tắt nội dung xử lý để gửi phản hồi cho người dân. |
| Tải lên Quyết định giải quyết chính thức | File | Có | Trống | Control UI: Upload file.<br>- Tải lên tệp quét quyết định giải quyết đã ký số (.pdf, tối đa 20MB). |
| Hình thức gửi kết quả | Boolean | Có | Email | Control UI: Checkbox.<br>- Gồm:<br>- Email (Mặc định check)<br>- Bản giấy |
| **Nếu chọn phân loại là: [Chuyển cơ quan có thẩm quyền khác]** | | | | |
| Cơ quan được chuyển đến | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn cơ quan từ danh sách đơn vị liên kết (Sở Tư pháp TP Hà Nội, Văn phòng Đăng ký Đất đai, Thanh tra Bộ Tư pháp). |
| Số văn bản chuyển đơn | String(50) | Có | Trống | - Nhập số hiệu công văn chuyển đơn gửi cơ quan bạn. |
| Tải lên Công văn chuyển đơn (.pdf) | File | Có | Trống | Control UI: Upload file.<br>- Tải lên tệp công văn chuyển đơn có đóng dấu/ký số (tối đa 20MB). |
| **Nếu chọn phân loại là: [Không đủ điều kiện thụ lý (Trả hồ sơ)]** | | | | |
| Lý do từ chối thụ lý (nêu rõ căn cứ) | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Trình bày rõ căn cứ pháp lý không thụ lý hồ sơ (ví dụ: gửi sai thẩm quyền). |
| Đính kèm Văn bản từ chối thụ lý (.pdf) | File | Có | Trống | Control UI: Upload file.<br>- Tải lên tệp văn bản thông báo trả hồ sơ/từ chối thụ lý (tối đa 20MB). |
| **Nếu chọn Trạng thái: [Chờ bổ sung hồ sơ]** | | | | |
| Nội dung yêu cầu bổ sung chi tiết | Text(2000) | Có | Trống | Control UI: Textarea.<br>- Liệt kê chi tiết danh mục hồ sơ còn thiếu hoặc không hợp lệ. |
| Hình thức thông báo yêu cầu bổ sung | Boolean | Có | Gửi Email tự động cho người dân | Control UI: Checkbox.<br>- Gồm:<br>- Gửi Email tự động cho người dân (Mặc định check)<br>- In Phiếu yêu cầu bổ sung hồ sơ (Bản giấy) |
| **Thông tin nội bộ** | | | | |
| Ghi chú nội bộ cơ quan | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Chỉ hiển thị cho cán bộ, ẩn hoàn toàn với người dân. |
| Bảo mật thông tin danh tính người tố cáo | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Chỉ hiển thị khi Loại vụ việc = "Tố cáo".<br>- Gồm:<br>- Check (Bảo vệ thông tin người tố cáo)<br>- Uncheck (Không bảo vệ thông tin) |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Liên thông | Nút | - Thao tác: NSD nhập Số đăng ký BPBĐ và click nút Liên thông. |
|  |  |  | - Xử lý: Hệ thống thực hiện kiểm tra: |
|  |  |  | - TH1 (Không tìm thấy số đăng ký): Số đăng ký không tồn tại trong CSDL Đăng ký biện pháp bảo đảm của hệ thống NRAST. Hệ thống hiển thị thông báo lỗi: "Không tìm thấy Số đăng ký này trên CSDL đăng ký BPBĐ. Cán bộ vui lòng tự nhập tay các thông tin." Không tự động điền dữ liệu. |
|  |  |  | - TH Hợp lệ: Hệ thống tìm thấy thông tin đăng ký, tự động điền dữ liệu tương ứng vào các trường: Số hợp đồng bảo đảm, Loại hình giao dịch, Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm mô tả, đồng thời hiển thị thông báo thành công: "Đã đối chiếu thông tin đăng ký liên thông tự động thành công!". |
| 2 | Tải tệp lên | Nút | - Thao tác: NSD kéo thả tệp hoặc click chọn tệp tại vùng tải tài liệu ở Khối C. |
|  |  |  | - Xử lý: Hệ thống thực hiện kiểm tra tệp tin: |
|  |  |  | - TH1 (Sai định dạng tệp): Đuôi mở rộng của tệp không thuộc danh sách: `.pdf, .doc, .docx, .xlsx, .xls, .jpg, .jpeg, .png`. Hệ thống hiển thị thông báo lỗi: "Định dạng tệp tin không hợp lệ". Không thực hiện upload. |
|  |  |  | - TH2 (Vượt dung lượng): Dung lượng tệp tin lớn hơn 20MB. Hệ thống hiển thị thông báo lỗi: "Dung lượng tệp tin vượt quá 25MB. Vui lòng kiểm tra lại". Không thực hiện upload. |
|  |  |  | - TH Hợp lệ: Hệ thống upload tệp thành công, đưa tên file vào mảng đính kèm và hiển thị dạng card dưới Khối C kèm nút Xem và Xóa, hiển thị thông báo Toast: "Đã tải tệp lên thành công". |
| 3 | Xóa tệp | Link | - Thao tác: NSD click nút Xóa bên cạnh thẻ tệp đính kèm. |
|  |  |  | - Xử lý: Hệ thống gỡ tệp khỏi danh sách đính kèm hiện tại của hồ sơ, cập nhật lại lưới hiển thị và hiển thị thông báo Toast: "Đã gỡ bỏ tệp đính kèm". |
| 4 | Lưu nháp | Nút | - Thao tác: NSD click nút Lưu nháp. |
|  |  |  | - Xử lý: Hệ thống kiểm tra dữ liệu bắt buộc tối thiểu: |
|  |  |  | - TH1 (Bỏ trống họ tên): Trường Họ và tên công dân / Tên tổ chức bị bỏ trống. Hệ thống hiển thị thông báo lỗi: "Vui lòng nhập Họ tên công dân trước khi lưu nháp". Focus và highlight viền đỏ trường trống. Không thực hiện lưu. |
|  |  |  | - TH Hợp lệ: Hệ thống lưu trữ hồ sơ tiếp công dân với trạng thái `Lưu nháp` (hoặc giữ nguyên trạng thái cũ nếu là hồ sơ chỉnh sửa), lưu trữ các file đã upload, ghi nhật ký hệ thống (Audit Log), hiển thị thông báo thành công: "Đã lưu nháp dữ liệu hồ sơ tiếp công dân thành công!" và đóng form quay lại màn hình Tra cứu (UC261.MH01). |
| 5 | Hoàn thành giải quyết | Nút | - Thao tác: NSD click nút Hoàn thành giải quyết. |
|  |  |  | - Xử lý: Hệ thống thực hiện kiểm tra tính hợp lệ toàn diện (Validate): |
|  |  |  | - TH1 (Bỏ trống trường thông tin bắt buộc chung): Một trong các trường bắt buộc (`Ngày tiếp nhận`, `Hình thức tiếp nhận`, `Loại vụ việc`, `Họ và tên`, `Số điện thoại`, `Địa chỉ`, `Tỉnh/Thành phố`, `Tóm tắt nội dung`, `Nội dung chi tiết`, `Cán bộ xử lý`, `Trạng thái xử lý`, `Phân loại nội dung xử lý`) bị bỏ trống hoặc chưa chọn. Hệ thống hiển thị thông báo lỗi: "Vui lòng điền đầy đủ các thông tin bắt buộc (*)", highlight viền đỏ các trường bị lỗi và focus vào trường lỗi đầu tiên. Không thực hiện lưu. |
|  |  |  | - TH2 (Bỏ trống số định danh Cá nhân): Loại đối tượng chọn là Cá nhân nhưng Số CMND/CCCD/Hộ chiếu bị bỏ trống. Hệ thống báo lỗi: "Vui lòng nhập Số CMND/CCCD/Hộ chiếu". Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH3 (Bỏ trống Mã số thuế Tổ chức): Loại đối tượng chọn là Tổ chức nhưng Mã số thuế bị bỏ trống. Hệ thống báo lỗi: "Vui lòng nhập Mã số thuế của tổ chức". Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH4 (Bỏ trống thông tin bổ sung): Trạng thái xử lý chọn là "Chờ bổ sung hồ sơ" nhưng Nội dung yêu cầu bổ sung chi tiết bị bỏ trống. Hệ thống báo lỗi: "Vui lòng điền nội dung yêu cầu bổ sung hồ sơ chi tiết". Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH5 (Bỏ trống kết quả giải quyết): Trạng thái chọn là "Đã trả lời" và Phân loại chọn là "Thuộc thẩm quyền giải quyết" nhưng một trong các trường kết quả (Kết luận giải quyết, Số văn bản kết quả, Tóm tắt kết luận trả lời, Tệp quyết định giải quyết) bị bỏ trống. Hệ thống báo lỗi: "Vui lòng điền kết luận giải quyết, số văn bản và nội dung tóm tắt kết quả". Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH6 (Bỏ trống thông tin chuyển đơn): Phân loại chọn là "Chuyển cơ quan khác" nhưng một trong các trường kết quả (Cơ quan được chuyển đến, Số văn bản chuyển đơn, Tệp công văn chuyển đơn) bị bỏ trống. Hệ thống báo lỗi: "Vui lòng nhập cơ quan nhận chuyển giao và số văn bản chuyển đơn". Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH7 (Bỏ trống thông tin từ chối): Phân loại chọn là "Không đủ điều kiện thụ lý" nhưng một trong các trường kết quả (Lý do từ chối, Tệp văn bản từ chối) bị bỏ trống. Hệ thống báo lỗi: "Vui lòng nhập lý do từ chối thụ lý". Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH8 (Sai định dạng dữ liệu): Định dạng Số điện thoại hoặc Email hoặc Số định danh/MST nhập sai quy chuẩn. Hệ thống hiển thị cảnh báo lỗi định dạng tại trường tương ứng. Focus và highlight viền đỏ ô lỗi. |
|  |  |  | - TH9 (Sai logic ngày): Ngày tiếp nhận hoặc Ngày ban hành lớn hơn ngày hiện tại, hoặc Ngày hoàn thành kết quả nhỏ hơn Ngày tiếp nhận. Hệ thống hiển thị thông báo lỗi logic ngày và chặn lưu. |
|  |  |  | - TH Hợp lệ: Hệ thống tiến hành lưu thông tin hồ sơ và thực hiện các luồng phụ theo trạng thái:<br>\+ Nếu Trạng thái chọn là "Chờ bổ sung hồ sơ": Cập nhật trạng thái hồ sơ thành `Chờ bổ sung hồ sơ`. Nếu có check Gửi Email, hệ thống tự động đẩy email yêu cầu bổ sung chứa danh mục tài liệu thiếu vào hàng đợi gửi đi. Hiển thị thông báo Toast: "Hồ sơ đã chuyển trạng thái chờ bổ sung. Đã gửi Email tự động yêu cầu tài liệu đính kèm đến công dân thành công!" và đóng form quay lại danh sách.<br>\+ Nếu Trạng thái chọn là "Đã trả lời" và Phân loại chọn là "Thuộc thẩm quyền": Cập nhật trạng thái hồ sơ thành `Đã trả lời`. Nếu có check Gửi Email, tự động đẩy email thông báo kết quả kèm tệp quyết định giải quyết PDF vào hàng đợi gửi đi. Hiển thị thông báo Toast: "Ban hành quyết định giải quyết thành công! Đã gửi Email kết quả PDF tự động đến công dân." và đóng form quay lại danh sách.<br>\+ Nếu Phân loại chọn là "Chuyển cơ quan khác": Cập nhật trạng thái hồ sơ thành `Đã chuyển đơn`. Tự động đẩy email thông báo chuyển đơn thư kèm tệp công văn chuyển đơn PDF vào hàng đợi gửi đi. Hiển thị thông báo Toast: "Đã chuyển đơn thư đến cơ quan có thẩm quyền. Đã gửi Email thông báo kèm bản sao công văn." và đóng form quay lại danh sách.<br>\+ Nếu Phân loại chọn là "Không đủ điều kiện thụ lý": Cập nhật trạng thái hồ sơ thành `Không thụ lý`. Tự động đẩy email thông báo từ chối kèm tệp văn bản từ từ chối PDF vào hàng đợi gửi đi. Hiển thị thông báo Toast: "Từ chối thụ lý giải quyết hồ sơ thành công. Đã gửi Email thông báo kèm file PDF." và đóng form quay lại danh sách.<br>\+ Trường hợp hợp lệ khác: Lưu dữ liệu bình thường, hiển thị thông báo Toast: "Cập nhật tiến trình xử lý hồ sơ tiếp công dân thành công!" và đóng form quay lại danh sách. |
| 6 | Hủy bỏ | Nút | - Thao tác: NSD click nút Hủy bỏ. |
|  |  |  | - Xử lý: Hệ thống đóng form nhập liệu, giữ nguyên dữ liệu cũ, không thực hiện lưu trữ thông tin vừa nhập và điều hướng quay lại màn hình Tra cứu (UC261.MH01). |
| 7 | In Phiếu yêu cầu bổ sung | Nút | \- Thao tác: NSD click nút In Phiếu yêu cầu bổ sung (Mẫu 02/TCD) (chỉ hiển thị khi chọn In Phiếu yêu cầu bổ sung).<br>\- Xử lý: Hệ thống hiển thị thông báo: "Hệ thống đang sinh Phiếu yêu cầu sửa đổi, bổ sung hồ sơ theo Mẫu số 02/TCD...", sau 1.5 giây tải tệp xuống trình duyệt và báo: "Đã xuất file Word phiếu yêu cầu bổ sung thành công! Bấm In để in ấn ra giấy.". |

---

##### 4.3.2.11.3. UC261 - Tra cứu thông tin tiếp công dân

##### 4.3.2.11.3.1. Mục đích
Cho phép Cán bộ nghiệp vụ và Lãnh đạo đơn vị NRAST thực hiện tra cứu, tìm kiếm, lọc danh sách hồ sơ tiếp công dân và giải quyết khiếu nại, tố cáo dựa trên nhiều tiêu chí tìm kiếm khác nhau, đồng thời hỗ trợ xem chi tiết hồ sơ nhanh và kết xuất báo cáo Excel kết quả.

*a. Phân quyền*

\- Cán bộ nghiệp vụ ĐKBPBĐ.
\- Cán bộ tiếp công dân tại quầy.
\- Lãnh đạo đơn vị.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào hệ thống.

##### 4.3.2.11.3.2. UC261.MH01 - Màn hình Tra cứu danh sách tiếp công dân và giải quyết khiếu nại, tố cáo
Màn hình cung cấp giao diện lọc tìm kiếm collapsible phía trên và Grid kết quả hiển thị danh sách hồ sơ tiếp công dân phía dưới.

###### Mô tả thông tin trên màn hình:
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ tiếp công dân | String(50) | Không | Trống | - Nhập mã hồ sơ tiếp công dân cần tìm (tìm gần đúng). |
| Loại vụ việc | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn lọc theo phân loại vụ việc.<br>- Gồm:<br>- Tất cả<br>- Khiếu nại<br>- Tố cáo<br>- Kiến nghị<br>- Phản ánh<br>- Yêu cầu cung cấp thông tin |
| Trạng thái hồ sơ | Enum(String(50)) | Không | Tất cả | Control UI: Hộp chọn.<br>- Chọn lọc theo trạng thái hồ sơ.<br>- Gồm:<br>- Tất cả<br>- Mới tiếp nhận<br>- Đang xử lý<br>- Chờ bổ sung hồ sơ<br>- Đã trả lời<br>- Đã chuyển đơn<br>- Không thụ lý |
| Họ tên/Tên tổ chức gửi đơn | String(255) | Không | Trống | - Nhập tên cá nhân hoặc tên tổ chức gửi đơn cần tìm (tìm gần đúng). |
| Số định danh (CCCD/MST/Hộ chiếu) | String(50) | Không | Trống | - Nhập số giấy tờ định danh (tìm gần đúng). |
| Số đăng ký BPBĐ liên quan | String(50) | Không | Trống | - Nhập số đăng ký biện pháp bảo đảm liên quan cần tìm (tìm chính xác). |
| Ngày tiếp nhận: Từ ngày | Date | Không | Trống | - Lọc khoảng thời gian tiếp nhận. Định dạng: dd/mm/yyyy. Ràng buộc: Nhỏ hơn hoặc bằng Đến ngày. |
| Ngày tiếp nhận: Đến ngày | Date | Không | Trống | - Lọc khoảng thời gian tiếp nhận. Định dạng: dd/mm/yyyy. Ràng buộc: Lớn hơn hoặc bằng Từ ngày. |
| Quá hạn xử lý | Boolean | Không | Uncheck | Control UI: Checkbox.<br>- Gồm:<br>- Check: Chỉ hiển thị các hồ sơ quá hạn xử lý và chưa hoàn thành giải quyết.<br>- Uncheck: Hiển thị cả hồ sơ đúng hạn và quá hạn. |
| **II. Bảng danh sách kết quả** | - | - | - | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách kết quả tìm kiếm dưới dạng bảng biểu.<br>- Phân trang mặc định **20 bản ghi/trang**.<br>- Sắp xếp mặc định: Ngày tiếp nhận giảm dần. |
| Cột: STT | Integer(10) | - | - | - Căn giữa.<br>- Số thứ tự dòng trên lưới. |
| Cột: Mã hồ sơ | String(50) | - | - | - Mã hồ sơ tiếp công dân. Hiển thị dạng đường liên kết (Link). Khi click vào sẽ mở màn hình Chỉnh sửa (UC260.MH01) hoặc màn hình Xem chi tiết (UC260.MH02) tùy theo trạng thái hồ sơ đã khóa hay chưa. |
| Cột: Ngày tiếp nhận | Date | - | - | - Ngày tiếp nhận hồ sơ. Định dạng dd/mm/yyyy. |
| Cột: Loại vụ việc | String(50) | - | - | - Hiển thị loại vụ việc. |
| Cột: Họ tên / Tổ chức | String(255) | - | - | - Hiển thị họ tên công dân hoặc tên tổ chức.<br>- Nếu hồ sơ có Loại vụ việc = "Tố cáo" và có check Bảo mật thông tin người tố cáo, hệ thống tự động ẩn tên thực tế và hiển thị chuỗi text: `[Được bảo mật danh tính]` (kèm icon bảo mật) đối với tài khoản không có quyền xem tố cáo mật. |
| Cột: Số ĐK BPBĐ | String(50) | - | - | - Số đăng ký BPBĐ liên thông (nếu có, nếu không có hiển thị `-`). |
| Cột: Tóm tắt nội dung yêu cầu, phản ánh | String(500) | - | - | - Nội dung tóm tắt vụ việc. Rút gọn bằng dấu ba chấm `...` nếu vượt quá giới hạn hiển thị, hover chuột hiển thị tooltip đầy đủ. |
| Cột: Trạng thái | String(50) | - | - | - Hiển thị badge trạng thái hồ sơ theo màu sắc dùng chung. |
| Cột: Hạn xử lý | Date | - | - | - Hiển thị ngày hạn giải quyết. Ràng buộc:<br>\- Tô màu đỏ và in đậm kèm icon cảnh báo `⚠` nếu hồ sơ đã quá hạn giải quyết thực tế mà chưa hoàn thành giải quyết.<br>\- Tô màu cam kèm icon đồng hồ `🕒` nếu hồ sơ sắp đến hạn giải quyết (thời gian còn lại `<= 5 ngày`). |
| Cột: Cán bộ xử lý | String(100) | - | - | - Họ tên cán bộ đang phụ trách xử lý hồ sơ. |
| Cột: Thao tác | String(255) | - | - | - Căn giữa. Gồm các tác vụ con:<br>- **Xem chi tiết** (row click): Mở màn hình Xem chi tiết hồ sơ dạng chỉ đọc (UC260.MH02). Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- **Chỉnh sửa** (icon Bút): Chỉ hiển thị khi hồ sơ chưa khóa (chưa giải quyết). Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình.<br>- **Xóa** (icon Rác): Chỉ hiển thị khi hồ sơ chưa khóa. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | - Thao tác: NSD click nút Tìm kiếm. |
|  |  |  | - Xử lý: Hệ thống lấy dữ liệu lọc tìm kiếm từ các trường nhập liệu và thực hiện truy vấn: |
|  |  |  | - TH1 (Không tìm thấy dữ liệu): Không có bản ghi nào khớp các tiêu chí lọc. Hệ thống hiển thị thông báo: "Không tìm thấy hồ sơ phù hợp." ở giữa bảng danh sách. |
|  |  |  | - TH Hợp lệ: Hệ thống trả về danh sách hồ sơ khớp điều kiện lọc (chỉ lọc các hồ sơ chưa xóa `isDeleted = 0`), hiển thị lên Grid kết quả, phân trang 20 dòng/trang, sắp xếp mặc định theo Ngày tiếp nhận giảm dần, đồng thời hiển thị thông báo Toast thành công: "Đã lọc danh sách kết quả". |
| 2 | Xóa bộ lọc | Nút | - Thao tác: NSD click nút Xóa bộ lọc. |
|  |  |  | - Xử lý: Đưa toàn bộ các ô nhập liệu về giá trị rỗng, các select dropdown về giá trị "Tất cả", checkbox "Quá hạn xử lý" về Uncheck, và tự động gọi lại danh sách đầy đủ ban đầu. |
| 3 | Thêm mới hồ sơ | Nút | - Thao tác: NSD click nút Thêm mới hồ sơ. |
|  |  |  | - Xử lý: Hệ thống chuyển hướng người dùng sang màn hình Thêm mới / Cập nhật hồ sơ tiếp công dân (UC260.MH01) với form trống. |
| 4 | Xuất Excel | Nút | - Thao tác: NSD click nút Xuất Excel. |
|  |  |  | - Xử lý: Hệ thống kiểm tra danh sách kết quả tìm kiếm hiện tại: |
|  |  |  | - TH1 (Danh sách rỗng): Danh sách hiện hành không có bản ghi nào. Hệ thống hiển thị thông báo Toast lỗi: "Không có dữ liệu để kết xuất Excel" và dừng lại. |
|  |  |  | - TH Hợp lệ: Kết xuất toàn bộ danh sách kết quả tìm kiếm hiện hành ra file Excel (.xlsx) theo định dạng bảng lưới hiển thị, giới hạn kết xuất tối đa là 10.000 dòng dữ liệu, hiển thị Toast thông báo: "Hệ thống đang kết xuất Sổ theo dõi tiếp công dân và giải quyết KNTC ra file Excel (.xlsx)...", sau 1.5 giây tải tệp xuống trình duyệt và báo: "Kết xuất file Excel thành công! Trình duyệt bắt đầu tải xuống.". |
| 5 | Xem chi tiết | Row Click | - Thao tác: NSD click row click (Xem chi tiết) trên cột Thao tác của dòng bản ghi. |
|  |  |  | - Xử lý: Chuyển hướng người dùng sang màn hình Xem chi tiết hồ sơ tiếp công dân (UC260.MH02) ở chế độ Chỉ đọc. |
| 6 | Chỉnh sửa | Biểu tượng | - Thao tác: NSD click biểu tượng Bút (Chỉnh sửa) trên cột Thao tác của dòng bản ghi. |
|  |  |  | - Xử lý: Chuyển hướng người dùng sang màn hình Thêm mới / Cập nhật hồ sơ tiếp công dân (UC260.MH01) để hiệu chỉnh thông tin. |
| 7 | Xóa | Biểu tượng | - Thao tác: NSD click biểu tượng Rác (Xóa) trên cột Thao tác của dòng bản ghi. |
|  |  |  | - Xử lý: Gọi hiển thị Modal xác nhận xóa hồ sơ (UC262.MH01) đè lên giao diện hiện hành. |

---

##### 4.3.2.11.4. UC260.MH02 - Màn hình Xem chi tiết hồ sơ tiếp công dân
Màn hình cung cấp giao diện chỉ đọc (Read-only) hiển thị toàn bộ thông tin hồ sơ tiếp công dân và kết quả xử lý.

###### Mô tả thông tin trên màn hình:
\-   Mọi thông tin giống như màn hình Nhập mới / Cập nhật (UC260.MH01) nhưng tất cả các trường dữ liệu đều hiển thị ở dạng **Label** chỉ đọc.
\-   **Ràng buộc ẩn trường trống:** Đối với các trường không bắt buộc (như Số hợp đồng, số đăng ký BPBĐ liên kết...), nếu không có dữ liệu gốc (rỗng hoặc null), hệ thống sẽ tự động ẩn toàn bộ dòng/trường đó đi để tiết kiệm không gian và tối ưu hóa hiển thị.
\-   **Danh sách tệp đính kèm:** Hiển thị danh sách tệp đính kèm dưới dạng lưới thẻ card. Chỉ hiển thị duy nhất nút **Xem** (row click), không hiển thị nút **Xóa** và không hiển thị vùng upload file.

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Nút | - Thao tác: NSD click nút Đóng (icon Close ✖) ở góc dưới cùng bên trái hoặc góc trên cùng bên phải. |
|  |  |  | - Xử lý: Hệ thống đóng màn hình chỉ đọc và quay trở lại màn hình Tra cứu danh sách (UC261.MH01). |
| 2 | Xem | Nút | - Thao tác: NSD click nút Xem bên cạnh thẻ tệp đính kèm. |
|  |  |  | - Xử lý: Gọi hiển thị Màn hình Xem trước tài liệu đính kèm (UC260.MH03) dưới dạng Modal popup đè lên giao diện hiện tại. |

---

##### 4.3.2.11.5. UC260.MH03 - Màn hình Xem trước tài liệu đính kèm (Preview Modal)
Màn hình popup toàn màn hình mô phỏng nội dung chi tiết của tệp đính kèm (Đơn khiếu nại/tố cáo gốc) được hiển thị dưới dạng văn bản A4 chuẩn nhà nước.

###### Mô tả thông tin trên màn hình:
\-   **Header:** Hiển thị Tên tệp đính kèm đang xem, nút **In tài liệu**, nút **Tải xuống**, và nút **Đóng** modal.
\-   **Vùng hiển thị văn bản (Document Paper):**
    \-   *Quốc hiệu và tiêu đề:* hiển thị "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM - Độc lập - Tự do - Hạnh phúc".
    \-   *Tên đơn thư:* Tự động hiển thị theo Loại vụ việc đã nhập trong form (Ví dụ: `ĐƠN KHIẾU NẠI`, `ĐƠN TỐ CÁO`...).
    \-   *Thông tin người làm đơn:* Tự động trích xuất động các dữ liệu hiện tại từ form và điền vào các mục tương ứng trên giấy (Họ và tên, Số định danh, Địa chỉ thường trú, Số điện thoại liên hệ).
    \-   *Nội dung đơn thư:* Sinh tự động nội dung văn phong hành chính dựa trên trường `Tóm tắt nội dung yêu cầu, phản ánh` và `Nội dung chi tiết vụ việc` đã nhập trong form.
    \-   *Chữ ký & Mộc đỏ:* 
        \-   Bên trái: Chữ ký của Cán bộ tiếp nhận kèm con dấu tròn đỏ mô phỏng của Cục ĐKGDBĐ Bộ Tư pháp.
        \-   Bên phải: Chữ ký của người làm đơn (Họ tên người dân đã nhập trong form).
    \-   *Khung xác thực ký số điện tử:* Khung viền xanh lá ở góc dưới bên trái xác nhận tài liệu đã được ký số điện tử bởi Cục Đăng ký giao dịch bảo đảm, ghi nhận thời gian ký số đồng bộ.

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | In tài liệu | Nút | - Thao tác: NSD click nút In tài liệu trên thanh toolbar. |
|  |  |  | - Xử lý: Hiển thị Toast thông báo: "Đang kết nối máy in..." để mô phỏng tính năng in ấn. |
| 2 | Tải xuống | Nút | - Thao tác: NSD click nút Tải xuống trên thanh toolbar. |
|  |  |  | - Xử lý: Hiển thị Toast thông báo: "Tải xuống tài liệu thành công!" để mô phỏng tải tệp. |
| 3 | Đóng | Nút | - Thao tác: NSD click nút Đóng (màu đỏ) ở góc trên bên phải thanh toolbar. |
|  |  |  | - Xử lý: Đóng Modal xem trước, quay lại màn hình trước đó. |

---

#### 4.3.2.11.6. UC262 - Xóa thông tin tiếp công dân

##### 4.3.2.11.6.1. Mục đích
Cho phép Cán bộ nghiệp vụ thực hiện xóa hồ sơ tiếp công dân bị nhập sai.

*a. Phân quyền*

\- Cán bộ nghiệp vụ ĐKBPBĐ.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập vào hệ thống.
\- Hồ sơ mục tiêu nằm đúng trạng thái yêu cầu xử lý.

##### 4.3.2.11.6.2. UC262.MH01 - Modal Xác nhận xóa hồ sơ
Modal dialog hiển thị đè lên màn hình Danh sách tra cứu (UC261.MH01) khi cán bộ click nút Xóa.

###### Mô tả thông tin trên màn hình:
\-   Mã hồ sơ tiếp công dân cần xóa (Label).
\-   Trường nhập **Lý do xóa hồ sơ tiếp dân** (Textarea, Bắt buộc).

###### Chức năng trên màn hình:
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận | Nút | - Thao tác: NSD click nút Xác nhận. |
|  |  |  | - Xử lý: Hệ thống thực hiện kiểm tra lý do xóa: |
|  |  |  | - TH1 (Bỏ trống lý do): Trường Lý do xóa bị bỏ trống. Hệ thống hiển thị thông báo lỗi: "Vui lòng nhập lý do xóa hồ sơ tiếp dân!". Không thực hiện xóa. |
|  |  |  | - TH Hợp lệ: Hệ thống tiến hành cập nhật cờ xóa logic `IsDeleted = 1`, lưu trữ lý do xóa, tên người xóa, ngày xóa vào bảng CSDL, hiển thị thông báo Toast thành công: `Đã xóa hồ sơ [Mã hồ sơ] thành công!`, đóng modal và tải lại lưới danh sách kết quả. |
| 2 | Hủy | Nút | - Thao tác: NSD click nút Hủy. |
|  |  |  | - Xử lý: Đóng Modal cảnh báo xóa hồ sơ, giữ nguyên dữ liệu hồ sơ và trạng thái hiển thị. |

---

#### 4.3.2.11.7. Quy tắc nghiệp vụ liên quan (Business Rules)

\-   **BR_TCD_01 (Mã hồ sơ tự sinh):** Mã hồ sơ tiếp công dân được hệ thống sinh tự động theo quy tắc cố định: `TCD-[NĂM]-[THÁNG]-[STT]` (STT tăng dần bắt đầu từ 0001 mỗi tháng). Trường này hiển thị chỉ đọc, tuyệt đối không được phép chỉnh sửa thủ công dưới mọi hình thức để đảm bảo truy vết.
\-   **BR_TCD_02 (Ràng buộc thời hạn tối đa):** Hệ thống tự động tính toán Thời hạn giải quyết theo luật định và cán bộ được phép chỉnh sửa ngày hạn giải quyết thủ công, tuyệt đối không được phép sửa vượt quá thời hạn tối đa theo quy định pháp luật. Hệ thống không gửi email cảnh báo về thời hạn giải quyết:
    \-   *Khiếu nại, Tố cáo:* Tối đa 30 ngày kể từ Ngày tiếp nhận.
    \-   *Kiến nghị, Phản ánh:* Tối đa 20 ngày kể từ Ngày tiếp nhận.
    \-   *Yêu cầu cung cấp thông tin:* Tối đa 10 ngày kể từ Ngày tiếp nhận.
\-   **BR_TCD_03 (Liên thông dữ liệu cục bộ):** Chức năng Liên thông Số đăng ký BPBĐ chỉ thực hiện truy vấn đối soát dữ liệu trên Cơ sở dữ liệu Đăng ký biện pháp bảo đảm nội bộ của NRAST, không gọi API kết nối sang Cục CSGT (C08).
\-   **BR_TCD_04 (Quyền hạn xử lý Tố cáo bảo mật):** Hồ sơ có Loại vụ việc là "Tố cáo" và kích hoạt "Bảo mật thông tin danh tính người tố cáo" chỉ cho phép tài khoản của Cán bộ trực tiếp nhập hồ sơ đó và Lãnh đạo đơn vị được quyền xem chi tiết. Đối với các tài khoản cán bộ khác, thông tin họ tên, số định danh, địa chỉ, số điện thoại, email của người tố cáo sẽ được ẩn hoàn toàn trên lưới và form chi tiết, thay thế bằng nhãn dán `[Được bảo mật danh tính]` và khóa cứng không cho phép chỉnh sửa.
\-   **BR_TCD_05 (Ràng buộc file đính kèm):** Các tệp đính kèm tải lên phải có dung lượng mỗi tệp nhỏ hơn hoặc bằng 20MB. Hệ thống chỉ chấp nhận các đuôi mở rộng: `.pdf, .doc, .docx, .xlsx, .xls, .jpg, .jpeg, .png`.
\-   **BR_TCD_06 (Lưu trữ lịch sử):** Mọi giao dịch thay đổi trạng thái, phân công, hoặc xóa hồ sơ tiếp công dân bắt buộc phải ghi vết lịch sử hoạt động vào nhật ký hệ thống (Audit Trail) để phục vụ giám sát và thanh kiểm tra.
