### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước

#### 4.3.3.1. UC431-466 - Giải quyết yêu cầu bồi thường

##### 4.3.3.1.1. Mục đích

\- Cho phép người dùng trên Website quản trị quản lý danh sách vụ việc/hồ sơ yêu cầu bồi thường nhà nước.

\- Cho phép nhập hồ sơ vụ việc từ các vụ việc đã tiếp nhận, kiểm tra hồ sơ, yêu cầu bổ sung, từ chối, thụ lý, từ chối thụ lý, xác minh thiệt hại, thương lượng, hoãn giải quyết, tạm đình chỉ giải quyết, đình chỉ giải quyết, ban hành quyết định, thực thi chi trả và theo dõi phục hồi danh dự.

*a. Phân quyền*

\- Chuyên viên Thụ lý nghiệp vụ: Được tra cứu, nhập/cập nhật hồ sơ thuộc phạm vi được giao, kiểm tra hồ sơ, yêu cầu bổ sung, từ chối hồ sơ ở bước kiểm tra, cập nhật bổ sung, cập nhật xác minh, cập nhật thương lượng, thực hiện hoãn giải quyết/tạm đình chỉ giải quyết/đình chỉ giải quyết từ bước "Đang xác minh thiệt hại" trở đi, cập nhật thực thi và phục hồi danh dự theo trạng thái hồ sơ.

\- Thủ trưởng Cơ quan giải quyết: Được tra cứu, xem chi tiết, thụ lý hồ sơ, từ chối thụ lý, duyệt ký số Quyết định giải quyết bồi thường đối với hồ sơ ở trạng thái phù hợp.

\- Nếu hồ sơ đang được giao cho chuyên viên khác, chuyên viên hiện tại chỉ được xem chi tiết, không được cập nhật dữ liệu hoặc thực hiện thao tác nghiệp vụ.


*b. Điều kiện thực hiện*

\- Người dùng truy cập màn hình `Giải quyết Yêu cầu Bồi thường Nhà nước - Cán bộ` trên Website quản trị. 
<br> \- Người dùng được phép phân quyền sử dụng tính năng trên màn hình.

##### 4.3.3.1.2. Sơ đồ luồng nghiệp vụ theo giao diện

```mermaid
flowchart TD
    A[Danh sách vụ việc/hồ sơ yêu cầu bồi thường theo tab] --> B[Tìm kiếm / Xóa bộ lọc / Phân trang / Kết xuất Excel]
    TN[Tiếp nhận yêu cầu - SRS riêng] --> D["Chờ tiếp nhận"]
    D --> A
    A --> T1[Tab Vụ việc chờ tiếp nhận]
    A --> T2[Tab Vụ việc chờ kiểm tra]
    A --> T3[Tab Vụ việc chờ xử lý]
    T1 -->|"Chờ tiếp nhận"| E1[Tiếp nhận - mở MH02 kế thừa dữ liệu tiếp nhận]
    T1 -->|"Chờ tiếp nhận / Yêu cầu bổ sung"| E2[Yêu cầu bổ sung hoặc Từ chối]
    E1 --> E[Nhập hồ sơ vụ việc]
    T2 -->|"Chờ kiểm tra"| I[Tiếp nhận / Yêu cầu bổ sung / Từ chối]
    T3 -->|"Lãnh đạo: Chờ thụ lý"| M[Thụ lý hoặc từ chối thụ lý]
    T3 -->|"Chuyên viên: được phân công / đang xử lý"| G[Click dòng dữ liệu]
    G --> H{Trạng thái vụ việc/hồ sơ}
    E --> F["Chờ kiểm tra"]
    I -->|"Tiếp nhận"| J["Chờ thụ lý"]
    I -->|"Yêu cầu bổ sung"| K["Yêu cầu bổ sung"]
    I -->|"Từ chối"| L["Bị từ chối"]
    M -->|"Thụ lý"| N["Đang xác minh thiệt hại"]
    M -->|"Từ chối thụ lý"| O["Từ chối thụ lý"]
    N --> Y[Hoãn / Tạm đình chỉ / Đình chỉ giải quyết]
    Q --> Y
    T --> Y
    S --> Y
    Y -->|"Hoãn giải quyết"| Y1["Hoãn giải quyết"]
    Y -->|"Tạm đình chỉ giải quyết"| Y2["Tạm đình chỉ giải quyết"]
    Y -->|"Đình chỉ giải quyết"| Y3["Đình chỉ giải quyết"]
    Y1 -->|"Tiếp tục giải quyết"| Z[Quay lại bước xử lý trước đó]
    Y2 -->|"Tiếp tục giải quyết"| Z
    N --> P[Hoàn thành xác minh]
    P --> Q["Đang thương lượng"]
    Q --> R[Hoàn thành thương lượng]
    R -->|"Thành công"| S["Chờ ban hành QĐ"]
    R -->|"Không thành công"| T["Thương lượng không thành công"]
    T --> Q
    S --> U[Trình ký / Duyệt ký số quyết định]
    U --> V["Chờ thực thi"]
    V --> W[Cập nhật thực thi / Phục hồi danh dự nếu có]
    W --> X["Hoàn thành"]
```

---

##### 4.3.3.1.3. MH01 - Màn hình Danh sách vụ việc/hồ sơ yêu cầu bồi thường

###### 4.3.3.1.3.1. Màn hình

![Danh sách vụ việc/hồ sơ yêu cầu bồi thường](images/UC431_466_MH01_Danh_sach_yeu_cau_boi_thuong.png)

###### 4.3.3.1.3.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Tab nghiệp vụ** | Enum(String(100)) | Có | `Vụ việc chờ tiếp nhận` | Control UI: Tabs navigation.<br>- **Tab 1: "Vụ việc chờ tiếp nhận"**- Hiển thị các vụ việc ở trạng thái:<br>+ Chờ tiếp nhận<br>+ Yêu cầu bổ sung<br>+ Lưu nháp<br>- **Tab 2: "Vụ việc chờ kiểm tra"**- Hiển thị các vụ việc ở trạng thái:<br>+ Chờ kiểm tra<br>- **Tab 3: "Vụ việc chờ xử lý"**- Hiển thị các vụ việc thuộc các trạng thái tiếp theo gồm:<br>+ Chờ thụ lý<br>+ Đang xác minh thiệt hại<br>+ Đang thương lượng<br>+ Chờ ban hành QĐ<br>+ Chờ thực thi<br>+ Hoãn giải quyết<br>+ Tạm đình chỉ giải quyết |
| **Bộ lọc tìm kiếm** | String(255) | - | - | Khối tiêu chí lọc danh sách vụ việc trong tab đang chọn. |
| Mã vụ việc | String(50) | Không | Trống | Tìm gần đúng theo mã vụ việc, tự động trim space. |
| Tên vụ việc | String(255) | Không | Trống | Control UI: Input text.<br>- Tìm gần đúng theo tên vụ việc, không phân biệt hoa thường.<br>- Dữ liệu lấy từ thông tin tiếp nhận YCBT hoặc hồ sơ xác định cơ quan liên thông. |
| Tên người yêu cầu | String(100) | Không | Trống | Tìm gần đúng theo họ tên người yêu cầu, không phân biệt hoa thường. |
| Cơ quan giải quyết | String(255) | Không | Trống | Tìm gần đúng theo tên cơ quan giải quyết. |
| Tỉnh/Thành phố | Enum(String(100)) | Không | `Tất cả` | Control UI: Combobox có tìm kiếm.<br>- Tham chiếu Danh mục Tỉnh/Thành phố [DM_13].<br>- Cho phép gõ tìm kiếm nhanh theo Mã hoặc Tên Tỉnh/Thành phố. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Không | `Tất cả` | Tham chiếu Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Trạng thái giải quyết | Enum(String(50)) | Không | Theo từng tab | Control UI: Combobox.<br>- Danh sách lựa chọn và giá trị mặc định thay đổi động theo Tab đang chọn:<br>+ **Tab 1 "Vụ việc chờ tiếp nhận"**: Giá trị mặc định khi vào tab là `Tất cả`. Danh sách trạng thái có thể lọc: `Tất cả`, `Chờ tiếp nhận`, `Yêu cầu bổ sung`, `Lưu nháp`.<br>+ **Tab 2 "Vụ việc chờ kiểm tra"**: Giá trị mặc định khi vào tab là `Chờ kiểm tra`. Danh sách trạng thái có thể lọc: `Chờ kiểm tra`.<br>+ **Tab 3 "Vụ việc chờ xử lý"**: Giá trị mặc định khi vào tab là `Tất cả`. Danh sách trạng thái có thể lọc: `Tất cả`, `Chờ thụ lý`, `Đang xác minh thiệt hại`, `Đang thương lượng`, `Chờ ban hành QĐ`, `Chờ thực thi`, `Hoãn giải quyết`, `Tạm đình chỉ giải quyết`.<br>- Khi chuyển tab hoặc bấm nút `Xóa bộ lọc`, trường tự động reset về giá trị mặc định của tab đó|
| Tiếp nhận: Từ ngày | Date | Không | Trống | Định dạng `dd/mm/yyyy`. Áp dụng rule khoảng ngày [BR-VAL-007]. |
| Tiếp nhận: Đến ngày | Date | Không | Trống | Định dạng `dd/mm/yyyy`. Áp dụng rule khoảng ngày [BR-VAL-007]. |
| Hạn xử lý: Từ ngày | Date | Không | Trống | Định dạng `dd/mm/yyyy`. Áp dụng rule khoảng ngày [BR-VAL-007]. |
| Hạn xử lý: Đến ngày | Date | Không | Trống | Định dạng `dd/mm/yyyy`. Áp dụng rule khoảng ngày [BR-VAL-007]. |
| Hình thức tiếp nhận | Enum(String(50)) | Không | `Tất cả` | Tham chiếu Danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Bảng danh sách vụ việc/hồ sơ yêu cầu bồi thường | List(Object) | Không | 20 bản ghi/trang | Control UI: Data grid.<br>- Khi người dùng truy cập màn hình, hệ thống tự động tải trang đầu tiên (Trang 1) với số lượng mặc định 20 bản ghi.<br>- Sắp xếp mặc định: Sắp xếp theo "Ngày tiếp nhận" giảm dần (mới nhất hiển thị lên đầu).<br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.<br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]. |
| STT | Integer(10) | - | Tự tăng | Căn giữa, tăng theo phân trang. |
| Mã vụ việc | String(50) | - | Theo dữ liệu | Hiển thị mã vụ việc. Người dùng click vào dòng dữ liệu để mở màn hình chi tiết. |
| Tên vụ việc | String(255) | - | Theo dữ liệu | Chỉ đọc. Hiển thị tên vụ việc đã ghi nhận ở bước tiếp nhận YCBT. |
| Tên người yêu cầu | String(100) | - | Theo dữ liệu | Chỉ đọc. Hiển thị tên người yêu cầu bồi thường. |
| Tỉnh/Thành phố | String(100) | - | Theo dữ liệu | Chỉ đọc. Hiển thị Tỉnh/Thành phố của vụ việc/người yêu cầu theo Danh mục Tỉnh/Thành phố [DM_13]. |
| Địa chỉ | String(500) | - | Theo dữ liệu | Chỉ đọc. Hiển thị địa chỉ chi tiết và Phường/Xã của người yêu cầu. |
| Hành vi gây thiệt hại | String(255) | - | Theo dữ liệu | Chỉ đọc. Hiển thị tóm tắt hành vi gây thiệt hại của người thi hành công vụ. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Hiển thị lĩnh vực phát sinh thiệt hại theo Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Cơ quan giải quyết | String(255) | - | Theo dữ liệu | Chỉ đọc. Hiển thị cơ quan giải quyết bồi thường. |
| Cán bộ xử lý | String(255) | - | Theo dữ liệu | Chỉ đọc. Hiển thị cán bộ xử lý được chỉ định. |
| Ngày tiếp nhận | Date | - | Theo dữ liệu | Căn giữa. Cho phép click tiêu đề cột để đảo chiều sắp xếp tăng/giảm. |
| Hạn xử lý | Date | - | Theo dữ liệu | Hiển thị hạn xử lý và trạng thái cảnh báo SLA theo dữ liệu hệ thống. |
| Hình thức tiếp nhận | Enum(String(50)) | - | Theo dữ liệu | Hiển thị hình thức tiếp nhận theo Danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Trạng thái | Enum(String(50)) | - | Theo dữ liệu | Control UI: Text hiển thị kèm Badge màu theo trạng thái.<br>- Tham chiếu Danh mục Trạng thái vụ việc yêu cầu bồi thường [DM_24]. |
| Thao tác | String(255) | - | Theo vai trò/trạng thái | Control UI: Icon buttons (Fixed-slot Action Column).<br>- Không có nút/icon `Xem chi tiết` riêng biệt trong cột Thao tác; người dùng xem chi tiết bằng sự kiện click trực tiếp vào dòng dữ liệu (Row-Click).<br>- **Tại Tab 1: "Vụ việc chờ tiếp nhận"**:<br>+ `Tiếp nhận`, `Yêu cầu bổ sung`, `Từ chối`: Chỉ hiển thị khi vụ việc ở trạng thái `Chờ tiếp nhận`.<br>+ `Bổ sung hồ sơ`: Chỉ hiển thị khi vụ việc ở trạng thái `Yêu cầu bổ sung`.<br>+ `Cập nhật hồ sơ`: Chỉ hiển thị khi vụ việc ở trạng thái `Lưu nháp`.<br>- **Tại Tab 2: "Vụ việc chờ kiểm tra"**:<br>+ `Tiếp nhận kiểm tra` <br> + `Yêu cầu bổ sung sau kiểm tra` <br> + `Từ chối sau kiểm tra`<br>- **Tại Tab 3: "Vụ việc chờ xử lý"**:<br>+ `Thụ lý hồ sơ`, `Từ chối thụ lý`: Chỉ hiển thị khi vụ việc ở trạng thái `Chờ thụ lý`.<br>+ `Cập nhật hồ sơ`: Chỉ hiển thị đối với các hồ sơ đang trong quá trình giải quyết sau thụ lý gồm các trạng thái:<br>  * `Đang xác minh thiệt hại`<br>  * `Đang thương lượng`<br>  * `Chờ ban hành QĐ`<br>  * `Chờ thực thi`<br>  * `Hoãn giải quyết`<br>  * `Tạm đình chỉ giải quyết`<br>- Các thao tác không thỏa mãn điều kiện theo trạng thái hồ sơ sẽ bị ẩn hoàn toàn khỏi danh sách. |
| Phân trang | String(255) | Không | 20 bản ghi/trang | Control UI: Pagination.<br>- Cho phép chọn cấu hình số lượng bản ghi hiển thị trên mỗi trang gồm: 10, 20, 50, 100 bản ghi/trang; mặc định chọn sẵn 20 bản ghi/trang.<br>- Đầy đủ các nút điều hướng trang: Đầu (&#124;&lt;&lt;), Trước (&lt;), các số trang, Sau (&gt;), Cuối (&gt;&gt;&#124;).<br>- Hiển thị dải bản ghi: "Hiển thị [từ] - [đến] của [tổng số] bản ghi". |

###### 4.3.3.1.3.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Chuyển tab | Tab | Hệ thống tải danh sách vụ việc theo tab được chọn và đặt lại trang hiện tại về trang 1. Bộ lọc đang nhập có thể được giữ nguyên nếu cùng trường dữ liệu hoặc xóa theo thao tác `Xóa bộ lọc`. |
| 2 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn, hiển thị kết quả lên bảng và đưa về Trang 1. |
|  |  |  | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled); nút "Kết xuất Excel" (nếu có) ở trạng thái khóa mờ kèm tooltip *"Không có dữ liệu để kết xuất Excel"*. |
| 3 | Xóa bộ lọc | Button | Hệ thống xóa các tiêu chí lọc, đặt lại danh sách theo dữ liệu mặc định của tab hiện hành và đưa về trang 1. |
| 4 | Kết xuất Excel | Button | Hệ thống kết xuất dữ liệu thống kê theo danh sách đang hiển thị trong tab hiện hành. |
| 5 | Click dòng dữ liệu | Row click | Hệ thống mở [MH04 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường](#43316-mh04---màn-hình-xem-chi-tiết-hồ-sơ-yêu-cầu-bồi-thường) tương ứng với vụ việc được chọn. Nếu click vào icon thao tác, hệ thống thực hiện chức năng của icon và không kích hoạt row click. |
| 6 | Tiếp nhận | Icon button/Button | Khi người dùng click nút, hệ thống mở **MH02 - Nhập liệu hồ sơ vụ việc** để cán bộ nhập đầy đủ thông tin chi tiết. <br> Hệ thống tự động kế thừa toàn bộ thông tin đã nhập ở bước **Tiếp nhận yêu cầu**, cán bộ có thể chỉnh sửa và bổ sung thêm các thông tin khác|
| 7 | Yêu cầu bổ sung | Icon button/Button | Khi người dùng click nút, hệ thống mở **Popup Yêu cầu bổ sung / Từ chối hồ sơ** ở ngữ cảnh yêu cầu bổ sung để nhập nội dung yêu cầu bổ sung thông tin/hồ sơ. |
| 8 | Từ chối | Icon button/Button | Khi người dùng click nút, hệ thống mở **Popup Yêu cầu bổ sung / Từ chối hồ sơ** ở ngữ cảnh từ chối để nhập lý do từ chối tiếp nhận hồ sơ; sau khi xác nhận hợp lệ, vụ việc chuyển sang trạng thái `Bị từ chối`. |
| 9 | Cập nhật hồ sơ | Icon button/Button | Khi người dùng click nút, hệ thống kiểm tra trạng thái hồ sơ và xử lý theo 02 trường hợp: |
|  |  |  | **TH1 - Hồ sơ ở trạng thái `Lưu nháp` hoặc `Yêu cầu bổ sung` (thuộc Tab "Vụ việc chờ tiếp nhận")**: Hệ thống mở màn hình [MH02 - Nhập liệu hồ sơ vụ việc](#43314-mh02---màn-hình-nhập-liệu-hồ-sơ-vụ-việc) ở chế độ chỉnh sửa để tiếp tục hoàn thiện hồ sơ ban đầu; nếu ở trạng thái `Yêu cầu bổ sung`, hệ thống tự động cuộn focus tới khối `Thông tin yêu cầu bổ sung` để Cán bộ nắm bắt nội dung cần hoàn thiện. |
|  |  |  | **TH2 - Hồ sơ ở các trạng thái trong quá trình giải quyết (thuộc Tab "Vụ việc chờ xử lý": `Đang xác minh thiệt hại`, `Đang thương lượng`, `Thương lượng không thành công`, `Chờ ban hành QĐ`, `Chờ thực thi`, `Hoãn giải quyết`, `Tạm đình chỉ giải quyết`)**: Hệ thống mở màn hình [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường) trực tiếp ở chế độ Cập nhật/Xử lý; hệ thống tự động chuyển sang tab `Chi tiết xử lý hồ sơ`, tự động mở rộng và cuộn focus vào đúng khối nghiệp vụ tương ứng theo trạng thái hiện tại của hồ sơ ở chế độ cho phép nhập liệu, đồng thời hiển thị các nút thao tác hoàn tất giai đoạn tương ứng trên thanh thao tác. |
| 10 | Tiếp nhận kiểm tra | Icon button/Button | Hệ thống xác nhận hồ sơ hợp lệ, chuyển vụ việc sang trạng thái `Chờ thụ lý`, cập nhật timeline xử lý. |
| 11 | Yêu cầu bổ sung sau kiểm tra | Icon button/Button | Hệ thống mở **Popup Yêu cầu bổ sung / Từ chối hồ sơ** để nhập nội dung yêu cầu bổ sung hồ sơ. |
| 12 | Từ chối sau kiểm tra | Icon button/Button | Hệ thống mở **Popup Yêu cầu bổ sung / Từ chối hồ sơ** để nhập lý do từ chối. Sau khi xác nhận, vụ việc chuyển sang trạng thái `Bị từ chối`. |
| 13 | Thụ lý hồ sơ | Icon button/Button | Hệ thống mở [Popup Thụ lý hồ sơ và Cử người giải quyết bồi thường](#433112-popup-thụ-lý-hồ-sơ-và-cử-người-giải-quyết-bồi-thường). Sau khi xác nhận hợp lệ, hệ thống cập nhật hồ sơ sang trạng thái `Đang xác minh thiệt hại`. |
| 14 | Từ chối thụ lý | Icon button/Button | Hệ thống mở **Popup Yêu cầu bổ sung / Từ chối hồ sơ** để nhập lý do từ chối thụ lý. |

---

##### 4.3.3.1.4. MH02 - Màn hình Nhập liệu hồ sơ vụ việc

###### 4.3.3.1.4.1. Màn hình

![Nhập liệu hồ sơ vụ việc](images/UC431_466_MH02_Lap_ho_so_yeu_cau_boi_thuong.png)

###### 4.3.3.1.4.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | Theo ngữ cảnh | Chỉ đọc. Hiển thị động theo trạng thái vụ việc khi mở màn hình:<br>+ Vụ việc ở trạng thái "Chờ tiếp nhận": `NHẬP LIỆU HỒ SƠ VỤ VIỆC`.<br>+ Vụ việc ở trạng thái "Yêu cầu bổ sung": `BỔ SUNG HỒ SƠ VỤ VIỆC`.<br>+ Các trạng thái khác (mở lại để cập nhật/trình lại): `CẬP NHẬT HỒ SƠ VỤ VIỆC`. |
| Mã vụ việc | String(50) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tự động điền từ vụ việc đã tiếp nhận. |
| Thời điểm tiếp nhận | Datetime | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tự động điền từ vụ việc đã tiếp nhận. |
| Tên vụ việc | String(255) | - | Theo dữ liệu tiếp nhận | Control UI: Input text.<br>- Tự động điền từ bước tiếp nhận YCBT hoặc hồ sơ xác định cơ quan liên thông.<br>- Cho phép điều chỉnh |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Theo dữ liệu tiếp nhận | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Theo dữ liệu tiếp nhận | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Có | Theo dữ liệu tiếp nhận | Control UI: Textarea / Input text.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp...<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Tìm nhanh từ vụ việc xác định cơ quan | String(50) | Không | Trống | Control UI: Input text kèm nút `Tìm kiếm` (icon kính lúp) và liên kết `Tìm kiếm nâng cao`.<br>- Chỉ hiển thị khi Tình trạng pháp lý hồ sơ là `Yêu cầu chưa có Bản án/Quyết định của Tòa án`.<br>- Nếu bấm `Tìm kiếm` khi chưa nhập dữ liệu: Vi phạm quy tắc [BR-VAL-001], hệ thống hiển thị thông báo cảnh báo lỗi [MSG-ERR-VAL-001] (*"Vui lòng nhập Mã vụ việc để tìm kiếm"*) và không mở popup. |
| Liên kết hồ sơ xác định cơ quan | String(255) | Không | Ẩn | Control UI: Text link (Hyperlink).<br>- Chỉ hiển thị sau khi cán bộ chọn một hồ sơ xác định cơ quan từ popup tìm kiếm hoặc khi mở lại hồ sơ đã lưu liên kết trước đó.<br>- Khi click vào liên kết: Hệ thống mở màn hình [Chi tiết yêu cầu xác định cơ quan giải quyết bồi thường](SRS_BTNN_Xác%20định%20cơ%20quan%20giải%20quyết.md#43316-mh04---màn-hình-chi-tiết-yêu-cầu-xác-định-cơ-quan-giải-quyết-bồi-thường) ở chế độ chỉ xem trong cùng tab làm việc; thanh Menu Sidebar tự động Active vào menu "Xác định cơ quan giải quyết bồi thường". Khi đóng màn hình chi tiết, hệ thống quay trở lại đúng màn hình MH02 đang nhập liệu và Focus lại menu "Giải quyết yêu cầu bồi thường". |
| Thông tin yêu cầu bổ sung | String(255) | - | Ẩn | Chỉ hiển thị khi vụ việc ở trạng thái "Yêu cầu bổ sung". Hiển thị nội dung yêu cầu bổ sung do Cán bộ kiểm tra đã nhập tại **Popup Yêu cầu bổ sung / Từ chối hồ sơ**. Khi mở màn hình ở trạng thái này, hệ thống tự động focus/cuộn tới khối này để Cán bộ nhìn thấy ngay nội dung cần bổ sung; toàn bộ dữ liệu hồ sơ đã nhập liệu trước đó vẫn hiển thị đầy đủ trên form và cho phép sửa lại, không bị khóa. |
| Loại yêu cầu giải quyết bồi thường | Enum(String(100)) | Có | `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)` | Control UI: Radio button.<br>Giá trị gồm:<br>+ `Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)`<br>+ `Chỉ yêu cầu bồi thường thiệt hại bằng tiền`<br>+ `Chỉ yêu cầu phục hồi danh dự` |
| Tình trạng pháp lý hồ sơ | Enum(String(50)) | Có | `Yêu cầu chưa có Bản án/Quyết định của Tòa án` | Giá trị gồm:<br>+ `Yêu cầu chưa có Bản án/Quyết định của Tòa án`<br>+ `Đã có Bản án/Quyết định của Tòa án` |
| **Thông tin bản án gốc** | String(255) | - | Ẩn | Chỉ hiển thị khi chọn `Đã có Bản án/Quyết định của Tòa án`. |
| Nguồn phát sinh bản án | Enum(String(100)) | Có theo điều kiện | `Khởi kiện vụ án dân sự (Điều 52)` | Giá trị gồm:<br>+ `Khởi kiện vụ án dân sự (Điều 52)`<br>+ `Giải quyết trong quá trình tố tụng hình sự, tố tụng hành chính (Điều 55)` |
| Trường hợp khởi kiện | Enum(String(255)) | Có theo điều kiện | `Đã yêu cầu cơ quan giải quyết trước khi khởi kiện (điểm b khoản 1 và khoản 2 Điều 52)` | Chỉ hiển thị khi `Nguồn phát sinh bản án` là `Khởi kiện vụ án dân sự (Điều 52)`. Cán bộ chọn theo đúng căn cứ thụ lý đã nêu trong bản án/hồ sơ vụ án của Tòa án gửi về; **không** suy ra từ việc tìm/không tìm thấy hồ sơ gốc trên hệ thống ở trường bên dưới. Giá trị gồm:<br>+ `Khởi kiện thẳng ra Tòa án, chưa từng yêu cầu cơ quan giải quyết (điểm a khoản 1 Điều 52)`<br>+ `Đã yêu cầu cơ quan giải quyết trước khi khởi kiện — rút yêu cầu hoặc không đồng ý/thương lượng không thành (điểm b khoản 1 và khoản 2 Điều 52)` |
| Vụ việc yêu cầu bồi thường gốc liên quan | String(255) | Không | Trống | Control UI: Input text kèm nút `Tìm kiếm` (icon kính lúp) và liên kết `Tìm kiếm nâng cao`.<br>- Chỉ hiển thị khi "Trường hợp khởi kiện" là "Đã yêu cầu cơ quan giải quyết trước khi khởi kiện — rút yêu cầu hoặc không đồng ý/thương lượng không thành (điểm b khoản 1 và khoản 2 Điều 52)".<br>- Cho phép nhập `Mã vụ việc gốc` để tìm nhanh vụ việc/hồ sơ gốc liên quan.<br>- Nếu bấm `Tìm kiếm` khi chưa nhập dữ liệu: Vi phạm quy tắc [BR-VAL-001], hệ thống hiển thị thông báo cảnh báo lỗi [MSG-ERR-VAL-001] (*"Vui lòng nhập Mã vụ việc gốc để tìm kiếm"*) và không mở popup. |
| Liên kết hồ sơ gốc | String(255) | Không | Ẩn | Control UI: Text link (Read-only Hyperlink).<br>- Chỉ hiển thị sau khi cán bộ đã chọn một vụ việc gốc từ popup tìm kiếm hoặc khi mở lại hồ sơ đã có dữ liệu liên kết gốc trước đó.<br>- Vị trí: Hiển thị ngay dưới trường `Vụ việc yêu cầu bồi thường gốc liên quan`.<br>- Khi click vào liên kết: Hệ thống mở màn hình [MH04 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường](#43316-mh04---màn-hình-xem-chi-tiết-hồ-sơ-yêu-cầu-bồi-thường) của hồ sơ gốc ở chế độ chỉ xem trong cùng tab làm việc. Khi đóng màn hình chi tiết, hệ thống quay trở lại đúng màn hình MH02 đang nhập liệu. |
| Không có hồ sơ gốc trên hệ thống | Boolean | Không | Chưa chọn | <br>- Chỉ hiển thị khi "Trường hợp khởi kiện" là "Đã yêu cầu cơ quan giải quyết trước khi khởi kiện — rút yêu cầu hoặc không đồng ý/thương lượng không thành (điểm b khoản 1 và khoản 2 Điều 52)". <br>- Khi tick, hiển thị 3 trường bắt buộc thay thế ngay dưới đây để lưu vết căn cứ pháp lý dù không liên kết được hồ sơ gốc trên hệ thống. |
| Số quyết định/biên bản/đơn xin rút yêu cầu gốc | String(100) | Có theo điều kiện | Trống | Chỉ hiển thị và bắt buộc khi tick `Không có hồ sơ gốc trên hệ thống`. Lấy theo nội dung bản án/hồ sơ vụ án của Tòa án đã trích dẫn (tùy tình huống: số quyết định giải quyết bồi thường, số biên bản thương lượng không thành, hoặc số đơn xin rút yêu cầu). <br> - Áp dụng rule bắt buộc [BR-VAL-001]. |
| Ngày ban hành (hồ sơ gốc) | Date | Có theo điều kiện | Trống | Chỉ hiển thị và bắt buộc khi tick `Không có hồ sơ gốc trên hệ thống`. <br> - Áp dụng rule bắt buộc [BR-VAL-001]. |
| Cơ quan đã giải quyết trước đó | String(255) | Có theo điều kiện | Trống | Chỉ hiển thị và bắt buộc khi tick `Không có hồ sơ gốc trên hệ thống`. <br>- Áp dụng rule bắt buộc [BR-VAL-001]. |
| Số Bản án/Quyết định | String(50) | Có theo điều kiện | Trống | Áp dụng rule bắt buộc [BR-VAL-001]. |
| Ngày Bản án/Quyết định có hiệu lực | Date | Có theo điều kiện | Trống | Áp dụng rule bắt buộc [BR-VAL-001]. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | Không | Theo dữ liệu tiếp nhận | Tự động điền từ bước tiếp nhận YCBT, Tham chiếu Danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. Khi hồ sơ đã có bản án, UI tự động khóa/đặt theo luồng cán bộ chủ động nhập theo tố tụng/thi hành án. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | Có | Theo dữ liệu tiếp nhận | Tự động điền từ bước tiếp nhận YCBT, Tham chiếu Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Ngày văn bản yêu cầu bồi thường | Date | Có | Trống |  Control UI: DatePicker. Định dạng hiển thị trên UI `mm/dd/yyyy` <br> - Nhập ngày ghi trên đơn/văn bản yêu cầu bồi thường của người yêu cầu. . Áp dụng rule bắt buộc [BR-VAL-001] và rule ngày quá khứ [BR-VAL-008]. Phục vụ tổng hợp báo cáo theo Mẫu số 01/03 Thông tư 08/2019/TT-BTP. |
| Pháp luật áp dụng để giải quyết bồi thường | Enum(String(100)) | Có | Theo danh mục | Control UI: Combobox.<br>- Tham chiếu Danh mục Pháp luật áp dụng để giải quyết bồi thường [DM_28].<br>- Xác định căn cứ theo thời điểm phát sinh vụ việc và ngày văn bản yêu cầu bồi thường.<br>- Phục vụ tổng hợp báo cáo theo Mẫu số 01 Thông tư 08/2019/TT-BTP. |
| Cơ quan giải quyết bồi thường | Enum(String(255)) | Không | Trống | Control UI: Ô chọn có tìm kiếm (combobox). <br> - Tham chiếu Danh mục Cơ quan, Đơn vị giải quyết [DM_DON_VI]. <br> - Cho phép tìm kiếm nhanh theo `Mã đơn vị` hoặc `Tên đơn vị`; áp dụng tìm gần đúng (chứa chuỗi nhập, không phân biệt hoa/thường và dấu tiếng Việt). |
| **Thông tin người yêu cầu bồi thường** | String(100) | - | - | Khối thông tin nhân thân/tổ chức của người yêu cầu. |
| Họ và tên người yêu cầu bồi thường | String(100) | Có | Theo dữ liệu tiếp nhận | Tự động điền từ bước tiếp nhận YCBT, hiển thị dưới dạng Text, Cho phép chỉnh sửa; áp dụng rule bắt buộc [BR-VAL-001]. |
| Tư cách người yêu cầu bồi thường | Enum(String(100)) | Có | `Người bị thiệt hại` | Tham chiếu Danh mục Tư cách người yêu cầu bồi thường [DM_26]. |
| Giới tính | Enum(String(20)) | Có | `Nam` | Tham chiếu Danh mục Giới tính [DM_23]. |
| Ngày tháng năm sinh | Date | Có | Trống | Định dạng `dd/mm/yyyy`. Áp dụng rule bắt buộc [BR-VAL-001] và rule ngày quá khứ [BR-VAL-008]. |
| Trạng thái người bị thiệt hại | Enum(String(50)) | Có | `Còn sống` | Giá trị gồm:<br>+ `Còn sống`<br>+ `Đã chết` |
| Số điện thoại liên hệ | String(20) | Có | Trống | Áp dụng rule số điện thoại [BR-VAL-003]. |
| Địa chỉ Email | String(255) | Không | Trống | Control UI: Input text.<br>- Cho phép nhập địa chỉ email liên hệ của người yêu cầu bồi thường.<br>- Nếu có dữ liệu, áp dụng quy tắc Email [BR-VAL-002]. |
| Loại giấy tờ thân nhân | Enum(String(50)) | Có | `Căn cước công dân (CCCD)` | Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10]. |
| Số giấy tờ thân nhân | String(20) | Có | Trống | Nếu loại giấy tờ là CCCD, áp dụng rule [BR-VAL-004]. |
| Ngày cấp | Date | Có | Trống | Áp dụng rule ngày quá khứ [BR-VAL-008]. |
| Nơi cấp | String(255) | Có | Trống | Áp dụng rule bắt buộc [BR-VAL-001]. |
| Quốc gia | Enum(String(100)) | Có | `Việt Nam` | Tham chiếu Danh mục Quốc tịch / Quốc gia [DM_09]. Nếu chọn `Quốc gia khác`, UI chuyển phần tỉnh/thành sang nhập tự do. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Có | Theo quốc gia | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Có | Theo quốc gia | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Có | Theo dữ liệu tiếp nhận | Control UI: Textarea / Input text.<br>- Nhập số nhà, tên đường/phố, thôn/xóm/ấp...<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Hành vi gây thiệt hại của người thi hành công vụ | Text(2000) | Có | Trống | Áp dụng rule bắt buộc [BR-VAL-001]. |
| Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại | Text(2000) | Có | Trống | Áp dụng rule bắt buộc [BR-VAL-001]. |
| **Thông tin bồi thường thiệt hại bằng tiền** | Section | - | Ẩn/Hiện | **Nhóm thông tin về thiệt hại và chi trả tiền bồi thường/tạm ứng.**<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi `Loại yêu cầu giải quyết bồi thường` là *"Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)"* hoặc *"Chỉ yêu cầu bồi thường thiệt hại bằng tiền"*<br>- **Phạm vi nhóm**: Bao gồm 03 khối thông tin con:<br>+ Khối Bảng thiệt hại yêu cầu bồi thường<br>+ Khối Đề nghị tạm ứng kinh phí<br>+ Khối Thông tin người nhận tiền |
| *Khối Bảng thiệt hại yêu cầu bồi thường* | List(Object) | Không | Các dòng mặc định | Control UI: Data grid.<br>- Hiển thị mặc định theo điều kiện của nhóm cha.<br>- Tham chiếu Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]. |
| STT | Integer(10) | - | Tự tăng | Căn giữa. |
| Mục thiệt hại yêu cầu bồi thường | Boolean | - | Chưa chọn | Chỉ đọc. Tick để mở nhập `Cách tính / Diễn giải công thức áp dụng` và `Số tiền yêu cầu bồi thường`. |
| Cách tính / Diễn giải công thức áp dụng | Text(2000) | Có khi chọn dòng | Disabled khi chưa chọn | Áp dụng rule bắt buộc [BR-VAL-001] khi dòng thiệt hại được tick. |
| Số tiền yêu cầu bồi thường (đồng) | Decimal(18,0) | Có khi chọn dòng | Disabled khi chưa chọn | Áp dụng rule số tiền dương [BR-VAL-010] khi dòng thiệt hại được tick. |
| *Khối Đề nghị tạm ứng kinh phí* | Boolean | Không | Chưa chọn | Control UI: Checkbox.<br>- Hiển thị theo điều kiện của nhóm cha (ẩn thêm khi hồ sơ theo luồng đã có bản án của Tòa án).<br>- Tick để mở rộng các trường nhập tạm ứng kinh phí bên dưới. |
| Tạm ứng Thiệt hại tinh thần (đồng) | Decimal(18,0) | Không | Trống | Chỉ nhập khi có đề nghị tạm ứng và loại thiệt hại tinh thần phù hợp được chọn. |
| Tài liệu đính kèm kèm tạm ứng tinh thần | File | Không | Trống | Cho phép chọn file đính kèm. |
| Tạm ứng Thiệt hại khác tính được ngay | List(Enum(String(100))) | Không | Trống | Control UI: Checkbox list / Multi-select (Chọn nhiều).<br>- Chỉ hiển thị khi có tick chọn "Đề nghị tạm ứng kinh phí".<br>- Cho phép tích chọn một hoặc nhiều loại thiệt hại khác có thể tính được ngay.<br>- Tham chiếu Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]. |
| Tài liệu đính kèm kèm tạm ứng thiệt hại khác | File | Không | Trống | Cho phép chọn file đính kèm. |
| *Khối Thông tin người nhận tiền* | String(100) | - | Ẩn | **Khối thông tin nhân thân và phương thức chi trả tiền tạm ứng/bồi thường.**<br>- *Điều kiện hiển thị*: Chỉ hiển thị khi tick chọn "Đề nghị tạm ứng kinh phí" (hoặc khi phát sinh chi trả tiền bồi thường thực tế).<br>- *Phạm vi khối*: Bao gồm các trường từ "Họ và tên người nhận tiền" đến "Chi nhánh ngân hàng". |
| Họ và tên người nhận tiền | String(100) | Có khi hiển thị | Trống | Control UI: Input text.<br>- Nhập đầy đủ họ và tên của cá nhân hoặc người đại diện nhận tiền.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Số giấy tờ thân nhân người nhận | String(50) | Có khi hiển thị | Trống | Control UI: Input text.<br>- Nhập số CCCD/Hộ chiếu/Giấy tờ pháp lý của người nhận tiền.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Địa chỉ chi tiết người nhận | Text(1000) | Có khi hiển thị | Trống | Control UI: Textarea / Input text.<br>- Nhập địa chỉ cư trú hoặc địa chỉ liên hệ của người nhận tiền.<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Phương thức nhận tiền | Enum(String(50)) | Có khi hiển thị | `Nhận tiền mặt` | Control UI: Radio button / Combobox.<br>- Tham chiếu Danh mục Phương thức nhận tiền bồi thường/tạm ứng [DM_28].<br>- Giá trị gồm: "Nhận tiền mặt", "Nhận qua chuyển khoản". |
| Số biên lai nhận tiền mặt | String(50) | Không | Trống | Control UI: Input text.<br>- Chỉ hiển thị khi phương thức nhận tiền là "Nhận tiền mặt".<br>- Nhập số biên lai/phiếu chi giao nhận tiền mặt trực tiếp. |
| Chủ tài khoản | String(100) | Có theo điều kiện | Trống | Control UI: Input text.<br>- Chỉ hiển thị và bắt buộc khi phương thức nhận tiền là "Nhận qua chuyển khoản".<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Số tài khoản | String(50) | Có theo điều kiện | Trống | Control UI: Input text.<br>- Chỉ hiển thị và bắt buộc khi phương thức nhận tiền là "Nhận qua chuyển khoản".<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Tên ngân hàng | String(255) | Có theo điều kiện | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Chỉ hiển thị và bắt buộc khi phương thức nhận tiền là "Nhận qua chuyển khoản".<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| Chi nhánh ngân hàng | String(255) | Có theo điều kiện | Trống | Control UI: Input text.<br>- Chỉ hiển thị và bắt buộc khi phương thức nhận tiền là "Nhận qua chuyển khoản".<br>- Áp dụng quy tắc bắt buộc [BR-VAL-001]. |
| **Thông tin phục hồi danh dự** | Section | - | Ẩn/Hiện | **Nhóm thông tin về đề nghị phục hồi danh dự.**<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi `Loại yêu cầu giải quyết bồi thường` là *"Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)"* hoặc *"Chỉ yêu cầu phục hồi danh dự"*; ẩn hoàn toàn khi chọn *"Chỉ yêu cầu bồi thường thiệt hại bằng tiền"*.<br>- **Phạm vi nhóm**: Bao gồm các trường từ "Đề nghị phục hồi danh dự" đến "Yêu cầu khôi phục quyền, lợi ích hợp pháp khác". |
| Đề nghị phục hồi danh dự | Boolean | Không | Theo loại yêu cầu | Control UI: Checkbox.<br>- Nếu `Loại yêu cầu` là `Chỉ yêu cầu phục hồi danh dự`: Bắt buộc tick và khóa mờ (Disabled). |
| Trực tiếp xin lỗi và cải chính công khai | Boolean | Không | Checked | Hình thức phục hồi danh dự. |
| Đăng báo xin lỗi và cải chính công khai | Boolean | Không | Chưa chọn | Hình thức phục hồi danh dự. |
| Yêu cầu khôi phục quyền, lợi ích hợp pháp khác | Boolean | Không | Chưa chọn | Nếu tick, nhập mô tả nội dung khôi phục khác. |
| Bảng tài liệu đính kèm hồ sơ | List(Object) | Không | Danh mục tài liệu theo tư cách người yêu cầu | Control UI: Data grid.<br>- Danh sách tài liệu thay đổi theo `Tư cách người yêu cầu bồi thường`.<br>- Các tài liệu đã đính kèm ở bước tiếp nhận YCBT được hiển thị sẵn để người dùng xem, xóa hoặc bổ sung thêm. |
| STT | Integer(10) | - | Tự tăng | Căn giữa. |
| Tên tài liệu | String(255) | - | Theo danh mục | Hiển thị tên tài liệu cần đính kèm. |
| File đính kèm | File | - | Theo dữ liệu | Hiển thị tên file đã chọn hoặc trạng thái chưa có file. |
| Thao tác | String(255) | - | Theo dữ liệu | Gồm `Tải lên`, `Xem file`, `Xóa`. |

###### 4.3.3.1.4.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm (tại Khối Tìm nhanh từ vụ việc xác định cơ quan) | Button | - Nếu chưa nhập dữ liệu tại ô tìm kiếm: Vi phạm quy tắc [BR-VAL-001], hệ thống hiển thị thông báo cảnh báo lỗi [MSG-ERR-VAL-001] (*"Vui lòng nhập Mã vụ việc để tìm kiếm"*) và không mở popup.<br>- Nếu đã nhập dữ liệu: Hệ thống mở [Popup Tìm kiếm Vụ việc xác định cơ quan giải quyết bồi thường](#433110-popup-tìm-kiếm-vụ-việc-xác-định-cơ-quan-giải-quyết-bồi-thường), tự động điền giá trị đang nhập vào trường `Mã vụ việc` trên Popup và kích hoạt tìm kiếm. |
| 2 | Tìm kiếm nâng cao (tại Khối Tìm nhanh từ vụ việc xác định cơ quan) | Button | - Hệ thống mở [Popup Tìm kiếm Vụ việc xác định cơ quan giải quyết bồi thường](#433110-popup-tìm-kiếm-vụ-việc-xác-định-cơ-quan-giải-quyết-bồi-thường) ở chế độ mở rộng đầy đủ các tiêu chí lọc.<br>- Tự động kế thừa giá trị mã vụ việc đang nhập ở form chính (nếu có).<br>- Cho phép Cán bộ nhập thêm các tiêu chí lọc và bấm nút `Tìm kiếm` trên Popup. |
| 3 | Liên kết hồ sơ xác định cơ quan | Link | - Khi click vào liên kết: Hệ thống mở màn hình [Chi tiết yêu cầu xác định cơ quan giải quyết bồi thường](SRS_BTNN_Xác%20định%20cơ%20quan%20giải%20quyết.md#43316-mh04---màn-hình-chi-tiết-yêu-cầu-xác-định-cơ-quan-giải-quyết-bồi-thường) ở chế độ chỉ xem trong cùng tab làm việc.<br>- Thanh Menu Sidebar tự động chuyển Focus sang "Xác định cơ quan giải quyết bồi thường".<br>- Khi người dùng bấm "Đóng" tại màn chi tiết: Hệ thống điều hướng quay về đúng màn hình MH02 đang mở, Active lại menu "Giải quyết yêu cầu bồi thường" và giữ nguyên toàn bộ dữ liệu đang nhập trên form. |
| 4 | Tìm kiếm (tại trường Vụ việc yêu cầu bồi thường gốc liên quan) | Button | - Nếu chưa nhập dữ liệu tại ô tìm kiếm: Vi phạm quy tắc [BR-VAL-001], hệ thống hiển thị thông báo cảnh báo lỗi [MSG-ERR-VAL-001] (*"Vui lòng nhập Mã vụ việc gốc để tìm kiếm"*) và không mở popup.<br>- Nếu đã nhập dữ liệu: Hệ thống mở [Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan](#43319-popup-chuẩn-tìm-kiếm-vụ-việchồ-sơ-gốc-liên-quan), tự động điền giá trị đang nhập vào trường `Mã vụ việc/Số quyết định` trên Popup và kích hoạt tìm kiếm. |
| 5 | Tìm kiếm nâng cao (tại trường Vụ việc yêu cầu bồi thường gốc liên quan) | Button | - Hệ thống mở [Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan](#43319-popup-chuẩn-tìm-kiếm-vụ-việchồ-sơ-gốc-liên-quan) ở chế độ mở rộng đầy đủ các tiêu chí lọc.<br>- Tự động kế thừa giá trị đang nhập ở form chính (nếu có).<br>- Cho phép Cán bộ nhập thêm các tiêu chí lọc và bấm nút `Tìm kiếm` trên Popup. |
| 6 | Liên kết hồ sơ gốc | Link | - Khi click vào liên kết tại trường `Vụ việc yêu cầu bồi thường gốc liên quan`: Hệ thống mở màn hình [MH04 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường](#43316-mh04---màn-hình-xem-chi-tiết-hồ-sơ-yêu-cầu-bồi-thường) của vụ việc gốc ở chế độ chỉ xem trong cùng tab làm việc.<br>- Khi người dùng bấm "Đóng" tại màn chi tiết: Hệ thống điều hướng quay về đúng màn hình MH02 đang mở, giữ nguyên toàn bộ dữ liệu đang nhập trên form. |
| 7 | Hủy bỏ | Button | Hệ thống đóng form nhập liệu hồ sơ vụ việc và quay lại danh sách. |
| 8 | Lưu nháp | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Nhập liệu từ vụ việc**: Hệ thống lưu dữ liệu đang nhập, giữ trạng thái "Chờ tiếp nhận" và hiển thị thông báo [MSG-SUC-SYS-001]. |
|  |  |  | **TH2 - Cập nhật**: Hệ thống cập nhật dữ liệu hồ sơ hiện tại, giữ trạng thái hiện hành và hiển thị thông báo [MSG-SUC-SYS-002]. |
| 9 | Lưu thông tin | Button | - Điều kiện hiển thị: Chỉ hiển thị khi nhập liệu hồ sơ mới ở trạng thái "Chờ tiếp nhận" (tiêu đề "NHẬP LIỆU HỒ SƠ VỤ VIỆC").<br>- Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm quy tắc [BR-VAL-001]. Hệ thống tô viền đỏ ô trống đầu tiên và hiển thị cảnh báo lỗi [MSG-ERR-VAL-001]. Không cho phép lưu thông tin. |
|  |  |  | **TH2 - `Số điện thoại liên hệ` không đúng định dạng**: Vi phạm [BR-VAL-003], hiển thị [MSG-ERR-VAL-003]. Không cho phép lưu thông tin. |
|  |  |  | **TH3 - Địa chỉ Email không đúng định dạng**: Nếu `Địa chỉ Email` có dữ liệu nhưng không đúng định dạng, vi phạm [BR-VAL-002], hệ thống hiển thị [MSG-ERR-VAL-002]. Không cho phép lưu thông tin. |
|  |  |  | **TH4 - `Số giấy tờ thân nhân` là CCCD nhưng không đúng 12 chữ số**: Vi phạm [BR-VAL-004], hiển thị [MSG-ERR-VAL-004]. Không cho phép lưu thông tin. |
|  |  |  | **TH5 - `Ngày văn bản yêu cầu bồi thường`, `Ngày tháng năm sinh`, `Ngày cấp` lớn hơn ngày hiện tại**: Vi phạm [BR-VAL-008], hiển thị [MSG-ERR-VAL-008]. Không cho phép lưu thông tin. |
|  |  |  | **TH6 - Dòng thiệt hại được tick nhưng chưa nhập cách tính hoặc số tiền không lớn hơn 0**: Vi phạm [BR-VAL-001]/[BR-VAL-010], hiển thị [MSG-ERR-VAL-001]/[MSG-ERR-VAL-012]. Không cho phép lưu thông tin. |
|  |  |  | **TH7 - Hợp lệ (Hồ sơ thông thường chưa có bản án)**: Hệ thống sinh/cập nhật mã vụ việc theo quy tắc hiện hành, lưu toàn bộ thông tin hồ sơ vụ việc, chuyển trạng thái sang `Chờ kiểm tra`, cập nhật timeline và hiển thị thông báo [MSG-SUC-SYS-003]. |
|  |  |  | **TH8 - Hợp lệ (Hồ sơ đã có Bản án/Quyết định của Tòa án theo Điều 52, 55)**: Hệ thống lưu toàn bộ thông tin bản án và mức bồi thường đã nhập; chuyển trạng thái sang `Chờ kiểm tra` để Cán bộ kiểm tra/Lãnh đạo rà soát tính hợp lệ của Bản án trước khi chuyển thẳng sang bước `Chờ thực thi` (chi trả bồi thường) và `Đề nghị cấp kinh phí`, không cần qua các bước Thụ lý, Xác minh thiệt hại, Thương lượng hay Ban hành Quyết định bồi thường. |
| 10 | Gửi lại hồ sơ | Button | - Điều kiện hiển thị: Chỉ hiển thị khi mở màn hình MH02 đối với hồ sơ đang ở trạng thái "Yêu cầu bổ sung" (tiêu đề "BỔ SUNG HỒ SƠ VỤ VIỆC").<br>- Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc hoặc thông tin bổ sung**: Vi phạm quy tắc [BR-VAL-001]. Hệ thống tô viền đỏ ô trống đầu tiên và hiển thị cảnh báo lỗi [MSG-ERR-VAL-001]. Không cho phép gửi lại hồ sơ. |
|  |  |  | **TH2 - Lỗi định dạng dữ liệu (Email, SĐT, Số CCCD, Ngày tháng...)**: Vi phạm các quy tắc [BR-VAL-002], [BR-VAL-003], [BR-VAL-004], [BR-VAL-008]. Hệ thống hiển thị thông báo lỗi tương ứng và dừng xử lý. |
|  |  |  | **TH3 - Hợp lệ**: Hệ thống lưu toàn bộ dữ liệu hồ sơ đã bổ sung, chuyển trạng thái hồ sơ từ "Yêu cầu bổ sung" sang "Chờ kiểm tra", cập nhật timeline xử lý và hiển thị thông báo thành công [MSG-SUC-SYS-002]. |
| 11 | Tải lên | Button | Hệ thống mở trình chọn file cho dòng tài liệu tương ứng. |
| 12 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 13 | Xóa | Link/Icon | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Người dùng xác nhận xóa file**: Hệ thống mở **Popup Xác nhận** với nội dung [MSG-CFM-SYS-001]. Nếu xác nhận, hệ thống gỡ file khỏi dòng tài liệu. |
|  |  |  | **TH2 - Người dùng hủy thao tác**: Hệ thống đóng popup xác nhận và giữ nguyên file. |

---

##### 4.3.3.1.5. MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường

###### 4.3.3.1.5.1. Màn hình

![Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](images/UC431_466_MH03_Xem_chi_tiet_xu_ly_ho_so_boi_thuong.png)

**\* Quy chế hoạt động của Màn hình MH03:**

- Màn hình MH03 mở ở **chế độ Cập nhật kết quả xử lý**; áp dụng khi người dùng có thẩm quyền bấm thao tác Cập nhật hồ sơ trên danh sách tra cứu (MH01) hoặc bấm nút kích hoạt nghiệp vụ tương ứng (Cập nhật kết quả bổ sung, Cập nhật xác minh, Cập nhật kết quả thương lượng, Cập nhật kết quả thực thi, Hoãn giải quyết, Tạm đình chỉ / Đình chỉ, Tiếp tục giải quyết...) trên [MH04 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường](#43316-mh04---màn-hình-xem-chi-tiết-hồ-sơ-yêu-cầu-bồi-thường).
- **Tab 1: Thông tin Hồ sơ yêu cầu**: Luôn hiển thị, luôn ở chế độ **Chỉ đọc**, kế thừa toàn bộ dữ liệu đã nhập ở [MH02 - Màn hình Nhập liệu hồ sơ vụ việc](#43314-mh02---màn-hình-nhập-liệu-hồ-sơ-vụ-việc) (Thông tin chung, Thông tin người yêu cầu, Thông tin bồi thường thiệt hại bằng tiền, Thông tin phục hồi danh dự, Bảng tài liệu đính kèm hồ sơ).
- **Tab 2: Chi tiết xử lý hồ sơ**: 
  - *Điều kiện hiển thị*: Chỉ hiển thị khi Hồ sơ ở trạng thái từ Đang xác minh thiệt hại trở đi VÀ Loại yêu cầu giải quyết bồi thường là **"Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)"** hoặc **"Chỉ yêu cầu bồi thường thiệt hại bằng tiền"**.
  - *Quy tắc mở rộng / thu gọn*: Chỉ duy nhất khối nghiệp vụ tương ứng với **Trạng thái hiện tại** của hồ sơ mới mở rộng và cho phép nhập liệu/chỉnh sửa; các khối thuộc giai đoạn trước hiển thị thu gọn (chỉ đọc, có badge [✓ Đã hoàn thành]); các khối thuộc giai đoạn sau bị khóa mờ ([🔒 Chưa thực hiện]). Khi điều hướng vào MH03 từ một nút kích hoạt cụ thể trên MH04, hệ thống tự động cuộn/focus và mở rộng sẵn đúng khối nghiệp vụ tương ứng.
- **Tab 3: Phục hồi danh dự**: 
  - *Điều kiện hiển thị*: Chỉ hiển thị khi hồ sơ có yêu cầu phục hồi danh dự (Loại yêu cầu giải quyết bồi thường là *"Yêu cầu cả hai"* hoặc *"Chỉ yêu cầu phục hồi danh dự"*) VÀ trạng thái hồ sơ thuộc nhóm từ Đang xác minh thiệt hại trở đi. Cho phép nhập/cập nhật theo Stepper 04 bước phục hồi danh dự; cấu trúc và trường thông tin chi tiết được đặc tả tại [MH05 - Tab Phục hồi danh dự](#43317-mh05---tab-phục-hồi-danh-dự).

###### 4.3.3.1.5.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | CẬP NHẬT HỒ SƠ | Chỉ đọc. |
| Badge trạng thái | Enum(String(50)) | - | Theo hồ sơ | Hiển thị trạng thái hồ sơ theo Danh mục Trạng thái vụ việc yêu cầu bồi thường [DM_24]. |
| Tab nghiệp vụ | Enum(String(50)) | - | Thông tin Hồ sơ yêu cầu | Control UI: Tab navigation.<br>Bao gồm 03 tab nghiệp vụ:<br>+ **Tab 1: "Thông tin Hồ sơ yêu cầu"**: Luôn hiển thị (Active mặc định). Hiển thị toàn bộ thông tin chi tiết của hồ sơ vụ việc yêu cầu bồi thường ở chế độ chỉ đọc.<br>+ **Tab 2: "Chi tiết xử lý hồ sơ"**: Chỉ hiển thị khi Hồ sơ ở trạng thái từ Đang xác minh thiệt hại trở đi VÀ Loại yêu cầu giải quyết bồi thường là "Yêu cầu cả hai" hoặc "Chỉ yêu cầu bồi thường thiệt hại bằng tiền".<br>+ **Tab 3: "Phục hồi danh dự"**: Chỉ hiển thị trên thanh điều hướng tab khi thỏa mãn đồng thời 2 điều kiện: Hồ sơ có yêu cầu phục hồi danh dự (Loại yêu cầu giải quyết bồi thường là *"Yêu cầu cả hai"* hoặc *"Chỉ yêu cầu phục hồi danh dự"*) VÀ trạng thái hồ sơ thuộc nhóm từ Đang xác minh thiệt hại trở đi. |
| **Tab 1: Thông tin Hồ sơ yêu cầu** | String(100) | - | Active | Khối thông tin chi tiết hồ sơ vụ việc yêu cầu bồi thường ở chế độ chỉ đọc.<br>- Điều kiện hiển thị: Luôn hiển thị.<br>- Phạm vi khối: Bao gồm các thông tin chi tiết từ "Mã vụ việc" đến "Bảng tài liệu đính kèm hồ sơ" được mô tả chi tiết từng dòng bên dưới (kế thừa toàn bộ dữ liệu từ MH02 ở chế độ chỉ đọc). |
| Mã vụ việc | String(50) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tự động điền từ vụ việc đã tiếp nhận. |
| Thời điểm tiếp nhận | Datetime | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tự động điền từ vụ việc đã tiếp nhận, định dạng dd/mm/yyyy HH:mm. |
| Tên vụ việc | String(255) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tên vụ việc yêu cầu bồi thường đã nhập. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tỉnh/Thành phố nơi xảy ra thiệt hại. |
| Phường/Xã | Enum(String(100)) / String(100) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Phường/Xã nơi xảy ra thiệt hại. |
| Địa chỉ chi tiết | Text(1000) / String(500) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Địa chỉ chi tiết nơi xảy ra thiệt hại. |
| Liên kết hồ sơ xác định cơ quan | String(255) | - | Theo dữ liệu | Control UI: Text link (Hyperlink).<br>- Chỉ hiển thị nếu hồ sơ có liên kết với vụ việc xác định cơ quan.<br>- Khi click vào liên kết: Hệ thống mở màn hình [Chi tiết yêu cầu xác định cơ quan giải quyết bồi thường](SRS_BTNN_Xác%20định%20cơ%20quan%20giải%20quyết.md#43316-mh04---màn-hình-chi-tiết-yêu-cầu-xác-định-cơ-quan-giải-quyết-bồi-thường) ở chế độ chỉ xem trong cùng tab làm việc; Menu Sidebar tự động Active vào "Xác định cơ quan giải quyết bồi thường". Khi đóng màn chi tiết, hệ thống quay trở lại đúng màn hình MH03 và Focus lại menu "Giải quyết yêu cầu bồi thường". |
| Thông tin yêu cầu bổ sung | String(255) | - | Theo dữ liệu | Chỉ hiển thị khi hồ sơ từng có yêu cầu bổ sung. Hiển thị nội dung yêu cầu bổ sung do Cán bộ kiểm tra đã nhập. |
| Loại yêu cầu giải quyết bồi thường | Enum(String(100)) | - | Theo dữ liệu | Chỉ đọc. Gồm Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự), Chỉ yêu cầu bồi thường thiệt hại bằng tiền hoặc Chỉ yêu cầu phục hồi danh dự. |
| Tình trạng pháp lý hồ sơ | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Gồm Yêu cầu chưa có Bản án/Quyết định của Tòa án hoặc Đã có Bản án/Quyết định của Tòa án. |
| **Thông tin bản án gốc** | String(255) | - | Ẩn | Chỉ hiển thị khi hồ sơ thuộc trường hợp Đã có Bản án/Quyết định của Tòa án. |
| Nguồn phát sinh bản án | Enum(String(100)) | - | Theo dữ liệu | Chỉ đọc. Gồm Khởi kiện vụ án dân sự (Điều 52) hoặc Giải quyết trong quá trình tố tụng hình sự, tố tụng hành chính (Điều 55). |
| Trường hợp khởi kiện | Enum(String(255)) | - | Theo dữ liệu | Chỉ đọc. Hiển thị căn cứ khởi kiện theo bản án. |
| Vụ việc yêu cầu bồi thường gốc liên quan | String(255) | - | Theo dữ liệu | Chỉ đọc. Mã vụ việc hoặc số quyết định bồi thường gốc liên quan. |
| Liên kết hồ sơ gốc | String(255) | - | Theo dữ liệu | Control UI: Text link (Hyperlink).<br>- Chỉ hiển thị khi có liên kết vụ việc gốc.<br>- Click vào liên kết mở màn hình chi tiết hồ sơ gốc ở chế độ chỉ xem trong cùng tab làm việc. |
| Không có hồ sơ gốc trên hệ thống | Boolean | - | Theo dữ liệu | Chỉ đọc. Theo thông tin của Hồ sơ |
| Số quyết định/biên bản/đơn xin rút yêu cầu gốc | String(100) | - | Theo dữ liệu | Chỉ đọc. Số văn bản căn cứ gốc đối với hồ sơ ngoài hệ thống. |
| Ngày ban hành (hồ sơ gốc) | Date | - | Theo dữ liệu | Chỉ đọc. Định dạng dd/mm/yyyy. |
| Cơ quan đã giải quyết trước đó | String(255) | - | Theo dữ liệu | Chỉ đọc. Tên cơ quan đã giải quyết trước khi khởi kiện. |
| Số Bản án/Quyết định | String(50) | - | Theo dữ liệu | Chỉ đọc. Số bản án/quyết định của Tòa án. |
| Ngày Bản án/Quyết định có hiệu lực | Date | - | Theo dữ liệu | Chỉ đọc. Định dạng dd/mm/yyyy. |
| Hình thức tiếp nhận hồ sơ | Enum(String(50)) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tham chiếu Danh mục Hình thức tiếp nhận hồ sơ bồi thường [DM_25]. |
| Lĩnh vực phát sinh thiệt hại | Enum(String(100)) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Tham chiếu Danh mục Lĩnh vực phát sinh thiệt hại [DM_22]. |
| Ngày văn bản yêu cầu bồi thường | Date | - | Theo dữ liệu | Chỉ đọc. Ngày ghi trên đơn yêu cầu, định dạng dd/mm/yyyy. |
| Pháp luật áp dụng để giải quyết bồi thường | Enum(String(100)) | - | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Pháp luật áp dụng để giải quyết bồi thường [DM_28]. |
| Cơ quan giải quyết bồi thường | Enum(String(255)) | - | Theo dữ liệu | Chỉ đọc. Tên cơ quan, đơn vị có thẩm quyền giải quyết bồi thường. |
| **Thông tin người yêu cầu bồi thường** | String(100) | - | - | Khối thông tin nhân thân/tổ chức của người yêu cầu bồi thường ở chế độ chỉ đọc. |
| Họ và tên người yêu cầu bồi thường | String(100) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Họ và tên người yêu cầu. |
| Tư cách người yêu cầu bồi thường | Enum(String(100)) | - | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Tư cách người yêu cầu bồi thường [DM_26]. |
| Giới tính | Enum(String(20)) | - | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Giới tính [DM_23]. |
| Ngày tháng năm sinh | Date | - | Theo dữ liệu | Chỉ đọc. Định dạng dd/mm/yyyy. |
| Trạng thái người bị thiệt hại | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Còn sống hoặc Đã chết. |
| Số điện thoại liên hệ | String(20) | - | Theo dữ liệu | Chỉ đọc. Số điện thoại liên hệ. |
| Địa chỉ Email | String(255) | - | Theo dữ liệu | Chỉ đọc. Địa chỉ email liên hệ. |
| Loại giấy tờ thân nhân | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Loại giấy tờ pháp lý/thân nhân [DM_10]. |
| Số giấy tờ thân nhân | String(20) | - | Theo dữ liệu | Chỉ đọc. Số CCCD/Hộ chiếu/Giấy tờ pháp lý. |
| Ngày cấp | Date | - | Theo dữ liệu | Chỉ đọc. Định dạng dd/mm/yyyy. |
| Nơi cấp | String(255) | - | Theo dữ liệu | Chỉ đọc. Cơ quan cấp giấy tờ. |
| Quốc gia | Enum(String(100)) | - | Theo dữ liệu | Chỉ đọc. Tham chiếu Danh mục Quốc tịch / Quốc gia [DM_09]. |
| Tỉnh/Thành phố (người yêu cầu) | Enum(String(100)) / String(100) | - | Theo dữ liệu | Chỉ đọc. Tỉnh/Thành phố nơi cư trú. |
| Phường/Xã (người yêu cầu) | Enum(String(100)) / String(100) | - | Theo dữ liệu | Chỉ đọc. Phường/Xã nơi cư trú. |
| Địa chỉ chi tiết (người yêu cầu) | Text(1000) / String(500) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Địa chỉ chi tiết nơi cư trú. |
| Hành vi gây thiệt hại của người thi hành công vụ | Text(2000) | - | Theo dữ liệu | Chỉ đọc. Mô tả hành vi gây thiệt hại. |
| Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại | Text(2000) | - | Theo dữ liệu | Chỉ đọc. Mô tả quan hệ nhân quả. |
| **Thông tin bồi thường thiệt hại bằng tiền** | Section | - | Ẩn/Hiện | **Nhóm thông tin về thiệt hại và chi trả tiền bồi thường/tạm ứng ở chế độ chỉ đọc.**<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Loại yêu cầu giải quyết bồi thường là *"Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)"* hoặc *"Chỉ yêu cầu bồi thường thiệt hại bằng tiền"*;<br>- **Phạm vi nhóm**: Bao gồm 03 khối thông tin con:<br>+ Khối Bảng thiệt hại yêu cầu bồi thường<br>+ Khối Đề nghị tạm ứng kinh phí<br>+ Khối Thông tin người nhận tiền |
| *Khối Bảng thiệt hại yêu cầu bồi thường* | List(Object) | - | Theo dữ liệu | Control UI: Data grid chỉ đọc.<br>- Hiển thị mặc định theo điều kiện của nhóm cha.<br>- Danh sách các mục thiệt hại và số tiền do người yêu cầu đề nghị. |
| STT | Integer(10) | - | Tự tăng | Căn giữa. |
| Mục thiệt hại yêu cầu | String(255) | - | Theo dữ liệu | Chỉ đọc. Tên loại thiệt hại theo Danh mục Loại thiệt hại yêu cầu bồi thường [DM_27]. |
| Cách tính / Diễn giải công thức áp dụng | Text(2000) | - | Theo dữ liệu | Chỉ đọc. Diễn giải chi tiết cách tính mức bồi thường của người yêu cầu. |
| Số tiền yêu cầu bồi thường (đồng) | Decimal(18,0) | - | Theo dữ liệu | Chỉ đọc. Số tiền người yêu cầu đề nghị, định dạng phân tách hàng nghìn. |
| *Khối Đề nghị tạm ứng kinh phí* | Boolean | - | Theo dữ liệu | Control UI: Checkbox chỉ đọc.<br>- Hiển thị theo điều kiện của nhóm cha (ẩn khi hồ sơ theo luồng đã có bản án của Tòa án). |
| Tạm ứng Thiệt hại tinh thần (đồng) | Decimal(18,0) | - | Theo dữ liệu | Chỉ đọc. Số tiền tạm ứng thiệt hại tinh thần nếu có. |
| Tài liệu đính kèm kèm tạm ứng tinh thần | File | - | Theo dữ liệu | Chỉ đọc. Tên file và liên kết xem file đính kèm. |
| Tạm ứng Thiệt hại khác tính được ngay | List(Enum(String(100))) | - | Theo dữ liệu | Chỉ đọc. Danh sách các loại thiệt hại khác đề nghị tạm ứng. |
| Tài liệu đính kèm kèm tạm ứng thiệt hại khác | File | - | Theo dữ liệu | Chỉ đọc. Tên file và liên kết xem file đính kèm. |
| *Khối Thông tin người nhận tiền* | String(100) | - | Theo dữ liệu | **Khối thông tin người nhận tiền tạm ứng/bồi thường ở chế độ chỉ đọc.**<br>- *Điều kiện hiển thị*: Chỉ hiển thị khi có dữ liệu tạm ứng kinh phí hoặc khi phát sinh chi trả tiền bồi thường.<br>- *Phạm vi khối*: Gồm các trường từ "Họ và tên người nhận tiền" đến "Chi nhánh ngân hàng". |
| Họ và tên người nhận tiền | String(100) | - | Theo dữ liệu | Chỉ đọc. Họ và tên người nhận tiền. |
| Số giấy tờ thân nhân người nhận | String(50) | - | Theo dữ liệu | Chỉ đọc. Số giấy tờ thân nhân người nhận. |
| Địa chỉ chi tiết người nhận | Text(1000) | - | Theo dữ liệu | Chỉ đọc. Địa chỉ liên hệ người nhận. |
| Phương thức nhận tiền | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Nhận tiền mặt hoặc Nhận qua chuyển khoản. |
| Số biên lai nhận tiền mặt | String(50) | - | Theo dữ liệu | Chỉ đọc. Số biên lai giao nhận tiền mặt (nếu nhận tiền mặt). |
| Chủ tài khoản | String(100) | - | Theo dữ liệu | Chỉ đọc. Tên chủ tài khoản ngân hàng (nếu nhận chuyển khoản). |
| Số tài khoản | String(50) | - | Theo dữ liệu | Chỉ đọc. Số tài khoản ngân hàng (nếu nhận chuyển khoản). |
| Tên ngân hàng | String(255) | - | Theo dữ liệu | Chỉ đọc. Tên ngân hàng (nếu nhận chuyển khoản). |
| Chi nhánh ngân hàng | String(255) | - | Theo dữ liệu | Chỉ đọc. Chi nhánh ngân hàng (nếu nhận chuyển khoản). |
| **Thông tin phục hồi danh dự** | Section | - | Theo dữ liệu | **Nhóm thông tin về đề nghị phục hồi danh dự ở chế độ chỉ đọc.**<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Loại yêu cầu giải quyết bồi thường là *"Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)"* hoặc *"Chỉ yêu cầu phục hồi danh dự"*; <br>- **Phạm vi nhóm**: Bao gồm các trường từ "Đề nghị phục hồi danh dự" đến "Yêu cầu khôi phục quyền, lợi ích hợp pháp khác". |
| Đề nghị phục hồi danh dự | Boolean | - | Theo dữ liệu | Chỉ đọc. Trạng thái có/không đề nghị phục hồi danh dự. |
| Trực tiếp xin lỗi và cải chính công khai | Boolean | - | Theo dữ liệu | Chỉ đọc. Chỉ hiển thị khi có tích chọn tại hồ sơ Vụ việc YCBT. |
| Đăng báo xin lỗi và cải chính công khai | Boolean | - | Theo dữ liệu | Chỉ đọc. Chỉ hiển thị khi có tích chọn tại hồ sơ Vụ việc YCBT. |
| Yêu cầu khôi phục quyền, lợi ích hợp pháp khác | Boolean | - | Theo dữ liệu | Chỉ đọc. Chỉ hiển thị khi có tích chọn tại hồ sơ Vụ việc YCBT. |
| Bảng tài liệu đính kèm hồ sơ | List(Object) | - | Theo dữ liệu | Control UI: Data grid chỉ đọc.<br>- Hiển thị toàn bộ các tài liệu đã đính kèm ở các bước tiếp nhận và xử lý hồ sơ. |
| STT | Integer(10) | - | Tự tăng | Căn giữa. |
| Tên tài liệu | String(255) | - | Theo danh mục | Chỉ đọc. Tên tài liệu đính kèm. |
| File đính kèm | File | - | Theo dữ liệu | Chỉ đọc. Tên file đính kèm. |
| Thao tác | String(255) | - | Theo dữ liệu | Chỉ đọc. Liên kết Xem file tại tab riêng. |
| **Tab 2: Chi tiết xử lý hồ sơ** | Text(2000) | - | Theo trạng thái | Khối hiển thị toàn bộ lộ trình các bước quy trình nghiệp vụ giải quyết bồi thường theo dạng các khối thông tin có thể mở rộng - thu gọn.<br>- **Điều kiện hiển thị**: Chỉ hiển thị khi Hồ sơ ở trạng thái từ Đang xác minh thiệt hại trở đi VÀ Loại yêu cầu giải quyết bồi thường là **"Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)"** hoặc **"Chỉ yêu cầu bồi thường thiệt hại bằng tiền"**.<br>- **Phạm vi khối**: Bao gồm tuần tự 07 khối thông tin từ "1. Khối Tiếp nhận & Thụ lý hồ sơ" đến "7. Khối thông tin Hoãn / Tạm đình chỉ / Đình chỉ giải quyết". |
| **1. Khối Tiếp nhận & Thụ lý hồ sơ** | String(255) | - | Thu gọn / Chỉ đọc | Control UI: Khối nghiệp vụ thu gọn.<br>- Hiển thị toàn bộ thông tin tiếp nhận và thụ lý hồ sơ ở chế độ Chỉ đọc kèm biểu tượng [✓ Đã hoàn thành]. |
| Kênh tiếp nhận | Enum(String(50)) | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Kênh tiếp nhận hồ sơ (Trực tiếp, Bưu chính, Trực tuyến...). |
| Ngày tiếp nhận | Date | - | Theo dữ liệu tiếp nhận | Chỉ đọc. Định dạng dd/mm/yyyy. |
| Hạn xử lý | Date | - | Theo quy định SLA | Chỉ đọc. Hạn xử lý theo quy định, định dạng dd/mm/yyyy. |
| Đơn vị giải quyết | Enum(String(255)) | - | Theo cơ quan giải quyết | Chỉ đọc. Đơn vị chủ trì giải quyết hồ sơ. |
| Cán bộ được cử giải quyết | String(100) | - | Theo QĐ cử người giải quyết | Chỉ đọc. Họ và tên cán bộ được phân công giải quyết hồ sơ. |
| Chức vụ cán bộ giải quyết | String(100) | - | Theo hồ sơ | Chỉ đọc. Chức vụ của cán bộ được cử giải quyết. |
| Đơn vị ban hành QĐ cử người giải quyết | Enum(String(255)) | - | Theo hồ sơ | Chỉ đọc. Cơ quan/Đơn vị ban hành Quyết định cử người giải quyết. |
| Số Quyết định cử người giải quyết | String(50) | - | Theo hồ sơ | Chỉ đọc. Số hiệu Quyết định cử người giải quyết. |
| Ngày Quyết định cử người giải quyết | Date | - | Theo hồ sơ | Chỉ đọc. Ngày ban hành Quyết định cử người giải quyết, định dạng dd/mm/yyyy. |
| Tài liệu Quyết định cử người giải quyết | File | - | Theo hồ sơ | Chỉ đọc. Tên file quyết định đính kèm kèm liên kết Xem file. |
| **2. Khối Lịch sử Yêu cầu bổ sung hồ sơ bồi thường (Nếu có)** | String(255) | - | Ẩn/Hiện | Control UI: Khối thông tin nghiệp vụ.<br>- **Điều kiện hiển thị**: Chỉ hiển thị nếu trong quá trình xử lý hồ sơ từng phát sinh yêu cầu bổ sung; nếu hồ sơ không có yêu cầu bổ sung thì ẩn hoàn toàn khối này. |
| Ngày yêu cầu bổ sung | Date | - | Theo hồ sơ | Chỉ đọc. Ngày cán bộ gửi yêu cầu bổ sung, định dạng dd/mm/yyyy. |
| Cán bộ yêu cầu | String(100) | - | Theo hồ sơ | Chỉ đọc. Họ và tên cán bộ yêu cầu bổ sung hồ sơ. |
| Nội dung yêu cầu bổ sung | Text(2000) | - | Theo hồ sơ | Chỉ đọc. Chi tiết nội dung/tài liệu yêu cầu người nộp bổ sung. |
| Hạn bổ sung | Date | - | Theo hồ sơ | Chỉ đọc. Hạn chót nộp bổ sung hồ sơ, định dạng dd/mm/yyyy. |
| Tài liệu yêu cầu bổ sung đính kèm | File | - | Theo hồ sơ | Chỉ đọc. File văn bản thông báo yêu cầu bổ sung kèm liên kết Xem file. |
| Ngày người yêu cầu nộp bổ sung | Date | - | Theo hồ sơ | Chỉ đọc. Thời điểm người yêu cầu nộp lại hồ sơ bổ sung, định dạng dd/mm/yyyy. |
| **3. Khối Xác minh thiệt hại thực tế** | String(255) | - | Theo trạng thái | Control UI: Khối nghiệp vụ có thể mở rộng/thu gọn.<br>- *Quy tắc hiển thị*: Mặc định thu gọn. Tự động mở rộng ở chế độ chỉnh sửa khi hồ sơ ở trạng thái Đang xác minh thiệt hại. <br> - Khi đã hoàn thành xác minh (từ Đang thương lượng trở đi) hiển thị Thu gọn và Chỉ đọc kèm [✓ Đã hoàn thành]. |
| *Khối Bảng đối soát & xác minh các khoản thiệt hại* | List(Object) | - | Theo hồ sơ | Control UI: Data grid.<br>- Bảng danh sách tổng hợp các danh mục thiệt hại người nộp đơn yêu cầu. |
| STT | Integer(10) | - | Tự tăng | Căn giữa. Thứ tự khoản mục thiệt hại. |
| Mục thiệt hại yêu cầu | String(255) | - | Theo hồ sơ | Chỉ đọc. Chỉ hiển thị các Mục thiệt hại được tích chọn trong Hồ sơ Yêu cầu bồi thường. |
| Tiền yêu cầu (đồng) | Decimal(18,0) | - | Theo hồ sơ | Chỉ đọc. Số tiền người nộp đơn yêu cầu bồi thường, định dạng phân tách hàng nghìn. |
| Đề xuất mức bồi thường (đồng) | Decimal(18,0) | Có khi hoàn thành xác minh | Trống | Control UI: Ô nhập số tiền.<br>- Nhập số tiền bồi thường do cán bộ thẩm định, đề xuất sau khi tiến hành xác minh thực tế.<br>- Áp dụng quy tắc số dương [BR-VAL-010] và bắt buộc nhập khi bấm Hoàn thành xác minh [BR-VAL-001]. |
| Ghi chú xác minh | String(500) | Không | Trống | Control UI: Ô nhập text ngắn ghi chú kết quả đối soát. |
| Chi tiết | Action (Button) | - | - | Control UI: Nút toggle đóng/mở khối nhập chi tiết quá trình xác minh (Form con 3.2) cho từng mục thiệt hại tương ứng. |
| *Khối Chi tiết quá trình xác minh* | Form (Object) | - | Đóng/Mở theo nút Chi tiết | Form con mở rộng theo từng mục thiệt hại khi người dùng click nút [Chi tiết]. Gồm các trường thông tin bên dưới: |
| Ngày tiến hành  | Date | Có theo form con | Trống | Control UI: Datepicker (định dạng dd/mm/yyyy). Áp dụng [BR-VAL-001] và [BR-VAL-008]. |
| Địa điểm  | String(255) | Có theo form con | Trống | Control UI: Input text. Địa điểm thực hiện xác minh. Áp dụng [BR-VAL-001]. |
| Thành phần tham gia  | String(500) | Có theo form con | Trống | Control UI: Input text. Danh sách cá nhân/đơn vị tham gia. Áp dụng [BR-VAL-001]. |
| Cách thức xác minh  | Text(2000) | Có theo form con | Trống | Control UI: Textarea. Mô tả phương pháp/cách thức tiến hành xác minh. Áp dụng [BR-VAL-001]. |
| Cách tính  | Text(2000) | Có theo form con | Trống | Control UI: Textarea. Công thức, căn cứ hoặc cách tính toán mức bồi thường cụ thể. Áp dụng [BR-VAL-001]. |
| *Khối Thông tin bổ sung quá trình xác minh* | Section | - | - | Các trường văn bản dạng Textarea nhập thông tin chung: |
| Thỏa thuận việc kéo dài thời gian xác minh | Text(2000) | Không | Trống | Control UI: Textarea. Nhập nội dung/biên bản thỏa thuận gia hạn thời gian xác minh (nếu có). |
| Các nội dung khác liên quan đến quá trình xác minh thiệt hại | Text(2000) | Không | Trống | Control UI: Textarea. Nhập ghi chú, tình tiết phát sinh khác trong quá trình xác minh (nếu có). |
| *Khối Đính kèm tài liệu* | Section | - | - | Khối đính kèm tài liệu: |
| Tải lên tài liệu | File/List(File) | Không | Trống | Control UI: Nút bấm/vùng tải tệp (Upload file) để đính kèm các tài liệu: <br> - Cho phép tải lên nhiều file; <br> - Sau khi tải lên hiển thị tên file kèm liên kết Xem file và nút Xóa. Áp dụng [BR-FILE-010]. |
| **4. Khối Thương lượng giải quyết bồi thường** | String(255) | - | Theo trạng thái | Control UI: Khối nghiệp vụ có thể mở rộng/thu gọn.<br>- Cấu trúc thành 2 phần chính: Khối A (Thông tin dự kiến) và Khối B (Kết quả thực tế).<br>- *Quy tắc hiển thị*: Mặc định thu gọn. <br> - Tự động mở rộng ở chế độ chỉnh sửa khi hồ sơ ở trạng thái Đang thương lượng. <br> - Khi đã hoàn thành thương lượng (từ Chờ ban hành QĐ trở đi) hiển thị Thu gọn và Chỉ đọc kèm [✓ Đã hoàn thành]. <br> - Trước bước thương lượng hiển thị Thu gọn và Khóa mờ [🔒 Chưa thực hiện]. |
| *A. Thông tin dự kiến phiên họp thương lượng* | Section | - | - | Lưu trữ thông tin lên kế hoạch cho phiên họp thương lượng: |
| Thời gian dự kiến | Datetime | Không | Trống | Control UI: Datetime picker (định dạng dd/mm/yyyy HH:mm). Ghi nhận thời gian dự kiến tổ chức phiên họp thương lượng. |
| Địa điểm dự kiến | String(255) | Không | Trống | Control UI: Input text. Địa điểm dự kiến diễn ra phiên họp thương lượng. |
| Thành phần dự kiến | String(500) | Không | Trống | Control UI: Input text. Danh sách cá nhân/đại diện dự kiến tham gia phiên họp. |
| *B. Kết quả thực tế phiên họp thương lượng* | Section | - | - | Ghi nhận diễn biến và kết quả sau khi phiên họp diễn ra: |
| Thời gian thực tế  | Datetime | Có khi hoàn thành thương lượng | Trống | Control UI: Datetime picker (định dạng dd/mm/yyyy HH:mm). Thời gian thực tế diễn ra phiên họp. Bắt buộc nhập khi bấm Hoàn thành thương lượng [BR-VAL-001]. |
| Địa điểm thực tế | String(255) | Có khi hoàn thành thương lượng | Trống | Control UI: Input text. Địa điểm thực tế tổ chức phiên họp. Bắt buộc nhập khi bấm Hoàn thành thương lượng [BR-VAL-001]. |
| Thành phần thực tế  | String(500) | Có khi hoàn thành thương lượng | Trống | Control UI: Input text. Danh sách người thực tế có mặt tham gia phiên họp. Bắt buộc nhập khi bấm Hoàn thành thương lượng [BR-VAL-001]. |
| Kết quả thương lượng  | Enum(String(50)) | Có khi hoàn thành thương lượng | Thương lượng thành công | Control UI: Dropdown / Radio button.<br>- Gồm: Thương lượng thành công hoặc Thương lượng không thành công.<br>- Bắt buộc chọn khi bấm Hoàn thành thương lượng [BR-VAL-001]. |
| Ý kiến người yêu cầu bồi thường | Text(2000) | Có khi hoàn thành thương lượng | Trống | Control UI: Textarea. Ghi nhận ý kiến, lập luận của người yêu cầu bồi thường tại phiên họp thương lượng. |
| Ý kiến người giải quyết bồi thường | Text(2000) | Có khi hoàn thành thương lượng | Trống | Control UI: Textarea. Ghi nhận ý kiến, lập luận của người giải quyết bồi thường. |
| Ý kiến cơ quan tài chính / cơ quan liên quan | Text(2000) | Không | Trống | Control UI: Textarea. Ghi nhận ý kiến của cơ quan tài chính hoặc các đơn vị phối hợp tham gia phiên thương lượng. |
| Nội dung thỏa thuận đạt được / không đạt được | Text(2000) | Có khi hoàn thành thương lượng | Trống | Control UI: Textarea. Mô tả tóm tắt nội dung thỏa thuận đạt được giữa các bên hoặc lý do không đạt được thỏa thuận bồi thường. Áp dụng [BR-VAL-001]. |
| *Khối Bảng đối soát & xác định các khoản bồi thường thương lượng* | List(Object) | - | Theo hồ sơ | Control UI: Data grid.<br>- Chỉ hiển thị khi Kết quả thương lượng là Thương lượng thành công.<br>- Bảng tổng hợp các khoản thiệt hại do hai bên thương lượng thống nhất. |
| STT | Integer(10) | - | Tự tăng | Căn giữa. |
| Mục thiệt hại yêu cầu | String(255) | - | Theo hồ sơ | Chỉ đọc. Danh mục các khoản thiệt hại yêu cầu. |
| Mức bồi thường theo đề xuất xác minh (đồng) | Decimal(18,0) | - | Theo xác minh | Chỉ đọc. Mức tiền bồi thường đã đề xuất ở bước xác minh thiệt hại. |
| Mức bồi thường qua thương lượng (đồng) | Decimal(18,0) | Có theo điều kiện | Trống | Control UI: Ô nhập số tiền.<br>- Nhập số tiền bồi thường hai bên đã thống nhất qua thương lượng.<br>- Bắt buộc nhập khi chọn Thương lượng thành công [BR-VAL-001], áp dụng quy tắc số dương [BR-VAL-010]. |
| Ghi chú thương lượng | String(500) | Không | Trống | Control UI: Ô nhập text ngắn ghi chú thêm về khoản thiệt hại. |
| Tổng số tiền bồi thường thống nhất (đồng) | Decimal(18,0) | - | Tự động tính | Chỉ đọc. Tự động tính tổng các mức bồi thường qua thương lượng của các mục thiệt hại. |
| Tài liệu biên bản thương lượng đính kèm | File/List(File) | Có khi hoàn thành thương lượng | Trống | Control UI: Upload file.<br>- Cho phép đính kèm Biên bản thương lượng thành (Mẫu 09/BTNN) hoặc Biên bản thương lượng không thành (Mẫu 10/BTNN) và các tài liệu liên quan.<br>- Sau khi tải lên hiển thị tên file kèm link Xem file và nút Xóa. Áp dụng [BR-FILE-010]. |
| **5. Khối Quyết định giải quyết bồi thường** | String(255) | - | Theo trạng thái | Control UI: Khối nghiệp vụ có thể mở rộng/thu gọn.<br>- *Quy tắc hiển thị*: Mặc định thu gọn.<br>- Tự động mở rộng ở chế độ chỉnh sửa khi hồ sơ ở trạng thái Chờ ban hành QĐ hoặc khi người dùng thực hiện soạn thảo dự thảo Quyết định.<br>- Khi đã ban hành (từ Chờ thực thi trở đi) hiển thị Thu gọn và Chỉ đọc kèm [✓ Đã hoàn thành].<br>- Trước bước ban hành QĐ hiển thị Thu gọn và Khóa mờ [🔒 Chưa thực hiện]. |
| Hình thức ban hành | Enum(String(50)) | Có khi lập QĐ | Ký số trên hệ thống | Control UI: Radio button.<br>- Gồm Ký số trên hệ thống hoặc Ký bên ngoài.<br>- Nếu chọn Ký số trên hệ thống: Hiển thị ô chọn Lãnh đạo ký ban hành và kích hoạt nút Trình ký QĐ.<br>- Nếu chọn Ký bên ngoài: Ẩn chọn Lãnh đạo ký, hiển thị các trường nhập số/ngày QĐ và tải file QĐ đã ký ngoài. |
| Đơn vị ban hành | Enum(String(255)) | Có khi lập QĐ | Theo cơ quan giải quyết | Control UI: Combobox chọn đơn vị có thẩm quyền ban hành quyết định. |
| Sổ văn bản áp dụng | Enum(String(255)) | Có khi lập QĐ | Tự động theo đơn vị ban hành | Control UI: Combobox chọn sổ văn bản tương ứng. |
| Lãnh đạo ký ban hành | Enum(String(255)) | Có khi ký số | Trống | Control UI: Dropdown chọn Lãnh đạo phê duyệt/ký số thuộc đơn vị ban hành. |
| Số quyết định | String(50) | Có khi ký ngoài | Tự động cấp / Trống | Control UI: Input text. Tự động cấp số từ sổ khi ký số thành công; hoặc cán bộ tự nhập số khi chọn ký bên ngoài. |
| Ngày quyết định / Ngày ban hành | Date | Có khi lập QĐ | Ngày hiện tại | Control UI: Datepicker (định dạng dd/mm/yyyy). Ngày ban hành quyết định giải quyết bồi thường. |
| Trích yếu nội dung quyết định | String(500) | Có khi lập QĐ | Trống | Control UI: Textarea / Input text. Tóm tắt nội dung quyết định giải quyết bồi thường. |
| Tổng số tiền bồi thường theo quyết định (đồng) | Decimal(18,0) | - | Theo thương lượng | Chỉ đọc. Tự động lấy tổng số tiền bồi thường đã thương lượng thành công (hoặc theo mức bản án). |
| Ngày có hiệu lực thi hành | Date | Có khi lập QĐ | Trống | Control UI: Datepicker (định dạng dd/mm/yyyy). Ngày quyết định có hiệu lực pháp luật. Áp dụng [BR-VAL-001]. |
| Tài liệu Quyết định giải quyết bồi thường | File/List(File) | Có khi ban hành | Trống | Control UI: Upload file.<br>- Đính kèm file dự thảo quyết định hoặc file quyết định đã ký đóng dấu (bắt buộc khi ký bên ngoài).<br>- Hỗ trợ đính kèm nhiều file căn cứ; sau khi tải lên hiển thị tên file kèm liên kết Xem file và nút Xóa. Áp dụng [BR-FILE-010]. |
| **6. Khối Thực thi Quyết định giải quyết bồi thường** | String(255) | - | Theo trạng thái | Control UI: Khối nghiệp vụ có thể mở rộng/thu gọn.<br>- *Quy tắc hiển thị*: Mặc định thu gọn.<br>- Tự động mở rộng ở chế độ chỉnh sửa khi hồ sơ ở trạng thái Chờ thực thi.<br>- Khi đã hoàn thành thực thi (Hoàn thành) hiển thị Thu gọn và Chỉ đọc kèm [✓ Đã hoàn thành].<br>- Trước bước thực thi hiển thị Thu gọn và Khóa mờ [🔒 Chưa thực hiện]. |
| Ngày thực hiện chi trả | Date | Có khi hoàn thành thực thi | Trống | Control UI: Datepicker (định dạng dd/mm/yyyy). Ngày cơ quan hoàn tất chi trả tiền bồi thường cho người bị thiệt hại. Áp dụng [BR-VAL-001] và [BR-VAL-008]. |
| Hình thức chi trả | Enum(String(50)) | Có khi hoàn thành thực thi | Chuyển khoản | Control UI: Radio button / Combobox.<br>- Gồm Chuyển khoản hoặc Tiền mặt. |
| Số tiền thực tế đã chi trả (đồng) | Decimal(18,0) | Có khi hoàn thành thực thi | Theo quyết định | Control UI: Ô nhập số tiền. Mặc định bằng số tiền theo Quyết định bồi thường trừ số tiền đã tạm ứng. Áp dụng [BR-VAL-010]. |
| Chứng từ / Biên nhận chi trả đính kèm | File/List(File) | Có khi hoàn thành thực thi | Trống | Control UI: Upload file.<br>- Đính kèm Ủy nhiệm chi, Giấy nộp tiền hoặc Phiếu chi/Biên nhận giao nhận tiền mặt.<br>- Sau khi tải lên hiển thị tên file kèm link Xem file và nút Xóa. Áp dụng [BR-FILE-010]. |
| Ghi chú thực thi | Text(2000) | Không | Trống | Control UI: Textarea. Ghi nhận tình hình thực thi chi trả hoặc các nội dung phát sinh khác. |
| **7. Khối thông tin Hoãn / Tạm đình chỉ / Đình chỉ giải quyết** | String(255) | - | Theo trạng thái | Control UI: Khối nghiệp vụ có thể mở rộng/thu gọn.<br>- *Điều kiện hiển thị*: Chỉ hiển thị khi hồ sơ phát sinh quyết định Hoãn giải quyết, Tạm đình chỉ giải quyết hoặc Đình chỉ giải quyết (thuộc nhóm trạng thái từ Đang xác minh thiệt hại trở đi).<br>- *Quy tắc hiển thị*: Tự động mở rộng ở chế độ chỉnh sửa khi người dùng bấm thao tác Hoãn giải quyết hoặc Tạm đình chỉ / Đình chỉ từ MH04; hiển thị Thu gọn và Chỉ đọc kèm [✓ Đã hoàn thành] khi đã ban hành quyết định tương ứng. |
| Loại quyết định áp dụng | Enum(String(100)) | Có khi áp dụng | Quyết định hoãn giải quyết bồi thường | Control UI: Combobox / Radio button.<br>- Giá trị gồm: Quyết định hoãn giải quyết bồi thường, Quyết định tạm đình chỉ giải quyết bồi thường, Quyết định đình chỉ giải quyết bồi thường. |
| Hình thức ban hành | Enum(String(50)) | Có khi áp dụng | Ký số trên hệ thống | Control UI: Radio button.<br>- Gồm: Ký số trên hệ thống hoặc Ký bên ngoài. |
| Đơn vị ban hành | Enum(String(255)) | Có khi áp dụng | Theo cơ quan giải quyết | Control UI: Combobox chọn đơn vị ban hành quyết định hoãn/tạm đình chỉ/đình chỉ. |
| Sổ văn bản áp dụng | Enum(String(255)) | Có khi áp dụng | Tự động theo đơn vị ban hành | Control UI: Combobox chọn sổ văn bản tương ứng. |
| Số quyết định | String(50) | Có khi áp dụng | Tự động cấp / Trống | Control UI: Input text. Tự động cấp số từ sổ khi ký số; hoặc cán bộ tự nhập số khi chọn ký ngoài. |
| Ngày ban hành quyết định | Date | Có khi áp dụng | Ngày hiện tại | Control UI: Datepicker (định dạng dd/mm/yyyy). Ngày ban hành quyết định hoãn/tạm đình chỉ/đình chỉ. |
| Ngày bắt đầu áp dụng | Date | Có khi áp dụng | Trống | Control UI: Datepicker (định dạng dd/mm/yyyy). Thời điểm bắt đầu có hiệu lực tạm dừng/hoãn/đình chỉ. Áp dụng [BR-VAL-001]. |
| Ngày dự kiến kết thúc / Hạn hoãn | Date | Không | Trống | Control UI: Datepicker (định dạng dd/mm/yyyy). Áp dụng khi hoãn hoặc tạm đình chỉ có thời hạn xác định. |
| Căn cứ pháp lý và Lý do áp dụng | Text(2000) | Có khi áp dụng | Trống | Control UI: Textarea. Ghi nhận căn cứ pháp luật và lý do chi tiết thực hiện hoãn, tạm đình chỉ hoặc đình chỉ giải quyết vụ việc. Áp dụng [BR-VAL-001]. |
| Tài liệu quyết định đính kèm | File/List(File) | Có khi áp dụng | Trống | Control UI: Upload file.<br>- Với ký bên ngoài, bắt buộc đính kèm file quyết định đã ký; cho phép đính kèm thêm nhiều file căn cứ. Sau khi chọn file, UI hiển thị tên file, dung lượng, link Xem file và link Xóa. Áp dụng [BR-FILE-010]. |
| Popup Tiếp tục giải quyết | String(255) | - | Ẩn | Hiển thị khi người dùng bấm Tiếp tục giải quyết đối với vụ việc đang Hoãn giải quyết hoặc Tạm đình chỉ giải quyết. |
| Số quyết định tiếp tục giải quyết | String(50) | Có khi tiếp tục giải quyết | Trống | Số quyết định/văn bản cho phép tiếp tục giải quyết vụ việc; áp dụng cùng nguyên tắc Đơn vị ban hành + Sổ văn bản áp dụng + Hình thức ban hành như quyết định hoãn/tạm đình chỉ/đình chỉ. |
| Ngày quyết định tiếp tục giải quyết | Date | Có khi tiếp tục giải quyết | Trống | Định dạng dd/mm/yyyy. Áp dụng [BR-VAL-001]. |
| Lý do/Nội dung tiếp tục giải quyết | Text(2000) | Có khi tiếp tục giải quyết | Trống | Ghi nhận căn cứ hoặc nội dung cho phép tiếp tục giải quyết. |
| Tài liệu tiếp tục giải quyết | File/List(File) | Không | Trống | Cho phép đính kèm nhiều file, hỗ trợ Xem file và Xóa. |
| **Tab Phục hồi danh dự** | String(100) | - | Ẩn/Hiện | Khối quản lý quy trình tổ chức phục hồi danh dự cho người bị thiệt hại, cho phép nhập/cập nhật.<br>- Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ có yêu cầu phục hồi danh dự và thuộc nhóm trạng thái từ "Đang xác minh thiệt hại" trở đi.<br>- Phạm vi khối: Bao gồm "Thẻ thông tin phục hồi danh dự" và Stepper 04 bước phục hồi danh dự (chi tiết đặc tả tại [MH05 - Tab Phục hồi danh dự](#43317-mh05---tab-phục-hồi-danh-dự)). |
| Timeline xử lý | List(Object) | - | Theo hồ sơ | Hiển thị theo thứ tự thời gian toàn bộ lịch xử lý của vụ việc; mỗi dòng lịch sử gồm các trường mô tả bên dưới. |
| Thời điểm thao tác | Datetime | - | Theo dữ liệu | Chỉ đọc. Định dạng dd/mm/yyyy HH:mm. |
| Người thực hiện | String(255) | - | Theo dữ liệu | Chỉ đọc. Họ tên người thực hiện thao tác. |
| Vai trò | String(100) | - | Theo dữ liệu | Chỉ đọc. Vai trò của người thực hiện (Cán bộ/Chuyên viên/Thủ trưởng). |
| Hành động | String(255) | - | Theo dữ liệu | Chỉ đọc. Tên thao tác nghiệp vụ đã thực hiện, ví dụ Tiếp nhận yêu cầu, Nhập liệu hồ sơ, Kiểm tra hồ sơ, Yêu cầu bổ sung, Từ chối, Thụ lý, Từ chối thụ lý, Hoàn thành xác minh, Hoàn thành thương lượng, Hoãn/Tạm đình chỉ/Đình chỉ giải quyết, Tiếp tục giải quyết, Trình ký QĐ, Duyệt ký số QĐ, Hoàn thành thực thi, cập nhật phục hồi danh dự. |
| Trạng thái trước | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Trạng thái vụ việc trước khi thực hiện thao tác, Tham chiếu Danh mục Trạng thái vụ việc yêu cầu bồi thường [DM_24]. |
| Trạng thái sau | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Trạng thái vụ việc sau khi thực hiện thao tác, Tham chiếu Danh mục Trạng thái vụ việc yêu cầu bồi thường [DM_24]. |
| Nội dung/Lý do | Text(2000) | - | Theo dữ liệu | Chỉ đọc. Nội dung giải trình, lý do từ chối/yêu cầu bổ sung, hoặc căn cứ/lý do hoãn/tạm đình chỉ/đình chỉ nếu thao tác có nhập. |
| Thanh thao tác cuối màn hình | String(255) | - | Theo phân quyền/trạng thái | Control UI: Fixed action bar.<br>- Render động theo trạng thái hồ sơ, quyền người dùng và cán bộ được giao.<br>- Thanh thao tác hiển thị các nút hoàn tất giai đoạn tương ứng với khối nghiệp vụ đang mở rộng/nhập liệu (ví dụ Hoàn thành bổ sung, Hoàn thành xác minh, Lưu thông tin thương lượng/Hoàn thành thương lượng, Hoàn thành thực thi...) kèm nút Hủy.<br>- Điều kiện hiển thị chi tiết của từng nút được đặc tả tại bảng Chức năng trên màn hình. |

###### 4.3.3.1.5.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hoàn thành bổ sung | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ đang ở trạng thái Yêu cầu bổ sung (đã được điều hướng vào MH03 từ chức năng Cập nhật kết quả bổ sung trên MH04, khối Bổ sung hồ sơ đã tự động mở rộng ở chế độ chỉnh sửa).<br>- Khi click: Hệ thống kiểm tra điều kiện dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc Nhập thông tin đã bổ sung**: Vi phạm [BR-VAL-001], hệ thống highlight viền đỏ ô nhập lỗi, hiển thị cảnh báo [MSG-ERR-VAL-001] và không cho lưu. |
|  |  |  | **TH2 - Hợp lệ**: Hệ thống lưu nội dung thông tin và tài liệu bổ sung, chuyển trạng thái hồ sơ sang Chờ kiểm tra, cập nhật timeline xử lý và hiển thị thông báo thành công [MSG-SUC-SYS-002]. |
| 2 | Hoàn thành xác minh | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ đang ở trạng thái Đang xác minh thiệt hại (đã được điều hướng vào MH03 từ chức năng Cập nhật xác minh trên MH04, khối Xác minh thiệt hại đã tự động mở rộng ở chế độ chỉnh sửa).<br>- Khi click: Hệ thống kiểm tra dữ liệu và lưu kết quả xác minh thiệt hại, chuyển hồ sơ sang trạng thái Đang thương lượng, cập nhật timeline và hiển thị [MSG-SUC-SYS-002]. |
| 3 | Lưu thông tin thương lượng | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ đang ở trạng thái Đang thương lượng (đã được điều hướng vào MH03 từ chức năng Cập nhật kết quả thương lượng trên MH04, khối Thương lượng bồi thường đã tự động mở rộng ở chế độ chỉnh sửa).<br>- Khi click: Hệ thống lưu tạm thông tin dự kiến/kết quả phiên thương lượng đang nhập và giữ nguyên trạng thái hồ sơ, hiển thị [MSG-SUC-SYS-001]. |
| 4 | Hoàn thành thương lượng | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ đang ở trạng thái Đang thương lượng.<br>- Khi click: Kiểm tra các trường bắt buộc; nếu kết quả là Thương lượng thành công chuyển hồ sơ sang Chờ ban hành QĐ, nếu Thương lượng không thành công chuyển sang trạng thái Thương lượng không thành công, cập nhật timeline và hiển thị [MSG-SUC-SYS-002]. |
| 5 | Tạo mới Quyết định | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái Chờ ban hành QĐ và chưa có quyết định dự thảo.<br>- Khi click: Hệ thống mở rộng khối Quyết định giải quyết bồi thường ở chế độ nhập liệu và hiển thị các nút Xem trước QĐ, Lưu nháp QĐ, Trình ký QĐ. |
| 6 | Xem trước QĐ | Button | - Điều kiện hiển thị: Chỉ hiển thị khi đang soạn thảo quyết định bồi thường.<br>- Khi click: Mở bản xem trước nội dung quyết định. |
| 7 | Lưu nháp QĐ | Button | - Điều kiện hiển thị: Chỉ hiển thị khi đang soạn thảo quyết định bồi thường.<br>- Khi click: Lưu dự thảo quyết định với trạng thái Lưu nháp và giữ nguyên trạng thái hồ sơ. |
| 8 | Trình ký QĐ | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái Chờ ban hành QĐ và hình thức ban hành là Ký số trên hệ thống.<br>- Khi click: Chuyển quyết định sang trạng thái Chờ ký và chuyển đến đúng Lãnh đạo ký ban hành đã chọn. |
| 9 | Duyệt ký số QĐ | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái Chờ ban hành QĐ và Quyết định đang ở trạng thái Chờ ký.<br>- Khi click: Ký số duyệt quyết định, hệ thống cấp số/ngày ban hành theo sổ, chuyển quyết định sang Đã ban hành, chuyển hồ sơ sang Chờ thực thi và cập nhật timeline. |
| 10 | Hoàn thành thực thi | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ đang ở trạng thái Chờ thực thi (đã được điều hướng vào MH03 từ chức năng Cập nhật kết quả thực thi trên MH04, khối Thực thi giải quyết bồi thường đã tự động mở rộng ở chế độ chỉnh sửa).<br>- Khi click: Kiểm tra ngày chi trả và chứng từ chi trả; nếu hồ sơ có phục hồi danh dự thì kiểm tra đã hoàn tất phục hồi danh dự; nếu hợp lệ chuyển hồ sơ sang trạng thái Hoàn thành và cập nhật timeline, hiển thị [MSG-SUC-SYS-002]. |
| 11 | Lưu quyết định Hoãn / Tạm đình chỉ / Đình chỉ | Button | - Điều kiện hiển thị: Chỉ hiển thị khi khối Hoãn / Tạm đình chỉ / Đình chỉ giải quyết đang mở ở chế độ nhập liệu (đã được điều hướng vào MH03 từ chức năng Hoãn / Tạm đình chỉ / Đình chỉ giải quyết trên MH04) và hồ sơ ở một trong các trạng thái Đang xác minh thiệt hại, Đang thương lượng, Thương lượng không thành công, Chờ ban hành QĐ.<br>- Khi click: Hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc (Đơn vị ban hành, Số quyết định/ký số, Ngày bắt đầu áp dụng, Căn cứ/Lý do, hoặc tài liệu đính kèm khi ký bên ngoài)**: Vi phạm [BR-VAL-001], hệ thống tô viền đỏ ô trống đầu tiên và hiển thị cảnh báo lỗi [MSG-ERR-VAL-001]. Không cho phép lưu. |
|  |  |  | **TH2 - Hợp lệ**: Hệ thống lưu thông tin quyết định hoãn/tạm đình chỉ/đình chỉ, chuyển hồ sơ sang trạng thái tương ứng (Hoãn giải quyết, Tạm đình chỉ giải quyết hoặc Đình chỉ giải quyết), cập nhật timeline và hiển thị [MSG-SUC-SYS-002]. |
| 12 | Xác nhận tiếp tục giải quyết | Button | - Điều kiện hiển thị: Chỉ hiển thị khi khối Popup Tiếp tục giải quyết đang mở ở chế độ nhập liệu (đã được điều hướng vào MH03 từ chức năng Tiếp tục giải quyết trên MH04) và hồ sơ ở trạng thái Hoãn giải quyết hoặc Tạm đình chỉ giải quyết.<br>- Khi click: Hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001]. Không cho phép xác nhận. |
|  |  |  | **TH2 - Hợp lệ**: Hệ thống lưu số/ngày quyết định và lý do tiếp tục giải quyết, khôi phục hồ sơ về đúng Bước xử lý trước khi áp dụng đã ghi nhận, cập nhật timeline và hiển thị [MSG-SUC-SYS-002]. |
| 13 | Xem file | Link | - Điều kiện hiển thị: Hiển thị ngay sau tên file đính kèm.<br>- Cho phép xem file tại tab riêng. |
| 14 | Hủy | Button | - Điều kiện hiển thị: Luôn hiển thị.<br>- Khi click: Hệ thống hủy thay đổi chưa lưu của khối đang chỉnh sửa và đóng màn hình cập nhật, quay lại danh sách tra cứu. |

---
##### 4.3.3.1.6. MH04 - Màn hình Xem chi tiết hồ sơ yêu cầu bồi thường

###### 4.3.3.1.6.1. Màn hình

![Xem chi tiết hồ sơ yêu cầu bồi thường](images/UC431_466_MH03_Xem_chi_tiet_xu_ly_ho_so_boi_thuong.png)

**\* Quy chế hoạt động của Màn hình MH04:**

- Áp dụng khi người dùng mở xem từ danh sách tra cứu (click dòng dữ liệu) hoặc mở từ liên kết hồ sơ của màn hình khác.
- Cấu trúc Tab và toàn bộ các khối thông tin **y hệt** [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường) mục 4.3.3.1.5.2 (03 tab: `Thông tin Hồ sơ yêu cầu`, `Chi tiết xử lý hồ sơ`, `Phục hồi danh dự`; cùng điều kiện hiển thị từng tab/từng khối nghiệp vụ), khác biệt duy nhất là **toàn bộ trường dữ liệu và khối nghiệp vụ đều hiển thị ở chế độ Chỉ đọc** (không có control nhập liệu/nút mở rộng chỉnh sửa nào được kích hoạt trực tiếp trên màn hình này).
- **Quy tắc Auto-focus/Scroll**: Khi mở màn hình, hệ thống tự động cuộn/focus tới đúng khối nghiệp vụ tương ứng với trạng thái hiện tại của hồ sơ (khối đang xử lý hiển thị mở rộng chỉ đọc; các khối trước đó thu gọn kèm `[✓ Đã hoàn thành]`; các khối sau bị khóa mờ kèm `[🔒 Chưa thực hiện]`).
- Muốn chỉnh sửa/nhập liệu, người dùng sử dụng các nút thao tác ở thanh cuối màn hình để điều hướng sang [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường).

###### 4.3.3.1.6.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề màn hình | String(255) | - | `CHI TIẾT HỒ SƠ` | Chỉ đọc. |
| Badge trạng thái | Enum(String(50)) | - | Theo hồ sơ | Hiển thị trạng thái hồ sơ theo Danh mục Trạng thái vụ việc yêu cầu bồi thường [DM_24]. |
| Tab nghiệp vụ | Enum(String(50)) | - | `Thông tin Hồ sơ yêu cầu` | Control UI: Tab navigation (Chỉ đọc), kế thừa đúng 03 tab và điều kiện hiển thị đã đặc tả tại mục 4.3.3.1.5.2 (MH03). |
| **Tab Thông tin Hồ sơ yêu cầu** | String(100) | - | Active | Kế thừa nguyên trạng toàn bộ trường thông tin từ "Mã vụ việc" đến "Bảng tài liệu đính kèm hồ sơ" đã đặc tả tại mục 4.3.3.1.5.2 (MH03), hiển thị Chỉ đọc. |
| **Tab Chi tiết xử lý hồ sơ** | Text(2000) | - | Theo trạng thái | Kế thừa nguyên trạng toàn bộ các khối nghiệp vụ từ "***Khối thông tin Thụ lý hồ sơ***" đến "***Khối thông tin Hoãn / Tạm đình chỉ / Đình chỉ giải quyết***" đã đặc tả tại mục 4.3.3.1.5.2 (MH03), hiển thị Chỉ đọc; không có ô nhập liệu, datepicker, combobox hay nút tải file nào được kích hoạt. |
| **Tab Phục hồi danh dự** | String(100) | - | Ẩn/Hiện | Kế thừa nguyên trạng "Thẻ thông tin phục hồi danh dự" và Stepper 04 bước đã đặc tả tại [MH05 - Tab Phục hồi danh dự](#43317-mh05---tab-phục-hồi-danh-dự), hiển thị Chỉ đọc. |
| Timeline xử lý | List(Object) | - | Theo hồ sơ | Hiển thị theo thứ tự thời gian toàn bộ lịch sử xử lý của vụ việc; mỗi dòng lịch sử gồm các trường mô tả bên dưới. |
| Thời điểm thao tác | Datetime | - | Theo dữ liệu | Chỉ đọc. Định dạng `dd/mm/yyyy HH:mm`. |
| Người thực hiện | String(255) | - | Theo dữ liệu | Chỉ đọc. Họ tên người thực hiện thao tác. |
| Vai trò | String(100) | - | Theo dữ liệu | Chỉ đọc. Vai trò của người thực hiện (Cán bộ/Chuyên viên/Thủ trưởng). |
| Hành động | String(255) | - | Theo dữ liệu | Chỉ đọc. Tên thao tác nghiệp vụ đã thực hiện, ví dụ `Tiếp nhận yêu cầu`, `Nhập liệu hồ sơ`, `Kiểm tra hồ sơ`, `Yêu cầu bổ sung`, `Từ chối`, `Thụ lý`, `Từ chối thụ lý`, `Hoàn thành xác minh`, `Hoàn thành thương lượng`, `Hoãn/Tạm đình chỉ/Đình chỉ giải quyết`, `Tiếp tục giải quyết`, `Trình ký QĐ`, `Duyệt ký số QĐ`, `Hoàn thành thực thi`, cập nhật phục hồi danh dự. |
| Trạng thái trước | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Trạng thái vụ việc trước khi thực hiện thao tác, Tham chiếu Danh mục Trạng thái vụ việc yêu cầu bồi thường [DM_24]. |
| Trạng thái sau | Enum(String(50)) | - | Theo dữ liệu | Chỉ đọc. Trạng thái vụ việc sau khi thực hiện thao tác, Tham chiếu Danh mục Trạng thái vụ việc yêu cầu bồi thường [DM_24]. |
| Nội dung/Lý do | Text(2000) | - | Theo dữ liệu | Chỉ đọc. Nội dung giải trình, lý do từ chối/yêu cầu bổ sung, hoặc căn cứ/lý do hoãn/tạm đình chỉ/đình chỉ nếu thao tác có nhập. |
| Thanh thao tác cuối màn hình | String(255) | - | Theo phân quyền/trạng thái | Control UI: Fixed action bar.<br>- Render động theo trạng thái hồ sơ, quyền người dùng và cán bộ được giao.<br>- Chỉ hiển thị nút `Đóng` và các nút kích hoạt nghiệp vụ/điều hướng sang MH03 tương ứng với trạng thái hồ sơ hiện tại.<br>- Điều kiện hiển thị chi tiết của từng nút được đặc tả tại bảng Chức năng trên màn hình. |

###### 4.3.3.1.6.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tiếp nhận | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ kiểm tra`.<br>- Khi click: Hệ thống xác nhận hồ sơ hợp lệ, chuyển trạng thái sang `Chờ thụ lý` và cập nhật timeline. |
| 2 | Yêu cầu bổ sung | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ tiếp nhận` hoặc `Chờ kiểm tra`.<br>- Khi click: Hệ thống mở [Popup Yêu cầu bổ sung / Từ chối hồ sơ](#43318-popup-yêu-cầu-bổ-sung--từ-chối-hồ-sơ) ở ngữ cảnh yêu cầu bổ sung. |
| 3 | Từ chối | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ tiếp nhận` hoặc `Chờ kiểm tra`.<br>- Khi click: Hệ thống mở [Popup Yêu cầu bổ sung / Từ chối hồ sơ](#43318-popup-yêu-cầu-bổ-sung--từ-chối-hồ-sơ) để nhập lý do từ chối. |
| 4 | Thụ lý | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thụ lý`.<br>- Khi click: Hệ thống mở [Popup Thụ lý hồ sơ và Cử người giải quyết bồi thường](#433112-popup-thụ-lý-hồ-sơ-và-cử-người-giải-quyết-bồi-thường). Sau khi xác nhận thụ lý hợp lệ, hồ sơ chuyển sang trạng thái `Đang xác minh thiệt hại`. |
| 5 | Từ chối thụ lý | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thụ lý`.<br>- Khi click: Hệ thống mở [Popup Yêu cầu bổ sung / Từ chối hồ sơ](#43318-popup-yêu-cầu-bổ-sung--từ-chối-hồ-sơ) để nhập lý do từ chối thụ lý. |
| 6 | Cập nhật kết quả bổ sung | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Yêu cầu bổ sung`.<br>- Khi click: Hệ thống điều hướng mở [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường), tự động chuyển sang tab `Chi tiết xử lý hồ sơ`, mở rộng khối `Bổ sung hồ sơ` ở chế độ chỉnh sửa (ô nhập liệu `Nhập thông tin đã bổ sung` và đính kèm file) và cuộn focus tới khối này. |
| 7 | Cập nhật xác minh | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Đang xác minh thiệt hại`.<br>- Khi click: Hệ thống điều hướng mở [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường), tự động chuyển sang tab `Chi tiết xử lý hồ sơ`, mở rộng khối `Xác minh thiệt hại` ở chế độ chỉnh sửa và cuộn focus tới khối này. |
| 8 | Cập nhật kết quả thương lượng | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Đang thương lượng` hoặc `Thương lượng không thành công`.<br>- Khi click: Hệ thống điều hướng mở [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường), tự động chuyển sang tab `Chi tiết xử lý hồ sơ`, mở rộng khối `Thương lượng bồi thường` ở chế độ chỉnh sửa và cuộn focus tới khối này. |
| 9 | Cập nhật kết quả thực thi | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Chờ thực thi`.<br>- Khi click: Hệ thống điều hướng mở [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường), tự động chuyển sang tab `Chi tiết xử lý hồ sơ`, mở rộng khối `Thực thi giải quyết bồi thường` ở chế độ chỉnh sửa và cuộn focus tới khối này. |
| 10 | Hoãn / Tạm đình chỉ / Đình chỉ giải quyết | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở một trong các trạng thái `Đang xác minh thiệt hại`, `Đang thương lượng`, `Thương lượng không thành công`, `Chờ ban hành QĐ`.<br>- Khi click: Hệ thống điều hướng mở [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường), tự động chuyển sang tab `Chi tiết xử lý hồ sơ`, mở khối `Hoãn / Tạm đình chỉ / Đình chỉ giải quyết` ở chế độ nhập liệu để nhập căn cứ và quyết định hoãn/tạm đình chỉ/đình chỉ. |
| 11 | Tiếp tục giải quyết | Button | - Điều kiện hiển thị: Chỉ hiển thị khi hồ sơ ở trạng thái `Hoãn giải quyết` hoặc `Tạm đình chỉ giải quyết`.<br>- Khi click: Hệ thống điều hướng mở [MH03 - Màn hình Cập nhật kết quả xử lý hồ sơ yêu cầu bồi thường](#43315-mh03---màn-hình-cập-nhật-kết-quả-xử-lý-hồ-sơ-yêu-cầu-bồi-thường), mở khối `Popup Tiếp tục giải quyết` ở chế độ nhập liệu để nhập số/ngày quyết định cho phép tiếp tục giải quyết. |
| 12 | Xem file | Link | - Điều kiện hiển thị: Hiển thị ngay sau tên file đính kèm.<br>- Cho phép xem file tại tab riêng. |
| 13 | Đóng | Button | - Điều kiện hiển thị: Luôn hiển thị.<br>- Khi click: Hệ thống đóng màn hình chi tiết và quay về danh sách hồ sơ. |

---

##### 4.3.3.1.7. MH05 - Tab Phục hồi danh dự

###### 4.3.3.1.7.1. Màn hình

![Phục hồi danh dự](images/UC431_466_MH04_Phuc_hoi_danh_du.png)

###### 4.3.3.1.7.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Thẻ thông tin phục hồi danh dự | String(255) | - | Theo hồ sơ | Hiển thị căn cứ pháp lý, cơ quan giải quyết, ngày lập văn bản, hình thức phục hồi danh dự, trạng thái phục hồi danh dự, SLA và ngày bắt đầu. |
| Stepper phục hồi danh dự | String(255) | - | Theo hồ sơ | Gồm 04 bước: thông báo tổ chức phục hồi danh dự, ý kiến người bị thiệt hại, quyết định tổ chức phục hồi danh dự, kết quả thực hiện phục hồi danh dự. |
| **Bước 1 - Thông báo tổ chức phục hồi danh dự** | String(255) | - | Theo dữ liệu | Nhập thông báo tổ chức phục hồi danh dự. |
| Số thông báo | String(50) | Có | Trống | Áp dụng [BR-VAL-001]. |
| Ngày ban hành | Date | Có | Trống | Áp dụng [BR-VAL-001]. |
| Ngày gửi thông báo | Date | Có | Trống | Áp dụng [BR-VAL-001]. |
| Người ký | String(100) | Có | Trống | Áp dụng [BR-VAL-001]. |
| Chức vụ | String(100) | Có | Trống | Áp dụng [BR-VAL-001]. |
| Cơ quan tổ chức dự kiến | String(255) | Không | Trống | Hiển thị theo hình thức phục hồi danh dự. |
| Ngày tổ chức dự kiến | Date | Không | Trống | Hiển thị theo hình thức phục hồi danh dự. |
| Địa điểm tổ chức dự kiến | String(255) | Không | Trống | Hiển thị theo hình thức phục hồi danh dự. |
| Thành phần tham gia dự kiến | Boolean | Không | Theo UI | Gồm:<br>+ `Đại diện cơ quan tiến hành tố tụng/cơ quan quản lý`<br>+ `Đại diện cơ quan giải quyết bồi thường`<br>+ `Cá nhân khác có liên quan` |
| Thông tin cá nhân khác tham gia dự kiến | Text(1000) | Có theo điều kiện | Trống | Hiển thị khi tick `Cá nhân khác có liên quan`. |
| Cấp cơ quan quản lý báo chí dự kiến | Enum(String(100)) | Không | `Trung ương` | Giá trị gồm:<br>+ `Trung ương`<br>+ `Địa phương` |
| Tên tờ báo Trung ương dự kiến | String(255) | Theo điều kiện | Trống | Hiển thị theo cấp cơ quan quản lý báo chí. |
| Tên báo Địa phương nơi cư trú/đặt trụ sở dự kiến | String(255) | Theo điều kiện | Trống | Hiển thị theo cấp cơ quan quản lý báo chí. |
| Số số báo phát hành liên tiếp dự kiến | Integer(3) | Không | Trống | Ghi số kỳ báo dự kiến. |
| Đăng tải trên Cổng thông tin điện tử | Boolean | Không | Checked | Hình thức công bố trên cổng thông tin. |
| Thông tin niêm yết tại UBND cấp xã | Boolean | Không | Chưa chọn | Nếu tick, nhập thông tin UBND cấp xã. |
| Nơi nhận | Boolean | Có | Theo UI | Gồm người bị thiệt hại, UBND cấp xã, cơ quan liên quan, nơi nhận khác. |
| Tên UBND cấp xã | String(255) | Có theo điều kiện | Trống | Hiển thị khi chọn nơi nhận UBND cấp xã. |
| Địa chỉ UBND cấp xã | String(500) | Có theo điều kiện | Trống | Hiển thị khi chọn nơi nhận UBND cấp xã. |
| Nhập Tên cơ quan liên quan | String(255) | Có theo điều kiện | Trống | Hiển thị khi chọn cơ quan liên quan. |
| Nhập thông tin Nơi nhận khác | String(500) | Có theo điều kiện | Trống | Hiển thị khi chọn nơi nhận khác. |
| Tài liệu đính kèm thông báo | File | Có | Trống | Áp dụng [BR-FILE-010]. |
| **Bước 2 - Ý kiến người bị thiệt hại** | String(100) | - | Theo dữ liệu | Ghi nhận ý kiến của người bị thiệt hại hoặc người đại diện. |
| Ngày nhận văn bản đồng ý/yêu cầu của người bị thiệt hại | Date | Không | Trống | Hiển thị trên UI. |
| Ý kiến của người bị thiệt hại | Enum(String(50)) | Có | `Đồng ý thực hiện` | Giá trị gồm:<br>+ `Đồng ý thực hiện`<br>+ `Không đồng ý`<br>+ `Đề nghị tạm hoãn`<br>+ `Từ chối` |
| Nội dung đề xuất điều chỉnh | Text(2000) | Có theo điều kiện | Trống | Hiển thị khi ý kiến có đề xuất điều chỉnh. |
| Lý do đề nghị tạm hoãn | Text(2000) | Có theo điều kiện | Trống | Hiển thị khi chọn `Đề nghị tạm hoãn`. |
| Văn bản / Biên bản từ chối đính kèm | File | Có theo điều kiện | Trống | Hiển thị khi chọn `Từ chối`. |
| **Bước 3 - Quyết định/Tổ chức phục hồi danh dự** | String(255) | - | Theo dữ liệu | Ghi nhận thông tin tổ chức phục hồi danh dự. |
| Cơ quan tổ chức | String(255) | Có | Trống | Áp dụng [BR-VAL-001]. |
| Ngày tổ chức thực tế | Date | Có | Trống | Áp dụng [BR-VAL-001]. |
| Địa điểm tổ chức | String(255) | Có theo hình thức | Trống | Hiển thị với hình thức trực tiếp xin lỗi. |
| Thành phần tham gia | Boolean | Có theo hình thức | Trống | Hiển thị với hình thức trực tiếp xin lỗi. |
| Cấp cơ quan quản lý | Enum(String(100)) | Có theo hình thức | `Trung ương` | Hiển thị với hình thức đăng báo. |
| Tên tờ báo Trung ương | String(255) | Có theo điều kiện | Trống | Hiển thị khi chọn cấp Trung ương. |
| Tên báo Địa phương nơi cư trú/đặt trụ sở | String(255) | Có theo điều kiện | Trống | Hiển thị khi chọn cấp Địa phương. |
| Tên tờ báo cấp tỉnh | String(255) | Có theo điều kiện | Trống | Hiển thị theo UI. |
| Số số báo phát hành liên tiếp | Integer(3) | Có theo điều kiện | Trống | Hiển thị theo UI. |
| Thông tin các số báo phát hành | Text(2000) | Có theo điều kiện | Trống | Hiển thị theo UI. |
| Đường dẫn bài viết trên Cổng thông tin điện tử | String(500) | Không | Trống | Hiển thị khi tick đăng tải cổng thông tin. |
| Ngày gửi tờ báo niêm yết | Date | Có theo điều kiện | Trống | Hiển thị khi tick thông tin niêm yết tại UBND cấp xã. |
| Tài liệu phục hồi danh dự | File | Có theo bước | Trống | Áp dụng [BR-FILE-010]. |

###### 4.3.3.1.7.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống hủy chế độ nhập/cập nhật phục hồi danh dự và quay về màn hình chi tiết hồ sơ. |
| 2 | Lưu nháp | Button | Hệ thống lưu tạm dữ liệu của bước phục hồi danh dự đang nhập và giữ nguyên trạng thái bước. |
| 3 | Ban hành thông báo / Hoàn thành bước | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc theo bước**: Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001]. Không cho phép hoàn thành bước. |
|  |  |  | **TH2 - Thiếu file bắt buộc**: Vi phạm [BR-FILE-010], hiển thị [MSG-ERR-FILE-001] hoặc [MSG-ERR-FILE-002]. Không cho phép hoàn thành bước. |
|  |  |  | **TH3 - Hợp lệ**: Hệ thống lưu dữ liệu bước phục hồi danh dự, cập nhật stepper và hiển thị [MSG-SUC-SYS-002]. |
| 4 | Xem trước Mẫu 17 | Button | Hệ thống mở xem trước mẫu thông báo phục hồi danh dự. |
| 5 | Cập nhật | Button | Hệ thống mở lại dữ liệu bước phục hồi danh dự đã lưu ở chế độ cập nhật. |
| 6 | Xem file | Link | Cho phép xem file tại một tab riêng. |

---

##### 4.3.3.1.8. Popup Yêu cầu bổ sung / Từ chối hồ sơ

###### 4.3.3.1.8.1. Màn hình

![Popup yêu cầu bổ sung hoặc từ chối hồ sơ](images/UC431_466_POPUP_Yeu_cau_bo_sung_tu_choi.png)

###### 4.3.3.1.8.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | Theo thao tác | Chỉ đọc. Giá trị hiển thị động:<br>+ `Yêu cầu bổ sung hồ sơ`<br>+ `Yêu cầu nhập lý do từ chối`<br>+ `Yêu cầu nhập lý do từ chối thụ lý` |
| Nội dung yêu cầu bổ sung hồ sơ / Nội dung lý do từ chối | Text(2000) | Có | Trống | Label và placeholder thay đổi theo loại thao tác. Áp dụng [BR-VAL-001]. |

###### 4.3.3.1.8.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng popup và giữ nguyên dữ liệu hồ sơ. |
| 2 | Gửi yêu cầu / Xác nhận từ chối | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001], hiển thị [MSG-ERR-VAL-001]. Không cho phép xác nhận. |
|  |  |  | **TH2 - Hợp lệ - yêu cầu bổ sung**: Hệ thống lưu nội dung yêu cầu bổ sung, chuyển hồ sơ sang trạng thái "Yêu cầu bổ sung" để cán bộ nhập liệu thực hiện bổ sung hồ sơ, cập nhật timeline và hiển thị [MSG-SUC-SYS-002]. |
|  |  |  | **TH3 - Hợp lệ - từ chối**: Hệ thống lưu lý do từ chối, chuyển hồ sơ sang trạng thái "Bị từ chối", cập nhật timeline và hiển thị [MSG-SUC-SYS-002]. |
|  |  |  | **TH4 - Hợp lệ - từ chối thụ lý**: Hệ thống lưu lý do từ chối, chuyển hồ sơ sang trạng thái "Từ chối thụ lý", cập nhật timeline và hiển thị [MSG-SUC-SYS-002]. |

---

##### 4.3.3.1.9. Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan

###### 4.3.3.1.9.1. Màn hình

![Popup chuẩn tìm kiếm vụ việc/hồ sơ gốc liên quan](images/UC431_466_POPUP_Tim_kiem_vu_viec_goc.png)

Popup này là màn hình chuẩn dùng chung cho các chức năng cần tìm kiếm và liên kết vụ việc/hồ sơ gốc trong phân hệ Bồi thường nhà nước. Các module khác chỉ tham chiếu lại mục này, không mô tả lại cấu trúc popup. Tùy nghiệp vụ gọi popup, hệ thống cấu hình lại tiêu đề, nguồn dữ liệu, nhãn cột và màn chi tiết được mở từ liên kết.

###### 4.3.3.1.9.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | Theo nghiệp vụ gọi popup | Chỉ đọc. Ví dụ: `Tìm kiếm vụ việc yêu cầu bồi thường gốc`, `Tìm kiếm vụ việc/Quyết định liên quan`, `Tìm kiếm vụ việc hoàn trả liên quan`. |
| Mã vụ việc/Số quyết định | String(100) | Không | Trống hoặc tự điền từ ô tìm nhanh của màn gọi popup | Một trong các tiêu chí tìm kiếm; áp dụng tìm gần đúng (chứa chuỗi nhập). |
| Tên vụ việc/Nội dung liên quan | String(255) | Không | Trống | Một trong các tiêu chí tìm kiếm; áp dụng tìm gần đúng. |
| Người yêu cầu/Cán bộ liên quan | String(100) | Không | Trống | Một trong các tiêu chí tìm kiếm; áp dụng tìm gần đúng theo người yêu cầu bồi thường hoặc cán bộ liên quan tùy nguồn dữ liệu. |
| Số giấy tờ/Số quyết định | String(100) | Không | Trống | Một trong các tiêu chí tìm kiếm; áp dụng tìm đúng hoặc gần đúng theo cấu hình nguồn dữ liệu. |
| Số văn bản/quyết định gốc | String(100) | Không | Trống | Một trong các tiêu chí tìm kiếm; áp dụng tìm gần đúng. |
| Khối Bảng kết quả tìm kiếm | List(Object) | Không | Trống (chưa tìm kiếm) | Control UI: Data grid.<br>- Hiển thị sau khi thực hiện chức năng `Tìm kiếm`.<br>- Hover vào dòng sẽ tô nổi bật để làm rõ dòng đang được thao tác.<br>- Người dùng chọn vụ việc gốc bằng chức năng `Chọn` hoặc click trực tiếp vào dòng kết quả tương ứng. |
| Mã vụ việc/Số quyết định | String(100) | - | Theo dữ liệu | Hiển thị dạng liên kết. Bấm để mở màn hình xem chi tiết hồ sơ gốc tương ứng ở cùng tab, chế độ chỉ xem; bắt buộc hiển thị do là tiêu chí tìm kiếm. |
| Tên vụ việc/Nội dung liên quan | String(255) | - | Theo dữ liệu | Chỉ đọc. Hiển thị tên vụ việc hoặc nội dung liên quan; bắt buộc hiển thị do là tiêu chí tìm kiếm. |
| Người yêu cầu/Cán bộ liên quan | String(100) | - | Theo dữ liệu | Chỉ đọc. Hiển thị người yêu cầu bồi thường hoặc cán bộ liên quan; bắt buộc hiển thị do là tiêu chí tìm kiếm. |
| Số giấy tờ/Số quyết định | String(100) | - | Theo dữ liệu | Chỉ đọc. Hiển thị số giấy tờ thân nhân hoặc số quyết định liên quan; bắt buộc hiển thị do là tiêu chí tìm kiếm. |
| Số văn bản/quyết định gốc | String(100) | - | Theo dữ liệu | Chỉ đọc. Hiển thị số văn bản/quyết định gốc dùng để đối chiếu; bắt buộc hiển thị do là tiêu chí tìm kiếm. |
| Trạng thái | Enum(String(100)) | - | Theo dữ liệu | Chỉ đọc. Hiển thị trạng thái hiện tại của bản ghi gốc; chỉ các trạng thái hợp lệ để liên kết mới được hiển thị. |
| Ngày phát sinh | Date | - | Theo dữ liệu | Chỉ đọc. Hiển thị ngày nộp, ngày tiếp nhận, ngày ban hành quyết định hoặc ngày phát sinh nghiệp vụ theo nguồn dữ liệu. |
| Thao tác | - | - | - | Hiển thị nút `Chọn` ở cột cuối dòng. |

###### 4.3.3.1.9.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm trên popup theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Không nhập tiêu chí nào**: Nếu người dùng chưa nhập/chọn tối thiểu 01 tiêu chí tìm kiếm, vi phạm [BR-VAL-001], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-001] và không thực hiện tìm kiếm. |
|  |  |  | **TH2 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn trên popup, hiển thị kết quả lên bảng và đưa về Trang 1. |
|  |  |  | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled);  |
| 2 | Chọn (trên dòng kết quả) | Button/Row Click | Hệ thống lấy dữ liệu vụ việc/hồ sơ gốc được chọn, tự động điền (autofill) vào các trường liên quan trên màn hình gọi popup, chuyển hiển thị trường liên kết sang dạng liên kết (hyperlink) đến hồ sơ gốc, và tự động đóng popup. |
| 3 | Hủy bỏ | Button | Hệ thống đóng popup, không thay đổi dữ liệu đang có trên màn hình gọi popup. |

---

##### 4.3.3.1.10. Popup Tìm kiếm Vụ việc xác định cơ quan giải quyết bồi thường

###### 4.3.3.1.10.1. Màn hình

![Popup tìm kiếm vụ việc xác định cơ quan giải quyết bồi thường](images/UC431_466_POPUP_Tim_kiem_vu_viec_xdcq.png)

###### 4.3.3.1.10.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | - | Chỉ đọc. `Tìm kiếm vụ việc xác định cơ quan giải quyết bồi thường`. |
| Mã vụ việc | String(50) | Không | Trống | Một trong các tiêu chí tìm kiếm; áp dụng tìm gần đúng (chứa chuỗi nhập). |
| Tên vụ việc | String(255) | Không | Trống | Control UI: Input text.<br>- Một trong các tiêu chí tìm kiếm; áp dụng tìm gần đúng.<br>- Hồ sơ xác định cơ quan lưu trực tiếp trường `Tên vụ việc`; với dữ liệu cũ chưa có trường riêng, hệ thống so khớp theo tên vụ việc được sinh tự động theo quy tắc `Vụ việc yêu cầu bồi thường của [Họ và tên người yêu cầu]`. |
| Họ và tên người yêu cầu bồi thường | String(100) | Không | Trống | Một trong các tiêu chí tìm kiếm; áp dụng tìm gần đúng. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | Không | Trống | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | Không | Trống | Control UI: Textarea / Input text.<br>- Nhập/hiển thị số nhà, tên đường/phố, thôn/xóm/ấp... |
| Khối Bảng kết quả tìm kiếm | List(Object) | Không | Trống (chưa tìm kiếm) | Control UI: Data grid.<br>- Hiển thị sau khi thực hiện chức năng `Tìm kiếm`.<br>- Hover vào dòng sẽ tô nổi bật để làm rõ dòng đang được thao tác.<br>- Người dùng chọn hồ sơ xác định cơ quan bằng chức năng `Chọn` hoặc click trực tiếp vào dòng kết quả tương ứng, trừ liên kết `Mã vụ việc`. |
| Mã vụ việc | String(50) | - | Theo dữ liệu | Hiển thị dạng liên kết. Bấm vào liên kết mở màn hình **Xem chi tiết Yêu cầu xác định cơ quan giải quyết bồi thường** ở chế độ chỉ xem trong cùng tab làm việc; menu trái active vào `Xác định cơ quan giải quyết bồi thường`. Khi đóng màn chi tiết, hệ thống quay lại menu `Giải quyết bồi thường/Giải quyết yêu cầu bồi thường`; bắt buộc hiển thị do là tiêu chí tìm kiếm. |
| Tên vụ việc | String(255) | - | Theo dữ liệu | Chỉ đọc. Hiển thị trường `Tên vụ việc` của hồ sơ xác định cơ quan; với dữ liệu cũ chưa có trường riêng, hiển thị theo quy tắc `Vụ việc yêu cầu bồi thường của [Họ và tên người yêu cầu]`. |
| Họ và tên người yêu cầu bồi thường | String(100) | - | Theo dữ liệu | Chỉ đọc. Hiển thị họ tên người yêu cầu bồi thường; bắt buộc hiển thị do là tiêu chí tìm kiếm. |
| Tỉnh/Thành phố | Enum(String(100)) / String(100) | - | Theo dữ liệu | Control UI: Combobox có tìm kiếm / Input text.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Tỉnh/Thành phố [DM_13]. Cho phép gõ tìm kiếm theo Mã hoặc Tên.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản để người dùng tự do nhập. |
| Phường/Xã | Enum(String(100)) / String(100) | - | Theo dữ liệu | Control UI: Combobox có tìm kiếm / Input text.<br>- Phụ thuộc vào `Tỉnh/Thành phố` đã chọn.<br>- Nếu `Quốc gia` = `Việt Nam`: Tham chiếu Danh mục Xã/Phường/Thị trấn [DM_15] (lọc động theo Tỉnh/Thành phố đã chọn). Cho phép gõ tìm kiếm theo Mã hoặc Tên. Nếu chưa chọn Tỉnh/Thành phố thì khóa mờ (Disabled) kèm placeholder *"Vui lòng chọn Tỉnh/Thành phố trước"*.<br>- Nếu `Quốc gia` khác `Việt Nam`: Hiển thị ô nhập văn bản (Input text) để người dùng tự do nhập. |
| Địa chỉ chi tiết | Text(1000) / String(500) | - | Theo dữ liệu | Control UI: Textarea / Input text.<br>- Nhập/hiển thị số nhà, tên đường/phố, thôn/xóm/ấp... |
| Ngày tiếp nhận | Date | - | Theo dữ liệu | Chỉ đọc. Hiển thị ngày tiếp nhận vụ việc xác định cơ quan. |
| Thao tác | String(50) | - | Hiển thị | Chỉ đọc. Hiển thị nút `Chọn` ở cột cuối dòng. |

###### 4.3.3.1.10.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Button | Khi người dùng click nút, hệ thống kiểm tra điều kiện dữ liệu và thực hiện tìm kiếm trên popup theo các trường hợp bên dưới: |
|  |  |  | **TH1 - Không nhập tiêu chí nào**: Nếu người dùng chưa nhập/chọn tối thiểu 01 tiêu chí tìm kiếm, vi phạm [BR-VAL-001], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-001] và không thực hiện tìm kiếm. |
|  |  |  | **TH2 - Khoảng ngày không hợp lệ**: Nếu `Từ ngày` lớn hơn `Đến ngày`, vi phạm [BR-VAL-007], hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-007] và không thực hiện tìm kiếm. |
|  |  |  | **TH Hợp lệ (Có dữ liệu phù hợp)**: Hệ thống lọc và hiển thị danh sách các bản ghi thỏa mãn đồng thời các tiêu chí tìm kiếm/lọc đã nhập/chọn trên popup, hiển thị kết quả lên bảng và đưa về Trang 1. |
|  |  |  | **TH Không có dữ liệu trả về**: Bảng kết quả hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung [MSG-INF-SYS-001]; thanh phân trang hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled); |
| 2 | Mở chi tiết Mã vụ việc | Link | Hệ thống mở màn hình **Xem chi tiết Yêu cầu xác định cơ quan giải quyết bồi thường** của vụ việc được chọn ở chế độ chỉ xem trong cùng tab làm việc; menu trái active vào `Xác định cơ quan giải quyết bồi thường`. Khi người dùng bấm `Đóng` tại màn chi tiết, hệ thống quay lại menu `Giải quyết bồi thường/Giải quyết yêu cầu bồi thường`. Thao tác này không làm thay đổi dữ liệu đang có trên **MH02 - Nhập liệu hồ sơ vụ việc**. |
| 3 | Chọn (trên dòng kết quả) | Button/Row Click | Hệ thống lấy dữ liệu hồ sơ xác định cơ quan được chọn, tự động điền (autofill) thông tin người yêu cầu, tên vụ việc, Tỉnh/TP, địa chỉ chi tiết, hành vi gây thiệt hại, cơ quan giải quyết và lĩnh vực phát sinh thiệt hại vào các trường liên quan trên **MH02 - Nhập liệu hồ sơ vụ việc**, chuyển hiển thị trường `Tìm nhanh từ vụ việc xác định cơ quan` sang dạng liên kết (hyperlink) đến màn hình **Xem chi tiết Yêu cầu xác định cơ quan giải quyết bồi thường**, và tự động đóng popup. |
| 4 | Hủy bỏ | Button | Hệ thống đóng popup, không thay đổi dữ liệu đang có trên **MH02 - Nhập liệu hồ sơ vụ việc**. |

---

##### 4.3.3.1.11. Popup Xác nhận

###### 4.3.3.1.11.1. Màn hình

![Popup xác nhận](images/UC431_466_POPUP_Xac_nhan.png)

###### 4.3.3.1.11.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Tiêu đề popup | String(255) | - | Theo thao tác | Chỉ đọc. Hiển thị icon cảnh báo và nội dung xác nhận theo thao tác đang thực hiện. |
| Nội dung xác nhận | Text(2000) | - | Theo thao tác | Chỉ đọc. Áp dụng message xác nhận [MSG-CFM-SYS-001] hoặc nội dung xác nhận tương ứng thao tác. |

###### 4.3.3.1.11.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hủy bỏ | Button | Hệ thống đóng popup xác nhận và không thực hiện thao tác. |
| 2 | Đồng ý | Button | Hệ thống đóng popup xác nhận và thực hiện callback tương ứng, ví dụ gỡ file đính kèm hoặc duyệt ký số quyết định. |

---

##### 4.3.3.1.12. Popup Thụ lý hồ sơ và Cử người giải quyết bồi thường

###### 4.3.3.1.12.1. Màn hình

Popup mở từ chức năng `Thụ lý hồ sơ` tại MH01 và `Thụ lý` tại MH04 khi hồ sơ ở trạng thái `Chờ thụ lý`, cho phép Lãnh đạo/Thủ trưởng cử người giải quyết vụ việc.

###### 4.3.3.1.12.2. Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ và tên cán bộ giải quyết | String(100) | Có | Trống | Lãnh đạo nhập trực tiếp họ và tên cán bộ được cử giải quyết hồ sơ; không chọn từ danh sách cán bộ/người dùng trên hệ thống. |
| Chức vụ cán bộ giải quyết | String(100) | Có | Trống | Lãnh đạo nhập chức vụ của cán bộ được cử giải quyết hồ sơ. |
| Đơn vị cán bộ giải quyết | Enum(Tree) | Có | Trống | Lãnh đạo chọn đơn vị của cán bộ được cử giải quyết trên cây đơn vị của cơ quan. |
| Đơn vị ban hành QĐ cử người giải quyết | Enum(String(255)) | Có | Theo cơ quan giải quyết | Đơn vị ban hành quyết định cử người giải quyết. |
| Số QĐ cử người giải quyết | String(50) | Có | Trống | Nhập số Quyết định cử người giải quyết hồ sơ yêu cầu bồi thường; hệ thống kiểm tra trùng số quyết định theo đơn vị ban hành/năm nếu có cấu hình kiểm tra trùng. |
| Ngày QĐ cử người giải quyết | Date | Có | Ngày hiện tại | Nhập/chọn ngày ban hành Quyết định cử người giải quyết bằng datepicker; áp dụng quy tắc kiểm tra ngày hợp lệ [BR-VAL-008]. |
| Người ký/Chức vụ người ký QĐ | String(255) | Không | Trống | Ghi nhận người ký và chức vụ trên quyết định cử người giải quyết nếu có. |
| Tài liệu QĐ cử người giải quyết đính kèm | File | Có | Trống | Khối tài liệu đặt dưới phần thông tin quyết định; cho phép đính kèm tài liệu Quyết định cử người giải quyết, sau khi chọn file hiển thị tên file và liên kết `Xem file`, `Xóa`. Đây là file QĐ đã ký bên ngoài, module này không thực hiện trình ký số riêng cho QĐ cử người giải quyết. |

###### 4.3.3.1.12.3. Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận | Button | Khi người dùng click nút, hệ thống kiểm tra dữ liệu và xử lý theo các trường hợp bên dưới. |
|  |  |  | **TH1 - Bỏ trống trường bắt buộc**: Vi phạm [BR-VAL-001], hệ thống tô viền đỏ trường thiếu dữ liệu và không cho xác nhận thụ lý. |
|  |  |  | **TH2 - Hợp lệ**: Hệ thống lưu thông tin người được cử giải quyết và thông tin QĐ cử người giải quyết, chuyển hồ sơ sang trạng thái `Đang xác minh thiệt hại`, cập nhật timeline và hiển thị [MSG-SUC-SYS-002], đóng popup. |
| 2 | Hủy bỏ | Button | Hệ thống đóng popup, giữ nguyên trạng thái hồ sơ. |
| 3 | Xem file | Link | Cho phép xem file đính kèm tại một tab riêng. |
| 4 | Xóa | Link | Hệ thống gỡ file đính kèm khỏi popup. |

---
