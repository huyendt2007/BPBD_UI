/*
 * Chi tiết hồ sơ hoàn trả - Prompt 4: Bước 4 Thu hồi tiền hoàn trả theo phần đơn vị.
 * - Phần 1: Ghi nhận nộp tiền từng đợt (đơn vị quản lý cán bộ và Sở Tư pháp); lưu người nhập, đơn vị nhập.
 *   + Phương thức Một lần: gợi ý 100% số còn phải thu; Nhiều lần: nhập nhiều đợt.
 *   + Còn phải thu = 0: cán bộ chuyển Hoàn thành.
 * - Phần 2: Miễn / Giảm bổ sung khi đang thu hồi (chỉ đơn vị quản lý cán bộ; Sở Tư pháp khóa mờ) qua popup trình ký chuẩn (Mẫu 38 / 37).
 *   + Số sau giảm mới > đã thu: tiếp tục thu; = đã thu: Hoàn thành; < đã thu: tính Số tiền cần trả lại.
 * - Phần 3: Cập nhật trả lại tiền cho cán bộ (đơn vị và Sở Tư pháp) -> Hoàn thành.
 * Nạp sau chi_tiet_ho_so_hoan_tra_qd.js.
 */
(function () {
    const A = () => window.ht3Api;
    const el = id => document.getElementById(id);
    const REQ = 'Đây là trường bắt buộc';
    const num = v => parseInt(String(v || '').replace(/\D/g, ''), 10) || 0;
    const parseD = s => { const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(s || '').trim()); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; };
    const conLai = o => Math.max(0, (o.total || 0) - (o.paid || 0));
    const STEP4 = ['THU', 'DONE', 'MIEN', 'DC'];
    function userLabel() {
        return 'Cán bộ ' + A().myUnit();
    }
    const canPay = o => { const s = A().scope(); return (s === 'stp' || (s !== 'lanh_dao' && o.agency === A().myUnit())); };

    // ===== Bước 4: hiển thị theo phần đơn vị =====
    // Nút thao tác: màu nền theo thao tác; khóa: nền xám, icon xám đậm (không ẩn), tooltip tên nút kèm lý do khóa
    const COLOR = { 'fa-clock-rotate-left': '#0284c7', 'fa-eye': '#0284c7', 'fa-money-bill-transfer': '#16a34a', 'fa-hand-holding-dollar': '#d97706', 'fa-shield-halved': '#7c3aed', 'fa-arrow-down-wide-short': '#2563eb', 'fa-file-signature': '#16a34a', 'fa-ban': '#dc2626' };
    function act(onclick, icon, title, enabled, tip) {
        const c = COLOR[(icon.split(' ').find(x => COLOR[x])) || ''] || '#2563eb';
        const base = 'width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center; border-radius:6px; ';
        return enabled
            ? '<button type="button" data-admin-icon-normalized="1" class="btn-action-square" title="' + title + '" style="' + base + 'background:' + c + '; color:#fff; border:1px solid ' + c + ';" onclick="' + onclick + '"><i class="' + icon + '"></i></button>'
            : '<button type="button" data-admin-icon-normalized="1" class="btn-action-square" title="' + title + (tip ? ' - ' + tip : '') + '" style="' + base + 'background:#e2e8f0; color:#64748b; border:1px solid #cbd5e1; cursor:not-allowed;" disabled><i class="' + icon + '"></i></button>';
    }
    // Cột Thao tác Bước 4: bộ 04 nút cố định Xem chi tiết | Ghi nhận nộp tiền / Ghi nhận trả lại tiền | Trình QĐ miễn bổ sung | Trình QĐ giảm bổ sung
    // Nút không được phép: hiển thị mờ, tooltip "[Tên nút] - [Lý do]"
    function payTip(o) {
        if (/^CD_DC$/.test(o.trinh || '')) return 'Quyết định đình chỉ đang chờ Lãnh đạo ký duyệt';
        if (/_DC$/.test(o.trinh || '')) return 'Cán bộ đang xử lý Đình chỉ hoàn trả';
        if (o.ct === 'DONE') return 'Cán bộ đã hoàn thành nghĩa vụ hoàn trả';
        if (o.ct === 'MIEN') return 'Cán bộ được Miễn hoàn trả';
        if (o.ct === 'DC') return 'Cán bộ đã Đình chỉ hoàn trả';
        if (conLai(o) <= 0) return 'Không còn số tiền phải nộp';
        return '';
    }
    function actions(o, idx) {
        const a = A(), s = a.scope(), B = window.htActBtn;
        const view = window.htViewOfficerBtn(idx, 'ht4OpenHistory');
        if (s === 'lanh_dao') {
            return /^CD_(MIEN|GIAM)$/.test(o.trinh || '')
                ? view + ' ' + act('ht3Approve(\'S' + o.trinh.slice(3) + '\',' + idx + ')', 'fa-solid fa-file-signature', 'Ký duyệt', true) + ' ' + act('ht3Reject(\'S' + o.trinh.slice(3) + '\',' + idx + ')', 'fa-solid fa-ban', 'Từ chối', true)
                : view;
        }
        const own = canPay(o), viewTip = 'Chỉ đơn vị quản lý cán bộ hoặc Sở Tư pháp thực hiện';
        // Nút 2 đổi chế độ theo tình trạng: có số tiền cần trả lại -> Ghi nhận trả lại tiền; còn lại -> Ghi nhận nộp tiền
        let h = view + ' ';
        if ((o.refund || 0) > 0) h += B('fa-solid fa-hand-holding-dollar', 'Ghi nhận trả lại tiền', 'ht4OpenRefund(' + idx + ')', own, viewTip, '#d97706');
        else { const t = own ? payTip(o) : viewTip; h += B('fa-solid fa-money-bill-transfer', 'Ghi nhận nộp tiền', 'ht4OpenPay(' + idx + ')', !t, t, '#16a34a'); }
        // Miễn / Giảm bổ sung: chỉ đơn vị quản lý cán bộ; Sở Tư pháp mờ
        const thu = o.ct === 'THU', trinhCho = /^CD_/.test(o.trinh || ''), dcLock = /_DC$/.test(o.trinh || '');
        const mgTip = !own ? viewTip : s === 'stp' ? 'Sở Tư pháp không có quyền' : dcLock ? 'Cán bộ đang xử lý Đình chỉ hoàn trả' : trinhCho ? 'Quyết định đang chờ Lãnh đạo ký duyệt'
            : (o.refund || 0) > 0 ? 'Cán bộ có số tiền cần trả lại' : !(thu && conLai(o) > 0) ? (payTip(o) || 'Không còn số tiền phải nộp') : '';
        const gTip = mgTip || (o.loi !== 'Vô ý' ? 'Giảm mức hoàn trả chỉ áp dụng khi Mức độ lỗi là Vô ý' : '');
        // Giả lập phân quyền: Sở Tư pháp không hiển thị Trình QĐ miễn / giảm bổ sung (ẩn hẳn, ngoại lệ chỉ áp dụng Bước 4)
        if (s === 'stp') return h;
        h += ' ' + B('fa-solid fa-shield-halved', 'Trình QĐ miễn bổ sung', 'ht3OpenSign(\'SMIEN\',' + idx + ')', !mgTip, mgTip, '#7c3aed');
        h += ' ' + B('fa-solid fa-arrow-down-wide-short', 'Trình QĐ giảm bổ sung', 'ht3OpenSign(\'SGIAM\',' + idx + ')', !gTip, gTip, '#2563eb');
        return h;
    }
    function methodCell(o) {
        const a = A();
        if (o.ct === 'MIEN' || o.xl === 'MIEN') return '<td style="text-align:center;">--</td>';
        const m = window.htMethod ? window.htMethod(o.refundMethod) : o.refundMethod;
        return '<td style="white-space:nowrap;">' + a.esc(m || '--') + '</td>';
    }
    function statusCell(o) {
        const a = A();
        let h = '<div>' + (window.htPill ? window.htPill(a.ctText(o.ct)) : a.esc(a.ctText(o.ct))) + '</div>';
        if (o.trinh && !/_DC$/.test(o.trinh)) h += '<div style="font-size:12px; color:#6d28d9;">' + a.esc(a.ctText(o.trinh)) + (/^BTC_/.test(o.trinh) && o.qd3 && o.qd3.reject ? ' - Lý do: ' + a.esc(o.qd3.reject.reason) : '') + '</div>';
        h += a.dcLine(o);
        if (o.refund > 0) h += '<div style="font-size:12px; color:#b91c1c;">Cần trả lại: ' + a.money(o.refund) + ' đ</div>';
        if (o.refundDone) h += '<div style="font-size:12px; color:var(--text-muted);">Đã trả lại ' + a.money(o.refundDone.amt) + ' đ ngày ' + a.esc(o.refundDone.ngay) + '</div>';
        if (o.ykhdDieuKienHoan) h += '<span class="badge" style="background:#fef9c3; color:#a16207; font-size:10.5px;">Hoãn hoàn trả</span>';
        return h;
    }
    function renderStep4New() {
        const a = A();
        const panel = el('panelStep4'); if (!panel) return;
        let root = el('ht4Root');
        if (!root) { root = document.createElement('div'); root.id = 'ht4Root'; panel.insertBefore(root, panel.firstChild); }
        Array.from(panel.children).forEach(ch => { if (ch !== root) { ch.dataset.ht4Hide = '1'; ch.style.display = 'none'; } });
        root.style.display = '';
        const units = a.orderUnits(a.unitsInView());
        let h = '<div style="margin-bottom:14px;"><h3 style="font-size:16px; font-weight:800; color:var(--primary-color); margin:0;"><i class="fa-solid fa-money-bill-trend-up"></i> Thu hồi tiền hoàn trả</h3></div>';
        let any = false;
        units.forEach(u => {
            const ui = activeDossier.htUnits.indexOf(u);
            const list = a.officers().map(o => ({ o, idx: activeDossier.refundOfficers.indexOf(o) })).filter(x => x.o.agency === u.unit && STEP4.includes(x.o.ct));
            if (!list.length) return;
            any = true;
            // Miễn / Đình chỉ: số phải hoàn trả = số đã thu được giữ lại
            const tong = list.reduce((s, x) => s + (x.o.ct === 'MIEN' ? (x.o.paid || 0) : (x.o.total || 0)), 0), daThu = list.reduce((s, x) => s + (x.o.paid || 0), 0);
            h += '<div class="card" style="' + a.unitCardStyle(u) + '">' + a.unitHeader(u, 4, a.unitBadge(u)) + '<div class="card-body"' + (a.unitCollapsed(4, u) ? ' style="display:none;"' : '') + '>'
                + '<div style="font-size:13px; margin-bottom:10px;">Cán bộ ở giai đoạn thu hồi: <strong>' + list.length + '</strong> • Tổng phải thu: <strong>' + a.money(tong) + ' đ</strong> • Đã thu: <strong>' + a.money(daThu) + ' đ</strong> • Còn phải thu: <strong>' + a.money(Math.max(0, list.reduce((s, x) => s + (x.o.ct === 'THU' ? conLai(x.o) : 0), 0))) + ' đ</strong></div>'
                + a.dcToolbar(u, ui, list) + '<table class="dense-table" style="width:100%;"><thead><tr>' + a.dcHeadCell(u, ui, list) + '<th style="width:45px; text-align:center;">STT</th><th>Họ và tên</th><th style="width:90px;">Mức độ lỗi</th><th style="width:100px;">Phương thức hoàn trả</th><th style="width:130px; text-align:right;">Số tiền phải hoàn trả (đ)</th><th style="width:120px; text-align:right;">Đã nộp (đ)</th><th style="width:120px; text-align:right;">Còn phải thu (đ)</th><th style="width:220px;">Trạng thái</th><th style="min-width:160px; text-align:center; white-space:nowrap;">Thao tác</th></tr></thead><tbody>'
                + list.map((x, k) => '<tr>' + a.dcCheckCell(x.o, x.idx, u, ui) + '<td style="text-align:center;">' + (k + 1) + '</td><td><strong>' + a.esc(x.o.name) + '</strong><div style="font-size:12px; color:var(--text-muted);">' + a.esc(x.o.role || '') + '</div></td><td>' + a.esc(x.o.loi === 'Khác' ? (x.o.ykhdLoiKhac || 'Khác') : (x.o.loi || '--')) + '</td>' + methodCell(x.o)
                    + '<td style="text-align:right;">' + a.money(x.o.ct === 'MIEN' ? 0 : x.o.total) + '</td><td style="text-align:right;">' + a.money(x.o.paid) + '</td><td style="text-align:right; font-weight:700;">' + a.money(x.o.ct === 'THU' ? conLai(x.o) : 0) + '</td>'
                    + '<td>' + statusCell(x.o) + '</td><td class="ht-act-cell">' + actions(x.o, x.idx) + '</td></tr>').join('')
                + '</tbody></table>' + a.dcBlock(u) + '</div></div>';
        });
        if (!any) h += '<div class="card"><div class="card-body" style="color:var(--text-muted);">Chưa có cán bộ thuộc phạm vi dữ liệu ở giai đoạn thu hồi tiền hoàn trả.</div></div>';
        root.innerHTML = h;
    }
    const baseRender4 = window.renderStep4;
    window.renderStep4 = function () {
        const a = A();
        if (a && a.ensureModel()) { renderStep4New(); return; }
        const root = el('ht4Root'); if (root) root.style.display = 'none';
        const panel = el('panelStep4');
        if (panel) Array.from(panel.children).forEach(ch => { if (ch.dataset.ht4Hide) { delete ch.dataset.ht4Hide; ch.style.display = ''; } });
        baseRender4.apply(this, arguments);
    };

    // ===== Popup dùng chung: Ghi nhận nộp tiền / Cập nhật trả lại tiền / Xem lịch sử nộp tiền =====
    let P = null;
    function ensureModal() {
        if (el('ht4Modal')) return;
        document.body.insertAdjacentHTML('beforeend', '<div class="modal" id="ht4Modal" style="z-index:1060;"><div class="modal-content" style="max-width:780px;"><div class="modal-header"><h3 class="modal-title" id="ht4Title"></h3><button type="button" class="close-modal" onclick="ht4Close()">&times;</button></div>'
            + '<div class="modal-body" style="padding:24px;"><div id="ht4Info" class="info-grid" style="margin-bottom:16px;"></div><div id="ht4Form"></div></div>'
            + '<div class="modal-footer" style="padding:16px 24px 24px;"><button type="button" class="btn btn-secondary" onclick="ht4Close()">Đóng</button><button type="button" class="btn btn-primary" id="ht4Save" onclick="ht4Save()"><i class="fa-solid fa-floppy-disk"></i> Lưu</button></div></div></div>');
    }
    function info(o, full) {
        const a = A(), row = (k, v) => '<div class="info-item"><div class="info-label">' + k + '</div><div class="info-value" style="font-weight:700;">' + v + '</div></div>';
        // Xem chi tiết cán bộ: thông tin chung (mức độ lỗi, hình thức xử lý) và số tiền cần hoàn trả theo ý kiến Hội đồng
        const xl = window.htXlLabel ? window.htXlLabel(o.xl) : (o.xl || '');
        const ext = full ? row('Mức độ lỗi', a.esc(o.loi === 'Khác' ? (o.ykhdLoiKhac || 'Khác') : (o.loi || '--'))) + row('Hình thức xử lý', a.esc(xl || '--'))
            + row('Số tiền cần hoàn trả', a.money(o.hd || o.total) + ' đ') : '';
        return row('Cán bộ', a.esc(o.name) + '<div style="font-weight:400; font-size:12.5px;">' + a.esc(o.role || '') + ' - ' + a.esc(o.agency) + '</div>') + ext
            + row('Phương thức hoàn trả', a.esc((window.htMethod ? window.htMethod(o.refundMethod) : o.refundMethod) || '--'))
            + row(full ? 'Số tiền phải nộp (sau giảm)' : 'Số tiền phải hoàn trả', a.money(o.total) + ' đ') + row('Đã nộp', a.money(o.paid) + ' đ')
            + row(full ? 'Còn phải nộp' : 'Còn phải thu', a.money(conLai(o)) + ' đ') + (o.refund > 0 ? row('Số tiền cần trả lại', a.money(o.refund) + ' đ') : '');
    }
    const field = (label, id, ph, val, extra) => '<div class="form-group" style="margin-bottom:14px;"><span class="form-label">' + label + ' <span style="color:red;">*</span></span><input type="text" class="form-control" id="' + id + '" placeholder="' + ph + '" value="' + (val || '') + '" ' + (extra || '') + ' oninput="ht4Clr(\'' + id + '\')"><span class="invalid-feedback" id="' + id + 'Error" style="display:none; color:red; font-size:12px;">' + REQ + '</span></div>';
    window.ht4Clr = id => { const i = el(id); if (i) i.classList.remove('is-invalid'); const e = el(id + 'Error'); if (e) { e.style.display = 'none'; e.innerText = REQ; } };
    window.ht4Money = input => { const n = num(input.value); input.value = n ? A().money(n) : ''; };
    function open(mode, idx) {
        ensureModal();
        const a = A(), o = activeDossier.refundOfficers[idx];
        P = { mode, idx };
        el('ht4Info').innerHTML = info(o, mode === 'history');
        el('ht4Save').style.display = mode === 'history' ? 'none' : '';
        if (mode === 'pay') {
            el('ht4Title').innerHTML = '<i class="fa-solid fa-file-invoice-dollar"></i> Ghi nhận nộp tiền hoàn trả';
            const motLan = /một lần/i.test(o.refundMethod || '');
            const goiY = motLan ? a.money(conLai(o)) : '';
            el('ht4Form').innerHTML = '<div class="grid-2-cols" style="gap:16px;">' + field('Số tiền nộp đợt này (đ)', 'ht4Amt', 'Nhập số tiền nộp đợt này', goiY, 'style="text-align:right;" onchange="ht4Money(this)"') + field('Ngày nộp', 'ht4Ngay', 'dd/mm/yyyy', a.today()) + '</div>'
                + (motLan ? '<div style="font-size:12.5px; color:var(--text-muted); margin:-6px 0 12px;">Phương thức Một lần: gợi ý 100% số còn phải thu.</div>' : '')
                + '<div id="ht4Tlkt"></div>';
        } else if (mode === 'refund') {
            el('ht4Title').innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> Ghi nhận trả lại tiền';
            el('ht4Form').innerHTML = '<div class="grid-2-cols" style="gap:16px;">' + field('Số tiền trả lại (đ)', 'ht4Amt', 'Nhập số tiền trả lại', a.money(o.refund), 'style="text-align:right;" onchange="ht4Money(this)"') + field('Ngày trả lại', 'ht4Ngay', 'dd/mm/yyyy', a.today()) + '</div><div id="ht4Tlkt"></div>';
        } else {
            el('ht4Title').innerHTML = '<i class="fa-solid fa-circle-info"></i> Xem chi tiết cán bộ';
            const pays = o.payments || [];
            el('ht4Form').innerHTML = '<div style="font-weight:700; color:var(--primary-color); margin:4px 0 8px;"><i class="fa-solid fa-clock-rotate-left"></i> Các lần nộp tiền</div><table class="dense-table" style="width:100%;"><thead><tr><th style="width:45px; text-align:center;">STT</th><th style="width:110px;">Ngày nộp</th><th style="text-align:right; width:140px;">Số tiền (đ)</th><th>Người nhập</th><th style="width:150px;">Tài liệu kèm theo</th></tr></thead><tbody>'
                + (pays.length ? pays.map((p, i) => '<tr><td style="text-align:center;">' + (i + 1) + '</td><td>' + a.esc(p.ngay) + '</td><td style="text-align:right;">' + a.money(p.amt) + '</td><td>' + a.esc(p.by) + '<div style="font-size:12px; color:var(--text-muted);">' + a.esc(p.at || '') + '</div></td><td>' + ((p.tlkt || []).map(t => a.esc(t.name)).join(', ') || '--') + '</td></tr>').join('') : '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Chưa có đợt nộp tiền.</td></tr>')
                + '</tbody></table>' + (o.refundDone ? '<div style="margin-top:12px; font-size:13px;">Đã trả lại cho cán bộ: <strong>' + a.money(o.refundDone.amt) + ' đ</strong> ngày ' + a.esc(o.refundDone.ngay) + ' - ' + a.esc(o.refundDone.by) + '</div>' : '');
            // Khối Quyết định miễn / giảm mức hoàn trả (nếu có), như popup Xem chi tiết cán bộ tại Bước 3
            if (typeof window.htQdBlockHtml === 'function') el('ht4Form').insertAdjacentHTML('beforeend', window.htQdBlockHtml(idx));
        }
        if (mode !== 'history' && typeof tlktMount === 'function') tlktMount('ht4', 'ht4Tlkt', { required: false, rows: [], noLeader: true });
        el('ht4Modal').classList.add('visible');
    }
    window.ht4OpenPay = idx => open('pay', idx);
    window.ht4OpenRefund = idx => open('refund', idx);
    window.ht4OpenHistory = idx => open('history', idx);
    window.ht4Close = () => { const m = el('ht4Modal'); if (m) m.classList.remove('visible'); P = null; };
    window.ht4Save = function () {
        if (!P) return;
        const a = A(), o = activeDossier.refundOfficers[P.idx];
        const amtEl = el('ht4Amt'), ngayEl = el('ht4Ngay');
        const amt = num(amtEl.value), ngay = ngayEl.value.trim(), d = parseD(ngay);
        let first = null;
        const bad = (input, msg) => { input.classList.add('is-invalid'); const e = el(input.id + 'Error'); e.innerText = msg || REQ; e.style.display = 'block'; if (!first) first = input; };
        if (!amtEl.value.trim()) bad(amtEl);
        if (!ngay) bad(ngayEl);
        else if (!d) bad(ngayEl, 'Ngày không đúng định dạng dd/mm/yyyy.');
        else if (d > new Date()) bad(ngayEl, 'Ngày không được lớn hơn ngày hiện tại.');
        if (P.mode === 'pay' && amtEl.value.trim() && !(amt > 0 && amt <= conLai(o))) bad(amtEl, 'Số tiền nộp phải lớn hơn 0 và không lớn hơn số còn phải thu.');
        if (P.mode === 'refund' && amtEl.value.trim() && amt !== o.refund) bad(amtEl, 'Số tiền trả lại phải bằng số tiền cần trả lại.');
        if (!first && typeof tlktValidate === 'function' && !tlktValidate('ht4')) return;
        if (first) { first.focus(); return; }
        const tl = typeof tlktGet === 'function' ? tlktGet('ht4') : [];
        const rec = { ngay, amt, tlkt: tl, by: userLabel(), unit: a.myUnit(), at: a.nowShort() };
        let msg;
        if (P.mode === 'pay') {
            o.payments = (o.payments || []).concat([rec]);
            o.paid = (o.paid || 0) + amt;
            if (conLai(o) === 0) { o.ct = 'DONE'; msg = 'Ghi nhận nộp tiền thành công. Cán bộ đã hoàn thành nghĩa vụ hoàn trả.'; }
            else msg = 'Ghi nhận nộp tiền thành công. Còn phải thu ' + a.money(conLai(o)) + ' đ.';
        } else {
            o.refundDone = rec; o.paid = (o.paid || 0) - amt; o.refund = 0;
            // Trả lại tiền theo QĐ đình chỉ (phương án Hoàn trả lại số tiền đã thu) -> Đình chỉ hoàn trả; theo giảm bổ sung (nộp thừa) -> Hoàn thành
            if (o.trinh === 'TL_DC') { o.trinh = ''; o.ct = 'DC'; o.total = o.paid || 0; msg = 'Ghi nhận trả lại tiền thành công. Cán bộ chuyển Đình chỉ hoàn trả.'; }
            else { o.ct = 'DONE'; msg = 'Ghi nhận trả lại tiền thành công. Cán bộ chuyển Hoàn thành.'; }
        }
        ht4Close();
        a.commit(msg);
    };
})();
