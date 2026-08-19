/**
 * Xử lý logic SPA cho UC028 - Màn hình Xem chi tiết hồ sơ (Three-Pane Layout)
 * Áp dụng tổng quát cho cả 9 loại hồ sơ theo quy chuẩn Design System.
 */

let currentListTab = 'duyet-choky';
let currentSortColumn = 'date';
let currentSortOrder = 'desc';
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
        status: 'Chờ ký',
        statusClass: 'badge-warning',
        pin: '847291',
        customerId: 'KH-MINHTAM-01',
        receipt: 'BL-991827-01',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '28/06/2026 10:30', status: 'Chờ ký', active: true }
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
        status: 'Chờ ký',
        statusClass: 'badge-warning',
        pin: '182749',
        customerId: 'KH-HUNG-02',
        receipt: 'BL-991827-02',
        assetType: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '20/04/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Đăng ký thay đổi', date: '29/06/2026 14:15', status: 'Chờ ký', active: true }
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '291830',
        customerId: 'KH-LAN-03',
        receipt: 'BL-991827-03',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '15/04/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 08:30', status: 'Chờ ký', active: true }
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '102938',
        customerId: 'KH-VCB-04',
        receipt: 'BL-991827-04',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)',
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '908172',
        customerId: 'KH-TRIVIET-05',
        receipt: 'BL-991827-05',
        assetType: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ',
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '283749',
        customerId: 'KH-DUC-06',
        receipt: 'BL-991827-06',
        assetType: 'Cây hằng năm, công trình tạm',
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '482719',
        customerId: 'KH-BIDV-07',
        receipt: 'BL-991827-07',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/01/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '30/06/2026 15:30', status: 'Chờ ký', active: true }
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '581920',
        customerId: 'KH-TCB-08',
        receipt: 'BL-991827-08',
        assetType: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '05/01/2026 10:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '25/05/2026 15:00', status: 'Hoàn thành', active: false },
            { id: 'node-3', title: 'Thay đổi thông báo xử lý', date: '30/06/2026 16:15', status: 'Chờ ký', active: true }
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '681920',
        customerId: 'KH-MB-09',
        receipt: 'BL-991827-09',
        assetType: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '01/01/2026 09:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Thông báo xử lý tài sản', date: '12/04/2026 11:00', status: 'Hoàn thành', active: false },
            { id: 'node-3', title: 'Xóa thông báo xử lý', date: '30/06/2026 17:00', status: 'Chờ ký', active: true }
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '901827',
        customerId: 'KH-TRANSPERCO-12',
        receipt: 'BL-991827-12',
        assetType: 'Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '10/03/2026 08:00', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 17:45', status: 'Chờ ký', active: true }
        ],
        internalLogs: [
            { time: '30/06/2026 17:47', user: 'Cán bộ nghiệp vụ TTĐK', action: 'Trình ký', comment: 'Hoàn tất thủ tục trình duyệt giải chấp.' }
        ]
    },
    {
        id: 'GDBD-2026-000830',
        date: '30/06/2026 18:00',
        customer: 'Ông Nguyễn Văn A',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký mới',
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
        date: '30/06/2026 18:15',
        customer: 'Công ty TNHH Thương mại Dịch vụ An Phát',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Đăng ký mới',
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
        date: '30/06/2026 18:30',
        customer: 'Bà Nguyễn Thị Bình',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển VN (BIDV)',
        type: 'Đăng ký mới',
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '392018',
        customerId: 'KH-NGUYENTHIMINH',
        receipt: 'BL-991827-03',
        assetType: 'Cây hằng năm, công trình tạm',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '12/03/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 09:15', status: 'Chờ ký', active: true }
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
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '492019',
        customerId: 'KH-HUNGTHINH',
        receipt: 'BL-991827-04',
        assetType: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất...',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '30/06/2026 10:30', status: 'Chờ ký', active: true }
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
        id: 'GDBD-2026-000806',
        date: '30/06/2026 14:00',
        customer: 'Bà Phạm Thị Tuyết',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)',
        type: 'Xóa đăng ký',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ ký',
        statusClass: 'badge-info',
        pin: '692019',
        customerId: 'KH-PHAMTHITUYET',
        receipt: 'BL-991827-06',
        assetType: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ...)',
        timeline: [
            { id: 'node-1', title: 'Đăng ký lần đầu', date: '15/01/2026 08:30', status: 'Hoàn thành', active: false },
            { id: 'node-2', title: 'Xóa đăng ký', date: '30/06/2026 14:00', status: 'Chờ ký', active: true }
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

// State variables for pagination
let pageSize = 10;
let currentPage = 1;
let filteredProfiles = []; // Store currently filtered records for pagination paging

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

// Khởi tạo bảng dữ liệu ban đầu kết hợp lọc & phân trang
function renderTable(resetPage = false) {
    if (resetPage) {
        currentPage = 1;
    }

    // 2. Determine target status based on current active tab
    let targetStatuses = ['Chờ ký'];
    if (currentListTab === 'chonhaplieu') targetStatuses = ['Chờ giải quyết'];
    else if (currentListTab === 'duyet-choky') targetStatuses = ['Chờ ký'];
    else if (currentListTab === 'bitralai') targetStatuses = ['Bị trả lại'];
    else if (currentListTab === 'dang_xu_ly') targetStatuses = ['Chờ ký'];
    else if (currentListTab === 'da_xu_ly') targetStatuses = ['Hoàn thành', 'Bị từ chối'];

    // 3. Filter the complete mock profiles array plus custom localStorage data
    let allProfiles = [...mockProfiles];
    const cached = localStorage.getItem('custom_mock_profiles');
    if (cached) {
        const customList = JSON.parse(cached);
        const customIds = customList.map(c => c.id);
        allProfiles = allProfiles.filter(p => !customIds.includes(p.id));
        allProfiles = [...customList, ...allProfiles];
    }

    if (currentListTab === 'chonhaplieu') {
        const searchTerm = document.getElementById('filter-search-term')?.value.toLowerCase().trim() || '';
        const filterKenh = document.getElementById('filter-kenh-tiep-nhan')?.value || '';
        const filterChuThe = document.getElementById('filter-loai-chu-the')?.value || '';
        const filterPhuongThuc = document.getElementById('filter-phuong-thuc')?.value || '';
        const filterHinhThuc = document.getElementById('filter-hinh-thuc-tra')?.value || '';
        const filterTungay = document.getElementById('filter-tungay')?.value || '';
        const filterDenngay = document.getElementById('filter-denngay')?.value || '';

        filteredProfiles = allProfiles.filter(p => {
            const filterHandlingOfficer = document.getElementById('filter-handlingOfficer')?.value || '';
            if (filterHandlingOfficer && p.handlingOfficer !== filterHandlingOfficer) return false;
            if (!targetStatuses.includes(p.status)) return false;

            if (searchTerm && !p.customer.toLowerCase().includes(searchTerm) && !p.phone?.toLowerCase().includes(searchTerm)) return false;
            if (filterKenh && p.channel !== filterKenh) return false;
            if (filterChuThe && p.customerType !== filterChuThe) return false;
            if (filterPhuongThuc && p.paymentMethod !== filterPhuongThuc) return false;
            if (filterHinhThuc && p.resultMethod !== filterHinhThuc) return false;

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
        const searchTerm = document.getElementById('filter-search-term')?.value.toLowerCase().trim() || '';
        const filterCustomerId = document.getElementById('filter-customer-id')?.value.toLowerCase().trim() || document.getElementById('filter-makh')?.value.toLowerCase().trim() || '';
        const filterLoaidangky = document.getElementById('filter-loaidangky')?.value || '';
        const filterLoaihinh = document.getElementById('cb-loaihinh')?.value || '';
        const filterSubtype = document.getElementById('cb-loaibienphap')?.value || '';
        const filterLoaitaisan = document.getElementById('filter-loaitaisan')?.value || '';
        const filterTungay = document.getElementById('filter-tungay')?.value || '';
        const filterDenngay = document.getElementById('filter-denngay')?.value || '';

        filteredProfiles = allProfiles.filter(p => {
            const filterHandlingOfficer = document.getElementById('filter-handlingOfficer')?.value || '';
            if (filterHandlingOfficer && p.handlingOfficer !== filterHandlingOfficer) return false;
            if (!targetStatuses.includes(p.status)) return false;

            if (searchTerm && !p.id.toLowerCase().includes(searchTerm) && !(p.pin || '').toLowerCase().includes(searchTerm) && !p.customer.toLowerCase().includes(searchTerm) && !p.mortgagee.toLowerCase().includes(searchTerm)) return false;
            if (filterCustomerId && !p.customerId?.toLowerCase().includes(filterCustomerId)) return false;
            if (filterLoaidangky && p.type !== filterLoaidangky) return false;
            if (filterLoaihinh && p.transactionType !== filterLoaihinh) return false;
            if (filterSubtype && p.subtype !== filterSubtype) return false;
            if (filterLoaitaisan && p.assetType !== filterLoaitaisan) return false;

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
        } else if (currentSortColumn === 'customer') {
            filteredProfiles.sort((a, b) => {
                const diff = a.customer.localeCompare(b.customer, 'vi');
                return currentSortOrder === 'desc' ? -diff : diff;
            });
        } else if (currentSortColumn === 'mortgagee') {
            filteredProfiles.sort((a, b) => {
                const diff = a.mortgagee.localeCompare(b.mortgagee, 'vi');
                return currentSortOrder === 'desc' ? -diff : diff;
            });
        } else {
            filteredProfiles.sort((a, b) => parseDateString(b.date) - parseDateString(a.date));
        }
    }

    // 5. Render sliced page rows
    executeRender();
}

function executeRender() {
    const tbody = document.getElementById('table-data');
    tbody.innerHTML = '';

    const thead = document.getElementById('table-headers-container');
    if (currentListTab === 'chonhaplieu') {
        thead.innerHTML = `
            <tr>
                <th style="width: 50px; text-align: center;">STT</th>
                <th style="cursor: pointer; width: 140px;" onclick="toggleSort('date')">Thời điểm tiếp nhận ${getSortIcon('date')}</th>
                <th style="width: 120px;">Kênh tiếp nhận</th>
                <th style="width: 130px;">Loại chủ thể</th>
                <th style="width: 150px;">Mã tài khoản trực tuyến</th>
                <th style="cursor: pointer; width: 220px;" onclick="toggleSort('name')">Họ và tên / Tên tổ chức ${getSortIcon('name')}</th>
                <th style="width: 110px;">Số điện thoại</th>
                <th style="width: 160px;">Email</th>
                <th style="width: 150px;">Phương thức thanh toán</th>
                <th style="width: 150px;">Hình thức trả kết quả</th>
                <th style="width: 120px;">Số biên lai</th>
                <th style="width: 120px;">Trạng thái</th>
                <th style="width: 140px;">Cán bộ xử lý</th>
                <th style="text-align: center; width: 130px; min-width: 130px;">Thao tác</th>
            </tr>
        `;
    } else {
        let actionsMinWidth = '145px';
        if (currentListTab === 'choduyet') {
            actionsMinWidth = '185px';
        }

        thead.innerHTML = `
            <tr>
                <th style="width: 40px; text-align: center;"><input type="checkbox" id="checkAll" onclick="toggleCheckAll(this)"></th>
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
                <th style="width: 120px;">Mã khách hàng</th>
                <th style="width: 110px;">Số biên lai</th>
                <th style="width: 110px;">Trạng thái</th>
                <th style="width: 150px;">Người yêu cầu</th>
                <th style="width: 140px;">Cán bộ xử lý</th>
                <th style="text-align: center; width: ${actionsMinWidth}; min-width: ${actionsMinWidth};">Thao tác</th>
            </tr>
        `;
    }

    const totalCount = filteredProfiles.length;
    const colSpanCount = currentListTab === 'chonhaplieu' ? 14 : 17;
    
    if (totalCount === 0) {
        tbody.innerHTML = `<tr><td colspan="${colSpanCount}" style="text-align: center; padding: 30px; color: var(--text-muted);"><i>Không có hồ sơ nào ở trạng thái này hoặc phù hợp với điều kiện tìm kiếm.</i></td></tr>`;
        document.getElementById('page-start-index').innerText = '0';
        document.getElementById('page-end-index').innerText = '0';
        document.getElementById('total-records').innerText = '0';
        document.getElementById('pagination-buttons').innerHTML = '';
        return;
    }

    // Determine slice range
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    
    const pageData = filteredProfiles.slice(startIndex, endIndex);

    pageData.forEach((row, index) => {
        if (currentListTab === 'chonhaplieu') {
            const customerTypeText = row.customerType === 'vang_lai' ? 'Khách hàng vãng lai' : 'Khách hàng có tài khoản trực tuyến';
            const payMethodText = row.paymentMethod === 'tien_mat' ? 'Nộp tiền mặt' : (row.paymentMethod === 'chuyen_khoan' ? 'Chuyển khoản ngân hàng' : 'Miễn phí');
            const resultMethodText = row.resultMethod === 'truc_tiep' ? 'Trực tiếp tại cơ quan' : (row.resultMethod === 'buu_chinh' ? 'Qua dịch vụ bưu chính' : 'Cách thức điện tử');
            
            tbody.innerHTML += `
                <tr style="cursor: pointer;" onclick="openPaperReadonly('${row.id}')">
                    <td>${startIndex + index + 1}</td>
                    <td>${row.date}</td>
                    <td>${row.channel || 'Trực tiếp tại quầy'}</td>
                    <td>${customerTypeText}</td>
                    <td>${row.customerId || '-'}</td>
                    <td><span class="action-link" onclick="event.stopPropagation(); openPaperReadonly('${row.id}')"><b>${row.customer}</b></span></td>
                    <td>${row.phone || '-'}</td>
                    <td>${row.email || '-'}</td>
                    <td>${payMethodText}</td>
                    <td>${resultMethodText}</td>
                    <td><code>${row.receipt || '-'}</code></td>
                    <td><span class="badge badge-warning">Chờ giải quyết</span></td>
                    <td>${row.handlingOfficer || '-'}</td>
                    <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                        <button class="icon-btn edit" title="Tạo hồ sơ" onclick="startDigitize('${row.id}')"><i class="fa-solid fa-file-circle-plus"></i></button>
                        <button class="icon-btn reject" title="Từ chối" onclick="openRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>
                    </td>
                </tr>
            `;
        } else {
            let actionsHtml = '';
            const canSign = row.status === 'Chờ ký';
            
            if (currentListTab === 'dang_xu_ly') {
                actionsHtml = `${renderLeaderActionButton('sign', 'Ký duyệt', 'fa-solid fa-file-signature', `openSignSingle('${row.id}')`, canSign)}
                    ${renderLeaderActionButton('return', 'Trả lại', 'fa-solid fa-reply', `openReasonSingle('${row.id}', 'tralai')`, canSign)}
                    ${renderLeaderActionButton('reject', 'Từ chối', 'fa-solid fa-ban', `openReasonSingle('${row.id}', 'tuchoi')`, canSign)}`;
            } else if (currentListTab === 'da_xu_ly') {
                actionsHtml = '<span style="color:var(--text-muted)">-</span>';
            } else if (currentListTab === 'choduyet') {
                const btnApprove = `<button class="icon-btn approve" title="Duyệt hồ sơ" onclick="event.stopPropagation(); approveDossierSingle('${row.id}')"><i class="fa fa-check"></i></button>`;
                const btnSign = `<button class="icon-btn sign" title="Trình ký" onclick="event.stopPropagation(); submitForSignatureSingle('${row.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
                const btnReject = `<button class="icon-btn reject" title="Từ chối hồ sơ" onclick="event.stopPropagation(); openRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>`;
                
                const isOfficerInput = (row.channel !== 'Cách thức điện tử');
                let btnEdit = '';
                if (isOfficerInput) {
                    btnEdit = `<button class="icon-btn edit" title="Cập nhật" onclick="event.stopPropagation(); startDigitize('${row.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                } else {
                    btnEdit = `<button class="icon-btn edit" title="Hồ sơ từ nguồn Khách hàng không được cập nhật" style="opacity: 0.35; pointer-events: none; cursor: not-allowed;"><i class="fa-solid fa-pen-to-square"></i></button>`;
                }
                actionsHtml = `${btnEdit}${btnApprove}${btnSign}${btnReject}`;
            } else if (currentListTab === 'duyet-choky') {
                actionsHtml = `${renderLeaderActionButton('sign', 'Ký duyệt', 'fa-solid fa-file-signature', `openSignSingle('${row.id}')`, canSign)}
                    ${renderLeaderActionButton('return', 'Trả lại', 'fa-solid fa-reply', `openReasonSingle('${row.id}', 'tralai')`, canSign)}
                    ${renderLeaderActionButton('reject', 'Từ chối', 'fa-solid fa-ban', `openReasonSingle('${row.id}', 'tuchoi')`, canSign)}`;
            } else if (currentListTab === 'bitralai') {
                actionsHtml = '<span style="color:var(--text-muted)">-</span>';
            } else {
                actionsHtml = '';
            }

            tbody.innerHTML += `
                <tr style="cursor: pointer;" onclick="openDetail('${row.id}')">
                    <td onclick="event.stopPropagation()"><input type="checkbox" class="row-checkbox" value="${row.id}"></td>
                    <td>${startIndex + index + 1}</td>
                    <td>${row.date}</td>
                    <td><span class="action-link" onclick="event.stopPropagation(); openDetail('${row.id}')">${row.id}</span></td>
                    <td><code>${row.type === 'Đăng ký mới' ? (row.pin || '-') : '-'}</code></td>
                    <td><b>${row.customer}</b></td>
                    <td>${row.mortgagee}</td>
                    <td>${row.type}</td>
                    <td>${row.transactionType}</td>
                    <td>${row.subtype}</td>
                    ${formatAssetTypeCell(row.assetType)}
                    <td><code>${row.customerId || '-'}</code></td>
                    <td><code>${row.receipt || '-'}</code></td>
                    <td><span class="badge ${row.statusClass}">${row.status}</span></td>
                    <td>${row.requestor || row.customer}</td>
                    <td>${row.handlingOfficer || '-'}</td>
                    <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                        ${actionsHtml}
                    </td>
                </tr>
            `;
        }
    });

    // Update pagination labels
    document.getElementById('page-start-index').innerText = startIndex + 1;
    document.getElementById('page-end-index').innerText = endIndex;
    document.getElementById('total-records').innerText = totalCount;

    // Render pagination buttons
    renderPagination(totalCount);

    document.getElementById('checkAll').checked = false;
}

// Render các nút phân trang
function renderPagination(totalCount) {
    const totalPages = Math.ceil(totalCount / pageSize);
    const container = document.getElementById('pagination-buttons');
    container.innerHTML = '';
    
    if (totalPages <= 1) {
        container.innerHTML = `<button class="btn btn-outline-secondary" disabled style="padding: 4px 10px; font-size: 12px; min-width: 32px; border-radius: 4px;">1</button>`;
        return;
    }
    
    // Nút Đầu (Trang đầu)
    const firstBtn = document.createElement('button');
    firstBtn.className = 'btn btn-outline-secondary';
    firstBtn.style.padding = '4px 10px';
    firstBtn.style.fontSize = '12px';
    firstBtn.style.borderRadius = '4px';
    firstBtn.innerText = 'Trang đầu';
    if (currentPage === 1) firstBtn.disabled = true;
    firstBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage = 1;
            executeRender();
        }
    };
    container.appendChild(firstBtn);

    // Nút Trước
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn btn-outline-secondary';
    prevBtn.style.padding = '4px 10px';
    prevBtn.style.fontSize = '12px';
    prevBtn.style.borderRadius = '4px';
    prevBtn.innerText = '◀';
    if (currentPage === 1) prevBtn.disabled = true;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            executeRender();
        }
    };
    container.appendChild(prevBtn);
    
    // Các trang số
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = i === currentPage ? 'btn btn-primary' : 'btn btn-outline-secondary';
        pageBtn.style.padding = '4px 10px';
        pageBtn.style.fontSize = '12px';
        pageBtn.style.borderRadius = '4px';
        pageBtn.innerText = i;
        pageBtn.onclick = () => {
            currentPage = i;
            executeRender();
        };
        container.appendChild(pageBtn);
    }
    
    // Nút Tiếp
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-outline-secondary';
    nextBtn.style.padding = '4px 10px';
    nextBtn.style.fontSize = '12px';
    nextBtn.style.borderRadius = '4px';
    nextBtn.innerText = '▶';
    if (currentPage === totalPages) nextBtn.disabled = true;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            executeRender();
        }
    };
    container.appendChild(nextBtn);

    // Nút Cuối (Trang cuối)
    const lastBtn = document.createElement('button');
    lastBtn.className = 'btn btn-outline-secondary';
    lastBtn.style.padding = '4px 10px';
    lastBtn.style.fontSize = '12px';
    lastBtn.style.borderRadius = '4px';
    lastBtn.innerText = 'Trang cuối';
    if (currentPage === totalPages) lastBtn.disabled = true;
    lastBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage = totalPages;
            executeRender();
        }
    };
    container.appendChild(lastBtn);
}

function changePageSize(size) {
    pageSize = parseInt(size, 10);
    currentPage = 1;
    executeRender();
}

// Chuyển đổi tab danh sách chính MH01
function switchListTab(tab, element) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    if (element) element.classList.add('active');
    currentListTab = tab;
    
    // Quản lý hiển thị các toolbar và checkbox cột
    document.getElementById('toolbar-choduyet').style.display = 'none';
    document.getElementById('toolbar-duyet-choky').style.display = 'none';
    document.getElementById('toolbar-choky').style.display = 'none';

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
    
    if (currentListTab === 'chonhaplieu') {
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group">
                    <label class="form-label">Tìm kiếm</label>
                    <input type="text" class="form-control" id="filter-search-term" placeholder="Tên hoặc Số điện thoại..." autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Kênh tiếp nhận</label>
                    <select class="form-select" id="filter-kenh-tiep-nhan">
                        <option value="">Tất cả</option>
                        <option value="Trực tiếp tại quầy">Trực tiếp tại quầy</option>
                        <option value="Qua bưu chính">Qua bưu chính</option>
                        <option value="Cách thức điện tử">Cách thức điện tử</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Loại chủ thể</label>
                    <select class="form-select" id="filter-loai-chu-the">
                        <option value="">Tất cả</option>
                        <option value="vang_lai">Khách hàng vãng lai</option>
                        <option value="dinh_danh">Khách hàng có tài khoản trực tuyến</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Phương thức thanh toán</label>
                    <select class="form-select" id="filter-phuong-thuc">
                        <option value="">Tất cả</option>
                        <option value="tien_mat">Nộp tiền mặt</option>
                        <option value="chuyen_khoan">Chuyển khoản ngân hàng</option>
                        <option value="mien_phi">Miễn phí</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Hình thức trả kết quả</label>
                    <select class="form-select" id="filter-hinh-thuc-tra">
                        <option value="">Tất cả</option>
                        <option value="truc_tiep">Trực tiếp tại cơ quan đăng ký</option>
                        <option value="buu_chinh">Qua dịch vụ bưu chính</option>
                        <option value="dien_tu">Cách thức điện tử</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Từ ngày</label>
                    <input type="text" class="form-control" id="filter-tungay" placeholder="dd/mm/yyyy" value="${defFromDate}">
                </div>
                <div class="form-group">
                    <label class="form-label">Đến ngày</label>
                    <input type="text" class="form-control" id="filter-denngay" placeholder="dd/mm/yyyy" value="${defToDate}">
                </div>
                <div class="form-group">
                    <label class="form-label">Cán bộ xử lý</label>
                    <select class="form-select" id="filter-handlingOfficer">
                        <option value="">Tất cả</option>
                        <option value="Nguyễn Văn Cán Bộ">Nguyễn Văn Cán Bộ</option>
                        <option value="Lê Anh Tuấn">Lê Anh Tuấn</option>
                        <option value="Trần Quốc Khánh">Trần Quốc Khánh</option>
                    </select>
                </div>
            </div>
            <div style="text-align: right; margin-top: 15px;">
                <button class="btn btn-outline-secondary" onclick="resetFilters()" style="margin-right: 8px;">Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="searchList()">Tìm kiếm</button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group">
                    <label class="form-label">Tìm kiếm</label>
                    <input type="text" class="form-control" id="filter-search-term" placeholder="Mã số đăng ký, PIN, Tên bên bảo đảm..." autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Mã khách hàng</label>
                    <input type="text" class="form-control" id="filter-customer-id" placeholder="Nhập mã khách hàng..." autocomplete="off">
                </div>
                <div class="form-group">
                    <label class="form-label">Loại đăng ký</label>
                    <select class="form-select" id="filter-loaidangky">
                        <option value="">Tất cả</option>
                        <option value="Đăng ký mới">Đăng ký mới</option>
                        <option value="Đăng ký thay đổi">Đăng ký thay đổi</option>
                        <option value="Xóa đăng ký">Xóa đăng ký</option>
                        <option value="Yêu cầu cung cấp bản sao">Yêu cầu cung cấp bản sao</option>
                        <option value="Yêu cầu cung cấp bản sao kèm thông báo">Yêu cầu cung cấp bản sao kèm thông báo</option>
                        <option value="Yêu cầu cung cấp thông tin">Yêu cầu cung cấp thông tin</option>
                        <option value="Thông báo xử lý tài sản">Thông báo xử lý tài sản</option>
                        <option value="Thay đổi thông báo xử lý tài sản">Thay đổi thông báo xử lý tài sản</option>
                        <option value="Xóa thông báo xử lý tài sản">Xóa thông báo xử lý tài sản</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Loại hình giao dịch</label>
                    <select class="form-select" id="cb-loaihinh" onchange="updateSubTypes()">
                        <option value="">Tất cả</option>
                        <option value="Biện pháp bảo đảm">Biện pháp bảo đảm</option>
                        <option value="Hợp đồng">Hợp đồng</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Loại biện pháp / Hợp đồng</label>
                    <select class="form-select" id="cb-loaibienphap">
                        <option value="">Tất cả</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Loại tài sản đảm bảo</label>
                    <select class="form-select" id="filter-loaitaisan">
                        <option value="">Tất cả</option>
                        <option value="Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)">Phương tiện giao thông cơ giới đường bộ CÓ số khung (ô tô, mô tô, xe gắn máy...)</option>
                        <option value="Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt">Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt hoặc phương tiện chuyên dùng trên đường bộ, đường thủy, đường sắt</option>
                        <option value="Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản">Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản</option>
                        <option value="Cây hằng năm, công trình tạm">Cây hằng năm, công trình tạm</option>
                        <option value="Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ">Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ</option>
                        <option value="Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung">Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung</option>
                        <option value="Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)">Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ,...)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Từ ngày</label>
                    <input type="text" class="form-control" id="filter-tungay" placeholder="dd/mm/yyyy" value="${defFromDate}">
                </div>
                <div class="form-group">
                    <label class="form-label">Đến ngày</label>
                    <input type="text" class="form-control" id="filter-denngay" placeholder="dd/mm/yyyy" value="${defToDate}">
                </div>
                <div class="form-group">
                    <label class="form-label">Cán bộ xử lý</label>
                    <select class="form-select" id="filter-handlingOfficer">
                        <option value="">Tất cả</option>
                        <option value="Nguyễn Văn Cán Bộ">Nguyễn Văn Cán Bộ</option>
                        <option value="Lê Anh Tuấn">Lê Anh Tuấn</option>
                        <option value="Trần Quốc Khánh">Trần Quốc Khánh</option>
                    </select>
                </div>
            </div>
            <div style="text-align: right; margin-top: 15px;">
                <button class="btn btn-outline-secondary" onclick="resetFilters()" style="margin-right: 8px;">Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="searchList()">Tìm kiếm</button>
            </div>
        `;
        updateSubTypes();
    }

    if (typeof flatpickr !== 'undefined') {
        flatpickr("#filter-tungay", { dateFormat: "d/m/Y", allowInput: true });
        flatpickr("#filter-denngay", { dateFormat: "d/m/Y", allowInput: true });
    }
    
    // Clear browser autofill values after rendering
    setTimeout(() => {
        const searchEl = document.getElementById('filter-search-term');
        if (searchEl) searchEl.value = '';
    }, 50);
}

let singleRejectId = null;

function approveDossierSingle(id) {
    const p = mockProfiles.find(prof => prof.id === id);
    if (!p) return;
    
    p.status = 'Chờ ký';
    p.statusClass = 'badge-info';
    p.internalLogs.unshift({
        time: 'Vừa xong',
        user: 'Cán bộ nghiệp vụ TTĐK',
        action: 'Phê duyệt',
        comment: 'Phê duyệt hồ sơ chuyển Lãnh đạo xem xét.'
    });
    
    saveProfiles();
    alert(`Đã duyệt hồ sơ ${id} thành công! (Hồ sơ được chuyển sang danh mục Chờ ký)`);
    updateTabBadges();
    renderTable();
}

function cancelApprovalSingle(id) {
    const p = mockProfiles.find(prof => prof.id === id);
    if (!p) return;
    
    p.status = 'Chờ duyệt';
    p.statusClass = 'badge-warning';
    p.internalLogs.unshift({
        time: 'Vừa xong',
        user: 'Cán bộ nghiệp vụ TTĐK',
        action: 'Hủy duyệt',
        comment: 'Hủy duyệt hồ sơ, chuyển về trạng thái chờ duyệt.'
    });
    
    saveProfiles();
    alert(`Đã hủy duyệt hồ sơ ${id} thành công! (Hồ sơ được chuyển về danh mục Chờ duyệt)`);
    updateTabBadges();
    
    // Tìm tab Chờ duyệt và chuyển qua
    const tabEl = Array.from(document.querySelectorAll('.nav-tab')).find(el => el.textContent.includes('Chờ duyệt'));
    switchListTab('choduyet', tabEl);
}

function saveProfiles() {
    localStorage.setItem('custom_mock_profiles', JSON.stringify(mockProfiles));
}

function updateTabBadges() {
    const counts = {
        chonhaplieu: 0,
        choduyet: 0,
        'duyet-choky': 0,
        bitralai: 0
    };
    mockProfiles.forEach(p => {
        if (p.status === 'Chờ giải quyết') counts.chonhaplieu++;
        else if (p.status === 'Chờ duyệt') counts.choduyet++;
        else if (p.status === 'Chờ ký') counts['duyet-choky']++;
        else if (p.status === 'Bị trả lại') counts.bitralai++;
    });

    const el1 = document.getElementById('badge-chonhaplieu');
    const el2 = document.getElementById('badge-choduyet');
    const el3 = document.getElementById('badge-duyet-choky');
    const el4 = document.getElementById('badge-bitralai');

    if (el1) el1.innerText = counts.chonhaplieu;
    if (el2) el2.innerText = counts.choduyet;
    if (el3) el3.innerText = counts['duyet-choky'];
    if (el4) el4.innerText = counts.bitralai;
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
    window.location.href = '../UCPS014/nhap_lieu_ho_so_giay.html?id=' + encodeURIComponent(id);
}

function openPaperReadonly(id) {
    localStorage.setItem('selected_dossier_id', id);
    window.location.href = '../UCPS014/nhap_lieu_ho_so_giay.html?mode=view&id=' + encodeURIComponent(id);
}

function searchList() {
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

// Xóa bộ lọc MH01
function resetFilters() {
    const ids = [
        'filter-makh', 'filter-tenbbd', 'filter-tenbnbd', 'filter-bienlai',
        'filter-loaidangky', 'cb-loaihinh',
        'filter-loaitaisan', 'filter-search-term', 'filter-kenh-tiep-nhan',
        'filter-loai-chu-the', 'filter-phuong-thuc', 'filter-hinh-thuc-tra',
        'filter-handlingOfficer'
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

    const elFrom = document.getElementById('filter-tungay');
    if (elFrom) elFrom.value = defFromDate;
    const elTo = document.getElementById('filter-denngay');
    if (elTo) elTo.value = defToDate;
    
    const cbLoaiHinh = document.getElementById('cb-loaihinh');
    if (cbLoaiHinh) {
        updateSubTypes();
    }
    
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
    checkboxes.forEach(cb => {
        if (!cb.disabled) cb.checked = source.checked;
    });
}

function getSelectedRows() {
    const checked = document.querySelectorAll('.row-checkbox:checked:not(:disabled)');
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
    window.location.href = '../UC027/xem_chi_tiet_lich_su_can_bo.html?id=' + id + (focusId ? '&focusId=' + focusId : '') + '&from=ky_duyet';
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

// Render các nút thao tác nghiệp vụ của Lãnh đạo (Vùng IV)
function renderDetailActionButtons() {
    const buttonsContainer = document.getElementById('detail-toolbar-buttons');
    const opinionGroup = document.getElementById('group-officer-opinion');
    buttonsContainer.innerHTML = '';

    if (opinionGroup) opinionGroup.style.display = 'none';

    const isWaiting = currentProfile && currentProfile.status === 'Chờ ký';
    buttonsContainer.innerHTML = `
        <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
        ${isWaiting ? `<button class="btn btn-danger" onclick="openReasonFromDetail('tuchoi')">✖ Từ chối</button>` : ''}
        ${isWaiting ? `<button class="btn btn-warning" onclick="openReasonFromDetail('tralai')">↺ Trả lại</button>` : ''}
        ${isWaiting ? `<button class="btn btn-success" onclick="openSignFromDetail()"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>` : ''}
    `;
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
        alert(`Hồ sơ ${currentProfile.id} phê duyệt thành công! Chuyển sang danh mục Chờ ký.`);
        currentProfile.status = 'Chờ ký';
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
let currentActionIds = [];
let currentActionType = ''; // 'tralai' or 'tuchoi'

// Má»Ÿ modal nháº­p mÃ£ PIN KÃ½ sá»‘ Ä‘Æ¡n láº» tá»« hÃ ng káº¿t quáº£
function openSignSingle(id) {
    currentActionIds = [id];
    document.getElementById('pinCode').value = '';
    document.getElementById('pinCode').classList.remove('is-invalid');
    document.getElementById('pinError').classList.remove('active');
    openModal('modalSign');
}

function openSignFromDetail() {
    if (!currentProfile) return;
    openSignSingle(currentProfile.id);
}

function submitSign() {
    const pin = document.getElementById('pinCode').value.trim();
    if (pin !== '1234') {
        document.getElementById('pinCode').classList.add('is-invalid');
        document.getElementById('pinError').classList.add('active');
        document.getElementById('pinCode').focus();
        return;
    }
    
    closeModal('modalSign');
    
    currentActionIds.forEach(id => {
        const p = mockProfiles.find(prof => prof.id === id);
        if (p) {
            p.status = 'Ho\u00e0n th\u00e0nh';
            p.statusClass = 'badge-success';
            p.internalLogs.unshift({
                time: 'V\u1eeba xong',
                user: 'L\u00e3nh \u0111\u1ea1o ph\u00ea duy\u1ec7t TT\u0110K',
                action: 'K\u00fd s\u1ed1 ph\u00ea duy\u1ec7t',
                comment: 'K\u00fd s\u1ed1 th\u00e0nh c\u00f4ng b\u1eb1ng USB Token [VNPT-CA] L\u00e3nh \u0111\u1ea1o TT\u0110K.'
            });
            p.timeline.unshift({
                id: 'TL' + (p.timeline.length + 1),
                title: 'Ho\u00e0n th\u00e0nh giao d\u1ecbch',
                date: 'V\u1eeba xong',
                status: 'Ho\u00e0n th\u00e0nh',
                desc: 'L\u00e3nh \u0111\u1ea1o \u0111\u00e3 k\u00fd s\u1ed1 th\u00e0nh c\u00f4ng Gi\u1ea5y ch\u1ee9ng nh\u1eadn \u0111\u0103ng k\u00fd bi\u1ec7n ph\u00e1p b\u1ea3o \u0111\u1ea3m.',
                active: true
            });
            p.timeline.forEach((node, idx) => {
                if (idx > 0) node.active = false;
            });
        }
    });

    saveProfiles();
    alert("\u0110\u00e3 k\u00fd s\u1ed1 ph\u00ea duy\u1ec7t th\u00e0nh c\u00f4ng cho " + currentActionIds.length + " h\u1ed3 s\u01a1!");
    
    if (currentProfile && currentActionIds.indexOf(currentProfile.id) >= 0) {
        closeDetail();
    } else {
        renderTable();
    }
}

// Má»Ÿ modal nháº­p lÃ½ do (Tráº£ láº¡i/Tá»« chá»‘i) Ä‘Æ¡n láº» tá»« hÃ ng káº¿t quáº£
function openReasonSingle(id, type) {
    currentActionIds = [id];
    currentActionType = type;
    
    const title = type === 'tralai' ? "X\u00e1c nh\u1eadn tr\u1ea3 l\u1ea1i h\u1ed3 s\u01a1" : "X\u00e1c nh\u1eadn t\u1eeb ch\u1ed1i gi\u1ea3i quy\u1ebft h\u1ed3 s\u01a1";
    const label = type === 'tralai' ? "L\u00fd do tr\u1ea3 l\u1ea1i h\u1ed3 s\u01a1 <span class=\"required-mark\">*</span>" : "L\u00fd do t\u1eeb ch\u1ed1i h\u1ed3 s\u01a1 <span class=\"required-mark\">*</span>";
    const buttonText = type === 'tralai' ? "X\u00e1c nh\u1eadn Tr\u1ea3 l\u1ea1i" : "X\u00e1c nh\u1eadn T\u1eeb ch\u1ed1i";
    
    document.getElementById('reasonTitle').innerText = title;
    document.getElementById('reasonLabel').innerHTML = label;
    document.getElementById('btnConfirmReason').innerText = buttonText;
    
    if (type === 'tralai') {
        document.getElementById('btnConfirmReason').className = 'btn btn-warning';
    } else {
        document.getElementById('btnConfirmReason').className = 'btn btn-danger';
    }
    
    document.getElementById('reasonText').value = '';
    document.getElementById('reasonText').classList.remove('is-invalid');
    document.getElementById('reasonError').classList.remove('active');
    
    openModal('modalReason');
}

// Má»Ÿ modal nháº­p lÃ½ do tá»« mÃ n hÃ¬nh xem chi tiáº¿t
function openReasonFromDetail(type) {
    if (!currentProfile) return;
    openReasonSingle(currentProfile.id, type);
}

// XÃ¡c nháº­n gá»­i lÃ½ do (Tráº£ láº¡i hoáº·c Tá»« chá»‘i)
function submitReason() {
    const reason = document.getElementById('reasonText').value.trim();
    if (!reason) {
        document.getElementById('reasonText').classList.add('is-invalid');
        document.getElementById('reasonError').classList.add('active');
        document.getElementById('reasonText').focus();
        return;
    }
    
    closeModal('modalReason');
    
    const statusVal = currentActionType === 'tralai' ? 'B\u1ecb tr\u1ea3 l\u1ea1i' : 'B\u1ecb t\u1eeb ch\u1ed1i';
    const statusClassVal = 'badge-danger';
    
    currentActionIds.forEach(id => {
        const p = mockProfiles.find(prof => prof.id === id);
        if (p) {
            p.status = statusVal;
            p.statusClass = statusClassVal;
            p.internalLogs.unshift({
                time: 'V\u1eeba xong',
                user: 'L\u00e3nh \u0111\u1ea1o ph\u00ea duy\u1ec7t TT\u0110K',
                action: currentActionType === 'tralai' ? 'Y\u00eau c\u1ea7u tr\u1ea3 l\u1ea1i ch\u1ec9nh s\u1eeda' : 'T\u1eeb ch\u1ed1i ph\u00ea duy\u1ec7t',
                comment: reason
            });
        }
    });

    saveProfiles();
    alert("\u0110\u00e3 ho\u00e0n t\u1ea5t thao t\u00e1c " + (currentActionType === 'tralai' ? "Tr\u1ea3 l\u1ea1i" : "T\u1eeb ch\u1ed1i") + " cho " + currentActionIds.length + " h\u1ed3 s\u01a1!");
    
    if (currentProfile && currentActionIds.indexOf(currentProfile.id) >= 0) {
        closeDetail();
    } else {
        renderTable();
    }
}

// KÃ½ sá»‘ lÃ´ hÃ ng loáº¡t tá»« danh sÃ¡ch tÃ­ch chá»n checkbox
function signBatch() {
    const selected = getSelectedRows();
    if (selected.length === 0) {
        alert('Vui lÃ²ng chá»n Ã­t nháº¥t má»™t há»“ sÆ¡ tá»« danh sÃ¡ch Ä‘á»ƒ kÃ½ sá»‘ lÃ´!');
        return;
    }
    currentActionIds = selected;
    document.getElementById('pinCode').value = '';
    document.getElementById('pinCode').classList.remove('is-invalid');
    document.getElementById('pinError').classList.remove('active');
    openModal('modalSign');
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
    const cachedProfiles = localStorage.getItem('custom_mock_profiles');
    if (cachedProfiles) {
        const customList = JSON.parse(cachedProfiles);
        if (customList.length < mockProfiles.length) {
            const customIds = customList.map(c => c.id);
            const missing = mockProfiles.filter(p => !customIds.includes(p.id));
            mockProfiles = [...customList, ...missing];
            localStorage.setItem('custom_mock_profiles', JSON.stringify(mockProfiles));
        } else {
            mockProfiles = customList;
        }
    } else {
        localStorage.setItem('custom_mock_profiles', JSON.stringify(mockProfiles));
    }
    
    // Gán cán bộ xử lý cho mock data để mô phỏng
    mockProfiles.forEach((p, idx) => {
        if (!p.handlingOfficer) {
            if (idx % 3 === 1) p.handlingOfficer = "Lê Anh Tuấn";
            else if (idx % 3 === 2) p.handlingOfficer = "Trần Quốc Khánh";
            else p.handlingOfficer = "Nguyễn Văn Cán Bộ";
        }
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
    
    const navTabs = document.querySelector('.nav-tabs');
    const headerTitle = document.querySelector('h1');

    if (navTabs) navTabs.style.display = 'none';
    if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - KÝ DUYỆT HỒ SƠ';
    
    currentListTab = 'dang_xu_ly'; // Lock this tab type so that other filters work correctly
    
    // Hide old toolbars if any
    const tbChoduyet = document.getElementById('toolbar-choduyet');
    if (tbChoduyet) tbChoduyet.style.display = 'none';
    const tbDuyetChoky = document.getElementById('toolbar-duyet-choky');
    if (tbDuyetChoky) tbDuyetChoky.style.display = 'none';
    const tbChoky = document.getElementById('toolbar-choky');
    if (tbChoky) tbChoky.style.display = 'none';
    
    // Show sign batch toolbar
    const tbChokyBatch = document.getElementById('toolbar-choky-batch');
    if (tbChokyBatch) tbChokyBatch.style.display = 'flex';

    renderFilterPanel();
    updateTabBadges();
    renderTable();
}

function toggleSort(column) {
    if (currentSortColumn === column) {
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortOrder = 'desc';
    }
    renderTable();
}

function getSortIcon(column) {
    if (currentSortColumn !== column) return '<i class="fa-solid fa-sort" style="font-size: 11px; margin-left: 4px; color: #CBD5E1;"></i>';
    return currentSortOrder === 'asc' 
        ? '<i class="fa-solid fa-sort-up" style="font-size: 11px; margin-left: 4px; color: var(--secondary-color);"></i>' 
        : '<i class="fa-solid fa-sort-down" style="font-size: 11px; margin-left: 4px; color: var(--secondary-color);"></i>';
}

// =============================================================
// Bổ sung UI ký duyệt Yêu cầu cung cấp thông tin cho Lãnh đạo
// =============================================================
const UC031_BASE = {
    initViewMode,
    renderFilterPanel,
    renderTable,
    switchListTab,
    closeDetail
};

let leaderWorkType = sessionStorage.getItem('uc031LeaderWorkType') || 'registration';
let selectedLeaderCcttId = null;

const leaderCcttRequests = [
    {
        id: 'CCTT-20260801-000201',
        registeredAt: '01/08/2026 09:15',
        submittedAt: '01/08/2026 10:30',
        customerId: 'KH-HUNG-02',
        requester: 'Ông Nguyễn Văn Hùng',
        address: 'Số 12 phố Duy Tân, phường Dịch Vọng Hậu, Hà Nội',
        source: 'Website khách hàng',
        criteria: 'Số đăng ký',
        inputData: '1505170802',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        resultType: 'hasData',
        fee: 15000,
        toSignReason: 'Cán bộ đã kiểm tra và trình ký',
        pdfVersion: 'PDF dự thảo v1'
    },
    {
        id: 'CCTT-20260801-000202',
        registeredAt: '01/08/2026 10:40',
        submittedAt: '01/08/2026 11:20',
        customerId: 'KH-MINHTAM-01',
        requester: 'Công ty Cổ phần Đầu tư Minh Tâm',
        address: 'Tầng 6, tòa nhà FPT, Cầu Giấy, Hà Nội',
        source: 'Cán bộ nhập liệu',
        criteria: 'Bên bảo đảm',
        inputData: 'Công dân Việt Nam - CCCD 091000000004',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        resultType: 'noData',
        fee: 0,
        toSignReason: 'Không có kết quả - không thu phí',
        pdfVersion: 'PDF dự thảo v1'
    },
    {
        id: 'CCTT-20260731-000177',
        registeredAt: '31/07/2026 15:05',
        submittedAt: '31/07/2026 16:00',
        customerId: 'KH-FPT-07',
        requester: 'Ngân hàng TMCP FPT',
        address: 'Tòa nhà FPT, Cầu Giấy, Hà Nội',
        source: 'Website khách hàng',
        criteria: 'Số khung',
        inputData: 'RLZ2026KHUNG0007VN',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        resultType: 'hasData',
        fee: 15000,
        paidAt: '31/07/2026 17:12',
        toSignReason: 'Thanh toán thành công',
        pdfVersion: 'PDF trình ký v2'
    },
    {
        id: 'CCTT-20260729-000165',
        registeredAt: '29/07/2026 08:40',
        submittedAt: '29/07/2026 09:50',
        customerId: 'KH-LANANH-03',
        requester: 'Bà Trần Lan Anh',
        address: 'Số 45 Nguyễn Chí Thanh, Đống Đa, Hà Nội',
        source: 'Cán bộ nhập liệu',
        criteria: 'Số đăng ký',
        inputData: '1505170855',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        resultType: 'noData',
        fee: 0,
        toSignReason: 'Không có kết quả - không thu phí',
        pdfVersion: 'PDF trình ký v1'
    },
    {
        id: 'CCTT-20260729-000166',
        registeredAt: '29/07/2026 10:05',
        submittedAt: '29/07/2026 11:10',
        customerId: 'KH-VIETTIN-11',
        requester: 'Ngân hàng TMCP Công thương Việt Nam - Chi nhánh Ba Đình',
        address: 'Số 34 Cửa Nam, Hoàn Kiếm, Hà Nội',
        source: 'Website khách hàng',
        criteria: 'Số khung',
        inputData: 'RLZ2026KHUNG0011VN',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        resultType: 'hasData',
        fee: 15000,
        paidAt: '29/07/2026 10:50',
        toSignReason: 'Có dữ liệu, khách hàng đã thanh toán',
        pdfVersion: 'PDF trình ký v1'
    },
    {
        id: 'CCTT-20260729-000167',
        registeredAt: '29/07/2026 13:25',
        submittedAt: '29/07/2026 14:00',
        customerId: 'KH-GIAY-02',
        requester: 'Công ty TNHH Vận tải Đông Bắc',
        address: 'Số 18 Nguyễn Văn Cừ, Long Biên, Hà Nội',
        source: 'Cán bộ nhập liệu',
        criteria: 'Bên bảo đảm',
        inputData: 'MST 0108899001 - Công ty TNHH Vận tải Đông Bắc',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        resultType: 'hasData',
        fee: 15000,
        paidAt: 'Thu trực tiếp tại quầy',
        toSignReason: 'Hồ sơ giấy đã thu phí, cán bộ trình ký',
        pdfVersion: 'PDF trình ký v2'
    },
    {
        id: 'CCTT-20260728-000162',
        registeredAt: '28/07/2026 09:30',
        submittedAt: '28/07/2026 10:25',
        customerId: 'KH-TECH-08',
        requester: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        address: 'Số 191 Bà Triệu, Hai Bà Trưng, Hà Nội',
        source: 'Website khách hàng',
        criteria: 'Số đăng ký',
        inputData: '1505170901',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        resultType: 'hasData',
        fee: 15000,
        paidAt: '28/07/2026 10:05',
        toSignReason: 'Đã kết xuất PDF kết quả tra cứu',
        pdfVersion: 'PDF trình ký v1'
    },
    {
        id: 'CCTT-20260730-000171',
        registeredAt: '30/07/2026 11:25',
        submittedAt: '30/07/2026 14:10',
        customerId: 'KH-ANPHU-05',
        requester: 'Công ty TNHH An Phú',
        address: 'Số 88 Lê Văn Lương, Thanh Xuân, Hà Nội',
        source: 'Cán bộ nhập liệu',
        criteria: 'Số đăng ký',
        inputData: '1505170868',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Bị trả lại',
        resultType: 'hasData',
        fee: 15000,
        toSignReason: 'Lãnh đạo trả lại để cán bộ sửa thông tin theo hồ sơ giấy',
        pdfVersion: 'PDF dự thảo v1'
    },
    {
        id: 'CCTT-20260728-000158',
        registeredAt: '28/07/2026 16:20',
        submittedAt: '28/07/2026 17:05',
        customerId: 'KH-HTC-04',
        requester: 'Công ty Cổ phần Xây dựng và Phát triển HTC',
        address: 'Đường số 5, cụm công nghiệp Tứ Hạ mở rộng, thành phố Huế',
        source: 'Website khách hàng',
        criteria: 'Số đăng ký',
        inputData: '1505170802',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Hoàn thành',
        resultType: 'hasData',
        fee: 15000,
        paidAt: '28/07/2026 17:40',
        toSignReason: 'Đã ký số PDF và trả kết quả',
        pdfVersion: 'PDF đã ký v1'
    },
    {
        id: 'CCTT-20260728-000157',
        registeredAt: '28/07/2026 09:05',
        submittedAt: '28/07/2026 09:55',
        customerId: 'KH-SONGDA-05',
        requester: 'Công ty Cổ phần Sông Đà',
        address: 'Số 1 Phạm Hùng, Nam Từ Liêm, Hà Nội',
        source: 'Website khách hàng',
        criteria: 'Số khung',
        inputData: 'SD2026KHUNG0005',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Hoàn thành',
        resultType: 'hasData',
        fee: 15000,
        paidAt: '28/07/2026 09:30',
        signedAt: '28/07/2026 10:20',
        toSignReason: 'Đã ký số PDF và trả kết quả',
        pdfVersion: 'PDF đã ký v2'
    },
    {
        id: 'CCTT-20260727-000151',
        registeredAt: '27/07/2026 15:20',
        submittedAt: '27/07/2026 16:10',
        customerId: 'KH-THUY-01',
        requester: 'Bà Phạm Minh Thủy',
        address: 'Số 21 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
        source: 'Cán bộ nhập liệu',
        criteria: 'Bên bảo đảm',
        inputData: 'CCCD 001199887766 - Phạm Minh Thủy',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Hoàn thành',
        resultType: 'noData',
        fee: 0,
        paidAt: 'Miễn phí',
        signedAt: '27/07/2026 16:45',
        toSignReason: 'Đã ký xác nhận không có dữ liệu',
        pdfVersion: 'PDF đã ký v1'
    },
    {
        id: 'CCTT-20260727-000149',
        registeredAt: '27/07/2026 09:10',
        submittedAt: '27/07/2026 10:15',
        customerId: 'KH-MINHHUNG-09',
        requester: 'Ông Lê Minh Hùng',
        address: 'Số 9 Nguyễn Trãi, Hà Đông, Hà Nội',
        source: 'Website khách hàng',
        criteria: 'Bên bảo đảm',
        inputData: 'CCCD 091000000099',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Bị từ chối',
        resultType: 'noData',
        fee: 0,
        toSignReason: 'Lãnh đạo từ chối hồ sơ',
        pdfVersion: 'PDF dự thảo v1'
    },
    {
        id: 'CCTT-20260726-000140',
        registeredAt: '26/07/2026 14:45',
        submittedAt: '26/07/2026 15:30',
        customerId: 'KH-ANBINH-10',
        requester: 'Công ty TNHH An Bình',
        address: 'Số 88 Trần Phú, Hà Đông, Hà Nội',
        source: 'Cán bộ nhập liệu',
        criteria: 'Số đăng ký',
        inputData: '1505170999',
        officer: 'Nguyễn Văn Cán Bộ',
        signer: 'Nguyễn Văn Cán Bộ',
        status: 'Bị từ chối',
        resultType: 'hasData',
        fee: 15000,
        paidAt: 'Thu trực tiếp tại quầy',
        rejectedAt: '26/07/2026 16:00',
        rejectReason: 'Hồ sơ giấy không đủ căn cứ xác định người yêu cầu.',
        toSignReason: 'Lãnh đạo từ chối hồ sơ giấy',
        pdfVersion: 'PDF dự thảo v1'
    }
];

let selectedLeaderCopyId = null;

const leaderCopyRequests = [
    {
        id: 'BS-20260801-000301',
        registeredAt: '01/08/2026 08:40',
        submittedAt: '01/08/2026 10:10',
        customerId: 'KH-VCB-04',
        requester: 'Ngân hàng TMCP Ngoại thương Việt Nam - Chi nhánh Cầu Giấy',
        address: 'Số 198 Trần Duy Hưng, phường Yên Hòa, Hà Nội',
        source: 'Website khách hàng',
        registrationNo: '1505170802',
        copyType: 'Bản sao điện tử',
        copyQty: '01 file PDF',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        fee: 30000,
        paidAt: '01/08/2026 09:58',
        draftFile: 'Bản sao điện tử dự thảo v2',
        originalCase: 'Đăng ký lần đầu',
        originalStatus: 'Hoàn thành',
        securedParty: 'Công ty Cổ phần Xây dựng và Phát triển HTC',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
        asset: 'Xe ô tô Toyota Camry, BKS 30H-123.45'
    },
    {
        id: 'BS-20260801-000302',
        registeredAt: '01/08/2026 09:05',
        submittedAt: '01/08/2026 10:35',
        customerId: 'KH-THUY-01',
        requester: 'Bà Phạm Minh Thủy',
        address: 'Số 21 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
        source: 'Cán bộ nhập liệu',
        registrationNo: '1505170855',
        copyType: 'Bản sao giấy',
        copyQty: '02 bản',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        fee: 40000,
        paidAt: 'Thu trực tiếp tại quầy',
        draftFile: '',
        originalCase: 'Đăng ký thay đổi',
        originalStatus: 'Hoàn thành',
        securedParty: 'Bà Phạm Minh Thủy',
        mortgagee: 'Ngân hàng TMCP Quân đội',
        asset: 'Quyền tài sản phát sinh từ hợp đồng mua bán căn hộ'
    },
    {
        id: 'BS-20260801-000303',
        registeredAt: '01/08/2026 09:50',
        submittedAt: '01/08/2026 11:05',
        customerId: 'KH-BIDV-07',
        requester: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam - Chi nhánh Hà Nội',
        address: 'Số 194 Trần Quang Khải, Hoàn Kiếm, Hà Nội',
        source: 'Website khách hàng',
        registrationNo: '1505170920',
        copyType: 'Bản sao điện tử',
        copyQty: '01 file PDF',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        fee: 30000,
        paidAt: '01/08/2026 10:20',
        draftFile: 'Bản sao điện tử dự thảo v1',
        originalCase: 'Đăng ký lần đầu',
        originalStatus: 'Hoàn thành',
        securedParty: 'Công ty Cổ phần Sản xuất Minh Long',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
        asset: 'Dây chuyền máy móc sản xuất gạch men'
    },
    {
        id: 'BS-20260801-000304',
        registeredAt: '01/08/2026 10:25',
        submittedAt: '01/08/2026 11:30',
        customerId: 'KH-GIAY-03',
        requester: 'Ông Trần Quốc Bảo',
        address: 'Số 6 Hoàng Hoa Thám, Ba Đình, Hà Nội',
        source: 'Cán bộ nhập liệu',
        registrationNo: '1505170944',
        copyType: 'Bản sao giấy',
        copyQty: '01 bản',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        fee: 30000,
        paidAt: 'Thu trực tiếp tại quầy',
        draftFile: '',
        originalCase: 'Đăng ký thay đổi',
        originalStatus: 'Hoàn thành',
        securedParty: 'Ông Trần Quốc Bảo',
        mortgagee: 'Ngân hàng TMCP Sài Gòn Thương Tín',
        asset: 'Xe ô tô Mazda CX5, BKS 30K-456.78'
    },
    {
        id: 'BS-20260731-000300',
        registeredAt: '31/07/2026 15:15',
        submittedAt: '31/07/2026 16:05',
        customerId: 'KH-TECH-08',
        requester: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        address: 'Số 191 Bà Triệu, Hai Bà Trưng, Hà Nội',
        source: 'Website khách hàng',
        registrationNo: '1505170990',
        copyType: 'Bản sao điện tử',
        copyQty: '01 file PDF',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Chờ ký',
        fee: 30000,
        paidAt: '31/07/2026 15:40',
        draftFile: 'Bản sao điện tử dự thảo v3',
        originalCase: 'Xóa đăng ký',
        originalStatus: 'Hoàn thành',
        securedParty: 'Công ty TNHH Thép Việt',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        asset: 'Kho hàng thép xây dựng tại KCN Quang Minh'
    },
    {
        id: 'BS-20260731-000299',
        registeredAt: '31/07/2026 14:00',
        submittedAt: '31/07/2026 15:20',
        customerId: 'KH-HOANG-07',
        requester: 'Ông Lê Đức Hoàng',
        address: 'Số 8 Nguyễn Trãi, Hà Đông, Hà Nội',
        source: 'Cán bộ nhập liệu',
        registrationNo: '1505170868',
        copyType: 'Bản sao điện tử',
        copyQty: '01 file PDF',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Bị trả lại',
        fee: 30000,
        paidAt: '31/07/2026 14:42',
        draftFile: 'Bản sao điện tử dự thảo v1',
        originalCase: 'Xóa đăng ký',
        originalStatus: 'Hoàn thành',
        securedParty: 'Ông Lê Đức Hoàng',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam',
        asset: 'Máy xúc Komatsu PC200-8'
    },
    {
        id: 'BS-20260730-000288',
        registeredAt: '30/07/2026 10:15',
        submittedAt: '30/07/2026 11:05',
        customerId: 'KH-ANPHU-05',
        requester: 'Công ty TNHH An Phú',
        address: 'Số 88 Lê Văn Lương, Thanh Xuân, Hà Nội',
        source: 'Cán bộ nhập liệu',
        registrationNo: '1505170901',
        copyType: 'Bản sao giấy',
        copyQty: '03 bản',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Đã duyệt - chờ trả kết quả',
        fee: 60000,
        paidAt: '30/07/2026 10:50',
        draftFile: '',
        originalCase: 'Đăng ký lần đầu',
        originalStatus: 'Hoàn thành',
        securedParty: 'Công ty TNHH An Phú',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        asset: 'Dây chuyền máy móc sản xuất bao bì'
    },
    {
        id: 'BS-20260730-000287',
        registeredAt: '30/07/2026 09:40',
        submittedAt: '30/07/2026 10:35',
        customerId: 'KH-MAI-03',
        requester: 'Bà Nguyễn Thị Mai',
        address: 'Số 70 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        source: 'Cán bộ nhập liệu',
        registrationNo: '1505170755',
        copyType: 'Bản sao giấy',
        copyQty: '02 bản',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Đã duyệt - chờ trả kết quả',
        fee: 60000,
        paidAt: 'Thu trực tiếp tại quầy',
        draftFile: '',
        signedAt: '30/07/2026 13:40',
        signer: 'Nguyễn Văn Lãnh Đạo',
        originalCase: 'Đăng ký lần đầu',
        originalStatus: 'Hoàn thành',
        securedParty: 'Bà Nguyễn Thị Mai',
        mortgagee: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        asset: 'Quyền tài sản phát sinh từ hợp đồng mua bán căn hộ'
    },
    {
        id: 'BS-20260728-000271',
        registeredAt: '28/07/2026 13:10',
        submittedAt: '28/07/2026 14:00',
        customerId: 'KH-HUNG-02',
        requester: 'Ông Nguyễn Văn Hùng',
        address: 'Số 12 phố Duy Tân, Cầu Giấy, Hà Nội',
        source: 'Website khách hàng',
        registrationNo: '1505170802',
        copyType: 'Bản sao điện tử',
        copyQty: '01 file PDF',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Hoàn thành',
        fee: 30000,
        paidAt: '28/07/2026 13:45',
        draftFile: 'Bản sao điện tử đã ký số',
        originalCase: 'Đăng ký lần đầu',
        originalStatus: 'Hoàn thành',
        securedParty: 'Ông Nguyễn Văn Hùng',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam',
        asset: 'Xe ô tô Ford Ranger, BKS 30K-678.90'
    },
    {
        id: 'BS-20260728-000270',
        registeredAt: '28/07/2026 08:35',
        submittedAt: '28/07/2026 09:25',
        customerId: 'KH-VCB-04',
        requester: 'Ngân hàng TMCP Ngoại thương Việt Nam - Chi nhánh Cầu Giấy',
        address: 'Số 198 Trần Duy Hưng, phường Yên Hòa, Hà Nội',
        source: 'Website khách hàng',
        registrationNo: '1505170803',
        copyType: 'Bản sao điện tử',
        copyQty: '01 file PDF',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Hoàn thành',
        fee: 30000,
        paidAt: '28/07/2026 08:50',
        signedAt: '28/07/2026 10:10',
        draftFile: 'Bản sao điện tử đã ký số',
        originalCase: 'Đăng ký thay đổi',
        originalStatus: 'Hoàn thành',
        securedParty: 'Công ty TNHH Minh Đức',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam',
        asset: 'Xe ô tô Hyundai SantaFe, BKS 30G-889.90'
    },
    {
        id: 'BS-20260727-000266',
        registeredAt: '27/07/2026 13:30',
        submittedAt: '27/07/2026 14:20',
        customerId: 'KH-LANANH-03',
        requester: 'Bà Trần Lan Anh',
        address: 'Số 45 Nguyễn Chí Thanh, Đống Đa, Hà Nội',
        source: 'Website khách hàng',
        registrationNo: '1505170855',
        copyType: 'Bản sao giấy',
        copyQty: '01 bản',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Hoàn thành',
        fee: 30000,
        paidAt: '27/07/2026 13:45',
        signedAt: '27/07/2026 15:10',
        returnedAt: '27/07/2026 16:20',
        draftFile: '',
        originalCase: 'Đăng ký lần đầu',
        originalStatus: 'Hoàn thành',
        securedParty: 'Bà Trần Lan Anh',
        mortgagee: 'Ngân hàng TMCP Công thương Việt Nam',
        asset: 'Máy móc thiết bị sản xuất may mặc'
    },
    {
        id: 'BS-20260726-000255',
        registeredAt: '26/07/2026 10:10',
        submittedAt: '26/07/2026 11:00',
        customerId: 'KH-DOTHIDEV',
        requester: 'Công ty TNHH Phát triển Đô thị',
        address: 'Số 12 Lê Văn Lương, Thanh Xuân, Hà Nội',
        source: 'Cán bộ nhập liệu',
        registrationNo: '1505170701',
        copyType: 'Bản sao điện tử',
        copyQty: '01 file PDF',
        officer: 'Nguyễn Văn Cán Bộ',
        status: 'Bị từ chối',
        fee: 30000,
        paidAt: 'Thu trực tiếp tại quầy',
        rejectedAt: '26/07/2026 11:45',
        rejectReason: 'Số đăng ký hồ sơ gốc không còn hiệu lực tại thời điểm ký.',
        draftFile: 'Bản sao điện tử dự thảo v1',
        originalCase: 'Xóa đăng ký',
        originalStatus: 'Không còn hiệu lực',
        securedParty: 'Công ty TNHH Phát triển Đô thị',
        mortgagee: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
        asset: 'Tài sản bảo đảm đã bị xóa đăng ký'
    }
];

function renderLeaderActionButton(className, title, iconClass, onClick, enabled) {
    const disabledStyle = enabled ? '' : 'style="opacity:0.35;pointer-events:none;cursor:not-allowed"';
    const click = enabled ? `onclick="event.stopPropagation(); ${onClick}"` : '';
    return `<button class="icon-btn ${className}" title="${title}" ${click} ${disabledStyle}><i class="${iconClass}"></i></button>`;
}

function findLeaderServiceRequest(id) {
    return leaderCcttRequests.find(x => x.id === id) || leaderCopyRequests.find(x => x.id === id);
}

function getLeaderCcttTargetStatuses() {
    if (currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly') return ['Chờ ký'];
    if (currentListTab === 'bitralai') return ['Bị trả lại'];
    if (currentListTab === 'da_xu_ly') return ['Hoàn thành', 'Bị từ chối'];
    return ['Chờ ký'];
}

function getLeaderCcttListTitle() {
    if (currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly') return 'Danh sách yêu cầu cung cấp thông tin chờ ký';
    if (currentListTab === 'bitralai') return 'Danh sách yêu cầu cung cấp thông tin bị trả lại';
    if (currentListTab === 'da_xu_ly') return 'Danh sách yêu cầu cung cấp thông tin đã xử lý';
    return 'Danh sách yêu cầu cung cấp thông tin chờ ký';
}

function getLeaderCopyTargetStatuses() {
    if (currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly') return ['Chờ ký'];
    if (currentListTab === 'bitralai') return ['Bị trả lại'];
    if (currentListTab === 'da_xu_ly') return ['Hoàn thành', 'Bị từ chối', 'Đã duyệt - chờ trả kết quả'];
    return ['Chờ ký'];
}

function getLeaderCopyListTitle() {
    if (currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly') return 'Danh sách yêu cầu cung cấp bản sao chờ ký';
    if (currentListTab === 'bitralai') return 'Danh sách yêu cầu cung cấp bản sao bị trả lại';
    if (currentListTab === 'da_xu_ly') return 'Danh sách yêu cầu cung cấp bản sao đã xử lý';
    return 'Danh sách yêu cầu cung cấp bản sao chờ ký';
}

function syncLeaderWorkTabs() {
    const tabs = document.getElementById('leader-work-type-tabs');
    if (!tabs) return;
    tabs.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.workType === leaderWorkType);
    });
    const badge = document.getElementById('badge-cctt-leader');
    if (badge) badge.innerText = leaderCcttRequests.length;
    const copyBadge = document.getElementById('badge-copy-leader');
    if (copyBadge) copyBadge.innerText = leaderCopyRequests.length;
}

function switchLeaderWorkType(type, element) {
    leaderWorkType = type;
    sessionStorage.setItem('uc031LeaderWorkType', leaderWorkType);
    document.querySelectorAll('#leader-work-type-tabs .nav-tab').forEach(t => t.classList.remove('active'));
    if (element) element.classList.add('active');
    renderFilterPanel();
    renderTable(true);
}

function syncLeaderRegistrationToolbar() {
    const batchToolbar = document.getElementById('toolbar-choky-batch');
    if (!batchToolbar) return;
    if (leaderWorkType !== 'registration') return;
    const isSignStage = currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly';
    batchToolbar.style.display = isSignStage ? 'flex' : 'none';
    batchToolbar.innerHTML = '<button class="btn btn-primary" onclick="signBatch()"><i class="fa-solid fa-file-signature"></i> Ký số lô (Hàng loạt)</button>';
}

function getLeaderRegistrationTitle() {
    if (currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly') return 'Danh sách phiếu đăng ký chờ ký';
    if (currentListTab === 'da_xu_ly') return 'Danh sách phiếu đăng ký đã xử lý';
    if (currentListTab === 'bitralai') return 'Danh sách phiếu đăng ký bị trả lại';
    return 'Danh sách phiếu đăng ký chờ ký';
}

initViewMode = function () {
    UC031_BASE.initViewMode();
    const navTabs = document.querySelector('.nav-tabs');
    const headerTitle = document.querySelector('h1');
    const urlParams = new URLSearchParams(window.location.search);
    const viewMode = urlParams.get('view');
    if (navTabs) navTabs.style.display = 'flex';
    if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - LÃNH ĐẠO KÝ DUYỆT HỒ SƠ';
    currentListTab = ['dang_xu_ly', 'da_xu_ly', 'bitralai', 'duyet-choky'].includes(viewMode) ? viewMode : 'duyet-choky';
    document.querySelectorAll('#leader-stage-tabs .nav-tab').forEach(t => {
        t.classList.toggle('active', (t.getAttribute('onclick') || '').includes(currentListTab));
    });
    syncLeaderWorkTabs();
    renderFilterPanel();
    renderTable(true);
};

switchListTab = function (tab, element) {
    document.querySelectorAll('#leader-stage-tabs .nav-tab').forEach(t => t.classList.remove('active'));
    if (element) element.classList.add('active');
    currentListTab = tab;
    renderFilterPanel();
    renderTable(true);
    syncLeaderWorkTabs();
};

renderFilterPanel = function () {
    syncLeaderWorkTabs();
    if (leaderWorkType === 'cctt') {
        const container = document.getElementById('filter-card-container');
        if (!container) return;
        const isSignStage = currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly';
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group">
                    <label class="form-label">Tìm kiếm</label>
                    <input type="text" class="form-control" id="leader-cctt-search" placeholder="Mã hồ sơ, người yêu cầu, dữ liệu tra cứu...">
                </div>
                <div class="form-group">
                    <label class="form-label">Mã khách hàng</label>
                    <input type="text" class="form-control" id="leader-cctt-customer" placeholder="Nhập mã khách hàng...">
                </div>
                <div class="form-group">
                    <label class="form-label">Cán bộ trình ký</label>
                    <input type="text" class="form-control" id="leader-cctt-officer" placeholder="Nhập tên cán bộ trình...">
                </div>
                <div class="form-group">
                    <label class="form-label">Lãnh đạo ký</label>
                    <input type="text" class="form-control" id="leader-cctt-leader" placeholder="Nhập tên Lãnh đạo được phân công...">
                </div>
                <div class="form-group">
                    <label class="form-label">Tiêu chí yêu cầu cung cấp thông tin</label>
                    <select class="form-select" id="leader-cctt-criteria">
                        <option value="">Tất cả</option>
                        <option value="Số đăng ký">Số đăng ký</option>
                        <option value="Bên bảo đảm">Bên bảo đảm</option>
                        <option value="Số khung">Số khung</option>
                    </select>
                </div>
                ${isSignStage ? `
                <div class="form-group">
                    <label class="form-label">Nguồn tiếp nhận</label>
                    <select class="form-select" id="leader-cctt-source">
                        <option value="">Tất cả</option>
                        <option value="Website khách hàng">Website Khách hàng</option>
                        <option value="Mobile khách hàng">Mobile Khách hàng</option>
                        <option value="Cán bộ nhập liệu">Cán bộ nhập liệu</option>
                    </select>
                </div>` : ''}
                <div class="form-group">
                    <label class="form-label">Từ ngày</label>
                    <input type="date" class="form-control" id="leader-cctt-fromdate">
                </div>
                <div class="form-group">
                    <label class="form-label">Đến ngày</label>
                    <input type="date" class="form-control" id="leader-cctt-todate">
                </div>
            </div>
            <div style="text-align:right;margin-top:15px">
                <button class="btn btn-outline-secondary" onclick="renderTable(true)" style="margin-right:8px">Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="renderTable(true)">Tìm kiếm</button>
            </div>
        `;
        return;
    }
    if (leaderWorkType === 'copy') {
        const container = document.getElementById('filter-card-container');
        if (!container) return;
        const isSignStage = currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly';
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group">
                    <label class="form-label">Tìm kiếm</label>
                    <input type="text" class="form-control" id="leader-copy-search" placeholder="Mã hồ sơ, người yêu cầu, số đăng ký...">
                </div>
                <div class="form-group">
                    <label class="form-label">Mã khách hàng</label>
                    <input type="text" class="form-control" id="leader-copy-customer" placeholder="Nhập mã khách hàng...">
                </div>
                <div class="form-group">
                    <label class="form-label">Cán bộ trình ký</label>
                    <input type="text" class="form-control" id="leader-copy-officer" placeholder="Nhập tên cán bộ trình...">
                </div>
                <div class="form-group">
                    <label class="form-label">Loại cung cấp bản sao</label>
                    <select class="form-select" id="leader-copy-type">
                        <option value="">Tất cả</option>
                        <option value="Bản sao điện tử">Bản sao điện tử</option>
                        <option value="Bản sao giấy">Bản sao giấy</option>
                    </select>
                </div>
                ${isSignStage ? `
                <div class="form-group">
                    <label class="form-label">Nguồn tiếp nhận</label>
                    <select class="form-select" id="leader-copy-source">
                        <option value="">Tất cả</option>
                        <option value="Website khách hàng">Website Khách hàng</option>
                        <option value="Mobile khách hàng">Mobile Khách hàng</option>
                        <option value="Cán bộ nhập liệu">Cán bộ nhập liệu</option>
                    </select>
                </div>` : ''}
                <div class="form-group">
                    <label class="form-label">Từ ngày</label>
                    <input type="date" class="form-control" id="leader-copy-fromdate">
                </div>
                <div class="form-group">
                    <label class="form-label">Đến ngày</label>
                    <input type="date" class="form-control" id="leader-copy-todate">
                </div>
            </div>
            <div style="text-align:right;margin-top:15px">
                <button class="btn btn-outline-secondary" onclick="renderFilterPanel(); renderTable(true)" style="margin-right:8px">Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="renderTable(true)">Tìm kiếm</button>
            </div>
        `;
        return;
    }
    UC031_BASE.renderFilterPanel();
    syncLeaderWorkTabs();
};

renderTable = function (resetPage = false) {
    syncLeaderWorkTabs();
    if (leaderWorkType === 'cctt') {
        renderLeaderCcttTable();
        return;
    }
    if (leaderWorkType === 'copy') {
        renderLeaderCopyTable();
        return;
    }
    syncLeaderRegistrationToolbar();
    UC031_BASE.renderTable(resetPage);
    const title = document.querySelector('.card-section h3');
    if (title) title.innerText = getLeaderRegistrationTitle();
};

function renderLeaderCcttTable() {
    const isSignStage = currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly';
    const isProcessedStage = currentListTab === 'da_xu_ly';
    const isReturnedStage = currentListTab === 'bitralai';
    const targetStatuses = getLeaderCcttTargetStatuses();
    const title = document.querySelector('.card-section h3');
    if (title) title.innerText = getLeaderCcttListTitle();
    const batchToolbar = document.getElementById('toolbar-choky-batch');
    if (batchToolbar) {
        batchToolbar.style.display = isReturnedStage || isProcessedStage ? 'none' : 'flex';
        batchToolbar.innerHTML = isSignStage
            ? '<button class="btn btn-primary" onclick="signBatch()"><i class="fa-solid fa-file-signature"></i> Ký số lô (Hàng loạt)</button>'
            : `<button class="btn btn-danger" onclick="ccttRejectBatch()">✖ Từ chối</button>
               <button class="btn btn-success" onclick="ccttApproveBatch()">✔ Duyệt</button>`;
    }
    const thead = document.getElementById('table-headers-container');
    const tbody = document.getElementById('table-data');
    thead.innerHTML = isSignStage ? `
        <tr>
            <th style="width:40px;text-align:center"><input type="checkbox" id="checkAll" onclick="toggleCheckAll(this)"></th>
            <th style="width:50px;text-align:center">STT</th>
            <th style="width:170px">Mã hồ sơ</th>
            <th style="width:220px">Người yêu cầu</th>
            <th style="width:150px">Tiêu chí</th>
            <th style="width:230px">Giá trị tiêu chí</th>
            <th style="width:150px">Nguồn tiếp nhận</th>
            <th style="width:180px">Nguồn chuyển sang Chờ ký</th>
            <th style="width:110px">Trạng thái</th>
            <th style="width:170px;text-align:center">Thao tác</th>
        </tr>
    ` : `
        <tr>
            <th style="width:40px;text-align:center"><input type="checkbox" id="checkAll" onclick="toggleCheckAll(this)"></th>
            <th style="width:50px;text-align:center">STT</th>
            <th style="width:170px">Mã hồ sơ</th>
            <th style="width:150px">Thời điểm đăng ký</th>
            <th style="width:220px">Người yêu cầu<br><span style="font-weight:500;color:var(--text-muted)">Địa chỉ</span></th>
            <th style="width:150px">Tiêu chí</th>
            <th style="width:230px">Giá trị tiêu chí</th>
            <th style="width:150px">Cán bộ trình ký</th>
            <th style="width:150px">Thời điểm trình ký</th>
            <th style="width:110px">Trạng thái</th>
            <th style="width:150px;text-align:center">Thao tác</th>
        </tr>
    `;
    const search = document.getElementById('leader-cctt-search')?.value.toLowerCase().trim() || '';
    const customer = document.getElementById('leader-cctt-customer')?.value.toLowerCase().trim() || '';
    const criteria = document.getElementById('leader-cctt-criteria')?.value || '';
    const officer = document.getElementById('leader-cctt-officer')?.value.toLowerCase().trim() || '';
    const source = document.getElementById('leader-cctt-source')?.value || '';
    const rows = leaderCcttRequests.filter(x => {
        if (!targetStatuses.includes(x.status)) return false;
        if (search && !`${x.id} ${x.requester} ${x.inputData}`.toLowerCase().includes(search)) return false;
        if (customer && !x.customerId.toLowerCase().includes(customer)) return false;
        if (criteria && x.criteria !== criteria) return false;
        if (officer && !x.officer.toLowerCase().includes(officer)) return false;
        if (isSignStage && source && x.source !== source) return false;
        return true;
    });
    const colSpan = isSignStage ? 10 : 11;
    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align:center;padding:30px;color:var(--text-muted)">Không có yêu cầu cung cấp thông tin ở trạng thái ${targetStatuses.join(', ')}.</td></tr>`;
    } else {
        tbody.innerHTML = rows.map((row, idx) => {
            const isPaperRow = row.source === 'Cán bộ nhập liệu';
            const canSign = isSignStage && row.status === 'Chờ ký';
            const canReturnOrReject = canSign && isPaperRow;
            const actions = `${renderLeaderActionButton('sign', 'Ký số', 'fa-solid fa-file-signature', `openSignSingle('${row.id}')`, canSign)}
                ${renderLeaderActionButton('return', 'Trả lại', 'fa-solid fa-reply', `openReasonSingle('${row.id}', 'tralai')`, canReturnOrReject)}
                ${renderLeaderActionButton('reject', 'Từ chối', 'fa-solid fa-ban', `openReasonSingle('${row.id}', 'tuchoi')`, canReturnOrReject)}`;
            return isSignStage ? `
                <tr style="cursor:pointer" onclick="openLeaderCcttDetail('${row.id}')">
                    <td onclick="event.stopPropagation()"><input type="checkbox" class="row-checkbox" value="${row.id}"></td>
                    <td style="text-align:center">${idx + 1}</td>
                    <td><span class="action-link"><b>${row.id}</b></span></td>
                    <td>${row.requester}</td>
                    <td>${row.criteria}</td>
                    <td>${row.inputData}</td>
                    <td>${row.source}</td>
                    <td>${row.toSignReason || '—'}</td>
                    <td><span class="badge ${row.status === 'Hoàn thành' ? 'badge-success' : row.status === 'Bị từ chối' || row.status === 'Bị trả lại' ? 'badge-danger' : 'badge-info'}">${row.status}</span></td>
                    <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${actions}</td>
                </tr>
            ` : `
                <tr style="cursor:pointer" onclick="openLeaderCcttDetail('${row.id}')">
                    <td onclick="event.stopPropagation()"><input type="checkbox" class="row-checkbox" value="${row.id}"></td>
                    <td style="text-align:center">${idx + 1}</td>
                    <td><span class="action-link"><b>${row.id}</b></span></td>
                    <td>${row.registeredAt}</td>
                    <td><b>${row.requester}</b><br><span style="color:var(--text-muted);font-size:12px">${row.address}</span></td>
                    <td>${row.criteria}</td>
                    <td>${row.inputData}</td>
                    <td>${row.officer}</td>
                    <td>${row.submittedAt}</td>
                    <td><span class="badge ${row.status === 'Hoàn thành' ? 'badge-success' : row.status === 'Bị từ chối' || row.status === 'Bị trả lại' ? 'badge-danger' : 'badge-warning'}">${row.status}</span></td>
                    <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${actions}</td>
                </tr>
            `;
        }).join('');
    }
    document.getElementById('page-start-index').innerText = rows.length ? '1' : '0';
    document.getElementById('page-end-index').innerText = rows.length;
    document.getElementById('total-records').innerText = rows.length;
    document.getElementById('pagination-buttons').innerHTML = '<button class="btn btn-outline-secondary" disabled style="padding:4px 10px;font-size:12px">1</button>';
}

function renderLeaderCopyTable() {
    const isSignStage = currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly';
    const targetStatuses = getLeaderCopyTargetStatuses();
    const batchToolbar = document.getElementById('toolbar-choky-batch');
    if (batchToolbar) {
        batchToolbar.style.display = isSignStage ? 'flex' : 'none';
        batchToolbar.innerHTML = '<button class="btn btn-primary" onclick="signBatch()"><i class="fa-solid fa-file-signature"></i> Ký số lô (Bản sao điện tử)</button>';
    }
    const title = document.querySelector('.card-section h3');
    if (title) title.innerText = getLeaderCopyListTitle();
    document.getElementById('table-headers-container').innerHTML = `
        <tr>
            <th style="width:40px;text-align:center"><input type="checkbox" id="checkAll" onclick="toggleCheckAll(this)"></th>
            <th style="width:50px;text-align:center">STT</th>
            <th style="width:170px">Mã hồ sơ</th>
            <th style="width:220px">Người yêu cầu</th>
            <th style="width:130px">Số đăng ký</th>
            <th style="width:140px">Loại cung cấp bản sao</th>
            <th style="width:90px">Số lượng</th>
            <th style="width:150px">Nguồn tiếp nhận</th>
            <th style="width:150px">Cán bộ trình ký</th>
            <th style="width:150px">Thời điểm trình ký</th>
            <th style="width:150px">Trạng thái</th>
            <th style="width:180px;text-align:center">Thao tác</th>
        </tr>
    `;
    const search = document.getElementById('leader-copy-search')?.value.toLowerCase().trim() || '';
    const customer = document.getElementById('leader-copy-customer')?.value.toLowerCase().trim() || '';
    const copyType = document.getElementById('leader-copy-type')?.value || '';
    const officer = document.getElementById('leader-copy-officer')?.value.toLowerCase().trim() || '';
    const source = document.getElementById('leader-copy-source')?.value || '';
    const rows = leaderCopyRequests.filter(x => {
        if (!targetStatuses.includes(x.status)) return false;
        if (search && !`${x.id} ${x.requester} ${x.registrationNo}`.toLowerCase().includes(search)) return false;
        if (customer && !x.customerId.toLowerCase().includes(customer)) return false;
        if (copyType && x.copyType !== copyType) return false;
        if (officer && !x.officer.toLowerCase().includes(officer)) return false;
        if (isSignStage && source && x.source !== source) return false;
        return true;
    });
    const tbody = document.getElementById('table-data');
    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="12" style="text-align:center;padding:30px;color:var(--text-muted)">Không có yêu cầu cung cấp bản sao ở trạng thái ${targetStatuses.join(', ')}.</td></tr>`;
    } else {
        tbody.innerHTML = rows.map((row, idx) => {
            const isWaiting = row.status === 'Chờ ký';
            const isElectronic = row.copyType === 'Bản sao điện tử';
            const isOfficerInput = row.source === 'Cán bộ nhập liệu';
            const canDigitalSign = isWaiting && isElectronic;
            const canPaperApprove = isWaiting && row.copyType === 'Bản sao giấy';
            const canReturnOrReject = isWaiting && isOfficerInput;
            const checkboxDisabled = canDigitalSign ? '' : 'disabled title="Chỉ chọn lô đối với bản sao điện tử ở trạng thái Chờ ký"';
            const primaryAction = isElectronic
                ? renderLeaderActionButton('sign', 'Ký số', 'fa-solid fa-file-signature', `openSignSingle('${row.id}')`, canDigitalSign)
                : renderLeaderActionButton('approve', 'Ký duyệt', 'fa fa-check', `approveCopyPaperSingle('${row.id}')`, canPaperApprove);
            const actions = `${primaryAction}
                ${renderLeaderActionButton('return', 'Trả lại', 'fa-solid fa-reply', `openReasonSingle('${row.id}', 'tralai')`, canReturnOrReject)}
                ${renderLeaderActionButton('reject', 'Từ chối', 'fa-solid fa-ban', `openReasonSingle('${row.id}', 'tuchoi')`, canReturnOrReject)}`;
            const badgeClass = row.status === 'Hoàn thành' || row.status === 'Đã duyệt - chờ trả kết quả'
                ? 'badge-success'
                : row.status === 'Bị từ chối' || row.status === 'Bị trả lại'
                    ? 'badge-danger'
                    : 'badge-info';
            return `
                <tr style="cursor:pointer" onclick="openLeaderCopyDetail('${row.id}')">
                    <td onclick="event.stopPropagation()"><input type="checkbox" class="row-checkbox" value="${row.id}" ${checkboxDisabled}></td>
                    <td style="text-align:center">${idx + 1}</td>
                    <td><span class="action-link"><b>${row.id}</b></span></td>
                    <td><b>${row.requester}</b><br><span style="color:var(--text-muted);font-size:12px">${row.address}</span></td>
                    <td><code>${row.registrationNo}</code></td>
                    <td>${row.copyType}</td>
                    <td>${row.copyQty}</td>
                    <td>${row.source}</td>
                    <td>${row.officer}</td>
                    <td>${row.submittedAt}</td>
                    <td><span class="badge ${badgeClass}">${row.status}</span></td>
                    <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${actions}</td>
                </tr>
            `;
        }).join('');
    }
    document.getElementById('page-start-index').innerText = rows.length ? '1' : '0';
    document.getElementById('page-end-index').innerText = rows.length;
    document.getElementById('total-records').innerText = rows.length;
    document.getElementById('pagination-buttons').innerHTML = '<button class="btn btn-outline-secondary" disabled style="padding:4px 10px;font-size:12px">1</button>';
}

function openLeaderCopyDetail(id) {
    const item = leaderCopyRequests.find(x => x.id === id);
    if (!item) return;
    selectedLeaderCopyId = id;
    selectedLeaderCcttId = null;
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-detail').classList.add('active');
    document.getElementById('detail-id-display').innerText = item.id;
    const badge = document.getElementById('detail-status');
    badge.className = `badge ${item.status === 'Hoàn thành' || item.status === 'Đã duyệt - chờ trả kết quả' ? 'badge-success' : (item.status === 'Bị từ chối' || item.status === 'Bị trả lại') ? 'badge-danger' : 'badge-info'}`;
    badge.innerText = item.status;
    document.getElementById('toggle-diff-container').style.display = 'none';
    document.getElementById('lifecycle-timeline').innerHTML = `
        <li class="timeline-item active"><div class="timeline-title">Cán bộ trình</div><div class="timeline-date">${item.submittedAt}</div></li>
        <li class="timeline-item"><div class="timeline-title">${item.copyType === 'Bản sao điện tử' ? 'Ký số bản sao điện tử' : 'Ký duyệt bản sao giấy'}</div><div class="timeline-date">${item.status === 'Chờ ký' ? 'Đang chờ' : 'Đã xử lý'}</div></li>
    `;
    document.getElementById('internal-log-content').innerHTML = `<div><b>${item.submittedAt}</b> - ${item.officer} trình yêu cầu cung cấp bản sao lên Lãnh đạo.</div>`;
    document.getElementById('tab-controls-container').style.display = 'none';
    document.getElementById('tab-contents-container').innerHTML = renderLeaderCopyDetailContent(item);
    document.getElementById('group-officer-opinion').style.display = 'none';

    const isWaiting = item.status === 'Chờ ký';
    const canDigitalSign = isWaiting && item.copyType === 'Bản sao điện tử';
    const canPaperApprove = isWaiting && item.copyType === 'Bản sao giấy';
    const canReturnOrReject = isWaiting && item.source === 'Cán bộ nhập liệu';
    const primaryButton = item.copyType === 'Bản sao điện tử'
        ? `<button class="btn btn-primary" onclick="openSignFromDetail()" ${canDigitalSign ? '' : 'disabled'}><i class="fa-solid fa-file-signature"></i> Ký số</button>`
        : `<button class="btn btn-success" onclick="approveCopyPaperSingle('${item.id}')" ${canPaperApprove ? '' : 'disabled'}><i class="fa fa-check"></i> Ký duyệt</button>`;
    document.getElementById('detail-toolbar-buttons').innerHTML = `
        <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
        ${primaryButton}
        <button class="btn btn-outline-secondary" onclick="openReasonFromDetail('tralai')" ${canReturnOrReject ? '' : 'disabled'}><i class="fa-solid fa-reply"></i> Trả lại</button>
        <button class="btn btn-danger" onclick="openReasonFromDetail('tuchoi')" ${canReturnOrReject ? '' : 'disabled'}><i class="fa-solid fa-ban"></i> Từ chối</button>
    `;
}

function renderLeaderCopyDetailContent(item) {
    const hasDigitalFile = item.copyType === 'Bản sao điện tử';
    return `
        <div class="card-section" style="box-shadow:none;border:none;padding:0">
            <h3 class="section-title">Thông tin yêu cầu cung cấp bản sao</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">Mã hồ sơ</div><div class="info-value"><b>${item.id}</b></div></div>
                <div class="info-group"><div class="info-label">Mã khách hàng</div><div class="info-value"><code>${item.customerId}</code></div></div>
                <div class="info-group"><div class="info-label">Người yêu cầu</div><div class="info-value">${item.requester}</div></div>
                <div class="info-group"><div class="info-label">Địa chỉ</div><div class="info-value">${item.address}</div></div>
                <div class="info-group"><div class="info-label">Nguồn tiếp nhận</div><div class="info-value">${item.source}</div></div>
                <div class="info-group"><div class="info-label">Thời điểm đăng ký</div><div class="info-value">${item.registeredAt}</div></div>
                <div class="info-group"><div class="info-label">Số đăng ký hồ sơ gốc</div><div class="info-value"><code>${item.registrationNo}</code></div></div>
                <div class="info-group"><div class="info-label">Loại cung cấp bản sao</div><div class="info-value">${item.copyType}</div></div>
                <div class="info-group"><div class="info-label">Số lượng bản sao</div><div class="info-value">${item.copyQty}</div></div>
                <div class="info-group"><div class="info-label">Cán bộ trình ký</div><div class="info-value">${item.officer}</div></div>
                <div class="info-group"><div class="info-label">Thời điểm trình ký</div><div class="info-value">${item.submittedAt}</div></div>
                <div class="info-group"><div class="info-label">Phí cung cấp bản sao</div><div class="info-value">${item.fee.toLocaleString('vi-VN')} VNĐ - ${item.paidAt}</div></div>
            </div>

            <h3 class="section-title">Hồ sơ đăng ký gốc được cung cấp bản sao</h3>
            <table class="table" style="min-width:900px">
                <thead>
                    <tr><th>Số đăng ký</th><th>Nghiệp vụ gốc</th><th>Bên bảo đảm</th><th>Bên nhận bảo đảm</th><th>Tài sản bảo đảm</th><th>Trạng thái hồ sơ gốc</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>${item.registrationNo}</code></td>
                        <td>${item.originalCase}</td>
                        <td>${item.securedParty}</td>
                        <td>${item.mortgagee}</td>
                        <td>${item.asset}</td>
                        <td><span class="badge badge-success">${item.originalStatus}</span></td>
                    </tr>
                </tbody>
            </table>

            <h3 class="section-title">Tài liệu trình ký</h3>
            ${hasDigitalFile ? `
                <div class="info-grid">
                    <div class="info-group"><div class="info-label">File bản sao điện tử</div><div class="info-value"><a class="action-link" href="#" onclick="alert('Mở xem trước ${item.draftFile}'); return false;">${item.draftFile}</a></div></div>
                    <div class="info-group"><div class="info-label">Hình thức xử lý</div><div class="info-value">Lãnh đạo ký số file bản sao điện tử bằng USB token.</div></div>
                </div>
            ` : `
                <div style="padding:14px;border:1px solid var(--border-color);border-radius:6px;background:#F8FAFC;font-weight:600">
                    Yêu cầu cung cấp bản sao giấy không phát sinh file ký số trên hệ thống. Lãnh đạo thực hiện ký duyệt để chuyển hồ sơ sang bước trả kết quả bản giấy.
                </div>
            `}
        </div>
    `;
}

function approveCopyPaperSingle(id) {
    const item = leaderCopyRequests.find(x => x.id === id);
    if (!item || item.copyType !== 'Bản sao giấy' || item.status !== 'Chờ ký') return;
    if (!confirm('Xác nhận ký duyệt yêu cầu cung cấp bản sao giấy ' + id + '?')) return;
    item.status = 'Đã duyệt - chờ trả kết quả';
    alert('Đã ký duyệt yêu cầu cung cấp bản sao giấy ' + id + '. Hồ sơ chuyển sang trạng thái Đã duyệt - chờ trả kết quả.');
    if (selectedLeaderCopyId === id) {
        closeDetail();
    } else {
        renderTable(true);
    }
}

function openLeaderCcttDetail(id) {
    const item = leaderCcttRequests.find(x => x.id === id);
    if (!item) return;
    selectedLeaderCcttId = id;
    selectedLeaderCopyId = null;
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-detail').classList.add('active');
    document.getElementById('detail-id-display').innerText = item.id;
    const badge = document.getElementById('detail-status');
    badge.className = `badge ${item.status === 'Hoàn thành' ? 'badge-success' : (item.status === 'Bị từ chối' || item.status === 'Bị trả lại') ? 'badge-danger' : item.status === 'Chờ duyệt' ? 'badge-warning' : 'badge-info'}`;
    badge.innerText = item.status;
    document.getElementById('toggle-diff-container').style.display = 'none';
    document.getElementById('lifecycle-timeline').innerHTML = `
        <li class="timeline-item active"><div class="timeline-title">Cán bộ trình</div><div class="timeline-date">${item.submittedAt}</div></li>
        <li class="timeline-item"><div class="timeline-title">${item.status === 'Chờ ký' ? 'Ký số PDF' : 'Lãnh đạo duyệt'}</div><div class="timeline-date">Đang chờ</div></li>
    `;
    document.getElementById('internal-log-content').innerHTML = `<div><b>${item.submittedAt}</b> - ${item.officer} trình hồ sơ lên Lãnh đạo.</div>`;
    document.getElementById('tab-controls-container').style.display = 'none';
    document.getElementById('tab-contents-container').innerHTML = renderLeaderCcttDetailContent(item);
    document.getElementById('group-officer-opinion').style.display = 'none';
    const isPaperItem = item.source === 'Cán bộ nhập liệu';
    const canSign = item.status === 'Chờ ký';
    const canReturnOrReject = canSign && isPaperItem;
    document.getElementById('detail-toolbar-buttons').innerHTML = `
        <button class="btn btn-outline-secondary" onclick="closeDetail()">Đóng</button>
        <button class="btn btn-success" onclick="openSignFromDetail()" ${canSign ? '' : 'disabled'}><i class="fa-solid fa-file-signature"></i> Ký số PDF</button>
        <button class="btn btn-outline-secondary" onclick="openReasonFromDetail('tralai')" ${canReturnOrReject ? '' : 'disabled'}><i class="fa-solid fa-reply"></i> Trả lại</button>
        <button class="btn btn-danger" onclick="openReasonFromDetail('tuchoi')" ${canReturnOrReject ? '' : 'disabled'}><i class="fa-solid fa-ban"></i> Từ chối</button>
    `;
}

function renderLeaderCcttDetailContent(item) {
    const noData = item.resultType === 'noData';
    return `
        <div class="card-section" style="box-shadow:none;border:none;padding:0">
            <h3 class="section-title">File PDF dự thảo trình duyệt</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">File PDF</div><div class="info-value"><a class="action-link" href="#" onclick="alert('Mở xem trước PDF ${item.pdfVersion}')">Mẫu số 10d - ${item.pdfVersion}</a></div></div>
                <div class="info-group"><div class="info-label">Người tạo file</div><div class="info-value">${item.officer}</div></div>
                <div class="info-group"><div class="info-label">Thời điểm tạo file</div><div class="info-value">${item.submittedAt}</div></div>
                <div class="info-group"><div class="info-label">Phiên bản file</div><div class="info-value">${item.pdfVersion}</div></div>
                <div class="info-group"><div class="info-label">QR trên file</div><div class="info-value">Quét QR mở trang tra cứu xác thực file đã ký theo mã hồ sơ ${item.id}</div></div>
            </div>
            <h3 class="section-title">Thông tin hồ sơ</h3>
            <div class="info-grid">
                <div class="info-group"><div class="info-label">Mã hồ sơ</div><div class="info-value"><b>${item.id}</b></div></div>
                <div class="info-group"><div class="info-label">Mã khách hàng</div><div class="info-value"><code>${item.customerId}</code></div></div>
                <div class="info-group"><div class="info-label">Người yêu cầu</div><div class="info-value">${item.requester}</div></div>
                <div class="info-group"><div class="info-label">Địa chỉ</div><div class="info-value">${item.address}</div></div>
                <div class="info-group"><div class="info-label">Thời điểm đăng ký</div><div class="info-value">${item.registeredAt}</div></div>
                <div class="info-group"><div class="info-label">Nguồn tiếp nhận</div><div class="info-value">${item.source}</div></div>
                <div class="info-group"><div class="info-label">Tiêu chí yêu cầu</div><div class="info-value">${item.criteria}</div></div>
                <div class="info-group"><div class="info-label">Dữ liệu Khách hàng đã nhập</div><div class="info-value">${item.inputData}</div></div>
                <div class="info-group"><div class="info-label">Cán bộ xử lý</div><div class="info-value">${item.officer}</div></div>
                <div class="info-group"><div class="info-label">Thời điểm tra cứu</div><div class="info-value">${item.registeredAt}</div></div>
                <div class="info-group"><div class="info-label">Cán bộ trình duyệt</div><div class="info-value">${item.officer}</div></div>
                <div class="info-group"><div class="info-label">Thời điểm trình duyệt</div><div class="info-value">${item.submittedAt}</div></div>
            </div>
            <h3 class="section-title">Kết quả tra cứu</h3>
            ${noData ? '<div style="padding:14px;border:1px solid #FCD34D;background:#FFFBEB;border-radius:6px;font-weight:700">Kết quả thông tin bạn tra cứu: Chưa được đăng ký hoặc hiệu lực của đăng ký đối với thông tin không còn.</div>' : `
                <div style="font-weight:700;color:var(--primary-color);margin-bottom:10px">VI. Kết quả cung cấp thông tin có xác nhận của cơ quan đăng ký</div>
                <table class="table" style="min-width:980px">
                    <thead><tr><th>STT</th><th>Số hồ sơ</th><th>Số đăng ký</th><th>Thời điểm đăng ký</th><th>Loại hình đăng ký</th><th>Bên bảo đảm</th><th>Bên nhận bảo đảm</th><th>Hiệu lực tại thời điểm tra cứu</th></tr></thead>
                    <tbody><tr><td>1</td><td>HS-2026-000813</td><td>1505170802</td><td>02/07/2026 10:27</td><td>Đăng ký lần đầu</td><td>Công ty Cổ phần Xây dựng và Phát triển HTC</td><td>Ngân hàng TMCP Đầu tư và Phát triển Việt Nam</td><td>Có</td></tr></tbody>
                </table>`}
            <div class="info-group" style="margin-top:10px"><div class="info-label">Kết quả có phát sinh nghĩa vụ phí</div><div class="info-value">${(!noData && item.fee > 0) ? `Có (${item.fee.toLocaleString('vi-VN')} VNĐ)` : 'Không'}</div></div>
        </div>
    `;
}

closeDetail = function () {
    selectedLeaderCcttId = null;
    selectedLeaderCopyId = null;
    UC031_BASE.closeDetail();
    syncLeaderWorkTabs();
};

const UC031_SIGN_BASE = {
    signBatch,
    submitSign,
    openSignSingle,
    openSignFromDetail
};

function openCcttSignModal(ids) {
    currentActionIds = ids;
    document.getElementById('cctt-sign-count').innerText = ids.length;
    document.getElementById('cctt-sign-list').innerHTML = ids.map(id => {
        const item = findLeaderServiceRequest(id);
        if (!item) return '';
        const isCopy = String(id).startsWith('BS-');
        const fileLabel = isCopy ? (item.draftFile || 'Bản sao giấy không ký số') : `Mẫu số 10d - ${item.pdfVersion}`;
        return `<tr id="cctt-sign-row-${item.id}">
            <td><b>${item.id}</b></td>
            <td>${item.requester}</td>
            <td><a class="action-link" href="#" onclick="alert('Mở xem trước ${fileLabel}'); return false;">${fileLabel}</a></td>
            <td><span class="badge" id="cctt-sign-status-${item.id}">Chưa ký</span></td>
        </tr>`;
    }).join('');
    document.getElementById('cctt-usb-status').innerText = 'Chưa kiểm tra';
    document.getElementById('cctt-usb-detail').style.display = 'none';
    document.getElementById('cctt-pin-group').style.display = 'none';
    document.getElementById('ccttPinCode').value = '';
    document.getElementById('ccttPinCode').classList.remove('is-invalid');
    document.getElementById('ccttPinError').classList.remove('active');
    document.getElementById('btnCcttSignConfirm').disabled = true;
    openModal('modalCcttSign');
}

function checkCcttUsbToken() {
    document.getElementById('cctt-usb-status').innerText = 'Chứng thư số hợp lệ';
    document.getElementById('cctt-usb-detail').style.display = 'block';
    document.getElementById('cctt-usb-cert').innerText = '[VNPT-CA] Lãnh đạo TTĐK';
    document.getElementById('cctt-usb-signer').innerText = 'Nguyễn Văn Lãnh Đạo';
    document.getElementById('cctt-usb-validity').innerText = '12/12/2025 - 12/12/2028';
    document.getElementById('cctt-pin-group').style.display = 'block';
    document.getElementById('btnCcttSignConfirm').disabled = false;
}

signBatch = function () {
    if (leaderWorkType === 'cctt' && (currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly')) {
        const selected = getSelectedRows();
        if (!selected.length) {
            alert('Vui lòng chọn ít nhất một yêu cầu cung cấp thông tin để ký số.');
            return;
        }
        openCcttSignModal(selected);
        return;
    }
    if (leaderWorkType === 'copy' && (currentListTab === 'duyet-choky' || currentListTab === 'dang_xu_ly')) {
        const selected = getSelectedRows().filter(id => {
            const item = leaderCopyRequests.find(x => x.id === id);
            return item && item.copyType === 'Bản sao điện tử' && item.status === 'Chờ ký';
        });
        if (!selected.length) {
            alert('Vui lòng chọn ít nhất một yêu cầu cung cấp bản sao điện tử ở trạng thái Chờ ký để ký số.');
            return;
        }
        openCcttSignModal(selected);
        return;
    }
    UC031_SIGN_BASE.signBatch();
};

openSignSingle = function (id) {
    if (String(id).startsWith('CCTT-')) {
        openCcttSignModal([id]);
        return;
    }
    if (String(id).startsWith('BS-')) {
        const item = leaderCopyRequests.find(x => x.id === id);
        if (item?.copyType === 'Bản sao giấy') {
            approveCopyPaperSingle(id);
        } else {
            openCcttSignModal([id]);
        }
        return;
    }
    UC031_SIGN_BASE.openSignSingle(id);
};

openSignFromDetail = function () {
    if (selectedLeaderCcttId) {
        openSignSingle(selectedLeaderCcttId);
        return;
    }
    if (selectedLeaderCopyId) {
        openSignSingle(selectedLeaderCopyId);
        return;
    }
    UC031_SIGN_BASE.openSignFromDetail();
};

const UC031_REASON_BASE = { submitReason, openReasonSingle, openReasonFromDetail };

openReasonFromDetail = function (type) {
    if (selectedLeaderCcttId) {
        openReasonSingle(selectedLeaderCcttId, type);
        return;
    }
    if (selectedLeaderCopyId) {
        openReasonSingle(selectedLeaderCopyId, type);
        return;
    }
    UC031_REASON_BASE.openReasonFromDetail(type);
};

openReasonSingle = function (id, type) {
    if (!String(id).startsWith('CCTT-') && !String(id).startsWith('BS-')) {
        const ctx = document.getElementById('reasonContextInfo');
        if (ctx) ctx.style.display = 'none';
        UC031_REASON_BASE.openReasonSingle(id, type);
        return;
    }
    UC031_REASON_BASE.openReasonSingle(id, type);
    renderServiceReasonContext([id], type);
};

function renderServiceReasonContext(ids, type) {
    const container = document.getElementById('reasonContextInfo');
    if (!container) return;
    if (ids.length > 1) {
        container.style.display = 'block';
        container.innerHTML = `<div style="background:#F8FAFC;border:1px solid var(--border-color);border-radius:6px;padding:10px 12px;font-size:13px">
            <b>Loại xử lý:</b> ${type === 'tralai' ? 'Trả lại' : 'Từ chối'}<br>
            <b>Số lượng hồ sơ đã chọn:</b> ${ids.length}
        </div>`;
        return;
    }
    const item = findLeaderServiceRequest(ids[0]);
    if (!item) { container.style.display = 'none'; return; }
    const isPaper = item.source === 'Cán bộ nhập liệu';
    const isCopy = String(item.id).startsWith('BS-');
    container.style.display = 'block';
    container.innerHTML = `<div style="background:#F8FAFC;border:1px solid var(--border-color);border-radius:6px;padding:10px 12px;font-size:13px">
        <b>Mã hồ sơ:</b> ${item.id}${isPaper ? `<br><b>Số đơn giấy:</b> ${item.id.replace('CCTT-', 'DG-')}<br><b>Nguồn tiếp nhận:</b> ${item.source}` : ''}<br>
        <b>Người yêu cầu:</b> ${item.requester}<br>
        ${isCopy ? `<b>Số đăng ký hồ sơ gốc:</b> ${item.registrationNo}<br><b>Loại cung cấp bản sao:</b> ${item.copyType}<br><b>Số lượng:</b> ${item.copyQty}<br>` : `<b>Tiêu chí yêu cầu cung cấp thông tin:</b> ${item.criteria}<br><b>Giá trị tiêu chí:</b> ${item.inputData}<br>`}
        <b>File ${item.status === 'Chờ ký' ? 'chờ ký' : 'dự thảo'}:</b> <a class="action-link" href="#" onclick="alert('Mở xem trước ${isCopy ? (item.draftFile || 'bản sao giấy') : ('PDF ' + item.pdfVersion)}'); return false;">${isCopy ? (item.draftFile || 'Không áp dụng') : ('Mẫu số 10d - ' + item.pdfVersion)}</a><br>
        <b>Loại xử lý:</b> ${type === 'tralai' ? 'Trả lại' : 'Từ chối'}
    </div>`;
}

submitReason = function () {
    const isCcttReason = currentActionIds.some(id => String(id).startsWith('CCTT-'));
    const isCopyReason = currentActionIds.some(id => String(id).startsWith('BS-'));
    if (!isCcttReason && !isCopyReason) {
        UC031_REASON_BASE.submitReason();
        return;
    }
    const reason = document.getElementById('reasonText').value.trim();
    if (!reason) {
        document.getElementById('reasonText').classList.add('is-invalid');
        document.getElementById('reasonError').classList.add('active');
        document.getElementById('reasonText').focus();
        return;
    }
    closeModal('modalReason');
    const newStatus = currentActionType === 'tralai' ? 'Bị trả lại' : 'Bị từ chối';
    currentActionIds.forEach(id => {
        const item = findLeaderServiceRequest(id);
        if (item) item.status = newStatus;
    });
    alert('Đã hoàn tất thao tác ' + (currentActionType === 'tralai' ? 'Trả lại' : 'Từ chối') + ' cho ' + currentActionIds.length + (isCopyReason ? ' yêu cầu cung cấp bản sao.' : ' yêu cầu cung cấp thông tin.'));
    if (selectedLeaderCcttId && currentActionIds.includes(selectedLeaderCcttId)) {
        closeDetail();
    } else if (selectedLeaderCopyId && currentActionIds.includes(selectedLeaderCopyId)) {
        closeDetail();
    } else {
        renderTable(true);
    }
};

function ccttApproveBatch() {
    const selected = getSelectedRows();
    if (!selected.length) {
        alert('Vui lòng chọn ít nhất một yêu cầu cung cấp thông tin để duyệt.');
        return;
    }
    if (!confirm('Xác nhận duyệt ' + selected.length + ' yêu cầu cung cấp thông tin đã chọn?')) return;
    selected.forEach(id => {
        const item = leaderCcttRequests.find(x => x.id === id);
        if (!item) return;
        if (item.resultType === 'hasData' && item.fee > 0) {
            item.status = 'Chờ thanh toán';
        } else {
            item.status = 'Chờ ký';
            item.toSignReason = item.resultType === 'noData' ? 'Không có kết quả - không thu phí' : 'Miễn phí';
        }
    });
    alert('Đã duyệt ' + selected.length + ' yêu cầu cung cấp thông tin.');
    renderTable(true);
}

function ccttRejectBatch() {
    const selected = getSelectedRows();
    if (!selected.length) {
        alert('Vui lòng chọn ít nhất một yêu cầu cung cấp thông tin để từ chối.');
        return;
    }
    UC031_REASON_BASE.openReasonSingle(selected[0], 'tuchoi');
    currentActionIds = selected;
    renderServiceReasonContext(selected, 'tuchoi');
}

function submitCcttSign() {
    const pin = document.getElementById('ccttPinCode').value.trim();
    if (pin !== '1234') {
        document.getElementById('ccttPinCode').classList.add('is-invalid');
        document.getElementById('ccttPinError').classList.add('active');
        document.getElementById('ccttPinCode').focus();
        return;
    }
    document.getElementById('ccttPinCode').classList.remove('is-invalid');
    document.getElementById('ccttPinError').classList.remove('active');
    let successCount = 0;
    const isCopySigning = currentActionIds.some(id => String(id).startsWith('BS-'));
    currentActionIds.forEach(id => {
        const item = findLeaderServiceRequest(id);
        const statusCell = document.getElementById('cctt-sign-status-' + id);
        if (item) {
            item.status = 'Hoàn thành';
            item.signedAt = 'Vừa xong';
            if (String(id).startsWith('BS-')) {
                item.draftFile = 'Bản sao điện tử đã ký số';
            } else {
                item.pdfVersion = 'PDF đã ký số';
            }
            successCount++;
        }
        if (statusCell) {
            statusCell.className = 'badge badge-success';
            statusCell.innerText = 'Ký thành công';
        }
    });
    document.getElementById('btnCcttSignConfirm').disabled = true;
    alert('Đã ký số thành công cho ' + successCount + (isCopySigning ? ' yêu cầu cung cấp bản sao điện tử.' : ' yêu cầu cung cấp thông tin.'));
    setTimeout(() => {
        closeModal('modalCcttSign');
        if (selectedLeaderCcttId && currentActionIds.includes(selectedLeaderCcttId)) {
            closeDetail();
        } else if (selectedLeaderCopyId && currentActionIds.includes(selectedLeaderCopyId)) {
            closeDetail();
        } else {
            renderTable(true);
        }
    }, 400);
}

