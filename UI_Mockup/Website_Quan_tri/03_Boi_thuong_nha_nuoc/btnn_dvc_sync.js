/*
 * [dvc1] Mô phỏng gửi kết quả xử lý hồ sơ về Dịch vụ công (dùng chung các trang BTNN) - BTNN_DVC
 * - record(claim, stepCode, opt): ghi 01 bản tin (hồ sơ Nguồn hồ sơ = Dịch vụ công) vào localStorage 'btnn_dvc_sync_log_new';
 *   màn Nhật ký đồng bộ Dịch vụ công (nhat_ky_dong_bo_dvc.js) nạp vào danh sách.
 * - Theo dõi kho dữ liệu của trang khác (bọc localStorage.setItem):
 *   + 'btnn_qd_gqbt_v2' (Quyết định giải quyết bồi thường): Đã ban hành -> QUYET_DINH_GIAI_QUYET; Hủy quyết định -> QUYET_DINH_HUY;
 *     thêm 01 lần sửa chữa, bổ sung -> QUYET_DINH_SUA_DOI_BO_SUNG.
 *   + 'proposalsList' (Chi trả tiền bồi thường): chuyển Chờ chi trả -> THONG_BAO_CHI_TRA.
 * - Trang Giải quyết yêu cầu bồi thường ghi bản tin qua quan_ly_boi_thuong_lth.js (theo đổi trạng thái hồ sơ).
 * Bước, mã trạng thái: Tài liệu kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia (Ket_noi_chia_se_Dich_vu_cong_BTNN.md) - mục 3.2.
 */
(function () {
    if (window.BTNN_DVC) return;
    var KEY_NEW = 'btnn_dvc_sync_log_new';
    var CASE = { 'Cử người giải quyết bồi thường': 'CU_NGUOI_GIAI_QUYET', 'Xác minh thiệt hại': 'XAC_MINH_THIET_HAI', 'Thương lượng': 'THUONG_LUONG', 'Chờ ban hành QĐ': 'CHO_BAN_HANH_QD',
        'Chờ chi trả': 'CHO_CHI_TRA', 'Hoàn thành': 'HOAN_THANH', 'Đang phục hồi danh dự': 'DANG_PHUC_HOI_DANH_DU', 'Hoãn phục hồi danh dự': 'HOAN_PHUC_HOI_DANH_DU', 'Từ chối phục hồi danh dự': 'TU_CHOI_PHUC_HOI_DANH_DU',
        'Hoãn giải quyết': 'HOAN_GIAI_QUYET', 'Tạm đình chỉ': 'TAM_DINH_CHI', 'Đình chỉ giải quyết': 'DINH_CHI_GIAI_QUYET', 'Dừng giải quyết': 'DUNG_GIAI_QUYET',
        'Đã chuyển CQGQBT': 'DA_CHUYEN_CQGQBT', 'Không thụ lý': 'KHONG_THU_LY', 'Yêu cầu bổ sung': 'YEU_CAU_BO_SUNG' };
    var origSet = Storage.prototype.setItem;
    function noAcc(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase(); }
    function parse(v) { try { return JSON.parse(v); } catch (e) { return null; } }
    function isDvc(c) { return !!c && /dich vu cong/.test(noAcc(c.nguonHoSo)); }
    function claimOf(code) {
        var l = parse(localStorage.getItem('claimsList')) || [];
        return l.find(function (c) { return c && (c.code === code || c.id === code); }) || null;
    }
    function nowText() {
        var p = function (x) { return String(x).padStart(2, '0'); }, n = new Date();
        return p(n.getDate()) + '/' + p(n.getMonth() + 1) + '/' + n.getFullYear() + ' ' + p(n.getHours()) + ':' + p(n.getMinutes()) + ':' + p(n.getSeconds());
    }
    // opt: { fileName, fileSize, caseStatusName, doc: { docNo, docDate, signingMethod, signerName, signerPosition } | null }
    function record(c, step, opt) {
        if (!isDvc(c) || !step) return null;
        opt = opt || {};
        var now = nowText();
        var dig = (String(c.code || '').match(/\d+/g) || ['0']).join('').slice(-6).padStart(6, '0');
        var st = opt.caseStatusName || c.status || '';
        var noDoc = step === 'BAO_CAO_XAC_MINH' || step === 'BIEN_BAN_THUONG_LUONG';
        var entry = {
            transactionId: 'KQ-' + c.code + '-' + step + '-' + Date.now().toString(36).toUpperCase(),
            dvcCode: c.dvcDossierCode || ('H48.12.2026.' + dig), receiptNo: c.dvcReceiptNo || ('API-2026-' + dig),
            caseCode: c.maVuViec || '', dossierCode: c.code, agency: c.agency || '', stepCode: step,
            caseStatus: CASE[st] || '', caseStatusName: st, eventTime: now,
            document: noDoc ? null : Object.assign({ docNo: '', docDate: now.slice(0, 10), signingMethod: 'KY_SO', signerName: '', signerPosition: '' }, opt.doc || {}),
            fileName: opt.fileName || (step.toLowerCase() + '_' + c.code + '_da_ky.pdf'),
            fileSize: Number(opt.fileSize) || (200000 + (Number(dig) % 300000)),
            result: 'SUCCESS', sentAt: now
        };
        try { var l = parse(localStorage.getItem(KEY_NEW)) || []; l.push(entry); origSet.call(localStorage, KEY_NEW, JSON.stringify(l)); } catch (e) { /* mockup */ }
        return entry;
    }
    var WATCH = {};
    Storage.prototype.setItem = function (k, v) {
        var fn = this === window.localStorage ? WATCH[k] : null;
        var prev = fn ? parse(this.getItem(k)) : null;
        var r = origSet.apply(this, arguments);
        if (fn) { try { fn(Array.isArray(prev) ? prev : [], parse(v) || []); } catch (e) { console.warn('dvc watch', k, e); } }
        return r;
    };
    function byId(list) { var m = {}; (list || []).forEach(function (x) { if (x && x.id) m[x.id] = x; }); return m; }
    function signMethod(m) { return /ngoài/i.test(m || '') ? 'KY_NGOAI' : 'KY_SO'; }
    // Quyết định giải quyết bồi thường
    WATCH.btnn_qd_gqbt_v2 = function (prev, next) {
        var pm = byId(prev);
        next.forEach(function (d) {
            var p = pm[d.id];
            if (!d || !p) return;
            var c = claimOf(d.claimCode);
            if (!isDvc(c)) return;
            if (d.status === 'Hủy quyết định' && p.status !== 'Hủy quyết định') {
                var cr = d.cancel || d.request || {};
                record(c, 'QUYET_DINH_HUY', { fileName: cr.signedFile || cr.fileName || ('QD_huy_QD_GQBT_' + c.code + '.pdf'), doc: { docNo: cr.decNo || '', signingMethod: signMethod(cr.signMethod) } });
            } else if ((d.amendments || []).length > (p.amendments || []).length) {
                var a = d.amendments[d.amendments.length - 1] || {};
                record(c, 'QUYET_DINH_SUA_DOI_BO_SUNG', { fileName: (a.draftDoc && a.draftDoc.uploadedName) || ('QD_sua_chua_bo_sung_' + c.code + '.pdf'), doc: { docNo: a.decNo || '', signingMethod: signMethod(a.signMethod) } });
            } else if (d.status === 'Đã ban hành' && p.status !== 'Đã ban hành' && !(d.amendments || []).length) {
                record(c, 'QUYET_DINH_GIAI_QUYET', { caseStatusName: 'Chờ chi trả', fileName: d.signedFile || ('QD_giai_quyet_boi_thuong_' + c.code + '.pdf'), doc: { docNo: d.decNo || '', docDate: d.issueDate || '', signingMethod: signMethod(d.signMethod) } });
            }
        });
    };
    // Thông báo chi trả tiền bồi thường
    WATCH.proposalsList = function (prev, next) {
        var pm = byId(prev);
        next.forEach(function (x) {
            var p = pm[x && x.id];
            if (!x || !p || x.status !== 'Chờ chi trả' || p.status === 'Chờ chi trả' || /tạm ứng/i.test(String(x.type || ''))) return;
            var c = claimOf(x.ycbtCode || x.claimCode);
            if (!isDvc(c)) return;
            record(c, 'THONG_BAO_CHI_TRA', { caseStatusName: 'Chờ chi trả', fileName: x.signedFile || x.tbSignedFile || ('Mau_32_BTNN_Thong_bao_chi_tra_' + c.code + '.pdf') });
        });
    };
    window.BTNN_DVC = { record: record, isDvc: isDvc, claimOf: claimOf, watch: function (k, fn) { WATCH[k] = fn; } };
})();
