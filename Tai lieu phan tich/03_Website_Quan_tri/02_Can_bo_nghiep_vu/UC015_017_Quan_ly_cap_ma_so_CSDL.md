#### 4.3.2.15. Quản lý yêu cầu và cấp mã số sử dụng CSDL

##### 4.3.2.15.1. Tổng quan & Mục đích

**Mục đích**:

\- Cho phép Cán bộ nghiệp vụ quản lý tập trung toàn bộ danh sách các yêu cầu đăng ký cấp mã số sử dụng CSDL và các mã số sử dụng Cơ sở dữ liệu (CSDL) đã được kích hoạt trên hệ thống.

\- Cho phép Cán bộ nghiệp vụ tự tạo hộ yêu cầu cấp mã số sử dụng CSDL trực tiếp tại quầy (thu phí ngay và cấp mã ngay, hoặc lưu nháp để xử lý sau) đối với khách hàng đến làm việc trực tiếp.

\- Cho phép Cán bộ nghiệp vụ thực hiện đối soát chứng từ thanh toán (chuyển khoản ngân hàng/tiền mặt) để kích hoạt các yêu cầu do khách hàng tự gửi trực tuyến, hoặc từ chối yêu cầu không hợp lệ.

\- Cung cấp tính năng gia hạn, thay đổi trạng thái (khóa/ngưng sử dụng/kích hoạt lại) đối với các mã số sử dụng CSDL đã cấp.

*a. Phân quyền*

\- Cán bộ nghiệp vụ (Phòng Quản lý đăng ký trực tuyến và tra cứu thông tin, dữ liệu - QLĐKTT&TTDL): Được thực hiện toàn bộ chức năng tra cứu, tạo mới, chỉnh sửa, kích hoạt, từ chối, gia hạn và thay đổi trạng thái mã số sử dụng CSDL.

*b. Điều kiện thực hiện*

\- Cán bộ nghiệp vụ đã đăng nhập thành công vào phân hệ Website Quản trị.

\- Tài khoản cán bộ có quyền truy cập chức năng "Quản lý yêu cầu và cấp mã số sử dụng CSDL".

---

##### 4.3.2.15.2. UC015_017.MH01 - Màn hình Danh sách yêu cầu và mã số sử dụng CSDL

**4.3.2.15.2.1. Màn hình**:

\- Giao diện gồm khu vực Bộ lọc tìm kiếm, Thanh công cụ thao tác và Bảng danh sách kết quả (Grid) hiển thị chung cả yêu cầu đang xử lý lẫn mã số đã cấp.

![Màn hình Danh sách yêu cầu và mã số sử dụng CSDL](images/UC015_017_List.png)

**4.3.2.15.2.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Bộ lọc tìm kiếm** | | | | |
| Từ khóa tìm kiếm | String(255) | Không | Trống | Tìm kiếm gần đúng (không phân biệt hoa/thường, tự động Trim space) theo Tên đối tượng đề nghị, Số CCCD/MST, Mã yêu cầu hoặc Mã số sử dụng CSDL. |
| Loại đối tượng | Enum(String(50)) | Không | Tất cả | Tham chiếu **[DM_37]**.<br>Gồm các giá trị:<br>\- Tất cả<br>\- Cá nhân<br>\- Tổ chức<br>\- Cơ quan có thẩm quyền |
| Loại mã số CSDL | Enum(String(50)) | Không | Tất cả | Tham chiếu **[DM_38]**.<br>Gồm các giá trị:<br>\- Tất cả<br>\- Một lần<br>\- Thường xuyên |
| Phương thức thanh toán | Enum(String(50)) | Không | Tất cả | Tham chiếu **[DM_40]**.<br>Gồm các giá trị:<br>\- Tất cả<br>\- Thanh toán trực tuyến<br>\- Chuyển khoản ngân hàng<br>\- Nộp tiền mặt<br>\- Miễn phí |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Tham chiếu **[DM_39]**.<br>Gồm các giá trị:<br>\- Tất cả<br>\- Chờ kích hoạt<br>\- Hoạt động<br>\- Đã sử dụng<br>\- Hết hạn<br>\- Khóa<br>\- Ngưng sử dụng<br>\- Bị từ chối |
| Từ ngày | Date | Không | Ngày hiện tại trừ 2 tháng | Lọc theo Ngày tạo yêu cầu, định dạng nhập `dd/mm/yyyy`. Rule so sánh khoảng ngày - **[BR-VAL-007]**. |
| Đến ngày | Date | Không | Ngày hiện tại | Lọc theo Ngày tạo yêu cầu, định dạng nhập `dd/mm/yyyy`. Nếu Từ ngày lớn hơn Đến ngày, vi phạm **[BR-VAL-007]**, hiển thị **[MSG-ERR-VAL-007]**. |
| **Thanh công cụ** | - | \- | \- | Vị trí phía trên Bảng danh sách kết quả. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Nút: Tạo mới yêu cầu | - | \- | \- | Control UI: Nút bấm. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Nút: Kết xuất Excel | - | \- | \- | Control UI: Nút bấm. Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **Bảng danh sách kết quả** | - | \- | 10 bản ghi/trang | Control UI: Bảng/Lưới hiển thị.<br>\- Hiển thị đồng thời yêu cầu đang xử lý và mã số sử dụng CSDL đã cấp.<br>\- Sắp xếp mặc định theo Ngày tạo giảm dần.<br>\- Tùy chọn số bản ghi/trang: 5/10/20/50, mặc định **10**.<br>\- Nếu không có dữ liệu phù hợp, hiển thị `"Không tìm thấy bản ghi nào"`.<br>\- Chỉ hiển thị bản ghi trong phạm vi đơn vị Cán bộ nghiệp vụ đăng nhập. |
| Cột: STT | Integer(10) | \- | \- | Số thứ tự tăng dần theo trang hiện hành. |
| Cột: Mã yêu cầu | String(50) | \- | \- | Mã số yêu cầu do hệ thống tự sinh, định dạng `RQ-YYYYMMDD-XXXX` (ví dụ: `RQ-20260625-0001`). |
| Cột: Mã số sử dụng CSDL | String(50) | \- | \- | Mã truy cập CSDL, định dạng `CQ-XXXXXX` (Cơ quan), `TX-XXXXXX` (Thường xuyên) hoặc `1L-XXXXXX` (Một lần). Hiển thị `"—"` nếu yêu cầu chưa được cấp mã (đang ở trạng thái "Bị từ chối" và chưa xử lý). |
| Cột: Tên đối tượng đề nghị | String(255) | \- | \- | Tên đối tượng đăng ký cấp mã theo dữ liệu hồ sơ. |
| Cột: Số CCCD/MST | String(50) | \- | \- | Số CCCD hoặc Mã số thuế của đối tượng đề nghị. Hiển thị `"—"` nếu không có dữ liệu. |
| Cột: Mã tài khoản trực tuyến | String(255) | \- | \- | Chỉ hiển thị đối với khách hàng có liên kết Tài khoản trực tuyến (quản lý tại **[UC009]**), theo đúng giá trị Mã Tài khoản trực tuyến (Tên đăng nhập) đã liên kết tại **4.3.2.15.3**. Hiển thị `"—"` đối với các bản ghi không liên kết tài khoản trực tuyến. |
| Cột: Loại đối tượng | Enum(String(50)) | \- | \- | Tham chiếu **[DM_37]**. |
| Cột: Loại mã số CSDL | Enum(String(50)) | \- | \- | Tham chiếu **[DM_38]**. |
| Cột: Phương thức thanh toán | Enum(String(50)) | \- | \- | Tham chiếu **[DM_40]**. |
| Cột: Ngày tạo | Date | \- | \- | Ngày tạo yêu cầu, định dạng hiển thị bắt buộc: `DD/MM/YYYY`. |
| Cột: Trạng thái | Enum(String(50)) | \- | \- | Tham chiếu **[DM_39]**, hiển thị dạng Tag màu tương ứng.<br>Riêng trạng thái "Bị từ chối" hiển thị thêm biểu tượng gợi ý, di chuột vào hiển thị Lý do từ chối theo dữ liệu hồ sơ. |
| Cột: Thao tác | String(255) | \- | \- | Gồm các nút thao tác, chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình:<br>\- Xem<br>\- Sửa<br>\- Kích hoạt<br>\- Từ chối<br>\- Gia hạn<br>\- Công tắc bật/tắt trạng thái sử dụng |

**4.3.2.15.2.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Hệ thống lọc lại Bảng danh sách kết quả theo đúng các tiêu chí đang thiết lập ở Bộ lọc tìm kiếm. Từ khóa rỗng hiển thị lại toàn bộ danh sách mặc định. |
| 2 | Xóa bộ lọc | Nút | Đặt lại toàn bộ tiêu chí Bộ lọc tìm kiếm về giá trị mặc định (riêng Từ ngày/Đến ngày trở về khoảng 2 tháng gần nhất tính đến ngày hiện tại) và làm mới Bảng danh sách kết quả. |
| 3 | Tạo mới yêu cầu | Nút | Mở **4.3.2.15.3. UC015_017.MH02 - Popup Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL** ở chế độ Tạo mới. |
| 4 | Kết xuất Excel | Nút | Rule Export Excel - **[BR-EXP-040]**.<br>Xuất tệp Excel theo đúng kết quả tìm kiếm/lọc hiện hành trên Bảng danh sách kết quả.<br>Nếu danh sách rỗng, hiển thị **[MSG-WRN-SYS-001]** và không thực hiện xuất tệp. |
| 5 | Xem | Row Click | Luôn hiển thị và cho phép thao tác với mọi trạng thái. Mở **4.3.2.15.8. UC015_017.MH07 - Popup Xem chi tiết yêu cầu và mã số sử dụng CSDL**. |
| 6 | Sửa | Icon | Chỉ hiển thị thao tác được (không làm mờ) khi bản ghi ở trạng thái "Chờ kích hoạt"; các trạng thái khác hiển thị Icon ở dạng làm mờ, không cho phép bấm. Mở **4.3.2.15.3. UC015_017.MH02** ở chế độ Chỉnh sửa. |
| 7 | Kích hoạt | Icon | Chỉ hiển thị thao tác được khi bản ghi ở trạng thái "Chờ kích hoạt"; các trạng thái khác hiển thị Icon ở dạng làm mờ. Mở **4.3.2.15.4. UC015_017.MH03 - Popup Kích hoạt yêu cầu cấp mã số sử dụng CSDL**. |
| 8 | Từ chối | Icon | Chỉ hiển thị thao tác được khi bản ghi ở trạng thái "Chờ kích hoạt"; các trạng thái khác hiển thị Icon ở dạng làm mờ. Mở **4.3.2.15.5. UC015_017.MH04 - Popup Từ chối yêu cầu cấp mã số sử dụng CSDL**. |
| 9 | Gia hạn | Icon | Chỉ hiển thị thao tác được khi bản ghi ở trạng thái "Hết hạn"; các trạng thái khác hiển thị Icon ở dạng làm mờ. Mở **4.3.2.15.6. UC015_017.MH05 - Popup Gia hạn mã số sử dụng CSDL**. |
| 10 | Công tắc bật/tắt trạng thái sử dụng | Toggle/Switch | Chỉ cho phép thao tác khi bản ghi ở trạng thái "Hoạt động", "Khóa" hoặc "Ngưng sử dụng"; các trạng thái khác hiển thị công tắc ở dạng làm mờ, không cho phép gạt.<br>\- Trạng thái bật (ON) tương ứng "Hoạt động"; trạng thái tắt (OFF) tương ứng "Khóa"/"Ngưng sử dụng".<br>\- Gạt công tắc theo bất kỳ chiều nào (Hoạt động → Khóa/Ngưng sử dụng, hoặc Khóa/Ngưng sử dụng → Hoạt động) đều không thay đổi trạng thái ngay lập tức, mà mở **4.3.2.15.7. UC015_017.MH06 - Popup Thay đổi trạng thái sử dụng mã số sử dụng CSDL** với "Hành động yêu cầu" được gợi ý sẵn tương ứng chiều gạt (Khóa/Ngưng sử dụng hoặc Kích hoạt lại) để người dùng xác nhận lý do trước khi hệ thống thực sự cập nhật trạng thái.<br>\- Nếu người dùng bấm Hủy tại popup, công tắc tự động khôi phục về đúng trạng thái hiện hành trên hệ thống (không giữ theo vị trí vừa gạt). |

---

##### 4.3.2.15.3. UC015_017.MH02 - Popup Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL

**4.3.2.15.3.1. Màn hình**:

\- Giao diện Popup Modal nhập liệu, dùng chung cho 2 chế độ Tạo mới và Chỉnh sửa (chỉ áp dụng chỉnh sửa với yêu cầu đang ở trạng thái "Chờ kích hoạt").

![Màn hình Tạo mới/Chỉnh sửa yêu cầu cấp mã số sử dụng CSDL](images/UC015_017_Create.png)

**4.3.2.15.3.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Loại đối tượng | Enum(String(50)) | Có | Trống | Tham chiếu **[DM_37]**. Rule bắt buộc nhập - **[BR-VAL-001]**.<br>Khi chọn "Cơ quan có thẩm quyền": ẩn trường Loại mã số sử dụng CSDL (mặc định luôn là "Sử dụng thường xuyên", Vô thời hạn) và mức phí luôn là Miễn phí. |
| Loại mã số sử dụng CSDL | Enum(String(50)) | Có | Sử dụng thường xuyên | Tham chiếu **[DM_38]**. Chỉ hiển thị khi Loại đối tượng là "Cá nhân" hoặc "Tổ chức".<br>Gồm:<br>\- Sử dụng thường xuyên<br>\- Sử dụng một lần (Mua lẻ) |
| Mã Tài khoản trực tuyến (Tên đăng nhập) | String(255) | Có* | Trống | (*) Bắt buộc và hiển thị khi: Loại đối tượng là "Cá nhân"/"Tổ chức" và Loại mã số là "Sử dụng thường xuyên", hoặc Loại đối tượng là "Cơ quan có thẩm quyền". Ẩn hoàn toàn với trường hợp "Cá nhân"/"Tổ chức" chọn "Sử dụng một lần".<br>Nhập tên đăng nhập để tìm và liên kết tài khoản khách hàng quản lý tại **[UC009]**.<br>\- Nếu tìm thấy: Hệ thống tự động điền và chuyển các trường Tên đối tượng đề nghị, Số CCCD/MST, Email, Số điện thoại, Địa chỉ liên hệ sang chế độ Chỉ đọc theo đúng dữ liệu tài khoản.<br>\- Nếu không tìm thấy: Hiển thị trạng thái không tìm thấy, giữ nguyên các trường thông tin ở chế độ nhập tay. |
| Tên đối tượng đề nghị | String(255) | Có | Trống | Rule bắt buộc nhập - **[BR-VAL-001]**.<br>Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay. |
| Số CCCD/MST | String(50) | Không | Trống | Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay.<br>Nếu nhập CCCD: Rule định dạng CCCD - **[BR-VAL-004]**.<br>Nếu nhập Mã số thuế: Rule định dạng MST - **[BR-VAL-005]**. |
| Email nhận thông tin | String(255) | Không | Trống | Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay. Rule định dạng Email - **[BR-VAL-002]**. |
| Số điện thoại liên hệ | String(20) | Không | Trống | Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay. Rule định dạng Số điện thoại - **[BR-VAL-003]**. |
| Địa chỉ liên hệ | String(500) | Không | Trống | Tự động điền và Chỉ đọc nếu đã liên kết Tài khoản trực tuyến hợp lệ; ngược lại cho phép nhập tay. |
| Ngày tạo | Datetime | \- | Ngày giờ hiện tại | Chỉ đọc. Ghi nhận thời điểm lập yêu cầu, định dạng hiển thị bắt buộc: `DD/MM/YYYY HH:mm:ss`. |
| Ngày hết hạn | Date | \- | Theo cấu hình | Chỉ đọc. Hiển thị ngày hết hạn dự kiến; giá trị chính thức được hệ thống tính lại tại thời điểm Kích hoạt/Cấp mã theo quy tắc:<br>\- Cơ quan có thẩm quyền: Vô thời hạn (hiển thị `"—"`).<br>\- Cá nhân/Tổ chức (Sử dụng thường xuyên): Ngày `31/12` của năm cấp mã.<br>\- Cá nhân/Tổ chức (Sử dụng một lần): Không giới hạn thời gian (hiển thị `"—"`); mã có hiệu lực cho tới khi được sử dụng (tra cứu) đúng 01 lần. |
| Phương thức thanh toán | Enum(String(50)) | Không | Chuyển khoản ngân hàng | Tham chiếu **[DM_40]** (không hiển thị tùy chọn "Tất cả"). Tự động khóa cố định về "Miễn phí" (không cho chọn lại) khi Loại đối tượng là "Cơ quan có thẩm quyền". |
| Mức phí cần thu | Decimal(18,0) | \- | Theo cấu hình | Chỉ đọc. Hệ thống tự động tính theo Loại đối tượng, Loại mã số sử dụng CSDL và thời điểm lập yêu cầu:<br>\- Cơ quan có thẩm quyền: Miễn phí.<br>\- Cá nhân/Tổ chức, Sử dụng một lần: `20.000 VNĐ` (yêu cầu lập trước ngày 01/07 hàng năm) hoặc `25.000 VNĐ` (yêu cầu lập từ ngày 01/07 hàng năm trở đi).<br>\- Cá nhân/Tổ chức, Sử dụng thường xuyên: `300.000 VNĐ` (yêu cầu lập trước ngày 01/07 hàng năm) hoặc `350.000 VNĐ` (yêu cầu lập từ ngày 01/07 hàng năm trở đi). |
| Ghi chú thanh toán | String(500) | Không | Trống | Ghi chú thêm về thông tin thanh toán. |

**4.3.2.15.3.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Lưu nháp | Nút | TH1 (Trống trường bắt buộc): Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]** dưới ô nhập lỗi đầu tiên. Không cho phép lưu.<br>TH2 (Trùng đối tượng đã được cấp mã CSDL): Vi phạm **[BR-DK-027]**; Cá nhân/Tổ chức hiển thị **[MSG-ERR-VAL-009]** và chặn lưu; Cơ quan có thẩm quyền hiển thị **[MSG-CFM-DK-009]** cho phép chọn Tiếp tục hoặc Hủy.<br>TH Hợp lệ:<br>\+ Lưu yêu cầu với trạng thái "Chờ kích hoạt", tự sinh Mã yêu cầu `RQ-YYYYMMDD-XXXX`.<br>\+ Tự động sinh trước Mã số sử dụng CSDL tương ứng loại đối tượng/loại mã (chi tiết tại mục Quy trình sinh mã bên dưới), lưu ở trạng thái "Chờ kích hoạt" (chưa thể tra cứu, chưa liên kết tài khoản).<br>\+ Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-001]** (chế độ Tạo mới) hoặc **[MSG-SUC-DK-CSDL-003]** (chế độ Chỉnh sửa) và làm mới Bảng danh sách kết quả. |
| 3 | Cấp mã | Nút | Chỉ áp dụng khi Cán bộ nghiệp vụ trực tiếp thu phí tại quầy ngay thời điểm lập/chỉnh sửa yêu cầu (không yêu cầu đính kèm chứng từ do chính cán bộ là người thu tiền và chịu trách nhiệm đối chiếu).<br>TH1 (Trống trường bắt buộc): Tương tự chức năng Lưu nháp - **[BR-VAL-001]**/**[MSG-ERR-VAL-001]**.<br>TH2 (Trùng đối tượng đã được cấp mã CSDL): Tương tự chức năng Lưu nháp - **[BR-DK-027]**.<br>TH Hợp lệ:<br>\+ Lưu yêu cầu với trạng thái "Hoàn thành".<br>\+ Thực hiện Quy trình Kích hoạt & Cấp mã (chi tiết tại mục Quy trình sinh mã bên dưới): cập nhật Mã số sử dụng CSDL từ "Chờ kích hoạt" sang "Hoạt động", thiết lập ngày cấp = ngày hiện tại và ngày hết hạn theo quy tắc tương ứng, tạo/liên kết tài khoản tra cứu.<br>\+ Nếu Mức phí khác Miễn phí: Bật khả dụng nút "In biên lai" để in ngay biên lai thu phí, lệ phí tại **4.3.2.15.9. UC015_017.MH08**.<br>\+ Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-002]** và làm mới Bảng danh sách kết quả. |
| 4 | In biên lai | Nút | Chỉ khả dụng (không làm mờ) khi Mức phí cần thu khác Miễn phí. Mở **4.3.2.15.9. UC015_017.MH08 - Popup Biên lai thu phí, lệ phí** hiển thị nội dung biên lai theo dữ liệu yêu cầu hiện hành để in tại chỗ cho khách hàng. |

**Quy trình sinh mã và Kích hoạt mã số sử dụng CSDL** *(áp dụng chung cho chức năng Cấp mã tại MH02 và chức năng Kích hoạt tại MH03)*:

\- **Sinh mã và kiểm tra trùng lặp** (thực hiện ngay khi Lưu nháp/Gửi yêu cầu):
  \+ Cơ quan có thẩm quyền: Sinh mã dạng `CQ-XXXXXX` (6 chữ số ngẫu nhiên).
  \+ Cá nhân/Tổ chức (Sử dụng thường xuyên): Sinh mã dạng `TX-XXXXXX` (6 chữ số ngẫu nhiên).
  \+ Cá nhân/Tổ chức (Sử dụng một lần): Sinh mã dạng `1L-XXXXXX` (6 chữ số ngẫu nhiên).
  \+ Hệ thống kiểm tra trùng lặp mã số trong CSDL (Rule kiểm tra trùng lặp - **[BR-VAL-009]**), nếu trùng sẽ sinh lại mã khác đến khi duy nhất.

\- **Kích hoạt & thiết lập tài khoản tra cứu**:
  \+ Cơ quan có thẩm quyền: Tự động tạo tài khoản đăng nhập mới (Tên đăng nhập = mã `CQ-XXXXXX`, mật khẩu sinh ngẫu nhiên gửi qua email), vai trò "Tra cứu Cơ quan có thẩm quyền", chỉ dùng để tra cứu CSDL.
  \+ Cá nhân/Tổ chức (Sử dụng thường xuyên): Liên kết trực tiếp mã `TX-XXXXXX` vào tài khoản khách hàng đã chọn (quản lý tại **[UC009]**), kích hoạt quyền tra cứu nâng cao trên tài khoản hiện có, không sinh thêm tài khoản mới.
  \+ Cá nhân/Tổ chức (Sử dụng một lần): Liên kết mã `1L-XXXXXX` vào tài khoản khách hàng đã chọn (nếu có) hoặc lưu độc lập; thiết lập số lượt tra cứu bằng 1 (chỉ tra cứu đúng 01 lần duy nhất). Sau khi khách hàng sử dụng lượt tra cứu duy nhất này tại phân hệ Website Khách hàng, hệ thống tự động chuyển trạng thái mã số sang "Đã sử dụng" (thao tác nằm ngoài phạm vi tính năng này).

\- **Thiết lập ngày hết hạn**:
  \+ Cơ quan có thẩm quyền: Vô thời hạn (`—`, lưu giá trị NULL).
  \+ Cá nhân/Tổ chức (Sử dụng thường xuyên): `31/12` của năm cấp mã.
  \+ Cá nhân/Tổ chức (Sử dụng một lần): Không thiết lập ngày hết hạn (`—`, lưu giá trị NULL); mã có hiệu lực cho tới khi được sử dụng (tra cứu) đúng 01 lần, không ràng buộc theo thời gian.

\- **Ghi nhận giao dịch**: Ghi nhận thông tin đóng phí tương ứng phương thức thanh toán đã chọn.

\- **Gửi email thông báo**:
  \+ Mã một lần: Gửi email chứa Mã số sử dụng CSDL đã cấp, có hiệu lực tra cứu đúng 01 lần, không ràng buộc thời gian sử dụng.
  \+ Mã thường xuyên/Cơ quan có thẩm quyền: Gửi email chứa mật khẩu tài khoản truy cập mới sinh (Cơ quan có thẩm quyền) hoặc thông báo kích hoạt thành công (Cá nhân/Tổ chức, tài khoản đã liên kết sẵn).

---

##### 4.3.2.15.4. UC015_017.MH03 - Popup Kích hoạt yêu cầu cấp mã số sử dụng CSDL

**4.3.2.15.4.1. Màn hình**:

\- Giao diện Popup Modal nhập thông tin đối soát thanh toán và kích hoạt, mở khi Cán bộ nghiệp vụ bấm "Kích hoạt" đối với yêu cầu đang ở trạng thái "Chờ kích hoạt" (áp dụng cho các yêu cầu do khách hàng tự gửi trực tuyến, cần đối soát chứng từ trước khi cấp mã).

![Màn hình Kích hoạt yêu cầu cấp mã số sử dụng CSDL](images/UC015_017_Approve.png)

**4.3.2.15.4.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã yêu cầu | String(50) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Loại mã số sử dụng CSDL | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_38]**. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng đề nghị | String(255) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Loại đối tượng | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_37]**. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Mức phí cần thanh toán | Decimal(18,0) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Phương thức thanh toán | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_40]**. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Số biên lai / Mã giao dịch | String(50) | Có | Trống | Nhập số biên lai/mã giao dịch thực tế đã đối soát thành công. Rule bắt buộc nhập - **[BR-VAL-001]**. |
| Ngày giao dịch | Date | Có | Ngày hiện tại | Định dạng nhập `dd/mm/yyyy`. Rule logic ngày quá khứ - **[BR-VAL-008]** (phải nhỏ hơn hoặc bằng ngày hiện tại). |
| Tệp chứng từ thanh toán | File | Có | Trống | Rule File chứng từ thanh toán (đơn) - **[BR-FILE-012]** (.pdf/.jpg/.png, tối đa 1 tệp, 20MB). |
| Ghi chú kích hoạt | String(500) | Không | Trống | Ghi chú thêm về thông tin đối soát nếu cần. |

**4.3.2.15.4.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Kích hoạt | Nút | TH1 (Trống trường bắt buộc): Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu.<br>TH2 (Dữ liệu không hợp lệ): Tệp chứng từ đính kèm không đúng định dạng hoặc vượt quá 20MB, hoặc đính kèm quá 1 tệp: Vi phạm **[BR-FILE-012]**, hiển thị **[MSG-ERR-FILE-003]**/**[MSG-ERR-FILE-004]** màu đỏ dưới ô tải tệp. Không cho phép lưu.<br>TH3 (Trùng Số biên lai/Mã giao dịch): Vi phạm **[BR-DK-028]**, hiển thị **[MSG-ERR-VAL-009]** dưới ô nhập tương ứng. Không cho phép lưu.<br>TH Hợp lệ: Thực hiện Quy trình Kích hoạt & Cấp mã mô tả tại mục 4.3.2.15.3 (cập nhật trạng thái yêu cầu thành "Hoàn thành", cập nhật Mã số sử dụng CSDL từ "Chờ kích hoạt" sang "Hoạt động", thiết lập ngày cấp/ngày hết hạn, tạo/liên kết tài khoản tra cứu, ghi nhận giao dịch đóng phí, gửi email thông báo). Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-004]** và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.5. UC015_017.MH04 - Popup Từ chối yêu cầu cấp mã số sử dụng CSDL

**4.3.2.15.5.1. Màn hình**:

\- Giao diện Popup Modal nhỏ, mở khi Cán bộ nghiệp vụ bấm "Từ chối" đối với yêu cầu đang ở trạng thái "Chờ kích hoạt".

![Màn hình Từ chối yêu cầu cấp mã số sử dụng CSDL](images/UC015_017_Reject.png)

**4.3.2.15.5.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã yêu cầu | String(50) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng đề nghị | String(255) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Lý do từ chối | Text(500) | Có | Trống | Rule bắt buộc nhập ý kiến/lý do từ chối hồ sơ - **[BR-DK-025]**. |

**4.3.2.15.5.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Xác nhận từ chối | Nút | TH1 (Bỏ trống Lý do từ chối): Vi phạm **[BR-DK-025]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu.<br>TH Hợp lệ: Cập nhật trạng thái yêu cầu thành "Bị từ chối", lưu Lý do từ chối vào hồ sơ. Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-005]** và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.6. UC015_017.MH05 - Popup Gia hạn mã số sử dụng CSDL

**4.3.2.15.6.1. Màn hình**:

\- Giao diện Popup Modal, mở khi Cán bộ nghiệp vụ bấm "Gia hạn" đối với mã số sử dụng CSDL của Cá nhân/Tổ chức đang ở trạng thái "Hết hạn".

![Màn hình Gia hạn mã số sử dụng CSDL](images/UC015_017_Renew.png)

**4.3.2.15.6.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã số sử dụng CSDL | String(50) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng sử dụng | String(255) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Ngày hết hạn hiện tại | Date | \- | Theo bản ghi | Chỉ đọc. Định dạng hiển thị bắt buộc: `DD/MM/YYYY`. |
| Phí gia hạn | Decimal(18,0) | \- | 300.000 VNĐ | Chỉ đọc. Mức phí gia hạn cố định `300.000 VNĐ`/năm, lấy tự động từ cấu hình biểu phí, không phụ thuộc Loại mã số hay thời điểm gia hạn. |
| Phương thức thanh toán | Enum(String(50)) | Có | Chuyển khoản ngân hàng | Tham chiếu **[DM_40]** (chỉ gồm 2 giá trị áp dụng cho gia hạn):<br>\- Chuyển khoản ngân hàng<br>\- Nộp tiền mặt |
| Số biên lai / Mã giao dịch | String(50) | Có | Trống | Rule bắt buộc nhập - **[BR-VAL-001]**. |
| Tệp chứng từ thanh toán | File | Có | Trống | Rule File đính kèm hỗ trợ - **[BR-FILE-011]** (.pdf/.jpg/.jpeg/.png, tối đa 3 tệp, 20MB/tệp). Hiển thị danh sách tên tệp đã tải kèm chức năng Xem file (cho phép xem file tại một tab riêng) và Xóa (cho phép xóa tệp đã tải lên). |
| Ghi chú gia hạn | String(500) | Không | Trống | Nhập ghi chú về thông tin gia hạn. |

**4.3.2.15.6.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng Popup Modal, không lưu bất kỳ thay đổi nào. |
| 2 | Xác nhận gia hạn | Nút | TH1 (Trống trường bắt buộc): Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu.<br>TH2 (Dữ liệu không hợp lệ): Tệp đính kèm không đúng định dạng hoặc vượt quá 20MB, hoặc vượt quá 3 tệp: Vi phạm **[BR-FILE-011]**, hiển thị **[MSG-ERR-FILE-003]**/**[MSG-ERR-FILE-004]**/**[MSG-ERR-FILE-005]** tương ứng. Không cho phép lưu.<br>TH3 (Trùng Số biên lai/Mã giao dịch): Vi phạm **[BR-DK-028]**, hiển thị **[MSG-ERR-VAL-009]**. Không cho phép lưu.<br>TH Hợp lệ:<br>\+ Nếu mã số chưa hết hạn tại thời điểm gia hạn: Ngày hết hạn mới là `31/12` của năm tiếp theo.<br>\+ Nếu mã số đã hết hạn tại thời điểm gia hạn: Ngày hết hạn mới là `31/12` của năm thực hiện gia hạn.<br>\+ Cập nhật trạng thái mã số sử dụng CSDL về "Hoạt động".<br>\+ Ghi nhận lịch sử đóng phí gia hạn `300.000 VNĐ`.<br>\+ Gửi email thông báo gia hạn thành công, xác nhận thời hạn sử dụng mới.<br>\+ Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-006]** và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.7. UC015_017.MH06 - Popup Thay đổi trạng thái sử dụng mã số sử dụng CSDL

**4.3.2.15.7.1. Màn hình**:

\- Giao diện Popup Modal nhỏ xác nhận thay đổi trạng thái, mở khi Cán bộ nghiệp vụ gạt Công tắc bật/tắt tại Bảng danh sách kết quả, đối với mã số sử dụng CSDL đang ở trạng thái "Hoạt động", "Khóa" hoặc "Ngưng sử dụng".

![Màn hình Thay đổi trạng thái sử dụng mã số sử dụng CSDL](images/UC015_017_Status.png)

**4.3.2.15.7.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã số sử dụng CSDL | String(50) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Tên đối tượng sử dụng | String(255) | \- | Theo bản ghi | Chỉ đọc. Hiển thị theo dữ liệu hồ sơ, không cho phép chỉnh sửa. |
| Trạng thái hiện tại | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_39]**. |
| Hành động yêu cầu | Enum(String(50)) | Có | Theo chiều gạt Công tắc | Rule bắt buộc nhập - **[BR-VAL-001]**. Tùy chọn hiển thị phụ thuộc Trạng thái hiện tại:<br>\- Nếu đang "Hoạt động": Gồm `Khóa`, `Ngưng sử dụng`.<br>\- Nếu đang "Khóa": Gồm `Kích hoạt lại`, `Ngưng sử dụng`.<br>\- Nếu đang "Ngưng sử dụng": Gồm `Kích hoạt lại`. |
| Lý do thay đổi | Text(500) | Có | Trống | Rule bắt buộc nhập - **[BR-VAL-001]**. Nhập lý do chi tiết thay đổi trạng thái sử dụng (bao gồm cả trường hợp Kích hoạt lại). |

**4.3.2.15.7.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng Popup Modal, khôi phục Công tắc về đúng trạng thái hiện hành, không lưu thay đổi. |
| 2 | Xác nhận | Nút | TH1 (Trống trường bắt buộc): Chưa chọn Hành động yêu cầu hoặc chưa nhập Lý do thay đổi. Vi phạm **[BR-VAL-001]**, hiển thị **[MSG-ERR-VAL-001]**. Không cho phép lưu.<br>TH Hợp lệ: Cập nhật trạng thái mã số sử dụng CSDL theo Hành động yêu cầu (`Khóa`, `Ngưng sử dụng` hoặc `Hoạt động`), đồng thời khóa/kích hoạt lại tương ứng quyền tra cứu của tài khoản liên kết. Ghi nhật ký hệ thống (Audit Log) lưu lịch sử thay đổi kèm lý do. Đóng popup, hiển thị **[MSG-SUC-DK-CSDL-007]** (Khóa)/**[MSG-SUC-DK-CSDL-008]** (Ngưng sử dụng)/**[MSG-SUC-DK-CSDL-009]** (Kích hoạt lại) tương ứng và làm mới Bảng danh sách kết quả. |

---

##### 4.3.2.15.8. UC015_017.MH07 - Popup Xem chi tiết yêu cầu và mã số sử dụng CSDL

**4.3.2.15.8.1. Màn hình**:

\- Giao diện Popup Modal ở chế độ Chỉ đọc (Read-only), hiển thị toàn bộ thông tin yêu cầu, mã số sử dụng CSDL đã cấp (nếu có) và lịch sử thao tác liên quan.

![Màn hình Xem chi tiết yêu cầu và mã số sử dụng CSDL](images/UC015_017_View.png)

**4.3.2.15.8.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | - | \- | \- | Nhóm thông tin định danh yêu cầu và đối tượng đăng ký. |
| Mã yêu cầu | String(50) | \- | Theo bản ghi | Chỉ đọc. |
| Loại mã số sử dụng CSDL | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_38]**. |
| Ngày yêu cầu | Datetime | \- | Theo bản ghi | Chỉ đọc. Định dạng hiển thị bắt buộc: `DD/MM/YYYY`. |
| Trạng thái | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_39]**. |
| Lý do từ chối | Text(2000) | \- | Theo bản ghi | Chỉ đọc. Nguyên tắc ẩn trường trống: chỉ hiển thị khi yêu cầu ở trạng thái "Bị từ chối" và có dữ liệu. |
| Loại đối tượng | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_37]**. |
| Mã tài khoản trực tuyến | String(255) | \- | Theo bản ghi | Chỉ đọc. Chính là Mã Tài khoản trực tuyến (Tên đăng nhập) đã liên kết tại **4.3.2.15.3** với tài khoản khách hàng quản lý ở **[UC009]**. Nguyên tắc ẩn trường trống: chỉ hiển thị nếu yêu cầu có liên kết tài khoản trực tuyến. |
| Tên đối tượng đề nghị | String(255) | \- | Theo bản ghi | Chỉ đọc. |
| Số CCCD/MST | String(50) | \- | Theo bản ghi | Chỉ đọc. Nguyên tắc ẩn trường trống: chỉ hiển thị nếu có dữ liệu gốc. |
| Email | String(255) | \- | Theo bản ghi | Chỉ đọc. Nguyên tắc ẩn trường trống: chỉ hiển thị nếu có dữ liệu gốc. |
| Số điện thoại | String(20) | \- | Theo bản ghi | Chỉ đọc. Nguyên tắc ẩn trường trống: chỉ hiển thị nếu có dữ liệu gốc. |
| Địa chỉ | String(500) | \- | Theo bản ghi | Chỉ đọc. Nguyên tắc ẩn trường trống: chỉ hiển thị nếu có dữ liệu gốc. |
| **II. Thông tin mã số sử dụng CSDL** | - | \- | \- | Chỉ hiển thị toàn bộ nhóm này khi yêu cầu đã được cấp mã (Mã số sử dụng CSDL khác `"—"`). |
| Mã số sử dụng CSDL | String(50) | \- | Theo bản ghi | Chỉ đọc. |
| Tên đăng nhập liên kết | String(255) | \- | Theo bản ghi | Chỉ đọc. Chính là mã số sử dụng CSDL được cấp hoặc tên đăng nhập của tài khoản khách hàng được liên kết từ **[UC009]**. |
| Ngày cấp | Date | \- | Theo bản ghi | Chỉ đọc. Định dạng hiển thị bắt buộc: `DD/MM/YYYY`. |
| Ngày hết hạn | Date | \- | Theo bản ghi | Chỉ đọc. Định dạng hiển thị bắt buộc: `DD/MM/YYYY` hoặc `—` (Cơ quan có thẩm quyền/Sử dụng một lần). |
| **III. Thông tin đóng phí** | - | \- | \- | Nhóm thông tin thanh toán của yêu cầu. |
| Mức phí | Decimal(18,0) | \- | Theo bản ghi | Chỉ đọc. |
| Phương thức thanh toán | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_40]**. |
| **IV. Lịch sử thay đổi trạng thái** | - | \- | \- | Control UI: Bảng/Lưới hiển thị. Sắp xếp theo Ngày thực hiện giảm dần. |
| Cột: STT | Integer(10) | \- | \- | Số thứ tự tăng dần. |
| Cột: Ngày thực hiện | Datetime | \- | \- | Định dạng hiển thị bắt buộc: `DD/MM/YYYY HH:mm:ss`. |
| Cột: Hành động | String(255) | \- | \- | Gồm các giá trị:<br>\- Tạo yêu cầu<br>\- Kích hoạt (Cấp mã/Phê duyệt)<br>\- Từ chối<br>\- Gia hạn<br>\- Khóa<br>\- Ngưng sử dụng<br>\- Kích hoạt lại |
| Cột: Người thực hiện | String(255) | \- | \- | Họ tên Cán bộ nghiệp vụ thực hiện thao tác, hoặc `"Khách hàng"` nếu là yêu cầu gửi trực tuyến. |
| Cột: Ghi chú | Text(2000) | \- | \- | Lý do thay đổi hoặc ghi chú giao dịch tương ứng. |

**4.3.2.15.8.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Đóng Popup Modal và quay lại **4.3.2.15.2. UC015_017.MH01**. |
| 2 | Tạo bản sao / Yêu cầu lại | Nút | Chỉ hiển thị khi yêu cầu đang ở trạng thái "Bị từ chối". Mở **4.3.2.15.3. UC015_017.MH02** ở chế độ Tạo mới, tự động điền sẵn Loại đối tượng, Loại mã số, Tên đối tượng đề nghị, Số CCCD/MST, Email, Số điện thoại, Địa chỉ liên hệ, Phương thức thanh toán theo dữ liệu của yêu cầu bị từ chối để Cán bộ nghiệp vụ chỉnh sửa và gửi lại. |

---

##### 4.3.2.15.9. UC015_017.MH08 - Popup Biên lai thu phí, lệ phí

**4.3.2.15.9.1. Màn hình**:

\- Giao diện Popup Modal hiển thị nội dung biên lai thu phí, mở khi Cán bộ nghiệp vụ bấm "In biên lai" tại **4.3.2.15.3. UC015_017.MH02** ngay sau khi cấp mã thành công cho yêu cầu có phát sinh phí.

![Màn hình Biên lai thu phí, lệ phí](images/UC015_017_Receipt.png)

**4.3.2.15.9.2. Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tên cơ quan phát hành | String(255) | \- | Theo cấu hình đơn vị | Chỉ đọc. Hiển thị theo dữ liệu hệ thống (tên và địa chỉ Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước). |
| Số hóa đơn | String(50) | \- | Tự sinh | Chỉ đọc. Hệ thống tự sinh số hóa đơn duy nhất tại thời điểm in. |
| Ngày in | Datetime | \- | Ngày giờ hiện tại | Chỉ đọc. |
| Đơn vị/Người đề nghị | String(255) | \- | Theo bản ghi | Chỉ đọc. Lấy theo Tên đối tượng đề nghị. |
| Số CCCD/MST | String(50) | \- | Theo bản ghi | Chỉ đọc. |
| Nội dung thu | String(255) | \- | Theo bản ghi | Chỉ đọc. Hiển thị `"Cấp mã số sử dụng CSDL ([Loại mã số])"`. |
| Phương thức thanh toán | Enum(String(50)) | \- | Theo bản ghi | Chỉ đọc. Tham chiếu **[DM_40]**. |
| Tổng tiền thu | Decimal(18,0) | \- | Theo bản ghi | Chỉ đọc. Lấy theo Mức phí cần thu đã tính tại **4.3.2.15.3**. |

**4.3.2.15.9.3. Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Đóng | Nút | Đóng Popup Modal, quay lại **4.3.2.15.3. UC015_017.MH02**. |
| 2 | In ngay | Nút | Gọi lệnh in của trình duyệt để in trực tiếp nội dung biên lai đang hiển thị. |

---
