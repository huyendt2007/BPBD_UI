/*
 * [schl] Hiệu lực của Quyết định sửa chữa, bổ sung (quyet_dinh_giai_quyet_boi_thuong.html), nạp sau quyet_dinh_gqbt_scbs.js
 * - Quyết định sửa chữa, bổ sung được ban hành (Lãnh đạo cấp cuối Ký duyệt / Ký ngoài): Quyết định chuyển "Đã ban hành" (d.hieuLuc = ''),
 *   lưu d.scPending = { n, at, prevHieuLuc, evt }; tab Chờ xử lý; thao tác "Cập nhật hiệu lực QĐ" được phép (kể cả khi đã chi trả).
 * - Liên thông kinh phí (Bảng A, Bảng B) KHÔNG chạy khi ban hành: sự kiện 'btnn_kpqd_events_v1' giữ trong d.scPending.evt.
 * - Cập nhật hiệu lực:
 *   + Có hiệu lực: ghi sự kiện liên thông kinh phí (Quyết định chưa có bản ghi Chi trả tiền bồi thường: advOnly, chỉ xét Bảng B;
 *     bản ghi Chi trả tạo theo số tiền mới như quy tắc Có hiệu lực); lần sửa chữa ghi "Có hiệu lực".
 *   + Không có hiệu lực: bỏ lần sửa chữa, bổ sung - Quyết định quay về nội dung và trạng thái hiệu lực trước sửa chữa, kinh phí không đổi;
 *     lần sửa chữa ghi "Không có hiệu lực" (lưu Lý do, Tài liệu đính kèm), không tính vào nhãn "Theo QĐ sửa chữa, bổ sung lần n".
 * - Trong thời gian chờ cập nhật hiệu lực: phân hệ Kinh phí chặn Trình thông báo chi trả / Cập nhật chi trả của Quyết định (quan_ly_kinh_phi_hlqd.js đọc d.scPending).
 */
var SCHL_ON = 'Có hiệu lực', SCHL_OFF = 'Không có hiệu lực';
var schlDeferId = '';
function schlPending(d) { return !!(d && d.status === ST.DA_BH && d.scPending); }
function schlAmend(d) { return d && d.scPending ? (d.amendments || [])[d.scPending.n - 1] || null : null; }
function schlPrevLabel(d) { return d && d.scPending && d.scPending.prevHieuLuc === SCHL_ON ? SCHL_ON : ST.DA_BH; }
function schlNo(a) { return (a && (a.decNo || (a.signDoc || {}).docNo)) || ''; }

(function () {
    // Liên thông kinh phí: giữ sự kiện của lần sửa chữa vừa ban hành tới khi Quyết định được cập nhật Có hiệu lực
    if (typeof scbfApplyAmend === 'function' && typeof scbfEvent === 'function') {
        var origApply = scbfApplyAmend, origEvt = scbfEvent;
        scbfEvent = function (ev) {
            var d = ev && schlDeferId && ev.decId === schlDeferId ? getDec(ev.decId) : null;
            if (d && d.scPending) { d.scPending.evt = ev; return; }
            return origEvt.apply(this, arguments);
        };
        scbfApplyAmend = function (d, a) {
            schlDeferId = d && d.scPending ? d.id : '';
            try { return origApply.apply(this, arguments); } finally { schlDeferId = ''; }
        };
        window.schlEmit = function (ev) { return origEvt(ev); };
    }
    // Nhãn "Theo QĐ sửa chữa, bổ sung lần n": bỏ qua lần sửa chữa Không có hiệu lực
    if (typeof scbfAmendNo === 'function') {
        scbfAmendNo = function (d) {
            var n = 0; (d.amendments || []).forEach(function (a, i) { if (a && a.scbfChanged && !a.scbfVoid) n = i + 1; });
            return n;
        };
    }
    // Cập nhật hiệu lực QĐ: Quyết định sửa chữa, bổ sung chờ cập nhật hiệu lực luôn được phép (Cán bộ xử lý)
    if (typeof qdhlCan === 'function') {
        var origCan = qdhlCan;
        qdhlCan = function (d) {
            if (schlPending(d)) return qdRole() !== 'lanh-dao';
            return origCan.apply(this, arguments);
        };
    }
    // Popup: hướng dẫn cho Quyết định sửa chữa, bổ sung
    if (typeof qdhlOpen === 'function') {
        var origOpen = qdhlOpen;
        qdhlOpen = function (id) {
            var r = origOpen.apply(this, arguments);
            var d = getDec(id), box = document.getElementById('schlHint');
            if (box) box.remove();
            if (schlPending(d)) {
                var a = schlAmend(d) || {};
                var body = document.querySelector('#qdhlModal .qd-modal-body') || document.querySelector('#qdhlModal .modal-body');
                if (body) body.insertAdjacentHTML('afterbegin', '<div id="schlHint" style="background:#eff6ff;border:1px solid #bfdbfe;border-left:4px solid #2563eb;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:13px;line-height:1.6;color:#1e3a8a;">'
                    + '<b>Quyết định sửa chữa, bổ sung lần ' + d.scPending.n + (schlNo(a) ? ' (số ' + esc(schlNo(a)) + ')' : '') + ' chờ cập nhật hiệu lực.</b><br>'
                    + '- Có hiệu lực: hệ thống tính lại kinh phí theo Quyết định sau sửa chữa, bổ sung.<br>'
                    + '- Không có hiệu lực: bỏ lần sửa chữa, bổ sung; Quyết định giữ nội dung và trạng thái trước sửa chữa [' + esc(schlPrevLabel(d)) + ']; kinh phí không thay đổi.</div>');
            }
            return r;
        };
    }
    // Popup xác nhận: nội dung theo Quyết định sửa chữa, bổ sung
    if (typeof qdhlSubmit === 'function' && typeof showConfirmModal === 'function') {
        var origSubmit = qdhlSubmit;
        qdhlSubmit = function () {
            var d = qdhlCtx && getDec(qdhlCtx.id);
            if (!schlPending(d)) return origSubmit.apply(this, arguments);
            var origConfirm = showConfirmModal;
            showConfirmModal = function (msg, fn) {
                var to = qdhlSel(), a = schlAmend(d) || {};
                var head = 'Cập nhật Quyết định sửa chữa, bổ sung lần ' + d.scPending.n + (schlNo(a) ? ' (số ' + schlNo(a) + ')' : '') + ' của Quyết định số ' + (d.decNo || '-') + ' sang [' + to + ']?';
                arguments[0] = to === SCHL_ON ? head + ' Hệ thống tính lại kinh phí theo Quyết định sau sửa chữa, bổ sung.'
                    : head + ' Bỏ lần sửa chữa, bổ sung; Quyết định giữ nội dung và trạng thái trước sửa chữa [' + schlPrevLabel(d) + ']; kinh phí không thay đổi.';
                return origConfirm.apply(this, arguments);
            };
            try { return origSubmit.apply(this, arguments); } finally { showConfirmModal = origConfirm; }
        };
    }
    // Lưu
    if (typeof qdhlSave === 'function') {
        var origSave = qdhlSave;
        qdhlSave = function (id, from, to, reason, docs) {
            var d = getDec(id);
            if (!schlPending(d)) return origSave.apply(this, arguments);
            var p = d.scPending, a = schlAmend(d) || {}, me = W.getCurrentUserId(), at = W.nowText();
            if (to === SCHL_ON) {
                var hadPay = !!(qdhlPayRec(d) || qdhlQueued(d));
                origSave.apply(this, arguments);
                d = getDec(id);
                a.hieuLuc = SCHL_ON; a.hlAt = at;
                if (p.evt && typeof window.schlEmit === 'function') {
                    window.schlEmit(Object.assign({}, p.evt, { advOnly: !hadPay, at: at }));
                    addDecHistory(d, 'Liên thông kinh phí', 'Quyết định sửa chữa, bổ sung lần ' + p.n + ' Có hiệu lực: tính lại kinh phí theo Quyết định sau sửa chữa, bổ sung' + (hadPay ? '.' : '; bản ghi Chi trả tiền bồi thường tạo theo số tiền mới.'));
                }
                delete d.scPending;
            } else {
                // Không có hiệu lực: bỏ lần sửa chữa, bổ sung
                if (a.scbfChanged && a.scbfBefore) {
                    Object.assign(d, JSON.parse(JSON.stringify(a.scbfBefore)));
                    if (typeof updateClaimInStorage === 'function') updateClaimInStorage(d.claimCode, { decAmount: d.total });
                }
                d.hieuLuc = p.prevHieuLuc || '';
                a.hieuLuc = SCHL_OFF; a.scbfVoid = true; a.hlAt = at; a.hlReason = reason || ''; a.hlDocs = docs || [];
                (d.hieuLucHistory = d.hieuLucHistory || []).push({ at: at, userId: me, userName: W.userName(me), from: from, to: to, reason: reason || '', docs: docs || [], scN: p.n });
                var names = (docs || []).map(function (x) { return (x.file && x.file.name) || x.name; }).filter(Boolean);
                addDecHistory(d, 'Cập nhật hiệu lực QĐ', 'Quyết định sửa chữa, bổ sung lần ' + p.n + ' chuyển [' + SCHL_OFF + ']. Lý do cập nhật trạng thái: ' + (reason || '') + (names.length ? ' Tài liệu đính kèm: ' + names.join(', ') + '.' : '')
                    + ' Bỏ lần sửa chữa, bổ sung; Quyết định giữ nội dung và trạng thái trước sửa chữa [' + schlPrevLabel(d) + '].');
                delete d.scPending;
                closeModal('qdhlModal');
                qdhlCtx = null;
                showToast('Đã cập nhật Quyết định sửa chữa, bổ sung lần ' + p.n + ': Không có hiệu lực. Quyết định giữ nội dung và trạng thái trước sửa chữa.', 'success');
            }
            d.updatedAt = new Date().toISOString();
            saveDecisions();
            if (typeof qdhlSyncMap === 'function') qdhlSyncMap();
            var panel = document.getElementById('qdDetailPanel');
            if (panel && panel.style.display === 'flex') openDetail(id); else renderDecTable();
        };
    }
    // Sửa chữa, bổ sung QĐ: không cho phép khi lần sửa chữa trước chưa cập nhật hiệu lực (lưới: khóa mờ; chi tiết: ẩn; gọi trực tiếp: thông báo)
    var SCHL_BLOCK = 'Sửa chữa, bổ sung QĐ: Quyết định sửa chữa, bổ sung lần trước chưa cập nhật hiệu lực';
    if (typeof openRequest === 'function') {
        var origReq = openRequest;
        openRequest = function (id, mode) {
            if (mode === 'amend' && schlPending(getDec(id))) { showToast(SCHL_BLOCK + '.', 'error'); return; }
            return origReq.apply(this, arguments);
        };
    }
    if (typeof rowActions === 'function') {
        var origRow = rowActions;
        rowActions = function (d) {
            var h = origRow.apply(this, arguments);
            if (!schlPending(d) || qdRole() === 'lanh-dao') return h;
            return h.replace(/<button class="icon-btn edit" data-admin-icon-normalized="1" title="Sửa chữa, bổ sung QĐ" onclick="[^"]*"><i class="fa-solid fa-file-pen"><\/i><\/button>/,
                '<button type="button" class="icon-btn edit is-disabled" data-admin-icon-normalized="1" aria-disabled="true" title="' + esc(SCHL_BLOCK) + '" style="opacity:0.35; cursor:not-allowed;" onclick="event.stopPropagation();"><i class="fa-solid fa-file-pen"></i></button>');
        };
    }
    if (typeof openDetail === 'function') {
        var origDetail = openDetail;
        openDetail = function (id) {
            var r = origDetail.apply(this, arguments);
            if (schlPending(getDec(id))) {
                var foot = document.getElementById('qdDetailFooter');
                if (foot) Array.prototype.forEach.call(foot.querySelectorAll('button'), function (b) { if (/openRequest\('[^']*','amend'\)/.test(b.getAttribute('onclick') || '')) b.remove(); });
            }
            return r;
        };
    }
    // Lưới: dòng phụ dưới trạng thái
    if (typeof statusCell === 'function') {
        var origCell = statusCell;
        statusCell = function (d) {
            var h = origCell.apply(this, arguments);
            if (schlPending(d)) h += '<div style="margin-top:4px;font-size:11px;color:#1d4ed8;white-space:nowrap;">Sửa chữa, bổ sung lần ' + d.scPending.n + ': chờ cập nhật hiệu lực</div>';
            return h;
        };
    }
    // Xem chi tiết: Khối Quyết định sửa chữa, bổ sung - trạng thái hiệu lực từng lần
    if (typeof ctqdAmendHtml === 'function') {
        var origAmend = ctqdAmendHtml;
        ctqdAmendHtml = function (d) {
            var h = origAmend.apply(this, arguments);
            if (!h || !d) return h;
            (d.amendments || []).forEach(function (a, i) {
                var head = 'Quyết định sửa chữa, bổ sung lần ' + (i + 1) + ' - Đã ban hành';
                var st = (d.scPending && d.scPending.n === i + 1) ? 'Đã ban hành, chờ cập nhật hiệu lực' : (a.hieuLuc === SCHL_OFF ? 'Không có hiệu lực (không áp dụng)' : (a.hieuLuc === SCHL_ON ? 'Có hiệu lực' : 'Đã ban hành'));
                var extra = a.hieuLuc === SCHL_OFF ? ctqdF('Lý do cập nhật trạng thái', esc(a.hlReason || '-'), true) : '';
                // Lịch sử thay đổi tiền: Tổng số tiền bồi thường trước / sau lần sửa chữa, bổ sung
                if (a.scbfChanged && a.scbfBefore && a.formData && typeof scbfOf === 'function') {
                    var bef = num(a.scbfBefore.total), aft = scbfOf(a.formData).total;
                    if (bef !== aft) extra = ctqdF('Tổng số tiền bồi thường trước / sau (VNĐ)', fmt(bef) + ' → ' + fmt(aft) + (a.hieuLuc === SCHL_OFF ? ' (không áp dụng)' : '')) + extra;
                }
                // Biểu tượng theo trạng thái hiệu lực: chờ cập nhật (cam), Không có hiệu lực (đỏ), còn lại giữ dấu tích
                var pend = d.scPending && d.scPending.n === i + 1, off = a.hieuLuc === SCHL_OFF;
                var ico = pend ? '<i class="fa-solid fa-hourglass-half" style="color:#d97706;"></i> ' : (off ? '<i class="fa-solid fa-circle-xmark" style="color:#dc2626;"></i> ' : '<i class="fa-solid fa-circle-check"></i> ');
                var txt = 'Quyết định sửa chữa, bổ sung lần ' + (i + 1) + ' - ' + st;
                if (pend) txt = '<span style="color:#b45309;">' + txt + '</span>'; else if (off) txt = '<span style="color:#b91c1c;">' + txt + '</span>';
                h = h.replace('<i class="fa-solid fa-circle-check"></i> ' + head + '</div><div class="ctqd-grid">', ico + txt + '</div><div class="ctqd-grid">' + extra);
            });
            return h;
        };
    }
})();
