/*
 * Xem xét trách nhiệm hoàn trả - Thanh giả lập người dùng dùng chung màn Danh sách và màn Chi tiết (góc phải trên).
 * - 05 vai trò: Đơn vị tạo Hội đồng, Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương A, B, Sở Tư pháp, Lãnh đạo; lưu sessionStorage 'htMockScope', giữ khi chuyển màn.
 * - Nút Khôi phục dữ liệu mẫu: xóa dữ liệu thao tác đã lưu (localStorage) và tải lại trang.
 * - Màn Danh sách: lưu bộ lọc, tab khi rời trang; khôi phục khi quay lại từ màn Chi tiết (nút Đóng / đường dẫn điều hướng).
 * Nạp cuối trang, sau xem_xet_hoan_tra_pham_vi.js (Danh sách) hoặc chi_tiet_ho_so_hoan_tra_thu.js (Chi tiết).
 */
(function () {
    const ROLES = [
        ['don_vi_chu', 'Đơn vị tạo Hội đồng', 'UBND Quận Long Biên'],
        ['don_vi_a', 'Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương A', 'UBND Phường Bồ Đề'],
        ['don_vi_b', 'Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương B', 'UBND Huyện An Dương'],
        ['stp', 'Sở Tư pháp', 'Sở Tư pháp Hà Nội'],
        ['lanh_dao', 'Lãnh đạo', 'Lãnh đạo phê duyệt']
    ];
    const KEY = 'htMockScope', FKEY = 'htListFilters', RKEY = 'htReturnToList';
    const DATA_KEYS = ['btnn_ht_units_v1', 'btnn_hoantra_created_v1', 'btnn_ht_status_v1'];
    const ssGet = k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
    const ssSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) { /* bỏ qua */ } };
    const ssDel = k => { try { sessionStorage.removeItem(k); } catch (e) { /* bỏ qua */ } };
    const isDetail = typeof renderStateLayout === 'function';
    const isList = !isDetail && typeof switchRefundTab === 'function';
    const q = new URLSearchParams(location.search);
    const valid = v => ROLES.some(r => r[0] === v);
    let scope = valid(q.get('scope')) ? q.get('scope') : (valid(ssGet(KEY)) ? ssGet(KEY) : 'don_vi_chu');

    function css() {
        if (document.getElementById('htRoleBarCss')) return;
        const st = document.createElement('style'); st.id = 'htRoleBarCss';
        // Kiểu viên bo tròn góc trên phải lấy theo btnn_gia_lap_bar.js; các quy tắc dưới chỉ dùng khi không nạp file dùng chung
        st.textContent = '#htRoleBar{display:flex;align-items:center;gap:8px;background:#eff6ff;border:1.5px solid #bfdbfe;padding:4px 8px 4px 12px;border-radius:20px;font-size:13px;flex-wrap:nowrap;margin-left:auto;}'
            + '.ht-rolebar-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px;}'
            + '#htRoleBar .hrb-label{font-weight:700;color:#1e40af;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;}'
            + '#htRoleBar select{height:30px;padding:2px 10px;border-radius:15px;border:1px solid #93c5fd;font-weight:700;color:#1e3a8a;background:#fff;cursor:pointer;font-size:13px;}'
            + '#htRoleBar .hrb-reset{height:30px;border-radius:15px;border:1px solid #cbd5e1;background:#fff;color:#334155;font-weight:600;font-size:12.5px;padding:0 12px;cursor:pointer;white-space:nowrap;}'
            + '#htRoleResetModal{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:1100;display:none;align-items:center;justify-content:center;}'
            + '#htRoleResetModal .hrb-box{background:#fff;border-radius:10px;width:440px;max-width:94%;padding:20px 22px;box-shadow:0 10px 30px rgba(0,0,0,.2);}'
            + '#htRoleResetModal .hrb-title{font-size:16px;font-weight:700;color:#1e293b;margin-bottom:8px;}'
            + '#htRoleResetModal .hrb-text{font-size:13.5px;color:#475569;margin-bottom:18px;line-height:1.5;}'
            + '#htRoleResetModal .hrb-act{display:flex;justify-content:flex-end;gap:10px;}';
        document.head.appendChild(st);
    }
    // Vị trí thanh: góc trên phải trang như màn Xác định cơ quan giải quyết bồi thường (thanh dùng chung btnn_gia_lap_bar.js)
    function place(bar) {
        // Thanh cũ đã chèn vào Top Header của khung quản trị (phiên bản trước): gỡ bỏ
        try { const pd = window.parent !== window ? window.parent.document : null; const old = pd && pd.getElementById('htRoleBarTop'); if (old) old.remove(); } catch (e) { /* khung khác nguồn: bỏ qua */ }
        if (window.BTNN_GL) { window.BTNN_GL.wrap(bar, { hide: '.hrb-label' }); return; }
        bar.style.cssText = 'position:absolute; top:8px; right:12px; z-index:9000; margin:0;';
        document.body.appendChild(bar);
    }
    function render() {
        css();
        if (document.getElementById('htRoleBar')) return;
        const bar = document.createElement('div');
        bar.id = 'htRoleBar';
        bar.innerHTML = '<span class="hrb-label"><i class="fa-solid fa-user-gear"></i> Người dùng giả lập:</span>'
            + '<select id="htRoleBarSelect" onchange="htRoleBarChange(this.value)">' + ROLES.map(r => '<option value="' + r[0] + '"' + (r[0] === scope ? ' selected' : '') + ' title="' + r[2] + '">' + r[1] + '</option>').join('') + '</select>'
            + '<button type="button" class="hrb-reset" onclick="htRoleBarAskReset()"><i class="fa-solid fa-rotate-left"></i> Khôi phục dữ liệu mẫu</button>';
        place(bar);
        const m = document.createElement('div');
        m.id = 'htRoleResetModal';
        m.innerHTML = '<div class="hrb-box"><div class="hrb-title">Khôi phục dữ liệu mẫu</div><div class="hrb-text">Toàn bộ thao tác đã thực hiện trên các hồ sơ hoàn trả trong trình duyệt này sẽ bị xóa và đưa về dữ liệu mẫu ban đầu. Bạn có chắc chắn muốn khôi phục?</div>'
            + '<div class="hrb-act"><button type="button" class="btn btn-secondary" onclick="htRoleBarCloseReset()">Hủy bỏ</button><button type="button" class="btn btn-primary" id="htRoleResetOk" onclick="htRoleBarReset()">Khôi phục</button></div></div>';
        document.body.appendChild(m);
        // Thanh giả lập cũ trong tiêu đề màn Danh sách: thay bằng thanh dùng chung
        const old = document.getElementById('mockUserRole');
        if (old && old.parentElement) old.parentElement.style.display = 'none';
    }
    window.htRoleBarChange = function (v) {
        if (!valid(v)) return;
        scope = v; ssSet(KEY, v);
        if (isList && typeof changeMockRole === 'function') { changeMockRole(v); return; }
        if (isDetail) {
            const p = new URLSearchParams(location.search);
            p.set('scope', v);
            p.set('role', v === 'lanh_dao' ? 'lanh_dao' : 'chuyen_vien');
            if (v === 'lanh_dao') p.set('mode', 'view');
            location.href = location.pathname + '?' + p.toString();
        }
    };
    window.htRoleBarAskReset = function () { const m = document.getElementById('htRoleResetModal'); if (m) m.style.display = 'flex'; };
    window.htRoleBarCloseReset = function () { const m = document.getElementById('htRoleResetModal'); if (m) m.style.display = 'none'; };
    window.htRoleBarReset = function () {
        DATA_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch (e) { /* bỏ qua */ } });
        ssDel(FKEY);
        location.reload();
    };

    // ===== Màn Chi tiết: đánh dấu quay lại Danh sách (giữ bộ lọc) =====
    if (isDetail) {
        const baseClose = window.closeRefundDetail;
        if (typeof baseClose === 'function') window.closeRefundDetail = function () { ssSet(RKEY, '1'); return baseClose.apply(this, arguments); };
        document.addEventListener('click', e => {
            const a = e.target.closest && e.target.closest('a[href*="xem_xet_trach_nhiem_hoan_tra.html"]');
            if (a) ssSet(RKEY, '1');
        }, true);
    }

    // ===== Màn Danh sách: lưu / khôi phục bộ lọc, tab =====
    const filterEls = () => Array.from(document.querySelectorAll('input[id^="filter"], select[id^="filter"]'));
    function saveFilters() {
        const tab = document.querySelector('.ht-tabs-card .ht-tab.active');
        const vals = {}; filterEls().forEach(el => { vals[el.id] = el.value; });
        ssSet(FKEY, JSON.stringify({ vals, tab: tab ? tab.dataset.tab : 'pending', scope }));
    }
    function restoreFilters() {
        let s = null; try { s = JSON.parse(ssGet(FKEY) || 'null'); } catch (e) { s = null; }
        if (!s || s.scope !== scope) return;
        filterEls().forEach(el => { if (el.id !== 'filterStatusRefund' && s.vals[el.id] != null) el.value = s.vals[el.id]; });
        switchRefundTab(s.tab === 'done' ? 'done' : 'pending');
        const st = document.getElementById('filterStatusRefund');
        if (st && s.vals.filterStatusRefund) st.value = s.vals.filterStatusRefund;
        if (typeof applyRefundFilters === 'function') applyRefundFilters();
    }

    function init() {
        render();
        scheduleAlign();
        try { new MutationObserver(scheduleAlign).observe(document.body, { childList: true, subtree: true }); } catch (e) { /* bỏ qua */ }
        // Màn Chi tiết: góc nhìn theo vai trò giả lập (Lãnh đạo: chỉ xem, Ký duyệt / Từ chối; vai trò khác: Cán bộ xử lý)
        if (isDetail && typeof switchPerspective === 'function' && typeof currentPerspective !== 'undefined') {
            const want = scope === 'lanh_dao' ? 'leader' : 'staff';
            if (currentPerspective !== want) {
                if (want === 'leader' && typeof isViewMode !== 'undefined' && !isViewMode) { isViewMode = true; currentMode = 'view'; }
                switchPerspective(want);
                if (typeof renderStateLayout === 'function') renderStateLayout();
            }
        }
        if (isList) {
            window.addEventListener('pagehide', saveFilters);
            if (ssGet(RKEY) === '1') { ssDel(RKEY); restoreFilters(); }
        }
    }
    // ===== Căn lề bảng tài chính: cột tiền căn phải (tiêu đề và giá trị); STT, Trạng thái, Thao tác căn giữa =====
    const MONEY = /^(Tiền hoàn trả|Số tiền|Đã nộp|Đã thu|Còn phải thu|Tổng phải thu|Phải thu)/i;
    const CENTER = /^(STT|Trạng thái|Thao tác)$/i;
    function alignTables() {
        document.querySelectorAll('table').forEach(t => {
            if (t.closest('.a4-document-page, .tlhd-doc-table, #ht3A4')) return;
            const head = t.tHead && t.tHead.rows[0]; if (!head) return;
            const map = [];
            Array.from(head.cells).forEach((th, i) => {
                const txt = (th.innerText || '').replace(/\s+/g, ' ').trim();
                const a = MONEY.test(txt) ? 'right' : (CENTER.test(txt) ? 'center' : '');
                map[i] = a;
                if (a) th.style.setProperty('text-align', a, 'important');
            });
            if (!map.some(Boolean)) return;
            Array.from(t.tBodies).forEach(b => Array.from(b.rows).forEach(r => {
                if (r.cells.length !== head.cells.length) return;
                Array.from(r.cells).forEach((td, i) => { if (map[i]) td.style.setProperty('text-align', map[i], 'important'); });
            }));
        });
    }
    let alignTick = 0;
    function scheduleAlign() { if (alignTick) return; alignTick = requestAnimationFrame(() => { alignTick = 0; try { alignTables(); } catch (e) { /* bỏ qua */ } }); }

    // window: chạy sau khối khởi tạo của trang
    if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', init); else init();
})();
