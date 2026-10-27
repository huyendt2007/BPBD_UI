/*
 * Màn Xem chi tiết vụ việc - tab "Chi tiết giải quyết bồi thường": khối xem Hoãn / Tạm đình chỉ / Đình chỉ giải quyết bồi thường (prefix hdcv)
 * - 01 hàm render chung theo loại (hdcvEntryHtml); tiêu đề khối theo loại: "Hoãn giải quyết bồi thường" / "Tạm đình chỉ giải quyết bồi thường" / "Đình chỉ giải quyết bồi thường".
 * - Trường chung: Số quyết định, Ngày quyết định ("-" khi Chờ duyệt / Bị từ chối hoặc không có), File Quyết định (dự thảo hoặc bản đã ký ban hành: Xem file | Tải file),
 *   Tài liệu kèm theo (bảng chuẩn chế độ xem ctvvDocsViewHtml: STT | Tên văn bản, căn cứ | Tải file | Thao tác). Bỏ "Ghi chú", bỏ "Tài liệu liên quan".
 * - Hoãn: Thời hạn hoãn, Lý do hoãn giải quyết. Đình chỉ: Căn cứ đình chỉ, Diễn giải. Tạm đình chỉ: Lý do tạm đình chỉ.
 * - Đã Tiếp tục giải quyết sau Hoãn / Tạm đình chỉ: khối vẫn hiển thị (thu gọn), kèm Quyết định tiếp tục giải quyết bồi thường.
 * - Dữ liệu: specialStatusLogs (đã ban hành), dinhChi / hoanGiaiQuyet / tamDinhChi, phiếu trình (BTNN_WF: approval.signDoc / draftDoc) khi Chờ duyệt / Bị từ chối.
 * - Dữ liệu mẫu: vụ việc Chờ duyệt / Bị từ chối tạo qua API phiếu trình (W.submitForApproval / W.rejectApproval) để Lãnh đạo thấy tại màn Ký duyệt.
 * Đặt sau quan_ly_boi_thuong_ctvv.js / _hgq.js / _dcgq.js / _ttgq.js (bọc renderSpecialStatusBlock, showCaseDetail, hgqOnApplied, seedNycOrgSampleClaims).
 */
var HDCV_TYPES = {
    hgq: { status: 'Hoãn giải quyết', kind: 'Hoãn giải quyết bồi thường', label: 'Hoãn giải quyết bồi thường', data: 'hoanGiaiQuyet' },
    hgqt: { status: 'Tạm đình chỉ', kind: 'Tạm đình chỉ giải quyết bồi thường', label: 'Tạm đình chỉ giải quyết bồi thường', data: 'tamDinhChi' },
    dc: { status: 'Đình chỉ giải quyết', kind: 'Đình chỉ giải quyết bồi thường', label: 'Đình chỉ giải quyết bồi thường', data: 'dinhChi' }
};
var HDCV_RESUME = 'Tiếp tục giải quyết';

function hdcvE(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function hdcvV(v) { var s = String(v == null ? '' : v).trim(); return s && s !== '--' && !/^\/?\s*QĐ-?\s*$/i.test(s) ? s : ''; }
function hdcvTypeOfStatus(st) { for (var k in HDCV_TYPES) if (HDCV_TYPES[k].status === st) return k; return ''; }
function hdcvTypeOfKind(kind) { for (var k in HDCV_TYPES) if (HDCV_TYPES[k].kind === kind) return k; return ''; }
function hdcvSignedName(name) { var s = String(name || ''); if (!s) return ''; return /_da_ky\.[^.]+$/i.test(s) ? s : s.replace(/\.[^.]+$/, '') + '_da_ky.pdf'; }
// Tài liệu kèm theo: [{ name, file: { id, name, size } }] (phiếu trình) | [{ name: tên tệp, size, title }] (lịch sử cũ) -> dòng bảng
function hdcvRows(list) {
    // Giữ scope (ban hành kèm theo / không ban hành kèm theo) và unit (đơn vị trình) để tách 02 khối khi hiển thị
    var keep = function (r, a) { if (a && a.scope) r.scope = a.scope; if (a && a.unit) r.unit = a.unit; return r; };
    return (list || []).map(function (a) {
        if (!a) return null;
        if (a.file && typeof a.file === 'object') return keep({ title: a.name || '', file: a.file.name || '', size: a.file.size || '', fileId: a.file.id || '' }, a);
        if (typeof a === 'string') return { title: a.replace(/\.[^.]+$/, ''), file: a, size: '', fileId: '' };
        var file = typeof a.file === 'string' ? a.file : (a.name || '');
        return keep({ title: a.title || (typeof a.file === 'string' ? a.name : '') || file.replace(/\.[^.]+$/, ''), file: file, size: a.size || '', fileId: a.fileId || a.tlktId || '' }, a);
    }).filter(function (r) { return r && (r.title || r.file); });
}
function hdcvCss() {
    if (typeof ctvvCss === 'function') ctvvCss();
    if (document.getElementById('hdcvCss')) return;
    var st = document.createElement('style');
    st.id = 'hdcvCss';
    st.textContent = [
        '.hdcv-entry { font-size: 13px; line-height: 1.55; }',
        '.hdcv-entry + .hdcv-entry { border-top: 1px dashed #cbd5e1; margin-top: 14px; padding-top: 14px; }',
        '.hdcv-sub { font-size: 13px; font-weight: 700; color: #334155; margin: 0 0 10px; }',
        '.hdcv-sub small { font-weight: 500; color: #64748b; margin-left: 6px; }',
        '.hdcv-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px 20px; margin-bottom: 10px; }',
        '.hdcv-f > .hdcv-l { display: block; color: #64748b; font-weight: 600; font-size: 12px; margin-bottom: 2px; }',
        '.hdcv-f > .hdcv-v { color: #0f172a; white-space: pre-line; overflow-wrap: anywhere; }',
        '.hdcv-full { grid-column: 1 / -1; }',
        '.hdcv-file { display: flex; align-items: center; gap: 8px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; background: #fff; }',
        '.hdcv-file > i { font-size: 15px; flex: none; }',
        '.hdcv-file .hdcv-fn { font-weight: 600; color: #0f172a; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
        '.hdcv-file small { color: #94a3b8; white-space: nowrap; }',
        '.hdcv-file .tlkt-acts { margin-left: auto; display: inline-flex; gap: 8px; }',
        '.hdcv-file .tlkt-ib { width: 30px; height: 30px; font-size: 13px; }',
        '.hdcv-resume { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-top: 12px; }',
        '@media (max-width: 900px) { .hdcv-grid { grid-template-columns: 1fr; } }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
}

// ---------- Dữ liệu các lần Hoãn / Tạm đình chỉ / Đình chỉ của vụ việc ----------
// entry: { t: hgq|hgqt|dc, state: issued|pending|rejected, docNo, docDate, fromDate, toDate, reason, canCu, dienGiai, file: { name, size, fileId, bodyHtml, draft }, docs: [], resume }
function hdcvEntries(claim) {
    var out = [];
    if (!claim) return out;
    var st = typeof canonicalClaimStatus === 'function' ? canonicalClaimStatus(claim.status) : claim.status;
    var rec = typeof gqRecord === 'function' ? gqRecord(claim) : null;
    var a = rec && rec.approval;
    var logs = Array.isArray(claim.specialStatusLogs) ? claim.specialStatusLogs : [];
    var lastPause = null, dcFromLog = null;
    logs.forEach(function (l) {
        if (!l) return;
        if (l.type === HDCV_RESUME) {
            if (lastPause && !lastPause.resume) lastPause.resume = { docNo: hdcvV(l.docNo), docDate: hdcvV(l.docDate), signMode: l.signMode || '', file: (l.files || [])[0] ? { name: l.files[0].name, size: l.files[0].size || '', fileId: l.files[0].fileId || '' } : null, docs: hdcvRows(l.attachments || []) };
            return;
        }
        var t = hdcvTypeOfStatus(l.type);
        if (!t) return;
        var files = (l.files || []).filter(Boolean);
        var main = l.decisionFile || files[0] || null;
        var e = {
            t: t, state: 'issued', signMode: l.signMode || '', source: l.source || '',
            docNo: hdcvV(l.docNo), docDate: hdcvV(l.docDate), fromDate: hdcvV(l.startDate), toDate: hdcvV(l.endDate),
            reason: l.reason || '', canCu: l.reason || '', dienGiai: '',
            file: main ? { name: main.name || main.file || '', size: main.size || '', fileId: main.fileId || '' } : null,
            docs: hdcvRows((l.decisionFile ? files : files.slice(1)).concat(l.attachments || []))
        };
        out.push(e);
        if (t === 'dc') dcFromLog = e; else lastPause = e;
    });
    // Đình chỉ: dữ liệu lưu khi trình / ban hành (dinhChi); Ký duyệt cấp cuối lấy thêm từ phiếu trình
    var dc = claim.dinhChi;
    if (st === HDCV_TYPES.dc.status && (dc || dcFromLog)) {
        var e2 = dcFromLog || { t: 'dc', state: 'issued', docs: [] };
        if (!dcFromLog) out.push(e2);
        if (dc) {
            var sd = (a && a.kind === HDCV_TYPES.dc.kind && a.signDoc) || {};
            var method = dc.signingMethod || e2.signMode || sd.method || '';
            e2.signMode = method;
            e2.canCu = dc.reasonText || e2.canCu || '';
            e2.dienGiai = dc.detail || '';
            e2.docNo = hdcvV(dc.docNumber) || (dcFromLog ? e2.docNo : '');
            e2.docDate = hdcvV(dc.docDate) || (dcFromLog ? e2.docDate : '');
            var signed = dc.signedFile || (method === 'Ký số' ? hdcvSignedName(sd.file || dc.fileName) : dc.fileName);
            if (signed) e2.file = { name: signed, size: (e2.file && e2.file.name === signed && e2.file.size) || dc.signedSize || '', fileId: dc.signedFileId || '' };
            var att = dc.attachments || sd.attachments;
            if (att && att.length) e2.docs = hdcvRows(att);
        }
    }
    // Chờ duyệt / Bị từ chối: phiếu trình Hoãn / Tạm đình chỉ / Đình chỉ (bản dự thảo)
    if (a && rec) {
        var pend = st === 'Chờ duyệt' && rec.status === 'Chờ duyệt' ? a.kind : '';
        var rej = st === 'Bị từ chối' && rec.returned ? rec.returned.kind : '';
        var tk = hdcvTypeOfKind(pend || rej);
        if (tk && a.kind === (pend || rej)) {
            var s = a.signDoc || {}, dd = a.draftDoc || {};
            var draftName = dd.source === 'uploaded' ? dd.uploadedName : dd.generatedName;
            if (!draftName && s.docFileMeta) draftName = s.docFileMeta.name;
            if (!draftName) draftName = s.file || '';
            out.push({
                t: tk, state: pend ? 'pending' : 'rejected', signMode: 'Ký số',
                docNo: '', docDate: '', fromDate: hdcvV(s.fromDate), toDate: hdcvV(s.toDate),
                reason: s.reason || '', canCu: s.reasonText || '', dienGiai: s.detail || '',
                file: draftName ? { name: draftName, size: (s.docFileMeta && s.docFileMeta.size) || '', fileId: (s.docFileMeta && s.docFileMeta.keepId) || '', bodyHtml: dd.source === 'generated' ? (dd.bodyHtml || '') : '', draft: true } : null,
                docs: hdcvRows(s.attachments || []),
                rejectReason: rej && rec.returned ? rec.returned.reason || '' : ''
            });
        }
    }
    // Đơn vị trình (đơn vị gốc của hồ sơ): xác định quyền xem Tài liệu không ban hành kèm theo với dữ liệu cũ chưa lưu đơn vị
    out.forEach(function (e) { e.owner = (rec && rec.rootUnitId) || ''; });
    return out;
}

// ---------- Render ----------
var HDCV_FILES = {}; var hdcvSeq = 0;
function hdcvField(label, value, full) {
    var v = hdcvV(value);
    return '<div class="hdcv-f' + (full ? ' hdcv-full' : '') + '"><span class="hdcv-l">' + hdcvE(label) + '</span><span class="hdcv-v">' + (v ? hdcvE(v) : '-') + '</span></div>';
}
function hdcvFileHtml(f) {
    if (!f || !f.name) return '<span class="hdcv-v">-</span>';
    var id = 'hf' + (++hdcvSeq);
    HDCV_FILES[id] = f;
    var ico = typeof ctvvIcon === 'function' ? ctvvIcon(f.name) : 'fa-solid fa-file-pdf';
    var sz = typeof ctvvFmtSize === 'function' ? ctvvFmtSize(f.size) : (f.size || '');
    return '<div class="hdcv-file" title="' + hdcvE(f.name) + '"><i class="' + ico + '"></i><span class="hdcv-fn">' + hdcvE(f.name) + '</span>'
        + (sz ? '<small>(' + hdcvE(sz) + ')</small>' : '')
        + '<small>' + (f.draft ? 'Bản dự thảo' : 'Bản đã ký, ban hành') + '</small>'
        + '<span class="tlkt-acts">'
        + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Xem file" aria-label="Xem file" data-hdcv-act="view" data-hdcv-id="' + id + '"><i class="fa-solid fa-eye"></i></button>'
        + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Tải file" aria-label="Tải file" data-hdcv-act="dl" data-hdcv-id="' + id + '"><i class="fa-solid fa-download"></i></button>'
        + '</span></div>';
}
function hdcvDocsHtml(rows) {
    if (typeof ctvvDocsViewHtml === 'function') return ctvvDocsViewHtml(rows || []);
    return '<span class="hdcv-v">-</span>';
}
function hdcvRange(e) {
    if (!e.fromDate && !e.toDate) return '';
    var days = typeof hgqDays === 'function' ? hgqDays(e.fromDate, e.toDate) : '';
    return 'Từ ngày ' + (e.fromDate || '-') + ' đến ngày ' + (e.toDate || '-') + (days ? ' (' + days + ' ngày)' : '');
}
// 01 hàm render dùng chung cho 03 loại
function hdcvEntryHtml(e, withTitle) {
    var T = HDCV_TYPES[e.t];
    var draft = e.state !== 'issued';
    var no = draft ? '' : e.docNo, dt = draft ? '' : e.docDate;
    var h = '<div class="hdcv-entry" data-hdcv-type="' + e.t + '">';
    if (withTitle) {
        var stTxt = e.state === 'pending' ? 'Chờ duyệt' : (e.state === 'rejected' ? 'Bị từ chối' : (e.resume ? 'Đã tiếp tục giải quyết' : 'Đã ban hành'));
        h += '<div class="hdcv-sub">' + hdcvE(T.label) + '<small>(' + stTxt + ')</small></div>';
    }
    h += '<div class="hdcv-grid">' + hdcvField('Số quyết định', no) + hdcvField('Ngày quyết định', dt);
    if (e.t === 'hgq') h += hdcvField('Thời hạn hoãn', hdcvRange(e));
    if (e.t === 'hgq') h += hdcvField('Lý do hoãn giải quyết', e.reason, true);
    if (e.t === 'hgqt') h += hdcvField('Lý do tạm đình chỉ', e.reason, true);
    if (e.t === 'dc') h += hdcvField('Căn cứ đình chỉ', e.canCu, true) + hdcvField('Diễn giải', e.dienGiai, true);
    h += '<div class="hdcv-f hdcv-full"><span class="hdcv-l">File Quyết định</span>' + hdcvFileHtml(e.file) + '</div>';
    // Tài liệu ban hành kèm theo / không ban hành kèm theo: khối rỗng hoặc không có quyền xem thì không hiển thị
    h += typeof tlktSplitRender === 'function'
        ? tlktSplitRender(e.docs, { ownerUnit: e.owner || '' }, function (rows, title) { return '<div class="hdcv-f hdcv-full"><span class="hdcv-l">' + hdcvE(title) + '</span>' + hdcvDocsHtml(rows) + '</div>'; })
        : '<div class="hdcv-f hdcv-full"><span class="hdcv-l">Tài liệu kèm theo</span>' + hdcvDocsHtml(e.docs) + '</div>';
    h += '</div>';
    if (e.resume) {
        h += '<div class="hdcv-resume"><div class="hdcv-sub">Quyết định tiếp tục giải quyết bồi thường</div><div class="hdcv-grid">'
            + hdcvField('Số quyết định', e.resume.docNo) + hdcvField('Ngày quyết định', e.resume.docDate)
            + '<div class="hdcv-f hdcv-full"><span class="hdcv-l">File Quyết định</span>' + hdcvFileHtml(e.resume.file) + '</div>'
            + (typeof tlktSplitRender === 'function' ? tlktSplitRender(e.resume.docs || [], { ownerUnit: e.owner || '' }, function (rows, title) { return '<div class="hdcv-f hdcv-full"><span class="hdcv-l">' + hdcvE(title) + '</span>' + hdcvDocsHtml(rows) + '</div>'; }) : '')
            + '</div></div>';
    }
    return h + '</div>';
}
function hdcvBlockLabel(entries) {
    var seen = [];
    entries.forEach(function (e) { var l = HDCV_TYPES[e.t].label; if (seen.indexOf(l) < 0) seen.push(l); });
    return seen.join(' / ');
}
function hdcvIsEditing(claim) {
    try { return isDetailEditMode && activeDetailActionType === 'trangthai' && isSpecialStatusSource(claim.status); } catch (e) { return false; }
}
function hdcvRender(claim) {
    var item = document.getElementById('accItem_trangthai');
    var read = document.getElementById('specialStatusReadBlock');
    if (!item || !read || !claim || hdcvIsEditing(claim)) return false;
    var entries = hdcvEntries(claim);
    var head = document.querySelector('#accHead_trangthai > span');
    if (!entries.length) { item.style.display = 'none'; read.innerHTML = ''; if (head) head.textContent = '8. Hoãn / Đình chỉ giải quyết'; return false; }
    hdcvCss();
    item.style.display = 'block';
    // Lần gần nhất đặt trên cùng
    var list = entries.slice().reverse();
    read.innerHTML = list.map(function (e) { return hdcvEntryHtml(e, list.length > 1); }).join('');
    if (head) head.textContent = '8. ' + hdcvBlockLabel(list);
    return true;
}
// Khối mở sẵn khi vụ việc đang Hoãn / Tạm đình chỉ / Đình chỉ hoặc Chờ duyệt / Bị từ chối phiếu trình tương ứng
function hdcvShouldOpen(claim) {
    var st = typeof canonicalClaimStatus === 'function' ? canonicalClaimStatus(claim.status) : claim.status;
    if (hdcvTypeOfStatus(st)) return true;
    return hdcvEntries(claim).some(function (e) { return e.state !== 'issued'; });
}
(function () {
    var orig = window.renderSpecialStatusBlock;
    if (typeof orig === 'function') window.renderSpecialStatusBlock = function (claim) {
        var r = orig.apply(this, arguments);
        try { hdcvRender(claim); } catch (e) { /* mockup */ }
        return r;
    };
    var origSCD = window.showCaseDetail;
    if (typeof origSCD === 'function') window.showCaseDetail = function (id) {
        var r = origSCD.apply(this, arguments);
        try {
            var claim = claimsList.find(function (c) { return c.id === id; });
            var item = document.getElementById('accItem_trangthai');
            if (claim && item && item.style.display !== 'none' && hdcvShouldOpen(claim)) forceOpenAccordion('trangthai');
        } catch (e) { /* mockup */ }
        return r;
    };
    // Ký duyệt cấp cuối Hoãn / Tạm đình chỉ: lưu kèm Tài liệu kèm theo của lần trình, tệp đã ký vào lịch sử để xem lại sau khi trình phiếu khác
    var origApplied = window.hgqOnApplied;
    if (typeof origApplied === 'function') window.hgqOnApplied = function (c, r, st) {
        var n = (c && Array.isArray(c.specialStatusLogs)) ? c.specialStatusLogs.length : 0;
        var res = origApplied.apply(this, arguments);
        try {
            var logs = c.specialStatusLogs || [];
            var a = r && r.approval;
            if (logs.length > n && a) {
                var l = logs[logs.length - 1];
                var sd = a.signDoc || {};
                l.attachments = Array.isArray(sd.attachments) ? JSON.parse(JSON.stringify(sd.attachments)) : [];
                if (l.files && l.files[0] && l.signMode === 'Ký số') l.files[0].name = hdcvSignedName(l.files[0].name);
            }
        } catch (e) { /* mockup */ }
        return res;
    };
})();
function hdcvOpen(f) {
    if (!f || !f.name) return;
    if (f.fileId && typeof tlktOpenFile === 'function') { tlktOpenFile({ id: f.fileId, name: f.name }); return; }
    if (f.bodyHtml && typeof gqW === 'function' && gqW()) { gqW().openDocTab(f.bodyHtml, String(f.name).replace(/\.[^.]+$/, '')); return; }
    if (typeof viewPhddMockFile === 'function') viewPhddMockFile(f.name);
}
function hdcvDownload(f) {
    if (!f || !f.name) return;
    var word = function () {
        if (!f.bodyHtml) { showToast('Tệp mẫu [' + f.name + '] không có nội dung để tải.', 'info'); return; }
        var h = '<html><head><meta charset="utf-8"></head><body>' + f.bodyHtml + '<' + '/body><' + '/html>';
        var b = new Blob(['﻿', h], { type: 'application/msword' });
        var x = document.createElement('a'); x.href = URL.createObjectURL(b); x.download = String(f.name).replace(/\.[^.]+$/, '') + '.doc';
        document.body.appendChild(x); x.click(); x.remove();
    };
    if (f.fileId && typeof tlktDownloadFile === 'function') { tlktDownloadFile({ id: f.fileId, name: f.name }, function (ok) { if (!ok) word(); }); return; }
    word();
}
document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-hdcv-act]') : null;
    if (!b) return;
    e.preventDefault();
    var f = HDCV_FILES[b.getAttribute('data-hdcv-id')];
    if (b.getAttribute('data-hdcv-act') === 'view') hdcvOpen(f); else hdcvDownload(f);
});

// =====================================================================
// Dữ liệu mẫu (BT-2026-431 .. BT-2026-437); Đình chỉ đã ban hành dùng lại BT-2026-407 (Ký số) / BT-2026-408 (Ký ngoài) của quan_ly_boi_thuong_seedx.js
// =====================================================================
function hdcvDay(d) {
    var t = new Date();
    var day = Math.max(1, Math.min(d, t.getDate()));
    return String(day).padStart(2, '0') + '/' + String(t.getMonth() + 1).padStart(2, '0') + '/' + t.getFullYear();
}
function hdcvAtt(name, file, size) { return { name: name, file: { id: '', name: file, size: size || '' } }; }
var HDCV_SEED = [
    { id: 'HDCV_DC_CD', code: 'BT-2026-431', nyc: 'Đỗ Minh Khôi', mode: 'submit', t: 'dc' },
    { id: 'HDCV_DC_TC', code: 'BT-2026-432', nyc: 'Phan Thị Hồng Nhung', mode: 'reject', t: 'dc', rejectReason: 'Đề nghị bổ sung Diễn giải: nêu rõ ngày nộp đơn rút yêu cầu và người ký đơn.' },
    { id: 'HDCV_TDC_CD', code: 'BT-2026-433', nyc: 'Vũ Đức Thịnh', mode: 'submit', t: 'hgqt' },
    { id: 'HDCV_TDC', code: 'BT-2026-434', nyc: 'Lê Thị Thu Trang', mode: 'issued', t: 'hgqt', sign: 'Ký số' },
    { id: 'HDCV_TDC_KN', code: 'BT-2026-435', nyc: 'Ngô Văn Quyết', mode: 'issued', t: 'hgqt', sign: 'Ký ngoài' },
    { id: 'HDCV_HGQ', code: 'BT-2026-436', nyc: 'Trần Quốc Bảo', mode: 'issued', t: 'hgq', sign: 'Ký số' },
    { id: 'HDCV_HGQ_TT', code: 'BT-2026-437', nyc: 'Hà Thị Lan Anh', mode: 'resumed', t: 'hgq', sign: 'Ký số' }
];
// Mã vụ việc theo sổ đăng ký dùng chung (BTNN_WF.uniqueVuViecFor): ưu tiên VVBT- cùng số với Mã hồ sơ; đã có hồ sơ BT- khác dùng thì cấp mới
function hdcvVv(code) {
    var pref = 'VVBT-' + String(code).replace(/^BT-/, '');
    try { var W = window.BTNN_WF; if (W && typeof W.uniqueVuViecFor === 'function') return W.uniqueVuViecFor(code, pref) || pref; } catch (e) { /* mockup */ }
    return pref;
}
// Vụ việc mẫu: sao chép HS1 (Thương lượng, Sở Tư pháp Hà Nội - có luồng phê duyệt 02 cấp), thay mã, người yêu cầu, lịch sử
function hdcvBuildClaim(p, tpl) {
    var c = JSON.parse(JSON.stringify(tpl));
    ['specialStatusLogs', 'specialStatusPreviousStatus', 'hgqPrevStatus', 'dinhChi', 'hoanGiaiQuyet', 'tamDinhChi', 'tiepTucGiaiQuyet', 'wfReturned', 'wfSynced', 'ctvvM26', 'transferTo'].forEach(function (k) { delete c[k]; });
    var prev = canonicalClaimStatus(tpl.status) || 'Thương lượng';
    Object.assign(c, { id: p.id, code: p.code, maVuViec: hdcvVv(p.code), nyc: p.nyc, nycName: p.nyc, date: hdcvDay(2), status: prev, hdcvSeed: true, specialStatusLogs: [] });
    c.timeline = [
        { title: 'Tiếp nhận hồ sơ', date: hdcvDay(2), desc: 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', status: 'completed' },
        { title: 'Cử người giải quyết bồi thường', date: hdcvDay(4), desc: 'Thủ trưởng cơ quan cử cán bộ giải quyết bồi thường.', status: 'completed' },
        { title: 'Xác minh thiệt hại', date: hdcvDay(8), desc: 'Hoàn thành xác minh thiệt hại.', status: 'completed' },
        { title: 'Thương lượng', date: hdcvDay(12), desc: 'Tổ chức thương lượng việc bồi thường.', status: 'completed' }
    ];
    var vv = c.maVuViec, D = hdcvDay;
    if (p.mode === 'issued' || p.mode === 'resumed') {
        if (p.t === 'hgq') {
            var hf = 'Mau_22_BTNN_Quyet_dinh_hoan_' + vv + '_da_ky.pdf';
            var hReason = p.mode === 'resumed' ? 'Chờ kết quả giám định thương tật của Hội đồng giám định y khoa cấp tỉnh.' : 'Người yêu cầu bồi thường đề nghị hoãn để bổ sung chứng từ chi phí điều trị.';
            var hData = { reason: hReason, fromDate: D(14), toDate: D(24), days: typeof hgqDays === 'function' ? hgqDays(D(14), D(24)) : '', docNumber: p.mode === 'resumed' ? '31/QĐ-STP' : '35/QĐ-STP', docDate: D(14), fileName: hf, signedFile: hf, formNo: 'Mẫu số 22/BTNN', signingMethod: 'Ký số', previousStatus: prev, issuedAt: D(14) };
            c.hoanGiaiQuyet = hData;
            c.specialStatusLogs.push({ type: 'Hoãn giải quyết', docNo: hData.docNumber, docDate: hData.docDate, signMode: 'Ký số', startDate: hData.fromDate, endDate: hData.toDate, previousStatus: prev, reason: hReason, files: [{ name: hf, size: '296 KB', url: '#' }], attachments: [hdcvAtt('Đơn đề nghị hoãn giải quyết bồi thường', 'Don_de_nghi_hoan_' + p.code + '.pdf', '184 KB'), hdcvAtt('Giấy hẹn bổ sung chứng từ', 'Giay_hen_bo_sung_' + p.code + '.pdf', '96 KB')], createdAt: D(14) });
            c.timeline.push({ title: 'Ký duyệt Quyết định hoãn giải quyết bồi thường', date: D(14), desc: 'Lãnh đạo ký số Quyết định số ' + hData.docNumber + '. Vụ việc chuyển sang trạng thái [Hoãn giải quyết].', status: 'completed' });
            c.status = 'Hoãn giải quyết';
            c.slaStatus = 'warning'; c.slaText = 'Tạm dừng tính thời hạn xử lý do phát sinh hoãn giải quyết';
        } else {
            var off = p.sign === 'Ký ngoài';
            var tf = off ? 'QD_tam_dinh_chi_' + p.code + '_ky_ngoai.pdf' : 'Quyet_dinh_tam_dinh_chi_' + vv + '_da_ky.pdf';
            var tReason = off ? 'Chờ kết quả giải quyết vụ án hành chính có liên quan tại Tòa án nhân dân TP. Hà Nội.' : 'Người yêu cầu bồi thường là cá nhân đang điều trị bệnh dài ngày, chưa thể tham gia thương lượng.';
            c.tamDinhChi = { reason: tReason, date: D(15), docNumber: off ? '' : '12/QĐ-STP', docDate: off ? '' : D(15), fileName: tf, signedFile: tf, formNo: '', signingMethod: p.sign, previousStatus: prev, issuedAt: D(15) };
            c.specialStatusLogs.push({ type: 'Tạm đình chỉ', docNo: c.tamDinhChi.docNumber, docDate: c.tamDinhChi.docDate, signMode: p.sign, startDate: D(15), endDate: '', previousStatus: prev, reason: tReason, files: [{ name: tf, size: '352 KB', url: '#' }], attachments: off ? [] : [hdcvAtt('Giấy xác nhận điều trị dài ngày', 'Giay_xac_nhan_dieu_tri_' + p.code + '.pdf', '228 KB')], createdAt: D(15) });
            c.timeline.push({ title: off ? 'Ban hành Quyết định tạm đình chỉ giải quyết bồi thường (Ký ngoài)' : 'Ký duyệt Quyết định tạm đình chỉ giải quyết bồi thường', date: D(15), desc: (off ? 'Văn bản đã ký ngoài hệ thống (' + tf + ')' : 'Lãnh đạo ký số Quyết định số 12/QĐ-STP') + '. Vụ việc chuyển sang trạng thái [Tạm đình chỉ].', status: 'completed' });
            c.status = 'Tạm đình chỉ';
            c.slaStatus = 'warning'; c.slaText = 'Tạm dừng tính thời hạn xử lý do tạm đình chỉ';
        }
        c.specialStatusPreviousStatus = prev;
        c.hgqPrevStatus = prev;
        if (p.mode === 'resumed') {
            var rf = 'QD_tiep_tuc_giai_quyet_' + p.code + '_ky_ngoai.pdf';
            c.specialStatusLogs.push({ type: HDCV_RESUME, docNo: '40/QĐ-STP', docDate: D(22), signMode: 'Ký ngoài', startDate: D(22), endDate: '', previousStatus: 'Hoãn giải quyết', reason: 'Đã có kết quả giám định thương tật.', files: [{ name: rf, size: '210 KB', url: '#' }], createdAt: D(22) });
            c.tiepTucGiaiQuyet = { loai: 'hgq', docNumber: '40/QĐ-STP', docDate: D(22), fileName: rf, signedFile: rf, formNo: 'Mẫu số 23/BTNN', signingMethod: 'Ký ngoài', issuedAt: D(22) };
            c.timeline.push({ title: 'Ban hành Quyết định tiếp tục giải quyết bồi thường (Ký ngoài)', date: D(22), desc: 'Văn bản đã ký ngoài hệ thống (' + rf + '). Vụ việc chuyển từ [Hoãn giải quyết] sang trạng thái [' + prev + '].', status: 'completed' });
            c.status = prev;
            c.slaStatus = 'normal'; c.slaText = '';
        }
    }
    return c;
}
// Thêm vụ việc mẫu trước khi đồng bộ kho luồng (giữ trạng thái Chờ duyệt / đã ký duyệt khi tải lại trang)
(function () {
    var orig = window.seedNycOrgSampleClaims;
    window.seedNycOrgSampleClaims = function () {
        var r = typeof orig === 'function' ? orig.apply(this, arguments) : undefined;
        try {
            var tpl = claimsList.find(function (c) { return c && c.id === 'HS1'; });
            if (tpl) HDCV_SEED.forEach(function (p) {
                if (claimsList.some(function (x) { return x && (x.id === p.id || x.code === p.code); })) return;
                claimsList.push(hdcvBuildClaim(p, tpl));
            });
        } catch (e) { /* mockup */ }
        return r;
    };
})();
// Trình phiếu mẫu (lần đầu, khi chưa có hồ sơ luồng): Chờ duyệt / Bị từ chối
function hdcvSeedSubmit() {
    var W = typeof gqW === 'function' ? gqW() : null;
    if (!W || typeof claimsList === 'undefined') return false;
    var done = false;
    HDCV_SEED.forEach(function (p) {
        if (p.mode !== 'submit' && p.mode !== 'reject') return;
        var me = W.getCurrentUserId();
        try {
            var c = claimsList.find(function (x) { return x && x.id === p.id; });
            if (!c || gqRecord(c)) return;
            var rec = gqEnsureRecord(c); if (!rec) return;
            var assignees = gqSignLevels(c).map(function (lv) { return (lv.leaders && lv.leaders[0] && lv.leaders[0].id) || ''; });
            var prev = canonicalClaimStatus(c.status);
            var T = HDCV_TYPES[p.t], vv = c.maVuViec, signDoc, draftDoc, reasonFull, patch = { hgqPrevStatus: prev };
            if (p.t === 'dc') {
                var code = 'DCGQ_02';
                var rText = typeof dcgqReasonText === 'function' ? dcgqReasonText(code) : 'Người yêu cầu bồi thường rút toàn bộ yêu cầu bồi thường (Điểm b Khoản 1 Điều 51)';
                var detail = p.mode === 'reject' ? '' : 'Ngày ' + hdcvDay(16) + ', người yêu cầu bồi thường nộp đơn rút toàn bộ yêu cầu bồi thường.';
                var x = { reasonCode: code, reasonText: rText, detail: detail, reasonDoc: rText + (detail ? ': ' + detail : ''), docNumber: '', docDate: '', noiNhan: typeof DCGQ_NOI_NHAN_DEFAULT !== 'undefined' ? DCGQ_NOI_NHAN_DEFAULT.slice() : [], advance: null };
                var base = typeof dcgqDocBaseName === 'function' ? dcgqDocBaseName(c) : 'Mau_25_BTNN_Quyet_dinh_dinh_chi_' + vv;
                var body = ''; try { body = dcgqBuildMau25(c, x); } catch (e) { body = ''; }
                draftDoc = { source: 'generated', formNo: 'Mẫu số 25/BTNN', docTitle: 'Quyết định đình chỉ giải quyết yêu cầu bồi thường', generatedName: base + '.doc', uploadedName: '', bodyHtml: body };
                signDoc = { method: 'Ký số', file: base + '.pdf', enableRoomSig: true, sigCoords: [], reasonCode: code, reasonText: rText, detail: detail, docNumber: '', docDate: '', noiNhan: x.noiNhan, advance: null, docSrc: 'gen', docFileMeta: null, submitContent: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định đình chỉ giải quyết yêu cầu bồi thường.', attachments: [hdcvAtt('Đơn rút yêu cầu bồi thường', 'Don_rut_yeu_cau_boi_thuong_' + c.code + '.pdf', '176 KB'), hdcvAtt('Biên bản làm việc với người yêu cầu bồi thường', 'Bien_ban_lam_viec_' + c.code + '.pdf', '242 KB')] };
                reasonFull = rText + (detail ? ': ' + detail : '');
                patch.dinhChi = { reasonCode: code, reasonText: rText, detail: detail, docNumber: '', docDate: '', noiNhan: x.noiNhan, advance: null, fileName: base + '.doc', formNo: 'Mẫu số 25/BTNN', signingMethod: 'Ký số', submittedAt: gqNow() };
            } else {
                var tr = 'Chờ kết quả giải quyết khiếu nại đối với văn bản làm căn cứ yêu cầu bồi thường.';
                var up = 'Quyet_dinh_tam_dinh_chi_' + vv + '.pdf';
                draftDoc = { source: 'uploaded', formNo: '', docTitle: 'Quyết định tạm đình chỉ giải quyết bồi thường', generatedName: '', uploadedName: up, bodyHtml: '' };
                signDoc = { method: 'Ký số', file: up, enableRoomSig: true, sigCoords: [], reason: tr, date: hdcvDay(18), docSrc: 'upload', docFileMeta: { name: up, size: '318 KB', note: '', keepId: '' }, submitContent: 'Kính trình Lãnh đạo xem xét, ký duyệt Quyết định tạm đình chỉ giải quyết bồi thường.', attachments: [hdcvAtt('Thông báo thụ lý đơn khiếu nại', 'Thong_bao_thu_ly_khieu_nai_' + c.code + '.pdf', '154 KB')] };
                reasonFull = tr + ' (từ ngày ' + hdcvDay(18) + ')';
                patch.tamDinhChi = { reason: tr, date: hdcvDay(18), fileName: up, formNo: '', signingMethod: 'Ký số', previousStatus: prev, submittedAt: gqNow() };
            }
            W.setCurrentUser(rec.chuTri);
            var res = W.submitForApproval(c.code, T.kind, signDoc.submitContent, [], { assignee: assignees[0] || '', assignees: assignees, reason: reasonFull, resultStatus: T.status, draftDoc: draftDoc, signDoc: signDoc });
            if (!res || !res.ok) return;
            c.status = 'Chờ duyệt';
            c.timeline.push({ title: 'Trình Lãnh đạo: ' + T.kind, date: hdcvDay(18), desc: 'Trình Lãnh đạo ký duyệt ' + draftDoc.docTitle + '. Hồ sơ chuyển sang trạng thái [Chờ duyệt].', status: 'active' });
            if (p.mode === 'reject' && assignees[0]) {
                W.setCurrentUser(assignees[0]);
                var rr = W.rejectApproval(c.code, p.rejectReason);
                if (rr && rr.ok) {
                    c.status = 'Bị từ chối';
                    c.wfReturned = rr.record.returned || null;
                    c.timeline.push({ title: 'Lãnh đạo từ chối: ' + T.kind, date: hdcvDay(19), desc: 'Lý do: ' + p.rejectReason + '. Hồ sơ chuyển sang trạng thái [Bị từ chối].', status: 'active' });
                }
            }
            try { gqRecMap[c.code] = W.getRecord(c.code); } catch (e) { /* mockup */ }
            gqSaveData(c, patch);
            done = true;
        } catch (e) { /* mockup */ } finally { if (W.getCurrentUserId() !== me) W.setCurrentUser(me); }
    });
    return done;
}
function hdcvInit() {
    var seeded = false;
    try { seeded = hdcvSeedSubmit(); } catch (e) { /* mockup */ }
    if (seeded) {
        try { saveClaimsToLocal(); } catch (e) { /* mockup */ }
        try { renderClaimsTable(); } catch (e) { /* mockup */ }
    }
}
if (document.readyState === 'complete') setTimeout(hdcvInit, 0); else window.addEventListener('load', function () { setTimeout(hdcvInit, 0); });
