# UC-DK-GIAY - Nhập liệu hồ sơ giấy Phiếu đăng ký

## 1. Tổng quan

### 1.1. Mục đích

Tài liệu này đặc tả màn hình **Nhập liệu hồ sơ giấy Phiếu đăng ký** trên Website quản trị, áp dụng cho hồ sơ giấy đã được tiếp nhận và đã hoàn tất thu phí/miễn phí tại quầy.

Màn hình được mở từ bản ghi hồ sơ giấy tại Tab "Hồ sơ chờ nhập liệu" của Website quản trị. Tài liệu này **không đặc tả màn hình danh sách**, vì danh sách chờ nhập liệu đã được mô tả tại [SRS_Ho_so_cho_nhap_lieu](SRS_Ho_so_cho_nhap_lieu.md).

### 1.2. Phạm vi Phiếu đăng ký

Nhóm Phiếu đăng ký trong tài liệu này bao gồm các Loại yêu cầu sau:

\- "Đăng ký lần đầu".
\- "Đăng ký thay đổi".
\- "Xóa đăng ký".
\- "Thông báo xử lý tài sản bảo đảm lần đầu".
\- "Thay đổi thông báo xử lý tài sản bảo đảm".
\- "Xóa đăng ký thông báo xử lý tài sản bảo đảm".

Không thuộc phạm vi tài liệu này:

\- "Yêu cầu cung cấp thông tin".
\- "Yêu cầu cung cấp bản sao".
\- "Yêu cầu cung cấp bản sao kèm thông báo".
\- Màn hình danh sách hồ sơ chờ nhập liệu.
\- Quy trình tiếp nhận hồ sơ giấy tại [UCPS012](UCPS012_Tiep_nhan_ho_so_giay_Can_bo_tiep_nhan.md).
\- Quy trình thu phí/miễn phí hồ sơ giấy tại [UCPS013](UCPS013_Quan_ly_thu_phi_ho_so_giay_Can_bo_ke_toan.md).
\- Quy trình xử lý/ký duyệt sau khi hồ sơ được trình tại [SRS_Xu_ly_Phieu_dang_ky_Can_bo](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md) và [SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao](SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao.md).

### 1.3. Đối tượng sử dụng

| Vai trò | Quyền sử dụng |
| :--- | :--- |
| Cán bộ giải quyết hồ sơ | Mở hồ sơ giấy chờ nhập liệu, xem thông tin tiếp nhận/thu phí, tra cứu hồ sơ tham chiếu nếu nghiệp vụ yêu cầu, nhập/cập nhật dữ liệu Phiếu đăng ký theo hồ sơ giấy, xem trước, duyệt chờ ký, trình ký hoặc hủy thao tác nhập liệu. |
| Cán bộ tiếp nhận | Không nhập dữ liệu nghiệp vụ Phiếu đăng ký; chỉ xem thông tin tiếp nhận nếu được phân quyền. |
| Cán bộ kế toán | Không nhập dữ liệu nghiệp vụ Phiếu đăng ký; chỉ xem thông tin thu phí nếu được phân quyền. |

## 2. Nguyên tắc nghiệp vụ

\- Màn hình chỉ mở được với hồ sơ giấy có Nguồn tiếp nhận là "Cán bộ nhập liệu", Loại yêu cầu thuộc nhóm Phiếu đăng ký và trạng thái hồ sơ là "Chờ giải quyết" hoặc "Bị trả lại".

\- Hồ sơ giấy phải có trạng thái lệ phí là "Đã thu" hoặc "Miễn phí" trước khi Cán bộ giải quyết nhập liệu nghiệp vụ theo [BR-UCPS-001] và [BR-UCPS-006].

\- Khối **I. Thông tin tiếp nhận và thu phí** luôn hiển thị đầu màn hình, mặc định thu gọn, cho phép mở rộng. Toàn bộ dữ liệu trong khối này chỉ đọc, không cho phép chỉnh sửa.

\- Chi tiết nghiệp vụ Phiếu đăng ký không viết lại trong tài liệu này. Hệ thống sử dụng lại đúng cấu trúc form, trường dữ liệu, điều kiện hiển thị, điều kiện bắt buộc, bảng con, popup, quy tắc kiểm tra và thông báo lỗi của form Website khách hàng tương ứng tại mục 4.

\- Website quản trị không mở lại màn hình Website khách hàng, không nhúng iframe Website khách hàng và không yêu cầu Cán bộ đi qua màn tra cứu tách riêng như luồng Khách hàng.

\- Với "Đăng ký lần đầu", hệ thống hiển thị ngay form nhập liệu tương ứng với UC024.

\- Với "Đăng ký thay đổi", "Xóa đăng ký" và "Thông báo xử lý tài sản bảo đảm lần đầu", hệ thống hiển thị khối nhập **Số đăng ký lần đầu** ngay trên cùng màn nhập liệu. Cán bộ bấm "Tra cứu", hệ thống kiểm tra theo [BR-DK-036] và tự động điền sẵn dữ liệu hồ sơ gốc vào form nhập liệu tương ứng.

\- Với "Thay đổi thông báo xử lý tài sản bảo đảm" và "Xóa đăng ký thông báo xử lý tài sản bảo đảm", hệ thống hiển thị khối nhập **Số đăng ký thông báo xử lý gốc** ngay trên cùng màn nhập liệu. Cán bộ bấm "Tra cứu", hệ thống kiểm tra theo [BR-DK-036] và tự động điền sẵn dữ liệu thông báo gốc/thông báo gần nhất đang có hiệu lực vào form nhập liệu tương ứng.

\- Màn hình nhập liệu không có "Lưu nháp", không có thanh toán, không có tiếp tục thanh toán và không có nút gửi đăng ký dành cho Khách hàng.

\- Cán bộ phải chuyển sang màn hình Review trước khi thực hiện "Duyệt chờ ký" hoặc "Trình ký".

\- Hồ sơ giấy không đi qua cổng thanh toán trực tuyến trong màn hình này, vì nghĩa vụ thu phí/miễn phí đã được xử lý tại UCPS013.

## 3. Danh sách màn hình

| Mã màn hình | Tên màn hình | Mục đích |
| :--- | :--- | :--- |
| UC-DK-GIAY.MH01 | Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký | Hiển thị thông tin tiếp nhận/thu phí, tra cứu hồ sơ tham chiếu nếu cần và nhập dữ liệu nghiệp vụ theo Loại yêu cầu. |
| UC-DK-GIAY.MH02 | Màn hình Xem trước hồ sơ giấy Phiếu đăng ký | Hiển thị dữ liệu nhập liệu ở trạng thái chỉ đọc, theo đúng màn Review Website khách hàng tương ứng; cho phép quay lại chỉnh sửa, duyệt chờ ký hoặc trình ký. |
| UC-DK-GIAY.MH03 | Popup Trình ký Phiếu đăng ký hồ sơ giấy | Sinh/xem file PDF dự thảo, chọn Lãnh đạo ký và xác nhận trình ký. |

## 4. Tham chiếu form Website khách hàng theo Loại yêu cầu

| Loại yêu cầu hồ sơ giấy | Form nhập liệu Website khách hàng được tái sử dụng | Form Review Website khách hàng được tái sử dụng | Ghi chú áp dụng trên Website quản trị |
| :--- | :--- | :--- | :--- |
| "Đăng ký lần đầu" | [UC024.MH01 - Màn hình Nhập liệu Đăng ký mới BPBĐ](../../01_Website_Khach_hang/UC024_Dang_ky_moi_BPBD_Ver2.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd) | [UC024.MH02 - Màn hình Xem trước (Review)](../../01_Website_Khach_hang/UC024_Dang_ky_moi_BPBD_Ver2.md#4113-uc024mh02---man-hinh-xem-truoc-review) | Không hiển thị khối tra cứu hồ sơ gốc. |
| "Đăng ký thay đổi" | [UC0025.MH02 - Màn hình Nhập thông tin đăng ký thay đổi](../../01_Website_Khach_hang/UC025_Dang_ky_thay_doi_BPBD.md#4123-uc0025mh02---man-hinh-nhap-thong-tin-dang-ky-thay-doi) | [UC0025.MH03 - Màn hình Xem trước (Review)](../../01_Website_Khach_hang/UC025_Dang_ky_thay_doi_BPBD.md#4124-uc0025mh03---man-hinh-xem-truoc-review) | Trước form nhập liệu hiển thị khối tra cứu Số đăng ký lần đầu. Tra cứu hợp lệ thì tự điền dữ liệu theo hồ sơ gốc/đăng ký thay đổi gần nhất. |
| "Xóa đăng ký" | [UC026.MH02 - Màn hình Nhập thông tin xóa đăng ký](../../01_Website_Khach_hang/UC026_Xoa_dang_ky_BPBD_Ver2.md#4133-uc026mh02---man-hinh-nhap-thong-tin-xoa-dang-ky) | [UC026.MH03 - Màn hình Xem trước (Review)](../../01_Website_Khach_hang/UC026_Xoa_dang_ky_BPBD_Ver2.md#4134-uc026mh03---man-hinh-xem-truoc-review) | Trước form nhập liệu hiển thị khối tra cứu Số đăng ký lần đầu. Tra cứu hợp lệ thì tự điền dữ liệu theo hồ sơ gốc/đăng ký thay đổi gần nhất. |
| "Thông báo xử lý tài sản bảo đảm lần đầu" | [UC131.1.MH02 - Màn hình Nhập thông tin đăng ký thông báo xử lý lần đầu](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41531-uc1311mh02---man-hinh-nhap-thong-tin-dang-ky-thong-bao-xu-ly-lan-dau) | [UC131.1.MH03 - Màn hình Xem trước (Review) đăng ký lần đầu](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41534-uc1311mh03---man-hinh-xem-truoc-review-dang-ky-lan-dau) | Trước form nhập liệu hiển thị khối tra cứu Số đăng ký lần đầu. Tra cứu hợp lệ thì tự điền dữ liệu hồ sơ gốc và danh sách tài sản bảo đảm để Cán bộ chọn tài sản xử lý. |
| "Thay đổi thông báo xử lý tài sản bảo đảm" | [UC131.2.MH02 - Màn hình Nhập thông tin thay đổi thông báo xử lý](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41541-uc1312mh02---man-hinh-nhap-thong-tin-thay-doi-thong-bao-xu-ly) | [UC131.2.MH03 - Màn hình Xem trước (Review) thay đổi thông báo xử lý](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41544-uc1312mh03---man-hinh-xem-truoc-review-thay-doi-thong-bao-xu-ly) | Trước form nhập liệu hiển thị khối tra cứu Số đăng ký thông báo xử lý gốc/thông báo gần nhất. Tra cứu hợp lệ thì tự điền dữ liệu thông báo đang có hiệu lực. |
| "Xóa đăng ký thông báo xử lý tài sản bảo đảm" | [UC131.3.MH02 - Màn hình Nhập thông tin xóa thông báo xử lý](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41551-uc1313mh02---man-hinh-nhap-thong-tin-xoa-thong-bao-xu-ly) | [UC131.3.MH03 - Màn hình Xem trước (Review) xóa thông báo xử lý](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41554-uc1313mh03---man-hinh-xem-truoc-review-xoa-thong-bao-xu-ly) | Trước form nhập liệu hiển thị khối tra cứu Số đăng ký thông báo xử lý gốc/thông báo gần nhất. Tra cứu hợp lệ thì tự điền dữ liệu thông báo đang có hiệu lực và danh sách tài sản đang xử lý. |

## 5. UC-DK-GIAY.MH01 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký

### 5.1. Màn hình

![Nhập liệu hồ sơ giấy Phiếu đăng ký](images/UC_DK_GIAY_MH01_Nhap_lieu_ho_so_giay_Phieu_dang_ky.png)

### 5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin tiếp nhận và thu phí** | | | | |
| Khối Thông tin tiếp nhận và thu phí | Text(1000) | Có | Thu gọn | Mặc định thu gọn, cho phép mở rộng. Toàn bộ dữ liệu chỉ đọc. |
| Mã hồ sơ | String(50) | Có | Theo UCPS012 | Chỉ đọc. Mã hồ sơ giấy do hệ thống sinh khi tiếp nhận. |
| Số đơn giấy | String(50) | Có | Theo UCPS012 | Chỉ đọc. Số đơn giấy/số tiếp nhận từ hồ sơ giấy. |
| Nguồn tiếp nhận | Enum(String(50)) | Có | "Cán bộ nhập liệu" | Chỉ đọc. |
| Kênh tiếp nhận | Enum(String(50)) | Có | Theo UCPS012 | Chỉ đọc. Hiển thị kênh tiếp nhận đã ghi nhận tại UCPS012. |
| Thời điểm tiếp nhận | Datetime | Có | Theo UCPS012 | Chỉ đọc. |
| Đơn vị tiếp nhận | String(255) | Có | Theo UCPS012 | Chỉ đọc. |
| Cán bộ tiếp nhận | String(255) | Có | Theo UCPS012 | Chỉ đọc. |
| Người yêu cầu | String(255) | Có | Theo UCPS012 | Chỉ đọc. |
| Người nộp hồ sơ | String(255) | Không | Theo UCPS012 | Chỉ đọc. |
| Loại yêu cầu | Enum(String(100)) | Có | Theo UCPS012 | Chỉ đọc. Giá trị thuộc nhóm Phiếu đăng ký tại mục 1.2. |
| Mã khoản phải thu | String(50) | Có | Theo UCPS013 | Chỉ đọc. |
| Trạng thái lệ phí | Enum(String(50)) | Có | Theo UCPS013 | - Chỉ đọc.<br>- Chỉ cho phép nhập liệu khi giá trị là:<br>+ "Đã thu"<br>+ "Miễn phí" |
| Số tiền đã thu | Decimal(18,0) | Có | Theo UCPS013 | Chỉ đọc. |
| Số biên lai/chứng từ | String(50) | Không | Theo UCPS013 | Chỉ đọc. |
| Tài liệu tiếp nhận | File | Không | Theo UCPS012 | - Chỉ đọc.<br>- Cho phép xem file tại một tab riêng.<br>- Cho phép tải xuống theo quyền. |
| **II. Thông tin trả lại** | | | | |
| Khối Thông tin trả lại | Text(1000) | Không | Ẩn | Chỉ hiển thị khi hồ sơ đang ở trạng thái "Bị trả lại". |
| Lý do trả lại gần nhất | Text(2000) | Có | Theo hồ sơ | Chỉ đọc. |
| Lãnh đạo trả lại | String(255) | Có | Theo hồ sơ | Chỉ đọc. |
| Thời điểm trả lại | Datetime | Có | Theo hồ sơ | Chỉ đọc. |
| **III. Tra cứu hồ sơ tham chiếu** | | | | |
| Khối Tra cứu hồ sơ tham chiếu | Text(1000) | Tùy điều kiện | Ẩn | - Chỉ hiển thị khi Loại yêu cầu là:<br>+ "Đăng ký thay đổi"<br>+ "Xóa đăng ký"<br>+ "Thông báo xử lý tài sản bảo đảm lần đầu"<br>+ "Thay đổi thông báo xử lý tài sản bảo đảm"<br>+ "Xóa đăng ký thông báo xử lý tài sản bảo đảm" |
| Số đăng ký lần đầu | String(50) | Tùy điều kiện | Trống hoặc theo phiên bản trước | - Chỉ hiển thị và bắt buộc khi Loại yêu cầu là:<br>+ "Đăng ký thay đổi"<br>+ "Xóa đăng ký"<br>+ "Thông báo xử lý tài sản bảo đảm lần đầu"<br>+ Cán bộ nhập theo hồ sơ giấy.<br>- Hệ thống không yêu cầu nhập PIN.<br>- Tự động trim space theo [BR-VAL-001]. |
| Số đăng ký thông báo xử lý gốc | String(50) | Tùy điều kiện | Trống hoặc theo phiên bản trước | - Chỉ hiển thị và bắt buộc khi Loại yêu cầu là:<br>+ "Thay đổi thông báo xử lý tài sản bảo đảm"<br>+ "Xóa đăng ký thông báo xử lý tài sản bảo đảm"<br>+ Cán bộ nhập một trong các giá trị:<br>+ Số đăng ký thông báo xử lý gốc.<br>+ Số đăng ký thông báo gần nhất đang có hiệu lực.<br>- Hệ thống không yêu cầu nhập PIN.<br>- Tự động trim space theo [BR-VAL-001]. |
| Kết quả tra cứu hồ sơ tham chiếu | Text(2000) | Không | Ẩn | - Chỉ hiển thị sau khi bấm "Tra cứu".<br>- Nếu hợp lệ, hiển thị tóm tắt hồ sơ tham chiếu gồm:<br>+ Số đăng ký.<br>+ Loại đăng ký.<br>+ Thời điểm đăng ký.<br>+ Bên bảo đảm.<br>+ Bên nhận bảo đảm.<br>+ Trạng thái.<br>+ Cơ quan tiếp nhận.<br>+ Toàn bộ dữ liệu chỉ đọc.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| **IV. Chi tiết hồ sơ Phiếu đăng ký** | | | | |
| Khối Chi tiết hồ sơ Phiếu đăng ký | Text(4000) | Có | Theo Loại yêu cầu | - Hiển thị form nhập liệu nghiệp vụ tương ứng tại mục 4.<br>- Không viết lại chi tiết trường/cột trong tài liệu này. |
| Đăng ký lần đầu | Text(4000) | Tùy điều kiện | Theo Loại yêu cầu | - Khi Loại yêu cầu là "Đăng ký lần đầu", hiển thị giống form nhập liệu [UC024.MH01](../../01_Website_Khach_hang/UC024_Dang_ky_moi_BPBD_Ver2.md#4112-uc024mh01---man-hinh-nhap-lieu-dang-ky-moi-bpbd).<br>- Chỉ hiển thị các nút/thao tác dành cho Cán bộ trên Website quản trị. |
| Đăng ký thay đổi | Text(4000) | Tùy điều kiện | Sau tra cứu hợp lệ | - Khi Loại yêu cầu là "Đăng ký thay đổi", sau khi tra cứu Số đăng ký lần đầu hợp lệ, hiển thị giống form nhập liệu [UC0025.MH02](../../01_Website_Khach_hang/UC025_Dang_ky_thay_doi_BPBD.md#4123-uc0025mh02---man-hinh-nhap-thong-tin-dang-ky-thay-doi).<br>- Dữ liệu hồ sơ gốc/đăng ký thay đổi gần nhất được tự động điền vào form. |
| Xóa đăng ký | Text(4000) | Tùy điều kiện | Sau tra cứu hợp lệ | - Khi Loại yêu cầu là "Xóa đăng ký", sau khi tra cứu Số đăng ký lần đầu hợp lệ, hiển thị giống form nhập liệu [UC026.MH02](../../01_Website_Khach_hang/UC026_Xoa_dang_ky_BPBD_Ver2.md#4133-uc026mh02---man-hinh-nhap-thong-tin-xoa-dang-ky).<br>- Dữ liệu hồ sơ gốc/đăng ký thay đổi gần nhất được tự động điền vào form. |
| Thông báo xử lý tài sản bảo đảm lần đầu | Text(4000) | Tùy điều kiện | Sau tra cứu hợp lệ | - Khi Loại yêu cầu là "Thông báo xử lý tài sản bảo đảm lần đầu", sau khi tra cứu Số đăng ký lần đầu hợp lệ, hiển thị giống form nhập liệu [UC131.1.MH02](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41531-uc1311mh02---man-hinh-nhap-thong-tin-dang-ky-thong-bao-xu-ly-lan-dau).<br>- Dữ liệu hồ sơ gốc được tự động điền vào form.<br>- Danh sách tài sản bảo đảm được tự động điền để Cán bộ tích chọn tài sản xử lý. |
| Thay đổi thông báo xử lý tài sản bảo đảm | Text(4000) | Tùy điều kiện | Sau tra cứu hợp lệ | - Khi Loại yêu cầu là "Thay đổi thông báo xử lý tài sản bảo đảm", sau khi tra cứu Số đăng ký thông báo xử lý gốc hợp lệ, hiển thị giống form nhập liệu [UC131.2.MH02](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41541-uc1312mh02---man-hinh-nhap-thong-tin-thay-doi-thong-bao-xu-ly).<br>- Dữ liệu thông báo đang có hiệu lực được tự động điền vào form. |
| Xóa đăng ký thông báo xử lý tài sản bảo đảm | Text(4000) | Tùy điều kiện | Sau tra cứu hợp lệ | - Khi Loại yêu cầu là "Xóa đăng ký thông báo xử lý tài sản bảo đảm", sau khi tra cứu Số đăng ký thông báo xử lý gốc hợp lệ, hiển thị giống form nhập liệu [UC131.3.MH02](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41551-uc1313mh02---man-hinh-nhap-thong-tin-xoa-thong-bao-xu-ly).<br>- Dữ liệu thông báo đang có hiệu lực được tự động điền vào form.<br>- Danh sách tài sản đang xử lý được tự động điền vào form. |

### 5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tra cứu | Nút | Chỉ hiển thị trong Khối III khi Loại yêu cầu cần hồ sơ tham chiếu theo [BR-DK-036].<br>- **TH Không có dữ liệu trả về**:<br>+ Bảng kết quả: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].<br>+ Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`&#124;&lt;&lt;`, `&lt;`, các số trang, `&gt;`, `&gt;&gt;&#124;`) ở trạng thái ẩn hoặc khóa mờ (Disabled).<br>+ Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*. |
|  |  |  | TH1 (Bỏ trống số đăng ký tham chiếu): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001] dạng Inline dưới ô nhập tương ứng, không thực hiện tra cứu. |
|  |  |  | TH2 (Không tìm thấy hồ sơ theo số đăng ký đã nhập): Vi phạm [BR-DK-036], hiển thị [MSG-ERR-DK-014] dạng Inline tại Khối III, không hiển thị form nhập liệu chi tiết phụ thuộc hồ sơ tham chiếu. |
|  |  |  | TH3 (Hồ sơ tham chiếu chưa ở trạng thái "Hoàn thành"): Vi phạm [BR-DK-020], hiển thị [MSG-ERR-DK-002], không tự điền dữ liệu vào form. |
|  |  |  | TH4 (Hồ sơ tham chiếu bị ngăn chặn/tạm dừng giao dịch): Vi phạm [BR-DK-021], hiển thị [MSG-ERR-DK-003], không tự điền dữ liệu vào form. |
|  |  |  | TH5 (Tồn tại hồ sơ liên quan đang xử lý): Vi phạm [BR-DK-022], hiển thị [MSG-ERR-DK-004], không tự điền dữ liệu vào form. |
|  |  |  | TH6 (Không thỏa điều kiện loại thông báo xử lý tài sản): Vi phạm [BR-DK-023], hiển thị [MSG-ERR-DK-006] hoặc [MSG-ERR-DK-007] theo tình huống, không tự điền dữ liệu vào form. |
|  |  |  | TH Hợp lệ: Hệ thống hiển thị tóm tắt Kết quả tra cứu hồ sơ tham chiếu, tự động điền dữ liệu hồ sơ gốc/thông báo gốc vào Khối IV và focus vào trường nhập liệu đầu tiên cần Cán bộ bổ sung. |
| 2 | Xem trước | Nút | TH1 (Dữ liệu chưa hợp lệ): Hệ thống kiểm tra theo form Website khách hàng tương ứng tại mục 4; nếu vi phạm, hiển thị lỗi tại trường/khối tương ứng theo Business Rule và MessageList đã được tham chiếu trong tài liệu nguồn, không mở màn Review. |
|  |  |  | TH2 (Loại yêu cầu cần hồ sơ tham chiếu nhưng chưa tra cứu thành công hoặc dữ liệu tham chiếu đã hết hiệu lực khi kiểm tra lại): Vi phạm [BR-DK-036], hiển thị [MSG-ERR-DK-014], [MSG-ERR-DK-002], [MSG-ERR-DK-003] hoặc [MSG-ERR-DK-004] theo tình huống, không mở màn Review. |
|  |  |  | TH Hợp lệ: Mở **6. UC-DK-GIAY.MH02 - Màn hình Xem trước hồ sơ giấy Phiếu đăng ký**. Hồ sơ vẫn giữ trạng thái "Chờ giải quyết" hoặc "Bị trả lại", chưa chuyển trạng thái. |
| 3 | Hủy bỏ | Nút | Đóng màn hình nhập liệu và quay về màn hình nguồn đã mở hồ sơ. Nếu có dữ liệu thay đổi chưa được xác nhận, hệ thống yêu cầu xác nhận trước khi rời màn hình. |

## 6. UC-DK-GIAY.MH02 - Màn hình Xem trước hồ sơ giấy Phiếu đăng ký

### 6.1. Màn hình

![Xem trước hồ sơ giấy Phiếu đăng ký](images/UC_DK_GIAY_MH02_Xem_truoc_ho_so_giay_Phieu_dang_ky.png)

### 6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Xem trước chi tiết Phiếu đăng ký** | | | | |
| Khối Xem trước chi tiết Phiếu đăng ký | Text(4000) | Có | Theo Loại yêu cầu | - Hiển thị đúng form Review Website khách hàng tương ứng tại mục 4.<br>- Toàn bộ dữ liệu ở trạng thái chỉ đọc.<br>- Chỉ hiển thị các nút/thao tác dành cho Cán bộ trên Website quản trị. |
| Đăng ký lần đầu | Text(4000) | Tùy điều kiện | Theo Loại yêu cầu | Khi Loại yêu cầu là "Đăng ký lần đầu", hiển thị giống [UC024.MH02 - Màn hình Xem trước (Review)](../../01_Website_Khach_hang/UC024_Dang_ky_moi_BPBD_Ver2.md#4113-uc024mh02---man-hinh-xem-truoc-review). |
| Đăng ký thay đổi | Text(4000) | Tùy điều kiện | Theo Loại yêu cầu | Khi Loại yêu cầu là "Đăng ký thay đổi", hiển thị giống [UC0025.MH03 - Màn hình Xem trước (Review)](../../01_Website_Khach_hang/UC025_Dang_ky_thay_doi_BPBD.md#4124-uc0025mh03---man-hinh-xem-truoc-review). |
| Xóa đăng ký | Text(4000) | Tùy điều kiện | Theo Loại yêu cầu | Khi Loại yêu cầu là "Xóa đăng ký", hiển thị giống [UC026.MH03 - Màn hình Xem trước (Review)](../../01_Website_Khach_hang/UC026_Xoa_dang_ky_BPBD_Ver2.md#4134-uc026mh03---man-hinh-xem-truoc-review). |
| Thông báo xử lý tài sản bảo đảm lần đầu | Text(4000) | Tùy điều kiện | Theo Loại yêu cầu | Khi Loại yêu cầu là "Thông báo xử lý tài sản bảo đảm lần đầu", hiển thị giống [UC131.1.MH03 - Màn hình Xem trước (Review) đăng ký lần đầu](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41534-uc1311mh03---man-hinh-xem-truoc-review-dang-ky-lan-dau). |
| Thay đổi thông báo xử lý tài sản bảo đảm | Text(4000) | Tùy điều kiện | Theo Loại yêu cầu | Khi Loại yêu cầu là "Thay đổi thông báo xử lý tài sản bảo đảm", hiển thị giống [UC131.2.MH03 - Màn hình Xem trước (Review) thay đổi thông báo xử lý](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41544-uc1312mh03---man-hinh-xem-truoc-review-thay-doi-thong-bao-xu-ly). |
| Xóa đăng ký thông báo xử lý tài sản bảo đảm | Text(4000) | Tùy điều kiện | Theo Loại yêu cầu | Khi Loại yêu cầu là "Xóa đăng ký thông báo xử lý tài sản bảo đảm", hiển thị giống [UC131.3.MH03 - Màn hình Xem trước (Review) xóa thông báo xử lý](../../01_Website_Khach_hang/UC131_Dang_ky_Thay_doi_Xoa_thong_bao_xu_ly_tai_san.md#41554-uc1313mh03---man-hinh-xem-truoc-review-xoa-thong-bao-xu-ly). |

### 6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | Quay về **5. UC-DK-GIAY.MH01 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký** và giữ nguyên toàn bộ dữ liệu Cán bộ đã nhập. |
| 2 | Duyệt chờ ký | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ giải quyết" hoặc "Bị trả lại" và Cán bộ có quyền duyệt chờ ký Phiếu đăng ký theo [BR-DK-026]. |
|  |  |  | TH1 (Dữ liệu không hợp lệ hoặc dữ liệu tham chiếu không còn đáp ứng điều kiện tại thời điểm duyệt): Hệ thống kiểm tra lại theo form Website khách hàng tương ứng tại mục 4 và [BR-DK-036]; nếu vi phạm, hiển thị lỗi theo Business Rule/MessageList tương ứng, không chuyển trạng thái. |
|  |  |  | TH2 (Phát hiện hồ sơ trùng lặp đối với "Đăng ký lần đầu" hoặc "Đăng ký thay đổi"): Hệ thống kiểm tra theo [BR-DK-029]; nếu có cảnh báo trùng lặp, hiển thị [MSG-CFM-DK-010] để Cán bộ chọn tiếp tục hoặc hủy thao tác. |
|  |  |  | TH Hợp lệ: Hệ thống lưu dữ liệu nghiệp vụ, khóa phiên bản dữ liệu đã duyệt, ghi nhận Cán bộ duyệt, thời điểm duyệt, trạng thái trước/sau, lịch sử xử lý và chuyển hồ sơ sang "Duyệt chờ ký"; hiển thị [MSG-SUC-DK-KT-001]. |
| 3 | Trình ký | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ giải quyết", "Bị trả lại" hoặc "Duyệt chờ ký" và Cán bộ có quyền trình ký Phiếu đăng ký theo [BR-DK-026]. |
|  |  |  | TH1 (Dữ liệu không hợp lệ hoặc dữ liệu tham chiếu không còn đáp ứng điều kiện tại thời điểm trình ký): Hệ thống kiểm tra lại theo form Website khách hàng tương ứng tại mục 4 và [BR-DK-036]; nếu vi phạm, hiển thị lỗi theo Business Rule/MessageList tương ứng, không sinh PDF và không mở popup trình ký. |
|  |  |  | TH2 (Không sinh được file PDF dự thảo Văn bản chứng nhận/Thông báo kết quả): Hệ thống hiển thị lỗi workflow theo cấu hình MessageList, không chuyển trạng thái và ghi nhận lỗi vào Audit log. |
|  |  |  | TH Hợp lệ: Hệ thống lưu dữ liệu nghiệp vụ, sinh file PDF dự thảo theo **4.3.2.3.6. Quy tắc sinh file PDF dự thảo Văn bản chứng nhận theo Mẫu số 05d** tại [SRS_Xu_ly_Phieu_dang_ky_Can_bo](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43236-quy-tac-sinh-file-pdf-du-thao-van-ban-chung-nhan-theo-mau-so-05d), sau đó mở **7. UC-DK-GIAY.MH03 - Popup Trình ký Phiếu đăng ký hồ sơ giấy**. |
| 4 | Hủy bỏ | Nút | Đóng màn hình Review và quay về màn hình nguồn đã mở hồ sơ. Nếu có dữ liệu thay đổi chưa được xác nhận, hệ thống yêu cầu xác nhận trước khi rời màn hình. |

## 7. UC-DK-GIAY.MH03 - Popup Trình ký Phiếu đăng ký hồ sơ giấy

### 7.1. Màn hình

![Popup Trình ký Phiếu đăng ký hồ sơ giấy](images/UC_DK_GIAY_MH03_Popup_trinh_ky_Phieu_dang_ky_ho_so_giay.png)

### 7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. |
| Số đơn giấy | String(50) | Có | Theo UCPS012 | Chỉ đọc. |
| Loại yêu cầu | Enum(String(100)) | Có | Theo hồ sơ | Chỉ đọc. Thuộc nhóm Phiếu đăng ký tại mục 1.2. |
| Người yêu cầu | String(255) | Có | Theo hồ sơ | Chỉ đọc. |
| Trạng thái hồ sơ | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị trạng thái tại thời điểm mở popup. |
| File PDF dự thảo | File | Có | Theo hệ thống sinh | Chỉ đọc. File PDF dự thảo Văn bản chứng nhận/Thông báo kết quả được sinh theo đúng Mẫu số 05d và quy tắc mapping tại [SRS_Xu_ly_Phieu_dang_ky_Can_bo](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43236-quy-tac-sinh-file-pdf-du-thao-van-ban-chung-nhan-theo-mau-so-05d). Cho phép xem file tại một tab riêng. |
| Lãnh đạo ký | Enum(String(255)) | Có | Trống | - Combobox có ô tìm kiếm.<br>- Bắt buộc chọn trước khi xác nhận trình ký.<br>- Hiển thị thông tin Lãnh đạo được phép ký của đơn vị tại Cấu hình thông tin về người ký.<br>- Cho phép tìm kiếm gần đúng theo tên Lãnh đạo, chức danh hoặc đơn vị.<br>- Chỉ hiển thị Lãnh đạo còn hiệu lực, thuộc đơn vị/phạm vi thẩm quyền ký hồ sơ Phiếu đăng ký được chọn. |
| Ghi chú trình ký | Text(1000) | Không | Trống | Ghi chú nội bộ của Cán bộ nếu cần. |

### 7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy | Nút | Đóng popup, giữ nguyên trạng thái hồ sơ và quay lại **6. UC-DK-GIAY.MH02 - Màn hình Xem trước hồ sơ giấy Phiếu đăng ký**. |
| 2 | Xác nhận trình ký | Nút | TH1 (Chưa chọn Lãnh đạo ký hoặc Lãnh đạo ký đã chọn không còn hiệu lực/không có thẩm quyền tại thời điểm xác nhận): Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001], không trình ký. |
|  |  |  | TH2 (Hồ sơ không còn ở trạng thái cho phép trình ký): Vi phạm [BR-DK-026], hiển thị [MSG-ERR-DK-005], không trình ký. |
|  |  |  | TH3 (Không có file PDF dự thảo hợp lệ): Hiển thị [MSG-ERR-DK-010], không chuyển trạng thái và ghi nhận lỗi vào Audit log. |
|  |  |  | TH Hợp lệ: Hệ thống khóa phiên bản dữ liệu hồ sơ và phiên bản file PDF dự thảo được trình ký; ghi nhận Cán bộ trình ký, thời điểm trình ký, Lãnh đạo ký đã chọn, trạng thái trước/sau; chuyển hồ sơ sang "Chờ ký"; chuyển hồ sơ vào danh sách ký duyệt của đúng Lãnh đạo ký đã chọn; ghi lịch sử xử lý và Audit log; hiển thị [MSG-SUC-DK-KT-002]. |

## 8. Trạng thái và chuyển trạng thái

| Đối tượng | Trạng thái trước | Sự kiện | Điều kiện | Trạng thái sau | Hệ thống thực hiện |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Hồ sơ giấy Phiếu đăng ký | "Chờ thu phí" | Kế toán xác nhận thu phí/miễn phí tại UCPS013 | Khoản phải thu chuyển "Đã thu" hoặc "Miễn phí" | "Chờ giải quyết" | Chuyển hồ sơ sang phạm vi nhập liệu của Cán bộ giải quyết theo [BR-UCPS-001]. |
| Hồ sơ giấy Phiếu đăng ký | "Chờ giải quyết"/"Bị trả lại" | Cán bộ mở màn hình nhập liệu | Hồ sơ thuộc nhóm Phiếu đăng ký, đúng quyền xử lý | Giữ nguyên | Hiển thị **5. UC-DK-GIAY.MH01 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký**. |
| Hồ sơ giấy Phiếu đăng ký | "Chờ giải quyết"/"Bị trả lại" | Tra cứu hồ sơ tham chiếu | Số đăng ký tham chiếu hợp lệ theo [BR-DK-036] | Giữ nguyên | Tự động điền dữ liệu hồ sơ tham chiếu vào form nhập liệu tương ứng. |
| Hồ sơ giấy Phiếu đăng ký | "Chờ giải quyết"/"Bị trả lại" | Xem trước | Dữ liệu hợp lệ theo form Website khách hàng tương ứng | Giữ nguyên | Mở màn Review để Cán bộ đối chiếu trước khi duyệt/trình. |
| Hồ sơ giấy Phiếu đăng ký | "Chờ giải quyết"/"Bị trả lại" | Duyệt chờ ký | Dữ liệu hợp lệ, Cán bộ có quyền duyệt | "Duyệt chờ ký" | Lưu và khóa phiên bản dữ liệu đã duyệt, ghi nhận Cán bộ duyệt. |
| Hồ sơ giấy Phiếu đăng ký | "Chờ giải quyết"/"Bị trả lại"/"Duyệt chờ ký" | Trình ký | Dữ liệu hợp lệ, đã sinh PDF dự thảo và đã chọn Lãnh đạo ký | "Chờ ký" | Khóa phiên bản dữ liệu/PDF được trình, chuyển đến đúng Lãnh đạo ký. |
| Hồ sơ giấy Phiếu đăng ký | "Chờ ký" | Lãnh đạo ký số thành công | USB Token/chứng thư số hợp lệ theo [BR-DK-034] | "Hoàn thành" | Lưu file PDF đã ký và lịch sử xử lý tại [SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao](SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao.md). |
| Hồ sơ giấy Phiếu đăng ký | "Chờ ký" | Lãnh đạo trả lại | Có lý do trả lại hợp lệ theo [BR-DK-035] | "Bị trả lại" | Mở quyền cập nhật trên màn nhập liệu hồ sơ giấy để Cán bộ sửa và trình lại. |
| Hồ sơ giấy Phiếu đăng ký | "Chờ ký" | Lãnh đạo từ chối | Có lý do từ chối hợp lệ | "Bị từ chối" | Lưu lý do từ chối, file dự thảo/phiên bản dữ liệu và lịch sử xử lý. |

## 9. Ánh xạ Business Rule và MessageList

| Tình huống | Business Rule | MessageList | Ghi chú |
| :--- | :--- | :--- | :--- |
| Hồ sơ giấy đủ điều kiện nhập liệu sau thu phí | [BR-UCPS-001], [BR-UCPS-006] | [MSG-ERR-DK-005] | Áp dụng khi mở màn hình từ hồ sơ giấy. |
| Bỏ trống trường bắt buộc | [BR-VAL-001] | [MSG-ERR-VAL-001] | Áp dụng cho các trường của khối tra cứu và form nghiệp vụ tương ứng. |
| Tra cứu hồ sơ tham chiếu | [BR-DK-036] | [MSG-ERR-DK-014], [MSG-ERR-DK-002], [MSG-ERR-DK-003], [MSG-ERR-DK-004], [MSG-ERR-DK-006], [MSG-ERR-DK-007] | Chỉ áp dụng với Loại yêu cầu cần hồ sơ gốc/thông báo gốc. |
| Đối chiếu hồ sơ gốc | [BR-DK-020], [BR-DK-021], [BR-DK-022], [BR-DK-023] | [MSG-ERR-DK-002], [MSG-ERR-DK-003], [MSG-ERR-DK-004], [MSG-ERR-DK-006], [MSG-ERR-DK-007] | Kế thừa các rule nghiệp vụ đã dùng trên Website khách hàng. |
| Kiểm tra hồ sơ trùng lặp khi duyệt | [BR-DK-029] | [MSG-CFM-DK-010] | Áp dụng cho "Đăng ký lần đầu" và "Đăng ký thay đổi". |
| Duyệt chờ ký và Trình ký Phiếu đăng ký | [BR-DK-026] | [MSG-SUC-DK-KT-001], [MSG-SUC-DK-KT-002], [MSG-ERR-DK-005], [MSG-ERR-DK-010] | Luồng sau trình ký xem tại SRS xử lý/ký duyệt Phiếu đăng ký. |
| Ký số của Lãnh đạo | [BR-DK-034] | [MSG-CFM-DK-013], [MSG-ERR-DK-011], [MSG-ERR-DK-012], [MSG-ERR-DK-013], [MSG-SUC-DK-KT-005] | Không xử lý trên màn nhập liệu; chỉ tham chiếu để xác định trạng thái sau. |
| Trả lại hồ sơ giấy cho Cán bộ sửa lại | [BR-DK-035] | [MSG-CFM-DK-014], [MSG-SUC-DK-KT-006] | Áp dụng khi Lãnh đạo trả lại tại trạng thái "Chờ ký". |

## 10. Yêu cầu nhật ký

Hệ thống ghi nhật ký đối với:

\- Mở màn hình nhập liệu hồ sơ giấy Phiếu đăng ký.
\- Mở/đóng Khối Thông tin tiếp nhận và thu phí.
\- Tra cứu hồ sơ tham chiếu.
\- Tự động điền dữ liệu hồ sơ gốc/thông báo gốc vào form nhập liệu.
\- Nhập mới/cập nhật dữ liệu nghiệp vụ Phiếu đăng ký.
\- Xem trước hồ sơ.
\- Quay lại chỉnh sửa.
\- Duyệt chờ ký.
\- Sinh file PDF dự thảo khi Trình ký.
\- Trình ký và chọn Lãnh đạo ký.
\- Hủy bỏ thao tác nhập liệu/review nếu có dữ liệu thay đổi.

Thông tin nhật ký tối thiểu gồm: Mã hồ sơ, Số đơn giấy, Nguồn tiếp nhận, Loại yêu cầu, người thao tác, vai trò, đơn vị, thời điểm, hành động, trạng thái trước, trạng thái sau, số đăng ký tham chiếu nếu có, phiên bản dữ liệu, phiên bản file PDF dự thảo nếu có và nội dung thay đổi chính.

## 11. Tiêu chí nghiệm thu

| Mã tiêu chí | Nội dung nghiệm thu |
| :--- | :--- |
| AC-DK-GIAY-001 | Tài liệu/màn hình không tạo màn danh sách riêng; màn nhập liệu được mở từ bản ghi hồ sơ giấy chờ nhập liệu/chờ giải quyết. |
| AC-DK-GIAY-002 | Khối I "Thông tin tiếp nhận và thu phí" hiển thị đầu màn hình, mặc định thu gọn, cho phép mở rộng và toàn bộ dữ liệu chỉ đọc. |
| AC-DK-GIAY-003 | Với "Đăng ký lần đầu", hệ thống hiển thị ngay form nhập liệu tương ứng UC024, không hiển thị khối tra cứu hồ sơ gốc. |
| AC-DK-GIAY-004 | Với "Đăng ký thay đổi", "Xóa đăng ký" và "Thông báo xử lý tài sản bảo đảm lần đầu", hệ thống hiển thị ô Số đăng ký lần đầu và nút "Tra cứu"; tra cứu hợp lệ thì tự điền dữ liệu hồ sơ gốc vào form. |
| AC-DK-GIAY-005 | Với "Thay đổi thông báo xử lý tài sản bảo đảm" và "Xóa đăng ký thông báo xử lý tài sản bảo đảm", hệ thống hiển thị ô Số đăng ký thông báo xử lý gốc và nút "Tra cứu"; tra cứu hợp lệ thì tự điền dữ liệu thông báo đang có hiệu lực vào form. |
| AC-DK-GIAY-006 | Màn nhập liệu Website quản trị không hiển thị hai form liên tiếp như Website khách hàng; khối tra cứu và form nhập liệu nằm trên cùng màn hình nghiệp vụ. |
| AC-DK-GIAY-007 | Khối Chi tiết hồ sơ Phiếu đăng ký sử dụng đúng form nhập liệu Website khách hàng tương ứng, không sai khác cấu trúc trường, bảng con, popup và validate nghiệp vụ. |
| AC-DK-GIAY-008 | Màn Review hiển thị đúng form Review Website khách hàng tương ứng theo từng Loại yêu cầu, toàn bộ dữ liệu ở trạng thái chỉ đọc. |
| AC-DK-GIAY-009 | Cán bộ chỉ thực hiện "Duyệt chờ ký" và "Trình ký" từ màn Review. |
| AC-DK-GIAY-010 | "Duyệt chờ ký" hợp lệ chuyển hồ sơ sang "Duyệt chờ ký". |
| AC-DK-GIAY-011 | "Trình ký" hợp lệ sinh file PDF dự thảo theo Mẫu số 05d, yêu cầu chọn Lãnh đạo ký và chuyển hồ sơ sang "Chờ ký" sau khi xác nhận trình ký. |
| AC-DK-GIAY-012 | Màn nhập liệu và Review không hiển thị "Lưu nháp", thanh toán, tiếp tục thanh toán hoặc nút gửi đăng ký dành cho Khách hàng. |
| AC-DK-GIAY-013 | Khi Lãnh đạo trả lại hồ sơ giấy ở trạng thái "Chờ ký", Cán bộ mở lại màn nhập liệu này để cập nhật theo ý kiến trả lại và trình ký lại. |
