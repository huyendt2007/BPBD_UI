/* [hlqd] Cập nhật hiệu lực Quyết định giải quyết bồi thường (quyet_dinh_giai_quyet_boi_thuong.html)
 * - Thao tác "Cập nhật hiệu lực QĐ" (Cán bộ xử lý): Quyết định Đã ban hành, khoản Chi trả tiền bồi thường của Quyết định CHƯA hoàn thành chi trả
 *   (bản ghi kinh phí chưa "Hoàn thành", chưa có số tiền chi trả thực tế). Lưới: khóa mờ + tooltip lý do; Footer chi tiết: ẩn.
 * - Popup: Hiệu lực hiện tại (chỉ đọc) | Hiệu lực (Có hiệu lực / Không có hiệu lực; mặc định giá trị còn lại) | Lý do cập nhật hiệu lực* (mỗi lần đổi)
 *   | Tài liệu kèm theo (bắt buộc tối thiểu 01 dòng khi chọn Không có hiệu lực). Có popup xác nhận trước khi lưu.
 * - Lưu: d.hieuLuc ('Có hiệu lực' mặc định; dữ liệu cũ không có = Có hiệu lực) + d.hieuLucHistory [{ at, userId, userName, from, to, reason, docs }];
 *   ghi Lịch sử xử lý; đồng bộ kho dùng chung 'btnn_qd_hieu_luc_v1' (màn Kinh phí đọc để chặn Trình thông báo chi trả / Cập nhật chi trả).
 * - Màn chi tiết: trường Hiệu lực + khối Lịch sử cập nhật hiệu lực. Lưới: dòng phụ "Không có hiệu lực" dưới trạng thái; bộ lọc Hiệu lực.
 * - Dữ liệu mẫu: QD-HL1 (Không có hiệu lực, khoản chi trả Chờ thông báo chi trả), QD-HL2 (Không -> Có, 02 dòng lịch sử, Chờ chi trả),
 *   QD-HL3 (đã Hoàn thành chi trả - không còn thao tác), QD-HL4 (Không có hiệu lực, Thông báo chi trả Chờ duyệt - Lãnh đạo chỉ Từ chối).
 * - Đã chi trả gồm cả khoản kinh phí Trả lại ngân sách nhà nước (khóa Cập nhật hiệu lực QĐ, kiểm tra lại khi lưu).
 * Dùng các hàm/hằng của trang chính: W, esc, ST, decisions, getDec, seedDec, seedItems, saveDecisions, addDecHistory, pushHistory, dtlItem,
 * statusCell, rowActions, openDetail, filteredDecisions, clearDecFilters, renderDecTable, qdRole, markInvalid, showConfirmModal, showToast, openModal, closeModal
 */
var QDHL_ON = 'Có hiệu lực';
var QDHL_OFF = 'Không có hiệu lực';
var QDHL_MAP_KEY = 'btnn_qd_hieu_luc_v1';
var QDHL_SEED_KEY = 'btnn_qdhl_seed_v1';
var QDHL_PAY_TYPE = 'Chi trả tiền bồi thường';
var qdhlCtx = null;

function qdhlRead(key, fb) { try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
function qdhlWrite(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
// Hiệu lực của Quyết định: dữ liệu cũ không có giá trị -> Có hiệu lực
function qdhlOf(d) { return d && d.hieuLuc === QDHL_OFF ? QDHL_OFF : QDHL_ON; }
// Bản ghi Chi trả tiền bồi thường của Quyết định (module Kinh phí, kho 'proposalsList')
function qdhlPayRec(d) {
    var list = qdhlRead('proposalsList', []);
    if (!Array.isArray(list) || !d) return null;
    var pay = list.filter(function (p) { return p && p.type === QDHL_PAY_TYPE; });
    return pay.find(function (p) { return p.decId === d.id; }) || pay.find(function (p) { return !p.decId && p.ycbtCode === d.claimCode; }) || null;
}
// Đã chi trả: bản ghi kinh phí Hoàn thành / Trả lại ngân sách nhà nước hoặc đã có số tiền chi trả thực tế
var QDHL_RETURNED = ['Trả lại ngân sách nhà nước', 'Đã sung quỹ', 'Sung quỹ nhà nước'];
function qdhlReturned(d) { var p = qdhlPayRec(d); return !!p && QDHL_RETURNED.indexOf(p.status) >= 0; }
function qdhlPaid(d) {
    var p = qdhlPayRec(d);
    if (p) return p.status === 'Hoàn thành' || QDHL_RETURNED.indexOf(p.status) >= 0 || Number(p.payoutAmountReal) > 0;
    return !!(d && d.qdhlPaidSeed);
}
function qdhlCan(d) { return !!d && qdRole() !== 'lanh-dao' && d.status === ST.DA_BH && !qdhlPaid(d); }
function qdhlOffReason(d) {
    if (d && d.status === ST.DA_BH && qdhlReturned(d)) return 'Khoản chi trả của Quyết định đã Trả lại ngân sách nhà nước, không cho phép cập nhật hiệu lực';
    if (d && d.status === ST.DA_BH && qdhlPaid(d)) return 'Quyết định đã hoàn thành chi trả, không cho phép cập nhật hiệu lực';
    return 'chỉ thực hiện với Quyết định Đã ban hành, khoản chi trả chưa hoàn thành chi trả';
}
// Kho dùng chung: { [Mã Quyết định]: { claimCode, decNo, hieuLuc, reason, at } } - màn Kinh phí đọc để chặn chi trả
function qdhlSyncMap() {
    var map = qdhlRead(QDHL_MAP_KEY, {}) || {};
    var ch = false;
    (decisions || []).forEach(function (d) {
        if (!d || !d.id || (d.status !== ST.DA_BH && !d.hieuLuc)) return;
        var last = (d.hieuLucHistory || [])[(d.hieuLucHistory || []).length - 1] || {};
        var v = { claimCode: d.claimCode, decNo: d.decNo || '', status: d.status, hieuLuc: qdhlOf(d), reason: last.reason || '', at: last.at || '' };
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
        '.qdhl-badge-on { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }',
        '.qdhl-badge-off { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }',
        '#qdDetailBody table.qdhl-hist th, #qdDetailBody table.qdhl-hist td, #qdDetailBody table.qdhl-hist td.admin-actions-cell, #qdDetailBody table.qdhl-hist th.admin-actions-cell { text-align: left !important; vertical-align: top; }',
        '.qdhl-doc { display: flex; align-items: center; gap: 6px; } .qdhl-doc + .qdhl-doc { margin-top: 4px; }',
        '.qdhl-doc a { color: var(--secondary-color); text-decoration: underline; cursor: pointer; overflow-wrap: anywhere; }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
}
function qdhlBadge(v) { return '<span class="badge ' + (v === QDHL_OFF ? 'qdhl-badge-off' : 'qdhl-badge-on') + '">' + esc(v) + '</span>'; }

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
        + '<div class="qdhl-row"><span class="form-label">Hiệu lực hiện tại</span><div id="qdhlCur" style="padding:4px 0;"></div></div>'
        + '<div class="qdhl-row form-group"><span class="form-label">Hiệu lực<span class="required">*</span></span>'
        + '<div class="qdhl-radios" id="qdhlRadios" tabindex="-1">'
        + '<label><input type="radio" name="qdhlVal" value="' + QDHL_ON + '" onchange="qdhlOnChange()"> ' + QDHL_ON + '</label>'
        + '<label><input type="radio" name="qdhlVal" value="' + QDHL_OFF + '" onchange="qdhlOnChange()"> ' + QDHL_OFF + '</label>'
        + '</div><div class="field-error" id="qdhlValErr"></div></div>'
        + '<div class="qdhl-row form-group"><span class="form-label">Lý do cập nhật hiệu lực<span class="required">*</span></span>'
        + '<textarea class="form-control" id="qdhlReason" rows="3" maxlength="1000" placeholder="Nhập lý do cập nhật hiệu lực" oninput="qdhlCount()"></textarea>'
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
    tlktMount('qdhl', 'qdhlTlkt', { required: qdhlSel() === QDHL_OFF, rows: rows || [], secClass: '', titleClass: 'form-label', noLeader: true, title: 'Tài liệu kèm theo' });
}
function qdhlSetValErr(on, msg) {
    var e = document.getElementById('qdhlValErr'), g = document.getElementById('qdhlRadios');
    if (e) { e.textContent = msg || ''; e.style.display = on ? 'block' : 'none'; }
    if (g) g.classList.toggle('is-invalid', !!on);
}
// Đổi Hiệu lực: Tài liệu kèm theo bắt buộc khi chọn Không có hiệu lực; giữ các dòng đã nhập
function qdhlOnChange() {
    qdhlSetValErr(false);
    qdhlMountDocs(typeof tlktGet === 'function' ? tlktGet('qdhl') : []);
}
function qdhlOpen(id) {
    var d = getDec(id);
    if (!d) return;
    if (!qdhlCan(d)) { showToast('Cập nhật hiệu lực QĐ: ' + qdhlOffReason(d) + '.', 'error'); return; }
    qdhlCss();
    qdhlEnsureModal();
    qdhlCtx = { id: id };
    var cur = qdhlOf(d);
    document.getElementById('qdhlInfo').innerHTML = 'Quyết định số <b>' + esc(d.decNo || '-') + '</b> ngày ' + esc(d.issueDate || '-') + ' - ' + esc(W.unitName ? (d.unitId ? W.unitName(d.unitId) : (d.agency || '')) : '')
        + '<br>Mã hồ sơ GQBT: <b>' + esc(d.claimCode) + '</b> • Người yêu cầu: ' + esc(d.nycName || '');
    document.getElementById('qdhlCur').innerHTML = qdhlBadge(cur);
    Array.prototype.forEach.call(document.querySelectorAll('input[name="qdhlVal"]'), function (r) { r.checked = r.value !== cur; });
    var t = document.getElementById('qdhlReason');
    t.value = '';
    if (typeof markInvalid === 'function') markInvalid(t, false);
    qdhlCount();
    qdhlSetValErr(false);
    qdhlMountDocs([]);
    openModal('qdhlModal');
}
function qdhlClose() { closeModal('qdhlModal'); qdhlCtx = null; }
function qdhlSubmit() {
    var d = qdhlCtx && getDec(qdhlCtx.id);
    if (!d) return;
    // Khoản chi trả đã chi trả tại thời điểm lưu: không cho cập nhật
    if (!qdhlCan(d)) { showToast('Cập nhật hiệu lực QĐ: ' + qdhlOffReason(d) + '.', 'error'); return; }
    var cur = qdhlOf(d), to = qdhlSel();
    var first = null;
    // Hiệu lực: bắt buộc chọn, phải khác Hiệu lực hiện tại
    if (!to) { qdhlSetValErr(true, 'Đây là trường bắt buộc'); first = first || document.getElementById('qdhlRadios'); }
    else if (to === cur) { qdhlSetValErr(true, 'Hiệu lực cập nhật phải khác Hiệu lực hiện tại.'); first = first || document.getElementById('qdhlRadios'); }
    else qdhlSetValErr(false);
    // Lý do cập nhật hiệu lực: bắt buộc mỗi lần thay đổi (cả 02 chiều)
    var t = document.getElementById('qdhlReason');
    var reason = String(t.value || '').trim();
    markInvalid(t, !reason);
    if (!reason) first = first || t;
    // Tài liệu kèm theo: bắt buộc tối thiểu 01 dòng khi chọn Không có hiệu lực
    var docsOk = typeof tlktValidate === 'function' ? tlktValidate('qdhl') : true;
    if (first) { try { first.focus(); } catch (e) { /* bỏ qua */ } return; }
    if (!docsOk) return;
    var docs = typeof tlktGet === 'function' ? tlktGet('qdhl') : [];
    showConfirmModal('Cập nhật hiệu lực Quyết định số ' + (d.decNo || '-') + ' từ [' + cur + '] sang [' + to + ']?'
        + (to === QDHL_OFF ? ' Khoản chi trả tiền bồi thường của Quyết định sẽ không được Trình thông báo chi trả / Cập nhật chi trả cho tới khi Quyết định có hiệu lực lại.' : ''),
        function () { qdhlSave(d.id, cur, to, reason, docs); }, 'Xác nhận cập nhật hiệu lực', 'Đồng ý', false);
}
function qdhlSave(id, from, to, reason, docs) {
    var d = getDec(id); if (!d) return;
    var me = W.getCurrentUserId(), at = W.nowText();
    d.hieuLuc = to;
    (d.hieuLucHistory = d.hieuLucHistory || []).push({ at: at, userId: me, userName: W.userName(me), from: from, to: to, reason: reason, docs: docs || [] });
    var names = (docs || []).map(function (x) { return (x.file && x.file.name) || x.name; }).filter(Boolean);
    addDecHistory(d, 'Cập nhật hiệu lực QĐ', 'Hiệu lực chuyển từ [' + from + '] sang [' + to + ']. Lý do: ' + reason + (names.length ? ' Tài liệu kèm theo: ' + names.join(', ') + '.' : ''));
    d.updatedAt = new Date().toISOString();
    saveDecisions();
    qdhlSyncMap();
    closeModal('qdhlModal');
    qdhlCtx = null;
    showToast('Đã cập nhật hiệu lực Quyết định: ' + to + '.', 'success');
    var panel = document.getElementById('qdDetailPanel');
    if (panel && panel.style.display === 'flex') openDetail(id); else renderDecTable();
}

// ---------------- Màn chi tiết: trường Hiệu lực + khối Lịch sử cập nhật hiệu lực + Footer ----------------
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
        return '<tr><td>' + (i + 1) + '</td><td>' + esc(h.at) + '</td><td>' + esc(h.userName || W.userName(h.userId)) + '</td><td>' + qdhlBadge(h.from) + '</td><td>' + qdhlBadge(h.to) + '</td><td>' + esc(h.reason) + '</td><td>' + docs + '</td></tr>';
    }).join('');
    return '<div class="dtl-card" id="qdhlHistCard"><div class="dtl-card-head"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử cập nhật hiệu lực</div><div class="dtl-card-body">'
        + '<div class="table-container"><table class="custom-table qdhl-hist" style="min-width:760px;"><thead><tr><th style="width:48px;">STT</th><th style="width:130px;">Thời điểm</th><th style="width:170px;">Người cập nhật</th><th style="width:130px;">Hiệu lực trước</th><th style="width:130px;">Hiệu lực sau</th><th>Lý do cập nhật hiệu lực</th><th style="width:220px;">Tài liệu kèm theo</th></tr></thead><tbody>' + rows + '</tbody></table></div>'
        + '</div></div>';
}
function qdhlDecorateDetail(id) {
    var d = getDec(id); if (!d) return;
    qdhlCss();
    var grid = document.getElementById('ctqdInfoGrid');
    if (grid && (d.status === ST.DA_BH || (d.hieuLucHistory || []).length) && !document.getElementById('qdhlField')) {
        grid.insertAdjacentHTML('beforeend', dtlItem('Hiệu lực', '<span id="qdhlField">' + qdhlBadge(qdhlOf(d)) + '</span>'));
    }
    var card = grid && grid.closest('.dtl-card');
    var hist = qdhlHistHtml(d);
    if (card && hist && !document.getElementById('qdhlHistCard')) card.insertAdjacentHTML('afterend', hist);
    var foot = document.getElementById('qdDetailFooter');
    if (foot && qdhlCan(d) && !document.getElementById('qdhlFootBtn')) {
        var html = '<button class="btn btn-secondary" id="qdhlFootBtn" onclick="qdhlOpen(\'' + d.id + '\')"><i class="fa-solid fa-file-circle-check"></i> Cập nhật hiệu lực QĐ</button>';
        var last = foot.lastElementChild;
        if (last) last.insertAdjacentHTML('beforebegin', html); else foot.insertAdjacentHTML('beforeend', html);
    }
}

// ---------------- Bộ lọc Hiệu lực ----------------
function qdhlMountFilter() {
    if (document.getElementById('qdhlSearchHieuLuc')) return;
    var st = document.getElementById('searchDecStatus');
    var holder = st && st.parentElement;
    if (!holder) return;
    var div = document.createElement('div');
    div.innerHTML = '<span class="form-label">Hiệu lực</span><select class="form-control" id="qdhlSearchHieuLuc"><option value="">Tất cả</option><option value="' + QDHL_ON + '">' + QDHL_ON + '</option><option value="' + QDHL_OFF + '">' + QDHL_OFF + '</option></select>';
    holder.insertAdjacentElement('afterend', div);
}

// ---------------- Dữ liệu mẫu ----------------
function qdhlDoc0(name, file, size) { return { name: name, file: { id: 'qdhl_seed_' + file.replace(/\W+/g, '_'), name: file, size: size } }; }
function qdhlSeedDefs() {
    var r1 = 'Người yêu cầu bồi thường đã khởi kiện yêu cầu Tòa án giải quyết yêu cầu bồi thường trong thời hạn; Quyết định chưa phát sinh hiệu lực thi hành.';
    var r2a = 'Phát hiện sai sót thông tin người nhận tiền bồi thường; tạm dừng hiệu lực để rà soát.';
    var r4 = 'Cơ quan có thẩm quyền yêu cầu tạm dừng thi hành Quyết định để xem xét lại.';
    var r2b = 'Đã rà soát, xác định thông tin người nhận tiền bồi thường chính xác; Quyết định tiếp tục có hiệu lực.';
    return [
        seedDec({ id: 'QD-HL1', claimCode: 'BT-2026-191', nycName: 'Trần Thị Thu Hương', nycAddress: 'Số 18 phố Kim Mã, Phường Giảng Võ, Thành phố Hà Nội', unitId: 'STP-HN', leaderId: 'tp_hctp_hn', approvedBy: 'gdso_hn', approvedAt: '10:00 05/10/2026',
            status: ST.DA_BH, decNo: '41/QĐ-STP', issueDate: '05/10/2026', signedFile: 'QD_GQBT_BT-2026-191_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT',
            items: seedItems([['Thu nhập thực tế bị mất/giảm sút', 200000000, 180000000, 180000000]]), recipient: { name: 'Trần Thị Thu Hương', idNo: '001188005511', account: '0021001122334', bank: 'Vietcombank', branch: 'Chi nhánh Ba Đình' },
            hieuLuc: QDHL_OFF,
            hieuLucHistory: [{ at: '09:30 20/10/2026', userId: 'cv_hn1', userName: W.userName('cv_hn1'), from: QDHL_ON, to: QDHL_OFF, reason: r1, docs: [qdhlDoc0('Thông báo thụ lý vụ án của Tòa án', 'Thong_bao_thu_ly_vu_an_BT-2026-191.pdf', 245760)] }],
            history: [
                { at: '10:00 05/10/2026', userId: 'gdso_hn', userName: W.userName('gdso_hn'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 41/QĐ-STP ngày 05/10/2026.' },
                { at: '09:30 20/10/2026', userId: 'cv_hn1', userName: W.userName('cv_hn1'), action: 'Cập nhật hiệu lực QĐ', note: 'Hiệu lực chuyển từ [Có hiệu lực] sang [Không có hiệu lực]. Lý do: ' + r1 + ' Tài liệu kèm theo: Thong_bao_thu_ly_vu_an_BT-2026-191.pdf.' }
            ], createdBy: 'cv_hn1', updatedAt: '2026-10-20T09:30:00.000Z' }),
        seedDec({ id: 'QD-HL2', claimCode: 'BT-2026-192', nycName: 'Nguyễn Văn Phúc', nycAddress: 'Số 7 phố Nguyễn Chí Thanh, Phường Láng, Thành phố Hà Nội', unitId: 'BTP-01', leaderId: 'tpbt', approvedBy: 'cuctruong', approvedAt: '15:00 01/10/2026',
            status: ST.DA_BH, decNo: '33/QĐ-BTP', issueDate: '01/10/2026', signedFile: 'QD_GQBT_BT-2026-192_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT',
            items: seedItems([['Tài sản bị xâm phạm', 320000000, 300000000, 300000000]]), recipient: { name: 'Nguyễn Văn Phúc', idNo: '001079008899', account: '1903366778899', bank: 'Techcombank', branch: 'Chi nhánh Đống Đa' },
            hieuLuc: QDHL_ON,
            hieuLucHistory: [
                { at: '10:00 08/10/2026', userId: 'canbonv', userName: W.userName('canbonv'), from: QDHL_ON, to: QDHL_OFF, reason: r2a, docs: [qdhlDoc0('Biên bản rà soát thông tin người nhận tiền', 'Bien_ban_ra_soat_BT-2026-192.pdf', 189440)] },
                { at: '15:00 15/10/2026', userId: 'canbonv', userName: W.userName('canbonv'), from: QDHL_OFF, to: QDHL_ON, reason: r2b, docs: [] }
            ],
            history: [
                { at: '15:00 01/10/2026', userId: 'cuctruong', userName: W.userName('cuctruong'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 33/QĐ-BTP ngày 01/10/2026.' },
                { at: '10:00 08/10/2026', userId: 'canbonv', userName: W.userName('canbonv'), action: 'Cập nhật hiệu lực QĐ', note: 'Hiệu lực chuyển từ [Có hiệu lực] sang [Không có hiệu lực]. Lý do: ' + r2a + ' Tài liệu kèm theo: Bien_ban_ra_soat_BT-2026-192.pdf.' },
                { at: '15:00 15/10/2026', userId: 'canbonv', userName: W.userName('canbonv'), action: 'Cập nhật hiệu lực QĐ', note: 'Hiệu lực chuyển từ [Không có hiệu lực] sang [Có hiệu lực]. Lý do: ' + r2b }
            ], createdBy: 'canbonv', updatedAt: '2026-10-15T15:00:00.000Z' }),
        seedDec({ id: 'QD-HL3', claimCode: 'BT-2026-193', nycName: 'Lê Minh Đức', nycAddress: 'Số 25 phố Lò Đúc, Phường Hai Bà Trưng, Thành phố Hà Nội', unitId: 'STP-HN', leaderId: 'tp_hctp_hn', approvedBy: 'gdso_hn', approvedAt: '14:00 15/09/2026',
            status: ST.DA_BH, decNo: '38/QĐ-STP', issueDate: '15/09/2026', signedFile: 'QD_GQBT_BT-2026-193_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT', qdhlPaidSeed: true,
            items: seedItems([['Tài sản bị xâm phạm', 130000000, 120000000, 120000000]]), recipient: { name: 'Lê Minh Đức', idNo: '001085006677', account: '0451000334455', bank: 'Vietinbank', branch: 'Chi nhánh Hai Bà Trưng' },
            hieuLuc: QDHL_ON,
            history: [{ at: '14:00 15/09/2026', userId: 'gdso_hn', userName: W.userName('gdso_hn'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 38/QĐ-STP ngày 15/09/2026.' }],
            createdBy: 'cv_hn1', updatedAt: '2026-09-15T14:00:00.000Z' }),
        // QĐ Không có hiệu lực, Thông báo chi trả đang Chờ duyệt (Lãnh đạo không Ký duyệt được, vẫn Từ chối được)
        seedDec({ id: 'QD-HL4', claimCode: 'BT-2026-194', nycName: 'Phạm Thị Ngọc Ánh', nycAddress: 'Số 40 phố Hàng Bài, Phường Hoàn Kiếm, Thành phố Hà Nội', unitId: 'STP-HN', leaderId: 'tp_hctp_hn', approvedBy: 'gdso_hn', approvedAt: '09:00 02/10/2026',
            status: ST.DA_BH, decNo: '40/QĐ-STP', issueDate: '02/10/2026', signedFile: 'QD_GQBT_BT-2026-194_ky_so.pdf', signMethod: 'Ký số', lastKind: 'Quyết định GQBT',
            items: seedItems([['Thiệt hại về tinh thần', 100000000, 95000000, 95000000]]), recipient: { name: 'Phạm Thị Ngọc Ánh', idNo: '001192007788', account: '0021009988112', bank: 'BIDV', branch: 'Chi nhánh Hoàn Kiếm' },
            hieuLuc: QDHL_OFF,
            hieuLucHistory: [{ at: '14:00 21/10/2026', userId: 'cv_hn1', userName: W.userName('cv_hn1'), from: QDHL_ON, to: QDHL_OFF, reason: r4, docs: [qdhlDoc0('Văn bản yêu cầu tạm dừng thi hành', 'Van_ban_tam_dung_BT-2026-194.pdf', 204800)] }],
            history: [
                { at: '09:00 02/10/2026', userId: 'gdso_hn', userName: W.userName('gdso_hn'), action: 'Phê duyệt cấp cuối', note: 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 40/QĐ-STP ngày 02/10/2026.' },
                { at: '14:00 21/10/2026', userId: 'cv_hn1', userName: W.userName('cv_hn1'), action: 'Cập nhật hiệu lực QĐ', note: 'Hiệu lực chuyển từ [Có hiệu lực] sang [Không có hiệu lực]. Lý do: ' + r4 + ' Tài liệu kèm theo: Van_ban_tam_dung_BT-2026-194.pdf.' }
            ], createdBy: 'cv_hn1', updatedAt: '2026-10-21T14:00:00.000Z' })
    ];
}
// Bổ sung bản ghi mẫu còn thiếu (theo Mã Quyết định), không xóa dữ liệu khác
function qdhlEnsureSeeds() {
    try {
        var changed = false;
        qdhlSeedDefs().forEach(function (s) {
            if (getDec(s.id) || decisions.some(function (o) { return o && o.claimCode === s.claimCode && o.status !== ST.DA_HUY; })) return;
            decisions.push(s);
            changed = true;
        });
        qdhlWrite(QDHL_SEED_KEY, '1');
        if (changed) saveDecisions();
        qdhlSyncMap();
    } catch (e) { /* mockup */ }
}

// ---------------- Bọc chức năng sẵn có ----------------
(function () {
    // Dữ liệu mẫu: chạy cùng ctqdEnsureSeeds (trước khi vẽ danh sách lần đầu)
    if (typeof ctqdEnsureSeeds === 'function') {
        var origSeed = ctqdEnsureSeeds;
        ctqdEnsureSeeds = function () { var r = origSeed.apply(this, arguments); qdhlEnsureSeeds(); return r; };
    }
    // Trạng thái: dòng phụ "Không có hiệu lực" dưới badge Đã ban hành
    var origStatus = statusCell;
    statusCell = function (d) {
        var h = origStatus.apply(this, arguments);
        return d && d.status === ST.DA_BH && qdhlOf(d) === QDHL_OFF ? h + '<div class="wf-sub returned qdhl-sub">' + QDHL_OFF + '</div>' : h;
    };
    // Cột Thao tác (Cán bộ xử lý): thêm "Cập nhật hiệu lực QĐ" ở vị trí cố định cuối nhóm; không được phép -> khóa mờ + tooltip lý do
    var origActs = rowActions;
    rowActions = function (d) {
        var h = origActs.apply(this, arguments);
        if (qdRole() === 'lanh-dao') return h;
        var t = 'Cập nhật hiệu lực QĐ';
        return h + (qdhlCan(d)
            ? '<button class="icon-btn edit qdhl-act" data-admin-icon-normalized="1" title="' + t + '" onclick="event.stopPropagation(); qdhlOpen(\'' + d.id + '\')"><i class="fa-solid fa-file-circle-check"></i></button>'
            : '<button type="button" class="icon-btn edit qdhl-act is-disabled" data-admin-icon-normalized="1" aria-disabled="true" title="' + esc(t + ': ' + qdhlOffReason(d)) + '" style="opacity:0.35; cursor:not-allowed;" onclick="event.stopPropagation();"><i class="fa-solid fa-file-circle-check"></i></button>');
    };
    // Bộ lọc Hiệu lực (chỉ áp dụng cho Quyết định Đã ban hành)
    var origFilter = filteredDecisions;
    filteredDecisions = function () {
        var rows = origFilter.apply(this, arguments);
        var sel = document.getElementById('qdhlSearchHieuLuc');
        var v = sel ? sel.value : '';
        return v ? rows.filter(function (d) { return d.status === ST.DA_BH && qdhlOf(d) === v; }) : rows;
    };
    var origClear = clearDecFilters;
    clearDecFilters = function () { var sel = document.getElementById('qdhlSearchHieuLuc'); if (sel) sel.value = ''; return origClear.apply(this, arguments); };
    // Màn chi tiết
    var origDetail = openDetail;
    openDetail = function (id) { var r = origDetail.apply(this, arguments); try { qdhlDecorateDetail(id); } catch (e) { console.error(e); } return r; };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', qdhlMountFilter); else qdhlMountFilter();
})();
