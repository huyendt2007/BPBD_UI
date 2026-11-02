/*
 * [kttr] Giải quyết YCBT (quan_ly_boi_thuong.html) - Kiểm tra hồ sơ cùng số giấy tờ người bị thiệt hại trước khi trình ký Thông báo thụ lý
 * - Bọc openTndModal (mọi đường mở Popup Trình duyệt Thông báo thụ lý: Trình duyệt tại MH02 khi Tiếp nhận / tạo mới / Cập nhật hồ sơ Bị trả lại).
 * - Có >= 01 hồ sơ khác cùng số giấy tờ người bị thiệt hại trên toàn hệ thống: mở Popup "Danh sách hồ sơ giải quyết bồi thường cùng số giấy tờ
 *   người bị thiệt hại"; "Xác nhận trình ký" -> mở Popup Trình duyệt Thông báo thụ lý như hiện tại; "Đóng" -> đóng, không trình.
 * - Không có hồ sơ trùng: mở thẳng Popup Trình duyệt Thông báo thụ lý.
 * - Số giấy tờ người bị thiệt hại: cá nhân -> Số giấy tờ thân nhân; tổ chức (kể cả tổ chức bị thiệt hại
 *   đã chấm dứt tồn tại) -> Mã số tổ chức (cùng quy tắc cột Số giấy tờ người bị thiệt hại của Tra cứu vụ việc). Tư cách = Người bị thiệt hại: theo người yêu cầu. So khớp chính xác, bỏ hồ sơ hiện tại.
 * - Phạm vi: mọi hồ sơ Giải quyết YCBT (mọi trạng thái, kể cả Chờ tiếp nhận) + hồ sơ Giải quyết YCBT đang ở Tiếp nhận hồ sơ
 *   (Chờ phân công / Đang phân công - kho luồng BTNN_WF; Chờ duyệt tiếp nhận / Bị trả lại - danh sách Tiếp nhận hồ sơ).
 * - Cột và quyền xem chi tiết như Tra cứu vụ việc (tra_cuu_ho_so_boi_thuong.html); hồ sơ đang ở Tiếp nhận hồ sơ: chỉ xem trên danh sách.
 * - Dữ liệu mẫu: BT-2026-601 (Vương Thị Thu Trang, 001187006601) trùng hồ sơ tra_cuu_seed_tcvv.js (KTTR_ROWS) và hồ sơ Chờ phân công VVBT-2026-951.
 * Nạp sau quan_ly_boi_thuong_nbth.js (kiểm tra thiếu thông tin người bị thiệt hại chạy trước) và trước quan_ly_boi_thuong_cdpd.js.
 */
(function () {
    'use strict';
    var R_NBTH = 'Người bị thiệt hại', T_TC = 'Tổ chức', YCBT = 'Giải quyết yêu cầu bồi thường';
    var TN_STATUSES = ['Chờ phân công', 'Đang phân công'];
    var TN_ITEM_STATUSES = ['Chờ duyệt tiếp nhận', 'Bị trả lại', 'Chờ phân công', 'Đang phân công'];
    var NO_DETAIL_MSG = 'Chỉ Cơ quan giải quyết, Sở Tư pháp quản lý Cơ quan giải quyết, Bộ Tư pháp và Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước được xem chi tiết';
    var TN_NO_DETAIL_MSG = 'Hồ sơ đang ở bước Tiếp nhận hồ sơ, chỉ xem trên danh sách';
    var FIELD = { 'hành chính': 'Quản lý hành chính', 'hình sự': 'Tố tụng hình sự', 'dân sự': 'Tố tụng dân sự', 'tố tụng hành chính': 'Tố tụng hành chính', 'thi hành án hình sự': 'Thi hành án hình sự', 'thi hành án dân sự': 'Thi hành án dân sự' };
    var st = { rows: [], page: 1, size: 20, go: null };

    function W() { return window.BTNN_WF || null; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function norm(s) { return String(s || '').replace(/\s+/g, '').toUpperCase(); }
    function isOrgNyc(o) { return o.nycType === T_TC || /tổ chức/i.test(String(o.nycType || o.cardType || '')) || (!o.nycCardNo && !o.cardNo && !o.nycDocNo && !!o.nycOrgCode); }

    // ---------- Số giấy tờ người bị thiệt hại dùng để kiểm tra trùng ----------
    function victimKeyRaw(o) {
        if (!o) return '';
        var role = o.nycRole || o.role || R_NBTH;
        var n = o.nbth || {};
        if (role === R_NBTH) return String((isOrgNyc(o) ? o.nycOrgCode : (o.nycCardNo || o.cardNo || o.nycDocNo)) || '').trim();
        if (/^Tổ chức kế thừa/.test(role)) return String((o.nbthOrgCode || n.orgCode) || '').trim();
        return String((n.type === T_TC ? n.orgCode : (n.docNo || n.cardNo)) || '').trim();
    }
    function victimKey(o) { return norm(victimKeyRaw(o)); }

    // ---------- Cột như Tra cứu vụ việc ----------
    function nycDocNo(o) {
        var personal = o.nycCardNo || o.cardNo || o.nycDocNo || '';
        return String((isOrgNyc(o) ? (o.nycOrgCode || personal) : personal) || '').trim();
    }
    function victimName(o) {
        var role = o.nycRole || o.role || R_NBTH;
        if (role === R_NBTH) return o.nyc || o.nycName || '';
        if (/^Tổ chức kế thừa/.test(role)) return o.nbthOrgName || (o.nbth && (o.nbth.orgName || o.nbth.name)) || '';
        return (o.nbth && o.nbth.name) || '';
    }
    // Cột Số giấy tờ người bị thiệt hại: cùng giá trị dùng để kiểm tra trùng (cá nhân: Số giấy tờ thân nhân; tổ chức: Mã số tổ chức)
    function victimDocNo(o) { return victimKeyRaw(o); }
    function vbcc(o) {
        var list = (Array.isArray(o.vanBanCanCu) ? o.vanBanCanCu : []).map(function (v) { return String((v && (v.name || v.file || v.fileName)) || '').trim(); }).filter(Boolean);
        if (!list.length && o.docBase) list.push(String(o.docBase).trim());
        return list;
    }
    function kind(o) {
        if (o.requestType === 'honor' || o.requestType === 'money' || o.requestType === 'both') return o.requestType;
        return o.restoreHonor ? 'both' : 'money';
    }
    function phddCase(ph) {
        var n = String(ph || '');
        if (/^(Tạm hoãn|Hoãn phục hồi danh dự)$/.test(n)) return 'Hoãn phục hồi danh dự';
        if (/^(Từ chối|Từ chối phục hồi danh dự)$/.test(n)) return 'Từ chối phục hồi danh dự';
        if (n === 'Hoàn thành' || n === 'Đình chỉ giải quyết') return n;
        return 'Đang phục hồi danh dự';
    }
    function caseStatus(o) {
        var s = o.status || 'Chờ tiếp nhận';
        if (kind(o) === 'honor' && o.phddStarted && o.phddStatus) return phddCase(o.phddStatus);
        if (kind(o) !== 'both' || !o.phddStatus) return s;
        return s === 'Hoàn thành' ? phddCase(o.phddStatus) : s;
    }
    function unitOf(name) { try { var w = W(); return w && w.resolveAgencyUnit ? (w.resolveAgencyUnit(name) || '') : ''; } catch (e) { return ''; } }
    function addrOf(idOrName) { try { var w = W(); return w && w.agencyAddress ? (w.agencyAddress(idOrName) || {}) : {}; } catch (e) { return {}; } }
    function isStp(id) { var w = W(); if (w && w.isStpUnit) return w.isStpUnit(id); var u = w && w.getUnit ? w.getUnit(id) : null; return !!u && /^Sở Tư pháp/i.test(u.name); }
    function vvOf(o) {
        var w = W();
        try { if (w && o.code) return w.isVuViecCode(o.code) ? o.code : (w.vuViecOf(o.code, { preferred: o.maVuViec }) || o.maVuViec || ''); } catch (e) { }
        return o.maVuViec || '';
    }
    function fromClaim(o, preview) {
        var uid = unitOf(o.agency);
        var w = W();
        var a = addrOf(uid || o.agency);
        return {
            src: 'gq', preview: !!preview, code: o.code || '', maVuViec: vvOf(o), date: o.date || '',
            nyc: o.nyc || o.nycName || '', nycDocNo: nycDocNo(o), victimName: victimName(o), victimDocNo: victimDocNo(o), vbcc: vbcc(o),
            field: FIELD[o.fieldGroup] || o.fieldGroup || '--', agencyUnitId: uid, agencyName: uid && w ? w.unitName(uid) : (o.agency || ''),
            agencyStp: uid && w && w.stpOfUnit ? (w.stpOfUnit(uid) || '') : '', tinh: a.tinh || '', phuong: String(a.phuong || '').replace(/^\d+\s*-\s*/, ''),
            hasPhdd: kind(o) !== 'money', status: caseStatus(o)
        };
    }
    // Hồ sơ đang ở Tiếp nhận hồ sơ (kho luồng / danh sách Tiếp nhận): chưa có Mã hồ sơ GQBT khi mã là VVBT-
    function fromReception(r) {
        var w = W();
        var uid = r.rootUnitId || r.currentUnitId || '';
        var a = addrOf(uid);
        var lv = String(r.linhVuc || '').trim().toUpperCase();
        var fg = Object.keys(FIELD).filter(function (k) { return lv === ('TRONG HOẠT ĐỘNG ' + FIELD[k]).toUpperCase(); })[0];
        var o = Object.assign({}, r, { nyc: r.nycName || r.nyc || '' });
        return {
            src: 'tn', code: /^VVBT-/.test(r.code || '') ? '' : (r.code || ''), maVuViec: r.maVuViec || (/^VVBT-/.test(r.code || '') ? r.code : ''), date: r.date || '',
            nyc: o.nyc, nycDocNo: nycDocNo(o), victimName: victimName(o), victimDocNo: victimDocNo(o), vbcc: vbcc(o),
            field: fg ? FIELD[fg] : (r.linhVuc ? String(r.linhVuc).replace(/^TRONG HOẠT ĐỘNG\s*/i, '') : '--'),
            agencyUnitId: uid, agencyName: uid && w ? w.unitName(uid) : '', agencyStp: '', tinh: a.tinh || '', phuong: String(a.phuong || '').replace(/^\d+\s*-\s*/, ''),
            hasPhdd: /danh dự/i.test(String(r.requestKind || '')), status: r.status || 'Chờ phân công'
        };
    }

    // ---------- Tìm hồ sơ trùng trên toàn hệ thống ----------
    function findMatches(claim) {
        var key = victimKey(claim);
        if (!key) return [];
        var seen = {};
        var out = [];
        var self = function (o) { return o === claim || (o.id && o.id === claim.id) || (o.code && o.code === claim.code); };
        var push = function (o, row) { var k = o.code || ('id:' + o.id); if (seen[k]) return; seen[k] = 1; if (!self(o) && victimKey(o) === key) out.push(row(o)); };
        // 1. Hồ sơ Giải quyết YCBT (mọi trạng thái): dữ liệu của phân hệ + dữ liệu bổ sung của Tra cứu vụ việc
        (typeof claimsList !== 'undefined' && Array.isArray(claimsList) ? claimsList : []).forEach(function (c) { if (c && !c.deleted) push(c, function (x) { return fromClaim(x, false); }); });
        var extra = [];
        try { extra = typeof window.tcvvExtraClaims === 'function' ? window.tcvvExtraClaims() : []; } catch (e) { extra = []; }
        extra.forEach(function (c) { push(c, function (x) { return fromClaim(x, true); }); });
        // 2. Hồ sơ Giải quyết YCBT đang ở Tiếp nhận hồ sơ: Chờ phân công / Đang phân công
        var w = W();
        var recs = [];
        try { recs = w && w.loadRecords ? w.loadRecords() : []; } catch (e) { recs = []; }
        recs.forEach(function (r) { if (r && r.loaiYeuCau === YCBT && TN_STATUSES.indexOf(r.status) >= 0) push(r, fromReception); });
        // 3. Danh sách Tiếp nhận hồ sơ (Chờ duyệt tiếp nhận / Bị trả lại Phiếu tiếp nhận, chưa có hồ sơ luồng)
        var tn = [];
        try { tn = JSON.parse(localStorage.getItem('receptionClaimsList_v2026') || '[]') || []; } catch (e) { tn = []; }
        tn.forEach(function (r) { if (r && !r.deleted && (r.requestType === YCBT || !r.requestType) && r.code && TN_ITEM_STATUSES.indexOf(r.status || 'Chờ phân công') >= 0) push(r, fromReception); });
        var d = function (s) { var m = String(s || '').match(/^(\d{2})\/(\d{2})\/(\d{4})/); return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : 0; };
        return out.sort(function (a, b) { return d(b.date) - d(a.date); });
    }

    // ---------- Quyền xem chi tiết như Tra cứu vụ việc ----------
    function rootUnit() {
        var w = W(); if (!w) return '';
        var u = w.getCurrentUser(); if (!u) return '';
        var chain = w.getAncestors ? w.getAncestors(u.unitId) : [u.unitId];
        return chain.filter(isStp)[0] || w.getRootId(u.unitId) || u.unitId;
    }
    function isBtpOrCuc() {
        var w = W(); var u = w ? w.getCurrentUser() : null; if (!u) return false;
        return [u.unitId].concat((w.getAncestors && w.getAncestors(u.unitId)) || []).some(function (id) {
            var unit = w.getUnit(id);
            return /^BTP/.test(id) || (unit && /^Cục\b/i.test(unit.name) && /Bồi thường nhà nước/i.test(unit.name));
        });
    }
    function canView(row) {
        if (!row || row.src !== 'gq' || !row.code) return false;
        var root = rootUnit(); if (!root) return false;
        if (row.agencyUnitId && row.agencyUnitId === root) return true;
        if (isStp(root) && row.agencyStp === root) return true;
        return isBtpOrCuc();
    }
    function detailUrl(row) {
        var p = new URLSearchParams({ id: row.code, returnUrl: 'tra_cuu_ho_so_boi_thuong.html?v=1', returnActiveUrl: 'tra_cuu_ho_so_boi_thuong.html?v=1', readonly: '1', mode: 'detail' });
        if (['Đang phục hồi danh dự', 'Hoãn phục hồi danh dự'].indexOf(row.status) >= 0) p.set('focusTab', 'phdd');
        return 'quan_ly_boi_thuong.html?' + p.toString() + (row.preview ? '&tcvvPreview=1' : '') + '&newtab=1';
    }
    window.kttrOpenDetail = function (i) {
        var row = st.rows[i];
        if (!canView(row)) { if (typeof showToast === 'function') showToast(row && row.src === 'tn' ? TN_NO_DETAIL_MSG : NO_DETAIL_MSG, 'warning'); return; }
        window.open(detailUrl(row), '_blank');
    };

    // ---------- Popup ----------
    function badge(s) {
        var c = 'badge-info';
        if (s === 'Hoàn thành') c = 'badge-success';
        else if (['Chờ tiếp nhận', 'Chờ duyệt', 'Cử người giải quyết bồi thường', 'Cử người phục hồi danh dự', 'Chờ phân công', 'Đang phân công', 'Chờ duyệt tiếp nhận'].indexOf(s) >= 0) c = 'badge-pending';
        else if (['Yêu cầu bổ sung', 'Chờ ban hành QĐ', 'Chờ chi trả', 'Hoãn giải quyết', 'Tạm đình chỉ', 'Hoãn phục hồi danh dự'].indexOf(s) >= 0) c = 'badge-warning';
        else if (s === 'Bị trả lại') c = 'badge-tra-lai';
        else if (['Không thụ lý', 'Đình chỉ giải quyết', 'Dừng giải quyết', 'Từ chối phục hồi danh dự'].indexOf(s) >= 0) c = 'badge-danger';
        return '<span class="badge ' + c + '">' + esc(s) + '</span>';
    }
    function vbCell(names) {
        if (!names || !names.length) return '-';
        var tip = names.map(function (n, i) { return (i + 1) + '. ' + n; }).join('\n');
        return '<span title="' + esc(tip) + '">' + esc(names[0]) + (names.length > 1 ? '<span class="kttr-vb-more">+' + (names.length - 1) + '</span>' : '') + '</span>';
    }
    function css() {
        if (document.getElementById('kttrStyle')) return;
        var s = document.createElement('style'); s.id = 'kttrStyle';
        s.textContent = '#kttrOverlay .gq-modal{width:1240px;max-width:calc(100vw - 32px);min-width:0;}'
            + '#kttrOverlay .gq-modal-body{padding:16px 20px;}'
            + '.kttr-info{background:#fffbeb;border:1px solid #fde68a;border-left:4px solid #f59e0b;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:13px;color:#92400e;line-height:1.6;}'
            + '.kttr-wrap{overflow-x:auto;border:1px solid var(--border-color,#e2e8f0);border-radius:8px;}'
            + '#kttrTable{min-width:1680px;} #kttrTable th,#kttrTable td{padding:9px 12px;vertical-align:middle;}'
            + '#kttrTable tr.kttr-row-view{cursor:pointer;} #kttrTable tr.kttr-row-view:hover{background:#f8fafc;}'
            + '.kttr-link{color:var(--primary-light,#2563eb);font-weight:600;text-decoration:underline;cursor:pointer;white-space:nowrap;}'
            + '.kttr-plain{white-space:nowrap;cursor:default;} .kttr-code{color:var(--primary-light,#2563eb);font-weight:700;text-align:center;white-space:nowrap;}'
            + '.kttr-vb-more{color:#64748b;font-size:12px;font-weight:600;margin-left:4px;white-space:nowrap;}'
            + '.kttr-check{width:16px;height:16px;pointer-events:none;accent-color:#1e3a8a;}'
            + '#kttrOverlay .pagination-bar{margin-top:10px;}';
        document.head.appendChild(s);
    }
    function render() {
        var body = document.getElementById('kttrBody'); if (!body) return;
        var total = st.rows.length;
        var pages = Math.ceil(total / st.size) || 1;
        if (st.page > pages) st.page = pages;
        var start = (st.page - 1) * st.size, end = Math.min(start + st.size, total);
        body.innerHTML = st.rows.slice(start, end).map(function (r, k) {
            var i = start + k, ok = canView(r);
            var code = ok ? '<a class="kttr-link" href="javascript:void(0)" onclick="event.stopPropagation(); kttrOpenDetail(' + i + ')">' + esc(r.code) + '</a>'
                : (r.code ? '<span class="kttr-plain" title="' + esc(r.src === 'tn' ? TN_NO_DETAIL_MSG : NO_DETAIL_MSG) + '">' + esc(r.code) + '</span>' : '-');
            return '<tr class="' + (ok ? 'kttr-row-view' : 'kttr-row-locked') + '"' + (ok ? ' onclick="kttrOpenDetail(' + i + ')"' : '') + '>'
                + '<td style="text-align:center;">' + (i + 1) + '</td>'
                + '<td class="kttr-code">' + esc(r.maVuViec || '-') + '</td>'
                + '<td style="text-align:center;">' + code + '</td>'
                + '<td>' + esc(r.nyc || '-') + '</td>'
                + '<td style="text-align:center;">' + esc(r.nycDocNo || '-') + '</td>'
                + '<td>' + esc(r.victimName || '-') + '</td>'
                + '<td style="text-align:center;">' + esc(r.victimDocNo || '-') + '</td>'
                + '<td>' + vbCell(r.vbcc) + '</td>'
                + '<td>' + esc(r.field || '--') + '</td>'
                + '<td>' + esc(r.agencyName || '-') + '</td>'
                + '<td>' + esc(r.tinh || '---') + '</td>'
                + '<td>' + esc(r.phuong || '---') + '</td>'
                + '<td style="text-align:center;"><input type="checkbox" class="kttr-check" disabled ' + (r.hasPhdd ? 'checked' : '') + ' aria-label="Yêu cầu phục hồi danh dự"></td>'
                + '<td style="text-align:center;">' + badge(r.status || '-') + '</td></tr>';
        }).join('');
        document.getElementById('kttrRange').innerText = total ? (start + 1) + '-' + end : '0-0';
        document.getElementById('kttrTotal').innerText = total;
        var pg = document.getElementById('kttrPages'); pg.innerHTML = '';
        var btn = function (t, p, dis, act) {
            var el = document.createElement('span');
            el.className = 'page-item' + (dis ? ' disabled' : '') + (act ? ' active' : '');
            el.textContent = t;
            el.onclick = function () { if (!dis) { st.page = p; render(); } };
            pg.appendChild(el);
        };
        btn('|<<', 1, st.page === 1); btn('<', Math.max(1, st.page - 1), st.page === 1);
        for (var n = 1; n <= pages; n++) btn(String(n), n, false, n === st.page);
        btn('>', Math.min(pages, st.page + 1), st.page === pages); btn('>>|', pages, st.page === pages);
    }
    window.kttrPageSize = function (v) { st.size = Number(v) || 20; st.page = 1; render(); };
    window.kttrClose = function () {
        var el = document.getElementById('kttrOverlay'); if (el) el.remove();
        if (typeof gqFrameFull === 'function') gqFrameFull(false);
        st.go = null;
    };
    window.kttrConfirm = function () {
        var go = st.go;
        var el = document.getElementById('kttrOverlay'); if (el) el.remove();
        st.go = null;
        if (go) go();
    };
    function show(claim, rows, go) {
        css();
        window.kttrClose();
        st.rows = rows; st.page = 1; st.size = 20; st.go = go;
        if (typeof gqFrameFull === 'function') gqFrameFull(true);
        var vv = typeof claimVvCode === 'function' ? claimVvCode(claim) : (claim.maVuViec || claim.code);
        var ths = ['STT', 'Mã vụ việc', 'Mã hồ sơ GQBT', 'Tên cá nhân/Tổ chức yêu cầu', 'Số giấy tờ người yêu cầu', 'Tên cá nhân/Tổ chức bị thiệt hại', 'Số giấy tờ người bị thiệt hại', 'Văn bản làm căn cứ bồi thường', 'Lĩnh vực phát sinh thiệt hại', 'Cơ quan giải quyết', 'Tỉnh/Thành phố', 'Phường/Xã', 'Yêu cầu phục hồi danh dự', 'Trạng thái'];
        var center = [0, 1, 2, 4, 6, 12, 13];
        var ov = document.createElement('div');
        ov.className = 'gq-modal-overlay'; ov.id = 'kttrOverlay';
        ov.innerHTML = '<div class="gq-modal" role="dialog" aria-modal="true" aria-labelledby="kttrTitle">'
            + '<div class="gq-modal-header"><h3 id="kttrTitle"><i class="fa-solid fa-list-check"></i> Danh sách hồ sơ giải quyết bồi thường cùng số giấy tờ người bị thiệt hại</h3><button type="button" class="gq-modal-x" aria-label="Đóng" onclick="kttrClose()">&times;</button></div>'
            + '<div class="gq-modal-body">'
            + '<div class="kttr-info"><i class="fa-solid fa-triangle-exclamation"></i> Hồ sơ: <strong>' + esc(vv || '--') + '</strong> • Người bị thiệt hại: <strong>' + esc(victimName(claim) || '--') + '</strong> • Số giấy tờ: <strong>' + esc(victimKeyRaw(claim) || '--') + '</strong><br>'
            + 'Có <strong>' + rows.length + '</strong> hồ sơ giải quyết bồi thường khác cùng số giấy tờ của người bị thiệt hại trên toàn hệ thống. Vui lòng kiểm tra trước khi trình ký Thông báo thụ lý.</div>'
            + '<div class="kttr-wrap"><table class="custom-table" id="kttrTable"><thead><tr>'
            + ths.map(function (t, i) { return '<th' + (center.indexOf(i) >= 0 ? ' style="text-align:center;"' : '') + '>' + t + '</th>'; }).join('')
            + '</tr></thead><tbody id="kttrBody"></tbody></table></div>'
            + '<div class="pagination-bar"><div class="pagination-left"><span>Số dòng hiển thị:</span>'
            + '<select class="page-size-select" onchange="kttrPageSize(this.value)"><option value="10">10</option><option value="20" selected>20</option><option value="50">50</option></select>'
            + '<span>Hiển thị <strong id="kttrRange">0-0</strong> trong tổng số <strong id="kttrTotal">0</strong> bản ghi</span></div><div class="pagination-pages" id="kttrPages"></div></div>'
            + '</div>'
            + '<div class="gq-modal-footer"><span class="gq-footer-msg"></span>'
            + '<button type="button" class="btn btn-secondary" onclick="kttrClose()">Đóng</button>'
            + '<button type="button" class="btn btn-primary" id="kttrBtnConfirm" onclick="kttrConfirm()"><i class="fa-solid fa-paper-plane"></i> Xác nhận trình ký</button></div>'
            + '</div>';
        document.body.appendChild(ov);
        render();
    }

    // ---------- Chặn mọi đường mở Popup Trình duyệt Thông báo thụ lý ----------
    var oTnd = window.openTndModal;
    if (typeof oTnd === 'function') window.openTndModal = function (claimId) {
        var self = this, args = arguments;
        var c = typeof gqClaim === 'function' ? gqClaim(claimId) : null;
        // Thiếu thông tin người bị thiệt hại: để kiểm tra bắt buộc (nbth) xử lý như hiện tại
        if (!c || (typeof window.nbthGqMissing === 'function' && window.nbthGqMissing(c))) return oTnd.apply(self, args);
        var rows = findMatches(c);
        if (!rows.length) return oTnd.apply(self, args);
        show(c, rows, function () { oTnd.apply(self, args); });
    };
    window.kttrFindMatches = findMatches;
    window.kttrVictimKey = victimKey;

    // ---------- Dữ liệu mẫu: hồ sơ Chờ phân công tại Tiếp nhận hồ sơ cùng số giấy tờ với BT-2026-601 ----------
    // Cùng dữ liệu với bản ghi TN_KTTR1 của danh sách Tiếp nhận hồ sơ (tiep_nhan_nbth.js); chỉ tạo khi kho luồng chưa có mã này (trang nào mở trước thì tạo)
    (function seed() {
        var w = W(); if (!w || !w.loadRecords || !w.upsertRecord) return;
        try {
            if (w.getRecord('VVBT-2026-951')) return;
            w.upsertRecord({
                id: 'WF-VVBT-2026-951', code: 'VVBT-2026-951', maVuViec: 'VVBT-2026-951', module: 'YCBT', loaiYeuCau: YCBT,
                status: 'Chờ phân công', nguonHoSo: 'Tiếp nhận mới', source: 'Tiếp nhận', hinhThucTiepNhan: 'Trực tiếp',
                rootUnitId: 'THADS-LD', currentUnitId: 'THADS-LD', createdBy: 'cv_thads1', receivedBy: w.userName ? w.userName('cv_thads1') : '',
                nycRole: R_NBTH, nycType: 'Cá nhân', nycName: 'Vương Thị Thu Trang', nycDob: '08/05/1987', nycDocType: 'CMND/CCCD/Chứng minh quân đội', nycDocNo: '001187006601',
                nycPhone: '0912601601', nycCountry: 'Việt Nam', nycTinhThanh: 'Thành phố Hà Nội', nycAddressDetail: 'Số 14 ngõ 4B Đặng Văn Ngữ',
                linhVuc: 'TRONG HOẠT ĐỘNG THI HÀNH ÁN DÂN SỰ', hanhVi: 'Kê biên tài sản không thuộc sở hữu của người phải thi hành án.', requestKind: '',
                date: '28/10/2026', receivedAt: '09:00 28/10/2026', routes: [], chuTri: null, approval: null, vanBanCanCu: [],
                attachedDocs: [{ name: 'Văn bản yêu cầu bồi thường', file: 'Don_yeu_cau_VVBT-2026-951.pdf' }],
                history: [{ at: '09:00 28/10/2026', userId: 'cv_thads1', userName: w.userName ? w.userName('cv_thads1') : '', action: 'Tiếp nhận hồ sơ', note: 'Chuyển lãnh đạo Cục Thi hành án dân sự tỉnh Lâm Đồng phân công xử lý.' }]
            });
        } catch (e) { if (window.console) console.warn('[kttr] seed', e); }
    })();
})();
