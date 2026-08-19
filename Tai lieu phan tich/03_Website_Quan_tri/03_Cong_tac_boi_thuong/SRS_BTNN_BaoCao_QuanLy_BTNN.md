### 4.3.3.24. UCPS022 - Báo cáo quản lý BTNN

#### 4.3.3.24.1. Mục đích

\- Cho phép cán bộ nghiệp vụ BTNN tổng hợp, tra cứu và kết xuất các báo cáo quản lý phục vụ theo dõi tình hình yêu cầu bồi thường, giải quyết bồi thường, chi trả tiền bồi thường theo nhiều chiều quản lý.

\- Các báo cáo trong SRS này sử dụng chung bộ chỉ tiêu cốt lõi đã có từ dữ liệu vụ việc YCBT, danh mục trạng thái [DM_24], lĩnh vực phát sinh thiệt hại [DM_22], loại cơ quan báo cáo [DM_43], kỳ báo cáo [DM_44] và dữ liệu Mẫu 01/03/04 Thông tư 08 đã đặc tả tại các SRS biểu mẫu báo cáo liên quan.

\- Phần `Báo cáo tổng hợp kết quả đánh giá xếp loại` không thuộc phạm vi SRS này; chức năng đó được đặc tả riêng tại `SRS_BTNN_BaoCao_DanhGia_XepLoai.md`.

*a. Phân quyền*

\- Cán bộ nghiệp vụ BTNN: Được chọn kỳ báo cáo, tổng hợp số liệu, tra cứu bảng kết quả và kết xuất báo cáo.

\- Lãnh đạo: Được tra cứu, xem số liệu tổng hợp và kết xuất báo cáo; không chỉnh sửa số liệu.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập thành công vào Website quản trị.

\- Người dùng được phân quyền truy cập nhóm menu `Báo cáo quản lý BTNN`.

\- Dữ liệu vụ việc YCBT đã phát sinh tại các module Tiếp nhận YCBT, Giải quyết yêu cầu bồi thường, Quyết định giải quyết bồi thường, Cấp kinh phí tạm ứng/Bồi thường, Xem xét trách nhiệm hoàn trả.

\- Số tiền trên màn hình báo cáo hiển thị theo đơn vị `nghìn đồng`, hệ thống tự động quy đổi từ dữ liệu nghiệp vụ lưu theo đơn vị đồng.

---

#### 4.3.3.24.2. Bộ chỉ tiêu dùng chung

Các báo cáo từ mục 4.3.3.24.4 đến 4.3.3.24.8 dùng chung bộ chỉ tiêu sau. Từng màn chỉ thay đổi chiều nhóm dữ liệu.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Nhóm dữ liệu | String(255) | - | Theo báo cáo | Giá trị nhóm theo từng màn: thời gian, loại cơ quan báo cáo, lĩnh vực phát sinh thiệt hại, đơn vị báo cáo hoặc địa phương. |
| Số vụ thụ lý mới | Integer(10) | - | Hệ thống tính | Đếm vụ việc có ngày thụ lý nằm trong kỳ báo cáo. |
| Số vụ kỳ trước chuyển sang | Integer(10) | - | Hệ thống tính | Đếm vụ việc thụ lý trước kỳ báo cáo nhưng chưa thuộc nhóm trạng thái kết thúc tại thời điểm đầu kỳ. |
| Số vụ đang giải quyết | Integer(10) | - | Hệ thống tính | Đếm vụ việc có trạng thái thuộc nhóm đang xử lý theo [DM_24], bao gồm `Chờ thụ lý`, `Đang xác minh thiệt hại`, `Đang thương lượng`, `Chờ ban hành QĐ`, `Chờ thực thi`, `Hoãn giải quyết`, `Tạm đình chỉ giải quyết`. |
| Số vụ đã giải quyết xong | Integer(10) | - | Hệ thống tính | Đếm vụ việc đã có kết quả giải quyết cuối cùng, bao gồm `Hoàn thành` và các vụ đã có văn bản giải quyết bồi thường có hiệu lực pháp luật. |
| Số vụ đình chỉ/tạm đình chỉ | Integer(10) | - | Hệ thống tính | Đếm vụ việc có trạng thái `Tạm đình chỉ giải quyết` hoặc `Đình chỉ giải quyết` trong kỳ báo cáo. |
| Số vụ đã chi trả | Integer(10) | - | Hệ thống tính | Đếm vụ việc có phát sinh chi trả tiền bồi thường hoàn thành theo module Cấp kinh phí tạm ứng/Bồi thường. |
| Tổng tiền đã chi trả | Decimal(18,0) | - | Hệ thống tính | Tổng số tiền thực tế đã chi trả trong kỳ báo cáo, đơn vị nghìn đồng. |
| Tổng tiền còn phải chi trả | Decimal(18,0) | - | Hệ thống tính | Tổng số tiền còn phải chi trả theo quyết định/bản án có hiệu lực, đơn vị nghìn đồng. |
| Tỷ lệ giải quyết | Decimal(5,2) | - | Hệ thống tính | Công thức: `Số vụ đã giải quyết xong / (Số vụ thụ lý mới + Số vụ kỳ trước chuyển sang) * 100`. Nếu mẫu số bằng 0 thì hiển thị `0%`. |

---

#### 4.3.3.24.3. Quy tắc chung trên màn hình

##### 4.3.3.24.3.1. Khối chọn kỳ báo cáo

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Năm báo cáo | Enum(String(10)) | Có | Năm hiện tại | Hiển thị 05 năm gần nhất. |
| Loại kỳ báo cáo | Enum(String(100)) | Có | `Báo cáo năm số liệu thực tế (01/01 - 31/10)` | Tham chiếu [DM_44]. |
| Đơn vị báo cáo | Enum(String(255)) | Có | Theo đơn vị đăng nhập | Tham chiếu [DM_DON_VI]. |
| Loại cơ quan báo cáo | Enum(String(100)) | Có | `UBND cấp tỉnh` | Tham chiếu [DM_43]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Tham chiếu [DM_22]. |
| Tỉnh/TP | Enum(String(100)) | Không | `Tất cả` | Tham chiếu danh mục địa giới hành chính. |

##### 4.3.3.24.3.2. Chức năng chung

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tổng hợp số liệu | Button | Hệ thống tổng hợp dữ liệu theo kỳ báo cáo và chiều nhóm của màn hình hiện hành. Nếu không có dữ liệu phù hợp, bảng kết quả hiển thị các chỉ tiêu bằng 0. |
| 2 | Kết xuất | Button/Menu | Khi chọn `Kết xuất`, hệ thống mở menu chọn định dạng gồm `Excel`, `DOC`, `PDF`. File kết xuất lấy đúng dữ liệu đang hiển thị trên màn hình. |
| 3 | Chọn Excel | Menu item | Hệ thống kết xuất file Excel và hiển thị thông báo thành công. |
| 4 | Chọn DOC | Menu item | Hệ thống kết xuất file Word và hiển thị thông báo thành công. |
| 5 | Chọn PDF | Menu item | Hệ thống kết xuất file PDF và hiển thị thông báo thành công. |

---

#### 4.3.3.24.4. MH01 - Thống kê số lượng vụ việc YCBT theo thời gian

##### 4.3.3.24.4.1. Màn hình

![MH01 - Thống kê số lượng vụ việc YCBT theo thời gian](images/UCPS022_MH01_Thong_ke_YCBT_theo_thoi_gian.png)

##### 4.3.3.24.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Khối chọn kỳ báo cáo** | | | | Xem mục 4.3.3.24.3.1. |
| **Biểu đồ xu hướng** | Chart | - | Theo dữ liệu | Hiển thị xu hướng số vụ thụ lý mới, đang giải quyết và đã giải quyết xong theo tháng/quý/năm trong kỳ báo cáo. |
| Tháng/Quý/Năm | String(50) | - | Theo kỳ báo cáo | Nhóm dữ liệu theo kỳ thời gian. |
| Số vụ thụ lý mới | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ kỳ trước chuyển sang | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đang giải quyết | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã giải quyết xong | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đình chỉ/tạm đình chỉ | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã chi trả | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền đã chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền còn phải chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tỷ lệ giải quyết | Decimal(5,2) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |

---

#### 4.3.3.24.5. MH02 - Thống kê chi tiết vụ việc YCBT theo các cấp

##### 4.3.3.24.5.1. Màn hình

![MH02 - Thống kê chi tiết vụ việc YCBT theo các cấp](images/UCPS022_MH02_Thong_ke_YCBT_theo_cac_cap.png)

##### 4.3.3.24.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Khối chọn kỳ báo cáo** | | | | Xem mục 4.3.3.24.3.1. |
| Loại cơ quan báo cáo | Enum(String(100)) | - | Theo dữ liệu | Nhóm theo [DM_43], gồm `UBND cấp tỉnh`, `TANDTC`, `VKSNDTC`, `Bộ/cơ quan ngang Bộ`. |
| Số vụ thụ lý mới | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ kỳ trước chuyển sang | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đang giải quyết | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã giải quyết xong | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đình chỉ/tạm đình chỉ | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã chi trả | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền đã chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền còn phải chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tỷ lệ giải quyết | Decimal(5,2) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |

---

#### 4.3.3.24.6. MH03 - Thống kê chi tiết vụ việc YCBT theo phạm vi

##### 4.3.3.24.6.1. Màn hình

![MH03 - Thống kê chi tiết vụ việc YCBT theo phạm vi](images/UCPS022_MH03_Thong_ke_YCBT_theo_pham_vi.png)

##### 4.3.3.24.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Khối chọn kỳ báo cáo** | | | | Xem mục 4.3.3.24.3.1. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | - | Theo dữ liệu | Nhóm theo 06 giá trị [DM_22]. |
| Số vụ thụ lý mới | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ kỳ trước chuyển sang | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đang giải quyết | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã giải quyết xong | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đình chỉ/tạm đình chỉ | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã chi trả | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền đã chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền còn phải chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tỷ lệ giải quyết | Decimal(5,2) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |

---

#### 4.3.3.24.7. MH04 - Thống kê chi tiết vụ việc YCBT theo cơ quan

##### 4.3.3.24.7.1. Màn hình

![MH04 - Thống kê chi tiết vụ việc YCBT theo cơ quan](images/UCPS022_MH04_Thong_ke_YCBT_theo_co_quan.png)

##### 4.3.3.24.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Khối chọn kỳ báo cáo** | | | | Xem mục 4.3.3.24.3.1. |
| Đơn vị/Cơ quan | Enum(String(255)) | - | Theo dữ liệu | Nhóm theo từng đơn vị báo cáo/cơ quan giải quyết cụ thể trong [DM_DON_VI]. |
| Loại cơ quan | Enum(String(100)) | - | Theo dữ liệu | Hiển thị loại cơ quan theo [DM_43] để so sánh trong cùng bảng. |
| Tỉnh/TP | Enum(String(100)) | - | Theo dữ liệu | Hiển thị địa phương của cơ quan/đơn vị. |
| Số vụ thụ lý mới | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ kỳ trước chuyển sang | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đang giải quyết | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã giải quyết xong | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đình chỉ/tạm đình chỉ | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Số vụ đã chi trả | Integer(10) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền đã chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tổng tiền còn phải chi trả | Decimal(18,0) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |
| Tỷ lệ giải quyết | Decimal(5,2) | - | Hệ thống tính | Xem bộ chỉ tiêu dùng chung. |

---

#### 4.3.3.24.8. MH05 - Thống kê kết quả giải quyết YCBT tại địa phương

##### 4.3.3.24.8.1. Màn hình

![MH05 - Thống kê kết quả giải quyết YCBT tại địa phương](images/UCPS022_MH05_Thong_ke_ket_qua_YCBT_tai_dia_phuong.png)

##### 4.3.3.24.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Khối chọn kỳ báo cáo** | | | | Xem mục 4.3.3.24.3.1. |
| Tỉnh/TP | Enum(String(100)) | - | Theo dữ liệu | Nhóm theo từng địa phương. |
| **Bảng kết quả theo cấu trúc Mẫu số 03/BTNN** | - | - | Theo dữ liệu | Bảng kết quả phải trình bày theo đúng cấu trúc gom cột của Mẫu số 03/BTNN ban hành kèm Thông tư 08/2019/TT-BTP. Không hiển thị 25 chỉ tiêu thành một hàng tiêu đề ngang phẳng. |
| **Thụ lý vụ việc (vụ việc)** | - | - | Theo dữ liệu | Nhóm cột lớn gồm `Tổng số vụ việc thụ lý`, nhóm `Số vụ việc thụ lý mới` và nhóm `Số vụ việc kỳ trước chuyển sang`. |
| Số vụ việc thụ lý mới | - | - | Hệ thống tính | Nhóm cột con gồm: `Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm a khoản 1 Điều 52`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm b khoản 1 và khoản 2 Điều 52`, `Trong quá trình tố tụng hình sự, tố tụng hành chính`. |
| Số vụ việc kỳ trước chuyển sang | - | - | Hệ thống tính | Nhóm cột con gồm: `Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm a khoản 1 Điều 52`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm b khoản 1 và khoản 2 Điều 52`, `Trong quá trình tố tụng hình sự, tố tụng hành chính`. |
| **Tình hình giải quyết vụ việc** | - | - | Theo dữ liệu | Nhóm cột lớn gồm `Đã có văn bản giải quyết bồi thường có hiệu lực pháp luật`, `Đang giải quyết (vụ việc)` và `Đình chỉ (vụ việc)`. |
| Đã có văn bản giải quyết bồi thường có hiệu lực pháp luật | - | - | Hệ thống tính | Nhóm cột con gồm: `Tổng số vụ việc`, `Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm a khoản 1 Điều 52`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm b khoản 1 và khoản 2 Điều 52`, `Trong quá trình tố tụng hình sự, tố tụng hành chính`, `Số tiền bồi thường (nghìn đồng)`. |
| Đang giải quyết (vụ việc) | - | - | Hệ thống tính | Nhóm cột con gồm: `Tổng số vụ việc`, `Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm a khoản 1 Điều 52`, `Tại Tòa án - Khởi kiện vụ án dân sự - Theo điểm b khoản 1 và khoản 2 Điều 52`, `Trong quá trình tố tụng hình sự, tố tụng hành chính`. |
| Đình chỉ (vụ việc) | - | - | Hệ thống tính | Nhóm cột con gồm: `Tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại`, `Tại Tòa án theo thủ tục tố tụng`. |
| **Chi trả tiền bồi thường** | - | - | Theo dữ liệu | Nhóm cột lớn gồm `Số vụ việc đã chi trả (vụ việc)`, `Số tiền đã chi trả theo quyết định có hiệu lực của cơ quan trực tiếp quản lý người thi hành công vụ (nghìn đồng)`, `Số tiền đã chi trả theo bản án, quyết định có hiệu lực của Tòa án (nghìn đồng)`. |
| Tổng số vụ việc thụ lý | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 1 của Mẫu 03/BTNN. |
| Thụ lý mới tại cơ quan trực tiếp quản lý | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 2 của Mẫu 03/BTNN. |
| Thụ lý mới tại Tòa án theo điểm a khoản 1 Điều 52 | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 3 của Mẫu 03/BTNN. |
| Thụ lý mới tại Tòa án theo điểm b khoản 1 và khoản 2 Điều 52 | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 4 của Mẫu 03/BTNN. |
| Thụ lý mới trong tố tụng hình sự/hành chính | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 5 của Mẫu 03/BTNN. |
| Kỳ trước chuyển sang tại cơ quan trực tiếp quản lý | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 6 của Mẫu 03/BTNN. |
| Kỳ trước chuyển sang tại Tòa án theo điểm a | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 7 của Mẫu 03/BTNN. |
| Kỳ trước chuyển sang tại Tòa án theo điểm b | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 8 của Mẫu 03/BTNN. |
| Kỳ trước chuyển sang trong tố tụng hình sự/hành chính | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 9 của Mẫu 03/BTNN. |
| Đã có văn bản GQBT có hiệu lực - tổng số | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 10 của Mẫu 03/BTNN. |
| Đã giải quyết tại cơ quan trực tiếp quản lý | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 11 của Mẫu 03/BTNN. |
| Đã giải quyết tại Tòa án theo điểm a | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 12 của Mẫu 03/BTNN. |
| Đã giải quyết tại Tòa án theo điểm b | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 13 của Mẫu 03/BTNN. |
| Đã giải quyết trong tố tụng hình sự/hành chính | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 14 của Mẫu 03/BTNN. |
| Số tiền bồi thường theo văn bản có hiệu lực | Decimal(18,0) | - | Hệ thống tính | Tương ứng chỉ tiêu 15 của Mẫu 03/BTNN, đơn vị nghìn đồng. |
| Đang giải quyết - tổng số | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 16 của Mẫu 03/BTNN. |
| Đang giải quyết tại cơ quan trực tiếp quản lý | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 17 của Mẫu 03/BTNN. |
| Đang giải quyết tại Tòa án theo điểm a | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 18 của Mẫu 03/BTNN. |
| Đang giải quyết tại Tòa án theo điểm b | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 19 của Mẫu 03/BTNN. |
| Đang giải quyết trong tố tụng hình sự/hành chính | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 20 của Mẫu 03/BTNN. |
| Đình chỉ tại cơ quan trực tiếp quản lý | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 21 của Mẫu 03/BTNN. |
| Đình chỉ theo thủ tục tố tụng tại Tòa án | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 22 của Mẫu 03/BTNN. |
| Số vụ việc đã chi trả | Integer(10) | - | Hệ thống tính | Tương ứng chỉ tiêu 23 của Mẫu 03/BTNN. |
| Số tiền đã chi trả theo QĐ cơ quan trực tiếp quản lý | Decimal(18,0) | - | Hệ thống tính | Tương ứng chỉ tiêu 24 của Mẫu 03/BTNN, đơn vị nghìn đồng. |
| Số tiền đã chi trả theo bản án/QĐ Tòa án | Decimal(18,0) | - | Hệ thống tính | Tương ứng chỉ tiêu 25 của Mẫu 03/BTNN, đơn vị nghìn đồng. |

---

#### 4.3.3.24.9. Ghi chú phạm vi đặc tả

\- Một `Mã vụ việc` chỉ được tính một lần trong cùng kỳ báo cáo, cùng chiều nhóm dữ liệu và cùng chỉ tiêu.

\- Các báo cáo 1-4 dùng bộ chỉ tiêu cốt lõi để phục vụ quản trị, không thay thế file biểu mẫu pháp lý Mẫu 01/03/04 TT08.

\- Báo cáo kết quả giải quyết YCBT tại địa phương tái sử dụng chỉ tiêu của Mẫu 03/BTNN nhưng đổi chiều nhóm dữ liệu sang từng tỉnh/thành.

\- File kết xuất phải thể hiện đúng tên báo cáo theo menu đang chọn; không hiển thị thêm tab nội bộ trong từng màn vì mỗi báo cáo đã được tách thành một menu riêng.
