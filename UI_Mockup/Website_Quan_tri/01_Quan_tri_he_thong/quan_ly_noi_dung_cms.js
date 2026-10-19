// ==========================================================
// MODULE QUẢN LÝ NỘI DUNG (CMS) - DỮ LIỆU GIẢ LẬP
// Phạm vi: chỉ dựng giao diện quản trị, chưa đấu nối Website khách hàng.
// ==========================================================

let cmsRole = 'editor';          // editor | approver
let currentTab = 'block';
let currentSupportSub = 'faq';
let editingPageId = null;
let blockAttachedFile = null;

// Danh mục Loại khối (8 loại, đã bỏ loại MENU vì menu hiển thị theo phân quyền)
const BLOCK_TYPES = [
    { code: 'BANNER', name: 'Biểu ngữ / Slider' },
    { code: 'RICHTEXT', name: 'Khối văn bản' },
    { code: 'LINKLIST', name: 'Danh sách liên kết' },
    { code: 'CONTACT', name: 'Thông tin liên hệ' },
    { code: 'FAQ', name: 'Câu hỏi thường gặp' },
    { code: 'DOCUMENT', name: 'Văn bản quy phạm pháp luật' },
    { code: 'NOTICE', name: 'Thông báo nổi bật' },
    { code: 'FILE', name: 'Biểu mẫu tải về' }
];

// Danh mục Vùng hiển thị
const ZONES = [
    'Đầu trang', 'Chân trang', 'Menu Liên kết',
    'Trang chủ - Slider', 'Trang chủ - Lời chào mừng', 'Trang chủ - Khối nghiệp vụ',
    'Trang chủ - Thông báo', 'Hỗ trợ - Thông tin liên hệ', 'Hỗ trợ - Trung tâm đăng ký',
    'Hỗ trợ - Văn bản QPPL', 'Hỗ trợ - Câu hỏi thường gặp', 'Hướng dẫn thanh toán, thu phí'
];

const STATUS_CLASS = {
    'Lưu nháp': 'st-draft',
    'Chờ duyệt': 'st-pending',
    'Đã xuất bản': 'st-published',
    'Bị từ chối': 'st-rejected',
    'Ngừng xuất bản': 'st-stopped'
};

// ===== Khối nội dung giả lập =====
// Dữ liệu đã HỢP NHẤT từ các vị trí đang bị trùng lặp trên Website khách hàng.
let cmsBlocks = [
    {
        id: 'B01', code: 'KND-2026-001', type: 'BANNER', name: 'Biểu ngữ Khung giờ làm việc',
        zone: 'Trang chủ - Slider', status: 'Đã xuất bản', order: 1,
        titleVi: 'KHUNG GIỜ LÀM VIỆC VÀ TÍNH PHÍ DỊCH VỤ CÔNG TRỰC TUYẾN',
        titleEn: 'WORKING HOURS AND ONLINE PUBLIC SERVICE FEES',
        contentVi: 'Hệ thống tiếp nhận hồ sơ đăng ký trực tuyến 24/7. Phí dịch vụ được tính theo biểu phí hiện hành.',
        contentEn: 'The system receives online registration applications 24/7. Service fees follow the current fee schedule.',
        file: 'Khung_gio_lam_viec.jpg', from: '01/01/2026', to: '31/12/2026',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '10/09/2026'
    },
    {
        id: 'B02', code: 'KND-2026-002', type: 'BANNER', name: 'Biểu ngữ Giải thưởng VDA 2024',
        zone: 'Trang chủ - Slider', status: 'Chờ duyệt', order: 4,
        titleVi: 'VIETNAM DIGITAL AWARDS 2024 (VDA)',
        titleEn: 'VIETNAM DIGITAL AWARDS 2024 (VDA)',
        contentVi: 'Cơ quan nhà nước chuyển đổi số xuất sắc năm 2024.',
        contentEn: 'Outstanding digital transformation state agency of 2024.',
        file: 'GiaithuongVDA.jpg', from: '01/03/2026', to: '',
        publishedTitleVi: 'GIẢI THƯỞNG CHUYỂN ĐỔI SỐ 2024',
        publishedContentVi: 'Cơ quan nhà nước chuyển đổi số tiêu biểu năm 2024.',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '18/09/2026'
    },
    {
        id: 'B03', code: 'KND-2026-003', type: 'RICHTEXT', name: 'Lời chào mừng trang chủ',
        zone: 'Trang chủ - Lời chào mừng', status: 'Đã xuất bản', order: 1,
        titleVi: 'Chào mừng đến với Hệ thống',
        titleEn: 'Welcome to the System',
        contentVi: 'Chào mừng bạn đã truy cập vào Hệ thống cung cấp dịch vụ công trực tuyến về biện pháp bảo đảm bằng động sản và bồi thường nhà nước.',
        contentEn: 'Welcome to the online public service system for security interests in movable property and state compensation.',
        file: '', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '02/08/2026'
    },
    {
        id: 'B04', code: 'KND-2026-004', type: 'RICHTEXT', name: 'Khối nghiệp vụ Tra cứu',
        zone: 'Trang chủ - Khối nghiệp vụ', status: 'Đã xuất bản', order: 1,
        titleVi: 'Tra cứu', titleEn: 'Search',
        contentVi: 'Tra cứu thông tin về biện pháp bảo đảm đã đăng ký trên hệ thống.',
        contentEn: 'Search for registered security interest information on the system.',
        file: '', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '02/08/2026'
    },
    {
        id: 'B05', code: 'KND-2026-005', type: 'NOTICE', name: 'Thông báo đường dây nóng',
        zone: 'Trang chủ - Thông báo', status: 'Đã xuất bản', order: 1,
        titleVi: 'Đường dây nóng tiếp nhận phản ánh, kiến nghị',
        titleEn: 'Hotline for feedback and petitions',
        contentVi: '024.62739690', contentEn: '024.62739690',
        file: '', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '02/08/2026'
    },
    {
        id: 'B06', code: 'KND-2026-006', type: 'CONTACT', name: 'Trung tâm Đăng ký giao dịch, tài sản TP. Hà Nội',
        zone: 'Hỗ trợ - Trung tâm đăng ký', status: 'Đã xuất bản', order: 1,
        titleVi: 'Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội',
        titleEn: 'Registration Centre for Transactions and Assets in Hanoi',
        contentVi: 'Bộ phận đăng ký: 024.62739671 · Kế toán: 024.62739672 · Văn thư: 024.62739673',
        contentEn: 'Registration: 024.62739671 · Accounting: 024.62739672 · Clerical: 024.62739673',
        address: 'Ngõ 25 Nguyễn Cơ Thạch, P. Mỹ Đình 2, Q. Nam Từ Liêm, TP. Hà Nội',
        phone: '024.62739671', email: 'ttdkhanoi@moj.gov.vn',
        file: '', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '05/08/2026'
    },
    {
        id: 'B07', code: 'KND-2026-007', type: 'CONTACT', name: 'Đầu mối thanh toán phí CSDL',
        zone: 'Hỗ trợ - Thông tin liên hệ', status: 'Đã xuất bản', order: 2,
        titleVi: 'Văn phòng Cục (Bộ phận Tài chính, kế toán)',
        titleEn: 'Department Office (Finance and Accounting Division)',
        contentVi: 'Tiếp nhận vướng mắc về thanh toán phí sử dụng cơ sở dữ liệu.',
        contentEn: 'Handles issues related to database usage fee payment.',
        address: 'Ngõ 25 Nguyễn Cơ Thạch, P. Mỹ Đình 2, Q. Nam Từ Liêm, TP. Hà Nội',
        phone: '024.62739678', email: 'dangky@moj.gov.vn',
        file: '', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '05/08/2026'
    },
    {
        id: 'B08', code: 'KND-2026-008', type: 'FAQ', name: 'FAQ - Hồ sơ đăng ký biện pháp bảo đảm',
        zone: 'Hỗ trợ - Câu hỏi thường gặp', status: 'Đã xuất bản', order: 1,
        category: 'Biện pháp bảo đảm',
        titleVi: 'Hồ sơ đăng ký biện pháp bảo đảm gồm những giấy tờ gì?',
        titleEn: 'What documents are required to register a security interest?',
        contentVi: 'Hồ sơ gồm Phiếu yêu cầu đăng ký theo mẫu, hợp đồng bảo đảm và giấy tờ chứng minh tư cách của bên yêu cầu.',
        contentEn: 'The dossier includes the registration request form, the security contract and documents proving the requester status.',
        file: '', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '12/08/2026'
    },
    {
        id: 'B09', code: 'KND-2026-009', type: 'FAQ', name: 'FAQ - Thời hiệu yêu cầu bồi thường',
        zone: 'Hỗ trợ - Câu hỏi thường gặp', status: 'Lưu nháp', order: 2,
        category: 'Bồi thường nhà nước',
        titleVi: 'Thời hiệu yêu cầu bồi thường nhà nước là bao lâu?',
        titleEn: '',
        contentVi: 'Thời hiệu yêu cầu bồi thường là 03 năm kể từ ngày người có quyền yêu cầu biết hoặc phải biết về thiệt hại.',
        contentEn: '',
        file: '', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '19/09/2026'
    },
    {
        id: 'B10', code: 'KND-2026-010', type: 'DOCUMENT', name: 'Nghị định 99/2022/NĐ-CP',
        zone: 'Hỗ trợ - Văn bản QPPL', status: 'Đã xuất bản', order: 1,
        category: 'Biện pháp bảo đảm', docNo: '99/2022/NĐ-CP', docDate: '30/11/2022',
        effectDate: '15/01/2023', publisher: 'Chính phủ', signer: 'Phạm Minh Chính',
        signerRole: 'Thủ tướng',
        titleVi: 'Về đăng ký biện pháp bảo đảm',
        titleEn: 'On registration of security interests',
        contentVi: 'Nghị định quy định về đăng ký biện pháp bảo đảm, quản lý nhà nước về đăng ký biện pháp bảo đảm.',
        contentEn: 'The Decree regulates the registration of security interests and state management thereof.',
        file: 'ND_99_2022_ND-CP.pdf', media: 'Video_huongdan_nghiepvu.mp4', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '20/08/2026'
    },
    {
        id: 'B11', code: 'KND-2026-011', type: 'DOCUMENT', name: 'Luật Trách nhiệm bồi thường của Nhà nước',
        zone: 'Hỗ trợ - Văn bản QPPL', status: 'Chờ duyệt', order: 2,
        category: 'Bồi thường nhà nước', docNo: '11/2017/QH14', docDate: '20/06/2017',
        effectDate: '01/07/2018', publisher: 'Quốc hội', signer: 'Nguyễn Thị Kim Ngân',
        signerRole: 'Chủ tịch Quốc hội',
        titleVi: 'Luật Trách nhiệm bồi thường của Nhà nước năm 2017',
        titleEn: 'Law on State Compensation Liability 2017',
        contentVi: 'Luật quy định trách nhiệm bồi thường của Nhà nước đối với cá nhân, tổ chức bị thiệt hại.',
        contentEn: 'The Law provides for the State compensation liability towards damaged individuals and organisations.',
        file: 'Luat_11_2017_QH14.pdf', media: 'Video_gioi_thieu_luat_tnbtnn.mp4', from: '', to: '',
        publishedTitleVi: 'Luật Trách nhiệm bồi thường của Nhà nước',
        publishedContentVi: 'Luật quy định trách nhiệm bồi thường của Nhà nước.',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '19/09/2026'
    },
    {
        id: 'B12', code: 'KND-2026-012', type: 'RICHTEXT', name: 'Hướng dẫn thanh toán phí sử dụng CSDL',
        zone: 'Hướng dẫn thanh toán, thu phí', status: 'Bị từ chối', order: 1,
        titleVi: 'Hướng dẫn thanh toán phí sử dụng cơ sở dữ liệu',
        titleEn: 'Guide to database usage fee payment',
        contentVi: 'Khách hàng nộp phí theo biểu phí đang có hiệu lực, mã số CSDL được kích hoạt sau khi hệ thống ghi nhận thanh toán thành công.',
        contentEn: 'Customers pay according to the current fee schedule; the database code is activated once payment is recorded.',
        file: '', from: '', to: '',
        rejectComment: 'Đề nghị bổ sung mức phí cụ thể và thời điểm áp dụng.',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '16/09/2026'
    },
    {
        id: 'B13', code: 'KND-2026-013', type: 'FILE', name: 'Mẫu văn bản đề nghị cấp tài khoản',
        zone: 'Trang chủ - Khối nghiệp vụ', status: 'Ngừng xuất bản', order: 2,
        titleVi: 'Mẫu văn bản đề nghị cấp tài khoản đăng ký trực tuyến',
        titleEn: 'Request form for online registration account',
        contentVi: 'Biểu mẫu áp dụng cho tổ chức đề nghị cấp tài khoản đăng ký trực tuyến.',
        contentEn: 'Form for organisations requesting an online registration account.',
        file: 'Mau_Van_Ban_Yeu_Cau_Cap_Tai_Khoan_NRAST.docx', from: '', to: '',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '14/07/2026'
    }
];

// ===== Trang nội dung giả lập =====
let cmsPages = [
    {
        id: 'P01', name: 'Trang chủ', url: 'HomePage_KH.html', status: 'Đã xuất bản',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '10/09/2026',
        zones: [
            { name: 'Trang chủ - Slider', blocks: ['B01', 'B02'] },
            { name: 'Trang chủ - Lời chào mừng', blocks: ['B03'] },
            { name: 'Trang chủ - Khối nghiệp vụ', blocks: ['B04', 'B13'] },
            { name: 'Trang chủ - Thông báo', blocks: ['B05'] }
        ]
    },
    {
        id: 'P02', name: 'Hỗ trợ khách hàng', url: 'ho_tro_khach_hang_main.html', status: 'Đã xuất bản',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '12/08/2026',
        zones: [
            { name: 'Hỗ trợ - Thông tin liên hệ', blocks: ['B07'] },
            { name: 'Hỗ trợ - Trung tâm đăng ký', blocks: ['B06'] },
            { name: 'Hỗ trợ - Văn bản QPPL', blocks: ['B10', 'B11'] },
            { name: 'Hỗ trợ - Câu hỏi thường gặp', blocks: ['B08', 'B09'] }
        ]
    },
    {
        id: 'P03', name: 'Hướng dẫn thanh toán, thu phí', url: 'huong_dan_thanh_toan.html', status: 'Chờ duyệt',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '16/09/2026',
        zones: [
            { name: 'Hướng dẫn thanh toán, thu phí', blocks: ['B12'] }
        ]
    },
    {
        id: 'P04', name: 'Dùng chung toàn site', url: '(Đầu trang, Chân trang, Menu Liên kết)', status: 'Đã xuất bản',
        updatedBy: 'Trần Thị Biên Tập', updatedAt: '05/08/2026',
        zones: [
            { name: 'Đầu trang', blocks: [] },
            { name: 'Chân trang', blocks: [] },
            { name: 'Menu Liên kết', blocks: [] }
        ]
    }
];

// ===== Thành phần trang tin (bật/tắt hiển thị) =====
let cmsComponents = [
    { id: 'C01', name: 'Slider biểu ngữ', page: 'Trang chủ', visible: true, order: 1, note: 'Hiển thị 4 biểu ngữ đang hiệu lực' },
    { id: 'C02', name: 'Lời chào mừng', page: 'Trang chủ', visible: true, order: 2, note: '' },
    { id: 'C03', name: 'Khối nghiệp vụ Tra cứu', page: 'Trang chủ', visible: true, order: 3, note: '' },
    { id: 'C04', name: 'Khối nghiệp vụ Đăng ký', page: 'Trang chủ', visible: true, order: 4, note: '' },
    { id: 'C05', name: 'Khối nghiệp vụ Hỗ trợ', page: 'Trang chủ', visible: true, order: 5, note: '' },
    { id: 'C06', name: 'Thông báo đường dây nóng', page: 'Trang chủ', visible: true, order: 6, note: 'Chữ đỏ nổi bật giữa trang' },
    { id: 'C07', name: 'Menu Hỗ trợ khách hàng', page: 'Dùng chung', visible: true, order: 1, note: 'Tắt sẽ ẩn mục Hỗ trợ trên đầu trang' },
    { id: 'C08', name: 'Menu Liên kết', page: 'Dùng chung', visible: true, order: 2, note: 'Tắt sẽ ẩn toàn bộ dropdown Liên kết' },
    { id: 'C09', name: 'Thanh đường dây nóng đầu trang', page: 'Dùng chung', visible: true, order: 3, note: '' },
    { id: 'C10', name: 'Chuyển ngôn ngữ Việt/Anh', page: 'Dùng chung', visible: true, order: 4, note: '' },
    { id: 'C11', name: 'Chân trang - Liên kết hữu ích', page: 'Dùng chung', visible: true, order: 5, note: '' },
    { id: 'C12', name: 'Chân trang - Thông tin pháp lý', page: 'Dùng chung', visible: false, order: 6, note: 'Đang tạm ẩn chờ rà soát nội dung' }
];

// ===== Đầu trang / Chân trang =====
let cmsHeader = [
    { id: 'H01', field: 'Tên cơ quan chủ quản', vi: 'Bộ Tư pháp | Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước', en: 'Ministry of Justice | Department of Registration and State Compensation' },
    { id: 'H02', field: 'Tên hệ thống', vi: 'HỆ THỐNG ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC', en: 'SECURED TRANSACTION REGISTRATION AND STATE COMPENSATION SYSTEM' },
    { id: 'H03', field: 'Đường dây nóng', vi: '024.62739677', en: '024.62739677' },
    { id: 'H04', field: 'Email liên hệ', vi: 'dangky@moj.gov.vn; tt_csdl@moj.gov.vn', en: 'dangky@moj.gov.vn; tt_csdl@moj.gov.vn' }
];

let cmsFooter = [
    { id: 'F01', field: 'Tên cơ quan', vi: 'Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước', en: 'Department of Registration and State Compensation' },
    { id: 'F02', field: 'Địa chỉ trụ sở', vi: 'Ngõ 25 Nguyễn Cơ Thạch, P. Mỹ Đình 2, Q. Nam Từ Liêm, TP. Hà Nội', en: 'Lane 25 Nguyen Co Thach, My Dinh 2 Ward, Nam Tu Liem District, Hanoi' },
    { id: 'F03', field: 'Điện thoại', vi: '024.62739677', en: '024.62739677' },
    { id: 'F04', field: 'Email', vi: 'dangky@moj.gov.vn; tt_csdl@moj.gov.vn', en: 'dangky@moj.gov.vn; tt_csdl@moj.gov.vn' },
    { id: 'F05', field: 'Thông tin pháp lý', vi: 'Hệ thống vận hành theo Nghị định số 99/2022/NĐ-CP. Dữ liệu được bảo vệ bằng SSL/TLS 256-bit.', en: 'The system operates under Decree No. 99/2022/ND-CP. Data is protected with 256-bit SSL/TLS.' },
    { id: 'F06', field: 'Dòng bản quyền', vi: 'Bản quyền © 2026 Bộ Tư pháp. Ghi rõ nguồn khi phát hành lại thông tin từ website này.', en: 'Copyright © 2026 Ministry of Justice. Please cite the source when republishing.' }
];

// ===== Thông tin liên kết =====
let cmsLinks = [
    { id: 'L01', labelVi: 'Cổng thông tin điện tử Bộ Tư pháp', labelEn: 'Ministry of Justice Portal', url: 'https://moj.gov.vn/portal/trang-chu.html', zone: 'Cả hai', order: 1, newTab: true },
    { id: 'L02', labelVi: 'Trang thông tin Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước', labelEn: 'Department of Registration and State Compensation', url: 'https://dkgd.moj.gov.vn/portal/trang-chu.html', zone: 'Menu Liên kết', order: 2, newTab: true },
    { id: 'L03', labelVi: 'Tra cứu trực tuyến thông tin đăng ký', labelEn: 'Online registration lookup', url: 'https://dktructuyen.moj.gov.vn', zone: 'Chân trang', order: 3, newTab: true }
];

// ===== Thư viện media =====
let cmsMedia = [
    { id: 'M01', name: 'Khung_gio_lam_viec.jpg', type: 'Ảnh', size: '186 KB', usedIn: 'Biểu ngữ Khung giờ làm việc', at: '10/09/2026' },
    { id: 'M02', name: 'GiaithuongVDA.jpg', type: 'Ảnh', size: '204 KB', usedIn: 'Biểu ngữ Giải thưởng VDA 2024', at: '18/09/2026' },
    { id: 'M03', name: 'ND_99_2022_ND-CP.pdf', type: 'Tài liệu PDF', size: '1,2 MB', usedIn: 'Nghị định 99/2022/NĐ-CP', at: '20/08/2026' },
    { id: 'M04', name: 'Luat_11_2017_QH14.pdf', type: 'Tài liệu PDF', size: '2,4 MB', usedIn: 'Luật Trách nhiệm bồi thường của Nhà nước', at: '19/09/2026' },
    { id: 'M05', name: 'Video_huongdan_nghiepvu.mp4', type: 'Video', size: '48 MB', usedIn: 'Nghị định 99/2022/NĐ-CP', at: '20/08/2026' },
    { id: 'M06', name: 'Mau_Van_Ban_Yeu_Cau_Cap_Tai_Khoan_NRAST.docx', type: 'Biểu mẫu', size: '45 KB', usedIn: 'Mẫu văn bản đề nghị cấp tài khoản', at: '14/07/2026' }
];

// ==========================================================
// TIỆN ÍCH DÙNG CHUNG
// ==========================================================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.className = 'toast ' + type;
    const icon = type === 'success' ? 'fa-circle-check'
        : (type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info');
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

function autoGrowTextarea(el) {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight + 2) + 'px';
}

let cmsConfirmCallback = null;

function showCmsConfirm(title, message, onConfirm) {
    document.getElementById('cmsConfirmTitle').innerText = title;
    document.getElementById('cmsConfirmMessage').innerHTML = message;
    cmsConfirmCallback = onConfirm;
    document.getElementById('cmsConfirmModal').classList.add('active');
}

function closeCmsConfirm() {
    document.getElementById('cmsConfirmModal').classList.remove('active');
    cmsConfirmCallback = null;
}

function statusBadge(status) {
    return `<span class="badge ${STATUS_CLASS[status] || 'st-draft'}">${status}</span>`;
}

function langBadge(block) {
    const vi = (block.titleVi || '').trim() ? 'on' : 'off';
    const en = (block.titleEn || '').trim() ? 'on' : 'off';
    return `<span class="lang-badge ${vi}">VI</span><span class="lang-badge ${en}">EN</span>`;
}

function typeName(code) {
    const t = BLOCK_TYPES.find(x => x.code === code);
    return t ? t.name : code;
}

function nextBlockCode() {
    const max = cmsBlocks.reduce((m, b) => {
        const n = parseInt(String(b.code).split('-').pop(), 10);
        return isNaN(n) ? m : Math.max(m, n);
    }, 0);
    return 'KND-2026-' + String(max + 1).padStart(3, '0');
}

// ==========================================================
// ĐIỀU HƯỚNG TAB VÀ VAI TRÒ
// ==========================================================
function switchCmsTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.cms-tabbar > .cms-tab[data-tab]').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.cms-panel').forEach(p => {
        p.classList.toggle('active', p.id === 'panel-' + tab);
    });
    closePageLayout();
}

function switchSupportSub(sub) {
    currentSupportSub = sub;
    document.querySelectorAll('.cms-tab[data-sub]').forEach(b => {
        b.classList.toggle('active', b.dataset.sub === sub);
    });
    document.querySelectorAll('.cms-sub').forEach(s => {
        s.style.display = (s.id === 'sub-' + sub) ? 'block' : 'none';
    });
}

// Vai trò Biên tập: Thêm mới, Cập nhật, Xóa, Trình duyệt, Nhân bản.
// Vai trò Duyệt: Duyệt, Từ chối, Ngừng xuất bản.
// Thao tác không thỏa điều kiện thì ẩn hoàn toàn, không hiển thị dạng mờ.
function switchCmsRole(role) {
    cmsRole = role;
    document.getElementById('roleBtnEditor').classList.toggle('active', role === 'editor');
    document.getElementById('roleBtnApprover').classList.toggle('active', role === 'approver');
    const isEditor = role === 'editor';
    ['btnAddBlock', 'btnAddBanner', 'btnAddLink'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = isEditor ? 'inline-flex' : 'none';
    });
    renderAll();
    showToast('Đã chuyển sang vai trò: ' + (isEditor ? 'Cán bộ biên tập' : 'Cán bộ duyệt nội dung'), 'info');
}

// Dựng nhóm nút thao tác theo vai trò và trạng thái bản ghi
function blockActions(b) {
    let html = '';
    if (cmsRole === 'editor') {
        if (b.status !== 'Chờ duyệt') {
            html += `<button class="icon-btn edit" data-admin-icon-normalized="1" title="Cập nhật" onclick="openBlockForm('${b.id}')"><i class="fa-solid fa-pen-to-square"></i></button>`;
        }
        if (b.status === 'Lưu nháp' || b.status === 'Bị từ chối') {
            html += `<button class="icon-btn submit" data-admin-icon-normalized="1" title="Trình duyệt" onclick="submitBlock('${b.id}')"><i class="fa-solid fa-paper-plane"></i></button>`;
        }
        if (b.status === 'Lưu nháp') {
            html += `<button class="icon-btn delete" data-admin-icon-normalized="1" title="Xóa" onclick="deleteBlock('${b.id}')"><i class="fa-solid fa-trash-can"></i></button>`;
        }
        html += `<button class="icon-btn copy" data-admin-icon-normalized="1" title="Nhân bản" onclick="cloneBlock('${b.id}')"><i class="fa-solid fa-copy"></i></button>`;
    } else {
        if (b.status === 'Chờ duyệt') {
            html += `<button class="icon-btn approve" data-admin-icon-normalized="1" title="Duyệt nội dung" onclick="openApproveBlock('${b.id}')"><i class="fa-solid fa-circle-check"></i></button>`;
        }
        if (b.status === 'Đã xuất bản') {
            html += `<button class="icon-btn stop" data-admin-icon-normalized="1" title="Ngừng xuất bản" onclick="stopPublish('${b.id}')"><i class="fa-solid fa-circle-pause"></i></button>`;
        }
    }
    return html || '<span style="color:var(--text-muted); font-size:12px;">—</span>';
}

// ==========================================================
// TAB KHỐI NỘI DUNG
// ==========================================================
function filteredBlocks() {
    const kw = (document.getElementById('blkFilterKeyword').value || '').trim().toLowerCase();
    const type = document.getElementById('blkFilterType').value;
    const zone = document.getElementById('blkFilterZone').value;
    const status = document.getElementById('blkFilterStatus').value;
    return cmsBlocks.filter(b => {
        if (kw && !(b.code.toLowerCase().includes(kw) || b.name.toLowerCase().includes(kw))) return false;
        if (type && b.type !== type) return false;
        if (zone && b.zone !== zone) return false;
        if (status && b.status !== status) return false;
        return true;
    });
}

function resetBlockFilter() {
    document.getElementById('blkFilterKeyword').value = '';
    document.getElementById('blkFilterType').value = '';
    document.getElementById('blkFilterZone').value = '';
    document.getElementById('blkFilterStatus').value = '';
    renderBlockTable();
}

function renderBlockTable() {
    const rows = filteredBlocks();
    const tbody = document.getElementById('blockTableBody');
    if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:22px; color:var(--text-muted); font-style:italic;">Không có khối nội dung nào phù hợp điều kiện tìm kiếm.</td></tr>';
        return;
    }
    tbody.innerHTML = rows.map((b, i) => `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${b.code}</strong></td>
            <td>${b.name}</td>
            <td>${typeName(b.type)}</td>
            <td>${b.zone || '—'}</td>
            <td style="text-align:center;">${langBadge(b)}</td>
            <td style="text-align:center;">${statusBadge(b.status)}</td>
            <td style="font-size:12.5px;">${b.updatedAt}<br><span style="color:var(--text-muted);">${b.updatedBy}</span></td>
            <td style="text-align:center; white-space:nowrap;">${blockActions(b)}</td>
        </tr>`).join('');
}

// ==========================================================
// FORM BIÊN TẬP KHỐI NỘI DUNG
// ==========================================================
function openBlockForm(id, presetType) {
    const b = id ? cmsBlocks.find(x => x.id === id) : null;
    document.getElementById('blkId').value = id || '';
    document.getElementById('blockFormTitle').innerHTML = b
        ? '<i class="fa-solid fa-pen-to-square"></i> Cập nhật khối nội dung'
        : '<i class="fa-solid fa-cube"></i> Thêm mới khối nội dung';
    document.getElementById('blkCode').value = b ? b.code : nextBlockCode();
    document.getElementById('blkType').value = b ? b.type : (presetType || 'RICHTEXT');
    document.getElementById('blkName').value = b ? b.name : '';
    document.getElementById('blkZone').value = b ? b.zone : ZONES[0];
    document.getElementById('blkTitleVi').value = b ? (b.titleVi || '') : '';
    document.getElementById('blkTitleEn').value = b ? (b.titleEn || '') : '';
    document.getElementById('blkContentVi').value = b ? (b.contentVi || '') : '';
    document.getElementById('blkContentEn').value = b ? (b.contentEn || '') : '';
    document.getElementById('blkFrom').value = b ? (b.from || '') : '';
    document.getElementById('blkTo').value = b ? (b.to || '') : '';
    blockAttachedFile = b ? (b.file || null) : null;
    renderBlockFileRow();
    switchBlockLang('vi');
    onBlockTypeChange(b);
    document.getElementById('blockFormModal').classList.add('active');
    ['blkContentVi', 'blkContentEn'].forEach(x => autoGrowTextarea(document.getElementById(x)));
}

function closeBlockForm() {
    document.getElementById('blockFormModal').classList.remove('active');
}

function switchBlockLang(lang) {
    document.querySelectorAll('.lang-tab').forEach(t => t.classList.toggle('active', t.dataset.lang === lang));
    document.querySelectorAll('.lang-pane').forEach(p => p.classList.toggle('active', p.id === 'langPane-' + lang));
}

// Bộ trường riêng thay đổi theo Loại khối
function onBlockTypeChange(b) {
    const type = document.getElementById('blkType').value;
    const wrap = document.getElementById('blkExtraFields');
    const v = (k) => (b && b[k]) ? b[k] : '';
    let html = '';
    if (type === 'DOCUMENT') {
        html = `
            <div class="grid-2">
                <div class="form-group"><label class="form-label">Số hiệu văn bản</label>
                    <input type="text" class="form-control" id="blkDocNo" value="${v('docNo')}"></div>
                <div class="form-group"><label class="form-label">Lĩnh vực</label>
                    <select class="form-select" id="blkCategory">
                        <option ${v('category') === 'Biện pháp bảo đảm' ? 'selected' : ''}>Biện pháp bảo đảm</option>
                        <option ${v('category') === 'Bồi thường nhà nước' ? 'selected' : ''}>Bồi thường nhà nước</option>
                    </select></div>
                <div class="form-group"><label class="form-label">Ngày ban hành</label>
                    <input type="text" class="form-control" id="blkDocDate" placeholder="dd/mm/yyyy" value="${v('docDate')}"></div>
                <div class="form-group"><label class="form-label">Ngày có hiệu lực</label>
                    <input type="text" class="form-control" id="blkEffectDate" placeholder="dd/mm/yyyy" value="${v('effectDate')}"></div>
                <div class="form-group"><label class="form-label">Cơ quan ban hành</label>
                    <input type="text" class="form-control" id="blkPublisher" value="${v('publisher')}"></div>
                <div class="form-group"><label class="form-label">Người ký</label>
                    <input type="text" class="form-control" id="blkSigner" value="${v('signer')}"></div>
                <div class="form-group grid-full"><label class="form-label">Media hướng dẫn kèm theo</label>
                    <input type="text" class="form-control" id="blkMedia" placeholder="Tên tệp video hoặc slide" value="${v('media')}"></div>
            </div>`;
    } else if (type === 'FAQ') {
        html = `
            <div class="form-group"><label class="form-label">Lĩnh vực</label>
                <select class="form-select" id="blkCategory">
                    <option ${v('category') === 'Biện pháp bảo đảm' ? 'selected' : ''}>Biện pháp bảo đảm</option>
                    <option ${v('category') === 'Bồi thường nhà nước' ? 'selected' : ''}>Bồi thường nhà nước</option>
                </select></div>`;
    } else if (type === 'CONTACT') {
        html = `
            <div class="grid-2">
                <div class="form-group grid-full"><label class="form-label">Địa chỉ</label>
                    <input type="text" class="form-control" id="blkAddress" value="${v('address')}"></div>
                <div class="form-group"><label class="form-label">Điện thoại</label>
                    <input type="text" class="form-control" id="blkPhone" value="${v('phone')}"></div>
                <div class="form-group"><label class="form-label">Email</label>
                    <input type="text" class="form-control" id="blkEmail" value="${v('email')}"></div>
            </div>`;
    } else if (type === 'BANNER') {
        html = `
            <div class="form-group"><label class="form-label">Thứ tự hiển thị trong slider</label>
                <input type="number" class="form-control" id="blkOrder" min="1" value="${(b && b.order) || 1}"></div>`;
    }
    wrap.innerHTML = html;
}

function renderBlockFileRow() {
    const nameEl = document.getElementById('blkFileName');
    const rmEl = document.getElementById('blkFileRemove');
    if (blockAttachedFile) {
        nameEl.innerHTML = `<i class="fa-solid fa-paperclip"></i> <strong>${blockAttachedFile}</strong>`;
        nameEl.style.fontStyle = 'normal';
        rmEl.style.display = 'inline-flex';
    } else {
        nameEl.innerText = 'Chưa có tệp đính kèm';
        nameEl.style.fontStyle = 'italic';
        rmEl.style.display = 'none';
    }
}

function onBlockFileSelected(input) {
    if (input.files && input.files[0]) {
        blockAttachedFile = input.files[0].name;
        renderBlockFileRow();
        showToast('Đã đính kèm tệp ' + blockAttachedFile, 'success');
    }
}

function removeBlockFile() {
    blockAttachedFile = null;
    document.getElementById('blkFileInput').value = '';
    renderBlockFileRow();
}

function collectBlockForm() {
    const g = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    return {
        type: g('blkType'), name: g('blkName'), zone: g('blkZone'),
        titleVi: g('blkTitleVi'), titleEn: g('blkTitleEn'),
        contentVi: g('blkContentVi'), contentEn: g('blkContentEn'),
        from: g('blkFrom'), to: g('blkTo'), file: blockAttachedFile || '',
        docNo: g('blkDocNo'), docDate: g('blkDocDate'), effectDate: g('blkEffectDate'),
        publisher: g('blkPublisher'), signer: g('blkSigner'), media: g('blkMedia'),
        category: g('blkCategory'), address: g('blkAddress'), phone: g('blkPhone'),
        email: g('blkEmail'), order: parseInt(g('blkOrder'), 10) || 1
    };
}

function saveBlock(targetStatus) {
    const data = collectBlockForm();
    if (!data.name) { showToast('Vui lòng nhập Tên khối.', 'error'); return; }
    if (!data.titleVi) { showToast('Vui lòng nhập Tiêu đề tiếng Việt.', 'error'); return; }

    const id = document.getElementById('blkId').value;
    const today = new Date().toLocaleDateString('vi-VN');
    if (id) {
        const b = cmsBlocks.find(x => x.id === id);
        Object.assign(b, data, { status: targetStatus, updatedAt: today, updatedBy: 'Trần Thị Biên Tập' });
    } else {
        cmsBlocks.unshift(Object.assign({
            id: 'B' + Date.now(), code: document.getElementById('blkCode').value,
            status: targetStatus, updatedAt: today, updatedBy: 'Trần Thị Biên Tập'
        }, data));
    }
    closeBlockForm();
    renderAll();
    showToast(targetStatus === 'Chờ duyệt'
        ? 'Đã trình duyệt khối nội dung, chờ Cán bộ duyệt nội dung xử lý.'
        : 'Đã lưu nháp khối nội dung.', 'success');
}

function submitBlock(id) {
    const b = cmsBlocks.find(x => x.id === id);
    if (!b) return;
    b.status = 'Chờ duyệt';
    b.updatedAt = new Date().toLocaleDateString('vi-VN');
    renderAll();
    showToast('Đã trình duyệt khối ' + b.code, 'success');
}

function deleteBlock(id) {
    const b = cmsBlocks.find(x => x.id === id);
    if (!b) return;
    showCmsConfirm('Xác nhận xóa', `Bạn có chắc chắn muốn xóa khối nội dung <strong>${b.code} - ${b.name}</strong> không?`, () => {
        cmsBlocks = cmsBlocks.filter(x => x.id !== id);
        closeCmsConfirm();
        renderAll();
        showToast('Đã xóa khối nội dung.', 'success');
    });
}

function cloneBlock(id) {
    const b = cmsBlocks.find(x => x.id === id);
    if (!b) return;
    const copy = Object.assign({}, b, {
        id: 'B' + Date.now(), code: nextBlockCode(),
        name: b.name + ' (Bản sao)', status: 'Lưu nháp',
        updatedAt: new Date().toLocaleDateString('vi-VN')
    });
    cmsBlocks.unshift(copy);
    renderAll();
    showToast('Đã nhân bản thành khối ' + copy.code, 'success');
}

function stopPublish(id) {
    const b = cmsBlocks.find(x => x.id === id);
    if (!b) return;
    showCmsConfirm('Xác nhận ngừng xuất bản', `Ngừng xuất bản khối <strong>${b.name}</strong>? Nội dung sẽ không còn hiển thị trên Website khách hàng.`, () => {
        b.status = 'Ngừng xuất bản';
        b.updatedAt = new Date().toLocaleDateString('vi-VN');
        closeCmsConfirm();
        renderAll();
        showToast('Đã ngừng xuất bản khối nội dung.', 'success');
    });
}

function previewBlock() {
    const d = collectBlockForm();
    const w = window.open('', '_blank');
    if (!w) { showToast('Trình duyệt đang chặn mở tab mới.', 'error'); return; }
    w.document.write(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8">
        <title>Xem trước nội dung</title>
        <style>body{font-family:Arial,sans-serif;background:#eef2f7;margin:0;padding:28px;}
        .paper{max-width:900px;margin:0 auto;background:#fff;border-radius:10px;padding:28px 32px;box-shadow:0 10px 30px rgba(15,23,42,.14);}
        h1{font-size:20px;color:#1E3A8A;margin:0 0 6px;} h2{font-size:15px;color:#64748b;margin:22px 0 6px;}
        .lang{display:inline-block;background:#EFF6FF;color:#1d4ed8;border:1px solid #BFDBFE;border-radius:4px;padding:2px 8px;font-size:12px;font-weight:700;margin-bottom:8px;}
        p{line-height:1.8;font-size:14px;color:#1E293B;}</style></head><body>
        <div class="paper">
            <div class="lang">TIẾNG VIỆT</div>
            <h1>${d.titleVi || '(Chưa nhập tiêu đề)'}</h1>
            <p>${(d.contentVi || '(Chưa nhập nội dung)').replace(/\n/g, '<br>')}</p>
            <h2>Bản tiếng Anh</h2>
            <div class="lang">ENGLISH</div>
            <h1>${d.titleEn || '(Not translated yet)'}</h1>
            <p>${(d.contentEn || '(No English content)').replace(/\n/g, '<br>')}</p>
        </div></body></html>`);
    w.document.close();
}

// ==========================================================
// DUYỆT NỘI DUNG
// ==========================================================
function openApproveBlock(id) {
    const b = cmsBlocks.find(x => x.id === id);
    if (!b) return;
    document.getElementById('apvId').value = id;
    document.getElementById('apvCurrent').innerHTML = b.publishedTitleVi
        ? `<div><strong>${b.publishedTitleVi}</strong></div><div style="margin-top:6px;">${b.publishedContentVi || ''}</div>`
        : '<em style="color:var(--text-muted);">Chưa có nội dung đang xuất bản. Đây là lần xuất bản đầu tiên.</em>';
    document.getElementById('apvNew').innerHTML =
        `<div><strong>${b.titleVi}</strong></div><div style="margin-top:6px;">${b.contentVi || ''}</div>`
        + (b.titleEn ? `<div style="margin-top:10px; padding-top:10px; border-top:1px dashed #CBD5E1;"><strong>${b.titleEn}</strong><div style="margin-top:4px;">${b.contentEn || ''}</div></div>` : '');
    document.getElementById('apvComment').value = '';
    document.getElementById('approveBlockModal').classList.add('active');
}

function closeApproveBlock() {
    document.getElementById('approveBlockModal').classList.remove('active');
}

function decideBlock(result) {
    const id = document.getElementById('apvId').value;
    const b = cmsBlocks.find(x => x.id === id);
    if (!b) return;
    const comment = document.getElementById('apvComment').value.trim();
    if (result === 'Bị từ chối' && !comment) {
        showToast('Vui lòng nhập lý do từ chối.', 'error');
        return;
    }
    b.status = result;
    b.updatedAt = new Date().toLocaleDateString('vi-VN');
    if (result === 'Đã xuất bản') {
        b.publishedTitleVi = b.titleVi;
        b.publishedContentVi = b.contentVi;
        b.rejectComment = '';
    } else {
        b.rejectComment = comment;
    }
    closeApproveBlock();
    renderAll();
    showToast(result === 'Đã xuất bản' ? 'Đã duyệt và xuất bản nội dung.' : 'Đã từ chối nội dung.', 'success');
}

// ==========================================================
// TAB TRANG NỘI DUNG
// ==========================================================
function renderPageTable() {
    const tbody = document.getElementById('pageTableBody');
    tbody.innerHTML = cmsPages.map((p, i) => {
        const blockCount = p.zones.reduce((s, z) => s + z.blocks.length, 0);
        let act = '';
        if (cmsRole === 'editor') {
            act += `<button class="icon-btn edit" data-admin-icon-normalized="1" title="Biên tập bố cục" onclick="openPageLayout('${p.id}')"><i class="fa-solid fa-table-cells-large"></i></button>`;
            if (p.status === 'Lưu nháp' || p.status === 'Bị từ chối') {
                act += `<button class="icon-btn submit" data-admin-icon-normalized="1" title="Trình duyệt" onclick="submitPage('${p.id}')"><i class="fa-solid fa-paper-plane"></i></button>`;
            }
        } else if (p.status === 'Chờ duyệt') {
            act += `<button class="icon-btn approve" data-admin-icon-normalized="1" title="Duyệt trang" onclick="approvePage('${p.id}')"><i class="fa-solid fa-circle-check"></i></button>`;
        }
        if (!act) act = '<span style="color:var(--text-muted); font-size:12px;">—</span>';
        return `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${p.name}</strong></td>
            <td style="font-size:12.5px; color:var(--text-muted);">${p.url}</td>
            <td style="text-align:center;">${p.zones.length}</td>
            <td style="text-align:center;">${blockCount}</td>
            <td style="text-align:center;">${statusBadge(p.status)}</td>
            <td style="font-size:12.5px;">${p.updatedAt}<br><span style="color:var(--text-muted);">${p.updatedBy}</span></td>
            <td style="text-align:center; white-space:nowrap;">${act}</td>
        </tr>`;
    }).join('');
}

function openPageLayout(id) {
    editingPageId = id;
    const p = cmsPages.find(x => x.id === id);
    if (!p) return;
    document.getElementById('pageLayoutTitle').innerText = p.name;
    document.getElementById('pageLayoutSection').style.display = 'block';
    renderZoneList();
    renderZoneBlockPool();
    document.getElementById('pageLayoutSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closePageLayout() {
    editingPageId = null;
    const sec = document.getElementById('pageLayoutSection');
    if (sec) sec.style.display = 'none';
}

function renderZoneList() {
    const p = cmsPages.find(x => x.id === editingPageId);
    if (!p) return;
    document.getElementById('zoneList').innerHTML = p.zones.map((z, zi) => {
        const items = z.blocks.length
            ? z.blocks.map((bid, bi) => {
                const b = cmsBlocks.find(x => x.id === bid);
                if (!b) return '';
                const rm = cmsRole === 'editor'
                    ? `<button class="icon-btn delete" data-admin-icon-normalized="1" title="Gỡ khỏi vùng" onclick="removeBlockFromZone(${zi}, ${bi})"><i class="fa-solid fa-xmark"></i></button>` : '';
                const up = (cmsRole === 'editor' && bi > 0)
                    ? `<button class="icon-btn" data-admin-icon-normalized="1" title="Lên trên" onclick="moveBlockInZone(${zi}, ${bi}, -1)"><i class="fa-solid fa-arrow-up"></i></button>` : '';
                const dn = (cmsRole === 'editor' && bi < z.blocks.length - 1)
                    ? `<button class="icon-btn" data-admin-icon-normalized="1" title="Xuống dưới" onclick="moveBlockInZone(${zi}, ${bi}, 1)"><i class="fa-solid fa-arrow-down"></i></button>` : '';
                return `<div class="zone-item">
                        <span><strong>${bi + 1}.</strong> ${b.titleVi} <span style="color:var(--text-muted); font-size:12px;">(${typeName(b.type)})</span></span>
                        <span style="white-space:nowrap;">${statusBadge(b.status)} ${up}${dn}${rm}</span>
                    </div>`;
            }).join('')
            : '<div style="font-size:12.5px; color:var(--text-muted); font-style:italic; padding:6px 2px;">Chưa gắn khối nội dung nào.</div>';
        return `<div style="margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-main); margin-bottom:6px;"><i class="fa-solid fa-layer-group" style="color:var(--primary-color);"></i> ${z.name}</div>
                ${items}
            </div>`;
    }).join('');
}

function renderZoneBlockPool() {
    const p = cmsPages.find(x => x.id === editingPageId);
    if (!p) return;
    const used = p.zones.reduce((a, z) => a.concat(z.blocks), []);
    const pool = cmsBlocks.filter(b => b.status === 'Đã xuất bản' && !used.includes(b.id));
    if (!pool.length) {
        document.getElementById('zoneBlockPool').innerHTML = '<div style="font-size:12.5px; color:var(--text-muted); font-style:italic;">Không còn khối nội dung đã xuất bản nào chưa được sử dụng.</div>';
        return;
    }
    document.getElementById('zoneBlockPool').innerHTML = pool.map(b => {
        const add = cmsRole === 'editor'
            ? `<select class="form-select" style="width:auto; min-width:190px; font-size:12.5px;" onchange="addBlockToZone('${b.id}', this.value); this.selectedIndex=0;">
                    <option value="">-- Gắn vào vùng --</option>
                    ${p.zones.map((z, zi) => `<option value="${zi}">${z.name}</option>`).join('')}
               </select>` : '';
        return `<div class="zone-item">
                <span>${b.titleVi} <span style="color:var(--text-muted); font-size:12px;">(${typeName(b.type)})</span></span>
                ${add}
            </div>`;
    }).join('');
}

function addBlockToZone(blockId, zoneIdx) {
    if (zoneIdx === '') return;
    const p = cmsPages.find(x => x.id === editingPageId);
    p.zones[parseInt(zoneIdx, 10)].blocks.push(blockId);
    p.status = 'Lưu nháp';
    p.updatedAt = new Date().toLocaleDateString('vi-VN');
    renderZoneList(); renderZoneBlockPool(); renderPageTable();
    showToast('Đã gắn khối nội dung vào vùng hiển thị.', 'success');
}

function removeBlockFromZone(zi, bi) {
    const p = cmsPages.find(x => x.id === editingPageId);
    p.zones[zi].blocks.splice(bi, 1);
    p.status = 'Lưu nháp';
    p.updatedAt = new Date().toLocaleDateString('vi-VN');
    renderZoneList(); renderZoneBlockPool(); renderPageTable();
}

function moveBlockInZone(zi, bi, delta) {
    const p = cmsPages.find(x => x.id === editingPageId);
    const arr = p.zones[zi].blocks;
    const t = bi + delta;
    if (t < 0 || t >= arr.length) return;
    [arr[bi], arr[t]] = [arr[t], arr[bi]];
    p.status = 'Lưu nháp';
    renderZoneList(); renderPageTable();
}

function submitPage(id) {
    const p = cmsPages.find(x => x.id === id);
    p.status = 'Chờ duyệt';
    p.updatedAt = new Date().toLocaleDateString('vi-VN');
    renderPageTable();
    showToast('Đã trình duyệt bố cục trang ' + p.name, 'success');
}

function approvePage(id) {
    const p = cmsPages.find(x => x.id === id);
    showCmsConfirm('Xác nhận duyệt trang', `Duyệt và xuất bản bố cục trang <strong>${p.name}</strong>?`, () => {
        p.status = 'Đã xuất bản';
        p.updatedAt = new Date().toLocaleDateString('vi-VN');
        closeCmsConfirm();
        renderPageTable();
        showToast('Đã duyệt và xuất bản trang nội dung.', 'success');
    });
}

function previewCmsPage() {
    const p = cmsPages.find(x => x.id === editingPageId);
    if (!p) return;
    const w = window.open('', '_blank');
    if (!w) { showToast('Trình duyệt đang chặn mở tab mới.', 'error'); return; }
    const body = p.zones.map(z => {
        const items = z.blocks.map(bid => {
            const b = cmsBlocks.find(x => x.id === bid);
            if (!b) return '';
            return `<div class="blk"><h3>${b.titleVi}</h3><p>${(b.contentVi || '').replace(/\n/g, '<br>')}</p></div>`;
        }).join('');
        return `<section><h2>${z.name}</h2>${items || '<p class="empty">Chưa gắn khối nội dung.</p>'}</section>`;
    }).join('');
    w.document.write(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Xem trước: ${p.name}</title>
        <style>body{font-family:Arial,sans-serif;background:#eef2f7;margin:0;padding:26px;}
        .paper{max-width:960px;margin:0 auto;background:#fff;border-radius:10px;padding:26px 30px;box-shadow:0 10px 30px rgba(15,23,42,.14);}
        h1{font-size:21px;color:#1E3A8A;margin:0 0 4px;} .url{color:#64748b;font-size:13px;margin-bottom:20px;}
        h2{font-size:13px;text-transform:uppercase;color:#1d4ed8;border-bottom:2px solid #BFDBFE;padding-bottom:5px;margin:22px 0 10px;}
        .blk{border:1px solid #E2E8F0;border-radius:8px;padding:12px 14px;margin-bottom:10px;background:#F8FAFC;}
        .blk h3{margin:0 0 6px;font-size:15px;color:#1E293B;} .blk p{margin:0;font-size:13.5px;line-height:1.75;color:#334155;}
        .empty{color:#94a3b8;font-style:italic;font-size:13px;}</style></head><body>
        <div class="paper"><h1>${p.name}</h1><div class="url">${p.url}</div>${body}</div></body></html>`);
    w.document.close();
}

// ==========================================================
// TAB THÀNH PHẦN TRANG TIN
// ==========================================================
function renderComponentTable() {
    const isEditor = cmsRole === 'editor';
    document.getElementById('componentTableBody').innerHTML = cmsComponents.map((c, i) => `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${c.name}</strong></td>
            <td>${c.page}</td>
            <td style="text-align:center;">
                <span class="switch-cell">
                    <button class="toggle ${c.visible ? 'on' : ''}" ${isEditor ? `onclick="toggleComponent('${c.id}')"` : 'disabled style="opacity:.5; cursor:not-allowed;"'}></button>
                    <span style="font-size:12.5px; color:${c.visible ? 'var(--success-color)' : 'var(--text-muted)'};">${c.visible ? 'Hiển thị' : 'Đang ẩn'}</span>
                </span>
            </td>
            <td style="text-align:center;">${c.order}</td>
            <td style="font-size:12.5px; color:var(--text-muted);">${c.note || '—'}</td>
        </tr>`).join('');
}

function toggleComponent(id) {
    const c = cmsComponents.find(x => x.id === id);
    c.visible = !c.visible;
    renderComponentTable();
    showToast(`Đã ${c.visible ? 'bật' : 'tắt'} hiển thị thành phần "${c.name}".`, 'success');
}

// ==========================================================
// TAB BIỂU NGỮ, ĐẦU TRANG, CHÂN TRANG
// ==========================================================
function renderBannerTable() {
    const rows = cmsBlocks.filter(b => b.type === 'BANNER');
    const tbody = document.getElementById('bannerTableBody');
    if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted); font-style:italic;">Chưa có biểu ngữ nào.</td></tr>';
        return;
    }
    tbody.innerHTML = rows.map((b, i) => `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${b.titleVi}</strong></td>
            <td style="font-size:12.5px;"><i class="fa-solid fa-image" style="color:#64748b;"></i> ${b.file || '—'}</td>
            <td style="font-size:12.5px;">${b.from || '—'} → ${b.to || 'Không giới hạn'}</td>
            <td style="text-align:center;">${b.order || 1}</td>
            <td style="text-align:center;">${langBadge(b)}</td>
            <td style="text-align:center;">${statusBadge(b.status)}</td>
            <td style="text-align:center; white-space:nowrap;">${blockActions(b)}</td>
        </tr>`).join('');
}

function renderHeaderFooter() {
    const act = (kind, id) => cmsRole === 'editor'
        ? `<button class="icon-btn edit" data-admin-icon-normalized="1" title="Cập nhật" onclick="editHeaderFooter('${kind}','${id}')"><i class="fa-solid fa-pen-to-square"></i></button>`
        : '<span style="color:var(--text-muted); font-size:12px;">—</span>';
    document.getElementById('headerTableBody').innerHTML = cmsHeader.map(h => `
        <tr>
            <td><strong>${h.field}</strong></td>
            <td style="font-size:12.5px;">${h.vi}</td>
            <td style="font-size:12.5px; color:var(--text-muted);">${h.en || '<em>Chưa nhập bản tiếng Anh</em>'}</td>
            <td style="text-align:center;">${act('header', h.id)}</td>
        </tr>`).join('');
    document.getElementById('footerTableBody').innerHTML = cmsFooter.map(f => `
        <tr>
            <td><strong>${f.field}</strong></td>
            <td style="font-size:12.5px;">${f.vi}</td>
            <td style="font-size:12.5px; color:var(--text-muted);">${f.en || '<em>Chưa nhập bản tiếng Anh</em>'}</td>
            <td style="text-align:center;">${act('footer', f.id)}</td>
        </tr>`).join('');
}

function editHeaderFooter(kind, id) {
    const arr = kind === 'header' ? cmsHeader : cmsFooter;
    const row = arr.find(x => x.id === id);
    if (!row) return;
    document.getElementById('hfKind').value = kind;
    document.getElementById('hfId').value = id;
    document.getElementById('hfFormTitle').innerText =
        'Cập nhật ' + (kind === 'header' ? 'Đầu trang' : 'Chân trang');
    document.getElementById('hfField').value = row.field;
    document.getElementById('hfVi').value = row.vi || '';
    document.getElementById('hfEn').value = row.en || '';
    switchHfLang('vi');
    document.getElementById('hfFormModal').classList.add('active');
    ['hfVi', 'hfEn'].forEach(x => autoGrowTextarea(document.getElementById(x)));
}

function switchHfLang(lang) {
    document.querySelectorAll('.lang-tab[data-hflang]').forEach(t => {
        t.classList.toggle('active', t.dataset.hflang === lang);
    });
    document.getElementById('hfPane-vi').style.display = lang === 'vi' ? 'block' : 'none';
    document.getElementById('hfPane-en').style.display = lang === 'en' ? 'block' : 'none';
}

function closeHfForm() {
    document.getElementById('hfFormModal').classList.remove('active');
}

function saveHeaderFooter() {
    const kind = document.getElementById('hfKind').value;
    const id = document.getElementById('hfId').value;
    const vi = document.getElementById('hfVi').value.trim();
    if (!vi) { showToast('Vui lòng nhập nội dung Tiếng Việt.', 'error'); return; }
    const arr = kind === 'header' ? cmsHeader : cmsFooter;
    const row = arr.find(x => x.id === id);
    row.vi = vi;
    row.en = document.getElementById('hfEn').value.trim();
    closeHfForm();
    renderHeaderFooter();
    showToast('Đã cập nhật nội dung ' + (kind === 'header' ? 'Đầu trang' : 'Chân trang') + '.', 'success');
}

// ==========================================================
// TAB THÔNG TIN LIÊN KẾT
// ==========================================================
function renderLinkTable() {
    const tbody = document.getElementById('linkTableBody');
    if (!cmsLinks.length) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--text-muted); font-style:italic;">Chưa có liên kết nào.</td></tr>';
        return;
    }
    tbody.innerHTML = cmsLinks.map((l, i) => {
        const act = cmsRole === 'editor'
            ? `<button class="icon-btn edit" data-admin-icon-normalized="1" title="Cập nhật" onclick="openLinkForm('${l.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
               <button class="icon-btn delete" data-admin-icon-normalized="1" title="Xóa" onclick="deleteLink('${l.id}')"><i class="fa-solid fa-trash-can"></i></button>`
            : '<span style="color:var(--text-muted); font-size:12px;">—</span>';
        return `<tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${l.labelVi}</strong></td>
            <td style="color:var(--text-muted);">${l.labelEn || '<em>Chưa nhập</em>'}</td>
            <td style="font-size:12.5px;"><a href="${l.url}" target="_blank" style="color:#1d4ed8;">${l.url}</a></td>
            <td>${l.zone}</td>
            <td style="text-align:center;">${l.order}</td>
            <td style="text-align:center; white-space:nowrap;">${act}</td>
        </tr>`;
    }).join('');
}

function openLinkForm(id) {
    const l = id ? cmsLinks.find(x => x.id === id) : null;
    document.getElementById('lnkId').value = id || '';
    document.getElementById('linkFormTitle').innerHTML = l
        ? '<i class="fa-solid fa-pen-to-square"></i> Cập nhật liên kết'
        : '<i class="fa-solid fa-link"></i> Thêm liên kết';
    document.getElementById('lnkLabelVi').value = l ? l.labelVi : '';
    document.getElementById('lnkLabelEn').value = l ? l.labelEn : '';
    document.getElementById('lnkUrl').value = l ? l.url : '';
    document.getElementById('lnkZone').value = l ? l.zone : 'Menu Liên kết';
    document.getElementById('lnkOrder').value = l ? l.order : (cmsLinks.length + 1);
    document.getElementById('lnkNewTab').checked = l ? l.newTab : true;
    document.getElementById('linkFormModal').classList.add('active');
}

function closeLinkForm() {
    document.getElementById('linkFormModal').classList.remove('active');
}

function saveLink() {
    const labelVi = document.getElementById('lnkLabelVi').value.trim();
    const url = document.getElementById('lnkUrl').value.trim();
    if (!labelVi) { showToast('Vui lòng nhập Nhãn hiển thị tiếng Việt.', 'error'); return; }
    if (!url) { showToast('Vui lòng nhập Đường dẫn.', 'error'); return; }
    const data = {
        labelVi, labelEn: document.getElementById('lnkLabelEn').value.trim(), url,
        zone: document.getElementById('lnkZone').value,
        order: parseInt(document.getElementById('lnkOrder').value, 10) || 1,
        newTab: document.getElementById('lnkNewTab').checked
    };
    const id = document.getElementById('lnkId').value;
    if (id) Object.assign(cmsLinks.find(x => x.id === id), data);
    else cmsLinks.push(Object.assign({ id: 'L' + Date.now() }, data));
    cmsLinks.sort((a, b) => a.order - b.order);
    closeLinkForm();
    renderLinkTable();
    showToast('Đã lưu thông tin liên kết.', 'success');
}

function deleteLink(id) {
    const l = cmsLinks.find(x => x.id === id);
    showCmsConfirm('Xác nhận xóa', `Xóa liên kết <strong>${l.labelVi}</strong>?`, () => {
        cmsLinks = cmsLinks.filter(x => x.id !== id);
        closeCmsConfirm();
        renderLinkTable();
        showToast('Đã xóa liên kết.', 'success');
    });
}

// ==========================================================
// TAB HỖ TRỢ NGƯỜI DÙNG
// ==========================================================
function renderSupportTables() {
    const faqs = cmsBlocks.filter(b => b.type === 'FAQ');
    document.getElementById('faqTableBody').innerHTML = faqs.length ? faqs.map((b, i) => `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td>${b.category || '—'}</td>
            <td><strong>${b.titleVi}</strong></td>
            <td style="text-align:center;">${langBadge(b)}</td>
            <td style="text-align:center;">${statusBadge(b.status)}</td>
            <td style="text-align:center; white-space:nowrap;">${blockActions(b)}</td>
        </tr>`).join('')
        : '<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted); font-style:italic;">Chưa có câu hỏi nào.</td></tr>';

    const docs = cmsBlocks.filter(b => b.type === 'DOCUMENT');
    document.getElementById('docTableBody').innerHTML = docs.length ? docs.map((b, i) => `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${b.docNo || '—'}</strong></td>
            <td>${b.titleVi}</td>
            <td>${b.category || '—'}</td>
            <td style="text-align:center; font-size:12px;">
                ${b.file ? '<i class="fa-solid fa-file-pdf" style="color:#DC2626;" title="' + b.file + '"></i>' : ''}
                ${b.media ? '<i class="fa-solid fa-circle-play" style="color:#2563EB; margin-left:6px;" title="' + b.media + '"></i>' : ''}
                ${(!b.file && !b.media) ? '—' : ''}
            </td>
            <td style="text-align:center;">${langBadge(b)}</td>
            <td style="text-align:center;">${statusBadge(b.status)}</td>
            <td style="text-align:center; white-space:nowrap;">${blockActions(b)}</td>
        </tr>`).join('')
        : '<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted); font-style:italic;">Chưa có văn bản nào.</td></tr>';

    const contacts = cmsBlocks.filter(b => b.type === 'CONTACT');
    document.getElementById('contactTableBody').innerHTML = contacts.length ? contacts.map((b, i) => `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${b.titleVi}</strong></td>
            <td style="font-size:12.5px;">${b.address || '—'}</td>
            <td style="font-size:12.5px;">${b.phone || '—'}</td>
            <td style="font-size:12.5px;">${b.email || '—'}</td>
            <td style="text-align:center;">${statusBadge(b.status)}</td>
            <td style="text-align:center; white-space:nowrap;">${blockActions(b)}</td>
        </tr>`).join('')
        : '<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--text-muted); font-style:italic;">Chưa có đầu mối liên hệ nào.</td></tr>';

    const guides = cmsBlocks.filter(b => b.zone === 'Hướng dẫn thanh toán, thu phí');
    document.getElementById('guideTableBody').innerHTML = guides.length ? guides.map((b, i) => `
        <tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${b.titleVi}</strong>${b.rejectComment ? `<div style="font-size:11.5px; color:var(--danger-color); margin-top:3px;"><i class="fa-solid fa-circle-exclamation"></i> ${b.rejectComment}</div>` : ''}</td>
            <td>${b.zone}</td>
            <td style="text-align:center;">${langBadge(b)}</td>
            <td style="text-align:center;">${statusBadge(b.status)}</td>
            <td style="text-align:center; white-space:nowrap;">${blockActions(b)}</td>
        </tr>`).join('')
        : '<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted); font-style:italic;">Chưa có nội dung hướng dẫn nào.</td></tr>';
}

// ==========================================================
// TAB THƯ VIỆN MEDIA
// ==========================================================
function renderMediaTable() {
    document.getElementById('mediaTableBody').innerHTML = cmsMedia.map((m, i) => {
        const act = cmsRole === 'editor'
            ? `<button class="icon-btn delete" data-admin-icon-normalized="1" title="Xóa tệp" onclick="deleteMedia('${m.id}')"><i class="fa-solid fa-trash-can"></i></button>`
            : '<span style="color:var(--text-muted); font-size:12px;">—</span>';
        return `<tr>
            <td style="text-align:center;">${i + 1}</td>
            <td><strong>${m.name}</strong></td>
            <td>${m.type}</td>
            <td>${m.size}</td>
            <td style="font-size:12.5px; color:var(--text-muted);">${m.usedIn}</td>
            <td style="font-size:12.5px;">${m.at}</td>
            <td style="text-align:center;">${act}</td>
        </tr>`;
    }).join('');
}

function deleteMedia(id) {
    const m = cmsMedia.find(x => x.id === id);
    showCmsConfirm('Xác nhận xóa tệp', `Xóa tệp <strong>${m.name}</strong>? Tệp đang được dùng tại: ${m.usedIn}.`, () => {
        cmsMedia = cmsMedia.filter(x => x.id !== id);
        closeCmsConfirm();
        renderMediaTable();
        showToast('Đã xóa tệp khỏi thư viện media.', 'success');
    });
}

// ==========================================================
// KHỞI TẠO
// ==========================================================
function renderAll() {
    renderBlockTable();
    renderPageTable();
    renderComponentTable();
    renderBannerTable();
    renderHeaderFooter();
    renderLinkTable();
    renderSupportTables();
    renderMediaTable();
    if (editingPageId) { renderZoneList(); renderZoneBlockPool(); }
}

function initCmsSelects() {
    const opt = (v) => `<option value="${v}">${v}</option>`;
    document.getElementById('blkFilterType').innerHTML = '<option value="">-- Tất cả --</option>'
        + BLOCK_TYPES.map(t => `<option value="${t.code}">${t.name}</option>`).join('');
    document.getElementById('blkType').innerHTML = BLOCK_TYPES.map(t => `<option value="${t.code}">${t.name}</option>`).join('');
    document.getElementById('blkFilterZone').innerHTML = '<option value="">-- Tất cả --</option>' + ZONES.map(opt).join('');
    document.getElementById('blkZone').innerHTML = ZONES.map(opt).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    initCmsSelects();
    renderAll();
    document.getElementById('cmsConfirmOk').addEventListener('click', () => {
        if (typeof cmsConfirmCallback === 'function') cmsConfirmCallback();
    });
});
