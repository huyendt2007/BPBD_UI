Bạn điều chỉnh lại cho tôi tài liệu SRS phần đăng nhập khách hàng như sau:
 # 1. Phần đăng nhập qua tài khoản dịch vụ Công => Sửa thành Đăng nhập qua VNeID: 
 # 2. Sửa lại phần UC001.MH04
   ý tôi mong muốn là Sau khi xác thực VNeID thành công của Cá nhân và Tổ chức => Hệ thống thực hiện kiểm tra nếu tài khoản Cá nhân hoặc Tổ chức chưa có trên hệ thống,
   Sẽ hiển thị Modal yêu cầu
   Phần Lựa chọn hình thức sử dụng sửa thành: Tài khoản đăng ký hoặc Tài khoản Tra cứu
   Cho phép tích chọn 1 trong 2 hoặc là cả 2.
   Hiển thị thêm cả tùy chọn Khởi tạo tài khoản/mật khẩu trên hệ thống BPBĐ.
2.  Nếu có tích chọn thì hiển thị thêm Form  Form Đăng ký thông tin Cá nhân hoặc Tổ chức tương ứng, Tùy thuộc vào Loại VNeID đang đăng nhập.
   Nếu là Cá nhân thì hiển thị form của Cá nhân. Nếu là Tổ chức hoặc là người đại diện của tổ chức thì hiển thị form của Tổ chức
   Trường hợp nếu người đang đăng nhập không phải là đại diện của Tổ chức và Tổ chức đó chưa có trên hệ thống 
   Hoặc Tài khoản phụ đó chưa có trên hệ thống thì sẽ hiển thị thông báo
   "Tài khoản chưa tồn tại. Vui lòng liên hệ với Đại diện của Tổ chức chủ quản để thêm mới tài khoản".
   
   
   ## Form cá nhân thì hiển thị các thông tin, Y hệt như Thêm mới 1 Khách hàng cá nhân ở Website quản trị:
   Loại tài khoản*: Cá nhân , Không được phép sửa
   Email (Tên đăng nhập)* (Chỉ bắt buộc nếu có tích Khởi tạo tài khoản/mật khẩu trên hệ thống BPBĐ)
   Mật khẩu đăng nhập*: Chỉ hiển thị và bắt buộc nếu có tích Khởi tạo tài khoản/mật khẩu trên hệ thống BPBĐ. Theo quy tắc về mật khẩu
   Loại giấy tờ*: lấy từ VNeID, không được phép sửa
   Số giấy tờ*: lấy từ VNeID, không được phép sửa
   Họ và tên*: lấy từ VNeID, không được phép sửa
   Ngày sinh: lấy từ VNeID nếu có. Nếu không có thì có thể cho phép tự nhập
   Giới tính: lấy từ VNeID. Nếu không có thì có thể cho phép tự nhập
   Quốc tịch*: lấy từ VNeID
   Số điện thoại:
   Phân loại khách hàng*: Gồm:
	- Trong nước
	- Nước ngoài
	- Tự động gợi ý theo Quốc tịch nhưng cho phép điều chỉnh lại. Nếu Quốc tịch là Việt Nam thì là Trong nước, còn lại là Nước ngoài
  Tỉnh/TP*: ấy từ VNeID nếu có. Nếu không có thì có thể cho phép tự nhập
  Địa chỉ chi tiết*: lấy từ VNeID nếu có. Nếu không có thì có thể cho phép tự nhập
  
  Trung tâm Đăng ký mặc định*
	
	## Form Tổ chức thì hiển thị các thông tin Y hệt khi thêm mới Tài khoản Tổ chức ở WEbsite quản trị:
	- Loại tài khoản*: Tổ chức , Không được phép sửa
	- Loại tổ chức*: 
	- Mã định danh tổ chức*: lấy từ VNeID, không được phép sửa
	- Mã số thuế/Số giấy phép đầu tư*
	- Tên tổ chức: lấy từ VNeID, không được phép sửa
   - Email tổ chức (Tên đăng nhập)* (Chỉ bắt buộc nếu có tích Khởi tạo tài khoản/mật khẩu trên hệ thống BPBĐ)
   - Mật khẩu đăng nhập*: Chỉ hiển thị và bắt buộc nếu có tích Khởi tạo tài khoản/mật khẩu trên hệ thống BPBĐ. Theo quy tắc về mật khẩu
   - Loại giấy tờ*: lấy từ VNeID
   - Số giấy tờ*: lấy từ VNeID
   - Số điện thoại:
   - Quốc gia đăng ký*: lấy từ VNeID
    Phân loại khách hàng*: Gồm:
	- Trong nước
	- Nước ngoài
	- Tự động gợi ý theo Quốc tịch nhưng cho phép điều chỉnh lại. Nếu Quốc gia đăng ký là Việt Nam thì là Trong nước, còn lại là Nước ngoài
  Tỉnh/TP*: ấy từ VNeID nếu có. Nếu không có thì có thể cho phép tự nhập
  Địa chỉ chi tiết*: lấy từ VNeID nếu có. Nếu không có thì có thể cho phép tự nhập

  Trung tâm Đăng ký mặc định*
	- Khối thông tin Người đại diện: Lấy từ VNeID
	+ Họ và tên người đại diện
	+ Loại giấy tờ
	+ Số giấy tờ
Trên cả 2 form đều có	
  Cây phân quyền gồm danh sách các quyền được phép tích chọn:
  Tạm thời giả lập thành 2 nhóm Tài khoản đăng ký: Trong đó bao gồm 6 thủ tục (Đăng ký mới BPBĐ, Xóa đăng ký ...)
  Nhóm Tài khoản tra cứu
  
  
   - Nếu có tích chọn Tài khoản Tra cứu. Thì sau khi hoàn thành xác thực tạo tài khoản, Hệ thống sẽ redirect sang Trang Cổng thanh toán để thực hiện Thanh toán Phí Trứu mã số sử dụng CSDL theo thông tin phí đã cấu hình tại Danh mục ...
   Sau khi thanh toán thành công sẽ redirect vào Trang chủ của hệ thống.
   
   2. Nếu không tích chọn tạo tài khoản trên hệ thống BPBĐ, thì Hệ thống sẽ tự động Tạo tài khoản theo thông tin nhận được từ VNeID, để trống các trường thông tin không có. Không đồng thời tạo tạo ra tài khoản theo Email của khách hàng
   Đồng thời gán thông tin TechID theo thông tin trả về từ VNeID để phục vụ cho các lần sau. Nếu check TechID tồn tại thì không cần check thông tin khác mà sẽ vào thẳng hệ thống.
   Nếu có tích chọn Tạo tài khoản thì sẽ khởi tạo Thêm tài khoản nguồn là Nội bộ theo thông tin khách hàng đã nhập. Tự động sinh tài khoản và gửi thông tin về Email đã đăng ký.