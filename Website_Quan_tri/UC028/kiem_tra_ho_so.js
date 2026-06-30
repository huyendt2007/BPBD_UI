/**
 * Xử lý logic SPA cho UC028 - Màn hình Xem chi tiết hồ sơ (Three-Pane Layout)
 * Áp dụng tổng quát cho cả 9 loại hồ sơ theo quy chuẩn Design System.
 */

let currentListTab = 'choduyet';
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
        date: '30/06/2026 18:00',
        customer: 'Ông Nguyễn Văn A',
        mortgagee: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        type: 'Đăng ký mới',
        transactionType: 'Biện pháp bảo đảm',
        subtype: 'Thế chấp',
        status: 'Chờ nhập liệu',
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
            { id: 'node-1', title: 'Tiếp nhận quầy', date: '30/06/2026 18:00', status: 'Chờ nhập liệu', active: true }
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
        status: 'Chờ nhập liệu',
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
            { id: 'node-1', title: 'Tiếp nhận quầy', date: '30/06/2026 18:15', status: 'Chờ nhập liệu', active: true }
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
        status: 'Chờ nhập liệu',
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
            { id: 'node-1', title: 'Tiếp nhận quầy', date: '30/06/2026 18:30', status: 'Chờ nhập liệu', active: true }
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
    let targetStatuses = ['Chờ duyệt'];
    if (currentListTab === 'chonhaplieu') targetStatuses = ['Chờ nhập liệu'];
    else if (currentListTab === 'duyet-choky') targetStatuses = ['Duyệt chờ ký'];
    else if (currentListTab === 'bitralai') targetStatuses = ['Bị trả lại'];
    else if (currentListTab === 'dang_xu_ly') targetStatuses = ['Chờ ký'];
    else if (currentListTab === 'da_xu_ly') targetStatuses = ['Hoàn thành', 'Bị từ chối'];

    // 3. Filter the complete mock profiles array plus custom localStorage data
    const currentVersion = 'v3';
    const savedVersion = localStorage.getItem('mock_profiles_version');
    if (savedVersion !== currentVersion) {
        localStorage.removeItem('custom_mock_profiles');
        localStorage.setItem('mock_profiles_version', currentVersion);
    }

    let allProfiles = [...mockProfiles];
    const cached = localStorage.getItem('custom_mock_profiles');
    if (cached) {
        let customList = JSON.parse(cached);
        let upgraded = false;
        const pendingForSigIds = ['GDBD-2026-000801', 'GDBD-2026-000802', 'GDBD-2026-000805'];
        customList.forEach(p => {
            if (pendingForSigIds.includes(p.id)) {
                if (p.status === 'Duyệt chờ ký') {
                    p.status = 'Chờ ký';
                    upgraded = true;
                }
            } else {
                if (p.status === 'Chờ ký') {
                    p.status = 'Duyệt chờ ký';
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

    if (currentListTab === 'chonhaplieu') {
        const searchTerm = document.getElementById('filter-search-term')?.value.toLowerCase().trim() || '';
        const filterKenh = document.getElementById('filter-kenh-tiep-nhan')?.value || '';
        const filterChuThe = document.getElementById('filter-loai-chu-the')?.value || '';
        const filterPhuongThuc = document.getElementById('filter-phuong-thuc')?.value || '';
        const filterHinhThuc = document.getElementById('filter-hinh-thuc-tra')?.value || '';
        const filterTungay = document.getElementById('filter-tungay')?.value || '';
        const filterDenngay = document.getElementById('filter-denngay')?.value || '';

        filteredProfiles = allProfiles.filter(p => {
            if (p.handlingOfficer && p.handlingOfficer !== "Nguyễn Văn Cán Bộ") return false;
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
        const filterLoaidangky = document.getElementById('filter-loaidangky')?.value || '';
        const filterLoaihinh = document.getElementById('cb-loaihinh')?.value || '';
        const filterSubtype = document.getElementById('cb-loaibienphap')?.value || '';
        const filterLoaitaisan = document.getElementById('filter-loaitaisan')?.value || '';
        const filterTungay = document.getElementById('filter-tungay')?.value || '';
        const filterDenngay = document.getElementById('filter-denngay')?.value || '';

        filteredProfiles = allProfiles.filter(p => {
            if (p.handlingOfficer && p.handlingOfficer !== "Nguyễn Văn Cán Bộ") return false;
            if (!targetStatuses.includes(p.status)) return false;

            if (searchTerm && !p.id.toLowerCase().includes(searchTerm) && !p.pin.toLowerCase().includes(searchTerm) && !p.customer.toLowerCase().includes(searchTerm) && !p.mortgagee.toLowerCase().includes(searchTerm)) return false;
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
                <th style="text-align: center; width: 100px; min-width: 100px;">Thao tác</th>
            </tr>
        `;
    } else {
        let actionsMinWidth = '130px';
        if (currentListTab === 'dang_xu_ly' || currentListTab === 'da_xu_ly') {
            actionsMinWidth = '80px';
        } else if (currentListTab === 'bitralai') {
            actionsMinWidth = '110px';
        } else if (currentListTab === 'choduyet') {
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
                <th style="width: 110px;">Số biên lai</th>
                <th style="width: 110px;">Trạng thái</th>
                <th style="width: 140px;">Nguồn tiếp nhận</th>
                <th style="width: 140px;">Cán bộ xử lý</th>
                <th style="text-align: center; width: ${actionsMinWidth}; min-width: ${actionsMinWidth};">Thao tác</th>
            </tr>
        `;
    }

    const totalCount = filteredProfiles.length;
    const colSpanCount = currentListTab === 'chonhaplieu' ? 14 : 16;

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
                <tr style="cursor: pointer;" onclick="startDigitize('${row.id}')">
                    <td>${startIndex + index + 1}</td>
                    <td>${row.date}</td>
                    <td>${row.channel || 'Trực tiếp tại quầy'}</td>
                    <td>${customerTypeText}</td>
                    <td>${row.customerId || '-'}</td>
                    <td><b>${row.customer}</b></td>
                    <td>${row.phone || '-'}</td>
                    <td>${row.email || '-'}</td>
                    <td>${payMethodText}</td>
                    <td>${resultMethodText}</td>
                    <td><code>${row.receipt || '-'}</code></td>
                    <td><span class="badge badge-warning">Chờ nhập liệu</span></td>
                    <td>${row.handlingOfficer || '-'}</td>
                    <td style="text-align: center;" onclick="event.stopPropagation()">
                        <button class="btn btn-primary" style="padding: 4px 8px; font-size: 11px; background-color: var(--secondary-color);" onclick="startDigitize('${row.id}')">
                            <i class="fa-solid fa-keyboard"></i> Nhập liệu
                        </button>
                    </td>
                </tr>
            `;
        } else {
            let actionsHtml = '';
            const btnView = `<button class="icon-btn view" title="Xem chi tiết" onclick="event.stopPropagation(); openDetail('${row.id}')"><i class="fa fa-eye"></i></button>`;

            if (currentListTab === 'dang_xu_ly' || currentListTab === 'da_xu_ly') {
                actionsHtml = btnView;
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
                actionsHtml = `${btnView}${btnEdit}${btnApprove}${btnSign}${btnReject}`;
            } else if (currentListTab === 'duyet-choky') {
                const btnSign = `<button class="icon-btn sign" title="Trình ký" onclick="event.stopPropagation(); submitForSignatureSingle('${row.id}')"><i class="fa-solid fa-file-signature"></i></button>`;
                const btnCancelApprove = `<button class="icon-btn cancel-approve" title="Hủy duyệt" onclick="event.stopPropagation(); cancelApprovalSingle('${row.id}')"><i class="fa-solid fa-rotate-left"></i></button>`;
                const btnReject = `<button class="icon-btn reject" title="Từ chối hồ sơ" onclick="event.stopPropagation(); openRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>`;
                actionsHtml = `${btnView}${btnSign}${btnCancelApprove}${btnReject}`;
            } else if (currentListTab === 'bitralai') {
                const btnEdit = `<button class="icon-btn edit" title="Cập nhật thông tin" onclick="event.stopPropagation(); startDigitize('${row.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
                const btnReject = `<button class="icon-btn reject" title="Từ chối hồ sơ" onclick="event.stopPropagation(); openRejectSingle('${row.id}')"><i class="fa fa-times"></i></button>`;
                actionsHtml = `${btnView}${btnEdit}${btnReject}`;
            } else {
                actionsHtml = btnView;
            }

            tbody.innerHTML += `
                <tr style="cursor: pointer;" onclick="openDetail('${row.id}')">
                    <td onclick="event.stopPropagation()"><input type="checkbox" class="row-checkbox" value="${row.id}"></td>
                    <td>${startIndex + index + 1}</td>
                    <td>${row.date}</td>
                    <td><span class="action-link" onclick="event.stopPropagation(); openDetail('${row.id}')">${row.id}</span></td>
                    <td><code>${row.pin}</code></td>
                    <td><b>${row.customer}</b></td>
                    <td>${row.mortgagee}</td>
                    <td>${row.type}</td>
                    <td>${row.transactionType}</td>
                    <td>${row.subtype}</td>
                    ${formatAssetTypeCell(row.assetType)}
                    <td><code>${row.receipt || '-'}</code></td>
                    <td><span class="badge ${row.statusClass}">${row.status}</span></td>
                    <td>${(row.channel === 'Cách thức điện tử') ? 'Khách hàng' : 'Cán bộ nhập liệu'}</td>
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
    sessionStorage.setItem('activeListTab', tab);

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

    p.status = 'Duyệt chờ ký';
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
    
    let allProfiles = [...mockProfiles];
    const cached = localStorage.getItem('custom_mock_profiles');
    if (cached) {
        let customList = JSON.parse(cached);
        const pendingForSigIds = ['GDBD-2026-000801', 'GDBD-2026-000802', 'GDBD-2026-000805'];
        customList.forEach(p => {
            if (pendingForSigIds.includes(p.id)) {
                if (p.status === 'Duyệt chờ ký') {
                    p.status = 'Chờ ký';
                }
            } else {
                if (p.status === 'Chờ ký') {
                    p.status = 'Duyệt chờ ký';
                }
            }
        });
        const customIds = customList.map(c => c.id);
        allProfiles = allProfiles.filter(p => !customIds.includes(p.id));
        allProfiles = [...customList, ...allProfiles];
    }

    allProfiles.forEach(p => {
        if (p.status === 'Chờ nhập liệu') counts.chonhaplieu++;
        else if (p.status === 'Chờ duyệt') counts.choduyet++;
        else if (p.status === 'Duyệt chờ ký') counts['duyet-choky']++;
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
    window.location.href = '../UC024/dang_ky_bpbd_can_bo.html';
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
        'filter-tungay', 'filter-denngay', 'filter-loaidangky', 'cb-loaihinh',
        'filter-loaitaisan', 'filter-search-term', 'filter-kenh-tiep-nhan',
        'filter-loai-chu-the', 'filter-phuong-thuc', 'filter-hinh-thuc-tra'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

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
    window.location.href = '../UC027/xem_chi_tiet_lich_su_can_bo.html?id=' + id + (focusId ? '&focusId=' + focusId : '') + '&from=kiem_tra';
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
            <button class="btn btn-danger" onclick="handleDetailAction('tuchoi')">✖ Từ chối</button>
            <button class="btn btn-primary" onclick="handleDetailAction('trinhky')">📝 Trình ký</button>
        `;
    } else {
        // Hồ sơ Chờ ký, Bị trả lại hoặc khác
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
        alert(`Hồ sơ ${currentProfile.id} phê duyệt thành công! Chuyển sang danh mục Chờ ký.`);
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
        currentProfile = mockProfiles.find(p => p.id === singleRejectId);
        openModalPreview('tuchoi', reason);
    } else {
        const selected = getSelectedRows();
        if (selected.length > 0) {
            currentProfile = mockProfiles.find(p => p.id === selected[0]);
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
        const p = mockProfiles.find(prof => prof.id === singleRejectId);
        if (p) {
            p.status = statusVal;
            p.statusClass = statusClassVal;
            p.internalLogs.unshift({
                time: 'Vừa xong',
                user: 'Cán bộ nghiệp vụ TTĐK',
                action: currentPreviewType === 'trinhky' ? 'Trình ký' : 'Từ chối',
                comment: currentPreviewType === 'trinhky' ? 'Đã lập dự thảo Giấy chứng nhận gửi Lãnh đạo.' : `Đã lập dự thảo Văn bản từ chối: ${reason}`
            });
        }
        singleRejectId = null;
    } else {
        const selected = getSelectedRows();
        if (selected.length > 0) {
            selected.forEach(id => {
                const p = mockProfiles.find(prof => prof.id === id);
                if (p) {
                    p.status = statusVal;
                    p.statusClass = statusClassVal;
                    p.internalLogs.unshift({
                        time: 'Vừa xong',
                        user: 'Cán bộ nghiệp vụ TTĐK',
                        action: currentPreviewType === 'trinhky' ? 'Trình ký' : 'Từ chối',
                        comment: currentPreviewType === 'trinhky' ? 'Đã lập dự thảo Giấy chứng nhận gửi Lãnh đạo.' : `Đã lập dự thảo Văn bản từ chối: ${reason}`
                    });
                }
            });
        } else if (currentProfile) {
            currentProfile.status = statusVal;
            currentProfile.statusClass = statusClassVal;
            currentProfile.internalLogs.unshift({
                time: 'Vừa xong',
                user: 'Cán bộ nghiệp vụ TTĐK',
                action: currentPreviewType === 'trinhky' ? 'Trình ký' : 'Từ chối',
                comment: currentPreviewType === 'trinhky' ? 'Đã lập dự thảo Giấy chứng nhận gửi Lãnh đạo.' : `Đã lập dự thảo Văn bản từ chối: ${reason}`
            });
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
        alert('Vui lòng chọn ít nhất một hồ sơ để thao tác!');
        return;
    }

    selected.forEach(id => {
        const profile = mockProfiles.find(p => p.id === id);
        if (profile) {
            profile.status = 'Duyệt chờ ký';
            profile.statusClass = 'badge-info';
            profile.internalLogs.unshift({
                time: 'Vừa xong',
                user: 'Cán bộ nghiệp vụ TTĐK',
                action: 'Phê duyệt hàng loạt',
                comment: 'Phê duyệt nhanh hồ sơ chuyển Lãnh đạo.'
            });
        }
    });

    saveProfiles();
    alert(`Hoàn thành thành công ${selected.length} hồ sơ! (Các hồ sơ được chuyển sang danh mục Chờ ký)`);
    renderTable();
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

    // Gán cán bộ xử lý cho mock data để mô phỏng
    mockProfiles.forEach((p, idx) => {
        p.handlingOfficer = "Nguyễn Văn Cán Bộ";
    });
    localStorage.setItem('custom_mock_profiles', JSON.stringify(mockProfiles));
    const urlParams = new URLSearchParams(window.location.search);
    const viewMode = urlParams.get('view');

    const navTabs = document.querySelector('.nav-tabs');
    const headerTitle = document.querySelector('h1');

    if (viewMode === 'dang_xu_ly') {
        if (navTabs) navTabs.style.display = 'none';
        if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - HỒ SƠ ĐANG XỬ LÝ (CHỜ KÝ)';
        currentListTab = 'dang_xu_ly';
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'none';
    } else if (viewMode === 'da_xu_ly') {
        if (navTabs) navTabs.style.display = 'none';
        if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - HỒ SƠ ĐÃ XỬ LÝ';
        currentListTab = 'da_xu_ly';
        document.getElementById('toolbar-choduyet').style.display = 'none';
        document.getElementById('toolbar-duyet-choky').style.display = 'none';
        document.getElementById('toolbar-choky').style.display = 'none';
    } else {
        if (navTabs) navTabs.style.display = 'flex';
        if (headerTitle) headerTitle.innerText = 'HỆ THỐNG QUẢN TRỊ - HỒ SƠ CHỜ XỬ LÝ';
        
        const savedTab = sessionStorage.getItem('activeListTab');
        if (savedTab && ['choduyet', 'duyet-choky', 'bitralai'].includes(savedTab)) {
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

