#### 4.3.1.7. Quản lý Cơ cấu tổ chức (Đơn vị)

##### 4.3.1.7.1. UC604.01 - Tra cứu và hiển thị Sơ đồ Đơn vị

###### 4.3.1.7.1.1. Mục đích

\- Quản lý và tra cứu Sơ đồ cơ cấu tổ chức dưới dạng phân cấp đa cội (Multi-root Tree).  
\- Cho phép quản lý cả cơ cấu tổ chức nội bộ của Bộ Tư pháp và hệ thống các Cơ quan có thẩm quyền ngoài bộ (Tòa án, Viện kiểm sát, Cơ quan điều tra, Thi hành án...).  
\- Đáp ứng nhu cầu quản lý danh mục đơn vị báo cáo BTNN quy mô lớn (khoảng 22.000 đơn vị hoặc nhiều hơn), trong đó giai đoạn triển khai hiện tại có thể chỉ cấp tài khoản cho một số đơn vị đầu mối như 34 Sở Tư pháp địa phương và Cục Bồi thường nhà nước, nhưng vẫn phải khai báo được đầy đủ đơn vị báo cáo thực tế để phục vụ nhập thay, tổng hợp và thống kê theo Thông tư 08/2019/TT-BTP.

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.7.1.2. UC604.01.MH01 - Màn hình Tra cứu Sơ đồ Tổ chức

**Màn hình**:
\- Giao diện Split-view (Trái: Sơ đồ cây đa cội, Phải: Chi tiết Node đang chọn).

**Mô tả thông tin trên màn hình**:

| Trường thông tin                        | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                                                                                       |
| :----------------------------------------- | :-------------- | :--------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Panel Trái: Sơ đồ tổ chức**  |                 |            |             |                                                                                                                                               |
| Ô tìm kiếm nhanh                        | String(255) | Không     | Trống      | Control UI: Textbox.<br>Tìm kiếm nhanh Node theo `Mã đơn vị` hoặc `Tên đơn vị`; áp dụng tìm gần đúng, không phân biệt hoa/thường và dấu tiếng Việt. Khi tìm kiếm trong cây lớn, hệ thống hiển thị kết quả kèm đường dẫn đơn vị cha để người dùng biết đơn vị thuộc tỉnh/khối/đầu mối nào. |
| Cây Sơ đồ Đơn vị                    | String(255) | \- | \- | Hiển thị cấu trúc Đơn vị cha - Đơn vị con dạng Đa cội (nhiều gốc độc lập). Cây phải hỗ trợ lazy-load/virtual scroll để đáp ứng danh mục quy mô khoảng 22.000 đơn vị; không tải toàn bộ node con khi mở màn hình. Cho phép click chọn 1 Node để xem chi tiết. |
| **Panel Phải: Chi tiết Đơn vị** |                 |            |             |                                                                                                                                               |
| Tab Thông tin chung                       | String(255) | \- | \- | Hiển thị thông tin chi tiết của Đơn vị đang chọn trên cây.                                                                        |
| Tab Cán bộ trực thuộc                  | String(255) | \- | \- | Hiển thị danh sách Cán bộ đang thuộc Đơn vị này.                                                                                   |

**Chức năng trên màn hình**:

| STT | Tên chức năng          | Định dạng        | Mô tả                                                                                                                                                                  |
| :-- | :------------------------ | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Xem chi tiết             | Click (Node)        | Hệ thống tải thông tin chi tiết của Node sang Panel Phải.                                                                                                         |
| 2   | Thêm mới Đơn vị con  | Nút / Context Menu | Mở màn hình Thêm mới (UC604.02). Đơn vị cha sẽ được tự động điền bằng Node đang chọn.                                                                |
| 3   | Thêm mới Đơn vị gốc | Nút / Context Menu | Mở màn hình Thêm mới (UC604.02) để tạo một nút gốc mới (ví dụ: Tạo một Bộ/Ngành ngoài Bộ Tư pháp). Khi đó Đơn vị cha sẽ được để trống. |
| 4   | Sửa                      | Nút / Icon         | Mở màn hình Sửa Đơn vị (UC604.03).                                                                                                                                |
| 5   | Xóa                      | Nút / Icon         | Gọi chức năng xóa (UC604.04).                                                                                                                                        |

##### 4.3.1.7.2. UC604.02 - Thêm mới Đơn vị / Phòng ban

###### 4.3.1.7.2.1. Mục đích

\- Cho phép Thêm mới 1 Đơn vị hoặc Phòng ban vào Sơ đồ tổ chức (dưới dạng Đơn vị con hoặc tạo mới Đơn vị gốc độc lập).  

*a. Phân quyền*

\- Quản trị hệ thống (QTHT).  

*b. Điều kiện thực hiện*

\- NSD đã đăng nhập hệ thống.  

###### 4.3.1.7.2.2. UC604.02.MH01 - Màn hình Thêm mới Đơn vị

**Màn hình**:
\- Form nhập liệu (Popup hoặc Panel).

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Đơn vị cha | String(255) | Không | Theo Node chọn hoặc Trống | Control UI: Hiển thị/Read-only.<br>Tự động điền theo Node vừa click Thêm mới. Nếu chọn hành động "Thêm mới Đơn vị gốc", trường này sẽ hiển thị là "Không có (Tạo đơn vị gốc mới)" và để trống. |
| Loại đơn vị | Enum(String(100)) | Có | Nội bộ | Control UI: Hộp chọn.<br>Gồm:<br>+ **Nội bộ**<br>+ **Cơ quan ngoài ngành**<br>Trong đó:<br>+ **Nội bộ**: Các đơn vị thuộc Bộ Tư pháp (Cục Đăng ký, các Trung tâm đăng ký và các Phòng ban trực thuộc).<br>+ **Cơ quan ngoài ngành**: Các cơ quan ngoài Bộ Tư pháp (Bộ Công an, Tòa án nhân dân tối cao, Viện kiểm sát nhân dân tối cao, cơ quan Thi hành án dân sự, văn phòng đăng ký đất đai...). |
| Cấp đơn vị | Enum(String(100)) | Không | Cấp Trung ương | Control UI: Hộp chọn.<br>Phân cấp quản lý đơn vị theo mô hình hiện hành và dữ liệu lịch sử.<br>Gồm:<br>+ Cấp Trung ương<br>+ Cấp Tỉnh/Thành phố<br>+ Cấp Xã/Phường/Đặc khu<br>+ Đơn vị trực thuộc/Phòng ban<br>+ Cấp Quận/Huyện (chỉ dùng cho dữ liệu lịch sử/ngừng hoạt động hoặc giai đoạn chuyển tiếp, không chọn mặc định khi tạo đơn vị báo cáo mới). |
| Mã Đơn vị | String(50) | Có | Tự động sinh | Control UI: Hiển thị/Read-only.<br>Mã tham chiếu duy nhất của đơn vị, do hệ thống tự sinh và không cho phép người dùng chỉnh sửa. |
| Tên đơn vị | String(255) | Có | Trống | Tên đầy đủ của đơn vị. |
| Mã định danh báo cáo BTNN | String(50) | Không | Trống | Mã sử dụng trong báo cáo/nhập thay BTNN. Nếu có dữ liệu đồng bộ từ danh mục bên ngoài thì lưu mã tương ứng để tìm kiếm và đối soát. Không được trùng trong cùng cây đơn vị. |
| Nhóm cơ quan báo cáo BTNN | Enum(String(100)) | Không | Trống | Tham chiếu Danh mục Loại cơ quan báo cáo [DM_43]. |
| Vai trò báo cáo BTNN | Enum(String(100)) | Không | Trống | Tham chiếu Danh mục Vai trò báo cáo của cơ quan [DM_46]. Cho phép chọn một hoặc nhiều vai trò: `Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại`, `Cơ quan là bị đơn/bị đơn dân sự/người bị kiện trong vụ án`. |
| Đầu mối tổng hợp trực tiếp | Enum(Tree) | Không | Theo cấu hình cấp trên | Chọn từ cây đơn vị. Xác định đơn vị nhận/tổng hợp báo cáo của đơn vị này. Với đơn vị địa phương, đầu mối tổng hợp là UBND cấp tỉnh hoặc đơn vị được ủy quyền nhập/tổng hợp theo cấu hình triển khai. |
| Đơn vị được phép nhập thay | Enum(Tree/Multi-select) | Không | Trống | Chọn một hoặc nhiều đơn vị được phép tạo/nhập kỳ báo cáo thay cho đơn vị này. Giai đoạn hiện tại có thể cấu hình Sở Tư pháp địa phương được nhập thay các đơn vị báo cáo thực tế thuộc phạm vi tỉnh. |
| Cho phép tạo kỳ báo cáo BTNN | Boolean | Không | Có | Nếu tắt, đơn vị chỉ tồn tại để cấu trúc cây/tra cứu lịch sử, không được chọn làm `Đơn vị báo cáo` khi tạo kỳ báo cáo mới. |
| Mã số thuế | String(50) | Không | Trống | Mã số thuế của Cơ quan/Đơn vị. |
| Tỉnh/Thành phố | Enum(String(50)) | Không | Trống | Control UI: Hộp chọn.<br>Lấy từ danh mục Tỉnh/Thành phố [DM_03]. |
| Địa chỉ | String(500) | Không | Trống | Địa chỉ trụ sở đơn vị. |
| Số điện thoại | String(10) | Không | Trống | Số điện thoại liên hệ. Định dạng 10 chữ số của Việt Nam. |
| Người đại diện | String(255) | Không | Trống | Tên người đứng đầu đơn vị. |
| Trạng thái | Enum(String(50)) | Có | Đang hoạt động | Control UI: Hộp chọn.<br>Gồm: Đang hoạt động, Ngừng hoạt động. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu lại | Nút | Lưu thông tin vào CSDL. |
|  |  |  | \- TH1 (Trống trường bắt buộc): Báo lỗi "Vui lòng nhập thông tin bắt buộc". |
|  |  |  | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép". |
|  |  |  | \- TH Hợp lệ: Hệ thống tự động sinh Mã Đơn vị theo quy tắc tăng dần, lưu thông tin vào CSDL, hiển thị thông báo "Thêm mới đơn vị thành công", đóng form và reload Cây sơ đồ. |
| 2 | Hủy | Nút | Đóng Form, không lưu dữ liệu. |

##### 4.3.1.7.3. UC604.03 - Sửa Đơn vị / Phòng ban

###### 4.3.1.7.3.1. Mục đích

\- Sửa thông tin Đơn vị đang tồn tại.  

###### 4.3.1.7.3.2. UC604.03.MH01 - Màn hình Sửa Đơn vị

**Màn hình**:
\- Form nhập liệu (Popup hoặc Panel, hiển thị thông tin sẵn có).

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã Đơn vị | String(50) | Có | Theo bản ghi | Control UI: Hiển thị/Read-only.<br>Không cho phép sửa. |
| Loại đơn vị | Enum(String(100)) | Có | Theo bản ghi | Control UI: Hộp chọn.<br>Không cho phép sửa loại đơn vị để bảo toàn tính toàn vẹn của dữ liệu liên kết.<br>Gồm:<br>+ **Nội bộ**<br>+ **Cơ quan ngoài ngành**<br>Trong đó:<br>+ **Nội bộ**: Các đơn vị thuộc Bộ Tư pháp (Cục Đăng ký, các Trung tâm đăng ký và các Phòng ban trực thuộc).<br>+ **Cơ quan ngoài ngành**: Các cơ quan ngoài Bộ Tư pháp (Bộ Công an, Tòa án nhân dân tối cao, Viện kiểm sát nhân dân tối cao, cơ quan Thi hành án dân sự, văn phòng đăng ký đất đai...). |
| Cấp đơn vị | Enum(String(100)) | Không | Theo bản ghi | Control UI: Hộp chọn.<br>Cho phép sửa.<br>Gồm:<br>+ Cấp Trung ương<br>+ Cấp Tỉnh/Thành phố<br>+ Cấp Xã/Phường/Đặc khu<br>+ Đơn vị trực thuộc/Phòng ban<br>+ Cấp Quận/Huyện (chỉ dùng cho dữ liệu lịch sử/ngừng hoạt động hoặc giai đoạn chuyển tiếp, không chọn mặc định khi tạo đơn vị báo cáo mới). |
| Tên đơn vị | String(255) | Có | Theo bản ghi | Cho phép sửa. |
| Mã định danh báo cáo BTNN | String(50) | Không | Theo bản ghi | Cho phép sửa. Dùng để tìm kiếm, đối soát và import/đồng bộ danh mục đơn vị báo cáo BTNN. Không được trùng trong cùng cây đơn vị. |
| Nhóm cơ quan báo cáo BTNN | Enum(String(100)) | Không | Theo bản ghi | Cho phép sửa. Tham chiếu Danh mục Loại cơ quan báo cáo [DM_43]. |
| Vai trò báo cáo BTNN | Enum(String(100)) | Không | Theo bản ghi | Cho phép sửa, cho phép chọn một hoặc nhiều vai trò theo Danh mục Vai trò báo cáo của cơ quan [DM_46]. |
| Đầu mối tổng hợp trực tiếp | Enum(Tree) | Không | Theo bản ghi | Cho phép sửa. Chọn từ cây đơn vị để xác định nơi nhận/tổng hợp báo cáo của đơn vị này. |
| Đơn vị được phép nhập thay | Enum(Tree/Multi-select) | Không | Theo bản ghi | Cho phép sửa. Chọn các đơn vị/tài khoản đầu mối được phép tạo kỳ báo cáo, nhập liệu, chỉnh lý thay cho đơn vị báo cáo thực tế này. |
| Cho phép tạo kỳ báo cáo BTNN | Boolean | Không | Theo bản ghi | Cho phép sửa. Nếu tắt, đơn vị không được chọn làm `Đơn vị báo cáo` khi tạo kỳ báo cáo mới. |
| Mã số thuế | String(50) | Không | Theo bản ghi | Cho phép sửa. |
| Tỉnh/Thành phố | Enum(String(50)) | Không | Theo bản ghi | Control UI: Hộp chọn.<br>Cho phép sửa. Lấy từ danh mục Tỉnh/Thành phố [DM_03]. |
| Địa chỉ | String(500) | Không | Theo bản ghi | Cho phép sửa. |
| Số điện thoại | String(10) | Không | Theo bản ghi | Cho phép sửa. Định dạng 10 chữ số của Việt Nam. |
| Người đại diện | String(255) | Không | Theo bản ghi | Cho phép sửa. |
| Trạng thái | Enum(String(50)) | Có | Theo bản ghi | Control UI: Hộp chọn.<br>Cho phép sửa. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Cập nhật | Nút | Cập nhật thông tin vào CSDL. |
|  |  |  | \- TH1 (Trống trường bắt buộc): Báo lỗi "Vui lòng nhập thông tin bắt buộc". |
|  |  |  | \- TH2 (Dữ liệu không hợp lệ): Kiểm tra các trường hợp dữ liệu sai định dạng, vượt quá độ dài, hoặc chứa ký tự đặc biệt (Chi tiết theo yêu cầu tại trường thông tin). Nếu vi phạm, hiển thị cảnh báo lỗi "[Tên trường] không hợp lệ" hoặc "[Tên trường] vượt quá độ dài cho phép". |
|  |  |  | \- TH Hợp lệ: Đóng popup, báo: "Cập nhật thành công". |
| 2 | Hủy | Nút | Đóng Form, không lưu dữ liệu. |

##### 4.3.1.7.4. UC604.04 - Xóa Đơn vị

###### 4.3.1.7.4.1. Mục đích

\- Xóa 1 Đơn vị khỏi Sơ đồ tổ chức.  

###### 4.3.1.7.4.2. UC604.04.MH01 - Màn hình Xác nhận Xóa

**Màn hình**:
\- Popup xác nhận xóa.

**Mô tả thông tin trên màn hình**:

| Trường thông tin    | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                                                   |
| :--------------------- | :-------------- | :--------- | :---------- | :------------------------------------------------------------------------ |
| Thông báo xác nhận | String(255) | \- | \- | Control UI: Hiển thị/Read-only.<br>Hiển thị: "Bạn có chắc chắn muốn xóa đơn vị [Tên đơn vị]?" |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1   | Đồng ý Xóa   | Nút         | Kiểm tra toàn vẹn dữ liệu trước khi xóa:<br>+ Ngoại lệ 1 (Có Node con): Báo lỗi "Không thể xóa do Đơn vị này đang chứa các đơn vị/phòng ban con".<br>+ Ngoại lệ 2 (Có Cán bộ trực thuộc): Báo lỗi "Không thể xóa do Đơn vị này đang có tài khoản cán bộ trực thuộc. Vui lòng thuyên chuyển cán bộ trước khi xóa".<br>+ Hợp lệ: Xóa Đơn vị khỏi DB, hiển thị "Xóa thành công" và reload Cây. |
| 2   | Hủy             | Nút         | Đóng popup, không thực hiện xóa. |

##### 4.3.1.7.5. UC604.05 - Cấu hình Biến động Tổ chức & Kế thừa Đơn vị (Sáp nhập/Chia tách/Giải thể)

###### 4.3.1.7.5.1. Mục đích

- Cho phép Quản trị hệ thống khai báo thông tin biến động cơ cấu đơn vị hành chính/tư pháp (sáp nhập nhiều cơ quan thành một cơ quan mới; chia tách một cơ quan thành nhiều cơ quan; giải thể cơ quan hoàn toàn).
- Thiết lập liên kết kế thừa (Succession Mapping) để phục vụ cho thuật toán tự động gợi ý cơ quan giải quyết bồi thường (GQBT) tại các module nghiệp vụ.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.
- Các cơ quan liên quan (cả cơ quan cũ và cơ quan mới) đã tồn tại trong danh mục `sys_organization`. Nếu cơ quan mới chưa có, QTHT phải thêm mới cơ quan mới ở trạng thái `Đang hoạt động` trước (sử dụng UC604.02).

###### 4.3.1.7.5.2. UC604.05.MH01 - Màn hình Cấu hình Biến động Tổ chức

**Màn hình**:
- Form nhập liệu / Popup Cấu hình Biến động.

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin văn bản pháp lý** | | | | |
| Loại biến động | Enum(String(50)) | Có | - | Control UI: Hộp chọn.<br>Gồm các loại biến động:<br>+ **Sáp nhập (Merged)**: Gộp nhiều đơn vị thành 1 đơn vị mới.<br>+ **Chia tách (Split)**: Tách 1 đơn vị thành nhiều đơn vị mới.<br>+ **Giải thể (Dissolved)**: Giải thể hoàn toàn đơn vị.<br>+ **Đổi tên (Renamed)**: Chỉ đổi tên đơn vị, mã số và quyền hạn giữ nguyên. |
| Số văn bản pháp lý | String(100) | Có | Trống | Ví dụ: `668/QĐ-BTP`, `99/2022/NĐ-CP`... |
| Cơ quan ban hành quyết định | String(255) | Có | Trống | Ví dụ: *Bộ trưởng Bộ Tư pháp*, *Chính phủ*... |
| Ngày ban hành quyết định | Date | Có | Trống | Ngày ký văn bản. |
| Ngày hiệu lực biến động | Date | Có | Trống | Ngày bắt đầu áp dụng việc biến động trên thực tế. |
| Mô tả chi tiết | String(1000) | Không | Trống | Nhập tóm tắt văn bản pháp lý. |
| **II. Thiết lập Kế thừa đơn vị (Dynamic Section)** | | | | |
| **[Trường hợp Sáp nhập / Đổi tên]** | | | | |
| Danh sách cơ quan bị sáp nhập | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Cho phép chọn một hoặc nhiều cơ quan cũ sẽ bị ngừng hoạt động. |
| Cơ quan mới kế thừa | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Chọn 01 cơ quan mới được thành lập/kế thừa toàn bộ quyền lợi và nghĩa vụ. |
| **[Trường hợp Chia tách]** | | | | |
| Cơ quan cũ bị chia tách | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Chọn 01 cơ quan cũ sẽ bị ngừng hoạt động. |
| Danh sách các cơ quan mới kế thừa | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Cho phép chọn nhiều cơ quan mới cùng chia sẻ quyền lợi/nghĩa vụ của cơ quan cũ. |
| **[Trường hợp Giải thể]** | | | | |
| Cơ quan bị giải thể | Enum(String(100)) | Có | Trống | Control UI: Hộp chọn.<br>Chọn cơ quan bị giải thể hoàn toàn, không có cơ quan kế thừa trực tiếp. |
| Đơn vị nhận giải quyết hậu quả | String(255) | - | Mặc định | Control UI: Hiển thị/Read-only.<br>Hệ thống tự động xác định là "Cơ quan ban hành quyết định giải thể" (theo Điểm a Khoản 1 Điều 40 Luật TNBTCNN). |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lưu cấu hình | Nút | Thực hiện lưu lịch sử biến động và tự động cập nhật trạng thái đơn vị:<br>+ **Validate**: Bắt buộc nhập các thông tin có dấu sao đỏ (`*`).<br>+ **Xử lý nghiệp vụ ngầm (Background logic)**:<br>  1. Hệ thống tự động chuyển trạng thái `status` của các cơ quan cũ thành `INACTIVE` (Ngừng hoạt động) kể từ Ngày hiệu lực biến động.<br>  2. Ghi nhận dữ liệu vào bảng `SYS_ORG_HISTORY` và `SYS_ORG_SUCCESSOR` để kích hoạt công cụ gợi ý tự động (Smart Routing).<br>  3. Khóa tài khoản đăng nhập của các cán bộ trực thuộc cơ quan cũ (Yêu cầu làm thủ tục thuyên chuyển công tác sang đơn vị mới).<br>  4. Hiển thị thông báo "Thiết lập biến động tổ chức thành công" và đóng form. |
| 2 | Hủy | Nút | Đóng form, không lưu cấu hình. |

##### 4.3.1.7.6. UC604.06 - Import/Đồng bộ danh mục đơn vị báo cáo BTNN

###### 4.3.1.7.6.1. Mục đích

- Cho phép Quản trị hệ thống nạp mới hoặc cập nhật hàng loạt danh mục đơn vị phục vụ báo cáo BTNN theo cây đơn vị, đáp ứng quy mô khoảng 22.000 đơn vị hoặc nhiều hơn.
- Hỗ trợ giai đoạn triển khai hiện tại: có thể chỉ cấp tài khoản cho 34 Sở Tư pháp địa phương và Cục Bồi thường nhà nước, nhưng vẫn khai báo được đầy đủ đơn vị báo cáo thực tế để Sở Tư pháp/Bộ Tư pháp nhập thay, tổng hợp và đối soát số liệu.
- Đảm bảo danh mục đơn vị phù hợp mô hình chính quyền địa phương 2 cấp hiện hành; dữ liệu cấp Quận/Huyện chỉ dùng cho lịch sử/ngừng hoạt động hoặc giai đoạn chuyển tiếp.

*a. Phân quyền*

- Quản trị hệ thống (QTHT).

*b. Điều kiện thực hiện*

- NSD đã đăng nhập hệ thống.
- File import đúng mẫu dữ liệu do hệ thống cung cấp.

###### 4.3.1.7.6.2. UC604.06.MH01 - Màn hình Import/Đồng bộ danh mục đơn vị báo cáo BTNN

**Màn hình**:
- Form import dữ liệu kèm bảng xem trước kết quả kiểm tra.

**Mô tả thông tin trên màn hình**:

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| File dữ liệu | File | Có | Trống | Control UI: Upload file. Cho phép import file Excel theo mẫu hệ thống. |
| Chế độ import | Enum(String(100)) | Có | Kiểm tra dữ liệu | Gồm: `Kiểm tra dữ liệu`, `Thêm mới`, `Cập nhật bản ghi hiện có`, `Thêm mới và cập nhật`. |
| Mã đơn vị | String(50) | Có | Theo file | Mã định danh duy nhất của đơn vị trên hệ thống. |
| Tên đơn vị | String(255) | Có | Theo file | Tên đầy đủ của đơn vị. |
| Mã đơn vị cha | String(50) | Không | Theo file | Dùng để dựng cây đơn vị. Nếu trống thì bản ghi là đơn vị gốc. |
| Cấp đơn vị | Enum(String(100)) | Có | Theo file | Gồm `Cấp Trung ương`, `Cấp Tỉnh/Thành phố`, `Cấp Xã/Phường/Đặc khu`, `Đơn vị trực thuộc/Phòng ban`, `Cấp Quận/Huyện` (chỉ dữ liệu lịch sử/chuyển tiếp). |
| Tỉnh/Thành phố | Enum(String(50)) | Không | Theo file | Tham chiếu Danh mục Tỉnh/Thành phố [DM_03]. Bắt buộc với đơn vị địa phương. |
| Nhóm cơ quan báo cáo BTNN | Enum(String(100)) | Không | Theo file | Tham chiếu Danh mục Loại cơ quan báo cáo [DM_43]. |
| Vai trò báo cáo BTNN | Enum(String(100)) | Không | Theo file | Tham chiếu Danh mục Vai trò báo cáo của cơ quan [DM_46], cho phép nhiều vai trò. |
| Đầu mối tổng hợp trực tiếp | String(50) | Không | Theo file | Nhập `Mã đơn vị` của đầu mối tổng hợp trực tiếp. |
| Đơn vị được phép nhập thay | String(1000) | Không | Theo file | Danh sách `Mã đơn vị` được phép nhập thay, phân tách bằng dấu phẩy. |
| Cho phép tạo kỳ báo cáo BTNN | Boolean | Không | Có | Nếu `Không`, đơn vị không hiển thị trong cây chọn `Đơn vị báo cáo` khi tạo kỳ báo cáo mới. |
| Trạng thái | Enum(String(50)) | Có | Đang hoạt động | Gồm `Đang hoạt động`, `Ngừng hoạt động`. |
| Bảng xem trước kết quả kiểm tra | Text(2000) | - | Theo file | Hiển thị danh sách dòng hợp lệ/không hợp lệ, lỗi trùng mã, thiếu mã cha, sai cấp đơn vị, sai đầu mối tổng hợp, sai đơn vị nhập thay, sai danh mục tham chiếu. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tải file mẫu | Button | Tải file Excel mẫu import danh mục đơn vị báo cáo BTNN. |
| 2 | Kiểm tra dữ liệu | Button | Kiểm tra cấu trúc file, trường bắt buộc, trùng `Mã đơn vị`, tồn tại `Mã đơn vị cha`, tính hợp lệ của `Cấp đơn vị`, [DM_03], [DM_43], [DM_46], `Đầu mối tổng hợp trực tiếp` và `Đơn vị được phép nhập thay`; hiển thị kết quả tại bảng xem trước, chưa ghi dữ liệu vào hệ thống. |
| 3 | Import dữ liệu | Button | Chỉ cho phép thực hiện khi toàn bộ dòng hợp lệ hoặc người dùng chọn bỏ qua dòng lỗi. Hệ thống ghi dữ liệu theo chế độ import đã chọn, cập nhật lại cây đơn vị và ghi lịch sử import. |
| 4 | Hủy | Button | Đóng form, không ghi dữ liệu. |
