/*
 * Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Chuẩn hóa UI/UX (prefix kpux), nạp sau quan_ly_kinh_phi_kpdc.js
 * 1. Lưới MH01: cột Thao tác cố định 01 bộ nút, cùng vị trí trên mọi dòng; nút không được phép hiển thị mờ, có tooltip lý do.
 *    - Lãnh đạo: Ký duyệt, Từ chối. Cán bộ xử lý: Cập nhật Quyết định tạm ứng, Trình thông báo chi trả,
 *      Đề nghị cấp bổ sung kinh phí, Cập nhật chi trả, Trả lại ngân sách nhà nước (bỏ luồng Chờ lập đề nghị: Lập đề nghị, Xóa).
 * 2. "Cập nhật chi trả" thống nhất cho mọi loại: mở màn hình chi tiết (cùng hàm render kpdtAdvBody / kpdtPayBody),
 *    các khối phía trên thu gọn, cuộn + focus khối "Thông tin kết quả chi trả thực tế" (không có Số biên lai nhận tiền mặt).
 *    Bỏ thao tác "Đính kèm văn bản đã ký": Quyết định tạm ứng Ký ngoài đã có văn bản đã ký khi chuyển Chờ chi trả.
 * 3. Xem chi tiết: lưới nhãn - giá trị gọn (04 cột trên màn rộng), Footer nút cố định, nút "Đóng" chỉ ở Footer.
 * 4. Bảng Tài liệu đính kèm chỉ hiển thị khi có dữ liệu.
 * 5. Khối "Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường": chỉ loại Chi trả tiền bồi thường, nhập 01 lần (không Thêm thông báo, chỉ xem sau khi lưu),
 *    sau khi Thông báo chi trả đã ký (Chờ chi trả trở đi); Cán bộ nhập khi Chờ chi trả; Hạn nhận tiền = Ngày người yêu cầu nhận thông báo + 03 năm.
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
            { t: 'Cập nhật Quyết định tạm ứng', ic: 'fa-solid fa-pen-to-square', cls: 'edit', on: st === 'Bị trả lại' && qd, js: "qdtuOpenPage('" + id + "')", dt: "kpdtGo('qdtuOpenPage','" + id + "')", off: 'chỉ thực hiện với bản ghi Tạm ứng kinh phí Bị trả lại' },
            { t: 'Trình thông báo chi trả', ic: 'fa-solid fa-paper-plane', cls: 'edit', on: tb && kptbCanSubmit(item), js: "kptbOpenSign('" + id + "')", off: 'chỉ thực hiện với bản ghi Chi trả tiền bồi thường Chờ thông báo chi trả, Đề nghị cấp bổ sung kinh phí, Bị trả lại' },
            { t: 'Đề nghị cấp bổ sung kinh phí', ic: 'fa-solid fa-file-invoice-dollar', cls: '', on: tb && st === KPTB_ST.WAIT, js: "kptbOpenSupp('" + id + "')", off: 'chỉ thực hiện với bản ghi Chi trả tiền bồi thường Chờ thông báo chi trả' },
            // Cập nhật chi trả / Cập nhật thu hồi: 01 nút chung, nhãn theo trạng thái (Chờ chi trả -> Cập nhật chi trả; Chờ thu hồi -> Cập nhật thu hồi)
            (st === 'Chờ thu hồi'
                ? { t: 'Cập nhật thu hồi', ic: 'fa-solid fa-hand-holding-dollar', cls: 'accept', on: true, js: "kpuxOpenRc('" + id + "')", off: '' }
                : { t: 'Cập nhật chi trả', ic: 'fa-solid fa-hand-holding-dollar', cls: 'accept', on: st === 'Chờ chi trả', js: "kpuxOpenPay('" + id + "')", off: 'chỉ thực hiện với bản ghi Chờ chi trả (kể cả quá hạn 03 năm) hoặc bản ghi Chờ thu hồi (Cập nhật thu hồi)' }),
            { t: 'Trả lại ngân sách nhà nước', ic: 'fa-solid fa-building-columns', cls: 'reject', on: elig, js: "kpuxOpenForfeit('" + id + "')", off: 'chỉ thực hiện với bản ghi Chờ chi trả đã quá hạn 03 năm kể từ ngày nhận thông báo' }
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
            if (tr.cells.length < 10) return; // Lưới MH01 10 cột (đã bỏ cột Loại kinh phí khi tách menu con): Trạng thái = cột kề cuối, Thao tác = cột cuối
            var code = tr.cells[1].innerText.trim();
            var item = proposalsList.find(function (p) { return p && p.code === code; });
            if (!item) return;
            var box = tr.cells[tr.cells.length - 1].querySelector('.action-flex') || tr.cells[tr.cells.length - 1];
            box.innerHTML = actsHtml(item);
            var stCell = tr.cells[tr.cells.length - 2];
            if (getTreasuryInfo(item).isEligible && !stCell.querySelector('.kpux-overdue')) stCell.insertAdjacentHTML('beforeend', overdueHtml());
        });
    }
    // Nhãn cảnh báo bản ghi Chờ chi trả đã quá hạn 03 năm kể từ ngày người yêu cầu nhận thông báo mà người yêu cầu không đến nhận tiền
    function overdueHtml() { return '<div class="kpux-overdue"><span class="badge badge-danger">Quá hạn 3 năm</span></div>'; }

    // ================= 2. Dữ liệu: Ký ngoài đã có văn bản đã ký khi Chờ chi trả =================
    // Dữ liệu giả lập bổ sung (Chi trả tiền bồi thường): 02 Chờ chi trả còn hạn, 01 sắp hết hạn, 01 quá hạn 03 năm, 01 chưa nhập thông báo, 01 Hoàn thành, 01 Trả lại ngân sách nhà nước
    var SEEDS = [
        { id: 'P_KPUX_1', code: 'KP-2026-121', ycbt: 'BT-2026-061', vv: 'VVBT-2026-061', nyc: 'Lê Thị Thu Hà', amount: 75000000, date: '15/10/2026', st: 'Chờ chi trả', sign: 'Ký số', docNo: '61/TB-STP', notice: '20/10/2026' },
        { id: 'P_KPUX_2', code: 'KP-2026-122', ycbt: 'BT-2026-062', vv: 'VVBT-2026-062', nyc: 'Trịnh Văn Quang', amount: 128000000, date: '16/10/2026', st: 'Chờ chi trả', sign: 'Ký ngoài', docNo: '62/TB-STP', notice: '22/10/2026' },
        { id: 'P_KPUX_3', code: 'KP-2026-123', ycbt: 'BT-2023-047', vv: 'VVBT-2023-047', nyc: 'Đinh Công Tráng', amount: 56000000, date: '02/10/2026', st: 'Chờ chi trả', sign: 'Ký số', docNo: '47/TB-STP', notice: '12/06/2023', created: '02/06/2023' },
        { id: 'P_KPUX_4', code: 'KP-2026-124', ycbt: 'BT-2026-064', vv: 'VVBT-2026-064', nyc: 'Phan Thị Ngọc', amount: 92000000, date: '05/10/2026', st: 'Hoàn thành', sign: 'Ký số', docNo: '64/TB-STP', notice: '08/10/2026', pay: '12/10/2026' },
        { id: 'P_KPUX_5', code: 'KP-2026-125', ycbt: 'BT-2023-021', vv: 'VVBT-2023-021', nyc: 'Vũ Đức Thắng', amount: 64000000, date: '01/10/2026', st: 'Trả lại ngân sách nhà nước', sign: 'Ký ngoài', docNo: '21/TB-STP', notice: '03/04/2023', created: '28/03/2023', sq: '05/10/2026' },
        // rcv: Ngày người yêu cầu nhận thông báo (mặc định = notice); '' = chưa nhập thông tin thông báo. KP-2026-126 sắp hết hạn 03 năm; KP-2026-127 chưa nhập thông báo (demo nhập 01 lần)
        { id: 'P_KPUX_6', code: 'KP-2026-126', ycbt: 'BT-2023-058', vv: 'VVBT-2023-058', nyc: 'Hoàng Văn Lâm', amount: 47000000, date: '03/10/2026', st: 'Chờ chi trả', sign: 'Ký số', docNo: '58/TB-STP', notice: '08/11/2023', rcv: '15/11/2023', created: '30/10/2023' },
        { id: 'P_KPUX_7', code: 'KP-2026-127', ycbt: 'BT-2026-087', vv: 'VVBT-2026-087', nyc: 'Lý Thị Hồng', amount: 83000000, date: '24/10/2026', st: 'Chờ chi trả', sign: 'Ký ngoài', docNo: '87/TB-STP', notice: '24/10/2026', rcv: '' },
        // dc: đã chi trả, vụ việc bị Đình chỉ giải quyết -> Chờ thu hồi (demo Cập nhật thu hồi tại menu Chi trả tiền bồi thường)
        { id: 'P_KPUX_8', code: 'KP-2026-128', ycbt: 'BT-2026-088', vv: 'VVBT-2026-088', nyc: 'Ngô Thị Lan', amount: 66000000, date: '06/10/2026', st: 'Chờ thu hồi', sign: 'Ký số', docNo: '88/TB-STP', notice: '08/10/2026', pay: '10/10/2026', dc: { no: '31/QĐ-STP', date: '21/10/2026', at: '21/10/2026 15:00' } },
        // Dừng giải quyết -> Chờ thu hồi; đã thu hồi đủ qua 02 lần, chờ bấm Hoàn thành thu hồi (dữ liệu lần thu hồi: seedRc3)
        { id: 'P_KPUX_9', code: 'KP-2026-129', ycbt: 'BT-2026-089', vv: 'VVBT-2026-089', nyc: 'Đỗ Minh Khôi', amount: 48000000, date: '07/10/2026', st: 'Chờ thu hồi', sign: 'Ký ngoài', docNo: '89/TB-STP', notice: '09/10/2026', pay: '11/10/2026', dc: { src: 'dungGiaiQuyet', no: '589/TB-STP', date: '16/10/2026', at: '16/10/2026 10:30' } }
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
            var rcv = s.rcv != null ? s.rcv : s.notice;
            delete it.noticeLatest; delete it.noticeListOld; delete it.noticeProofFile;
            if (rcv) { it.noticeReceivedDate = rcv; it.noticeList = [{ no: s.docNo, date: rcv, note: 'Người yêu cầu bồi thường nhận Thông báo chi trả tiền bồi thường.', files: [] }]; }
            else delete it.noticeReceivedDate;
            it.kptbHistory = [{ at: '08:00 ' + (s.created || s.date), userId: '', userName: 'Hệ thống', action: 'Tạo bản ghi', note: 'Quyết định giải quyết bồi thường ' + dec.decNo + ' được ban hành.' },
                { at: signedAt, userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: s.sign === 'Ký số' ? 'Ký duyệt Thông báo chi trả' : 'Ban hành Thông báo chi trả (Ký ngoài)', note: 'Số ' + s.docNo + '.' }];
            if (s.pay) {
                it.kptbPayment = { method: KPTB_TRANSFER, accHolder: s.nyc.toUpperCase(), account: '0451000' + s.code.slice(-3) + '88', bank: 'Vietcombank', branch: 'Chi nhánh Hà Nội', recName: s.nyc, payDate: s.pay, amount: s.amount, files: [{ name: 'Ủy nhiệm chi', file: { name: 'UNC_' + s.code + '.pdf' } }], at: '10:00 ' + s.pay, by: 'canbonv' };
                it.payoutDate = s.pay; it.payoutAmountReal = s.amount; it.payoutMethod = KPTB_TRANSFER;
                it.kptbHistory.push({ at: '10:00 ' + s.pay, userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Cập nhật chi trả', note: 'Ngày chi trả ' + s.pay + '; số tiền ' + fmt(s.amount) + ' đồng.' });
            }
            if (s.dc && typeof kpdcSeedBasis === 'function') {
                var dgq = s.dc.src === 'dungGiaiQuyet';
                it.statusBasis = kpdcSeedBasis(s.ycbt, s.vv, s.dc.no, s.dc.date, (dgq ? 'Mau_05_BTNN_Thong_bao_dung_giai_quyet_' : 'Mau_25_BTNN_Quyet_dinh_dinh_chi_') + s.vv + '_da_ky.pdf', 'Ký số', s.dc.at, 'Hoàn thành', 'Chờ thu hồi', dgq ? 'dungGiaiQuyet' : undefined);
                it.kptbHistory.push({ at: s.dc.at, userId: '', userName: 'Hệ thống', action: dgq ? 'Chuyển Chờ thu hồi do dừng giải quyết bồi thường' : 'Chuyển Chờ thu hồi do đình chỉ giải quyết', note: 'Căn cứ: ' + (dgq ? 'Thông báo dừng giải quyết yêu cầu bồi thường' : 'Quyết định đình chỉ giải quyết bồi thường') + ' số ' + s.dc.no + ' ngày ' + s.dc.date + ' (Mã vụ việc ' + s.vv + ', Mã hồ sơ GQBT ' + s.ycbt + '). Trạng thái trước: Hoàn thành. Số tiền đã chi: ' + fmt(s.amount) + ' đồng.' });
            }
            if (s.sq) {
                it.treasuryForfeitDate = s.sq; it.treasuryVoucherNo = 'SQ-' + s.code.slice(-3) + '/2026'; it.treasuryAmount = s.amount; it.payoutAmountReal = 0;
                it.treasuryReason = 'Người yêu cầu bồi thường đã quá thời hạn 03 năm kể từ ngày nhận thông báo chi trả nhưng không đến nhận tiền bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.';
                it.treasuryFile = [{ name: 'Giấy nộp tiền vào ngân sách nhà nước', file: { name: 'Giay_nop_NSNN_' + s.code + '.pdf' } }];
                it.kptbHistory.push({ at: '15:00 ' + s.sq, userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Trả lại ngân sách nhà nước', note: 'Số chứng từ ' + it.treasuryVoucherNo + '.' });
            }
            proposalsList.push(it); n++;
        });
        return n;
    }
    // Dữ liệu giả lập Thu hồi nhiều lần: KP-2026-025 (Chờ thu hồi) đã có 02 lần thu hồi một phần; gộp theo mã, đánh dấu phiên bản để không ghi đè lần cập nhật sau
    var RC_SEED_VER = 'rc2_20261027';
    function seedRcMulti() {
        var it = proposalsList.find(function (p) { return p && p.code === 'KP-2026-025'; });
        if (!it || kpNormStatus(it.status) !== 'Chờ thu hồi') return 0;
        var r = it.recovery || (it.recovery = { basisDecisionNo: '21/QĐ-SCBSGQBT', basisDecisionDate: '08/10/2026', amountToRecover: 90000000, files: [] });
        if (r.seedVer === RC_SEED_VER || (Array.isArray(r.history) && r.history.length >= 2)) return 0;
        r.history = [
            { date: '12/10/2026', amount: 20000000, method: 'Chuyển khoản', note: 'Người yêu cầu bồi thường nộp trả lần 1 vào tài khoản của Kho bạc Nhà nước.', files: [{ name: 'Giấy nộp tiền thu hồi lần 1', file: { name: 'Giay_nop_thu_hoi_KP-2026-025_lan1.pdf' } }] },
            { date: '20/10/2026', amount: 10000000, method: 'Tiền mặt', note: 'Nộp trả lần 2 tại cơ quan; phần còn lại tiếp tục đôn đốc.', files: [{ name: 'Phiếu thu lần 2', file: { name: 'Phieu_thu_KP-2026-025_lan2.pdf' } }] }
        ];
        r.amountToRecover = r.amountToRecover != null ? r.amountToRecover : 90000000;
        r.amountRecovered = 30000000; r.amountRemain = Math.max(0, r.amountToRecover - 30000000);
        r.recordDate = '20/10/2026'; r.method = 'Tiền mặt'; r.note = r.history[1].note; delete r.voucherNo;
        r.seedVer = RC_SEED_VER;
        return 1;
    }
    // KP-2026-025 (dữ liệu đã lưu): dời mốc thời gian sang tháng 10 để hiển thị theo bộ lọc mặc định Từ ngày đầu tháng; chạy 01 lần
    var RC_DATE_VER = 'rcd3_20261027';
    function seedRcDates() {
        var it = proposalsList.find(function (p) { return p && p.code === 'KP-2026-025'; });
        if (!it || it.rcDateVer === RC_DATE_VER) return 0;
        var map = { '15/09/2026': '01/10/2026', '16/09/2026': '02/10/2026', '18/09/2026': '12/10/2026', '25/09/2026': '20/10/2026' };
        if (map[it.date]) it.date = map[it.date];
        if (map[it.payoutDate]) it.payoutDate = map[it.payoutDate];
        var r = it.recovery;
        if (r) {
            if (r.basisDecisionDate === '15/09/2026') r.basisDecisionDate = '08/10/2026';
            if (map[r.recordDate]) r.recordDate = map[r.recordDate];
            (r.history || []).forEach(function (h) { if (h && map[h.date]) h.date = map[h.date]; });
        }
        it.rcDateVer = RC_DATE_VER;
        return 1;
    }
    // KP-2026-091 (Tạm ứng kinh phí, Chờ thu hồi do Quyết định hủy): dời mốc thời gian sang tháng 10 để hiển thị theo bộ lọc mặc định; chạy 01 lần
    var RC_DATE_VER_TU = 'rcd_tu1_20261027';
    function seedRcDatesTu() {
        var it = proposalsList.find(function (p) { return p && p.code === 'KP-2026-091'; });
        if (!it || it.rcDateVer === RC_DATE_VER_TU) return 0;
        var map = { '04/09/2026': '09/10/2026', '06/09/2026': '05/10/2026', '10/09/2026': '16/10/2026' };
        if (it.date === '04/09/2026') it.date = '02/10/2026';
        if (map[it.payoutDate]) it.payoutDate = map[it.payoutDate];
        var b = it.statusChangeBasis;
        if (b) { if (map[b.decisionDate]) b.decisionDate = map[b.decisionDate]; if (/^04\/09\/2026/.test(b.changedAt || '')) b.changedAt = b.changedAt.replace('04/09/2026', '09/10/2026'); }
        var r = it.recovery;
        if (r) {
            if (map[r.basisDecisionDate]) r.basisDecisionDate = map[r.basisDecisionDate];
            if (map[r.recordDate]) r.recordDate = map[r.recordDate];
            (r.history || []).forEach(function (h) { if (h && map[h.date]) h.date = map[h.date]; });
        }
        it.rcDateVer = RC_DATE_VER_TU;
        return 1;
    }
    // Dữ liệu mẫu Thu hồi (02 menu): (a) chưa thu lần nào: KP-2026-901, KP-2026-128; (b) đã thu 02 lần còn thiếu: KP-2026-091, KP-2026-025 (QĐ sửa chữa giảm tiền);
    // (c) đã thu đủ, chờ Hoàn thành thu hồi: KP-2026-905, KP-2026-129. Gộp theo mã; mỗi bản ghi chạy 01 lần (rcSeed3), chỉ khi còn Chờ thu hồi
    var RC_SEED3 = 'rc3_20261027';
    var RC3 = {
        'KP-2026-091': { hist: [['12/10/2026', 10000000, 'Chuyển khoản', 'Nộp trả lần 1 theo Quyết định hủy.'], ['19/10/2026', 5000000, 'Tiền mặt', 'Nộp trả lần 2 tại cơ quan; tiếp tục đôn đốc phần còn lại.']] },
        'KP-2026-025': { after: 30000000, hist: null },
        'KP-2026-905': { hist: [['23/10/2026', 20000000, 'Chuyển khoản', 'Nộp trả lần 1 vào tài khoản Kho bạc Nhà nước.'], ['26/10/2026', 10000000, 'Tiền mặt', 'Nộp trả lần 2, đủ số tiền phải thu hồi.']] },
        'KP-2026-129': { hist: [['18/10/2026', 30000000, 'Chuyển khoản', 'Nộp trả lần 1 vào tài khoản Kho bạc Nhà nước.'], ['24/10/2026', 18000000, 'Chuyển khoản', 'Nộp trả lần 2, đủ số tiền phải thu hồi.']] }
    };
    function seedRc3() {
        var n = 0;
        Object.keys(RC3).forEach(function (code) {
            var it = proposalsList.find(function (p) { return p && p.code === code; });
            if (!it || it.rcSeed3 === RC_SEED3 || kpNormStatus(it.status) !== 'Chờ thu hồi') return;
            var cfg = RC3[code], b = rcBasis(it);
            var r = it.recovery || (it.recovery = { basisDecisionNo: b.no, basisDecisionDate: b.date, files: [] });
            if (cfg.after != null) r.amountAfter = cfg.after;
            if (cfg.hist) {
                r.history = cfg.hist.map(function (h, i) { return { date: h[0], amount: h[1], method: h[2], note: h[3], files: [{ name: 'Chứng từ nộp trả lần ' + (i + 1), file: { name: 'Chung_tu_thu_hoi_' + code + '_lan' + (i + 1) + '.pdf' } }] }; });
                var last = r.history[r.history.length - 1];
                r.recordDate = last.date; r.method = last.method; r.note = last.note; delete r.voucherNo;
            }
            var d = rcData(it);
            r.amountToRecover = d.need; r.amountRecovered = d.got; r.amountRemain = d.remain;
            it.rcSeed3 = RC_SEED3; n++;
        });
        return n;
    }
    function sanitize() {
        var n = 0;
        n += seedKpux();
        n += seedRcMulti();
        n += seedRcDates();
        n += seedRcDatesTu();
        n += seedRc3();
        proposalsList.forEach(function (p) { if (p && !kpIsAdv(p) && setLatest(p)) n++; });
        // Bỏ luồng "Chờ lập đề nghị": bản ghi Tạm ứng tạo tại Tạo QĐ tạm ứng, bản ghi Chi trả tạo tự động / Tạo thông báo chi trả
        var i = KP_PENDING_STATES.indexOf('Chờ lập đề nghị'); if (i >= 0) KP_PENDING_STATES.splice(i, 1);
        var keep = proposalsList.filter(function (p) { return !p || p.status !== 'Chờ lập đề nghị'; });
        if (keep.length !== proposalsList.length) { proposalsList = keep; n++; }
        proposalsList.forEach(function (p) {
            if (p && kpIsAdv(p) && p.signMethod === KP_SIGN_OUTSIDE && !p.qdtu && !p.signedFile && ['Chờ chi trả', 'Hoàn thành', 'Trả lại ngân sách nhà nước'].indexOf(kpNormStatus(p.status)) >= 0) {
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
    var NT_STATES = ['Chờ chi trả', 'Hoàn thành', 'Trả lại ngân sách nhà nước', 'Chờ thu hồi', 'Đã thu hồi'];
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
    // Thông tin thông báo nhận tiền: nhập 01 lần (không Thêm thông báo, không sửa sau khi lưu).
    // Dữ liệu cũ nhiều lần thông báo: giữ lần gần nhất (noticeList 01 phần tử), các lần trước chuyển sang noticeListOld (không hiển thị, không mất dữ liệu)
    function noticeList(item) {
        if (Array.isArray(item.noticeList)) return item.noticeList.slice(-1);
        if (!item.noticeReceivedDate) return [];
        return [{ no: (item.kptbNotice || {}).docNo || '', date: item.noticeReceivedDate, note: item.noticeNote || '', files: noticeDocs(item) }];
    }
    function hasNotice(item) { return noticeList(item).length > 0; }
    // Dữ liệu thông báo trên bản ghi (Số thông báo, Ngày người yêu cầu nhận thông báo, Hạn nhận tiền); nhãn Quá hạn 3 năm, cột Hạn nhận/Trả lại ngân sách nhà nước,
    // điều kiện Trả lại ngân sách nhà nước đọc Ngày người yêu cầu nhận thông báo (noticeReceivedDate) + 03 năm
    function setLatest(item) {
        var ch = false;
        if (Array.isArray(item.noticeList) && item.noticeList.length > 1) {
            item.noticeListOld = (item.noticeListOld || []).concat(item.noticeList.slice(0, -1));
            item.noticeList = item.noticeList.slice(-1); ch = true;
        }
        var one = noticeList(item)[0];
        if (!one) { if (item.noticeLatest) { delete item.noticeLatest; return true; } return ch; }
        var lt = { no: one.no || '', date: one.date, deadline: deadlineText(one.date) };
        ch = ch || JSON.stringify(item.noticeLatest || null) !== JSON.stringify(lt) || item.noticeReceivedDate !== one.date;
        item.noticeLatest = lt; item.noticeReceivedDate = one.date;
        return ch;
    }
    function docNames(list) { return kpdtDocsNorm(list).map(function (d) { return (d.file && d.file.name) || d.name; }).filter(Boolean); }
    // Chỉ Cán bộ xử lý, bản ghi Chờ chi trả, chưa có thông tin thông báo
    function noticeCanEdit(item) { return kpRole() !== 'lanh-dao' && kpNormStatus(item.status) === 'Chờ chi trả' && !ffId && !hasNotice(item); }
    function noticeCardHtml(item) {
        var canEdit = noticeCanEdit(item);
        var editing = canEdit && ntEditId === item.id;
        var one = noticeList(item)[0] || null;
        var title = 'Thông tin thông báo chi trả tiền bồi thường và hạn nhận tiền bồi thường';
        var btns = editing
            ? headBtn('btn-secondary', 'fa-xmark', 'Hủy', 'kpuxNoticeCancel()') + headBtn('btn-primary', 'fa-floppy-disk', 'Lưu thông báo', "kpuxNoticeSave('" + item.id + "')")
            : (canEdit ? headBtn('btn-outline-primary', 'fa-pen-to-square', 'Nhập thông báo', "kpuxNoticeEdit('" + item.id + "')") : '');
        var body;
        if (editing) {
            body = '<div class="kpux-form">'
                + fld('kpuxNtNo', 'Số thông báo', false, '', 'maxlength="100" placeholder="Nhập số thông báo..."')
                + '<div class="kpux-f"><label class="form-label" for="kpuxNtDate">Ngày người yêu cầu nhận thông báo<span class="kpux-req">*</span></label><input type="text" class="form-control" id="kpuxNtDate" placeholder="dd/mm/yyyy" value="" oninput="kpuxNtPreview()" onchange="kpuxNtPreview()"><div class="kpux-err" id="kpuxNtDateErr">Đây là trường bắt buộc</div></div>'
                + '<div class="kpux-f"><span class="form-label">Hạn nhận tiền bồi thường</span><div class="kpux-ro" id="kpuxNtDeadline">-</div></div>'
                + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxNtNote">Ghi chú thông báo</label><textarea class="form-control" id="kpuxNtNote" rows="2" maxlength="1000" placeholder="Nhập hình thức gửi, kết quả liên hệ..."></textarea></div>'
                + '<div class="kpux-f kpux-full" id="kpuxNtTlkt"></div></div>';
        } else if (one) {
            body = '<div class="kpdt-grid">' + kpdtFld('Số thông báo', esc(one.no || '')) + kpdtFld('Ngày người yêu cầu nhận thông báo', esc(one.date || '')) + kpdtFld('Hạn nhận tiền bồi thường', esc(deadlineText(one.date)))
                + kpdtFld('Ghi chú thông báo', esc(one.note || ''), true) + '</div>'
                + (kpdtDocsNorm(one.files || []).length ? '<div style="margin-top:12px;">' + kpdtDocsHtml(one.files || []) + '</div>' : '');
        } else {
            body = '<div style="color:#64748b;">Chưa có thông tin thông báo.</div>';
        }
        body += '<div class="kpdt-hint">Hạn nhận tiền bồi thường: 03 năm kể từ ngày người yêu cầu nhận thông báo. Thông tin thông báo nhập 01 lần, không sửa sau khi lưu.</div>';
        return '<div class="kpdt-card" id="kpuxNoticeCard"><div class="kpdt-card-head"><i class="fa-solid fa-bell"></i> ' + title
            + (btns ? '<span class="kpux-head-btns" onclick="event.stopPropagation();">' + btns + '</span>' : '') + '</div><div class="kpdt-card-body">' + body + '</div></div>';
    }
    function mountNt(item) {
        if (ntEditId !== item.id || !el('kpuxNtTlkt')) return;
        if (typeof tlktMount === 'function') tlktMount('kpuxNt', 'kpuxNtTlkt', { required: false, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
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
        // Khối chỉ chứa bảng Tài liệu đính kèm mà không có dữ liệu: ẩn cả khối
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
            + '<button type="button" class="btn btn-success" onclick="kpuxPaySave()"><i class="fa-solid fa-circle-check"></i> ' + (kpIsAdv(item) ? 'Hoàn thành tạm ứng' : 'Hoàn thành chi trả') + '</button>';
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
        if (typeof kptbCloseView === 'function') kptbCloseView();
        payId = item.id; ntEditId = null; ffId = null; rcEditId = null;
        // Chưa nhập thông tin thông báo: khối thông báo ở chế độ nhập ngay tại màn Cập nhật chi trả
        if (noticeVisible(item) && noticeCanEdit(item)) ntEditId = item.id;
        kpdtOpen(item.id, { kpuxKeep: true });
        setTimeout(focusPay, 30);
    };
    window.kpuxPayCancel = function () { var id = payId; payId = null; var it = kpdtFind(id); if (it) { kpdtRender(it); window.scrollTo(0, 0); } };
    window.kpuxClr = function (inp) { inp.classList.remove('is-invalid'); var e = el(inp.id + 'Err'); if (e) e.classList.remove('on'); };
    window.kpuxPayMethod = function (v) { var b = el('kpuxPayBank'); if (b) b.style.display = v === 'Nhận tiền mặt' ? 'none' : 'contents'; };
    function mark(id, msg) { var i = el(id), e = el(id + 'Err'); if (i) i.classList.add('is-invalid'); if (e) { e.textContent = msg || 'Đây là trường bắt buộc'; e.classList.add('on'); } }
    window.kpuxPaySave = function () {
        var item = kpdtFind(payId); if (!item) return;
        // Đang nhập thông báo tại màn này (không bắt buộc): có nhập thì kiểm tra; lưu cùng kết quả chi trả khi Đồng ý
        var ntEntry = null;
        if (ntEditId === item.id && el('kpuxNtDate') && noticeTyped()) { ntEntry = validateNotice(); if (!ntEntry) return; }
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
        var adv = kpIsAdv(item);
        var detail = cash ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản (STK: <strong>' + esc(data.account) + '</strong> - ' + esc(data.bank) + ', Chủ TK: <strong>' + esc(data.accHolder) + '</strong>)';
        var html = '<div style="text-align:left; font-size:13.5px; color:#334155;"><div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:12px; margin-bottom:12px; line-height:1.6;">'
            + '<div>• <strong>Mã kinh phí:</strong> ' + esc(item.code) + '</div><div>• <strong>Họ và tên người nhận:</strong> ' + esc(data.recName) + '</div>'
            + '<div>• <strong>Phương thức chi trả:</strong> ' + detail + '</div><div>• <strong>Ngày chi trả:</strong> ' + esc(data.payDate) + '</div>'
            + '<div>• <strong>Số tiền thực tế chi trả:</strong> <span style="font-weight:700;">' + fmt(amount) + ' VNĐ</span> (' + esc(docTienBangChu(amount)) + ')</div></div>'
            + '<p style="margin:0;">Bạn có chắc chắn muốn xác nhận hoàn thành ' + (adv ? 'tạm ứng' : 'chi trả') + ' số tiền <strong>' + fmt(amount) + ' VNĐ</strong> cho người nhận <strong>' + esc(data.recName) + '</strong> không? Sau khi xác nhận, bản ghi chuyển trạng thái <strong>Hoàn thành</strong>.</p></div>';
        if (ntEntry) html = html.replace('<p style="margin:0;">Bạn có chắc', '<div style="font-weight:600; margin-bottom:6px;">Thông tin thông báo chi trả tiền bồi thường</div>' + noticeConfirmHtml(ntEntry) + '<p style="margin:0;">Bạn có chắc');
        showConfirmModal(html, function () { if (ntEntry) applyNotice(item, ntEntry); applyPay(item, data, amount, files); }, adv ? 'Xác nhận hoàn thành tạm ứng kinh phí' : 'Xác nhận hoàn thành chi trả kinh phí bồi thường');
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
        showToast((kpIsAdv(item) ? 'Cập nhật kết quả tạm ứng kinh phí thành công! Bản ghi ' : 'Cập nhật kết quả chi trả kinh phí bồi thường thành công! Bản ghi ') + item.code + ' chuyển Hoàn thành.', 'success');
    }

    // ================= 5. Nhập thông báo (01 lần) tại khối Thông tin thông báo chi trả ...: màn chi tiết và màn Cập nhật chi trả =================
    window.kpuxNoticeEdit = function (id) {
        var it = kpdtFind(id); if (!it || !noticeCanEdit(it)) return;
        ntEditId = id;
        refreshNotice(it);
        var c = el('kpuxNoticeCard'); if (c) { c.classList.remove('collapsed'); c.scrollIntoView({ block: 'center' }); }
    };
    window.kpuxNoticeCancel = function () { var it = kpdtFind(ntEditId); ntEditId = null; if (it) refreshNotice(it); };
    window.kpuxNtPreview = function () { var i = el('kpuxNtDate'), o = el('kpuxNtDeadline'); if (i && o) { o.textContent = deadlineText(i.value.trim()) || '-'; window.kpuxClr(i); } };
    var NT_SUCCESS = 'Lưu thông tin thông báo chi trả tiền bồi thường thành công!'; // [MSG-SUC-BTNN-KP-006]
    // Kiểm tra dữ liệu thông báo đang nhập; trả về entry hoặc null nếu chưa hợp lệ
    function validateNotice() {
        var dv = el('kpuxNtDate') ? el('kpuxNtDate').value.trim() : '';
        var d = parseDateViGlobal(dv);
        var bad = !dv ? 'Đây là trường bắt buộc' : (!d ? 'Ngày không hợp lệ, định dạng dd/mm/yyyy' : (d > today() ? 'Ngày người yêu cầu nhận thông báo không được lớn hơn ngày hiện tại' : ''));
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxNt') : true;
        if (bad) { mark('kpuxNtDate', bad); el('kpuxNtDate').focus(); return null; }
        if (!tlOk) return null;
        return { no: el('kpuxNtNo') ? el('kpuxNtNo').value.trim() : '', date: dv, note: el('kpuxNtNote') ? el('kpuxNtNote').value.trim() : '', files: typeof tlktGet === 'function' ? tlktGet('kpuxNt') : [] };
    }
    // Đã nhập ít nhất 01 trường của khối thông báo (màn Cập nhật chi trả: thông báo không bắt buộc)
    function noticeTyped() {
        var t = function (id) { return el(id) ? el(id).value.trim() : ''; };
        var files = typeof tlktGet === 'function' ? tlktGet('kpuxNt') : [];
        return !!(t('kpuxNtDate') || t('kpuxNtNo') || t('kpuxNtNote') || (files && files.length));
    }
    // Nội dung popup xác nhận lưu thông báo (dùng chung cho Lưu thông báo và Hoàn thành chi trả khi đang nhập thông báo)
    function noticeConfirmHtml(entry) {
        return '<div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:12px; margin-bottom:12px; line-height:1.6; text-align:left;">'
            + (entry.no ? '<div>• <strong>Số thông báo:</strong> ' + esc(entry.no) + '</div>' : '')
            + '<div>• <strong>Ngày người yêu cầu nhận thông báo:</strong> ' + esc(entry.date) + '</div>'
            + '<div>• <strong>Hạn nhận tiền bồi thường:</strong> ' + esc(deadlineText(entry.date)) + '</div></div>'
            + '<p style="margin:0 0 6px; text-align:left;"><strong>Lưu ý:</strong> Sau khi lưu không sửa lại được thông tin thông báo.</p>';
    }
    // Lưu thông tin thông báo (01 lần, không sửa sau khi lưu)
    function applyNotice(item, entry) {
        if (hasNotice(item)) { ntEditId = null; return; }
        item.noticeList = [entry];
        item.noticeReceivedDate = entry.date; item.noticeNote = entry.note; item.noticeFiles = entry.files;
        setLatest(item);
        var note = (entry.no ? 'Số thông báo ' + entry.no + '; ' : '') + 'Ngày người yêu cầu nhận thông báo ' + entry.date + '; Hạn nhận tiền bồi thường ' + deadlineText(entry.date) + '.';
        if (isTb(item)) kptbHist(item, 'Nhập thông báo chi trả', note);
        saveProposalsToLocal();
        ntEditId = null;
    }
    window.kpuxNoticeSave = function (id) {
        var item = kpdtFind(id); if (!item || hasNotice(item)) return;
        var entry = validateNotice(); if (!entry) return;
        // Hợp lệ: popup xác nhận; Hủy bỏ giữ nguyên dữ liệu đang nhập
        showConfirmModal(noticeConfirmHtml(entry) + '<p style="margin:0; text-align:left;">Bạn có chắc chắn muốn lưu thông tin thông báo chi trả tiền bồi thường?</p>', function () {
            applyNotice(item, entry);
            if (payId) refreshNotice(item); else renderProposalsTable();
            showToast(NT_SUCCESS, 'success');
        }, 'Xác nhận lưu thông báo chi trả tiền bồi thường');
    };

    // ================= 6. Trả lại ngân sách nhà nước (dạng màn hình chi tiết, mọi Loại kinh phí) =================
    var ffId = null;
    var FF_REASON = 'Người yêu cầu bồi thường đã quá thời hạn 03 năm kể từ ngày nhận thông báo chi trả nhưng không đến nhận tiền bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.';
    // Loại Tạm ứng kinh phí: không dùng từ "bồi thường" (trừ tên Luật)
    var FF_REASON_ADV = 'Người yêu cầu đã quá thời hạn 03 năm kể từ ngày nhận thông báo nhưng không đến nhận tiền tạm ứng theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.';
    // Khối Thông tin Trả lại ngân sách nhà nước (chỉ xem) cho Loại Tạm ứng kinh phí: cùng cấu trúc khối tại kpdtPayBody
    function sqCardHtml(item) {
        var g = '<div class="kpdt-grid">' + kpdtFld('Số chứng từ / quyết định trả lại ngân sách nhà nước', esc(item.treasuryVoucherNo)) + kpdtFld('Ngày trả lại ngân sách nhà nước', esc(item.treasuryForfeitDate))
            + kpdtFld('Số tiền trả lại ngân sách nhà nước (VNĐ)', item.treasuryAmount != null ? fmt(item.treasuryAmount) : '') + kpdtFld('Căn cứ / lý do trả lại ngân sách nhà nước', esc(item.treasuryReason), true)
            + '<div class="kpdt-full">' + kpdtDocsHtml(item.treasuryFile || []) + '</div></div>';
        return kpdtCard('fa-building-columns', 'Thông tin Trả lại ngân sách nhà nước', g);
    }
    function renderFfMode(item, body) {
        Array.prototype.forEach.call(body.querySelectorAll(':scope > .kpdt-card'), function (c) { c.classList.add('collapsed'); });
        var info = getTreasuryInfo(item);
        var adv = kpIsAdv(item);
        var html = '<div class="kpdt-card kpux-pay" id="kpuxFfCard"><div class="kpdt-card-head"><i class="fa-solid fa-building-columns"></i> Thông tin trả lại ngân sách nhà nước</div><div class="kpdt-card-body"><div class="kpux-form">'
            + '<div class="kpux-f"><span class="form-label">Ngày người yêu cầu nhận thông báo</span><div class="kpux-ro">' + esc(item.noticeReceivedDate || '-') + '</div></div>'
            + '<div class="kpux-f"><span class="form-label">' + (adv ? 'Hạn nhận tiền tạm ứng' : 'Hạn nhận tiền bồi thường') + '</span><div class="kpux-ro">' + esc(info.deadlineText || '-') + '</div></div>'
            + '<div class="kpux-f kpux-span2"><span class="form-label">Số tiền trả lại ngân sách nhà nước (VNĐ)</span><div class="kpux-ro">' + fmt(info.unpaid) + '</div></div>'
            + fld('kpuxFfNo', 'Số chứng từ / quyết định trả lại ngân sách nhà nước', true, '', 'maxlength="100" placeholder="Nhập số chứng từ..."')
            + fld('kpuxFfDate', 'Ngày trả lại ngân sách nhà nước', true, todayText(), 'placeholder="dd/mm/yyyy"')
            + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxFfReason">Căn cứ / lý do trả lại ngân sách nhà nước<span class="kpux-req">*</span></label><textarea class="form-control" id="kpuxFfReason" rows="3" maxlength="2000" placeholder="Nhập căn cứ, lý do trả lại ngân sách nhà nước..." oninput="kpuxClr(this)">' + esc(adv ? FF_REASON_ADV : FF_REASON) + '</textarea><div class="kpux-err" id="kpuxFfReasonErr">Đây là trường bắt buộc</div></div>'
            + '<div class="kpux-f kpux-full" id="kpuxFfTlkt"></div>'
            + '</div></div></div>';
        var hist = el('kpdtHistCard');
        if (hist && hist.parentNode === body) hist.insertAdjacentHTML('beforebegin', html); else body.insertAdjacentHTML('beforeend', html);
        if (typeof tlktMount === 'function') tlktMount('kpuxFf', 'kpuxFfTlkt', { required: false, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
        if (window.flatpickr) flatpickr('#kpuxFfDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date() });
        el('kpdtTitle').innerHTML = '<i class="fa-solid fa-building-columns"></i> CẬP NHẬT TRẢ LẠI NGÂN SÁCH NHÀ NƯỚC: ' + esc(item.code);
        el('kpdtFoot').innerHTML = '<button type="button" class="btn btn-secondary" onclick="kpuxFfCancel()"><i class="fa-solid fa-xmark"></i> Hủy</button>'
            + '<button type="button" class="btn btn-danger" onclick="kpuxFfSave()"><i class="fa-solid fa-building-columns"></i> Hoàn thành trả lại ngân sách nhà nước</button>';
    }
    window.kpuxOpenForfeit = function (id) {
        var item = kpdtFind(id); if (!item) return;
        if (!getTreasuryInfo(item).isEligible) { showToast('Khoản này chưa đủ điều kiện trả lại ngân sách nhà nước (chưa quá thời hạn 03 năm kể từ ngày người yêu cầu nhận thông báo).', 'warning'); return; }
        if (typeof kptbCloseView === 'function') kptbCloseView();
        ffId = item.id; payId = null; ntEditId = null; rcEditId = null;
        kpdtOpen(item.id, { kpuxKeep: true });
        setTimeout(function () { var c = el('kpuxFfCard'); if (!c) return; c.scrollIntoView({ block: 'start' }); var h = c.querySelector('.kpdt-card-head'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } } }, 30);
    };
    window.kpuxFfCancel = function () { var it = kpdtFind(ffId); ffId = null; if (it) { kpdtRender(it); window.scrollTo(0, 0); } };
    window.kpuxFfSave = function () {
        var item = kpdtFind(ffId); if (!item) return;
        var info = getTreasuryInfo(item);
        if (!info.isEligible) { showToast('Khoản chi này không còn đủ điều kiện trả lại ngân sách nhà nước.', 'warning'); return; }
        var v = function (id) { return el(id) ? el(id).value.trim() : ''; };
        var first = null;
        ['kpuxFfNo', 'kpuxFfDate', 'kpuxFfReason'].forEach(function (id) { if (!v(id)) { mark(id); if (!first) first = id; } });
        var d = parseDateViGlobal(v('kpuxFfDate'));
        if (v('kpuxFfDate') && (!d || d > today())) { mark('kpuxFfDate', d ? 'Ngày trả lại ngân sách nhà nước không được lớn hơn ngày hiện tại' : 'Ngày không hợp lệ, định dạng dd/mm/yyyy'); if (!first) first = 'kpuxFfDate'; }
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxFf') : true;
        if (first) { el(first).focus(); return; }
        if (!tlOk) return;
        var files = typeof tlktGet === 'function' ? tlktGet('kpuxFf') : [];
        var no = v('kpuxFfNo'), dt = v('kpuxFfDate'), reason = v('kpuxFfReason');
        showConfirmModal('Xác nhận hoàn thành thủ tục nộp toàn bộ số tiền ' + fmt(info.unpaid) + ' VNĐ của bản ghi ' + esc(item.code) + ' vào ngân sách nhà nước? Sau khi xác nhận, bản ghi chuyển trạng thái Trả lại ngân sách nhà nước.', function () {
            item.status = 'Trả lại ngân sách nhà nước';
            item.treasuryForfeitDate = dt; item.treasuryVoucherNo = no; item.treasuryAmount = info.unpaid; item.treasuryReason = reason; item.treasuryFile = files;
            item.payoutAmountReal = Math.max(0, (Number(item.amount) || 0) - info.unpaid);
            var note = 'Số chứng từ ' + no + '; ngày ' + dt + '; số tiền ' + fmt(info.unpaid) + ' đồng.';
            if (isTb(item)) kptbHist(item, 'Trả lại ngân sách nhà nước', note); else if (isQd(item)) qdtuHist(item, 'Trả lại ngân sách nhà nước', note);
            saveProposalsToLocal();
            if (typeof kpTlnsCompleteClaim === 'function') kpTlnsCompleteClaim(item, dt, info.unpaid);
            ffId = null;
            renderProposalsTable();
            if (typeof updateBudgetStats === 'function') updateBudgetStats();
            window.scrollTo(0, 0);
            showToast('Cập nhật trả lại ngân sách nhà nước thành công cho bản ghi ' + item.code + '!', 'success');
        }, 'Xác nhận hoàn thành thủ tục trả lại ngân sách nhà nước');
    };

    // ================= 7. Khối Thu hồi kinh phí + màn Cập nhật kết quả thu hồi (Chờ thu hồi) =================
    var rcEditId = null;   // bản ghi đang ở chế độ Cập nhật kết quả thu hồi
    function rcBasis(item) { var r = item.recovery || {}; var b = item.statusChangeBasis || item.statusBasis || {}; return { no: r.basisDecisionNo || b.decisionNo || '', date: r.basisDecisionDate || b.decisionDate || '', type: b.decisionType || '' }; }
    function rcPaid(item) { return Number(item.payoutAmountReal) || Number((item.kptbPayment || {}).amount) || 0; }
    // Số tiền phải thu hồi: hệ thống tự tính theo căn cứ thu hồi
    // - Đình chỉ giải quyết / Dừng giải quyết / Hủy Quyết định giải quyết: bằng Số tiền đã chi thực tế
    // - Quyết định sửa chữa, bổ sung giảm số tiền: Số tiền đã chi thực tế trừ Số tiền theo Quyết định sau sửa chữa, bổ sung (phần chi thừa)
    // - Căn cứ khác: Số tiền phải thu hồi đã ghi nhận theo căn cứ; chưa có thì bằng Số tiền đã chi thực tế
    function rcCalc(item) {
        var r = item.recovery || {}, sb = item.statusBasis || {}, cb = item.statusChangeBasis || {};
        var paid = rcPaid(item);
        var txt = (cb.decisionType || sb.decisionType || '') + ' ' + (r.basisDecisionNo || cb.decisionNo || sb.decisionNo || '');
        var kind = sb.source === 'dinhChi' ? 'dinhChi' : (sb.source === 'dungGiaiQuyet' ? 'dungGQ' : (/sửa chữa|SCBS/i.test(txt) ? 'suaChua' : (/hủy|HQĐ/i.test(txt) ? 'huy' : 'khac')));
        if (kind === 'suaChua') {
            var after = r.amountAfter != null ? Number(r.amountAfter) : (cb.amountAfter != null ? Number(cb.amountAfter) : (r.amountToRecover != null ? Math.max(0, paid - Number(r.amountToRecover)) : 0));
            var need = Math.max(0, paid - after);
            return { kind: kind, paid: paid, after: after, need: need, formula: 'Số tiền đã chi thực tế ' + fmt(paid) + ' − Số tiền theo Quyết định sau sửa chữa, bổ sung ' + fmt(after) + ' = ' + fmt(need) + ' đồng (phần chi thừa)' };
        }
        if (kind === 'khac' && r.amountToRecover != null) return { kind: kind, paid: paid, need: Number(r.amountToRecover), formula: 'Theo căn cứ thu hồi: ' + fmt(r.amountToRecover) + ' đồng' };
        var why = { dinhChi: 'đình chỉ giải quyết', dungGQ: 'dừng giải quyết', huy: 'hủy Quyết định giải quyết', khac: 'căn cứ thu hồi' }[kind];
        return { kind: kind, paid: paid, need: paid, formula: 'Bằng Số tiền đã chi thực tế ' + fmt(paid) + ' đồng (thu hồi toàn bộ do ' + why + ')' };
    }
    function rcData(item) {
        var r = item.recovery || {};
        var c = rcCalc(item);
        var legacy = Number(r.amountRecovered) || 0;
        // Các lần thu hồi: dữ liệu cũ (01 lần ghi nhận) quy đổi thành Lần 1
        var hist = Array.isArray(r.history) ? r.history : (legacy > 0 ? [{ date: r.recordDate || '', amount: legacy, method: r.method || '', note: r.note || '', files: r.files || [] }] : []);
        var got = hist.reduce(function (s, h) { return s + (Number(h && h.amount) || 0); }, 0);
        return { need: c.need, paid: c.paid, formula: c.formula, got: got, remain: Math.max(0, c.need - got), hist: hist };
    }
    function rcVisible(item) { return !!item.recovery || kpNormStatus(item.status) === 'Chờ thu hồi'; }
    function rcCardHtml(item) {
        var d = rcData(item), b = rcBasis(item);
        if (!b.type && rcCalc(item).kind === 'suaChua') b.type = 'Quyết định sửa chữa, bổ sung Quyết định giải quyết bồi thường';
        var editing = rcEditId === item.id;
        var basis = b.no ? '<a href="javascript:void(0)" style="color:var(--primary-light); text-decoration:underline;" onclick="showToast(\'Giả lập mở chi tiết Quyết định ' + esc(b.no) + '\', \'info\')">' + esc(b.no) + (b.date ? ' ngày ' + esc(b.date) : '') + '</a>' + (b.type ? '<div class="kpdt-words" style="font-style:normal;">' + esc(b.type) + '</div>' : '') : '';
        var needHtml = '<b>' + fmt(d.need) + '</b><div class="kpdt-words" id="kpuxRcFormula" style="font-style:normal;">' + esc(d.formula) + '</div>';
        var view = '<div class="kpdt-grid">' + kpdtFld('Căn cứ thu hồi', basis) + kpdtFld('Số tiền phải thu hồi (VNĐ)', needHtml) + kpdtFld('Số tiền đã thu hồi lũy kế (VNĐ)', fmt(d.got)) + kpdtFld('Số tiền còn phải thu hồi (VNĐ)', '<span id="kpuxRcRemain">' + fmt(d.remain) + '</span>') + '</div>';
        if (d.hist.length) {
            view += '<div class="kpdt-docs-title" style="margin-top:12px;"><i class="fa-solid fa-list-ol"></i> Các lần thu hồi</div><div class="kpdt-docs-wrap"><table class="kpdt-docs" id="kpuxRcHistTbl"><thead><tr><th class="c" style="width:56px;">Lần</th><th class="c" style="width:110px;">Ngày thu hồi</th><th style="text-align:right; width:150px;">Số tiền thu hồi (VNĐ)</th><th style="width:130px;">Hình thức nộp trả</th><th>Diễn giải</th><th>Tài liệu đính kèm</th></tr></thead><tbody>'
                + d.hist.map(function (h, i) { return '<tr><td class="c">' + (i + 1) + '</td><td class="c">' + esc(h.date || '-') + '</td><td style="text-align:right;">' + fmt(h.amount) + '</td><td>' + esc(h.method || '-') + '</td><td>' + esc(h.note || '-') + '</td><td>' + (esc(docNames(h.files || []).join(', ')) || '-') + '</td></tr>'; }).join('')
                + '<tr class="kpux-rc-total" style="font-weight:700; background:#f8fafc;"><td class="c" colspan="2">Tổng</td><td style="text-align:right;">' + fmt(d.got) + '</td><td colspan="3">Còn phải thu hồi: ' + fmt(d.remain) + ' đồng</td></tr>'
                + '</tbody></table></div>';
        }
        var form = '';
        if (editing && d.remain > 0) {
            form = '<div class="kpux-form" style="margin-top:14px; padding-top:12px; border-top:1px dashed #e2e8f0;">'
                + '<div class="kpux-sub">Lần thu hồi thứ ' + (d.hist.length + 1) + '</div>'
                + '<div class="kpux-f kpux-full" id="kpuxRcHint" style="color:#475569; font-size:13px;">Số tiền còn phải thu hồi: <b>' + fmt(d.remain) + '</b> đồng</div>'
                + fld('kpuxRcDate', 'Ngày thu hồi', true, todayText(), 'placeholder="dd/mm/yyyy"')
                + fld('kpuxRcAmount', 'Số tiền thu hồi lần này (VNĐ)', true, '', 'maxlength="20" style="text-align:right;" oninput="formatNumberInput(this); kpuxClr(this); kpuxRcSync()" placeholder="Nhập số tiền thu hồi lần này..."')
                + '<div class="kpux-f kpux-span2"><span class="form-label">Hình thức nộp trả<span class="kpux-req">*</span></span><div class="kpux-radios" id="kpuxRcMethod">'
                + '<label><input type="radio" name="kpuxRcMethod" value="Chuyển khoản" onchange="kpuxRcMethodClr()"> Chuyển khoản</label>'
                + '<label><input type="radio" name="kpuxRcMethod" value="Tiền mặt" onchange="kpuxRcMethodClr()"> Tiền mặt</label></div><div class="kpux-err" id="kpuxRcMethodErr">Đây là trường bắt buộc</div></div>'
                + '<div class="kpux-f kpux-full"><label class="form-label" for="kpuxRcNote">Diễn giải</label><textarea class="form-control" id="kpuxRcNote" rows="2" maxlength="1000" placeholder="Nhập diễn giải lần thu hồi..."></textarea></div>'
                + '<div class="kpux-f kpux-full" id="kpuxRcTlkt"></div></div>';
        } else if (editing) {
            form = '<div class="kpdt-hint" id="kpuxRcFullHint" style="margin-top:12px;">Đã thu hồi đủ Số tiền phải thu hồi. Bấm <b>Hoàn thành thu hồi</b> để chuyển bản ghi sang Đã thu hồi.</div>';
        }
        return '<div class="kpdt-card' + (editing ? ' kpux-pay' : '') + '" id="kpuxRcCard"><div class="kpdt-card-head"><i class="fa-solid fa-rotate-left"></i> Thu hồi kinh phí</div><div class="kpdt-card-body">' + view + form + '</div></div>';
    }
    window.kpuxRcMethodClr = function () { var e = el('kpuxRcMethodErr'); if (e) e.classList.remove('on'); };
    window.kpuxOpenRc = function (id) {
        var item = kpdtFind(id); if (!item) return;
        if (kpNormStatus(item.status) !== 'Chờ thu hồi') { showToast('Chỉ Cập nhật thu hồi với bản ghi Chờ thu hồi.', 'warning'); return; }
        rcEditId = item.id; payId = null; ffId = null; ntEditId = null;
        kpdtOpen(item.id, { kpuxKeep: true });
        setTimeout(rcFocus, 30);
    };
    function rcFocus() { var c = el('kpuxRcCard'); if (!c) return; c.scrollIntoView({ block: 'start' }); var h = c.querySelector('.kpdt-card-head'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } } }
    window.kpuxRcEdit = window.kpuxOpenRc;
    window.kpuxRcCancel = function () { var it = kpdtFind(rcEditId); rcEditId = null; if (it) { kpdtRender(it); window.scrollTo(0, 0); } };
    function rcAmt() { var i = el('kpuxRcAmount'); return i ? (parseFloat(i.value.replace(/\D/g, '')) || 0) : 0; }
    // Trạng thái 02 nút Footer: Lưu lần thu hồi (còn phải thu hồi > 0); Hoàn thành thu hồi (lũy kế, gồm số đang nhập, bằng Số tiền phải thu hồi)
    window.kpuxRcSync = function () {
        var item = kpdtFind(rcEditId); if (!item) return;
        var d = rcData(item), amt = rcAmt();
        var left = d.remain - amt;
        var ok = d.need > 0 && amt <= d.remain && left === 0;
        var bd = el('kpuxRcDoneBtn');
        if (bd) {
            bd.style.opacity = ok ? '' : '0.5'; bd.style.cursor = ok ? '' : 'not-allowed'; bd.setAttribute('aria-disabled', ok ? 'false' : 'true');
            bd.title = ok ? 'Hoàn thành thu hồi: chuyển bản ghi sang Đã thu hồi' : (amt > d.remain ? 'Số tiền thu hồi lần này vượt quá Số tiền còn phải thu hồi (' + fmt(d.remain) + ' đồng)' : 'Còn phải thu hồi ' + fmt(Math.max(0, left)) + ' đồng');
        }
        var bs = el('kpuxRcSaveBtn');
        if (bs) { var on = d.remain > 0; bs.style.opacity = on ? '' : '0.5'; bs.style.cursor = on ? '' : 'not-allowed'; bs.setAttribute('aria-disabled', on ? 'false' : 'true'); bs.title = on ? 'Lưu lần thu hồi' : 'Đã thu hồi đủ, không còn số tiền phải thu hồi'; }
    };
    // Kiểm tra form lần thu hồi; trả về entry hợp lệ hoặc null
    function rcEntry(item) {
        var d = rcData(item);
        var v = function (x) { return el(x) ? el(x).value.trim() : ''; };
        var first = null;
        ['kpuxRcDate', 'kpuxRcAmount'].forEach(function (x) { if (!v(x)) { mark(x); if (!first) first = x; } });
        var dd = parseDateViGlobal(v('kpuxRcDate'));
        if (v('kpuxRcDate') && (!dd || dd > today())) { mark('kpuxRcDate', dd ? 'Ngày thu hồi không được lớn hơn ngày hiện tại' : 'Ngày không hợp lệ, định dạng dd/mm/yyyy'); if (!first) first = 'kpuxRcDate'; }
        var amt = rcAmt();
        if (v('kpuxRcAmount') && amt <= 0) { mark('kpuxRcAmount', 'Số tiền thu hồi lần này phải lớn hơn 0'); if (!first) first = 'kpuxRcAmount'; }
        if (v('kpuxRcAmount') && amt > d.remain) { mark('kpuxRcAmount', 'Số tiền thu hồi lần này không được vượt quá Số tiền còn phải thu hồi (' + fmt(d.remain) + ' đồng)'); if (!first) first = 'kpuxRcAmount'; }
        var m = document.querySelector('input[name="kpuxRcMethod"]:checked');
        if (!m) { var e = el('kpuxRcMethodErr'); if (e) { e.textContent = 'Đây là trường bắt buộc'; e.classList.add('on'); } if (!first) first = 'kpuxRcMethod'; }
        var tlOk = typeof tlktValidate === 'function' ? tlktValidate('kpuxRc') : true;
        if (first) { var f = first === 'kpuxRcMethod' ? document.querySelector('input[name="kpuxRcMethod"]') : el(first); if (f) f.focus(); return null; }
        if (!tlOk) return null;
        return { date: v('kpuxRcDate'), amount: amt, method: m.value, note: v('kpuxRcNote'), files: typeof tlktGet === 'function' ? tlktGet('kpuxRc') : [] };
    }
    // Ghi 01 lần thu hồi vào bản ghi (không đổi trạng thái)
    function rcPush(item, entry) {
        var d = rcData(item), b = rcBasis(item);
        var r = item.recovery || (item.recovery = { basisDecisionNo: b.no, basisDecisionDate: b.date, files: [] });
        if (!Array.isArray(r.history)) r.history = d.hist.slice();
        r.history.push(entry);
        r.amountToRecover = d.need;
        r.amountRecovered = d.got + entry.amount;
        r.amountRemain = Math.max(0, d.need - r.amountRecovered);
        r.recordDate = entry.date; r.method = entry.method; r.note = entry.note || r.note || '';
        r.files = (r.files || []).concat(entry.files || []);
        rcHist(item, 'Cập nhật thu hồi', 'Lần ' + r.history.length + '; ngày ' + entry.date + '; số tiền ' + fmt(entry.amount) + ' đồng; ' + entry.method + '; lũy kế ' + fmt(r.amountRecovered) + ' đồng; còn phải thu hồi ' + fmt(r.amountRemain) + ' đồng.');
        return r;
    }
    function rcHist(item, act, note) { if (isTb(item)) kptbHist(item, act, note); else if (isQd(item)) qdtuHist(item, act, note); }
    // Lưu lần thu hồi: lưu 01 lần (một phần hoặc đủ), bản ghi giữ Chờ thu hồi; ở lại Chế độ Cập nhật thu hồi để nhập lần tiếp theo / Hoàn thành thu hồi
    window.kpuxRcSave = function () {
        var item = kpdtFind(rcEditId); if (!item) return;
        if (rcData(item).remain <= 0) { showToast('Đã thu hồi đủ Số tiền phải thu hồi. Bấm Hoàn thành thu hồi để chuyển Đã thu hồi.', 'warning'); return; }
        var entry = rcEntry(item); if (!entry) return;
        var r = rcPush(item, entry);
        saveProposalsToLocal();
        renderProposalsTable();
        if (kpdtIsOpen()) kpdtRender(item);
        setTimeout(rcFocus, 30);
        showToast(r.amountRemain === 0 ? 'Lưu lần thu hồi thành công. Đã thu hồi đủ ' + fmt(r.amountToRecover) + ' đồng, bấm Hoàn thành thu hồi để chuyển Đã thu hồi.' : 'Lưu lần thu hồi thành công. Còn phải thu hồi ' + fmt(r.amountRemain) + ' đồng.', 'success');
    };
    // Hoàn thành thu hồi: chỉ khi lũy kế (gồm số đang nhập) bằng Số tiền phải thu hồi; popup xác nhận -> lưu lần đang nhập (nếu có) và chuyển Đã thu hồi
    window.kpuxRcDone = function () {
        var item = kpdtFind(rcEditId); if (!item) return;
        var d = rcData(item), amt = rcAmt();
        if (!(d.need > 0 && amt <= d.remain && d.remain - amt === 0)) { showToast('Chưa thu hồi đủ. Còn phải thu hồi ' + fmt(Math.max(0, d.remain - amt)) + ' đồng.', 'warning'); return; }
        var entry = null;
        if (amt > 0) { entry = rcEntry(item); if (!entry) return; }
        var total = d.got + (entry ? entry.amount : 0);
        var html = '<div style="text-align:left; font-size:13.5px; color:#334155;"><div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:12px; margin-bottom:12px; line-height:1.6;">'
            + '<div>• <strong>Mã kinh phí:</strong> ' + esc(item.code) + '</div>'
            + '<div>• <strong>Số tiền phải thu hồi:</strong> ' + fmt(d.need) + ' VNĐ</div>'
            + '<div>• <strong>Số tiền đã thu hồi lũy kế:</strong> ' + fmt(total) + ' VNĐ (' + (d.hist.length + (entry ? 1 : 0)) + ' lần' + (entry ? ', gồm lần đang nhập ' + fmt(entry.amount) + ' VNĐ' : '') + ')</div>'
            + '<div>• <strong>Số tiền còn phải thu hồi:</strong> 0 VNĐ</div></div>'
            + '<p style="margin:0;">Xác nhận hoàn thành thu hồi? Sau khi xác nhận, bản ghi chuyển trạng thái <strong>Đã thu hồi</strong> và không cập nhật thu hồi được nữa.</p></div>';
        showConfirmModal(html, function () {
            var r = entry ? rcPush(item, entry) : (item.recovery || (item.recovery = {}));
            r.amountToRecover = d.need; r.amountRecovered = total; r.amountRemain = 0; r.completedAt = todayText();
            item.status = 'Đã thu hồi';
            rcHist(item, 'Hoàn thành thu hồi', 'Số tiền phải thu hồi ' + fmt(d.need) + ' đồng; đã thu hồi lũy kế ' + fmt(total) + ' đồng.');
            saveProposalsToLocal();
            rcEditId = null;
            renderProposalsTable();
            window.scrollTo(0, 0);
            showToast('Hoàn thành thu hồi. Bản ghi ' + item.code + ' chuyển Đã thu hồi.', 'success');
        }, 'Xác nhận hoàn thành thu hồi');
    };
    // Khối bổ sung trên màn chi tiết: Thông tin Trả lại ngân sách nhà nước (Tạm ứng), Thu hồi kinh phí; chế độ Cập nhật kết quả thu hồi
    function extraCards(item, body) {
        var hist = el('kpdtHistCard');
        var add = function (html) { if (hist && hist.parentNode === body) hist.insertAdjacentHTML('beforebegin', html); else body.insertAdjacentHTML('beforeend', html); };
        if (kpIsAdv(item) && kpNormStatus(item.status) === 'Trả lại ngân sách nhà nước') add(sqCardHtml(item));
        if (rcVisible(item)) add(rcCardHtml(item));
        Array.prototype.slice.call(body.querySelectorAll(':scope > .kpdt-card')).forEach(function (c) { if (c.id !== 'kpdtHistCard') makeToggle(c); });
        if (rcEditId === item.id && el('kpuxRcCard')) {
            Array.prototype.forEach.call(body.querySelectorAll(':scope > .kpdt-card'), function (c) { if (c.id !== 'kpuxRcCard') c.classList.add('collapsed'); });
            if (el('kpuxRcTlkt') && typeof tlktMount === 'function') tlktMount('kpuxRc', 'kpuxRcTlkt', { required: false, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
            if (el('kpuxRcDate') && window.flatpickr) flatpickr('#kpuxRcDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: new Date() });
            el('kpdtTitle').innerHTML = '<i class="fa-solid fa-rotate-left"></i> CẬP NHẬT THU HỒI: ' + esc(item.code);
            // Footer: Hủy, Lưu lần thu hồi, Hoàn thành thu hồi (mờ khi chưa thu hồi đủ, tooltip "Còn phải thu hồi X đồng")
            el('kpdtFoot').innerHTML = '<button type="button" class="btn btn-secondary" onclick="kpuxRcCancel()"><i class="fa-solid fa-xmark"></i> Hủy</button>'
                + '<button type="button" class="btn btn-primary" id="kpuxRcSaveBtn" onclick="kpuxRcSave()"><i class="fa-solid fa-floppy-disk"></i> Lưu lần thu hồi</button>'
                + '<button type="button" class="btn btn-success" id="kpuxRcDoneBtn" onclick="kpuxRcDone()"><i class="fa-solid fa-circle-check"></i> Hoàn thành thu hồi</button>';
            window.kpuxRcSync();
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
            var cls = ld ? (a.t === 'Từ chối' ? 'btn-danger' : 'btn-primary') : (a.t === 'Cập nhật chi trả' || a.t === 'Cập nhật thu hồi' ? 'btn-success' : (a.t === 'Trả lại ngân sách nhà nước' ? 'btn-danger' : (a.t === 'Đề nghị cấp bổ sung kinh phí' ? 'btn-secondary' : 'btn-primary')));
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
    // Tài liệu đính kèm chế độ xem: không có dữ liệu thì không hiển thị bảng
    var origDocs = kpdtDocsHtml;
    kpdtDocsHtml = function (list) { return kpdtDocsNorm(list).length ? origDocs.apply(this, arguments) : ''; };
    // Ký ngoài: không còn thao tác Đính kèm văn bản đã ký
    if (typeof kpNeedsSignedFile === 'function') kpNeedsSignedFile = function () { return false; };
    // Cập nhật chi trả: mọi điểm gọi dùng chung màn hình chi tiết
    payProposalDirect = function (id) { window.kpuxOpenPay(id); };
    if (typeof kptbOpenPay === 'function') kptbOpenPay = function (id) { window.kpuxOpenPay(id); };
    // Mã vụ việc của dữ liệu giả lập bổ sung (vvCode) khi không tra được theo Mã hồ sơ
    if (typeof kpdtVv === 'function') { var origVv = kpdtVv; kpdtVv = function (code) { var r = origVv.apply(this, arguments); if (r) return r; var p = proposalsList.find(function (x) { return x && x.ycbtCode === code && x.vvCode; }); return p ? p.vvCode : ''; }; }
    // Trả lại ngân sách nhà nước: mọi điểm gọi dùng chung màn hình chi tiết
    forfeitProposalDirect = function (id) { window.kpuxOpenForfeit(id); };
    if (typeof kptbOpenForfeit === 'function') kptbOpenForfeit = function (id) { window.kpuxOpenForfeit(id); };
    var origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () { var r = origSync.apply(this, arguments); sanitize(); return r; };
    var origRender = renderProposalsTable;
    renderProposalsTable = function () { var r = origRender.apply(this, arguments); decorateTable(); return r; };
    var boot = function () { try { sanitize(); decorateTable(); if (kpdtIsOpen()) { var it = kpdtFind(kpdtCurId); if (it) kpdtRender(it); } } catch (e) { console.error(e); } };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 0); }); else setTimeout(boot, 0);
})();
