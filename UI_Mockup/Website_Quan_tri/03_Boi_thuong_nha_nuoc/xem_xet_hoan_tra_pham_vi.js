/*
 * Xem xét trách nhiệm hoàn trả - Màn danh sách (Prompt 1):
 * - Giả lập người dùng theo đơn vị: Đơn vị tạo hội đồng / Đơn vị quản lý cán bộ A, B / Sở Tư pháp / Lãnh đạo.
 * - Trạng thái 02 tầng: trạng thái chi tiết (hồ sơ / phần đơn vị / cán bộ) và trạng thái chung (cấp ngoài) tổng hợp theo phạm vi dữ liệu.
 * - Nạp sau script chính của trang; ghi đè các hàm hiển thị danh sách (renderRefundTable, tab, bộ lọc, thao tác).
 */
(function () {
    // ===== Đơn vị giả lập =====
    const U_CHU = 'UBND Quận Long Biên';
    const U_A = 'UBND Phường Bồ Đề';
    const U_B = 'UBND Huyện An Dương';
    const U_STP = 'Sở Tư pháp Hà Nội';
    // Đơn vị thuộc phạm vi quản lý của Sở Tư pháp giả lập
    const STP_UNITS = [U_A, U_CHU];
    const HT_SCOPES = {
        don_vi_chu: { label: 'Đơn vị tạo hội đồng (' + U_CHU + ')', unit: U_CHU, legacy: 'chuyen_vien' },
        don_vi_a: { label: 'Đơn vị quản lý cán bộ A (' + U_A + ')', unit: U_A, legacy: 'chuyen_vien' },
        don_vi_b: { label: 'Đơn vị quản lý cán bộ B (' + U_B + ')', unit: U_B, legacy: 'chuyen_vien' },
        stp: { label: 'Sở Tư pháp (' + U_STP + ')', unit: U_STP, legacy: 'chuyen_vien' },
        lanh_dao: { label: 'Lãnh đạo phê duyệt', unit: '', legacy: 'lanh_dao' }
    };
    const SCOPE_KEY = 'htMockScope';
    function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
    function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* bỏ qua */ } }
    let htScope = HT_SCOPES[ssGet(SCOPE_KEY)] ? ssGet(SCOPE_KEY) : (ssGet('mockUserRole') === 'lanh_dao' ? 'lanh_dao' : 'don_vi_chu');

    // ===== Trạng thái chi tiết =====
    // Cán bộ (sau khi chốt ý kiến Hội đồng): mã -> [Trạng thái chi tiết, Loại trình, Nhóm tổng hợp]
    const CB_ST = {
        CBH_HT: ['Chờ ban hành QĐ hoàn trả', '', 'Chờ xử lý'],
        CD_HT: ['Chờ duyệt', 'QĐ hoàn trả', 'Đang xử lý'],
        BTC_HT: ['Bị từ chối', 'QĐ hoàn trả', 'Chờ xử lý'],
        CBH_MIEN: ['Chờ ban hành QĐ Miễn hoàn trả', '', 'Chờ xử lý'],
        CBH_GIAM: ['Chờ ban hành QĐ Giảm mức hoàn trả', '', 'Chờ xử lý'],
        CD_MIEN: ['Chờ duyệt', 'QĐ miễn hoàn trả', 'Đang xử lý'],
        CD_GIAM: ['Chờ duyệt', 'QĐ giảm mức hoàn trả', 'Đang xử lý'],
        BTC_MIEN: ['Bị từ chối', 'QĐ miễn hoàn trả', 'Chờ xử lý'],
        BTC_GIAM: ['Bị từ chối', 'QĐ giảm mức hoàn trả', 'Chờ xử lý'],
        CD_DC: ['Chờ duyệt', 'QĐ đình chỉ', 'Đang xử lý'],
        BTC_DC: ['Bị từ chối', 'QĐ đình chỉ', 'Chờ xử lý'],
        TL_DC: ['Chờ trả lại tiền', 'Đình chỉ hoàn trả', 'Thu hồi tiền hoàn trả'],
        THU: ['Thu hồi tiền hoàn trả', '', 'Thu hồi tiền hoàn trả'],
        MIEN: ['Miễn hoàn trả', '', 'Miễn hoàn trả'],
        DONE: ['Hoàn thành', '', 'Hoàn thành'],
        // Cấp cán bộ: Đình chỉ hoàn trả; trạng thái chung (roll-up): Đình chỉ xem xét hoàn trả
        DC: ['Đình chỉ hoàn trả', '', 'Đình chỉ xem xét hoàn trả']
    };
    // Hồ sơ (trước khi chốt ý kiến Hội đồng): mã trạng thái nội bộ của trang -> nhóm tổng hợp
    const HS_GROUP = {
        'Chờ thành lập hội đồng': 'Chờ xử lý',
        'Chờ duyệt QĐ thành lập': 'Đang xử lý', 'Chờ duyệt thành lập hội đồng': 'Đang xử lý', 'Chờ duyệt QĐ đình chỉ': 'Đang xử lý',
        'Bị từ chối thành lập HĐ': 'Chờ xử lý', 'Từ chối duyệt QĐ thành lập': 'Chờ xử lý', 'Bị từ chối QĐ đình chỉ': 'Chờ xử lý',
        'Họp hội đồng': 'Chờ xử lý',
        'Đình chỉ xem xét hoàn trả': 'Đình chỉ xem xét hoàn trả'
    };
    // Bước 1: trạng thái hồ sơ đang trình / bị từ chối QĐ thành lập Hội đồng -> [badge, Loại trình]
    const HS_TRINH = {
        'Chờ duyệt QĐ thành lập': ['Chờ duyệt', 'QĐ thành lập hội đồng'], 'Chờ duyệt thành lập hội đồng': ['Chờ duyệt', 'QĐ thành lập hội đồng'],
        'Bị từ chối thành lập HĐ': ['Bị từ chối', 'QĐ thành lập hội đồng'], 'Từ chối duyệt QĐ thành lập': ['Bị từ chối', 'QĐ thành lập hội đồng'],
        // Đình chỉ cả hồ sơ (trước khi tách phần đơn vị)
        'Chờ duyệt QĐ đình chỉ': ['Chờ duyệt', 'QĐ đình chỉ'], 'Bị từ chối QĐ đình chỉ': ['Bị từ chối', 'QĐ đình chỉ']
    };
    const CHUNG_ORDER = ['Chờ duyệt', 'Bị từ chối', 'Chờ xử lý', 'Đang xử lý', 'Thu hồi tiền hoàn trả', 'Miễn hoàn trả', 'Hoàn thành', 'Đình chỉ xem xét hoàn trả'];
    // Mỗi trạng thái chung một màu badge riêng
    const CHUNG_STYLE = { 'Chờ duyệt': 'wait', 'Bị từ chối': 'danger', 'Chờ xử lý': 'warning', 'Đang xử lý': 'pending', 'Thu hồi tiền hoàn trả': 'info', 'Miễn hoàn trả': 'mien', 'Hoàn thành': 'success', 'Đình chỉ xem xét hoàn trả': 'draft' };
    try {
        const st = document.createElement('style');
        st.textContent = '.ht-st-mien{background-color:#fdf2f8;color:#be185d;border:1px solid #fbcfe8;} .ht-st-wait{background-color:#ede9fe;color:#6d28d9;border:1px solid #ddd6fe;} .ht-trinh-sub{font-size:11px;color:#64748b;margin-top:3px;}';
        document.head.appendChild(st);
    } catch (e) { /* bỏ qua */ }

    // ===== Dữ liệu giả lập theo đơn vị (cán bộ sau khi chốt ý kiến Hội đồng) =====
    // xl: hình thức xử lý theo ý kiến Hội đồng (HT: hoàn trả, GIAM, MIEN); hd: số tiền theo ý kiến HĐ; giam: số tiền sau giảm; paid: đã thu
    // trinh: trình ký phát sinh khi đang Thu hồi tiền hoàn trả (Miễn/Giảm/Đình chỉ bổ sung); hoan: nhãn Hoãn hoàn trả; stp: Sở Tư pháp đã ghi nhận nộp tiền
    const C = (name, unit, st, o) => Object.assign({ name, unit, st, xl: 'HT', hd: 0, giam: 0, paid: 0 }, o || {});
    const HT_SPLIT = {
        'HT-2026-001': { owner: U_CHU, officers: [
            C('Nguyễn Văn Đạt', U_A, 'DONE', { hd: 36000000, paid: 36000000, stp: true }),
            C('Lê Văn Cường', U_A, 'THU', { hd: 20000000, paid: 8000000, hoan: true }),
            C('Hoàng Văn D', U_A, 'CBH_GIAM', { xl: 'GIAM', hd: 15000000, giam: 9000000 }),
            C('Trần Thị Bình', U_B, 'THU', { hd: 30000000, paid: 3000000, trinh: 'CD_GIAM' })] },
        'HT-2026-002': { owner: U_A, officers: [C('Hoàng Thị M', U_A, 'THU', { hd: 30000000, paid: 6000000 })] },
        'HT-2026-003': { owner: U_CHU, officers: [C('Phạm Văn Thiếu Sót', U_A, 'DONE', { hd: 10000000, paid: 10000000 })] },
        'HT-2026-004': { owner: U_CHU, officers: [C('Trần Văn Lỗi', U_B, 'MIEN', { xl: 'MIEN', hd: 5000000 })] },
        'HT-2026-009': { owner: U_CHU, officers: [C('Vũ Văn Tài', U_A, 'CBH_HT', { hd: 30000000 })] },
        'HT-2026-010': { owner: U_CHU, officers: [C('Ngô Quyền', U_B, 'BTC_HT', { hd: 18000000 })] },
        'HT-2026-017': { owner: U_CHU, officers: [
            C('Lưu Quốc Toàn', U_B, 'CD_MIEN', { xl: 'MIEN', hd: 45000000 })] },
        'HT-2026-018': { owner: U_CHU, officers: [C('Bùi Văn Nam', U_A, 'BTC_HT', { hd: 25000000 })] },
        'HT-2026-021': { owner: U_CHU, officers: [
            C('Phạm Quốc Huy', U_A, 'CD_HT', { hd: 55000000 }),
            C('Đặng Thị Lan', U_B, 'CBH_HT', { hd: 30000000 })] }
    };
    // Dữ liệu mẫu bổ sung phủ các trạng thái của ma trận (ht_du_lieu_mau.js)
    Object.keys(window.HT_EXTRA_SPLIT || {}).forEach(code => {
        const v = window.HT_EXTRA_SPLIT[code];
        if (!HT_SPLIT[code]) HT_SPLIT[code] = { owner: v.owner || U_CHU, officers: v.officers.map(o => C(o.name, o.unit, o.st, o)) };
    });
    // Trạng thái cán bộ theo đơn vị do màn chi tiết lưu (Bước 2 hoàn thành, Bước 3 trình ký / ban hành) - ghi đè dữ liệu mẫu
    try {
        const st = JSON.parse(localStorage.getItem('btnn_ht_units_v1') || '{}') || {};
        Object.keys(st).forEach(code => {
            const v = st[code]; if (!v || !Array.isArray(v.officers) || !v.officers.length) return;
            const old = HT_SPLIT[code] || {};
            HT_SPLIT[code] = { owner: v.owner || old.owner || U_CHU, officers: v.officers.map(o => C(o.name, o.unit, o.st, { xl: o.xl, hd: o.hd, giam: o.giam, paid: o.paid, hoan: o.hoan, pt: o.pt, trinh: o.trinh || '', refund: o.refund || 0, stp: !!o.stp })) };
        });
    } catch (e) { /* bỏ qua */ }
    // Hồ sơ chưa tách phần đơn vị: trạng thái hồ sơ do màn chi tiết lưu (thành lập Hội đồng, đình chỉ cả hồ sơ...)
    try {
        const hs = JSON.parse(localStorage.getItem('btnn_ht_status_v1') || '{}') || {};
        if (typeof dossiersList !== 'undefined') dossiersList.forEach(d => { const v = hs[d.code]; if (v && v.status && !HT_SPLIT[d.code]) d.status = v.status; });
    } catch (e) { /* bỏ qua */ }
    // Hồ sơ chưa chốt ý kiến Hội đồng: cán bộ (dự thảo ý kiến tại Bước 2) theo đơn vị
    const HT_DRAFT_UNIT = { 'HT-2026-005': U_A, 'HT-2026-007': U_B, 'HT-2026-008': U_A, 'HT-2026-011': U_B, 'HT-2026-013': U_B, 'HT-2026-016': U_A, 'HT-2026-023': U_A, 'HT-2026-024': U_B };
    // Rút gọn danh sách mẫu để chụp ảnh tài liệu: bỏ các hồ sơ trùng trạng thái (giữ đủ hồ sơ demo của ma trận chuyển trạng thái)
    const HT_HIDE = ['HT-2026-006', 'HT-2026-012', 'HT-2026-013', 'HT-2026-014', 'HT-2026-015', 'HT-2026-016', 'HT-2026-019', 'HT-2026-020',
        'HT-2026-002', 'HT-2026-009', 'HT-2026-017', 'HT-2026-018'];
    try { if (typeof dossiersList !== 'undefined') for (let i = dossiersList.length - 1; i >= 0; i--) if (HT_HIDE.includes(dossiersList[i].code)) dossiersList.splice(i, 1); } catch (e) { /* bỏ qua */ }

    function splitOf(d) { return HT_SPLIT[d.code] || null; }
    function ownerOf(d) { const s = splitOf(d); return s ? s.owner : U_CHU; }
    function isSplit(d) { return !!splitOf(d); }
    function cbStatus(o) { return CB_ST[o.trinh || o.st] || CB_ST.THU; }
    // Trình ký phát sinh khi cán bộ đang Thu hồi tiền hoàn trả: giữ nhóm Thu hồi; trình ký QĐ đình chỉ ở Bước 3: theo Loại trình
    function cbGroup(o) { return o.trinh ? (o.st === 'THU' ? 'Thu hồi tiền hoàn trả' : cbStatus(o)[2]) : cbStatus(o)[2]; }
    function issued(o) { return !['CBH_HT', 'CD_HT', 'BTC_HT'].includes(o.st); }
    function unitIssued(d, unit) { const l = (splitOf(d) || { officers: [] }).officers.filter(o => o.unit === unit); return l.length > 0 && l.every(issued); }
    function cur() { return HT_SCOPES[htScope]; }

    // ===== Phạm vi dữ liệu =====
    // Trả về { visible, full, officers } của hồ sơ đối với người dùng giả lập
    function scopeOf(d) {
        const s = splitOf(d);
        const all = s ? s.officers : [];
        if (htScope === 'lanh_dao') return { visible: true, full: true, officers: all };
        const unit = cur().unit;
        if (ownerOf(d) === unit) return { visible: true, full: true, officers: all };
        if (!s) return { visible: false, full: false, officers: [] };
        if (htScope === 'stp') {
            const list = all.filter(o => STP_UNITS.includes(o.unit) && unitIssued(d, o.unit));
            return { visible: list.length > 0, full: false, officers: list };
        }
        const list = all.filter(o => o.unit === unit);
        return { visible: list.length > 0, full: false, officers: list };
    }

    // ===== Trạng thái chung (roll-up) =====
    function chungOf(d, sc) {
        // Bước 1 đang trình / bị từ chối QĐ thành lập Hội đồng: badge Chờ duyệt / Bị từ chối kèm dòng Loại trình
        if (!isSplit(d)) return HS_TRINH[d.status] ? HS_TRINH[d.status][0] : (HS_GROUP[d.status] || 'Chờ xử lý');
        const l = sc.officers;
        if (!l.length) return 'Chờ xử lý';
        // Thứ tự: trạng thái đích (100% kết thúc) > Thu hồi tiền hoàn trả > Đang xử lý > Chờ xử lý
        const ended = o => ['MIEN', 'DONE', 'DC'].includes(o.st) && !o.trinh;
        if (l.every(ended)) {
            if (l.every(o => o.st === 'DC')) return 'Đình chỉ xem xét hoàn trả';
            if (l.every(o => o.st === 'MIEN')) return 'Miễn hoàn trả';
            return 'Hoàn thành';
        }
        if (l.some(o => o.st === 'THU')) return 'Thu hồi tiền hoàn trả';
        // Có đơn vị đang trình / đã ban hành QĐ hoàn trả, hoặc đang trình QĐ miễn / giảm / đình chỉ
        if (l.some(o => !['CBH_HT', 'BTC_HT', 'DC'].includes(o.st) || /^CD_/.test(o.trinh || ''))) return 'Đang xử lý';
        return 'Chờ xử lý';
    }
    function trinhLabel(d) { return !isSplit(d) && HS_TRINH[d.status] ? HS_TRINH[d.status][1] : ''; }
    // Dòng phụ: trạng thái chi tiết (kèm Loại trình); sau khi chốt ý kiến HĐ kèm số cán bộ
    function chiTietLines(d, sc) {
        if (!isSplit(d)) {
            if (d.status === 'Chờ thành lập hội đồng') return ['Chưa thành lập Hội đồng'];
            const v = htStView(d.status);
            return [v.loai ? v.name + ' (' + v.loai + ')' : v.name];
        }
        const m = new Map();
        sc.officers.forEach(o => {
            const v = cbStatus(o);
            const b = CB_ST[o.st] || CB_ST.THU;
            const k = (o.trinh ? (b[1] ? b[0] + ' (' + b[1] + ')' : b[0]) + ' - ' : '') + (v[1] ? v[0] + ' (' + v[1] + ')' : v[0]);
            m.set(k, (m.get(k) || 0) + 1);
        });
        return Array.from(m.entries()).map(([k, n]) => k + ': ' + n + ' cán bộ');
    }
    function chungBadge(name) { return '<span class="badge ht-st ht-st-' + (CHUNG_STYLE[name] || 'draft') + '">' + name + '</span>'; }

    // ===== Số liệu theo phạm vi =====
    // Số phải thu: theo QĐ hoàn trả; cán bộ Giảm mức đã ban hành QĐ giảm (đang thu / hoàn thành): số tiền sau giảm
    // pt: số tiền phải hoàn trả hiện tại do màn chi tiết lưu (sau QĐ giảm / giảm bổ sung)
    // Miễn / Đình chỉ: số phải thu = số đã thu được giữ lại (0 khi chưa thu hoặc đã trả lại)
    // Sau khi ban hành QĐ hoàn trả: số phải thu sau miễn / giảm theo ý kiến Hội đồng (Giảm: số tiền sau giảm; Miễn: số đã thu)
    function phaiThu(o) { if (['MIEN', 'DC'].includes(o.st)) return o.paid || 0; if (!issued(o)) return 0; if (o.pt != null) return o.pt; if (o.xl === 'MIEN') return o.paid || 0; return o.xl === 'GIAM' ? (o.giam || o.hd) : o.hd; }
    function money(sc) {
        const off = sc.officers.filter(issued);
        const tong = off.reduce((s, o) => s + phaiThu(o), 0);
        const paid = off.reduce((s, o) => s + (o.paid || 0), 0);
        const hd = sc.officers.reduce((s, o) => s + (o.hd || 0), 0);
        const ended = sc.officers.filter(o => ['DONE', 'MIEN', 'DC'].includes(o.st) && !o.trinh).length;
        return { tong, paid, hd, conLai: Math.max(0, tong - paid), ended, n: sc.officers.length, anyIssued: off.length > 0 };
    }

    // ===== Phần việc chờ người dùng thao tác / đã xử lý =====
    function pendingOf(d, sc) {
        if (htScope === 'lanh_dao') {
            if (!isSplit(d)) return HT_APPROVAL_STATES.includes(d.status);
            return sc.officers.some(o => cbStatus(o)[0] === 'Chờ duyệt');
        }
        if (!isSplit(d)) return sc.full && ['Chờ thành lập hội đồng', 'Bị từ chối thành lập HĐ', 'Từ chối duyệt QĐ thành lập', 'Bị từ chối QĐ đình chỉ', 'Họp hội đồng'].includes(d.status);
        if (htScope === 'stp') return sc.officers.some(o => o.st === 'THU');
        // Sau khi chốt ý kiến HĐ: chỉ cán bộ thuộc đơn vị của người dùng (đơn vị tạo hội đồng không thao tác phần của đơn vị khác)
        return sc.officers.some(o => o.unit === cur().unit && (['CBH_HT', 'BTC_HT', 'CBH_MIEN', 'CBH_GIAM', 'BTC_MIEN', 'BTC_GIAM', 'THU'].includes(o.st) || /^(BTC|TL)_/.test(o.trinh || '')));
    }
    function gatesOf(d, sc) {
        const list = [];
        if (htScope === 'lanh_dao') {
            htGates(d, 'lanh_dao').forEach(g => list.push(g));
            if (isSplit(d)) {
                if (sc.officers.some(issued)) list.push({ gate: 'Ký duyệt QĐ hoàn trả', result: 'Phê duyệt' });
                if (sc.officers.some(o => o.st === 'BTC_HT')) list.push({ gate: 'Ký duyệt QĐ hoàn trả', result: 'Từ chối' });
                if (sc.officers.some(o => o.st === 'MIEN')) list.push({ gate: 'Ký duyệt QĐ miễn hoàn trả', result: 'Phê duyệt' });
            }
            return list.filter((g, i) => list.findIndex(x => x.gate === g.gate && x.result === g.result) === i);
        }
        if (!isSplit(d)) {
            if (sc.full && d.status !== 'Chờ thành lập hội đồng') list.push({ gate: 'Trình ký QĐ thành lập Hội đồng' });
            if (sc.full && d.status === 'Đình chỉ xem xét hoàn trả') list.push({ gate: 'Trình ký QĐ đình chỉ' });
            return list;
        }
        if (sc.full) { list.push({ gate: 'Trình ký QĐ thành lập Hội đồng' }); list.push({ gate: 'Chốt ý kiến Hội đồng' }); }
        if (htScope === 'stp') { if (sc.officers.some(o => o.stp)) list.push({ gate: 'Ghi nhận nộp tiền' }); return list; }
        const mine = sc.officers.filter(o => o.unit === cur().unit);
        if (!mine.length) return list;
        if (mine.some(o => o.st !== 'CBH_HT')) list.push({ gate: 'Trình ký QĐ hoàn trả' });
        if (mine.some(o => o.st === 'MIEN' || o.st === 'CD_MIEN')) list.push({ gate: 'Trình ký QĐ miễn hoàn trả' });
        if (mine.some(o => o.xl === 'GIAM' && o.st !== 'CBH_GIAM')) list.push({ gate: 'Trình ký QĐ giảm mức hoàn trả' });
        if (mine.some(o => (o.paid || 0) > 0)) list.push({ gate: 'Ghi nhận nộp tiền' });
        if (mine.some(o => o.st === 'DC')) list.push({ gate: 'Trình ký QĐ đình chỉ' });
        return list;
    }

    // ===== Ghi đè các hàm của trang =====
    window.htInTab = function (tab, d) {
        const sc = scopeOf(d);
        if (!sc.visible) return false;
        const p = pendingOf(d, sc);
        return tab === 'pending' ? p : (!p && gatesOf(d, sc).length > 0);
    };
    window.htGatesHtml = function (d) {
        const g = gatesOf(d, scopeOf(d));
        if (!g.length) return '';
        return '<div style="margin-top:6px; text-align:left; font-size:11.5px; color:#475569; white-space:normal; line-height:1.5;">' + g.map(x => '<div><i class="fa-solid fa-check" style="color:#16a34a;"></i> ' + x.gate + (x.result ? ' (' + x.result + ')' : '') + '</div>').join('') + '</div>';
    };
    window.updateKpiCountersRefund = function () { /* bỏ Lọc nhanh */ };
    window.filterByKpiRefund = function () { /* bỏ Lọc nhanh */ };

    window.switchRefundTab = function (tab) {
        htTab = tab === 'done' ? 'done' : 'pending';
        document.querySelectorAll('.ht-tabs-card .ht-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === htTab));
        const sel = document.getElementById('filterStatusRefund');
        if (sel) {
            const names = new Set(dossiersList.filter(d => htInTab(htTab, d)).map(d => chungOf(d, scopeOf(d))));
            const curVal = sel.value;
            const list = CHUNG_ORDER.filter(n => names.has(n));
            sel.innerHTML = '<option value="">Tất cả</option>' + list.map(n => '<option value="' + n + '">' + n + '</option>').join('');
            sel.value = list.includes(curVal) ? curVal : '';
        }
        const btnCreate = document.getElementById('btnCreateRefundDossier');
        if (btnCreate) btnCreate.style.display = (htTab === 'pending' && htScope === 'don_vi_chu') ? 'inline-flex' : 'none';
        currentPageRefund = 1;
        renderRefundTable();
    };

    function fillAgencyFilter() {
        const sel = document.getElementById('filterAgency');
        if (!sel) return;
        const units = new Set();
        dossiersList.forEach(d => { const sc = scopeOf(d); if (sc.visible) sc.officers.forEach(o => units.add(o.unit)); });
        const curVal = sel.value;
        sel.innerHTML = '<option value="">Tất cả đơn vị</option>' + Array.from(units).sort((a, b) => a.localeCompare(b, 'vi')).map(u => '<option value="' + u + '">' + u + '</option>').join('');
        sel.value = units.has(curVal) ? curVal : '';
    }

    window.updateUIForRole = function () {
        const sel = document.getElementById('mockUserRole');
        if (sel) {
            if (!sel.dataset.htScope) {
                sel.innerHTML = Object.keys(HT_SCOPES).map(k => '<option value="' + k + '">' + HT_SCOPES[k].label + '</option>').join('');
                sel.dataset.htScope = '1';
            }
            sel.value = htScope;
        }
        currentMockRole = cur().legacy;
        ssSet('mockUserRole', currentMockRole);
        const th = document.getElementById('thActionsRefund');
        if (th) th.innerText = 'Thao tác';
        fillAgencyFilter();
    };
    window.changeMockRole = function (v) {
        htScope = HT_SCOPES[v] ? v : 'don_vi_chu';
        ssSet(SCOPE_KEY, htScope);
        ['filterDossierCode', 'filterClaimCode', 'filterGqbtCode', 'filterOfficerName', 'filterAgency', 'filterStatusRefund'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        updateUIForRole();
        switchRefundTab('pending');
        showToast('Đang giả lập: ' + cur().label, 'info');
    };

    // Bước mở sẵn (Stepper 4 bước): bước nhỏ nhất của phần việc chưa kết thúc trong phạm vi
    function focusStepOf(d, sc) {
        if (!isSplit(d)) {
            if (['Họp hội đồng', 'Đình chỉ xem xét hoàn trả'].includes(d.status) || d.status === 'Chờ duyệt QĐ đình chỉ' || d.status === 'Bị từ chối QĐ đình chỉ') return 2;
            return 1;
        }
        const open = sc.officers.filter(o => !['DONE', 'MIEN', 'DC'].includes(o.st) || o.trinh);
        if (!open.length) return 4;
        return open.some(o => o.st !== 'THU') ? 3 : 4;
    }
    function detailUrl(d, mode, step) {
        return 'chi_tiet_ho_so_hoan_tra.html?mode=' + mode + '&id=' + encodeURIComponent(d.id) + '&focusStep=' + step + '&role=' + cur().legacy + '&scope=' + htScope;
    }
    window.htOpenDetail = function (ev, id, mode) {
        if (ev) ev.stopPropagation();
        const d = dossiersList.find(x => x.id === id);
        if (d) window.location.href = detailUrl(d, mode || 'view', focusStepOf(d, scopeOf(d)));
    };

    // Cột Thao tác: vị trí cố định theo người dùng; thao tác không được phép hiển thị khóa mờ
    window.getActionButtonsHtml = function (d) {
        const sc = scopeOf(d);
        const off = 'opacity: 0.35; pointer-events: none; cursor: not-allowed;';
        const wrap = h => '<div style="display:inline-flex; align-items:center; gap:6px; justify-content:center;">' + h + '</div>';
        if (htScope === 'lanh_dao') {
            const base = !isSplit(d) && HT_APPROVAL_STATES.includes(d.status);
            const cbCho = isSplit(d) && sc.officers.some(o => cbStatus(o)[0] === 'Chờ duyệt');
            const baseHt = isSplit(d) && HT_APPROVAL_STATES.includes(d.status) && sc.officers.some(o => o.st === 'CD_HT');
            const on = base || cbCho;
            const click = (base || baseHt) ? m => 'htkdOpen(event, \'' + d.id + '\', \'' + m + '\')' : () => 'htOpenDetail(event, \'' + d.id + '\', \'view\')';
            return wrap(
                (on ? '<button class="icon-btn accept sign" data-admin-icon-normalized="1" title="Ký duyệt" onclick="' + click('approve') + '"><i class="fa-solid fa-file-signature"></i></button>'
                    : '<button class="icon-btn accept sign is-disabled" data-admin-icon-normalized="1" title="Ký duyệt" style="' + off + '" disabled><i class="fa-solid fa-file-signature"></i></button>')
                + (on ? '<button class="icon-btn delete reject" data-admin-icon-normalized="1" title="Từ chối" onclick="' + click('reject') + '"><i class="fa-solid fa-ban"></i></button>'
                    : '<button class="icon-btn delete reject is-disabled" data-admin-icon-normalized="1" title="Từ chối" style="' + off + '" disabled><i class="fa-solid fa-ban"></i></button>'));
        }
        const canUpdate = pendingOf(d, sc);
        const canDelete = !isSplit(d) && sc.full && d.status === 'Chờ thành lập hội đồng';
        const up = canUpdate
            ? '<button class="icon-btn edit" title="Cập nhật" onclick="htOpenDetail(event, \'' + d.id + '\', \'edit\')" style="color:#2563eb; border-color:#2563eb;"><i class="fa-solid fa-pen-to-square"></i></button>'
            : '<button class="icon-btn" title="Cập nhật" style="' + off + '"><i class="fa-solid fa-pen-to-square"></i></button>';
        // Xóa hồ sơ nháp: chỉ Đơn vị tạo Hội đồng; Đơn vị quản lý cán bộ, Sở Tư pháp không có nút Xóa
        if (htScope !== 'don_vi_chu') return wrap(up);
        const del = canDelete
            ? '<button class="icon-btn delete" title="Xóa" onclick="deleteRefundDossier(event, \'' + d.id + '\')" style="color:var(--danger-color); border-color:var(--danger-color);"><i class="fa-solid fa-trash"></i></button>'
            : '<button class="icon-btn delete" title="Xóa" style="' + off + '"><i class="fa-solid fa-trash"></i></button>';
        return wrap(up + del);
    };

    // Liên kết Mã hồ sơ GQBT: chỉ khi đơn vị người dùng là cơ quan giải quyết bồi thường của hồ sơ GQBT (giả lập: đơn vị tạo hội đồng)
    function gqbtCell(d) {
        const link = htScope === 'lanh_dao' || cur().unit === ownerOf(d);
        if (!link) return '<span style="font-weight:600;">' + (d.claimCode || '-') + '</span>';
        return '<a href="quan_ly_boi_thuong.html?id=' + d.claimCode + '&from=hoan_tra&returnUrl=' + encodeURIComponent('xem_xet_trach_nhiem_hoan_tra.html') + '" onclick="event.stopPropagation(); openLinkedClaimDetail(\'' + d.claimCode + '\'); return false;" style="color: var(--secondary-color); text-decoration: underline; font-weight: 700;" title="Mở chi tiết hồ sơ Giải quyết YCBT">' + (d.claimCode || '-') + '</a>';
    }
    function officersOfRow(d, sc) {
        if (isSplit(d)) return sc.officers;
        // Trước khi tách đơn vị: cán bộ dự kiến (theo dự thảo ý kiến Hội đồng) với đơn vị tạo Hội đồng
        if (sc.full && d.status !== 'Chờ thành lập hội đồng') return (d.refundOfficers || []).filter(o => o && o.name).map(o => ({ name: o.name, unit: HT_DRAFT_UNIT[d.code] || o.agency, st: '' }));
        return [];
    }
    function officerCell(list) {
        if (!list.length) return '<span class="text-muted" style="font-style:italic;">—</span>';
        const tip = list.map((o, i) => (i + 1) + '. ' + o.name + ' - ' + o.unit + (o.st ? ' - ' + cbStatus(o)[0] : '') + (o.hoan ? ' (Hoãn hoàn trả)' : '')).join('\n').replace(/"/g, '&quot;');
        const more = list.length > 1 ? '<span class="badge" style="background:#e2e8f0; color:#334155; font-size:10.5px; font-weight:600; padding:1px 5px; border-radius:10px; flex-shrink:0;" title="' + tip + '">+' + (list.length - 1) + ' khác</span>' : '';
        return '<div style="display:flex; align-items:center; gap:5px;" title="' + tip + '"><span style="font-weight:600; color:#0f172a; font-size:12.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px;">' + list[0].name + '</span>' + more + '</div>';
    }
    function unitCell(list) {
        const u = Array.from(new Set(list.map(o => o.unit).filter(Boolean)));
        if (!u.length) return '<span class="text-muted">—</span>';
        // Nhiều đơn vị: tên đơn vị đầu tiên + badge "+X đơn vị khác" (tooltip danh sách đơn vị)
        const tip = u.map((x, i) => (i + 1) + '. ' + x).join('\n').replace(/"/g, '&quot;');
        const more = u.length > 1 ? ' <span class="badge" style="background:#e2e8f0; color:#334155; font-size:10.5px; font-weight:600; padding:1px 5px; border-radius:10px; white-space:nowrap;" title="' + tip + '">+' + (u.length - 1) + ' đơn vị khác</span>' : '';
        return '<span title="' + tip + '">' + u[0] + '</span>' + more;
    }
    const fmt = n => (n || 0).toLocaleString('vi-VN');

    window.renderRefundTable = function () {
        const tbody = document.getElementById('refundTableBody');
        if (!tbody) return;
        // Lập hồ sơ hoàn trả mới: chỉ Đơn vị tạo Hội đồng, tab Chờ xử lý
        const btnNew = document.getElementById('btnCreateRefundDossier');
        if (btnNew) btnNew.style.setProperty('display', htTab === 'pending' && htScope === 'don_vi_chu' ? 'inline-flex' : 'none', 'important');
        const val = id => ((document.getElementById(id) || {}).value || '').trim().toLowerCase();
        const fCode = val('filterDossierCode'), fVv = val('filterClaimCode'), fGq = val('filterGqbtCode'), fCb = val('filterOfficerName');
        const fUnit = (document.getElementById('filterAgency') || {}).value || '';
        const fSt = (document.getElementById('filterStatusRefund') || {}).value || '';
        updateRefundTabCounts();
        const rows = dossiersList.filter(d => htInTab(htTab, d)).map(d => {
            const sc = scopeOf(d);
            return { d, sc, chung: chungOf(d, sc), m: money(sc), off: officersOfRow(d, sc) };
        }).filter(r => {
            if (fCode && !String(r.d.code || '').toLowerCase().includes(fCode)) return false;
            if (fVv && !String(dossierVuViec(r.d) || '').toLowerCase().includes(fVv)) return false;
            if (fGq && !String(r.d.claimCode || '').toLowerCase().includes(fGq)) return false;
            if (fCb && !r.off.some(o => o.name.toLowerCase().includes(fCb))) return false;
            if (fUnit && !r.off.some(o => o.unit === fUnit)) return false;
            if (fSt && r.chung !== fSt) return false;
            return true;
        });
        const key = {
            stt: r => r.d.code, code: r => r.d.code, officer: r => (r.off[0] || {}).name || '', agency: r => (r.off[0] || {}).unit || '',
            maVuViec: r => dossierVuViec(r.d) || '', claimCode: r => r.d.claimCode || '', refundTotal: r => r.m.tong,
            progress: r => r.m.tong ? r.m.paid / r.m.tong : 0, status: r => CHUNG_ORDER.indexOf(r.chung)
        }[currentSortColumn] || (r => r.d.code);
        rows.sort((a, b) => { const x = key(a), y = key(b); const c = typeof x === 'string' ? x.localeCompare(y, 'vi') : (x < y ? -1 : x > y ? 1 : 0); return currentSortDirection === 'asc' ? c : -c; });
        currentFilteredDossiers = rows;
        updateSortIcons();
        const total = rows.length;
        document.getElementById('totalCountRefund').innerText = total;
        const pages = Math.ceil(total / pageSizeRefund) || 1;
        if (currentPageRefund > pages) currentPageRefund = pages;
        const start = (currentPageRefund - 1) * pageSizeRefund, end = Math.min(start + pageSizeRefund, total);
        document.getElementById('currentRangeRefund').innerText = total ? (start + 1) + '-' + end : '0-0';
        let ph = '<span class="page-item ' + (currentPageRefund === 1 ? 'disabled' : '') + '" onclick="setPageRefund(1)" title="Trang đầu">&verbar;&lt;&lt;</span><span class="page-item ' + (currentPageRefund === 1 ? 'disabled' : '') + '" onclick="setPageRefund(' + (currentPageRefund - 1) + ')" title="Trang trước">&lt;</span>';
        for (let i = 1; i <= pages; i++) ph += '<span class="page-item ' + (currentPageRefund === i ? 'active' : '') + '" onclick="setPageRefund(' + i + ')">' + i + '</span>';
        ph += '<span class="page-item ' + (currentPageRefund === pages ? 'disabled' : '') + '" onclick="setPageRefund(' + (currentPageRefund + 1) + ')" title="Trang sau">&gt;</span><span class="page-item ' + (currentPageRefund === pages ? 'disabled' : '') + '" onclick="setPageRefund(' + pages + ')" title="Trang cuối">&gt;&gt;&verbar;</span>';
        document.getElementById('paginationPagesRefund').innerHTML = ph;
        tbody.innerHTML = '';
        if (!total) { tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; color:var(--text-muted); font-style:italic; padding: 30px;">Không tìm thấy hồ sơ xem xét trách nhiệm hoàn trả nào phù hợp.</td></tr>'; return; }
        rows.slice(start, end).forEach((r, i) => {
            const d = r.d, m = r.m;
            const tr = document.createElement('tr');
            tr.style.cursor = 'pointer';
            tr.onclick = e => { if (!e.target.closest('.icon-btn') && !e.target.closest('a') && e.target.tagName !== 'BUTTON') window.location.href = detailUrl(d, 'view', focusStepOf(d, r.sc)); };
            const pct = m.tong ? Math.min(100, Math.round(m.paid / m.tong * 100)) : 0;
            const tip = ('Số tiền theo ý kiến Hội đồng: ' + fmt(m.hd) + ' đ\nTiền hoàn trả (sau giảm, trừ miễn, đình chỉ): ' + fmt(m.tong) + ' đ\nĐã thu: ' + fmt(m.paid) + ' đ\nCòn phải thu: ' + fmt(m.conLai) + ' đ');
            const tien = m.anyIssued ? '<span title="' + tip + '">' + fmt(m.tong) + '</span>' : '--';
            const prog = m.anyIssued && !m.tong
                ? '<div style="font-size:11px; color:#64748b;">' + m.ended + '/' + m.n + ' cán bộ đã kết thúc</div>'
                : m.anyIssued
                ? '<div style="font-size:11px; display:flex; justify-content:space-between; font-weight:600; margin-bottom:2px;" title="' + tip + '"><span>' + fmt(m.paid) + 'đ</span><span style="color:#16a34a; font-weight:700;">' + pct + '%</span></div><div class="progress-bar-container" style="height:5px; margin-bottom:2px; background-color:#e2e8f0; border-radius:3px;"><div class="progress-bar-fill" style="width:' + pct + '%; height:100%; background-color:#22c55e; border-radius:3px;"></div></div><div style="font-size:11px; color:#64748b;">' + m.ended + '/' + m.n + ' cán bộ đã kết thúc</div>'
                : '<span style="color:var(--text-muted); font-style:italic; font-size:11px;">Chưa ban hành QĐ</span>';
            // Cột Trạng thái: chỉ 01 badge trạng thái chung (trạng thái chi tiết xem tại màn chi tiết)
            // Ngoại lệ Bước 1: dòng Loại trình dưới badge Chờ duyệt / Bị từ chối
            const tl = trinhLabel(d);
            const sub = tl ? '<div class="ht-trinh-sub">' + tl + '</div>' : '';
            tr.innerHTML = '<td style="text-align:center;">' + (start + i + 1) + '</td>'
                + '<td style="text-align:center; font-weight:700; color:var(--primary-color);">' + d.code + '</td>'
                + '<td>' + officerCell(r.off) + '</td>'
                + '<td style="max-width:150px; white-space:normal;">' + unitCell(r.off) + '</td>'
                + '<td style="text-align:center; font-weight:600;" title="' + claimLabel(d.claimCode) + '">' + (dossierVuViec(d) || '-') + '</td>'
                + '<td style="text-align:center;">' + gqbtCell(d) + '</td>'
                + '<td style="text-align:right; font-weight:600; color:var(--danger-color);">' + tien + '</td>'
                + '<td>' + prog + '</td>'
                + '<td style="text-align:center; vertical-align:middle;">' + chungBadge(r.chung) + sub + '</td>'
                + '<td style="text-align:center; vertical-align:middle;">' + getActionButtonsHtml(d) + '</td>';
            tbody.appendChild(tr);
        });
    };
    window.applyRefundFilters = function () { currentPageRefund = 1; renderRefundTable(); };
    window.resetRefundFilters = function () {
        ['filterDossierCode', 'filterClaimCode', 'filterGqbtCode', 'filterOfficerName', 'filterAgency', 'filterStatusRefund'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        const f = document.getElementById('filterFromDate'), t = document.getElementById('filterToDate');
        if (f) f.value = '01/09/2026';
        if (t) t.value = '11/09/2026';
        currentPageRefund = 1;
        renderRefundTable();
    };

    // Ký duyệt / Từ chối QĐ hoàn trả của phần đơn vị (màn Ký duyệt dùng chung): cập nhật trạng thái chi tiết cán bộ đang Chờ duyệt (QĐ hoàn trả)
    const baseSubmit = window.htkdSubmit;
    if (typeof baseSubmit === 'function') {
        window.htkdSubmit = function () {
            const ctx = htkdCtx;
            const d = ctx && ctx.d, approve = ctx && ctx.mode === 'approve';
            const loai = d ? htkdLoai(d) : '';
            const before = d ? d.status : '';
            baseSubmit();
            const s = d && splitOf(d);
            if (s && loai === 'QĐ hoàn trả' && d.status !== before) {
                s.officers.filter(o => o.st === 'CD_HT').forEach(o => { o.st = approve ? (o.xl === 'MIEN' ? 'CBH_MIEN' : o.xl === 'GIAM' ? 'CBH_GIAM' : 'THU') : 'BTC_HT'; });
                renderRefundTable();
            }
        };
    }
    window.htScopeApi = { scopeOf, chungOf, chiTietLines, money, pendingOf, HT_SCOPES, setScope: v => { htScope = v; } };

    // Nhận phạm vi từ tham số trang (?scope=...)
    try {
        const q = new URLSearchParams(location.search);
        const p = q.get('scope'), r = q.get('role');
        if (HT_SCOPES[p]) htScope = p;
        else if (r === 'lanh_dao') htScope = 'lanh_dao';
        else if (r && htScope === 'lanh_dao') htScope = 'don_vi_chu';
        ssSet(SCOPE_KEY, htScope);
    } catch (e) { /* bỏ qua */ }
})();
