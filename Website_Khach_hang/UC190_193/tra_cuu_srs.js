/**
 * Logic điều khiển cho Màn hình Tra cứu & Lịch sử thay đổi (UC190 - UC193 & UCPS003)
 */

// ==========================================
// MOCK DATABASES
// ==========================================

// 1. Danh sách Mã CSDL và trạng thái xác thực
const mockCSDLCodes = {
    "TX-123456": { status: "active", type: "regular", remaining: 9999, expiry: "31/12/2026" },
    "TX-LOCKED": { status: "locked", type: "regular", remaining: 9999, expiry: "31/12/2026" },
    "TX-EXPIRED": { status: "expired", type: "regular", remaining: 9999, expiry: "31/12/2025" },
    "1L-EMPTY": { status: "expired", type: "once", remaining: 0, expiry: "15/05/2026" },
    "1L-5L": { status: "active", type: "once", remaining: 5, expiry: "30/06/2026" }
};

// 2. Danh sách hồ sơ BPBĐ phục vụ tìm kiếm CSDL (Chỉ lọc các dữ liệu Hoàn thành)
const mockRegistryDatabase = [
    {
        stt: 1,
        id: "BD-2026-001",
        pin: "8899A",
        date: "10/01/2026 09:15:30",
        type: "Đăng ký lần đầu",
        ownerName: "Công ty TNHH Hoàng Phát",
        ownerDoc: "0102030405", // MST
        creditorName: "Ngân hàng TMCP Quốc tế (VIB)",
        chassis: "RLHAA123",
        status: "Hoàn thành",
        parentId: null, // Gốc
        historyVersions: ["v1", "v2", "v3", "v4"]
    },
    {
        stt: 1,
        id: "BD-2026-001-T1",
        pin: "8899A",
        date: "15/02/2026 14:20:10",
        type: "Đăng ký thay đổi",
        ownerName: "Công ty TNHH Hoàng Phát & Lê Hoàng Nam",
        ownerDoc: "0102030405",
        creditorName: "Ngân hàng TMCP Quốc tế (VIB)",
        chassis: "RLHAA123",
        status: "Hoàn thành",
        parentId: "BD-2026-001",
        historyVersions: ["v1", "v2", "v3", "v4"]
    },
    {
        stt: 1,
        id: "BD-2026-001-CL",
        pin: "8899A",
        date: "10/03/2026 10:05:00",
        type: "Chỉnh lý thông tin",
        ownerName: "Công ty TNHH Hoàng Phát & Lê Hoài Nam",
        ownerDoc: "0102030405",
        creditorName: "Ngân hàng TMCP Quốc tế (VIB)",
        chassis: "RLHAA123",
        status: "Hoàn thành",
        parentId: "BD-2026-001",
        historyVersions: ["v1", "v2", "v3", "v4"]
    },
    {
        stt: 1,
        id: "BD-2026-001-X1",
        pin: "8899A",
        date: "20/04/2026 16:30:00",
        type: "Xóa đăng ký",
        ownerName: "Công ty TNHH Hoàng Phát & Lê Hoài Nam",
        ownerDoc: "0102030405",
        creditorName: "Ngân hàng TMCP Quốc tế (VIB)",
        chassis: "RLHAA123",
        status: "Hoàn thành",
        parentId: "BD-2026-001",
        historyVersions: ["v1", "v2", "v3", "v4"]
    },
    
    // Hồ sơ 2: Nguyễn Văn An (CCCD 001092012345)
    {
        stt: 2,
        id: "BD-2026-002",
        pin: "4455B",
        date: "02/02/2026 08:30:00",
        type: "Đăng ký lần đầu",
        ownerName: "Nguyễn Văn An",
        ownerDoc: "001092012345", // CCCD 12 số
        creditorName: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)",
        chassis: "RLHXX789",
        status: "Hoàn thành",
        parentId: null,
        historyVersions: ["v1_2", "v2_2"]
    },
    {
        stt: 2,
        id: "BD-2026-002-T1",
        pin: "4455B",
        date: "25/03/2026 11:45:00",
        type: "Đăng ký thay đổi",
        ownerName: "Nguyễn Văn An",
        ownerDoc: "001092012345",
        creditorName: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)",
        chassis: "RLHXX789",
        status: "Hoàn thành",
        parentId: "BD-2026-002",
        historyVersions: ["v1_2", "v2_2"]
    },

    // Hồ sơ 3: Trần Thị Mai (CCCD 001096999999) - Hủy & Khôi phục
    {
        stt: 3,
        id: "BD-2026-003",
        pin: "1122C",
        date: "20/02/2026 15:10:00",
        type: "Đăng ký lần đầu",
        ownerName: "Trần Thị Mai",
        ownerDoc: "001096999999",
        creditorName: "Ngân hàng TMCP Công thương Việt Nam (Vietinbank)",
        chassis: "RLHZZ333",
        status: "Hoàn thành",
        parentId: null,
        historyVersions: ["v1_3", "v2_3", "v3_3"]
    },
    {
        stt: 3,
        id: "BD-2026-003-H1",
        pin: "1122C",
        date: "05/04/2026 09:30:00",
        type: "Hủy đăng ký",
        ownerName: "Trần Thị Mai",
        ownerDoc: "001096999999",
        creditorName: "Ngân hàng TMCP Công thương Việt Nam (Vietinbank)",
        chassis: "RLHZZ333",
        status: "Hoàn thành",
        parentId: "BD-2026-003",
        historyVersions: ["v1_3", "v2_3", "v3_3"]
    },
    {
        stt: 3,
        id: "BD-2026-003-KP",
        pin: "1122C",
        date: "12/04/2026 11:20:00",
        type: "Khôi phục hủy đăng ký",
        ownerName: "Trần Thị Mai",
        ownerDoc: "001096999999",
        creditorName: "Ngân hàng TMCP Công thương Việt Nam (Vietinbank)",
        chassis: "RLHZZ333",
        status: "Hoàn thành",
        parentId: "BD-2026-003",
        historyVersions: ["v1_3", "v2_3", "v3_3"]
    }
];

// 3. Tiến trình hồ sơ TTHC (UC193)
const mockTTHCDatabase = {
    "HS-2026-0001": {
        code: "HS-2026-0001",
        type: "Đăng ký mới biện pháp bảo đảm",
        receivedDate: "28/05/2026 09:00:00",
        dueDate: "29/05/2026",
        channel: "Trực tuyến (Cổng DVC)",
        status: "Hoàn thành",
        feedback: "Hồ sơ đầy đủ, đã được ký duyệt trực tuyến thành công.",
        resultFile: "Giấy chứng nhận đăng ký (PDF đã ký số)"
    },
    "HS-2026-0002": {
        code: "HS-2026-0002",
        type: "Đăng ký thay đổi biện pháp bảo đảm",
        receivedDate: "08/06/2026 10:30:00",
        dueDate: "09/06/2026",
        channel: "Trực tiếp tại quầy",
        status: "Đang xử lý",
        feedback: "Đang trình lãnh đạo ký duyệt.",
        resultFile: "-"
    },
    "HS-2026-0003": {
        code: "HS-2026-0003",
        type: "Xóa đăng ký biện pháp bảo đảm",
        receivedDate: "05/06/2026 14:15:00",
        dueDate: "08/06/2026",
        channel: "Qua bưu chính",
        status: "Bị từ chối",
        feedback: "Không khớp thông tin chữ ký số của Bên bảo đảm trên hồ sơ.",
        resultFile: "Thông báo từ chối giải quyết (PDF đã ký số)"
    },
    "HS-2026-0004": {
        code: "HS-2026-0004",
        type: "Đăng ký mới biện pháp bảo đảm",
        receivedDate: "09/06/2026 08:20:00",
        dueDate: "10/06/2026",
        channel: "Trực tuyến (Cổng DVC)",
        status: "Chờ tiếp nhận",
        feedback: "-",
        resultFile: "-"
    }
};

// 4. Cơ sở dữ liệu so sánh Before/After chi tiết cho UCPS003
const mockVersionDetails = {
    // ---- CHUỖI HỒ SƠ 1: BD-2026-001 ----
    "v1": {
        verName: "Đăng ký lần đầu (Gốc)",
        dosNum: "HS-2026-001-ROOT",
        dosDate: "10/01/2026 09:15:30",
        rootDosNum: "BD-2026-001",
        rootDosDate: "10/01/2026 09:15:30",
        caseName: "Đăng ký lần đầu",
        status: "Hoàn thành",
        
        regName: "Nguyễn Văn Hải",
        regAddress: "Số 15 Phố Duy Tân, Phường Dịch Vọng Hậu, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
        regProof: "Giấy ủy quyền số 45/UQ-HP.pdf",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-0992/2026",
        effectiveDate: "09/01/2026",
        loanVal: "5,000,000,000",
        scale: "Doanh nghiệp vừa và nhỏ",
        femaleOwner: "Không",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Tổ chức có đăng ký kinh doanh trong nước", doc: "0102030405", name: "Công ty TNHH Hoàng Phát", address: "Số 20 Đường Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        creditors: [
            { name: "Ngân hàng TMCP Quốc tế (VIB) - Chi nhánh Hà Nội", address: "Tòa nhà VIB, Số 111 Phố Trung Kính, Quận Cầu Giấy, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Toyota Camry màu đen", chassis: "RLHAA123", engine: "2AR-55667 / 30H-123.45", changeTag: "Đang bảo đảm", rawChangeTag: "" }
        ]
    },
    "v2": {
        verName: "Thay đổi lần 1 (BD-2026-001-T1)",
        dosNum: "HS-2026-001-T1",
        dosDate: "15/02/2026 14:20:10",
        rootDosNum: "BD-2026-001",
        rootDosDate: "10/01/2026 09:15:30",
        caseName: "Thay đổi nội dung đăng ký",
        status: "Hoàn thành",

        regName: "Nguyễn Văn Hải",
        regAddress: "Số 15 Phố Duy Tân, Phường Dịch Vọng Hậu, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
        regProof: "Giấy ủy quyền số 45/UQ-HP.pdf",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-0992/2026",
        effectiveDate: "09/01/2026",
        loanVal: "8,000,000,000", // Thay đổi tiền
        scale: "Doanh nghiệp vừa và nhỏ",
        femaleOwner: "Không",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Tổ chức có đăng ký kinh doanh trong nước", doc: "0102030405", name: "Công ty TNHH Hoàng Phát", address: "Số 20 Đường Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam", changeTag: "" },
            { type: "Công dân Việt Nam", doc: "001092999999", name: "Lê Hoàng Nam", address: "Số 5 Ngách 10/2 Phố Láng Hạ, Quận Đống Đa, TP. Hà Nội, Việt Nam", changeTag: "Bổ sung mới" } // Bổ sung mới
        ],
        creditors: [
            { name: "Ngân hàng TMCP Quốc tế (VIB) - Chi nhánh Hà Nội", address: "Tòa nhà VIB, Số 111 Phố Trung Kính, Quận Cầu Giấy, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Toyota Camry màu đen", chassis: "RLHAA123", engine: "2AR-55667 / 30H-123.45", changeTag: "Đang bảo đảm", rawChangeTag: "" },
            { stt: 2, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Mazda CX-5 màu trắng", chassis: "RLHBB456", engine: "PE-78899 / 30K-999.99", changeTag: "Bổ sung mới", rawChangeTag: "add" }
        ],
        modifiedFields: {
            loanVal: { old: "5,000,000,000" }
        }
    },
    "v3": {
        verName: "Chỉnh lý thông tin (BD-2026-001-CL)",
        dosNum: "HS-2026-001-CL",
        dosDate: "10/03/2026 10:05:00",
        rootDosNum: "BD-2026-001",
        rootDosDate: "10/01/2026 09:15:30",
        caseName: "Chỉnh lý thông tin có sai sót",
        status: "Hoàn thành",

        regName: "Lê Hoài Nam", // Thay đổi
        regAddress: "Số 5 Ngách 10/2 Phố Láng Hạ, Quận Đống Đa, TP. Hà Nội, Việt Nam",
        regProof: "Văn bản đính kèm yêu cầu chỉnh lý.pdf",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-0992/2026",
        effectiveDate: "09/01/2026",
        loanVal: "8,000,000,000",
        scale: "Doanh nghiệp vừa và nhỏ",
        femaleOwner: "Không",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Tổ chức có đăng ký kinh doanh trong nước", doc: "0102030405", name: "Công ty TNHH Hoàng Phát", address: "Số 20 Đường Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam", changeTag: "" },
            { type: "Công dân Việt Nam", doc: "001092999999", name: "Lê Hoài Nam", address: "Số 5 Ngách 10/2 Phố Láng Hạ, Quận Đống Đa, TP. Hà Nội, Việt Nam", changeTag: "Sửa thông tin" } // Chỉnh sửa họ tên
        ],
        creditors: [
            { name: "Ngân hàng TMCP Quốc tế (VIB) - Chi nhánh Hà Nội", address: "Tòa nhà VIB, Số 111 Phố Trung Kính, Quận Cầu Giấy, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Toyota Camry màu đen", chassis: "RLHAA123", engine: "2AR-55667 / 30H-123.45", changeTag: "Đang bảo đảm", rawChangeTag: "" },
            { stt: 2, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Mazda CX-5 màu trắng", chassis: "RLHBB456", engine: "PE-78899 / 30K-999.99", changeTag: "Đang bảo đảm", rawChangeTag: "" }
        ],
        modifiedFields: {
            owner_name: { index: 1, old: "Lê Hoàng Nam" }
        },
        editInfo: {
            date: "10/03/2026 10:05:00",
            requester: "Lê Hoài Nam",
            officer: "Vũ Minh Đức (Chuyên viên nghiệp vụ)",
            leader: "Nguyễn Thế Anh (Trưởng phòng ký số)",
            docLink: "Thông báo chỉnh lý thông tin.pdf"
        }
    },
    "v4": {
        verName: "Xóa đăng ký (BD-2026-001-X1)",
        dosNum: "HS-2026-001-X1",
        dosDate: "20/04/2026 16:30:00",
        rootDosNum: "BD-2026-001",
        rootDosDate: "10/01/2026 09:15:30",
        caseName: "Xóa đăng ký",
        status: "Hoàn thành",

        regName: "Lê Hoài Nam",
        regAddress: "Số 5 Ngách 10/2 Phố Láng Hạ, Quận Đống Đa, TP. Hà Nội, Việt Nam",
        regProof: "Đơn yêu cầu xóa đăng ký.pdf",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-0992/2026",
        effectiveDate: "09/01/2026",
        loanVal: "8,000,000,000",
        femaleOwner: "Không",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Tổ chức có đăng ký kinh doanh trong nước", doc: "0102030405", name: "Công ty TNHH Hoàng Phát", address: "Số 20 Đường Trần Hưng Đạo, Quận Hoàn Kiếm, TP. Hà Nội, Việt Nam", changeTag: "" },
            { type: "Công dân Việt Nam", doc: "001092999999", name: "Lê Hoài Nam", address: "Số 5 Ngách 10/2 Phố Láng Hạ, Quận Đống Đa, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        creditors: [
            { name: "Ngân hàng TMCP Quốc tế (VIB) - Chi nhánh Hà Nội", address: "Tòa nhà VIB, Số 111 Phố Trung Kính, Quận Cầu Giấy, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Toyota Camry màu đen", chassis: "RLHAA123", engine: "2AR-55667 / 30H-123.45", changeTag: "Đã giải chấp", rawChangeTag: "delete" },
            { stt: 2, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Mazda CX-5 màu trắng", chassis: "RLHBB456", engine: "PE-78899 / 30K-999.99", changeTag: "Đã giải chấp", rawChangeTag: "delete" }
        ],
        deleteInfo: {
            date: "20/04/2026 16:30:00",
            requester: "Công ty TNHH Hoàng Phát & Ngân hàng VIB",
            reason: "Hai bên thỏa thuận hoàn thành toàn bộ nghĩa vụ tài chính và giải chấp tài sản bảo đảm.",
            docLink: "Thông báo xóa đăng ký.pdf"
        }
    },

    // ---- CHUỖI HỒ SƠ 2: BD-2026-002 ----
    "v1_2": {
        verName: "Đăng ký lần đầu (Gốc)",
        dosNum: "HS-2026-002-ROOT",
        dosDate: "02/02/2026 08:30:00",
        rootDosNum: "BD-2026-002",
        rootDosDate: "02/02/2026 08:30:00",
        caseName: "Đăng ký lần đầu",
        status: "Hoàn thành",
        
        regName: "Nguyễn Văn An",
        regAddress: "Phường Nghĩa Đô, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
        regProof: "-",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-VCB/2026/02",
        effectiveDate: "01/02/2026",
        loanVal: "1,500,000,000",
        femaleOwner: "Không",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Công dân Việt Nam", doc: "001092012345", name: "Nguyễn Văn An", address: "Phường Nghĩa Đô, Quận Cầu Giấy, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        creditors: [
            { name: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank) - CN Tây Hà Nội", address: "Số 1 Vạn Phúc, Quận Ba Đình, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con", brand: "Honda Civic màu đỏ", chassis: "RLHXX789", engine: "L15B7 / 30L-112.33", changeTag: "Đang bảo đảm", rawChangeTag: "" }
        ]
    },
    "v2_2": {
        verName: "Thay đổi lần 1 (BD-2026-002-T1)",
        dosNum: "HS-2026-002-T1",
        dosDate: "25/03/2026 11:45:00",
        rootDosNum: "BD-2026-002",
        rootDosDate: "02/02/2026 08:30:00",
        caseName: "Thay đổi nội dung đăng ký",
        status: "Hoàn thành",

        regName: "Nguyễn Văn An",
        regAddress: "Phường Nghĩa Đô, Quận Cầu Giấy, TP. Hà Nội, Việt Nam",
        regProof: "-",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-VCB/2026/02-SĐBS1",
        effectiveDate: "24/03/2026",
        loanVal: "2,000,000,000",
        femaleOwner: "Không",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Công dân Việt Nam", doc: "001092012345", name: "Nguyễn Văn An", address: "Phường Nghĩa Đô, Quận Cầu Giấy, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        creditors: [
            { name: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank) - CN Tây Hà Nội", address: "Số 1 Vạn Phúc, Quận Ba Đình, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con", brand: "Honda Civic màu đỏ", chassis: "RLHXX789", engine: "L15B7 / 30L-112.33", changeTag: "Đang bảo đảm", rawChangeTag: "" },
            { stt: 2, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe máy điện", brand: "VinFast Vento màu xanh", chassis: "VFVENTO-8899", engine: "E-MOTOR / Trống", changeTag: "Bổ sung mới", rawChangeTag: "add" }
        ],
        modifiedFields: {
            loanVal: { old: "1,500,000,000" },
            contractNum: { old: "HĐTC-VCB/2026/02" },
            effectiveDate: { old: "01/02/2026" }
        }
    },

    // ---- CHUỖI HỒ SƠ 3: BD-2026-003 ----
    "v1_3": {
        verName: "Đăng ký lần đầu (Gốc)",
        dosNum: "HS-2026-003-ROOT",
        dosDate: "20/02/2026 15:10:00",
        rootDosNum: "BD-2026-003",
        rootDosDate: "20/02/2026 15:10:00",
        caseName: "Đăng ký lần đầu",
        status: "Hoàn thành",
        
        regName: "Trần Thị Mai",
        regAddress: "Phường Thượng Đình, Quận Thanh Xuân, TP. Hà Nội, Việt Nam",
        regProof: "-",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-VIETIN/0088",
        effectiveDate: "19/02/2026",
        loanVal: "900,000,000",
        femaleOwner: "Có",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Công dân Việt Nam", doc: "001096999999", name: "Trần Thị Mai", address: "Phường Thượng Đình, Quận Thanh Xuân, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        creditors: [
            { name: "Ngân hàng TMCP Công thương Việt Nam (Vietinbank) - CN Tây Hà Nội", address: "Số 8 Điện Biên Phủ, Quận Ba Đình, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Hyundai Accent màu trắng", chassis: "RLHZZ333", engine: "KAPPA / 30H-888.99", changeTag: "Đang bảo đảm", rawChangeTag: "" }
        ]
    },
    "v2_3": {
        verName: "Hủy đăng ký (BD-2026-003-H1)",
        dosNum: "HS-2026-003-H1",
        dosDate: "05/04/2026 09:30:00",
        rootDosNum: "BD-2026-003",
        rootDosDate: "20/02/2026 15:10:00",
        caseName: "Hủy đăng ký bởi Cán bộ nghiệp vụ",
        status: "Hoàn thành",

        regName: "Nguyễn Văn Hùng",
        regAddress: "Phường Thượng Đình, Quận Thanh Xuân, TP. Hà Nội, Việt Nam",
        regProof: "Quyết định xử lý hành chính số 12/QĐ-TP.pdf",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-VIETIN/0088",
        effectiveDate: "19/02/2026",
        loanVal: "900,000,000",
        femaleOwner: "Có",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Công dân Việt Nam", doc: "001096999999", name: "Trần Thị Mai", address: "Phường Thượng Đình, Quận Thanh Xuân, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        creditors: [
            { name: "Ngân hàng TMCP Công thương Việt Nam (Vietinbank) - CN Tây Hà Nội", address: "Số 8 Điện Biên Phủ, Quận Ba Đình, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Hyundai Accent màu trắng", chassis: "RLHZZ333", engine: "KAPPA / 30H-888.99", changeTag: "Đã hủy", rawChangeTag: "delete" }
        ],
        cancelInfo: {
            date: "05/04/2026 09:30:00",
            requester: "Cơ quan Quản lý Thị trường / Chi cục thi hành án dân sự",
            officer: "Nguyễn Duy Hưng (Đăng ký viên trực ban)",
            leader: "Trần Quốc Vương (Phó giám đốc trung tâm)",
            cancelType: "Hủy đăng ký toàn phần",
            lawBasis: "Khoản 1 Điều 21 Nghị định 99/2022/NĐ-CP (Đăng ký sai thẩm quyền hoặc tài sản giả mạo)",
            attachLink: "Bản án số 22/2026/DS-ST của Tòa án nhân dân.pdf",
            docLink: "Thông báo hủy đăng ký (Mẫu 07d).pdf"
        }
    },
    "v3_3": {
        verName: "Khôi phục Hủy đăng ký (BD-2026-003-KP)",
        dosNum: "HS-2026-003-KP",
        dosDate: "12/04/2026 11:20:00",
        rootDosNum: "BD-2026-003",
        rootDosDate: "20/02/2026 15:10:00",
        caseName: "Khôi phục Hủy đăng ký",
        status: "Hoàn thành",

        regName: "Trần Thị Mai",
        regAddress: "Phường Thượng Đình, Quận Thanh Xuân, TP. Hà Nội, Việt Nam",
        regProof: "Quyết định hủy quyết định xử lý hành chính số 15/QĐ-TP.pdf",

        txType: "Biện pháp bảo đảm",
        subType: "Thế chấp",
        contractNum: "HĐTC-VIETIN/0088",
        effectiveDate: "19/02/2026",
        loanVal: "900,000,000",
        femaleOwner: "Có",
        registryOffice: "Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội",

        owners: [
            { type: "Công dân Việt Nam", doc: "001096999999", name: "Trần Thị Mai", address: "Phường Thượng Đình, Quận Thanh Xuân, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        creditors: [
            { name: "Ngân hàng TMCP Công thương Việt Nam (Vietinbank) - CN Tây Hà Nội", address: "Số 8 Điện Biên Phủ, Quận Ba Đình, TP. Hà Nội, Việt Nam", changeTag: "" }
        ],
        assets: [
            { stt: 1, type: "Phương tiện giao thông cơ giới đường bộ CÓ số khung", name: "Xe ô tô con 5 chỗ", brand: "Hyundai Accent màu trắng", chassis: "RLHZZ333", engine: "KAPPA / 30H-888.99", changeTag: "Đang bảo đảm", rawChangeTag: "restore" }
        ],
        restoreInfo: {
            date: "12/04/2026 11:20:00",
            requester: "Tòa án nhân dân Cấp cao tại Hà Nội",
            officer: "Nguyễn Duy Hưng (Đăng ký viên thực hiện)",
            leader: "Trần Quốc Vương (Lãnh đạo phê duyệt)",
            lawBasis: "Quyết định giải quyết khiếu nại hoặc hủy bỏ Bản án sơ thẩm, yêu cầu khôi phục tình trạng pháp lý ban đầu.",
            docLink: "Thông báo khôi phục hủy đăng ký.pdf"
        }
    }
};


// ==========================================
// DYNAMIC PAGINATION ENGINE
// ==========================================
class PaginatedGrid {
    constructor(data, tbodyId, pageInfoId, pageSizeSelectId, prevBtnId, nextBtnId, searchType) {
        this.allData = data;
        this.tbody = document.getElementById(tbodyId);
        this.pageInfo = document.getElementById(pageInfoId);
        this.pageSizeSelect = document.getElementById(pageSizeSelectId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.searchType = searchType; // 'reg', 'owner', 'chassis'

        this.currentPage = 1;
        this.pageSize = 10;
        this.filteredRoots = []; // Dòng cha gốc thỏa mãn

        this.expandedNodes = new Set(); // Set of parentIds that are expanded

        this.initEventListeners();
    }

    initEventListeners() {
        if (this.pageSizeSelect) {
            this.pageSizeSelect.addEventListener('change', () => {
                this.pageSize = parseInt(this.pageSizeSelect.value, 10);
                this.currentPage = 1;
                this.render();
            });
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.render();
                }
            });
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(this.filteredRoots.length / this.pageSize);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.render();
                }
            });
        }
    }

    setData(data) {
        this.allData = data;
        // Group & extract parents
        const roots = data.filter(item => item.parentId === null);
        this.filteredRoots = roots;
        this.currentPage = 1;
        this.expandedNodes.clear();
        
        // Auto expand all for demo view
        roots.forEach(r => this.expandedNodes.add(r.id));
        
        this.render();
    }

    toggleExpand(nodeId) {
        if (this.expandedNodes.has(nodeId)) {
            this.expandedNodes.delete(nodeId);
        } else {
            this.expandedNodes.add(nodeId);
        }
        this.render();
    }

    render() {
        if (!this.tbody) return;
        this.tbody.innerHTML = '';

        if (this.filteredRoots.length === 0) {
            const cols = this.searchType === 'reg' ? 9 : 10;
            this.tbody.innerHTML = `<tr><td colspan="${cols}" style="text-align: center; padding: 32px; color: var(--text-muted);"><i>Không tìm thấy hồ sơ nào phù hợp với điều kiện tìm kiếm.</i></td></tr>`;
            if (this.pageInfo) this.pageInfo.innerText = "Hiển thị 0-0 của 0 bản ghi";
            if (this.prevBtn) this.prevBtn.disabled = true;
            if (this.nextBtn) this.nextBtn.disabled = true;
            return;
        }

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, this.filteredRoots.length);
        const rootsToDisplay = this.filteredRoots.slice(startIndex, startIndex + this.pageSize);

        let absoluteIndex = startIndex + 1;

        rootsToDisplay.forEach(root => {
            // Find children
            const children = this.allData.filter(item => item.parentId === root.id)
                                          .sort((a,b) => {
                                              // Sắp xếp thời gian giảm dần cho các con
                                              return parseDateTime(b.date) - parseDateTime(a.date);
                                          });
            const hasChildren = children.length > 0;
            const isExpanded = this.expandedNodes.has(root.id);

            // Render root row
            this.tbody.appendChild(this.createRowHtml(root, absoluteIndex, hasChildren, isExpanded, false));

            // Render children if expanded
            if (hasChildren && isExpanded) {
                children.forEach(child => {
                    this.tbody.appendChild(this.createRowHtml(child, absoluteIndex, false, false, true));
                });
            }

            absoluteIndex++;
        });

        // Update footer info
        if (this.pageInfo) {
            this.pageInfo.innerText = `Hiển thị ${startIndex + 1}-${endIndex} của ${this.filteredRoots.length} dòng hồ sơ gốc`;
        }

        const totalPages = Math.ceil(this.filteredRoots.length / this.pageSize);
        if (this.prevBtn) this.prevBtn.disabled = this.currentPage === 1;
        if (this.nextBtn) this.nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
    }

    createRowHtml(item, stt, hasChildren, isExpanded, isChild) {
        const tr = document.createElement('tr');
        tr.className = `tree-row ${isChild ? 'tree-node-child' : 'tree-node-root'}`;

        // STT column: only for root rows
        const tdStt = document.createElement('td');
        tdStt.innerText = isChild ? "" : stt;
        tr.appendChild(tdStt);

        // Số đăng ký column with expand buttons
        const tdRegNum = document.createElement('td');
        if (isChild) {
            tdRegNum.innerHTML = `<span class="tree-indent"></span><i class="fa-solid fa-turn-up-right" style="transform: rotate(90deg); margin-right: 8px; color: var(--text-muted);"></i>${item.id}`;
        } else {
            if (hasChildren) {
                const toggleBtn = document.createElement('button');
                toggleBtn.type = 'button';
                toggleBtn.className = 'tree-toggle-btn';
                toggleBtn.innerHTML = isExpanded ? '<i class="fa-solid fa-minus"></i>' : '<i class="fa-solid fa-plus"></i>';
                toggleBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleExpand(item.id);
                };
                tdRegNum.appendChild(toggleBtn);
            } else {
                tdRegNum.innerHTML = `<span style="display:inline-block; width:26px;"></span>`;
            }
            const spanText = document.createElement('span');
            spanText.innerHTML = `<strong>${item.id}</strong>`;
            tdRegNum.appendChild(spanText);
        }
        tr.appendChild(tdRegNum);

        // PIN
        const tdPin = document.createElement('td');
        tdPin.innerHTML = `<code style="background: #F1F5F9; padding: 2px 6px; border-radius: 4px;">${item.pin}</code>`;
        tr.appendChild(tdPin);

        // Time
        const tdTime = document.createElement('td');
        tdTime.innerText = item.date;
        tr.appendChild(tdTime);

        // Type
        const tdType = document.createElement('td');
        tdType.innerText = item.type;
        tr.appendChild(tdType);

        // Secured Owner
        const tdOwner = document.createElement('td');
        tdOwner.innerText = item.ownerName;
        tr.appendChild(tdOwner);

        if (this.searchType === 'owner') {
            // Document Number column (only for owner search tab)
            const tdDocNum = document.createElement('td');
            tdDocNum.innerText = item.ownerDoc;
            tr.appendChild(tdDocNum);
        }

        // Secured Creditor / Chassis Number column
        const tdCreditorOrChassis = document.createElement('td');
        if (this.searchType === 'chassis') {
            tdCreditorOrChassis.innerHTML = `<span class="badge badge-info">${item.chassis}</span>`;
        } else {
            tdCreditorOrChassis.innerText = item.creditorName;
        }
        tr.appendChild(tdCreditorOrChassis);

        // Status (Only Hoàn thành)
        const tdStatus = document.createElement('td');
        tdStatus.innerHTML = `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> ${item.status}</span>`;
        tr.appendChild(tdStatus);

        // Actions
        const tdActions = document.createElement('td');
        const viewLink = document.createElement('span');
        viewLink.className = 'action-link';
        viewLink.innerHTML = `<i class="fa-solid fa-eye"></i> Xem`;
        viewLink.onclick = () => {
            // Trigger UCPS003 Modal with the item id
            openPS003Modal(item.id);
        };
        tdActions.appendChild(viewLink);
        tr.appendChild(tdActions);

        return tr;
    }
}

// Helper to convert dd/mm/yyyy hh:mm:ss string to Date object
function parseDateTime(str) {
    const parts = str.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
}


// ==========================================
// ON DOM READY INITIALIZATION
// ==========================================
let regGrid, ownerGrid, chassisGrid;

function initApp() {
    // 1. Core Tab Switcher
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const panels = document.querySelectorAll(".tab-panel");
            panels.forEach(p => p.classList.remove("active"));

            const targetPanel = document.getElementById(tab.getAttribute("data-tab"));
            if (targetPanel) targetPanel.classList.add("active");

            // Show/Hide common CSDL Code block
            const csdlSec = document.getElementById("csdl-code-section");
            if (csdlSec) {
                if (tab.getAttribute("data-tab") === "tab-tthc") {
                    csdlSec.style.display = "none";
                } else {
                    csdlSec.style.display = "block";
                }
            }
        });
    });

    // 2. Pre-fill CSDL code selector tool
    const demoSelector = document.getElementById("demoCodeSelector");
    const commonCSDLInput = document.getElementById("commonCSDLCode");

    // Pre-fill default
    if (demoSelector && commonCSDLInput) {
        commonCSDLInput.value = demoSelector.value;
    }

    demoSelector.addEventListener("change", () => {
        if (commonCSDLInput) commonCSDLInput.value = demoSelector.value;
    });

    // 3. Tab 2 Subject Type layout conditional fields rendering
    const subTypeSelect = document.getElementById("ownerSubjectType");
    subTypeSelect.addEventListener("change", handleSubjectTypeChange);
    // Initial trigger
    handleSubjectTypeChange();

    // 4. Initialize Paginated Grids for Search results
    regGrid = new PaginatedGrid([], 'reg-results-tbody', 'reg-page-info', 'regPageSizeSelect', 'btnRegPrev', 'btnRegNext', 'reg');
    ownerGrid = new PaginatedGrid([], 'owner-results-tbody', 'owner-page-info', 'ownerPageSizeSelect', 'btnOwnerPrev', 'btnOwnerNext', 'owner');
    chassisGrid = new PaginatedGrid([], 'chassis-results-tbody', 'chassis-page-info', 'chassisPageSizeSelect', 'btnChassisPrev', 'btnChassisNext', 'chassis');

    // 5. Button Bindings - Search Forms
    document.getElementById("btnRegSearch").addEventListener("click", executeRegSearch);
    document.getElementById("btnOwnerSearch").addEventListener("click", executeOwnerSearch);
    document.getElementById("btnChassisSearch").addEventListener("click", executeChassisSearch);
    document.getElementById("btnTTHCSearch").addEventListener("click", executeTTHCSearch);

    // Reset Buttons
    document.getElementById("btnRegReset").addEventListener("click", () => {
        document.getElementById("regSearchNumber").value = "";
        document.getElementById("regSearchNumber").classList.remove("is-invalid");
        document.getElementById("common-csdl-alert").style.display = "none";
        document.getElementById("commonCSDLCode").classList.remove("is-invalid");
    });
    document.getElementById("btnOwnerReset").addEventListener("click", () => {
        document.getElementById("ownerName").value = "";
        document.getElementById("ownerDocNum").value = "";
        document.getElementById("ownerPassport").value = "";
        document.getElementById("ownerMST").value = "";
        document.querySelectorAll("#tab-owner .form-control").forEach(inp => inp.classList.remove("is-invalid"));
        document.getElementById("common-csdl-alert").style.display = "none";
        document.getElementById("commonCSDLCode").classList.remove("is-invalid");
    });
    document.getElementById("btnChassisReset").addEventListener("click", () => {
        document.getElementById("chassisNumber").value = "";
        document.getElementById("chassisNumber").classList.remove("is-invalid");
        document.getElementById("common-csdl-alert").style.display = "none";
        document.getElementById("commonCSDLCode").classList.remove("is-invalid");
    });
    document.getElementById("btnTTHCReset").addEventListener("click", () => {
        document.getElementById("tthcDossierCode").value = "";
        document.getElementById("tthcDossierCode").classList.remove("is-invalid");
        document.getElementById("tthc-results-container").style.display = "none";
    });

    // Back Buttons (Quay lại)
    document.getElementById("btnRegBack").addEventListener("click", () => {
        document.getElementById("reg-results-container").style.display = "none";
        document.querySelector("#tab-reg-num .search-form-card").classList.remove("hidden");
    });
    document.getElementById("btnOwnerBack").addEventListener("click", () => {
        document.getElementById("owner-results-container").style.display = "none";
        document.querySelector("#tab-owner .search-form-card").classList.remove("hidden");
    });
    document.getElementById("btnChassisBack").addEventListener("click", () => {
        document.getElementById("chassis-results-container").style.display = "none";
        document.querySelector("#tab-chassis .search-form-card").classList.remove("hidden");
    });

    // Excel & PDF Downloads
    document.getElementById("btnRegExportPDF").addEventListener("click", () => {
        alert("Hệ thống đang xuất file văn bản kết quả tra cứu điện tử dưới định dạng PDF...\n- Tiêu chí: Số đăng ký\n- Ký số chuyên dùng tự động của Cơ quan đăng ký Quốc gia giao dịch bảo đảm.\n\n[Thành công] Xuất văn bản kết quả tra cứu thành công!");
    });
    document.getElementById("btnOwnerExportPDF").addEventListener("click", () => {
        alert("Hệ thống đang xuất file văn bản kết quả tra cứu điện tử dưới định dạng PDF...\n- Tiêu chí: Bên bảo đảm\n- Ký số chuyên dùng tự động của Cơ quan đăng ký Quốc gia giao dịch bảo đảm.\n\n[Thành công] Xuất văn bản kết quả tra cứu thành công!");
    });
    document.getElementById("btnChassisExportPDF").addEventListener("click", () => {
        alert("Hệ thống đang xuất file văn bản kết quả tra cứu điện tử dưới định dạng PDF...\n- Tiêu chí: Số khung phương tiện\n- Ký số chuyên dùng tự động của Cơ quan đăng ký Quốc gia giao dịch bảo đảm.\n\n[Thành công] Xuất văn bản kết quả tra cứu thành công!");
    });

    // TTHC Excel/PDF Buttons
    document.getElementById("btnTTHCExportExcel").addEventListener("click", () => {
        const d = new Date();
        const dateStr = `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}${d.getFullYear()}`;
        alert(`Hệ thống xuất bảng tiến trình xử lý hồ sơ hành chính ra file Excel.\nTải xuống thành công file: Ket_qua_tra_cuu_ho_so_TTHC_${dateStr}.xlsx`);
    });
    document.getElementById("btnTTHCExportPDF").addEventListener("click", () => {
        alert("Hệ thống sinh báo cáo in tiến độ hồ sơ hành chính (PDF) thành công!");
    });

    // UCPS003 Modal Close Bindings
    document.getElementById("btnHistoryModalClose").addEventListener("click", closePS003Modal);
    document.getElementById("historyModalOverlay").addEventListener("click", (e) => {
        if (e.target.id === "historyModalOverlay") closePS003Modal();
    });

    // Timeline control filters
    document.getElementById("btnTimelineFilter").addEventListener("click", filterTimelineList);
    document.getElementById("toggleOnlyChanges").addEventListener("change", applyOnlyChangesToggle);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// Subject Type Dropdown Change Handler
function handleSubjectTypeChange() {
    const val = document.getElementById("ownerSubjectType").value;
    const nameGrp = document.getElementById("group-owner-name");
    const docGrp = document.getElementById("group-owner-doc");
    const passportGrp = document.getElementById("group-owner-passport");
    const mstGrp = document.getElementById("group-owner-mst");

    // Default: hide all conditional divs
    nameGrp.classList.add("hidden");
    docGrp.classList.add("hidden");
    passportGrp.classList.add("hidden");
    mstGrp.classList.add("hidden");

    // Reset validations
    document.querySelectorAll("#tab-owner .form-control").forEach(inp => inp.classList.remove("is-invalid"));

    if (val === "cd_vn") {
        nameGrp.classList.remove("hidden");
        docGrp.classList.remove("hidden");
    } else if (val === "nn") {
        nameGrp.classList.remove("hidden");
        passportGrp.classList.remove("hidden");
    } else if (val === "kqt") {
        nameGrp.classList.remove("hidden");
    } else if (val === "tc_dkkd" || val === "ndt_nn") {
        mstGrp.classList.remove("hidden");
    }
}


// ==========================================
// CORE SEARCH VALIDATION AND EXECUTION
// ==========================================

// Validate CSDL Credential Code
function validateCSDLCode(code, alertId, codeInputId) {
    const alertBox = document.getElementById(alertId);
    const codeInput = document.getElementById(codeInputId);
    alertBox.style.display = "none";
    codeInput.classList.remove("is-invalid");

    const codeVal = code.trim();
    if (!codeVal) {
        codeInput.classList.add("is-invalid");
        document.getElementById(`${codeInputId}-feedback`).innerText = "Trường này bắt buộc nhập";
        return false;
    }

    // Check in database
    const meta = mockCSDLCodes[codeVal] || mockCSDLCodes[codeVal.toUpperCase()];
    if (!meta) {
        alertBox.style.display = "flex";
        alertBox.querySelector(".alert-message").innerText = "Lỗi: Mã số sử dụng CSDL không tồn tại trên hệ thống.";
        return false;
    }

    if (meta.status === "locked") {
        alertBox.style.display = "flex";
        alertBox.querySelector(".alert-message").innerText = "Lỗi: Mã số sử dụng CSDL đang bị khóa hoặc tạm ngừng hoạt động.";
        return false;
    }

    if (meta.status === "expired") {
        alertBox.style.display = "flex";
        alertBox.querySelector(".alert-message").innerText = "Lỗi: Mã số sử dụng CSDL đã hết hạn sử dụng. Vui lòng liên hệ hỗ trợ hoặc thực hiện gia hạn để tiếp tục.";
        return false;
    }

    if (meta.type === "once" && meta.remaining <= 0) {
        alertBox.style.display = "flex";
        alertBox.querySelector(".alert-message").innerText = "Lỗi: Mã số sử dụng một lần đã hết lượt tra cứu. Vui lòng mua mã mới để sử dụng.";
        return false;
    }

    return meta;
}

// 1. Tab 1: Registration Number search
function executeRegSearch() {
    const code = document.getElementById("commonCSDLCode").value;
    const regNum = document.getElementById("regSearchNumber").value;
    const inputReg = document.getElementById("regSearchNumber");

    inputReg.classList.remove("is-invalid");

    // Validate code
    const meta = validateCSDLCode(code, "common-csdl-alert", "commonCSDLCode");
    if (!meta) return;

    // Validate Search Criteria
    if (!regNum.trim()) {
        inputReg.classList.add("is-invalid");
        document.getElementById("regSearchNumber-feedback").innerText = "Trường này bắt buộc nhập";
        return;
    }

    // Format validation (letters, digits, slash, dash allowed. Special characters blocked)
    const formatRegex = /^[a-zA-Z0-9\/\-]+$/;
    if (!formatRegex.test(regNum.trim())) {
        inputReg.classList.add("is-invalid");
        document.getElementById("regSearchNumber-feedback").innerText = "Số đăng ký không hợp lệ (không chứa ký tự đặc biệt).";
        return;
    }

    // Deduction logic (simulated)
    handleCSDLDeduction(meta, "regCreditWrapper", "regCreditValue");

    // Search query matching
    const searchVal = regNum.trim().toUpperCase();
    
    // Find absolute parent root if user inputs child ID
    let rootId = searchVal;
    const matchedRecord = mockRegistryDatabase.find(r => r.id.toUpperCase() === searchVal);
    if (matchedRecord && matchedRecord.parentId) {
        rootId = matchedRecord.parentId;
    }

    // Filter registry tree including root and all descendants
    const results = mockRegistryDatabase.filter(r => r.id === rootId || r.parentId === rootId);

    // Setup Results Panel
    document.querySelector("#tab-reg-num .search-form-card").classList.add("hidden");
    document.getElementById("reg-results-container").style.display = "block";
    document.getElementById("regSummaryText").innerText = `Số đăng ký: ${regNum.trim()}`;
    document.getElementById("regSummaryCSDL").innerText = code.trim();

    regGrid.setData(results);
}

// 2. Tab 2: Secured Owner search
function executeOwnerSearch() {
    const code = document.getElementById("commonCSDLCode").value;
    const type = document.getElementById("ownerSubjectType").value;

    const inputName = document.getElementById("ownerName");
    const inputDoc = document.getElementById("ownerDocNum");
    const inputPass = document.getElementById("ownerPassport");
    const inputMst = document.getElementById("ownerMST");

    // Clear invalid highlights
    document.querySelectorAll("#tab-owner .form-control").forEach(inp => inp.classList.remove("is-invalid"));

    const meta = validateCSDLCode(code, "common-csdl-alert", "commonCSDLCode");
    if (!meta) return;

    let valid = true;
    let queryValue = "";

    // Conditional criteria checking
    if (type === "cd_vn") {
        if (!inputName.value.trim()) {
            inputName.classList.add("is-invalid");
            document.getElementById("ownerName-feedback").innerText = "Trường này bắt buộc nhập";
            valid = false;
        }
        if (!inputDoc.value.trim()) {
            inputDoc.classList.add("is-invalid");
            document.getElementById("ownerDocNum-feedback").innerText = "Trường này bắt buộc nhập";
            valid = false;
        } else {
            // Validate exactly 12 digits, no letters
            const cccdRegex = /^\d{12}$/;
            if (!cccdRegex.test(inputDoc.value.trim())) {
                inputDoc.classList.add("is-invalid");
                document.getElementById("ownerDocNum-feedback").innerText = "Số CMND/Căn cước/Chứng minh quân đội không hợp lệ (phải gồm đúng 12 chữ số).";
                valid = false;
            }
        }
        queryValue = inputDoc.value.trim();
    } else if (type === "nn") {
        if (!inputName.value.trim()) {
            inputName.classList.add("is-invalid");
            document.getElementById("ownerName-feedback").innerText = "Trường này bắt buộc nhập";
            valid = false;
        }
        if (!inputPass.value.trim()) {
            inputPass.classList.add("is-invalid");
            document.getElementById("ownerPassport-feedback").innerText = "Trường này bắt buộc nhập";
            valid = false;
        }
        queryValue = inputPass.value.trim();
    } else if (type === "kqt") {
        if (!inputName.value.trim()) {
            inputName.classList.add("is-invalid");
            document.getElementById("ownerName-feedback").innerText = "Trường này bắt buộc nhập";
            valid = false;
        }
        queryValue = inputName.value.trim();
    } else if (type === "tc_dkkd" || type === "ndt_nn") {
        if (!inputMst.value.trim()) {
            inputMst.classList.add("is-invalid");
            document.getElementById("ownerMST-feedback").innerText = "Trường này bắt buộc nhập";
            valid = false;
        }
        queryValue = inputMst.value.trim();
    }

    if (!valid) return;

    handleCSDLDeduction(meta, "ownerCreditWrapper", "ownerCreditValue");

    // Search query matching (matches any record where ownerDoc corresponds)
    const targetQ = queryValue.toUpperCase();
    const matchedRoots = new Set();

    mockRegistryDatabase.forEach(item => {
        if (item.ownerDoc.toUpperCase() === targetQ || (type === "kqt" && item.ownerName.toUpperCase().includes(targetQ))) {
            // Found a matching node, register its root (or itself if it's parent)
            matchedRoots.add(item.parentId ? item.parentId : item.id);
        }
    });

    // Collect all elements belonging to matched trees
    const results = mockRegistryDatabase.filter(r => matchedRoots.has(r.id) || matchedRoots.has(r.parentId));

    document.querySelector("#tab-owner .search-form-card").classList.add("hidden");
    document.getElementById("owner-results-container").style.display = "block";
    
    let subjectTypeLabel = document.querySelector(`#ownerSubjectType option[value="${type}"]`).text;
    document.getElementById("ownerSummaryText").innerText = `${subjectTypeLabel}: ${inputName.value.trim() || queryValue}`;
    document.getElementById("ownerSummaryCSDL").innerText = code.trim();

    ownerGrid.setData(results);
}

// 3. Tab 3: Chassis Number search
function executeChassisSearch() {
    const code = document.getElementById("commonCSDLCode").value;
    const chassis = document.getElementById("chassisNumber").value;
    const inputChassis = document.getElementById("chassisNumber");

    inputChassis.classList.remove("is-invalid");

    const meta = validateCSDLCode(code, "common-csdl-alert", "commonCSDLCode");
    if (!meta) return;

    if (!chassis.trim()) {
        inputChassis.classList.add("is-invalid");
        document.getElementById("chassisNumber-feedback").innerText = "Trường này bắt buộc nhập";
        return;
    }

    handleCSDLDeduction(meta, "chassisCreditWrapper", "chassisCreditValue");

    const targetChassis = chassis.trim().toUpperCase();
    const matchedRoots = new Set();

    mockRegistryDatabase.forEach(item => {
        if (item.chassis.toUpperCase() === targetChassis) {
            matchedRoots.add(item.parentId ? item.parentId : item.id);
        }
    });

    const results = mockRegistryDatabase.filter(r => matchedRoots.has(r.id) || matchedRoots.has(r.parentId));

    document.querySelector("#tab-chassis .search-form-card").classList.add("hidden");
    document.getElementById("chassis-results-container").style.display = "block";
    document.getElementById("chassisSummaryText").innerText = `Số khung: ${chassis.trim()}`;
    document.getElementById("chassisSummaryCSDL").innerText = code.trim();

    chassisGrid.setData(results);
}

// 4. Tab 4: TTHC progress search
function executeTTHCSearch() {
    const inputDossier = document.getElementById("tthcDossierCode");
    const val = inputDossier.value.trim();
    const tbody = document.getElementById("tthc-results-tbody");

    inputDossier.classList.remove("is-invalid");
    document.getElementById("tthc-results-container").style.display = "none";

    if (!val) {
        inputDossier.classList.add("is-invalid");
        document.getElementById("tthcDossierCode-feedback").innerText = "Trường này bắt buộc nhập";
        return;
    }

    // Query TTHC
    tbody.innerHTML = "";
    document.getElementById("tthc-results-container").style.display = "block";

    const record = mockTTHCDatabase[val] || mockTTHCDatabase[val.toUpperCase()];
    if (!record) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 32px; color: var(--danger-color); font-weight: 600;">Mã hồ sơ không tồn tại hoặc chưa được tiếp nhận xử lý.</td></tr>`;
        return;
    }

    // Render dossier row
    let badgeClass = "badge-info";
    if (record.status === "Hoàn thành") badgeClass = "badge-success";
    else if (record.status === "Đang xử lý") badgeClass = "badge-warning";
    else if (record.status === "Chờ bổ sung hồ sơ") badgeClass = "badge-warning";
    else if (record.status === "Bị từ chối") badgeClass = "badge-danger";

    let resultHtml = "-";
    if (record.status === "Hoàn thành") {
        resultHtml = `<a href="#" class="action-link" onclick="alert('Đang tải văn bản kết quả đã ký số chuyên dùng...'); return false;"><i class="fa-solid fa-file-pdf"></i> Giấy chứng nhận (PDF)</a>`;
    } else if (record.status === "Bị từ chối") {
        resultHtml = `<a href="#" class="action-link" style="color: var(--danger-color);" onclick="alert('Đang tải thông báo từ chối...'); return false;"><i class="fa-solid fa-file-pdf"></i> Thông báo từ chối (PDF)</a>`;
    }

    tbody.innerHTML = `
        <tr>
            <td><strong>${record.code}</strong></td>
            <td>${record.type}</td>
            <td>${record.receivedDate}</td>
            <td>${record.dueDate}</td>
            <td>${record.channel}</td>
            <td><span class="badge ${badgeClass}">${record.status}</span></td>
            <td>${record.feedback}</td>
            <td>${resultHtml}</td>
        </tr>
    `;
}

// Deduction mechanism logic
function handleCSDLDeduction(meta, wrapperId, valueId) {
    const wrap = document.getElementById(wrapperId);
    const valSpan = document.getElementById(valueId);

    if (meta.type === "once") {
        // Deduct 1 credit
        meta.remaining = Math.max(0, meta.remaining - 1);
        wrap.classList.remove("hidden");
        valSpan.innerText = meta.remaining;
        
        if (meta.remaining === 0) {
            meta.status = "expired";
        }
    } else {
        wrap.classList.add("hidden");
    }
}


// ==========================================
// UCPS003 TIMELINE & HISTORY COMPARISON ENGINE
// ==========================================
let activeDossierTreeId = ""; // Current root ID being compared
let currentSelectedVersion = ""; // 'v1', 'v2', 'v3', 'v4', etc.

function openPS003Modal(recordId) {
    // Determine the root of the clicked item
    const matched = mockRegistryDatabase.find(r => r.id === recordId);
    if (!matched) return;

    activeDossierTreeId = matched.parentId ? matched.parentId : matched.id;
    document.getElementById("modalDossierTitle").innerText = `Lịch sử biến động hồ sơ: ${activeDossierTreeId}`;

    // Populated timeline left sidebar
    renderTimelineList();

    // Default selection: select the exact version corresponding to the clicked row
    let defaultVer = "v1";
    if (activeDossierTreeId === "BD-2026-001") {
        if (recordId === "BD-2026-001") defaultVer = "v1";
        else if (recordId === "BD-2026-001-T1") defaultVer = "v2";
        else if (recordId === "BD-2026-001-CL") defaultVer = "v3";
        else if (recordId === "BD-2026-001-X1") defaultVer = "v4";
    } else if (activeDossierTreeId === "BD-2026-002") {
        if (recordId === "BD-2026-002") defaultVer = "v1_2";
        else if (recordId === "BD-2026-002-T1") defaultVer = "v2_2";
    } else if (activeDossierTreeId === "BD-2026-003") {
        if (recordId === "BD-2026-003") defaultVer = "v1_3";
        else if (recordId === "BD-2026-003-H1") defaultVer = "v2_3";
        else if (recordId === "BD-2026-003-KP") defaultVer = "v3_3";
    }

    selectTimelineVersion(defaultVer);

    // Show Overlay
    document.getElementById("historyModalOverlay").style.display = "flex";
}

function closePS003Modal() {
    document.getElementById("historyModalOverlay").style.display = "none";
}

// Left Timeline nodes loader
function renderTimelineList(filterTerm = "", fromD = "", toD = "") {
    const container = document.getElementById("historyTimelineContainer");
    container.innerHTML = "";

    // Find all versions for active tree
    const rootRecord = mockRegistryDatabase.find(r => r.id === activeDossierTreeId);
    if (!rootRecord) return;

    let versions = rootRecord.historyVersions; // Array of keys: ['v1', 'v2', etc]

    // Parse filters
    let search = filterTerm.trim().toLowerCase();
    let fromDate = null;
    let toDate = null;

    if (fromD) {
        const parts = fromD.split("/");
        if (parts.length === 3) fromDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }
    if (toD) {
        const parts = toD.split("/");
        if (parts.length === 3) toDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }

    let itemsCount = 0;

    versions.forEach(vKey => {
        const detail = mockVersionDetails[vKey];
        if (!detail) return;

        // Apply filters
        if (search && !detail.verName.toLowerCase().includes(search) && !detail.dosNum.toLowerCase().includes(search)) {
            return;
        }

        if (fromDate || toDate) {
            const vDate = parseDateTime(detail.dosDate);
            if (fromDate && vDate < fromDate) return;
            if (toDate && vDate > toDate) return;
        }

        // Render timeline node
        const node = document.createElement("div");
        node.className = `timeline-node ${currentSelectedVersion === vKey ? "active" : ""}`;
        node.setAttribute("data-vkey", vKey);
        node.onclick = () => selectTimelineVersion(vKey);

        node.innerHTML = `
            <div class="node-header">
                <span class="node-title">${detail.verName}</span>
                <span class="badge badge-success" style="font-size:10px; padding: 2px 6px;">${detail.status}</span>
            </div>
            <div class="node-info">Số HS: <strong>${detail.dosNum}</strong></div>
            <div class="node-info" style="display:flex; justify-content:space-between; align-items:center;">
                <span>${detail.dosDate}</span>
                <a href="#" class="action-link" style="font-size: 11px;" onclick="alert('Đang tải văn bản kết quả PDF có chữ ký số...'); event.stopPropagation(); return false;"><i class="fa-solid fa-cloud-arrow-down"></i> Tải PDF</a>
            </div>
        `;

        container.appendChild(node);
        itemsCount++;
    });

    if (itemsCount === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted);">Không tìm thấy mốc lịch sử nào khớp bộ lọc.</div>`;
    }
}

// Quick filter event
function filterTimelineList() {
    const search = document.getElementById("timelineSearch").value;
    const fromD = document.getElementById("timelineFromDate").value;
    const toD = document.getElementById("timelineToDate").value;
    renderTimelineList(search, fromD, toD);
}

// Click to select version
function selectTimelineVersion(vKey) {
    currentSelectedVersion = vKey;

    // Highlight active timeline node
    document.querySelectorAll(".timeline-node").forEach(node => {
        if (node.getAttribute("data-vkey") === vKey) {
            node.classList.add("active");
        } else {
            node.classList.remove("active");
        }
    });

    const data = mockVersionDetails[vKey];
    if (!data) return;

    // Update Right Panel UI details
    document.getElementById("selectedVersionLabel").innerText = data.verName;

    // Check if rejected version details are needed
    const rejectAlert = document.getElementById("historyRejectedAlert");
    if (data.status === "Bị từ chối") {
        rejectAlert.style.display = "flex";
        document.getElementById("rejectedTimeValue").innerText = data.dosDate;
        document.getElementById("rejectedReasonValue").innerText = data.rejectedReason || "Không khớp thông tin chữ ký.";
    } else {
        rejectAlert.style.display = "none";
    }

    // 1. Register Info
    document.getElementById("regName").innerText = data.regName;
    document.getElementById("regAddress").innerText = data.regAddress;
    document.getElementById("regProof").innerHTML = data.regProof !== "-" ? `<a href="#" class="action-link" onclick="alert('Xem tài liệu chứng minh...'); return false;"><i class="fa-solid fa-file-invoice"></i> ${data.regProof}</a>` : "-";

    // 2. Dossier Info
    document.getElementById("dosCase").innerText = data.caseName;
    document.getElementById("dosDate").innerText = data.dosDate;
    document.getElementById("dosNum").innerText = data.dosNum;
    document.getElementById("rootDosNum").innerText = data.rootDosNum;
    document.getElementById("rootDosDate").innerText = data.rootDosDate;
    document.getElementById("rootDosLink").innerHTML = `<a href="#" class="action-link" onclick="alert('Đang tải hồ sơ đăng ký gốc...'); return false;"><i class="fa-solid fa-file-pdf"></i> Đăng ký gốc (PDF)</a>`;

    // 3. General Loan Info
    document.getElementById("genTxType").innerText = data.txType;
    document.getElementById("genSubType").innerText = data.subType;
    document.getElementById("genRegistryOffice").innerText = data.registryOffice;

    // Reset modified indicators
    resetModifiedHighlights();

    // Fill data and highlight comparison fields
    fillCompareField("genContractNum", data.contractNum, "contractNum", data.modifiedFields);
    fillCompareField("genEffectiveDate", data.effectiveDate, "effectiveDate", data.modifiedFields);
    fillCompareField("genFemaleOwner", data.femaleOwner, "femaleOwner", data.modifiedFields);

    // Loan value
    if (data.modifiedFields && data.modifiedFields.loanVal) {
        highlightField("genLoanVal", `${data.loanVal} VND`, data.modifiedFields.loanVal.old + " VND");
    } else {
        document.getElementById("genLoanVal").innerHTML = `${data.loanVal} VND`;
    }

    // Scale info
    if (data.scale) {
        document.getElementById("row-genScale").classList.remove("hidden");
        fillCompareField("genScale", data.scale, "scale", data.modifiedFields);
    } else {
        document.getElementById("row-genScale").classList.add("hidden");
    }

    // 4. Secured Owners Table Rendering with change highlights
    renderOwnersTable(data);

    // 5. Secured Creditors Table Rendering
    renderCreditorsTable(data);

    // 6. Assets Table Rendering
    renderAssetsTable(data);

    // Show/Hide Special sections (Xóa / Hủy / Khôi phục / Chỉnh lý)
    toggleSpecialSections(data);

    // Apply "Chỉ hiển thị vùng dữ liệu có biến động" toggle settings
    applyOnlyChangesToggle();
}

// Compare field helper
function fillCompareField(elementId, currentValue, fieldKey, modifiedFields) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (modifiedFields && modifiedFields[fieldKey]) {
        highlightField(elementId, currentValue, modifiedFields[fieldKey].old);
    } else {
        el.innerHTML = currentValue;
    }
}

// Highlight modified field with hover popup values
function highlightField(elementId, newValue, oldValue) {
    const el = document.getElementById(elementId);
    el.innerHTML = `
        <span class="value-modified-field">
            <span class="new-value-bold">${newValue}</span>
            <button class="history-icon-btn" title="Xem giá trị cũ"><i class="fa-solid fa-clock-rotate-left"></i></button>
            <span class="history-tooltip">Giá trị cũ trước biến động:<br><strong>${oldValue}</strong></span>
        </span>
    `;
    el.closest(".detail-row-flex").classList.add("highlight-modified");
}

function resetModifiedHighlights() {
    document.querySelectorAll(".detail-row-flex").forEach(row => {
        row.classList.remove("highlight-modified");
    });
}

// Render Owners Table inside modal comparison
function renderOwnersTable(data) {
    const tbody = document.getElementById("historyOwnersTbody");
    tbody.innerHTML = "";

    data.owners.forEach((owner, idx) => {
        const tr = document.createElement("tr");
        let badgeHtml = "";
        
        if (owner.changeTag === "Bổ sung mới") {
            tr.className = "asset-row-added";
            badgeHtml = `<span class="tag-added"><i class="fa-solid fa-plus"></i> Bổ sung</span>`;
        } else if (owner.changeTag === "Rút bớt") {
            tr.className = "asset-row-deleted";
            badgeHtml = `<span class="tag-deleted"><i class="fa-solid fa-minus"></i> Rút bớt</span>`;
        } else if (owner.changeTag === "Sửa thông tin") {
            tr.className = "asset-row-modified";
            badgeHtml = `<span class="tag-modified"><i class="fa-solid fa-pen"></i> Chỉnh sửa</span>`;
        }

        // Render columns
        const nameVal = (owner.changeTag === "Sửa thông tin" && data.modifiedFields && data.modifiedFields.owner_name && data.modifiedFields.owner_name.index === idx)
            ? `<span class="old-value-strike">${data.modifiedFields.owner_name.old}</span> <span class="new-value-bold">${owner.name}</span>`
            : owner.name;

        tr.innerHTML = `
            <td>${owner.type}</td>
            <td><code>${owner.doc}</code></td>
            <td>${nameVal}</td>
            <td>${owner.address}</td>
            <td>${badgeHtml || '<span style="color:#64748B;"><i>Giữ nguyên</i></span>'}</td>
        `;

        tbody.appendChild(tr);
    });
}

// Render Creditors comparison table
function renderCreditorsTable(data) {
    const tbody = document.getElementById("historyCreditorsTbody");
    tbody.innerHTML = "";

    data.creditors.forEach(cred => {
        const tr = document.createElement("tr");
        let badgeHtml = "";

        if (cred.changeTag === "Bổ sung mới") {
            tr.className = "asset-row-added";
            badgeHtml = `<span class="tag-added">Bổ sung</span>`;
        }

        tr.innerHTML = `
            <td><strong>${cred.name}</strong></td>
            <td>${cred.address}</td>
            <td>${badgeHtml || '<span style="color:#64748B;"><i>Giữ nguyên</i></span>'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Render Assets comparison table (highlighting changes in color)
function renderAssetsTable(data) {
    const tbody = document.getElementById("historyAssetsTbody");
    tbody.innerHTML = "";

    data.assets.forEach(asset => {
        const tr = document.createElement("tr");
        let tagClass = "badge-success";
        
        if (asset.changeTag === "Bổ sung mới") {
            tr.className = "asset-row-added";
            tagClass = "badge-success";
        } else if (asset.changeTag === "Đã giải chấp" || asset.changeTag === "Đã hủy") {
            tr.className = "asset-row-deleted";
            tagClass = "badge-danger";
        } else if (asset.changeTag === "Sửa thông tin") {
            tr.className = "asset-row-modified";
            tagClass = "badge-warning";
        } else {
            tagClass = "badge-info";
        }

        tr.innerHTML = `
            <td>${asset.stt}</td>
            <td>${asset.type}</td>
            <td>${asset.name}</td>
            <td>${asset.brand}</td>
            <td><code style="font-weight:700;">${asset.chassis}</code></td>
            <td>${asset.engine}</td>
            <td><span class="badge ${tagClass}">${asset.changeTag}</span></td>
        `;

        tbody.appendChild(tr);
    });
}

// Show/Hide special mốc panels (Xóa/Hủy/Khôi phục/Chỉnh lý)
function toggleSpecialSections(data) {
    const secDel = document.getElementById("sec-history-delete-info");
    const secCancel = document.getElementById("sec-history-cancel-info");
    const secRes = document.getElementById("sec-history-restore-info");
    const secEdit = document.getElementById("sec-history-edit-info");

    // Default hide all
    secDel.classList.add("hidden");
    secCancel.classList.add("hidden");
    secRes.classList.add("hidden");
    secEdit.classList.add("hidden");

    if (data.deleteInfo) {
        secDel.classList.remove("hidden");
        document.getElementById("histDelDate").innerText = data.deleteInfo.date;
        document.getElementById("histDelRequester").innerText = data.deleteInfo.requester;
        document.getElementById("histDelReason").innerText = data.deleteInfo.reason;
        document.getElementById("histDelPDFLink").innerHTML = `<a href="#" class="btn btn-secondary btn-sm" onclick="alert('Tải thông báo xóa đăng ký...'); return false;"><i class="fa-solid fa-file-pdf" style="color:#DC2626;"></i> Tải Thông báo xóa (PDF)</a>`;
    }

    if (data.cancelInfo) {
        secCancel.classList.remove("hidden");
        document.getElementById("histCancelDate").innerText = data.cancelInfo.date;
        document.getElementById("histCancelRequester").innerText = data.cancelInfo.requester;
        document.getElementById("histCancelOfficer").innerText = data.cancelInfo.officer;
        document.getElementById("histCancelLeader").innerText = data.cancelInfo.leader;
        document.getElementById("histCancelType").innerText = data.cancelInfo.cancelType;
        document.getElementById("histCancelLaw").innerText = data.cancelInfo.lawBasis;
        document.getElementById("histCancelAttach").innerHTML = `<a href="#" class="action-link" onclick="alert('Xem tài liệu đính kèm hủy...'); return false;"><i class="fa-solid fa-paperclip"></i> ${data.cancelInfo.attachLink}</a>`;
        document.getElementById("histCancelPDFLink").innerHTML = `<a href="#" class="btn btn-secondary btn-sm" onclick="alert('Tải thông báo hủy...'); return false;"><i class="fa-solid fa-file-pdf" style="color:#DC2626;"></i> Tải Thông báo hủy (Mẫu 07d) (PDF)</a>`;
    }

    if (data.restoreInfo) {
        secRes.classList.remove("hidden");
        document.getElementById("histResDate").innerText = data.restoreInfo.date;
        document.getElementById("histResRequester").innerText = data.restoreInfo.requester;
        document.getElementById("histResOfficer").innerText = data.restoreInfo.officer;
        document.getElementById("histResLeader").innerText = data.restoreInfo.leader;
        document.getElementById("histResLaw").innerText = data.restoreInfo.lawBasis;
        document.getElementById("histResPDFLink").innerHTML = `<a href="#" class="btn btn-secondary btn-sm" onclick="alert('Tải thông báo khôi phục...'); return false;"><i class="fa-solid fa-file-pdf" style="color:#DC2626;"></i> Tải Thông báo khôi phục (PDF)</a>`;
    }

    if (data.editInfo) {
        secEdit.classList.remove("hidden");
        document.getElementById("histEditDate").innerText = data.editInfo.date;
        document.getElementById("histEditRequester").innerText = data.editInfo.requester;
        document.getElementById("histEditOfficer").innerText = data.editInfo.officer;
        document.getElementById("histEditLeader").innerText = data.editInfo.leader;
        document.getElementById("histEditPDFLink").innerHTML = `<a href="#" class="btn btn-secondary btn-sm" onclick="alert('Tải thông báo chỉnh lý...'); return false;"><i class="fa-solid fa-file-pdf" style="color:#DC2626;"></i> Tải Thông báo chỉnh lý (PDF)</a>`;
    }
}

// Toggle logic: Only display modifications
function applyOnlyChangesToggle() {
    const isChecked = document.getElementById("toggleOnlyChanges").checked;
    
    // Select all sections on the right
    const section1 = document.getElementById("sec-register-info");
    const section2 = document.getElementById("sec-dossier-info");
    const section3 = document.getElementById("sec-general-info");
    const section4 = document.getElementById("sec-secured-owners");
    const section5 = document.getElementById("sec-secured-creditors");

    if (isChecked) {
        // Hide standard unchanged sections completely
        section1.classList.add("hidden");
        section2.classList.add("hidden");

        // Hide specific rows in the General Info card that do not have highlighted values
        document.querySelectorAll("#sec-general-info .detail-row-flex").forEach(row => {
            if (!row.classList.contains("highlight-modified")) {
                row.classList.add("hidden");
            }
        });

        // Hide rows in secured owners that are not added/deleted/modified
        let hasOwnerChanges = false;
        document.querySelectorAll("#historyOwnersTbody tr").forEach(row => {
            if (!row.classList.contains("asset-row-added") && 
                !row.classList.contains("asset-row-deleted") && 
                !row.classList.contains("asset-row-modified")) {
                row.classList.add("hidden");
            } else {
                hasOwnerChanges = true;
            }
        });
        if (!hasOwnerChanges) section4.classList.add("hidden");

        // Hide creditors if no changes
        let hasCreditorChanges = false;
        document.querySelectorAll("#historyCreditorsTbody tr").forEach(row => {
            if (!row.classList.contains("asset-row-added") && 
                !row.classList.contains("asset-row-deleted") && 
                !row.classList.contains("asset-row-modified")) {
                row.classList.add("hidden");
            } else {
                hasCreditorChanges = true;
            }
        });
        if (!hasCreditorChanges) section5.classList.add("hidden");

        // Hide assets that are not added/deleted/modified
        document.querySelectorAll("#historyAssetsTbody tr").forEach(row => {
            if (!row.classList.contains("asset-row-added") && 
                !row.classList.contains("asset-row-deleted") && 
                !row.classList.contains("asset-row-modified")) {
                row.classList.add("hidden");
            }
        });

    } else {
        // Show all
        section1.classList.remove("hidden");
        section2.classList.remove("hidden");
        section3.classList.remove("hidden");
        
        // Show special nodes if they have active datasets
        const detail = mockVersionDetails[currentSelectedVersion];
        if (detail) {
            if (detail.owners && detail.owners.length > 0) section4.classList.remove("hidden");
            if (detail.creditors && detail.creditors.length > 0) section5.classList.remove("hidden");
        }

        // Remove hidden classes on children rows
        document.querySelectorAll(".detail-row-flex, #historyOwnersTbody tr, #historyCreditorsTbody tr, #historyAssetsTbody tr").forEach(el => {
            el.classList.remove("hidden");
        });
    }
}
