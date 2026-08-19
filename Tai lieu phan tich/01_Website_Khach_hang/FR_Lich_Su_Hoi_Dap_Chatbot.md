# ĐẶC TẢ YÊU CẦU CHỨC NĂNG (FR): TRA CỨU LỊCH SỬ HỎI ĐÁP TRÊN CỬA SỔ CHATBOT (POPUP WIDGET)

**Mã hiệu Yêu cầu:** FR-KH-AI-02  
**Tên Yêu cầu:** Tra cứu, Lọc, Sắp xếp và Kết xuất Lịch sử Hỏi đáp trên Cửa sổ Chatbot Popup  
**Phân hệ:** Website Khách hàng (Customer Portal)  
**Trạng thái:** Đã hoàn thiện & Cập nhật UI Mockup  

---

## 1. Cơ chế Lưu trữ Dữ liệu Lịch sử (Data Storage Rules)

| Nhóm đối tượng | Cơ chế lưu trữ | Thời gian lưu trữ & Phạm vi |
| --- | --- | --- |
| **Khách chưa đăng nhập (Guest)** | Lưu tạm tại `LocalStorage` của Trình duyệt thông qua **Guest Session ID** tự sinh (`guest_session_id`). | Lưu tạm thời trên thiết bị/trình duyệt hiện tại. Khi xóa Cache trình duyệt, lịch sử sẽ bị dọn dẹp. |
| **Người dùng đã đăng nhập** | Đồng bộ vĩnh viễn vào **Cơ sở dữ liệu (Database)** theo Trạng thái Tài khoản. | Lưu trữ cố định. Khi người dùng đăng nhập trên bất kỳ thiết bị nào cũng có thể xem lại lịch sử. |
| **Đồng bộ tự động (Auto-Merge)** | Khi khách chưa đăng nhập tiến hành **Đăng nhập**, toàn bộ lịch sử hỏi đáp lưu tạm ở `LocalStorage` sẽ được hệ thống **tự động chuyển (Merge)** vào dữ liệu tài khoản trên Server. |  |

---

## 2. Đặc tả Giao diện & Luồng Tương tác (UI & User Flow)

### 2.1. Vị trí & Chuyển đổi Màn hình (Screen Toggle)

* **Vị trí kích hoạt:** Bổ sung Nút/Icon **`🕒 Lịch sử`** trên thanh Header của Cửa sổ Chatbot (nằm ở vị trí góc trên bên phải, cạnh nút Đóng).
* **Hành vi chuyển màn hình (Slide View):**
  * Khi bấm vào **`🕒 Lịch sử`**: Khung Chatbot trượt/chuyển sang góc nhìn **Màn hình Danh sách Lịch sử**.
  * Phía trên Header sẽ đổi nút thành **`← Quay lại Chat`** để người dùng bấm quay về màn hình hội thoại trực tuyến bất kỳ lúc nào mà không làm mất đoạn chat dở dang.

---

### 2.2. Các Chức năng Chi tiết trên Màn hình Lịch sử

#### **a. Hiển thị thông tin theo giá trị mặc định (Default View)**
* **Mặc định Lĩnh vực:** Hiển thị tab **`Biện pháp bảo đảm`** (hoặc tab Lĩnh vực mà người dùng vừa đặt câu hỏi trước đó).
* **Mặc định Sắp xếp:** Các cuộc hỏi đáp mới nhất được đưa lên đầu (`Thời gian tạo DESC`).
* **Mặc định Thời gian:** Hiển thị toàn bộ câu hỏi trong phiên làm việc hiện tại (hoặc 30 ngày gần nhất đối với người dùng đã đăng nhập).

#### **b. Bộ lọc & Tra cứu theo tham số đơn / kết hợp (Search & Filter)**
* **Thanh tìm kiếm (Search bar):** Ô nhập từ khóa đơn lẻ (tìm theo nội dung câu hỏi, từ khóa trong câu trả lời hoặc căn cứ pháp lý).
* **Bộ lọc Lĩnh vực (Topic Tabs):** Cho phép chuyển nhanh bộ lọc giữa các tab: `[Biện pháp bảo đảm]`, `[Bồi thường nhà nước]`, và `[Tất cả]`.
* **Bộ lọc nâng cao (khi bấm vào Icon Filter 🔍/⚙️):**
  * Cho phép lọc kết hợp: **[Khoảng thời gian (Từ ngày - Đến ngày)]** + **[Trạng thái: Đã trả lời / Từ chối tư vấn]** + **[Từ khóa]**.
  * Bấm nút **`Xóa bộ lọc`** để quay về trạng thái hiển thị mặc định.

#### **c. Sắp xếp kết quả tra cứu (Sorting Criteria)**
* Cung cấp menu xổ xuống (Dropdown) hỗ trợ sắp xếp danh sách lịch sử theo:
  * *Thời gian:* Mới nhất $\rightarrow$ Cũ nhất (hoặc ngược lại).
  * *Mức độ liên quan:* Khớp nhất với từ khóa tìm kiếm.

#### **d. Kết xuất kết quả ra tệp tin (Export Data)**
* Ở góc dưới màn hình Lịch sử (Footer của Chatbot) bổ sung nút **`📥 Kết xuất Excel`**.
* **Quy tắc xuất:**
  * Xuất tệp tin định dạng **Excel (`.xlsx`)**.
  * Hệ thống kết xuất đúng danh sách các bản ghi đang thỏa mãn bộ lọc hiện tại trên màn hình.
  * *Cấu trúc file xuất ra:* STT | Mã câu hỏi | Lĩnh vực | Trạng thái | Thời gian hỏi | Người hỏi | Nội dung câu hỏi | Nội dung phản hồi AI | Căn cứ pháp lý.

---

## 3. Tiêu chí Chấp nhận (Acceptance Criteria - AC)

* [x] **AC1 - Đổi góc nhìn mượt mà:** Bấm vào `🕒 Lịch sử` trên Header Chatbot sẽ chuyển sang Màn hình Lịch sử; bấm `← Quay lại Chat` sẽ quay trở lại đoạn chat đang dở dang mà không mất dữ liệu.
* [x] **AC2 - Hoạt động khi Chưa đăng nhập:** Khách vãng lai hỏi đáp xong, mở tab Lịch sử vẫn thấy lại các câu hỏi vừa thực hiện (lưu qua LocalStorage).
* [x] **AC3 - Tra cứu & Lọc chính xác:** Nhập từ khóa hoặc chuyển đổi giữa tab *Biện pháp bảo đảm* và *Bồi thường nhà nước* thì danh sách lịch sử lập tức cập nhật đúng dữ liệu tương ứng.
* [x] **AC4 - Sắp xếp:** Thay đổi tiêu chí sắp xếp (ví dụ: Cũ nhất lên đầu) danh sách lịch sử lập tức đảo chiều chính xác.
* [x] **AC5 - Xuất file thành công:** Bấm nút *Kết xuất Excel*, hệ thống tải về file `.xlsx` chứa đầy đủ thông tin các câu hỏi/câu trả lời đã lọc.
