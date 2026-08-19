### 4.3.3. Dành cho Cán bộ Công tác bồi thường nhà nước:

#### 4.3.3.2. UC450_456 - Quản lý kinh phí bồi thường

##### 4.3.3.2.1. Mục đích

\- Cho phép Cán bộ chuyên viên lập tờ trình/đề nghị tạm ứng hoặc đề nghị cấp kinh phí bồi thường chính thức từ hồ sơ yêu cầu bồi thường gốc.  
\- Hỗ trợ Lãnh đạo duyệt hoặc từ chối cấp phát kinh phí bồi thường dựa trên cơ sở pháp lý và dự toán ngân sách.  
\- Hỗ trợ đối soát kết quả chi trả thực tế (qua ngân hàng hoặc tiền mặt) đến tay người bị hại, đảm bảo dòng tiền ngân sách bồi thường nhà nước được quản lý tập trung và minh bạch.  

*a. Phân quyền*

\- Chuyên viên xử lý nghiệp vụ bồi thường (`chuyen-vien`): Được quyền lập đề nghị, chỉnh sửa đề xuất bị từ chối, cập nhật kết quả chi trả và thực hiện xóa tờ trình nháp.  
\- Lãnh đạo cơ quan phê duyệt (`lanh-dao`): Được quyền xem chi tiết tờ trình, nhập ý kiến chỉ đạo và thực hiện phê duyệt hoặc từ chối cấp phát kinh phí.  

*b. Điều kiện thực hiện*

\- Người dùng đã đăng nhập vào hệ thống thành công.  
\- Có hồ sơ yêu cầu bồi thường liên kết đang ở trạng thái phù hợp (Đang xác minh thiệt hại để tạm ứng, hoặc đã có Quyết định giải quyết bồi thường/Phán quyết Tòa án có hiệu lực để lập đề nghị chính thức).  
\- Phân hệ này hiện quản lý tờ trình/đề nghị và kết quả phê duyệt cấp kinh phí, không tự phát sinh số quyết định ban hành. Trường hợp bổ sung nghiệp vụ ban hành Quyết định cấp kinh phí/tạm ứng trên hệ thống, quyết định đó phải áp dụng nguyên tắc chung: phân biệt `Đơn vị nhập liệu` và `Đơn vị ban hành`, lấy số từ `Sổ văn bản áp dụng` theo đơn vị ban hành, ký số thì trình lãnh đạo đơn vị ban hành, ký bên ngoài thì ghi nhận số/ngày/file quyết định đã ký và kiểm tra trùng số/tính tuần tự trong sổ.

---

##### 4.3.3.2.2. UC450_456.01 - Tra cứu danh sách đề xuất kinh phí

###### 4.3.3.2.2.1. Mục đích

\- Cung cấp màn hình tìm kiếm, lọc danh sách các đề xuất kinh phí/tạm ứng và quản lý các tác vụ xử lý theo trạng thái.  

###### 4.3.3.2.2.2. UC450_456.01.MH01 - Màn hình Danh sách đề nghị kinh phí

**Màn hình**:  
![Màn hình danh sách đề nghị](images/UC450_List.png)  

**Mô tả thông tin trên màn hình**:  

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Bộ lọc tìm kiếm** | | | | |
| Mã đề xuất | String(50) | Không | Trống | Tìm kiếm gần đúng theo mã đề xuất kinh phí bồi thường. |
| Loại đề nghị | Enum(String(50)) | Không | Tất cả | Lựa chọn loại đề nghị gồm:<br>- Tất cả<br>- Đề nghị tạm ứng<br>- Đề nghị cấp kinh phí bồi thường |
| Mã vụ việc gốc | String(50) | Không | Trống | Tìm kiếm gần đúng theo mã vụ việc yêu cầu bồi thường liên kết. |
| Trạng thái | Enum(String(50)) | Không | Tất cả | Lựa chọn trạng thái của đề xuất gồm:<br>- Tất cả<br>- Chờ lập đề nghị<br>- Chờ duyệt<br>- Bị từ chối<br>- Chờ chi trả<br>- Chi trả một phần<br>- Đã sung quỹ<br>- Hoàn thành<br>- Chưa hoàn thành chi trả |
| Người yêu cầu | String(100) | Không | Trống | Tìm kiếm gần đúng theo họ tên người yêu cầu bồi thường. |
| Cán bộ đề xuất | String(255) | Không | Trống | Tìm kiếm gần đúng theo tên cán bộ lập đề xuất. |
| Từ ngày | Date | Không | Đầu tháng hiện tại | Định dạng `dd/mm/yyyy`. Chỉ hiển thị ngày nhỏ hơn ngày hiện tại. [BR-VAL-008] |
| Đến ngày | Date | Không | Ngày hiện tại | Định dạng `dd/mm/yyyy`. Chỉ hiển thị ngày nhỏ hơn ngày hiện tại. [BR-VAL-008] |
| **Lưới dữ liệu** | - | | | Hiển thị 20 bản ghi/trang [BR-EXP-040]. Mặc định sắp xếp giảm dần theo thời gian tạo. |
| STT | Integer(10) | \- | \- | Chỉ đọc. Số thứ tự tự động tăng dần. |
| Mã đề xuất | String(50) | \- | \- | Chỉ đọc. Hiển thị mã đề xuất. |
| Mã vụ việc | String(50) | \- | \- | Chỉ đọc. Hiển thị mã vụ việc bồi thường liên kết. |
| Tên vụ việc | String(255) | \- | \- | Chỉ đọc. Hiển thị tên vụ việc bồi thường liên kết. |
| Loại đề nghị | Enum(String(50)) | \- | \- | Chỉ đọc. Hiển thị loại đề nghị (Tạm ứng/Kinh phí bồi thường). |
| Người yêu cầu | String(100) | \- | \- | Chỉ đọc. Hiển thị họ tên người yêu cầu. |
| Số tiền bồi thường | Decimal(18,0) | \- | \- | Chỉ đọc. Số tiền bồi thường hiển thị dạng phân cách hàng ngàn (VNĐ). |
| Trạng thái | Enum(String(50)) | \- | \- | Chỉ đọc. Hiển thị trạng thái tương ứng dưới dạng badge màu sắc. |
| Ngày tạo | Date | \- | \- | Chỉ đọc. Định dạng `dd/mm/yyyy`. |
| Hạn nhận / Sung quỹ | String(255) | \- | \- | Chỉ đọc. Hiển thị `-` khi chưa có thông tin thông báo nhận kinh phí. Khi đã có ngày nhận thông báo, hiển thị hạn nhận kinh phí bằng ngày nhận thông báo cộng 3 năm. Nếu khoản chi quá hạn 3 năm và còn số tiền chưa chi trả ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần", hiển thị số ngày quá hạn và số tiền còn phải chi. Nếu trạng thái là "Đã sung quỹ", hiển thị thông tin đã sung quỹ và ngày sung quỹ. |
| Thao tác | - | \- | \- | Cột chứa các nút chức năng cố định số slot theo vai trò:<br>- **Xem** (mắt)<br>- **Lập đề nghị** (bút ký)<br>- **Cập nhật đề nghị** (bút chì)<br>- **Cập nhật chi trả** (tiền)<br>- **Sung quỹ Nhà nước** (kho bạc/ngân hàng)<br>- **Phê duyệt** (tích xanh - chỉ Lãnh đạo)<br>- **Từ chối** (banh đỏ - chỉ Lãnh đạo)<br>- **Xóa** (thùng rác). Các nút không khả dụng ở trạng thái hiện tại hiển thị mờ 35% và không phản hồi. |

**Chức năng trên màn hình**:  

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Trường hợp dữ liệu tìm kiếm hợp lệ:<br>+ Hệ thống thực hiện tìm kiếm và hiển thị danh sách kết quả phù hợp trên lưới dữ liệu.<br>+ Ghi log thao tác tra cứu vào nhật ký hệ thống [III.6]. |
| | | | Trường hợp không tìm thấy dữ liệu phù hợp:<br>+ Hệ thống hiển thị dòng chữ: "Không có dữ liệu". |
| | | | Trường hợp khoảng ngày tìm kiếm không hợp lệ ("Từ ngày" > "Đến ngày"):<br>+ Vi phạm quy tắc [BR-VAL-007].<br>+ Hiển thị thông báo lỗi [MSG-ERR-VAL-007] và không thực hiện lọc dữ liệu. |
| 2 | Xóa bộ lọc | Nút | Người dùng nhấn nút Xóa bộ lọc.<br>+ Hệ thống xóa toàn bộ giá trị tìm kiếm đã nhập, khôi phục ngày tháng về mặc định (Từ ngày: đầu tháng, Đến ngày: hôm nay).<br>+ Tải lại toàn bộ lưới dữ liệu mặc định. |
| 3 | Kết xuất Excel | Nút | Trường hợp lưới dữ liệu có bản ghi:<br>+ Thực hiện kết xuất danh sách dữ liệu hiện tại ra file định dạng Excel theo mẫu.<br>+ Ghi log kết xuất dữ liệu vào nhật ký hệ thống [III.6]. |
| | | | Trường hợp lưới dữ liệu rỗng:<br>+ Vi phạm quy tắc [BR-EXP-040].<br>+ Hiển thị thông báo lỗi [MSG-WRN-SYS-001] và không tải file. |
| 4 | Xem khoản cần xử lý | Nút cảnh báo | Hiển thị khi hệ thống phát hiện có khoản chi đã quá hạn 3 năm kể từ ngày người yêu cầu nhận thông báo, còn số tiền chưa chi trả và trạng thái thuộc "Chờ chi trả" hoặc "Chi trả một phần". Khi chọn, hệ thống chuyển bộ lọc trạng thái sang "Chưa hoàn thành chi trả" và chỉ hiển thị danh sách khoản chi cần xử lý sung quỹ. |
| 5 | Xem | Row Click | Nhấp chọn row click ở bất kỳ trạng thái nào để mở Màn hình Xem chi tiết đề nghị bồi thường/Tạm ứng [UC450_456.01.MH03] ở chế độ chỉ đọc. |
| 6 | Lập đề nghị | Icon (Lưới) | Nhấp chọn icon Lập đề nghị (chỉ khả dụng với trạng thái "Chờ lập đề nghị").<br>+ Mở Màn hình Lập đề nghị cấp kinh phí/Tạm ứng [UC450_456.01.MH02] ở chế độ biên tập. |
| 7 | Cập nhật đề nghị | Icon (Lưới) | Nhấp chọn icon Cập nhật (chỉ khả dụng với trạng thái "Bị từ chối").<br>+ Mở Màn hình Lập đề nghị cấp kinh phí/Tạm ứng [UC450_456.01.MH02] nạp sẵn dữ liệu cũ, tự động cuộn xuống và focus vào ô "Ý kiến phê duyệt/Lý do từ chối" của Lãnh đạo. |
| 8 | Cập nhật chi trả | Icon (Lưới) | Trường hợp không hợp lệ: Khoản kinh phí không ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần". Hệ thống hiển thị icon dạng không khả dụng và không cho phép thao tác. |
| | | | Trường hợp hợp lệ: Nhấp chọn icon Cập nhật chi trả với khoản kinh phí ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần". Hệ thống mở Màn hình Cập nhật kết quả chi trả thực tế [UC450_456.01.MH05] ở chế độ biên tập. |
| 9 | Sung quỹ Nhà nước | Icon (Lưới) | Trường hợp không hợp lệ: Khoản kinh phí chưa quá hạn 3 năm, không còn số tiền chưa chi trả hoặc trạng thái không thuộc "Chờ chi trả"/"Chi trả một phần". Hệ thống hiển thị icon dạng không khả dụng và không cho phép thao tác. |
| | | | Trường hợp hợp lệ: Khoản kinh phí đã quá hạn 3 năm kể từ ngày người yêu cầu nhận thông báo, còn số tiền chưa chi trả và trạng thái thuộc "Chờ chi trả" hoặc "Chi trả một phần". Hệ thống mở Màn hình Xem chi tiết đề nghị bồi thường/Tạm ứng [UC450_456.01.MH03], hiển thị khối Thông tin sung quỹ Nhà nước để cán bộ nhập và hoàn thành sung quỹ. |
| 10 | Phê duyệt | Icon (Lưới) | Lãnh đạo nhấp chọn icon Phê duyệt (chỉ khả dụng với trạng thái "Chờ duyệt").<br>+ Mở Màn hình Phê duyệt đề xuất cấp kinh phí/Tạm ứng [UC450_456.01.MH04] để xét duyệt hồ sơ. |
| 11 | Từ chối | Icon (Lưới) | Lãnh đạo nhấp chọn icon Từ chối (chỉ khả dụng với trạng thái "Chờ duyệt").<br>+ Mở Màn hình Phê duyệt đề xuất cấp kinh phí/Tạm ứng [UC450_456.01.MH04] để nhập lý do từ chối hồ sơ. |
| 12 | Xóa | Icon (Lưới) | Chuyên viên nhấp chọn icon Xóa (chỉ khả dụng với trạng thái "Chờ lập đề nghị").<br>+ Hiển thị popup xác nhận xóa tùy chỉnh: "Bạn có chắc chắn muốn xóa tờ trình đề xuất kinh phí bồi thường này không?".<br>+ Nếu người dùng nhấn Đồng ý, hệ thống xóa mềm bản ghi khỏi lưới và hiển thị Toast thông báo thành công. |

---

##### 4.3.3.2.3. UC450_456.02 - Lập / Cập nhật đề nghị cấp kinh phí

###### 4.3.3.2.3.1. Mục đích

\- Cho phép Chuyên viên lập tờ trình đề xuất kinh phí bồi thường chính thức hoặc tạm ứng bồi thường chi tiết theo từng hạng mục để gửi trình Lãnh đạo xét duyệt.  

###### 4.3.3.2.3.2. UC450_456.01.MH02 - Màn hình Lập đề nghị cấp kinh phí/Tạm ứng

**Màn hình**:  
![Màn hình lập đề nghị](images/UC450_Create.png)  

**Mô tả thông tin trên màn hình**:  

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung của tờ trình** | | | | |
| Mã đề xuất kinh phí | Decimal(18,0) | Có | Hệ thống tự sinh | Định dạng `KP-YYYY-XXX` (YYYY: Năm hiện tại, XXX: Số tăng dần). Khóa chỉ đọc. |
| Ngày lập đề nghị | Date | Có | Ngày hiện tại | Định dạng `dd/mm/yyyy`. Chỉ đọc. |
| Cán bộ đề xuất xử lý | String(255) | Có | Tên tài khoản | Tên cán bộ đang đăng nhập hệ thống. Chỉ đọc. |
| Nguồn kinh phí đề xuất cấp | Enum(String(50)) | Có | Trống | Lấy dữ liệu từ danh mục `[DM_15]` nguồn kinh phí, gồm:<br>- Ngân sách địa phương (Nguồn dự phòng cấp tỉnh)<br>- Quỹ dự phòng bồi thường Nhà nước (Tạm cấp phát) |
| Cơ quan cấp phát kinh phí | Decimal(18,0) | Có | Trống | Tên cơ quan cấp phát tài chính tương ứng. Tối đa 250 ký tự. |
| Mã vụ việc | String(50) | Có | Trống | Cho phép nhập mã vụ việc yêu cầu bồi thường liên kết để lập đề nghị cấp kinh phí/tạm ứng. Khi chọn vụ việc từ popup, hệ thống tự động điền mã vụ việc vào trường này. |
| Tìm kiếm | - | Không | Hiển thị cạnh trường Mã vụ việc | Khi bấm, hệ thống mở popup chuẩn **4.3.3.1.8. Popup chuẩn Tìm kiếm vụ việc/hồ sơ gốc liên quan**, tự động điền sẵn Mã vụ việc đã nhập vào popup và hiển thị bảng kết quả để người dùng chọn vụ việc phù hợp. |
| Tìm kiếm nâng cao | - | Không | Hiển thị cạnh trường Mã vụ việc | Mở popup chuẩn **4.3.3.1.8** với tiêu đề `Tìm kiếm vụ việc yêu cầu bồi thường liên kết`; nguồn dữ liệu là các vụ việc đủ điều kiện lập đề nghị cấp kinh phí/tạm ứng theo loại đề nghị đang chọn. |
| **II. Bảng nội dung đề xuất cấp tạm ứng** | - | | | Chỉ hiển thị khi loại đề nghị là "Đề nghị tạm ứng". |
| STT | Integer(10) | \- | \- | Chỉ đọc. 1 và 2. |
| Nội dung tạm ứng | Enum(String(255)) | \- | \- | Chỉ đọc. Hiển thị đúng Loại thiệt hại yêu cầu bồi thường trong Hồ sơ gốc liên kết. Chỉ hiển thị các loại thiệt hại đã được tích chọn/có phát sinh yêu cầu bồi thường trong hồ sơ gốc; các loại không tích chọn thì không hiển thị. |
| Mức đề nghị trong hồ sơ gốc (VNĐ) | Decimal(18,0) | \- | \- | Chỉ đọc. Số tiền đề xuất từ hồ sơ gốc (pre-fill từ yêu cầu bồi thường liên kết). |
| Số tiền duyệt cấp tạm ứng (VNĐ) | Decimal(18,0) | Có | Trống | Ô nhập số tiền bồi thường tạm ứng. Cho phép nhập số, tự động định dạng phân tách hàng ngàn. |
| Tổng cộng | Decimal(18,0) | \- | \- | Chỉ đọc. Tự động tính toán tổng số tiền của 2 dòng trên. Hiển thị dạng chữ số và viết bằng chữ. |
| **III. Bảng nội dung đề xuất cấp kinh phí bồi thường** | - | | | Chỉ hiển thị khi loại đề nghị là "Đề nghị cấp kinh phí bồi thường". |
| STT | Integer(10) | \- | \- | Chỉ đọc. Số tăng dần từ 1 đến 6. |
| Loại thiệt hại được yêu cầu | Enum(String(255)) | \- | \- | Chỉ đọc. Hiển thị đúng Loại thiệt hại yêu cầu bồi thường trong Hồ sơ gốc liên kết. Chỉ hiển thị các loại thiệt hại đã được tích chọn/có phát sinh yêu cầu bồi thường trong hồ sơ gốc; các loại không tích chọn thì không hiển thị. |
| Mức đề nghị trong hồ sơ gốc (VNĐ) | Decimal(18,0) | \- | \- | Chỉ đọc. Hiển thị số tiền đề xuất tương ứng từ hồ sơ yêu cầu bồi thường gốc liên kết. |
| Số tiền duyệt cấp bồi thường (VNĐ) | Decimal(18,0) | Có | Trống | Ô nhập tiền duyệt cấp. Tự động format phân tách hàng ngàn. Giới hạn tối đa bằng số tiền hồ sơ gốc. |
| Tổng cộng | Decimal(18,0) | \- | \- | Chỉ đọc. Tự động tính toán tổng số tiền của 6 dòng trên. Hiển thị dạng chữ số và viết bằng chữ. |
| **IV. Thông tin người nhận tạm ứng/bồi thường & phương thức chi trả** | | | | |
| Họ và tên người nhận | String(100) | Có | Pre-fill từ hồ sơ | Họ tên người nhận bồi thường. Chỉ đọc. |
| Giấy tờ thân nhân | String(255) | Có | Pre-fill từ hồ sơ | Loại giấy tờ + Số hiệu. Chỉ đọc. |
| Địa chỉ | String(500) | Có | Pre-fill từ hồ sơ | Địa chỉ liên lạc của người nhận. Chỉ đọc. |
| Phương thức nhận tiền | Decimal(18,0) | Có | Pre-fill từ hồ sơ | Đứng riêng 1 hàng để hiển thị rõ. Hiển thị: "Nhận tiền mặt" hoặc "Nhận qua chuyển khoản". Chỉ đọc. |
| **Nếu Phương thức nhận tiền là "Nhận qua chuyển khoản"** | | | | Hiển thị thêm các trường thông tin ngân hàng dưới đây: |
| Chủ tài khoản | String(255) | Có | Pre-fill | Tên chủ tài khoản thụ hưởng. Chỉ đọc. |
| Số tài khoản | String(255) | Có | Pre-fill | Số tài khoản ngân hàng thụ hưởng. Chỉ đọc. |
| Tên ngân hàng | String(255) | Có | Pre-fill | Tên ngân hàng thụ hưởng. Chỉ đọc. |
| Chi nhánh | String(255) | Có | Pre-fill | Chi nhánh ngân hàng thụ hưởng. Chỉ đọc. |
| Ý kiến đề xuất / Trích yếu nội dung tờ trình | Text(2000) | Có | Trống | Nội dung tờ trình tóm tắt căn cứ cấp phát kinh phí. Tối đa 2000 ký tự. |
| **V. Danh mục tài liệu, tờ trình gửi kèm** | - | | | Bảng chứa danh sách tài liệu đính kèm. Hỗ trợ thêm/xóa dòng. |
| STT | Integer(10) | \- | \- | Chỉ đọc. Số tăng dần. Căn lề giữa. |
| Thành phần hồ sơ / Tên tài liệu | String(255) | Có | Trống | Tên tài liệu đính kèm. Căn lề trái. |
| File đính kèm | File | Có | Trống | Cột chứa nút "Chọn file" để tải tệp PDF lên. Căn lề trái. |
| Thao tác | - | \- | \- | Cột chứa liên kết: "Xem file" (nếu đã tải lên) và "Xóa" dòng. Căn lề giữa. |

**Chức năng trên màn hình**:  

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Tìm kiếm | Nút | Trường hợp chưa nhập Mã vụ việc: Vi phạm [BR-VAL-001], hệ thống tô viền đỏ ô nhập và hiển thị cảnh báo lỗi [MSG-ERR-VAL-001]. |
| | | | Trường hợp có nhập Mã vụ việc: Hệ thống mở popup chuẩn **4.3.3.1.8** giống thao tác `Tìm kiếm nâng cao`, tự động điền sẵn Mã vụ việc vào trường tìm kiếm của popup và hiển thị `Bảng kết quả tìm kiếm` để người dùng chọn vụ việc phù hợp. |
| | | | Trường hợp không tìm thấy vụ việc phù hợp: Trong popup chuẩn **4.3.3.1.8**, hệ thống hiển thị `Bảng kết quả tìm kiếm` trống; phần thân bảng hiển thị thông báo theo MessageList, không tự động điền dữ liệu vào form. |
| | | | Trường hợp người dùng chọn vụ việc: Hệ thống tự động điền thông tin vụ việc liên kết, thông tin người yêu cầu, bảng nội dung đề xuất tương ứng với loại đề nghị đang chọn và đóng popup. |
| 2 | Tìm kiếm nâng cao | Nút | Mở popup chuẩn **4.3.3.1.8** với nguồn dữ liệu vụ việc đủ điều kiện lập đề nghị cấp kinh phí/tạm ứng. Người dùng tìm kiếm theo các tiêu chí trên popup và chọn vụ việc phù hợp để tự động điền dữ liệu về form. |
| 3 | Thêm thành phần hồ sơ mới | Nút | Người dùng bấm nút.<br>+ Hệ thống chèn thêm một hàng trống mới vào bảng tài liệu đính kèm bên trên. |
| 4 | Trình phê duyệt | Nút | Trường hợp dữ liệu nhập hợp lệ:<br>+ Hệ thống kiểm tra dữ liệu và lưu tờ trình thành công.<br>+ Trạng thái đề nghị chuyển sang "Chờ duyệt".<br>+ Đóng modal form, hiển thị thông báo thành công và làm mới danh sách lưới dữ liệu bên ngoài.<br>+ Ghi log tạo mới/cập nhật tờ trình kinh phí vào nhật ký hệ thống [III.6]. |
| | | | Trường hợp có trường bắt buộc bị bỏ trống hoặc không chọn file tài liệu đính kèm:<br>+ Vi phạm quy tắc [BR-VAL-001] hoặc [BR-FILE-010].<br>+ Tô đỏ viền trường trống đầu tiên bằng class `.is-invalid`, hiển thị dòng cảnh báo lỗi màu đỏ dưới ô nhập: "Đây là trường bắt buộc".<br>+ Tự động focus con trỏ vào ô nhập lỗi đầu tiên để người dùng xử lý. Không đóng modal form. |
| 5 | Đóng | Nút | Người dùng nhấn nút Đóng ở chân modal.<br>+ Hệ thống hiển thị popup xác nhận: "Bạn có chắc chắn muốn đóng biểu mẫu và hủy bỏ các thay đổi đang nhập không?".<br>+ Nếu người dùng chọn Đồng ý, đóng modal form và không lưu dữ liệu. |

---

##### 4.3.3.2.4. UC450_456.03 - Xem chi tiết đề nghị bồi thường

###### 4.3.3.2.4.1. Mục đích

\- Cho phép người dùng xem toàn bộ thông tin đề nghị tạm ứng/cấp kinh phí bồi thường theo dữ liệu đã lập và trạng thái xử lý hiện tại.

\- Màn hình hiển thị dữ liệu ở chế độ chỉ đọc, đồng thời hiển thị các nút thao tác phù hợp theo vai trò người dùng và trạng thái đề nghị.

###### 4.3.3.2.4.2. UC450_456.01.MH03 - Màn hình Xem chi tiết đề nghị kinh phí

**Màn hình**:  
![Màn hình xem chi tiết](images/UC450_Detail.png)  

**Nguyên tắc hiển thị**:

\- Toàn bộ thông tin nghiệp vụ trên màn hình hiển thị ở chế độ chỉ đọc, không cho phép chỉnh sửa trực tiếp tại màn hình xem chi tiết.

\- Không hiển thị nút `Thêm thành phần hồ sơ mới`, không hiển thị liên kết `Xóa` tại danh sách tài liệu đính kèm.

\- Đối với file đính kèm, chỉ hiển thị tên file và liên kết `Xem file`; cho phép xem file tại một tab riêng.

\- Các thao tác xử lý tiếp theo được hiển thị ở thanh nút cuối màn hình theo đúng vai trò và trạng thái đề nghị.

**Mô tả thông tin trên màn hình**:

**I. Thông tin chung đề nghị kinh phí**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Mã đề xuất kinh phí | String(50) | Không | Theo đề nghị | Chỉ đọc. Hiển thị mã đề xuất kinh phí do hệ thống cấp/lưu theo đề nghị. |
| Loại đề nghị cấp kinh phí | Enum(String(100)) | Không | Theo đề nghị | Chỉ đọc. Giá trị hiển thị gồm "Đề nghị tạm ứng" hoặc "Đề nghị cấp kinh phí bồi thường". |
| Ngày lập đề nghị | Date | Không | Theo đề nghị | Chỉ đọc. Hiển thị ngày lập đề nghị theo định dạng `dd/mm/yyyy`. |
| Cán bộ đề xuất xử lý | String(255) | Không | Theo đề nghị | Chỉ đọc. Hiển thị cán bộ lập/cập nhật đề nghị. |
| Nguồn kinh phí đề xuất cấp | Enum(String(100)) | Không | Theo đề nghị | Chỉ đọc. Hiển thị nguồn kinh phí đã chọn khi lập đề nghị. |
| Cơ quan cấp phát kinh phí | String(255) | Không | Theo đề nghị | Chỉ đọc. Hiển thị cơ quan cấp phát kinh phí. |
| Trạng thái đề nghị | Enum(String(50)) | Không | Theo đề nghị | Chỉ đọc. Hiển thị trạng thái đề nghị dưới dạng badge, gồm các trạng thái như "Chờ lập đề nghị", "Chờ duyệt", "Bị từ chối", "Chờ chi trả", "Chi trả một phần", "Đã sung quỹ", "Hoàn thành". |
| Mã vụ việc yêu cầu bồi thường liên kết | String(50) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị mã vụ việc yêu cầu bồi thường liên kết; cho phép mở chi tiết vụ việc gốc trong cùng tab tại module Giải quyết yêu cầu bồi thường. |
| Tên vụ việc | String(255) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị tên vụ việc yêu cầu bồi thường liên kết. |
| Tỉnh/TP | Enum(String(100)) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị tỉnh/thành phố của người yêu cầu hoặc địa bàn phát sinh vụ việc. |
| Địa chỉ chi tiết | String(500) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị địa chỉ chi tiết của người yêu cầu/vụ việc. |
| Cơ quan chịu trách nhiệm | String(255) | Không | Theo vụ việc liên kết | Chỉ đọc. Kế thừa từ vụ việc yêu cầu bồi thường liên kết. |
| Lĩnh vực gây thiệt hại | Enum(String(100)) | Không | Theo vụ việc liên kết | Chỉ đọc. Kế thừa từ vụ việc yêu cầu bồi thường liên kết, tham chiếu danh mục Lĩnh vực gây thiệt hại. |
| Số tiền gốc theo vụ việc (VNĐ) | Decimal(18,0) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị tổng số tiền gốc theo vụ việc yêu cầu bồi thường liên kết. |

**II. Thông tin người yêu cầu bồi thường**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ và tên người yêu cầu bồi thường | String(255) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị người yêu cầu bồi thường/đại diện nhận kinh phí. |
| Tư cách người yêu cầu bồi thường | Enum(String(100)) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị tư cách người yêu cầu bồi thường. |
| Giới tính | Enum(String(20)) | Không | Theo vụ việc liên kết | Chỉ đọc. Tham chiếu danh mục Giới tính. |
| Ngày tháng năm sinh | Date | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị ngày sinh theo định dạng `dd/mm/yyyy`. |
| Số điện thoại liên hệ | String(20) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị số điện thoại liên hệ, áp dụng [BR-VAL-003] khi dữ liệu được nhập/cập nhật ở màn hình nguồn. |
| Thư điện tử (Email) | String(255) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị email, áp dụng [BR-VAL-002] khi dữ liệu được nhập/cập nhật ở màn hình nguồn. |
| Loại giấy tờ thân nhân | Enum(String(50)) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị loại giấy tờ thân nhân. |
| Số giấy tờ thân nhân | String(50) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị số giấy tờ thân nhân. |
| Ngày cấp | Date | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị ngày cấp giấy tờ. |
| Nơi cấp | String(255) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị nơi cấp giấy tờ. |
| Quốc gia | Enum(String(50)) | Không | Theo vụ việc liên kết | Chỉ đọc. Tham chiếu danh mục Quốc gia. |
| Tỉnh/TP | Enum(String(100)) | Không | Theo vụ việc liên kết | Chỉ đọc. Tham chiếu danh mục Tỉnh/Thành phố khi Quốc gia là "Việt Nam". |
| Địa chỉ chi tiết | String(500) | Không | Theo vụ việc liên kết | Chỉ đọc. Hiển thị địa chỉ chi tiết của người yêu cầu/người nhận. |

**III. Bảng nội dung đề xuất cấp tạm ứng**

Bảng này chỉ hiển thị khi `Loại đề nghị cấp kinh phí` là "Đề nghị tạm ứng".

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| STT | Integer(10) | Không | Tự tăng | Chỉ đọc. Số thứ tự dòng trong bảng. |
| Nội dung tạm ứng | Enum(String(255)) | Không | Theo hồ sơ gốc liên kết | Chỉ đọc. Hiển thị đúng Loại thiệt hại yêu cầu bồi thường trong Hồ sơ gốc liên kết. Chỉ hiển thị các loại thiệt hại đã được tích chọn/có phát sinh yêu cầu bồi thường trong hồ sơ gốc; các loại không tích chọn thì không hiển thị. |
| Mức đề nghị trong hồ sơ gốc (VNĐ) | Decimal(18,0) | Không | Theo hồ sơ gốc liên kết | Chỉ đọc. Hiển thị số tiền đề nghị tương ứng với loại thiệt hại trong hồ sơ gốc. |
| Số tiền duyệt cấp tạm ứng (VNĐ) | Decimal(18,0) | Không | Theo đề nghị | Chỉ đọc. Hiển thị số tiền đã nhập/lưu khi lập hoặc cập nhật đề nghị tạm ứng. |
| Tổng cộng | Decimal(18,0) | Không | Hệ thống tính | Chỉ đọc. Tổng số tiền duyệt cấp tạm ứng của các dòng đang hiển thị. |

**IV. Bảng nội dung đề xuất cấp kinh phí bồi thường**

Bảng này chỉ hiển thị khi `Loại đề nghị cấp kinh phí` là "Đề nghị cấp kinh phí bồi thường".

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| STT | Integer(10) | Không | Tự tăng | Chỉ đọc. Số thứ tự dòng trong bảng. |
| Loại thiệt hại được yêu cầu | Enum(String(255)) | Không | Theo hồ sơ gốc liên kết | Chỉ đọc. Hiển thị đúng Loại thiệt hại yêu cầu bồi thường trong Hồ sơ gốc liên kết. Chỉ hiển thị các loại thiệt hại đã được tích chọn/có phát sinh yêu cầu bồi thường trong hồ sơ gốc; các loại không tích chọn thì không hiển thị. |
| Mức đề nghị trong hồ sơ gốc (VNĐ) | Decimal(18,0) | Không | Theo hồ sơ gốc liên kết | Chỉ đọc. Hiển thị số tiền đề nghị tương ứng với loại thiệt hại trong hồ sơ gốc. |
| Số tiền duyệt cấp bồi thường (VNĐ) | Decimal(18,0) | Không | Theo đề nghị | Chỉ đọc. Hiển thị số tiền đã nhập/lưu khi lập hoặc cập nhật đề nghị cấp kinh phí bồi thường. |
| Tổng kinh phí duyệt cấp | Decimal(18,0) | Không | Hệ thống tính | Chỉ đọc. Tổng số tiền duyệt cấp bồi thường. |
| Số tiền tạm ứng đã cấp | Decimal(18,0) | Không | Theo dữ liệu hệ thống | Chỉ đọc. Hiển thị số tiền tạm ứng đã cấp trước đó nếu có. |
| Số tiền thực nhận còn lại | Decimal(18,0) | Không | Hệ thống tính | Chỉ đọc. Số tiền còn lại sau khi trừ số tiền tạm ứng đã cấp. |

**V. Thông tin người nhận tạm ứng/bồi thường và phương thức chi trả**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Họ và tên người nhận | String(255) | Không | Theo đề nghị | Chỉ đọc. Hiển thị người nhận tạm ứng/bồi thường. |
| Giấy tờ thân nhân | String(100) | Không | Theo đề nghị | Chỉ đọc. Hiển thị thông tin giấy tờ người nhận. |
| Địa chỉ | String(500) | Không | Theo đề nghị | Chỉ đọc. Hiển thị địa chỉ người nhận. |
| Phương thức nhận tiền | Enum(String(50)) | Không | Theo đề nghị | Chỉ đọc. Giá trị gồm "Chuyển khoản qua ngân hàng" hoặc "Tiền mặt". |
| Chủ tài khoản | String(255) | Không | Theo đề nghị | Chỉ đọc. Hiển thị khi phương thức nhận tiền là "Chuyển khoản qua ngân hàng". |
| Số tài khoản | String(50) | Không | Theo đề nghị | Chỉ đọc. Hiển thị khi phương thức nhận tiền là "Chuyển khoản qua ngân hàng". |
| Tên ngân hàng | String(255) | Không | Theo đề nghị | Chỉ đọc. Hiển thị khi phương thức nhận tiền là "Chuyển khoản qua ngân hàng". |
| Chi nhánh | String(255) | Không | Theo đề nghị | Chỉ đọc. Hiển thị khi phương thức nhận tiền là "Chuyển khoản qua ngân hàng". |

**VI. Nội dung tờ trình và tài liệu gửi kèm**

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Ý kiến đề xuất / Trích yếu nội dung tờ trình | Text(2000) | Không | Theo đề nghị | Chỉ đọc. Hiển thị nội dung tờ trình đã lưu. |
| STT tài liệu | Integer(10) | Không | Tự tăng | Chỉ đọc. Số thứ tự dòng tài liệu. |
| Thành phần hồ sơ / Tên tài liệu | String(255) | Không | Theo đề nghị | Chỉ đọc. Hiển thị tên tài liệu gửi kèm. |
| File đính kèm | File | Không | Theo đề nghị | Chỉ đọc. Hiển thị tên file đã đính kèm; cho phép xem file tại một tab riêng. |
| Thao tác tài liệu | String(100) | Không | Theo từng file | Chỉ hiển thị liên kết `Xem file`; không hiển thị liên kết `Xóa` tại màn hình xem chi tiết. |

**VII. Thông tin xét duyệt tờ trình**

Khối này hiển thị khi đề nghị đã phát sinh dữ liệu phê duyệt/từ chối hoặc trạng thái thuộc nhóm "Bị từ chối", "Chờ chi trả", "Chi trả một phần", "Đã sung quỹ", "Hoàn thành".

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Ý kiến phê duyệt / Lý do từ chối tờ trình | Text(2000) | Không | Theo dữ liệu xét duyệt | Chỉ đọc. Hiển thị ý kiến phê duyệt hoặc lý do từ chối của lãnh đạo. |
| Lịch sử ý kiến Lãnh đạo | Text(4000) | Không | Theo dữ liệu xử lý | Chỉ đọc. Hiển thị lịch sử ý kiến lãnh đạo nếu đề nghị có phát sinh từ chối/phê duyệt trước đó. |
| Thời gian xử lý | Datetime | Không | Theo dữ liệu xử lý | Chỉ đọc. Hiển thị thời điểm phát sinh ý kiến xử lý. |
| Người xử lý | String(255) | Không | Theo dữ liệu xử lý | Chỉ đọc. Hiển thị lãnh đạo/cán bộ đã thực hiện tác vụ xử lý. |

**VIII. Thông tin thông báo nhận kinh phí và hạn 3 năm**

Khối này hiển thị đối với đề nghị ở trạng thái "Chờ chi trả", "Chi trả một phần", "Đã sung quỹ" hoặc "Hoàn thành" nếu đã phát sinh thông tin thông báo. Đối với trạng thái "Chờ chi trả" hoặc "Chi trả một phần", cán bộ được phép lưu/cập nhật thông tin thông báo để bắt đầu tính hạn 3 năm. Khi đã lưu thông báo, nút hiển thị là "Cập nhật thông báo"; khi chưa có thông tin thông báo, nút hiển thị là "Lưu thông báo".

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Ngày người yêu cầu nhận thông báo | Date | Có khi lưu/cập nhật thông báo | Trống hoặc theo dữ liệu thông báo | Ngày bắt đầu tính hạn nhận kinh phí 3 năm. Định dạng `dd/mm/yyyy`. Khi hồ sơ không ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần", trường hiển thị Chỉ đọc. |
| Hạn nhận kinh phí | Date | Không | Hệ thống tính | Chỉ đọc. Bằng ngày người yêu cầu nhận thông báo cộng 3 năm. Đây là mốc hệ thống dùng để cảnh báo khoản chi chưa hoàn thành và xác định điều kiện sung quỹ Nhà nước. |
| Tệp chứng minh đã thông báo | File | Có khi lưu/cập nhật thông báo | Trống hoặc theo dữ liệu thông báo | Cho phép upload đồng thời nhiều file chứng minh đã thông báo. Hỗ trợ xem file tại một tab riêng và xóa file trước khi lưu. Kiểm tra file theo [BR-FILE-010]. Khi hồ sơ không ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần", danh sách file hiển thị Chỉ đọc. |
| Ghi chú thông báo | Text(1000) | Không | Trống hoặc theo dữ liệu thông báo | Nhập ghi chú quá trình gửi/nhận thông báo. Khi hồ sơ không ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần", trường hiển thị Chỉ đọc. |

**IX. Thông tin theo dõi hạn nhận kinh phí / sung quỹ**

Khối này hiển thị khi đã phát sinh ngày người yêu cầu nhận thông báo. Hệ thống tự động đối chiếu hạn 3 năm với số tiền còn chưa chi trả để hiển thị trạng thái theo dõi.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số tiền còn phải chi (VNĐ) | Decimal(18,0) | Không | Hệ thống tính | Chỉ đọc. Bằng tổng số tiền được duyệt trừ số tiền thực tế đã chi trả. |
| Tình trạng hạn nhận kinh phí | String(255) | Không | Hệ thống tính | Chỉ đọc. Hiển thị "Cần theo dõi" khi còn trong hạn cảnh báo, "Đủ điều kiện lập đề nghị sung quỹ" khi đã quá hạn 3 năm và còn số tiền chưa chi trả, hoặc "Đã sung quỹ Nhà nước" khi trạng thái hồ sơ là "Đã sung quỹ". |
| Số ngày quá hạn/còn hạn | Integer(10) | Không | Hệ thống tính | Chỉ đọc. Nếu quá hạn, hiển thị số ngày quá hạn. Nếu chưa quá hạn nhưng còn trong ngưỡng cảnh báo, hiển thị số ngày còn lại đến hạn. |

**X. Thông tin sung quỹ Nhà nước**

Khối này hiển thị khi đề nghị đã phát sinh dữ liệu sung quỹ hoặc khi cán bộ chọn thao tác "Sung quỹ" đối với khoản chi đủ điều kiện: đã quá hạn 3 năm kể từ ngày người yêu cầu nhận thông báo, còn số tiền chưa chi trả và trạng thái thuộc "Chờ chi trả" hoặc "Chi trả một phần". Khi mở từ thao tác "Sung quỹ", hệ thống cho phép nhập dữ liệu; khi hồ sơ ở trạng thái "Đã sung quỹ", toàn bộ khối hiển thị Chỉ đọc.

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Số chứng từ / quyết định sung quỹ | String(100) | Có khi hoàn thành sung quỹ | Trống hoặc theo dữ liệu sung quỹ | Nhập số chứng từ/quyết định sung quỹ. Khi hồ sơ ở trạng thái "Đã sung quỹ", trường hiển thị Chỉ đọc. |
| Ngày sung quỹ | Date | Có khi hoàn thành sung quỹ | Ngày hiện tại hoặc theo dữ liệu sung quỹ | Định dạng `dd/mm/yyyy`. Khi hồ sơ ở trạng thái "Đã sung quỹ", trường hiển thị Chỉ đọc. |
| Số tiền sung quỹ (VNĐ) | Decimal(18,0) | Có khi hoàn thành sung quỹ | Số tiền còn phải chi | Số tiền sung quỹ phải bằng số tiền còn phải chi tại thời điểm thực hiện. Kiểm tra số tiền dương theo [BR-VAL-010]. Khi hồ sơ ở trạng thái "Đã sung quỹ", trường hiển thị Chỉ đọc. |
| Căn cứ / lý do sung quỹ | Text(2000) | Có khi hoàn thành sung quỹ | Gợi ý theo điều kiện quá hạn | Nhập căn cứ/lý do sung quỹ do quá hạn 3 năm kể từ ngày người yêu cầu nhận thông báo nhưng chưa hoàn thành chi trả. Khi hồ sơ ở trạng thái "Đã sung quỹ", trường hiển thị Chỉ đọc. |
| Tài liệu liên quan | File | Có khi hoàn thành sung quỹ | Trống hoặc theo dữ liệu sung quỹ | Cho phép upload đồng thời nhiều tài liệu liên quan đến sung quỹ. Hỗ trợ xem file tại một tab riêng và xóa file trước khi hoàn thành sung quỹ. Kiểm tra file theo [BR-FILE-010]. Khi hồ sơ ở trạng thái "Đã sung quỹ", danh sách file hiển thị Chỉ đọc. |

**Chức năng trên màn hình**:

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Lập đề nghị | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ lập đề nghị" và người dùng là Chuyên viên. Khi chọn, hệ thống mở **4.3.3.2.3.2. UC450_456.01.MH02 - Màn hình Lập đề nghị cấp kinh phí/Tạm ứng** ở chế độ biên tập. |
| 2 | Cập nhật đề nghị | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Bị từ chối" và người dùng là Chuyên viên. Khi chọn, hệ thống mở **4.3.3.2.3.2. UC450_456.01.MH02 - Màn hình Lập đề nghị cấp kinh phí/Tạm ứng** ở chế độ cập nhật, nạp dữ liệu đề nghị đã lưu và hiển thị lý do từ chối để cán bộ điều chỉnh. |
| 3 | Cập nhật chi trả | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần" và người dùng là Chuyên viên. Khi chọn, hệ thống mở **4.3.3.2.6.2. UC450_456.01.MH05 - Màn hình Cập nhật kết quả chi trả thực tế**. |
| 4 | Lưu thông báo | Nút trên khối thông báo | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần", người dùng là Chuyên viên và chưa có thông tin thông báo nhận kinh phí. |
| | | | Trường hợp bỏ trống trường bắt buộc: Vi phạm quy tắc [BR-VAL-001] hoặc [BR-FILE-010]. Hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-001]/[MSG-ERR-FILE-001]/[MSG-ERR-FILE-002] và không lưu thông báo. |
| | | | Trường hợp hợp lệ: Cán bộ nhập ngày người yêu cầu nhận thông báo và tải lên tệp chứng minh. Hệ thống lưu thông tin thông báo, tự động tính hạn nhận kinh phí bằng ngày nhận thông báo cộng 3 năm, đổi nút thành "Cập nhật thông báo" và cập nhật lại cột "Hạn nhận / Sung quỹ" trên danh sách. |
| 5 | Cập nhật thông báo | Nút trên khối thông báo | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ chi trả" hoặc "Chi trả một phần", người dùng là Chuyên viên và đã có thông tin thông báo nhận kinh phí. |
| | | | Trường hợp bỏ trống trường bắt buộc: Vi phạm quy tắc [BR-VAL-001] hoặc [BR-FILE-010]. Hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-001]/[MSG-ERR-FILE-001]/[MSG-ERR-FILE-002] và không cập nhật thông báo. |
| | | | Trường hợp hợp lệ: Cán bộ chỉnh sửa thông tin thông báo đã lưu. Hệ thống cập nhật ngày nhận thông báo, danh sách file chứng minh, ghi chú, tự động tính lại hạn 3 năm và cập nhật lại cột "Hạn nhận / Sung quỹ" trên danh sách. |
| 6 | Sung quỹ | Nút | Chỉ hiển thị khi người dùng là Chuyên viên, khoản kinh phí đã quá hạn 3 năm kể từ ngày người yêu cầu nhận thông báo, còn số tiền chưa chi trả và trạng thái thuộc "Chờ chi trả" hoặc "Chi trả một phần". Khi chọn, hệ thống mở khối **X. Thông tin sung quỹ Nhà nước**, tự động gợi ý số tiền sung quỹ bằng số tiền còn phải chi và hiển thị nút "Hoàn thành sung quỹ". |
| 7 | Hoàn thành sung quỹ | Nút | Chỉ hiển thị sau khi cán bộ chọn nút "Sung quỹ" và khối **X. Thông tin sung quỹ Nhà nước** đang ở chế độ nhập liệu. |
| | | | Trường hợp bỏ trống trường bắt buộc: Vi phạm quy tắc [BR-VAL-001] hoặc [BR-FILE-010]. Hệ thống hiển thị cảnh báo lỗi [MSG-ERR-VAL-001]/[MSG-ERR-FILE-001]/[MSG-ERR-FILE-002] và không lưu sung quỹ. |
| | | | Trường hợp dữ liệu không hợp lệ: Ngày sung quỹ không đúng định dạng `dd/mm/yyyy` hoặc số tiền sung quỹ không phải số dương theo [BR-VAL-010], hoặc số tiền sung quỹ khác số tiền còn phải chi. Hệ thống hiển thị cảnh báo lỗi tương ứng và không lưu sung quỹ. |
| | | | Trường hợp hợp lệ: Cán bộ nhập đầy đủ số chứng từ/quyết định sung quỹ, ngày sung quỹ, số tiền sung quỹ, căn cứ/lý do và tài liệu liên quan. Hệ thống lưu thông tin sung quỹ, chuyển trạng thái đề nghị thành "Đã sung quỹ", cập nhật số tiền thực tế đã chi trả/số tiền còn phải chi, đóng màn hình chi tiết và làm mới danh sách. |
| 8 | Phê duyệt | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt" và người dùng là Lãnh đạo. Khi chọn, hệ thống mở **4.3.3.2.5.2. UC450_456.01.MH04 - Màn hình Xét duyệt tờ trình cấp kinh phí bồi thường** để phê duyệt. |
| 9 | Từ chối | Nút | Chỉ hiển thị khi hồ sơ ở trạng thái "Chờ duyệt" và người dùng là Lãnh đạo. Khi chọn, hệ thống mở **4.3.3.2.5.2. UC450_456.01.MH04 - Màn hình Xét duyệt tờ trình cấp kinh phí bồi thường** để nhập lý do từ chối. |
| 10 | Xem file | Link | Cho phép xem file tại một tab riêng. |
| 11 | Đóng | Nút | Hệ thống đóng màn hình xem chi tiết và quay về danh sách đề nghị kinh phí. |

---
##### 4.3.3.2.5. UC450_456.04 - Phê duyệt / Từ chối đề xuất cấp kinh phí (Lãnh đạo)

###### 4.3.3.2.5.1. Mục đích

\- Cho phép Lãnh đạo cơ quan xem xét tờ trình đề xuất kinh phí bồi thường/tạm ứng, đưa ra ý kiến chỉ đạo và thực hiện phê duyệt hoặc từ chối cấp phát kinh phí.  

###### 4.3.3.2.5.2. UC450_456.01.MH04 - Màn hình Xét duyệt tờ trình cấp kinh phí bồi thường

**Màn hình**:  
![Màn hình xét duyệt](images/UC450_Approval.png)  

**Mô tả thông tin trên màn hình**:  
\- Màn hình hiển thị toàn bộ thông tin tờ trình ở trạng thái Chỉ đọc tương tự như màn hình Xem chi tiết.  
\- Hiển thị thêm khối: **IV. PHÊ DUYỆT ĐỀ XUẤT (DÀNH CHO LÃNH ĐẠO)** ở phía dưới biểu mẫu:  

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Ý kiến phê duyệt / Lý do từ chối tờ trình | Text(2000) | Có | Trống | Nhập nội dung phê duyệt hoặc lý do từ chối. Tối đa 2000 ký tự. |

**Chức năng trên màn hình**:  

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Phê duyệt | Nút (Footer) | Trường hợp nhập đầy đủ ý kiến chỉ đạo và bấm Phê duyệt:<br>+ Hiển thị popup xác nhận tùy chỉnh: "Bạn có chắc chắn muốn phê duyệt cấp phát kinh phí bồi thường cho tờ trình này không?".<br>+ Nếu chọn Đồng ý, hệ thống đổi trạng thái đề xuất thành "Chờ chi trả".<br>+ Ghi nhận ý kiến chỉ đạo, đóng biểu mẫu, hiển thị thông báo thành công và cập nhật trạng thái trên lưới.<br>+ Ghi log thao tác ký số phê duyệt vào nhật ký hệ thống [III.6]. |
| | | | Trường hợp ô Ý kiến phê duyệt bị bỏ trống:<br>+ Vi phạm quy tắc [BR-VAL-001].<br>+ Thực hiện bôi đỏ viền ô textarea, hiển thị cảnh báo: "Đây là trường bắt buộc" và focus con trỏ vào ô nhập. Không duyệt hồ sơ. |
| 2 | Từ chối | Nút (Footer) | Trường hợp nhập đầy đủ lý do từ chối và bấm Từ chối:<br>+ Hiển thị popup xác nhận tùy chỉnh: "Bạn có chắc chắn muốn từ chối phê duyệt tờ trình cấp kinh phí bồi thường này không?".<br>+ Nếu chọn Đồng ý, hệ thống đổi trạng thái đề xuất thành "Bị từ chối".<br>+ Đóng biểu mẫu, hiển thị thông báo thành công và cập nhật trạng thái trên lưới.<br>+ Ghi log từ chối phê duyệt vào nhật ký hệ thống [III.6]. |
| | | | Trường hợp ô Lý do từ chối bị bỏ trống:<br>+ Vi phạm quy tắc [BR-VAL-001].<br>+ Thực hiện bôi đỏ viền ô textarea, hiển thị cảnh báo: "Đây là trường bắt buộc" và focus con trỏ vào ô nhập. Không từ chối hồ sơ. |
| 3 | Đóng | Nút (Footer) | Người dùng nhấn nút Đóng.<br>+ Hệ thống thực hiện đóng modal xét duyệt ngay lập tức, hủy bỏ các thay đổi tạm thời trên ô ý kiến chỉ đạo. |

---

##### 4.3.3.2.6. UC450_456.05 - Cập nhật kết quả chi trả thực tế (Cán bộ)

###### 4.3.3.2.6.1. Mục đích

\- Cho phép Chuyên viên cập nhật kết quả giải ngân và chi trả kinh phí/tạm ứng thực tế đến tay người nhận bồi thường để chuyển tiếp hồ sơ sang trạng thái Hoàn thành.  

###### 4.3.3.2.6.2. UC450_456.01.MH05 - Màn hình Cập nhật kết quả chi trả thực tế

**Màn hình**:  
![Màn hình cập nhật chi trả](images/UC450_Payout.png)  

**Mô tả thông tin trên màn hình**:  
\- Màn hình hiển thị thông tin chung của tờ trình và bảng phân rã kinh phí đã duyệt ở chế độ chỉ đọc.  
\- Tại phần Chờ chi trả của Đề nghị cấp kinh phí bồi thường, hiển thị thêm khối thông tin **Thông tin người nhận và Phương thức chi trả** ở chế độ chỉ đọc (bao gồm các thông tin họ tên người nhận, giấy tờ thân nhân, địa chỉ, phương thức nhận tiền và chi tiết tài khoản ngân hàng nếu có).  
\- Hiển thị thêm khối: **V. THÔNG TIN CHI TRẢ THỰC TẾ** ở phía dưới biểu mẫu:  

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Ngày thực hiện chi trả | Date | Có | Ngày hiện tại | Định dạng `dd/mm/yyyy`. Chỉ hiển thị ngày nhỏ hơn ngày hiện tại [BR-VAL-008]. |
| Số tiền thực tế chi trả (VNĐ) | Decimal(18,0) | Có | Pre-fill số đã duyệt | Cho phép chỉnh sửa. Tự động format phân tách hàng ngàn. Chỉ cho phép nhập số. |
| Phương thức chi trả thực tế | Enum(String(50)) | Có | Chuyển khoản qua ngân hàng | Lựa chọn phương thức gồm:<br>- Chuyển khoản qua ngân hàng<br>- Tiền mặt |
| **Nếu chọn: Chuyển khoản qua ngân hàng** | | | | Hiển thị thêm các trường thông tin ngân hàng bên dưới: |
| Số tài khoản chuyển | String(255) | Có | Trống | Nhập số tài khoản ngân hàng thực hiện chuyển tiền bồi thường. |
| Tên chủ tài khoản nhận | String(255) | Có | Tên người nhận | Họ tên chủ tài khoản nhận tiền bồi thường. |
| Tên ngân hàng nhận | String(255) | Có | Trống | Tên ngân hàng nhận. |
| Chi nhánh | String(255) | Có | Trống | Tên chi nhánh ngân hàng nhận. |
| **Nếu chọn: Tiền mặt** | | | | Hiển thị thêm trường thông tin biên lai bên dưới: |
| Số biên lai nhận tiền mặt | Decimal(18,0) | Có | Trống | Nhập số hiệu biên lai chi tiền mặt. |
| Ý kiến / Nội dung thực hiện chi trả | Text(2000) | Không | Trống | Nhập nội dung ghi chú quá trình chi trả. Tối đa 1000 ký tự. |
| Chứng từ chi trả đính kèm | File | Có | Trống | Tải lên file chứng từ giải ngân (.pdf), dung lượng tối đa 20MB [BR-FILE-010]. Hiển thị link "Xem file" và "Xóa" ngay sau khi tải lên thành công. |
| **VI. Thông tin thông báo nhận kinh phí và hạn 3 năm** | | | | Hiển thị trong màn hình cập nhật kết quả chi trả để cán bộ ghi nhận thông tin thông báo cho trường hợp người yêu cầu bồi thường chưa nhận hoặc chưa nhận đủ kinh phí. |
| Ngày người yêu cầu nhận thông báo | Date | Có khi lưu thông tin thông báo | Trống hoặc theo dữ liệu đã lưu | Ngày bắt đầu tính hạn nhận kinh phí 3 năm. Định dạng `dd/mm/yyyy`. |
| Hạn nhận kinh phí | Date | Không | Hệ thống tính | Chỉ đọc. Bằng ngày người yêu cầu nhận thông báo cộng 3 năm. |
| Tệp chứng minh đã thông báo | File | Có khi lưu thông tin thông báo | Trống hoặc theo dữ liệu đã lưu | Cho phép upload file chứng minh đã thông báo. Hỗ trợ xem file tại một tab riêng và xóa file trước khi lưu. Kiểm tra file theo [BR-FILE-010]. |
| Ghi chú thông báo | Text(1000) | Không | Trống hoặc theo dữ liệu đã lưu | Nhập ghi chú quá trình gửi/nhận thông báo. |
| **VII. Theo dõi hạn nhận kinh phí / sung quỹ** | | | | Hiển thị khi đã có ngày người yêu cầu nhận thông báo và hồ sơ còn số tiền chưa chi trả. |
| Số tiền còn phải chi (VNĐ) | Decimal(18,0) | Không | Hệ thống tính | Chỉ đọc. Bằng tổng số tiền được duyệt trừ số tiền thực tế đã chi trả. |
| Tình trạng hạn nhận kinh phí | String(255) | Không | Hệ thống tính | Chỉ đọc. Hiển thị tình trạng theo dõi hạn 3 năm: còn hạn/cần theo dõi, đủ điều kiện sung quỹ hoặc đã sung quỹ Nhà nước. |
| Chứng từ sung quỹ | File | Không | Theo dữ liệu sung quỹ | Chỉ đọc. Hiển thị khi hồ sơ đã phát sinh thông tin sung quỹ; cho phép xem file tại một tab riêng. |

**Chức năng trên màn hình**:  

| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Hoàn thành chi trả | Nút (Footer) | Trường hợp nhập đầy đủ thông tin và tải lên file chứng từ hợp lệ:<br>+ Hệ thống đổi trạng thái đề xuất thành "Hoàn thành".<br>+ Đóng biểu mẫu, hiển thị Toast thông báo thành công và cập nhật lại lưới danh sách.<br>+ Ghi log hoàn thành chi trả thực tế vào nhật ký hệ thống [III.6]. |
| | | | Trường hợp có trường bắt buộc bị bỏ trống hoặc không tải lên chứng từ đính kèm:<br>+ Vi phạm quy tắc [BR-VAL-001] hoặc [BR-FILE-010].<br>+ Tô đỏ viền trường trống đầu tiên bằng class `.is-invalid`, hiển thị cảnh báo: "Đây là trường bắt buộc" dưới ô nhập và focus con trỏ vào ô nhập lỗi đầu tiên đó. Không lưu chi trả. |
| 2 | Đóng | Nút (Footer) | Người dùng nhấn nút Đóng.<br>+ Hệ thống thực hiện đóng modal cập nhật chi trả ngay lập tức, hủy bỏ các thay đổi. |
