/*
 * Popup chuẩn Tìm kiếm nâng cao vụ việc BTNN (mockup) - dùng chung cho các màn có trường Mã vụ việc liên quan.
 * Lưới: Mã vụ việc (mở chi tiết tab mới), Họ và tên người yêu cầu, Họ và tên người bị thiệt hại, Cơ quan giải quyết,
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
        code, requester, victim: victim || requester, agencyId, decisionNo: decisionNo || '-', decisionDate: decisionDate || '-', status, receivedBy, detailType: 'claim'
    });
    // Vụ việc yêu cầu bồi thường mẫu (trạng thái khác Chờ tiếp nhận)
    const CASES = [
        row('BT-2026-012', 'Lê Văn H', '', 'UBND-CG', '22/QĐ-GQBT', '05/08/2026', 'Hoàn thành'),
        row('BT-2026-021', 'Hoàng Văn R', '', 'CCTHADS-BT', '', '', 'Đang xác minh thiệt hại'),
        row('BT-2026-003-A', 'Công ty ABC', '', 'UBND-HK', '', '', 'Đang thương lượng'),
        row('BT-2026-010-TDC', 'Đặng Thị Thu', 'Đặng Văn T', 'THADS-LD', '', '', 'Chờ thụ lý', 'STP-HN'),
        row('BT-2026-045', 'Nguyễn Văn Bình', '', 'TAND-HN', 'Bản án số 12/2026/HSST', '10/06/2026', 'Hoàn thành'),
        row('BT-2026-030', 'Trần Thị Mai', '', 'UBND-DD', '', '', 'Đang thương lượng'),
        row('BT-2026-052', 'Công ty TNHH Minh Phát', '', 'TAND-LD', 'Bản án số 45/2026/HCST', '15/07/2026', 'Đang xác minh thiệt hại'),
        row('BT-2026-018', 'Lê Văn Hùng', '', 'THADS-HP', '', '', 'Không thụ lý'),
        row('BT-2026-038', 'Phạm Thị Hoa', '', 'CA-TX', '', '', 'Chờ thụ lý'),
        row('BT-2026-022', 'Đỗ Thị Hằng', 'Đỗ Văn Nam', 'VKS-Q1', 'Bản án số 08/2026/DSPT', '05/06/2026', 'Đình chỉ giải quyết'),
        row('BT-2026-014', 'Vũ Thị Lan', '', 'UBND-CG', '', '', 'Chờ ban hành QĐ'),
        row('BT-2026-061', 'Hoàng Văn Đức', '', 'TAND-NT', 'Bản án số 33/2026/HCPT', '18/03/2026', 'Đang phục hồi danh dự'),
        row('BT-2026-009', 'Bùi Thị Thu', '', 'CCTHADS-TT', '05/QĐ-GQBT', '10/01/2026', 'Sung quỹ nhà nước')
    ];
    const STATUS_OPTIONS = ['Chờ duyệt', 'Bị trả lại', 'Chờ phát hành văn bản', 'Yêu cầu bổ sung', 'Chờ thụ lý', 'Không thụ lý', 'Đã chuyển CQGQBT',
        'Đang xác minh thiệt hại', 'Đang thương lượng', 'Chờ ban hành QĐ', 'Chờ thực thi', 'Hoàn thành', 'Hoãn giải quyết', 'Tạm đình chỉ giải quyết', 'Đình chỉ giải quyết', 'Sung quỹ nhà nước', 'Đang phục hồi danh dự'];

    function fold(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim(); }
    function parseDate(s) { const p = String(s || '').split('/'); return p.length === 3 ? new Date(p[2], p[1] - 1, p[0]) : null; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

    // Tỉnh/Thành phố của đơn vị theo tên trên cây Cơ cấu tổ chức (đơn vị trung ương: null)
    function provinceOfUnit(unitId) {
        const m = unitName(unitId).match(/(thành phố|tỉnh)\s+([^,]+)$/i);
        return m ? { key: m[2].trim().toLowerCase(), label: m[0].charAt(0).toUpperCase() + m[0].slice(1) } : null;
    }
    // Phạm vi dữ liệu theo cấp của người dùng đăng nhập
    function scope() {
        const w = W();
        const user = w ? w.getCurrentUser() : null;
        const rootId = user ? w.getRootId(user.unitId) : 'BTP-01';
        const rootName = unitName(rootId);
        if (rootId === 'BTP-01') return { level: 'BTP', rootId, label: 'Toàn quốc (người dùng thuộc Bộ Tư pháp)', allowCase: () => true, allowUnit: () => true };
        const prov = provinceOfUnit(rootId);
        const inProv = id => !!prov && (provinceOfUnit(id) || {}).key === prov.key;
        if (rootId.startsWith('STP-')) {
            return {
                level: 'STP', rootId, province: prov,
                label: `Vụ việc do cơ quan trên địa bàn ${prov ? prov.label : ''} giải quyết và vụ việc do ${rootName} tiếp nhận`,
                allowCase: r => inProv(r.agencyId) || r.receivedBy === rootId,
                allowUnit: inProv
            };
        }
        return { level: 'CQ', rootId, label: `Vụ việc do ${rootName} giải quyết`, allowCase: r => w.getRootId(r.agencyId) === rootId, allowUnit: id => w.getRootId(id) === rootId };
    }
    function casesInScope(data) { const s = scope(); return (data || CASES).filter(s.allowCase); }
    function findInScope(code, data) { return casesInScope(data).find(r => r.code === code) || null; }

    // Mở xem chi tiết vụ việc tại tab trình duyệt mới
    function openDetail(code) { global.open(`quan_ly_boi_thuong.html?id=${encodeURIComponent(code)}&mode=view`, '_blank'); }

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
                        ${input('bclCode', 'Mã vụ việc', 'Nhập mã vụ việc...')}
                        ${input('bclRequester', 'Họ và tên người yêu cầu', 'Nhập họ và tên người yêu cầu...')}
                        ${input('bclVictim', 'Họ và tên người bị thiệt hại', 'Nhập họ và tên người bị thiệt hại...')}
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
                        <thead><tr><th>Mã vụ việc</th><th>Họ và tên người yêu cầu</th><th>Họ và tên người bị thiệt hại</th><th>Cơ quan giải quyết</th><th>Số QĐ/Bản án</th><th>Ngày QĐ/Bản án</th><th>Trạng thái</th><th style="text-align:center;">Thao tác</th></tr></thead>
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
            body.innerHTML = '<tr><td colspan="8" class="bcl-empty" style="color:#dc2626;">Từ ngày QĐ/Bản án không được lớn hơn Đến ngày QĐ/Bản án. [MSG-ERR-VAL-007]</td></tr>';
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
                <td style="white-space:nowrap;"><a title="Mở xem chi tiết vụ việc tại tab mới" onclick="BTNN_CASE.openDetail('${esc(r.code)}')">${esc(r.code)}</a></td>
                <td>${esc(r.requester)}</td><td>${esc(r.victim)}</td><td>${esc(unitName(r.agencyId))}</td>
                <td style="white-space:nowrap;">${esc(r.decisionNo)}</td><td style="white-space:nowrap;">${esc(r.decisionDate)}</td>
                <td><span class="bcl-badge">${esc(r.status)}</span></td>
                <td style="text-align:center;"><button type="button" class="btn btn-primary" onclick="BTNN_CASE.choose('${esc(r.code)}')"><i class="fa-solid fa-check"></i> Chọn</button></td>
            </tr>`).join('') : '<tr><td colspan="8" class="bcl-empty">Không tìm thấy dữ liệu phù hợp. [MSG-INF-SYS-001]</td></tr>';
    }
    function choose(code) {
        const item = findInScope(code, state.data);
        if (!item) return;
        close();
        if (typeof state.onSelect === 'function') state.onSelect(Object.assign({ agency: unitName(item.agencyId) }, item));
    }

    global.BTNN_CASE = { CASES, STATUS_OPTIONS, scope, provinceOfUnit, casesInScope, findInScope, open, close, clear, search, choose, openDetail };
})(window);
