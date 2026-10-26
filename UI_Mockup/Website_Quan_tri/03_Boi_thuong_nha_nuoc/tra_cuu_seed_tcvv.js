/**
 * tra_cuu_seed_tcvv.js - Dữ liệu giả lập bổ sung CHỈ cho màn Tra cứu vụ việc (tra_cuu_ho_so_boi_thuong.html).
 * - Không ghi vào claimsList / seed của Giải quyết YCBT; chỉ nối thêm vào danh sách do loadClaims() của trang trả về.
 * - Merge theo Mã hồ sơ GQBT: bản ghi đã có (localStorage claimsList / dữ liệu mẫu của trang) được giữ nguyên, chỉ thêm mã chưa có.
 * - Phủ đủ giá trị bộ lọc: 34 Tỉnh/Thành phố (theo Cơ quan giải quyết), 06 Lĩnh vực, 04 Nguồn hồ sơ, 15 Trạng thái,
 *   Lọc nhanh (Bồi thường thiệt hại / Phục hồi danh dự), cá nhân / tổ chức, Ngày tiếp nhận trải 3 tháng gần nhất và các năm trước.
 * Nạp sau script nội tuyến của trang: <script src="tra_cuu_seed_tcvv.js?v=20261026tcvv"></script>
 */
(function () {
    if (typeof window.loadClaims !== 'function') return;

    const HC = 'hành chính', HS = 'hình sự', DS = 'dân sự', TTHC = 'tố tụng hành chính', THAHS = 'thi hành án hình sự', THADS = 'thi hành án dân sự';
    const TN = 'Tiếp nhận mới', DVC = 'Dịch vụ công quốc gia', CH = 'Chuyển CQGQBT', XD = 'Xác định CQGQBT';
    const R_NBTH = 'Người bị thiệt hại', R_TK = 'Người thừa kế của người bị thiệt hại', R_DD = 'Người đại diện theo pháp luật của người bị thiệt hại',
        R_TCKT = 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại';

    // [Tỉnh/TP của CQGQ, Cơ quan giải quyết, Người yêu cầu, Loại (CN/TC), Tư cách, Người bị thiệt hại (khi khác NYC), Lĩnh vực,
    //  Trạng thái vụ việc, Nguồn hồ sơ, Loại yêu cầu (money/honor/both), Cán bộ xử lý (phân tách ';'), Nội dung trình (Chờ duyệt/Bị từ chối), Hành vi gây thiệt hại, Số tiền yêu cầu]
    const ROWS = [
        ['Hà Nội', 'UBND phường Hoàn Kiếm', 'Trần Văn Khải', 'CN', R_NBTH, '', HC, 'Cử người giải quyết bồi thường', TN, 'money', 'Nguyễn Thu Hà', '', 'Thu hồi giấy phép xây dựng không đúng thẩm quyền.', 145000000],
        ['Hồ Chí Minh', 'Công an TP. Hồ Chí Minh', 'Công ty TNHH Thương mại Sài Gòn Xanh', 'TC', R_NBTH, '', HS, 'Chờ duyệt', DVC, 'money', 'Lê Minh Tuấn', 'Quyết định GQBT', 'Kê biên, tạm giữ hàng hóa ngoài phạm vi vụ án.', 820000000],
        ['Hải Phòng', 'Tòa án nhân dân TP. Hải Phòng', 'Phạm Thị Lan', 'CN', R_TK, 'Phạm Văn Toàn', DS, 'Bị từ chối', CH, 'money', 'Đỗ Quang Huy', 'Hoãn giải quyết bồi thường', 'Áp dụng biện pháp khẩn cấp tạm thời không đúng quy định.', 260000000],
        ['Đà Nẵng', 'Tòa án nhân dân TP. Đà Nẵng', 'Công ty Cổ phần Vận tải Sông Hàn', 'TC', R_NBTH, '', TTHC, 'Xác minh thiệt hại', XD, 'money', 'Ngô Thị Mai; Phan Văn Lực', '', 'Bản án hành chính bị hủy do áp dụng sai pháp luật.', 540000000],
        ['Cần Thơ', 'Trại giam Cần Thơ', 'Huỳnh Văn Sang', 'CN', R_NBTH, '', THAHS, 'Thương lượng', TN, 'both', 'Trương Thị Bích', '', 'Thi hành án phạt tù quá thời hạn của bản án.', 310000000],
        ['Huế', 'Thi hành án dân sự TP. Huế', 'Hợp tác xã Nông nghiệp Hương Thủy', 'TC', R_NBTH, '', THADS, 'Chờ ban hành QĐ', DVC, 'money', 'Nguyễn Văn Bảo', '', 'Cưỡng chế giao tài sản sai người được thi hành án.', 410000000],
        ['An Giang', 'UBND tỉnh An Giang', 'Lâm Thị Thu', 'CN', R_NBTH, '', HC, 'Chờ thực thi', CH, 'money', 'Võ Thanh Tâm', '', 'Thu hồi đất không đúng đối tượng.', 680000000],
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
        ['Lai Châu', 'Tòa án nhân dân tỉnh Lai Châu', 'Giàng A Sử', 'CN', R_NBTH, '', TTHC, 'Bị từ chối', DVC, 'money', 'Tống Thị Lý', 'Quyết định GQBT', 'Bản án hành chính sơ thẩm bị hủy, quyết định hành chính trái luật.', 80000000],
        ['Lâm Đồng', 'Trại giam Đại Bình', 'Kơ Să Ha Thu', 'CN', R_TK, 'Kơ Să Ha Bin', THAHS, 'Xác minh thiệt hại', XD, 'both', 'Mai Văn Thành', '', 'Người chấp hành án bị thương tích do quản lý trại giam sai quy định.', 450000000],
        ['Lạng Sơn', 'Thi hành án dân sự tỉnh Lạng Sơn', 'Hoàng Văn Pảo', 'CN', R_NBTH, '', THADS, 'Thương lượng', CH, 'money', 'Lương Thị Thu', '', 'Cưỡng chế thi hành án vượt quá nghĩa vụ phải thi hành.', 190000000],
        ['Lào Cai', 'UBND tỉnh Lào Cai', 'Công ty Cổ phần Du lịch Sa Pa Xanh', 'TC', R_NBTH, '', HC, 'Chờ ban hành QĐ', TN, 'money', 'Hà Văn Long', '', 'Thu hồi giấy chứng nhận đầu tư không đúng quy định.', 1250000000],
        ['Nghệ An', 'Viện kiểm sát nhân dân tỉnh Nghệ An', 'Hồ Văn Thái', 'CN', R_NBTH, '', HS, 'Chờ thực thi', DVC, 'both', 'Nguyễn Thị Hải Yến', '', 'Tạm giam quá thời hạn luật định.', 520000000],
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
        ['Hà Nội', 'Thi hành án dân sự TP. Hà Nội', 'Công ty Cổ phần Xây dựng Thăng Long', 'TC', R_NBTH, '', THADS, 'Chờ thực thi', XD, 'money', 'Trần Thị Chuyên Viên', '', 'Kê biên, xử lý tài sản đang thế chấp không đúng thứ tự ưu tiên.', 1500000000],
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
        if (victim) {
            if (/^Tổ chức kế thừa/.test(role)) item.nbthOrgName = victim;
            item.nbth = { name: victim, orgName: victim };
        }
        if (apprKind) item.approvalKind = apprKind;
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
        return list;
    }

    const origLoadClaims = window.loadClaims;
    window.loadClaims = function () {
        const base = origLoadClaims.apply(this, arguments) || [];
        const codes = new Set(base.map(c => c && c.code).filter(Boolean));
        return base.concat(extraClaims().filter(c => !codes.has(c.code)));
    };
})();
