/*
 * Popup chuẩn Tìm kiếm nâng cao vụ việc BTNN (mockup) - dùng chung cho các màn có trường Mã vụ việc liên quan.
 * Lưới: Mã vụ việc (VVBT-), Mã hồ sơ GQBT (BT-, mở chi tiết tab mới), Tên cá nhân/Tổ chức yêu cầu, Tên cá nhân/Tổ chức bị thiệt hại, Cơ quan giải quyết,
 * Số QĐ/Bản án, Ngày QĐ/Bản án, Trạng thái; tìm kiếm theo toàn bộ thông tin trên lưới.
 * Phạm vi dữ liệu theo cấp của người dùng đăng nhập (BTNN_WF): Bộ Tư pháp toàn quốc; Sở Tư pháp theo địa bàn tỉnh
 * và vụ việc do Sở tiếp nhận; cơ quan giải quyết bồi thường theo vụ việc do đơn vị giải quyết.
 * Phụ thuộc: btnn_luong_xu_ly.js (BTNN_WF).
 */
(function (global) {
    'use strict';
    const W = () => global.BTNN_WF;
    const unitName = id => (W() && W().unitName(id)) || id;
    const row = (code, requester, victim, agencyId, decisionNo, decisionDate, status, receivedBy = '') => ({
        code, hoSoCode: code, requester, victim: victim || requester, agencyId, decisionNo: decisionNo || '-', decisionDate: decisionDate || '-', status, receivedBy, detailType: 'claim'
    });
    // Vụ việc yêu cầu bồi thường mẫu (trạng thái khác Chờ tiếp nhận)
    // Đồng bộ theo dữ liệu mẫu Giải quyết YCBT (Người yêu cầu, Cơ quan giải quyết, Trạng thái, Số/Ngày QĐ)
    const CASES = [
        row('BT-2026-012', 'Lê Văn H', '', 'THADS-HN', '56/QĐ-BT', '05/07/2026', 'Hoàn thành'),
        row('BT-2026-021', 'Hoàng Văn R', '', 'TAND-NT', '', '', 'Bị trả lại'),
        row('BT-2026-003-A', 'Công ty ABC', '', 'UBND-CG', '46/QĐ-BT', '11/03/2023', 'Chờ chi trả'),
        row('BT-2026-010-TDC', 'Đặng Văn T', '', 'STP-HN', '', '', 'Hoãn giải quyết', 'STP-HN'),
        row('BT-2026-067', 'Kiều Văn Đông', '', 'TAND-HN', '22/QĐ-BT', '20/05/2026', 'Hoàn thành'),
        row('BT-2026-030', 'Bùi Văn Khánh', '', 'CA-HM', '', '', 'Bị trả lại'),
        row('BT-2026-052', 'Trần Đình Trọng', '', 'UBND-CG', '', '', 'Cử người giải quyết bồi thường'),
        row('BT-2026-018', 'Trần Thu O', '', 'CCTS-BD', '', '', 'Chờ duyệt'),
        row('BT-2026-054', 'Vũ Quang Vinh', '', 'CA-TX', '', '', 'Cử người giải quyết bồi thường'),
        row('BT-2026-022', 'Trần Văn Phú', '', 'STP-HN', '', '', 'Chờ ban hành QĐ'),
        row('BT-2026-014', 'Phạm Văn K', '', 'UBND-HN', '', '', 'Không thụ lý'),
        row('BT-2026-061', 'Lương Văn Thành', '', 'Công an tỉnh Nam Định', '', '', 'Đang phục hồi danh dự'),
        row('BT-2026-009', 'Nguyễn Văn E', '', 'UBND-DD', '', '', 'Không thụ lý')
    ];
    // 17 Trạng thái vụ việc Giải quyết YCBT (trừ Chờ tiếp nhận)
    const STATUS_OPTIONS = ['Chờ duyệt', 'Bị trả lại', 'Cử người giải quyết bồi thường', 'Cử người phục hồi danh dự', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ', 'Chờ chi trả', 'Hoàn thành',
        'Đang phục hồi danh dự', 'Hoãn phục hồi danh dự', 'Từ chối phục hồi danh dự', 'Hoãn giải quyết', 'Đình chỉ giải quyết', 'Đã chuyển CQGQBT', 'Không thụ lý', 'Yêu cầu bổ sung'];

    function fold(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim(); }
    function parseDate(s) { const p = String(s || '').split('/'); return p.length === 3 ? new Date(p[2], p[1] - 1, p[0]) : null; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

    // Tỉnh/Thành phố của đơn vị theo tên trên cây Cơ cấu tổ chức (đơn vị trung ương: null)
    function provinceOfUnit(unitId) {
        const m = unitName(unitId).match(/(thành phố|tỉnh)\s+([^,]+)$/i);
        return m ? { key: m[2].trim().toLowerCase(), label: m[0].charAt(0).toUpperCase() + m[0].slice(1) } : null;
    }
    // Nhận diện Sở Tư pháp (Quy tắc nhận diện Sở Tư pháp - Danh mục và Phụ lục): Loại cơ quan "Sở" [DM_57] + tên bắt đầu "Sở Tư pháp"; dữ liệu mẫu chưa có Loại cơ quan thì chỉ kiểm tra tên
    function isStpUnitId(id) { const w = W(); if (w && w.isStpUnit) return w.isStpUnit(id); const u = w && w.getUnit ? w.getUnit(id) : null; return !!u && /^Sở Tư pháp/i.test(u.name) && (!u.loaiCoQuanName || u.loaiCoQuanName === 'Sở'); }
    // Đơn vị của người dùng: Sở Tư pháp chứa đơn vị công tác (người dùng thuộc Sở Tư pháp, kể cả phòng, ban trực thuộc Sở); trường hợp khác: đơn vị cấp cao nhất chứa đơn vị công tác
    function userRootId(unitId) { const w = W(); if (!w || !unitId) return ''; const chain = w.getAncestors ? w.getAncestors(unitId) : [unitId]; return chain.find(isStpUnitId) || w.getRootId(unitId) || unitId; }
    // Phạm vi dữ liệu theo cấp của người dùng đăng nhập
    function scope() {
        const w = W();
        const user = w ? w.getCurrentUser() : null;
        const rootId = user ? userRootId(user.unitId) : 'BTP-01';
        const rootName = unitName(rootId);
        if (rootId === 'BTP-01') return { level: 'BTP', rootId, label: 'Toàn quốc (người dùng thuộc Bộ Tư pháp)', allowCase: () => true, allowUnit: () => true };
        const prov = provinceOfUnit(rootId);
        const inProv = id => !!prov && (provinceOfUnit(id) || {}).key === prov.key;
        if (isStpUnitId(rootId)) {
            return {
                level: 'STP', rootId, province: prov,
                label: `Vụ việc do cơ quan trên địa bàn ${prov ? prov.label : ''} giải quyết và vụ việc do ${rootName} tiếp nhận`,
                allowCase: r => inProv(r.agencyId) || r.receivedBy === rootId,
                allowUnit: inProv
            };
        }
        return { level: 'CQ', rootId, label: `Vụ việc do ${rootName} giải quyết`, allowCase: r => w.getRootId(r.agencyId) === rootId, allowUnit: id => w.getRootId(id) === rootId };
    }
    // Mã vụ việc (VVBT-) theo Mã hồ sơ GQBT (BT-): dùng chung BTNN_WF.vuViecOf để khớp với các phân hệ; r.code = Mã vụ việc
    function withVuViec(r) {
        if (!r) return r;
        if (!r.hoSoCode) r.hoSoCode = r.code;
        if (!r.maVuViec && W()) r.maVuViec = W().isVuViecCode(r.hoSoCode) ? r.hoSoCode : W().vuViecOf(r.hoSoCode);
        if (r.maVuViec) r.code = r.maVuViec;
        return r;
    }
    const sameCase = (r, code) => !!code && (r.code === code || r.hoSoCode === code || r.maVuViec === code);
    function casesInScope(data) { const s = scope(); return (data || CASES).map(withVuViec).filter(s.allowCase); }
    function findInScope(code, data) { return casesInScope(data).find(r => sameCase(r, code)) || null; }
    // Mã vụ việc của một mã đã lưu (VVBT- hoặc Mã hồ sơ GQBT BT- của dữ liệu cũ)
    function toVuViec(code) {
        if (!code) return '';
        const r = CASES.map(withVuViec).find(x => sameCase(x, code));
        if (r) return r.code;
        return (W() && /^BT-/.test(code)) ? W().vuViecOf(code) : code;
    }

    // Mở xem chi tiết hồ sơ Giải quyết YCBT (theo Mã hồ sơ GQBT) tại tab trình duyệt mới
    function openDetail(code) {
        const r = CASES.map(withVuViec).find(x => sameCase(x, code));
        const hoSo = r ? r.hoSoCode : code;
        global.open(`quan_ly_boi_thuong.html?id=${encodeURIComponent(hoSo)}&mode=view`, '_blank');
    }

    let state = { data: CASES, onSelect: null };
    function ensureModal() {
        if (document.getElementById('bclModal')) return;
        const st = document.createElement('style');
        st.textContent = [
            '.bcl-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.45);display:none;align-items:flex-start;justify-content:center;z-index:5000;padding:20px;overflow:auto;}',
            '.bcl-backdrop.visible{display:flex;}',
            '.bcl-modal{background:#fff;border-radius:12px;width:min(1080px,100%);box-shadow:0 20px 50px rgba(15,23,42,.3);display:flex;flex-direction:column;max-height:calc(100vh - 40px);}',
            '.bcl-head{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:15px;color:#0f172a;}',
            '.bcl-body{padding:16px 18px;overflow:auto;}',
            '.bcl-scope{margin-bottom:12px;padding:8px 12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;font-size:13px;color:#1e3a8a;}',
            '.bcl-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px 14px;}',
            '.bcl-grid label{display:block;font-size:13px;font-weight:600;color:#334155;margin-bottom:4px;}',
            '.bcl-grid input,.bcl-grid select{width:100%;box-sizing:border-box;height:36px;border:1px solid #cbd5e1;border-radius:6px;padding:4px 10px;font:inherit;font-size:13px;}',
            '.bcl-grid input.is-invalid{border-color:#ef4444;background:#fef2f2;}',
            '.bcl-actions{display:flex;justify-content:flex-end;gap:8px;margin:12px 0;}',
            '.bcl-table{width:100%;border-collapse:collapse;font-size:13px;}',
            '.bcl-table th{background:#f1f5f9;text-align:left;padding:9px 10px;color:#334155;border-bottom:1px solid #e2e8f0;}',
            '.bcl-table td{padding:9px 10px;border-bottom:1px solid #f1f5f9;vertical-align:middle;}',
            '.bcl-table tr:hover td{background:#f8fafc;}',
            '.bcl-table a{color:#1d4ed8;text-decoration:underline;cursor:pointer;}',
            '.bcl-badge{display:inline-block;padding:3px 9px;border-radius:999px;background:#eef2ff;color:#3730a3;font-size:12px;font-weight:600;white-space:nowrap;}',
            '.bcl-foot{display:flex;justify-content:flex-end;padding:12px 18px;border-top:1px solid #e2e8f0;}',
            '.bcl-empty{text-align:center;color:#64748b;font-style:italic;padding:24px;}'
        ].join('\n');
        document.head.appendChild(st);
        const box = document.createElement('div');
        box.className = 'bcl-backdrop';
        box.id = 'bclModal';
        const input = (id, label, ph) => `<div><label for="${id}">${label}</label><input id="${id}" placeholder="${ph}"></div>`;
        box.innerHTML = `
            <div class="bcl-modal" role="dialog" aria-modal="true">
                <div class="bcl-head"><strong><i class="fa-solid fa-folder-tree"></i> <span id="bclTitle">Tìm kiếm vụ việc liên quan</span></strong>
                    <button type="button" class="btn btn-secondary" onclick="BTNN_CASE.close()" title="Đóng"><i class="fa-solid fa-xmark"></i></button></div>
                <div class="bcl-body">
                    <div class="bcl-scope"><i class="fa-solid fa-shield-halved"></i> Phạm vi dữ liệu: <b id="bclScope"></b></div>
                    <div class="bcl-grid">
                        ${input('bclCode', 'Mã vụ việc', 'Nhập mã vụ việc (VVBT-...)')}
                        ${input('bclRequester', 'Tên cá nhân/Tổ chức yêu cầu', 'Nhập tên cá nhân/tổ chức yêu cầu...')}
                        ${input('bclVictim', 'Tên cá nhân/Tổ chức bị thiệt hại', 'Nhập tên cá nhân/tổ chức bị thiệt hại...')}
                        ${input('bclAgency', 'Cơ quan giải quyết', 'Nhập cơ quan giải quyết...')}
                        ${input('bclDecNo', 'Số QĐ/Bản án', 'Nhập số QĐ/Bản án...')}
                        ${input('bclFrom', 'Từ ngày QĐ/Bản án', 'dd/mm/yyyy')}
                        ${input('bclTo', 'Đến ngày QĐ/Bản án', 'dd/mm/yyyy')}
                        <div><label for="bclStatus">Trạng thái</label><select id="bclStatus"></select></div>
                    </div>
                    <div class="bcl-actions">
                        <button type="button" class="btn btn-secondary" onclick="BTNN_CASE.clear()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                        <button type="button" class="btn btn-primary" onclick="BTNN_CASE.search()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                    </div>
                    <table class="bcl-table">
                        <thead><tr><th>Mã vụ việc</th><th>Mã hồ sơ GQBT</th><th>Tên cá nhân/Tổ chức yêu cầu</th><th>Tên cá nhân/Tổ chức bị thiệt hại</th><th>Cơ quan giải quyết</th><th>Số QĐ/Bản án</th><th>Ngày QĐ/Bản án</th><th>Trạng thái</th><th style="text-align:center;">Thao tác</th></tr></thead>
                        <tbody id="bclBody"></tbody>
                    </table>
                </div>
                <div class="bcl-foot"><button type="button" class="btn btn-secondary" onclick="BTNN_CASE.close()">Hủy bỏ</button></div>
            </div>`;
        document.body.appendChild(box);
        if (typeof global.flatpickr === 'function') ['bclFrom', 'bclTo'].forEach(id => global.flatpickr(document.getElementById(id), { dateFormat: 'd/m/Y', allowInput: true, locale: (global.flatpickr.l10ns && global.flatpickr.l10ns.vn) || 'default' }));
    }
    const FIELDS = ['bclCode', 'bclRequester', 'bclVictim', 'bclAgency', 'bclDecNo', 'bclFrom', 'bclTo', 'bclStatus'];
    function setVal(id, v) { const el = document.getElementById(id); if (!el) return; if (el._flatpickr) el._flatpickr.setDate(v || null, false); else el.value = v || ''; }

    function open(opts) {
        ensureModal();
        opts = opts || {};
        state = { data: opts.data || CASES, onSelect: opts.onSelect || null };
        document.getElementById('bclTitle').innerText = opts.title || 'Tìm kiếm vụ việc liên quan';
        document.getElementById('bclScope').innerText = scope().label;
        document.getElementById('bclStatus').innerHTML = '<option value="">Tất cả</option>' + (opts.statusOptions || STATUS_OPTIONS).map(s => `<option>${esc(s)}</option>`).join('');
        FIELDS.forEach(id => setVal(id, ''));
        setVal('bclCode', opts.prefill || '');
        search();
        document.getElementById('bclModal').classList.add('visible');
    }
    function close() { const m = document.getElementById('bclModal'); if (m) m.classList.remove('visible'); }
    function clear() { FIELDS.forEach(id => setVal(id, '')); search(); }
    function search() {
        const v = id => fold(document.getElementById(id).value);
        const fromEl = document.getElementById('bclFrom'), toEl = document.getElementById('bclTo');
        const from = parseDate(fromEl.value.trim()), to = parseDate(toEl.value.trim());
        [fromEl, toEl].forEach(el => el.classList.remove('is-invalid'));
        const body = document.getElementById('bclBody');
        if (from && to && from > to) {
            [fromEl, toEl].forEach(el => el.classList.add('is-invalid'));
            body.innerHTML = '<tr><td colspan="9" class="bcl-empty" style="color:#dc2626;">Từ ngày QĐ/Bản án không được lớn hơn Đến ngày QĐ/Bản án. [MSG-ERR-VAL-007]</td></tr>';
            return;
        }
        const status = document.getElementById('bclStatus').value;
        const f = { code: v('bclCode'), requester: v('bclRequester'), victim: v('bclVictim'), agency: v('bclAgency'), decisionNo: v('bclDecNo') };
        const list = casesInScope(state.data).filter(r => {
            if (f.code && !fold(r.code).includes(f.code)) return false;
            if (f.requester && !fold(r.requester).includes(f.requester)) return false;
            if (f.victim && !fold(r.victim).includes(f.victim)) return false;
            if (f.agency && !fold(unitName(r.agencyId)).includes(f.agency)) return false;
            if (f.decisionNo && !fold(r.decisionNo).includes(f.decisionNo)) return false;
            const d = parseDate(r.decisionDate);
            if ((from || to) && !d) return false;
            if (from && d < from) return false;
            if (to && d > to) return false;
            if (status && r.status !== status) return false;
            return true;
        });
        body.innerHTML = list.length ? list.map(r => `<tr>
                <td style="white-space:nowrap;font-weight:600;">${esc(r.code)}</td>
                <td style="white-space:nowrap;"><a title="Mở xem chi tiết hồ sơ Giải quyết YCBT tại tab mới" onclick="BTNN_CASE.openDetail('${esc(r.hoSoCode)}')">${esc(r.hoSoCode)}</a></td>
                <td>${esc(r.requester)}</td><td>${esc(r.victim)}</td><td>${esc(unitName(r.agencyId))}</td>
                <td style="white-space:nowrap;">${esc(r.decisionNo)}</td><td style="white-space:nowrap;">${esc(r.decisionDate)}</td>
                <td><span class="bcl-badge">${esc(r.status)}</span></td>
                <td style="text-align:center;"><button type="button" class="btn btn-primary" onclick="BTNN_CASE.choose('${esc(r.code)}')"><i class="fa-solid fa-check"></i> Chọn</button></td>
            </tr>`).join('') : '<tr><td colspan="9" class="bcl-empty">Không tìm thấy dữ liệu phù hợp. [MSG-INF-SYS-001]</td></tr>';
    }
    function choose(code) {
        const item = findInScope(code, state.data);
        if (!item) return;
        close();
        if (typeof state.onSelect === 'function') state.onSelect(Object.assign({ agency: unitName(item.agencyId) }, item));
    }

    // ===================== Tìm kiếm vụ việc toàn hệ thống (BTNN_CASE.sys) =====================
    // Bổ sung, không đổi hành vi các hàm trên. Dùng cho: Theo dõi vụ việc tại Tòa án (vụ việc liên kết),
    // Giải quyết YCBT - Tạo mới "Vụ việc đã có Mã vụ việc".
    // - Phạm vi: toàn bộ vụ việc trên toàn hệ thống, mọi trạng thái (không theo đơn vị đăng nhập);
    //   cùng nguồn và giá trị với Tra cứu vụ việc: claimsList + dữ liệu bổ sung tra_cuu_seed_tcvv.js (window.tcvvExtraClaims).
    // - 01 dòng / Mã vụ việc: theo hồ sơ GQBT gần nhất của vụ việc (ưu tiên hồ sơ chưa kết thúc).
    // - Mã hồ sơ GQBT là HyperLink Xem chi tiết khi thỏa canViewDetail (cùng quy tắc tcvvCanViewDetail của Tra cứu).
    const SYS_STATUSES = ['Chờ tiếp nhận', 'Yêu cầu bổ sung', 'Không thụ lý', 'Cử người giải quyết bồi thường', 'Cử người phục hồi danh dự', 'Chờ duyệt', 'Bị trả lại', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ', 'Chờ chi trả',
        'Hoãn giải quyết', 'Tạm đình chỉ', 'Đình chỉ giải quyết', 'Dừng giải quyết', 'Đã chuyển CQGQBT', 'Đang phục hồi danh dự', 'Hoãn phục hồi danh dự', 'Từ chối phục hồi danh dự', 'Hoàn thành'];
    // Trạng thái hồ sơ đã kết thúc (cùng CLAIM_DONE_TAB_STATES của Giải quyết YCBT)
    const SYS_ENDED = ['Hoàn thành', 'Từ chối phục hồi danh dự', 'Đình chỉ giải quyết', 'Dừng giải quyết', 'Đã chuyển CQGQBT', 'Không thụ lý'];
    const NO_DETAIL_MSG = 'Chỉ Cơ quan giải quyết, Sở Tư pháp quản lý Cơ quan giải quyết, Bộ Tư pháp và Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước được xem chi tiết';
    const SYS_LEGACY = {
        'cho nhap lieu': 'Chờ tiếp nhận', 'cho phe duyet': 'Chờ duyệt', 'bi tra lai': 'Bị trả lại',
        'cho thu ly': 'Cử người giải quyết bồi thường', 'cho kiem tra': 'Cử người giải quyết bồi thường',
        'dang xac minh thiet hai': 'Xác minh thiệt hại', 'dang thuong luong': 'Thương lượng',
        'thuong luong khong thanh cong': 'Chờ ban hành QĐ', 'thuong luong thanh cong': 'Chờ ban hành QĐ',
        'tam dinh chi giai quyet': 'Tạm đình chỉ', 'sung quy nha nuoc': 'Hoàn thành',
        'cho phat hanh van ban': 'Yêu cầu bổ sung', 'tu choi thu ly': 'Không thụ lý', 'tu choi tiep nhan': 'Không thụ lý',
        'tam hoan': 'Hoãn phục hồi danh dự', 'tu choi': 'Từ chối phục hồi danh dự'
    };
    const SYS_FIELD = { 'hành chính': 'Quản lý hành chính', 'hình sự': 'Tố tụng hình sự', 'dân sự': 'Tố tụng dân sự', 'tố tụng hành chính': 'Tố tụng hành chính', 'thi hành án hình sự': 'Thi hành án hình sự', 'thi hành án dân sự': 'Thi hành án dân sự' };
    const ROLE_NBTH = 'Người bị thiệt hại';
    // Trạng thái vụ việc (cùng quy tắc normalizeStatus / caseStatusOf của Tra cứu vụ việc)
    function sysNormStatus(s) { if (!s) return 'Chờ tiếp nhận'; return SYS_STATUSES.includes(s) ? s : (SYS_LEGACY[fold(s)] || s); }
    function sysPhddStatus(ph) {
        const n = fold(ph);
        if (n === 'tam hoan' || n === 'hoan phuc hoi danh du') return 'Hoãn phục hồi danh dự';
        if (n === 'tu choi' || n === 'tu choi phuc hoi danh du') return 'Từ chối phục hồi danh dự';
        if (n === 'hoan thanh' || n === 'dinh chi giai quyet') return ph;
        return 'Đang phục hồi danh dự';
    }
    function sysKind(c) { return ['honor', 'money', 'both'].includes(c.requestType) ? c.requestType : (c.restoreHonor ? 'both' : 'money'); }
    function sysCaseStatus(c) {
        const s = sysNormStatus(c.status);
        if (sysKind(c) === 'honor' && c.phddStarted && c.phddStatus) return sysPhddStatus(c.phddStatus);
        if (sysKind(c) !== 'both' || !c.phddStatus) return s;
        return s === 'Hoàn thành' ? sysPhddStatus(c.phddStatus) : s;
    }
    function sysRequester(c) { return typeof c.nyc === 'string' ? c.nyc : ((c.nyc && c.nyc.name) || c.nycName || ''); }
    function sysVictim(c) {
        const role = c.nycRole || c.role || ROLE_NBTH;
        if (role === ROLE_NBTH) return sysRequester(c);
        if (/^Tổ chức kế thừa/.test(role)) return c.nbthOrgName || (c.nbth && (c.nbth.orgName || c.nbth.name)) || '';
        return (c.nbth && c.nbth.name) || '';
    }
    function sysVbcc(c) {
        const list = (Array.isArray(c.vanBanCanCu) ? c.vanBanCanCu : []).map(v => String((v && (v.name || v.file || v.fileName)) || '').trim()).filter(Boolean);
        if (!list.length && c.docBase) list.push(String(c.docBase).trim());
        return list;
    }
    // Cơ quan giải quyết -> đơn vị gốc trên Cơ cấu tổ chức; Sở Tư pháp quản lý Cơ quan giải quyết (cùng tcvvAgencyStp)
    function sysAgencyUnit(name) { try { return (W() && W().resolveAgencyUnit) ? (W().resolveAgencyUnit(name) || '') : ''; } catch (e) { return ''; } }
    function sysAgencyStp(c, unitId) {
        const w = W();
        if (!w) return '';
        if (unitId) return w.stpOfUnit ? (w.stpOfUnit(unitId) || '') : '';
        const pad = s => ' ' + fold(s).replace(/\btp\./g, 'thanh pho ').replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
        const name = pad(c.agency || ''), prov = pad(c.agencyProvince || c.cqgqTinhThanh || '');
        const stp = w.getRootUnits().filter(u => isStpUnitId(u.id)).find(u => {
            const p = pad(u.name.replace(/^Sở Tư pháp\s*/i, '').replace(/^(Thành phố|Tỉnh)\s+/i, ''));
            return p.trim() && (name.includes(p) || prov.includes(p));
        });
        return stp ? stp.id : '';
    }
    function sysCurrentRoot() {
        const w = W(); const u = w ? w.getCurrentUser() : null;
        return u ? userRootId(u.unitId) : '';
    }
    function sysIsBtpOrCuc() {
        const w = W(); const u = w ? w.getCurrentUser() : null;
        if (!u) return false;
        const chain = [u.unitId].concat((w.getAncestors && w.getAncestors(u.unitId)) || []);
        return chain.some(id => { const unit = w.getUnit(id); return /^BTP/.test(id) || (unit && /^Cục\b/i.test(unit.name) && /Bồi thường nhà nước/i.test(unit.name)); });
    }
    // Quyền Xem chi tiết hồ sơ GQBT, thỏa 01 điều kiện: (1) Cơ quan giải quyết = đơn vị đang đăng nhập;
    // (2) đơn vị đang đăng nhập là Sở Tư pháp quản lý Cơ quan giải quyết; (3) Bộ Tư pháp / Cục ĐKGDBĐ và BTNN: mọi vụ việc
    function canViewDetail(r) {
        const root = sysCurrentRoot();
        if (!r || !r.hoSoCode || !root) return false;
        if (r.agencyUnitId && r.agencyUnitId === root) return true;
        if (isStpUnitId(root) && r.agencyStp === root) return true;
        return sysIsBtpOrCuc();
    }
    // Nguồn dữ liệu: claimsList (truyền vào hoặc đọc localStorage) + dữ liệu bổ sung của Tra cứu vụ việc; trùng Mã hồ sơ: giữ bản ghi đầu
    function sysClaims(claims) {
        let base = claims;
        if (!Array.isArray(base)) { try { base = JSON.parse(localStorage.getItem('claimsList') || '[]'); } catch (e) { base = []; } }
        let extra = [];
        try { extra = typeof global.tcvvExtraClaims === 'function' ? (global.tcvvExtraClaims() || []) : []; } catch (e) { extra = []; }
        const seen = new Set(), out = [];
        (Array.isArray(base) ? base : []).concat(extra.map(c => Object.assign({ _tcvvExtra: true }, c))).forEach(c => {
            if (!c || typeof c !== 'object' || c.deleted || !c.code || seen.has(c.code)) return;
            seen.add(c.code); out.push(c);
        });
        return out;
    }
    function sysVuViecOf(c) {
        const w = W();
        if (!w) return c.maVuViec || '';
        if (w.isVuViecCode(c.code)) return c.code;
        return w.vuViecOf(c.code, { preferred: c.maVuViec });
    }
    // Địa chỉ Cơ quan giải quyết (Tỉnh/Thành phố, Phường/Xã) theo Cơ cấu tổ chức
    function sysAgencyAddr(v) { try { return (W() && W().agencyAddress) ? W().agencyAddress(v) : { tinh: '', phuong: '' }; } catch (e) { return { tinh: '', phuong: '' }; } }
    const sysWardName = w => String(w || '').replace(/^\d+\s*-\s*/, '');
    // Ngày tiếp nhận của vụ việc: ngày tiếp nhận sớm nhất trong các hồ sơ GQBT của vụ việc; không có thì ngày tạo hồ sơ
    function sysClaimDate(c) { return c.date || c.receivedDate || c.ngayTiepNhan || c.receivedAt || c.createdAt || c.createdDate || ''; }
    function sysDateKey(s) {
        const m = String(s || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (m) return new Date(+m[3], +m[2] - 1, +m[1]).getTime();
        const t = Date.parse(s); return isNaN(t) ? 0 : t;
    }
    function sysReceivedDate(list) {
        const ds = list.map(x => sysClaimDate(x.c)).filter(d => sysDateKey(d));
        return ds.sort((a, b) => sysDateKey(a) - sysDateKey(b))[0] || '';
    }
    // Bộ lọc Tỉnh/Thành phố, Phường/Xã của Cơ quan giải quyết (popup Tìm kiếm vụ việc): Combobox có tìm kiếm; Phường/Xã lọc theo Tỉnh/Thành phố đã chọn
    function addrFilterHtml(p) {
        return `<div><label for="${p}Tinh">Tỉnh/Thành phố</label><input id="${p}Tinh" list="${p}TinhList" placeholder="Tất cả" autocomplete="off"><datalist id="${p}TinhList"></datalist></div>`
            + `<div><label for="${p}Phuong">Phường/Xã</label><input id="${p}Phuong" list="${p}PhuongList" placeholder="Chọn Tỉnh/Thành phố trước" autocomplete="off" disabled><datalist id="${p}PhuongList"></datalist></div>`;
    }
    function addrProvinces(list) {
        const w = W(); const set = new Set(Object.keys((w && w.ADDR_WARDS) || {}));
        (list || []).forEach(r => { if (r.agencyTinh) set.add(r.agencyTinh); });
        return Array.from(set).sort((a, b) => a.localeCompare(b, 'vi'));
    }
    function addrInit(p, list) {
        const t = document.getElementById(p + 'Tinh'), ph = document.getElementById(p + 'Phuong');
        if (!t || !ph) return;
        document.getElementById(p + 'TinhList').innerHTML = addrProvinces(list).map(v => `<option value="${esc(v)}"></option>`).join('');
        const sync = clear => {
            const w = W(); const tinh = addrPick(t.value, addrProvinces(list));
            const wards = tinh ? (((w && w.ADDR_WARDS) || {})[tinh] || []).map(sysWardName) : [];
            (list || []).forEach(r => { const n = sysWardName(r.agencyPhuong); if (tinh && r.agencyTinh === tinh && n && !wards.includes(n)) wards.push(n); });
            document.getElementById(p + 'PhuongList').innerHTML = wards.map(v => `<option value="${esc(v)}"></option>`).join('');
            ph.disabled = !tinh; ph.placeholder = tinh ? 'Tất cả' : 'Chọn Tỉnh/Thành phố trước';
            if (clear || !tinh) ph.value = '';
        };
        if (!t.dataset.addrBound) { t.addEventListener('input', () => sync(true)); t.addEventListener('change', () => sync(true)); t.dataset.addrBound = '1'; }
        sync(false);
    }
    // Giá trị nhập khớp 01 giá trị trong danh sách (không phân biệt hoa thường, dấu); không khớp: tìm gần đúng
    function addrPick(v, opts) { const f = fold(v); if (!f) return ''; return (opts || []).find(o => fold(o) === f) || v.trim(); }
    function addrClear(p) { ['Tinh', 'Phuong'].forEach(k => { const el = document.getElementById(p + k); if (el) el.value = ''; }); const ph = document.getElementById(p + 'Phuong'); if (ph) { ph.disabled = true; ph.placeholder = 'Chọn Tỉnh/Thành phố trước'; } }
    function addrMatch(r, p) {
        const t = fold((document.getElementById(p + 'Tinh') || {}).value), ph = fold((document.getElementById(p + 'Phuong') || {}).value);
        if (t && !fold(r.agencyTinh).includes(t)) return false;
        if (ph && !fold(sysWardName(r.agencyPhuong)).includes(ph)) return false;
        return true;
    }
    // opts: { claims, statusOf(claim) } -> [{ code (Mã vụ việc), hoSoCode, hoSoCodes, claimId, requester, victim, vbccNames, fieldGroup, fieldGroupName,
    //   hasPhdd, agencyUnitId, agencyId, agency, agencyStp, status, hasOpen, extra }]
    function rows(opts) {
        opts = opts || {};
        const statusOf = typeof opts.statusOf === 'function' ? opts.statusOf : sysCaseStatus;
        const byVv = new Map();
        sysClaims(opts.claims).forEach(c => {
            const st = statusOf(c);
            if (!SYS_STATUSES.includes(st)) return;
            const vv = sysVuViecOf(c);
            if (!vv) return;
            if (!byVv.has(vv)) byVv.set(vv, []);
            byVv.get(vv).push({ c, st });
        });
        const out = [];
        byVv.forEach((list, vv) => {
            const open = list.filter(x => !SYS_ENDED.includes(x.st));
            const rep = (open.length ? open : list)[(open.length ? open : list).length - 1];
            const c = rep.c;
            const unitId = sysAgencyUnit(c.agency);
            const addr = sysAgencyAddr(unitId || c.agency);
            out.push({
                code: vv, maVuViec: vv, hoSoCode: c.code, hoSoCodes: list.map(x => x.c.code), claimId: c.id || '',
                requester: sysRequester(c), victim: sysVictim(c), vbccNames: sysVbcc(c),
                fieldGroup: c.fieldGroup || '', fieldGroupName: SYS_FIELD[c.fieldGroup] || c.fieldGroup || '-', hasPhdd: sysKind(c) !== 'money',
                agencyUnitId: unitId, agencyId: unitId, agency: unitId ? unitName(unitId) : (c.agency || ''), agencyStp: sysAgencyStp(c, unitId),
                status: rep.st, hasOpen: open.length > 0, extra: !!c._tcvvExtra,
                agencyTinh: addr.tinh, agencyPhuong: addr.phuong, receivedDate: sysReceivedDate(list)
            });
        });
        // Thời gian tiếp nhận giảm dần (mới nhất lên đầu); cùng ngày: Mã vụ việc giảm dần
        return out.sort((a, b) => (sysDateKey(b.receivedDate) - sysDateKey(a.receivedDate)) || b.code.localeCompare(a.code));
    }
    // Tìm theo Mã vụ việc / Mã hồ sơ GQBT (khớp chính xác, không phân biệt hoa thường)
    function findRow(list, value) {
        const f = fold(value);
        return f ? (list || []).find(r => fold(r.code) === f || (r.hoSoCodes || [r.hoSoCode]).some(h => fold(h) === f)) || null : null;
    }
    // Xem chi tiết hồ sơ GQBT ở chế độ chỉ xem tại tab mới (cùng đường dẫn Xem chi tiết của Tra cứu vụ việc)
    function detailUrl(r) {
        const p = new URLSearchParams({ id: r.hoSoCode, returnUrl: 'tra_cuu_ho_so_boi_thuong.html?v=1', returnActiveUrl: 'tra_cuu_ho_so_boi_thuong.html?v=1', readonly: '1', mode: 'detail' });
        if (['Đang phục hồi danh dự', 'Hoãn phục hồi danh dự'].includes(r.status)) p.set('focusTab', 'phdd');
        if (r.extra) p.set('tcvvPreview', '1');
        return `quan_ly_boi_thuong.html?${p.toString()}`;
    }
    function openRowDetail(r) {
        if (!canViewDetail(r)) { if (typeof global.showToast === 'function') global.showToast(NO_DETAIL_MSG, 'error'); return; }
        // newtab=1: nút Đóng ở trang chi tiết đóng tab
        global.open(detailUrl(r) + '&newtab=1', '_blank');
    }
    // Ô lưới (sau STT, trước Thao tác): Mã vụ việc | Mã hồ sơ GQBT | Tên yêu cầu | Tên bị thiệt hại | Văn bản làm căn cứ | Lĩnh vực | Yêu cầu PHDD | Cơ quan giải quyết | Trạng thái
    // openFn: tên hàm toàn cục nhận chỉ số dòng để mở chi tiết
    function cellsHtml(r, i, openFn, badgeClass) {
        const code = canViewDetail(r)
            ? `<a title="Mở xem chi tiết hồ sơ Giải quyết YCBT tại tab mới" onclick="event.stopPropagation(); ${openFn}(${i})">${esc(r.hoSoCode)}</a>`
            : `<span title="${esc(NO_DETAIL_MSG)}">${esc(r.hoSoCode || '-')}</span>`;
        const vb = r.vbccNames.length
            ? `<span title="${esc(r.vbccNames.map((n, k) => `${k + 1}. ${n}`).join('\n'))}">${esc(r.vbccNames[0])}${r.vbccNames.length > 1 ? ` <span style="display:inline-block;padding:0 6px;border-radius:999px;background:#e2e8f0;color:#334155;font-size:11px;font-weight:600;">+${r.vbccNames.length - 1}</span>` : ''}</span>`
            : '-';
        return `<td style="white-space:nowrap;font-weight:600;">${esc(r.code)}</td>
                <td style="white-space:nowrap;">${code}</td>
                <td>${esc(r.requester || '-')}</td><td>${esc(r.victim || '-')}</td><td>${vb}</td><td>${esc(r.fieldGroupName)}</td>
                <td style="text-align:center;"><input type="checkbox" disabled ${r.hasPhdd ? 'checked' : ''} aria-label="Yêu cầu phục hồi danh dự"></td>
                <td>${esc(r.agency || '-')}</td>
                <td>${esc(r.agencyTinh || '---')}</td><td>${esc(sysWardName(r.agencyPhuong) || '---')}</td>
                <td><span class="${badgeClass || 'bcl-badge'}">${esc(r.status)}</span></td>`;
    }
    const HEAD_HTML = '<th style="width:50px;text-align:center;">STT</th><th>Mã vụ việc</th><th>Mã hồ sơ GQBT</th><th style="min-width:140px;white-space:normal;">Tên cá nhân/Tổ chức yêu cầu</th><th style="min-width:140px;white-space:normal;">Tên cá nhân/Tổ chức bị thiệt hại</th>'
        + '<th style="min-width:200px;white-space:normal;">Văn bản làm căn cứ bồi thường</th><th style="min-width:110px;white-space:normal;">Lĩnh vực phát sinh thiệt hại</th><th style="width:80px;text-align:center;white-space:normal;">Yêu cầu phục hồi danh dự</th>'
        + '<th style="min-width:150px;white-space:normal;">Cơ quan giải quyết</th><th style="min-width:110px;white-space:normal;">Tỉnh/Thành phố</th><th style="min-width:120px;white-space:normal;">Phường/Xã</th><th>Trạng thái</th><th style="text-align:center;">Thao tác</th>';
    const sys = { STATUSES: SYS_STATUSES, ENDED: SYS_ENDED, NO_DETAIL_MSG, HEAD_HTML, COLS: 13, rows, addrFilterHtml, addrInit, addrClear, addrMatch, findRow, canViewDetail, detailUrl, openRowDetail, cellsHtml, caseStatus: sysCaseStatus, fold, esc };

    global.BTNN_CASE = { CASES, STATUS_OPTIONS, scope, provinceOfUnit, casesInScope, findInScope, toVuViec, open, close, clear, search, choose, openDetail, sys };
})(window);
