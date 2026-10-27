/* [ctqd] Màn Xem chi tiết Quyết định giải quyết bồi thường (quyet_dinh_giai_quyet_boi_thuong.html - openDetail)
 * - Dòng File chuẩn: icon loại tệp + tên tệp + nhãn + Xem file / Tải file (giống khối Không thụ lý - ktlv)
 * - Khối Quyết định đã bị hủy: lưới nhãn/giá trị (Hình thức ký, Người phê duyệt, Thời điểm, Lý do) tách riêng dòng File Quyết định hủy
 * - Khối Yêu cầu Hủy QĐ đang trình / Khối Quyết định sửa chữa, bổ sung (Dự thảo đang trình + các lần đã ban hành)
 * - Quyết định sửa chữa, bổ sung KHÔNG tạo bản ghi Quyết định mới: lưu trên chính bản ghi Quyết định gốc (request / amendments)
 * - Dữ liệu mẫu: QD-10 (đã ban hành 01 lần sửa chữa, bổ sung - Ký số), bổ sung Số/Ngày cho lần sửa chữa của QD-01, tệp QĐ hủy của QD-02
 * Dùng các hàm/hằng của trang chính: W, esc, ST, KIND_*, decisions, getDec, seedDec, seedItems, buildQdDocHtml, buildHqdDocHtml, buildScbDocHtml, draftDocName, showToast
 */
var CTQD_SEED_KEY = 'btnn_qd_ctqd_seed_v1';
function ctqdCss() {
    if (document.getElementById('ctqdCss')) return;
    var st = document.createElement('style');
    st.id = 'ctqdCss';
    st.textContent = [
        '.ctqd-card { background: #fff; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; border-radius: 8px; padding: 14px 18px 16px; margin-bottom: 16px; font-size: 13px; line-height: 1.55; }',
        '.ctqd-card.is-danger { background: #fef2f2; border-color: #fecaca; border-left-color: #dc2626; }',
        '.ctqd-card.is-pending { background: #f5f3ff; border-color: #ddd6fe; border-left-color: #7c3aed; }',
        '.ctqd-card.is-issued { background: #f0fdf4; border-color: #bbf7d0; border-left-color: #16a34a; }',
        '.ctqd-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; margin: 0 0 12px; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; }',
        '.ctqd-card.is-danger .ctqd-title { color: #b91c1c; border-bottom-color: #fecaca; }',
        '.ctqd-card.is-pending .ctqd-title { color: #5b21b6; border-bottom-color: #ddd6fe; }',
        '.ctqd-card.is-issued .ctqd-title { color: #166534; border-bottom-color: #bbf7d0; }',
        '.ctqd-st { margin-left: auto; text-transform: none; font-weight: 600; font-size: 11.5px; padding: 2px 10px; border-radius: 999px; background: #fff; border: 1px solid currentColor; white-space: nowrap; }',
        '.ctqd-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px 28px; }',
        '.ctqd-f > .ctqd-l { display: block; color: #64748b; font-weight: 600; font-size: 12px; margin-bottom: 3px; }',
        '.ctqd-f > .ctqd-v { display: block; color: #0f172a; white-space: pre-line; overflow-wrap: anywhere; }',
        '.ctqd-full { grid-column: 1 / -1; }',
        '.ctqd-filesec { margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1; }',
        '.ctqd-filesec > .ctqd-l { display: block; color: #64748b; font-weight: 600; font-size: 12px; margin-bottom: 6px; }',
        '.ctqd-file { display: flex; align-items: center; gap: 8px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; background: #fff; }',
        '.ctqd-file > i { font-size: 15px; flex: none; }',
        '.ctqd-file .ctqd-fn { font-weight: 600; color: #0f172a; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
        '.ctqd-file small { color: #94a3b8; white-space: nowrap; }',
        '.ctqd-file .ctqd-acts { margin-left: auto; display: inline-flex; gap: 8px; flex: none; }',
        '.ctqd-ib { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; border: 1px solid #bfdbfe; background: #eff6ff; color: #2563eb; cursor: pointer; padding: 0; font-size: 13px; }',
        '.ctqd-ib:hover { filter: brightness(0.95); }',
        '.ctqd-sub { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px 14px; }',
        '.ctqd-sub + .ctqd-sub { margin-top: 12px; }',
        '.ctqd-sub-head { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px; color: #0f172a; margin-bottom: 10px; }',
        '.ctqd-sub.is-pending { border-color: #ddd6fe; background: #faf5ff; } .ctqd-sub.is-pending .ctqd-sub-head { color: #5b21b6; }',
        '.ctqd-sub.is-issued .ctqd-sub-head { color: #166534; }',
        '.ctqd-note { margin-top: 10px; font-size: 12.5px; color: #64748b; font-style: italic; }',
        '.ctqd-goc { margin-left: 8px; text-transform: none; font-weight: 600; font-size: 11.5px; padding: 2px 10px; border-radius: 999px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; }',
        // Lịch sử xử lý: cột Nội dung thực hiện căn trái (admin-ui-standardizer gắn admin-actions-cell căn giữa cho ô cuối mỗi dòng)
        '#qdDetailBody table.ctqd-hist th, #qdDetailBody table.ctqd-hist td, #qdDetailBody table.ctqd-hist td.admin-actions-cell, #qdDetailBody table.ctqd-hist th.admin-actions-cell { text-align: left !important; }',
        '@media (max-width: 900px) { .ctqd-grid { grid-template-columns: 1fr; } }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
}
function ctqdF(label, valueHtml, full) {
    var v = valueHtml == null || valueHtml === '' ? '-' : valueHtml;
    return '<div class="ctqd-f' + (full ? ' ctqd-full' : '') + '"><span class="ctqd-l">' + label + '</span><span class="ctqd-v">' + v + '</span></div>';
}
function ctqdIcon(name) {
    var n = String(name || '').toLowerCase();
    if (/\.pdf$/.test(n)) return 'fa-solid fa-file-pdf" style="color:#dc2626;';
    if (/\.docx?$/.test(n)) return 'fa-solid fa-file-word" style="color:#2563eb;';
    return 'fa-solid fa-file-lines" style="color:#64748b;';
}
// Dòng File: icon + tên tệp + nhãn (nếu có) + Xem file / Tải file
function ctqdFileRow(name, tag, id, which, idx) {
    if (!name) return '<span class="ctqd-v">-</span>';
    var a = "'" + id + "','" + which + "'," + (idx == null ? -1 : idx);
    return '<div class="ctqd-file" title="' + esc(name) + '"><i class="' + ctqdIcon(name) + '"></i><span class="ctqd-fn">' + esc(name) + '</span>'
        + (tag ? '<small>(' + esc(tag) + ')</small>' : '')
        + '<span class="ctqd-acts">'
        + '<button type="button" data-admin-icon-normalized="1" class="ctqd-ib" title="Xem file" aria-label="Xem file" onclick="ctqdView(' + a + ')"><i class="fa-solid fa-eye"></i></button>'
        + '<button type="button" data-admin-icon-normalized="1" class="ctqd-ib" title="Tải file" aria-label="Tải file" onclick="ctqdDownload(' + a + ')"><i class="fa-solid fa-download"></i></button>'
        + '</span></div>';
}
function ctqdFileSec(label, name, tag, id, which, idx) {
    return '<div class="ctqd-filesec"><span class="ctqd-l">' + label + '</span>' + ctqdFileRow(name, tag, id, which, idx) + '</div>';
}
function ctqdSignText(m) { return m === 'Ký ngoài' ? 'Ký ngoài' : 'Ký số trên hệ thống'; }
function ctqdAtDate(at) { return String(at || '').split(' ').pop() || ''; }
// Thông tin 01 lần Quyết định sửa chữa, bổ sung đã ban hành
function ctqdAmendInfo(a) {
    var sd = a.signDoc || {};
    return {
        no: a.decNo || sd.docNo || '',
        date: a.issueDate || sd.docDate || ctqdAtDate(a.at),
        sign: ctqdSignText(a.signMethod),
        file: a.signedFile || draftDocName(a.draftDoc)
    };
}
// Văn bản giả lập theo loại: signed (QĐ gốc đã ký) / draft (dự thảo QĐ gốc) / cancel (QĐ hủy) / request (dự thảo đang trình) / amend (QĐ sửa chữa, bổ sung lần idx)
function ctqdDoc(id, which, idx) {
    var d = getDec(id); if (!d) return null;
    if (which === 'signed') return { name: d.signedFile, html: buildQdDocHtml(d) };
    if (which === 'draft') return { name: draftDocName(d.draftDoc), html: buildQdDocHtml(d), uploaded: d.draftDoc && d.draftDoc.source === 'uploaded' };
    if (which === 'cancel') {
        var c = d.cancel || {};
        return { name: c.signedFile || draftDocName(c.draftDoc), html: c.bodyHtml || buildHqdDocHtml(d, { reason: c.content, effectiveDate: c.effectiveDate || '' }) };
    }
    if (which === 'request') {
        var r = d.request || {};
        var html = r.bodyHtml || (r.kind === KIND_HUY ? buildHqdDocHtml(d, { reason: r.content, effectiveDate: r.effectiveDate || '' }) : buildScbDocHtml(d, { content: r.content, effectiveDate: r.effectiveDate || '', docNo: (r.signDoc || {}).docNo || '', docDate: (r.signDoc || {}).docDate || '' }));
        return { name: draftDocName(r.draftDoc), html: html, uploaded: r.draftDoc && r.draftDoc.source === 'uploaded' };
    }
    if (which === 'amend') {
        var a = (d.amendments || [])[idx] || {};
        var inf = ctqdAmendInfo(a);
        return { name: inf.file, html: a.bodyHtml || buildScbDocHtml(d, { content: a.content, effectiveDate: a.effectiveDate || '', docNo: inf.no, docDate: inf.date }) };
    }
    return null;
}
function ctqdBase(name) { return String(name || 'Van_ban').replace(/\.[a-z0-9]+$/i, ''); }
function ctqdView(id, which, idx) {
    var f = ctqdDoc(id, which, idx); if (!f) return;
    if (f.uploaded) { showToast('Giả lập mở tệp: ' + f.name, 'info'); return; }
    W.openDocTab(f.html, ctqdBase(f.name));
}
function ctqdDownload(id, which, idx) {
    var f = ctqdDoc(id, which, idx); if (!f) return;
    if (f.uploaded) { showToast('Giả lập tải tệp: ' + f.name, 'info'); return; }
    W.downloadDocWord(f.html, ctqdBase(f.name));
}
// Khối Quyết định đã bị hủy: thông tin hủy (lưới) + dòng File Quyết định hủy (tách riêng)
function ctqdCancelHtml(d) {
    var c = d.cancel; if (!c) return '';
    var off = c.signMethod === 'Ký ngoài';
    var sd = c.signDoc || {};
    var g = '<div class="ctqd-grid">'
        + ctqdF('Hình thức ký', esc(ctqdSignText(c.signMethod)))
        + ctqdF(off ? 'Người ban hành' : 'Lãnh đạo ký duyệt hủy', esc(W.userLabel(off ? c.issuedBy : c.approvedBy) || ''))
        + ctqdF('Thời điểm hủy', esc(c.at || ''))
        + (c.decNo || sd.docNo ? ctqdF('Số quyết định hủy', esc(c.decNo || sd.docNo)) : '')
        + ctqdF('Hiệu lực', 'Kể từ ngày ký') // [hqdhl] cố định theo Mẫu 20/BTNN
        + ctqdF('Lý do hủy Quyết định', esc(c.content || ''), true)
        + '</div>';
    return '<div class="ctqd-card is-danger" id="ctqdCancel"><div class="ctqd-title"><i class="fa-solid fa-ban"></i> Quyết định đã bị hủy</div>' + g
        + ctqdFileSec('File Quyết định hủy Quyết định giải quyết bồi thường', c.signedFile || draftDocName(c.draftDoc), '', d.id, 'cancel') + ctqdDocs(c.attachments || sd.attachments, d) + '</div>';
}
// Dự thảo đang trình (Hủy QĐ / Sửa chữa, bổ sung QĐ) - trạng thái Chờ duyệt / Bị từ chối
function ctqdRequestBody(d) {
    var r = d.request; if (!r) return '';
    var huy = r.kind === KIND_HUY;
    return '<div class="ctqd-grid">'
        + ctqdF('Hình thức ký', esc(ctqdSignText(r.signMethod)))
        + ctqdF('Người trình', esc(W.userLabel(r.submittedBy) || ''))
        + ctqdF('Thời điểm trình', esc(r.submittedAt || ''))
        + ctqdF('Lãnh đạo được trình', esc(r.leaderId ? W.userLabel(r.leaderId) : ''))
        + (huy ? ctqdF('Hiệu lực', 'Kể từ ngày ký') : (r.effectiveDate ? ctqdF('Hiệu lực của Quyết định', esc(r.effectiveDate)) : ''))
        + ctqdF(huy ? 'Lý do hủy Quyết định' : 'Nội dung sửa chữa, bổ sung', esc(r.content || ''), true)
        + '</div>'
        + ctqdFileSec(huy ? 'File dự thảo Quyết định hủy' : 'File dự thảo Quyết định sửa chữa, bổ sung', draftDocName(r.draftDoc), 'Bản dự thảo', d.id, 'request')
        + ctqdDocs((r.signDoc || {}).attachments, d);
}
function ctqdHasPendingReq(d) { return !!d.request && [ST.CHO_DUYET, ST.TRA_LAI].includes(d.status); }
// Khối Yêu cầu Hủy QĐ đang trình
function ctqdCancelReqHtml(d) {
    if (!ctqdHasPendingReq(d) || d.request.kind !== KIND_HUY) return '';
    return '<div class="ctqd-card is-pending" id="ctqdCancelReq"><div class="ctqd-title"><i class="fa-solid fa-file-circle-xmark"></i> Dự thảo Quyết định hủy đang trình<span class="ctqd-st">' + esc(d.status) + '</span></div>'
        + ctqdRequestBody(d) + '<div class="ctqd-note">Quyết định gốc vẫn giữ hiệu lực cho đến khi Quyết định hủy được ban hành.</div></div>';
}
// Có Quyết định sửa chữa, bổ sung (đang trình hoặc đã ban hành)
function ctqdHasAmend(d) { return (d.amendments || []).length > 0 || (ctqdHasPendingReq(d) && d.request.kind === KIND_SC); }
// Khối Quyết định sửa chữa, bổ sung: Dự thảo đang trình + các lần đã ban hành (mới nhất trên cùng)
function ctqdAmendHtml(d) {
    if (!ctqdHasAmend(d)) return '';
    var parts = [];
    if (ctqdHasPendingReq(d) && d.request.kind === KIND_SC) {
        parts.push('<div class="ctqd-sub is-pending" id="ctqdAmendDraft"><div class="ctqd-sub-head"><i class="fa-solid fa-file-pen"></i> Dự thảo Quyết định sửa chữa, bổ sung đang trình<span class="ctqd-st" style="color:' + (d.status === ST.TRA_LAI ? '#b91c1c' : '#5b21b6') + ';">' + esc(d.status) + '</span></div>'
            + ctqdRequestBody(d) + '<div class="ctqd-note">Quyết định gốc giữ nguyên nội dung cho đến khi Quyết định sửa chữa, bổ sung được ban hành.</div></div>');
    }
    var list = d.amendments || [];
    for (var i = list.length - 1; i >= 0; i--) {
        var a = list[i], inf = ctqdAmendInfo(a), off = a.signMethod === 'Ký ngoài';
        parts.push('<div class="ctqd-sub is-issued ctqd-amend-issued"><div class="ctqd-sub-head"><i class="fa-solid fa-circle-check"></i> Quyết định sửa chữa, bổ sung lần ' + (i + 1) + ' - Đã ban hành</div><div class="ctqd-grid">'
            + ctqdF('Số quyết định', esc(inf.no))
            + ctqdF('Ngày quyết định', esc(inf.date))
            + ctqdF('Hình thức ký', esc(inf.sign))
            + ctqdF(off ? 'Người ban hành' : 'Lãnh đạo ký duyệt', esc(W.userLabel(off ? a.issuedBy : a.approvedBy) || ''))
            + (a.effectiveDate ? ctqdF('Hiệu lực của Quyết định', esc(a.effectiveDate)) : '')
            + (a.content ? ctqdF('Nội dung sửa chữa, bổ sung', esc(a.content), true) : '')
            + '</div>' + ctqdFileSec('File Quyết định sửa chữa, bổ sung đã ký ban hành', inf.file, '', d.id, 'amend', i) + ctqdDocs(a.attachments || (a.signDoc || {}).attachments, d) + '</div>');
    }
    return '<div class="ctqd-card" id="ctqdAmend"><div class="ctqd-title"><i class="fa-solid fa-file-pen"></i> Quyết định sửa chữa, bổ sung<span class="ctqd-st" style="color:#1d4ed8;">Sửa chữa, bổ sung cho Quyết định số ' + esc(d.decNo || '-') + '</span></div>' + parts.join('') + '</div>';
}
// Tài liệu ban hành kèm theo / không ban hành kèm theo của Quyết định (khối rỗng hoặc không có quyền xem thì không hiển thị;
// khối không ban hành chỉ đơn vị trình - đơn vị gốc của hồ sơ GQBT - xem được)
function ctqdDocs(list, d) {
    if (typeof tlktViewHtml !== 'function' || !list || !list.length) return '';
    var rec = W.getRecord(d.claimCode);
    var h = tlktViewHtml(list, { ownerUnit: (rec && rec.rootUnitId) || '' });
    return h ? '<div style="margin-top:10px;">' + h + '</div>' : '';
}
// Khối Văn bản của Quyết định gốc: chỉ dòng File (Số, Ngày quyết định, Hình thức ký đã có ở Khối Thông tin chung)
function ctqdDocBlock(d, issued) {
    var name = issued ? d.signedFile : draftDocName(d.draftDoc);
    return ctqdFileRow(name, issued ? '' : 'Bản dự thảo', d.id, issued ? 'signed' : 'draft') + (issued ? ctqdDocs((d.signDoc || {}).attachments, d) : '');
}

// Dữ liệu mẫu: 01 Quyết định đã ban hành 01 lần sửa chữa, bổ sung (Ký số); bổ sung Số/Ngày/Hình thức ký cho dữ liệu cũ
function ctqdEnsureSeeds() {
    try {
        var seeded = false;
        try { seeded = localStorage.getItem(CTQD_SEED_KEY) === '1'; } catch (e) { /* bỏ qua */ }
        var changed = false;
        if (!seeded && !getDec('QD-10') && !decisions.some(function (o) { return o.claimCode === 'BT-2026-074'; })) {
            var sc = 'Sửa chữa họ và tên người nhận tiền bồi thường tại Điều 2 từ "Vũ Thị Mai Anh" thành "Vũ Thị Mai Lan" do sai sót khi soạn thảo.';
            decisions.push(seedDec({
                id: 'QD-10', claimCode: 'BT-2026-074', nycName: 'Vũ Thị Mai Lan', nycAddress: 'Số 21 Hoàng Quốc Việt, Phường Nghĩa Đô, Thành phố Hà Nội', unitId: 'BTP-01', leaderId: 'tpbt', approvedBy: 'cuctruong', approvedAt: '16:00 26/09/2026',
                status: ST.DA_BH, decNo: '28/QĐ-BTP', issueDate: '26/09/2026', signedFile: 'QD_GQBT_BT-2026-074_ky_so.pdf', signMethod: 'Ký số', lastKind: KIND_SC,
                items: seedItems([['Tài sản bị xâm phạm', 420000000, 400000000, 400000000]]), recipient: { name: 'Vũ Thị Mai Lan', idNo: '001186004455', account: '0491000556677', bank: 'Vietcombank', branch: 'Chi nhánh Cầu Giấy' },
                amendments: [{ kind: KIND_SC, content: sc, effectiveDate: 'kể từ ngày ký', decNo: '05/QĐ-BTP', issueDate: '12/10/2026', signMethod: 'Ký số', signedFile: 'QD_SCBS_BT-2026-074_ky_so.pdf', draftDoc: { source: 'generated', generatedName: 'Du_thao_Sua_chua_bo_sung_QD_BT-2026-074.doc' }, submittedBy: 'canbonv', submittedAt: '09:00 08/10/2026', approvedBy: 'cuctruong', at: '10:30 12/10/2026' }],
                history: [
                    { at: '08:30 22/09/2026', userId: 'canbonv', userName: W.userName('canbonv'), action: 'Trình ký duyệt', note: 'Trình ' + W.userLabel('tpbt') + ' ký duyệt.' },
                    { at: '16:00 26/09/2026', userId: 'cuctruong', userName: W.userName('cuctruong'), action: 'Phê duyệt cấp cuối', note: KIND_QD + '. Quyết định chuyển [Đã ban hành]. Số 28/QĐ-BTP ngày 26/09/2026.' },
                    { at: '09:00 08/10/2026', userId: 'canbonv', userName: W.userName('canbonv'), action: 'Trình ' + KIND_SC, note: 'Nội dung sửa chữa, bổ sung: ' + sc + ' Trình ' + W.userLabel('tpbt') + '.' },
                    { at: '10:30 12/10/2026', userId: 'cuctruong', userName: W.userName('cuctruong'), action: 'Phê duyệt cấp cuối', note: KIND_SC + '. Quyết định sửa chữa, bổ sung số 05/QĐ-BTP ngày 12/10/2026. Quyết định giữ [Đã ban hành].' }
                ],
                createdBy: 'canbonv', updatedAt: '2026-10-12T10:30:00.000Z'
            }));
            changed = true;
        }
        var q1 = getDec('QD-01');
        if (q1 && (q1.amendments || [])[0] && !q1.amendments[0].decNo) { Object.assign(q1.amendments[0], { decNo: '20/QĐ-UBND', issueDate: '11/07/2026', signMethod: q1.amendments[0].signMethod || 'Ký số' }); changed = true; }
        var q2 = getDec('QD-02');
        if (q2 && q2.cancel && !q2.cancel.signedFile && q2.cancel.draftDoc && q2.cancel.draftDoc.source === 'generated' && /^Du_thao_Huy_QD_BT-2026-006/.test(q2.cancel.draftDoc.generatedName || '')) { Object.assign(q2.cancel, { signedFile: 'QD_Huy_QD_GQBT_BT-2026-006_ky_so.pdf', signMethod: q2.cancel.signMethod || 'Ký số' }); changed = true; }
        try { localStorage.setItem(CTQD_SEED_KEY, '1'); } catch (e) { /* bỏ qua */ }
        if (changed) saveDecisions();
    } catch (e) { /* mockup */ }
}
