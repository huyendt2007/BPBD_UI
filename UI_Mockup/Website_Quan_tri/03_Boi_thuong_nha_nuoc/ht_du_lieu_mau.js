/*
 * Xem xét trách nhiệm hoàn trả - Dữ liệu mẫu bổ sung phủ các trạng thái của Ma trận chuyển trạng thái.
 * Dùng chung màn Danh sách (xem_xet_trach_nhiem_hoan_tra.html) và màn Chi tiết (chi_tiet_ho_so_hoan_tra.html).
 * - HT-2026-022: Hồ sơ nháp (chưa thành lập Hội đồng)
 * - HT-2026-023: Chờ duyệt (QĐ đình chỉ) - đình chỉ cả hồ sơ tại Bước 2
 * - HT-2026-024: Bị từ chối (QĐ đình chỉ) - đình chỉ cả hồ sơ tại Bước 1
 * - HT-2026-025: Chờ ban hành / Chờ duyệt / Bị từ chối QĐ miễn, QĐ giảm (đơn vị B)
 * - HT-2026-026: Đình chỉ cấp cán bộ (Chờ duyệt, Bị từ chối, Chờ trả lại tiền, Đình chỉ hoàn trả) + Cần trả lại tiền nộp thừa (đơn vị A)
 * Nạp sau khối dữ liệu của trang, trước các add-on xem_xet_hoan_tra_pham_vi.js / chi_tiet_ho_so_hoan_tra_ykhd.js / _qd.js.
 */
(function () {
    const U_CHU = 'UBND Quận Long Biên', U_A = 'UBND Phường Bồ Đề', U_B = 'UBND Huyện An Dương';
    // Phiên bản dữ liệu mẫu: đổi phiên bản thì xóa dữ liệu thao tác đã lưu của các hồ sơ mẫu bổ sung để nạp lại theo mẫu mới
    const SEED_VER = '20261026p10', SEED_CODES = ['HT-2026-025', 'HT-2026-026', 'HT-2026-027'];
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
        { id: 'HT-2026-024', claimCode: 'BT-2026-024', claimSummary: 'Chậm cấp giấy chứng nhận quyền sử dụng đất gây thiệt hại.', claimAmt: 35000000, status: 'Bị từ chối QĐ đình chỉ', prev: 'Bị từ chối thành lập HĐ', dcht: 'rejected', hdDecision: '', hdDate: '', officers: [OF('Nghiêm Văn Tú', U_B, 'Chuyên viên', 'Vô ý', 12000000, 'Hoàn trả một lần')] },
        {
            id: 'HT-2026-025', claimCode: 'BT-2026-025', claimSummary: 'Cưỡng chế thu hồi đất không đúng trình tự, thủ tục.', claimAmt: 180000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '52/QĐ-TLHD', hdDate: '10/08/2026',
            officers: [OF('Trịnh Văn Miễn', U_B, 'Cán bộ địa chính', 'Vô ý', 12000000, ''), OF('Lý Thị Từ', U_B, 'Chuyên viên', 'Vô ý', 10000000, ''), OF('Mai Văn Giảm', U_B, 'Phó Trưởng phòng', 'Vô ý', 20000000, 'Nhiều lần'), OF('Đinh Thị Hạ', U_B, 'Chuyên viên', 'Vô ý', 16000000, 'Một lần')]
        },
        {
            id: 'HT-2026-026', claimCode: 'BT-2026-026', claimSummary: 'Ra quyết định tạm giữ hành chính trái pháp luật; văn bản làm căn cứ bị hủy bỏ một phần.', claimAmt: 120000000, status: 'Thu hồi tiền hoàn trả', hdDecision: '53/QĐ-TLHD', hdDate: '15/07/2026',
            officers: [OF('Cao Văn Duyệt', U_A, 'Trưởng Công an phường', 'Vô ý', 15000000, 'Nhiều lần'), OF('Tạ Thị Chối', U_A, 'Cán bộ tư pháp', 'Vô ý', 8000000, 'Một lần'), OF('Phan Văn Trả', U_A, 'Phó Chủ tịch', 'Vô ý', 12000000, 'Nhiều lần'), OF('Kiều Văn Chỉ', U_A, 'Chuyên viên', 'Vô ý', 9000000, 'Nhiều lần'), OF('Hồ Văn Thừa', U_A, 'Kế toán', 'Vô ý', 10000000, 'Nhiều lần')]
        },
        // Hồ sơ nhiều đơn vị (03 phần đơn vị ở 03 trạng thái): Đơn vị tạo Hội đồng chưa trình QĐ hoàn trả; Đơn vị A Chờ duyệt QĐ hoàn trả; Đơn vị B đã ban hành, đang thu hồi
        {
            id: 'HT-2026-027', claimCode: 'BT-2026-027', claimSummary: 'Giải phóng mặt bằng sai quy hoạch, ban hành nhiều quyết định thu hồi đất trái pháp luật tại 03 địa bàn.', claimAmt: 260000000, status: 'Chờ ban hành QĐ hoàn trả', hdDecision: '54/QĐ-TLHD', hdDate: '01/08/2026',
            officers: [OF('Đoàn Văn Lâm', U_CHU, 'Trưởng phòng Tài nguyên và Môi trường', 'Vô ý', 40000000, 'Hoàn trả nhiều lần'), OF('Vương Thị Hằng', U_CHU, 'Chuyên viên', 'Vô ý', 20000000, 'Hoàn trả một lần'), OF('Mạc Văn Toàn', U_CHU, 'Cán bộ địa chính', 'Vô ý', 15000000, ''),
                OF('Lại Văn Phúc', U_A, 'Phó Chủ tịch phường', 'Cố ý', 35000000, 'Hoàn trả nhiều lần'), OF('Hà Thị Ngân', U_B, 'Cán bộ địa chính', 'Vô ý', 25000000, 'Hoàn trả nhiều lần'), OF('Tô Văn Khải', U_B, 'Chuyên viên', 'Vô ý', 18000000, 'Hoàn trả một lần')]
        }
    ];
    // Trạng thái mẫu của cán bộ (màn Chi tiết, chi_tiet_ho_so_hoan_tra_qd.js): [ct, xl, giam, extra]
    window.HT_EXTRA_SEED = {
        'Trịnh Văn Miễn': ['CBH_MIEN', 'MIEN'],
        'Lý Thị Từ': ['BTC_MIEN', 'MIEN', 0, { qd2: 'BTC' }],
        'Mai Văn Giảm': ['CD_GIAM', 'GIAM', 14000000, { qd2: 'CD' }],
        'Đinh Thị Hạ': ['BTC_GIAM', 'GIAM', 12000000, { qd2: 'BTC' }],
        'Cao Văn Duyệt': ['THU', 'HT', 0, { paid: 5000000, trinh: 'CD_DC', dc: { key: 0, st: 'CD', pa: 'KHONG' } }],
        'Tạ Thị Chối': ['THU', 'HT', 0, { trinh: 'BTC_DC', dc: { key: 1, st: 'BTC' } }],
        'Phan Văn Trả': ['THU', 'HT', 0, { paid: 4000000, total: 4000000, refund: 4000000, trinh: 'TL_DC', dc: { key: 2, st: 'DONE', pa: 'HOAN' } }],
        'Kiều Văn Chỉ': ['DC', 'HT', 0, { paid: 3000000, total: 3000000, dc: { key: 2, st: 'DONE', pa: 'KHONG' } }],
        'Hồ Văn Thừa': ['THU', 'GIAM', 8000000, { paid: 10000000, total: 8000000, refund: 2000000 }],
        // HT-2026-027 - phần của Đơn vị tạo Hội đồng (UBND Quận Long Biên): đã ban hành QĐ hoàn trả
        'Đoàn Văn Lâm': ['THU', 'HT', 0, { paid: 15000000 }], 'Vương Thị Hằng': ['THU', 'GIAM', 12000000, { total: 12000000 }], 'Mạc Văn Toàn': ['CBH_MIEN', 'MIEN'],
        'Lại Văn Phúc': ['CD_HT', 'HT'],
        'Hà Thị Ngân': ['THU', 'HT', 0, { paid: 10000000 }], 'Tô Văn Khải': ['THU', 'HT', 0, { paid: 0 }]
    };
    // Phần đơn vị / cán bộ của hồ sơ đã chốt ý kiến Hội đồng (màn Danh sách, xem_xet_hoan_tra_pham_vi.js)
    const L = (name, unit, st, o) => Object.assign({ name, unit, st, xl: 'HT', hd: 0, giam: 0, paid: 0 }, o || {});
    window.HT_EXTRA_SPLIT = {
        'HT-2026-025': { owner: U_CHU, officers: [L('Trịnh Văn Miễn', U_B, 'CBH_MIEN', { xl: 'MIEN', hd: 12000000 }), L('Lý Thị Từ', U_B, 'BTC_MIEN', { xl: 'MIEN', hd: 10000000 }), L('Mai Văn Giảm', U_B, 'CD_GIAM', { xl: 'GIAM', hd: 20000000, giam: 14000000 }), L('Đinh Thị Hạ', U_B, 'BTC_GIAM', { xl: 'GIAM', hd: 16000000, giam: 12000000 })] },
        'HT-2026-026': {
            owner: U_CHU, officers: [L('Cao Văn Duyệt', U_A, 'THU', { hd: 15000000, paid: 5000000, trinh: 'CD_DC' }), L('Tạ Thị Chối', U_A, 'THU', { hd: 8000000, trinh: 'BTC_DC' }), L('Phan Văn Trả', U_A, 'THU', { hd: 12000000, paid: 4000000, pt: 4000000, refund: 4000000, trinh: 'TL_DC' }),
                L('Kiều Văn Chỉ', U_A, 'DC', { hd: 9000000, paid: 3000000, pt: 3000000 }), L('Hồ Văn Thừa', U_A, 'THU', { xl: 'GIAM', hd: 10000000, giam: 8000000, paid: 10000000, pt: 8000000, refund: 2000000 })]
        },
        'HT-2026-027': {
            owner: U_CHU, officers: [L('Đoàn Văn Lâm', U_CHU, 'THU', { hd: 40000000, paid: 15000000 }), L('Vương Thị Hằng', U_CHU, 'THU', { xl: 'GIAM', hd: 20000000, giam: 12000000, pt: 12000000 }), L('Mạc Văn Toàn', U_CHU, 'CBH_MIEN', { xl: 'MIEN', hd: 15000000 }), L('Lại Văn Phúc', U_A, 'CD_HT', { hd: 35000000 }),
                L('Hà Thị Ngân', U_B, 'THU', { hd: 25000000, paid: 10000000 }), L('Tô Văn Khải', U_B, 'THU', { hd: 18000000 })]
        }
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

    // Màn Chi tiết: lượt trình Quyết định đình chỉ cả hồ sơ (Chờ duyệt / Bị từ chối) cho HT-2026-023, HT-2026-024
    // window: chạy sau khối khởi tạo của trang (chọn hồ sơ theo id)
    window.addEventListener('DOMContentLoaded', () => {
        const c = CASES.find(x => activeDossier && x.id === activeDossier.id && x.dcht);
        if (!c || activeDossier.dcht || typeof tlhdLevels !== 'function') return;
        const levels = tlhdLevels();
        activeDossier.dcht = {
            method: 'online', docSrc: 'gen', prevStatus: c.prev, so: '', ngay: '20/09/2026',
            canCu: typeof DCHT_CAN_CU_DEFAULT !== 'undefined' && Array.isArray(DCHT_CAN_CU_DEFAULT) ? DCHT_CAN_CU_DEFAULT.join('\n') : '',
            vbCanCu: 'Quyết định số 15/QĐ-UBND ngày 02/03/2026 của Ủy ban nhân dân quận Long Biên', noiNhan: '',
            fileName: 'Mau_39_BTNN_Quyet_dinh_dinh_chi_xem_xet_hoan_tra_' + activeDossier.code + '.docx', uploadMeta: null, attachments: [],
            levels, assignees: levels.map(l => (l.leaders && l.leaders[0] ? l.leaders[0].id : '')), coords: [], enableNhay: true,
            content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả.', level: 0, submittedAt: '20/09/2026 09:00',
            returned: c.dcht === 'rejected' ? { reason: 'Cần ghi rõ số, ngày văn bản hủy bỏ văn bản làm căn cứ yêu cầu bồi thường.', by: 'Lãnh đạo cấp 1', at: '21/09/2026 10:30' } : null
        };
        if (typeof renderStateLayout === 'function') renderStateLayout();
    });
})();
