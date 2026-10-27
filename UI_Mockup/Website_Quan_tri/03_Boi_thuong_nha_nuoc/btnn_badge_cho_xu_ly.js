/*
 * Badge số lượng tab "Chờ xử lý" dùng chung cho 06 phân hệ BTNN và badge tương ứng tại LeftMenu (Trang chủ).
 * - Phân hệ: Tiếp nhận hồ sơ, Xác định CQGQBT, Giải quyết YCBT, Quyết định GQBT, Kinh phí (02 menu con: Tạm ứng kinh phí - kpTamUng, Chi trả tiền bồi thường - kpChiTra), Xem xét hoàn trả; thêm Báo cáo Công tác BTNN (bctt).
 * - Trang phân hệ: gọi BDG.report(module, số lượng, phần tử badge tab) mỗi khi tính lại tab Chờ xử lý.
 *   Badge tab: class bdg-tab-count, ẩn khi bằng 0. Số lượng lưu localStorage (bdg_cho_xu_ly_v1) kèm ngữ cảnh người dùng/vai trò giả lập.
 * - Trang chủ: BDG.mountMenu() hiển thị badge menu (data-badge-key="bdg_<module>") = số đã lưu của đúng ngữ cảnh hiện tại;
 *   chưa có số của ngữ cảnh hiện tại hoặc dữ liệu đã thay đổi: nạp ngầm trang phân hệ (iframe ẩn) để trang tự tính và gửi lại.
 */
(function (global) {
    if (global.BDG) return;
    const CACHE_KEY = 'bdg_cho_xu_ly_v1';
    const MSG_TYPE = 'bdg:choXuLy';
    const GQ_SIM_KEY = 'bdg_gq_sim';
    // Thứ tự = thứ tự mục menu
    const MODULES = {
        tiepNhan: { title: 'Tiếp nhận hồ sơ', page: 'tiep_nhan_ycbt.html', url: 'tiep_nhan_ycbt.html?v=3' },
        xdcq: { title: 'Xác định cơ quan giải quyết bồi thường', page: 'xac_dinh_co_quan_boi_thuong.html', url: 'xac_dinh_co_quan_boi_thuong.html?v=20261008' },
        gqYcbt: { title: 'Giải quyết yêu cầu bồi thường', page: 'quan_ly_boi_thuong.html', url: 'quan_ly_boi_thuong.html?v=1' },
        qdGqbt: { title: 'Quyết định giải quyết bồi thường', page: 'quyet_dinh_giai_quyet_boi_thuong.html', url: 'quyet_dinh_giai_quyet_boi_thuong.html?v=1' },
        // Menu Kinh phí: 02 menu con dùng chung 01 trang (tham số menu); trang báo số lượng của cả 02 menu con mỗi lần tính
        kpTamUng: { title: 'Tạm ứng kinh phí', page: 'quan_ly_kinh_phi_boi_thuong.html', menu: 'tam-ung', url: 'quan_ly_kinh_phi_boi_thuong.html?v=1&menu=tam-ung' },
        kpChiTra: { title: 'Chi trả tiền bồi thường', page: 'quan_ly_kinh_phi_boi_thuong.html', menu: 'chi-tra', url: 'quan_ly_kinh_phi_boi_thuong.html?v=1&menu=chi-tra' },
        hoanTra: { title: 'Xem xét trách nhiệm hoàn trả', page: 'xem_xet_trach_nhiem_hoan_tra.html', url: 'xem_xet_trach_nhiem_hoan_tra.html' },
        bctt: { title: 'Báo cáo Công tác BTNN', page: 'bao_cao_cong_tac_btnn.html', url: 'bao_cao_cong_tac_btnn.html' }
    };
    const MODULE_IDS = Object.keys(MODULES);

    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
    function readCache() { try { return JSON.parse(lsGet(CACHE_KEY) || '{}') || {}; } catch (e) { return {}; } }
    function writeCache(c) { try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch (e) { /* bỏ qua */ } }
    function userId() {
        try { if (global.BTNN_WF && typeof global.BTNN_WF.getCurrentUserId === 'function') return global.BTNN_WF.getCurrentUserId(); } catch (e) { /* bỏ qua */ }
        return lsGet('btnn_demo_user_v1') || 'canbonv';
    }
    // Ngữ cảnh tính số lượng: người dùng đang đăng nhập (giả lập) + vai trò giả lập riêng của phân hệ (nếu có)
    function ctxOf(module) {
        const u = 'u:' + userId();
        if (module === 'gqYcbt') return u + '|' + (ssGet(GQ_SIM_KEY) || '');
        // Hoàn trả: vai trò giả lập riêng của phân hệ (htMockScope - thanh Người dùng giả lập), không dùng mockUserRole chung của các phân hệ khác
        if (module === 'hoanTra') return u + '|' + (ssGet('htMockScope') || 'don_vi_chu');
        if (module === 'bctt') return u + '|' + (lsGet('bctt_role_v1') || 'cb_stp');
        if (module === 'kpTamUng' || module === 'kpChiTra') return u + '|' + (lsGet('kp_role_v1') || 'chuyen-vien');
        return u;
    }
    // Dấu vân tay dữ liệu (bỏ qua khóa badge): thay đổi thì số lượng đã lưu được tính lại
    function fingerprint() {
        let h = 0, n = 0;
        try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                // Bỏ qua khóa tóm tắt / phiên bản mẫu do trang tự ghi khi hiển thị (ghi theo vai trò giả lập, không phải dữ liệu nghiệp vụ)
                if (k && !/^bdg_|^btnn_gq_pending_count$|^kths_menu_badges$|^kp_role_v1$|^btnn_hoantra_summary$|^btnn_ht_seed_ver$/.test(k)) keys.push(k);
            }
            keys.sort().forEach(k => {
                const v = k + '=' + (localStorage.getItem(k) || '');
                n += v.length;
                for (let j = 0; j < v.length; j++) h = (h * 31 + v.charCodeAt(j)) | 0;
            });
        } catch (e) { /* bỏ qua */ }
        return n + ':' + (h >>> 0).toString(36);
    }
    function fmt(n) { return n > 99 ? '99+' : String(n); }

    // ---------- CSS badge tab Chờ xử lý (dùng chung 06 phân hệ) ----------
    function injectCss() {
        if (!global.document || document.getElementById('bdgCss')) return;
        const st = document.createElement('style');
        st.id = 'bdgCss';
        st.textContent = '.bdg-tab-count { display:inline-block; min-width:20px; padding:1px 7px; margin-left:4px; border-radius:10px; background:#e2e8f0; color:#334155; font-size:11.5px; font-weight:700; line-height:1.5; text-align:center; vertical-align:middle; }';
        (document.head || document.documentElement).appendChild(st);
    }

    // ---------- Trang phân hệ ----------
    // Cập nhật badge tab Chờ xử lý (ẩn khi bằng 0), lưu số lượng theo ngữ cảnh và gửi Trang chủ cập nhật badge menu
    function report(module, count, el) {
        const n = Math.max(0, Number(count) || 0);
        if (typeof el === 'string') el = document.getElementById(el);
        if (el) {
            injectCss();
            el.classList.add('bdg-tab-count');
            el.textContent = fmt(n);
            el.style.display = n > 0 ? '' : 'none';
        }
        if (!MODULES[module]) return n;
        const ctx = ctxOf(module);
        const c = readCache();
        c[module] = { ctx, count: n, fp: fingerprint(), at: Date.now() };
        writeCache(c);
        try {
            if (global.parent && global.parent !== global) global.parent.postMessage({ type: MSG_TYPE, module, ctx, count: n }, '*');
        } catch (e) { /* bỏ qua */ }
        return n;
    }

    // ---------- Trang chủ (LeftMenu) ----------
    function mountMenu(opts) {
        opts = opts || {};
        const base = opts.basePath || '';
        const mainId = opts.mainFrameId || 'mainContentIframe';
        let queue = [], running = null, timer = null, lastMain = {};

        const shown = {};
        function paint(key, n) {
            document.querySelectorAll(`.menu-badge[data-badge-key="bdg_${key}"]`).forEach(el => {
                el.innerText = fmt(n || 0);
                el.style.display = n > 0 ? '' : 'none';
            });
        }
        // Badge nhóm menu = tổng badge các mục con: "Giải quyết bồi thường" (02 mục con), "Kinh phí" (02 menu con)
        const GROUPS = { gqGroup: ['gqYcbt', 'qdGqbt'], kpGroup: ['kpTamUng', 'kpChiTra'] };
        function setMenuBadge(module, n) {
            shown[module] = Number(n) || 0;
            paint(module, shown[module]);
            Object.keys(GROUPS).forEach(g => { if (GROUPS[g].indexOf(module) >= 0) paint(g, GROUPS[g].reduce((s, m) => s + (shown[m] || 0), 0)); });
        }
        // Tiếp nhận hồ sơ: dùng trực tiếp hàm đếm chung BTNN_WF.receptionPendingCount (cùng hàm của tab) khi đã có dữ liệu
        function receptionLive() {
            const W = global.BTNN_WF;
            if (opts.liveReception === false) return false;
            return !!(W && typeof W.receptionPendingCount === 'function' && typeof W.receptionSeeded === 'function' && W.receptionSeeded());
        }
        function render() {
            const c = readCache();
            MODULE_IDS.forEach(m => {
                if (m === 'tiepNhan' && receptionLive()) {
                    try { setMenuBadge(m, global.BTNN_WF.receptionPendingCount(global.BTNN_WF.getCurrentUserId())); } catch (e) { /* bỏ qua */ }
                    return;
                }
                const it = c[m];
                setMenuBadge(m, it && it.ctx === ctxOf(m) ? it.count : 0);
            });
        }
        // Các phân hệ của trang (Kinh phí: 01 trang - 02 menu con, trang tự báo số lượng cả 02 menu con)
        function modulesOfUrl(src) {
            const file = String(src || '').split('?')[0].split('#')[0].split('/').pop();
            return MODULE_IDS.filter(m => MODULES[m].page === file);
        }
        function mainFrame() { return document.getElementById(mainId); }
        function mainModules() { const f = mainFrame(); return f ? modulesOfUrl(f.getAttribute('src')) : []; }
        function cacheValid(c, m, fp) { const it = c[m]; return !!it && it.ctx === ctxOf(m) && it.fp === fp; }
        // Tính lại các phân hệ chưa có số của ngữ cảnh hiện tại hoặc dữ liệu đã thay đổi (mỗi phân hệ tối đa 01 lần/lượt)
        function schedule(delay) {
            clearTimeout(timer);
            timer = setTimeout(runCycle, delay == null ? 800 : delay);
        }
        function runCycle() {
            const c = readCache();
            const fp = fingerprint();
            const main = mainModules();
            MODULE_IDS.forEach(m => {
                if (main.includes(m) || queue.includes(m) || (running && running.m === m)) return;
                if (m === 'tiepNhan' && receptionLive()) return;
                if (!cacheValid(c, m, fp)) queue.push(m);
            });
            next();
        }
        function finish() {
            if (!running) return;
            clearTimeout(running.timeout);
            const f = running.f;
            running = null;
            setTimeout(() => { try { f.remove(); } catch (e) { /* bỏ qua */ } }, 0);
            render();
            next();
        }
        function next() {
            if (running) return;
            // Bỏ qua phân hệ đã có số mới (VD menu con Kinh phí còn lại đã được trang nạp ngầm trước báo cùng lượt)
            const c = readCache(), fp = fingerprint();
            while (queue.length && cacheValid(c, queue[0], fp)) queue.shift();
            if (!queue.length) return;
            const m = queue.shift();
            const f = document.createElement('iframe');
            f.className = 'bdg-probe-frame';
            f.setAttribute('aria-hidden', 'true');
            f.tabIndex = -1;
            f.style.cssText = 'position:absolute; left:-10000px; top:0; width:1200px; height:800px; border:0; visibility:hidden;';
            running = { m, f, timeout: setTimeout(finish, 20000) };
            f.src = base + MODULES[m].url;
            document.body.appendChild(f);
        }

        global.addEventListener('message', event => {
            const d = event.data || {};
            if (d.type !== MSG_TYPE || !MODULES[d.module]) return;
            const mf = mainFrame();
            if (running && event.source === running.f.contentWindow) {
                // Trang nạp ngầm có thể báo nhiều phân hệ (Kinh phí: 02 menu con): nhận tất cả, kết thúc khi đã có số của phân hệ đang tính
                setMenuBadge(d.module, d.ctx === ctxOf(d.module) ? d.count : 0);
                if (d.module === running.m) setTimeout(finish, 300);
                return;
            }
            if (mf && event.source === mf.contentWindow) {
                if (d.ctx === ctxOf(d.module)) setMenuBadge(d.module, d.count); else render();
                // Trang đang mở thay đổi số lượng / ngữ cảnh: tính lại các phân hệ khác (dữ liệu dùng chung có thể đã đổi)
                const key = d.ctx + '#' + d.count;
                if (lastMain[d.module] !== key) { lastMain[d.module] = key; schedule(); }
            }
        });
        // Đổi người dùng giả lập / dữ liệu ở cửa sổ khác: hiển thị lại theo ngữ cảnh mới và tính lại khi cần
        global.addEventListener('storage', event => {
            if (!event.key || event.key === CACHE_KEY) { render(); return; }
            if (/^(btnn_demo_user_v1|btnn_wf_records_v1|btnn_flow_config_v2|receptionClaimsList_v2026|bctt_role_v1|kp_role_v1)$/.test(event.key)) {
                render();
                if (event.key === 'btnn_demo_user_v1' || event.key === 'bctt_role_v1' || event.key === 'kp_role_v1') schedule();
            }
        });
        render();
        schedule(opts.initialDelay == null ? 1500 : opts.initialDelay);
        return { render, refresh: () => schedule(0), setMenuBadge };
    }

    global.BDG = { MODULES, MODULE_IDS, CACHE_KEY, MSG_TYPE, GQ_SIM_KEY, ctxOf, fingerprint, report, mountMenu, injectCss };
})(window);
