### 4.3.2.12. UC268_UC272 - Phân hệ Quản lý yêu cầu hỗ trợ (WebAdmin-08-09-01)

#### 4.3.2.12.1. Mục đích
\- Tính năng Quản lý yêu cầu hỗ trợ (WebAdmin-08-09-01) số hóa quy trình tiếp nhận, theo dõi, điều phối (phân công) và trả lời các thắc mắc, yêu cầu trợ giúp kỹ thuật hoặc nghiệp vụ từ người dùng hệ thống (Khách hàng Cá nhân, Khách hàng Tổ chức).

*a. Phân quyền*
\- Lãnh đạo đơn vị (Lãnh đạo xử lý): Xem, theo dõi toàn bộ danh sách các yêu cầu hỗ trợ; phân công cán bộ xử lý đối với các yêu cầu mới hoặc yêu cầu cần điều chuyển; hủy phân công xử lý của chuyên viên (đưa yêu cầu về trạng thái chờ tiếp nhận/phân công lại).
\- Chuyên viên nghiệp vụ (Cán bộ xử lý): Xem danh sách các yêu cầu được phân công cho mình hoặc yêu cầu chưa có người xử lý; thực hiện tiếp nhận (claim) các yêu cầu chưa được phân công; gửi câu trả lời hỗ trợ chính thức cho người yêu cầu; đề nghị người yêu cầu làm rõ thêm thông tin nếu nội dung chưa đủ căn cứ xử lý.

*b. Điều kiện thực hiện*
\- Cán bộ đã đăng nhập thành công vào hệ thống quản trị cán bộ của NRAST.
\- Tài khoản được phân vai trò tương ứng: Lãnh đạo đơn vị hoặc Chuyên viên nghiệp vụ.

*c. Nguyên tắc phân quyền dữ liệu (Data Isolation)*
\- Mỗi yêu cầu hỗ trợ do Khách hàng gửi đều gắn với đúng 01 Cơ quan tiếp nhận do Khách hàng tự chọn khi tạo yêu cầu (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước, hoặc 1 trong 3 Trung tâm đăng ký giao dịch, tài sản tại Hà Nội/TP.HCM/Đà Nẵng - tham chiếu **[UC266]**).
\- Tài khoản Lãnh đạo đơn vị/Chuyên viên nghiệp vụ trực thuộc Cơ quan tiếp nhận nào thì hệ thống chỉ hiển thị danh sách các yêu cầu hỗ trợ có Cơ quan tiếp nhận đúng bằng đơn vị đó.
\- Cán bộ tuyệt đối không được xem, tìm kiếm, tiếp nhận, phân công hoặc trả lời các yêu cầu hỗ trợ thuộc Cơ quan tiếp nhận khác với đơn vị mình trực thuộc.

---

#### 4.3.2.12.2. UC268_272.MH01 - Màn hình Tra cứu yêu cầu hỗ trợ

##### 4.3.2.12.2.1. Màn hình
\- Giao diện bao gồm vùng bộ lọc tìm kiếm phía trên, thanh công cụ nút chức năng và lưới danh sách kết quả hỗ trợ phân trang ở phía dưới.
![Màn hình Tra cứu yêu cầu hỗ trợ](images/UC268_272_MH01.png)

##### 4.3.2.12.2.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Bộ lọc tìm kiếm** | | | | |
| Từ khóa tìm kiếm | String(255) | Không | Trống | - Nhập từ khóa để tìm kiếm theo Tiêu đề, Nội dung, Mã yêu cầu, Họ tên người yêu cầu hoặc Email. |
| Trạng thái | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Chọn trạng thái yêu cầu:<br>- Tất cả<br>- Chờ tiếp nhận<br>- Đang xử lý<br>- Yêu cầu làm rõ<br>- Hoàn thành |
| Mức độ ưu tiên | Enum(String(50)) | Không | "Tất cả" | Control UI: Hộp chọn.<br>- Chọn mức độ ưu tiên:<br>- Tất cả mức độ<br>- Thấp<br>- Trung bình<br>- Cao |
| Từ ngày | String(10) | Không | Ngày đầu tiên của tháng hiện tại | - Nhập tay theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ).<br>- Có biểu tượng lịch hiển thị minh họa. |
| Đến ngày | String(10) | Không | Ngày hiện tại | - Nhập tay theo định dạng `dd/mm/yyyy` (tự động thêm dấu `/` khi gõ).<br>- Có biểu tượng lịch hiển thị minh họa. |
| Cán bộ xử lý | Enum(String(50)) | Không | "Tất cả" (Lãnh đạo)<br>Hoặc tên Chuyên viên đăng nhập | Control UI: Hộp chọn.<br>- Chọn cán bộ xử lý để lọc danh sách.<br>- Với vai trò Chuyên viên, mặc định lọc theo chính tài khoản của chuyên viên đó. |
| **II. Bảng danh sách kết quả** | | | | |
| Lưới kết quả | - | Không | Lấy từ hệ thống | Control UI: Bảng/Lưới hiển thị.<br>- Hiển thị danh sách yêu cầu hỗ trợ thỏa mãn bộ lọc.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |
| Cột: STT | Integer(10) | Có | Số thứ tự tăng dần | - Số thứ tự dòng dữ liệu (tính liên tục theo phân trang). |
| Cột: Ngày yêu cầu | Date | Có | Lấy từ hệ thống | - Ngày giờ người dùng gửi yêu cầu hỗ trợ (định dạng `dd/mm/yyyy hh:mm`). |
| Cột: Cơ quan tiếp nhận | Enum(String(255)) | Có | Lấy từ hệ thống | - Cơ quan/đơn vị tiếp nhận do Khách hàng đã chọn khi gửi yêu cầu (Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước, hoặc 1 trong 3 Trung tâm đăng ký giao dịch, tài sản). Chỉ hiển thị đúng bằng đơn vị mà Cán bộ đang đăng nhập trực thuộc (theo Nguyên tắc phân quyền dữ liệu tại mục 4.3.2.12.1). |
| Cột: Tiêu đề | String(255) | Có | Lấy từ hệ thống | - Tiêu đề ngắn gọn của yêu cầu hỗ trợ. |
| Cột: Nội dung | Text(2000) | Có | Lấy từ hệ thống | - Nội dung chi tiết của yêu cầu. Trên lưới hiển thị rút gọn kèm dấu ba chấm `...` nếu vượt quá giới hạn. Khi chọn hoặc di chuột (Hover) sẽ hiển thị đầy đủ thông tin nội dung qua tooltip độc lập nổi trên giao diện. |
| Cột: Mức độ ưu tiên | Enum(String(50)) | Có | Lấy từ hệ thống | - Hiển thị mức độ ưu tiên bằng màu sắc tương ứng:<br>- Đỏ (Badge Cao)<br>- Vàng (Badge Trung bình)<br>- Xanh (Badge Thấp) |
| Cột: Người yêu cầu | String(100) | Có | Lấy từ hệ thống | - Họ và tên khách hàng gửi yêu cầu hỗ trợ. |
| Cột: Email | String(255) | Có | Lấy từ hệ thống | - Địa chỉ email liên hệ của khách hàng. |
| Cột: Cán bộ xử lý | String(255) | Có | Lấy từ hệ thống | - Họ tên cán bộ xử lý được phân công. Hiển thị "Chưa phân công" nếu yêu cầu chưa có người nhận. |
| Cột: Ngày tiếp nhận/Phản hồi | Date | Có | Lấy từ hệ thống | - Thời gian cập nhật gần nhất đối với yêu cầu. |
| Cột: Đánh giá | String(255) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Hiển thị kết quả đánh giá chất lượng hỗ trợ từ khách hàng (chỉ hiển thị khi yêu cầu ở trạng thái Hoàn thành và khách hàng đã thực hiện đánh giá): **Hài lòng**, **Không hài lòng** hoặc **Ý kiến khác** (Không hiển thị chi tiết nội dung đánh giá ngoài lưới). Để trống (hiển thị `-`) nếu chưa có đánh giá. |
| Cột: Trạng thái | Enum(String(50)) | Có | Lấy từ hệ thống | - Hiển thị trạng thái hiện tại dưới dạng nhãn màu sắc:<br>- Xám nhạt: Chờ tiếp nhận<br>- Cam: Đang xử lý<br>- Xanh dương: Yêu cầu làm rõ<br>- Xanh lá: Hoàn thành |
| Cột: Thao tác | - | Có | Lấy từ hệ thống | Control UI: Nút bấm.<br>- Tập hợp các hành động nghiệp vụ tương ứng cho mỗi vai trò.<br>- Chi tiết nghiệp vụ xem ở bảng Chức năng trên màn hình. |

##### 4.3.2.12.2.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xóa bộ lọc | Nút | - Thao tác: Người dùng bấm nút **[Xóa bộ lọc]**.<br>- Xử lý: Thiết lập lại toàn bộ các bộ lọc tìm kiếm về giá trị mặc định (Từ khóa rỗng, ngày từ đầu tháng đến ngày hiện tại, trạng thái/ưu tiên/cán bộ về "Tất cả"). Tự động kích hoạt lại tìm kiếm để cập nhật lại lưới dữ liệu. |
| 2 | Tìm kiếm | Nút | - Thao tác: Người dùng bấm nút **[Tìm kiếm]**. |
| | | | - TH1 (Từ ngày > Đến ngày): Hệ thống hiển thị thông báo lỗi: *"Từ ngày không được lớn hơn Đến ngày"* và chặn tìm kiếm. |
| | | | - TH Hợp lệ: Hệ thống lọc danh sách yêu cầu theo các tiêu chí đã nhập/chọn trên form bộ lọc, trả kết quả và phân trang lại lưới dữ liệu (20 bản ghi/trang). |
| 3 | Kết xuất Excel | Nút | - Thao tác: Người dùng bấm nút **[Kết xuất Excel]**. |
| | | | - TH1 (Danh sách kết quả rỗng): Hệ thống hiển thị thông báo lỗi: *"Không có dữ liệu để export"* và chặn thực hiện. |
| | | | - TH Hợp lệ: Hệ thống xuất toàn bộ danh sách đang hiển thị ra tệp Excel (.xlsx) với các thông tin tương ứng, đặt tên mặc định: `Danh_sach_Yeu_cau_Ho_tro_[YYYYMMDD].xlsx`. |
| 4 | Xem | Nút trên dòng | - Thao tác: NSD nhấp đúp vào dòng dữ liệu hoặc click row click trên cột Thao tác.<br>- Xử lý: Hệ thống hiển thị Modal xem chi tiết yêu cầu hỗ trợ (`UC268_272.MH02`). |
| 5 | Phân công | Nút trên dòng | - Thao tác: Lãnh đạo click icon phân công trên cột Thao tác.<br>- Xử lý: Chỉ khả dụng khi yêu cầu ở trạng thái "Chờ tiếp nhận". Mở Modal phân công xử lý yêu cầu hỗ trợ (`UC268_272.MH03`). |
| 6 | Hủy phân công | Nút trên dòng | - Thao tác: Lãnh đạo click icon hủy phân công trên cột Thao tác.<br>- Xử lý: Chỉ khả dụng khi yêu cầu ở trạng thái "Đang xử lý". Mở Modal hủy phân công xử lý yêu cầu hỗ trợ (`UC268_272.MH04`). |
| 7 | Tiếp nhận | Nút trên dòng | - Thao tác: Chuyên viên nghiệp vụ click icon tiếp nhận trên cột Thao tác.<br>- Xử lý: Chỉ khả dụng khi yêu cầu ở trạng thái "Chờ tiếp nhận". Hệ thống gán tài khoản Chuyên viên đang đăng nhập làm cán bộ xử lý, chuyển trạng thái yêu cầu sang "Đang xử lý", hiển thị thông báo: *"Tiếp nhận yêu cầu thành công"*. |
| 8 | Trả lời | Nút trên dòng | - Thao tác: Chuyên viên nghiệp vụ click icon trả lời trên cột Thao tác.<br>- Xử lý: Chỉ khả dụng khi yêu cầu ở trạng thái "Đang xử lý". Mở Modal trả lời yêu cầu hỗ trợ (`UC268_272.MH05`). |
| 9 | Yêu cầu làm rõ | Nút trên dòng | - Thao tác: Chuyên viên nghiệp vụ click icon yêu cầu làm rõ trên cột Thao tác.<br>- Xử lý: Chỉ khả dụng khi yêu cầu ở trạng thái "Đang xử lý". Mở Modal đề nghị làm rõ yêu cầu hỗ trợ (`UC268_272.MH06`). |

---

#### 4.3.2.12.3. UC268_272.MH02 - Màn hình Xem chi tiết yêu cầu hỗ trợ

##### 4.3.2.12.3.1. Màn hình
\- Hiển thị dạng Modal Popup cố định Header và Footer, cuộn nội dung độc lập ở phần Body.
![Màn hình Xem chi tiết yêu cầu hỗ trợ](images/UC268_272_MH02.png)

##### 4.3.2.12.3.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **I. Thông tin chung** | | | | |
| Mã yêu cầu | String(50) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Mã số yêu cầu hỗ trợ duy nhất (ví dụ: `HT-20260601-000049`). |
| Ngày yêu cầu | Date | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Ngày giờ người dùng gửi yêu cầu hỗ trợ (định dạng `dd/mm/yyyy hh:mm`). |
| Cơ quan tiếp nhận | Enum(String(255)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Cơ quan/đơn vị tiếp nhận do Khách hàng đã chọn khi gửi yêu cầu. |
| Mức độ ưu tiên | Enum(String(50)) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Thấp, Trung bình hoặc Cao. |
| Người yêu cầu | String(100) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Họ và tên khách hàng gửi yêu cầu hỗ trợ. |
| Email liên hệ | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Địa chỉ email liên hệ của khách hàng. |
| **II. Thông tin nội dung yêu cầu** | | | | |
| Tiêu đề | String(255) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Tiêu đề của yêu cầu hỗ trợ. |
| Nội dung chi tiết | Text(2000) | Có | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Nội dung chi tiết của yêu cầu hỗ trợ gốc. |
| Tài liệu đính kèm | File | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Danh sách các tệp đính kèm của khách hàng (nếu có). Click để tải về. |
| **III. Lịch sử phản hồi từ Cán bộ** | | | | |
| Lịch sử Q&A | String(255) | Không | Lấy từ hệ thống | - Danh sách các vòng phản hồi hỏi đáp Q&A giữa Chuyên viên xử lý và Khách hàng theo thứ tự thời gian tăng dần (#1, #2...). Mỗi vòng hiển thị: Cán bộ phản hồi, Nội dung phản hồi, Tệp đính kèm hỗ trợ, Ngày cập nhật. |
| **IV. Nội dung chỉ đạo của Lãnh đạo** | | | | |
| Nội dung chỉ đạo | Text(2000) | Không | Lấy từ hệ thống | Control UI: Hiển thị/Read-only.<br>- Ý kiến giao việc từ Lãnh đạo đơn vị khi phân công cán bộ xử lý. |
| **V. Kết quả đánh giá chất lượng** | | | | |
| Khối đánh giá chất lượng | String(255) | Không | Lấy từ hệ thống | - Chỉ hiển thị khi yêu cầu ở trạng thái Hoàn thành và khách hàng đã đánh giá.<br>- Tiêu đề khối: **KẾT QUẢ ĐÁNH GIÁ CHẤT LƯỢNG HỖ TRỢ**.<br>- Hiển thị:<br>  + Đánh giá (Hài lòng / Không hài lòng / Ý kiến khác)<br>  + Ngày đánh giá<br>  + Ý kiến đóng góp chi tiết của khách hàng. |

##### 4.3.2.12.3.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xem file | Link | - Thao tác: NSD click liên kết "Xem file" cạnh tên file đính kèm.<br>- Xử lý: Hệ thống mở xem trước file đính kèm trong tab mới của trình duyệt. |
| 2 | Đóng | Nút | - Thao tác: NSD click nút **[Đóng]** ở Footer hoặc nút `x` ở góc phải Header.<br>- Xử lý: Đóng Modal Popup và quay lại lưới tra cứu. |

---

#### 4.3.2.12.4. UC268_272.MH03 - Màn hình Phân công xử lý yêu cầu hỗ trợ

##### 4.3.2.12.4.1. Màn hình
\- Hiển thị dưới dạng Modal Popup khi Lãnh đạo click nút Phân công trên cột Thao tác. Giao diện cố định Header và Footer, cuộn ở phần Body.
![Màn hình Phân công xử lý yêu cầu hỗ trợ](images/UC268_272_MH03.png)

##### 4.3.2.12.4.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Cán bộ xử lý | Enum(String(50)) | Có | Trống | Control UI: Hộp chọn.<br>- Chọn Chuyên viên nghiệp vụ trực thuộc.<br>- Hỗ trợ bộ lọc tìm kiếm nhanh trực tiếp trên ô dropdown. |
| Nội dung chỉ đạo/giao việc | String(1000) | Không | Trống | - Nhập văn bản hướng dẫn xử lý hoặc các lưu ý đặc biệt cho chuyên viên. |

##### 4.3.2.12.4.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận phân công | Nút | - Thao tác: Lãnh đạo click nút **[Xác nhận phân công]**. |
| | | | - TH1 (Chưa chọn Cán bộ): Hệ thống hiển thị cảnh báo đỏ: *"Vui lòng chọn cán bộ để phân công"*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH Hợp lệ: Hệ thống cập nhật Cán bộ xử lý cho yêu cầu hỗ trợ; chuyển trạng thái yêu cầu sang "Đang xử lý"; lưu trữ nội dung chỉ đạo; tự động gửi email thông báo giao việc đến email công vụ của Chuyên viên; đóng Modal và tải lại lưới dữ liệu với thông báo: *"Phân công cán bộ xử lý thành công"*. |
| 2 | Hủy | Nút | - Thao tác: Lãnh đạo click nút **[Hủy]**.<br>- Xử lý: Đóng Modal Popup, không lưu thay đổi. |

---

#### 4.3.2.12.5. UC268_272.MH04 - Màn hình Hủy phân công xử lý yêu cầu hỗ trợ

##### 4.3.2.12.5.1. Màn hình
\- Hiển thị dưới dạng Modal Popup khi Lãnh đạo click nút Hủy phân công trên cột Thao tác. Giao diện cố định Header và Footer, cuộn ở phần Body.
![Màn hình Hủy phân công xử lý yêu cầu hỗ trợ](images/UC268_272_MH04.png)

##### 4.3.2.12.5.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Lý do hủy phân công | String(1000) | Có | Trống | - Nhập rõ lý do vì sao thực hiện rút phân công của chuyên viên. |

##### 4.3.2.12.5.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Xác nhận hủy | Nút | - Thao tác: Lãnh đạo click nút **[Xác nhận hủy]**. |
| | | | - TH1 (Trống lý do): Hệ thống hiển thị cảnh báo đỏ: *"Vui lòng nhập lý do hủy phân công"*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH Hợp lệ: Hệ thống xóa cán bộ xử lý khỏi yêu cầu (trở về "Chưa phân công"); chuyển trạng thái yêu cầu về "Chờ tiếp nhận"; tự động gửi email thông báo hủy phân công kèm lý do đến Chuyên viên; đóng Modal và tải lại lưới dữ liệu với thông báo: *"Đã hủy phân công xử lý yêu cầu"*. |
| 2 | Hủy | Nút | - Thao tác: Lãnh đạo click nút **[Hủy]**.<br>- Xử lý: Đóng Modal Popup, không lưu thay đổi. |

---

#### 4.3.2.12.6. UC268_272.MH05 - Màn hình Trả lời yêu cầu hỗ trợ

##### 4.3.2.12.6.1. Màn hình
\- Hiển thị dưới dạng Modal Popup khi Chuyên viên click nút Trả lời trên cột Thao tác. Giao diện cố định Header và Footer, cuộn ở phần Body.
![Màn hình Trả lời yêu cầu hỗ trợ](images/UC268_272_MH05.png)

##### 4.3.2.12.6.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Nội dung trả lời | String(4000) | Có | Trống | - Nhập chi tiết câu trả lời hoặc hướng dẫn xử lý cho khách hàng. |
| Tài liệu đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Đính kèm tài liệu hỗ trợ giải thích.<br>- Quy tắc kỹ thuật:<br>  + Số lượng: Tối đa **3 tệp tin**.<br>  + Định dạng hợp lệ: `.pdf`, `.jpg`, `.jpeg`, `.png`.<br>  + Chặn hoàn toàn định dạng soạn thảo `.docx`. |

##### 4.3.2.12.6.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Gửi câu trả lời | Nút | - Thao tác: Chuyên viên click nút **[Gửi câu trả lời]**. |
| | | | - TH1 (Trống nội dung): Hệ thống hiển thị cảnh báo lỗi: *"Vui lòng nhập nội dung trả lời"*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH2 (Sai định dạng file): Nếu có file `.docx` hoặc định dạng sai khác, báo lỗi: *"Chỉ hỗ trợ đính kèm tệp tin pdf hoặc các định dạng ảnh. Không hỗ trợ tệp tin định dạng khác."*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH3 (Vượt quá số lượng file): Nếu số file tải lên > 3, báo lỗi: *"Chỉ cho phép đính kèm tối đa 3 tệp tin."*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH Hợp lệ: Hệ thống ghi nhận nội dung phản hồi vào Lịch sử Q&A; chuyển trạng thái yêu cầu thành "Hoàn thành"; cập nhật ngày phản hồi bằng giờ hiện tại; đồng bộ trạng thái sang cổng khách hàng; đóng Modal và tải lại danh sách với thông báo: *"Gửi câu trả lời thành công"*. |
| 2 | Hủy | Nút | - Thao tác: Chuyên viên click nút **[Hủy]**.<br>- Xử lý: Đóng Modal Popup, không lưu thay đổi. |

*(Ghi chú: Cột "Cơ quan tiếp nhận" và "Email" tại bảng danh sách (4.3.2.12.2), cột "Cơ quan tiếp nhận" tại Modal chi tiết (4.3.2.12.3), cùng Nguyên tắc phân quyền dữ liệu theo Cơ quan tiếp nhận (mục 4.3.2.12.1) đã được bổ sung đồng bộ vào mockup UI Cán bộ, khớp với đặc tả tại tài liệu này.)*

---

#### 4.3.2.12.7. UC268_272.MH06 - Màn hình Đề nghị làm rõ yêu cầu hỗ trợ

##### 4.3.2.12.7.1. Màn hình
\- Hiển thị dưới dạng Modal Popup khi Chuyên viên click nút Yêu cầu làm rõ trên cột Thao tác. Giao diện cố định Header và Footer, cuộn ở phần Body.
![Màn hình Đề nghị làm rõ yêu cầu hỗ trợ](images/UC268_272_MH06.png)

##### 4.3.2.12.7.2. Mô tả thông tin trên màn hình
| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| Nội dung yêu cầu làm rõ | String(4000) | Có | Trống | - Nhập rõ câu hỏi hoặc các tài liệu cần khách hàng giải trình, cung cấp bổ sung thông tin. |
| Tài liệu đính kèm | File | Không | Trống | Control UI: Upload file.<br>- Đính kèm tài liệu hỗ trợ giải thích.<br>- Quy tắc kỹ thuật:<br>  + Số lượng: Tối đa **3 tệp tin**.<br>  + Định dạng hợp lệ: `.pdf`, `.jpg`, `.jpeg`, `.png`.<br>  + Chặn hoàn toàn định dạng soạn thảo `.docx`. |

##### 4.3.2.12.7.3. Chức năng trên màn hình
| STT | Tên chức năng | Định dạng | Mô tả |
| :--- | :--- | :--- | :--- |
| 1 | Gửi yêu cầu làm rõ | Nút | - Thao tác: Chuyên viên click nút **[Gửi yêu cầu làm rõ]**. |
| | | | - TH1 (Trống nội dung): Hệ thống hiển thị cảnh báo lỗi: *"Vui lòng nhập nội dung đề nghị làm rõ"*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH2 (Sai định dạng file): Nếu có file `.docx` hoặc định dạng sai khác, báo lỗi: *"Chỉ hỗ trợ đính kèm tệp tin pdf hoặc các định dạng ảnh. Không hỗ trợ tệp tin định dạng khác."*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH3 (Vượt quá số lượng file): Nếu số file tải lên > 3, báo lỗi: *"Chỉ cho phép đính kèm tối đa 3 tệp tin."*, highlight viền đỏ ô lỗi. Chặn không cho gửi. |
| | | | - TH Hợp lệ: Hệ thống ghi nhận nội dung yêu cầu vào Lịch sử Q&A; chuyển trạng thái yêu cầu thành "Yêu cầu làm rõ"; cập nhật ngày phản hồi bằng giờ hiện tại; đồng bộ trạng thái sang cổng khách hàng; đóng Modal và tải lại danh sách với thông báo: *"Gửi đề nghị làm rõ thành công"*. |
| 2 | Hủy | Nút | - Thao tác: Chuyên viên click nút **[Hủy]**.<br>- Xử lý: Đóng Modal Popup, không lưu thay đổi. |
