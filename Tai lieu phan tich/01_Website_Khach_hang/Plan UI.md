Bạn là Chuyên viên Phân tích Nghiệp vụ (BA) kiêm Technical Lead của dự án. Hãy rà soát toàn bộ các file tài liệu SRS (`.md`) trong thư mục `Tai lieu phan tich/` để chuẩn hóa và bổ sung kịch bản "Tìm kiếm/Lọc nhưng không có kết quả (Empty State)".

YÊU CẦU THỰC HIỆN TỰ ĐỘNG VÀ CHUẨN XÁC:

1. NGUYÊN TẮC RÀ SOÁT:
- KHÔNG viết lại toàn bộ nội dung file làm xáo trộn các phần khác.
- Thực hiện cập nhật có mục tiêu (In-place Edit) trực tiếp vào đúng các dòng liên quan trong từng file.
- Áp dụng cho toàn bộ các màn hình có chức năng Tìm kiếm/Lọc và Lưới dữ liệu (Data Grid/Table) ở cả 02 phân hệ: Website Khách hàng và Website Quản trị.

2. NỘI DUNG CHUẨN HÓA CẦN CHÈN VÀO TỪNG FILE:

A. Tại Bảng "Mô tả thông tin trên màn hình" (ở dòng mô tả Bảng danh sách/Lưới dữ liệu):
- Cột "Mô tả" bổ sung các gạch đầu dòng rõ ràng:
  <br>- Trạng thái có dữ liệu: Hiển thị danh sách các bản ghi kết quả theo cấu trúc các cột quy định.
  <br>- Trạng thái không có dữ liệu (Empty State): Khi không tìm thấy kết quả phù hợp với điều kiện tìm kiếm, bảng hiển thị duy nhất 01 dòng căn giữa trên toàn bộ chiều rộng bảng (`colspan`), in nghiêng với nội dung: *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."*

B. Tại Bảng "Chức năng trên màn hình" (ở dòng hành động Nút "Tìm kiếm" / "Lọc"):
- Cột "Mô tả" bổ sung trường hợp:
  <br>- **TH Không có dữ liệu trả về**:
    + Bảng kết quả: Hiển thị dòng thông báo rỗng *"Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm."* ở giữa bảng.
    + Thanh phân trang (Pagination): Dòng số lượng hiển thị *"Hiển thị 0-0 của 0 bản ghi"* (hoặc *"Hiển thị 0-0 của 0 yêu cầu"*); các nút điều hướng trang (`|<<`, `<`, các số trang, `>`, `>>|`) ở trạng thái ẩn hoặc khóa mờ (Disabled).
    + Nút "Kết xuất Excel" (nếu màn hình có nút này): Thiết lập ở trạng thái khóa mờ (Disabled) với thuộc tính `style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"` kèm tooltip: *"Không có dữ liệu để kết xuất Excel"*.

3. QUY TRÌNH THỰC HIỆN VÀ BÁO CÁO:
- Bước 1: Quét và liệt kê danh sách các file `.md` có chứa màn hình danh sách/tìm kiếm cần cập nhật.
- Bước 2: Thực hiện chèn/cập nhật chính xác vào từng file theo đúng 2 vị trí trên.
- Bước 3: Tổng hợp báo cáo danh sách các file đã cập nhật kèm vị trí dòng đã sửa để người dùng nghiệm thu.
