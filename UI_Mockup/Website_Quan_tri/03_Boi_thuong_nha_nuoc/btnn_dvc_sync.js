/*
 * [dvc1] Mô phỏng gửi kết quả xử lý hồ sơ về Dịch vụ công (dùng chung các trang BTNN) - BTNN_DVC
 * - record(claim, stepCode, opt): ghi 01 bản tin (hồ sơ Nguồn hồ sơ = Dịch vụ công) vào localStorage 'btnn_dvc_sync_log_new';
 *   màn Nhật ký đồng bộ Dịch vụ công (nhat_ky_dong_bo_dvc.js) nạp vào danh sách.
 * - Theo dõi kho dữ liệu của trang khác (bọc localStorage.setItem):
 *   + 'btnn_qd_gqbt_v2' (Quyết định giải quyết bồi thường): Đã ban hành -> QUYET_DINH_GIAI_QUYET; Hủy quyết định -> QUYET_DINH_HUY;
 *     thêm 01 lần sửa chữa, bổ sung -> QUYET_DINH_SUA_DOI_BO_SUNG.
 *   + 'claimsList': vụ việc chỉ yêu cầu phục hồi danh dự chuyển Trạng thái Phục hồi danh dự Hoàn thành -> VU_VIEC_HOAN_THANH (bước 19, mã 9).
 * - [dvc10] Không gửi: Thông báo chi trả (Mẫu 32/BTNN), vụ việc đổi trạng thái do kinh phí sau Quyết định giải quyết bồi thường
 *   (Hoàn thành chi trả / Trả lại ngân sách nhà nước, chi thêm, thu hồi tiền): record() bỏ qua THONG_BAO_CHI_TRA, VU_VIEC_HOAN_THANH không có opt.phddOnly.
 * - [dvc10] Mỗi bản tin ghi dvcStatusCode / dvcStatusName (mục 3.3): Chờ chi trả (bước 7) -> 10 Đã trả kết quả; bước 8, 9, 15 (vụ việc không chỉ PHDD) -> mã đã gửi gần nhất.
 * - Trang Giải quyết yêu cầu bồi thường ghi bản tin qua quan_ly_boi_thuong_lth.js (theo đổi trạng thái hồ sơ).
 * Bước, mã trạng thái: Tài liệu kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia (Ket_noi_chia_se_Dich_vu_cong_BTNN.md) - mục 3.1, 3.2, 3.3.
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
    // [dvc10] Mã trạng thái DVC theo trạng thái vụ việc (Bảng trạng thái liên thông - mục 3.3)
    var DVC_NAME = { 2: 'Được tiếp nhận', 3: 'Không được tiếp nhận', 4: 'Đang xử lý', 5: 'Yêu cầu bổ sung', 8: 'Dừng xử lý', 9: 'Đã xử lý xong', 10: 'Đã trả kết quả' };
    var DVC_OF = { CU_NGUOI_GIAI_QUYET: 2, KHONG_THU_LY: 3, YEU_CAU_BO_SUNG: 5, TU_CHOI_PHUC_HOI_DANH_DU: 8, DINH_CHI_GIAI_QUYET: 8, DUNG_GIAI_QUYET: 8, HOAN_THANH: 9, CHO_CHI_TRA: 10 };
    var KEEP_STEPS = { QUYET_DINH_HUY: 1, QUYET_DINH_SUA_DOI_BO_SUNG: 1, THONG_BAO_PHUC_HOI_DANH_DU: 1 };
    function lastDvcCode(dossierCode) {
        var all = (parse(localStorage.getItem('btnn_dvc_sync_log')) || []).concat(parse(localStorage.getItem(KEY_NEW)) || []);
        var hit = all.filter(function (x) { return x && x.dossierCode === dossierCode && x.dvcStatusCode; }).pop();
        return hit ? Number(hit.dvcStatusCode) : 0;
    }
    function dvcCodeOf(c, step, caseCode) {
        if (KEEP_STEPS[step] && !(step === 'THONG_BAO_PHUC_HOI_DANH_DU' && c.requestType === 'honor')) {
            var last = lastDvcCode(c.code);
            if (last) return last;
            if (step !== 'THONG_BAO_PHUC_HOI_DANH_DU' || caseCode === 'HOAN_THANH') return 10; // đã ban hành Quyết định giải quyết bồi thường (bước 7)
        }
        return DVC_OF[caseCode] || 4;
    }
    // opt: { fileName, fileSize, caseStatusName, phddOnly, doc: { docNo, docDate, signingMethod, signerName, signerPosition } | null }
    function record(c, step, opt) {
        if (!isDvc(c) || !step) return null;
        opt = opt || {};
        // [dvc10] Không gửi Thông báo chi trả; Hoàn thành chỉ gửi với vụ việc chỉ yêu cầu phục hồi danh dự
        if (step === 'THONG_BAO_CHI_TRA' || (step === 'VU_VIEC_HOAN_THANH' && !opt.phddOnly)) return null;
        var now = nowText();
        var dig = (String(c.code || '').match(/\d+/g) || ['0']).join('').slice(-6).padStart(6, '0');
        var st = opt.caseStatusName || c.status || '';
        var dvcCode = dvcCodeOf(c, step, CASE[st] || '');
        var noDoc = step === 'BAO_CAO_XAC_MINH' || step === 'BIEN_BAN_THUONG_LUONG' || step === 'VU_VIEC_HOAN_THANH';
        var entry = {
            transactionId: 'KQ-' + c.code + '-' + step + '-' + Date.now().toString(36).toUpperCase(),
            dvcCode: c.dvcDossierCode || ('H48.12.2026.' + dig), receiptNo: c.dvcReceiptNo || ('API-2026-' + dig),
            caseCode: c.maVuViec || '', dossierCode: c.code, agency: c.agency || '', stepCode: step,
            caseStatus: CASE[st] || '', caseStatusName: st, dvcStatusCode: dvcCode, dvcStatusName: DVC_NAME[dvcCode] || '', eventTime: now,
            document: noDoc ? null : Object.assign({ docNo: '', docDate: now.slice(0, 10), signingMethod: 'KY_SO', signerName: '', signerPosition: '' }, opt.doc || {}),
            fileName: step === 'VU_VIEC_HOAN_THANH' ? '' : (opt.fileName || (step.toLowerCase() + '_' + c.code + '_da_ky.pdf')),
            fileSize: step === 'VU_VIEC_HOAN_THANH' ? 0 : (Number(opt.fileSize) || (200000 + (Number(dig) % 300000))),
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
    // [dvc10] Thông báo chi trả tiền bồi thường (Mẫu 32/BTNN): không gửi Dịch vụ công (bỏ theo dõi 'proposalsList')
    // Bước 19: vụ việc chỉ yêu cầu phục hồi danh dự - Hoàn thành phục hồi danh dự (Trạng thái vụ việc Hoàn thành, mã 9)
    WATCH.claimsList = function (prev, next) {
        var pm = byId(prev);
        next.forEach(function (c) {
            var p = pm[c && c.id];
            if (!c || !p || c.requestType !== 'honor' || !isDvc(c)) return;
            if (c.phddStatus === 'Hoàn thành' && p.phddStatus && p.phddStatus !== 'Hoàn thành') record(c, 'VU_VIEC_HOAN_THANH', { caseStatusName: 'Hoàn thành', phddOnly: true, fileName: '', fileSize: 0 });
        });
    };
    window.BTNN_DVC = { record: record, isDvc: isDvc, claimOf: claimOf, dvcCodeOf: dvcCodeOf, dvcName: DVC_NAME, watch: function (k, fn) { WATCH[k] = fn; } };
})();
