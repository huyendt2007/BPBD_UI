/*
 * Tạm ứng kinh phí bồi thường/Chi trả tiền bồi thường - Màn hình Xem chi tiết bản ghi kinh phí (dạng TRANG, không phải popup)
 * - Mở: click dòng MH01 hoặc URL quan_ly_kinh_phi_boi_thuong.html?view=detail&id=[Mã kinh phí | id bản ghi] (mở trực tiếp / tab mới).
 * - Trang thay vùng nội dung danh sách; nút "Quay lại danh sách" (đầu và cuối trang).
 * - Tạm ứng kinh phí: các khối như màn Tạo QĐ tạm ứng (MH20, chỉ xem) + nhãn Trạng thái + khối Quyết định tạm ứng kinh phí bồi thường + Lịch sử xử lý.
 * - Chi trả tiền bồi thường: Thông tin chung, Thông báo chi trả tiền bồi thường, Theo dõi hạn nhận kinh phí/Sung quỹ,
 *   Thông tin chi trả, Thông tin Sung quỹ nhà nước, Lịch sử xử lý.
 * - Không có khối Lịch sử trình ký. Lịch sử xử lý dạng mở rộng/thu gọn (mặc định thu gọn).
 * - Tệp văn bản: Chờ duyệt / Bị từ chối -> PDF dự thảo đã trình; đã ký duyệt / ban hành ngoài -> PDF đã ký số / PDF ký ngoài.
 * - Thao tác trên thanh nút theo trạng thái như popup chi tiết trước đây.
 * Id/hàm prefix kpdt.
 */
const KPDT_CSS = [
    '#kpdtPanel .inline-form-body { background:#F8FAFC; max-height:none; overflow:visible; }',
    '#kpdtPanel .kpdt-head-right { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }',
    '#kpdtPanel .kpdt-st { display:inline-flex; flex-direction:column; align-items:flex-start; }',
    '#kpdtPanel .kpdt-st .wf-sub { margin-top:3px; }',
    '#kpdtPanel .kpdt-card { border:1px solid var(--border-color); border-radius:8px; background:#fff; margin-bottom:16px; overflow:hidden; }',
    '#kpdtPanel .kpdt-card-head { background:#F1F5F9; border-bottom:1px solid var(--border-color); padding:10px 16px; font-size:12.5px; font-weight:700; letter-spacing:.3px; text-transform:uppercase; color:var(--primary-light); display:flex; align-items:center; gap:8px; }',
    '#kpdtPanel .kpdt-card-head.kpdt-toggle { cursor:pointer; user-select:none; }',
    '#kpdtPanel .kpdt-card-head .kpdt-chev { margin-left:auto; transition:transform .2s; }',
    '#kpdtPanel .kpdt-card.collapsed .kpdt-card-body { display:none; }',
    '#kpdtPanel .kpdt-card.collapsed .kpdt-chev { transform:rotate(-90deg); }',
    '#kpdtPanel .kpdt-card-body { padding:16px; }',
    '#kpdtPanel .kpdt-grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:14px 20px; }',
    '#kpdtPanel .kpdt-grid.c3 { grid-template-columns:repeat(3, minmax(0,1fr)); }',
    '#kpdtPanel .kpdt-full { grid-column:1/-1; }',
    '#kpdtPanel .kpdt-fld .form-label { display:block; margin-bottom:6px; }',
    '#kpdtPanel .kpdt-ro { background:#F1F5F9; border:1px solid var(--border-color); border-radius:6px; padding:8px 12px; min-height:20px; font-weight:600; color:var(--text-main); overflow-wrap:anywhere; }',
    '#kpdtPanel .kpdt-words { font-style:italic; color:var(--text-muted); font-size:12.5px; margin-top:4px; }',
    '#kpdtPanel .kpdt-hint { font-size:12px; color:#64748b; margin-top:8px; }',
    '#kpdtPanel .kpdt-note { background:#EFF6FF; border:1px solid #BFDBFE; border-left:4px solid #2563EB; border-radius:6px; padding:8px 12px; font-size:12.5px; color:#1E3A8A; margin-top:12px; }',
    '#kpdtPanel .kpdt-rej { background:#FEF2F2; border:1px solid #FECACA; border-left:4px solid #DC2626; border-radius:8px; padding:14px 16px; margin-bottom:16px; font-size:13px; }',
    '#kpdtPanel .kpdt-file { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:10px 14px; }',
    '#kpdtPanel .kpdt-file-ico { font-size:28px; color:#dc2626; flex-shrink:0; }',
    '#kpdtPanel .kpdt-file-info { flex:1; min-width:0; }',
    '#kpdtPanel .kpdt-file-name { font-weight:700; font-size:13.5px; color:#1e293b; overflow-wrap:anywhere; }',
    '#kpdtPanel .kpdt-file-meta { font-size:12px; color:#64748b; margin-top:3px; }',
    '#kpdtPanel .kpdt-file-btns { display:flex; gap:6px; flex-shrink:0; }',
    '#kpdtPanel .kpdt-hist-row { display:grid; grid-template-columns:140px 180px 1fr; gap:10px; font-size:12.5px; padding:7px 0; border-bottom:1px dashed #e2e8f0; }',
    '#kpdtPanel .kpdt-hist-row:last-child { border-bottom:0; }',
    '#kpdtPanel .kpdt-foot { display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap; }',
    // Bảng Tài liệu kèm theo (chế độ xem): cùng chuẩn bảng dùng chung btnn_tai_lieu_kem_theo.js
    '.kpdt-docs-title { font-weight:700; color:#0f172a; font-size:13px; margin:4px 0 8px; display:flex; align-items:center; gap:6px; }',
    '.kpdt-docs-wrap { border:1px solid #e2e8f0; border-radius:8px; overflow-x:auto; background:#fff; }',
    '.kpdt-docs { width:100%; border-collapse:collapse; font-size:12.5px; }',
    '.kpdt-docs th { background:#f8fafc; color:#334155; font-weight:600; text-align:left; padding:8px 10px; border-bottom:1px solid #e2e8f0; white-space:nowrap; }',
    '.kpdt-docs td { padding:8px 10px; border-bottom:1px solid #f1f5f9; vertical-align:middle; color:#1e293b; }',
    '.kpdt-docs tr:last-child td { border-bottom:0; }',
    '.kpdt-docs .c { text-align:center; }',
    '.kpdt-docs .ib { width:30px; height:30px; display:inline-flex; align-items:center; justify-content:center; border-radius:6px; border:1px solid #bfdbfe; background:#eff6ff; color:#2563eb; cursor:pointer; padding:0; font-size:13px; margin:0 2px; }',
    '.kpdt-docs .fn { font-weight:600; word-break:break-all; } .kpdt-docs .fn i { color:#dc2626; margin-right:4px; }',
    '@media (max-width: 760px) { #kpdtPanel .kpdt-grid, #kpdtPanel .kpdt-grid.c3 { grid-template-columns:1fr; } #kpdtPanel .kpdt-hist-row { grid-template-columns:1fr; } #kpdtPanel .kpdt-file { flex-wrap:wrap; } }'
].join('\n');

let kpdtCurId = null;
let kpdtHistOpen = false;
function kpdtEl(id) { return document.getElementById(id); }
function kpdtEsc(v) { return kpEsc(v); }
function kpdtFmt(n) { return (Number(n) || 0).toLocaleString('vi-VN'); }
function kpdtFind(key) { return proposalsList.find(p => p && (p.id === key || p.code === key)) || null; }
function kpdtVv(code) { const W = window.BTNN_WF; try { return (W && W.vuViecOf && W.vuViecOf(code, { create: false })) || ''; } catch (e) { return ''; } }
function kpdtUserName(id) { const W = window.BTNN_WF; return id ? (W ? W.userName(id) : id) : ''; }
function kpdtInjectCss() {
    if (kpdtEl('kpdtCss')) return;
    const st = document.createElement('style');
    st.id = 'kpdtCss';
    st.textContent = KPDT_CSS;
    document.head.appendChild(st);
}
function kpdtEnsurePanel() {
    kpdtInjectCss();
    if (kpdtEl('kpdtPanel')) return;
    const p = document.createElement('div');
    p.id = 'kpdtPanel';
    p.className = 'inline-form-panel';
    p.innerHTML = `<div class="inline-form-header"><span class="inline-form-title" id="kpdtTitle"></span>
        <div class="kpdt-head-right"><span id="kpdtHeadStatus"></span><button type="button" class="btn btn-secondary" onclick="kpdtClose()"><i class="fa-solid fa-arrow-left"></i> Quay lại danh sách</button></div></div>
        <div class="inline-form-body" id="kpdtBody"></div>
        <div class="inline-form-footer"><div class="kpdt-foot" id="kpdtFoot"></div></div>`;
    const list = kpdtEl('contentListProposals');
    list.parentNode.insertBefore(p, list.nextSibling);
}

// ---------------- Mở / đóng trang, URL ?view=detail&id= ----------------
function kpdtSetUrl(code) {
    try {
        const q = new URLSearchParams(window.location.search);
        if (code) { q.set('view', 'detail'); q.set('id', code); } else { q.delete('view'); q.delete('id'); }
        const s = q.toString();
        const url = window.location.pathname + (s ? '?' + s : '') + window.location.hash;
        if (code) history.pushState({ kpdt: code }, '', url); else history.replaceState({}, '', url);
    } catch (e) { /* file:// hoặc khung khác nguồn: bỏ qua */ }
}
function kpdtShow(on) {
    const panel = kpdtEl('kpdtPanel');
    ['inlineProposalFormPanel', 'qdtuPanel', 'kpcdTbPanel'].forEach(id => { const el = kpdtEl(id); if (on && el) el.style.display = 'none'; });
    const list = kpdtEl('contentListProposals'); if (list) list.style.display = on ? 'none' : 'block';
    if (panel) panel.style.display = on ? 'flex' : 'none';
    if (!on) kpdtCurId = null;
    window.scrollTo(0, 0);
}
function kpdtIsOpen() { const p = kpdtEl('kpdtPanel'); return !!p && p.style.display !== 'none' && !!kpdtCurId; }
function kpdtOpen(key, opts) {
    opts = opts || {};
    const item = kpdtFind(key);
    if (!item) { showToast('Không tìm thấy bản ghi kinh phí ' + key + '.', 'error'); return; }
    kpdtEnsurePanel();
    if (kpdtCurId !== item.id) kpdtHistOpen = false;
    kpdtCurId = item.id;
    kpdtRender(item);
    kpdtShow(true);
    if (!opts.noPush) kpdtSetUrl(item.code || item.id);
}
function kpdtClose() {
    kpdtShow(false);
    kpdtSetUrl('');
    renderProposalsTable();
}
// Thao tác mở màn hình nhập liệu khác (dạng trang): ẩn trang chi tiết trước khi mở
function kpdtGo(fn, id) {
    kpdtShow(false);
    kpdtSetUrl('');
    if (typeof window[fn] === 'function') window[fn](id);
}
function kpdtToggleHist() {
    kpdtHistOpen = !kpdtHistOpen;
    const c = kpdtEl('kpdtHistCard'); if (c) c.classList.toggle('collapsed', !kpdtHistOpen);
}

// ---------------- Tiện ích hiển thị ----------------
function kpdtFld(label, v, full) {
    return `<div class="kpdt-fld${full ? ' kpdt-full' : ''}"><span class="form-label">${label}</span><div class="kpdt-ro">${v === '' || v == null ? '-' : v}</div></div>`;
}
function kpdtCard(icon, title, body, id) {
    return `<div class="kpdt-card"${id ? ` id="${id}"` : ''}><div class="kpdt-card-head"><i class="fa-solid ${icon}"></i> ${title}</div><div class="kpdt-card-body">${body}</div></div>`;
}
function kpdtKind(item) {
    if (typeof qdtuIs === 'function' && qdtuIs(item)) return QDTU_KIND;
    if (typeof kptbIs === 'function' && kptbIs(item)) return KPTB_KIND;
    return kpIsAdv(item) ? 'QĐ tạm ứng kinh phí' : 'Thông báo chi trả';
}
function kpdtStatusHtml(item) {
    const st = kpNormStatus(item.status);
    const sub = (st === 'Chờ duyệt' || st === 'Bị từ chối') ? `<div class="wf-sub">${kpdtEsc(kpdtKind(item))}</div>` : '';
    return `<span class="kpdt-st"><span class="badge ${kpdtStatusClass(st)}">${kpdtEsc(st)}</span>${sub}</span>`;
}
function kpdtClaimLink(code) {
    return `<a href="javascript:void(0)" onclick="openLinkedClaimDetail('${kpdtEsc(code)}')" style="color:var(--primary-light); text-decoration:underline;">${kpdtEsc(code)}</a>`;
}
// Tệp văn bản: thẻ tệp + Xem file | Tải file
function kpdtFileHtml(f) {
    if (!f) return '<div class="kpdt-ro">-</div>';
    return `<div class="kpdt-file"><i class="fa-solid fa-file-pdf kpdt-file-ico"></i><div class="kpdt-file-info"><div class="kpdt-file-name">${kpdtEsc(f.name)}</div><div class="kpdt-file-meta">${kpdtEsc(f.note)}</div></div>
        <div class="kpdt-file-btns"><button type="button" class="btn btn-secondary btn-sm" onclick="kpdtFileAct('view')"><i class="fa-solid fa-eye"></i> Xem file</button><button type="button" class="btn btn-secondary btn-sm" onclick="kpdtFileAct('download')"><i class="fa-solid fa-download"></i> Tải file</button></div></div>`;
}
let kpdtCurFile = null;
function kpdtFileAct(act) {
    const f = kpdtCurFile; if (!f) return;
    const blob = f.keepId && typeof tlktBlob === 'function' ? tlktBlob(f.keepId) : null;
    if (act === 'view') {
        if (blob) { btnnOpenUploadedFile({ name: f.name, raw: blob }); return; }
        if (f.html) {
            const W = window.BTNN_WF;
            if (W && W.openDocTab) W.openDocTab(f.html, f.name.replace(/\.[a-z]+$/i, '')); else kpOpenDocViewer(f.html, f.name.replace(/\.[a-z]+$/i, ''));
            return;
        }
        showToast('Giả lập mở tệp: ' + f.name, 'info');
        return;
    }
    if (blob) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = f.name;
        document.body.appendChild(a); a.click(); a.remove();
        return;
    }
    showToast('Giả lập tải tệp: ' + f.name, 'info');
}
function kpdtHistHtml(item) {
    let list = (item.qdtuHistory || item.kptbHistory || []).slice();
    if (!list.length) {
        // Bản ghi kiểu cũ: lịch sử tổng hợp từ dữ liệu bản ghi
        if (item.date) list.push({ at: item.date, userName: item.user || '-', action: 'Tạo bản ghi', note: '' });
        (item.rejectHistory || []).slice().reverse().forEach(h => list.push({ at: h.date, userName: h.leader, action: 'Từ chối', note: h.opinion }));
        if (item.approvedDate && item.status !== 'Bị từ chối') list.push({ at: item.approvedDate, userName: item.approvedLeader || '-', action: 'Ký duyệt', note: item.leaderOpinion || '' });
        if (item.payoutDate) list.push({ at: item.payoutDate, userName: item.user || '-', action: 'Cập nhật chi trả', note: `Số tiền ${kpdtFmt(item.payoutAmountReal || item.amount)} đồng.` });
        if (item.treasuryForfeitDate) list.push({ at: item.treasuryForfeitDate, userName: item.user || '-', action: 'Sung quỹ nhà nước', note: `Số chứng từ ${item.treasuryVoucherNo || '-'}.` });
    }
    const rows = list.reverse().map(h => `<div class="kpdt-hist-row"><span style="color:#64748b;">${kpdtEsc(h.at)}</span><span style="font-weight:600;">${kpdtEsc(h.userName)}</span><span><b>${kpdtEsc(h.action)}</b>${h.note ? ': ' + kpdtEsc(h.note) : ''}</span></div>`).join('');
    return `<div class="kpdt-card${kpdtHistOpen ? '' : ' collapsed'}" id="kpdtHistCard"><div class="kpdt-card-head kpdt-toggle" onclick="kpdtToggleHist()"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử xử lý (${list.length})<i class="fa-solid fa-chevron-down kpdt-chev"></i></div>
        <div class="kpdt-card-body">${rows || '<div style="color:#64748b;">Chưa có lịch sử.</div>'}</div></div>`;
}
function kpdtRejHtml(item) {
    if (kpNormStatus(item.status) !== 'Bị từ chối') return '';
    const r = item.qdtuReturned || item.kptbReturned;
    const by = r ? kpdtUserName(r.by) : (item.approvedLeader || '');
    const at = r ? r.at : (item.approvedDate || '');
    const reason = r ? r.reason : (item.leaderOpinion || '');
    return `<div class="kpdt-rej"><div style="font-weight:700; color:#B91C1C; margin-bottom:6px;"><i class="fa-solid fa-triangle-exclamation"></i> Lý do bị từ chối</div><div>${kpdtEsc(by)}${at ? ' - ' + kpdtEsc(at) : ''}</div><div style="margin-top:4px; white-space:pre-wrap;">${kpdtEsc(reason || '-')}</div></div>`;
}

// ---------------- Bảng Tài liệu kèm theo - chế độ xem ----------------
// Chuẩn bảng dùng chung (như Cập nhật kết quả xác định cơ quan): STT | Tên tài liệu, văn bản | File đính kèm | Thao tác (Xem file / Tải file); rỗng thì không hiển thị (tlktStd).
// Dữ liệu chấp nhận: [{ name, file: { id, name, size } }] (btnn_tai_lieu_kem_theo.js), [{ name, file: 'x.pdf' }], ['x.pdf'] (dữ liệu cũ).
const KPDT_DOCS = {};
let kpdtDocsSeq = 0;
function kpdtDocsNorm(list) {
    return normalizeFileList(list).map(d => {
        if (typeof d === 'string') return { name: d.replace(/\.[^.]+$/, ''), file: { name: d } };
        const f = d.file ? (typeof d.file === 'string' ? { name: d.file } : d.file) : null;
        return { name: d.name || (f && f.name) || '', file: f };
    }).filter(d => d.name || d.file);
}
function kpdtDocsHtml(list, opts) {
    opts = opts || {};
    kpdtInjectCss();
    const rows = kpdtDocsNorm(list);
    const vid = 'd' + (++kpdtDocsSeq);
    KPDT_DOCS[vid] = rows;
    const sz = b => { b = Number(b) || 0; return b ? (b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB') : ''; };
    const body = rows.length ? rows.map((d, i) => `<tr><td class="c">${i + 1}</td><td>${kpdtEsc(d.name)}</td>
        <td>${d.file ? `<span class="fn"><i class="fa-solid fa-file-lines"></i>${kpdtEsc(d.file.name)}</span>${sz(d.file.size) ? ` <small style="color:#64748b;">(${sz(d.file.size)})</small>` : ''}` : '-'}</td>
        <td class="c">${d.file ? `<button type="button" class="ib" data-admin-icon-normalized="1" title="Xem file" onclick="kpdtDocAct('${vid}',${i},'view')"><i class="fa-solid fa-eye"></i></button><button type="button" class="ib" data-admin-icon-normalized="1" title="Tải file" onclick="kpdtDocAct('${vid}',${i},'download')"><i class="fa-solid fa-download"></i></button>` : '-'}</td></tr>`).join('')
        : '<tr><td colspan="4" class="c" style="color:#94a3b8; font-style:italic;">Không có tài liệu.</td></tr>';
    return `<div class="kpdt-docs-box">${opts.noTitle ? '' : '<div class="kpdt-docs-title"><i class="fa-solid fa-paperclip"></i> Tài liệu kèm theo</div>'}
        <div class="kpdt-docs-wrap"><table class="kpdt-docs"><thead><tr><th class="c" style="width:48px;">STT</th><th>Tên tài liệu, văn bản</th><th style="width:38%;">File đính kèm</th><th class="c" style="width:96px;">Thao tác</th></tr></thead><tbody>${body}</tbody></table></div></div>`;
}
function kpdtDocAct(vid, i, act) {
    const d = (KPDT_DOCS[vid] || [])[i]; if (!d || !d.file) return;
    const f = d.file;
    const blob = f.id && typeof tlktBlob === 'function' ? tlktBlob(f.id) : null;
    if (act === 'view') { if (typeof tlktOpenFile === 'function' && f.id) tlktOpenFile(f); else showToast('Tệp mẫu [' + f.name + '] không có nội dung để mở xem.', 'info'); return; }
    if (blob) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = f.name; document.body.appendChild(a); a.click(); a.remove(); return; }
    showToast('Giả lập tải tệp: ' + f.name, 'info');
}

// ---------------- Dữ liệu Tạm ứng kinh phí (QĐ tạm ứng / bản ghi kiểu cũ) ----------------
const KPDT_SIGNED_STATES = ['Chờ chi trả', 'Hoàn thành', 'Sung quỹ nhà nước', 'Chờ thu hồi', 'Đã thu hồi', 'Đã hủy'];
function kpdtAdvData(item) {
    if (item.qdtu) return item.qdtu;
    const c = (typeof mockClaims !== 'undefined' && mockClaims.find(x => x.code === item.ycbtCode)) || {};
    const tt = Number(item.advApproveTinhThan) || 0, kh = Number(item.advApproveKhac) || 0;
    const amount = Number(item.amount) || 0, total = tt + kh;
    const cash = item.payoutMethod ? /tiền mặt/i.test(item.payoutMethod) : c.advanceRecKenh !== 'chuyen-khoan';
    return {
        claimCode: item.ycbtCode, unitName: item.agency || item.cqCap || c.agency || '', nycName: item.nycName, nycIdNo: c.cardNo || '', nycAddress: c.address || '',
        tinhThan: tt, khac: kh, rate: total > 0 ? Math.round(amount / total * 10000) / 100 : '', amount,
        recName: item.payoutRecName || c.nyc || item.nycName, recIdNo: c.cardNo || '', recAddress: item.payoutRecAddress || c.address || '',
        payMethod: cash ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản', accHolder: item.payoutBankUser || c.advanceBankUser || '', account: item.payoutBankAccount || c.advanceBankAccount || '',
        bank: item.payoutBankName || c.advanceBankName || '', branch: item.payoutBankBranch || c.advanceBankBranch || '', cashPlace: item.cqCap || '',
        sign: { method: item.signMethod === KP_SIGN_OUTSIDE ? 'Ký ngoài' : 'Ký số', docNo: item.docNo || '', docDate: item.docDate || '', signedFile: item.signedFile || '', legacy: true }
    };
}
// Tệp Quyết định: Chờ duyệt / Bị từ chối -> PDF dự thảo đã trình; đã ký duyệt / ban hành ngoài -> PDF đã ký / PDF ký ngoài
function kpdtAdvFile(item, f) {
    const s = f.sign || {};
    const st = kpNormStatus(item.status);
    const off = s.method === 'Ký ngoài';
    const isQd = typeof qdtuIs === 'function' && qdtuIs(item);
    const base = isQd ? qdtuDocBaseName(item.ycbtCode) : kpDraftName(item.code);
    if (st === 'Chờ duyệt' || st === 'Bị từ chối') {
        const df = s.docFile;
        if (df && !df.generated) return { name: df.name, note: 'Dự thảo đã trình', keepId: df.keepId };
        const html = isQd ? qdtuBuildDocHtml(item.qdtu, s, { signerId: qdtuSignerOf(item) }) : kpBuildAdvanceDecisionHtml(Object.assign(kpItemDocData(item), { digitalSign: null, signedFile: null }));
        return { name: base + '.pdf', note: 'Dự thảo đã trình', html };
    }
    if (KPDT_SIGNED_STATES.includes(st)) {
        if (off) { const n = s.signedFile || item.signedFile; return n ? { name: n, note: 'Bản ký ngoài' } : null; }
        const name = s.signedFile || item.signedFile || (isQd ? base + '_ky_so.pdf' : kpSignedName(item));
        const html = isQd ? qdtuBuildDocHtml(item.qdtu, s, { signerId: qdtuSignerOf(item), digitalSign: s.digitalSign }) : kpBuildAdvanceDecisionHtml(kpItemDocData(item));
        return { name, note: 'Bản đã ký số', html };
    }
    return null;
}
function kpdtAdvBody(item) {
    const f = kpdtAdvData(item);
    const s = f.sign || {};
    const cash = /tiền mặt/i.test(f.payMethod || '');
    const vv = kpdtVv(item.ycbtCode);
    const diff = typeof qdtuDiffRecipient === 'function' ? qdtuDiffRecipient(f) : false;
    const total = (Number(f.tinhThan) || 0) + (Number(f.khac) || 0);
    kpdtCurFile = kpdtAdvFile(item, f);
    const claim = `<div class="kpdt-grid">${kpdtFld('Mã hồ sơ giải quyết bồi thường', kpdtClaimLink(item.ycbtCode) + (vv ? ` <span style="font-weight:500; color:#64748b;">- Mã vụ việc ${kpdtEsc(vv)}</span>` : ''))}${kpdtFld('Cơ quan giải quyết bồi thường', kpdtEsc(f.unitName))}</div>`;
    const nyc = `<div class="kpdt-grid">${kpdtFld('Họ và tên/Tên tổ chức', kpdtEsc(f.nycName))}${kpdtFld('Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế/Mã số của tổ chức', kpdtEsc(f.nycIdNo))}${kpdtFld('Địa chỉ', kpdtEsc(f.nycAddress), true)}</div>`;
    const money = `<div class="kpdt-grid">${kpdtFld('Thiệt hại về tinh thần (đồng)', kpdtFmt(f.tinhThan))}${kpdtFld('Thiệt hại khác có thể tính được ngay mà không cần xác minh (đồng)', kpdtFmt(f.khac))}${kpdtFld('Tỷ lệ tạm ứng trên tổng số tiền thiệt hại (%)', f.rate === '' ? '' : kpdtEsc((Number(f.rate) || 0).toLocaleString('vi-VN', { maximumFractionDigits: 2 })))}
        <div class="kpdt-fld"><span class="form-label">Số tiền tạm ứng kinh phí bồi thường (đồng)</span><div class="kpdt-ro">${kpdtFmt(f.amount)}</div><div class="kpdt-words">Viết bằng chữ: ${kpdtEsc(docTienBangChu(Number(f.amount) || 0))}</div></div></div>
        <div class="kpdt-hint">Tổng số tiền tạm ứng được tính theo các thiệt hại: ${kpdtFmt(total)} đồng.</div>`;
    const rec = `<div class="kpdt-grid">${kpdtFld('Họ và tên người nhận tạm ứng kinh phí bồi thường', kpdtEsc(f.recName))}${kpdtFld('Số định danh cá nhân/hộ chiếu/giấy tờ đi lại có giá trị quốc tế', kpdtEsc(f.recIdNo))}${kpdtFld('Địa chỉ', kpdtEsc(f.recAddress), true)}</div>
        <div class="kpdt-note"><i class="fa-solid fa-circle-info"></i> ${diff ? 'Người nhận tạm ứng khác Người yêu cầu bồi thường: Quyết định tạm ứng có Điều 2 (thông tin người nhận tạm ứng kinh phí bồi thường).' : 'Người nhận tạm ứng là Người yêu cầu bồi thường: Quyết định tạm ứng không có Điều 2; các Điều sau được đánh số lại.'}</div>`;
    const pay = `<div class="kpdt-grid">${kpdtFld('Phương thức nhận tiền', kpdtEsc(f.payMethod))}<div></div>${cash ? kpdtFld('Cơ quan chi trả tiền mặt', kpdtEsc(f.cashPlace))
        : kpdtFld('Chủ tài khoản', kpdtEsc(f.accHolder)) + kpdtFld('Số tài khoản ngân hàng', kpdtEsc(f.account)) + kpdtFld('Tên ngân hàng', kpdtEsc(f.bank)) + kpdtFld('Chi nhánh ngân hàng', kpdtEsc(f.branch))}</div>`;
    const docNo = String(s.docNo || '').trim();
    const docNoOk = docNo && !/^\/|^\s*\//.test(docNo) ? docNo : '';
    const dec = `<div class="kpdt-grid c3">${kpdtFld('Hình thức ký', s.method === 'Ký ngoài' ? 'Ký ngoài' : 'Ký số trên hệ thống')}${kpdtFld('Số Quyết định', kpdtEsc(docNoOk))}${kpdtFld('Ngày Quyết định', kpdtEsc(s.docDate || ''))}
        <div class="kpdt-fld kpdt-full"><span class="form-label">Tệp Quyết định</span>${kpdtFileHtml(kpdtCurFile)}</div></div>`;
    return kpdtRejHtml(item)
        + kpdtCard('fa-folder-open', 'Hồ sơ giải quyết bồi thường', claim)
        + kpdtCard('fa-user', 'Thông tin người yêu cầu bồi thường', nyc)
        + kpdtCard('fa-coins', 'Số tiền tạm ứng kinh phí bồi thường', money)
        + kpdtCard('fa-hand-holding-dollar', 'Thông tin người nhận tiền bồi thường', rec)
        + kpdtCard('fa-money-bill-transfer', 'Phương thức chi trả tiền bồi thường', pay)
        + kpdtCard('fa-file-signature', 'Quyết định tạm ứng kinh phí bồi thường', dec)
        + kpdtCard('fa-paperclip', 'Tài liệu kèm theo', kpdtDocsHtml(s.attachments || item.files || [], { noTitle: true }))
        + kpdtHistHtml(item);
}

// ---------------- Chi trả tiền bồi thường ----------------
function kpdtPayFile(item) {
    const st = kpNormStatus(item.status);
    const n = item.kptbNotice;
    const isTb = typeof kptbIs === 'function' && kptbIs(item) && !!item.kptbDec;
    if (!n) return null;
    const base = isTb ? kptbDocBaseName(item) : 'Thong_bao_chi_tra_' + item.code;
    if (st === 'Chờ duyệt' || st === 'Bị từ chối') {
        const df = n.docFile;
        if (df && !df.generated) return { name: df.name, note: 'Dự thảo đã trình' };
        return { name: base + '.pdf', note: 'Dự thảo đã trình', html: isTb ? kptbBuildDocHtml(item, kptbNoticeData(item)) : '' };
    }
    if (KPDT_SIGNED_STATES.includes(st)) {
        if (n.signMethod === 'Ký ngoài') return n.signedFile ? { name: n.signedFile, note: 'Bản ký ngoài' } : null;
        return { name: n.signedFile || base + '_ky_so.pdf', note: 'Bản đã ký số', html: isTb ? kptbBuildDocHtml(item, kptbNoticeData(item)) : '' };
    }
    return null;
}
function kpdtPayBody(item) {
    const dec = item.kptbDec || {}; const po = dec.payout || {}; const r = dec.recipient || {};
    const p = item.kptbPayment || null;
    const n = item.kptbNotice || null;
    const info = getTreasuryInfo(item);
    const st = kpNormStatus(item.status);
    kpdtCurFile = kpdtPayFile(item);
    const general = `<div class="kpdt-grid c3">${kpdtFld('Mã kinh phí', kpdtEsc(item.code))}${kpdtFld('Loại kinh phí', kpdtEsc(kpdtTypeLabel(item)))}${kpdtFld('Mã hồ sơ GQBT', kpdtClaimLink(item.ycbtCode))}
        ${kpdtFld('Mã vụ việc', kpdtEsc(kpdtVv(item.ycbtCode)))}${kpdtFld('Tên cá nhân/Tổ chức yêu cầu', kpdtEsc(item.nycName))}${kpdtFld('Số tiền chi trả', kpdtFmt(item.amount) + ' đồng')}
        ${kpdtFld('Ngày tạo', kpdtEsc(item.date))}${kpdtFld('Cán bộ xử lý', kpdtEsc(item.user))}${kpdtFld('Trạng thái', kpdtStatusHtml(item))}</div>`;
    const notice = `<div class="kpdt-grid">${kpdtFld('Hình thức ký', n ? (n.signMethod === 'Ký ngoài' ? 'Ký ngoài' : 'Ký số trên hệ thống') : '')}<div></div>
        <div class="kpdt-fld kpdt-full"><span class="form-label">Tệp văn bản</span>${kpdtFileHtml(kpdtCurFile)}</div>
        <div class="kpdt-full">${kpdtDocsHtml((n && n.attachments) || [])}</div></div>`;
    const track = `<div class="kpdt-grid">${kpdtFld('Ngày người yêu cầu nhận thông báo', kpdtEsc(item.noticeReceivedDate || ''))}${kpdtFld('Hạn nhận kinh phí bồi thường', kpdtEsc(info.deadlineText))}</div>
        <div class="kpdt-hint">Hạn nhận kinh phí bồi thường: 03 năm kể từ ngày người yêu cầu nhận được thông báo.</div>`;
    // Thông tin chi trả: phương thức, người nhận / tài khoản theo Quyết định; Ngày chi trả, Số tiền chi trả, Tệp đính kèm sau khi Cập nhật chi trả
    const method = p ? p.method : (po.method ? (/tiền mặt/i.test(po.method) ? 'Nhận tiền mặt' : 'Nhận qua chuyển khoản') : (item.payoutMethod || ''));
    const cash = /tiền mặt/i.test(method || '');
    const payFields = cash
        ? kpdtFld('Người nhận tiền', kpdtEsc(p ? p.recName : (r.name || item.payoutRecName || item.nycName))) + kpdtFld('Số định danh cá nhân/CCCD', kpdtEsc(p ? p.recIdNo : r.idNo))
        : kpdtFld('Chủ tài khoản', kpdtEsc(p ? p.accHolder : (po.accHolder || r.name || item.payoutBankUser))) + kpdtFld('Số tài khoản', kpdtEsc(p ? p.account : (po.account || r.account || item.payoutBankAccount)))
          + kpdtFld('Ngân hàng', kpdtEsc(p ? [p.bank, p.branch].filter(Boolean).join(' - ') : [po.bank || r.bank || item.payoutBankName, po.branch || r.branch || item.payoutBankBranch].filter(Boolean).join(' - ')));
    const payInfo = `<div class="kpdt-grid c3">${kpdtFld('Phương thức chi trả', kpdtEsc(method))}${payFields}
        ${kpdtFld('Ngày chi trả', kpdtEsc(p ? p.payDate : (item.payoutDate || '')))}${kpdtFld('Số tiền chi trả', p ? kpdtFmt(p.amount) + ' đồng' : (item.payoutDate ? kpdtFmt(item.payoutAmountReal || item.amount) + ' đồng' : ''))}<div class="kpdt-full">${kpdtDocsHtml(p ? p.files : (item.payoutFiles || item.payoutFile || []))}</div></div>`;
    const isSq = st === 'Sung quỹ nhà nước';
    const sq = `<div class="kpdt-grid">${kpdtFld('Số chứng từ / quyết định sung quỹ', kpdtEsc(item.treasuryVoucherNo))}${kpdtFld('Ngày sung quỹ', kpdtEsc(item.treasuryForfeitDate))}
        ${kpdtFld('Số tiền sung quỹ (VNĐ)', item.treasuryAmount != null ? kpdtFmt(item.treasuryAmount) : '')}${kpdtFld('Căn cứ / lý do sung quỹ', kpdtEsc(item.treasuryReason))}
        <div class="kpdt-full">${kpdtDocsHtml(item.treasuryFile || [])}</div></div>`;
    const sup = item.kptbSupp ? `<div class="kpdt-grid">${kpdtFld('Ngày đề nghị', kpdtEsc(item.kptbSupp.at))}${kpdtFld('Cán bộ đề nghị', kpdtEsc(kpdtUserName(item.kptbSupp.by)))}${kpdtFld('Văn bản đề nghị', kpdtEsc(item.kptbSupp.file))}${kpdtFld('Nội dung đề nghị', kpdtEsc(item.kptbSupp.content), true)}</div>` : '';
    return kpdtRejHtml(item)
        + kpdtCard('fa-circle-info', 'Thông tin chung', general)
        + (sup ? kpdtCard('fa-file-invoice-dollar', 'Đề nghị cấp bổ sung kinh phí', sup) : '')
        + kpdtCard('fa-file-signature', 'Thông báo chi trả tiền bồi thường', notice)
        + kpdtCard('fa-hourglass-half', 'Theo dõi hạn nhận kinh phí/Sung quỹ', track)
        + kpdtCard('fa-receipt', 'Thông tin chi trả', payInfo)
        + (isSq ? kpdtCard('fa-building-columns', 'Thông tin Sung quỹ nhà nước', sq) : '')
        + kpdtHistHtml(item);
}

// ---------------- Thanh nút theo trạng thái (như popup chi tiết trước đây) ----------------
function kpdtButtons(item) {
    const b = (cls, icon, label, js) => `<button type="button" class="btn ${cls}" onclick="${js}"><i class="fa-solid ${icon}"></i> ${label}</button>`;
    const id = item.id;
    const st = kpNormStatus(item.status);
    const isQd = typeof qdtuIs === 'function' && qdtuIs(item);
    const isTb = typeof kptbIs === 'function' && kptbIs(item);
    const elig = getTreasuryInfo(item).isEligible;
    let h = '';
    if (kpRole() === 'lanh-dao') {
        const can = isQd ? qdtuCanAct(item) : (isTb ? kptbCanAct(item) : st === 'Chờ duyệt');
        if (can) h += b('btn-danger', 'fa-circle-xmark', 'Từ chối', `openRejectModal('${id}')`) + b('btn-primary', 'fa-file-signature', 'Ký duyệt', `openApproveModal('${id}')`);
    } else if (isTb) {
        if (st === KPTB_ST.WAIT) h += b('btn-secondary', 'fa-file-invoice-dollar', 'Đề nghị cấp bổ sung kinh phí', `kptbOpenSupp('${id}')`);
        if (kptbCanSubmit(item)) h += b('btn-primary', 'fa-file-signature', 'Trình thông báo chi trả', `kptbOpenSign('${id}')`);
        if (st === KPTB_ST.PAY && !elig) h += b('btn-success', 'fa-hand-holding-dollar', 'Cập nhật chi trả', `kptbOpenPay('${id}')`);
        if (elig) h += b('btn-danger', 'fa-building-columns', 'Sung quỹ nhà nước', `kptbOpenForfeit('${id}')`);
    } else {
        if (st === 'Chờ lập đề nghị') h += b('btn-primary', 'fa-file-signature', 'Lập đề nghị', `kpdtGo('fillProposalDirect','${id}')`);
        if (st === 'Bị từ chối') h += b('btn-primary', 'fa-pen-to-square', isQd ? 'Cập nhật Quyết định tạm ứng' : 'Cập nhật đề nghị', `kpdtGo('updateProposalDirect','${id}')`);
        if (st === 'Chờ chi trả' && !elig) h += b('btn-success', 'fa-hand-holding-dollar', 'Cập nhật chi trả', `kpdtGo('payProposalDirect','${id}')`);
        if (elig) h += b('btn-danger', 'fa-building-columns', 'Sung quỹ nhà nước', `kpdtGo('forfeitProposalDirect','${id}')`);
    }
    return h + b('btn-secondary', 'fa-arrow-left', 'Quay lại danh sách', 'kpdtClose()');
}
function kpdtRender(item) {
    const adv = kpIsAdv(item);
    kpdtEl('kpdtTitle').innerHTML = `<i class="fa-solid fa-circle-info"></i> ${adv ? 'CHI TIẾT TẠM ỨNG KINH PHÍ BỒI THƯỜNG' : 'CHI TIẾT CHI TRẢ TIỀN BỒI THƯỜNG'}: ${kpdtEsc(item.code)}`;
    kpdtEl('kpdtHeadStatus').innerHTML = `<span style="font-size:12.5px; color:#64748b; margin-right:6px;">Trạng thái</span>${kpdtStatusHtml(item)}`;
    kpdtEl('kpdtBody').innerHTML = adv ? kpdtAdvBody(item) : kpdtPayBody(item);
    kpdtEl('kpdtFoot').innerHTML = kpdtButtons(item);
}

// ---------------- Chuẩn hóa dữ liệu: bỏ "Chờ nhập liệu"; bỏ bản ghi Chờ duyệt / Bị từ chối không có Loại trình ----------------
function kpdtSanitize() {
    let changed = false;
    proposalsList.forEach(p => {
        if (p && p.status === 'Chờ nhập liệu') { p.status = 'Chờ thông báo chi trả'; p.type = 'Chi trả tiền bồi thường'; changed = true; }
    });
    const keep = proposalsList.filter(p => {
        if (!p || !['Chờ duyệt', 'Bị từ chối'].includes(p.status)) return true;
        return (typeof qdtuIs === 'function' && qdtuIs(p)) || (typeof kptbIs === 'function' && kptbIs(p) && !!(p.kptbApproval || p.kptbReturned));
    });
    if (keep.length !== proposalsList.length) { proposalsList = keep; changed = true; }
    if (changed) saveProposalsToLocal();
}

// ---------------- Bọc chức năng sẵn có ----------------
(function () {
    const origSync = syncFromLocalStorage;
    syncFromLocalStorage = function () { const r = origSync.apply(this, arguments); kpdtSanitize(); return r; };
    // Danh sách được vẽ lại sau thao tác (Ký duyệt, Cập nhật chi trả, Sung quỹ...): làm mới trang chi tiết đang mở
    const origRender = renderProposalsTable;
    renderProposalsTable = function () {
        const r = origRender.apply(this, arguments);
        if (kpdtIsOpen()) { const it = kpdtFind(kpdtCurId); if (it) kpdtRender(it); else kpdtShow(false); }
        return r;
    };
    // Màn nhập liệu dạng trang khác mở ra: ẩn trang chi tiết
    ['qdtuShowPage', 'kpcdTbShowPage'].forEach(fn => {
        const orig = window[fn]; if (typeof orig !== 'function') return;
        window[fn] = function (on) { if (on && kpdtIsOpen()) { kpdtShow(false); kpdtSetUrl(''); } return orig.apply(this, arguments); };
    });
    // ---- Tài liệu kèm theo tại MH03 Cập nhật kết quả chi trả / MH04 Cập nhật sung quỹ (form chung): bảng chuẩn dùng chung ----
    const inlineOpen = () => { const p = kpdtEl('inlineProposalFormPanel'); return !!p && p.style.display !== 'none'; };
    const cur = () => proposalsList.find(p => p.id === selectedProposalId) || null;
    const names = list => list.map(d => (d.file && d.file.name) || d.name).filter(Boolean);
    const viewDocs = item => {
        const h1 = kpdtEl('payoutTlkt'); if (h1) h1.innerHTML = item ? kpdtDocsHtml(item.payoutFiles || item.payoutFile || []) : '';
        const h2 = kpdtEl('treasuryTlkt'); if (h2) h2.innerHTML = item ? kpdtDocsHtml(item.treasuryFile || []) : '';
    };
    let pending = null; // { id, key, list }: gán tài liệu vào bản ghi khi người dùng xác nhận
    const origView = viewProposalDetail;
    viewProposalDetail = function () { const r = origView.apply(this, arguments); viewDocs(cur()); return r; };
    const origPay = payProposalDirect;
    payProposalDirect = function (id) {
        const r = origPay.apply(this, arguments);
        const it = kpdtFind(id);
        if (inlineOpen() && !(typeof kptbIs === 'function' && kptbIs(it)) && typeof tlktMount === 'function') tlktMount('kpdtPay', 'payoutTlkt', { required: true, rows: [], secClass: '', titleClass: 'form-label', noLeader: true });
        return r;
    };
    const origSubmitPay = submitPayoutReal;
    submitPayoutReal = function () {
        const it = cur();
        if (it && !(typeof kptbIs === 'function' && kptbIs(it)) && typeof tlktValidate === 'function' && kpdtEl('payoutTlkt') && kpdtEl('payoutTlkt').querySelector('.tlkt-table')) {
            if (!tlktValidate('kpdtPay')) return;
            const list = tlktGet('kpdtPay');
            payoutAttachedFile = names(list).join(', ');
            pending = { id: it.id, key: 'payoutFiles', list };
        }
        return origSubmitPay.apply(this, arguments);
    };
    const origStartFf = startTreasuryForfeitFromDetail;
    startTreasuryForfeitFromDetail = function () {
        const r = origStartFf.apply(this, arguments);
        if (inlineOpen() && typeof tlktMount === 'function') tlktMount('kpdtFf', 'treasuryTlkt', { required: true, rows: [], secClass: '', titleClass: 'form-label', noLeader: true, exts: ['.pdf'] });
        return r;
    };
    const origFf = completeTreasuryForfeit;
    completeTreasuryForfeit = function () {
        const it = cur();
        if (it && typeof tlktValidate === 'function' && kpdtEl('treasuryTlkt') && kpdtEl('treasuryTlkt').querySelector('.tlkt-table')) {
            if (!tlktValidate('kpdtFf')) return;
            const list = tlktGet('kpdtFf');
            treasuryAttachedFile = names(list);
            pending = { id: it.id, key: 'treasuryFile', list };
        }
        return origFf.apply(this, arguments);
    };
    const origConfirm = showConfirmModal;
    showConfirmModal = function (message, callback, title) {
        const pd = pending; pending = null;
        if (pd && typeof callback === 'function') {
            const cb = callback;
            return origConfirm.call(this, message, function () { const r = cb.apply(this, arguments); const it = kpdtFind(pd.id); if (it) { it[pd.key] = pd.list; saveProposalsToLocal(); } return r; }, title);
        }
        return origConfirm.apply(this, arguments);
    };

    const openFromUrl = () => {
        const q = new URLSearchParams(window.location.search);
        if (q.get('view') === 'detail' && q.get('id')) kpdtOpen(q.get('id'), { noPush: true });
        else if (kpdtIsOpen()) { kpdtShow(false); renderProposalsTable(); }
    };
    // Mở trực tiếp bằng URL (?view=detail&id=...): chạy sau initKinhPhiApp
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(openFromUrl, 0)); else setTimeout(openFromUrl, 0);
    window.addEventListener('popstate', openFromUrl);
})();
