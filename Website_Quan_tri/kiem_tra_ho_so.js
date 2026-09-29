/**
 * Xử lý logic SPA cho UC028 - Màn hình Xem chi tiết hồ sơ (Three-Pane Layout)
 * Áp dụng tổng quát cho cả 9 loại hồ sơ theo quy chuẩn Design System.
 */

let currentListTab = 'choduyet';
let currentSortColumn = null; // null = sắp xếp mặc định của từng danh sách
let currentSortOrder = 'asc';
let activeDetailTab = 'nguoidangky'; // Mặc định Tab chi tiết là Người đăng ký & Tham chiếu
let activeLifecycleNode = null;
let currentProfile = null; // Hồ sơ đang xem chi tiết
let showDiffOnly = false; // Bật/tắt chỉ hiển thị biến động

// Mock data chi tiết 12 hồ sơ để kiểm tra đầy đủ 9 loại và có tối thiểu 10 bản ghi trong hệ thống
let mockProfiles = [
    {
        id: 'GDBD-2026-000812',
        date: '28/06/2026 10:30',
        customer: 'Công ty Cổ phần Đầu tư Minh Tâm',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '847291',
        customerId: 'KH-MINHTAM-01',
        receipt: 'BL-991827-01',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '28/06/2026 10:30', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '28/06/2026 10:32', user: 'Hệ thống', action: 'Tự động kiểm soát', comment: 'Khớp nối thành công, không phát hiện rủi ro nghiêm trọng.' },
            { time: '28/06/2026 10:30', user: 'Portal Khách hàng', action: 'Gửi hồ sơ', comment: 'Khách hàng hoàn tất nộp & thanh toán lệ phí trực tuyến.' }
        ]
    },
    {
        id: 'GDBD-2026-000813',
        date: '29/06/2026 14:15',
        customer: 'Ông Nguyễn Văn Hùng',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Cầm cố',
        status: 'Chờ duyệt',
        statusClass: 'badge-warning',
        pin: '182749',
        customerId: 'KH-HUNG-02',
        receipt: 'BL-991827-02',
        assetType: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
        channel: 'Trực tiếp tại quầy',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '20/04/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '29/06/2026 14:15', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 14:18', user: 'Hệ thống', action: 'Tự động kiểm soát', comment: 'Phát hiện sửa đổi Số hợp đồng & bổ sung Bên bảo đảm.' },
            { time: '29/06/2026 14:15', user: 'Portal Khách hàng', action: 'Gửi hồ sơ', comment: 'Nộp hồ sơ Đăng ký thay đổi.' }
        ]
    },
    {
        id: 'GDBD-2026-000814',
        date: '30/06/2026 08:30',
        customer: 'Bà Trần Thị Lan',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Bảo lưu quyền sở hữu',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '291830',
        customerId: 'KH-LAN-03',
        receipt: 'BL-991827-03',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '15/04/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 08:30', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 09:00', user: 'Đăng ký viên Nguyễn Văn B', action: 'Phê duyệt', comment: 'Hồ sơ đầy đủ căn cứ pháp lý giải chấp. Chờ trình ký Lãnh đạo.' },
            { time: '30/06/2026 08:32', user: 'Hệ thống', action: 'Tự động kiểm soát', comment: 'Kiểm tra nợ phí: Không phát hiện nợ lệ phí.' }
        ]
    },
    {
        id: 'GDBD-2026-000815',
        date: '30/06/2026 09:45',
        customer: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Yêu cầu cung cấp bản sao',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng cho thuê tài chính',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '102938',
        customerId: 'KH-VCB-04',
        receipt: 'BL-991827-04',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)',
        channel: 'Qua bưu chính',
        timeline: [
            { id: 'node-1', title: 'Yêu cầu cung cấp bản sao', date: '30/06/2026 09:45', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 09:47', user: 'Hệ thống', action: 'Kiểm tra phí', comment: 'Lệ phí cung cấp bản sao: 30,000 VND. Trạng thái: Đã thanh toán.' }
        ]
    },
    {
        id: 'GDBD-2026-000816',
        date: '30/06/2026 11:00',
        customer: 'Công ty Luật TNHH Trí Việt',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Yêu cầu cung cấp bản sao kèm thông báo',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng ký gửi',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '908172',
        customerId: 'KH-TRIVIET-05',
        receipt: 'BL-991827-05',
        assetType: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Yêu cầu bản sao + Thông báo', date: '30/06/2026 11:00', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 11:02', user: 'Hệ thống', action: 'Kiểm tra phí', comment: 'Lệ phí yêu cầu: 50,000 VND. Trạng thái: Đã thanh toán.' }
        ]
    },
    {
        id: 'GDBD-2026-000817',
        date: '30/06/2026 14:00',
        customer: 'Ông Phạm Minh Đức',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Yêu cầu cung cấp thông tin',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '283749',
        customerId: 'KH-DUC-06',
        receipt: 'BL-991827-06',
        assetType: 'Cây hằng năm, công trình tạm',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Yêu cầu cung cấp thông tin', date: '30/06/2026 14:00', status: 'Chờ duyệt', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 14:02', user: 'Hệ thống', action: 'Kiểm tra phí', comment: 'Lệ phí tra cứu: 30,000 VND. Trạng thái: Đã thanh toán.' }
        ]
    },
    {
        id: 'GDBD-2026-000818',
        date: '30/06/2026 15:30',
        customer: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Thông báo xử lý tài sản',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '482719',
        customerId: 'KH-BIDV-07',
        receipt: 'BL-991827-07',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Qua bưu chính',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/01/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '30/06/2026 15:30', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 15:32', user: 'Hệ thống', action: 'Đối soát tài sản', comment: 'Xác định yêu cầu xử lý 1/2 tài sản bảo đảm trong hồ sơ gốc.' }
        ]
    },
    {
        id: 'GDBD-2026-000819',
        date: '30/06/2026 16:15',
        customer: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        type: 'Thay đổi thông báo xử lý tài sản',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '581920',
        customerId: 'KH-TCB-08',
        receipt: 'BL-991827-08',
        assetType: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '05/01/2026 10:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '25/05/2026 15:00', status: 'Hoàn thành', active: false },
            { id: 'node-3', title: 'Thay đổi thông báo xử lý', date: '30/06/2026 16:15', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 16:18', user: 'Hệ thống', action: 'Đối soát thay đổi', comment: 'Phát hiện thay đổi Địa điểm xử lý tài sản sang Hải Phòng.' }
        ]
    },
    {
        id: 'GDBD-2026-000820',
        date: '30/06/2026 17:00',
        customer: 'Ngân hàng TMCP Quân đội (MB Bank)',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Xóa thông báo xử lý tài sản',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '681920',
        customerId: 'KH-MB-09',
        receipt: 'BL-991827-09',
        assetType: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt',
        channel: 'Trực tiếp tại quầy',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '01/01/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '12/04/2026 11:00', status: 'Hoàn thành', active: false },
            { id: 'node-3', title: 'Xóa thông báo xử lý', date: '30/06/2026 17:00', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:02', user: 'Hệ thống', action: 'Khôi phục trạng thái', comment: 'Thiết lập khôi phục trạng thái bình thường cho các tài sản bảo đảm.' }
        ]
    },
    {
        id: 'GDBD-2026-000821',
        date: '30/06/2026 17:15',
        customer: 'Công ty TNHH Thương mại Dịch vụ An Phát',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị từ chối',
        statusClass: 'badge-danger',
        pin: '109283',
        customerId: 'KH-ANPHAT-10',
        receipt: 'BL-991827-10',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '30/06/2026 17:15', status: 'Bị từ chối', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:16', user: 'Hệ thống', action: 'Kiểm tra chéo', comment: 'Hồ sơ đầy đủ tính pháp lý.' }
        ]
    },
    {
        id: 'GDBD-2026-000822',
        date: '30/06/2026 17:30',
        customer: 'Công ty Cổ phần Xây dựng Hòa Bình',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Hợp đồng',
        subtype: 'Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác',
        status: 'Bị trả lại',
        statusClass: 'badge-danger',
        pin: '782910',
        customerId: 'KH-HOABINH-11',
        receipt: 'BL-991827-11',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)',
        channel: 'Cách thức điện tử',
        handlingOfficer: 'Nguyễn Văn Cán Bộ',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '02/02/2026 09:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '30/06/2026 17:30', status: 'Bị trả lại', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:35', user: 'Lãnh đạo TTĐK', action: 'Trả lại', comment: 'Sai lệch thông tin bên bảo đảm, yêu cầu kiểm tra lại.' },
            { time: '30/06/2026 17:32', user: 'Hệ thống', action: 'Đối soát tự động', comment: 'Thay đổi thông tin Bên bảo đảm.' }
        ]
    },
    {
        id: 'GDBD-2026-000823',
        date: '30/06/2026 17:45',
        customer: 'Tổng Công ty Vận tải Hà Nội',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '901827',
        customerId: 'KH-TRANSPERCO-12',
        receipt: 'BL-991827-12',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Trực tiếp tại quầy',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/03/2026 08:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 17:45', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:47', user: 'Cán bộ nghiệp vụ TTĐK', action: 'Trình ký', comment: 'Hoàn tất thủ tục trình duyệt giải chấp.' }
        ]
    },
    {
        id: 'GDBD-2026-000830',
        paper: 'PG-0138',
        date: '30/06/2026 18:00',
        customer: 'Ông Nguyễn Văn A',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký lần đầu',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ giải quyết',
        statusClass: 'badge-warning',
        pin: '109283',
        customerId: '',
        receipt: 'BL-991827-10',
        assetType: 'Chưa nhập liệu',
        channel: 'Trực tiếp tại quầy',
        customerType: 'vang_lai',
        phone: '0901234567',
        email: 'nguyenvana@gmail.com',
        paymentMethod: 'tien_mat',
        resultMethod: 'truc_tiep',
        timeline: [
            { id: 'node-1', title: 'Tiếp nhận quầy', date: '30/06/2026 18:00', status: 'Chờ giải quyết', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 18:00', user: 'Quầy Một Cửa', action: 'Tiếp nhận', comment: 'Đã nộp đơn giấy & In biên lai đóng phí.' }
        ]
    },
    {
        id: 'GDBD-2026-000831',
        paper: 'PG-0139',
        date: '30/06/2026 18:15',
        customer: 'Công ty TNHH Thương mại Dịch vụ An Phát',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ giải quyết',
        statusClass: 'badge-warning',
        pin: '189283',
        customerId: 'KH-ANPHAT-10',
        receipt: 'BL-991827-11',
        assetType: 'Chưa nhập liệu',
        channel: 'Trực tiếp tại quầy',
        customerType: 'dinh_danh',
        phone: '0918889999',
        email: 'info@anphat.com',
        paymentMethod: 'chuyen_khoan',
        resultMethod: 'buu_chinh',
        timeline: [
            { id: 'node-1', title: 'Tiếp nhận quầy', date: '30/06/2026 18:15', status: 'Chờ giải quyết', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 18:15', user: 'Quầy Một Cửa', action: 'Tiếp nhận', comment: 'Đã nộp đơn giấy & In biên lai đóng phí.' }
        ]
    },
    {
        id: 'GDBD-2026-000840',
        date: '29/06/2026 11:20',
        customer: 'Công ty Cổ phần Sông Đà',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Hoàn thành',
        statusClass: 'badge-success',
        pin: '902834',
        customerId: 'KH-SONGDA-05',
        receipt: 'BL-991827-20',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ...)',
        channel: 'Cách thức điện tử',
        customerType: 'dinh_danh',
        phone: '0915678901',
        email: 'lienhe@songda.vn',
        paymentMethod: 'chuyen_khoan',
        resultMethod: 'dien_tu',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '29/06/2026 11:20', status: 'Hoàn thành', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 11:25', user: 'Lãnh đạo ký duyệt', action: 'Ký duyệt số', comment: 'Hoàn tất chứng nhận đăng ký.' }
        ]
    },
    {
        id: 'GDBD-2026-000841',
        date: '25/06/2026 16:30',
        customer: 'Bà Phạm Thị Tuyết',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị từ chối',
        statusClass: 'badge-danger',
        pin: '829302',
        customerId: 'KH-VANGLAI',
        receipt: 'BL-991827-21',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung...',
        channel: 'Trực tiếp tại quầy',
        customerType: 'vang_lai',
        phone: '0983222333',
        email: 'tuyetpham@gmail.com',
        paymentMethod: 'tien_mat',
        resultMethod: 'truc_tiep',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '25/06/2026 16:30', status: 'Bị từ chối', active: true }
        ],
        internalLogs: [
            { time: '25/06/2026 16:35', user: 'Cán bộ phê duyệt', action: 'Từ chối', comment: 'Không bổ sung đầy đủ bản gốc hợp đồng phụ lục.' }
        ]
    },
    {
        id: 'GDBD-2026-000832',
        paper: 'PG-0140',
        date: '30/06/2026 18:30',
        customer: 'Bà Nguyễn Thị Bình',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ giải quyết',
        statusClass: 'badge-warning',
        pin: '293847',
        customerId: '',
        receipt: 'BL-991827-12',
        assetType: 'Chưa nhập liệu',
        channel: 'Trực tiếp tại quầy',
        customerType: 'vang_lai',
        phone: '0977666555',
        email: 'binhnguyen@gmail.com',
        paymentMethod: 'tien_mat',
        resultMethod: 'truc_tiep',
        timeline: [
            { id: 'node-1', title: 'Tiếp nhận quầy', date: '30/06/2026 18:30', status: 'Chờ giải quyết', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 18:30', user: 'Quầy Một Cửa', action: 'Tiếp nhận', comment: 'Đã nộp đơn giấy & In biên lai đóng phí.' }
        ]
    },
    {
        id: 'GDBD-2026-000824',
        date: '30/06/2026 18:45',
        customer: 'Công ty TNHH Thép Việt',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị trả lại',
        statusClass: 'badge-danger',
        pin: '891029',
        customerId: 'KH-THEPVIET-12',
        receipt: 'BL-991827-13',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ...)',
        handlingOfficer: 'Nguyễn Văn Cán Bộ',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/02/2026 09:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '30/06/2026 18:45', status: 'Bị trả lại', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 18:50', user: 'Cán bộ duyệt hồ sơ', action: 'Trả lại', comment: 'Mô tả tài sản bảo đảm thiếu số khung xe công trình.' }
        ]
    },
    {
        id: 'GDBD-2026-000842',
        date: '29/06/2026 15:30',
        customer: 'Công ty Cổ phần Vận tải Thủy',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Hoàn thành',
        statusClass: 'badge-success',
        pin: '102947',
        customerId: 'KH-VANTAITHUY',
        receipt: 'BL-991827-30',
        assetType: 'Tài sản bảo đảm là tàu cá...',
        channel: 'Cách thức điện tử',
        customerType: 'dinh_danh',
        phone: '0909000111',
        email: 'vantaithuy@vtt.com.vn',
        paymentMethod: 'chuyen_khoan',
        resultMethod: 'dien_tu',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '29/06/2026 15:30', status: 'Hoàn thành', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 15:45', user: 'Lãnh đạo ký duyệt', action: 'Ký duyệt số', comment: 'Phê duyệt hoàn thành.' }
        ]
    },
    {
        id: 'GDBD-2026-000843',
        date: '28/06/2026 09:15',
        customer: 'Ông Lâm Văn Hòa',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Hoàn thành',
        statusClass: 'badge-success',
        pin: '291038',
        customerId: 'KH-LAMHOA',
        receipt: 'BL-991827-31',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung...',
        channel: 'Cách thức điện tử',
        customerType: 'dinh_danh',
        phone: '0912223334',
        email: 'lamhoavb@gmail.com',
        paymentMethod: 'chuyen_khoan',
        resultMethod: 'dien_tu',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '28/06/2026 09:15', status: 'Hoàn thành', active: true }
        ],
        internalLogs: [
            { time: '28/06/2026 09:30', user: 'Lãnh đạo ký duyệt', action: 'Ký duyệt số', comment: 'Đã phát hành chứng nhận.' }
        ]
    },
    {
        id: 'GDBD-2026-000844',
        date: '27/06/2026 10:45',
        customer: 'Công ty TNHH Nhựa Tiền Phong',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Hoàn thành',
        statusClass: 'badge-success',
        pin: '392019',
        customerId: 'KH-NHUATP',
        receipt: 'BL-991827-32',
        assetType: 'Các động sản khác...',
        channel: 'Cách thức điện tử',
        customerType: 'dinh_danh',
        phone: '02253909090',
        email: 'contact@nhuatienphong.vn',
        paymentMethod: 'chuyen_khoan',
        resultMethod: 'dien_tu',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '27/06/2026 10:45', status: 'Hoàn thành', active: true }
        ],
        internalLogs: [
            { time: '27/06/2026 11:00', user: 'Lãnh đạo ký duyệt', action: 'Ký duyệt số', comment: 'Hoàn tất quy trình.' }
        ]
    },
    {
        id: 'GDBD-2026-000845',
        date: '26/06/2026 14:20',
        customer: 'Bà Đặng Thị Dung',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Hoàn thành',
        statusClass: 'badge-success',
        pin: '492010',
        customerId: 'KH-DANGDUNG',
        receipt: 'BL-991827-33',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung...',
        channel: 'Trực tiếp tại quầy',
        customerType: 'vang_lai',
        phone: '0988777666',
        email: 'dangdung@gmail.com',
        paymentMethod: 'tien_mat',
        resultMethod: 'truc_tiep',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '26/06/2026 14:20', status: 'Hoàn thành', active: true }
        ],
        internalLogs: [
            { time: '26/06/2026 14:35', user: 'Lãnh đạo ký duyệt', action: 'Ký duyệt số', comment: 'Ký thành công.' }
        ]
    },
    {
        id: 'GDBD-2026-000846',
        date: '24/06/2026 15:45',
        customer: 'Công ty TNHH Phát triển Đô thị',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị từ chối',
        statusClass: 'badge-danger',
        pin: '592019',
        customerId: 'KH-DOTHIDEV',
        receipt: 'BL-991827-34',
        assetType: 'Các động sản khác...',
        channel: 'Trực tiếp tại quầy',
        customerType: 'vang_lai',
        phone: '0903444555',
        email: 'info@dothidev.com',
        paymentMethod: 'tien_mat',
        resultMethod: 'truc_tiep',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '24/06/2026 15:45', status: 'Bị từ chối', active: true }
        ],
        internalLogs: [
            { time: '24/06/2026 16:00', user: 'Cán bộ phê duyệt', action: 'Từ chối', comment: 'Bên bảo đảm không ký tên đóng dấu đúng quy định.' }
        ]
    },
    {
        id: 'GDBD-2026-000847',
        date: '23/06/2026 09:30',
        customer: 'Ông Hoàng Văn Khánh',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị từ chối',
        statusClass: 'badge-danger',
        pin: '692018',
        customerId: 'KH-HOANGKHANH',
        receipt: 'BL-991827-35',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung...',
        channel: 'Cách thức điện tử',
        customerType: 'dinh_danh',
        phone: '0912555666',
        email: 'khanhhoang@gmail.com',
        paymentMethod: 'chuyen_khoan',
        resultMethod: 'dien_tu',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '23/06/2026 09:30', status: 'Bị từ chối', active: true }
        ],
        internalLogs: [
            { time: '23/06/2026 09:45', user: 'Cán bộ phê duyệt', action: 'Từ chối', comment: 'Bản mô tả tài sản bảo đảm mâu thuẫn số khung đăng ký.' }
        ]
    },
    {
        id: 'GDBD-2026-000801',
        date: '29/06/2026 10:00',
        customer: 'Công ty Cổ phần Alpha',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '102938',
        customerId: 'KH-ALPHA',
        receipt: 'BL-991827-01',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '29/06/2026 10:00', status: 'Chờ ký', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 10:02', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Đã hoàn tất kiểm tra hồ sơ, trình Lãnh đạo ký duyệt.' }
        ]
    },
    {
        id: 'GDBD-2026-000802',
        date: '29/06/2026 11:30',
        customer: 'Ông Lê Văn Nam',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Cầm cố',
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '291039',
        customerId: 'KH-LENVANNAM',
        receipt: 'BL-991827-02',
        assetType: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/05/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '29/06/2026 11:30', status: 'Chờ ký', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 11:35', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Trình ký thay đổi Bên bảo đảm.' }
        ]
    },
    {
        id: 'GDBD-2026-000803',
        date: '30/06/2026 09:15',
        customer: 'Bà Nguyễn Thị Minh',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '392018',
        customerId: 'KH-NGUYENTHIMINH',
        receipt: 'BL-991827-03',
        assetType: 'Cây hằng năm, công trình tạm',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '12/03/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 09:15', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 09:20', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Trình ký xóa đăng ký thế chấp cây trồng.' }
        ]
    },
    {
        id: 'GDBD-2026-000804',
        date: '30/06/2026 10:30',
        customer: 'Công ty TNHH Hưng Thịnh',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '492019',
        customerId: 'KH-HUNGTHINH',
        receipt: 'BL-991827-04',
        assetType: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất...',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '30/06/2026 10:30', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 10:32', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Hồ sơ đầy đủ, trình ký duyệt.' }
        ]
    },
    {
        id: 'GDBD-2026-000805',
        date: '30/06/2026 11:00',
        customer: 'Ông Nguyễn Văn Hải',
        mortgagee: 'Ngân hàng TMCP Quân đội (MB Bank)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '592010',
        customerId: 'KH-NGUYENVANHAI',
        receipt: 'BL-991827-05',
        assetType: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '01/02/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '30/06/2026 11:00', status: 'Chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 11:05', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Trình ký thay đổi thông tin chứng khoán.' }
        ]
    },
    {
        id: 'GDBD-2026-000851',
        date: '28/06/2026 10:15',
        customer: 'Công ty TNHH Hoàng Phát',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '648201',
        customerId: 'KH-HOANGPHAT-01',
        receipt: 'BL-991827-31',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '28/06/2026 10:15', status: 'Chờ ký', active: true }
        ],
        internalLogs: [
            { time: '28/06/2026 10:20', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Đã hoàn tất kiểm tra hồ sơ, trình Lãnh đạo ký duyệt.' }
        ]
    },
    {
        id: 'GDBD-2026-000852',
        date: '28/06/2026 14:30',
        customer: 'Ông Vũ Văn Nam',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Cầm cố',
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '749202',
        customerId: 'KH-NAMVU-02',
        receipt: 'BL-991827-32',
        assetType: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
        channel: 'Trực tiếp tại quầy',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/01/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '28/06/2026 14:30', status: 'Chờ ký', active: true }
        ],
        internalLogs: [
            { time: '28/06/2026 14:35', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Trình ký thay đổi Bên bảo đảm.' }
        ]
    },
    {
        id: 'GDBD-2026-000853',
        date: '29/06/2026 08:45',
        customer: 'Bà Hoàng Thị Mai',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Bảo lưu quyền sở hữu',
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '850303',
        customerId: 'KH-MAIHOANG-03',
        receipt: 'BL-991827-33',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Cách thức điện tử',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '15/02/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '29/06/2026 08:45', status: 'Chờ ký', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 08:50', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Trình ký xóa đăng ký biện pháp bảo đảm.' }
        ]
    },
    {
        id: 'GDBD-2026-000806',
        date: '30/06/2026 14:00',
        customer: 'Bà Phạm Thị Tuyết',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Duyệt chờ ký',
        statusClass: 'badge-info',
        pin: '692019',
        customerId: 'KH-PHAMTHITUYET',
        receipt: 'BL-991827-06',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '15/01/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 14:00', status: 'Duyệt chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 14:05', user: 'Cán bộ nghiệp vụ', action: 'Trình ký', comment: 'Trình ký xóa thế chấp tiền gửi tiết kiệm.' }
        ]
    },
    {
        id: 'GDBD-2026-000860',
        date: '29/06/2026 15:30',
        customer: 'Công ty Cổ phần Cơ điện lạnh Việt Nam',
        mortgagee: 'Ngân hàng TMCP Quốc tế Việt Nam (VIB)',
        type: 'Đăng ký thay đổi',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị trả lại',
        statusClass: 'badge-danger',
        pin: '394857',
        customerId: 'KH-REE-01',
        receipt: 'BL-991827-60',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        channel: 'Cách thức điện tử',
        handlingOfficer: 'Nguyễn Văn Cán Bộ',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '01/03/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '29/06/2026 15:30', status: 'Bị trả lại', active: true }
        ],
        internalLogs: [
            { time: '29/06/2026 16:00', user: 'Lãnh đạo Cục', action: 'Trả lại', comment: 'Thông tin mô tả tài sản bảo đảm (số khung xe ô tô) không trùng khớp với đăng ký gốc.' }
        ]
    },
    {
        id: 'GDBD-2026-000861',
        date: '30/06/2026 10:20',
        customer: 'Ông Lâm Thành Phát',
        mortgagee: 'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị trả lại',
        statusClass: 'badge-danger',
        pin: '284759',
        customerId: 'KH-PHAT-02',
        receipt: 'BL-991827-61',
        assetType: 'Các động sản khác (tiền, giấy tờ có giá, hàng tiêu dùng, máy móc thiết bị...)',
        channel: 'Trực tiếp tại quầy',
        handlingOfficer: 'Nguyễn Văn Cán Bộ',
        timeline: [
            { id: 'node-1', title: 'Tiếp nhận quầy', date: '30/06/2026 10:20', status: 'Bị trả lại', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 10:50', user: 'Đăng ký viên Nguyễn Văn Cán Bộ', action: 'Trả lại', comment: 'Thiếu chữ ký của Bên nhận bảo đảm trên biểu mẫu đăng ký bằng văn bản giấy.' }
        ]
    },
    {
        id: 'GDBD-2026-000862',
        date: '30/06/2026 11:45',
        customer: 'Bà Nguyễn Thị Mai',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Bị trả lại',
        statusClass: 'badge-danger',
        pin: '194857',
        customerId: 'KH-MAI-03',
        receipt: 'BL-991827-62',
        assetType: 'Các động sản khác (tiền gửi tiết kiệm, vàng, đá quý...)',
        channel: 'Cách thức điện tử',
        handlingOfficer: 'Nguyễn Văn Cán Bộ',
        timeline: [
            { id: 'node-1', title: 'Tiếp nhận điện tử', date: '30/06/2026 11:45', status: 'Bị trả lại', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 13:10', user: 'Đăng ký viên Nguyễn Văn Cán Bộ', action: 'Trả lại', comment: 'Bản scan của Hợp đồng bảo đảm mờ, không đọc được số hợp đồng và ngày ký.' }
        ]
    }
];

/* ==========================================================================
   Bổ sung dữ liệu giả lập để mỗi tab danh sách có đủ 15 bản ghi:
   Hồ sơ chờ nhập liệu (Chờ giải quyết), Hồ sơ chờ duyệt (Chờ duyệt),
   Hồ sơ duyệt chờ ký (Duyệt chờ ký).
   ========================================================================== */
(function seedListsTo15() {
    const REQUEST_TYPES = [
        'Đăng ký lần đầu',
        'Đăng ký thay đổi',
        'Xóa đăng ký',
        'Thông báo xử lý tài sản',
        'Yêu cầu cung cấp thông tin',
        'Yêu cầu cung cấp bản sao',
        'Yêu cầu cung cấp bản sao kèm thông báo'
    ];
    const SECURED_PARTIES = [
        'Công ty Cổ phần Xây dựng Trường Sơn',
        'Công ty TNHH Thương mại Hoàng Gia',
        'Ông Trần Quang Đạo',
        'Bà Lê Thị Thanh Hương',
        'Công ty Cổ phần Vận tải Biển Đông',
        'Công ty TNHH Sản xuất Tân Tiến',
        'Ông Phạm Văn Khánh',
        'Công ty Cổ phần Nông sản Việt Thắng',
        'Bà Đinh Thị Mai Phương',
        'Công ty TNHH Cơ khí Đại Phát',
        'Ông Hoàng Minh Tuấn',
        'Công ty Cổ phần Dệt may Hồng Hà',
        'Bà Nguyễn Thị Kim Chi',
        'Công ty TNHH Điện tử Sao Mai',
        'Ông Vũ Đình Nam'
    ];
    const SECURING_PARTIES = [
        'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
        'Ngân hàng TMCP Quân đội (MB)',
        'Ngân hàng TMCP Á Châu (ACB)',
        'Ngân hàng TMCP Tiên Phong (TPBank)',
        'Công ty Cho thuê tài chính TNHH MTV Ngân hàng Công thương'
    ];
    const SUBTYPES = ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu', 'Đặt cọc', 'Ký quỹ'];
    const ASSET_TYPES = [
        'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
        'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng',
        'Các động sản khác (tiền và giấy tờ có giá, máy móc thiết bị, nguyên nhiên vật liệu...)',
        'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa'
    ];
    const CHANNELS = ['Cách thức điện tử', 'Trực tiếp tại quầy', 'Qua bưu điện'];

    const pick = (list, i) => list[i % list.length];
    const pad = n => String(n).padStart(2, '0');

    // Đếm số bản ghi hiện có của từng trạng thái để chỉ bổ sung phần còn thiếu
    const countByStatus = status => mockProfiles.filter(x => x.status === status
        && (!x.handlingOfficer || x.handlingOfficer === 'Nguyễn Văn Cán Bộ')).length;

    // Hồ sơ trực tuyến (Phiếu đăng ký) phục vụ Tab Chờ duyệt / Duyệt chờ ký: chỉ gồm Loại đăng ký nhóm Phiếu đăng ký,
    // Nguồn tiếp nhận "Dịch vụ công" hoặc "Trực tuyến" và đủ 7 nhóm Loại tài sản [DM_07]
    const REG_TYPES = ['Đăng ký mới', 'Đăng ký thay đổi', 'Xóa đăng ký', 'Thông báo xử lý tài sản', 'Thay đổi thông báo xử lý tài sản', 'Xóa thông báo xử lý tài sản'];
    const REG_ASSET_SAMPLES = [
        'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
        'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ',
        'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt',
        'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung',
        'Cây hằng năm, công trình tạm',
        'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)'
    ];
    const CONTRACT_SUBTYPES = ['Hợp đồng cho thuê tài chính', 'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên', 'Hợp đồng ký gửi'];
    const ONLINE_CHANNELS = ['Cách thức điện tử', 'Dịch vụ công Quốc gia'];

    function buildOnlineProfile(seq, status, statusClass, dayOffset) {
        const idx = seq - 1;
        const type = pick(REG_TYPES, idx);
        const isContract = idx % 5 === 3 && !type.includes('xử lý tài sản');
        const day = 5 + (dayOffset % 20);
        return {
            id: 'GDBD-2026-001' + String(seq).padStart(3, '0'), // tránh trùng mã với hồ sơ giấy mẫu
            date: `${pad(day)}/08/2026 ${pad(8 + (idx % 9))}:${pad((idx * 7) % 60)}`,
            customer: pick(SECURED_PARTIES, idx),
            mortgagee: pick(SECURING_PARTIES, idx),
            type,
            transactionType: isContract ? 'Hợp đồng' : 'Biện pháp bảo đảm',
            subtype: isContract ? pick(CONTRACT_SUBTYPES, idx) : pick(SUBTYPES, idx),
            status,
            statusClass,
            pin: String(100000 + ((idx + 3) * 7919) % 899999),
            customerId: 'KH-2026-' + pad(seq),
            receipt: 'BL-2026-' + (9100 + seq),
            assetType: pick(REG_ASSET_SAMPLES, idx),
            channel: pick(ONLINE_CHANNELS, idx),
            handlingOfficer: 'Nguyễn Văn Cán Bộ',
            timeline: [
                { id: 'node-1', title: type, date: `${pad(day)}/08/2026 ${pad(8 + (idx % 9))}:${pad((idx * 7) % 60)}`, status, active: true }
            ],
            internalLogs: [
                { time: `${pad(day)}/08/2026 ${pad(8 + (idx % 9))}:${pad(((idx * 7) % 55) + 3)}`, user: 'Hệ thống', action: 'Tự động kiểm soát', comment: 'Khớp nối thành công, không phát hiện rủi ro nghiêm trọng.' },
                { time: `${pad(day)}/08/2026 ${pad(8 + (idx % 9))}:${pad((idx * 7) % 60)}`, user: 'Portal Khách hàng', action: 'Gửi hồ sơ', comment: 'Khách hàng hoàn tất nộp và thanh toán lệ phí trực tuyến.' }
            ]
        };
    }

    function buildPaperProfile(seq) {
        const idx = seq - 1;
        const type = pick(REQUEST_TYPES, idx + 3);
        const amount = [80000, 60000, 0, 70000, 30000, 50000, 30000][idx % 7];
        const day = 5 + idx;
        return {
            id: 'GDBD-2026-000' + (890 + seq),
            paper: 'PG-0' + (150 + seq),
            date: `${pad(day)}/08/2026 ${pad(9 + (idx % 6))}:${pad((idx * 11) % 60)}`,
            customer: pick(SECURED_PARTIES, idx + 5),
            submitter: pick(SECURED_PARTIES, idx + 9),
            mortgagee: pick(SECURING_PARTIES, idx + 2),
            type,
            transactionType: 'Biện pháp bảo đảm',
            subtype: pick(SUBTYPES, idx + 1),
            status: 'Chờ giải quyết',
            statusClass: 'badge-warning',
            amount,
            paymentStatus: amount === 0 ? 'Miễn phí' : 'Đã thu',
            paymentMethod: amount === 0 ? 'mien_phi' : (idx % 2 ? 'tien_mat' : 'chuyen_khoan'),
            receipt: amount === 0 ? '-' : 'BL-2026-' + (9200 + seq),
            customerId: 'KH-GIAY-' + pad(seq),
            channel: idx % 2 ? 'Qua bưu điện' : 'Trực tiếp tại quầy',
            resultMethod: idx % 3 === 0 ? 'truc_tiep' : idx % 3 === 1 ? 'buu_chinh' : 'dien_tu',
            assetType: pick(ASSET_TYPES, idx + 2),
            officer: 'Nguyễn Thị Tiếp Nhận',
            handlingOfficer: 'Nguyễn Văn Cán Bộ',
            timeline: [
                { id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: `${pad(day)}/08/2026 ${pad(9 + (idx % 6))}:${pad((idx * 11) % 60)}`, status: 'Chờ giải quyết', active: true }
            ],
            internalLogs: [
                { time: `${pad(day)}/08/2026 ${pad(9 + (idx % 6))}:${pad((idx * 11) % 60)}`, user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Đã thu phí và chuyển sang bước nhập liệu.' }
            ]
        };
    }

    let seq = 0;
    // Hồ sơ chờ duyệt (đủ 24 bản ghi để kiểm tra phân trang 20 bản ghi/trang)
    for (let i = countByStatus('Chờ duyệt'); i < 24; i++) {
        seq++;
        mockProfiles.push(buildOnlineProfile(seq, 'Chờ duyệt', 'badge-warning', i));
    }
    // Hồ sơ duyệt chờ ký
    for (let i = countByStatus('Duyệt chờ ký'); i < 15; i++) {
        seq++;
        mockProfiles.push(buildOnlineProfile(seq, 'Duyệt chờ ký', 'badge-info', i + 4));
    }
    // Hồ sơ chờ nhập liệu (hồ sơ giấy đã thu phí)
    // Tab Hồ sơ chờ nhập liệu còn lấy thêm hồ sơ giấy từ loadPaperDigitizeProfiles() nên phải cộng cả nguồn này
    let paperPoolCount = 0;
    try { paperPoolCount = loadPaperDigitizeProfiles().length; } catch (err) { paperPoolCount = 0; }
    let paperSeq = 0;
    for (let i = countByStatus('Chờ giải quyết') + paperPoolCount; i < 15; i++) {
        paperSeq++;
        mockProfiles.push(buildPaperProfile(paperSeq));
    }
})();

// State variables for pagination
let pageSize = 20; // Mặc định 20 bản ghi/trang theo SRS
let currentPage = 1;
let filteredProfiles = []; // Store currently filtered records for pagination paging

function loadPaperDigitizeProfiles() {
    try {
        const raw = localStorage.getItem('ucps014_paper_profiles');
        const list = raw ? JSON.parse(raw) : [];
        if (Array.isArray(list) && list.length) {
            return list.map(p => ({...p, status: 'Chờ giải quyết'}));
        }

        const seed = [
            {
                id: 'HS-2026-000128',
                paper: 'PG-0128',
                date: '24/07/2026 09:20',
                customer: 'Công ty TNHH Hải Nam',
                submitter: 'Nguyễn Văn Bình',
                type: 'Đăng ký lần đầu',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Thế chấp',
                channel: 'Trực tiếp tại quầy',
                resultMethod: 'truc_tiep',
                paymentMethod: 'tien_mat',
                paymentStatus: 'Đã thu',
                amount: 80000,
                receipt: 'BL-2026-000128',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: 'KH-HG-0128',
                phone: '0900000128',
                email: 'hainam@example.com',
                assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '24/07/2026 09:20', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '24/07/2026 09:20', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Đã thu phí và chuyển cán bộ nghiệp vụ nhập liệu.' }]
            },
            {
                id: 'HS-2026-000129',
                paper: 'PG-0129',
                date: '24/07/2026 10:05',
                customer: 'Nguyễn Thị Hoa',
                submitter: 'Nguyễn Thị Hoa',
                type: 'Yêu cầu cung cấp bản sao',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Thế chấp',
                channel: 'Trực tiếp tại quầy',
                resultMethod: 'truc_tiep',
                paymentMethod: 'chuyen_khoan',
                paymentStatus: 'Đã thu',
                copyQuantity: 2,
                amount: 30000,
                receipt: 'CT-FT25205129',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: '-',
                phone: '0912000129',
                email: 'hoa@example.com',
                assetType: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '24/07/2026 10:05', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '24/07/2026 10:05', user: 'Kế toán thanh toán', action: 'Xác nhận thu phí', comment: 'Đã xác nhận khoản ghi Có tài khoản đơn vị.' }]
            },
            {
                id: 'HS-2026-000130',
                paper: 'PG-0130',
                date: '23/07/2026 15:15',
                customer: 'Ngân hàng TMCP FPT',
                submitter: 'Trần Minh Quân',
                type: 'Xóa đăng ký',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Cầm cố',
                channel: 'Qua bưu chính',
                resultMethod: 'buu_chinh',
                paymentMethod: 'mien_phi',
                paymentStatus: 'Miễn phí',
                amount: 0,
                receipt: '-',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: 'KH-FPT-0130',
                phone: '02473000130',
                email: 'fptbank@example.com',
                assetType: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '23/07/2026 15:15', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '23/07/2026 15:15', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Hồ sơ thuộc diện miễn phí.' }]
            },
            {
                id: 'HS-2026-000131',
                paper: 'PG-0131',
                date: '23/07/2026 16:20',
                customer: 'Công ty Cổ phần Minh Khang',
                submitter: 'Lê Bảo Nam',
                type: 'Đăng ký thay đổi',
                transactionType: 'Hợp đồng',
                subtype: 'Hợp đồng cho thuê tài chính',
                channel: 'Qua bưu chính',
                resultMethod: 'dien_tu',
                paymentMethod: 'tien_mat',
                paymentStatus: 'Đã thu',
                amount: 60000,
                receipt: 'BL-2026-000131',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: 'KH-MK-0131',
                phone: '0900000131',
                email: 'minhkhang@example.com',
                assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '23/07/2026 16:20', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '23/07/2026 16:20', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Chờ nhập liệu đăng ký thay đổi.' }]
            },
            {
                id: 'HS-2026-000132',
                paper: 'PG-0132',
                date: '22/07/2026 08:40',
                customer: 'Ngân hàng TMCP Công thương Việt Nam',
                submitter: 'Phạm Thu Trang',
                type: 'Thông báo xử lý tài sản',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Thế chấp',
                channel: 'Trực tiếp tại quầy',
                resultMethod: 'dien_tu',
                paymentMethod: 'chuyen_khoan',
                paymentStatus: 'Đã thu',
                amount: 70000,
                receipt: 'CT-20260722001',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: 'KH-VTB-0132',
                phone: '02473000132',
                email: 'vietinbank@example.com',
                assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '22/07/2026 08:40', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '22/07/2026 08:40', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Chờ nhập liệu thông báo xử lý lần đầu.' }]
            },
            {
                id: 'HS-2026-000133',
                paper: 'PG-0133',
                date: '22/07/2026 09:30',
                customer: 'Ngân hàng TMCP Kỹ thương Việt Nam',
                submitter: 'Đỗ Hoàng Anh',
                type: 'Thông báo xử lý tài sản',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Thế chấp',
                channel: 'Trực tiếp tại quầy',
                resultMethod: 'truc_tiep',
                paymentMethod: 'tien_mat',
                paymentStatus: 'Đã thu',
                amount: 50000,
                receipt: 'BL-2026-000133',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: 'KH-TCB-0133',
                phone: '02473000133',
                email: 'techcombank@example.com',
                assetType: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '22/07/2026 09:30', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '22/07/2026 09:30', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Chờ nhập liệu thay đổi thông báo xử lý.' }]
            },
            {
                id: 'HS-2026-000134',
                paper: 'PG-0134',
                date: '22/07/2026 10:45',
                customer: 'Ngân hàng TMCP Quân đội',
                submitter: 'Bùi Đức Long',
                type: 'Thông báo xử lý tài sản',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Thế chấp',
                channel: 'Qua bưu chính',
                resultMethod: 'buu_chinh',
                paymentMethod: 'mien_phi',
                paymentStatus: 'Miễn phí',
                amount: 0,
                receipt: '-',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: 'KH-MB-0134',
                phone: '02473000134',
                email: 'mb@example.com',
                assetType: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '22/07/2026 10:45', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '22/07/2026 10:45', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Chờ nhập liệu xóa thông báo xử lý.' }]
            },
            {
                id: 'HS-2026-000135',
                paper: 'PG-0135',
                date: '21/07/2026 14:10',
                customer: 'Công ty Luật An Việt',
                submitter: 'Vũ Minh Châu',
                type: 'Yêu cầu cung cấp bản sao kèm thông báo',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Thế chấp',
                channel: 'Trực tiếp tại quầy',
                resultMethod: 'truc_tiep',
                paymentMethod: 'chuyen_khoan',
                paymentStatus: 'Đã thu',
                amount: 50000,
                receipt: 'CT-20260721003',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: 'KH-AV-0135',
                phone: '0900000135',
                email: 'anviet@example.com',
                assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '21/07/2026 14:10', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '21/07/2026 14:10', user: 'Kế toán thanh toán', action: 'Xác nhận thu phí', comment: 'Chờ nhập liệu bản sao kèm thông báo.' }]
            },
            {
                id: 'HS-2026-000136',
                paper: 'PG-0136',
                date: '21/07/2026 15:50',
                customer: 'Ông Phạm Minh Đức',
                submitter: 'Phạm Minh Đức',
                type: 'Yêu cầu cung cấp thông tin',
                transactionType: 'Biện pháp bảo đảm',
                subtype: 'Thế chấp',
                channel: 'Trực tiếp tại quầy',
                resultMethod: 'dien_tu',
                paymentMethod: 'tien_mat',
                paymentStatus: 'Đã thu',
                amount: 30000,
                receipt: 'BL-2026-000136',
                officer: 'Nguyễn Thị Tiếp Nhận',
                handlingOfficer: 'Nguyễn Văn Cán Bộ',
                status: 'Chờ giải quyết',
                statusClass: 'badge-warning',
                customerId: '-',
                phone: '0900000136',
                email: 'duc@example.com',
                assetType: 'Cây hằng năm, công trình tạm',
                timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '21/07/2026 15:50', status: 'Chờ giải quyết', active: true }],
                internalLogs: [{ time: '21/07/2026 15:50', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Chờ nhập liệu yêu cầu cung cấp thông tin.' }]
            }
        ];
        localStorage.setItem('ucps014_paper_profiles', JSON.stringify(seed));
        return seed;
    } catch (err) {
        console.warn('Không đọc được dữ liệu hồ sơ giấy chờ giải quyết:', err);
        return [];
    }
}

function ensurePaperDigitizeSamples() {
    try {
        const current = JSON.parse(localStorage.getItem('ucps014_paper_profiles') || '[]');
        const requiredSamples = [
            ['HS-2026-000128','PG-0128','Đăng ký lần đầu','Công ty TNHH Hải Nam','Nguyễn Văn Bình',80000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000129','PG-0129','Yêu cầu cung cấp bản sao','Nguyễn Thị Hoa','Nguyễn Thị Hoa',30000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000130','PG-0130','Xóa đăng ký','Ngân hàng TMCP FPT','Trần Minh Quân',0,'Miễn phí','Biện pháp bảo đảm','Cầm cố'],
            ['HS-2026-000131','PG-0131','Đăng ký thay đổi','Công ty Cổ phần Minh Khang','Lê Bảo Nam',60000,'Đã thu','Hợp đồng','Hợp đồng cho thuê tài chính'],
            ['HS-2026-000132','PG-0132','Thông báo xử lý tài sản','Ngân hàng TMCP Công thương Việt Nam','Phạm Thu Trang',70000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000133','PG-0133','Thông báo xử lý tài sản','Ngân hàng TMCP Kỹ thương Việt Nam','Đỗ Hoàng Anh',50000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000134','PG-0134','Thông báo xử lý tài sản','Ngân hàng TMCP Quân đội','Bùi Đức Long',0,'Miễn phí','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000135','PG-0135','Yêu cầu cung cấp bản sao kèm thông báo','Công ty Luật An Việt','Vũ Minh Châu',50000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000136','PG-0136','Yêu cầu cung cấp thông tin','Ông Phạm Minh Đức','Phạm Minh Đức',30000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000137','PG-0137','Yêu cầu cung cấp thông tin','Trường Đại học Kinh tế Quốc dân','Đặng Thu Hà',0,'Miễn phí','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000138','PG-0138','Yêu cầu cung cấp thông tin','Công ty TNHH Thương mại Hoàng Gia','Trần Văn Hòa',30000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000139','PG-0139','Yêu cầu cung cấp thông tin','Bà Lê Thị Thanh Hương','Lê Thị Thanh Hương',30000,'Đã thu','Biện pháp bảo đảm','Thế chấp'],
            ['HS-2026-000140','PG-0140','Yêu cầu cung cấp thông tin','Ngân hàng TMCP Quân đội (MB)','Phạm Quang Huy',30000,'Đã thu','Biện pháp bảo đảm','Thế chấp']
        ].map((r, idx) => ({
            id: r[0],
            paper: r[1],
            // Ngày tiếp nhận trong tháng hiện tại (nằm trong khoảng lọc mặc định từ ngày 01 đến ngày hiện tại)
            date: (() => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p((idx % d.getDate()) + 1)}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(8 + (idx % 8))}:${p((idx * 17) % 60)}`; })(),
            type: r[2],
            customer: r[3],
            submitter: r[4],
            amount: r[5],
            paymentStatus: r[6],
            transactionType: r[7],
            subtype: r[8],
            channel: idx % 2 ? 'Qua bưu chính' : 'Trực tiếp tại quầy',
            resultMethod: idx % 3 === 0 ? 'truc_tiep' : idx % 3 === 1 ? 'buu_chinh' : 'dien_tu',
            paymentMethod: r[5] === 0 ? 'mien_phi' : idx % 2 ? 'tien_mat' : 'chuyen_khoan',
            receipt: r[5] === 0 ? '-' : `BL-2026-${r[0].slice(-6)}`,
            officer: 'Nguyễn Thị Tiếp Nhận',
            handlingOfficer: 'Nguyễn Văn Cán Bộ',
            status: 'Chờ giải quyết',
            statusClass: 'badge-warning',
            customerId: `KH-MAU-13${idx + 1}`,
            phone: `090000013${idx + 1}`,
            email: `mau${idx + 1}@example.com`,
            // Yêu cầu cung cấp thông tin: Tiêu chí tra cứu và Loại khách hàng theo hồ sơ tiếp nhận
            lookupCriteria: r[2] === 'Yêu cầu cung cấp thông tin' ? ['Số đăng ký', 'Bên bảo đảm', 'Số khung'][idx % 3] : undefined,
            requesterType: idx % 2 ? 'Khách hàng vãng lai' : 'Có tài khoản trực tuyến',
            copyQuantity: r[2] === 'Yêu cầu cung cấp bản sao' ? 2 : undefined,
            assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
            timeline: [{ id: 'node-1', title: 'Hồ sơ giấy chờ nhập liệu', date: '01/08/2026 08:30', status: 'Chờ giải quyết', active: true }],
            internalLogs: [{ time: '01/08/2026 08:30', user: 'Cán bộ tiếp nhận', action: 'Tiếp nhận hồ sơ giấy', comment: 'Bổ sung mẫu kiểm tra UI UCPS014.' }]
        }));
        const byId = new Map(current.map(x => [x.id, x]));
        let changed = false;
        requiredSamples.forEach(sample => {
            if (byId.has(sample.id)) {
                const existing = byId.get(sample.id);
                Object.assign(existing, sample, {
                    status: existing.status || sample.status,
                    statusClass: existing.statusClass || sample.statusClass
                });
                changed = true;
            } else {
                current.push(sample);
                changed = true;
            }
        });
        if (changed) localStorage.setItem('ucps014_paper_profiles', JSON.stringify(current));
    } catch (err) {
        console.warn('Không thể bổ sung dữ liệu mẫu UCPS014:', err);
    }
}

function formatAssetTypeCell(assetType) {
    if (!assetType) return '<td>-</td>';
    const list = assetType.split(/[\|\n]|\s+\/\s+/).map(x => x.trim()).filter(Boolean);
    if (list.length === 0) return '<td>-</td>';
    const tooltipText = list.join('\n');
    const displayLines = list.map(item => {
        const truncated = item.length > 30 ? item.substring(0, 30) + '...' : item;
        return `<div class="asset-type-line" style="margin-bottom: 2px;">${truncated}</div>`;
    }).join('');
    return `<td class="asset-type-cell" title="${tooltipText}" style="cursor: help; vertical-align: middle;">${displayLines}</td>`;
}

// =====================================================================
// XỬ LÝ PHIẾU ĐĂNG KÝ (SRS 4.3.2.3) - Bộ lọc, Khối lọc động theo Loại tài sản, cột động
// =====================================================================
const REG_SERVICE_TYPES = ['Yêu cầu cung cấp bản sao', 'Yêu cầu cung cấp bản sao kèm thông báo', 'Yêu cầu cung cấp thông tin'];

// Danh mục Loại hình đăng ký [DM_04] - chỉ nhóm Phiếu đăng ký
const REG_TYPE_OPTIONS = [
    ['Đăng ký mới', 'Đăng ký lần đầu'],
    ['Đăng ký thay đổi', 'Đăng ký thay đổi'],
    ['Xóa đăng ký', 'Xóa đăng ký'],
    ['Thông báo xử lý tài sản', 'Thông báo xử lý tài sản bảo đảm lần đầu'],
    ['Thay đổi thông báo xử lý tài sản', 'Thay đổi thông báo xử lý tài sản bảo đảm'],
    ['Xóa thông báo xử lý tài sản', 'Xóa đăng ký thông báo xử lý tài sản bảo đảm']
];

// Danh mục Loại tài sản bảo đảm [DM_07] và cấu hình Khối lọc động / Cột động tương ứng
const REG_ASSET_TYPES = [
    { key: 'vehicle', label: 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)', match: /cơ giới đường bộ|xe máy chuyên dùng|số khung/i,
      fields: [['vehicleName', 'Tên phương tiện', 'select'], ['frameNo', 'Số khung'], ['engineNo', 'Số máy'], ['plateNo', 'Biển số']] },
    { key: 'ship', label: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt', match: /tàu cá|đường thủy|đường sắt/i,
      fields: [['shipName', 'Tên phương tiện, nhãn hiệu'], ['shipOwner', 'Tên/Họ tên chủ phương tiện/Chủ sở hữu'], ['shipRegNo', 'Số đăng ký phương tiện'], ['shipIssuer', 'Cơ quan cấp giấy chứng nhận'], ['shipGrade', 'Cấp phương tiện']] },
    { key: 'right', label: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản', match: /quyền tài sản/i,
      fields: [['rightName', 'Tên quyền'], ['rightBasis', 'Căn cứ phát sinh quyền']] },
    { key: 'goods', label: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ', match: /hàng hóa luân chuyển|kho hàng/i,
      fields: [['goodsKind', 'Hàng hóa luân chuyển / Kho hàng', 'goodsSelect'], ['goodsValue', 'Giá trị hàng hóa/Tên, loại hàng hóa'], ['warehouseAddress', 'Địa chỉ kho hàng', 'warehouse'], ['warehouseNo', 'Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng', 'warehouse']] },
    { key: 'securities', label: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung', match: /chứng khoán/i,
      fields: [['vsdcTime', 'Thời điểm đăng ký tại VSDC', 'vsdc']] },
    { key: 'crop', label: 'Cây hằng năm, công trình tạm', match: /cây hằng năm|công trình tạm/i, fields: [['description', 'Mô tả']] },
    { key: 'other', label: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)', match: /động sản khác|tiền và giấy tờ có giá|tiền gửi tiết kiệm|kim khí quý/i, fields: [['description', 'Mô tả']] }
];
const REG_VEHICLE_NAMES = ['Ô tô con', 'Ô tô tải', 'Mô tô', 'Xe gắn máy', 'Xe máy chuyên dùng'];

function getRegAssetConfig(key) { return REG_ASSET_TYPES.find(a => a.key === key) || null; }

function getRegAssetKeys(assetType) {
    return REG_ASSET_TYPES.filter(a => a.match.test(assetType || '')).map(a => a.key);
}

// Dữ liệu chi tiết tài sản giả lập theo hồ sơ (phục vụ Khối lọc động và Cột động)
function getRegAssetDetail(p) {
    if (p.assetDetail) return p.assetDetail;
    const n = parseInt(String(p.id).replace(/\D/g, '').slice(-3), 10) || 1;
    const detail = {
        vehicleName: REG_VEHICLE_NAMES[n % REG_VEHICLE_NAMES.length],
        frameNo: 'RLH' + String(100000 + n * 37).slice(-6) + 'VN',
        engineNo: 'ENG-' + String(5000 + n * 13),
        plateNo: `30${String.fromCharCode(65 + (n % 6))}-${String(100 + n).slice(-3)}.${String(10 + (n % 90)).padStart(2, '0')}`,
        shipName: `Tàu cá QN-${9000 + n} - Hyundai Marine`,
        shipOwner: p.customer,
        shipRegNo: `QN-${9000 + n}-TS`,
        shipIssuer: 'Chi cục Thủy sản Quảng Ninh',
        shipGrade: n % 2 ? 'VR-SB' : 'VR-SI',
        rightName: 'Quyền đòi nợ phát sinh từ hợp đồng',
        rightBasis: `Hợp đồng số ${100 + n}/HĐ-2026`,
        goodsKind: n % 2 ? 'Kho hàng' : 'Hàng hóa luân chuyển',
        goodsValue: `Hàng tiêu dùng trị giá ${(n % 9 + 1) * 500} triệu đồng`,
        warehouseAddress: n % 2 ? `Kho số ${n % 7 + 1}, KCN Quang Minh, Hà Nội` : '',
        warehouseNo: n % 2 ? `KHO-${String(n).padStart(3, '0')}` : '',
        vsdcTime: `${String(8 + (n % 9)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')} ${String(n % 27 + 1).padStart(2, '0')}/0${n % 9 + 1}/2026`,
        description: `Mô tả tài sản của hồ sơ ${p.id}`
    };
    p.assetDetail = detail;
    return detail;
}

// Nguồn tiếp nhận hiển thị trên danh sách Xử lý Phiếu đăng ký: "Dịch vụ công", "Trực tuyến" hoặc "Trực tiếp"
function getRegSourceLabel(channel) {
    const v = normalizeReceptionSource(channel);
    if (v === 'Dịch vụ công Quốc gia') return 'Dịch vụ công';
    if (v === 'Trực tuyến') return 'Trực tuyến';
    return v; // Hồ sơ giấy do Cán bộ nhập liệu gửi duyệt ghi nhận "Trực tiếp"
}

function getRegDefaultDateRange() {
    const today = new Date();
    const from = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    const fmt = d => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    return { from: fmt(from), to: fmt(today) };
}

// Bộ lọc tìm kiếm MH01 - Danh sách Phiếu đăng ký (dùng chung cho các Tab trạng thái của nhóm Phiếu đăng ký)
function renderRegistrationFilterPanel(container, statusFilterHtml) {
    const range = getRegDefaultDateRange();
    container.innerHTML = `
        <div class="grid-4-cols">
            <div class="form-group">
                <label class="form-label">Số đăng ký</label>
                <input type="text" class="form-control" id="filter-reg-sdk" placeholder="Nhập số đăng ký..." autocomplete="off">
            </div>
            <div class="form-group">
                <label class="form-label">Mã khách hàng</label>
                <input type="text" class="form-control" id="filter-customer-id" placeholder="Nhập mã khách hàng..." autocomplete="off">
            </div>
            <div class="form-group">
                <label class="form-label">Tên bên bảo đảm</label>
                <input type="text" class="form-control" id="filter-reg-bbd" placeholder="Nhập tên bên bảo đảm..." autocomplete="off">
            </div>
            <div class="form-group">
                <label class="form-label">Tên bên nhận bảo đảm</label>
                <input type="text" class="form-control" id="filter-reg-bnbd" placeholder="Nhập tên bên nhận bảo đảm..." autocomplete="off">
            </div>
            <div class="form-group">
                <label class="form-label">Nguồn tiếp nhận</label>
                <select class="form-select" id="filter-nguon-tiep-nhan">
                    <option value="">Tất cả</option>
                    <option value="Dịch vụ công">Dịch vụ công</option>
                    <option value="Trực tuyến">Trực tuyến</option>
                    <option value="Trực tiếp">Trực tiếp</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại đăng ký</label>
                <select class="form-select" id="filter-loaidangky">
                    <option value="">Tất cả</option>
                    ${REG_TYPE_OPTIONS.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại hình giao dịch</label>
                <select class="form-select" id="cb-loaihinh" onchange="updateSubTypes()">
                    <option value="">Tất cả</option>
                    <option value="Biện pháp bảo đảm">Biện pháp bảo đảm</option>
                    <option value="Hợp đồng">Hợp đồng</option>
                    <option value="Thông báo xử lý tài sản">Thông báo xử lý tài sản</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại biện pháp / Hợp đồng</label>
                <select class="form-select" id="cb-loaibienphap"><option value="">Tất cả</option></select>
            </div>
            <div class="form-group">
                <label class="form-label">Số biên lai</label>
                <input type="text" class="form-control" id="filter-reg-receipt" placeholder="Nhập số biên lai..." autocomplete="off">
            </div>
            <div class="form-group">
                <label class="form-label">Loại tài sản</label>
                <select class="form-select" id="filter-loaitaisan" onchange="onRegAssetTypeChange()">
                    <option value="">Tất cả</option>
                    ${REG_ASSET_TYPES.map(a => `<option value="${a.key}">${a.label}</option>`).join('')}
                </select>
            </div>
            ${statusFilterHtml || ''}
            <div class="form-group">
                <label class="form-label">Từ ngày</label>
                <div class="date-filter-wrap">
                    <input type="text" class="form-control" id="filter-tungay" placeholder="dd/mm/yyyy" value="${range.from}">
                    <i class="fa-regular fa-calendar-days"></i>
                </div>
                <div id="filter-date-error" style="display:none;color:#DC2626;font-size:12px;margin-top:4px">Từ ngày không được lớn hơn Đến ngày</div>
            </div>
            <div class="form-group">
                <label class="form-label">Đến ngày</label>
                <div class="date-filter-wrap">
                    <input type="text" class="form-control" id="filter-denngay" placeholder="dd/mm/yyyy" value="${range.to}">
                    <i class="fa-regular fa-calendar-days"></i>
                </div>
            </div>
        </div>
        <div id="reg-dynamic-filter" style="display:none;margin-top:8px;padding:8px 12px;border:1px solid #E2E8F0;border-left:3px solid #2563EB;border-radius:5px;background:#F8FAFC">
            <div class="grid-4-cols" id="reg-dynamic-filter-fields"></div>
        </div>
        <div class="filter-action-row" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #F1F5F9; display: flex; justify-content: flex-end; align-items: center; gap: 8px;">
            <button class="btn btn-outline-secondary" onclick="resetFilters()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
            <button class="btn btn-primary" onclick="searchList()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
        </div>
    `;
    updateSubTypes();
    restoreRegListState();
}

// Giữ nguyên bộ lọc tìm kiếm và trang dữ liệu khi Đóng màn Xem chi tiết (MH02) quay lại danh sách
const REG_FILTER_IDS = ['filter-reg-sdk', 'filter-reg-bbd', 'filter-reg-bnbd', 'filter-customer-id', 'filter-reg-receipt', 'filter-nguon-tiep-nhan', 'filter-loaidangky', 'cb-loaihinh', 'cb-loaibienphap', 'filter-loaitaisan', 'filter-status-xu-ly', 'filter-tungay', 'filter-denngay'];

// Tab Hồ sơ chờ nhập liệu và Tab Hồ sơ Bị trả lại dùng bố cục MH01 - Danh sách hồ sơ chờ nhập liệu
function isRegInputLayout() { return ['chonhaplieu', 'bitralai'].includes(currentListTab); }

function saveRegListState() {
    if (isRegInputLayout() || !document.getElementById('filter-reg-sdk')) return;
    const values = {};
    REG_FILTER_IDS.forEach(id => { const el = document.getElementById(id); if (el) values[id] = el.value; });
    document.querySelectorAll('[id^="dyn-"]').forEach(el => { values[el.id] = el.value; });
    sessionStorage.setItem('regListState', JSON.stringify({ tab: currentListTab, values, page: currentPage, sortColumn: currentSortColumn, sortOrder: currentSortOrder }));
}

function restoreRegListState() {
    let state = null;
    try { state = JSON.parse(sessionStorage.getItem('regListState') || 'null'); } catch (err) { state = null; }
    sessionStorage.removeItem('regListState');
    if (!state || state.tab !== currentListTab) return;
    const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
    set('cb-loaihinh', state.values['cb-loaihinh']);
    updateSubTypes();
    REG_FILTER_IDS.forEach(id => set(id, state.values[id]));
    onRegAssetTypeChange();
    set('dyn-goodsKind', state.values['dyn-goodsKind']);
    onRegGoodsKindChange();
    Object.keys(state.values).filter(k => k.startsWith('dyn-')).forEach(k => set(k, state.values[k]));
    currentSortColumn = state.sortColumn;
    currentSortOrder = state.sortOrder || 'asc';
    regRestoredPage = state.page || 1;
}
let regRestoredPage = null;

// Chọn Loại tài sản: hiển thị/ẩn Khối lọc động và Cột động (TH1, TH2, TH3)
function onRegAssetTypeChange() {
    const key = document.getElementById('filter-loaitaisan')?.value || '';
    const wrap = document.getElementById('reg-dynamic-filter');
    const fieldsEl = document.getElementById('reg-dynamic-filter-fields');
    if (!wrap || !fieldsEl) return;
    const cfg = getRegAssetConfig(key);
    if (!cfg) {
        wrap.style.display = 'none';
        fieldsEl.innerHTML = '';
        renderTable(true);
        return;
    }
    fieldsEl.innerHTML = cfg.fields.map(([id, label, kind]) => {
        const hide = kind === 'warehouse' ? 'style="display:none"' : '';
        if (kind === 'select') return `<div class="form-group"><label class="form-label">${label}</label><select class="form-select" id="dyn-${id}"><option value="">Tất cả</option>${REG_VEHICLE_NAMES.map(v => `<option value="${v}">${v}</option>`).join('')}</select></div>`;
        if (kind === 'goodsSelect') return `<div class="form-group"><label class="form-label">${label}</label><select class="form-select" id="dyn-${id}" onchange="onRegGoodsKindChange()"><option value="">Tất cả</option><option value="Hàng hóa luân chuyển">Hàng hóa luân chuyển</option><option value="Kho hàng">Kho hàng</option></select></div>`;
        if (kind === 'vsdc') return `<div class="form-group"><label class="form-label">${label}</label><input type="text" class="form-control" id="dyn-${id}" placeholder="HH:mm dd/MM/yyyy" autocomplete="off"></div>`;
        return `<div class="form-group dyn-${kind || 'text'}" ${hide}><label class="form-label">${label}</label><input type="text" class="form-control" id="dyn-${id}" autocomplete="off"></div>`;
    }).join('');
    wrap.style.display = 'block';
    renderTable(true);
}

// Địa chỉ kho hàng / Số hiệu kho hàng chỉ hiển thị khi chọn "Kho hàng"
function onRegGoodsKindChange() {
    const isWarehouse = document.getElementById('dyn-goodsKind')?.value === 'Kho hàng';
    document.querySelectorAll('#reg-dynamic-filter-fields .dyn-warehouse').forEach(el => {
        el.style.display = isWarehouse ? '' : 'none';
        if (!isWarehouse) { const inp = el.querySelector('input'); if (inp) inp.value = ''; }
    });
    renderTable(true);
}

// Các cột động đang hiển thị (đúng các trường của Khối lọc động đang hiển thị)
function getRegDynamicColumns() {
    const cfg = getRegAssetConfig(document.getElementById('filter-loaitaisan')?.value || '');
    if (!cfg) return [];
    const isWarehouse = document.getElementById('dyn-goodsKind')?.value === 'Kho hàng';
    return cfg.fields.filter(f => f[2] !== 'warehouse' || isWarehouse).map(f => ({ id: f[0], label: f[1] }));
}

// Chuyển hồ sơ danh sách sang dữ liệu Popup Trình ký / Từ chối
function toPdkPopupRecord(p) {
    const typeLabel = (REG_TYPE_OPTIONS.find(o => o[0] === p.type) || [p.type, p.type])[1];
    return {
        ref: p,
        id: p.id,
        registrationNo: p.id,
        type: typeLabel,
        transactionType: (p.type || '').includes('xử lý tài sản') ? 'Thông báo xử lý tài sản' : p.transactionType,
        subtype: p.subtype,
        requester: p.requestor || p.customer,
        grantor: p.customer,
        securedParty: p.mortgagee,
        receivedAt: p.date,
        submitter: p.requestor || p.customer,
        pin: ['Đăng ký mới', 'Đăng ký lần đầu'].includes(p.type) ? p.pin : '',
        source: getRegSourceLabel(p.channel),
        assetType: p.assetType
    };
}

function applyPdkPopupResult(records, message) {
    records.forEach(r => {
        const p = r.ref || findProfileForAction(r.id);
        if (!p) return;
        ['status', 'statusClass', 'pendingAction', 'rejectReason', 'rejectLeader', 'rejectedBy', 'rejectedAt', 'rejectDraftFile', 'signLeader', 'submittedBy', 'submittedAt', 'draftLocked', 'certificateDraftFile']
            .forEach(k => { if (r[k] !== undefined) p[k] = r[k]; });
        // Hồ sơ đã từng bị trả lại được trình ký lại: ghi nhận Thời điểm trình ký lại vào lịch sử trả lại
        if (r.status === 'Chờ ký' && Array.isArray(p.returnHistory) && p.returnHistory.length) {
            const last = p.returnHistory[p.returnHistory.length - 1];
            if (!last.resubmittedAt) last.resubmittedAt = r.submittedAt;
        }
        p.internalLogs = p.internalLogs || [];
        p.internalLogs.unshift({ time: 'Vừa xong', user: 'Nguyễn Văn Cán Bộ', action: r.pendingAction, comment: r.pendingAction === 'Từ chối' ? `Lý do từ chối: ${r.rejectReason}. Lãnh đạo ký: ${r.rejectLeader}` : `Trình Lãnh đạo ký: ${r.signLeader}` });
        persistProfileForAction(p);
    });
    saveProfiles();
    showListToast(records.length > 1 ? `${message} (${records.length} hồ sơ).` : message + '.', 'success');
    updateTabBadges();
    renderTable();
}

// Duyệt / Trình ký / Từ chối trên thanh công cụ (thao tác lô)
function getSelectedRegistrationProfiles() {
    return getSelectedRows().map(id => findProfileForAction(id)).filter(Boolean);
}

function approveRegistrationProfiles(list) {
    const at = new Date().toLocaleString('vi-VN');
    list.forEach(p => {
        p.previousStatus = p.status;
        p.status = 'Duyệt chờ ký';
        p.statusClass = 'badge-info';
        p.approvedBy = 'Nguyễn Văn Cán Bộ';
        p.approvedAt = at;
        p.internalLogs = p.internalLogs || [];
        p.internalLogs.unshift({ time: 'Vừa xong', user: 'Nguyễn Văn Cán Bộ', action: 'Duyệt', comment: `Chuyển trạng thái ${p.previousStatus} → Duyệt chờ ký.` });
        persistProfileForAction(p);
    });
    saveProfiles();
    updateTabBadges();
    renderTable();
}

function openRegistrationSignToolbar() {
    const list = getSelectedRegistrationProfiles();
    if (!list.length) { showListToast('Vui lòng chọn ít nhất một hồ sơ để thực hiện thao tác.', 'error'); return; } // [MSG-ERR-DK-008]
    PdkPopups.openSign(list.map(toPdkPopupRecord), { mode: 'multi', onDone: applyPdkPopupResult });
}

function openRegistrationRejectToolbar() {
    const list = getSelectedRegistrationProfiles();
    if (!list.length) { showListToast('Vui lòng chọn ít nhất một hồ sơ để thực hiện thao tác.', 'error'); return; } // [MSG-ERR-DK-008]
    PdkPopups.openReject(list.map(toPdkPopupRecord), { mode: 'multi', onDone: applyPdkPopupResult });
}

function openRegistrationSignSingle(id) {
    const p = findProfileForAction(id);
    if (p) PdkPopups.openSign([toPdkPopupRecord(p)], { mode: 'single', onDone: applyPdkPopupResult });
}

function openRegistrationRejectSingle(id) {
    const p = findProfileForAction(id);
    if (p) PdkPopups.openReject([toPdkPopupRecord(p)], { mode: 'single', onDone: applyPdkPopupResult });
}

// Khởi tạo bảng dữ liệu ban đầu kết hợp lọc & phân trang
function renderTable(resetPage = false) {
    if (resetPage) {
        currentPage = 1;
    }

    // 2. Determine target status based on current active tab
    let targetStatuses = ['Chờ duyệt'];
    if (currentListTab === 'chonhaplieu') targetStatuses = ['Chờ giải quyết'];
    else if (currentListTab === 'duyet-choky') targetStatuses = ['Duyệt chờ ký'];
    else if (currentListTab === 'bitralai') targetStatuses = ['Bị trả lại'];
    else if (currentListTab === 'dang_xu_ly') targetStatuses = ['Chờ ký'];
    else if (currentListTab === 'da_xu_ly') targetStatuses = ['Hoàn thành', 'Bị từ chối'];

    // 3. Filter the complete mock profiles array plus custom localStorage data
    const currentVersion = 'v11';
    const savedVersion = localStorage.getItem('mock_profiles_version');
    if (savedVersion !== currentVersion) {
        localStorage.removeItem('custom_mock_profiles');
        localStorage.setItem('mock_profiles_version', currentVersion);
    }

    let allProfiles = [...loadPaperDigitizeProfiles(), ...mockProfiles];
    const cached = localStorage.getItem('custom_mock_profiles');
    if (cached) {
        let customList = JSON.parse(cached);
        let upgraded = false;
        const pendingForSigIds = ['GDBD-2026-000801', 'GDBD-2026-000802', 'GDBD-2026-000805'];
        customList.forEach(p => {
            if (pendingForSigIds.includes(p.id)) {
                if (p.status === 'Chờ ký') {
                    p.status = 'Chờ ký';
                    upgraded = true;
                }
            } else {
                if (p.status === 'Chờ ký') {
                    p.status = 'Chờ ký';
                    upgraded = true;
                }
            }
        });
        if (upgraded) {
            localStorage.setItem('custom_mock_profiles', JSON.stringify(customList));
        }
        const customIds = customList.map(c => c.id);
        allProfiles = allProfiles.filter(p => !customIds.includes(p.id));
        allProfiles = [...customList, ...allProfiles];
    }

    if (isRegInputLayout()) {
        const filterMaHoSo = document.getElementById('filter-ma-ho-so')?.value.toLowerCase().trim() || '';
        const filterSoDon = document.getElementById('filter-so-don-giay')?.value.toLowerCase().trim() || '';
        const filterNguoiYeuCau = document.getElementById('filter-nguoi-yeu-cau')?.value.toLowerCase().trim() || '';
        const filterNguoiNop = document.getElementById('filter-nguoi-nop')?.value.toLowerCase().trim() || '';
        const filterLoaiYeuCau = document.getElementById('filter-loai-yeu-cau')?.value || '';
        const filterTrangThaiPhi = document.getElementById('filter-trang-thai-phi')?.value || '';
        const filterCanBoTiepNhan = document.getElementById('filter-can-bo-tiep-nhan')?.value.toLowerCase().trim() || '';
        const filterTungay = document.getElementById('filter-tungay')?.value || '';
        const filterDenngay = document.getElementById('filter-denngay')?.value || '';

        filteredProfiles = allProfiles.filter(p => {
            if (p.handlingOfficer && p.handlingOfficer !== "Nguyễn Văn Cán Bộ") return false;
            if (!targetStatuses.includes(p.status)) return false;
            // Tab Hồ sơ Bị trả lại - nhóm Phiếu đăng ký: không gồm hồ sơ Yêu cầu cung cấp thông tin/bản sao
            // Danh sách chờ nhập liệu / bị trả lại nhóm Phiếu đăng ký: không gồm hồ sơ Yêu cầu cung cấp thông tin/bản sao
            if (REG_SERVICE_TYPES.includes(p.type) || (p.type || '').includes('Yêu cầu cung cấp')) return false;

            if (filterMaHoSo && !p.id.toLowerCase().includes(filterMaHoSo)) return false;
            if (filterSoDon && !(p.paper || '').toLowerCase().includes(filterSoDon)) return false;
            if (filterNguoiYeuCau && !p.customer.toLowerCase().includes(filterNguoiYeuCau)) return false;
            if (filterNguoiNop && !(p.submitter || p.customer).toLowerCase().includes(filterNguoiNop)) return false;
            if (filterLoaiYeuCau && p.type !== filterLoaiYeuCau) return false;
            if (filterTrangThaiPhi && (p.paymentStatus || (p.paymentMethod === 'mien_phi' ? 'Miễn phí' : 'Đã thu')) !== filterTrangThaiPhi) return false;
            if (filterCanBoTiepNhan && !(p.officer || '').toLowerCase().includes(filterCanBoTiepNhan)) return false;

            if (filterTungay) {
                const rowDate = parseDateString(p.date);
                const fromDate = parseDateString(filterTungay);
                if (rowDate && fromDate && rowDate < fromDate) return false;
            }
            if (filterDenngay) {
                const rowDate = parseDateString(p.date);
                const toDate = parseDateString(filterDenngay);
                if (rowDate && toDate) {
                    toDate.setHours(23, 59, 59, 999);
                    if (rowDate > toDate) return false;
                }
            }
            return true;
        });

        // Sắp xếp động qua click header cột
        if (currentSortColumn === 'date') {
            filteredProfiles.sort((a, b) => {
                const diff = parseDateString(b.date) - parseDateString(a.date);
                return currentSortOrder === 'desc' ? diff : -diff;
            });
        } else if (currentSortColumn === 'name') {
            filteredProfiles.sort((a, b) => {
                const diff = a.customer.localeCompare(b.customer, 'vi');
                return currentSortOrder === 'desc' ? -diff : diff;
            });
        } else {
            filteredProfiles.sort((a, b) => parseDateString(b.date) - parseDateString(a.date));
        }
    } else {
        const fv = id => (document.getElementById(id)?.value || '').toLowerCase().trim();
        const filterSdk = fv('filter-reg-sdk');
        const filterBbd = fv('filter-reg-bbd');
        const filterBnbd = fv('filter-reg-bnbd');
        const filterReceipt = fv('filter-reg-receipt');
        const filterCustomerId = (document.getElementById('filter-customer-id')?.value || '').toLowerCase().trim();
        const filterNguonTiepNhan = document.getElementById('filter-nguon-tiep-nhan')?.value || '';
        const filterLoaidangky = document.getElementById('filter-loaidangky')?.value || '';
        const filterLoaihinh = document.getElementById('cb-loaihinh')?.value || '';
        const filterSubtype = document.getElementById('cb-loaibienphap')?.value || '';
        const filterAssetKey = document.getElementById('filter-loaitaisan')?.value || '';
        const filterTungay = document.getElementById('filter-tungay')?.value || '';
        const filterDenngay = document.getElementById('filter-denngay')?.value || '';
        const dynamicFilters = getRegDynamicColumns()
            .map(c => ({ id: c.id, value: (document.getElementById('dyn-' + c.id)?.value || '').toLowerCase().trim() }))
            .filter(x => x.value);

        filteredProfiles = allProfiles.filter(p => {
            if (p.handlingOfficer && p.handlingOfficer !== "Nguyễn Văn Cán Bộ") return false;
            if (!targetStatuses.includes(p.status)) return false;
            // Chỉ lọc trong phạm vi nhóm Phiếu đăng ký
            if (REG_SERVICE_TYPES.includes(p.type)) return false;

            if (currentListTab === 'da_xu_ly') {
                const filterStatusVal = document.getElementById('filter-status-xu-ly')?.value;
                if (filterStatusVal && p.status !== filterStatusVal) return false;
            }

            // Tìm kiếm gần đúng theo từng trường: Số đăng ký, Tên bên bảo đảm, Tên bên nhận bảo đảm, Số biên lai
            if (filterSdk && !String(p.registrationNo || p.id || '').toLowerCase().includes(filterSdk)) return false;
            if (filterBbd && !(p.customer || '').toLowerCase().includes(filterBbd)) return false;
            if (filterBnbd && !(p.mortgagee || '').toLowerCase().includes(filterBnbd)) return false;
            if (filterReceipt && !(p.receipt || '').toLowerCase().includes(filterReceipt)) return false;
            if (filterCustomerId && !(p.customerId || '').toLowerCase().includes(filterCustomerId)) return false;
            if (filterNguonTiepNhan && getRegSourceLabel(p.channel) !== filterNguonTiepNhan) return false;
            if (filterLoaidangky && p.type !== filterLoaidangky) return false;
            if (filterLoaihinh === 'Thông báo xử lý tài sản') {
                if (!(p.type || '').includes('xử lý tài sản')) return false;
            } else if (filterLoaihinh) {
                if ((p.type || '').includes('xử lý tài sản') || p.transactionType !== filterLoaihinh) return false;
            }
            if (filterSubtype && p.subtype !== filterSubtype) return false;
            if (filterAssetKey && !getRegAssetKeys(p.assetType).includes(filterAssetKey)) return false;
            if (dynamicFilters.length) {
                const detail = getRegAssetDetail(p);
                if (!dynamicFilters.every(f => String(detail[f.id] || '').toLowerCase().includes(f.value))) return false;
            }

            if (filterTungay) {
                const rowDate = parseDateString(p.date);
                const fromDate = parseDateString(filterTungay);
                if (rowDate && fromDate && rowDate < fromDate) return false;
            }
            if (filterDenngay) {
                const rowDate = parseDateString(p.date);
                const toDate = parseDateString(filterDenngay);
                if (rowDate && toDate) {
                    toDate.setHours(23, 59, 59, 999);
                    if (rowDate > toDate) return false;
                }
            }
            return true;
        });

        // Sắp xếp: mặc định theo Thời điểm đăng ký tăng dần; cho phép sắp xếp 03 cột Thời điểm đăng ký, Tên bên bảo đảm, Tên bên nhận bảo đảm
        const dir = currentSortOrder === 'desc' ? -1 : 1;
        if (currentSortColumn === 'customer') {
            filteredProfiles.sort((a, b) => dir * (a.customer || '').localeCompare(b.customer || '', 'vi'));
        } else if (currentSortColumn === 'mortgagee') {
            filteredProfiles.sort((a, b) => dir * (a.mortgagee || '').localeCompare(b.mortgagee || '', 'vi'));
        } else if (currentSortColumn === 'date') {
            filteredProfiles.sort((a, b) => dir * (parseDateString(a.date) - parseDateString(b.date)));
        } else {
            filteredProfiles.sort((a, b) => parseDateString(a.date) - parseDateString(b.date));
        }
    }
    // 5. Render sliced page rows
    if (regRestoredPage) { currentPage = regRestoredPage; regRestoredPage = null; }
    executeRender();
}

function executeRender() {
    const tbody = document.getElementById('table-data');
    tbody.innerHTML = '';

    const thead = document.getElementById('table-headers-container');
    if (isRegInputLayout()) {
        thead.innerHTML = `
            <tr>
                <th style="width: 50px; text-align: center;">STT</th>
                <th style="width: 140px;">Mã hồ sơ</th>
                <th style="width: 110px;">Số đơn giấy</th>
                <th style="cursor: pointer; width: 210px;" onclick="toggleSort('name')">Người yêu cầu ${getSortIcon('name')}</th>
                <th style="width: 180px;">Người nộp</th>
                <th style="width: 190px;">Loại yêu cầu</th>
                <th style="cursor: pointer; width: 140px;" onclick="toggleSort('date')">Ngày tiếp nhận ${getSortIcon('date')}</th>
                <th style="width: 130px;">Đã thu/Miễn phí</th>
                <th style="width: 120px;">Trạng thái lệ phí</th>
                <th style="width: 130px;">Trạng thái hồ sơ</th>
                <th style="width: 150px;">Cán bộ tiếp nhận</th>
                <th style="text-align: center; width: 130px; min-width: 130px;">Thao tác</th>
            </tr>
        `;
    } else {
        const isReadOnlyView = (currentListTab === 'dang_xu_ly' || currentListTab === 'da_xu_ly');
        let actionsMinWidth = '130px';
        if (isReadOnlyView) {
            actionsMinWidth = '80px';
        } else if (currentListTab === 'bitralai') {
            actionsMinWidth = '110px';
        } else if (currentListTab === 'choduyet') {
            actionsMinWidth = '185px';
        }

        thead.innerHTML = `
            <tr>
                ${isReadOnlyView ? '' : '<th style="width: 40px; text-align: center;"><input type="checkbox" id="checkAll" onclick="toggleCheckAll(this)"></th>'}
                <th style="width: 50px; text-align: center;">STT</th>
                <th style="cursor: pointer; width: 140px;" onclick="toggleSort('date')">Thời điểm đăng ký ${getSortIcon('date')}</th>
                <th style="width: 120px;">Số đăng ký</th>
                <th style="width: 80px;">Mã PIN</th>
                <th style="cursor: pointer; width: 220px;" onclick="toggleSort('customer')">Tên bên bảo đảm ${getSortIcon('customer')}</th>
                <th style="cursor: pointer; width: 220px;" onclick="toggleSort('mortgagee')">Tên bên nhận bảo đảm ${getSortIcon('mortgagee')}</th>
                <th style="width: 120px;">Loại đăng ký</th>
                <th style="width: 110px;">Loại hình GD</th>
                <th style="width: 140px;">Loại biện pháp / Hợp đồng</th>
                <th style="width: 250px;">Loại tài sản</th>
                ${getRegDynamicColumns().map(c => `<th style="width: 160px; min-width: 140px; background:#EFF6FF; color:#1E40AF; font-weight:600;">${c.label}</th>`).join('')}
                <th style="width: 120px;">Mã khách hàng</th>
                <th style="width: 110px;">Số biên lai</th>
                <th style="width: 110px;">Trạng thái</th>
                <th style="width: 150px;">Người yêu cầu</th>
                <th style="width: 140px;">Nguồn tiếp nhận</th>
                <th style="width: 140px;">Cán bộ xử lý</th>
                <th style="text-align: center; width: ${actionsMinWidth}; min-width: ${actionsMinWidth};">Thao tác</th>
            </tr>
        `;
    }

    const isReadOnlyView = (currentListTab === 'dang_xu_ly' || currentListTab === 'da_xu_ly');
    const totalCount = filteredProfiles.length;
    const dynamicCols = isRegInputLayout() ? [] : getRegDynamicColumns();
    const colSpanCount = isRegInputLayout() ? 12 : (isReadOnlyView ? 17 + dynamicCols.length : 18 + dynamicCols.length);

    if (totalCount === 0) {
        // [MSG-INF-SYS-001]
        tbody.innerHTML = `<tr><td colspan="${colSpanCount}" style="text-align: center; padding: 30px; color: var(--text-muted);"><i>Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</i></td></tr>`;
        applyPagination([], executeRender);
        return;
    }

    // Cắt dữ liệu theo trang hiện tại và vẽ lại thanh phân trang dùng chung
    const pageData = applyPagination(filteredProfiles, executeRender);
    const startIndex = paginationStartIndex;

    pageData.forEach((row, index) => {
        if (isRegInputLayout()) {
            const isReturnedTab = currentListTab === 'bitralai';
            const feeText = row.paymentMethod === 'mien_phi' || Number(row.amount || 0) === 0 ? 'Miễn phí' : Number(row.amount || 0).toLocaleString('vi-VN') + ' VND';
            const feeStatus = row.paymentStatus || (row.paymentMethod === 'mien_phi' ? 'Miễn phí' : 'Đã thu');
            const feeBadge = feeStatus === 'Miễn phí' ? 'badge-info' : 'badge-success';
            const requestTypeCell = row.type === 'Yêu cầu cung cấp thông tin'
                ? `<span class="action-link" title="Mở form nhập liệu Yêu cầu cung cấp thông tin" onclick="event.stopPropagation(); startDigitize('${row.id}')"><b>${row.type}</b></span>`
                : row.type;

            tbody.innerHTML += `
                <tr style="cursor: pointer;" onclick="${isReturnedTab ? `openDetail('${row.id}')` : `openPaperReadonly('${row.id}')`}">
                    <td>${startIndex + index + 1}</td>
                    <td><span class="action-link" onclick="event.stopPropagation(); openPaperReadonly('${row.id}')"><b>${row.id}</b></span></td>
                    <td><code>${row.paper || '-'}</code></td>
                    <td>${row.customer}</td>
                    <td>${row.submitter || row.customer}</td>
                    <td>${requestTypeCell}</td>
                    <td>${row.date}</td>
                    <td>${feeText}</td>
                    <td><span class="badge ${feeBadge}">${feeStatus}</span></td>
                    <td><span class="badge ${isReturnedTab ? 'badge-danger' : 'badge-warning'}">${isReturnedTab ? 'Bị trả lại' : 'Chờ giải quyết'}</span></td>
                    <td>${row.officer || '-'}</td>
                    <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                        ${isReturnedTab
                            ? `<button class="icon-btn edit" title="Cập nhật" onclick="startDigitize('${row.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`
                            : `<button class="icon-btn edit" title="Tạo hồ sơ" onclick="startDigitize('${row.id}')"><i class="fa-solid fa-file-circle-plus"></i></button>`}
                        <button class="icon-btn reject" title="Từ chối" onclick="openRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>
                    </td>
                </tr>
            `;
        } else {
            let actionsHtml = '';

            if (isReadOnlyView) {
                actionsHtml = `<button class="icon-btn view" title="Xem chi tiết" onclick="event.stopPropagation(); openDetail('${row.id}')"><i class="fa-solid fa-eye"></i></button>`;
            } else if (currentListTab === 'choduyet') {
                // Thao tác trên dòng: Duyệt, Trình ký, Từ chối
                const btnApprove = `<button class="icon-btn approve" title="Duyệt" onclick="event.stopPropagation(); approveDossierSingle('${row.id}')"><i class="fa fa-check"></i></button>`;
                const btnSign = `<button class="icon-btn sign" title="Trình ký" onclick="event.stopPropagation(); openRegistrationSignSingle('${row.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
                const btnReject = `<button class="icon-btn reject" title="Từ chối" onclick="event.stopPropagation(); openRegistrationRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>`;
                actionsHtml = `${btnApprove}${btnSign}${btnReject}`;
            } else if (currentListTab === 'duyet-choky') {
                const btnSign = `<button class="icon-btn sign" title="Trình ký" onclick="event.stopPropagation(); openRegistrationSignSingle('${row.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
                const btnCancelApprove = `<button class="icon-btn cancel-approve" title="Hủy duyệt" onclick="event.stopPropagation(); cancelApprovalSingle('${row.id}')"><i class="fa-solid fa-rotate-left"></i></button>`;
                const btnReject = `<button class="icon-btn reject" title="Từ chối" onclick="event.stopPropagation(); openRegistrationRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>`;
                actionsHtml = `${btnSign}${btnCancelApprove}${btnReject}`;
            } else if (currentListTab === 'bitralai') {
                const btnEdit = `<button class="icon-btn edit" title="Cập nhật thông tin" onclick="event.stopPropagation(); startDigitize('${row.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                const btnReject = `<button class="icon-btn reject" title="Từ chối hồ sơ" onclick="event.stopPropagation(); openRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>`;
                actionsHtml = `${btnEdit}${btnReject}`;
            } else {
                actionsHtml = '';
            }

            tbody.innerHTML += `
                <tr style="cursor: pointer;" onclick="openDetail('${row.id}')">
                    ${isReadOnlyView ? '' : `<td onclick="event.stopPropagation()"><input type="checkbox" class="row-checkbox" value="${row.id}"></td>`}
                    <td>${startIndex + index + 1}</td>
                    <td>${row.date}</td>
                    <td><span class="action-link" onclick="event.stopPropagation(); openDetail('${row.id}')">${row.id}</span></td>
                    <td><code>${['Đăng ký mới', 'Đăng ký lần đầu'].includes(row.type) ? (row.pin || '-') : '-'}</code></td>
                    <td><b>${row.customer}</b></td>
                    <td>${row.mortgagee}</td>
                    <td>${row.type}</td>
                    <td>${row.transactionType}</td>
                    <td>${row.subtype}</td>
                    ${formatAssetTypeCell(row.assetType)}
                    ${dynamicCols.map(c => `<td style="background:#F8FBFF">${getRegAssetDetail(row)[c.id] || '-'}</td>`).join('')}
                    <td><code>${row.customerId || '-'}</code></td>
                    <td><code>${row.receipt || '-'}</code></td>
                    <td><span class="badge ${row.statusClass}">${row.status}</span></td>
                    <td>${row.requestor || row.customer}</td>
                    <td>${getRegSourceLabel(row.channel)}</td>
                    <td>${row.handlingOfficer || '-'}</td>
                    <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                        ${actionsHtml}
                    </td>
                </tr>
            `;
        }
    });

    const checkAll = document.getElementById('checkAll');
    if (checkAll) checkAll.checked = false;
}

// Render các nút phân trang
function renderPagination(totalCount) {
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const container = document.getElementById('pagination-buttons');
    if (!container) return;

    const atFirst = currentPage <= 1;
    const atLast = currentPage >= totalPages;

    let html = '';
    html += '<button type="button" class="page-item ' + (atFirst ? 'disabled' : '') + '" ' + (atFirst ? 'disabled' : '') + ' onclick="goToPage(1)" title="Trang đầu">|&lt;&lt;</button>';
    html += '<button type="button" class="page-item ' + (atFirst ? 'disabled' : '') + '" ' + (atFirst ? 'disabled' : '') + ' onclick="goToPage(' + (currentPage - 1) + ')" title="Trang trước">&lt;</button>';

    for (let i = 1; i <= totalPages; i++) {
        html += '<button type="button" class="page-item ' + (i === currentPage ? 'active' : '') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
    }

    html += '<button type="button" class="page-item ' + (atLast ? 'disabled' : '') + '" ' + (atLast ? 'disabled' : '') + ' onclick="goToPage(' + (currentPage + 1) + ')" title="Trang sau">&gt;</button>';
    html += '<button type="button" class="page-item ' + (atLast ? 'disabled' : '') + '" ' + (atLast ? 'disabled' : '') + ' onclick="goToPage(' + totalPages + ')" title="Trang cuối">&gt;&gt;|</button>';

    container.innerHTML = html;
}

// Hàm vẽ lại danh sách đang hiển thị; mỗi màn danh sách tự đăng ký hàm của mình qua applyPagination.
let paginationCallback = null;
let paginationStartIndex = 0;

function goToPage(page) {
    if (page < 1) page = 1;
    currentPage = page;
    if (typeof paginationCallback === 'function') paginationCallback();
    else executeRender();
}

// Cắt dữ liệu theo trang hiện tại, cập nhật nhãn số bản ghi và vẽ lại thanh phân trang.
// Trả về mảng bản ghi thuộc trang hiện tại; số thứ tự dòng đầu trang nằm ở paginationStartIndex.
function applyPagination(rows, redrawCallback) {
    paginationCallback = redrawCallback || null;
    const totalCount = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    paginationStartIndex = startIndex;

    const startLabel = document.getElementById('page-start-index');
    const endLabel = document.getElementById('page-end-index');
    const totalLabel = document.getElementById('total-records');
    if (startLabel) startLabel.innerText = totalCount === 0 ? 0 : startIndex + 1;
    if (endLabel) endLabel.innerText = endIndex;
    if (totalLabel) totalLabel.innerText = totalCount;

    renderPagination(totalCount);
    return rows.slice(startIndex, endIndex);
}

function changePageSize(size) {
    pageSize = parseInt(size, 10);
    currentPage = 1;
    if (typeof paginationCallback === 'function') paginationCallback();
    else executeRender();
}

// Chuyển đổi tab danh sách chính MH01
function switchListTab(tab, element) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    if (element) element.classList.add('active');
    currentListTab = tab;
    sessionStorage.setItem('activeListTab', tab);

    // Quản lý hiển thị các toolbar và checkbox cột
    document.getElementById('toolbar-choduyet').style.display = 'none';
    document.getElementById('toolbar-duyet-choky').style.display = 'none';
    document.getElementById('toolbar-choky').style.display = 'none';
    const tableTitle = document.getElementById('list-table-title');
    if (tableTitle) {
        tableTitle.innerText = tab === 'chonhaplieu' ? 'Danh sách hồ sơ chờ nhập liệu' : 'Bảng danh sách kết quả đối soát';
    }

    if (tab === 'choduyet') {
        document.getElementById('toolbar-choduyet').style.display = 'flex';
    } else if (tab === 'duyet-choky') {
        document.getElementById('toolbar-duyet-choky').style.display = 'flex';
    } else if (tab === 'choky' || tab === 'bitralai') {
        document.getElementById('toolbar-choky').style.display = 'block';
    }

    renderFilterPanel();
    renderTable(true);
}

function renderFilterPanel() {
    const container = document.getElementById('filter-card-container');
    if (!container) return;

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    // Default from date: first day of current month
    const defFromDate = `01/${month}/${year}`;
    const defToDate = `${String(today.getDate()).padStart(2, '0')}/${month}/${year}`;

    if (isRegInputLayout()) {
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group">
                    <label class="form-label">Mã hồ sơ</label>
                    <input type="text" class="form-control" id="filter-ma-ho-so" placeholder="Nhập mã hồ sơ..." autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Số đơn giấy</label>
                    <input type="text" class="form-control" id="filter-so-don-giay" placeholder="Nhập số đơn giấy..." autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Người yêu cầu</label>
                    <input type="text" class="form-control" id="filter-nguoi-yeu-cau" placeholder="Tên cá nhân/tổ chức" autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Người nộp hồ sơ</label>
                    <input type="text" class="form-control" id="filter-nguoi-nop" placeholder="Tên người nộp" autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Loại yêu cầu</label>
                    <select class="form-select" id="filter-loai-yeu-cau">
                        <option value="">Tất cả</option>
                        <option value="Đăng ký lần đầu">Đăng ký lần đầu</option>
                        <option value="Đăng ký thay đổi">Đăng ký thay đổi</option>
                        <option value="Xóa đăng ký">Xóa đăng ký</option>
                        <option value="Thông báo xử lý tài sản">Thông báo xử lý tài sản</option>
                        <option value="Yêu cầu cung cấp thông tin">Yêu cầu cung cấp thông tin</option>
                        <option value="Yêu cầu cung cấp bản sao">Yêu cầu cung cấp bản sao</option>
                        <option value="Yêu cầu cung cấp bản sao kèm thông báo">Yêu cầu cung cấp bản sao kèm thông báo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Trạng thái lệ phí</label>
                    <select class="form-select" id="filter-trang-thai-phi">
                        <option value="">Tất cả</option>
                        <option value="Đã thu">Đã thu</option>
                        <option value="Miễn phí">Miễn phí</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Cán bộ tiếp nhận</label>
                    <input type="text" class="form-control" id="filter-can-bo-tiep-nhan" placeholder="Tên cán bộ tiếp nhận" autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Từ ngày tiếp nhận</label>
                    <div class="date-filter-wrap">
                        <input type="text" class="form-control" id="filter-tungay" placeholder="dd/mm/yyyy" value="${defFromDate}">
                        <i class="fa-regular fa-calendar-days"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Đến ngày tiếp nhận</label>
                    <div class="date-filter-wrap">
                        <input type="text" class="form-control" id="filter-denngay" placeholder="dd/mm/yyyy" value="${defToDate}">
                        <i class="fa-regular fa-calendar-days"></i>
                    </div>
                </div>
            </div>
            <div class="filter-action-row" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #F1F5F9; display: flex; justify-content: flex-end; align-items: center; gap: 8px;">
                <button class="btn btn-outline-secondary" onclick="resetFilters()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="searchList()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
            </div>
        `;
    } else {
        let statusFilterHtml = '';
        if (currentListTab === 'da_xu_ly') {
            statusFilterHtml = `
                <div class="form-group">
                    <label class="form-label">Trạng thái xử lý</label>
                    <select class="form-select" id="filter-status-xu-ly">
                        <option value="">Tất cả</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Bị từ chối">Bị từ chối</option>
                    </select>
                </div>
            `;
        }

        renderRegistrationFilterPanel(container, statusFilterHtml);
    }

    if (typeof flatpickr !== 'undefined') {
        flatpickr("#filter-tungay", { dateFormat: "d/m/Y", allowInput: true });
        flatpickr("#filter-denngay", { dateFormat: "d/m/Y", allowInput: true });
    }
    
}

let singleRejectId = null;

function approveDossierSingle(id) {
    const p = findProfileForAction(id);
    if (!p) return;
    approveRegistrationProfiles([p]);
    showListToast('Phê duyệt hồ sơ thành công', 'success'); // [MSG-SUC-DK-KT-001]
}

// Hủy duyệt: chuyển hồ sơ từ "Duyệt chờ ký" về "Chờ duyệt", hiển thị [MSG-SUC-DK-KT-004] và tải lại danh sách
function cancelApprovalSingle(id) {
    const p = findProfileForAction(id);
    if (!p) return;
    p.previousStatus = p.status;
    p.status = 'Chờ duyệt';
    p.statusClass = 'badge-warning';
    p.internalLogs = p.internalLogs || [];
    p.internalLogs.unshift({ time: 'Vừa xong', user: 'Nguyễn Văn Cán Bộ', action: 'Hủy duyệt', comment: 'Chuyển trạng thái Duyệt chờ ký → Chờ duyệt.' });
    persistProfileForAction(p);
    saveProfiles();
    updateTabBadges();
    renderTable();
    showListToast('Đã hủy duyệt hồ sơ thành công', 'success');
}

function saveProfiles() {
    const cached = localStorage.getItem('custom_mock_profiles');
    const currentCustom = cached ? JSON.parse(cached) : [];
    const mockIds = mockProfiles.map(p => p.id);
    const preservedExternal = currentCustom.filter(p => !mockIds.includes(p.id));
    localStorage.setItem('custom_mock_profiles', JSON.stringify([...preservedExternal, ...mockProfiles]));
}

function findProfileForAction(id) {
    const cached = localStorage.getItem('custom_mock_profiles');
    const customList = cached ? JSON.parse(cached) : [];
    return mockProfiles.find(p => p.id === id)
        || customList.find(p => p.id === id)
        || loadPaperDigitizeProfiles().find(p => p.id === id);
}

function persistProfileForAction(profile) {
    const cached = localStorage.getItem('custom_mock_profiles');
    const customList = cached ? JSON.parse(cached) : [];
    const idx = customList.findIndex(p => p.id === profile.id);
    if (idx >= 0) customList[idx] = profile;
    else customList.unshift(profile);
    localStorage.setItem('custom_mock_profiles', JSON.stringify(customList));
}

function updateTabBadges() {
    const counts = {
        chonhaplieu: 0,
        choduyet: 0,
        'duyet-choky': 0,
        bitralai: 0
    };
    
    let allProfiles = [...loadPaperDigitizeProfiles(), ...mockProfiles];
    const cached = localStorage.getItem('custom_mock_profiles');
    if (cached) {
        let customList = JSON.parse(cached);
        const pendingForSigIds = ['GDBD-2026-000801', 'GDBD-2026-000802', 'GDBD-2026-000805'];
        customList.forEach(p => {
            if (pendingForSigIds.includes(p.id)) {
                if (p.status === 'Chờ ký') {
                    p.status = 'Chờ ký';
                }
            } else {
                if (p.status === 'Chờ ký') {
                    p.status = 'Chờ ký';
                }
            }
        });
        const customIds = customList.map(c => c.id);
        allProfiles = allProfiles.filter(p => !customIds.includes(p.id));
        allProfiles = [...customList, ...allProfiles];
    }

    // Badge Tab trạng thái = tổng số hồ sơ của 03 Tab nhóm nghiệp vụ ở trạng thái tương ứng
    // Badge Tab nhóm nghiệp vụ = số hồ sơ của nhóm trong Tab trạng thái đang chọn (không phụ thuộc bộ lọc)
    const perType = tab => ({
        registration: countBadgeRegistration(allProfiles, tab),
        cctt: countBadgeCctt(tab),
        copy: countBadgeCopy(tab)
    });
    Object.keys(counts).forEach(tab => {
        const c = perType(tab);
        counts[tab] = c.registration + c.cctt + c.copy;
    });

    setBadgeValue(document.getElementById('badge-chonhaplieu'), counts.chonhaplieu);
    setBadgeValue(document.getElementById('badge-choduyet'), counts.choduyet);
    setBadgeValue(document.getElementById('badge-duyet-choky'), counts['duyet-choky']);
    setBadgeValue(document.getElementById('badge-bitralai'), counts.bitralai);

    // Badge Tab nhóm nghiệp vụ: chỉ hiển thị tại Hồ sơ chờ xử lý và Hồ sơ đang chờ ký
    const showWorkBadge = currentListTab !== 'da_xu_ly';
    const workCounts = showWorkBadge ? perType(currentListTab) : null;
    [['badge-reg-officer', 'registration'], ['badge-cctt-officer', 'cctt'], ['badge-copy-officer', 'copy']].forEach(([id, key]) => {
        setBadgeValue(document.getElementById(id), showWorkBadge ? workCounts[key] : 0);
    });

    // Badge Left Menu: "Hồ sơ chờ xử lý" = tổng 04 Tab trạng thái; "Hồ sơ đang chờ ký" = tổng hồ sơ "Chờ ký" của 03 nhóm nghiệp vụ
    const signing = perType('dang_xu_ly');
    const menuCounts = {
        kths_pending: counts.chonhaplieu + counts.choduyet + counts['duyet-choky'] + counts.bitralai,
        kths_signing: signing.registration + signing.cctt + signing.copy
    };
    try { localStorage.setItem('kths_menu_badges', JSON.stringify(menuCounts)); } catch (err) { }
    try { if (window.parent && window.parent !== window) window.parent.postMessage({ type: 'admin:menuBadges', counts: menuCounts }, '*'); } catch (err) { }
}

// Badge chỉ hiển thị khi giá trị > 0; lớn hơn 99 hiển thị "99+"
function setBadgeValue(el, n) {
    if (!el) return;
    n = Number(n) || 0;
    el.innerText = n > 99 ? '99+' : String(n);
    el.style.display = n > 0 ? '' : 'none';
}

const BADGE_TAB_STATUS = {
    chonhaplieu: 'Chờ giải quyết',
    choduyet: 'Chờ duyệt',
    'duyet-choky': 'Duyệt chờ ký',
    bitralai: 'Bị trả lại',
    dang_xu_ly: 'Chờ ký'
};

function countBadgeRegistration(allProfiles, tab) {
    const status = BADGE_TAB_STATUS[tab];
    return allProfiles.filter(p => {
        if (p.handlingOfficer && p.handlingOfficer !== "Nguyễn Văn Cán Bộ") return false;
        if (p.status !== status) return false;
        return !(REG_SERVICE_TYPES.includes(p.type) || (p.type || '').includes('Yêu cầu cung cấp'));
    }).length;
}

function countBadgeCctt(tab) {
    const status = BADGE_TAB_STATUS[tab];
    try {
        const source = ['chonhaplieu', 'bitralai'].includes(tab) ? getPaperCcttRows() : ccttOfficerRequests;
        return source.filter(x => x.status === status).length;
    } catch (err) { return 0; }
}

function countBadgeCopy(tab) {
    const status = BADGE_TAB_STATUS[tab];
    try {
        return officerCopyRequests.filter(x => {
            if (x.status !== status) return false;
            if (tab === 'chonhaplieu' && (x.source !== 'Cán bộ nhập liệu' || !['Đã thu', 'Miễn phí'].includes(x.feeStatus))) return false;
            if (tab === 'choduyet' && x.source === 'Cán bộ nhập liệu') return false;
            return true;
        }).length;
    } catch (err) { return 0; }
}

function submitForSignatureSingle(id) {
    currentProfile = mockProfiles.find(prof => prof.id === id);
    if (!currentProfile) return;

    openModalPreview('trinhky');
}

function openRejectSingle(id) {
    singleRejectId = id;
    document.getElementById('rejectReason').value = '';
    document.getElementById('rejectReason').classList.remove('is-invalid');
    document.getElementById('rejectError').classList.remove('active');
    openModal('modalReject');
}

function startDigitize(id) {
    localStorage.setItem('selected_dossier_id', id);
    if (typeof getPaperCcttRows === 'function') {
        const paperCctt = getPaperCcttRows().find(x => x.id === id);
        if (paperCctt) {
            const returned = paperCctt.status === 'Bị trả lại' ? '&returned=1' : '';
            window.location.href = 'nhap_lieu_ho_so_giay.html?id=' + encodeURIComponent(id) + '&type=cctt' + returned;
            return;
        }
    }
    const paperCopy = officerCopyRequests.find(x => x.id === id);
    if (paperCopy) {
        saveCopyItemForNavigation(paperCopy);
        const returned = paperCopy.status === 'Bị trả lại' ? '&returned=1' : '';
        const copyTypeParam = paperCopy.copyType === 'Bản sao giấy' ? '&copy_type=paper' : '&copy_type=electronic';
        const isNoticeParam = (paperCopy.requestType || '').includes('kèm thông báo') ? '&is_notice=1' : '';
        window.location.href = 'nhap_lieu_ho_so_giay.html?id=' + encodeURIComponent(id) + '&type=copy' + copyTypeParam + isNoticeParam + returned;
        return;
    }
    window.location.href = 'nhap_lieu_ho_so_giay.html?id=' + encodeURIComponent(id);
}

function openCopyReadonly(id) {
    openPaperReadonly(id);
}

function openPaperReadonly(id) {
    localStorage.setItem('selected_dossier_id', id);
    if (typeof getPaperCcttRows === 'function') {
        const paperCctt = getPaperCcttRows().find(x => x.id === id);
        if (paperCctt) {
            const returned = paperCctt.status === 'Bị trả lại' ? '&returned=1' : '';
            window.location.href = 'nhap_lieu_ho_so_giay.html?mode=view&id=' + encodeURIComponent(id) + '&type=cctt' + returned;
            return;
        }
    }
    const paperCopy = officerCopyRequests.find(x => x.id === id);
    if (paperCopy) {
        saveCopyItemForNavigation(paperCopy);
        const returned = paperCopy.status === 'Bị trả lại' ? '&returned=1' : '';
        const copyTypeParam = paperCopy.copyType === 'Bản sao giấy' ? '&copy_type=paper' : '&copy_type=electronic';
        const isNoticeParam = (paperCopy.requestType || '').includes('kèm thông báo') ? '&is_notice=1' : '';
        window.location.href = 'nhap_lieu_ho_so_giay.html?mode=view&id=' + encodeURIComponent(id) + '&type=copy' + copyTypeParam + isNoticeParam + returned;
        return;
    }
    // Phiếu đăng ký: hồ sơ Bị trả lại mở Xem chi tiết kèm nút Cập nhật, Đóng
    const regProfile = typeof findProfileForAction === 'function' ? findProfileForAction(id) : null;
    const regReturned = regProfile && regProfile.status === 'Bị trả lại' ? '&returned=1' : '';
    window.location.href = 'nhap_lieu_ho_so_giay.html?mode=view&id=' + encodeURIComponent(id) + regReturned;
}

function searchList() {
    // TH1: Từ ngày lớn hơn Đến ngày -> [MSG-ERR-VAL-007], highlight viền đỏ, không tìm kiếm
    const fromEl = document.getElementById('filter-tungay');
    const toEl = document.getElementById('filter-denngay');
    const errEl = document.getElementById('filter-date-error');
    const fromDate = parseDateString(fromEl?.value || '');
    const toDate = parseDateString(toEl?.value || '');
    const invalid = !!(fromDate && toDate && fromDate > toDate);
    if (fromEl) fromEl.classList.toggle('is-invalid', invalid);
    if (errEl) errEl.style.display = invalid ? 'block' : 'none';
    if (invalid) return;
    renderTable(true);
}

function parseDateString(dateStr) {
    if (!dateStr) return null;
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    const parts = dateStr.trim().split(' ');
    const dmy = parts[0].split('/');
    if (dmy.length !== 3) return null;
    const day = parseInt(dmy[0], 10);
    const month = parseInt(dmy[1], 10) - 1;
    const year = parseInt(dmy[2], 10);
    
    let h = 0, m = 0;
    if (parts.length > 1 && parts[1]) {
        const hm = parts[1].split(':');
        h = parseInt(hm[0], 10) || 0;
        m = parseInt(hm[1], 10) || 0;
    }
    return new Date(year, month, day, h, m);
}

function normalizeReceptionSource(source) {
    const value = (source || '').toLowerCase();
    if (value.includes('dịch vụ công') || value.includes('dvcqg')) return 'Dịch vụ công Quốc gia';
    if (value.includes('bưu') || value.includes('buu')) return 'Bưu chính';
    if (value.includes('trực tiếp') || value.includes('truc tiep') || value.includes('cán bộ') || value.includes('can bo')) return 'Trực tiếp';
    if (value.includes('điện tử') || value.includes('dien tu') || value.includes('website') || value.includes('mobile') || value.includes('khách hàng') || value.includes('khach hang') || value.includes('trực tuyến') || value.includes('truc tuyen')) return 'Trực tuyến';
    return source || '';
}

function matchReceptionSource(source, filterValue) {
    return !filterValue || normalizeReceptionSource(source) === filterValue;
}

// Xóa bộ lọc MH01
function resetFilters() {
    const ids = [
        'filter-makh', 'filter-tenbbd', 'filter-tenbnbd', 'filter-bienlai',
        'filter-so-dang-ky', 'filter-ten-bbd', 'filter-ten-bnbd', 'filter-customer-id',
        'filter-so-bien-lai', 'filter-nguon-tiep-nhan', 'filter-can-bo-xu-ly',
        'filter-loaidangky', 'cb-loaihinh',
        'filter-loaitaisan', 'filter-search-term', 'filter-kenh-tiep-nhan',
        'filter-loai-chu-the', 'filter-phuong-thuc', 'filter-hinh-thuc-tra',
        'filter-status-xu-ly', 'filter-ma-ho-so', 'filter-so-don-giay',
        'filter-nguoi-yeu-cau', 'filter-nguoi-nop', 'filter-loai-yeu-cau',
        'filter-trang-thai-phi', 'filter-can-bo-tiep-nhan', 'filter-reg-sdk', 'filter-reg-bbd', 'filter-reg-bnbd', 'filter-reg-receipt'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const defFromDate = `01/${month}/${year}`;
    const defToDate = `${String(today.getDate()).padStart(2, '0')}/${month}/${year}`;

    // Danh sách Phiếu đăng ký: Từ ngày là ngày hiện tại trừ 3 tháng, Đến ngày là ngày hiện tại
    const regRange = getRegDefaultDateRange();
    const isRegList = !isRegInputLayout();
    const elFrom = document.getElementById('filter-tungay');
    if (elFrom) { elFrom.value = isRegList ? regRange.from : defFromDate; elFrom.classList.remove('is-invalid'); }
    const elTo = document.getElementById('filter-denngay');
    if (elTo) elTo.value = isRegList ? regRange.to : defToDate;
    const dateErr = document.getElementById('filter-date-error');
    if (dateErr) dateErr.style.display = 'none';

    const cbLoaiHinh = document.getElementById('cb-loaihinh');
    if (cbLoaiHinh) {
        updateSubTypes();
    }
    // Ẩn Khối lọc động và các cột động theo Loại tài sản
    if (document.getElementById('reg-dynamic-filter')) onRegAssetTypeChange();

    renderTable(true);
}

// Cập nhật loại biện pháp theo loại hình
function updateSubTypes() {
    const cbLoaiHinh = document.getElementById('cb-loaihinh');
    const subTypeSelect = document.getElementById('cb-loaibienphap');
    if (!cbLoaiHinh || !subTypeSelect) return;

    const loaiHinh = cbLoaiHinh.value;
    subTypeSelect.innerHTML = '<option value="">Tất cả</option>';

    if (loaiHinh === 'Biện pháp bảo đảm') {
        const options = ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu', 'Đặt cọc', 'Ký cược', 'Ký quỹ'];
        options.forEach(opt => subTypeSelect.innerHTML += `<option value="${opt}">${opt}</option>`);
    } else if (loaiHinh === 'Hợp đồng') {
        const options = [
            'Hợp đồng cho thuê tài chính',
            'Hợp đồng thuê tài sản có thời hạn 1 năm trở lên',
            'Hợp đồng chuyển giao quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác',
            'Hợp đồng ký gửi'
        ];
        options.forEach(opt => subTypeSelect.innerHTML += `<option value="${opt}">${opt}</option>`);
    }
}

// Check/Uncheck tất cả Checkbox
function toggleCheckAll(source) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}

function getSelectedRows() {
    const checked = document.querySelectorAll('.row-checkbox:checked');
    return Array.from(checked).map(cb => cb.value);
}

// ==========================================
// MH02: MÀN HÌNH XEM CHI TIẾT & ĐỐI SOÁT
// ==========================================

// Bật/tắt Chỉ hiển thị vùng dữ liệu có biến động
function toggleDiffOnlyMode(checkbox) {
    showDiffOnly = checkbox.checked;
    renderTabContentsOnly();
}

// Mở màn hình Xem chi tiết hồ sơ
function openDetail(id) {
    sessionStorage.setItem('prevCanBoPage', window.location.href);
    saveRegListState();
    
    // Tìm kiếm node đang active để truyền tham số focusId
    let focusId = '';
    const cached = localStorage.getItem('custom_mock_profiles');
    if (cached) {
        const list = JSON.parse(cached);
        const matched = list.find(p => p.id === id);
        if (matched && matched.timeline) {
            const activeNode = matched.timeline.find(n => n.active);
            if (activeNode) focusId = activeNode.id;
        }
    }
    window.location.href = 'xem_chi_tiet_lich_su_can_bo.html?id=' + id + (focusId ? '&focusId=' + focusId : '') + '&from=kiem_tra';
}

// Render Trục Vòng đời Giao dịch (Vùng 1)
function renderTimeline() {
    const timelineUl = document.getElementById('lifecycle-timeline');
    timelineUl.innerHTML = '';

    currentProfile.timeline.forEach(node => {
        const isActive = (node.id === activeLifecycleNode);
        timelineUl.innerHTML += `
            <li class="timeline-item ${isActive ? 'active' : ''}" data-title="${node.title.toLowerCase()}" data-id="${node.id.toLowerCase()}" onclick="switchTimelineNode('${node.id}')">
                <div class="timeline-title">
                    <span>${node.title}</span>
                    ${isActive ? '<span>▶</span>' : ''}
                </div>
                <div class="timeline-date">${node.date}</div>
                <div class="timeline-desc">
                    Trạng thái: <span class="badge ${node.status === 'Hoàn thành' ? 'badge-success' : 'badge-warning'}">${node.status}</span>
                </div>
            </li>
        `;
    });

    // Reset search
    document.getElementById('timelineSearch').value = '';
}

// Tìm kiếm nhanh phiên bản trên trục vòng đời
function filterTimeline(query) {
    const cleanQuery = query.toLowerCase().trim();
    const items = document.querySelectorAll('#lifecycle-timeline .timeline-item');

    items.forEach(item => {
        const title = item.getAttribute('data-title');
        const id = item.getAttribute('data-id');
        const text = item.innerText.toLowerCase();

        if (text.includes(cleanQuery) || id.includes(cleanQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Xử lý chuyển đổi Node xem lịch sử trên Timeline
function switchTimelineNode(nodeId) {
    activeLifecycleNode = nodeId;
    currentProfile.timeline.forEach(t => t.active = (t.id === nodeId));

    const activeNode = currentProfile.timeline.find(t => t.id === nodeId);
    const isService = ['Yêu cầu cung cấp bản sao', 'Yêu cầu cung cấp bản sao kèm thông báo', 'Yêu cầu cung cấp thông tin'].includes(currentProfile.type);

    // Cập nhật tab active và ẩn hiện toggle lọc biến động
    if (isService) {
        activeDetailTab = 'dichvu';
        document.getElementById('toggle-diff-container').style.display = 'none';
    } else {
        activeDetailTab = 'nguoidangky';
        document.getElementById('toggle-diff-container').style.display = (activeNode && activeNode.title !== 'Đăng ký lần đầu') ? 'flex' : 'none';
    }

    // Reset toggle lọc biến động về false khi đổi node
    showDiffOnly = false;
    document.getElementById('toggle-diff-only').checked = false;

    renderTimeline();
    renderMainPaneData();
}

// Render Nhật ký phê duyệt nội bộ (Vùng 2)
function renderInternalLogs() {
    const logDiv = document.getElementById('internal-log-content');
    logDiv.innerHTML = '';

    currentProfile.internalLogs.forEach(log => {
        logDiv.innerHTML += `
            <div style="border-bottom: 1px dashed var(--border-color); padding: var(--spacing-sm) 0;">
                <div style="display: flex; justify-content: space-between; font-weight: 500;">
                    <span>👤 ${log.user}</span>
                    <span style="color: var(--text-muted); font-size: 10px;">${log.time}</span>
                </div>
                <div style="margin-top: 2px;">Hành động: <b>${log.action}</b></div>
                <div style="color: var(--text-muted); font-style: italic; margin-top: 2px;">Ý kiến: "${log.comment}"</div>
            </div>
        `;
    });
}

// Render các nút thao tác nghiệp vụ của Cán bộ (Vùng IV)
function renderDetailActionButtons() {
    const buttonsContainer = document.getElementById('detail-toolbar-buttons');
    const opinionGroup = document.getElementById('group-officer-opinion');
    buttonsContainer.innerHTML = '';

    const status = currentProfile.status;

    if (status === 'Chờ duyệt') {
        opinionGroup.style.display = 'block';
        document.getElementById('opinion-req-star').style.display = 'none';
        buttonsContainer.innerHTML = `
            <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
            <button class="btn btn-danger" onclick="handleDetailAction('tuchoi')">✖ Từ chối</button>
            <button class="btn btn-success" onclick="handleDetailAction('duyet')">✔ Duyệt</button>
            <button class="btn btn-primary" onclick="handleDetailAction('trinhky')">📝 Trình ký</button>
        `;
    } else if (status === 'Duyệt chờ ký') {
        opinionGroup.style.display = 'block';
        document.getElementById('opinion-req-star').style.display = 'none';
        buttonsContainer.innerHTML = `
            <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
            <button class="btn btn-primary" onclick="handleDetailAction('trinhky')">📝 Trình ký</button>
            <button class="btn btn-danger" onclick="handleDetailAction('tuchoi')">✖ Từ chối</button>
            <button class="btn btn-warning" style="background-color: #64748B; color: white;" onclick="handleDetailAction('huyduyet')"><i class="fa-solid fa-rotate-left"></i> Hủy duyệt</button>
        `;
    } else {
        // Hồ sơ Duyệt chờ ký, Bị trả lại hoặc khác
        opinionGroup.style.display = 'none';
        buttonsContainer.innerHTML = `
            <button class="btn btn-primary" onclick="closeDetail()">Đóng</button>
        `;
    }
}

// Tab switcher của Vùng 3
function switchDetailTab(tabId) {
    activeDetailTab = tabId;

    document.querySelectorAll('.detail-tab').forEach(t => {
        t.classList.remove('active');
        if (t.getAttribute('data-tab') === tabId) t.classList.add('active');
    });

    renderTabContentsOnly();
}

// Render Tab Control (Vùng 3)
function renderMainPaneData() {
    const tabControls = document.getElementById('tab-controls-container');
    const warningBanner = document.getElementById('full-deregistration-banner');

    const activeNode = currentProfile.timeline.find(t => t.id === activeLifecycleNode);
    const nodeTitle = activeNode ? activeNode.title : 'Đăng ký lần đầu';

    // Ẩn hiện banner cảnh báo xóa đăng ký toàn bộ
    if (currentProfile.type === 'Xóa đăng ký' && nodeTitle === 'Xóa đăng ký') {
        warningBanner.style.display = 'flex';
    } else {
        warningBanner.style.display = 'none';
    }

    const isService = ['Yêu cầu cung cấp bản sao', 'Yêu cầu cung cấp bản sao kèm thông báo', 'Yêu cầu cung cấp thông tin'].includes(currentProfile.type);

    if (isService) {
        tabControls.style.display = 'none';
        activeDetailTab = 'dichvu';
    } else {
        tabControls.style.display = 'flex';

        // Tab list tương thích SRS
        const hasExtraTab = (currentProfile.type === 'Xóa đăng ký' || currentProfile.type.includes('xử lý tài sản')) && (nodeTitle !== 'Đăng ký lần đầu');

        tabControls.innerHTML = `
            <div class="detail-tab ${activeDetailTab === 'nguoidangky' ? 'active' : ''}" data-tab="nguoidangky" onclick="switchDetailTab('nguoidangky')">Người đăng ký & Tham chiếu</div>
            <div class="detail-tab ${activeDetailTab === 'thongtinchung' ? 'active' : ''}" data-tab="thongtinchung" onclick="switchDetailTab('thongtinchung')">Thông tin chung & Nghĩa vụ</div>
            <div class="detail-tab ${activeDetailTab === 'cacben' ? 'active' : ''}" data-tab="cacben" onclick="switchDetailTab('cacben')">Các bên liên quan</div>
            <div class="detail-tab ${activeDetailTab === 'danhmactaisan' ? 'active' : ''}" data-tab="danhmactaisan" onclick="switchDetailTab('danhmactaisan')">Danh mục tài sản</div>
            ${hasExtraTab ? `<div class="detail-tab ${activeDetailTab === 'nghiepvukhac' ? 'active' : ''}" data-tab="nghiepvukhac" onclick="switchDetailTab('nghiepvukhac')">N nghiệp vụ lịch sử</div>` : ''}
        `;
    }

    renderTabContentsOnly();
}

// Render nội dung chính các khối thông tin tại Vùng 3
function renderTabContentsOnly() {
    const container = document.getElementById('tab-contents-container');
    container.innerHTML = '';

    const activeNode = currentProfile.timeline.find(t => t.id === activeLifecycleNode);
    const nodeTitle = activeNode ? activeNode.title : 'Đăng ký lần đầu';

    const isStrike = (currentProfile.type === 'Xóa đăng ký' && nodeTitle === 'Xóa đăng ký');
    const isDiff = (currentProfile.type === 'Đăng ký thay đổi' || currentProfile.type === 'Thay đổi thông báo xử lý tài sản') && (nodeTitle !== 'Đăng ký lần đầu');

    const styleStrike = isStrike ? 'text-decoration: line-through; color: var(--text-muted); background-color: #FEF2F2;' : '';

    // ==========================================
    // NHÓM DỊCH VỤ THÔNG TIN (Không chia Tab)
    // ==========================================
    if (activeDetailTab === 'dichvu') {
        container.innerHTML = `
            <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                <h3 class="section-title">NỘI DUNG YÊU CẦU CUNG CẤP DỊCH VỤ THÔNG TIN</h3>
                <div class="info-grid">
                    <div class="info-group">
                        <div class="info-label">Người yêu cầu cung cấp thông tin</div>
                        <div class="info-value"><b>${currentProfile.customer}</b></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Loại đối tượng</div>
                        <div class="info-value">Tổ chức/Cá nhân khác</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số giấy tờ định danh</div>
                        <div class="info-value">001092008472</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Địa chỉ liên hệ</div>
                        <div class="info-value">Số 8 Duy Tân, Cầu Giấy, Hà Nội, Việt Nam</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Email liên hệ</div>
                        <div class="info-value">khachhang@gmail.com</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số điện thoại</div>
                        <div class="info-value">0912345678</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số đăng ký lần đầu cần tra cứu/cung cấp</div>
                        <div class="info-value"><b>GDBD-2026-000812</b></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Mã PIN bảo mật hồ sơ gốc</div>
                        <div class="info-value"><code>847291</code></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số lượng bản sao yêu cầu</div>
                        <div class="info-value">02 Bản</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Yêu cầu đính kèm thông báo biến động</div>
                        <div class="info-value">${currentProfile.type === 'Yêu cầu cung cấp bản sao kèm thông báo' ? 'Có' : 'Không'}</div>
                    </div>
                    <div class="info-group" style="grid-column: span 2;">
                        <div class="info-label">Ghi chú yêu cầu</div>
                        <div class="info-value">Cung cấp bản sao để đối soát kiểm tra khoản vay thế chấp.</div>
                    </div>
                </div>
                <div style="background-color: #F1F5F9; border-radius: var(--border-radius-md); padding: 12px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: var(--primary-color);">LỆ PHÍ DỊCH VỤ CÔNG:</span>
                    <span style="font-weight: 700; font-size: 16px; color: var(--success-color);">
                        ${currentProfile.type === 'Yêu cầu cung cấp bản sao kèm thông báo' ? '50,000 VND' : '30,000 VND'} (ĐÃ THANH TOÁN QUA CỔNG DVC)
                    </span>
                </div>
            </div>
        `;
        return;
    }

    // ==========================================
    // NHÓM HỒ SƠ BIỆN PHÁP BẢO ĐẢM (Có Tab)
    // ==========================================

    // TAB 1: Người đăng ký & Tham chiếu
    if (activeDetailTab === 'nguoidangky') {
        const hideUnchanged = (showDiffOnly && isDiff);

        container.innerHTML = `
            <!-- Khối 1: Thông tin Người đăng ký -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; margin-bottom: 20px;">
                <h4 style="color: var(--primary-color); margin-top: 0;">Thông tin Người đăng ký (Chỉ đọc)</h4>
                <div class="info-grid" style="${styleStrike}">
                    <div class="info-group">
                        <div class="info-label">Họ và tên/Tên tổ chức</div>
                        <div class="info-value"><b>Công ty Cổ phần Đầu tư Minh Tâm</b></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Loại đối tượng</div>
                        <div class="info-value">Tổ chức trong nước</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số giấy tờ định danh</div>
                        <div class="info-value">0109200847</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Địa chỉ liên hệ</div>
                        <div class="info-value">Số 8 Duy Tân, Cầu Giấy, Hà Nội</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Email liên hệ</div>
                        <div class="info-value">minhtam@invest.vn</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số điện thoại</div>
                        <div class="info-value">0243987291</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Tài liệu chứng minh tư cách pháp nhân</div>
                        <div class="info-value"><a class="action-link" href="#" onclick="alert('Đang mở file Giấy phép ĐKKD...')">📄 Giấy đăng ký kinh doanh.pdf</a></div>
                    </div>
                </div>
            </div>

            <!-- Khối 2: Thông tin tham chiếu hồ sơ gốc -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; border-top: 1px solid var(--border-color); padding-top: 15px; display: ${nodeTitle === 'Đăng ký lần đầu' ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Thông tin tham chiếu hồ sơ gốc</h4>
                <div class="info-grid">
                    <div class="info-group">
                        <div class="info-label">Trường hợp đăng ký</div>
                        <div class="info-value">${currentProfile.type}</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Số đăng ký lần đầu (gốc)</div>
                        <div class="info-value"><span class="action-link" onclick="alert('Mở Popup xem chi tiết hồ sơ gốc...')">GDBD-2026-000812</span></div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Thời điểm đăng ký lần đầu</div>
                        <div class="info-value">10/01/2026 09:00:00</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Xem văn bản chứng nhận gốc</div>
                        <div class="info-value"><a class="action-link" href="#" onclick="alert('Mở file Giấy chứng nhận gốc...')">📄 GiayChungNhan_Goc.pdf</a></div>
                    </div>
                </div>
            </div>
        `;
    }

    // TAB 2: Thông tin chung & Nghĩa vụ
    else if (activeDetailTab === 'thongtinchung') {
        const isModifiedContract = (currentProfile.id === 'GDBD-2026-000813' && nodeTitle === 'Đăng ký thay đổi');
        const hideContract = showDiffOnly && !isModifiedContract;

        container.innerHTML = `
            <div class="info-grid" style="${styleStrike}">
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Cơ quan tiếp nhận</div>
                    <div class="info-value">Trung tâm Đăng ký giao dịch, tài sản tại Hà Nội</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Loại hình giao dịch</div>
                    <div class="info-value">${currentProfile.transactionType}</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Loại biện pháp / Hợp đồng</div>
                    <div class="info-value">${currentProfile.subtype}</div>
                </div>
                
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Thông tin Biên lai / Lệ phí</div>
                    <div class="info-value">
                        Số biên lai: <b>${currentProfile.receipt || 'Chưa thanh toán'}</b>
                        ${currentProfile.receipt && currentProfile.receipt !== 'Chưa thanh toán' && currentProfile.receipt !== 'Miễn phí' ? '<span class="badge badge-success" style="font-size: 11px; margin-left: 5px; padding: 2px 6px; text-transform: none;">Đã thu phí</span>' : (currentProfile.receipt === 'Miễn phí' ? '<span class="badge badge-success" style="font-size: 11px; margin-left: 5px; padding: 2px 6px; text-transform: none;">Miễn phí</span>' : '<span class="badge badge-warning" style="font-size: 11px; margin-left: 5px; padding: 2px 6px; text-transform: none;">Chờ thu phí</span>')}
                    </div>
                </div>
                
                <div class="info-group ${isModifiedContract ? 'field-changed' : ''}" style="${hideContract ? 'display: none;' : ''}">
                    <div class="info-label">
                        Số hợp đồng bảo đảm
                        ${isModifiedContract ? `<span class="history-icon" onmouseover="showHistoryPopover(event, 'Số hợp đồng cũ: HD-2026-MINHTAM')" onmouseout="hideHistoryPopover()">⏳</span>` : ''}
                    </div>
                    <div class="info-value">
                        ${isModifiedContract ? '<span class="text-diff-old">HD-2026-MINHTAM</span> <span class="text-diff-new">HD-2026-MINHTAM-Sua</span>' : 'HD-2026-MINHTAM'}
                    </div>
                </div>
                
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Ngày hiệu lực hợp đồng</div>
                    <div class="info-value">12/01/2026</div>
                </div>
                
                <div class="info-group ${isModifiedContract ? 'field-changed' : ''}" style="${hideContract ? 'display: none;' : ''}">
                    <div class="info-label">
                        Giá trị nghĩa vụ được bảo đảm
                        ${isModifiedContract ? `<span class="history-icon" onmouseover="showHistoryPopover(event, 'Giá trị cũ: 2,000,000,000 VND')" onmouseout="hideHistoryPopover()">⏳</span>` : ''}
                    </div>
                    <div class="info-value">
                        ${isModifiedContract ? '<span class="text-diff-old">2,000,000,000 VND</span> <span class="text-diff-new">3,500,000,000 VND</span>' : '2,000,000,000 VND'}
                    </div>
                </div>
                
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Quy mô Bên bảo đảm</div>
                    <div class="info-value">Doanh nghiệp vừa và nhỏ</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Chủ doanh nghiệp là nữ</div>
                    <div class="info-value">Không</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Đối tượng miễn phí lệ phí</div>
                    <div class="info-value">Không miễn phí</div>
                </div>
                <div class="info-group" style="${showDiffOnly ? 'display: none;' : ''}">
                    <div class="info-label">Tài liệu đính kèm miễn phí</div>
                    <div class="info-value">-</div>
                </div>
            </div>
        `;
    }

    // TAB 3: Các bên liên quan
    else if (activeDetailTab === 'cacben') {
        const isModifiedBBD = (currentProfile.type === 'Đăng ký thay đổi' && nodeTitle === 'Đăng ký thay đổi');
        const hideBBD = showDiffOnly && !isModifiedBBD;

        container.innerHTML = `
            <!-- Khối 4: Bên bảo đảm -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; margin-bottom: 25px; display: ${hideBBD ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Bảng danh sách Bên bảo đảm</h4>
                <table class="table" style="${styleStrike}">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Loại chủ thể</th>
                            <th>Số giấy tờ định danh</th>
                            <th>Tên bên bảo đảm</th>
                            <th>Địa chỉ liên hệ</th>
                            <th style="width: 150px;">Trạng thái biến động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="${isStrike ? 'row-removed' : ''}">
                            <td>1</td>
                            <td>Tổ chức trong nước</td>
                            <td>0109200847</td>
                            <td><b>Công ty Cổ phần Đầu tư Minh Tâm</b></td>
                            <td>Số 8 Duy Tân, Cầu Giấy, Hà Nội</td>
                            <td><span class="badge badge-muted">Đang bảo đảm</span></td>
                        </tr>
                        ${isModifiedBBD ? `
                        <tr class="row-added">
                            <td>2</td>
                            <td>Cá nhân trong nước</td>
                            <td>001092008472</td>
                            <td><b>Trần Thị B (Thành viên liên kết)</b></td>
                            <td>Hà Đông, Hà Nội, Việt Nam</td>
                            <td><span class="badge badge-success">Bổ sung mới</span></td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>

            <!-- Khối 5: Bên nhận bảo đảm -->
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; display: ${showDiffOnly ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Bảng danh sách Bên nhận bảo đảm</h4>
                <table class="table" style="${styleStrike}">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Loại chủ thể</th>
                            <th>Số giấy tờ định danh</th>
                            <th>Tên đơn vị nhận thế chấp</th>
                            <th>Địa chỉ liên hệ</th>
                            <th style="width: 150px;">Trạng thái biến động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="${isStrike ? 'row-removed' : ''}">
                            <td>1</td>
                            <td>Tổ chức tín dụng trong nước</td>
                            <td>0100230812</td>
                            <td><b>Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)</b></td>
                            <td>Tháp BIDV, Hoàn Kiếm, Hà Nội</td>
                            <td><span class="badge badge-muted">Đang bảo đảm</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    // TAB 4: Danh mục tài sản
    else if (activeDetailTab === 'danhmactaisan') {
        const isDisposal = (currentProfile.type === 'Thông báo xử lý tài sản' && nodeTitle === 'Thông báo xử lý tài sản');
        const isCancelDisposal = (currentProfile.type === 'Xóa thông báo xử lý tài sản' && nodeTitle === 'Xóa thông báo xử lý');
        const isModifiedAsset = (currentProfile.type === 'Đăng ký thay đổi' && nodeTitle === 'Đăng ký thay đổi');

        const hideAssetTable = showDiffOnly && !isModifiedAsset && !isDisposal && !isCancelDisposal;

        container.innerHTML = `
            <div class="card-section" style="box-shadow: none; border: none; padding: 0; display: ${hideAssetTable ? 'none' : 'block'};">
                <h4 style="color: var(--primary-color); margin-top: 0;">Bảng danh sách tài sản bảo đảm</h4>
                <table class="table" style="${styleStrike}">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Loại tài sản</th>
                            <th>Số máy / Số định danh</th>
                            <th>Số khung / Số đăng ký</th>
                            <th>Mô tả chi tiết tài sản</th>
                            <th style="width: 180px;">Trạng thái tài sản</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="${isStrike ? 'row-removed' : (isDisposal ? 'row-modified' : (isCancelDisposal ? 'row-added' : ''))}">
                            <td>1</td>
                            <td>Phương tiện giao thông</td>
                            <td>M-2918201</td>
                            <td><b>K-8472910398</b></td>
                            <td>Xe ô tô Toyota Camry màu sơn Đen, sản xuất năm 2024.</td>
                            <td>
                                ${isDisposal ? '<span class="badge badge-danger">Yêu cầu xử lý</span>' :
                isCancelDisposal ? '<span class="badge badge-success">Khôi phục bình thường</span>' :
                    isStrike ? '<span class="badge badge-danger">Giải chấp</span>' :
                        '<span class="badge badge-muted">Đang bảo đảm</span>'}
                            </td>
                        </tr>
                        <tr class="${isStrike ? 'row-removed' : ''}">
                            <td>2</td>
                            <td>Phương tiện giao thông</td>
                            <td>M-9918274</td>
                            <td><b>K-2819201928</b></td>
                            <td>Xe máy Honda SH màu sơn Trắng, sản xuất năm 2025.</td>
                            <td>
                                <span class="badge badge-muted">${isStrike ? 'Giải chấp' : 'Đang bảo đảm'}</span>
                            </td>
                        </tr>
                        ${isModifiedAsset ? `
                        <tr class="row-added">
                            <td>3</td>
                            <td>Phương tiện giao thông</td>
                            <td>M-2819201</td>
                            <td><b>K-8472910901</b></td>
                            <td>Xe ô tô Toyota Vios màu sơn Bạc, sản xuất năm 2025.</td>
                            <td><span class="badge badge-success">Bổ sung mới</span></td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
            ${hideAssetTable ? `<div style="text-align: center; color: var(--text-muted); padding: 30px;"><i>Không có biến động tài sản ở phiên bản này.</i></div>` : ''}
        `;
    }

    // TAB 5: Nghiệp vụ khác (Xóa đăng ký, Thông báo xử lý, Xóa thông báo...)
    else if (activeDetailTab === 'nghiepvukhac') {
        const isDisposal = currentProfile.type.includes('xử lý tài sản');
        const isCancelDisposal = currentProfile.type === 'Xóa thông báo xử lý tài sản';
        const isDereg = currentProfile.type === 'Xóa đăng ký';

        if (isDereg) {
            container.innerHTML = `
                <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                    <h3 class="section-title">THÔNG TIN XÓA ĐĂNG KÝ (GIẢI CHẤP)</h3>
                    <div class="info-grid">
                        <div class="info-group">
                            <div class="info-label">Ngày xóa đăng ký</div>
                            <div class="info-value">30/06/2026 08:30:00</div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Người yêu cầu xóa đăng ký</div>
                            <div class="info-value">Bà Trần Thị Lan</div>
                        </div>
                        <div class="info-group" style="grid-column: span 2;">
                            <div class="info-label">Căn cứ xóa đăng ký</div>
                            <div class="info-value">Khoản 1 Điều 20 Nghị định 99/2022/NĐ-CP - Đã hoàn thành toàn bộ nghĩa vụ trả nợ vay thế chấp tài sản.</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (isCancelDisposal) {
            container.innerHTML = `
                <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                    <h3 class="section-title">THÔNG TIN XÓA THÔNG BÁO XỬ LÝ TÀI SẢN</h3>
                    <div class="info-grid">
                        <div class="info-group">
                            <div class="info-label">Số văn bản xóa thông báo xử lý</div>
                            <div class="info-value"><b>XTBXL-2026-0081</b></div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Thông báo xử lý gốc liên kết</div>
                            <div class="info-value"><a class="action-link" href="#">TBXL-2026-00021</a></div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Ngày nộp yêu cầu xóa</div>
                            <div class="info-value">30/06/2026 17:00:00</div>
                        </div>
                        <div class="info-group" style="grid-column: span 2;">
                            <div class="info-label">Lý do xóa thông báo xử lý tài sản</div>
                            <div class="info-value">Bên bảo đảm đã thanh toán xong nợ quá hạn, hai bên thống nhất tiếp tục duy trì biện pháp bảo đảm.</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (isDisposal) {
            const isChange = currentProfile.type === 'Thay đổi thông báo xử lý tài sản';
            container.innerHTML = `
                <div class="card-section" style="box-shadow: none; border: none; padding: 0;">
                    <h3 class="section-title">THÔNG TIN NGHIỆP VỤ XỬ LÝ TÀI SẢN</h3>
                    <div class="info-grid">
                        <div class="info-group">
                            <div class="info-label">Mã số đăng ký liên kết</div>
                            <div class="info-value"><a class="action-link" href="#">GDBD-2026-000109</a></div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Bên thực hiện xử lý tài sản</div>
                            <div class="info-value">Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)</div>
                        </div>
                        <div class="info-group" style="grid-column: span 2;">
                            <div class="info-label">Lý do xử lý tài sản</div>
                            <div class="info-value">Bên bảo đảm vi phạm nghĩa vụ thanh toán quá hạn quá 90 ngày theo Hợp đồng tín dụng.</div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Địa điểm xử lý tài sản dự kiến</div>
                            <div class="info-value">
                                ${isChange ? '<span class="text-diff-old">Số 8 Duy Tân, Cầu Giấy, Hà Nội</span> <span class="text-diff-new">Số 12 Lạch Tray, Ngô Quyền, Hải Phòng</span>' : 'Số 8 Duy Tân, Cầu Giấy, Hà Nội'}
                            </div>
                        </div>
                        <div class="info-group">
                            <div class="info-label">Thời gian dự kiến xử lý</div>
                            <div class="info-value">15/07/2026 09:00:00</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Xử lý các nút nghiệp vụ trên màn hình Xem chi tiết
function handleDetailAction(action) {
    const opinionText = document.getElementById('officerOpinion').value.trim();
    const opinionArea = document.getElementById('officerOpinion');
    const opinionError = document.getElementById('opinionError');

    if (action === 'duyet') {
        alert(`Hồ sơ ${currentProfile.id} phê duyệt thành công! Chuyển sang danh mục Duyệt chờ ký.`);
        currentProfile.status = 'Duyệt chờ ký';
        currentProfile.statusClass = 'badge-info';

        // Ghi log xử lý nội bộ
        currentProfile.internalLogs.unshift({
            time: 'Vừa xong',
            user: 'Cán bộ nghiệp vụ TTĐK',
            action: 'Phê duyệt',
            comment: opinionText || 'Phê duyệt hồ sơ chuyển Lãnh đạo xem xét.'
        });

        saveProfiles();
        closeDetail();
    } else if (action === 'tuchoi') {
        // Hành động từ chối bắt buộc có ý kiến
        if (!opinionText) {
            opinionArea.classList.add('is-invalid');
            opinionError.classList.add('active');
            opinionArea.focus();
            return;
        }
        opinionArea.classList.remove('is-invalid');
        opinionError.classList.remove('active');

        // Mở popup preview thông báo từ chối
        openModalPreview('tuchoi', opinionText);

    } else if (action === 'trinhky') {
        openModalPreview('trinhky');
    } else if (action === 'huyduyet') {
        currentProfile.status = 'Chờ duyệt';
        currentProfile.statusClass = 'badge-warning';
        currentProfile.internalLogs.unshift({
            time: 'Vừa xong',
            user: 'Cán bộ nghiệp vụ TTĐK',
            action: 'Hủy duyệt',
            comment: opinionText || 'Hủy duyệt chuyển hồ sơ về danh mục Chờ duyệt.'
        });
        saveProfiles();
        closeDetail();
        showListToast('Đã hủy duyệt hồ sơ thành công', 'success');
    }
}

// ==========================================
// MODALS LOGIC
// ==========================================
let currentPreviewType = 'trinhky';

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Mở modal từ chối ở MH01
function openModalReject() {
    if (!singleRejectId) {
        const selected = getSelectedRows();
        if (selected.length === 0) {
            alert('Vui lòng chọn ít nhất một hồ sơ để thao tác!');
            return;
        }
    }
    document.getElementById('rejectReason').value = '';
    document.getElementById('rejectReason').classList.remove('is-invalid');
    document.getElementById('rejectError').classList.remove('active');
    openModal('modalReject');
}

// Submit từ chối từ modal nhập lý do (MH01)
function submitReject() {
    const reason = document.getElementById('rejectReason').value.trim();
    if (!reason) {
        document.getElementById('rejectReason').classList.add('is-invalid');
        document.getElementById('rejectError').classList.add('active');
        document.getElementById('rejectReason').focus();
        return;
    }
    closeModal('modalReject');

    if (singleRejectId) {
        const copyItem = officerCopyRequests.find(x => x.id === singleRejectId);
        if (copyItem) {
            copyItem.status = 'Bị từ chối';
            copyItem.rejectReason = reason;
            copyItem.rejectedBy = 'Nguyễn Văn Cán Bộ';
            copyItem.rejectedAt = new Date().toLocaleString('vi-VN');
            persistProfileForAction(copyItem);
            alert('Từ chối yêu cầu cung cấp bản sao thành công. [MSG-SUC-BS-004]');
            renderTable(true);
            return;
        }
        currentProfile = findProfileForAction(singleRejectId);
        openModalPreview('tuchoi', reason);
    } else {
        const selected = getSelectedRows();
        if (selected.length > 0) {
            currentProfile = findProfileForAction(selected[0]);
            openModalPreview('tuchoi', reason);
        }
    }
}

// Mở modal preview PDF Dự thảo
function openModalPreview(type, commentText = '') {
    currentPreviewType = type;
    const docNameSpan = document.getElementById('preview-pdf-doc-name');
    const titleSpan = document.getElementById('previewTitle');
    const btnConfirm = document.getElementById('btnConfirmPreview');
    const pdfView = document.getElementById('pdf-view-body');

    if (type === 'trinhky') {
        titleSpan.innerText = 'XEM TRƯỚC DỰ THẢO VĂN BẢN CHỨNG NHẬN';
        docNameSpan.innerText = 'DỰ THẢO VĂN BẢN PHÁP LÝ ĐỦ ĐIỀU KIỆN BAN HÀNH';
        btnConfirm.innerText = 'Xác nhận trình ký';

        pdfView.innerHTML = `
            <div style="text-align: center; font-weight: bold; margin-bottom: 20px; font-size: 16px;">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
                Độc lập - Tự do - Hạnh phúc<br>
                -------------------
            </div>
            <div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 20px;">
                VĂN BẢN CHỨNG NHẬN / THÔNG BÁO KẾT QUẢ GIAO DỊCH
            </div>
            <p><b>Số hồ sơ xử lý:</b> ${currentProfile ? currentProfile.id : 'GDBD-2026-000812'}</p>
            <p><b>Loại giao dịch:</b> ${currentProfile ? currentProfile.type : 'Đăng ký biện pháp bảo đảm'}</p>
            <p><b>Cơ quan cấp chứng nhận:</b> Trung tâm Đăng ký giao dịch, tài sản tại Hà Nội</p>
            <p><b>Bên bảo đảm:</b> ${currentProfile ? currentProfile.customer : 'Công ty Cổ phần Đầu tư Minh Tâm'}</p>
            <p><b>Bên nhận bảo đảm:</b> ${currentProfile ? currentProfile.mortgagee : 'Ngân hàng BIDV'}</p>
            <p><b>Thời điểm xác thực hệ thống:</b> 30/06/2026 18:00:00 (Thời điểm phê duyệt ký số của Lãnh đạo)</p>
            <div style="margin-top: 30px; border: 1px solid #ddd; padding: 10px; background-color: #fafafa;">
                <i>Hồ sơ đáp ứng đầy đủ điều kiện đăng ký theo quy định tại Nghị định 99/2022/NĐ-CP. Văn bản ở dạng chỉ đọc.</i>
            </div>
        `;
    } else {
        titleSpan.innerText = 'XEM TRƯỚC DỰ THẢO THÔNG BÁO TỪ CHỐI';
        docNameSpan.innerText = 'DỰ THẢO THÔNG BÁO TỪ CHỐI TIẾP NHẬN';
        btnConfirm.innerText = 'Xác nhận gửi Lãnh đạo ký từ chối';

        const reason = commentText || 'Hồ sơ thiếu tài liệu chứng minh tư cách pháp nhân hợp lệ.';
        pdfView.innerHTML = `
            <div style="text-align: center; font-weight: bold; margin-bottom: 20px; font-size: 16px;">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
                Độc lập - Tự do - Hạnh phúc<br>
                -------------------
            </div>
            <div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 20px;">
                THÔNG BÁO VỀ VIỆC TỪ CHỐI TIẾP NHẬN, GIẢI QUYẾT HỒ SƠ
            </div>
            <p><b>Kính gửi:</b> ${currentProfile ? currentProfile.customer : 'Khách hàng nộp hồ sơ'}</p>
            <p>Trung tâm Đăng ký giao dịch, tài sản tại Hà Nội xin thông báo từ chối giải quyết đối với yêu cầu đăng ký hồ sơ số: <b>${currentProfile ? currentProfile.id : 'BD-001'}</b>.</p>
            <p><b>LÝ DO TỪ CHỐI TIẾP NHẬN:</b> <span style="color: red; font-weight: 600;">${reason}</span></p>
            <p>Đề nghị quý khách hàng kiểm tra lại thông tin và lập hồ sơ mới hoàn toàn trên cổng dịch vụ công trực tuyến theo đúng quy định.</p>
        `;
    }

    openModal('modalPreview');
}

// Xác nhận trình ký/từ chối từ Preview PDF Modal
function confirmPreviewAction() {
    closeModal('modalPreview');
    const reason = document.getElementById('rejectReason')?.value.trim() || 'Từ chối giải quyết hồ sơ.';

    const statusVal = currentPreviewType === 'trinhky' ? 'Duyệt chờ ký' : 'Bị từ chối';
    const statusClassVal = currentPreviewType === 'trinhky' ? 'badge-info' : 'badge-danger';

    if (singleRejectId) {
        const p = findProfileForAction(singleRejectId);
        if (p) {
            p.status = statusVal;
            p.statusClass = statusClassVal;
            p.internalLogs = p.internalLogs || [];
            p.internalLogs.unshift({
                time: 'Vừa xong',
                user: 'Cán bộ nghiệp vụ TTĐK',
                action: currentPreviewType === 'trinhky' ? 'Trình ký' : 'Từ chối',
                comment: currentPreviewType === 'trinhky' ? 'Đã lập dự thảo Giấy chứng nhận gửi Lãnh đạo.' : `Đã lập dự thảo Văn bản từ chối: ${reason}`
            });
            persistProfileForAction(p);
        }
        singleRejectId = null;
    } else {
        const selected = getSelectedRows();
        if (selected.length > 0) {
            selected.forEach(id => {
                const p = findProfileForAction(id);
                if (p) {
                    p.status = statusVal;
                    p.statusClass = statusClassVal;
                    p.internalLogs = p.internalLogs || [];
                    p.internalLogs.unshift({
                        time: 'Vừa xong',
                        user: 'Cán bộ nghiệp vụ TTĐK',
                        action: currentPreviewType === 'trinhky' ? 'Trình ký' : 'Từ chối',
                        comment: currentPreviewType === 'trinhky' ? 'Đã lập dự thảo Giấy chứng nhận gửi Lãnh đạo.' : `Đã lập dự thảo Văn bản từ chối: ${reason}`
                    });
                    persistProfileForAction(p);
                }
            });
        } else if (currentProfile) {
            currentProfile.status = statusVal;
            currentProfile.statusClass = statusClassVal;
            currentProfile.internalLogs = currentProfile.internalLogs || [];
            currentProfile.internalLogs.unshift({
                time: 'Vừa xong',
                user: 'Cán bộ nghiệp vụ TTĐK',
                action: currentPreviewType === 'trinhky' ? 'Trình ký' : 'Từ chối',
                comment: currentPreviewType === 'trinhky' ? 'Đã lập dự thảo Giấy chứng nhận gửi Lãnh đạo.' : `Đã lập dự thảo Văn bản từ chối: ${reason}`
            });
            persistProfileForAction(currentProfile);
        }
    }

    saveProfiles();
    alert(currentPreviewType === 'trinhky' ? 'Hồ sơ đã được trình ký số thành công lên Lãnh đạo!' : 'Đã tạo và gửi dự thảo Thông báo từ chối thành công cho Lãnh đạo ký duyệt!');
    renderTable();
    closeDetail();
}

// Phê duyệt nhanh nhiều hồ sơ ở MH01
function approveRows() {
    const selected = getSelectedRows();
    if (selected.length === 0) {
        showListToast('Vui lòng chọn ít nhất một hồ sơ để thực hiện thao tác.', 'error'); // [MSG-ERR-DK-008]
        return;
    }

    const list = selected.map(id => findProfileForAction(id)).filter(Boolean);
    approveRegistrationProfiles(list);
    showListToast(`Phê duyệt hồ sơ thành công. Tổng số hồ sơ đã duyệt: ${list.length}.`, 'success');
}

function closeDetail() {
    document.getElementById('view-detail').classList.remove('active');
    document.getElementById('view-list').classList.add('active');

    const urlParams = new URLSearchParams(window.location.search);
    const viewMode = urlParams.get('view');
    const navTabs = document.querySelector('.nav-tabs');
    if (navTabs && viewMode !== 'dang_xu_ly' && viewMode !== 'da_xu_ly') {
        navTabs.style.display = 'flex';
    }

    currentProfile = null;
    updateTabBadges();
    renderTable();
}

// Khởi tạo chạy lần đầu
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initViewMode();
    });
} else {
    initViewMode();
}

function initViewMode() {
    // Làm mới dữ liệu giả lập đã lưu khi thay đổi cấu trúc dữ liệu mẫu
    if (localStorage.getItem('mock_profiles_version') !== 'v11') {
        localStorage.removeItem('custom_mock_profiles');
        localStorage.setItem('mock_profiles_version', 'v11');
    }
    const originalStaticProfiles = [...mockProfiles];
    const cachedProfiles = localStorage.getItem('custom_mock_profiles');
    if (cachedProfiles) {
        const customList = JSON.parse(cachedProfiles);
        const hasChannel = customList.some(p => p.id === 'GDBD-2026-000812' && p.channel);
        if (!hasChannel || customList.length < originalStaticProfiles.length) {
            const customIds = customList.map(c => c.id);
            const missing = originalStaticProfiles.filter(p => !customIds.includes(p.id));
            mockProfiles = [...customList, ...missing];
            // Overwrite missing channel data for GDBD-2026-000812 to GDBD-2026-000823
            mockProfiles.forEach(p => {
                const original = originalStaticProfiles.find(o => o.id === p.id);
                if (original && original.channel) {
                    p.channel = original.channel;
                }
            });
            localStorage.setItem('custom_mock_profiles', JSON.stringify(mockProfiles));
        } else {
            mockProfiles = customList;
        }
    } else {
        localStorage.setItem('custom_mock_profiles', JSON.stringify(mockProfiles));
    }

    ensurePaperDigitizeSamples();

    // Gán cán bộ xử lý cho mock data để mô phỏng
    mockProfiles.forEach((p, idx) => {
        p.handlingOfficer = "Nguyễn Văn Cán Bộ";
    });

    // Shift all mock data dates so that they fall within the current month/day (from 1st to today)
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentYear = today.getFullYear();

    const shiftDateToCurrentMonth = (dateStr, index) => {
        const d = parseDateString(dateStr);
        if (!d) return dateStr;
        const targetDay = (index % currentDay) + 1;
        const formattedDay = String(targetDay).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        return `${formattedDay}/${currentMonth}/${currentYear} ${hh}:${min}`;
    };

    mockProfiles.forEach((p, idx) => {
        p.date = shiftDateToCurrentMonth(p.date, idx);
        if (p.timeline) {
            p.timeline.forEach(t => {
                t.date = shiftDateToCurrentMonth(t.date, idx);
            });
        }
        if (p.internalLogs) {
            p.internalLogs.forEach(l => {
                if (l.time && l.time !== 'Vừa xong' && l.time.includes('/')) {
                    l.time = shiftDateToCurrentMonth(l.time, idx);
                }
            });
        }
    });

    localStorage.setItem('custom_mock_profiles', JSON.stringify(mockProfiles));
    const urlParams = new URLSearchParams(window.location.search);
    const viewMode = urlParams.get('view');

    const navTabs = document.querySelector('.nav-tabs');
    const headerTitle = document.querySelector('h1');
    const tableTitle = document.getElementById('list-table-title');
    // Màn Hồ sơ đang chờ ký / Hồ sơ đã xử lý: không cố định cột Thao tác bên phải bảng
    document.body.classList.toggle('no-sticky-actions', viewMode === 'dang_xu_ly' || viewMode === 'da_xu_ly');

    if (viewMode === 'dang_xu_ly') {
        if (navTabs) navTabs.style.display = 'none';
        if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - HỒ SƠ ĐANG CHỜ KÝ';
        if (tableTitle) tableTitle.innerText = 'Danh sách hồ sơ đang chờ ký';
        currentListTab = 'dang_xu_ly';
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'none';
    } else if (viewMode === 'da_xu_ly') {
        if (navTabs) navTabs.style.display = 'none';
        if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - HỒ SƠ ĐÃ XỬ LÝ';
        if (tableTitle) tableTitle.innerText = 'Danh sách hồ sơ đã xử lý';
        currentListTab = 'da_xu_ly';
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'none';
    } else if (viewMode === 'chonhaplieu') {
        if (navTabs) navTabs.style.display = 'flex';
        if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - HỒ SƠ CHỜ NHẬP LIỆU';
        if (tableTitle) tableTitle.innerText = 'Danh sách hồ sơ chờ nhập liệu';
        currentListTab = 'chonhaplieu';
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'none';
        if (navTabs) {
            navTabs.querySelectorAll('.nav-tab').forEach(t => {
                t.classList.toggle('active', (t.getAttribute('onclick') || '').includes('chonhaplieu'));
            });
        }
    } else {
        if (navTabs) navTabs.style.display = 'flex';
        if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - HỒ SƠ CHỜ XỬ LÝ';
        
        const savedTab = sessionStorage.getItem('activeListTab');
        if (savedTab && ['chonhaplieu', 'choduyet', 'duyet-choky', 'bitralai'].includes(savedTab)) {
            currentListTab = savedTab;
            if (navTabs) {
                navTabs.querySelectorAll('.nav-tab').forEach(t => {
                    const onclickAttr = t.getAttribute('onclick') || '';
                    if (onclickAttr.includes(`'${savedTab}'`) || onclickAttr.includes(`"${savedTab}"`)) {
                        navTabs.querySelectorAll('.nav-tab').forEach(x => x.classList.remove('active'));
                        t.classList.add('active');
                    }
                });
            }
        } else {
            currentListTab = 'choduyet';
        }
        if (tableTitle) {
            tableTitle.innerText = currentListTab === 'chonhaplieu' ? 'Danh sách hồ sơ chờ nhập liệu' : 'Bảng danh sách kết quả đối soát';
        }
        
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'none';
        
        if (currentListTab === 'choduyet') {
            document.getElementById('toolbar-choduyet').style.display = 'flex';
        } else if (currentListTab === 'duyet-choky') {
            document.getElementById('toolbar-duyet-choky').style.display = 'flex';
        } else if (currentListTab === 'choky' || currentListTab === 'bitralai') {
            document.getElementById('toolbar-choky').style.display = 'block';
        }
    }

    renderFilterPanel();
    updateTabBadges();
    renderTable();

    // Mở Xem chi tiết từ màn Tra cứu hồ sơ (?from=tra_cuu&openCctt=<id> hoặc &openCopy=<id>)
    const lookupCctt = urlParams.get('openCctt');
    const lookupCopy = urlParams.get('openCopy');
    if (urlParams.get('from') === 'tra_cuu' && (lookupCctt || lookupCopy)) {
        openLookupServiceDetail(lookupCctt ? 'cctt' : 'copy', lookupCctt || lookupCopy);
    }
}

// Xem chi tiết mở từ Tra cứu hồ sơ: chỉ đọc, chỉ hiển thị nút "Đóng" (quay lại Tra cứu hồ sơ, giữ nguyên Tab/bộ lọc/trang)
var lookupReadOnly = false;
function openLookupServiceDetail(kind, id) {
    lookupReadOnly = true;
    const list = kind === 'cctt' ? ccttOfficerRequests : officerCopyRequests;
    const item = list.find(x => x.id === id);
    if (!item) return;
    if (kind === 'cctt') openCcttOfficerDetail(id); else openCopyOfficerDetail(id);
    const navTabs = document.querySelector('.nav-tabs');
    if (navTabs) navTabs.style.display = 'none';
    const headerTitle = document.querySelector('h1');
    if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - TRA CỨU HỒ SƠ';
    // Hồ sơ đã qua bước tra cứu của Cán bộ: hiển thị luôn Kết quả tra cứu
    if (kind === 'cctt' && !['Chờ giải quyết', 'Chờ duyệt'].includes(item.status)) {
        document.getElementById('tab-contents-container').innerHTML = renderCcttOfficerDetailContent(item, true);
    }
    document.getElementById('detail-toolbar-buttons').innerHTML = `<button class="btn btn-outline-secondary" onclick="backToLookup()">Đóng</button>`;
}

function backToLookup() {
    window.location.href = sessionStorage.getItem('prevCanBoPage') || 'tra_cuu_thong_tin.html';
}

// Sắp xếp cột: lần 1 tăng dần, lần 2 giảm dần, lần 3 về sắp xếp mặc định; giữ nguyên bộ lọc và về Trang 1
function toggleSort(column) {
    if (currentSortColumn !== column) {
        currentSortColumn = column;
        currentSortOrder = 'asc';
    } else if (currentSortOrder === 'asc') {
        currentSortOrder = 'desc';
    } else {
        currentSortColumn = null;
        currentSortOrder = 'asc';
    }
    renderTable(true);
}

function getSortIcon(column) {
    if (currentSortColumn !== column) return '<i class="fa-solid fa-sort" style="font-size: 11px; margin-left: 4px; color: #CBD5E1;"></i>';
    return currentSortOrder === 'asc'
        ? '<i class="fa-solid fa-sort-up" style="font-size: 11px; margin-left: 4px; color: var(--secondary-color);"></i>'
        : '<i class="fa-solid fa-sort-down" style="font-size: 11px; margin-left: 4px; color: var(--secondary-color);"></i>';
}

// =============================================================
// Bổ sung UI xử lý Yêu cầu cung cấp thông tin trong Hồ sơ chờ duyệt
// =============================================================
const UC028_BASE = {
    renderFilterPanel,
    renderTable,
    switchListTab,
    closeDetail
};

let officerWorkType = sessionStorage.getItem('uc028OfficerWorkType') || 'registration';
let selectedCcttOfficerId = null;
let selectedOfficerCopyId = null;

// Ghi hồ sơ bản sao được chọn sang localStorage để màn Xem chi tiết (MH02) / Nhập liệu (MH03) đọc đúng dữ liệu bản ghi
function saveCopyItemForNavigation(item) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(COPY_STORAGE_KEY) || '[]'); } catch (err) { list = []; }
    const mapped = {
        id: item.id,
        paper: item.paperNo,
        date: item.registeredAt,
        customer: item.requester,
        requester: item.requester,
        requesterAddress: item.address,
        requesterType: item.customerId && item.customerId !== 'Vãng lai' ? 'Có tài khoản trực tuyến' : 'Khách hàng vãng lai',
        requesterAccount: item.customerId,
        type: item.requestType,
        copyType: item.copyType,
        copyQty: item.quantity || null,
        amount: item.fee,
        paymentStatus: item.feeStatus,
        paymentTime: item.paidAt,
        status: item.status,
        officer: item.receptionOfficer,
        originalRegistrationNo: item.registrationNo || '',
        returnReason: item.returnReason,
        returnedBy: item.returnedBy,
        returnedAt: item.returnedAt
    };
    const idx = list.findIndex(x => x.id === item.id);
    if (idx >= 0) list[idx] = { ...list[idx], ...mapped, status: item.status };
    else list.unshift(mapped);
    localStorage.setItem(COPY_STORAGE_KEY, JSON.stringify(list));
}

function persistCopyItemStatus(item) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(COPY_STORAGE_KEY) || '[]'); } catch (err) { list = []; }
    const idx = list.findIndex(x => x.id === item.id);
    const patch = { id: item.id, status: item.status, rejectReason: item.rejectReason, rejectFile: item.rejectFile, rejectedBy: item.rejectedBy, rejectedAt: item.rejectedAt };
    if (idx >= 0) list[idx] = { ...list[idx], ...patch };
    else list.unshift(patch);
    localStorage.setItem(COPY_STORAGE_KEY, JSON.stringify(list));
}

// Toast thông báo dùng cho danh sách (MSG dạng Toast theo SRS)
function showListToast(message, type = 'info') {
    let wrap = document.getElementById('list-toast-wrap');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'list-toast-wrap';
        wrap.style.cssText = 'position:fixed;top:20px;right:20px;z-index:3000;display:flex;flex-direction:column;gap:10px;max-width:420px';
        document.body.appendChild(wrap);
    }
    const colors = { success: ['#ECFDF5', '#059669', 'fa-circle-check'], error: ['#FEF2F2', '#DC2626', 'fa-circle-xmark'], warn: ['#FFFBEB', '#D97706', 'fa-triangle-exclamation'], info: ['#EFF6FF', '#2563EB', 'fa-circle-info'] };
    const [bg, fg, icon] = colors[type] || colors.info;
    const box = document.createElement('div');
    box.style.cssText = `background:${bg};border:1px solid ${fg};border-left:4px solid ${fg};color:#0f172a;padding:12px 14px;border-radius:6px;box-shadow:0 6px 18px rgba(15,23,42,.12);display:flex;gap:10px;align-items:flex-start;font-size:13.5px`;
    box.innerHTML = `<i class="fa-solid ${icon}" style="color:${fg};margin-top:2px"></i><div style="flex:1">${message}</div><span style="cursor:pointer;color:#64748b" onclick="this.parentElement.remove()">&times;</span>`;
    wrap.appendChild(box);
    setTimeout(() => box.remove(), 4500);
}

// Hiển thị thông báo được màn Nhập liệu chuyển về sau khi Duyệt chờ ký / Trình ký / Từ chối thành công
document.addEventListener('DOMContentLoaded', () => {
    const pending = sessionStorage.getItem('kthsPendingToast');
    if (!pending) return;
    sessionStorage.removeItem('kthsPendingToast');
    try {
        const t = JSON.parse(pending);
        showListToast(t.message, t.type || 'success');
    } catch (err) { /* bỏ qua */ }
});


function shouldShowOfficerWorkTabs() {
    return ['chonhaplieu', 'choduyet', 'duyet-choky', 'bitralai', 'dang_xu_ly', 'da_xu_ly'].includes(currentListTab);
}

function getOfficerCcttTargetStatuses() {
    // Tab Hồ sơ chờ nhập liệu chỉ hiển thị hồ sơ ở trạng thái "Chờ giải quyết" (hồ sơ "Bị trả lại" hiển thị tại Tab Hồ sơ Bị trả lại)
    if (currentListTab === 'chonhaplieu') return ['Chờ giải quyết'];
    if (currentListTab === 'duyet-choky') return ['Duyệt chờ ký'];
    if (currentListTab === 'bitralai') return ['Bị trả lại'];
    if (currentListTab === 'dang_xu_ly') return ['Chờ ký'];
    if (currentListTab === 'da_xu_ly') return ['Hoàn thành', 'Bị từ chối'];
    return ['Chờ duyệt'];
}

function getOfficerCcttListTitle() {
    if (currentListTab === 'chonhaplieu') return 'Danh sách hồ sơ chờ nhập liệu';
    if (currentListTab === 'duyet-choky') return 'Danh sách yêu cầu cung cấp thông tin duyệt chờ ký';
    if (currentListTab === 'bitralai') return 'Danh sách yêu cầu cung cấp thông tin bị trả lại';
    if (currentListTab === 'dang_xu_ly') return 'Danh sách yêu cầu cung cấp thông tin đang chờ ký';
    if (currentListTab === 'da_xu_ly') return 'Danh sách yêu cầu cung cấp thông tin đã xử lý';
    return 'Danh sách yêu cầu cung cấp thông tin chờ xử lý';
}

function syncOfficerWorkTabs() {
    const tabs = document.getElementById('work-type-tabs');
    if (!tabs) return;
    const visible = shouldShowOfficerWorkTabs();
    tabs.style.display = visible ? 'flex' : 'none';
    if (!visible) {
        officerWorkType = 'registration';
        sessionStorage.setItem('uc028OfficerWorkType', officerWorkType);
    }
    tabs.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.workType === officerWorkType);
    });
    updateTabBadges();
}

function switchOfficerWorkType(type, element) {
    officerWorkType = type;
    sessionStorage.setItem('uc028OfficerWorkType', officerWorkType);
    document.querySelectorAll('#work-type-tabs .nav-tab').forEach(t => t.classList.remove('active'));
    if (element) element.classList.add('active');
    renderFilterPanel();
    renderTable(true);
}

function syncOfficerRegistrationToolbar() {
    document.getElementById('toolbar-choduyet').style.display = 'none';
    document.getElementById('toolbar-duyet-choky').style.display = 'none';
    document.getElementById('toolbar-choky').style.display = 'none';
    if (officerWorkType !== 'registration') return;
    if (currentListTab === 'choduyet') {
        document.getElementById('toolbar-choduyet').style.display = 'flex';
    } else if (currentListTab === 'duyet-choky') {
        document.getElementById('toolbar-duyet-choky').style.display = 'flex';
    } else if (currentListTab === 'bitralai') {
        document.getElementById('toolbar-choky').style.display = 'block';
    }
}

function getOfficerRegistrationTitle() {
    if (currentListTab === 'duyet-choky') return 'Danh sách phiếu đăng ký duyệt chờ ký';
    if (currentListTab === 'bitralai') return 'Danh sách phiếu đăng ký bị trả lại';
    if (currentListTab === 'dang_xu_ly') return 'Danh sách phiếu đăng ký đang chờ ký';
    if (currentListTab === 'da_xu_ly') return 'Danh sách phiếu đăng ký đã xử lý';
    return currentListTab === 'chonhaplieu' ? 'Danh sách hồ sơ chờ nhập liệu' : 'Bảng danh sách kết quả đối soát';
}

// Danh sách hồ sơ chờ nhập liệu - Yêu cầu cung cấp bản sao: phân trang mặc định 20 bản ghi/trang
let copyPageSizeForced = false;
function applyCopyPageSizeDefault() {
    const isCopyInput = shouldShowOfficerWorkTabs() && officerWorkType === 'copy' && currentListTab === 'chonhaplieu';
    // Các danh sách đều mặc định 20 bản ghi/trang; chỉ đồng bộ lại giá trị hiển thị của ô chọn số dòng
    const select = document.getElementById('cb-pagesize');
    if (isCopyInput) copyPageSizeForced = true;
    if (select) select.value = String(pageSize);
}
renderFilterPanel = function () {
    syncOfficerWorkTabs();
    applyCopyPageSizeDefault();
    if (shouldShowOfficerWorkTabs() && officerWorkType === 'cctt' && !['chonhaplieu', 'bitralai'].includes(currentListTab)) {
        // MH01 - Danh sách hồ sơ chờ duyệt (SRS Xử lý yêu cầu cung cấp thông tin)
        const container = document.getElementById('filter-card-container');
        if (!container) return;
        const range = getCopyDefaultDateRange();
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label">Mã hồ sơ</label><input type="text" class="form-control" id="cctt-filter-id" placeholder="Nhập mã hồ sơ CCTT..."></div>
                <div class="form-group"><label class="form-label">Mã khách hàng</label><input type="text" class="form-control" id="cctt-filter-customer" placeholder="Nhập mã khách hàng..."></div>
                <div class="form-group">
                    <label class="form-label">Cán bộ xử lý</label>
                    <select class="form-select" id="cctt-filter-officer">
                        <option value="">Tất cả</option>
                        <option value="Nguyễn Văn Cán Bộ">Nguyễn Văn Cán Bộ</option>
                        <option value="Lê Anh Tuấn">Lê Anh Tuấn</option>
                        <option value="Trần Quốc Khánh">Trần Quốc Khánh</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Tiêu chí yêu cầu cung cấp thông tin</label>
                    <select class="form-select" id="cctt-filter-criteria">
                        <option value="">Tất cả</option>
                        <option value="Số đăng ký">Số đăng ký</option>
                        <option value="Bên bảo đảm">Bên bảo đảm</option>
                        <option value="Số khung">Số khung</option>
                    </select>
                </div>
                ${currentListTab === 'da_xu_ly' ? `
                <div class="form-group">
                    <label class="form-label">Trạng thái xử lý</label>
                    <select class="form-select" id="cctt-filter-status">
                        <option value="">Tất cả</option>
                        ${getOfficerCcttTargetStatuses().map(status => `<option value="${status}">${status}</option>`).join('')}
                    </select>
                </div>` : ''}
                <div class="form-group">
                    <label class="form-label">Từ ngày</label>
                    <div class="date-filter-wrap"><input type="text" class="form-control" id="cctt-filter-fromdate" placeholder="dd/mm/yyyy" value="${range.from}"><i class="fa-regular fa-calendar-days"></i></div>
                    <div id="cctt-filter-date-error" style="display:none;color:#DC2626;font-size:12px;margin-top:4px">Từ ngày không được lớn hơn Đến ngày</div>
                </div>
                <div class="form-group">
                    <label class="form-label">Đến ngày</label>
                    <div class="date-filter-wrap"><input type="text" class="form-control" id="cctt-filter-todate" placeholder="dd/mm/yyyy" value="${range.to}"><i class="fa-regular fa-calendar-days"></i></div>
                </div>
            </div>
            <div class="filter-action-row" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #F1F5F9; display: flex; justify-content: flex-end; align-items: center; gap: 8px;">
                <button class="btn btn-outline-secondary" onclick="renderFilterPanel(); renderTable(true)"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="searchCcttOfficerList()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
            </div>
        `;
        if (typeof flatpickr !== 'undefined') {
            flatpickr("#cctt-filter-fromdate", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#cctt-filter-todate", { dateFormat: "d/m/Y", allowInput: true });
        }
        return;
    }
    if (shouldShowOfficerWorkTabs() && officerWorkType === 'cctt') {
        // MH01 - Danh sách hồ sơ chờ nhập liệu (SRS Nhập liệu hồ sơ giấy Yêu cầu cung cấp thông tin)
        const container = document.getElementById('filter-card-container');
        if (!container) return;
        const range = getCopyDefaultDateRange();
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label">Mã hồ sơ</label><input type="text" class="form-control" id="ccttin-filter-id" placeholder="Nhập mã hồ sơ..."></div>
                <div class="form-group"><label class="form-label">Số đơn giấy</label><input type="text" class="form-control" id="ccttin-filter-paper" placeholder="Nhập số đơn giấy..."></div>
                <div class="form-group"><label class="form-label">Người yêu cầu</label><input type="text" class="form-control" id="ccttin-filter-requester" placeholder="Nhập tên người yêu cầu..."></div>
                <div class="form-group">
                    <label class="form-label">Tiêu chí tra cứu</label>
                    <select class="form-select" id="ccttin-filter-criteria"><option value="">Tất cả</option><option value="Số đăng ký">Số đăng ký</option><option value="Bên bảo đảm">Bên bảo đảm</option><option value="Số khung">Số khung</option></select>
                </div>
                <div class="form-group">
                    <label class="form-label">Trạng thái lệ phí</label>
                    <select class="form-select" id="ccttin-filter-fee"><option value="">Tất cả</option><option value="Đã thu">Đã thu</option><option value="Miễn phí">Miễn phí</option></select>
                </div>
                <div class="form-group"><label class="form-label">Cán bộ tiếp nhận</label><input type="text" class="form-control" id="ccttin-filter-officer" placeholder="Nhập tên cán bộ tiếp nhận..."></div>
                <div class="form-group">
                    <label class="form-label">Từ ngày tiếp nhận</label>
                    <div class="date-filter-wrap"><input type="text" class="form-control" id="ccttin-filter-fromdate" placeholder="dd/mm/yyyy" value="${range.from}"><i class="fa-regular fa-calendar-days"></i></div>
                    <div id="ccttin-filter-date-error" style="display:none;color:#DC2626;font-size:12px;margin-top:4px">Từ ngày không được lớn hơn Đến ngày</div>
                </div>
                <div class="form-group">
                    <label class="form-label">Đến ngày tiếp nhận</label>
                    <div class="date-filter-wrap"><input type="text" class="form-control" id="ccttin-filter-todate" placeholder="dd/mm/yyyy" value="${range.to}"><i class="fa-regular fa-calendar-days"></i></div>
                </div>
            </div>
            <div class="filter-action-row" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #F1F5F9; display: flex; justify-content: flex-end; align-items: center; gap: 8px;">
                <button class="btn btn-outline-secondary" onclick="renderFilterPanel(); renderTable(true)"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="searchCcttInputList()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
            </div>
        `;
        if (typeof flatpickr !== 'undefined') {
            flatpickr("#ccttin-filter-fromdate", { dateFormat: "d/m/Y", allowInput: true });
            flatpickr("#ccttin-filter-todate", { dateFormat: "d/m/Y", allowInput: true });
        }
        return;
    }    if (shouldShowOfficerWorkTabs() && officerWorkType === 'copy') {
        const container = document.getElementById('filter-card-container');
        if (container) {
            const today = new Date();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const defFromDate = `01/${month}/${year}`;
            const defToDate = `${String(today.getDate()).padStart(2, '0')}/${month}/${year}`;
            container.innerHTML = `
                ${renderCopyFilterFields(defFromDate, defToDate)}
                <div class="filter-action-row" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #F1F5F9; display: flex; justify-content: flex-end; align-items: center; gap: 8px;">
                    <button class="btn btn-outline-secondary" onclick="resetCopyOfficerFilters()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                    <button class="btn btn-primary" onclick="searchCopyOfficerList()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                </div>
            `;
            restoreCopyFilters();
            if (typeof flatpickr === 'function') {
                flatpickr("#copy-filter-fromdate", { dateFormat: "d/m/Y", allowInput: true });
                flatpickr("#copy-filter-todate", { dateFormat: "d/m/Y", allowInput: true });
            }
        }
        return;
    }

    UC028_BASE.renderFilterPanel();
    syncOfficerWorkTabs();
};

renderTable = function (resetPage = false) {
    syncOfficerWorkTabs();
    if (shouldShowOfficerWorkTabs() && officerWorkType === 'cctt') {
        renderCcttOfficerTable();
        return;
    }
    if (shouldShowOfficerWorkTabs() && officerWorkType === 'copy') {
        renderCopyOfficerTable();
        return;
    }
    syncOfficerRegistrationToolbar();
    UC028_BASE.renderTable(resetPage);
    const tableTitle = document.getElementById('list-table-title');
    if (tableTitle) tableTitle.innerText = getOfficerRegistrationTitle();
};

function renderCcttOfficerTable() {
    document.getElementById('toolbar-choduyet').style.display = 'none';
    document.getElementById('toolbar-duyet-choky').style.display = 'none';
    document.getElementById('toolbar-choky').style.display = 'none';
    const tableTitle = document.getElementById('list-table-title');
    if (tableTitle) tableTitle.innerText = getOfficerCcttListTitle();
    const thead = document.getElementById('table-headers-container');
    const tbody = document.getElementById('table-data');
    // Tab Hồ sơ chờ nhập liệu và Tab Hồ sơ Bị trả lại dùng bố cục MH01 - Danh sách hồ sơ chờ nhập liệu (SRS Nhập liệu CCTT)
    const isInputTab = ['chonhaplieu', 'bitralai'].includes(currentListTab);
    if (isInputTab) { renderCcttInputList(thead, tbody); return; }
    thead.innerHTML = isInputTab ? `
        <tr>
            <th style="width:50px;text-align:center">STT</th>
            <th style="width:170px">Mã hồ sơ</th>
            <th style="width:150px">Thời điểm đăng ký</th>
            <th style="width:130px">Mã khách hàng</th>
            <th style="width:220px">Người yêu cầu<br><span style="font-weight:500;color:var(--text-muted)">Địa chỉ</span></th>
            <th style="width:170px">Tiêu chí yêu cầu</th>
            <th style="width:260px">Dữ liệu Khách hàng đã nhập</th>
            <th style="width:130px">Nguồn tiếp nhận</th>
            <th style="width:120px">Trạng thái</th>
            <th style="width:150px">Cán bộ xử lý</th>
            <th class="col-actions" style="width:120px;min-width:120px;text-align:center">Thao tác</th>
        </tr>
    ` : `
        <tr>
            <th style="width:50px;text-align:center">STT</th>
            <th style="width:180px">Mã hồ sơ</th>
            <th style="width:130px">Mã khách hàng</th>
            <th style="width:200px">Người yêu cầu</th>
            <th style="width:220px">Địa chỉ</th>
            <th style="width:140px">Tiêu chí yêu cầu</th>
            <th style="width:220px">Dữ liệu đã nhập</th>
            <th style="width:130px">Nguồn tiếp nhận</th>
            <th style="width:150px">Thời điểm đăng ký</th>
            <th style="width:120px">Trạng thái</th>
            <th style="width:150px">Cán bộ xử lý</th>
            <th class="col-actions" style="width:120px;min-width:120px;text-align:center">Thao tác</th>
        </tr>
    `;
    const dossierId = document.getElementById('cctt-filter-id')?.value.toLowerCase().trim() || '';
    const customer = document.getElementById('cctt-filter-customer')?.value.toLowerCase().trim() || '';
    const source = document.getElementById('cctt-filter-source')?.value || '';
    const fromDateValue = document.getElementById('cctt-filter-fromdate')?.value || '';
    const toDateValue = document.getElementById('cctt-filter-todate')?.value || '';
    const officer = document.getElementById('cctt-filter-officer')?.value || '';
    const criteria = document.getElementById('cctt-filter-criteria')?.value || '';
    const status = document.getElementById('cctt-filter-status')?.value || '';
    const targetStatuses = getOfficerCcttTargetStatuses();
    const rows = ccttOfficerRequests.filter(x => {
        if (!targetStatuses.includes(x.status)) return false;
        if (dossierId && !x.id.toLowerCase().includes(dossierId)) return false;
        if (customer && !x.customerId.toLowerCase().includes(customer)) return false;
        if (source && !matchReceptionSource(x.source, source)) return false;
        if (officer && x.officer !== officer) return false;
        if (criteria && x.criteria !== criteria) return false;
        if (status && x.status !== status) return false;
        if (fromDateValue) {
            const rowDate = parseDateString(x.registeredAt);
            const fromDate = parseDateString(fromDateValue);
            if (rowDate && fromDate && rowDate < fromDate) return false;
        }
        if (toDateValue) {
            const rowDate = parseDateString(x.registeredAt);
            const toDate = parseDateString(toDateValue);
            if (rowDate && toDate) {
                toDate.setHours(23, 59, 59, 999);
                if (rowDate > toDate) return false;
            }
        }
        return true;
    });
    if (!isInputTab) {
        // Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên xử lý hồ sơ đến trước
        rows.sort((a, b) => (parseDateString(a.registeredAt) || 0) - (parseDateString(b.registeredAt) || 0));
    }
    const pageRows = applyPagination(rows, renderCcttOfficerTable);
    if (!pageRows.length) {
        // [MSG-INF-SYS-001]
        tbody.innerHTML = `<tr><td colspan="${isInputTab ? 11 : 12}" style="text-align:center;padding:30px;color:var(--text-muted);font-style:italic">Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</td></tr>`;
    } else if (!isInputTab) {
        tbody.innerHTML = pageRows.map((row, idx) => `
            <tr style="cursor:pointer" onclick="${currentListTab === 'choduyet' ? 'openCcttView' : 'openCcttApprovedView'}('${row.id}')">
                <td style="text-align:center">${paginationStartIndex + idx + 1}</td>
                <td><span class="action-link"><b>${row.id}</b></span></td>
                <td><code>${row.customerId || '-'}</code></td>
                <td><b>${row.requester}</b></td>
                <td>${row.address || '-'}</td>
                <td>${row.criteria}</td>
                <td>${row.inputData}</td>
                <td>${normalizeReceptionSource(row.source)}</td>
                <td>${row.registeredAt}</td>
                <td><span class="badge ${row.status === 'Hoàn thành' ? 'badge-success' : row.status === 'Bị từ chối' || row.status === 'Bị trả lại' ? 'badge-danger' : row.status === 'Chờ duyệt' ? 'badge-warning' : 'badge-info'}">${row.status}</span></td>
                <td>${row.officer || '-'}</td>
                <td class="col-actions" style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${getCcttRowActions(row)}</td>
            </tr>`).join('');
    } else {
        tbody.innerHTML = pageRows.map((row, idx) => {
            let actions = '';
            if (row.status === 'Chờ duyệt') {
                actions += `<button class="icon-btn reject" title="Từ chối" onclick="alert('Mở popup nhập lý do từ chối cho ${row.id}')"><i class="fa fa-times"></i></button>`;
            } else if (row.status === 'Bị trả lại') {
                // Cập nhật: mở màn Nhập liệu, điền sẵn dữ liệu hồ sơ và hiển thị Khối Thông tin trả lại
                actions += `<button class="icon-btn edit" title="Cập nhật" onclick="localStorage.setItem('selected_dossier_id','${row.id}'); window.location.href='nhap_lieu_ho_so_giay.html?id=${row.id}&type=cctt&returned=1'"><i class="fa-solid fa-pen-to-square"></i></button>`;
            }
            return `
            <tr style="cursor:pointer" onclick="openCcttOfficerDetail('${row.id}')">
                <td style="text-align:center">${paginationStartIndex + idx + 1}</td>
                <td><span class="action-link"><b>${row.id}</b></span></td>
                <td>${row.registeredAt}</td>
                <td><code>${row.customerId}</code></td>
                <td><b>${row.requester}</b><br><span style="color:var(--text-muted);font-size:12px">${row.address}</span></td>
                <td>${row.criteria}</td>
                <td>${row.inputData}</td>
                <td>${row.source}</td>
                <td><span class="badge ${row.status === 'Hoàn thành' ? 'badge-success' : row.status === 'Bị từ chối' || row.status === 'Bị trả lại' ? 'badge-danger' : 'badge-warning'}">${row.status}</span></td>
                <td>${row.officer}</td>
                <td class="col-actions" style="text-align:center" onclick="event.stopPropagation()">
                    ${actions}
                </td>
            </tr>
        `;
        }).join('');
    }
}

// =====================================================================
// NHẬP LIỆU HỒ SƠ GIẤY YÊU CẦU CUNG CẤP THÔNG TIN - MH01 Danh sách hồ sơ chờ nhập liệu (SRS 4.3.2.19.2)
// Dùng cho Tab Hồ sơ chờ nhập liệu ("Chờ giải quyết") và Tab Hồ sơ Bị trả lại ("Bị trả lại")
// =====================================================================
function searchCcttInputList() {
    const fromEl = document.getElementById('ccttin-filter-fromdate');
    const toEl = document.getElementById('ccttin-filter-todate');
    const errEl = document.getElementById('ccttin-filter-date-error');
    const from = parseDateString(fromEl?.value || ''), to = parseDateString(toEl?.value || '');
    const invalid = !!(from && to && from > to);
    if (fromEl) fromEl.classList.toggle('is-invalid', invalid);
    if (errEl) errEl.style.display = invalid ? 'block' : 'none';
    if (invalid) return; // TH1 [MSG-ERR-VAL-007]
    renderTable(true);
}

function getCcttInputCustomerCode(row) {
    return (row.requesterType || '').includes('trực tuyến') && row.customerId ? row.customerId : 'Vãng lai';
}

// Tạo hồ sơ: kiểm tra điều kiện nhập liệu trước khi mở MH03
function startCcttInputDigitize(id) {
    const row = getPaperCcttRows().find(x => x.id === id);
    if (!row) return;
    if (row.status !== 'Chờ giải quyết' || !['Đã thu', 'Miễn phí'].includes(row.paymentStatus || 'Đã thu')) {
        showListToast('Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.', 'error'); // [MSG-ERR-DK-005]
        return;
    }
    startDigitize(id);
}

function renderCcttInputList(thead, tbody) {
    const isReturned = currentListTab === 'bitralai';
    thead.innerHTML = `
        <tr>
            <th style="width:50px;text-align:center">STT</th>
            <th style="width:160px">Mã hồ sơ</th>
            <th style="width:110px">Số đơn giấy</th>
            <th style="width:220px">Người yêu cầu</th>
            <th style="width:130px">Mã khách hàng</th>
            <th style="width:150px">Ngày tiếp nhận</th>
            <th style="width:120px">Trạng thái lệ phí</th>
            <th style="width:130px;text-align:right">Số tiền đã thu (VNĐ)</th>
            <th style="width:130px">Trạng thái hồ sơ</th>
            <th style="width:160px">Cán bộ tiếp nhận</th>
            <th style="width:100px;text-align:center">Thao tác</th>
        </tr>`;
    const v = id => (document.getElementById(id)?.value || '').toLowerCase().trim();
    const fId = v('ccttin-filter-id'), fPaper = v('ccttin-filter-paper'), fReq = v('ccttin-filter-requester'), fOfficer = v('ccttin-filter-officer');
    const fCriteria = document.getElementById('ccttin-filter-criteria')?.value || '';
    const fFee = document.getElementById('ccttin-filter-fee')?.value || '';
    const from = parseDateString(document.getElementById('ccttin-filter-fromdate')?.value || '');
    const to = parseDateString(document.getElementById('ccttin-filter-todate')?.value || '');
    if (to) to.setHours(23, 59, 59, 999);
    const status = isReturned ? 'Bị trả lại' : 'Chờ giải quyết';
    const rows = getPaperCcttRows().filter(x => {
        if (x.status !== status) return false;
        if (!['Đã thu', 'Miễn phí'].includes(x.paymentStatus || 'Đã thu')) return false;
        if (fId && !x.id.toLowerCase().includes(fId)) return false;
        if (fPaper && !(x.paper || '').toLowerCase().includes(fPaper)) return false;
        if (fReq && !(x.customer || '').toLowerCase().includes(fReq)) return false;
        if (fOfficer && !(x.officer || '').toLowerCase().includes(fOfficer)) return false;
        if (fCriteria && (x.lookupCriteria || 'Số đăng ký') !== fCriteria) return false;
        if (fFee && (x.paymentStatus || 'Đã thu') !== fFee) return false;
        const d = parseDateString(x.date);
        if (from && d && d < from) return false;
        if (to && d && d > to) return false;
        return true;
    }).sort((a, b) => (parseDateString(b.date) || 0) - (parseDateString(a.date) || 0)); // Ngày tiếp nhận giảm dần

    const pageRows = applyPagination(rows, renderCcttOfficerTable);
    if (!pageRows.length) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:30px;color:var(--text-muted);font-style:italic">Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</td></tr>'; // [MSG-INF-SYS-001]
        return;
    }
    tbody.innerHTML = pageRows.map((row, idx) => {
        const free = row.paymentStatus === 'Miễn phí';
        const action = isReturned
            ? `<button class="icon-btn edit" title="Cập nhật" onclick="event.stopPropagation(); localStorage.setItem('selected_dossier_id','${row.id}'); window.location.href='nhap_lieu_ho_so_giay.html?id=${row.id}&type=cctt&returned=1'"><i class="fa-solid fa-pen-to-square"></i></button>`
            : `<button class="icon-btn edit" title="Tạo hồ sơ" onclick="event.stopPropagation(); startCcttInputDigitize('${row.id}')"><i class="fa-solid fa-file-circle-plus"></i></button>`;
        return `
            <tr style="cursor:pointer" onclick="${isReturned ? `openCcttReturnedView('${row.id}')` : `openPaperReadonly('${row.id}')`}">
                <td style="text-align:center">${paginationStartIndex + idx + 1}</td>
                <td><span class="action-link"><b>${row.id}</b></span></td>
                <td><code>${row.paper || '-'}</code></td>
                <td><b>${row.customer}</b></td>
                <td>${getCcttInputCustomerCode(row)}</td>
                <td>${row.date}</td>
                <td><span class="badge ${free ? 'badge-info' : 'badge-success'}">${row.paymentStatus || 'Đã thu'}</span></td>
                <td style="text-align:right">${free ? 'Miễn phí' : Number(row.amount || 0).toLocaleString('vi-VN')}</td>
                <td><span class="badge ${isReturned ? 'badge-danger' : 'badge-warning'}">${row.status}</span></td>
                <td>${row.officer || '-'}</td>
                <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${action}</td>
            </tr>`;
    }).join('');
}
function getPaperCcttRows() {
    const paperRows = loadPaperDigitizeProfiles()
        .filter(x => x.type === 'Yêu cầu cung cấp thông tin' && ['Đã thu','Miễn phí'].includes(x.paymentStatus || 'Đã thu'))
        .map(x => ({...x, source: 'Cán bộ nhập liệu'}));
    const hasReturned = paperRows.some(x => x.status === 'Bị trả lại');
    if (!hasReturned) {
        paperRows.push({
            id: 'HS-2026-000188',
            paper: 'PG-0188',
            date: (() => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `01/${p(d.getMonth() + 1)}/${d.getFullYear()} 11:25`; })(),
            lookupCriteria: 'Số đăng ký',
            requesterType: 'Có tài khoản trực tuyến',
            customerId: 'TK-ANPHU-088',
            officer: 'Nguyễn Thị Tiếp Nhận',
            customer: 'Công ty TNHH An Phú',
            requesterAddress: 'Số 88 Lê Văn Lương, phường Nhân Chính, TP Hà Nội',
            submitter: 'Vũ Minh Châu',
            type: 'Yêu cầu cung cấp thông tin',
            paymentStatus: 'Đã thu',
            amount: 30000,
            receipt: 'BL-2026-000188',
            status: 'Bị trả lại',
            handlingOfficer: 'Nguyễn Văn Cán Bộ',
            returnReason: 'Lãnh đạo yêu cầu rà soát lại tiêu chí tra cứu theo hồ sơ giấy.',
            source: 'Cán bộ nhập liệu'
        });
    }
    return paperRows;
}

function renderPaperCcttListTable(thead, tbody) {
    thead.innerHTML = `
        <tr>
            <th style="width:50px;text-align:center">STT</th>
            <th style="width:160px">Mã hồ sơ</th>
            <th style="width:110px">Số đơn giấy</th>
            <th style="width:130px">Mã khách hàng</th>
            <th style="width:220px">Người yêu cầu</th>
            <th style="width:180px">Người nộp hồ sơ</th>
            <th style="width:150px">Thời điểm tiếp nhận</th>
            <th style="width:120px">Trạng thái lệ phí</th>
            <th style="width:130px">Trạng thái hồ sơ</th>
            <th style="width:260px">Lý do trả lại gần nhất</th>
            <th style="width:150px">Cán bộ giải quyết</th>
            <th style="width:150px;text-align:center">Thao tác</th>
        </tr>
    `;
    const dossierId = document.getElementById('cctt-filter-id')?.value.toLowerCase().trim() || '';
    const customer = document.getElementById('cctt-filter-customer')?.value.toLowerCase().trim() || '';
    const source = document.getElementById('cctt-filter-source')?.value || '';
    const fromDateValue = document.getElementById('cctt-filter-fromdate')?.value || '';
    const toDateValue = document.getElementById('cctt-filter-todate')?.value || '';
    const officer = document.getElementById('cctt-filter-officer')?.value || '';
    const status = 'Chờ giải quyết';
    const rows = getPaperCcttRows().filter(row => {
        if (dossierId && !row.id.toLowerCase().includes(dossierId)) return false;
        if (customer && !'vãng lai'.includes(customer) && !'vang lai'.includes(customer)) return false;
        if (source && !matchReceptionSource(row.source, source)) return false;
        if (officer && (row.handlingOfficer || 'Nguyễn Văn Cán Bộ') !== officer) return false;
        if (status && row.status !== status) return false;
        if (fromDateValue) {
            const rowDate = parseDateString(row.date);
            const fromDate = parseDateString(fromDateValue);
            if (rowDate && fromDate && rowDate < fromDate) return false;
        }
        if (toDateValue) {
            const rowDate = parseDateString(row.date);
            const toDate = parseDateString(toDateValue);
            if (rowDate && toDate) {
                toDate.setHours(23, 59, 59, 999);
                if (rowDate > toDate) return false;
            }
        }
        return true;
    });
    if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="12" style="text-align:center;padding:30px;color:var(--text-muted)">Không có hồ sơ giấy Yêu cầu cung cấp thông tin phù hợp.</td></tr>';
    } else {
        tbody.innerHTML = rows.map((row, idx) => {
            const actionText = row.status === 'Bị trả lại' ? 'Sửa và trình ký lại' : 'Nhập liệu';
            const modeUrl = row.status === 'Bị trả lại' ? '&returned=1&type=cctt' : '&type=cctt';
            return `
                <tr style="cursor:pointer" onclick="startDigitize('${row.id}')">
                    <td style="text-align:center">${idx + 1}</td>
                    <td><span class="action-link"><b>${row.id}</b></span></td>
                    <td><code>${row.paper || '-'}</code></td>
                    <td><span class="badge badge-secondary badge-guest">Vãng lai</span></td>
                    <td><b>${row.customer}</b></td>
                    <td>${row.submitter || row.customer}</td>
                    <td>${row.date}</td>
                    <td><span class="badge ${row.paymentStatus === 'Miễn phí' ? 'badge-info' : 'badge-success'}">${row.paymentStatus || 'Đã thu'}</span></td>
                    <td><span class="badge ${row.status === 'Bị trả lại' ? 'badge-danger' : 'badge-warning'}">${row.status}</span></td>
                    <td>${row.status === 'Bị trả lại' ? (row.returnReason || 'Lãnh đạo trả lại để sửa dữ liệu tra cứu.') : '-'}</td>
                    <td>${row.handlingOfficer || 'Nguyễn Văn Cán Bộ'}</td>
                    <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">
                        <button class="icon-btn view" title="Xem chi tiết hồ sơ" onclick="openPaperReadonly('${row.id}')"><i class="fa-regular fa-eye"></i></button>
                        <button class="btn btn-primary" style="padding:4px 8px;font-size:12px;margin-left:4px" onclick="localStorage.setItem('selected_dossier_id','${row.id}'); window.location.href='nhap_lieu_ho_so_giay.html?id=${row.id}${modeUrl}'">${actionText}</button>
                    </td>
                </tr>`;
        }).join('');
    }
    document.getElementById('page-start-index').innerText = rows.length ? '1' : '0';
    document.getElementById('page-end-index').innerText = rows.length;
    document.getElementById('total-records').innerText = rows.length;
    document.getElementById('pagination-buttons').innerHTML = '<button class="btn btn-outline-secondary" disabled style="padding:4px 10px;font-size:12px">1</button>';
}

function resetPaperCcttFilters() {
    const status = document.getElementById('cctt-filter-status');
    if (status) status.value = 'Chờ giải quyết';
    ['cctt-filter-id','cctt-filter-customer','cctt-filter-source','cctt-filter-fromdate','cctt-filter-todate','cctt-filter-officer','cctt-filter-criteria'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    renderTable(true);
}

function getOfficerCopyTargetStatuses() {
    // Tab Hồ sơ chờ nhập liệu chỉ hiển thị hồ sơ ở trạng thái "Chờ giải quyết" (hồ sơ "Bị trả lại" hiển thị tại Tab Hồ sơ Bị trả lại)
    if (currentListTab === 'chonhaplieu') return ['Chờ giải quyết'];
    if (currentListTab === 'duyet-choky') return ['Duyệt chờ ký'];
    if (currentListTab === 'bitralai') return ['Bị trả lại'];
    if (currentListTab === 'dang_xu_ly') return ['Chờ ký'];
    // Hồ sơ đã xử lý: riêng Yêu cầu cung cấp bản sao hiển thị thêm "Đã duyệt - chờ trả kết quả"
    if (currentListTab === 'da_xu_ly') return ['Hoàn thành', 'Bị từ chối', 'Đã duyệt - chờ trả kết quả'];
    return ['Chờ duyệt'];
}

function getOfficerCopyListTitle() {
    if (currentListTab === 'chonhaplieu') return 'Danh sách hồ sơ chờ nhập liệu';
    if (currentListTab === 'duyet-choky') return 'Danh sách yêu cầu cung cấp bản sao duyệt chờ ký';
    if (currentListTab === 'bitralai') return 'Danh sách yêu cầu cung cấp bản sao bị trả lại';
    if (currentListTab === 'dang_xu_ly') return 'Danh sách yêu cầu cung cấp bản sao đang chờ ký';
    if (currentListTab === 'da_xu_ly') return 'Danh sách yêu cầu cung cấp bản sao đã xử lý';
    return 'Danh sách yêu cầu cung cấp bản sao';
}

function getCopyBadgeClass(status) {
    if (status === 'Hoàn thành' || status === 'Đã duyệt - chờ trả kết quả') return 'badge-success';
    if (status === 'Bị từ chối' || status === 'Bị trả lại') return 'badge-danger';
    if (status === 'Chờ ký' || status === 'Duyệt chờ ký') return 'badge-info';
    return 'badge-warning';
}

function renderCopyActionButton(label, onclick, enabled, styleClass = 'edit') {
    const iconMap = {
        'Nhập liệu': { icon: 'fa-solid fa-pen-to-square', className: 'edit', title: 'Nhập liệu hồ sơ' },
        'Cập nhật': { icon: 'fa-solid fa-pen-to-square', className: 'edit', title: 'Cập nhật' },
        'Xử lý hồ sơ': { icon: 'fa-solid fa-pen-to-square', className: 'edit', title: 'Xử lý hồ sơ' },
        'Xác nhận trả kết quả': { icon: 'fa-solid fa-check', className: 'sign', title: 'Xác nhận trả kết quả' }
    };
    const config = iconMap[label] || { icon: 'fa-solid fa-ellipsis', className: styleClass, title: label };
    const disabled = enabled ? '' : 'disabled style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"';
    const click = enabled ? `onclick="event.stopPropagation(); ${onclick}"` : '';
    return `<button class="icon-btn ${config.className}" title="${config.title}" ${click} ${disabled}><i class="${config.icon}"></i></button>`;
}

// Bộ lọc danh sách Yêu cầu cung cấp bản sao:
// - Tab Hồ sơ chờ nhập liệu: theo SRS Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao
// - Các Tab còn lại: theo MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt (SRS Xử lý yêu cầu cung cấp bản sao)
function renderCopyFilterFields(defFromDate, defToDate) {
    const dateFields = (fromLabel, toLabel) => `
        <div class="form-group">
            <label class="form-label">${fromLabel}</label>
            <div class="date-filter-wrap">
                <input type="text" class="form-control" id="copy-filter-fromdate" placeholder="dd/mm/yyyy" value="${defFromDate}">
                <i class="fa-solid fa-calendar-days"></i>
            </div>
            <div id="copy-filter-date-error" style="display:none;color:#DC2626;font-size:12px;margin-top:4px">Từ ngày không được lớn hơn Đến ngày</div>
        </div>
        <div class="form-group">
            <label class="form-label">${toLabel}</label>
            <div class="date-filter-wrap">
                <input type="text" class="form-control" id="copy-filter-todate" placeholder="dd/mm/yyyy" value="${defToDate}">
                <i class="fa-solid fa-calendar-days"></i>
            </div>
        </div>`;
    const typeField = `
        <div class="form-group">
            <label class="form-label">Loại cung cấp bản sao</label>
            <select class="form-select" id="copy-filter-type">
                <option value="">Tất cả</option>
                <option value="Bản sao điện tử">Bản sao điện tử</option>
                <option value="Bản sao giấy">Bản sao giấy</option>
            </select>
        </div>`;
    if (['chonhaplieu', 'bitralai'].includes(currentListTab)) {
        return `
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label">Mã hồ sơ</label><input type="text" class="form-control" id="copy-filter-id" placeholder="Nhập mã hồ sơ..."></div>
                <div class="form-group"><label class="form-label">Số đơn giấy</label><input type="text" class="form-control" id="copy-filter-paperno" placeholder="Nhập số đơn giấy..."></div>
                <div class="form-group"><label class="form-label">Người yêu cầu</label><input type="text" class="form-control" id="copy-filter-requester" placeholder="Nhập tên người yêu cầu..."></div>
                ${typeField}
                <div class="form-group"><label class="form-label">Cán bộ tiếp nhận</label><input type="text" class="form-control" id="copy-filter-officer" placeholder="Nhập tên cán bộ tiếp nhận..."></div>
                ${dateFields('Từ ngày tiếp nhận', 'Đến ngày tiếp nhận')}
            </div>`;
    }
    return `
        <div class="grid-4-cols">
            <div class="form-group"><label class="form-label">Mã hồ sơ</label><input type="text" class="form-control" id="copy-filter-id" placeholder="Nhập mã hồ sơ..."></div>
            <div class="form-group"><label class="form-label">Người yêu cầu</label><input type="text" class="form-control" id="copy-filter-requester" placeholder="Nhập tên người yêu cầu..."></div>
            <div class="form-group"><label class="form-label">Mã khách hàng</label><input type="text" class="form-control" id="copy-filter-customer" placeholder="Nhập mã khách hàng..."></div>
            <div class="form-group"><label class="form-label">Số đăng ký</label><input type="text" class="form-control" id="copy-filter-regno" placeholder="Nhập số đăng ký..."></div>
            ${typeField}
            ${currentListTab === 'da_xu_ly' ? `
            <div class="form-group">
                <label class="form-label">Trạng thái xử lý</label>
                <select class="form-select" id="copy-filter-status">
                    <option value="">Tất cả</option>
                    ${getOfficerCopyTargetStatuses().map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
            </div>` : ''}
            ${dateFields('Từ ngày', 'Đến ngày')}
        </div>`;
}
const COPY_FILTER_IDS = ['copy-filter-id', 'copy-filter-paperno', 'copy-filter-requester', 'copy-filter-type', 'copy-filter-officer', 'copy-filter-customer', 'copy-filter-regno', 'copy-filter-fromdate', 'copy-filter-todate', 'copy-filter-status'];

function getCopyDefaultDateRange() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return { from: `01/${month}/${year}`, to: `${String(today.getDate()).padStart(2, '0')}/${month}/${year}` };
}

// Lưu điều kiện tìm kiếm để khi Đóng màn Xem chi tiết (MH02) quay về vẫn giữ nguyên điều kiện tìm kiếm trước đó
function saveCopyFilters() {
    const values = {};
    COPY_FILTER_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) values[id] = el.value;
    });
    sessionStorage.setItem('copyOfficerFilters_' + currentListTab, JSON.stringify(values));
}

function restoreCopyFilters() {
    let values = null;
    try { values = JSON.parse(sessionStorage.getItem('copyOfficerFilters_' + currentListTab) || 'null'); } catch (err) { values = null; }
    if (!values) return;
    Object.keys(values).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = values[id];
    });
}

function clearCopyDateError() {
    const fromEl = document.getElementById('copy-filter-fromdate');
    const errEl = document.getElementById('copy-filter-date-error');
    if (fromEl) fromEl.classList.remove('is-invalid');
    if (errEl) errEl.style.display = 'none';
}

// Chức năng Tìm kiếm - MH01 Danh sách hồ sơ chờ nhập liệu (Yêu cầu cung cấp bản sao)
function searchCopyOfficerList() {
    const fromValue = document.getElementById('copy-filter-fromdate')?.value || '';
    const toValue = document.getElementById('copy-filter-todate')?.value || '';
    const fromDate = parseDateString(fromValue);
    const toDate = parseDateString(toValue);
    // TH1: Khoảng ngày không hợp lệ -> [MSG-ERR-VAL-007] Inline dưới ô nhập, không tìm kiếm
    if (fromDate && toDate && fromDate > toDate) {
        const fromEl = document.getElementById('copy-filter-fromdate');
        const errEl = document.getElementById('copy-filter-date-error');
        if (fromEl) fromEl.classList.add('is-invalid');
        if (errEl) errEl.style.display = 'block';
        return;
    }
    clearCopyDateError();
    saveCopyFilters();
    renderTable(true);
}

function resetCopyOfficerFilters() {
    ['copy-filter-id', 'copy-filter-paperno', 'copy-filter-requester', 'copy-filter-officer', 'copy-filter-customer', 'copy-filter-regno'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const type = document.getElementById('copy-filter-type');
    if (type) type.value = '';
    const status = document.getElementById('copy-filter-status');
    if (status) status.value = '';
    const range = getCopyDefaultDateRange();
    const fromEl = document.getElementById('copy-filter-fromdate');
    if (fromEl) fromEl.value = range.from;
    const toEl = document.getElementById('copy-filter-todate');
    if (toEl) toEl.value = range.to;
    clearCopyDateError();
    sessionStorage.removeItem('copyOfficerFilters_' + currentListTab);
    renderTable(true);
}

const COPY_MSG_ERR_DK_005 = 'Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.';

// Chức năng Tạo hồ sơ - kiểm tra điều kiện nhập liệu trước khi mở MH03
function startCopyDigitize(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    // TH1: Hồ sơ không còn đủ điều kiện nhập liệu -> [MSG-ERR-DK-005] dạng Toast
    if (item.status !== 'Chờ giải quyết' || !['Đã thu', 'Miễn phí'].includes(item.feeStatus)) {
        showListToast(COPY_MSG_ERR_DK_005, 'error');
        return;
    }
    saveCopyItemForNavigation(item);
    startDigitize(id);
}

// Chức năng Từ chối - MH01: mở popup Từ chối hồ sơ (Lý do từ chối + File căn cứ)
let copyRejectListId = null;

function openCopyRejectModal(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    if (!['chonhaplieu', 'bitralai'].includes(currentListTab)) {
        // MH04 - Popup Từ chối yêu cầu cung cấp bản sao (SRS Xử lý yêu cầu cung cấp bản sao)
        BsPopups.openReject(item, (it, msg) => finishCopyAction(it, msg), { allowed: currentListTab === 'duyet-choky' ? ['Duyệt chờ ký'] : ['Chờ duyệt'] });
        return;
    }
    // Hồ sơ giấy (Tab Hồ sơ chờ nhập liệu / Hồ sơ Bị trả lại): Từ chối theo Nhập liệu hồ sơ giấy Yêu cầu cung cấp bản sao
    // TH1: Hồ sơ không còn đủ điều kiện xử lý -> [MSG-ERR-DK-005] dạng Toast, không mở popup
    if (item.status !== (currentListTab === 'bitralai' ? 'Bị trả lại' : 'Chờ giải quyết')) {
        showListToast(COPY_MSG_ERR_DK_005, 'error');
        return;
    }
    copyRejectListId = id;
    const title = document.getElementById('copyRejectListTitle');
    if (title) title.innerText = `Từ chối hồ sơ: ${item.id}`;
    const reasonEl = document.getElementById('copyRejectListReason');
    if (reasonEl) {
        reasonEl.value = '';
        reasonEl.classList.remove('is-invalid');
    }
    const errEl = document.getElementById('copyRejectListReasonError');
    if (errEl) errEl.classList.remove('active');
    clearCopyRejectListFile();
    openModal('modalCopyRejectList');
}

function handleCopyRejectListFile(input) {
    const errEl = document.getElementById('copyRejectListFileError');
    if (errEl) errEl.classList.remove('active');
    if (!input || !input.files || !input.files[0]) return;
    const file = input.files[0];
    // TH3: File căn cứ không hợp lệ -> Inline dưới ô đính kèm theo [BR-FILE-010]
    if (!file.name.toLowerCase().endsWith('.pdf') || file.size > 20 * 1024 * 1024) {
        input.value = '';
        document.getElementById('copyRejectListFileName').innerText = 'Chưa có tệp nào được chọn';
        if (errEl) errEl.classList.add('active');
        return;
    }
    document.getElementById('copyRejectListFileName').innerText = `${file.name} (${(file.size / 1048576).toFixed(1)} MB)`;
    document.getElementById('copyRejectListFileClear').style.display = 'inline-block';
}

function clearCopyRejectListFile() {
    const input = document.getElementById('copyRejectListFile');
    if (input) input.value = '';
    const nameEl = document.getElementById('copyRejectListFileName');
    if (nameEl) nameEl.innerText = 'Chưa có tệp nào được chọn';
    const clearBtn = document.getElementById('copyRejectListFileClear');
    if (clearBtn) clearBtn.style.display = 'none';
    const errEl = document.getElementById('copyRejectListFileError');
    if (errEl) errEl.classList.remove('active');
}

function submitCopyRejectList() {
    const reasonEl = document.getElementById('copyRejectListReason');
    const reason = (reasonEl?.value || '').trim();
    // TH2: Bỏ trống Lý do từ chối -> tô viền đỏ, [MSG-ERR-VAL-001] Inline
    if (!reason) {
        reasonEl.classList.add('is-invalid');
        document.getElementById('copyRejectListReasonError').classList.add('active');
        reasonEl.focus();
        return;
    }
    if (document.getElementById('copyRejectListFileError')?.classList.contains('active')) return;
    // Hiển thị thông báo xác nhận [MSG-CFM-BS-001]
    closeModal('modalCopyRejectList');
    openModal('modalCopyRejectConfirm');
}

function cancelCopyRejectConfirm() {
    closeModal('modalCopyRejectConfirm');
    openModal('modalCopyRejectList');
}

function executeCopyRejectList() {
    closeModal('modalCopyRejectConfirm');
    const item = officerCopyRequests.find(x => x.id === copyRejectListId);
    if (!item) return;
    const fileName = document.getElementById('copyRejectListFile')?.files?.[0]?.name || '';
    item.status = 'Bị từ chối';
    item.rejectReason = document.getElementById('copyRejectListReason').value.trim();
    item.rejectFile = fileName;
    item.rejectedBy = 'Nguyễn Văn Cán Bộ';
    item.rejectedAt = new Date().toLocaleString('vi-VN');
    persistCopyItemStatus(item);
    copyRejectListId = null;
    if (document.getElementById('view-copy-process')?.classList.contains('active')) closeCopyProcess();
    showListToast('Từ chối yêu cầu cung cấp bản sao thành công.', 'success');
    renderTable(true);
}

function renderCopyOfficerTable() {
    document.getElementById('toolbar-choduyet').style.display = 'none';
    document.getElementById('toolbar-duyet-choky').style.display = 'none';
    document.getElementById('toolbar-choky').style.display = 'none';
    const tableTitle = document.getElementById('list-table-title');
    if (tableTitle) tableTitle.innerText = getOfficerCopyListTitle();
    const thead = document.getElementById('table-headers-container');
    const tbody = document.getElementById('table-data');

    // Tab Hồ sơ chờ nhập liệu và Tab Hồ sơ Bị trả lại dùng bố cục MH01 - Danh sách hồ sơ chờ nhập liệu
    const isChonhaplieu = ['chonhaplieu', 'bitralai'].includes(currentListTab);

    if (isChonhaplieu) {
        thead.innerHTML = `
            <tr>
                <th style="width:50px;text-align:center">STT</th>
                <th style="width:160px">Mã hồ sơ</th>
                <th style="width:110px">Số đơn giấy</th>
                <th style="width:200px">Người yêu cầu</th>
                <th style="width:200px">Loại yêu cầu</th>
                <th style="width:140px">Loại cung cấp bản sao</th>
                <th style="width:100px;text-align:center">Số lượng</th>
                <th style="width:150px">Ngày tiếp nhận</th>
                <th style="width:120px">Trạng thái lệ phí</th>
                <th style="width:130px;text-align:right">Số tiền đã thu (VNĐ)</th>
                <th style="width:130px">Trạng thái hồ sơ</th>
                <th style="width:160px">Cán bộ tiếp nhận</th>
                <th class="col-actions" style="width:120px;min-width:120px;text-align:center">Thao tác</th>
            </tr>
        `;
    } else {
        // MH01 - Danh sách yêu cầu cung cấp bản sao chờ duyệt (SRS Xử lý yêu cầu cung cấp bản sao)
        thead.innerHTML = `
            <tr>
                <th style="width:50px;text-align:center">STT</th>
                <th style="width:170px">Mã hồ sơ</th>
                <th style="width:150px">Thời điểm đăng ký</th>
                <th style="width:130px">Mã khách hàng</th>
                <th style="width:220px">Người yêu cầu</th>
                <th style="width:130px">Số đăng ký</th>
                <th style="width:140px">Loại cung cấp bản sao</th>
                <th style="width:110px;text-align:center">Số lượng bản sao</th>
                <th style="width:150px">Trạng thái</th>
                <th style="width:150px">Cán bộ xử lý</th>
                <th class="col-actions" style="width:120px;min-width:120px;text-align:center">Thao tác</th>
            </tr>
        `;
    }

    const dossierId = document.getElementById('copy-filter-id')?.value.toLowerCase().trim() || '';
    const paperNo = document.getElementById('copy-filter-paperno')?.value.toLowerCase().trim() || '';
    const requester = document.getElementById('copy-filter-requester')?.value.toLowerCase().trim() || '';
    const officer = document.getElementById('copy-filter-officer')?.value.toLowerCase().trim() || '';
    const copyType = document.getElementById('copy-filter-type')?.value || '';
    const status = document.getElementById('copy-filter-status')?.value || '';
    const customer = document.getElementById('copy-filter-customer')?.value.toLowerCase().trim() || '';
    const regNoFilter = document.getElementById('copy-filter-regno')?.value.toLowerCase().trim() || '';
    const fromDateValue = document.getElementById('copy-filter-fromdate')?.value || '';
    const toDateValue = document.getElementById('copy-filter-todate')?.value || '';
    const targetStatuses = getOfficerCopyTargetStatuses();

    const rows = officerCopyRequests.filter(x => {
        if (!targetStatuses.includes(x.status)) return false;
        // Danh sách chờ nhập liệu: chỉ hiển thị hồ sơ giấy có Trạng thái lệ phí "Đã thu" hoặc "Miễn phí"
        if (currentListTab === 'chonhaplieu' && (x.source !== 'Cán bộ nhập liệu' || !['Đã thu', 'Miễn phí'].includes(x.feeStatus))) return false;
        // Danh sách chờ duyệt: chỉ hồ sơ Yêu cầu cung cấp bản sao trực tuyến (hồ sơ giấy xử lý tại Nhập liệu hồ sơ giấy)
        if (currentListTab === 'choduyet' && x.source === 'Cán bộ nhập liệu') return false;
        if (dossierId && !x.id.toLowerCase().includes(dossierId)) return false;
        if (paperNo && !(`${x.paperNo || ''}`.toLowerCase().includes(paperNo))) return false;
        if (customer && !(`${x.customerId || ''}`.toLowerCase().includes(customer))) return false;
        if (regNoFilter && !(`${x.registrationNo || ''}`.toLowerCase().includes(regNoFilter))) return false;
        if (requester && !(`${x.requester || ''}`.toLowerCase().includes(requester))) return false;
        if (officer && !(`${x.receptionOfficer || x.officer || ''}`.toLowerCase().includes(officer))) return false;
        if (copyType && x.copyType !== copyType) return false;
        if (status && x.status !== status) return false;
        if (fromDateValue) {
            const rowDate = parseDateString(x.registeredAt);
            const fromDate = parseDateString(fromDateValue);
            if (rowDate && fromDate && rowDate < fromDate) return false;
        }
        if (toDateValue) {
            const rowDate = parseDateString(x.registeredAt);
            const toDate = parseDateString(toDateValue);
            if (rowDate && toDate) {
                toDate.setHours(23, 59, 59, 999);
                if (rowDate > toDate) return false;
            }
        }
        return true;
    });

    // Danh sách chờ nhập liệu: sắp xếp mặc định theo Ngày tiếp nhận giảm dần
    if (isChonhaplieu) {
        rows.sort((a, b) => (parseDateString(b.registeredAt) || 0) - (parseDateString(a.registeredAt) || 0));
    } else {
        // Sắp xếp mặc định theo Thời điểm đăng ký tăng dần để ưu tiên xử lý hồ sơ đến trước
        rows.sort((a, b) => (parseDateString(a.registeredAt) || 0) - (parseDateString(b.registeredAt) || 0));
    }

    const pageRows = applyPagination(rows, renderCopyOfficerTable);
    if (!pageRows.length) {
        const colSpan = isChonhaplieu ? 13 : 11;
        // [MSG-INF-SYS-001]
        tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;padding:30px;color:var(--text-muted);font-style:italic">Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</td></tr>`;
    } else {
        tbody.innerHTML = pageRows.map((row, idx) => {
            const isCopyPaper = row.copyType === 'Bản sao giấy';
            const qtyText = isCopyPaper ? (row.quantity ? `${row.quantity} bản` : (row.copyQty || '1 bản')) : '-';
            const feeText = row.feeStatus === 'Miễn phí' || row.fee === 0 ? 'Miễn phí' : Number(row.fee || 30000).toLocaleString('vi-VN');
            const feeBadge = `<span class="badge ${row.feeStatus === 'Miễn phí' ? 'badge-info' : 'badge-success'}">${row.feeStatus || 'Đã thu'}</span>`;
            const statusBadge = `<span class="badge ${getCopyBadgeClass(row.status)}">${row.status}</span>`;
            const copyTypeBadge = `<span class="badge ${row.copyType === 'Bản sao điện tử' ? 'badge-info' : 'badge-secondary'}">${row.copyType}</span>`;

            if (isChonhaplieu) {
                // Rule 3: Fixed-slot action column alignment (always 2 slots)
                const btnCreate = `<button class="icon-btn edit" title="Tạo hồ sơ" onclick="event.stopPropagation(); startCopyDigitize('${row.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                const btnReject = `<button class="icon-btn reject" title="Từ chối" onclick="event.stopPropagation(); openCopyRejectModal('${row.id}')"><i class="fa-solid fa-ban"></i></button>`;
                // Tab Hồ sơ Bị trả lại: Cột Thao tác gồm Cập nhật (mở màn Nhập liệu kèm Khối Thông tin trả lại)
                const btnUpdate = `<button class="icon-btn edit" title="Cập nhật" onclick="event.stopPropagation(); saveCopyItemForNavigation(officerCopyRequests.find(x => x.id === '${row.id}')); startDigitize('${row.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                const actions = currentListTab === 'bitralai' ? btnUpdate : btnCreate + btnReject;

                return `
                    <tr style="cursor:pointer" onclick="${currentListTab === 'bitralai' ? `openCopyProcess('${row.id}')` : `openCopyReadonly('${row.id}')`}">
                        <td style="text-align:center">${paginationStartIndex + idx + 1}</td>
                        <td><span class="action-link"><b>${row.id}</b></span></td>
                        <td><code>${row.paperNo || '-'}</code></td>
                        <td><b>${row.requester}</b></td>
                        <td>${row.requestType || row.type || 'Yêu cầu cung cấp bản sao văn bản chứng nhận'}</td>
                        <td>${copyTypeBadge}</td>
                        <td style="text-align:center">${qtyText}</td>
                        <td>${row.registeredAt}</td>
                        <td>${feeBadge}</td>
                        <td style="text-align:right">${feeText}</td>
                        <td>${statusBadge}</td>
                        <td>${row.receptionOfficer || row.officer || 'Nguyễn Thị Tiếp Nhận'}</td>
                        <td class="col-actions" style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${actions}</td>
                    </tr>
                `;
            } else {
                const actions = getCopyRowActions(row);
                const rowClick = currentListTab === 'choduyet' ? `openCopyView('${row.id}')` : `openCopyProcess('${row.id}')`;
                return `
                    <tr style="cursor:pointer" onclick="${rowClick}">
                        <td style="text-align:center">${paginationStartIndex + idx + 1}</td>
                        <td><span class="action-link"><b>${row.id}</b></span></td>
                        <td>${row.registeredAt}</td>
                        <td><code>${row.customerId || '-'}</code></td>
                        <td><b>${row.requester}</b></td>
                        <td><code>${row.registrationNo || '-'}</code></td>
                        <td>${copyTypeBadge}</td>
                        <td style="text-align:center">${isCopyPaper ? qtyText : '—'}</td>
                        <td>${statusBadge}</td>
                        <td>${row.officer || '-'}</td>
                        <td class="col-actions" style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${actions}</td>
                    </tr>
                `;
            }
        }).join('');
    }
}


// Thao tác trên dòng danh sách Yêu cầu cung cấp bản sao theo Tab trạng thái
function getCopyRowActions(row) {
    const btn = (cls, title, icon, fn) => `<button class="icon-btn ${cls}" title="${title}" onclick="event.stopPropagation(); ${fn}('${row.id}')"><i class="${icon}"></i></button>`;
    if (currentListTab === 'choduyet') {
        // MH01: Xử lý hồ sơ, Từ chối
        return btn('edit', 'Xử lý hồ sơ', 'fa-solid fa-pen-to-square', 'openCopyProcess') + btn('reject', 'Từ chối', 'fa-solid fa-ban', 'openCopyRejectModal');
    }
    if (currentListTab === 'duyet-choky') {
        return btn('sign', 'Trình ký', 'fa-solid fa-file-signature', 'openCopySignFromList') + btn('cancel-approve', 'Hủy duyệt', 'fa-solid fa-rotate-left', 'cancelCopyApproval') + btn('reject', 'Từ chối', 'fa-solid fa-ban', 'openCopyRejectModal');
    }
    if (currentListTab === 'dang_xu_ly') {
        return btn('view', 'Xem chi tiết', 'fa-solid fa-eye', 'openCopyProcess');
    }
    if (currentListTab === 'da_xu_ly') {
        const btnView = btn('view', 'Xem chi tiết', 'fa-solid fa-eye', 'openCopyProcess');
        if (row.copyType === 'Bản sao giấy' && row.status === 'Đã duyệt - chờ trả kết quả') {
            const btnReturn = btn('sign', 'Xác nhận trả kết quả', 'fa-solid fa-box-archive', 'confirmCopyPaperReturn');
            return btnView + btnReturn;
        } else {
            const disabledBtn = `<button class="icon-btn" title="Không có thao tác bổ sung" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-solid fa-box-archive"></i></button>`;
            return btnView + disabledBtn;
        }
    }
    return '';
}

// Hủy duyệt (Tab Hồ sơ duyệt chờ ký): chuyển về "Chờ duyệt", hiển thị [MSG-SUC-DK-KT-004]
function cancelCopyApproval(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item || item.status !== 'Duyệt chờ ký') { showListToast(COPY_MSG_ERR_DK_005, 'error'); return; }
    item.status = 'Chờ duyệt';
    persistCopyItem(item);
    renderTable();
    showListToast('Đã hủy duyệt hồ sơ thành công', 'success');
}

function persistCopyItem(item) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(COPY_STORAGE_KEY) || '[]'); } catch (err) { list = []; }
    const idx = list.findIndex(x => x.id === item.id);
    const patch = { id: item.id, status: item.status, officer: item.officer, handlingOfficer: item.officer, processedAt: item.processedAt, assignedLeader: item.assignedLeader, submittedAt: item.submittedAt, draftFile: item.draftFile, rejectReason: item.rejectReason, rejectedBy: item.rejectedBy, rejectedAt: item.rejectedAt, returnedResultAt: item.returnedResultAt };
    if (idx >= 0) list[idx] = { ...list[idx], ...patch }; else list.unshift(patch);
    localStorage.setItem(COPY_STORAGE_KEY, JSON.stringify(list));
}

function finishCopyAction(item, message) {
    persistCopyItem(item);
    closeCopyProcess();
    showListToast(message, 'success');
    renderTable();
}

// MH06 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao (Tab Hồ sơ chờ duyệt): nút Xử lý hồ sơ, Từ chối, Đóng
function openCopyView(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    selectedOfficerCopyId = id;
    let view = document.getElementById('view-copy-process');
    if (!view) {
        view = document.createElement('div');
        view.id = 'view-copy-process';
        view.className = 'view-section';
        document.getElementById('view-list').insertAdjacentElement('afterend', view);
    }
    const isPaper = item.copyType === 'Bản sao giấy';
    const fields = [
        ['Mã hồ sơ', `<b>${item.id}</b>`],
        ['Thời điểm đăng ký', item.registeredAt],
        ['Mã khách hàng', item.customerId || '-'],
        ['Người yêu cầu', item.requester],
        ['Số đăng ký', item.registrationNo || '-'],
        ['Loại cung cấp bản sao', item.copyType],
        ['Số lượng bản sao', isPaper ? `${String(item.quantity || 1).padStart(2, '0')} bản` : '—'],
        ['Trạng thái', `<span class="badge ${getCopyBadgeClass(item.status)}">${item.status}</span>`]
    ];
    const canProcess = item.status === 'Chờ duyệt';
    view.innerHTML = `
        <div class="card-section">
            <div class="section-title"><span><i class="fa-solid fa-circle-info"></i> Xem chi tiết yêu cầu cung cấp bản sao: ${item.id}</span></div>
            <div class="info-grid">${fields.map(([l, v]) => `<div class="info-group"><div class="info-label">${l}</div><div class="info-value">${v || '-'}</div></div>`).join('')}</div>
        </div>
        <div class="card-section" style="position:sticky;bottom:0;z-index:40;display:flex;justify-content:flex-end;gap:10px;box-shadow:0 -4px 12px rgba(15,23,42,.08)">
            ${canProcess ? `<button class="btn btn-primary" onclick="openCopyProcess('${item.id}')"><i class="fa-solid fa-pen-to-square"></i> Xử lý hồ sơ</button>
            <button class="btn btn-danger" onclick="openCopyRejectModal('${item.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : ''}
            <button class="btn btn-outline-secondary" onclick="closeCopyProcess()">Đóng</button>
        </div>`;
    document.getElementById('view-list').classList.remove('active');
    view.classList.add('active');
    window.scrollTo(0, 0);
}

// MH02 - Màn hình Xử lý hồ sơ yêu cầu cung cấp bản sao
function openCopyProcess(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    selectedOfficerCopyId = id;
    let view = document.getElementById('view-copy-process');
    if (!view) {
        view = document.createElement('div');
        view.id = 'view-copy-process';
        view.className = 'view-section';
        document.getElementById('view-list').insertAdjacentElement('afterend', view);
    }
    const isPaper = item.copyType === 'Bản sao giấy';
    // Nút Duyệt chờ ký / Trình ký chỉ hiển thị khi đã tra cứu được hồ sơ gốc theo Số đăng ký
    const hasOriginal = !!BsPopups.lookup(item.registrationNo);
    const canApprove = hasOriginal && item.status === 'Chờ duyệt';
    const canSign = hasOriginal && ['Chờ duyệt', 'Duyệt chờ ký'].includes(item.status);
    // Tab Hồ sơ duyệt chờ ký: bổ sung Hủy duyệt, Từ chối; nút Hủy bỏ đổi thành Đóng
    const isApprovedWaitSign = item.status === 'Duyệt chờ ký';
    // Tab Hồ sơ Bị trả lại: chỉ hiển thị Cập nhật, Đóng
    const isReturnedCopy = item.status === 'Bị trả lại';
    const isReadOnlyCopy = ['Chờ ký', 'Hoàn thành', 'Bị từ chối', 'Đã duyệt - chờ trả kết quả'].includes(item.status);
    const canReturnResult = item.status === 'Đã duyệt - chờ trả kết quả' && isPaper;

    // Thông tin từ chối / trả lại hiển thị bằng khối dùng chung renderReturnRejectBlocks (Khối II, III)
    let copyStatusBanner = '';
    if (item.status === 'Hoàn thành') {
        copyStatusBanner = `
            <div class="alert alert-success" style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:6px;padding:12px;margin-bottom:15px;color:#166534;">
                <b><i class="fa-solid fa-circle-check"></i> Kết quả xử lý:</b> Hồ sơ đã hoàn thành việc cấp bản sao văn bản chứng nhận đăng ký biện pháp bảo đảm.
            </div>
        `;
    } else if (item.status === 'Đã duyệt - chờ trả kết quả') {
        copyStatusBanner = `
            <div class="alert alert-info" style="background:#EFF6FF;border:1px solid #93C5FD;border-radius:6px;padding:12px;margin-bottom:15px;color:#1E40AF;">
                <b><i class="fa-solid fa-circle-info"></i> Trạng thái hồ sơ:</b> Đã duyệt bản sao giấy, chờ cán bộ thực hiện in ấn và trả kết quả cho người yêu cầu.
            </div>
        `;
    }

    view.innerHTML = `
        <div class="card-section">
            <div class="section-title"><span><i class="fa-solid fa-copy"></i> ${isReadOnlyCopy ? 'Xem chi tiết' : 'Xử lý'} hồ sơ yêu cầu cung cấp bản sao: ${item.id}</span><span class="badge ${getCopyBadgeClass(item.status)}">${item.status}</span></div>
            ${copyStatusBanner}
            <h3 class="section-title" style="font-size:15px">I. Thông tin yêu cầu cung cấp bản sao</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">Mã hồ sơ</div><div class="info-value"><b>${item.id}</b></div></div>
                <div class="info-group"><div class="info-label">Người yêu cầu</div><div class="info-value">${item.requester}</div></div>
                <div class="info-group"><div class="info-label">Số đăng ký</div><div class="info-value"><b>${item.registrationNo || '-'}</b></div></div>
                <div class="info-group"><div class="info-label">Loại cung cấp bản sao</div><div class="info-value"><span class="badge ${isPaper ? 'badge-secondary' : 'badge-info'}">${item.copyType}</span></div></div>
                ${isPaper ? `<div class="info-group"><div class="info-label">Số lượng bản sao</div><div class="info-value">${String(item.quantity || 1).padStart(2, '0')} bản</div></div>` : ''}
            </div>
            ${renderReturnRejectBlocks(item)}
            <h3 class="section-title" style="font-size:15px;margin-top:18px">IV. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng</h3>
            <div id="copy-process-structure">${BsPopups.renderStructure(item.registrationNo)}</div>
        </div>
        <div class="card-section" style="position:sticky;bottom:0;z-index:40;display:flex;justify-content:flex-end;gap:10px;box-shadow:0 -4px 12px rgba(15,23,42,.08)">
            ${canReturnResult ? `<button class="btn btn-primary" onclick="confirmCopyPaperReturn('${item.id}');closeCopyProcess()"><i class="fa-solid fa-box-archive"></i> Xác nhận trả kết quả</button>` : ''}
            ${isReturnedCopy ? `<button class="btn btn-primary" onclick="saveCopyItemForNavigation(officerCopyRequests.find(x => x.id === '${item.id}')); startDigitize('${item.id}')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật</button>
            <button class="btn btn-danger" onclick="openCopyRejectModal('${item.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : ''}
            <button class="btn btn-outline-secondary" onclick="closeCopyProcess()">${isApprovedWaitSign || isReturnedCopy || isReadOnlyCopy ? 'Đóng' : 'Hủy bỏ'}</button>
            ${canApprove ? `<button class="btn btn-success" onclick="approveCopyProcess('${item.id}')"><i class="fa-solid fa-check"></i> Duyệt chờ ký</button>` : ''}
            ${isApprovedWaitSign ? `<button class="btn btn-warning" style="background-color:#64748B;color:white" onclick="cancelCopyApproval('${item.id}');closeCopyProcess()"><i class="fa-solid fa-rotate-left"></i> Hủy duyệt</button>
            <button class="btn btn-danger" onclick="openCopyRejectModal('${item.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : ''}
            ${canSign ? `<button class="btn btn-primary" onclick="openCopySignFromList('${item.id}')"><i class="fa-solid fa-paper-plane"></i> Trình ký</button>` : ''}
        </div>`;
    document.getElementById('view-list').classList.remove('active');
    view.classList.add('active');
    window.scrollTo(0, 0);
}

// Hủy bỏ: đóng màn hình xử lý, giữ nguyên bộ lọc trước đó
function closeCopyProcess() {
    const view = document.getElementById('view-copy-process');
    if (view) view.classList.remove('active');
    document.getElementById('view-list').classList.add('active');
}

function approveCopyProcess(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    const d = new Date(), p = n => String(n).padStart(2, '0');
    item.status = 'Duyệt chờ ký';
    item.officer = 'Nguyễn Văn Cán Bộ';
    item.processedAt = `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    finishCopyAction(item, 'Duyệt yêu cầu cung cấp bản sao thành công.'); // [MSG-SUC-BS-001]
}

function openCopySignFromList(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    BsPopups.openSign(item, (it, msg) => { it.officer = 'Nguyễn Văn Cán Bộ'; finishCopyAction(it, msg); });
}

function openCopyOfficerDetail(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    selectedOfficerCopyId = id;
    selectedCcttOfficerId = null;
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-detail').classList.add('active');
    document.getElementById('detail-id-display').innerText = item.id;
    const status = document.getElementById('detail-status');
    status.className = `badge ${getCopyBadgeClass(item.status)}`;
    status.innerText = item.status;
    document.getElementById('toggle-diff-container').style.display = 'none';
    document.getElementById('lifecycle-timeline').innerHTML = `
        <li class="timeline-item active"><div class="timeline-title">Tiếp nhận yêu cầu</div><div class="timeline-date">${item.registeredAt}</div></li>
        <li class="timeline-item"><div class="timeline-title">${item.source === 'Cán bộ nhập liệu' ? 'Nhập liệu hồ sơ giấy' : 'Cán bộ xử lý'}</div><div class="timeline-date">${['Chờ duyệt', 'Chờ giải quyết', 'Bị trả lại'].includes(item.status) ? 'Đang xử lý' : 'Đã xử lý'}</div></li>
        <li class="timeline-item"><div class="timeline-title">Trình ký</div><div class="timeline-date">${item.status === 'Chờ ký' ? 'Đang chờ' : 'Chưa/đã qua bước'}</div></li>
    `;
    document.getElementById('internal-log-content').innerHTML = `<div><b>${item.registeredAt}</b> - Hệ thống ghi nhận yêu cầu cung cấp bản sao từ ${item.source}.</div>`;
    document.getElementById('tab-controls-container').style.display = 'none';
    document.getElementById('tab-contents-container').innerHTML = renderCopyOfficerDetailContent(item);
    const opinion = document.getElementById('group-officer-opinion');
    if (opinion) opinion.style.display = 'none';

    const canProcess = ['Chờ duyệt', 'Chờ giải quyết', 'Bị trả lại'].includes(item.status);
    const hasDraft = !!item.draftFile;
    const canExport = canProcess && item.copyType === 'Bản sao điện tử';
    const canSubmit = canProcess && (item.copyType === 'Bản sao giấy' || hasDraft);
    const canReject = canProcess;
    const canConfirmReturn = item.status === 'Đã duyệt - chờ trả kết quả' && item.copyType === 'Bản sao giấy';
    document.getElementById('detail-toolbar-buttons').innerHTML = `
        <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
        <button class="btn btn-outline-primary" onclick="viewCopyOriginalDossier('${item.id}')"><i class="fa-solid fa-up-right-from-square"></i> Xem hồ sơ gốc</button>
        <button class="btn btn-primary" onclick="exportCopyDraft('${item.id}')" ${canExport ? '' : 'disabled'}><i class="fa-solid fa-file-pdf"></i> Kết xuất bản sao điện tử</button>
        <button class="btn btn-success" onclick="submitCopyForSigning('${item.id}')" ${canSubmit ? '' : 'disabled'}><i class="fa-solid fa-paper-plane"></i> Trình ký</button>
        <button class="btn btn-danger" onclick="rejectCopyOfficer('${item.id}')" ${canReject ? '' : 'disabled'}><i class="fa-solid fa-xmark"></i> Từ chối</button>
        <button class="btn btn-success" onclick="confirmCopyPaperReturn('${item.id}')" ${canConfirmReturn ? '' : 'disabled'}><i class="fa-solid fa-check"></i> Xác nhận trả kết quả</button>
    `;
}

function renderCopyOfficerDetailContent(item) {
    const canEditPaper = !lookupReadOnly && item.source === 'Cán bộ nhập liệu' && ['Chờ giải quyết', 'Bị trả lại'].includes(item.status);
    const showQuantity = item.copyType === 'Bản sao giấy';
    const readonly = canEditPaper ? '' : 'readonly';
    const disabled = canEditPaper ? '' : 'disabled';
    return `
        <div class="card-section" style="box-shadow:none;border:none;padding:0">
            <h3 class="section-title">Thông tin tiếp nhận</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">Mã hồ sơ</div><div class="info-value"><b>${item.id}</b></div></div>
                <div class="info-group"><div class="info-label">Số đơn giấy</div><div class="info-value">${item.paperNo || '—'}</div></div>
                <div class="info-group"><div class="info-label">Nguồn tiếp nhận</div><div class="info-value">${item.source}</div></div>
                <div class="info-group"><div class="info-label">Thời điểm đăng ký</div><div class="info-value">${item.registeredAt}</div></div>
                <div class="info-group"><div class="info-label">Mã khách hàng</div><div class="info-value"><code>${item.customerId}</code></div></div>
                <div class="info-group"><div class="info-label">Người yêu cầu</div><div class="info-value">${item.requester}</div></div>
                <div class="info-group" style="grid-column:span 2"><div class="info-label">Địa chỉ</div><div class="info-value">${item.address}</div></div>
                <div class="info-group"><div class="info-label">Trạng thái lệ phí</div><div class="info-value">${item.paidAt}</div></div>
                <div class="info-group"><div class="info-label">Số tiền đã thu/thanh toán</div><div class="info-value">${item.fee.toLocaleString('vi-VN')} VNĐ</div></div>
            </div>

            ${renderReturnRejectBlocks(item)}

            <h3 class="section-title">Thông tin yêu cầu cung cấp bản sao</h3>
            <div class="info-grid">
                <div class="info-group">
                    <div class="info-label">Số đăng ký</div>
                    <div class="info-value" style="display:flex;gap:8px;align-items:center">
                        <input class="form-control" id="copy-detail-regno" value="${item.registrationNo || ''}" placeholder="Nhập số đăng ký hồ sơ gốc..." ${readonly}>
                        <button class="btn btn-outline-primary" onclick="viewCopyOriginalDossier('${item.id}')" type="button">Xem hồ sơ gốc</button>
                    </div>
                </div>
                <div class="info-group">
                    <div class="info-label">Loại cung cấp bản sao</div>
                    <select class="form-select" id="copy-detail-type" onchange="toggleCopyOfficerQty()" ${disabled}>
                        <option value="Bản sao điện tử" ${item.copyType === 'Bản sao điện tử' ? 'selected' : ''}>Bản sao điện tử</option>
                        <option value="Bản sao giấy" ${item.copyType === 'Bản sao giấy' ? 'selected' : ''}>Bản sao giấy</option>
                    </select>
                </div>
                <div class="info-group" id="copy-detail-qty-group" style="${showQuantity ? '' : 'display:none'}">
                    <div class="info-label">Số lượng bản sao</div>
                    <input class="form-control" id="copy-detail-qty" type="number" min="1" max="100" value="${item.quantity || ''}" ${readonly}>
                </div>
                <div class="info-group"><div class="info-label">Cán bộ xử lý</div><div class="info-value">${item.officer}</div></div>
            </div>

            <h3 class="section-title">Tệp bản sao điện tử dự thảo</h3>
            ${item.copyType === 'Bản sao điện tử' ? `
                <div style="padding:14px;border:1px solid var(--border-color);border-radius:6px;background:#F8FAFC">
                    ${item.draftFile ? `<b>File dự thảo:</b> <a class="action-link" href="#" onclick="alert('Mở xem trước ${item.draftFile}'); return false;">${item.draftFile}</a>` : 'Chưa kết xuất bản sao điện tử dự thảo.'}
                </div>
            ` : `
                <div style="padding:14px;border:1px solid var(--border-color);border-radius:6px;background:#F8FAFC">
                    Bản sao giấy không phát sinh file ký số tại bước Cán bộ. Sau khi Lãnh đạo ký duyệt, hồ sơ chuyển sang bước xác nhận trả kết quả giấy.
                </div>
            `}

            <h3 class="section-title">Hồ sơ đăng ký gốc tham chiếu</h3>
            <table class="table" style="min-width:900px">
                <thead><tr><th>Số đăng ký</th><th>Nghiệp vụ gốc</th><th>Bên bảo đảm</th><th>Bên nhận bảo đảm</th><th>Tài sản bảo đảm</th><th>Trạng thái hồ sơ gốc</th></tr></thead>
                <tbody>
                    <tr>
                        <td><code>${item.registrationNo || 'Chưa tra cứu'}</code></td>
                        <td>${item.originalCase || '—'}</td>
                        <td>${item.securedParty || '—'}</td>
                        <td>${item.mortgagee || '—'}</td>
                        <td>${item.asset || '—'}</td>
                        <td>${item.originalStatus ? `<span class="badge badge-success">${item.originalStatus}</span>` : '—'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function toggleCopyOfficerQty() {
    const type = document.getElementById('copy-detail-type')?.value;
    const group = document.getElementById('copy-detail-qty-group');
    if (group) group.style.display = type === 'Bản sao giấy' ? '' : 'none';
}

function syncCopyDetailInputs(item) {
    const canEditPaper = !lookupReadOnly && item.source === 'Cán bộ nhập liệu' && ['Chờ giải quyết', 'Bị trả lại'].includes(item.status);
    if (!canEditPaper) return true;
    const regNo = document.getElementById('copy-detail-regno')?.value.trim() || '';
    const type = document.getElementById('copy-detail-type')?.value || 'Bản sao giấy';
    const qty = parseInt(document.getElementById('copy-detail-qty')?.value, 10);
    if (!regNo) {
        alert('Vui lòng nhập Số đăng ký hồ sơ gốc.');
        return false;
    }
    if (type === 'Bản sao giấy' && (!qty || qty < 1 || qty > 100)) {
        alert('Số lượng bản sao giấy phải là số nguyên dương, tối đa 100.');
        return false;
    }
    item.registrationNo = regNo;
    item.copyType = type;
    item.quantity = type === 'Bản sao giấy' ? qty : null;
    item.copyQty = type === 'Bản sao giấy' ? `${qty} bản` : '—';
    item.originalCase = item.originalCase || 'Đăng ký lần đầu';
    item.originalStatus = 'Hoàn thành';
    item.securedParty = item.securedParty || item.requester;
    item.mortgagee = item.mortgagee || 'Ngân hàng TMCP FPT';
    item.asset = item.asset || 'Tài sản bảo đảm theo hồ sơ gốc';
    return true;
}

function viewCopyOriginalDossier(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    if (!syncCopyDetailInputs(item)) return;
    if (!item.registrationNo) {
        alert('Chưa có Số đăng ký để xem hồ sơ gốc.');
        return;
    }
    alert(`Mở popup xem hồ sơ gốc theo Số đăng ký ${item.registrationNo}. Dữ liệu được truy vấn trực tiếp tại thời điểm xem.`);
}

function exportCopyDraft(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item || item.copyType !== 'Bản sao điện tử') return;
    if (!syncCopyDetailInputs(item)) return;
    item.draftFile = `Ban_sao_dien_tu_du_thao_${item.id}.pdf`;
    alert(`Đã kết xuất bản sao điện tử dự thảo cho hồ sơ ${item.id}.`);
    openCopyOfficerDetail(id);
}

function submitCopyForSigning(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item || !['Chờ duyệt', 'Chờ giải quyết', 'Bị trả lại'].includes(item.status)) return;
    if (!syncCopyDetailInputs(item)) return;
    if (item.copyType === 'Bản sao điện tử' && !item.draftFile) {
        alert('Vui lòng kết xuất bản sao điện tử dự thảo trước khi trình ký.');
        return;
    }
    const leader = prompt('Nhập/Chọn Lãnh đạo ký duyệt', 'Nguyễn Văn Lãnh Đạo');
    if (!leader) return;
    item.status = 'Chờ ký';
    item.submittedLeader = leader;
    alert(`Đã trình ký yêu cầu cung cấp bản sao ${item.id}. Hồ sơ chuyển sang trạng thái Chờ ký.`);
    closeDetail();
    renderTable(true);
}

function rejectCopyOfficer(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item || !['Chờ duyệt', 'Chờ giải quyết', 'Bị trả lại'].includes(item.status)) return;
    const reason = prompt('Nhập lý do từ chối', 'Hồ sơ không đủ điều kiện cung cấp bản sao.');
    if (!reason) return;
    item.status = 'Bị từ chối';
    item.rejectReason = reason;
    alert(`Đã từ chối yêu cầu cung cấp bản sao ${item.id}.`);
    closeDetail();
    renderTable(true);
}

// Xác nhận trả kết quả bản sao giấy (MH05)
function confirmCopyPaperReturn(id) {
    const item = officerCopyRequests.find(x => x.id === id);
    if (!item) return;
    // TH1: Hồ sơ không còn ở trạng thái "Đã duyệt - chờ trả kết quả" -> [MSG-ERR-DK-005] dạng Toast
    if (item.status !== 'Đã duyệt - chờ trả kết quả' || item.copyType !== 'Bản sao giấy') {
        showListToast(COPY_MSG_ERR_DK_005, 'error');
        return;
    }
    BsPopups.openConfirmReturn(item, (it, msg) => finishCopyAction(it, msg));
}

function renderDevelopingTable(message) {
    document.getElementById('toolbar-choduyet').style.display = 'none';
    document.getElementById('toolbar-duyet-choky').style.display = 'none';
    document.getElementById('toolbar-choky').style.display = 'none';
    const tableTitle = document.getElementById('list-table-title');
    if (tableTitle) tableTitle.innerText = 'Danh sách yêu cầu cung cấp bản sao';
    document.getElementById('table-headers-container').innerHTML = '<tr><th>Trạng thái phát triển</th></tr>';
    document.getElementById('table-data').innerHTML = `<tr><td style="padding:30px;text-align:center;color:var(--text-muted);font-weight:700">${message}</td></tr>`;
    document.getElementById('page-start-index').innerText = '0';
    document.getElementById('page-end-index').innerText = '0';
    document.getElementById('total-records').innerText = '0';
    document.getElementById('pagination-buttons').innerHTML = '';
}

function openCcttOfficerDetail(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    selectedCcttOfficerId = id;
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-detail').classList.add('active');
    document.getElementById('detail-id-display').innerText = item.id;
    const status = document.getElementById('detail-status');
    status.className = 'badge badge-warning';
    status.innerText = item.status;
    document.getElementById('toggle-diff-container').style.display = 'none';
    document.getElementById('lifecycle-timeline').innerHTML = `
        <li class="timeline-item active"><div class="timeline-title">Tiếp nhận yêu cầu</div><div class="timeline-date">${item.registeredAt}</div></li>
        <li class="timeline-item"><div class="timeline-title">Cán bộ tra cứu</div><div class="timeline-date">Chưa thực hiện</div></li>
        <li class="timeline-item"><div class="timeline-title">Trình ký</div><div class="timeline-date">Chưa thực hiện</div></li>
    `;
    document.getElementById('internal-log-content').innerHTML = `
        <div><b>${item.registeredAt}</b> - Hệ thống ghi nhận hồ sơ từ ${item.source}.</div>
    `;
    document.getElementById('tab-controls-container').style.display = 'none';
    document.getElementById('tab-contents-container').innerHTML = renderCcttOfficerDetailContent(item, false);
    const opinion = document.getElementById('group-officer-opinion');
    if (opinion) opinion.style.display = 'none';
    document.getElementById('detail-toolbar-buttons').innerHTML = `
        <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
        <button class="btn btn-primary" onclick="renderCcttOfficerLookup(true)"><i class="fa-solid fa-magnifying-glass"></i> Tra cứu</button>
        <button class="btn btn-success" onclick="alert('Đã trình ký hồ sơ ${item.id}.')"><i class="fa-solid fa-paper-plane"></i> Trình ký</button>
        <button class="btn btn-danger" onclick="alert('Mở popup nhập lý do từ chối hồ sơ ${item.id}.')"><i class="fa-solid fa-xmark"></i> Từ chối</button>
    `;
}

function renderCcttOfficerDetailContent(item, searched) {
    const noData = item.resultType === 'noData';
    return `
        <div class="card-section" style="box-shadow:none;border:none;padding:0">
            <h3 class="section-title">Thông tin hồ sơ</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">Mã hồ sơ</div><div class="info-value"><b>${item.id}</b></div></div>
                <div class="info-group"><div class="info-label">Thời điểm đăng ký</div><div class="info-value">${item.registeredAt}</div></div>
                <div class="info-group"><div class="info-label">Mã khách hàng</div><div class="info-value"><code>${item.customerId}</code></div></div>
                <div class="info-group"><div class="info-label">Người yêu cầu</div><div class="info-value">${item.requester}</div></div>
                <div class="info-group" style="grid-column:span 2"><div class="info-label">Địa chỉ</div><div class="info-value">${item.address}</div></div>
                <div class="info-group"><div class="info-label">Nguồn tiếp nhận</div><div class="info-value">${item.source}</div></div>
                <div class="info-group"><div class="info-label">Trạng thái</div><div class="info-value"><span class="badge badge-warning">${item.status}</span></div></div>
                <div class="info-group"><div class="info-label">Cán bộ xử lý</div><div class="info-value">${item.officer}</div></div>
            </div>
            <h3 class="section-title">Tệp kết xuất kết quả cung cấp thông tin</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">File PDF dự thảo</div><div class="info-value">Mẫu số 10d - chưa ký</div></div>
                <div class="info-group"><div class="info-label">Phiên bản</div><div class="info-value">Dự thảo v1</div></div>
                ${lookupReadOnly ? '' : `<div class="info-group" style="grid-column:span 2"><button class="btn btn-primary" onclick="alert('Đã sinh file PDF dự thảo Mẫu số 10d và gắn vào hồ sơ ${item.id}.')"><i class="fa-solid fa-file-pdf"></i> Kết xuất PDF dự thảo</button></div>`}
            </div>
            <h3 class="section-title">Khu vực tra cứu</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">Tiêu chí yêu cầu</div><div class="info-value">${item.criteria}</div></div>
                <div class="info-group" style="grid-column:span 2"><div class="info-label">Dữ liệu Khách hàng đã nhập</div><div class="info-value">${item.inputData}</div></div>
            </div>
            <h3 class="section-title">Kết quả tra cứu</h3>
            <div id="cctt-officer-lookup-result">
                ${searched ? renderCcttOfficerResult(item, noData) : '<div class="info-group" style="padding:14px;background:#f8fafc;border:1px solid var(--border-color);border-radius:6px">Chưa thực hiện tra cứu.</div>'}
            </div>
        </div>
    `;
}

function renderCcttOfficerResult(item, noData) {
    if (noData) {
        return '<div style="padding:14px;border:1px solid #FCD34D;background:#FFFBEB;border-radius:6px;font-weight:700">Kết quả thông tin bạn tra cứu: Chưa được đăng ký hoặc hiệu lực của đăng ký đối với thông tin không còn.</div>';
    }
    return `
        <div style="padding:12px;border:1px solid var(--border-color);border-radius:6px;background:#fff">
            <div style="font-weight:700;color:var(--primary-color);margin-bottom:10px">VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký</div>
            <table class="table" style="min-width:980px">
                <thead><tr><th>STT</th><th>Số hồ sơ</th><th>Số đăng ký</th><th>Thời điểm đăng ký</th><th>Loại hình đăng ký</th><th>Bên bảo đảm</th><th>Bên nhận bảo đảm</th><th>Hiệu lực tại thời điểm tra cứu</th></tr></thead>
                <tbody><tr><td>1</td><td>HS-2026-000813</td><td>1505170802</td><td>02/07/2026 10:27</td><td>Đăng ký lần đầu</td><td>Công ty Cổ phần Xây dựng và Phát triển HTC</td><td>Ngân hàng TMCP Đầu tư và Phát triển Việt Nam</td><td>Có</td></tr></tbody>
            </table>
        </div>
    `;
}

function renderCcttOfficerLookup() {
    const item = ccttOfficerRequests.find(x => x.id === selectedCcttOfficerId);
    if (!item) return;
    document.getElementById('tab-contents-container').innerHTML = renderCcttOfficerDetailContent(item, true);
}

// =====================================================================
// XỬ LÝ YÊU CẦU CUNG CẤP THÔNG TIN (SRS 4.3.2.2) - MH01/MH02/MH03 + popup MH04/MH05
// =====================================================================
function searchCcttOfficerList() {
    const fromEl = document.getElementById('cctt-filter-fromdate');
    const toEl = document.getElementById('cctt-filter-todate');
    const errEl = document.getElementById('cctt-filter-date-error');
    const from = parseDateString(fromEl?.value || ''), to = parseDateString(toEl?.value || '');
    const invalid = !!(from && to && from > to);
    if (fromEl) fromEl.classList.toggle('is-invalid', invalid);
    if (errEl) errEl.style.display = invalid ? 'block' : 'none';
    if (invalid) return; // TH1 [MSG-ERR-VAL-007]
    renderTable(true);
}

function getCcttRowActions(row) {
    const btn = (cls, title, icon, fn) => `<button class="icon-btn ${cls}" title="${title}" onclick="event.stopPropagation(); ${fn}('${row.id}')"><i class="${icon}"></i></button>`;
    if (currentListTab === 'choduyet') return btn('edit', 'Xử lý hồ sơ', 'fa-solid fa-pen-to-square', 'openCcttProcess') + btn('reject', 'Từ chối', 'fa-solid fa-ban', 'openCcttReject');
    if (currentListTab === 'duyet-choky') return btn('sign', 'Trình ký', 'fa-solid fa-file-signature', 'openCcttSignFromList') + btn('cancel-approve', 'Hủy duyệt', 'fa-solid fa-rotate-left', 'cancelCcttApproval') + btn('reject', 'Từ chối', 'fa-solid fa-ban', 'openCcttReject');
    if (currentListTab === 'dang_xu_ly' || currentListTab === 'da_xu_ly') return btn('view', 'Xem chi tiết', 'fa-solid fa-eye', 'openCcttApprovedView');
    return '';
}

// Hủy duyệt (Tab Hồ sơ duyệt chờ ký): chuyển về "Chờ duyệt", hiển thị [MSG-SUC-DK-KT-004]
function cancelCcttApproval(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item || item.status !== 'Duyệt chờ ký') { showListToast(CcttPopups.MSG_ERR_STATUS, 'error'); return; }
    item.status = 'Chờ duyệt';
    item.cancelApprovedAt = new Date().toLocaleString('vi-VN');
    persistCcttItem(item);
    renderTable();
    showListToast('Đã hủy duyệt hồ sơ thành công', 'success');
}

function ensureCcttView() {
    let view = document.getElementById('view-cctt-process');
    if (!view) {
        view = document.createElement('div');
        view.id = 'view-cctt-process';
        view.className = 'view-section';
        document.getElementById('view-list').insertAdjacentElement('afterend', view);
    }
    return view;
}

function closeCcttView() {
    const view = document.getElementById('view-cctt-process');
    if (view) view.classList.remove('active');
    document.getElementById('view-list').classList.add('active');
    selectedCcttOfficerId = null;
}

function showCcttView(html) {
    const view = ensureCcttView();
    view.innerHTML = html;
    document.getElementById('view-list').classList.remove('active');
    view.classList.add('active');
    window.scrollTo(0, 0);
}

function persistCcttItem(item) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem('officer_cctt_requests') || '[]'); } catch (err) { list = []; }
    const idx = list.findIndex(x => x.id === item.id);
    const patch = { id: item.id, status: item.status, officer: item.officer, processedAt: item.processedAt, signLeader: item.signLeader, submittedAt: item.submittedAt, rejectReason: item.rejectReason, rejectedAt: item.rejectedAt, lookupResult: item.lookupResult };
    if (idx >= 0) list[idx] = { ...list[idx], ...patch }; else list.unshift(patch);
    localStorage.setItem('officer_cctt_requests', JSON.stringify(list));
}

function finishCcttAction(item, message) {
    persistCcttItem(item);
    closeCcttView();
    showListToast(message, 'success');
    renderTable();
}

// MH03 - Xem chi tiết hồ sơ yêu cầu cung cấp thông tin chờ xử lý
function openCcttView(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    selectedCcttOfficerId = id;
    const fields = [['Mã hồ sơ', item.id], ['Thời điểm đăng ký', item.registeredAt], ['Người yêu cầu', item.requester], ['Mã khách hàng', item.customerId || '-'], ['Nguồn tiếp nhận', normalizeReceptionSource(item.source)], ['Tiêu chí yêu cầu cung cấp thông tin', item.criteria], ...CcttPopups.getLookupFields(item)];
    const canProcess = item.status === 'Chờ duyệt';
    showCcttView(`
        <div class="card-section">
            <div class="section-title"><span><i class="fa-solid fa-circle-info"></i> Xem chi tiết hồ sơ yêu cầu cung cấp thông tin: ${item.id}</span><span class="badge badge-warning">${item.status}</span></div>
            <div class="info-grid">${fields.map(([l, v]) => `<div class="info-group"><div class="info-label">${l}</div><div class="info-value"><b>${v || '-'}</b></div></div>`).join('')}</div>
            ${renderReturnRejectBlocks(item)}
        </div>
        <div class="card-section" style="position:sticky;bottom:0;z-index:40;display:flex;justify-content:flex-end;gap:10px;box-shadow:0 -4px 12px rgba(15,23,42,.08)">
            ${canProcess ? `<button class="btn btn-primary" onclick="openCcttProcess('${item.id}')"><i class="fa-solid fa-pen-to-square"></i> Xử lý hồ sơ</button>
            <button class="btn btn-danger" onclick="openCcttReject('${item.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : ''}
            ${item.status === 'Duyệt chờ ký' ? `<button class="btn btn-primary" onclick="openCcttSignFromList('${item.id}')"><i class="fa-solid fa-file-signature"></i> Trình ký</button>
            <button class="btn btn-warning" style="background-color:#64748B;color:white" onclick="cancelCcttApproval('${item.id}');closeCcttView()"><i class="fa-solid fa-rotate-left"></i> Hủy duyệt</button>
            <button class="btn btn-danger" onclick="openCcttReject('${item.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : ''}
            <button class="btn btn-outline-secondary" onclick="closeCcttView()">Đóng</button>
        </div>`);
}

// Khối Thông tin trả lại / Thông tin từ chối dùng chung (SRS Kiểm tra và xử lý hồ sơ - MH04 khối II, III)
// - Thông tin trả lại: Accordion viền đỏ, mặc định mở rộng, chỉ hiển thị khi "Bị trả lại"; liệt kê các lần trả lại theo Thời điểm giảm dần
// - Thông tin từ chối: chỉ hiển thị khi "Bị từ chối"
function renderReturnRejectBlocks(item) {
    if (!item) return '';
    const esc = v => String(v ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    const kv = (l, v, red) => v ? `<div class="info-group"><div class="info-label">${l}</div><div class="info-value" style="${red ? 'color:#B91C1C;font-weight:700' : ''}">${v}</div></div>` : '';
    const fileLink = (name, label) => name ? `<a href="#" class="action-link" onclick="event.preventDefault(); alert('Mở xem file: ${esc(name)}')"><i class="fa-regular fa-file-pdf"></i> ${label || 'Xem file'}</a>` : '';
    // Hồ sơ đã từng bị trả lại và được trình ký lại: giữ lại vết lịch sử các lần trả lại (mặc định thu gọn)
    const hasReturnTrace = item.status !== 'Bị từ chối' && Array.isArray(item.returnHistory) && item.returnHistory.length;
    if (item.status === 'Bị trả lại' || hasReturnTrace) {
        const toTime = s => { const m = String(s || '').match(/(\d{2})\/(\d{2})\/(\d{4})\s*(\d{2})?:?(\d{2})?/); return m ? new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)).getTime() : 0; };
        const list = (item.returnHistory && item.returnHistory.length ? item.returnHistory : [{ reason: item.returnReason, by: item.returnedBy, at: item.returnedAt }])
            .map(r => ({ reason: r.reason || 'Lãnh đạo yêu cầu rà soát, cập nhật lại hồ sơ.', by: r.by || 'Nguyễn Văn Lãnh Đạo', at: r.at || '-', resubmittedAt: r.resubmittedAt || '' }))
            .sort((a, b) => toTime(b.at) - toTime(a.at));
        return `
            <details class="block-return-info" ${item.status === 'Bị trả lại' ? 'open' : ''} style="border:1px solid #FCA5A5;border-left:4px solid #DC2626;border-radius:8px;margin:12px 0;background:#fff">
                <summary style="cursor:pointer;padding:10px 14px;font-weight:700;color:#B91C1C;background:#FEF2F2;list-style:none;display:flex;align-items:center;gap:8px">
                    <i class="fa-solid fa-rotate-left"></i> Thông tin trả lại <span class="badge badge-danger" style="margin-left:6px">${list.length} lần</span>
                </summary>
                ${list.map((r, i) => `<div class="info-grid" style="padding:10px 14px;${i ? 'border-top:1px dashed #FCA5A5' : ''}">
                    ${kv('Lý do trả lại', esc(r.reason), true)}${kv('Lãnh đạo trả lại', esc(r.by))}${kv('Thời điểm trả lại', esc(r.at))}${kv('Thời điểm trình ký lại', esc(r.resubmittedAt))}
                </div>`).join('')}
            </details>`;
    }
    if (item.status === 'Bị từ chối') {
        return `
            <div class="block-reject-info" style="border:1px solid #FCA5A5;border-left:4px solid #DC2626;border-radius:8px;margin:12px 0;background:#fff">
                <div style="padding:10px 14px;font-weight:700;color:#B91C1C;background:#FEF2F2"><i class="fa-solid fa-ban"></i> Thông tin từ chối</div>
                <div class="info-grid" style="padding:10px 14px">
                    ${kv('Lý do từ chối', esc(item.rejectReason || 'Không đủ điều kiện giải quyết theo quy định.'), true)}
                    ${kv('Người từ chối', esc(item.rejectedBy || item.officer || 'Nguyễn Văn Cán Bộ'))}
                    ${kv('Thời điểm từ chối', esc(item.rejectedAt || '-'))}
                    ${kv('Lãnh đạo ký văn bản từ chối', esc(item.rejectLeader || item.signLeader || ''))}
                    ${kv('Văn bản từ chối đã ký', fileLink(item.rejectDraftFile || item.rejectNoticeFile, 'Xem file'))}
                    ${kv('Tài liệu đính kèm lý do từ chối', fileLink(item.rejectFile, esc(item.rejectFile)))}
                </div>
            </div>`;
    }
    return '';
}

// Khối I. Thông tin chung (Accordion, mặc định thu gọn): Mã hồ sơ, Mã khách hàng, Người yêu cầu, Địa chỉ, Thời điểm đăng ký, Trạng thái
function renderCcttGeneralInfo(item) {
    // Địa chỉ đầy đủ: Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia
    // Hồ sơ giấy (Tab Hồ sơ Bị trả lại) dùng trường customer / requesterAddress / date
    let addr = [item.addressDetail, item.ward, item.province, item.country].filter(Boolean).join(', ') || item.address || item.requesterAddress || '-';
    if (addr !== '-' && !/Việt Nam|Viet Nam/i.test(addr)) addr += ', Việt Nam';
    const badge = item.status === 'Hoàn thành' ? 'badge-success' : (item.status === 'Bị từ chối' || item.status === 'Bị trả lại' ? 'badge-danger' : (item.status === 'Chờ duyệt' || item.status === 'Chờ ký' ? 'badge-warning' : 'badge-info'));
    const fields = [['Mã hồ sơ', `<b>${item.id}</b>`], ['Mã khách hàng', item.customerId || '-'], ['Người yêu cầu', item.requester || item.customer || '-'], ['Địa chỉ', addr], ['Thời điểm đăng ký', item.registeredAt || item.date || '-'], ['Trạng thái', `<span class="badge ${badge}">${item.status}</span>`]];
    return `
            <details class="cctt-general-info" style="border:1px solid var(--border-color);border-radius:8px;margin-bottom:14px">
                <style>
                    details.cctt-general-info[open] .cgi-collapsed-only { display: none; }
                    details.cctt-general-info .cgi-chevron { transition: transform .2s; }
                    details.cctt-general-info[open] .cgi-chevron { transform: rotate(90deg); }
                </style>
                <summary style="cursor:pointer;padding:10px 14px;font-weight:700;color:var(--primary-color);display:flex;align-items:center;gap:10px;list-style:none">
                    <i class="fa-solid fa-chevron-right cgi-chevron" style="font-size:12px"></i> I. Thông tin chung
                    <!-- Mã hồ sơ và Trạng thái chỉ hiển thị trên dòng tiêu đề khi khối thu gọn; khi mở rộng đã hiển thị tại các trường bên dưới -->
                    <span class="cgi-collapsed-only" style="font-weight:500;color:var(--text-muted)">${item.id}</span>
                    <span class="cgi-collapsed-only badge ${badge}" style="margin-left:auto">${item.status}</span>
                </summary>
                <div class="info-grid" style="padding:4px 14px 12px">${fields.map(([l, v]) => `<div class="info-group"><div class="info-label">${l}</div><div class="info-value">${v}</div></div>`).join('')}</div>
            </details>`;
}

// MH02 - Xử lý hồ sơ yêu cầu cung cấp thông tin (tự động điền tiêu chí, tự động tra cứu khi mở màn hình)
let ccttProcessResult = null;
function openCcttProcess(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    if (item.status !== 'Chờ duyệt') { showListToast(CcttPopups.MSG_ERR_STATUS, 'error'); return; } // TH1 [MSG-ERR-CCTT-002]
    if (!item.officer) item.officer = 'Nguyễn Văn Cán Bộ'; // ghi nhận Cán bộ xử lý nếu chưa có
    selectedCcttOfficerId = id;
    ccttProcessResult = CcttPopups.runLookup(item);
    // Nút Duyệt chờ ký / Trình ký chỉ hiển thị khi đã có kết quả tra cứu (có dữ liệu hoặc không có dữ liệu)
    const hasResult = !!ccttProcessResult;
    const segments = ['Số đăng ký', 'Bên bảo đảm', 'Số khung'].map(c => `<button type="button" class="btn ${c === item.criteria ? 'btn-primary' : 'btn-outline-secondary'}" disabled style="${c === item.criteria ? '' : 'opacity:.45'};border-radius:0">${c}</button>`).join('');
    const inputs = CcttPopups.getLookupFields(item).map(([l, v]) => `<div class="form-group"><label class="form-label">${l}</label><input type="text" class="form-control" value="${v || ''}" disabled style="background:#F1F5F9"></div>`).join('');
    showCcttView(`
        <div class="card-section">
            <div class="section-title"><span><i class="fa-solid fa-magnifying-glass"></i> Xử lý hồ sơ yêu cầu cung cấp thông tin: ${item.id}</span></div>
            ${renderCcttGeneralInfo(item)}
            <h3 class="section-title" style="font-size:15px">II. Khối tra cứu</h3>
            <div class="form-group"><label class="form-label">Tiêu chí yêu cầu cung cấp thông tin</label><div style="display:inline-flex;border:1px solid var(--border-color);border-radius:6px;overflow:hidden">${segments}</div></div>
            <div class="grid-4-cols">${inputs}</div>
            <h3 class="section-title" style="font-size:15px;margin-top:10px">III. Kết quả tra cứu</h3>
            <div id="cctt-process-result">${CcttPopups.renderResult(ccttProcessResult)}</div>
        </div>
        <div class="card-section" style="position:sticky;bottom:0;z-index:40;display:flex;justify-content:flex-end;gap:10px;box-shadow:0 -4px 12px rgba(15,23,42,.08)">
            <button class="btn btn-outline-secondary" onclick="closeCcttView()">Hủy bỏ</button>
            ${hasResult ? `<button class="btn btn-success" onclick="approveCcttProcess('${item.id}')"><i class="fa-solid fa-check"></i> Duyệt chờ ký</button>
            <button class="btn btn-primary" onclick="openCcttSign('${item.id}')"><i class="fa-solid fa-paper-plane"></i> Trình ký</button>` : ''}
        </div>`);
}

// Tab Hồ sơ duyệt chờ ký: mở MH02 ở chế độ chỉ đọc, hiển thị Khối tra cứu và Kết quả tra cứu đã lưu khi Duyệt chờ ký (không tra cứu lại)
function openCcttApprovedView(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    selectedCcttOfficerId = id;
    if (!item.lookupResult) item.lookupResult = CcttPopups.runLookup(item);
    const isApproved = item.status === 'Duyệt chờ ký';
    renderCcttReadonlyDetail(item, `
            <button class="btn btn-outline-secondary" onclick="closeCcttView()">Đóng</button>
            ${isApproved ? `<button class="btn btn-warning" style="background-color:#64748B;color:white" onclick="cancelCcttApproval('${item.id}');closeCcttView()"><i class="fa-solid fa-rotate-left"></i> Hủy duyệt</button>
            <button class="btn btn-danger" onclick="openCcttReject('${item.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>
            <button class="btn btn-primary" onclick="openCcttSignFromList('${item.id}')"><i class="fa-solid fa-file-signature"></i> Trình ký</button>` : ''}`);
}

// Tab Hồ sơ Bị trả lại: hiển thị giống Tab Hồ sơ duyệt chờ ký (Khối tra cứu + Kết quả tra cứu đã lưu, chỉ đọc), nút Cập nhật, Đóng
function openCcttReturnedView(id) {
    const row = getPaperCcttRows().find(x => x.id === id);
    if (!row) return;
    const item = { ...row, criteria: row.lookupCriteria || row.criteria || 'Số đăng ký', inputData: row.lookupValue || row.inputData || '1505170802' };
    if (!item.lookupResult) item.lookupResult = CcttPopups.runLookup(item);
    renderCcttReadonlyDetail(item, `
            <button class="btn btn-primary" onclick="startDigitize('${item.id}')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật</button>
            <button class="btn btn-outline-secondary" onclick="closeCcttView()">Đóng</button>`);
}

function renderCcttReadonlyDetail(item, buttonsHtml) {
    const segments = ['Số đăng ký', 'Bên bảo đảm', 'Số khung'].map(c => `<button type="button" class="btn ${c === item.criteria ? 'btn-primary' : 'btn-outline-secondary'}" disabled style="${c === item.criteria ? '' : 'opacity:.45'};border-radius:0">${c}</button>`).join('');
    const inputs = CcttPopups.getLookupFields(item).map(([l, v]) => `<div class="form-group"><label class="form-label">${l}</label><input type="text" class="form-control" value="${v || ''}" disabled style="background:#F1F5F9"></div>`).join('');
    const badgeClass = item.status === 'Hoàn thành' ? 'badge-success' : (item.status === 'Bị từ chối' || item.status === 'Bị trả lại' ? 'badge-danger' : (item.status === 'Chờ ký' || item.status === 'Chờ duyệt' ? 'badge-warning' : 'badge-info'));

    // Thông tin từ chối / trả lại hiển thị bằng khối dùng chung renderReturnRejectBlocks (Khối II, III)
    let statusBanner = '';
    if (item.status === 'Hoàn thành') {
        statusBanner = `
            <div class="alert alert-success" style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:6px;padding:12px;margin-bottom:15px;color:#166534;">
                <b><i class="fa-solid fa-circle-check"></i> Kết quả xử lý:</b> Hồ sơ đã hoàn thành việc cung cấp thông tin có xác nhận của cơ quan đăng ký.
            </div>
        `;
    }

    showCcttView(`
        <div class="card-section">
            <div class="section-title"><span><i class="fa-solid fa-circle-info"></i> Xem chi tiết hồ sơ yêu cầu cung cấp thông tin: ${item.id}</span></div>
            ${statusBanner}
            ${renderCcttGeneralInfo(item)}
            ${renderReturnRejectBlocks(item)}
            <h3 class="section-title" style="font-size:15px">IV. Khối tra cứu</h3>
            <div class="form-group"><label class="form-label">Tiêu chí yêu cầu cung cấp thông tin</label><div style="display:inline-flex;border:1px solid var(--border-color);border-radius:6px;overflow:hidden">${segments}</div></div>
            <div class="grid-4-cols">${inputs}</div>
            <h3 class="section-title" style="font-size:15px;margin-top:10px">V. Kết quả tra cứu</h3>
            <div id="cctt-process-result">${CcttPopups.renderResult(item.lookupResult)}</div>
        </div>
        <div class="card-section" style="position:sticky;bottom:0;z-index:40;display:flex;justify-content:flex-end;gap:10px;box-shadow:0 -4px 12px rgba(15,23,42,.08)">
            ${buttonsHtml}
        </div>`);
}

function approveCcttProcess(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    if (item.status !== 'Chờ duyệt') { showListToast(CcttPopups.MSG_ERR_STATUS, 'error'); return; } // TH1
    item.lookupResult = ccttProcessResult;
    item.status = 'Duyệt chờ ký';
    item.officer = 'Nguyễn Văn Cán Bộ';
    item.processedAt = ccttProcessResult ? ccttProcessResult.at : new Date().toLocaleString('vi-VN');
    finishCcttAction(item, 'Duyệt yêu cầu cung cấp thông tin thành công.'); // [MSG-SUC-CCTT-005]
}

function openCcttSign(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    CcttPopups.openSign(item, ccttProcessResult, (it, msg) => finishCcttAction(it, msg));
}

// Trình ký từ danh sách/xem chi tiết (hồ sơ đã có kết quả tra cứu tại bước Duyệt chờ ký)
function openCcttSignFromList(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    CcttPopups.openSign(item, item.lookupResult || CcttPopups.runLookup(item), (it, msg) => finishCcttAction(it, msg));
}

function openCcttReject(id) {
    const item = ccttOfficerRequests.find(x => x.id === id);
    if (!item) return;
    const allowed = currentListTab === 'duyet-choky' ? ['Duyệt chờ ký'] : ['Chờ duyệt'];
    if (!allowed.includes(item.status)) { showListToast(CcttPopups.MSG_ERR_STATUS, 'error'); return; } // TH1
    CcttPopups.openReject(item, (it, msg) => finishCcttAction(it, msg), { allowed });
}
switchListTab = function (tab, element) {
    const targetShowsWorkTabs = ['choduyet', 'duyet-choky', 'bitralai', 'dang_xu_ly', 'da_xu_ly'].includes(tab);
    officerWorkType = targetShowsWorkTabs ? (sessionStorage.getItem('uc028OfficerWorkType') || 'registration') : 'registration';
    sessionStorage.setItem('uc028OfficerWorkType', officerWorkType);
    UC028_BASE.switchListTab(tab, element);
    syncOfficerWorkTabs();
};

closeDetail = function () {
    selectedCcttOfficerId = null;
    selectedOfficerCopyId = null;
    UC028_BASE.closeDetail();
    syncOfficerWorkTabs();
};

// Thu gọn / mở rộng khối Bộ lọc tìm kiếm để nhường diện tích cho lưới danh sách
function toggleFilterSection() {
    const sec = document.getElementById('filter-section');
    if (!sec) return;
    sec.classList.toggle('collapsed');
}
