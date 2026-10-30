/**
 * Thao tác của Lãnh đạo dùng chung tại các phân hệ BTNN (thay cho màn Hồ sơ trình Lãnh đạo đã bỏ):
 * - Phân công (Chuyển đơn vị / Phân công cán bộ) - phân hệ Tiếp nhận hồ sơ
 * - Phê duyệt / Từ chối phê duyệt phiếu trình - phân hệ Xác định cơ quan giải quyết bồi thường
 * - Thu hồi (khi bên nhận chưa xử lý)
 * Phụ thuộc: btnn_luong_xu_ly.js (BTNN_WF).
 */
(function (global) {
    'use strict';
    const WF = global.BTNN_WF;
    if (!WF) return;
    const esc = v => WF.esc(v);
    let acting = null;
    let decisionMode = 'approve';
    let doneCb = null;
    let assignUnits = []; // đơn vị nhận theo cấu hình của đơn vị đang phân công
    let assignOfficers = []; // cán bộ được phân công theo cấu hình của đơn vị đang phân công
    let assignOpts = null; // [cdpd] tham số phân công riêng (VD Cử người phục hồi danh dự - BTNN_WF.PHDD_ASSIGN); null = Phân công tại Tiếp nhận hồ sơ

    const CSS = `
    .ld-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: none; align-items: center; justify-content: center; z-index: 9500; }
    .ld-overlay.open { display: flex; }
    .ld-modal { background: #fff; border-radius: 10px; width: 720px; max-width: 95vw; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 12px 32px rgba(0,0,0,0.2); font-family: Inter, system-ui, sans-serif; }
    .ld-modal-header { padding: 18px 22px 12px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .ld-modal-header h3 { margin: 0; font-size: 16px; color: #1e3a8a; display: flex; gap: 8px; align-items: center; }
    .ld-modal-body { padding: 18px 22px; overflow-y: auto; flex: 1; font-size: 13.5px; color: #1e293b; }
    .ld-modal.ld-xd-wide { width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; border-radius: 0; }
    .ld-xd-wide #ldDBody { display: flex; gap: 18px; padding: 0; overflow: hidden; min-height: 0; }
    .ld-xd-wide #ldDPreview { flex: 1; background: #334155; overflow: auto; padding: 18px; }
    .ld-xd-wide #ldDRight { width: 480px; flex-shrink: 0; overflow-y: auto; padding: 16px 20px 16px 0; }
    .ld-a4 { position: relative; background: #fff; width: 794px; min-height: 1060px; margin: 0 auto; padding: 56px 64px; box-shadow: 0 4px 16px rgba(0,0,0,.35); font-family: 'Times New Roman', serif; font-size: 14px; color: #111; transform-origin: top center; }
    .ld-sigbox { position: absolute; border: 2px dashed #2563eb; background: rgba(239,246,255,.9); border-radius: 4px; font-family: Inter, sans-serif; font-size: 11px; padding: 4px 6px; color: #1e3a8a; }
    .ld-sigbox.agency { border-color: #dc2626; background: rgba(254,242,242,.9); color: #991b1b; }
    .ld-sigbox.done { border-style: solid; }
    .ld-hist { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #f8fafc; }
    .ld-hist-title { font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px; }
    .ld-hist-node { border-left: 2px solid #cbd5e1; padding: 2px 0 8px 12px; margin-left: 6px; position: relative; font-size: 12.5px; }
    .ld-hist-node::before { content: ''; position: absolute; left: -6px; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: #94a3b8; }
    .ld-hist-node.root::before { background: #2563eb; } .ld-hist-node.ok::before { background: #16a34a; } .ld-hist-node.no::before { background: #dc2626; } .ld-hist-node.wait::before { background: #f59e0b; }
    .ld-hist-child { margin-left: 18px; }
    .ld-sum { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #fff; }
    .ld-sum-row { display: grid; grid-template-columns: 110px 1fr; gap: 8px; font-size: 13px; padding: 3px 0; }
    .ld-sum-row > span:first-child { color: #64748b; }
    .ld-gate { display: flex; justify-content: space-between; gap: 8px; align-items: flex-start; }
    .ld-gate-badge { font-size: 11px; font-weight: 600; padding: 1px 8px; border-radius: 10px; white-space: nowrap; }
    .ld-gate-badge.ok { background: #dcfce7; color: #15803d; } .ld-gate-badge.no { background: #fee2e2; color: #b91c1c; } .ld-gate-badge.wait { background: #fef3c7; color: #b45309; } .ld-gate-badge.todo { background: #f1f5f9; color: #64748b; }
    .ld-hist-node.todo::before { background: #e2e8f0; }
    .ld-hv { display: flex; gap: 10px; padding: 0; }
    .ld-hv-step { width: 22px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding-top: 8px; }
    .ld-hv-step > i { font-size: 18px; line-height: 20px; background: #f8fafc; border-radius: 50%; }
    .ld-hv-step::after { content: ''; flex: 1; width: 2px; margin-top: 3px; background: #22c55e; }
    .ld-hv:last-child .ld-hv-step::after { display: none; }
    .ld-hv.done .ld-hv-step > i { color: #22c55e; } .ld-hv.no .ld-hv-step > i { color: #dc2626; } .ld-hv.wait .ld-hv-step > i { color: #f59e0b; } .ld-hv.todo .ld-hv-step > i { color: #cbd5e1; }
    .ld-hv.todo .ld-hv-step::after { background: #e2e8f0; }
    .ld-hv > .ld-hv-av { margin-top: 6px; }
    .ld-hv-main { padding: 8px 0 14px; }
    .ld-hv-av { width: 36px; height: 36px; border-radius: 50%; background: #eef2f7; color: #475569; font-size: 11.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ld-hv-main { flex: 1; min-width: 0; }
    .ld-hv-head { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }
    .ld-hv-name { font-weight: 600; color: #0f172a; font-size: 13.5px; }
    .ld-hv-time { color: #94a3b8; font-size: 12px; white-space: nowrap; }
    .ld-hv-sub { color: #64748b; font-size: 12px; }
    .ld-hv-act { font-size: 13px; margin-top: 2px; color: #2563eb; }
    .ld-hv-act strong { color: #0f172a; font-weight: 500; }
    .ld-hv-act.ok { color: #16a34a; } .ld-hv-act.no { color: #dc2626; } .ld-hv-act.wait { color: #d97706; } .ld-hv-act.todo { color: #94a3b8; }
    .ld-hv-msg { margin-top: 6px; background: #f1f5f9; border-radius: 6px; padding: 8px 10px; font-size: 13px; color: #1e293b; white-space: pre-wrap; }
    .ld-hv-round { display: flex; justify-content: space-between; align-items: center; margin: 8px 0 0; padding: 4px 8px; background: #f8fafc; border-radius: 6px; font-size: 12px; color: #475569; font-weight: 600; }
    .ld-modal-footer { padding: 14px 22px 18px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; background: #f8fafc; border-radius: 0 0 10px 10px; }
    .ld-close { cursor: pointer; font-size: 20px; color: #64748b; }
    .ld-label { display: block; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #334155; }
    .ld-req { color: #dc2626; margin-left: 2px; }
    .ld-group { margin-bottom: 14px; }
    .ld-input { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font: inherit; font-size: 13.5px; }
    .ld-radio { display: flex; gap: 20px; margin: 6px 0 12px; }
    .ld-radio label, .ld-check label { display: inline-flex; gap: 6px; align-items: center; cursor: pointer; font-weight: 500; }
    .ld-check { display: flex; flex-direction: column; gap: 6px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; max-height: 180px; overflow-y: auto; }
    .ld-err { color: #dc2626; font-size: 12px; margin-top: 4px; display: none; }
    .ld-hint { color: #64748b; font-size: 12px; margin-top: 4px; }
    .ld-muted { color: #64748b; font-size: 12.5px; }
    .ld-btn { border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; padding: 8px 14px; font: 600 13px Inter, system-ui, sans-serif; cursor: pointer; color: #334155; display: inline-flex; align-items: center; gap: 6px; }
    .ld-btn.primary { background: #1e3a8a; border-color: #1e3a8a; color: #fff; }
    .ld-btn.danger { background: #ef4444; border-color: #ef4444; color: #fff; }
    .ld-select-box { display: flex; align-items: center; justify-content: space-between; width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; min-height: 38px; background: #fff; cursor: pointer; transition: all 0.2s; user-select: none; }
    .ld-select-box:hover { border-color: #94a3b8; }
    .ld-select-box.focus, .ld-select-box:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12); outline: none; }
    .ld-select-box.is-invalid { border-color: #dc2626 !important; background-color: #fef2f2; }
    .ld-select-placeholder { color: #94a3b8; font-size: 13.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ld-select-value { color: #1e293b; font-size: 13.5px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ld-select-arrow { color: #64748b; font-size: 12px; margin-left: 8px; transition: transform 0.2s; }
    .ld-select-arrow.open { transform: rotate(180deg); }
    .ld-dropdown-panel { display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #fff; border: 1px solid #cbd5e1; border-radius: 6px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); z-index: 9999; flex-direction: column; }
    .ld-dropdown-panel.open { display: flex; }
    .ld-dropdown-search { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; position: relative; border-radius: 6px 6px 0 0; }
    .ld-dropdown-search i { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 12px; }
    .ld-dropdown-search input { width: 100%; box-sizing: border-box; padding: 7px 10px 7px 32px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 4px; outline: none; background: #fff; font-family: inherit; }
    .ld-dropdown-search input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1); }
    .ld-dropdown-list { overflow-y: auto; max-height: 200px; padding: 4px 0; }
    .ld-dropdown-item { padding: 8px 12px; font-size: 13.5px; color: #1e293b; cursor: pointer; transition: background 0.15s; display: flex; align-items: center; justify-content: space-between; }
    .ld-dropdown-item:hover { background: #f1f5f9; }
    .ld-dropdown-item.selected { background: #eff6ff; color: #1e40af; font-weight: 600; }
    .ld-dropdown-empty { padding: 12px; font-size: 13px; color: #94a3b8; text-align: center; font-style: italic; }`;

    const HTML = `
    <div class="ld-overlay" id="ldAssignOverlay"><div class="ld-modal">
        <div class="ld-modal-header"><h3><i class="fa-solid fa-diagram-project" id="ldAIcon"></i> <span id="ldATitle">Phân công xử lý hồ sơ</span> <span id="ldACode"></span></h3><span class="ld-close" data-close="ldAssignOverlay">&times;</span></div>
        <div class="ld-modal-body">
            <div class="ld-muted" id="ldAContext" style="margin-bottom:10px;"></div>
            <div class="ld-muted" id="ldANoConfig" style="display:none;">Đơn vị chưa được cấu hình luồng xử lý.</div>
            <div class="ld-group" id="ldAUnitBlock" style="position:relative;">
                <span class="ld-label">Đơn vị nhận<span class="ld-req">*</span></span>
                <input type="hidden" id="ldAUnit" value="">
                <div class="ld-select-box" id="ldAUnitSelectBox" tabindex="0">
                    <span id="ldAUnitSelectedText" class="ld-select-placeholder">Chọn đơn vị nhận...</span>
                    <i class="fa-solid fa-chevron-down ld-select-arrow" id="ldAUnitArrow"></i>
                </div>
                <div class="ld-dropdown-panel" id="ldAUnitDropdownPanel">
                    <div class="ld-dropdown-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="ldAUnitSearch" placeholder="Tìm theo mã hoặc tên đơn vị..." autocomplete="off">
                    </div>
                    <div class="ld-dropdown-list" id="ldAUnitList"></div>
                </div>
                <div class="ld-err" id="ldAUnitErr">Đây là trường bắt buộc</div>
            </div>
            <div class="ld-group" id="ldAOfficerBlock" style="position:relative;">
                <span class="ld-label">Cán bộ chủ trì<span class="ld-req">*</span></span>
                <input type="hidden" id="ldAChuTri" value="">
                <div class="ld-select-box" id="ldAChuTriSelectBox" tabindex="0">
                    <span id="ldAChuTriSelectedText" class="ld-select-placeholder">Chọn cán bộ chủ trì...</span>
                    <i class="fa-solid fa-chevron-down ld-select-arrow" id="ldAChuTriArrow"></i>
                </div>
                <div class="ld-dropdown-panel" id="ldAChuTriDropdownPanel">
                    <div class="ld-dropdown-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="ldAChuTriSearch" placeholder="Tìm theo tên cán bộ..." autocomplete="off">
                    </div>
                    <div class="ld-dropdown-list" id="ldAChuTriList"></div>
                </div>
                <div class="ld-err" id="ldAChuTriErr">Đây là trường bắt buộc</div>
            </div>
            <div class="ld-group"><span class="ld-label">Ý kiến chỉ đạo</span><textarea id="ldANote" class="ld-input" rows="3" placeholder="Nhập ý kiến chỉ đạo..."></textarea></div>
        </div>
        <div class="ld-modal-footer"><button class="ld-btn" data-close="ldAssignOverlay">Hủy bỏ</button><button class="ld-btn primary" id="ldASubmit"><i class="fa-solid fa-paper-plane"></i> Xác nhận phân công</button></div>
    </div></div>
    <div class="ld-overlay" id="ldDecideOverlay"><div class="ld-modal" id="ldDModal">
        <div class="ld-modal-header"><h3 id="ldDTitle"></h3><span class="ld-close" data-close="ldDecideOverlay">&times;</span></div>
        <div class="ld-modal-body" id="ldDBody"><div id="ldDPreview" style="display:none;"></div><div id="ldDRight">
            <div id="ldDSummary" style="display:none;"></div>
            <div id="ldDHistory" style="display:none;"></div>
            <div id="ldDContext" style="margin-bottom:12px;"></div>
            <div class="ld-group" id="ldDNextGroup" style="display:none;"><span class="ld-label"><span id="ldDNextLabel">Lãnh đạo phê duyệt cấp tiếp theo</span><span class="ld-req">*</span></span><select id="ldDNext" class="ld-input"></select><div class="ld-err" id="ldDNextErr">Đây là trường bắt buộc</div></div>
            <div class="ld-group"><span class="ld-label" id="ldDLabel"></span><textarea id="ldDNote" class="ld-input" rows="4"></textarea><div class="ld-err" id="ldDErr">Đây là trường bắt buộc</div></div>
        </div></div>
        <div class="ld-modal-footer"><button class="ld-btn" data-close="ldDecideOverlay">Hủy bỏ</button><button class="ld-btn primary" id="ldDSubmit">Xác nhận</button></div>
    </div></div>
    <div class="ld-overlay" id="ldConfirmOverlay"><div class="ld-modal" style="width:460px;">
        <div class="ld-modal-header"><h3><i class="fa-solid fa-circle-exclamation"></i> Xác nhận</h3><span class="ld-close" data-close="ldConfirmOverlay">&times;</span></div>
        <div class="ld-modal-body" id="ldConfirmMsg"></div>
        <div class="ld-modal-footer"><button class="ld-btn" data-close="ldConfirmOverlay">Hủy bỏ</button><button class="ld-btn primary" id="ldConfirmOk">Đồng ý</button></div>
    </div></div>`;

    function closeAllDropdowns() {
        ['ldAUnitDropdownPanel', 'ldAChuTriDropdownPanel'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('open');
        });
        ['ldAUnitArrow', 'ldAChuTriArrow'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('open');
        });
    }

    function toggleDropdown(panelId, arrowId, searchInputId, show) {
        const panel = document.getElementById(panelId);
        const arrow = document.getElementById(arrowId);
        if (!panel) return;
        const willOpen = show !== undefined ? show : !panel.classList.contains('open');
        if (willOpen) {
            closeAllDropdowns();
            panel.classList.add('open');
            if (arrow) arrow.classList.add('open');
            const sInp = document.getElementById(searchInputId);
            if (sInp) setTimeout(() => sInp.focus(), 60);
        } else {
            panel.classList.remove('open');
            if (arrow) arrow.classList.remove('open');
        }
    }

    function mount() {
        if (document.getElementById('ldAssignOverlay')) return;
        const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
        const wrap = document.createElement('div'); wrap.innerHTML = HTML; document.body.appendChild(wrap);
        wrap.addEventListener('click', e => { 
            const id = e.target.getAttribute && e.target.getAttribute('data-close'); 
            if (id) {
                closeAllDropdowns();
                close(id); 
            }
        });
        document.getElementById('ldAUnitSelectBox').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown('ldAUnitDropdownPanel', 'ldAUnitArrow', 'ldAUnitSearch');
        });
        document.getElementById('ldAOfficerBlock').addEventListener('click', (e) => {
            // Cho phép click vào trigger
            if (e.target.closest('#ldAChuTriSelectBox')) {
                e.stopPropagation();
                toggleDropdown('ldAChuTriDropdownPanel', 'ldAChuTriArrow', 'ldAChuTriSearch');
            }
        });
        document.getElementById('ldAUnitDropdownPanel').addEventListener('click', (e) => {
            e.stopPropagation();
        });
        document.getElementById('ldAChuTriDropdownPanel').addEventListener('click', (e) => {
            e.stopPropagation();
        });
        document.getElementById('ldAUnitSearch').addEventListener('input', renderUnitOptions);
        document.getElementById('ldAChuTriSearch').addEventListener('input', renderChuTriOptions);
        document.getElementById('ldASubmit').addEventListener('click', submitAssign);
        document.getElementById('ldDSubmit').addEventListener('click', submitDecision);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#ldAUnitBlock') && !e.target.closest('#ldAOfficerBlock')) {
                closeAllDropdowns();
            }
        });
    }
    function open(id) { document.getElementById(id).classList.add('open'); }
    function close(id) { 
        closeAllDropdowns();
        document.getElementById(id).classList.remove('open'); 
    }
    function notify(msg, ok) {
        if (typeof global.showToast === 'function') { try { global.showToast(msg, ok ? 'success' : 'error'); return; } catch (e) { /* bỏ qua */ } }
        alert(msg);
    }
    function finish() { if (typeof doneCb === 'function') doneCb(); }

    // Tài khoản Lãnh đạo: thuộc Nhóm lãnh đạo của ít nhất 01 đơn vị tại Cấu hình luồng xử lý (xét cả 03 Loại luồng)
    function isLeaderUser(userId) {
        return WF.FLOW_TYPE_ORDER.some(ft => {
            const cfg = WF.getFlowConfig(ft);
            return Object.keys(cfg).some(root => Object.values(cfg[root]).some(n => (n.leaders || []).includes(userId)));
        });
    }
    // Nguồn hồ sơ hiển thị: chuẩn hóa dữ liệu cũ về 04 giá trị Tiếp nhận mới / Dịch vụ công / Chuyển CQGQBT / Xác định CQGQBT
    function sourceOf(rec) {
        const v = String((rec && rec.nguonHoSo) || '').trim();
        const S = WF.SOURCES;
        if (Object.values(S).includes(v)) return v;
        if (/quốc gia|dịch vụ công|dvc/i.test(v)) return S.DVC;
        return S.TIEP_NHAN;
    }
    // Lãnh đạo đã xử lý hồ sơ (phân công / chuyển đơn vị / phê duyệt / từ chối)
    function leaderActedOn(rec, userId, pattern) {
        const re = pattern || /Chuyển đơn vị|Phân công cán bộ|Phê duyệt|Từ chối phê duyệt|Ký duyệt/;
        return (rec.history || []).some(h => h.userId === userId && re.test(h.action || ''));
    }
    // Thu hồi chỉ áp dụng cho lần xử lý gần nhất của Lãnh đạo khi bên nhận chưa xử lý
    function canRecall(rec, userId) { return !!(rec && WF.getRecallInfo(rec, userId)); }

    function setUnitValue(val) {
        const hidden = document.getElementById('ldAUnit');
        const txt = document.getElementById('ldAUnitSelectedText');
        const sBox = document.getElementById('ldAUnitSelectBox');
        const err = document.getElementById('ldAUnitErr');
        if (!hidden || !txt) return;
        hidden.value = val || '';
        if (val) {
            txt.textContent = WF.unitName(val);
            txt.className = 'ld-select-value';
            if (sBox) sBox.classList.remove('is-invalid');
            if (err) err.style.display = 'none';
        } else {
            txt.textContent = 'Chọn đơn vị nhận...';
            txt.className = 'ld-select-placeholder';
        }
    }

    function setChuTriValue(val) {
        const hidden = document.getElementById('ldAChuTri');
        const txt = document.getElementById('ldAChuTriSelectedText');
        const sBox = document.getElementById('ldAChuTriSelectBox');
        const err = document.getElementById('ldAChuTriErr');
        if (!hidden || !txt) return;
        hidden.value = val || '';
        if (val) {
            txt.textContent = WF.userLabel(val);
            txt.className = 'ld-select-value';
            if (sBox) sBox.classList.remove('is-invalid');
            if (err) err.style.display = 'none';
        } else {
            txt.textContent = 'Chọn cán bộ chủ trì...';
            txt.className = 'ld-select-placeholder';
        }
    }

    // ---------- Phân công ----------
    // opts (không bắt buộc): { title, icon, unitOf(rec), nodeOf(rec), canAssign(rec, me), assignUnit(code, unit, note), assignOfficer(code, chuTri, note) }
    function openAssign(code, cb, opts) {
        mount();
        const rec = WF.getRecord(code);
        const me = WF.getCurrentUserId();
        doneCb = cb;
        assignOpts = opts || null;
        const can = assignOpts ? assignOpts.canAssign(rec, me) : WF.canAssign(rec, me);
        if (!rec || !can) { notify('Hồ sơ đã được xử lý bởi người khác. Danh sách đã được tải lại.', false); finish(); return; }
        if (!assignOpts && WF.markViewed(rec, me)) WF.upsertRecord(rec);
        acting = code;
        const node = (assignOpts ? assignOpts.nodeOf(rec) : WF.getNodeConfig(rec.currentUnitId, WF.flowTypeOf(rec))) || {};
        const unitNow = assignOpts ? assignOpts.unitOf(rec) : rec.currentUnitId;
        document.getElementById('ldATitle').textContent = assignOpts && assignOpts.title ? assignOpts.title : 'Phân công xử lý hồ sơ';
        document.getElementById('ldAIcon').className = assignOpts && assignOpts.icon ? assignOpts.icon : 'fa-solid fa-diagram-project';
        document.getElementById('ldACode').textContent = rec.maVuViec || code;
        document.getElementById('ldAContext').textContent = `Đơn vị đang phân công: ${WF.unitName(unitNow)}`;
        // Mỗi đơn vị chỉ có 01 hình thức phân công theo cấu hình luồng: Chuyển đơn vị (Đơn vị nhận) hoặc Phân công cán bộ (Cán bộ chủ trì)
        const canUnit = !!(node.allowUnit && (node.units || []).length);
        const canOfficer = !canUnit && !!(node.allowOfficer && (node.officers || []).length);
        document.getElementById('ldAUnitBlock').style.display = canUnit ? 'block' : 'none';
        document.getElementById('ldAOfficerBlock').style.display = canOfficer ? 'block' : 'none';
        document.getElementById('ldANoConfig').style.display = canUnit || canOfficer ? 'none' : 'block';
        assignOfficers = canOfficer ? node.officers : [];
        document.getElementById('ldAChuTriSearch').value = '';
        assignUnits = canUnit ? node.units : [];
        document.getElementById('ldAUnitSearch').value = '';
        setUnitValue('');
        renderUnitOptions();
        setChuTriValue('');
        renderChuTriOptions();
        closeAllDropdowns();
        document.getElementById('ldANote').value = '';
        ['ldAUnitErr', 'ldAChuTriErr'].forEach(id => { document.getElementById(id).style.display = 'none'; });
        const uBox = document.getElementById('ldAUnitSelectBox');
        if (uBox) uBox.classList.remove('is-invalid');
        const cBox = document.getElementById('ldAChuTriSelectBox');
        if (cBox) cBox.classList.remove('is-invalid');
        open('ldAssignOverlay');
    }

    // Cán bộ chủ trì: lọc theo tên cán bộ, giữ lựa chọn đang có nếu vẫn khớp
    // Đơn vị nhận: lọc gần đúng, không phân biệt hoa thường theo mã hoặc tên đơn vị
    function renderUnitOptions() {
        const listEl = document.getElementById('ldAUnitList');
        if (!listEl) return;
        const cur = document.getElementById('ldAUnit') ? document.getElementById('ldAUnit').value : '';
        const q = document.getElementById('ldAUnitSearch') ? document.getElementById('ldAUnitSearch').value.trim().toLowerCase() : '';
        const list = assignUnits.filter(u => !q || u.toLowerCase().includes(q) || WF.unitName(u).toLowerCase().includes(q));
        if (!list.length) {
            listEl.innerHTML = '<div class="ld-dropdown-empty">Không tìm thấy đơn vị phù hợp</div>';
            return;
        }
        listEl.innerHTML = list.map(u => {
            const isSel = (u === cur);
            return `<div class="ld-dropdown-item ${isSel ? 'selected' : ''}" data-unit="${esc(u)}" title="${esc(WF.unitName(u))}">
                <span>${esc(WF.unitName(u))}</span>
                ${isSel ? '<i class="fa-solid fa-check" style="color:#2563eb; font-size:12px;"></i>' : ''}
            </div>`;
        }).join('');

        listEl.querySelectorAll('.ld-dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const u = item.getAttribute('data-unit');
                setUnitValue(u);
                toggleDropdown('ldAUnitDropdownPanel', 'ldAUnitArrow', 'ldAUnitSearch', false);
                renderUnitOptions();
            });
        });
    }

    function renderChuTriOptions() {
        const listEl = document.getElementById('ldAChuTriList');
        if (!listEl) return;
        const cur = document.getElementById('ldAChuTri') ? document.getElementById('ldAChuTri').value : '';
        const q = document.getElementById('ldAChuTriSearch') ? document.getElementById('ldAChuTriSearch').value.trim().toLowerCase() : '';
        const list = assignOfficers.filter(u => !q || WF.userName(u).toLowerCase().includes(q));
        if (!list.length) {
            listEl.innerHTML = '<div class="ld-dropdown-empty">Không tìm thấy cán bộ phù hợp</div>';
            return;
        }
        listEl.innerHTML = list.map(u => {
            const isSel = (u === cur);
            return `<div class="ld-dropdown-item ${isSel ? 'selected' : ''}" data-user="${esc(u)}" title="${esc(WF.userLabel(u))}">
                <span>${esc(WF.userLabel(u))}</span>
                ${isSel ? '<i class="fa-solid fa-check" style="color:#2563eb; font-size:12px;"></i>' : ''}
            </div>`;
        }).join('');

        listEl.querySelectorAll('.ld-dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const u = item.getAttribute('data-user');
                setChuTriValue(u);
                toggleDropdown('ldAChuTriDropdownPanel', 'ldAChuTriArrow', 'ldAChuTriSearch', false);
                renderChuTriOptions();
            });
        });
    }

    function submitAssign() {
        const note = document.getElementById('ldANote').value.trim();
        const unit = document.getElementById('ldAUnit').value;
        const chuTri = document.getElementById('ldAChuTri').value;
        const unitShown = document.getElementById('ldAUnitBlock').style.display !== 'none';
        const officerShown = document.getElementById('ldAOfficerBlock').style.display !== 'none';
        if (!unitShown && !officerShown) return;
        // Chỉ xử lý theo hướng đã cấu hình (ô đang hiển thị)
        if (unitShown && !unit) { 
            document.getElementById('ldAUnitErr').style.display = 'block'; 
            const uBox = document.getElementById('ldAUnitSelectBox');
            if (uBox) uBox.classList.add('is-invalid');
            return; 
        }
        if (officerShown && !chuTri) { 
            document.getElementById('ldAChuTriErr').style.display = 'block'; 
            const cBox = document.getElementById('ldAChuTriSelectBox');
            if (cBox) cBox.classList.add('is-invalid');
            return; 
        }
        const res = assignOpts ? (unitShown ? assignOpts.assignUnit(acting, unit, note) : assignOpts.assignOfficer(acting, chuTri, note))
            : (unitShown ? WF.assignToUnit(acting, unit, note) : WF.assignToOfficers(acting, chuTri, note));
        close('ldAssignOverlay');
        notify(res.ok ? `Đã phân công hồ sơ ${(assignOpts && res.record.maVuViec) || acting}. Trạng thái: [${res.record.status}].` : res.message, res.ok);
        finish();
    }

    // ---------- Phê duyệt / Từ chối phê duyệt ----------
    function openDecision(code, mode, cb) {
        mount();
        const rec = WF.getRecord(code);
        const me = WF.getCurrentUserId();
        doneCb = cb;
        if (!rec || !WF.canApprove(rec, me)) { notify('Hồ sơ đã được xử lý bởi người khác. Danh sách đã được tải lại.', false); finish(); return; }
        if (WF.markViewed(rec, me)) WF.upsertRecord(rec);
        acting = code;
        decisionMode = mode === 'reject' ? 'reject' : 'approve';
        const a = rec.approval;
        const isLast = a.level === a.path.length - 1;
        // Xác định CQGQBT: Ký duyệt ở mọi cấp; chỉ cấp cuối hệ thống ký số văn bản (Kết quả xác định CQGQBT ký xong hệ thống tự động chuyển CQGQBT)
        const verb = WF.approveVerb ? WF.approveVerb(rec) : 'Phê duyệt';
        const verbLc = verb.toLowerCase();
        const isXd = WF.isXdRec && WF.isXdRec(rec);
        resetXdSign();
        // Xác định CQGQBT: popup tối giản (không hiển thị lại tệp trình ký / nội dung hồ sơ); cấp cuối ký số ngay trong popup
        xdPreviewMode(false);
        if (isXd) { openXdDecision(rec, code, isLast); return; }
        document.getElementById('ldDNextLabel').textContent = 'Lãnh đạo phê duyệt cấp tiếp theo';
        document.getElementById('ldDContext').style.display = '';
        const isXdKq = isXd && a.kind === WF.KIND_KQXD;
        const signText = a.signDoc ? (a.signDoc.method === 'Ký ngoài' ? ' sử dụng văn bản ký ngoài đã tải lên;' : ' hệ thống sẽ ký số và gán chữ ký vào văn bản tại vị trí chữ ký đã định (chứng thư số của Lãnh đạo);') : '';
        const lastText = isXdKq
            ? `Cấp cuối cùng. Sau khi ký duyệt,${signText} hệ thống tự động chuyển hồ sơ đến ${WF.unitName(WF.xdTargetUnitId(rec))}, hồ sơ chuyển [Đã chuyển CQGQBT].`
            : `Cấp phê duyệt cuối cùng. Sau khi ${verbLc},${signText} hồ sơ chuyển [${a.resultStatus || WF.SUBMIT_KINDS[a.kind] || a.prevStatus || ''}].`;
        const after = decisionMode === 'approve'
            ? (isLast ? lastText : `Sau khi ${verbLc}, hồ sơ chuyển ${WF.unitName(a.path[a.level + 1])} ${verbLc}${isXd ? ' (cấp này không ký số văn bản)' : ''}.`)
            : 'Sau khi từ chối phê duyệt, hồ sơ chuyển [Bị trả lại] cho cán bộ chủ trì.';
        document.getElementById('ldDTitle').innerHTML = decisionMode === 'approve' ? `<i class="fa-solid fa-circle-check"></i> ${verb} hồ sơ ${esc(code)}` : `<i class="fa-solid fa-circle-xmark" style="color:#dc2626;"></i> Từ chối phê duyệt hồ sơ ${esc(code)}`;
        document.getElementById('ldDContext').innerHTML = WF.renderDraftDocHtml(rec) + `<div><strong>Nội dung trình:</strong> ${esc(a.kind)} - ${esc(WF.userName(a.submittedBy))}</div>${a.content ? `<div class="ld-muted">${esc(a.content)}</div>` : ''}<div style="margin-top:6px;"><strong>Cấp phê duyệt:</strong> ${a.level + 1}/${a.path.length} - ${esc(WF.unitName(a.path[a.level]))}</div><div class="ld-hint">${esc(after)}</div>`;
        document.getElementById('ldDLabel').innerHTML = decisionMode === 'approve' ? `Ý kiến ${verbLc}` : 'Lý do từ chối phê duyệt<span class="ld-req">*</span>';
        const note = document.getElementById('ldDNote');
        note.placeholder = decisionMode === 'approve' ? `Nhập ý kiến ${verbLc}...` : 'Nhập lý do từ chối phê duyệt...';
        note.value = '';
        document.getElementById('ldDErr').style.display = 'none';
        // Lãnh đạo các cấp do cán bộ chọn khi trình: không chọn Lãnh đạo cấp tiếp theo (WF.approve tự chuyển Lãnh đạo cấp tiếp theo đã chọn)
        const nextLeaders = [];
        document.getElementById('ldDNextGroup').style.display = 'none';
        document.getElementById('ldDNextErr').style.display = 'none';
        document.getElementById('ldDNext').innerHTML = `<option value="">Chọn Lãnh đạo ${esc(nextLeaders.length ? WF.unitName(a.path[a.level + 1]) : '')}...</option>` + nextLeaders.map(u => `<option value="${esc(u)}">${esc(WF.userLabel(u))}</option>`).join('');
        const btn = document.getElementById('ldDSubmit');
        btn.textContent = decisionMode === 'approve' ? verb : 'Từ chối phê duyệt';
        btn.className = decisionMode === 'approve' ? 'ld-btn primary' : 'ld-btn danger';
        open('ldDecideOverlay');
    }
    // ---------- Xác định CQGQBT: màn Ký duyệt / Từ chối ----------
    // Chốt 23/10: không nhập Chứng thư số / Mã PIN tại màn Ký duyệt; ký số hay không theo Cấu hình luồng xử lý
    function resetXdSign() { /* không còn khối Ký số */ }
    // Xác định CQGQBT: popup Ký duyệt / Từ chối dạng xem trước văn bản (vùng trái) + lịch sử trình và trường nhập (vùng phải)
    function xdPreviewMode(on) {
        const m = document.getElementById('ldDModal');
        if (m) m.classList.toggle('ld-xd-wide', !!on);
        const p = document.getElementById('ldDPreview'); if (p) p.style.display = on ? 'block' : 'none';
        const hs = document.getElementById('ldDHistory'); if (hs) hs.style.display = on ? 'block' : 'none';
        const sm = document.getElementById('ldDSummary'); if (sm) sm.style.display = on ? 'block' : 'none';
    }
    function renderXdPreview(rec) {
        const a = rec.approval || {};
        const sd = a.signDoc || {};
        const sc = sd.sigCoords || { room: { x: 60, y: 860, w: 220, h: 90 }, agency: { x: 480, y: 860, w: 245, h: 110 } };
        const path = a.path || [];
        const assignees = a.assignees || [];
        const steps = a.steps || [];
        const root = rec.rootUnitId;
        const title = a.kind === WF.KIND_KQXD ? 'VỀ VIỆC XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG' : (a.kind === 'Yêu cầu bổ sung' ? 'VỀ VIỆC YÊU CẦU BỔ SUNG HỒ SƠ' : 'VỀ VIỆC KHÔNG THỤ LÝ YÊU CẦU XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG');
        const body = a.kind === WF.KIND_KQXD
            ? `<p>${esc(WF.unitName(root))} xác định cơ quan giải quyết bồi thường là: <strong>${esc(WF.unitName(WF.xdTargetUnitId(rec)))}</strong>.</p><p>Căn cứ pháp lý: ${esc(rec.procBasis || '--')}.</p><p>Lý do: ${esc(rec.procReason || '--')}</p>`
            : `<p>${esc(WF.unitName(root))} thông báo ${a.kind === 'Yêu cầu bổ sung' ? 'và đề nghị Ông/Bà bổ sung các nội dung sau' : 'không thụ lý yêu cầu với lý do sau'}:</p><p style="margin-left:20px;">${esc(a.reason || '--').replace(/\n/g, '<br>')}</p>`;
        const box = (k, idx, cls, tag) => {
            const c = sc[k]; if (!c) return '';
            const uid = assignees[idx] || '';
            const done = steps[idx];
            return `<div class="ld-sigbox ${cls}${done ? ' done' : ''}" style="left:${c.x}px; top:${c.y}px; width:${c.w}px; height:${c.h}px;"><strong>${esc(tag)}</strong><br>Cấp ${idx + 1} - ${esc(uid ? WF.userName(uid) : '')}${done ? `<br><span style="color:#16a34a;">✔ Đã ký duyệt ${esc(done.at || '')}</span>` : ''}</div>`;
        };
        const last = Math.max(path.length - 1, 0);
        document.getElementById('ldDPreview').innerHTML = `<div style="color:#e2e8f0; font-size:12px; margin-bottom:8px;"><i class="fa-solid fa-file-pdf"></i> ${esc(sd.file || 'Van_ban_trinh_ky.pdf')} · Trang 1/1</div>
            <div class="ld-a4">
                <div style="display:flex; justify-content:space-between; text-align:center; font-size:13px;"><div><strong>${esc(WF.unitName(root).toUpperCase())}</strong><br>Số: ......</div><div><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br><u>Độc lập - Tự do - Hạnh phúc</u></div></div>
                <div style="text-align:center; font-weight:bold; margin:28px 0 18px;">${esc(title)}</div>
                <p><strong>Kính gửi:</strong> ${esc(rec.nycName || '--')}</p>
                <p>Căn cứ Luật Trách nhiệm bồi thường của Nhà nước năm 2017; xét yêu cầu (Mã hồ sơ: <strong>${esc(rec.code)}</strong>),</p>
                ${body}
                ${path.length > 1 && sd.enableRoomSig !== false ? box('room', 0, '', 'KÝ NHÁY') : ''}
                ${box('agency', last, 'agency', 'KÝ SỐ & CON DẤU')}
            </div>`;
    }
    // Khối thông tin tổng quan của lượt trình đang chờ ký duyệt
    function renderXdSummary(rec) {
        const a = rec.approval || {};
        const row = (k, v) => `<div class="ld-sum-row"><span>${k}</span><span>${v}</span></div>`;
        document.getElementById('ldDSummary').innerHTML = `<div class="ld-sum"><div class="ld-hist-title"><i class="fa-solid fa-circle-info"></i> Thông tin tổng quan</div>`
            + row('Mã hồ sơ', `<strong>${esc(rec.code)}</strong>`)
            + row('Mã vụ việc', esc(rec.maVuViec || WF.vuViecOf(rec.code, { create: false }) || '--'))
            + row('Loại trình', esc(a.kind || '--'))
            + row('Cán bộ trình', `${esc(WF.userName(a.submittedBy) || '--')}${a.submittedAt ? ` <span style="color:#64748b;">- ${esc(a.submittedAt)}</span>` : ''}`)
            + `</div>`
            + (typeof global.tlktViewHtml === 'function' ? global.tlktViewHtml(xdAttachments(rec), { boxClass: 'ld-sum tlkt-ld-sum', titleClass: 'ld-hist-title' }) : '');
    }
    // Tài liệu đính kèm của lượt trình hiện hành: phiếu trình (signDoc.attachments); Kết quả xác định CQGQBT dữ liệu cũ: bảng Tài liệu đính kèm tại MH03 (procDocs)
    function xdAttachments(rec) {
        const a = rec.approval || {};
        const sd = a.signDoc || {};
        if (Array.isArray(sd.attachments)) return sd.attachments;
        if (a.kind === WF.KIND_KQXD) return (rec.procDocs || []).filter(d => d && (d.name || d.file)).map(d => ({ name: d.name || d.file, file: d.file ? { id: d.fileId || '', name: d.file } : null }));
        return [];
    }
    // Lịch sử trình ký: danh sách sự kiện giảm dần theo thời gian (mọi lượt trình, kể cả lượt bị từ chối), mỗi lượt có nhãn trạng thái; cấp chưa xử lý của lượt hiện hành hiển thị Chờ ký duyệt / Chưa đến
    function renderXdHistory(rec) {
        const hist = (rec.history || []).filter(h => /^Trình|Ký duyệt|Phê duyệt|Từ chối phê duyệt/.test(h.action || ''));
        const groups = [];
        hist.forEach(h => {
            if (/^Trình/.test(h.action)) groups.push({ root: h, children: [] });
            else if (groups.length) groups[groups.length - 1].children.push(h);
        });
        const a = rec.approval || {};
        const path = a.path || [];
        const initials = n => String(n || '').trim().split(/\s+/).slice(-3).map(w => w[0] || '').join('').toUpperCase();
        const sub = uid => { const u = WF.getUser(uid); return u ? [u.title, WF.unitName(u.unitId)].filter(Boolean).join(' - ') : ''; };
        const shortName = s => String(s || '').split(' - ')[0].trim();
        const pick = (re, s) => { const m = re.exec(s || ''); return m ? m[1].trim() : ''; };
        // st: done (đã xử lý, xanh) / no (từ chối, đỏ) / wait (đang chờ ký, cam) / todo (chưa tới, xám)
        const stepIcon = { done: 'fa-solid fa-circle-check', no: 'fa-solid fa-circle-xmark', wait: 'fa-regular fa-clock', todo: 'fa-regular fa-circle' };
        const item = (st, uid, name, at, cls, icon, act, msg, docs) => `<div class="ld-hv ${st}"><div class="ld-hv-step"><i class="${stepIcon[st]}"></i></div><div class="ld-hv-av">${esc(initials(name))}</div><div class="ld-hv-main">`
            + `<div class="ld-hv-head"><span class="ld-hv-name">${esc(name || '--')}</span>${at ? `<span class="ld-hv-time"><i class="fa-regular fa-clock"></i> ${esc(at)}</span>` : ''}</div>`
            + (sub(uid) ? `<div class="ld-hv-sub">${esc(sub(uid))}</div>` : '')
            + (act ? `<div class="ld-hv-act ${cls}"><i class="${icon}"></i> ${act}</div>` : '')
            + (msg ? `<div class="ld-hv-msg">${esc(msg)}</div>` : '') + (docs && typeof global.tlktInlineHtml === 'function' ? global.tlktInlineHtml(docs) : '') + `</div></div>`;
        let html = '';
        groups.forEach((g, gi) => {
            const current = gi === groups.length - 1 && a.pending;
            const items = [];
            // Trình ký
            const firstTo = pick(/Trình ([^.]+)\./, g.root.note) || (current && a.assignees && a.assignees[0] ? WF.userName(a.assignees[0]) : '');
            items.push(item('done', g.root.userId, g.root.userName, g.root.at, '', 'fa-solid fa-circle-arrow-right', `Trình ký${firstTo ? ` đến <strong>${esc(shortName(firstTo))}</strong>` : ''}`, pick(/Nội dung: (.*)$/, g.root.note) || (current ? a.content : ''), g.root.attachments));
            // Kết quả xử lý của từng cấp
            g.children.forEach(h => {
                if (/Từ chối/.test(h.action)) { items.push(item('no', h.userId, h.userName, h.at, 'no', 'fa-solid fa-ban', 'Từ chối - trả lại cán bộ trình', pick(/Lý do: (.*)$/, h.note))); return; }
                const to = pick(/chuyển ([^.]+)\./, h.note);
                const signed = /ký số/.test(h.note || '');
                items.push(to
                    ? item('done', h.userId, h.userName, h.at, '', 'fa-solid fa-circle-arrow-right', `Ký duyệt và chuyển xử lý đến <strong>${esc(shortName(to))}</strong>`, pick(/Ý kiến: (.*)$/, h.note))
                    : item('done', h.userId, h.userName, h.at, 'ok', 'fa-regular fa-circle-check', `Ký duyệt${signed ? ' - đã ký số' : ''}`, pick(/Ý kiến: (.*)$/, h.note)));
            });
            // Cấp chưa xử lý của lượt trình hiện hành: cấp đang chờ (cam), cấp chưa tới (xám, không ghi chữ)
            if (current) {
                for (let lv = g.children.length; lv < path.length; lv++) {
                    const uid = (a.assignees || [])[lv] || (WF.getLeaders(path[lv]) || [])[0] || '';
                    const nm = uid ? WF.userName(uid) : WF.unitName(path[lv]);
                    items.push(lv === a.level
                        ? item('wait', uid, nm, '', 'wait', 'fa-solid fa-hourglass-half', 'Chờ ký duyệt', '')
                        : item('todo', uid, nm, '', '', '', '', ''));
                }
            }
            html = items.reverse().join('') + html;
        });
        document.getElementById('ldDHistory').innerHTML = `<div class="ld-hist"><div class="ld-hist-title"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử trình ký</div>${html || '<div style="color:#64748b;">Chưa có lịch sử.</div>'}</div>`;
    }
    function openXdDecision(rec, code, isLast) {
        xdPreviewMode(true);
        renderXdPreview(rec);
        renderXdSummary(rec);
        renderXdHistory(rec);
        const a = rec.approval;
        const approve = decisionMode === 'approve';
        document.getElementById('ldDContext').innerHTML = '';
        document.getElementById('ldDContext').style.display = 'none';
        document.getElementById('ldDTitle').innerHTML = approve ? `<i class="fa-solid fa-file-signature"></i> Ký duyệt hồ sơ ${esc(code)}` : `<i class="fa-solid fa-circle-xmark" style="color:#dc2626;"></i> Từ chối phê duyệt hồ sơ ${esc(code)}`;
        document.getElementById('ldDLabel').innerHTML = approve ? 'Ý kiến' : 'Lý do từ chối<span class="ld-req">*</span>';
        const note = document.getElementById('ldDNote');
        note.placeholder = approve ? 'Nhập ý kiến (không bắt buộc)...' : 'Nhập lý do từ chối...';
        note.value = '';
        document.getElementById('ldDErr').style.display = 'none';
        // Lãnh đạo cấp tiếp theo do cán bộ chọn khi trình: không chọn tại popup, chỉ hiển thị dòng Chuyển tới (chỉ đọc)
        document.getElementById('ldDNextGroup').style.display = 'none';
        document.getElementById('ldDNext').innerHTML = '';
        // Không có Ghi chú kết quả, không có khối Chứng thư số / Mã PIN (chốt 23/10)
        const btn = document.getElementById('ldDSubmit');
        btn.innerHTML = approve ? '<i class="fa-solid fa-file-signature"></i> Ký duyệt' : '<i class="fa-solid fa-circle-xmark"></i> Từ chối';
        btn.className = approve ? 'ld-btn primary' : 'ld-btn danger';
        open('ldDecideOverlay');
    }
    function submitDecision() {
        const note = document.getElementById('ldDNote').value.trim();
        if (decisionMode === 'reject' && !note) { document.getElementById('ldDErr').style.display = 'block'; return; }
        const next = document.getElementById('ldDNext').value;
        if (decisionMode === 'approve' && document.getElementById('ldDNextGroup').style.display !== 'none' && !next) { document.getElementById('ldDNextErr').style.display = 'block'; return; }
        const res = decisionMode === 'approve' ? WF.approve(acting, note, next) : WF.rejectApproval(acting, note);
        close('ldDecideOverlay');
        const nextText = res.ok && res.record.status === WF.STATUS.CHO_PHE_DUYET ? ' - chuyển ' + ((next || (res.record.approval.assignees || [])[res.record.approval.level]) ? WF.userName(next || res.record.approval.assignees[res.record.approval.level]) + ' - ' : '') + WF.unitName(res.record.approval.path[res.record.approval.level]) : '';
        notify(res.ok ? `Hồ sơ ${acting}: [${res.record.status}]${nextText}.` : res.message, res.ok);
        finish();
    }

    // ---------- Thu hồi ----------
    function confirmRecall(code, cb) {
        mount();
        doneCb = cb;
        const rec = WF.getRecord(code);
        const info = rec ? WF.getRecallInfo(rec, WF.getCurrentUserId()) : null;
        if (!info) { notify('Không thể thu hồi: bên nhận đã xử lý hồ sơ.', false); finish(); return; }
        let viewed = '';
        if (info.kind === 'route' && info.route.viewedAt) viewed = ` Bên nhận đã xem lúc ${info.route.viewedAt}.`;
        document.getElementById('ldConfirmMsg').textContent = `Bạn có chắc chắn muốn thu hồi hồ sơ ${code}?${viewed}`;
        document.getElementById('ldConfirmOk').onclick = () => {
            close('ldConfirmOverlay');
            const res = WF.recall(code);
            notify(res.ok ? `Đã thu hồi hồ sơ ${code}. Trạng thái: [${res.record.status}].` : res.message, res.ok);
            finish();
        };
        open('ldConfirmOverlay');
    }

    // ---------- Chi tiết hồ sơ (chỉ xem): thông tin chung, quá trình phân công, lịch sử xử lý ----------
    function openRecordDetail(code) {
        mount();
        const rec = WF.getRecord(code);
        if (!rec) return;
        let ov = document.getElementById('ldDetailOverlay');
        if (!ov) {
            const wrap = document.createElement('div');
            wrap.innerHTML = `<div class="ld-overlay" id="ldDetailOverlay"><div class="ld-modal" style="width:980px;">
                <div class="ld-modal-header"><h3><i class="fa-solid fa-folder-open"></i> <span id="ldDetTitle"></span></h3><span class="ld-close" data-close="ldDetailOverlay">&times;</span></div>
                <div class="ld-modal-body" id="ldDetBody"></div>
                <div class="ld-modal-footer"><button class="ld-btn" data-close="ldDetailOverlay">Đóng</button></div></div></div>`;
            document.body.appendChild(wrap);
            wrap.addEventListener('click', e => { const id = e.target.getAttribute && e.target.getAttribute('data-close'); if (id) close(id); });
        }
        const row = (k, v) => `<div style="color:#64748b; font-weight:600;">${esc(k)}</div><div>${v}</div>`;
        document.getElementById('ldDetTitle').textContent = `Chi tiết hồ sơ ${code}`;
        document.getElementById('ldDetBody').innerHTML = `<div style="display:grid; grid-template-columns:200px 1fr; gap:8px 14px; margin-bottom:14px;">
            ${row('Mã vụ việc', `<strong style="color:#1e3a8a;">${esc(rec.maVuViec || rec.code)}</strong>`)}
            ${row('Loại hồ sơ', esc(rec.loaiYeuCau || '--'))}
            ${row('Nguồn hồ sơ', esc(sourceOf(rec)))}
            ${row('Tên cá nhân/Tổ chức yêu cầu', `<strong>${esc(rec.nycName || '--')}</strong>`)}
            ${row('Thời điểm tiếp nhận', esc(rec.receivedAt || rec.date || '--'))}
            ${row('Đơn vị gốc', esc(WF.unitName(rec.rootUnitId)))}
            ${row('Đơn vị đang xử lý', esc(WF.unitName(rec.currentUnitId || rec.rootUnitId)))}
            ${row('Cán bộ chủ trì', rec.chuTri ? esc(WF.userLabel(rec.chuTri)) : '<span class="ld-muted">Chưa phân công</span>')}
            ${row('Trạng thái', WF.statusBadge(rec.status))}
        </div>${WF.renderRoutesHtml(rec)}<div style="font-weight:700; color:#1e3a8a; margin:16px 0 8px; text-transform:uppercase; font-size:13px;">Lịch sử xử lý</div>${WF.renderHistoryHtml(rec)}`;
        open('ldDetailOverlay');
    }

    // Đọc tham số mở tab từ Dashboard Lãnh đạo: ?tab=pending|done (bí danh cho-xu-ly|da-xu-ly)
    function tabParam() {
        const t = new URLSearchParams(global.location.search).get('tab');
        if (!t) return '';
        return /^(done|da-xu-ly)$/.test(t) ? 'done' : 'pending';
    }

    global.BTNN_LD = { isLeaderUser, sourceOf, leaderActedOn, canRecall, openAssign, openDecision, confirmRecall, openRecordDetail, tabParam };
})(window);
