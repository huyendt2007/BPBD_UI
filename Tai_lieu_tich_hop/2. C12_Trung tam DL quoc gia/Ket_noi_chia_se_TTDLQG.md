# TÀI LIỆU KẾT NỐI, CHIA SẺ DỮ LIỆU VỚI TRUNG TÂM DỮ LIỆU QUỐC GIA (TTDLQG)
## Đồng bộ danh mục dùng chung - Hệ thống Đăng ký biện pháp bảo đảm và Bồi thường nhà nước

---

<a id="ttdlqg-danh-muc"></a>
## 1. Danh mục đồng bộ

- Nguồn: [Danh sách API chia sẻ - Tài liệu tích hợp C12 Trung tâm dữ liệu quốc gia](20261030_Danh%20s%C3%A1ch%20API%20chia%20s%E1%BA%BB.xlsx), sheet `API chia sẻ & Đối soát`.
- Mỗi danh mục dùng 02 link cùng dòng: cột `API chia sẻ qua LGSP` (lấy dữ liệu), cột `API đối soát qua LGSP` (gửi tổng số bản ghi nhận được).
- Thông tin kết nối (link, khóa xác thực) lấy theo file nguồn; không chép vào tài liệu, mã nguồn công khai.

| STT | Danh mục hệ thống | Dòng trong sheet (`Tên dịch vụ chia sẻ` / `Mã định danh API`) | Màn hình thực hiện đồng bộ |
| :-- | :--- | :--- | :--- |
| 1 | Quốc tịch / Quốc gia [DM_09] | `Danh mục Quốc Gia` / `danhmucquocgia` | [Đồng bộ từ TTDLQG - Quản lý danh mục dùng chung (Master Data) - Quản trị hệ thống (Website Quản trị)](../../Tai_lieu_SRS/03_Website_Quan_tri/01_Quan_tri_he_thong/Quan_ly_danh_muc.md) |
| 2 | Loại giấy tờ pháp lý [DM_10] | `Danh mục Loại giấy tờ tùy thân` / `loaigiaytotuythan` | [Đồng bộ từ TTDLQG - Quản lý danh mục dùng chung (Master Data) - Quản trị hệ thống (Website Quản trị)](../../Tai_lieu_SRS/03_Website_Quan_tri/01_Quan_tri_he_thong/Quan_ly_danh_muc.md) |
| 3 | Giới tính [DM_23] | `Danh mục Giới tính` / `danhmucgioitinh` | [Đồng bộ từ TTDLQG - Quản lý danh mục dùng chung (Master Data) - Quản trị hệ thống (Website Quản trị)](../../Tai_lieu_SRS/03_Website_Quan_tri/01_Quan_tri_he_thong/Quan_ly_danh_muc.md) |
| 4 | Trạng thái của công dân [DM_59] | `Trạng thái của công dân` / `LoaiTrangThai` | [Đồng bộ từ TTDLQG - Quản lý danh mục dùng chung (Master Data) - Quản trị hệ thống (Website Quản trị)](../../Tai_lieu_SRS/03_Website_Quan_tri/01_Quan_tri_he_thong/Quan_ly_danh_muc.md) |
| 5 | Danh mục địa bàn (Tỉnh/Thành phố → Phường/Xã) | `Danh mục Địa bàn hành chính` / `diabanhanhchinh` | [Đồng bộ từ TTDLQG - Quản lý danh mục Địa bàn - Quản trị hệ thống (Website Quản trị)](../../Tai_lieu_SRS/03_Website_Quan_tri/01_Quan_tri_he_thong/Quan_ly_danh_muc_dia_ban.md) |

---

<a id="ttdlqg-cac-buoc"></a>
## 2. Các bước đồng bộ

- Kích hoạt: Quản trị hệ thống bấm nút `Đồng bộ từ TTDLQG` trên màn hình tương ứng tại mục 1.
- Mỗi lần bấm đồng bộ 01 danh mục.

| Bước | Xử lý |
| :--- | :--- |
| 1 | Gọi link tại cột `API chia sẻ qua LGSP` của dòng danh mục, lấy toàn bộ bản ghi. |
| 2 | Thêm mới bản ghi chưa có trên hệ thống; cập nhật bản ghi đã có, đối chiếu theo mã bản ghi trên TTDLQG. |
| 3 | Bản ghi có trên hệ thống nhưng không còn trong dữ liệu TTDLQG: không xóa, chuyển sang ngừng hoạt động. |
| 4 | Gọi link tại cột `API đối soát qua LGSP` cùng dòng, gửi tổng số bản ghi nhận được ở bước 1. |
| 5 | Cập nhật `Đồng bộ lần cuối` của danh mục, ghi Audit Log. |

- Tổng số gửi ở bước 4 phải đúng số bản ghi nhận được ở bước 1 (theo cột `Ghi chú` của file nguồn).

---

<a id="ttdlqg-xu-ly-loi"></a>
## 3. Xử lý lỗi

- Lỗi kết nối hoặc TTDLQG trả về lỗi ở bước 1: dừng đồng bộ, giữ nguyên dữ liệu hiện có, không thực hiện bước 2 đến bước 5; màn hình hiển thị [MSG-ERR-SYS-002].
- Lỗi ở bước 4 (gửi đối soát): giữ dữ liệu đã cập nhật ở bước 2, bước 3; vẫn thực hiện bước 5; màn hình hiển thị [MSG-WRN-SYS-003]; Quản trị hệ thống bấm lại `Đồng bộ từ TTDLQG` để đồng bộ và gửi lại đối soát.

---

<a id="ttdlqg-luu-y"></a>
## 4. Lưu ý

- Loại giấy tờ pháp lý [DM_10]: giá trị `Mã số thuế` là giá trị bổ sung của hệ thống, không đồng bộ; bước 2, bước 3 không thay đổi giá trị này.
- Trạng thái của công dân [DM_59]: theo cột `Ghi chú` của file nguồn, hiện chỉ có dữ liệu của Hà Nội.
- Giá trị của các danh mục đồng bộ chỉ xem trên hệ thống: không Thêm mới, Sửa, Xóa, đổi trạng thái (trừ `Mã số thuế` của [DM_10]).
