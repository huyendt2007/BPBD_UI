/*
 * bctt_bo_xu_ly.js — Tổng hợp báo cáo Công tác BTNN, phía Bộ Tư pháp (trang xu_ly_bao_cao_cong_tac_btnn.html).
 * Sinh bởi skill /tao-ui ngày 03/11/2026; dùng bộ thành phần UI.* trong khối data-ui-chuan và dữ liệu chung window.BCTT (bctt_bao_cao.js, chế độ 'bo').
 * 06/11/2026 (yêu cầu khách hàng, nhanhl2 truyền đạt; sửa bằng skill /tao-ui trước khi sửa SRS):
 *   - Bỏ quy trình rà soát báo cáo của các Sở (tab «Xử lý báo cáo»: phân công Lãnh đạo Cục, Lãnh đạo Phòng, Chuyên viên; đánh giá «Đạt»;
 *     trình duyệt yêu cầu điều chỉnh) và các thông báo chuông của quy trình này.
 *   - Thứ tự tab: «Tổng hợp báo cáo», rồi «Tình hình gửi báo cáo».
 *   - Tab Tình hình gửi báo cáo: bỏ cột Trạng thái xử lý tại Bộ, Cán bộ chủ trì; khối số liệu ghi «Dữ liệu cập nhật tới thời điểm hiện tại»;
 *     bấm đơn vị đã gửi BTP mở trang chi tiết báo cáo của đơn vị toàn trang, số liệu mới nhất, không có Lịch sử xử lý.
 */
(function () {
    'use strict';
    const B = window.BCTT;
    if (!B || B.MODE !== 'bo' || !window.UI) return;
    if (B.NHUNG) return;   // khung nhúng trang chi tiết báo cáo của đơn vị: không dựng tab
    const ST = B.ST, esc = B.esc, $ = id => document.getElementById(id);
    const st = { chinh: 'tong', thKy: { nam: '', ky: '', tg: '' } };

    // ---------------- Tiện ích ngày ----------------
    function toDate(s) { const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(String(s || '')); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
    function ngayGuiBo(r) { return (r.issued && r.issued.at) || r.sentAt || ''; }
    function guiCham(r) { const d = toDate(ngayGuiBo(r)); return !!d && d >= B.hanGui(r.year, r.period).han; }

    // Dữ liệu mẫu: năm 2025 có 02 Sở gửi chậm kỳ thực tế (hạn trước 08/12/2025) để có dữ liệu «Gửi chậm» (giữ từ bản 04/11/2026)
    function damBao() {
        const db = B.db(); if (db.boSeed === 'bo2') return;
        db.reports.filter(r => !B.isBtpReport(r) && r.year === 2025 && r.period === 'thuc_te' && r.status === ST.BH).slice(0, 2)
            .forEach((r, i) => { const at = (15 + i) + '/12/2025 10:00'; if (r.issued) r.issued.at = at; if (r.kySo) r.kySo.at = at; });
        db.reports.filter(r => B.isBtpReport(r) && r.year === 2025 && r.period === 'thuc_te' && r.src).forEach(r => { delete r.src.cham; });
        db.boSeed = 'bo2'; B.save();
    }

    // ---------------- Tab chính ----------------
    // Số kỳ chờ lập báo cáo tổng hợp trên tab Tổng hợp báo cáo và badge menu; engine gọi lại sau mỗi lần vẽ (BCTT_SAU_VE)
    function capNhatDem() {
        const t = B.btpDemCho ? B.btpDemCho() : 0, ct = $('boDemTong');
        if (ct) { ct.textContent = t; ct.style.display = t ? '' : 'none'; }
        if (window.BDG) try { window.BDG.report('bctt_bo', t); } catch (e) { /* bỏ qua */ }
    }
    window.BCTT_SAU_VE = capNhatDem;
    function veChinh() {
        $('boMainTabs').classList.remove('hidden');
        $('boMainTabs').querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.chinh === st.chinh));
        ['tong', 'th'].forEach(k => $('boPanel_' + k).classList.toggle('hidden', k !== st.chinh));
        capNhatDem();
        if (st.chinh === 'th') veTinhHinh();
    }

    // ---------------- Tình hình gửi báo cáo (34 Ủy ban nhân dân tỉnh, thành phố; 06/11/2026 (nhanhl2, QDDA_020): trước là 34 Sở Tư pháp) ----------------
    // 03/11/2026: 02 tình trạng gửi `Đã gửi BTP` / `Chưa gửi BTP`; lọc theo tình trạng gửi; cột Năm báo cáo, Gửi chậm; khối Tổng hợp dạng thẻ số liệu.
    // 06/11/2026: bỏ cột Trạng thái xử lý tại Bộ, Cán bộ chủ trì; báo cáo Sở đang trình phê duyệt lại sau khi đã gửi tính Chưa gửi BTP (dòng phụ ghi rõ)
    function veTinhHinh() {
        const db = B.db();
        const nam = [...new Set(db.reports.map(r => r.year))].sort((a, b) => b - a);
        if (!st.thKy.nam) st.thKy = { nam: String(nam[0]), ky: 'thuc_te', tg: '' };
        const y = +st.thKy.nam, p = st.thKy.ky, han = B.hanGui(y, p), quaHan = new Date() >= han.han;
        const dong = B.PROVINCES.map(pr => {
            const so = B.dvName(pr), r = db.reports.find(x => !B.isBtpReport(x) && x.unitName === so && x.year === y && x.period === p);
            const daGui = !!r && r.status === ST.BH;
            return { so: so, r: r, daGui: daGui, cham: daGui && guiCham(r), trinhLai: !!r && !daGui && !!(r.bkKy && r.bkKy.length) };
        });
        const nGui = dong.filter(d => d.daGui).length, nCham = dong.filter(d => d.cham).length, nChua = dong.length - nGui;
        // 06/11/2026 (nhanhl2): Tình trạng gửi có thêm giá trị «Gửi chậm» (đã gửi BTP sau hạn gửi) để khớp thẻ Gửi chậm của khối số liệu
        const loc = d => !st.thKy.tg || (st.thKy.tg === 'gui' ? d.daGui : st.thKy.tg === 'cham' ? d.cham : !d.daGui);
        // Thẻ số liệu bấm được: Click thẻ thì danh sách lọc theo mục của thẻ (đặt ô Tình trạng gửi tương ứng); Click lại thẻ đang lọc thì bỏ lọc
        const the = (gt, icon, lopIcon, so, nhan) => `<div class="th-the th-the-loc${st.thKy.tg === gt ? ' dang-loc' : ''}" role="button" tabindex="0" data-th-loc="${gt}" aria-pressed="${st.thKy.tg === gt}" title="${st.thKy.tg === gt ? 'Đang lọc danh sách theo «' + nhan + '». Click để bỏ lọc' : 'Click để lọc danh sách theo «' + nhan + '»'}"><span class="th-icon ${lopIcon}"><i class="fa-solid ${icon}"></i></span><div><div class="th-so">${so}</div><div class="th-nhan">${nhan}</div></div>${st.thKy.tg === gt ? '<span class="th-the-dau"><i class="fa-solid fa-filter"></i> Đang lọc</span>' : ''}</div>`;
        $('boPanel_th').innerHTML = `
        <div class="card-section" data-bpbd-filter>
            <div class="section-title" data-bpbd-filter-title><span><i class="fa-solid fa-filter"></i> Bộ lọc tìm kiếm</span></div>
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label" for="boThNam">Năm báo cáo</label><select id="boThNam" class="form-select" data-kieu="Enum(Integer(4))">${nam.map(v => `<option${String(v) === st.thKy.nam ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label" for="boThKy">Loại kỳ báo cáo</label><select id="boThKy" class="form-select" data-kieu="Enum(String(100))">${Object.keys(B.PERIODS).map(k => `<option value="${k}"${k === p ? ' selected' : ''}>${esc(B.PERIODS[k].label)}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label" for="boThTG">Tình trạng gửi</label><select id="boThTG" class="form-select" data-kieu="Enum(String(50))"><option value="">Tất cả</option><option value="gui"${st.thKy.tg === 'gui' ? ' selected' : ''}>Đã gửi BTP</option><option value="cham"${st.thKy.tg === 'cham' ? ' selected' : ''}>Gửi chậm</option><option value="chua"${st.thKy.tg === 'chua' ? ' selected' : ''}>Chưa gửi BTP</option></select></div>
            </div>
            <div class="filter-actions">
                <button type="button" class="btn btn-secondary" id="boThXoa"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                <button type="button" class="btn btn-primary" id="boThTim"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
            </div>
        </div>
        <div class="card-section th-tong">
            <div class="th-tieu-de"><span>Tổng hợp tình hình gửi báo cáo năm ${y} - ${esc(B.PERIODS[p].label)}</span><span class="th-han"><i class="fa-regular fa-calendar"></i> Hạn gửi: trước ngày ${esc(han.txt)}</span></div>
            <div class="th-cap-nhat"><i class="fa-regular fa-clock"></i> Dữ liệu cập nhật tới thời điểm hiện tại: <strong>${esc(B.nowText())}</strong></div>
            <div class="th-the-hang">
                ${the('gui', 'fa-circle-check', 'tot', nGui, 'Đã gửi BTP')}
                ${the('cham', 'fa-clock', 'canh', nCham, 'Gửi chậm')}
                ${the('chua', quaHan && nChua ? 'fa-circle-exclamation' : 'fa-hourglass-half', quaHan && nChua ? 'xau' : 'trung', nChua, 'Chưa gửi BTP')}
            </div>
        </div>
        <div class="card-section"><div class="table-container"><table class="custom-table" id="boThBang"><thead><tr>
            <th>STT</th><th>Năm báo cáo</th><th>Đơn vị báo cáo</th><th>Tình trạng gửi</th><th>Ngày gửi BTP</th><th>Gửi chậm</th>
        </tr></thead><tbody></tbody></table></div></div>`;
        // 06/11/2026 (SRS MH07): khối Bộ lọc tìm kiếm thu gọn / mở rộng được (Accordion, mặc định mở); khối dựng sau khi trang tải nên phải gắn lại
        if (window.BpbdFilterToggle) window.BpbdFilterToggle.autoAttach();
        UI.luoi({
            bang: '#boThBang', duLieu: dong.filter(loc), kichThuoc: 50, rong: 'Không có dữ liệu',
            cot: [{ hien: (d, i) => i }, { hien: () => y }, { hien: d => `<span class="cell-strong">${esc(d.so)}</span>` },
                { hien: d => d.daGui ? '<span class="badge badge-success">Đã gửi BTP</span>' : `<span class="badge badge-secondary th-chua">Chưa gửi BTP</span>${d.trinhLai ? '<span class="badge-sub">Đơn vị đang trình phê duyệt lại báo cáo đã gửi</span>' : ''}` },
                { hien: d => d.daGui ? `<span class="nowrap">${esc(ngayGuiBo(d.r))}</span>` : '--' },
                { hien: d => d.daGui ? (d.cham ? '<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> Có</span>' : 'Không') : '--' }],
            // 06/11/2026 (yêu cầu khách hàng): bấm dòng của Sở Đã gửi BTP mở trang chi tiết báo cáo toàn trang. Dòng Chưa gửi BTP không bấm được.
            khiBamDong: d => { if (d.daGui) moChiTietToanTrang(d.r.id); },
            sauKhiVe: () => document.querySelectorAll('#boThBang tbody tr').forEach(tr => {
                if (tr.querySelector('.th-chua')) tr.classList.remove('admin-row-clickable');
                else if (tr.classList.contains('admin-row-clickable')) tr.title = 'Bấm để xem chi tiết báo cáo';
            })
        });
        $('boThTim').onclick = () => { st.thKy = { nam: $('boThNam').value, ky: $('boThKy').value, tg: $('boThTG').value }; veTinhHinh(); };
        $('boThXoa').onclick = () => { st.thKy = { nam: '', ky: '', tg: '' }; veTinhHinh(); };
        // Click thẻ số liệu: lọc theo mục của thẻ, giữ Năm báo cáo và Loại kỳ báo cáo đang xem; Click lại thẻ đang lọc thì bỏ lọc. Danh sách về trang đầu
        document.querySelectorAll('#boPanel_th [data-th-loc]').forEach(t => {
            const chon = () => { const gt = t.dataset.thLoc; st.thKy = { nam: String(y), ky: p, tg: st.thKy.tg === gt ? '' : gt }; veTinhHinh(); const k = document.querySelector('#boPanel_th .table-container'); if (k && k.scrollIntoView) k.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
            t.addEventListener('click', chon);
            t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chon(); } });
        });
    }

    // Trang chi tiết báo cáo của Sở toàn trang (06/11/2026): số liệu mới nhất Sở đang lưu, chỉ đọc, không có Lịch sử xử lý (nhanhl2 chọn).
    // Dựng trong khung #bcttApp của tab Tổng hợp báo cáo, ẩn thanh tab; «Quay lại» về tab Tình hình gửi báo cáo
    function moChiTietToanTrang(id) {
        $('boMainTabs').classList.add('hidden');
        $('boPanel_th').classList.add('hidden'); $('boPanel_tong').classList.remove('hidden');
        B.showDetail(id, () => { B.showList(); st.chinh = 'th'; veChinh(); window.scrollTo(0, 0); },
            { anLichSu: true, ghi: 'Số liệu mới nhất của đơn vị, tính tới ' + B.nowText() + ' (chỉ đọc).' });
        window.scrollTo(0, 0);
    }

    // ---------------- Khởi tạo ----------------
    function init() {
        damBao();
        $('boMainTabs').onclick = e => { const b = e.target.closest('[data-chinh]'); if (!b) return; st.chinh = b.dataset.chinh; if (st.chinh === 'tong') B.refresh(); veChinh(); };
        window.BCTT_KHI_DOI_VAI_TRO = () => { st.chinh = 'tong'; veChinh(); };
        veChinh();
    }
    window.BCTT_BO = { ve: veChinh, moChiTietToanTrang: moChiTietToanTrang };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
