/* [mh05] Màn Xem chi tiết hồ sơ yêu cầu bồi thường (SRS MH05)
 * 1. Khối Lý do bị trả lại, Thông tin không thụ lý hồ sơ, Thông tin chuyển cơ quan giải quyết bồi thường,
 *    Thông tin xử lý và trình duyệt: hiển thị đầu Tab "Chi tiết giải quyết bồi thường" (Lý do bị trả lại trên cùng).
 * 2. Tab "Chi tiết giải quyết bồi thường": điều kiện cũ HOẶC hồ sơ có dữ liệu của 04 khối trên;
 *    hiển thị chỉ do 04 khối: ẩn các khối theo bước, giữ Lịch sử xử lý.
 * 3. Không được xem chi tiết hồ sơ: dải thông báo thay cho nội dung màn hình (không dùng toast), nút Quay lại.
 * Đặt sau mọi script bọc showCaseDetail / renderReadOnlyClaimInfo.
 */
(function () {
    var PRE_IDS = ['gqReturnedBlock', 'ktlvInfoBlock', 'ktlvTransferBlock', 'gqWfInfoBox'];
    function el(id) { return document.getElementById(id); }
    function isPhddCase(claim) { return typeof isPhddStarted === 'function' && isPhddStarted(claim); }
    function preBox() {
        var tab = el('detailTabXuLy');
        if (!tab) return null;
        var box = el('mh05Tab2Pre');
        if (!box) {
            box = document.createElement('div');
            box.id = 'mh05Tab2Pre';
            tab.insertBefore(box, tab.firstChild);
        }
        return box;
    }
    // Chuyển 04 khối từ Tab 1 sang đầu Tab 2 theo thứ tự PRE_IDS
    function moveBlocks(claim) {
        var box = preBox();
        if (!box) return;
        box.innerHTML = '';
        var src = el('readOnlyClaimInfo');
        if (!src || (claim && isPhddCase(claim))) return;
        PRE_IDS.forEach(function (id) {
            var b = src.querySelector('#' + id);
            if (b) box.appendChild(b);
        });
    }
    var origRRO = window.renderReadOnlyClaimInfo;
    if (typeof origRRO === 'function') window.renderReadOnlyClaimInfo = function (claim) {
        var r = origRRO.apply(this, arguments);
        try { moveBlocks(claim); } catch (e) { /* mockup */ }
        return r;
    };

    // Dải thông báo không được xem chi tiết hồ sơ
    window.gqDetailShowDenied = function (msg) {
        ['caseDetailSection', 'inlineClaimFormPanel', 'subTabContentResolver'].forEach(function (id) { var e = el(id); if (e) e.style.display = 'none'; });
        var anchor = el('subTabContentResolver');
        if (!anchor) { if (typeof showToast === 'function') showToast(msg, 'error'); return; }
        var box = el('gqDetailDenied');
        if (!box) {
            box = document.createElement('div');
            box.id = 'gqDetailDenied';
            box.style.cssText = 'margin:16px 0; padding:18px 20px; background:#fef2f2; border:1px solid #fecaca; border-left:4px solid #dc2626; border-radius:8px; color:#991b1b; font-size:14px; display:flex; gap:10px; align-items:flex-start;';
            anchor.parentNode.insertBefore(box, anchor);
        }
        var esc = typeof ycEsc === 'function' ? ycEsc : function (s) { return String(s); };
        box.innerHTML = '<i class="fa-solid fa-lock" style="margin-top:3px;"></i><div style="flex:1;"><div style="font-weight:700; margin-bottom:4px;">Không thể xem chi tiết hồ sơ</div><div>' + esc(msg) + '</div>'
            + '<div style="margin-top:12px;"><button type="button" class="btn btn-secondary" onclick="gqDetailDeniedBack()"><i class="fa-solid fa-arrow-left"></i> Quay lại</button></div></div>';
        box.style.display = 'flex';
        try { window.scrollTo(0, 0); } catch (e) { /* mockup */ }
    };
    window.gqDetailDeniedBack = function () {
        var box = el('gqDetailDenied');
        if (box) box.remove();
        var list = el('subTabContentResolver');
        if (list) list.style.display = 'block';
        if (typeof renderClaimsTable === 'function') { try { renderClaimsTable(); } catch (e) { /* mockup */ } }
    };

    var origSCD = window.showCaseDetail;
    if (typeof origSCD === 'function') window.showCaseDetail = function (id) {
        var tab = el('detailTabXuLy');
        if (tab) tab.querySelectorAll('[data-mh05-hidden="1"]').forEach(function (x) { x.style.display = ''; x.removeAttribute('data-mh05-hidden'); });
        var r = origSCD.apply(this, arguments);
        try {
            var sec = el('caseDetailSection');
            if (!sec || sec.style.display !== 'block') return r;
            var denied = el('gqDetailDenied');
            if (denied) denied.remove();
            var claim = ((typeof claimsList !== "undefined" && claimsList) || []).find(function (c) { return c.id === id; });
            if (!claim || isPhddCase(claim)) return r;
            var box = el('mh05Tab2Pre');
            var t2 = el('detailTab2Btn');
            // Tab 2 hiển thị khi hồ sơ có dữ liệu của ít nhất 01 khối thuộc Tab 2 (04 khối trên, Lịch sử Yêu cầu bổ sung):
            // chỉ giữ các khối có dữ liệu và Lịch sử xử lý
            var hBs = el('accHead_bosung');
            var bs = hBs ? hBs.closest('.accordion-item') : null;
            var hasBs = !!(bs && bs.style.display !== 'none' && (Array.isArray(claim.bosungLogs) && claim.bosungLogs.length > 0));
            if (t2 && t2.style.display === 'none' && ((box && box.children.length) || hasBs)) {
                t2.style.display = 'inline-block';
                var kq = el('detailSubTabKqXl');
                if (kq) Array.prototype.forEach.call(kq.children, function (x) {
                    if (x.classList.contains('accordion-item') && x !== (hasBs ? bs : null) && x.style.display !== 'none') { x.style.display = 'none'; x.setAttribute('data-mh05-hidden', '1'); }
                });
            }
            // Tiêu đề các khối theo bước: đánh số liên tục theo các khối đang hiển thị
            var kq2 = el('detailSubTabKqXl'), no = 0;
            if (kq2) Array.prototype.forEach.call(kq2.children, function (x) {
                if (!x.classList.contains('accordion-item') || x.style.display === 'none') return;
                var sp = x.querySelector('.accordion-header > span');
                if (sp && /^\s*\d+\.\s/.test(sp.textContent)) sp.textContent = sp.textContent.replace(/^\s*\d+\.\s*/, (++no) + '. ');
            });
            // Hồ sơ Bị trả lại: mở Tab 2, cuộn tới khối Lý do bị trả lại, nhấn mạnh khối trong thời gian ngắn
            var ret = box && box.querySelector('#gqReturnedBlock');
            if (ret && !(typeof isDetailEditMode !== "undefined" && isDetailEditMode) && t2 && t2.style.display !== 'none') {
                if (typeof switchDetailTab === 'function') switchDetailTab('xu-ly');
                mh05Focus(ret);
            }
        } catch (e) { /* mockup */ }
        return r;
    };
    function mh05Css() {
        if (el('mh05Css')) return;
        var st = document.createElement('style');
        st.id = 'mh05Css';
        st.textContent = '.mh05-flash { box-shadow: 0 0 0 3px rgba(245, 158, 11, .55) !important; transition: box-shadow .3s; } .mh05-focus:focus { outline: none; }';
        (document.head || document.documentElement).appendChild(st);
    }
    function mh05Focus(t) {
        mh05Css();
        var go = function () {
            if (!t.isConnected) return;
            if (t.scrollIntoView) t.scrollIntoView({ block: 'start' });
            t.setAttribute('tabindex', '-1');
            t.classList.add('mh05-focus');
            try { t.focus({ preventScroll: true }); } catch (e) { /* mockup */ }
            t.classList.add('mh05-flash');
            clearTimeout(t._mh05Flash);
            t._mh05Flash = setTimeout(function () { t.classList.remove('mh05-flash'); }, 1600);
        };
        go();
        setTimeout(go, 200); // sau các xử lý mở khối / cuộn của script khác
    }
    window.mh05FocusBlock = mh05Focus;

    // Cập nhật hồ sơ Bị trả lại (form / popup trình lại): cuộn tới khối Lý do bị trả lại trên form / popup
    var oOpen = window.openInlineClaimForm;
    if (typeof oOpen === 'function') window.openInlineClaimForm = function () {
        var old = el('mh05FormReturned');
        if (old) old.remove();
        return oOpen.apply(this, arguments);
    };
    // Form Nhập liệu hồ sơ vụ việc (Loại trình Tiếp nhận hồ sơ bị trả lại): khối Lý do bị trả lại đầu form
    function addFormReturned(claimId) {
        var panel = el('inlineClaimFormPanel');
        if (!panel || panel.style.display === 'none' || el('mh05FormReturned') || el('cdpdFormReturned') && el('cdpdFormReturned').offsetParent !== null) return;
        if (typeof gqRecord !== 'function' || typeof gqReturnedBlockHtml !== 'function' || typeof gqW !== 'function') return;
        var claim = ((typeof claimsList !== "undefined" && claimsList) || []).find(function (c) { return c.id === claimId; });
        var rec = claim ? gqRecord(claim) : null;
        if (!rec || rec.status !== 'Bị trả lại' || !rec.returned) return;
        var body = panel.querySelector('.inline-form-body') || panel;
        var wrap = document.createElement('div');
        wrap.id = 'mh05FormReturned';
        wrap.innerHTML = gqReturnedBlockHtml(gqW(), rec);
        body.insertBefore(wrap, body.firstChild);
    }
    var oUpd = window.gqUpdateReturned;
    if (typeof oUpd === 'function') window.gqUpdateReturned = function (claimId) {
        var r = oUpd.apply(this, arguments);
        setTimeout(function () {
            try { addFormReturned(claimId); } catch (e) { /* mockup */ }
            var list = document.querySelectorAll('[id$="ReturnedAlertBlock"], [id$="ReturnedBlock"], [id$="FormReturned"], .gq-returned-block');
            var t = Array.prototype.find.call(list, function (x) { return x.offsetParent !== null && !x.closest('#mh05Tab2Pre'); });
            if (t) mh05Focus(t);
        }, 150);
        return r;
    };
})();
