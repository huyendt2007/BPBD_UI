/*
 * Danh mục Tình trạng hiệu lực [DM_61] - thư viện dùng chung cho Văn bản quy phạm pháp luật (BPBĐ + BTNN)
 * và Văn bản chỉ đạo, điều hành (Trung ương / Địa phương).
 * Đọc dữ liệu đã lưu tại Quản lý danh mục (localStorage 'masterCategories'); chưa có thì dùng dữ liệu khởi tạo bên dưới.
 * Bản ghi văn bản lưu mã giá trị (tinhTrangMa) + tên tại thời điểm lưu (tinhTrang); hiển thị theo tên hiện hành của mã.
 */
(function (global) {
    const TYPE = 'DM_61';
    const SEED = [
        { typeCode: TYPE, code: 'TTHL_01', name: 'Còn hiệu lực', nameEn: '', val: '', valEn: '', parentCode: '', notes: '', status: 'Hoạt động' },
        { typeCode: TYPE, code: 'TTHL_02', name: 'Hết hiệu lực', nameEn: '', val: '', valEn: '', parentCode: '', notes: '', status: 'Hoạt động' },
        { typeCode: TYPE, code: 'TTHL_03', name: 'Bị sửa đổi bổ sung', nameEn: '', val: '', valEn: '', parentCode: '', notes: '', status: 'Hoạt động' }
    ];
    // Màu badge theo giá trị khởi tạo; giá trị Quản trị viên thêm mới dùng màu trung tính
    const COLOR = { TTHL_01: 'badge-success', TTHL_02: 'badge-danger', TTHL_03: 'badge-warning' };
    const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

    function all() {
        let saved = [];
        try { saved = JSON.parse(localStorage.getItem('masterCategories')) || []; } catch (e) { saved = []; }
        const src = saved.some(c => c && c.typeCode === TYPE) ? saved : SEED;
        return src.filter(c => c && c.typeCode === TYPE);
    }
    const isActive = c => c && c.status === 'Hoạt động';
    function active() { return all().filter(isActive); }
    function get(code) { return all().find(c => c.code === code) || null; }
    function name(code, fallback) { const c = get(code); return c ? c.name : (fallback || ''); }
    // Quy đổi tên (dữ liệu cũ lưu tên) sang mã
    function codeOf(n) {
        const s = String(n || '').trim();
        if (!s) return '';
        const c = all().find(x => x.name === s);
        if (c) return c.code;
        if (/một phần|sửa đổi/i.test(s)) return 'TTHL_03';
        if (/hết|ngưng|toàn bộ|bãi bỏ/i.test(s)) return 'TTHL_02';
        return 'TTHL_01';
    }
    // Mã mặc định khi Thêm mới: Còn hiệu lực nếu đang sử dụng, không thì giá trị đang sử dụng đầu tiên
    function defaultCode() { const a = active(); return (a.find(c => c.code === 'TTHL_01') || a[0] || {}).code || ''; }
    function badgeClass(code) { return COLOR[code] || 'badge-secondary'; }
    function badge(code, fallback) {
        const n = name(code, fallback);
        return `<span class="badge ${badgeClass(code)}">${esc(n || '—')}</span>`;
    }
    // Đổ giá trị vào combobox: chỉ giá trị đang sử dụng; keepCode (bản ghi cũ có giá trị đã ngừng) vẫn được giữ để hiển thị
    function fillSelect(sel, firstLabel, keepCode) {
        if (!sel) return;
        const cur = keepCode !== undefined ? keepCode : sel.value;
        const items = active().slice();
        if (cur && !items.some(c => c.code === cur)) { const c = get(cur); if (c) items.push(c); }
        sel.innerHTML = `<option value="">${esc(firstLabel)}</option>` + items.map(c => `<option value="${esc(c.code)}">${esc(c.name)}</option>`).join('');
        sel.value = items.some(c => c.code === cur) ? cur : '';
    }
    // Chuẩn hóa bản ghi: bổ sung mã từ tên (dữ liệu cũ), đồng bộ tên snapshot; trả về true nếu có thay đổi
    function normalize(d) {
        if (!d) return false;
        let ch = false;
        if (!d.tinhTrangMa) { d.tinhTrangMa = codeOf(d.tinhTrang) || defaultCode(); ch = true; }
        const n = name(d.tinhTrangMa, d.tinhTrang);
        if (n && n !== d.tinhTrang) { d.tinhTrang = n; ch = true; }
        return ch;
    }
    global.DM_TTHL = { TYPE, SEED, all, active, get, name, codeOf, defaultCode, badgeClass, badge, fillSelect, normalize };
})(window);
