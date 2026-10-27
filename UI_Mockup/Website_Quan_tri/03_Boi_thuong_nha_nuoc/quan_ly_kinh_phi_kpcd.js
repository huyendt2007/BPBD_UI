/*
 * Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Màn hình Tạo thông báo chi trả (Mẫu số 32/BTNN)
 * - Nút "Tạo thông báo chi trả" (MH01) -> màn hình tạo (bố cục như Tạo Quyết định tạm ứng).
 * - Khối Tìm kiếm / Tìm kiếm nâng cao Quyết định giải quyết bồi thường: chỉ QĐ "Đã ban hành" VÀ hồ sơ GQBT "Chờ chi trả".
 *   Nguồn QĐ: kho 'btnn_qd_gqbt_v2' của màn hình Quyết định giải quyết bồi thường (+ dữ liệu mẫu KPCD_SEED_DECS khi kho chưa có).
 * - Chọn QĐ -> hiển thị các khối: Thông tin người yêu cầu, Phương thức chi trả (theo QĐ), Tài liệu kèm theo.
 * - Tiếp tục -> Popup Trình ký thông báo chi trả (kptbOpenSign với bản ghi nháp) -> Trình: "Chờ duyệt", Loại trình "Thông báo chi trả".
 * - Chặn trùng: QĐ đã có Thông báo chi trả Chờ duyệt / Chờ chi trả / Hoàn thành / Trả lại ngân sách nhà nước (MSG-ERR-BTNN-KP-013).
 *   QĐ đã có bản ghi "Chờ thông báo chi trả" / "Đề nghị cấp bổ sung kinh phí" / "Bị từ chối": dùng lại chính bản ghi đó (không tạo trùng).
 * Id/hàm prefix kpcd. Mockup tĩnh: chỉ kiểm tra trống trường bắt buộc.
 */
const KPCD_DEC_KEY = 'btnn_qd_gqbt_v2';
const KPCD_DEC_ISSUED = 'Đã ban hành';
const KPCD_CLAIM_WAIT = 'Chờ chi trả';
const KPCD_TB_DUP_ST = ['Chờ duyệt', 'Chờ chi trả', 'Hoàn thành', 'Trả lại ngân sách nhà nước'];
// Dữ liệu mẫu Quyết định GQBT (dùng khi kho Quyết định chưa có); kpcdClaimStatus: trạng thái hồ sơ GQBT khi claimsList chưa có hồ sơ
const KPCD_SEED_DECS = [
    { id: 'KPCD-QD-01', claimCode: 'BT-2026-041', nycName: 'Trần Quốc Bảo', nycAddress: 'Số 18 ngõ 61 Lạc Trung, Phường Vĩnh Tuy, Thành phố Hà Nội', nbth: 'Trần Quốc Bảo', unitId: 'STP-HN', unitName: 'Sở Tư pháp Thành phố Hà Nội', status: 'Đã ban hành', decNo: '41/QĐ-STP', issueDate: '18/10/2026', total: 130000000, advance: 0, net: 130000000,
        recipient: { name: 'Trần Quốc Bảo', idNo: '001088007711', account: '0011009988776', bank: 'Vietcombank', branch: 'Chi nhánh Hà Nội' },
        payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Trần Quốc Bảo', account: '0011009988776', bank: 'Vietcombank', branch: 'Chi nhánh Hà Nội' }, kpcdClaimStatus: 'Chờ chi trả' },
    { id: 'KPCD-QD-02', claimCode: 'BT-2026-042', nycName: 'Ngô Thị Thanh Tâm', nycAddress: 'Số 7 phố Lò Đúc, Phường Hai Bà Trưng, Thành phố Hà Nội', nbth: 'Ngô Văn Hùng (chồng)', unitId: 'STP-HN', unitName: 'Sở Tư pháp Thành phố Hà Nội', status: 'Đã ban hành', decNo: '42/QĐ-STP', issueDate: '20/10/2026', total: 95000000, advance: 20000000, net: 75000000,
        recipient: { name: 'Ngô Thị Thanh Tâm', idNo: '001190004433' },
        payout: { method: 'Nhận tiền mặt', cashPlace: 'Sở Tư pháp Thành phố Hà Nội', cashNote: 'Nhận tiền mặt tại Phòng Kế hoạch - Tài chính' }, kpcdClaimStatus: 'Chờ chi trả' },
    { id: 'KPCD-QD-03', claimCode: 'BT-2026-043', nycName: 'Lương Văn Đức', nycAddress: 'Số 2 phố Tràng Thi, Phường Hoàn Kiếm, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Thành phố Hà Nội', status: 'Chờ duyệt', decNo: '', issueDate: '', total: 60000000, advance: 0, net: 60000000,
        recipient: { name: 'Lương Văn Đức', idNo: '001079003322' }, payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Lương Văn Đức', account: '0451000556677', bank: 'Vietinbank' }, kpcdClaimStatus: 'Chờ ban hành QĐ' }
];

function kpcdEl(id) { return document.getElementById(id); }
function kpcdEsc(v) { return kpEsc(v); }
function kpcdW() { return window.BTNN_WF || null; }
function kpcdReadJson(key, fb) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
function kpcdTbVv(code) { const W = kpcdW(); try { return (W && W.vuViecOf && W.vuViecOf(code, { create: false })) || ''; } catch (e) { return ''; } }
function kpcdUnitName(d) { const W = kpcdW(); return (d && d.unitId && W ? W.unitName(d.unitId) : '') || (d && d.unitName) || ''; }
function kpcdIsCashMethod(m) { return /tiền mặt/i.test(String(m || '')); }

// ---------------- Dữ liệu Quyết định GQBT ----------------
function kpcdAllDecs() {
    const raw = kpcdReadJson(KPCD_DEC_KEY, []);
    const list = (Array.isArray(raw) ? raw : []).filter(d => d && d.id && d.claimCode);
    KPCD_SEED_DECS.forEach(s => { if (!list.some(d => d.id === s.id)) list.push(JSON.parse(JSON.stringify(s))); });
    return list;
}
function kpcdClaim(code) {
    const list = kpcdReadJson('claimsList', []);
    return Array.isArray(list) ? list.find(c => c && c.code === code) || null : null;
}
// Trạng thái hồ sơ GQBT của Quyết định: theo claimsList; chưa có hồ sơ thì theo dữ liệu mẫu
function kpcdClaimStatus(d) { const c = kpcdClaim(d.claimCode); return (c && c.status) || d.kpcdClaimStatus || ''; }
function kpcdNbth(d) { const c = kpcdClaim(d.claimCode); return (c && (c.nbth || c.nbthName)) || d.nbth || d.nycName || ''; }
function kpcdNycName(d) { const c = kpcdClaim(d.claimCode); return d.nycName || (c && (c.nyc || c.nycName)) || ''; }
// Chỉ Quyết định "Đã ban hành" VÀ hồ sơ GQBT "Chờ chi trả" (áp dụng cho ô tìm nhanh và Tìm kiếm nâng cao)
function kpcdEligibleDecs() {
    return kpcdAllDecs().filter(d => d.status === KPCD_DEC_ISSUED && kpcdClaimStatus(d) === KPCD_CLAIM_WAIT && !/^PHDD-/i.test(d.claimCode));
}
function kpcdFindDec(val) {
    const v = String(val || '').trim().toLowerCase();
    if (!v) return null;
    return kpcdEligibleDecs().find(d => d.claimCode.toLowerCase() === v || String(d.decNo || '').toLowerCase() === v || d.id.toLowerCase() === v) || null;
}
// Thông báo chi trả đã có của Quyết định (theo Quyết định; Quyết định cũ không có decId thì theo Mã hồ sơ)
function kpcdTbOf(d, statuses) {
    return proposalsList.find(p => p && kptbIs(p) && (p.decId === d.id || (!p.decId && p.ycbtCode === d.claimCode)) && statuses.includes(kpNormStatus(p.status))) || null;
}

// ---------------- CSS ----------------
function kpcdInjectCss() {
    if (typeof qdtuInjectCss === 'function') qdtuInjectCss();
    if (typeof kptbInjectCss === 'function') kptbInjectCss();
    if (kpcdEl('kpcdCss')) return;
    const st = document.createElement('style');
    st.id = 'kpcdCss';
    st.textContent = (typeof QDTU_PAGE_CSS === 'string' ? QDTU_PAGE_CSS.replace(/#qdtuPanel/g, '#kpcdTbPanel') : '') + '\n'
        + '#kpcdTbPanel .kpcd-hide { display:none; }\n#kpcdTbPanel .tlkt-sec { margin:0; border:0; padding:0; }\n'
        + '#kpcdTbPanel .qdtu-ro { font-weight:500; }';
    document.head.appendChild(st);
}

// =====================================================================================
// MÀN HÌNH TẠO THÔNG BÁO CHI TRẢ TIỀN BỒI THƯỜNG
// =====================================================================================
let kpcdTbState = { decId: '' };
function kpcdFld(id, label, req, control, extraCls) {
    return `<div class="form-group${extraCls ? ' ' + extraCls : ''}"><span class="form-label">${label}${req ? '<span class="required">*</span>' : ''}</span>${control}${req ? `<div class="qdtu-gqx-err" id="${id}Err">Đây là trường bắt buộc</div>` : ''}</div>`;
}
function kpcdRo(id, label, extraCls) { return `<div class="form-group${extraCls ? ' ' + extraCls : ''}"><span class="form-label">${label}</span><div class="qdtu-ro" id="${id}">--</div></div>`; }
function kpcdInput(id, max, ph) { return `<input type="text" class="form-control" id="${id}" maxlength="${max}" placeholder="${ph || ''}" oninput="qdtuMark('${id}', false)">`; }
function kpcdTbEnsurePage() {
    kpcdInjectCss();
    if (kpcdEl('kpcdTbPanel')) return;
    const p = document.createElement('div');
    p.id = 'kpcdTbPanel';
    p.className = 'inline-form-panel';
    p.style.display = 'none';
    p.innerHTML = `<div class="inline-form-header"><span class="inline-form-title"><i class="fa-solid fa-file-invoice-dollar"></i> TẠO THÔNG BÁO CHI TRẢ TIỀN BỒI THƯỜNG</span></div>
    <div class="inline-form-body" style="background:#F8FAFC; max-height:none;">
        <div class="qdtu-card">
            <div class="qdtu-card-head"><i class="fa-solid fa-scale-balanced"></i> Quyết định giải quyết bồi thường</div>
            <div class="qdtu-card-body"><div class="qdtu-grid">
                <div class="form-group"><span class="form-label">Mã hồ sơ giải quyết bồi thường / Số quyết định<span class="required">*</span></span>
                    <div style="display:flex; gap:8px; align-items:center;">
                        <input type="text" class="form-control" id="kpcdTbDecInput" list="kpcdTbDecDatalist" autocomplete="off" placeholder="Nhập hoặc chọn mã hồ sơ GQBT / số quyết định..." style="flex:1;" oninput="qdtuMark('kpcdTbDecInput', false)" onchange="kpcdTbOnPick(this.value)"><datalist id="kpcdTbDecDatalist"></datalist>
                        <button type="button" class="btn btn-primary" id="kpcdTbBtnSearch" onclick="kpcdTbSearch()" style="height:38px; padding:0 16px; font-weight:600; display:inline-flex; align-items:center; gap:6px; white-space:nowrap;"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                        <button type="button" class="btn btn-secondary" id="kpcdTbBtnAdv" onclick="kpcdTbOpenLookup()" style="height:38px; padding:0 16px; font-weight:600; display:inline-flex; align-items:center; gap:6px; white-space:nowrap;"><i class="fa-solid fa-magnifying-glass-plus"></i> Tìm kiếm nâng cao</button>
                    </div>
                    <div class="qdtu-gqx-err" id="kpcdTbDecInputErr">Đây là trường bắt buộc</div>
                    <div id="kpcdTbDecBadge" style="display:none; margin-top:8px;"><span class="badge badge-pending" id="kpcdTbDecBadgeText" style="font-size:12.5px; padding:6px 12px; border-radius:6px;"></span></div>
                </div>
                <div class="form-group" id="kpcdTbUnitGroup" style="display:none;"><span class="form-label">Cơ quan giải quyết bồi thường</span><div class="qdtu-ro" id="kpcdTbUnitText">--</div></div>
            </div></div>
        </div>
        <div class="qdtu-empty" id="kpcdTbEmptyHint"><i class="fa-solid fa-circle-info"></i> Chọn Quyết định giải quyết bồi thường để hệ thống tự động điền thông tin theo Quyết định.</div>
        <div id="kpcdTbInfoCards" style="display:none;">
            <div class="qdtu-card">
                <div class="qdtu-card-head"><i class="fa-solid fa-user"></i> Thông tin người yêu cầu</div>
                <div class="qdtu-card-body"><div class="qdtu-grid">
                    ${kpcdFld('kpcdTbNycName', 'Họ và tên', true, kpcdInput('kpcdTbNycName', 255, 'Nhập họ và tên'))}
                    ${kpcdFld('kpcdTbNycAddress', 'Địa chỉ chi tiết', true, kpcdInput('kpcdTbNycAddress', 1000, 'Nhập địa chỉ chi tiết'))}
                </div></div>
            </div>
            <div class="qdtu-card">
                <div class="qdtu-card-head"><i class="fa-solid fa-money-bill-transfer"></i> Phương thức chi trả tiền bồi thường</div>
                <div class="qdtu-card-body">
                    <div class="qdtu-grid" style="margin-bottom:14px;">
                        ${kpcdRo('kpcdTbPayMethod', 'Phương thức nhận tiền')}
                        ${kpcdFld('kpcdTbPayAgency', 'Cơ quan chi trả tiền bồi thường', true, kpcdInput('kpcdTbPayAgency', 255, 'Nhập tên cơ quan chi trả tiền bồi thường'))}
                    </div>
                    <div class="qdtu-grid" id="kpcdTbTransferGroup">
                        ${kpcdRo('kpcdTbAccHolder', 'Chủ tài khoản')}
                        ${kpcdRo('kpcdTbAccount', 'Số tài khoản ngân hàng')}
                        ${kpcdRo('kpcdTbBank', 'Tên ngân hàng')}
                        ${kpcdRo('kpcdTbBranch', 'Chi nhánh ngân hàng')}
                    </div>
                    <div class="qdtu-grid" id="kpcdTbCashGroup" style="display:none;">
                        ${kpcdRo('kpcdTbCashPlace', 'Cơ quan / Địa chỉ chi trả tiền mặt')}
                        ${kpcdRo('kpcdTbCashNote', 'Số biên lai / Ghi chú chi trả')}
                        ${kpcdFld('kpcdTbTime', 'Thời gian nhận tiền', true, `<input type="text" class="form-control" id="kpcdTbTime" placeholder="hh:mm dd/mm/yyyy" onchange="qdtuMark('kpcdTbTime', false)">`)}
                        ${kpcdFld('kpcdTbPlace', 'Địa điểm nhận tiền', true, kpcdInput('kpcdTbPlace', 500, 'Nhập địa điểm nhận tiền'))}
                    </div>
                </div>
            </div>
            <div class="qdtu-card">
                <div class="qdtu-card-head"><i class="fa-solid fa-paperclip"></i> Tài liệu kèm theo</div>
                <div class="qdtu-card-body"><div id="kpcdTbTlkt"></div></div>
            </div>
        </div>
    </div>
    <div class="inline-form-footer" style="display:flex; justify-content:flex-end; gap:8px;">
        <button type="button" class="btn btn-secondary" onclick="kpcdTbClosePage()">Hủy bỏ</button>
        <button type="button" class="btn btn-primary" onclick="kpcdTbContinue()" style="font-weight:600;">Tiếp tục <i class="fa-solid fa-arrow-right"></i></button>
    </div>`;
    const list = kpcdEl('contentListProposals');
    list.parentNode.insertBefore(p, list.nextSibling);
}
const KPCD_TB_INPUTS = ['kpcdTbDecInput', 'kpcdTbNycName', 'kpcdTbNycAddress', 'kpcdTbPayAgency', 'kpcdTbTime', 'kpcdTbPlace'];
function kpcdTbShowPage(on) {
    const panel = kpcdEl('kpcdTbPanel');
    const list = kpcdEl('contentListProposals'); if (list) list.style.display = on ? 'none' : 'block';
    ['inlineProposalFormPanel', 'qdtuPanel'].forEach(id => { const el = kpcdEl(id); if (on && el) el.style.display = 'none'; });
    if (panel) panel.style.display = on ? 'flex' : 'none';
    window.scrollTo(0, 0);
}
function kpcdTbOpenPage() {
    kpcdTbEnsurePage();
    kpcdTbState = { decId: '' };
    KPCD_TB_INPUTS.forEach(x => { const el = kpcdEl(x); if (el) { el.value = ''; if (el._flatpickr) el._flatpickr.clear(); } qdtuMark(x, false); });
    kpcdEl('kpcdTbDecBadge').style.display = 'none';
    kpcdEl('kpcdTbUnitGroup').style.display = 'none';
    kpcdEl('kpcdTbInfoCards').style.display = 'none';
    kpcdEl('kpcdTbEmptyHint').style.display = '';
    const dl = kpcdEl('kpcdTbDecDatalist');
    dl.innerHTML = kpcdEligibleDecs().map(d => `<option value="${kpcdEsc(d.claimCode)}">Số QĐ ${kpcdEsc(d.decNo || '-')} - ${kpcdEsc(kpcdNycName(d))}</option>`).join('');
    if (window.flatpickr && !kpcdEl('kpcdTbTime')._flatpickr) flatpickr('#kpcdTbTime', { enableTime: true, time_24hr: true, dateFormat: 'H:i d/m/Y', allowInput: true });
    // 02 khối Tài liệu ban hành kèm theo / Tài liệu không ban hành kèm theo (Ký ngoài tại popup Trình ký: chỉ lưu khối ban hành kèm theo)
    if (typeof tlktMount === 'function') tlktMount('kpcdTb', 'kpcdTbTlkt', { required: false, rows: [], secClass: '', titleClass: 'tlkt-sec-title' });
    kpcdTbShowPage(true);
}
function kpcdTbClosePage() { kpcdTbShowPage(false); renderProposalsTable(); }
function kpcdTbSearch() {
    const val = kpcdEl('kpcdTbDecInput').value.trim();
    const er = kpcdEl('kpcdTbDecInputErr');
    if (!val) { er.innerText = 'Đây là trường bắt buộc'; qdtuMark('kpcdTbDecInput', true); kpcdEl('kpcdTbDecInput').focus(); return; }
    const d = kpcdFindDec(val);
    if (!d) { er.innerText = 'Không tìm thấy Quyết định giải quyết bồi thường đủ điều kiện tạo Thông báo chi trả.'; qdtuMark('kpcdTbDecInput', true); kpcdEl('kpcdTbDecInput').focus(); return; }
    kpcdTbSelect(d.id);
}
function kpcdTbOnPick(val) { if (kpcdFindDec(val)) kpcdTbSearch(); }
function kpcdSetRo(id, v) { const el = kpcdEl(id); if (el) el.innerText = v ? v : '--'; }
// Chọn Quyết định: điền thông tin theo Quyết định; hiển thị các khối thông tin
function kpcdTbSelect(decId) {
    const d = kpcdAllDecs().find(x => x.id === decId); if (!d) return;
    kpcdTbState.decId = d.id;
    const vv = kpcdTbVv(d.claimCode);
    const unit = kpcdUnitName(d);
    kpcdEl('kpcdTbDecInput').value = d.claimCode;
    qdtuMark('kpcdTbDecInput', false);
    kpcdEl('kpcdTbDecBadge').style.display = 'block';
    kpcdEl('kpcdTbDecBadgeText').innerText = `Số QĐ ${d.decNo || '-'} ngày ${d.issueDate || '-'} - Mã hồ sơ ${d.claimCode}${vv ? ' - Mã vụ việc ' + vv : ''} - ${kpcdNycName(d)}`;
    kpcdEl('kpcdTbUnitGroup').style.display = '';
    kpcdSetRo('kpcdTbUnitText', unit);
    kpcdEl('kpcdTbInfoCards').style.display = '';
    kpcdEl('kpcdTbEmptyHint').style.display = 'none';
    const po = d.payout || {}, r = d.recipient || {};
    const method = po.method ? (kpcdIsCashMethod(po.method) ? KPTB_CASH : KPTB_TRANSFER) : (r.account ? KPTB_TRANSFER : KPTB_CASH);
    kpcdEl('kpcdTbNycName').value = kpcdNycName(d);
    kpcdEl('kpcdTbNycAddress').value = d.nycAddress || '';
    kpcdSetRo('kpcdTbPayMethod', method);
    kpcdEl('kpcdTbPayAgency').value = unit;
    const cash = method === KPTB_CASH;
    kpcdEl('kpcdTbTransferGroup').style.display = cash ? 'none' : '';
    kpcdEl('kpcdTbCashGroup').style.display = cash ? '' : 'none';
    kpcdSetRo('kpcdTbAccHolder', po.accHolder || r.name || '');
    kpcdSetRo('kpcdTbAccount', po.account || r.account || '');
    kpcdSetRo('kpcdTbBank', po.bank || r.bank || '');
    kpcdSetRo('kpcdTbBranch', po.branch || r.branch || '');
    kpcdSetRo('kpcdTbCashPlace', po.cashPlace || '');
    kpcdSetRo('kpcdTbCashNote', po.cashNote || '');
    kpcdEl('kpcdTbTime').value = ''; if (kpcdEl('kpcdTbTime')._flatpickr) kpcdEl('kpcdTbTime')._flatpickr.clear();
    kpcdEl('kpcdTbPlace').value = po.cashPlace || '';
    KPCD_TB_INPUTS.forEach(x => qdtuMark(x, false));
}
// Bản ghi nháp truyền cho Popup Trình ký thông báo chi trả; QĐ đã có bản ghi chưa trình (Chờ thông báo chi trả / Đề nghị cấp bổ sung kinh phí / Bị từ chối) thì dùng lại bản ghi đó
function kpcdTbBuildDraft(d, form) {
    const unit = kpcdUnitName(d);
    const dec = Object.assign(JSON.parse(JSON.stringify(d)), { decId: d.id, unitName: unit, nycName: form.nycName, nycAddress: form.nycAddress, payAgency: form.payAgency, cashTime: form.time, cashPlaceNotice: form.place });
    delete dec.kpcdClaimStatus;
    const reuse = kpcdTbOf(d, [KPTB_ST.WAIT, KPTB_ST.SUPP, KPTB_ST.REJECT]);
    let draft;
    if (reuse) {
        draft = JSON.parse(JSON.stringify(reuse));
        draft.kptbDec = Object.assign({}, draft.kptbDec || {}, dec);
        draft.nycName = form.nycName;
    } else {
        draft = kptbBuildRecord(dec, { id: 'P_TB_' + d.id, code: '', origin: 'Tạo thông báo chi trả', date: kptbToday() });
        draft.kptbHistory = [];
        draft.kpcdNew = true;
    }
    draft.kpcdForm = form;
    return draft;
}
function kpcdTbFormData() {
    const v = id => (kpcdEl(id) ? kpcdEl(id).value.trim() : '');
    return { nycName: v('kpcdTbNycName'), nycAddress: v('kpcdTbNycAddress'), payAgency: v('kpcdTbPayAgency'), time: v('kpcdTbTime'), place: v('kpcdTbPlace'),
        attachments: typeof tlktGet === 'function' ? tlktGet('kpcdTb') : [] };
}
// Tiếp tục: kiểm tra trống trường bắt buộc, Tài liệu kèm theo, chặn trùng -> mở Popup Trình ký thông báo chi trả
function kpcdTbContinue() {
    if (!kpcdTbState.decId) { kpcdEl('kpcdTbDecInputErr').innerText = 'Đây là trường bắt buộc'; qdtuMark('kpcdTbDecInput', true); kpcdEl('kpcdTbDecInput').focus(); return; }
    const d = kpcdAllDecs().find(x => x.id === kpcdTbState.decId); if (!d) return;
    const cash = kpcdEl('kpcdTbCashGroup').style.display !== 'none';
    const req = ['kpcdTbNycName', 'kpcdTbNycAddress', 'kpcdTbPayAgency'].concat(cash ? ['kpcdTbTime', 'kpcdTbPlace'] : []);
    const bad = req.filter(id => !String(kpcdEl(id).value || '').trim());
    req.forEach(id => qdtuMark(id, bad.includes(id)));
    if (bad.length) { kpcdEl(bad[0]).focus(); kpcdEl(bad[0]).scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    if (typeof tlktValidate === 'function' && !tlktValidate('kpcdTb')) return;
    // Chặn trùng: QĐ đã có Thông báo chi trả Chờ duyệt / đã ban hành (Chờ chi trả, Hoàn thành, Trả lại ngân sách nhà nước) - MSG-ERR-BTNN-KP-013
    const dup = kpcdTbOf(d, KPCD_TB_DUP_ST);
    if (dup) { showToast(`Quyết định giải quyết bồi thường số ${d.decNo || '-'} đã có Thông báo chi trả ${dup.code} ở trạng thái ${kpNormStatus(dup.status)}. Không thể tạo Thông báo chi trả mới.`, 'error'); return; }
    kptbOpenSign(null, kpcdTbBuildDraft(d, kpcdTbFormData()));
}
// Lưu bản ghi khi Trình ký / Ban hành văn bản: bản ghi mới thì thêm vào danh sách (cấp Mã đề nghị); dùng lại bản ghi cũ thì cập nhật chính bản ghi đó
function kpcdTbCommit(item) {
    if (!item || !item.kpcdForm) return item;
    const form = item.kpcdForm;
    delete item.kpcdForm;
    const idx = proposalsList.findIndex(p => p.id === item.id);
    if (item.kpcdNew || idx < 0) {
        delete item.kpcdNew;
        item.code = nextKinhPhiCode();
        item.createdAt = kptbNow();
        item.kptbHistory = [{ at: kptbNow(), userId: kptbMe(), userName: kptbUserName(kptbMe()), action: 'Tạo thông báo chi trả', note: `Tạo từ Quyết định giải quyết bồi thường số ${(item.kptbDec || {}).decNo || '-'} ngày ${(item.kptbDec || {}).issueDate || '-'}.` }];
        proposalsList.unshift(item);
    } else {
        proposalsList[idx] = item;
    }
    item.kpcdFormSaved = { nycName: form.nycName, nycAddress: form.nycAddress, payAgency: form.payAgency, time: form.time, place: form.place };
    return item;
}

// ---------------- Popup Tìm kiếm nâng cao Quyết định giải quyết bồi thường ----------------
let kpcdLkPage = 1;
function kpcdTbOpenLookup() {
    kpcdInjectCss();
    kpcdTbCloseLookup();
    const m = document.createElement('div');
    m.className = 'qdtu-modal open'; m.id = 'kpcdLkModal';
    const f = (id, label) => `<div class="qdtu-gqx-field"><label class="form-label" for="${id}">${label}</label><input type="text" class="form-control" id="${id}" onkeydown="if(event.key==='Enter') kpcdTbRenderLookup()"></div>`;
    const dt = (id, label) => `<div class="qdtu-gqx-field"><label class="form-label" for="${id}">${label}</label><input type="text" class="form-control" id="${id}" placeholder="dd/mm/yyyy"><div class="qdtu-gqx-err" id="${id}Err"></div></div>`;
    m.innerHTML = `<div class="qdtu-modal-box qdtu-qs-box" style="width:1100px; max-width:96vw;">
        <div class="qdtu-qs-head"><div><div class="qdtu-qs-head-title"><span class="qdtu-qs-head-ico"><i class="fa-solid fa-magnifying-glass-plus"></i></span><span>TÌM KIẾM NÂNG CAO QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG</span></div>
            <div class="qdtu-qs-sub">Quyết định trạng thái ${KPCD_DEC_ISSUED}, hồ sơ giải quyết bồi thường trạng thái ${KPCD_CLAIM_WAIT}</div></div>
            <button type="button" class="qdtu-qs-head-close" onclick="kpcdTbCloseLookup()" title="Đóng">&times;</button></div>
        <div class="qdtu-qs-body qdtu-gqx-body">
            <div class="qdtu-gqx-sec">
                <div class="qdtu-gqx-grid2" style="grid-template-columns:repeat(4,1fr);">${f('kpcdLkDecNo', 'Số quyết định')}${dt('kpcdLkFrom', 'Ngày quyết định: Từ ngày')}${dt('kpcdLkTo', 'Ngày quyết định: Đến ngày')}${f('kpcdLkVv', 'Mã vụ việc')}${f('kpcdLkCode', 'Mã hồ sơ giải quyết bồi thường')}${f('kpcdLkNyc', 'Tên cá nhân/Tổ chức yêu cầu')}${f('kpcdLkNbth', 'Tên cá nhân/Tổ chức bị thiệt hại')}</div>
                <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:12px;"><button type="button" class="btn btn-secondary btn-sm" onclick="kpcdTbClearLookup()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button><button type="button" class="btn btn-primary btn-sm" onclick="kpcdTbRenderLookup()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button></div>
            </div>
            <div class="qdtu-gqx-sec"><div style="overflow-x:auto;"><table class="qdtu-lk-table" id="kpcdLkTable"><thead><tr><th style="text-align:center; width:48px;">STT</th><th>Mã vụ việc</th><th>Mã hồ sơ GQBT</th><th>Số quyết định</th><th style="text-align:center;">Ngày quyết định</th><th>Tên cá nhân/Tổ chức yêu cầu</th><th>Tên cá nhân/Tổ chức bị thiệt hại</th><th style="text-align:center;">Trạng thái</th><th style="text-align:center;">Thao tác</th></tr></thead><tbody id="kpcdLkBody"></tbody></table></div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:12.5px;"><span>Tổng số: <b id="kpcdLkTotal">0</b> bản ghi</span><div class="qdtu-lk-pages" id="kpcdLkPages"></div></div></div>
        </div>
        <div class="qdtu-modal-foot qdtu-qs-foot"><div class="qdtu-qs-foot-btns"><button type="button" class="btn btn-secondary" onclick="kpcdTbCloseLookup()">Đóng</button></div></div>
    </div>`;
    document.body.appendChild(m);
    if (window.flatpickr) ['kpcdLkFrom', 'kpcdLkTo'].forEach(x => flatpickr('#' + x, { dateFormat: 'd/m/Y', allowInput: true }));
    kpcdLkPage = 1;
    kpcdTbRenderLookup();
}
function kpcdTbCloseLookup() { const m = kpcdEl('kpcdLkModal'); if (m) m.remove(); }
function kpcdTbClearLookup() {
    ['kpcdLkDecNo', 'kpcdLkFrom', 'kpcdLkTo', 'kpcdLkVv', 'kpcdLkCode', 'kpcdLkNyc', 'kpcdLkNbth'].forEach(x => { const el = kpcdEl(x); if (el) { el.value = ''; if (el._flatpickr) el._flatpickr.clear(); } });
    kpcdTbRenderLookup();
}
function kpcdDateNum(s) { const m = String(s || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? +(m[3] + m[2] + m[1]) : null; }
function kpcdTbRenderLookup(keep) {
    if (!keep) kpcdLkPage = 1;
    const q = id => (kpcdEl(id) ? kpcdEl(id).value.trim().toLowerCase() : '');
    const from = kpcdDateNum(kpcdEl('kpcdLkFrom').value.trim()), to = kpcdDateNum(kpcdEl('kpcdLkTo').value.trim());
    const errTo = kpcdEl('kpcdLkToErr');
    const badRange = from && to && to < from;
    kpcdEl('kpcdLkTo').classList.toggle('is-invalid', !!badRange);
    if (errTo) { errTo.innerText = badRange ? '"Đến ngày" không được nhỏ hơn "Từ ngày".' : ''; errTo.style.display = badRange ? 'block' : 'none'; }
    if (badRange) return;
    const decNo = q('kpcdLkDecNo'), vvq = q('kpcdLkVv'), code = q('kpcdLkCode'), nyc = q('kpcdLkNyc'), nbth = q('kpcdLkNbth');
    const list = kpcdEligibleDecs().filter(d => {
        const dn = kpcdDateNum(d.issueDate);
        if (decNo && !String(d.decNo || '').toLowerCase().includes(decNo)) return false;
        if (from && (!dn || dn < from)) return false;
        if (to && (!dn || dn > to)) return false;
        if (vvq && !String(kpcdTbVv(d.claimCode)).toLowerCase().includes(vvq)) return false;
        if (code && !d.claimCode.toLowerCase().includes(code)) return false;
        if (nyc && !kpcdNycName(d).toLowerCase().includes(nyc)) return false;
        if (nbth && !kpcdNbth(d).toLowerCase().includes(nbth)) return false;
        return true;
    });
    const size = 10, max = Math.max(1, Math.ceil(list.length / size));
    if (kpcdLkPage > max) kpcdLkPage = max;
    const page = list.slice((kpcdLkPage - 1) * size, kpcdLkPage * size);
    kpcdEl('kpcdLkTotal').innerText = list.length;
    let pages = '';
    for (let i = 1; i <= max; i++) pages += `<span class="${i === kpcdLkPage ? 'active' : ''}" onclick="kpcdLkPage=${i}; kpcdTbRenderLookup(true);">${i}</span>`;
    kpcdEl('kpcdLkPages').innerHTML = pages;
    kpcdEl('kpcdLkBody').innerHTML = page.length ? page.map((d, i) => `<tr><td style="text-align:center;">${(kpcdLkPage - 1) * size + i + 1}</td><td style="font-weight:600;">${kpcdEsc(kpcdTbVv(d.claimCode) || '-')}</td><td>${kpcdEsc(d.claimCode)}</td>
            <td><a href="javascript:void(0)" style="font-weight:700; color:var(--primary-light); text-decoration:underline;" onclick="kpcdTbViewDec('${kpcdEsc(d.id)}')">${kpcdEsc(d.decNo || '-')}</a></td><td style="text-align:center;">${kpcdEsc(d.issueDate || '-')}</td>
            <td style="font-weight:600;">${kpcdEsc(kpcdNycName(d))}</td><td>${kpcdEsc(kpcdNbth(d))}</td><td style="text-align:center;"><span class="badge badge-info">${kpcdEsc(d.status)}</span></td>
            <td style="text-align:center;"><button type="button" class="btn btn-primary btn-sm" onclick="kpcdTbSelect('${kpcdEsc(d.id)}'); kpcdTbCloseLookup();"><i class="fa-solid fa-check"></i> Chọn</button></td></tr>`).join('')
        : '<tr><td colspan="9" style="text-align:center; padding:20px; font-style:italic; color:#64748b;">Không tìm thấy Quyết định phù hợp với điều kiện tìm kiếm.</td></tr>';
}
// HyperLink Số quyết định: mở màn hình Quyết định giải quyết bồi thường (tab mới, xem chi tiết Quyết định)
function kpcdTbViewDec(decId) {
    window.open(`quyet_dinh_giai_quyet_boi_thuong.html?id=${encodeURIComponent(decId)}`, '_blank');
}
