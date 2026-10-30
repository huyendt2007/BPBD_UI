/*
 * Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Luồng Thông báo chi trả tiền bồi thường (Mẫu số 32/BTNN)
 * - Ban hành Quyết định giải quyết bồi thường -> hệ thống tạo 01 bản ghi Loại "Chi trả tiền bồi thường" trạng thái "Chờ thông báo chi trả"
 *   (Module Quyết định ghi hàng đợi 'btnn_kptb_qd_issued_v1'; màn hình này nhận hàng đợi khi tải trang).
 * - Chờ thông báo chi trả: Trình thông báo chi trả | Đề nghị cấp bổ sung kinh phí (-> "Đề nghị cấp bổ sung kinh phí").
 * - Đề nghị cấp bổ sung kinh phí / Bị trả lại: Trình thông báo chi trả.
 * - Trình (Ký số) -> "Chờ duyệt" (Loại trình "Thông báo chi trả") -> Lãnh đạo được giao Ký duyệt theo luồng;
 *   cấp cuối ký số -> "Chờ chi trả"; Từ chối -> "Bị trả lại". Ký ngoài: đính kèm PDF đã ký -> Ban hành văn bản -> "Chờ chi trả".
 * - Chờ chi trả: Cập nhật chi trả -> "Hoàn thành".
 * Id/hàm prefix kptb. Mockup tĩnh: chỉ kiểm tra trống trường bắt buộc.
 */
const KPTB_TYPE = 'Chi trả tiền bồi thường';
const KPTB_KIND = 'Thông báo chi trả'; // Loại trình (phân hệ chỉ gồm "Thông báo chi trả", "QĐ tạm ứng kinh phí")
const KPTB_ST = { WAIT: 'Chờ thông báo chi trả', SUPP: 'Đề nghị cấp bổ sung kinh phí', REVIEW: 'Chờ duyệt', REJECT: 'Bị trả lại', PAY: 'Chờ chi trả', DONE: 'Hoàn thành' };
const KPTB_QUEUE_KEY = 'btnn_kptb_qd_issued_v1';
const KPTB_CASH = 'Nhận tiền mặt';
const KPTB_TRANSFER = 'Nhận qua chuyển khoản';
const KPTB_MAX_FILE = 50 * 1024 * 1024;

function kptbW() { return window.BTNN_WF || null; }
function kptbIs(item) { return !!item && item.type === KPTB_TYPE; }
function kptbFind(id) { return proposalsList.find(p => p.id === id) || null; }
function kptbEl(id) { return document.getElementById(id); }
function kptbFmt(n) { return (Number(n) || 0).toLocaleString('vi-VN'); }
function kptbMe() { const W = kptbW(); return W ? W.getCurrentUserId() : ''; }
function kptbUserName(id) { const W = kptbW(); return id ? (W ? W.userName(id) : id) : ''; }
function kptbUserLabel(id) { const W = kptbW(); return id ? (W ? W.userLabel(id) : id) : ''; }
function kptbUnitName(id) { const W = kptbW(); return id && W ? W.unitName(id) : ''; }
function kptbNow() { const W = kptbW(); return W ? W.nowText() : formatCurrentDateTime(); }
function kptbToday() { const W = kptbW(); return W ? W.dateText() : formatDateViGlobal(new Date()); }
function kptbFileSize(b) { return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
function kptbMethod(item) { const m = (((item || {}).kptbDec || {}).payout || {}).method || ''; return /tiền mặt/i.test(m) ? KPTB_CASH : KPTB_TRANSFER; }
function kptbIsCash(item) { return kptbMethod(item) === KPTB_CASH; }
function kptbVv(code) { const W = kptbW(); try { return (W && W.vuViecOf && W.vuViecOf(code, { create: false })) || ''; } catch (e) { return ''; } }
function kptbHist(item, action, note, userId) {
    if (!Array.isArray(item.kptbHistory)) item.kptbHistory = [];
    const uid = userId === undefined ? kptbMe() : userId;
    item.kptbHistory.push({ at: kptbNow(), userId: uid || '', userName: uid ? kptbUserName(uid) : 'Hệ thống', action, note: note || '' });
}
// Tài khoản thuộc Nhóm lãnh đạo trong Cấu hình luồng xử lý
function kptbIsLeaderAccount(uid) {
    const W = kptbW(); if (!W || !uid) return false;
    const cfg = W.getFlowConfig() || {};
    return Object.keys(cfg).some(root => Object.values(cfg[root] || {}).some(n => (n && n.leaders || []).includes(uid)));
}
function kptbLeaderAccounts() {
    const W = kptbW(); if (!W) return [];
    const cfg = W.getFlowConfig() || {};
    const ids = [];
    Object.keys(cfg).forEach(root => Object.values(cfg[root] || {}).forEach(n => (n && n.leaders || []).forEach(u => { if (!ids.includes(u)) ids.push(u); })));
    return ids;
}
// Tài khoản giả lập theo vai trò (Lãnh đạo: Trần Văn Bồi Thường; Cán bộ xử lý: Nguyễn Văn Cán Bộ) - như màn hình Quyết định GQBT
function kptbSyncAccount() {
    const W = kptbW(); if (!W) return;
    const me = W.getCurrentUserId();
    if (kpRole() === 'lanh-dao' && !kptbIsLeaderAccount(me)) W.setCurrentUser('tpbt');
    if (kpRole() !== 'lanh-dao' && kptbIsLeaderAccount(me)) W.setCurrentUser('canbonv');
    kptbRenderAccountBox();
}
function kptbRenderAccountBox() {
    const W = kptbW(); const sel = kptbEl('roleSelector'); if (!W || !sel) return;
    let box = kptbEl('kptbAccountBox');
    if (!box) {
        box = document.createElement('span');
        box.id = 'kptbAccountBox';
        box.style.cssText = 'display:inline-flex; align-items:center; gap:6px; margin-left:10px; font-size:12px; color:var(--text-muted);';
        sel.parentNode.appendChild(box);
    }
    const me = W.getCurrentUserId();
    if (kpRole() === 'lanh-dao') {
        const opts = kptbLeaderAccounts().map(u => `<option value="${kpEsc(u)}" ${u === me ? 'selected' : ''}>${kpEsc(W.userLabel(u))}</option>`).join('');
        box.innerHTML = `<span style="font-weight:600;">Tài khoản</span><select class="role-selector" id="kptbAccountSel" onchange="kptbOnAccountChange(this.value)" style="max-width:260px;">${opts}</select>`;
    } else {
        box.innerHTML = `<span>Tài khoản: <b>${kpEsc(W.userLabel(me))}</b></span>`;
    }
}
function kptbOnAccountChange(uid) {
    const W = kptbW(); if (!W) return;
    W.setCurrentUser(uid);
    currentPage = 1;
    renderProposalsTable();
}

// ---------------- Luồng phê duyệt (theo Cấu hình luồng xử lý, như Quyết định GQBT) ----------------
function kptbRecLike(code) {
    const W = kptbW();
    const rec = W ? W.getRecord(code) : null;
    if (rec && rec.chuTri) return rec;
    const me = kptbMe();
    const cb = me && !kptbIsLeaderAccount(me) ? me : 'canbonv';
    return { chuTri: cb, createdBy: cb, routes: rec ? rec.routes || [] : [] };
}
function kptbLevels(code) {
    const W = kptbW(); if (!W) return [];
    const rl = kptbRecLike(code);
    const path = W.computeApprovalPath(rl) || [];
    const ft = W.flowTypeOf ? W.flowTypeOf(rl.loaiYeuCau, rl.rootUnitId) : undefined;
    return path.map((u, i) => ({ unitId: u, leaders: i === 0 ? W.firstLevelLeaders(rl) : W.getLeaders(u, ft) }));
}
function kptbIsLast(a) { return !!a && a.level >= (a.path || []).length - 1; }
// Chỉ Lãnh đạo được giao tại cấp hiện hành (cấp chưa giao đích danh: Nhóm lãnh đạo của cấp) thấy Ký duyệt / Từ chối
function kptbCanAct(item) {
    if (!kptbIs(item) || item.status !== KPTB_ST.REVIEW || kpRole() !== 'lanh-dao') return false;
    const a = item.kptbApproval;
    if (!a || !a.pending) return false;
    const me = kptbMe();
    const assignee = (a.assignees || [])[a.level];
    if (assignee) return assignee === me;
    const W = kptbW();
    return !!W && W.isLeaderOf(me, a.path[a.level]);
}
function kptbLeaderHandled(item) {
    const me = kptbMe();
    return (item.kptbHistory || []).some(h => h.userId === me && /^(Ký duyệt|Từ chối)/.test(h.action || ''));
}

// ---------------- Tạo bản ghi từ Quyết định GQBT đã ban hành + dữ liệu mẫu ----------------
function kptbReadJson(key, fb) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
function kptbNet(dec) { const t = Number(dec.total) || 0; const adv = Number(dec.advance) || 0; return dec.net != null && dec.net !== '' ? Math.max(0, Number(dec.net) || 0) : Math.max(0, t - adv); }
function kptbBuildRecord(dec, extra) {
    const rec = dec.recipient || {};
    return Object.assign({
        id: 'P_TB_' + dec.decId,
        code: nextKinhPhiCode(),
        type: KPTB_TYPE,
        ycbtCode: dec.claimCode,
        decId: dec.decId,
        origin: 'Quyết định giải quyết bồi thường',
        nycName: dec.nycName || rec.name || '',
        nycRole: 'Người bị thiệt hại',
        amount: kptbNet(dec),
        user: '',
        date: dec.issueDate || kptbToday(),
        status: KPTB_ST.WAIT,
        source: '', cqCap: '',
        agency: dec.unitName || '',
        baseDecisionNo: dec.decNo || '',
        baseDecisionDate: dec.issueDate || '',
        notes: '',
        files: [],
        kptbDec: JSON.parse(JSON.stringify(dec)),
        kptbHistory: [{ at: dec.at || kptbNow(), userId: '', userName: 'Hệ thống', action: 'Tạo bản ghi', note: `Tạo từ ${dec.sourceLabel || 'Quyết định giải quyết bồi thường'} số ${dec.decNo || '-'} ngày ${dec.issueDate || '-'}${dec.sourceLabel ? '' : ' đã ban hành'}; trạng thái ${KPTB_ST.WAIT}.` }]
    }, extra || {});
}
// Vụ việc tại Tòa án (Đã có bản án/QĐ, yêu cầu bồi thường bằng tiền): Bản án/Quyết định của Tòa án đóng vai trò Quyết định làm căn cứ chi trả.
// Vụ việc tại Tòa án không có thông tin Phương thức chi trả: mặc định Nhận qua chuyển khoản, cán bộ nhập tài khoản khi Cập nhật chi trả.
function kptbCourtDec(c) {
    const n = c.nyc || {};
    const total = COURT_DAMAGE_KEYS.reduce((s, k) => s + (courtCaseDamageMap(c)[k] || 0), 0);
    return {
        decId: c.id || ('TA-' + c.code), sourceLabel: 'Bản án/Quyết định của Tòa án', claimCode: c.code,
        nycName: n.name || '', nycAddress: [n.address, n.city].filter(Boolean).join(', '),
        unitId: c.rootUnitId, unitName: c.agency || courtCaseUnitName(c.rootUnitId),
        decNo: c.verdictNo || '', issueDate: c.effectiveDate || '', total, advance: 0, net: total,
        recipient: { name: n.name || '', idNo: n.cardNo || '' }, payout: { method: 'Nhận qua chuyển khoản' }, at: kptbNow()
    };
}
function kptbBuildCourtRecord(c) {
    const n = c.nyc || {};
    return kptbBuildRecord(kptbCourtDec(c), {
        id: 'P_TA_' + c.id, courtCaseCode: c.code, courtCaseId: c.id, origin: 'Theo dõi vụ việc tại Tòa án', nycRole: n.role || 'Người bị thiệt hại',
        date: kptbToday(), verdictSource: c.verdictSource || '', createdAt: kptbNow(),
        files: (c.docs || []).filter(x => x && x.file).map(x => ({ name: x.name, file: x.file }))
    });
}
function kptbSeedDecs() {
    return [
        // Hồ sơ Giải quyết YCBT "Chờ chi trả" đã ban hành Quyết định GQBT; Người yêu cầu, Cơ quan, Số/Ngày/Số tiền Quyết định đồng bộ theo hồ sơ (kptbSyncSeedDec)
        { decId: 'KPTB-S1', claimCode: 'BT-2026-506', nycName: 'Lê Quang Huy', nycAddress: 'Số 20 Đội Cấn, Phường Ba Đình, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Hà Nội', decNo: '106/QĐ-STP', issueDate: '29/10/2026', total: 160000000, advance: 0, net: 160000000,
            recipient: { name: 'Lê Quang Huy', idNo: '001081007506', account: '0451000506506', bank: 'Vietcombank', branch: 'Chi nhánh Ba Đình' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Lê Quang Huy', account: '0451000506506', bank: 'Vietcombank', branch: 'Chi nhánh Ba Đình' }, at: '09:00 29/10/2026' },
        { decId: 'KPTB-S2', claimCode: 'BT-2026-507', nycName: 'Hợp tác xã Nông nghiệp Xuân Phương', nycAddress: 'Số 12 Phương Canh, Phường Xuân Phương, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Hà Nội', decNo: '107/QĐ-STP', issueDate: '28/10/2026', total: 160000000, advance: 0, net: 160000000,
            recipient: { name: 'Hợp tác xã Nông nghiệp Xuân Phương', idNo: '0106677507' },
            payout: { method: 'Nhận tiền mặt', cashPlace: 'Kho bạc Nhà nước Thành phố Hà Nội', cashNote: 'Chi trả trực tiếp bằng tiền mặt' }, at: '10:15 28/10/2026' },
        { decId: 'KPTB-S3', claimCode: 'BT-2026-606', nycName: 'Nông Thị Bảo Ngân', nycAddress: 'Số 18 Trường Chinh, Phường Phương Liệt, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Hà Nội', decNo: '106/QĐ-STP', issueDate: '28/10/2026', total: 160000000, advance: 0, net: 160000000,
            recipient: { name: 'Nông Thị Bảo Ngân', idNo: '001189003606', account: '0451000778899', bank: 'Vietinbank', branch: 'Chi nhánh Đống Đa' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Nông Thị Bảo Ngân', account: '0451000778899', bank: 'Vietinbank', branch: 'Chi nhánh Đống Đa' }, at: '14:20 28/10/2026' },
        { decId: 'KPTB-S4', claimCode: 'BT-2026-575', nycName: "K'Brơi Ha Nhi", nycAddress: 'Số 9 Trần Phú, Phường Xuân Hương - Đà Lạt, Tỉnh Lâm Đồng', unitId: 'UBND-LD', unitName: 'UBND tỉnh Lâm Đồng', decNo: '175/QĐ-STP', issueDate: '20/10/2026', total: 160000000, advance: 0, net: 160000000,
            recipient: { name: "K'Brơi Ha Nhi", idNo: '068188001575', account: '1903355667788', bank: 'Techcombank', branch: 'Chi nhánh Lâm Đồng' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: "K'Brơi Ha Nhi", account: '1903355667788', bank: 'Techcombank', branch: 'Chi nhánh Lâm Đồng' }, at: '08:40 20/10/2026' },
        { decId: 'KPTB-S5', claimCode: 'BT-2026-003-A', nycName: 'Công ty ABC', nycAddress: 'Khu đô thị mới An Hưng, Hà Đông, Hà Nội', unitId: 'UBND-CG', unitName: 'UBND phường Cầu Giấy', decNo: '46/QĐ-BT', issueDate: '11/03/2023', total: 2000000000, advance: 0, net: 2000000000,
            recipient: { name: 'Công ty ABC', idNo: '0102030406' },
            payout: { method: 'Nhận tiền mặt', cashPlace: 'UBND phường Cầu Giấy, Thành phố Hà Nội', cashNote: 'Nhận tiền mặt tại phòng Kế toán ngân sách' }, at: '15:30 16/10/2026' },
        // Bản ghi Chờ chi trả đã quá hạn 03 năm kể từ ngày Thông báo chi trả (đủ điều kiện Trả lại ngân sách nhà nước)
        { decId: 'KPTB-S6', claimCode: 'BT-2023-041', nycName: 'Lê Thị Hạnh', nycAddress: 'Số 9 phố Tây Sơn, Phường Đống Đa, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Thành phố Hà Nội', decNo: '12/QĐ-STP', issueDate: '05/05/2023', total: 85000000, advance: 0, net: 85000000,
            recipient: { name: 'Lê Thị Hạnh', idNo: '001182007788' },
            payout: { method: 'Nhận tiền mặt', cashPlace: 'Sở Tư pháp Thành phố Hà Nội' }, at: '09:00 05/05/2023' }
    ];
}
// Dữ liệu mẫu: Người yêu cầu, Cơ quan, Số/Ngày/Số tiền Quyết định lấy theo hồ sơ Giải quyết YCBT (claimsList) nếu đã có
function kptbSyncSeedDec(dec) {
    const list = kptbReadJson('claimsList', []);
    const c = Array.isArray(list) ? list.find(x => x && x.code === dec.claimCode) : null;
    if (!c) return dec;
    const W = window.BTNN_WF;
    if (c.nyc) { dec.nycName = c.nyc; dec.recipient = Object.assign({}, dec.recipient, { name: c.nyc }); }
    if (c.agency) { dec.unitName = c.agency; const u = W && W.resolveAgencyUnit ? W.resolveAgencyUnit(c.agency) : ''; if (u) dec.unitId = u; }
    if (c.decNo) dec.decNo = c.decNo;
    if (c.decDate) dec.issueDate = c.decDate;
    const total = Number(c.decAmount || 0);
    if (total) { dec.total = total; dec.advance = Number(c.advanceNum || 0); dec.net = total - dec.advance; }
    return dec;
}
function kptbSeed() {
    const decs = kptbSeedDecs().map(kptbSyncSeedDec);
    decs.forEach(dec => {
        if (proposalsList.some(p => p.decId === dec.decId)) return;
        const it = kptbBuildRecord(dec);
        proposalsList.unshift(it);
        if (dec.decId === 'KPTB-S3') {
            it.status = KPTB_ST.SUPP;
            it.user = 'Nguyễn Văn Cán Bộ';
            it.kptbSupp = { content: 'Dự toán ngân sách năm 2026 không đủ chi trả; đề nghị cơ quan tài chính cấp bổ sung kinh phí bồi thường.', file: 'De_nghi_cap_bo_sung_kinh_phi_BT-2026-606.pdf', at: '09:10 14/10/2026', by: 'canbonv' };
            it.kptbHistory.push({ at: '09:10 14/10/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Đề nghị cấp bổ sung kinh phí', note: it.kptbSupp.content });
        }
        if (dec.decId === 'KPTB-S4') {
            const levels = kptbLevels(dec.claimCode);
            if (levels.length) {
                const assignees = levels.map(lv => lv.leaders[0] || '');
                const notice = { signMethod: 'Ký số', docNo: '35/TB-STP', docDate: '17/10/2026', time: '', place: '', assignees };
                notice.docFile = { name: `Mau_32_BTNN_Thong_bao_chi_tra_${dec.claimCode}.doc`, generated: true };
                it.kptbNotice = notice;
                it.kptbApproval = { kind: KPTB_KIND, path: levels.map(l => l.unitId), assignees, level: 0, steps: [], content: 'Kính trình Lãnh đạo ký Thông báo chi trả tiền bồi thường.', submittedBy: 'canbonv', submittedAt: '10:05 17/10/2026', pending: true, prevStatus: KPTB_ST.WAIT };
                it.status = KPTB_ST.REVIEW;
                it.user = 'Nguyễn Văn Cán Bộ';
                it.kptbHistory.push({ at: '10:05 17/10/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Trình ký', note: `${KPTB_KIND}. Trình ${kptbUserName(assignees[0])} - ${kptbUnitName(levels[0].unitId)}. Nội dung: Kính trình Lãnh đạo ký Thông báo chi trả tiền bồi thường.` });
            }
        }
        if (dec.decId === 'KPTB-S5') {
            it.status = KPTB_ST.PAY;
            it.user = 'Nguyễn Văn Cán Bộ';
            it.kptbNotice = { signMethod: 'Ký ngoài', signedFile: 'Thong_bao_chi_tra_BT-2026-003-A_da_ky.pdf', issuedAt: '16:00 18/10/2026' };
            it.noticeReceivedDate = '18/10/2026';
            it.kptbHistory.push({ at: '16:00 18/10/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Ban hành Thông báo chi trả (Ký ngoài)', note: 'Tệp đã ký: Thong_bao_chi_tra_BT-2026-003-A_da_ky.pdf.' });
        }
        if (dec.decId === 'KPTB-S6') {
            it.status = KPTB_ST.PAY;
            it.user = 'Nguyễn Văn Cán Bộ';
            it.kptbNotice = { signMethod: 'Ký ngoài', signedFile: 'Thong_bao_chi_tra_BT-2023-041_da_ky.pdf', issuedAt: '10:00 15/05/2023' };
            it.noticeReceivedDate = '15/05/2023';
            it.kptbHistory.push({ at: '10:00 15/05/2023', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Ban hành Thông báo chi trả (Ký ngoài)', note: 'Tệp đã ký: Thong_bao_chi_tra_BT-2023-041_da_ky.pdf.' });
        }
    });
}
// Nhận hàng đợi Quyết định GQBT đã ban hành (01 Quyết định - 01 bản ghi, khóa chống trùng theo Quyết định)
function kptbImportAndSeed() {
    // Dữ liệu mẫu: bổ sung bản ghi mẫu còn thiếu (kho đề nghị có thể được đặt lại khi đổi phiên bản dữ liệu)
    const before = proposalsList.length;
    kptbSeed();
    let changed = proposalsList.length !== before;
    const q = kptbReadJson(KPTB_QUEUE_KEY, []);
    (Array.isArray(q) ? q : []).forEach(dec => {
        if (!dec || !dec.decId || proposalsList.some(p => p.decId === dec.decId)) return;
        proposalsList.unshift(kptbBuildRecord(dec));
        changed = true;
    });
    if (changed) saveProposalsToLocal();
}

// CSS popup (sao chép bố cục popup Trình ký Quyết định GQBT, đổi tiền tố kptb-)
const KPTB_CSS = `
.kptb-modal { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); display: none; align-items: center; justify-content: center; z-index: 5500; }
.kptb-modal.open { display: flex; }
.kptb-modal-box { background: #fff; border-radius: 8px; width: 760px; min-width: 650px; max-width: 850px; display: flex; flex-direction: column; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); overflow: hidden; }
.kptb-modal-head { position: sticky; top: 0; padding: 16px 24px; border-bottom: 1px solid var(--border-color); background: #FAFBFD; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 15px; color: var(--primary-light); }
.kptb-modal-head .qd-close { cursor: pointer; font-size: 20px; color: #64748b; background: none; border: 0; }
.kptb-modal-body { padding: 24px; max-height: 80vh; overflow-y: auto; }
.kptb-modal-foot { position: sticky; bottom: 0; padding: 14px 24px; border-top: 1px solid var(--border-color); background: #FAFBFD; display: flex; justify-content: flex-end; gap: 8px; }
@media (max-width: 700px) { .kptb-modal-box { min-width: 0; width: 96vw; } }
.kptb-qs-box { width: 850px; min-width: 0; max-width: 96vw; max-height: 94vh; border-radius: 10px; box-shadow: 0 20px 45px rgba(0,0,0,0.3); }
.kptb-qs-box.kptb-qs-wide { width: 100vw; max-width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; }
.kptb-qs-head { background: #f8fafc; border-bottom: 1px solid var(--border-color); padding: 18px 24px; display: flex; justify-content: space-between; align-items: flex-start; flex-shrink: 0; }
.kptb-qs-head-title { font-size: 16.5px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.kptb-qs-head-ico { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: #dbeafe; color: #1d4ed8; font-size: 14px; }
.kptb-qs-sub { font-size: 12.5px; color: #64748b; margin-top: 4px; padding-left: 38px; }
.kptb-qs-sub .kptb-qs-dot { margin: 0 6px; }
.kptb-qs-head-close { border: none; background: transparent; font-size: 22px; color: #94a3b8; cursor: pointer; line-height: 1; padding: 4px; }
.kptb-qs-body { overflow-y: auto; flex: 1; }
.kptb-qs-field { margin-bottom: 12px; }
.kptb-qs-field .form-label { font-weight: 600; font-size: 13px; color: #334155; margin-bottom: 6px; display: block; }
.kptb-qs-field .form-control { font-family: inherit; font-size: 13px; width: 100%; box-sizing: border-box; }
.kptb-qs-field textarea.form-control { line-height: 1.55; resize: vertical; }
.kptb-qs-err { display: none; color: #dc2626; font-size: 12px; margin-top: 4px; }
.kptb-qs-meta { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; }
.kptb-qs-meta-title { font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.kptb-qs-meta-title > i { color: #2563eb; }
.kptb-qs-meta .kptb-gqx-grid2 { margin-bottom: 14px; }
.kptb-qs-label-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 6px; }
.kptb-qs-label-row .form-label { margin-bottom: 0 !important; }
.kptb-qs-label-row > span { font-size: 11.5px; color: #64748b; }
.kptb-qs-foot-btns { display: flex; gap: 10px; margin-left: auto; }
.kptb-gqx-body { padding: 24px; background: #f8fafc; }
.kptb-gqx-sec { background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:16px 18px; margin-bottom:14px; }
.kptb-gqx-sec:last-child { margin-bottom:0; }
.kptb-gqx-sec-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; letter-spacing:.2px; margin:0 0 14px; padding-bottom:10px; border-bottom:1px solid #f1f5f9; }
.kptb-gqx-sec-title > i { color:#2563eb; width:16px; text-align:center; }
.kptb-gqx-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:0 16px; }
.kptb-gqx-field { margin-bottom:14px; }
.kptb-gqx-field:last-child, .kptb-gqx-grid2 .kptb-gqx-field { margin-bottom:0; }
.kptb-gqx-body .form-label { font-weight:600; font-size:13px; color:#334155; margin-bottom:6px; display:block; }
.kptb-gqx-req { color:#dc2626; margin-left:3px; }
.kptb-gqx-sec-title .kptb-gqx-req, .kptb-gqx-docfile-head .kptb-gqx-req { margin-left:-5px; }
.kptb-gqx-body .form-control { font-family:inherit; font-size:13px; height:38px; width:100%; box-sizing:border-box; }
.kptb-gqx-body textarea.form-control { height:auto; line-height:1.55; resize:vertical; }
.kptb-gqx-body select.form-control { padding:0 10px; cursor:pointer; }
.kptb-gqx-date { position:relative; }
.kptb-gqx-date .form-control { padding-right:36px; cursor:pointer; background:#fff; }
.kptb-gqx-date > i { position:absolute; right:12px; top:50%; transform:translateY(-50%); color:#2563eb; cursor:pointer; font-size:15px; }
.kptb-gqx-hint { font-size:12px; color:#64748b; margin-top:5px; }
.kptb-gqx-err { display:none; color:#dc2626; font-size:12px; margin-top:4px; }
.kptb-sign-cards-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:10px; align-items:stretch; }
.kptb-sign-card { position:relative; display:flex; align-items:center; justify-content:space-between; padding:10px 12px; min-height:58px; height:100%; box-sizing:border-box; border:1.5px solid #cbd5e1; border-radius:8px; background:#ffffff; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:0 1px 2px rgba(0,0,0,0.03); margin:0; }
.kptb-sign-card:hover { border-color:#93c5fd; background:#f8fafc; }
.kptb-sign-card.active { border-color:#2563eb; background:#eff6ff; box-shadow:0 2px 6px rgba(37,99,235,0.1); }
.kptb-sign-card input[type="radio"] { position:absolute; opacity:0; pointer-events:none; }
.kptb-sign-card-content { display:flex; align-items:center; gap:8px; flex:1; min-width:0; }
.kptb-sign-card-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; background:#dbeafe; color:#1d4ed8; transition:all 0.2s; }
.kptb-sign-card-icon.offline { background:#fef3c7; color:#b45309; }
.kptb-sign-card.active .kptb-sign-card-icon { transform:scale(1.05); }
.kptb-sign-card-text { flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; gap:2px; }
.kptb-sign-card-title { font-size:13px; font-weight:700; color:#1e293b; margin-bottom:0; line-height:1.35; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.kptb-sign-card-desc { font-size:12px; font-weight:400; color:#64748b; line-height:1.4; text-wrap:balance; }
.kptb-sign-card.active .kptb-sign-card-title { color:#1d4ed8; }
.kptb-sign-card-check { font-size:15px; color:#cbd5e1; margin-left:8px; flex-shrink:0; transition:all 0.2s; }
.kptb-sign-card.active .kptb-sign-card-check { color:#2563eb; }
@media (max-width: 640px) { .kptb-sign-cards-grid { grid-template-columns:1fr; } }
.kptb-gqx-docfile { margin-top:16px; border:1.5px dashed #60a5fa; background:linear-gradient(180deg, #eff6ff 0%, #f8fbff 100%); border-radius:10px; padding:14px 16px; }
.kptb-gqx-docfile.signed { border-color:#fbbf24; background:linear-gradient(180deg, #fffbeb 0%, #fffdf7 100%); }
.kptb-gqx-docfile-head { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; color:#1e40af; margin-bottom:10px; }
.kptb-gqx-docfile.signed .kptb-gqx-docfile-head { color:#92400e; }
.kptb-gqx-file-empty { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.kptb-gqx-file-hint { font-size:12.5px; color:#475569; display:flex; align-items:center; }
.kptb-gqx-file-actions { display:flex; gap:8px; flex-wrap:wrap; }
.kptb-gqx-file-ready { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #bfdbfe; border-radius:8px; padding:10px 12px; }
.kptb-gqx-file-ico { font-size:28px; color:#2563eb; flex-shrink:0; }
.kptb-gqx-file-info { flex:1; min-width:0; }
.kptb-gqx-file-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }
.kptb-gqx-file-meta { font-size:12px; color:#64748b; margin-top:3px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.kptb-gqx-file-btns { display:flex; gap:6px; flex-shrink:0; }
.kptb-gqx-danger { color:#dc2626 !important; }
.kptb-gqx-note { margin-top:10px; font-size:12px; color:#92400e; background:#fef3c7; border-radius:6px; padding:8px 10px; line-height:1.5; }
.kptb-gqx-gen-preview-box { display:flex; align-items:center; justify-content:space-between; gap:12px; border:1px solid #cbd5e1; background:#ffffff; border-radius:8px; padding:10px 16px; margin-top:12px; box-sizing:border-box; }
.kptb-gqx-gen-preview-hint { display:flex; align-items:center; gap:8px; font-size:13px; color:#334155; font-weight:500; }
.kptb-gqx-gen-preview-hint i { color:#2563eb; font-size:16px; flex-shrink:0; }
.kptb-btn-preview { display:inline-flex; align-items:center; gap:6px; background:#eff6ff; color:#2563eb !important; border:1px solid #3b82f6; padding:6px 14px; font-size:12.5px; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.04); transition:all 0.2s ease; white-space:nowrap; }
.kptb-btn-preview:hover { background:#dbeafe; border-color:#2563eb; color:#1d4ed8 !important; box-shadow:0 2px 6px rgba(37,99,235,0.12); }
.kptb-btn-preview:active { background:#bfdbfe; transform:translateY(0); }
.kptb-doc-src-segmented { display:flex; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:8px; padding:4px; gap:4px; margin-bottom:14px; box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.05); }
.kptb-doc-src-seg-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; color:#475569; background:transparent; border:none; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); user-select:none; }
.kptb-doc-src-seg-btn:hover { color:#0f172a; background:rgba(255, 255, 255, 0.6); }
.kptb-doc-src-seg-btn.active { background:#2563eb; color:#ffffff !important; font-weight:700; box-shadow:0 2px 8px rgba(37, 99, 235, 0.35); }
.kptb-doc-src-seg-btn i { font-size:14px; color:#64748b; transition:color 0.2s ease; }
.kptb-doc-src-seg-btn.active i { color:#ffffff !important; }
.kptb-stepper-fullwidth { display:flex; align-items:center; justify-content:center; gap:14px; width:100%; padding:12px 24px; background:#f8fafc; border-bottom:1px solid #e2e8f0; flex-shrink:0; box-sizing:border-box; }
.kptb-step-tab { display:flex; align-items:center; gap:8px; cursor:pointer; user-select:none; }
.kptb-step-tab .kptb-step-badge { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#ffffff; border:2px solid #cbd5e1; color:#64748b; font-size:12px; font-weight:700; flex-shrink:0; transition:all 0.2s ease; }
.kptb-step-tab.active .kptb-step-badge { background:#2563eb; border-color:#2563eb; color:#ffffff; }
.kptb-step-tab.completed .kptb-step-badge { background:#10b981; border-color:#10b981; color:#ffffff; }
.kptb-step-tab .kptb-step-title { font-size:13.5px; font-weight:600; color:#64748b; }
.kptb-step-tab.active .kptb-step-title { color:#1d4ed8; font-weight:700; }
.kptb-step-tab.completed .kptb-step-title { color:#047857; }
.kptb-stepper-sep { width:80px; height:2px; background:#cbd5e1; font-size:0; }
.kptb-btn-upload { display:inline-flex; align-items:center; gap:7px; background:#ffffff; color:#1d4ed8 !important; border:1.5px solid #2563eb; padding:7px 16px; font-size:13px; font-weight:600; border-radius:6px; cursor:pointer; box-shadow:0 2px 5px rgba(37,99,235,0.12); transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
.kptb-btn-upload:hover { background:#2563eb; color:#ffffff !important; border-color:#2563eb; box-shadow:0 4px 12px rgba(37,99,235,0.3); transform:translateY(-1px); }
.kptb-btn-upload:active { transform:translateY(0); box-shadow:0 2px 4px rgba(37,99,235,0.15); }
.kptb-qs-step2 { display: none; flex: 1; min-height: 0; overflow: hidden; }
.kptb-qs-preview { flex: 1; background: #334155; overflow: auto; padding: 18px; }
.kptb-qs-a4 { position: relative; background: #fff; width: 794px; min-height: 1123px; margin: 0 auto; padding: 50px 60px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,.3); }
.kptb-qs-side { width: 420px; flex-shrink: 0; background: #f8fafc; border-left: 1px solid #e2e8f0; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.kptb-qs-card { background: #fff; border: 1px solid #bfdbfe; border-left: 4px solid #1d4ed8; border-radius: 8px; padding: 12px; }
.kptb-qs-card.last { border-color: #fecaca; border-left-color: #b91c1c; }
.kptb-qs-card-head { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; font-size: 12.5px; font-weight: 700; color: #1d4ed8; }
.kptb-qs-card.last .kptb-qs-card-head { color: #b91c1c; }
.kptb-qs-sig { position: absolute; border: 2px dashed #2563eb; background: rgba(239,246,255,.92); border-radius: 6px; padding: 6px 8px; font: 11px Inter, sans-serif; color: #1e3a8a; cursor: move; user-select: none; box-sizing: border-box; }
.kptb-qs-sig.last { border-color: #dc2626; background: rgba(254,242,242,.92); color: #991b1b; }
.kptb-qs-foot { padding: 16px 28px 18px; background: #f8fafc; flex-shrink: 0; }
/* Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn mượt */
#kptbSgStepper { height:51px; overflow:hidden; transition:height .22s ease, padding .22s ease, opacity .18s ease, border-color .22s ease; }
#kptbSgStepper.is-collapsed { height:0; padding-top:0; padding-bottom:0; opacity:0; border-bottom-color:transparent; border-bottom-width:0; pointer-events:none; }
/* Sinh văn bản: ghi chú + nút Xem trước văn bản cùng 1 dòng */
.kptb-gen-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:nowrap; border:1px solid #cbd5e1; background:#fff; border-radius:8px; padding:10px 16px; box-sizing:border-box; }
.kptb-gen-hint { display:flex; align-items:center; gap:8px; flex:1; min-width:0; font-size:13px; color:#334155; font-weight:500; }
.kptb-gen-hint i { color:#2563eb; font-size:16px; flex-shrink:0; }
.kptb-gen-row .kptb-btn-preview { flex-shrink:0; }
/* Vùng kéo thả tệp / đang chuyển đổi sang PDF / File Card */
.kptb-drop { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; min-height:96px; box-sizing:border-box; padding:14px 16px; border:1.5px dashed #93c5fd; border-radius:10px; background:#f8fbff; text-align:center; cursor:pointer; transition:border-color .15s, background .15s; }
.kptb-drop:hover, .kptb-drop.drag-over { border-color:#2563eb; background:#eff6ff; }
.kptb-drop:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
.kptb-drop.is-error { border-color:#dc2626; background:#fef2f2; }
.kptb-drop-ico { font-size:22px; color:#2563eb; }
.kptb-drop-main { font-size:13px; color:#334155; }
.kptb-drop-main a { color:#2563eb; font-weight:700; text-decoration:underline; cursor:pointer; }
.kptb-drop-sub { font-size:12px; color:#64748b; }
.kptb-converting { display:flex; align-items:center; justify-content:center; gap:10px; min-height:96px; box-sizing:border-box; border:1.5px dashed #93c5fd; border-radius:10px; background:#eff6ff; font-size:13px; font-weight:600; color:#1d4ed8; }
.kptb-spinner { width:18px; height:18px; border:2.5px solid #bfdbfe; border-top-color:#2563eb; border-radius:50%; animation:kptbSpin .8s linear infinite; }
@keyframes kptbSpin { to { transform:rotate(360deg); } }
.kptb-fcard { display:flex; align-items:center; gap:12px; min-height:96px; box-sizing:border-box; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:12px 14px; }
.kptb-fcard-ico { font-size:30px; flex-shrink:0; width:32px; text-align:center; }
.kptb-fcard-ico.pdf { color:#dc2626; } .kptb-fcard-ico.word { color:#2563eb; }
.kptb-fcard-info { flex:1; min-width:0; }
.kptb-fcard-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }
.kptb-fcard-meta { font-size:12px; color:#64748b; margin-top:3px; }
.kptb-fcard-btns { display:flex; gap:6px; flex-shrink:0; }
.kptb-fcard-btns .btn { min-width:84px; justify-content:center; }
.kptb-status-note { margin-top:12px; font-size:12.5px; color:#1e3a8a; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:9px 12px; line-height:1.55; }
@media (max-width: 640px) { .kptb-fcard, .kptb-gen-row { flex-wrap:wrap; } }
`;
const KPTB_LD_CSS = `
.kptbld-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: flex; align-items: stretch; justify-content: center; z-index: 5600; }
.kptbld-modal { background: #fff; width: 100vw; height: 100vh; display: flex; flex-direction: column; font-family: Inter, system-ui, sans-serif; }
.kptbld-head { padding: 14px 22px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.kptbld-head h3 { margin: 0; font-size: 16px; color: #1e3a8a; display: flex; gap: 8px; align-items: center; }
.kptbld-x { cursor: pointer; font-size: 22px; color: #64748b; background: none; border: none; }
.kptbld-body { flex: 1; display: flex; gap: 18px; min-height: 0; overflow: hidden; }
.kptbld-preview { flex: 1; background: #334155; padding: 18px; display: flex; flex-direction: column; min-height: 0; }
.kptbld-doc-bar { display: flex; justify-content: space-between; gap: 12px; color: #e2e8f0; font-size: 12.5px; margin-bottom: 8px; }
.kptbld-doc-bar a { color: #bfdbfe; }
.kptbld-frame { flex: 1; width: 100%; min-height: 420px; border: 0; background: #e5e7eb; border-radius: 4px; }
.kptbld-uploaded { background: #fff; border-radius: 4px; padding: 40px; text-align: center; color: #334155; font-size: 14px; }
.kptbld-right { width: 480px; flex-shrink: 0; overflow-y: auto; padding: 16px 20px 16px 0; font-size: 13.5px; color: #1e293b; }
.kptbld-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; background: #fff; }
.kptbld-box.hist { background: #f8fafc; }
.kptbld-box-title { font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 13px; }
.kptbld-row { display: grid; grid-template-columns: 130px 1fr; gap: 8px; font-size: 13px; padding: 3px 0; }
.kptbld-row > span:first-child { color: #64748b; }
.kptbld-hv { display: flex; gap: 10px; }
.kptbld-hv-step { width: 22px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding-top: 8px; }
.kptbld-hv-step > i { font-size: 18px; line-height: 20px; background: #f8fafc; border-radius: 50%; }
.kptbld-hv-step::after { content: ""; flex: 1; width: 2px; margin-top: 3px; background: #22c55e; }
.kptbld-hv:last-child .kptbld-hv-step::after { display: none; }
.kptbld-hv.done .kptbld-hv-step > i { color: #22c55e; } .kptbld-hv.no .kptbld-hv-step > i { color: #dc2626; } .kptbld-hv.wait .kptbld-hv-step > i { color: #f59e0b; } .kptbld-hv.todo .kptbld-hv-step > i { color: #cbd5e1; }
.kptbld-hv.todo .kptbld-hv-step::after { background: #e2e8f0; }
.kptbld-hv-av { width: 36px; height: 36px; border-radius: 50%; background: #eef2f7; color: #475569; font-size: 11.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 6px; }
.kptbld-hv-main { flex: 1; min-width: 0; padding: 8px 0 14px; }
.kptbld-hv-head { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }
.kptbld-hv-name { font-weight: 600; color: #0f172a; }
.kptbld-hv-time { color: #94a3b8; font-size: 12px; white-space: nowrap; }
.kptbld-hv-sub { color: #64748b; font-size: 12px; }
.kptbld-hv-act { font-size: 13px; margin-top: 2px; color: #2563eb; }
.kptbld-hv-act.ok { color: #16a34a; } .kptbld-hv-act.no { color: #dc2626; } .kptbld-hv-act.wait { color: #d97706; }
.kptbld-hv-msg { margin-top: 6px; background: #f1f5f9; border-radius: 6px; padding: 8px 10px; font-size: 13px; white-space: pre-wrap; }
.kptbld-group { margin-bottom: 14px; }
.kptbld-label { display: block; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #334155; }
.kptbld-req { color: #dc2626; margin-left: 2px; }
.kptbld-input { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font: inherit; font-size: 13.5px; }
.kptbld-input.is-invalid { border-color: #dc2626; background: #fef2f2; }
.kptbld-err { color: #dc2626; font-size: 12px; margin-top: 4px; display: none; }
.kptbld-hint { color: #64748b; font-size: 12px; margin-top: 4px; }
.kptbld-sign { background: #EFF6FF; border: 1px solid #BFDBFE; border-left: 4px solid #2563EB; border-radius: 6px; padding: 10px 12px; margin-bottom: 12px; font-size: 13px; color: #1E3A8A; }
.kptbld-foot { padding: 12px 22px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; background: #f8fafc; }
@media (max-width: 900px) { .kptbld-body { flex-direction: column; overflow-y: auto; } .kptbld-right { width: auto; padding: 16px; } .kptbld-preview { flex: none; } }
`;

const KPTB_EXTRA_CSS = [
    '.kptb-modal .form-control { border:1px solid #cbd5e1; border-radius:6px; padding:0 10px; }',
    '.kptb-modal textarea.form-control { padding:8px 10px; }',
    '.kptb-modal .form-control.is-invalid, .kptbld-input.is-invalid { border-color:#dc2626 !important; background:#fef2f2; }',
    '.kptb-modal-box { max-height:94vh; }',
    '.kptb-dtl-sec { border:1px solid #e2e8f0; border-radius:10px; padding:14px 16px; margin-bottom:14px; background:#fff; }',
    '.kptb-dtl-title { font-size:13px; font-weight:700; color:#1e293b; text-transform:uppercase; margin-bottom:10px; display:flex; gap:8px; align-items:center; }',
    '.kptb-dtl-title > i { color:#2563eb; }',
    '.kptb-dtl-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:10px 18px; }',
    '.kptb-dtl-item .k { font-size:12px; color:#64748b; margin-bottom:2px; }',
    '.kptb-dtl-item .v { font-size:13.5px; font-weight:600; color:#0f172a; overflow-wrap:anywhere; }',
    '.kptb-hist-row { display:grid; grid-template-columns:130px 160px 1fr; gap:10px; font-size:12.5px; padding:6px 0; border-bottom:1px dashed #e2e8f0; }',
    '.kptb-sub { display:block; font-size:11px; color:#64748b; margin-top:3px; font-weight:500; }',
    '@media (max-width: 700px) { .kptb-dtl-grid, .kptb-gqx-grid2 { grid-template-columns:1fr; } .kptb-hist-row { grid-template-columns:1fr; } }'
].join('\n');
function kptbInjectCss() {
    if (kptbEl('kptbCss')) return;
    const st = document.createElement('style');
    st.id = 'kptbCss';
    st.textContent = KPTB_CSS + '\n' + KPTB_LD_CSS + '\n' + KPTB_EXTRA_CSS;
    document.head.appendChild(st);
}
// Trang mở trong khung (iframe) của Trang chủ: popup phủ toàn bộ cửa sổ trình duyệt
function kptbFrameFull(on) {
    try {
        const fe = window.frameElement; if (!fe) return;
        if (on) { if (fe.dataset.kptbPrev === undefined) fe.dataset.kptbPrev = fe.getAttribute('style') || ''; fe.setAttribute('style', fe.dataset.kptbPrev + ';position:fixed;inset:0;width:100vw;height:100vh;z-index:99999;border:0;'); }
        else if (fe.dataset.kptbPrev !== undefined) { fe.setAttribute('style', fe.dataset.kptbPrev); delete fe.dataset.kptbPrev; }
    } catch (e) { /* khác nguồn: bỏ qua */ }
}
function kptbMark(id, on, msg) {
    const el = kptbEl(id);
    if (el) el.classList.toggle('is-invalid', !!on);
    const er = kptbEl(id + 'Err');
    if (er) { if (msg) er.innerText = msg; er.style.display = on ? 'block' : 'none'; }
}

// ---------------- Văn bản Thông báo chi trả tiền bồi thường - Mẫu số 32/BTNN (bám Mau_32_BTNN_Template.docx) ----------------
function kptbGiayTo(item) {
    const org = /^(công ty|doanh nghiệp|hợp tác xã|tổ chức|ngân hàng)/i.test(String(item.nycName || '').trim());
    return org
        ? 'Giấy giới thiệu/Văn bản ủy quyền của người đại diện theo pháp luật của tổ chức kèm Căn cước của người đến nhận; Thông báo này; Bản sao Giấy chứng nhận đăng ký doanh nghiệp/Quyết định thành lập'
        : 'Căn cước/Căn cước công dân hoặc Hộ chiếu (bản chính); Thông báo này; Văn bản ủy quyền nhận tiền bồi thường hợp pháp (trường hợp nhận thay)';
}
// Nơi nhận mặc định Mẫu 32/BTNN: (9) cơ quan quản lý nhà nước về công tác bồi thường nhà nước để dòng chấm cho cán bộ nhập
const KPTB_NOI_NHAN_DEFAULT = ['- Như trên;', '- ……….;', '- Lưu: VT, HSVV.'].join('\n');
// (7) Nội dung chi trả theo Phương thức chi trả của Quyết định:
// - Nhận tiền mặt: "[Cơ quan chi trả] mời Ông/Bà đến nhận tiền bồi thường:" + "- Thời gian: ..." + "- Địa điểm: ..."
// - Nhận qua chuyển khoản: "[Cơ quan chi trả] sẽ tiến hành chi trả ... theo thông tin ghi trong Quyết định giải quyết bồi thường số [Số QĐ]."
function kptbPayLines(item, n) {
    const dec = item.kptbDec || {};
    const payer = kpEsc(n.payAgency || dec.payAgency || dec.unitName || item.agency || '……');
    if (kptbIsCash(item)) {
        return [`${payer} mời Ông/Bà đến nhận tiền bồi thường:`, `- Thời gian: ${kpEsc(n.time || '……')}`, `- Địa điểm: ${kpEsc(n.place || '……')}`];
    }
    return [`${payer} sẽ tiến hành chi trả tiền bồi thường cho Ông/Bà bằng phương thức chuyển khoản theo thông tin ghi trong Quyết định giải quyết bồi thường số ${kpEsc(dec.decNo || '……')}.`];
}
// (5) Quyết định giải quyết bồi thường có hiệu lực / Bản án, quyết định của Tòa án (tên, số hiệu, ngày ban hành, cơ quan ban hành)
function kptbCanCuText(item) {
    const dec = item.kptbDec || {};
    const label = dec.sourceLabel || 'Quyết định giải quyết bồi thường';
    const issuer = dec.unitName || item.agency || '';
    return `${label} số ${dec.decNo || '……'} ngày ${dec.issueDate || '……'}${issuer ? ' của ' + issuer : ''}`;
}
function kptbBuildDocHtml(item, n) {
    n = n || {};
    const W = kptbW();
    const dec = item.kptbDec || {};
    const issuer = dec.unitName || item.agency || 'Cơ quan giải quyết bồi thường';
    const header = W && W.docHeaderHtml ? W.docHeaderHtml(dec.unitId, 'Mẫu số 32/BTNN', 'TB', { soKyHieu: n.docNo, ngay: n.docDate }) : '';
    const p = s => `<p style="margin:6pt 0; text-align:justify; text-indent:1cm;">${s}</p>`;
    const signerId = n.signerId || '';
    const signer = signerId && W ? W.getUser(signerId) : null;
    const title = signer && signer.title ? String(signer.title).toUpperCase() : 'THỦ TRƯỞNG CƠ QUAN';
    const noiNhan = String(n.noiNhan || KPTB_NOI_NHAN_DEFAULT).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    return `<div style="font-family:'Times New Roman',serif; font-size:14pt; line-height:1.5; color:#000;">
        ${header}
        <p style="text-align:center; margin:16pt 0 2pt;"><b>THÔNG BÁO</b><br><b>Về việc chi trả tiền bồi thường</b></p>
        <p style="text-align:center; margin:10pt 0 2pt;">Kính gửi: ${kpEsc(dec.nycName || item.nycName || '……')}</p>
        <p style="text-align:center; margin:0 0 10pt;">Địa chỉ: ${kpEsc(dec.nycAddress || '……')}</p>
        ${p(`Căn cứ theo quy định tại Điều 62 Luật Trách nhiệm bồi thường của Nhà nước năm 2017 số 10/2017/QH14 (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16); ${kpEsc(kptbCanCuText(item))}, ${kpEsc(issuer)} sẽ chi trả tiền bồi thường cho Ông/Bà như sau:`)}
        ${kptbPayLines(item, n).map(p).join('')}
        ${p(`Hết thời hạn 3 năm, kể từ ngày nhận được Thông báo này mà Ông/Bà không nhận tiền bồi thường, ${kpEsc(issuer)} thực hiện thủ tục trả lại ngân sách nhà nước đối với số tiền bồi thường của Ông/Bà theo quy định tại khoản 3 Điều 62 Luật Trách nhiệm bồi thường của Nhà nước (được sửa đổi, bổ sung bởi Luật số 15/2026/QH16)./.`)}
        <table style="width:100%; border-collapse:collapse; margin-top:18pt;"><tr>
            <td style="width:50%; vertical-align:top; font-size:12pt;"><b><i>Nơi nhận:</i></b><br>${noiNhan.map(kpEsc).join('<br>')}</td>
            <td style="text-align:center; vertical-align:top;"><b>${kpEsc(title)}</b><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i><br>
                ${n.digitalSign ? `<div style="display:inline-block; margin:10pt 0; padding:6pt 10pt; border:1.5px solid #1d4ed8; color:#1d4ed8; font-size:11pt; text-align:left;">Ký số bởi: ${kpEsc(kptbUserName(n.digitalSign.by))}<br>Thời gian ký: ${kpEsc(n.digitalSign.at)}</div><br>` : '<br><br><br><br>'}
                <b>${kpEsc(signer ? signer.name : '')}</b></td>
        </tr></table>
    </div>`;
}
function kptbDocBaseName(item) { return `Mau_32_BTNN_Thong_bao_chi_tra_${item.ycbtCode}`; }
function kptbNoticeData(item) {
    const n = Object.assign({}, item.kptbNotice || {});
    const a = item.kptbApproval || {};
    n.signerId = (n.assignees || a.assignees || [])[((a.path || n.assignees || []).length || 1) - 1] || '';
    return n;
}
function kptbViewNotice(id) {
    const item = kptbFind(id); if (!item) return;
    const n = kptbNoticeData(item);
    if (n.signMethod === 'Ký ngoài' || (n.docFile && !n.docFile.generated)) { showToast('Giả lập mở tệp: ' + (n.signedFile || (n.docFile || {}).name || ''), 'info'); return; }
    const W = kptbW();
    const html = kptbBuildDocHtml(item, n);
    const name = n.digitalSign ? kptbDocBaseName(item) + '_ky_so' : kptbDocBaseName(item);
    if (W && W.openDocTab) W.openDocTab(html, name); else kpOpenDocViewer(html, name);
}

// =====================================================================================
// POPUP TRÌNH KÝ THÔNG BÁO CHI TRẢ (bố cục như popup Trình ký Quyết định GQBT / Không thụ lý)
// =====================================================================================
const KPTB_SIG = { w: 230, h: 90 };
let kptbSg = null;
function kptbEnsureSignModal() {
    kptbInjectCss();
    if (kptbEl('kptbSignModal')) return;
    const m = document.createElement('div');
    m.className = 'kptb-modal';
    m.id = 'kptbSignModal';
    m.innerHTML = `<div class="kptb-modal-box kptb-qs-box" id="kptbSgBox">
        <div class="kptb-qs-head">
            <div>
                <div class="kptb-qs-head-title"><span class="kptb-qs-head-ico"><i class="fa-solid fa-file-signature"></i></span><span>TRÌNH KÝ THÔNG BÁO CHI TRẢ</span></div>
                <div class="kptb-qs-sub">Mã vụ việc: <strong id="kptbSgSubCode" style="color:var(--primary-color);">--</strong><span class="kptb-qs-dot">•</span> Người yêu cầu: <span id="kptbSgSubNyc" style="font-weight:600; color:#334155;">--</span><span class="kptb-qs-dot">•</span> Đơn vị: <span id="kptbSgSubUnit" style="font-weight:500; color:#475569;">--</span></div>
            </div>
            <button type="button" class="kptb-qs-head-close" onclick="kptbCloseSign()" title="Đóng">&times;</button>
        </div>
        <div class="kptb-stepper-fullwidth" id="kptbSgStepper">
            <div class="kptb-step-tab active" id="kptbSgTab1" onclick="if (kptbSg && kptbSg.step === 2) kptbSgGoStep(1);"><span class="kptb-step-badge" id="kptbSgTab1Badge">1</span><span class="kptb-step-title">Nhập thông tin</span></div>
            <div class="kptb-stepper-sep"></div>
            <div class="kptb-step-tab" id="kptbSgTab2" onclick="if (kptbSg && kptbSg.step === 1) kptbSgNext();"><span class="kptb-step-badge">2</span><span class="kptb-step-title">Kéo ô ký &amp; chọn Lãnh đạo</span></div>
        </div>
        <div class="kptb-qs-body kptb-gqx-body" id="kptbSgStep1">
            <div class="kptb-gqx-sec">
                <div class="kptb-gqx-sec-title"><i class="fa-solid fa-signature"></i> Hình thức ký<span class="kptb-gqx-req">*</span></div>
                <div class="kptb-sign-cards-grid">
                    <label class="kptb-sign-card active" id="kptbSgCardOn" for="kptbSgMethodOn">
                        <input type="radio" name="kptbSgMethod" id="kptbSgMethodOn" value="Ký số" checked onchange="kptbSgSetMethod(this.value)">
                        <div class="kptb-sign-card-content"><div class="kptb-sign-card-icon"><i class="fa-solid fa-file-signature"></i></div><div class="kptb-sign-card-text"><div class="kptb-sign-card-title">Ký số trên hệ thống</div><div class="kptb-sign-card-desc">Trình Lãnh đạo ký duyệt trên phần mềm</div></div></div>
                        <div class="kptb-sign-card-check"><i class="fa-solid fa-circle-check"></i></div>
                    </label>
                    <label class="kptb-sign-card" id="kptbSgCardOff" for="kptbSgMethodOff">
                        <input type="radio" name="kptbSgMethod" id="kptbSgMethodOff" value="Ký ngoài" onchange="kptbSgSetMethod(this.value)">
                        <div class="kptb-sign-card-content"><div class="kptb-sign-card-icon offline"><i class="fa-solid fa-stamp"></i></div><div class="kptb-sign-card-text"><div class="kptb-sign-card-title">Ký ngoài (Ban hành trực tiếp)</div><div class="kptb-sign-card-desc">Tải lên văn bản PDF đã ký và đóng dấu</div></div></div>
                        <div class="kptb-sign-card-check"><i class="fa-regular fa-circle"></i></div>
                    </label>
                </div>
            </div>
            <div class="kptb-gqx-sec">
                <div class="kptb-gqx-sec-title"><i class="fa-solid fa-file-signature"></i> <span id="kptbSgDocSecText">Tệp văn bản trình ký</span><span class="kptb-gqx-req">*</span></div>
                <div id="kptbSgDocSrcGroup">
                    <div class="kptb-doc-src-segmented">
                        <button type="button" class="kptb-doc-src-seg-btn active" id="kptbSgSegGen" onclick="kptbSgSetDocSrc('gen')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Sinh văn bản theo mẫu 32/BTNN</span></button>
                        <button type="button" class="kptb-doc-src-seg-btn" id="kptbSgSegUpload" onclick="kptbSgSetDocSrc('upload')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Tải lên từ máy</span></button>
                    </div>
                </div>
                <div class="kptb-qs-meta" id="kptbSgMeta">
                    <div class="kptb-qs-meta-title"><i class="fa-solid fa-sliders"></i> Thông tin điền vào Mẫu 32/BTNN</div>
                    <div class="kptb-gqx-grid2">
                        <div class="kptb-gqx-field">
                            <label class="form-label" for="kptbSgDocNo">Số, ký hiệu văn bản<span class="kptb-gqx-req">*</span></label>
                            <input type="text" class="form-control" id="kptbSgDocNo" maxlength="100" placeholder="Nhập số, ký hiệu văn bản" oninput="kptbMark('kptbSgDocNo', false)">
                            <div class="kptb-gqx-err" id="kptbSgDocNoErr">Đây là trường bắt buộc</div>
                        </div>
                        <div class="kptb-gqx-field">
                            <label class="form-label" for="kptbSgDocDate">Ngày văn bản<span class="kptb-gqx-req">*</span></label>
                            <div class="kptb-gqx-date">
                                <input type="text" class="form-control" id="kptbSgDocDate" placeholder="dd/mm/yyyy" readonly onchange="kptbMark('kptbSgDocDate', false)">
                                <i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById('kptbSgDocDate'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i>
                            </div>
                            <div class="kptb-gqx-err" id="kptbSgDocDateErr">Đây là trường bắt buộc</div>
                        </div>
                    </div>
                    <div id="kptbSgCashGroup" style="display:none;">
                        <div class="kptb-qs-meta-title" style="margin-top:4px;"><i class="fa-solid fa-money-bill-wave"></i> Nội dung thông báo</div>
                        <div class="kptb-gqx-grid2">
                            <div class="kptb-gqx-field">
                                <label class="form-label" for="kptbSgTime">Thời gian</label>
                                <div class="kptb-gqx-date">
                                    <input type="text" class="form-control" id="kptbSgTime" placeholder="hh:mm dd/mm/yyyy" readonly>
                                    <i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById('kptbSgTime'); if(i._flatpickr) i._flatpickr.open();" title="Chọn thời gian"></i>
                                </div>
                            </div>
                            <div class="kptb-gqx-field">
                                <label class="form-label" for="kptbSgPlace">Địa điểm</label>
                                <input type="text" class="form-control" id="kptbSgPlace" maxlength="500" placeholder="Nhập địa điểm chi trả">
                            </div>
                        </div>
                    </div>
                    <div class="kptb-gqx-field" style="margin-top:8px;">
                        <label class="form-label" for="kptbSgNoiNhan">Nơi nhận</label>
                        <textarea class="form-control" id="kptbSgNoiNhan" rows="3" maxlength="2000" placeholder="Mỗi nơi nhận 01 dòng"></textarea>
                    </div>
                </div>
                <div id="kptbSgOnline">
                    <input type="file" id="kptbSgDocInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="kptbSgUploadDoc(this)">
                    <div id="kptbSgDocBox"></div>
                    <div class="kptb-gqx-err" id="kptbSgDocErr">Đây là trường bắt buộc</div>
                </div>
                <div id="kptbSgOffSec" style="display:none;">
                    <input type="file" id="kptbSgOffInput" accept=".pdf" style="display:none;" onchange="kptbSgUploadOff(this)">
                    <div id="kptbSgOffBox"></div>
                    <div class="kptb-gqx-err" id="kptbSgOffErr">Vui lòng tải lên tệp văn bản PDF đã ký và đóng dấu.</div>
                    <div class="kptb-status-note"><i class="fa-solid fa-circle-info"></i> Khi bấm <strong>Ban hành văn bản</strong>, Thông báo chi trả được ban hành trực tiếp (không qua bước duyệt của Lãnh đạo trên hệ thống) và bản ghi chuyển sang trạng thái <strong>Chờ chi trả</strong>.</div>
                </div>
            </div>
            <div id="kptbSgTlkt"></div>
        </div>
        <div class="kptb-qs-step2" id="kptbSgStep2">
            <div class="kptb-qs-preview"><div class="kptb-qs-a4" id="kptbSgA4"></div></div>
            <div class="kptb-qs-side">
                <div style="font-size:13px; font-weight:700; color:#1e293b;"><i class="fa-solid fa-stamp" style="color:#2563eb;"></i> THIẾT LẬP VỊ TRÍ &amp; KÍCH THƯỚC CHỮ KÝ</div>
                <div id="kptbSgLevels" style="display:flex; flex-direction:column; gap:12px;"></div>
                <div style="font-size:11.5px; color:#64748b;">Bấm <b>Đặt chữ ký</b> để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí.</div>
                <div class="kptb-qs-field" style="margin-bottom:0;">
                    <label class="form-label" for="kptbSgContent">Nội dung trình</label>
                    <textarea class="form-control" id="kptbSgContent" rows="4" maxlength="2000" placeholder="Nhập nội dung trình Lãnh đạo..."></textarea>
                </div>
            </div>
        </div>
        <div class="kptb-modal-foot kptb-qs-foot">
            <div class="kptb-qs-foot-btns">
                <button type="button" class="btn btn-secondary" onclick="kptbCloseSign()">Hủy bỏ</button>
                <button type="button" class="btn btn-secondary" id="kptbSgBtnBack" onclick="kptbSgGoStep(1)" style="display:none;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
                <button type="button" class="btn btn-primary" id="kptbSgBtnNext" onclick="kptbSgNext()" style="background:#2563eb; border-color:#2563eb; font-weight:600; padding:8px 20px;"><span>Tiếp tục</span> <i class="fa-solid fa-arrow-right"></i></button>
                <button type="button" class="btn btn-primary" id="kptbSgBtnSubmit" onclick="kptbSgSubmit()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button>
                <button type="button" class="btn btn-primary" id="kptbSgBtnIssue" onclick="kptbSgIssueOffline()" style="display:none; background:#16a34a; border-color:#16a34a; font-weight:600; padding:8px 20px;"><i class="fa-solid fa-paper-plane"></i> Ban hành văn bản</button>
            </div>
        </div>
    </div>`;
    document.body.appendChild(m);
}
function kptbCanSubmit(item) { return kptbIs(item) && [KPTB_ST.WAIT, KPTB_ST.SUPP, KPTB_ST.REJECT].includes(item.status); }
// Bản ghi đang trình: bản nháp từ màn hình Tạo thông báo chi trả (kpcd) hoặc bản ghi trong danh sách
function kptbSgItem() { return kptbSg ? (kptbSg.draft || kptbFind(kptbSg.id)) : null; }
// draft: bản ghi nháp từ màn hình Tạo thông báo chi trả (Thời gian/Địa điểm, Tài liệu đính kèm nhập tại màn hình tạo)
function kptbOpenSign(id, draft) {
    const item = draft || kptbFind(id);
    if (!kptbCanSubmit(item)) return;
    kptbEnsureSignModal();
    const levels = kptbLevels(item.ycbtCode);
    const prev = item.kptbNotice || {};
    kptbSg = { id: item.id, draft: draft || null, method: 'Ký số', docSrc: 'gen', step: 1, levels, assignees: levels.map((lv, i) => (prev.assignees && prev.assignees[i]) || lv.leaders[0] || ''), placed: {}, coords: {}, docFile: null, offFile: null };
    kptbEl('kptbSgNoiNhan').value = prev.noiNhan || KPTB_NOI_NHAN_DEFAULT;
    kptbEl('kptbSgSubCode').innerText = kptbVv(item.ycbtCode) || item.ycbtCode || '--';
    kptbEl('kptbSgSubNyc').innerText = item.nycName || '--';
    kptbEl('kptbSgSubUnit').innerText = (item.kptbDec || {}).unitName || item.agency || '--';
    kptbEl('kptbSgMethodOn').checked = true;
    kptbEl('kptbSgDocNo').value = prev.docNo || '     /TB-';
    kptbEl('kptbSgDocDate').value = prev.docDate || kptbToday();
    kptbEl('kptbSgTime').value = prev.time || '';
    kptbEl('kptbSgPlace').value = prev.place || '';
    kptbEl('kptbSgCashGroup').style.display = kptbIsCash(item) && !draft ? '' : 'none';
    kptbEl('kptbSgContent').value = '';
    ['kptbSgDocNo', 'kptbSgDocDate'].forEach(x => kptbMark(x, false));
    document.querySelectorAll('#kptbSignModal .kptb-qs-err, #kptbSignModal .kptb-gqx-err').forEach(e => { e.style.display = 'none'; });
    if (window.flatpickr) {
        if (!kptbEl('kptbSgDocDate')._flatpickr) flatpickr('#kptbSgDocDate', { dateFormat: 'd/m/Y', allowInput: true });
        if (!kptbEl('kptbSgTime')._flatpickr) flatpickr('#kptbSgTime', { enableTime: true, time_24hr: true, dateFormat: 'H:i d/m/Y', allowInput: true });
        const fp = kptbEl('kptbSgDocDate')._flatpickr; if (fp) fp.setDate(kptbEl('kptbSgDocDate').value, false, 'd/m/Y');
    }
    kptbSgRenderOff();
    kptbSgSetDocSrc('gen');
    // Tài liệu đính kèm (Ký số): lần trình lại nạp lại danh sách của lần trình trước
    if (typeof tlktMount === 'function') tlktMount('kptbSg', 'kptbSgTlkt', { required: false, rows: prev.attachments || [], secClass: 'kptb-gqx-sec', titleClass: 'kptb-gqx-sec-title' });
    kptbSgSetMethod('Ký số');
    kptbSgGoStep(1);
    kptbFrameFull(true);
    kptbEl('kptbSignModal').classList.add('open');
}
function kptbCloseSign() {
    if (kptbSg) kptbSgCancelConvert();
    const m = kptbEl('kptbSignModal'); if (m) m.classList.remove('open');
    const b = kptbEl('kptbSgBox'); if (b) b.classList.remove('kptb-qs-wide');
    kptbFrameFull(false);
}
function kptbSgSetMethod(m) {
    kptbSg.method = m;
    const on = m === 'Ký số';
    [['kptbSgCardOn', on], ['kptbSgCardOff', !on]].forEach(([id, act]) => {
        const card = kptbEl(id); card.classList.toggle('active', act);
        const ico = card.querySelector('.kptb-sign-card-check i'); if (ico) ico.className = act ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
    kptbEl('kptbSgDocSecText').innerText = on ? 'Tệp văn bản trình ký' : 'Tệp văn bản đã ký & đóng dấu';
    kptbEl('kptbSgDocSrcGroup').style.display = on ? '' : 'none';
    kptbEl('kptbSgOnline').style.display = on ? '' : 'none';
    kptbEl('kptbSgOffSec').style.display = on ? 'none' : '';
    // Stepper 2 bước chỉ hiển thị khi Ký số; Ký ngoài thu gọn (ẩn hẳn)
    const bar = kptbEl('kptbSgStepper');
    bar.style.display = 'flex'; bar.classList.toggle('is-collapsed', !on); bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    // Ký số: 02 khối Tài liệu ban hành / không ban hành kèm theo; Ký ngoài: chỉ khối ban hành kèm theo; tạo từ màn Tạo thông báo chi trả: tài liệu đã nhập tại màn tạo
    if (typeof tlktMode === 'function') tlktMode('kptbSg', kptbSg.draft ? 'hidden' : (on ? 'online' : 'offline'));
    else if (typeof tlktShow === 'function') tlktShow('kptbSg', on && !kptbSg.draft);
    kptbSgApplyMeta();
    kptbSgGoStep(1);
}
// Thông tin điền vào Mẫu 32/BTNN: chỉ hiển thị khi Ký số + Sinh văn bản theo mẫu
function kptbSgApplyMeta() { kptbEl('kptbSgMeta').style.display = kptbSg.method === 'Ký số' && kptbSg.docSrc === 'gen' ? '' : 'none'; }
function kptbSgSetDocSrc(src) {
    kptbSg.docSrc = src;
    kptbEl('kptbSgSegGen').classList.toggle('active', src === 'gen');
    kptbEl('kptbSgSegUpload').classList.toggle('active', src !== 'gen');
    kptbSgCancelConvert();
    kptbSg.docFile = null;
    kptbEl('kptbSgDocErr').style.display = 'none';
    kptbSgApplyMeta();
    kptbSgRenderDoc();
}
function kptbSgGoStep(n) {
    kptbSg.step = n;
    kptbEl('kptbSgStep1').style.display = n === 1 ? '' : 'none';
    kptbEl('kptbSgStep2').style.display = n === 2 ? 'flex' : 'none';
    kptbEl('kptbSgBox').classList.toggle('kptb-qs-wide', n === 2);
    kptbEl('kptbSgTab1').className = 'kptb-step-tab ' + (n === 1 ? 'active' : 'completed');
    kptbEl('kptbSgTab1Badge').innerHTML = n === 1 ? '1' : '<i class="fa-solid fa-check"></i>';
    kptbEl('kptbSgTab2').className = 'kptb-step-tab' + (n === 2 ? ' active' : '');
    kptbEl('kptbSgBtnBack').style.display = n === 2 ? '' : 'none';
    kptbEl('kptbSgBtnNext').style.display = n === 1 && kptbSg.method === 'Ký số' ? '' : 'none';
    kptbEl('kptbSgBtnSubmit').style.display = n === 2 ? '' : 'none';
    kptbEl('kptbSgBtnIssue').style.display = n === 1 && kptbSg.method === 'Ký ngoài' ? '' : 'none';
}
function kptbSgData() {
    const item = kptbSgItem();
    const cash = kptbIsCash(item);
    const fm = (kptbSg.draft && kptbSg.draft.kpcdForm) || null;
    return {
        docNo: kptbEl('kptbSgDocNo').value.trim(), docDate: kptbEl('kptbSgDocDate').value.trim(),
        time: cash ? (fm ? fm.time : kptbEl('kptbSgTime').value.trim()) : '', place: cash ? (fm ? fm.place : kptbEl('kptbSgPlace').value.trim()) : '',
        payAgency: fm ? fm.payAgency : '',
        noiNhan: kptbEl('kptbSgNoiNhan').value.trim(),
        signerId: kptbSg.assignees[kptbSg.levels.length - 1] || ''
    };
}
function kptbSgRenderDoc() {
    const f = kptbSg.docFile;
    if (kptbSg.docSrc === 'gen') {
        kptbEl('kptbSgDocBox').innerHTML = `<div class="kptb-gen-row"><div class="kptb-gen-hint"><i class="fa-solid fa-file-circle-check"></i><span>Hệ thống tự động sinh Thông báo chi trả tiền bồi thường theo Mẫu 32/BTNN từ thông tin đang nhập.</span></div><button type="button" class="kptb-btn-preview" onclick="if (kptbSgGenerate()) kptbSgViewDoc();"><i class="fa-solid fa-eye"></i> Xem trước văn bản</button></div>`;
        return;
    }
    // Tải lên từ máy: vùng kéo thả (chưa có tệp) / đang chuyển đổi sang PDF / File Card (đã có tệp)
    if (kptbSg.converting) { kptbEl('kptbSgDocBox').innerHTML = '<div class="kptb-converting"><span class="kptb-spinner"></span> Đang chuyển đổi sang PDF...</div>'; return; }
    kptbEl('kptbSgDocBox').innerHTML = !f
        ? kptbDropHtml('kptbSgDocInput', 'kptbSgUploadDoc', 'Kéo thả tệp vào đây hoặc <a>Chọn tệp từ máy</a>', 'Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB)')
        : kptbFileCardHtml(f.name, f.size, f.note, 'kptbSgViewDoc()', 'kptbSg.docFile = null; kptbSgRenderDoc();');
}
// ---------- Tiện ích dùng chung: vùng kéo thả / File Card / chuyển đổi sang PDF ----------
function kptbDropHtml(inputId, uploadFn, main, sub) {
    return `<div class="kptb-drop" tabindex="0" role="button" onclick="document.getElementById('${inputId}').click()" onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.click(); }" ondragover="kptbDragOver(event)" ondragleave="kptbDragLeave(event)" ondrop="kptbDropFile(event, ${uploadFn})"><i class="fa-solid fa-cloud-arrow-up kptb-drop-ico"></i><div class="kptb-drop-main">${main}</div><div class="kptb-drop-sub">${sub}</div></div>`;
}
// File Card: icon định dạng + tên + dung lượng | Xem file (mở tệp tại tab mới), Xóa
function kptbFileCardHtml(name, size, note, viewJs, removeJs) {
    const isPdf = /\.pdf$/i.test(name || '');
    return `<div class="kptb-fcard"><i class="fa-solid ${isPdf ? 'fa-file-pdf pdf' : 'fa-file-word word'} kptb-fcard-ico"></i><div class="kptb-fcard-info"><div class="kptb-fcard-name">${kpEsc(name || '')}</div><div class="kptb-fcard-meta">${kpEsc(size || '')}${note ? ' · ' + kpEsc(note) : ''}</div></div><div class="kptb-fcard-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="${viewJs}"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm kptb-gqx-danger" onclick="${removeJs}"><i class="fa-solid fa-trash"></i> Xóa</button></div></div>`;
}
function kptbDragOver(e) { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; e.currentTarget.classList.add('drag-over'); }
function kptbDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function kptbDropFile(e, uploadFn) {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    const files = e.dataTransfer && e.dataTransfer.files;
    if (files && files.length) uploadFn({ files: [files[0]], value: '' });
}
// Khóa nút Tiếp tục khi đang chuyển đổi .doc/.docx sang PDF
function kptbSgSetBusy(busy) {
    const btn = kptbEl('kptbSgBtnNext'); if (!btn) return;
    btn.disabled = !!busy; btn.style.opacity = busy ? '0.55' : ''; btn.style.cursor = busy ? 'not-allowed' : '';
    btn.title = busy ? 'Đang chuyển đổi tệp sang PDF, vui lòng chờ' : '';
}
function kptbSgCancelConvert() { if (kptbSg) { kptbSg.converting = false; kptbSg.convToken = (kptbSg.convToken || 0) + 1; } kptbSgSetBusy(false); }
// Popup xác nhận Ban hành văn bản (Ký ngoài), hiển thị trên popup trình ký
function kptbConfirmIssue(message, onOk) {
    const ov = document.getElementById('customConfirmOverlay');
    const okBtn = ov ? ov.querySelector('.confirm-modal-footer .btn-danger') : null;
    const prev = { z: ov ? ov.style.zIndex : '', text: okBtn ? okBtn.innerHTML : '', bg: okBtn ? okBtn.style.backgroundColor : '' };
    const restore = () => { if (ov) ov.style.zIndex = prev.z; if (okBtn) { okBtn.innerHTML = prev.text; okBtn.style.backgroundColor = prev.bg; } };
    showConfirmModal(message, () => { restore(); onOk(); }, 'Xác nhận ban hành văn bản');
    if (ov) ov.style.zIndex = '10050';
    if (okBtn) { okBtn.innerHTML = 'Ban hành'; okBtn.style.backgroundColor = '#16a34a'; }
    const noBtn = ov ? ov.querySelector('.confirm-modal-footer .btn-secondary') : null;
    if (noBtn) noBtn.addEventListener('click', restore, { once: true });
}
// Sinh văn bản Mẫu 32/BTNN; chỉ kiểm tra trống Số, ký hiệu văn bản và Ngày văn bản
function kptbSgGenerate() {
    const bad = ['kptbSgDocNo', 'kptbSgDocDate'].filter(id => !kptbEl(id).value.trim());
    ['kptbSgDocNo', 'kptbSgDocDate'].forEach(id => kptbMark(id, bad.includes(id)));
    if (bad.length) { kptbEl(bad[0]).focus(); return false; }
    const item = kptbSgItem();
    kptbSg.docFile = { name: kptbDocBaseName(item) + '.doc', generated: true, html: kptbBuildDocHtml(item, kptbSgData()) };
    kptbEl('kptbSgDocErr').style.display = 'none';
    return true;
}
function kptbSgViewDoc() {
    const f = kptbSg.docFile; if (!f) return;
    const W = kptbW();
    if (f.generated) { if (W && W.openDocTab) W.openDocTab(f.html, f.name.replace(/\.doc$/, '')); else kpOpenDocViewer(f.html, f.name.replace(/\.doc$/, '')); }
    else btnnOpenUploadedFile(f);
}
function kptbSgUploadDoc(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    if (!/\.(docx|doc|pdf)$/i.test(f.name)) { showToast('Tệp không đúng định dạng (chỉ chấp nhận .docx, .doc, .pdf).', 'error'); return; }
    if (f.size > KPTB_MAX_FILE) { showToast('Tệp vượt quá dung lượng tối đa 50MB.', 'error'); return; }
    kptbEl('kptbSgDocErr').style.display = 'none';
    const size = kptbFileSize(f.size);
    if (/\.docx?$/i.test(f.name)) {
        // .doc/.docx: chuyển đổi sang PDF (~1,2s), khóa nút Tiếp tục trong lúc chuyển đổi
        kptbSg.docFile = null; kptbSg.converting = true;
        const st = kptbSg; const token = st.convToken = (st.convToken || 0) + 1;
        kptbSgSetBusy(true); kptbSgRenderDoc();
        setTimeout(() => {
            if (!st.converting || st.convToken !== token) return;
            st.converting = false; kptbSgSetBusy(false);
            st.docFile = { name: f.name.replace(/\.docx?$/i, '.pdf'), size, note: 'Đã chuyển đổi từ ' + f.name, generated: false, raw: f };
            if (kptbSg === st) kptbSgRenderDoc();
        }, 1200);
        return;
    }
    kptbSg.docFile = { name: f.name, size, generated: false, raw: f };
    kptbSgRenderDoc();
}
function kptbSgRenderOff() {
    const f = kptbSg.offFile;
    kptbEl('kptbSgOffBox').innerHTML = !f
        ? kptbDropHtml('kptbSgOffInput', 'kptbSgUploadOff', 'Kéo thả tệp PDF đã ký &amp; đóng dấu vào đây, hoặc bấm <a>Tải file</a>', '(Chỉ chấp nhận .pdf, tối đa 50MB)')
        : kptbFileCardHtml(f.name, f.size, '', 'btnnOpenUploadedFile(kptbSg.offFile)', 'kptbSg.offFile = null; kptbSgRenderOff();');
}
function kptbSgUploadOff(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    if (!/\.pdf$/i.test(f.name)) { showToast('Tệp không đúng định dạng (chỉ chấp nhận .pdf).', 'error'); return; }
    if (f.size > KPTB_MAX_FILE) { showToast('Tệp vượt quá dung lượng tối đa 50MB.', 'error'); return; }
    kptbSg.offFile = { name: f.name, size: kptbFileSize(f.size), raw: f };
    kptbEl('kptbSgOffErr').style.display = 'none';
    kptbSgRenderOff();
}
// Tiếp tục (Ký số): Sinh văn bản -> sinh Mẫu 32/BTNN; Tải lên từ máy -> bắt buộc có tệp
function kptbSgNext() {
    if (!kptbSg.levels.length) { showToast('Chưa xác định được cấp phê duyệt. Vui lòng liên hệ Quản trị hệ thống.', 'error'); return; }
    const okTlkt = typeof tlktValidate !== 'function' || tlktValidate('kptbSg');
    if (kptbSg.docSrc === 'gen') { if (!kptbSgGenerate()) return; }
    else if (!kptbSg.docFile) { kptbEl('kptbSgDocErr').style.display = 'block'; return; }
    if (!okTlkt) return;
    const f = kptbSg.docFile;
    kptbEl('kptbSgA4').innerHTML = f.generated ? f.html : `<div style="text-align:center; color:#64748b; padding-top:300px; font:14px Inter, sans-serif;"><i class="fa-solid fa-file-lines" style="font-size:48px;"></i><br><br>${kpEsc(f.name)}<br>(Văn bản tải lên)</div>`;
    kptbSgRenderLevels();
    kptbSgGoStep(2);
    kptbSg.levels.forEach((lv, i) => { if (kptbSg.placed[i]) kptbSgDrawBox(i); });
}
function kptbSgRenderLevels() {
    const n = kptbSg.levels.length;
    kptbEl('kptbSgLevels').innerHTML = kptbSg.levels.map((lv, i) => {
        const last = i === n - 1;
        const opts = lv.leaders.map(id => `<option value="${kpEsc(id)}" ${kptbSg.assignees[i] === id ? 'selected' : ''}>${kpEsc(kptbUserLabel(id))}</option>`).join('');
        return `<div class="kptb-qs-card${last ? ' last' : ''}"><div class="kptb-qs-card-head"><span>Cấp ${i + 1} - ${kpEsc(kptbUnitName(lv.unitId))}</span>${lv.unitId && window.BTNN_WF && BTNN_WF.isKyNhayUnit && BTNN_WF.isKyNhayUnit(lv.unitId) ? '<span class="badge" style="font-size:10.5px;">Ký nháy</span>' : ''}</div>
            <select class="form-control" id="kptbSgLeader${i}" style="font-size:13px; height:36px;" onchange="kptbSg.assignees[${i}] = this.value; kptbMark('kptbSgLeader${i}', false); kptbSgSyncBox(${i});"><option value="">-- Chọn Lãnh đạo --</option>${opts}</select>
            <div class="kptb-qs-err" id="kptbSgLeader${i}Err">Đây là trường bắt buộc</div>
            <div style="margin-top:8px;">${kptbSg.placed[i]
                ? `<span style="display:flex; gap:4px; flex-wrap:wrap;"><button type="button" class="btn btn-secondary btn-sm" onclick="kptbSgResize(${i},180,75)">Nhỏ</button><button type="button" class="btn btn-secondary btn-sm" onclick="kptbSgResize(${i},230,90)">Vừa</button><button type="button" class="btn btn-secondary btn-sm" onclick="kptbSgResize(${i},290,115)">Lớn</button><button type="button" class="btn btn-secondary btn-sm" onclick="kptbSgResetBox(${i})"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button></span>`
                : `<button type="button" class="btn btn-secondary btn-sm" onclick="kptbSgPlace(${i})"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button><div class="kptb-qs-err" id="kptbSgPlace${i}Err">Chưa đặt chữ ký</div>`}</div></div>`;
    }).join('');
}
function kptbSgDefaultCoord(i) {
    const a4 = kptbEl('kptbSgA4'); const h = Math.max(a4.scrollHeight, 1123); const last = i === kptbSg.levels.length - 1;
    return { x: last ? 470 : 60, y: h - 230, w: KPTB_SIG.w, h: KPTB_SIG.h };
}
function kptbSgPlace(i) { kptbSg.placed[i] = true; kptbSg.coords[i] = kptbSg.coords[i] || kptbSgDefaultCoord(i); kptbSgRenderLevels(); kptbSgDrawBox(i); const b = kptbEl('kptbSgSig' + i); if (b) b.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
function kptbSgResetBox(i) { kptbSg.coords[i] = kptbSgDefaultCoord(i); kptbSgDrawBox(i); }
function kptbSgResize(i, w, h) { Object.assign(kptbSg.coords[i], { w, h }); kptbSgDrawBox(i); }
function kptbSgSyncBox(i) { if (kptbSg.placed[i]) kptbSgDrawBox(i); }
function kptbSgDrawBox(i) {
    let b = kptbEl('kptbSgSig' + i);
    const last = i === kptbSg.levels.length - 1;
    if (!b) {
        b = document.createElement('div'); b.id = 'kptbSgSig' + i; b.className = 'kptb-qs-sig' + (last ? ' last' : '');
        kptbEl('kptbSgA4').appendChild(b);
        b.addEventListener('mousedown', ev => {
            const c = kptbSg.coords[i]; const sx = ev.clientX, sy = ev.clientY, ox = c.x, oy = c.y;
            const mv = e => { c.x = Math.max(0, ox + e.clientX - sx); c.y = Math.max(0, oy + e.clientY - sy); b.style.left = c.x + 'px'; b.style.top = c.y + 'px'; };
            const up = () => { document.removeEventListener('mousemove', mv); document.removeEventListener('mouseup', up); };
            document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up); ev.preventDefault();
        });
    }
    const c = kptbSg.coords[i];
    Object.assign(b.style, { left: c.x + 'px', top: c.y + 'px', width: c.w + 'px', height: c.h + 'px' });
    const who = kptbSg.assignees[i] ? kptbUserName(kptbSg.assignees[i]) : '';
    b.innerHTML = `<b>${last ? 'KÝ SỐ &amp; CON DẤU' : 'KÝ NHÁY'}</b><br>Cấp ${i + 1}${who ? ' - ' + kpEsc(who) : ''}`;
}
// Trình Lãnh đạo: mỗi cấp chọn Lãnh đạo và đặt chữ ký -> "Chờ duyệt", Loại trình "Thông báo chi trả"
function kptbSgSubmit() {
    let ok = true; let first = null;
    kptbSg.levels.forEach((lv, i) => {
        const bad = !kptbEl('kptbSgLeader' + i).value; kptbMark('kptbSgLeader' + i, bad); if (bad) { ok = false; first = first || kptbEl('kptbSgLeader' + i); }
        const pe = kptbEl('kptbSgPlace' + i + 'Err'); if (!kptbSg.placed[i]) { if (pe) pe.style.display = 'block'; ok = false; }
    });
    if (!ok) { if (first) first.focus(); return; }
    if (!kptbCanSubmit(kptbSgItem())) { kptbCloseSign(); return; }
    const data = kptbSgData();
    const fromForm = !!kptbSg.draft;
    const attachments = fromForm ? (kptbSg.draft.kpcdForm.attachments || []) : (typeof tlktGet === 'function' ? tlktGet('kptbSg') : []);
    const item = kpcdTbCommit(kptbSgItem());
    const me = kptbMe();
    const f = kptbSg.docFile;
    const content = kptbEl('kptbSgContent').value.trim();
    const path = kptbSg.levels.map(l => l.unitId);
    item.kptbNotice = Object.assign({ signMethod: 'Ký số' }, data, { docFile: { name: f.name, generated: !!f.generated }, assignees: kptbSg.assignees.slice(), sigCoords: JSON.parse(JSON.stringify(kptbSg.coords)), attachments });
    if (!f.generated) { item.kptbNotice.docNo = ''; item.kptbNotice.docDate = ''; }
    item.kptbApproval = { kind: KPTB_KIND, path, assignees: kptbSg.assignees.slice(), level: 0, steps: [], content, submittedBy: me, submittedAt: kptbNow(), pending: true, prevStatus: item.status, attachments };
    item.kptbReturned = null;
    item.status = KPTB_ST.REVIEW;
    item.user = kptbUserName(me);
    const nextText = path.length > 1 ? ' Lãnh đạo cấp tiếp theo: ' + path.slice(1).map((u, i) => `${kptbUserName(kptbSg.assignees[i + 1])} - ${kptbUnitName(u)}`).join('; ') + '.' : '';
    kptbHist(item, 'Trình ký', `${KPTB_KIND}. Trình ${kptbUserName(kptbSg.assignees[0])} - ${kptbUnitName(path[0])}.${nextText}${content ? ' Nội dung: ' + content : ''}`);
    if (attachments.length) item.kptbHistory[item.kptbHistory.length - 1].attachments = attachments;
    saveProposalsToLocal();
    kptbCloseSign();
    showToast(`Đã trình ${kptbUserLabel(kptbSg.assignees[0])} ký duyệt Thông báo chi trả. Bản ghi chuyển [${KPTB_ST.REVIEW}].`, 'success');
    if (fromForm) kpcdTbShowPage(false);
    kptbAfterChange(item.id);
}
// Ký ngoài: ban hành trực tiếp, không trình Lãnh đạo -> "Chờ chi trả"
function kptbSgIssueOffline(confirmed) {
    if (!kptbSg.offFile) {
        kptbEl('kptbSgOffErr').style.display = 'block';
        const dz = kptbEl('kptbSgOffBox').querySelector('.kptb-drop'); if (dz) { dz.classList.add('is-error'); dz.focus(); }
        return;
    }
    if (confirmed !== true) {
        kptbConfirmIssue(`Văn bản ký ngoài sẽ được ban hành trực tiếp, bỏ qua bước duyệt của Lãnh đạo trên hệ thống. Bản ghi sẽ chuyển sang trạng thái "${KPTB_ST.PAY}". Bạn có chắc chắn muốn ban hành văn bản?`, () => kptbSgIssueOffline(true));
        return;
    }
    if (!kptbCanSubmit(kptbSgItem())) { kptbCloseSign(); return; }
    const fromForm = !!kptbSg.draft;
    // Ký ngoài: chỉ Tài liệu ban hành kèm theo (tài liệu không ban hành kèm theo nhập tại màn tạo không lưu khi ban hành ngay)
    const offAtt = fromForm ? (typeof tlktIssuedOnly === 'function' ? tlktIssuedOnly(kptbSg.draft.kpcdForm.attachments || []) : []) : (typeof tlktGet === 'function' ? tlktGet('kptbSg') : []);
    const item = kpcdTbCommit(kptbSgItem());
    const me = kptbMe();
    item.kptbNotice = { signMethod: 'Ký ngoài', signedFile: kptbSg.offFile.name, issuedAt: kptbNow(), issuedBy: me, attachments: offAtt };
    // Ngày người yêu cầu nhận thông báo (mốc tính hạn 03 năm): Cán bộ nhập 01 lần tại khối Thông tin thông báo chi trả, không tự gán khi ban hành
    item.kptbApproval = null;
    item.kptbReturned = null;
    item.status = KPTB_ST.PAY;
    item.user = kptbUserName(me);
    kptbHist(item, 'Ban hành Thông báo chi trả (Ký ngoài)', `Tệp đã ký: ${kptbSg.offFile.name}.`);
    saveProposalsToLocal();
    kptbCloseSign();
    showToast(`Đã ban hành Thông báo chi trả (Ký ngoài). Bản ghi chuyển [${KPTB_ST.PAY}].`, 'success');
    if (fromForm) kpcdTbShowPage(false);
    kptbAfterChange(item.id);
}
function kptbAfterChange(id) {
    kptbCloseView();
    renderProposalsTable();
    updateBudgetStats();
}

// =====================================================================================
// LÃNH ĐẠO KÝ DUYỆT / TỪ CHỐI (toàn màn hình, như Xác định CQGQBT / Quyết định GQBT)
// =====================================================================================
let kptbLd = null;
function kptbLdHistoryHtml(item) {
    const a = item.kptbApproval || {};
    const W = kptbW();
    const initials = n => String(n || '').trim().split(/\s+/).slice(-3).map(w => w[0] || '').join('').toUpperCase();
    const sub = uid => { const u = W && uid ? W.getUser(uid) : null; return u ? [u.title, W.unitName(u.unitId)].filter(Boolean).join(' - ') : ''; };
    const stepIcon = { done: 'fa-solid fa-circle-check', no: 'fa-solid fa-circle-xmark', wait: 'fa-regular fa-clock', todo: 'fa-regular fa-circle' };
    const row = (st, uid, name, at, cls, icon, act, msg, docs) => `<div class="kptbld-hv ${st}"><div class="kptbld-hv-step"><i class="${stepIcon[st]}"></i></div><div class="kptbld-hv-av">${kpEsc(initials(name))}</div><div class="kptbld-hv-main">`
        + `<div class="kptbld-hv-head"><span class="kptbld-hv-name">${kpEsc(name || '--')}</span>${at ? `<span class="kptbld-hv-time"><i class="fa-regular fa-clock"></i> ${kpEsc(at)}</span>` : ''}</div>`
        + (sub(uid) ? `<div class="kptbld-hv-sub">${kpEsc(sub(uid))}</div>` : '')
        + (act ? `<div class="kptbld-hv-act ${cls}"><i class="${icon}"></i> ${act}</div>` : '')
        + (msg ? `<div class="kptbld-hv-msg">${kpEsc(msg)}</div>` : '') + (docs && typeof tlktInlineHtml === 'function' ? tlktInlineHtml(docs) : '') + `</div></div>`;
    const pick = (re, s) => { const m = re.exec(s || ''); return m ? m[1].trim() : ''; };
    const items = [];
    (item.kptbHistory || []).filter(h => /^(Trình ký|Ký duyệt|Từ chối)/.test(h.action || '')).forEach(h => {
        if (/^Trình ký/.test(h.action)) items.push(row('done', h.userId, h.userName, h.at, '', 'fa-solid fa-circle-arrow-right', `Trình ký ${kpEsc(KPTB_KIND)}`, pick(/Nội dung: (.*)$/, h.note), h.attachments));
        else if (/^Từ chối/.test(h.action)) items.push(row('no', h.userId, h.userName, h.at, 'no', 'fa-solid fa-ban', 'Từ chối - trả lại cán bộ trình', pick(/Lý do: (.*)$/, h.note)));
        else {
            const to = pick(/; chuyển ([^.]+)\./, h.note);
            items.push(to ? row('done', h.userId, h.userName, h.at, '', 'fa-solid fa-circle-arrow-right', `Ký duyệt và chuyển xử lý đến <strong>${kpEsc(to)}</strong>`, pick(/Ý kiến: (.*)$/, h.note))
                : row('done', h.userId, h.userName, h.at, 'ok', 'fa-regular fa-circle-check', 'Ký duyệt', pick(/Ý kiến: (.*)$/, h.note)));
        }
    });
    if (a.pending) {
        for (let lv = a.level; lv < (a.path || []).length; lv++) {
            const uid = (a.assignees || [])[lv] || '';
            const nm = uid ? kptbUserName(uid) : kptbUnitName(a.path[lv]);
            items.push(lv === a.level ? row('wait', uid, nm, '', 'wait', 'fa-solid fa-hourglass-half', 'Chờ ký duyệt', '') : row('todo', uid, nm, '', '', '', '', ''));
        }
    }
    return `<div class="kptbld-box hist"><div class="kptbld-box-title"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử trình ký</div>${items.reverse().join('') || '<div style="color:#64748b;">Chưa có lịch sử.</div>'}</div>`;
}
function kptbLdOpen(id, mode) {
    const item = kptbFind(id);
    if (!kptbCanAct(item)) { showToast('Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách.', 'error'); renderProposalsTable(); return; }
    kptbInjectCss();
    const W = kptbW();
    const a = item.kptbApproval;
    const approve = mode !== 'reject';
    const last = kptbIsLast(a);
    const nextUnitId = (a.path || [])[a.level + 1];
    // Lãnh đạo các cấp do cán bộ chọn khi trình: không chọn Lãnh đạo cấp tiếp theo tại màn Ký duyệt
    const preset = (a.assignees || [])[a.level + 1] || '';
    const n = kptbNoticeData(item);
    const generated = !n.docFile || n.docFile.generated;
    const docName = (n.docFile && n.docFile.name) || (kptbDocBaseName(item) + '.doc');
    kptbLd = { id, approve };
    const hint = approve ? (last ? `Cấp phê duyệt cuối cùng. Sau khi ký duyệt, hệ thống ký số Thông báo chi trả và bản ghi chuyển [${KPTB_ST.PAY}].` : `Sau khi ký duyệt, hồ sơ tự động chuyển ${preset ? kptbUserName(preset) + ' - ' : ''}${kptbUnitName(nextUnitId)} (Lãnh đạo cấp tiếp theo đã chọn khi trình) ký duyệt.`) : `Sau khi từ chối, bản ghi chuyển [${KPTB_ST.REJECT}] cho cán bộ trình.`;
    const row = (k, v) => `<div class="kptbld-row"><span>${k}</span><span>${v}</span></div>`;
    const summary = `<div class="kptbld-box"><div class="kptbld-box-title"><i class="fa-solid fa-circle-info"></i> Thông tin tổng quan</div>`
        + row('Mã đề nghị', `<strong>${kpEsc(item.code)}</strong>`)
        + row('Mã hồ sơ', kpEsc(item.ycbtCode))
        + row('Mã vụ việc', kpEsc(kptbVv(item.ycbtCode) || '--'))
        + row('Loại trình', kpEsc(KPTB_KIND))
        + row('Số tiền chi trả', `${kptbFmt(item.amount)} đồng`)
        + row('Cán bộ trình', `${kpEsc(kptbUserName(a.submittedBy) || '--')}${a.submittedAt ? ` <span style="color:#64748b;">- ${kpEsc(a.submittedAt)}</span>` : ''}`)
        + `</div>`;
    const signBox = approve ? `<div class="kptbld-sign"><b>Hình thức ký:</b> Ký số trên hệ thống<br>${last ? `Cấp ký duyệt cuối cùng: hệ thống ký số Thông báo chi trả bằng chứng thư số của <b>${kpEsc(kptbUserLabel(kptbMe()))}</b> (giả lập).` : 'Ký duyệt cấp hiện tại; Lãnh đạo cấp cuối ký số Thông báo chi trả.'}</div>` : '';
    const preview = `<div class="kptbld-doc-bar"><span><i class="fa-solid fa-file-word"></i> ${kpEsc(docName)}</span><a href="javascript:void(0)" onclick="kptbViewNotice('${item.id}')"><i class="fa-solid fa-up-right-from-square"></i> Mở xem văn bản</a></div>`
        + (generated ? '<iframe class="kptbld-frame" id="kptbLdFrame" title="Văn bản trình ký"></iframe>' : `<div class="kptbld-uploaded"><i class="fa-solid fa-file-pdf" style="font-size:36px; color:#dc2626;"></i><p>Văn bản do cán bộ tải lên: <b>${kpEsc(docName)}</b></p><p style="color:#64748b;">(Giả lập xem tệp)</p></div>`);
    kptbLdClose();
    const ov = document.createElement('div');
    ov.className = 'kptbld-overlay';
    ov.id = 'kptbLdOverlay';
    ov.innerHTML = `<div class="kptbld-modal" role="dialog" aria-modal="true" aria-labelledby="kptbLdTitle">
        <div class="kptbld-head"><h3 id="kptbLdTitle">${approve ? '<i class="fa-solid fa-file-signature"></i> Ký duyệt' : '<i class="fa-solid fa-circle-xmark" style="color:#dc2626;"></i> Từ chối'} - ${kpEsc(KPTB_KIND)} - ${kpEsc(item.ycbtCode)}</h3><button type="button" class="kptbld-x" aria-label="Đóng" onclick="kptbLdClose()">&times;</button></div>
        <div class="kptbld-body">
            <div class="kptbld-preview">${preview}</div>
            <div class="kptbld-right">
                ${summary}
                ${typeof tlktViewHtml === 'function' ? tlktViewHtml(a.attachments, { boxClass: 'kptbld-box', titleClass: 'kptbld-box-title' }) : ''}
                ${kptbLdHistoryHtml(item)}
                <div class="kptbld-group"><label class="kptbld-label" for="kptbLdNote">${approve ? 'Ý kiến' : 'Lý do từ chối<span class="kptbld-req">*</span>'}</label>
                    <textarea id="kptbLdNote" class="kptbld-input" rows="4" maxlength="2000" placeholder="${approve ? 'Nhập ý kiến (không bắt buộc)...' : 'Nhập lý do từ chối...'}" oninput="kptbLdMark('kptbLdNote', false)"></textarea>
                    <div class="kptbld-err" id="kptbLdNoteErr">Đây là trường bắt buộc</div></div>
            </div>
        </div>
        <div class="kptbld-foot"><button type="button" class="btn btn-secondary" onclick="kptbLdClose()">Hủy bỏ</button>${approve
            ? `<button type="button" class="btn btn-primary" onclick="kptbLdSubmit()"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>`
            : '<button type="button" class="btn btn-danger" onclick="kptbLdSubmit()"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button>'}</div>
    </div>`;
    document.body.appendChild(ov);
    kptbFrameFull(true);
    const fr = kptbEl('kptbLdFrame');
    if (fr && W) fr.srcdoc = W.docPageHtml(kptbBuildDocHtml(item, n), docName.replace(/\.[a-z]+$/i, ''), false);
}
function kptbLdClose() { const el = kptbEl('kptbLdOverlay'); if (el) { el.remove(); kptbFrameFull(false); } }
function kptbLdMark(idEl, invalid) { kptbMark(idEl, invalid); }
function kptbLdSubmit() {
    const c = kptbLd; if (!c) return;
    const item = kptbFind(c.id);
    if (!kptbCanAct(item)) { kptbLdClose(); showToast('Hồ sơ đã được xử lý bởi người khác hoặc bạn không có quyền phê duyệt. Vui lòng tải lại danh sách.', 'error'); renderProposalsTable(); return; }
    const noteEl = kptbEl('kptbLdNote');
    const note = noteEl ? noteEl.value.trim() : '';
    const errs = [];
    if (!c.approve && !note) errs.push('kptbLdNote');
    ['kptbLdNote'].forEach(x => kptbLdMark(x, errs.includes(x)));
    if (errs.length) { const f = kptbEl(errs[0]); if (f) f.focus(); return; }
    const a = item.kptbApproval;
    // Lãnh đạo cấp tiếp theo: lấy theo lựa chọn của cán bộ khi trình
    const next = (a.assignees || [])[a.level + 1] || '';
    const me = kptbMe();
    const at = kptbNow();
    const unitId = a.path[a.level];
    const last = kptbIsLast(a);
    let msg;
    if (c.approve) {
        const fullNote = note;
        a.steps.push({ userId: me, unitId, at, note: fullNote });
        if (!last) {
            if (next) a.assignees[a.level + 1] = next;
            a.level += 1;
            kptbHist(item, 'Ký duyệt', `${KPTB_KIND}: ký duyệt cấp ${kptbUnitName(unitId)}; chuyển ${next ? kptbUserLabel(next) : kptbUnitName(a.path[a.level])}.${fullNote ? ' Ý kiến: ' + fullNote : ''}`);
            msg = `Đã ký duyệt ${KPTB_KIND}, chuyển ${next ? kptbUserLabel(next) : 'cấp tiếp theo'} ký duyệt.`;
        } else {
            a.pending = false;
            item.status = KPTB_ST.PAY;
            item.kptbNotice = item.kptbNotice || {};
            item.kptbNotice.digitalSign = { by: me, at, cert: `Chứng thư số ${kptbUserName(me)} - Ban Cơ yếu Chính phủ (giả lập)` };
            item.kptbNotice.signedFile = kptbDocBaseName(item) + '_ky_so.pdf';
            // Ngày người yêu cầu nhận thông báo (mốc tính hạn 03 năm): Cán bộ nhập 01 lần tại khối Thông tin thông báo chi trả, không tự gán khi ký duyệt
            item.approvedDate = at; item.approvedLeader = kptbUserName(me); item.approvedLeaderId = me; item.leaderOpinion = fullNote;
            kptbHist(item, 'Ký duyệt', `${KPTB_KIND}: ký duyệt cấp ${kptbUnitName(unitId)}.${fullNote ? ' Ý kiến: ' + fullNote : ''}`);
            kptbHist(item, 'Ký số', `Ký số Thông báo chi trả tiền bồi thường. ${item.kptbNotice.digitalSign.cert}.`);
            msg = `Đã ký duyệt ${KPTB_KIND}. Bản ghi chuyển [${KPTB_ST.PAY}].`;
        }
    } else {
        a.pending = false;
        item.status = KPTB_ST.REJECT;
        item.kptbReturned = { by: me, at, reason: note };
        item.leaderOpinion = note; item.approvedDate = at; item.approvedLeader = kptbUserName(me); item.approvedLeaderId = me;
        if (!Array.isArray(item.rejectHistory)) item.rejectHistory = [];
        item.rejectHistory.unshift({ date: at, leader: kptbUserName(me), opinion: note });
        kptbHist(item, 'Từ chối', `${KPTB_KIND}: từ chối tại cấp ${kptbUnitName(unitId)}. Lý do: ${note}`);
        msg = `Đã từ chối ${KPTB_KIND}, trả lại cán bộ trình. Bản ghi chuyển [${KPTB_ST.REJECT}].`;
    }
    saveProposalsToLocal();
    kptbLdClose();
    showToast(msg, 'success');
    kptbAfterChange(item.id);
}

// =====================================================================================
// ĐỀ NGHỊ CẤP BỔ SUNG KINH PHÍ (Chờ thông báo chi trả -> Đề nghị cấp bổ sung kinh phí)
// =====================================================================================
let kptbSupFile = null;
let kptbSupId = null;
function kptbOpenSupp(id) {
    const item = kptbFind(id);
    if (!kptbIs(item) || item.status !== KPTB_ST.WAIT) return;
    kptbInjectCss();
    kptbSupId = id; kptbSupFile = null;
    kptbCloseSupp();
    const m = document.createElement('div');
    m.className = 'kptb-modal open'; m.id = 'kptbSupModal';
    m.innerHTML = `<div class="kptb-modal-box kptb-qs-box" style="width:720px;">
        <div class="kptb-qs-head"><div><div class="kptb-qs-head-title"><span class="kptb-qs-head-ico"><i class="fa-solid fa-file-invoice-dollar"></i></span><span>ĐỀ NGHỊ CẤP BỔ SUNG KINH PHÍ</span></div>
            <div class="kptb-qs-sub">Mã đề nghị: <strong style="color:var(--primary-color);">${kpEsc(item.code)}</strong><span class="kptb-qs-dot">•</span> Người yêu cầu: <span style="font-weight:600; color:#334155;">${kpEsc(item.nycName)}</span><span class="kptb-qs-dot">•</span> Số tiền chi trả: <b>${kptbFmt(item.amount)} đồng</b></div></div>
            <button type="button" class="kptb-qs-head-close" onclick="kptbCloseSupp()" title="Đóng">&times;</button></div>
        <div class="kptb-qs-body kptb-gqx-body">
            <div class="kptb-gqx-sec">
                <div class="kptb-gqx-field"><label class="form-label" for="kptbSupContent">Nội dung đề nghị</label>
                    <textarea class="form-control" id="kptbSupContent" rows="4" maxlength="2000" placeholder="Nhập nội dung đề nghị cấp bổ sung kinh phí"></textarea></div>
                <div class="kptb-gqx-field"><label class="form-label">Văn bản đề nghị</label>
                    <input type="file" id="kptbSupInput" accept=".pdf,.doc,.docx" style="display:none;" onchange="kptbSupPick(this)">
                    <div id="kptbSupBox"></div></div>
            </div>
        </div>
        <div class="kptb-modal-foot kptb-qs-foot"><div class="kptb-qs-foot-btns">
            <button type="button" class="btn btn-secondary" onclick="kptbCloseSupp()">Hủy bỏ</button>
            <button type="button" class="btn btn-primary" onclick="kptbSaveSupp()" style="font-weight:600;"><i class="fa-solid fa-paper-plane"></i> Đề nghị cấp bổ sung</button>
        </div></div>
    </div>`;
    document.body.appendChild(m);
    kptbSupRender();
}
function kptbSupRender() {
    const f = kptbSupFile;
    kptbEl('kptbSupBox').innerHTML = !f
        ? `<div class="kptb-gqx-file-empty"><div class="kptb-gqx-file-hint">Chấp nhận tệp .pdf, .doc, .docx (tối đa 50MB).</div><div class="kptb-gqx-file-actions"><button type="button" class="kptb-btn-upload" onclick="document.getElementById('kptbSupInput').click()"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button></div></div>`
        : `<div class="kptb-gqx-file-ready"><i class="fa-solid fa-file-lines kptb-gqx-file-ico"></i><div class="kptb-gqx-file-info"><div class="kptb-gqx-file-name">${kpEsc(f.name)}</div><div class="kptb-gqx-file-meta">${kpEsc(f.size)}</div></div><div class="kptb-gqx-file-btns"><button type="button" class="btn btn-secondary btn-sm kptb-gqx-danger" onclick="kptbSupFile = null; kptbSupRender();"><i class="fa-solid fa-trash"></i> Xóa file</button></div></div>`;
}
function kptbSupPick(input) {
    const f = input.files && input.files[0]; input.value = '';
    if (!f) return;
    if (!/\.(pdf|doc|docx)$/i.test(f.name)) { showToast('Tệp không đúng định dạng (chỉ chấp nhận .pdf, .doc, .docx).', 'error'); return; }
    if (f.size > KPTB_MAX_FILE) { showToast('Tệp vượt quá dung lượng tối đa 50MB.', 'error'); return; }
    kptbSupFile = { name: f.name, size: kptbFileSize(f.size) };
    kptbSupRender();
}
function kptbCloseSupp() { const m = kptbEl('kptbSupModal'); if (m) m.remove(); }
function kptbSaveSupp() {
    const item = kptbFind(kptbSupId);
    if (!kptbIs(item) || item.status !== KPTB_ST.WAIT) { kptbCloseSupp(); return; }
    const me = kptbMe();
    const content = kptbEl('kptbSupContent').value.trim();
    item.kptbSupp = { content, file: kptbSupFile ? kptbSupFile.name : '', at: kptbNow(), by: me };
    item.status = KPTB_ST.SUPP;
    item.user = kptbUserName(me);
    kptbHist(item, 'Đề nghị cấp bổ sung kinh phí', `${content}${kptbSupFile ? (content ? '. ' : '') + 'Tệp: ' + kptbSupFile.name : ''}`);
    saveProposalsToLocal();
    kptbCloseSupp();
    showToast(`Đã đề nghị cấp bổ sung kinh phí. Bản ghi chuyển [${KPTB_ST.SUPP}].`, 'success');
    kptbAfterChange(item.id);
}

// =====================================================================================
// CẬP NHẬT CHI TRẢ (Chờ chi trả -> Hoàn thành)
// =====================================================================================
let kptbPayId = null;
function kptbOpenPay(id) {
    const item = kptbFind(id);
    if (!kptbIs(item) || item.status !== KPTB_ST.PAY) return;
    kptbInjectCss();
    kptbPayId = id;
    kptbClosePay();
    const dec = item.kptbDec || {}; const po = dec.payout || {}; const r = dec.recipient || {};
    const cash = kptbIsCash(item);
    const fld = (id2, label, req, val, extra) => `<div class="kptb-gqx-field"><label class="form-label" for="${id2}">${label}${req ? '<span class="kptb-gqx-req">*</span>' : ''}</label><input type="text" class="form-control" id="${id2}" value="${kpEsc(val || '')}" ${extra || ''} oninput="kptbMark('${id2}', false)"><div class="kptb-gqx-err" id="${id2}Err">Đây là trường bắt buộc</div></div>`;
    const methodBlock = cash
        ? `<div class="kptb-gqx-grid2">${fld('kptbPayRecName', 'Họ và tên người nhận tiền', true, r.name || item.nycName, 'maxlength="255"')}${fld('kptbPayRecIdNo', 'Số định danh cá nhân/CCCD', false, r.idNo, 'maxlength="20"')}</div>`
        : `<div class="kptb-gqx-grid2" style="margin-bottom:14px;">${fld('kptbPayAccHolder', 'Chủ tài khoản', true, po.accHolder || r.name || item.nycName, 'maxlength="255"')}${fld('kptbPayAccount', 'Số tài khoản', true, po.account || r.account, 'maxlength="30"')}</div>
           <div class="kptb-gqx-grid2">${fld('kptbPayBank', 'Ngân hàng', true, po.bank || r.bank, 'maxlength="255"')}${fld('kptbPayBranch', 'Chi nhánh', false, po.branch || r.branch, 'maxlength="255"')}</div>`;
    const m = document.createElement('div');
    m.className = 'kptb-modal open'; m.id = 'kptbPayModal';
    m.innerHTML = `<div class="kptb-modal-box kptb-qs-box" style="width:820px;">
        <div class="kptb-qs-head"><div><div class="kptb-qs-head-title"><span class="kptb-qs-head-ico"><i class="fa-solid fa-hand-holding-dollar"></i></span><span>CẬP NHẬT CHI TRẢ</span></div>
            <div class="kptb-qs-sub">Mã đề nghị: <strong style="color:var(--primary-color);">${kpEsc(item.code)}</strong><span class="kptb-qs-dot">•</span> Người yêu cầu: <span style="font-weight:600; color:#334155;">${kpEsc(item.nycName)}</span><span class="kptb-qs-dot">•</span> Quyết định: ${kpEsc(dec.decNo || '-')} ngày ${kpEsc(dec.issueDate || '-')}</div></div>
            <button type="button" class="kptb-qs-head-close" onclick="kptbClosePay()" title="Đóng">&times;</button></div>
        <div class="kptb-qs-body kptb-gqx-body">
            <div class="kptb-gqx-sec">
                <div class="kptb-gqx-sec-title"><i class="fa-solid fa-money-bill-transfer"></i> Phương thức chi trả</div>
                <div class="kptb-gqx-field"><label class="form-label">Phương thức chi trả</label><input type="text" class="form-control" value="${kpEsc(kptbMethod(item))}" readonly style="background:#f1f5f9;"></div>
                ${methodBlock}
            </div>
            <div class="kptb-gqx-sec">
                <div class="kptb-gqx-sec-title"><i class="fa-solid fa-receipt"></i> Kết quả chi trả</div>
                <div class="kptb-gqx-grid2" style="margin-bottom:14px;">
                    <div class="kptb-gqx-field"><label class="form-label" for="kptbPayDate">Ngày chi trả<span class="kptb-gqx-req">*</span></label>
                        <div class="kptb-gqx-date"><input type="text" class="form-control" id="kptbPayDate" placeholder="dd/mm/yyyy" readonly onchange="kptbMark('kptbPayDate', false)"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById('kptbPayDate'); if(i._flatpickr) i._flatpickr.open();" title="Chọn ngày"></i></div>
                        <div class="kptb-gqx-err" id="kptbPayDateErr">Đây là trường bắt buộc</div></div>
                    <div class="kptb-gqx-field"><label class="form-label" for="kptbPayAmount">Số tiền chi trả (đồng)<span class="kptb-gqx-req">*</span></label>
                        <input type="text" class="form-control" id="kptbPayAmount" maxlength="20" style="text-align:right;" oninput="formatNumberInput(this); kptbMark('kptbPayAmount', false)">
                        <div class="kptb-gqx-err" id="kptbPayAmountErr">Đây là trường bắt buộc</div>
                        <div class="kptb-gqx-hint">Số tiền theo Thông báo chi trả: ${kptbFmt(item.amount)} đồng.</div></div>
                </div>
                <!-- Tài liệu đính kèm: bảng chuẩn dùng chung (btnn_tai_lieu_kem_theo.js) -->
                <div id="kptbPayTlkt"></div>
            </div>
        </div>
        <div class="kptb-modal-foot kptb-qs-foot"><div class="kptb-qs-foot-btns">
            <button type="button" class="btn btn-secondary" onclick="kptbClosePay()">Hủy bỏ</button>
            <button type="button" class="btn btn-primary" onclick="kptbSavePay()" style="background:#16a34a; border-color:#16a34a; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Hoàn thành</button>
        </div></div>
    </div>`;
    document.body.appendChild(m);
    if (window.flatpickr) flatpickr('#kptbPayDate', { dateFormat: 'd/m/Y', allowInput: true });
    // Tài liệu đính kèm: STT | Tên văn bản, căn cứ | Tải file | Thao tác (Xem file / Xóa) - không bắt buộc
    if (typeof tlktMount === 'function') tlktMount('kptbPay', 'kptbPayTlkt', { required: false, rows: [], secClass: '', titleClass: 'tlkt-sec-title', noLeader: true });
}
function kptbClosePay() { const m = kptbEl('kptbPayModal'); if (m) m.remove(); }
function kptbSavePay() {
    const item = kptbFind(kptbPayId);
    if (!kptbIs(item) || item.status !== KPTB_ST.PAY) { kptbClosePay(); return; }
    const cash = kptbIsCash(item);
    const req = (cash ? ['kptbPayRecName'] : ['kptbPayAccHolder', 'kptbPayAccount', 'kptbPayBank']).concat(['kptbPayDate', 'kptbPayAmount']);
    const bad = req.filter(id => !String(kptbEl(id).value || '').trim());
    req.forEach(id => kptbMark(id, bad.includes(id)));
    if (bad.length) { kptbEl(bad[0]).focus(); return; }
    if (typeof tlktValidate === 'function' && !tlktValidate('kptbPay')) return;
    const files = typeof tlktGet === 'function' ? tlktGet('kptbPay') : [];
    const val = id => (kptbEl(id) ? kptbEl(id).value.trim() : '');
    const amount = parseFloat(val('kptbPayAmount').replace(/\D/g, '')) || 0;
    const me = kptbMe();
    item.kptbPayment = cash
        ? { method: KPTB_CASH, recName: val('kptbPayRecName'), recIdNo: val('kptbPayRecIdNo'), payDate: val('kptbPayDate'), amount, files, at: kptbNow(), by: me }
        : { method: KPTB_TRANSFER, accHolder: val('kptbPayAccHolder'), account: val('kptbPayAccount'), bank: val('kptbPayBank'), branch: val('kptbPayBranch'), payDate: val('kptbPayDate'), amount, files, at: kptbNow(), by: me };
    item.status = KPTB_ST.DONE;
    item.payoutDate = item.kptbPayment.payDate;
    item.payoutAmountReal = amount;
    item.user = kptbUserName(me);
    kptbHist(item, 'Cập nhật chi trả', `Ngày chi trả ${item.kptbPayment.payDate}; số tiền ${kptbFmt(amount)} đồng; ${kptbMethod(item)}.`);
    saveProposalsToLocal();
    if (typeof kpPayCompleteClaim === 'function') kpPayCompleteClaim(item, item.payoutDate, amount);
    kptbClosePay();
    showToast(`Đã cập nhật chi trả. Bản ghi chuyển [${KPTB_ST.DONE}].`, 'success');
    kptbAfterChange(item.id);
}

// =====================================================================================
// XEM CHI TIẾT BẢN GHI CHI TRẢ TIỀN BỒI THƯỜNG (Row click)
// =====================================================================================
function kptbCloseView() { const m = kptbEl('kptbViewModal'); if (m) m.remove(); }
function kptbView(id) {
    const item = kptbFind(id); if (!item) return;
    kptbInjectCss();
    kptbCloseView();
    const dec = item.kptbDec || {}; const po = dec.payout || {}; const r = dec.recipient || {};
    const cash = kptbIsCash(item);
    const it = (k, v) => `<div class="kptb-dtl-item"><div class="k">${k}</div><div class="v">${v === '' || v == null ? '-' : v}</div></div>`;
    const sec = (icon, title, body) => `<div class="kptb-dtl-sec"><div class="kptb-dtl-title"><i class="fa-solid ${icon}"></i> ${title}</div>${body}</div>`;
    const a = item.kptbApproval || null;
    const n = item.kptbNotice || null;
    const general = `<div class="kptb-dtl-grid">${it('Mã đề nghị', kpEsc(item.code))}${it('Loại đề nghị', kpEsc(KPTB_TYPE))}${it('Trạng thái', `<span class="badge badge-info">${kpEsc(item.status)}</span>${item.status === KPTB_ST.REVIEW ? `<span class="kptb-sub">${kpEsc(KPTB_KIND)}</span>` : ''}`)}${it('Mã hồ sơ', kpEsc(item.ycbtCode))}${it('Mã vụ việc', kpEsc(kptbVv(item.ycbtCode)))}${it('Người yêu cầu', kpEsc(item.nycName))}${it('Số tiền chi trả', kptbFmt(item.amount) + ' đồng')}${it('Ngày tạo bản ghi', kpEsc(item.date))}${it('Cán bộ xử lý', kpEsc(item.user))}</div>`;
    const decBody = `<div class="kptb-dtl-grid">${it('Số Quyết định', kpEsc(dec.decNo))}${it('Ngày ban hành', kpEsc(dec.issueDate))}${it('Cơ quan ban hành', kpEsc(dec.unitName))}${it('Tổng số tiền bồi thường', kptbFmt(dec.total) + ' đồng')}${it('Số tiền đã tạm ứng', kptbFmt(dec.advance) + ' đồng')}${it('Phương thức chi trả', kpEsc(kptbMethod(item)))}`
        + (cash ? `${it('Người nhận tiền', kpEsc(r.name || item.nycName))}${it('Số định danh cá nhân/CCCD', kpEsc(r.idNo))}${it('Địa điểm chi trả', kpEsc(po.cashPlace))}`
            : `${it('Chủ tài khoản', kpEsc(po.accHolder || r.name))}${it('Số tài khoản', kpEsc(po.account || r.account))}${it('Ngân hàng', kpEsc([po.bank || r.bank, po.branch || r.branch].filter(Boolean).join(' - ')))}`) + '</div>';
    let noticeBody = '';
    if (n) {
        const fileLink = n.signMethod === 'Ký ngoài' ? kpEsc(n.signedFile) : `<a href="javascript:void(0)" onclick="kptbViewNotice('${item.id}')">${kpEsc(n.signedFile || (n.docFile || {}).name || kptbDocBaseName(item) + '.doc')}</a>`;
        noticeBody = `<div class="kptb-dtl-grid">${it('Hình thức ký', n.signMethod === 'Ký ngoài' ? 'Ký ngoài' : 'Ký số trên hệ thống')}${n.signMethod !== 'Ký ngoài' ? it('Số, ký hiệu văn bản', kpEsc(n.docNo)) + it('Ngày văn bản', kpEsc(n.docDate)) : ''}${cash && n.signMethod !== 'Ký ngoài' ? it('Thời gian', kpEsc(n.time)) + it('Địa điểm', kpEsc(n.place)) : ''}${it('Văn bản', fileLink)}${n.digitalSign ? it('Ký số', `${kpEsc(kptbUserName(n.digitalSign.by))} - ${kpEsc(n.digitalSign.at)}`) : ''}</div>`;
        // Tài liệu ban hành kèm theo / không ban hành kèm theo của Thông báo chi trả (khối rỗng / không có quyền xem thì không hiển thị)
        if (typeof tlktViewHtml === 'function') noticeBody += tlktViewHtml(n.attachments || [], { boxClass: 'tlkt-view', titleClass: 'tlkt-sec-title' });
    }
    const supBody = item.kptbSupp ? `<div class="kptb-dtl-grid">${it('Ngày đề nghị', kpEsc(item.kptbSupp.at))}${it('Cán bộ đề nghị', kpEsc(kptbUserName(item.kptbSupp.by)))}${it('Văn bản đề nghị', kpEsc(item.kptbSupp.file))}</div><div class="kptb-dtl-item" style="margin-top:8px;"><div class="k">Nội dung đề nghị</div><div class="v" style="font-weight:500;">${kpEsc(item.kptbSupp.content || '-')}</div></div>` : '';
    const rejBody = item.status === KPTB_ST.REJECT && item.kptbReturned ? `<div class="kptb-dtl-grid">${it('Người từ chối', kpEsc(kptbUserName(item.kptbReturned.by)))}${it('Thời điểm', kpEsc(item.kptbReturned.at))}</div><div class="kptb-dtl-item" style="margin-top:8px;"><div class="k">Lý do bị trả lại</div><div class="v" style="font-weight:500;">${kpEsc(item.kptbReturned.reason)}</div></div>` : '';
    const p = item.kptbPayment;
    const payBody = p ? `<div class="kptb-dtl-grid">${it('Phương thức chi trả', kpEsc(p.method))}${p.method === KPTB_CASH ? it('Người nhận tiền', kpEsc(p.recName)) + it('Số định danh cá nhân/CCCD', kpEsc(p.recIdNo)) : it('Chủ tài khoản', kpEsc(p.accHolder)) + it('Số tài khoản', kpEsc(p.account)) + it('Ngân hàng', kpEsc([p.bank, p.branch].filter(Boolean).join(' - ')))}${it('Ngày chi trả', kpEsc(p.payDate))}${it('Số tiền chi trả', kptbFmt(p.amount) + ' đồng')}${it('Tệp đính kèm', kpEsc((p.files || []).join(', ')))}</div>` : '';
    const hist = (item.kptbHistory || []).slice().reverse().map(h => `<div class="kptb-hist-row"><span style="color:#64748b;">${kpEsc(h.at)}</span><span style="font-weight:600;">${kpEsc(h.userName)}</span><span><b>${kpEsc(h.action)}</b>${h.note ? ': ' + kpEsc(h.note) : ''}</span></div>`).join('');
    const isLeader = kpRole() === 'lanh-dao';
    let btns = '';
    if (isLeader) {
        if (kptbCanAct(item)) btns = `<button type="button" class="btn btn-danger" onclick="kptbLdOpen('${item.id}','reject')" style="background:#ef4444; color:#fff; border:none;"><i class="fa-solid fa-circle-xmark"></i> Từ chối</button><button type="button" class="btn btn-primary" onclick="kptbLdOpen('${item.id}','approve')"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>`;
    } else {
        if (item.status === KPTB_ST.WAIT) btns += `<button type="button" class="btn btn-secondary" onclick="kptbOpenSupp('${item.id}')"><i class="fa-solid fa-file-invoice-dollar"></i> Đề nghị cấp bổ sung kinh phí</button>`;
        if (kptbCanSubmit(item)) btns += `<button type="button" class="btn btn-primary" onclick="kptbOpenSign('${item.id}')"><i class="fa-solid fa-file-signature"></i> Trình thông báo chi trả</button>`;
        const elig = getTreasuryInfo(item).isEligible;
        if (item.status === KPTB_ST.PAY) btns += `<button type="button" class="btn btn-success" onclick="kptbOpenPay('${item.id}')"><i class="fa-solid fa-hand-holding-dollar"></i> Cập nhật chi trả</button>`;
        if (elig) btns += `<button type="button" class="btn btn-danger" onclick="kptbOpenForfeit('${item.id}')"><i class="fa-solid fa-building-columns"></i> Trả lại ngân sách nhà nước</button>`;
    }
    // Theo dõi hạn nhận kinh phí 03 năm / Trả lại ngân sách nhà nước (như các loại đề nghị khác)
    const tInfo = getTreasuryInfo(item);
    const isSq = item.status === 'Trả lại ngân sách nhà nước';
    const treasuryBody = item.noticeReceivedDate ? `<div class="kptb-dtl-grid">${it('Ngày người yêu cầu nhận thông báo', kpEsc(item.noticeReceivedDate))}${it('Hạn nhận kinh phí', kpEsc(tInfo.deadlineText))}${it('Tình trạng hạn nhận', isSq ? 'Đã trả lại ngân sách nhà nước' : (item.status === KPTB_ST.DONE ? 'Đã chi trả' : (tInfo.isEligible ? 'Đã quá hạn 3 năm (Đủ điều kiện trả lại ngân sách nhà nước)' : (tInfo.isWarning ? 'Sắp đến hạn 3 năm' : 'Trong thời hạn 3 năm'))))}${isSq ? it('Số chứng từ / quyết định trả lại ngân sách nhà nước', kpEsc(item.treasuryVoucherNo)) + it('Ngày trả lại ngân sách nhà nước', kpEsc(item.treasuryForfeitDate)) + it('Số tiền trả lại ngân sách nhà nước', kptbFmt(item.treasuryAmount) + ' đồng') : ''}</div>` : '';
    const m = document.createElement('div');
    m.className = 'kptb-modal open'; m.id = 'kptbViewModal';
    m.innerHTML = `<div class="kptb-modal-box kptb-qs-box" style="width:980px;">
        <div class="kptb-qs-head"><div><div class="kptb-qs-head-title"><span class="kptb-qs-head-ico"><i class="fa-solid fa-sack-dollar"></i></span><span>CHI TIẾT CHI TRẢ TIỀN BỒI THƯỜNG</span></div>
            <div class="kptb-qs-sub">Mã đề nghị: <strong style="color:var(--primary-color);">${kpEsc(item.code)}</strong><span class="kptb-qs-dot">•</span> Người yêu cầu: <span style="font-weight:600; color:#334155;">${kpEsc(item.nycName)}</span></div></div>
            <button type="button" class="kptb-qs-head-close" onclick="kptbCloseView()" title="Đóng">&times;</button></div>
        <div class="kptb-qs-body kptb-gqx-body">
            ${sec('fa-circle-info', 'Thông tin chung', general)}
            ${rejBody ? sec('fa-triangle-exclamation', 'Lý do bị trả lại', rejBody) : ''}
            ${sec('fa-gavel', 'Quyết định giải quyết bồi thường', decBody)}
            ${supBody ? sec('fa-file-invoice-dollar', 'Đề nghị cấp bổ sung kinh phí', supBody) : ''}
            ${noticeBody ? sec('fa-file-signature', 'Thông báo chi trả tiền bồi thường', noticeBody) : ''}
            ${a ? kptbLdHistoryHtml(item) : ''}
            ${treasuryBody ? sec('fa-hourglass-half', 'Theo dõi hạn nhận kinh phí / Trả lại ngân sách nhà nước', treasuryBody) : ''}
            ${payBody ? sec('fa-receipt', 'Kết quả chi trả', payBody) : ''}
            ${sec('fa-clock-rotate-left', 'Lịch sử xử lý', hist || '<div style="color:#64748b;">Chưa có lịch sử.</div>')}
        </div>
        <div class="kptb-modal-foot kptb-qs-foot"><div class="kptb-qs-foot-btns">${btns}<button type="button" class="btn btn-secondary" onclick="kptbCloseView()">Đóng</button></div></div>
    </div>`;
    document.body.appendChild(m);
}

// =====================================================================================
// DANH SÁCH: thao tác theo trạng thái, nhãn Loại đề nghị, Loại trình, tab theo người dùng
// =====================================================================================
function kptbActionsHtml(item) {
    const off = 'opacity: 0.35; pointer-events: none; cursor: not-allowed;';
    const canSign = kptbCanSubmit(item);
    const sign = canSign
        ? `<button class="icon-btn edit" title="Trình thông báo chi trả" onclick="event.stopPropagation(); kptbOpenSign('${item.id}')"><i class="fa-solid fa-file-signature"></i></button>`
        : `<button class="icon-btn edit" style="${off}" title="Trình thông báo chi trả"><i class="fa-solid fa-file-signature"></i></button>`;
    const sup = item.status === KPTB_ST.WAIT
        ? `<button class="icon-btn" title="Đề nghị cấp bổ sung kinh phí" onclick="event.stopPropagation(); kptbOpenSupp('${item.id}')"><i class="fa-solid fa-file-invoice-dollar"></i></button>`
        : `<button class="icon-btn" style="${off}" title="Đề nghị cấp bổ sung kinh phí"><i class="fa-solid fa-file-invoice-dollar"></i></button>`;
    // Cập nhật chi trả với bản ghi Chờ chi trả (kể cả quá hạn 03 năm); quá hạn có thêm Trả lại ngân sách nhà nước
    const eligible = getTreasuryInfo(item).isEligible;
    const pay = item.status === KPTB_ST.PAY
        ? `<button class="icon-btn accept" title="Cập nhật chi trả" onclick="event.stopPropagation(); kptbOpenPay('${item.id}')"><i class="fa-solid fa-hand-holding-dollar"></i></button>`
        : `<button class="icon-btn accept" style="${off}" title="Cập nhật chi trả"><i class="fa-solid fa-hand-holding-dollar"></i></button>`;
    const forfeit = eligible
        ? `<button class="icon-btn reject" title="Trả lại ngân sách nhà nước" onclick="event.stopPropagation(); kptbOpenForfeit('${item.id}')"><i class="fa-solid fa-building-columns"></i></button>`
        : `<button class="icon-btn" style="${off}" title="Chưa đủ điều kiện trả lại ngân sách nhà nước"><i class="fa-solid fa-building-columns"></i></button>`;
    return `${sign} ${sup} ${pay} ${forfeit}`;
}

// =====================================================================================
// TRẢ LẠI NGÂN SÁCH NHÀ NƯỚC (như MH04 của các loại đề nghị khác): Chờ chi trả quá hạn 03 năm kể từ
// ngày Thông báo chi trả được ký duyệt cấp cuối / ban hành (Ký ngoài) mà chưa chi trả
// =====================================================================================
let kptbFfId = null;
function kptbOpenForfeit(id) {
    const item = kptbFind(id);
    if (!kptbIs(item)) return;
    const info = getTreasuryInfo(item);
    if (!info.isEligible) { showToast('Khoản này chưa đủ điều kiện trả lại ngân sách nhà nước (chưa quá thời hạn 03 năm kể từ ngày người yêu cầu nhận thông báo).', 'warning'); return; }
    kptbInjectCss();
    kptbCloseView();
    kptbCloseForfeit();
    kptbFfId = id;
    const ro = (label, v) => `<div class="kptb-gqx-field"><label class="form-label">${label}</label><input type="text" class="form-control" value="${kpEsc(v)}" readonly style="background:#f1f5f9;"></div>`;
    const m = document.createElement('div');
    m.className = 'kptb-modal open'; m.id = 'kptbFfModal';
    m.innerHTML = `<div class="kptb-modal-box kptb-qs-box" style="width:820px;">
        <div class="kptb-qs-head"><div><div class="kptb-qs-head-title"><span class="kptb-qs-head-ico"><i class="fa-solid fa-building-columns"></i></span><span>CẬP NHẬT TRẢ LẠI NGÂN SÁCH NHÀ NƯỚC</span></div>
            <div class="kptb-qs-sub">Mã đề nghị: <strong style="color:var(--primary-color);">${kpEsc(item.code)}</strong><span class="kptb-qs-dot">•</span> Người yêu cầu: <span style="font-weight:600; color:#334155;">${kpEsc(item.nycName)}</span></div></div>
            <button type="button" class="kptb-qs-head-close" onclick="kptbCloseForfeit()" title="Đóng">&times;</button></div>
        <div class="kptb-qs-body kptb-gqx-body">
            <div class="kptb-gqx-sec">
                <div class="kptb-gqx-sec-title"><i class="fa-solid fa-hourglass-end"></i> Theo dõi hạn nhận kinh phí</div>
                <div class="kptb-gqx-grid2">${ro('Ngày người yêu cầu nhận thông báo', item.noticeReceivedDate || '')}${ro('Hạn nhận kinh phí', info.deadlineText)}</div>
            </div>
            <div class="kptb-gqx-sec">
                <div class="kptb-gqx-sec-title"><i class="fa-solid fa-building-columns"></i> Thông tin trả lại ngân sách nhà nước</div>
                <div class="kptb-gqx-grid2" style="margin-bottom:14px;">
                    <div class="kptb-gqx-field"><label class="form-label" for="kptbFfNo">Số chứng từ / quyết định trả lại ngân sách nhà nước<span class="kptb-gqx-req">*</span></label><input type="text" class="form-control" id="kptbFfNo" maxlength="100" oninput="kptbMark('kptbFfNo', false)"><div class="kptb-gqx-err" id="kptbFfNoErr">Đây là trường bắt buộc</div></div>
                    <div class="kptb-gqx-field"><label class="form-label" for="kptbFfDate">Ngày trả lại ngân sách nhà nước<span class="kptb-gqx-req">*</span></label><div class="kptb-gqx-date"><input type="text" class="form-control" id="kptbFfDate" placeholder="dd/mm/yyyy" readonly value="${kpEsc(formatDateViGlobal(TREASURY_DEMO_TODAY))}" onchange="kptbMark('kptbFfDate', false)"><i class="fa-regular fa-calendar-days" onclick="var i=document.getElementById('kptbFfDate'); if(i._flatpickr) i._flatpickr.open();"></i></div><div class="kptb-gqx-err" id="kptbFfDateErr">Đây là trường bắt buộc</div></div>
                </div>
                ${ro('Số tiền trả lại ngân sách nhà nước (VNĐ)', info.unpaid.toLocaleString('vi-VN'))}
                <div class="kptb-gqx-field"><label class="form-label" for="kptbFfReason">Căn cứ / lý do trả lại ngân sách nhà nước<span class="kptb-gqx-req">*</span></label><textarea class="form-control" id="kptbFfReason" rows="3" maxlength="2000" oninput="kptbMark('kptbFfReason', false)">Người yêu cầu bồi thường đã quá thời hạn 03 năm kể từ ngày nhận thông báo chi trả kinh phí nhưng không đến nhận tiền bồi thường theo quy định của Luật Trách nhiệm bồi thường của Nhà nước.</textarea><div class="kptb-gqx-err" id="kptbFfReasonErr">Đây là trường bắt buộc</div></div>
                <!-- Tài liệu đính kèm (chứng từ nộp ngân sách): bảng chuẩn dùng chung, bắt buộc, .pdf -->
                <div id="kptbFfTlkt"></div>
            </div>
        </div>
        <div class="kptb-modal-foot kptb-qs-foot"><div class="kptb-qs-foot-btns">
            <button type="button" class="btn btn-secondary" onclick="kptbCloseForfeit()">Hủy bỏ</button>
            <button type="button" class="btn btn-danger" onclick="kptbSaveForfeit()" style="font-weight:600;"><i class="fa-solid fa-building-columns"></i> Hoàn thành trả lại ngân sách nhà nước</button>
        </div></div>
    </div>`;
    document.body.appendChild(m);
    if (window.flatpickr) flatpickr('#kptbFfDate', { dateFormat: 'd/m/Y', allowInput: true, maxDate: TREASURY_DEMO_TODAY });
    if (typeof tlktMount === 'function') tlktMount('kptbFf', 'kptbFfTlkt', { required: true, rows: [], secClass: '', titleClass: 'tlkt-sec-title', noLeader: true, exts: ['.pdf'] });
}
function kptbCloseForfeit() { const m = kptbEl('kptbFfModal'); if (m) m.remove(); }
function kptbSaveForfeit() {
    const item = kptbFind(kptbFfId); if (!item) return;
    const info = getTreasuryInfo(item);
    if (!info.isEligible) { showToast('Khoản chi này không còn đủ điều kiện trả lại ngân sách nhà nước.', 'warning'); return; }
    const req = ['kptbFfNo', 'kptbFfDate', 'kptbFfReason'];
    const bad = req.filter(id => !String(kptbEl(id).value || '').trim());
    req.forEach(id => kptbMark(id, bad.includes(id)));
    if (bad.length) { kptbEl(bad[0]).focus(); return; }
    if (typeof tlktValidate === 'function' && !tlktValidate('kptbFf')) return;
    const ffFiles = typeof tlktGet === 'function' ? tlktGet('kptbFf') : [];
    const no = kptbEl('kptbFfNo').value.trim(), dt = kptbEl('kptbFfDate').value.trim(), reason = kptbEl('kptbFfReason').value.trim();
    showConfirmModal(`Xác nhận hoàn thành thủ tục nộp ${getPaidAmount(item) > 0 ? 'số tiền còn lại chưa chi trả' : 'toàn bộ số tiền'} ${info.unpaid.toLocaleString('vi-VN')} VNĐ của đề nghị ${item.code} vào ngân sách nhà nước? Sau khi xác nhận, bản ghi chuyển trạng thái Trả lại ngân sách nhà nước.`, () => {
        item.status = 'Trả lại ngân sách nhà nước';
        item.treasuryForfeitDate = dt; item.treasuryVoucherNo = no; item.treasuryAmount = info.unpaid; item.treasuryReason = reason; item.treasuryFile = ffFiles;
        item.payoutAmountReal = Math.max(0, (Number(item.amount) || 0) - info.unpaid);
        kptbHist(item, 'Trả lại ngân sách nhà nước', `Số chứng từ ${no}; ngày ${dt}; số tiền ${kptbFmt(info.unpaid)} đồng.`);
        saveProposalsToLocal();
        if (typeof kpTlnsCompleteClaim === 'function') kpTlnsCompleteClaim(item, dt, info.unpaid);
        kptbCloseForfeit();
        showToast(`Cập nhật trả lại ngân sách nhà nước thành công cho đề xuất ${item.code}!`, 'success');
        kptbAfterChange(item.id);
    }, 'Xác nhận hoàn thành thủ tục trả lại ngân sách nhà nước');
}
function kptbLeaderActionsHtml(item) {
    const off = 'opacity: 0.35; pointer-events: none; cursor: not-allowed;';
    // Icon chuẩn Ký duyệt / Từ chối (đồng nhất màn Xác định cơ quan GQBT)
    if (!kptbCanAct(item)) return `<button class="icon-btn accept sign" data-admin-icon-normalized="1" style="${off}" title="Ký duyệt"><i class="fa-solid fa-file-signature"></i></button> <button class="icon-btn delete reject" data-admin-icon-normalized="1" style="${off}" title="Từ chối"><i class="fa-solid fa-ban"></i></button>`;
    return `<button class="icon-btn accept sign" data-admin-icon-normalized="1" title="Ký duyệt" onclick="event.stopPropagation(); kptbLdOpen('${item.id}','approve')"><i class="fa-solid fa-file-signature"></i></button> <button class="icon-btn delete reject" data-admin-icon-normalized="1" title="Từ chối" onclick="event.stopPropagation(); kptbLdOpen('${item.id}','reject')"><i class="fa-solid fa-ban"></i></button>`;
}
function kptbDecorateTable() {
    const tbody = kptbEl('proposalsTableBody'); if (!tbody) return;
    const isLeader = kpRole() === 'lanh-dao';
    Array.from(tbody.rows).forEach(tr => {
        if (tr.cells.length < 10) return; // Lưới MH01 10 cột: Trạng thái = cột kề cuối, Thao tác = cột cuối
        const stCell = tr.cells[tr.cells.length - 2], actCell = tr.cells[tr.cells.length - 1];
        const code = tr.cells[1].innerText.trim();
        const item = proposalsList.find(p => p.code === code && kptbIs(p));
        if (!item) return;
        // Loại kinh phí, Cán bộ xử lý ("-" khi trống): hiển thị tại lưới MH01 (renderProposalsTable)
        // Dòng phụ Loại trình dưới badge (Chờ duyệt / Bị trả lại), đồng bộ màn Quyết định GQBT
        if (item.status === KPTB_ST.REVIEW || item.status === KPTB_ST.REJECT) stCell.insertAdjacentHTML('beforeend', `<div class="wf-sub${item.status === KPTB_ST.REJECT ? ' returned' : ''}">${kpEsc(KPTB_KIND)}</div>`);
        if (isLeader) { const box = actCell.querySelector('.action-flex'); if (box) box.innerHTML = kptbLeaderActionsHtml(item); }
    });
}

// ---------------- Bọc các chức năng sẵn có của màn hình ----------------
(function () {
    KP_PENDING_STATES.push(KPTB_ST.WAIT, KPTB_ST.SUPP);
    const origInTab = kpInTab;
    kpInTab = function (tab, item) {
        if (!kptbIs(item) || kpRole() !== 'lanh-dao') return origInTab.apply(this, arguments);
        return tab === 'pending' ? kptbCanAct(item) : (kptbLeaderHandled(item) && !kptbCanAct(item));
    };
    const origSpec = kpSpecialistActions;
    kpSpecialistActions = function (item, b) { return kptbIs(item) ? kptbActionsHtml(item) : origSpec.apply(this, arguments); };
    const origRender = renderProposalsTable;
    renderProposalsTable = function () { kptbSyncAccount(); const r = origRender.apply(this, arguments); kptbDecorateTable(); return r; };
    const origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () { const r = origSync.apply(this, arguments); kptbImportAndSeed(); return r; };
    const origView = viewProposalDetail;
    viewProposalDetail = function (id) { const it = kptbFind(id); if (kptbIs(it)) { kptbView(id); return; } return origView.apply(this, arguments); };
    const origPay = payProposalDirect;
    payProposalDirect = function (id) { const it = kptbFind(id); if (kptbIs(it)) { kptbOpenPay(id); return; } return origPay.apply(this, arguments); };
    const origApprove = openApproveModal;
    openApproveModal = function (id) { const it = kptbFind(id); if (kptbIs(it)) { kptbLdOpen(id, 'approve'); return; } return origApprove.apply(this, arguments); };
    const origReject = openRejectModal;
    openRejectModal = function (id) { const it = kptbFind(id); if (kptbIs(it)) { kptbLdOpen(id, 'reject'); return; } return origReject.apply(this, arguments); };
    const origForfeit = forfeitProposalDirect;
    forfeitProposalDirect = function (id) { const it = kptbFind(id); if (kptbIs(it)) { kptbOpenForfeit(id); return; } return origForfeit.apply(this, arguments); };
    // Vụ việc tại Tòa án có yêu cầu bồi thường bằng tiền chuyển "Đã có bản án/QĐ": tạo bản ghi Chi trả tiền bồi thường - Chờ thông báo chi trả
    buildCourtFundingRecord = function (c) { return kptbBuildCourtRecord(c); };
    // Bộ lọc Loại đề nghị: bổ sung "Chi trả tiền bồi thường"
    const addTypeOption = () => {
        const sel = kptbEl('searchProposalType');
        if (sel && !Array.from(sel.options).some(o => o.value === KPTB_TYPE)) { const o = document.createElement('option'); o.value = KPTB_TYPE; o.textContent = KPTB_TYPE; sel.appendChild(o); }
    };
    if (document.readyState !== 'loading') addTypeOption(); else document.addEventListener('DOMContentLoaded', addTypeOption);
})();
function btnnOpenUploadedFile(f) { if (!f) return; const b = (typeof Blob !== "undefined" && f instanceof Blob) ? f : f.raw; if (b) { if (!f.__url) f.__url = URL.createObjectURL(b); window.open(f.__url, "_blank"); return; } (typeof showToast === "function" ? showToast : alert)("Tệp mẫu [" + f.name + "] không có nội dung để mở xem.", "info"); }
