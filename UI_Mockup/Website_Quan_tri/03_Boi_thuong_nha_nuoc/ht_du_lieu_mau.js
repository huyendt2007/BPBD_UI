/*
 * Xem xét trách nhiệm hoàn trả - Dữ liệu mẫu bổ sung phủ các trạng thái của Ma trận chuyển trạng thái.
 * Dùng chung màn Danh sách (xem_xet_trach_nhiem_hoan_tra.html) và màn Chi tiết (chi_tiet_ho_so_hoan_tra.html).
 * - HT-2026-022: Hồ sơ nháp (chưa thành lập Hội đồng)
 * - HT-2026-023: Chờ duyệt (QĐ đình chỉ) - đình chỉ cả hồ sơ tại Bước 2
 * - HT-2026-024: Bị trả lại (QĐ đình chỉ) - đình chỉ cả hồ sơ tại Bước 1
 * - HT-2026-025: Chờ ban hành QĐ hoàn trả, cán bộ Miễn / Giảm theo ý kiến Hội đồng (ban hành QĐ hoàn trả -> Miễn hoàn trả / Thu tiền hoàn trả) (đơn vị B)
 * - HT-2026-026: Thu tiền hoàn trả: nhiều đợt nộp, cán bộ Giảm / Miễn; chọn nhiều cán bộ trình QĐ miễn / giảm bổ sung (đơn vị A)
 * Nạp sau khối dữ liệu của trang, trước các add-on xem_xet_hoan_tra_pham_vi.js / chi_tiet_ho_so_hoan_tra_ykhd.js / _qd.js.
 */
(function () {
    const U_CHU = 'UBND Quận Long Biên', U_A = 'UBND Phường Bồ Đề', U_B = 'UBND Huyện An Dương';
    // Phiên bản dữ liệu mẫu: đổi phiên bản thì xóa dữ liệu thao tác đã lưu của các hồ sơ mẫu bổ sung để nạp lại theo mẫu mới
    // 28/10: giảm mức hoàn trả tối đa 30% (dữ liệu mẫu giảm), Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương (HT-2026-001), lĩnh vực tố tụng hình sự (HT-2026-021)
    // 28/10 (2): Miễn / Giảm theo ý kiến Hội đồng thể hiện trong QĐ hoàn trả (không QĐ miễn / giảm riêng); đình chỉ chỉ trước khi ban hành QĐ hoàn trả
    const SEED_VER = '20261028mg1', SEED_CODES = ['HT-2026-025', 'HT-2026-026', 'HT-2026-027', 'HT-2026-001', 'HT-2026-021'];
    try {
        if (localStorage.getItem('btnn_ht_seed_ver') !== SEED_VER) {
            const st = JSON.parse(localStorage.getItem('btnn_ht_units_v1') || '{}') || {};
            SEED_CODES.forEach(c => { delete st[c]; });
            localStorage.setItem('btnn_ht_units_v1', JSON.stringify(st));
            localStorage.setItem('btnn_ht_seed_ver', SEED_VER);
        }
    } catch (e) { /* bỏ qua */ }
    const OF = (name, agency, role, loi, total, refundMethod) => ({ name, agency, role, loi, total, paid: 0, nextDate: '—', status: '', refundMethod, progressClass: 'primary', isPostponed: false });
    const CASES = [
        { id: 'HT-2026-022', claimCode: 'BT-2026-022', claimSummary: 'Thu giữ phương tiện vi phạm quá thời hạn tạm giữ theo quy định.', claimAmt: 40000000, status: 'Chờ thành lập hội đồng', hdDecision: '', hdDate: '', officers: [] },
        { id: 'HT-2026-023', claimCode: 'BT-2026-023', claimSummary: 'Ban hành quyết định xử phạt vi phạm hành chính sai đối tượng.', claimAmt: 60000000, status: 'Chờ duyệt QĐ đình chỉ', prev: 'Họp hội đồng', dcht: 'pending', hdDecision: '51/QĐ-TLHD', hdDate: '05/09/2026', officers: [OF('Lâm Văn Đình', U_A, 'Chuyên viên', 'Vô ý', 20000000, 'Một lần')] },
        { id: 'HT-2026-024', claimCode: 'BT-2026-024', claimSummary: 'Chậm cấp giấy chứng nhận quyền sử dụng đất gây thiệt hại.', claimAmt: 35000000, status: 'Bị trả lại QĐ đình chỉ', prev: 'Bị trả lại thành lập HĐ', dcht: 'rejected', hdDecision: '', hdDate: '', officers: [OF('Nghiêm Văn Tú', U_B, 'Chuyên viên', 'Vô ý', 12000000, 'Hoàn trả một lần')] },
        {
            id: 'HT-2026-025', claimCode: 'BT-2026-025', claimSummary: 'Cưỡng chế thu hồi đất không đúng trình tự, thủ tục.', claimAmt: 180000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '52/QĐ-TLHD', hdDate: '10/08/2026',
            officers: [OF('Trịnh Văn Miễn', U_B, 'Cán bộ địa chính', 'Vô ý', 12000000, ''), OF('Lý Thị Từ', U_B, 'Chuyên viên', 'Vô ý', 10000000, ''), OF('Mai Văn Giảm', U_B, 'Phó Trưởng phòng', 'Vô ý', 20000000, 'Nhiều lần'), OF('Đinh Thị Hạ', U_B, 'Chuyên viên', 'Vô ý', 16000000, 'Một lần')]
        },
        {
            id: 'HT-2026-026', claimCode: 'BT-2026-026', claimSummary: 'Ra quyết định tạm giữ hành chính trái pháp luật; văn bản làm căn cứ bị hủy bỏ một phần.', claimAmt: 120000000, status: 'Thu tiền hoàn trả', hdDecision: '53/QĐ-TLHD', hdDate: '15/07/2026',
            officers: [OF('Cao Văn Duyệt', U_A, 'Trưởng Công an phường', 'Vô ý', 15000000, 'Nhiều lần'), OF('Tạ Thị Chối', U_A, 'Cán bộ tư pháp', 'Vô ý', 8000000, 'Một lần'), OF('Phan Văn Trả', U_A, 'Phó Chủ tịch', 'Vô ý', 12000000, 'Nhiều lần'), OF('Kiều Văn Chỉ', U_A, 'Chuyên viên', 'Vô ý', 9000000, 'Nhiều lần'), OF('Hồ Văn Thừa', U_A, 'Kế toán', 'Vô ý', 10000000, 'Nhiều lần'), OF('Đỗ Văn Nộp', U_A, 'Công chức địa chính', 'Vô ý', 12000000, 'Nhiều lần'),
                OF('Lương Văn Giảm', U_A, 'Phó Trưởng phòng', 'Vô ý', 18000000, 'Nhiều lần'), OF('Phí Thị Miễn', U_A, 'Chuyên viên', 'Vô ý', 10000000, '')]
        },
        // Hồ sơ nhiều đơn vị (03 phần đơn vị ở 03 trạng thái): Đơn vị tạo Hội đồng chưa trình QĐ hoàn trả; Đơn vị A Chờ duyệt QĐ hoàn trả; Đơn vị B đã ban hành, đang thu tiền
        {
            id: 'HT-2026-027', claimCode: 'BT-2026-027', claimSummary: 'Giải phóng mặt bằng sai quy hoạch, ban hành nhiều quyết định thu hồi đất trái pháp luật tại 03 địa bàn.', claimAmt: 260000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '54/QĐ-TLHD', hdDate: '01/08/2026',
            officers: [OF('Đoàn Văn Lâm', U_CHU, 'Trưởng phòng Tài nguyên và Môi trường', 'Vô ý', 40000000, 'Hoàn trả nhiều lần'), OF('Vương Thị Hằng', U_CHU, 'Chuyên viên', 'Vô ý', 20000000, 'Hoàn trả một lần'), OF('Mạc Văn Toàn', U_CHU, 'Cán bộ địa chính', 'Vô ý', 15000000, ''),
                OF('Lại Văn Phúc', U_A, 'Phó Chủ tịch phường', 'Cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội', 35000000, 'Hoàn trả nhiều lần'), OF('Hà Thị Ngân', U_B, 'Cán bộ địa chính', 'Vô ý', 25000000, 'Hoàn trả nhiều lần'), OF('Tô Văn Khải', U_B, 'Chuyên viên', 'Vô ý', 18000000, 'Hoàn trả một lần')]
        }
    ];
    // Trạng thái mẫu của cán bộ (màn Chi tiết, chi_tiet_ho_so_hoan_tra_qd.js): [ct, xl, giam, extra]
    window.HT_EXTRA_SEED = {
        'Trịnh Văn Miễn': ['CBH_HT', 'MIEN'],
        'Lý Thị Từ': ['CBH_HT', 'MIEN'],
        'Mai Văn Giảm': ['CBH_HT', 'GIAM', 14000000],
        'Đinh Thị Hạ': ['CBH_HT', 'GIAM', 12000000],
        'Cao Văn Duyệt': ['THU', 'HT', 0, { paid: 5000000 }],
        'Tạ Thị Chối': ['THU', 'HT'],
        'Phan Văn Trả': ['THU', 'HT', 0, { paid: 4000000 }],
        'Kiều Văn Chỉ': ['THU', 'HT', 0, { paid: 3000000 }],
        'Hồ Văn Thừa': ['THU', 'GIAM', 8000000, { paid: 6000000, total: 8000000 }],
        // Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại A: cán bộ đang thu tiền, còn phải nộp (demo Ghi nhận nộp tiền)
        'Đỗ Văn Nộp': ['THU', 'HT', 0, { paid: 3000000, pays: [['15/09/2026', 1000000], ['05/10/2026', 2000000]] }],
        // Xem chi tiết hoàn trả của cán bộ: Giảm theo ý kiến Hội đồng, đã nộp 02 đợt; Miễn hoàn trả
        'Lương Văn Giảm': ['THU', 'GIAM', 13000000, { paid: 4000000, total: 13000000, pays: [['10/10/2026', 2000000], ['20/10/2026', 2000000]] }],
        'Phí Thị Miễn': ['MIEN', 'MIEN', 0, { paid: 0, total: 0 }],
        // HT-2026-027 - phần của Đơn vị tạo Hội đồng (UBND Quận Long Biên): đã ban hành QĐ hoàn trả
        'Đoàn Văn Lâm': ['THU', 'HT', 0, { paid: 32000000 }], 'Vương Thị Hằng': ['THU', 'GIAM', 14000000, { paid: 5000000, total: 14000000 }], 'Mạc Văn Toàn': ['MIEN', 'MIEN'],
        'Lại Văn Phúc': ['CD_HT', 'HT'],
        'Hà Thị Ngân': ['THU', 'HT', 0, { paid: 10000000 }], 'Tô Văn Khải': ['THU', 'HT', 0, { paid: 0 }]
    };
    // Phần đơn vị / cán bộ của hồ sơ đã chốt ý kiến Hội đồng (màn Danh sách, xem_xet_hoan_tra_pham_vi.js)
    const L = (name, unit, st, o) => Object.assign({ name, unit, st, xl: 'HT', hd: 0, giam: 0, paid: 0 }, o || {});
    window.HT_EXTRA_SPLIT = {
        'HT-2026-025': { owner: U_CHU, officers: [L('Trịnh Văn Miễn', U_B, 'CBH_HT', { xl: 'MIEN', hd: 12000000 }), L('Lý Thị Từ', U_B, 'CBH_HT', { xl: 'MIEN', hd: 10000000 }), L('Mai Văn Giảm', U_B, 'CBH_HT', { xl: 'GIAM', hd: 20000000, giam: 14000000 }), L('Đinh Thị Hạ', U_B, 'CBH_HT', { xl: 'GIAM', hd: 16000000, giam: 12000000 })] },
        'HT-2026-026': {
            owner: U_CHU, officers: [L('Cao Văn Duyệt', U_A, 'THU', { hd: 15000000, paid: 5000000 }), L('Tạ Thị Chối', U_A, 'THU', { hd: 8000000 }), L('Phan Văn Trả', U_A, 'THU', { hd: 12000000, paid: 4000000 }),
                L('Kiều Văn Chỉ', U_A, 'THU', { hd: 9000000, paid: 3000000 }), L('Hồ Văn Thừa', U_A, 'THU', { xl: 'GIAM', hd: 10000000, giam: 8000000, paid: 6000000, pt: 8000000 }),
                L('Đỗ Văn Nộp', U_A, 'THU', { hd: 12000000, paid: 3000000 }), L('Lương Văn Giảm', U_A, 'THU', { xl: 'GIAM', hd: 18000000, giam: 13000000, paid: 4000000, pt: 13000000 }),
                L('Phí Thị Miễn', U_A, 'MIEN', { xl: 'MIEN', hd: 10000000 })]
        },
        'HT-2026-027': {
            owner: U_CHU, officers: [L('Đoàn Văn Lâm', U_CHU, 'THU', { hd: 40000000, paid: 32000000 }), L('Vương Thị Hằng', U_CHU, 'THU', { xl: 'GIAM', hd: 20000000, giam: 14000000, paid: 5000000, pt: 14000000 }), L('Mạc Văn Toàn', U_CHU, 'MIEN', { xl: 'MIEN', hd: 15000000 }), L('Lại Văn Phúc', U_A, 'CD_HT', { hd: 35000000 }),
                L('Hà Thị Ngân', U_B, 'THU', { hd: 25000000, paid: 10000000 }), L('Tô Văn Khải', U_B, 'THU', { hd: 18000000 })]
        }
    };

    // Nguồn lập hồ sơ hoàn trả mới (popup Chọn vụ việc bồi thường, màn Danh sách): vụ việc đã hoàn tất chi trả kinh phí bồi thường,
    // chưa có hồ sơ hoàn trả; agency = Đơn vị chi trả bồi thường (đơn vị tạo Hội đồng) dùng lọc phạm vi dữ liệu; officers = người thi hành công vụ gây thiệt hại.
    // Dữ liệu độc lập kho của Giải quyết YCBT / QĐ GQBT / Kinh phí để popup luôn có dữ liệu khi trình duyệt chưa mở các trang đó.
    const S = (claimCode, claimant, agency, claimAmt, paidDate, gqbtQdNo, gqbtQdDate, claimField, claimAct, claimSummary, officers) =>
        ({ claimCode, claimant, agency, claimAmt, paidDate, gqbtQdNo, gqbtQdDate, claimField, claimAct, claimSummary, officers: officers.map(o => ({ name: o[0], agency: o[1], role: o[2] })) });
    window.HT_SOURCE_CLAIMS = [
        S('BT-2026-101', 'Đặng Văn Hưng', U_CHU, 95000000, '05/08/2026', '45/QĐ-UBND', '10/07/2026', 'Quản lý hành chính đất đai', 'Ban hành quyết định thu hồi đất không đúng thẩm quyền',
            'Thu hồi đất nông nghiệp không đúng thẩm quyền, không bồi thường hỗ trợ theo quy định.', [['Phùng Văn Quang', U_CHU, 'Phó Trưởng phòng Tài nguyên và Môi trường'], ['Nông Thị Diệu', U_A, 'Cán bộ địa chính']]),
        S('BT-2026-102', 'Công ty TNHH Minh Khang', U_CHU, 240000000, '12/08/2026', '48/QĐ-UBND', '18/07/2026', 'Xử lý vi phạm hành chính', 'Ra quyết định đình chỉ hoạt động kinh doanh trái pháp luật',
            'Đình chỉ hoạt động kinh doanh của doanh nghiệp khi chưa đủ căn cứ vi phạm hành chính.', [['Quách Văn Bình', U_CHU, 'Chánh Thanh tra quận'], ['Lục Thị Yến', U_B, 'Thanh tra viên']]),
        S('BT-2026-103', 'Trịnh Thị Lan', U_CHU, 68000000, '20/08/2026', '51/QĐ-UBND', '25/07/2026', 'Quản lý trật tự xây dựng', 'Cưỡng chế phá dỡ công trình sai chỉ giới được cấp phép',
            'Cưỡng chế phá dỡ phần công trình xây dựng đúng giấy phép, gây thiệt hại tài sản.', [['Ông Văn Thắng', U_A, 'Phó Chủ tịch UBND phường']]),
        S('BT-2026-104', 'Hồ Minh Trí', U_CHU, 132000000, '28/08/2026', '53/QĐ-UBND', '02/08/2026', 'Thi hành án hành chính', 'Chậm thực hiện bản án hành chính đã có hiệu lực pháp luật',
            'Chậm thi hành bản án hành chính về cấp giấy chứng nhận quyền sử dụng đất, gây thiệt hại thu nhập.', [['Tăng Văn Lực', U_CHU, 'Chuyên viên Văn phòng HĐND - UBND'], ['Khổng Thị Mến', U_B, 'Công chức địa chính - xây dựng'], ['Âu Văn Sơn', U_A, 'Công chức tư pháp - hộ tịch']]),
        S('BT-2026-105', 'Lưu Thị Phương', U_CHU, 54000000, '03/09/2026', '56/QĐ-UBND', '08/08/2026', 'Quản lý hộ tịch', 'Từ chối đăng ký hộ tịch trái pháp luật',
            'Từ chối đăng ký khai sinh trái quy định làm phát sinh thiệt hại do không hưởng chế độ an sinh.', [['Yên Thị Hòa', U_B, 'Công chức tư pháp - hộ tịch']]),
        // Ngoài phạm vi dữ liệu của đơn vị giả lập (đơn vị chi trả khác): không hiển thị trong popup
        S('BT-2026-106', 'Tôn Văn Kiên', 'UBND Quận Cầu Giấy', 77000000, '15/08/2026', '61/QĐ-UBND', '20/07/2026', 'Quản lý hành chính đất đai', 'Cấp giấy chứng nhận quyền sử dụng đất sai đối tượng',
            'Cấp giấy chứng nhận quyền sử dụng đất cho người không có quyền, gây thiệt hại cho chủ sử dụng hợp pháp.', [['Bạch Văn Hiếu', 'UBND Quận Cầu Giấy', 'Chuyên viên phòng Tài nguyên và Môi trường']])
    ];
    // Họ và tên người yêu cầu theo Mã hồ sơ GQBT (định danh vụ việc "Mã vụ việc - Họ và tên" trên Danh sách / Chi tiết)
    try { if (typeof CLAIMANT_BY_CODE !== 'undefined') window.HT_SOURCE_CLAIMS.forEach(s => { if (!CLAIMANT_BY_CODE[s.claimCode]) CLAIMANT_BY_CODE[s.claimCode] = s.claimant; }); } catch (e) { /* bỏ qua */ }
    // Đơn vị của người dùng giả lập (thanh giả lập Hoàn trả): xác định phạm vi dữ liệu của nguồn lập hồ sơ
    window.htSourceInScope = function (src) {
        if (!src || !src.agency) return true;
        let sc = 'don_vi_chu';
        try { sc = sessionStorage.getItem('htMockScope') || sc; } catch (e) { /* bỏ qua */ }
        const unit = { don_vi_chu: U_CHU, don_vi_a: U_A, don_vi_b: U_B, stp: 'Sở Tư pháp Hà Nội' }[sc] || U_CHU;
        return src.agency === unit;
    };

    if (typeof dossiersList === 'undefined') return;
    const isDetail = typeof addMockDossier === 'function';
    CASES.forEach(c => {
        const base = {
            id: c.id, code: c.id, claimCode: c.claimCode, claimSummary: c.claimSummary, agency: 'Sở Tư pháp Hà Nội', claimAmt: c.claimAmt, claimDate: '20/06/2026',
            status: c.status, dateCreated: '01/07/2026', hdDecision: c.hdDecision, hdDate: c.hdDate, refundOfficers: c.officers.map(o => Object.assign({}, o)), payments: []
        };
        if (isDetail) {
            addMockDossier(Object.assign(base, { qdStatus: null, qdNo: '', qdDate: '', qdSigner: '', qdSummary: '', qdFileName: '', conclusionFile: '', timeline: [], refundTotal: c.officers.reduce((s, o) => s + o.total, 0) }));
        } else if (!dossiersList.some(d => d.id === c.id)) {
            dossiersList.push(Object.assign(base, {
                officerName: c.officers.map(o => o.name).join(', '), officerRole: c.officers.map(o => o.role).join(', '), deadlineDate: '', daysLeft: null,
                refundTotal: c.officers.reduce((s, o) => s + o.total, 0), refundMethod: '', refundMonthly: 0, qdDate: ''
            }));
        }
    });
    // HT-2026-008 (Họp hội đồng): thêm 01 cán bộ để demo đình chỉ một phần cán bộ tại Bước 2
    const d8 = dossiersList.find(d => d.id === 'HT-2026-008');
    if (d8 && Array.isArray(d8.refundOfficers) && !d8.refundOfficers.some(o => o.name === 'Nguyễn Thị Hoa')) {
        d8.refundOfficers.push(Object.assign(OF('Nguyễn Thị Hoa', U_A, 'Cán bộ tư pháp', 'Vô ý', 15000000, 'Hoàn trả nhiều lần'), { xl: 'Hoàn trả', status: 'Họp hội đồng' }));
    }
    if (!isDetail) return;

    // Màn Chi tiết: hồ sơ do người dùng khởi tạo từ màn Danh sách (localStorage 'btnn_hoantra_created_v1') mở lại được khi đã đóng phiên
    try {
        const created = JSON.parse(localStorage.getItem('btnn_hoantra_created_v1') || '[]');
        if (Array.isArray(created)) created.forEach(d => {
            if (!d || !d.id || dossiersList.some(x => x.id === d.id)) return;
            addMockDossier(Object.assign({ qdStatus: null, qdNo: '', qdDate: '', qdSigner: '', qdSummary: '', qdFileName: '', conclusionFile: '', timeline: [], payments: [] }, d));
        });
    } catch (e) { /* bỏ qua */ }
    // Bước 1 - Tài liệu liên quan: Quyết định giải quyết bồi thường của vụ việc nguồn
    window.addEventListener('DOMContentLoaded', () => {
        try {
            if (typeof activeDossier === 'undefined' || !activeDossier || !activeDossier.gqbtQdNo || typeof s1RelatedDocs === 'undefined') return;
            const no = activeDossier.gqbtQdNo;
            if (s1RelatedDocs.some(x => x.code === no)) return;
            s1RelatedDocs.splice(0, s1RelatedDocs.length, { title: 'Quyết định giải quyết bồi thường số ' + no, code: no, date: activeDossier.claimDate || '', fileName: 'Quyet_dinh_giai_quyet_boi_thuong_' + no.replace(/\//g, '_') + '.pdf' });
            if (typeof renderStep1 === 'function') renderStep1();
        } catch (e) { /* bỏ qua */ }
    });

    // Màn Chi tiết: lượt trình Quyết định đình chỉ cả hồ sơ (Chờ duyệt / Bị trả lại) cho HT-2026-023, HT-2026-024
    // window: chạy sau khối khởi tạo của trang (chọn hồ sơ theo id)
    window.addEventListener('DOMContentLoaded', () => {
        const c = CASES.find(x => activeDossier && x.id === activeDossier.id && x.dcht);
        if (!c || activeDossier.dcht || typeof tlhdLevels !== 'function') return;
        const levels = tlhdLevels();
        activeDossier.dcht = {
            method: 'online', docSrc: 'gen', prevStatus: c.prev, so: '', ngay: '20/09/2026',
            canCu: typeof DCHT_CAN_CU_DEFAULT !== 'undefined' ? (Array.isArray(DCHT_CAN_CU_DEFAULT) ? DCHT_CAN_CU_DEFAULT.join('\n') : String(DCHT_CAN_CU_DEFAULT)) : '',
            vbCanCu: 'Quyết định số 15/QĐ-UBND ngày 02/03/2026 của Ủy ban nhân dân quận Long Biên', noiNhan: typeof dchtNoiNhanDefault === 'function' ? dchtNoiNhanDefault() : '',
            fileName: 'Mau_39_BTNN_Quyet_dinh_dinh_chi_xem_xet_hoan_tra_' + activeDossier.code + '.docx', uploadMeta: null, attachments: [{ name: 'Văn bản hủy bỏ văn bản làm căn cứ yêu cầu bồi thường', file: { id: '', name: 'Van_ban_huy_bo_can_cu_YCBT.pdf', size: 312320, type: 'application/pdf' } }],
            levels, assignees: levels.map(l => (l.leaders && l.leaders[0] ? l.leaders[0].id : '')), coords: [], enableNhay: true,
            content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả.', level: 0, submittedAt: '20/09/2026 09:00',
            returned: c.dcht === 'rejected' ? { reason: 'Cần ghi rõ số, ngày văn bản hủy bỏ văn bản làm căn cứ yêu cầu bồi thường.', by: 'Lãnh đạo cấp 1', at: '21/09/2026 10:30' } : null
        };
        if (typeof renderStateLayout === 'function') renderStateLayout();
    });
})();
