### 4.3.3.5. Quản lý xem xét trách nhiệm hoàn trả

#### 4.3.3.5.1. Mục đích

Cho phép quản lý toàn diện tiến trình xem xét, xác định và thực hiện nghĩa vụ hoàn trả kinh phí bồi thường của người thi hành công vụ có lỗi gây thiệt hại trên Website Quản trị, từ thời điểm vụ việc bồi thường nhà nước hoàn thành chi trả đến khi thu hồi đủ tiền vào ngân sách nhà nước (bao gồm: thành lập Hội đồng hoàn trả, ghi nhận quá trình làm việc và kết luận/kiến nghị của Hội đồng, ban hành Quyết định hoàn trả, theo dõi đôn đốc thu hồi tiền, miễn hoàn trả, giảm mức hoàn trả, đình chỉ việc xem xét trách nhiệm hoàn trả).

*a. Phân quyền*

\- Người dùng được phân quyền chức năng `Xem xét trách nhiệm hoàn trả` thực hiện thao tác trên hồ sơ theo:
  + Phạm vi dữ liệu tại [Phạm vi dữ liệu theo đơn vị - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-pham-vi-du-lieu).
  + Trạng thái chi tiết của phần việc tại [Thao tác theo trạng thái - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-thao-tac-trang-thai).

\- `Ký duyệt`, `Từ chối`: Lãnh đạo được giao tại cấp hiện hành theo luồng của đơn vị ban hành văn bản tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).

<a id="ht-phan-quyen-stp"></a>
\- Sở Tư pháp quản lý đơn vị có cán bộ gây sai phạm:
  + Được ghi nhận nộp tiền hoàn trả và cập nhật trả lại tiền cho cán bộ trong phạm vi dữ liệu.
  + Không được thực hiện `Miễn hoàn trả`, `Giảm mức hoàn trả`, `Đình chỉ`.

\- Cán bộ tra cứu: chỉ xem danh sách, chi tiết hồ sơ trong phạm vi dữ liệu và kết xuất Excel; không thực hiện thao tác tác nghiệp.

<a id="ht-pham-vi-du-lieu"></a>
<a id="ht-nguyen-tac-don-vi"></a>
\- **Phạm vi dữ liệu theo đơn vị**:
  + Mỗi vụ việc có 01 hồ sơ hoàn trả (`HT-`) dùng chung cho các đơn vị.
  + Khi chốt ý kiến của Hội đồng, danh sách cán bộ gây sai phạm được phân tách thành phần đơn vị theo `Đơn vị công tác` của cán bộ; không sinh mã hồ sơ mới.
  + Đơn vị tạo Hội đồng (đơn vị lập hồ sơ): hiển thị hồ sơ từ khi khởi tạo; toàn bộ phần đơn vị, cán bộ và văn bản của hồ sơ.
  + Đơn vị quản lý cán bộ gây sai phạm: hiển thị hồ sơ từ khi hồ sơ chuyển `Chờ ban hành QĐ hoàn trả`; chỉ hiển thị cán bộ thuộc đơn vị và ý kiến của Hội đồng đối với các cán bộ đó; Bước 1, Bước 2 chỉ xem.
  + Sở Tư pháp quản lý đơn vị có cán bộ gây sai phạm: hiển thị hồ sơ sau khi đơn vị ban hành Quyết định hoàn trả (Lãnh đạo cấp cuối `Ký duyệt` hoặc ban hành Ký ngoài); chỉ hiển thị cán bộ của đơn vị đó và các Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả, đình chỉ của các cán bộ đó.
  + Đơn vị vừa tạo Hội đồng vừa quản lý cán bộ gây sai phạm: theo phạm vi của đơn vị tạo Hội đồng.
  + Lãnh đạo: theo phạm vi của đơn vị công tác; hồ sơ `Chờ duyệt` hiển thị thao tác với Lãnh đạo được giao tại cấp hiện hành.
  + Số liệu tiền và tiến độ thu hồi: tổng hợp theo cán bộ trong phạm vi dữ liệu của người dùng (đơn vị tạo Hội đồng: tổng mọi đơn vị).
  + `Mã hồ sơ GQBT` hiển thị liên kết mở hồ sơ Giải quyết yêu cầu bồi thường chỉ khi đơn vị của người dùng là cơ quan giải quyết yêu cầu bồi thường của hồ sơ GQBT; trường hợp khác hiển thị dạng văn bản.

<a id="ht-trang-thai"></a>
\- **Trạng thái hồ sơ hoàn trả**: gồm 02 tầng:
  + Trạng thái chi tiết: theo từng phần việc (hồ sơ, phần đơn vị, cán bộ); chỉ hiển thị tại màn hình chi tiết.
  + Trạng thái chung: hiển thị tại badge cột `Trạng thái` và bộ lọc `Trạng thái` của danh sách; tổng hợp từ trạng thái chi tiết trong phạm vi dữ liệu của người dùng theo [Quy tắc tổng hợp trạng thái chung - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-trang-thai-chung).

| Phần việc | Trạng thái chi tiết | Nhóm trạng thái chung | Mô tả |
| :--- | :--- | :--- | :--- |
| Hồ sơ | Hồ sơ nháp (không hiển thị trạng thái) | Chờ xử lý | Mới khởi tạo, chưa trình/ban hành Quyết định thành lập Hội đồng. |
| Hồ sơ | Chờ duyệt (Loại trình `Thành lập hội đồng`) | Đang xử lý | Đã trình ký Quyết định thành lập Hội đồng. |
| Hồ sơ | Bị từ chối (Loại trình `Thành lập hội đồng`) | Chờ xử lý | Lãnh đạo từ chối; chờ trình ký lại. |
| Hồ sơ | Họp hội đồng | Chờ xử lý | Quyết định thành lập Hội đồng đã ban hành; chờ cập nhật ý kiến của Hội đồng. |
| Hồ sơ | Chờ duyệt (Loại trình `QĐ đình chỉ`) | Đang xử lý | Đã trình ký Quyết định đình chỉ trước khi chốt ý kiến của Hội đồng. |
| Hồ sơ | Bị từ chối (Loại trình `QĐ đình chỉ`) | Chờ xử lý | Lãnh đạo từ chối; chờ trình ký lại. |
| Hồ sơ | Đình chỉ xem xét hoàn trả | Đình chỉ xem xét hoàn trả | Quyết định đình chỉ được ban hành trước khi chốt ý kiến của Hội đồng; áp dụng toàn bộ hồ sơ. |
| Phần đơn vị | Chờ ban hành QĐ hoàn trả | Chờ xử lý | Ý kiến của Hội đồng đã chốt; đơn vị chưa trình/ban hành Quyết định hoàn trả. |
| Phần đơn vị | Chờ duyệt (Loại trình `QĐ hoàn trả`) | Đang xử lý | Đơn vị đã trình ký Quyết định hoàn trả. |
| Phần đơn vị | Bị từ chối (Loại trình `QĐ hoàn trả`) | Chờ xử lý | Lãnh đạo từ chối; chờ trình ký lại. |
| Cán bộ | Chờ ban hành QĐ Miễn hoàn trả | Chờ xử lý | Quyết định hoàn trả đã ban hành; ý kiến của Hội đồng là `Miễn hoàn trả`. |
| Cán bộ | Chờ ban hành QĐ Giảm mức hoàn trả | Chờ xử lý | Quyết định hoàn trả đã ban hành; ý kiến của Hội đồng là `Giảm mức hoàn trả`. |
| Cán bộ | Chờ duyệt (Loại trình `QĐ miễn hoàn trả`, `QĐ giảm mức hoàn trả`, `QĐ đình chỉ`) | Đang xử lý; trình khi cán bộ đang `Thu hồi tiền hoàn trả`: Thu hồi tiền hoàn trả | Đã trình ký Quyết định đối với cán bộ. |
| Cán bộ | Bị từ chối (Loại trình `QĐ miễn hoàn trả`, `QĐ giảm mức hoàn trả`, `QĐ đình chỉ`) | Chờ xử lý; trình khi cán bộ đang `Thu hồi tiền hoàn trả`: Thu hồi tiền hoàn trả | Lãnh đạo từ chối; chờ trình ký lại. |
| Cán bộ | Thu hồi tiền hoàn trả | Thu hồi tiền hoàn trả | Số tiền còn phải thu lớn hơn 0. |
| Cán bộ | Miễn hoàn trả | Miễn hoàn trả | Quyết định miễn hoàn trả được ban hành; kết thúc. |
| Cán bộ | Hoàn thành | Hoàn thành | Đã thu đủ số tiền phải hoàn trả; kết thúc. |
| Cán bộ | Chờ trả lại tiền (Loại `Đình chỉ hoàn trả`) | Thu hồi tiền hoàn trả | Quyết định đình chỉ đối với cán bộ đã ban hành, phương án `Hoàn trả lại số tiền đã thu cho cán bộ`; dòng phụ của trạng thái `Thu hồi tiền hoàn trả`; chờ cập nhật trả lại tiền. |
| Cán bộ | Đình chỉ hoàn trả | Đình chỉ xem xét hoàn trả | Quyết định đình chỉ đối với cán bộ được ban hành tại Bước 2 (đình chỉ một phần cán bộ) hoặc sau khi chốt ý kiến của Hội đồng (và đã cập nhật trả lại tiền khi chọn phương án hoàn trả lại); kết thúc. |

  + Trạng thái phần đơn vị áp dụng cho từng cán bộ của đơn vị đến khi Quyết định hoàn trả của đơn vị được ban hành; cán bộ `Đình chỉ hoàn trả` không áp dụng.
  + Phần đơn vị có toàn bộ cán bộ `Đình chỉ hoàn trả` trước khi ban hành Quyết định hoàn trả: phần đơn vị hiển thị `Đình chỉ hoàn trả`, không ban hành Quyết định hoàn trả.
  + Thuật ngữ: `Đình chỉ hoàn trả` là trạng thái chi tiết của cán bộ; `Đình chỉ xem xét hoàn trả` là trạng thái chi tiết của hồ sơ (đình chỉ cả hồ sơ trước khi chốt ý kiến của Hội đồng) và là trạng thái chung.
  + Nhãn `Hoãn hoàn trả`: nhãn theo từng cán bộ, không phải trạng thái; hiển thị cạnh họ tên cán bộ khi cán bộ trong thời hạn hoãn; không ảnh hưởng trạng thái chung.

<a id="ht-trang-thai-chung"></a>
\- **Quy tắc tổng hợp trạng thái chung**:
  + Trạng thái chung gồm: `Chờ duyệt`, `Bị từ chối`, `Chờ xử lý`, `Đang xử lý`, `Thu hồi tiền hoàn trả`, `Miễn hoàn trả`, `Hoàn thành`, `Đình chỉ xem xét hoàn trả`.
  + TH1 - Trước khi chốt ý kiến của Hội đồng, hồ sơ `Chờ duyệt` / `Bị từ chối` (Loại trình `Thành lập hội đồng` hoặc `QĐ đình chỉ` cả hồ sơ): badge `Chờ duyệt` / `Bị từ chối`, dưới badge 01 dòng Loại trình `QĐ thành lập hội đồng` / `QĐ đình chỉ` (ngoại lệ của quy tắc chỉ 01 badge).
  + Hồ sơ nháp, `Họp hội đồng`: `Chờ xử lý`; `Đình chỉ xem xét hoàn trả`: `Đình chỉ xem xét hoàn trả`.
  + Sau khi chốt ý kiến của Hội đồng: xét các cán bộ trong phạm vi dữ liệu của người dùng theo thứ tự dưới đây, lấy giá trị đầu tiên thỏa mãn.
  + Ưu tiên 1 - Trạng thái đích (toàn bộ cán bộ đã kết thúc): toàn bộ `Đình chỉ hoàn trả`: `Đình chỉ xem xét hoàn trả`; toàn bộ `Miễn hoàn trả`: `Miễn hoàn trả`; trường hợp còn lại (thu đủ, miễn, đình chỉ kết hợp): `Hoàn thành`.
  + Ưu tiên 2 - TH4: có ít nhất 01 cán bộ `Thu hồi tiền hoàn trả` (chưa thu hết): `Thu hồi tiền hoàn trả`.
  + Ưu tiên 3 - TH3: có ít nhất 01 đơn vị đang trình / `Chờ duyệt` hoặc đã ban hành Quyết định hoàn trả, hoặc có cán bộ đang trình Quyết định miễn, giảm, đình chỉ: `Đang xử lý`.
  + Ưu tiên 4 - TH2: toàn bộ đơn vị `Chờ ban hành QĐ hoàn trả` hoặc `Bị từ chối` (Loại trình `QĐ hoàn trả`), chưa đơn vị nào trình / ban hành: `Chờ xử lý`.
  + Badge `Trạng thái` đầu màn hình chi tiết hồ sơ áp dụng cùng quy tắc với cột `Trạng thái` của danh sách, theo phạm vi dữ liệu của người xem.

<a id="ht-thao-tac-trang-thai"></a>
\- **Thao tác theo trạng thái** (thống nhất trên bản ghi; người dùng thực hiện với phần việc trong phạm vi dữ liệu, theo phân quyền):

| Phần việc | Trạng thái chi tiết | Thao tác |
| :--- | :--- | :--- |
| Hồ sơ | Hồ sơ nháp | Cập nhật (thành lập Hội đồng), Xóa |
| Hồ sơ | Chờ duyệt (Loại trình `Thành lập hội đồng`) | Đình chỉ (cả hồ sơ; đơn vị tạo Hội đồng) |
| Hồ sơ | Bị từ chối (Loại trình `Thành lập hội đồng`) | Cập nhật (trình ký lại), Đình chỉ (cả hồ sơ; đơn vị tạo Hội đồng) |
| Hồ sơ | Họp hội đồng | Cập nhật (ý kiến của Hội đồng), Đình chỉ (cả hồ sơ hoặc một phần cán bộ; đơn vị tạo Hội đồng) |
| Hồ sơ | Bị từ chối (Loại trình `QĐ đình chỉ`) | Trình ký lại |
| Phần đơn vị | Chờ ban hành QĐ hoàn trả | Cập nhật (trình ký/ban hành Quyết định hoàn trả) |
| Phần đơn vị | Bị từ chối (Loại trình `QĐ hoàn trả`) | Cập nhật (trình ký lại) |
| Cán bộ | Chờ ban hành QĐ hoàn trả, Bị từ chối (Loại trình `QĐ hoàn trả`) | Đình chỉ (chọn cán bộ) |
| Cán bộ | Chờ ban hành QĐ Miễn hoàn trả, Chờ ban hành QĐ Giảm mức hoàn trả | Cập nhật (trình ký/ban hành Quyết định miễn hoàn trả, giảm mức hoàn trả), Đình chỉ (chọn cán bộ) |
| Cán bộ | Bị từ chối (Loại trình `QĐ miễn hoàn trả`, `QĐ giảm mức hoàn trả`) | Cập nhật (trình ký lại), Đình chỉ (chọn cán bộ) |
| Cán bộ | Bị từ chối (Loại trình `QĐ đình chỉ`) | Trình ký lại Quyết định đình chỉ |
| Cán bộ | Thu hồi tiền hoàn trả | Thu hồi (ghi nhận nộp tiền, cập nhật trả lại tiền, Miễn hoàn trả, Giảm mức hoàn trả), Đình chỉ (chọn cán bộ; không có số tiền cần trả lại) |
| Cán bộ | Chờ trả lại tiền (Loại `Đình chỉ hoàn trả`) | Cập nhật trả lại tiền |
| Hồ sơ, Phần đơn vị, Cán bộ | Chờ duyệt (mọi Loại trình) | Ký duyệt, Từ chối |
| Cán bộ | Miễn hoàn trả, Hoàn thành, Đình chỉ hoàn trả | Chỉ xem |

  + Sở Tư pháp: không có thao tác `Đình chỉ`, `Miễn hoàn trả`, `Giảm mức hoàn trả` theo [Phân quyền Sở Tư pháp - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-phan-quyen-stp).
  + Cán bộ `Chờ duyệt` (mọi Loại trình) hoặc có trình ký Quyết định đình chỉ chưa ban hành: không được chọn đình chỉ.

<a id="ht-can-le-bang"></a>
\- **Quy tắc căn lề bảng** (mọi bảng của module, gồm lưới danh sách và các bảng tại màn hình chi tiết):
  + Cột số tiền (`Tiền hoàn trả`, `Số tiền cần hoàn trả`, `Số tiền sau giảm`, `Số tiền phải hoàn trả`, `Đã nộp`, `Đã thu`, `Còn phải thu`): căn phải cả tiêu đề và giá trị.
  + Cột `STT`, `Trạng thái`, `Thao tác`: căn giữa.

<a id="ht-quy-tac-tai-tep"></a>
\- **Quy tắc tải tệp đính kèm** (áp dụng các vùng đính kèm của module: Văn bản kiến nghị, Văn bản đính kèm của Điều kiện hoãn, Tài liệu đính kèm nộp tiền; không áp dụng cho tệp văn bản trong popup/khối trình ký):
  + Nút `Tải file`; cho phép tải nhiều tệp, mỗi tệp tối đa 50MB; định dạng theo từng trường.
  + Mỗi tệp hiển thị tên tệp, dung lượng, `Xem file` (mở tệp tại tab mới), `Xóa` (hiển thị popup xác nhận trước khi gỡ).
  + Tệp sai định dạng: hiển thị [MSG-ERR-FILE-001] dưới vùng tải tệp, không tiếp nhận tệp đó.
  + Tệp vượt quá 50MB: hiển thị [MSG-ERR-FILE-002] dưới vùng tải tệp, không tiếp nhận tệp đó.

<a id="ht-tu-dong-hoan-thanh"></a>
\- **Quy tắc tự động chuyển trạng thái Hoàn thành**:
  + Áp dụng cho từng cán bộ ở trạng thái `Thu hồi tiền hoàn trả`.
  + Sau mỗi lần ghi nhận nộp tiền hoặc ban hành Quyết định giảm mức hoàn trả bổ sung, hệ thống kiểm tra cán bộ.
  + Tổng số tiền đã nộp bằng số tiền phải hoàn trả (sau giảm mức hoàn trả, nếu có): cán bộ chuyển `Hoàn thành`.
  + Tổng số tiền đã nộp lớn hơn số tiền phải hoàn trả: cán bộ giữ `Thu hồi tiền hoàn trả` kèm số tiền cần trả lại; chuyển `Hoàn thành` sau khi cập nhật trả lại tiền.
  + Trạng thái chung của hồ sơ theo [Quy tắc tổng hợp trạng thái chung - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-trang-thai-chung).

<a id="ht-dinh-chi"></a>
\- **Quy tắc đình chỉ**:
  + Đình chỉ cả hồ sơ (trước khi chốt ý kiến của Hội đồng): người dùng thuộc đơn vị tạo Hội đồng; hồ sơ `Chờ duyệt` (Loại trình `Thành lập hội đồng`), `Bị từ chối` (Loại trình `Thành lập hội đồng`) hoặc `Họp hội đồng`; nút `Đình chỉ` tại thanh nút chân trang; Quyết định theo Mẫu 39/BTNN tại [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra); ban hành thì hồ sơ chuyển `Đình chỉ xem xét hoàn trả` (kết thúc).
  + Đình chỉ tại Bước 2 (hồ sơ `Họp hội đồng`): người dùng thuộc đơn vị tạo Hội đồng chọn cán bộ tại bảng `Danh sách cán bộ gây sai phạm` rồi bấm `Trình ký QĐ đình chỉ`; chọn toàn bộ cán bộ: đình chỉ cả hồ sơ; chọn một phần cán bộ: 01 Quyết định đình chỉ (Mẫu 39/BTNN) đối với các cán bộ được chọn.
  + Đình chỉ một phần cán bộ tại Bước 2: trong thời gian trình ký, hồ sơ `Chờ duyệt` / `Bị từ chối` (Loại trình `QĐ đình chỉ`); khi ban hành, các cán bộ được chọn chuyển `Đình chỉ hoàn trả`, hồ sơ trở lại `Họp hội đồng`; khi hoàn thành Bước 2, các cán bộ này không được phân tách về đơn vị quản lý cán bộ.
  + Đình chỉ cấp cán bộ (sau khi chốt ý kiến của Hội đồng, Bước 3 và Bước 4): người dùng thuộc đơn vị quản lý cán bộ; chọn 01, nhiều hoặc tất cả cán bộ đủ điều kiện của phần đơn vị rồi bấm `Trình ký QĐ đình chỉ`; các cán bộ được chọn dùng chung 01 Quyết định theo Mẫu 39/BTNN; đơn vị ban hành là đơn vị quản lý cán bộ.
  + Quyết định đình chỉ cấp cán bộ: tên cơ quan ban hành, cơ quan chủ quản, chức vụ người đứng đầu, chức vụ người ký trên Mẫu 39/BTNN lấy theo đơn vị quản lý cán bộ, theo [Mẫu 39/BTNN - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md#mau-39).
  + Sau khi chốt ý kiến của Hội đồng không còn nút `Đình chỉ` cả hồ sơ.
  + Cán bộ đủ điều kiện chọn: theo [Thao tác theo trạng thái - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-thao-tac-trang-thai).
  + Cán bộ có `Đã nộp` > 0: bắt buộc chọn phương án xử lý số tiền đã thu cho từng cán bộ (`Không hoàn trả lại số tiền đã thu` hoặc `Hoàn trả lại số tiền đã thu cho cán bộ`).
  + Phương án `Không hoàn trả lại số tiền đã thu`: khi Quyết định đình chỉ được ban hành, cán bộ chuyển thẳng `Đình chỉ hoàn trả`; số tiền phải hoàn trả bằng số tiền đã thu.
  + Phương án `Hoàn trả lại số tiền đã thu cho cán bộ`: khi Quyết định đình chỉ được ban hành, cán bộ giữ `Thu hồi tiền hoàn trả` kèm dòng phụ `Chờ trả lại tiền (Đình chỉ hoàn trả)`, số tiền cần trả lại bằng số tiền đã thu; sau khi `Cập nhật trả lại tiền`, cán bộ chuyển `Đình chỉ hoàn trả`.
  + Cán bộ chưa nộp tiền: khi Quyết định đình chỉ được ban hành, cán bộ chuyển `Đình chỉ hoàn trả`.
  + Ký duyệt, Từ chối Quyết định đình chỉ: như các Quyết định khác tại [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh).
  + Trong thời gian Quyết định đình chỉ `Chờ duyệt`: khóa `Ghi nhận nộp tiền`, `Trình ký QĐ miễn` / `Trình ký QĐ giảm` (kể cả bổ sung) của cán bộ được chọn; khóa `Trình ký QĐ hoàn trả` của phần đơn vị.
  + Quyết định đình chỉ `Bị từ chối`: cho phép `Ghi nhận nộp tiền`; giữ khóa các thao tác còn lại nêu trên đến khi trình ký lại và ban hành.
  + `Đình chỉ hoàn trả` là trạng thái kết thúc; mọi thao tác đối với cán bộ chỉ còn xem.
  + Sở Tư pháp không thực hiện đình chỉ.

<a id="ht-ma-tran-chuyen-trang-thai"></a>
\- **Ma trận chuyển trạng thái**:
  + Áp dụng cho từng cán bộ; trước khi chốt ý kiến của Hội đồng áp dụng cho hồ sơ (cột `Trạng thái hiện tại cán bộ` hiển thị trạng thái hồ sơ trong ngoặc).
  + `Quyền nhìn STP`: `Không` (Sở Tư pháp chưa thấy cán bộ); `Xem`; `Xem, thao tác`.
  + Ban hành Quyết định gồm: Lãnh đạo cấp cuối `Ký duyệt` (Ký số trên hệ thống) hoặc `Ban hành văn bản` (Ký ngoài).

| STT | Bước | Trạng thái hiện tại cán bộ | Thao tác/Sự kiện | Tác nhân | Quyền nhìn STP | Trạng thái mới cán bộ | Trạng thái Đơn vị | Trạng thái Hồ sơ gốc |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | - (Hồ sơ nháp) | Trình ký QĐ thành lập Hội đồng | Cán bộ đơn vị tạo Hội đồng | Không | - (Chờ duyệt (Thành lập hội đồng)) | - | Chờ duyệt (QĐ thành lập hội đồng) |
| 2 | 1 | - (Chờ duyệt (Thành lập hội đồng)) | Lãnh đạo trước cấp cuối Ký duyệt | Lãnh đạo được giao | Không | - (giữ Chờ duyệt) | - | Chờ duyệt (QĐ thành lập hội đồng) |
| 3 | 1 | - (Hồ sơ nháp, Chờ duyệt (Thành lập hội đồng)) | Ban hành QĐ thành lập Hội đồng | Lãnh đạo cấp cuối / Cán bộ đơn vị tạo Hội đồng (Ký ngoài) | Không | - (Họp hội đồng) | - | Chờ xử lý |
| 4 | 1 | - (Chờ duyệt (Thành lập hội đồng)) | Từ chối | Lãnh đạo được giao | Không | - (Bị từ chối (Thành lập hội đồng)) | - | Bị từ chối (QĐ thành lập hội đồng) |
| 5 | 1 | - (Bị từ chối (Thành lập hội đồng)) | Trình ký lại | Cán bộ đơn vị tạo Hội đồng | Không | - (Chờ duyệt (Thành lập hội đồng)) | - | Chờ duyệt (QĐ thành lập hội đồng) |
| 6 | 2 | - (Họp hội đồng) | Hoàn thành Bước 2 | Cán bộ đơn vị tạo Hội đồng | Không | Chờ ban hành QĐ hoàn trả | Chờ ban hành QĐ hoàn trả | Chờ xử lý |
| 7 | 1, 2 | - (Chờ duyệt (Thành lập hội đồng), Bị từ chối (Thành lập hội đồng), Họp hội đồng) | Đình chỉ cả hồ sơ / một phần cán bộ (Bước 2): Trình ký QĐ đình chỉ | Cán bộ đơn vị tạo Hội đồng | Không | - (Chờ duyệt (QĐ đình chỉ)) | - | Chờ duyệt (QĐ đình chỉ) |
| 8 | 1, 2 | - (Như STT 7, Chờ duyệt (QĐ đình chỉ)) | Đình chỉ cả hồ sơ: Ban hành QĐ đình chỉ | Lãnh đạo cấp cuối / Cán bộ đơn vị tạo Hội đồng (Ký ngoài) | Không | - (Đình chỉ xem xét hoàn trả) | - | Đình chỉ xem xét hoàn trả |
| 9 | 2 | - (Chờ duyệt (QĐ đình chỉ), đình chỉ một phần cán bộ) | Ban hành QĐ đình chỉ một phần cán bộ | Lãnh đạo cấp cuối / Cán bộ đơn vị tạo Hội đồng (Ký ngoài) | Không | Cán bộ được chọn: Đình chỉ hoàn trả; hồ sơ: - (Họp hội đồng) | - (không phân tách về đơn vị) | Chờ xử lý |
| 10 | 1, 2 | - (Chờ duyệt (QĐ đình chỉ)) | Từ chối | Lãnh đạo được giao | Không | - (Bị từ chối (QĐ đình chỉ)) | - | Bị từ chối (QĐ đình chỉ) |
| 11 | 1, 2 | - (Bị từ chối (QĐ đình chỉ)) | Trình ký lại | Cán bộ đơn vị tạo Hội đồng | Không | - (Chờ duyệt (QĐ đình chỉ)) | - | Chờ duyệt (QĐ đình chỉ) |
| 12 | 3 | Chờ ban hành QĐ hoàn trả | Trình ký QĐ hoàn trả | Cán bộ đơn vị quản lý cán bộ | Không | Chờ duyệt (QĐ hoàn trả) | Chờ duyệt (QĐ hoàn trả) | Roll-up (Đang xử lý) |
| 13 | 3 | Chờ duyệt (QĐ hoàn trả) | Lãnh đạo trước cấp cuối Ký duyệt | Lãnh đạo được giao | Không | Chờ duyệt (QĐ hoàn trả) | Chờ duyệt (QĐ hoàn trả) | Roll-up (Đang xử lý) |
| 14 | 3 | Chờ ban hành QĐ hoàn trả, Chờ duyệt (QĐ hoàn trả); Hình thức xử lý `Hoàn trả 100%` | Ban hành QĐ hoàn trả | Lãnh đạo cấp cuối / Cán bộ đơn vị quản lý cán bộ (Ký ngoài) | Xem, thao tác | Thu hồi tiền hoàn trả | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 15 | 3 | Như STT 14; Hình thức xử lý `Miễn hoàn trả` | Ban hành QĐ hoàn trả | Như STT 14 | Xem | Chờ ban hành QĐ Miễn hoàn trả | Đã ban hành QĐ hoàn trả | Roll-up (Đang xử lý) |
| 16 | 3 | Như STT 14; Hình thức xử lý `Giảm mức hoàn trả` | Ban hành QĐ hoàn trả | Như STT 14 | Xem | Chờ ban hành QĐ Giảm mức hoàn trả | Đã ban hành QĐ hoàn trả | Roll-up (Đang xử lý) |
| 17 | 3 | Chờ duyệt (QĐ hoàn trả) | Từ chối | Lãnh đạo được giao | Không | Bị từ chối (QĐ hoàn trả) | Bị từ chối (QĐ hoàn trả) | Roll-up (Chờ xử lý) |
| 18 | 3 | Bị từ chối (QĐ hoàn trả) | Trình ký lại | Cán bộ đơn vị quản lý cán bộ | Không | Chờ duyệt (QĐ hoàn trả) | Chờ duyệt (QĐ hoàn trả) | Roll-up (Đang xử lý) |
| 19 | 3 | Chờ ban hành QĐ Miễn hoàn trả | Trình ký QĐ miễn | Cán bộ đơn vị quản lý cán bộ | Xem | Chờ duyệt (QĐ miễn hoàn trả) | Đã ban hành QĐ hoàn trả | Roll-up (Đang xử lý) |
| 20 | 3 | Chờ ban hành QĐ Miễn hoàn trả, Chờ duyệt (QĐ miễn hoàn trả) | Ban hành QĐ miễn hoàn trả | Lãnh đạo cấp cuối / Cán bộ đơn vị quản lý cán bộ (Ký ngoài) | Xem | Miễn hoàn trả | Đã ban hành QĐ hoàn trả | Roll-up |
| 21 | 3 | Chờ ban hành QĐ Giảm mức hoàn trả | Trình ký QĐ giảm | Cán bộ đơn vị quản lý cán bộ | Xem | Chờ duyệt (QĐ giảm mức hoàn trả) | Đã ban hành QĐ hoàn trả | Roll-up (Đang xử lý) |
| 22 | 3 | Chờ ban hành QĐ Giảm mức hoàn trả, Chờ duyệt (QĐ giảm mức hoàn trả) | Ban hành QĐ giảm mức hoàn trả | Lãnh đạo cấp cuối / Cán bộ đơn vị quản lý cán bộ (Ký ngoài) | Xem, thao tác | Thu hồi tiền hoàn trả (số tiền phải hoàn trả bằng số tiền sau giảm) | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 23 | 3 | Chờ duyệt (QĐ miễn hoàn trả), Chờ duyệt (QĐ giảm mức hoàn trả) | Từ chối | Lãnh đạo được giao | Xem | Bị từ chối (Loại trình tương ứng) | Đã ban hành QĐ hoàn trả | Roll-up (Đang xử lý) |
| 24 | 3 | Bị từ chối (QĐ miễn hoàn trả), Bị từ chối (QĐ giảm mức hoàn trả) | Trình ký lại | Cán bộ đơn vị quản lý cán bộ | Xem | Chờ duyệt (Loại trình tương ứng) | Đã ban hành QĐ hoàn trả | Roll-up (Đang xử lý) |
| 25 | 4 | Thu hồi tiền hoàn trả | Ghi nhận nộp tiền; còn phải thu sau khi nộp > 0 | Cán bộ đơn vị quản lý cán bộ / Sở Tư pháp | Xem, thao tác | Thu hồi tiền hoàn trả | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 26 | 4 | Thu hồi tiền hoàn trả | Ghi nhận nộp tiền; còn phải thu sau khi nộp = 0 | Cán bộ đơn vị quản lý cán bộ / Sở Tư pháp | Xem, thao tác | Hoàn thành | Đã ban hành QĐ hoàn trả | Roll-up |
| 27 | 4 | Thu hồi tiền hoàn trả | Trình ký QĐ miễn bổ sung / QĐ giảm bổ sung | Cán bộ đơn vị quản lý cán bộ | Xem | Thu hồi tiền hoàn trả - Chờ duyệt (Loại trình tương ứng) | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 28 | 4 | Thu hồi tiền hoàn trả - Chờ duyệt (QĐ miễn hoàn trả) | Ban hành QĐ miễn bổ sung (miễn số tiền còn phải thu, không hoàn trả số tiền đã nộp) | Lãnh đạo cấp cuối / Cán bộ đơn vị quản lý cán bộ (Ký ngoài) | Xem | Miễn hoàn trả | Đã ban hành QĐ hoàn trả | Roll-up |
| 29 | 4 | Thu hồi tiền hoàn trả - Chờ duyệt (QĐ giảm mức hoàn trả) | Ban hành QĐ giảm bổ sung; số tiền sau giảm mới > đã nộp | Như STT 28 | Xem, thao tác | Thu hồi tiền hoàn trả (số tiền phải hoàn trả bằng số tiền sau giảm mới) | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 30 | 4 | Như STT 29 | Ban hành QĐ giảm bổ sung; số tiền sau giảm mới = đã nộp | Như STT 28 | Xem | Hoàn thành | Đã ban hành QĐ hoàn trả | Roll-up |
| 31 | 4 | Như STT 29 | Ban hành QĐ giảm bổ sung; số tiền sau giảm mới < đã nộp | Như STT 28 | Xem, thao tác | Thu hồi tiền hoàn trả kèm `Cần trả lại` (đã nộp trừ số tiền sau giảm mới) | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 32 | 4 | Thu hồi tiền hoàn trả kèm `Cần trả lại` | Cập nhật trả lại tiền | Cán bộ đơn vị quản lý cán bộ / Sở Tư pháp | Xem, thao tác | Hoàn thành | Đã ban hành QĐ hoàn trả | Roll-up |
| 33 | 4 | Thu hồi tiền hoàn trả - Chờ duyệt (QĐ miễn / QĐ giảm bổ sung) | Từ chối | Lãnh đạo được giao | Xem | Thu hồi tiền hoàn trả - Bị từ chối (Loại trình tương ứng) | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 34 | 3, 4 | Chờ ban hành QĐ hoàn trả, Bị từ chối (QĐ hoàn trả), Chờ ban hành QĐ Miễn/Giảm mức hoàn trả, Bị từ chối (QĐ miễn/giảm), Thu hồi tiền hoàn trả | Chọn cán bộ, Trình ký QĐ đình chỉ (Ký số) | Cán bộ đơn vị quản lý cán bộ | Theo trạng thái hiện tại (Sở Tư pháp không có thao tác đình chỉ) | [Trạng thái hiện tại] - Chờ duyệt (QĐ đình chỉ) | Giữ nguyên | Roll-up (Đang xử lý; cán bộ `Thu hồi tiền hoàn trả`: Thu hồi tiền hoàn trả) |
| 35 | 3, 4 | [Trạng thái] - Chờ duyệt (QĐ đình chỉ) | Từ chối | Lãnh đạo được giao | Theo trạng thái hiện tại | [Trạng thái] - Bị từ chối (QĐ đình chỉ) | Giữ nguyên | Roll-up (Chờ xử lý; cán bộ `Thu hồi tiền hoàn trả`: Thu hồi tiền hoàn trả) |
| 36 | 3, 4 | [Trạng thái] - Bị từ chối (QĐ đình chỉ) | Trình ký lại | Cán bộ đơn vị quản lý cán bộ | Theo trạng thái hiện tại | [Trạng thái] - Chờ duyệt (QĐ đình chỉ) | Giữ nguyên | Như STT 34 |
| 37 | 3, 4 | Như STT 34 (kể cả đang Chờ duyệt (QĐ đình chỉ)); đã nộp = 0 | Ban hành QĐ đình chỉ | Lãnh đạo cấp cuối / Cán bộ đơn vị quản lý cán bộ (Ký ngoài) | Theo trạng thái hiện tại | Đình chỉ hoàn trả | Giữ nguyên; toàn bộ cán bộ của đơn vị `Đình chỉ hoàn trả` trước khi ban hành QĐ hoàn trả: Đình chỉ hoàn trả | Roll-up; toàn bộ cán bộ `Đình chỉ hoàn trả`: Đình chỉ xem xét hoàn trả |
| 38 | 4 | Thu hồi tiền hoàn trả (đã nộp > 0), phương án `Không hoàn trả lại số tiền đã thu` | Ban hành QĐ đình chỉ | Như STT 37 | Xem | Đình chỉ hoàn trả (số tiền phải hoàn trả bằng số tiền đã thu) | Đã ban hành QĐ hoàn trả | Như STT 37 |
| 39 | 4 | Thu hồi tiền hoàn trả (đã nộp > 0), phương án `Hoàn trả lại số tiền đã thu cho cán bộ` | Ban hành QĐ đình chỉ | Như STT 37 | Xem, thao tác | Thu hồi tiền hoàn trả - Chờ trả lại tiền (Đình chỉ hoàn trả); `Cần trả lại` bằng số tiền đã thu | Đã ban hành QĐ hoàn trả | Roll-up (Thu hồi tiền hoàn trả) |
| 40 | 4 | Thu hồi tiền hoàn trả - Chờ trả lại tiền (Đình chỉ hoàn trả) | Cập nhật trả lại tiền | Cán bộ đơn vị quản lý cán bộ / Sở Tư pháp | Xem, thao tác | Đình chỉ hoàn trả | Đã ban hành QĐ hoàn trả | Như STT 37 |
| 41 | 3, 4 | Miễn hoàn trả, Hoàn thành, Đình chỉ hoàn trả | Mọi thao tác | - | Xem | Không đổi (kết thúc) | Giữ nguyên | Roll-up |

  + `Trạng thái Hồ sơ gốc`: trạng thái chung của hồ sơ hoàn trả theo phạm vi đơn vị tạo Hội đồng, tính theo [Quy tắc tổng hợp trạng thái chung - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-trang-thai-chung); `Roll-up` là kết quả tổng hợp với các cán bộ còn lại.

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập Website Quản trị thành công và được phân quyền truy cập chức năng `Quản lý xem xét trách nhiệm hoàn trả`.

\- Vụ việc bồi thường nhà nước gốc đã hoàn tất chi trả kinh phí bồi thường, chưa phát sinh hồ sơ xem xét trách nhiệm hoàn trả và thuộc phạm vi dữ liệu được phân quyền của người dùng đăng nhập.

\- Mã vụ việc và mã hồ sơ theo [Mã vụ việc và mã hồ sơ - Tiếp nhận hồ sơ - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_TiepNhan_YCBT.md#tn-ma-vu-viec):
  + Hồ sơ hoàn trả có `Mã hồ sơ` riêng `HT-yyyy-xxx` và kế thừa `Mã vụ việc` (`VVBT-yyyy-xxx`) của hồ sơ Giải quyết yêu cầu bồi thường (`Mã hồ sơ GQBT`, `BT-yyyy-xxx`); hệ thống không sinh `Mã vụ việc` mới.
  + 01 vụ việc chỉ có 01 hồ sơ xem xét trách nhiệm hoàn trả; danh sách cán bộ chịu trách nhiệm hoàn trả và các phần đơn vị quản lý trong hồ sơ đó.
  + Định danh vụ việc trên giao diện: `Mã vụ việc - Họ và tên người yêu cầu`.

---

<a id="ht-tab-xu-ly"></a>
*c. Quy tắc 02 tab Chờ xử lý / Đã xử lý*

- Tab xác định theo phần việc trong phạm vi dữ liệu của người dùng và thao tác người dùng được phép theo [Thao tác theo trạng thái - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-thao-tac-trang-thai); không theo trạng thái chung.
- Tab `Chờ xử lý`: hồ sơ có ít nhất 01 phần việc trong phạm vi dữ liệu chờ người dùng thao tác:
  + Người dùng tác nghiệp: Hồ sơ nháp, `Bị từ chối` (mọi Loại trình), `Họp hội đồng`, `Chờ ban hành QĐ hoàn trả`, `Chờ ban hành QĐ Miễn hoàn trả`, `Chờ ban hành QĐ Giảm mức hoàn trả`, `Thu hồi tiền hoàn trả` (kể cả `Chờ trả lại tiền (Đình chỉ hoàn trả)`).
  + Sau khi chốt ý kiến của Hội đồng: chỉ xét cán bộ thuộc đơn vị của người dùng (Sở Tư pháp: cán bộ trong phạm vi dữ liệu ở trạng thái `Thu hồi tiền hoàn trả`).
  + Lãnh đạo: `Chờ duyệt` (mọi Loại trình) được giao tại cấp hiện hành.
- Tab `Đã xử lý`: hồ sơ người dùng đã thực hiện ít nhất 01 thao tác và không còn phần việc chờ người dùng thao tác.
- Cả 02 tab: cột `Trạng thái` chỉ hiển thị 01 badge trạng thái chung.
- Cột `Thao tác`: vị trí cố định; thao tác không được phép hiển thị dạng khóa mờ, không cho phép thao tác:
  + Người dùng tác nghiệp: `Cập nhật`, `Xóa`.
  + Lãnh đạo: `Ký duyệt`, `Từ chối`.
  + Cán bộ tra cứu: hiển thị `Chỉ xem`.
- Trường `Trạng thái` của bộ lọc chỉ gồm các trạng thái chung của tab đang chọn.

#### 4.3.3.5.2. Sơ đồ luồng nghiệp vụ theo giao diện


```mermaid
flowchart TD
    A["Menu: Quản lý xem xét trách nhiệm hoàn trả"] --> B["MH01 - Danh sách hồ sơ xem xét trách nhiệm hoàn trả"]
    B -->|Lập hồ sơ hoàn trả mới| C["MH02 - Popup Chọn vụ việc bồi thường"]
    C -->|Khởi tạo thành công| D["Màn hình Cập nhật hồ sơ hoàn trả"]
    B -->|Click dòng dữ liệu| E["MH03 - Màn hình Xem chi tiết hồ sơ hoàn trả"]
    B -->|Cập nhật| D
    B -->|Ký duyệt / Từ chối| J["Màn hình Ký duyệt / Từ chối Quyết định"]
    D -->|Bước 1: Thành lập hội đồng / Trình ký lại| F["Popup Thành lập Hội đồng"]
    D -->|Bước 2: Thêm/Cập nhật cán bộ| G["Popup Thêm/Cập nhật cán bộ chịu trách nhiệm hoàn trả"]
    D -->|Bước 3, Bước 4: Trình ký QĐ hoàn trả / miễn / giảm| L["Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả"]
    D -->|Bước 4: Ghi nhận nộp tiền / Cập nhật trả lại tiền| H["Popup Ghi nhận nộp tiền"]
    D -->|Bước 4: Xem lịch sử nộp tiền| I["Popup Chi tiết tiến trình nộp tiền"]
    D -->|Bước 1, Bước 2: Đình chỉ cả hồ sơ; Bước 3, Bước 4: Trình ký QĐ đình chỉ| K["Popup Trình ký QĐ đình chỉ việc xem xét trách nhiệm hoàn trả"]
    E -->|Thao tác tác nghiệp theo trạng thái| D
    E -->|Đình chỉ / Trình ký lại| K
    E -->|Ký duyệt| J1["Màn hình Ký duyệt / Từ chối Quyết định"]
    E -->|Từ chối| J1
```

---

<a id="mh01-danh-sach-ho-so-hoan-tra"></a>
#### 4.3.3.5.3. MH01 - Màn hình Danh sách hồ sơ xem xét trách nhiệm hoàn trả

##### 4.3.3.5.3.1. Màn hình

![Màn hình Danh sách hồ sơ xem xét trách nhiệm hoàn trả](images/UC_Xem_Xet_Hoan_Tra_MH01.png)

##### 4.3.3.5.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối thông tin chung màn hình** | Section | - | - | Vùng tiêu đề phía trên màn hình. |
| Tiêu đề màn hình | String(255) | - | `Xem xét trách nhiệm hoàn trả` | Control UI: Text heading (Read-only).<br>- Hiển thị đúng tên mục Menu `Xem xét trách nhiệm hoàn trả`.<br>- Không có dòng mô tả dưới tiêu đề. |
| **Tab danh sách** | Tab | - | `Chờ xử lý` | Control UI: 02 tab đặt phía trên khối bộ lọc tìm kiếm:<br>+ Chờ xử lý<br>+ Đã xử lý<br>- Badge số lượng: số bản ghi thuộc tab Chờ xử lý của người dùng; không hiển thị khi bằng 0.<br>- Badge số lượng tại mục menu `Xem xét trách nhiệm hoàn trả` bằng badge tab Chờ xử lý của Xem xét trách nhiệm hoàn trả.<br>- Tab `Đã xử lý` không có badge số lượng.<br>- Bản ghi của từng tab theo [Quy tắc 02 tab Chờ xử lý / Đã xử lý - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-tab-xu-ly). |
| **II. Khối bộ lọc tìm kiếm** | Section | - | - | Control UI: Filter panel dạng thu gọn/mở rộng (Accordion).<br>- Hiển thị phía trên bảng kết quả.<br>- Mặc định hiển thị dạng mở rộng.<br>- Cho phép thu gọn/mở rộng khi click vào nút "Thu gọn"/"Mở rộng" ở góc phải khối; khi thu gọn, các giá trị lọc đã nhập được giữ nguyên. |
| Mã hồ sơ | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã hồ sơ (HT-...)`.<br>- Tìm kiếm gần đúng theo `Mã hồ sơ` hoàn trả. |
| Mã vụ việc | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã vụ việc (VVBT-...)`.<br>- Tìm kiếm gần đúng theo `Mã vụ việc` (`VVBT-...`) của hồ sơ hoàn trả. |
| Mã hồ sơ GQBT | String(50) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập mã hồ sơ GQBT (BT-...)`.<br>- Tìm kiếm gần đúng theo `Mã hồ sơ GQBT` của hồ sơ hoàn trả. |
| Cán bộ gây sai phạm | String(255) | Không | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ tên cán bộ...`.<br>- Tìm kiếm gần đúng theo họ và tên cán bộ gây sai phạm trong phạm vi dữ liệu của người dùng. |
| Đơn vị quản lý cán bộ | Enum(String(255)) | Không | `Tất cả đơn vị` | Control UI: Combobox.<br>- Danh sách: `Tất cả đơn vị` và các đơn vị quản lý cán bộ gây sai phạm trong phạm vi dữ liệu của người dùng.<br>- Lọc hồ sơ có ít nhất 01 cán bộ trong phạm vi dữ liệu thuộc đơn vị đã chọn. |
| Trạng thái | Enum(String(50)) | Không | `Tất cả` | Control UI: Combobox.<br>- Lọc theo trạng thái chung.<br>- Chỉ gồm `Tất cả` và các trạng thái chung của tab đang chọn, trong các giá trị:<br>+ Tất cả<br>+ Chờ duyệt<br>+ Bị từ chối<br>+ Chờ xử lý<br>+ Đang xử lý<br>+ Thu hồi tiền hoàn trả<br>+ Miễn hoàn trả<br>+ Hoàn thành<br>+ Đình chỉ xem xét hoàn trả |
| Từ ngày | Date | Không | Ngày đầu tháng hiện tại | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Lọc hồ sơ có ngày khởi tạo từ ngày này. |
| Đến ngày | Date | Không | Ngày hiện tại | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Lọc hồ sơ có ngày khởi tạo đến ngày này.<br>- Không nhỏ hơn `Từ ngày`. |
| Xóa bộ lọc | Button | Không | - | Control UI: Button.<br>- Đặt cùng nút `Tìm kiếm` tại dòng riêng phía dưới các trường lọc, căn phải. |
| Tìm kiếm | Button | Không | - | Control UI: Button. |
| **III. Khối bảng kết quả tìm kiếm** | Section | - | 10 bản ghi/trang | Control UI: Data grid.<br>- Mỗi hồ sơ hoàn trả 01 dòng.<br>- Số liệu và trạng thái của dòng theo phạm vi dữ liệu của người dùng tại [Phạm vi dữ liệu theo đơn vị - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-pham-vi-du-lieu).<br>- Khi truy cập màn hình, hệ thống tải hồ sơ thuộc tab `Chờ xử lý`, sắp xếp mặc định theo ngày khởi tạo hồ sơ giảm dần.<br>- Click tiêu đề cột (trừ cột `Thao tác`): sắp xếp tăng / giảm dần theo cột đó.<br>- Số dòng hiển thị: 10 / 20 / 50 / 100 bản ghi/trang. |
| Lập hồ sơ hoàn trả mới | Button | Không | - | Control UI: Button.<br>- Chỉ hiển thị tại tab `Chờ xử lý` với người dùng thuộc đơn vị tạo Hội đồng (đơn vị giải quyết bồi thường) được phân quyền lập hồ sơ.<br>- Đơn vị quản lý cán bộ, Sở Tư pháp: không hiển thị.<br>- Mở popup chọn vụ việc bồi thường để lập hồ sơ hoàn trả mới. |
| Kết xuất Excel | Button | Không | - | Control UI: Button.<br>- Hiển thị tại cả 02 tab; tab `Đã xử lý` chỉ có nút này.<br>- Kết xuất các cột của lưới và số liệu theo phạm vi dữ liệu: số tiền theo ý kiến của Hội đồng, số tiền sau giảm, đã thu, còn phải thu, số cán bộ theo hình thức xử lý (`Hoàn trả`, `Giảm mức hoàn trả`, `Miễn hoàn trả`, `Đình chỉ hoàn trả`). |
| STT | Integer(10) | Không | Tự tăng | Control UI: Text (Read-only).<br>- Số thứ tự dòng dữ liệu trên trang hiện tại. |
| Mã hồ sơ | String(50) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi. |
| Cán bộ gây sai phạm | String(500) | Không | Theo dữ liệu | Control UI: Text kèm Tooltip (Read-only).<br>- Cán bộ trong phạm vi dữ liệu của người dùng.<br>- Hiển thị họ và tên cán bộ đầu tiên.<br>- Có từ 02 cán bộ: hiển thị thêm nhãn `+N khác` (N là số cán bộ còn lại).<br>- Tooltip: mỗi cán bộ 01 dòng `[STT]. [Họ và tên] - [Đơn vị công tác] - [Trạng thái chi tiết]`; cán bộ có nhãn `Hoãn hoàn trả`: thêm `(Hoãn hoàn trả)`.<br>- Chưa có cán bộ: hiển thị `—`. |
| Đơn vị quản lý cán bộ | String(255) | Không | Theo dữ liệu | Control UI: Text kèm Tooltip (Read-only).<br>- Đơn vị công tác của cán bộ trong phạm vi dữ liệu của người dùng.<br>- Hiển thị tên đơn vị đầu tiên.<br>- Có từ 02 đơn vị: hiển thị thêm nhãn `+N đơn vị khác` (N là số đơn vị còn lại).<br>- Tooltip: mỗi đơn vị 01 dòng `[STT]. [Tên đơn vị]`.<br>- Chưa có cán bộ: hiển thị `—`. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Tooltip: `Mã vụ việc - Họ và tên người yêu cầu`. |
| Mã hồ sơ GQBT | String(50) | Có | Theo dữ liệu | Control UI: Text link / Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hiển thị liên kết theo [Phạm vi dữ liệu theo đơn vị - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-pham-vi-du-lieu). |
| Tiền hoàn trả (đ) | Decimal(18,0) | Không | Theo dữ liệu | Control UI: Text kèm Tooltip (Read-only).<br>- Tổng số tiền phải hoàn trả sau miễn, giảm của cán bộ trong phạm vi dữ liệu đã ban hành Quyết định hoàn trả của đơn vị.<br>- Cán bộ hình thức `Hoàn trả 100%`: `Số tiền cần hoàn trả`.<br>- Cán bộ hình thức `Giảm mức hoàn trả`: `Số tiền sau giảm` (kể cả khi chưa ban hành Quyết định giảm mức hoàn trả); sau giảm bổ sung: số tiền sau giảm mới.<br>- Cán bộ hình thức `Miễn hoàn trả`, cán bộ `Đình chỉ hoàn trả`: bằng số tiền đã thu (0 khi chưa thu hoặc đã trả lại).<br>- Tooltip: số tiền theo ý kiến của Hội đồng, tiền hoàn trả, đã thu, còn phải thu.<br>- Căn phải, định dạng số có dấu phân cách hàng nghìn.<br>- Chưa có cán bộ đã ban hành Quyết định hoàn trả: hiển thị `--`. |
| Tiến độ thu hồi | Decimal(5,2) | Không | Theo dữ liệu | Control UI: Progress bar kèm Text (Read-only).<br>- Dòng 1: số tiền đã thu và tỷ lệ phần trăm `Đã thu / Tiền hoàn trả` (mẫu số là `Tiền hoàn trả (đ)` sau miễn, giảm), làm tròn đến số nguyên, tối đa 100%.<br>- Dòng 2: `[Số cán bộ đã kết thúc]/[Tổng số cán bộ] cán bộ đã kết thúc` (`Hoàn thành`, `Miễn hoàn trả`, `Đình chỉ hoàn trả`).<br>- `Tiền hoàn trả` bằng 0: chỉ hiển thị Dòng 2.<br>- Chưa có cán bộ đã ban hành Quyết định hoàn trả: hiển thị `Chưa ban hành QĐ`. |
| Trạng thái | Enum(String(50)) | Không | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Chỉ hiển thị 01 badge trạng thái chung theo [Quy tắc tổng hợp trạng thái chung - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-trang-thai-chung); không hiển thị trạng thái chi tiết (xem tại màn hình chi tiết).<br>- Ngoại lệ: badge `Chờ duyệt` / `Bị từ chối` (trước khi chốt ý kiến của Hội đồng) có thêm 01 dòng Loại trình `QĐ thành lập hội đồng` hoặc `QĐ đình chỉ` dưới badge.<br>- Bộ lọc `Trạng thái` = `Chờ duyệt` / `Bị từ chối`: lọc theo badge, gồm cả 02 Loại trình.<br>- Áp dụng cả 02 tab `Chờ xử lý`, `Đã xử lý`. |
| Thao tác | Action | Không | - | Control UI: Icon button group, vị trí cố định; thao tác không được phép hiển thị dạng khóa mờ.<br>- Tiêu đề cột: `Thao tác`.<br>- Cán bộ tra cứu: hiển thị `Chỉ xem`.<br>Gồm các nút:<br>- **Cập nhật**: cho phép khi hồ sơ có phần việc chờ người dùng thao tác tại tab `Chờ xử lý` theo [Quy tắc 02 tab Chờ xử lý / Đã xử lý - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-tab-xu-ly).<br>- **Ký duyệt**, **Từ chối**: cho phép khi hồ sơ có phần việc `Chờ duyệt` (mọi Loại trình) được giao cho Lãnh đạo đang đăng nhập tại cấp hiện hành.<br>- **Xóa**: chỉ hiển thị với người dùng thuộc đơn vị tạo Hội đồng; cho phép với hồ sơ nháp.<br>- Đơn vị quản lý cán bộ, Sở Tư pháp: không hiển thị nút `Xóa`.<br>- Cột cố định bên phải lưới khi cuộn ngang. |

##### 4.3.3.5.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chuyển tab | Tab | Hiển thị danh sách của tab `Chờ xử lý` hoặc `Đã xử lý`, nạp lại bộ lọc `Trạng thái` theo tab và đưa về Trang 1. |
| 2 | Tìm kiếm | Button | Khi người dùng click nút Tìm kiếm, hệ thống lọc dữ liệu theo các điều kiện đã nhập/chọn.<br>- **TH1 - Khoảng ngày không hợp lệ**: `Từ ngày` lớn hơn `Đến ngày`: hiển thị [MSG-ERR-VAL-007], không tìm kiếm.<br>- **TH2 - Không trả về dữ liệu**: Bảng kết quả hiển thị 01 dòng thông báo [MSG-INF-SYS-001].<br>- **TH Hợp lệ**: Hiển thị danh sách hồ sơ hoàn trả của tab đang chọn theo phân trang, về Trang 1. |
| 3 | Xóa bộ lọc | Button | Đưa bộ lọc về giá trị mặc định và tải lại danh sách. |
| 4 | Lập hồ sơ hoàn trả mới | Button | Khi người dùng click nút Lập hồ sơ hoàn trả mới, hệ thống mở [Popup Chọn vụ việc bồi thường để lập hồ sơ hoàn trả](#mh02-popup-chon-vu-viec-boi-thuong) và tải danh sách vụ việc bồi thường thỏa mãn đồng thời: đã hoàn tất chi trả kinh phí bồi thường, chưa phát sinh hồ sơ xem xét trách nhiệm hoàn trả và thuộc phạm vi dữ liệu được phân quyền của người dùng đăng nhập. |
| 5 | Kết xuất Excel | Button | Kết xuất danh sách của tab đang chọn theo điều kiện tìm kiếm hiện hành ra tệp Excel. |
| 6 | Sắp xếp | Click tiêu đề cột | Sắp xếp danh sách tăng dần; click lần nữa thì giảm dần. |
| 7 | Click dòng dữ liệu | Row click | Click dòng (trừ cột `Thao tác` và liên kết `Mã hồ sơ GQBT`): mở [MH03 - Màn hình Xem chi tiết hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#mh03-xem-chi-tiet-ho-so-hoan-tra), mở sẵn bước theo phần việc trong phạm vi dữ liệu:<br>- Hồ sơ nháp, `Chờ duyệt` / `Bị từ chối` (Loại trình `Thành lập hội đồng`): `Bước 1: Thành lập Hội đồng`.<br>- `Họp hội đồng`, `Chờ duyệt` / `Bị từ chối` (Loại trình `QĐ đình chỉ`) trước khi chốt ý kiến của Hội đồng, hồ sơ `Đình chỉ xem xét hoàn trả`: `Bước 2: Ý kiến hội đồng`.<br>- Có cán bộ chưa kết thúc ở trạng thái khác `Thu hồi tiền hoàn trả`: `Bước 3: Ban hành QĐ`.<br>- Còn lại: `Bước 4: Thu hồi tiền hoàn trả`. |
| 8 | Mã hồ sơ GQBT | Text link | Mở màn hình chi tiết hồ sơ Giải quyết yêu cầu bồi thường theo [Đường dẫn mở chi tiết vụ việc - Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#gq-url-chi-tiet). |
| 9 | Cập nhật | Button | Mở [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra) tại bước như chức năng `Click dòng dữ liệu`. |
| 10 | Ký duyệt | Button | Khi click, hệ thống mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh) với thao tác `Ký duyệt`. |
| 11 | Từ chối | Button | Khi click, hệ thống mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tu-choi-phe-duyet-quyet-dinh) với thao tác `Từ chối`. |
| 12 | Xóa | Button | Click: hiển thị popup xác nhận [MSG-CFM-SYS-001].<br>- Tại popup chọn `Hủy bỏ`: đóng popup, không thay đổi dữ liệu.<br>- Tại popup chọn `Đồng ý`:<br>- **TH1 - Hồ sơ không còn là hồ sơ nháp**: hiển thị [MSG-ERR-BTNN-HT-008], không xóa.<br>- **TH Hợp lệ**: Xóa hồ sơ hoàn trả; vụ việc trở lại danh sách đủ điều kiện lập hồ sơ hoàn trả; hiển thị [MSG-SUC-BTNN-HT-018]; tải lại danh sách. |

---

<a id="mh02-popup-chon-vu-viec-boi-thuong"></a>
#### 4.3.3.5.4. MH02 - Popup Chọn vụ việc bồi thường để lập hồ sơ hoàn trả

##### 4.3.3.5.4.1. Màn hình

![Popup Chọn vụ việc bồi thường để lập hồ sơ hoàn trả](images/UC_Xem_Xet_Hoan_Tra_MH02.png)

##### 4.3.3.5.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | - | Control UI: Text heading (Read-only).<br>- Hiển thị `Lập hồ sơ hoàn trả: Chọn vụ việc bồi thường`. |
| Nội dung hướng dẫn | Text(500) | - | - | Control UI: Text (Read-only).<br>- Hiển thị `Dưới đây là danh sách các vụ việc bồi thường nhà nước đã chi trả xong, đủ điều kiện để khởi tạo hồ sơ xem xét trách nhiệm hoàn trả công quỹ:`. |
| **Bảng danh sách vụ việc đủ điều kiện** | Section | - | - | Control UI: Data grid.<br>- Danh sách vụ việc bồi thường nhà nước thỏa mãn đồng thời các điều kiện:<br>+ Vụ việc đã hoàn tất chi trả kinh phí bồi thường (đã có `Ngày hoàn tất chi trả bồi thường`).<br>+ Vụ việc chưa phát sinh hồ sơ xem xét trách nhiệm hoàn trả nào trên hệ thống.<br>+ Vụ việc thuộc phạm vi dữ liệu được phân quyền của người dùng đăng nhập.<br>- Sắp xếp theo `Ngày hoàn tất chi` tăng dần.<br>- Không có dữ liệu: hiển thị 01 dòng [MSG-INF-SYS-001]. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hiển thị `Mã vụ việc` (`VVBT-yyyy-xxx`) in đậm. |
| Mã hồ sơ GQBT | String(50) | Có | Theo dữ liệu | Control UI: Text link (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hiển thị Mã hồ sơ Giải quyết yêu cầu bồi thường (`BT-yyyy-xxx`).<br>- Click mở màn hình chi tiết hồ sơ Giải quyết yêu cầu bồi thường. |
| Tên cá nhân/Tổ chức yêu cầu | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị họ tên cá nhân/tổ chức yêu cầu bồi thường của vụ việc gốc. |
| Số tiền bồi thường (đ) | Decimal(18,0) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Tổng số tiền Nhà nước đã chi trả bồi thường của vụ việc.<br>- Căn phải, định dạng số có dấu phân cách hàng nghìn. |
| Ngày hoàn tất chi | Date | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy`.<br>- Ngày hoàn thành chi trả kinh phí bồi thường của vụ việc gốc. |
| Thao tác | Button | - | - | Control UI: Button `Khởi tạo hồ sơ` trên từng dòng. |

##### 4.3.3.5.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Khởi tạo hồ sơ | Button | Khi người dùng click nút Khởi tạo hồ sơ trên một dòng vụ việc, hệ thống thực hiện kiểm tra và xử lý:<br>- **TH Vụ việc đã có hồ sơ hoàn trả** (01 vụ việc chỉ có 01 hồ sơ hoàn trả, kể cả hồ sơ do người dùng khác vừa khởi tạo): Hệ thống hiển thị thông báo [MSG-ERR-BTNN-HT-009] kèm `Mã vụ việc` và `Mã hồ sơ` hoàn trả đã có, làm mới lại danh sách trong popup và không khởi tạo hồ sơ.<br>- **TH Hợp lệ**: Hệ thống thực hiện tuần tự các bước:<br>+ Bước 1: Tự động sinh `Mã hồ sơ` theo quy tắc `HT-<năm>-<số thứ tự 3 chữ số>`.<br>+ Bước 2: Lưu hồ sơ hoàn trả vào cơ sở dữ liệu dưới dạng hồ sơ nháp (chưa có trạng thái; hồ sơ chỉ có trạng thái khi Cán bộ trình ký QĐ thành lập Hội đồng (Ký số trên hệ thống) - `Chờ duyệt` (Loại trình `Thành lập hội đồng`), hoặc ban hành QĐ thành lập Hội đồng (Ký ngoài) - `Họp hội đồng`), tự động kế thừa các thông tin từ vụ việc gốc gồm: Mã vụ việc (giữ nguyên, không sinh mới), Mã hồ sơ GQBT, Nội dung vụ việc, Đơn vị chi trả bồi thường, Tổng số tiền đã chi trả, Ngày hoàn thành chi trả.<br>+ Bước 3: Ghi Audit Log thao tác khởi tạo hồ sơ hoàn trả.<br>+ Bước 4: Hiển thị thông báo thành công [MSG-SUC-BTNN-HT-001].<br>+ Bước 5: Đóng popup và điều hướng sang [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra) tại `Bước 1: Thành lập Hội đồng`. |
| 2 | Đóng | Button | Khi người dùng click nút Đóng hoặc biểu tượng `×` trên tiêu đề popup, hệ thống đóng popup và quay lại [MH01 - Màn hình Danh sách hồ sơ xem xét trách nhiệm hoàn trả](#mh01-danh-sach-ho-so-hoan-tra), không thay đổi dữ liệu. |

---

<a id="man-hinh-cap-nhat-ho-so-hoan-tra"></a>
#### 4.3.3.5.5. Màn hình Cập nhật hồ sơ hoàn trả

##### 4.3.3.5.5.1. Màn hình

![Màn hình Cập nhật hồ sơ hoàn trả](images/UC_Xem_Xet_Hoan_Tra_MH03.png)

##### 4.3.3.5.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối điều hướng và tiêu đề hồ sơ** | Section | - | - | Vùng thông tin nhận dạng hồ sơ phía trên màn hình cập nhật. |
| Đường dẫn điều hướng | String(255) | - | - | Control UI: Breadcrumb (Read-only).<br>- Hiển thị `Quản lý xem xét trách nhiệm hoàn trả / Cập nhật hồ sơ <Mã hồ sơ>`. |
| Tiêu đề hồ sơ | String(50) | Có | Theo dữ liệu | Control UI: Text heading (Read-only).<br>- Hiển thị `Hồ sơ trách nhiệm hoàn trả: <Mã hồ sơ>`. |
| Trạng thái | Enum(String(50)) | Có | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Trạng thái chung theo phạm vi dữ liệu của người xem, cùng quy tắc với cột `Trạng thái` của danh sách tại [Quy tắc tổng hợp trạng thái chung - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-trang-thai-chung).<br>- Chỉ hiển thị 01 badge; trạng thái chi tiết xem tại từng bước.<br>- Ngoại lệ: badge `Chờ duyệt` / `Bị từ chối` (trước khi chốt ý kiến của Hội đồng) có thêm dòng Loại trình `QĐ thành lập hội đồng` hoặc `QĐ đình chỉ`. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hiển thị `Mã vụ việc - Họ và tên người yêu cầu`. |
| Mã hồ sơ GQBT | String(50) | Có | Theo dữ liệu | Control UI: Text link (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hiển thị Mã hồ sơ Giải quyết yêu cầu bồi thường kèm nhãn `[Xem hồ sơ gốc]`.<br>- Click mở màn hình chi tiết hồ sơ Giải quyết yêu cầu bồi thường. |
| **II. Thông tin vụ việc bồi thường gốc** | Section | - | Thu gọn | Control UI: Accordion (Read-only).<br>- Click tiêu đề khối: mở rộng / thu gọn.<br>- Kế thừa thông tin từ vụ việc bồi thường gốc. |
| Mã vụ việc | String(50) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hiển thị `Mã vụ việc - Họ và tên người yêu cầu`. |
| Mã hồ sơ GQBT | String(50) | Có | Theo dữ liệu | Control UI: Text link (Read-only).<br>- Theo dữ liệu bản ghi.<br>- Hiển thị Mã hồ sơ Giải quyết yêu cầu bồi thường kèm nhãn `[Xem hồ sơ gốc]`. |
| Ngày QĐ giải quyết bồi thường | Date | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy`. Theo thông tin Hồ sơ vụ việc. |
| Ngày hoàn thành chi trả | Date | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy`. Theo thông tin Hồ sơ vụ việc. |
| Lĩnh vực phát sinh thiệt hại | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo thông tin Hồ sơ vụ việc. |
| Hành vi gây thiệt hại của người thi hành công vụ | Text(2000) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo thông tin Hồ sơ vụ việc. |
| Nội dung vụ việc sai phạm gây bồi thường | Text(2000) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo thông tin Hồ sơ vụ việc. |
| Đơn vị chi trả bồi thường | String(255) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Theo thông tin Hồ sơ vụ việc. |
| Tổng số tiền Nhà nước đã chi trả bồi thường | Decimal(18,0) | Có | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng số có dấu phân cách hàng nghìn, đơn vị `VNĐ`. Theo thông tin Hồ sơ vụ việc. |
| Trạng thái hồ sơ hoàn trả | Enum(String(50)) | - | Theo dữ liệu | Control UI: Badge (Read-only).<br>- Giống trường `Trạng thái` của khối `I. Khối điều hướng và tiêu đề hồ sơ`. |
| **III. Khối thanh tiến trình xử lý hồ sơ** | Section | - | Bước theo trạng thái hồ sơ | Control UI: Stepper 04 bước cố định.<br>Gồm:<br>+ Bước 1: Thành lập Hội đồng<br>+ Bước 2: Ý kiến hội đồng<br>+ Bước 3: Ban hành QĐ<br>+ Bước 4: Thu hồi tiền hoàn trả<br>- Màn hình chỉ hiển thị nội dung 01 bước đang chọn; mặc định mở bước như chức năng `Click dòng dữ liệu` tại [MH01 - Màn hình Danh sách hồ sơ xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#mh01-danh-sach-ho-so-hoan-tra).<br>- Toàn bộ cán bộ trong phạm vi đã kết thúc (`Hoàn thành`, `Miễn hoàn trả`, `Đình chỉ hoàn trả`): 04 bước ở trạng thái `Đã hoàn thành`. |
| Trạng thái hiển thị bước trên Stepper | Enum(String(50)) | - | Theo dữ liệu | Control UI: Step node.<br>- `Đã hoàn thành`: bước nhỏ hơn bước hiện tại; click mở xem bước dạng chỉ đọc.<br>- `Đang xử lý`: bước hiện tại của hồ sơ; click mở bước.<br>- `Chưa mở khóa`: bước lớn hơn bước hiện tại; click hiển thị thông báo `Bước [n] chưa mở khóa theo tiến trình xử lý hồ sơ.`, không mở bước.<br>- Hồ sơ `Đình chỉ xem xét hoàn trả`: giữ tại bước hồ sơ đang xử lý khi đình chỉ; các bước sau `Chưa mở khóa`. |
| **IV. Bước 1: Thành lập Hội đồng** | Section | - | - | Control UI: Section.<br>- Tiêu đề: `Thành lập Hội đồng xem xét trách nhiệm hoàn trả`. |
| **Khối thông báo chưa thành lập Hội đồng** | Section | - | - | Control UI: Call-to-action card.<br>- Chỉ hiển thị với hồ sơ nháp. |
| Tiêu đề thông báo | String(255) | - | `Chưa thành lập Hội đồng xem xét trách nhiệm hoàn trả` | Control UI: Text heading (Read-only). |
| Nội dung thông báo | Text(500) | - | `Hồ sơ chưa thành lập Hội đồng xem xét trách nhiệm hoàn trả. Vui lòng tạo Hội đồng qua chức năng tạo mới.` | Control UI: Text (Read-only). |
| Thành lập hội đồng | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị với hồ sơ nháp và người dùng thuộc đơn vị tạo Hội đồng. |
| **Khối thông tin cảnh báo từ chối** | Section | - | - | Control UI: Alert box.<br>- Chỉ hiển thị khi hồ sơ ở trạng thái `Bị từ chối` (Loại trình `Thành lập hội đồng`). |
| Tiêu đề cảnh báo | String(255) | - | `Yêu cầu trình ký Quyết định thành lập bị từ chối` | Control UI: Text heading (Read-only). |
| Người từ chối | String(255) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị họ tên và chức vụ của Lãnh đạo từ chối phê duyệt. |
| Thời gian từ chối | DateTime | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Định dạng `dd/mm/yyyy HH:mm`. |
| Lý do từ chối | Text(1000) | - | Theo dữ liệu | Control UI: Text (Read-only).<br>- Hiển thị nguyên văn ý kiến, lý do từ chối phê duyệt của Lãnh đạo. |
| **Thông tin văn bản Quyết định thành lập Hội đồng** | Section | - | - | Control UI: Info card (Read-only).<br>- Hiển thị khi hồ sơ đã trình / ban hành QĐ thành lập Hội đồng.<br>- Gồm các trường giống khối `Thông tin văn bản Quyết định thành lập Hội đồng` tại [MH03 - Màn hình Xem chi tiết hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#mh03-xem-chi-tiet-ho-so-hoan-tra).<br>- Hồ sơ `Bị từ chối` (Loại trình `Thành lập hội đồng`): bảng `Văn bản liên quan` có thêm cột `Thao tác` (`Xóa văn bản`).<br>- Sửa thông tin Quyết định thực hiện qua nút `Trình ký lại`. |
| Trình ký lại | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị khi hồ sơ ở trạng thái `Bị từ chối` (Loại trình `Thành lập hội đồng`), tại thanh nút chân trang. |
| Đình chỉ (Bước 1) | Button | - | - | Control UI: Button, tại thanh nút chân trang.<br>- Chỉ hiển thị với người dùng thuộc đơn vị tạo Hội đồng, hồ sơ `Chờ duyệt` / `Bị từ chối` (Loại trình `Thành lập hội đồng`).<br>- Đình chỉ cả hồ sơ theo [Quy tắc đình chỉ - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-dinh-chi). |
| **V. Bước 2: Ý kiến hội đồng** | Section | - | - | Control UI: Section.<br>- Tiêu đề: `Ý kiến của hội đồng`.<br>- Mở khóa khi hồ sơ ở trạng thái `Họp hội đồng` hoặc các bước sau.<br>- Cho phép nhập khi hồ sơ ở trạng thái `Họp hội đồng` và người dùng thuộc đơn vị tạo Hội đồng; trường hợp khác chỉ đọc. |
| **Ý kiến chung của Hội đồng** | Section | - | - | Control UI: Form card. |
| Ngày họp Hội đồng | Date | Có | Ngày hiện tại | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không được lớn hơn ngày hiện tại. |
| Ý kiến chung của Hội đồng | Text(4000) | Có | Trống | Control UI: Textarea.<br>- Placeholder: `Nhập ý kiến chung của Hội đồng xem xét trách nhiệm hoàn trả`. |
| Tài liệu kèm theo | List(Object) | Không | Trống | Control UI: Bảng động.<br>- Dùng để đính kèm Biên bản họp Hội đồng và tài liệu khác.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác` (`Xem file`, `Xóa`).<br>- `File đính kèm`: nút `Tải file` căn giữa cột; có tệp thì hiển thị tên tệp, dung lượng.<br>- Nút `Thêm tài liệu` dưới bảng.<br>- Ghi chú dưới bảng: `Chấp nhận tệp .pdf, .doc, .docx, .jpg, .jpeg, .png (tối đa 50MB/tệp).`<br>- Dòng đã nhập phải có đủ `Tên tài liệu, văn bản` và tệp; dòng trống không lưu.<br>- Tên tài liệu, văn bản: Input text, tối đa 500 ký tự; placeholder `Nhập tên tài liệu, văn bản`.<br>- Định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`; tối đa 50MB/tệp.<br>- Chế độ chỉ đọc: chỉ hiển thị khi có tài liệu; thao tác chỉ có `Xem file`. |
| **Danh sách cán bộ gây sai phạm** | Section | - | - | Control UI: Form card. |
| Thêm cán bộ gây sai phạm | Button | Không | - | Control UI: Button primary.<br>- Chỉ hiển thị khi Bước 2 cho phép nhập.<br>- Mở [Popup Thêm/Cập nhật cán bộ chịu trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-them-cap-nhat-can-bo-hoan-tra) ở chế độ thêm mới. |
| Bảng danh sách cán bộ gây sai phạm | Table | Có | - | Control UI: Data grid (Read-only).<br>- Cán bộ trong phạm vi dữ liệu của người dùng tại [Phạm vi dữ liệu theo đơn vị - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-pham-vi-du-lieu); đơn vị tạo Hội đồng hiển thị cán bộ của mọi đơn vị.<br>- Cột: `Chọn`, `STT`, `Họ và tên` (dòng dưới: Chức vụ), `Đơn vị quản lý cán bộ`, `Mức độ lỗi`, `Số tiền cần hoàn trả (đ)`, `Hình thức xử lý`, `Số tiền sau giảm (đ)`, `Phương thức hoàn trả`, `Trạng thái`, `Thao tác`.<br>- Dữ liệu các cột: theo dữ liệu bản ghi.<br>- Cán bộ có `Điều kiện hoãn thực hiện việc hoàn trả (nếu có)`: hiển thị nhãn `Hoãn hoàn trả` cạnh họ tên.<br>- Cán bộ đã đình chỉ tại Bước 2: hiển thị nhãn `Đình chỉ hoàn trả` cạnh họ tên; không có `Sửa cán bộ`, `Xóa cán bộ`.<br>- `Hình thức xử lý`: hiển thị nhãn đầy đủ `Hoàn trả 100%` / `Giảm mức hoàn trả` / `Miễn hoàn trả`; dòng dưới:<br>+ `Giảm mức hoàn trả`: `Lý do giảm: [Lý do giảm]`<br>+ `Miễn hoàn trả`: `Lý do miễn: [Lý do miễn hoàn trả]`<br>- `Số tiền sau giảm (đ)`: hình thức khác `Giảm mức hoàn trả` hiển thị `--`.<br>- `Phương thức hoàn trả`: `Một lần` / `Nhiều lần`; hình thức `Miễn hoàn trả` hiển thị `--`.<br>- `Trạng thái`: chỉ hiển thị sau khi hoàn thành Bước 2; theo trạng thái chi tiết của cán bộ.<br>- Cột `Chọn`, `Thao tác`: chỉ hiển thị khi Bước 2 cho phép nhập; Bước 2 ở chế độ chỉ đọc không hiển thị 02 cột này.<br>- Dòng `Tổng cộng` cuối bảng:<br>+ Cột `Số tiền cần hoàn trả (đ)`: tổng `Số tiền cần hoàn trả (đ)` của các cán bộ trên bảng<br>+ Cột `Số tiền sau giảm (đ)`, nhãn `Phải thu sau giảm / miễn`: tổng số tiền thực tế phải thu (`Hoàn trả 100%`: `Số tiền cần hoàn trả (đ)`; `Giảm mức hoàn trả`: `Số tiền sau giảm (đ)`; `Miễn hoàn trả`: 0)<br>+ Không tính cán bộ đã đình chỉ tại Bước 2<br>- Danh sách trống: hiển thị `Danh sách cán bộ trống. Vui lòng bấm "Thêm cán bộ gây sai phạm" để ghi nhận ý kiến của Hội đồng.` |
| Thao tác trên dòng | Action | Không | - | Control UI: Icon button group.<br>Gồm:<br>+ Xem chi tiết cán bộ<br>+ Sửa cán bộ<br>+ Xóa cán bộ<br>- Chỉ hiển thị khi Bước 2 cho phép nhập. |
| Chọn (Bước 2) | Checkbox | Không | Không chọn | Control UI: Checkbox tại đầu dòng; checkbox `Chọn tất cả` tại tiêu đề cột.<br>- Chỉ hiển thị với người dùng thuộc đơn vị tạo Hội đồng, hồ sơ `Họp hội đồng`.<br>- Không hiển thị tại dòng cán bộ đã đình chỉ. |
| Trình ký QĐ đình chỉ (Bước 2) | Button | - | - | Control UI: Button, phía trên bên phải bảng `Danh sách cán bộ gây sai phạm`.<br>- Hiển thị cùng điều kiện với cột `Chọn`.<br>- Chưa chọn cán bộ: nút khóa mờ.<br>- Đã chọn từ 01 cán bộ: nút cho phép bấm, nhãn kèm số cán bộ đã chọn `Trình ký QĐ đình chỉ ([Số cán bộ đã chọn])`; bỏ chọn toàn bộ: nút trở lại khóa mờ.<br>- Xử lý theo chức năng `Trình ký QĐ đình chỉ (Bước 2)`. |
| Văn bản kiến nghị về việc ban hành quyết định hoàn trả đối với vụ việc yêu cầu bồi thường | File (Multiple) | Có | Trống | Control UI: File upload, nút `Tải file`.<br>- Văn bản kiến nghị đã ký của Chủ tịch Hội đồng.<br>- Định dạng `.pdf`, `.doc`, `.docx`; cho phép nhiều tệp, mỗi tệp tối đa 50MB; bắt buộc tối thiểu 01 tệp.<br>- Hiển thị và kiểm tra tệp theo [Quy tắc tải tệp đính kèm - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-quy-tac-tai-tep).<br>- Liên kết `Tải Mẫu 35/BTNN` cạnh nhãn trường: tải văn bản sinh theo [Mẫu số 35/BTNN - Bảng mapping trường dữ liệu biểu mẫu - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md), mỗi cán bộ gây sai phạm 01 khối nội dung; chưa có cán bộ thì cảnh báo, không tải.<br>- Bước 2 ở chế độ chỉ đọc: chỉ hiển thị `Xem file`. |
| **Phân tách theo đơn vị quản lý cán bộ** | Section | - | - | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị sau khi hoàn thành Bước 2.<br>- Chỉ hiển thị đơn vị trong phạm vi dữ liệu của người dùng.<br>- Cột: `STT`, `Đơn vị quản lý cán bộ`, `Số cán bộ`, `Cán bộ`, `Tài liệu kèm theo phần đơn vị`, `Trạng thái`.<br>- Dữ liệu các cột: theo dữ liệu bản ghi.<br>- Hiển thị toàn bộ phần đơn vị của hồ sơ trong phạm vi dữ liệu, mỗi đơn vị 01 dòng.<br>- `Tài liệu kèm theo phần đơn vị`: tên tệp văn bản kiến nghị của phần đơn vị kèm biểu tượng `Xem`, `Tải`; mỗi tệp 01 dòng.<br>- `Trạng thái`: badge trạng thái phần đơn vị như khối `Phần đơn vị` tại Bước 3. |
| Đình chỉ | Button | - | - | Control UI: Button, tại thanh nút chân trang.<br>- Chỉ hiển thị khi Bước 2 cho phép nhập.<br>- Đình chỉ cả hồ sơ theo [Quy tắc đình chỉ - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-dinh-chi). |
| Hoàn thành Bước 2 | Button | - | - | Control UI: Button primary, tại thanh nút chân trang.<br>- Chỉ hiển thị khi Bước 2 cho phép nhập. |
| **VI. Bước 3: Ban hành QĐ** | Section | - | - | Control UI: Section.<br>- Tiêu đề: `Ban hành Quyết định hoàn trả`.<br>- Mở khóa khi hồ sơ hoàn thành Bước 2.<br>- Mỗi phần đơn vị trong phạm vi dữ liệu của người dùng 01 khối `Phần đơn vị`.<br>- Thao tác theo [Thao tác theo trạng thái - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-thao-tac-trang-thai). |
| **Phần đơn vị** | Section | - | - | Control UI: Accordion (Card thu gọn / mở rộng).<br>- Mỗi phần đơn vị trong phạm vi dữ liệu 01 khối; đơn vị tạo Hội đồng xem được khối của mọi đơn vị.<br>- Thứ tự: khối của đơn vị người dùng đứng đầu, mặc định mở rộng, viền nổi bật, nhãn `Đơn vị của bạn (Trực tiếp xử lý)`; các khối khác xếp dưới, mặc định thu gọn, nhãn `Chỉ xem (Đơn vị phối hợp)`.<br>- Người dùng không có phần đơn vị trong hồ sơ (Lãnh đạo, Sở Tư pháp): các khối mặc định mở rộng; Sở Tư pháp có nhãn `Chỉ xem`.<br>- Tiêu đề khối gồm:<br>+ Nút thu gọn / mở rộng<br>+ `Phần đơn vị: [Đơn vị quản lý cán bộ]`<br>+ Badge trạng thái phần đơn vị<br>+ Nhãn đơn vị của bạn / chỉ xem như trên<br>+ Tóm tắt bên phải: `[Số] cán bộ`; chưa ban hành Quyết định hoàn trả: `Số tiền cần hoàn trả`; đã ban hành: `Phải thu`, `Đã thu`<br>- Người dùng không thuộc đơn vị của khối: chỉ xem, không thao tác thay đơn vị.<br>- Trạng thái phần đơn vị gồm:<br>+ Chờ ban hành QĐ hoàn trả<br>+ Chờ duyệt (QĐ hoàn trả)<br>+ Bị từ chối (QĐ hoàn trả)<br>+ Đã ban hành QĐ hoàn trả<br>+ Đình chỉ hoàn trả<br>- Sở Tư pháp: chỉ hiển thị phần đơn vị đã ban hành Quyết định hoàn trả. |
| **Quyết định hoàn trả (Mẫu 36/BTNN)** | Section | - | - | Control UI: Section.<br>- 01 Quyết định hoàn trả chung cho toàn bộ cán bộ của phần đơn vị. |
| Khối chưa ban hành Quyết định hoàn trả | Section | - | - | Control UI: Call-to-action card.<br>- Chỉ hiển thị khi phần đơn vị `Chờ ban hành QĐ hoàn trả`.<br>- Tiêu đề: `Chưa ban hành Quyết định hoàn trả`.<br>- Nội dung: `Đơn vị trình ký / ban hành 01 Quyết định hoàn trả (Mẫu 36/BTNN) chung cho các cán bộ của đơn vị.` |
| Khối không ban hành Quyết định hoàn trả | Section | - | - | Control UI: Info card (Read-only).<br>- Chỉ hiển thị khi phần đơn vị `Đình chỉ hoàn trả`.<br>- Tiêu đề: `Không ban hành Quyết định hoàn trả`.<br>- Nội dung: `Toàn bộ cán bộ của đơn vị đã Đình chỉ hoàn trả.` |
| Trình ký QĐ hoàn trả | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị khi phần đơn vị `Chờ ban hành QĐ hoàn trả` và người dùng thuộc đơn vị đó.<br>- Có cán bộ của đơn vị đang trình ký Quyết định đình chỉ (`Chờ duyệt` / `Bị từ chối`): khóa mờ, tooltip `Đơn vị đang trình ký Quyết định đình chỉ`; áp dụng cả nút `Trình ký lại`.<br>- Quyết định hoàn trả không gồm cán bộ `Đình chỉ hoàn trả`. |
| Khối thông tin Quyết định hoàn trả | Section | - | - | Control UI: Info strip (Read-only), 01 hàng 04 cột: `Hình thức ký`, `Số, ký hiệu văn bản`, `Ngày văn bản`, `Tệp văn bản Quyết định`.<br>- Hiển thị khi phần đơn vị đã trình ký hoặc đã ban hành.<br>- `Lãnh đạo được giao ký duyệt`: dòng dưới dải thông tin, chỉ hiển thị khi `Chờ duyệt` (Loại trình `QĐ hoàn trả`). |
| Cảnh báo bị từ chối | - | - | Theo bản ghi | Control UI: Alert box.<br>- Chỉ hiển thị khi phần đơn vị `Bị từ chối` (Loại trình `QĐ hoàn trả`).<br>- Tiêu đề: `Quyết định hoàn trả bị từ chối`.<br>- Gồm Người từ chối, Thời điểm, Lý do từ chối. |
| Hình thức ký | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Số, ký hiệu văn bản | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi; chưa có số: `Chờ cấp số`.<br>- Không hiển thị khi `Hình thức ký` = `Ký ngoài`. |
| Ngày văn bản | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Không hiển thị khi `Hình thức ký` = `Ký ngoài`. |
| Lãnh đạo được giao ký duyệt | - | - | Theo bản ghi | Control UI: Label.<br>- Chỉ hiển thị khi `Chờ duyệt` (Loại trình `QĐ hoàn trả`).<br>- Hiển thị `Cấp [n]/[Tổng số cấp] - [Đơn vị]: [Lãnh đạo]`. |
| Tệp văn bản Quyết định | - | - | Theo bản ghi | Control UI: Label kèm biểu tượng `Xem`, `Tải` trên cùng 01 dòng.<br>- Hiển thị tên tệp Quyết định hoàn trả theo dữ liệu bản ghi.<br>- `Xem`: mở tệp tại tab mới; `Tải`: tải tệp về máy. |
| Ký duyệt / Từ chối | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị với Lãnh đạo được giao tại cấp hiện hành khi phần đơn vị `Chờ duyệt` (Loại trình `QĐ hoàn trả`). |
| Trình ký lại | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị khi phần đơn vị `Bị từ chối` (Loại trình `QĐ hoàn trả`) và người dùng thuộc đơn vị đó. |
| Tài liệu kèm theo | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Tài liệu kèm theo của lần trình Quyết định hoàn trả; chỉ hiển thị khi có tài liệu.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác` (`Xem file`). |
| **Cán bộ của đơn vị** | Section | - | - | Control UI: Data grid (Read-only).<br>- Cột: `Chọn` (chỉ hiển thị với người dùng thuộc đơn vị của phần đơn vị), `STT`, `Họ và tên` (dòng dưới: Chức vụ), `Mức độ lỗi`, `Hình thức xử lý`, `Phương thức hoàn trả`, `Số tiền cần hoàn trả (đ)`, `Số tiền sau giảm (đ)`, `Trạng thái`, `Thao tác`.<br>- Dữ liệu các cột: theo dữ liệu bản ghi.<br>- `Mức độ lỗi`: theo ý kiến của Hội đồng tại Bước 2; `Khác`: hiển thị `Nội dung mức độ lỗi`.<br>- `Hình thức xử lý`: nhãn và dòng lý do giảm / miễn như bảng `Danh sách cán bộ gây sai phạm` tại Bước 2.<br>- `Phương thức hoàn trả`: `Một lần` / `Nhiều lần` theo ý kiến của Hội đồng; hình thức `Miễn hoàn trả` hiển thị `--`.<br>- `Số tiền sau giảm (đ)`: hình thức khác `Giảm mức hoàn trả` hiển thị `--`.<br>- `Trạng thái`: trạng thái chi tiết của cán bộ.<br>- Cán bộ `Bị từ chối` (Loại trình `QĐ miễn hoàn trả` / `QĐ giảm mức hoàn trả`): dòng dưới hiển thị lý do từ chối.<br>- Quyết định miễn / giảm đã ban hành: dòng dưới hiển thị `QĐ miễn số: [Số, ký hiệu] ([Ngày])` / `QĐ giảm số: [Số, ký hiệu] ([Ngày])`; không hiển thị liên kết xem tệp tại cột này (xem qua nút `Xem QĐ miễn` / `Xem QĐ giảm`).<br>- Cột `Thao tác`: các nút trên cùng 01 dòng, không xuống dòng. |
| Thao tác trên dòng | Action | - | - | Control UI: Button; thao tác không được phép hiển thị khóa mờ.<br>- Hình thức `Hoàn trả 100%`: hiển thị `--`.<br>- Hình thức `Miễn hoàn trả`: nút `Trình ký QĐ miễn`.<br>- Hình thức `Giảm mức hoàn trả`: nút `Trình ký QĐ giảm`.<br>- Người dùng thuộc đơn vị của cán bộ:<br>+ Phần đơn vị chưa ban hành Quyết định hoàn trả: nút khóa mờ, tooltip `Chỉ trình ký sau khi Quyết định hoàn trả của đơn vị được ban hành`.<br>+ `Chờ ban hành QĐ Miễn hoàn trả`, `Chờ ban hành QĐ Giảm mức hoàn trả`: cho phép thao tác.<br>+ `Bị từ chối` (Loại trình `QĐ miễn hoàn trả` / `QĐ giảm mức hoàn trả`): nhãn nút `Trình ký lại`.<br>+ `Chờ duyệt`: hiển thị `Chờ Lãnh đạo ký duyệt`.<br>- Sở Tư pháp: cán bộ `Chờ ban hành` / `Bị từ chối` QĐ miễn, QĐ giảm: nút khóa mờ, tooltip `Sở Tư pháp không thực hiện Miễn hoàn trả, Giảm mức hoàn trả`.<br>- Lãnh đạo được giao tại cấp hiện hành, cán bộ `Chờ duyệt` (Loại trình `QĐ miễn hoàn trả` / `QĐ giảm mức hoàn trả`): `Ký duyệt`, `Từ chối`.<br>- Cán bộ có trình ký Quyết định đình chỉ chưa ban hành hoặc `Đình chỉ hoàn trả`: hiển thị `--`.<br>- Quyết định miễn / giảm đã ban hành: nút `Xem QĐ miễn` / `Xem QĐ giảm` với mọi người dùng xem được cán bộ (đơn vị, Sở Tư pháp, Lãnh đạo); mở [Popup Xem Quyết định miễn hoàn trả, giảm mức hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-xem-qd-mien-giam). |
| Chọn | Checkbox | Không | Không chọn | Control UI: Checkbox tại đầu dòng; checkbox `Chọn tất cả` tại tiêu đề cột.<br>- Chỉ hiển thị với người dùng thuộc đơn vị của phần đơn vị (không áp dụng Sở Tư pháp, Lãnh đạo).<br>- Chỉ hiển thị tại dòng cán bộ đủ điều kiện đình chỉ theo [Thao tác theo trạng thái - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-thao-tac-trang-thai).<br>- `Chọn tất cả`: chọn / bỏ chọn toàn bộ cán bộ đủ điều kiện của bảng. |
| Trình ký QĐ đình chỉ | Button | - | - | Control UI: Button, phía trên bên phải bảng `Cán bộ của đơn vị`.<br>- Chỉ hiển thị khi bảng có cán bộ đủ điều kiện đình chỉ và người dùng thuộc đơn vị của phần đơn vị.<br>- Chưa chọn cán bộ: nút khóa mờ.<br>- Đã chọn từ 01 cán bộ: nút cho phép bấm, nhãn kèm số cán bộ đã chọn `Trình ký QĐ đình chỉ ([Số cán bộ đã chọn])`; bỏ chọn toàn bộ: nút trở lại khóa mờ. |
| **Quyết định đình chỉ (Mẫu 39/BTNN)** | Section | - | - | Control UI: Data grid (Read-only), dưới bảng `Cán bộ của đơn vị`.<br>- Chỉ hiển thị khi phần đơn vị có lượt trình Quyết định đình chỉ.<br>- Mỗi lượt trình 01 dòng.<br>- Cột: `STT`, `Cán bộ` (mỗi cán bộ 01 dòng), `Hình thức ký`, `Trạng thái`, `Tệp văn bản` (`Xem file`), `Thao tác`.<br>- `Trạng thái`:<br>+ `Chờ duyệt (QĐ đình chỉ) - Cấp [n]/[Tổng số cấp]: [Lãnh đạo]`<br>+ `Bị từ chối (QĐ đình chỉ)`, dòng dưới: lý do từ chối<br>+ `Đã ban hành số [Số, ký hiệu] ngày [Ngày]`<br>- `Thao tác`:<br>+ Lãnh đạo được giao tại cấp hiện hành, `Chờ duyệt`: `Ký duyệt`, `Từ chối`.<br>+ Người dùng thuộc đơn vị, `Bị từ chối`: `Trình ký lại`.<br>+ Trường hợp khác: `--`. |
| **VII. Bước 4: Thu hồi tiền hoàn trả** | Section | - | - | Control UI: Section.<br>- Tiêu đề: `Thu hồi tiền hoàn trả`.<br>- Mở khóa khi có cán bộ trong phạm vi dữ liệu ở trạng thái `Thu hồi tiền hoàn trả`, `Hoàn thành`, `Miễn hoàn trả` hoặc `Đình chỉ hoàn trả`.<br>- Mỗi phần đơn vị trong phạm vi dữ liệu của người dùng 01 khối `Phần đơn vị`; chỉ hiển thị phần đơn vị có cán bộ ở các trạng thái trên.<br>- Thao tác theo [Thao tác theo trạng thái - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-thao-tac-trang-thai). |
| **Phần đơn vị** | Section | - | - | Control UI: Card, thu gọn / mở rộng; mặc định mở rộng.<br>- Tiêu đề khối giống khối `Phần đơn vị` tại Bước 3.<br>- Đầu khối: `Cán bộ ở giai đoạn thu hồi`, `Tổng phải thu`, `Đã thu`, `Còn phải thu` của các cán bộ trong khối. |
| **Bảng thu hồi theo cán bộ** | Section | - | - | Control UI: Data grid (Read-only).<br>- Trường `Chọn`, nút `Trình ký QĐ đình chỉ` và khối `Quyết định đình chỉ (Mẫu 39/BTNN)` giống Bước 3.<br>- Cột: `Chọn`, `STT`, `Họ và tên` (dòng dưới: Chức vụ), `Mức độ lỗi`, `Phương thức hoàn trả`, `Số tiền phải hoàn trả (đ)`, `Đã nộp (đ)`, `Còn phải thu (đ)`, `Trạng thái`, `Thao tác`.<br>- Dữ liệu các cột: theo dữ liệu bản ghi.<br>- `Phương thức hoàn trả`: `Một lần` / `Nhiều lần` theo ý kiến của Hội đồng tại Bước 2; hình thức `Miễn hoàn trả` hiển thị `--`. |
| Số tiền phải hoàn trả (đ) | - | - | Theo bản ghi | Control UI: Label.<br>- Theo Quyết định hoàn trả; sau Quyết định giảm mức hoàn trả: số tiền sau giảm.<br>- Cán bộ `Miễn hoàn trả`, `Đình chỉ hoàn trả`, `Chờ trả lại tiền (Đình chỉ hoàn trả)`: bằng số tiền đã thu (0 khi chưa thu hoặc đã trả lại).<br>- `Tổng phải thu` của phần đơn vị: tổng cột này của các cán bộ trong khối. |
| Còn phải thu (đ) | - | - | Theo bản ghi | Control UI: Label.<br>- Bằng `Số tiền phải hoàn trả (đ)` trừ `Đã nộp (đ)`, tối thiểu 0. |
| Trạng thái | - | - | Theo bản ghi | Control UI: Label.<br>- Trạng thái chi tiết của cán bộ.<br>- Có trình ký miễn / giảm bổ sung hoặc trình ký Quyết định đình chỉ: dòng dưới hiển thị `Chờ duyệt` / `Bị từ chối` kèm Loại trình; `Bị từ chối` hiển thị thêm lý do.<br>- Quyết định đình chỉ đã ban hành: dòng dưới hiển thị `Chờ trả lại tiền (Đình chỉ hoàn trả)` (khi chưa cập nhật trả lại tiền) và `QĐ đình chỉ số [Số, ký hiệu] ngày [Ngày] - [Phương án xử lý số tiền đã thu]`.<br>- Có số tiền cần trả lại: dòng dưới hiển thị `Cần trả lại: [Số tiền] đ`.<br>- Đã trả lại tiền: dòng dưới hiển thị `Đã trả lại [Số tiền] đ ngày [Ngày]`.<br>- Cán bộ có `Điều kiện hoãn thực hiện việc hoàn trả (nếu có)`: nhãn `Hoãn hoàn trả`. |
| Thao tác | Action | - | - | Control UI: Icon button group; mọi nút luôn hiển thị; tooltip là tên nút; thao tác không được phép hiển thị khóa mờ, tooltip `[Tên nút] - [Lý do]`.<br>Gồm:<br>+ Xem lịch sử nộp tiền<br>+ Ghi nhận nộp tiền<br>+ Cập nhật trả lại tiền<br>+ Trình ký QĐ miễn bổ sung<br>+ Trình ký QĐ giảm bổ sung<br>- `Ghi nhận nộp tiền`: cho phép khi cán bộ `Thu hồi tiền hoàn trả`, `Còn phải thu (đ)` > 0, không có số tiền cần trả lại và không có Quyết định đình chỉ `Chờ duyệt` / chờ trả lại tiền; người dùng thuộc đơn vị của cán bộ hoặc Sở Tư pháp.<br>- `Cập nhật trả lại tiền`: cho phép khi cán bộ có số tiền cần trả lại (giảm bổ sung nộp thừa hoặc `Chờ trả lại tiền (Đình chỉ hoàn trả)`); người dùng thuộc đơn vị của cán bộ hoặc Sở Tư pháp.<br>- `Trình ký QĐ miễn bổ sung`, `Trình ký QĐ giảm bổ sung`: cho phép khi cán bộ `Thu hồi tiền hoàn trả`, `Còn phải thu (đ)` > 0, không có trình ký bổ sung đang chờ duyệt, không có trình ký Quyết định đình chỉ chưa ban hành; người dùng thuộc đơn vị của cán bộ; `Trình ký QĐ giảm bổ sung` chỉ cho phép khi `Mức độ lỗi` là `Vô ý`; trình ký bổ sung `Bị từ chối`: tooltip `Trình ký lại`.<br>- Sở Tư pháp: `Trình ký QĐ miễn bổ sung`, `Trình ký QĐ giảm bổ sung` khóa mờ, tooltip `Sở Tư pháp không thực hiện Miễn hoàn trả, Giảm mức hoàn trả`.<br>- Lãnh đạo được giao tại cấp hiện hành, cán bộ có trình ký bổ sung `Chờ duyệt`: `Ký duyệt`, `Từ chối`. |

<a id="chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra"></a>
##### 4.3.3.5.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| - | **Bước 1: Thành lập Hội đồng** | - | - |
| 1 | Thành lập hội đồng | Button | Mở [Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tao-moi-hoi-dong). |
| 2 | Trình ký lại | Button | Mở [Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tao-moi-hoi-dong), điền sẵn dữ liệu lần trình trước. |
| 3 | Xóa văn bản (Văn bản liên quan) | Icon button | Click: hiển thị popup xác nhận [MSG-CFM-SYS-001].<br>- Tại popup chọn `Đồng ý`: gỡ văn bản khỏi bảng `Văn bản liên quan`.<br>- Tại popup chọn `Hủy bỏ`: đóng popup, giữ nguyên dữ liệu. |
| - | **Bước 2: Ý kiến hội đồng** | - | - |
| 4 | Thêm cán bộ gây sai phạm | Button | Mở [Popup Thêm/Cập nhật cán bộ chịu trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-them-cap-nhat-can-bo-hoan-tra) ở chế độ thêm mới. |
| 5 | Xem chi tiết cán bộ | Icon button | Mở [Popup Thêm/Cập nhật cán bộ chịu trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-them-cap-nhat-can-bo-hoan-tra) ở chế độ chỉ xem, nạp sẵn dữ liệu của cán bộ. |
| 6 | Sửa cán bộ | Icon button | Mở [Popup Thêm/Cập nhật cán bộ chịu trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-them-cap-nhat-can-bo-hoan-tra) ở chế độ cập nhật, nạp sẵn dữ liệu của cán bộ. |
| 7 | Xóa cán bộ | Icon button | Click: hiển thị popup xác nhận [MSG-CFM-SYS-001].<br>- Tại popup chọn `Đồng ý`: xóa cán bộ khỏi danh sách, đánh lại STT, hiển thị [MSG-SUC-BTNN-HT-009].<br>- Tại popup chọn `Hủy bỏ`: đóng popup, giữ nguyên dữ liệu. |
| 8 | Tải Mẫu 35/BTNN | Link | - **TH1 - Chưa có cán bộ**: hiển thị cảnh báo, không tải.<br>- **TH Hợp lệ**: Tải văn bản sinh theo Mẫu 35/BTNN, mỗi cán bộ gây sai phạm 01 khối nội dung. |
| 9 | Thêm tài liệu / Tải file / Xem file / Xóa (Tài liệu kèm theo) | Button | Thao tác trên bảng `Tài liệu kèm theo` như bảng `Tài liệu kèm theo` của Bước 3 tại chức năng `Thêm tài liệu`, `Tải file (Tài liệu kèm theo)`, `Xem file / Xóa (Tài liệu kèm theo)`. |
| 10 | Tải file (Văn bản kiến nghị) | Button | Áp dụng [Quy tắc tải tệp đính kèm - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-quy-tac-tai-tep) với định dạng `.pdf`, `.doc`, `.docx`. |
| 11 | Xóa tệp (Văn bản kiến nghị) | Text link | Hiển thị popup xác nhận; chọn `Đồng ý` thì gỡ tệp khỏi danh sách; chọn `Hủy bỏ` thì đóng popup. |
| 12 | Hoàn thành Bước 2 | Button | Khi click, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp:<br>- **TH1 - Bỏ trống trường bắt buộc**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không hoàn thành.<br>- **TH2 - Chưa có cán bộ**: hiển thị [MSG-ERR-BTNN-HT-007] dưới bảng danh sách cán bộ; không hoàn thành.<br>- **TH Hợp lệ**: hiển thị popup xác nhận `Danh sách cán bộ gây sai phạm sẽ được phân tách về [Số đơn vị] đơn vị quản lý cán bộ và không được cập nhật ý kiến của Hội đồng. Bạn có chắc chắn muốn hoàn thành Bước 2?` (nút `Hủy bỏ`, `Hoàn thành`); chọn `Hoàn thành` thì:<br>+ Lưu ý kiến chung, tài liệu kèm theo, danh sách cán bộ và văn bản kiến nghị.<br>+ Phân tách danh sách cán bộ thành phần đơn vị theo `Đơn vị quản lý cán bộ`; mỗi phần đơn vị mang theo `Văn bản kiến nghị` và `Tài liệu kèm theo` của Bước 2.<br>+ Hồ sơ và từng cán bộ chuyển `Chờ ban hành QĐ hoàn trả`; mở khóa `Bước 3: Ban hành QĐ`.<br>+ Hồ sơ hiển thị với đơn vị quản lý cán bộ theo [Phạm vi dữ liệu theo đơn vị - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-pham-vi-du-lieu).<br>+ Bước 2 chuyển chỉ đọc, hiển thị khối `Phân tách theo đơn vị quản lý cán bộ`.<br>+ Hiển thị [MSG-SUC-BTNN-HT-006]. |
| 13 | Đình chỉ | Button | Đình chỉ cả hồ sơ: mở [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra) ở chế độ cả hồ sơ; hồ sơ kết thúc ở trạng thái `Đình chỉ xem xét hoàn trả` khi Quyết định đình chỉ được ban hành (Ký ngoài) hoặc được Lãnh đạo cấp cuối Ký duyệt (Ký số trên hệ thống); thanh tiến trình giữ tại bước của hồ sơ khi đình chỉ.<br>- Áp dụng cả nút `Đình chỉ (Bước 1)`. |
| 14 | Trình ký QĐ đình chỉ (Bước 2) | Button | Khi click, hệ thống kiểm tra và xử lý theo các trường hợp:<br>- **TH1 - Chưa chọn cán bộ**: hiển thị cảnh báo `Vui lòng chọn ít nhất 01 cán bộ để trình ký Quyết định đình chỉ.`; không mở popup.<br>- **TH2 - Chọn toàn bộ cán bộ**: như chức năng `Đình chỉ` (đình chỉ cả hồ sơ).<br>- **TH3 - Chọn một phần cán bộ**: mở [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra) ở chế độ cả hồ sơ, đầu popup hiển thị `Đình chỉ đối với cán bộ: [Danh sách cán bộ]`; trình Lãnh đạo: hồ sơ `Chờ duyệt` (Loại trình `QĐ đình chỉ`); ban hành: các cán bộ được chọn chuyển `Đình chỉ hoàn trả`, hồ sơ trở lại `Họp hội đồng`, ghi lịch sử `Ban hành Quyết định đình chỉ đối với cán bộ: [Danh sách cán bộ]`.<br>- Hoàn thành Bước 2: cán bộ `Đình chỉ hoàn trả` không được phân tách về đơn vị quản lý cán bộ. |
| - | **Bước 3: Ban hành Quyết định hoàn trả** | - | - |
| 15 | Trình ký QĐ hoàn trả / Trình ký lại | Button | Mở [Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-ban-hanh-qd-hoan-tra) với Loại trình `QĐ hoàn trả` (Mẫu 36/BTNN), đơn vị ban hành là đơn vị của phần đơn vị.<br>- `Trình ký lại`: điền sẵn dữ liệu lần trình trước. |
| 16 | Ký duyệt (QĐ hoàn trả) | Button | Mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh) với thao tác `Ký duyệt`; xử lý:<br>- **TH1 - Lãnh đạo trước cấp cuối**: ghi Lịch sử trình ký hành động `Ký duyệt`; chuyển Lãnh đạo cấp tiếp theo; phần đơn vị giữ `Chờ duyệt` (Loại trình `QĐ hoàn trả`).<br>- **TH2 - Lãnh đạo cấp cuối**: ký số văn bản (theo Cấu hình luồng xử lý), cấp Số, ký hiệu văn bản khi chưa có; ban hành Quyết định hoàn trả; thực hiện `Ban hành Quyết định hoàn trả`. |
| 17 | Từ chối (QĐ hoàn trả) | Button | Mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tu-choi-phe-duyet-quyet-dinh) với thao tác `Từ chối`; xử lý:<br>- Lưu lý do, người từ chối, thời điểm; ghi Lịch sử trình ký hành động `Từ chối - trả lại cán bộ trình`.<br>- Phần đơn vị và các cán bộ của đơn vị chuyển `Bị từ chối` (Loại trình `QĐ hoàn trả`). |
| 18 | Ban hành Quyết định hoàn trả | Hệ thống | Thực hiện khi Lãnh đạo cấp cuối `Ký duyệt` hoặc cán bộ `Ban hành văn bản` (Ký ngoài):<br>- Phần đơn vị chuyển `Đã ban hành QĐ hoàn trả`.<br>- Từng cán bộ của đơn vị (trừ cán bộ `Đình chỉ hoàn trả`) chuyển theo `Hình thức xử lý`:<br>+ Hoàn trả 100%: `Thu hồi tiền hoàn trả`; số tiền phải hoàn trả bằng `Số tiền cần hoàn trả (đ)`.<br>+ Miễn hoàn trả: `Chờ ban hành QĐ Miễn hoàn trả`; mở nút `Trình ký QĐ miễn`.<br>+ Giảm mức hoàn trả: `Chờ ban hành QĐ Giảm mức hoàn trả`; mở nút `Trình ký QĐ giảm`.<br>- Hồ sơ hiển thị với Sở Tư pháp quản lý đơn vị theo [Phạm vi dữ liệu theo đơn vị - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-pham-vi-du-lieu).<br>- Mở khóa `Bước 4: Thu hồi tiền hoàn trả` khi có cán bộ `Thu hồi tiền hoàn trả`. |
| 19 | Trình ký QĐ miễn / Trình ký QĐ giảm / Trình ký lại | Button | Mở [Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-ban-hanh-qd-hoan-tra) cho cán bộ đang chọn:<br>- `Trình ký QĐ miễn`: Loại trình `QĐ miễn hoàn trả` (Mẫu 38/BTNN).<br>- `Trình ký QĐ giảm`: Loại trình `QĐ giảm mức hoàn trả` (Mẫu 37/BTNN).<br>- `Trình ký lại`: điền sẵn dữ liệu lần trình trước. |
| 20 | Ký duyệt (QĐ miễn / QĐ giảm) | Icon button | Mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh) với thao tác `Ký duyệt`; xử lý:<br>- **TH1 - Lãnh đạo trước cấp cuối**: chuyển Lãnh đạo cấp tiếp theo; cán bộ giữ `Chờ duyệt`.<br>- **TH2 - Lãnh đạo cấp cuối, QĐ miễn hoàn trả**: ban hành; cán bộ chuyển `Miễn hoàn trả` (kết thúc).<br>- **TH3 - Lãnh đạo cấp cuối, QĐ giảm mức hoàn trả**: ban hành; số tiền phải hoàn trả bằng `Số tiền sau giảm (đ)`; cán bộ chuyển `Thu hồi tiền hoàn trả`; mở khóa `Bước 4: Thu hồi tiền hoàn trả`.<br>- Ban hành bằng `Ký ngoài`: xử lý như TH2, TH3. |
| 21 | Từ chối (QĐ miễn / QĐ giảm) | Icon button | Mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tu-choi-phe-duyet-quyet-dinh) với thao tác `Từ chối`; cán bộ chuyển `Bị từ chối` (Loại trình `QĐ miễn hoàn trả` / `QĐ giảm mức hoàn trả`); lưu lý do, người từ chối, thời điểm. |
| 22 | Xem QĐ miễn / Xem QĐ giảm | Button | Mở [Popup Xem Quyết định miễn hoàn trả, giảm mức hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-xem-qd-mien-giam) của cán bộ đang chọn. |
| 23 | Thêm tài liệu | Button | Tại bảng `Tài liệu kèm theo`: thêm 01 dòng trống vào cuối bảng. |
| 24 | Tải file (Tài liệu kèm theo) | Button | Tại dòng của bảng `Tài liệu kèm theo`, hệ thống mở hộp thoại chọn tệp và xử lý theo các trường hợp:<br>- **TH1 - Sai định dạng file**: Tệp không thuộc `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`: hiển thị cảnh báo lỗi [MSG-ERR-FILE-001] dưới ô, không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng**: Tệp vượt quá 50MB: hiển thị cảnh báo lỗi [MSG-ERR-FILE-002] dưới ô, không tiếp nhận tệp.<br>- **TH Hợp lệ**: Hiển thị tên tệp, dung lượng tại cột `File đính kèm`; `Tên tài liệu, văn bản` đang trống thì điền theo tên tệp (bỏ phần mở rộng). |
| 25 | Xem file / Xóa (Tài liệu kèm theo) | Icon button | - `Xem file`: mở tệp đã tải lên tại tab mới; chỉ bấm được khi dòng đã có tệp.<br>- `Xóa`: xóa dòng ngay, không hiển thị popup xác nhận. |
| - | **Bước 4: Thu hồi tiền hoàn trả** | - | - |
| 26 | Xem lịch sử nộp tiền | Icon button | Mở [Popup Chi tiết tiến trình nộp tiền của cán bộ - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-chi-tiet-tien-trinh-nop-tien). |
| 27 | Ghi nhận nộp tiền / Cập nhật trả lại tiền | Icon button | Mở [Popup Ghi nhận nộp tiền hoàn trả ngân sách - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-ghi-nhan-nop-tien) của cán bộ với thao tác tương ứng. |
| 28 | Trình ký QĐ miễn bổ sung / Trình ký QĐ giảm bổ sung | Icon button | Mở [Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-ban-hanh-qd-hoan-tra) với Loại trình `QĐ miễn hoàn trả` (Mẫu 38/BTNN) / `QĐ giảm mức hoàn trả` (Mẫu 37/BTNN), có khối `Miễn / Giảm bổ sung`.<br>- Trình Lãnh đạo: cán bộ giữ `Thu hồi tiền hoàn trả`, dòng phụ `Chờ duyệt` (Loại trình tương ứng).<br>- `Từ chối`: dòng phụ `Bị từ chối` (Loại trình tương ứng). |
| 29 | Ban hành QĐ miễn / QĐ giảm bổ sung | Hệ thống | Thực hiện khi Lãnh đạo cấp cuối `Ký duyệt` hoặc cán bộ `Ban hành văn bản` (Ký ngoài):<br>- **TH1 - QĐ miễn hoàn trả**: miễn số tiền còn phải thu, không hoàn trả số tiền đã nộp; cán bộ chuyển `Miễn hoàn trả`.<br>- **TH2 - QĐ giảm, số tiền sau giảm mới lớn hơn số đã nộp**: số tiền phải hoàn trả bằng số tiền sau giảm mới; cán bộ giữ `Thu hồi tiền hoàn trả`.<br>- **TH3 - QĐ giảm, số tiền sau giảm mới bằng số đã nộp**: cán bộ chuyển `Hoàn thành`.<br>- **TH4 - QĐ giảm, số tiền sau giảm mới nhỏ hơn số đã nộp**: số tiền cần trả lại bằng số đã nộp trừ số tiền sau giảm mới; cán bộ giữ `Thu hồi tiền hoàn trả` đến khi `Cập nhật trả lại tiền`. |
| 30 | Tự động chuyển Hoàn thành | Hệ thống | Theo [Quy tắc tự động chuyển trạng thái Hoàn thành - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-tu-dong-hoan-thanh). |
| - | **Đình chỉ cấp cán bộ (Bước 3, Bước 4)** | - | - |
| 31 | Chọn cán bộ / Chọn tất cả | Checkbox | Đánh dấu cán bộ đủ điều kiện đình chỉ của phần đơn vị; `Chọn tất cả` chọn / bỏ chọn toàn bộ cán bộ đủ điều kiện của bảng. |
| 32 | Trình ký QĐ đình chỉ | Button | Khi click, hệ thống kiểm tra và xử lý theo các trường hợp:<br>- **TH1 - Chưa chọn cán bộ**: hiển thị cảnh báo `Vui lòng chọn ít nhất 01 cán bộ để trình ký Quyết định đình chỉ.`; không mở popup.<br>- **TH Hợp lệ**: mở [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra) ở chế độ cấp cán bộ, kế thừa danh sách cán bộ đã chọn; đơn vị ban hành là đơn vị của phần đơn vị.<br>- Trình Lãnh đạo: các cán bộ được chọn giữ trạng thái hiện tại kèm dòng phụ `Chờ duyệt (QĐ đình chỉ)`. |
| 33 | Ký duyệt / Từ chối (QĐ đình chỉ) | Icon button | Tại khối `Quyết định đình chỉ (Mẫu 39/BTNN)`; mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh) với thao tác tương ứng:<br>- **TH1 - Ký duyệt, Lãnh đạo trước cấp cuối**: chuyển Lãnh đạo cấp tiếp theo; giữ `Chờ duyệt (QĐ đình chỉ)`.<br>- **TH2 - Ký duyệt, Lãnh đạo cấp cuối**: ký số, cấp Số, ký hiệu văn bản khi chưa có; thực hiện `Ban hành Quyết định đình chỉ`.<br>- **TH3 - Từ chối**: lưu lý do, người từ chối, thời điểm; các cán bộ của lượt trình có dòng phụ `Bị từ chối (QĐ đình chỉ)`; hiển thị nút `Trình ký lại`. |
| 34 | Trình ký lại (QĐ đình chỉ) | Button | Mở [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra) ở chế độ cấp cán bộ, điền sẵn danh sách cán bộ, phương án xử lý số tiền đã thu và dữ liệu lần trình trước. |
| 35 | Ban hành Quyết định đình chỉ | Hệ thống | Thực hiện khi Lãnh đạo cấp cuối `Ký duyệt` hoặc cán bộ `Ban hành văn bản` (Ký ngoài); xử lý từng cán bộ của Quyết định:<br>- **TH1 - Cán bộ chưa nộp tiền**: cán bộ chuyển `Đình chỉ hoàn trả`.<br>- **TH2 - Đã nộp > 0, phương án `Không hoàn trả lại số tiền đã thu`**: cán bộ chuyển `Đình chỉ hoàn trả`; số tiền phải hoàn trả bằng số tiền đã thu.<br>- **TH3 - Đã nộp > 0, phương án `Hoàn trả lại số tiền đã thu cho cán bộ`**: cán bộ giữ `Thu hồi tiền hoàn trả` kèm dòng phụ `Chờ trả lại tiền (Đình chỉ hoàn trả)`; số tiền cần trả lại bằng số tiền đã thu; mở `Cập nhật trả lại tiền`; sau khi cập nhật trả lại tiền, cán bộ chuyển `Đình chỉ hoàn trả`.<br>- Toàn bộ cán bộ của phần đơn vị `Đình chỉ hoàn trả` trước khi ban hành Quyết định hoàn trả: phần đơn vị chuyển `Đình chỉ hoàn trả`.<br>- Trạng thái chung theo [Quy tắc tổng hợp trạng thái chung - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-trang-thai-chung); toàn bộ cán bộ `Đình chỉ hoàn trả`: `Đình chỉ xem xét hoàn trả`.<br>- Cán bộ `Đình chỉ hoàn trả`: khóa mọi thao tác, chỉ xem. |
| - | **Thao tác chung màn hình** | - | - |
| 36 | Đóng | Button | Đóng màn hình, quay lại [MH01 - Màn hình Danh sách hồ sơ xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#mh01-danh-sach-ho-so-hoan-tra), không lưu dữ liệu. |
---

<a id="popup-tao-moi-hoi-dong"></a>
#### 4.3.3.5.6. Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả

##### 4.3.3.5.6.1. Màn hình

![Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả](images/UC_Xem_Xet_Hoan_Tra_MH04.png)

Popup mở khi Cán bộ xử lý click `Thành lập hội đồng` tại Bước 1 (hồ sơ nháp - mới khởi tạo, chưa có trạng thái; Ký số trên hệ thống: trình Lãnh đạo -> `Chờ duyệt` (Loại trình `Thành lập hội đồng`); Ký ngoài: ban hành -> `Họp hội đồng`) hoặc `Trình ký lại` (hồ sơ `Bị từ chối` (Loại trình `Thành lập hội đồng`)). Bố cục như [Popup Không thụ lý hồ sơ - SRS Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#433115-popup-không-thụ-lý-hồ-sơ).
- Thanh Stepper 2 bước chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`; ẩn khi `Ký ngoài`.
- Ký số trên hệ thống: Wizard 2 bước.
  + **Bước 1 - Nhập thông tin**: thứ tự khối `Hình thức ký` (đầu form), `Tệp văn bản trình ký` (nguồn tệp; Số quyết định, Ngày quyết định, Bảng danh sách thành viên trong hội đồng khi Sinh văn bản theo mẫu 33/BTNN).
  + **Bước 2 - Kéo ô ký & chọn Lãnh đạo**: vùng trái là văn bản A4 Mẫu 33/BTNN; vùng phải là các thẻ `Cấp [n] - [Đơn vị]` (chọn Lãnh đạo, `Đặt chữ ký`, ký nháy) và `Nội dung trình`.
- Luồng trình ký theo luồng đã cấu hình tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md); số cấp theo cấu hình.
- Ký ngoài: không hiển thị Stepper; thứ tự khối `Hình thức ký`, `Tệp văn bản đã ký & đóng dấu`; chỉ đính kèm văn bản PDF đã ký và ban hành trực tiếp, không nhập Số quyết định, Ngày quyết định, danh sách thành viên.
- Căn cứ vụ việc (Mã vụ việc, Mã hồ sơ GQBT, Quyết định giải quyết bồi thường) kế thừa từ hồ sơ, không nhập tại popup.
- Thanh nút: `Hủy bỏ` và nút chính (Ký số Bước 1: `Tiếp tục`; Ký số Bước 2: `Quay lại`, `Trình Lãnh đạo`; Ký ngoài: `Ban hành văn bản`).
- Văn bản: [Mẫu 33/BTNN - Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md#mau-33).
- Bước 2 mở rộng popup toàn màn hình; tiêu đề và thanh nút cố định, thân popup cuộn dọc.

##### 4.3.3.5.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | `THÀNH LẬP HỘI ĐỒNG XEM XÉT TRÁCH NHIỆM HOÀN TRẢ` | Control UI: Text heading (Read-only).<br>- Dòng phụ đề: `Hồ sơ`, `Người yêu cầu bồi thường`, `Đơn vị chi trả bồi thường` theo hồ sơ hoàn trả. |
| Thanh chỉ trình (Stepper) | Component | - | Bước 1 active | Control UI: Stepper 2 bước.<br>- Bước 1: `Nhập thông tin`.<br>- Bước 2: `Kéo ô ký & chọn Lãnh đạo`.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`; ẩn khi `Ký ngoài`. |
| Khối Hồ sơ bị từ chối | Section | - | Ẩn | Control UI: Khối cảnh báo (Read-only).<br>- Chỉ hiển thị khi hồ sơ `Bị từ chối` (Loại trình `Thành lập hội đồng`).<br>- Gồm Lý do từ chối, Người từ chối, Thời điểm.<br>- Các trường của popup điền theo lần trình trước. |
| Hình thức ký | Enum(String(50)) | Có | `Ký số trên hệ thống` | Control UI: Radio button dạng 02 thẻ chọn cùng chiều cao, khối đầu tiên của form.<br>- Mỗi thẻ gồm tiêu đề và mô tả bên dưới.<br>Gồm:<br>+ Ký số trên hệ thống: mô tả `Trình Lãnh đạo ký duyệt trên phần mềm`<br>+ Ký ngoài (Ban hành trực tiếp): mô tả `Tải lên văn bản PDF đã ký và đóng dấu` |
| **Khối Tệp văn bản trình ký** | Section | - | - | Control UI: Section header.<br>- Khi chọn `Ký ngoài`, khối đổi thành `Tệp văn bản đã ký & đóng dấu`. |
| Tệp văn bản trình ký | File | Có (khi Ký số) | `Sinh văn bản theo mẫu 33/BTNN` | Control UI: Segmented control chọn nguồn tệp.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`.<br>Gồm:<br>+ Sinh văn bản theo mẫu 33/BTNN<br>+ Tải lên từ máy<br>- `Sinh văn bản theo mẫu 33/BTNN`: khối thông tin điền vào Mẫu 33/BTNN; dưới khối là dòng `Hệ thống tự động sinh Quyết định theo Mẫu 33/BTNN từ thông tin đang nhập.` và nút `Xem trước văn bản` trên cùng 1 dòng.<br>- `Tải lên từ máy`: vùng kéo thả `Kéo thả tệp vào đây hoặc Chọn tệp từ máy`, dòng phụ `Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)`; nhận tệp bằng kéo thả hoặc click.<br>- Tệp `.doc`, `.docx`: hiển thị `Đang chuyển đổi sang PDF...` trong lúc hệ thống chuyển đổi sang PDF; khóa nút `Tiếp tục` đến khi chuyển đổi xong.<br>- Có tệp: File Card gồm tên tệp, dung lượng (tệp đã chuyển đổi: kèm `Đã chuyển đổi từ [tên tệp gốc]`), nút `Xem file`, `Xóa`. |
| **Thông tin điền vào Mẫu 33/BTNN** | Section | - | - | Control UI: Section.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 33/BTNN`. |
| Số quyết định | String(50) | Có (khi hiển thị) | `     /QĐ-` | Control UI: Input text.<br>- Placeholder: `Nhập số quyết định...`.<br>- Điều kiện hiển thị như khối `Thông tin điền vào Mẫu 33/BTNN`. |
| Ngày quyết định | Date | Có (khi hiển thị) | Ngày hiện tại | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Điều kiện hiển thị như `Số quyết định`. |
| Bảng danh sách thành viên trong hội đồng | Table | Có (khi hiển thị) | 01 dòng trống | Control UI: Editable Data grid kèm nút `Thêm thành viên`.<br>- Điều kiện hiển thị như `Số quyết định`.<br>- Cột: `STT` \| `Họ và tên` \| `Đơn vị công tác` \| `Chức vụ` \| `Chức danh trong hội đồng` \| `Xóa`.<br>- Tối thiểu 01 thành viên; còn 01 dòng thì nút `Xóa` bị khóa. |
| STT | Integer | - | Hệ thống tự sinh | Control UI: Text (Read-only).<br>- Đánh số 1, 2, 3... theo thứ tự dòng. |
| Họ và tên | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên...`. |
| Đơn vị công tác | Enum(String(255)) | Có | Trống | Control UI: Tree-Select (cây đơn vị phân cấp có tìm kiếm theo Tên hoặc Mã đơn vị).<br>- Placeholder: `-- Chọn đơn vị --`.<br>- Danh sách: cây cơ quan, đơn vị của hệ thống tại Quản lý cơ cấu tổ chức.<br>- Hiển thị `[Mã đơn vị] - [Tên đơn vị]`. |
| Chức vụ | Enum(String(255)) | Có | Trống | Control UI: Combobox.<br>- Placeholder: `-- Chọn chức vụ --`.<br>- Danh sách: các chức vụ của Loại cơ quan [DM_57] của đơn vị đã chọn tại `Đơn vị công tác`, theo Danh mục Chức vụ [DM_58].<br>- Chưa chọn `Đơn vị công tác`: ô bị khóa.<br>- Đổi `Đơn vị công tác`: hệ thống xóa giá trị đã chọn và nạp lại danh sách. |
| Chức danh trong hội đồng | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập chức danh trong hội đồng...`. |
| Tệp văn bản PDF đã ký & đóng dấu | File | Có (khi Ký ngoài) | Trống | Control UI: Vùng kéo thả.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký ngoài`.<br>- Nội dung: `Kéo thả tệp PDF đã ký & đóng dấu vào đây, hoặc bấm Tải file` và `(Chỉ chấp nhận .pdf, tối đa 50MB)`; nhận tệp bằng kéo thả hoặc click.<br>- Có tệp: File Card gồm tên tệp, dung lượng, nút `Xem file`, `Xóa`.<br>- Thông báo dưới vùng tải tệp: `Khi bấm Ban hành văn bản, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang trạng thái Họp hội đồng.` |
| Khung văn bản A4 trực quan (Bước 2) | Component | - | Mẫu 33/BTNN | Control UI: Trang văn bản mô phỏng A4.<br>- Nội dung theo [Mẫu 33/BTNN - Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md#mau-33).<br>- `Tải lên từ máy`: hiển thị tệp đã tải lên. |
| Thẻ cấp ký (Bước 2) | Component | - | Theo luồng đã cấu hình | Control UI: Danh sách thẻ tại vùng phải Bước 2, mỗi cấp ký 01 thẻ.<br>- Luồng trình ký theo luồng đã cấu hình tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md) của cơ quan đã chi trả tiền bồi thường.<br>- Tiêu đề thẻ: `Cấp [n] - [Đơn vị]`.<br>- Nhãn `Ký nháy` hiển thị khi cấp đó được cấu hình Ký nháy tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md); không cấu hình thì không hiển thị nhãn.<br>- Mỗi thẻ gồm ô `Lãnh đạo` và nút `Đặt chữ ký`. |
| Lãnh đạo (từng cấp) | Enum(String(100)) | Có | Lãnh đạo đầu tiên của nhóm lãnh đạo cấp đó; hồ sơ `Bị từ chối` (Loại trình `Thành lập hội đồng`): Lãnh đạo đã chọn lần trình trước | Control UI: Combobox tại từng thẻ cấp ký.<br>- Danh sách: nhóm lãnh đạo của cấp tương ứng theo Cấu hình luồng xử lý, hiển thị `[Họ tên] - [Chức vụ]`.<br>- Cấp chưa cấu hình nhóm lãnh đạo: ô bị khóa, không bắt buộc.<br>- Lãnh đạo cấp cuối hiển thị tại dòng ký của văn bản. |
| Áp dụng ký nháy Lãnh đạo cấp 1 | Boolean | - | Chọn | Control UI: Checkbox tại thẻ Cấp 1 (luồng từ 02 cấp trở lên).<br>- Bỏ chọn: ẩn ô ký và nút `Đặt chữ ký` của Cấp 1. |
| Ô ký (từng cấp) | Draggable Box | - | Không hiển thị | Control UI: Khung kéo thả trên văn bản A4.<br>- Chỉ sinh khi bấm `Đặt chữ ký` tại thẻ cấp tương ứng.<br>- Nhãn: `KÝ NHÁY` / `KÝ SỐ & CON DẤU`, `Cấp [n]`, tên Lãnh đạo, tọa độ X, Y.<br>- Kéo ô để đổi vị trí; kéo góc dưới phải để đổi kích thước. |
| Nội dung trình | Text(2000) | Có | `Kính trình Lãnh đạo xem xét, ký duyệt Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả.` | Control UI: Textarea (4 dòng), cuối vùng phải Bước 2.<br>- Placeholder: `Nhập nội dung trình Lãnh đạo...`. |

##### 4.3.3.5.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn hình thức ký | Radio | Chuyển đổi giữa `Ký số trên hệ thống` và `Ký ngoài`.<br>- `Ký số trên hệ thống`: hiển thị Stepper 2 bước, khối Tệp văn bản trình ký, nút `Tiếp tục`.<br>- `Ký ngoài`: ẩn Stepper; ẩn nguồn tệp, `Số quyết định`, `Ngày quyết định`, `Bảng danh sách thành viên trong hội đồng`; hiển thị vùng kéo thả Tệp văn bản PDF đã ký & đóng dấu, nút `Ban hành văn bản`. |
| 2 | Chọn nguồn Tệp văn bản trình ký | Segmented control | - `Sinh văn bản theo mẫu 33/BTNN`: hiển thị `Số quyết định`, `Ngày quyết định`, `Bảng danh sách thành viên trong hội đồng`, nút `Xem trước văn bản`.<br>- `Tải lên từ máy`: ẩn các trường trên; hiển thị vùng kéo thả.<br>- Đổi nguồn thì gỡ tệp đã tải lên, dừng chuyển đổi đang chạy. |
| 3 | Thêm thành viên | Button | Thêm 01 dòng trống cuối Bảng danh sách thành viên trong hội đồng; `STT` tự sinh. |
| 4 | Chọn Đơn vị công tác | Tree-Select | Nạp lại danh sách `Chức vụ` của dòng theo Loại cơ quan [DM_57] của đơn vị đã chọn trong Danh mục Chức vụ [DM_58]; xóa giá trị `Chức vụ` đã chọn. |
| 5 | Xóa dòng thành viên | Icon button | Hiển thị Popup xác nhận xóa thành viên khi dòng đã có dữ liệu; Đồng ý thì gỡ dòng và đánh lại `STT`.<br>- Bảng còn 01 dòng: nút bị khóa. |
| 6 | Tải tệp | Drag & Drop / Click | Kéo thả tệp vào vùng tải tệp hoặc click vùng tải tệp để mở trình chọn tệp:<br>- **TH1 - Sai định dạng file**: Tệp không thuộc định dạng `.pdf`, `.doc`, `.docx` (Ký ngoài: `.pdf`): hiển thị cảnh báo lỗi [MSG-ERR-FILE-001], tô viền đỏ vùng tải tệp, không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng**: Tệp vượt quá 50MB: hiển thị cảnh báo lỗi [MSG-ERR-FILE-002], tô viền đỏ vùng tải tệp, không tiếp nhận tệp.<br>- **TH3 - Tệp .doc, .docx (Tải lên từ máy)**: hiển thị `Đang chuyển đổi sang PDF...`, khóa nút `Tiếp tục`; chuyển đổi xong thì hiển thị File Card của tệp PDF.<br>- **TH Hợp lệ**: Hiển thị File Card gồm tên tệp, dung lượng, nút `Xem file`, `Xóa`. |
| 7 | Xem trước văn bản | Button | Sinh văn bản theo Mẫu 33/BTNN từ thông tin đang nhập và mở xem tại tab mới. |
| 8 | Xem file | Button | Mở xem tệp đã tải lên tại tab mới. |
| 9 | Xóa | Button | Gỡ tệp đã tải lên; hiển thị lại vùng kéo thả. |
| 10 | Tiếp tục | Button | Tại Bước 1 (Ký số trên hệ thống); bị khóa khi đang chuyển đổi tệp sang PDF.<br>- **TH1 - Bỏ trống trường bắt buộc**: `Số quyết định`, `Ngày quyết định`, các cột bắt buộc của Bảng danh sách thành viên trong hội đồng (Sinh văn bản theo mẫu 33/BTNN) hoặc tệp tải lên (Tải lên từ máy): Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không chuyển bước.<br>- **TH Hợp lệ**: Sinh văn bản theo Mẫu 33/BTNN (nguồn Sinh văn bản) làm Tệp văn bản trình ký; chuyển sang Bước 2, mở rộng popup toàn màn hình. |
| 11 | Đặt chữ ký | Button | Tại Bước 2, trên từng thẻ cấp ký.<br>- Sinh ô ký của cấp đó trên văn bản A4 tại vị trí mặc định; ẩn nút `Đặt chữ ký`.<br>- Thẻ cấp hiển thị tọa độ, kích thước và nút `Nhỏ`, `Vừa`, `Lớn`, `Đặt lại`. |
| 12 | Áp dụng ký nháy Lãnh đạo cấp 1 | Checkbox | Bỏ chọn: ẩn ô ký và nút `Đặt chữ ký` của Cấp 1; chọn lại: hiển thị lại. |
| 13 | Quay lại | Button | Chuyển từ Bước 2 về Bước 1, thu nhỏ popup, giữ nguyên thông tin đã nhập. |
| 14 | Trình Lãnh đạo | Button | Tại Bước 2 (Ký số trên hệ thống).<br>- **TH1 - Bỏ trống trường bắt buộc**: `Lãnh đạo` từng cấp (cấp đã cấu hình nhóm lãnh đạo), `Nội dung trình`: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không trình.<br>- **TH Hợp lệ**: Lưu văn bản trình, Số quyết định, Ngày quyết định, danh sách thành viên, Lãnh đạo từng cấp, vị trí và kích thước ô ký, Nội dung trình; trình Lãnh đạo Cấp 1; hồ sơ chuyển `Chờ duyệt` (Loại trình `Thành lập hội đồng`); ghi Lịch sử xử lý Quyết định thành lập Hội đồng; đóng popup, hiển thị [MSG-SUC-BTNN-HT-002].<br>- Lãnh đạo được giao tại cấp hiện hành mới thấy nút `Ký duyệt`, `Từ chối` tại màn hình Xem chi tiết hồ sơ hoàn trả.<br>- Cấp trước cấp cuối `Ký duyệt`: chuyển Lãnh đạo cấp tiếp theo, giữ `Chờ duyệt` (Loại trình `Thành lập hội đồng`).<br>- Cấp cuối `Ký duyệt`: theo [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh); hồ sơ chuyển `Họp hội đồng`.<br>- `Từ chối` tại bất kỳ cấp nào: theo [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tu-choi-phe-duyet-quyet-dinh); hồ sơ chuyển `Bị từ chối` (Loại trình `Thành lập hội đồng`), Cán bộ xử lý `Trình ký lại` qua popup này. |
| 15 | Ban hành văn bản (Ký ngoài) | Button | Chỉ hiển thị khi `Hình thức ký` = `Ký ngoài`.<br>- **TH1 - Chưa tải tệp PDF đã ký**: Hệ thống tô viền đỏ vùng tải tệp, hiển thị [MSG-ERR-VAL-001] dưới vùng tải tệp và focus vào vùng tải tệp; không ban hành.<br>- **TH Hợp lệ**: Hiển thị Popup xác nhận `Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Hồ sơ sẽ chuyển sang trạng thái "Họp hội đồng". Bạn có chắc chắn muốn ban hành văn bản?` (nút `Hủy bỏ`, `Ban hành`); chọn `Ban hành` thì:<br>+ Lưu tệp PDF đã ký.<br>+ Ban hành trực tiếp, không qua Lãnh đạo duyệt trên hệ thống; hồ sơ chuyển `Họp hội đồng`.<br>+ Ghi Lịch sử xử lý; đóng popup, hiển thị [MSG-SUC-BTNN-HT-005]. |
| 16 | Hủy bỏ | Button | Đóng popup, không lưu thông tin đã nhập, giữ nguyên trạng thái hồ sơ; tương đương nút `×` trên tiêu đề popup. |

---

<a id="mh03-xem-chi-tiet-ho-so-hoan-tra"></a>
#### 4.3.3.5.7. MH03 - Màn hình Xem chi tiết hồ sơ hoàn trả

##### 4.3.3.5.7.1. Màn hình

![Màn hình Xem chi tiết hồ sơ hoàn trả](images/UC_Xem_Xet_Hoan_Tra_MH03.png)

##### 4.3.3.5.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Khối điều hướng và tiêu đề hồ sơ** | Section | - | - | Control UI: Section (Read-only).<br>- Màn hình chỉ đọc; Stepper mặc định mở bước theo trạng thái hồ sơ như chức năng `Click dòng dữ liệu` tại [MH01 - Màn hình Danh sách hồ sơ xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#mh01-danh-sach-ho-so-hoan-tra). |
| Đường dẫn điều hướng | - | - | Theo bản ghi | Control UI: Breadcrumb.<br>- Hiển thị `Quản lý xem xét trách nhiệm hoàn trả / Chi tiết hồ sơ <Mã hồ sơ>`. |
| Tiêu đề hồ sơ | - | - | Theo bản ghi | Control UI: Label.<br>- Hiển thị `Hồ sơ trách nhiệm hoàn trả: <Mã hồ sơ>`. |
| Trạng thái | - | - | Theo bản ghi | Control UI: Badge.<br>- Giống trường `Trạng thái` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra) (01 badge trạng thái chung theo phạm vi dữ liệu của người xem).<br>- Hồ sơ nháp: badge `Chờ xử lý`. |
| Mã vụ việc | - | - | Theo bản ghi | Control UI: Label.<br>- Hiển thị `Mã vụ việc - Họ và tên người yêu cầu`. |
| Mã hồ sơ GQBT | - | - | Theo bản ghi | Control UI: Link.<br>- Hiển thị `Mã hồ sơ GQBT` kèm `[Xem hồ sơ gốc]`; click mở hồ sơ Giải quyết yêu cầu bồi thường. |
| **II. Thông tin vụ việc bồi thường gốc** | Section | - | Thu gọn | Control UI: Accordion (Read-only).<br>- Gồm các trường giống khối `II. Thông tin vụ việc bồi thường gốc` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra). |
| **Khối Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả** | Section | - | Ẩn | Control UI: Info card (Read-only), đặt trên Khối thanh tiến trình.<br>- Chỉ hiển thị khi hồ sơ `Chờ duyệt` (Loại trình `QĐ đình chỉ`), `Bị từ chối` (Loại trình `QĐ đình chỉ`) hoặc `Đình chỉ xem xét hoàn trả`.<br>- Gồm: Hình thức ký, Trạng thái hồ sơ, Văn bản (liên kết mở văn bản tại tab mới), Số, ký hiệu văn bản và Ngày văn bản (khi Sinh văn bản theo mẫu 39/BTNN), Lãnh đạo được giao ký duyệt (`Cấp [n]/[Tổng số cấp] - [Đơn vị]: [Lãnh đạo]`, khi `Chờ duyệt` (Loại trình `QĐ đình chỉ`)), Lý do từ chối kèm Người từ chối, Thời điểm (khi `Bị từ chối` (Loại trình `QĐ đình chỉ`)), bảng `Tài liệu kèm theo` chỉ đọc.<br>- Khối thanh tiến trình giữ theo bước của hồ sơ tại thời điểm đình chỉ. |
| **III. Khối thanh tiến trình xử lý hồ sơ** | Section | - | Bước theo trạng thái hồ sơ | Control UI: Stepper 04 bước.<br>- Giống khối `III. Khối thanh tiến trình xử lý hồ sơ` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra); nội dung bước hiển thị chỉ đọc. |
| **IV. Bước 1: Thành lập Hội đồng** | Section | - | - | Control UI: Section (Read-only).<br>- Tiêu đề: `Thành lập Hội đồng xem xét trách nhiệm hoàn trả`. |
| Khối thông báo chưa thành lập Hội đồng | Section | - | - | Control UI: Call-to-action card.<br>- Chỉ hiển thị với hồ sơ nháp.<br>- Giống khối `Khối thông báo chưa thành lập Hội đồng` (kèm nút `Thành lập hội đồng`) tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra). |
| Khối thông tin cảnh báo từ chối | Section | - | - | Control UI: Alert box.<br>- Chỉ hiển thị khi hồ sơ ở trạng thái `Bị từ chối` (Loại trình `Thành lập hội đồng`).<br>- Tiêu đề: `Yêu cầu trình ký Quyết định thành lập bị từ chối`. |
| Người từ chối | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Thời gian từ chối | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Lý do từ chối | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| **Thông tin văn bản Quyết định thành lập Hội đồng** | Section | - | - | Control UI: Info card kèm badge trạng thái ở góc trên phải.<br>- Hiển thị khi hồ sơ đã trình / ban hành QĐ thành lập Hội đồng.<br>- Badge trạng thái:<br>+ `Chờ duyệt - QĐ thành lập hội đồng`<br>+ `Bị từ chối - QĐ thành lập hội đồng`<br>+ `Đã ban hành`<br>- Hồ sơ `Chờ duyệt` / `Bị từ chối` (Loại trình `Thành lập hội đồng`): Bước 2, Bước 3, Bước 4 `Chưa mở khóa`.<br>- `Hình thức ban hành` = `Ký ngoài`: chỉ hiển thị `Hình thức ban hành` và `Tệp văn bản Quyết định`; không hiển thị `Lịch sử xử lý Quyết định thành lập Hội đồng`. |
| Hình thức ban hành | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Đơn vị ban hành | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Số quyết định | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- `Chờ duyệt` / `Bị từ chối` (Loại trình `Thành lập hội đồng`) chưa có số: hiển thị `Chờ cấp số`. |
| Ngày quyết định | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Lãnh đạo ký | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Lãnh đạo được giao ký duyệt | - | - | Theo bản ghi | Control UI: Label.<br>- Chỉ hiển thị khi `Chờ duyệt` (Loại trình `Thành lập hội đồng`).<br>- Hiển thị `Cấp [n]/[Tổng số cấp] - [Đơn vị]: [Lãnh đạo]`. |
| Danh sách thành viên trong hội đồng | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị khi có danh sách thành viên.<br>- Cột: `STT`, `Họ và tên`, `Đơn vị công tác`, `Chức vụ`, `Chức danh trong hội đồng`.<br>- Tiêu đề cột căn giữa; giá trị `STT` căn giữa; giá trị các cột còn lại căn trái.<br>- Áp dụng cả bảng thành viên tại [Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tao-moi-hoi-dong). || Tệp văn bản Quyết định | - | - | Theo bản ghi | Control UI: Label kèm liên kết `Xem file`, `Tải file`.<br>- Theo dữ liệu bản ghi. |
| Văn bản liên quan | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Cột: `STT`, `Tên văn bản`, `Số hiệu`, `Ngày văn bản`, `Tệp đính kèm` (`Xem file`). |
| Lịch sử xử lý Quyết định thành lập Hội đồng | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Cột: `Thời gian thực hiện`, `Người thực hiện`, `Nội dung chi tiết / Lý do từ chối`. |
| **V. Bước 2: Ý kiến hội đồng** | Section | - | - | Control UI: Section (Read-only).<br>- Tiêu đề: `Ý kiến của hội đồng`. |
| Ngày họp Hội đồng | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Ý kiến chung của Hội đồng | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Tài liệu kèm theo | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị khi có tài liệu.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác` (`Xem file`). |
| Bảng danh sách cán bộ gây sai phạm | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Gồm các cột giống `Bảng danh sách cán bộ gây sai phạm` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra).<br>- Cán bộ trong phạm vi dữ liệu của người dùng.<br>- Thao tác trên dòng: chỉ `Xem chi tiết cán bộ`. |
| Văn bản kiến nghị về việc ban hành quyết định hoàn trả đối với vụ việc yêu cầu bồi thường | - | - | Theo bản ghi | Control UI: Label kèm liên kết `Xem file`.<br>- Theo dữ liệu bản ghi. |
| Phân tách theo đơn vị quản lý cán bộ | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Giống khối `Phân tách theo đơn vị quản lý cán bộ` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra). |
| **VI. Bước 3: Ban hành QĐ** | Section | - | - | Control UI: Section.<br>- Tiêu đề: `Ban hành Quyết định hoàn trả`.<br>- Gồm các khối, trường, thao tác giống `VI. Bước 3: Ban hành QĐ` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra); thao tác thực hiện ngay tại màn hình này. |
| **VII. Bước 4: Thu hồi tiền hoàn trả** | Section | - | - | Control UI: Section.<br>- Gồm các khối, trường giống `VII. Bước 4: Thu hồi tiền hoàn trả` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra), kể cả cột `Thao tác`. |
| **IX. Thanh nút chân trang** | Section | - | - | Control UI: Thanh nút cố định cuối màn hình.<br>- Bên trái: `Hồ sơ: [Mã hồ sơ]`. |
| Từ chối / Ký duyệt | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị với Lãnh đạo được giao tại cấp hiện hành, hồ sơ `Chờ duyệt` (Loại trình `Thành lập hội đồng`, `QĐ đình chỉ`).<br>- Loại trình `QĐ hoàn trả`, `QĐ miễn hoàn trả`, `QĐ giảm mức hoàn trả`: thao tác tại Bước 3. |
| Trình ký lại | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị với Cán bộ xử lý, hồ sơ `Bị từ chối` (Loại trình `QĐ đình chỉ`). |
| Đình chỉ | Button | - | - | Control UI: Button.<br>- Đình chỉ cả hồ sơ; chỉ hiển thị với Cán bộ xử lý thuộc đơn vị tạo Hội đồng, hồ sơ `Chờ duyệt` / `Bị từ chối` (Loại trình `Thành lập hội đồng`) hoặc `Họp hội đồng`.<br>- Sau khi chốt ý kiến của Hội đồng: không hiển thị; đình chỉ cấp cán bộ tại Bước 3, Bước 4 theo [Quy tắc đình chỉ - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-dinh-chi). |
| Cập nhật | Button | - | - | Control UI: Button.<br>- Chỉ hiển thị với Cán bộ xử lý, hồ sơ ở các trạng thái:<br>+ `Bị từ chối` (Loại trình `Thành lập hội đồng`)<br>+ `Họp hội đồng`<br>- Sau khi chốt ý kiến của Hội đồng: không hiển thị; thao tác Bước 3, Bước 4 thực hiện ngay tại màn hình này. |
| Đóng | Button | - | - | Control UI: Button.<br>- Luôn hiển thị. |

##### 4.3.3.5.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Đóng màn hình, quay lại [MH01 - Màn hình Danh sách hồ sơ xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#mh01-danh-sach-ho-so-hoan-tra). |
| 2 | Chuyển bước trên Stepper | Click step node | Theo `Trạng thái hiển thị bước trên Stepper` tại [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra). |
| 3 | Thao tác tại các bước | Button / Icon button | `Thành lập hội đồng`, `Trình ký QĐ hoàn trả`, `Trình ký QĐ miễn`, `Trình ký QĐ giảm`, `Trình ký lại`, `Ký duyệt`, `Từ chối` (Bước 3), `Xem lịch sử nộp tiền`, `Ghi nhận nộp tiền`, `Cập nhật trả lại tiền`, `Trình ký QĐ miễn bổ sung`, `Trình ký QĐ giảm bổ sung` (Bước 4), `Chọn cán bộ`, `Trình ký QĐ đình chỉ`, `Ký duyệt / Từ chối (QĐ đình chỉ)`, `Trình ký lại (QĐ đình chỉ)` (Bước 3, Bước 4), `Xem chi tiết cán bộ`: thực hiện giống chức năng cùng tên tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra). |
| 4 | Ký duyệt | Button | Khi click, hệ thống mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh) với thao tác `Ký duyệt`. |
| 5 | Từ chối | Button | Khi click, hệ thống mở [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tu-choi-phe-duyet-quyet-dinh) với thao tác `Từ chối`. |
| 6 | Cập nhật | Button | Chuyển sang [Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#man-hinh-cap-nhat-ho-so-hoan-tra) tại bước theo trạng thái:<br>- `Bị từ chối` (Loại trình `Thành lập hội đồng`): `Bước 1: Thành lập Hội đồng`.<br>- `Họp hội đồng`: `Bước 2: Ý kiến hội đồng`. |
| 7 | Đình chỉ | Button | Mở [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra) ở chế độ cả hồ sơ. |
| 8 | Trình ký lại | Button | Mở [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra), điền sẵn dữ liệu lần trình trước. |

---

<a id="popup-them-cap-nhat-can-bo-hoan-tra"></a>
#### 4.3.3.5.9. Popup Thêm/Cập nhật cán bộ chịu trách nhiệm hoàn trả

##### 4.3.3.5.9.1. Màn hình

![Popup Thêm/Cập nhật cán bộ chịu trách nhiệm hoàn trả](images/UC_Xem_Xet_Hoan_Tra_MH12.png)

##### 4.3.3.5.9.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | - | - | Theo chế độ mở | Control UI: Label.<br>- Mở từ `Thêm cán bộ gây sai phạm`: `Thêm cán bộ chịu trách nhiệm`.<br>- Mở từ `Sửa cán bộ`: `Cập nhật cán bộ chịu trách nhiệm`.<br>- Mở từ `Xem chi tiết cán bộ`: `Xem chi tiết cán bộ chịu trách nhiệm`; toàn bộ trường chỉ đọc, ẩn nút `Lưu`. |
| **I. Thông tin cán bộ gây thiệt hại** | Section | - | - | Control UI: Section. |
| Họ và tên cán bộ | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập họ và tên cán bộ`. |
| Chức vụ | String(255) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập chức vụ`.<br>- Chức vụ của cán bộ tại thời điểm gây thiệt hại. |
| Đơn vị quản lý cán bộ | String(255) | Có | Trống | Control UI: Combobox có tìm kiếm.<br>- Placeholder: `-- Chọn hoặc tìm kiếm đơn vị công tác --`.<br>- Ô tìm kiếm: placeholder `Tìm theo mã hoặc tên đơn vị...`.<br>- Danh sách: cơ quan, đơn vị trên hệ thống, hiển thị `[Mã đơn vị] - [Tên đơn vị]`.<br>- Là căn cứ phân tách cán bộ về phần đơn vị khi hoàn thành Bước 2. |
| **II. Ý kiến của Hội đồng** | Section | - | - | Control UI: Section. |
| Mức độ lỗi | Enum(String(50)) | Có | `Vô ý` | Control UI: Combobox.<br>Gồm:<br>+ `Vô ý`<br>+ `Cố ý`<br>+ `Khác`<br>- Chọn `Khác`: hiển thị ô `Nội dung mức độ lỗi` bên dưới. |
| Nội dung mức độ lỗi | Text(2000) | Có (khi hiển thị) | Trống | Control UI: Textarea.<br>- Placeholder: `Nhập nội dung mức độ lỗi`.<br>- Chỉ hiển thị khi `Mức độ lỗi` là `Khác`; chọn lại `Vô ý`/`Cố ý` thì ẩn và xóa nội dung đã nhập. |
| Số tiền cần hoàn trả (đ) | Decimal(18,0) | Có | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số tiền cần hoàn trả`.<br>- Số tiền phải hoàn trả đầy đủ theo kết luận của Hội đồng; lớn hơn 0.<br>- Căn lề phải, định dạng phân cách hàng nghìn bằng dấu chấm khi nhập.<br>- Dưới ô hiển thị số tiền bằng chữ; chưa nhập: `Chưa nhập số tiền`. |
| Hình thức xử lý | Enum(String(50)) | Có | `Hoàn trả 100%` | Control UI: Radio button.<br>Gồm:<br>+ Hoàn trả 100%<br>+ Giảm mức hoàn trả<br>+ Miễn hoàn trả<br>- `Hoàn trả 100%`, hiển thị:<br>+ Phương thức hoàn trả<br>- `Giảm mức hoàn trả`, hiển thị:<br>+ Số tiền sau giảm (đ)<br>+ Lý do giảm<br>+ Phương thức hoàn trả<br>- `Miễn hoàn trả`, hiển thị:<br>+ Lý do miễn hoàn trả |
| Số tiền sau giảm (đ) | Decimal(18,0) | Có (khi hiển thị) | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số tiền sau giảm`.<br>- Chỉ hiển thị khi `Hình thức xử lý` = `Giảm mức hoàn trả`.<br>- Lớn hơn 0 và nhỏ hơn `Số tiền cần hoàn trả (đ)`.<br>- Căn lề phải, định dạng phân cách hàng nghìn bằng dấu chấm khi nhập; dưới ô hiển thị số tiền bằng chữ. |
| Lý do giảm | Text(2000) | Có (khi hiển thị) | Trống | Control UI: Textarea.<br>- Placeholder: `Nhập lý do giảm mức hoàn trả`.<br>- Chỉ hiển thị khi `Hình thức xử lý` = `Giảm mức hoàn trả`. |
| Lý do miễn hoàn trả | Text(2000) | Có (khi hiển thị) | Trống | Control UI: Textarea.<br>- Placeholder: `Nhập lý do miễn hoàn trả`.<br>- Chỉ hiển thị khi `Hình thức xử lý` = `Miễn hoàn trả`. |
| Phương thức hoàn trả | Enum(String(50)) | Có (khi hiển thị) | Trống | Control UI: Combobox, ngay dưới khối theo `Hình thức xử lý`.<br>- Placeholder: `-- Chọn phương thức hoàn trả --`.<br>Gồm:<br>+ `Một lần`<br>+ `Nhiều lần`<br>- Chỉ hiển thị khi `Hình thức xử lý` = `Hoàn trả 100%` hoặc `Giảm mức hoàn trả`. |
| Điều kiện hoãn thực hiện việc hoàn trả (nếu có) | Text(2000) | Không | Trống | Control UI: Textarea.<br>- Placeholder: `Nhập điều kiện hoãn thực hiện việc hoàn trả`.<br>- Có nội dung: cán bộ có nhãn `Hoãn hoàn trả`; hiển thị `Ngày bắt đầu hoãn`, `Ngày kết thúc hoãn (nếu có)`, `Văn bản đính kèm` bên dưới.<br>- Không có nội dung: ẩn các trường hoãn bên dưới. |
| Ngày bắt đầu hoãn | Date | Có (khi hiển thị) | Trống | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Chỉ hiển thị khi `Điều kiện hoãn thực hiện việc hoàn trả (nếu có)` có nội dung. |
| Ngày kết thúc hoãn (nếu có) | Date | Không | Trống | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Chỉ hiển thị khi `Điều kiện hoãn thực hiện việc hoàn trả (nếu có)` có nội dung.<br>- Không được nhỏ hơn `Ngày bắt đầu hoãn`. |
| Văn bản đính kèm | File (Multiple) | Có (khi hiển thị) | Trống | Control UI: File upload, nút `Tải file`.<br>- Chỉ hiển thị khi `Điều kiện hoãn thực hiện việc hoàn trả (nếu có)` có nội dung.<br>- Định dạng `.pdf`, `.doc`, `.docx`; cho phép nhiều tệp, mỗi tệp tối đa 50MB.<br>- Hiển thị và kiểm tra tệp theo [Quy tắc tải tệp đính kèm - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-quy-tac-tai-tep). |
##### 4.3.3.5.9.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn đơn vị quản lý cán bộ | Combobox | Khi người dùng click vào ô `Đơn vị quản lý cán bộ`, hệ thống mở danh sách đơn vị kèm ô tìm kiếm; người dùng nhập Mã hoặc Tên đơn vị để lọc và chọn 01 đơn vị. |
| 2 | Chọn Hình thức xử lý | Radio | - `Hoàn trả 100%`: hiển thị `Phương thức hoàn trả`; ẩn `Số tiền sau giảm (đ)`, `Lý do giảm`, `Lý do miễn`.<br>- `Giảm mức hoàn trả`: hiển thị `Số tiền sau giảm (đ)`, `Lý do giảm`, `Phương thức hoàn trả`; ẩn `Lý do miễn`.<br>- `Miễn hoàn trả`: hiển thị `Lý do miễn`; ẩn `Số tiền sau giảm (đ)`, `Lý do giảm`, `Phương thức hoàn trả`.<br>- Trường bị ẩn được xóa giá trị đã nhập. |
| 3 | Nhập Điều kiện hoãn thực hiện việc hoàn trả | Textarea | - Nhập nội dung: hệ thống hiển thị `Ngày bắt đầu hoãn`, `Ngày kết thúc hoãn (nếu có)`, `Văn bản đính kèm`; `Ngày bắt đầu hoãn`, `Văn bản đính kèm` bắt buộc.<br>- Xóa hết nội dung: hệ thống ẩn các trường hoãn; cán bộ không có nhãn `Hoãn hoàn trả`. |
| 4 | Tải file | Button | Áp dụng [Quy tắc tải tệp đính kèm - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-quy-tac-tai-tep) với định dạng `.pdf`, `.doc`, `.docx`. |
| 5 | Xem file | Text link | Mở xem nội dung tệp đính kèm tại một tab trình duyệt mới. |
| 6 | Xóa (tệp đính kèm) | Text link | Click: hiển thị popup xác nhận.<br>- Tại popup chọn `Đồng ý`: gỡ tệp khỏi popup.<br>- Tại popup chọn `Hủy bỏ`: đóng popup xác nhận. |
| 7 | Lưu | Button | Hệ thống kiểm tra tính hợp lệ của dữ liệu trước khi lưu:<br>- **TH1 - Bỏ trống trường bắt buộc**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không lưu.<br>- **TH2 - Số tiền cần hoàn trả không lớn hơn 0**: tô viền đỏ ô, hiển thị `Số tiền cần hoàn trả phải lớn hơn 0.` dưới ô; không lưu.<br>- **TH3 - Số tiền sau giảm không hợp lệ** (không lớn hơn 0 hoặc không nhỏ hơn `Số tiền cần hoàn trả (đ)`): tô viền đỏ ô, hiển thị `Số tiền sau giảm phải lớn hơn 0 và nhỏ hơn Số tiền cần hoàn trả.` dưới ô; không lưu.<br>- **TH4 - Giảm mức hoàn trả khi Mức độ lỗi khác Vô ý**: `Hình thức xử lý` = `Giảm mức hoàn trả` và `Mức độ lỗi` khác `Vô ý`: hiển thị `Giảm mức hoàn trả chỉ áp dụng khi Mức độ lỗi là Vô ý.` dưới `Hình thức xử lý`; không lưu.<br>- **TH5 - Hợp lệ, chế độ thêm mới**: Thêm 01 dòng cán bộ vào cuối bảng danh sách cán bộ tại Bước 2, đánh lại STT; đóng popup; hiển thị thông báo thành công.<br>- **TH6 - Hợp lệ, chế độ cập nhật**: Cập nhật dữ liệu cán bộ đang chọn; đóng popup; hiển thị thông báo thành công. |
| 8 | Đóng | Button | Đóng popup, hủy thay đổi đang nhập; tương đương nút `×` trên tiêu đề popup. |

---

<a id="popup-ghi-nhan-nop-tien"></a>
#### 4.3.3.5.10. Popup Ghi nhận nộp tiền hoàn trả ngân sách

##### 4.3.3.5.10.1. Màn hình

![Popup Ghi nhận nộp tiền hoàn trả ngân sách](images/UC_Xem_Xet_Hoan_Tra_MH13.png)

- Popup dùng chung cho 02 thao tác tại Bước 4: `Ghi nhận nộp tiền` (mỗi lần 01 đợt nộp) và `Cập nhật trả lại tiền` (trả lại số tiền nộp thừa sau giảm bổ sung, hoặc trả lại số tiền đã thu theo Quyết định đình chỉ phương án `Hoàn trả lại số tiền đã thu cho cán bộ`).
- Người dùng thuộc đơn vị quản lý cán bộ hoặc Sở Tư pháp quản lý đơn vị thực hiện được; hệ thống lưu người nhập, đơn vị nhập, thời điểm nhập.

##### 4.3.3.5.10.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | Theo thao tác | Control UI: Text heading (Read-only).<br>- `Ghi nhận nộp tiền hoàn trả` / `Cập nhật trả lại tiền cho cán bộ`. |
| **Thông tin cán bộ** | Section | - | - | Control UI: Info card (Read-only).<br>- Gồm: Cán bộ (họ tên, chức vụ, đơn vị), Phương thức hoàn trả, Số tiền phải hoàn trả, Đã nộp, Còn phải thu; có số tiền cần trả lại: thêm `Số tiền cần trả lại`.<br>- Dữ liệu theo bản ghi. |
| Số tiền nộp đợt này (đ) | Decimal(18,0) | Có (khi hiển thị) | Phương thức `Một lần`: số còn phải thu; `Nhiều lần`: Trống | Control UI: Input text.<br>- Chỉ hiển thị khi `Ghi nhận nộp tiền`.<br>- Placeholder: `Nhập số tiền nộp đợt này`.<br>- Căn phải, định dạng phân cách hàng nghìn.<br>- Phương thức `Một lần`: dòng ghi chú `Phương thức Một lần: gợi ý 100% số còn phải thu.` |
| Số tiền trả lại (đ) | Decimal(18,0) | Có (khi hiển thị) | Số tiền cần trả lại | Control UI: Input text.<br>- Chỉ hiển thị khi `Cập nhật trả lại tiền`.<br>- Placeholder: `Nhập số tiền trả lại`. |
| Ngày nộp / Ngày trả lại | Date | Có | Ngày hiện tại | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Không lớn hơn ngày hiện tại. |
| Tài liệu kèm theo | List(Object) | Không | Trống | Control UI: Bảng động.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác` (`Xem file`, `Xóa`).<br>- `File đính kèm`: nút `Tải file` căn giữa cột; nút `Thêm tài liệu` dưới bảng.<br>- Ghi chú dưới bảng: `Chấp nhận tệp .pdf, .doc, .docx, .jpg, .jpeg, .png (tối đa 50MB/tệp).`<br>- Dòng đã nhập phải có đủ `Tên tài liệu, văn bản` và tệp. |

##### 4.3.3.5.10.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Thêm tài liệu / Tải file / Xem file / Xóa (Tài liệu kèm theo) | Button | Như chức năng cùng tên của bảng `Tài liệu kèm theo` tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra). |
| 2 | Lưu (Ghi nhận nộp tiền) | Button | Khi người dùng click nút Lưu, hệ thống kiểm tra dữ liệu và xử lý:<br>- **TH1 - Bỏ trống trường bắt buộc**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không lưu.<br>- **TH2 - Ngày nộp lớn hơn ngày hiện tại**: tô viền đỏ ô, hiển thị `Ngày không được lớn hơn ngày hiện tại.` dưới ô; không lưu.<br>- **TH3 - Số tiền không hợp lệ** (nhỏ hơn hoặc bằng 0, hoặc lớn hơn số còn phải thu): tô viền đỏ ô, hiển thị `Số tiền nộp phải lớn hơn 0 và không lớn hơn số còn phải thu.` dưới ô; không lưu.<br>- **TH Hợp lệ**:<br>+ Lưu đợt nộp gồm Ngày nộp, Số tiền, Tài liệu kèm theo, người nhập, đơn vị nhập, thời điểm nhập.<br>+ Cộng dồn `Đã nộp`; tính lại `Còn phải thu` của cán bộ.<br>+ `Còn phải thu` bằng 0: cán bộ chuyển `Hoàn thành`; lớn hơn 0: giữ `Thu hồi tiền hoàn trả`.<br>+ Cập nhật trạng thái chung theo [Quy tắc tổng hợp trạng thái chung - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-trang-thai-chung).<br>+ Đóng popup, hiển thị [MSG-SUC-BTNN-HT-014]. |
| 3 | Lưu (Cập nhật trả lại tiền) | Button | - **TH1 - Bỏ trống trường bắt buộc**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không lưu.<br>- **TH2 - Ngày trả lại lớn hơn ngày hiện tại**: tô viền đỏ ô, hiển thị `Ngày không được lớn hơn ngày hiện tại.` dưới ô; không lưu.<br>- **TH3 - Số tiền trả lại khác số tiền cần trả lại**: tô viền đỏ ô, hiển thị `Số tiền trả lại phải bằng số tiền cần trả lại.` dưới ô; không lưu.<br>- **TH Hợp lệ**:<br>+ Lưu Ngày trả lại, Số tiền, Tài liệu kèm theo, người nhập, đơn vị nhập.<br>+ Trừ số tiền trả lại vào `Đã nộp`; số tiền cần trả lại bằng 0.<br>+ Trả lại số tiền nộp thừa (giảm bổ sung): cán bộ chuyển `Hoàn thành`.<br>+ Trả lại theo Quyết định đình chỉ (`Chờ trả lại tiền (Đình chỉ hoàn trả)`): cán bộ chuyển `Đình chỉ hoàn trả`; số tiền phải hoàn trả bằng 0.<br>+ Đóng popup, hiển thị thông báo thành công. |
| 4 | Đóng | Button | Đóng popup, hủy dữ liệu đang nhập; tương đương nút `×` trên tiêu đề popup. |



---

<a id="popup-chi-tiet-tien-trinh-nop-tien"></a>
#### 4.3.3.5.11. Popup Chi tiết tiến trình nộp tiền của cán bộ

##### 4.3.3.5.11.1. Màn hình

![Popup Chi tiết tiến trình nộp tiền của cán bộ](images/UC_Xem_Xet_Hoan_Tra_MH14.png)

##### 4.3.3.5.11.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | - | - | Theo bản ghi | Control UI: Label.<br>- Hiển thị `Lịch sử nộp tiền của cán bộ`. |
| **Thông tin cán bộ** | Section | - | - | Control UI: Info card (Read-only).<br>- Gồm các trường giống khối `Thông tin cán bộ` tại [Popup Ghi nhận nộp tiền hoàn trả ngân sách - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-ghi-nhan-nop-tien). |
| Bảng các đợt nộp tiền | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Cột: `STT`, `Ngày nộp`, `Số tiền (đ)`, `Người nhập` (dòng dưới: thời điểm nhập), `Tài liệu kèm theo`.<br>- Sắp xếp theo thứ tự ghi nhận.<br>- Chưa có đợt nộp: hiển thị `Chưa có đợt nộp tiền.` |
| Thông tin trả lại tiền | - | - | Theo bản ghi | Control UI: Label.<br>- Chỉ hiển thị khi đã cập nhật trả lại tiền.<br>- Hiển thị `Đã trả lại cho cán bộ: [Số tiền] đ ngày [Ngày] - [Người nhập]`. |

##### 4.3.3.5.11.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Đóng | Button | Đóng popup, không thay đổi dữ liệu; tương đương nút `×` trên tiêu đề popup. |



---

<a id="popup-xem-qd-mien-giam"></a>
#### 4.3.3.5.12. Popup Xem Quyết định miễn hoàn trả, giảm mức hoàn trả

##### 4.3.3.5.12.1. Màn hình

- Mở khi click `Xem QĐ miễn` / `Xem QĐ giảm` tại bảng `Cán bộ của đơn vị` (Bước 3) với cán bộ đã ban hành Quyết định miễn hoàn trả / giảm mức hoàn trả.
- Người dùng xem được cán bộ theo [Phạm vi dữ liệu theo đơn vị - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-pham-vi-du-lieu) (đơn vị quản lý cán bộ, đơn vị tạo Hội đồng, Sở Tư pháp, Lãnh đạo); chỉ xem.

##### 4.3.3.5.12.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | - | - | Theo bản ghi | Control UI: Label.<br>- `Quyết định miễn hoàn trả` / `Quyết định giảm mức hoàn trả`. |
| Cán bộ | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Đơn vị ban hành | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Hình thức ký | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi. |
| Số, ký hiệu văn bản | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Không hiển thị khi `Hình thức ký` = `Ký ngoài`. |
| Ngày văn bản | - | - | Theo bản ghi | Control UI: Label.<br>- Theo dữ liệu bản ghi.<br>- Không hiển thị khi `Hình thức ký` = `Ký ngoài`. |
| Tệp văn bản Quyết định | - | - | Theo bản ghi | Control UI: Label kèm liên kết `Xem file`, `Tải file`.<br>- Theo dữ liệu bản ghi. |
| Tài liệu kèm theo | - | - | Theo bản ghi | Control UI: Data grid (Read-only).<br>- Chỉ hiển thị khi có tài liệu.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác` (`Xem file`). |

##### 4.3.3.5.12.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Text link | Mở tệp văn bản Quyết định tại tab mới. |
| 2 | Tải file | Text link | Tải tệp văn bản Quyết định về máy. |
| 3 | Đóng | Button | Đóng popup. |

---

<a id="popup-dinh-chi-hoan-tra"></a>
#### 4.3.3.5.13. Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả

##### 4.3.3.5.13.1. Màn hình

Popup có 02 chế độ theo [Quy tắc đình chỉ - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-dinh-chi):
- Chế độ cả hồ sơ: mở khi Cán bộ xử lý thuộc đơn vị tạo Hội đồng click `Đình chỉ` tại thanh nút chân trang (hồ sơ `Chờ duyệt` / `Bị từ chối` (Loại trình `Thành lập hội đồng`), `Họp hội đồng`) hoặc `Trình ký lại` (hồ sơ `Bị từ chối` (Loại trình `QĐ đình chỉ`)); đơn vị ban hành là đơn vị tạo Hội đồng.
- Chế độ cấp cán bộ: mở khi người dùng thuộc đơn vị quản lý cán bộ chọn cán bộ rồi click `Trình ký QĐ đình chỉ` tại Bước 3 / Bước 4, hoặc `Trình ký lại` tại khối `Quyết định đình chỉ (Mẫu 39/BTNN)`; đơn vị ban hành là đơn vị quản lý cán bộ; có thêm khối `Cán bộ được đình chỉ` và khối `Lý do, căn cứ đình chỉ` đặt trên khối `Hình thức ký` (hiển thị với cả 02 hình thức ký), thay cho các trường `Căn cứ`, `Văn bản làm căn cứ yêu cầu bồi thường`, `Nơi nhận` của khối `Thông tin điền vào Mẫu 39/BTNN`.

Bố cục như [Popup Không thụ lý hồ sơ - SRS Giải quyết yêu cầu bồi thường - Công tác bồi thường nhà nước](SRS_BTNN_GiaiQuyetBT_GiaiQuyet_YCBT.md#433115-popup-không-thụ-lý-hồ-sơ).
- Áp dụng khi văn bản làm căn cứ yêu cầu bồi thường bị thu hồi, thay thế, hủy bỏ (khoản 2 Điều 69 Luật Trách nhiệm bồi thường của Nhà nước).
- Bố cục Bước 1 theo thứ tự: khối `Hình thức ký` (đầu form), khối tệp văn bản theo hình thức ký, bảng `Tài liệu kèm theo` (chỉ khi Ký số).
- Thanh Stepper 2 bước chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`; ẩn khi `Ký ngoài`.
- Ký số trên hệ thống: Wizard 2 bước.
  + **Bước 1 - Nhập thông tin**: `Tệp văn bản trình ký` (Sinh văn bản theo mẫu 39/BTNN kèm Thông tin điền vào Mẫu 39/BTNN; hoặc Tải lên từ máy), `Tài liệu kèm theo`.
  + **Bước 2 - Kéo ô ký & chọn Lãnh đạo**: vùng trái là văn bản A4 Mẫu 39/BTNN; vùng phải là các thẻ `Cấp [n] - [Đơn vị]` (chọn Lãnh đạo, `Đặt chữ ký`, ký nháy) và `Nội dung trình`.
- Luồng trình ký theo luồng đã cấu hình tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md); số cấp theo cấu hình.
- Ký ngoài: không hiển thị Stepper; chỉ đính kèm văn bản PDF đã ký & đóng dấu và ban hành trực tiếp, không qua bước duyệt của Lãnh đạo trên hệ thống.
- Thanh nút: `Hủy bỏ` và nút chính (Ký số Bước 1: `Tiếp tục`; Ký số Bước 2: `Quay lại`, `Trình Lãnh đạo`; Ký ngoài: `Ban hành văn bản`).
- Văn bản: [Mẫu 39/BTNN - Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md#mau-39).
- Bước 2 mở rộng popup toàn màn hình; tiêu đề và thanh nút cố định, thân popup cuộn dọc.

##### 4.3.3.5.13.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | `TRÌNH KÝ QUYẾT ĐỊNH ĐÌNH CHỈ VIỆC XEM XÉT TRÁCH NHIỆM HOÀN TRẢ` | Control UI: Label (chỉ đọc).<br>- Dòng phụ chế độ cả hồ sơ: `Hồ sơ: [Mã hồ sơ] • Người yêu cầu bồi thường: [Họ và tên] • Đơn vị chi trả bồi thường: [Tên đơn vị]`.<br>- Dòng phụ chế độ cấp cán bộ: `Hồ sơ: [Mã hồ sơ] • Đơn vị ban hành: [Đơn vị quản lý cán bộ] • Số cán bộ: [Số cán bộ được chọn]`. |
| **Khối Cán bộ được đình chỉ** | Section | - | - | Control UI: Data grid (Read-only), đầu form.<br>- Chỉ hiển thị ở chế độ cấp cán bộ.<br>- Kế thừa danh sách cán bộ đã chọn; `Trình ký lại`: danh sách của lần trình trước.<br>- Cột: `STT`, `Họ và tên` (dòng dưới: Chức vụ), `Trạng thái`, `Đã thu (đ)`, `Phương án xử lý số tiền đã thu`.<br>- Dữ liệu các cột: theo dữ liệu bản ghi. |
| Phương án xử lý số tiền đã thu | Enum(String(50)) | Có (cán bộ có `Đã thu (đ)` > 0) | Không chọn; `Trình ký lại`: theo lần trình trước | Control UI: Radio button tại từng dòng cán bộ.<br>Gồm:<br>+ Không hoàn trả lại số tiền đã thu<br>+ Hoàn trả lại số tiền đã thu cho cán bộ<br>- Cán bộ có `Đã thu (đ)` = 0: hiển thị `--`.<br>- Xử lý khi ban hành theo [Quy tắc đình chỉ - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#ht-dinh-chi). |
| **Khối Lý do, căn cứ đình chỉ** | Section | - | - | Control UI: Section.<br>- Chỉ hiển thị ở chế độ cấp cán bộ; gồm các trường `Căn cứ`, `Văn bản làm căn cứ yêu cầu bồi thường`, `Nơi nhận` như mô tả bên dưới.<br>- Ở chế độ cấp cán bộ, `Căn cứ` và `Văn bản làm căn cứ yêu cầu bồi thường` bắt buộc. |
| Thanh chỉ trình (Stepper) | Component | - | Bước 1 active | Control UI: Stepper 2 bước.<br>- Bước 1: `Nhập thông tin`.<br>- Bước 2: `Kéo ô ký & chọn Lãnh đạo`.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`; ẩn khi `Ký ngoài`. |
| Khối Hồ sơ bị từ chối | Section | - | Ẩn | Control UI: Alert box (Read-only).<br>- Chỉ hiển thị khi hồ sơ `Bị từ chối` (Loại trình `QĐ đình chỉ`).<br>- Nội dung: Lý do từ chối, Người từ chối, Thời điểm.<br>- Các trường của popup điền sẵn theo lần trình trước. |
| Hình thức ký | Enum(String(50)) | Có | `Ký số trên hệ thống` | Control UI: Radio button dạng 02 thẻ chọn cùng chiều cao, đặt đầu form.<br>- Mỗi thẻ gồm tiêu đề và mô tả bên dưới.<br>Gồm:<br>+ Ký số trên hệ thống: mô tả `Trình Lãnh đạo ký duyệt trên phần mềm`<br>+ Ký ngoài (Ban hành trực tiếp): mô tả `Tải lên văn bản PDF đã ký và đóng dấu` |
| **Khối Tệp văn bản trình ký** | Section | - | - | Control UI: Section header.<br>- Khi chọn `Ký ngoài`, khối đổi thành `Tệp văn bản đã ký & đóng dấu`. |
| Tệp văn bản trình ký | File | Có (khi Ký số) | `Sinh văn bản theo mẫu 39/BTNN` | Control UI: Segmented control chọn nguồn tệp.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`.<br>Gồm:<br>+ Sinh văn bản theo mẫu 39/BTNN<br>+ Tải lên từ máy<br>- `Sinh văn bản theo mẫu 39/BTNN`: dòng mô tả `Hệ thống tự động sinh Quyết định theo Mẫu 39/BTNN từ thông tin đang nhập.` cùng 01 dòng với nút `Xem trước văn bản`.<br>- `Tải lên từ máy`: vùng kéo thả, nội dung `Kéo thả tệp vào đây hoặc Chọn tệp từ máy`, ghi chú `Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)`; bấm vào vùng để mở trình chọn tệp.<br>- Tệp `.doc`, `.docx`: hệ thống chuyển đổi sang PDF; trong lúc chuyển đổi hiển thị `Đang chuyển đổi sang PDF...` và nút `Tiếp tục` bị khóa.<br>- Có tệp: hiển thị Thẻ tệp.<br>- Đổi nguồn thì gỡ tệp hiện có. |
| **Khối Thông tin điền vào Mẫu 39/BTNN** | Section | - | - | Control UI: Section.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống` và `Tệp văn bản trình ký` = `Sinh văn bản theo mẫu 39/BTNN`. |
| Số, ký hiệu văn bản | String(50) | Có (khi hiển thị) | `     /QĐ-` | Control UI: Input text.<br>- Placeholder: `Nhập số, ký hiệu văn bản`. |
| Ngày văn bản | Date | Có (khi hiển thị) | Ngày hiện tại | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`. |
| Căn cứ | Text(4000) | Không | 02 dòng căn cứ theo Mẫu 39/BTNN | Control UI: Textarea, mỗi căn cứ 01 dòng, cho phép sửa.<br>- Placeholder: `Nhập căn cứ, mỗi căn cứ 01 dòng`.<br>- Ghi chú dưới ô: `Ghi rõ tên, số, ngày ban hành văn bản thu hồi, thay thế, hủy bỏ văn bản làm căn cứ yêu cầu bồi thường.`<br>- Mặc định:<br>+ Căn cứ khoản 2 Điều 69 của Luật Trách nhiệm bồi thường của Nhà nước số 10/2017/QH14 (đã được sửa đổi, bổ sung bởi Luật số 15/2026/QH16);<br>+ Căn cứ ………………………………, |
| Văn bản làm căn cứ yêu cầu bồi thường | Text(1000) | Không | Theo hồ sơ | Control UI: Textarea (2 dòng), cho phép sửa.<br>- Placeholder: `Nhập tên, số hiệu, ngày ban hành, cơ quan ban hành văn bản làm căn cứ yêu cầu bồi thường`.<br>- Mặc định: tên các văn bản làm căn cứ yêu cầu bồi thường của hồ sơ Giải quyết yêu cầu bồi thường gốc, nối bằng `; `. |
| Nơi nhận | Text(2000) | Không | Theo Mẫu 39/BTNN | Control UI: Textarea, mỗi nơi nhận 01 dòng, cho phép sửa.<br>- Placeholder: `Nhập nơi nhận, mỗi nơi nhận 01 dòng`.<br>- Mặc định:<br>+ - [Họ và tên người thi hành công vụ gây thiệt hại];<br>+ - [Tên cơ quan quản lý nhà nước về công tác bồi thường nhà nước];<br>+ - …………….;<br>+ - Lưu: VT, HSVV.<br>- Người thi hành công vụ gây thiệt hại: theo danh sách cán bộ chịu trách nhiệm hoàn trả của hồ sơ, nối bằng `, `; chưa có cán bộ thì hiển thị `……(7)……`.<br>- Cơ quan quản lý nhà nước về công tác bồi thường nhà nước: cơ quan cấp Trung ương là `Cục Bồi thường nhà nước - Bộ Tư pháp`; cấp địa phương là Sở Tư pháp tỉnh/thành phố của đơn vị chi trả bồi thường. |
| Tệp văn bản PDF đã ký & đóng dấu | File | Có (khi Ký ngoài) | Trống | Control UI: Vùng kéo thả.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký ngoài`.<br>- Nội dung: `Kéo thả tệp PDF đã ký & đóng dấu vào đây, hoặc bấm Tải file (Chỉ chấp nhận .pdf, tối đa 50MB)`; bấm vào vùng để mở trình chọn tệp.<br>- Định dạng `.pdf`, tối đa 50MB/file.<br>- Có tệp: Thẻ tệp thay cho vùng kéo thả. |
| Thẻ tệp | Component | - | Ẩn | Control UI: Thẻ tệp dùng chung cho `Tệp văn bản trình ký` (Tải lên từ máy) và `Tệp văn bản PDF đã ký & đóng dấu`.<br>- Bên trái: tên tệp, dung lượng.<br>- Tệp đã chuyển đổi từ `.doc`, `.docx`: tên tệp PDF sau chuyển đổi, kèm ghi chú tên tệp gốc.<br>- Bên phải: nút `Xem file`, `Xóa`. |
| Thông báo trạng thái sau ban hành | Label | - | - | Control UI: Dòng thông báo dưới khối tệp, chỉ hiển thị khi `Hình thức ký` = `Ký ngoài`.<br>- Nội dung chế độ cả hồ sơ: *"Khi bấm Ban hành văn bản, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và hồ sơ chuyển sang trạng thái Đình chỉ xem xét hoàn trả."*<br>- Nội dung chế độ cấp cán bộ: *"Khi bấm Ban hành văn bản, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống)."* |
| Tài liệu kèm theo | List(Object) | Có (khi Ký số) | Trống (Hồ sơ `Bị từ chối` (Loại trình `QĐ đình chỉ`): theo lần trình trước) | Control UI: Bảng động, đặt dưới khối `Tệp văn bản trình ký`.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác`: Xem file, Xóa (dạng icon).<br>- Nút `Thêm tài liệu` dưới bảng.<br>- Tối thiểu 01 dòng có đủ `Tên tài liệu, văn bản` và tệp; dòng đã nhập phải có đủ 02 trường; dòng trống không lưu.<br>- Định dạng `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`.<br>- Dung lượng tối đa 50MB/tệp.<br>- Lãnh đạo xem tại màn Ký duyệt / Từ chối theo [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh). |
| Thẻ cấp ký (Bước 2) | Component | - | Theo luồng đã cấu hình | Control UI: Danh sách thẻ tại vùng phải Bước 2, mỗi cấp ký 01 thẻ.<br>- Tiêu đề thẻ: `Cấp [n] - [Đơn vị]`.<br>- Nhãn `Ký nháy` hiển thị khi cấp đó được cấu hình Ký nháy tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md); không cấu hình thì không hiển thị nhãn.<br>- Mỗi thẻ gồm ô `Lãnh đạo` và nút `Đặt chữ ký`. |
| Lãnh đạo (từng cấp) | Enum(String(100)) | Có | Lãnh đạo đầu tiên của nhóm lãnh đạo cấp đó; hồ sơ `Bị từ chối` (Loại trình `QĐ đình chỉ`): Lãnh đạo đã chọn lần trình trước | Control UI: Combobox tại từng thẻ cấp ký.<br>- Danh sách: nhóm lãnh đạo của cấp tương ứng theo Cấu hình luồng xử lý, hiển thị `[Họ tên] - [Chức vụ]`.<br>- Cấp chưa cấu hình nhóm lãnh đạo: ô bị khóa, không bắt buộc.<br>- Lãnh đạo cấp cuối hiển thị tại dòng ký của văn bản. |
| Áp dụng ký nháy Lãnh đạo cấp 1 | Boolean | - | Chọn | Control UI: Checkbox tại thẻ Cấp 1 (luồng từ 02 cấp trở lên).<br>- Bỏ chọn: ẩn ô ký và nút `Đặt chữ ký` của Cấp 1. |
| Khung văn bản A4 (Bước 2) | Component | - | Mẫu 39/BTNN | Control UI: Trang văn bản mô phỏng A4.<br>- `Sinh văn bản theo mẫu 39/BTNN`: hiển thị văn bản sinh theo Mẫu 39/BTNN.<br>- `Tải lên từ máy`: hiển thị tên tệp đã tải lên. |
| Ô ký (từng cấp) | Draggable Box | - | Không hiển thị | Control UI: Khung kéo thả trên văn bản A4.<br>- Chỉ sinh khi bấm `Đặt chữ ký` tại thẻ cấp tương ứng.<br>- Nhãn: `KÝ NHÁY` / `KÝ SỐ & CON DẤU`, `Cấp [n]`, tên Lãnh đạo, tọa độ X, Y.<br>- Kéo ô để đổi vị trí; kéo góc dưới phải để đổi kích thước. |
| Nội dung trình | Text(2000) | Có | `Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả.` | Control UI: Textarea (4 dòng), cuối vùng phải Bước 2.<br>- Placeholder: `Nhập nội dung trình Lãnh đạo...`. |

##### 4.3.3.5.13.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn hình thức ký | Radio | - `Ký số trên hệ thống`: hiển thị Stepper 2 bước, khối Tệp văn bản trình ký, bảng `Tài liệu kèm theo`, nút `Tiếp tục`.<br>- `Ký ngoài`: ẩn Stepper, khối Thông tin điền vào Mẫu 39/BTNN, bảng `Tài liệu kèm theo`; hiển thị vùng tải Tệp văn bản PDF đã ký & đóng dấu, thông báo trạng thái sau ban hành, nút `Ban hành văn bản`. |
| 2 | Chọn nguồn Tệp văn bản trình ký | Segmented control | - `Sinh văn bản theo mẫu 39/BTNN`: hiển thị khối Thông tin điền vào Mẫu 39/BTNN, nút `Xem trước văn bản`.<br>- `Tải lên từ máy`: ẩn khối Thông tin điền vào Mẫu 39/BTNN, hiển thị vùng kéo thả.<br>- Đổi nguồn thì gỡ tệp hiện có. |
| 3 | Tải tệp | Vùng kéo thả | Kéo thả tệp vào vùng hoặc bấm vào vùng để mở trình chọn tệp:<br>- **TH1 - Sai định dạng file**: Tệp không thuộc định dạng `.pdf`, `.doc`, `.docx` (Ký ngoài: `.pdf`): hiển thị [MSG-ERR-FILE-001], không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng**: Tệp vượt quá 50MB: hiển thị [MSG-ERR-FILE-002], không tiếp nhận tệp.<br>- **TH3 - Tệp `.doc`, `.docx` (Ký số trên hệ thống)**: Hệ thống chuyển đổi tệp sang PDF; trong lúc chuyển đổi hiển thị `Đang chuyển đổi sang PDF...`, khóa nút `Tiếp tục`; chuyển đổi xong hiển thị Thẻ tệp của tệp PDF.<br>- **TH Hợp lệ**: Hiển thị Thẻ tệp thay cho vùng kéo thả. |
| 4 | Xem trước văn bản | Button | Sinh văn bản theo [Mẫu 39/BTNN - Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Bảng mapping trường dữ liệu biểu mẫu BTNN - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md#mau-39) từ thông tin đang nhập và mở xem tại tab mới. |
| 5 | Xem file | Button | Tại Thẻ tệp. Mở xem tệp đã tải lên tại tab mới. |
| 6 | Xóa | Button | Tại Thẻ tệp. Gỡ tệp đã tải lên; hiển thị lại vùng kéo thả. |
| 7 | Thêm tài liệu / Tải file / Xem file / Xóa (Tài liệu kèm theo) | Button | Thao tác trên bảng `Tài liệu kèm theo` như bảng `Tài liệu kèm theo` của Bước 3 tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra). |
| 8 | Tiếp tục | Button | Tại Bước 1 (Ký số trên hệ thống); bị khóa khi đang chuyển đổi tệp sang PDF.<br>- **TH1 - Bỏ trống trường bắt buộc** (gồm bảng `Tài liệu kèm theo` chưa có dòng đủ `Tên tài liệu, văn bản` và tệp): Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không chuyển bước.<br>- **TH2 - Chế độ cấp cán bộ, chưa chọn phương án xử lý số tiền đã thu**: có cán bộ `Đã thu (đ)` > 0 chưa chọn `Phương án xử lý số tiền đã thu`: hiển thị `Vui lòng chọn phương án xử lý số tiền đã thu cho từng cán bộ.` dưới khối `Cán bộ được đình chỉ`; không chuyển bước. Áp dụng cả nút `Ban hành văn bản`.<br>- **TH Hợp lệ**: Chuyển sang Bước 2, mở rộng popup toàn màn hình. |
| 9 | Đặt chữ ký | Button | Tại Bước 2, trên từng thẻ cấp ký.<br>- Sinh ô ký của cấp đó trên văn bản A4 tại vị trí mặc định; ẩn nút `Đặt chữ ký`.<br>- Thẻ cấp hiển thị tọa độ, kích thước và nút `Nhỏ`, `Vừa`, `Lớn`, `Đặt lại`. |
| 10 | Quay lại | Button | Chuyển từ Bước 2 về Bước 1, thu nhỏ popup, giữ nguyên thông tin đã nhập. |
| 11 | Trình Lãnh đạo | Button | Tại Bước 2 (Ký số trên hệ thống).<br>- **TH1 - Bỏ trống trường bắt buộc**: `Lãnh đạo` từng cấp (cấp đã cấu hình nhóm lãnh đạo) hoặc `Nội dung trình` bỏ trống: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không trình.<br>- **TH Hợp lệ**:<br>- Lưu văn bản trình (Mẫu 39/BTNN hoặc tệp tải lên), thông tin điền vào Mẫu 39/BTNN, `Tài liệu kèm theo`, Lãnh đạo từng cấp, vị trí và kích thước ô ký, `Nội dung trình`.<br>- Trình Lãnh đạo Cấp 1 theo luồng đã cấu hình; chế độ cả hồ sơ: hồ sơ chuyển `Chờ duyệt` (Loại trình `QĐ đình chỉ`); chế độ cấp cán bộ: các cán bộ được chọn giữ trạng thái kèm dòng phụ `Chờ duyệt (QĐ đình chỉ)` và phương án xử lý số tiền đã thu được lưu theo từng cán bộ; ghi lịch sử xử lý.<br>- Chế độ cấp cán bộ: kết quả Ký duyệt cấp cuối / Từ chối theo chức năng `Ký duyệt / Từ chối (QĐ đình chỉ)`, `Ban hành Quyết định đình chỉ` tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra); các ý dưới đây áp dụng chế độ cả hồ sơ.<br>- Đóng popup, hiển thị thông báo thành công.<br>- Lãnh đạo các cấp lần lượt Ký duyệt / Từ chối theo [Màn hình Ký duyệt / Từ chối Quyết định - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-phe-duyet-ky-so-quyet-dinh); cấp cuối Ký duyệt: hồ sơ chuyển `Đình chỉ xem xét hoàn trả` (kết thúc việc xem xét trách nhiệm hoàn trả).<br>- Lãnh đạo Từ chối (nhập Lý do từ chối): hồ sơ chuyển `Bị từ chối` (Loại trình `QĐ đình chỉ`); nút `Trình ký lại` mở lại popup với toàn bộ dữ liệu lần trình trước và Khối Hồ sơ bị từ chối. |
| 12 | Ban hành văn bản (Ký ngoài) | Button | Chỉ hiển thị khi `Hình thức ký` = `Ký ngoài`.<br>- **TH1 - Chưa tải tệp PDF đã ký**: Hiển thị *"Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu."* dưới vùng tải tệp, viền đỏ vùng kéo thả; không ban hành.<br>- **TH Hợp lệ**: Hiển thị popup xác nhận, tiêu đề `Xác nhận ban hành văn bản`, nội dung nêu việc ban hành trực tiếp bỏ qua bước duyệt của Lãnh đạo trên hệ thống và trạng thái `Đình chỉ xem xét hoàn trả`; nút `Ban hành`, `Hủy bỏ`.<br>- Xác nhận `Ban hành`: lưu tệp PDF đã ký; chế độ cả hồ sơ: hồ sơ chuyển `Đình chỉ xem xét hoàn trả`; chế độ cấp cán bộ: thực hiện `Ban hành Quyết định đình chỉ` tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra); ghi lịch sử xử lý; đóng popup, hiển thị thông báo thành công.<br>- Chọn `Hủy bỏ` tại popup xác nhận: đóng popup xác nhận, giữ nguyên thông tin đã nhập. |
| 13 | Hủy bỏ | Button | Đóng popup, không lưu thông tin đã nhập; hồ sơ giữ nguyên trạng thái. |

---

<a id="popup-ban-hanh-qd-hoan-tra"></a>
#### 4.3.3.5.14. Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả

##### 4.3.3.5.14.1. Màn hình

- Popup dùng chung cho 03 Loại trình:
  + `QĐ hoàn trả`: Mẫu 36/BTNN, 01 Quyết định cho toàn bộ cán bộ của phần đơn vị; mở từ `Trình ký QĐ hoàn trả` / `Trình ký lại` tại Bước 3.
  + `QĐ miễn hoàn trả`: Mẫu 38/BTNN, 01 Quyết định cho 01 cán bộ; mở từ `Trình ký QĐ miễn`.
  + `QĐ giảm mức hoàn trả`: Mẫu 37/BTNN, 01 Quyết định cho 01 cán bộ; mở từ `Trình ký QĐ giảm`.
- Bố cục như [Popup Thành lập Hội đồng xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-tao-moi-hoi-dong); văn bản theo mẫu tương ứng tại [Bảng mapping trường dữ liệu biểu mẫu BTNN - Biểu mẫu - Công tác bồi thường nhà nước](Bieu_mau/Bang_mapping_truong_du_lieu_bieu_mau_BTNN.md).
- Mẫu 36/BTNN: `Số tiền hoàn trả` của từng cán bộ là `Số tiền cần hoàn trả (đ)` (đầy đủ theo kết luận của Hội đồng); dòng Hoãn / Giảm / Miễn ghi theo ý kiến của Hội đồng (nếu có).
- Luồng trình ký theo luồng của đơn vị ban hành tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md); số cấp theo cấu hình.
- Ký số trên hệ thống: Stepper 02 bước (`Nhập thông tin`, `Kéo ô ký & chọn Lãnh đạo`); Ký ngoài: không hiển thị Stepper, chỉ đính kèm văn bản PDF đã ký và ban hành trực tiếp.
- Thanh nút: `Hủy bỏ` và nút chính (Ký số Bước 1: `Tiếp tục`; Ký số Bước 2: `Quay lại`, `Trình Lãnh đạo`; Ký ngoài: `Ban hành văn bản`).

##### 4.3.3.5.14.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | Theo Loại trình | Control UI: Text heading (Read-only).<br>- `TRÌNH KÝ QUYẾT ĐỊNH HOÀN TRẢ` / `TRÌNH KÝ QUYẾT ĐỊNH MIỄN HOÀN TRẢ` / `TRÌNH KÝ QUYẾT ĐỊNH GIẢM MỨC HOÀN TRẢ`.<br>- Dòng phụ: `Hồ sơ`, `Đơn vị ban hành`; QĐ miễn / giảm: thêm `Cán bộ`. |
| Khối bị từ chối | Section | - | Ẩn | Control UI: Alert box (Read-only).<br>- Chỉ hiển thị khi trình ký lại sau khi `Bị từ chối`.<br>- Gồm Lý do từ chối, Người từ chối, Thời điểm.<br>- Các trường của popup điền theo lần trình trước. |
| **Khối Miễn / Giảm bổ sung** | Section | - | - | Control UI: Section.<br>- Chỉ hiển thị khi mở từ `Trình ký QĐ miễn bổ sung` / `Trình ký QĐ giảm bổ sung` tại Bước 4.<br>- Tiêu đề: `Thông tin miễn hoàn trả bổ sung` / `Thông tin giảm mức hoàn trả bổ sung`.<br>- Dòng thông tin: `Số tiền phải hoàn trả hiện tại`, `Đã nộp`, `Còn phải thu` của cán bộ.<br>- Miễn hoàn trả bổ sung khi cán bộ đã nộp một phần: miễn số tiền còn phải thu; không hoàn trả số tiền đã nộp; số tiền phải hoàn trả sau miễn bằng số tiền đã nộp. |
| Số tiền sau giảm (đ) | Decimal(18,0) | Có (khi hiển thị) | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số tiền sau giảm`.<br>- Chỉ hiển thị khi giảm bổ sung.<br>- Lớn hơn 0 và nhỏ hơn số tiền phải hoàn trả hiện tại; được phép nhỏ hơn số đã nộp.<br>- Căn lề phải, định dạng phân cách hàng nghìn. |
| Lý do giảm / Lý do miễn | Text(2000) | Có (khi hiển thị) | Trống | Control UI: Textarea.<br>- Placeholder: `Nhập lý do giảm mức hoàn trả` / `Nhập lý do miễn hoàn trả`.<br>- Chỉ hiển thị trong khối Miễn / Giảm bổ sung. |
| Hình thức ký | Enum(String(50)) | Có | `Ký số trên hệ thống` | Control UI: Radio button dạng 02 thẻ chọn.<br>Gồm:<br>+ Ký số trên hệ thống: mô tả `Trình Lãnh đạo ký duyệt trên phần mềm`<br>+ Ký ngoài (Ban hành trực tiếp): mô tả `Tải lên văn bản PDF đã ký và đóng dấu` |
| Tệp văn bản trình ký | File | Có (khi hiển thị) | `Sinh văn bản theo mẫu [Số mẫu]/BTNN` | Control UI: Segmented control chọn nguồn tệp.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`.<br>Gồm:<br>+ Sinh văn bản theo mẫu [Số mẫu]/BTNN<br>+ Tải lên từ máy<br>- `Tải lên từ máy`: vùng kéo thả `Kéo thả tệp vào đây hoặc Chọn tệp từ máy`, dòng phụ `Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)`; có tệp: thẻ tệp gồm tên tệp, dung lượng, `Xem file`, `Xóa`. |
| Số, ký hiệu văn bản | String(50) | Có (khi hiển thị) | Trống | Control UI: Input text.<br>- Placeholder: `Nhập số, ký hiệu văn bản`.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống` và nguồn tệp `Sinh văn bản theo mẫu`. |
| Ngày văn bản | Date | Có (khi hiển thị) | Ngày hiện tại | Control UI: Datepicker.<br>- Placeholder: `dd/mm/yyyy`.<br>- Điều kiện hiển thị như `Số, ký hiệu văn bản`. |
| Xem trước văn bản | Button | - | - | Control UI: Button.<br>- Cùng dòng với ghi chú `Hệ thống tự động sinh [Tên Quyết định] theo Mẫu [Số mẫu]/BTNN từ thông tin đang nhập.` |
| Tài liệu kèm theo | List(Object) | Không | Trống; trình ký lại: theo lần trình trước | Control UI: Bảng động.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký số trên hệ thống`.<br>- Cột: `STT`, `Tên tài liệu, văn bản`, `File đính kèm`, `Thao tác` (`Xem file`, `Xóa`).<br>- `File đính kèm`: nút `Tải file` căn giữa cột; nút `Thêm tài liệu` dưới bảng.<br>- Ghi chú dưới bảng: `Chấp nhận tệp .pdf, .doc, .docx, .jpg, .jpeg, .png (tối đa 50MB/tệp). Lãnh đạo xem được các tài liệu này khi Ký duyệt/Từ chối.`<br>- Dòng đã nhập phải có đủ `Tên tài liệu, văn bản` và tệp. |
| Tệp văn bản PDF đã ký & đóng dấu | File | Có (khi hiển thị) | Trống | Control UI: Vùng kéo thả.<br>- Chỉ hiển thị khi `Hình thức ký` = `Ký ngoài`.<br>- Nội dung: `Kéo thả tệp PDF đã ký & đóng dấu vào đây, hoặc bấm Tải file` và `(Chỉ chấp nhận .pdf, tối đa 50MB)`.<br>- Thông báo dưới vùng: `Khi bấm Ban hành văn bản, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống).` |
| Khung văn bản A4 (Bước 2) | Component | - | Theo mẫu | Control UI: Trang văn bản mô phỏng A4.<br>- Nguồn `Sinh văn bản theo mẫu`: văn bản sinh theo mẫu; `Tải lên từ máy`: tệp đã tải lên. |
| Thẻ cấp ký (Bước 2) | Component | - | Theo luồng đã cấu hình | Control UI: Danh sách thẻ, mỗi cấp ký 01 thẻ.<br>- Tiêu đề thẻ: `Cấp [n] - [Đơn vị]`; nhãn `Ký nháy` chỉ hiển thị khi cấp đó được cấu hình Ký nháy.<br>- Mỗi thẻ gồm ô `Lãnh đạo` và nút `Đặt chữ ký`. |
| Lãnh đạo (từng cấp) | Enum(String(100)) | Có | Lãnh đạo đầu tiên của nhóm lãnh đạo cấp đó; trình ký lại: theo lần trình trước | Control UI: Combobox.<br>- Danh sách: nhóm lãnh đạo của cấp theo Cấu hình luồng xử lý, hiển thị `[Họ tên] - [Chức vụ]`. |
| Nội dung trình | Text(2000) | Có | `Kính trình Lãnh đạo xem xét, ký duyệt [Tên Quyết định].` | Control UI: Textarea.<br>- Placeholder: `Nhập nội dung trình Lãnh đạo...`. |

##### 4.3.3.5.14.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chọn hình thức ký | Radio | - `Ký số trên hệ thống`: hiển thị Stepper, nguồn tệp, `Tài liệu kèm theo`, nút `Tiếp tục`.<br>- `Ký ngoài`: ẩn Stepper, nguồn tệp, `Số, ký hiệu văn bản`, `Ngày văn bản`, `Tài liệu kèm theo`; hiển thị vùng tải Tệp văn bản PDF đã ký & đóng dấu, nút `Ban hành văn bản`. |
| 2 | Chọn nguồn Tệp văn bản trình ký | Segmented control | - `Sinh văn bản theo mẫu`: hiển thị `Số, ký hiệu văn bản`, `Ngày văn bản`, `Xem trước văn bản`.<br>- `Tải lên từ máy`: ẩn các trường trên; hiển thị vùng kéo thả.<br>- Đổi nguồn thì gỡ tệp đã tải lên. |
| 3 | Tải tệp | Vùng kéo thả | - **TH1 - Sai định dạng file**: Tệp không thuộc `.pdf`, `.doc`, `.docx` (Ký ngoài: `.pdf`): hiển thị [MSG-ERR-FILE-001], không tiếp nhận tệp.<br>- **TH2 - File quá dung lượng**: Tệp vượt quá 50MB: hiển thị [MSG-ERR-FILE-002], không tiếp nhận tệp.<br>- **TH Hợp lệ**: Hiển thị thẻ tệp gồm tên tệp, dung lượng, `Xem file`, `Xóa`. |
| 4 | Xem trước văn bản | Button | Sinh văn bản theo mẫu từ thông tin đang nhập và mở xem tại tab mới. |
| 5 | Tiếp tục | Button | Tại Bước 1 (Ký số trên hệ thống).<br>- **TH1 - Bỏ trống trường bắt buộc**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không chuyển bước.<br>- **TH2 - Số tiền sau giảm không hợp lệ** (giảm bổ sung): tô viền đỏ ô, hiển thị `Số tiền sau giảm phải lớn hơn 0 và nhỏ hơn số tiền phải hoàn trả hiện tại.` dưới ô; không chuyển bước.<br>- **TH Hợp lệ**: Sinh văn bản theo mẫu (nguồn Sinh văn bản) làm Tệp văn bản trình ký; chuyển sang Bước 2. |
| 6 | Đặt chữ ký | Button | Tại Bước 2, trên từng thẻ cấp ký: sinh ô ký của cấp đó trên văn bản A4 (cấp có nhãn `Ký nháy`: ô `KÝ NHÁY`; cấp cuối: ô `KÝ SỐ & CON DẤU`). |
| 7 | Quay lại | Button | Chuyển từ Bước 2 về Bước 1, giữ nguyên thông tin đã nhập. |
| 8 | Trình Lãnh đạo | Button | Tại Bước 2.<br>- **TH1 - Bỏ trống trường bắt buộc**: Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không trình.<br>- **TH2 - Chưa đặt chữ ký Lãnh đạo cấp cuối**: hiển thị `Vui lòng đặt chữ ký của Lãnh đạo cấp cuối.` dưới thẻ cấp cuối; không trình.<br>- **TH Hợp lệ**:<br>+ Lưu văn bản trình, Số, ký hiệu, Ngày văn bản, Tài liệu kèm theo, Lãnh đạo từng cấp, vị trí ô ký, Nội dung trình.<br>+ Trình Lãnh đạo Cấp 1; ghi Lịch sử trình ký hành động `Trình ký`.<br>+ `QĐ hoàn trả`: phần đơn vị và các cán bộ của đơn vị chuyển `Chờ duyệt` (Loại trình `QĐ hoàn trả`).<br>+ `QĐ miễn hoàn trả` / `QĐ giảm mức hoàn trả`: cán bộ chuyển `Chờ duyệt` (Loại trình tương ứng).<br>+ Đóng popup, hiển thị thông báo thành công. |
| 9 | Ban hành văn bản (Ký ngoài) | Button | - **TH1 - Chưa tải tệp PDF đã ký**: tô viền đỏ vùng tải tệp, hiển thị `Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.` dưới vùng tải tệp; không ban hành.<br>- **TH Hợp lệ**: hiển thị popup xác nhận `Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Bạn có chắc chắn muốn ban hành văn bản?` (nút `Hủy bỏ`, `Ban hành`); chọn `Ban hành` thì:<br>+ Lưu tệp PDF đã ký; ghi Lịch sử xử lý.<br>+ `QĐ hoàn trả`: thực hiện `Ban hành Quyết định hoàn trả` tại Bước 3.<br>+ `QĐ miễn hoàn trả`: cán bộ chuyển `Miễn hoàn trả`.<br>+ `QĐ giảm mức hoàn trả`: số tiền phải hoàn trả bằng `Số tiền sau giảm (đ)`; cán bộ chuyển `Thu hồi tiền hoàn trả`.<br>+ Miễn / Giảm bổ sung tại Bước 4: thực hiện `Ban hành QĐ miễn / QĐ giảm bổ sung` tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra).<br>+ Đóng popup, hiển thị thông báo thành công. |
| 10 | Hủy bỏ | Button | Đóng popup, không lưu thông tin đã nhập; giữ nguyên trạng thái. |

---

<a id="popup-phe-duyet-ky-so-quyet-dinh"></a>
<a id="popup-tu-choi-phe-duyet-quyet-dinh"></a>
#### 4.3.3.5.20. Màn hình Ký duyệt / Từ chối Quyết định

##### 4.3.3.5.20.1. Màn hình

- Theo [Màn hình Ký duyệt / Từ chối - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#xd-ky-duyet).
- Mở khi Lãnh đạo được giao ở cấp hiện hành click `Ký duyệt` / `Từ chối` với hồ sơ `Chờ duyệt` (Loại trình `Thành lập hội đồng`, `QĐ hoàn trả`, `QĐ miễn hoàn trả`, `QĐ giảm mức hoàn trả` hoặc `QĐ đình chỉ`) tại MH01 / MH03.
- Dùng chung 01 màn hình cho MH01 và MH03, cho mọi Loại trình và mọi cấp ký duyệt (cấp trước cấp cuối và cấp cuối).

##### 4.3.3.5.20.2. Mô tả thông tin trên màn hình

- Theo [Mô tả thông tin trên màn hình - Màn hình Ký duyệt / Từ chối - Xác định cơ quan giải quyết bồi thường - Công tác bồi thường nhà nước (Website Quản trị)](SRS_BTNN_GiaiQuyetBT__Xac%20định%20cơ%20quan%20GQBT.md#xd-ky-duyet-mo-ta).
- Khác biệt hiển thị:
  + Tiêu đề màn hình: `Ký duyệt - [Tên quyết định] - [Mã hồ sơ]` / `Từ chối - [Tên quyết định] - [Mã hồ sơ]`.
  + Thông tin tổng quan có thêm `Nội dung trình` của lần trình.
  + Xem trước văn bản trình ký:<br>- Thanh trên khung xem trước: tên tệp Văn bản trình ký và liên kết `Mở xem văn bản` (mở tại tab mới).<br>- Văn bản sinh theo mẫu: hiển thị nội dung văn bản đã sinh của lần trình.<br>- Văn bản tải lên từ máy: hiển thị tên tệp; xem nội dung qua `Mở xem văn bản`.
  + Loại trình và văn bản trình ký:<br>+ `Thành lập hội đồng`: Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả (Mẫu 33/BTNN)<br>+ `QĐ hoàn trả`: Quyết định hoàn trả của phần đơn vị (Mẫu 36/BTNN)<br>+ `QĐ miễn hoàn trả`: Quyết định miễn hoàn trả của cán bộ (Mẫu 38/BTNN)<br>+ `QĐ giảm mức hoàn trả`: Quyết định giảm mức hoàn trả của cán bộ (Mẫu 37/BTNN)<br>+ `QĐ đình chỉ`: Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả (Mẫu 39/BTNN) của cả hồ sơ hoặc của các cán bộ được chọn trong phần đơn vị
  + Tài liệu kèm theo (chỉ hiển thị khi có): Quyết định thành lập Hội đồng không có; Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả theo bảng `Tài liệu kèm theo` tại [Popup Trình ký Quyết định hoàn trả, miễn hoàn trả, giảm mức hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-ban-hanh-qd-hoan-tra); Quyết định đình chỉ theo bảng `Tài liệu kèm theo` tại [Popup Trình ký Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#popup-dinh-chi-hoan-tra).

##### 4.3.3.5.20.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :-- | :--- | :--- | :--- |
| 1 | Ký duyệt | Button | - Chỉ hiển thị khi thao tác là `Ký duyệt`; nhãn `Ký duyệt` ở mọi cấp.<br>- Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Hồ sơ không còn hợp lệ** (kiểm tra tại máy chủ): Hệ thống hiển thị [MSG-ERR-BTNN-LXL-005], đóng màn hình và tải lại danh sách. |
|  |  |  | **TH2 - Ký số không thành công** (luồng đã cấu hình ký số): Hồ sơ giữ `Chờ duyệt`; hệ thống hiển thị thông báo lỗi ký số và giữ màn hình để Lãnh đạo thực hiện lại. |
|  |  |  | **TH3 - Hợp lệ, chưa phải cấp cuối** (mọi Loại trình):<br>- Ghi kết quả Ký duyệt của cấp hiện hành, kèm Ý kiến (nếu có).<br>- Hồ sơ tự chuyển đến Lãnh đạo cấp tiếp theo cán bộ đã chọn khi trình; giữ `Chờ duyệt`, dòng phụ giữ Loại trình.<br>- Ghi Lịch sử trình ký `Ký duyệt và chuyển xử lý đến [Họ tên Lãnh đạo cấp tiếp theo]`.<br>- Đóng màn hình, tải lại danh sách, hiển thị [MSG-SUC-BTNN-HT-021]. |
|  |  |  | **TH4 - Hợp lệ, cấp cuối, Loại trình `Thành lập hội đồng`**:<br>- Quyết định thành lập Hội đồng giữ Số, Ngày quyết định cán bộ nhập khi trình.<br>- Hồ sơ chuyển `Họp hội đồng`.<br>- Hiển thị [MSG-SUC-BTNN-HT-003]. |
|  |  |  | **TH5 - Hợp lệ, cấp cuối, Loại trình `QĐ hoàn trả`, `QĐ miễn hoàn trả`, `QĐ giảm mức hoàn trả`**:<br>- Quyết định chưa có Số, ký hiệu: tự động cấp số văn bản từ Sổ văn bản điện tử.<br>- `QĐ hoàn trả`: thực hiện `Ban hành Quyết định hoàn trả` tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra).<br>- `QĐ miễn hoàn trả`: cán bộ chuyển `Miễn hoàn trả`.<br>- `QĐ giảm mức hoàn trả`: số tiền phải hoàn trả bằng `Số tiền sau giảm (đ)`; cán bộ chuyển `Thu hồi tiền hoàn trả`.<br>- Miễn / Giảm bổ sung tại Bước 4: theo chức năng `Ban hành QĐ miễn / QĐ giảm bổ sung` tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra).<br>- Hiển thị [MSG-SUC-BTNN-HT-013]. |
|  |  |  | **TH6 - Hợp lệ, cấp cuối, Loại trình `QĐ đình chỉ`**:<br>- Quyết định đình chỉ tự động cấp số văn bản từ Sổ văn bản điện tử.<br>- Đình chỉ cả hồ sơ: hồ sơ chuyển `Đình chỉ xem xét hoàn trả` (kết thúc xử lý).<br>- Đình chỉ cấp cán bộ: theo chức năng `Ban hành Quyết định đình chỉ` tại [Chức năng trên màn hình - Màn hình Cập nhật hồ sơ hoàn trả - Xem xét trách nhiệm hoàn trả - Công tác bồi thường nhà nước (Website Quản trị)](#chuc-nang-man-hinh-cap-nhat-ho-so-hoan-tra).<br>- Hiển thị [MSG-SUC-BTNN-HT-022]. |
|  |  |  | **Xử lý chung TH3 - TH6**:<br>- Ký số hay không ký số: Thực hiện theo luồng đã cấu hình tương ứng tại [Cấu hình luồng xử lý - Cấu hình luồng xử lý - Quản trị hệ thống (Website Quản trị)](../01_Quan_tri_he_thong/Cau_hinh_luong_xu_ly.md).<br>- TH4 - TH6: gán thông tin chữ ký vào ô ký đã đặt khi trình, văn bản đã ký là văn bản ban hành của hồ sơ; ghi Lịch sử trình ký `Ký duyệt`; ghi `Bảng Lịch sử xử lý Quyết định`; đóng màn hình, tải lại danh sách. |
| 2 | Từ chối | Button | - Chỉ hiển thị khi thao tác là `Từ chối`.<br>- Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc** (`Lý do từ chối`): Hệ thống tô viền đỏ ô lỗi, hiển thị [MSG-ERR-VAL-001] dưới ô lỗi và focus vào ô lỗi đầu tiên; không lưu. |
|  |  |  | **TH2 - Hồ sơ không còn hợp lệ** (kiểm tra tại máy chủ): Hệ thống hiển thị [MSG-ERR-BTNN-LXL-005], đóng màn hình và tải lại danh sách. |
|  |  |  | **TH3 - Hợp lệ** (mọi cấp):<br>- Hồ sơ chuyển `Bị từ chối`, dòng phụ giữ Loại trình bị từ chối (`Thành lập hội đồng` [MSG-SUC-BTNN-HT-004]; `QĐ hoàn trả` [MSG-SUC-BTNN-HT-012]; `QĐ đình chỉ` [MSG-SUC-BTNN-HT-023]).<br>- `QĐ hoàn trả`: phần đơn vị và các cán bộ của đơn vị chuyển `Bị từ chối`; `QĐ miễn hoàn trả`, `QĐ giảm mức hoàn trả`: cán bộ chuyển `Bị từ chối` [MSG-SUC-BTNN-HT-012].<br>- `QĐ đình chỉ` cấp cán bộ: các cán bộ của lượt trình giữ trạng thái, dòng phụ `Bị từ chối (QĐ đình chỉ)`.<br>- Lưu Lý do từ chối, người từ chối, thời gian vào `Bảng Lịch sử xử lý Quyết định`; kết quả Ký duyệt của các cấp trong lượt trình này không còn hiệu lực.<br>- Ghi Lịch sử trình ký `Từ chối - trả lại cán bộ trình`.<br>- Đóng màn hình, tải lại danh sách. |
| 3 | Mở xem văn bản | Link | Mở Văn bản trình ký tại tab mới; giữ nguyên dữ liệu đang nhập trên màn hình. |
| 4 | Hủy bỏ | Button | Đóng màn hình, không lưu dữ liệu, quay về màn hình trước; hồ sơ giữ nguyên trạng thái. |
| 5 | Xem file | Icon button / Link | Mở tệp tài liệu kèm theo tại tab mới. |

