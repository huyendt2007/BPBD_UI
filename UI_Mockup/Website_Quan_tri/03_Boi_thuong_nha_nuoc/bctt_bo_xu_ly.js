/*
 * bctt_bo_xu_ly.js — Xử lý báo cáo Công tác BTNN do các Sở Tư pháp gửi lên, phía Bộ Tư pháp.
 * Sinh bởi skill /tao-ui ngày 03/11/2026 cho trang xu_ly_bao_cao_cong_tac_btnn.html (dùng bộ thành phần UI.* trong khối data-ui-chuan).
 * Căn cứ: việc cần làm «Module Báo cáo công tác BTNN» của BA lead (mục 1, 3, 4; nhập 02/11/2026); phản hồi KH 27/10/2026 (TD_024);
 *         nhanhl2 chốt 03/11/2026: có phân công (Lãnh đạo Cục -> Lãnh đạo Phòng -> Chuyên viên), phân công từng báo cáo (chọn nhiều),
 *         chỉ «Yêu cầu điều chỉnh» phải trình Lãnh đạo Phòng, Lãnh đạo Cục duyệt; «Đạt» do Chuyên viên đánh giá.
 * Dữ liệu dùng chung với trang của Sở qua window.BCTT (bctt_bao_cao.js, chế độ 'bo'): Sở gửi báo cáo -> có ở đây;
 * Bộ duyệt yêu cầu điều chỉnh -> báo cáo của Sở chuyển `Yêu cầu điều chỉnh` (dòng phụ `Bộ Tư pháp trả lại`).
 */
(function () {
    'use strict';
    const B = window.BCTT;
    if (!B || B.MODE !== 'bo' || !window.UI) return;
    const ST = B.ST, esc = B.esc, $ = id => document.getElementById(id);

    // ---------------- Trạng thái xử lý phía Bộ ----------------
    const TT = { CPC: 'Chờ phân công', CPCB: 'Chờ phân công cán bộ', RS: 'Đang rà soát', CD: 'Chờ duyệt', TL: 'Bị trả lại', DAT: 'Đạt', YC: 'Yêu cầu điều chỉnh' };
    const TT_CLS = {}; TT_CLS[TT.CPC] = 'badge-secondary'; TT_CLS[TT.CPCB] = 'badge-secondary'; TT_CLS[TT.RS] = 'badge-info'; TT_CLS[TT.CD] = 'badge-purple';
    TT_CLS[TT.TL] = 'badge-danger'; TT_CLS[TT.DAT] = 'badge-success'; TT_CLS[TT.YC] = 'badge-warning';
    const TT_ORDER = [TT.CPC, TT.CPCB, TT.RS, TT.TL, TT.CD, TT.DAT, TT.YC];
    const CUC = { id: 'CĐK-01', ten: 'Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước' };
    const PHONG = { id: 'PLN-02', ten: 'Phòng Quản lý nghiệp vụ về bồi thường nhà nước' };
    const SEED_BO = 'bo1';
    const YC_MAU = [
        'Mẫu 43/BTNN: số liệu Cột 11 chưa bằng tổng Cột 12, 13, 14, 15 ở nhóm I; đề nghị rà soát.',
        'Mẫu 41/BTNN: thiếu vụ việc đã thụ lý trong kỳ theo Mẫu 43/BTNN (Cột 3); đề nghị bổ sung danh mục.',
        'Mẫu số 04 (TT 08/2019): số tiền Cột 12 chưa khớp Cột 13 và Cột 14; đề nghị kiểm tra lại.',
        'Mẫu 42/BTNN: mục I.1 chưa đánh giá việc cấp phát kinh phí và chi trả tiền bồi thường; đề nghị bổ sung.'
    ];

    // ---------------- Người dùng, đơn vị (theo dữ liệu giả lập dùng chung btnn_luong_xu_ly.js) ----------------
    const W = () => window.BTNN_WF || null;
    const toi = () => B.me().userId;
    const ten = id => B.userName(id);
    const nhanNguoi = id => { const t = B.userTitle(id); return ten(id) + (t ? ' - ' + t : ''); };
    function lanhDao(unitId, fb) { const w = W(); const l = w && w.getLeaders ? w.getLeaders(unitId, 'GQ') : []; return l && l.length ? l : fb; }
    function canBoPhong() {
        const w = W(); const ds = w && w.USERS ? w.USERS.filter(u => u.unitId === PHONG.id && u.title === 'Chuyên viên').map(u => u.id) : [];
        return ds.length ? ds : ['canbonv', 'hatt', 'ducpm'];
    }
    const vaiTro = () => B.role();
    const laChuyenVien = () => ['cb_btp', 'cb_btp2'].indexOf(vaiTro()) >= 0;

    // ---------------- Tiện ích ngày ----------------
    function toDate(s) { const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(String(s || '')); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
    function ngayGuiBo(r) { return (r.issued && r.issued.at) || r.sentAt || ''; }
    function guiCham(r) { const d = toDate(ngayGuiBo(r)); return !!d && d >= B.hanGui(r.year, r.period).han; }
    const kyNhan = r => B.PERIODS[r.period].label;

    // ---------------- Dữ liệu xử lý (r.bo) ----------------
    function ls(r, actor, action, note, at) { r.bo.ls.push({ at: at || B.nowText(), actor: actor, action: action, note: note || '' }); }
    function giaoPhong(r, by, at, note) { r.bo.phong = PHONG.id; r.bo.tt = TT.CPCB; ls(r, ten(by), 'Phân công xử lý: chuyển ' + PHONG.ten, note, at); }
    function giaoCanBo(r, by, cv, at, note) { r.bo.cv = cv; r.bo.tt = TT.RS; ls(r, ten(by), 'Phân công cán bộ chủ trì: ' + ten(cv), note, at); }
    function moiTrinh(cv, noiDung, at, lp, lc) {
        return { at: at, by: cv, noiDung: noiDung, current: 0, levels: [
            { level: 1, unitName: PHONG.ten, leaderId: lp, result: null, at: '', note: '' },
            { level: 2, unitName: CUC.ten, leaderId: lc, result: null, at: '', note: '' }] };
    }
    function moi(r) { return { tt: TT.CPC, lan: 1, phong: null, cv: null, raSoat: null, trinh: null, traLai: null, ls: [{ at: ngayGuiBo(r) || B.nowText(), actor: r.unitName, action: 'Gửi báo cáo đến Bộ Tư pháp', note: '' }] }; }
    function trongXuLy(r) { return !B.isBtpReport(r) && !!r.bo; }

    function seedBo(db) {
        const lc = 'cuctruong', lp = 'tpbt', cvs = ['canbonv', 'hatt'];
        // Năm 2025: 02 Sở gửi chậm kỳ thực tế (hạn trước 08/12/2025) để có dữ liệu «Gửi chậm»
        db.reports.filter(r => !B.isBtpReport(r) && r.year === 2025 && r.period === 'thuc_te' && r.status === ST.BH).slice(0, 2)
            .forEach((r, i) => { if (r.issued) r.issued.at = (15 + i) + '/12/2025 10:00'; });
        db.reports.forEach(r => {
            if (B.isBtpReport(r)) return;
            if (r.status === ST.BH && !r.bo) r.bo = moi(r);
            if (r.status === ST.TL && r.returned && !r.bo) {
                // Báo cáo đã bị Bộ trả lại theo cách cũ: quy về kết quả rà soát «Yêu cầu điều chỉnh» đã được duyệt
                r.bo = moi(r); const at = r.returned.at;
                giaoPhong(r, lc, at, ''); giaoCanBo(r, lp, cvs[0], at, '');
                r.bo.raSoat = { kq: 'ycdc', noiDung: r.returned.reason, yKien: '', at: at, by: cvs[0] };
                r.bo.trinh = moiTrinh(cvs[0], 'Kính trình Lãnh đạo duyệt yêu cầu ' + r.unitName + ' điều chỉnh báo cáo.', at, lp, lc);
                r.bo.trinh.levels.forEach(l => { l.result = 'approved'; l.at = at; }); r.bo.trinh.current = 1;
                r.bo.tt = TT.YC; ls(r, ten(lc), 'Duyệt yêu cầu điều chỉnh, gửi Sở Tư pháp', r.returned.reason, at);
            }
        });
        const ds26 = db.reports.filter(r => trongXuLy(r) && r.year === 2026 && r.period === 'thuc_te' && r.bo.tt === TT.CPC);
        const at = (k, hm) => B.seedAt(2026, 'thuc_te', k, hm);
        ds26.forEach((r, i) => {
            if (i < 6) return;                                           // 06 báo cáo Chờ phân công (Lãnh đạo Cục)
            giaoPhong(r, lc, at(1, '08:30'), 'Giao Phòng rà soát báo cáo.');
            if (i < 11) return;                                          // 05 báo cáo Chờ phân công cán bộ (Lãnh đạo Phòng)
            const cv = cvs[i % 2];
            giaoCanBo(r, lp, cv, at(1, '14:00'), 'Rà soát, đối chiếu số liệu giữa các biểu mẫu.');
            if (i < 17) return;                                          // 06 báo cáo Đang rà soát (02 Chuyên viên)
            if (i < 21) {                                                // 04 báo cáo Chờ duyệt: 03 chờ Lãnh đạo Phòng, 01 chờ Lãnh đạo Cục; 01 Bị trả lại
                const nd = YC_MAU[i % YC_MAU.length];
                r.bo.raSoat = { kq: 'ycdc', noiDung: nd, yKien: '', at: at(2, '09:00'), by: cv };
                r.bo.trinh = moiTrinh(cv, 'Kính trình Lãnh đạo duyệt yêu cầu ' + r.unitName + ' điều chỉnh báo cáo công tác bồi thường nhà nước năm 2026.', at(2, '09:30'), lp, lc);
                r.bo.tt = TT.CD; ls(r, ten(cv), 'Trình duyệt yêu cầu điều chỉnh', nd, at(2, '09:30'));
                if (i === 19) { const l = r.bo.trinh.levels[0]; l.result = 'approved'; l.at = at(3, '08:00'); r.bo.trinh.current = 1; ls(r, ten(lp), 'Duyệt và chuyển ' + ten(lc), '', l.at); }
                if (i === 20) {
                    const l = r.bo.trinh.levels[0], ly = 'Đề nghị nêu rõ ô số liệu cần điều chỉnh và căn cứ đối chiếu với Mẫu 41/BTNN.';
                    l.result = 'rejected'; l.at = at(3, '08:15'); l.note = ly; r.bo.tt = TT.TL; r.bo.traLai = { lyDo: ly, by: lp, at: l.at };
                    ls(r, ten(lp), 'Từ chối yêu cầu điều chỉnh, trả lại Chuyên viên', ly, l.at);
                }
                return;
            }
            r.bo.raSoat = { kq: 'dat', noiDung: '', yKien: 'Số liệu đầy đủ, khớp giữa các biểu mẫu.', at: at(2, '10:00'), by: cv };
            r.bo.tt = TT.DAT; ls(r, ten(cv), 'Đánh giá báo cáo Đạt', r.bo.raSoat.yKien, at(2, '10:00'));
        });
        // Các kỳ năm 2025: đã xử lý xong, Đạt
        db.reports.filter(r => trongXuLy(r) && r.year === 2025 && r.bo.tt === TT.CPC).forEach((r, i) => {
            const a = ngayGuiBo(r), cv = cvs[i % 2];
            giaoPhong(r, lc, a, ''); giaoCanBo(r, lp, cv, a, '');
            r.bo.raSoat = { kq: 'dat', noiDung: '', yKien: 'Đạt.', at: a, by: cv }; r.bo.tt = TT.DAT; ls(r, ten(cv), 'Đánh giá báo cáo Đạt', '', a);
        });
    }
    // Đồng bộ với dữ liệu do trang của Sở ghi: báo cáo mới gửi -> Chờ phân công; Sở gửi lại sau khi điều chỉnh -> rà soát lần sau (giữ phân công)
    function damBao() {
        const db = B.db(); let doi = false;
        if (db.boSeed !== SEED_BO) { seedBo(db); db.boSeed = SEED_BO; doi = true; }
        db.reports.forEach(r => {
            if (B.isBtpReport(r)) return;
            if (r.status === ST.BH && !r.bo) { r.bo = moi(r); doi = true; }
            if (r.bo && r.bo.tt === TT.YC && r.status === ST.BH) {
                r.bo.lan = (r.bo.lan || 1) + 1; r.bo.tt = r.bo.cv ? TT.RS : TT.CPC; r.bo.raSoat = null; r.bo.trinh = null; r.bo.traLai = null;
                ls(r, r.unitName, 'Gửi lại báo cáo sau khi điều chỉnh', 'Lần gửi thứ ' + r.bo.lan, ngayGuiBo(r)); doi = true;
            }
        });
        if (doi) B.save();
    }

    // ---------------- Phạm vi theo vai trò ----------------
    function laNguoiDuyet(b) { return b.tt === TT.CD && !!b.trinh && b.trinh.levels[b.trinh.current] && b.trinh.levels[b.trinh.current].leaderId === toi(); }
    function trongPhamVi(r) {
        const b = r.bo, ro = vaiTro(); if (!b) return false;
        if (ro === 'ld_cuc' || ro === 'ld_bo') return true;
        if (ro === 'ld_phong_btp') return !!b.phong;
        return b.cv === toi();
    }
    function choToi(r) {
        const b = r.bo, ro = vaiTro();
        if (ro === 'ld_cuc') return b.tt === TT.CPC || laNguoiDuyet(b);
        if (ro === 'ld_phong_btp') return b.tt === TT.CPCB || laNguoiDuyet(b);
        if (laChuyenVien()) return b.cv === toi() && (b.tt === TT.RS || b.tt === TT.TL);
        return false;
    }
    const coPhanCong = r => (vaiTro() === 'ld_cuc' && r.bo.tt === TT.CPC) || (vaiTro() === 'ld_phong_btp' && r.bo.tt === TT.CPCB);
    const coRaSoat = r => laChuyenVien() && r.bo.cv === toi() && (r.bo.tt === TT.RS || r.bo.tt === TT.TL);

    // ---------------- Trang danh sách ----------------
    const st = { chinh: 'xl', tab: 'cho', loc: { nam: '', ky: '', so: '', tt: '' }, chon: new Set(), luoi: null, thKy: { nam: '', ky: '' } };
    function danhSach(tab) { return B.db().reports.filter(r => trongXuLy(r) && trongPhamVi(r) && (tab === 'cho' ? choToi(r) : !choToi(r))); }
    function demCho() { return B.db().reports.filter(r => trongXuLy(r) && trongPhamVi(r) && choToi(r)).length; }

    function veChinh() {
        $('boMainTabs').querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.chinh === st.chinh));
        ['xl', 'th', 'tong'].forEach(k => $('boPanel_' + k).classList.toggle('hidden', k !== st.chinh));
        const n = demCho(), c = $('boDemChinh'); c.textContent = n; c.style.display = n ? '' : 'none';
        if (window.BDG) try { window.BDG.report('bctt_bo', n); } catch (e) { /* bỏ qua */ }
        if (st.chinh === 'xl') veXuLy(); else if (st.chinh === 'th') veTinhHinh();
    }

    function veXuLy() {
        damBao();
        const ro = vaiTro(), coChon = st.tab === 'cho' && (ro === 'ld_cuc' || ro === 'ld_phong_btp');
        const ds = danhSach(st.tab);
        const nam = [...new Set(B.db().reports.filter(trongXuLy).map(r => r.year))].sort((a, b) => b - a);
        const ttCo = TT_ORDER.filter(t => ds.some(r => r.bo.tt === t));
        if (st.loc.tt && ttCo.indexOf(st.loc.tt) < 0) st.loc.tt = '';
        const nCho = demCho();
        const html = `
        <div class="tab-bar" id="boTabXL">
            <button type="button" class="tab-btn${st.tab === 'cho' ? ' active' : ''}" data-xl="cho"><i class="fa-solid fa-list-check"></i> Chờ xử lý ${nCho ? `<span class="tab-count">${nCho}</span>` : ''}</button>
            <button type="button" class="tab-btn${st.tab === 'da' ? ' active' : ''}" data-xl="da"><i class="fa-solid fa-box-archive"></i> Đã xử lý</button>
        </div>
        <div class="card-section" data-bpbd-filter>
            <div class="section-title"><span><i class="fa-solid fa-filter"></i> Bộ lọc tìm kiếm</span></div>
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label" for="boLocNam">Năm báo cáo</label><select id="boLocNam" class="form-select" data-kieu="Enum(Integer(4))"><option value="">Tất cả</option>${nam.map(y => `<option${String(y) === st.loc.nam ? ' selected' : ''}>${y}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label" for="boLocKy">Loại kỳ báo cáo</label><select id="boLocKy" class="form-select" data-kieu="Enum(String(100))"><option value="">Tất cả</option>${Object.keys(B.PERIODS).map(k => `<option value="${k}"${k === st.loc.ky ? ' selected' : ''}>${esc(B.PERIODS[k].label)}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label" for="boLocSo">Đơn vị báo cáo</label><select id="boLocSo" class="form-select" data-kieu="Enum(String(255))"><option value="">Tất cả</option>${B.PROVINCES.map(p => `<option${B.stpName(p) === st.loc.so ? ' selected' : ''}>${esc(B.stpName(p))}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label" for="boLocTT">Trạng thái xử lý</label><select id="boLocTT" class="form-select" data-kieu="Enum(String(50))"><option value="">Tất cả</option>${ttCo.map(t => `<option${t === st.loc.tt ? ' selected' : ''}>${t}</option>`).join('')}</select></div>
            </div>
            <div class="filter-actions">
                <button type="button" class="btn btn-secondary" id="boXoaLoc"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                <button type="button" class="btn btn-primary" id="boTim"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
            </div>
        </div>
        <div class="card-section">
            ${coChon ? `<div class="grid-toolbar"><span class="grid-toolbar-left" id="boDaChon">Chưa chọn báo cáo nào</span>
                <button type="button" class="btn btn-primary" id="boNutPC" disabled><i class="fa-solid fa-user-plus"></i> ${ro === 'ld_cuc' ? 'Phân công' : 'Phân công cán bộ'}</button></div>` : ''}
            <div class="table-container"><table class="custom-table" id="boBang"><thead><tr>
                ${coChon ? '<th style="width:40px"><input type="checkbox" id="boChonHet" title="Chọn tất cả báo cáo trên trang"></th>' : ''}
                <th>STT</th><th class="sortable" data-sort="nam">Năm báo cáo</th><th>Loại kỳ báo cáo</th><th class="sortable" data-sort="so">Đơn vị báo cáo</th>
                <th class="sortable" data-sort="ngay">Ngày gửi</th><th>Đơn vị, cán bộ xử lý</th><th>Trạng thái xử lý</th><th>Thao tác</th>
            </tr></thead><tbody></tbody></table></div>
        </div>`;
        $('boPanel_xl').innerHTML = html;
        st.chon.clear();
        const loc = r => (!st.loc.nam || String(r.year) === st.loc.nam) && (!st.loc.ky || r.period === st.loc.ky) && (!st.loc.so || r.unitName === st.loc.so) && (!st.loc.tt || r.bo.tt === st.loc.tt);
        const duLieu = ds.filter(loc).map(r => ({ r: r, nam: r.year, so: r.unitName, ngay: (toDate(ngayGuiBo(r)) || new Date(0)).getTime() }))
            .sort((a, b) => (b.nam - a.nam) || (a.r.period === b.r.period ? 0 : (a.r.period === 'thuc_te' ? -1 : 1)) || (B.PROVINCES.indexOf(a.r.province) - B.PROVINCES.indexOf(b.r.province)));
        const cot = [];
        if (coChon) cot.push({ hien: d => coPhanCong(d.r) ? `<input type="checkbox" class="bo-chon" data-id="${d.r.id}" aria-label="Chọn báo cáo">` : '' });
        cot.push({ hien: (d, i) => i }, { hien: d => d.r.year }, { hien: d => esc(kyNhan(d.r)) }, { hien: d => `<span class="cell-strong">${esc(d.r.unitName)}</span>` },
            { hien: d => `<span class="nowrap">${esc(ngayGuiBo(d.r))}</span>${guiCham(d.r) ? '<span class="badge-sub" style="color:var(--danger-color)">Gửi chậm</span>' : ''}` },
            { hien: d => xuLyBoi(d.r) }, { hien: d => ttCell(d.r) });
        st.luoi = UI.luoi({
            bang: '#boBang', duLieu: duLieu, kichThuoc: 10, cot: cot, rong: 'Không có dữ liệu',
            thaoTac: d => thaoTac(d.r),
            khiBamDong: d => moRaSoat(d.r.id),
            sauKhiVe: () => { ganChon(); ganNut(); }
        });
        $('boTabXL').onclick = e => { const b = e.target.closest('[data-xl]'); if (b && b.dataset.xl !== st.tab) { st.tab = b.dataset.xl; st.loc.tt = ''; veXuLy(); } };
        $('boTim').onclick = () => { st.loc = { nam: $('boLocNam').value, ky: $('boLocKy').value, so: $('boLocSo').value, tt: $('boLocTT').value }; veXuLy(); };
        $('boXoaLoc').onclick = () => { st.loc = { nam: '', ky: '', so: '', tt: '' }; veXuLy(); };
        if (coChon) $('boNutPC').onclick = () => moPhanCong([...st.chon]);
    }
    // Gắn sự kiện trực tiếp lên từng nút Thao tác: admin-ui-standardizer.js chặn lan sự kiện bấm của nút trong cột Thao tác
    function ganNut() {
        document.querySelectorAll('#boBang [data-act]').forEach(b => {
            b.onclick = e => {
                e.stopPropagation(); if (b.classList.contains('disabled')) return;
                const id = b.dataset.id, a = b.dataset.act;
                if (a === 'pc') moPhanCong([id]); else if (a === 'rs') moRaSoat(id); else if (a === 'duyet') moKyDuyet(id, 'duyet'); else if (a === 'tuchoi') moKyDuyet(id, 'tu_choi');
            };
        });
    }
    function ganChon() {
        const all = $('boChonHet'); if (!all) return;
        const hop = [...document.querySelectorAll('#boBang .bo-chon')];
        hop.forEach(c => { c.checked = st.chon.has(c.dataset.id); c.onclick = ev => { ev.stopPropagation(); c.checked ? st.chon.add(c.dataset.id) : st.chon.delete(c.dataset.id); capNhatChon(); }; });
        all.checked = hop.length > 0 && hop.every(c => c.checked);
        all.onclick = () => { hop.forEach(c => { c.checked = all.checked; all.checked ? st.chon.add(c.dataset.id) : st.chon.delete(c.dataset.id); }); capNhatChon(); };
        capNhatChon();
    }
    function capNhatChon() {
        const n = st.chon.size; $('boNutPC').disabled = !n;
        $('boDaChon').textContent = n ? 'Đã chọn ' + n + ' báo cáo' : 'Chưa chọn báo cáo nào';
    }
    function xuLyBoi(r) {
        const b = r.bo;
        if (!b.phong) return '<span class="text-muted">--</span>';
        return `<span class="cell-strong">${b.cv ? esc(ten(b.cv)) : 'Chưa phân công cán bộ'}</span><span class="cell-sub">Phòng Quản lý nghiệp vụ về BTNN</span>`;
    }
    function ttCell(r) {
        const b = r.bo; let sub = '';
        if (b.tt === TT.CD) { const l = b.trinh.levels[b.trinh.current]; sub = 'Loại trình: Yêu cầu điều chỉnh<br>Người duyệt: ' + esc(nhanNguoi(l.leaderId)); }
        else if (b.tt === TT.TL) sub = 'Loại trình: Yêu cầu điều chỉnh';
        else if (b.tt === TT.YC) sub = r.status === ST.TL ? 'Sở Tư pháp đang điều chỉnh' : '';
        else if (b.tt === TT.RS && b.lan > 1) sub = 'Sở Tư pháp gửi lại lần ' + b.lan;
        return `<span class="badge ${TT_CLS[b.tt]}"${b.tt === TT.TL && b.traLai ? ` title="Lý do bị trả lại: ${esc(b.traLai.lyDo)}"` : ''}>${b.tt}</span>${sub ? `<span class="badge-sub">${sub}</span>` : ''}`;
    }
    function thaoTac(r) {
        const ro = vaiTro(), id = r.id, nut = (act, title, icon, cls) => `<button type="button" data-admin-icon-normalized="1" class="icon-btn ${cls}" title="${title}" aria-label="${title}" data-act="${act}" data-id="${id}"><i class="fa-solid ${icon}"></i></button>`;
        let h = '';
        if (coPhanCong(r)) h += nut('pc', ro === 'ld_cuc' ? 'Phân công' : 'Phân công cán bộ', 'fa-user-plus', 'edit');
        if (laNguoiDuyet(r.bo)) h += nut('duyet', 'Ký duyệt', 'fa-file-signature', 'approve') + nut('tuchoi', 'Từ chối', 'fa-ban', 'delete');
        if (coRaSoat(r)) h += nut('rs', 'Rà soát', 'fa-clipboard-check', 'submit');
        return h || '<span class="text-muted">--</span>';
    }

    // ---------------- Popup Phân công ----------------
    function moPhanCong(ids) {
        const ro = vaiTro(), laCuc = ro === 'ld_cuc';
        const ds = ids.map(B.getR).filter(r => r && coPhanCong(r));
        if (!ds.length) { UI.toast('Báo cáo đã được thành viên khác trong Nhóm lãnh đạo xử lý.', 'error'); veXuLy(); return; }
        const tuyChon = laCuc ? [{ id: PHONG.id, ten: PHONG.ten }] : canBoPhong().map(id => ({ id: id, ten: nhanNguoi(id) }));
        const o = $('boPC');
        o.innerHTML = `<div class="modal-content" style="max-width:680px">
            <div class="modal-header"><div><h3 id="boPCTieuDe">Phân công xử lý báo cáo công tác bồi thường nhà nước</h3><div class="modal-sub">Đơn vị đang phân công: ${esc(laCuc ? CUC.ten : PHONG.ten)}</div></div>
                <button type="button" class="close-modal" data-dong aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button></div>
            <div class="modal-body">
                <div class="form-group"><span class="form-label">Báo cáo được chọn (${ds.length})</span>
                    <div class="table-container" style="max-height:200px;overflow:auto"><table class="custom-table"><thead><tr><th>STT</th><th>Đơn vị báo cáo</th><th>Năm báo cáo</th><th>Loại kỳ báo cáo</th></tr></thead>
                    <tbody>${ds.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(r.unitName)}</td><td>${r.year}</td><td>${esc(kyNhan(r))}</td></tr>`).join('')}</tbody></table></div></div>
                <div class="form-group"><label class="form-label" for="boPCChon">${laCuc ? 'Đơn vị nhận' : 'Cán bộ chủ trì'}<span class="required-mark">*</span></label>
                    <select id="boPCChon" class="form-select" required data-kieu="Enum(String(255))"><option value="">${laCuc ? 'Chọn đơn vị nhận...' : 'Chọn cán bộ chủ trì...'}</option>${tuyChon.map(x => `<option value="${x.id}">${esc(x.ten)}</option>`).join('')}</select>
                    <div class="error-message">Đây là trường bắt buộc</div></div>
                <div class="form-group" style="margin-bottom:0"><label class="form-label" for="boPCYKien">Ý kiến chỉ đạo</label>
                    <textarea id="boPCYKien" class="form-control" rows="3" maxlength="2000" data-kieu="Text(2000)" placeholder="Nhập ý kiến chỉ đạo..."></textarea></div>
            </div>
            <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dong><i class="fa-solid fa-xmark"></i> Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="boPCOk"><i class="fa-solid fa-check"></i> Xác nhận phân công</button></div></div>`;
        UI.gan && UI.gan(o);
        o.querySelectorAll('[data-dong]').forEach(b => b.onclick = () => UI.dong(o));
        UI.mo(o);
        $('boPCOk').onclick = () => {
            if (!UI.kiemTra('#boPC')) return;
            const v = $('boPCChon').value, yk = $('boPCYKien').value.trim(); let n = 0, bo = 0;
            ds.forEach(r => {
                if (!coPhanCong(r)) { bo++; return; }
                if (laCuc) giaoPhong(r, toi(), '', yk); else giaoCanBo(r, toi(), v, '', yk);
                n++;
            });
            B.save(); UI.dong(o);
            UI.toast('Đã phân công ' + n + ' báo cáo cho ' + (laCuc ? PHONG.ten : ten(v)) + '.' + (bo ? ' ' + bo + ' báo cáo đã được xử lý trước đó, không phân công lại.' : ''));
            veChinh();
        };
    }

    // ---------------- Màn Rà soát báo cáo ----------------
    let dangXem = null;
    function moRaSoat(id) {
        const r = B.getR(id); if (!r || !r.bo) return;
        dangXem = id; const b = r.bo, sua = coRaSoat(r), ro = vaiTro();
        const han = B.hanGui(r.year, r.period);
        const lanTruoc = b.lan > 1 ? [...b.ls].reverse().find(x => /Duyệt yêu cầu điều chỉnh, gửi Sở/.test(x.action)) : null;
        const ttTrinh = b.trinh ? b.trinh.levels.map(l => `<div><span class="info-label">Cấp ${l.level} - ${esc(l.unitName)}</span><span class="info-value">${esc(nhanNguoi(l.leaderId))}<span class="cell-sub">${l.result === 'approved' ? 'Đã duyệt ' + esc(l.at) : l.result === 'rejected' ? 'Từ chối ' + esc(l.at) : (b.trinh.current === l.level - 1 && b.tt === TT.CD ? 'Đang chờ duyệt' : 'Chưa tới')}</span></span></div>`).join('') : '';
        $('raSoatView').innerHTML = `
        <div class="page-heading"><div><h2 data-uxu-title>Xử lý báo cáo Công tác BTNN</h2></div></div>
        <div class="form-page">
            <div class="form-page-header">
                <div class="form-page-title"><i class="fa-solid fa-clipboard-check"></i> Rà soát báo cáo công tác bồi thường nhà nước năm ${r.year} - ${esc(r.unitName)}</div>
                <span class="badge ${TT_CLS[b.tt]}">${b.tt}</span>
            </div>
            <div class="form-page-body">
                ${b.tt === TT.TL && b.traLai ? `<div class="alert alert-danger" role="alert"><div class="alert-body"><i class="fa-solid fa-circle-exclamation"></i><div><span class="alert-title">YÊU CẦU ĐIỀU CHỈNH BỊ LÃNH ĐẠO TRẢ LẠI</span><span class="alert-text">Lý do: ${esc(b.traLai.lyDo)} Người trả lại: ${esc(nhanNguoi(b.traLai.by))}. Thời điểm: ${esc(b.traLai.at)}.</span></div></div></div>` : ''}
                ${lanTruoc ? `<div class="alert alert-warning" role="alert"><div class="alert-body"><i class="fa-solid fa-triangle-exclamation"></i><div><span class="alert-title">Sở Tư pháp gửi lại báo cáo lần ${b.lan}</span><span class="alert-text">Nội dung đã yêu cầu điều chỉnh lần trước: ${esc(lanTruoc.note)}</span></div></div></div>` : ''}
                <div class="section-title">Thông tin báo cáo</div>
                <div class="info-grid">
                    <div><span class="info-label">Năm báo cáo</span><span class="info-value">${r.year}</span></div>
                    <div><span class="info-label">Loại kỳ báo cáo</span><span class="info-value">${esc(kyNhan(r))}</span></div>
                    <div><span class="info-label">Thời gian số liệu</span><span class="info-value">${esc(r.fromDate)} - ${esc(r.toDate)}</span></div>
                    <div><span class="info-label">Đơn vị báo cáo</span><span class="info-value">${esc(r.unitName)}</span></div>
                    <div><span class="info-label">Ngày gửi Bộ Tư pháp</span><span class="info-value">${esc(ngayGuiBo(r))}${guiCham(r) ? ' <span class="badge badge-danger">Gửi chậm</span>' : ''}</span></div>
                    <div><span class="info-label">Hạn gửi</span><span class="info-value">Trước ngày ${esc(han.txt)}</span></div>
                    <div><span class="info-label">Người lập</span><span class="info-value">${esc(r.preparer.name)}</span></div>
                    <div><span class="info-label">Người ký ban hành</span><span class="info-value">${esc(r.issued ? r.issued.signer : '--')}</span></div>
                    <div><span class="info-label">Phòng xử lý</span><span class="info-value">${b.phong ? esc(PHONG.ten) : '--'}</span></div>
                    <div><span class="info-label">Cán bộ chủ trì</span><span class="info-value">${b.cv ? esc(nhanNguoi(b.cv)) : '--'}</span></div>
                    <div><span class="info-label">Lần gửi</span><span class="info-value">${b.lan || 1}</span></div>
                    <div><span class="info-label">Trạng thái tại Sở Tư pháp</span><span class="info-value">${esc(B.stName(r))}</span></div>
                </div>
                <div class="section-title" style="margin-top:22px">Nội dung báo cáo</div>
                <div id="boXemBM">${B.viewerHtml(r, 'm42', B.currentSign(r), null, 'boV')}</div>
                <div class="section-title" style="margin-top:22px">Kết quả rà soát</div>
                <div id="boKQ">${sua ? kqForm(b) : kqXem(b, ttTrinh)}</div>
                <div class="section-title" style="margin-top:22px">Lịch sử xử lý</div>
                <div class="timeline">${[...b.ls].reverse().map(x => `<div class="timeline-item"><span class="timeline-avatar">${esc(viTat(x.actor))}</span><div><div class="timeline-head"><span class="timeline-name">${esc(x.actor)}</span><span class="timeline-time">${esc(x.at)}</span></div>${esc(x.action)}${x.note ? `<div class="text-muted" style="font-size:12.5px;margin-top:2px">${esc(x.note)}</div>` : ''}</div></div>`).join('')}</div>
            </div>
            <div class="form-page-footer">
                <button type="button" class="btn btn-secondary" id="boQuayLai"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
                ${coPhanCong(r) ? `<button type="button" class="btn btn-primary" id="boRsPC"><i class="fa-solid fa-user-plus"></i> ${ro === 'ld_cuc' ? 'Phân công' : 'Phân công cán bộ'}</button>` : ''}
                ${laNguoiDuyet(b) ? '<button type="button" class="btn btn-danger" id="boRsTC"><i class="fa-solid fa-ban"></i> Từ chối</button><button type="button" class="btn btn-primary" id="boRsKD"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>' : ''}
                ${sua ? '<button type="button" class="btn btn-success" id="boRsDat"><i class="fa-solid fa-circle-check"></i> Xác nhận Đạt</button><button type="button" class="btn btn-primary hidden" id="boRsTrinh"><i class="fa-solid fa-paper-plane"></i> Trình duyệt</button>' : ''}
            </div>
        </div>`;
        UI.trang('raSoatView');
        B.bindViewer(r, B.currentSign(r), null, 'boV');
        $('boQuayLai').onclick = veLaiDanhSach;
        if ($('boRsPC')) $('boRsPC').onclick = () => moPhanCong([r.id]);
        if ($('boRsKD')) $('boRsKD').onclick = () => moKyDuyet(r.id, 'duyet');
        if ($('boRsTC')) $('boRsTC').onclick = () => moKyDuyet(r.id, 'tu_choi');
        if (sua) ganKQ(r);
    }
    const viTat = s => { const p = String(s || '').replace(/\(.*\)/, '').trim().split(/\s+/); return ((p[0] || '')[0] || '') + (p.length > 1 ? (p[p.length - 1] || '')[0] : ''); };
    function kqForm(b) {
        const kq = b.raSoat ? b.raSoat.kq : (b.tt === TT.TL ? 'ycdc' : '');
        return `<div class="form-group"><span class="form-label">Kết quả rà soát<span class="required-mark">*</span></span>
            <div class="check-group"><label class="check-item"><input type="radio" name="boKq" value="dat"${kq === 'dat' ? ' checked' : ''} required> Đạt</label>
            <label class="check-item"><input type="radio" name="boKq" value="ycdc"${kq === 'ycdc' ? ' checked' : ''}> Yêu cầu điều chỉnh</label></div>
            <div class="error-message">Đây là trường bắt buộc</div></div>
            <div class="form-group${kq === 'ycdc' ? '' : ' hidden'}" id="boNDWrap"><label class="form-label" for="boND">Nội dung yêu cầu điều chỉnh<span class="required-mark">*</span></label>
            <textarea id="boND" class="form-control" rows="4" maxlength="2000" data-kieu="Text(2000)" placeholder="Nêu biểu mẫu, ô số liệu cần điều chỉnh và lý do...">${esc(b.raSoat && b.raSoat.kq === 'ycdc' ? b.raSoat.noiDung : '')}</textarea>
            <div class="error-message">Đây là trường bắt buộc</div></div>
            <div class="form-group" style="margin-bottom:0"><label class="form-label" for="boYK">Ý kiến rà soát</label>
            <textarea id="boYK" class="form-control" rows="2" maxlength="2000" data-kieu="Text(2000)" placeholder="Nhập ý kiến rà soát (không bắt buộc)...">${esc(b.raSoat ? b.raSoat.yKien : '')}</textarea></div>`;
    }
    function kqXem(b, ttTrinh) {
        if (!b.raSoat) return '<p class="text-muted">Chưa có kết quả rà soát.</p>';
        const x = b.raSoat;
        return `<div class="info-grid cols-3">
            <div><span class="info-label">Kết quả rà soát</span><span class="info-value">${x.kq === 'dat' ? 'Đạt' : 'Yêu cầu điều chỉnh'}</span></div>
            <div><span class="info-label">Cán bộ rà soát</span><span class="info-value">${esc(nhanNguoi(x.by))}</span></div>
            <div><span class="info-label">Thời điểm</span><span class="info-value">${esc(x.at)}</span></div>
            ${x.kq === 'ycdc' ? `<div class="col-full" style="grid-column:1/-1"><span class="info-label">Nội dung yêu cầu điều chỉnh</span><span class="info-value" style="font-weight:500">${esc(x.noiDung)}</span></div>` : ''}
            ${x.yKien ? `<div style="grid-column:1/-1"><span class="info-label">Ý kiến rà soát</span><span class="info-value" style="font-weight:500">${esc(x.yKien)}</span></div>` : ''}
            ${ttTrinh}</div>`;
    }
    function ganKQ(r) {
        const doi = () => {
            const v = (document.querySelector('input[name="boKq"]:checked') || {}).value;
            $('boNDWrap').classList.toggle('hidden', v !== 'ycdc'); $('boND').required = v === 'ycdc';
            $('boRsDat').classList.toggle('hidden', v === 'ycdc'); $('boRsTrinh').classList.toggle('hidden', v !== 'ycdc');
        };
        document.querySelectorAll('input[name="boKq"]').forEach(x => x.onchange = doi); doi();
        $('boRsDat').onclick = () => {
            if (!UI.kiemTra('#boKQ')) return;
            UI.xacNhan({ tieuDe: 'Xác nhận', noiDung: 'Xác nhận báo cáo của ' + r.unitName + ' đạt yêu cầu? Báo cáo được dùng để tổng hợp báo cáo của Bộ Tư pháp.', nutDongY: 'Xác nhận', loai: 'info' }).then(ok => {
                if (!ok) return;
                if (!coRaSoat(r)) { UI.toast('Báo cáo không còn ở trạng thái rà soát.', 'error'); veLaiDanhSach(); return; }
                r.bo.raSoat = { kq: 'dat', noiDung: '', yKien: $('boYK').value.trim(), at: B.nowText(), by: toi() };
                r.bo.tt = TT.DAT; r.bo.traLai = null; ls(r, ten(toi()), 'Đánh giá báo cáo Đạt', r.bo.raSoat.yKien);
                B.hist(r, 'Bộ Tư pháp', 'Bộ Tư pháp đánh giá báo cáo Đạt', '');
                B.save(); UI.toast('Đã đánh giá báo cáo của ' + r.unitName + ' Đạt.'); veLaiDanhSach();
            });
        };
        $('boRsTrinh').onclick = () => { if (UI.kiemTra('#boKQ')) moTrinh(r); };
    }

    // ---------------- Popup Trình duyệt yêu cầu điều chỉnh ----------------
    function moTrinh(r) {
        const nd = $('boND').value.trim(), yk = $('boYK').value.trim();
        const lp = lanhDao(PHONG.id, ['tpbt']), lc = lanhDao(CUC.id, ['cuctruong', 'cucpho']);
        const o = $('boTrinh');
        o.innerHTML = `<div class="modal-content" style="max-width:720px">
            <div class="modal-header"><div><h3>Trình duyệt yêu cầu điều chỉnh</h3><div class="modal-sub">${esc(r.unitName)} • Năm ${r.year} - ${esc(kyNhan(r))}</div></div>
                <button type="button" class="close-modal" data-dong aria-label="Đóng"><i class="fa-solid fa-xmark"></i></button></div>
            <div class="modal-body">
                <div class="form-group"><span class="form-label">Nội dung yêu cầu điều chỉnh</span><div class="info-value" style="font-weight:500;white-space:pre-wrap">${esc(nd)}</div></div>
                <div class="form-group"><span class="form-label">Luồng phê duyệt</span>
                    <div class="grid-2-cols">
                        <div class="form-group"><label class="form-label" for="boTrCap1">Cấp 1 - ${esc(PHONG.ten)}<span class="required-mark">*</span></label>
                            <select id="boTrCap1" class="form-select" required data-kieu="Enum(String(255))">${lp.map(id => `<option value="${id}">${esc(nhanNguoi(id))}</option>`).join('')}</select><div class="error-message">Đây là trường bắt buộc</div></div>
                        <div class="form-group"><label class="form-label" for="boTrCap2">Cấp 2 - ${esc(CUC.ten)}<span class="required-mark">*</span></label>
                            <select id="boTrCap2" class="form-select" required data-kieu="Enum(String(255))">${lc.map(id => `<option value="${id}">${esc(nhanNguoi(id))}</option>`).join('')}</select><div class="error-message">Đây là trường bắt buộc</div></div>
                    </div></div>
                <div class="form-group" style="margin-bottom:0"><label class="form-label" for="boTrND">Nội dung trình<span class="required-mark">*</span></label>
                    <textarea id="boTrND" class="form-control" rows="3" maxlength="2000" required data-kieu="Text(2000)" placeholder="Nhập nội dung trình...">Kính trình Lãnh đạo xem xét, duyệt yêu cầu ${esc(r.unitName)} điều chỉnh báo cáo công tác bồi thường nhà nước năm ${r.year}.</textarea>
                    <div class="error-message">Đây là trường bắt buộc</div></div>
            </div>
            <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dong><i class="fa-solid fa-xmark"></i> Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="boTrOk"><i class="fa-solid fa-paper-plane"></i> Trình duyệt</button></div></div>`;
        o.querySelectorAll('[data-dong]').forEach(b => b.onclick = () => UI.dong(o));
        UI.mo(o);
        $('boTrOk').onclick = () => {
            if (!UI.kiemTra('#boTrinh')) return;
            if (!coRaSoat(r)) { UI.dong(o); UI.toast('Báo cáo không còn ở trạng thái rà soát.', 'error'); veLaiDanhSach(); return; }
            const now = B.nowText();
            r.bo.raSoat = { kq: 'ycdc', noiDung: nd, yKien: yk, at: now, by: toi() };
            r.bo.trinh = moiTrinh(toi(), $('boTrND').value.trim(), now, $('boTrCap1').value, $('boTrCap2').value);
            r.bo.tt = TT.CD; r.bo.traLai = null; ls(r, ten(toi()), 'Trình duyệt yêu cầu điều chỉnh', nd);
            B.save(); UI.dong(o); UI.toast('Đã trình ' + ten($('boTrCap1').value) + ' duyệt yêu cầu điều chỉnh.'); veLaiDanhSach();
        };
    }

    // ---------------- Màn Ký duyệt / Từ chối yêu cầu điều chỉnh (mẫu 26) ----------------
    function vanBanYC(r) {
        const b = r.bo, ky = b.trinh && b.trinh.levels[1];
        return `<div class="doc-page du-thao" style="font-family:'Times New Roman',serif;font-size:15px;line-height:1.55;min-height:560px">
            <div style="display:flex;justify-content:space-between;text-align:center;font-size:14px">
                <div style="width:46%"><b>BỘ TƯ PHÁP</b><br><b>CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM<br>VÀ BỒI THƯỜNG NHÀ NƯỚC</b><br>Số: ……/CĐK-BTNN</div>
                <div style="width:52%"><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><br><i>Hà Nội, ngày …… tháng …… năm ……</i></div></div>
            <p style="text-align:center;margin-top:22px"><b>V/v điều chỉnh báo cáo công tác bồi thường nhà nước năm ${r.year}</b></p>
            <p style="text-align:center">Kính gửi: ${esc(r.unitName)}</p>
            <p style="text-indent:36px">Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước đã nhận Báo cáo công tác bồi thường nhà nước năm ${r.year} (${esc(kyNhan(r))}) của ${esc(r.unitName)} gửi ngày ${esc(ngayGuiBo(r).slice(0, 10))}. Qua rà soát, đề nghị Quý Sở điều chỉnh các nội dung sau:</p>
            <p style="text-indent:36px;white-space:pre-wrap">${esc(b.raSoat ? b.raSoat.noiDung : '')}</p>
            <p style="text-indent:36px">Đề nghị Quý Sở cập nhật, trình ký và gửi lại báo cáo trên hệ thống.</p>
            <div style="display:flex;justify-content:space-between;margin-top:26px;font-size:13px"><div><b><i>Nơi nhận:</i></b><br>- Như trên;<br>- Lưu: VT, PLN-02.</div>
                <div style="text-align:center;width:46%"><b>${ky && B.userTitle(ky.leaderId) === 'Cục trưởng' ? 'CỤC TRƯỞNG' : 'KT. CỤC TRƯỞNG<br>PHÓ CỤC TRƯỞNG'}</b><div class="doc-sign-slot" style="height:40px">Cấp 2 - ${esc(ky ? ten(ky.leaderId) : '')}</div><b>${esc(ky ? ten(ky.leaderId) : '')}</b></div></div>
        </div>`;
    }
    function moKyDuyet(id, cheDo) {
        const r = B.getR(id); if (!r || !laNguoiDuyet(r.bo)) { UI.toast('Yêu cầu điều chỉnh đã được xử lý.', 'error'); veChinh(); return; }
        const b = r.bo, t = b.trinh, lv = t.levels[t.current], tuChoi = cheDo === 'tu_choi', cuoi = t.current === t.levels.length - 1;
        const o = $('boKD');
        const lich = t.levels.slice().reverse().map(l => {
            const cho = l.level - 1 === t.current, xong = l.result === 'approved', tc = l.result === 'rejected';
            return `<div class="timeline-item${cho ? ' cho' : ''}"><span class="timeline-avatar">${esc(viTat(ten(l.leaderId)))}</span><div><div class="timeline-head"><span class="timeline-name">${esc(ten(l.leaderId))}</span>${l.at ? `<span class="timeline-time">${esc(l.at)}</span>` : ''}</div>${cho ? `<span class="tl-cho">Đang chờ duyệt - Cấp ${l.level} - ${esc(l.unitName)}</span>` : xong ? 'Duyệt' : tc ? 'Từ chối' : `<span class="text-muted">Chưa tới - Cấp ${l.level}</span>`}</div></div>`;
        }).join('') + `<div class="timeline-item"><span class="timeline-avatar">${esc(viTat(ten(t.by)))}</span><div><div class="timeline-head"><span class="timeline-name">${esc(ten(t.by))}</span><span class="timeline-time">${esc(t.at)}</span></div>Trình duyệt yêu cầu điều chỉnh</div></div>`;
        o.innerHTML = `<div class="ky-duyet-head"><div>
                <h3>${tuChoi ? 'Từ chối' : 'Ký duyệt'} yêu cầu điều chỉnh báo cáo công tác bồi thường nhà nước năm ${r.year} - ${esc(r.unitName)}</h3>
                <p>${cuoi ? 'Lãnh đạo cấp cuối ký duyệt: hệ thống gửi văn bản yêu cầu điều chỉnh về Sở Tư pháp; báo cáo của Sở chuyển trạng thái Yêu cầu điều chỉnh.' : 'Ký duyệt: chuyển Lãnh đạo cấp tiếp theo duyệt.'} Từ chối: trả lại Chuyên viên rà soát.</p></div></div>
            <div class="ky-duyet-body">
                <div class="ky-duyet-xem">
                    <div class="tab-bar ky-duyet-tabs" id="boKDTabs">
                        <button type="button" class="tab-btn active" data-kd="yc">Văn bản yêu cầu điều chỉnh</button>
                        ${B.FORMS.map(f => `<button type="button" class="tab-btn" data-kd="${f.id}">${esc(f.code)}</button>`).join('')}
                    </div>
                    <div class="doc-scroll" id="boKDDoc">${vanBanYC(r)}</div>
                </div>
                <aside class="ky-duyet-ben">
                    <div class="ky-the"><div class="ky-the-tieu-de">Thông tin tổng quan</div><div class="ky-thong-tin">
                        <div><label>Kỳ báo cáo</label><strong>Năm ${r.year} - ${esc(kyNhan(r))}</strong></div>
                        <div><label>Đơn vị báo cáo</label><strong>${esc(r.unitName)}</strong></div>
                        <div><label>Loại trình</label><strong>Yêu cầu điều chỉnh báo cáo công tác BTNN</strong></div>
                        <div><label>Cán bộ trình</label><strong>${esc(ten(t.by))} - ${esc(t.at)}</strong></div>
                        <div><label>Cấp phê duyệt</label><strong>${lv.level}/${t.levels.length} - ${esc(lv.unitName)}</strong></div>
                        <div><label>Nội dung trình</label><strong style="font-weight:500">${esc(t.noiDung)}</strong></div></div></div>
                    <div class="ky-the"><div class="ky-the-tieu-de"><i class="fa-solid fa-pen-to-square"></i> Nội dung yêu cầu điều chỉnh</div><div style="font-size:13px;white-space:pre-wrap">${esc(b.raSoat.noiDung)}</div></div>
                    <div class="ky-the"><div class="ky-the-tieu-de"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử trình ký</div><div class="timeline">${lich}</div></div>
                    <div class="ky-the" id="boKDYK"><div class="form-group" style="margin:0">
                        <label class="form-label" for="boKDGhiChu">${tuChoi ? 'Lý do từ chối<span class="required-mark">*</span>' : 'Ý kiến'}</label>
                        <textarea id="boKDGhiChu" class="form-control" maxlength="2000" data-kieu="Text(2000)"${tuChoi ? ' required' : ''} placeholder="${tuChoi ? 'Nhập lý do từ chối...' : 'Nhập ý kiến (không bắt buộc)...'}"></textarea>
                        <div class="error-message">Đây là trường bắt buộc</div></div></div>
                </aside>
            </div>
            <div class="ky-duyet-foot"><button type="button" class="btn btn-secondary" data-dong>Hủy bỏ</button>
                <button type="button" class="btn ${tuChoi ? 'btn-danger' : 'btn-primary'}" id="boKDOk">${tuChoi ? '<i class="fa-solid fa-ban"></i> Từ chối' : '<i class="fa-solid fa-file-signature"></i> Ký duyệt'}</button></div>`;
        o.querySelectorAll('[data-dong]').forEach(x => x.onclick = () => UI.dong(o));
        $('boKDTabs').onclick = e => {
            const x = e.target.closest('[data-kd]'); if (!x) return;
            $('boKDTabs').querySelectorAll('.tab-btn').forEach(y => y.classList.toggle('active', y === x));
            $('boKDDoc').innerHTML = x.dataset.kd === 'yc' ? vanBanYC(r) : B.docHtml(r, x.dataset.kd, B.currentSign(r));
        };
        UI.mo(o);
        $('boKDOk').onclick = () => {
            if (!UI.kiemTra('#boKDYK')) return;
            if (!laNguoiDuyet(r.bo)) { UI.dong(o); UI.toast('Yêu cầu điều chỉnh đã được xử lý.', 'error'); veChinh(); return; }
            const gc = $('boKDGhiChu').value.trim(), now = B.nowText();
            lv.at = now; lv.note = gc;
            if (tuChoi) {
                lv.result = 'rejected'; r.bo.tt = TT.TL; r.bo.traLai = { lyDo: gc, by: toi(), at: now };
                ls(r, ten(toi()), 'Từ chối yêu cầu điều chỉnh, trả lại Chuyên viên', gc);
                UI.toast('Đã từ chối. Yêu cầu điều chỉnh được trả lại ' + ten(r.bo.cv) + '.');
            } else if (!cuoi) {
                lv.result = 'approved'; t.current++;
                ls(r, ten(toi()), 'Duyệt và chuyển ' + ten(t.levels[t.current].leaderId), gc);
                UI.toast('Đã ký duyệt và chuyển ' + ten(t.levels[t.current].leaderId) + ' duyệt.');
            } else {
                lv.result = 'approved'; r.bo.tt = TT.YC;
                ls(r, ten(toi()), 'Duyệt yêu cầu điều chỉnh, gửi Sở Tư pháp', r.bo.raSoat.noiDung);
                // Báo cáo của Sở chuyển `Yêu cầu điều chỉnh` (dòng phụ `Bộ Tư pháp trả lại`), như cách trả lại đã có ở trang của Sở
                r.status = ST.TL; r.returned = { reason: r.bo.raSoat.noiDung, by: ten(r.bo.cv), at: now };
                B.hist(r, ten(toi()) + ' (Bộ Tư pháp)', 'Bộ Tư pháp yêu cầu điều chỉnh báo cáo', r.bo.raSoat.noiDung);
                B.markBtpDirty(r, 'trả lại');
                UI.toast('Đã ký duyệt. Văn bản yêu cầu điều chỉnh được gửi ' + r.unitName + '.');
            }
            B.save(); UI.dong(o); veLaiDanhSach();
        };
    }

    // ---------------- Tình hình gửi báo cáo (34 Sở Tư pháp) ----------------
    function veTinhHinh() {
        damBao();
        const db = B.db();
        const nam = [...new Set(db.reports.map(r => r.year))].sort((a, b) => b - a);
        if (!st.thKy.nam) { st.thKy.nam = String(nam[0]); st.thKy.ky = 'thuc_te'; }
        const y = +st.thKy.nam, p = st.thKy.ky, han = B.hanGui(y, p), homNay = new Date();
        const dong = B.PROVINCES.map(pr => {
            const so = B.stpName(pr), r = db.reports.find(x => !B.isBtpReport(x) && x.unitName === so && x.year === y && x.period === p);
            // Báo cáo đang điều chỉnh theo yêu cầu của Bộ không tính là Đã gửi (như MH08 của SRS)
            const daGui = !!r && r.status === ST.BH, dieuChinh = !!r && !daGui && !!r.bo;
            let tinh;
            if (daGui) tinh = guiCham(r) ? ['Gửi chậm', 'badge-danger'] : ['Đúng hạn', 'badge-success'];
            else if (dieuChinh) tinh = ['Đang điều chỉnh theo yêu cầu', 'badge-warning'];
            else tinh = homNay >= han.han ? ['Chưa gửi - quá hạn', 'badge-danger'] : ['Chưa gửi', 'badge-secondary'];
            return { so: so, r: r, daGui: daGui, tinh: tinh };
        });
        const nGui = dong.filter(d => d.daGui).length, nCham = dong.filter(d => d.tinh[0] === 'Gửi chậm').length, nDC = dong.filter(d => d.tinh[1] === 'badge-warning').length, nChua = dong.length - nGui - nDC;
        $('boPanel_th').innerHTML = `
        <div class="card-section">
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label" for="boThNam">Năm báo cáo</label><select id="boThNam" class="form-select">${nam.map(v => `<option${String(v) === st.thKy.nam ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label" for="boThKy">Loại kỳ báo cáo</label><select id="boThKy" class="form-select">${Object.keys(B.PERIODS).map(k => `<option value="${k}"${k === p ? ' selected' : ''}>${esc(B.PERIODS[k].label)}</option>`).join('')}</select></div>
                <div class="form-group"><span class="form-label">Hạn gửi</span><div class="info-value" style="padding-top:9px">Trước ngày ${esc(han.txt)}</div></div>
                <div class="form-group"><span class="form-label">Tổng hợp</span><div class="info-value" style="padding-top:9px">Đã gửi ${nGui}/${dong.length} (gửi chậm ${nCham}) • Đang điều chỉnh ${nDC} • Chưa gửi ${nChua}</div></div>
            </div>
        </div>
        <div class="card-section"><div class="table-container"><table class="custom-table" id="boThBang"><thead><tr>
            <th>STT</th><th>Đơn vị báo cáo</th><th>Trạng thái tại Sở Tư pháp</th><th>Ngày gửi</th><th>Tình trạng gửi</th><th>Trạng thái xử lý tại Bộ</th><th>Cán bộ chủ trì</th>
        </tr></thead><tbody></tbody></table></div></div>`;
        UI.luoi({
            bang: '#boThBang', duLieu: dong, kichThuoc: 50, rong: 'Không có dữ liệu',
            cot: [{ hien: (d, i) => i }, { hien: d => `<span class="cell-strong">${esc(d.so)}</span>` },
                { hien: d => d.r ? esc(B.stName(d.r)) : '<span class="text-muted">Chưa tạo báo cáo</span>' },
                { hien: d => d.r && (d.daGui || d.r.bo) ? esc(ngayGuiBo(d.r)) : '--' },
                { hien: d => `<span class="badge ${d.tinh[1]}">${d.tinh[0]}</span>` },
                { hien: d => d.r && d.r.bo ? `<span class="badge ${TT_CLS[d.r.bo.tt]}">${d.r.bo.tt}</span>` : '--' },
                { hien: d => d.r && d.r.bo && d.r.bo.cv ? esc(ten(d.r.bo.cv)) : '--' }],
            khiBamDong: d => { if (d.r && d.r.bo) moRaSoat(d.r.id); }
        });
        $('boThNam').onchange = $('boThKy').onchange = () => { st.thKy = { nam: $('boThNam').value, ky: $('boThKy').value }; veTinhHinh(); };
    }

    // ---------------- Khởi tạo ----------------
    function veLaiDanhSach() { UI.trang('listView'); veChinh(); }
    function init() {
        damBao();
        $('boMainTabs').onclick = e => { const b = e.target.closest('[data-chinh]'); if (!b) return; st.chinh = b.dataset.chinh; if (st.chinh === 'tong') B.refresh(); veChinh(); };
        window.BCTT_KHI_DOI_VAI_TRO = () => { st.tab = vaiTro() === 'ld_bo' ? 'da' : 'cho'; st.loc = { nam: '', ky: '', so: '', tt: '' }; UI.trang('listView'); veChinh(); };
        st.tab = vaiTro() === 'ld_bo' ? 'da' : 'cho';
        veChinh();
    }
    window.BCTT_BO = { TT: TT, moRaSoat: moRaSoat, moPhanCong: moPhanCong, moKyDuyet: moKyDuyet, ve: veChinh, chon: id => { st.chon.add(id); } };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
