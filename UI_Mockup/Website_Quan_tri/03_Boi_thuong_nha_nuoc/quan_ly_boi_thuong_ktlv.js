/* [ktlv] Màn chi tiết hồ sơ Giải quyết YCBT - khối "Thông tin không thụ lý hồ sơ" và khối "Thông tin chuyển CQGQBT"
 * - Thẻ cảnh báo (viền trái đỏ, nền đỏ nhạt), lưới 2 cột nhãn - giá trị, trường dài chiếm full chiều ngang
 * - Thông báo không thụ lý: dòng File (icon loại tệp + tên tệp + nhãn) + Xem file / Tải file (icon có tooltip)
 * - Tài liệu kèm theo / Tài liệu chuyển giao: bảng tài liệu chế độ xem (ctvvDocsViewHtml)
 * - Được gọi từ gqWfInfoHtml (quan_ly_boi_thuong.html); "-" khi không có dữ liệu
 */
var KTLV_FILES = {};
var ktlvSeq = 0;
function ktlvE(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
}
function ktlvCss() {
    if (typeof ctvvCss === 'function') { try { ctvvCss(); } catch (e) { /* mockup */ } }
    if (document.getElementById('ktlvCss')) return;
    var st = document.createElement('style');
    st.id = 'ktlvCss';
    st.textContent = [
        '.ktlv-card { background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #dc2626; border-radius: 8px; padding: 14px 18px 16px; margin-bottom: 16px; font-size: 13px; line-height: 1.55; }',
        '.ktlv-card.is-info { background: #f8faff; border-color: #c7d2fe; border-left-color: #2563eb; }',
        '.ktlv-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #b91c1c; text-transform: uppercase; margin: 0 0 12px; padding-bottom: 10px; border-bottom: 1px solid #fecaca; }',
        '.ktlv-card.is-info .ktlv-title { color: #1e3a8a; border-bottom-color: #c7d2fe; }',
        '.ktlv-title .ktlv-st { margin-left: auto; text-transform: none; font-weight: 600; font-size: 11.5px; padding: 2px 10px; border-radius: 999px; background: #fff; border: 1px solid #fecaca; color: #b91c1c; white-space: nowrap; }',
        '.ktlv-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 28px; }',
        '.ktlv-f > .ktlv-l { display: block; color: #64748b; font-weight: 600; font-size: 12px; margin-bottom: 3px; }',
        '.ktlv-f > .ktlv-v { display: block; color: #0f172a; white-space: pre-line; overflow-wrap: anywhere; }',
        '.ktlv-full { grid-column: 1 / -1; }',
        '.ktlv-file { display: flex; align-items: center; gap: 8px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; background: #fff; }',
        '.ktlv-file > i { font-size: 15px; flex: none; }',
        '.ktlv-file .ktlv-fn { font-weight: 600; color: #0f172a; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
        '.ktlv-file small { color: #94a3b8; white-space: nowrap; }',
        '.ktlv-file .tlkt-acts { margin-left: auto; display: inline-flex; gap: 8px; flex: none; }',
        '.ktlv-file .tlkt-ib { width: 30px; height: 30px; font-size: 13px; }',
        '.ktlv-card .tlkt-view-box { margin-top: 2px; }',
        '@media (max-width: 900px) { .ktlv-grid { grid-template-columns: 1fr; } }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
}
function ktlvField(label, value, full) {
    var v = String(value == null ? '' : value).trim();
    return '<div class="ktlv-f' + (full ? ' ktlv-full' : '') + '"><span class="ktlv-l">' + ktlvE(label) + '</span><span class="ktlv-v">' + (v ? ktlvE(v) : '-') + '</span></div>';
}
function ktlvIcon(name) {
    if (typeof ctvvIcon === 'function') return ctvvIcon(name);
    return 'fa-solid fa-file-lines';
}
// Dòng File: icon loại tệp + tên tệp + nhãn (Bản dự thảo / Đã ban hành) + Xem file / Tải file
function ktlvFileHtml(name, tag) {
    if (!name) return '<span class="ktlv-v">-</span>';
    var id = 'kf' + (++ktlvSeq);
    KTLV_FILES[id] = name;
    return '<div class="ktlv-file" title="' + ktlvE(name) + '"><i class="' + ktlvIcon(name) + '"></i><span class="ktlv-fn">' + ktlvE(name) + '</span>'
        + (tag ? '<small>(' + ktlvE(tag) + ')</small>' : '')
        + '<span class="tlkt-acts">'
        + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Xem file" aria-label="Xem file" data-ktlv-act="view" data-ktlv-id="' + id + '"><i class="fa-solid fa-eye"></i></button>'
        + '<button type="button" data-admin-icon-normalized="1" class="tlkt-ib" title="Tải file" aria-label="Tải file" data-ktlv-act="dl" data-ktlv-id="' + id + '"><i class="fa-solid fa-download"></i></button>'
        + '</span></div>';
}
function ktlvFileField(label, name, tag) {
    return '<div class="ktlv-f ktlv-full"><span class="ktlv-l">' + ktlvE(label) + '</span>' + ktlvFileHtml(name, tag) + '</div>';
}
// Bảng tài liệu chế độ xem; rows: [{ name, file: { id, name, size } }] hoặc [{ name }] hoặc ['tên tệp']
function ktlvDocsField(label, list) {
    var rows = (list || []).map(function (a) {
        if (!a) return null;
        if (typeof a === 'string') return { title: a.replace(/\.[^.]+$/, ''), file: a };
        var f = a.file;
        var fn = f && typeof f === 'object' ? f.name : (f || (a.title ? '' : a.name) || '');
        return { title: a.title || (f ? a.name : String(a.name || '').replace(/\.[^.]+$/, '')) || '', file: fn || '', size: (f && f.size) || a.size || '', fileId: (f && f.id) || a.fileId || '' };
    }).filter(function (r) { return r && (r.title || r.file); });
    if (!rows.length) return '';
    var body = typeof ctvvDocsViewHtml === 'function'
        ? ctvvDocsViewHtml(rows)
        : rows.map(function (r) { return ktlvFileHtml(r.file, ''); }).join('');
    return '<div class="ktlv-f ktlv-full"><span class="ktlv-l">' + ktlvE(label) + '</span>' + body + '</div>';
}
function ktlvSignMethod(claim, sd) {
    var log = Array.isArray(claim.rejectionLog) && claim.rejectionLog.length ? claim.rejectionLog[claim.rejectionLog.length - 1] : null;
    if (log && log.method) return log.method;
    if (claim.signingMethod === 'online') return 'Ký số';
    if (claim.signingMethod === 'offline') return 'Ký ngoài';
    return (sd && sd.method) || '';
}
// Khối Thông tin không thụ lý hồ sơ (Không thụ lý / Đã chuyển CQGQBT do không thụ lý KTL_01 / Chờ duyệt / Bị từ chối)
function ktlvBlockHtml(claim, caseSt, rec, W) {
    if (!claim) return '';
    var reason = claim.ktlReasonName || (claim.trinhDuyet && claim.trinhDuyet.type === 'Không thụ lý' ? claim.trinhDuyet.reasonText : '');
    if (!reason || ['Không thụ lý', 'Đã chuyển CQGQBT', 'Chờ duyệt', 'Bị từ chối'].indexOf(caseSt) < 0) return '';
    ktlvCss();
    var a = rec && rec.approval && rec.approval.kind === 'Không thụ lý' ? rec.approval : null;
    var sd = a && a.signDoc;
    var issued = caseSt === 'Không thụ lý' || (caseSt === 'Đã chuyển CQGQBT' && claim.ktlReasonCode === 'KTL_01');
    // Badge tiêu đề chỉ khi Chờ duyệt / Bị từ chối; văn bản đã ban hành thể hiện bằng nhãn cạnh tên file
    var stTxt = issued ? '' : (caseSt === 'Bị từ chối' ? 'Bị từ chối' : 'Chờ duyệt');
    var atts = (sd && sd.attachments && sd.attachments.length ? sd.attachments : null) || claim.ktlAttachments;
    var h = '<div class="ktlv-card" id="ktlvInfoBlock"><div class="ktlv-title"><i class="fa-solid fa-circle-exclamation"></i> Thông tin không thụ lý hồ sơ' + (stTxt ? '<span class="ktlv-st">' + ktlvE(stTxt) + '</span>' : '') + '</div><div class="ktlv-grid">';
    h += ktlvField('Lý do không thụ lý', reason, true);
    h += ktlvField('Diễn giải', claim.ktlDetail, true);
    if (issued) {
        var tr = Object.assign({}, claim.transferRequest || {}, claim.transferTo || {});
        var method = ktlvSignMethod(claim, sd);
        var log = Array.isArray(claim.rejectionLog) && claim.rejectionLog.length ? claim.rejectionLog[claim.rejectionLog.length - 1] : null;
        var signer = '';
        if (method === 'Ký số') signer = (log && log.officer) || claim.rejectOfficer || (sd && sd.signedBy && W && W.userName ? W.userName(sd.signedBy) : '');
        h += ktlvField('Số, ký hiệu văn bản', claim.ktlDocNumber || tr.docNo);
        h += ktlvField('Ngày văn bản', claim.ktlDocDate || tr.docDate);
        h += ktlvField('Hình thức ký', method);
        h += ktlvField('Người ký', signer);
        h += ktlvFileField('Thông báo không thụ lý', claim.signedFile || tr.signedFile || (sd && sd.signedFile) || '', 'Đã ban hành');
        h += ktlvDocsField('Tài liệu kèm theo', atts);
    } else {
        // Chờ duyệt / Bị từ chối: bản dự thảo của lần trình
        var dd = a && a.draftDoc;
        var draft = (sd && sd.file) || (dd && (dd.source === 'uploaded' ? dd.uploadedName : dd.generatedName)) || claim.ktlDraftFile || '';
        h += ktlvFileField('Thông báo không thụ lý', draft, 'Bản dự thảo');
        h += ktlvDocsField('Tài liệu kèm theo', atts);
    }
    return h + '</div></div>';
}
// Dữ liệu mẫu bổ sung (chỉ điền khi bản ghi chưa có): Tài liệu kèm theo BT-2026-411; hồ sơ Chờ duyệt Không thụ lý BT-2026-018
var KTLV_SEED = {
    'BT-2026-411': {
        ktlAttachments: [
            { name: 'Quyết định hủy Quyết định xử phạt số 15/QĐ-XPHC ngày 12/03/2022', file: { id: '', name: 'QD_huy_QD_xu_phat_15_QD-XPHC.pdf', size: 251904 } },
            { name: 'Biên bản làm việc với người yêu cầu bồi thường', file: { id: '', name: 'Bien_ban_lam_viec_BT-2026-411.pdf', size: 189440 } }
        ]
    },
    'BT-2026-018': {
        ktlReasonName: 'Thời hiệu yêu cầu bồi thường đã hết (Điểm b Khoản 2 Điều 43)',
        ktlDetail: 'Văn bản làm căn cứ yêu cầu bồi thường có hiệu lực đã quá 03 năm tính đến ngày nộp hồ sơ theo Điều 6 Luật Trách nhiệm bồi thường của Nhà nước.',
        ktlDraftFile: function (c) { return 'Mau_04_BTNN_Thong_bao_khong_thu_ly_' + (typeof claimVvCode === 'function' ? claimVvCode(c) : c.code) + '.pdf'; },
        ktlAttachments: [
            { name: 'Văn bản làm căn cứ yêu cầu bồi thường', file: { id: '', name: 'Van_ban_can_cu_BT-2026-018.pdf', size: 204800 } }
        ]
    }
};
function ktlvSeedFill(claim) {
    var s = claim && KTLV_SEED[claim.code];
    if (!s) return;
    Object.keys(s).forEach(function (k) { if (claim[k] === undefined || claim[k] === null || claim[k] === '') claim[k] = typeof s[k] === 'function' ? s[k](claim) : s[k]; });
}
(function () {
    var orig = ktlvBlockHtml;
    ktlvBlockHtml = function (claim) {
        try { ktlvSeedFill(claim); } catch (e) { /* mockup */ }
        return orig.apply(this, arguments);
    };
})();
// Khối Thông tin chuyển CQGQBT (chuyển do không thụ lý KTL_01 hoặc Chuyển CQGQBT)
function ktlvTransferHtml(claim, caseSt, W) {
    var t = claim.transferTo || null;
    var tr = claim.transferRequest || null;
    if (!t && !tr) return '';
    ktlvCss();
    W = W || {};
    var mode = (t && t.mode) || (tr && tr.mode) || '';
    var loai = (t && t.loaiYeuCau) || (tr && tr.loaiYeuCau) || '';
    var unit = t ? (W.unitName ? W.unitName(t.targetUnitId) : t.targetUnitId) : tr.targetName;
    var h = '<div class="ktlv-card is-info" id="ktlvTransferBlock"><div class="ktlv-title"><i class="fa-solid fa-right-left"></i> Thông tin chuyển cơ quan giải quyết bồi thường</div><div class="ktlv-grid">';
    if (mode) {
        h += ktlvField('Chuyển cơ quan tiếp nhận mới', (W.KTL_TRANSFER_LABELS || {})[mode] || mode);
        h += ktlvField('Loại hồ sơ tại cơ quan nhận', loai);
    }
    h += ktlvField('Cơ quan tiếp nhận mới', unit);
    if (t) h += ktlvField('Mã hồ sơ tại cơ quan tiếp nhận mới', (t.code || '') + (t.at ? ' - ' + t.at : ''));
    h += ktlvField('Nội dung/Căn cứ chuyển', t ? t.content : tr.content, true);
    if (caseSt === 'Đã chuyển CQGQBT') {
        var src = Object.assign({}, tr || {}, t || {});
        // Không thụ lý KTL_01: Số, Ngày, Thông báo không thụ lý đã hiển thị tại khối Thông tin không thụ lý hồ sơ
        if (claim.ktlReasonCode !== 'KTL_01') {
            h += ktlvField('Số, ký hiệu văn bản', src.docNo);
            h += ktlvField('Ngày văn bản', src.docDate);
            h += ktlvFileField('Văn bản đã ban hành', src.signedFile || '', src.signedFile ? 'Đã ban hành' : '');
        }
        var docs = ktlvDocsField('Tài liệu chuyển giao', src.files);
        h += docs || ktlvField('Tài liệu chuyển giao', '', true);
    }
    return h + '</div></div>';
}
document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-ktlv-act]') : null;
    if (!b) return;
    e.preventDefault();
    var name = KTLV_FILES[b.getAttribute('data-ktlv-id')];
    if (!name) return;
    if (b.getAttribute('data-ktlv-act') === 'view') {
        if (typeof viewPhddMockFile === 'function') viewPhddMockFile(name);
    } else if (typeof showToast === 'function') {
        showToast('Đang tải file ' + name + '.', 'success');
    }
});
