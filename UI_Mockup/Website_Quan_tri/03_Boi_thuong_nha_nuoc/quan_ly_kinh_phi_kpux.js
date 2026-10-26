/*
 * Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Chuẩn hóa UI/UX (prefix kpux), nạp sau quan_ly_kinh_phi_kpdc.js
 * 1. Lưới MH01: cột Thao tác cố định 01 bộ nút, cùng vị trí trên mọi dòng; nút không được phép hiển thị mờ, có tooltip lý do.
 *    - Lãnh đạo: Ký duyệt, Từ chối. Cán bộ xử lý: Cập nhật Quyết định tạm ứng, Trình thông báo chi trả,
 *      Đề nghị cấp bổ sung kinh phí, Cập nhật chi trả, Sung quỹ nhà nước (bỏ luồng Chờ lập đề nghị: Lập đề nghị, Xóa).
 * 2. "Cập nhật chi trả" thống nhất cho mọi loại: mở màn hình chi tiết (cùng hàm render kpdtAdvBody / kpdtPayBody),
 *    các khối phía trên thu gọn, cuộn + focus khối "Thông tin kết quả chi trả thực tế" (không có Số biên lai nhận tiền mặt).
 *    Bỏ thao tác "Đính kèm văn bản đã ký": Quyết định tạm ứng Ký ngoài đã có văn bản đã ký khi chuyển Chờ chi trả.
 * 3. Xem chi tiết: lưới nhãn - giá trị gọn (04 cột trên màn rộng), Footer nút cố định, nút "Đóng" chỉ ở Footer.
 * 4. Bảng Tài liệu kèm theo chỉ hiển thị khi có dữ liệu.
 * 5. Khối "Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường": chỉ loại Chi trả tiền bồi thường,
 *    sau khi Thông báo chi trả đã ký (Chờ chi trả trở đi); Cán bộ cập nhật được khi Chờ chi trả.
 */
(function () {
    'use strict';
    if (window.__kpux) return;
    window.__kpux = true;

    var CSS = [
        // ---- Lưới MH01: nút thao tác ----
        '#proposalsTableBody .kpux-acts { display:flex; justify-content:center; gap:4px; flex-wrap:nowrap; }',
        '#proposalsTableBody .kpux-act.is-off { opacity:.35; cursor:not-allowed; }',
        '#proposalsTableBody .kpux-act.is-off:hover { transform:none; box-shadow:none; }',
        // ---- Xem chi tiết: lưới nhãn - giá trị gọn ----
        'body #kpdtPanel .inline-form-body { padding:16px 20px; }',
        'body #kpdtPanel .kpdt-card { margin-bottom:12px; }',
        'body #kpdtPanel .kpdt-card-head { padding:9px 14px; }',
        'body #kpdtPanel .kpdt-card-body { padding:12px 16px 14px; }',
        'body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3 { grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px 24px; }',
        'body #kpdtPanel .kpdt-grid > div:empty { display:none; }',
        'body #kpdtPanel .kpdt-fld .form-label { display:block; margin:0 0 3px; font-size:12px; font-weight:600; color:#64748b; line-height:1.35; text-transform:none; letter-spacing:0; }',
        'body #kpdtPanel .kpdt-ro { background:transparent; border:0; border-radius:0; padding:0; min-height:0; font-size:13.5px; font-weight:600; color:#0f172a; line-height:1.45; }',
        'body #kpdtPanel .kpdt-words { margin-top:2px; }',
        'body #kpdtPanel .kpdt-hint { margin-top:10px; }',
        'body #kpdtPanel .kpdt-full > .kpdt-docs-box, body #kpdtPanel .kpdt-card-body > .kpdt-docs-box { margin-top:2px; }',
        'body #kpdtPanel .kpdt-card-head.kpdt-toggle { cursor:pointer; user-select:none; }',
        'body #kpdtPanel .kpux-head-btns { margin-left:auto; display:flex; gap:6px; text-transform:none; letter-spacing:0; }',
        'body #kpdtPanel .kpux-head-btns .btn { padding:3px 10px; font-size:12px; font-weight:600; }',
        'body #kpdtPanel .kpux-head-btns + .kpdt-chev { margin-left:8px; }',
        // Footer cố định cuối màn hình khi xem chi tiết
        'body #kpdtPanel .inline-form-footer { position:sticky; bottom:0; z-index:30; background:#fff; box-shadow:0 -4px 12px rgba(15,23,42,.08); }',
        // ---- Khối nhập Thông tin kết quả chi trả thực tế / Cập nhật thông báo ----
        'body #kpdtPanel .kpux-pay { border-color:#86efac; box-shadow:0 0 0 3px rgba(22,163,74,.10); scroll-margin-top:16px; }',
        'body #kpdtPanel .kpux-form { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px 20px; }',
        'body #kpdtPanel .kpux-form .kpux-f { min-width:0; }',
        'body #kpdtPanel .kpux-form .kpux-full { grid-column:1/-1; }',
        'body #kpdtPanel .kpux-form .kpux-span2 { grid-column:span 2; }',
        'body #kpdtPanel .kpux-form .form-label { display:block; margin-bottom:4px; font-size:12.5px; font-weight:600; color:#334155; }',
        'body #kpdtPanel .kpux-req { color:#dc2626; margin-left:2px; }',
        'body #kpdtPanel .kpdt-card-head:focus { outline:none; }',
        'body #kpdtPanel .kpux-form textarea.form-control { font-family:inherit; }',
        'body #kpdtPanel .kpux-form .form-control.is-invalid { border-color:#dc2626 !important; box-shadow:0 0 0 2px rgba(220,38,38,.12); }',
        'body #kpdtPanel .kpux-err { display:none; color:#dc2626; font-size:12px; margin-top:4px; }',
        'body #kpdtPanel .kpux-err.on { display:block; }',
        'body #kpdtPanel .kpux-radios { display:flex; gap:24px; align-items:center; min-height:36px; }',
        'body #kpdtPanel .kpux-radios label { display:flex; align-items:center; gap:6px; font-weight:600; font-size:13.5px; cursor:pointer; color:#1e293b; }',
        'body #kpdtPanel .kpux-sub { grid-column:1/-1; font-size:12px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.3px; border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-top:2px; }',
        'body #kpdtPanel .kpux-ro { font-size:13.5px; font-weight:700; color:#0f172a; min-height:36px; display:flex; align-items:center; }',
        '@media (max-width: 1200px) { body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3, body #kpdtPanel .kpux-form { grid-template-columns:repeat(3, minmax(0,1fr)); } }',
        '@media (max-width: 900px) { body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3, body #kpdtPanel .kpux-form { grid-template-columns:repeat(2, minmax(0,1fr)); } }',
        '@media (max-width: 600px) { body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3, body #kpdtPanel .kpux-form { grid-template-columns:1fr; } #kpdtPanel .kpux-form .kpux-span2 { grid-column:1/-1; } }'
    ].join('\n');
    function injectCss() {
        if (document.getElementById('kpuxCss')) return;
        var st = document.createElement('style');
        st.id = 'kpuxCss';
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    var esc = function (v) { return kpEsc(v); };
    var el = function (id) { return document.getElementById(id); };
    var isTb = function (it) { return typeof kptbIs === 'function' && kptbIs(it); };
    var isQd = function (it) { return typeof qdtuIs === 'function' && qdtuIs(it); };
    var fmt = function (n) { return (Number(n) || 0).toLocaleString('vi-VN'); };
    var today = function () { var d = new Date(); d.setHours(0, 0, 0, 0); return d; };
    var todayText = function () { return formatDateViGlobal(new Date()); };

    // ================= 1. Lưới MH01: bộ thao tác cố định =================
    function actDefs(item) {
        var id = item.id;
        var st = kpNormStatus(item.status);
        var tb = isTb(item), qd = isQd(item);
        var elig = getTreasuryInfo(item).isEligible;
        if (kpRole() === 'lanh-dao') {
            var can = qd ? qdtuCanAct(item) : (tb ? kptbCanAct(item) : st === 'Chờ duyệt');
            var offLd = 'chỉ thực hiện với bản ghi Chờ duyệt được giao cho Lãnh đạo tại cấp ký duyệt hiện hành';
            return [
                { t: 'Ký duyệt', ic: 'fa-solid fa-file-signature', cls: 'accept sign', on: can, js: "openApproveModal('" + id + "')", off: offLd },
                { t: 'Từ chối', ic: 'fa-solid fa-ban', cls: 'delete reject', on: can, js: "openRejectModal('" + id + "')", off: offLd }
            ];
        }
        return [
            { t: 'Cập nhật Quyết định tạm ứng', ic: 'fa-solid fa-pen-to-square', cls: 'edit', on: st === 'Bị từ chối' && qd, js: "qdtuOpenPage('" + id + "')", dt: "kpdtGo('qdtuOpenPage','" + id + "')", off: 'chỉ thực hiện với bản ghi Tạm ứng kinh phí Bị từ chối' },
            { t: 'Trình thông báo chi trả', ic: 'fa-solid fa-paper-plane', cls: 'edit', on: tb && kptbCanSubmit(item), js: "kptbOpenSign('" + id + "')", off: 'chỉ thực hiện với bản ghi Chi trả tiền bồi thường Chờ thông báo chi trả, Đề nghị cấp bổ sung kinh phí, Bị từ chối' },
            { t: 'Đề nghị cấp bổ sung kinh phí', ic: 'fa-solid fa-file-invoice-dollar', cls: '', on: tb && st === KPTB_ST.WAIT, js: "kptbOpenSupp('" + id + "')", off: 'chỉ thực hiện với bản ghi Chi trả tiền bồi thường Chờ thông báo chi trả' },
            { t: 'Cập nhật chi trả', ic: 'fa-solid fa-hand-holding-dollar', cls: 'accept', on: st === 'Chờ chi trả' && !elig, js: "kpuxOpenPay('" + id + "')", off: (st === 'Chờ chi trả' && elig) ? 'khoản chi đã quá hạn 03 năm kể từ ngày nhận thông báo, chỉ được Sung quỹ nhà nước' : 'chỉ thực hiện với bản ghi Chờ chi trả còn trong hạn 03 năm' },
            { t: 'Sung quỹ nhà nước', ic: 'fa-solid fa-building-columns', cls: 'reject', on: elig, js: "forfeitProposalDirect('" + id + "')", dt: tb ? "kptbOpenForfeit('" + id + "')" : "kpdtGo('forfeitProposalDirect','" + id + "')", off: 'chỉ thực hiện với bản ghi Chờ chi trả đã quá hạn 03 năm kể từ ngày nhận thông báo' }
        ];
    }
    function actsHtml(item) {
        return '<div class="kpux-acts">' + actDefs(item).map(function (a) {
            return a.on
                ? '<button type="button" class="icon-btn kpux-act ' + a.cls + '" data-admin-icon-normalized="1" title="' + esc(a.t) + '" onclick="event.stopPropagation(); ' + a.js + '"><i class="' + a.ic + '"></i></button>'
                : '<button type="button" class="icon-btn kpux-act is-off ' + a.cls + '" data-admin-icon-normalized="1" aria-disabled="true" title="' + esc(a.t + ': ' + a.off) + '" onclick="event.stopPropagation();"><i class="' + a.ic + '"></i></button>';
        }).join('') + '</div>';
    }
    function decorateTable() {
        var tbody = el('proposalsTableBody'); if (!tbody) return;
        Array.prototype.forEach.call(tbody.rows, function (tr) {
            if (tr.cells.length < 11) return;
            var code = tr.cells[1].innerText.trim();
            var item = proposalsList.find(function (p) { return p && p.code === code; });
            if (!item) return;
            var box = tr.cells[tr.cells.length - 1].querySelector('.action-flex') || tr.cells[tr.cells.length - 1];
            box.innerHTML = actsHtml(item);
        });
    }

    // ================= 2. Dữ liệu: Ký ngoài đã có văn bản đã ký khi Chờ chi trả =================
    function sanitize() {
        var n = 0;
        // Bỏ luồng "Chờ lập đề nghị": bản ghi Tạm ứng tạo tại Tạo QĐ tạm ứng, bản ghi Chi trả tạo tự động / Tạo thông báo chi trả
        var i = KP_PENDING_STATES.indexOf('Chờ lập đề nghị'); if (i >= 0) KP_PENDING_STATES.splice(i, 1);
        var keep = proposalsList.filter(function (p) { return !p || p.status !== 'Chờ lập đề nghị'; });
        if (keep.length !== proposalsList.length) { proposalsList = keep; n++; }
        proposalsList.forEach(function (p) {
            if (p && kpIsAdv(p) && p.signMethod === KP_SIGN_OUTSIDE && !p.qdtu && !p.signedFile && ['Chờ chi trả', 'Hoàn thành', 'Sung quỹ nhà nước'].indexOf(kpNormStatus(p.status)) >= 0) {
                p.signedFile = 'QD_tam_ung_' + p.code + '_ky_ngoai.pdf';
                if (!p.docNo) p.docNo = '96/QĐ-STC';
                if (!p.docDate) p.docDate = '10/10/2026';
                n++;
            }
        });
        if (n) saveProposalsToLocal();
    }

    // ================= 3. Xem chi tiết =================
    var payId = null;      // bản ghi đang ở chế độ Cập nhật chi trả
    var ntEditId = null;   // bản ghi đang sửa khối thông báo
    var NT_STATES = ['Chờ chi trả', 'Hoàn thành', 'Sung quỹ nhà nước', 'Chờ thu hồi', 'Đã thu hồi'];
    function noticeVisible(item) {
        if (!item || kpIsAdv(item)) return false;
        var st = kpNormStatus(item.status);
        return NT_STATES.indexOf(st) >= 0 || (st === 'Đã hủy' && !!item.noticeReceivedDate);
    }
    function noticeDocs(item) { return item.noticeFiles || item.noticeProofFile || []; }
    function deadlineText(d) {
        var p = parseDateViGlobal(d); if (!p) return '';
        return formatDateViGlobal(addYearsToDate(p, 3));
    }
    function headBtn(cls, icon, label, js) { return '<button type="button" class="btn ' + cls + ' btn-sm" onclick="' + js + '"><i class="fa-solid ' + icon + '"></i> ' + label + '</button>'; }
    function noticeCardHtml(item) {
        var st = kpNormStatus(item.status);
        var canEdit = kpRole() !== 'lanh-dao' && st === 'Chờ chi trả' && !payId;
        var editing = canEdit && ntEditId === item.id;
        var title = 'Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường';
        var btns = editing
            ? headBtn('btn-secondary', 'fa-xmark', 'Hủy', 'kpuxNoticeCancel()') + headBtn('btn-primary', 'fa-floppy-disk', 'Lưu thông báo', "kpuxNoticeSave('" + item.id + "')")
            : (canEdit ? headBtn('btn-outline-primary', 'fa-pen-to-square', 'Cập nhật thông báo', "kpuxNoticeEdit('" + item.id + "')") : '');
        var body;
        if (editing) {
            body = '<div class="kpux-form">'
                + '<div class="kpux-f"><label class="form-label" for="kpuxNtDate">Ngày người yêu cầu nhận thông báo<span class="kpux-req">*</span></label><input type="text" class="form-control" id="kpuxNtDate" placeholder="dd/mm/yyyy" value="' + esc(item.noticeReceivedDate || '') + '" oninput="kpuxNtPreview()" onchange="kpuxNtPreview()"><div class="kpux-err" id="kpuxNtDateErr">Đây là trường bắt buộc</div></div>'
                + '<div class="kpux-f"><span class="form-label">Hạn nhận tiền bồi thường</span><div class="kpux-ro" id="kpuxNtDeadline">' + esc(deadlineText(item.noticeReceivedDate) || '-') + '</div></div>'
                + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxNtNote">Ghi chú thông báo</label><textarea class="form-control" id="kpuxNtNote" rows="2" maxlength="1000" placeholder="Nhập hình thức gửi, kết quả liên hệ...">' + esc(item.noticeNote || '') + '</textarea></div>'
                + '<div class="kpux-f kpux-full" id="kpuxNtTlkt"></div></div>';
        } else {
            body = '<div class="kpdt-grid">' + kpdtFld('Ngày người yêu cầu nhận thông báo', esc(item.noticeReceivedDate || ''))
                + kpdtFld('Hạn nhận tiền bồi thường', esc(deadlineText(item.noticeReceivedDate)))
                + (item.noticeNote ? kpdtFld('Ghi chú thông báo', esc(item.noticeNote), true) : '')
                + '<div class="kpdt-full">' + kpdtDocsHtml(noticeDocs(item)) + '</div></div>'
                + '<div class="kpdt-hint">Hạn nhận tiền bồi thường: 03 năm kể từ ngày người yêu cầu nhận được thông báo.</div>';
        }
        return '<div class="kpdt-card" id="kpuxNoticeCard"><div class="kpdt-card-head"><i class="fa-solid fa-bell"></i> ' + title
            + (btns ? '<span class="kpux-head-btns" onclick="event.stopPropagation();">' + btns + '</span>' : '') + '</div><div class="kpdt-card-body">' + body + '</div></div>';
    }
    // Khối thu gọn / mở rộng: click tiêu đề
    function makeToggle(card) {
        var head = card.querySelector(':scope > .kpdt-card-head'); if (!head) return;
        if (!head.classList.contains('kpdt-toggle')) {
            head.classList.add('kpdt-toggle');
            head.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-chevron-down kpdt-chev"></i>');
            head.addEventListener('click', function () { card.classList.toggle('collapsed'); });
        }
    }
    function postRender(item) {
        var body = el('kpdtBody'); if (!body) return;
        // Bỏ nút ở góc trên bên phải (Đóng chỉ ở Footer)
        var hb = document.querySelector('body #kpdtPanel .kpdt-head-right button'); if (hb) hb.remove();
        // Khối Theo dõi hạn nhận -> khối Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường
        Array.prototype.slice.call(body.querySelectorAll('.kpdt-card')).forEach(function (c) {
            var h = c.querySelector('.kpdt-card-head');
            if (h && /Theo dõi hạn nhận kinh phí/i.test(h.textContent)) {
                if (noticeVisible(item)) c.outerHTML = noticeCardHtml(item); else c.remove();
            }
        });
        // Khối chỉ chứa bảng Tài liệu kèm theo mà không có dữ liệu: ẩn cả khối
        Array.prototype.slice.call(body.querySelectorAll('.kpdt-card')).forEach(function (c) {
            var b = c.querySelector(':scope > .kpdt-card-body');
            if (b && !b.textContent.trim() && !b.querySelector('input,textarea,select,table,img')) c.remove();
        });
        Array.prototype.slice.call(body.querySelectorAll(':scope > .kpdt-card')).forEach(function (c) { if (c.id !== 'kpdtHistCard') makeToggle(c); });
        if (ntEditId === item.id && el('kpuxNtTlkt') && typeof tlktMount === 'function') {
            tlktMount('kpuxNt', 'kpuxNtTlkt', { required: false, rows: (item.noticeFiles || []).slice(), secClass: '', titleClass: 'form-label', noLeader: true });
            if (window.flatpickr) flatpickr('#kpuxNtDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date(), onChange: function () { window.kpuxNtPreview(); } });
        }
        if (payId === item.id) renderPayMode(item, body);
    }

    // ================= 4. Cập nhật chi trả =================
    function prefill(item) {
        if (kpIsAdv(item)) {
            var f = kpdtAdvData(item);
            return { name: f.recName, address: f.recAddress, method: /tiền mặt/i.test(f.payMethod || '') ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản', accHolder: f.accHolder, account: f.account, bank: f.bank, branch: f.branch };
        }
        if (isTb(item)) {
            var dec = item.kptbDec || {}, po = dec.payout || {}, r = dec.recipient || {};
            return { name: r.name || item.nycName, address: r.address || item.payoutRecAddress || '', method: kptbMethod(item), accHolder: po.accHolder || r.name || '', account: po.account || r.account || '', bank: po.bank || r.bank || '', branch: po.branch || r.branch || '' };
        }
        var c = (typeof mockClaims !== 'undefined' && mockClaims.find(function (x) { return x.code === item.ycbtCode; })) || {};
        return { name: item.payoutRecName || item.nycName, address: item.payoutRecAddress || c.address || '', method: /tiền mặt/i.test(item.payoutMethod || '') ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản', accHolder: item.payoutBankUser || '', account: item.payoutBankAccount || '', bank: item.payoutBankName || '', branch: item.payoutBankBranch || '' };
    }
    function fld(id, label, req, val, extra, cls) {
        return '<div class="kpux-f' + (cls ? ' ' + cls : '') + '"><label class="form-label" for="' + id + '">' + label + (req ? '<span class="kpux-req">*</span>' : '') + '</label>'
            + '<input type="text" class="form-control" id="' + id + '" value="' + esc(val || '') + '" ' + (extra || '') + ' oninput="kpuxClr(this)"><div class="kpux-err" id="' + id + 'Err">Đây là trường bắt buộc</div></div>';
    }
    function renderPayMode(item, body) {
        // Các khối phía trên thu gọn (giữ nguyên nội dung như Xem chi tiết)
        Array.prototype.forEach.call(body.querySelectorAll(':scope > .kpdt-card'), function (c) { c.classList.add('collapsed'); });
        var pf = prefill(item);
        var cash = pf.method === 'Nhận tiền mặt';
        var html = '<div class="kpdt-card kpux-pay" id="kpuxPayCard"><div class="kpdt-card-head"><i class="fa-solid fa-cash-register"></i> Thông tin kết quả chi trả thực tế</div><div class="kpdt-card-body"><div class="kpux-form">'
            + fld('kpuxPayDate', 'Ngày thực hiện chi trả', true, todayText(), 'placeholder="dd/mm/yyyy"')
            + fld('kpuxPayAmount', 'Số tiền thực tế chi trả (VNĐ)', true, fmt(item.amount), 'maxlength="20" style="text-align:right;" oninput="formatNumberInput(this); kpuxClr(this)" placeholder="Nhập số tiền thực tế chi trả..."')
            + '<div class="kpux-f kpux-span2"><span class="form-label">Phương thức chi trả thực tế<span class="kpux-req">*</span></span><div class="kpux-radios">'
            + '<label><input type="radio" name="kpuxPayMethod" value="Nhận qua chuyển khoản"' + (cash ? '' : ' checked') + ' onchange="kpuxPayMethod(this.value)"> Nhận qua chuyển khoản</label>'
            + '<label><input type="radio" name="kpuxPayMethod" value="Nhận tiền mặt"' + (cash ? ' checked' : '') + ' onchange="kpuxPayMethod(this.value)"> Nhận tiền mặt</label></div></div>'
            + '<div class="kpux-sub">Thông tin người nhận chi trả</div>'
            + fld('kpuxPayRecName', 'Họ và tên người nhận', true, pf.name, 'maxlength="255" placeholder="Nhập họ tên người nhận..."')
            + fld('kpuxPayRecAddress', 'Địa chỉ người nhận', true, pf.address, 'maxlength="500" placeholder="Nhập địa chỉ..."', 'kpux-span2')
            + '<div class="kpux-f" aria-hidden="true"></div>'
            + '<div id="kpuxPayBank" style="display:' + (cash ? 'none' : 'contents') + ';">'
            + fld('kpuxPayAccount', 'Số tài khoản chuyển', true, pf.account, 'maxlength="30" placeholder="Nhập số tài khoản chuyển..."')
            + fld('kpuxPayAccHolder', 'Tên chủ tài khoản nhận', true, pf.accHolder, 'maxlength="255" placeholder="Nhập tên chủ tài khoản nhận..."')
            + fld('kpuxPayBankName', 'Tên ngân hàng nhận', true, pf.bank, 'maxlength="255" placeholder="Nhập tên ngân hàng nhận..."')
            + fld('kpuxPayBranch', 'Chi nhánh ngân hàng nhận', false, pf.branch, 'maxlength="255" placeholder="Nhập chi nhánh ngân hàng nhận..."')
            + '</div>'
            + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxPayNote">Ý kiến / Nội dung thực hiện chi trả</label><textarea class="form-control" id="kpuxPayNote" rows="2" maxlength="1000" placeholder="Nhập ghi chú chi tiết quá trình chi trả (nếu có)..."></textarea></div>'
            + '<div class="kpux-f kpux-full" id="kpuxPayTlkt"></div>'
            + '</div></div></div>';
        var hist = el('kpdtHistCard');
        if (hist && hist.parentNode === body) hist.insertAdjacentHTML('beforebegin', html); else body.insertAdjacentHTML('beforeend', html);
        if (typeof tlktMount === 'function') tlktMount('kpuxPay', 'kpuxPayTlkt', { required: false, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
        if (window.flatpickr) flatpickr('#kpuxPayDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date() });
        // Tiêu đề, Footer của chế độ Cập nhật chi trả
        el('kpdtTitle').innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> CẬP NHẬT CHI TRẢ: ' + esc(item.code);
        el('kpdtFoot').innerHTML = '<button type="button" class="btn btn-secondary" onclick="kpuxPayCancel()"><i class="fa-solid fa-xmark"></i> Hủy</button>'
            + '<button type="button" class="btn btn-success" onclick="kpuxPaySave()"><i class="fa-solid fa-circle-check"></i> Hoàn thành chi trả</button>';
    }
    function focusPay() {
        var c = el('kpuxPayCard'); if (!c) return;
        c.scrollIntoView({ block: 'start' });
        // Focus vào khối (tiêu đề khối), không mở lịch chọn ngày
        var h = c.querySelector('.kpdt-card-head'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
    }
    window.kpuxOpenPay = function (id) {
        var item = kpdtFind(id); if (!item) return;
        if (kpNormStatus(item.status) !== 'Chờ chi trả') { showToast('Chỉ Cập nhật chi trả với bản ghi Chờ chi trả.', 'warning'); return; }
        if (getTreasuryInfo(item).isEligible) { showToast('Khoản chi đã quá hạn 03 năm kể từ ngày nhận thông báo, chỉ được thực hiện Sung quỹ nhà nước.', 'warning'); return; }
        if (typeof kptbCloseView === 'function') kptbCloseView();
        payId = item.id; ntEditId = null;
        kpdtOpen(item.id, { kpuxKeep: true });
        setTimeout(focusPay, 30);
    };
    window.kpuxPayCancel = function () { var id = payId; payId = null; var it = kpdtFind(id); if (it) { kpdtRender(it); window.scrollTo(0, 0); } };
    window.kpuxClr = function (inp) { inp.classList.remove('is-invalid'); var e = el(inp.id + 'Err'); if (e) e.classList.remove('on'); };
    window.kpuxPayMethod = function (v) { var b = el('kpuxPayBank'); if (b) b.style.display = v === 'Nhận tiền mặt' ? 'none' : 'contents'; };
    function mark(id, msg) { var i = el(id), e = el(id + 'Err'); if (i) i.classList.add('is-invalid'); if (e) { e.textContent = msg || 'Đây là trường bắt buộc'; e.classList.add('on'); } }
    window.kpuxPaySave = function () {
        var item = kpdtFind(payId); if (!item) return;
        var v = function (id) { return el(id) ? el(id).value.trim() : ''; };
        var m = document.querySelector('input[name="kpuxPayMethod"]:checked');
        var method = m ? m.value : 'Nhận qua chuyển khoản';
        var cash = method === 'Nhận tiền mặt';
        var req = ['kpuxPayDate', 'kpuxPayAmount', 'kpuxPayRecName', 'kpuxPayRecAddress'].concat(cash ? [] : ['kpuxPayAccount', 'kpuxPayAccHolder', 'kpuxPayBankName']);
        var first = null;
        req.forEach(function (id) { if (!v(id)) { mark(id); if (!first) first = id; } });
        var d = parseDateViGlobal(v('kpuxPayDate'));
        if (v('kpuxPayDate') && (!d || d > today())) { mark('kpuxPayDate', d ? 'Ngày chi trả không được lớn hơn ngày hiện tại' : 'Ngày không hợp lệ, định dạng dd/mm/yyyy'); if (!first) first = 'kpuxPayDate'; }
        var approved = Number(item.amount) || 0;
        var amt = parseFloat(v('kpuxPayAmount').replace(/\D/g, '')) || 0;
        if (v('kpuxPayAmount') && (amt <= 0 || amt > approved)) { mark('kpuxPayAmount', amt <= 0 ? 'Số tiền thực tế chi trả phải lớn hơn 0' : 'Số tiền thực tế chi trả không được vượt quá số tiền đã duyệt (' + fmt(approved) + ' đồng)'); if (!first) first = 'kpuxPayAmount'; }
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxPay') : true;
        if (first) { el(first).focus(); return; }
        if (!tlOk) return;
        var files = typeof tlktGet === 'function' ? tlktGet('kpuxPay') : [];
        var amount = amt;
        var data = { payDate: v('kpuxPayDate'), method: method, recName: v('kpuxPayRecName'), address: v('kpuxPayRecAddress'), account: cash ? '' : v('kpuxPayAccount'), accHolder: cash ? '' : v('kpuxPayAccHolder'), bank: cash ? '' : v('kpuxPayBankName'), branch: cash ? '' : v('kpuxPayBranch'), note: v('kpuxPayNote') };
        var detail = cash ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản (STK: <strong>' + esc(data.account) + '</strong> - ' + esc(data.bank) + ', Chủ TK: <strong>' + esc(data.accHolder) + '</strong>)';
        var html = '<div style="text-align:left; font-size:13.5px; color:#334155;"><div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:12px; margin-bottom:12px; line-height:1.6;">'
            + '<div>• <strong>Mã kinh phí:</strong> ' + esc(item.code) + '</div><div>• <strong>Họ và tên người nhận:</strong> ' + esc(data.recName) + '</div>'
            + '<div>• <strong>Phương thức chi trả:</strong> ' + detail + '</div><div>• <strong>Ngày chi trả:</strong> ' + esc(data.payDate) + '</div>'
            + '<div>• <strong>Số tiền thực tế chi trả:</strong> <span style="font-weight:700;">' + fmt(amount) + ' VNĐ</span> (' + esc(docTienBangChu(amount)) + ')</div></div>'
            + '<p style="margin:0;">Bạn có chắc chắn muốn xác nhận hoàn thành chi trả số tiền <strong>' + fmt(amount) + ' VNĐ</strong> cho người nhận <strong>' + esc(data.recName) + '</strong> không? Sau khi xác nhận, bản ghi chuyển trạng thái <strong>Hoàn thành</strong>.</p></div>';
        showConfirmModal(html, function () { applyPay(item, data, amount, files); }, 'Xác nhận hoàn thành chi trả kinh phí bồi thường');
    };
    function applyPay(item, data, amount, files) {
        var cash = data.method === 'Nhận tiền mặt';
        item.status = 'Hoàn thành';
        item.payoutDate = data.payDate; item.payoutAmountReal = amount; item.payoutMethod = data.method;
        item.payoutRecName = data.recName; item.payoutRecAddress = data.address; item.payoutNote = data.note;
        item.payoutBankAccount = data.account; item.payoutBankUser = data.accHolder; item.payoutBankName = data.bank; item.payoutBankBranch = data.branch;
        item.payoutReceiptNo = '';
        item.payoutFiles = files; item.payoutFile = files.map(function (f) { return (f.file && f.file.name) || f.name; }).join(', ');
        var note = 'Ngày chi trả ' + data.payDate + '; số tiền ' + fmt(amount) + ' đồng; ' + data.method + '.';
        if (isTb(item)) {
            var me = kptbMe();
            item.kptbPayment = cash
                ? { method: KPTB_CASH, recName: data.recName, recIdNo: '', address: data.address, payDate: data.payDate, amount: amount, files: files, note: data.note, at: kptbNow(), by: me }
                : { method: KPTB_TRANSFER, accHolder: data.accHolder, account: data.account, bank: data.bank, branch: data.branch, recName: data.recName, address: data.address, payDate: data.payDate, amount: amount, files: files, note: data.note, at: kptbNow(), by: me };
            if (me) item.user = kptbUserName(me);
            kptbHist(item, 'Cập nhật chi trả', note);
        } else if (isQd(item)) {
            qdtuHist(item, 'Cập nhật chi trả', note);
        }
        saveProposalsToLocal();
        payId = null;
        renderProposalsTable();
        if (typeof updateBudgetStats === 'function') updateBudgetStats();
        window.scrollTo(0, 0);
        showToast('Cập nhật kết quả chi trả kinh phí bồi thường thành công! Bản ghi ' + item.code + ' chuyển Hoàn thành.', 'success');
    }

    // ================= 5. Cập nhật thông báo (khối Thông tin thông báo chi trả ...) =================
    window.kpuxNoticeEdit = function (id) { var it = kpdtFind(id); if (!it) return; ntEditId = id; kpdtRender(it); var c = el('kpuxNoticeCard'); if (c) c.scrollIntoView({ block: 'center' }); };
    window.kpuxNoticeCancel = function () { var it = kpdtFind(ntEditId); ntEditId = null; if (it) kpdtRender(it); };
    window.kpuxNtPreview = function () { var i = el('kpuxNtDate'), o = el('kpuxNtDeadline'); if (i && o) { o.textContent = deadlineText(i.value.trim()) || '-'; window.kpuxClr(i); } };
    window.kpuxNoticeSave = function (id) {
        var item = kpdtFind(id); if (!item) return;
        var dv = el('kpuxNtDate') ? el('kpuxNtDate').value.trim() : '';
        var d = parseDateViGlobal(dv);
        var bad = !dv ? 'Đây là trường bắt buộc' : (!d ? 'Ngày không hợp lệ, định dạng dd/mm/yyyy' : (d > today() ? 'Ngày nhận thông báo không được lớn hơn ngày hiện tại' : ''));
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxNt') : true;
        if (bad) { mark('kpuxNtDate', bad); el('kpuxNtDate').focus(); return; }
        if (!tlOk) return;
        item.noticeReceivedDate = dv;
        item.noticeNote = el('kpuxNtNote') ? el('kpuxNtNote').value.trim() : '';
        item.noticeFiles = typeof tlktGet === 'function' ? tlktGet('kpuxNt') : [];
        var note = 'Ngày người yêu cầu nhận thông báo ' + dv + '; hạn nhận tiền bồi thường ' + deadlineText(dv) + '.';
        if (isTb(item)) kptbHist(item, 'Cập nhật thông báo chi trả', note);
        saveProposalsToLocal();
        ntEditId = null;
        renderProposalsTable();
        showToast('Lưu thông tin thông báo chi trả tiền bồi thường thành công!', 'success');
    };

    // ================= Bọc chức năng sẵn có =================
    injectCss();
    // Footer chi tiết: thao tác theo trạng thái + "Đóng" (thay "Quay lại danh sách")
    kpdtButtons = function (item) {
        var b = function (cls, icon, label, js) { return '<button type="button" class="btn ' + cls + '" onclick="' + js + '"><i class="' + icon + '"></i> ' + label + '</button>'; };
        var h = '';
        var ld = kpRole() === 'lanh-dao';
        actDefs(item).forEach(function (a) {
            if (!a.on || a.noFoot) return;
            var cls = ld ? (a.t === 'Từ chối' ? 'btn-danger' : 'btn-primary') : (a.t === 'Cập nhật chi trả' ? 'btn-success' : (a.t === 'Sung quỹ nhà nước' ? 'btn-danger' : (a.t === 'Đề nghị cấp bổ sung kinh phí' ? 'btn-secondary' : 'btn-primary')));
            h += b(cls, a.ic, a.t, a.dt || a.js);
        });
        return b('btn-secondary', 'fa-solid fa-xmark', 'Đóng', 'kpdtClose()') + h;
    };
    var origRenderDt = kpdtRender;
    kpdtRender = function (item) { var r = origRenderDt.apply(this, arguments); try { postRender(item); } catch (e) { console.error(e); } return r; };
    var origOpen = kpdtOpen;
    kpdtOpen = function (key, opts) { if (!(opts && opts.kpuxKeep)) { payId = null; ntEditId = null; } return origOpen.apply(this, arguments); };
    var origClose = kpdtClose;
    kpdtClose = function () { payId = null; ntEditId = null; return origClose.apply(this, arguments); };
    // Tài liệu kèm theo chế độ xem: không có dữ liệu thì không hiển thị bảng
    var origDocs = kpdtDocsHtml;
    kpdtDocsHtml = function (list) { return kpdtDocsNorm(list).length ? origDocs.apply(this, arguments) : ''; };
    // Ký ngoài: không còn thao tác Đính kèm văn bản đã ký
    if (typeof kpNeedsSignedFile === 'function') kpNeedsSignedFile = function () { return false; };
    // Cập nhật chi trả: mọi điểm gọi dùng chung màn hình chi tiết
    payProposalDirect = function (id) { window.kpuxOpenPay(id); };
    if (typeof kptbOpenPay === 'function') kptbOpenPay = function (id) { window.kpuxOpenPay(id); };
    var origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () { var r = origSync.apply(this, arguments); sanitize(); return r; };
    var origRender = renderProposalsTable;
    renderProposalsTable = function () { var r = origRender.apply(this, arguments); decorateTable(); return r; };
    var boot = function () { try { sanitize(); decorateTable(); if (kpdtIsOpen()) { var it = kpdtFind(kpdtCurId); if (it) kpdtRender(it); } } catch (e) { console.error(e); } };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 0); }); else setTimeout(boot, 0);
})();
