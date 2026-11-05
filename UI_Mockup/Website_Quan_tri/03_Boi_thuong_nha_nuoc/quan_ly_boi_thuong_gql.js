/*
 * [gql] Hủy Quyết định giải quyết bồi thường -> Đình chỉ giải quyết hoặc Giải quyết lại (Giải quyết yêu cầu bồi thường, prefix gql) - quy tắc chốt 04/11/2026
 * - Hủy QĐ (Ký số cấp cuối / Ký ngoài tại Quyết định GQBT): Quyết định "Hủy quyết định"; vụ việc giữ trạng thái; bản ghi kinh phí giữ trạng thái, bị chặn chi tiếp (Kinh phí).
 * - Lưới MH01: dòng phụ "QĐ đã bị hủy" dưới badge Trạng thái (vụ việc có QĐ Hủy quyết định, chưa có QĐ GQBT khác ngoài Hủy quyết định (kể cả dự thảo)).
 * - Thao tác "Giải quyết lại" (Thao tác khác MH01 / thanh thao tác MH04): vụ việc có QĐ Hủy quyết định, chưa có QĐ GQBT khác ngoài Hủy quyết định (kể cả dự thảo),
 *   Trạng thái vụ việc thuộc GQL_SOURCE; trường hợp khác: mục mờ trong Thao tác khác, không hiển thị tại thanh thao tác.
 * - Popup Giải quyết lại: Căn cứ (Số, Ngày QĐ hủy, Lý do hủy - chỉ đọc), Bước giải quyết lại (bắt buộc), Lý do giải quyết lại (bắt buộc, 2000 ký tự);
 *   Lưu -> popup xác nhận -> vụ việc chuyển ngay trạng thái của bước (không trình Lãnh đạo); Lịch sử xử lý "Giải quyết lại"; gửi Dịch vụ công (bước 20).
 * - Dữ liệu lần trước giữ nguyên, chỉ đọc: QĐ đã hủy (qdHuyList), kết quả thương lượng cũ (tlRounds - "Lịch sử các lần thương lượng"),
 *   QĐ cử người cũ (cngOld); các lần xác minh theo cơ chế nhiều lần sẵn có.
 * - Dữ liệu mẫu: BT-2026-561 (Chờ chi trả, QĐ hủy, KP-2026-561 đã chi một phần), BT-2026-562 (đã Giải quyết lại về Thương lượng, lần thương lượng cũ chỉ đọc).
 * Đặt sau các script của trang (gqldActionDefs, renderAccordions, tlReadHtml, tlRenderEditBlock, gqApprovalSubLabel, saveClaimsToLocal).
 */
var GQL_STEPS = ['Cử người giải quyết bồi thường', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ'];
var GQL_SOURCE = ['Cử người giải quyết bồi thường', 'Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ', 'Chờ chi trả', 'Hoàn thành'];
var GQL_HUY = ['Hủy quyết định', 'Đã hủy'];
var GQL_MAX = 2000;
var GQL_SUB = 'QĐ đã bị hủy';
var GQL_ACTION = 'Giải quyết lại';
var GQL_DVC_STEP = 'GIAI_QUYET_LAI';
var GQL_SEED_VER = '20261104gql6';
var GQL_SEED_KEY = 'btnn_gql_seed_v';
var gqlClaim = null;

function gqlEl(id) { return document.getElementById(id); }
function gqlE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function gqlNowText() { return typeof gqNow === 'function' ? gqNow() : new Date().toLocaleString('vi-VN'); }
function gqlToday() { return new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
// Trạng thái Giải quyết YCBT (nhánh Giải quyết bồi thường thiệt hại; vụ việc Yêu cầu cả hai: nhánh Phục hồi danh dự không bị ảnh hưởng)
function gqlSt(c) { return typeof gqBranchStatus === 'function' ? gqBranchStatus(c) : canonicalClaimStatus(c.status); }
function gqlDecs() { try { var l = JSON.parse(localStorage.getItem('btnn_qd_gqbt_v2') || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; } }
function gqlDateOf(at) { var m = /(\d{2}\/\d{2}\/\d{4})/.exec(String(at || '')); return m ? m[1] : ''; }

// ---------- Quyết định của vụ việc ----------
// Quyết định GQBT khác còn hiệu lực: kho Quyết định có bản ghi khác "Hủy quyết định" (gồm dự thảo đang trình), hoặc vụ việc ghi Quyết định chưa hủy
function gqlHasActiveDec(c) {
    if (!c) return false;
    if (gqlDecs().some(function (d) { return d && d.claimCode === c.code && GQL_HUY.indexOf(d.status) < 0; })) return true;
    var ds = c.decStatus || '';
    return !!ds && ds !== 'Chưa tạo' && GQL_HUY.indexOf(ds) < 0;
}
function gqlStoreCancelled(c) {
    var l = gqlDecs().filter(function (d) { return d && d.claimCode === c.code && GQL_HUY.indexOf(d.status) >= 0; });
    return l.length ? l[l.length - 1] : null;
}
// Thông tin Quyết định đã hủy hiện hành của vụ việc (căn cứ Giải quyết lại): Quyết định bị hủy + Quyết định hủy
function gqlCancelInfo(c) {
    if (!c) return null;
    var d = gqlStoreCancelled(c), cx = (d && d.cancel) || {};
    if (GQL_HUY.indexOf(c.decStatus || '') >= 0 || d) {
        return {
            decId: d ? d.id : '', decNo: c.decNo || (d && d.decNo) || '', decDate: c.decDate || (d && d.issueDate) || '', decSigner: c.decSigner || '',
            decAmount: Number(c.decAmount || (d && d.total) || c.totalNum || 0),
            cancelDecNo: c.cancelDecNo || cx.decNo || '', cancelDecDate: c.cancelDecDate || gqlDateOf(cx.at) || '',
            cancelSigner: c.cancelSigner || '', cancelReason: c.cancelReason || cx.content || ''
        };
    }
    var h = Array.isArray(c.qdHuyList) ? c.qdHuyList : [];
    return h.length ? h[h.length - 1] : null;
}
function gqlHasCancelled(c) { return !!gqlCancelInfo(c); }
function gqlEligible(c) { return !!c && gqlHasCancelled(c) && !gqlHasActiveDec(c) && GQL_SOURCE.indexOf(gqlSt(c)) >= 0; }
function gqlBlockReason(c) {
    if (!gqlHasCancelled(c)) return 'Vụ việc không có Quyết định giải quyết bồi thường ở trạng thái Hủy quyết định';
    if (gqlHasActiveDec(c)) return 'Vụ việc đã có Quyết định giải quyết bồi thường khác (kể cả dự thảo)';
    if (GQL_SOURCE.indexOf(gqlSt(c)) < 0) return 'Không áp dụng ở trạng thái ' + gqlSt(c);
    return '';
}
// Lưu Quyết định đã hủy vào danh sách Quyết định đã bị hủy của vụ việc (01 lần theo Số Quyết định + Số Quyết định hủy)
function gqlSnapCancelled(c) {
    var info = gqlCancelInfo(c);
    if (!info) return null;
    if (!Array.isArray(c.qdHuyList)) c.qdHuyList = [];
    var k = (info.decNo || '') + '|' + (info.cancelDecNo || '');
    if (!c.qdHuyList.some(function (x) { return ((x.decNo || '') + '|' + (x.cancelDecNo || '')) === k; })) c.qdHuyList.push(JSON.parse(JSON.stringify(info)));
    return info;
}

// ---------- Thao tác khác / thanh thao tác ----------
(function () {
    var o = window.gqldActionDefs;
    if (typeof o !== 'function') return;
    window.gqldActionDefs = function (item) {
        var d = o.apply(this, arguments);
        // Đình chỉ giải quyết / Dừng giải quyết: xét theo trạng thái nhánh Giải quyết YCBT (nhánh Phục hồi danh dự giữ nguyên)
        try {
            var bs = typeof gqBranchStatus === 'function' ? gqBranchStatus(item) : canonicalClaimStatus(item.status);
            (d.more || []).forEach(function (m) {
                if (m.key === 'stop' && typeof GQLD_STOP_SOURCE !== 'undefined') m.allowed = GQLD_STOP_SOURCE.indexOf(bs) >= 0;
                if (m.key === 'dgq' && typeof DGQ_SOURCE !== 'undefined') m.allowed = DGQ_SOURCE.indexOf(bs) >= 0;
            });
        } catch (e) { /* mockup */ }
        try { if (d && Array.isArray(d.more)) d.more.push({ key: 'gql', icon: 'fa-solid fa-rotate-left', label: GQL_ACTION, allowed: gqlEligible(item), fn: "openGqlModal('" + item.id + "');" }); } catch (e) { /* mockup */ }
        return d;
    };
})();
// Thao tác khác (MH01): mục "Giải quyết lại" mờ - không hiển thị lý do
(function () {
    var o = window.gqldToggleMore;
    if (typeof o !== 'function') return;
    window.gqldToggleMore = function (ev, id) {
        var r = o.apply(this, arguments);
        try {
            var b = document.querySelector('#gqldMoreMenu button[data-action="gql"].is-disabled');
            if (b) b.title = GQL_ACTION;
        } catch (e) { /* mockup */ }
        return r;
    };
})();
// Lưới: dòng phụ "QĐ đã bị hủy" dưới badge Trạng thái
(function () {
    var o = window.gqApprovalSubLabel;
    if (typeof o !== 'function') return;
    window.gqApprovalSubLabel = function (claim) {
        var h = o.apply(this, arguments) || '';
        try {
            if (claim && gqlHasCancelled(claim) && !gqlHasActiveDec(claim)) {
                var i = gqlCancelInfo(claim) || {};
                h += '<span class="gq-sub gql-sub" style="color:#b91c1c !important;" title="Quyết định giải quyết bồi thường số ' + gqlE(i.decNo || '-') + ' đã bị hủy' + (i.cancelDecNo ? ' theo Quyết định số ' + gqlE(i.cancelDecNo) : '') + '">' + GQL_SUB + '</span>';
            }
        } catch (e) { /* mockup */ }
        return h;
    };
})();

// ---------- Popup Giải quyết lại ----------
function gqlEnsureModal() {
    if (gqlEl('modalGql')) return;
    var radios = GQL_STEPS.map(function (s, i) {
        return '<label style="display:flex; align-items:center; gap:8px; padding:6px 0; font-size:13.5px; cursor:pointer;"><input type="radio" name="gqlStep" id="gqlStep' + i + '" value="' + gqlE(s) + '" onchange="gqlClearErr(\'gqlStep\')"> ' + gqlE(s) + '</label>';
    }).join('');
    var ro = function (id, label) { return '<div class="gqx-field" style="margin-bottom:10px;"><label class="form-label">' + label + '</label><div id="' + id + '" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 12px; font-size:13px; color:#334155; min-height:36px;"></div></div>'; };
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div id="modalGql" class="confirm-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.65); backdrop-filter:blur(2px); z-index:9999; justify-content:center; align-items:center;">'
        + '<div class="sticky-modal-container" style="background:#fff; width:760px; max-width:96%; border-radius:10px; display:flex; flex-direction:column; max-height:94vh; overflow:hidden; box-shadow:0 20px 45px rgba(0,0,0,0.3);">'
        + '<div class="confirm-modal-header" style="background:#f8fafc; border-bottom:1px solid var(--border-color); padding:18px 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-shrink:0;"><div>'
        + '<div style="font-size:16.5px; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#dbeafe; color:#1d4ed8; font-size:14px;"><i class="fa-solid fa-rotate-left"></i></span><span>GIẢI QUYẾT LẠI YÊU CẦU BỒI THƯỜNG</span></div>'
        + '<div style="font-size:12.5px; color:#64748b; margin-top:4px; padding-left:38px;">Hồ sơ: <strong id="gqlClaimCode" style="color:var(--primary-color);">--</strong><span style="margin:0 6px;">•</span> Người yêu cầu: <span id="gqlClaimNYC" style="font-weight:600; color:#334155;">--</span><span style="margin:0 6px;">•</span> Đơn vị: <span id="gqlClaimAgency" style="font-weight:500; color:#475569;">--</span></div>'
        + '</div><button type="button" onclick="closeGqlModal()" style="border:none; background:transparent; font-size:22px; color:#94a3b8; cursor:pointer; line-height:1; padding:4px;" title="Đóng">&times;</button></div>'
        + '<div class="sticky-modal-body gqx-body" style="overflow-y:auto; flex:1; padding:24px;">'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-scale-balanced"></i> Căn cứ</div>'
        + '<div class="gqx-grid2" style="margin-bottom:0;">' + ro('gqlCcNo', 'Số Quyết định hủy') + ro('gqlCcDate', 'Ngày Quyết định hủy') + '</div>'
        + ro('gqlCcReason', 'Lý do hủy Quyết định') + '</div>'
        + '<div class="gqx-sec"><div class="gqx-sec-title"><i class="fa-solid fa-rotate-left"></i> Thông tin giải quyết lại</div>'
        + '<div class="gqx-field" id="gqlStepGroup"><label class="form-label">Bước giải quyết lại<span class="gqx-req">*</span></label><div id="gqlStep" style="border:1px solid transparent; border-radius:6px; padding:0 4px;">' + radios + '</div><div id="gqlStepErr" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div class="gqx-field" id="gqlReasonGroup"><label class="form-label" for="gqlReason">Lý do giải quyết lại<span class="gqx-req">*</span></label><textarea id="gqlReason" class="form-control" rows="4" maxlength="' + GQL_MAX + '" placeholder="Nhập lý do giải quyết lại..." oninput="gqlClearErr(\'gqlReason\'); gqlCount();"></textarea><div id="gqlReasonCount" class="ktlx-counter">0/' + GQL_MAX + ' ký tự</div><div id="gqlReasonErr" class="gqx-err">Đây là trường bắt buộc</div></div>'
        + '<div class="ktlx-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Lưu</strong> và xác nhận, vụ việc chuyển ngay sang trạng thái của <strong>Bước giải quyết lại</strong> đã chọn (không trình Lãnh đạo); dữ liệu các bước đã thực hiện được giữ nguyên ở chế độ chỉ đọc.</div>'
        + '</div></div>'
        + '<div class="confirm-modal-footer" style="padding:16px 28px 18px 28px; display:flex; justify-content:flex-end; gap:10px; background:#f8fafc; border-top:1px solid var(--border-color); flex-shrink:0;">'
        + '<button type="button" class="btn btn-secondary" onclick="closeGqlModal()">Hủy bỏ</button>'
        + '<button type="button" id="gqlBtnSave" class="btn btn-primary" onclick="gqlSave()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><i class="fa-regular fa-floppy-disk"></i> Lưu</button>'
        + '</div></div></div>';
    document.body.appendChild(wrap.firstChild);
}
function gqlCount() { var t = gqlEl('gqlReason'), c = gqlEl('gqlReasonCount'); if (t && c) c.textContent = (t.value || '').length + '/' + GQL_MAX + ' ký tự'; }
function gqlClearErr(id) { var el = gqlEl(id); if (el) { el.classList.remove('is-invalid'); if (id === 'gqlStep') el.style.borderColor = 'transparent'; } var er = gqlEl(id + 'Err'); if (er) er.style.display = 'none'; }
function gqlSetErr(id) { var el = gqlEl(id); if (el) { el.classList.add('is-invalid'); if (id === 'gqlStep') el.style.borderColor = '#dc2626'; } var er = gqlEl(id + 'Err'); if (er) er.style.display = 'block'; return el; }
function openGqlModal(claimId) {
    var c = typeof gqClaim === 'function' ? gqClaim(claimId) : claimsList.find(function (x) { return x.id === claimId; });
    if (!c) return;
    var why = gqlBlockReason(c);
    if (why) { showToast('Vụ việc không còn đủ điều kiện Giải quyết lại.', 'error'); return; }
    gqlEnsureModal();
    gqlClaim = c;
    var info = gqlCancelInfo(c) || {};
    gqlEl('gqlClaimCode').textContent = typeof claimVvCode === 'function' ? claimVvCode(c) : c.code;
    gqlEl('gqlClaimNYC').textContent = c.nyc || c.nycName || '--';
    gqlEl('gqlClaimAgency').textContent = c.agency || '--';
    gqlEl('gqlCcNo').textContent = info.cancelDecNo || '-';
    gqlEl('gqlCcDate').textContent = info.cancelDecDate || '-';
    gqlEl('gqlCcReason').textContent = info.cancelReason || '-';
    GQL_STEPS.forEach(function (s, i) { gqlEl('gqlStep' + i).checked = false; });
    gqlEl('gqlReason').value = '';
    gqlClearErr('gqlStep'); gqlClearErr('gqlReason'); gqlCount();
    if (typeof gqFrameFull === 'function') gqFrameFull(true);
    var m = gqlEl('modalGql');
    m.style.display = 'flex'; m.classList.add('active'); m.classList.add('visible');
}
function closeGqlModal() {
    if (typeof gqFrameFull === 'function') gqFrameFull(false);
    var m = gqlEl('modalGql'); if (m) { m.style.display = 'none'; m.classList.remove('active'); m.classList.remove('visible'); }
    gqlClaim = null;
}
function gqlSave() {
    var c = gqlClaim; if (!c) return;
    var r = document.querySelector('input[name="gqlStep"]:checked');
    var step = r ? r.value : '';
    var reason = (gqlEl('gqlReason').value || '').trim().replace(/[.\s]+$/, '');
    var first = null;
    if (!step) first = gqlSetErr('gqlStep');
    if (!reason) { var e2 = gqlSetErr('gqlReason'); first = first || e2; }
    if (first) { if (first.focus) first.focus(); return; }
    // Kiểm tra lại tại thời điểm lưu (Quyết định mới có thể vừa được lập ở phân hệ Quyết định GQBT)
    var why = gqlBlockReason(c);
    if (why) { showToast('Vụ việc không còn đủ điều kiện Giải quyết lại.', 'error'); closeGqlModal(); return; }
    var ov = gqlEl('customConfirmOverlay'); if (ov) ov.style.zIndex = '10060';
    showConfirmModal('Xác nhận Giải quyết lại vụ việc ' + (typeof claimVvLabel === 'function' ? claimVvLabel(c) : c.code) + '? Vụ việc chuyển sang trạng thái [' + step + '].',
        function () { gqlApply(c, step, reason); },
        { title: 'Xác nhận giải quyết lại', btnYesText: 'Xác nhận', btnNoText: 'Hủy', btnYesClass: 'btn-primary' });
}
// Áp Giải quyết lại: dùng lại cùng hồ sơ BT- (giữ Mã hồ sơ, Mã vụ việc); không xóa, không ghi đè dữ liệu lần trước
function gqlApply(c, step, reason) {
    var prev = gqlSt(c);
    var info = gqlSnapCancelled(c) || {};
    var at = gqlNowText();
    var by = typeof getCurrentSimulatedOfficer === 'function' ? getCurrentSimulatedOfficer() : '';
    var patch = {};
    // Thương lượng làm lại (bước Cử người / Xác minh / Thương lượng): kết quả thương lượng hiện hành chuyển sang Lịch sử các lần thương lượng (chỉ đọc)
    if (step !== 'Chờ ban hành QĐ' && c.negotiation) {
        var rounds = Array.isArray(c.tlRounds) ? c.tlRounds.slice() : [];
        rounds.push(Object.assign(JSON.parse(JSON.stringify(c.negotiation)), { lan: rounds.length + 1, archivedAt: at }));
        patch.tlRounds = rounds; patch.negotiation = null;
    }
    // Cử người lại: Quyết định cử người giải quyết bồi thường đã ban hành giữ chỉ đọc
    if (step === 'Cử người giải quyết bồi thường') {
        var old = Array.isArray(c.cngOld) ? c.cngOld.slice() : [];
        var oq = JSON.parse(JSON.stringify(c.qdCuNguoi || {}));
        // Tệp Quyết định cử người đã ký: theo hồ sơ; dữ liệu cũ không lưu tên tệp: theo tệp đang hiển thị tại Khối Tiếp nhận (gqfxQdFile)
        if (!oq.signedFile && !oq.fileName) { try { var f = typeof gqfxQdFile === 'function' ? gqfxQdFile(c) : null; if (f && f.name) oq.signedFile = f.name; } catch (e) { /* mockup */ } }
        old.push({ qdCuNguoi: oq, appointedOfficers: JSON.parse(JSON.stringify(c.appointedOfficers || [])), officersText: typeof getClaimOfficerNamesText === 'function' ? getClaimOfficerNamesText(c) : '', at: at });
        patch.cngOld = old;
    }
    var log = { at: at, by: by, step: step, reason: reason, prevStatus: prev, canCu: { cancelDecNo: info.cancelDecNo || '', cancelDecDate: info.cancelDecDate || '', cancelReason: info.cancelReason || '', decNo: info.decNo || '' } };
    patch.gqlLogs = (Array.isArray(c.gqlLogs) ? c.gqlLogs.slice() : []).concat([log]);
    patch.qdHuyList = c.qdHuyList;
    var canCuText = 'Quyết định hủy số ' + (info.cancelDecNo || '-') + ' ngày ' + (info.cancelDecDate || '-') + '; Lý do hủy: ' + String(info.cancelReason || '-').replace(/[.\s]+$/, '');
    var note = 'Bước giải quyết lại: ' + step + '. Lý do: ' + reason + '. Căn cứ: ' + canCuText + '. Hồ sơ chuyển từ [' + prev + '] sang trạng thái [' + step + '].';
    if (typeof gqSaveData === 'function') gqSaveData(c, patch); else Object.assign(c, patch);
    c.status = step;
    if (!Array.isArray(c.timeline)) c.timeline = [];
    c.timeline.push({ title: GQL_ACTION, date: gqlToday(), desc: note, status: 'completed' });
    // Hồ sơ luồng: đồng bộ trạng thái (Cử người: tạo hồ sơ luồng nếu chưa có để mở luồng Cử người giải quyết bồi thường)
    try {
        var W = typeof gqW === 'function' ? gqW() : null;
        if (W) {
            var rec = typeof gqRecord === 'function' ? gqRecord(c) : null;
            if (!rec && step === 'Cử người giải quyết bồi thường' && typeof gqEnsureRecord === 'function') rec = gqEnsureRecord(c);
            if (rec) {
                rec = W.ensureClaimRecord({ code: c.code, status: step }) || W.getRecord(c.code);
                if (rec) { rec.status = step; rec.returned = null; W.addHistory(rec, GQL_ACTION, note); W.upsertRecord(rec); }
            }
        }
    } catch (e) { if (window.console) console.warn('gql wf', e); }
    // Dịch vụ công: gửi trạng thái mới (bước 20, không gửi tệp); không suy bước theo đổi trạng thái
    try {
        if (window.LTH_DVC) {
            LTH_DVC.snap();
            var ent = LTH_DVC.record(c, GQL_DVC_STEP);
            if (ent) {
                var l = JSON.parse(localStorage.getItem('btnn_dvc_sync_log_new') || '[]'), last = l[l.length - 1];
                if (last && last.transactionId === ent.transactionId) { last.document = null; last.fileName = ''; last.fileSize = 0; localStorage.setItem('btnn_dvc_sync_log_new', JSON.stringify(l)); }
            }
        }
    } catch (e) { /* mockup */ }
    closeGqlModal();
    saveClaimsToLocal();
    try { renderClaimsTable(); } catch (e) { /* mockup */ }
    var det = document.getElementById('caseDetailView') || document.getElementById('caseDetailContainer');
    if (typeof selectedClaimId !== 'undefined' && selectedClaimId === c.id && typeof showCaseDetail === 'function' && typeof isDetailEditMode !== 'undefined') {
        try { showCaseDetail(c.id, false); } catch (e) { /* mockup */ }
    }
    showToast('Đã Giải quyết lại vụ việc ' + (typeof claimVvLabel === 'function' ? claimVvLabel(c) : c.code) + '. Hồ sơ chuyển sang trạng thái [' + step + '].', 'success');
}

// ---------- Hiển thị dữ liệu lần trước (chỉ đọc) ----------
function gqlCss() {
    if (gqlEl('gqlCss')) return;
    var st = document.createElement('style');
    st.id = 'gqlCss';
    st.textContent = [
        '.gql-box { border: 1px solid #e2e8f0; border-radius: 8px; margin-top: 14px; background: #fff; }',
        '.gql-box > .gql-box-h { background: #f8fafc; padding: 10px 14px; font-weight: 700; font-size: 13px; color: #334155; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 8px; }',
        '.gql-box.gql-red > .gql-box-h { background: #fef2f2; color: #991b1b; border-bottom-color: #fecaca; }',
        '.gql-item { border-top: 1px solid #f1f5f9; }',
        '.gql-item:first-child { border-top: 0; }',
        '.gql-item-h { padding: 9px 14px; font-size: 12.5px; font-weight: 600; color: #1e3a8a; cursor: pointer; display: flex; justify-content: space-between; gap: 8px; }',
        '.gql-item-b { padding: 4px 14px 12px; display: none; }',
        '.gql-item.open .gql-item-b { display: block; }',
        '.gql-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; font-size: 12.5px; color: #334155; padding: 10px 14px; }',
        '.gql-grid .full { grid-column: 1 / -1; }',
        '.gql-grid b { color: #475569; }'
    ].join('\n');
    document.head.appendChild(st);
}
function gqlToggleItem(el) { var it = el && el.closest('.gql-item'); if (it) it.classList.toggle('open'); }
// Lịch sử các lần thương lượng (lần cũ trước khi Giải quyết lại), lần mới nhất trên cùng
function gqlTlHistoryHtml(claim) {
    var rounds = Array.isArray(claim && claim.tlRounds) ? claim.tlRounds : [];
    if (!rounds.length || typeof window.gqlOrigTlRead !== 'function') return '';
    gqlCss();
    var items = rounds.slice().reverse().map(function (r) {
        var body = '';
        try { body = window.gqlOrigTlRead(Object.assign({}, claim, { negotiation: r })).replace(/ id="/g, ' data-gql-id="'); } catch (e) { body = ''; }
        var head = 'Lần ' + r.lan + ' - ' + (r.savedAt || '--') + (r.savedBy ? ' - ' + r.savedBy : '') + ' - ' + (r.decision || '');
        return '<div class="gql-item"><div class="gql-item-h" onclick="gqlToggleItem(this)"><span>' + gqlE(head) + '</span><i class="fa-solid fa-chevron-down"></i></div><div class="gql-item-b">' + body + '</div></div>';
    }).join('');
    return '<div class="gql-box" id="gqlTlHistory"><div class="gql-box-h"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử các lần thương lượng (chỉ đọc)</div>' + items + '</div>';
}
(function () {
    var o = window.tlReadHtml;
    if (typeof o !== 'function') return;
    window.gqlOrigTlRead = o;
    window.tlReadHtml = function (claim) {
        var h = o.apply(this, arguments);
        try {
            var rounds = Array.isArray(claim && claim.tlRounds) ? claim.tlRounds : [];
            if (rounds.length && claim.negotiation) h = '<div style="font-size:12.5px; font-weight:700; color:#1e3a8a; margin-bottom:6px;">Lần ' + (rounds.length + 1) + ' (hiện hành)</div>' + h;
            h += gqlTlHistoryHtml(claim);
        } catch (e) { /* mockup */ }
        return h;
    };
    var oe = window.tlRenderEditBlock;
    if (typeof oe === 'function') window.tlRenderEditBlock = function (claim) {
        var r = oe.apply(this, arguments);
        try {
            var box = gqlEl('tlEditContainer'), old = gqlEl('gqlTlHistEdit');
            if (old) old.remove();
            var hist = gqlTlHistoryHtml(claim);
            if (box && hist) {
                var rounds = claim.tlRounds || [];
                box.insertAdjacentHTML('beforebegin', '<div id="gqlTlHistEdit" style="margin-bottom:14px;">' + hist.replace('id="gqlTlHistory"', 'id="gqlTlHistoryEdit"')
                    + '<div style="margin-top:10px; font-size:12.5px; font-weight:700; color:#1e3a8a;">Lần ' + (rounds.length + 1) + ': nhập kết quả thương lượng mới</div></div>');
            }
        } catch (e) { /* mockup */ }
        return r;
    };
})();
function gqlDecBlockHtml(claim) {
    var list = (Array.isArray(claim.qdHuyList) ? claim.qdHuyList : []).filter(function (x) {
        // Quyết định đã hủy đang hiển thị ở khối thông tin chính (chưa có Quyết định mới): không lặp lại
        return !(GQL_HUY.indexOf(claim.decStatus || '') >= 0 && x.decNo === claim.decNo);
    });
    if (!list.length) return '';
    gqlCss();
    var items = list.slice().reverse().map(function (x) {
        return '<div class="gql-grid" style="border-top:1px dashed #fecaca;">'
            + '<div><b>Số Quyết định:</b> ' + gqlE(x.decNo || '-') + '</div><div><b>Ngày Quyết định:</b> ' + gqlE(x.decDate || '-') + '</div>'
            + '<div><b>Trạng thái QĐ:</b> <span class="badge" style="font-size:11px; color:#991B1B; background:#FEE2E2; border:1px solid #FCA5A5;">Hủy quyết định</span></div><div><b>Người ký duyệt:</b> ' + gqlE(x.decSigner || '-') + '</div>'
            + '<div><b>Số Quyết định hủy:</b> ' + gqlE(x.cancelDecNo || '-') + '</div><div><b>Ngày Quyết định hủy:</b> ' + gqlE(x.cancelDecDate || '-') + '</div>'
            + '<div class="full"><b>Lý do hủy Quyết định:</b> ' + gqlE(x.cancelReason || '-') + '</div></div>';
    }).join('');
    return '<div class="gql-box gql-red" id="gqlQdHuyBlock"><div class="gql-box-h"><i class="fa-solid fa-ban"></i> Quyết định đã bị hủy (chỉ đọc)</div>' + items + '</div>';
}
// Xem / Tải tệp Quyết định cử người cũ (chỉ đọc)
function gqlOpenFile(name, download) {
    if (!name) return;
    if (download) { if (typeof showToast === 'function') showToast('Đang tải file ' + name + '.', 'success'); return; }
    if (typeof viewPhddMockFile === 'function') viewPhddMockFile(name);
}
function gqlCngOldHtml(claim) {
    var list = Array.isArray(claim.cngOld) ? claim.cngOld : [];
    if (!list.length) return '';
    gqlCss();
    var items = list.slice().reverse().map(function (x, i) {
        var q = x.qdCuNguoi || {};
        var names = (x.appointedOfficers || []).map(function (o) { return o && (o.name || o.hoTen) ? (o.name || o.hoTen) : (typeof o === 'string' ? o : ''); }).filter(Boolean).join(', ') || x.officersText || '-';
        var fn = q.signedFile || q.fileName || '';
        var fh = fn ? gqlE(fn) + ' <a href="javascript:void(0)" title="' + gqlE(fn) + '" onclick="gqlOpenFile(this.title, false)">Xem file</a> | <a href="javascript:void(0)" title="' + gqlE(fn) + '" onclick="gqlOpenFile(this.title, true)">Tải file</a>' : '-';
        return '<div class="gql-grid" style="border-top:1px dashed #e2e8f0;"><div><b>Quyết định cử người giải quyết bồi thường:</b> ' + fh + '</div><div><b>Thời điểm giải quyết lại:</b> ' + gqlE(x.at || '-') + '</div>'
            + '<div class="full"><b>Cán bộ được cử giải quyết:</b> ' + gqlE(names) + '</div></div>';
    }).join('');
    return '<div class="gql-box" id="gqlCngOldBlock"><div class="gql-box-h"><i class="fa-solid fa-user-clock"></i> Quyết định cử người giải quyết bồi thường trước khi giải quyết lại (chỉ đọc)</div>' + items + '</div>';
}
function gqlShowAcc(id, on) { var h = gqlEl('accHead_' + id), it = h ? h.closest('.accordion-item') : null; if (it && on) it.style.display = 'block'; return it; }
function gqlDecorate(claim) {
    if (!claim) return;
    var redo = Array.isArray(claim.gqlLogs) && claim.gqlLogs.length;
    // 5. Quyết định: Quyết định đã bị hủy; vụ việc Chờ ban hành QĐ còn Quyết định đã hủy: nút Thêm quyết định
    var qd = gqlEl('quyetdinhReadBlock');
    if (qd) {
        var old = gqlEl('gqlQdHuyBlock'); if (old) old.remove();
        var addOld = gqlEl('gqlAddDec'); if (addOld) addOld.remove();
        if (GQL_HUY.indexOf(claim.decStatus || '') >= 0 && canonicalClaimStatus(claim.status) === 'Chờ ban hành QĐ' && !gqlHasActiveDec(claim) && !qd.querySelector('#btnCreateNewDecision')) {
            qd.insertAdjacentHTML('beforeend', '<div id="gqlAddDec" style="margin-top:12px; display:flex; align-items:center; gap:10px; padding:12px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:6px;"><span style="font-style:italic; color:#64748b; font-size:13px;">Chưa có Quyết định giải quyết bồi thường mới sau giải quyết lại.</span><button class="btn btn-primary btn-sm" onclick="openCreateDecisionForm()"><i class="fa-solid fa-plus"></i> Thêm quyết định</button></div>');
        }
        qd.insertAdjacentHTML('beforeend', gqlDecBlockHtml(claim));
    }
    // 1. Tiếp nhận hồ sơ: Quyết định cử người cũ
    var tn = gqlEl('accBody_thuly');
    if (tn) { var o2 = gqlEl('gqlCngOldBlock'); if (o2) o2.remove(); var h2 = gqlCngOldHtml(claim); if (h2) tn.insertAdjacentHTML('beforeend', h2); }
    if (!redo) return;
    // Giải quyết lại: hiển thị đủ khối của các bước đã thực hiện (chỉ đọc), kể cả bước sau bước hiện tại
    var hasXm = claim.xmTotalAmount !== undefined || (typeof getXmHistory === 'function' && getXmHistory(claim).length > 0);
    var hasTl = !!claim.negotiation || (claim.tlRounds || []).length > 0;
    var hasQd = !!claim.decStatus || (claim.qdHuyList || []).length > 0;
    gqlShowAcc('thuly', true);
    gqlShowAcc('xacminh', hasXm || ['Xác minh thiệt hại', 'Thương lượng', 'Chờ ban hành QĐ'].indexOf(canonicalClaimStatus(claim.status)) >= 0);
    gqlShowAcc('thuongluong', hasTl || ['Thương lượng', 'Chờ ban hành QĐ'].indexOf(canonicalClaimStatus(claim.status)) >= 0);
    gqlShowAcc('quyetdinh', hasQd);
    gqlShowAcc('thucthi', hasQd && !!(claim.totalNum && claim.totalNum > 0));
    var n = 1;
    document.querySelectorAll('#detailSubTabKqXl > .accordion-item').forEach(function (it) {
        if (it.style.display === 'none') return;
        var sp = it.querySelector('.accordion-header > span');
        if (sp) sp.textContent = (n++) + '. ' + sp.textContent.replace(/^\s*\d+\.\s*/, '');
    });
}
(function () {
    var o = window.renderAccordions;
    if (typeof o !== 'function') return;
    window.renderAccordions = function (claim) {
        var r = o.apply(this, arguments);
        try { gqlDecorate(claim); } catch (e) { if (window.console) console.warn('gql decorate', e); }
        return r;
    };
})();
// 6. Khối Chi trả tiền bồi thường: bản ghi theo Quyết định đã hủy - dòng phụ "QĐ đã bị hủy" (chữ đỏ) + cảnh báo đầu khối; bản ghi sinh theo Quyết định mới sau Giải quyết lại - dòng phụ nhãn
(function () {
    var o = window.gqKpdtThucThiHtml;
    if (typeof o !== 'function') return;
    window.gqKpdtThucThiHtml = function (claim) {
        var h = o.apply(this, arguments);
        try {
            var huy = gqlDecs().filter(function (d) { return d && d.claimCode === claim.code && GQL_HUY.indexOf(d.status) >= 0; });
            var ids = huy.map(function (d) { return d.id; });
            var props = []; try { props = (JSON.parse(localStorage.getItem('proposalsList') || '[]') || []).filter(function (p) { return p && p.ycbtCode === claim.code; }); } catch (e) { props = []; }
            var wrap = document.createElement('div'); wrap.innerHTML = h;
            var hit = [];
            wrap.querySelectorAll('#gqKpdtTable tbody tr').forEach(function (tr) {
                var code = (tr.cells[0] && tr.cells[0].textContent || '').trim();
                var p = props.find(function (x) { return x.code === code; });
                if (!p || !tr.cells[3]) return;
                if (p.decId && ids.indexOf(p.decId) >= 0) {
                    tr.cells[3].insertAdjacentHTML('beforeend', '<div class="gq-sub" style="color:#b91c1c !important; font-size:11.5px; margin-top:3px;">' + GQL_SUB + '</div>');
                    var d = huy.find(function (x) { return x.id === p.decId; });
                    if (d && hit.indexOf(d) < 0) hit.push(d);
                }
                if (p.kpqd && p.kpqd.kind === 'gql' && p.kpqd.label) tr.cells[3].insertAdjacentHTML('beforeend', '<div class="gq-sub" style="color:#1d4ed8 !important; font-size:11.5px; margin-top:3px;">' + gqlE(p.kpqd.label) + '</div>');
            });
            if (hit.length) {
                var nos = hit.map(function (d) { return d.decNo || '-'; }).join(', ');
                wrap.insertAdjacentHTML('afterbegin', '<div id="gqlKpHuyAlert" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:10px 12px; border-radius:6px; margin-bottom:12px; font-size:12.5px; display:flex; gap:8px; align-items:flex-start;"><i class="fa-solid fa-triangle-exclamation" style="margin-top:2px;"></i><span>Quyết định giải quyết bồi thường số <strong>' + gqlE(nos) + '</strong> đã bị hủy: bản ghi kinh phí theo Quyết định này giữ trạng thái, không thực hiện chi trả tiếp.</span></div>');
            }
            h = wrap.innerHTML;
        } catch (e) { /* mockup */ }
        return h;
    };
})();

// ---------- Dữ liệu mẫu ----------
function gqlNeg(items, date, place, by, savedAt) {
    return {
        participation: 'DONG_Y', decision: 'Đồng ý thương lượng', date: date, place: place, participants: [], claimantParticipants: [],
        items: items, payment: { method: 'Nhận qua chuyển khoản' }, otherRights: '', otherRequests: '', docs: [], savedAt: savedAt, savedBy: by
    };
}
var GQL_SEEDS = [
    // Chờ chi trả, QĐ 61/QĐ-STP bị hủy theo QĐ 72/QĐ-STP; KP-2026-561 Chờ chi trả đã chi 80.000.000 / 200.000.000 (bị chặn chi tiếp): thử Đình chỉ giải quyết / Giải quyết lại
    {
        id: 'GQL_S1', code: 'BT-2026-561', nyc: 'Đỗ Minh Quân', cardNo: '001086005561', status: 'Chờ chi trả', nguonHoSo: 'Dịch vụ công', hinhThucTiepNhan: 'Dịch vụ công',
        decNo: '61/QĐ-STP', decDate: '05/09/2026', cancelDecNo: '72/QĐ-STP', cancelDecDate: '25/09/2026', decAmount: 200000000,
        cancelReason: 'Kết quả xác minh thiệt hại làm căn cứ ban hành Quyết định chưa đầy đủ, cần xác minh lại giá trị tài sản bị xâm phạm.',
        th: [{ type: 1, calc: 'Tài sản bị cưỡng chế hư hỏng', val: 220000000, xmVal: 200000000, xmNote: 'Theo biên bản định giá' }], xm: 200000000,
        neg: [{ key: 'TS', label: 'Tài sản bị xâm phạm', proposed: 220000000, verified: 200000000, agreed: 200000000, status: 'Thành công', reason: '' }], negDate: '01/09/2026'
    },
    // Đã Giải quyết lại về Thương lượng (QĐ 62/QĐ-STP bị hủy theo QĐ 73/QĐ-STP); lần thương lượng 1 chỉ đọc; KP-2026-562 Hoàn thành 150.000.000
    {
        id: 'GQL_S2', code: 'BT-2026-562', nyc: 'Phan Thị Lụa', cardNo: '001190005562', status: 'Hoàn thành', redo: 'Thương lượng',
        decNo: '62/QĐ-STP', decDate: '02/08/2026', cancelDecNo: '73/QĐ-STP', cancelDecDate: '20/09/2026', decAmount: 150000000,
        cancelReason: 'Biên bản kết quả thương lượng có nội dung chưa đúng thỏa thuận về mức bồi thường thu nhập bị mất.',
        redoReason: 'Tổ chức thương lượng lại mức bồi thường thu nhập thực tế bị mất theo Quyết định hủy số 73/QĐ-STP',
        th: [{ type: 2, calc: 'Thu nhập thực tế bị mất 06 tháng', val: 160000000, xmVal: 150000000, xmNote: 'Theo bảng lương' }], xm: 150000000,
        neg: [{ key: 'TN', label: 'Thu nhập thực tế bị mất/giảm sút', proposed: 160000000, verified: 150000000, agreed: 150000000, status: 'Thành công', reason: '' }], negDate: '20/07/2026'
    },
    // Đã Giải quyết lại về Chờ ban hành QĐ (QĐ 64/QĐ-STP bị hủy theo 74/QĐ-STP); Tạm ứng KP-2026-564 đã chi 100.000.000 - thử QĐ mới nhỏ hơn số đã tạm ứng (Bảng B)
    {
        id: 'GQL_S4', code: 'BT-2026-564', nyc: 'Trương Văn Bình', cardNo: '001082005564', status: 'Chờ chi trả', redo: 'Chờ ban hành QĐ', advanceNum: 100000000,
        decNo: '64/QĐ-STP', decDate: '10/08/2026', cancelDecNo: '74/QĐ-STP', cancelDecDate: '15/09/2026', decAmount: 150000000,
        cancelReason: 'Kết quả xác minh thiệt hại tài sản chưa chính xác, mức bồi thường tại Quyết định cao hơn thiệt hại thực tế.',
        redoReason: 'Lập lại Quyết định giải quyết bồi thường theo kết quả xác minh bổ sung',
        th: [{ type: 1, calc: 'Tài sản bị xâm phạm', val: 150000000, xmVal: 80000000, xmNote: 'Theo kết quả xác minh bổ sung' }], xm: 80000000,
        neg: [{ key: 'TS', label: 'Tài sản bị xâm phạm', proposed: 150000000, verified: 80000000, agreed: 80000000, status: 'Thành công', reason: '' }], negDate: '05/08/2026'
    },
    // Chờ ban hành QĐ; dự thảo Quyết định GQBT QD-RT1 Bị trả lại tại phân hệ Quyết định GQBT (vụ việc giữ Chờ ban hành QĐ, không có QĐ còn hiệu lực khác)
    {
        id: 'GQL_S3', code: 'BT-2026-563', nyc: 'Kiều Văn Nghĩa', cardNo: '001077003563', status: 'Chờ ban hành QĐ', plain: true, decStatus: 'Bị trả lại',
        th: [{ type: 1, calc: 'Tài sản bị xâm phạm', val: 173000000, xmVal: 160000000, xmNote: 'Theo biên bản định giá' }], xm: 160000000,
        neg: [{ key: 'TS', label: 'Tài sản bị xâm phạm', proposed: 173000000, verified: 160000000, agreed: 155000000, status: 'Thành công', reason: '' }], negDate: '01/09/2026'
    }
];
// Lãnh đạo ký Quyết định GQBT / Quyết định hủy của dữ liệu mẫu: Giám đốc Sở Tư pháp Thành phố Hà Nội (BTNN_WF gdso_hn), cùng phân hệ Quyết định GQBT
var GQL_SIGNER = 'Phạm Quang Huy - Giám đốc Sở';
function gqlShiftSeed(c, delta) {
    if (!delta) return;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var p2 = function (n) { return String(n).padStart(2, '0'); };
    var fix = function (s) { return s.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g, function (m, d, mo, y) { if (+y < 2026) return m; var t = new Date(+y, +mo - 1, +d + delta); if (t > today) t = new Date(today); return p2(t.getDate()) + '/' + p2(t.getMonth() + 1) + '/' + t.getFullYear(); }); };
    var walk = function (o) { if (typeof o === 'string') return fix(o); if (Array.isArray(o)) return o.map(walk); if (o && typeof o === 'object') { Object.keys(o).forEach(function (k) { o[k] = walk(o[k]); }); return o; } return o; };
    ['date', 'qdCuNguoi', 'decDate', 'decPublishDate', 'cancelDecDate', 'negotiation', 'timeline', 'qdHuyList', 'tlRounds', 'gqlLogs'].forEach(function (k) { if (c[k] != null) c[k] = walk(c[k]); });
}
function gqlSeed() {
    if (typeof claimsList === 'undefined') return false;
    var tpl = claimsList.find(function (c) { return c && c.id === 'HS11'; }) || claimsList.find(function (c) { return c && c.id === 'HS1'; });
    if (!tpl) return false;
    var ver = ''; try { ver = localStorage.getItem(GQL_SEED_KEY) || ''; } catch (e) { /* mockup */ }
    var reset = ver !== GQL_SEED_VER, done = false;
    GQL_SEEDS.forEach(function (s) {
        var exist = claimsList.find(function (c) { return c && (c.code === s.code || c.id === s.id); });
        if (exist && !reset) return;
        if (exist) claimsList.splice(claimsList.indexOf(exist), 1);
        var c = JSON.parse(JSON.stringify(tpl));
        ['specialStatusLogs', 'dinhChi', 'hoanGiaiQuyet', 'tamDinhChi', 'tiepTucGiaiQuyet', 'dungGiaiQuyet', 'wfReturned', 'wfSynced', 'transferTo', 'qdHuyList', 'gqlLogs', 'tlRounds', 'cngOld', 'xmHistory', 'verifiedItems'].forEach(function (k) { delete c[k]; });
        var vv = 'VVBT-' + s.code.replace(/^BT-/, '');
        try { if (window.BTNN_WF && BTNN_WF.uniqueVuViecFor) vv = BTNN_WF.uniqueVuViecFor(s.code, vv) || vv; } catch (e) { /* mockup */ }
        Object.assign(c, {
            id: s.id, code: s.code, maVuViec: vv, nyc: s.nyc, nycName: s.nyc, cardNo: s.cardNo, date: '05/07/2026', status: s.status, agency: 'Sở Tư pháp Hà Nội',
            nguonHoSo: s.nguonHoSo || c.nguonHoSo || 'Tiếp nhận mới', hinhThucTiepNhan: s.hinhThucTiepNhan || 'Trực tiếp', gqlSeed: GQL_SEED_VER,
            // Danh sách cán bộ giải quyết bồi thường: Đỗ Văn Chung (tài khoản cv_hn1, Sở Tư pháp Thành phố Hà Nội), Nguyễn Văn Chuyên Viên
            appointedOfficers: [
                { userId: 'cv_hn1', name: 'Đỗ Văn Chung', position: 'Chuyên viên', unit: 'Sở Tư pháp Thành phố Hà Nội' },
                { userId: '', name: 'Nguyễn Văn Chuyên Viên', position: 'Chuyên viên', unit: 'Sở Tư pháp Thành phố Hà Nội' }
            ],
            qdCuNguoi: { status: 'Đã ban hành', signedFile: 'QD_cu_nguoi_giai_quyet_' + s.code + '_da_ky.pdf', issuedAt: '10/07/2026',
                officers: [{ name: 'Đỗ Văn Chung', position: 'Chuyên viên', unit: 'Sở Tư pháp Thành phố Hà Nội' }, { name: 'Nguyễn Văn Chuyên Viên', position: 'Chuyên viên', unit: 'Sở Tư pháp Thành phố Hà Nội' }] },
            totalNum: s.th.reduce(function (a, x) { return a + x.val; }, 0), advanceNum: s.advanceNum || 0, thietHaiList: s.th, xmTotalAmount: s.xm,
            decStatus: 'Hủy quyết định', decNo: s.decNo, decDate: s.decDate, decPublishDate: s.decDate, decAmount: s.decAmount || s.xm, decSigner: GQL_SIGNER, decPosition: 'Giám đốc Sở',
            cancelDecNo: s.cancelDecNo, cancelDecDate: s.cancelDecDate, cancelSigner: GQL_SIGNER, cancelReason: s.cancelReason,
            negotiation: gqlNeg(s.neg, s.negDate, 'Trụ sở Sở Tư pháp Hà Nội', 'Nguyễn Văn Chuyên Viên', s.negDate + ' 10:00'),
            slaStatus: 'normal', slaText: '', specialStatusLogs: [],
            timeline: [
                { title: 'Tiếp nhận hồ sơ', date: '05/07/2026', desc: 'Tiếp nhận văn bản yêu cầu bồi thường.', status: 'completed' },
                { title: 'Cử người giải quyết bồi thường', date: '10/07/2026', desc: 'Ban hành Quyết định cử người giải quyết bồi thường.', status: 'completed' },
                { title: 'Xác minh thiệt hại', date: '15/07/2026', desc: 'Hoàn thành xác minh thiệt hại. Tổng Mức xác minh ' + s.xm.toLocaleString('vi-VN') + ' đồng.', status: 'completed' },
                { title: 'Thương lượng bồi thường', date: s.negDate, desc: 'Đồng ý thương lượng. Hồ sơ chuyển sang [Chờ ban hành QĐ].', status: 'completed' },
                { title: 'Ban hành Quyết định giải quyết bồi thường', date: s.decDate, desc: 'Quyết định số ' + s.decNo + '. Hồ sơ chuyển sang [Chờ chi trả].', status: 'completed' },
                { title: 'Hủy Quyết định giải quyết bồi thường', date: s.cancelDecDate, desc: 'Quyết định số ' + s.decNo + ' bị hủy theo Quyết định số ' + s.cancelDecNo + '. Vụ việc giữ trạng thái [' + s.status + '].', status: 'completed' }
            ]
        });
        if (s.plain) {
            // Chưa có Quyết định ban hành: bỏ thông tin Quyết định / Quyết định hủy, giữ tiến trình đến Chờ ban hành QĐ
            ['decNo', 'decDate', 'decPublishDate', 'decAmount', 'decSigner', 'decEffectiveDate', 'decPosition', 'decContent', 'cancelDecNo', 'cancelDecDate', 'cancelSigner', 'cancelReason'].forEach(function (k) { delete c[k]; });
            c.decStatus = s.decStatus || '';
            c.timeline = c.timeline.slice(0, 4);
        }
        if (s.redo) {
            var info = gqlCancelInfo(c);
            c.qdHuyList = [JSON.parse(JSON.stringify(info))];
            c.tlRounds = [Object.assign(JSON.parse(JSON.stringify(c.negotiation)), { lan: 1, archivedAt: '09:00 22/09/2026' })];
            c.negotiation = null;
            c.gqlLogs = [{ at: '09:00 22/09/2026', by: 'Nguyễn Văn Chuyên Viên', step: s.redo, reason: s.redoReason, prevStatus: s.status, canCu: { cancelDecNo: s.cancelDecNo, cancelDecDate: s.cancelDecDate, cancelReason: s.cancelReason, decNo: s.decNo } }];
            c.timeline.push({ title: GQL_ACTION, date: '22/09/2026', desc: 'Bước giải quyết lại: ' + s.redo + '. Lý do: ' + s.redoReason + '. Căn cứ: Quyết định hủy số ' + s.cancelDecNo + ' ngày ' + s.cancelDecDate + '. Hồ sơ chuyển từ [' + s.status + '] sang trạng thái [' + s.redo + '].', status: 'completed' });
            c.status = s.redo;
        }
        // Dời ngày theo cùng độ dời của dữ liệu mẫu (btnn_luong_xu_ly.js shiftSeedDates; bản sao mẫu HS11 giữ _sdShift nên không dời lại): khớp Ngày QĐ với Quyết định GQBT / Kinh phí
        gqlShiftSeed(c, Number(tpl._sdShift) || 0);
        claimsList.unshift(c);
        done = true;
    });
    try { localStorage.setItem(GQL_SEED_KEY, GQL_SEED_VER); } catch (e) { /* mockup */ }
    return done;
}
(function () {
    var run = function () {
        var seeded = false;
        try { seeded = gqlSeed(); } catch (e) { if (window.console) console.error(e); }
        if (seeded) {
            try { if (window.LTH_DVC) LTH_DVC.snap(); } catch (e) { /* mockup */ }
            try { saveClaimsToLocal(); } catch (e) { /* mockup */ }
            try { renderClaimsTable(); } catch (e) { /* mockup */ }
        }
    };
    if (document.readyState === 'complete') setTimeout(run, 0); else window.addEventListener('load', function () { setTimeout(run, 0); });
})();
