/* [ktlc] Không thụ lý lý do KTL_01 (Không thuộc thẩm quyền) - Quy tắc "Chuyển hồ sơ cho" theo cấp đơn vị và số lần đã chuyển
 * Phạm vi áp dụng: hồ sơ Giải quyết YCBT có nguồn gốc Tiếp nhận mới / Dịch vụ công, chưa từng qua bước Xác định CQGQBT.
 * - Lần 1 (chưa từng chuyển do KTL_01): đơn vị trung ương -> Bộ Tư pháp / Cơ quan giải quyết bồi thường khác;
 *   đơn vị địa phương -> Sở Tư pháp cùng tỉnh, thành phố (hệ thống tự xác định) / Cơ quan giải quyết bồi thường khác.
 * - Từ lần 2 (hồ sơ đã chuyển ít nhất 01 lần do KTL_01): bắt buộc Bộ Tư pháp (trung ương) / Sở Tư pháp cùng tỉnh (địa phương);
 *   khi ban hành, hệ thống tự tạo hồ sơ Xác định CQGQBT tại cơ quan nhận (Sở Tư pháp: luồng STP tham mưu, UBND tỉnh xem).
 * - Hồ sơ đã qua Xác định CQGQBT / nguồn khác: giữ 03 lựa chọn như trước.
 * Nạp tại quan_ly_boi_thuong.html (popup Không thụ lý, ban hành, khối chuyển ở màn chi tiết, dữ liệu mẫu)
 * và xac_dinh_co_quan_boi_thuong.html (khối "Thông tin hồ sơ chuyển đến" ở màn chi tiết).
 */
var KTLC_VERSION = '20261027ktl2';
var KTLC_LABELS = { BTP: 'Bộ Tư pháp', STP: 'Sở Tư pháp', CQ: 'Cơ quan giải quyết bồi thường khác' };
// Chuyển cho chính đơn vị (Bộ Tư pháp / Sở Tư pháp Không thụ lý KTL_01): hồ sơ Xác định CQGQBT tạo tại chính đơn vị
var KTLC_SELF_SUFFIX = ' (bộ phận Xác định CQGQBT)';
// Thuộc tính "Cấp đơn vị" của đơn vị gốc trên Cơ cấu tổ chức (Quản trị hệ thống): dữ liệu mẫu gán cho cây đơn vị của BTNN_WF
var KTLC_CAP = { TW: 'Trung ương', DP: 'Địa phương' };
var KTLC_CAP_MAU = {
    'Trung ương': ['BTP-01', 'VKSNDTC', 'TANDTC', 'VPCP', 'TTCP', 'BTC'],
    'Địa phương': ['STP-HN', 'STP-HCM', 'STP-HP', 'UBND-CG', 'UBND-HK', 'UBND-HM', 'UBND-LD', 'UBND-DD', 'UBND-HN', 'THADS-LD', 'THADS-HP', 'THADS-HN',
        'TAND-LD', 'TAND-HN', 'TAND-HK', 'TAND-LC', 'TAND-NT', 'CA-TX', 'CA-HM', 'VKS-Q1', 'VKS-HP', 'CCTHADS-BT', 'CCTHADS-CG', 'CCTHADS-TT', 'CCTS-BD']
};
// Suy cấp khi đơn vị chưa có thuộc tính Cấp đơn vị: đơn vị gốc trung ương (Bộ, cơ quan ngang Bộ, TAND tối cao, VKSND tối cao)
var KTLC_TW_IDS = ['BTP-01', 'VKSNDTC', 'TANDTC', 'VPCP', 'TTCP', 'BTC'];
// Loại cơ quan [DM_57] cấp trung ương (khi đơn vị có thuộc tính loaiCoQuan)
var KTLC_TW_LDV = ['LDV_01', 'LDV_02', 'LDV_14', 'LDV_15', 'LDV_16', 'LDV_22', 'LDV_25', 'LDV_26', 'LDV_27', 'LDV_28', 'LDV_32'];

function ktlcW() { return window.BTNN_WF || null; }
function ktlcE(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ktlcRoot(id) { var W = ktlcW(); return W && id ? (W.getRootId(id) || id) : ''; }
(function () {
    var W = ktlcW();
    if (!W || !Array.isArray(W.ORG_UNITS)) return;
    Object.keys(KTLC_CAP_MAU).forEach(function (cap) {
        KTLC_CAP_MAU[cap].forEach(function (id) { var u = W.getUnit(id); if (u && !u.parentId && !u.capDonVi) u.capDonVi = cap; });
    });
})();
// Cấp đơn vị của đơn vị gốc: ưu tiên thuộc tính Cấp đơn vị trên Cơ cấu tổ chức; thiếu thì suy theo Loại cơ quan / mã / tên
function ktlcCapOf(unitId) {
    var W = ktlcW();
    var root = ktlcRoot(unitId);
    var u = W && root ? W.getUnit(root) : null;
    if (!u) return '';
    if (u.capDonVi === KTLC_CAP.TW || u.capDonVi === KTLC_CAP.DP) return u.capDonVi;
    return ktlcIsTWGuess(u, root) ? KTLC_CAP.TW : KTLC_CAP.DP;
}
function ktlcIsTW(unitId) { return ktlcCapOf(unitId) === KTLC_CAP.TW; }
// Suy cấp trung ương theo Loại cơ quan (nếu có), danh sách đơn vị gốc trung ương, hoặc tên (Bộ ..., ... tối cao, ... Chính phủ)
function ktlcIsTWGuess(u, root) {
    if (u.loaiCoQuan) return KTLC_TW_LDV.indexOf(u.loaiCoQuan) >= 0;
    if (KTLC_TW_IDS.indexOf(root) >= 0) return true;
    return /^Bộ\s|tối cao|Chính phủ|^Ngân hàng Nhà nước|^Ủy ban Dân tộc|quân sự Trung ương/i.test(u.name);
}
function ktlcFindClaim(code) {
    try { return (typeof claimsList !== 'undefined' && Array.isArray(claimsList)) ? (claimsList.find(function (c) { return c && c.code === code; }) || null) : null; } catch (e) { return null; }
}
function ktlcPick(claim, rec, key) {
    var v = claim && claim[key] !== undefined && claim[key] !== '' ? claim[key] : undefined;
    if (v === undefined && rec && rec[key] !== undefined && rec[key] !== '') v = rec[key];
    return v;
}
// Chuỗi hồ sơ chuyển đến (Mã hồ sơ chuyển đến): số hồ sơ Giải quyết YCBT đã chuyển trước đó, nguồn hồ sơ đầu chuỗi, có hồ sơ Xác định CQGQBT trong chuỗi
function ktlcChain(rec) {
    var W = ktlcW();
    var res = { n: 0, goc: '', quaXd: false };
    if (!W || !rec || typeof W.getRecord !== 'function') return res;
    var seen = {}, r = rec;
    while (r && r.transferFromCode && !seen[r.code]) {
        seen[r.code] = 1;
        var p = W.getRecord(r.transferFromCode);
        if (!p) break;
        if (W.isXdRec && W.isXdRec(p)) { res.quaXd = true; break; }
        // Chỉ tính hồ sơ chuyển do Không thụ lý KTL_01 - Cơ quan giải quyết bồi thường khác; hồ sơ đến qua thao tác Chuyển CQGQBT: ngoài phạm vi
        if (r.transferMode !== 'CQ') { res.ngoai = true; break; }
        res.n++;
        r = p;
    }
    if (res.n && !res.quaXd && r && r.nguonHoSo && W.normalizeSource) res.goc = W.normalizeSource(r.nguonHoSo);
    return res;
}
// Thông tin hồ sơ: số lần đã chuyển do KTL_01, nguồn gốc, đã qua Xác định CQGQBT chưa
function ktlcInfo(claim, rec) {
    var W = ktlcW();
    var S = (W && W.SOURCES) || {};
    var norm = function (v) { return W && W.normalizeSource ? W.normalizeSource(v) : v; };
    var src = norm(ktlcPick(claim, rec, 'nguonHoSo') || '') || S.TIEP_NHAN;
    var lan = Number(ktlcPick(claim, rec, 'ktlcLan') || 0);
    // Đếm theo chuỗi hồ sơ cùng Mã vụ việc (Mã hồ sơ chuyển đến -> hồ sơ trước): mỗi hồ sơ Giải quyết YCBT đã chuyển trực tiếp = 01 lần
    var ch = ktlcChain(rec);
    if (ch.n > lan) lan = ch.n;
    // Hồ sơ nhận do đơn vị trước Không thụ lý KTL_01 - Chuyển trực tiếp (dữ liệu trước khi có ktlcLan): tính 01 lần
    if (!lan && rec && rec.transferMode === 'CQ' && src === S.CHUYEN) lan = 1;
    var goc = norm(ktlcPick(claim, rec, 'ktlcNguonGoc') || '') || ch.goc || (lan ? '' : src);
    var quaXd = !!ktlcPick(claim, rec, 'ktlcQuaXd') || src === S.XDCQ || !!ktlcPick(claim, rec, 'xdCode') || ch.quaXd;
    var applies = !quaXd && ([S.TIEP_NHAN, S.DVC].indexOf(goc) >= 0 || (src === S.CHUYEN && lan > 0));
    return { src: src, lan: lan, goc: goc || S.TIEP_NHAN, quaXd: quaXd, applies: applies };
}
// Đơn vị xét cấp: đơn vị gốc của tài khoản đang đăng nhập (ô "Cán bộ đang đăng nhập" là tài khoản theo Cơ cấu tổ chức), ngược lại đơn vị gốc của hồ sơ
function ktlcUnitOf(claim, rec, useActing) {
    var W = ktlcW();
    if (!W) return '';
    if (useActing) {
        var sel = document.getElementById('currentOfficerSelector');
        var u = sel && sel.value ? W.USERS.find(function (x) { return x.name === sel.value; }) : null;
        if (u) return ktlcRoot(u.unitId);
    }
    if (rec && rec.rootUnitId) return ktlcRoot(rec.rootUnitId);
    if (claim && typeof gqClaimUnitId === 'function') { try { return ktlcRoot(gqClaimUnitId(claim, rec)); } catch (e) { /* mockup */ } }
    return '';
}
// Quy tắc lựa chọn "Chuyển hồ sơ cho"
function ktlcRule(claim, rec, unitId) {
    var W = ktlcW();
    var info = ktlcInfo(claim, rec);
    var tw = ktlcIsTW(unitId);
    var stp = W && unitId ? W.stpOfUnit(unitId) : '';
    var modes;
    if (!info.applies) modes = ['BTP', 'STP', 'CQ'];
    else if (info.lan >= 1) modes = [tw ? 'BTP' : 'STP'];
    else modes = [tw ? 'BTP' : 'STP', 'CQ'];
    return { applies: info.applies, lan: info.lan, goc: info.goc, quaXd: info.quaXd, tw: tw, unitId: unitId, stpId: stp, modes: modes, forced: info.applies && info.lan >= 1 };
}
// Đơn vị nhận theo lựa chọn Bộ Tư pháp / Sở Tư pháp là chính đơn vị gốc đang Không thụ lý
function ktlcBtpId() { var W = ktlcW(); return W ? ((W.getRootUnits().find(function (x) { return /^BTP/.test(x.id); }) || {}).id || '') : ''; }
function ktlcIsSelf(mode, unitId) {
    var W = ktlcW();
    var root = ktlcRoot(unitId);
    if (!W || !root) return false;
    if (mode === 'BTP') return ktlcBtpId() === root;
    if (mode === 'STP') return W.stpOfUnit(root) === root;
    return false;
}
function ktlcModeLabel(mode, rule, unitIdForStp) {
    var W = ktlcW();
    var self = ktlcIsSelf(mode, (rule && rule.unitId) || unitIdForStp) ? KTLC_SELF_SUFFIX : '';
    if (mode === 'STP') {
        var stp = (rule && rule.stpId) || (W && unitIdForStp ? W.stpOfUnit(unitIdForStp) : '');
        return (stp && W ? W.unitName(stp) : KTLC_LABELS.STP) + self;
    }
    return (KTLC_LABELS[mode] || mode || '') + (mode === 'BTP' ? self : '');
}
function ktlcNoteHtml(rule) {
    if (!rule.applies) return '';
    var cap = rule.tw ? 'cấp trung ương' : 'địa phương';
    var txt = rule.forced
        ? 'Hồ sơ đã được chuyển ' + rule.lan + ' lần do không thuộc thẩm quyền. Bắt buộc chuyển ' + (rule.tw ? 'Bộ Tư pháp' : 'Sở Tư pháp') + ' để xác định cơ quan giải quyết bồi thường; khi ban hành, hệ thống tự tạo hồ sơ Xác định cơ quan giải quyết bồi thường.'
        : 'Đơn vị ' + cap + ': chuyển ' + (rule.tw ? 'Bộ Tư pháp' : 'Sở Tư pháp cùng tỉnh, thành phố') + ' hoặc cơ quan giải quyết bồi thường khác.';
    if (ktlcIsSelf(rule.tw ? 'BTP' : 'STP', rule.unitId)) txt += ' Đơn vị là ' + (rule.tw ? 'Bộ Tư pháp' : 'Sở Tư pháp') + ': chuyển cho bộ phận Xác định cơ quan giải quyết bồi thường của đơn vị.';
    return '<div class="ktlc-note" style="font-size:12.5px; color:#475569; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:6px 10px; margin:0 0 8px;"><i class="fa-solid fa-circle-info"></i> ' + ktlcE(txt) + '</div>';
}

// ---------- 1. Khối "Chuyển hồ sơ cho" (bọc BTNN_WF.mountKtlTransfer) ----------
function ktlcCurrentClaim(o) {
    try {
        if (o && o.name === 'ktlTransferMode' && typeof selectedKtlClaim !== 'undefined' && selectedKtlClaim) return selectedKtlClaim;
        if (typeof gqState !== 'undefined' && gqState && gqState.claimId && typeof gqClaim === 'function') return gqClaim(gqState.claimId);
    } catch (e) { /* mockup */ }
    return o && o.rec && o.rec.code ? ktlcFindClaim(o.rec.code) : null;
}
(function () {
    var W = ktlcW();
    if (!W || typeof W.mountKtlTransfer !== 'function' || W.__ktlcMount) return;
    W.__ktlcMount = true;
    var orig = W.mountKtlTransfer;
    W.mountKtlTransfer = function (container, options) {
        var o = Object.assign({}, options || {});
        var claim = o.claim || ktlcCurrentClaim(o);
        var rec = null;
        try { rec = claim && typeof gqRecord === 'function' ? gqRecord(claim) : null; } catch (e) { rec = null; }
        if (!rec && o.rec && o.rec.code) rec = o.rec;
        var unitId = ktlcUnitOf(claim, rec || o.rec, true) || ktlcRoot((o.rec || {}).rootUnitId);
        var rule = ktlcRule(claim, rec, unitId);
        o.rec = Object.assign({}, o.rec || {}, { rootUnitId: unitId || (o.rec || {}).rootUnitId });
        if (rule.modes.indexOf(o.mode) < 0) o.mode = rule.modes.length === 1 ? rule.modes[0] : '';
        var api = orig.call(this, container, o);
        if (!api || !container) return api;
        // Lựa chọn theo quy tắc: ẩn lựa chọn không áp dụng, đổi nhãn
        container.querySelectorAll('input[type=radio][name="' + o.name + '"]').forEach(function (r) {
            var lb = r.closest('label');
            var ok = rule.modes.indexOf(r.value) >= 0;
            r.disabled = !ok;
            if (lb) {
                if (!ok) lb.style.display = 'none';
                var tn = r.nextSibling;
                if (tn && tn.nodeType === 3) tn.nodeValue = ' ' + ktlcModeLabel(r.value, rule);
                lb.setAttribute('data-ktlc-mode', r.value);
            }
            if (!ok && r.checked) r.checked = false;
        });
        // Sở Tư pháp đã hiển thị trong nhãn lựa chọn: chỉ giữ dòng cảnh báo khi không xác định được
        var stpSub = container.querySelector('.wf-ktl-sub[data-for="STP"]');
        if (stpSub && rule.stpId) stpSub.remove();
        var modesBox = container.querySelector('.wf-ktl-modes');
        if (modesBox) modesBox.insertAdjacentHTML('afterbegin', ktlcNoteHtml(rule));
        // Tiêu đề khối trong popup Không thụ lý (cán bộ)
        var blk = container.closest ? container.closest('#ktlTransferBlock') : null;
        var tt = blk ? blk.querySelector('.gqx-transfer-title') : null;
        if (tt) tt.innerHTML = '<i class="fa-solid fa-right-left"></i> Chuyển hồ sơ cho <span class="gqx-req" style="color:#dc2626;">*</span>';
        // Popup Từ chối - Không thụ lý của Lãnh đạo: nhãn trường
        var lbl = container.parentElement ? container.parentElement.querySelector('.gq-label') : null;
        if (lbl && /Chuyển cơ quan tiếp nhận mới/.test(lbl.textContent)) lbl.innerHTML = 'Chuyển hồ sơ cho <span class="gq-req">*</span>';
        // Chỉ 01 lựa chọn (bắt buộc): chọn sẵn
        if (rule.modes.length === 1) {
            var only = container.querySelector('input[type=radio][name="' + o.name + '"][value="' + rule.modes[0] + '"]');
            if (only && !only.checked) { only.checked = true; only.dispatchEvent(new Event('change')); }
        }
        var v = api.validate;
        api.validate = function () {
            var m = api.getMode();
            if (!m || rule.modes.indexOf(m) < 0) { api.setError('Đây là trường bắt buộc'); return { ok: false, message: 'Vui lòng chọn Chuyển hồ sơ cho.' }; }
            var r = v.apply(api, arguments);
            if (!r.ok && m === 'CQ' && !api.getUnitId()) api.setError('Đây là trường bắt buộc');
            return r;
        };
        api.ktlcRule = rule;
        return api;
    };
})();

// ---------- 2. Kiểm tra khối "Chuyển hồ sơ cho" tại popup Không thụ lý (Bước 1 -> Bước 2 / Ban hành Ký ngoài) ----------
function ktlcValidatePopup() {
    var sel = document.getElementById('ktlReason');
    if (!sel || sel.value !== 'KTL_01') return true;
    var ok = true, first = null;
    var api = window.ktlTransferApi;
    if (api && typeof api.validate === 'function') {
        var r = api.validate();
        if (!r.ok) { ok = false; first = document.getElementById('gqKtlModeBox'); }
    }
    var note = document.getElementById('ktlTransferNote');
    var err = document.getElementById('ktlcNoteErr');
    if (note && !err) {
        note.insertAdjacentHTML('afterend', '<div id="ktlcNoteErr" class="gqx-err" style="display:none; color:#dc2626; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</div>');
        err = document.getElementById('ktlcNoteErr');
        note.addEventListener('input', function () { note.classList.remove('is-invalid'); if (err) err.style.display = 'none'; });
        var lb = note.parentElement ? note.parentElement.querySelector('label[for="ktlTransferNote"]') : null;
        if (lb && !lb.querySelector('.gqx-req')) lb.insertAdjacentHTML('beforeend', '<span class="gqx-req">*</span>');
    }
    if (note && !note.value.trim()) {
        ok = false;
        note.classList.add('is-invalid');
        if (err) err.style.display = 'block';
        if (!first) first = note;
    }
    if (!ok && first) {
        try { first.scrollIntoView({ block: 'center' }); } catch (e) { /* mockup */ }
        if (first === note) note.focus();
    }
    return ok;
}
(function () {
    ['goToKtlStep2', 'submitKtlOffline', 'submitKtlOnline'].forEach(function (fn) {
        var orig = window[fn];
        if (typeof orig !== 'function' || orig.__ktlc) return;
        var w = function () {
            if (!ktlcValidatePopup()) {
                var offRadio = document.getElementById('ktlSigningMethodOffline');
                if (fn === 'goToKtlStep2' && offRadio && offRadio.checked) return orig.apply(this, arguments);
                if (fn === 'submitKtlOnline' && typeof showToast === 'function') showToast('Vui lòng hoàn thiện thông tin Chuyển hồ sơ cho tại Bước 1.', 'warning');
                return;
            }
            return orig.apply(this, arguments);
        };
        w.__ktlc = true;
        window[fn] = w;
    });
    // Popup tự gắn ô bắt buộc cho Nội dung/Căn cứ chuyển khi chọn KTL_01
    var origReason = window.handleKtlReasonChange;
    if (typeof origReason === 'function' && !origReason.__ktlc) {
        var wr = function () {
            var r = origReason.apply(this, arguments);
            var note = document.getElementById('ktlTransferNote');
            var lb = note && note.parentElement ? note.parentElement.querySelector('label[for="ktlTransferNote"]') : null;
            if (lb && !lb.querySelector('.gqx-req')) lb.insertAdjacentHTML('beforeend', '<span class="gqx-req">*</span>');
            var e = document.getElementById('ktlcNoteErr'); if (e) e.style.display = 'none';
            if (note) note.classList.remove('is-invalid');
            return r;
        };
        wr.__ktlc = true;
        window.handleKtlReasonChange = wr;
    }
})();

// ---------- 3. Ban hành: chuyển hồ sơ theo lựa chọn; từ lần 2 tự tạo hồ sơ Xác định CQGQBT ----------
// Kế thừa thông tin người yêu cầu, thiệt hại, văn bản căn cứ, tài liệu, lịch sử từ hồ sơ Giải quyết YCBT sang hồ sơ mới
function ktlcInherit(nr, claim, rec) {
    if (!nr) return;
    var c = claim || {};
    var set = function (k, v) { if ((nr[k] === undefined || nr[k] === null || nr[k] === '') && v !== undefined && v !== null && v !== '') nr[k] = v; };
    set('nycName', c.nyc || c.nycName || (typeof getClaimRequesterName === 'function' && claim ? getClaimRequesterName(claim) : ''));
    set('nycType', c.nycType); set('nycRole', c.nycRole || c.role); set('nycPhone', c.nycPhone || c.phone); set('nycEmail', c.nycEmail);
    set('nycCountry', c.nycCountry); set('nycTinhThanh', c.nycTinhThanh); set('nycPhuongXa', c.nycPhuongXa); set('nycAddressDetail', c.nycAddressDetail);
    set('nycDob', c.nycBirth); set('nycDocType', c.nycCardType || c.cardType); set('nycDocNo', c.nycCardNo || c.cardNo); set('nycDocDate', c.nycCardDate); set('nycDocPlace', c.nycCardPlace);
    set('nycOrgCode', c.nycOrgCode); set('nycRepName', c.nycRepName); set('nycRepPosition', c.nycRepPosition);
    set('hanhVi', c.hanhVi); set('nhanQua', c.nhanQua); set('docBase', c.docBase); set('requestType', c.requestType); set('fieldGroup', c.fieldGroup);
    if (!Array.isArray(nr.thietHaiList) && Array.isArray(c.thietHaiList)) nr.thietHaiList = JSON.parse(JSON.stringify(c.thietHaiList));
    if (!Array.isArray(nr.vanBanCanCu) && Array.isArray(c.vanBanCanCu)) nr.vanBanCanCu = JSON.parse(JSON.stringify(c.vanBanCanCu));
    var docs = Array.isArray(nr.attachedDocs) ? nr.attachedDocs.slice() : [];
    var add = function (name, file) { if (file && !docs.some(function (d) { return d && d.file === file; })) docs.push({ name: name || file, file: file }); };
    (c.vanBanCanCu || []).forEach(function (v) { add(v.name, v.file); });
    (c.files || []).forEach(function (f) { add('Văn bản yêu cầu bồi thường', f && (f.name || f)); });
    (nr.transferFiles || []).forEach(function (f) { add('Tài liệu chuyển giao', f && (f.name || f)); });
    nr.attachedDocs = docs;
    // Lịch sử xử lý tại cơ quan chuyển (xem lại tại hồ sơ mới)
    if (rec && Array.isArray(rec.history) && !nr.ktlcHistory) nr.ktlcHistory = rec.history.map(function (h) { return { at: h.at, userName: h.userName, action: h.action, note: h.note, unitId: rec.rootUnitId }; });
}
// transfer: { mode, unitId, note, files: [{name}] }; o: { claim, noticeFile, attachments, method }
function ktlcDoTransfer(code, transfer, o) {
    var W = ktlcW();
    o = o || {};
    if (!W || !transfer || !transfer.mode) return { ok: false, message: 'Thiếu thông tin Chuyển hồ sơ cho.' };
    var rec = W.getRecord(code);
    if (!rec) return { ok: false, message: 'Không tìm thấy hồ sơ ' + code + '.' };
    if (rec.transferTo && rec.transferTo.code) return { ok: true, record: rec, newCode: rec.transferTo.code, skipped: true };
    var claim = o.claim || ktlcFindClaim(code);
    var unitId = ktlcRoot(rec.rootUnitId) || ktlcUnitOf(claim, rec, false);
    var rule = ktlcRule(claim, rec, unitId);
    var mode = rule.modes.indexOf(transfer.mode) >= 0 ? transfer.mode : rule.modes[0];
    var tgt = W.ktlTransferTarget(Object.assign({}, rec, { rootUnitId: unitId }), mode, transfer.unitId);
    if (!tgt.ok) return { ok: false, message: tgt.message };
    var files = [];
    var addF = function (n) { if (n && !files.some(function (f) { return f.name === n; })) files.push({ name: n }); };
    (transfer.files || []).forEach(function (f) { addF(f && (f.name || f)); });
    // Chỉ chuyển tài liệu ban hành kèm theo văn bản Không thụ lý
    (o.attachments || []).forEach(function (a) { addF(a && ((a.file && (a.file.name || a.file)) || a.name)); });
    var auto = rule.forced;
    var lanMoi = (rule.applies ? rule.lan : 0) + 1;
    var at = W.nowText();
    var newCode = W.performTransfer(rec, {
        type: 'transfer', mode: mode, loaiYeuCau: tgt.loaiYeuCau, targetUnitId: tgt.targetUnitId, content: transfer.note || '', files: files,
        noticeDoc: o.noticeFile ? { source: 'uploaded', uploadedName: o.noticeFile } : null
    });
    if (!newCode) return { ok: false, message: 'Không tạo được hồ sơ tại cơ quan nhận.' };
    rec.status = W.STATUS.DA_CHUYEN;
    rec.transferTo = Object.assign(rec.transferTo || {}, { ktlcLan: lanMoi, ktlcAuto: auto, ktlcApplies: rule.applies });
    rec.gqData = Object.assign({}, rec.gqData || {}, {
        transferRequest: { via: 'Không thụ lý', mode: mode, targetUnitId: tgt.targetUnitId, targetName: W.unitName(tgt.targetUnitId), loaiYeuCau: tgt.loaiYeuCau, content: transfer.note || '', files: files }
    });
    var lbl = ktlcModeLabel(mode, rule, unitId);
    W.addHistory(rec, auto ? 'Chuyển xác định CQGQBT' : 'Không thụ lý',
        (auto ? 'Không thụ lý - Không thuộc thẩm quyền (lần chuyển thứ ' + lanMoi + '). Hệ thống tự tạo hồ sơ Xác định CQGQBT ' + newCode + ' tại ' + W.unitName(tgt.targetUnitId) + '.'
            : 'Không thụ lý - Không thuộc thẩm quyền. Chuyển hồ sơ cho ' + lbl + ' (hồ sơ mới ' + newCode + ', Loại hồ sơ ' + tgt.loaiYeuCau + ').')
        + ' Hồ sơ chuyển [' + rec.status + '].');
    W.upsertRecord(rec);
    var nr = W.getRecord(newCode);
    if (nr) {
        nr.ktlcLan = rule.applies ? lanMoi : 0;
        nr.ktlcNguonGoc = rule.applies ? rule.goc : '';
        if (!rule.applies && rule.quaXd) nr.ktlcQuaXd = true;
        nr.ktlcFrom = { code: rec.code, maVuViec: rec.maVuViec || '', unitId: unitId, mode: mode, lan: lanMoi, auto: auto, applies: rule.applies, reason: 'Không thuộc thẩm quyền (KTL_01)', content: transfer.note || '', at: at };
        ktlcInherit(nr, claim, rec);
        if (auto) (nr.history = nr.history || []).push({ at: at, userId: '', userName: 'Hệ thống', action: 'Tự tạo hồ sơ Xác định CQGQBT', note:'Hồ sơ ' + rec.code + ' của ' + W.unitName(unitId) + ' Không thụ lý - Không thuộc thẩm quyền lần thứ ' + lanMoi + '; hệ thống tự tạo hồ sơ Xác định CQGQBT.' });
        W.upsertRecord(nr);
    }
    if (claim) {
        claim.transferTo = Object.assign({}, rec.transferTo, { targetName: W.unitName(tgt.targetUnitId) });
        claim.transferRequest = rec.gqData.transferRequest;
        claim.status = 'Đã chuyển CQGQBT';
        if (!Array.isArray(claim.timeline)) claim.timeline = [];
        claim.timeline.push({ title: auto ? 'Chuyển xác định CQGQBT' : 'Đã chuyển CQGQBT', date: (typeof gqToday === 'function' ? gqToday() : at), desc: (auto ? 'Hệ thống tự tạo hồ sơ Xác định CQGQBT ' + newCode + ' tại ' : 'Chuyển hồ sơ cho ') + W.unitName(tgt.targetUnitId) + ' (lần chuyển thứ ' + lanMoi + ').', status: 'completed' });
    }
    return { ok: true, record: rec, newCode: newCode, auto: auto, targetUnitId: tgt.targetUnitId };
}
(function () {
    var W = ktlcW();
    if (!W || W.__ktlcApprove) return;
    W.__ktlcApprove = true;
    // Ký số: Lãnh đạo cấp cuối ký duyệt Thông báo Không thụ lý lý do KTL_01 -> chuyển hồ sơ theo lựa chọn đã trình
    var oa = W.approve;
    W.approve = function (code) {
        var before = null;
        try { before = W.getRecord(code); } catch (e) { before = null; }
        var a = before && before.approval;
        var t = a && a.kind === 'Không thụ lý' && a.signDoc && a.signDoc.transfer;
        var res = oa.apply(this, arguments);
        if (res && res.ok && t && t.mode && before.module === 'YCBT' && res.record && res.record.approval && res.record.approval.done && !res.record.transferTo) {
            try {
                var sd = res.record.approval.signDoc || {};
                var r = ktlcDoTransfer(code, { mode: t.mode, unitId: t.unitId, note: t.note, files: t.files }, { noticeFile: sd.signedFile || sd.file, attachments: sd.attachments || a.signDoc.attachments });
                if (r.ok) res.record = r.record;
            } catch (e) { console.warn('ktlc approve', e); }
        }
        return res;
    };
    // Lãnh đạo Từ chối (Không thụ lý) tại bước Cử người giải quyết bồi thường: ghi nhận số lần chuyển trên hồ sơ mới
    var orj = W.rejectCase;
    W.rejectCase = function (code, reasonCode, detail, transfer) {
        var claim = ktlcFindClaim(code);
        var rec0 = W.getRecord(code);
        var rule = rec0 ? ktlcRule(claim, rec0, ktlcRoot(rec0.rootUnitId)) : null;
        // Chặn lựa chọn ngoài quy tắc (gọi trực tiếp, dữ liệu cũ chỉ có targetUnitId được hiểu là Cơ quan giải quyết bồi thường khác)
        if (rule && rule.applies && reasonCode === 'KTL_01' && !(transfer && (transfer.mode || transfer.targetUnitId))) return { ok: false, transferError: true, message: 'Vui lòng chọn Chuyển hồ sơ cho.' };
        if (rule && reasonCode === 'KTL_01' && transfer && (transfer.mode || transfer.targetUnitId)) {
            var m0 = transfer.mode || 'CQ';
            if (rule.modes.indexOf(m0) < 0) return { ok: false, transferError: true, message: 'Chuyển hồ sơ cho chỉ được chọn: ' + rule.modes.map(function (m) { return ktlcModeLabel(m, rule); }).join(' hoặc ') + '.' };
        }
        var res = orj.apply(this, arguments);
        try {
            var t = res && res.ok && res.record ? res.record.transferTo : null;
            if (t && t.code && rule) {
                var lanMoi = (rule.applies ? rule.lan : 0) + 1;
                t.ktlcLan = lanMoi; t.ktlcAuto = rule.forced; t.ktlcApplies = rule.applies;
                if (rule.forced) W.addHistory(res.record, 'Chuyển xác định CQGQBT', 'Hệ thống tự tạo hồ sơ Xác định CQGQBT ' + t.code + ' tại ' + W.unitName(t.targetUnitId) + ' (lần chuyển thứ ' + lanMoi + ').');
                W.upsertRecord(res.record);
                var nr = W.getRecord(t.code);
                if (nr) {
                    nr.ktlcLan = rule.applies ? lanMoi : 0; nr.ktlcNguonGoc = rule.applies ? rule.goc : '';
                    nr.ktlcFrom = { code: code, maVuViec: res.record.maVuViec || '', unitId: ktlcRoot(res.record.rootUnitId), mode: t.mode, lan: lanMoi, auto: rule.forced, applies: rule.applies, reason: 'Không thuộc thẩm quyền (KTL_01)', content: t.content || '', at: t.at };
                    ktlcInherit(nr, claim, res.record);
                    W.upsertRecord(nr);
                }
            }
        } catch (e) { console.warn('ktlc rejectCase', e); }
        return res;
    };
})();
// Ký ngoài: ban hành trực tiếp -> chuyển hồ sơ ngay
(function () {
    var orig = window.ktlxIssueOffline;
    if (typeof orig !== 'function' || orig.__ktlc) return;
    var w = function () {
        var claim = typeof selectedKtlClaim !== 'undefined' ? selectedKtlClaim : null;
        var sel = document.getElementById('ktlReason');
        var isKtl01 = sel && sel.value === 'KTL_01';
        var t = isKtl01 && typeof tlktKtlTransferData === 'function' ? tlktKtlTransferData() : null;
        var file = typeof ktlOfflineFile !== 'undefined' && ktlOfflineFile ? ktlOfflineFile.name : '';
        var r = orig.apply(this, arguments);
        if (!claim || !t || !t.mode) return r;
        try {
            if (typeof gqEnsureRecord === 'function') gqEnsureRecord(claim);
            var W = ktlcW();
            var rec = W.getRecord(claim.code);
            if (rec) {
                ['ktlcLan', 'ktlcNguonGoc', 'ktlcQuaXd', 'xdCode'].forEach(function (k) { if (claim[k] !== undefined && rec[k] === undefined) rec[k] = claim[k]; });
                if (!rec.nguonHoSo && claim.nguonHoSo) rec.nguonHoSo = claim.nguonHoSo;
                rec.gqData = Object.assign({}, rec.gqData || {}, { ktlReasonCode: 'KTL_01', ktlReasonName: sel.options[sel.selectedIndex].text, ktlDetail: claim.ktlDetail || '', rejectType: 'Không thụ lý', rejectReason: claim.rejectReason || '', signedFile: file, signingMethod: 'offline' });
                W.upsertRecord(rec);
            }
            var res = ktlcDoTransfer(claim.code, { mode: t.mode, unitId: t.unitId, note: t.note, files: t.files }, { claim: claim, noticeFile: file, attachments: claim.ktlAttachments || [] });
            if (!res.ok) { if (typeof showToast === 'function') showToast(res.message, 'error'); return r; }
            if (typeof saveClaimsToLocal === 'function') saveClaimsToLocal();
            if (typeof renderClaimsTable === 'function') renderClaimsTable();
            if (res.auto && typeof showToast === 'function') showToast('Hệ thống đã tự tạo hồ sơ Xác định cơ quan giải quyết bồi thường ' + res.newCode + ' tại ' + W.unitName(res.targetUnitId) + '.', 'success');
        } catch (e) { console.warn('ktlc offline', e); }
        return r;
    };
    w.__ktlc = true;
    window.ktlxIssueOffline = w;
})();

// ---------- 4. Màn chi tiết: khối Thông tin chuyển CQGQBT - Chuyển cho, lần chuyển, hồ sơ Xác định CQGQBT tự tạo ----------
(function () {
    var orig = window.ktlvTransferHtml;
    if (typeof orig !== 'function' || orig.__ktlc) return;
    var w = function (claim, caseSt, W) {
        var h = orig.apply(this, arguments);
        if (!h || !claim) return h;
        W = W || ktlcW() || {};
        var t = claim.transferTo || {};
        var tr = claim.transferRequest || {};
        var mode = t.mode || tr.mode || '';
        if (!mode) return h;
        var unitId = t.targetUnitId || tr.targetUnitId || '';
        var val = mode === 'STP' && W.unitName && unitId ? W.unitName(unitId) : (KTLC_LABELS[mode] || mode);
        var src = W.getRecord ? W.getRecord(claim.code) : null;
        if (src && unitId && (mode === 'BTP' || mode === 'STP') && ktlcRoot(src.rootUnitId) === ktlcRoot(unitId)) val += KTLC_SELF_SUFFIX;
        var lbl = W.KTL_TRANSFER_LABELS ? W.KTL_TRANSFER_LABELS[mode] : '';
        if (lbl) h = h.replace('<span class="ktlv-l">Chuyển cơ quan tiếp nhận mới</span><span class="ktlv-v">' + ktlvE(lbl) + '</span>', '<span class="ktlv-l">Chuyển hồ sơ cho</span><span class="ktlv-v">' + ktlvE(val) + '</span>');
        var extra = '';
        if (t.ktlcLan) extra += ktlvField('Lần chuyển do không thuộc thẩm quyền', 'Lần thứ ' + t.ktlcLan);
        var loai = t.loaiYeuCau || tr.loaiYeuCau || '';
        if (t.code && W.REQUEST_TYPE_XD && loai === W.REQUEST_TYPE_XD) {
            var href = 'xac_dinh_co_quan_boi_thuong.html?detail=' + encodeURIComponent(t.code) + '&readonly=1';
            extra += '<div class="ktlv-f"><span class="ktlv-l">Hồ sơ Xác định CQGQBT' + (t.ktlcAuto ? ' (hệ thống tự tạo)' : '') + '</span><span class="ktlv-v"><a href="' + href + '" target="_blank" rel="noopener" id="ktlcXdLink">' + ktlvE(t.code) + '</a></span></div>';
        }
        if (!extra) return h;
        // Đặt sau Mã hồ sơ tại cơ quan tiếp nhận mới (trước Nội dung/Căn cứ chuyển)
        var j = h.indexOf('<div class="ktlv-f ktlv-full"><span class="ktlv-l">Nội dung/Căn cứ chuyển');
        if (j >= 0) return h.slice(0, j) + extra + h.slice(j);
        var i = h.lastIndexOf('</div></div>');
        return i < 0 ? h + extra : h.slice(0, i) + extra + h.slice(i);
    };
    w.__ktlc = true;
    window.ktlvTransferHtml = w;
})();

// ---------- 5. Dữ liệu mẫu: 07 trường hợp (BT-2026-961 .. 967) ----------
function ktlcSeedList() {
    if (typeof sxmBuild !== 'function' || typeof SXM_TH_C === 'undefined') return [];
    var base = function (o) {
        var c = sxmBuild(Object.assign({ stage: 'tiep-nhan', k: [o.kd || 2], th: SXM_TH_C, fieldGroup: 'hành chính' }, o));
        c.assignedOfficer = o.officer;
        c.ktlcSeed = KTLC_VERSION;
        Object.keys(o.extra || {}).forEach(function (k) { c[k] = o.extra[k]; });
        return c;
    };
    return [
        // 1. Đơn vị trung ương, lần 1 (Tiếp nhận mới): Bộ Tư pháp / CQGQBT khác
        base({ id: 'KTLC_TW1', code: 'BT-2026-961', who: 'p5', agency: 'Viện kiểm sát nhân dân tối cao', officer: 'Âu Thị Kim Oanh', hinhThuc: 'Trực tiếp',
            docBase: 'Quyết định hủy bỏ quyết định phê chuẩn lệnh tạm giam số 21/QĐ-VKSTC ngày 02/09/2026',
            hanhVi: 'Phê chuẩn lệnh tạm giam đối với người không thực hiện hành vi phạm tội.', nhanQua: 'Mất thu nhập trong thời gian bị tạm giam.',
            extra: { nguonHoSo: 'Tiếp nhận mới' } }),
        // 2. Đơn vị địa phương, lần 1 (Dịch vụ công): Sở Tư pháp cùng tỉnh / CQGQBT khác
        base({ id: 'KTLC_DP1', code: 'BT-2026-962', who: 'p10', agency: 'UBND quận Cầu Giấy, Thành phố Hà Nội', officer: 'Kiều Văn Nam', hinhThuc: 'Dịch vụ công',
            docBase: 'Quyết định hủy Quyết định cưỡng chế thu hồi đất số 115/QĐ-UBND ngày 20/08/2026',
            hanhVi: 'Cưỡng chế thu hồi đất không đúng đối tượng.', nhanQua: 'Thiệt hại tài sản trên đất bị phá dỡ.',
            extra: { nguonHoSo: 'Dịch vụ công' } }),
        // 3. Đơn vị thứ 2 (địa phương), hồ sơ đã chuyển 01 lần do KTL_01: bắt buộc Sở Tư pháp, tự tạo hồ sơ Xác định CQGQBT
        base({ id: 'KTLC_DP2', code: 'BT-2026-963', who: 'p6', agency: 'UBND quận Hoàn Kiếm, Thành phố Hà Nội', officer: 'Tạ Quang Vinh', hinhThuc: 'Trực tiếp', kd: 1,
            docBase: 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 32/QĐ-XPHC ngày 05/08/2026',
            hanhVi: 'Xử phạt vi phạm hành chính, tịch thu tang vật không đúng thẩm quyền.', nhanQua: 'Hàng hóa bị tịch thu hư hỏng.',
            extra: { nguonHoSo: 'Chuyển CQGQBT', ktlcLan: 1, ktlcNguonGoc: 'Tiếp nhận mới', transferFromCode: 'BT-2026-960',
                ktlcFrom: { code: 'BT-2026-960', unitId: 'CA-HM', mode: 'CQ', lan: 1, reason: 'Không thuộc thẩm quyền (KTL_01)' } } }),
        // 4. Hồ sơ đã qua Xác định CQGQBT: không áp dụng quy tắc (03 lựa chọn như trước)
        base({ id: 'KTLC_XD1', code: 'BT-2026-964', who: 'p7', agency: 'Tòa án nhân dân Thành phố Hà Nội', officer: 'Lại Thị Hương Giang', hinhThuc: 'Trực tiếp', kd: 1,
            docBase: 'Bản án hình sự phúc thẩm số 88/2026/HS-PT ngày 15/07/2026 tuyên không phạm tội',
            hanhVi: 'Xét xử sơ thẩm tuyên phạt tù đối với người không phạm tội.', nhanQua: 'Mất thu nhập, tổn thất tinh thần.',
            extra: { nguonHoSo: 'Xác định CQGQBT', xdCode: 'XD-2026-145' } }),
        // 5. Bộ Tư pháp là đơn vị Không thụ lý, lần 1: Bộ Tư pháp (bộ phận Xác định CQGQBT) / CQGQBT khác
        base({ id: 'KTLC_BTP1', code: 'BT-2026-965', who: 'p8', agency: 'Bộ Tư pháp', officer: 'Nguyễn Văn Cán Bộ', hinhThuc: 'Trực tiếp',
            docBase: 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 45/QĐ-XPHC ngày 12/08/2026',
            hanhVi: 'Xử phạt vi phạm hành chính trong lĩnh vực công chứng không đúng thẩm quyền.', nhanQua: 'Thiệt hại do tạm đình chỉ hoạt động văn phòng công chứng.',
            extra: { nguonHoSo: 'Tiếp nhận mới' } }),
        // 6. Đơn vị thứ 2 (trung ương), hồ sơ Dịch vụ công đã chuyển 01 lần do KTL_01 (Bộ Tài chính chuyển): bắt buộc Bộ Tư pháp
        base({ id: 'KTLC_TW2', code: 'BT-2026-966', who: 'p9', agency: 'Viện kiểm sát nhân dân tối cao', officer: 'Âu Thị Kim Oanh', hinhThuc: 'Dịch vụ công', kd: 1,
            docBase: 'Quyết định đình chỉ điều tra số 07/QĐ-VKSTC ngày 18/08/2026 do người bị tạm giữ không thực hiện hành vi phạm tội',
            hanhVi: 'Tạm giữ hình sự đối với người không thực hiện hành vi phạm tội.', nhanQua: 'Mất thu nhập trong thời gian bị tạm giữ.',
            extra: { nguonHoSo: 'Chuyển CQGQBT', ktlcLan: 1, ktlcNguonGoc: 'Dịch vụ công', transferFromCode: 'BT-2026-959',
                ktlcFrom: { code: 'BT-2026-959', unitId: 'BTC', mode: 'CQ', lan: 1, reason: 'Không thuộc thẩm quyền (KTL_01)' } } }),
        // 7. Đơn vị địa phương (Công an quận), lần 1 - Tiếp nhận qua dịch vụ bưu chính: Sở Tư pháp cùng tỉnh / CQGQBT khác
        base({ id: 'KTLC_DP3', code: 'BT-2026-967', who: 'p11', agency: 'Công an quận Hoàng Mai, Thành phố Hà Nội', officer: 'Bế Thị Lụa', hinhThuc: 'Qua dịch vụ bưu chính',
            docBase: 'Quyết định hủy bỏ Quyết định tạm giữ phương tiện số 19/QĐ-TGPT ngày 10/08/2026',
            hanhVi: 'Tạm giữ phương tiện giao thông quá thời hạn luật định.', nhanQua: 'Thiệt hại do không khai thác được phương tiện.',
            extra: { nguonHoSo: 'Tiếp nhận mới' } })
    ];
}
function ktlcSeedClaims() {
    if (typeof claimsList === 'undefined' || !Array.isArray(claimsList)) return 0;
    var n = 0;
    ktlcSeedList().forEach(function (c) {
        var i = claimsList.findIndex(function (x) { return x && (x.id === c.id || x.code === c.code); });
        if (i >= 0) {
            var old = claimsList[i];
            // Merge theo mã: chỉ thay bản mẫu của phiên bản cũ còn ở trạng thái ban đầu
            if (old.ktlcSeed && old.ktlcSeed !== KTLC_VERSION && canonicalClaimStatus(old.status) === 'Chờ tiếp nhận') { c.maVuViec = old.maVuViec || c.maVuViec; claimsList[i] = c; n++; }
            return;
        }
        claimsList.push(c);
        n++;
    });
    return n;
}
(function () {
    if (typeof window.sdxSeedClaims !== 'function' || window.sdxSeedClaims.__ktlc) return;
    var orig = window.sdxSeedClaims;
    var w = function () {
        var r = orig.apply(this, arguments);
        try { ktlcSeedClaims(); } catch (e) { console.warn('ktlc seed', e); }
        return r;
    };
    w.__ktlc = true;
    window.sdxSeedClaims = w;
})();
// Hồ sơ luồng của các hồ sơ mẫu (cán bộ chủ trì = cán bộ mẫu của đơn vị): Mã hồ sơ cấp mới khi chuyển không trùng mã hồ sơ mẫu
function ktlcSeedRecords() {
    var W = ktlcW();
    if (!W || typeof gqEnsureRecord !== 'function' || typeof claimsList === 'undefined') return;
    ktlcSeedList().forEach(function (s) {
        try {
            var c = claimsList.find(function (x) { return x && x.code === s.code; });
            if (!c || W.getRecord(c.code)) return;
            var rec = gqEnsureRecord(c);
            if (!rec) return;
            var u = W.USERS.find(function (x) { return x.name === c.assignedOfficer; });
            if (u) { rec.chuTri = u.id; rec.createdBy = u.id; }
            ['ktlcLan', 'ktlcNguonGoc', 'ktlcQuaXd', 'xdCode', 'ktlcFrom', 'transferFromCode'].forEach(function (k) { if (c[k] !== undefined) rec[k] = c[k]; });
            rec.nguonHoSo = c.nguonHoSo || rec.nguonHoSo;
            W.upsertRecord(rec);
        } catch (e) { console.warn('ktlc seed rec', e); }
    });
}
if (document.getElementById('claimsTableBody') || document.getElementById('ktlReason')) {
    if (document.readyState === 'complete') setTimeout(ktlcSeedRecords, 0); else window.addEventListener('load', function () { setTimeout(ktlcSeedRecords, 0); });
}
// Chuẩn hóa dữ liệu cũ: hồ sơ Xác định CQGQBT tạo khi chuyển (Không thụ lý KTL_01 / Từ chối tại Cử người) trước đây cấp mã BT-
// -> cấp lại Mã hồ sơ XD- (giữ Mã vụ việc), cập nhật liên kết tại hồ sơ chuyển và vụ việc trên danh sách
function ktlcMigrateXdCodes() {
    var W = ktlcW();
    if (!W || typeof W.loadRecords !== 'function') return 0;
    var n = 0;
    W.loadRecords().filter(function (r) { return r && W.isXdRec(r) && /^BT-/.test(r.code || '') && r.transferFromCode; }).forEach(function (r) {
        var oldCode = r.code, newCode = W.nextCode('XD');
        var list = W.loadRecords();
        var i = list.findIndex(function (x) { return x.code === oldCode; });
        if (i < 0) return;
        list[i].code = newCode;
        list[i].ktlcOldCode = oldCode;
        list.forEach(function (x) { if (x.transferTo && x.transferTo.code === oldCode) x.transferTo.code = newCode; });
        W.saveRecords(list);
        if (W.unlinkVuViec) W.unlinkVuViec(oldCode);
        if (r.maVuViec && W.linkVuViec) W.linkVuViec(newCode, r.maVuViec);
        try { if (typeof claimsList !== 'undefined' && Array.isArray(claimsList)) claimsList.forEach(function (c) { if (c && c.transferTo && c.transferTo.code === oldCode) { c.transferTo.code = newCode; n++; } }); } catch (e) { /* mockup */ }
        n++;
    });
    if (n && typeof saveClaimsToLocal === 'function') { try { saveClaimsToLocal(); } catch (e) { /* mockup */ } }
    return n;
}
// Chuẩn hóa nhãn Lịch sử xử lý cũ của hồ sơ Xác định CQGQBT: "Cập nhật kết quả (xác định CQGQBT)" -> "Tham mưu kết quả xác định CQGQBT"
function ktlcMigrateXdLabels() {
    var W = ktlcW();
    if (!W || typeof W.loadRecords !== 'function') return 0;
    var list = W.loadRecords(), n = 0;
    list.forEach(function (r) {
        if (!r || !W.isXdRec(r) || !Array.isArray(r.history)) return;
        r.history.forEach(function (h) { if (h && (h.action === 'Cập nhật kết quả xác định CQGQBT' || h.action === 'Cập nhật kết quả')) { h.action = 'Tham mưu kết quả xác định CQGQBT'; n++; } });
    });
    if (n) W.saveRecords(list);
    return n;
}
try { ktlcMigrateXdCodes(); ktlcMigrateXdLabels(); } catch (e) { console.warn('ktlc migrate', e); }

// ---------- 6. Màn Xác định CQGQBT: khối Thông tin hồ sơ chuyển đến (hồ sơ tạo từ Không thụ lý - Không thuộc thẩm quyền) ----------
function ktlcXdFromHtml(item) {
    var W = ktlcW();
    var f = item && item.ktlcFrom;
    if (!W || !f) return '';
    var row = function (l, v) { return '<div style="min-width:0;"><div style="color:#64748b; font-weight:600; font-size:12px;">' + ktlcE(l) + '</div><div style="color:#0f172a;">' + ktlcE(v || '-') + '</div></div>'; };
    var gq = 'quan_ly_boi_thuong.html?id=' +encodeURIComponent(f.code) + '&readonly=1';
    return '<div id="ktlcXdFrom" class="detail-card" style="margin-bottom:16px; border-left:4px solid #2563eb; padding:14px 18px; font-size:13px;">'
        + '<div style="font-weight:700; text-transform:uppercase; margin-bottom:10px;"><i class="fa-solid fa-right-to-bracket"></i> Thông tin hồ sơ chuyển đến</div>'
        + '<div style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px 24px;">'
        + row('Nguồn hồ sơ', (f.auto ? 'Hệ thống tự tạo từ ' : 'Chuyển từ ') + 'Không thụ lý - Không thuộc thẩm quyền')
        + '<div style="min-width:0;"><div style="color:#64748b; font-weight:600; font-size:12px;">Mã hồ sơ chuyển</div><div><a href="' + gq + '" target="_blank" rel="noopener">' + ktlcE(f.code) + '</a></div></div>'
        + row('Cơ quan chuyển', W.unitName(f.unitId))
        + row('Lần chuyển do không thuộc thẩm quyền', f.lan ? 'Lần thứ ' + f.lan : '')
        + row('Thời điểm chuyển', f.at)
        + row('Mã vụ việc', item.maVuViec || f.maVuViec)
        + '<div style="grid-column:1/-1;">' + row('Nội dung/Căn cứ chuyển', f.content) + '</div>'
        + '</div></div>';
}
(function () {
    if (typeof window.showDetailScreen !== 'function' || window.showDetailScreen.__ktlc || !document.getElementById('dtNoticeBlock')) return;
    var orig = window.showDetailScreen;
    var w = function (id) {
        var r = orig.apply(this, arguments);
        try {
            var old = document.getElementById('ktlcXdFrom');
            if (old) old.remove();
            var item = typeof requestList !== 'undefined' ? requestList.find(function (x) { return x.id === id; }) : null;
            var html = ktlcXdFromHtml(item);
            var anchor = document.getElementById('dtNoticeBlock');
            if (html && anchor) anchor.insertAdjacentHTML('afterend', html);
        } catch (e) { console.warn('ktlc xd', e); }
        return r;
    };
    w.__ktlc = true;
    window.showDetailScreen = w;
})();
