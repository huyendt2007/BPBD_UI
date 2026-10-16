# BỘ QUY TẮC KIỂM TRA & CHUẨN HÓA TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

---

## I. NGUYÊN TẮC CẤU TRÚC CHUNG CỦA MỘT FILE TÀI LIỆU SRS (.MD)

Mỗi file tài liệu đặc tả chức năng (`.md`) phải tuân thủ nghiêm ngặt cấu trúc phân cấp thống nhất, bao gồm:

1. **Phần mở đầu (Header Level 1 & 2)**: **CHỈ CÓ DUY NHẤT 01 PHẦN MỞ ĐẦU** cho toàn bộ file, gồm:
   - **Tên Module / Chức năng chính**
   - **Mục đích**: Tóm tắt phạm vi và mục tiêu nghiệp vụ của module.
   - **a. Phân quyền**: Danh sách các đối tượng/vai trò người dùng được phép truy cập (VD: *Quản trị hệ thống*, *Tài khoản chính Tổ chức*, *Cán bộ tiếp nhận*...).
   - **b. Điều kiện thực hiện**: Trạng thái hệ thống, tài khoản đã đăng nhập, hoặc tiền điều kiện bắt buộc trước khi thực hiện.
2. **Chi tiết các Màn hình con (MH01, MH02, MH03...)**:
   Mỗi màn hình/popup con bên dưới bắt buộc phải có đủ **03 phần chuẩn hóa**:
   - **1. Màn hình**
   - **2. Mô tả thông tin trên màn hình** (Bảng dữ liệu/thông tin)
   - **3. Chức năng trên màn hình** (Bảng xử lý nghiệp vụ)

---

## II. QUY TẮC CHI TIẾT CHO TỪNG PHẦN

### 1. PHẦN "1. MÀN HÌNH"
- **Quy tắc tuyệt đối**: **CHỈ ĐỂ DUY NHẤT LINK ẢNH MÀN HÌNH** (ảnh chụp UI mockup tương ứng).
- **Tuyệt đối cấm**:
  - Không viết bất kỳ đoạn văn mô tả, giải thích giao diện, hoặc tóm tắt nào tại phần này.
  - Không viết câu dẫn dắt (ví dụ cấm: *"Giao diện gồm 2 phần: Bộ lọc tìm kiếm và Bảng danh sách..."*).
- **Cú pháp chuẩn**:
  ```markdown
  ###### 4.X.X.X.1. Màn hình
  
  ![Tên màn hình](../../images/UCXXX/Tên_ảnh.png)
  ```

---

### 2. PHẦN "2. MÔ TẢ THÔNG TIN TRÊN MÀN HÌNH" (BẢNG DỮ LIỆU)

Mục đích của bảng này là định nghĩa **dữ liệu hiển thị, kiểu dữ liệu, ràng buộc bắt buộc và điều kiện hiển thị của các Control UI**.

#### a. Quy tắc mô tả Nút / Icon Thao tác (Action Buttons/Icons)
- **Chỉ mô tả điều kiện hiển thị**: Nêu rõ nút/icon đó *Hiển thị khi nào*, *Khóa mờ khi nào*, hoặc *Hiển thị theo phân quyền/trạng thái nào*.
- **Tuyệt đối cấm**: Không mô tả hành động hệ thống làm gì khi click vào nút (hành động click thuộc về Bảng Chức năng).
- *Ví dụ Đúng*:
  ```markdown
  Control UI: Nhóm nút/icon thao tác.
  - Cập nhật: Chỉ hiển thị khi trạng thái là "Đang hoạt động".
  - Khóa: Chỉ hiển thị khi trạng thái là "Đang hoạt động".
  - Mở khóa: Chỉ hiển thị khi trạng thái là "Bị khóa".
  - Đóng: Chỉ hiển thị khi trạng thái là "Đang hoạt động" hoặc "Bị khóa".
  - Xem chi tiết: Thực hiện bằng sự kiện Row-click trên dòng dữ liệu.
  ```
- *Ví dụ Sai*:
  ```markdown
  - Sửa: Bấm vào để mở popup sửa thông tin và lưu vào CSDL. (SAI VÌ MÔ TẢ HÀNH ĐỘNG CLICK)
  ```

#### b. Quy tắc mô tả trường dữ liệu kiểu `Enum` (Combobox, Radio, Badge...)
- **Trường hợp 1 (Tham chiếu Danh mục dùng chung)**:
  - Ghi rõ mã và tên Danh mục dùng chung tham chiếu `[DM_XX]`.
  - **Tuyệt đối KHÔNG tự ý liệt kê lại danh sách giá trị**.
  - *Ví dụ chuẩn*: `Control UI: Combobox.<br>- Tham chiếu Danh mục Quốc gia [DM_09].`
- **Trường hợp 2 (Giá trị Enum cố định trên màn hình)**:
  - **BẮT BUỘC MỖI GIÁ TRỊ LÀ MỘT DÒNG RIÊNG BIỆT**, sử dụng cú pháp `<br>+ `.
  - **Tuyệt đối cấm viết liền trên cùng 1 dòng** (ví dụ cấm: `Gồm: Tất cả, Đang hoạt động, Bị khóa`).
  - *Cú pháp chuẩn*:
    ```markdown
    Control UI: Combobox.<br>Gồm:<br>+ Tất cả<br>+ Đang hoạt động<br>+ Bị khóa<br>+ Đóng
    ```

#### c. Quy tắc trình bày văn bản trong bảng
- Toàn bộ các ý mô tả, lưu ý, gạch đầu dòng bên trong một ô bảng phải được **tách thành từng dòng riêng biệt** bằng thẻ `<br>- ` hoặc `<br>+ `, không viết dồn thành một đoạn văn dài.

---

### 3. PHẦN "3. CHỨC NĂNG TRÊN MÀN HÌNH" (BẢNG XỬ LÝ NGHIỆP VỤ)

Mục đích của bảng này là mô tả **hành vi, logic xử lý và luồng nghiệp vụ của hệ thống khi người dùng tương tác** với từng Control/Nút bấm.

#### a. Đồng nhất Tên Chức năng (Parity Rule)
- **Tên chức năng** tại cột "Tên chức năng" của Bảng 3 **BẮT BUỘC PHẢI GIỐNG 100%** với tên nút/icon/thao tác đã được nêu tại Bảng 2 (Mô tả thông tin).
- Tuyệt đối không tự ý đổi tên (ví dụ: Bảng 2 ghi `Xóa bộ lọc` thì Bảng 3 không được ghi `Làm mới` hay `Reset`).

#### b. Cấm Hardcode Text Thông báo trong SRS
- Tuyệt đối **không viết nguyên văn nội dung câu thông báo** (text message) trong tài liệu SRS.
- **Bắt buộc tham chiếu trực tiếp theo Mã thông báo chuẩn** trong Phụ lục Danh mục Thông điệp dùng chung:
  + Lỗi Validate: `[MSG-ERR-VAL-XXX]` (Ví dụ: `[MSG-ERR-VAL-001]`, `[MSG-ERR-VAL-007]`, `[MSG-ERR-VAL-009]`).
  + Lỗi Hệ thống / Cảnh báo: `[MSG-ERR-SYS-XXX]`, `[MSG-WRN-SYS-XXX]`.
  + Thông báo Xác nhận: `[MSG-CFM-SYS-XXX]`, `[MSG-CFM-UCXXX-XXX]`.
  + Thông báo Thành công: `[MSG-SUC-SYS-XXX]`, `[MSG-SUC-UCXXX-XXX]`.
  + Trạng thái Bảng trống (Empty State): `[MSG-INF-SYS-001]`.

#### c. Tham chiếu Quy tắc Nghiệp vụ (Business Rules - BR)
- Toàn bộ quy tắc kiểm tra dữ liệu (Validate) và ràng buộc nghiệp vụ phải được định nghĩa trong Phụ lục Quy tắc chung và tham chiếu theo mã `[BR-VAL-XXX]` hoặc `[BR-BUS-XXX]`.

#### d. Phân tách rõ ràng các Trường hợp (TH)
- Khi một chức năng có nhiều tình huống xảy ra, bắt buộc phải chia thành các nhánh xử lý rõ ràng:
  - `TH1 (Tên trường hợp lỗi 1)`: ...
  - `TH2 (Tên trường hợp lỗi 2)`: ...
  - `TH3 (Tên trường hợp lỗi 3)`: ...
  - `TH Hợp lệ (Tuần tự các hành động của hệ thống)`: 1. Bước 1 -> 2. Bước 2 -> 3. Bước 3...
- Mỗi bước và mỗi trường hợp bắt buộc phải xuống dòng riêng biệt (`<br>`), không viết liền.

---

## III. QUY CHUẨN ĐẶC TẢ CHO CÁC NHÓM CHỨC NĂNG ĐẶC THÙ

### 1. Chức năng "Tìm kiếm" / "Tra cứu"
Bắt buộc phải mô tả đầy đủ **03 nhóm trường hợp**:
1. **TH Dữ liệu lọc không hợp lệ**:
   - Ghi rõ ràng các trường hợp không hợp lệ là gì (Ví dụ: `Từ ngày` lớn hơn `Đến ngày` theo `[BR-VAL-007]`, sai định dạng số điện thoại theo `[BR-VAL-PHONE]`, khoảng thời gian tra cứu vượt quá 90 ngày...).
   - Hiển thị thông báo lỗi tương ứng, highlight viền đỏ và focus con trỏ vào ô lỗi đầu tiên.
2. **TH Không trả về dữ liệu (Empty State)**:
   - *Bảng kết quả*: Hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung theo MessageList dùng chung `[MSG-INF-SYS-001]`.
   - *Thanh phân trang*: Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"*, các nút điều hướng trang ở trạng thái ẩn hoặc khóa mờ (Disabled).
   - *Nút Kết xuất Excel*: Thiết lập ở trạng thái khóa mờ (Disabled) kèm tooltip *"Không có dữ liệu để kết xuất Excel"*.
3. **TH Trả về dữ liệu (Có dữ liệu)**:
   - Hiển thị danh sách kết quả theo đúng bộ lọc và thứ tự sắp xếp mặc định.
   - Cập nhật tổng số bản ghi và kích hoạt đầy đủ thanh phân trang.

---

### 2. Chức năng "Thêm mới" / "Cập nhật" / "Lưu dữ liệu"
Bắt buộc phải mô tả đầy đủ các trường hợp theo thứ tự ưu tiên:
1. **TH Bỏ trống trường bắt buộc**:
   - Vi phạm quy tắc bắt buộc `[BR-VAL-001]`.
   - Hệ thống highlight đỏ viền/nền ô lỗi đầu tiên, hiển thị dòng chữ cảnh báo màu đỏ *"Đây là trường bắt buộc"* ngay phía dưới ô nhập và tự động focus con trỏ vào ô lỗi đầu tiên đó. Không cho phép lưu. *(Không cần liệt kê lại danh sách tên từng trường bắt buộc tại đây vì đã được định nghĩa ở Bảng 2)*.
2. **TH Dữ liệu không hợp lệ (Format / Logic)**:
   - Sai định dạng Email `[BR-VAL-EMAIL]`, Số điện thoại `[BR-VAL-PHONE]`, Ngày sinh lớn hơn ngày hiện tại...
   - Hiển thị thông báo lỗi tương ứng, highlight ô lỗi và focus con trỏ.
3. **TH Trùng lặp dữ liệu (Duplicate Check)**:
   - Nêu rõ các trường cần kiểm tra trùng lặp (Email, Số giấy tờ theo Loại giấy tờ, Mã số thuế, Số điện thoại...) đối chiếu trên tập các bản ghi đang ở trạng thái `Đang hoạt động` hoặc `Bị khóa` (khi Cập nhật thì loại trừ chính bản ghi đang xử lý) theo `[BR-VAL-009]`.
   - Nếu trùng, hiển thị thông báo lỗi `[MSG-ERR-VAL-009]`.
4. **TH Hợp lệ (Tuần tự các hành động của hệ thống)**:
   - Bước 1: Lưu/Cập nhật dữ liệu vào CSDL.
   - Bước 2: Xử lý thông tin liên quan (Sinh mã tự động, sinh mật khẩu ngẫu nhiên băm Salt, phân quyền vai trò...).
   - Bước 3: Gửi email thông báo (chỉ định đích danh theo **Mẫu X trong Phụ lục Mẫu Email hệ thống**).
   - Bước 4: Ghi nhật ký hệ thống (Audit Log).
   - Bước 5: Đóng popup, hiển thị thông báo thành công `[MSG-SUC-...]` và tự động làm mới lưới dữ liệu ở màn hình cha.

---

### 3. Chức năng "Kết xuất Excel"
- **Quy tắc chung**: Toàn bộ quy chuẩn kỹ thuật chung khi kết xuất Excel (định dạng `.xlsx`, Font chữ chuẩn `Times New Roman`, Cỡ chữ chuẩn, đặt tên tệp `yyyyMMdd_[Tên_chức_năng].xlsx`, căn lề, định dạng ngày tháng...) được định nghĩa tập trung tại Mục 5.5 trong Phụ lục (`04_Danh_muc_va_Phu_luc.md`).
- **Tại SRS chi tiết, bắt buộc phải mô tả đủ**:
  1. **TH Không có dữ liệu**: Danh sách trên lưới rỗng $\rightarrow$ Nút kết xuất ở trạng thái khóa mờ kèm tooltip cảnh báo, hoặc bấm vào hiển thị thông báo `[MSG-WRN-SYS-001]`.
  2. **TH Hợp lệ**:
     - *Phạm vi kết xuất*: Nêu rõ hệ thống **kết xuất toàn bộ danh sách bản ghi thỏa mãn điều kiện lọc hiện tại** (không chỉ giới hạn trên trang đang hiển thị).
     - *Cấu trúc dữ liệu xuất*: Hệ thống **tự động lấy theo đúng các cột thông tin đang hiển thị trên màn hình hiện tại** (hoặc theo Biểu mẫu kết xuất được quy định riêng nếu có yêu cầu mẫu đặc thù).

---

### 4. Chức năng "Nhận Excel (Import Excel)" & "Popup Dùng chung"
- **Không tự ý viết lại chi tiết**:
  - Đối với các thao tác Xác nhận (Khóa, Mở khóa, Đóng, Xóa...): Tham chiếu trực tiếp đến **`[POPUP-CFM-001]`** hoặc **`MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng`** và chỉ cần truyền tham số `Loại thao tác`.
  - Đối với Popup Từ chối / Trả lại: Tham chiếu trực tiếp đến **`[POPUP-REJ-001]`**.
  - Đối với Popup Ký số điện tử: Tham chiếu trực tiếp đến **`[POPUP-SIGN-001]`**.
  - Đối với Chức năng Nhận tệp Excel (Import): Tham chiếu quy trình Import chuẩn trong Phụ lục (Tải file mẫu, Đọc dữ liệu, Validate từng dòng, Trả file kết quả ghi chú lỗi).

---

## IV. BẢNG CHECKLIST KIỂM TRA TÀI LIỆU SRS (CHECKLIST MATRIX)

Khi rà soát bất kỳ file `.md` nào, hãy đối chiếu theo bảng kiểm tra sau:

| STT | Hạng mục kiểm tra | Tiêu chí ĐẠT (Pass) | Tiêu chí KHÔNG ĐẠT (Fail) |
| :--: | :--- | :--- | :--- |
| 1 | **Phần mở đầu file** | Chỉ có duy nhất 1 khối Mục đích, Phân quyền, Điều kiện thực hiện ở đầu file. | Lặp lại Mục đích/Phân quyền ở từng màn hình con bên dưới; hoặc dùng thuật ngữ Use Case (`UC001`, `UC002`...). |
| 2 | **1. Màn hình** | Chỉ chứa duy nhất link ảnh Markdown `![...](...)`. | Chứa văn bản mô tả giao diện, tóm tắt màn hình, gạch đầu dòng giải thích. |
| 3 | **2. Mô tả thông tin: Nút/Icon** | Chỉ mô tả điều kiện hiển thị/làm mờ của nút. | Mô tả hành động khi click nút làm gì (gọi popup, lưu CSDL...). |
| 4 | **2. Mô tả thông tin: Trường Enum** | Mỗi giá trị là một dòng riêng (`<br>+ `); hoặc ghi tên Danh mục dùng chung `[DM_XX]`. | Viết liền các giá trị trên 1 dòng; hoặc tự ý liệt kê lại giá trị của danh mục dùng chung. |
| 5 | **3. Chức năng: Tên chức năng** | Trùng khớp 100% với tên nút/icon tại Bảng 2. | Tên nút ở Bảng 2 là `Xóa bộ lọc` nhưng Bảng 3 ghi `Làm mới` / `Reset`. |
| 6 | **3. Chức năng: Text thông báo** | 100% dùng mã thông báo chuẩn `[MSG-...]`. | Hardcode trực tiếp câu văn tiếng Việt vào bảng (ví dụ: *"Hiển thị thông báo: Bạn có muốn xóa không?"*). |
| 7 | **3. Chức năng: Tìm kiếm** | Có đủ 3 phần: TH Không hợp lệ, TH Không có dữ liệu (Empty State), TH Có dữ liệu. | Thiếu mô tả Empty state của bảng/phân trang/nút xuất Excel; hoặc thiếu TH không hợp lệ. |
| 8 | **3. Chức năng: Lưu / Thêm mới** | Tách riêng: Bỏ trống bắt buộc (highlight đỏ + focus), Dữ liệu lỗi, Trùng lặp (trên bản ghi Active/Locked), TH Hợp lệ (nêu rõ Mẫu email X). | Viết gộp chung chung; thiếu rule trùng lặp trạng thái `Đang hoạt động`/`Bị khóa`; không chỉ rõ Mẫu email gửi đi. |
| 9 | **3. Chức năng: Kết xuất Excel** | Nêu rõ phạm vi (Toàn bộ theo bộ lọc), Danh sách cột xuất, TH có dữ liệu & TH rỗng. | Chỉ ghi ngắn gọn *"Bấm để tải file Excel"*; không rõ danh sách cột và phạm vi dữ liệu. |
| 10 | **Dẫn chiếu Popup / Quy tắc** | Dẫn chiếu theo mã `[POPUP-...]`, mã màn hình và mã quy tắc `[BR-...]`. | Viết lại chi tiết toàn bộ các popup dùng chung và các quy tắc validate lặp đi lặp lại. |

---

## V. QUY TRÌNH XỬ LÝ KHI PHÁT HIỆN TÀI LIỆU SRS CHƯA TUÂN THỦ

Khi rà soát một tài liệu SRS hiện có và phát hiện các điểm không đạt chuẩn theo Ma trận kiểm tra trên, người thực hiện / AI cần thực hiện tuần tự 5 bước hiệu chỉnh sau:

1. **Bước 1 - Dọn dẹp & Hợp nhất phần mở đầu**:
   - Thu gom toàn bộ Mục đích, Phân quyền, Điều kiện thực hiện rải rác lên duy nhất 01 khối ở đầu file.
   - Xóa bỏ toàn bộ các mã Use Case cũ (`UCPS010`, `UC009`, `UC005`...) và thay bằng mã màn hình chuẩn hóa (`MH01`, `MH02`, `MH03`...).
2. **Bước 2 - Chuẩn hóa mục "1. Màn hình"**:
   - Xóa sạch toàn bộ văn bản/đoạn mô tả thừa bên dưới tiêu đề `Màn hình`, chỉ giữ lại duy nhất cú pháp chèn ảnh `![Tên ảnh](đường_dẫn_ảnh)`.
3. **Bước 3 - Tách bạch Bảng Thông tin (Bảng 2) và Bảng Chức năng (Bảng 3)**:
   - Rà soát Bảng 2: Cắt bỏ toàn bộ các câu mô tả hành vi bấm nút sang Bảng 3; chỉ giữ lại điều kiện hiển thị của nút/icon.
   - Format lại toàn bộ trường `Enum`: Nếu có danh sách giá trị cố định, tách từng dòng bằng `<br>+ `; nếu tham chiếu danh mục dùng chung thì chuyển thành `Tham chiếu Danh mục [...] [DM_XX]`.
   - Kiểm tra đối chiếu 100% Tên nút ở Bảng 2 với Tên chức năng ở Bảng 3.
4. **Bước 4 - Khử bỏ toàn bộ Text Thông báo hardcode & Thay bằng Mã chuẩn**:
   - Thay thế toàn bộ các câu chữ thông báo hiển thị bằng mã `[MSG-ERR-...]`, `[MSG-SUC-...]`, `[MSG-CFM-...]`, `[MSG-INF-...]`.
   - Bổ sung quy tắc kiểm tra trùng lặp trên các tài khoản/bản ghi ở trạng thái `Đang hoạt động` hoặc `Bị khóa` (`[BR-VAL-009]`).
5. **Bước 5 - Chuẩn hóa tham chiếu Popup & Kết xuất Excel**:
   - Xóa bỏ các mục mô tả popup xác nhận viết riêng lẻ, thay bằng liên kết tham chiếu trực tiếp đến `[POPUP-CFM-001]` hoặc màn hình Popup xác nhận dùng chung kèm tham số `Loại thao tác`.
   - Mô tả đầy đủ 2 trường hợp (Có dữ liệu / Không có dữ liệu) và danh sách các cột của chức năng Kết xuất Excel.

---

## VI. MẪU PROMPT CHUẨN ĐỂ YÊU CẦU HIỆU CHỈNH / TÁI CẤU TRÚC TÀI LIỆU SRS

Dưới đây là mẫu Prompt chuẩn hóa có thể copy và áp dụng ngay cho bất kỳ file tài liệu SRS nào cần hiệu chỉnh lại theo đúng toàn bộ quy chuẩn trên:

````markdown
Hãy tái cấu trúc, chuẩn hóa và cập nhật lại toàn bộ tài liệu trong file `[ĐƯỜNG_DẪN_FILE_SRS.md]` theo đúng Bộ quy tắc chuẩn hóa tài liệu SRS hệ thống như sau:

---

### 1. Cấu trúc tổng thể của file
- **Duy nhất 01 khối mở đầu**: File chỉ chứa duy nhất 01 phần Mục đích, a. Phân quyền và b. Điều kiện thực hiện ở đầu file.
- **Xóa bỏ toàn bộ mã Use Case cũ**: Xóa toàn bộ tiền tố `UCXXX`, `UCPSXXX`; chuẩn hóa thứ tự các màn hình thành `MH01`, `MH02`, `MH03`...
- **Mỗi Màn hình con có đủ 3 phần chuẩn hóa**:
  + `1. Màn hình`
  + `2. Mô tả thông tin trên màn hình` (Bảng dữ liệu)
  + `3. Chức năng trên màn hình` (Bảng xử lý nghiệp vụ)

---

### 2. Chuẩn hóa mục "1. Màn hình"
- **Chỉ để duy nhất link ảnh Markdown**: `![Tên ảnh](đường_dẫn_ảnh)`.
- **Tuyệt đối không viết bất kỳ văn bản/đoạn mô tả nào** bên dưới ảnh.

---

### 3. Chuẩn hóa mục "2. Mô tả thông tin trên màn hình" (Bảng dữ liệu)
- **Đối với các Nút / Icon thao tác**: Chỉ mô tả *Điều kiện hiển thị/làm mờ*, tuyệt đối KHÔNG mô tả hành động khi click nút (hành động click thuộc về Bảng Chức năng).
- **Đối với các trường kiểu Enum**:
  + Nếu tham chiếu Danh mục dùng chung: Ghi rõ `Tham chiếu Danh mục [Tên] [DM_XX]`, không liệt kê lại giá trị.
  + Nếu là giá trị cố định (Combobox, Radio, Badge...): Bắt buộc mỗi giá trị là 1 dòng riêng biệt bằng cú pháp `<br>+ `, không viết liền trên cùng 1 dòng.
- **Trình bày**: Mỗi thông tin/ý mô tả là 1 dòng riêng biệt (`<br>- ` hoặc `<br>+ `).

---

### 4. Chuẩn hóa mục "3. Chức năng trên màn hình" (Bảng xử lý)
- **Đồng nhất Tên Chức năng**: Cột "Tên chức năng" phải giống 100% với tên thao tác đã mô tả tại Bảng 2.
- **Tuyệt đối không hardcode text thông báo**: Bắt buộc tham chiếu theo các mã thông báo chuẩn `[MSG-ERR-...]`, `[MSG-SUC-...]`, `[MSG-CFM-...]`, `[MSG-INF-SYS-001]`.
- **Tham chiếu Business Rules**: Toàn bộ quy tắc validate/nghiệp vụ tham chiếu theo mã `[BR-VAL-...]`, `[BR-BUS-...]`.
- **Phân tách rõ các TH**: Tách riêng từng dòng cho `TH1`, `TH2`, `TH3`... và `TH Hợp lệ (Tuần tự các bước)`.
- **Chức năng Tìm kiếm**: Phải mô tả đầy đủ:
  + *TH Dữ liệu lọc không hợp lệ* (chỉ rõ điều kiện không hợp lệ).
  + *TH Không trả về dữ liệu* (Empty State của bảng, phân trang, nút Kết xuất Excel khóa mờ).
  + *TH Có trả về dữ liệu*.
- **Chức năng Thêm mới / Cập nhật / Lưu**: Phải có đủ:
  + *TH Bỏ trống trường bắt buộc* (highlight viền đỏ, cảnh báo đỏ "Đây là trường bắt buộc", focus con trỏ vào ô lỗi đầu tiên theo [BR-VAL-001]).
  + *TH Dữ liệu không hợp lệ* (định dạng email, số điện thoại...).
  + *TH Trùng lặp dữ liệu* (kiểm tra đối chiếu trên tập bản ghi ở trạng thái `Đang hoạt động` hoặc `Bị khóa` theo [BR-VAL-009]).
  + *TH Hợp lệ* (Lưu CSDL, Xử lý tài khoản/mật khẩu, Gửi email đích danh theo **Mẫu X: [Tên mẫu]** trong Phụ lục Mẫu Email hệ thống, Ghi Audit Log, Hiển thị thông báo thành công, Đóng popup và Làm mới danh sách).
- **Chức năng Kết xuất Excel**: Nêu rõ kết xuất toàn bộ dữ liệu theo điều kiện lọc hiện tại, liệt kê đầy đủ danh sách các cột xuất, mô tả đủ TH có dữ liệu và TH không có dữ liệu.
- **Popup Dùng chung**: Các thao tác Khóa / Mở khóa / Đóng / Xóa tham chiếu trực tiếp đến `[POPUP-CFM-001]` hoặc `MH03 - Popup Xác nhận Khóa / Mở khóa / Đóng / Xóa tài khoản khách hàng` và chỉ truyền vào đúng `Loại thao tác`.
````

