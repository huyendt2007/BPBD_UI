/**
 * Thao tác của Lãnh đạo dùng chung tại các phân hệ BTNN (thay cho màn Hồ sơ trình Lãnh đạo đã bỏ):
 * - Phân công (Chuyển đơn vị / Phân công cán bộ) - phân hệ Tiếp nhận yêu cầu
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
    .ld-btn.danger { background: #ef4444; border-color: #ef4444; color: #fff; }`;

    const HTML = `
    <div class="ld-overlay" id="ldAssignOverlay"><div class="ld-modal">
        <div class="ld-modal-header"><h3><i class="fa-solid fa-diagram-project"></i> Phân công xử lý hồ sơ <span id="ldACode"></span></h3><span class="ld-close" data-close="ldAssignOverlay">&times;</span></div>
        <div class="ld-modal-body">
            <div class="ld-muted" id="ldAContext" style="margin-bottom:10px;"></div>
            <span class="ld-label">Hình thức phân công<span class="ld-req">*</span></span>
            <div class="ld-radio" id="ldAModeRow"></div>
            <div class="ld-group" id="ldAUnitBlock"><span class="ld-label">Đơn vị nhận<span class="ld-req">*</span></span><select id="ldAUnit" class="ld-input"></select><div class="ld-err" id="ldAUnitErr">Đây là trường bắt buộc</div></div>
            <div id="ldAOfficerBlock">
                <div class="ld-group"><span class="ld-label">Cán bộ chủ trì<span class="ld-req">*</span></span><select id="ldAChuTri" class="ld-input"></select><div class="ld-err" id="ldAChuTriErr">Đây là trường bắt buộc</div></div>
                <div class="ld-group"><span class="ld-label">Cán bộ phối hợp</span><div class="ld-check" id="ldAPhoiHop"></div><div class="ld-hint">Cán bộ phối hợp được xem hồ sơ và bổ sung tài liệu; không được trình phê duyệt.</div></div>
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

    function mount() {
        if (document.getElementById('ldAssignOverlay')) return;
        const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
        const wrap = document.createElement('div'); wrap.innerHTML = HTML; document.body.appendChild(wrap);
        wrap.addEventListener('click', e => { const id = e.target.getAttribute && e.target.getAttribute('data-close'); if (id) close(id); });
        document.getElementById('ldAChuTri').addEventListener('change', renderPhoiHop);
        document.getElementById('ldASubmit').addEventListener('click', submitAssign);
        document.getElementById('ldDSubmit').addEventListener('click', submitDecision);
    }
    function open(id) { document.getElementById(id).classList.add('open'); }
    function close(id) { document.getElementById(id).classList.remove('open'); }
    function notify(msg, ok) {
        if (typeof global.showToast === 'function') { try { global.showToast(msg, ok ? 'success' : 'error'); return; } catch (e) { /* bỏ qua */ } }
        alert(msg);
    }
    function finish() { if (typeof doneCb === 'function') doneCb(); }

    // Tài khoản Lãnh đạo: thuộc Nhóm lãnh đạo của ít nhất 01 đơn vị tại Cấu hình luồng xử lý
    function isLeaderUser(userId) {
        const cfg = WF.getFlowConfig();
        return Object.keys(cfg).some(root => Object.values(cfg[root]).some(n => (n.leaders || []).includes(userId)));
    }
    // Lãnh đạo đã xử lý hồ sơ (phân công / chuyển đơn vị / phê duyệt / từ chối)
    function leaderActedOn(rec, userId, pattern) {
        const re = pattern || /Chuyển đơn vị|Phân công cán bộ|Phê duyệt|Từ chối phê duyệt|Ký duyệt/;
        return (rec.history || []).some(h => h.userId === userId && re.test(h.action || ''));
    }
    // Thu hồi chỉ áp dụng cho lần xử lý gần nhất của Lãnh đạo khi bên nhận chưa xử lý
    function canRecall(rec, userId) { return !!(rec && WF.getRecallInfo(rec, userId)); }

    // ---------- Phân công ----------
    function openAssign(code, cb) {
        mount();
        const rec = WF.getRecord(code);
        const me = WF.getCurrentUserId();
        doneCb = cb;
        if (!rec || !WF.canAssign(rec, me)) { notify('Hồ sơ đã được xử lý bởi người khác. Danh sách đã được tải lại.', false); finish(); return; }
        if (WF.markViewed(rec, me)) WF.upsertRecord(rec);
        acting = code;
        const node = WF.getNodeConfig(rec.currentUnitId) || {};
        document.getElementById('ldACode').textContent = code;
        document.getElementById('ldAContext').textContent = `Đơn vị đang phân công: ${WF.unitName(rec.currentUnitId)} - Người yêu cầu: ${rec.nycName || '--'}`;
        const modes = [];
        if (node.allowUnit && (node.units || []).length) modes.push(['unit', 'Chuyển đơn vị']);
        if (node.allowOfficer && (node.officers || []).length) modes.push(['officer', 'Phân công cán bộ']);
        const row = document.getElementById('ldAModeRow');
        row.innerHTML = modes.map((m, i) => `<label><input type="radio" name="ldAMode" value="${m[0]}" ${i === 0 ? 'checked' : ''}> ${m[1]}</label>`).join('') || '<span class="ld-muted">Đơn vị chưa được cấu hình hướng xử lý.</span>';
        row.querySelectorAll('input').forEach(r => r.addEventListener('change', toggleAssignMode));
        document.getElementById('ldAUnit').innerHTML = `<option value="">Chọn đơn vị nhận...</option>` + (node.units || []).map(u => `<option value="${esc(u)}">${esc(WF.unitName(u))}</option>`).join('');
        document.getElementById('ldAChuTri').innerHTML = `<option value="">Chọn cán bộ chủ trì...</option>` + (node.officers || []).map(u => `<option value="${esc(u)}">${esc(WF.userLabel(u))}</option>`).join('');
        document.getElementById('ldANote').value = '';
        ['ldAUnitErr', 'ldAChuTriErr'].forEach(id => { document.getElementById(id).style.display = 'none'; });
        renderPhoiHop();
        toggleAssignMode();
        open('ldAssignOverlay');
    }
    function toggleAssignMode() {
        const mode = (document.querySelector('input[name="ldAMode"]:checked') || {}).value;
        document.getElementById('ldAUnitBlock').style.display = mode === 'unit' ? 'block' : 'none';
        document.getElementById('ldAOfficerBlock').style.display = mode === 'officer' ? 'block' : 'none';
    }
    function renderPhoiHop() {
        const rec = WF.getRecord(acting);
        const node = (rec && WF.getNodeConfig(rec.currentUnitId)) || {};
        const chuTri = document.getElementById('ldAChuTri').value;
        const list = (node.officers || []).filter(u => u !== chuTri);
        document.getElementById('ldAPhoiHop').innerHTML = list.map(u => `<label><input type="checkbox" value="${esc(u)}"> ${esc(WF.userLabel(u))}</label>`).join('') || '<span class="ld-muted">Không có cán bộ khác.</span>';
    }
    function submitAssign() {
        const mode = (document.querySelector('input[name="ldAMode"]:checked') || {}).value;
        const note = document.getElementById('ldANote').value.trim();
        let res;
        if (mode === 'unit') {
            const unit = document.getElementById('ldAUnit').value;
            if (!unit) { document.getElementById('ldAUnitErr').style.display = 'block'; return; }
            res = WF.assignToUnit(acting, unit, note);
        } else if (mode === 'officer') {
            const chuTri = document.getElementById('ldAChuTri').value;
            if (!chuTri) { document.getElementById('ldAChuTriErr').style.display = 'block'; return; }
            const ph = Array.from(document.querySelectorAll('#ldAPhoiHop input:checked')).map(x => x.value);
            res = WF.assignToOfficers(acting, chuTri, ph, note);
        } else return;
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
        const after = decisionMode === 'approve'
            ? (isLast ? `Cấp phê duyệt cuối cùng. Sau khi phê duyệt, hồ sơ chuyển [${a.resultStatus || WF.SUBMIT_KINDS[a.kind] || a.prevStatus || ''}].` : `Sau khi phê duyệt, hồ sơ chuyển ${WF.unitName(a.path[a.level + 1])} phê duyệt.`)
            : 'Sau khi từ chối phê duyệt, hồ sơ chuyển [Bị trả lại] cho cán bộ chủ trì.';
        document.getElementById('ldDTitle').innerHTML = decisionMode === 'approve' ? `<i class="fa-solid fa-circle-check"></i> Phê duyệt hồ sơ ${esc(code)}` : `<i class="fa-solid fa-circle-xmark" style="color:#dc2626;"></i> Từ chối phê duyệt hồ sơ ${esc(code)}`;
        document.getElementById('ldDContext').innerHTML = WF.renderDraftDocHtml(rec) + `<div><strong>Nội dung trình:</strong> ${esc(a.kind)} - ${esc(WF.userName(a.submittedBy))}</div>${a.content ? `<div class="ld-muted">${esc(a.content)}</div>` : ''}<div style="margin-top:6px;"><strong>Cấp phê duyệt:</strong> ${a.level + 1}/${a.path.length} - ${esc(WF.unitName(a.path[a.level]))}</div><div class="ld-hint">${esc(after)}</div>`;
        document.getElementById('ldDLabel').innerHTML = decisionMode === 'approve' ? 'Ý kiến phê duyệt' : 'Lý do từ chối phê duyệt<span class="ld-req">*</span>';
        const note = document.getElementById('ldDNote');
        note.placeholder = decisionMode === 'approve' ? 'Nhập ý kiến phê duyệt...' : 'Nhập lý do từ chối phê duyệt...';
        note.value = '';
        document.getElementById('ldDErr').style.display = 'none';
        const nextLeaders = decisionMode === 'approve' ? WF.nextLevelLeaders(rec) : [];
        document.getElementById('ldDNextGroup').style.display = nextLeaders.length ? 'block' : 'none';
        document.getElementById('ldDNextErr').style.display = 'none';
        document.getElementById('ldDNext').innerHTML = `<option value="">Chọn Lãnh đạo ${esc(nextLeaders.length ? WF.unitName(a.path[a.level + 1]) : '')}...</option>` + nextLeaders.map(u => `<option value="${esc(u)}">${esc(WF.userLabel(u))}</option>`).join('');
        const btn = document.getElementById('ldDSubmit');
        btn.textContent = decisionMode === 'approve' ? 'Phê duyệt' : 'Từ chối phê duyệt';
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
            ${row('Mã vụ việc', `<strong style="color:#1e3a8a;">${esc(rec.code)}</strong>`)}
            ${row('Loại yêu cầu', esc(rec.loaiYeuCau || '--'))}
            ${row('Họ và tên người yêu cầu', `<strong>${esc(rec.nycName || '--')}</strong>`)}
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

    global.BTNN_LD = { isLeaderUser, leaderActedOn, canRecall, openAssign, openDecision, confirmRecall, openRecordDetail, tabParam };
})(window);
