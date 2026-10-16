#### Danh mục Loại cơ quan và Danh mục Chức vụ

##### 1. Mục đích

- Định nghĩa dữ liệu khởi tạo cho 02 danh mục dùng chung:
  + Danh mục Loại cơ quan [DM_57]: danh sách các Loại cơ quan.
  + Danh mục Chức vụ [DM_58]: danh sách Chức vụ theo từng Loại cơ quan.
- Mỗi Chức vụ thuộc đúng 01 Loại cơ quan. Cùng một tên chức vụ xuất hiện ở nhiều Loại cơ quan là các giá trị riêng của từng Loại cơ quan.
- Biểu mẫu cần Chức vụ người đứng đầu của cơ quan thì lấy Chức vụ đầu tiên (theo thứ tự tại Danh sách Chức vụ theo Loại cơ quan) của Loại cơ quan của cơ quan đó; không khai báo riêng Chức vụ người đứng đầu. Tên cơ quan ghép theo Tên cơ quan, đơn vị.
- Quản trị viên thêm, sửa, ngừng hoạt động giá trị tại [Quản lý danh mục dùng chung - Quản lý danh mục dùng chung (Master Data) - Quản trị hệ thống (Website Quản trị)](Quan_ly_danh_muc.md); khi thêm Chức vụ, Quản trị viên chọn Loại cơ quan mà chức vụ thuộc về.
- Căn cứ theo nguồn dữ liệu được cung cấp: Nghị định 303/2025/NĐ-CP, Luật sửa đổi Luật Tổ chức Tòa án nhân dân số 81/2025/QH15, Luật sửa đổi Luật Tổ chức Viện kiểm sát nhân dân số 82/2025/QH15, Luật Tổ chức Viện kiểm sát nhân dân năm 2014 (sửa đổi, bổ sung năm 2025), Nghị định số 150/2026/NĐ-CP (Thi hành án dân sự).

<a id="ldv-danh-sach-loai-don-vi"></a>
##### 2. Danh sách Loại cơ quan

| STT | Loại cơ quan | Phạm vi áp dụng |
| :-- | :--- | :--- |
| | **Khối Bộ và Cơ quan ngang Bộ** | |
| 1 | Bộ | - |
| 2 | Cơ quan ngang Bộ | Văn phòng Chính phủ, Thanh tra Chính phủ, Ngân hàng Nhà nước |
| 3 | Vụ | Thuộc Bộ, Cơ quan ngang Bộ |
| 4 | Văn phòng | Thuộc Bộ, Cơ quan ngang Bộ, Cục |
| 5 | Thanh tra | Thuộc Bộ, Cơ quan ngang Bộ, Cục |
| 6 | Cục | Thuộc Bộ, Cơ quan ngang Bộ |
| 7 | Chi cục và tương đương | Thuộc Cục ở địa phương/khu vực |
| 8 | Phòng / Ban | Thuộc Vụ đặc thù, Văn phòng, Thanh tra, Cục, Chi cục, Đơn vị sự nghiệp, Sở |
| 9 | Đội / Trạm | Thuộc Chi cục hoặc Cục |
| 10 | Viện nghiên cứu | Đơn vị sự nghiệp thuộc Bộ |
| 11 | Học viện / Trường | Đơn vị sự nghiệp thuộc Bộ |
| 12 | Trung tâm | Đơn vị sự nghiệp thuộc Bộ, Cục |
| 13 | Báo / Tạp chí | Đơn vị sự nghiệp thuộc Bộ |
| | **Hệ thống Tòa án nhân dân** | |
| 14 | TAND Tối cao | - |
| 15 | Tòa Phúc thẩm TAND Tối cao | - |
| 16 | Cục / Vụ / Văn phòng thuộc TAND Tối cao | - |
| 17 | TAND cấp tỉnh | Tỉnh, Thành phố trực thuộc TW |
| 18 | TAND khu vực | - |
| 19 | Tòa án chuyên biệt tại Trung tâm tài chính quốc tế | - |
| 20 | Tòa chuyên trách | Thuộc TAND cấp tỉnh, TAND khu vực, Tòa Phúc thẩm |
| 21 | Văn phòng / Phòng thuộc TAND | Thuộc Tòa Phúc thẩm, TAND cấp tỉnh, TAND khu vực |
| 22 | Tòa án quân sự Trung ương | - |
| 23 | Tòa án quân sự Quân khu và tương đương | - |
| 24 | Tòa án quân sự Khu vực | - |
| | **Hệ thống Viện kiểm sát nhân dân** | |
| 25 | VKSND Tối cao | Cấp cao nhất của hệ thống Viện kiểm sát nhân dân; Viện trưởng VKSND Tối cao quản lý, chỉ đạo, điều hành toàn bộ hệ thống Viện kiểm sát nhân dân, Viện kiểm sát quân sự các cấp |
| 26 | Viện Công tố và Kiểm sát xét xử phúc thẩm | Trực thuộc VKSND Tối cao |
| 27 | Cơ quan điều tra VKSND Tối cao | Và CQĐT VKS Quân sự Trung ương |
| 28 | Vụ / Cục / Văn phòng / Thanh tra thuộc VKSND Tối cao | - |
| 29 | VKSND cấp tỉnh | Tỉnh, Thành phố trực thuộc TW (hiện có 34 VKSND cấp tỉnh) |
| 30 | VKSND khu vực | Hiện có 355 VKSND khu vực |
| 31 | Văn phòng / Phòng thuộc VKSND | Thuộc Vụ/Cục/Viện phúc thẩm/CQĐT VKSNDTC, VKSND cấp tỉnh, VKSND khu vực |
| 32 | Viện kiểm sát quân sự Trung ương | Thuộc hệ thống Viện kiểm sát nhân dân, đặt dưới sự quản lý, chỉ đạo, điều hành của Viện trưởng VKSND Tối cao |
| 33 | Viện kiểm sát quân sự Quân khu và tương đương | Thuộc hệ thống Viện kiểm sát nhân dân, đặt dưới sự quản lý, chỉ đạo, điều hành của Viện trưởng VKSND Tối cao |
| 34 | Viện kiểm sát quân sự Khu vực | Thuộc hệ thống Viện kiểm sát nhân dân, đặt dưới sự quản lý, chỉ đạo, điều hành của Viện trưởng VKSND Tối cao |
| | **Khối cơ quan chuyên môn thuộc UBND cấp Tỉnh/Thành phố** | |
| 35 | Sở | Thuộc UBND tỉnh, thành phố trực thuộc trung ương; gồm cơ quan chuyên môn trực thuộc Sở |
| | **Ủy ban nhân dân các cấp** | |
| 36 | UBND cấp Tỉnh/Thành phố | Tỉnh, Thành phố trực thuộc trung ương |
| 37 | UBND cấp Phường/Xã | Phường, Xã |

<a id="ldv-danh-sach-chuc-vu"></a>
##### 3. Danh sách Chức vụ theo Loại cơ quan

| STT | Loại cơ quan | Chức vụ |
| :-- | :--- | :--- |
| | **Khối Bộ và Cơ quan ngang Bộ** | |
| 1 | Bộ | - Bộ trưởng<br>- Thứ trưởng |
| 2 | Cơ quan ngang Bộ | - Bộ trưởng, Chủ nhiệm Văn phòng Chính phủ<br>- Phó Chủ nhiệm Văn phòng Chính phủ<br>- Tổng Thanh tra Chính phủ<br>- Phó Tổng Thanh tra Chính phủ<br>- Thống đốc Ngân hàng Nhà nước<br>- Phó Thống đốc Ngân hàng Nhà nước |
| 3 | Vụ | - Vụ trưởng<br>- Phó Vụ trưởng<br>- Chuyên viên cao cấp<br>- Chuyên viên chính<br>- Chuyên viên |
| 4 | Văn phòng | - Chánh Văn phòng<br>- Phó Chánh Văn phòng<br>- Thư ký (Bộ trưởng / Thủ trưởng cơ quan ngang Bộ)<br>- Chuyên viên cao cấp<br>- Chuyên viên chính<br>- Chuyên viên<br>- Cán sự<br>- Kế toán trưởng / Phụ trách kế toán<br>- Kế toán viên (Chính / Kế toán viên / Trung cấp)<br>- Văn thư viên (Chính / Văn thư viên / Trung cấp)<br>- Lưu trữ viên (Chính / Lưu trữ viên / Trung cấp)<br>- Nhân viên (Lái xe, Bảo vệ, Kỹ thuật, Phục vụ) |
| 5 | Thanh tra | - Chánh Thanh tra<br>- Phó Chánh Thanh tra<br>- Thanh tra viên cao cấp<br>- Thanh tra viên chính<br>- Thanh tra viên<br>- Chuyên viên |
| 6 | Cục | - Cục trưởng<br>- Phó Cục trưởng<br>- Chuyên viên cao cấp<br>- Chuyên viên chính<br>- Chuyên viên<br>- Cán sự<br>- Kiểm tra viên / Kiểm soát viên / Kiểm dịch viên / Chấp hành viên (tùy theo ngành đặc thù) |
| 7 | Chi cục và tương đương | - Chi cục trưởng<br>- Phó Chi cục trưởng<br>- Chuyên viên chính<br>- Chuyên viên<br>- Cán sự<br>- Kiểm tra viên / Kiểm soát viên / Chấp hành viên |
| 8 | Phòng / Ban | - Trưởng phòng (hoặc Trưởng ban)<br>- Phó Trưởng phòng (hoặc Phó Trưởng ban)<br>- Chuyên viên cao cấp (đối với phòng thuộc Cục/Vụ cấp Bộ)<br>- Chuyên viên chính<br>- Chuyên viên<br>- Cán sự<br>- Kế toán viên / Văn thư viên / Lưu trữ viên<br>- Nhân viên |
| 9 | Đội / Trạm | - Đội trưởng / Trạm trưởng<br>- Phó Đội trưởng / Phó Trạm trưởng<br>- Kiểm tra viên / Kiểm soát viên<br>- Chuyên viên / Cán sự / Nhân viên |
| 10 | Viện nghiên cứu | - Viện trưởng<br>- Phó Viện trưởng<br>- Nghiên cứu viên cao cấp<br>- Nghiên cứu viên chính<br>- Nghiên cứu viên<br>- Trợ lý nghiên cứu<br>- Chuyên viên / Kế toán viên |
| 11 | Học viện / Trường | - Giám đốc Học viện / Hiệu trưởng<br>- Phó Giám đốc Học viện / Phó Hiệu trưởng<br>- Trưởng khoa / Phó Trưởng khoa<br>- Giảng viên cao cấp<br>- Giảng viên chính<br>- Giảng viên<br>- Trợ giảng<br>- Chuyên viên / Kế toán viên / Nhân viên |
| 12 | Trung tâm | - Giám đốc Trung tâm<br>- Phó Giám đốc Trung tâm<br>- Kỹ sư (Cao cấp / Chính / Kỹ sư)<br>- Chuyên viên (Chính / Chuyên viên)<br>- Kỹ thuật viên<br>- Kế toán viên / Nhân viên |
| 13 | Báo / Tạp chí | - Tổng biên tập<br>- Phó Tổng biên tập<br>- Biên tập viên (Cao cấp / Chính / Biên tập viên)<br>- Phóng viên (Cao cấp / Chính / Phóng viên)<br>- Chuyên viên / Kế toán viên / Nhân viên |
| | **Hệ thống Tòa án nhân dân** | |
| 14 | TAND Tối cao | - Chánh án TAND Tối cao<br>- Phó Chánh án TAND Tối cao<br>- Thành viên Hội đồng Thẩm phán TAND Tối cao<br>- Thẩm phán TAND Tối cao<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án (Cao cấp / Chính / Thẩm tra viên)<br>- Thư ký Tòa án (Cao cấp / Chính / Thư ký viên) |
| 15 | Tòa Phúc thẩm TAND Tối cao | - Chánh tòa Tòa Phúc thẩm TAND Tối cao<br>- Phó Chánh tòa Tòa Phúc thẩm TAND Tối cao<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án (Cao cấp / Chính / Thẩm tra viên)<br>- Thư ký Tòa án (Cao cấp / Chính / Thư ký viên)<br>- Chuyên viên / Kế toán viên / Văn thư viên |
| 16 | Cục / Vụ / Văn phòng thuộc TAND Tối cao | - Cục trưởng / Phó Cục trưởng<br>- Vụ trưởng / Phó Vụ trưởng<br>- Chánh Văn phòng / Phó Chánh Văn phòng<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án (Cao cấp / Chính / Thẩm tra viên)<br>- Thư ký Tòa án (Cao cấp / Chính / Thư ký viên)<br>- Chuyên viên (Cao cấp / Chính / Chuyên viên)<br>- Kế toán viên / Văn thư viên / Lưu trữ viên |
| 17 | TAND cấp tỉnh | - Chánh án TAND cấp tỉnh<br>- Phó Chánh án TAND cấp tỉnh<br>- Ủy viên Ủy ban Thẩm phán TAND cấp tỉnh<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án (Chính / Thẩm tra viên)<br>- Thư ký Tòa án (Chính / Thư ký viên)<br>- Hội thẩm nhân dân |
| 18 | TAND khu vực | - Chánh án TAND khu vực<br>- Phó Chánh án TAND khu vực<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án<br>- Thư ký Tòa án<br>- Hội thẩm nhân dân<br>- Chuyên viên / Kế toán viên / Văn thư viên |
| 19 | Tòa án chuyên biệt tại Trung tâm tài chính quốc tế | - Chánh án Tòa án chuyên biệt<br>- Phó Chánh án Tòa án chuyên biệt<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án<br>- Thư ký Tòa án<br>- Chuyên viên / Nhân viên |
| 20 | Tòa chuyên trách | - Chánh tòa<br>- Phó Chánh tòa<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án<br>- Thư ký Tòa án |
| 21 | Văn phòng / Phòng thuộc TAND | - Chánh Văn phòng / Phó Chánh Văn phòng<br>- Trưởng phòng / Phó Trưởng phòng<br>- Thẩm tra viên Tòa án<br>- Thư ký Tòa án<br>- Chuyên viên / Kế toán trưởng / Kế toán viên / Văn thư viên / Nhân viên |
| 22 | Tòa án quân sự Trung ương | - Chánh án TAQS Trung ương (Kiêm Phó Chánh án TAND Tối cao)<br>- Phó Chánh án TAQS Trung ương<br>- Ủy viên Ủy ban Thẩm phán TAQS Trung ương<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án<br>- Thư ký Tòa án |
| 23 | Tòa án quân sự Quân khu và tương đương | - Chánh án TAQS Quân khu<br>- Phó Chánh án TAQS Quân khu<br>- Ủy viên Ủy ban Thẩm phán TAQS Quân khu<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án<br>- Thư ký Tòa án<br>- Hội thẩm quân nhân |
| 24 | Tòa án quân sự Khu vực | - Chánh án TAQS Khu vực<br>- Phó Chánh án TAQS Khu vực<br>- Thẩm phán Tòa án nhân dân<br>- Thẩm tra viên Tòa án<br>- Thư ký Tòa án<br>- Hội thẩm quân nhân |
| | **Hệ thống Viện kiểm sát nhân dân** | |
| 25 | VKSND Tối cao | - Viện trưởng VKSND Tối cao<br>- Phó Viện trưởng VKSND Tối cao<br>- Thành viên Ủy ban Kiểm sát VKSND Tối cao<br>- Kiểm sát viên VKSND Tối cao<br>- Kiểm sát viên cao cấp<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Kiểm tra viên cao cấp<br>- Kiểm tra viên chính<br>- Kiểm tra viên |
| 26 | Viện Công tố và Kiểm sát xét xử phúc thẩm | - Viện trưởng Viện Công tố và Kiểm sát xét xử phúc thẩm<br>- Phó Viện trưởng Viện Công tố và Kiểm sát xét xử phúc thẩm<br>- Kiểm sát viên cao cấp<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Kiểm tra viên cao cấp<br>- Kiểm tra viên chính<br>- Kiểm tra viên<br>- Chuyên viên / Kế toán viên / Văn thư viên |
| 27 | Cơ quan điều tra VKSND Tối cao | - Thủ trưởng Cơ quan điều tra<br>- Phó Thủ trưởng Cơ quan điều tra<br>- Điều tra viên cao cấp<br>- Điều tra viên trung cấp<br>- Điều tra viên sơ cấp<br>- Cán bộ điều tra<br>- Chuyên viên / Nhân viên |
| 28 | Vụ / Cục / Văn phòng / Thanh tra thuộc VKSND Tối cao | - Vụ trưởng<br>- Phó Vụ trưởng<br>- Cục trưởng<br>- Phó Cục trưởng<br>- Chánh Văn phòng<br>- Phó Chánh Văn phòng<br>- Chánh Thanh tra<br>- Phó Chánh Thanh tra<br>- Kiểm sát viên cao cấp<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Kiểm tra viên cao cấp<br>- Kiểm tra viên chính<br>- Kiểm tra viên<br>- Thanh tra viên (Cao cấp / Chính / Thanh tra viên)<br>- Chuyên viên (Cao cấp / Chính / Chuyên viên)<br>- Kế toán viên / Văn thư viên / Lưu trữ viên |
| 29 | VKSND cấp tỉnh | - Viện trưởng VKSND cấp tỉnh<br>- Phó Viện trưởng VKSND cấp tỉnh<br>- Ủy viên Ủy ban Kiểm sát VKSND cấp tỉnh<br>- Kiểm sát viên cao cấp<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Kiểm tra viên chính<br>- Kiểm tra viên |
| 30 | VKSND khu vực | - Viện trưởng VKSND khu vực<br>- Phó Viện trưởng VKSND khu vực<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Kiểm tra viên chính<br>- Kiểm tra viên<br>- Chuyên viên / Kế toán viên / Văn thư viên / Nhân viên |
| 31 | Văn phòng / Phòng thuộc VKSND | - Chánh Văn phòng<br>- Phó Chánh Văn phòng<br>- Trưởng phòng<br>- Phó Trưởng phòng<br>- Kiểm sát viên cao cấp<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Điều tra viên cao cấp (đối với phòng thuộc CQĐT)<br>- Điều tra viên trung cấp (đối với phòng thuộc CQĐT)<br>- Điều tra viên sơ cấp (đối với phòng thuộc CQĐT)<br>- Kiểm tra viên<br>- Cán bộ điều tra (đối với phòng thuộc CQĐT)<br>- Chuyên viên / Kế toán trưởng / Kế toán viên / Văn thư viên / Nhân viên |
| 32 | Viện kiểm sát quân sự Trung ương | - Viện trưởng VKSQS Trung ương (Kiêm Phó Viện trưởng VKSND Tối cao)<br>- Phó Viện trưởng VKSQS Trung ương<br>- Ủy viên Ủy ban Kiểm sát VKSQS Trung ương<br>- Kiểm sát viên cao cấp<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Điều tra viên cao cấp<br>- Điều tra viên trung cấp<br>- Điều tra viên sơ cấp<br>- Kiểm tra viên<br>- Cán bộ điều tra |
| 33 | Viện kiểm sát quân sự Quân khu và tương đương | - Viện trưởng VKSQS Quân khu<br>- Phó Viện trưởng VKSQS Quân khu<br>- Ủy viên Ủy ban Kiểm sát VKSQS Quân khu<br>- Kiểm sát viên cao cấp<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Kiểm tra viên |
| 34 | Viện kiểm sát quân sự Khu vực | - Viện trưởng VKSQS Khu vực<br>- Phó Viện trưởng VKSQS Khu vực<br>- Kiểm sát viên trung cấp<br>- Kiểm sát viên sơ cấp<br>- Kiểm tra viên |
| | **Khối cơ quan chuyên môn thuộc UBND cấp Tỉnh/Thành phố** | |
| 35 | Sở | - Giám đốc Sở<br>- Phó Giám đốc Sở<br>- Chi cục trưởng<br>- Phó Chi cục trưởng<br>- Trưởng phòng và tương đương<br>- Phó Trưởng phòng và tương đương<br>- Thanh tra viên<br>- Chuyên viên cao cấp<br>- Chuyên viên chính<br>- Chuyên viên<br>- Cán sự |
| | **Ủy ban nhân dân các cấp** | |
| 36 | UBND cấp Tỉnh/Thành phố | - Chủ tịch UBND<br>- Phó Chủ tịch UBND<br>- Ủy viên UBND |
| 37 | UBND cấp Phường/Xã | - Chủ tịch UBND<br>- Phó Chủ tịch UBND<br>- Ủy viên UBND |
