/*
 * [ycbs] Giải quyết YCBT - Tiếp nhận hồ sơ bổ sung (vụ việc ở trạng thái "Yêu cầu bổ sung")
 * - Mở từ thao tác "Tiếp nhận" (lưới / màn Xem chi tiết) -> màn Nhập liệu hồ sơ vụ việc ở chế độ Tiếp nhận hồ sơ bổ sung
 * - Bảng Danh mục tài liệu gửi kèm / Văn bản làm căn cứ: dòng cũ gắn nhãn "Hồ sơ gốc" (chỉ đọc, không xóa), dòng thêm mới gắn nhãn "Bổ sung"
 * - Trường thông tin sửa so với bản trước bổ sung: nhãn "Đã cập nhật bổ sung" cạnh trường (giá trị cũ lưu ở ycbsBaseline / supplementDiff)
 * - Lưu: giữ luồng sẵn có (lưu thông tin -> popup Trình duyệt tiếp nhận hồ sơ), ghi lịch sử "Tiếp nhận hồ sơ bổ sung";
 *   màn Xem chi tiết sau đó vẫn hiển thị nhãn Bổ sung / Hồ sơ gốc / Đã cập nhật bổ sung
 * Bọc các hàm sẵn có của quan_ly_boi_thuong.html (openInlineClaimForm, renderDocsTable, renderVanBanCanCuRows, saveNewClaim, renderReadOnlyClaimInfo...).
 */
var YCBS_ST = 'Yêu cầu bổ sung';
var ycbsForm = null; // { claimId, ready } khi màn Nhập liệu đang ở chế độ Tiếp nhận hồ sơ bổ sung

// Trường theo dõi thay đổi: id control trên form, nhãn tại màn Xem chi tiết (khối Thông tin hồ sơ vụ việc)
var YCBS_FIELDS = [
    { id: 'claimNYCName', dt: ['Họ và tên', 'Tên tổ chức'] },
    { id: 'claimNYCBirth', dt: ['Ngày sinh'] },
    { id: 'claimNYCCardNo', dt: ['Số giấy tờ thân nhân'] },
    { id: 'claimNYCCardDate', dt: ['Ngày cấp'] },
    { id: 'claimNYCCardPlace', dt: ['Nơi cấp'] },
    { id: 'claimNYCPhone', dt: ['Số điện thoại'] },
    { id: 'claimNYCEmail', dt: ['Email'] },
    { id: 'claimNYCAddress', dt: ['Địa chỉ'] },
    { id: 'claimNYCWard', dt: ['Địa chỉ'] },
    { id: 'claimNYCCity', dt: ['Địa chỉ'] },
    { id: 'claimRequestDocDate', dt: ['Ngày văn bản yêu cầu bồi thường'] },
    { id: 'claimHanhVi', dt: ['Hành vi gây thiệt hại của người thi hành công vụ'] },
    { id: 'claimNhanQua', dt: ['Mối quan hệ nhân quả giữa thiệt hại thực tế xảy ra và hành vi gây thiệt hại'] },
    { id: 'claimThietHaiVal_1', row: 1 }, { id: 'claimThietHaiVal_2', row: 2 }, { id: 'claimThietHaiVal_3', row: 3 },
    { id: 'claimThietHaiVal_4', row: 4 }, { id: 'claimThietHaiVal_5', row: 5 }, { id: 'claimThietHaiVal_6', row: 6 },
    { id: 'claimThietHaiCalc_1', row: 1 }, { id: 'claimThietHaiCalc_2', row: 2 }, { id: 'claimThietHaiCalc_3', row: 3 },
    { id: 'claimThietHaiCalc_4', row: 4 }, { id: 'claimThietHaiCalc_5', row: 5 }, { id: 'claimThietHaiCalc_6', row: 6 }
];

function ycbsEsc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function ycbsClaim(id) { return (typeof claimsList !== 'undefined' && claimsList.find(function (c) { return c && c.id === id; })) || null; }
function ycbsStatusOf(c) { return c ? (typeof canonicalClaimStatus === 'function' ? canonicalClaimStatus(c.status) : c.status) : ''; }
function ycbsOfficer() { try { return getCurrentSimulatedOfficer() || ''; } catch (e) { return ''; } }
function ycbsNow() { try { var W = window.BTNN_WF; if (W && W.nowText) return W.nowText(); } catch (e) { /* mockup */ } return new Date().toLocaleString('vi-VN'); }
function ycbsActive() { return !!(ycbsForm && ycbsForm.ready); }
function ycbsBase() { var c = ycbsForm && ycbsClaim(ycbsForm.claimId); return c && c.ycbsBaseline; }

// Nhãn dùng chung (đồng nhất màn Xác định CQGQBT)
function ycbsTagHtml(kind) {
    return kind === 'bs'
        ? '<span class="ycbs-tag ycbs-tag-bs" style="background:#FFF7ED; color:#C2410C; border:1px solid #FDBA74; border-radius:4px; padding:1px 6px; font-size:11px; font-weight:600; margin-left:6px; display:inline-flex; align-items:center; gap:3px; white-space:nowrap;"><i class="fa-solid fa-circle-plus"></i> Bổ sung</span>'
        : '<span class="ycbs-tag ycbs-tag-goc" style="background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; border-radius:4px; padding:1px 6px; font-size:11px; font-weight:600; margin-left:6px; display:inline-flex; align-items:center; gap:3px; white-space:nowrap;"><i class="fa-solid fa-file"></i> Hồ sơ gốc</span>';
}
function ycbsDiffBadge(oldVal, at, by) {
    var tip = 'Đã cập nhật bổ sung' + (at ? ' lúc ' + at : '') + (by ? ' bởi ' + by : '') + '. Giá trị trước bổ sung: \'' + (oldVal || 'Trống') + '\'';
    return '<span class="ycbs-diff" style="display:inline-flex; align-items:center; gap:4px; margin-left:8px; font-size:11px; background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; border-radius:4px; padding:2px 6px; font-weight:600; cursor:help; white-space:nowrap;" title="' + ycbsEsc(tip) + '"><i class="fa-solid fa-clock-rotate-left"></i> Đã cập nhật bổ sung</span>';
}

// Khóa lần yêu cầu bổ sung hiện hành: mỗi lần yêu cầu bổ sung có 01 bản gốc để so sánh
function ycbsRoundKey(c) {
    var info = typeof getClaimSupplementRequestInfo === 'function' ? getClaimSupplementRequestInfo(c) : null;
    return (info ? info.date + '#' + (info.rounds || []).length : '') || 'ycbs';
}
function ycbsFieldVal(id) { var el = document.getElementById(id); return el ? String(el.value == null ? '' : el.value).trim() : ''; }
function ycbsDocKey(d) { return d && d.file ? 'f:' + d.file : 'n:' + String((d && d.name) || '').trim(); }
function ycbsVbKey(r) { return String((r && r.name) || '').trim() + '|' + String((r && r.file) || ''); }

// Bản gốc trước bổ sung: chụp khi mở Tiếp nhận lần đầu của lần yêu cầu bổ sung hiện hành
function ycbsEnsureBaseline(c) {
    var key = ycbsRoundKey(c);
    if (c.ycbsBaseline && c.ycbsBaseline.key === key) return c.ycbsBaseline;
    var fields = {};
    YCBS_FIELDS.forEach(function (f) { fields[f.id] = ycbsFieldVal(f.id); });
    c.ycbsBaseline = {
        key: key, at: ycbsNow(), fields: fields,
        docs: (currentDocsList || []).map(ycbsDocKey),
        vbcc: (vanBanCanCuRows || []).filter(function (r) { return r.name || r.file; }).map(ycbsVbKey)
    };
    return c.ycbsBaseline;
}
function ycbsClassify() {
    var b = ycbsBase();
    if (!b) return;
    (currentDocsList || []).forEach(function (d) { if (!d.ycbsTag) d.ycbsTag = b.docs.indexOf(ycbsDocKey(d)) >= 0 ? 'goc' : 'bs'; });
    (vanBanCanCuRows || []).forEach(function (r) { if (!r.ycbsTag) r.ycbsTag = (r.name || r.file) && b.vbcc.indexOf(ycbsVbKey(r)) >= 0 ? 'goc' : 'bs'; });
}

// ---------- Bảng Danh mục tài liệu gửi kèm ----------
function ycbsDecorateDocs() {
    if (!ycbsActive()) return;
    var rows = document.querySelectorAll('#claimDynamicDocsBody > tr');
    (currentDocsList || []).forEach(function (d, i) {
        var tr = rows[i];
        if (!tr || !tr.cells[1]) return;
        tr.cells[1].insertAdjacentHTML('beforeend', ycbsTagHtml(d.ycbsTag));
        tr.dataset.ycbsTag = d.ycbsTag || '';
        if (d.ycbsTag !== 'goc') return;
        // Hồ sơ gốc: chỉ đọc, không xóa (vẫn Xem file)
        var inp = tr.cells[1].querySelector('input'); if (inp) inp.readOnly = true;
        if (tr.cells[3]) tr.cells[3].querySelectorAll('a, span, button').forEach(function (a) {
            if ((/Xóa/.test(a.textContent) && !/Xem/.test(a.textContent)) || a.title === 'Xóa') { a.removeAttribute('onclick'); a.classList.add('is-disabled'); a.style.opacity = '0.35'; a.style.pointerEvents = 'none'; a.title = 'Tài liệu thuộc hồ sơ gốc: không xóa'; }
        });
    });
}
function ycbsDecorateVbcc() {
    if (!ycbsActive()) return;
    var rows = document.querySelectorAll('#claimVanBanCanCuBody > tr');
    (vanBanCanCuRows || []).forEach(function (r, i) {
        var tr = rows[i];
        if (!tr || !tr.cells[1]) return;
        var inp = tr.cells[1].querySelector('input');
        if (inp) { var wrap = document.createElement('div'); wrap.style.cssText = 'display:flex; align-items:center; gap:4px;'; inp.parentNode.insertBefore(wrap, inp); wrap.appendChild(inp); wrap.insertAdjacentHTML('beforeend', ycbsTagHtml(r.ycbsTag)); }
        tr.dataset.ycbsTag = r.ycbsTag || '';
        if (r.ycbsTag !== 'goc') return;
        if (inp) inp.readOnly = true;
        if (tr.cells[3]) tr.cells[3].querySelectorAll('a, button').forEach(function (a) {
            if (/Xóa/.test(a.textContent) || a.title === 'Xóa') { a.classList.add('is-disabled'); a.removeAttribute('onclick'); a.style.opacity = '0.35'; a.style.pointerEvents = 'none'; a.title = 'Văn bản thuộc hồ sơ gốc: không xóa'; }
        });
    });
}

// ---------- Nhãn "Đã cập nhật bổ sung" trên form ----------
function ycbsFieldLabel(el) {
    var g = el.closest('.form-group');
    var lb = (g && g.querySelector('.form-label, label')) || (el.id ? document.querySelector('label[for="' + el.id + '"]') : null);
    return lb;
}
function ycbsDiffs() {
    var b = ycbsBase();
    if (!b) return [];
    var out = [];
    YCBS_FIELDS.forEach(function (f) {
        var el = document.getElementById(f.id);
        if (!el || !(f.id in b.fields)) return;
        var nv = ycbsFieldVal(f.id), ov = b.fields[f.id];
        if (nv === ov) return;
        var lb = ycbsFieldLabel(el);
        var txt = f.id;
        if (lb) { var cl = lb.cloneNode(true); cl.querySelectorAll('.ycbs-diff, .required').forEach(function (x) { x.remove(); }); txt = cl.textContent.replace(/\*/g, '').replace(/\s+/g, ' ').trim(); }
        out.push({ field: f.id, label: txt, oldVal: ov, newVal: nv });
    });
    return out;
}
function ycbsRefreshFieldBadges() {
    var panel = document.getElementById('inlineClaimFormPanel');
    if (!panel) return;
    panel.querySelectorAll('.ycbs-diff').forEach(function (x) { x.remove(); });
    if (!ycbsActive()) return;
    var b = ycbsBase();
    var c = ycbsClaim(ycbsForm.claimId);
    ycbsDiffs().forEach(function (d) {
        var el = document.getElementById(d.field);
        var lb = el && ycbsFieldLabel(el);
        // Thiệt hại: gắn nhãn tại tên loại thiệt hại (ô checkbox), tránh trùng nhãn cho Cách tính / Số tiền
        var m = d.field.match(/^claimThietHai(?:Val|Calc)_(\d)$/);
        if (m) { var cb = document.getElementById('claimThietHaiCb_' + m[1]); lb = cb ? (cb.closest('label') || cb.parentElement) : lb; }
        if (!lb || lb.querySelector('.ycbs-diff')) return;
        lb.insertAdjacentHTML('beforeend', ycbsDiffBadge(d.oldVal, '', ''));
    });
}

// Chú thích chế độ Tiếp nhận hồ sơ bổ sung (dưới khối Thông tin yêu cầu bổ sung hồ sơ)
function ycbsLegendHtml() {
    return '<div id="ycbsLegend" style="margin:-10px 0 20px; font-size:12px; color:#475569; display:flex; flex-wrap:wrap; align-items:center; gap:6px 14px;">'
        + '<span><strong>Tiếp nhận hồ sơ bổ sung:</strong></span>'
        + '<span>' + ycbsTagHtml('goc') + ' tài liệu đã có trước khi bổ sung (chỉ xem, không xóa)</span>'
        + '<span>' + ycbsTagHtml('bs') + ' tài liệu thêm mới khi bổ sung</span>'
        + '<span>' + ycbsDiffBadge('', '', '').replace('cursor:help;', '') + ' trường thông tin sửa so với hồ sơ trước bổ sung</span></div>';
}

(function () {
    // ----- Mở màn Nhập liệu: chế độ Tiếp nhận hồ sơ bổ sung -----
    var origOpen = window.openInlineClaimForm;
    if (typeof origOpen === 'function') window.openInlineClaimForm = function (id) {
        var c = id ? ycbsClaim(id) : null;
        var on = !!c && ycbsStatusOf(c) === YCBS_ST;
        ycbsForm = on ? { claimId: c.id, ready: false } : null;
        var r = origOpen.apply(this, arguments);
        var old = document.getElementById('ycbsLegend'); if (old) old.remove();
        if (on) {
            try {
                (currentDocsList || []).forEach(function (d) { delete d.ycbsTag; });
                (vanBanCanCuRows || []).forEach(function (x) { delete x.ycbsTag; });
                ycbsEnsureBaseline(c);
                ycbsForm.ready = true;
                ycbsClassify();
                renderDocsTable();
                renderVanBanCanCuRows();
                var blk = document.getElementById('editFormBosungAlertBlock');
                if (blk) blk.insertAdjacentHTML('afterend', ycbsLegendHtml());
                ycbsRefreshFieldBadges();
            } catch (e) { console.warn('[ycbs] open', e); }
        } else ycbsRefreshFieldBadges();
        return r;
    };
    var origClose = window.closeInlineClaimForm;
    if (typeof origClose === 'function') window.closeInlineClaimForm = function () {
        var r = origClose.apply(this, arguments);
        ycbsForm = null;
        var old = document.getElementById('ycbsLegend'); if (old) old.remove();
        ycbsRefreshFieldBadges();
        return r;
    };

    // ----- Bảng tài liệu: nhãn + chặn xóa dòng Hồ sơ gốc -----
    var origDocs = window.renderDocsTable;
    if (typeof origDocs === 'function') window.renderDocsTable = function () {
        if (ycbsActive()) ycbsClassify();
        var r = origDocs.apply(this, arguments);
        try { ycbsDecorateDocs(); } catch (e) { /* mockup */ }
        return r;
    };
    var origVb = window.renderVanBanCanCuRows;
    if (typeof origVb === 'function') window.renderVanBanCanCuRows = function () {
        if (ycbsActive()) ycbsClassify();
        var r = origVb.apply(this, arguments);
        try { ycbsDecorateVbcc(); } catch (e) { /* mockup */ }
        return r;
    };
    function guardRow(list, idx, msg) {
        var d = ycbsActive() && list && list[idx];
        if (d && d.ycbsTag === 'goc') { showToast(msg, 'error'); return true; }
        return false;
    }
    ['deleteDocRow', 'clearDocFile'].forEach(function (fn) {
        var o = window[fn];
        if (typeof o === 'function') window[fn] = function (idx) {
            if (guardRow(currentDocsList, idx, 'Tài liệu thuộc hồ sơ gốc, không được xóa khi tiếp nhận hồ sơ bổ sung.')) return;
            return o.apply(this, arguments);
        };
    });
    var oDelVb = window.deleteVanBanCanCuRow;
    if (typeof oDelVb === 'function') window.deleteVanBanCanCuRow = function (idx) {
        if (guardRow(vanBanCanCuRows, idx, 'Văn bản thuộc hồ sơ gốc, không được xóa khi tiếp nhận hồ sơ bổ sung.')) return;
        return oDelVb.apply(this, arguments);
    };
    // Dòng hồ sơ gốc chưa có tệp: tệp tải lên khi tiếp nhận bổ sung là tài liệu bổ sung
    var oUp = window.uploadDocFile;
    if (typeof oUp === 'function') window.uploadDocFile = function (input, idx) {
        var d = ycbsActive() && currentDocsList[idx];
        if (d && !d.file && input && input.files && input.files[0]) d.ycbsTag = 'bs';
        return oUp.apply(this, arguments);
    };
    var oUpVb = window.uploadVanBanCanCuFile;
    if (typeof oUpVb === 'function') window.uploadVanBanCanCuFile = function (idx, input) {
        var r0 = ycbsActive() && vanBanCanCuRows[idx];
        if (r0 && !r0.file && input && input.files && input.files[0]) r0.ycbsTag = 'bs';
        return oUpVb.apply(this, arguments);
    };

    // ----- Nhãn Đã cập nhật bổ sung: cập nhật khi nhập liệu -----
    document.addEventListener('input', function (e) { if (ycbsActive() && e.target && e.target.closest && e.target.closest('#inlineClaimFormPanel')) ycbsRefreshFieldBadges(); }, true);
    document.addEventListener('change', function (e) { if (ycbsActive() && e.target && e.target.closest && e.target.closest('#inlineClaimFormPanel')) setTimeout(ycbsRefreshFieldBadges, 0); }, true);

    // ----- Lưu tiếp nhận hồ sơ bổ sung: giữ luồng sẵn có, ghi nhận nhãn Bổ sung / Hồ sơ gốc / Đã cập nhật bổ sung -----
    var origSave = window.saveNewClaim;
    if (typeof origSave === 'function') window.saveNewClaim = function () {
        if (!ycbsActive()) return origSave.apply(this, arguments);
        var c = ycbsClaim(ycbsForm.claimId);
        if (!c) return origSave.apply(this, arguments);
        var docs = (currentDocsList || []).map(function (d) { return { file: d.file, tag: d.ycbsTag }; });
        var vbs = (vanBanCanCuRows || []).map(function (r) { return { key: ycbsVbKey({ name: String(r.name || '').trim(), file: r.file || '' }), tag: r.ycbsTag }; });
        var diffs = ycbsDiffs();
        var tl0 = (c.timeline || []).length;
        var r = origSave.apply(this, arguments);
        try {
            var tl = c.timeline || [];
            var last = tl[tl.length - 1];
            if (tl.length > tl0 && last && last.title === 'Tiếp nhận hồ sơ bổ sung') {
                var at = ycbsNow(), by = ycbsOfficer();
                (c.files || []).forEach(function (f) {
                    var d = docs.find(function (x) { return x.file && x.file === f.name; });
                    f.isSupplement = !!(d && d.tag === 'bs');
                });
                (c.vanBanCanCu || []).forEach(function (v) {
                    var m = vbs.find(function (x) { return x.key === ycbsVbKey(v); });
                    v.isSupplement = !!(m && m.tag === 'bs');
                });
                var key = c.ycbsBaseline ? c.ycbsBaseline.key : '';
                c.supplementDiff = (c.supplementDiff || []).filter(function (x) { return x.round !== key; })
                    .concat(diffs.map(function (d) { return Object.assign({ round: key, at: at, by: by }, d); }));
                c.ycbsReceived = true;
                var nBs = (c.files || []).filter(function (f) { return f.isSupplement; }).length + (c.vanBanCanCu || []).filter(function (v) { return v.isSupplement; }).length;
                last.desc = 'Cán bộ tiếp nhận hồ sơ bổ sung: ' + nBs + ' tài liệu bổ sung'
                    + (diffs.length ? '; cập nhật bổ sung: ' + diffs.map(function (d) { return d.label; }).join(', ') : '; không thay đổi trường thông tin')
                    + '. Trình Lãnh đạo phê duyệt tiếp nhận hồ sơ.';
                ycbsForm = null;
                if (typeof saveClaimsToLocal === 'function') saveClaimsToLocal();
            }
        } catch (e) { console.warn('[ycbs] save', e); }
        return r;
    };

    // ----- Màn Xem chi tiết: nhãn Bổ sung / Hồ sơ gốc, Đã cập nhật bổ sung -----
    var origRo = window.renderReadOnlyClaimInfo;
    if (typeof origRo === 'function') window.renderReadOnlyClaimInfo = function (claim) {
        var r = origRo.apply(this, arguments);
        try { ycbsDecorateDetail(claim); } catch (e) { /* mockup */ }
        return r;
    };
})();

function ycbsDecorateDetail(claim) {
    var box = document.getElementById('readOnlyClaimInfo');
    if (!box || !claim) return;
    var hasBs = (claim.files || []).some(function (f) { return f && f.isSupplement; }) || (claim.vanBanCanCu || []).some(function (v) { return v && v.isSupplement; });
    var diffs = claim.supplementDiff || [];
    if (!hasBs && !diffs.length && !claim.ycbsReceived) return;
    // Bảng tài liệu đính kèm hồ sơ (thẻ tệp theo thứ tự claim.files)
    var chips = [];
    box.querySelectorAll('div').forEach(function (dv) {
        if (dv.textContent.trim() === '' || !/BẢNG TÀI LIỆU ĐÍNH KÈM HỒ SƠ/.test(dv.textContent)) return;
        if (dv.children.length && /BẢNG TÀI LIỆU ĐÍNH KÈM HỒ SƠ/.test(dv.children[0].textContent) && dv.children.length > 1) chips = Array.prototype.slice.call(dv.children, 1);
    });
    (claim.files || []).forEach(function (f, i) {
        var ch = chips[i];
        if (ch && !ch.querySelector('.ycbs-tag')) { var sp = ch.querySelector('span'); (sp || ch).insertAdjacentHTML('afterend', ycbsTagHtml(f.isSupplement ? 'bs' : 'goc')); }
    });
    // Văn bản làm căn cứ yêu cầu bồi thường
    var vb = (claim.vanBanCanCu || []).filter(function (v) { return v && (v.name || v.file); });
    var vbRows = box.querySelectorAll('#readOnlyVanBanCanCu tbody tr');
    vb.forEach(function (v, i) {
        var tr = vbRows[i];
        if (tr && tr.cells[1] && !tr.cells[1].querySelector('.ycbs-tag')) tr.cells[1].insertAdjacentHTML('beforeend', ycbsTagHtml(v.isSupplement ? 'bs' : 'goc'));
    });
    // Trường đã cập nhật bổ sung (lần gần nhất của từng trường)
    var seen = {};
    diffs.slice().reverse().forEach(function (d) {
        if (seen[d.field]) return;
        seen[d.field] = 1;
        var f = YCBS_FIELDS.find(function (x) { return x.id === d.field; });
        if (!f) return;
        var host = null;
        if (f.row) {
            var trs = box.querySelectorAll('table.custom-table tbody tr');
            for (var k = 0; k < trs.length; k++) { var s = trs[k].querySelector('td strong'); if (s && s.textContent.trim().indexOf(f.row + '. ') === 0) { host = s; break; } }
        } else {
            var strongs = box.querySelectorAll('strong');
            for (var j = 0; j < strongs.length; j++) {
                var t = strongs[j].textContent.replace(/:\s*$/, '').trim();
                if (f.dt.indexOf(t) >= 0) { host = strongs[j]; break; }
            }
        }
        if (host && !(host.parentElement && host.parentElement.querySelector('.ycbs-diff'))) host.insertAdjacentHTML('afterend', ycbsDiffBadge(d.oldVal, d.at, d.by));
    });
}
