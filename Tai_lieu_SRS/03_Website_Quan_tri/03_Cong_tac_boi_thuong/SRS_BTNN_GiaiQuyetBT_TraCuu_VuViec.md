### 4.3.3. Tra cứu Vụ việc Bồi thường nhà nước

#### 4.3.3.4. Tra cứu vụ việc

##### 4.3.3.4.1. Mục đích

\- Cho phép tra cứu vụ việc bồi thường nhà nước trên 01 danh sách chung, không tách riêng vụ việc yêu cầu bồi thường thiệt hại và vụ việc yêu cầu phục hồi danh dự.

\- Màn hình chỉ phục vụ:
  + Tra cứu vụ việc
  + Xem chi tiết toàn trình vụ việc ở chế độ chỉ xem
  + Kết xuất danh sách ra Excel

\- Màn hình không có thao tác thêm mới, cập nhật, trình duyệt, ký duyệt hoặc xử lý nghiệp vụ.

<a id="tcvv-pham-vi-trang-thai"></a>
\- **Phạm vi danh sách**: vụ việc từ trạng thái `Cử người giải quyết bồi thường` trở đi, gồm các Trạng thái vụ việc:
  + Cử người giải quyết bồi thường
  + Chờ duyệt
  + Bị từ chối
  + Xác minh thiệt hại
  + Thương lượng
  + Chờ ban hành QĐ
  + Chờ thực thi
  + Hoãn giải quyết
  + Tạm đình chỉ
  + Đình chỉ giải quyết
  + Đã chuyển CQGQBT (hồ sơ chuyển bằng thao tác `Chuyển CQGQBT` sau bước Cử người giải quyết bồi thường)
  + Đang phục hồi danh dự
  + Hoãn phục hồi danh dự
  + Từ chối phục hồi danh dự
  + Hoàn thành

\- Không hiển thị:
  + Vụ việc `Chờ tiếp nhận`, `Yêu cầu bổ sung`, `Không thụ lý`
  + Vụ việc `Đã chuyển CQGQBT` do `Không thụ lý` lý do `KTL_01` (chuyển trước bước Cử người giải quyết bồi thường)
  + Vụ việc `Chờ duyệt` / `Bị từ chối` có Nội dung trình `Thông báo thụ lý hồ sơ`, `Thông báo Yêu cầu bổ sung`, `Thông báo Không thụ lý`

\- Mỗi dòng là 01 hồ sơ Giải quyết yêu cầu bồi thường (`Mã hồ sơ GQBT` `BT-yyyy-xxx`), kèm `Mã vụ việc` `VVBT-yyyy-xxx` theo [Mã vụ việc và mã hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_TiepNhan_YCBT.md#tn-ma-vu-viec).

\- Trạng thái vụ việc theo [Trạng thái vụ việc Giải quyết YCBT - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-trang-thai-vu-viec).

<a id="tcvv-pham-vi-du-lieu"></a>
*a. Phân quyền và phạm vi dữ liệu*

\- **Xem**: tra cứu danh sách, xem chi tiết vụ việc ở chế độ chỉ xem.

\- **Kết xuất Excel**: tải danh sách kết quả tra cứu theo bộ lọc hiện tại.

\- Phạm vi dữ liệu theo cấp đơn vị của người dùng:
  + Bộ Tư pháp: toàn quốc.
  + Sở Tư pháp: vụ việc có Cơ quan giải quyết thuộc Tỉnh/Thành phố của Sở Tư pháp và vụ việc do chính Sở Tư pháp tiếp nhận.
  + Cơ quan giải quyết bồi thường: vụ việc do chính đơn vị giải quyết.

\- Vụ việc ngoài phạm vi dữ liệu: không hiển thị trên danh sách, không mở được chi tiết bằng đường dẫn.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập Website quản trị và được phân quyền chức năng `Tra cứu vụ việc`.

\- Dữ liệu vụ việc lấy từ hồ sơ Giải quyết yêu cầu bồi thường và các phân hệ liên quan: Quyết định giải quyết bồi thường, Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường.

---

##### 4.3.3.4.2. MH01 - Màn hình Tra cứu vụ việc

###### 4.3.3.4.2.1. Màn hình

![Màn hình Tra cứu vụ việc bồi thường nhà nước](images/UC_Tra_Cuu_Vu_Viec_BTNN_MH01.png)

###### 4.3.3.4.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | `Tra cứu vụ việc` | Control UI: Text heading (Read-only).<br>- Hiển thị đúng tên mục Menu `Tra cứu vụ việc`.<br>- Không hiển thị dòng mô tả dưới tiêu đề. |
| **I. Khối Lọc, tìm kiếm thông tin** | Section | - | - | Control UI: Filter panel.<br>- Các tiêu chí có dữ liệu kết hợp theo điều kiện AND.<br>- Áp dụng trên 01 danh sách chung, trong phạm vi tại [Phạm vi danh sách - Tra cứu vụ việc - Công tác bồi thường nhà nước (Website Quản trị)](#tcvv-pham-vi-trang-thai). |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- `Placeholder: Nhập mã vụ việc`.<br>- Tìm gần đúng, không phân biệt hoa thường theo `Mã vụ việc`.<br>- Tự động cắt khoảng trắng đầu cuối. |
| Mã hồ sơ GQBT | String(50) | Không | Trống | Control UI: Input text.<br>- `Placeholder: Nhập mã hồ sơ GQBT`.<br>- Tìm gần đúng, không phân biệt hoa thường theo `Mã hồ sơ GQBT`.<br>- Tự động cắt khoảng trắng đầu cuối. |
| Tên cá nhân/Tổ chức yêu cầu | String(255) | Không | Trống | Control UI: Input text.<br>- `Placeholder: Nhập tên cá nhân/tổ chức yêu cầu`.<br>- Tìm gần đúng, không phân biệt hoa thường theo cột `Tên cá nhân/Tổ chức yêu cầu`. |
| Tên cá nhân/Tổ chức bị thiệt hại | String(255) | Không | Trống | Control UI: Input text.<br>- `Placeholder: Nhập tên cá nhân/tổ chức bị thiệt hại`.<br>- Tìm gần đúng, không phân biệt hoa thường theo cột `Tên cá nhân/Tổ chức bị thiệt hại`. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Tham chiếu [DM_22].<br>- Có thêm giá trị `Tất cả`.<br>- Lọc chính xác theo Lĩnh vực phát sinh thiệt hại. |
| Cơ quan giải quyết | String(255) | Không | Trống | Control UI: Input text.<br>- `Placeholder: Nhập cơ quan giải quyết`.<br>- Tìm gần đúng, không phân biệt hoa thường theo tên cơ quan giải quyết bồi thường. |
| Tỉnh/Thành phố | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Danh sách gồm toàn bộ Tỉnh/Thành phố của Danh mục địa bàn (cấp Tỉnh/Thành phố), có thêm giá trị `Tất cả`.<br>- Lọc theo Tỉnh/Thành phố của Cơ quan giải quyết.<br>- Khi thay đổi: tải lại danh sách `Phường/Xã`, đưa `Phường/Xã` về `Tất cả`. |
| Phường/Xã | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox.<br>- Danh sách gồm Phường/Xã của Danh mục địa bàn (cấp Phường/Xã) thuộc `Tỉnh/Thành phố` đã chọn, có thêm giá trị `Tất cả`.<br>- `Tỉnh/Thành phố` = `Tất cả`: trường bị khóa (Disabled), giá trị `Tất cả`.<br>- Lọc theo Phường/Xã của Cơ quan giải quyết. |
| Cán bộ xử lý | String(255) | Không | Trống | Control UI: Input text.<br>- `Placeholder: Nhập tên cán bộ xử lý`.<br>- Tìm gần đúng, không phân biệt hoa thường theo họ tên cán bộ được cử giải quyết. |
| Nguồn hồ sơ | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Gồm:<br>+ Tất cả<br>+ Tiếp nhận mới<br>+ Dịch vụ công quốc gia<br>+ Chuyển CQGQBT<br>+ Xác định CQGQBT<br>- Lọc chính xác theo Nguồn hồ sơ. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Gồm `Tất cả` và các trạng thái thuộc [Phạm vi danh sách - Tra cứu vụ việc - Công tác bồi thường nhà nước (Website Quản trị)](#tcvv-pham-vi-trang-thai), theo thứ tự tại đó.<br>- Lọc chính xác theo Trạng thái vụ việc. |
| Ngày tiếp nhận | Date | Không | `Từ ngày`: ngày đầu tháng của tháng cách tháng hiện tại 02 tháng<br>`Đến ngày`: ngày hiện tại | Control UI: Datepicker khoảng ngày (`Từ ngày` - `Đến ngày`).<br>- `Placeholder: Từ ngày` / `Placeholder: Đến ngày`.<br>- Định dạng `dd/mm/yyyy`.<br>- `Từ ngày` không lớn hơn `Đến ngày`. |
| Xóa bộ lọc | Button | - | - | Control UI: Button. |
| Tìm kiếm | Button | - | - | Control UI: Button. |
| **II. Bảng kết quả tìm kiếm** | Section | - | 20 bản ghi/trang | Control UI: Data grid.<br>- Tải Trang 1 khi mở màn hình.<br>- Sắp xếp mặc định theo `Ngày tiếp nhận` giảm dần.<br>- Số dòng hiển thị: 10 / 20 / 50, mặc định 20.<br>- Không có cột Thao tác.<br>- Click vào dòng: cùng hành vi click `Mã hồ sơ GQBT` tại [Xem chi tiết - Tra cứu vụ việc - Công tác bồi thường nhà nước (Website Quản trị)](#tcvv-xem-chi-tiet).<br>- Không có dữ liệu: 01 dòng căn giữa toàn bộ chiều rộng bảng, nội dung [MSG-INF-SYS-001]. |
| Kết xuất Excel | Button | - | - | Control UI: Button.<br>- Vị trí: thanh tiêu đề Bảng kết quả tìm kiếm, cùng hàng số lượng bản ghi. |
| Lọc nhanh | Enum(String(50)) | Không | `Tất cả` | Control UI: Nhóm nút (chip) phía trên lưới; không hiển thị nhãn tiêu đề.<br>- Gồm:<br>+ Tất cả<br>+ Bồi thường thiệt hại (Loại yêu cầu `Bồi thường thiệt hại`)<br>+ Phục hồi danh dự (mọi vụ việc có yêu cầu phục hồi danh dự: Loại yêu cầu `Phục hồi danh dự` hoặc `Bồi thường thiệt hại và Phục hồi danh dự`)<br>- Nút không hiển thị số lượng.<br>- Cùng kiểu hiển thị và cách lọc với `Lọc nhanh` tại [MH01 - Màn hình Danh sách vụ việc/hồ sơ yêu cầu bồi thường - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43313-mh01---màn-hình-danh-sách-vụ-việchồ-sơ-yêu-cầu-bồi-thường).<br>- Lọc trên 01 danh sách chung, kết hợp AND với khối Lọc, tìm kiếm. |
| STT | Integer(10) | - | Tự tăng | Control UI: Text (Read-only). |
| Mã vụ việc | String(50) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi: `Mã vụ việc` `VVBT-yyyy-xxx`. |
| Mã hồ sơ GQBT | String(50) | - | Theo dữ liệu | Control UI: HyperLink.<br>- Theo dữ liệu bản ghi: `Mã hồ sơ` `BT-yyyy-xxx` của hồ sơ Giải quyết yêu cầu bồi thường.<br>- Click: mở xem chi tiết toàn trình ở chế độ chỉ xem. |
| Tên cá nhân/Tổ chức yêu cầu | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi: `Họ và tên` (cá nhân) hoặc `Tên tổ chức` (tổ chức) của người yêu cầu. |
| Tên cá nhân/Tổ chức bị thiệt hại | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Cùng quy tắc cột `Tên cá nhân/Tổ chức bị thiệt hại` tại [MH01 - Màn hình Danh sách vụ việc/hồ sơ yêu cầu bồi thường - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43313-mh01---màn-hình-danh-sách-vụ-việchồ-sơ-yêu-cầu-bồi-thường). |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi, tham chiếu [DM_22].<br>- Bỏ tiền tố `Trong hoạt động`. |
| Cơ quan giải quyết | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi: Cơ quan giải quyết bồi thường hiện hành của hồ sơ. |
| Tỉnh/Thành phố | Enum(String(100)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi: Tỉnh/Thành phố của Cơ quan giải quyết, theo khai báo tại [MH02 - Popup Thêm mới / Sửa cơ quan, đơn vị - Quản lý cơ cấu tổ chức - Quản trị hệ thống](../01_Quan_tri_he_thong/Quan_ly_co_cau_to_chuc.md#43173-mh02---popup-thêm-mới--sửa-cơ-quan-đơn-vị). |
| Cán bộ xử lý | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi: họ và tên các cán bộ được cử giải quyết hồ sơ, phân tách bằng dấu phẩy, theo thứ tự cử. |
| Nguồn hồ sơ | Enum(String(50)) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi, 01 trong các giá trị: `Tiếp nhận mới`, `Dịch vụ công quốc gia`, `Chuyển CQGQBT`, `Xác định CQGQBT`. |
| Trạng thái | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Theo dữ liệu bản ghi: Trạng thái vụ việc của hồ sơ, chỉ gồm giá trị thuộc phạm vi danh sách.<br>- Badge cùng quy tắc với cột `Trạng thái` tại Giải quyết yêu cầu bồi thường. |
| Ngày tiếp nhận | Date | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi, định dạng `dd/mm/yyyy`.<br>- Cho phép sắp xếp. |
| Có phục hồi danh dự | Boolean | - | Theo dữ liệu | Control UI: Checkbox (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Tích: Loại yêu cầu `Phục hồi danh dự` hoặc `Bồi thường thiệt hại và Phục hồi danh dự`.<br>- Không tích: Loại yêu cầu `Bồi thường thiệt hại`. |
| Phân trang | - | - | Trang 1 | Control UI: Pagination.<br>- Gồm Số dòng hiển thị, thông tin `Hiển thị [từ]-[đến] trong tổng số [n] bản ghi`, nút chuyển trang. |

###### 4.3.3.4.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | - `Từ ngày` lớn hơn `Đến ngày` của `Ngày tiếp nhận`: hiển thị [MSG-ERR-VAL-007], không tìm kiếm.<br>- Hợp lệ: lọc danh sách theo các tiêu chí và `Lọc nhanh` đang chọn (điều kiện AND), về Trang 1. |
| 2 | Xóa bộ lọc | Button | Đưa bộ lọc và `Lọc nhanh` về giá trị mặc định và tải lại danh sách. |
| 3 | Chọn Tỉnh/Thành phố | Combobox | Tải lại danh sách `Phường/Xã` theo Tỉnh/Thành phố đã chọn, đưa `Phường/Xã` về `Tất cả`; chọn `Tất cả` thì khóa `Phường/Xã`. |
| 4 | Lọc nhanh | Button (chip) | Lọc danh sách theo nút được chọn (kết hợp khối Lọc, tìm kiếm), về Trang 1. |
| 5 | Sắp xếp | Header cột | Click tiêu đề `Ngày tiếp nhận`: đảo chiều sắp xếp tăng/giảm, giữ tiêu chí lọc. |
| 6 | Phân trang | Pagination | Chuyển trang, đổi số dòng hiển thị (về Trang 1); giữ tiêu chí lọc và sắp xếp. |
| 7 | Xem chi tiết | HyperLink / Dòng dữ liệu | <a id="tcvv-xem-chi-tiet"></a>Click `Mã hồ sơ GQBT` hoặc click vào dòng: mở [MH05 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#43317-mh05---màn-hình-xem-chi-tiết-hồ-sơ-yêu-cầu-bồi-thường) của hồ sơ, gồm 03 tab `Thông tin hồ sơ vụ việc` \| `Chi tiết giải quyết bồi thường` \| `Phục hồi danh dự`.<br>Khác biệt ở chế độ chỉ xem:<br>- Ẩn toàn bộ nút thao tác tại thanh thao tác và trong các tab; chỉ giữ chuyển tab, xem/tải tài liệu, xem chi tiết liên kết và nút `Đóng`.<br>- Phạm vi xem theo phạm vi dữ liệu tra cứu; không áp dụng giới hạn chỉ cán bộ được cử giải quyết được xem hồ sơ.<br>- Tab mở mặc định: `Phục hồi danh dự` khi Trạng thái là `Đang phục hồi danh dự` / `Hoãn phục hồi danh dự`; trường hợp khác: `Thông tin hồ sơ vụ việc`.<br>- `Đóng`: quay lại màn hình Tra cứu vụ việc, giữ nguyên bộ lọc và `Lọc nhanh`. |
| 8 | Kết xuất Excel | Button | - Danh sách rỗng: không kết xuất, hiển thị [MSG-WRN-SYS-001].<br>- Có dữ liệu: tải tệp `.xlsx` gồm toàn bộ bản ghi theo bộ lọc, `Lọc nhanh` và sắp xếp hiện tại (không theo trang).<br>- Cột xuất đúng thứ tự lưới: STT, Mã vụ việc, Mã hồ sơ GQBT, Tên cá nhân/Tổ chức yêu cầu, Tên cá nhân/Tổ chức bị thiệt hại, Lĩnh vực phát sinh thiệt hại, Cơ quan giải quyết, Tỉnh/Thành phố, Cán bộ xử lý, Nguồn hồ sơ, Trạng thái, Ngày tiếp nhận, Có phục hồi danh dự.<br>- Cột `Có phục hồi danh dự`: `x` khi có tích, để trống khi không tích. |