### 4.3.2.20. Ký duyệt hồ sơ

#### 4.3.2.20.1. Mục đích

\- Cho phép Lãnh đạo theo dõi và ký duyệt các hồ sơ đang chờ Lãnh đạo xử lý theo 04 Tab nghiệp vụ:

\+ Phiếu đăng ký, Yêu cầu cung cấp thông tin, Yêu cầu cung cấp bản sao: các hồ sơ đã được Cán bộ trình ký ở trạng thái "Chờ ký".

\+ Chỉnh lý/Hủy/Khôi phục đăng ký: các đề nghị ở trạng thái "Chờ duyệt đề nghị" (Lãnh đạo duyệt hoặc từ chối đề nghị) và các hồ sơ ở trạng thái "Chờ ký số" (Lãnh đạo ký số hoặc trả lại hồ sơ).

\- Nghiệp vụ chi tiết của từng Tab (bộ lọc tìm kiếm, danh sách, màn hình xem chi tiết và các popup) được liên kết tới tài liệu SRS tương ứng, không mô tả lại.

*a. Phân quyền*

\- Lãnh đạo được phân quyền menu "Biện pháp bảo đảm > Ký duyệt hồ sơ".

\- Mỗi Tab nghiệp vụ chỉ hiển thị với Lãnh đạo được phân quyền ký duyệt nhóm nghiệp vụ tương ứng; quyền thao tác chi tiết theo tài liệu SRS của từng Tab.

*b. Điều kiện thực hiện*

\- Lãnh đạo đã đăng nhập thành công vào Website Quản trị.

---

<a id="mh01"></a>
#### 4.3.2.20.2. MH01 - Màn hình Ký duyệt hồ sơ

##### 4.3.2.20.2.1. Màn hình

![Màn hình Ký duyệt hồ sơ](images/KDHS_MH01_Ky_duyet_ho_so.png)

##### 4.3.2.20.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab nghiệp vụ** | - | - | - | |
| Tab nghiệp vụ | Enum(String(50)) | Có | Phiếu đăng ký | Control UI: Tab, kèm badge số lượng hồ sơ.<br>Gồm:<br>+ Phiếu đăng ký<br>+ Yêu cầu cung cấp thông tin<br>+ Yêu cầu cung cấp bản sao<br>+ Chỉnh lý/Hủy/Khôi phục đăng ký |
| Badge Tab nghiệp vụ | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm, chỉ đọc, hiển thị bên phải tên từng Tab nghiệp vụ.<br>- Giá trị bằng số hồ sơ của nhóm nghiệp vụ đó đang ở trạng thái "Chờ ký" và được Cán bộ trình tới đúng Lãnh đạo đăng nhập.<br>- Riêng Tab Chỉnh lý/Hủy/Khôi phục đăng ký: Giá trị bằng tổng số đề nghị ở trạng thái "Chờ duyệt đề nghị" thuộc đơn vị quản lý của Lãnh đạo đăng nhập và số hồ sơ ở trạng thái "Chờ ký số" được trình ký tới đúng Lãnh đạo đăng nhập.<br>- Chỉ đếm hồ sơ thuộc đơn vị quản lý và phạm vi thẩm quyền của Lãnh đạo đăng nhập.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge, không hiển thị số 0.<br>- Hệ thống cập nhật lại badge khi mở màn hình và sau mỗi thao tác làm thay đổi trạng thái hồ sơ (Ký duyệt, Từ chối, Trả lại; riêng Tab Chỉnh lý/Hủy/Khôi phục đăng ký gồm Duyệt đề nghị, Từ chối đề nghị, Ký số, Trả lại hồ sơ). |
| Badge menu "Ký duyệt hồ sơ" | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm, chỉ đọc, hiển thị bên phải tên menu "Biện pháp bảo đảm > Ký duyệt hồ sơ" trên Left Menu.<br>- Giá trị bằng tổng Badge của 04 Tab nghiệp vụ (Phiếu đăng ký + Yêu cầu cung cấp thông tin + Yêu cầu cung cấp bản sao + Chỉnh lý/Hủy/Khôi phục đăng ký).<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0.<br>- Hệ thống cập nhật lại badge ngay, không cần tải lại trang, sau mỗi thao tác làm thay đổi trạng thái hồ sơ. |
| **II. Nội dung theo Tab nghiệp vụ** | - | - | - | Hiển thị Bộ lọc tìm kiếm, Danh sách hồ sơ và các thao tác theo Tab nghiệp vụ đang chọn. |
| Phiếu đăng ký | - | - | - | Hiển thị và xử lý theo tài liệu [Ký duyệt Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Phieu_dang_ky_Lanh_dao.md). |
| Yêu cầu cung cấp thông tin | - | - | - | Hiển thị và xử lý theo tài liệu [Ký duyệt yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Yeu_cau_cung_cap_thong_tin_Lanh_dao.md). |
| Yêu cầu cung cấp bản sao | - | - | - | Hiển thị và xử lý theo tài liệu [Ký duyệt yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Yeu_cau_cung_cap_ban_sao_Lanh_dao.md). |
| Chỉnh lý/Hủy/Khôi phục đăng ký | - | - | - | Hiển thị và xử lý theo tài liệu [Ký duyệt đề nghị Chỉnh lý thông tin, Hủy và Khôi phục đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Ky_duyet_Chinh_ly_huy_khoi_phuc_dang_ky_Lanh_dao.md). |

##### 4.3.2.20.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Tab nghiệp vụ | Tab | Hệ thống thực hiện:<br>+ Hiển thị Bộ lọc tìm kiếm và Danh sách hồ sơ chờ Lãnh đạo xử lý của Tab nghiệp vụ đã chọn theo tài liệu SRS tương ứng tại Khối II ("Chờ ký" đối với Phiếu đăng ký, Yêu cầu cung cấp thông tin, Yêu cầu cung cấp bản sao; "Chờ duyệt đề nghị" và "Chờ ký số" đối với Chỉnh lý/Hủy/Khôi phục đăng ký).<br>+ Cập nhật lại badge số lượng hồ sơ của các Tab nghiệp vụ. |
