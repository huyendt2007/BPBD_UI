/**
 * Phạm vi dữ liệu Bộ Tư pháp - Sở Tư pháp (dùng chung các màn hình nhóm "Nghiệp vụ dùng chung BTP & STP" và "Nghiệp vụ dùng cho STP").
 * Quy tắc (SRS: Quy tắc phạm vi dữ liệu Bộ Tư pháp - Sở Tư pháp - Danh mục và Phụ lục - Tài liệu tổng hợp):
 * - Sở Tư pháp: cơ quan, đơn vị có Loại cơ quan "Sở" [DM_57] và tên bắt đầu "Sở Tư pháp".
 *   Dữ liệu mẫu BTNN_WF.ORG_UNITS chưa có thuộc tính Loại cơ quan: chỉ kiểm tra tên; có thuộc tính (loaiCoQuan/loaiCoQuanName) thì kiểm tra thêm Loại cơ quan.
 * - Đơn vị thực hiện của bản ghi: Bộ Tư pháp (người tạo thuộc Bộ Tư pháp/Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước) hoặc Sở Tư pháp của người tạo.
 * - Người dùng thuộc Bộ Tư pháp/Cục: xem bản ghi của Bộ Tư pháp và của mọi Sở Tư pháp; chỉ thao tác trên bản ghi của Bộ Tư pháp.
 * - Người dùng thuộc Sở Tư pháp: chỉ xem, thao tác bản ghi của Sở mình.
 * - Người dùng thuộc UBND cấp tỉnh: chỉ xem bản ghi của Sở Tư pháp trực thuộc (Sở Tư pháp là đơn vị con của UBND cấp tỉnh trên cây Cơ cấu tổ chức;
 *   mockup giữ Sở Tư pháp là đơn vị gốc, quan hệ trực thuộc lấy tại BTNN_WF.UBND_TINH_STP như phân hệ Xác định CQGQBT).
 * - Người dùng thuộc đơn vị khác: không xem được dữ liệu.
 * Yêu cầu nạp trước: btnn_luong_xu_ly.js (BTNN_WF).
 */
(function (global) {
    const BTP = 'BTP-01';
    const W = () => global.BTNN_WF || null;
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const fold = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

    function rootOf(id) { const w = W(); return w && id ? (w.getRootId(id) || id) : id; }
    function unitName(id) { const w = W(); return (w && id && w.unitName(id)) || ''; }
    const chainOf = id => { const w = W(); return w && w.getAncestors ? w.getAncestors(id) : [id]; };
    // Tên Loại cơ quan [DM_57] của đơn vị (nếu dữ liệu cơ cấu tổ chức có khai báo)
    function loaiCoQuanOf(u) {
        if (!u) return '';
        if (u.loaiCoQuanName) return u.loaiCoQuanName;
        if (u.loaiCoQuan && /^LDV_/.test(u.loaiCoQuan)) { const l = global.DM_LCQ && global.DM_LCQ.getLoai ? global.DM_LCQ.getLoai(u.loaiCoQuan) : null; return l ? l.name : ''; }
        return u.loaiCoQuan || '';
    }
    // Nhận diện Sở Tư pháp: Loại cơ quan "Sở" + tên bắt đầu "Sở Tư pháp"
    // Dùng hàm chung BTNN_WF.isStpUnit khi có; không có thì xét theo quy tắc tại chỗ
    function isStpUnit(id) {
        const w = W(); if (w && w.isStpUnit) return w.isStpUnit(id);
        const u = w && w.getUnit ? w.getUnit(id) : null;
        if (!u || !/^Sở Tư pháp/i.test(u.name)) return false;
        const loai = loaiCoQuanOf(u);
        return !loai || loai === 'Sở';
    }
    // Sở Tư pháp của đơn vị: Sở Tư pháp là đơn vị đó hoặc chứa đơn vị đó trên cây
    const stpOf = id => chainOf(id).find(isStpUnit) || '';
    function isBtpUnit(id) { return rootOf(id) === BTP; }
    // UBND cấp tỉnh: đơn vị gốc có bảng Sở Tư pháp trực thuộc (BTNN_WF.UBND_TINH_STP) hoặc có Sở Tư pháp con trên cây
    function managedStps(ubndId) {
        const w = W(); if (!w) return [];
        const map = w.UBND_TINH_STP || {};
        const fromMap = Object.prototype.hasOwnProperty.call(map, ubndId) ? map[ubndId] : [];
        const fromTree = w.ORG_UNITS.filter(u => isStpUnit(u.id) && u.id !== ubndId && chainOf(u.id).includes(ubndId)).map(u => u.id);
        return [...new Set([...fromMap, ...fromTree])];
    }
    function isUbndTinh(id) { const w = W(); const map = (w && w.UBND_TINH_STP) || {}; return Object.prototype.hasOwnProperty.call(map, id) || managedStps(id).length > 0; }
    const userUnit = () => { const w = W(); const u = w ? w.getCurrentUser() : null; return u ? u.unitId : BTP; };
    // Đơn vị của người dùng theo phạm vi: Bộ Tư pháp, Sở Tư pháp của người dùng, hoặc đơn vị gốc (UBND cấp tỉnh/đơn vị khác)
    function root() { const id = userUnit(); if (isBtpUnit(id)) return BTP; return stpOf(id) || rootOf(id); }
    function level() {
        const id = userUnit();
        if (isBtpUnit(id)) return 'BTP';
        if (stpOf(id)) return 'STP';
        return isUbndTinh(rootOf(id)) ? 'UBND_TINH' : 'OTHER';
    }
    const isBtp = () => level() === 'BTP';
    const isStp = () => level() === 'STP';
    function stpUnits() {
        const w = W(); if (!w) return [];
        return w.ORG_UNITS.filter(u => isStpUnit(u.id)).sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }
    // Bản ghi chưa gắn đơn vị (tạo mới trong phiên làm việc) thuộc đơn vị của người dùng đang đăng nhập
    const ownerOf = rec => (rec && rec.unit) || root();
    function canSee(owner) {
        const lv = level();
        if (lv === 'BTP') return owner === BTP || isStpUnit(owner);
        if (lv === 'STP') return owner === root();
        if (lv === 'UBND_TINH') return managedStps(root()).includes(owner);
        return false;
    }
    // Chỉ Bộ Tư pháp/Cục và Sở Tư pháp thao tác trên bản ghi của đơn vị mình; UBND cấp tỉnh chỉ xem
    const canEdit = owner => ['BTP', 'STP'].includes(level()) && owner === root();
    // stpOnly: chức năng thuộc nhóm "Nghiệp vụ dùng cho STP" (Bộ Tư pháp chỉ xem)
    function canCreate(stpOnly) { const lv = level(); return lv === 'STP' || (lv === 'BTP' && !stpOnly); }
    const DENY_MSG = 'Đơn vị của người dùng không thuộc phạm vi dữ liệu của chức năng này.';
    const denyRow = colspan => `<tr><td colspan="${colspan}" style="text-align:center; color:var(--text-muted); font-style:italic; padding:26px;"><i class="fa-solid fa-circle-info"></i> ${DENY_MSG}</td></tr>`;

    // Cán bộ xử lý: cán bộ đã nhập bản ghi (người tạo); bản ghi chưa gắn người tạo (thêm mới trong phiên) là người dùng đang đăng nhập
    function currentUserName() { const w = W(); const u = w ? w.getCurrentUser() : null; return u ? u.name : ''; }
    const creatorOf = rec => (rec && rec.creator) || currentUserName();

    // Bộ lọc Đơn vị thực hiện: Cây đơn vị chọn nhiều (Tree select) theo Cơ cấu tổ chức, có ô tìm kiếm theo tên.
    // - Cây gồm đơn vị trong phạm vi dữ liệu: Bộ Tư pháp/Cục và đơn vị trực thuộc (nhóm dùng chung), các Sở Tư pháp và đơn vị trực thuộc.
    // - Tích nút cha: tích toàn bộ nút con; "Tất cả": bỏ chọn (không lọc); chọn nhanh "Các Sở Tư pháp": tích toàn bộ các Sở trong cây.
    // - Chỉ hiển thị với người dùng thuộc Bộ Tư pháp/Cục. Giá trị: danh sách mã đơn vị đã tích, ngăn cách dấu phẩy.
    const children = id => { const w = W(); return w && w.getChildren ? w.getChildren(id) : []; };
    const descendantsOf = id => { const out = []; (function walk(p) { children(p).forEach(c => { out.push(c.id); walk(c.id); }); })(id); return out; };
    const ancestorsOf = id => { const w = W(); return w && w.getAncestors ? w.getAncestors(id).filter(a => a !== id) : []; };
    const treeRoots = includeBtp => [...(includeBtp ? [BTP] : []), ...stpUnits().map(u => u.id)];
    function nodeHtml(fid, id, depth) {
        return `<div class="pvdv-node" data-id="${esc(id)}" style="padding-left:${depth * 18}px"><label class="pvdv-opt"><input type="checkbox" value="${esc(id)}" onchange="BTNN_PHAMVI._toggle('${fid}', this)"> <span>${esc(unitName(id))}</span></label></div>`
            + children(id).map(k => nodeHtml(fid, k.id, depth + 1)).join('');
    }
    function filterHtml(opts) {
        if (!isBtp()) return '';
        const o = Object.assign({ id: 'filter_unit', label: 'Đơn vị thực hiện', includeBtp: true }, opts || {});
        return `<div class="form-group pvdv-wrap" data-pvdv="${o.id}"><span class="form-label">${esc(o.label)}</span>
            <input type="hidden" id="${o.id}" value="">
            <div class="pvdv-box">
                <input class="form-control pvdv-input" id="${o.id}_text" value="Tất cả" readonly onclick="BTNN_PHAMVI._open('${o.id}')">
                <i class="fa-solid fa-chevron-down pvdv-caret"></i>
                <div class="pvdv-list" id="${o.id}_list">
                    <input class="form-control pvdv-search" id="${o.id}_q" placeholder="Nhập tên đơn vị để tìm kiếm..." autocomplete="off" oninput="BTNN_PHAMVI._search('${o.id}')">
                    <div class="pvdv-tools">
                        <label class="pvdv-opt pvdv-all"><input type="checkbox" data-role="all" onchange="BTNN_PHAMVI._toggle('${o.id}', this)"> <span>Tất cả</span></label>
                        <button type="button" class="pvdv-quick" onclick="BTNN_PHAMVI._quickStp('${o.id}')"><i class="fa-solid fa-check-double"></i> Các Sở Tư pháp</button>
                    </div>
                    <div class="pvdv-tree">${treeRoots(o.includeBtp).map(id => nodeHtml(o.id, id, 0)).join('')}</div>
                </div>
            </div></div>`;
    }
    const selected = id => ((document.getElementById(id) || {}).value || '').split(',').filter(Boolean);
    // Đơn vị đã chọn ở mức cao nhất (nút cha không được chọn): dùng cho ô hiển thị và ghi chú Excel
    const topSelected = id => { const sel = selected(id); return sel.filter(u => !ancestorsOf(u).some(a => sel.includes(a))); };
    function _sync(id) {
        const list = document.getElementById(`${id}_list`); if (!list) return;
        const sel = selected(id);
        list.querySelectorAll('.pvdv-tree input').forEach(cb => { cb.checked = sel.includes(cb.value); });
        const all = list.querySelector('input[data-role="all"]'); if (all) all.checked = !sel.length;
        const text = document.getElementById(`${id}_text`), top = topSelected(id);
        text.value = !top.length ? 'Tất cả' : top.length === 1 ? unitName(top[0]) : `Đã chọn ${top.length} đơn vị`;
        text.title = top.map(unitName).join('; ');
    }
    function _open(id) {
        const list = document.getElementById(`${id}_list`); if (!list) return;
        const show = list.style.display !== 'block';
        list.style.display = show ? 'block' : 'none';
        if (show) { const q = document.getElementById(`${id}_q`); q.value = ''; _search(id); _sync(id); q.focus(); }
    }
    // Tìm theo tên: hiển thị nút khớp và các nút cha của nút khớp
    function _search(id) {
        const q = fold(document.getElementById(`${id}_q`).value.trim());
        const nodes = [...document.querySelectorAll(`#${id}_list .pvdv-node`)];
        const keep = new Set();
        nodes.forEach(n => { if (!q || fold(n.textContent).includes(q)) { keep.add(n.dataset.id); ancestorsOf(n.dataset.id).forEach(a => keep.add(a)); } });
        nodes.forEach(n => { n.style.display = keep.has(n.dataset.id) ? '' : 'none'; });
    }
    function _toggle(id, cb) {
        const hidden = document.getElementById(id); let sel = selected(id);
        if (cb.dataset.role === 'all') sel = [];
        else {
            const ids = [cb.value, ...descendantsOf(cb.value)];
            // Tích nút cha: tích toàn bộ nút con; bỏ tích: bỏ cả nút con và nút cha
            sel = cb.checked ? [...new Set([...sel, ...ids])] : sel.filter(s => !ids.includes(s) && !ancestorsOf(cb.value).includes(s));
        }
        hidden.value = sel.join(',');
        _sync(id);
    }
    // Chọn nhanh cụm Sở: tích toàn bộ các Sở Tư pháp (kèm đơn vị trực thuộc) trong cây
    function _quickStp(id) {
        const hidden = document.getElementById(id);
        const ids = stpUnits().flatMap(u => [u.id, ...descendantsOf(u.id)]);
        hidden.value = [...new Set([...selected(id), ...ids])].join(',');
        _sync(id);
    }
    // Gán giá trị (mảng mã đơn vị): dùng khi xóa bộ lọc / kiểm thử
    function setFilter(ids, id) { const h = document.getElementById(id || 'filter_unit'); if (!h) return; h.value = (ids || []).join(','); _sync(id || 'filter_unit'); }
    // Click ra ngoài: đóng danh sách
    document.addEventListener('mousedown', e => {
        document.querySelectorAll('.pvdv-list').forEach(l => { if (l.style.display === 'block' && !l.parentElement.contains(e.target)) l.style.display = 'none'; });
    });
    const filterValue = id => selected(id || 'filter_unit');
    // Lọc: Đơn vị thực hiện của bản ghi hoặc đơn vị công tác của Cán bộ xử lý (người tạo) thuộc các đơn vị đã tích; chưa tích: không lọc
    function creatorUnit(name) { const w = W(); const u = w && w.USERS ? w.USERS.find(x => x.name === name) : null; return u ? u.unitId : ''; }
    const matchFilter = (owner, creatorName, id) => { const v = filterValue(id); return !v.length || v.includes(owner) || (!!creatorName && v.includes(creatorUnit(creatorName))); };
    // Ghi chú dòng 2 tệp Excel: đơn vị đã chọn ở bộ lọc (không chọn: không ghi)
    const filterNote = id => { const v = topSelected(id || 'filter_unit'); return v.length ? `Đơn vị thực hiện: ${v.map(unitName).join('; ')}` : ''; };

    const css = '.pvdv-box{position:relative}.pvdv-input{padding-right:28px;cursor:pointer;background:#fff}.pvdv-caret{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:11px;color:#64748b;pointer-events:none}'
        + '.pvdv-list{display:none;position:absolute;z-index:50;left:0;min-width:100%;width:max-content;max-width:460px;top:100%;max-height:340px;overflow:auto;background:#fff;border:1px solid #cbd5e1;border-radius:6px;box-shadow:0 8px 20px rgba(15,23,42,.12);margin-top:2px;padding:6px}'
        + '.pvdv-search{margin-bottom:6px}.pvdv-tools{display:flex;align-items:center;justify-content:space-between;gap:8px;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:4px}'
        + '.pvdv-opt{display:flex;align-items:center;gap:8px;padding:5px 6px;font-size:13px;cursor:pointer;border-radius:4px}.pvdv-opt:hover{background:#eff6ff}.pvdv-all{font-weight:600}'
        + '.pvdv-quick{border:1px solid #bfdbfe;background:#eff6ff;color:#1d4ed8;border-radius:4px;font-size:12px;padding:4px 8px;cursor:pointer;white-space:nowrap}.pvdv-quick:hover{background:#dbeafe}';
    try { const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); } catch (e) { /* bỏ qua */ }

    global.BTNN_PHAMVI = { BTP, root, level, isBtp, isStp, isStpUnit, stpOf, managedStps, stpUnits, unitName, ownerOf, creatorOf, canSee, canEdit, canCreate, DENY_MSG, denyRow, filterHtml, filterValue, filterNote, matchFilter, setFilter, _open, _search, _toggle, _quickStp };
})(window);
