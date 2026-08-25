## 4.1. Yêu cầu cung cấp bản sao văn bản chứng nhận - Website Khách hàng

### 4.1.X. UC149/UC195-BS - Quản lý yêu cầu đã đăng ký Yêu cầu cung cấp bản sao văn bản chứng nhận

#### 4.1.X.1. Mục đích

– Cho phép Khách hàng quản lý, xem lại các yêu cầu cung cấp bản sao văn bản chứng nhận đăng ký biện pháp bảo đảm đã đăng ký (đã gửi) trên Website Khách hàng, gồm **Danh sách yêu cầu cung cấp bản sao** và màn hình **Xem chi tiết yêu cầu cung cấp bản sao**.

– Cho phép Khách hàng theo dõi trạng thái xử lý hồ sơ từ lúc gửi yêu cầu, thanh toán nếu có nghĩa vụ phí, Cán bộ kiểm tra/xử lý, Lãnh đạo ký số/ký duyệt và nhận kết quả.

– Cho phép Khách hàng thực hiện thanh toán thông qua UC158 ngay từ Danh sách hoặc màn hình Xem chi tiết đối với hồ sơ đang ở trạng thái "Chờ thanh toán".

– Cho phép Khách hàng xem/tải file PDF bản sao văn bản chứng nhận đã được Lãnh đạo ký số khi hồ sơ ở trạng thái "Hoàn thành" (áp dụng Loại cung cấp bản sao là "Bản sao điện tử"); đồng thời xem chi tiết đầy đủ hồ sơ gốc gắn với yêu cầu khi hồ sơ ở trạng thái "Đã duyệt - chờ trả kết quả" hoặc "Hoàn thành".

*a. Phân quyền*

– Khách hàng là cá nhân/tổ chức có tài khoản hợp lệ trên Website Khách hàng.

– Khách hàng chỉ được xem, thanh toán và nhận kết quả đối với hồ sơ do chính tài khoản của mình tạo hoặc hồ sơ thuộc phạm vi được phân quyền.

*b. Điều kiện thực hiện*

– Khách hàng đã đăng nhập thành công vào Website Khách hàng.

– Tài khoản Khách hàng đang ở trạng thái được phép giao dịch.

– Hệ thống có cấu hình biểu phí cung cấp bản sao còn hiệu lực.

– Cổng thanh toán UC158 sẵn sàng tiếp nhận giao dịch tại thời điểm Khách hàng thực hiện thanh toán.

---

#### 4.1.X.2. Bộ trạng thái hồ sơ Yêu cầu cung cấp bản sao

| STT | Trạng thái | Áp dụng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | "Chờ thanh toán" | Hồ sơ thuộc diện phải thu phí | Khách hàng vừa gửi yêu cầu, đang chờ thanh toán qua UC158. |
| 2 | "Chờ duyệt" | Mọi hồ sơ Online đủ điều kiện vào xử lý | Hồ sơ đã thanh toán thành công hoặc thuộc diện miễn phí, đang chờ Cán bộ kiểm tra và xử lý. |
| 3 | "Chờ ký" | Mọi hồ sơ (áp dụng chung cho cả Loại "Bản sao điện tử" và "Bản sao giấy") | Cán bộ đã kiểm tra/kết xuất bản sao điện tử dự thảo nếu có và trình Lãnh đạo ký số/ký duyệt theo [BR-BS-013]. |
| 5 | "Đã duyệt - chờ trả kết quả" | Chỉ Loại cung cấp bản sao là "Bản sao giấy" | Lãnh đạo đã Ký duyệt tại "Chờ ký", Cán bộ đang in/sao và chuẩn bị trả bản giấy cho Khách hàng. |
| 6 | "Hoàn thành" | Mọi hồ sơ | Bản sao điện tử đã được Lãnh đạo ký số; hoặc Cán bộ đã xác nhận trả kết quả bản sao giấy. |
| 7 | "Bị từ chối" | Mọi hồ sơ | Cán bộ hoặc Lãnh đạo từ chối hồ sơ theo điều kiện nghiệp vụ. Nếu hồ sơ Online đã thanh toán, hệ thống phát sinh yêu cầu hoàn tiền để theo dõi tại Module Quản lý đối soát thanh toán. |
| 8 | "Bị trả lại" | Mọi hồ sơ | Lãnh đạo trả lại từ bước "Chờ ký" để Cán bộ xử lý lại, chưa phát sinh hoàn tiền/hoàn phí. |

---

#### 4.1.X.3. Tab "Yêu cầu cung cấp bản sao"

##### 4.1.X.3.1. Giao diện

– Đặt tại **Tab "Yêu cầu cung cấp bản sao"** trên màn hình [UCPS007.MH01](SRS_Qly_yeu_cau_da_dky_Phieu%20dang%20ky.md#41122-ucps007mh01---man-hinh-danh-sach-yeu-cau-da-dang-ky), cùng cấp với Tab "Phiếu đăng ký" (mặc định) và Tab "Yêu cầu cung cấp thông tin".

– Cấu trúc giao diện gồm hai vùng: Vùng Tìm kiếm/Lọc ở trên và Vùng kết quả hiển thị dạng lưới phẳng (Grid) ở dưới.

##### 4.1.X.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Mã hồ sơ | String(50) | Không | Trống | Tìm kiếm chính xác hoặc gần đúng theo Mã hồ sơ (`BS-[YYYYMMDD]-[TỰ_TĂNG_6_SỐ]`); tự động trim space theo [BR-VAL-001]. |
| Số đăng ký | String(50) | Không | Trống | Tìm kiếm theo Số đăng ký của hồ sơ gốc gắn với yêu cầu. |
| Loại cung cấp bản sao | Enum(String(50)) | Không | Tất cả | Lọc theo giá trị đã chọn ở [UC149.MH01](SRS_YC_cung_cap_ban_sao_van_ban_chung_nhan.md#41162-uc149mh01---man-hinh-yeu-cau-cap-ban-sao-van-ban-chung-nhan-dang-ky-bien-phap-bao-dam):<br>– Tất cả<br>– Bản sao điện tử<br>– Bản sao giấy |
| Trạng thái hồ sơ | Enum(String(50)) | Không | Tất cả | Lọc theo bộ trạng thái tại mục 4.1.X.2:<br>– Tất cả<br>– Chờ thanh toán<br>– Chờ duyệt<br>– Chờ ký<br>– Đã duyệt - chờ trả kết quả<br>– Hoàn thành<br>– Bị từ chối<br>– Bị trả lại |
| Người tạo | String(255) | Không | Trống | Tìm kiếm gần đúng theo tên người đang đăng nhập đã tạo Yêu cầu cung cấp bản sao. |
| Từ ngày | Date | Không | Trống | Lọc theo Thời điểm đăng ký. Nếu nhập cùng Đến ngày, tuân thủ [BR-VAL-007]. |
| Đến ngày | Date | Không | Trống | Lọc theo Thời điểm đăng ký. Nếu nhập cùng Từ ngày, tuân thủ [BR-VAL-007]. |
| **II. Vùng kết quả hiển thị (Grid)** | - | - | 20 bản ghi/trang | Hiển thị dạng lưới phẳng, thuộc phạm vi tài khoản Khách hàng đăng nhập. Sắp xếp mặc định theo Thời điểm đăng ký giảm dần. Click trực tiếp vào dòng dữ liệu để mở màn hình chi tiết, ngoại trừ khi click nút tại cột Thao tác.<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001].|
| STT | Integer(10) | - | - | Số thứ tự bản ghi trên trang hiện tại. |
| Mã hồ sơ | String(50) | - | - | Mã hồ sơ yêu cầu cung cấp bản sao. |
| Số đăng ký | String(50) | - | - | Số đăng ký của hồ sơ gốc gắn với yêu cầu. |
| Loại cung cấp bản sao | String(50) | - | - | Hiển thị "Bản sao điện tử" hoặc "Bản sao giấy". |
| Số lượng bản sao | Integer(10) | - | - | Chỉ hiển thị giá trị khi Loại cung cấp bản sao là "Bản sao giấy"; nếu là "Bản sao điện tử", hiển thị `"—"`. |
| Thời điểm đăng ký | Datetime | - | - | Định dạng `dd/mm/yyyy HH:mm`. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | - | Theo hồ sơ | Tiêu đề cột ghi rõ đơn vị tính `(VNĐ)`, dữ liệu từng dòng chỉ hiển thị số đã phân tách hàng nghìn, không lặp lại hậu tố `VNĐ`. Hiển thị tổng số tiền Khách hàng đã thanh toán thành công cho yêu cầu; hồ sơ đã chuyển sang trạng thái "Chờ duyệt" trở về sau (Chờ duyệt, Chờ ký, Đã duyệt - chờ trả kết quả, Hoàn thành) đồng nghĩa đã thanh toán xong (nếu thuộc diện phải thu phí) nên luôn có giá trị; chỉ hiển thị `"—"` khi hồ sơ đang ở trạng thái "Chờ thanh toán" hoặc thuộc diện miễn phí. |
| Trạng thái | String(50) | - | - | Hiển thị theo bộ trạng thái tại mục 4.1.X.2, kèm nhãn màu (badge) phân biệt trực quan. |
| Người tạo | String(255) | - | Theo hồ sơ | Hiển thị tên người đang đăng nhập đã tạo Yêu cầu cung cấp bản sao; không hiển thị account/email đăng nhập. |
| Thao tác | String(255) | - | - | – "Thanh toán": chỉ hiển thị khi Trạng thái là "Chờ thanh toán".<br>– "Tải file": chỉ hiển thị khi Trạng thái là "Hoàn thành" và Loại cung cấp bản sao là "Bản sao điện tử".<br>– Các trạng thái/loại bản sao khác không hiển thị thao tác thanh toán/tải file tại cột này. |

##### 4.1.X.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới:<br>- **TH1 (Khoảng ngày không hợp lệ)**: Nếu Từ ngày lớn hơn Đến ngày, vi phạm [BR-VAL-007], hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm.<br>- **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thuộc tài khoản Khách hàng thỏa mãn tiêu chí tìm kiếm/lọc, đưa về Trang 1.<br>- **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 yêu cầu"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled); nút "Kết xuất Excel" (nếu có) ở trạng thái khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 2 | Xóa bộ lọc | Nút | Đưa toàn bộ tiêu chí lọc về mặc định (trống hoặc "Tất cả") và tải lại lưới kết quả theo Thời điểm đăng ký giảm dần. |
| 3 | Row Click | Thao tác dòng | Mở **UCPS007.MH03-BS - Chi tiết yêu cầu cung cấp bản sao** tương ứng với yêu cầu được chọn. |
| 4 | Thanh toán | Nút | Khi click, hệ thống đóng gói thông tin thanh toán (Mã hồ sơ, Số tiền phải thu, Nội dung thanh toán, Mã đơn vị thụ hưởng, Return URL) và chuyển hướng sang cổng thanh toán trực tuyến [UC158 - Quản lý thanh toán phí](UC158_Quan_ly_thanh_toan_phi.md). |
| 5 | Tải file | Nút | Tải đúng file PDF bản sao văn bản chứng nhận đã được Lãnh đạo ký số xuống thiết bị của Khách hàng. |

---

#### 4.1.X.4. UCPS007.MH03-BS - Màn hình Chi tiết yêu cầu cung cấp bản sao

##### 4.1.X.4.1. Màn hình

Mở khi Khách hàng click vào một dòng dữ liệu tại Tab "Yêu cầu cung cấp bản sao" (mục 4.1.X.3). Toàn bộ thông tin hiển thị dưới dạng chỉ đọc; các khối thông tin xử lý/thanh toán/kết quả hiển thị theo dữ liệu phát sinh của hồ sơ. Toàn bộ các nút hành động của màn hình (Quay lại, Thanh toán, Tải file, Xem file) được bố trí thống nhất tại khu vực Header (góc trên bên phải màn hình).

##### 4.1.X.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin hồ sơ** | | | | |
| Mã hồ sơ | String(50) | Có | Theo hồ sơ | Chỉ đọc. |
| Trạng thái | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị dạng nhãn màu theo bộ trạng thái tại mục 4.1.X.2. |
| Số đăng ký | String(50) | Có | Theo hồ sơ | Chỉ đọc. Số đăng ký của hồ sơ gốc gắn với yêu cầu. |
| Cơ quan tiếp nhận | Enum(String(100)) | Có | Theo hồ sơ | Chỉ đọc. Tham chiếu Danh mục Trung tâm giao dịch bảo đảm [DM_08]. |
| Loại cung cấp bản sao | Enum(String(50)) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị "Bản sao điện tử" hoặc "Bản sao giấy". |
| Số lượng bản sao | Integer(10) | Tùy điều kiện | Theo hồ sơ | Chỉ đọc. Chỉ hiển thị khi Loại cung cấp bản sao là "Bản sao giấy". |
| Thời điểm đăng ký | Datetime | Có | Theo hồ sơ | Chỉ đọc. Định dạng `dd/mm/yyyy HH:mm`. |
| Người tạo | String(255) | Có | Theo hồ sơ | Chỉ đọc. Hiển thị tên người tạo Yêu cầu cung cấp bản sao. |
| **II. Thông tin chi tiết hồ sơ gốc** | | | | **Hiển thị khối này khi hồ sơ Yêu cầu cung cấp bản sao ở Trạng thái "Đã duyệt - chờ trả kết quả" hoặc "Hoàn thành".** Khi đó, màn hình hiển thị đầy đủ chi tiết hồ sơ gốc (hồ sơ đăng ký giao dịch bảo đảm/hợp đồng) gắn với Số đăng ký của yêu cầu này. |
| Khối thông tin chi tiết hồ sơ gốc | - | Có | Theo hồ sơ gốc | Hiển thị khi Trạng thái là "Đã duyệt - chờ trả kết quả" hoặc "Hoàn thành". Hiển thị theo đúng cấu trúc dùng chung tại [4.1.12.6.2.1. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng của tài liệu UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md](UC190_to_UC192_Tra_cuu_ho_so_theo_ma_so_su_dung_CSDL.md#cau-truc-chi-tiet-danh-sach-ho-so-dang-ky-giao-dich-bao-dam-hop-dong). Không cho phép chỉnh sửa. |
| **III. Thông tin xử lý** | | | | Hiển thị thông tin tổng quan theo tiến trình xử lý thực tế của hồ sơ; trường nào có thông tin thì hiển thị, chưa phát sinh thì để trống hoặc ẩn. |
| Thời điểm tiếp nhận | Datetime | Không | Theo hồ sơ | Chỉ hiển thị từ khi hồ sơ đã được Cán bộ tiếp nhận. |
| Thời điểm duyệt | Datetime | Không | Theo hồ sơ | Chỉ hiển thị từ khi hồ sơ đã được Cán bộ kiểm tra/xử lý. |
| Người duyệt | String(255) | Không | Theo hồ sơ | Họ và tên Cán bộ đã kiểm tra/xử lý hồ sơ. |
| Thời điểm trình ký | Datetime | Không | Theo hồ sơ | Chỉ hiển thị từ khi hồ sơ đã được Cán bộ trình Lãnh đạo ký. |
| Thời điểm ký duyệt / ký số | Datetime | Không | Theo hồ sơ | Thời điểm Lãnh đạo phê duyệt/ký số văn bản bản sao. |
| Người ký duyệt | String(255) | Không | Theo hồ sơ | Họ và tên Lãnh đạo ký duyệt/ký số. |
| Số tiền phải thanh toán | Decimal(18,0) | Không | Theo hồ sơ | Hiển thị đối với hồ sơ thuộc diện phải thu phí. |
| Số tiền đã thanh toán (VNĐ) | Decimal(18,0) | Không | Theo hồ sơ | Hiển thị số tiền đã thanh toán sau khi giao dịch thanh toán thành công. |
| Thời điểm thanh toán | Datetime | Không | Theo kết quả UC158 | Thời điểm thanh toán thành công qua cổng thanh toán. |
| Mã giao dịch thanh toán | String(100) | Không | Theo kết quả UC158 | Mã giao dịch do cổng thanh toán cấp. |
| Số biên lai | String(100) | Không | Theo hệ thống tài chính | Số biên lai thu phí điện tử (nếu có). |
| File bản sao điện tử đã ký | File | Không | Theo hồ sơ | Chỉ hiển thị link Xem file / Tải file khi Loại cung cấp bản sao là "Bản sao điện tử" và hồ sơ ở trạng thái "Hoàn thành". |
| Hướng dẫn nhận kết quả bản sao giấy | Text(500) | Không | Theo hồ sơ | Chỉ hiển thị khi Loại cung cấp bản sao là "Bản sao giấy" và hồ sơ từ trạng thái "Đã duyệt - chờ trả kết quả" trở đi. |
| Thông tin trả bản sao giấy | Text(500) | Không | Theo hồ sơ | Hiển thị khi Cán bộ đã hoàn tất xác nhận bàn giao bản sao giấy cho Khách hàng. |
| Lý do từ chối | Text(1000) | Không | Theo hồ sơ | Chỉ hiển thị khi hồ sơ ở trạng thái "Bị từ chối". |
| Thời điểm từ chối | Datetime | Không | Theo hồ sơ | Thời điểm Cán bộ/Lãnh đạo từ chối hồ sơ. |
| Người từ chối | String(255) | Không | Theo hồ sơ | Họ và tên người thực hiện từ chối hồ sơ. |

##### 4.1.X.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Quay lại | Nút | Bố trí tại Header góc trên bên phải màn hình. Khi click: Quay lại Tab "Yêu cầu cung cấp bản sao" (mục 4.1.X.3), giữ nguyên bộ lọc và trang hiện tại. |
| 2 | Thanh toán | Nút | Bố trí tại Header góc trên bên phải màn hình (hiển thị khi hồ sơ ở trạng thái "Chờ thanh toán"). Khi click: Đóng gói thông tin thanh toán và chuyển hướng sang cổng thanh toán trực tuyến [UC158 - Quản lý thanh toán phí](UC158_Quan_ly_thanh_toan_phi.md). |
| 3 | Xem file | Link/Nút | Bố trí tại Header góc trên bên phải màn hình và cạnh trường file đính kèm. Cho phép xem file PDF bản sao đã ký số tại một tab riêng. |
| 4 | Tải file | Link/Nút | Bố trí tại Header góc trên bên phải màn hình và cạnh trường file đính kèm. Tải file PDF bản sao văn bản chứng nhận đã ký số xuống thiết bị của Khách hàng. |
