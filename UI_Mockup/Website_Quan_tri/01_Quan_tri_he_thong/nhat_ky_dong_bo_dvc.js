/*
 * [dvc1] Nhật ký đồng bộ Dịch vụ công (prefix nkdv)
 * - Danh sách bản tin BTNN gửi kết quả xử lý hồ sơ về Dịch vụ công quốc gia
 *   (Tài liệu kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia - mục 3; SRS: Tai_lieu_SRS/03_Website_Quan_tri/01_Quan_tri_he_thong/Nhat_ky_dong_bo_DVC.md).
 * - Lọc theo mã, bước, kết quả, khoảng thời gian gửi; Xem chi tiết dạng trang (link tệp, mã băm, JSON request/response, lịch sử các lần gửi);
 *   Gửi lại (chỉ bản tin Lỗi, giữ nguyên transaction_id, popup xác nhận); Kết xuất Excel.
 * - Thông báo hiển thị trực tiếp đầu danh sách (không dùng toast).
 * - Dữ liệu mẫu gắn với hồ sơ Nguồn hồ sơ = Dịch vụ công của trang Giải quyết yêu cầu bồi thường; lưu localStorage theo phiên bản NKDV_SEED_VER.
 */
var NKDV_SEED_VER = '20261030dvc4';
var NKDV_KEY = 'btnn_dvc_sync_log';
var NKDV_KEY_VER = 'btnn_dvc_sync_log_ver';
// 16 bước theo Tài liệu kết nối, chia sẻ dữ liệu với Dịch vụ công quốc gia (Ket_noi_chia_se_Dich_vu_cong_BTNN.md) - mục 3.2 (thứ tự theo luồng)
var NKDV_STEPS = [
    ['YEU_CAU_BO_SUNG', 'Thông báo về việc yêu cầu bổ sung hồ sơ yêu cầu bồi thường (Mẫu 03/BTNN)'],
    ['THONG_BAO_KHONG_THU_LY', 'Thông báo không thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN)'],
    ['THONG_BAO_THU_LY', 'Thông báo thụ lý hồ sơ yêu cầu bồi thường (Mẫu 04/BTNN)'],
    ['QUYET_DINH_CU_NGUOI', 'Quyết định cử người giải quyết bồi thường (Mẫu 06/BTNN)'],
    ['BAO_CAO_XAC_MINH', 'Báo cáo xác minh thiệt hại'],
    ['BIEN_BAN_THUONG_LUONG', 'Biên bản kết quả thương lượng việc giải quyết bồi thường'],
    ['QUYET_DINH_GIAI_QUYET', 'Quyết định giải quyết bồi thường (Mẫu 18/BTNN)'],
    ['QUYET_DINH_HUY', 'Quyết định hủy quyết định giải quyết bồi thường (Mẫu 20/BTNN)'],
    ['QUYET_DINH_SUA_DOI_BO_SUNG', 'Quyết định sửa chữa, bổ sung quyết định giải quyết bồi thường (Mẫu 21/BTNN)'],
    ['QUYET_DINH_HOAN', 'Quyết định hoãn giải quyết bồi thường (Mẫu 22/BTNN)'],
    ['QUYET_DINH_TIEP_TUC', 'Quyết định tiếp tục giải quyết bồi thường (Mẫu 23/BTNN)'],
    ['QUYET_DINH_TAM_DINH_CHI', 'Quyết định tạm đình chỉ giải quyết yêu cầu bồi thường (Mẫu 24/BTNN)'],
    ['QUYET_DINH_DINH_CHI', 'Quyết định đình chỉ giải quyết yêu cầu bồi thường (Mẫu 25/BTNN)'],
    ['THONG_BAO_DUNG_GIAI_QUYET', 'Thông báo về việc dừng giải quyết yêu cầu bồi thường (Mẫu 05/BTNN)'],
    ['THONG_BAO_PHUC_HOI_DANH_DU', 'Thông báo về việc tổ chức thực hiện phục hồi danh dự (Mẫu 26/BTNN)'],
    ['THONG_BAO_CHI_TRA', 'Thông báo về việc chi trả tiền bồi thường (Mẫu 32/BTNN)']
];
var NKDV_CASE = {
    CU_NGUOI_GIAI_QUYET: 'Cử người giải quyết bồi thường', XAC_MINH_THIET_HAI: 'Xác minh thiệt hại', THUONG_LUONG: 'Thương lượng',
    CHO_BAN_HANH_QD: 'Chờ ban hành QĐ', CHO_CHI_TRA: 'Chờ chi trả', HOAN_THANH: 'Hoàn thành', DANG_PHUC_HOI_DANH_DU: 'Đang phục hồi danh dự',
    HOAN_GIAI_QUYET: 'Hoãn giải quyết', TAM_DINH_CHI: 'Tạm đình chỉ', DINH_CHI_GIAI_QUYET: 'Đình chỉ giải quyết', DUNG_GIAI_QUYET: 'Dừng giải quyết',
    KHONG_THU_LY: 'Không thụ lý', YEU_CAU_BO_SUNG: 'Yêu cầu bổ sung'
};
var NKDV_RESULT = { SUCCESS: 'Thành công', FAILED: 'Lỗi', RETRYING: 'Đang gửi lại' };
var NKDV_RETRY_MIN = [1, 5, 15, 60, 240];
var nkdvList = [], nkdvFiltered = [], nkdvPage = 1, nkdvSize = 20, nkdvOpenId = null;

function nkdvEl(id) { return document.getElementById(id); }
function nkdvE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function nkdvNoAcc(s) { return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().trim(); }
function nkdvStepName(c) { var s = NKDV_STEPS.find(function (x) { return x[0] === c; }); return s ? s[1] : c; }
// Mã băm mô phỏng (hex 64 ký tự) - hệ thống thật dùng SHA-256 của nội dung tệp
function nkdvHash(seed) {
    var h = 2166136261 >>> 0, out = '';
    for (var r = 0; r < 8; r++) {
        for (var i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i) + r; h = Math.imul(h, 16777619) >>> 0; }
        out += ('00000000' + h.toString(16)).slice(-8);
    }
    return out;
}
function nkdvIso(dt) { return dt.replace(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):?(\d{2})?$/, function (m, d, mo, y, hh, mi, ss) { return y + '-' + mo + '-' + d + 'T' + hh + ':' + mi + ':' + (ss || '00') + '+07:00'; }); }
function nkdvNow() {
    var n = new Date(), p = function (x) { return String(x).padStart(2, '0'); };
    return p(n.getDate()) + '/' + p(n.getMonth() + 1) + '/' + n.getFullYear() + ' ' + p(n.getHours()) + ':' + p(n.getMinutes()) + ':' + p(n.getSeconds());
}
function nkdvAddMin(dt, min) {
    var m = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(dt); if (!m) return '';
    var d = new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5] + min, +m[6]), p = function (x) { return String(x).padStart(2, '0'); };
    return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
}
function nkdvKey(dt) { var m = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):?(\d{2})?/.exec(dt || ''); return m ? m[3] + m[2] + m[1] + m[4] + m[5] + (m[6] || '00') : ''; }

// ---------- Dữ liệu mẫu ----------
// [dvcCode, receiptNo, caseCode, dossierCode, agency, step, caseStatus, eventTime, doc|null, fileName, fileSize, result, attempts[[at, http, code, message]]]
function nkdvSeed() {
    var KS = 'KY_SO', KN = 'KY_NGOAI', LD = ['Lê Hoàng Nam', 'Giám đốc'];
    var ok = function (at) { return [at, 200, 'SUCCESS', null]; };
    var t503 = function (at) { return [at, 503, 'SERVICE_UNAVAILABLE', 'Hệ thống Dịch vụ công tạm thời không phản hồi.']; };
    var tout = function (at) { return [at, 0, 'TIMEOUT', 'Quá thời gian chờ phản hồi (30 giây).']; };
    var raw = [
        ['H48.12.2026.000151', 'API-20261012-000151', 'VVBT-2026-185', 'BT-2026-051', 'Sở Tư pháp TP. Hà Nội', 'THONG_BAO_THU_LY', 'CU_NGUOI_GIAI_QUYET', '14/10/2026 09:12:05', ['15/TB-STP', '14/10/2026', KS], 'Thong_bao_thu_ly_BT-2026-051_da_ky.pdf', 248315, 'SUCCESS', [ok('14/10/2026 09:12:20')]],
        ['H48.12.2026.000153', 'API-20261013-000153', 'VVBT-2026-187', 'BT-2026-053', 'UBND phường Bạch Mai', 'THONG_BAO_THU_LY', 'CU_NGUOI_GIAI_QUYET', '15/10/2026 14:30:40', ['08/TB-UBND', '15/10/2026', KN], 'Thong_bao_thu_ly_BT-2026-053_ky_ngoai.pdf', 512007, 'SUCCESS', [ok('15/10/2026 14:31:02')]],
        ['H48.12.2026.000114', 'API-20261001-000114', 'VVBT-2026-461', 'BT-2026-014', 'UBND Thành phố Hà Nội', 'THONG_BAO_KHONG_THU_LY', 'KHONG_THU_LY', '05/10/2026 10:05:00', ['21/TB-UBND', '05/10/2026', KN], 'Thong_bao_khong_thu_ly_BT-2026-014.pdf', 301442, 'SUCCESS', [ok('05/10/2026 10:05:18')]],
        ['H48.12.2026.000101', 'API-20260920-000101', 'VVBT-2026-446', 'BT-2026-001', 'Sở Tư pháp Hà Nội', 'QUYET_DINH_CU_NGUOI', 'XAC_MINH_THIET_HAI', '25/09/2026 16:20:00', ['32/QĐ-STP', '25/09/2026', KS], 'QD_cu_nguoi_giai_quyet_BT-2026-001_da_ky.pdf', 221904, 'SUCCESS', [ok('25/09/2026 16:20:11')]],
        ['H48.12.2026.000101', 'API-20260920-000101', 'VVBT-2026-446', 'BT-2026-001', 'Sở Tư pháp Hà Nội', 'BAO_CAO_XAC_MINH', 'THUONG_LUONG', '20/10/2026 11:00:00', null, 'Bao_cao_xac_minh_thiet_hai_BT-2026-001.pdf', 415230, 'SUCCESS', [t503('20/10/2026 11:00:09'), ok('20/10/2026 11:01:10')]],
        ['H48.12.2026.000110', 'API-20260915-000110', 'VVBT-2026-457', 'BT-2026-010', 'Tòa án nhân dân Tỉnh Lâm Đồng', 'BIEN_BAN_THUONG_LUONG', 'CHO_BAN_HANH_QD', '27/10/2026 08:40:00', null, 'Bien_ban_ket_qua_thuong_luong_BT-2026-010.pdf', 395264, 'FAILED',
            [tout('27/10/2026 08:40:05'), tout('27/10/2026 08:41:10'), t503('27/10/2026 08:46:12'), t503('27/10/2026 09:01:15'), tout('27/10/2026 10:01:20'), t503('27/10/2026 14:01:25')]],
        ['H48.12.2026.000434', 'API-20260901-000434', 'VVBT-2026-434', 'BT-2026-434', 'Sở Tư pháp Hà Nội', 'QUYET_DINH_TAM_DINH_CHI', 'TAM_DINH_CHI', '22/10/2026 15:10:00', ['44/QĐ-STP', '22/10/2026', KS], 'QD_tam_dinh_chi_BT-2026-434_da_ky.pdf', 287611, 'SUCCESS', [ok('22/10/2026 15:10:14')]],
        ['H48.12.2026.000435', 'API-20260902-000435', 'VVBT-2026-435', 'BT-2026-435', 'Sở Tư pháp Hà Nội', 'QUYET_DINH_TAM_DINH_CHI', 'TAM_DINH_CHI', '30/10/2026 08:15:00', ['47/QĐ-STP', '30/10/2026', KN], 'QD_tam_dinh_chi_BT-2026-435_ky_ngoai.pdf', 640118, 'RETRYING', [t503('30/10/2026 08:15:08'), t503('30/10/2026 08:16:10')]],
        ['H48.12.2026.000436', 'API-20260903-000436', 'VVBT-2026-436', 'BT-2026-436', 'Sở Tư pháp Hà Nội', 'QUYET_DINH_HOAN', 'HOAN_GIAI_QUYET', '28/10/2026 09:30:00', ['45/QĐ-STP', '28/10/2026', KS], 'QD_hoan_giai_quyet_BT-2026-436_da_ky.pdf', 266781, 'FAILED',
            [[('28/10/2026 09:30:07'), 400, 'VALIDATION_ERROR', 'document.signer_position: Thiếu chức vụ người ký.']]],
        ['H48.12.2026.000437', 'API-20260904-000437', 'VVBT-2026-437', 'BT-2026-437', 'Sở Tư pháp Hà Nội', 'YEU_CAU_BO_SUNG', 'YEU_CAU_BO_SUNG', '30/10/2026 09:02:00', ['49/TB-STP', '30/10/2026', KS], 'Thong_bao_yeu_cau_bo_sung_BT-2026-437_da_ky.pdf', 198340, 'RETRYING', [[('30/10/2026 09:02:06'), 429, 'RATE_LIMITED', 'Vượt hạn mức lượt gọi/phút.']]],
        ['H48.12.2026.000544', 'API-20260905-000544', 'VVBT-2026-544', 'BT-2026-544', 'Sở Tư pháp Hà Nội', 'THONG_BAO_DUNG_GIAI_QUYET', 'DUNG_GIAI_QUYET', '24/10/2026 10:45:00', ['46/TB-STP', '24/10/2026', KS], 'Thong_bao_dung_giai_quyet_BT-2026-544_da_ky.pdf', 233019, 'SUCCESS', [ok('24/10/2026 10:45:09')]],
        ['H48.12.2026.000162', 'API-20260925-000162', 'VVBT-2026-470', 'BT-2026-062', 'UBND phường Ba Đình', 'THONG_BAO_PHUC_HOI_DANH_DU', 'DANG_PHUC_HOI_DANH_DU', '21/10/2026 16:05:00', ['12/TB-UBND', '21/10/2026', KS], 'Thong_bao_to_chuc_phuc_hoi_danh_du_BT-2026-062.pdf', 207455, 'SUCCESS', [ok('21/10/2026 16:05:12')]],
        ['H48.12.2026.000103', 'API-20260810-000103', 'VVBT-2026-450', 'BT-2026-003-B', 'UBND phường Cầu Giấy', 'QUYET_DINH_GIAI_QUYET', 'CHO_CHI_TRA', '02/10/2026 09:00:00', ['18/QĐ-UBND', '02/10/2026', KS], 'QD_giai_quyet_boi_thuong_BT-2026-003-B_da_ky.pdf', 356998, 'SUCCESS', [ok('02/10/2026 09:00:15')]],
        ['H48.12.2026.000103', 'API-20260810-000103', 'VVBT-2026-450', 'BT-2026-003-B', 'UBND phường Cầu Giấy', 'THONG_BAO_CHI_TRA', 'CHO_CHI_TRA', '09/10/2026 10:20:00', ['22/TB-UBND', '09/10/2026', KN], 'Thong_bao_chi_tra_BT-2026-003-B_ky_ngoai.pdf', 488120, 'SUCCESS', [t503('09/10/2026 10:20:06'), ok('09/10/2026 10:21:08')]]
    ];
    return raw.map(function (r, i) {
        var seq = String(i + 1).padStart(3, '0');
        var tx = 'KQ-' + r[3] + '-' + r[5] + '-001';
        var fid = 'f' + nkdvHash(tx).slice(0, 7) + '-0000-7000-8000-' + nkdvHash(r[9]).slice(0, 12);
        var at = r[12].map(function (a) { return { at: a[0], http: a[1], code: a[2], message: a[3] }; });
        var last = at[at.length - 1];
        return {
            id: 'NKDV' + seq, transactionId: tx, dvcCode: r[0], receiptNo: r[1], caseCode: r[2], dossierCode: r[3], agency: r[4],
            stepCode: r[5], stepName: nkdvStepName(r[5]), caseStatus: r[6], caseStatusName: NKDV_CASE[r[6]] || r[6], eventTime: r[7],
            document: r[8] ? { docNo: r[8][0], docDate: r[8][1], signingMethod: r[8][2], signerName: LD[0], signerPosition: r[5] === 'QUYET_DINH_HOAN' ? '' : LD[1] } : null,
            file: { fileId: fid, fileName: r[9], fileSize: r[10], mimeType: 'application/pdf', hashAlgorithm: 'SHA-256', hashValue: nkdvHash(r[9] + r[3]) },
            result: r[11], attempts: at, sentAt: last.at,
            nextRetryAt: r[11] === 'RETRYING' ? nkdvAddMin(last.at, NKDV_RETRY_MIN[Math.min(at.length - 1, 4)]) : ''
        };
    });
}
function nkdvLoad() {
    var stored = null;
    try { if (localStorage.getItem(NKDV_KEY_VER) === NKDV_SEED_VER) stored = JSON.parse(localStorage.getItem(NKDV_KEY) || 'null'); } catch (e) { stored = null; }
    nkdvList = Array.isArray(stored) && stored.length ? stored : nkdvSeed();
    // Bản tin phát sinh tại trang Giải quyết yêu cầu bồi thường (quan_ly_boi_thuong_lth.js - LTH_DVC)
    var news = [];
    try { news = JSON.parse(localStorage.getItem('btnn_dvc_sync_log_new') || '[]') || []; localStorage.removeItem('btnn_dvc_sync_log_new'); } catch (e) { news = []; }
    news.forEach(function (x, i) {
        if (!x || nkdvList.some(function (m) { return m.transactionId === x.transactionId; })) return;
        nkdvList.push({
            id: 'NKDVN' + Date.now().toString(36) + i, transactionId: x.transactionId, dvcCode: x.dvcCode, receiptNo: x.receiptNo, caseCode: x.caseCode, dossierCode: x.dossierCode, agency: x.agency,
            stepCode: x.stepCode, stepName: nkdvStepName(x.stepCode), caseStatus: x.caseStatus, caseStatusName: x.caseStatusName, eventTime: x.eventTime, document: x.document,
            file: { fileId: 'f' + nkdvHash(x.transactionId).slice(0, 7) + '-0000-7000-8000-' + nkdvHash(x.fileName).slice(0, 12), fileName: x.fileName, fileSize: x.fileSize, mimeType: 'application/pdf', hashAlgorithm: 'SHA-256', hashValue: nkdvHash(x.fileName + x.dossierCode) },
            result: x.result || 'SUCCESS', attempts: [{ at: x.sentAt, http: 200, code: 'SUCCESS', message: null }], sentAt: x.sentAt, nextRetryAt: ''
        });
    });
    nkdvSave();
}
function nkdvSave() { try { localStorage.setItem(NKDV_KEY, JSON.stringify(nkdvList)); localStorage.setItem(NKDV_KEY_VER, NKDV_SEED_VER); } catch (e) { /* mockup */ } }

// ---------- JSON request / response (Tài liệu kết nối DVC - mục 3.3, 3.4) ----------
function nkdvRequest(m, at) {
    var d = m.document;
    return {
        transaction_id: m.transactionId, sent_at: nkdvIso(at || m.sentAt), dvc_dossier_code: m.dvcCode, receipt_no: m.receiptNo,
        case_code: m.caseCode, dossier_code: m.dossierCode, step_code: m.stepCode, step_name: m.stepName, event_time: nkdvIso(m.eventTime),
        case_status: m.caseStatus, case_status_name: m.caseStatusName,
        document: {
            doc_no: d ? d.docNo : null, doc_date: d ? d.docDate.split('/').reverse().join('-') : null, issued_time: d ? nkdvIso(m.eventTime) : null,
            signing_method: d ? d.signingMethod : null, signer_name: d ? d.signerName : null, signer_position: d ? (d.signerPosition || null) : null
        },
        file: {
            file_id: m.file.fileId, file_url: 'https://79.108.216.78:9982/api/share/v1/compensation/result-files/' + m.file.fileId,
            file_size: m.file.fileSize, mime_type: m.file.mimeType, hash_algorithm: m.file.hashAlgorithm, hash_value: m.file.hashValue
        }
    };
}
function nkdvResponse(m, a) {
    a = a || m.attempts[m.attempts.length - 1];
    if (!a) return null;
    if (!a.http) return null; // quá thời gian chờ: không có phản hồi
    return a.code === 'SUCCESS'
        ? { code: 'SUCCESS', message: null, data: { transaction_id: m.transactionId, duplicate: !!a.duplicate } }
        : { code: a.code, message: a.message, data: null };
}

// ---------- Danh sách ----------
function nkdvFmtSize(n) { n = Number(n) || 0; return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
function nkdvBadge(r) {
    var cls = r === 'SUCCESS' ? 'badge-success' : (r === 'FAILED' ? 'badge-danger' : 'badge-warning');
    return '<span class="badge ' + cls + '">' + NKDV_RESULT[r] + '</span>';
}
function nkdvLastError(m) { if (m.result === 'SUCCESS') return ''; var a = m.attempts[m.attempts.length - 1]; return a ? ((a.http ? 'HTTP ' + a.http + ' ' : '') + a.code + (a.message ? ': ' + a.message : '')) : ''; }
function nkdvFilters() {
    return { code: nkdvNoAcc(nkdvEl('nkdvCode').value), step: nkdvEl('nkdvStep').value, result: nkdvEl('nkdvResult').value, from: nkdvEl('nkdvFrom').value.trim(), to: nkdvEl('nkdvTo').value.trim() };
}
function nkdvDateKey(s) { var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s); return m ? m[3] + m[2] + m[1] : ''; }
function nkdvSetErr(id, msg) {
    var e = nkdvEl(id), box = nkdvEl(id + 'Err');
    if (e) e.classList.toggle('is-invalid', !!msg);
    if (box) { box.textContent = msg || ''; box.style.display = msg ? 'block' : 'none'; }
}
function nkdvSearch() {
    var f = nkdvFilters();
    nkdvSetErr('nkdvFrom', f.from && !nkdvDateKey(f.from) ? 'Ngày không hợp lệ (dd/mm/yyyy)' : '');
    nkdvSetErr('nkdvTo', f.to && !nkdvDateKey(f.to) ? 'Ngày không hợp lệ (dd/mm/yyyy)' : (f.from && f.to && nkdvDateKey(f.to) < nkdvDateKey(f.from) ? 'Từ ngày không được lớn hơn Đến ngày' : ''));
    if (nkdvEl('nkdvFrom').classList.contains('is-invalid') || nkdvEl('nkdvTo').classList.contains('is-invalid')) return;
    var fk = nkdvDateKey(f.from), tk = nkdvDateKey(f.to);
    nkdvFiltered = nkdvList.filter(function (m) {
        if (f.code && [m.dvcCode, m.caseCode, m.dossierCode, m.transactionId].every(function (c) { return nkdvNoAcc(c).indexOf(f.code) < 0; })) return false;
        if (f.step && m.stepCode !== f.step) return false;
        if (f.result && m.result !== f.result) return false;
        var k = nkdvKey(m.sentAt).slice(0, 8);
        if (fk && k < fk) return false;
        if (tk && k > tk) return false;
        return true;
    }).sort(function (a, b) { return nkdvKey(b.sentAt).localeCompare(nkdvKey(a.sentAt)); });
    nkdvPage = 1;
    nkdvRender();
}
function nkdvReset() {
    ['nkdvCode', 'nkdvFrom', 'nkdvTo'].forEach(function (id) { var e = nkdvEl(id); e.value = ''; if (e._flatpickr) e._flatpickr.clear(); });
    nkdvEl('nkdvStep').value = ''; nkdvEl('nkdvResult').value = '';
    nkdvSetErr('nkdvFrom', ''); nkdvSetErr('nkdvTo', '');
    nkdvSearch();
}
// ---------- Quyền (giả lập: ?quyen=xem chỉ có quyền Xem) ----------
var NKDV_PERM = (function () {
    var q = new URLSearchParams(location.search).get('quyen');
    return { resend: q !== 'xem', export: q !== 'xem' };
})();
var NKDV_GQ_URL = '../03_Boi_thuong_nha_nuoc/quan_ly_boi_thuong.html?id=';
function nkdvRender() {
    var total = nkdvFiltered.length, pages = Math.max(1, Math.ceil(total / nkdvSize));
    if (nkdvPage > pages) nkdvPage = pages;
    var start = (nkdvPage - 1) * nkdvSize, rows = nkdvFiltered.slice(start, start + nkdvSize);
    nkdvEl('nkdvCountText').textContent = total + ' bản ghi';
    nkdvEl('nkdvBody').innerHTML = rows.length ? rows.map(function (m, i) {
        var err = nkdvLastError(m);
        return '<tr data-id="' + m.id + '">'
            + '<td style="text-align:center;">' + (start + i + 1) + '</td>'
            + '<td style="text-align:center; white-space:nowrap;">' + nkdvE(m.sentAt) + '</td>'
            + '<td style="white-space:nowrap;">' + nkdvE(m.dvcCode) + '</td>'
            + '<td style="white-space:nowrap;">' + nkdvE(m.caseCode) + '</td>'
            + '<td style="white-space:nowrap;"><a href="' + NKDV_GQ_URL + encodeURIComponent(m.dossierCode) + '" target="_blank" class="action-link">' + nkdvE(m.dossierCode) + '</a></td>'
            + '<td>' + nkdvE(m.stepName) + '</td>'
            + '<td style="text-align:center;">' + nkdvE(m.caseStatusName) + '</td>'
            + '<td style="text-align:center;">' + nkdvBadge(m.result) + '</td>'
            + '<td style="text-align:right;">' + m.attempts.length + '</td>'
            + '<td><span class="nkdv-err" title="' + nkdvE(err) + '">' + (err ? nkdvE(err) : '-') + '</span></td>'
            + '<td style="text-align:center; white-space:nowrap;">'
            + '<button type="button" class="nkdv-ib" title="Xem chi tiết" aria-label="Xem chi tiết" onclick="nkdvOpen(\'' + m.id + '\')"><i class="fa-solid fa-eye"></i></button>'
            + (m.result === 'FAILED' && NKDV_PERM.resend ? '<button type="button" class="nkdv-ib nkdv-ib-retry" title="Gửi lại" aria-label="Gửi lại" onclick="nkdvResend(\'' + m.id + '\')"><i class="fa-solid fa-rotate-right"></i></button>' : '')
            + '</td></tr>';
    }).join('') : '<tr><td colspan="11" style="text-align:center; color:#94a3b8; font-style:italic; padding:18px;">Không có dữ liệu</td></tr>';
    nkdvEl('nkdvRange').textContent = total ? (start + 1) + '-' + Math.min(start + nkdvSize, total) : '0-0';
    nkdvEl('nkdvTotal').textContent = total;
    var h = '';
    for (var p = 1; p <= pages; p++) h += '<button type="button" class="page-item' + (p === nkdvPage ? ' active' : '') + '" onclick="nkdvGo(' + p + ')">' + p + '</button>';
    nkdvEl('nkdvPages').innerHTML = h;
}
function nkdvGo(p) { nkdvPage = p; nkdvRender(); }
function nkdvChangePageSize(v) { nkdvSize = Number(v) || 20; nkdvPage = 1; nkdvRender(); }

// ---------- Thông báo (không dùng toast) ----------
function nkdvNoticeIn(id, msg, type) {
    var box = nkdvEl(id);
    if (!box) return;
    if (!msg) { box.style.display = 'none'; box.innerHTML = ''; return; }
    box.className = 'nkdv-notice ' + (type || 'success');
    box.innerHTML = '<i class="fa-solid ' + (type === 'error' ? 'fa-circle-exclamation' : (type === 'info' ? 'fa-circle-info' : 'fa-circle-check')) + '"></i><span>' + nkdvE(msg) + '</span><button type="button" title="Đóng" onclick="nkdvNoticeIn(\'' + id + '\', \'\')">&times;</button>';
    box.style.display = 'flex';
}
function nkdvNotice(msg, type) { nkdvNoticeIn('nkdvNotice', msg, type); }

// ---------- MH02 - Màn hình Chi tiết bản tin (page) ----------
function nkdvF(label, valueHtml, cls) {
    var empty = valueHtml === '' || valueHtml == null;
    return '<div class="ro-f' + (cls ? ' ' + cls : '') + '"><div class="ro-l">' + nkdvE(label) + '</div><div class="ro-v">' + (empty ? '<span class="ro-empty">---</span>' : valueHtml) + '</div></div>';
}
function nkdvCard(title, body, extra) {
    return '<div class="ro-card' + (extra || '') + '"><div class="ro-card-h">' + title + '</div><div class="ro-card-b">' + body + '</div></div>';
}
function nkdvShow(view) {
    nkdvEl('nkdvListView').style.display = view === 'list' ? '' : 'none';
    nkdvEl('nkdvDetailView').style.display = view === 'detail' ? 'flex' : 'none';
    window.scrollTo(0, 0);
}
function nkdvOpen(id) {
    var m = nkdvList.find(function (x) { return x.id === id; }); if (!m) return;
    nkdvOpenId = id;
    var d = m.document, req = nkdvRequest(m), res = nkdvResponse(m);
    var url = req.file.file_url;
    var hist = m.attempts.map(function (a, i) {
        var okA = a.code === 'SUCCESS';
        return '<tr><td style="text-align:center;">' + (i + 1) + '</td><td style="text-align:center;">' + nkdvE(a.at) + '</td><td style="text-align:center;">' + (a.http || '---') + '</td><td>' + nkdvE(a.code) + '</td><td>' + (a.message ? nkdvE(a.message) : (okA && a.duplicate ? 'duplicate = true' : '<span class="ro-empty">---</span>')) + '</td>'
            + '<td style="text-align:center;">' + (okA ? '<span class="badge badge-success">Thành công</span>' : '<span class="badge badge-danger">Lỗi</span>') + '</td></tr>';
    }).join('');
    var html = '<div id="nkdvDetailNotice" class="nkdv-notice" style="display:none;"></div>'
        // Dải thông tin nhanh
        + '<div class="ro-card nkdv-meta"><div class="ro-card-b"><div class="ro-grid ro-g4">'
        + nkdvF('Mã giao dịch', '<span class="nkdv-mono">' + nkdvE(m.transactionId) + '</span>')
        + nkdvF('Kết quả', nkdvBadge(m.result))
        + nkdvF('Số lần gửi', String(m.attempts.length))
        + nkdvF('Thời điểm gửi gần nhất', nkdvE(m.sentAt))
        + '</div></div></div>'
        // 1. Thông tin chung
        + nkdvCard('Thông tin chung', '<div class="ro-grid ro-g4">'
            + nkdvF('Mã hồ sơ DVC', nkdvE(m.dvcCode))
            + nkdvF('Số tiếp nhận', nkdvE(m.receiptNo))
            + nkdvF('Mã vụ việc', nkdvE(m.caseCode))
            + nkdvF('Mã hồ sơ', '<a class="action-link" target="_blank" href="' + NKDV_GQ_URL + encodeURIComponent(m.dossierCode) + '">' + nkdvE(m.dossierCode) + '</a>')
            + nkdvF('Bước', nkdvE(m.stepName), 'ro-span-2')
            + nkdvF('Trạng thái vụ việc gửi', nkdvE(m.caseStatusName) + ' <span class="nkdv-code">' + nkdvE(m.caseStatus) + '</span>')
            + nkdvF('Cơ quan giải quyết', nkdvE(m.agency))
            + nkdvF('Thời điểm phát sinh kết quả', nkdvE(m.eventTime))
            + nkdvF('Lần gửi lại tiếp theo', m.result === 'RETRYING' ? nkdvE(m.nextRetryAt) : '')
            + '</div>')
        // 2. Văn bản
        + nkdvCard('Văn bản', d ? '<div class="ro-grid ro-g4">'
            + nkdvF('Số, ký hiệu văn bản', nkdvE(d.docNo))
            + nkdvF('Ngày văn bản', nkdvE(d.docDate))
            + nkdvF('Hình thức ký', d.signingMethod === 'KY_NGOAI' ? 'Ký ngoài' : 'Ký số')
            + nkdvF('Người ký', nkdvE([d.signerName, d.signerPosition].filter(Boolean).join(' - ')))
            + '</div>' : '<div class="ro-empty">Bước không có số, ký hiệu văn bản (tệp cán bộ tải lên tại trường tệp riêng của bước).</div>')
        // 3. Link tệp và mã băm
        + nkdvCard('Link tệp và mã băm', '<div class="ro-grid ro-g4">'
            + nkdvF('Link tệp kết quả', '<a class="nkdv-mono nkdv-link" href="' + nkdvE(url) + '" target="_blank" rel="noopener">' + nkdvE(url) + '</a>', 'ro-full')
            + nkdvF('Thuật toán băm', nkdvE(m.file.hashAlgorithm))
            + nkdvF('Mã băm', '<span class="nkdv-hash"><span class="nkdv-mono" id="nkdvHashVal">' + nkdvE(m.file.hashValue) + '</span>'
                + '<button type="button" class="ro-ab" id="nkdvCopyBtn" onclick="nkdvCopyHash()"><i class="fa-regular fa-copy"></i> Sao chép</button><span class="nkdv-copied" id="nkdvCopied" style="display:none;"><i class="fa-solid fa-check"></i> Đã sao chép</span></span>', 'ro-span-3')
            + nkdvF('Dung lượng', nkdvE(nkdvFmtSize(m.file.fileSize)) + ' <span class="nkdv-sub">(' + Number(m.file.fileSize).toLocaleString('vi-VN') + ' byte)</span>')
            + nkdvF('Định dạng', nkdvE(m.file.mimeType))
            + '</div>')
        // 4. Lịch sử các lần gửi
        + nkdvCard('Lịch sử các lần gửi', '<div class="ro-tbl-wrap"><table class="ro-table" id="nkdvHistTable"><thead><tr><th style="width:6%; text-align:center;">Lần</th><th style="width:18%; text-align:center;">Thời điểm gửi</th><th style="width:8%; text-align:center;">HTTP</th><th style="width:18%;">Mã phản hồi</th><th>Thông báo</th><th style="width:13%; text-align:center;">Kết quả</th></tr></thead><tbody>' + hist + '</tbody></table></div>')
        // 5. Dữ liệu kỹ thuật (thu gọn được)
        + '<div class="ro-card nkdv-tech" id="nkdvTech"><button type="button" class="ro-card-h nkdv-tech-h" onclick="nkdvToggleTech()" aria-expanded="false" id="nkdvTechBtn"><span>Dữ liệu kỹ thuật (JSON)</span><i class="fa-solid fa-chevron-down" id="nkdvTechIco"></i></button>'
        + '<div class="ro-card-b" id="nkdvTechBody" style="display:none;"><div class="nkdv-json-grid">'
        + '<div><div class="ro-l">Request (lần gửi gần nhất)</div><pre class="nkdv-json" id="nkdvReqJson">' + nkdvE(JSON.stringify(req, null, 2)) + '</pre></div>'
        + '<div><div class="ro-l">Response (lần gửi gần nhất)</div><pre class="nkdv-json" id="nkdvResJson">' + nkdvE(res ? JSON.stringify(res, null, 2) : 'Không có phản hồi (quá thời gian chờ / lỗi kết nối)') + '</pre></div>'
        + '</div></div></div>';
    nkdvEl('nkdvDetailTitleText').textContent = 'CHI TIẾT BẢN TIN ĐỒNG BỘ - ' + m.dossierCode;
    nkdvEl('nkdvDetailBody').innerHTML = html;
    nkdvEl('nkdvDetailResend').style.display = m.result === 'FAILED' && NKDV_PERM.resend ? 'inline-flex' : 'none';
    nkdvShow('detail');
}
function nkdvToggleTech() {
    var b = nkdvEl('nkdvTechBody'), open = b.style.display === 'none';
    b.style.display = open ? '' : 'none';
    nkdvEl('nkdvTechIco').className = 'fa-solid ' + (open ? 'fa-chevron-up' : 'fa-chevron-down');
    nkdvEl('nkdvTechBtn').setAttribute('aria-expanded', open ? 'true' : 'false');
}
function nkdvCopyHash() {
    var v = (nkdvEl('nkdvHashVal') || {}).textContent || '';
    var done = function () { var c = nkdvEl('nkdvCopied'); if (c) { c.style.display = 'inline-flex'; setTimeout(function () { c.style.display = 'none'; }, 2000); } };
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(v).then(done, done); return; } } catch (e) { /* mockup */ }
    var t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) { /* mockup */ } t.remove(); done();
}
// Đóng: quay lại danh sách, giữ bộ lọc và trang
function nkdvClose() { nkdvOpenId = null; nkdvShow('list'); nkdvRender(); }

// ---------- Gửi lại (chỉ bản tin Lỗi): popup xác nhận, giữ nguyên transaction_id ----------
var nkdvPendingResend = null;
function nkdvResend(id) {
    var m = nkdvList.find(function (x) { return x.id === id; });
    if (!m || m.result !== 'FAILED' || !NKDV_PERM.resend) return;
    nkdvPendingResend = id;
    nkdvEl('nkdvConfirmText').innerHTML = 'Gửi lại bản tin <b>' + nkdvE(m.stepName) + '</b> của hồ sơ <b>' + nkdvE(m.dossierCode) + '</b> (Mã hồ sơ DVC ' + nkdvE(m.dvcCode) + ')?<br>Bản tin giữ nguyên Mã giao dịch <b>' + nkdvE(m.transactionId) + '</b>.';
    nkdvEl('nkdvConfirmModal').style.display = 'flex';
}
function nkdvConfirmNo() { nkdvEl('nkdvConfirmModal').style.display = 'none'; nkdvPendingResend = null; }
function nkdvConfirmYes() {
    var id = nkdvPendingResend; nkdvConfirmNo();
    var m = nkdvList.find(function (x) { return x.id === id; }); if (!m) return;
    // Mockup: Dịch vụ công nhận thành công
    var at = nkdvNow();
    m.attempts.push({ at: at, http: 200, code: 'SUCCESS', message: null, duplicate: false, manual: true });
    m.sentAt = at; m.result = 'SUCCESS'; m.nextRetryAt = '';
    nkdvSave();
    var keep = nkdvPage; nkdvSearch(); nkdvPage = keep; nkdvRender();
    var msg = 'Đã gửi lại bản tin ' + m.transactionId + ' về Dịch vụ công quốc gia. Kết quả: Thành công.';
    if (nkdvOpenId === id) { nkdvOpen(id); nkdvNoticeIn('nkdvDetailNotice', msg, 'success'); }
    nkdvNotice(msg, 'success');
}

// ---------- Kết xuất Excel (Quy chuẩn Kết xuất Excel dùng chung) ----------
var NKDV_EXPORT_HEADERS = ['STT', 'Thời điểm gửi', 'Mã hồ sơ DVC', 'Mã vụ việc', 'Mã hồ sơ', 'Bước', 'Trạng thái vụ việc gửi', 'Kết quả', 'Số lần gửi', 'Thông báo lỗi'];
function nkdvExportExcel() {
    if (!NKDV_PERM.export) return;
    if (!nkdvFiltered.length) { nkdvNotice('Không có dữ liệu để xuất Excel.', 'info'); return; }
    var now = new Date(), p = function (x) { return String(x).padStart(2, '0'); };
    var stamp = p(now.getDate()) + '/' + p(now.getMonth() + 1) + '/' + now.getFullYear() + ' ' + p(now.getHours()) + ':' + p(now.getMinutes());
    var font = "font-family:'Times New Roman';", n = NKDV_EXPORT_HEADERS.length;
    var cell = function (v) { return '<td style="' + font + 'font-size:12pt;mso-number-format:\'\\@\';">' + nkdvE(v) + '</td>'; };
    var html = '<meta charset="UTF-8"><table border="1">'
        + '<tr><td colspan="' + n + '" style="' + font + 'font-size:15pt;font-weight:bold;text-align:center;border:none;">NHẬT KÝ ĐỒNG BỘ DỊCH VỤ CÔNG</td></tr>'
        + '<tr><td colspan="' + n + '" style="' + font + 'font-size:11pt;font-style:italic;text-align:center;border:none;">Thời điểm xuất: ' + stamp + '</td></tr>'
        + '<tr>' + NKDV_EXPORT_HEADERS.map(function (h) { return '<th style="' + font + 'font-size:12pt;background:#e5e7eb;">' + h + '</th>'; }).join('') + '</tr>'
        + nkdvFiltered.map(function (m, i) { return '<tr>' + [i + 1, m.sentAt, m.dvcCode, m.caseCode, m.dossierCode, m.stepName, m.caseStatusName, NKDV_RESULT[m.result], m.attempts.length, nkdvLastError(m) || '-'].map(cell).join('') + '</tr>'; }).join('')
        + '</table>';
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' }));
    // Mockup sinh bảng HTML nên dùng đuôi .xls; hệ thống thật xuất .xlsx theo quy chuẩn
    a.download = now.getFullYear() + p(now.getMonth() + 1) + p(now.getDate()) + '_Nhat_ky_dong_bo_DVC.xls';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    nkdvNotice('Đã kết xuất ' + nkdvFiltered.length + ' bản tin ra tệp Excel.', 'success');
}

// ---------- Khởi tạo ----------
function nkdvInit() {
    nkdvEl('nkdvStep').innerHTML = '<option value="">Tất cả</option>' + NKDV_STEPS.map(function (s, i) { return '<option value="' + s[0] + '">' + (i + 1) + '. ' + nkdvE(s[1]) + '</option>'; }).join('');
    if (typeof flatpickr !== 'undefined') flatpickr('#nkdvFrom, #nkdvTo', { dateFormat: 'd/m/Y', allowInput: true });
    if (!NKDV_PERM.export) nkdvEl('nkdvExportBtn').style.display = 'none';
    nkdvLoad();
    var q = new URLSearchParams(location.search);
    if (q.get('code')) nkdvEl('nkdvCode').value = q.get('code');
    nkdvSearch();
    if (q.get('id')) nkdvOpen(q.get('id'));
}
document.addEventListener('DOMContentLoaded', nkdvInit);
