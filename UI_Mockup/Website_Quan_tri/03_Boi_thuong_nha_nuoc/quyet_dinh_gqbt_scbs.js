/*
 * Quyết định giải quyết bồi thường - Sửa chữa, bổ sung QĐ theo Form (prefix scbf), nạp sau quyet_dinh_gqbt_hlqd.js
 * - Thao tác "Sửa chữa, bổ sung QĐ": mở Form giống Tạo mới Quyết định (MH02), điền sẵn nội dung đang có hiệu lực của Quyết định
 *   (Quyết định gốc hoặc lần sửa chữa, bổ sung gần nhất); trình lại hồ sơ Bị trả lại: điền theo lần trình trước.
 *   + Khối đầu (chỉ đọc): Số quyết định, Ngày quyết định, File Quyết định giải quyết bồi thường đã ký (của Quyết định gốc).
 *   + Khối cuối: Nội dung sửa chữa, bổ sung - tự sinh theo thông tin thay đổi trên Form ("Sửa [trường] từ "[cũ]" thành "[mới]"."), cho phép sửa;
 *     đã sửa tay thì không ghi đè, hiển thị liên kết "Lấy lại theo thông tin thay đổi".
 *   + Tiếp tục: mở Popup Trình ký QĐ Sửa chữa, Bổ sung (MH05b) - Nội dung sửa chữa, bổ sung lấy theo Form (chỉ đọc).
 * - Lãnh đạo cấp cuối Ký duyệt / Ký ngoài ban hành: áp nội dung Form vào Quyết định (Số, Ngày, File giữ của Quyết định gốc);
 *   có thay đổi Số tiền / người nhận / phương thức chi trả: ghi sự kiện liên thông 'btnn_kpqd_events_v1' (phân hệ Kinh phí xử lý khi tải trang,
 *   quan_ly_kinh_phi_kpqd.js). Không có thay đổi: không tác động kinh phí.
 * - Hủy QĐ: không liên thông Kinh phí (không ghi sự kiện).
 * - Danh sách / Chi tiết: Số tiền, người nhận theo nội dung hiện hành, nhãn "Theo QĐ sửa chữa, bổ sung lần n".
 */
var SCBF_EVT_KEY = 'btnn_kpqd_events_v1';
var SCBF_LBL = 'Theo QĐ sửa chữa, bổ sung';
var scbf = null;

function scbfRead(k, fb) { try { var r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch (e) { return fb; } }
function scbfWrite(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
function scbfV(id) { var el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }
function scbfMoney(n) { return fmt(n) + ' đồng'; }
function scbfItemCode(it) { var TH = window.BTNN_TH; return (TH && TH.codeOfAny(it)) || it.key || it.code || it.label || ''; }
function scbfItemName(it) { var TH = window.BTNN_TH; var c = TH ? TH.codeOfAny(it) : ''; return c ? TH.nameOf(it) : (it.label || it.name || 'Thiệt hại'); }
function scbfGroupNo(it) { var TH = window.BTNN_TH; var c = TH ? TH.codeOfAny(it) : ''; var g = c && TH.group(c); return g ? (g.roman || g.no || '') : ''; }

// ---------- Nội dung Quyết định (dùng so sánh) ----------
function scbfOf(src) {
    src = src || {};
    var r = src.recipient || {}, po = src.payout || {};
    var method = po.method || (r.account ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt');
    var items = (src.items || []).map(function (it) { return { code: scbfItemCode(it), name: scbfItemName(it), no: scbfGroupNo(it), amount: num(it.amount) }; });
    return {
        nycName: src.nycName || '', nycAddress: src.nycAddress || '', items: items,
        total: items.reduce(function (s, x) { return s + x.amount; }, 0), advance: num(src.advance), adjustReason: src.adjustReason || '',
        recName: r.name || '', recIdNo: r.idNo || '', method: method,
        accHolder: po.accHolder || r.name || '', account: po.account || r.account || '', bank: po.bank || r.bank || '', branch: po.branch || r.branch || '',
        cashPlace: po.cashPlace || '', cashNote: po.cashNote || ''
    };
}
// Nội dung đang nhập trên Form
function scbfFormSnap() {
    var items = (form && form.items ? form.items : []).map(function (it) { return { code: scbfItemCode(it), name: scbfItemName(it), no: scbfGroupNo(it), amount: num(it.amount) }; });
    return {
        nycName: scbfV('qdNycName'), nycAddress: scbfV('qdNycAddress'), items: items,
        total: items.reduce(function (s, x) { return s + x.amount; }, 0), advance: num(form && form.advance), adjustReason: document.getElementById('qdAdjustGroup').style.display === 'none' ? '' : scbfV('qdAdjustReason'),
        recName: scbfV('qdRecName'), recIdNo: scbfV('qdRecIdNo'), method: scbfV('qdPayoutMethod'),
        accHolder: scbfV('qdPayoutAccHolder'), account: scbfV('qdRecAccount'), bank: scbfV('qdRecBank'), branch: scbfV('qdRecBranch'),
        cashPlace: scbfV('qdPayoutCashPlace'), cashNote: scbfV('qdPayoutCashNote')
    };
}
// Quy tắc sinh Nội dung sửa chữa, bổ sung: mỗi thay đổi 01 dòng, theo thứ tự trường trên Form
function scbfDiffLines(a, b) {
    var out = [];
    var q = function (v) { return v === '' || v == null ? '(trống)' : '"' + v + '"'; };
    var txt = function (label, x, y) { if (String(x) !== String(y)) out.push('Sửa ' + label + ' từ ' + q(x) + ' thành ' + q(y) + '.'); };
    txt('Họ và tên', a.nycName, b.nycName);
    txt('Địa chỉ', a.nycAddress, b.nycAddress);
    var old = {}; a.items.forEach(function (it) { old[it.code] = it; });
    b.items.forEach(function (it) {
        var o = old[it.code], ov = o ? o.amount : 0, nv = it.amount;
        if (ov === nv) return;
        var nm = 'mục "' + it.name + '"' + (it.no ? ' (nhóm ' + it.no + ')' : '');
        if (!ov) out.push('Bổ sung ' + nm + ' với Mức bồi thường ' + scbfMoney(nv) + '.');
        else if (!nv) out.push('Bỏ ' + nm + ' (Mức bồi thường cũ ' + scbfMoney(ov) + ').');
        else out.push('Sửa Mức bồi thường ' + nm + ' từ ' + scbfMoney(ov) + ' thành ' + scbfMoney(nv) + '.');
    });
    if (a.total !== b.total) out.push('Sửa Tổng số tiền bồi thường từ ' + scbfMoney(a.total) + ' thành ' + scbfMoney(b.total) + '.');
    txt('Lý do điều chỉnh', a.adjustReason, b.adjustReason);
    txt('Họ và tên người nhận', a.recName, b.recName);
    txt('Số định danh cá nhân/CCCD', a.recIdNo, b.recIdNo);
    txt('Phương thức nhận tiền', a.method, b.method);
    if (b.method === 'Nhận qua chuyển khoản') {
        txt('Chủ tài khoản', a.method === b.method ? a.accHolder : '', b.accHolder);
        txt('Số tài khoản ngân hàng', a.method === b.method ? a.account : '', b.account);
        txt('Tên ngân hàng', a.method === b.method ? a.bank : '', b.bank);
        txt('Chi nhánh ngân hàng', a.method === b.method ? a.branch : '', b.branch);
    } else {
        txt('Cơ quan / Địa chỉ chi trả tiền mặt', a.method === b.method ? a.cashPlace : '', b.cashPlace);
        txt('Số biên lai / Ghi chú chi trả', a.method === b.method ? a.cashNote : '', b.cashNote);
    }
    return out;
}
// Thay đổi liên quan kinh phí: Số tiền / người yêu cầu / người nhận / phương thức chi trả
function scbfMoneyChanged(a, b) { return a.total !== b.total; }
function scbfInfoChanged(a, b) {
    return ['nycName', 'nycAddress', 'recName', 'recIdNo', 'method', 'accHolder', 'account', 'bank', 'branch', 'cashPlace', 'cashNote'].some(function (k) { return String(a[k]) !== String(b[k]); });
}

// ---------- Form Sửa chữa, bổ sung ----------
function scbfCss() {
    if (document.getElementById('scbfCss')) return;
    var st = document.createElement('style'); st.id = 'scbfCss';
    st.textContent = '#scbfHeadCard .scbf-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px 16px;}'
        + '#scbfHeadCard .scbf-l{display:block;font-size:12px;color:var(--text-muted);font-weight:600;margin-bottom:4px;}'
        + '#scbfHeadCard .scbf-v{font-size:13.5px;font-weight:600;color:#1e293b;}'
        + '#scbfContentCard .scbf-hint{font-size:12px;color:var(--text-muted);margin-top:6px;}'
        + '#scbfRegen{display:none;font-size:12.5px;margin-left:8px;}'
        + '.scbf-sub{font-size:11.5px;color:#1d4ed8;font-weight:600;margin-top:2px;}'
        + '@media (max-width:900px){#scbfHeadCard .scbf-grid{grid-template-columns:1fr;}}';
    (document.head || document.documentElement).appendChild(st);
}
function scbfEnsureCards() {
    scbfCss();
    var body = document.querySelector('#qdFormPanel .inline-form-body');
    if (!body) return;
    if (!document.getElementById('scbfHeadCard')) {
        var h = document.createElement('div'); h.className = 'dtl-card'; h.id = 'scbfHeadCard'; h.style.display = 'none';
        h.innerHTML = '<div class="dtl-card-head"><i class="fa-solid fa-file-signature"></i> Quyết định được sửa chữa, bổ sung</div><div class="dtl-card-body" id="scbfHeadBody"></div>';
        var rb = document.getElementById('qdFormReturnedBlock');
        body.insertBefore(h, rb ? rb.nextSibling : body.firstChild);
    }
    if (!document.getElementById('scbfContentCard')) {
        var c = document.createElement('div'); c.className = 'dtl-card'; c.id = 'scbfContentCard'; c.style.display = 'none';
        c.innerHTML = '<div class="dtl-card-head"><i class="fa-solid fa-pen-to-square"></i> Nội dung sửa chữa, bổ sung</div><div class="dtl-card-body">'
            + '<div class="form-group" style="margin-bottom:0;"><span class="form-label">Nội dung sửa chữa, bổ sung<span class="required">*</span>'
            + '<a href="javascript:void(0)" id="scbfRegen" onclick="scbfRegenAsk()"><i class="fa-solid fa-rotate"></i> Lấy lại theo thông tin thay đổi</a></span>'
            + '<textarea class="form-control" id="scbfContent" rows="6" style="font-family:inherit; font-size:13px;" maxlength="4000" placeholder="Nhập nội dung sửa chữa, bổ sung" oninput="scbfOnContentInput()"></textarea>'
            + '<div class="scbf-hint">Hệ thống tự sinh theo thông tin thay đổi trên Form, mỗi thay đổi 01 dòng; cho phép sửa.</div></div></div>';
        body.appendChild(c);
    }
}
function scbfSearchBtns(show) {
    ['btnSearchClaim', 'btnAdvSearchClaim'].forEach(function (id) { var b = document.getElementById(id); if (b) b.style.display = show ? '' : 'none'; });
}
function scbfShowCards(on) {
    scbfEnsureCards();
    ['scbfHeadCard', 'scbfContentCard'].forEach(function (id) { var el = document.getElementById(id); if (el) el.style.display = on ? 'block' : 'none'; });
}
// Điền Form theo nội dung Quyết định (src: bản ghi Quyết định hoặc dữ liệu Form đã trình)
function scbfFill(src, d) {
    form.items = JSON.parse(JSON.stringify(src.items || []));
    form.advance = num(src.advance != null ? src.advance : d.advance);
    form.proposal = { sourceType: d.sourceType, sourceLabel: d.sourceLabel, summary: d.sourceSummary || '', scenario: d.scenario || '', participation: d.participation, participationLabel: d.participationLabel || '', sourceNote: d.sourceNote || '', legacy: d.participation === undefined };
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.value = v || ''; };
    set('qdNycName', src.nycName); set('qdNycAddress', src.nycAddress);
    var r = src.recipient || {}, po = src.payout || {};
    set('qdRecName', r.name); set('qdRecIdNo', r.idNo);
    var pm = po.method || (r.account ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt');
    set('qdPayoutMethod', pm); onPayoutMethodChange(pm);
    set('qdPayoutAccHolder', po.accHolder || r.name); set('qdRecAccount', po.account || r.account); set('qdRecBank', po.bank || r.bank); set('qdRecBranch', po.branch || r.branch);
    set('qdPayoutCashPlace', po.cashPlace); set('qdPayoutCashNote', po.cashNote);
    set('qdEffective', d.effectiveText || '');
    set('qdAdjustReason', src.adjustReason);
    renderItems();
}
function scbfOpen(id) {
    syncFromWorkflow();
    var d = getDec(id); if (!d) return;
    var resubmit = d.status === ST.TRA_LAI && d.wfKind === KIND_SC;
    if (d.status !== ST.DA_BH && !resubmit) { showToast('Chỉ thực hiện với Quyết định đã ban hành.', 'error'); return; }
    if (typeof qdhlState === 'function' && qdhlState(d) === 'Không có hiệu lực') { showToast('Quyết định Không có hiệu lực, không cho phép thực hiện thao tác.', 'error'); return; }
    openForm(null);
    form = { id: null, amendId: d.id, claimCode: d.claimCode, unitId: d.unitId, items: [], advance: num(d.advance), uploadedName: '' };
    scbfShowCards(true);
    document.getElementById('qdFormTitle').innerHTML = '<i class="fa-solid fa-file-pen"></i> SỬA CHỮA, BỔ SUNG QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG';
    var rb = document.getElementById('qdFormReturnedBlock');
    if (resubmit && d.returned) {
        rb.style.display = 'block';
        rb.innerHTML = '<div style="font-weight:700; color:#b45309; margin-bottom:6px; font-size:12.5px;"><i class="fa-solid fa-circle-exclamation"></i> LÝ DO BỊ TRẢ LẠI</div><div style="font-size:13px; color:#92400e; line-height:1.7;">Lý do trả lại: ' + esc(d.returned.reason) + '<br>Người trả lại: ' + esc(W.userLabel(d.returned.by)) + '<br>Thời điểm trả lại: ' + esc(d.returned.at) + '</div>';
    }
    if (typeof ctqdCss === 'function') ctqdCss(); // Kiểu dòng File (thẻ tệp, nút Xem file / Tải file) như màn Chi tiết
    var fileHtml = typeof ctqdFileRow === 'function' ? ctqdFileRow(d.signedFile || '', '', d.id, 'signed') : esc(d.signedFile || '-');
    document.getElementById('scbfHeadBody').innerHTML = '<div class="scbf-grid">'
        + '<div><span class="scbf-l">Số quyết định</span><span class="scbf-v">' + esc(d.decNo || '-') + '</span></div>'
        + '<div><span class="scbf-l">Ngày quyết định</span><span class="scbf-v">' + esc(d.issueDate || '-') + '</span></div>'
        + '<div><span class="scbf-l">File Quyết định giải quyết bồi thường đã ký</span>' + fileHtml + '</div></div>';
    var inp = document.getElementById('formClaimSearchInput');
    inp.value = d.claimCode; inp.disabled = true;
    // Chế độ Sửa chữa, bổ sung: ẩn nút Tìm kiếm, Tìm kiếm nâng cao (Mã hồ sơ chỉ đọc)
    scbfSearchBtns(false);
    document.getElementById('selectedClaimBadge').style.display = 'none';
    toggleDecisionCards(true);
    scbfFill(d, d);
    var before = scbfFormSnap();
    var prev = resubmit && d.request ? d.request : null;
    if (prev && prev.formData) scbfFill(prev.formData, d);
    scbf = { id: d.id, before: before, auto: '', resubmit: resubmit };
    var auto = scbfDiffLines(before, scbfFormSnap()).join('\n');
    scbf.auto = auto;
    document.getElementById('scbfContent').value = prev && prev.content ? prev.content : auto;
    scbfRegenToggle();
    window.scrollTo(0, 0);
}
function scbfDirty() { return !!scbf && document.getElementById('scbfContent').value !== scbf.auto; }
function scbfRegenToggle() { var a = document.getElementById('scbfRegen'); if (a) a.style.display = scbfDirty() ? 'inline' : 'none'; }
function scbfOnContentInput() { markInvalid(document.getElementById('scbfContent'), false); scbfRegenToggle(); }
// Thông tin trên Form thay đổi: sinh lại nội dung; người dùng đã sửa tay thì giữ nguyên
function scbfOnFormChange() {
    if (!scbf || !form || !form.amendId) return;
    var dirty = scbfDirty();
    scbf.auto = scbfDiffLines(scbf.before, scbfFormSnap()).join('\n');
    if (!dirty) document.getElementById('scbfContent').value = scbf.auto;
    scbfRegenToggle();
}
function scbfRegenAsk() {
    showConfirmModal('Nội dung sửa chữa, bổ sung đang nhập sẽ được thay bằng nội dung sinh theo thông tin thay đổi trên Form. Tiếp tục?', function () {
        scbf.auto = scbfDiffLines(scbf.before, scbfFormSnap()).join('\n');
        document.getElementById('scbfContent').value = scbf.auto;
        scbfOnContentInput();
    }, 'Lấy lại theo thông tin thay đổi', 'Đồng ý', false);
}
// Tiếp tục: kiểm tra Form + Nội dung sửa chữa, bổ sung -> Popup Trình ký QĐ Sửa chữa, Bổ sung (Nội dung lấy theo Form)
function scbfContinue() {
    var ok = validateForm();
    var ta = document.getElementById('scbfContent');
    if (!ta.value.trim()) { markInvalid(ta, true); ok = false; if (!document.querySelector('#qdFormPanel .is-invalid:not(#scbfContent)')) { ta.scrollIntoView({ block: 'center' }); ta.focus(); } }
    if (!ok) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'error'); return; }
    var data = collectForm();
    scbf.formData = data;
    scbf.content = ta.value.trim();
    var after = scbfFormSnap();
    scbf.changed = scbfDiffLines(scbf.before, after).length > 0;
    openScbModal(form.amendId);
    var c = document.getElementById('scbContent');
    c.value = scbf.content; c.readOnly = true; c.style.background = '#f8fafc';
    scbfPopupHint(true);
}
function scbfPopupHint(on) {
    var c = document.getElementById('scbContent'); if (!c) return;
    var h = document.getElementById('scbfPopupHint');
    if (!h) { h = document.createElement('div'); h.id = 'scbfPopupHint'; h.style.cssText = 'font-size:12px;color:var(--text-muted);margin-top:4px;'; h.textContent = 'Theo Nội dung sửa chữa, bổ sung tại màn hình Sửa chữa, bổ sung Quyết định giải quyết bồi thường.'; c.parentNode.appendChild(h); }
    h.style.display = on ? 'block' : 'none';
}

// ---------- Áp nội dung khi Quyết định sửa chữa, bổ sung được ban hành ----------
function scbfContentFields(src) {
    return { nycName: src.nycName, nycAddress: src.nycAddress, items: JSON.parse(JSON.stringify(src.items || [])), total: num(src.total), advance: num(src.advance), net: num(src.total) - num(src.advance),
        adjustReason: src.adjustReason || '', recipient: JSON.parse(JSON.stringify(src.recipient || {})), payout: JSON.parse(JSON.stringify(src.payout || {})) };
}
function scbfAmendNo(d) {
    var n = 0; (d.amendments || []).forEach(function (a, i) { if (a && a.scbfChanged) n = i + 1; });
    return n;
}
function scbfApplyAmend(d, a) {
    if (!a || a.scbfApplied || !a.formData) return false;
    a.scbfApplied = true;
    var before = scbfOf(d), after = scbfOf(a.formData);
    var lines = scbfDiffLines(before, after);
    a.scbfBefore = scbfContentFields(d);
    if (!lines.length) { a.scbfChanged = false; return true; }
    if (!d.scbfOriginal) d.scbfOriginal = scbfContentFields(d);
    Object.assign(d, scbfContentFields(Object.assign({}, a.formData, { advance: d.advance })));
    a.scbfChanged = true;
    var n = (d.amendments || []).indexOf(a) + 1;
    if (typeof updateClaimInStorage === 'function') updateClaimInStorage(d.claimCode, { decAmount: d.total });
    if (scbfMoneyChanged(before, after) || scbfInfoChanged(before, after)) {
        var sd = a.signDoc || {};
        scbfEvent({
            kind: 'sc', id: d.id + ':sc:' + n, n: n, decId: d.id, claimCode: d.claimCode, decNo: d.decNo || '', decDate: d.issueDate || '',
            docNo: a.decNo || sd.docNo || '', docDate: a.issueDate || sd.docDate || String(a.at || '').split(' ').pop(), signMethod: a.signMethod || 'Ký số',
            file: a.signedFile || (a.draftDoc ? (a.draftDoc.uploadedName || a.draftDoc.generatedName || '') : ''),
            content: a.content || '', at: a.at || W.nowText(),
            before: scbfEvtSide(a.scbfBefore), after: scbfEvtSide(scbfContentFields(d)),
            moneyChanged: scbfMoneyChanged(before, after), infoChanged: scbfInfoChanged(before, after)
        });
    }
    return true;
}
function scbfEvtSide(c) { return { total: c.total, advance: c.advance, net: c.net, nycName: c.nycName, nycAddress: c.nycAddress, recipient: c.recipient, payout: c.payout }; }
function scbfEvent(ev) {
    var q = scbfRead(SCBF_EVT_KEY, []);
    if (!Array.isArray(q)) q = [];
    if (q.some(function (x) { return x && x.id === ev.id; })) return;
    q.push(ev);
    scbfWrite(SCBF_EVT_KEY, q);
}

// ---------- Bọc chức năng sẵn có ----------
(function () {
    if (typeof openRequest !== 'function' || typeof openScbModal !== 'function') return;
    scbfEnsureCards();
    var origReq = openRequest;
    openRequest = function (id, mode) { if (mode === 'cancel') return origReq.apply(this, arguments); return scbfOpen(id); };
    var origForm = openForm;
    openForm = function () { scbfShowCards(false); scbfSearchBtns(true); scbfPopupHint(false); scbf = null; var r = origForm.apply(this, arguments); return r; };
    var origSign = openQdSign;
    openQdSign = function () { if (form && form.amendId) return scbfContinue(); return origSign.apply(this, arguments); };
    // Mở Popup trực tiếp (không qua Form): bỏ chế độ chỉ đọc của Nội dung
    var origScb = openScbModal;
    openScbModal = function () { var r = origScb.apply(this, arguments); var c = document.getElementById('scbContent'); if (c) { c.readOnly = false; c.style.background = ''; } scbfPopupHint(false); return r; };
    var panel = document.getElementById('qdFormPanel');
    if (panel) {
        var h = function (e) { if (e.target && e.target.id !== 'scbfContent') scbfOnFormChange(); };
        panel.addEventListener('input', h); panel.addEventListener('change', h);
    }
    // Trình Lãnh đạo: lưu dữ liệu Form cùng phiếu trình
    var origSubmit = scbSubmit;
    scbSubmit = function () {
        var id = scb && scb.id, sf = scbf;
        var r = origSubmit.apply(this, arguments);
        var d = id ? getDec(id) : null;
        if (d && sf && sf.id === id && d.status === ST.CHO_DUYET && d.request && d.request.kind === KIND_SC && !d.request.formData) {
            d.request.formData = sf.formData; d.request.content = sf.content; d.request.scbfChangedOnForm = !!sf.changed;
            saveDecisions();
        }
        return r;
    };
    // Ký ngoài: ban hành trực tiếp -> áp nội dung Form, liên thông kinh phí
    var origOff = scbIssueOffline;
    scbIssueOffline = function (confirmed) {
        var id = scb && scb.id, sf = scbf;
        var d0 = id ? getDec(id) : null, len = d0 ? (d0.amendments || []).length : 0;
        var r = origOff.apply(this, arguments);
        var d = id ? getDec(id) : null;
        if (d && (d.amendments || []).length > len) {
            var a = d.amendments[d.amendments.length - 1];
            if (sf && sf.id === id) { a.content = sf.content; a.formData = sf.formData; }
            if (scbfApplyAmend(d, a)) { saveDecisions(); showList(); }
        }
        return r;
    };
    // Lãnh đạo cấp cuối Ký duyệt (đồng bộ từ hồ sơ luồng)
    var origSync = syncFromWorkflow;
    syncFromWorkflow = function () {
        var pend = {};
        (decisions || []).forEach(function (d) { if (d && d.status === ST.CHO_DUYET && d.wfKind === KIND_SC) pend[d.id] = { kind: d.wfKind, len: (d.amendments || []).length }; });
        var r = origSync.apply(this, arguments);
        var ch = false;
        Object.keys(pend).forEach(function (id) {
            var d = getDec(id); if (!d) return;
            if (pend[id].kind === KIND_SC && d.status !== ST.CHO_DUYET && (d.amendments || []).length > pend[id].len) { if (scbfApplyAmend(d, d.amendments[d.amendments.length - 1])) ch = true; }
        });
        if (ch) saveDecisions();
        return r;
    };
    // Văn bản Quyết định gốc đã ký: theo nội dung Quyết định gốc
    if (typeof ctqdDoc === 'function') {
        var origDoc = ctqdDoc;
        ctqdDoc = function (id, which) {
            var d = getDec(id);
            if (d && d.scbfOriginal && (which === 'signed' || which === 'draft')) { var x = origDoc.apply(this, arguments); if (x) x.html = buildQdDocHtml(Object.assign({}, d, d.scbfOriginal)); return x; }
            return origDoc.apply(this, arguments);
        };
    }
    var origView = viewQdDoc;
    viewQdDoc = function (id, which) {
        var d = getDec(id);
        if (d && d.scbfOriginal && which === 'signed') { W.openDocTab(buildQdDocHtml(Object.assign({}, d, d.scbfOriginal)), String(d.signedFile || qdSignedName(d)).replace(/\.[a-z]+$/i, '')); return; }
        return origView.apply(this, arguments);
    };
    // Danh sách: nhãn dưới Tổng số tiền bồi thường
    var origTable = renderDecTable;
    renderDecTable = function () {
        var r = origTable.apply(this, arguments);
        scbfCss();
        document.querySelectorAll('tr[data-id]').forEach(function (tr) {
            var d = getDec(tr.getAttribute('data-id')); var n = d ? scbfAmendNo(d) : 0;
            if (!n) return;
            var td = tr.querySelector('td[style*="text-align:right"]');
            if (td && !td.querySelector('.scbf-sub')) td.insertAdjacentHTML('beforeend', '<div class="scbf-sub">' + SCBF_LBL + ' lần ' + n + '</div>');
        });
        return r;
    };
    // Chi tiết: nhãn tại Tổng số tiền bồi thường (Khối Thông tin chung) và Khối Thông tin chi tiết Quyết định
    var origDetail = openDetail;
    openDetail = function (id) {
        var r = origDetail.apply(this, arguments);
        var d = getDec(id); var n = d ? scbfAmendNo(d) : 0;
        if (!n) return r;
        scbfCss();
        var lbl = SCBF_LBL + ' lần ' + n;
        document.querySelectorAll('#qdDetailPanel .dtl-item').forEach(function (it) {
            var l = it.querySelector('.dtl-label');
            if (l && /^Tổng số tiền bồi thường/.test(l.textContent) && !it.querySelector('.scbf-sub')) it.insertAdjacentHTML('beforeend', '<div class="scbf-sub">' + lbl + '</div>');
        });
        document.querySelectorAll('#qdDetailPanel summary.dtl-card-head').forEach(function (s) {
            if (/Thông tin chi tiết Quyết định/.test(s.textContent) && !s.querySelector('.scbf-sub')) s.insertAdjacentHTML('beforeend', '<span class="scbf-sub" style="margin-left:8px; text-transform:none;">' + lbl + '</span>');
        });
        return r;
    };
})();
