/* =========================================================================
   KÝ DUYỆT HỒ SƠ - TAB "CHỈNH LÝ/HỦY/KHÔI PHỤC ĐĂNG KÝ"
   Theo SRS_Ky_duyet_Chinh_ly_huy_khoi_phuc_dang_ky_Lanh_dao.md
   - MH01: Danh sách đề nghị "Chờ duyệt đề nghị" (thuộc đơn vị) và hồ sơ "Chờ ký số" (trình tới Lãnh đạo đăng nhập)
   - Dữ liệu, màn hình chi tiết và popup dùng chung với phần Quản lý Chỉnh lý (window.CLDK)
   ========================================================================= */
(function () {
    'use strict';
    const C = window.CLDK;
    if (!C || typeof renderTable !== 'function') return;

    const WORK_TYPE = 'cldk';
    const LIST_URL = 'ky_duyet_ho_so.html';
    // Lãnh đạo đăng nhập (dữ liệu giả lập dùng chung với phần Chỉnh lý)
    const LEADER = C.LANH_DAO[0].ten;
    const STATUSES = ['Chờ duyệt đề nghị', 'Chờ ký số'];
    const LOAI_DANG_KY = ['Đăng ký lần đầu', 'Đăng ký thay đổi', 'Xóa đăng ký', 'Thông báo xử lý tài sản bảo đảm lần đầu', 'Thay đổi thông báo xử lý tài sản bảo đảm', 'Xóa đăng ký thông báo xử lý tài sản bảo đảm'];
    const LOAI_DE_NGHI = ['Chỉnh lý thông tin sai sót', 'Hủy đăng ký (Toàn phần)', 'Hủy đăng ký (Một phần)', 'Khôi phục hủy đăng ký'];

    let page = 1, sortKey = 'thoiDiemGuiSort', sortAsc = true, sortClicks = 0;

    const $ = id => document.getElementById(id);
    const esc = C.esc;
    const isCldk = () => leaderWorkType === WORK_TYPE;
    const pageSize = () => +(($('cb-pagesize') || {}).value || 20);
    const fmtDate = d => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    const defaultFrom = () => { const d = new Date(); return fmtDate(new Date(d.getFullYear(), d.getMonth() - 3, d.getDate())); };
    const defaultTo = () => fmtDate(new Date());

    // Phạm vi Tab: Chờ duyệt đề nghị thuộc đơn vị + Chờ ký số được trình tới đúng Lãnh đạo đăng nhập
    function inScope(p) {
        if (p.trangThai === 'Chờ duyệt đề nghị') return true;
        if (p.trangThai === 'Chờ ký số') return !!(p.trinhKy && p.trinhKy.lanhDao === LEADER);
        return false;
    }
    function scopeList() { return C.proposals().filter(inScope); }

    function toRow(p) {
        const hs = C.hoSoOf(p) || {};
        const choKy = p.trangThai === 'Chờ ký số';
        const gui = choKy && p.trinhKy ? p.trinhKy.thoiDiem : p.thoiDiemGui;
        const dt = C.parseDMY(gui);
        const [hh, mm] = ((gui || '').split(' ')[1] || '00:00').split(':');
        if (dt) dt.setHours(+hh, +mm);
        return {
            p, id: p.id, maDeNghi: p.maDeNghi, loaiDeNghi: C.loaiLabel(p), maKH: hs.maKH || '',
            soDangKy: p.soDangKy, soKhac: [hs.soDKLanDau, p.soDKHuyMoi].filter(Boolean).join(' '),
            loaiDangKy: hs.loaiDangKy || '', bbd: C.tenDanhSach(hs.bbd), bnbd: C.tenDanhSach(hs.bnbd),
            // Cán bộ lập đề nghị; Cán bộ xử lý = cán bộ được phân công thực hiện (đề nghị chưa duyệt thì chưa có)
            canBoLap: p.nguoiLap || '', canBoXuLy: p.pheDuyet ? (p.pheDuyet.nguoiThucHien || '') : '',
            thoiDiemGui: gui || '', thoiDiemGuiSort: dt ? dt.getTime() : 0, ngayGui: dt, trangThai: p.trangThai
        };
    }

    // Badge Tab: không phụ thuộc bộ lọc; ẩn khi bằng 0; lớn hơn 99 hiển thị "99+"
    function updateBadge() {
        const el = $('badge-cldk-leader');
        if (!el) return;
        const n = scopeList().length;
        el.innerText = n > 99 ? '99+' : n;
        el.style.display = n ? '' : 'none';
    }

    // ============================ MH01 - BỘ LỌC ============================
    function renderFilter() {
        const container = $('filter-card-container');
        if (!container) return;
        const uniq = key => [...new Set(scopeList().map(p => toRow(p)[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'vi'));
        const opts = list => '<option value="">Tất cả</option>' + list.map(o => `<option>${esc(o)}</option>`).join('');
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label">Mã đề nghị</label><input type="text" class="form-control" id="ld-cl-ma" placeholder="Nhập mã đề nghị..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Số đăng ký</label><input type="text" class="form-control" id="ld-cl-so" placeholder="Nhập số đăng ký..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Loại đề nghị</label><select class="form-select" id="ld-cl-loai"><option value="">Tất cả</option>${LOAI_DE_NGHI.map(o => `<option>${o}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label">Loại đăng ký</label><select class="form-select" id="ld-cl-loaidk"><option value="">Tất cả</option>${LOAI_DANG_KY.map(o => `<option>${o}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label">Trạng thái</label><select class="form-select" id="ld-cl-st"><option value="">Tất cả</option>${STATUSES.map(o => `<option>${o}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label">Tên bên bảo đảm</label><input type="text" class="form-control" id="ld-cl-bbd" placeholder="Nhập tên bên bảo đảm..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Tên bên nhận bảo đảm</label><input type="text" class="form-control" id="ld-cl-bnbd" placeholder="Nhập tên bên nhận bảo đảm..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Cán bộ lập đề nghị</label><select class="form-select" id="ld-cl-lap">${opts(uniq('canBoLap'))}</select></div>
                <div class="form-group"><label class="form-label">Cán bộ xử lý</label><select class="form-select" id="ld-cl-xuly">${opts(uniq('canBoXuLy'))}</select></div>
                <div class="form-group"><label class="form-label">Từ ngày</label><div class="date-filter-wrap"><input type="text" class="form-control" id="ld-cl-from" placeholder="dd/mm/yyyy" value="${defaultFrom()}"><i class="fa-regular fa-calendar-days"></i></div></div>
                <div class="form-group"><label class="form-label">Đến ngày</label><div class="date-filter-wrap"><input type="text" class="form-control" id="ld-cl-to" placeholder="dd/mm/yyyy" value="${defaultTo()}"><i class="fa-regular fa-calendar-days"></i></div></div>
            </div>
            <div class="filter-action-row" style="margin-top:8px;padding-top:8px;border-top:1px solid #F1F5F9;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
                <button class="btn btn-outline-secondary" onclick="LeaderCLDK.resetFilter()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                <button class="btn btn-primary" onclick="LeaderCLDK.search()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
            </div>`;
        if (typeof flatpickr !== 'undefined') {
            flatpickr('#ld-cl-from', { dateFormat: 'd/m/Y', allowInput: true });
            flatpickr('#ld-cl-to', { dateFormat: 'd/m/Y', allowInput: true });
        }
    }

    function criteria() {
        const v = id => (($(id) || {}).value || '').trim().toLowerCase();
        return {
            ma: v('ld-cl-ma'), so: v('ld-cl-so'), loai: ($('ld-cl-loai') || {}).value || '', loaiDK: ($('ld-cl-loaidk') || {}).value || '', st: ($('ld-cl-st') || {}).value || '',
            bbd: v('ld-cl-bbd'), bnbd: v('ld-cl-bnbd'), lap: ($('ld-cl-lap') || {}).value || '', xuly: ($('ld-cl-xuly') || {}).value || '',
            tu: C.parseDMY((($('ld-cl-from') || {}).value || '').trim()), den: C.parseDMY((($('ld-cl-to') || {}).value || '').trim())
        };
    }

    function setDateInvalid(on) {
        ['ld-cl-from', 'ld-cl-to'].forEach(id => { const el = $(id); if (el) el.classList.toggle('is-invalid', on); });
    }

    // ============================ MH01 - BẢNG DANH SÁCH ============================
    function actions(p) {
        const btn = (cls, icon, title, act) => `<button type="button" class="icon-btn ${cls}" data-admin-icon-normalized="1" title="${title}" onclick="event.stopPropagation(); LeaderCLDK.act('${act}', ${p.id})"><i class="fa-solid ${icon}"></i></button>`;
        if (p.trangThai === 'Chờ duyệt đề nghị') return btn('approve', 'fa-check-to-slot', 'Duyệt đề nghị', 'duyet') + btn('reject', 'fa-ban', 'Từ chối đề nghị', 'tuchoi');
        if (p.trangThai === 'Chờ ký số') return btn('sign', 'fa-file-signature', 'Ký số hồ sơ', 'kyso') + btn('cancel', 'fa-rotate-left', 'Trả lại hồ sơ', 'tralai');
        return '';
    }

    function sortIcon(key) {
        if (sortKey !== key || sortClicks === 0) return '<i class="fa-solid fa-sort" style="font-size:11px;opacity:.5"></i>';
        return `<i class="fa-solid fa-sort-${sortAsc ? 'up' : 'down'}" style="font-size:11px"></i>`;
    }

    function renderList(resetPage) {
        if (resetPage) page = 1;
        const toolbar = $('toolbar-choky-batch');
        if (toolbar) toolbar.style.display = 'none';     // Không hỗ trợ thao tác lô
        const title = document.querySelector('#view-list .card-section h3');
        if (title) title.innerText = 'Danh sách đề nghị chờ ký duyệt';

        $('table-headers-container').innerHTML = `
            <tr>
                <th style="width:50px;text-align:center">STT</th>
                <th style="width:150px;cursor:pointer" onclick="LeaderCLDK.sort('maDeNghi')">Mã đề nghị ${sortIcon('maDeNghi')}</th>
                <th style="width:190px">Loại đề nghị</th>
                <th style="width:100px">Mã KH</th>
                <th style="width:140px">Số đăng ký</th>
                <th style="width:150px">Loại đăng ký</th>
                <th style="width:220px">Tên bên bảo đảm</th>
                <th style="width:220px">Tên bên nhận bảo đảm</th>
                <th style="width:150px">Cán bộ lập đề nghị</th>
                <th style="width:150px">Cán bộ xử lý</th>
                <th style="width:140px;cursor:pointer" onclick="LeaderCLDK.sort('thoiDiemGuiSort')">Thời điểm gửi ${sortIcon('thoiDiemGuiSort')}</th>
                <th style="width:150px">Trạng thái</th>
                <th style="width:110px;text-align:center">Thao tác</th>
            </tr>`;

        const c = criteria();
        const rows = scopeList().map(toRow).filter(r => {
            if (c.ma && !r.maDeNghi.toLowerCase().includes(c.ma)) return false;
            if (c.so && !(r.soDangKy + ' ' + r.soKhac).toLowerCase().includes(c.so)) return false;
            if (c.loai && r.loaiDeNghi !== c.loai) return false;
            if (c.loaiDK && r.loaiDangKy !== c.loaiDK) return false;
            if (c.st && r.trangThai !== c.st) return false;
            if (c.bbd && !r.bbd.toLowerCase().includes(c.bbd)) return false;
            if (c.bnbd && !r.bnbd.toLowerCase().includes(c.bnbd)) return false;
            if (c.lap && r.canBoLap !== c.lap) return false;
            if (c.xuly && r.canBoXuLy !== c.xuly) return false;
            if (c.tu && r.ngayGui && r.ngayGui < c.tu) return false;
            if (c.den && r.ngayGui) { const end = new Date(c.den); end.setHours(23, 59, 59); if (r.ngayGui > end) return false; }
            return true;
        });
        rows.sort((a, b) => {
            const x = a[sortKey], y = b[sortKey];
            const cmp = typeof x === 'number' ? x - y : String(x).localeCompare(String(y), 'vi');
            return sortAsc ? cmp : -cmp;
        });

        const size = pageSize();
        const pages = Math.max(1, Math.ceil(rows.length / size));
        if (page > pages) page = pages;
        const start = (page - 1) * size;
        const view = rows.slice(start, start + size);
        const tbody = $('table-data');
        if (!view.length) {
            tbody.innerHTML = `<tr><td colspan="13" style="text-align:center;padding:30px;color:var(--text-muted);font-style:italic">${esc(C.MSG.INF_SYS_001)}</td></tr>`;
        } else {
            tbody.innerHTML = view.map((r, i) => `
                <tr style="cursor:pointer" onclick="LeaderCLDK.open(${r.id})">
                    <td style="text-align:center">${start + i + 1}</td>
                    <td><span class="action-link"><b>${esc(r.maDeNghi)}</b></span></td>
                    <td>${C.badge(r.loaiDeNghi, C.loaiClass(r.p))}</td>
                    <td>${esc(r.maKH || '-')}</td>
                    <td><b>${esc(r.soDangKy)}</b></td>
                    <td>${esc(r.loaiDangKy || '-')}</td>
                    <td>${esc(r.bbd || '-')}</td>
                    <td>${esc(r.bnbd || '-')}</td>
                    <td>${esc(r.canBoLap || '-')}</td>
                    <td>${esc(r.canBoXuLy || '-')}</td>
                    <td>${esc(r.thoiDiemGui || '-')}</td>
                    <td>${C.badge(r.trangThai, C.statusClass(r.trangThai))}</td>
                    <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">${actions(r.p)}</td>
                </tr>`).join('');
        }
        $('page-start-index').innerText = rows.length ? start + 1 : 0;
        $('page-end-index').innerText = start + view.length;
        $('total-records').innerText = rows.length;
        const b = (label, target, disabled, active) => `<button class="btn ${active ? 'btn-primary' : 'btn-outline-secondary'}" style="padding:4px 10px;font-size:12px" ${disabled ? 'disabled' : `onclick="LeaderCLDK.go(${target})"`}>${label}</button>`;
        let html = b('|&lt;&lt;', 1, page === 1 || !rows.length) + b('&lt;', page - 1, page === 1 || !rows.length);
        for (let i = 1; i <= pages; i++) html += b(i, i, !rows.length, i === page);
        html += b('&gt;', page + 1, page === pages || !rows.length) + b('&gt;&gt;|', pages, page === pages || !rows.length);
        $('pagination-buttons').innerHTML = html;
    }

    // ============================ THAO TÁC ============================
    function afterAction(cur, msg) { updateBadge(); renderFilter(); renderList(); C.toast(msg); }

    // Màn hình chi tiết dùng chung với phần Chỉnh lý; Đóng/xử lý xong quay về Tab này của Ký duyệt hồ sơ
    function openDetail(p) {
        C.setReturnUrl(LIST_URL);
        location.href = p.trangThai === 'Chờ ký số' ? `ky_so_chinh_ly.html?id=${p.id}` : `lap_de_nghi_chinh_ly.html?id=${p.id}&mode=view`;
    }

    window.LeaderCLDK = {
        search() {
            const c = criteria();
            if (c.tu && c.den && c.tu > c.den) { setDateInvalid(true); C.toast(C.MSG.VAL_007 || 'Từ ngày không được lớn hơn Đến ngày', 'error'); return; }
            setDateInvalid(false);
            renderList(true);
        },
        resetFilter() { renderFilter(); sortKey = 'thoiDiemGuiSort'; sortAsc = true; sortClicks = 0; renderList(true); },
        sort(key) {
            // Lần 1: tăng dần; lần 2: giảm dần; lần 3: về mặc định (Thời điểm gửi tăng dần)
            if (sortKey !== key) { sortKey = key; sortClicks = 0; }
            sortClicks = (sortClicks + 1) % 3;
            if (sortClicks === 0) { sortKey = 'thoiDiemGuiSort'; sortAsc = true; } else sortAsc = sortClicks === 1;
            renderList(true);
        },
        go(n) { page = n; renderList(); },
        open(id) { const p = C.getProposal(id); if (p) openDetail(p); },
        act(act, id) {
            const p = C.getProposal(id);
            if (!p) return;
            const need = act === 'duyet' || act === 'tuchoi' ? 'Chờ duyệt đề nghị' : 'Chờ ký số';
            if (p.trangThai !== need) { C.toast(C.MSG.ERR_DK_005, 'error'); updateBadge(); renderList(); return; }
            if (act === 'duyet') C.openDuyet(p, afterAction);
            if (act === 'tuchoi') C.openTuChoi(p, afterAction);
            if (act === 'tralai') C.openTraLai(p, afterAction);
            // Ký số hồ sơ trên lưới: mở trực tiếp Popup Ký số hồ sơ
            if (act === 'kyso') C.openKySo(p, afterAction);
        }
    };

    // ============================ GẮN VÀO MÀN KÝ DUYỆT HỒ SƠ ============================
    const baseFilter = renderFilterPanel, baseTable = renderTable, baseSwitch = switchLeaderWorkType;
    renderFilterPanel = function () {
        if (!isCldk()) return baseFilter.apply(this, arguments);
        syncLeaderWorkTabs();
        renderFilter();
    };
    renderTable = function (resetPage) {
        updateBadge();
        if (!isCldk()) {
            const toolbar = $('toolbar-choky-batch');
            if (toolbar) toolbar.style.display = '';
            return baseTable.apply(this, arguments);
        }
        syncLeaderWorkTabs();
        renderList(resetPage);
    };
    switchLeaderWorkType = function (type, element) {
        if (type === WORK_TYPE) { sortKey = 'thoiDiemGuiSort'; sortAsc = true; sortClicks = 0; }
        return baseSwitch.apply(this, arguments);
    };

    document.addEventListener('DOMContentLoaded', () => {
        C.clearReturnUrl();
        updateBadge();
        const ps = $('cb-pagesize');
        if (ps) ps.addEventListener('change', () => { if (isCldk()) renderList(true); });
        if (isCldk()) C.showFlash();
    });
})();
