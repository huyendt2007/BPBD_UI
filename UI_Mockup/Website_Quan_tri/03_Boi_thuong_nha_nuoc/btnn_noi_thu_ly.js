/*
 * btnn_noi_thu_ly.js - Nơi thụ lý của vụ việc bồi thường nhà nước (mockup).
 * - 02 giá trị: "Thụ lý tại Tòa án" (vụ việc thêm mới tại Theo dõi vụ việc tại Tòa án),
 *   "Thụ lý tại CQGQBT" (hồ sơ từ Tiếp nhận hồ sơ, Dịch vụ công, Chuyển CQGQBT, Xác định CQGQBT, Giải quyết yêu cầu bồi thường).
 * - Hệ thống tự gán, người dùng không nhập; dữ liệu cũ chưa có giá trị: suy theo nguồn (vụ việc tại Tòa án / hồ sơ GQBT).
 * - Đọc vụ việc tại Tòa án (localStorage btnn_court_cases_v1) cho Tra cứu vụ việc và Popup kiểm tra hồ sơ cùng số giấy tờ người bị thiệt hại.
 * - Dữ liệu mẫu TA-NTL-001 (Vương Thị Thu Trang, 001187006601): trùng số giấy tờ người bị thiệt hại với hồ sơ GQBT BT-2026-601.
 * Phụ thuộc: btnn_luong_xu_ly.js (BTNN_WF).
 */
(function (global) {
    'use strict';
    var TOA_AN = 'Thụ lý tại Tòa án', CQGQBT = 'Thụ lý tại CQGQBT';
    var COURT_KEY = 'btnn_court_cases_v1';
    var COURT_STATUSES = ['Đã thụ lý', 'Đang giải quyết', 'Đã có bản án/QĐ', 'Trả lại đơn khởi kiện'];
    var DEMO_ID = 'TA-NTL-001';
    var R_NBTH = 'Người bị thiệt hại', T_TC = 'Tổ chức';

    function W() { return global.BTNN_WF || null; }
    function readJson(k) { try { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

    // Nơi thụ lý của bản ghi: giá trị đã gán; chưa có: suy theo nguồn
    function of(item, isCourt) {
        if (item && (item.noiThuLy === TOA_AN || item.noiThuLy === CQGQBT)) return item.noiThuLy;
        return isCourt ? TOA_AN : CQGQBT;
    }
    // Gán Nơi thụ lý khi chưa có (trả về true nếu có thay đổi)
    function assign(item, isCourt) {
        if (!item || item.noiThuLy === TOA_AN || item.noiThuLy === CQGQBT) return false;
        item.noiThuLy = isCourt ? TOA_AN : CQGQBT;
        return true;
    }
    function css() {
        if (!global.document || document.getElementById('ntlStyle')) return;
        var s = document.createElement('style'); s.id = 'ntlStyle';
        s.textContent = '.ntl-badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;border:1px solid transparent;}'
            + '.ntl-toa-an{background:#f5f3ff;color:#6d28d9;border-color:#ddd6fe;}'
            + '.ntl-cqgqbt{background:#ecfeff;color:#0e7490;border-color:#a5f3fc;}';
        (document.head || document.documentElement).appendChild(s);
    }
    function badge(v) {
        css();
        return '<span class="ntl-badge ' + (v === TOA_AN ? 'ntl-toa-an' : 'ntl-cqgqbt') + '">' + esc(v) + '</span>';
    }

    // ---------- Dữ liệu mẫu vụ việc tại Tòa án trùng số giấy tờ người bị thiệt hại với BT-2026-601 ----------
    function demoCourtCase() {
        var w = W();
        var code = w && w.vuViecOf ? w.vuViecOf(DEMO_ID) : DEMO_ID;
        return {
            id: DEMO_ID, code: code, noiThuLy: TOA_AN, requestKind: 'money', originalKind: 'money', linkedCode: null, hoSoCode: '',
            rootUnitId: 'STP-HN', agency: w ? w.unitName('STP-HN') : 'Sở Tư pháp Thành phố Hà Nội',
            status: 'Đang giải quyết', fieldGroup: 'hành chính',
            verdictSource: 'Khởi kiện yêu cầu bồi thường theo thủ tục tố tụng dân sự (Khoản 1 Điều 52)',
            lawsuitCase: 'Khởi kiện thẳng ra Tòa án, chưa từng yêu cầu cơ quan giải quyết (điểm a khoản 1 Điều 52)',
            acceptDate: '05/10/2026', verdictNo: '', effectiveDate: '',
            nyc: {
                type: 'Cá nhân', name: 'Vương Thị Thu Trang', role: R_NBTH, gender: 'Nữ', birth: '08/05/1987', victimAlive: 'yes',
                phone: '0912601601', email: '', cardType: 'CMND/CCCD/Chứng minh quân đội', cardNo: '001187006601', cardDate: '10/05/2021',
                cardPlace: 'Cục Cảnh sát QLHC về trật tự xã hội', country: 'Việt Nam', city: 'Hà Nội', ward: '00007 - Phường Cầu Giấy', address: 'Số 14 ngõ 4B Đặng Văn Ngữ'
            },
            nbth: null,
            hanhVi: 'Ra quyết định xử phạt vi phạm hành chính không đúng thẩm quyền, tạm giữ giấy phép kinh doanh.',
            nhanQua: 'Thiệt hại phát sinh trực tiếp từ hành vi trái pháp luật của người thi hành công vụ.',
            damages: [{ key: 'thuNhap', calc: 'Thu nhập bị mất 06 tháng x 8.000.000 đồng', amount: 48000000 }],
            honorForms: null,
            vanBanCanCu: [{ name: 'Quyết định hủy quyết định xử phạt vi phạm hành chính số 21/QĐ-UBND', file: '' }],
            docs: [{ name: 'Thông báo thụ lý vụ án', file: 'Thong_bao_thu_ly_TA-NTL-001.pdf' }],
            createdAt: '09:30 06/10/2026', createdBy: 'cv_hn1', createdByName: 'Đỗ Văn Chung',
            history: [{ at: '09:30 06/10/2026', userName: 'Đỗ Văn Chung', action: 'Thêm mới vụ việc', note: 'Trạng thái: Đã thụ lý.' },
                { at: '14:00 20/10/2026', userName: 'Đỗ Văn Chung', action: 'Cập nhật vụ việc', note: 'Chuyển trạng thái: Đã thụ lý → Đang giải quyết.' }]
        };
    }
    // Bổ sung vụ việc mẫu khi danh sách chưa có (vụ việc đã xóa vẫn còn bản ghi deleted nên không thêm lại); gán Nơi thụ lý cho dữ liệu cũ
    function migrateCourtCases(list) {
        var changed = false;
        if (!Array.isArray(list)) return false;
        if (!list.some(function (r) { return r && r.id === DEMO_ID; })) { list.push(demoCourtCase()); changed = true; }
        list.forEach(function (r) { if (assign(r, true)) changed = true; });
        return changed;
    }
    // Vụ việc tại Tòa án (chưa xóa) để tra cứu: kho của Theo dõi vụ việc tại Tòa án; chưa có kho: chỉ vụ việc mẫu (chỉ trong bộ nhớ)
    function loadCourtCases() {
        var list = readJson(COURT_KEY);
        list = Array.isArray(list) ? list.slice() : [];
        migrateCourtCases(list);
        return list.filter(function (r) { return r && !r.deleted; });
    }

    // Phạm vi xem của Theo dõi vụ việc tại Tòa án: Cơ quan bị khởi kiện là đơn vị gốc của người dùng; Bộ Tư pháp: mọi vụ việc
    function canViewCourt(rec) {
        var w = W(); if (!w || !rec) return false;
        var u = w.getCurrentUser ? w.getCurrentUser() : null; if (!u) return false;
        var root = w.getRootId ? w.getRootId(u.unitId) : u.unitId;
        return root === 'BTP-01' || rec.rootUnitId === root;
    }
    // Cơ quan giải quyết (theo cột của Theo dõi vụ việc tại Tòa án): có vụ việc liên kết -> cơ quan của vụ việc liên kết; không có -> Cơ quan bị khởi kiện
    function courtAgency(rec) {
        var w = W();
        var id = (rec.linkedVuViec && rec.linkedAgencyId) ? rec.linkedAgencyId : (rec.rootUnitId || '');
        var name = (rec.linkedVuViec && rec.linkedAgency) ? rec.linkedAgency : (id && w ? w.unitName(id) : (rec.agency || ''));
        return { id: id, name: name || rec.agency || '' };
    }
    // Dạng hồ sơ GQBT tương đương (trường người yêu cầu / người bị thiệt hại) để dùng chung quy tắc số giấy tờ
    function courtClaimLike(rec) {
        var n = rec.nyc || {}, b = rec.nbth || null;
        var isOrg = n.type === T_TC;
        return {
            id: rec.id, code: '', maVuViec: rec.code || '', noiThuLy: TOA_AN, court: true,
            nyc: n.name || '', nycName: n.name || '', nycRole: n.role || R_NBTH, nycType: n.type || 'Cá nhân',
            cardNo: isOrg ? '' : (n.cardNo || ''), nycCardNo: isOrg ? '' : (n.cardNo || ''), nycOrgCode: isOrg ? (n.orgCode || n.orgDocNo || '') : '',
            nbth: b, nbthOrgName: b ? (b.orgName || '') : '', nbthOrgCode: b ? (b.orgCode || '') : '',
            vanBanCanCu: rec.vanBanCanCu || [], fieldGroup: rec.fieldGroup || '', status: rec.status || '',
            date: rec.acceptDate || '', requestType: 'money', restoreHonor: false
        };
    }
    function courtDetailUrl(rec) {
        return 'theo_doi_vu_viec_toa_an.html?id=' + encodeURIComponent(rec.id) + '&readonly=1&newtab=1';
    }

    global.BTNN_NTL = {
        TOA_AN: TOA_AN, CQGQBT: CQGQBT, VALUES: [TOA_AN, CQGQBT], COURT_STATUSES: COURT_STATUSES, COURT_KEY: COURT_KEY,
        of: of, assign: assign, badge: badge, css: css,
        demoCourtCase: demoCourtCase, migrateCourtCases: migrateCourtCases, loadCourtCases: loadCourtCases,
        canViewCourt: canViewCourt, courtAgency: courtAgency, courtClaimLike: courtClaimLike, courtDetailUrl: courtDetailUrl
    };
})(window);
