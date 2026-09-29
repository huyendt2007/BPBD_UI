### 4.3.2.1. Kiểm tra và xử lý hồ sơ

#### 4.3.2.1.1. Mục đích

\- Cho phép Cán bộ TTĐK theo dõi và xử lý hồ sơ Phiếu đăng ký, Yêu cầu cung cấp thông tin, Yêu cầu cung cấp bản sao theo 03 Left Menu: Hồ sơ chờ xử lý, Hồ sơ đang chờ ký, Hồ sơ đã xử lý.

\- Nghiệp vụ chi tiết của từng danh sách, màn hình xem chi tiết và popup được liên kết tới tài liệu SRS tương ứng, không mô tả lại.

*a. Phân quyền*

\- Cán bộ TTĐK được phân quyền menu "Biện pháp bảo đảm > Kiểm tra và xử lý hồ sơ", chỉ được xem và xử lý hồ sơ thuộc đơn vị được phân công.

*b. Điều kiện thực hiện*

\- Cán bộ đã đăng nhập thành công vào Website Quản trị.

<a id="43212-mh01---man-hinh-ho-so-cho-xu-ly"></a>
#### 4.3.2.1.2. MH01 - Màn hình Hồ sơ chờ xử lý

##### 4.3.2.1.2.1. Màn hình

![Màn hình Hồ sơ chờ xử lý](images/KTXL_MH01_Ho_so_cho_xu_ly.png)

##### 4.3.2.1.2.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab trạng thái** | | | | |
| Tab trạng thái | Enum(String(50)) | Có | Hồ sơ chờ duyệt | Control UI: Tab, kèm badge số lượng hồ sơ.<br>Gồm:<br>- Hồ sơ chờ nhập liệu: hồ sơ ở trạng thái "Chờ giải quyết"<br>- Hồ sơ chờ duyệt: hồ sơ ở trạng thái "Chờ duyệt"<br>- Hồ sơ duyệt chờ ký: hồ sơ ở trạng thái "Duyệt chờ ký"<br>- Hồ sơ Bị trả lại: hồ sơ ở trạng thái "Bị trả lại" |
| Badge Tab trạng thái | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm, chỉ đọc, hiển thị bên phải tên từng Tab trạng thái.<br>- Màu badge theo Tab:<br>+ Hồ sơ chờ nhập liệu: màu cam.<br>+ Hồ sơ chờ duyệt, Hồ sơ duyệt chờ ký: màu xanh.<br>+ Hồ sơ Bị trả lại: màu đỏ.<br>- Giá trị bằng tổng số hồ sơ ở trạng thái tương ứng của cả 03 nhóm nghiệp vụ (Phiếu đăng ký + Yêu cầu cung cấp thông tin + Yêu cầu cung cấp bản sao), tức bằng tổng 03 badge Tab nhóm nghiệp vụ khi chọn Tab trạng thái đó.<br>- Chỉ đếm hồ sơ thuộc đơn vị được phân công của Cán bộ đăng nhập và đủ điều kiện hiển thị trên danh sách của Tab.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge, không hiển thị số 0.<br>- Giá trị lớn hơn 99 hiển thị "99+".<br>- Hệ thống cập nhật lại badge khi mở màn hình và sau mỗi thao tác làm thay đổi trạng thái hồ sơ. |
| **II. Tab nhóm nghiệp vụ** | | | | |
| Tab nhóm nghiệp vụ | Enum(String(50)) | Có | Phiếu đăng ký | Control UI: Tab, kèm badge số lượng hồ sơ.<br>Gồm:<br>- Phiếu đăng ký<br>- Yêu cầu cung cấp thông tin<br>- Yêu cầu cung cấp bản sao |
| Badge Tab nhóm nghiệp vụ | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm màu xanh, chỉ đọc, hiển thị bên phải tên từng Tab nhóm nghiệp vụ.<br>- Giá trị bằng số hồ sơ của nhóm nghiệp vụ đó thuộc Tab trạng thái đang chọn (ví dụ đang chọn Tab Hồ sơ chờ duyệt: badge Phiếu đăng ký là số Phiếu đăng ký ở trạng thái "Chờ duyệt").<br>- Chỉ đếm hồ sơ thuộc đơn vị được phân công của Cán bộ đăng nhập và đủ điều kiện hiển thị trên danh sách của Tab.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge, không hiển thị số 0.<br>- Giá trị lớn hơn 99 hiển thị "99+".<br>- Hệ thống cập nhật lại badge khi mở màn hình và sau mỗi thao tác làm thay đổi trạng thái hồ sơ. |
| **III. Bộ lọc tìm kiếm và Danh sách hồ sơ** | | | | Hiển thị theo Tab trạng thái và Tab nhóm nghiệp vụ đang chọn.<br>- Khối Bộ lọc tìm kiếm: Không hiển thị tiêu đề khối; mặc định hiển thị dạng mở rộng, cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên.<br>- Bảng danh sách: Không hiển thị tiêu đề phía trên bảng; Thanh công cụ (nếu có) đặt ở góc phải phía trên bảng. Cột Thao tác có độ rộng co theo số lượng nút hiển thị trên dòng. |
| **Nếu chọn: Tab Hồ sơ chờ nhập liệu** | | | | |
| Phiếu đăng ký | - | - | - | Hiển thị và xử lý theo tài liệu [Nhập liệu hồ sơ giấy Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhap_lieu_ho_so_giay_Phieu_dang_ky_Can_bo.md). |
| Yêu cầu cung cấp thông tin | - | - | - | Hiển thị và xử lý theo tài liệu [Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_thong_tin_Can_bo.md). |
| Yêu cầu cung cấp bản sao | - | - | - | Hiển thị và xử lý theo tài liệu [Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_ban_sao_Can_bo.md). |
| **Nếu chọn: Tab Hồ sơ chờ duyệt** | | | | |
| Phiếu đăng ký | - | - | - | Hiển thị và xử lý theo tài liệu [Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md). |
| Yêu cầu cung cấp thông tin | - | - | - | Hiển thị và xử lý theo tài liệu [Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md). |
| Yêu cầu cung cấp bản sao | - | - | - | Hiển thị và xử lý theo tài liệu [Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm (Website Quản trị)](SRS_Xu_ly_Yeu_cau_cung_cap_ban_sao_Can_bo.md). |
| **Nếu chọn: Tab Hồ sơ duyệt chờ ký** | | | | |
| Phiếu đăng ký | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43232-mh01---man-hinh-danh-sach-phieu-dang-ky-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Chỉ hiển thị hồ sơ ở trạng thái "Duyệt chờ ký".<br>- Thanh công cụ gồm:<br>+ Từ chối<br>+ Trình ký<br>- Cột Thao tác gồm:<br>+ Trình ký<br>+ Hủy duyệt<br>+ Từ chối<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Yêu cầu cung cấp thông tin | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách hồ sơ chờ duyệt - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Chỉ hiển thị hồ sơ ở trạng thái "Duyệt chờ ký".<br>- Cột Thao tác gồm:<br>+ Trình ký<br>+ Hủy duyệt<br>+ Từ chối<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Yêu cầu cung cấp bản sao | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách yêu cầu cung cấp bản sao chờ duyệt - Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_ban_sao_Can_bo.md#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Chỉ hiển thị hồ sơ ở trạng thái "Duyệt chờ ký".<br>- Cột Thao tác gồm:<br>+ Trình ký<br>+ Hủy duyệt<br>+ Từ chối<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **Nếu chọn: Tab Hồ sơ Bị trả lại** | | | | |
| Phiếu đăng ký | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu - Nhập liệu hồ sơ giấy Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Phieu_dang_ky_Can_bo.md#432172-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Chỉ hiển thị hồ sơ ở trạng thái "Bị trả lại".<br>- Cột Thao tác gồm:<br>+ Cập nhật<br>+ Từ chối<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Yêu cầu cung cấp thông tin | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu - Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_thong_tin_Can_bo.md#432192-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Chỉ hiển thị hồ sơ ở trạng thái "Bị trả lại".<br>- Cột Thao tác gồm:<br>+ Cập nhật<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Yêu cầu cung cấp bản sao | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu - Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_ban_sao_Can_bo.md#432182-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Chỉ hiển thị hồ sơ ở trạng thái "Bị trả lại".<br>- Cột Thao tác gồm:<br>+ Cập nhật<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| **IV. Badge trên Left Menu** | | | | Chỉ menu con "Hồ sơ chờ xử lý" và "Hồ sơ đang chờ ký" hiển thị badge. Menu cha "Kiểm tra và xử lý hồ sơ" và menu con "Hồ sơ đã xử lý" không hiển thị badge. |
| Badge menu "Hồ sơ chờ xử lý" | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm màu đỏ, chỉ đọc, hiển thị bên phải tên menu con "Hồ sơ chờ xử lý" trên Left Menu.<br>- Giá trị bằng tổng số hồ sơ của 04 Tab trạng thái (Hồ sơ chờ nhập liệu + Hồ sơ chờ duyệt + Hồ sơ duyệt chờ ký + Hồ sơ Bị trả lại) của cả 03 nhóm nghiệp vụ, tức bằng tổng 04 Badge Tab trạng thái.<br>- Chỉ đếm hồ sơ thuộc đơn vị được phân công của Cán bộ đăng nhập; không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge.<br>- Giá trị lớn hơn 99 hiển thị "99+".<br>- Hệ thống cập nhật lại badge ngay, không cần tải lại trang: khi mở màn hình và sau mỗi thao tác làm thay đổi trạng thái hồ sơ (Duyệt chờ ký, Trình ký, Từ chối, Hủy duyệt, Gửi duyệt, Cập nhật, Ký số, Trả lại). |

##### 4.3.2.1.2.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Tab trạng thái | Tab | Hệ thống thực hiện:<br>+ Hiển thị Bộ lọc tìm kiếm và Danh sách hồ sơ tương ứng Tab trạng thái đã chọn và Tab nhóm nghiệp vụ đang chọn.<br>+ Tính lại Badge Tab nhóm nghiệp vụ theo Tab trạng thái đã chọn.<br>+ Đưa bộ lọc về mặc định và phân trang về Trang 1. |
| 2 | Chọn Tab nhóm nghiệp vụ | Tab | Hệ thống thực hiện:<br>+ Hiển thị Bộ lọc tìm kiếm và Danh sách hồ sơ tương ứng Tab nhóm nghiệp vụ đã chọn trong Tab trạng thái đang chọn.<br>+ Đưa bộ lọc về mặc định và phân trang về Trang 1. |
| **Chức năng trên Tab Hồ sơ duyệt chờ ký** | | | |
| 3 | Click dòng dữ liệu | Row Click | Mở màn Xem chi tiết ở chế độ chỉ đọc theo Tab nhóm nghiệp vụ, hiển thị ngay dữ liệu và kết quả tra cứu đã lưu, không tra cứu lại:<br>+ Phiếu đăng ký: [MH02 - Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43233-mh02---man-hinh-xem-chi-tiet-phieu-dang-ky); thanh nút gồm Trình ký, Hủy duyệt, Từ chối, Đóng.<br>+ Yêu cầu cung cấp thông tin: [MH05 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin](#43216-mh05---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-thong-tin).<br>+ Yêu cầu cung cấp bản sao: [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao).<br>- Nút trên màn Xem chi tiết hiển thị theo nhóm chức năng "Nếu mở từ: Tab Hồ sơ duyệt chờ ký" của màn tương ứng. |
| 4 | Trình ký | Nút trên thanh công cụ | Chỉ hiển thị tại Tab nhóm nghiệp vụ Phiếu đăng ký. Thực hiện giống chức năng Trình ký (thanh công cụ) tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43232-mh01---man-hinh-danh-sach-phieu-dang-ky-cho-duyet). |
| 5 | Từ chối | Nút trên thanh công cụ | Chỉ hiển thị tại Tab nhóm nghiệp vụ Phiếu đăng ký. Thực hiện giống chức năng Từ chối (thanh công cụ) tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43232-mh01---man-hinh-danh-sach-phieu-dang-ky-cho-duyet). |
| 6 | Trình ký | Icon trên dòng | Thực hiện theo Tab nhóm nghiệp vụ:<br>+ Phiếu đăng ký: giống chức năng Trình ký (trên lưới) tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43232-mh01---man-hinh-danh-sach-phieu-dang-ky-cho-duyet).<br>+ Yêu cầu cung cấp thông tin: giống chức năng Trình ký tại [MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp thông tin - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#43223-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-thong-tin).<br>+ Yêu cầu cung cấp bản sao: giống chức năng Trình ký tại [MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp bản sao - Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_ban_sao_Can_bo.md#43253-mh02---man-hinh-xu-ly-ho-so-yeu-cau-cung-cap-ban-sao). |
| 7 | Hủy duyệt | Icon trên dòng | Hiển thị tại tất cả Tab nhóm nghiệp vụ. Hệ thống thực hiện:<br>+ Chuyển hồ sơ từ trạng thái "Duyệt chờ ký" về "Chờ duyệt".<br>+ Ghi nhận Cán bộ hủy duyệt, thời điểm hủy duyệt, trạng thái trước/sau.<br>+ Ghi lịch sử xử lý và Audit log.<br>+ Hiển thị [MSG-SUC-DK-KT-004] và tải lại danh sách. |
| 8 | Từ chối | Icon trên dòng | Thực hiện theo Tab nhóm nghiệp vụ:<br>+ Phiếu đăng ký: giống chức năng Từ chối (trên lưới) tại [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43232-mh01---man-hinh-danh-sach-phieu-dang-ky-cho-duyet).<br>+ Yêu cầu cung cấp thông tin: giống chức năng Từ chối tại [MH01 - Màn hình Danh sách hồ sơ chờ duyệt - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet).<br>+ Yêu cầu cung cấp bản sao: giống chức năng Từ chối tại [MH01 - Màn hình Danh sách yêu cầu cung cấp bản sao chờ duyệt - Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_ban_sao_Can_bo.md#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet). |
| **Chức năng trên Tab Hồ sơ Bị trả lại** | | | |
| 9 | Click dòng dữ liệu | Row Click | Mở màn Xem chi tiết ở chế độ chỉ đọc theo Tab nhóm nghiệp vụ, hiển thị ngay dữ liệu và kết quả tra cứu đã lưu, không tra cứu lại:<br>+ Phiếu đăng ký: [MH02 - Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43233-mh02---man-hinh-xem-chi-tiet-phieu-dang-ky); thanh nút gồm Cập nhật, Đóng.<br>+ Yêu cầu cung cấp thông tin: [MH05 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin](#43216-mh05---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-thong-tin).<br>+ Yêu cầu cung cấp bản sao: [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao).<br>- Nút trên màn Xem chi tiết hiển thị theo nhóm chức năng "Nếu mở từ: Tab Hồ sơ Bị trả lại" của màn tương ứng. |
| 10 | Cập nhật | Icon trên dòng | Hệ thống thực hiện:<br>+ Mở màn Nhập liệu tương ứng Tab nhóm nghiệp vụ.<br>+ Điền sẵn toàn bộ dữ liệu của hồ sơ theo bản ghi đã chọn trên danh sách lên màn Nhập liệu để Cán bộ cập nhật lại thông tin.<br>+ Dữ liệu tra cứu đã lưu ở lần xử lý trước được tải sẵn, Cán bộ không phải bấm "Tra cứu" lại; nếu Cán bộ sửa dữ liệu tra cứu thì bấm "Tra cứu" để lấy kết quả mới:<br>- Phiếu đăng ký cần hồ sơ tham chiếu (Đăng ký thay đổi, Xóa đăng ký, Thông báo xử lý tài sản bảo đảm...): tự động điền Số tham chiếu và tải sẵn dữ liệu hồ sơ tham chiếu vào biểu mẫu.<br>- Yêu cầu cung cấp thông tin, Yêu cầu cung cấp bản sao: hiển thị ngay Chi tiết kết quả tra cứu / Cấu trúc chi tiết hồ sơ gốc cùng nút "Duyệt chờ ký", "Trình ký".<br>+ Hiển thị thêm Khối Thông tin trả lại ngay dưới Khối Thông tin tiếp nhận và thu phí; hiển thị và xử lý giống khối **II. Thông tin trả lại** tại [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao).<br>+ Sau khi cập nhật, Cán bộ thực hiện trình ký lại theo chức năng tại màn Nhập liệu.<br>Màn Nhập liệu theo Tab nhóm nghiệp vụ:<br>+ Phiếu đăng ký: [MH03 - Màn hình Nhập liệu hồ sơ giấy Phiếu đăng ký - Nhập liệu hồ sơ giấy Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Phieu_dang_ky_Can_bo.md#432174-mh03---man-hinh-nhap-lieu-ho-so-giay-phieu-dang-ky).<br>+ Yêu cầu cung cấp thông tin: [MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin - Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_thong_tin_Can_bo.md#432194-mh03---man-hinh-nhap-lieu-ho-so-giay-yeu-cau-cung-cap-thong-tin).<br>+ Yêu cầu cung cấp bản sao: [MH03 - Màn hình Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao - Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_ban_sao_Can_bo.md#432184-mh03---man-hinh-nhap-lieu-ho-so-giay-yeu-cau-cung-cap-ban-sao). |
| 11 | Từ chối | Icon trên dòng | Chỉ hiển thị tại Tab nhóm nghiệp vụ Phiếu đăng ký. Thực hiện giống chức năng Từ chối tại [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu - Nhập liệu hồ sơ giấy Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Phieu_dang_ky_Can_bo.md#432172-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu). |

#### 4.3.2.1.3. MH02 - Màn hình Hồ sơ đang chờ ký

##### 4.3.2.1.3.1. Màn hình

![Màn hình Hồ sơ đang chờ ký](images/KTXL_MH02_Ho_so_dang_cho_ky.png)

##### 4.3.2.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab nhóm nghiệp vụ** | | | | |
| Tab nhóm nghiệp vụ | Enum(String(50)) | Có | Phiếu đăng ký | Control UI: Tab, kèm badge số lượng hồ sơ.<br>Gồm:<br>- Phiếu đăng ký<br>- Yêu cầu cung cấp thông tin<br>- Yêu cầu cung cấp bản sao |
| Badge Tab nhóm nghiệp vụ | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm màu xanh, chỉ đọc, hiển thị bên phải tên từng Tab nhóm nghiệp vụ.<br>- Giá trị bằng số hồ sơ của nhóm nghiệp vụ đó đang ở trạng thái "Chờ ký".<br>- Chỉ đếm hồ sơ thuộc đơn vị được phân công của Cán bộ đăng nhập.<br>- Không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge, không hiển thị số 0.<br>- Giá trị lớn hơn 99 hiển thị "99+".<br>- Hệ thống cập nhật lại badge khi mở màn hình và sau mỗi thao tác làm thay đổi trạng thái hồ sơ. |
| **II. Bộ lọc tìm kiếm và Danh sách hồ sơ** | | | | Chỉ hiển thị hồ sơ ở trạng thái "Chờ ký". Không hiển thị Thanh công cụ và cột Thao tác; Cán bộ chỉ được xem.<br>- Khối Bộ lọc tìm kiếm: Không hiển thị tiêu đề khối; mặc định hiển thị dạng mở rộng, cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên.<br>- Bảng danh sách: Không hiển thị tiêu đề phía trên bảng; Thanh công cụ (nếu có) đặt ở góc phải phía trên bảng. Cột Thao tác có độ rộng co theo số lượng nút hiển thị trên dòng. |
| Phiếu đăng ký | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43232-mh01---man-hinh-danh-sach-phieu-dang-ky-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Không hiển thị cột chọn dòng (Checkbox), Thanh công cụ và cột Thao tác. |
| Yêu cầu cung cấp thông tin | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách hồ sơ chờ duyệt - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Không hiển thị cột Thao tác. |
| Yêu cầu cung cấp bản sao | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách yêu cầu cung cấp bản sao chờ duyệt - Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_ban_sao_Can_bo.md#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Không hiển thị cột Thao tác. |
| **III. Badge trên Left Menu** | | | | |
| Badge menu "Hồ sơ đang chờ ký" | Integer(10) | Không | Theo dữ liệu hệ thống | Control UI: Badge số đếm màu cam, chỉ đọc, hiển thị bên phải tên menu con "Hồ sơ đang chờ ký" trên Left Menu.<br>- Giá trị bằng tổng số hồ sơ ở trạng thái "Chờ ký" của cả 03 nhóm nghiệp vụ, tức bằng tổng 03 Badge Tab nhóm nghiệp vụ tại màn hình này.<br>- Chỉ đếm hồ sơ thuộc đơn vị được phân công của Cán bộ đăng nhập; không phụ thuộc bộ lọc tìm kiếm đang nhập.<br>- Chỉ hiển thị badge khi giá trị lớn hơn 0; giá trị bằng 0 thì ẩn badge.<br>- Giá trị lớn hơn 99 hiển thị "99+".<br>- Hệ thống cập nhật lại badge ngay, không cần tải lại trang: khi mở màn hình và sau mỗi thao tác làm thay đổi trạng thái hồ sơ (Duyệt chờ ký, Trình ký, Từ chối, Hủy duyệt, Gửi duyệt, Cập nhật, Ký số, Trả lại). |

##### 4.3.2.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Tab nhóm nghiệp vụ | Tab | Hệ thống thực hiện:<br>+ Hiển thị Bộ lọc tìm kiếm và Danh sách hồ sơ "Chờ ký" tương ứng Tab nhóm nghiệp vụ đã chọn.<br>+ Đưa bộ lọc về mặc định và phân trang về Trang 1. |
| 2 | Click dòng dữ liệu | Row Click | Mở màn Xem chi tiết tương ứng Tab nhóm nghiệp vụ ở chế độ chỉ đọc, chỉ hiển thị nút "Đóng":<br>+ Phiếu đăng ký: [MH02 - Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43233-mh02---man-hinh-xem-chi-tiet-phieu-dang-ky)<br>+ Yêu cầu cung cấp thông tin: [MH05 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin](#43216-mh05---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-thong-tin).<br>+ Yêu cầu cung cấp bản sao: [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao). |

#### 4.3.2.1.4. MH03 - Màn hình Hồ sơ đã xử lý

##### 4.3.2.1.4.1. Màn hình

![Màn hình Hồ sơ đã xử lý](images/KTXL_MH03_Ho_so_da_xu_ly.png)

##### 4.3.2.1.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Tab nhóm nghiệp vụ** | | | | |
| Tab nhóm nghiệp vụ | Enum(String(50)) | Có | Phiếu đăng ký | Control UI: Tab, không hiển thị badge số lượng hồ sơ. Menu con "Hồ sơ đã xử lý" trên Left Menu cũng không hiển thị badge.<br>Gồm:<br>- Phiếu đăng ký<br>- Yêu cầu cung cấp thông tin<br>- Yêu cầu cung cấp bản sao |
| **II. Bộ lọc tìm kiếm và Danh sách hồ sơ** | | | | Chỉ hiển thị hồ sơ ở trạng thái "Hoàn thành" hoặc "Bị từ chối" <br> - Riêng Tab Yêu cầu cung cấp bản sao  hiển thị thêm hồ sơ ở trạng thái "Đã duyệt - chờ trả kết quả".<br>- Khối Bộ lọc tìm kiếm: Không hiển thị tiêu đề khối; mặc định hiển thị dạng mở rộng, cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên.<br>- Bảng danh sách: Không hiển thị tiêu đề phía trên bảng; Thanh công cụ (nếu có) đặt ở góc phải phía trên bảng. Cột Thao tác có độ rộng co theo số lượng nút hiển thị trên dòng. |
| Phiếu đăng ký | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách Phiếu đăng ký chờ duyệt - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43232-mh01---man-hinh-danh-sach-phieu-dang-ky-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Bổ sung bộ lọc Trạng thái xử lý gồm: <br> + Tất cả <br>+ Hoàn thành <br>+ Bị từ chối <br>- Không hiển thị cột chọn dòng (Checkbox), Thanh công cụ và cột Thao tác. |
| Yêu cầu cung cấp thông tin | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách hồ sơ chờ duyệt - Xử lý yêu cầu cung cấp thông tin - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_thong_tin_Can_bo.md#43222-mh01---man-hinh-danh-sach-ho-so-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Bổ sung bộ lọc Trạng thái xử lý gồm: <br> + Tất cả <br>+ Hoàn thành <br>+ Bị từ chối<br>- Không hiển thị cột Thao tác. |
| Yêu cầu cung cấp bản sao | - | - | - | Hiển thị giống [MH01 - Màn hình Danh sách yêu cầu cung cấp bản sao chờ duyệt - Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_ban_sao_Can_bo.md#43252-mh01---man-hinh-danh-sach-yeu-cau-cung-cap-ban-sao-cho-duyet), khác biệt:<br>- Không hiển thị tiêu đề phía trên bảng.<br>- Bổ sung bộ lọc Trạng thái xử lý gồm: <br> + Tất cả <br>+ Hoàn thành <br>+ Đã duyệt - chờ trả kết quả <br>+ Bị từ chối<br>- Cột Thao tác chỉ hiển thị nút "Xác nhận trả kết quả" với hồ sơ Bản sao giấy ở trạng thái "Đã duyệt - chờ trả kết quả". |
| Trạng thái xử lý | Enum(String(50)) | Không | Tất cả | Control UI: Combobox, thuộc Bộ lọc tìm kiếm.<br>Gồm:<br>- Tất cả<br>- Hoàn thành<br>- Bị từ chối<br>- Đã duyệt - chờ trả kết quả: chỉ hiển thị tại Tab Yêu cầu cung cấp bản sao |

##### 4.3.2.1.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn Tab nhóm nghiệp vụ | Tab | Hệ thống thực hiện:<br>+ Hiển thị Bộ lọc tìm kiếm và Danh sách hồ sơ đã xử lý tương ứng Tab nhóm nghiệp vụ đã chọn.<br>+ Đưa bộ lọc về mặc định và phân trang về Trang 1. |
| 2 | Click dòng dữ liệu | Row Click | Mở màn Xem chi tiết tương ứng Tab nhóm nghiệp vụ ở chế độ chỉ đọc, chỉ hiển thị nút "Đóng":<br>+ Phiếu đăng ký: [MH02 - Màn hình Xem chi tiết Phiếu đăng ký - Xử lý Phiếu đăng ký - Module Biện pháp bảo đảm](SRS_Xu_ly_Phieu_dang_ky_Can_bo.md#43233-mh02---man-hinh-xem-chi-tiet-phieu-dang-ky).<br>+ Yêu cầu cung cấp thông tin: [MH05 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin](#43216-mh05---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-thong-tin).<br>+ Yêu cầu cung cấp bản sao: [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao).<br>- Riêng hồ sơ ở trạng thái "Bị từ chối": màn Xem chi tiết hiển thị thêm Khối Thông tin từ chối theo mô tả tại màn Xem chi tiết tương ứng. |
| 3 | Xác nhận trả kết quả | Nút | Chỉ hiển thị tại Tab Yêu cầu cung cấp bản sao, với hồ sơ Bản sao giấy ở trạng thái "Đã duyệt - chờ trả kết quả". Xử lý giống chức năng Xác nhận trả kết quả tại [MH05 - Màn hình Danh sách và Xác nhận trả kết quả bản sao giấy - Xử lý yêu cầu cung cấp bản sao văn bản chứng nhận - Module Biện pháp bảo đảm](SRS_Xu_ly_Yeu_cau_cung_cap_ban_sao_Can_bo.md#43256-mh05---man-hinh-danh-sach-va-xac-nhan-tra-ket-qua-ban-sao-giay). |

<a id="43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao"></a>
#### 4.3.2.1.5. MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao

##### 4.3.2.1.5.1. Màn hình

![Màn hình Xem chi tiết yêu cầu cung cấp bản sao](images/KTXL_MH04_Xem_chi_tiet_yeu_cau_cung_cap_ban_sao.png)

##### 4.3.2.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **Thông tin yêu cầu cung cấp bản sao** | - | - | - | Toàn bộ dữ liệu chỉ đọc, không cho phép sửa. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Loại cung cấp bản sao | - | - | - | Control UI: Label dạng nhãn (Badge), chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Số lượng bản sao | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Loại cung cấp bản sao là "Bản sao giấy". |
| **Thông tin trả lại** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion) viền đỏ, đặt ngay dưới Khối Thông tin yêu cầu cung cấp bản sao.<br>- Hiển thị khi hồ sơ đang ở trạng thái "Bị trả lại", hoặc hồ sơ đã từng bị trả lại và được Cán bộ cập nhật, trình ký lại (hệ thống giữ lại vết lịch sử các lần trả lại trước đó).<br>- Mặc định mở rộng khi hồ sơ đang ở trạng thái "Bị trả lại"; mặc định thu gọn khi hồ sơ đã được trình ký lại.<br>- Liệt kê lần lượt các lần hồ sơ bị trả lại, sắp xếp theo Thời điểm trả lại giảm dần (lần gần nhất ở trên cùng); mỗi lần trả lại gồm các trường bên dưới.<br>- Toàn bộ dữ liệu chỉ đọc, không cho phép sửa. |
| Lý do trả lại | - | - | - | Control UI: Label, chỉ đọc, chữ màu đỏ.<br>- Hiển thị theo dữ liệu bản ghi. |
| Lãnh đạo trả lại | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Thời điểm trả lại | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Thời điểm trình ký lại | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm.<br>- Chỉ hiển thị khi hồ sơ đã được Cán bộ trình ký lại sau lần trả lại đó. |
| **Thông tin từ chối** | - | - | - | Control UI: Khối thông tin viền đỏ, chỉ đọc, đặt ngay dưới Khối Thông tin yêu cầu cung cấp bản sao.<br>- Chỉ hiển thị khi hồ sơ ở trạng thái "Bị từ chối".<br>- Toàn bộ dữ liệu chỉ đọc, không cho phép sửa. |
| Lý do từ chối | - | - | - | Control UI: Label, chỉ đọc, chữ màu đỏ.<br>- Hiển thị theo dữ liệu bản ghi. |
| Người từ chối | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Họ tên Cán bộ hoặc Lãnh đạo đã thực hiện từ chối. |
| Thời điểm từ chối | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Lãnh đạo ký văn bản từ chối | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi văn bản từ chối được trình Lãnh đạo ký. |
| Văn bản từ chối đã ký | - | - | - | Control UI: Link "Xem file", chỉ đọc.<br>- Hiển thị file Thông báo/Văn bản từ chối đã được Lãnh đạo ký số.<br>- Chỉ hiển thị khi hồ sơ có văn bản từ chối đã ký. |
| Tài liệu đính kèm lý do từ chối | - | - | - | Control UI: Link "Xem file", chỉ đọc.<br>- Hiển thị tài liệu Cán bộ đính kèm khi từ chối (đối với hồ sơ giấy).<br>- Chỉ hiển thị khi có tài liệu đính kèm. |
| **Kết quả tra cứu** | - | - | - | Control UI: Khối hiển thị nổi bật, chỉ đọc, đặt dưới khối Thông tin yêu cầu cung cấp bản sao (hoặc dưới Thông tin trả lại / Thông tin từ chối nếu có).<br>- Khối có khung viền riêng; dòng tiêu đề "Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]" in đậm trên nền màu nhấn để Cán bộ nhận biết ngay hồ sơ gốc cần cấp bản sao.<br>- Hiển thị dữ liệu hồ sơ gốc đã tra cứu theo Số đăng ký tại bước xử lý; hệ thống không tra cứu lại, Cán bộ không phải bấm "Tra cứu".<br>- Gồm lần lượt các thông tin và khối bên dưới: thông tin chung của hồ sơ, Thông tin đăng ký, Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm. |
| Loại hình giao dịch | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Loại biện pháp | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Loại hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Trường hợp đăng ký | - | - | - | Control UI: Label in đậm, viết hoa, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Trạng thái | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Số hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Ngày có hiệu lực của hợp đồng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| **Thông tin đăng ký** | - | - | - | |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Thời điểm có hiệu lực | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| **Bên bảo đảm** | - | - | - | Control UI: Bảng dữ liệu (Grid), chỉ đọc. |
| Cột: Loại chủ thể | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Cột: Số giấy tờ chứng minh tư cách pháp lý | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Cột: Tên | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Cột: Địa chỉ | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| **Bên nhận bảo đảm** | - | - | - | Control UI: Bảng dữ liệu (Grid), chỉ đọc. |
| Cột: Tên | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Cột: Địa chỉ | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| **Tài sản bảo đảm** | - | - | - | Hiển thị lần lượt từng tài sản bảo đảm của hồ sơ gốc. |
| Loại tài sản | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Mô tả | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Bảng thông tin Số khung | - | - | - | Control UI: Bảng dữ liệu (Grid), chỉ đọc.<br>- Gồm các cột: Tên phương tiện, Nhãn hiệu, màu sơn, Số khung, Số máy, Biển số.<br>- Hiển thị theo dữ liệu bản ghi. |
| Bảng thông tin Phương tiện | - | - | - | Control UI: Bảng dữ liệu (Grid), chỉ đọc.<br>- Gồm các cột: Tên phương tiện, nhãn hiệu; Tên/Họ tên chủ phương tiện/Chủ sở hữu; Số đăng ký; Cơ quan cấp giấy chứng nhận; Cấp phương tiện.<br>- Hiển thị theo dữ liệu bản ghi. |
| Tên quyền | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Căn cứ phát sinh quyền | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Hàng hóa luân chuyển / Kho hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Giá trị hàng hóa/Tên, loại hàng hóa | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Địa chỉ kho hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Bảng thông tin Thời điểm đăng ký biện pháp bảo đảm bằng chứng khoán đã đăng ký tập trung | - | - | - | Control UI: Bảng dữ liệu (Grid), chỉ đọc.<br>- Gồm các cột: Giờ, Phút, Ngày, Tháng, Năm.<br>- Hiển thị theo dữ liệu bản ghi. |
| **V. Thanh nút chức năng** | - | - | - | Control UI: Thanh nút cố định (Sticky) ở cuối màn hình, luôn hiển thị kể cả khi nội dung ngắn hoặc khi cuộn trang.<br>- Nút hiển thị theo Tab trạng thái đã mở màn hình.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thu gọn/Mở rộng Thông tin trả lại | Click tiêu đề khối | Áp dụng khi Khối II. Thông tin trả lại được hiển thị.<br>TH1 (Khối đang mở rộng): Hệ thống thu gọn Khối II. Thông tin trả lại.<br><br>TH2 (Khối đang thu gọn): Hệ thống mở rộng Khối II. Thông tin trả lại, hiển thị đầy đủ các lần bị trả lại. |
| 2 | Xem file | Link | Áp dụng tại Khối III. Thông tin từ chối. Cho phép xem file tại một tab riêng. |
| **Nếu mở từ: Tab Hồ sơ duyệt chờ ký** | | | |
| 3 | Trình ký | Nút | Thực hiện giống chức năng Trình ký (Icon trên dòng) tại Tab Hồ sơ duyệt chờ ký - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly). |
| 4 | Hủy duyệt | Nút | Thực hiện giống chức năng Hủy duyệt (Icon trên dòng) tại Tab Hồ sơ duyệt chờ ký - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly), sau đó đóng màn hình và tải lại danh sách. |
| 5 | Từ chối | Nút | Thực hiện giống chức năng Từ chối (Icon trên dòng) tại Tab Hồ sơ duyệt chờ ký - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly). |
| 6 | Đóng | Nút | Đóng màn hình, quay về danh sách Tab Hồ sơ duyệt chờ ký - Yêu cầu cung cấp bản sao, giữ nguyên bộ lọc. |
| **Nếu mở từ: Tab Hồ sơ Bị trả lại** | | | |
| 7 | Cập nhật | Nút | Thực hiện giống chức năng Cập nhật (Icon trên dòng) tại Tab Hồ sơ Bị trả lại - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly). |
| 8 | Từ chối | Nút | Thực hiện giống chức năng Từ chối tại [MH01 - Màn hình Danh sách hồ sơ chờ nhập liệu - Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao - Module Biện pháp bảo đảm](SRS_Nhap_lieu_ho_so_giay_Yeu_cau_cung_cap_ban_sao_Can_bo.md#432182-mh01---man-hinh-danh-sach-ho-so-cho-nhap-lieu), áp dụng cho hồ sơ đang ở trạng thái "Bị trả lại". |
| 9 | Đóng | Nút | Đóng màn hình, quay về danh sách Tab Hồ sơ Bị trả lại - Yêu cầu cung cấp bản sao, giữ nguyên bộ lọc. |
| **Nếu mở từ: Màn hình Hồ sơ đang chờ ký hoặc Hồ sơ đã xử lý** | | | |
| 10 | Đóng | Nút | Màn hình ở chế độ chỉ đọc, chỉ hiển thị nút Đóng. Đóng màn hình, quay về danh sách đã mở màn hình, giữ nguyên bộ lọc. |

<a id="43216-mh05---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-thong-tin"></a>
#### 4.3.2.1.6. MH05 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin

##### 4.3.2.1.6.1. Màn hình

![Màn hình Xem chi tiết yêu cầu cung cấp thông tin](images/KTXL_MH05_Xem_chi_tiet_yeu_cau_cung_cap_thong_tin.png)

##### 4.3.2.1.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :---: | :--- | :--- |
| **I. Thông tin chung** | - | - | - | Control UI: Khối thu gọn/mở rộng (Accordion), đặt trên cùng, phía trên Khối IV. Khối tra cứu.<br>- Mặc định hiển thị dạng thu gọn: chỉ hiển thị dòng tiêu đề khối kèm Mã hồ sơ và Trạng thái; Cán bộ bấm vào tiêu đề khối để mở rộng xem đầy đủ thông tin.<br>- Toàn bộ dữ liệu chỉ đọc, không cho phép sửa. |
| Mã hồ sơ | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Mã khách hàng | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Người yêu cầu | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Địa chỉ | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Hiển thị đầy đủ theo thứ tự: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia. |
| Thời điểm đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Định dạng hiển thị: dd/mm/yyyy hh:mm. |
| Trạng thái | - | - | - | Control UI: Label dạng nhãn trạng thái (Badge), chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| **II. Thông tin trả lại** | - | - | - | Hiển thị và xử lý giống khối **II. Thông tin trả lại** tại [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao), đặt ngay dưới Khối I.<br>- Hiển thị khi hồ sơ đang ở trạng thái "Bị trả lại", hoặc hồ sơ đã từng bị trả lại và được trình ký lại (giữ lại vết lịch sử các lần trả lại trước đó). |
| **III. Thông tin từ chối** | - | - | - | Hiển thị và xử lý giống khối **III. Thông tin từ chối** tại [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao), đặt ngay dưới Khối I.<br>- Chỉ hiển thị khi hồ sơ ở trạng thái "Bị từ chối". |
| **IV. Khối tra cứu** | - | - | - | Toàn bộ dữ liệu chỉ đọc, không cho phép sửa. |
| Tiêu chí yêu cầu cung cấp thông tin | - | - | - | Control UI: Segmented control, chỉ đọc (segment theo hồ sơ tô nổi bật, các segment còn lại mờ).<br>- Hiển thị theo dữ liệu bản ghi. |
| Số đăng ký | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Tiêu chí là "Số đăng ký". |
| Loại chủ thể | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm". |
| Số giấy tờ theo Loại chủ thể | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi (Số CMND/CCCD/Chứng minh quân đội, Mã số thuế, Số Hộ chiếu, Tên tổ chức hoặc Số thẻ cư trú tương ứng Loại chủ thể).<br>- Chỉ hiển thị khi Tiêu chí là "Bên bảo đảm". |
| Số khung | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi Tiêu chí là "Số khung". |
| **V. Kết quả tra cứu** | - | - | - | Control UI: Khối hiển thị nổi bật, chỉ đọc, đặt ngay dưới Khối IV.<br>- Hiển thị kết quả tra cứu đã lưu vào hồ sơ ở lần xử lý trước; hệ thống không tra cứu lại, Cán bộ không phải bấm "Tra cứu". |
| Thời điểm tra cứu | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Tiêu chí tra cứu thực tế | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Dữ liệu đầu vào tra cứu | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi. |
| Thông báo không có dữ liệu | - | - | - | Control UI: Khung cảnh báo Inline, chỉ đọc.<br>- Chỉ hiển thị khi kết quả tra cứu đã lưu không có dữ liệu, nội dung [MSG-WRN-CCTT-001]. |
| Tổng số hồ sơ phù hợp | - | - | - | Control UI: Label, chỉ đọc.<br>- Hiển thị theo dữ liệu bản ghi.<br>- Chỉ hiển thị khi kết quả tra cứu có dữ liệu. |
| Danh sách hồ sơ đăng ký giao dịch bảo đảm/hợp đồng tìm thấy | - | - | - | Control UI: Khối danh sách, chỉ đọc.<br>- Chỉ hiển thị khi kết quả tra cứu có dữ liệu.<br>- Hiển thị lần lượt từng hồ sơ theo Thời điểm đăng ký tăng dần, dòng tiêu đề mỗi hồ sơ gồm "Hồ sơ [n]", "Đăng ký giao dịch bảo đảm / Hợp đồng - [Số đăng ký]" và nhãn Trường hợp đăng ký.<br>- Chi tiết mỗi hồ sơ hiển thị giống Khối Kết quả tra cứu tại [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao). |
| **VI. Thanh nút chức năng** | - | - | - | Control UI: Thanh nút cố định (Sticky) ở cuối màn hình, luôn hiển thị kể cả khi nội dung ngắn hoặc khi cuộn trang.<br>- Nút hiển thị theo Tab trạng thái đã mở màn hình.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.1.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thu gọn/Mở rộng Thông tin chung | Click tiêu đề khối | Áp dụng khi mở từ cả hai Tab.<br>TH1 (Khối đang thu gọn): Hệ thống mở rộng Khối I. Thông tin chung, hiển thị đầy đủ các trường thông tin.<br><br>TH2 (Khối đang mở rộng): Hệ thống thu gọn Khối I. Thông tin chung về dạng mặc định. |
| 2 | Thu gọn/Mở rộng Thông tin trả lại | Click tiêu đề khối | Hiển thị và xử lý giống chức năng Thu gọn/Mở rộng Thông tin trả lại tại [MH04 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao](#43215-mh04---man-hinh-xem-chi-tiet-yeu-cau-cung-cap-ban-sao). |
| 3 | Xem file | Link | Áp dụng tại Khối III. Thông tin từ chối. Cho phép xem file tại một tab riêng. |
| **Nếu mở từ: Tab Hồ sơ duyệt chờ ký** | | | |
| 4 | Trình ký | Nút | Thực hiện giống chức năng Trình ký (Icon trên dòng) tại Tab Hồ sơ duyệt chờ ký - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly). |
| 5 | Hủy duyệt | Nút | Thực hiện giống chức năng Hủy duyệt (Icon trên dòng) tại Tab Hồ sơ duyệt chờ ký - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly), sau đó đóng màn hình và tải lại danh sách. |
| 6 | Từ chối | Nút | Thực hiện giống chức năng Từ chối (Icon trên dòng) tại Tab Hồ sơ duyệt chờ ký - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly). |
| 7 | Đóng | Nút | Đóng màn hình, quay về danh sách Tab Hồ sơ duyệt chờ ký - Yêu cầu cung cấp thông tin, giữ nguyên bộ lọc. |
| **Nếu mở từ: Tab Hồ sơ Bị trả lại** | | | |
| 8 | Cập nhật | Nút | Thực hiện giống chức năng Cập nhật (Icon trên dòng) tại Tab Hồ sơ Bị trả lại - [MH01 - Màn hình Hồ sơ chờ xử lý](#43212-mh01---man-hinh-ho-so-cho-xu-ly). |
| 9 | Đóng | Nút | Đóng màn hình, quay về danh sách Tab Hồ sơ Bị trả lại - Yêu cầu cung cấp thông tin, giữ nguyên bộ lọc. |
| **Nếu mở từ: Màn hình Hồ sơ đang chờ ký hoặc Hồ sơ đã xử lý** | | | |
| 10 | Đóng | Nút | Màn hình ở chế độ chỉ đọc, chỉ hiển thị nút Đóng. Đóng màn hình, quay về danh sách đã mở màn hình, giữ nguyên bộ lọc. |
