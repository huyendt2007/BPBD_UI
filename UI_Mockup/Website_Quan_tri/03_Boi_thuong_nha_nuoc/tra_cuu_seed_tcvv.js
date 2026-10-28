/**
 * tra_cuu_seed_tcvv.js - Dữ liệu giả lập bổ sung CHỈ cho màn Tra cứu vụ việc (tra_cuu_ho_so_boi_thuong.html).
 * - Không ghi vào claimsList / seed của Giải quyết YCBT; chỉ nối thêm vào danh sách do loadClaims() của trang trả về.
 * - Merge theo Mã hồ sơ GQBT: bản ghi đã có (localStorage claimsList / dữ liệu mẫu của trang) được giữ nguyên, chỉ thêm mã chưa có.
 * - Phủ đủ giá trị bộ lọc: cơ quan giải quyết trên toàn hệ thống, 06 Lĩnh vực, 15 Trạng thái, có / không yêu cầu phục hồi danh dự,
 *   cá nhân / tổ chức, Số giấy tờ người yêu cầu / người bị thiệt hại, 01-03 Văn bản làm căn cứ bồi thường.
 * - UNIT_ROWS: vụ việc của các cơ quan có tài khoản người dùng giả lập (Bộ Tư pháp, Sở Tư pháp TP. Hà Nội, UBND quận Cầu Giấy...) để demo quyền xem chi tiết.
 * Nạp sau script nội tuyến của trang: <script src="tra_cuu_seed_tcvv.js?v=20261027tcvv3"></script>
 * - Cũng nạp ở cuối quan_ly_boi_thuong.html: chỉ hoạt động khi ?readonly=1&tcvvPreview=1 (Xem chi tiết hồ sơ bổ sung, chỉ trong bộ nhớ).
 */
(function () {

    const HC = 'hành chính', HS = 'hình sự', DS = 'dân sự', TTHC = 'tố tụng hành chính', THAHS = 'thi hành án hình sự', THADS = 'thi hành án dân sự';
    const TN = 'Tiếp nhận mới', DVC = 'Dịch vụ công quốc gia', CH = 'Chuyển CQGQBT', XD = 'Xác định CQGQBT';
    const R_NBTH = 'Người bị thiệt hại', R_TK = 'Người thừa kế của người bị thiệt hại', R_DD = 'Người đại diện theo pháp luật của người bị thiệt hại',
        R_TCKT = 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại';

    // [Tỉnh/TP của CQGQ, Cơ quan giải quyết, Người yêu cầu, Loại (CN/TC), Tư cách, Người bị thiệt hại (khi khác NYC), Lĩnh vực,
    //  Trạng thái vụ việc, Nguồn hồ sơ, Loại yêu cầu (money/honor/both), Cán bộ xử lý (phân tách ';'), Nội dung trình (Chờ duyệt/Bị trả lại), Hành vi gây thiệt hại, Số tiền yêu cầu]
    const ROWS = [
        ['Hà Nội', 'UBND phường Hoàn Kiếm', 'Trần Văn Khải', 'CN', R_NBTH, '', HC, 'Cử người giải quyết bồi thường', TN, 'money', 'Nguyễn Thu Hà', '', 'Thu hồi giấy phép xây dựng không đúng thẩm quyền.', 145000000],
        ['Hồ Chí Minh', 'Công an TP. Hồ Chí Minh', 'Công ty TNHH Thương mại Sài Gòn Xanh', 'TC', R_NBTH, '', HS, 'Chờ duyệt', DVC, 'money', 'Lê Minh Tuấn', 'Quyết định GQBT', 'Kê biên, tạm giữ hàng hóa ngoài phạm vi vụ án.', 820000000],
        ['Hải Phòng', 'Tòa án nhân dân TP. Hải Phòng', 'Phạm Thị Lan', 'CN', R_TK, 'Phạm Văn Toàn', DS, 'Bị trả lại', CH, 'money', 'Đỗ Quang Huy', 'Hoãn giải quyết bồi thường', 'Áp dụng biện pháp khẩn cấp tạm thời không đúng quy định.', 260000000],
        ['Đà Nẵng', 'Tòa án nhân dân TP. Đà Nẵng', 'Công ty Cổ phần Vận tải Sông Hàn', 'TC', R_NBTH, '', TTHC, 'Xác minh thiệt hại', XD, 'money', 'Ngô Thị Mai; Phan Văn Lực', '', 'Bản án hành chính bị hủy do áp dụng sai pháp luật.', 540000000],
        ['Cần Thơ', 'Trại giam Cần Thơ', 'Huỳnh Văn Sang', 'CN', R_NBTH, '', THAHS, 'Thương lượng', TN, 'both', 'Trương Thị Bích', '', 'Thi hành án phạt tù quá thời hạn của bản án.', 310000000],
        ['Huế', 'Thi hành án dân sự TP. Huế', 'Hợp tác xã Nông nghiệp Hương Thủy', 'TC', R_NBTH, '', THADS, 'Chờ ban hành QĐ', DVC, 'money', 'Nguyễn Văn Bảo', '', 'Cưỡng chế giao tài sản sai người được thi hành án.', 410000000],
        ['An Giang', 'UBND tỉnh An Giang', 'Lâm Thị Thu', 'CN', R_NBTH, '', HC, 'Chờ chi trả', CH, 'money', 'Võ Thanh Tâm', '', 'Thu hồi đất không đúng đối tượng.', 680000000],
        ['Bắc Ninh', 'Viện kiểm sát nhân dân tỉnh Bắc Ninh', 'Nguyễn Văn Quyết', 'CN', R_NBTH, '', HS, 'Hoãn giải quyết', XD, 'both', 'Hoàng Thị Yến', '', 'Phê chuẩn lệnh bắt tạm giam người không phạm tội.', 390000000],
        ['Cà Mau', 'Công an tỉnh Cà Mau', 'Tạ Thị Hồng', 'CN', R_DD, 'Tạ Văn Khoa', HS, 'Tạm đình chỉ', TN, 'money', 'Lý Văn Sơn', '', 'Khởi tố bị can sau đó đình chỉ do không có hành vi phạm tội.', 175000000],
        ['Cao Bằng', 'Thi hành án dân sự tỉnh Cao Bằng', 'Công ty TNHH Khoáng sản Non Nước', 'TC', R_NBTH, '', THADS, 'Đình chỉ giải quyết', DVC, 'money', 'Nông Văn Thắng', '', 'Kê biên tài sản của bên thứ ba không có nghĩa vụ.', 230000000],
        ['Đắk Lắk', 'Tòa án nhân dân tỉnh Đắk Lắk', 'Y Bơ Niê', 'CN', R_NBTH, '', TTHC, 'Đã chuyển CQGQBT', TN, 'money', 'Phạm Ngọc Diệp', '', 'Quyết định hành chính bị Tòa án tuyên hủy.', 120000000],
        ['Điện Biên', 'Trại tạm giam Công an tỉnh Điện Biên', 'Lò Văn Pâng', 'CN', R_NBTH, '', THAHS, 'Đang phục hồi danh dự', XD, 'both', 'Quàng Thị Hoa', '', 'Không trả tự do đúng hạn cho người chấp hành xong án phạt.', 95000000],
        ['Đồng Nai', 'UBND tỉnh Đồng Nai', 'Công ty Cổ phần Gỗ Biên Hòa', 'TC', R_NBTH, '', HC, 'Hoãn phục hồi danh dự', CH, 'honor', 'Đặng Văn Hùng', '', 'Công bố thông tin vi phạm hành chính không đúng sự thật.', 0],
        ['Đồng Tháp', 'Viện kiểm sát nhân dân tỉnh Đồng Tháp', 'Trần Thị Kim Ngân', 'CN', R_NBTH, '', HS, 'Từ chối phục hồi danh dự', DVC, 'honor', 'Lê Hoàng Phúc', '', 'Truy tố oan, sau đó đình chỉ vụ án.', 0],
        ['Gia Lai', 'Tòa án nhân dân tỉnh Gia Lai', 'Rơ Mah Hlim', 'CN', R_NBTH, '', DS, 'Hoàn thành', TN, 'money', 'Nguyễn Đình Khang', '', 'Ra quyết định áp dụng biện pháp khẩn cấp tạm thời gây thiệt hại.', 150000000],
        ['Hà Tĩnh', 'Công an tỉnh Hà Tĩnh', 'Phan Văn Đức', 'CN', R_NBTH, '', HS, 'Hoàn thành', XD, 'both', 'Trần Quốc Việt', '', 'Bắt, tạm giữ người không đúng quy định.', 270000000],
        ['Hưng Yên', 'Thi hành án dân sự tỉnh Hưng Yên', 'Công ty TNHH Nhãn lồng Phố Hiến', 'TC', R_TCKT, 'Công ty TNHH Nông sản Phố Hiến', THADS, 'Cử người giải quyết bồi thường', CH, 'money', 'Vũ Thị Hạnh', '', 'Bán đấu giá tài sản không đúng giá khởi điểm.', 360000000],
        ['Khánh Hòa', 'UBND tỉnh Khánh Hòa', 'Lê Thị Bích Thủy', 'CN', R_NBTH, '', HC, 'Chờ duyệt', TN, 'both', 'Đinh Văn Nam', 'Tạm đình chỉ giải quyết bồi thường', 'Đình chỉ hoạt động kinh doanh không có căn cứ.', 210000000],
        ['Lai Châu', 'Tòa án nhân dân tỉnh Lai Châu', 'Giàng A Sử', 'CN', R_NBTH, '', TTHC, 'Bị trả lại', DVC, 'money', 'Tống Thị Lý', 'Quyết định GQBT', 'Bản án hành chính sơ thẩm bị hủy, quyết định hành chính trái luật.', 80000000],
        ['Lâm Đồng', 'Trại giam Đại Bình', 'Kơ Să Ha Thu', 'CN', R_TK, 'Kơ Să Ha Bin', THAHS, 'Xác minh thiệt hại', XD, 'both', 'Mai Văn Thành', '', 'Người chấp hành án bị thương tích do quản lý trại giam sai quy định.', 450000000],
        ['Lạng Sơn', 'Thi hành án dân sự tỉnh Lạng Sơn', 'Hoàng Văn Pảo', 'CN', R_NBTH, '', THADS, 'Thương lượng', CH, 'money', 'Lương Thị Thu', '', 'Cưỡng chế thi hành án vượt quá nghĩa vụ phải thi hành.', 190000000],
        ['Lào Cai', 'UBND tỉnh Lào Cai', 'Công ty Cổ phần Du lịch Sa Pa Xanh', 'TC', R_NBTH, '', HC, 'Chờ ban hành QĐ', TN, 'money', 'Hà Văn Long', '', 'Thu hồi giấy chứng nhận đầu tư không đúng quy định.', 1250000000],
        ['Nghệ An', 'Viện kiểm sát nhân dân tỉnh Nghệ An', 'Hồ Văn Thái', 'CN', R_NBTH, '', HS, 'Chờ chi trả', DVC, 'both', 'Nguyễn Thị Hải Yến', '', 'Tạm giam quá thời hạn luật định.', 520000000],
        ['Ninh Bình', 'Tòa án nhân dân tỉnh Ninh Bình', 'Đinh Thị Hương', 'CN', R_NBTH, '', DS, 'Hoãn giải quyết', XD, 'money', 'Bùi Văn Kiên', '', 'Tuyên kê biên tài sản không thuộc sở hữu của đương sự.', 175000000],
        ['Phú Thọ', 'Công an tỉnh Phú Thọ', 'Công ty TNHH Chè Hùng Vương', 'TC', R_NBTH, '', HC, 'Tạm đình chỉ', CH, 'money', 'Cao Thị Phượng', '', 'Tạm giữ tang vật, phương tiện quá thời hạn.', 240000000],
        ['Quảng Ngãi', 'Tòa án nhân dân tỉnh Quảng Ngãi', 'Phạm Văn Lộc', 'CN', R_NBTH, '', TTHC, 'Đình chỉ giải quyết', TN, 'money', 'Trịnh Văn Hòa', '', 'Quyết định cưỡng chế bị Tòa án tuyên hủy.', 110000000],
        ['Quảng Ninh', 'Trại giam Quảng Ninh', 'Vi Văn Tùng', 'CN', R_NBTH, '', THAHS, 'Đã chuyển CQGQBT', DVC, 'money', 'Phùng Thị Ngọc', '', 'Không xét giảm án đúng quy định gây chấp hành án quá hạn.', 130000000],
        ['Quảng Trị', 'Viện kiểm sát nhân dân tỉnh Quảng Trị', 'Lê Văn Hiền', 'CN', R_NBTH, '', HS, 'Đang phục hồi danh dự', TN, 'honor', 'Hoàng Minh Đức', '', 'Tuyên bị cáo không phạm tội sau khi bị truy tố.', 0],
        ['Sơn La', 'UBND tỉnh Sơn La', 'Cầm Thị Xuân', 'CN', R_DD, 'Cầm Văn Ơn', HC, 'Hoãn phục hồi danh dự', XD, 'both', 'Lò Thị Thanh', '', 'Xử phạt vi phạm hành chính sai đối tượng, đăng tải công khai.', 60000000],
        ['Tây Ninh', 'Công an tỉnh Tây Ninh', 'Nguyễn Hữu Phước', 'CN', R_NBTH, '', HS, 'Từ chối phục hồi danh dự', CH, 'both', 'Dương Văn Tài', '', 'Tạm giữ hình sự sau đó trả tự do do không có căn cứ.', 85000000],
        ['Thái Nguyên', 'Thi hành án dân sự tỉnh Thái Nguyên', 'Công ty Cổ phần Thép Gia Sàng', 'TC', R_NBTH, '', THADS, 'Hoàn thành', DVC, 'money', 'Nguyễn Văn Toản', '', 'Phong tỏa tài khoản vượt quá số tiền phải thi hành.', 730000000],
        ['Thanh Hóa', 'Tòa án nhân dân tỉnh Thanh Hóa', 'Lê Thị Nhàn', 'CN', R_NBTH, '', DS, 'Cử người giải quyết bồi thường', XD, 'honor', 'Lê Đình Trọng', '', 'Ra bản án dân sự trái pháp luật bị hủy theo thủ tục giám đốc thẩm.', 0],
        ['Tuyên Quang', 'UBND tỉnh Tuyên Quang', 'Ma Văn Thịnh', 'CN', R_NBTH, '', HC, 'Xác minh thiệt hại', TN, 'money', 'Chu Thị Lan', '', 'Cưỡng chế phá dỡ công trình không đúng quyết định.', 280000000],
        ['Vĩnh Long', 'Tòa án nhân dân tỉnh Vĩnh Long', 'Công ty TNHH Thủy sản Cửu Long', 'TC', R_NBTH, '', TTHC, 'Thương lượng', DVC, 'money', 'Thạch Văn Sơn', '', 'Quyết định hành chính về thuế bị Tòa án tuyên hủy.', 960000000],
        ['Hà Nội', 'Viện kiểm sát nhân dân TP. Hà Nội', 'Nguyễn Thị Thanh Tâm', 'CN', R_TK, 'Nguyễn Văn Bình', HS, 'Đang phục hồi danh dự', CH, 'both', 'Phạm Thu Trang; Lê Văn Chuyên Viên', '', 'Truy cứu trách nhiệm hình sự oan, người bị thiệt hại đã chết.', 900000000],
        ['Hà Nội', 'Cục Thi hành án dân sự Thành phố Hà Nội', 'Công ty Cổ phần Xây dựng Thăng Long', 'TC', R_NBTH, '', THADS, 'Chờ chi trả', XD, 'money', 'Hứa Thị Ngân', '', 'Kê biên, xử lý tài sản đang thế chấp không đúng thứ tự ưu tiên.', 1500000000],
        ['Hồ Chí Minh', 'Tòa án nhân dân TP. Hồ Chí Minh', 'Võ Thị Ngọc Ánh', 'CN', R_NBTH, '', DS, 'Hoàn thành', TN, 'honor', 'Nguyễn Hoàng Long', '', 'Bản án dân sự bị hủy, công bố thông tin sai về đương sự.', 0],
        ['Bắc Ninh', 'UBND tỉnh Bắc Ninh', 'Công ty TNHH Gốm Phù Lãng', 'TC', R_NBTH, '', HC, 'Chờ ban hành QĐ', CH, 'money', 'Phạm Minh Chuyên Viên', '', 'Đình chỉ hoạt động sản xuất không đúng thẩm quyền.', 330000000],
        ['Hải Phòng', 'Trại tạm giam Công an TP. Hải Phòng', 'Bùi Văn Hậu', 'CN', R_NBTH, '', THAHS, 'Hoãn giải quyết', DVC, 'money', 'Nguyễn Văn Chuyên Viên', '', 'Không thực hiện quyết định tha tù trước thời hạn đúng hạn.', 70000000],
        ['Đà Nẵng', 'Công an TP. Đà Nẵng', 'Trương Công Định', 'CN', R_NBTH, '', HS, 'Chờ duyệt', XD, 'honor', 'Lê Văn Chuyên Viên', 'Hoãn giải quyết bồi thường', 'Khởi tố bị can không có căn cứ, đã đình chỉ điều tra.', 0]
    ];

    // Vụ việc các năm trước (ngoài khoảng Ngày tiếp nhận mặc định): [số ngày trước hôm nay, ...như ROWS]
    const OLD_ROWS = [
        [150, 'Hà Nội', 'Tòa án nhân dân TP. Hà Nội', 'Đỗ Văn Lâm', 'CN', R_NBTH, '', TTHC, 'Hoàn thành', TN, 'money', 'Nguyễn Văn Chuyên Viên', '', 'Quyết định thu hồi đất bị Tòa án tuyên hủy.', 420000000],
        [260, 'Hồ Chí Minh', 'Thi hành án dân sự TP. Hồ Chí Minh', 'Công ty TNHH Dệt may Phú Lâm', 'TC', R_NBTH, '', THADS, 'Đình chỉ giải quyết', DVC, 'money', 'Trần Văn Hậu', '', 'Phong tỏa tài sản không thuộc diện thi hành án.', 610000000],
        [380, 'Nghệ An', 'Công an tỉnh Nghệ An', 'Nguyễn Thị Hoài', 'CN', R_NBTH, '', HS, 'Đang phục hồi danh dự', XD, 'both', 'Nguyễn Thị Hải Yến', '', 'Tạm giam oan trong giai đoạn điều tra.', 480000000],
        [470, 'Khánh Hòa', 'Tòa án nhân dân tỉnh Khánh Hòa', 'Trần Minh Quân', 'CN', R_NBTH, '', DS, 'Tạm đình chỉ', CH, 'money', 'Đinh Văn Nam', '', 'Quyết định áp dụng biện pháp khẩn cấp tạm thời sai quy định.', 155000000],
        [560, 'Bắc Ninh', 'Trại giam Ngọc Lý', 'Ngô Văn Thuận', 'CN', R_NBTH, '', THAHS, 'Hoàn thành', TN, 'both', 'Phạm Minh Chuyên Viên', '', 'Chấp hành án quá thời hạn do tính sai thời hạn tạm giam.', 260000000]
    ];

    // Vụ việc của các cơ quan giải quyết có tài khoản người dùng giả lập (tên đúng theo Cơ cấu tổ chức) - phục vụ demo quyền xem chi tiết theo đơn vị
    const UNIT_ROWS = [
        ['Hà Nội', 'Bộ Tư pháp', 'Lê Quang Vinh', 'CN', R_NBTH, '', HC, 'Xác minh thiệt hại', XD, 'money', 'Nguyễn Văn Cán Bộ', '', 'Thu hồi chứng chỉ hành nghề luật sư không đúng quy định.', 120000000],
        ['Hà Nội', 'Bộ Tư pháp', 'Công ty Luật TNHH Minh Đức', 'TC', R_NBTH, '', HC, 'Thương lượng', XD, 'money', 'Trần Thị Thu Hà', '', 'Đình chỉ hoạt động tổ chức hành nghề luật sư không có căn cứ.', 450000000],
        ['Hà Nội', 'Bộ Tư pháp', 'Phạm Thị Ngọc', 'CN', R_NBTH, '', HC, 'Đang phục hồi danh dự', TN, 'both', 'Phạm Minh Đức', '', 'Công bố quyết định xử lý kỷ luật công chứng viên không đúng sự thật.', 80000000],
        ['Hà Nội', 'Sở Tư pháp Thành phố Hà Nội', 'Đoàn Văn Hưng', 'CN', R_NBTH, '', HC, 'Cử người giải quyết bồi thường', TN, 'money', 'Đỗ Văn Chung', '', 'Xử phạt vi phạm hành chính trong lĩnh vực công chứng không đúng thẩm quyền.', 60000000],
        ['Hà Nội', 'Sở Tư pháp Thành phố Hà Nội', 'Văn phòng Công chứng Hồng Hà', 'TC', R_NBTH, '', HC, 'Chờ ban hành QĐ', DVC, 'money', 'Ngô Thị Lan', '', 'Tạm đình chỉ hoạt động văn phòng công chứng trái quy định.', 310000000],
        ['Hà Nội', 'UBND quận Cầu Giấy, Thành phố Hà Nội', 'Nguyễn Thị Mận', 'CN', R_NBTH, '', HC, 'Thương lượng', TN, 'money', 'Kiều Văn Nam', '', 'Cưỡng chế phá dỡ công trình khi quyết định cưỡng chế đã bị hủy.', 230000000],
        ['Hà Nội', 'Tòa án nhân dân Thành phố Hà Nội', 'Trịnh Văn Khôi', 'CN', R_TK, 'Trịnh Văn Lực', DS, 'Xác minh thiệt hại', CH, 'money', 'Lại Thị Hương Giang', '', 'Áp dụng biện pháp khẩn cấp tạm thời phong tỏa tài sản không đúng quy định.', 520000000],
        ['Lâm Đồng', 'Tòa án nhân dân tỉnh Lâm Đồng', 'Ka Hoa', 'CN', R_NBTH, '', TTHC, 'Chờ chi trả', XD, 'money', 'Hà Minh Tâm', '', 'Bản án hành chính bị hủy do áp dụng sai pháp luật đất đai.', 175000000],
        ['Hà Nội', 'Công an quận Thanh Xuân, Thành phố Hà Nội', 'Bùi Đức Anh', 'CN', R_NBTH, '', HS, 'Hoàn thành', TN, 'both', 'Nguyễn Hữu Phước', '', 'Tạm giữ hình sự không có căn cứ, sau đó trả tự do.', 140000000]
    ];

    // Vụ việc đầu luồng (Chờ tiếp nhận, Yêu cầu bổ sung, Chờ duyệt / Bị trả lại Thông báo, Không thụ lý, Đã chuyển CQGQBT do Không thụ lý KTL_01)
    // Phần tử 15 (tùy chọn): trường bổ sung của hồ sơ
    const EARLY_ROWS = [
        ['Hà Nội', 'Bộ Tư pháp', 'Hoàng Minh Tuấn', 'CN', R_NBTH, '', HC, 'Chờ tiếp nhận', DVC, 'money', '', '', 'Từ chối cấp phiếu lý lịch tư pháp không đúng quy định.', 40000000],
        ['Hà Nội', 'UBND quận Cầu Giấy, Thành phố Hà Nội', 'Công ty TNHH Thực phẩm Dịch Vọng', 'TC', R_NBTH, '', HC, 'Chờ tiếp nhận', TN, 'money', '', '', 'Đình chỉ hoạt động cơ sở kinh doanh không có căn cứ.', 260000000],
        ['Lâm Đồng', 'Tòa án nhân dân tỉnh Lâm Đồng', 'K\'Brăng', 'CN', R_NBTH, '', DS, 'Chờ tiếp nhận', DVC, 'both', '', '', 'Kê biên tài sản ngoài phạm vi yêu cầu của đương sự.', 90000000],
        ['Hà Nội', 'Sở Tư pháp Thành phố Hà Nội', 'Lý Thị Hằng', 'CN', R_NBTH, '', HC, 'Yêu cầu bổ sung', TN, 'money', 'Đỗ Văn Chung', '', 'Thu hồi thẻ công chứng viên không đúng thẩm quyền.', 55000000],
        ['Hải Phòng', 'Cục Thi hành án dân sự Thành phố Hải Phòng', 'Công ty Cổ phần Cảng Đình Vũ', 'TC', R_NBTH, '', THADS, 'Yêu cầu bổ sung', CH, 'money', 'Lục Thị Hoa', '', 'Cưỡng chế thi hành án đối với tài sản của bên thứ ba.', 880000000],
        ['Hà Nội', 'Bộ Tư pháp', 'Văn phòng Luật sư Ánh Dương', 'TC', R_NBTH, '', HC, 'Chờ duyệt', TN, 'money', 'Trần Thị Thu Hà', 'Thông báo thụ lý hồ sơ', 'Thu hồi giấy đăng ký hoạt động tổ chức hành nghề luật sư trái quy định.', 150000000],
        ['Hà Nội', 'Công an quận Thanh Xuân, Thành phố Hà Nội', 'Đặng Quốc Hưng', 'CN', R_NBTH, '', HS, 'Chờ duyệt', DVC, 'both', 'Đào Thị Mỹ Linh', 'Thông báo Không thụ lý', 'Tạm giữ người theo thủ tục hành chính quá thời hạn.', 30000000],
        ['Lâm Đồng', 'UBND tỉnh Lâm Đồng', 'Nguyễn Văn Sáu', 'CN', R_NBTH, '', HC, 'Bị trả lại', TN, 'money', 'Ông Thị Thảo', 'Thông báo Yêu cầu bổ sung', 'Thu hồi đất không đúng đối tượng sử dụng đất.', 410000000],
        ['Hà Nội', 'Tòa án nhân dân Thành phố Hà Nội', 'Mai Văn Tiến', 'CN', R_NBTH, '', DS, 'Không thụ lý', CH, 'money', 'Cao Văn Hiếu', '', 'Yêu cầu bồi thường đã được giải quyết bằng bản án có hiệu lực.', 120000000, { ktlReasonCode: 'KTL_08' }],
        ['Hà Nội', 'Bộ Tư pháp', 'Công ty TNHH Đấu giá Thăng Long', 'TC', R_NBTH, '', HC, 'Không thụ lý', TN, 'money', 'Phạm Minh Đức', '', 'Thu hồi chứng chỉ hành nghề đấu giá viên.', 70000000, { ktlReasonCode: 'KTL_03' }],
        ['Hà Nội', 'Sở Tư pháp Thành phố Hà Nội', 'Trần Văn Lợi', 'CN', R_NBTH, '', HC, 'Đã chuyển CQGQBT', TN, 'money', 'Ngô Thị Lan', '', 'Xử phạt vi phạm hành chính không đúng thẩm quyền, chuyển cơ quan có thẩm quyền.', 45000000, { ktlReasonCode: 'KTL_01', rejectType: 'Không thụ lý' }]
    ];

    // Văn bản làm căn cứ bồi thường theo Lĩnh vực (dữ liệu giả lập)
    const VBCC = {
        [HC]: ['Quyết định hủy quyết định hành chính số {n}/QĐ-UBND', 'Kết luận thanh tra số {n}/KL-TTr', 'Quyết định giải quyết khiếu nại số {n}/QĐ-GQKN'],
        [HS]: ['Quyết định đình chỉ điều tra số {n}/QĐ-CSĐT', 'Quyết định đình chỉ vụ án số {n}/QĐ-VKS', 'Bản án hình sự phúc thẩm số {n}/2026/HS-PT'],
        [DS]: ['Quyết định giám đốc thẩm số {n}/2026/DS-GĐT', 'Bản án dân sự phúc thẩm số {n}/2026/DS-PT', 'Quyết định hủy biện pháp khẩn cấp tạm thời số {n}/QĐ-BPKCTT'],
        [TTHC]: ['Bản án hành chính phúc thẩm số {n}/2026/HC-PT', 'Quyết định giám đốc thẩm số {n}/2026/HC-GĐT', 'Bản án hành chính sơ thẩm số {n}/2026/HC-ST'],
        [THAHS]: ['Quyết định trả tự do số {n}/QĐ-TG', 'Kết luận kiểm sát số {n}/KL-VKS', 'Quyết định giảm thời hạn chấp hành án số {n}/QĐ-TA'],
        [THADS]: ['Quyết định hủy quyết định cưỡng chế số {n}/QĐ-THADS', 'Kết luận kiểm sát số {n}/KL-VKS', 'Quyết định giải quyết khiếu nại số {n}/QĐ-GQKN']
    };
    // Số giấy tờ giả lập: CCCD 12 số (cá nhân), Mã số tổ chức 10 số (tổ chức)
    const cccd = s => '0' + String((s * 7919) % 100).padStart(2, '0') + '0' + String(80 + (s % 20)) + String(100000 + ((s * 48271) % 900000));
    const mst = s => '0' + String(100000000 + ((s * 7393) % 900000000));

    const pad = n => String(n).padStart(2, '0');
    const fmt = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    const PHDD_STATUSES = ['Đang phục hồi danh dự', 'Hoãn phục hồi danh dự', 'Từ chối phục hồi danh dự'];

    function wardOf(province, idx) {
        const wards = (window.DiaBanVN && DiaBanVN.wards(province)) || [];
        return wards.length ? wards[idx % wards.length] : '';
    }

    function build(r, idx, date, serial) {
        const [prov, agency, nyc, type, role, victim, fieldGroup, status, nguon, kind, officers, apprKind, hanhVi, money] = r;
        const year = date.getFullYear();
        const names = officers.split(';').map(s => s.trim()).filter(Boolean);
        const item = {
            id: 'TCVV_' + pad(serial), code: `BT-${year}-${600 + serial}`,
            date: fmt(date), updatedDate: fmt(date),
            nyc, nycName: nyc, nycType: type === 'TC' ? 'Tổ chức' : 'Cá nhân', nycRole: role, role,
            nycTinhThanh: prov, address: prov,
            hanhVi, fieldGroup, agency, agencyProvince: prov, agencyWard: wardOf(prov, idx * 3 + 1),
            assignedOfficer: names[0] || '', appointedOfficers: names.map(name => ({ name })),
            nguonHoSo: nguon, requestType: kind, restoreHonor: kind !== 'money', totalNum: money, status
        };
        // Số giấy tờ người yêu cầu: tổ chức -> Mã số tổ chức; cá nhân -> CCCD
        if (type === 'TC') item.nycOrgCode = mst(serial); else { item.cardNo = cccd(serial); item.nycCardNo = item.cardNo; item.nycCardType = 'Căn cước công dân'; }
        // Văn bản làm căn cứ bồi thường: 01-03 văn bản
        const vbCount = 1 + (serial % 3 === 0 ? 1 : 0) + (serial % 5 === 0 ? 1 : 0);
        item.vanBanCanCu = (VBCC[fieldGroup] || VBCC[HC]).slice(0, vbCount).map((t, k) => ({ name: t.replace('{n}', String(10 + serial * 3 + k)), file: '' }));
        if (victim) {
            const isOrgVictim = /^Tổ chức kế thừa/.test(role);
            if (isOrgVictim) { item.nbthOrgName = victim; item.nbthOrgCode = mst(serial + 500); }
            // Người thừa kế của người bị thiệt hại (người bị thiệt hại đã chết): dữ liệu giả lập không có số giấy tờ -> hiển thị "-"
            item.nbth = { name: victim, orgName: victim, docNo: isOrgVictim || role === R_TK ? '' : cccd(serial + 300) };
        }
        if (apprKind) item.approvalKind = apprKind;
        if (r[14] && typeof r[14] === 'object') Object.assign(item, r[14]);
        if (kind !== 'money' && PHDD_STATUSES.includes(status)) {
            // Trạng thái Phục hồi danh dự: vụ việc cả hai -> GQ YCBT đã Hoàn thành; chỉ PHDD -> đã bắt đầu PHDD
            item.phddStarted = true; item.phddStatus = status;
            item.status = kind === 'both' ? 'Hoàn thành' : status;
        } else if (kind !== 'money' && status === 'Hoàn thành') {
            item.phddStarted = true; item.phddStatus = 'Hoàn thành';
        }
        // Năm trước: gắn sẵn Mã vụ việc cùng năm (không ảnh hưởng số thứ tự cấp mới của năm hiện tại)
        if (year !== new Date().getFullYear()) item.maVuViec = `VVBT-${year}-${600 + serial}`;
        return item;
    }

    function extraClaims() {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        const span = Math.max(1, Math.floor((today - start) / 86400000));
        const list = ROWS.map((r, i) => {
            const d = new Date(start.getTime()); d.setDate(d.getDate() + Math.floor((i * span) / ROWS.length));
            return build(r, i, d, i + 1);
        });
        OLD_ROWS.forEach((r, j) => {
            const d = new Date(today.getTime()); d.setDate(d.getDate() - r[0]);
            list.push(build(r.slice(1), ROWS.length + j, d, ROWS.length + j + 1));
        });
        // Thêm sau OLD_ROWS để không đổi Mã hồ sơ GQBT của các dòng đã có
        const base = ROWS.length + OLD_ROWS.length;
        UNIT_ROWS.forEach((r, k) => {
            const d = new Date(start.getTime()); d.setDate(d.getDate() + Math.floor(((k * 2 + 1) * span) / (UNIT_ROWS.length * 2)));
            list.push(build(r, base + k, d, base + k + 1));
        });
        const base2 = base + UNIT_ROWS.length;
        EARLY_ROWS.forEach((r, k) => {
            const d = new Date(today.getTime()); d.setDate(d.getDate() - (k % 20));
            list.push(build(r, base2 + k, d, base2 + k + 1));
        });
        return list;
    }

    // ===== 1. Trang Tra cứu vụ việc: nối dữ liệu bổ sung + đánh dấu link Xem chi tiết của bản ghi bổ sung =====
    if (typeof window.loadClaims === 'function' && typeof window.tcvvBuildDetailUrl === 'function') {
        const origLoadClaims = window.loadClaims;
        window.loadClaims = function () {
            const base = origLoadClaims.apply(this, arguments) || [];
            const codes = new Set(base.map(c => c && c.code).filter(Boolean));
            return base.concat(extraClaims().filter(c => !codes.has(c.code)));
        };
        // Bản ghi bổ sung không có trong dữ liệu Giải quyết YCBT: thêm tcvvPreview=1 để màn Xem chi tiết (chỉ xem) dựng lại hồ sơ từ file này
        const origBuildUrl = window.tcvvBuildDetailUrl;
        window.tcvvBuildDetailUrl = function (code) {
            const url = origBuildUrl.apply(this, arguments);
            return extraClaims().some(c => c.code === code) ? url + '&tcvvPreview=1' : url;
        };
        return;
    }

    // ===== 2. Trang Giải quyết YCBT, chỉ khi Xem chi tiết mở từ Tra cứu: ?readonly=1&returnUrl=tra_cuu_ho_so_boi_thuong.html... =====
    if (typeof window.findClaimByAnyCode !== 'function') return;
    const q = new URLSearchParams(window.location.search);
    if (q.get('readonly') !== '1' || !/tra_cuu_ho_so_boi_thuong\.html/.test(q.get('returnUrl') || '')) return;

    // 2a. Mọi hồ sơ (kể cả hồ sơ gốc): không áp dụng giới hạn "chỉ cán bộ được cử mới được xem" ở chế độ chỉ xem
    if (typeof window.isClaimRestrictedToAppointed === 'function') window.isClaimRestrictedToAppointed = function () { return false; };
    // 2b. Tab mở mặc định: Phục hồi danh dự khi focusTab=phdd (Đang / Hoãn phục hồi danh dự); còn lại: Thông tin hồ sơ vụ việc
    if (typeof window.showCaseDetail === 'function' && typeof window.switchDetailTab === 'function') {
        const focusPhdd = (q.get('focusTab') || q.get('subTab')) === 'phdd';
        const origShow = window.showCaseDetail;
        window.showCaseDetail = function () {
            const res = origShow.apply(this, arguments);
            if (!focusPhdd) { try { switchDetailTab('chung'); } catch (e) { } }
            return res;
        };
    }

    // 2c. Hồ sơ giả lập riêng của Tra cứu (?tcvvPreview=1): chỉ nạp vào bộ nhớ để Xem chi tiết; không lưu vào claimsList / kho dữ liệu khác, không hiển thị ở lưới.
    if (q.get('tcvvPreview') !== '1') return;
    const code = String(q.get('id') || q.get('viewCode') || '').trim();
    const claim = extraClaims().find(c => c.code === code);
    if (!claim) return;
    const isPreview = x => !!x && typeof x === 'object' && (x.code === code || x.claimCode === code || x.id === claim.id);

    // Chặn ghi hồ sơ xem trước xuống localStorage / sessionStorage (mảng: bỏ phần tử; đối tượng: bỏ khóa theo mã / id)
    const origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
        if (typeof value === 'string' && (value.indexOf(code) >= 0 || value.indexOf(claim.id) >= 0) && key !== 'btnn_vuviec_registry_v1') {
            try {
                const data = JSON.parse(value);
                if (Array.isArray(data)) value = JSON.stringify(data.filter(x => !isPreview(x)));
                else if (data && typeof data === 'object') { delete data[code]; delete data[claim.id]; value = JSON.stringify(data); }
            } catch (e) { }
        }
        return origSetItem.call(this, key, value);
    };

    const origFind = window.findClaimByAnyCode;
    window.findClaimByAnyCode = function (c) {
        const found = origFind.apply(this, arguments);
        if (found || String(c || '').trim() !== code) return found;
        try {
            if (!claim.maVuViec && window.BTNN_WF && BTNN_WF.vuViecOf) claim.maVuViec = BTNN_WF.vuViecOf(code) || ''; // cùng Mã vụ việc đã cấp tại Tra cứu (sổ đăng ký dùng chung)
            if (typeof claimsList !== 'undefined' && Array.isArray(claimsList) && !claimsList.some(isPreview)) claimsList.push(claim);
        } catch (e) { }
        return claim;
    };
})();
