/*
 * Chi tiết hồ sơ hoàn trả - Prompt 3: Bước 3 Ban hành QĐ, trình ký 02 tầng tại đơn vị quản lý cán bộ.
 * - Tầng 1: mỗi phần đơn vị trình ký / ban hành 01 Quyết định hoàn trả (Mẫu 36/BTNN) chung cho các cán bộ của đơn vị.
 * - Tầng 2: sau khi QĐ hoàn trả ban hành, tự định tuyến từng cán bộ:
 *   + Hoàn trả -> Thu hồi tiền hoàn trả; Miễn -> Chờ ban hành QĐ Miễn hoàn trả (Mẫu 38/BTNN); Giảm -> Chờ ban hành QĐ Giảm mức hoàn trả (Mẫu 37/BTNN).
 * - Popup trình ký theo chuẩn: Hình thức ký (Ký số / Ký ngoài), Stepper 02 bước, Sinh văn bản theo mẫu | Tải lên từ máy, Tài liệu kèm theo, chọn Lãnh đạo theo luồng (giả lập 02 cấp).
 * - Ký duyệt / Từ chối: dùng màn Ký duyệt / Từ chối chung của trang (leaderSignApprovalModal / rejectReasonModal).
 * - Lưu trạng thái cán bộ theo đơn vị vào localStorage 'btnn_ht_units_v1' để màn danh sách tổng hợp trạng thái chung.
 * Nạp sau chi_tiet_ho_so_hoan_tra_ykhd.js.
 */
(function () {
    const STORE_KEY = 'btnn_ht_units_v1';
    const CT = {
        CBH_HT: ['Chờ ban hành QĐ hoàn trả', ''], CD_HT: ['Chờ duyệt', 'QĐ hoàn trả'], BTC_HT: ['Bị từ chối', 'QĐ hoàn trả'],
        CBH_MIEN: ['Chờ ban hành QĐ Miễn hoàn trả', ''], CD_MIEN: ['Chờ duyệt', 'QĐ miễn hoàn trả'], BTC_MIEN: ['Bị từ chối', 'QĐ miễn hoàn trả'],
        CBH_GIAM: ['Chờ ban hành QĐ Giảm mức hoàn trả', ''], CD_GIAM: ['Chờ duyệt', 'QĐ giảm mức hoàn trả'], BTC_GIAM: ['Bị từ chối', 'QĐ giảm mức hoàn trả'],
        THU: ['Thu hồi tiền hoàn trả', ''], MIEN: ['Miễn hoàn trả', ''], DONE: ['Hoàn thành', ''], DC: ['Đình chỉ hoàn trả', ''],
        // Trình ký QĐ đình chỉ cấp cán bộ (o.trinh) và chờ trả lại tiền sau khi ban hành QĐ đình chỉ (phương án hoàn trả lại số tiền đã thu)
        CD_DC: ['Chờ duyệt', 'QĐ đình chỉ'], BTC_DC: ['Bị từ chối', 'QĐ đình chỉ'], TL_DC: ['Chờ trả lại tiền', 'Đình chỉ hoàn trả']
    };
    // Trạng thái chung (roll-up) - cùng quy tắc với màn danh sách
    const GROUP = {
        CBH_HT: 'Chờ xử lý', BTC_HT: 'Chờ xử lý', CBH_MIEN: 'Chờ xử lý', BTC_MIEN: 'Chờ xử lý', CBH_GIAM: 'Chờ xử lý', BTC_GIAM: 'Chờ xử lý', BTC_DC: 'Chờ xử lý',
        CD_HT: 'Đang xử lý', CD_MIEN: 'Đang xử lý', CD_GIAM: 'Đang xử lý', CD_DC: 'Đang xử lý', TL_DC: 'Thu hồi tiền hoàn trả',
        THU: 'Thu hồi tiền hoàn trả', MIEN: 'Miễn hoàn trả', DONE: 'Hoàn thành', DC: 'Đình chỉ xem xét hoàn trả'
    };
    const HS_GROUP = {
        'Chờ thành lập hội đồng': 'Chờ xử lý', 'Bị từ chối thành lập HĐ': 'Chờ xử lý', 'Từ chối duyệt QĐ thành lập': 'Chờ xử lý', 'Bị từ chối QĐ đình chỉ': 'Chờ xử lý', 'Họp hội đồng': 'Chờ xử lý',
        'Chờ duyệt QĐ thành lập': 'Đang xử lý', 'Chờ duyệt thành lập hội đồng': 'Đang xử lý', 'Chờ duyệt QĐ đình chỉ': 'Đang xử lý',
        'Đình chỉ xem xét hoàn trả': 'Đình chỉ xem xét hoàn trả'
    };
    const STEP3 = ['CBH_HT', 'CD_HT', 'BTC_HT', 'CBH_MIEN', 'CD_MIEN', 'BTC_MIEN', 'CBH_GIAM', 'CD_GIAM', 'BTC_GIAM'];
    const ENDED = ['MIEN', 'DONE', 'DC'];
    // Dữ liệu mẫu (đồng bộ màn danh sách)
    const SEED = {
        'Nguyễn Văn Đạt': ['DONE', 'HT'], 'Lê Văn Cường': ['THU', 'HT'], 'Hoàng Văn D': ['CBH_GIAM', 'GIAM', 9000000], 'Trần Thị Bình': ['THU', 'HT'],
        'Hoàng Thị M': ['THU', 'HT'], 'Phạm Văn Thiếu Sót': ['DONE', 'HT'], 'Trần Văn Lỗi': ['MIEN', 'MIEN'], 'Vũ Văn Tài': ['CBH_HT', 'HT'],
        'Ngô Quyền': ['BTC_HT', 'HT'], 'Nguyễn Văn Chết': ['DC', 'HT'], 'Lưu Quốc Toàn': ['CD_MIEN', 'MIEN'], 'Bùi Văn Nam': ['BTC_HT', 'HT'],
        'Phạm Quốc Huy': ['CD_HT', 'HT'], 'Đặng Thị Lan': ['CBH_HT', 'HT']
    };
    // Dữ liệu mẫu bổ sung (ht_du_lieu_mau.js): [ct, xl, giam, { paid, trinh, refund, total, qd2: 'CD'|'BTC', dc: { key, st, pa } }]
    Object.assign(SEED, window.HT_EXTRA_SEED || {});
    const KIND = {
        HT: { mau: '36', label: 'QĐ hoàn trả', doc: 'Quyết định hoàn trả', title: 'QUYẾT ĐỊNH VỀ VIỆC HOÀN TRẢ', file: 'Mau_36_BTNN_Quyet_dinh_hoan_tra', content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định hoàn trả.' },
        MIEN: { mau: '38', label: 'QĐ miễn hoàn trả', doc: 'Quyết định miễn hoàn trả', title: 'QUYẾT ĐỊNH VỀ VIỆC MIỄN HOÀN TRẢ', file: 'Mau_38_BTNN_Quyet_dinh_mien_hoan_tra', content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định miễn hoàn trả.' },
        GIAM: { mau: '37', label: 'QĐ giảm mức hoàn trả', doc: 'Quyết định giảm mức hoàn trả', title: 'QUYẾT ĐỊNH VỀ VIỆC GIẢM MỨC HOÀN TRẢ', file: 'Mau_37_BTNN_Quyet_dinh_giam_muc_hoan_tra', content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định giảm mức hoàn trả.' }
    };
    // Miễn / Giảm bổ sung khi cán bộ đang Thu hồi tiền hoàn trả (Bước 4): cùng mẫu, cùng Loại trình
    KIND.SMIEN = Object.assign({}, KIND.MIEN, { base: 'MIEN' });
    KIND.SGIAM = Object.assign({}, KIND.GIAM, { base: 'GIAM' });
    // Đình chỉ cấp cán bộ (Bước 3, Bước 4): 01 QĐ chung cho các cán bộ được chọn của đơn vị, Mẫu 39/BTNN
    KIND.DC = { mau: '39', label: 'QĐ đình chỉ', doc: 'Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả', title: 'QUYẾT ĐỊNH ĐÌNH CHỈ VIỆC XEM XÉT TRÁCH NHIỆM HOÀN TRẢ', file: 'Mau_39_BTNN_Quyet_dinh_dinh_chi_xem_xet_hoan_tra', content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả.' };
    const baseKind = k => (KIND[k] && KIND[k].base) || k;
    const REQ = 'Đây là trường bắt buộc';
    const el = id => document.getElementById(id);
    const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const money = n => (Number(n) || 0).toLocaleString('vi-VN');
    const pad = n => String(n).padStart(2, '0');
    const today = () => { const d = new Date(); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); };
    const nowShort = () => { const d = new Date(); return today() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); };
    const api = () => window.ht2Api || {};
    const scope = () => (api().scope ? api().scope() : 'don_vi_chu');
    const myUnit = () => (api().myUnit ? api().myUnit() : '');
    const isSplit = () => !!(api().isSplitDossier && api().isSplitDossier());
    const xlCode = o => { const x = o.xl || ''; return x === 'Giảm mức hoàn trả' || x === 'GIAM' ? 'GIAM' : (x === 'Miễn hoàn trả' || x === 'MIEN' ? 'MIEN' : 'HT'); };
    const xlText = o => ({ HT: 'Hoàn trả 100%', GIAM: 'Giảm mức hoàn trả', MIEN: 'Miễn hoàn trả' })[xlCode(o)];
    // Ghi chú lý do dưới Hình thức xử lý (Giảm / Miễn)
    const lyDoNote = o => { const c = xlCode(o); const t = c === 'GIAM' ? o.lyDoGiam : (c === 'MIEN' ? o.lyDoMien : ''); return t ? '<div class="ht-note-i">' + (c === 'GIAM' ? 'Lý do giảm: ' : 'Lý do miễn: ') + esc(t) + '</div>' : ''; };
    const ctText = c => { const v = CT[c]; return v ? (v[1] ? v[0] + ' (' + v[1] + ')' : v[0]) : ''; };
    window.htStatusOf = o => (o && o.ct ? ctText(o.ct) + (o.trinh ? ' - ' + ctText(o.trinh) : '') : '');

    // ===== Mô hình dữ liệu phần đơn vị / cán bộ =====
    function officers() { return (activeDossier.refundOfficers || []).filter(o => o && o.name); }
    function readStore() { try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch (e) { return {}; } }
    function persist() {
        try {
            const all = readStore();
            all[activeDossier.code] = {
                owner: activeDossier.ownerUnit || '',
                officers: officers().map(o => ({ name: o.name, unit: o.agency, st: o.ct, xl: xlCode(o), hd: o.hd || 0, giam: o.giam || 0, paid: o.paid || 0, hoan: !!o.ykhdDieuKienHoan, pt: STEP3.includes(o.ct) ? null : (o.total || 0), trinh: o.trinh || '', refund: o.refund || 0, stp: (o.payments || []).some(p => /^Sở Tư pháp/.test(p.unit || '')) })),
                detail: { units: activeDossier.htUnits, dcs: activeDossier.htDcs || [], recs: officers().map(o => ({ name: o.name, ct: o.ct, qd2: o.qd2 || null, qd3: o.qd3 || null, trinh: o.trinh || '', total: o.total, paid: o.paid || 0, payments: o.payments || [], refund: o.refund || 0, refundDone: o.refundDone || null, dcKey: o.dcKey != null ? o.dcKey : null })) }
            };
            localStorage.setItem(STORE_KEY, JSON.stringify(all));
        } catch (e) { /* bỏ qua */ }
    }
    function ensureModel() {
        if (!activeDossier || !isSplit()) return false;
        if (activeDossier.ht3Ready) return true;
        const stored = readStore()[activeDossier.code];
        officers().forEach(o => {
            if (!o.hd) o.hd = o.total || 0;
            const sd = SEED[o.name];
            if (!o.xl && sd) { o.xl = sd[1]; if (sd[2]) o.giam = sd[2]; }
            const rec = stored && stored.detail && stored.detail.recs.find(r => r.name === o.name);
            if (rec) Object.assign(o, { ct: rec.ct, qd2: rec.qd2, qd3: rec.qd3 || null, trinh: rec.trinh || '', total: rec.total != null ? rec.total : o.total, paid: rec.paid || 0, payments: rec.payments || [], refund: rec.refund || 0, refundDone: rec.refundDone || null, dcKey: rec.dcKey != null ? rec.dcKey : null });
            if (!o.ct) {
                if (o.ctStatus) o.ct = 'CBH_HT';
                else if (sd) o.ct = sd[0];
                else o.ct = { 'Chờ ban hành QĐ hoàn trả': 'CBH_HT', 'Chờ duyệt QĐ hoàn trả': 'CD_HT', 'Bị từ chối QĐ hoàn trả': 'BTC_HT', 'Hoàn thành': 'DONE' }[activeDossier.status] || 'THU';
            }
            const ex = !rec && sd && sd[3];
            if (ex) ['paid', 'trinh', 'refund', 'total'].forEach(k => { if (ex[k] != null) o[k] = ex[k]; });
            // Dữ liệu mẫu: số đã nộp quy về 01 đợt nộp
            if (!Array.isArray(o.payments)) o.payments = (o.paid || 0) > 0 ? [{ ngay: '15/09/2026', amt: o.paid, by: 'Cán bộ ' + o.agency, unit: o.agency, tlkt: [] }] : [];
            if (o.ct === 'MIEN' && !o.total) o.total = 0;
        });
        if (stored && stored.detail && stored.detail.units) activeDossier.htUnits = stored.detail.units;
        activeDossier.htDcs = (stored && stored.detail && stored.detail.dcs) || activeDossier.htDcs || [];
        const names = Array.from(new Set(officers().map(o => o.agency)));
        activeDossier.htUnits = names.map(u => {
            const old = (activeDossier.htUnits || []).find(x => x.unit === u) || {};
            const list = officers().filter(o => o.agency === u);
            const st = old.st || (list.some(o => o.ct === 'CD_HT') ? 'CD' : list.some(o => o.ct === 'BTC_HT') ? 'BTC' : list.some(o => o.ct === 'CBH_HT') ? 'CBH' : 'DONE');
            const u2 = Object.assign({ files: [] }, old, { unit: u, st, officers: list.map(o => o.name) });
            if (!u2.qd && st !== 'CBH') u2.qd = seedRec('HT', u2, st);
            return u2;
        });
        // Dữ liệu mẫu: lượt trình QĐ miễn / giảm, QĐ đình chỉ theo trạng thái mẫu của cán bộ
        if (!stored) officers().forEach(o => {
            const u = activeDossier.htUnits.find(x => x.unit === o.agency) || { unit: o.agency };
            // Cán bộ đã Miễn hoàn trả / đang thu theo QĐ giảm: QĐ miễn / giảm mẫu đã ban hành
            const xc = xlCode(o);
            // Lý do giảm / miễn mẫu (hiển thị dưới Hình thức xử lý)
            if (xc === 'GIAM' && !o.lyDoGiam) o.lyDoGiam = 'Cán bộ có hoàn cảnh kinh tế khó khăn, đã chủ động khắc phục một phần thiệt hại.';
            if (xc === 'MIEN' && !o.lyDoMien) o.lyDoMien = 'Cán bộ mắc bệnh hiểm nghèo, không còn khả năng thực hiện hoàn trả.';
            if (!o.qd2 && xc !== 'HT' && ['MIEN', 'THU', 'DONE'].includes(o.ct)) o.qd2 = seedRec(xc, u, 'DONE');
            const ex = (SEED[o.name] || [])[3]; if (!ex) return;
            if (ex.qd2 && !o.qd2) o.qd2 = seedRec(xlCode(o), u, ex.qd2);
            if (ex.dc) {
                let r = activeDossier.htDcs[ex.dc.key];
                if (!r) {
                    r = seedRec('DC', u, ex.dc.st);
                    Object.assign(r, { st: ex.dc.st, unit: o.agency, names: [], dc: { pa: {}, canCu: typeof DCHT_CAN_CU_DEFAULT !== 'undefined' && Array.isArray(DCHT_CAN_CU_DEFAULT) ? DCHT_CAN_CU_DEFAULT.join('\n') : '', vbCanCu: 'Bản án số 05/2025/HS-ST ngày 12/03/2025 của Tòa án nhân dân quận Long Biên', noiNhan: '' } });
                    activeDossier.htDcs[ex.dc.key] = r;
                }
                r.names.push(o.name);
                if (ex.dc.pa) r.dc.pa[o.name] = ex.dc.pa;
                o.dcKey = ex.dc.key;
            }
        });
        activeDossier.ht3Ready = true;
        syncUnitStatusText();
        persist();
        return true;
    }
    // Lượt trình mẫu cho dữ liệu có sẵn (đã trình / bị từ chối / đã ban hành)
    function seedRec(kind, u, st) {
        const levels = levelsOf(u.unit);
        const r = { kind, method: 'online', docSrc: 'gen', soKh: st === 'DONE' ? ({ GIAM: '92/QĐ-UBND', MIEN: '93/QĐ-UBND' }[kind] || '89/QĐ-UBND') : '', ngay: '20/09/2026', fileName: KIND[kind].file + '_' + (activeDossier.maVuViec || activeDossier.code) + '.docx', tlkt: [], levels, assignees: levels.map(l => l.leaders[0].id), content: KIND[kind].content, level: 0, hist: [{ type: 'submit', name: 'Cán bộ ' + u.unit, at: '18/09/2026 09:00', msg: KIND[kind].content }] };
        if (st === 'BTC') { r.reject = { reason: 'Cần rà soát lại số tiền hoàn trả theo kiến nghị của Hội đồng.', by: leaderLabel(r, 0), at: '19/09/2026 10:15' }; r.hist.unshift({ type: 'reject', name: r.reject.by, at: r.reject.at, msg: 'Lý do: ' + r.reject.reason }); }
        if (st === 'DONE') { r.level = levels.length; r.issuedAt = /^(GIAM|MIEN)$/.test(kind) ? '22/09/2026' : '20/09/2026'; r.hist.unshift({ type: 'approve', name: leaderLabel(r, levels.length - 1), at: '20/09/2026 15:00', msg: 'Ký duyệt' }); }
        return r;
    }
    function syncUnitStatusText() {
        (activeDossier.htUnits || []).forEach(u => {
            u.status = { CBH: 'Chờ ban hành QĐ hoàn trả', CD: 'Chờ duyệt (QĐ hoàn trả)', BTC: 'Bị từ chối (QĐ hoàn trả)', DONE: 'Đã ban hành QĐ hoàn trả' }[u.st];
            // Toàn bộ cán bộ của đơn vị bị đình chỉ trước khi ban hành QĐ hoàn trả: đơn vị không ban hành QĐ hoàn trả
            if (u.st !== 'DONE' && allDc(u.unit)) u.status = 'Đình chỉ hoàn trả';
        });
    }
    function allDc(unit) { const l = officers().filter(o => o.agency === unit); return l.length > 0 && l.every(o => o.ct === 'DC'); }
    function recomputeBase() {
        const l = officers();
        if (l.length && l.every(o => o.ct === 'DC')) activeDossier.status = 'Đình chỉ xem xét hoàn trả';
        else if (l.length && l.every(o => ENDED.includes(o.ct))) activeDossier.status = 'Hoàn thành';
        else if (l.some(o => STEP3.includes(o.ct))) activeDossier.status = 'Chờ ban hành QĐ hoàn trả';
        else activeDossier.status = 'Thu hồi tiền hoàn trả';
        l.forEach(o => {
            if (o.ct === 'THU') { o.status = (o.paid || 0) > 0 ? 'Đang thu' : 'Chưa nộp'; o.progressClass = 'primary'; }
            if (o.ct === 'MIEN') { o.status = 'Hoàn tất'; o.isTerminated = true; o.progressClass = 'success'; }
        });
        syncUnitStatusText();
    }
    function commit(msg) { recomputeBase(); persist(); renderStateLayout(); if (msg) showToast(msg, 'success'); }

    // ===== Phạm vi / quyền thao tác =====
    function unitsInView() {
        const s = scope(), U = myUnit(), stpUnits = api().STP_UNITS || [];
        const owner = api().isOwnerScope && api().isOwnerScope();
        return (activeDossier.htUnits || []).filter(u => {
            if (s === 'lanh_dao' || owner) return true;
            if (s === 'stp') return stpUnits.includes(u.unit) && u.st === 'DONE';
            return u.unit === U;
        });
    }
    const canActUnit = u => scope() !== 'lanh_dao' && scope() !== 'stp' && u.unit === myUnit();
    const isLeader = () => scope() === 'lanh_dao';

    // ===== Luồng ký (giả lập 02 cấp theo Cấu hình luồng xử lý của đơn vị ban hành) =====
    function levelsOf(unit) {
        return [
            { unit: 'Phòng chuyên môn - ' + unit, kyNhay: true, leaders: [{ id: 'tp', label: 'Phạm Văn Hùng - Trưởng phòng' }, { id: 'ptp', label: 'Nguyễn Thị Mai - Phó Trưởng phòng' }] },
            { unit, kyNhay: false, leaders: [{ id: 'ct', label: 'Trần Văn Lãnh Đạo - Chủ tịch' }, { id: 'pct', label: 'Lê Minh Châu - Phó Chủ tịch' }] }
        ];
    }
    function leaderLabel(r, i) {
        const lv = r.levels[i]; if (!lv) return 'Lãnh đạo';
        const ld = lv.leaders.find(x => x.id === r.assignees[i]) || lv.leaders[0];
        return ld.label;
    }

    // ===== Văn bản sinh theo mẫu (giả lập nội dung xem trước) =====
    function headHtml(unit, so, ngay, mau) {
        return '<div style="text-align:right; font-weight:bold; font-size:13px;">Mẫu số ' + mau + '/BTNN</div>'
            + '<div style="display:flex; justify-content:space-between; margin:12px 0 20px;"><div style="text-align:center; width:42%;"><div style="font-weight:bold; font-size:13px; text-transform:uppercase;">' + esc(unit) + '</div><div style="font-size:13px; margin-top:6px;">Số: ' + esc(so || '……/QĐ-……') + '</div></div>'
            + '<div style="text-align:center; width:56%;"><div style="font-weight:bold; font-size:13px;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div style="font-weight:bold; font-size:13px;">Độc lập - Tự do - Hạnh phúc</div><div style="font-style:italic; font-size:13px; margin-top:6px;">……, ' + esc(ngay || 'ngày …… tháng …… năm ……') + '</div></div></div>';
    }
    function docHtml(kind, ctx, so, ngay) {
        const p = 'text-indent:24px; margin:0 0 8px; text-align:justify;';
        const k = KIND[kind];
        let body = '';
        if (kind === 'DC') {
            // Mẫu 39/BTNN: Căn cứ (mỗi dòng 01 căn cứ), Điều 1 theo Văn bản làm căn cứ yêu cầu bồi thường, Nơi nhận (không sửa template)
            const d = ctx.dc || {};
            const canCu = String(d.canCu || '').split('\n').map(s => s.trim()).filter(Boolean).map(s => '<p style="' + p + ' font-style:italic;">' + esc(s) + '</p>').join('');
            const nn = String(d.noiNhan || '').split('\n').map(s => s.trim()).filter(Boolean).map(esc).join('<br>');
            const victim = typeof dchtVictim === 'function' ? dchtVictim() : '……';
            return headHtml(ctx.unit, so, ngay, k.mau)
                + '<div style="text-align:center; margin-bottom:14px;"><div style="font-weight:bold; font-size:15px;">QUYẾT ĐỊNH</div><div style="font-weight:bold; font-size:14px;">Đình chỉ việc xem xét trách nhiệm hoàn trả</div></div>'
                + canCu + '<div style="text-align:center; font-weight:bold; margin:10px 0;">QUYẾT ĐỊNH:</div>'
                + '<p style="' + p + '"><strong>Điều 1.</strong> Đình chỉ việc xác định trách nhiệm hoàn trả trong vụ việc yêu cầu bồi thường của ' + esc(victim) + ' vì ' + esc(d.vbCanCu || '……') + ' không còn là văn bản làm căn cứ yêu cầu bồi thường.</p>'
                + '<p style="' + p + '"><strong>Điều 2.</strong> Quyết định này có hiệu lực kể từ ngày ký./.</p>'
                + '<div style="display:flex; justify-content:space-between; margin-top:30px;"><div style="width:44%; font-size:12px;"><strong><em>Nơi nhận:</em></strong><br>' + (nn || '- ……;') + '</div><div id="ht3SignAnchor" style="text-align:center; width:52%;"><div style="font-weight:bold;">THỦ TRƯỞNG CƠ QUAN</div><div style="height:80px;"></div></div></div>';
        }
        if (kind === 'HT') {
            body = '<p style="' + p + '"><strong>Điều 1.</strong> Người thi hành công vụ có trách nhiệm hoàn trả cho ngân sách nhà nước:</p>'
                + ctx.list.map((o, i) => '<p style="' + p + '">' + (i + 1) + '. Ông/Bà <strong>' + esc(o.name) + '</strong>, ' + esc(o.role || '') + ', ' + esc(o.agency) + '; mức độ lỗi: ' + esc(o.loi === 'Khác' ? (o.ykhdLoiKhac || 'Khác') : o.loi || 'Vô ý') + '.<br>'
                    + '- Số tiền hoàn trả: ' + money(o.hd) + ' đồng.<br>'
                    + '- Điều kiện hoãn thực hiện việc hoàn trả (nếu có): ' + esc(o.ykhdDieuKienHoan || '') + '<br>'
                    + '- Giảm mức hoàn trả (nếu có): ' + (xlCode(o) === 'GIAM' ? esc(o.lyDoGiam || '') : '') + '<br>'
                    + '- Miễn hoàn trả (nếu có): ' + (xlCode(o) === 'MIEN' ? esc(o.lyDoMien || '') : '') + '<br>'
                    + '- Phương thức hoàn trả: ' + esc(o.refundMethod || '') + '.</p>').join('');
        } else {
            const o = ctx.officer, b = baseKind(kind), sp = ctx.supp;
            // Miễn / Giảm bổ sung (Bước 4): số tiền ban đầu là số tiền phải hoàn trả hiện tại; số sau giảm, lý do theo popup trình ký
            const hd0 = sp ? (o.total || 0) : (o.hd || 0);
            const giam = sp ? (sp.giam || 0) : (o.giam || 0);
            const mien = sp ? Math.max(0, (o.total || 0) - (o.paid || 0)) : hd0;
            body = '<p style="' + p + '"><strong>Điều 1.</strong> ' + (b === 'GIAM' ? 'Giảm mức hoàn trả' : 'Miễn hoàn trả') + ' đối với Ông/Bà <strong>' + esc(o.name) + '</strong> theo Quyết định hoàn trả số ' + esc(ctx.qdHt || '……') + ':</p>'
                + '<p style="' + p + '">- Mức độ lỗi: ' + esc(o.loi || 'Vô ý') + '.<br>- Số tiền phải hoàn trả theo Quyết định hoàn trả: ' + money(hd0) + ' đồng.<br>'
                + (b === 'GIAM'
                    ? '- Số tiền hoàn trả được giảm: ' + money(hd0 - giam) + ' đồng.<br>- Số tiền còn phải hoàn trả: ' + money(giam) + ' đồng.<br>- Phương thức hoàn trả: ' + esc(o.refundMethod || '') + '.<br>- Lý do giảm: ' + esc(sp ? sp.lyDo : o.lyDoGiam || '')
                    : '- Số tiền hoàn trả được miễn: ' + money(mien) + ' đồng.<br>- Số tiền còn phải hoàn trả: 0 VNĐ (Bằng chữ: không đồng).<br>- Lý do miễn: ' + esc(sp ? sp.lyDo : o.lyDoMien || '')) + '</p>';
        }
        return headHtml(ctx.unit, so, ngay, k.mau)
            + '<div style="text-align:center; margin-bottom:14px;"><div style="font-weight:bold; font-size:15px;">QUYẾT ĐỊNH</div><div style="font-weight:bold; font-size:14px;">' + esc(k.title.replace('QUYẾT ĐỊNH ', '').replace(/^VỀ VIỆC/, 'Về việc').toLowerCase().replace(/^về việc/, 'Về việc')) + '</div></div>'
            + '<p style="' + p + ' font-style:italic;">Căn cứ Luật Trách nhiệm bồi thường của Nhà nước; căn cứ Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả số ' + esc(/^\d/.test(activeDossier.hdDecision || '') ? activeDossier.hdDecision : '……') + '; xét Văn bản kiến nghị của Hội đồng (Mã hồ sơ: ' + esc(activeDossier.code) + '),</p>'
            + '<div style="text-align:center; font-weight:bold; margin:10px 0;">QUYẾT ĐỊNH:</div>' + body
            + '<p style="' + p + '"><strong>Điều 2.</strong> Quyết định này có hiệu lực kể từ ngày ký./.</p>'
            + '<div style="display:flex; justify-content:flex-end; margin-top:30px;"><div id="ht3SignAnchor" style="text-align:center; width:52%;"><div style="font-weight:bold;">THỦ TRƯỞNG CƠ QUAN</div><div style="height:80px;"></div></div></div>';
    }
    let DC_DRAFT = null; // lượt trình QĐ đình chỉ mới: { unit, names }
    function ctxOf(kind, key) {
        if (kind === 'HT') { const u = activeDossier.htUnits[key]; return { unit: u.unit, list: officers().filter(o => o.agency === u.unit && o.ct !== 'DC'), u }; }
        if (kind === 'DC') {
            const d = (activeDossier.htDcs || [])[key] || DC_DRAFT || { names: [] };
            return { unit: d.unit, list: d.names.map(n => officers().find(o => o.name === n)).filter(Boolean), u: activeDossier.htUnits.find(x => x.unit === d.unit) || {}, dc: d.dc || null };
        }
        const o = activeDossier.refundOfficers[key];
        const u = activeDossier.htUnits.find(x => x.unit === o.agency) || {};
        const supp = KIND[kind].base ? ((o.qd3 && o.qd3.supp) || null) : null;
        return { unit: o.agency, officer: o, u, supp, qdHt: u.qd ? (u.qd.soKh || '') + (u.qd.issuedAt ? ' ngày ' + u.qd.issuedAt : '') : '' };
    }
    // QĐ hoàn trả: theo phần đơn vị; QĐ miễn / giảm (Bước 3): o.qd2; miễn / giảm bổ sung (Bước 4): o.qd3
    function recOf(kind, key) { if (kind === 'DC') return (activeDossier.htDcs || [])[key] || null; return kind === 'HT' ? activeDossier.htUnits[key].qd : (KIND[kind].base ? activeDossier.refundOfficers[key].qd3 : activeDossier.refundOfficers[key].qd2) || null; }
    function setRec(kind, key, r) { if (kind === 'DC') { activeDossier.htDcs = activeDossier.htDcs || []; activeDossier.htDcs[key] = r; return; } if (kind === 'HT') activeDossier.htUnits[key].qd = r; else if (KIND[kind].base) activeDossier.refundOfficers[key].qd3 = r; else activeDossier.refundOfficers[key].qd2 = r; }

    // ===== Bước 3: hiển thị theo phần đơn vị =====
    function badge(text, tone) {
        // Pill trạng thái dùng chung (chi_tiet_ho_so_hoan_tra_ykhd.js): màu theo trạng thái
        if (typeof window.htPill === 'function') return window.htPill(text, { muted: 'slate', warn: 'amber', info: 'indigo', bad: 'red', ok: 'emerald' }[tone]);
        const c = { muted: '#f1f5f9;color:#475569;border:1px solid #cbd5e1', warn: '#fffbeb;color:#b45309;border:1px solid #fde68a', info: '#ede9fe;color:#6d28d9;border:1px solid #ddd6fe', bad: '#fef2f2;color:#b91c1c;border:1px solid #fecaca', ok: '#ecfdf5;color:#047857;border:1px solid #a7f3d0' }[tone];
        return '<span class="badge" style="background:' + c + '; font-weight:700; padding:4px 10px;">' + esc(text) + '</span>';
    }
    const row = (k, v) => '<div class="form-group" style="margin-bottom:10px;"><span class="form-label">' + k + '</span><div class="info-value" style="font-weight:600;">' + v + '</div></div>';
    function fileLinks(r, kind, key) {
        return '<a class="action-link" href="javascript:void(0)" onclick="ht3OpenDoc(\'' + kind + '\',' + key + ')"><i class="fa-solid fa-eye"></i> Xem file</a> &nbsp; '
            + '<a class="action-link" href="javascript:void(0)" onclick="showToast(\'Đang tải tệp ' + esc(r.fileName) + '...\', \'info\')"><i class="fa-solid fa-download"></i> Tải file</a>';
    }
    // Tên tệp QĐ + biểu tượng Xem/Tải trên 01 dòng
    function qdFileName(r) {
        const m = String(r.soKh || '').match(/^(\d+)\/QĐ-([^\s]+)/);
        return m ? 'QD_' + m[1] + '_' + m[2].replace(/[^A-Za-z0-9]/g, '') + '_HoanTra.pdf' : (r.fileName || 'QD_HoanTra.pdf');
    }
    function qdFileCell(r, kind, key) {
        const n = qdFileName(r);
        return '<span style="display:inline-flex; align-items:center; gap:8px; white-space:nowrap; max-width:100%;"><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i>'
            + '<span title="' + esc(n) + '" style="overflow:hidden; text-overflow:ellipsis;">' + esc(n) + '</span>'
            + '<a class="action-link" href="javascript:void(0)" title="Xem" onclick="ht3OpenDoc(\'' + kind + '\',' + key + ')"><i class="fa-solid fa-eye"></i></a>'
            + '<a class="action-link" href="javascript:void(0)" title="Tải" onclick="showToast(\'Đang tải tệp ' + esc(n) + '...\', \'info\')"><i class="fa-solid fa-download"></i></a></span>';
    }
    function qdBlock(u, i) {
        const r = u.qd, act = canActUnit(u);
        // Cán bộ của đơn vị đang trình ký QĐ đình chỉ: tạm khóa trình ký QĐ hoàn trả
        const dcBusy = officers().some(o => o.agency === u.unit && /^(CD|BTC)_DC$/.test(o.trinh || ''));
        if (u.st !== 'DONE' && allDc(u.unit)) {
            return '<div style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px; padding:14px 16px; margin-bottom:16px;"><div style="font-weight:700; color:var(--text-muted);">Không ban hành Quyết định hoàn trả</div><div style="font-size:13px; color:var(--text-muted);">Toàn bộ cán bộ của đơn vị đã Đình chỉ hoàn trả.</div></div>';
        }
        if (u.st === 'CBH') {
            return '<div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px; padding:14px 16px; margin-bottom:16px;">'
                + '<div><div style="font-weight:700; color:var(--primary-color);">Chưa ban hành Quyết định hoàn trả</div><div style="font-size:13px; color:var(--text-muted);">Đơn vị trình ký / ban hành 01 Quyết định hoàn trả (Mẫu 36/BTNN) chung cho các cán bộ của đơn vị.</div></div>'
                + (act ? (dcBusy ? '<button type="button" class="btn btn-primary" disabled style="opacity:.45; cursor:not-allowed;" title="Đơn vị đang trình ký Quyết định đình chỉ"><i class="fa-solid fa-file-signature"></i> Trình ký QĐ hoàn trả</button>' : '<button type="button" class="btn btn-primary" onclick="ht3OpenSign(\'HT\',' + i + ')"><i class="fa-solid fa-file-signature"></i> Trình ký QĐ hoàn trả</button>') : '') + '</div>';
        }
        let h = '<div style="margin-bottom:16px;">';
        if (u.st === 'BTC' && r && r.reject) {
            h += '<div class="alert-box danger" style="border-left:4px solid var(--danger-color); padding:12px 16px; background:#fef2f2; border-radius:8px; margin-bottom:12px;"><div style="font-weight:800; color:#b91c1c;">Quyết định hoàn trả bị từ chối</div>'
                + '<div style="font-size:13px;"><strong>Người từ chối:</strong> ' + esc(r.reject.by) + ' (' + esc(r.reject.at) + ')</div><div style="font-size:13px;"><strong>Lý do từ chối:</strong> ' + esc(r.reject.reason) + '</div></div>';
        }
        // Dải ngang 01 hàng: Hình thức ký | Số, ký hiệu văn bản | Ngày văn bản | Tệp văn bản Quyết định
        const cell = (k, v) => '<div style="flex:1 1 0; min-width:160px;"><div style="font-size:12px; color:#64748b; margin-bottom:2px;">' + k + '</div><div style="font-weight:600; font-size:13px; overflow-wrap:anywhere;">' + v + '</div></div>';
        const off = r.method === 'offline';
        h += '<div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap; background:#eff6ff; border:1px solid #dbeafe; border-radius:8px; padding:10px 14px;">'
            + cell('Hình thức ký', off ? 'Ký ngoài' : 'Ký số trên hệ thống')
            + cell('Số, ký hiệu văn bản', off ? '--' : esc(r.soKh || 'Chờ cấp số'))
            + cell('Ngày văn bản', off ? '--' : esc(u.st === 'DONE' ? (r.issuedAt || r.ngay) : r.ngay || '--'))
            + cell('Tệp văn bản Quyết định', qdFileCell(r, 'HT', i))
            + '</div>'
            + (u.st === 'CD' ? '<div style="font-size:13px; margin-top:8px;"><span style="color:#64748b;">Lãnh đạo được giao ký duyệt:</span> <strong>Cấp ' + (r.level + 1) + '/' + r.levels.length + ' - ' + esc(r.levels[r.level].unit) + ': ' + esc(leaderLabel(r, r.level)) + '</strong></div>' : '');
        if (r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function') h += tlktViewHtml(r.tlkt);
        const btns = [];
        if (u.st === 'CD' && isLeader()) btns.push(htkdBarButtons('ht3Reject(\'HT\',' + i + ')', 'ht3Approve(\'HT\',' + i + ')'));
        if (u.st === 'BTC' && act) btns.push(dcBusy ? '<button type="button" class="btn btn-primary" disabled style="opacity:.45; cursor:not-allowed;" title="Đơn vị đang trình ký Quyết định đình chỉ"><i class="fa-solid fa-paper-plane"></i> Trình ký lại</button>' : '<button type="button" class="btn btn-primary" onclick="ht3OpenSign(\'HT\',' + i + ')"><i class="fa-solid fa-paper-plane"></i> Trình ký lại</button>');
        if (btns.length) h += '<div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid var(--border-color); padding-top:12px; margin-top:8px;">' + btns.join('') + '</div>';
        return h + '</div>';
    }
    function officerAction(o, idx, u) {
        const x = xlCode(o);
        if (o.ct === 'DC' || /_DC$/.test(o.trinh || '')) return '<span style="color:var(--text-muted);">--</span>';
        if (x === 'HT') return '<span style="color:var(--text-muted);">--</span>';
        const lbl = x === 'MIEN' ? 'Trình ký QĐ miễn' : 'Trình ký QĐ giảm';
        const dis = tip => '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm" style="background:#e2e8f0; color:#64748b; border:1px solid #cbd5e1; cursor:not-allowed;" title="' + esc(lbl + ' - ' + tip) + '" disabled><i class="fa-solid fa-file-signature"></i> ' + lbl + '</button>';
        if (isLeader()) {
            return ['CD_MIEN', 'CD_GIAM'].includes(o.ct)
                ? '<button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-primary" title="Ký duyệt" onclick="ht3Approve(\'' + x + '\',' + idx + ')"><i class="fa-solid fa-file-signature"></i></button> <button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-danger" title="Từ chối" onclick="ht3Reject(\'' + x + '\',' + idx + ')"><i class="fa-solid fa-ban"></i></button>'
                : '<span style="color:var(--text-muted);">--</span>';
        }
        if (scope() === 'stp') return /^(CBH|BTC)_/.test(o.ct) ? dis('Sở Tư pháp không thực hiện Miễn hoàn trả, Giảm mức hoàn trả') : DASH;
        if (!canActUnit(u)) return '<span style="color:var(--text-muted);">--</span>';
        if (u.st !== 'DONE') return dis('Chỉ trình ký sau khi Quyết định hoàn trả của đơn vị được ban hành');
        if (['CBH_MIEN', 'CBH_GIAM'].includes(o.ct)) return '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-pri" onclick="ht3OpenSign(\'' + x + '\',' + idx + ')"><i class="fa-solid fa-file-signature"></i> ' + lbl + '</button>';
        if (['BTC_MIEN', 'BTC_GIAM'].includes(o.ct)) return '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-pri" onclick="ht3OpenSign(\'' + x + '\',' + idx + ')"><i class="fa-solid fa-paper-plane"></i> Trình ký lại</button>';
        if (['CD_MIEN', 'CD_GIAM'].includes(o.ct)) return '<span style="color:var(--text-muted); font-size:12.5px;">Chờ Lãnh đạo ký duyệt</span>';
        return '<span style="color:var(--text-muted);">--</span>';
    }
    function officerStatusCell(o, idx) {
        // Pill trạng thái; chú thích QĐ miễn / giảm đã ban hành (xem văn bản tại cột Thao tác)
        let h = '<div>' + (typeof htPill === 'function' ? htPill(ctText(o.ct)) : esc(ctText(o.ct))) + '</div>';
        const r = o.qd2;
        if (r && ['BTC_MIEN', 'BTC_GIAM'].includes(o.ct) && r.reject) h += '<div class="ht-note" style="color:#b91c1c;">Lý do từ chối: ' + esc(r.reject.reason) + '</div>';
        if (r && r.issuedAt) h += '<div class="ht-note">' + (baseKind(r.kind) === 'MIEN' ? 'QĐ miễn số: ' : 'QĐ giảm số: ') + esc(r.soKh || '--') + ' (' + esc(r.issuedAt) + ')</div>';
        return h + dcLine(o);
    }

    // ===== Tiêu đề khối Phần đơn vị (Bước 3, Bước 4): tên đơn vị, badge trạng thái, tóm tắt số cán bộ / tiền, thu gọn / mở rộng =====
    const COLLAPSE = {};
    const unitKey = (step, u) => activeDossier.code + '|' + step + '|' + u.unit;
    // Hồ sơ nhiều đơn vị: đơn vị của người xem đứng đầu, mặc định mở; đơn vị phối hợp mặc định thu gọn
    const hasOwnUnit = () => unitsInView().some(canActUnit);
    const isOwnUnit = u => canActUnit(u);
    const unitCollapsed = (step, u) => { const k = unitKey(step, u); return k in COLLAPSE ? !!COLLAPSE[k] : (hasOwnUnit() && !isOwnUnit(u)); };
    const orderUnits = list => hasOwnUnit() ? list.filter(isOwnUnit).concat(list.filter(u => !isOwnUnit(u))) : list;
    window.htToggleUnit = function (key, btn) {
        const card0 = btn.closest('.card'), body0 = card0 && card0.querySelector('.card-body');
        COLLAPSE[key] = !(body0 && body0.style.display === 'none');
        const card = btn.closest('.card'), body = card && card.querySelector('.card-body');
        if (body) body.style.display = COLLAPSE[key] ? 'none' : '';
        const ic = btn.querySelector('i'); if (ic) ic.className = COLLAPSE[key] ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down';
    };
    function unitSummary(u) {
        const l = officers().filter(o => o.agency === u.unit);
        const issued = l.filter(o => !STEP3.includes(o.ct));
        const tong = issued.reduce((s, o) => s + (o.ct === 'MIEN' ? (o.paid || 0) : (o.total || 0)), 0);
        const paid = l.reduce((s, o) => s + (o.paid || 0), 0);
        return l.length + ' cán bộ' + (issued.length
            ? ' • Phải thu: <strong>' + money(tong) + ' đ</strong> • Đã thu: <strong>' + money(paid) + ' đ</strong>'
            : ' • Số tiền cần hoàn trả: <strong>' + money(l.reduce((s, o) => s + (o.hd || 0), 0)) + ' đ</strong>');
    }
    const unitCardStyle = u => 'margin-bottom:20px;' + (hasOwnUnit() && isOwnUnit(u) ? ' border:2px solid #2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.12);' : '');
    function unitHeader(u, step, badgeHtml) {
        const key = unitKey(step, u), col = unitCollapsed(step, u);
        const own = hasOwnUnit() && isOwnUnit(u), viewOnly = scope() !== 'lanh_dao' && !canActUnit(u);
        return '<div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">'
            + '<div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;"><button type="button" data-admin-icon-normalized="1" title="Thu gọn / Mở rộng" onclick="htToggleUnit(\'' + esc(key).replace(/'/g, '&#39;') + '\', this)" style="border:1px solid var(--border-color); background:#fff; border-radius:6px; width:28px; height:28px; cursor:pointer;"><i class="fa-solid ' + (col ? 'fa-chevron-right' : 'fa-chevron-down') + '"></i></button>'
            + '<div class="card-title" style="margin-bottom:0;"><i class="fa-solid fa-sitemap"></i> Phần đơn vị: ' + esc(u.unit) + '</div>' + badgeHtml
            + (own ? '<span style="font-size:11px; padding:2px 8px; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-weight:600; white-space:nowrap;">Đơn vị của bạn (Trực tiếp xử lý)</span>' : '')
            + (viewOnly ? '<span style="font-size:11px; padding:2px 8px; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-weight:500; white-space:nowrap;">' + (hasOwnUnit() ? 'Chỉ xem (Đơn vị phối hợp)' : 'Chỉ xem') + '</span>' : '') + '</div>'
            + '<div style="font-size:13px; color:#334155;">' + unitSummary(u) + '</div></div>';
    }

    // ===== Xem Quyết định miễn / giảm đã ban hành (Đơn vị, Sở Tư pháp, Lãnh đạo) =====
    const DASH = '<span style="color:var(--text-muted);">--</span>';
    function viewQdBtn(o, idx) {
        const r = o.qd2;
        if (!r || !r.issuedAt || !KIND[r.kind]) return '';
        return '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-out" onclick="ht3ViewQd(\'' + r.kind + '\',' + idx + ')"><i class="fa-solid fa-eye"></i> ' + (baseKind(r.kind) === 'MIEN' ? 'Xem QĐ miễn' : 'Xem QĐ giảm') + '</button>';
    }
    function actCell(o, idx, u) {
        const a = officerAction(o, idx, u), v = viewQdBtn(o, idx);
        if (!v) return a;
        return a === DASH ? v : a + ' ' + v;
    }
    window.ht3ViewQd = function (kind, key) {
        const r = recOf(kind, key); if (!r) return;
        if (!el('ht3ViewModal')) {
            document.body.insertAdjacentHTML('beforeend', '<div class="modal" id="ht3ViewModal" style="z-index:1060;"><div class="modal-content" style="max-width:720px;"><div class="modal-header"><h3 class="modal-title" id="ht3ViewTitle"></h3><button type="button" class="close-modal" onclick="ht3ViewClose()">&times;</button></div><div class="modal-body" style="padding:24px;" id="ht3ViewBody"></div><div class="modal-footer" style="padding:16px 24px 24px;"><button type="button" class="btn btn-secondary" onclick="ht3ViewClose()">Đóng</button></div></div></div>');
        }
        const k = KIND[kind], ctx = ctxOf(kind, key);
        const item = (lbl, v) => '<div class="info-item"><div class="info-label">' + lbl + '</div><div class="info-value" style="font-weight:600;">' + v + '</div></div>';
        el('ht3ViewTitle').innerHTML = '<i class="fa-solid fa-file-contract"></i> ' + esc(k.doc);
        el('ht3ViewBody').innerHTML = '<div class="info-grid">'
            + item('Cán bộ', esc(ctx.officer ? ctx.officer.name : (ctx.list || []).map(o => o.name).join(', ')))
            + item('Đơn vị ban hành', esc(ctx.unit))
            + item('Hình thức ký', r.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống')
            + (r.method === 'offline' ? '' : item('Số, ký hiệu văn bản', esc(r.soKh || '--')) + item('Ngày văn bản', esc(r.issuedAt || r.ngay || '--')))
            + item('Tệp văn bản Quyết định', esc(r.fileName) + '<div style="margin-top:4px; font-weight:400;">' + fileLinks(r, kind, key) + '</div>')
            + '</div>' + (r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function' ? tlktViewHtml(r.tlkt) : '');
        el('ht3ViewModal').classList.add('visible');
    };
    window.ht3ViewClose = function () { const m = el('ht3ViewModal'); if (m) m.classList.remove('visible'); };

    // ===== Đình chỉ cấp cán bộ (Bước 3, Bước 4) =====
    // Dòng phụ trạng thái trình ký QĐ đình chỉ / chờ trả lại tiền / QĐ đình chỉ đã ban hành
    function dcLine(o) {
        const d = o.dcKey != null ? (activeDossier.htDcs || [])[o.dcKey] : null;
        let h = '';
        if (/_DC$/.test(o.trinh || '')) h += '<div style="font-size:12px; color:#6d28d9;">' + esc(ctText(o.trinh)) + (o.trinh === 'BTC_DC' && d && d.reject ? ' - Lý do: ' + esc(d.reject.reason) : '') + '</div>';
        if (d && d.st === 'DONE') h += '<div style="font-size:12px; color:var(--text-muted);">QĐ đình chỉ' + (d.soKh ? ' số ' + esc(d.soKh) : '') + ' ngày ' + esc(d.issuedAt) + ((d.dc && d.dc.pa && d.dc.pa[o.name]) ? ' - ' + (d.dc.pa[o.name] === 'HOAN' ? 'Hoàn trả lại số tiền đã thu' : 'Không hoàn trả lại số tiền đã thu') : '') + '</div>';
        return h;
    }
    // Cán bộ được chọn đình chỉ: chưa kết thúc, không đang chờ Lãnh đạo ký duyệt, không có trình ký QĐ đình chỉ, không đang chờ trả lại tiền
    const dcEligible = o => !ENDED.includes(o.ct) && !/^CD_/.test(o.ct) && !/^CD_|_DC$/.test(o.trinh || '') && !((o.refund || 0) > 0);
    function dcCheckCell(o, idx, u, ui) {
        if (!canActUnit(u)) return '';
        return '<td style="text-align:center;">' + (dcEligible(o) ? '<input type="checkbox" class="htDcChk" data-u="' + ui + '" data-idx="' + idx + '" onchange="ht3DcSync(' + ui + ')">' : '') + '</td>';
    }
    function dcHeadCell(u, ui, rows) {
        if (!canActUnit(u)) return '';
        const any = rows.some(x => dcEligible(x.o));
        return '<th style="width:40px; text-align:center;">' + (any ? '<input type="checkbox" class="htDcAll" data-u="' + ui + '" title="Chọn tất cả" onchange="ht3DcAll(' + ui + ', this.checked)">' : '') + '</th>';
    }
    function dcToolbar(u, ui, rows) {
        if (!canActUnit(u) || !rows.some(x => dcEligible(x.o))) return '';
        // Khóa khi chưa chọn cán bộ; có chọn: bật, hiển thị số cán bộ đã chọn (ht3DcSync)
        return '<div style="display:flex; justify-content:flex-end; margin-bottom:8px;"><button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-dc htDcBtn" data-u="' + ui + '" disabled onclick="ht3OpenDc(' + ui + ')"><i class="fa-solid fa-ban"></i> Trình ký QĐ đình chỉ</button></div>';
    }
    // Khối các lượt trình QĐ đình chỉ của đơn vị: Ký duyệt / Từ chối (Lãnh đạo), Trình ký lại (bị từ chối), Xem file
    function dcBlock(u) {
        const recs = (activeDossier.htDcs || []).map((d, k) => ({ d, k })).filter(x => x.d && x.d.unit === u.unit);
        if (!recs.length) return '';
        const act = canActUnit(u);
        let h = '<div style="font-weight:700; color:var(--primary-color); margin:16px 0 8px;"><i class="fa-solid fa-ban"></i> Quyết định đình chỉ (Mẫu 39/BTNN)</div>'
            + '<table class="dense-table" style="width:100%;"><thead><tr><th style="width:45px; text-align:center;">STT</th><th>Cán bộ</th><th style="width:150px;">Hình thức ký</th><th style="width:220px;">Trạng thái</th><th style="width:150px;">Tệp văn bản</th><th style="width:150px; text-align:center;">Thao tác</th></tr></thead><tbody>';
        recs.forEach((x, n) => {
            const d = x.d;
            const st = { CD: 'Chờ duyệt (QĐ đình chỉ) - Cấp ' + (d.level + 1) + '/' + d.levels.length + ': ' + leaderLabel(d, Math.min(d.level, d.levels.length - 1)), BTC: 'Bị từ chối (QĐ đình chỉ)', DONE: 'Đã ban hành' + (d.soKh ? ' số ' + d.soKh : '') + ' ngày ' + (d.issuedAt || '') }[d.st] || '';
            let a = '--';
            if (d.st === 'CD' && isLeader()) a = '<button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-primary" title="Ký duyệt" onclick="ht3Approve(\'DC\',' + x.k + ')"><i class="fa-solid fa-file-signature"></i></button> <button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-danger" title="Từ chối" onclick="ht3Reject(\'DC\',' + x.k + ')"><i class="fa-solid fa-ban"></i></button>';
            if (d.st === 'BTC' && act) a = '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-pri" onclick="ht3OpenSign(\'DC\',' + x.k + ')"><i class="fa-solid fa-paper-plane"></i> Trình ký lại</button>';
            h += '<tr><td style="text-align:center;">' + (n + 1) + '</td><td>' + d.names.map(esc).join('<br>') + '</td><td>' + (d.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống') + '</td><td>' + esc(st)
                + (d.st === 'BTC' && d.reject ? '<div style="font-size:12px; color:#b91c1c;">Lý do từ chối: ' + esc(d.reject.reason) + '</div>' : '') + '</td><td><a class="action-link" href="javascript:void(0)" onclick="ht3OpenDoc(\'DC\',' + x.k + ')">Xem file</a></td><td style="text-align:center;">' + a + '</td></tr>';
        });
        return h + '</tbody></table>';
    }
    window.ht3DcAll = function (ui, on) { document.querySelectorAll('.htDcChk[data-u="' + ui + '"]').forEach(c => { if (c.offsetParent !== null) c.checked = on; }); ht3DcSync(ui); };
    window.ht3DcSync = function (ui) {
        const vis = Array.from(document.querySelectorAll('.htDcChk[data-u="' + ui + '"]')).filter(c => c.offsetParent !== null);
        const n = vis.filter(c => c.checked).length;
        document.querySelectorAll('.htDcAll[data-u="' + ui + '"]').forEach(a => { if (a.offsetParent !== null) a.checked = vis.length > 0 && n === vis.length; });
        document.querySelectorAll('.htDcBtn[data-u="' + ui + '"]').forEach(b => { if (b.offsetParent === null) return; b.disabled = n === 0; b.innerHTML = '<i class="fa-solid fa-ban"></i> Trình ký QĐ đình chỉ' + (n ? ' (' + n + ')' : ''); });
    };
    // Chọn 01, nhiều hoặc tất cả cán bộ của đơn vị -> 01 QĐ đình chỉ chung
    window.ht3OpenDc = function (ui) {
        const u = activeDossier.htUnits[ui];
        const idxs = Array.from(document.querySelectorAll('.htDcChk[data-u="' + ui + '"]:checked')).filter(c => c.offsetParent !== null).map(c => +c.dataset.idx);
        if (!idxs.length) { showToast('Vui lòng chọn ít nhất 01 cán bộ để trình ký Quyết định đình chỉ.', 'warning'); return; }
        activeDossier.htDcs = activeDossier.htDcs || [];
        DC_DRAFT = { unit: u.unit, names: idxs.map(i => activeDossier.refundOfficers[i].name) };
        ht3OpenSign('DC', activeDossier.htDcs.length);
    };
    function renderStep3New() {
        const panel = el('panelStep3'); if (!panel) return;
        let root = el('ht3Root');
        if (!root) { root = document.createElement('div'); root.id = 'ht3Root'; panel.insertBefore(root, panel.firstChild); }
        Array.from(panel.children).forEach(ch => { if (ch !== root) { ch.dataset.ht3Hide = '1'; ch.style.display = 'none'; } });
        root.style.display = '';
        const units = orderUnits(unitsInView());
        let h = '<div style="margin-bottom:14px;"><h3 style="font-size:16px; font-weight:800; color:var(--primary-color); margin:0; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-file-signature"></i> Ban hành Quyết định hoàn trả</h3></div>';
        if (!units.length) h += '<div class="card"><div class="card-body" style="color:var(--text-muted);">Không có phần đơn vị thuộc phạm vi dữ liệu của người dùng.</div></div>';
        units.forEach(u => {
            const i = activeDossier.htUnits.indexOf(u);
            const tone = u.st !== 'DONE' && allDc(u.unit) ? 'muted' : { CBH: 'warn', CD: 'info', BTC: 'bad', DONE: 'ok' }[u.st];
            const list = officers().map((o, idx) => ({ o, idx })).filter(x => x.o.agency === u.unit);
            h += '<div class="card" style="' + unitCardStyle(u) + '">' + unitHeader(u, 3, badge(u.status, tone)) + '<div class="card-body"' + (unitCollapsed(3, u) ? ' style="display:none;"' : '') + '>'
                + '<div style="font-weight:700; color:var(--primary-color); margin-bottom:8px;"><i class="fa-solid fa-file-contract"></i> Quyết định hoàn trả (Mẫu 36/BTNN)</div>' + qdBlock(u, i)
                + '<div style="display:flex; justify-content:space-between; align-items:flex-end; gap:10px;"><div style="font-weight:700; color:var(--primary-color); margin-bottom:8px;"><i class="fa-solid fa-users"></i> Cán bộ của đơn vị</div>' + dcToolbar(u, i, list) + '</div>'
                + '<table class="dense-table" style="width:100%;"><thead><tr>' + dcHeadCell(u, i, list) + '<th style="width:45px; text-align:center;">STT</th><th>Họ và tên</th><th style="width:90px;">Mức độ lỗi</th><th style="width:150px;">Hình thức xử lý</th><th style="width:140px;">Phương thức hoàn trả</th><th style="width:140px; text-align:right;">Số tiền cần hoàn trả (đ)</th><th style="width:130px; text-align:right;">Số tiền sau giảm (đ)</th><th style="width:230px;">Trạng thái</th><th style="min-width:160px; text-align:center; white-space:nowrap;">Thao tác</th></tr></thead><tbody>'
                + list.map((x, k) => '<tr>' + dcCheckCell(x.o, x.idx, u, i) + '<td style="text-align:center;">' + (k + 1) + '</td><td><strong>' + esc(x.o.name) + '</strong><div style="font-size:12px; color:var(--text-muted);">' + esc(x.o.role || '') + '</div></td><td>' + esc(x.o.loi === 'Khác' ? (x.o.ykhdLoiKhac || 'Khác') : (x.o.loi || '--')) + '</td><td>' + esc(xlText(x.o)) + lyDoNote(x.o) + '</td><td style="white-space:nowrap;' + (xlCode(x.o) === 'MIEN' ? ' text-align:center;' : '') + '">' + (xlCode(x.o) === 'MIEN' ? '--' : esc((window.htMethod ? htMethod(x.o.refundMethod) : x.o.refundMethod) || '--')) + '</td><td style="text-align:right;">' + money(x.o.hd) + '</td><td style="text-align:right;">' + (xlCode(x.o) === 'GIAM' ? money(x.o.giam) : '--') + '</td><td>' + officerStatusCell(x.o, x.idx) + '</td><td class="ht-act-cell">' + actCell(x.o, x.idx, u) + '</td></tr>').join('')
                + '</tbody></table>' + dcBlock(u) + '</div></div>';
        });
        root.innerHTML = h;
    }
    const baseRenderStep3 = window.renderStep3;
    window.renderStep3 = function () {
        if (ensureModel()) { renderStep3New(); return; }
        const root = el('ht3Root'); if (root) root.style.display = 'none';
        const panel = el('panelStep3');
        if (panel) Array.from(panel.children).forEach(ch => { if (ch.dataset.ht3Hide) { delete ch.dataset.ht3Hide; ch.style.display = ''; } });
        baseRenderStep3.apply(this, arguments);
    };
    // Bước mở khóa: Bước 4 khi có cán bộ trong phạm vi đã sang Thu hồi tiền hoàn trả / đã kết thúc
    const baseStep = window.getCurrentWorkflowStep;
    window.getCurrentWorkflowStep = function () {
        if (!ensureModel()) return baseStep();
        const vis = officers().filter(o => !api().officerVisible || api().officerVisible(o));
        if (!vis.length || vis.every(o => STEP3.includes(o.ct))) return 3;
        return vis.some(o => ['THU', 'DONE', 'MIEN', 'DC'].includes(o.ct)) ? 4 : 3;
    };
    // Thanh nút: bỏ thao tác Bước 3 cũ (QĐ hoàn trả 1 lần cho cả hồ sơ)
    const baseActions = window.renderPageHeaderActions;
    window.renderPageHeaderActions = function () {
        baseActions.apply(this, arguments);
        if (!activeDossier || !isSplit()) return;
        const f = el('stickyFooterActionsContainer'); if (!f) return;
        // Sau khi chốt ý kiến Hội đồng: Đình chỉ thực hiện ở cấp cán bộ trong từng phần đơn vị (bỏ nút Đình chỉ cả hồ sơ)
        f.querySelectorAll('button').forEach(b => { if (/submitStep3ForApproval|issueStep3OfflineDecision|handleHeaderApprove|handleHeaderReject|switchToEditMode\((3|4)\)|dchtOpenModal/.test(b.getAttribute('onclick') || '')) b.remove(); });
    };

    // ===== Popup trình ký (chuẩn: Hình thức ký, Stepper 02 bước, nguồn tệp, Tài liệu kèm theo, chọn Lãnh đạo) =====
    let S = null;
    function modalHtml() {
        return '<div id="ht3Modal" style="display:none; position:fixed; inset:0; background:rgba(15,23,42,0.65); z-index:1050; justify-content:center; align-items:center;">'
            + '<div id="ht3Box" style="background:#fff; width:960px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden;">'
            + '<div style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:18px 24px; display:flex; justify-content:space-between;"><div><div id="ht3Title" style="font-size:16.5px; font-weight:700; color:#1e293b;"></div><div id="ht3Sub" style="font-size:12.5px; color:#64748b; margin-top:4px;"></div></div><button type="button" onclick="ht3Close()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer;">&times;</button></div>'
            + '<div id="ht3Stepper" class="ktl-stepper-fullwidth"><div id="ht3Tab1" class="ktl-step-tab active"><span class="ktl-step-badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div><div class="ktl-stepper-sep"></div><div id="ht3Tab2" class="ktl-step-tab"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
            + '<div id="ht3Body1" class="gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
            + '<div id="ht3Returned" style="display:none; background:#fef2f2; border:1px solid #fecaca; border-left:4px solid #dc2626; border-radius:8px; padding:12px 16px; margin-bottom:14px;"></div>'
            // Miễn / Giảm bổ sung (Bước 4): thông tin số tiền, Số tiền sau giảm, Lý do
            + '<div class="gqx-sec" id="ht3Supp" style="display:none;"><div class="gqx-sec-title"><i class="fa-solid fa-scale-balanced"></i> <span id="ht3SuppTitle"></span></div><div id="ht3SuppInfo" style="font-size:13px; margin-bottom:10px;"></div>'
            + '<div class="gqx-field" id="ht3SuppGiamWrap"><label class="form-label">Số tiền sau giảm (đ)<span class="gqx-req">*</span></label><input type="text" id="ht3SuppGiam" class="form-control" placeholder="Nhập số tiền sau giảm" style="text-align:right;" oninput="ht3MoneyIn(this)"><div id="ht3SuppGiamErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field"><label class="form-label"><span id="ht3SuppLyDoLbl"></span><span class="gqx-req">*</span></label><textarea id="ht3SuppLyDo" class="form-control" rows="2" oninput="ht3Clr(\'ht3SuppLyDo\')"></textarea><div id="ht3SuppLyDoErr" class="gqx-err">' + REQ + '</div></div></div>'
            // Đình chỉ cấp cán bộ: danh sách cán bộ được chọn (kế thừa), phương án xử lý số tiền đã thu, lý do / căn cứ đình chỉ
            + '<div class="gqx-sec" id="ht3Dc" style="display:none;"><div class="gqx-sec-title"><i class="fa-solid fa-users"></i> Cán bộ được đình chỉ</div><div id="ht3DcList"></div><div id="ht3DcPaErr" class="gqx-err">Vui lòng chọn phương án xử lý số tiền đã thu cho từng cán bộ.</div></div>'
            + '<div class="gqx-sec" id="ht3DcInfo" style="display:none;"><div class="gqx-sec-title"><i class="fa-solid fa-scale-balanced"></i> Lý do, căn cứ đình chỉ</div>'
            + '<div class="gqx-field"><label class="form-label">Căn cứ<span class="gqx-req">*</span></label><textarea id="ht3DcCanCu" class="form-control" rows="4" maxlength="4000" placeholder="Nhập căn cứ, mỗi căn cứ 01 dòng" oninput="ht3Clr(\'ht3DcCanCu\')"></textarea><div id="ht3DcCanCuErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field"><label class="form-label">Văn bản làm căn cứ yêu cầu bồi thường<span class="gqx-req">*</span></label><textarea id="ht3DcVb" class="form-control" rows="2" maxlength="1000" placeholder="Nhập tên, số hiệu, ngày ban hành, cơ quan ban hành văn bản làm căn cứ yêu cầu bồi thường" oninput="ht3Clr(\'ht3DcVb\')"></textarea><div id="ht3DcVbErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field" style="margin-bottom:0;"><label class="form-label">Nơi nhận</label><textarea id="ht3DcNoiNhan" class="form-control" rows="3" maxlength="2000" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng"></textarea></div></div>'
            + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
            + '<label class="sign-card active" id="ht3CardOn"><input type="radio" name="ht3Method" value="online" checked onchange="ht3SetMethod(\'online\')"><div class="sign-card-content"><div class="sign-card-icon"><i class="fa-solid fa-file-signature"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký số trên hệ thống</div><div class="sign-card-desc">Trình Lãnh đạo ký duyệt trên phần mềm</div></div></div><div class="sign-card-check"><i class="fa-solid fa-circle-check"></i></div></label>'
            + '<label class="sign-card" id="ht3CardOff"><input type="radio" name="ht3Method" value="offline" onchange="ht3SetMethod(\'offline\')"><div class="sign-card-content"><div class="sign-card-icon offline"><i class="fa-solid fa-stamp"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký ngoài (Ban hành trực tiếp)</div><div class="sign-card-desc">Tải lên văn bản PDF đã ký và đóng dấu</div></div></div><div class="sign-card-check"><i class="fa-regular fa-circle"></i></div></label>'
            + '</div></div>'
            + '<div class="gqx-sec" id="ht3DocSec"><div class="gqx-sec-title" id="ht3DocTitle"></div>'
            + '<div id="ht3SrcGroup" class="doc-src-segmented"><button type="button" class="doc-src-seg-btn active" id="ht3SegGen" onclick="ht3SetSrc(\'gen\')"><i class="fa-solid fa-wand-magic-sparkles"></i><span id="ht3SegGenText"></span></button><button type="button" class="doc-src-seg-btn" id="ht3SegUp" onclick="ht3SetSrc(\'upload\')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button></div>'
            + '<div id="ht3Meta" class="tlhd-meta"><div class="tlhd-meta-title" id="ht3MetaTitle"></div><div class="gqx-grid2">'
            + '<div class="gqx-field"><label class="form-label">Số, ký hiệu văn bản<span class="gqx-req">*</span></label><input type="text" id="ht3So" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="ht3Clr(\'ht3So\')"><div id="ht3SoErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field"><label class="form-label">Ngày văn bản<span class="gqx-req">*</span></label><input type="text" id="ht3Ngay" class="form-control" placeholder="dd/mm/yyyy" oninput="ht3Clr(\'ht3Ngay\')"><div id="ht3NgayErr" class="gqx-err">' + REQ + '</div></div>'
            + '</div><div class="tlhd-gen-row" style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:8px;"><div class="gqx-file-hint" id="ht3GenHint"></div><button type="button" class="btn-preview-doc btn btn-secondary btn-sm" onclick="ht3Preview()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div></div>'
            + '<div id="ht3Upload" style="display:none;"><input type="file" id="ht3File" accept=".pdf,.doc,.docx" style="display:none;" onchange="ht3OnFile(this)"><div id="ht3FileBox"></div><div id="ht3FileErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div id="ht3Off" style="display:none;"><input type="file" id="ht3OffFile" accept=".pdf" style="display:none;" onchange="ht3OnFile(this)"><div id="ht3OffBox"></div><div id="ht3OffErr" class="gqx-err">Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.</div><div class="tlhd-status-note" id="ht3OffNote"></div></div>'
            + '</div>'
            + '<div id="ht3Tlkt"></div>'
            + '</div>'
            + '<div id="ht3Body2" style="display:none; flex:1; overflow:hidden; flex-direction:row; background:#334155; min-height:0;">'
            + '<div style="flex:1; overflow:auto; padding:30px 20px; display:flex; justify-content:center;"><div id="ht3A4" class="a4-document-page" style="position:relative;"></div></div>'
            + '<div style="width:370px; min-width:370px; background:#f8fafc; border-left:1px solid #e2e8f0; padding:20px; display:flex; flex-direction:column; gap:14px; overflow-y:auto;"><div style="font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase;"><i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thiết lập vị trí &amp; chữ ký</div><div id="ht3Levels" style="display:flex; flex-direction:column; gap:12px;"></div>'
            + '<div><label class="form-label">Nội dung trình<span class="gqx-req">*</span></label><textarea id="ht3Content" class="form-control" rows="4" placeholder="Nhập nội dung trình Lãnh đạo..." oninput="ht3Clr(\'ht3Content\')"></textarea><div id="ht3ContentErr" class="gqx-err">' + REQ + '</div></div></div></div>'
            + '<div style="padding:16px 28px; display:flex; justify-content:flex-end; gap:10px; background:#f8fafc; border-top:1px solid #e2e8f0;">'
            + '<button type="button" class="btn btn-secondary" onclick="ht3Close()">Hủy bỏ</button>'
            + '<button type="button" id="ht3BtnIssue" class="btn btn-primary" onclick="ht3IssueOffline()" style="display:none;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>'
            + '<button type="button" id="ht3BtnNext" class="btn btn-primary" onclick="ht3Go2()">Tiếp tục <i class="fa-solid fa-arrow-right"></i></button>'
            + '<button type="button" id="ht3BtnBack" class="btn btn-secondary" onclick="ht3Go1()" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>'
            + '<button type="button" id="ht3BtnSubmit" class="btn btn-primary" onclick="ht3Submit()" style="display:none;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>'
            + '</div></div></div>';
    }
    function ensureModal() {
        // Dùng chung CSS popup trình ký chuẩn của trang (TLHD_CSS), đổi phạm vi sang #ht3Modal
        if (!el('ht3Css') && typeof TLHD_CSS === 'string') {
            const st = document.createElement('style'); st.id = 'ht3Css';
            st.textContent = TLHD_CSS.replace(/#tlhdModal/g, '#ht3Modal') + '\n#ht3Modal .sign-card input[type=radio]{position:absolute; opacity:0; pointer-events:none;}';
            document.head.appendChild(st);
        }
        if (!el('ht3Modal')) document.body.insertAdjacentHTML('beforeend', modalHtml());
    }
    window.ht3Clr = id => { const i = el(id); if (i) i.classList.remove('is-invalid'); const e = el(id + 'Err'); if (e) e.style.display = 'none'; };
    window.ht3OpenSign = function (kind, key) {
        ensureModal();
        const ctx = ctxOf(kind, key), prev = recOf(kind, key), k = KIND[kind];
        const rejected = prev && prev.reject && (kind === 'DC' ? prev.st === 'BTC' : kind === 'HT' ? activeDossier.htUnits[key].st === 'BTC' : (k.base ? /^BTC_/.test(activeDossier.refundOfficers[key].trinh || '') : /^BTC_/.test(activeDossier.refundOfficers[key].ct)));
        const levels = levelsOf(ctx.unit);
        S = { kind, key, ctx, method: rejected ? prev.method : 'online', src: rejected ? prev.docSrc : 'gen', file: null, step: 1, levels, assignees: rejected ? prev.assignees.slice() : levels.map(l => l.leaders[0].id), placed: {} };
        el('ht3Title').innerText = 'TRÌNH KÝ ' + k.doc.toUpperCase();
        el('ht3Sub').innerHTML = 'Hồ sơ: <strong>' + esc(activeDossier.code) + '</strong> • Đơn vị ban hành: ' + esc(ctx.unit) + (ctx.officer ? ' • Cán bộ: ' + esc(ctx.officer.name) : '');
        const rb = el('ht3Returned');
        rb.style.display = rejected ? 'block' : 'none';
        if (rejected) rb.innerHTML = '<div style="font-weight:700; color:#b91c1c;">' + esc(k.doc.toUpperCase()) + ' BỊ LÃNH ĐẠO TỪ CHỐI</div><div style="font-size:12.5px; color:#7f1d1d;">Lý do từ chối: <strong>' + esc(prev.reject.reason) + '</strong><br>Người từ chối: ' + esc(prev.reject.by) + ' • Thời điểm: ' + esc(prev.reject.at) + '</div>';
        el('ht3SegGenText').innerText = 'Sinh văn bản theo mẫu ' + k.mau + '/BTNN';
        el('ht3MetaTitle').innerHTML = '<i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu ' + k.mau + '/BTNN';
        el('ht3GenHint').innerText = 'Hệ thống tự động sinh ' + k.doc + ' theo Mẫu ' + k.mau + '/BTNN từ thông tin đang nhập.';
        el('ht3OffNote').innerHTML = '<i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống).';
        el('ht3So').value = rejected ? prev.soKh : '';
        el('ht3Ngay').value = rejected ? prev.ngay : today();
        el('ht3Content').value = rejected ? prev.content : k.content;
        // Miễn / Giảm bổ sung: số tiền hiện tại, số tiền sau giảm mới, lý do
        el('ht3Supp').style.display = k.base ? '' : 'none';
        if (k.base) {
            const o = ctx.officer, giam = k.base === 'GIAM';
            el('ht3SuppTitle').innerText = giam ? 'Thông tin giảm mức hoàn trả bổ sung' : 'Thông tin miễn hoàn trả bổ sung';
            el('ht3SuppInfo').innerHTML = 'Số tiền phải hoàn trả hiện tại: <strong>' + money(o.total) + ' đ</strong> • Đã nộp: <strong>' + money(o.paid) + ' đ</strong> • Còn phải thu: <strong>' + money(Math.max(0, (o.total || 0) - (o.paid || 0))) + ' đ</strong>';
            el('ht3SuppGiamWrap').style.display = giam ? '' : 'none';
            el('ht3SuppGiam').value = rejected && prev.supp && prev.supp.giam ? money(prev.supp.giam) : '';
            el('ht3SuppLyDoLbl').innerText = giam ? 'Lý do giảm' : 'Lý do miễn';
            el('ht3SuppLyDo').placeholder = giam ? 'Nhập lý do giảm mức hoàn trả' : 'Nhập lý do miễn hoàn trả';
            el('ht3SuppLyDo').value = rejected && prev.supp ? prev.supp.lyDo : '';
        }
        // Đình chỉ: kế thừa cán bộ đã chọn; cán bộ đã thu > 0 bắt buộc chọn phương án xử lý số tiền đã thu
        el('ht3Dc').style.display = kind === 'DC' ? '' : 'none';
        el('ht3DcInfo').style.display = kind === 'DC' ? '' : 'none';
        if (kind === 'DC') {
            const pd = rejected && prev.dc ? prev.dc : {};
            el('ht3DcList').innerHTML = '<table class="dense-table" style="width:100%;"><thead><tr><th style="width:45px; text-align:center;">STT</th><th>Họ và tên</th><th style="width:150px;">Trạng thái</th><th style="width:120px; text-align:right;">Đã thu (đ)</th><th style="width:300px;">Phương án xử lý số tiền đã thu</th></tr></thead><tbody>'
                + ctx.list.map((o, n) => '<tr><td style="text-align:center;">' + (n + 1) + '</td><td><strong>' + esc(o.name) + '</strong><div style="font-size:12px; color:var(--text-muted);">' + esc(o.role || '') + '</div></td><td>' + esc(ctText(o.ct)) + '</td><td style="text-align:right;">' + money(o.paid) + '</td><td>'
                    + ((o.paid || 0) > 0
                        ? ['KHONG', 'HOAN'].map(v => '<label style="display:flex; align-items:center; gap:6px; font-weight:400; margin:2px 0;"><input type="radio" name="ht3Pa' + n + '" value="' + v + '"' + ((pd.pa || {})[o.name] === v ? ' checked' : '') + ' onchange="ht3Clr(\'ht3DcPa\')"> ' + (v === 'KHONG' ? 'Không hoàn trả lại số tiền đã thu' : 'Hoàn trả lại số tiền đã thu cho cán bộ') + '</label>').join('')
                        : '<span style="color:var(--text-muted);">--</span>')
                    + '</td></tr>').join('') + '</tbody></table>';
            el('ht3DcCanCu').value = pd.canCu != null ? pd.canCu : (typeof DCHT_CAN_CU_DEFAULT !== 'undefined' ? (Array.isArray(DCHT_CAN_CU_DEFAULT) ? DCHT_CAN_CU_DEFAULT.join('\n') : String(DCHT_CAN_CU_DEFAULT)) : '');
            el('ht3DcVb').value = pd.vbCanCu != null ? pd.vbCanCu : (typeof dchtVbCanCuDefault === 'function' ? dchtVbCanCuDefault() : '');
            el('ht3DcNoiNhan').value = pd.noiNhan != null ? pd.noiNhan : (typeof dchtNoiNhanDefault === 'function' ? dchtNoiNhanDefault() : '');
            el('ht3Sub').innerHTML = 'Hồ sơ: <strong>' + esc(activeDossier.code) + '</strong> • Đơn vị ban hành: ' + esc(ctx.unit) + ' • Số cán bộ: ' + ctx.list.length;
        }
        document.querySelectorAll('#ht3Modal .gqx-err').forEach(e => { e.style.display = 'none'; });
        document.querySelectorAll('#ht3Modal .is-invalid').forEach(e => e.classList.remove('is-invalid'));
        if (typeof tlktMount === 'function') tlktMount('ht3', 'ht3Tlkt', { required: false, rows: rejected ? (prev.tlkt || []) : [], secClass: 'gqx-sec', titleClass: 'gqx-sec-title' });
        document.querySelector('input[name="ht3Method"][value="' + S.method + '"]').checked = true;
        ht3SetSrc(S.src);
        ht3SetMethod(S.method);
        el('ht3Modal').style.display = 'flex';
    };
    window.ht3Close = () => { const m = el('ht3Modal'); if (m) m.style.display = 'none'; S = null; DC_DRAFT = null; };
    window.ht3SetMethod = function (m) {
        S.method = m === 'offline' ? 'offline' : 'online';
        const on = S.method === 'online';
        [['ht3CardOn', on], ['ht3CardOff', !on]].forEach(([id, act]) => {
            const c = el(id); c.classList.toggle('active', act);
            const ic = c.querySelector('.sign-card-check i'); if (ic) ic.className = act ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
        });
        el('ht3Stepper').style.display = on ? 'flex' : 'none';
        el('ht3SrcGroup').style.display = on ? '' : 'none';
        el('ht3Meta').style.display = on && S.src === 'gen' ? '' : 'none';
        el('ht3Upload').style.display = on && S.src === 'upload' ? '' : 'none';
        el('ht3Off').style.display = on ? 'none' : '';
        el('ht3Tlkt').style.display = on ? '' : 'none';
        el('ht3DocTitle').innerHTML = on ? '<i class="fa-solid fa-file-signature"></i> Tệp văn bản trình ký<span class="gqx-req">*</span>' : '<i class="fa-solid fa-file-pdf"></i> Tệp văn bản đã ký &amp; đóng dấu<span class="gqx-req">*</span>';
        S.file = null; renderFileBoxes();
        ht3Go1();
    };
    window.ht3SetSrc = function (src) {
        S.src = src === 'upload' ? 'upload' : 'gen';
        el('ht3SegGen').classList.toggle('active', S.src === 'gen'); el('ht3SegUp').classList.toggle('active', S.src === 'upload');
        el('ht3Meta').style.display = S.method === 'online' && S.src === 'gen' ? '' : 'none';
        el('ht3Upload').style.display = S.method === 'online' && S.src === 'upload' ? '' : 'none';
        S.file = null; renderFileBoxes();
    };
    function dropHtml(inputId, main, sub) {
        return '<div class="tlhd-drop" tabindex="0" role="button" onclick="document.getElementById(\'' + inputId + '\').click()"><i class="fa-solid fa-cloud-arrow-up tlhd-drop-ico"></i><div class="tlhd-drop-main">' + main + '</div><div class="tlhd-drop-sub">' + sub + '</div></div>';
    }
    function cardHtml(f) {
        return '<div style="display:flex; justify-content:space-between; align-items:center; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px;"><span><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> <strong>' + esc(f.name) + '</strong> <small>(' + Math.max(1, Math.round((f.size || 1024) / 1024)) + ' KB)</small></span><span><a class="action-link" href="javascript:void(0)" onclick="showToast(\'Đang mở xem tệp ' + esc(f.name) + '\', \'info\')">Xem file</a> &nbsp; <a class="action-link" href="javascript:void(0)" onclick="ht3RemoveFile()">Xóa</a></span></div>';
    }
    function renderFileBoxes() {
        if (!S) return;
        el('ht3FileBox').innerHTML = S.file && S.method === 'online' ? cardHtml(S.file) : dropHtml('ht3File', 'Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a>', 'Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)');
        el('ht3OffBox').innerHTML = S.file && S.method === 'offline' ? cardHtml(S.file) : dropHtml('ht3OffFile', 'Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a>', '(Chỉ chấp nhận .pdf, tối đa 50MB)');
    }
    window.ht3RemoveFile = () => { S.file = null; renderFileBoxes(); };
    window.ht3OnFile = function (input) {
        const f = input.files && input.files[0]; input.value = '';
        if (!f) return;
        const ext = (f.name.split('.').pop() || '').toLowerCase();
        const ok = S.method === 'offline' ? ext === 'pdf' : ['pdf', 'doc', 'docx'].includes(ext);
        const err = el(S.method === 'offline' ? 'ht3OffErr' : 'ht3FileErr');
        if (!ok || f.size > 50 * 1048576) { err.innerText = !ok ? 'Tệp không đúng định dạng.' : 'Tệp vượt quá dung lượng cho phép (tối đa 50MB).'; err.style.display = 'block'; return; }
        err.style.display = 'none';
        S.file = { name: f.name, size: f.size };
        renderFileBoxes();
    };
    window.ht3MoneyIn = function (input) { const n = parseInt(String(input.value).replace(/\D/g, ''), 10) || 0; input.value = n ? money(n) : ''; ht3Clr(input.id); };
    function readSupp() {
        if (!S || !KIND[S.kind].base) return null;
        return { giam: parseInt(String(el('ht3SuppGiam').value).replace(/\D/g, ''), 10) || 0, lyDo: el('ht3SuppLyDo').value.trim() };
    }
    function readDc() {
        if (!S || S.kind !== 'DC') return null;
        const pa = {};
        S.ctx.list.forEach((o, n) => { const c = document.querySelector('input[name="ht3Pa' + n + '"]:checked'); if (c) pa[o.name] = c.value; });
        return { pa, canCu: el('ht3DcCanCu').value, vbCanCu: el('ht3DcVb').value.trim(), noiNhan: el('ht3DcNoiNhan').value };
    }
    function curDocHtml() { return docHtml(S.kind, Object.assign({}, S.ctx, { supp: readSupp(), dc: readDc() }), el('ht3So').value.trim(), el('ht3Ngay').value.trim()); }
    window.ht3Preview = function () {
        const page = '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Xem trước văn bản<\/title><style>body{background:#e2e8f0;margin:0;padding:24px;}.page{width:794px;min-height:1123px;margin:0 auto;background:#fff;padding:50px 65px;box-sizing:border-box;font-family:"Times New Roman",serif;font-size:14px;line-height:1.6;}<\/style><\/head><body><div class="page">' + curDocHtml() + '<\/div><\/bo' + 'dy><\/ht' + 'ml>';
        try { window.open(URL.createObjectURL(new Blob([page], { type: 'text/html;charset=utf-8' })), '_blank'); } catch (e) { /* bỏ qua */ }
    };
    function validate1() {
        let first = null;
        const mark = (id, errId) => { const i = el(id); if (i) i.classList.add('is-invalid'); const e = el(errId || id + 'Err'); if (e) e.style.display = 'block'; if (!first) first = i || e; };
        const sp = readSupp();
        if (sp) {
            if (KIND[S.kind].base === 'GIAM') {
                const tot = S.ctx.officer.total || 0;
                if (!el('ht3SuppGiam').value.trim()) mark('ht3SuppGiam');
                else if (!(sp.giam > 0 && sp.giam < tot)) { el('ht3SuppGiamErr').innerText = 'Số tiền sau giảm phải lớn hơn 0 và nhỏ hơn số tiền phải hoàn trả hiện tại.'; mark('ht3SuppGiam'); }
            }
            if (!sp.lyDo) mark('ht3SuppLyDo');
        }
        const dc = readDc();
        if (dc) {
            if (S.ctx.list.some(o => (o.paid || 0) > 0 && !dc.pa[o.name])) mark('ht3DcList', 'ht3DcPaErr');
            if (!dc.canCu.trim()) mark('ht3DcCanCu');
            if (!dc.vbCanCu) mark('ht3DcVb');
        }
        if (S.method === 'offline') { if (!S.file) mark('ht3OffBox', 'ht3OffErr'); }
        else if (S.src === 'gen') { if (!el('ht3So').value.trim()) mark('ht3So'); if (!el('ht3Ngay').value.trim()) mark('ht3Ngay'); }
        else if (!S.file) mark('ht3FileBox', 'ht3FileErr');
        if (!first && S.method === 'online' && typeof tlktValidate === 'function' && !tlktValidate('ht3')) return false;
        if (first) { if (first.focus) first.focus(); return false; }
        return true;
    }
    window.ht3Go1 = function () {
        if (!S) return;
        S.step = 1;
        el('ht3Box').style.width = '960px'; el('ht3Box').style.height = 'auto';
        el('ht3Tab1').className = 'ktl-step-tab active'; el('ht3Tab2').className = 'ktl-step-tab';
        el('ht3Body1').style.display = 'block'; el('ht3Body2').style.display = 'none';
        const off = S.method === 'offline';
        el('ht3BtnNext').style.display = off ? 'none' : 'inline-flex';
        el('ht3BtnIssue').style.display = off ? 'inline-flex' : 'none';
        el('ht3BtnBack').style.display = 'none'; el('ht3BtnSubmit').style.display = 'none';
    };
    function renderLevels() {
        el('ht3Levels').innerHTML = S.levels.map((lv, i) => '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:12px;">'
            + '<div style="font-weight:700; font-size:13px;">Cấp ' + (i + 1) + ' - ' + esc(lv.unit) + (lv.kyNhay ? ' <span class="badge" style="background:#e0f2fe; color:#0369a1; font-size:11px;">Ký nháy</span>' : '') + '</div>'
            + '<label class="form-label" style="margin-top:8px;">Lãnh đạo<span class="gqx-req">*</span></label><select class="form-control" onchange="ht3Pick(' + i + ', this.value)">' + lv.leaders.map(ld => '<option value="' + ld.id + '"' + (S.assignees[i] === ld.id ? ' selected' : '') + '>' + esc(ld.label) + '</option>').join('') + '</select>'
            + '<button type="button" class="btn btn-secondary btn-sm" style="margin-top:8px;" onclick="ht3Place(' + i + ')">' + (S.placed[i] ? '<i class="fa-solid fa-check"></i> Đã đặt chữ ký' : '<i class="fa-solid fa-signature"></i> Đặt chữ ký') + '</button>'
            + (i === S.levels.length - 1 ? '<div id="ht3PlaceErr" class="gqx-err">Vui lòng đặt chữ ký của Lãnh đạo cấp cuối.</div>' : '') + '</div>').join('');
    }
    window.ht3Pick = (i, v) => { S.assignees[i] = v; };
    window.ht3Place = function (i) {
        S.placed[i] = true;
        const a4 = el('ht3A4');
        if (!a4.querySelector('[data-lv="' + i + '"]')) {
            const lv = S.levels[i], last = i === S.levels.length - 1;
            a4.insertAdjacentHTML('beforeend', '<div data-lv="' + i + '" style="position:absolute; right:' + (last ? 90 : 330) + 'px; bottom:' + (last ? 120 : 60) + 'px; border:2px dashed ' + (last ? '#dc2626' : '#2563eb') + '; padding:8px 12px; font:12px Arial; background:rgba(255,255,255,.9);">' + (last ? 'KÝ SỐ &amp; CON DẤU' : 'KÝ NHÁY') + '<br>Cấp ' + (i + 1) + '</div>');
        }
        const e = el('ht3PlaceErr'); if (e && i === S.levels.length - 1) e.style.display = 'none';
        renderLevels();
    };
    window.ht3Go2 = function () {
        if (!S || S.method !== 'online' || !validate1()) return;
        S.step = 2;
        el('ht3A4').innerHTML = S.src === 'gen' ? curDocHtml() : '<div style="padding:40px; text-align:center;"><i class="fa-solid fa-file-pdf" style="font-size:40px; color:#dc2626;"></i><p>' + esc(S.file.name) + '</p></div>';
        S.placed = {};
        el('ht3Box').style.width = '1250px'; el('ht3Box').style.height = '94vh';
        el('ht3Tab1').className = 'ktl-step-tab completed'; el('ht3Tab2').className = 'ktl-step-tab active';
        el('ht3Body1').style.display = 'none'; el('ht3Body2').style.display = 'flex';
        el('ht3BtnNext').style.display = 'none'; el('ht3BtnIssue').style.display = 'none';
        el('ht3BtnBack').style.display = 'inline-flex'; el('ht3BtnSubmit').style.display = 'inline-flex';
        renderLevels();
    };
    function newRec(method) {
        const k = KIND[S.kind];
        return {
            kind: S.kind, method, docSrc: method === 'offline' ? '' : S.src, soKh: method === 'online' && S.src === 'gen' ? el('ht3So').value.trim() : '',
            ngay: method === 'online' && S.src === 'gen' ? el('ht3Ngay').value.trim() : today(),
            fileName: S.file ? S.file.name : k.file + '_' + (activeDossier.maVuViec || activeDossier.code) + '.docx',
            tlkt: method === 'online' && typeof tlktGet === 'function' ? tlktGet('ht3') : [],
            levels: S.levels, assignees: S.assignees.slice(), content: el('ht3Content').value.trim(), level: 0,
            hist: (recOf(S.kind, S.key) || { hist: [] }).hist.slice(), supp: readSupp(),
            dc: readDc(), unit: S.ctx.unit, names: (S.ctx.list || []).map(o => o.name)
        };
    }
    window.ht3Submit = function () {
        if (!S) return;
        let bad = false;
        if (!el('ht3Content').value.trim()) { el('ht3Content').classList.add('is-invalid'); el('ht3ContentErr').style.display = 'block'; bad = true; }
        if (!S.placed[S.levels.length - 1]) { const e = el('ht3PlaceErr'); if (e) e.style.display = 'block'; bad = true; }
        if (bad) return;
        const r = newRec('online');
        r.hist.unshift({ type: 'submit', name: 'Cán bộ ' + S.ctx.unit, at: nowShort(), msg: 'Trình Lãnh đạo ' + leaderLabel(r, 0) + ' ký duyệt. Nội dung trình: ' + r.content });
        const kind = S.kind, key = S.key;
        setRec(kind, key, r);
        if (kind === 'DC') { r.st = 'CD'; S.ctx.list.forEach(o => { o.trinh = 'CD_DC'; o.dcKey = key; }); DC_DRAFT = null; }
        else if (kind === 'HT') { const u = activeDossier.htUnits[key]; u.st = 'CD'; officers().filter(o => o.agency === u.unit && o.ct !== 'DC').forEach(o => { o.ct = 'CD_HT'; }); }
        else if (KIND[kind].base) activeDossier.refundOfficers[key].trinh = 'CD_' + KIND[kind].base; // trình bổ sung: cán bộ vẫn Thu hồi tiền hoàn trả
        else activeDossier.refundOfficers[key].ct = 'CD_' + kind;
        ht3Close();
        commit('Trình ký ' + KIND[kind].doc + ' thành công.');
    };
    window.ht3IssueOffline = function () {
        if (!S || !validate1()) return;
        const kind = S.kind, key = S.key;
        const go = () => {
            const r = newRec('offline');
            r.hist.unshift({ type: 'approve', name: 'Cán bộ ' + S.ctx.unit, at: nowShort(), msg: 'Ban hành ' + KIND[kind].doc + ' ký ngoài hệ thống (tệp ' + r.fileName + ').' });
            setRec(kind, key, r);
            ht3Close();
            issue(kind, key, 'Ban hành ' + KIND[kind].doc + ' thành công.');
        };
        const msg = 'Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Bạn có chắc chắn muốn ban hành văn bản?';
        if (api().confirmBox) api().confirmBox('Xác nhận ban hành văn bản', msg, 'Ban hành', go);
        else if (typeof showCustomConfirm === 'function') showCustomConfirm(msg, go); else go();
    };
    // Ban hành: Tầng 1 (QĐ hoàn trả) định tuyến từng cán bộ; Tầng 2 (QĐ miễn / giảm) chuyển trạng thái cán bộ
    function issue(kind, key, msg) {
        const r = recOf(kind, key);
        r.issuedAt = today();
        r.level = r.levels.length;
        if (kind === 'DC') {
            // Ban hành QĐ đình chỉ: phương án (1) / chưa thu -> Đình chỉ hoàn trả; phương án (2) -> chờ Cập nhật trả lại tiền rồi mới Đình chỉ hoàn trả
            r.st = 'DONE';
            ctxOf('DC', key).list.forEach(o => {
                o.dcKey = key;
                if ((o.paid || 0) > 0 && r.dc && r.dc.pa[o.name] === 'HOAN') { o.trinh = 'TL_DC'; o.refund = o.paid; o.total = o.paid; } // dừng thu hồi: không còn số phải thu
                else { o.ct = 'DC'; o.trinh = ''; o.total = o.paid || 0; o.refund = 0; }
            });
        } else if (kind === 'HT') {
            const u = activeDossier.htUnits[key];
            u.st = 'DONE';
            officers().filter(o => o.agency === u.unit && o.ct !== 'DC').forEach(o => { const x = xlCode(o); o.ct = x === 'HT' ? 'THU' : 'CBH_' + x; o.total = o.hd; });
        } else if (KIND[kind].base) {
            // Miễn / Giảm bổ sung khi đang thu hồi
            const o = activeDossier.refundOfficers[key], sp = r.supp || {};
            o.trinh = '';
            if (kind === 'SMIEN') { o.ct = 'MIEN'; o.total = o.paid || 0; o.refund = 0; }
            else {
                o.total = sp.giam;
                const paid = o.paid || 0;
                if (sp.giam > paid) { o.ct = 'THU'; o.refund = 0; }
                else if (sp.giam === paid) { o.ct = 'DONE'; o.refund = 0; }
                else { o.ct = 'THU'; o.refund = paid - sp.giam; } // nộp thừa: chờ cập nhật trả lại tiền
            }
        } else {
            const o = activeDossier.refundOfficers[key];
            if (kind === 'MIEN') o.ct = 'MIEN';
            else { o.ct = 'THU'; o.total = o.giam; }
        }
        commit(msg);
    }

    // ===== Ký duyệt / Từ chối của Lãnh đạo (màn Ký duyệt / Từ chối chung của trang) =====
    const tgt = (kind, key) => 'ht3|' + kind + '|' + key;
    const parse = t => { const m = /^ht3\|(HT|MIEN|GIAM|SMIEN|SGIAM|DC)\|(\d+)$/.exec(t || ''); return m ? { kind: m[1], key: +m[2] } : null; };
    window.ht3OpenDoc = function (kind, key) {
        const r = recOf(kind, key); if (!r) return;
        if (r.method === 'offline' || r.docSrc === 'upload') { showToast('Đang mở xem tệp tin: ' + r.fileName, 'info'); return; }
        const html = docHtml(kind, ctxOf(kind, key), r.soKh, r.issuedAt || r.ngay);
        const page = '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>' + esc(r.fileName) + '<\/title><style>body{background:#e2e8f0;margin:0;padding:24px;}.page{width:794px;min-height:1123px;margin:0 auto;background:#fff;padding:50px 65px;box-sizing:border-box;font-family:"Times New Roman",serif;font-size:14px;line-height:1.6;}<\/style><\/head><body><div class="page">' + html + '<\/div><\/bo' + 'dy><\/ht' + 'ml>';
        try { window.open(URL.createObjectURL(new Blob([page], { type: 'text/html;charset=utf-8' })), '_blank'); } catch (e) { /* bỏ qua */ }
    };
    window.ht3Approve = function (kind, key) {
        openLeaderSignModal(tgt(kind, key));
        const r = recOf(kind, key);
        const s = el('m20Summary'); if (s) s.innerText = r.content || '';
        const t = el('m20Tlkt'); if (t) t.innerHTML = r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function' ? tlktViewHtml(r.tlkt) : '';
    };
    window.ht3Reject = function (kind, key) {
        openRejectReasonModal(tgt(kind, key));
        const r = recOf(kind, key);
        const t = el('rejectTlkt'); if (t) t.innerHTML = r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function' ? tlktViewHtml(r.tlkt) : '';
    };
    const baseCtx = window.kdtcHtCtx;
    window.kdtcHtCtx = function (target) {
        const p = parse(target); if (!p) return baseCtx(target);
        const r = recOf(p.kind, p.key), k = KIND[p.kind];
        const ok = p.kind === 'DC' ? 'Đình chỉ hoàn trả' : p.kind === 'HT' ? 'Đã ban hành QĐ hoàn trả' : (baseKind(p.kind) === 'MIEN' ? 'Miễn hoàn trả' : 'Thu hồi tiền hoàn trả');
        return { kind: k.doc + ' (Mẫu số ' + k.mau + '/BTNN)', title: k.title, content: r.content, hist: r.hist.map(h => ({ type: h.type, name: h.name, at: h.at, msg: h.msg })), levels: r.levels, level: Math.min(r.level, r.levels.length - 1), label: i => r.levels[i].unit + ': ' + leaderLabel(r, i), staff: 'Cán bộ ' + ctxOf(p.kind, p.key).unit, okStatus: ok, noStatus: 'Bị từ chối (' + k.label + ')' };
    };
    const baseDocInfo = window.htkdDocInfo;
    window.htkdDocInfo = function (target) {
        const p = parse(target); if (!p) return baseDocInfo(target);
        const r = recOf(p.kind, p.key);
        const html = r.docSrc === 'gen' ? docHtml(p.kind, ctxOf(p.kind, p.key), r.soKh, r.ngay) : '';
        return { name: r.fileName, html, open: () => ht3OpenDoc(p.kind, p.key) };
    };
    const baseConfirm = window.confirmLeaderDigitalSign;
    window.confirmLeaderDigitalSign = function () {
        const p = parse(pendingLeaderSignTarget); if (!p) return baseConfirm();
        closeLeaderSignModal();
        const r = recOf(p.kind, p.key);
        const note = (el('kdtcHtNote') || {}).value || '';
        r.hist.unshift({ type: 'approve', name: leaderLabel(r, r.level), at: nowShort(), msg: note ? 'Ý kiến: ' + note : 'Ký duyệt' });
        if (r.level < r.levels.length - 1) {
            r.level++;
            commit('Ký duyệt thành công. Hồ sơ chuyển Lãnh đạo cấp ' + (r.level + 1) + ' - ' + r.levels[r.level].unit + '.');
            return;
        }
        if (!r.soKh) r.soKh = (Math.floor(Math.random() * 90) + 10) + '/QĐ-UBND';
        issue(p.kind, p.key, 'Ký duyệt và ban hành ' + KIND[p.kind].doc + ' thành công.');
    };
    const baseReject = window.submitRejectReason;
    window.submitRejectReason = function () {
        const p = parse(pendingRejectTarget); if (!p) return baseReject();
        const input = el('rejectReasonInput'), err = el('rejectReasonError');
        const reason = input.value.trim();
        if (!reason) { input.classList.add('is-invalid'); err.style.display = 'block'; input.focus(); return; }
        const r = recOf(p.kind, p.key);
        r.reject = { reason, by: leaderLabel(r, r.level), at: nowShort() };
        r.hist.unshift({ type: 'reject', name: r.reject.by, at: r.reject.at, msg: 'Lý do: ' + reason });
        r.level = 0;
        if (p.kind === 'DC') { r.st = 'BTC'; ctxOf('DC', p.key).list.forEach(o => { o.trinh = 'BTC_DC'; }); }
        else if (p.kind === 'HT') { const u = activeDossier.htUnits[p.key]; u.st = 'BTC'; officers().filter(o => o.agency === u.unit && o.ct !== 'DC').forEach(o => { o.ct = 'BTC_HT'; }); }
        else if (KIND[p.kind].base) activeDossier.refundOfficers[p.key].trinh = 'BTC_' + KIND[p.kind].base;
        else activeDossier.refundOfficers[p.key].ct = 'BTC_' + p.kind;
        closeRejectReasonModal();
        commit('Đã từ chối ' + KIND[p.kind].doc + '. Hồ sơ chuyển trạng thái Bị từ chối.');
    };

    // ===== Badge trạng thái đầu màn: trạng thái chung theo phạm vi người xem (cùng quy tắc roll-up với màn danh sách) =====
    // Màu badge trạng thái chung (đồng bộ màn danh sách)
    const CHUNG_TONE = { 'Chờ duyệt': '#ede9fe;color:#6d28d9;border:1px solid #ddd6fe', 'Bị từ chối': '#fef2f2;color:#dc2626;border:1px solid #fecaca', 'Chờ xử lý': '#fffbeb;color:#b45309;border:1px solid #fde68a', 'Đang xử lý': '#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe', 'Thu hồi tiền hoàn trả': '#f0fdfa;color:#0d9488;border:1px solid #99f6e4', 'Miễn hoàn trả': '#fdf2f8;color:#be185d;border:1px solid #fbcfe8', 'Hoàn thành': '#ecfdf5;color:#047857;border:1px solid #a7f3d0', 'Đình chỉ xem xét hoàn trả': '#f1f5f9;color:#475569;border:1px solid #cbd5e1' };
    const HS_TRINH = { 'Chờ duyệt QĐ thành lập': ['Chờ duyệt', 'QĐ thành lập hội đồng'], 'Chờ duyệt thành lập hội đồng': ['Chờ duyệt', 'QĐ thành lập hội đồng'], 'Bị từ chối thành lập HĐ': ['Bị từ chối', 'QĐ thành lập hội đồng'], 'Từ chối duyệt QĐ thành lập': ['Bị từ chối', 'QĐ thành lập hội đồng'], 'Chờ duyệt QĐ đình chỉ': ['Chờ duyệt', 'QĐ đình chỉ'], 'Bị từ chối QĐ đình chỉ': ['Bị từ chối', 'QĐ đình chỉ'] };
    function chungDetail() {
        if (!ensureModel()) {
            const s = activeDossier.status;
            if (HS_TRINH[s]) return { g: HS_TRINH[s][0], loai: HS_TRINH[s][1], lines: [] };
            return { g: HS_GROUP[s] || (CHUNG_TONE[s] ? s : 'Chờ xử lý'), lines: [] };
        }
        const inView = unitsInView().map(u => u.unit);
        const vis = officers().filter(o => inView.includes(o.agency));
        // Thứ tự: trạng thái đích (100% kết thúc) > Thu hồi tiền hoàn trả > Đang xử lý > Chờ xử lý
        const ended = o => ENDED.includes(o.ct) && !o.trinh;
        let chung = 'Chờ xử lý';
        if (vis.length && vis.every(ended)) chung = vis.every(o => o.ct === 'DC') ? 'Đình chỉ xem xét hoàn trả' : (vis.every(o => o.ct === 'MIEN') ? 'Miễn hoàn trả' : 'Hoàn thành');
        else if (vis.some(o => o.ct === 'THU')) chung = 'Thu hồi tiền hoàn trả';
        else if (vis.some(o => !['CBH_HT', 'BTC_HT', 'DC'].includes(o.ct) || /^CD_/.test(o.trinh || ''))) chung = 'Đang xử lý';
        const m = new Map();
        vis.forEach(o => { const k = ctText(o.ct) + (o.trinh ? ' - ' + ctText(o.trinh) : ''); m.set(k, (m.get(k) || 0) + 1); });
        return { g: chung, lines: Array.from(m.entries()).map(([k, n]) => k + ': ' + n + ' cán bộ') };
    }
    window.htChungDetail = chungDetail;
    window.getDossierStatusBadge = function () {
        const c = chungDetail();
        // Chỉ 01 badge trạng thái chung (trạng thái chi tiết xem tại từng bước)
        return '<span style="display:inline-flex; flex-direction:column; align-items:flex-start;"><span class="badge" id="htChungBadge" style="background:' + (CHUNG_TONE[c.g] || CHUNG_TONE['Chờ xử lý']) + '; font-weight:700; font-size:12px; padding:4px 10px;">' + esc(c.g) + '</span>'
            + (c.loai ? '<span id="htLoaiTrinh" style="font-size:11px; font-weight:400; color:#64748b; margin-top:2px;">' + esc(c.loai) + '</span>' : '') + '</span>';
    };

    window.ht3Api = {
        dcCheckCell, dcHeadCell, dcToolbar, dcBlock, dcLine, dcEligible, unitHeader, unitCollapsed, orderUnits, unitCardStyle,
        unitBadge: u => badge(u.status, u.st !== 'DONE' && allDc(u.unit) ? 'muted' : { CBH: 'warn', CD: 'info', BTC: 'bad', DONE: 'ok' }[u.st]),
        ensureModel, recOf, units: () => activeDossier.htUnits, persist, setFile: f => { if (S) { S.file = f; renderFileBoxes(); } },
        // Dùng cho Bước 4 (chi_tiet_ho_so_hoan_tra_thu.js)
        commit, officers, unitsInView, canActUnit, isLeader, scope, myUnit, xlCode, ctText, CT, money, esc, today, nowShort, tgt
    };
    document.addEventListener('DOMContentLoaded', () => { if (ensureModel()) { recomputeBase(); persist(); renderStateLayout(); } });
})();
