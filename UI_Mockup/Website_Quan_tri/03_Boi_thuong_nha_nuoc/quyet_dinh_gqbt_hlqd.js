/* [hlqd] Cập nhật hiệu lực Quyết định giải quyết bồi thường (quyet_dinh_giai_quyet_boi_thuong.html)
 * - Trạng thái sau ban hành: Đã ban hành -> Có hiệu lực / Không có hiệu lực (Cán bộ xử lý cập nhật tại popup "Cập nhật hiệu lực QĐ").
 *   + Lưu: d.status giữ 'Đã ban hành' (dùng chung cho Sửa chữa, bổ sung QĐ / Hủy QĐ / module khác), d.hieuLuc = '' | 'Có hiệu lực' | 'Không có hiệu lực';
 *     trạng thái hiển thị = qdhlState(d). Sửa chữa, bổ sung QĐ / Rút yêu cầu: quay về đúng trạng thái trước (d.hieuLuc giữ nguyên).
 *   + Đã ban hành (chưa cập nhật): tab Chờ xử lý; Có hiệu lực / Không có hiệu lực: tab Đã xử lý (vai trò Cán bộ xử lý).
 * - Popup: Trạng thái hiện tại | Trạng thái cập nhật (Đã ban hành: Có hiệu lực / Không có hiệu lực; Có hiệu lực: chỉ Không có hiệu lực)
 *   | Lý do cập nhật trạng thái* (chỉ hiển thị, bắt buộc khi chọn Không có hiệu lực) | Tài liệu đính kèm (bắt buộc tối thiểu 01 dòng khi Không có hiệu lực).
 * - Có hiệu lực: lúc này mới tạo 01 bản ghi Chi trả tiền bồi thường "Chờ thông báo chi trả" (hàng đợi 'btnn_kptb_qd_issued_v1');
 *   ban hành (Ký duyệt cấp cuối / Ký ngoài) chỉ đánh dấu d.qdhlPending, không tạo bản ghi kinh phí.
 * - Không có hiệu lực: trạng thái cuối; danh sách hiển thị các thao tác khóa mờ, màn chi tiết chỉ còn Đóng; gọi trực tiếp thao tác -> cảnh báo, không xử lý
 *   (qdhlGuard). Có hiệu lực -> Không có hiệu lực chỉ khi khoản
 *   chi trả chưa chi trả (chưa Hoàn thành / Trả lại ngân sách nhà nước / chưa có số tiền chi trả thực tế); bản ghi kinh phí giữ nguyên, bị chặn chi trả.
 * - Dữ liệu cũ (khóa 'btnn_qdhl_model_v2'): Quyết định đã ban hành chưa có hiệu lực -> có bản ghi Chi trả tiền bồi thường / hàng đợi: Có hiệu lực;
 *   chưa có: Đã ban hành (chờ cập nhật). Dữ liệu mẫu QD-HL1..4 thay theo bộ mẫu mới (khóa 'btnn_qdhl_seed_v2').
 * - Kho dùng chung 'btnn_qd_hieu_luc_v1' (màn Kinh phí đọc để chặn chi trả / loại Quyết định chưa Có hiệu lực khỏi Tạo thông báo chi trả).
 * Dùng các hàm/hằng của trang chính: W, esc, ST, KIND_QD, decisions, getDec, seedDec, seedItems, saveDecisions, addDecHistory, dtlItem,
 * statusBadge, statusCell, rowActions, openDetail, filteredDecisions, qdInTab, updateQdStatusOptions, renderDecTable, qdRole, markInvalid,
 * kptbNotifyIssued, showConfirmModal, showToast, openModal, closeModal
 */
var QDHL_ON = 'Có hiệu lực';
var QDHL_OFF = 'Không có hiệu lực';
var QDHL_MAP_KEY = 'btnn_qd_hieu_luc_v1';
var QDHL_SEED_KEY = 'btnn_qdhl_seed_v2';
var QDHL_MODEL_KEY = 'btnn_qdhl_model_v2';
var QDHL_QUEUE_KEY = 'btnn_kptb_qd_issued_v1';
var QDHL_PAY_TYPE = 'Chi trả tiền bồi thường';
var QDHL_SEED_IDS = ['QD-HL1', 'QD-HL2', 'QD-HL3', 'QD-HL4'];
var qdhlCtx = null;
var qdhlOrigNotify = null;

function qdhlRead(key, fb) { try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
function qdhlWrite(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
// Trạng thái hiển thị: Quyết định đã ban hành -> Đã ban hành (chưa cập nhật) / Có hiệu lực / Không có hiệu lực
function qdhlState(d) {
    if (!d) return '';
    if (d.status !== ST.DA_BH) return d.status;
    return d.hieuLuc === QDHL_OFF ? QDHL_OFF : (d.hieuLuc === QDHL_ON ? QDHL_ON : ST.DA_BH);
}
// Bản ghi Chi trả tiền bồi thường của Quyết định (module Kinh phí, kho 'proposalsList')
function qdhlPayRec(d) {
    var list = qdhlRead('proposalsList', []);
    if (!Array.isArray(list) || !d) return null;
    var pay = list.filter(function (p) { return p && p.type === QDHL_PAY_TYPE; });
    return pay.find(function (p) { return p.decId === d.id; }) || pay.find(function (p) { return !p.decId && p.ycbtCode === d.claimCode; }) || null;
}
function qdhlQueued(d) { var q = qdhlRead(QDHL_QUEUE_KEY, []); return Array.isArray(q) && q.some(function (x) { return x && x.decId === d.id; }); }
// Đã chi trả: bản ghi kinh phí Hoàn thành / Trả lại ngân sách nhà nước hoặc đã có số tiền chi trả thực tế
var QDHL_RETURNED = ['Trả lại ngân sách nhà nước', 'Đã sung quỹ', 'Sung quỹ nhà nước'];
function qdhlReturned(d) { var p = qdhlPayRec(d); return !!p && QDHL_RETURNED.indexOf(p.status) >= 0; }
function qdhlPaid(d) {
    var p = qdhlPayRec(d);
    if (p) return p.status === 'Hoàn thành' || QDHL_RETURNED.indexOf(p.status) >= 0 || Number(p.payoutAmountReal) > 0;
    return !!(d && d.qdhlPaidSeed);
}
function qdhlCan(d) {
    if (!d || qdRole() === 'lanh-dao' || d.status !== ST.DA_BH) return false;
    var s = qdhlState(d);
    if (s === QDHL_OFF) return false;
    return !qdhlPaid(d);
}
function qdhlOffReason(d) {
    var s = qdhlState(d);
    if (s === QDHL_OFF) return 'Quyết định Không có hiệu lực, không cho phép cập nhật lại trạng thái';
    if (d && d.status === ST.DA_BH && qdhlReturned(d)) return 'Khoản chi trả của Quyết định đã Trả lại ngân sách nhà nước, không cho phép cập nhật hiệu lực';
    if (d && d.status === ST.DA_BH && qdhlPaid(d)) return 'Quyết định đã hoàn thành chi trả, không cho phép cập nhật hiệu lực';
    return 'chỉ thực hiện với Quyết định Đã ban hành / Có hiệu lực';
}
// Kho dùng chung: { [Mã Quyết định]: { claimCode, decNo, status, hieuLuc, pending, reason, at } } - màn Kinh phí đọc
function qdhlSyncMap() {
    var map = qdhlRead(QDHL_MAP_KEY, {}) || {};
    var ch = false;
    (decisions || []).forEach(function (d) {
        if (!d || !d.id || (d.status !== ST.DA_BH && !d.hieuLuc && !map[d.id])) return;
        var last = (d.hieuLucHistory || [])[(d.hieuLucHistory || []).length - 1] || {};
        var v = { claimCode: d.claimCode, decNo: d.decNo || '', status: d.status, hieuLuc: d.hieuLuc || '', pending: !!d.qdhlPending && !d.hieuLuc, reason: last.reason || '', at: last.at || '' };
        if (JSON.stringify(map[d.id]) !== JSON.stringify(v)) { map[d.id] = v; ch = true; }
    });
    if (ch) qdhlWrite(QDHL_MAP_KEY, map);
}

function qdhlCss() {
    if (document.getElementById('qdhlCss')) return;
    var st = document.createElement('style');
    st.id = 'qdhlCss';
    st.textContent = [
        '#qdhlModal .qd-modal-box { width: 820px; }',
        '#qdhlModal .qdhl-info { background: #f8fafc; border: 1px solid var(--border-color); border-left: 4px solid var(--primary-light); border-radius: 6px; padding: 10px 14px; margin-bottom: 16px; font-size: 13px; line-height: 1.7; }',
        '#qdhlModal .qdhl-row { margin-bottom: 16px; }',
        '#qdhlModal .qdhl-radios { display: flex; gap: 24px; flex-wrap: wrap; padding: 6px 0; }',
        '#qdhlModal .qdhl-radios label { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 13.5px; }',
        '#qdhlModal .qdhl-radios.is-invalid { outline: 1px solid #DC2626; outline-offset: 4px; border-radius: 4px; }',
        '#qdhlModal #qdhlReason { font-family: inherit; resize: vertical; }',
        '#qdhlModal .qdhl-count { font-size: 12px; color: var(--text-muted); text-align: right; margin-top: 2px; }',
        '.qdhl-badge-bh { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }',
        '.qdhl-badge-on { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }',
        '.qdhl-badge-off { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }',
        '#qdDetailBody table.qdhl-hist th, #qdDetailBody table.qdhl-hist td, #qdDetailBody table.qdhl-hist td.admin-actions-cell, #qdDetailBody table.qdhl-hist th.admin-actions-cell { text-align: left !important; vertical-align: top; }',
        '.qdhl-doc { display: flex; align-items: center; gap: 6px; } .qdhl-doc + .qdhl-doc { margin-top: 4px; }',
        '.qdhl-doc a { color: var(--secondary-color); text-decoration: underline; cursor: pointer; overflow-wrap: anywhere; }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
}
function qdhlBadge(v) {
    var cls = v === QDHL_OFF ? 'qdhl-badge-off' : (v === QDHL_ON ? 'qdhl-badge-on' : 'qdhl-badge-bh');
    return '<span class="badge ' + cls + '">' + esc(v || ST.DA_BH) + '</span>';
}

// ---------------- Popup Cập nhật hiệu lực ----------------
function qdhlEnsureModal() {
    if (document.getElementById('qdhlModal')) return;
    var m = document.createElement('div');
    m.className = 'qd-modal';
    m.id = 'qdhlModal';
    m.innerHTML = '<div class="qd-modal-box">'
        + '<div class="qd-modal-head"><span><i class="fa-solid fa-file-circle-check"></i> Cập nhật hiệu lực Quyết định giải quyết bồi thường</span><button type="button" class="qd-close" onclick="qdhlClose()" aria-label="Đóng">&times;</button></div>'
        + '<div class="qd-modal-body">'
        + '<div class="qdhl-info" id="qdhlInfo"></div>'
        + '<div class="qdhl-row"><span class="form-label">Trạng thái hiện tại</span><div id="qdhlCur" style="padding:4px 0;"></div></div>'
        + '<div class="qdhl-row form-group"><span class="form-label">Trạng thái cập nhật<span class="required">*</span></span>'
        + '<div class="qdhl-radios" id="qdhlRadios" tabindex="-1">'
        + '<label id="qdhlOptOn"><input type="radio" name="qdhlVal" value="' + QDHL_ON + '" onchange="qdhlOnChange()"> ' + QDHL_ON + '</label>'
        + '<label id="qdhlOptOff"><input type="radio" name="qdhlVal" value="' + QDHL_OFF + '" onchange="qdhlOnChange()"> ' + QDHL_OFF + '</label>'
        + '</div><div class="field-error" id="qdhlValErr"></div></div>'
        + '<div class="qdhl-row form-group" id="qdhlReasonRow" style="display:none;"><span class="form-label">Lý do cập nhật trạng thái<span class="required">*</span></span>'
        + '<textarea class="form-control" id="qdhlReason" rows="3" maxlength="1000" placeholder="Nhập lý do cập nhật trạng thái" oninput="qdhlCount()"></textarea>'
        + '<div class="qdhl-count" id="qdhlCount">0/1000</div></div>'
        + '<div class="qdhl-row" id="qdhlTlkt"></div>'
        + '</div>'
        + '<div class="qd-modal-foot"><button type="button" class="btn btn-secondary" onclick="qdhlClose()">Hủy bỏ</button><button type="button" class="btn btn-primary" id="qdhlSave" onclick="qdhlSubmit()"><i class="fa-solid fa-floppy-disk"></i> Lưu</button></div>'
        + '</div>';
    document.body.appendChild(m);
}
function qdhlSel() { var r = document.querySelector('input[name="qdhlVal"]:checked'); return r ? r.value : ''; }
function qdhlCount() { var t = document.getElementById('qdhlReason'); var c = document.getElementById('qdhlCount'); if (t && c) c.innerText = t.value.length + '/1000'; }
function qdhlMountDocs(rows) {
    if (typeof tlktMount !== 'function') return;
    tlktMount('qdhl', 'qdhlTlkt', { required: qdhlSel() === QDHL_OFF, rows: rows || [], secClass: '', titleClass: 'form-label', noLeader: true, title: 'Tài liệu đính kèm' });
}
function qdhlSetValErr(on, msg) {
    var e = document.getElementById('qdhlValErr'), g = document.getElementById('qdhlRadios');
    if (e) { e.textContent = msg || ''; e.style.display = on ? 'block' : 'none'; }
    if (g) g.classList.toggle('is-invalid', !!on);
}
// Lý do cập nhật trạng thái: chỉ hiển thị (bắt buộc) khi chọn Không có hiệu lực
function qdhlToggleReason() {
    var off = qdhlSel() === QDHL_OFF;
    var row = document.getElementById('qdhlReasonRow');
    if (row) row.style.display = off ? '' : 'none';
    var t = document.getElementById('qdhlReason');
    if (!off && t && typeof markInvalid === 'function') markInvalid(t, false);
}
// Đổi lựa chọn: Lý do + Tài liệu đính kèm bắt buộc khi chọn Không có hiệu lực; giữ các dòng tài liệu đã nhập
function qdhlOnChange() {
    qdhlSetValErr(false);
    qdhlToggleReason();
    qdhlMountDocs(typeof tlktGet === 'function' ? tlktGet('qdhl') : []);
}
function qdhlOpen(id) {
    var d = getDec(id);
    if (!d) return;
    if (!qdhlCan(d)) { showToast('Cập nhật hiệu lực QĐ: ' + qdhlOffReason(d) + '.', 'error'); return; }
    qdhlCss();
    qdhlEnsureModal();
    qdhlCtx = { id: id };
    var cur = qdhlState(d);
    document.getElementById('qdhlInfo').innerHTML = 'Quyết định số <b>' + esc(d.decNo || '-') + '</b> ngày ' + esc(d.issueDate || '-') + ' - ' + esc(W.unitName ? (d.unitId ? W.unitName(d.unitId) : (d.agency || '')) : '')
        + '<br>Mã hồ sơ GQBT: <b>' + esc(d.claimCode) + '</b> • Người yêu cầu: ' + esc(d.nycName || '');
    document.getElementById('qdhlCur').innerHTML = qdhlBadge(cur);
    // Đã ban hành: mặc định chọn Có hiệu lực; Có hiệu lực: chỉ còn (và mặc định chọn) Không có hiệu lực
    document.getElementById('qdhlOptOn').style.display = cur === QDHL_ON ? 'none' : '';
    var def = cur === QDHL_ON ? QDHL_OFF : QDHL_ON;
    Array.prototype.forEach.call(document.querySelectorAll('input[name="qdhlVal"]'), function (r) { r.checked = r.value === def; });
    var t = document.getElementById('qdhlReason');
    t.value = '';
    if (typeof markInvalid === 'function') markInvalid(t, false);
    qdhlCount();
    qdhlSetValErr(false);
    qdhlToggleReason();
    qdhlMountDocs([]);
    openModal('qdhlModal');
}
function qdhlClose() { closeModal('qdhlModal'); qdhlCtx = null; }
function qdhlSubmit() {
    var d = qdhlCtx && getDec(qdhlCtx.id);
    if (!d) return;
    // Trạng thái / khoản chi trả thay đổi tại thời điểm lưu: không cho cập nhật
    if (!qdhlCan(d)) { showToast('Cập nhật hiệu lực QĐ: ' + qdhlOffReason(d) + '.', 'error'); return; }
    var cur = qdhlState(d), to = qdhlSel();
    var first = null;
    if (!to) { qdhlSetValErr(true, 'Đây là trường bắt buộc'); first = document.getElementById('qdhlRadios'); }
    else if (to === cur) { qdhlSetValErr(true, 'Trạng thái cập nhật phải khác Trạng thái hiện tại.'); first = document.getElementById('qdhlRadios'); }
    else qdhlSetValErr(false);
    // Lý do cập nhật trạng thái: bắt buộc khi chọn Không có hiệu lực
    var t = document.getElementById('qdhlReason');
    var reason = to === QDHL_OFF ? String(t.value || '').trim() : '';
    if (to === QDHL_OFF) { markInvalid(t, !reason); if (!reason) first = first || t; }
    // Tài liệu đính kèm: bắt buộc tối thiểu 01 dòng khi chọn Không có hiệu lực
    var docsOk = typeof tlktValidate === 'function' ? tlktValidate('qdhl') : true;
    if (first) { try { first.focus(); } catch (e) { /* bỏ qua */ } return; }
    if (!docsOk) return;
    var docs = typeof tlktGet === 'function' ? tlktGet('qdhl') : [];
    var msg = 'Cập nhật Quyết định số ' + (d.decNo || '-') + ' từ [' + cur + '] sang [' + to + ']?';
    if (to === QDHL_ON) msg += ' Hệ thống tạo bản ghi Chi trả tiền bồi thường trạng thái Chờ thông báo chi trả.';
    else msg += ' Sau khi cập nhật, không cho phép cập nhật lại trạng thái Quyết định.' + (qdhlPayRec(d) || qdhlQueued(d) ? ' Khoản chi trả tiền bồi thường của Quyết định không được Trình thông báo chi trả / Cập nhật chi trả.' : '');
    showConfirmModal(msg, function () { qdhlSave(d.id, cur, to, reason, docs); }, 'Xác nhận cập nhật hiệu lực', 'Đồng ý', false);
}
function qdhlSave(id, from, to, reason, docs) {
    var d = getDec(id); if (!d) return;
    var me = W.getCurrentUserId(), at = W.nowText();
    d.hieuLuc = to;
    delete d.qdhlPending;
    (d.hieuLucHistory = d.hieuLucHistory || []).push({ at: at, userId: me, userName: W.userName(me), from: from, to: to, reason: reason || '', docs: docs || [] });
    var names = (docs || []).map(function (x) { return (x.file && x.file.name) || x.name; }).filter(Boolean);
    addDecHistory(d, 'Cập nhật hiệu lực QĐ', 'Quyết định chuyển từ [' + from + '] sang [' + to + '].' + (reason ? ' Lý do cập nhật trạng thái: ' + reason : '') + (names.length ? ' Tài liệu đính kèm: ' + names.join(', ') + '.' : ''));
    // Có hiệu lực: tạo 01 bản ghi Chi trả tiền bồi thường "Chờ thông báo chi trả" (chống trùng theo Quyết định)
    var created = false;
    if (to === QDHL_ON && typeof qdhlOrigNotify === 'function' && !qdhlPayRec(d) && !qdhlQueued(d)) {
        qdhlOrigNotify(d);
        created = true;
        addDecHistory(d, 'Tạo bản ghi Chi trả tiền bồi thường', 'Bản ghi Chi trả tiền bồi thường trạng thái [Chờ thông báo chi trả].');
    }
    d.updatedAt = new Date().toISOString();
    saveDecisions();
    qdhlSyncMap();
    closeModal('qdhlModal');
    qdhlCtx = null;
    showToast('Đã cập nhật trạng thái Quyết định: ' + to + '.' + (created ? ' Đã tạo bản ghi Chi trả tiền bồi thường trạng thái Chờ thông báo chi trả.' : ''), 'success');
    var panel = document.getElementById('qdDetailPanel');
    if (panel && panel.style.display === 'flex') openDetail(id); else renderDecTable();
}

// ---------------- Màn chi tiết: khối Lịch sử cập nhật hiệu lực + Footer ----------------
function qdhlDoc(id, h, i) {
    var d = getDec(id); var x = d && ((d.hieuLucHistory || [])[h] || {}).docs; x = x && x[i];
    if (!x) return;
    var f = x.file;
    if (f && f.id && typeof tlktBlob === 'function' && tlktBlob(f.id) && typeof tlktOpenFile === 'function') { tlktOpenFile(f); return; }
    showToast('Giả lập mở tệp: ' + ((f && f.name) || x.name), 'info');
}
function qdhlHistHtml(d) {
    var list = d.hieuLucHistory || [];
    if (!list.length) return '';
    var rows = list.map(function (h, i) {
        var docs = (h.docs || []).map(function (x, j) {
            var n = (x.file && x.file.name) || x.name;
            return '<div class="qdhl-doc"><i class="fa-solid fa-paperclip" style="color:#64748b;"></i><a onclick="qdhlDoc(\'' + d.id + '\',' + i + ',' + j + ')" title="Xem file">' + esc(x.name || n) + '</a></div>';
        }).join('') || '-';
        return '<tr><td>' + (i + 1) + '</td><td>' + esc(h.at) + '</td><td>' + esc(h.userName || W.userName(h.userId)) + '</td><td>' + qdhlBadge(h.from) + '</td><td>' + qdhlBadge(h.to) + '</td><td>' + (h.reason ? esc(h.reason) : '-') + '</td><td>' + docs + '</td></tr>';
    }).join('');
    return '<div class="dtl-card" id="qdhlHistCard"><div class="dtl-card-head"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử cập nhật hiệu lực</div><div class="dtl-card-body">'
        + '<div class="table-container"><table class="custom-table qdhl-hist" style="min-width:760px;"><thead><tr><th style="width:48px;">STT</th><th style="width:130px;">Thời điểm</th><th style="width:170px;">Người cập nhật</th><th style="width:130px;">Trạng thái trước</th><th style="width:130px;">Trạng thái sau</th><th>Lý do cập nhật trạng thái</th><th style="width:220px;">Tài liệu đính kèm</th></tr></thead><tbody>' + rows + '</tbody></table></div>'
        + '</div></div>';
}
function qdhlDecorateDetail(id) {
    var d = getDec(id); if (!d) return;
    qdhlCss();
    var grid = document.getElementById('ctqdInfoGrid');
    var card = grid && grid.closest('.dtl-card');
    var hist = qdhlHistHtml(d);
    if (card && hist && !document.getElementById('qdhlHistCard')) card.insertAdjacentHTML('afterend', hist);
    var foot = document.getElementById('qdDetailFooter');
    // Không có hiệu lực: không hiển thị thao tác, chỉ giữ nút Đóng (nút cuối)
    if (foot && qdhlState(d) === QDHL_OFF) {
        Array.prototype.slice.call(foot.children, 0, -1).forEach(function (b) { b.remove(); });
        return;
    }
    if (foot && qdhlCan(d) && !document.getElementById('qdhlFootBtn')) {
        var html = '<button class="btn btn-secondary" id="qdhlFootBtn" onclick="qdhlOpen(\'' + d.id + '\')"><i class="fa-solid fa-file-circle-check"></i> Cập nhật hiệu lực QĐ</button>';
        var last = foot.lastElementChild;
        if (last) last.insertAdjacentHTML('beforebegin', html); else foot.insertAdjacentHTML('beforeend', html);
    }
}

// ---------------- Dữ liệu mẫu ----------------
function qdhlDoc0(name, file, size) { return { name: name, file: { id: 'qdhl_seed_' + file.replace(/\W+/g, '_'), name: file, size: size } }; }
function qdhlH(at, uid, from, to, reason, docs) { return { at: at, userId: uid, userName: W.userName(uid), from: from, to: to, reason: reason || '', docs: docs || [] }; }
function qdhlLog(at, uid, from, to, reason, docs) {
    var names = (docs || []).map(function (x) { return x.file.name; });
    return { at: at, userId: uid, userName: W.userName(uid), action: 'Cập nhật hiệu lực QĐ', note: 'Quyết định chuyển từ [' + from + '] sang [' + to + '].' + (reason ? ' Lý do cập nhật trạng thái: ' + reason : '') + (names.length ? ' Tài liệu đính kèm: ' + names.join(', ') + '.' : '') };
}
function qdhlSeedDefs() {
    var BH = ST.DA_BH;
    var r1 = 'Người yêu cầu bồi thường đã khởi kiện yêu cầu Tòa án giải quyết yêu cầu bồi thường trong thời hạn; Quyết định chưa phát sinh hiệu lực thi hành.';
    var r4 = 'Cơ quan có thẩm quyền yêu cầu tạm dừng thi hành Quyết định để xem xét lại.';
    var d1 = [qdhlDoc0('Thông báo thụ lý vụ án của Tòa án', 'Thong_bao_thu_ly_vu_an_BT-2026-191.pdf', 245760)];
    var d4 = [qdhlDoc0('Văn bản yêu cầu tạm dừng thi hành', 'Van_ban_tam_dung_BT-2026-194.pdf', 204800)];
    return [
        // Có hiệu lực -> Không có hiệu lực; khoản chi trả Chờ thông báo chi trả (bị chặn)
        seedDec({ id: 'QD-HL1', claimCode: 'BT-2026-191', nycName: 'Trần Thị Thu Hương', nycAddress: 'Số 18 phố Kim Mã, Phường Giảng Võ, Thành phố Hà Nội', unitId: 'STP-HN', leaderId: 'tp_hctp_hn', approvedBy: 'gdso_hn', approvedAt: '10:00 05/10/2026',
            status: BH, decNo: '41/QĐ-STP', issueDate: '05/10/2026', signedFile: 'QD_GQBT_BT-2026-191_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT',
            items: seedItems([['Thu nhập thực tế bị mất/giảm sút', 200000000, 180000000, 180000000]]), recipient: { name: 'Trần Thị Thu Hương', idNo: '001188005511', account: '0021001122334', bank: 'Vietcombank', branch: 'Chi nhánh Ba Đình' },
            hieuLuc: QDHL_OFF,
            hieuLucHistory: [qdhlH('08:30 06/10/2026', 'cv_hn1', BH, QDHL_ON), qdhlH('09:30 20/10/2026', 'cv_hn1', QDHL_ON, QDHL_OFF, r1, d1)],
            history: [
                { at: '10:00 05/10/2026', userId: 'gdso_hn', userName: W.userName('gdso_hn'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 41/QĐ-STP ngày 05/10/2026.' },
                qdhlLog('08:30 06/10/2026', 'cv_hn1', BH, QDHL_ON),
                { at: '08:30 06/10/2026', userId: 'cv_hn1', userName: W.userName('cv_hn1'), action: 'Tạo bản ghi Chi trả tiền bồi thường', note: 'Bản ghi Chi trả tiền bồi thường trạng thái [Chờ thông báo chi trả].' },
                qdhlLog('09:30 20/10/2026', 'cv_hn1', QDHL_ON, QDHL_OFF, r1, d1)
            ], createdBy: 'cv_hn1', updatedAt: '2026-10-20T09:30:00.000Z' }),
        // Có hiệu lực; khoản chi trả Chờ thông báo chi trả (còn cập nhật được sang Không có hiệu lực)
        seedDec({ id: 'QD-HL2', claimCode: 'BT-2026-192', nycName: 'Nguyễn Văn Phúc', nycAddress: 'Số 7 phố Nguyễn Chí Thanh, Phường Láng, Thành phố Hà Nội', unitId: 'BTP-01', leaderId: 'tpbt', approvedBy: 'cuctruong', approvedAt: '15:00 01/10/2026',
            status: BH, decNo: '33/QĐ-BTP', issueDate: '01/10/2026', signedFile: 'QD_GQBT_BT-2026-192_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT',
            items: seedItems([['Tài sản bị xâm phạm', 320000000, 300000000, 300000000]]), recipient: { name: 'Nguyễn Văn Phúc', idNo: '001079008899', account: '1903366778899', bank: 'Techcombank', branch: 'Chi nhánh Đống Đa' },
            hieuLuc: QDHL_ON,
            hieuLucHistory: [qdhlH('09:00 16/10/2026', 'canbonv', BH, QDHL_ON)],
            history: [
                { at: '15:00 01/10/2026', userId: 'cuctruong', userName: W.userName('cuctruong'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 33/QĐ-BTP ngày 01/10/2026.' },
                qdhlLog('09:00 16/10/2026', 'canbonv', BH, QDHL_ON),
                { at: '09:00 16/10/2026', userId: 'canbonv', userName: W.userName('canbonv'), action: 'Tạo bản ghi Chi trả tiền bồi thường', note: 'Bản ghi Chi trả tiền bồi thường trạng thái [Chờ thông báo chi trả].' }
            ], createdBy: 'canbonv', updatedAt: '2026-10-16T09:00:00.000Z' }),
        // Có hiệu lực, đã Hoàn thành chi trả: không còn cập nhật được
        seedDec({ id: 'QD-HL3', claimCode: 'BT-2026-193', nycName: 'Lê Minh Đức', nycAddress: 'Số 25 phố Lò Đúc, Phường Hai Bà Trưng, Thành phố Hà Nội', unitId: 'STP-HN', leaderId: 'tp_hctp_hn', approvedBy: 'gdso_hn', approvedAt: '14:00 15/09/2026',
            status: BH, decNo: '38/QĐ-STP', issueDate: '15/09/2026', signedFile: 'QD_GQBT_BT-2026-193_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT', qdhlPaidSeed: true,
            items: seedItems([['Tài sản bị xâm phạm', 130000000, 120000000, 120000000]]), recipient: { name: 'Lê Minh Đức', idNo: '001085006677', account: '0451000334455', bank: 'Vietinbank', branch: 'Chi nhánh Hai Bà Trưng' },
            hieuLuc: QDHL_ON,
            hieuLucHistory: [qdhlH('08:00 16/09/2026', 'cv_hn1', BH, QDHL_ON)],
            history: [
                { at: '14:00 15/09/2026', userId: 'gdso_hn', userName: W.userName('gdso_hn'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 38/QĐ-STP ngày 15/09/2026.' },
                qdhlLog('08:00 16/09/2026', 'cv_hn1', BH, QDHL_ON),
                { at: '08:00 16/09/2026', userId: 'cv_hn1', userName: W.userName('cv_hn1'), action: 'Tạo bản ghi Chi trả tiền bồi thường', note: 'Bản ghi Chi trả tiền bồi thường trạng thái [Chờ thông báo chi trả].' }
            ], createdBy: 'cv_hn1', updatedAt: '2026-09-16T08:00:00.000Z' }),
        // Có hiệu lực -> Không có hiệu lực; Thông báo chi trả đang Chờ duyệt (Lãnh đạo không Ký duyệt được, vẫn Từ chối được)
        seedDec({ id: 'QD-HL4', claimCode: 'BT-2026-194', nycName: 'Phạm Thị Ngọc Ánh', nycAddress: 'Số 40 phố Hàng Bài, Phường Hoàn Kiếm, Thành phố Hà Nội', unitId: 'STP-HN', leaderId: 'tp_hctp_hn', approvedBy: 'gdso_hn', approvedAt: '09:00 02/10/2026',
            status: BH, decNo: '40/QĐ-STP', issueDate: '02/10/2026', signedFile: 'QD_GQBT_BT-2026-194_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT',
            items: seedItems([['Thiệt hại về tinh thần', 100000000, 95000000, 95000000]]), recipient: { name: 'Phạm Thị Ngọc Ánh', idNo: '001192007788', account: '0021009988112', bank: 'BIDV', branch: 'Chi nhánh Hoàn Kiếm' },
            hieuLuc: QDHL_OFF,
            hieuLucHistory: [qdhlH('08:00 03/10/2026', 'cv_hn1', BH, QDHL_ON), qdhlH('14:00 21/10/2026', 'cv_hn1', QDHL_ON, QDHL_OFF, r4, d4)],
            history: [
                { at: '09:00 02/10/2026', userId: 'gdso_hn', userName: W.userName('gdso_hn'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 40/QĐ-STP ngày 02/10/2026.' },
                qdhlLog('08:00 03/10/2026', 'cv_hn1', BH, QDHL_ON),
                { at: '08:00 03/10/2026', userId: 'cv_hn1', userName: W.userName('cv_hn1'), action: 'Tạo bản ghi Chi trả tiền bồi thường', note: 'Bản ghi Chi trả tiền bồi thường trạng thái [Chờ thông báo chi trả].' },
                qdhlLog('14:00 21/10/2026', 'cv_hn1', QDHL_ON, QDHL_OFF, r4, d4)
            ], createdBy: 'cv_hn1', updatedAt: '2026-10-21T14:00:00.000Z' })
    ];
}
// Bổ sung bản ghi mẫu còn thiếu (theo Mã Quyết định), không xóa dữ liệu khác; bộ mẫu cũ (v1) QD-HL1..4 được thay theo bộ mẫu mới
function qdhlEnsureSeeds() {
    try {
        var changed = false;
        var fresh = !qdhlRead(QDHL_SEED_KEY, '');
        qdhlSeedDefs().forEach(function (s) {
            var i = decisions.findIndex(function (o) { return o && o.id === s.id; });
            if (i >= 0 && fresh) { decisions[i] = s; changed = true; return; }
            if (i >= 0 || decisions.some(function (o) { return o && o.claimCode === s.claimCode && o.status !== ST.DA_HUY; })) return;
            decisions.push(s);
            changed = true;
        });
        qdhlWrite(QDHL_SEED_KEY, '1');
        if (qdhlMigrate()) changed = true;
        // Dữ liệu cũ: ghi chú lịch sử "Cập nhật hiệu lực QĐ" lưu nhãn cũ "Tài liệu kèm theo:" -> "Tài liệu đính kèm:"
        (decisions || []).forEach(function (d) {
            (d && d.history || []).forEach(function (h) {
                if (h && typeof h.note === 'string' && h.note.indexOf(' Tài liệu kèm theo: ') >= 0) { h.note = h.note.split(' Tài liệu kèm theo: ').join(' Tài liệu đính kèm: '); changed = true; }
            });
        });
        if (changed) saveDecisions();
        qdhlSyncMap();
    } catch (e) { console.error(e); }
}
// Dữ liệu cũ: Quyết định đã ban hành chưa có hiệu lực -> đã có bản ghi Chi trả tiền bồi thường (hoặc hàng đợi): Có hiệu lực; chưa có: Đã ban hành (chờ cập nhật)
function qdhlMigrate() {
    if (qdhlRead(QDHL_MODEL_KEY, '')) return false;
    var ch = false;
    (decisions || []).forEach(function (d) {
        if (!d || d.hieuLuc || d.qdhlPending) return;
        var issued = d.status === ST.DA_BH || (!!d.signedFile && !!d.wfKind && d.wfKind !== KIND_QD && d.status !== ST.DA_HUY);
        if (!issued) return;
        if (qdhlPayRec(d) || qdhlQueued(d)) d.hieuLuc = QDHL_ON; else d.qdhlPending = true;
        ch = true;
    });
    qdhlWrite(QDHL_MODEL_KEY, '1');
    return ch;
}

// ---------------- Bọc chức năng sẵn có ----------------
(function () {
    // Dữ liệu mẫu + chuyển đổi dữ liệu cũ: chạy cùng ctqdEnsureSeeds (trước khi vẽ danh sách lần đầu)
    if (typeof ctqdEnsureSeeds === 'function') {
        var origSeed = ctqdEnsureSeeds;
        ctqdEnsureSeeds = function () { var r = origSeed.apply(this, arguments); qdhlEnsureSeeds(); return r; };
    }
    // Ban hành (Ký duyệt cấp cuối / Ký ngoài): KHÔNG tạo bản ghi kinh phí; đánh dấu chờ Cập nhật hiệu lực QĐ.
    // Bản ghi Chi trả tiền bồi thường chỉ tạo khi Quyết định chuyển Có hiệu lực (qdhlSave).
    if (typeof kptbNotifyIssued === 'function') {
        qdhlOrigNotify = kptbNotifyIssued;
        kptbNotifyIssued = function (d) {
            if (d && d.hieuLuc === QDHL_ON) return qdhlOrigNotify.apply(this, arguments);
            if (d && d.status === ST.DA_BH && !d.hieuLuc) {
                d.qdhlPending = true;
                // Lưu ngay khi Quyết định thuộc danh sách đang dùng (Ký ngoài lưu trước khi gọi hàm này)
                if (Array.isArray(decisions) && decisions.indexOf(d) >= 0) { try { saveDecisions(); qdhlSyncMap(); } catch (e) { /* bỏ qua */ } }
            }
        };
    }
    // Trạng thái: Quyết định đã ban hành hiển thị Đã ban hành / Có hiệu lực / Không có hiệu lực
    var origStatus = statusCell;
    statusCell = function (d) {
        if (d && d.status === ST.DA_BH) { qdhlCss(); return qdhlBadge(qdhlState(d)); }
        return origStatus.apply(this, arguments);
    };
    // Tab (Cán bộ xử lý): Đã ban hành -> Chờ xử lý; Có hiệu lực / Không có hiệu lực -> Đã xử lý
    var origInTab = qdInTab;
    qdInTab = function (d, tab) {
        if (qdRole() !== 'lanh-dao' && d && d.status === ST.DA_BH) return (qdhlState(d) === ST.DA_BH) === (tab === 'pending');
        return origInTab.apply(this, arguments);
    };
    // Bộ lọc Trạng thái theo tab
    var origOpts = updateQdStatusOptions;
    updateQdStatusOptions = function () {
        var r = origOpts.apply(this, arguments);
        var sel = document.getElementById('searchDecStatus'); if (!sel) return r;
        var isPending = qdTab !== 'done';
        var states = qdRole() === 'lanh-dao'
            ? (isPending ? [ST.CHO_DUYET] : [ST.CHO_DUYET, ST.TRA_LAI, ST.DA_BH, QDHL_ON, QDHL_OFF, ST.DA_HUY])
            : (isPending ? [ST.CHO_DUYET, ST.TRA_LAI, ST.DA_BH] : [QDHL_ON, QDHL_OFF, ST.DA_HUY]);
        var cur = sel.value;
        sel.innerHTML = '<option value="">Tất cả</option>' + states.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join('');
        sel.value = states.indexOf(cur) >= 0 ? cur : '';
        return r;
    };
    // Lọc theo trạng thái hiển thị
    var origFilter = filteredDecisions;
    filteredDecisions = function () {
        var sel = document.getElementById('searchDecStatus');
        var v = sel ? sel.value : '';
        if (!v) return origFilter.apply(this, arguments);
        sel.value = '';
        var rows;
        try { rows = origFilter.apply(this, arguments); } finally { sel.value = v; }
        return rows.filter(function (d) { return qdhlState(d) === v; });
    };
    // Cột Thao tác (Cán bộ xử lý): thêm "Cập nhật hiệu lực QĐ" ở vị trí cố định cuối nhóm; không được phép -> khóa mờ + tooltip lý do
    // Không có hiệu lực: các thao tác hiển thị khóa mờ, tooltip "[Tên thao tác]: Quyết định Không có hiệu lực" (Xem chi tiết: click dòng)
    function qdhlAllOff(h) {
        return String(h || '').replace(/<button\b([^>]*)>/g, function (m, attrs) {
            var t = ((/title="([^"]*)"/.exec(attrs) || [])[1] || '').split(':')[0];
            var a = attrs.replace(/\s(?:onclick|title|style|type|aria-disabled)="[^"]*"/g, '').replace(/class="([^"]*)"/, function (x, c) { return 'class="' + c.replace(/\s*\bis-disabled\b/g, '') + ' is-disabled"'; });
            return '<button type="button"' + a + ' aria-disabled="true" title="' + t + ': Quyết định Không có hiệu lực" style="opacity:0.35; cursor:not-allowed;" onclick="event.stopPropagation();">';
        });
    }
    var origActs = rowActions;
    rowActions = function (d) {
        var h = origActs.apply(this, arguments);
        if (qdhlState(d) === QDHL_OFF) h = qdhlAllOff(h);
        if (qdRole() === 'lanh-dao') return h;
        var t = 'Cập nhật hiệu lực QĐ';
        return h + (qdhlCan(d)
            ? '<button class="icon-btn edit qdhl-act" data-admin-icon-normalized="1" title="' + t + '" onclick="event.stopPropagation(); qdhlOpen(\'' + d.id + '\')"><i class="fa-solid fa-file-circle-check"></i></button>'
            : '<button type="button" class="icon-btn edit qdhl-act is-disabled" data-admin-icon-normalized="1" aria-disabled="true" title="' + esc(t + ': ' + qdhlOffReason(d)) + '" style="opacity:0.35; cursor:not-allowed;" onclick="event.stopPropagation();"><i class="fa-solid fa-file-circle-check"></i></button>');
    };
    // Chặn thao tác trên Quyết định Không có hiệu lực (gọi trực tiếp hàm): cảnh báo, không xử lý
    ['openRequest', 'openHqdModal', 'openScbModal', 'openForm', 'confirmDelete', 'confirmWithdraw', 'qdldOpen'].forEach(function (fn) {
        var orig = window[fn];
        if (typeof orig !== 'function') return;
        window[fn] = function (id) {
            if (id && qdhlState(getDec(id)) === QDHL_OFF) { showToast('Quyết định Không có hiệu lực, không cho phép thực hiện thao tác.', 'error'); return; }
            return orig.apply(this, arguments);
        };
    });
    // Màn chi tiết
    var origDetail = openDetail;
    openDetail = function (id) { var r = origDetail.apply(this, arguments); try { qdhlDecorateDetail(id); } catch (e) { console.error(e); } return r; };
})();
