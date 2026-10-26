/*
 * Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Chuẩn hóa UI/UX (prefix kpux), nạp sau quan_ly_kinh_phi_kpdc.js
 * 1. Lưới MH01: cột Thao tác cố định 01 bộ nút, cùng vị trí trên mọi dòng; nút không được phép hiển thị mờ, có tooltip lý do.
 *    - Lãnh đạo: Ký duyệt, Từ chối. Cán bộ xử lý: Cập nhật Quyết định tạm ứng, Trình thông báo chi trả,
 *      Đề nghị cấp bổ sung kinh phí, Cập nhật chi trả, Sung quỹ nhà nước (bỏ luồng Chờ lập đề nghị: Lập đề nghị, Xóa).
 * 2. "Cập nhật chi trả" thống nhất cho mọi loại: mở màn hình chi tiết (cùng hàm render kpdtAdvBody / kpdtPayBody),
 *    các khối phía trên thu gọn, cuộn + focus khối "Thông tin kết quả chi trả thực tế" (không có Số biên lai nhận tiền mặt).
 *    Bỏ thao tác "Đính kèm văn bản đã ký": Quyết định tạm ứng Ký ngoài đã có văn bản đã ký khi chuyển Chờ chi trả.
 * 3. Xem chi tiết: lưới nhãn - giá trị gọn (04 cột trên màn rộng), Footer nút cố định, nút "Đóng" chỉ ở Footer.
 * 4. Bảng Tài liệu kèm theo chỉ hiển thị khi có dữ liệu.
 * 5. Khối "Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường": chỉ loại Chi trả tiền bồi thường,
 *    sau khi Thông báo chi trả đã ký (Chờ chi trả trở đi); Cán bộ cập nhật được khi Chờ chi trả.
 */
(function () {
    'use strict';
    if (window.__kpux) return;
    window.__kpux = true;

    var CSS = [
        // ---- Lưới MH01: nút thao tác ----
        '#proposalsTableBody .kpux-acts { display:flex; justify-content:center; gap:4px; flex-wrap:nowrap; }',
        '#proposalsTableBody .kpux-act.is-off { opacity:.35; cursor:not-allowed; }',
        '#proposalsTableBody .kpux-act.is-off:hover { transform:none; box-shadow:none; }',
        '.kpux-overdue { margin-top:4px; } .kpux-overdue .badge { font-size:11px; }',
        'body #kpdtPanel .kpdt-head-right .kpux-overdue { display:inline-block; margin:0 0 0 6px; }',
        // ---- Xem chi tiết: lưới nhãn - giá trị gọn ----
        'body #kpdtPanel .inline-form-body { padding:16px 20px; }',
        'body #kpdtPanel .kpdt-card { margin-bottom:12px; }',
        'body #kpdtPanel .kpdt-card-head { padding:9px 14px; }',
        'body #kpdtPanel .kpdt-card-body { padding:12px 16px 14px; }',
        'body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3 { grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px 24px; }',
        'body #kpdtPanel .kpdt-grid > div:empty { display:none; }',
        'body #kpdtPanel .kpdt-fld .form-label { display:block; margin:0 0 3px; font-size:12px; font-weight:600; color:#64748b; line-height:1.35; text-transform:none; letter-spacing:0; }',
        'body #kpdtPanel .kpdt-ro { background:transparent; border:0; border-radius:0; padding:0; min-height:0; font-size:13.5px; font-weight:600; color:#0f172a; line-height:1.45; }',
        'body #kpdtPanel .kpdt-words { margin-top:2px; }',
        'body #kpdtPanel .kpdt-hint { margin-top:10px; }',
        'body #kpdtPanel .kpdt-full > .kpdt-docs-box, body #kpdtPanel .kpdt-card-body > .kpdt-docs-box { margin-top:2px; }',
        'body #kpdtPanel .kpdt-card-head.kpdt-toggle { cursor:pointer; user-select:none; }',
        'body #kpdtPanel .kpux-head-btns { margin-left:auto; display:flex; gap:6px; text-transform:none; letter-spacing:0; }',
        'body #kpdtPanel .kpux-head-btns .btn { padding:3px 10px; font-size:12px; font-weight:600; }',
        'body #kpdtPanel .kpux-head-btns + .kpdt-chev { margin-left:8px; }',
        // Footer cố định cuối màn hình khi xem chi tiết
        'body #kpdtPanel .inline-form-footer { position:sticky; bottom:0; z-index:30; background:#fff; box-shadow:0 -4px 12px rgba(15,23,42,.08); }',
        // ---- Khối nhập Thông tin kết quả chi trả thực tế / Cập nhật thông báo ----
        'body #kpdtPanel .kpux-pay { border-color:#86efac; box-shadow:0 0 0 3px rgba(22,163,74,.10); scroll-margin-top:16px; }',
        'body #kpdtPanel .kpux-form { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px 20px; }',
        'body #kpdtPanel .kpux-form .kpux-f { min-width:0; }',
        'body #kpdtPanel .kpux-form .kpux-full { grid-column:1/-1; }',
        'body #kpdtPanel .kpux-form .kpux-span2 { grid-column:span 2; }',
        'body #kpdtPanel .kpux-form .form-label { display:block; margin-bottom:4px; font-size:12.5px; font-weight:600; color:#334155; }',
        'body #kpdtPanel .kpux-req { color:#dc2626; margin-left:2px; }',
        'body #kpdtPanel .kpdt-card-head:focus { outline:none; }',
        'body #kpdtPanel .kpux-form textarea.form-control { font-family:inherit; }',
        'body #kpdtPanel .kpux-form .form-control.is-invalid { border-color:#dc2626 !important; box-shadow:0 0 0 2px rgba(220,38,38,.12); }',
        'body #kpdtPanel .kpux-err { display:none; color:#dc2626; font-size:12px; margin-top:4px; }',
        'body #kpdtPanel .kpux-err.on { display:block; }',
        'body #kpdtPanel .kpux-radios { display:flex; gap:24px; align-items:center; min-height:36px; }',
        'body #kpdtPanel .kpux-radios label { display:flex; align-items:center; gap:6px; font-weight:600; font-size:13.5px; cursor:pointer; color:#1e293b; }',
        'body #kpdtPanel .kpux-sub { grid-column:1/-1; font-size:12px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:.3px; border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-top:2px; }',
        'body #kpdtPanel .kpux-ro { font-size:13.5px; font-weight:700; color:#0f172a; min-height:36px; display:flex; align-items:center; }',
        '@media (max-width: 1200px) { body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3, body #kpdtPanel .kpux-form { grid-template-columns:repeat(3, minmax(0,1fr)); } }',
        '@media (max-width: 900px) { body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3, body #kpdtPanel .kpux-form { grid-template-columns:repeat(2, minmax(0,1fr)); } }',
        '@media (max-width: 600px) { body #kpdtPanel .kpdt-grid, body #kpdtPanel .kpdt-grid.c3, body #kpdtPanel .kpux-form { grid-template-columns:1fr; } #kpdtPanel .kpux-form .kpux-span2 { grid-column:1/-1; } }'
    ].join('\n');
    function injectCss() {
        if (document.getElementById('kpuxCss')) return;
        var st = document.createElement('style');
        st.id = 'kpuxCss';
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    var esc = function (v) { return kpEsc(v); };
    var el = function (id) { return document.getElementById(id); };
    var isTb = function (it) { return typeof kptbIs === 'function' && kptbIs(it); };
    var isQd = function (it) { return typeof qdtuIs === 'function' && qdtuIs(it); };
    var fmt = function (n) { return (Number(n) || 0).toLocaleString('vi-VN'); };
    var today = function () { var d = new Date(); d.setHours(0, 0, 0, 0); return d; };
    var todayText = function () { return formatDateViGlobal(new Date()); };

    // ================= 1. Lưới MH01: bộ thao tác cố định =================
    function actDefs(item) {
        var id = item.id;
        var st = kpNormStatus(item.status);
        var tb = isTb(item), qd = isQd(item);
        var elig = getTreasuryInfo(item).isEligible;
        if (kpRole() === 'lanh-dao') {
            var can = qd ? qdtuCanAct(item) : (tb ? kptbCanAct(item) : st === 'Chờ duyệt');
            var offLd = 'chỉ thực hiện với bản ghi Chờ duyệt được giao cho Lãnh đạo tại cấp ký duyệt hiện hành';
            return [
                { t: 'Ký duyệt', ic: 'fa-solid fa-file-signature', cls: 'accept sign', on: can, js: "openApproveModal('" + id + "')", off: offLd },
                { t: 'Từ chối', ic: 'fa-solid fa-ban', cls: 'delete reject', on: can, js: "openRejectModal('" + id + "')", off: offLd }
            ];
        }
        return [
            { t: 'Cập nhật Quyết định tạm ứng', ic: 'fa-solid fa-pen-to-square', cls: 'edit', on: st === 'Bị từ chối' && qd, js: "qdtuOpenPage('" + id + "')", dt: "kpdtGo('qdtuOpenPage','" + id + "')", off: 'chỉ thực hiện với bản ghi Tạm ứng kinh phí Bị từ chối' },
            { t: 'Trình thông báo chi trả', ic: 'fa-solid fa-paper-plane', cls: 'edit', on: tb && kptbCanSubmit(item), js: "kptbOpenSign('" + id + "')", off: 'chỉ thực hiện với bản ghi Chi trả tiền bồi thường Chờ thông báo chi trả, Đề nghị cấp bổ sung kinh phí, Bị từ chối' },
            { t: 'Đề nghị cấp bổ sung kinh phí', ic: 'fa-solid fa-file-invoice-dollar', cls: '', on: tb && st === KPTB_ST.WAIT, js: "kptbOpenSupp('" + id + "')", off: 'chỉ thực hiện với bản ghi Chi trả tiền bồi thường Chờ thông báo chi trả' },
            // Cập nhật chi trả / Cập nhật thu hồi: 01 nút chung, nhãn theo trạng thái (Chờ chi trả -> Cập nhật chi trả; Chờ thu hồi -> Cập nhật thu hồi)
            (st === 'Chờ thu hồi'
                ? { t: 'Cập nhật thu hồi', ic: 'fa-solid fa-hand-holding-dollar', cls: 'accept', on: true, js: "kpuxOpenRc('" + id + "')", off: '' }
                : { t: 'Cập nhật chi trả', ic: 'fa-solid fa-hand-holding-dollar', cls: 'accept', on: st === 'Chờ chi trả' && !elig, js: "kpuxOpenPay('" + id + "')", off: (st === 'Chờ chi trả' && elig) ? 'khoản chi đã quá hạn 03 năm kể từ ngày nhận thông báo, chỉ được Sung quỹ nhà nước' : 'chỉ thực hiện với bản ghi Chờ chi trả còn trong hạn 03 năm hoặc bản ghi Chờ thu hồi (Cập nhật thu hồi)' }),
            { t: 'Sung quỹ nhà nước', ic: 'fa-solid fa-building-columns', cls: 'reject', on: elig, js: "kpuxOpenForfeit('" + id + "')", off: 'chỉ thực hiện với bản ghi Chờ chi trả đã quá hạn 03 năm kể từ ngày nhận thông báo' }
        ];
    }
    function actsHtml(item) {
        return '<div class="kpux-acts">' + actDefs(item).map(function (a) {
            return a.on
                ? '<button type="button" class="icon-btn kpux-act ' + a.cls + '" data-admin-icon-normalized="1" title="' + esc(a.t) + '" onclick="event.stopPropagation(); ' + a.js + '"><i class="' + a.ic + '"></i></button>'
                : '<button type="button" class="icon-btn kpux-act is-off ' + a.cls + '" data-admin-icon-normalized="1" aria-disabled="true" title="' + esc(a.t + ': ' + a.off) + '" onclick="event.stopPropagation();"><i class="' + a.ic + '"></i></button>';
        }).join('') + '</div>';
    }
    function decorateTable() {
        var tbody = el('proposalsTableBody'); if (!tbody) return;
        Array.prototype.forEach.call(tbody.rows, function (tr) {
            if (tr.cells.length < 11) return;
            var code = tr.cells[1].innerText.trim();
            var item = proposalsList.find(function (p) { return p && p.code === code; });
            if (!item) return;
            var box = tr.cells[tr.cells.length - 1].querySelector('.action-flex') || tr.cells[tr.cells.length - 1];
            box.innerHTML = actsHtml(item);
            var stCell = tr.cells[tr.cells.length - 2];
            if (getTreasuryInfo(item).isEligible && !stCell.querySelector('.kpux-overdue')) stCell.insertAdjacentHTML('beforeend', overdueHtml());
        });
    }
    // Nhãn cảnh báo bản ghi Chờ chi trả đã quá hạn 03 năm kể từ ngày thông báo mà người yêu cầu không đến nhận tiền
    function overdueHtml() { return '<div class="kpux-overdue"><span class="badge badge-danger">Quá hạn 3 năm</span></div>'; }

    // ================= 2. Dữ liệu: Ký ngoài đã có văn bản đã ký khi Chờ chi trả =================
    // Dữ liệu giả lập bổ sung (Chi trả tiền bồi thường): 02 Chờ chi trả, 01 Chờ chi trả quá hạn 03 năm, 01 Hoàn thành, 01 Sung quỹ nhà nước
    var SEEDS = [
        { id: 'P_KPUX_1', code: 'KP-2026-121', ycbt: 'BT-2026-061', vv: 'VVBT-2026-061', nyc: 'Lê Thị Thu Hà', amount: 75000000, date: '15/10/2026', st: 'Chờ chi trả', sign: 'Ký số', docNo: '61/TB-STP', notice: '20/10/2026' },
        { id: 'P_KPUX_2', code: 'KP-2026-122', ycbt: 'BT-2026-062', vv: 'VVBT-2026-062', nyc: 'Trịnh Văn Quang', amount: 128000000, date: '16/10/2026', st: 'Chờ chi trả', sign: 'Ký ngoài', docNo: '62/TB-STP', notice: '22/10/2026' },
        { id: 'P_KPUX_3', code: 'KP-2026-123', ycbt: 'BT-2023-047', vv: 'VVBT-2023-047', nyc: 'Đinh Công Tráng', amount: 56000000, date: '02/10/2026', st: 'Chờ chi trả', sign: 'Ký số', docNo: '47/TB-STP', notice: '12/06/2023', created: '02/06/2023' },
        { id: 'P_KPUX_4', code: 'KP-2026-124', ycbt: 'BT-2026-064', vv: 'VVBT-2026-064', nyc: 'Phan Thị Ngọc', amount: 92000000, date: '05/10/2026', st: 'Hoàn thành', sign: 'Ký số', docNo: '64/TB-STP', notice: '08/10/2026', pay: '12/10/2026' },
        { id: 'P_KPUX_5', code: 'KP-2026-125', ycbt: 'BT-2023-021', vv: 'VVBT-2023-021', nyc: 'Vũ Đức Thắng', amount: 64000000, date: '01/10/2026', st: 'Sung quỹ nhà nước', sign: 'Ký ngoài', docNo: '21/TB-STP', notice: '03/04/2023', created: '28/03/2023', sq: '05/10/2026' }
    ];
    function seedKpux() {
        var tpl = proposalsList.find(function (p) { return p && p.id === 'P_TB_KPTB-S5'; }) || proposalsList.find(function (p) { return isTb(p) && p.kptbDec; });
        if (!tpl) return 0;
        var n = 0;
        SEEDS.forEach(function (s) {
            if (proposalsList.some(function (p) { return p && (p.id === s.id || p.code === s.code); })) return;
            var it = JSON.parse(JSON.stringify(tpl));
            ['kptbPayment', 'kptbApproval', 'kptbReturned', 'kptbSupp', 'noticeList', 'noticeNote', 'noticeFiles', 'payoutDate', 'payoutAmountReal', 'payoutFiles', 'payoutFile', 'treasuryForfeitDate', 'treasuryVoucherNo', 'treasuryAmount', 'treasuryReason', 'treasuryFile', 'recovery', 'statusBasis', 'statusChangeBasis'].forEach(function (k) { delete it[k]; });
            it.id = s.id; it.code = s.code; it.ycbtCode = s.ycbt; it.vvCode = s.vv; it.nycName = s.nyc; it.amount = s.amount; it.date = s.date; it.status = s.st;
            var dec = it.kptbDec || (it.kptbDec = {});
            dec.decNo = s.docNo.replace('/TB-STP', '/QĐ-GQBT'); dec.issueDate = s.created || s.date; dec.total = s.amount; dec.advance = 0;
            if (dec.recipient) dec.recipient.name = s.nyc;
            if (dec.payout && dec.payout.accHolder) dec.payout.accHolder = s.nyc.toUpperCase();
            var signedAt = '09:30 ' + s.notice;
            it.kptbNotice = s.sign === 'Ký số'
                ? { signMethod: 'Ký số', docNo: s.docNo, docDate: s.notice, signedFile: 'Thong_bao_chi_tra_' + s.ycbt + '_ky_so.pdf', issuedAt: signedAt, digitalSign: { by: 'Lãnh đạo cơ quan', at: signedAt } }
                : { signMethod: 'Ký ngoài', docNo: s.docNo, docDate: s.notice, signedFile: 'Thong_bao_chi_tra_' + s.ycbt + '_da_ky.pdf', issuedAt: signedAt };
            it.noticeReceivedDate = s.notice;
            it.kptbHistory = [{ at: '08:00 ' + (s.created || s.date), userId: '', userName: 'Hệ thống', action: 'Tạo bản ghi', note: 'Quyết định giải quyết bồi thường ' + dec.decNo + ' được ban hành.' },
                { at: signedAt, userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: s.sign === 'Ký số' ? 'Ký duyệt Thông báo chi trả' : 'Ban hành Thông báo chi trả (Ký ngoài)', note: 'Số ' + s.docNo + '.' }];
            if (s.pay) {
                it.kptbPayment = { method: KPTB_TRANSFER, accHolder: s.nyc.toUpperCase(), account: '0451000' + s.code.slice(-3) + '88', bank: 'Vietcombank', branch: 'Chi nhánh Hà Nội', recName: s.nyc, payDate: s.pay, amount: s.amount, files: [{ name: 'Ủy nhiệm chi', file: { name: 'UNC_' + s.code + '.pdf' } }], at: '10:00 ' + s.pay, by: 'canbonv' };
                it.payoutDate = s.pay; it.payoutAmountReal = s.amount; it.payoutMethod = KPTB_TRANSFER;
                it.kptbHistory.push({ at: '10:00 ' + s.pay, userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Cập nhật chi trả', note: 'Ngày chi trả ' + s.pay + '; số tiền ' + fmt(s.amount) + ' đồng.' });
            }
            if (s.sq) {
                it.treasuryForfeitDate = s.sq; it.treasuryVoucherNo = 'SQ-' + s.code.slice(-3) + '/2026'; it.treasuryAmount = s.amount; it.payoutAmountReal = 0;
                it.treasuryReason = 'Người yêu cầu bồi thường đã quá thời hạn 03 năm kể từ ngày nhận thông báo chi trả nhưng không đến nhận tiền bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.';
                it.treasuryFile = [{ name: 'Giấy nộp tiền vào ngân sách nhà nước', file: { name: 'Giay_nop_NSNN_' + s.code + '.pdf' } }];
                it.kptbHistory.push({ at: '15:00 ' + s.sq, userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Sung quỹ nhà nước', note: 'Số chứng từ ' + it.treasuryVoucherNo + '.' });
            }
            proposalsList.push(it); n++;
        });
        return n;
    }
    function sanitize() {
        var n = 0;
        n += seedKpux();
        proposalsList.forEach(function (p) { if (p && !kpIsAdv(p) && setLatest(p)) n++; });
        // Bỏ luồng "Chờ lập đề nghị": bản ghi Tạm ứng tạo tại Tạo QĐ tạm ứng, bản ghi Chi trả tạo tự động / Tạo thông báo chi trả
        var i = KP_PENDING_STATES.indexOf('Chờ lập đề nghị'); if (i >= 0) KP_PENDING_STATES.splice(i, 1);
        var keep = proposalsList.filter(function (p) { return !p || p.status !== 'Chờ lập đề nghị'; });
        if (keep.length !== proposalsList.length) { proposalsList = keep; n++; }
        proposalsList.forEach(function (p) {
            if (p && kpIsAdv(p) && p.signMethod === KP_SIGN_OUTSIDE && !p.qdtu && !p.signedFile && ['Chờ chi trả', 'Hoàn thành', 'Sung quỹ nhà nước'].indexOf(kpNormStatus(p.status)) >= 0) {
                p.signedFile = 'QD_tam_ung_' + p.code + '_ky_ngoai.pdf';
                if (!p.docNo) p.docNo = '96/QĐ-STC';
                if (!p.docDate) p.docDate = '10/10/2026';
                n++;
            }
        });
        if (n) saveProposalsToLocal();
    }

    // ================= 3. Xem chi tiết =================
    var payId = null;      // bản ghi đang ở chế độ Cập nhật chi trả
    var ntEditId = null;   // bản ghi đang sửa khối thông báo
    var NT_STATES = ['Chờ chi trả', 'Hoàn thành', 'Sung quỹ nhà nước', 'Chờ thu hồi', 'Đã thu hồi'];
    function noticeVisible(item) {
        if (!item || kpIsAdv(item)) return false;
        var st = kpNormStatus(item.status);
        return NT_STATES.indexOf(st) >= 0 || (st === 'Đã hủy' && !!item.noticeReceivedDate);
    }
    function noticeDocs(item) { return item.noticeFiles || item.noticeProofFile || []; }
    function deadlineText(d) {
        var p = parseDateViGlobal(d); if (!p) return '';
        return formatDateViGlobal(addYearsToDate(p, 3));
    }
    function headBtn(cls, icon, label, js) { return '<button type="button" class="btn ' + cls + ' btn-sm" onclick="' + js + '"><i class="fa-solid ' + icon + '"></i> ' + label + '</button>'; }
    // Danh sách các lần thông báo nhận tiền; dữ liệu cũ (01 ngày nhận thông báo) quy đổi thành Lần 1
    var ntIdx = -1;        // -1: thêm mới; >= 0: sửa lần thông báo tương ứng
    function noticeList(item) {
        if (Array.isArray(item.noticeList)) return item.noticeList;
        if (!item.noticeReceivedDate) return [];
        return [{ no: (item.kptbNotice || {}).docNo || '', date: item.noticeReceivedDate, note: item.noticeNote || '', files: noticeDocs(item) }];
    }
    // Dữ liệu "latest" = lần thông báo gần nhất (Số thông báo, Ngày thông báo, Hạn nhận tiền); nhãn Quá hạn 3 năm, cột Hạn nhận/Sung quỹ,
    // điều kiện Sung quỹ đọc Ngày thông báo latest (noticeReceivedDate = noticeLatest.date)
    function setLatest(item) {
        var list = noticeList(item); var last = list[list.length - 1];
        if (!last) { if (item.noticeLatest) { delete item.noticeLatest; return true; } return false; }
        var lt = { lan: list.length, no: last.no || '', date: last.date, deadline: deadlineText(last.date) };
        var ch = JSON.stringify(item.noticeLatest || null) !== JSON.stringify(lt) || item.noticeReceivedDate !== last.date;
        item.noticeLatest = lt; item.noticeReceivedDate = last.date;
        return ch;
    }
    function docNames(list) { return kpdtDocsNorm(list).map(function (d) { return (d.file && d.file.name) || d.name; }).filter(Boolean); }
    function noticeCanEdit(item) { return kpRole() !== 'lanh-dao' && kpNormStatus(item.status) === 'Chờ chi trả' && !ffId; }
    function noticeCardHtml(item) {
        var canEdit = noticeCanEdit(item);
        var editing = canEdit && ntEditId === item.id;
        var list = noticeList(item);
        var title = 'Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường';
        var btns = editing
            ? headBtn('btn-secondary', 'fa-xmark', 'Hủy', 'kpuxNoticeCancel()') + headBtn('btn-primary', 'fa-floppy-disk', 'Lưu thông báo', "kpuxNoticeSave('" + item.id + "')")
            : (canEdit ? headBtn('btn-outline-primary', 'fa-plus', 'Thêm thông báo', "kpuxNoticeEdit('" + item.id + "',-1)") : '');
        var rows = list.map(function (n, i) {
            return '<tr><td class="c">' + (i + 1) + '</td><td>' + esc(n.no || '-') + '</td><td class="c">' + esc(n.date || '-') + '</td><td class="c">' + esc(deadlineText(n.date) || '-') + '</td><td>' + esc(n.note || '-') + '</td><td>' + (esc(docNames(n.files).join(', ')) || '-') + '</td>'
                + (canEdit && !editing ? '<td class="c"><button type="button" class="ib" data-admin-icon-normalized="1" title="Sửa thông báo" onclick="kpuxNoticeEdit(\'' + item.id + '\',' + i + ')"><i class="fa-solid fa-pen-to-square"></i></button></td>' : (canEdit ? '<td class="c">-</td>' : '')) + '</tr>';
        }).join('');
        var table = list.length
            ? '<div class="kpdt-docs-wrap"><table class="kpdt-docs"><thead><tr><th class="c" style="width:60px;">Lần</th><th>Số thông báo</th><th class="c" style="width:120px;">Ngày thông báo</th><th class="c" style="width:140px;">Thời hạn nhận tiền</th><th>Ghi chú</th><th>Tài liệu kèm theo</th>' + (canEdit ? '<th class="c" style="width:80px;">Thao tác</th>' : '') + '</tr></thead><tbody>' + rows + '</tbody></table></div>'
            : '<div style="color:#64748b;">Chưa có thông báo.</div>';
        var last = list[list.length - 1] || {};
        var body = '<div class="kpdt-grid">' + kpdtFld('Số thông báo gần nhất', esc(last.no || '')) + kpdtFld('Ngày thông báo gần nhất', esc(last.date || '')) + kpdtFld('Hạn nhận tiền bồi thường', esc(deadlineText(last.date))) + kpdtFld('Số lần thông báo', String(list.length)) + '</div>'
            + '<div style="margin-top:12px;">' + table + '</div>';
        if (editing) {
            var cur = ntIdx >= 0 ? (list[ntIdx] || {}) : {};
            var lan = ntIdx >= 0 ? ntIdx + 1 : list.length + 1;
            body += '<div class="kpux-form" style="margin-top:14px; padding-top:12px; border-top:1px dashed #e2e8f0;">'
                + '<div class="kpux-sub">' + (ntIdx >= 0 ? 'Cập nhật thông báo lần ' + lan : 'Thêm mới thông báo lần ' + lan) + '</div>'
                + '<div class="kpux-f"><span class="form-label">Lần thông báo</span><div class="kpux-ro" id="kpuxNtTimes">' + lan + '</div></div>'
                + fld('kpuxNtNo', 'Số thông báo', false, cur.no || '', 'maxlength="100" placeholder="Nhập số thông báo..."')
                + '<div class="kpux-f"><label class="form-label" for="kpuxNtDate">Ngày thông báo<span class="kpux-req">*</span></label><input type="text" class="form-control" id="kpuxNtDate" placeholder="dd/mm/yyyy" value="' + esc(cur.date || (ntIdx >= 0 ? '' : todayText())) + '" oninput="kpuxNtPreview()" onchange="kpuxNtPreview()"><div class="kpux-err" id="kpuxNtDateErr">Đây là trường bắt buộc</div></div>'
                + '<div class="kpux-f"><span class="form-label">Thời hạn nhận tiền</span><div class="kpux-ro" id="kpuxNtDeadline">' + esc(deadlineText(cur.date || (ntIdx >= 0 ? '' : todayText())) || '-') + '</div></div>'
                + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxNtNote">Ghi chú thông báo</label><textarea class="form-control" id="kpuxNtNote" rows="2" maxlength="1000" placeholder="Nhập hình thức gửi, kết quả liên hệ...">' + esc(cur.note || '') + '</textarea></div>'
                + '<div class="kpux-f kpux-full" id="kpuxNtTlkt"></div></div>';
        }
        body += '<div class="kpdt-hint">Thời hạn nhận tiền: 03 năm kể từ ngày thông báo; hạn nhận tiền bồi thường của bản ghi tính theo lần thông báo gần nhất.</div>';
        return '<div class="kpdt-card" id="kpuxNoticeCard"><div class="kpdt-card-head"><i class="fa-solid fa-bell"></i> ' + title
            + (btns ? '<span class="kpux-head-btns" onclick="event.stopPropagation();">' + btns + '</span>' : '') + '</div><div class="kpdt-card-body">' + body + '</div></div>';
    }
    function mountNt(item) {
        if (ntEditId !== item.id || !el('kpuxNtTlkt')) return;
        var cur = ntIdx >= 0 ? (noticeList(item)[ntIdx] || {}) : {};
        var rows = kpdtDocsNorm(cur.files || []).map(function (d) { return { name: d.name, file: d.file && d.file.name ? d.file : null }; });
        if (typeof tlktMount === 'function') tlktMount('kpuxNt', 'kpuxNtTlkt', { required: false, rows: rows, secClass: '', titleClass: 'form-label', noLeader: true });
        if (window.flatpickr) flatpickr('#kpuxNtDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date(), onChange: function () { window.kpuxNtPreview(); } });
    }
    // Chỉ vẽ lại khối thông báo (giữ nguyên dữ liệu đang nhập ở khối Kết quả chi trả thực tế)
    function refreshNotice(item) {
        var c = el('kpuxNoticeCard'); if (!c) return;
        c.outerHTML = noticeCardHtml(item);
        var n = el('kpuxNoticeCard'); makeToggle(n);
        mountNt(item);
    }
    // Khối thu gọn / mở rộng: click tiêu đề
    function makeToggle(card) {
        var head = card.querySelector(':scope > .kpdt-card-head'); if (!head) return;
        if (!head.classList.contains('kpdt-toggle')) {
            head.classList.add('kpdt-toggle');
            head.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-chevron-down kpdt-chev"></i>');
            head.addEventListener('click', function () { card.classList.toggle('collapsed'); });
        }
    }
    function postRender(item) {
        var body = el('kpdtBody'); if (!body) return;
        // Bỏ nút ở góc trên bên phải (Đóng chỉ ở Footer)
        var hb = document.querySelector('body #kpdtPanel .kpdt-head-right button'); if (hb) hb.remove();
        var hs = el('kpdtHeadStatus'); if (hs && getTreasuryInfo(item).isEligible && !hs.querySelector('.kpux-overdue')) hs.insertAdjacentHTML('beforeend', overdueHtml());
        // Khối Theo dõi hạn nhận -> khối Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường
        Array.prototype.slice.call(body.querySelectorAll('.kpdt-card')).forEach(function (c) {
            var h = c.querySelector('.kpdt-card-head');
            if (h && /Theo dõi hạn nhận kinh phí/i.test(h.textContent)) {
                if (noticeVisible(item)) c.outerHTML = noticeCardHtml(item); else c.remove();
            }
        });
        // Khối chỉ chứa bảng Tài liệu kèm theo mà không có dữ liệu: ẩn cả khối
        Array.prototype.slice.call(body.querySelectorAll('.kpdt-card')).forEach(function (c) {
            var b = c.querySelector(':scope > .kpdt-card-body');
            if (b && !b.textContent.trim() && !b.querySelector('input,textarea,select,table,img')) c.remove();
        });
        Array.prototype.slice.call(body.querySelectorAll(':scope > .kpdt-card')).forEach(function (c) { if (c.id !== 'kpdtHistCard') makeToggle(c); });
        mountNt(item);
        extraCards(item, body);
        if (payId === item.id) renderPayMode(item, body);
        if (ffId === item.id) renderFfMode(item, body);
    }

    // ================= 4. Cập nhật chi trả =================
    function prefill(item) {
        if (kpIsAdv(item)) {
            var f = kpdtAdvData(item);
            return { name: f.recName, address: f.recAddress, method: /tiền mặt/i.test(f.payMethod || '') ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản', accHolder: f.accHolder, account: f.account, bank: f.bank, branch: f.branch };
        }
        if (isTb(item)) {
            var dec = item.kptbDec || {}, po = dec.payout || {}, r = dec.recipient || {};
            return { name: r.name || item.nycName, address: r.address || item.payoutRecAddress || '', method: kptbMethod(item), accHolder: po.accHolder || r.name || '', account: po.account || r.account || '', bank: po.bank || r.bank || '', branch: po.branch || r.branch || '' };
        }
        var c = (typeof mockClaims !== 'undefined' && mockClaims.find(function (x) { return x.code === item.ycbtCode; })) || {};
        return { name: item.payoutRecName || item.nycName, address: item.payoutRecAddress || c.address || '', method: /tiền mặt/i.test(item.payoutMethod || '') ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản', accHolder: item.payoutBankUser || '', account: item.payoutBankAccount || '', bank: item.payoutBankName || '', branch: item.payoutBankBranch || '' };
    }
    function fld(id, label, req, val, extra, cls) {
        return '<div class="kpux-f' + (cls ? ' ' + cls : '') + '"><label class="form-label" for="' + id + '">' + label + (req ? '<span class="kpux-req">*</span>' : '') + '</label>'
            + '<input type="text" class="form-control" id="' + id + '" value="' + esc(val || '') + '" ' + (extra || '') + ' oninput="kpuxClr(this)"><div class="kpux-err" id="' + id + 'Err">Đây là trường bắt buộc</div></div>';
    }
    function renderPayMode(item, body) {
        // Các khối phía trên thu gọn (giữ nguyên nội dung như Xem chi tiết); khối thông báo mở để thao tác ngay tại màn này
        Array.prototype.forEach.call(body.querySelectorAll(':scope > .kpdt-card'), function (c) { if (c.id !== 'kpuxNoticeCard') c.classList.add('collapsed'); });
        var pf = prefill(item);
        var cash = pf.method === 'Nhận tiền mặt';
        var html = '<div class="kpdt-card kpux-pay" id="kpuxPayCard"><div class="kpdt-card-head"><i class="fa-solid fa-cash-register"></i> Thông tin kết quả chi trả thực tế</div><div class="kpdt-card-body"><div class="kpux-form">'
            + fld('kpuxPayDate', 'Ngày thực hiện chi trả', true, todayText(), 'placeholder="dd/mm/yyyy"')
            + fld('kpuxPayAmount', 'Số tiền thực tế chi trả (VNĐ)', true, fmt(item.amount), 'maxlength="20" style="text-align:right;" oninput="formatNumberInput(this); kpuxClr(this)" placeholder="Nhập số tiền thực tế chi trả..."')
            + '<div class="kpux-f kpux-span2"><span class="form-label">Phương thức chi trả thực tế<span class="kpux-req">*</span></span><div class="kpux-radios">'
            + '<label><input type="radio" name="kpuxPayMethod" value="Nhận qua chuyển khoản"' + (cash ? '' : ' checked') + ' onchange="kpuxPayMethod(this.value)"> Nhận qua chuyển khoản</label>'
            + '<label><input type="radio" name="kpuxPayMethod" value="Nhận tiền mặt"' + (cash ? ' checked' : '') + ' onchange="kpuxPayMethod(this.value)"> Nhận tiền mặt</label></div></div>'
            + '<div class="kpux-sub">Thông tin người nhận chi trả</div>'
            + fld('kpuxPayRecName', 'Họ và tên người nhận', true, pf.name, 'maxlength="255" placeholder="Nhập họ tên người nhận..."')
            + fld('kpuxPayRecAddress', 'Địa chỉ người nhận', true, pf.address, 'maxlength="500" placeholder="Nhập địa chỉ..."', 'kpux-span2')
            + '<div class="kpux-f" aria-hidden="true"></div>'
            + '<div id="kpuxPayBank" style="display:' + (cash ? 'none' : 'contents') + ';">'
            + fld('kpuxPayAccount', 'Số tài khoản chuyển', true, pf.account, 'maxlength="30" placeholder="Nhập số tài khoản chuyển..."')
            + fld('kpuxPayAccHolder', 'Tên chủ tài khoản nhận', true, pf.accHolder, 'maxlength="255" placeholder="Nhập tên chủ tài khoản nhận..."')
            + fld('kpuxPayBankName', 'Tên ngân hàng nhận', true, pf.bank, 'maxlength="255" placeholder="Nhập tên ngân hàng nhận..."')
            + fld('kpuxPayBranch', 'Chi nhánh ngân hàng nhận', false, pf.branch, 'maxlength="255" placeholder="Nhập chi nhánh ngân hàng nhận..."')
            + '</div>'
            + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxPayNote">Ý kiến / Nội dung thực hiện chi trả</label><textarea class="form-control" id="kpuxPayNote" rows="2" maxlength="1000" placeholder="Nhập ghi chú chi tiết quá trình chi trả (nếu có)..."></textarea></div>'
            + '<div class="kpux-f kpux-full" id="kpuxPayTlkt"></div>'
            + '</div></div></div>';
        var hist = el('kpdtHistCard');
        if (hist && hist.parentNode === body) hist.insertAdjacentHTML('beforebegin', html); else body.insertAdjacentHTML('beforeend', html);
        if (typeof tlktMount === 'function') tlktMount('kpuxPay', 'kpuxPayTlkt', { required: false, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
        if (window.flatpickr) flatpickr('#kpuxPayDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date() });
        // Tiêu đề, Footer của chế độ Cập nhật chi trả
        el('kpdtTitle').innerHTML = '<i class="fa-solid fa-hand-holding-dollar"></i> CẬP NHẬT CHI TRẢ: ' + esc(item.code);
        el('kpdtFoot').innerHTML = '<button type="button" class="btn btn-secondary" onclick="kpuxPayCancel()"><i class="fa-solid fa-xmark"></i> Hủy</button>'
            + '<button type="button" class="btn btn-success" onclick="kpuxPaySave()"><i class="fa-solid fa-circle-check"></i> Hoàn thành chi trả</button>';
    }
    function focusPay() {
        var c = el('kpuxPayCard'); if (!c) return;
        c.scrollIntoView({ block: 'start' });
        // Focus vào khối (tiêu đề khối), không mở lịch chọn ngày
        var h = c.querySelector('.kpdt-card-head'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
    }
    window.kpuxOpenPay = function (id) {
        var item = kpdtFind(id); if (!item) return;
        if (kpNormStatus(item.status) !== 'Chờ chi trả') { showToast('Chỉ Cập nhật chi trả với bản ghi Chờ chi trả.', 'warning'); return; }
        if (getTreasuryInfo(item).isEligible) { showToast('Khoản chi đã quá hạn 03 năm kể từ ngày nhận thông báo, chỉ được thực hiện Sung quỹ nhà nước.', 'warning'); return; }
        if (typeof kptbCloseView === 'function') kptbCloseView();
        payId = item.id; ntEditId = null; ffId = null; rcEditId = null;
        kpdtOpen(item.id, { kpuxKeep: true });
        setTimeout(focusPay, 30);
    };
    window.kpuxPayCancel = function () { var id = payId; payId = null; var it = kpdtFind(id); if (it) { kpdtRender(it); window.scrollTo(0, 0); } };
    window.kpuxClr = function (inp) { inp.classList.remove('is-invalid'); var e = el(inp.id + 'Err'); if (e) e.classList.remove('on'); };
    window.kpuxPayMethod = function (v) { var b = el('kpuxPayBank'); if (b) b.style.display = v === 'Nhận tiền mặt' ? 'none' : 'contents'; };
    function mark(id, msg) { var i = el(id), e = el(id + 'Err'); if (i) i.classList.add('is-invalid'); if (e) { e.textContent = msg || 'Đây là trường bắt buộc'; e.classList.add('on'); } }
    window.kpuxPaySave = function () {
        var item = kpdtFind(payId); if (!item) return;
        // Đang nhập thông báo tại màn này: lưu thông báo cùng lúc với kết quả chi trả
        if (ntEditId === item.id && el('kpuxNtDate')) { if (!saveNotice(item)) return; refreshNotice(item); }
        var v = function (id) { return el(id) ? el(id).value.trim() : ''; };
        var m = document.querySelector('input[name="kpuxPayMethod"]:checked');
        var method = m ? m.value : 'Nhận qua chuyển khoản';
        var cash = method === 'Nhận tiền mặt';
        var req = ['kpuxPayDate', 'kpuxPayAmount', 'kpuxPayRecName', 'kpuxPayRecAddress'].concat(cash ? [] : ['kpuxPayAccount', 'kpuxPayAccHolder', 'kpuxPayBankName']);
        var first = null;
        req.forEach(function (id) { if (!v(id)) { mark(id); if (!first) first = id; } });
        var d = parseDateViGlobal(v('kpuxPayDate'));
        if (v('kpuxPayDate') && (!d || d > today())) { mark('kpuxPayDate', d ? 'Ngày chi trả không được lớn hơn ngày hiện tại' : 'Ngày không hợp lệ, định dạng dd/mm/yyyy'); if (!first) first = 'kpuxPayDate'; }
        var approved = Number(item.amount) || 0;
        var amt = parseFloat(v('kpuxPayAmount').replace(/\D/g, '')) || 0;
        if (v('kpuxPayAmount') && (amt <= 0 || amt > approved)) { mark('kpuxPayAmount', amt <= 0 ? 'Số tiền thực tế chi trả phải lớn hơn 0' : 'Số tiền thực tế chi trả không được vượt quá số tiền đã duyệt (' + fmt(approved) + ' đồng)'); if (!first) first = 'kpuxPayAmount'; }
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxPay') : true;
        if (first) { el(first).focus(); return; }
        if (!tlOk) return;
        var files = typeof tlktGet === 'function' ? tlktGet('kpuxPay') : [];
        var amount = amt;
        var data = { payDate: v('kpuxPayDate'), method: method, recName: v('kpuxPayRecName'), address: v('kpuxPayRecAddress'), account: cash ? '' : v('kpuxPayAccount'), accHolder: cash ? '' : v('kpuxPayAccHolder'), bank: cash ? '' : v('kpuxPayBankName'), branch: cash ? '' : v('kpuxPayBranch'), note: v('kpuxPayNote') };
        var detail = cash ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản (STK: <strong>' + esc(data.account) + '</strong> - ' + esc(data.bank) + ', Chủ TK: <strong>' + esc(data.accHolder) + '</strong>)';
        var html = '<div style="text-align:left; font-size:13.5px; color:#334155;"><div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:12px; margin-bottom:12px; line-height:1.6;">'
            + '<div>• <strong>Mã kinh phí:</strong> ' + esc(item.code) + '</div><div>• <strong>Họ và tên người nhận:</strong> ' + esc(data.recName) + '</div>'
            + '<div>• <strong>Phương thức chi trả:</strong> ' + detail + '</div><div>• <strong>Ngày chi trả:</strong> ' + esc(data.payDate) + '</div>'
            + '<div>• <strong>Số tiền thực tế chi trả:</strong> <span style="font-weight:700;">' + fmt(amount) + ' VNĐ</span> (' + esc(docTienBangChu(amount)) + ')</div></div>'
            + '<p style="margin:0;">Bạn có chắc chắn muốn xác nhận hoàn thành chi trả số tiền <strong>' + fmt(amount) + ' VNĐ</strong> cho người nhận <strong>' + esc(data.recName) + '</strong> không? Sau khi xác nhận, bản ghi chuyển trạng thái <strong>Hoàn thành</strong>.</p></div>';
        showConfirmModal(html, function () { applyPay(item, data, amount, files); }, 'Xác nhận hoàn thành chi trả kinh phí bồi thường');
    };
    function applyPay(item, data, amount, files) {
        var cash = data.method === 'Nhận tiền mặt';
        item.status = 'Hoàn thành';
        item.payoutDate = data.payDate; item.payoutAmountReal = amount; item.payoutMethod = data.method;
        item.payoutRecName = data.recName; item.payoutRecAddress = data.address; item.payoutNote = data.note;
        item.payoutBankAccount = data.account; item.payoutBankUser = data.accHolder; item.payoutBankName = data.bank; item.payoutBankBranch = data.branch;
        item.payoutReceiptNo = '';
        item.payoutFiles = files; item.payoutFile = files.map(function (f) { return (f.file && f.file.name) || f.name; }).join(', ');
        var note = 'Ngày chi trả ' + data.payDate + '; số tiền ' + fmt(amount) + ' đồng; ' + data.method + '.';
        if (isTb(item)) {
            var me = kptbMe();
            item.kptbPayment = cash
                ? { method: KPTB_CASH, recName: data.recName, recIdNo: '', address: data.address, payDate: data.payDate, amount: amount, files: files, note: data.note, at: kptbNow(), by: me }
                : { method: KPTB_TRANSFER, accHolder: data.accHolder, account: data.account, bank: data.bank, branch: data.branch, recName: data.recName, address: data.address, payDate: data.payDate, amount: amount, files: files, note: data.note, at: kptbNow(), by: me };
            if (me) item.user = kptbUserName(me);
            kptbHist(item, 'Cập nhật chi trả', note);
        } else if (isQd(item)) {
            qdtuHist(item, 'Cập nhật chi trả', note);
        }
        saveProposalsToLocal();
        payId = null;
        renderProposalsTable();
        if (typeof updateBudgetStats === 'function') updateBudgetStats();
        window.scrollTo(0, 0);
        showToast('Cập nhật kết quả chi trả kinh phí bồi thường thành công! Bản ghi ' + item.code + ' chuyển Hoàn thành.', 'success');
    }

    // ================= 5. Thêm / Cập nhật thông báo (khối Thông tin thông báo chi trả ...): màn chi tiết và màn Cập nhật chi trả =================
    window.kpuxNoticeEdit = function (id, idx) {
        var it = kpdtFind(id); if (!it || !noticeCanEdit(it)) return;
        ntEditId = id; ntIdx = typeof idx === 'number' ? idx : -1;
        refreshNotice(it);
        var c = el('kpuxNoticeCard'); if (c) { c.classList.remove('collapsed'); c.scrollIntoView({ block: 'center' }); }
    };
    window.kpuxNoticeCancel = function () { var it = kpdtFind(ntEditId); ntEditId = null; ntIdx = -1; if (it) refreshNotice(it); };
    window.kpuxNtPreview = function () { var i = el('kpuxNtDate'), o = el('kpuxNtDeadline'); if (i && o) { o.textContent = deadlineText(i.value.trim()) || '-'; window.kpuxClr(i); } };
    // Lưu lần thông báo đang nhập; trả về false nếu dữ liệu chưa hợp lệ
    function saveNotice(item) {
        var dv = el('kpuxNtDate') ? el('kpuxNtDate').value.trim() : '';
        var d = parseDateViGlobal(dv);
        var bad = !dv ? 'Đây là trường bắt buộc' : (!d ? 'Ngày không hợp lệ, định dạng dd/mm/yyyy' : (d > today() ? 'Ngày thông báo không được lớn hơn ngày hiện tại' : ''));
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxNt') : true;
        if (bad) { mark('kpuxNtDate', bad); el('kpuxNtDate').focus(); return false; }
        if (!tlOk) return false;
        var list = noticeList(item).slice();
        var entry = { no: el('kpuxNtNo') ? el('kpuxNtNo').value.trim() : '', date: dv, note: el('kpuxNtNote') ? el('kpuxNtNote').value.trim() : '', files: typeof tlktGet === 'function' ? tlktGet('kpuxNt') : [] };
        var isNew = ntIdx < 0;
        if (isNew) list.push(entry); else list[ntIdx] = entry;
        var lan = isNew ? list.length : ntIdx + 1;
        item.noticeList = list;
        var last = list[list.length - 1];
        item.noticeReceivedDate = last.date; item.noticeNote = last.note; item.noticeFiles = last.files;
        setLatest(item);
        var note = 'Lần ' + lan + (entry.no ? '; số ' + entry.no : '') + '; ngày thông báo ' + dv + '; thời hạn nhận tiền ' + deadlineText(dv) + '.';
        if (isTb(item)) kptbHist(item, (isNew ? 'Thêm thông báo chi trả' : 'Cập nhật thông báo chi trả'), note);
        saveProposalsToLocal();
        ntEditId = null; ntIdx = -1;
        return true;
    }
    window.kpuxNoticeSave = function (id) {
        var item = kpdtFind(id); if (!item) return;
        if (!saveNotice(item)) return;
        if (payId) refreshNotice(item); else renderProposalsTable();
        showToast('Lưu thông tin thông báo chi trả tiền bồi thường thành công!', 'success');
    };

    // ================= 6. Sung quỹ nhà nước (dạng màn hình chi tiết, mọi Loại kinh phí) =================
    var ffId = null;
    var FF_REASON = 'Người yêu cầu bồi thường đã quá thời hạn 03 năm kể từ ngày nhận thông báo chi trả nhưng không đến nhận tiền bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.';
    // Khối Thông tin Sung quỹ nhà nước (chỉ xem) cho Loại Tạm ứng kinh phí: cùng cấu trúc khối tại kpdtPayBody
    function sqCardHtml(item) {
        var g = '<div class="kpdt-grid">' + kpdtFld('Số chứng từ / quyết định sung quỹ', esc(item.treasuryVoucherNo)) + kpdtFld('Ngày sung quỹ', esc(item.treasuryForfeitDate))
            + kpdtFld('Số tiền sung quỹ (VNĐ)', item.treasuryAmount != null ? fmt(item.treasuryAmount) : '') + kpdtFld('Căn cứ / lý do sung quỹ', esc(item.treasuryReason), true)
            + '<div class="kpdt-full">' + kpdtDocsHtml(item.treasuryFile || []) + '</div></div>';
        return kpdtCard('fa-building-columns', 'Thông tin Sung quỹ nhà nước', g);
    }
    function renderFfMode(item, body) {
        Array.prototype.forEach.call(body.querySelectorAll(':scope > .kpdt-card'), function (c) { c.classList.add('collapsed'); });
        var info = getTreasuryInfo(item);
        var html = '<div class="kpdt-card kpux-pay" id="kpuxFfCard"><div class="kpdt-card-head"><i class="fa-solid fa-building-columns"></i> Thông tin sung quỹ Nhà nước</div><div class="kpdt-card-body"><div class="kpux-form">'
            + '<div class="kpux-f"><span class="form-label">Ngày người yêu cầu nhận thông báo</span><div class="kpux-ro">' + esc(item.noticeReceivedDate || '-') + '</div></div>'
            + '<div class="kpux-f"><span class="form-label">Hạn nhận tiền bồi thường</span><div class="kpux-ro">' + esc(info.deadlineText || '-') + '</div></div>'
            + '<div class="kpux-f kpux-span2"><span class="form-label">Số tiền sung quỹ (VNĐ)</span><div class="kpux-ro">' + fmt(info.unpaid) + '</div></div>'
            + fld('kpuxFfNo', 'Số chứng từ / quyết định sung quỹ', true, '', 'maxlength="100" placeholder="Nhập số chứng từ..."')
            + fld('kpuxFfDate', 'Ngày sung quỹ', true, todayText(), 'placeholder="dd/mm/yyyy"')
            + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxFfReason">Căn cứ / lý do sung quỹ<span class="kpux-req">*</span></label><textarea class="form-control" id="kpuxFfReason" rows="3" maxlength="2000" placeholder="Nhập căn cứ, lý do sung quỹ..." oninput="kpuxClr(this)">' + esc(FF_REASON) + '</textarea><div class="kpux-err" id="kpuxFfReasonErr">Đây là trường bắt buộc</div></div>'
            + '<div class="kpux-f kpux-full" id="kpuxFfTlkt"></div>'
            + '</div></div></div>';
        var hist = el('kpdtHistCard');
        if (hist && hist.parentNode === body) hist.insertAdjacentHTML('beforebegin', html); else body.insertAdjacentHTML('beforeend', html);
        if (typeof tlktMount === 'function') tlktMount('kpuxFf', 'kpuxFfTlkt', { required: false, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
        if (window.flatpickr) flatpickr('#kpuxFfDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date() });
        el('kpdtTitle').innerHTML = '<i class="fa-solid fa-building-columns"></i> CẬP NHẬT SUNG QUỸ NHÀ NƯỚC: ' + esc(item.code);
        el('kpdtFoot').innerHTML = '<button type="button" class="btn btn-secondary" onclick="kpuxFfCancel()"><i class="fa-solid fa-xmark"></i> Hủy</button>'
            + '<button type="button" class="btn btn-danger" onclick="kpuxFfSave()"><i class="fa-solid fa-building-columns"></i> Hoàn thành sung quỹ</button>';
    }
    window.kpuxOpenForfeit = function (id) {
        var item = kpdtFind(id); if (!item) return;
        if (!getTreasuryInfo(item).isEligible) { showToast('Khoản này chưa đủ điều kiện sung quỹ (chưa quá thời hạn 03 năm kể từ ngày nhận thông báo).', 'warning'); return; }
        if (typeof kptbCloseView === 'function') kptbCloseView();
        ffId = item.id; payId = null; ntEditId = null; rcEditId = null;
        kpdtOpen(item.id, { kpuxKeep: true });
        setTimeout(function () { var c = el('kpuxFfCard'); if (!c) return; c.scrollIntoView({ block: 'start' }); var h = c.querySelector('.kpdt-card-head'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } } }, 30);
    };
    window.kpuxFfCancel = function () { var it = kpdtFind(ffId); ffId = null; if (it) { kpdtRender(it); window.scrollTo(0, 0); } };
    window.kpuxFfSave = function () {
        var item = kpdtFind(ffId); if (!item) return;
        var info = getTreasuryInfo(item);
        if (!info.isEligible) { showToast('Khoản chi này không còn đủ điều kiện sung quỹ.', 'warning'); return; }
        var v = function (id) { return el(id) ? el(id).value.trim() : ''; };
        var first = null;
        ['kpuxFfNo', 'kpuxFfDate', 'kpuxFfReason'].forEach(function (id) { if (!v(id)) { mark(id); if (!first) first = id; } });
        var d = parseDateViGlobal(v('kpuxFfDate'));
        if (v('kpuxFfDate') && (!d || d > today())) { mark('kpuxFfDate', d ? 'Ngày sung quỹ không được lớn hơn ngày hiện tại' : 'Ngày không hợp lệ, định dạng dd/mm/yyyy'); if (!first) first = 'kpuxFfDate'; }
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxFf') : true;
        if (first) { el(first).focus(); return; }
        if (!tlOk) return;
        var files = typeof tlktGet === 'function' ? tlktGet('kpuxFf') : [];
        var no = v('kpuxFfNo'), dt = v('kpuxFfDate'), reason = v('kpuxFfReason');
        showConfirmModal('Xác nhận hoàn thành thủ tục nộp toàn bộ số tiền ' + fmt(info.unpaid) + ' VNĐ của bản ghi ' + esc(item.code) + ' vào ngân sách nhà nước? Sau khi xác nhận, bản ghi chuyển trạng thái Sung quỹ nhà nước.', function () {
            item.status = 'Sung quỹ nhà nước';
            item.treasuryForfeitDate = dt; item.treasuryVoucherNo = no; item.treasuryAmount = info.unpaid; item.treasuryReason = reason; item.treasuryFile = files;
            item.payoutAmountReal = Math.max(0, (Number(item.amount) || 0) - info.unpaid);
            var note = 'Số chứng từ ' + no + '; ngày ' + dt + '; số tiền ' + fmt(info.unpaid) + ' đồng.';
            if (isTb(item)) kptbHist(item, 'Sung quỹ nhà nước', note); else if (isQd(item)) qdtuHist(item, 'Sung quỹ nhà nước', note);
            saveProposalsToLocal();
            ffId = null;
            renderProposalsTable();
            if (typeof updateBudgetStats === 'function') updateBudgetStats();
            window.scrollTo(0, 0);
            showToast('Cập nhật sung quỹ nhà nước thành công cho bản ghi ' + item.code + '!', 'success');
        }, 'Xác nhận hoàn thành thủ tục sung quỹ nhà nước');
    };

    // ================= 7. Khối Thu hồi kinh phí + màn Cập nhật kết quả thu hồi (Chờ thu hồi) =================
    var rcEditId = null;   // bản ghi đang ở chế độ Cập nhật kết quả thu hồi
    function rcBasis(item) { var r = item.recovery || {}; var b = item.statusChangeBasis || item.statusBasis || {}; return { no: r.basisDecisionNo || b.decisionNo || '', date: r.basisDecisionDate || b.decisionDate || '', type: b.decisionType || '' }; }
    function rcData(item) {
        var r = item.recovery || {};
        var paid = Number(item.payoutAmountReal) || Number((item.kptbPayment || {}).amount) || 0;
        var need = r.amountToRecover != null ? Number(r.amountToRecover) : paid;
        var got = Number(r.amountRecovered) || 0;
        // Các lần thu hồi: dữ liệu cũ (01 lần ghi nhận) quy đổi thành Lần 1
        var hist = Array.isArray(r.history) ? r.history : (got > 0 ? [{ date: r.recordDate || '', amount: got, method: r.method || '', voucherNo: r.voucherNo || '', note: r.note || '', files: r.files || [] }] : []);
        return { need: need, got: got, remain: Math.max(0, need - got), date: r.recordDate || '', note: r.note || '', files: r.files || [], hist: hist };
    }
    function rcVisible(item) { return !!item.recovery || kpNormStatus(item.status) === 'Chờ thu hồi'; }
    function rcCardHtml(item) {
        var d = rcData(item), b = rcBasis(item);
        var editing = rcEditId === item.id;
        var basis = b.no ? '<a href="javascript:void(0)" style="color:var(--primary-light); text-decoration:underline;" onclick="showToast(\'Giả lập mở chi tiết Quyết định ' + esc(b.no) + '\', \'info\')">' + esc(b.no) + (b.date ? ' ngày ' + esc(b.date) : '') + '</a>' + (b.type ? '<div class="kpdt-words" style="font-style:normal;">' + esc(b.type) + '</div>' : '') : '';
        var view = '<div class="kpdt-grid">' + kpdtFld('Căn cứ thu hồi', basis) + kpdtFld('Số tiền phải thu hồi (VNĐ)', fmt(d.need)) + kpdtFld('Số tiền đã thu hồi lũy kế (VNĐ)', fmt(d.got)) + kpdtFld('Số tiền còn phải thu hồi (VNĐ)', fmt(d.remain)) + '</div>';
        if (d.hist.length) {
            view += '<div class="kpdt-docs-title" style="margin-top:12px;"><i class="fa-solid fa-list-ol"></i> Các lần thu hồi</div><div class="kpdt-docs-wrap"><table class="kpdt-docs"><thead><tr><th class="c" style="width:56px;">Lần</th><th class="c" style="width:110px;">Ngày thu hồi</th><th style="text-align:right; width:150px;">Số tiền đã thu hồi (VNĐ)</th><th style="width:130px;">Hình thức nộp trả</th><th>Số chứng từ/Biên lai</th><th>Ghi chú</th><th>Tài liệu kèm theo</th></tr></thead><tbody>'
                + d.hist.map(function (h, i) { return '<tr><td class="c">' + (i + 1) + '</td><td class="c">' + esc(h.date || '-') + '</td><td style="text-align:right;">' + fmt(h.amount) + '</td><td>' + esc(h.method || '-') + '</td><td>' + esc(h.voucherNo || '-') + '</td><td>' + esc(h.note || '-') + '</td><td>' + (esc(docNames(h.files || []).join(', ')) || '-') + '</td></tr>'; }).join('')
                + '</tbody></table></div>';
        }
        var form = editing ? '<div class="kpux-form" style="margin-top:14px; padding-top:12px; border-top:1px dashed #e2e8f0;">'
            + '<div class="kpux-sub">Kết quả thu hồi lần ' + (d.hist.length + 1) + '</div>'
            + fld('kpuxRcAmount', 'Số tiền đã thu hồi (VNĐ)', true, '', 'maxlength="20" style="text-align:right;" oninput="formatNumberInput(this); kpuxClr(this)" placeholder="Nhập số tiền đã thu hồi..."')
            + fld('kpuxRcDate', 'Ngày thu hồi', true, todayText(), 'placeholder="dd/mm/yyyy"')
            + '<div class="kpux-f kpux-span2"><span class="form-label">Hình thức nộp trả<span class="kpux-req">*</span></span><div class="kpux-radios" id="kpuxRcMethod">'
            + '<label><input type="radio" name="kpuxRcMethod" value="Chuyển khoản" onchange="kpuxRcMethodClr()"> Chuyển khoản</label>'
            + '<label><input type="radio" name="kpuxRcMethod" value="Tiền mặt" onchange="kpuxRcMethodClr()"> Tiền mặt</label></div><div class="kpux-err" id="kpuxRcMethodErr">Đây là trường bắt buộc</div></div>'
            + fld('kpuxRcVoucher', 'Số chứng từ/Biên lai nộp trả ngân sách', false, '', 'maxlength="100" placeholder="Nhập số chứng từ/biên lai..."', 'kpux-span2')
            + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxRcNote">Ghi chú</label><textarea class="form-control" id="kpuxRcNote" rows="2" maxlength="1000" placeholder="Nhập ghi chú quá trình thu hồi..."></textarea></div>'
            + '<div class="kpux-f kpux-full" id="kpuxRcTlkt"></div></div>' : '';
        return '<div class="kpdt-card' + (editing ? ' kpux-pay' : '') + '" id="kpuxRcCard"><div class="kpdt-card-head"><i class="fa-solid fa-rotate-left"></i> Thu hồi kinh phí</div><div class="kpdt-card-body">' + view + form + '</div></div>';
    }
    window.kpuxRcMethodClr = function () { var e = el('kpuxRcMethodErr'); if (e) e.classList.remove('on'); };
    window.kpuxOpenRc = function (id) {
        var item = kpdtFind(id); if (!item) return;
        if (kpNormStatus(item.status) !== 'Chờ thu hồi') { showToast('Chỉ Cập nhật thu hồi với bản ghi Chờ thu hồi.', 'warning'); return; }
        rcEditId = item.id; payId = null; ffId = null; ntEditId = null;
        kpdtOpen(item.id, { kpuxKeep: true });
        setTimeout(function () { var c = el('kpuxRcCard'); if (!c) return; c.scrollIntoView({ block: 'start' }); var h = c.querySelector('.kpdt-card-head'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } } }, 30);
    };
    window.kpuxRcEdit = window.kpuxOpenRc;
    window.kpuxRcCancel = function () { var it = kpdtFind(rcEditId); rcEditId = null; if (it) { kpdtRender(it); window.scrollTo(0, 0); } };
    window.kpuxRcSave = function () {
        var item = kpdtFind(rcEditId); if (!item) return;
        var d = rcData(item);
        var v = function (x) { return el(x) ? el(x).value.trim() : ''; };
        var first = null;
        ['kpuxRcAmount', 'kpuxRcDate'].forEach(function (x) { if (!v(x)) { mark(x); if (!first) first = x; } });
        var dd = parseDateViGlobal(v('kpuxRcDate'));
        if (v('kpuxRcDate') && (!dd || dd > today())) { mark('kpuxRcDate', dd ? 'Ngày thu hồi không được lớn hơn ngày hiện tại' : 'Ngày không hợp lệ, định dạng dd/mm/yyyy'); if (!first) first = 'kpuxRcDate'; }
        var amt = parseFloat(v('kpuxRcAmount').replace(/\D/g, '')) || 0;
        if (v('kpuxRcAmount') && amt <= 0) { mark('kpuxRcAmount', 'Số tiền đã thu hồi phải lớn hơn 0'); if (!first) first = 'kpuxRcAmount'; }
        if (v('kpuxRcAmount') && amt > d.remain) { mark('kpuxRcAmount', 'Số tiền đã thu hồi không được vượt quá Số tiền còn phải thu hồi (' + fmt(d.remain) + ' đồng)'); if (!first) first = 'kpuxRcAmount'; }
        var m = document.querySelector('input[name="kpuxRcMethod"]:checked');
        if (!m) { var e = el('kpuxRcMethodErr'); if (e) { e.textContent = 'Đây là trường bắt buộc'; e.classList.add('on'); } if (!first) first = 'kpuxRcMethod'; }
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxRc') : true;
        if (first) { var f = first === 'kpuxRcMethod' ? document.querySelector('input[name="kpuxRcMethod"]') : el(first); if (f) f.focus(); return; }
        if (!tlOk) return;
        var files = typeof tlktGet === 'function' ? tlktGet('kpuxRc') : [];
        var b = rcBasis(item);
        var r = item.recovery || (item.recovery = { basisDecisionNo: b.no, basisDecisionDate: b.date, amountToRecover: d.need, amountRecovered: 0, files: [] });
        if (r.amountToRecover == null) r.amountToRecover = d.need;
        if (!Array.isArray(r.history)) r.history = d.hist.slice();
        var entry = { date: v('kpuxRcDate'), amount: amt, method: m.value, voucherNo: v('kpuxRcVoucher'), note: v('kpuxRcNote'), files: files };
        r.history.push(entry);
        r.amountRecovered = (Number(r.amountRecovered) || 0) + amt;
        r.amountRemain = Math.max(0, r.amountToRecover - r.amountRecovered);
        r.recordDate = entry.date; r.note = entry.note || r.note || ''; r.method = entry.method; r.voucherNo = entry.voucherNo;
        r.files = (r.files || []).concat(files);
        var full = r.amountRemain === 0;
        if (full) item.status = 'Đã thu hồi';
        var note = 'Lần ' + r.history.length + '; ngày ' + entry.date + '; số tiền ' + fmt(amt) + ' đồng; ' + entry.method + (entry.voucherNo ? '; chứng từ ' + entry.voucherNo : '') + '; còn phải thu hồi ' + fmt(r.amountRemain) + ' đồng.';
        if (isTb(item)) kptbHist(item, 'Cập nhật thu hồi', note); else if (isQd(item)) qdtuHist(item, 'Cập nhật thu hồi', note);
        saveProposalsToLocal();
        rcEditId = null;
        renderProposalsTable();
        window.scrollTo(0, 0);
        showToast(full ? 'Đã thu hồi đủ 100%. Bản ghi ' + item.code + ' chuyển Đã thu hồi.' : 'Cập nhật thu hồi thành công. Còn phải thu hồi ' + fmt(r.amountRemain) + ' đồng.', 'success');
    };
    // Khối bổ sung trên màn chi tiết: Thông tin Sung quỹ (Tạm ứng), Thu hồi kinh phí; chế độ Cập nhật kết quả thu hồi
    function extraCards(item, body) {
        var hist = el('kpdtHistCard');
        var add = function (html) { if (hist && hist.parentNode === body) hist.insertAdjacentHTML('beforebegin', html); else body.insertAdjacentHTML('beforeend', html); };
        if (kpIsAdv(item) && kpNormStatus(item.status) === 'Sung quỹ nhà nước') add(sqCardHtml(item));
        if (rcVisible(item)) add(rcCardHtml(item));
        Array.prototype.slice.call(body.querySelectorAll(':scope > .kpdt-card')).forEach(function (c) { if (c.id !== 'kpdtHistCard') makeToggle(c); });
        if (rcEditId === item.id && el('kpuxRcTlkt')) {
            Array.prototype.forEach.call(body.querySelectorAll(':scope > .kpdt-card'), function (c) { if (c.id !== 'kpuxRcCard') c.classList.add('collapsed'); });
            if (typeof tlktMount === 'function') tlktMount('kpuxRc', 'kpuxRcTlkt', { required: false, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
            if (window.flatpickr) flatpickr('#kpuxRcDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date() });
            el('kpdtTitle').innerHTML = '<i class="fa-solid fa-rotate-left"></i> CẬP NHẬT THU HỒI: ' + esc(item.code);
            el('kpdtFoot').innerHTML = '<button type="button" class="btn btn-secondary" onclick="kpuxRcCancel()"><i class="fa-solid fa-xmark"></i> Hủy</button>'
                + '<button type="button" class="btn btn-primary" onclick="kpuxRcSave()"><i class="fa-solid fa-floppy-disk"></i> Lưu kết quả thu hồi</button>';
        }
    }

    // ================= Bọc chức năng sẵn có =================
    injectCss();
    // Vai trò giả lập lưu localStorage (kp_role_v1); badge menu kinhPhi tính theo vai trò (btnn_badge_cho_xu_ly.js).
    // Mở trang: vai trò theo tài khoản giả lập đang dùng chung (Nhóm lãnh đạo -> Lãnh đạo), không đổi tài khoản của các phân hệ khác.
    (function () {
        var KEY = 'kp_role_v1';
        var sel = el('roleSelector');
        try {
            var W = window.BTNN_WF, role = null;
            if (W && typeof W.getCurrentUserId === 'function' && typeof kptbIsLeaderAccount === 'function') role = kptbIsLeaderAccount(W.getCurrentUserId()) ? 'lanh-dao' : 'chuyen-vien';
            if (!role) role = localStorage.getItem(KEY);
            if (sel && role && Array.prototype.some.call(sel.options, function (o) { return o.value === role; })) sel.value = role;
            if (sel) localStorage.setItem(KEY, sel.value);
        } catch (e) { /* bỏ qua */ }
        if (typeof kpOnRoleChange === 'function') {
            var origRole = kpOnRoleChange;
            kpOnRoleChange = function () { try { if (sel) localStorage.setItem(KEY, sel.value); } catch (e) { /* bỏ qua */ } return origRole.apply(this, arguments); };
        }
    })();
    // Footer chi tiết: thao tác theo trạng thái + "Đóng" (thay "Quay lại danh sách")
    kpdtButtons = function (item) {
        var b = function (cls, icon, label, js) { return '<button type="button" class="btn ' + cls + '" onclick="' + js + '"><i class="' + icon + '"></i> ' + label + '</button>'; };
        var h = '';
        var ld = kpRole() === 'lanh-dao';
        actDefs(item).forEach(function (a) {
            if (!a.on || a.noFoot) return;
            var cls = ld ? (a.t === 'Từ chối' ? 'btn-danger' : 'btn-primary') : (a.t === 'Cập nhật chi trả' || a.t === 'Cập nhật thu hồi' ? 'btn-success' : (a.t === 'Sung quỹ nhà nước' ? 'btn-danger' : (a.t === 'Đề nghị cấp bổ sung kinh phí' ? 'btn-secondary' : 'btn-primary')));
            h += b(cls, a.ic, a.t, a.dt || a.js);
        });
        return b('btn-secondary', 'fa-solid fa-xmark', 'Đóng', 'kpdtClose()') + h;
    };
    var origRenderDt = kpdtRender;
    kpdtRender = function (item) { var r = origRenderDt.apply(this, arguments); try { postRender(item); } catch (e) { console.error(e); } return r; };
    var origOpen = kpdtOpen;
    kpdtOpen = function (key, opts) { if (!(opts && opts.kpuxKeep)) { payId = null; ntEditId = null; ffId = null; rcEditId = null; } return origOpen.apply(this, arguments); };
    var origClose = kpdtClose;
    kpdtClose = function () { payId = null; ntEditId = null; ffId = null; rcEditId = null; return origClose.apply(this, arguments); };
    // Tài liệu kèm theo chế độ xem: không có dữ liệu thì không hiển thị bảng
    var origDocs = kpdtDocsHtml;
    kpdtDocsHtml = function (list) { return kpdtDocsNorm(list).length ? origDocs.apply(this, arguments) : ''; };
    // Ký ngoài: không còn thao tác Đính kèm văn bản đã ký
    if (typeof kpNeedsSignedFile === 'function') kpNeedsSignedFile = function () { return false; };
    // Cập nhật chi trả: mọi điểm gọi dùng chung màn hình chi tiết
    payProposalDirect = function (id) { window.kpuxOpenPay(id); };
    if (typeof kptbOpenPay === 'function') kptbOpenPay = function (id) { window.kpuxOpenPay(id); };
    // Mã vụ việc của dữ liệu giả lập bổ sung (vvCode) khi không tra được theo Mã hồ sơ
    if (typeof kpdtVv === 'function') { var origVv = kpdtVv; kpdtVv = function (code) { var r = origVv.apply(this, arguments); if (r) return r; var p = proposalsList.find(function (x) { return x && x.ycbtCode === code && x.vvCode; }); return p ? p.vvCode : ''; }; }
    // Sung quỹ nhà nước: mọi điểm gọi dùng chung màn hình chi tiết
    forfeitProposalDirect = function (id) { window.kpuxOpenForfeit(id); };
    if (typeof kptbOpenForfeit === 'function') kptbOpenForfeit = function (id) { window.kpuxOpenForfeit(id); };
    var origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () { var r = origSync.apply(this, arguments); sanitize(); return r; };
    var origRender = renderProposalsTable;
    renderProposalsTable = function () { var r = origRender.apply(this, arguments); decorateTable(); return r; };
    var boot = function () { try { sanitize(); decorateTable(); if (kpdtIsOpen()) { var it = kpdtFind(kpdtCurId); if (it) kpdtRender(it); } } catch (e) { console.error(e); } };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 0); }); else setTimeout(boot, 0);
})();
