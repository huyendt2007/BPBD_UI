/*
 * [nbth] Tiếp nhận hồ sơ (tiep_nhan_ycbt.html) - add-on
 * 1. Bảng tài liệu đính kèm: dòng mặc định "Văn bản yêu cầu bồi thường" (nhãn Bắt buộc) khi Thêm mới / Cập nhật;
 *    không xóa được dòng (chỉ xóa file); bắt buộc có file khi Lưu. Hồ sơ cũ / DVC có "Đơn/Văn bản yêu cầu bồi thường" -> điền sẵn vào dòng này.
 * 2. Tư cách TCNYC_03: khối Tổ chức bị thiệt hại đã chấm dứt tồn tại bổ sung địa bàn (Quốc gia, Tỉnh/Thành phố, Phường/Xã, Địa chỉ chi tiết),
 *    lưu claim.nbthOrgAddr = { country, city, ward, address }.
 * 3. Khối Người bị thiệt hại: Loại Cá nhân/Tổ chức, bộ trường như khối Người yêu cầu (+ Ngày sinh với Cá nhân);
 *    Tiếp nhận không bắt buộc trường nào (chỉ kiểm tra định dạng Số điện thoại/Email khi đã nhập). Dữ liệu cũ không có loại -> Cá nhân.
 * 4. Dữ liệu mẫu (merge theo Mã, NBTH_SEED_VERSION).
 * Dùng biến/hàm của trang: docRows, isFormReadOnly, wardsByCity, getValue, setValue, setSelectDisplay, stripAdministrativeCode,
 * normalizeCityOption, isValidVnPhone, normalizeVnPhone, isDamagedRole, escapeHtml, escapeAttr, claimsList, saveClaims, syncWorkflowRecords.
 */
(function () {
    'use strict';
    var FIXED_NAME = 'Văn bản yêu cầu bồi thường';
    var FIXED_RE = /^\s*(văn bản|đơn)\s+yêu cầu\s+(giải quyết\s+)?bồi thường\s*$/i;
    var VN = 'Việt Nam';
    var T_CA_NHAN = 'Cá nhân', T_TO_CHUC = 'Tổ chức';
    var NEW_IDS = ['nbthTypeCaNhan', 'nbthTypeToChuc', 'nbthPOrgCode', 'nbthPhone', 'nbthEmail', 'nbthCountry',
        'nbthOrgCountry', 'nbthOrgCity', 'nbthOrgWard', 'nbthOrgAddress'];
    var NBTH_SEED_VERSION = '20261027nbth2';

    function el(id) { return document.getElementById(id); }
    function gv(id) { var e = el(id); return e ? String(e.value || '').trim() : ''; }
    function sv(id, v) { var e = el(id); if (e) e.value = v == null ? '' : v; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function ro() { try { return !!isFormReadOnly; } catch (e) { return false; } }

    // ---------- CSS ----------
    (function css() {
        var s = document.createElement('style');
        s.textContent = '.nbth-req-badge{display:inline-block;margin-left:8px;padding:1px 8px;border-radius:10px;font-size:11px;font-weight:600;background:#fee2e2;color:#b91c1c;vertical-align:middle;}'
            + '.nbth-fixed-file{display:inline-block;border:1px solid transparent;border-radius:4px;padding:2px;}'
            + '.nbth-fixed-file.is-invalid{border-color:#dc2626;}'
            + '#docsTableBody .nbth-fixed-err{display:none;color:#dc2626;font-size:12px;margin-top:4px;}';
        document.head.appendChild(s);
    })();

    // =====================================================================
    // 1. Bảng tài liệu đính kèm - dòng mặc định Văn bản yêu cầu bồi thường
    // =====================================================================
    function isFixed(d) { return !!d && (d.fixed || FIXED_RE.test(d.name || '')); }
    function normalizeDocRows() {
        var rows = Array.isArray(docRows) ? docRows.slice() : [];
        var idx = rows.findIndex(isFixed);
        if (ro()) {
            // Xem chi tiết: dòng Văn bản yêu cầu bồi thường (nếu có) đứng đầu
            if (idx >= 0) { var r = rows.splice(idx, 1)[0]; rows.unshift({ name: FIXED_NAME, file: r.file || '', fixed: true }); }
            docRows = rows;
            return;
        }
        var fixed = idx >= 0 ? rows.splice(idx, 1)[0] : { name: FIXED_NAME, file: '' };
        docRows = [{ name: FIXED_NAME, file: fixed.file || '', fixed: true }]
            .concat(rows.filter(function (d) { return String(d.name || '').trim() || String(d.file || '').trim(); }));
    }

    window.renderDocRows = function () {
        var tbody = el('docsTableBody');
        if (!tbody) return;
        var readOnly = ro();
        if (readOnly && (!docRows || docRows.length === 0)) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted); font-style:italic; padding:16px;">' + (typeof EMPTY_TEXT !== 'undefined' ? EMPTY_TEXT : 'Không có dữ liệu') + '</td></tr>';
            return;
        }
        tbody.innerHTML = docRows.map(function (doc, idx) {
            var fixed = !!doc.fixed;
            var nameCell = fixed
                ? '<span style="font-weight:500; color:#1e293b;">' + esc(FIXED_NAME) + '</span>' + (readOnly ? '' : '<span class="nbth-req-badge">Bắt buộc</span>')
                : (readOnly
                    ? '<span style="font-weight:500; color:#1e293b;">' + esc(doc.name || '--') + '</span>'
                    : '<input id="docName_' + idx + '" class="form-control" value="' + esc(doc.name) + '" placeholder="Nhập tên tài liệu, văn bản" oninput="updateDocName(' + idx + ', this.value)">');
            var fileCell = doc.file
                ? '<span class="file-name" title="' + esc(doc.file) + '"><i class="fa-solid fa-file-pdf" style="color:#ef4444; margin-right:6px;"></i>' + esc(doc.file) + '</span>'
                : (readOnly
                    ? '<span style="color:var(--text-muted); font-style:italic;">--</span>'
                    : '<span class="' + (fixed ? 'nbth-fixed-file' : '') + '"' + (fixed ? ' id="nbthFixedDocBox"' : '') + '><button type="button" class="tlkt-btn-pri"' + (fixed ? ' id="nbthFixedDocBtn"' : '') + ' onclick="document.getElementById(\'docFile_' + idx + '\').click()"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button></span>'
                    + (fixed ? '<div class="error-message nbth-fixed-err" id="nbthFixedDocErr">Đây là trường bắt buộc</div>' : ''));
            var delBtn = fixed
                ? '<button type="button" class="tlkt-ib tlkt-ib-del' + (doc.file ? '' : ' is-disabled') + '" data-admin-icon-normalized="1" title="Xóa file" aria-label="Xóa file" onclick="deleteDocRow(' + idx + ')"><i class="fa-solid fa-trash"></i></button>'
                : '<button type="button" class="tlkt-ib tlkt-ib-del" data-admin-icon-normalized="1" title="Xóa" aria-label="Xóa" onclick="deleteDocRow(' + idx + ')"><i class="fa-solid fa-trash"></i></button>';
            var acts = '<span class="tlkt-acts"><button type="button" class="tlkt-ib' + (doc.file ? '' : ' is-disabled') + '" data-admin-icon-normalized="1" title="Xem file" aria-label="Xem file" onclick="viewDocFile(' + idx + ')"><i class="fa-solid fa-eye"></i></button>'
                + (readOnly
                    ? '<button type="button" class="tlkt-ib' + (doc.file ? '' : ' is-disabled') + '" data-admin-icon-normalized="1" title="Tải file" aria-label="Tải file" onclick="downloadDocFile(' + idx + ')"><i class="fa-solid fa-download"></i></button>'
                    : delBtn) + '</span>';
            return '<tr' + (fixed ? ' data-nbth-fixed="1"' : '') + '><td style="text-align:center;">' + (idx + 1) + '</td><td>' + nameCell + '</td><td>' + fileCell
                + '<input id="docFile_' + idx + '" type="file" style="display:none;" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onchange="uploadDocFile(' + idx + ', this)"></td><td style="text-align:center;">' + acts + '</td></tr>';
        }).join('');
    };

    // Dòng mặc định: chỉ xóa file; dòng khác: xóa dòng
    window.deleteDocRow = function (idx) {
        var d = docRows[idx];
        if (!d) return;
        if (d.fixed) d.file = ''; else docRows.splice(idx, 1);
        renderDocRows();
    };

    // [E3] Định dạng theo quy tắc chung: Email [BR-VAL-002] -> MSG-ERR-VAL-002; Số điện thoại [BR-VAL-003] -> MSG-ERR-VAL-003
    //      Quốc gia Việt Nam: 10 chữ số, đầu 03/05/07/08/09; quốc gia khác: 8-15 ký tự, cho phép dấu + ở đầu
    var MSG_EMAIL = 'Địa chỉ email không đúng định dạng (ví dụ: abc@domain.com)';
    var MSG_PHONE = 'Số điện thoại không hợp lệ (độ dài 8-15 ký tự, bắt đầu bằng 0 hoặc +)';
    function emailOk(v) { return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(String(v || '').trim()); }
    function phoneOk(v, country) {
        var s = String(v || '').replace(/\s+/g, '');
        return (country || VN) === VN ? /^0\d{9,10}$/.test(s) : /^\+?[1-9]\d{7,14}$/.test(s);
    }
    window.isValidVnPhone = function (v) { return phoneOk(v, gv('formCountry')); };
    var origSave = window.saveReceptionInfo;
    if (typeof origSave === 'function') {
        window.saveReceptionInfo = function () {
            var r = origSave.apply(this, arguments);
            var p = el('formPhone');
            if (p && p.classList.contains('is-invalid') && gv('formPhone') && el('formPhoneError')) el('formPhoneError').textContent = MSG_PHONE;
            return r;
        };
    }

    // Kiểm tra khi Lưu (gọi từ saveReceptionInfo): dòng mặc định thiếu file; Email người yêu cầu, Số điện thoại / Email người bị thiệt hại sai định dạng
    window.nbthValidateReception = function () {
        var first = null;
        var nycEmail = gv('formEmail');
        if (nycEmail && !emailOk(nycEmail)) { el('formEmail').classList.add('is-invalid'); el('formEmailError').style.display = 'block'; first = el('formEmail'); }
        var block = el('nbthBlock');
        if (block && block.style.display !== 'none') {
            var phone = gv('nbthPhone');
            if (phone && !phoneOk(phone, gv('nbthCountry'))) { el('nbthPhone').classList.add('is-invalid'); el('nbthPhoneError').style.display = 'block'; first = first || el('nbthPhone'); }
            var email = gv('nbthEmail');
            if (email && !emailOk(email)) { el('nbthEmail').classList.add('is-invalid'); el('nbthEmailError').style.display = 'block'; first = first || el('nbthEmail'); }
        }
        var f = docRows && docRows[0];
        if (f && f.fixed && !String(f.file || '').trim()) {
            var box = el('nbthFixedDocBox'), err = el('nbthFixedDocErr');
            if (box) box.classList.add('is-invalid');
            if (err) err.style.display = 'block';
            first = first || el('nbthFixedDocBtn');
        }
        return first;
    };

    // =====================================================================
    // 2-3. Người bị thiệt hại (Cá nhân/Tổ chức) & địa bàn tổ chức đã chấm dứt tồn tại
    // =====================================================================
    function getType() { var r = document.querySelector('input[name="nbthType"]:checked'); return r && r.value === T_TO_CHUC ? T_TO_CHUC : T_CA_NHAN; }
    function setType(t) { var org = t === T_TO_CHUC; if (el('nbthTypeToChuc')) el('nbthTypeToChuc').checked = org; if (el('nbthTypeCaNhan')) el('nbthTypeCaNhan').checked = !org; }
    window.nbthToggleType = function () {
        var org = getType() === T_TO_CHUC;
        var lb = el('nbthNameLabel'); if (lb) lb.textContent = org ? 'Tên tổ chức' : 'Họ và tên';
        var nm = el('nbthName'); if (nm) nm.placeholder = org ? 'Nhập tên tổ chức...' : 'Nhập họ và tên...';
        document.querySelectorAll('#nbthBlock .nbth-ca-nhan').forEach(function (e) { e.style.display = org ? 'none' : ''; });
        document.querySelectorAll('#nbthBlock .nbth-to-chuc').forEach(function (e) { e.style.display = org ? '' : 'none'; });
    };

    // [E2] Ràng buộc Loại người bị thiệt hại theo Tư cách người yêu cầu (DM_26):
    //   NGUOI_THUA_KE (TCNYC_02), NGUOI_DAI_DIEN_THUA_KE (TCNYC_06) -> khóa Cá nhân; NGUOI_DAI_DIEN (TCNYC_04), NGUOI_DUOC_UY_QUYEN (TCNYC_05) -> chọn Cá nhân/Tổ chức
    //   Bị khóa mà đang là Tổ chức -> chuyển Cá nhân, xóa trường của Tổ chức
    var NBTH_LOCK_CA_NHAN = ['TCNYC_02', 'TCNYC_06'];
    window.nbthApplyRoleConstraint = function () {
        var role = getValue('formRequesterRole') || '';
        var locked = NBTH_LOCK_CA_NHAN.indexOf(BTNN_WF.nycRoleCode(role)) >= 0;
        if (locked && getType() === T_TO_CHUC) { setType(T_CA_NHAN); sv('nbthPOrgCode', ''); }
        ['nbthTypeCaNhan', 'nbthTypeToChuc'].forEach(function (i) { var e = el(i); if (e) { e.disabled = ro() || locked; e.title = locked ? 'Tư cách người yêu cầu này chỉ áp dụng người bị thiệt hại là Cá nhân' : ''; } });
        nbthToggleType();
    };
    var origToggleBlock = window.toggleNbthBlock;
    if (typeof origToggleBlock === 'function') {
        window.toggleNbthBlock = function () { var r = origToggleBlock.apply(this, arguments); nbthApplyRoleConstraint(); return r; };
    }

    // prefix 'nbth' (người bị thiệt hại) | 'nbthOrg' (tổ chức đã chấm dứt tồn tại); Danh mục địa bàn như khối Người yêu cầu
    function isVn(prefix) { return (gv(prefix + 'Country') || VN) === VN; }
    window.nbthUpdateWardOptions = function (prefix, selectedWard) {
        var city = el(prefix + 'City'), ward = el(prefix + 'Ward'), list = el(prefix + 'WardOptions');
        if (!city || !ward || !list || !isVn(prefix)) return;
        var wards = wardsByCity[stripAdministrativeCode(city.value)] || [];
        list.innerHTML = wards.map(function (w) { return '<option value="' + esc(w) + '"></option>'; }).join('');
        ward.disabled = ro() || wards.length === 0;
        ward.placeholder = wards.length ? 'Gõ Mã hoặc Tên Phường/Xã...' : 'Vui lòng chọn Tỉnh/Thành phố trước';
        if (selectedWard) ward.value = selectedWard;
        else if (wards.indexOf(ward.value) < 0) ward.value = '';
    };
    function applyCountry(prefix, selectedWard) {
        var city = el(prefix + 'City'), ward = el(prefix + 'Ward');
        if (!city || !ward) return;
        if (isVn(prefix)) {
            city.setAttribute('list', 'cityOptions');
            ward.setAttribute('list', prefix + 'WardOptions');
            city.placeholder = 'Gõ Mã hoặc Tên Tỉnh/Thành phố...';
            nbthUpdateWardOptions(prefix, selectedWard);
        } else {
            city.removeAttribute('list');
            ward.removeAttribute('list');
            city.placeholder = 'Nhập Tỉnh/Thành phố...';
            ward.placeholder = 'Nhập Phường/Xã...';
            ward.disabled = ro();
            if (selectedWard) ward.value = selectedWard;
        }
    }
    window.nbthOnCountryChange = function (prefix) { sv(prefix + 'City', ''); sv(prefix + 'Ward', ''); applyCountry(prefix); };

    function fillCountrySelects() {
        var opts = (BTNN_WF.getCountries() || [VN]).map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + '</option>'; }).join('');
        ['nbthCountry', 'nbthOrgCountry'].forEach(function (id) { var s = el(id); if (s && !s.options.length) { s.innerHTML = opts; s.value = VN; } });
    }
    function setCountry(id, v) {
        var val = v || VN;
        if (ro()) setSelectDisplay(id, val); else { sv(id, val); if (el(id) && el(id).value !== val) setSelectDisplay(id, val); }
    }
    function fillAddr(prefix, a) {
        a = a || {};
        setCountry(prefix + 'Country', a.country);
        var city = a.city || '';
        sv(prefix + 'City', city && isVn(prefix) ? normalizeCityOption(city) : city);
        sv(prefix + 'Ward', a.ward || '');
        applyCountry(prefix, a.ward || '');
        sv(prefix + 'Address', a.address || '');
        sv(prefix + 'AddressFull', BTNN_WF.joinAddress({ address: a.address, ward: a.ward, city: a.city }) || (ro() ? '-' : ''));
    }
    function readAddr(prefix) {
        return { country: gv(prefix + 'Country') || VN, city: stripAdministrativeCode(gv(prefix + 'City')), ward: gv(prefix + 'Ward'), address: gv(prefix + 'Address') };
    }

    window.readNbth = function () {
        var role = getValue('formRequesterRole') || 'Người bị thiệt hại';
        if (isDamagedRole(role) || BTNN_WF.isNbthOrgRole(role)) return null;
        var org = getType() === T_TO_CHUC;
        var a = readAddr('nbth');
        return {
            type: org ? T_TO_CHUC : T_CA_NHAN,
            name: gv('nbthName'),
            dob: org ? '' : gv('nbthDob'),
            docType: org ? '' : gv('nbthDocType'),
            docNo: org ? '' : gv('nbthDocNo'),
            orgCode: org ? gv('nbthPOrgCode') : '',
            phone: normalizeVnPhone(gv('nbthPhone')),
            email: gv('nbthEmail'),
            country: a.country, city: a.city, ward: a.ward, address: a.address
        };
    };

    window.fillNbth = function (nb) {
        nb = nb || {};
        setType(nb.type === T_TO_CHUC ? T_TO_CHUC : T_CA_NHAN);
        sv('nbthName', nb.name || '');
        sv('nbthDob', nb.dob || '');
        sv('nbthDocType', nb.docType || '');
        sv('nbthDocNo', nb.docNo || '');
        sv('nbthPOrgCode', nb.orgCode || '');
        sv('nbthPhone', nb.phone || '');
        sv('nbthEmail', nb.email || '');
        fillAddr('nbth', nb);
        nbthToggleType();
    };

    // Thông tin người yêu cầu + địa bàn tổ chức bị thiệt hại đã chấm dứt tồn tại
    var origReadNyc = window.readNycFields;
    window.readNycFields = function () {
        var r = origReadNyc.apply(this, arguments);
        r.nbthOrgAddr = BTNN_WF.isNbthOrgRole(getValue('formRequesterRole')) ? readAddr('nbthOrg') : null;
        return r;
    };
    var origBuildWf = window.buildWorkflowData;
    if (typeof origBuildWf === 'function') {
        window.buildWorkflowData = function (claim) {
            var d = origBuildWf.apply(this, arguments);
            if (d && claim) d.nbthOrgAddr = claim.nbthOrgAddr || null;
            return d;
        };
    }
    var origDetail = window.detailFromRecord;
    if (typeof origDetail === 'function') {
        window.detailFromRecord = function (rec) {
            var d = origDetail.apply(this, arguments);
            if (d && rec && d.fromWorkflow) d.nbthOrgAddr = rec.nbthOrgAddr || null;
            return d;
        };
    }

    var origOpen = window.openReceptionForm;
    window.openReceptionForm = function (id, isReadOnly) {
        origOpen.apply(this, arguments);
        if (el('formView').style.display === 'none') return;
        var claim = id ? getDetailItem(id) : null;
        var readOnly = ro();
        NEW_IDS.forEach(function (i) { var e = el(i); if (e) e.disabled = readOnly; });
        // Người bị thiệt hại: dữ liệu cũ không có Loại -> Cá nhân
        fillNbth(claim ? claim.nbth : null);
        nbthApplyRoleConstraint();
        if (readOnly && claim && claim.nbth && claim.nbth.docType) setSelectDisplay('nbthDocType', BTNN_WF.normalizePersonalDocType(claim.nbth.docType));
        fillAddr('nbthOrg', claim ? claim.nbthOrgAddr : null);
        if (readOnly && claim) ['nbthPOrgCode', 'nbthPhone', 'nbthEmail', 'nbthDocNo', 'nbthDob', 'nbthName', 'nbthAddressFull', 'nbthOrgAddressFull', 'nbthOrgName', 'nbthOrgCode'].forEach(function (i) { if (!gv(i)) sv(i, '-'); });
        normalizeDocRows();
        renderDocRows();
    };
    var origClose = window.closeReceptionForm;
    window.closeReceptionForm = function () {
        NEW_IDS.forEach(function (i) { var e = el(i); if (e) e.disabled = false; });
        return origClose.apply(this, arguments);
    };

    // =====================================================================
    // 4. Dữ liệu mẫu: tổ chức kế thừa có địa bàn; người bị thiệt hại là tổ chức; người bị thiệt hại thiếu thông tin
    // =====================================================================
    function seeds() {
        var me = CURRENT_OFFICER, unit = CURRENT_ROOT_UNIT;
        var base = function (o) {
            return Object.assign({
                requestType: REQUEST_TYPE_YCBT, requestKind: 'money', nopKenh: 'Trực tiếp', fieldGroup: 'hành chính',
                date: '27/10/2026', receivedAt: '27/10/2026 08:30', receivedBy: me, rootUnitId: unit, status: 'Chờ phân công',
                nguonHoSo: SOURCES.TIEP_NHAN, nycCountry: VN, vanBanCanCu: [], files: [],
                timeline: [{ title: 'Tiếp nhận hồ sơ', date: '27/10/2026', desc: 'Đã tiếp nhận thông tin ban đầu. Trạng thái: Chờ phân công.', status: 'completed' }]
            }, o);
        };
        return [
            base({
                id: 'TN_NBTH1', code: 'VVBT-2026-081', maVuViec: 'VVBT-2026-081',
                nyc: 'Công ty Cổ phần Xây dựng Hồng Hà', nycName: 'Công ty Cổ phần Xây dựng Hồng Hà', nycType: T_TO_CHUC, nycOrgCode: '0102998877',
                nycRole: 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại', nycPhone: '0904889999',
                nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00007 - Phường Cầu Giấy', nycAddressDetail: 'Tầng 5, số 88 Láng Hạ', address: 'Tầng 5, số 88 Láng Hạ',
                nbth: null, nbthOrgName: 'Công ty TNHH Xây dựng Hồng Phát', nbthOrgCode: '0100554433',
                nbthOrgAddr: { country: VN, city: 'Thành phố Hà Nội', ward: '00001 - Phường Ba Đình', address: 'Số 21 Điện Biên Phủ' },
                hanhVi: 'Kê biên, xử lý tài sản của tổ chức bị thiệt hại không đúng quy định.',
                receptionDocs: [{ name: FIXED_NAME, file: 'Van_ban_yeu_cau_boi_thuong_Hong_Ha.pdf' }]
            }),
            base({
                id: 'TN_NBTH2', code: 'VVBT-2026-082', maVuViec: 'VVBT-2026-082',
                nyc: 'Lê Minh Tuấn', nycName: 'Lê Minh Tuấn', nycType: T_CA_NHAN, nycDocType: 'CMND/CCCD/Chứng minh quân đội', nycDocNo: '001085006789',
                nycRole: 'Cá nhân, pháp nhân được ủy quyền hợp pháp', nycPhone: '0912556677', nycEmail: 'tuan.le@gmail.com',
                nycTinhThanh: 'Thành phố Hồ Chí Minh', nycPhuongXa: '26734 - Phường Bến Thành', nycAddressDetail: 'Số 9 Lê Lợi', address: 'Số 9 Lê Lợi',
                nbth: { type: T_TO_CHUC, name: 'Công ty TNHH Thương mại Phúc An', orgCode: '0316677889', phone: '0909112233', email: 'lienhe@phucan.vn',
                    country: VN, city: 'Thành phố Hồ Chí Minh', ward: '26737 - Phường Sài Gòn', address: 'Số 45 Nguyễn Huệ' },
                hanhVi: 'Quyết định đình chỉ hoạt động kinh doanh trái pháp luật.',
                receptionDocs: [{ name: FIXED_NAME, file: 'Van_ban_yeu_cau_boi_thuong_Phuc_An.pdf' }, { name: 'Giấy ủy quyền', file: 'Giay_uy_quyen_Phuc_An.pdf' }]
            }),
            base({
                id: 'TN_NBTH3', code: 'VVBT-2026-083', maVuViec: 'VVBT-2026-083',
                nyc: 'Trần Thị Hạnh', nycName: 'Trần Thị Hạnh', nycType: T_CA_NHAN, nycDocType: 'CMND/CCCD/Chứng minh quân đội', nycDocNo: '001190004455',
                nycRole: 'Người thừa kế của người bị thiệt hại', nycPhone: '0988123456',
                nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00010 - Phường Thanh Xuân', nycAddressDetail: 'Số 3 Nguyễn Trãi', address: 'Số 3 Nguyễn Trãi',
                // Người bị thiệt hại chỉ có Họ và tên (Tiếp nhận không bắt buộc) -> bị chặn khi trình Thông báo thụ lý
                nbth: { type: T_CA_NHAN, name: 'Trần Văn Lộc', dob: '', docType: '', docNo: '', phone: '', email: '', country: VN, city: '', ward: '', address: '' },
                hanhVi: 'Tạm giữ trái pháp luật.',
                receptionDocs: [{ name: FIXED_NAME, file: 'Van_ban_yeu_cau_boi_thuong_Tran_Thi_Hanh.pdf' }]
            })
        ];
    }
    var origBuildSeed = window.buildSeedClaims;
    if (typeof origBuildSeed === 'function') {
        window.buildSeedClaims = function () { return origBuildSeed.apply(this, arguments).concat(seeds()); };
    }
    document.addEventListener('DOMContentLoaded', function () {
        fillCountrySelects();
        [['formEmailError', MSG_EMAIL], ['nbthEmailError', MSG_EMAIL], ['nbthPhoneError', MSG_PHONE]].forEach(function (x) { if (el(x[0])) el(x[0]).textContent = x[1]; });
        try {
            if (localStorage.getItem('nbthSeedVersion') === NBTH_SEED_VERSION) return;
            seeds().forEach(function (s) {
                var cur = claimsList.find(function (c) { return c.code === s.code; });
                if (cur) Object.assign(cur, { nbth: s.nbth, nbthOrgName: s.nbthOrgName || '', nbthOrgCode: s.nbthOrgCode || '', nbthOrgAddr: s.nbthOrgAddr || null, receptionDocs: s.receptionDocs });
                else claimsList.push(s);
                var rec = BTNN_WF.getRecord(s.code);
                if (rec) { rec.nbth = s.nbth; rec.nbthOrgAddr = s.nbthOrgAddr || null; BTNN_WF.upsertRecord(rec); }
            });
            syncWorkflowRecords();
            saveClaims();
            localStorage.setItem('nbthSeedVersion', NBTH_SEED_VERSION);
            if (typeof renderReceptionTable === 'function') renderReceptionTable();
        } catch (e) { /* bỏ qua lỗi dữ liệu mẫu */ }
    });
})();
