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

    const CSS = `
    .ld-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: none; align-items: center; justify-content: center; z-index: 9500; }
    .ld-overlay.open { display: flex; }
    .ld-modal { background: #fff; border-radius: 10px; width: 720px; max-width: 95vw; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 12px 32px rgba(0,0,0,0.2); font-family: Inter, system-ui, sans-serif; }
    .ld-modal-header { padding: 18px 22px 12px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .ld-modal-header h3 { margin: 0; font-size: 16px; color: #1e3a8a; display: flex; gap: 8px; align-items: center; }
    .ld-modal-body { padding: 18px 22px; overflow-y: auto; flex: 1; font-size: 13.5px; color: #1e293b; }
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
        <div class="ld-modal-header"><h3><i class="fa-solid fa-diagram-project"></i> Phân công xử lý hồ sơ <span id="ldACode"></span></h3><span class="ld-close" data-close="ldAssignOverlay">&times;</span></div>
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
    <div class="ld-overlay" id="ldDecideOverlay"><div class="ld-modal">
        <div class="ld-modal-header"><h3 id="ldDTitle"></h3><span class="ld-close" data-close="ldDecideOverlay">&times;</span></div>
        <div class="ld-modal-body">
            <div id="ldDContext" style="margin-bottom:12px;"></div>
            <div class="ld-group" id="ldDNextGroup" style="display:none;"><span class="ld-label">Lãnh đạo phê duyệt cấp tiếp theo<span class="ld-req">*</span></span><select id="ldDNext" class="ld-input"></select><div class="ld-err" id="ldDNextErr">Đây là trường bắt buộc</div></div>
            <div class="ld-group"><span class="ld-label" id="ldDLabel"></span><textarea id="ldDNote" class="ld-input" rows="4"></textarea><div class="ld-err" id="ldDErr">Đây là trường bắt buộc</div></div>
        </div>
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
    // Nguồn hồ sơ hiển thị: chuẩn hóa dữ liệu cũ về 04 giá trị Tiếp nhận mới / Dịch vụ công quốc gia / Chuyển CQGQBT / Xác định CQGQBT
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
    function openAssign(code, cb) {
        mount();
        const rec = WF.getRecord(code);
        const me = WF.getCurrentUserId();
        doneCb = cb;
        if (!rec || !WF.canAssign(rec, me)) { notify('Hồ sơ đã được xử lý bởi người khác. Danh sách đã được tải lại.', false); finish(); return; }
        if (WF.markViewed(rec, me)) WF.upsertRecord(rec);
        acting = code;
        const node = WF.getNodeConfig(rec.currentUnitId, WF.flowTypeOf(rec)) || {};
        document.getElementById('ldACode').textContent = rec.maVuViec || code;
        document.getElementById('ldAContext').textContent = `Đơn vị đang phân công: ${WF.unitName(rec.currentUnitId)}`;
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
        const res = unitShown ? WF.assignToUnit(acting, unit, note) : WF.assignToOfficers(acting, chuTri, note);
        close('ldAssignOverlay');
        notify(res.ok ? `Đã phân công hồ sơ ${acting}. Trạng thái: [${res.record.status}].` : res.message, res.ok);
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
        const nextLeaders = decisionMode === 'approve' ? WF.nextLevelLeaders(rec) : [];
        document.getElementById('ldDNextGroup').style.display = nextLeaders.length ? 'block' : 'none';
        document.getElementById('ldDNextErr').style.display = 'none';
        document.getElementById('ldDNext').innerHTML = `<option value="">Chọn Lãnh đạo ${esc(nextLeaders.length ? WF.unitName(a.path[a.level + 1]) : '')}...</option>` + nextLeaders.map(u => `<option value="${esc(u)}">${esc(WF.userLabel(u))}</option>`).join('');
        const btn = document.getElementById('ldDSubmit');
        btn.textContent = decisionMode === 'approve' ? verb : 'Từ chối phê duyệt';
        btn.className = decisionMode === 'approve' ? 'ld-btn primary' : 'ld-btn danger';
        open('ldDecideOverlay');
    }
    function submitDecision() {
        const note = document.getElementById('ldDNote').value.trim();
        if (decisionMode === 'reject' && !note) { document.getElementById('ldDErr').style.display = 'block'; return; }
        const next = document.getElementById('ldDNext').value;
        if (decisionMode === 'approve' && document.getElementById('ldDNextGroup').style.display !== 'none' && !next) { document.getElementById('ldDNextErr').style.display = 'block'; return; }
        const res = decisionMode === 'approve' ? WF.approve(acting, note, next) : WF.rejectApproval(acting, note);
        close('ldDecideOverlay');
        const nextText = res.ok && res.record.status === WF.STATUS.CHO_PHE_DUYET ? ' - chuyển ' + (next ? WF.userName(next) + ' - ' : '') + WF.unitName(res.record.approval.path[res.record.approval.level]) : '';
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
