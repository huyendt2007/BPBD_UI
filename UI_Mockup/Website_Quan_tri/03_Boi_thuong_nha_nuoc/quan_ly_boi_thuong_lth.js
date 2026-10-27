/*
 * [lth] Thiệt hại yêu cầu bồi thường tại Giải quyết yêu cầu bồi thường - cấu trúc 02 cấp (nhóm / mục chi tiết, DM_27) dùng component BTNN_TH (btnn_thiet_hai.js)
 * - Nhập liệu hồ sơ vụ việc: bảng 06 nhóm / 36 mục; tích từng mục chi tiết -> nhập Cách tính / Diễn giải, Số tiền yêu cầu; dòng nhóm và Tổng tự cộng.
 *   Ô nhập giữ id theo mã mục: claimThietHaiCb_<mã>, claimThietHaiCalc_<mã>, claimThietHaiVal_<mã> (các hàm lưu / kiểm tra của trang lặp theo BTNN_TH.codes()).
 * - Nhóm VII. Các thiệt hại khác (TH_KHAC_<số>): nút Thêm thiệt hại khác / Xóa dòng, Tên / nội dung thiệt hại bắt buộc; kế thừa sang Xác minh / Thương lượng.
 * - Form Cập nhật kết quả xác minh: đủ 36 mục + nhóm VII; mọi mục tích / bỏ tích tự do, không hiển thị nhãn Theo yêu cầu / Bổ sung.
 *   Lưu ngầm: mục chưa yêu cầu -> bs = true, bsStep = 'xm' (Mức đề xuất = 0); mục theo yêu cầu bị bỏ tích -> xmOff = true (không thuộc Kết quả xác minh).
 *   Mức xác minh nhập theo mục; dòng nhóm / Tổng tự cộng.
 * - Form Cập nhật kết quả thương lượng: kế thừa danh sách sau xác minh (gồm mục bổ sung), tích bổ sung thêm mục còn lại (bsStep = 'tl');
 *   Mức tiền bồi thường nhập theo mục; dòng nhóm / Tổng tự cộng.
 * - Thương lượng: mục kế thừa bỏ tích được (ghi ngầm negotiation.offKeys).
 * - Xem chi tiết (Kết quả xác minh, Lịch sử các lần xác minh, Kết quả thương lượng): bảng 02 cấp chỉ gồm nhóm / mục có dữ liệu.
 * - Ô "Yêu cầu phục hồi danh dự" dưới bảng thiệt hại tại Xác minh / Thương lượng: hồ sơ đã có yêu cầu PHDD tích sẵn, khóa (nhãn "Theo yêu cầu");
 *   hồ sơ chưa có: tích bổ sung (nhãn "Bổ sung") -> khi lưu: Loại yêu cầu "Chỉ yêu cầu bồi thường thiệt hại bằng tiền" chuyển "Yêu cầu cả hai",
 *   restoreHonor = true, phddBs = true, phddBsStep = 'xm' | 'tl', mở nhánh Phục hồi danh dự (syncClaimTracks), ghi lịch sử xử lý.
 * - Hoàn thành xác minh: popup xác nhận [MSG-CFM-BTNN-GQBT-001] trước khi hoàn thành.
 * - Quy đổi dữ liệu cũ (06 loại phẳng) sang mã mục chi tiết khi tải trang / mở hồ sơ: BTNN_TH.normClaim.
 */
(function () {
    var TH = window.BTNN_TH;
    if (!TH) { console.warn('lth: thiếu btnn_thiet_hai.js'); return; }
    var XM_PFX = ['editXmVal_', 'editXmNote_', 'editXmDate_', 'editXmPlace_', 'editXmMethodText_', 'editXmCalculation_', 'xmDetailRow_', 'xmDetailIcon_', 'xmRow_'];
    var TL_PFX = ['tlAgreed_', 'tlStatus_', 'tlReason_'];
    var CODES = TH.codes();
    var STEP_NAME = { xm: 'Xác minh thiệt hại', tl: 'Thương lượng' };

    function el(id) { return document.getElementById(id); }
    var esc = TH.esc, fmt = TH.fmt, code = TH.codeOf;
    function cur(n) { return typeof formatCurrencyString === 'function' ? formatCurrencyString(n) : fmt(n); }
    function claimNow() {
        try { return claimsList.find(function (c) { return c.id === selectedClaimId; }) || null; } catch (e) { return null; }
    }
    function normAll() { try { (claimsList || []).forEach(function (c) { TH.normClaim(c); xmDocsNorm(c); }); } catch (e) { /* mockup */ } }
    function bsMap(claim) {
        var s = {};
        ((claim && claim.thietHaiList) || []).forEach(function (it) { if (it.bs) s[code(it.type)] = it.bsStep || 'xm'; });
        ((claim && claim.negotiation && claim.negotiation.items) || []).forEach(function (it) { var c = code(it.key); if (it.bs && !s[c]) s[c] = it.bsStep || 'tl'; });
        return s;
    }
    function badge(bs) { return bs ? '<span class="lth-badge lth-bs">Bổ sung</span>' : '<span class="lth-badge lth-req">Theo yêu cầu</span>'; }
    function rename(pfx, pairs) {
        pairs.forEach(function (p) { pfx.forEach(function (x) { var e = el(x + p[0]); if (e) e.id = x + '__lth' + p[1]; }); });
        pairs.forEach(function (p) { pfx.forEach(function (x) { var e = el(x + '__lth' + p[1]); if (e) e.id = x + p[1]; }); });
    }
    function today() { return new Date().toLocaleDateString('vi-VN'); }
    function ord(c) { return TH.ord(c); }
    function openInvalidGroups(table) {
        if (!table) return;
        table.querySelectorAll('.is-invalid').forEach(function (e) { var tr = e.closest('tr[data-g]'); if (tr) TH.setOpen(table, tr.getAttribute('data-g'), true); });
    }

    // ---------- CSS ----------
    var css = document.createElement('style');
    css.textContent = '.lth-badge{display:inline-block;font-size:11px;font-weight:600;line-height:16px;padding:0 6px;border-radius:8px;margin-left:6px;white-space:nowrap;vertical-align:middle;}'
        + '.lth-req{background:#e0f2fe;color:#0369a1;}.lth-bs{background:#fef3c7;color:#92400e;}'
        + '.lth-chk{display:inline-flex;align-items:center;gap:6px;cursor:pointer;margin:0;font-weight:600;}.lth-chk input{margin:0;}'
        + 'tr.bth-off .lth-in{display:none;}tr.bth-off .lth-badge{display:none;}'
        + '.lth-phdd{margin:10px 0 14px;padding:8px 12px;border:1px dashed #cbd5e1;border-radius:6px;background:#f8fafc;}';
    document.head.appendChild(css);

    // ======================= Quy đổi dữ liệu cũ =======================
    var origVv = window.ensureClaimsVuViec;
    if (typeof origVv === 'function') window.ensureClaimsVuViec = function () { normAll(); return origVv.apply(this, arguments); };

    // ======================= Nhập liệu hồ sơ vụ việc =======================
    // list: thietHaiList của hồ sơ -> dựng sẵn các dòng VII. Các thiệt hại khác (các hàm nạp của trang điền giá trị theo mã)
    function renderNl(list) {
        var wrap = el('claimThietHaiTreeWrap');
        if (!wrap) return;
        var dis = function (c) { return TH.isKhac(c) ? '' : ' disabled'; };
        wrap.innerHTML = TH.tableHtml({
            tid: 'claimThietHaiTree', all: true, hook: 'toggleClaimThietHaiRow', khacHook: 'lthNlKhac',
            list: (list || []).filter(function (x) { return TH.isKhac(TH.codeOfAny(x)); }),
            head: ['<th style="min-width:260px;">Cách tính / Diễn giải công thức áp dụng</th>', '<th style="width:200px; text-align:right;">Số tiền yêu cầu bồi thường (đồng)</th>'],
            check: { id: function (c) { return 'claimThietHaiCb_' + c; } },
            khac: { nameId: function (c) { return 'claimThietHaiName_' + c; } },
            cols: [
                { k: 'calc', td: function (c) { return '<textarea class="form-control auto-expand" id="claimThietHaiCalc_' + c + '" rows="1" placeholder="Nhập cách tính / diễn giải..."' + dis(c) + ' oninput="autoExpandTextarea(this)"></textarea>'; } },
                { k: 'req', sum: true, align: 'right', td: function (c) { return '<input type="text" class="form-control bth-num" style="text-align:right;" id="claimThietHaiVal_' + c + '" placeholder="0" oninput="formatCurrencyInput(this)"' + dis(c) + '>'; } }
            ],
            totalRow: '<tr class="bth-total"><td colspan="2" style="text-align:right;">TỔNG CỘNG SỐ TIỀN YÊU CẦU BỒI THƯỜNG:</td><td><div style="display:flex; flex-direction:column; gap:4px; text-align:right;">'
                + '<div style="font-size:16px; color:var(--danger-color);" id="claimTotalNumText">0 đồng</div>'
                + '<div style="font-size:11.5px; font-style:italic; font-weight:normal; color:var(--text-muted);" id="claimTotalWordText">Viết bằng chữ: Không đồng</div></div></td></tr>'
        });
    }
    renderNl();
    window.lthNlRender = renderNl;
    // Thêm / Xóa dòng thiệt hại khác tại Nhập liệu: xóa thì bỏ số tiền của dòng; cộng lại tổng
    window.lthNlKhac = function (c, act) {
        if (act === 'del') { var v = el('claimThietHaiVal_' + c); if (v) v.value = ''; }
        try { sumClaimThietHai(); toggleRecInfoSection(); } catch (e) { /* mockup */ }
    };

    // ======================= Yêu cầu phục hồi danh dự (Xác minh / Thương lượng) =======================
    function reqKind(c) { return typeof claimRequestKind === 'function' ? claimRequestKind(c) : (c.requestType === 'honor' ? 'honor' : (c.restoreHonor ? 'both' : 'money')); }
    function phddBoxHtml(claim, step) {
        var has = reqKind(claim) !== 'money';
        var bs = !!claim.phddBs;
        var locked = has && (!bs || claim.phddBsStep !== step);
        var tip = !has ? '' : (bs ? 'Đã bổ sung yêu cầu phục hồi danh dự tại bước ' + STEP_NAME[claim.phddBsStep || 'xm'] : 'Hồ sơ đã có yêu cầu phục hồi danh dự');
        return '<div class="form-group lth-phdd" id="lthPhddBox_' + step + '">'
            + '<label class="lth-chk"><input type="checkbox" id="lthPhdd_' + step + '"' + (has ? ' checked' : '') + (locked ? ' disabled' : '') + (tip ? ' title="' + esc(tip) + '"' : '')
            + ' onchange="lthPhddTick(\'' + step + '\', this.checked)"> <span>Yêu cầu phục hồi danh dự</span></label>'
            + '<span id="lthPhddBadge_' + step + '">' + (has ? badge(bs) : '') + '</span></div>';
    }
    window.lthPhddTick = function (step, on) {
        var b = el('lthPhddBadge_' + step);
        if (b) b.innerHTML = on ? badge(true) : '';
    };
    var PHDD_KEYS = ['requestType', 'restoreHonor', 'phddBs', 'phddBsStep', 'phddBsAt', 'phddBsPrevType', 'phddStatus', 'phddStarted'];
    function phddSnap(c) { var s = { tl: (c.timeline || []).length }; PHDD_KEYS.forEach(function (k) { s[k] = c[k]; }); return s; }
    function phddRestore(c, s) {
        PHDD_KEYS.forEach(function (k) { if (s[k] === undefined) delete c[k]; else c[k] = s[k]; });
        if (Array.isArray(c.timeline)) c.timeline.length = s.tl;
    }
    // Áp dụng trạng thái ô "Yêu cầu phục hồi danh dự" của form vào hồ sơ: 'add' | 'remove' | ''
    function phddApply(claim, step) {
        var cb = el('lthPhdd_' + step);
        if (!claim || !cb || cb.disabled) return '';
        var kind = reqKind(claim), on = !!cb.checked;
        if (!Array.isArray(claim.timeline)) claim.timeline = [];
        var who = typeof getCurrentSimulatedOfficer === 'function' ? getCurrentSimulatedOfficer() : '';
        if (on && kind === 'money') {
            claim.phddBsPrevType = claim.requestType || 'money';
            claim.requestType = 'both';
            claim.restoreHonor = true;
            claim.phddBs = true;
            claim.phddBsStep = step;
            claim.phddBsAt = today();
            try { if (typeof syncClaimTracks === 'function') syncClaimTracks(claim); } catch (e) { /* mockup */ }
            if (!claim.phddStatus) { claim.phddStatus = 'Đang thực hiện'; claim.phddStarted = true; }
            claim.timeline.push({ title: 'Bổ sung yêu cầu phục hồi danh dự', date: today(), desc: 'Bổ sung yêu cầu phục hồi danh dự tại bước ' + STEP_NAME[step] + '. Loại yêu cầu chuyển thành "Yêu cầu cả hai (Bồi thường tiền & Phục hồi danh dự)".', status: 'completed', officer: who });
            return 'add';
        }
        if (!on && claim.phddBs && claim.phddBsStep === step) {
            claim.requestType = claim.phddBsPrevType || 'money';
            claim.restoreHonor = false;
            ['phddBs', 'phddBsStep', 'phddBsAt', 'phddBsPrevType', 'phddStatus', 'phddStarted'].forEach(function (k) { delete claim[k]; });
            claim.timeline.push({ title: 'Bỏ bổ sung yêu cầu phục hồi danh dự', date: today(), desc: 'Bỏ yêu cầu phục hồi danh dự đã bổ sung tại bước ' + STEP_NAME[step] + '. Loại yêu cầu trở lại "Chỉ yêu cầu bồi thường thiệt hại bằng tiền".', status: 'completed', officer: who });
            return 'remove';
        }
        return '';
    }
    function phddPersist(claim, change) {
        try {
            if (change === 'remove' && typeof phddReadJson === 'function') {
                var tr = phddReadJson(PHDD_TRACK_KEY, {});
                if (tr[claim.code]) { delete tr[claim.code]; phddWriteJson(PHDD_TRACK_KEY, tr); }
            }
            var patch = { requestType: claim.requestType, restoreHonor: !!claim.restoreHonor, phddBs: !!claim.phddBs, phddBsStep: claim.phddBsStep || '', phddBsAt: claim.phddBsAt || '', phddBsPrevType: claim.phddBsPrevType || '', timeline: claim.timeline || [] };
            if (typeof gqEnsureRecord === 'function') gqEnsureRecord(claim);
            if (typeof gqSaveData === 'function') gqSaveData(claim, patch);
            if (typeof phddPersistStore === 'function') phddPersistStore();
            if (typeof saveClaimsToLocal === 'function') saveClaimsToLocal();
        } catch (e) { console.warn('lth phdd persist', e); }
    }
    function phddReadLine(claim, step) {
        if (!claim || !claim.phddBs || (step === 'xm' && claim.phddBsStep !== 'xm')) return '';
        return '<p class="lth-phdd-read" id="lthPhddRead_' + step + '"><strong>Yêu cầu phục hồi danh dự:</strong> Có (Bổ sung tại bước ' + STEP_NAME[claim.phddBsStep || 'xm'] + ')</p>';
    }

    // ======================= Xác minh thiệt hại: bảng Tổng số tiền theo từng hạng mục (02 cấp) =======================
    function xmDetailRow(c, d) {
        var k = 'T' + c, on = !!d;
        var errDiv = '<div class="error-message" style="color: red; font-size: 11px; display: none;">Đây là trường bắt buộc</div>';
        var fg = function (label, id, val, ph, date) {
            return '<div class="form-group" style="margin-bottom: 0;"><span class="form-label">' + label + ' <span class="required">*</span></span>'
                + (date ? '<div class="date-input-wrapper"><input type="text" class="form-control form-control-sm datepicker-input lth-xm-date" id="' + id + '" value="' + esc(val) + '" placeholder="dd/mm/yyyy" style="font-size: 13px;"><i class="fa-regular fa-calendar-days"></i></div>'
                    : '<input type="text" class="form-control form-control-sm" id="' + id + '" value="' + esc(val) + '" placeholder="' + ph + '" style="font-size: 13px;">')
                + errDiv + '</div>';
        };
        return '<tr id="xmDetailRow_' + k + '" class="xm-detail-row" style="display: none;"><td colspan="5" style="background-color: #f8fafc; padding: 15px; border-top: none;">'
            + '<div style="font-weight: 600; color: var(--primary-color); font-size: 13px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-file-lines"></i> Chi tiết quá trình xác minh - ' + esc(TH.name(c)) + '</div>'
            + '<div class="grid-2" style="gap: 12px; margin-bottom: 10px;">' + fg('Ngày tiến hành', 'editXmDate_' + k, on ? d.xmDate : '', '', true) + fg('Địa điểm', 'editXmPlace_' + k, on ? d.xmPlace : '', 'Nhập địa điểm...') + '</div>'
            + '<div class="grid-2" style="gap: 12px; margin-bottom: 0;">' + fg('Cách thức xác minh', 'editXmMethodText_' + k, on ? d.xmMethodText : '', 'Nhập cách thức...') + fg('Cách tính', 'editXmCalculation_' + k, on ? d.xmCalculation : '', 'Nhập cách tính...') + '</div>'
            + '</td></tr>';
    }
    function renderXm(claim) {
        var body = el('editXacMinhTableBody');
        if (!body) return;
        TH.normClaim(claim);
        var table = body.closest('table');
        table.id = 'xmThTable';
        table.classList.add('bth-table');
        table.setAttribute('data-hook', 'lthXmTick');
        table.setAttribute('data-all', '1');
        var thead = table.querySelector('thead');
        if (thead) thead.innerHTML = '<tr style="background-color: var(--table-header-bg);"><th style="min-width:320px;">Thiệt hại yêu cầu bồi thường</th><th style="text-align:right; width:140px;">Mức đề xuất (đ)</th><th style="width:180px; text-align:right;">Mức xác minh (đ)</th><th style="min-width:180px;">Nội dung diễn giải</th><th style="width:110px; text-align:center; white-space:nowrap;">Chi tiết</th></tr>';
        // Mục theo yêu cầu (có Mức đề xuất) / mục bổ sung: chỉ lưu ngầm cờ bs, không hiển thị nhãn; mọi mục tích / bỏ tích tự do
        var req = function (d) { return !!(d && !d.bs && !d.__new); };
        body.innerHTML = TH.rowsHtml({
            tid: 'xmThTable', all: true, list: claim.thietHaiList || [],
            isOn: function (c, d) { return !!(d && !d.xmOff); },
            check: { id: function (c) { return 'lthXmChk_' + c; } },
            khac: { nameId: function (c) { return 'editXmName_T' + c; } },
            khacHook: 'lthXmKhac',
            cols: [
                { k: 'req', sum: true, align: 'right', v: function (c, d) { return req(d) ? d.val : 0; }, td: function (c, d) { return req(d) ? fmt(d.val) + ' đ' : '-'; } },
                {
                    k: 'xm', sum: true, align: 'right', v: function (c, d) { return d ? (d.xmVal !== undefined ? d.xmVal : d.val) : 0; },
                    td: function (c, d) {
                        var v = d ? (d.xmVal !== undefined ? d.xmVal : d.val) : '';
                        return '<div class="lth-in"><input type="text" class="form-control currency-input bth-num" style="text-align:right; font-weight:600; font-size:13px;" id="editXmVal_T' + c + '" value="' + (v === '' || v === undefined ? '' : cur(v)) + '" placeholder="0" oninput="handleCurrencyInput(this); BTNN_TH.recalcFrom(this)"></div>';
                    }
                },
                { k: 'note', td: function (c, d) { return '<div class="lth-in"><input type="text" class="form-control" style="font-size:13px;" id="editXmNote_T' + c + '" value="' + esc(d ? (d.xmNote || ((d.bs || d.__new) ? '' : 'Xác minh đúng thực tế')) : '') + '" placeholder="Nhập nội dung diễn giải..."></div>'; } },
                { k: 'det', style: 'text-align:center;', td: function (c) { return '<div class="lth-in"><button type="button" class="btn btn-secondary btn-sm" onclick="toggleXmDetailRow(\'T' + c + '\')" style="padding: 4px 8px; font-size: 12px; gap: 4px; display: inline-flex; align-items: center;"><i class="fa-solid fa-chevron-down" id="xmDetailIcon_T' + c + '"></i> Chi tiết</button></div>'; } }
            ],
            after: function (c, d) { return xmDetailRow(c, d); },
            total: { label: 'TỔNG CỘNG:' }
        });
        body.setAttribute('data-lth', '1');
        if (!document.querySelector('.bth-toolbar[data-for="xmThTable"]')) table.insertAdjacentHTML('beforebegin', TH.toolbar('xmThTable'));
        var box = el('lthPhddBox_xm');
        if (box) box.remove();
        table.insertAdjacentHTML('afterend', phddBoxHtml(claim, 'xm'));
        if (typeof flatpickr !== 'undefined') flatpickr('#editXacMinhTableBody .lth-xm-date', { dateFormat: 'd/m/Y' });
    }
    window.lthXmTick = function (c, on) {
        var det = el('xmDetailRow_T' + c), icon = el('xmDetailIcon_T' + c);
        if (det) det.style.display = on ? 'table-row' : 'none';
        if (icon) { icon.classList.toggle('fa-chevron-up', !!on); icon.classList.toggle('fa-chevron-down', !on); }
        if (on) { var v = el('editXmVal_T' + c); if (v) v.focus(); }
    };
    // Thêm dòng thiệt hại khác tại Xác minh: mở Khối Chi tiết quá trình xác minh của dòng
    window.lthXmKhac = function (c, act) {
        if (act === 'add') { var det = el('xmDetailRow_T' + c); if (det) det.style.display = 'table-row'; if (typeof flatpickr !== 'undefined') flatpickr('#editXmDate_T' + c, { dateFormat: 'd/m/Y' }); }
    };
    function xmActive() {
        var b = el('editXacMinhTableBody'), blk = el('xacminhEditBlock');
        return !!(b && b.getAttribute('data-lth') === '1' && blk && blk.style.display !== 'none');
    }
    function xmTicked(c) { var e = el('lthXmChk_' + c); return !!(e && e.checked); }

    // Lưu kết quả xác minh: dựng lại danh sách mục thiệt hại theo các ô đã tích (theo thứ tự danh mục) rồi gọi xử lý lưu gốc (đánh lại id ô nhập theo thứ tự danh sách)
    var origSave = window.saveXacMinhRound;
    if (typeof origSave === 'function') window.saveXacMinhRound = function () {
        var claim = claimNow();
        if (!claim || !xmActive()) return origSave.apply(this, arguments);
        var table = el('xmThTable');
        // [xmbc] Báo cáo xác minh thiệt hại (bắt buộc khi Hoàn thành xác minh); Thỏa thuận kéo dài thời gian xác minh
        var complete = !!arguments[0];
        var xmFirst = xmBcValidate(complete);
        if (xmFirst) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'error'); if (xmFirst.focus) xmFirst.focus(); if (xmFirst.scrollIntoView) xmFirst.scrollIntoView({ block: 'center' }); return; }
        var extVals = xmExtValues();
        var teEl = el('editXacMinhTimeExtension');
        if (teEl) teEl.value = extText(extVals);
        // Nhóm VII: bắt buộc Tên / nội dung thiệt hại của dòng đang chọn
        if (TH.validateKhac(table)) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc.', 'error'); return; }
        var prevList = (claim.thietHaiList || []).slice();
        var prevItems = prevList.map(function (it) { return Object.assign({}, it); });
        var histLen = (claim.xmHistory || []).length;
        // Mục đang tích -> danh sách xác minh; mục theo yêu cầu bị bỏ tích -> giữ ngầm (xmOff) để truy vết; mục bổ sung bị bỏ tích -> loại
        var newList = [], offList = [];
        TH.codes(table).forEach(function (c) {
            var prev = prevList.find(function (x) { return code(x.type) === c; }) || null;
            if (xmTicked(c)) {
                var it = prev || { type: c, code: c, group: TH.groupOf(c), calc: '', val: 0, bs: true, bsStep: 'xm', bsAt: today() };
                delete it.xmOff;
                if (TH.isKhac(c)) { it.name = TH.khacValue(table, c); TH.setName(c, it.name); }
                newList.push(it);
            } else if (prev && !prev.bs) {
                prev.xmOff = true;
                offList.push(prev);
            }
        });
        newList.sort(function (a, b) { return ord(a.type) - ord(b.type); });
        var pairs = newList.map(function (it, i) { return ['T' + code(it.type), String(i)]; });
        var snap = phddSnap(claim);
        var change = phddApply(claim, 'xm');
        rename(XM_PFX, pairs);
        claim.thietHaiList = newList;
        var res, saved = false;
        try {
            res = origSave.apply(this, arguments);
        } finally {
            saved = (claim.xmHistory || []).length !== histLen;
            if (!saved) {
                claim.thietHaiList = prevItems;
                phddRestore(claim, snap);
                rename(XM_PFX, pairs.map(function (p) { return [p[1], p[0]]; }));
                openInvalidGroups(table);
            }
        }
        if (saved) {
            if (offList.length) claim.thietHaiList = newList.concat(offList).sort(function (a, b) { return ord(a.type) - ord(b.type); });
            var bs = bsMap(claim);
            var last = claim.xmHistory[claim.xmHistory.length - 1];
            (last && last.items || []).forEach(function (x) { x.bs = !!bs[code(x.type)]; x.code = code(x.type); x.group = TH.groupOf(x.type); });
            (claim.verifiedItems || []).forEach(function (x) { x.bs = !!bs[code(x.key)]; });
            // [xmbc] Báo cáo xác minh (trả cho người yêu cầu bồi thường) tách khỏi tài liệu kèm theo khác (nội bộ)
            if (last) {
                last.reportFiles = tagReport(xmReportDraft, claim);
                last.files = tagInternal(last.files);
                last.xmExtend = extVals;
            }
            claim.xmReportFiles = last ? last.reportFiles : tagReport(xmReportDraft, claim);
            claim.xmFiles = tagInternal(claim.xmFiles);
            claim.xmExtend = extVals;
            claim.xmTimeExtension = extText(extVals);
            try { persistXmTlData(claim); if (typeof gqSaveData === 'function') gqSaveData(claim, { xmReportFiles: claim.xmReportFiles, xmExtend: claim.xmExtend, xmFiles: claim.xmFiles, xmHistory: claim.xmHistory }); saveClaimsToLocal(); } catch (e) { /* mockup */ }
            if (!change) { try { showCaseDetail(claim.id, !complete, !complete ? 'xacminh' : undefined); } catch (e) { /* mockup */ } }
            if (offList.length && !change && claim.status === 'Xác minh thiệt hại') { try { renderXm(claim); } catch (e) { /* mockup */ } }
            if (change) {
                phddPersist(claim, change);
                try { showCaseDetail(claim.id, claim.status === 'Xác minh thiệt hại', claim.status === 'Xác minh thiệt hại' ? 'xacminh' : undefined); } catch (e) { /* mockup */ }
            }
        }
        return res;
    };
    var origBVI = window.buildVerifiedItems;
    if (typeof origBVI === 'function') window.buildVerifiedItems = function (claim) {
        var r = origBVI.apply(this, arguments);
        var bs = bsMap(claim);
        // Mục theo yêu cầu đã bỏ tích khi xác minh (xmOff): không thuộc Kết quả xác minh
        var off = {};
        ((claim && claim.thietHaiList) || []).forEach(function (it) { if (it.xmOff) off[code(it.type)] = 1; });
        r = (r || []).filter(function (x) { return !off[code(x.key)]; });
        r.forEach(function (x) { var c = code(x.key); if (c) { x.key = c; x.code = c; x.group = TH.groupOf(c); x.label = TH.name(c); } if (bs[c]) x.bs = true; });
        return r;
    };

    // Hoàn thành xác minh: kiểm tra trường bắt buộc; hợp lệ thì mở popup xác nhận [MSG-CFM-BTNN-GQBT-001]
    function xmPrecheck() {
        var ok = true;
        var t = el('xmThTable');
        if (xmBcCheck(true)) return false;
        if (t && TH.validateKhac(t)) return false;
        TH.codes(t).forEach(function (c) {
            if (!xmTicked(c)) return;
            ['editXmDate_', 'editXmPlace_', 'editXmMethodText_', 'editXmCalculation_'].forEach(function (p) { var e = el(p + 'T' + c); if (e && !e.value.trim()) ok = false; });
        });
        if (!ok) return false;
        try { if (typeof ptValues === 'function' && !ptValues('xm').some(function (p) { return p && String(p.name || '').trim(); })) return false; } catch (e) { /* mockup */ }
        try { if (typeof ctvvDocsValidate === 'function' && !ctvvDocsValidate('xm', false)) return false; } catch (e) { /* mockup */ }
        return true;
    }
    window.submitXacMinhUpdate = function () {
        if (!xmPrecheck()) return window.saveXacMinhRound(true); // xử lý gốc hiển thị lỗi, không lưu
        showConfirmModal('Bạn có chắc chắn muốn hoàn thành xác minh không?', function () { window.saveXacMinhRound(true); },
            { title: 'Xác nhận hoàn thành xác minh', btnYesText: 'Xác nhận', btnNoText: 'Hủy bỏ', btnYesClass: 'btn-success' });
    };

    var origSCD = window.showCaseDetail;
    if (typeof origSCD === 'function') window.showCaseDetail = function (id) {
        try { var c0 = claimsList.find(function (c) { return c && c.id === id; }); if (c0) { TH.normClaim(c0); xmDocsNorm(c0); } } catch (e) { /* mockup */ }
        var r = origSCD.apply(this, arguments);
        try {
            var claim = claimNow(), blk = el('xacminhEditBlock');
            if (claim && claim.status === 'Xác minh thiệt hại' && blk && blk.style.display === 'block') { renderXm(claim); renderXmBc(claim); }
            var vr = el('vxmResult');
            if (claim && vr) xmReadSplit(claim, vr);
            if (claim && vr && !el('lthPhddRead_xm')) { var line = phddReadLine(claim, 'xm'); if (line) vr.insertAdjacentHTML('afterbegin', line); }
        } catch (e) { console.warn('lth xm', e); }
        return r;
    };

    // ======================= [xmbc] Xác minh thiệt hại: tài liệu tách 02 khối + Thỏa thuận kéo dài thời gian xác minh =======================
    // - Báo cáo xác minh thiệt hại (reportFiles / claim.xmReportFiles): tài liệu DUY NHẤT của bước Xác minh trả cho người yêu cầu bồi thường
    //   (shareNyc = true; hồ sơ nguồn Dịch vụ công: dvcSync = true để đồng bộ trả về); bắt buộc khi Hoàn thành xác minh.
    // - Tài liệu kèm theo khác trong quá trình xác minh (files / claim.xmFiles): nội bộ (scope 'internal'), không trả người yêu cầu, không chuyển đơn vị khác.
    // - Dữ liệu cũ: tài liệu có tên chứa "Báo cáo ... xác minh" -> Báo cáo xác minh; còn lại -> tài liệu kèm theo khác.
    // - Thỏa thuận kéo dài (xmExtend = { on, from, to }): Từ ngày bắt buộc khi tích (cho phép ngày quá khứ); Đến ngày không bắt buộc, nếu nhập phải >= Từ ngày.
    //   Dữ liệu cũ (text xmTimeExtension): có nội dung -> tích, lấy ngày dd/mm/yyyy đầu tiên / thứ hai làm Từ ngày / Đến ngày; trống hoặc "Không..." -> không tích.
    var xmReportDraft = [];
    var XM_EXT_LABEL = 'Thỏa thuận việc kéo dài thời gian xác minh';
    function noAcc(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[_\-.]+/g, ' '); }
    function isReport(f) { var t = noAcc(((f && f.title) || '') + ' ' + ((f && (f.name || f.file)) || '')); return /bao cao/.test(t) && /xac minh/.test(t); }
    function isDvc(c) { return /dich vu cong/.test(noAcc(((c && c.nguonHoSo) || '') + ' ' + ((c && c.hinhThucTiepNhan) || ''))); }
    function tagReport(list, c) { var d = isDvc(c); return (list || []).filter(function (f) { return f && (f.name || f.file); }).map(function (f) { return Object.assign({}, f, { shareNyc: true, dvcSync: d }); }); }
    function tagInternal(list) { return (list || []).map(function (f) { return f && typeof f === 'object' ? Object.assign({}, f, { scope: 'internal' }) : f; }); }
    function extText(x) { return x && x.on ? 'Từ ngày ' + (x.from || '...') + (x.to ? ' đến ngày ' + x.to : '') : ''; }
    function extFromText(t) {
        t = String(t || '').trim();
        if (!t || /^không/i.test(t)) return { on: false, from: '', to: '' };
        var m = t.match(/\d{2}\/\d{2}\/\d{4}/g) || [];
        return { on: true, from: m[0] || '', to: m[1] || '', legacyText: m.length ? '' : t };
    }
    function xmDocsNorm(c) {
        if (!c) return;
        (Array.isArray(c.xmHistory) ? c.xmHistory : []).forEach(function (r) {
            if (!r) return;
            if (!r.reportFiles) { var fs = r.files || []; r.reportFiles = tagReport(fs.filter(isReport), c); r.files = tagInternal(fs.filter(function (f) { return !isReport(f); })); }
            if (!r.xmExtend) r.xmExtend = extFromText(r.timeExtension);
        });
        if (!c.xmReportFiles) { var all = c.xmFiles || []; c.xmReportFiles = tagReport(all.filter(isReport), c); c.xmFiles = tagInternal(all.filter(function (f) { return !isReport(f); })); }
        if (!c.xmExtend) c.xmExtend = extFromText(c.xmTimeExtension);
    }
    function extShow(x, fallback) { return x && x.on ? (x.from ? extText(x) : (x.legacyText || fallback || '')) : ''; }
    // Form: khối Báo cáo xác minh thiệt hại + đổi tên khối tài liệu cũ + checkbox Thỏa thuận kéo dài
    function renderXmBc(claim) {
        var list = el('editXmFilesList');
        var g = list ? list.closest('.form-group') : null;
        if (g) {
            var lb = g.querySelector('.form-label');
            if (lb) lb.innerHTML = 'Tài liệu kèm theo khác trong quá trình xác minh<div style="font-size:12px; font-weight:400; color:#64748b;">Tài liệu nội bộ của đơn vị giải quyết bồi thường; không trả cho người yêu cầu bồi thường, không chuyển khi chuyển hồ sơ cho đơn vị khác.</div>';
            var old = el('xmReportGroup');
            if (old) old.remove();
            g.insertAdjacentHTML('beforebegin', '<div class="form-group" id="xmReportGroup" style="margin-top:15px;">'
                + '<span class="form-label">Báo cáo xác minh thiệt hại <span class="required">*</span><div style="font-size:12px; font-weight:400; color:#64748b;">Tài liệu trả cho người yêu cầu bồi thường; bắt buộc khi Hoàn thành xác minh.</div></span>'
                + '<div id="editXmReportList" style="margin-top:6px;"></div>'
                + '<div class="error-message" id="xmReportErr" style="color:#dc2626; font-size:12px; display:none;">Đây là trường bắt buộc</div></div>');
            xmReportDraft = (claim.xmReportFiles || []).map(function (f) { return Object.assign({}, f); });
            if (typeof ctvvDocsMount === 'function') ctvvDocsMount('xm_bc', 'editXmReportList', ctvvFromLegacy(xmReportDraft), {
                required: false, title: '',
                onSync: function (rows) { xmReportDraft = ctvvToLegacy(rows); var e = el('xmReportErr'); if (e && xmReportDraft.length) e.style.display = 'none'; }
            });
        }
        var te = el('editXacMinhTimeExtension');
        if (!te) return;
        var tg = te.closest('.form-group');
        var oldB = el('xmExtBlock');
        if (oldB) oldB.remove();
        te.style.display = 'none';
        var tl = tg ? tg.querySelector('.form-label') : null;
        if (tl) tl.style.display = 'none';
        var x = claim.xmExtend || extFromText(claim.xmTimeExtension);
        te.insertAdjacentHTML('afterend', '<div id="xmExtBlock">'
            + '<label class="lth-chk"><input type="checkbox" id="xmExtOn"' + (x.on ? ' checked' : '') + ' onchange="lthXmExtTick(this.checked)"> <span>' + XM_EXT_LABEL + '</span></label>'
            + '<div id="xmExtBox" style="margin:8px 0 0 24px;' + (x.on ? '' : ' display:none;') + '"><span class="form-label">Thời gian thỏa thuận kéo dài</span>'
            + '<div class="grid-2" style="gap:12px;">'
            + '<div class="form-group" style="margin-bottom:0;"><span class="form-label">Từ ngày <span class="required">*</span></span><div class="date-input-wrapper"><input type="text" class="form-control" id="xmExtFrom" value="' + esc(x.from || '') + '" placeholder="dd/mm/yyyy" oninput="ptClearErr(this)" onchange="ptClearErr(this)"><i class="fa-regular fa-calendar-days"></i></div>' + TT_ERR + '</div>'
            + '<div class="form-group" style="margin-bottom:0;"><span class="form-label">Đến ngày</span><div class="date-input-wrapper"><input type="text" class="form-control" id="xmExtTo" value="' + esc(x.to || '') + '" placeholder="dd/mm/yyyy" oninput="ptClearErr(this)" onchange="ptClearErr(this)"><i class="fa-regular fa-calendar-days"></i></div>' + TT_ERR + '</div>'
            + '</div></div></div>');
        if (typeof flatpickr !== 'undefined') flatpickr('#xmExtFrom, #xmExtTo', { dateFormat: 'd/m/Y', allowInput: true });
    }
    window.lthXmExtTick = function (on) {
        var b = el('xmExtBox');
        if (b) b.style.display = on ? '' : 'none';
        ['xmExtFrom', 'xmExtTo'].forEach(function (id) { var e = el(id); if (!e) return; if (!on) { e.value = ''; if (e._flatpickr) e._flatpickr.clear(); } if (typeof fieldErr === 'function') fieldErr(e, false); });
        if (on) { var f = el('xmExtFrom'); if (f) f.focus(); }
    };
    function xmExtValues() {
        var on = !!(el('xmExtOn') && el('xmExtOn').checked);
        return { on: on, from: on ? el('xmExtFrom').value.trim() : '', to: on ? el('xmExtTo').value.trim() : '' };
    }
    // Kiểm tra (hiển thị lỗi) - trả về ô lỗi đầu tiên hoặc null
    function xmBcValidate(complete) {
        var first = null, set = function (e, msg) { ttErr(e, msg); if (msg && !first) first = e; };
        var on = el('xmExtOn');
        if (on && on.checked) {
            var f = el('xmExtFrom'), t = el('xmExtTo'), df = ttParse(f.value), dt = ttParse(t.value);
            set(f, !f.value.trim() ? 'Đây là trường bắt buộc' : (!df ? 'Ngày không đúng định dạng dd/mm/yyyy' : ''));
            set(t, !t.value.trim() ? '' : (!dt ? 'Ngày không đúng định dạng dd/mm/yyyy' : (df && dt < df ? 'Đến ngày phải lớn hơn hoặc bằng Từ ngày' : '')));
        }
        var rep = el('editXmReportList');
        if (rep) {
            var okRows = typeof ctvvDocsValidate === 'function' ? ctvvDocsValidate('xm_bc', false) : true;
            var miss = complete && !(xmReportDraft || []).some(function (x) { return x && x.name; });
            var e = el('xmReportErr');
            if (e) e.style.display = miss ? 'block' : 'none';
            if ((miss || !okRows) && !first) first = rep;
        }
        return first;
    }
    function xmBcCheck(complete) { return xmBcValidate(complete); }
    // Màn xem: 02 khối tài liệu theo lần xác minh
    function xmDocsBlocks(rep, oth, pfx) {
        return vxmTitle('fa-file-contract', 'Báo cáo xác minh thiệt hại')
            + '<div style="font-size:12px; color:#475569; margin:-2px 0 6px;">Tài liệu trả cho người yêu cầu bồi thường</div>'
            + (rep.length ? vxmDocsTableHtml(rep, pfx + '_report') : '<div style="font-size:12.5px; color:#94a3b8; font-style:italic;">Chưa có Báo cáo xác minh thiệt hại</div>')
            + (oth.length ? vxmTitle('fa-paperclip', 'Tài liệu kèm theo khác trong quá trình xác minh') + '<div style="font-size:12px; color:#475569; margin:-2px 0 6px;">Tài liệu nội bộ của đơn vị giải quyết bồi thường; không trả cho người yêu cầu bồi thường</div>' + vxmDocsTableHtml(oth, pfx + '_internal') : '');
    }
    var EXT_FIELD_RE = /<div class="vxm-text-field"[^>]*><div[^>]*>Thỏa thuận việc kéo dài thời gian xác minh<\/div><div[^>]*>[\s\S]*?<\/div><\/div>/;
    var origRB = window.vxmRoundBodyHtml;
    if (typeof origRB === 'function') window.vxmRoundBodyHtml = function (claim, round, pfx) {
        var r = round || {};
        var x = r.xmExtend || extFromText(r.timeExtension);
        var rep = r.reportFiles || (r.files || []).filter(isReport);
        var oth = r.reportFiles ? (r.files || []) : (r.files || []).filter(function (f) { return !isReport(f); });
        var html = String(origRB.call(this, claim, Object.assign({}, r, { files: [], timeExtension: extShow(x, r.timeExtension) }), pfx));
        if (!x.on) html = html.replace(EXT_FIELD_RE, '');
        return html + xmDocsBlocks(rep, oth, pfx);
    };
    // Kết quả xác minh (chỉ xem): thay khối Tài liệu kèm theo bằng 02 khối; Thỏa thuận kéo dài theo checkbox
    function xmReadSplit(claim, vr) {
        if (vr.getAttribute('data-xmbc') === '1') return;
        vr.setAttribute('data-xmbc', '1');
        Array.prototype.slice.call(vr.children).forEach(function (ch) {
            if (ch.classList && ch.classList.contains('vxm-section-title') && /^\s*Tài liệu kèm theo\s*$/.test(ch.textContent)) {
                var nx = ch.nextElementSibling;
                ch.remove();
                if (nx && !(nx.classList.contains('vxm-section-title') || nx.classList.contains('vxm-text-field'))) nx.remove();
            }
        });
        var x = claim.xmExtend || extFromText(claim.xmTimeExtension);
        var fields = Array.prototype.slice.call(vr.querySelectorAll(':scope > .vxm-text-field'));
        fields.forEach(function (fd) {
            var lab = fd.firstElementChild;
            if (lab && lab.textContent.trim() === XM_EXT_LABEL) {
                if (!x.on) fd.remove(); else if (lab.nextElementSibling) lab.nextElementSibling.textContent = extShow(x, claim.xmTimeExtension) || '--';
            }
        });
        var fin = typeof vxmFinalRound === 'function' ? vxmFinalRound(claim) : null;
        var rep = fin && fin.reportFiles ? fin.reportFiles : (claim.xmReportFiles || []);
        var oth = fin && fin.reportFiles ? (fin.files || []) : (claim.xmFiles || []);
        var last = Array.prototype.slice.call(vr.querySelectorAll(':scope > .vxm-text-field')).pop();
        var html = '<div id="xmDocsSplitRead">' + xmDocsBlocks(rep, oth, 'xmFinal') + '</div>';
        if (last) last.insertAdjacentHTML('afterend', html); else vr.insertAdjacentHTML('beforeend', html);
    }

    // ======================= Xem chi tiết: bảng 02 cấp (không hiển thị nhãn Theo yêu cầu / Bổ sung) =======================
    window.vxmItemsTableHtml = function (items, pfx) {
        var cl = claimNow(), off = {};
        ((cl && cl.thietHaiList) || []).forEach(function (it) { if (it.xmOff) off[code(it.type)] = 1; });
        var list = (items || []).map(function (it) { return Object.assign({}, it, { code: TH.codeOfAny(it) }); }).filter(function (it) { return !off[it.code]; });
        var diffHtml = function (d) { return '<span style="color:' + (d < 0 ? '#ef4444' : (d > 0 ? '#10b981' : '#64748b')) + ';">' + (d === 0 ? '0 đ' : (d > 0 ? '+' : '-') + fmt(Math.abs(d)) + ' đ') + '</span>'; };
        var rq = function (d) { return Number(d.reqVal) || 0; }, xv = function (d) { return Number(d.xmVal) || 0; };
        return TH.tableHtml({
            tid: pfx + '_items', list: list,
            head: ['<th style="text-align:right; width:130px;">Mức đề xuất (đ)</th>', '<th style="text-align:right; width:130px;">Mức xác minh (đ)</th>', '<th style="text-align:right; width:110px;">Chênh lệch</th>', '<th>Nội dung diễn giải</th>', '<th style="width:100px; text-align:center;">Chi tiết</th>'],
            cols: [
                { k: 'req', sum: true, align: 'right', v: function (c, d) { return rq(d); }, td: function (c, d) { return d.bs ? '-' : fmt(rq(d)) + ' đ'; } },
                { k: 'xm', sum: true, align: 'right', v: function (c, d) { return xv(d); }, style: 'font-weight:600; color:var(--primary-color);', td: function (c, d) { return fmt(xv(d)) + ' đ'; } },
                { k: 'diff', sum: true, align: 'right', v: function (c, d) { return xv(d) - rq(d); }, td: function (c, d) { return diffHtml(xv(d) - rq(d)); } },
                { k: 'note', td: function (c, d) { return esc(d.xmNote || '--'); } },
                { k: 'det', style: 'text-align:center;', td: function (c) { var did = pfx + '_detail_' + c; return '<button type="button" class="btn btn-secondary btn-sm" onclick="vxmToggle(\'' + did + '\')" style="padding:4px 8px; font-size:12px; gap:4px; display:inline-flex; align-items:center; white-space:nowrap;"><i class="fa-solid fa-chevron-down" id="' + did + '_icon"></i> Chi tiết</button>'; } }
            ],
            after: function (c, d) { return '<tr id="' + pfx + '_detail_' + c + '" class="vxm-detail-row" style="display:none;"><td colspan="6" style="background:#f8fafc; padding:10px 12px;">' + (typeof vxmDetailGridHtml === 'function' ? vxmDetailGridHtml(d) : '') + '</td></tr>'; },
            total: { label: 'TỔNG CỘNG:' }
        }).replace('class="custom-table bth-table"', 'class="custom-table bth-table vxm-items-table"');
    };
    function tlTreeRead(neg, bs) {
        var list = ((neg && neg.items) || []).map(function (it) { return Object.assign({}, it, { code: TH.codeOfAny(it), name: it.label }); });
        return TH.tableHtml({
            tid: 'tlItemsRead', list: list,
            head: ['<th style="text-align:right; width:120px;">Mức đề xuất</th>', '<th style="text-align:right; width:120px;">Mức xác minh</th>', '<th style="text-align:right; width:150px;">Mức tiền bồi thường</th>', '<th style="width:160px;">Trạng thái thương lượng</th>', '<th>Lý do diễn giải</th>'],
            cols: [
                { k: 'p', sum: true, align: 'right', v: function (c, d) { return d.proposed; }, td: function (c, d) { return d.bs ? '-' : fmt(d.proposed) + ' đ'; } },
                { k: 'v', sum: true, align: 'right', v: function (c, d) { return d.verified; }, style: 'color:var(--primary-color); font-weight:600;', td: function (c, d) { return d.bsStep === 'tl' ? '-' : fmt(d.verified) + ' đ'; } },
                { k: 'a', sum: true, align: 'right', v: function (c, d) { return d.status === 'Thành công' ? d.agreed : 0; }, style: 'font-weight:600;', td: function (c, d) { return d.status === 'Thành công' ? fmt(d.agreed) + ' đ' : '-'; } },
                { k: 's', td: function (c, d) { return esc(d.status || '--'); } },
                { k: 'r', td: function (c, d) { return esc(d.reason || '--'); } }
            ],
            total: { label: 'TỔNG CỘNG:' }
        });
    }
    var origTRH = window.tlReadHtml;
    if (typeof origTRH === 'function') window.tlReadHtml = function (claim) {
        if (claim) TH.normClaim(claim);
        var html = String(origTRH.apply(this, arguments));
        var bs = bsMap(claim);
        html = html.replace(/<table class="custom-table" id="tlItemsRead"[\s\S]*?<\/table>/, function () { return tlTreeRead(claim && claim.negotiation, bs) + tlAgreeReadHtml(claim && claim.negotiation); });
        var line = phddReadLine(claim, 'tl');
        if (line) html = html.replace(/(<div id="tlReadResult"[^>]*>)/, '$1' + line);
        return html;
    };

    // ======================= Thương lượng: Kết quả thương lượng theo từng thiệt hại (02 cấp) =======================
    var origTLR = window.tlRenderEditBlock;
    if (typeof origTLR === 'function') window.tlRenderEditBlock = function (claim) {
        if (claim) TH.normClaim(claim);
        var r = origTLR.apply(this, arguments);
        try { renderTl(claim); } catch (e) { console.warn('lth tl', e); }
        return r;
    };
    function renderTl(claim) {
        var table = el('tlItemsTable');
        if (!table || typeof tlState === 'undefined') return;
        var items = tlState.items || [];
        var bs = bsMap(claim);
        // Giá trị form gốc đã điền (bản nháp / mặc định theo Mức xác minh)
        var vals = items.map(function (it, i) { return { agreed: (el('tlAgreed_' + i) || {}).value || '', status: (el('tlStatus_' + i) || {}).value || '', reason: (el('tlReason_' + i) || {}).value || '' }; });
        var inh = {};
        items.forEach(function (it, i) { var c = TH.codeOfAny(it); if (!c) return; it.key = c; if (TH.isKhac(c)) { it.label = it.label || TH.name(c); TH.setName(c, it.label); } else it.label = TH.name(c); if (bs[c]) it.bs = true; inh[c] = { i: i, it: it }; });
        var neg = claim.negotiation || {};
        var draft = (neg.participation === 'DONG_Y' || !neg.participation) ? (neg.items || []) : [];
        var drafted = function (c) { return draft.find(function (x) { return code(x.key) === c && x.bs && x.bsStep === 'tl'; }) || null; };
        // Mục kế thừa đã bỏ tích ở bản nháp (neg.offKeys); dòng thiệt hại khác kế thừa / bổ sung ở bản nháp
        var offK = {};
        ((neg.participation === 'DONG_Y' || !neg.participation) ? (neg.offKeys || []) : []).forEach(function (k) { offK[code(k)] = 1; });
        var khacCodes = Object.keys(inh).filter(TH.isKhac).concat(draft.filter(function (x) { return TH.isKhac(code(x.key)) && x.bs && x.bsStep === 'tl' && !inh[code(x.key)]; }).map(function (x) { TH.setName(code(x.key), x.label); return code(x.key); }));
        var list = CODES.concat(khacCodes).map(function (c) { return inh[c] ? { code: c, inh: inh[c] } : (drafted(c) ? { code: c, d: drafted(c) } : null); }).filter(Boolean);
        var err = '<div class="error-message" style="color:#dc2626; font-size:11px; display:none;">Đây là trường bắt buộc</div>';
        var key = function (c, x) { return x && x.inh ? String(x.inh.i) : 'C' + c; };
        var arg = function (c, x) { return x && x.inh ? x.inh.i : '\'C' + c + '\''; };
        // [tlst] Trạng thái thương lượng theo bản nháp đã lưu; chưa có: trống (buộc chọn). Mức tiền bồi thường chỉ nhập khi Thành công
        var negOf = function (c) { return draft.find(function (y) { return code(y.key) === c; }) || null; };
        var val = function (c, x) {
            var d = x && x.inh ? negOf(c) : (x && x.d);
            var st = d ? (d.status || '') : '';
            var def = x && x.inh ? vals[x.inh.i].agreed : '';
            var ag = d && d.agreed !== '' && d.agreed !== undefined ? cur(d.agreed) : def;
            return { agreed: st === 'Thành công' ? ag : '', def: ag, status: st, reason: d ? (d.reason || '') : (x && x.inh ? vals[x.inh.i].reason : '') };
        };
        var wrap = function (x, h) { return '<div class="lth-in">' + h + '</div>'; }; // dòng bỏ tích: ẩn ô nhập
        var thead = table.querySelector('thead');
        if (thead) thead.innerHTML = '<tr style="background-color: var(--table-header-bg);"><th style="min-width:320px;">Thiệt hại yêu cầu bồi thường</th><th style="text-align:right; width:120px;">Mức đề xuất</th><th style="text-align:right; width:120px;">Mức xác minh</th><th style="width:150px;">Mức tiền bồi thường <span class="required">*</span></th><th style="width:160px;">Trạng thái thương lượng <span class="required">*</span></th><th style="min-width:190px;">Lý do diễn giải</th></tr>';
        table.classList.add('bth-table');
        table.setAttribute('data-hook', 'lthTlTick');
        table.setAttribute('data-all', '1');
        table.querySelector('tbody').innerHTML = TH.rowsHtml({
            tid: 'tlItemsTable', all: true, list: list,
            isOn: function (c, x) { return !!x && !(x.inh && offK[c]); },
            check: { id: function (c) { return inh[c] ? 'lthTlInh_' + c : 'lthTlChk_' + c; } },
            khac: { nameId: function (c) { return 'tlName_' + c; } },
            cols: [
                { k: 'p', sum: true, align: 'right', v: function (c, x) { return x && x.inh && !x.inh.it.bs ? x.inh.it.proposed : 0; }, td: function (c, x) { return x && x.inh && !x.inh.it.bs ? fmt(x.inh.it.proposed) + ' đ' : '-'; } },
                { k: 'v', sum: true, align: 'right', style: 'color:var(--primary-color); font-weight:600;', v: function (c, x) { return x && x.inh ? x.inh.it.verified : 0; }, td: function (c, x) { return x && x.inh ? fmt(x.inh.it.verified) + ' đ' : '-'; } },
                {
                    k: 'a', sum: true, align: 'right', td: function (c, x) {
                        return wrap(x, '<input type="text" class="form-control form-control-sm currency-input bth-num" id="tlAgreed_' + key(c, x) + '" style="text-align:right; min-width:120px;" value="' + esc(val(c, x).agreed) + '" data-def="' + esc(val(c, x).def) + '"' + (val(c, x).status === 'Thành công' ? ' placeholder="0"' : ' placeholder="-" disabled') + ' oninput="handleCurrencyInput(this); ptClearErr(this); BTNN_TH.recalcFrom(this)">' + err);
                    }
                },
                {
                    k: 's', td: function (c, x) {
                        var st = val(c, x).status;
                        return wrap(x, '<select class="form-control form-control-sm" id="tlStatus_' + key(c, x) + '" style="min-width:140px;" onchange="ptClearErr(this); tlReasonRequired(' + arg(c, x) + '); lthTlStatus(this)">'
                            + '<option value="">-- Chọn --</option><option value="Thành công" ' + (st === 'Thành công' ? 'selected' : '') + '>Thành công</option><option value="Không thành công" ' + (st === 'Không thành công' ? 'selected' : '') + '>Không thành công</option><option value="Không tiếp tục thương lượng" ' + (st === 'Không tiếp tục thương lượng' ? 'selected' : '') + '>Không tiếp tục thương lượng</option></select>' + err);
                    }
                },
                { k: 'r', td: function (c, x) { return wrap(x, '<textarea class="form-control form-control-sm" id="tlReason_' + key(c, x) + '" rows="2" style="min-width:180px;" placeholder="Nhập lý do diễn giải..." oninput="ptClearErr(this)">' + esc(val(c, x).reason) + '</textarea>' + err); } }
            ],
            total: { label: 'TỔNG CỘNG:' }
        });
        table.querySelector('tbody').setAttribute('data-lth', '1');
        TH.refresh(table);
        if (!document.querySelector('.bth-toolbar[data-for="tlItemsTable"]')) table.insertAdjacentHTML('beforebegin', TH.toolbar('tlItemsTable'));
        var box = el('lthPhddBox_tl');
        if (box) box.remove();
        var host = table.closest('.table-container') || table;
        host.insertAdjacentHTML('afterend', phddBoxHtml(claim, 'tl'));
        var chk = document.querySelector('input[name="tlDecision"]:checked');
        placeTlPhdd(chk ? chk.value : 'DONG_Y');
        renderTlAgree(claim);
    }
    // ======================= [tltt] Thông tin thỏa thuận khác (Đồng ý thương lượng), đặt sau các phần về tiền =======================
    // negotiation.extend = { on, from, to }: Thỏa thuận kéo dài thương lượng; negotiation.earlyEffect = { on, text }: Thỏa thuận hiệu lực sớm hơn của QĐ GQBT
    var TT_ERR = '<div class="error-message" style="color:#dc2626; font-size:11px; display:none;">Đây là trường bắt buộc</div>';
    function renderTlAgree(claim) {
        var old = el('lthTlAgree');
        if (old) old.remove();
        var anchor = el('tlfxOtherRights');
        var host = anchor ? anchor.closest('.form-group') : null;
        if (!host) return;
        var neg = claim.negotiation || {};
        var dong = neg.participation === 'DONG_Y' || !neg.participation;
        var ex = dong && neg.extend ? neg.extend : {}, ef = dong && neg.earlyEffect ? neg.earlyEffect : {};
        host.insertAdjacentHTML('beforebegin', '<div class="form-group" id="lthTlAgree">'
            + '<span class="form-label" style="color:#166534; font-weight:700;">Thông tin thỏa thuận khác</span>'
            + '<div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">'
            + '<label class="lth-chk"><input type="checkbox" id="tlExtOn"' + (ex.on ? ' checked' : '') + ' onchange="lthTlAgreeTick(\'ext\', this.checked)"> <span>Thỏa thuận kéo dài thương lượng</span></label>'
            + '<div id="tlExtBox" class="grid-2" style="gap:12px; margin-left:24px;' + (ex.on ? '' : ' display:none;') + '">'
            + '<div class="form-group" style="margin-bottom:0;"><span class="form-label">Từ ngày <span class="required">*</span></span><div class="date-input-wrapper"><input type="text" class="form-control" id="tlExtFrom" value="' + esc(ex.from || '') + '" placeholder="dd/mm/yyyy" oninput="ptClearErr(this)" onchange="ptClearErr(this)"><i class="fa-regular fa-calendar-days"></i></div>' + TT_ERR + '</div>'
            + '<div class="form-group" style="margin-bottom:0;"><span class="form-label">Đến ngày <span class="required">*</span></span><div class="date-input-wrapper"><input type="text" class="form-control" id="tlExtTo" value="' + esc(ex.to || '') + '" placeholder="dd/mm/yyyy" oninput="ptClearErr(this)" onchange="ptClearErr(this)"><i class="fa-regular fa-calendar-days"></i></div>' + TT_ERR + '</div>'
            + '</div>'
            + '<label class="lth-chk"><input type="checkbox" id="tlEarlyOn"' + (ef.on ? ' checked' : '') + ' onchange="lthTlAgreeTick(\'early\', this.checked)"> <span>Thỏa thuận hiệu lực sớm hơn của Quyết định giải quyết bồi thường</span></label>'
            + '<div id="tlEarlyBox" class="form-group" style="margin:0 0 0 24px;' + (ef.on ? '' : ' display:none;') + '">'
            + '<span class="form-label">Nội dung thỏa thuận hiệu lực sớm hơn <span class="required">*</span></span>'
            + '<textarea class="form-control" id="tlEarlyText" rows="2" maxlength="1000" placeholder="Nhập nội dung thỏa thuận hiệu lực sớm hơn của Quyết định giải quyết bồi thường..." oninput="ptClearErr(this)">' + esc(ef.text || '') + '</textarea>' + TT_ERR + '</div>'
            + '</div></div>');
        if (typeof flatpickr !== 'undefined') flatpickr('#tlExtFrom, #tlExtTo', { dateFormat: 'd/m/Y', allowInput: true });
    }
    window.lthTlAgreeTick = function (k, on) {
        var box = el(k === 'ext' ? 'tlExtBox' : 'tlEarlyBox');
        if (box) box.style.display = on ? '' : 'none';
        (k === 'ext' ? ['tlExtFrom', 'tlExtTo'] : ['tlEarlyText']).forEach(function (id) {
            var e = el(id);
            if (!e) return;
            if (!on) { e.value = ''; if (e._flatpickr) e._flatpickr.clear(); }
            if (typeof fieldErr === 'function') fieldErr(e, false);
        });
        if (on) { var f = el(k === 'ext' ? 'tlExtFrom' : 'tlEarlyText'); if (f) f.focus(); }
    };
    function ttParse(s) { var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(s || '').trim()); if (!m) return null; var d = new Date(+m[3], +m[2] - 1, +m[1]); return d.getDate() === +m[1] && d.getMonth() === +m[2] - 1 ? d : null; }
    function ttErr(e, msg) {
        if (!e) return;
        var host = e.closest('.form-group'), m = host ? host.querySelector('.error-message') : null;
        if (m) m.textContent = msg || 'Đây là trường bắt buộc';
        if (typeof fieldErr === 'function') fieldErr(e, !!msg);
    }
    // Kiểm tra khối thỏa thuận; trả về ô lỗi đầu tiên hoặc null
    function tlAgreeValidate() {
        var first = null, set = function (e, msg) { ttErr(e, msg); if (msg && !first) first = e; };
        var exOn = el('tlExtOn'), efOn = el('tlEarlyOn');
        if (exOn && exOn.checked) {
            var f = el('tlExtFrom'), t = el('tlExtTo'), df = ttParse(f.value), dt = ttParse(t.value);
            set(f, !f.value.trim() ? 'Đây là trường bắt buộc' : (!df ? 'Ngày không đúng định dạng dd/mm/yyyy' : ''));
            set(t, !t.value.trim() ? 'Đây là trường bắt buộc' : (!dt ? 'Ngày không đúng định dạng dd/mm/yyyy' : (df && dt < df ? 'Đến ngày phải lớn hơn hoặc bằng Từ ngày' : '')));
        }
        if (efOn && efOn.checked) { var x = el('tlEarlyText'); set(x, !x.value.trim() ? 'Đây là trường bắt buộc' : ''); }
        return first;
    }
    function tlAgreeValues() {
        var exOn = !!(el('tlExtOn') && el('tlExtOn').checked), efOn = !!(el('tlEarlyOn') && el('tlEarlyOn').checked);
        return {
            extend: { on: exOn, from: exOn ? el('tlExtFrom').value.trim() : '', to: exOn ? el('tlExtTo').value.trim() : '' },
            earlyEffect: { on: efOn, text: efOn ? el('tlEarlyText').value.trim() : '' }
        };
    }
    function tlAgreeText(neg) {
        var a = [];
        if (neg && neg.extend && neg.extend.on) a.push('Thỏa thuận kéo dài thương lượng từ ngày ' + neg.extend.from + ' đến ngày ' + neg.extend.to);
        if (neg && neg.earlyEffect && neg.earlyEffect.on) a.push('Thỏa thuận hiệu lực sớm hơn của Quyết định giải quyết bồi thường: ' + neg.earlyEffect.text);
        return a;
    }
    function tlAgreeReadHtml(neg) {
        if (!neg || neg.participation !== 'DONG_Y') return '';
        var h = '';
        if (neg.extend && neg.extend.on) h += vxmTextHtml('Thỏa thuận kéo dài thương lượng', 'Từ ngày ' + neg.extend.from + ' đến ngày ' + neg.extend.to);
        if (neg.earlyEffect && neg.earlyEffect.on) h += vxmTextHtml('Thỏa thuận hiệu lực sớm hơn của Quyết định giải quyết bồi thường', neg.earlyEffect.text);
        return h ? '<div id="tlAgreeRead">' + h + '</div>' : '';
    }
    var tlAgreeBlock = false;

    // Ô Yêu cầu phục hồi danh dự: dưới bảng thiệt hại (Đồng ý thương lượng) hoặc cuối khối không tổ chức thương lượng (TH 1-3)
    function placeTlPhdd(value) {
        var box = el('lthPhddBox_tl'), table = el('tlItemsTable');
        if (!box || !table) return;
        var noNeg = typeof TL_NO_NEGOTIATION_CODES !== 'undefined' && TL_NO_NEGOTIATION_CODES.indexOf(value) >= 0;
        var refuse = el('tlRefuseBlock');
        if (noNeg && refuse) refuse.appendChild(box);
        else { var host = table.closest('.table-container') || table; host.parentNode.insertBefore(box, host.nextSibling); }
    }
    var origTCD = window.tlChooseDecision;
    if (typeof origTCD === 'function') window.tlChooseDecision = function (value) {
        var r = origTCD.apply(this, arguments);
        try { placeTlPhdd(value); } catch (e) { /* mockup */ }
        return r;
    };
    // [tlst] Đổi Trạng thái thương lượng: Thành công -> mở ô Mức tiền bồi thường (điền lại giá trị đã có / Mức xác minh); khác -> khóa ô, hiển thị '-', không tính vào tổng
    window.lthTlStatus = function (sel) {
        var tr = sel.closest('tr'), inp = tr ? tr.querySelector('input.bth-num') : null;
        if (!inp) return;
        if (sel.value === 'Thành công') { inp.disabled = false; inp.placeholder = '0'; if (!inp.value) inp.value = inp.getAttribute('data-keep') || inp.getAttribute('data-def') || ''; }
        else { if (inp.value) inp.setAttribute('data-keep', inp.value); inp.value = ''; inp.disabled = true; inp.placeholder = '-'; if (typeof fieldErr === 'function') fieldErr(inp, false); }
        TH.recalcFrom(sel);
    };
    window.lthTlTick = function (c, on) {
        if (on) { var v = el('tlAgreed_C' + c); if (v) v.focus(); }
    };
    var tlAdded = [];
    var origTLS = window.tlSubmit;
    if (typeof origTLS === 'function') window.tlSubmit = function () {
        var claim = claimNow();
        var tb = document.querySelector('#tlItemsTable tbody[data-lth="1"]');
        if (!claim || !tb || typeof tlState === 'undefined') return origTLS.apply(this, arguments);
        var table = el('tlItemsTable');
        var chk = document.querySelector('input[name="tlDecision"]:checked');
        // Nhóm VII (Đồng ý thương lượng): bắt buộc Tên / nội dung thiệt hại của dòng đang chọn
        if (chk && chk.value === 'DONG_Y' && TH.validateKhac(table)) { showToast('Vui lòng nhập đầy đủ các trường bắt buộc của kết quả thương lượng.', 'error'); return; }
        // Mục kế thừa đang tích -> giữ; bỏ tích -> không lưu vào Kết quả thương lượng (ghi ngầm neg.offKeys); mục tích bổ sung -> thêm cuối danh sách
        var old = tlState.items, kept = [], pairs = [], offKeys = [];
        old.forEach(function (it, i) {
            var c = code(it.key), cb = el('lthTlInh_' + c);
            if (!cb || cb.checked) {
                if (TH.isKhac(c)) { it.label = TH.khacValue(table, c) || it.label; TH.setName(c, it.label); }
                pairs.push([String(i), String(kept.length)]); kept.push(it);
            } else { pairs.push([String(i), 'X' + i]); offKeys.push(c); }
        });
        var added = TH.codes(table).filter(function (c) { var e = el('lthTlChk_' + c); return e && e.checked; });
        added.forEach(function (c) {
            var lb = TH.isKhac(c) ? TH.khacValue(table, c) : TH.name(c);
            if (TH.isKhac(c)) TH.setName(c, lb);
            pairs.push(['C' + c, String(kept.length)]);
            kept.push({ key: c, code: c, group: TH.groupOf(c), label: lb, proposed: 0, verified: 0, note: '', bs: true, bsStep: 'tl' });
        });
        tlState.items = kept;
        rename(TL_PFX, pairs);
        var prevNeg = claim.negotiation, res;
        tlAdded = added; tlOff = offKeys;
        // [tltt] Khối Thông tin thỏa thuận khác: lỗi thì không lưu (xử lý gốc vẫn hiển thị lỗi các trường khác)
        tlAgreeBlock = !!(chk && chk.value === 'DONG_Y' && tlAgreeValidate());
        try {
            res = origTLS.apply(this, arguments);
        } finally {
            tlAdded = []; tlOff = []; tlAgreeBlock = false;
            if (!(claim.negotiation && claim.negotiation !== prevNeg)) {
                tlState.items = old;
                rename(TL_PFX, pairs.map(function (p) { return [p[1], p[0]]; }));
                openInvalidGroups(table);
            }
        }
        return res;
    };
    var tlOff = [];
    // Lưu kết quả thương lượng: gắn cờ Bổ sung cho từng thiệt hại ('xm' kế thừa từ Xác minh, 'tl' bổ sung tại Thương lượng); áp dụng ô Yêu cầu phục hồi danh dự
    var origTlSave = window.tlSave;
    if (typeof origTlSave === 'function') window.tlSave = function (claim, neg) {
        if (tlAgreeBlock && neg && neg.participation === 'DONG_Y') {
            showToast('Vui lòng nhập đầy đủ, đúng các trường của Thông tin thỏa thuận khác.', 'error');
            var fe = document.querySelector('#lthTlAgree .is-invalid'); if (fe) fe.focus();
            return;
        }
        if (neg && neg.participation === 'DONG_Y' && el('lthTlAgree')) Object.assign(neg, tlAgreeValues());
        if (neg && Array.isArray(neg.items)) {
            var bs = bsMap(claim);
            neg.items.forEach(function (x) {
                var c = code(x.key);
                if (c) { x.key = c; x.code = c; x.group = TH.groupOf(c); }
                if (tlAdded.indexOf(c) >= 0) { x.bs = true; x.bsStep = 'tl'; }
                else if (bs[c] === 'xm') { x.bs = true; x.bsStep = 'xm'; }
            });
            neg.items.sort(function (a, b) { return ord(a.key) - ord(b.key); });
            if (neg.participation === 'DONG_Y' && tlOff.length) neg.offKeys = tlOff.slice();
        }
        var change = phddApply(claim, 'tl');
        var r = origTlSave.apply(this, arguments);
        // [tltt] Lịch sử xử lý: ghi nhận thỏa thuận kéo dài thương lượng / hiệu lực sớm hơn
        var agr = tlAgreeText(neg);
        if (agr.length && claim.negotiation === neg && Array.isArray(claim.timeline) && claim.timeline.length) {
            var lt = claim.timeline[claim.timeline.length - 1];
            if (lt && lt.title === 'Thương lượng bồi thường') { lt.desc += ' ' + agr.join('. ') + '.'; try { persistXmTlData(claim); saveClaimsToLocal(); if (!change) showCaseDetail(claim.id, false); } catch (e) { /* mockup */ } }
        }
        if (change) {
            phddPersist(claim, change);
            try { showCaseDetail(claim.id, false); } catch (e) { /* mockup */ }
        }
        return r;
    };
})();
