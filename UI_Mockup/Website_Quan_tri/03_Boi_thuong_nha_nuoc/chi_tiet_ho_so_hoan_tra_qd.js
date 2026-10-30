/*
 * Chi tiết hồ sơ hoàn trả - Prompt 3: Bước 3 Ban hành QĐ, trình ký 02 tầng tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại.
 * - Tầng 1: mỗi phần đơn vị trình ký / ban hành 01 Quyết định hoàn trả (Mẫu 36/BTNN) chung cho các cán bộ của đơn vị.
 * - Tầng 2: sau khi QĐ hoàn trả ban hành, tự định tuyến từng cán bộ (không qua QĐ miễn / QĐ giảm riêng):
 *   + Không giảm, không miễn -> Thu tiền hoàn trả; Giảm -> Thu tiền hoàn trả theo Số tiền sau giảm; Miễn -> Miễn hoàn trả.
 * - Bước 4: chọn 01 / nhiều cán bộ của phần đơn vị -> 01 QĐ miễn (Mẫu 38) / QĐ giảm (Mẫu 37) bổ sung chung (activeDossier.htMgs).
 * - Popup trình ký theo chuẩn: Hình thức ký (Ký số / Ký ngoài), Stepper 02 bước, Sinh văn bản theo mẫu | Tải lên từ máy, Tài liệu đính kèm, chọn Lãnh đạo theo luồng (giả lập 02 cấp).
 * - Ký duyệt / Từ chối: dùng màn Ký duyệt / Từ chối chung của trang (leaderSignApprovalModal / rejectReasonModal).
 * - Lưu trạng thái cán bộ theo đơn vị vào localStorage 'btnn_ht_units_v1' để màn danh sách tổng hợp trạng thái chung.
 * Nạp sau chi_tiet_ho_so_hoan_tra_ykhd.js.
 */
(function () {
    const STORE_KEY = 'btnn_ht_units_v1';
    const CT = {
        CBH_HT: ['Chờ ban hành QĐ hoàn trả', ''], CD_HT: ['Chờ duyệt', 'QĐ hoàn trả'], BTC_HT: ['Bị trả lại', 'QĐ hoàn trả'],
        CBH_MIEN: ['Chờ ban hành QĐ Miễn hoàn trả', ''], CD_MIEN: ['Chờ duyệt', 'QĐ miễn hoàn trả'], BTC_MIEN: ['Bị trả lại', 'QĐ miễn hoàn trả'],
        CBH_GIAM: ['Chờ ban hành QĐ Giảm mức hoàn trả', ''], CD_GIAM: ['Chờ duyệt', 'QĐ giảm mức hoàn trả'], BTC_GIAM: ['Bị trả lại', 'QĐ giảm mức hoàn trả'],
        THU: ['Thu tiền hoàn trả', ''], MIEN: ['Miễn hoàn trả', ''], DONE: ['Hoàn thành', ''], DC: ['Đình chỉ hoàn trả', ''],
        // Trình ký QĐ đình chỉ cấp cán bộ (o.trinh) và chờ trả lại tiền sau khi ban hành QĐ đình chỉ (phương án hoàn trả lại số tiền đã thu)
        CD_DC: ['Chờ duyệt', 'QĐ đình chỉ'], BTC_DC: ['Bị trả lại', 'QĐ đình chỉ'], TL_DC: ['Chờ trả lại tiền', 'Đình chỉ hoàn trả']
    };
    // Trạng thái chung (roll-up) - cùng quy tắc với màn danh sách
    const GROUP = {
        CBH_HT: 'Chờ xử lý', BTC_HT: 'Chờ xử lý', CBH_MIEN: 'Chờ xử lý', BTC_MIEN: 'Chờ xử lý', CBH_GIAM: 'Chờ xử lý', BTC_GIAM: 'Chờ xử lý', BTC_DC: 'Chờ xử lý',
        CD_HT: 'Đang xử lý', CD_MIEN: 'Đang xử lý', CD_GIAM: 'Đang xử lý', CD_DC: 'Đang xử lý', TL_DC: 'Thu tiền hoàn trả',
        THU: 'Thu tiền hoàn trả', MIEN: 'Miễn hoàn trả', DONE: 'Hoàn thành', DC: 'Đình chỉ xem xét hoàn trả'
    };
    const HS_GROUP = {
        'Chờ thành lập hội đồng': 'Chờ xử lý', 'Bị trả lại thành lập HĐ': 'Chờ xử lý', 'Từ chối duyệt QĐ thành lập': 'Chờ xử lý', 'Bị trả lại QĐ đình chỉ': 'Chờ xử lý', 'Họp hội đồng': 'Chờ xử lý',
        'Chờ duyệt QĐ thành lập': 'Đang xử lý', 'Chờ duyệt thành lập hội đồng': 'Đang xử lý', 'Chờ duyệt QĐ đình chỉ': 'Đang xử lý',
        'Đình chỉ xem xét hoàn trả': 'Đình chỉ xem xét hoàn trả'
    };
    const STEP3 = ['CBH_HT', 'CD_HT', 'BTC_HT', 'CBH_MIEN', 'CD_MIEN', 'BTC_MIEN', 'CBH_GIAM', 'CD_GIAM', 'BTC_GIAM'];
    const ENDED = ['MIEN', 'DONE', 'DC'];
    // Dữ liệu mẫu (đồng bộ màn danh sách)
    const SEED = {
        'Nguyễn Văn Đạt': ['DONE', 'HT'], 'Lê Văn Cường': ['THU', 'HT'], 'Hoàng Văn D': ['THU', 'GIAM', 11000000], 'Trần Thị Bình': ['THU', 'HT'],
        'Hoàng Thị M': ['THU', 'HT'], 'Phạm Văn Thiếu Sót': ['DONE', 'HT'], 'Trần Văn Lỗi': ['MIEN', 'MIEN'], 'Vũ Văn Tài': ['CBH_HT', 'HT'],
        'Ngô Quyền': ['BTC_HT', 'HT'], 'Nguyễn Văn Chết': ['DC', 'HT'], 'Lưu Quốc Toàn': ['MIEN', 'MIEN'], 'Bùi Văn Nam': ['BTC_HT', 'HT'],
        'Phạm Quốc Huy': ['CD_HT', 'HT'], 'Đặng Thị Lan': ['CBH_HT', 'HT']
    };
    // Dữ liệu mẫu bổ sung (ht_du_lieu_mau.js): [ct, xl, giam, { paid, trinh, refund, total, qd2: 'CD'|'BTC', dc: { key, st, pa } }]
    Object.assign(SEED, window.HT_EXTRA_SEED || {});
    const KIND = {
        HT: { mau: '36', label: 'QĐ hoàn trả', doc: 'Quyết định hoàn trả', title: 'QUYẾT ĐỊNH VỀ VIỆC HOÀN TRẢ', file: 'Mau_36_BTNN_Quyet_dinh_hoan_tra', content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định hoàn trả.' },
        MIEN: { mau: '38', label: 'QĐ miễn hoàn trả', doc: 'Quyết định miễn hoàn trả', title: 'QUYẾT ĐỊNH VỀ VIỆC MIỄN HOÀN TRẢ', file: 'Mau_38_BTNN_Quyet_dinh_mien_hoan_tra', content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định miễn hoàn trả.' },
        GIAM: { mau: '37', label: 'QĐ giảm mức hoàn trả', doc: 'Quyết định giảm mức hoàn trả', title: 'QUYẾT ĐỊNH VỀ VIỆC GIẢM MỨC HOÀN TRẢ', file: 'Mau_37_BTNN_Quyet_dinh_giam_muc_hoan_tra', content: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định giảm mức hoàn trả.' }
    };
    // Miễn / Giảm bổ sung khi cán bộ đang Thu tiền hoàn trả (Bước 4): cùng mẫu, cùng Loại trình
    // SMIEN / SGIAM: lượt trình 01 cán bộ (dữ liệu cũ, o.qd3); BMIEN / BGIAM: 01 QĐ chung cho các cán bộ được chọn của phần đơn vị (activeDossier.htMgs)
    KIND.SMIEN = Object.assign({}, KIND.MIEN, { base: 'MIEN' });
    KIND.SGIAM = Object.assign({}, KIND.GIAM, { base: 'GIAM' });
    KIND.BMIEN = Object.assign({}, KIND.MIEN, { base: 'MIEN', batch: true });
    KIND.BGIAM = Object.assign({}, KIND.GIAM, { base: 'GIAM', batch: true });
    const isBatch = k => !!(KIND[k] && KIND[k].batch);
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
    // Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương: nhận QĐ hoàn trả và thực hiện Thu tiền hoàn trả (mặc định = Cơ quan trực tiếp quản lý)
    const payUnitOf = o => (o && (o.payUnit || o.agency)) || '';
    // Đơn vị ban hành QĐ hoàn trả:
    // - Lĩnh vực tố tụng hình sự: Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương của từng cán bộ; cán bộ tách thành phần đơn vị theo đơn vị này, mỗi phần đơn vị 01 QĐ hoàn trả
    // - Lĩnh vực khác: Đơn vị tạo QĐ thành lập Hội đồng; không tách phần đơn vị, 01 QĐ hoàn trả cho toàn bộ cán bộ của hồ sơ
    // Khóa phần đơn vị (u.unit) = Đơn vị ban hành QĐ hoàn trả
    const isTths = () => /tố tụng hình sự/i.test((activeDossier && activeDossier.claimField) || '');
    const unitKeyOf = o => (isTths() ? payUnitOf(o) : ((activeDossier && activeDossier.ownerUnit) || payUnitOf(o)));
    const inUnit = (o, u) => unitKeyOf(o) === (u && u.unit != null ? u.unit : u);
    const issuerOf = u => u.unit;
    const xlCode = o => { const x = o.xl || ''; return x === 'Giảm mức hoàn trả' || x === 'GIAM' ? 'GIAM' : (x === 'Miễn hoàn trả' || x === 'MIEN' ? 'MIEN' : 'HT'); };
    // Giảm/Miễn hoàn trả: không giảm, không miễn hiển thị "-"
    const xlText = o => ({ HT: '-', GIAM: 'Giảm mức hoàn trả', MIEN: 'Miễn hoàn trả' })[xlCode(o)];
    // Ghi chú lý do dưới Giảm/Miễn hoàn trả
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
                officers: officers().map(o => ({ name: o.name, unit: o.agency, pay: payUnitOf(o), st: o.ct, xl: xlCode(o), hd: o.hd || 0, giam: o.giam || 0, paid: o.paid || 0, hoan: !!o.ykhdDieuKienHoan, pt: STEP3.includes(o.ct) ? null : (o.total || 0), trinh: o.trinh || '', refund: o.refund || 0, stp: (o.payments || []).some(p => /^Sở Tư pháp/.test(p.unit || '')) })),
                detail: { units: activeDossier.htUnits, dcs: activeDossier.htDcs || [], mgs: activeDossier.htMgs || [], recs: officers().map(o => ({ name: o.name, payUnit: payUnitOf(o), ct: o.ct, qd2: o.qd2 || null, qd3: o.qd3 || null, trinh: o.trinh || '', total: o.total, paid: o.paid || 0, payments: o.payments || [], refund: o.refund || 0, refundDone: o.refundDone || null, dcKey: o.dcKey != null ? o.dcKey : null })) }
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
            if (rec) Object.assign(o, { payUnit: rec.payUnit || payUnitOf(o), ct: rec.ct, qd2: rec.qd2, qd3: rec.qd3 || null, trinh: rec.trinh || '', total: rec.total != null ? rec.total : o.total, paid: rec.paid || 0, payments: rec.payments || [], refund: rec.refund || 0, refundDone: rec.refundDone || null, dcKey: rec.dcKey != null ? rec.dcKey : null });
            // QĐ giảm mức hoàn trả đã ban hành: số tiền sau giảm theo Quyết định
            if (rec && rec.qd2 && rec.qd2.issuedAt && rec.qd2.supp && rec.qd2.supp.phaiHT != null) o.giam = rec.qd2.supp.giam;
            if (!o.ct) {
                if (o.ctStatus) o.ct = 'CBH_HT';
                else if (sd) o.ct = sd[0];
                else o.ct = { 'Chờ ban hành QĐ hoàn trả': 'CBH_HT', 'Chờ duyệt QĐ hoàn trả': 'CD_HT', 'Bị trả lại QĐ hoàn trả': 'BTC_HT', 'Hoàn thành': 'DONE' }[activeDossier.status] || 'THU';
            }
            const ex = !rec && sd && sd[3];
            if (ex) ['paid', 'trinh', 'refund', 'total'].forEach(k => { if (ex[k] != null) o[k] = ex[k]; });
            // Dữ liệu mẫu cán bộ Giảm đang Thu tiền hoàn trả: số tiền phải hoàn trả = Số tiền sau giảm
            if (!rec && o.ct === 'THU' && xlCode(o) === 'GIAM' && o.giam && !(ex && ex.total != null)) o.total = o.giam;
            // Miễn / Giảm theo ý kiến Hội đồng không còn QĐ miễn / giảm riêng trước khi ban hành QĐ hoàn trả: dữ liệu cũ Chờ ban hành / Chờ duyệt / Bị trả lại QĐ miễn, giảm
            // -> Miễn hoàn trả / Thu tiền hoàn trả theo Số tiền sau giảm
            if (/^(CBH|CD|BTC)_MIEN$/.test(o.ct)) { o.ct = 'MIEN'; o.total = o.paid || 0; o.qd2 = null; }
            if (/^(CBH|CD|BTC)_GIAM$/.test(o.ct)) { o.ct = 'THU'; o.total = o.giam || o.hd; o.qd2 = null; }
            // Dữ liệu mẫu nhiều đợt nộp (ht_du_lieu_mau.js: pays [[Ngày nộp, Số tiền], ...]) kèm biên lai
            if (ex && Array.isArray(ex.pays) && !Array.isArray(o.payments)) o.payments = ex.pays.map(p => ({ ngay: p[0], amt: p[1], by: 'Cán bộ ' + payUnitOf(o), unit: payUnitOf(o), at: p[0] + ' 09:00', tlkt: [{ name: 'Biên lai nộp tiền vào ngân sách nhà nước', file: { id: '', name: 'Bien_lai_' + String(p[0]).replace(/\//g, '') + '.pdf', size: 122880, type: 'application/pdf' } }] }));
            // Dữ liệu mẫu: số đã nộp quy về 01 đợt nộp
            if (!Array.isArray(o.payments)) o.payments = (o.paid || 0) > 0 ? [{ ngay: (window.htShiftDate || String)('15/09/2026'), amt: o.paid, by: 'Cán bộ ' + payUnitOf(o), unit: payUnitOf(o), tlkt: [] }] : [];
            if (o.ct === 'MIEN' && !o.total) o.total = 0;
        });
        if (stored && stored.detail && stored.detail.units) activeDossier.htUnits = stored.detail.units;
        activeDossier.htDcs = (stored && stored.detail && stored.detail.dcs) || activeDossier.htDcs || [];
        activeDossier.htMgs = (stored && stored.detail && stored.detail.mgs) || activeDossier.htMgs || [];
        const names = Array.from(new Set(officers().map(unitKeyOf)));
        activeDossier.htUnits = names.map(u => {
            const old = (activeDossier.htUnits || []).find(x => x.unit === u) || {};
            const list = officers().filter(o => inUnit(o, u));
            const st = old.st || (list.some(o => o.ct === 'CD_HT') ? 'CD' : list.some(o => o.ct === 'BTC_HT') ? 'BTC' : list.some(o => o.ct === 'CBH_HT') ? 'CBH' : 'DONE');
            const u2 = Object.assign({ files: [] }, old, { unit: u, st, officers: list.map(o => o.name) });
            if (!u2.qd && st !== 'CBH') u2.qd = seedRec('HT', u2, st);
            return u2;
        });
        // Dữ liệu mẫu: lý do giảm / miễn theo ý kiến Hội đồng, QĐ đình chỉ theo trạng thái mẫu của cán bộ
        if (!stored) officers().forEach(o => {
            const u = activeDossier.htUnits.find(x => inUnit(o, x)) || { unit: unitKeyOf(o) };
            const xc = xlCode(o);
            // Lý do giảm / miễn mẫu (hiển thị dưới Giảm/Miễn hoàn trả)
            if (xc === 'GIAM' && !o.lyDoGiam) o.lyDoGiam = 'Cán bộ có hoàn cảnh kinh tế khó khăn, đã chủ động khắc phục một phần thiệt hại.';
            if (xc === 'MIEN' && !o.lyDoMien) o.lyDoMien = 'Cán bộ mắc bệnh hiểm nghèo, không còn khả năng thực hiện hoàn trả.';
            const ex = (SEED[o.name] || [])[3]; if (!ex) return;
            if (ex.dc) {
                let r = activeDossier.htDcs[ex.dc.key];
                if (!r) {
                    r = seedRec('DC', u, ex.dc.st);
                    Object.assign(r, { st: ex.dc.st, unit: u.unit, names: [], dc: { pa: {}, canCu: typeof DCHT_CAN_CU_DEFAULT !== 'undefined' ? (Array.isArray(DCHT_CAN_CU_DEFAULT) ? DCHT_CAN_CU_DEFAULT.join('\n') : String(DCHT_CAN_CU_DEFAULT)) : '', vbCanCu: 'Bản án số 05/2025/HS-ST ngày 12/03/2025 của Tòa án nhân dân quận Long Biên', noiNhan: typeof dchtNoiNhanDefault === 'function' ? dchtNoiNhanDefault() : '' } });
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
    // Lượt trình mẫu cho dữ liệu có sẵn (đã trình / bị trả lại / đã ban hành)
    function seedRec(kind, u, st) {
        const levels = levelsOf(issuerOf(u));
        const r = { kind, method: 'online', docSrc: 'gen', soKh: st === 'DONE' ? ({ GIAM: '92/QĐ-UBND', MIEN: '93/QĐ-UBND' }[kind] || '89/QĐ-UBND') : '', ngay: (window.htShiftDate || String)('20/09/2026'), fileName: KIND[kind].file + '_' + (activeDossier.maVuViec || activeDossier.code) + '.docx', tlkt: [{ name: 'Văn bản kiến nghị của Hội đồng xem xét trách nhiệm hoàn trả', file: { id: '', name: 'Van_ban_kien_nghi_hoan_tra.pdf', size: 245760, type: 'application/pdf' } }], levels, assignees: levels.map(l => l.leaders[0].id), content: KIND[kind].content, level: 0, hist: [{ type: 'submit', name: 'Cán bộ ' + issuerOf(u), at: (window.htShiftDate || String)('18/09/2026 09:00'), msg: KIND[kind].content }] };
        if (st === 'BTC') { r.reject = { reason: 'Cần rà soát lại số tiền hoàn trả theo kiến nghị của Hội đồng.', by: leaderLabel(r, 0), at: (window.htShiftDate || String)('19/09/2026 10:15') }; r.hist.unshift({ type: 'reject', name: r.reject.by, at: r.reject.at, msg: 'Lý do: ' + r.reject.reason }); }
        if (st === 'DONE') { r.level = levels.length; r.issuedAt = /^(GIAM|MIEN)$/.test(kind) ? (window.htShiftDate || String)('22/09/2026') : (window.htShiftDate || String)('20/09/2026'); r.hist.unshift({ type: 'approve', name: leaderLabel(r, levels.length - 1), at: (window.htShiftDate || String)('20/09/2026 15:00'), msg: 'Ký duyệt' }); }
        return r;
    }
    function syncUnitStatusText() {
        (activeDossier.htUnits || []).forEach(u => {
            u.status = { CBH: 'Chờ ban hành QĐ hoàn trả', CD: 'Chờ duyệt (QĐ hoàn trả)', BTC: 'Bị trả lại (QĐ hoàn trả)', DONE: 'Đã ban hành QĐ hoàn trả' }[u.st];
            // Toàn bộ cán bộ của đơn vị bị đình chỉ trước khi ban hành QĐ hoàn trả: đơn vị không ban hành QĐ hoàn trả
            if (u.st !== 'DONE' && allDc(u.unit)) u.status = 'Đình chỉ hoàn trả';
        });
    }
    function allDc(unit) { const l = officers().filter(o => inUnit(o, unit)); return l.length > 0 && l.every(o => o.ct === 'DC'); }
    function recomputeBase() {
        const l = officers();
        if (l.length && l.every(o => o.ct === 'DC')) activeDossier.status = 'Đình chỉ xem xét hoàn trả';
        else if (l.length && l.every(o => ENDED.includes(o.ct))) activeDossier.status = 'Hoàn thành';
        else if (l.some(o => STEP3.includes(o.ct))) activeDossier.status = 'Chờ ban hành QĐ hoàn trả';
        else activeDossier.status = 'Thu tiền hoàn trả';
        l.forEach(o => {
            if (o.ct === 'THU') { o.status = (o.paid || 0) > 0 ? 'Đang thu' : 'Chưa nộp'; o.progressClass = 'primary'; }
            if (o.ct === 'MIEN') { o.status = 'Hoàn tất'; o.isTerminated = true; o.progressClass = 'success'; }
        });
        syncUnitStatusText();
    }
    function commit(msg) { recomputeBase(); persist(); renderStateLayout(); if (msg) showToast(msg, 'success'); }

    // ===== Phạm vi / quyền thao tác =====
    // Cán bộ trong phạm vi dữ liệu của người dùng (sau khi chốt ý kiến Hội đồng)
    function seeOfficer(o, u) {
        const s = scope(), U = myUnit();
        if (s === 'lanh_dao' || (api().isOwnerScope && api().isOwnerScope())) return true;
        const uu = u || (activeDossier.htUnits || []).find(x => inUnit(o, x)) || {};
        // Sở Tư pháp / Bộ Tư pháp: cán bộ của đơn vị trong phạm vi quản lý, sau khi ban hành QĐ hoàn trả
        if (s === 'stp') return (api().STP_UNITS || []).includes(o.agency) && uu.st === 'DONE';
        // Đơn vị ban hành QĐ hoàn trả: toàn bộ cán bộ của phần đơn vị
        if (issuerOf(uu) === U) return true;
        // Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại: cán bộ của đơn vị
        if (o.agency === U) return true;
        // Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương: cán bộ do đơn vị quản lý, sau khi ban hành QĐ hoàn trả
        return payUnitOf(o) === U && uu.st === 'DONE';
    }
    function unitsInView() {
        const owner = api().isOwnerScope && api().isOwnerScope();
        return (activeDossier.htUnits || []).filter(u => scope() === 'lanh_dao' || owner || officers().some(o => inUnit(o, u) && seeOfficer(o, u)));
    }
    const canActUnit = u => scope() !== 'lanh_dao' && scope() !== 'stp' && issuerOf(u) === myUnit();
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
        } else if (isBatch(kind)) {
            // QĐ miễn / giảm bổ sung chung: mỗi cán bộ được chọn 01 mục theo thông tin số tiền, lý do của lượt trình
            const b = baseKind(kind), rows = (ctx.supp && ctx.supp.rows) || {};
            body = '<p style="' + p + '"><strong>Điều 1.</strong> ' + (b === 'GIAM' ? 'Giảm mức hoàn trả' : 'Miễn hoàn trả') + ' theo Quyết định hoàn trả số ' + esc(ctx.qdHt || '……') + ' đối với:</p>'
                + ctx.list.map((o, i) => {
                    const r = rows[o.name] || {};
                    return '<p style="' + p + '">' + (i + 1) + '. Ông/Bà <strong>' + esc(o.name) + '</strong>, ' + esc(o.role || '') + '; mức độ lỗi: ' + esc(o.loi === 'Khác' ? (o.ykhdLoiKhac || 'Khác') : o.loi || 'Vô ý') + '.<br>'
                        + (b === 'GIAM'
                            ? '- Số tiền phải hoàn trả: ' + money(r.phaiHT) + ' đồng.<br>- Số tiền hoàn trả được giảm: ' + money(r.duocGiam) + ' đồng.<br>- Số tiền còn phải hoàn trả: ' + money(r.giam) + ' đồng.<br>- Lý do giảm: ' + esc(r.lyDo || '')
                            : '- Số tiền hoàn trả được miễn: ' + money(r.mien) + ' đồng.<br>- Số tiền còn phải hoàn trả: 0 đồng.<br>- Lý do miễn: ' + esc(r.lyDo || '')) + '</p>';
                }).join('');
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
        return headHtml(ctx.issuer || ctx.unit, so, ngay, k.mau)
            + '<div style="text-align:center; margin-bottom:14px;"><div style="font-weight:bold; font-size:15px;">QUYẾT ĐỊNH</div><div style="font-weight:bold; font-size:14px;">' + esc(k.title.replace('QUYẾT ĐỊNH ', '').replace(/^VỀ VIỆC/, 'Về việc').toLowerCase().replace(/^về việc/, 'Về việc')) + '</div></div>'
            + '<p style="' + p + ' font-style:italic;">Căn cứ Luật Trách nhiệm bồi thường của Nhà nước; căn cứ Quyết định thành lập Hội đồng xem xét trách nhiệm hoàn trả số ' + esc(/^\d/.test(activeDossier.hdDecision || '') ? activeDossier.hdDecision : '……') + '; xét Văn bản kiến nghị của Hội đồng (Mã hồ sơ: ' + esc(activeDossier.code) + '),</p>'
            + '<div style="text-align:center; font-weight:bold; margin:10px 0;">QUYẾT ĐỊNH:</div>' + body
            + '<p style="' + p + '"><strong>Điều 2.</strong> Quyết định này có hiệu lực kể từ ngày ký./.</p>'
            + '<div style="display:flex; justify-content:flex-end; margin-top:30px;"><div id="ht3SignAnchor" style="text-align:center; width:52%;"><div style="font-weight:bold;">THỦ TRƯỞNG CƠ QUAN</div><div style="height:80px;"></div></div></div>';
    }
    let DC_DRAFT = null; // lượt trình QĐ đình chỉ mới: { unit, names }
    let MG_DRAFT = null; // lượt trình QĐ miễn / giảm bổ sung chung mới: { unit, names }
    function ctxOf(kind, key) {
        if (kind === 'HT') { const u = activeDossier.htUnits[key]; return { unit: u.unit, issuer: issuerOf(u), list: officers().filter(o => inUnit(o, u) && o.ct !== 'DC'), u }; }
        if (kind === 'DC') {
            const d = (activeDossier.htDcs || [])[key] || DC_DRAFT || { names: [] };
            return { unit: d.unit, list: d.names.map(n => officers().find(o => o.name === n)).filter(Boolean), u: activeDossier.htUnits.find(x => x.unit === d.unit) || {}, dc: d.dc || null };
        }
        if (isBatch(kind)) {
            const d = (activeDossier.htMgs || [])[key] || MG_DRAFT || { names: [] };
            const u = activeDossier.htUnits.find(x => x.unit === d.unit) || { unit: d.unit };
            return { unit: d.unit, issuer: issuerOf(u), list: d.names.map(n => officers().find(o => o.name === n)).filter(Boolean), u, qdHt: u.qd ? (u.qd.soKh || '') + (u.qd.issuedAt ? ' ngày ' + u.qd.issuedAt : '') : '' };
        }
        const o = activeDossier.refundOfficers[key];
        const u = activeDossier.htUnits.find(x => inUnit(o, x)) || {};
        const supp = KIND[kind].base ? ((o.qd3 && o.qd3.supp) || null) : null;
        return { unit: unitKeyOf(o), issuer: issuerOf(u.unit ? u : { unit: unitKeyOf(o) }), officer: o, u, supp, qdHt: u.qd ? (u.qd.soKh || '') + (u.qd.issuedAt ? ' ngày ' + u.qd.issuedAt : '') : '' };
    }
    // QĐ hoàn trả: theo phần đơn vị; QĐ miễn / giảm (Bước 3): o.qd2; miễn / giảm bổ sung (Bước 4): o.qd3
    function recOf(kind, key) { if (kind === 'DC') return (activeDossier.htDcs || [])[key] || null; if (isBatch(kind)) return (activeDossier.htMgs || [])[key] || null; return kind === 'HT' ? activeDossier.htUnits[key].qd : (KIND[kind].base ? activeDossier.refundOfficers[key].qd3 : activeDossier.refundOfficers[key].qd2) || null; }
    function setRec(kind, key, r) { if (kind === 'DC') { activeDossier.htDcs = activeDossier.htDcs || []; activeDossier.htDcs[key] = r; return; } if (isBatch(kind)) { activeDossier.htMgs = activeDossier.htMgs || []; activeDossier.htMgs[key] = r; return; } if (kind === 'HT') activeDossier.htUnits[key].qd = r; else if (KIND[kind].base) activeDossier.refundOfficers[key].qd3 = r; else activeDossier.refundOfficers[key].qd2 = r; }

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
        // Cán bộ của phần đơn vị đang trình ký QĐ đình chỉ: ẩn Trình ký QĐ hoàn trả / Trình ký lại
        const dcBusy = officers().some(o => inUnit(o, u) && /^(CD|BTC)_DC$/.test(o.trinh || ''));
        if (u.st !== 'DONE' && allDc(u.unit)) {
            return '<div style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px; padding:14px 16px; margin-bottom:16px;"><div style="font-weight:700; color:var(--text-muted);">Không ban hành Quyết định hoàn trả</div><div style="font-size:13px; color:var(--text-muted);">Toàn bộ cán bộ của đơn vị đã Đình chỉ hoàn trả.</div></div>';
        }
        if (u.st === 'CBH') {
            return '<div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px; padding:14px 16px; margin-bottom:16px;">'
                + '<div><div style="font-weight:700; color:var(--primary-color);">Chưa ban hành Quyết định hoàn trả</div><div style="font-size:13px; color:var(--text-muted);">' + (isTths() ? 'Đơn vị ban hành Quyết định hoàn trả trình ký / ban hành 01 Quyết định hoàn trả (Mẫu 36/BTNN) chung cho các cán bộ của phần đơn vị.' : 'Đơn vị tạo Quyết định thành lập Hội đồng trình ký / ban hành 01 Quyết định hoàn trả (Mẫu 36/BTNN) chung cho toàn bộ cán bộ của hồ sơ.') + '</div></div>'
                + (act && !dcBusy ? '<button type="button" class="btn btn-primary" onclick="ht3OpenSign(\'HT\',' + i + ')"><i class="fa-solid fa-file-signature"></i> Trình ký QĐ hoàn trả</button>' : '') + '</div>';
        }
        let h = '<div style="margin-bottom:16px;">';
        if (u.st === 'BTC' && r && r.reject) {
            h += '<div class="alert-box danger" style="border-left:4px solid #f59e0b; padding:12px 16px; background:#fffbeb; border-radius:8px; margin-bottom:12px;"><div style="font-weight:800; color:#b45309;">Quyết định hoàn trả bị trả lại</div>'
                + '<div style="font-size:13px;"><strong>Người từ chối:</strong> ' + esc(r.reject.by) + ' (' + esc(r.reject.at) + ')</div><div style="font-size:13px;"><strong>Lý do bị trả lại:</strong> ' + esc(r.reject.reason) + '</div></div>';
        }
        // Dải ngang 01 hàng: Hình thức ký | Số, ký hiệu văn bản | Ngày văn bản | Tệp văn bản Quyết định
        const cell = (k, v) => '<div style="flex:1 1 0; min-width:160px;"><div style="font-size:12px; color:#64748b; margin-bottom:2px;">' + k + '</div><div style="font-weight:600; font-size:13px; overflow-wrap:anywhere;">' + v + '</div></div>';
        const off = r.method === 'offline';
        h += '<div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap; background:#eff6ff; border:1px solid #dbeafe; border-radius:8px; padding:10px 14px;">'
            + cell('Hình thức ký', off ? 'Ký ngoài' : 'Ký số trên hệ thống')
            + cell('Số, ký hiệu văn bản', off ? '-' : esc(r.soKh || 'Chờ cấp số'))
            + cell('Ngày văn bản', off ? '-' : esc(u.st === 'DONE' ? (r.issuedAt || r.ngay) : r.ngay || '-'))
            + cell('Tệp văn bản Quyết định', qdFileCell(r, 'HT', i))
            + '</div>'
            + (u.st === 'CD' ? '<div style="font-size:13px; margin-top:8px;"><span style="color:#64748b;">Lãnh đạo được giao ký duyệt:</span> <strong>Cấp ' + (r.level + 1) + '/' + r.levels.length + ' - ' + esc(r.levels[r.level].unit) + ': ' + esc(leaderLabel(r, r.level)) + '</strong></div>' : '');
        if (r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function') h += tlktViewHtml(r.tlkt, { ownerUnit: r.unit || '' });
        const btns = [];
        if (u.st === 'CD' && isLeader()) btns.push(htkdBarButtons('ht3Reject(\'HT\',' + i + ')', 'ht3Approve(\'HT\',' + i + ')'));
        if (u.st === 'BTC' && act && !dcBusy) btns.push('<button type="button" class="btn btn-primary" onclick="ht3OpenSign(\'HT\',' + i + ')"><i class="fa-solid fa-paper-plane"></i> Trình ký</button>');
        if (btns.length) h += '<div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid var(--border-color); padding-top:12px; margin-top:8px;">' + btns.join('') + '</div>';
        return h + '</div>';
    }
    // Cột Thao tác Bước 3: Xem chi tiết. Miễn / Giảm theo ý kiến Hội đồng thể hiện trong Quyết định hoàn trả, không trình QĐ miễn / giảm riêng
    function officerAction() { return ''; }
    function officerStatusCell(o, idx) {
        // Pill trạng thái; chú thích QĐ miễn / giảm đã ban hành (xem văn bản tại cột Thao tác)
        let h = '<div>' + (typeof htPill === 'function' ? htPill(ctText(o.ct)) : esc(ctText(o.ct))) + '</div>';
        const r = o.qd2;
        if (r && ['BTC_MIEN', 'BTC_GIAM'].includes(o.ct) && r.reject) h += '<div class="ht-note" style="color:#b45309;">Lý do bị trả lại: ' + esc(r.reject.reason) + '</div>';
        if (r && r.issuedAt) h += '<div class="ht-note">' + (baseKind(r.kind) === 'MIEN' ? 'QĐ miễn số: ' : 'QĐ giảm số: ') + esc(r.soKh || '-') + ' (' + esc(r.issuedAt) + ')</div>';
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
        const l = officers().filter(o => inUnit(o, u) && seeOfficer(o, u));
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
            // Tố tụng hình sự: Phần đơn vị theo Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương; lĩnh vực khác: 01 khối cho toàn bộ cán bộ của hồ sơ
            + '<div class="card-title" style="margin-bottom:0;"><i class="fa-solid fa-sitemap"></i> ' + (isTths() ? 'Phần đơn vị: ' + esc(u.unit) : 'Toàn bộ cán bộ của hồ sơ') + '</div>' + badgeHtml
            + '<span style="font-size:11.5px; color:#475569; white-space:nowrap;">Đơn vị ban hành QĐ hoàn trả: ' + esc(issuerOf(u)) + '</span>'
            + (own ? '<span style="font-size:11px; padding:2px 8px; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-weight:600; white-space:nowrap;">Đơn vị của bạn (Trực tiếp xử lý)</span>' : '')
            + (viewOnly ? '<span style="font-size:11px; padding:2px 8px; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-weight:500; white-space:nowrap;">' + (hasOwnUnit() ? 'Chỉ xem (Đơn vị phối hợp)' : 'Chỉ xem') + '</span>' : '') + '</div>'
            + '<div style="font-size:13px; color:#334155;">' + unitSummary(u) + '</div></div>';
    }
    // ===== Khối Quyết định miễn / giảm trong popup Xem chi tiết cán bộ (Bước 3, Bước 4): lần trình gần nhất theo trạng thái =====
    function qdInfoBlock(o, idx, kind, r, docKey) {
        if (!r || !KIND[kind]) return '';
        // QĐ chung (BMIEN / BGIAM): xem văn bản theo lượt trình; số tiền, lý do của cán bộ
        const dk = docKey != null ? docKey : idx;
        if (isBatch(kind)) r = Object.assign({}, r, { supp: (r.supp && r.supp.rows && r.supp.rows[o.name]) || {} });
        const b = baseKind(kind), k = KIND[kind];
        const item = (lbl, v) => '<div class="info-item"><div class="info-label">' + lbl + '</div><div class="info-value" style="font-weight:600;">' + v + '</div></div>';
        const file = (label) => '<span style="display:inline-flex; align-items:center; gap:8px; flex-wrap:wrap;"><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i>' + esc(r.fileName || '') + (label ? ' <span style="font-size:11px; padding:1px 8px; border-radius:999px; background:#fef3c7; color:#92400e;">' + label + '</span>' : '')
            + '<a class="action-link" href="javascript:void(0)" title="Xem file" onclick="ht3OpenDoc(\'' + kind + '\',' + dk + ')"><i class="fa-solid fa-eye"></i> Xem file</a><a class="action-link" href="javascript:void(0)" title="Tải file" onclick="showToast(\'Đang tải tệp ' + esc(r.fileName || '') + '...\', \'info\')"><i class="fa-solid fa-download"></i> Tải file</a></span>';
        const sp = r.supp || {};
        // QĐ giảm: 03 số tiền theo lượt trình; dữ liệu cũ (chưa lưu số tiền): Bước 3 theo ý kiến của Hội đồng
        const gPhai = sp.phaiHT != null ? sp.phaiHT : (k.base ? null : (o.hd || 0)), gCon = sp.phaiHT != null ? sp.giam : (k.base ? (sp.giam || 0) : (o.giam || 0));
        const tien = b === 'GIAM' ? item('Số tiền phải hoàn trả', gPhai != null ? money(gPhai) + ' đ' : '-') + item('Số tiền hoàn trả được giảm', gPhai != null ? money(sp.duocGiam != null ? sp.duocGiam : Math.max(0, gPhai - gCon)) + ' đ' : '-')
            + item('Số tiền còn phải hoàn trả', money(gCon) + ' đ') : item('Số tiền được miễn', money(sp.mien != null ? sp.mien : k.base ? Math.max(0, (o.total || 0) - (o.paid || 0)) : (o.hd || o.total || 0)) + ' đ');
        const lyDo = item(b === 'GIAM' ? 'Lý do giảm' : 'Lý do miễn', esc(sp.lyDo || (b === 'GIAM' ? o.lyDoGiam : o.lyDoMien) || '-'));
        let st, body;
        if (r.issuedAt) {
            st = 'Đã ban hành';
            body = item('Hình thức ký', r.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống') + item('Số, ký hiệu văn bản', esc(r.soKh || '-')) + item('Ngày Quyết định', esc(r.issuedAt)) + tien + lyDo + item('Tệp Quyết định', file(''));
        } else {
            const sub = (r.hist || []).find(h => h.type === 'submit');
            st = r.reject ? 'Bị trả lại' : 'Chờ duyệt';
            body = tien + lyDo + item('Lãnh đạo được trình', esc(leaderLabel(r, r.level || 0))) + item('Thời điểm trình', esc(sub ? sub.at : (r.ngay || '-'))) + item('Tệp văn bản', file('Bản dự thảo'))
                + (r.reject ? item('Lý do bị trả lại', '<span style="color:#b45309;">' + esc(r.reject.reason) + '</span>') + item('Người từ chối', esc(r.reject.by)) + item('Thời điểm từ chối', esc(r.reject.at)) : '');
        }
        const old = (r.hist || []).slice(1);
        return '<div class="ht-qd-block" style="margin-top:16px; border:1px solid #e2e8f0; border-radius:8px; padding:12px 14px;"><div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;"><strong style="color:var(--primary-color);"><i class="fa-solid fa-file-contract"></i> ' + esc(k.doc) + (k.base ? ' (bổ sung)' : '') + '</strong>' + (window.htPill ? window.htPill(st) : esc(st)) + '</div>'
            + '<div class="info-grid">' + body + '</div>'
            // Tài liệu ban hành / không ban hành kèm theo của lượt trình (khối không ban hành chỉ đơn vị trình thấy)
            + (r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function' ? '<div style="margin-top:8px;">' + tlktViewHtml(r.tlkt, { ownerUnit: r.unit || o.agency || '' }) + '</div>' : '')
            + (old.length ? '<details style="margin-top:8px;"><summary style="cursor:pointer; font-size:12.5px; color:#475569;">Lịch sử xử lý (' + old.length + ')</summary><ul style="margin:6px 0 0 18px; font-size:12.5px;">' + old.map(h => '<li>' + esc(h.at || '') + ' - ' + esc(h.name || '') + ': ' + esc(h.msg || '') + '</li>').join('') + '</ul></details>' : '')
            + '</div>';
    }
    // Xem chi tiết hoàn trả của cán bộ (Bước 4): các lượt Quyết định giảm / miễn của cán bộ, mới nhất trên cùng
    window.htQdRecs = function (idx) {
        const o = (activeDossier.refundOfficers || [])[idx]; if (!o) return [];
        const l = [];
        if (o.qd3 && KIND[o.qd3.kind]) l.push({ kind: o.qd3.kind, base: baseKind(o.qd3.kind), r: o.qd3 });
        if (o.qd2) { const kd = o.qd2.kind || xlCode(o); if (KIND[kd]) l.push({ kind: kd, base: baseKind(kd), r: o.qd2 }); }
        // QĐ miễn / giảm bổ sung chung có cán bộ: mới nhất trên cùng
        (activeDossier.htMgs || []).map((r, k) => ({ r, k })).filter(x => x.r && (x.r.names || []).includes(o.name)).reverse()
            .forEach(x => l.unshift({ kind: x.r.kind, base: baseKind(x.r.kind), r: Object.assign({}, x.r, { supp: (x.r.supp && x.r.supp.rows && x.r.supp.rows[o.name]) || {} }), raw: x.r, key: x.k }));
        return l.map(x => Object.assign(x, { html: qdInfoBlock(o, idx, x.kind, x.raw || x.r, x.key), doc: KIND[x.kind].doc }));
    };
    window.htQdBlockHtml = function (idx) {
        const o = (activeDossier.refundOfficers || [])[idx]; if (!o) return '';
        return (o.qd2 ? qdInfoBlock(o, idx, o.qd2.kind || xlCode(o), o.qd2) : '') + (o.qd3 ? qdInfoBlock(o, idx, o.qd3.kind, o.qd3) : '');
    };
    function actCell(o, idx, u) {
        // Xem chi tiết cán bộ (popup chỉ đọc, kèm khối Quyết định miễn / giảm) luôn đứng đầu cột Thao tác
        const d = window.htViewOfficerBtn((activeDossier.refundOfficers || []).indexOf(o));
        const a = officerAction(o, idx, u);
        return a ? d + ' ' + a : d;
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
            + item('Đơn vị ban hành', esc(ctx.issuer || ctx.unit))
            + item('Hình thức ký', r.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống')
            + (r.method === 'offline' ? '' : item('Số, ký hiệu văn bản', esc(r.soKh || '-')) + item('Ngày văn bản', esc(r.issuedAt || r.ngay || '-')))
            + item('Tệp văn bản Quyết định', esc(r.fileName) + '<div style="margin-top:4px; font-weight:400;">' + fileLinks(r, kind, key) + '</div>')
            + '</div>' + (r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function' ? tlktViewHtml(r.tlkt, { ownerUnit: r.unit || '' }) : '');
        el('ht3ViewModal').classList.add('visible');
    };
    window.ht3ViewClose = function () { const m = el('ht3ViewModal'); if (m) m.classList.remove('visible'); };

    // ===== Đình chỉ cấp cán bộ (Bước 3, khi QĐ hoàn trả của đơn vị chưa ban hành) =====
    // Dòng phụ trạng thái trình ký QĐ đình chỉ / chờ trả lại tiền / QĐ đình chỉ đã ban hành
    function dcLine(o) {
        const d = o.dcKey != null ? (activeDossier.htDcs || [])[o.dcKey] : null;
        let h = '';
        if (/_DC$/.test(o.trinh || '')) h += '<div style="font-size:12px; color:#6d28d9;">' + esc(ctText(o.trinh)) + (o.trinh === 'BTC_DC' && d && d.reject ? ' - Lý do: ' + esc(d.reject.reason) : '') + '</div>';
        if (d && d.st === 'DONE') h += '<div style="font-size:12px; color:var(--text-muted);">QĐ đình chỉ' + (d.soKh ? ' số ' + esc(d.soKh) : '') + ' ngày ' + esc(d.issuedAt) + ((d.dc && d.dc.pa && d.dc.pa[o.name]) ? ' - ' + (d.dc.pa[o.name] === 'HOAN' ? 'Hoàn trả lại số tiền đã thu' : 'Không hoàn trả lại số tiền đã thu') : '') + '</div>';
        return h;
    }
    // Đình chỉ chỉ thực hiện khi QĐ hoàn trả của đơn vị chưa ban hành; đã ban hành (Bước 4 và các trạng thái sau): không cho phép
    const dcQdIssued = o => { const u = (activeDossier.htUnits || []).find(x => inUnit(o, x)); return !!(u && (u.st === 'DONE' || (u.qd && u.qd.issuedAt))); };
    const DC_ISSUED_MSG = 'Quyết định hoàn trả của đơn vị đã được ban hành, không thực hiện Đình chỉ xem xét hoàn trả.';
    // Cán bộ được chọn đình chỉ: QĐ hoàn trả của đơn vị chưa ban hành, chưa kết thúc, không đang chờ Lãnh đạo ký duyệt, không có trình ký QĐ đình chỉ, không đang chờ trả lại tiền
    const dcEligible = o => !dcQdIssued(o) && !ENDED.includes(o.ct) && !/^CD_/.test(o.ct) && !/^CD_|_DC$/.test(o.trinh || '') && !((o.refund || 0) > 0);
    const dcUnitIssued = u => !!(u && (u.st === 'DONE' || (u.qd && u.qd.issuedAt)));
    // Cột Chọn chỉ hiển thị khi QĐ hoàn trả của đơn vị chưa ban hành
    function dcCheckCell(o, idx, u, ui) {
        if (!canActUnit(u) || dcUnitIssued(u)) return '';
        return '<td style="text-align:center;">' + (dcEligible(o) ? '<input type="checkbox" class="htDcChk" data-u="' + ui + '" data-idx="' + idx + '" onchange="ht3DcSync(' + ui + ')">' : '') + '</td>';
    }
    function dcHeadCell(u, ui, rows) {
        if (!canActUnit(u) || dcUnitIssued(u)) return '';
        const any = rows.some(x => dcEligible(x.o));
        return '<th style="width:40px; text-align:center;">' + (any ? '<input type="checkbox" class="htDcAll" data-u="' + ui + '" title="Chọn tất cả" onchange="ht3DcAll(' + ui + ', this.checked)">' : '') + '</th>';
    }
    // Trình ký QĐ đình chỉ: chỉ hiển thị khi QĐ hoàn trả của phần đơn vị chưa ban hành (đã ban hành: ẩn, không khóa mờ)
    function dcToolbar(u, ui, rows) {
        if (!canActUnit(u) || dcUnitIssued(u) || !rows.some(x => dcEligible(x.o))) return '';
        // Khóa khi chưa chọn cán bộ; có chọn: bật, hiển thị số cán bộ đã chọn (ht3DcSync)
        return '<div style="display:flex; justify-content:flex-end; margin-bottom:8px;"><button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-dc htDcBtn" data-u="' + ui + '" disabled onclick="ht3OpenDc(' + ui + ')"><i class="fa-solid fa-ban"></i> Trình ký QĐ đình chỉ</button></div>';
    }
    // Khối các lượt trình QĐ đình chỉ của đơn vị: Ký duyệt / Từ chối (Lãnh đạo), Trình ký lại (bị trả lại), Xem file
    function dcBlock(u) {
        const recs = (activeDossier.htDcs || []).map((d, k) => ({ d, k })).filter(x => x.d && x.d.unit === u.unit);
        if (!recs.length) return '';
        const act = canActUnit(u);
        let h = '<div style="font-weight:700; color:var(--primary-color); margin:16px 0 8px;"><i class="fa-solid fa-ban"></i> Quyết định đình chỉ (Mẫu 39/BTNN)</div>'
            + '<table class="dense-table" style="width:100%;"><thead><tr><th style="width:45px; text-align:center;">STT</th><th>Cán bộ</th><th style="width:150px;">Hình thức ký</th><th style="width:220px;">Trạng thái</th><th style="width:150px;">Tệp văn bản</th><th style="width:150px; text-align:center;">Thao tác</th></tr></thead><tbody>';
        recs.forEach((x, n) => {
            const d = x.d;
            const st = { CD: 'Chờ duyệt (QĐ đình chỉ) - Cấp ' + (d.level + 1) + '/' + d.levels.length + ': ' + leaderLabel(d, Math.min(d.level, d.levels.length - 1)), BTC: 'Bị trả lại (QĐ đình chỉ)', DONE: 'Đã ban hành' + (d.soKh ? ' số ' + d.soKh : '') + ' ngày ' + (d.issuedAt || '') }[d.st] || '';
            let a = '-';
            if (d.st === 'CD' && isLeader()) a = '<button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-primary" title="Ký duyệt" onclick="ht3Approve(\'DC\',' + x.k + ')"><i class="fa-solid fa-file-signature"></i></button> <button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-danger" title="Từ chối" onclick="ht3Reject(\'DC\',' + x.k + ')"><i class="fa-solid fa-ban"></i></button>';
            if (d.st === 'BTC' && act) a = '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-pri" onclick="ht3OpenSign(\'DC\',' + x.k + ')"><i class="fa-solid fa-paper-plane"></i> Trình ký</button>';
            h += '<tr><td style="text-align:center;">' + (n + 1) + '</td><td>' + d.names.map(esc).join('<br>') + '</td><td>' + (d.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống') + '</td><td>' + esc(st)
                + (d.st === 'BTC' && d.reject ? '<div style="font-size:12px; color:#b45309;">Lý do bị trả lại: ' + esc(d.reject.reason) + '</div>' : '') + '</td><td><a class="action-link" href="javascript:void(0)" onclick="ht3OpenDoc(\'DC\',' + x.k + ')">Xem file</a></td><td style="text-align:center;">' + a + '</td></tr>';
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
        if (!u || dcUnitIssued(u)) { showToast(DC_ISSUED_MSG, 'warning'); return; }
        if (idxs.some(i => !activeDossier.refundOfficers[i] || !dcEligible(activeDossier.refundOfficers[i]))) { showToast('Cán bộ được chọn không đủ điều kiện đình chỉ.', 'warning'); return; }
        activeDossier.htDcs = activeDossier.htDcs || [];
        DC_DRAFT = { unit: u.unit, names: idxs.map(i => activeDossier.refundOfficers[i].name) };
        ht3OpenSign('DC', activeDossier.htDcs.length);
    };

    // ===== Miễn / Giảm bổ sung (Bước 4 - Thu tiền hoàn trả): chọn 01, nhiều hoặc tất cả cán bộ của phần đơn vị -> 01 QĐ chung =====
    // Cán bộ được chọn: đang Thu tiền hoàn trả, còn phải thu, không có lượt trình đang xử lý, không có số tiền cần trả lại
    const mgEligible = o => o.ct === 'THU' && conLaiOf(o) > 0 && !o.trinh && !((o.refund || 0) > 0);
    // Người trình: đơn vị ban hành QĐ hoàn trả của phần đơn vị
    const mgCan = u => canActUnit(u);
    function mgCheckCell(o, idx, u, ui) {
        if (!mgCan(u)) return '';
        return '<td style="text-align:center;">' + (mgEligible(o) ? '<input type="checkbox" class="htMgChk" data-u="' + ui + '" data-idx="' + idx + '" onchange="ht3MgSync(' + ui + ')">' : '') + '</td>';
    }
    function mgHeadCell(u, ui, rows) {
        if (!mgCan(u)) return '';
        const any = rows.some(x => mgEligible(x.o));
        return '<th style="width:40px; text-align:center;">' + (any ? '<input type="checkbox" class="htMgAll" data-u="' + ui + '" title="Chọn tất cả" onchange="ht3MgAll(' + ui + ', this.checked)">' : '') + '</th>';
    }
    function mgToolbar(u, ui, rows) {
        if (!mgCan(u) || !rows.some(x => mgEligible(x.o))) return '';
        // Khóa khi chưa chọn cán bộ; có chọn: bật, hiển thị số cán bộ đã chọn (ht3MgSync)
        const b = (base, icon, label, cls) => '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ' + cls + ' htMgBtn" data-u="' + ui + '" data-label="' + label + '" disabled style="opacity:.5; cursor:not-allowed;" onclick="ht3OpenMg(' + ui + ', \'' + base + '\')"><i class="' + icon + '"></i> ' + label + '</button>';
        return '<div style="display:flex; justify-content:flex-end; gap:8px; margin-bottom:8px;">' + b('MIEN', 'fa-solid fa-shield-halved', 'Trình QĐ miễn bổ sung', 'ht-btn-out') + b('GIAM', 'fa-solid fa-arrow-down-wide-short', 'Trình QĐ giảm bổ sung', 'ht-btn-pri') + '</div>';
    }
    window.ht3MgAll = function (ui, on) { document.querySelectorAll('.htMgChk[data-u="' + ui + '"]').forEach(c => { if (c.offsetParent !== null) c.checked = on; }); ht3MgSync(ui); };
    window.ht3MgSync = function (ui) {
        const vis = Array.from(document.querySelectorAll('.htMgChk[data-u="' + ui + '"]')).filter(c => c.offsetParent !== null);
        const n = vis.filter(c => c.checked).length;
        document.querySelectorAll('.htMgAll[data-u="' + ui + '"]').forEach(a => { if (a.offsetParent !== null) a.checked = vis.length > 0 && n === vis.length; });
        document.querySelectorAll('.htMgBtn[data-u="' + ui + '"]').forEach(b => {
            if (b.offsetParent === null) return;
            const ic = b.querySelector('i').className;
            b.disabled = n === 0; b.style.opacity = n ? '' : '.5'; b.style.cursor = n ? '' : 'not-allowed';
            b.innerHTML = '<i class="' + ic + '"></i> ' + b.dataset.label + (n ? ' (' + n + ')' : '');
        });
    };
    window.ht3OpenMg = function (ui, base) {
        const u = activeDossier.htUnits[ui];
        const idxs = Array.from(document.querySelectorAll('.htMgChk[data-u="' + ui + '"]:checked')).filter(c => c.offsetParent !== null).map(c => +c.dataset.idx);
        if (!idxs.length) { showToast('Vui lòng chọn ít nhất 01 cán bộ.', 'warning'); return; }
        const list = idxs.map(i => activeDossier.refundOfficers[i]);
        if (!u || !mgCan(u) || list.some(o => !o || !mgEligible(o))) { showToast('Cán bộ được chọn không đủ điều kiện trình Quyết định ' + (base === 'MIEN' ? 'miễn' : 'giảm mức') + ' hoàn trả bổ sung.', 'warning'); return; }
        if (base === 'GIAM') {
            const khongVoY = list.filter(o => o.loi !== 'Vô ý');
            if (khongVoY.length) { showToast('Giảm mức hoàn trả chỉ áp dụng khi Mức độ lỗi là Vô ý: ' + khongVoY.map(o => o.name).join(', ') + '.', 'warning'); return; }
            const het = list.filter(o => giamMaxOf(o) <= 0);
            if (het.length) { showToast('Cán bộ đã được giảm đủ 30% Tổng số tiền phải hoàn trả: ' + het.map(o => o.name).join(', ') + '.', 'warning'); return; }
        }
        activeDossier.htMgs = activeDossier.htMgs || [];
        MG_DRAFT = { unit: u.unit, names: list.map(o => o.name) };
        ht3OpenSign('B' + base, activeDossier.htMgs.length);
    };
    // Khối các lượt trình QĐ miễn / giảm bổ sung chung của phần đơn vị: Ký duyệt / Từ chối (Lãnh đạo), Trình ký lại (bị trả lại), Xem file
    function mgBlock(u) {
        const recs = (activeDossier.htMgs || []).map((d, k) => ({ d, k })).filter(x => x.d && x.d.unit === u.unit);
        if (!recs.length) return '';
        const act = mgCan(u);
        let h = '<div style="font-weight:700; color:var(--primary-color); margin:16px 0 8px;"><i class="fa-solid fa-file-contract"></i> Quyết định miễn / giảm mức hoàn trả bổ sung</div>'
            + '<table class="dense-table" style="width:100%;"><thead><tr><th style="width:45px; text-align:center;">STT</th><th style="width:210px;">Quyết định</th><th>Cán bộ</th><th style="width:150px;">Hình thức ký</th><th style="width:220px;">Trạng thái</th><th style="width:110px;">Tệp văn bản</th><th style="width:150px; text-align:center;">Thao tác</th></tr></thead><tbody>';
        recs.forEach((x, n) => {
            const d = x.d, kind = d.kind;
            const st = { CD: 'Chờ duyệt - Cấp ' + (d.level + 1) + '/' + d.levels.length + ': ' + leaderLabel(d, Math.min(d.level, d.levels.length - 1)), BTC: 'Bị trả lại', DONE: 'Đã ban hành' + (d.soKh ? ' số ' + d.soKh : '') + ' ngày ' + (d.issuedAt || '') }[d.st] || '';
            let a = '-';
            if (d.st === 'CD' && isLeader()) a = '<button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-primary" title="Ký duyệt" onclick="ht3Approve(\'' + kind + '\',' + x.k + ')"><i class="fa-solid fa-file-signature"></i></button> <button type="button" data-admin-icon-normalized="1" class="btn-action-square btn-danger" title="Từ chối" onclick="ht3Reject(\'' + kind + '\',' + x.k + ')"><i class="fa-solid fa-ban"></i></button>';
            if (d.st === 'BTC' && act) a = '<button type="button" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-pri" onclick="ht3OpenSign(\'' + kind + '\',' + x.k + ')"><i class="fa-solid fa-paper-plane"></i> Trình ký</button>';
            h += '<tr><td style="text-align:center;">' + (n + 1) + '</td><td>' + esc(KIND[kind].doc) + ' (Mẫu ' + KIND[kind].mau + '/BTNN)</td><td>' + d.names.map(esc).join('<br>') + '</td><td>' + (d.method === 'offline' ? 'Ký ngoài' : 'Ký số trên hệ thống') + '</td><td>' + esc(st)
                + (d.st === 'BTC' && d.reject ? '<div style="font-size:12px; color:#b45309;">Lý do bị trả lại: ' + esc(d.reject.reason) + '</div>' : '') + '</td><td><a class="action-link" href="javascript:void(0)" onclick="ht3OpenDoc(\'' + kind + '\',' + x.k + ')">Xem file</a></td><td style="text-align:center;">' + a + '</td></tr>';
        });
        return h + '</tbody></table>';
    }
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
            const list = officers().map((o, idx) => ({ o, idx })).filter(x => inUnit(x.o, u) && seeOfficer(x.o, u));
            h += '<div class="card" style="' + unitCardStyle(u) + '">' + unitHeader(u, 3, badge(u.status, tone)) + '<div class="card-body"' + (unitCollapsed(3, u) ? ' style="display:none;"' : '') + '>'
                + '<div style="font-weight:700; color:var(--primary-color); margin-bottom:8px;"><i class="fa-solid fa-file-contract"></i> Quyết định hoàn trả (Mẫu 36/BTNN)</div>' + qdBlock(u, i)
                + '<div style="display:flex; justify-content:space-between; align-items:flex-end; gap:10px;"><div style="font-weight:700; color:var(--primary-color); margin-bottom:8px;"><i class="fa-solid fa-users"></i> Cán bộ của đơn vị</div>' + dcToolbar(u, i, list) + '</div>'
                + '<table class="dense-table" style="width:100%;"><thead><tr>' + dcHeadCell(u, i, list) + '<th style="width:45px; text-align:center;">STT</th><th>Họ và tên</th><th style="width:90px;">Mức độ lỗi</th><th style="width:150px;">Giảm/Miễn hoàn trả</th><th style="width:140px;">Phương thức hoàn trả</th><th style="width:140px; text-align:right;">Số tiền cần hoàn trả (đ)</th><th style="width:130px; text-align:right;">Số tiền sau giảm (đ)</th><th style="width:230px;">Trạng thái</th><th style="min-width:160px; text-align:center; white-space:nowrap;">Thao tác</th></tr></thead><tbody>'
                + list.map((x, k) => '<tr>' + dcCheckCell(x.o, x.idx, u, i) + '<td style="text-align:center;">' + (k + 1) + '</td><td><strong>' + esc(x.o.name) + '</strong><div style="font-size:12px; color:var(--text-muted);">' + esc(x.o.role || '') + '</div></td><td>' + esc(x.o.loi === 'Khác' ? (x.o.ykhdLoiKhac || 'Khác') : (x.o.loi || '-')) + '</td><td>' + esc(xlText(x.o)) + lyDoNote(x.o) + '</td><td style="white-space:nowrap;' + (xlCode(x.o) === 'MIEN' ? ' text-align:center;' : '') + '">' + (xlCode(x.o) === 'MIEN' ? '-' : esc((window.htMethod ? htMethod(x.o.refundMethod) : x.o.refundMethod) || '-')) + '</td><td style="text-align:right;">' + money(x.o.hd) + '</td><td style="text-align:right;">' + (xlCode(x.o) === 'GIAM' ? money(x.o.giam) : '-') + '</td><td>' + officerStatusCell(x.o, x.idx) + '</td><td class="ht-act-cell">' + actCell(x.o, x.idx, u) + '</td></tr>').join('')
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
    // Bước mở khóa: Bước 4 khi có cán bộ trong phạm vi đã sang Thu tiền hoàn trả / đã kết thúc
    const baseStep = window.getCurrentWorkflowStep;
    window.getCurrentWorkflowStep = function () {
        if (!ensureModel()) return baseStep();
        const vis = officers().filter(o => seeOfficer(o));
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

    // ===== Popup trình ký (chuẩn: Hình thức ký, Stepper 02 bước, nguồn tệp, Tài liệu đính kèm, chọn Lãnh đạo) =====
    let S = null;
    function modalHtml() {
        return '<div id="ht3Modal" style="display:none; position:fixed; inset:0; background:rgba(15,23,42,0.65); z-index:1050; justify-content:center; align-items:center;">'
            + '<div id="ht3Box" style="background:#fff; width:960px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden;">'
            + '<div style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:18px 24px; display:flex; justify-content:space-between;"><div><div id="ht3Title" style="font-size:16.5px; font-weight:700; color:#1e293b;"></div><div id="ht3Sub" style="font-size:12.5px; color:#64748b; margin-top:4px;"></div></div><button type="button" onclick="ht3Close()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer;">&times;</button></div>'
            + '<div id="ht3Stepper" class="ktl-stepper-fullwidth"><div id="ht3Tab1" class="ktl-step-tab active"><span class="ktl-step-badge">1</span><span class="ktl-step-title">Nhập thông tin</span></div><div class="ktl-stepper-sep"></div><div id="ht3Tab2" class="ktl-step-tab"><span class="ktl-step-badge">2</span><span class="ktl-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div></div>'
            + '<div id="ht3Body1" class="gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
            + '<div id="ht3Returned" style="display:none; background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px;"></div>'
            // Thứ tự chuẩn của popup trình ký: Hình thức ký -> thông tin nghiệp vụ (số tiền / cán bộ) -> Tệp văn bản trình ký (Nguồn tệp, Thông tin điền vào Mẫu, Xem trước) -> Tài liệu đính kèm
            + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="gqx-req">*</span></div><div class="sign-cards-grid">'
            + '<label class="sign-card active" id="ht3CardOn"><input type="radio" name="ht3Method" value="online" checked onchange="ht3SetMethod(\'online\')"><div class="sign-card-content"><div class="sign-card-icon"><i class="fa-solid fa-file-signature"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký số trên hệ thống</div><div class="sign-card-desc">Trình Lãnh đạo ký duyệt trên phần mềm</div></div></div><div class="sign-card-check"><i class="fa-solid fa-circle-check"></i></div></label>'
            + '<label class="sign-card" id="ht3CardOff"><input type="radio" name="ht3Method" value="offline" onchange="ht3SetMethod(\'offline\')"><div class="sign-card-content"><div class="sign-card-icon offline"><i class="fa-solid fa-stamp"></i></div><div class="sign-card-text"><div class="sign-card-title">Ký ngoài (Ban hành trực tiếp)</div><div class="sign-card-desc">Tải lên văn bản PDF đã ký và đóng dấu</div></div></div><div class="sign-card-check"><i class="fa-regular fa-circle"></i></div></label>'
            + '</div></div>'
            // Miễn / Giảm bổ sung (Bước 4): thông tin số tiền, Số tiền sau giảm, Lý do
            + '<div class="gqx-sec" id="ht3Supp" style="display:none;"><div class="gqx-sec-title"><i class="fa-solid fa-scale-balanced"></i> <span id="ht3SuppTitle"></span></div><div id="ht3SuppInfo" style="font-size:13px; margin-bottom:10px;"></div><div id="ht3MgList"></div><div id="ht3MgErr" class="gqx-err"></div>'
            // QĐ giảm mức hoàn trả (Bước 3 và giảm bổ sung Bước 4; cả Ký số và Ký ngoài): Số tiền phải hoàn trả (chỉ đọc) - Số tiền hoàn trả được giảm (nhập) = Số tiền còn phải hoàn trả (tự tính)
            + '<div id="ht3SuppGiamWrap" class="gqx-grid2" style="grid-template-columns:repeat(3, 1fr);">'
            + '<div class="gqx-field"><label class="form-label">Số tiền phải hoàn trả (đ)</label><input type="text" id="ht3SuppPhai" class="form-control" style="text-align:right; background:#f1f5f9;" readonly></div>'
            + '<div class="gqx-field"><label class="form-label">Số tiền hoàn trả được giảm (đ)<span class="gqx-req">*</span></label><input type="text" id="ht3SuppDuoc" class="form-control" placeholder="Nhập số tiền hoàn trả được giảm" style="text-align:right;" oninput="ht3MoneyIn(this); ht3GiamCalc()"><div id="ht3SuppDuocErr" class="gqx-err">' + REQ + '</div><div id="ht3SuppDuocHint" style="font-size:12px; color:var(--text-muted); margin-top:4px;"></div></div>'
            + '<div class="gqx-field"><label class="form-label">Số tiền còn phải hoàn trả (đ)</label><input type="text" id="ht3SuppGiam" class="form-control" style="text-align:right; background:#f1f5f9;" readonly><div id="ht3SuppGiamChu" style="font-size:12px; color:var(--text-muted); margin-top:4px; font-style:italic;"></div></div>'
            + '</div>'
            // Miễn hoàn trả bổ sung (Bước 4): miễn toàn bộ Số tiền còn lại phải hoàn trả, tự tính, chỉ đọc
            + '<div id="ht3SuppMienWrap" class="gqx-grid2" style="display:none;"><div class="gqx-field"><label class="form-label">Số tiền được miễn (đ)</label><input type="text" id="ht3SuppMien" class="form-control" style="text-align:right; background:#f1f5f9;" readonly><div id="ht3SuppMienChu" style="font-size:12px; color:var(--text-muted); margin-top:4px; font-style:italic;"></div></div></div>'
            + '<div class="gqx-field" id="ht3SuppLyDoWrap"><label class="form-label"><span id="ht3SuppLyDoLbl"></span><span class="gqx-req">*</span></label><textarea id="ht3SuppLyDo" class="form-control" rows="2" oninput="ht3Clr(\'ht3SuppLyDo\')"></textarea><div id="ht3SuppLyDoErr" class="gqx-err">' + REQ + '</div></div></div>'
            // Đình chỉ cấp cán bộ: danh sách cán bộ được chọn (kế thừa), lý do / căn cứ đình chỉ
            + '<div class="gqx-sec" id="ht3Dc" style="display:none;"><div class="gqx-sec-title"><i class="fa-solid fa-users"></i> Cán bộ được đình chỉ</div><div id="ht3DcList"></div></div>'
            + '<div class="gqx-sec" id="ht3DocSec"><div class="gqx-sec-title" id="ht3DocTitle"></div>'
            + '<div id="ht3SrcGroup" class="doc-src-segmented"><button type="button" class="doc-src-seg-btn active" id="ht3SegGen" onclick="ht3SetSrc(\'gen\')"><i class="fa-solid fa-wand-magic-sparkles"></i><span id="ht3SegGenText"></span></button><button type="button" class="doc-src-seg-btn" id="ht3SegUp" onclick="ht3SetSrc(\'upload\')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button></div>'
            + '<div id="ht3Meta" class="tlhd-meta"><div class="tlhd-meta-title" id="ht3MetaTitle"></div><div class="gqx-grid2">'
            + '<div class="gqx-field"><label class="form-label">Số, ký hiệu văn bản<span class="gqx-req">*</span></label><input type="text" id="ht3So" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="ht3Clr(\'ht3So\')"><div id="ht3SoErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field"><label class="form-label">Ngày văn bản<span class="gqx-req">*</span></label><input type="text" id="ht3Ngay" class="form-control" placeholder="dd/mm/yyyy" oninput="ht3Clr(\'ht3Ngay\')"><div id="ht3NgayErr" class="gqx-err">' + REQ + '</div></div>'
            + '</div>'
            // QĐ đình chỉ (Mẫu 39/BTNN): Căn cứ, Văn bản làm căn cứ yêu cầu bồi thường, Nơi nhận thuộc Thông tin điền vào Mẫu (như popup Đình chỉ cả hồ sơ)
            + '<div id="ht3DcInfo" style="display:none;">'
            + '<div class="gqx-field"><label class="form-label">Căn cứ<span class="gqx-req">*</span></label><textarea id="ht3DcCanCu" class="form-control" rows="4" maxlength="4000" placeholder="Nhập căn cứ, mỗi căn cứ 01 dòng" oninput="ht3Clr(\'ht3DcCanCu\')"></textarea><div id="ht3DcCanCuErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field"><label class="form-label">Văn bản làm căn cứ yêu cầu bồi thường<span class="gqx-req">*</span></label><textarea id="ht3DcVb" class="form-control" rows="2" maxlength="1000" placeholder="Nhập tên, số hiệu, ngày ban hành, cơ quan ban hành văn bản làm căn cứ yêu cầu bồi thường" oninput="ht3Clr(\'ht3DcVb\')"></textarea><div id="ht3DcVbErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field" style="margin-bottom:0;"><label class="form-label">Nơi nhận</label><textarea id="ht3DcNoiNhan" class="form-control" rows="3" maxlength="2000" placeholder="Nhập nơi nhận, mỗi nơi nhận 01 dòng"></textarea></div></div>'
            + '<div class="tlhd-gen-row" style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:8px;"><div class="gqx-file-hint" id="ht3GenHint"></div><button type="button" class="btn-preview-doc btn btn-secondary btn-sm" onclick="ht3Preview()"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div></div>'
            + '<div id="ht3Upload" style="display:none;"><input type="file" id="ht3File" accept=".pdf,.doc,.docx" style="display:none;" onchange="ht3OnFile(this)"><div id="ht3FileBox"></div><div id="ht3FileErr" class="gqx-err">' + REQ + '</div></div>'
            // Ký ngoài: Số, ký hiệu và Ngày của văn bản đã ký (như popup Ký ngoài QĐ GQBT)
            + '<div id="ht3Off" style="display:none;"><div class="gqx-grid2">'
            + '<div class="gqx-field"><label class="form-label">Số, ký hiệu văn bản<span class="gqx-req">*</span></label><input type="text" id="ht3OffSo" class="form-control" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" oninput="ht3Clr(\'ht3OffSo\')"><div id="ht3OffSoErr" class="gqx-err">' + REQ + '</div></div>'
            + '<div class="gqx-field"><label class="form-label">Ngày văn bản<span class="gqx-req">*</span></label><input type="text" id="ht3OffNgay" class="form-control" placeholder="dd/mm/yyyy" oninput="ht3Clr(\'ht3OffNgay\')"><div id="ht3OffNgayErr" class="gqx-err">' + REQ + '</div></div>'
            + '</div><input type="file" id="ht3OffFile" accept=".pdf" style="display:none;" onchange="ht3OnFile(this)"><div id="ht3OffBox"></div><div id="ht3OffErr" class="gqx-err">Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.</div><div class="tlhd-status-note" id="ht3OffNote"></div></div>'
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
        // Lượt trình QĐ đình chỉ mới: chỉ khi QĐ hoàn trả của đơn vị chưa ban hành
        if (kind === 'DC' && !recOf('DC', key)) {
            const du = DC_DRAFT && (activeDossier.htUnits || []).find(x => x.unit === DC_DRAFT.unit);
            if (!du || !DC_DRAFT.names.length) { DC_DRAFT = null; showToast('Vui lòng chọn ít nhất 01 cán bộ để trình ký Quyết định đình chỉ.', 'warning'); return; }
            if (dcUnitIssued(du)) { DC_DRAFT = null; showToast(DC_ISSUED_MSG, 'warning'); return; }
        }
        // Lượt trình QĐ miễn / giảm bổ sung chung mới: phải có cán bộ được chọn
        if (isBatch(kind) && !recOf(kind, key) && !(MG_DRAFT && MG_DRAFT.names.length)) { MG_DRAFT = null; showToast('Vui lòng chọn ít nhất 01 cán bộ.', 'warning'); return; }
        ensureModal();
        const ctx = ctxOf(kind, key), prev = recOf(kind, key), k = KIND[kind];
        const rejected = prev && prev.reject && (kind === 'DC' || isBatch(kind) ? prev.st === 'BTC' : kind === 'HT' ? activeDossier.htUnits[key].st === 'BTC' : (k.base ? /^BTC_/.test(activeDossier.refundOfficers[key].trinh || '') : /^BTC_/.test(activeDossier.refundOfficers[key].ct)));
        const levels = levelsOf(ctx.issuer || ctx.unit);
        S = { kind, key, ctx, method: rejected ? prev.method : 'online', src: rejected ? prev.docSrc : 'gen', file: null, step: 1, levels, assignees: rejected ? prev.assignees.slice() : levels.map(l => l.leaders[0].id), placed: {} };
        el('ht3Title').innerText = 'TRÌNH KÝ ' + k.doc.toUpperCase();
        el('ht3Sub').innerHTML = 'Hồ sơ: <strong>' + esc(activeDossier.code) + '</strong> • Đơn vị ban hành: ' + esc(ctx.issuer || ctx.unit) + (ctx.officer ? ' • Cán bộ: ' + esc(ctx.officer.name) : '');
        const rb = el('ht3Returned');
        rb.style.display = rejected ? 'block' : 'none';
        if (rejected) rb.innerHTML = '<div style="font-weight:700; color:#b45309;">' + esc(k.doc.toUpperCase()) + ' BỊ LÃNH ĐẠO TRẢ LẠI</div><div style="font-size:12.5px; color:#92400e;">Lý do bị trả lại: <strong>' + esc(prev.reject.reason) + '</strong><br>Người từ chối: ' + esc(prev.reject.by) + ' • Thời điểm: ' + esc(prev.reject.at) + '</div>';
        el('ht3SegGenText').innerText = 'Sinh văn bản theo mẫu ' + k.mau + '/BTNN';
        el('ht3MetaTitle').innerHTML = '<i class="fa-solid fa-sliders" style="color:#2563eb;"></i> Thông tin điền vào Mẫu ' + k.mau + '/BTNN';
        el('ht3GenHint').innerText = 'Hệ thống tự động sinh ' + k.doc + ' theo Mẫu ' + k.mau + '/BTNN từ thông tin đang nhập.';
        el('ht3OffNote').innerHTML = '<i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, văn bản được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống).';
        el('ht3So').value = rejected ? prev.soKh : '';
        el('ht3OffSo').value = rejected && prev.method === 'offline' ? (prev.soKh || '') : '';
        el('ht3OffNgay').value = rejected && prev.method === 'offline' ? (prev.ngay || today()) : today();
        el('ht3Ngay').value = rejected ? prev.ngay : today();
        el('ht3Content').value = rejected ? prev.content : k.content;
        // Miễn / Giảm bổ sung: số tiền hiện tại, số tiền sau giảm mới, lý do
        // QĐ giảm mức hoàn trả tại Bước 3: cũng nhập 03 số tiền (mặc định theo ý kiến của Hội đồng)
        el('ht3Supp').style.display = hasSupp(kind) ? '' : 'none';
        // Nhóm trường 01 cán bộ (SMIEN / SGIAM / GIAM) và bảng cán bộ của QĐ chung (BMIEN / BGIAM)
        ['ht3SuppGiamWrap', 'ht3SuppMienWrap', 'ht3SuppLyDoWrap'].forEach(id => { el(id).style.display = isBatch(kind) ? 'none' : ''; });
        el('ht3MgList').innerHTML = '';
        el('ht3MgErr').style.display = 'none';
        if (isBatch(kind)) {
            const giam = baseKind(kind) === 'GIAM', rows = rejected && prev.supp && prev.supp.rows ? prev.supp.rows : {};
            el('ht3SuppTitle').innerText = giam ? 'Thông tin giảm mức hoàn trả bổ sung (' + ctx.list.length + ' cán bộ)' : 'Thông tin miễn hoàn trả bổ sung (' + ctx.list.length + ' cán bộ)';
            el('ht3SuppInfo').style.display = '';
            el('ht3SuppInfo').innerHTML = giam ? 'Số tiền hoàn trả được giảm của từng cán bộ không lớn hơn 30% Tổng số tiền phải hoàn trả theo Quyết định hoàn trả (cộng dồn các lần giảm) và không lớn hơn Số tiền còn phải thu.' : 'Miễn toàn bộ Số tiền còn phải thu của từng cán bộ.';
            const th = s => '<th style="' + s + '">';
            el('ht3MgList').innerHTML = '<table class="dense-table" style="width:100%;"><thead><tr>' + th('width:40px; text-align:center;') + 'STT</th><th>Họ và tên</th>' + th('width:120px; text-align:right;') + 'Số tiền phải hoàn trả (đ)</th>' + th('width:110px; text-align:right;') + 'Đã nộp (đ)</th>' + th('width:120px; text-align:right;') + 'Còn phải thu (đ)</th>'
                + (giam ? th('width:170px;') + 'Số tiền hoàn trả được giảm (đ)<span class="gqx-req">*</span></th>' + th('width:130px; text-align:right;') + 'Số tiền còn phải hoàn trả (đ)</th>' : th('width:130px; text-align:right;') + 'Số tiền được miễn (đ)</th>')
                + th('width:220px;') + (giam ? 'Lý do giảm' : 'Lý do miễn') + '<span class="gqx-req">*</span></th></tr></thead><tbody>'
                + ctx.list.map((o, n) => {
                    const r = rows[o.name] || {};
                    return '<tr><td style="text-align:center;">' + (n + 1) + '</td><td><strong>' + esc(o.name) + '</strong><div style="font-size:12px; color:var(--text-muted);">' + esc(o.role || '') + '</div></td><td style="text-align:right;">' + money(o.total) + '</td><td style="text-align:right;">' + money(o.paid) + '</td><td style="text-align:right; font-weight:700;">' + money(conLaiOf(o)) + '</td>'
                        + (giam
                            ? '<td><input type="text" id="ht3MgDuoc' + n + '" class="form-control" style="text-align:right;" placeholder="Nhập số tiền" value="' + (r.duocGiam ? money(r.duocGiam) : '') + '" oninput="ht3MoneyIn(this); ht3MgCalc(' + n + ')"><div id="ht3MgDuoc' + n + 'Err" class="gqx-err">' + REQ + '</div><div style="font-size:11.5px; color:var(--text-muted); margin-top:2px;">Tối đa ' + money(giamMaxOf(o)) + ' đ</div></td><td style="text-align:right;" id="ht3MgCon' + n + '">' + (r.duocGiam ? money(Math.max(0, (o.total || 0) - r.duocGiam)) : '-') + '</td>'
                            : '<td style="text-align:right; font-weight:700;">' + money(conLaiOf(o)) + '</td>')
                        + '<td><textarea id="ht3MgLyDo' + n + '" class="form-control" rows="2" maxlength="2000" placeholder="' + (giam ? 'Nhập lý do giảm mức hoàn trả' : 'Nhập lý do miễn hoàn trả') + '" oninput="ht3Clr(\'ht3MgLyDo' + n + '\')">' + esc(r.lyDo || '') + '</textarea><div id="ht3MgLyDo' + n + 'Err" class="gqx-err">' + REQ + '</div></td></tr>';
                }).join('') + '</tbody></table>';
            el('ht3Sub').innerHTML = 'Hồ sơ: <strong>' + esc(activeDossier.code) + '</strong> • Đơn vị ban hành: ' + esc(ctx.issuer || ctx.unit) + ' • Số cán bộ: ' + ctx.list.length;
        }
        if (hasSupp(kind) && !isBatch(kind)) {
            const o = ctx.officer, giam = baseKind(kind) === 'GIAM';
            el('ht3SuppTitle').innerText = giam ? (k.base ? 'Thông tin giảm mức hoàn trả bổ sung' : 'Thông tin giảm mức hoàn trả') : 'Thông tin miễn hoàn trả bổ sung';
            el('ht3SuppInfo').style.display = k.base ? '' : 'none';
            el('ht3SuppInfo').innerHTML = 'Số tiền phải hoàn trả hiện tại: <strong>' + money(o.total) + ' đ</strong> • Đã nộp: <strong>' + money(o.paid) + ' đ</strong> • Còn phải thu: <strong>' + money(Math.max(0, (o.total || 0) - (o.paid || 0))) + ' đ</strong>';
            el('ht3SuppGiamWrap').style.display = giam ? '' : 'none';
            const phai = suppPhai(kind, o), ps = rejected && prev.supp ? prev.supp : null;
            el('ht3SuppPhai').value = money(phai);
            // Bước 3: Số tiền hoàn trả được giảm theo ý kiến của Hội đồng, chỉ đọc; giảm bổ sung Bước 4: nhập
            const lockDuoc = !k.base && giam;
            const duoc = lockDuoc ? Math.max(0, phai - (o.giam || 0)) : (ps ? (ps.duocGiam != null ? ps.duocGiam : Math.max(0, phai - (ps.giam || 0))) : 0);
            el('ht3SuppDuoc').value = duoc ? money(duoc) : '';
            el('ht3SuppDuoc').readOnly = lockDuoc;
            el('ht3SuppDuoc').style.background = lockDuoc ? '#f1f5f9' : '';
            ht3GiamCalc();
            el('ht3SuppDuocHint').innerText = giam ? 'Tối đa ' + money(giamMax(kind, o)) + ' đ (' + giamMaxText(kind) + ').' : '';
            el('ht3SuppMienWrap').style.display = !giam && k.base ? '' : 'none';
            if (!giam && k.base) { const m = conLaiOf(o); el('ht3SuppMien').value = money(m); el('ht3SuppMienChu').innerText = m > 0 && typeof docSoTien === 'function' ? 'Bằng chữ: ' + docSoTien(m) : ''; }
            el('ht3SuppLyDoLbl').innerText = giam ? 'Lý do giảm' : 'Lý do miễn';
            el('ht3SuppLyDo').placeholder = giam ? 'Nhập lý do giảm mức hoàn trả' : 'Nhập lý do miễn hoàn trả';
            el('ht3SuppLyDo').value = ps ? ps.lyDo : (!k.base && giam ? (o.lyDoGiam || '') : '');
        }
        // Đình chỉ: kế thừa cán bộ đã chọn (QĐ hoàn trả chưa ban hành nên chưa có số tiền đã thu)
        el('ht3Dc').style.display = kind === 'DC' ? '' : 'none';
        el('ht3DcInfo').style.display = kind === 'DC' ? '' : 'none';
        if (kind === 'DC') {
            const pd = rejected && prev.dc ? prev.dc : {};
            el('ht3DcList').innerHTML = '<table class="dense-table" style="width:100%;"><thead><tr><th style="width:45px; text-align:center;">STT</th><th>Họ và tên</th><th style="width:220px;">Trạng thái</th></tr></thead><tbody>'
                + ctx.list.map((o, n) => '<tr><td style="text-align:center;">' + (n + 1) + '</td><td><strong>' + esc(o.name) + '</strong><div style="font-size:12px; color:var(--text-muted);">' + esc(o.role || '') + '</div></td><td>' + esc(ctText(o.ct)) + '</td></tr>').join('') + '</tbody></table>';
            el('ht3DcCanCu').value = pd.canCu != null ? pd.canCu : (typeof DCHT_CAN_CU_DEFAULT !== 'undefined' ? (Array.isArray(DCHT_CAN_CU_DEFAULT) ? DCHT_CAN_CU_DEFAULT.join('\n') : String(DCHT_CAN_CU_DEFAULT)) : '');
            el('ht3DcVb').value = pd.vbCanCu != null ? pd.vbCanCu : (typeof dchtVbCanCuDefault === 'function' ? dchtVbCanCuDefault() : '');
            el('ht3DcNoiNhan').value = pd.noiNhan != null ? pd.noiNhan : (typeof dchtNoiNhanDefault === 'function' ? dchtNoiNhanDefault() : '');
            el('ht3Sub').innerHTML = 'Hồ sơ: <strong>' + esc(activeDossier.code) + '</strong> • Đơn vị ban hành: ' + esc(ctx.issuer || ctx.unit) + ' • Số cán bộ: ' + ctx.list.length;
        }
        document.querySelectorAll('#ht3Modal .gqx-err').forEach(e => { e.style.display = 'none'; });
        document.querySelectorAll('#ht3Modal .is-invalid').forEach(e => e.classList.remove('is-invalid'));
        if (typeof tlktMount === 'function') tlktMount('ht3', 'ht3Tlkt', { required: false, rows: rejected ? (prev.tlkt || []) : [], secClass: 'gqx-sec', titleClass: 'gqx-sec-title' });
        document.querySelector('input[name="ht3Method"][value="' + S.method + '"]').checked = true;
        ht3SetSrc(S.src);
        ht3SetMethod(S.method);
        // Trình ký lại: giữ tệp dự thảo tải lên ở lần trình trước (nguồn Tải lên từ máy)
        if (rejected && S.method === 'online' && S.src === 'upload') { S.file = prev.upFile || { name: prev.fileName, size: 0 }; renderFileBoxes(); }
        el('ht3Modal').style.display = 'flex';
    };
    window.ht3Close = () => { const m = el('ht3Modal'); if (m) m.style.display = 'none'; S = null; DC_DRAFT = null; MG_DRAFT = null; };
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
        // Ký số: 02 khối Tài liệu ban hành / không ban hành kèm theo; Ký ngoài: chỉ khối ban hành kèm theo
        el('ht3Tlkt').style.display = '';
        if (typeof tlktShow === 'function') tlktShow('ht3', on);
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
    // Khối số tiền / lý do của popup: Miễn, Giảm bổ sung (Bước 4) và QĐ giảm mức hoàn trả (Bước 3)
    function hasSupp(kind) { return !!(KIND[kind] && (KIND[kind].base || kind === 'GIAM')); }
    // Số tiền phải hoàn trả: Bước 3 theo Quyết định hoàn trả (ý kiến của Hội đồng); giảm bổ sung Bước 4 theo số tiền phải hoàn trả hiện tại
    function suppPhai(kind, o) { return KIND[kind].base ? (o.total || 0) : (o.hd || o.total || 0); }
    // Giảm mức hoàn trả: Số tiền hoàn trả được giảm tối đa 30% Tổng số tiền phải hoàn trả theo QĐ hoàn trả; tại bước Thu tiền hoàn trả không lớn hơn Số tiền còn lại phải hoàn trả
    const conLaiOf = o => Math.max(0, (o.total || 0) - (o.paid || 0));
    // Giảm bổ sung: cộng dồn các lần giảm (kể cả giảm theo ý kiến Hội đồng) không quá 30% Tổng số tiền phải hoàn trả theo QĐ hoàn trả; không lớn hơn Số tiền còn phải thu
    const giamMaxOf = o => { const hd = o.hd || o.total || 0; return Math.max(0, Math.min(Math.floor(hd * 0.3) - Math.max(0, hd - (o.total || 0)), conLaiOf(o))); };
    function giamMax(kind, o) { return KIND[kind].base ? giamMaxOf(o) : Math.floor((o.hd || o.total || 0) * 0.3); }
    function giamMaxText(kind) { return '30% Tổng số tiền phải hoàn trả theo Quyết định hoàn trả' + (KIND[kind].base ? ' (cộng dồn các lần giảm), không lớn hơn Số tiền còn lại phải hoàn trả' : ''); }
    // QĐ giảm bổ sung chung: Số tiền còn phải hoàn trả của từng cán bộ = Số tiền phải hoàn trả hiện tại - Số tiền hoàn trả được giảm
    window.ht3MgCalc = function (n) {
        ht3Clr('ht3MgDuoc' + n);
        const o = S && S.ctx.list[n], c = el('ht3MgCon' + n); if (!o || !c) return;
        const d = parseInt(String(el('ht3MgDuoc' + n).value).replace(/\D/g, ''), 10) || 0;
        c.innerText = d ? money(Math.max(0, (o.total || 0) - d)) : '-';
    };
    // Số tiền còn phải hoàn trả = Số tiền phải hoàn trả - Số tiền hoàn trả được giảm (tự tính khi nhập)
    window.ht3GiamCalc = function () {
        const p = parseInt(String(el('ht3SuppPhai').value).replace(/\D/g, ''), 10) || 0, d = parseInt(String(el('ht3SuppDuoc').value).replace(/\D/g, ''), 10) || 0;
        const c = el('ht3SuppGiam'), chu = el('ht3SuppGiamChu');
        if (!el('ht3SuppDuoc').value.trim()) { c.value = ''; chu.innerText = ''; return; }
        const n = p - d;
        c.value = n >= 0 ? money(n) : '';
        chu.innerText = n > 0 ? (typeof docSoTien === 'function' ? 'Bằng chữ: ' + docSoTien(n) : '') : '';
    };
    function readSupp() {
        if (!S || !hasSupp(S.kind)) return null;
        // QĐ chung: số tiền, lý do theo từng cán bộ (rows[Họ và tên])
        if (isBatch(S.kind)) {
            const rows = {}, giam = baseKind(S.kind) === 'GIAM';
            S.ctx.list.forEach((o, n) => {
                const lyDo = (el('ht3MgLyDo' + n) || {}).value || '';
                if (giam) { const d = parseInt(String((el('ht3MgDuoc' + n) || {}).value || '').replace(/\D/g, ''), 10) || 0; rows[o.name] = { phaiHT: o.total || 0, duocGiam: d, giam: Math.max(0, (o.total || 0) - d), lyDo: lyDo.trim() }; }
                else rows[o.name] = { mien: conLaiOf(o), lyDo: lyDo.trim() };
            });
            return { rows };
        }
        const lyDo = el('ht3SuppLyDo').value.trim();
        if (baseKind(S.kind) !== 'GIAM') return KIND[S.kind].base ? { giam: 0, mien: conLaiOf(S.ctx.officer), lyDo } : { giam: 0, lyDo };
        const phai = suppPhai(S.kind, S.ctx.officer), duoc = parseInt(String(el('ht3SuppDuoc').value).replace(/\D/g, ''), 10) || 0;
        // giam: Số tiền còn phải hoàn trả (số tiền sau giảm) - giữ tên trường cũ cho bộ sinh văn bản
        return { phaiHT: phai, duocGiam: duoc, giam: Math.max(0, phai - duoc), lyDo };
    }
    function readDc() {
        if (!S || S.kind !== 'DC') return null;
        return { pa: {}, canCu: el('ht3DcCanCu').value, vbCanCu: el('ht3DcVb').value.trim(), noiNhan: el('ht3DcNoiNhan').value };
    }
    // Dữ liệu điền mẫu QĐ giảm: 03 số tiền theo lượt trình (Số tiền phải hoàn trả tại thời điểm trình)
    function docCtx(ctx, supp) {
        if (!supp || supp.phaiHT == null || !ctx.officer) return supp ? Object.assign({}, ctx, { supp }) : ctx;
        return Object.assign({}, ctx, { supp, officer: Object.assign({}, ctx.officer, { total: supp.phaiHT }) });
    }
    function curDocHtml() { return docHtml(S.kind, Object.assign(docCtx(S.ctx, readSupp()), { dc: readDc() }), el('ht3So').value.trim(), el('ht3Ngay').value.trim()); }
    window.ht3Preview = function () {
        const page = '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Xem trước văn bản<\/title><style>body{background:#e2e8f0;margin:0;padding:24px;}.page{width:794px;min-height:1123px;margin:0 auto;background:#fff;padding:50px 65px;box-sizing:border-box;font-family:"Times New Roman",serif;font-size:14px;line-height:1.6;}<\/style><\/head><body><div class="page">' + curDocHtml() + '<\/div><\/bo' + 'dy><\/ht' + 'ml>';
        try { window.open(URL.createObjectURL(new Blob([page], { type: 'text/html;charset=utf-8' })), '_blank'); } catch (e) { /* bỏ qua */ }
    };
    function validate1() {
        let first = null;
        // Xóa lỗi của lần kiểm tra trước (khối số tiền, đình chỉ, tệp văn bản)
        document.querySelectorAll('#ht3Body1 .is-invalid').forEach(x => { if (!x.closest('#ht3Tlkt')) x.classList.remove('is-invalid'); });
        document.querySelectorAll('#ht3Body1 .gqx-err').forEach(x => { if (!x.closest('#ht3Tlkt')) x.style.display = 'none'; });
        const mark = (id, errId) => { const i = el(id); if (i) i.classList.add('is-invalid'); const e = el(errId || id + 'Err'); if (e) e.style.display = 'block'; if (!first) first = i || e; };
        const sp = readSupp();
        if (sp && sp.rows) {
            // QĐ chung: từng cán bộ - Số tiền hoàn trả được giảm bắt buộc, > 0, không lớn hơn mức tối đa; Lý do bắt buộc
            S.ctx.list.forEach((o, n) => {
                const r = sp.rows[o.name] || {};
                if (baseKind(S.kind) === 'GIAM') {
                    const id = 'ht3MgDuoc' + n, max = giamMaxOf(o);
                    el(id + 'Err').innerText = REQ;
                    if (!el(id).value.trim()) mark(id);
                    else if (!(r.duocGiam > 0)) { el(id + 'Err').innerText = 'Số tiền hoàn trả được giảm phải lớn hơn 0.'; mark(id); }
                    else if (r.duocGiam > max) { el(id + 'Err').innerText = 'Không được lớn hơn ' + money(max) + ' đ.'; mark(id); }
                }
                if (!r.lyDo) mark('ht3MgLyDo' + n);
            });
        }
        else if (sp) {
            if (baseKind(S.kind) === 'GIAM') {
                // Số tiền hoàn trả được giảm: bắt buộc; lớn hơn 0 và nhỏ hơn Số tiền phải hoàn trả (giảm toàn bộ là Miễn hoàn trả)
                el('ht3SuppDuocErr').innerText = REQ;
                if (!el('ht3SuppDuoc').value.trim()) mark('ht3SuppDuoc');
                else if (!(sp.duocGiam > 0 && sp.duocGiam < sp.phaiHT)) { el('ht3SuppDuocErr').innerText = 'Số tiền hoàn trả được giảm phải lớn hơn 0 và nhỏ hơn Số tiền phải hoàn trả.'; mark('ht3SuppDuoc'); }
                else if (sp.duocGiam > giamMax(S.kind, S.ctx.officer)) { el('ht3SuppDuocErr').innerText = 'Số tiền hoàn trả được giảm không được lớn hơn ' + money(giamMax(S.kind, S.ctx.officer)) + ' đ (' + giamMaxText(S.kind) + ').'; mark('ht3SuppDuoc'); }
            }
            if (!sp.lyDo) mark('ht3SuppLyDo');
        }
        const dc = readDc();
        if (dc) {
            // Căn cứ, Văn bản làm căn cứ: thuộc Thông tin điền vào Mẫu 39/BTNN - bắt buộc khi Ký số và Sinh văn bản theo mẫu
            if (S.method === 'online' && S.src === 'gen') {
                if (!dc.canCu.trim()) mark('ht3DcCanCu');
                if (!dc.vbCanCu) mark('ht3DcVb');
            }
        }
        if (S.method === 'offline') {
            if (!el('ht3OffSo').value.trim()) mark('ht3OffSo');
            const nd = el('ht3OffNgay').value.trim();
            el('ht3OffNgayErr').innerText = REQ;
            if (!nd) mark('ht3OffNgay');
            else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nd)) { el('ht3OffNgayErr').innerText = 'Ngày không đúng định dạng dd/mm/yyyy.'; mark('ht3OffNgay'); }
            if (!S.file) mark('ht3OffBox', 'ht3OffErr');
        }
        else if (S.src === 'gen') { if (!el('ht3So').value.trim()) mark('ht3So'); if (!el('ht3Ngay').value.trim()) mark('ht3Ngay'); }
        else if (!S.file) mark('ht3FileBox', 'ht3FileErr');
        if (!first && typeof tlktValidate === 'function' && !tlktValidate('ht3')) return false;
        // Focus ô lỗi đầu tiên theo thứ tự hiển thị trên popup
        if (first) { const f = document.querySelector('#ht3Body1 input.is-invalid, #ht3Body1 textarea.is-invalid, #ht3Body1 select.is-invalid') || first; if (f.focus) f.focus(); return false; }
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
            kind: S.kind, method, docSrc: method === 'offline' ? '' : S.src, soKh: method === 'offline' ? el('ht3OffSo').value.trim() : (S.src === 'gen' ? el('ht3So').value.trim() : ''),
            ngay: method === 'offline' ? el('ht3OffNgay').value.trim() : (S.src === 'gen' ? el('ht3Ngay').value.trim() : today()),
            fileName: S.file ? S.file.name : k.file + '_' + (activeDossier.maVuViec || activeDossier.code) + '.docx',
            upFile: S.file ? { name: S.file.name, size: S.file.size } : null,
            tlkt: typeof tlktGet === 'function' ? tlktGet('ht3') : [], // Ký ngoài: chỉ Tài liệu ban hành kèm theo
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
        r.hist.unshift({ type: 'submit', name: 'Cán bộ ' + (S.ctx.issuer || S.ctx.unit), at: nowShort(), msg: 'Trình Lãnh đạo ' + leaderLabel(r, 0) + ' ký duyệt. Nội dung trình: ' + r.content });
        const kind = S.kind, key = S.key;
        setRec(kind, key, r);
        if (kind === 'DC') { r.st = 'CD'; S.ctx.list.forEach(o => { o.trinh = 'CD_DC'; o.dcKey = key; }); DC_DRAFT = null; }
        else if (isBatch(kind)) { r.st = 'CD'; S.ctx.list.forEach(o => { o.trinh = 'CD_' + KIND[kind].base; o.mgKey = key; }); MG_DRAFT = null; }
        else if (kind === 'HT') { const u = activeDossier.htUnits[key]; u.st = 'CD'; officers().filter(o => inUnit(o, u) && o.ct !== 'DC').forEach(o => { o.ct = 'CD_HT'; }); }
        else if (KIND[kind].base) activeDossier.refundOfficers[key].trinh = 'CD_' + KIND[kind].base; // trình bổ sung: cán bộ vẫn Thu tiền hoàn trả
        else activeDossier.refundOfficers[key].ct = 'CD_' + kind;
        ht3Close();
        commit('Trình ký ' + KIND[kind].doc + ' thành công.');
    };
    window.ht3IssueOffline = function () {
        if (!S || !validate1()) return;
        const kind = S.kind, key = S.key;
        const go = () => {
            const r = newRec('offline');
            r.hist.unshift({ type: 'approve', name: 'Cán bộ ' + (S.ctx.issuer || S.ctx.unit), at: nowShort(), msg: 'Ban hành ' + KIND[kind].doc + ' ký ngoài hệ thống (tệp ' + r.fileName + ').' });
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
        // Ký ngoài: ngày Quyết định theo `Ngày văn bản` đã nhập; Ký số: ngày ký duyệt ban hành
        r.issuedAt = r.method === 'offline' && r.ngay ? r.ngay : today();
        r.level = r.levels.length;
        if (kind === 'DC') {
            // Ban hành QĐ đình chỉ (trước khi ban hành QĐ hoàn trả): cán bộ chuyển Đình chỉ hoàn trả
            r.st = 'DONE';
            ctxOf('DC', key).list.forEach(o => { o.dcKey = key; o.ct = 'DC'; o.trinh = ''; o.total = o.paid || 0; o.refund = 0; });
        } else if (kind === 'HT') {
            const u = activeDossier.htUnits[key];
            u.st = 'DONE';
            // Không giảm, không miễn -> Thu tiền hoàn trả; Giảm -> Thu tiền hoàn trả theo Số tiền sau giảm; Miễn -> Miễn hoàn trả
            officers().filter(o => inUnit(o, u) && o.ct !== 'DC').forEach(o => {
                const x = xlCode(o);
                if (x === 'MIEN') { o.ct = 'MIEN'; o.total = 0; }
                else { o.ct = 'THU'; o.total = x === 'GIAM' ? (o.giam || o.hd) : o.hd; }
            });
        } else if (isBatch(kind)) {
            // QĐ miễn / giảm bổ sung chung: từng cán bộ theo số tiền của lượt trình
            r.st = 'DONE';
            const rows = (r.supp && r.supp.rows) || {};
            ctxOf(kind, key).list.forEach(o => {
                const sp = rows[o.name] || {};
                o.trinh = ''; o.mgKey = key;
                if (KIND[kind].base === 'MIEN') { o.ct = 'MIEN'; o.total = o.paid || 0; o.refund = 0; return; }
                o.total = sp.giam;
                o.ct = sp.giam > (o.paid || 0) ? 'THU' : 'DONE';
            });
        } else if (KIND[kind].base) {
            // Miễn / Giảm bổ sung khi đang thu tiền
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
            else {
                // QĐ giảm mức hoàn trả: số tiền phải thu = Số tiền còn phải hoàn trả theo Quyết định
                if (r.supp && r.supp.phaiHT != null) { o.giam = r.supp.giam; if (r.supp.lyDo) o.lyDoGiam = r.supp.lyDo; }
                o.ct = 'THU'; o.total = o.giam;
            }
        }
        // Lịch sử ban hành QĐ giảm: thời điểm, số Quyết định, 03 số tiền, tệp Quyết định
        if (baseKind(kind) === 'GIAM' && r.supp && r.supp.phaiHT != null) {
            r.hist.unshift({ type: 'issue', name: r.method === 'offline' ? 'Cán bộ ' + (r.unit || '') : leaderLabel(r, r.levels.length - 1), at: nowShort(), msg: 'Ban hành ' + KIND[kind].doc + (r.soKh ? ' số ' + r.soKh : '') + ' ngày ' + r.issuedAt + ': Số tiền phải hoàn trả ' + money(r.supp.phaiHT) + ' đ; Số tiền hoàn trả được giảm ' + money(r.supp.duocGiam) + ' đ; Số tiền còn phải hoàn trả ' + money(r.supp.giam) + ' đ; tệp ' + r.fileName + '.' });
        }
        commit(msg);
    }

    // ===== Ký duyệt / Từ chối của Lãnh đạo (màn Ký duyệt / Từ chối chung của trang) =====
    const tgt = (kind, key) => 'ht3|' + kind + '|' + key;
    const parse = t => { const m = /^ht3\|(HT|MIEN|GIAM|SMIEN|SGIAM|BMIEN|BGIAM|DC)\|(\d+)$/.exec(t || ''); return m ? { kind: m[1], key: +m[2] } : null; };
    window.ht3OpenDoc = function (kind, key) {
        const r = recOf(kind, key); if (!r) return;
        if (r.method === 'offline' || r.docSrc === 'upload') { showToast('Đang mở xem tệp tin: ' + r.fileName, 'info'); return; }
        const html = docHtml(kind, docCtx(ctxOf(kind, key), r.supp), r.soKh, r.issuedAt || r.ngay);
        const page = '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>' + esc(r.fileName) + '<\/title><style>body{background:#e2e8f0;margin:0;padding:24px;}.page{width:794px;min-height:1123px;margin:0 auto;background:#fff;padding:50px 65px;box-sizing:border-box;font-family:"Times New Roman",serif;font-size:14px;line-height:1.6;}<\/style><\/head><body><div class="page">' + html + '<\/div><\/bo' + 'dy><\/ht' + 'ml>';
        try { window.open(URL.createObjectURL(new Blob([page], { type: 'text/html;charset=utf-8' })), '_blank'); } catch (e) { /* bỏ qua */ }
    };
    window.ht3Approve = function (kind, key) {
        openLeaderSignModal(tgt(kind, key));
        const r = recOf(kind, key);
        const s = el('m20Summary'); if (s) s.innerText = r.content || '';
        const t = el('m20Tlkt'); if (t) t.innerHTML = r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function' ? tlktViewHtml(r.tlkt, { showInternal: true }) : '';
    };
    window.ht3Reject = function (kind, key) {
        openRejectReasonModal(tgt(kind, key));
        const r = recOf(kind, key);
        const t = el('rejectTlkt'); if (t) t.innerHTML = r.tlkt && r.tlkt.length && typeof tlktViewHtml === 'function' ? tlktViewHtml(r.tlkt, { showInternal: true }) : '';
    };
    const baseCtx = window.kdtcHtCtx;
    window.kdtcHtCtx = function (target) {
        const p = parse(target); if (!p) return baseCtx(target);
        const r = recOf(p.kind, p.key), k = KIND[p.kind];
        const ok = p.kind === 'DC' ? 'Đình chỉ hoàn trả' : p.kind === 'HT' ? 'Đã ban hành QĐ hoàn trả' : (baseKind(p.kind) === 'MIEN' ? 'Miễn hoàn trả' : 'Thu tiền hoàn trả');
        return { kind: k.doc + ' (Mẫu số ' + k.mau + '/BTNN)', title: k.title, content: r.content, hist: r.hist.map(h => ({ type: h.type, name: h.name, at: h.at, msg: h.msg })), levels: r.levels, level: Math.min(r.level, r.levels.length - 1), label: i => r.levels[i].unit + ': ' + leaderLabel(r, i), staff: 'Cán bộ ' + ctxOf(p.kind, p.key).unit, okStatus: ok, noStatus: 'Bị trả lại (' + k.label + ')' };
    };
    const baseDocInfo = window.htkdDocInfo;
    window.htkdDocInfo = function (target) {
        const p = parse(target); if (!p) return baseDocInfo(target);
        const r = recOf(p.kind, p.key);
        const html = r.docSrc === 'gen' ? docHtml(p.kind, docCtx(ctxOf(p.kind, p.key), r.supp), r.soKh, r.ngay) : '';
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
        else if (isBatch(p.kind)) { r.st = 'BTC'; ctxOf(p.kind, p.key).list.forEach(o => { o.trinh = 'BTC_' + KIND[p.kind].base; }); }
        else if (p.kind === 'HT') { const u = activeDossier.htUnits[p.key]; u.st = 'BTC'; officers().filter(o => inUnit(o, u) && o.ct !== 'DC').forEach(o => { o.ct = 'BTC_HT'; }); }
        else if (KIND[p.kind].base) activeDossier.refundOfficers[p.key].trinh = 'BTC_' + KIND[p.kind].base;
        else activeDossier.refundOfficers[p.key].ct = 'BTC_' + p.kind;
        closeRejectReasonModal();
        commit('Đã từ chối ' + KIND[p.kind].doc + '. Hồ sơ chuyển trạng thái Bị trả lại.');
    };

    // ===== Badge trạng thái đầu màn: trạng thái chung theo phạm vi người xem (cùng quy tắc roll-up với màn danh sách) =====
    // Màu badge trạng thái chung (đồng bộ màn danh sách)
    const CHUNG_TONE = { 'Chờ duyệt': '#ede9fe;color:#6d28d9;border:1px solid #ddd6fe', 'Bị trả lại': '#fef3c7;color:#b45309;border:1px solid #fde68a', 'Chờ xử lý': '#fffbeb;color:#b45309;border:1px solid #fde68a', 'Đang xử lý': '#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe', 'Thu tiền hoàn trả': '#f0fdfa;color:#0d9488;border:1px solid #99f6e4', 'Miễn hoàn trả': '#fdf2f8;color:#be185d;border:1px solid #fbcfe8', 'Hoàn thành': '#ecfdf5;color:#047857;border:1px solid #a7f3d0', 'Đình chỉ xem xét hoàn trả': '#f1f5f9;color:#475569;border:1px solid #cbd5e1' };
    const HS_TRINH = { 'Chờ duyệt QĐ thành lập': ['Chờ duyệt', 'QĐ thành lập hội đồng'], 'Chờ duyệt thành lập hội đồng': ['Chờ duyệt', 'QĐ thành lập hội đồng'], 'Bị trả lại thành lập HĐ': ['Bị trả lại', 'QĐ thành lập hội đồng'], 'Từ chối duyệt QĐ thành lập': ['Bị trả lại', 'QĐ thành lập hội đồng'], 'Chờ duyệt QĐ đình chỉ': ['Chờ duyệt', 'QĐ đình chỉ'], 'Bị trả lại QĐ đình chỉ': ['Bị trả lại', 'QĐ đình chỉ'] };
    function chungDetail() {
        if (!ensureModel()) {
            const s = activeDossier.status;
            if (HS_TRINH[s]) return { g: HS_TRINH[s][0], loai: HS_TRINH[s][1], lines: [] };
            return { g: HS_GROUP[s] || (CHUNG_TONE[s] ? s : 'Chờ xử lý'), lines: [] };
        }
        const inView = unitsInView().map(u => u.unit);
        const vis = officers().filter(o => inView.includes(unitKeyOf(o)) && seeOfficer(o));
        // Thứ tự: trạng thái đích (100% kết thúc) > Thu tiền hoàn trả > Đang xử lý > Chờ xử lý
        const ended = o => ENDED.includes(o.ct) && !o.trinh;
        let chung = 'Chờ xử lý';
        if (vis.length && vis.every(ended)) chung = vis.every(o => o.ct === 'DC') ? 'Đình chỉ xem xét hoàn trả' : (vis.every(o => o.ct === 'MIEN') ? 'Miễn hoàn trả' : 'Hoàn thành');
        else if (vis.some(o => o.ct === 'THU')) chung = 'Thu tiền hoàn trả';
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
        dcCheckCell, dcHeadCell, dcToolbar, dcBlock, dcLine, dcEligible, mgCheckCell, mgHeadCell, mgToolbar, mgBlock, mgEligible, giamMaxOf, unitHeader, unitCollapsed, orderUnits, unitCardStyle,
        unitBadge: u => badge(u.status, u.st !== 'DONE' && allDc(u.unit) ? 'muted' : { CBH: 'warn', CD: 'info', BTC: 'bad', DONE: 'ok' }[u.st]),
        ensureModel, recOf, units: () => activeDossier.htUnits, persist, setFile: f => { if (S) { S.file = f; renderFileBoxes(); } },
        // Dùng cho Bước 4 (chi_tiet_ho_so_hoan_tra_thu.js)
        commit, officers, unitsInView, seeOfficer, inUnit, unitKeyOf, canActUnit, isLeader, scope, myUnit, isTths, issuerOf, payUnitOf, xlCode, ctText, CT, money, esc, today, nowShort, tgt
    };
    document.addEventListener('DOMContentLoaded', () => { if (ensureModel()) { recomputeBase(); persist(); renderStateLayout(); } });
})();
