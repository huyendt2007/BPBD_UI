/*
 * Xem xét trách nhiệm hoàn trả - Thanh giả lập người dùng dùng chung màn Danh sách và màn Chi tiết (góc phải trên).
 * - 05 vai trò: Đơn vị tạo Hội đồng, Đơn vị quản lý cán bộ A, B, Sở Tư pháp, Lãnh đạo; lưu sessionStorage 'htMockScope', giữ khi chuyển màn.
 * - Nút Khôi phục dữ liệu mẫu: xóa dữ liệu thao tác đã lưu (localStorage) và tải lại trang.
 * - Màn Danh sách: lưu bộ lọc, tab khi rời trang; khôi phục khi quay lại từ màn Chi tiết (nút Đóng / đường dẫn điều hướng).
 * Nạp cuối trang, sau xem_xet_hoan_tra_pham_vi.js (Danh sách) hoặc chi_tiet_ho_so_hoan_tra_thu.js (Chi tiết).
 */
(function () {
    const ROLES = [
        ['don_vi_chu', 'Đơn vị tạo Hội đồng', 'UBND Quận Long Biên'],
        ['don_vi_a', 'Đơn vị quản lý cán bộ A', 'UBND Phường Bồ Đề'],
        ['don_vi_b', 'Đơn vị quản lý cán bộ B', 'UBND Huyện An Dương'],
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
        st.textContent = '#htRoleBar{position:fixed;top:10px;right:16px;z-index:1045;display:flex;align-items:center;gap:8px;background:#eff6ff;border:1.5px solid #bfdbfe;padding:5px 10px 5px 14px;border-radius:20px;box-shadow:0 2px 8px rgba(15,23,42,.12);font-size:13px;}'
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
    function render() {
        css();
        if (document.getElementById('htRoleBar')) return;
        const bar = document.createElement('div');
        bar.id = 'htRoleBar';
        bar.innerHTML = '<span class="hrb-label"><i class="fa-solid fa-user-gear"></i> Người dùng giả lập:</span>'
            + '<select id="htRoleBarSelect" onchange="htRoleBarChange(this.value)">' + ROLES.map(r => '<option value="' + r[0] + '"' + (r[0] === scope ? ' selected' : '') + ' title="' + r[2] + '">' + r[1] + '</option>').join('') + '</select>'
            + '<button type="button" class="hrb-reset" onclick="htRoleBarAskReset()"><i class="fa-solid fa-rotate-left"></i> Khôi phục dữ liệu mẫu</button>';
        document.body.appendChild(bar);
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
    // window: chạy sau khối khởi tạo của trang
    if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', init); else init();
})();
