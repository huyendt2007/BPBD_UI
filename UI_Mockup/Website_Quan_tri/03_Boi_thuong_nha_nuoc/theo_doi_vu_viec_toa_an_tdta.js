/*
 * [tdta] Add-on màn hình Theo dõi vụ việc tại Tòa án (mockup).
 * - Khối "Thông tin vụ việc liên kết": hiển thị khi Trường hợp khởi kiện = "Đã yêu cầu cơ quan giải quyết trước khi khởi kiện..."
 *   hoặc Nguồn phát sinh bản án = "Khởi kiện theo thủ tục tố tụng dân sự sau khi giải quyết tại cơ quan trực tiếp quản lý...";
 *   Tìm kiếm theo Mã vụ việc / Tìm kiếm nâng cao (popup) trên toàn bộ vụ việc của toàn hệ thống, mọi trạng thái (BTNN_CASE.sys);
 *   quyền bấm Chọn theo tdtaCanChoose (TDTA_CHOOSE_STATUSES).
 * - Khối Người yêu cầu bồi thường tách Cá nhân / Tổ chức giống form tạo mới Giải quyết YCBT.
 * - Lưới: STT | Mã vụ việc | Mã hồ sơ | Tên cá nhân/Tổ chức yêu cầu | Tên cá nhân/Tổ chức bị thiệt hại | Lĩnh vực phát sinh thiệt hại |
 *   Nguồn phát sinh bản án | Ngày thụ lý | Trạng thái | Cơ quan giải quyết | Thao tác; bộ lọc theo các cột.
 * Phụ thuộc: btnn_luong_xu_ly.js (BTNN_WF), btnn_tim_kiem_vu_viec.js (BTNN_CASE), script nội tuyến của trang.
 */
(function (global) {
    'use strict';
    const W = global.BTNN_WF;
    const $ = id => document.getElementById(id);
    const T_CN = 'Cá nhân', T_TC = 'Tổ chức';
    const ROLE_NBTH = 'Người bị thiệt hại';
    const ROLE_TC_KT = 'Tổ chức kế thừa quyền, nghĩa vụ của tổ chức bị thiệt hại đã chấm dứt tồn tại';
    const ROLES_CN = ['Người thừa kế của người bị thiệt hại', 'Người đại diện cho những người thừa kế của người bị thiệt hại', 'Người đại diện theo pháp luật của người bị thiệt hại'];
    const LINK_LAWSUIT = LAWSUIT_CASES[0];   // Đã yêu cầu cơ quan giải quyết trước khi khởi kiện (...)
    const LINK_SOURCE = VERDICT_SOURCES[1];  // Khởi kiện theo thủ tục tố tụng dân sự sau khi giải quyết tại cơ quan trực tiếp quản lý (...)
    const STATUS_DONE = 'Hoàn thành';
    // Phường/Xã theo Tỉnh/Thành phố (giống Giải quyết YCBT)
    const WARDS = {
        'Hà Nội': ['00001 - Phường Ba Đình', '00004 - Phường Hoàn Kiếm', '00007 - Phường Cầu Giấy', '00010 - Phường Thanh Xuân'],
        'TP. Hồ Chí Minh': ['26734 - Phường Bến Thành', '26737 - Phường Sài Gòn', '26740 - Phường Tân Định', '26743 - Phường Chợ Lớn'],
        'Đà Nẵng': ['20194 - Phường Hải Châu', '20197 - Phường Thanh Khê', '20200 - Phường Sơn Trà', '20203 - Phường Ngũ Hành Sơn'],
        'Lâm Đồng': ['24778 - Phường Xuân Hương - Đà Lạt', '24781 - Phường Lâm Viên - Đà Lạt', '24784 - Xã Đức Trọng', '24787 - Xã Di Linh'],
        'Hải Phòng': ['11359 - Phường Hồng Bàng', '11362 - Phường Ngô Quyền', '11365 - Phường Lê Chân', '11368 - Phường Hải An']
    };
    const strip = v => String(v || '').replace(/^\d+\s*-\s*/, '').trim();
    const unitName = id => (W && id ? W.unitName(id) : '') || id || '';

    // ===================== Khối Người yêu cầu: Cá nhân / Tổ chức =====================
    function nycType() { const r = document.querySelector('input[name="claimNYCType"]:checked'); return r && r.value === T_TC ? T_TC : T_CN; }
    function setNycType(t) { document.getElementsByName('claimNYCType').forEach(r => { r.checked = r.value === (t === T_TC ? T_TC : T_CN); }); }
    function typeConstraint(role) {
        if (W && typeof W.nycTypeConstraint === 'function') { try { const v = W.nycTypeConstraint(role); if (v) return v; } catch (e) { /* quy tắc cục bộ */ } }
        if (role === ROLE_TC_KT) return T_TC;
        if (ROLES_CN.includes(role)) return T_CN;
        return '';
    }
    function rolesFor(type) {
        if (W && typeof W.nycRolesForType === 'function') { try { return W.nycRolesForType(type).map(r => r.name); } catch (e) { /* quy tắc cục bộ */ } }
        const all = [ROLE_NBTH, ROLES_CN[0], ROLES_CN[1], ROLE_TC_KT, ROLES_CN[2], 'Cá nhân, pháp nhân được ủy quyền hợp pháp'];
        return all.filter(r => type === T_TC ? !ROLES_CN.includes(r) : r !== ROLE_TC_KT);
    }
    function fillRoles(want) {
        const sel = $('claimNYCRole');
        const names = rolesFor(nycType());
        sel.innerHTML = '<option value="">-- Chọn tư cách người yêu cầu --</option>' + names.map(n => `<option value="${escapeAttr(n)}">${escapeHtml(n)}</option>`).join('');
        sel.value = names.includes(want) ? want : '';
    }
    function isOrgVictim(role, type) { return role === ROLE_TC_KT || (role === ROLE_NBTH && type === T_TC); }
    function setAlive(v) { document.getElementsByName('claimVictimAlive').forEach(x => { x.checked = x.value === v; }); if (typeof handleVictimAliveChange === 'function') handleVictimAliveChange(v); }

    function toggleTypeFields() {
        const isOrg = nycType() === T_TC;
        document.querySelectorAll('#formView .nyc-canhan-only').forEach(el => { el.style.display = isOrg ? 'none' : ''; });
        document.querySelectorAll('#formView .nyc-tochuc-only').forEach(el => { el.style.display = isOrg ? '' : 'none'; });
        $('claimNYCNameLabel').textContent = isOrg ? 'Tên tổ chức' : 'Họ và tên';
        $('claimNYCName').placeholder = isOrg ? 'Nhập tên tổ chức...' : 'Nhập họ và tên...';
        const role = getValue('claimNYCRole');
        const orgVictim = isOrgVictim(role, nycType());
        $('claimVictimAliveGroup').style.display = orgVictim ? 'none' : '';
        if (orgVictim) {
            const cur = document.querySelector('input[name="claimVictimAlive"]:checked');
            if (cur && cur.value !== 'yes') setAlive('yes');
        }
    }
    // Tư cách người thừa kế / đại diện người thừa kế: Trạng thái người bị thiệt hại = Đã mất, khóa
    global.applyVictimAliveRoleConstraint = function (role) {
        const r = role === undefined ? getValue('claimNYCRole') : role;
        const radios = document.getElementsByName('claimVictimAlive');
        if (!radios.length) return;
        const isHeir = /thừa kế/i.test(r || '') && r !== ROLE_TC_KT;
        if (isHeir) {
            radios.forEach(x => { x.checked = x.value === 'no'; x.disabled = true; x.title = 'Trường hợp người yêu cầu là Người thừa kế hoặc đại diện những người thừa kế, Trạng thái người bị thiệt hại bắt buộc là Đã mất.'; });
            if (typeof handleVictimAliveChange === 'function') handleVictimAliveChange('no');
        } else if (!isFormReadOnly) {
            radios.forEach(x => { x.disabled = false; x.title = ''; });
        }
    };
    global.toggleNbthBlock = function (role) {
        const r = role === undefined || role === null ? getValue('claimNYCRole') : role;
        $('claimNbthBlock').style.display = r && r !== ROLE_NBTH ? 'block' : 'none';
        const isOrg = r === ROLE_TC_KT;
        $('claimNbthOrgBlock').style.display = isOrg ? '' : 'none';
        $('claimNbthPersonBlock').style.display = isOrg ? 'none' : '';
        $('claimNbthBlockTitle').textContent = isOrg ? 'THÔNG TIN TỔ CHỨC BỊ THIỆT HẠI ĐÃ CHẤM DỨT TỒN TẠI' : 'THÔNG TIN NGƯỜI BỊ THIỆT HẠI';
        toggleTypeFields();
        global.applyVictimAliveRoleConstraint(r);
    };
    // Đổi Loại người yêu cầu: lọc lại Tư cách (không còn hợp lệ thì về trống) và cập nhật khối phụ thuộc
    global.tdtaOnNycTypeChange = function () {
        fillRoles(getValue('claimNYCRole'));
        global.toggleNbthBlock(getValue('claimNYCRole'));
    };
    global.tdtaUpdateWardOptions = function (clearIfMismatch) {
        const inp = $('claimNYCWard'), list = $('claimNYCWardList');
        if (!inp || !list) return;
        const isVn = getValue('claimNYCCountry') === 'Việt Nam';
        if (!isVn) { inp.removeAttribute('list'); list.innerHTML = ''; inp.placeholder = 'Nhập phường/xã/khu vực nước ngoài...'; return; }
        inp.setAttribute('list', 'claimNYCWardList');
        const wards = WARDS[getValue('claimNYCCity')] || [];
        list.innerHTML = wards.map(w => `<option value="${escapeAttr(w)}"></option>`).join('');
        inp.placeholder = wards.length ? 'Gõ Mã hoặc Tên Phường/Xã...' : 'Nhập phường/xã...';
        if (clearIfMismatch && inp.value && !wards.some(w => strip(w) === strip(inp.value))) inp.value = '';
    };
    global.toggleClaimCountrySelect = function (val) {
        $('claimCityDropdownWrapper').style.display = val === 'Việt Nam' ? 'block' : 'none';
        $('claimCityInputWrapper').style.display = val === 'Việt Nam' ? 'none' : 'block';
        global.tdtaUpdateWardOptions(false);
    };
    function fillCountrySelect(id) {
        const sel = $(id);
        if (!sel) return;
        const list = W && typeof W.getCountries === 'function' ? W.getCountries() : ['Việt Nam'];
        sel.innerHTML = list.map(c => `<option value="${escapeAttr(c)}">${escapeHtml(c)}</option>`).join('');
        sel.value = 'Việt Nam';
    }
    function setCountry(id, v) {
        const sel = $(id);
        const val = v && v !== 'Khác' ? v : 'Việt Nam';
        if (!Array.from(sel.options).some(o => o.value === val)) sel.add(new Option(val, val));
        sel.value = val;
    }

    global.readRequester = function () {
        const type = nycType(), isOrg = type === T_TC;
        const country = getValue('claimNYCCountry');
        const alive = document.querySelector('input[name="claimVictimAlive"]:checked');
        return {
            type, name: getValue('claimNYCName'), role: getValue('claimNYCRole'),
            birth: isOrg ? '' : getValue('claimNYCBirth'), victimAlive: alive ? alive.value : 'yes',
            phone: getValue('claimNYCPhone'), email: getValue('claimNYCEmail'),
            cardType: isOrg ? '' : getValue('claimNYCCardType'), cardNo: isOrg ? '' : getValue('claimNYCCardNo'),
            cardDate: isOrg ? '' : getValue('claimNYCCardDate'), cardPlace: isOrg ? '' : getValue('claimNYCCardPlace'),
            orgCode: isOrg ? getValue('claimNYCOrgCode') : '', orgDocNo: isOrg ? getValue('claimNYCOrgDocNo') : '',
            orgDocDate: isOrg ? getValue('claimNYCOrgDocDate') : '', orgDocPlace: isOrg ? getValue('claimNYCOrgDocPlace') : '',
            repName: isOrg ? getValue('claimNYCRepName') : '', repPosition: isOrg ? getValue('claimNYCRepPosition') : '',
            country, city: country === 'Việt Nam' ? getValue('claimNYCCity') : getValue('claimNYCCityText'),
            ward: getValue('claimNYCWard'), address: getValue('claimNYCAddress')
        };
    };
    global.fillRequester = function (n) {
        n = n || {};
        const role = n.role || ROLE_NBTH;
        setNycType(typeConstraint(role) || (n.type === T_TC ? T_TC : T_CN));
        fillRoles(role);
        setValue('claimNYCName', n.name || '');
        setValue('claimNYCBirth', n.birth || '');
        document.getElementsByName('claimVictimAlive').forEach(r => { r.checked = r.value === (n.victimAlive || 'yes'); });
        setValue('claimNYCPhone', n.phone || '');
        setValue('claimNYCEmail', n.email || '');
        setValue('claimNYCCardType', normDocType(n.cardType) || 'CMND/CCCD/Chứng minh quân đội');
        setValue('claimNYCCardNo', n.cardNo || '');
        setValue('claimNYCCardDate', n.cardDate || '');
        setValue('claimNYCCardPlace', n.cardPlace || '');
        ['orgCode:claimNYCOrgCode', 'orgDocNo:claimNYCOrgDocNo', 'orgDocDate:claimNYCOrgDocDate', 'orgDocPlace:claimNYCOrgDocPlace', 'repName:claimNYCRepName', 'repPosition:claimNYCRepPosition']
            .forEach(p => { const [k, id] = p.split(':'); setValue(id, n[k] || ''); });
        const isVn = !n.country || n.country === 'Việt Nam' || n.country === 'Khác';
        setCountry('claimNYCCountry', isVn ? 'Việt Nam' : n.country);
        global.toggleClaimCountrySelect(getValue('claimNYCCountry'));
        setValue('claimNYCCity', isVn ? (n.city || 'Hà Nội') : 'Hà Nội');
        setValue('claimNYCCityText', isVn ? '' : (n.city || ''));
        global.tdtaUpdateWardOptions(false);
        setValue('claimNYCWard', strip(n.ward || ''));
        setValue('claimNYCAddress', n.address || '');
        toggleTypeFields();
    };
    global.readNbth = function (role) {
        if (!role || role === ROLE_NBTH) return null;
        if (role === ROLE_TC_KT) return { orgName: getValue('claimNbthOrgName'), orgCode: getValue('claimNbthOrgCode') };
        return {
            name: getValue('claimNbthName'), dob: getValue('claimNbthBirth'), phone: getValue('claimNbthPhone'), email: getValue('claimNbthEmail'),
            docType: getValue('claimNbthCardType'), docNo: getValue('claimNbthCardNo'), docDate: getValue('claimNbthCardDate'), docPlace: getValue('claimNbthCardPlace'),
            country: getValue('claimNbthCountry'), city: getValue('claimNbthCountry') === 'Việt Nam' ? getValue('claimNbthCity') : getValue('claimNbthCityText'),
            ward: getValue('claimNbthWard'), address: getValue('claimNbthAddress')
        };
    };
    global.fillNbth = function (d) {
        d = d || {};
        setValue('claimNbthOrgName', d.orgName || ''); setValue('claimNbthOrgCode', d.orgCode || '');
        setValue('claimNbthName', d.name || ''); setValue('claimNbthBirth', d.dob || ''); setValue('claimNbthPhone', d.phone || ''); setValue('claimNbthEmail', d.email || '');
        setValue('claimNbthCardType', normDocType(d.docType)); setValue('claimNbthCardNo', d.docNo || ''); setValue('claimNbthCardDate', d.docDate || ''); setValue('claimNbthCardPlace', d.docPlace || '');
        setCountry('claimNbthCountry', d.country);
        const vn = getValue('claimNbthCountry') === 'Việt Nam';
        global.tdtaNbthCountryChange(getValue('claimNbthCountry'));
        const citySel = $('claimNbthCity');
        if (vn && d.city && !Array.from(citySel.options).some(o => o.value === d.city)) citySel.add(new Option(d.city, d.city));
        setValue('claimNbthCity', vn ? (d.city || '') : '');
        setValue('claimNbthCityText', vn ? '' : (d.city || ''));
        global.tdtaUpdateNbthWardOptions(false);
        setValue('claimNbthWard', strip(d.ward || '')); setValue('claimNbthAddress', d.address || '');
    };
    // [ux] Địa chỉ người bị thiệt hại: cùng control với người yêu cầu (Việt Nam: Combobox Tỉnh/Thành phố, Phường/Xã gợi ý theo Tỉnh; nước khác: nhập tự do)
    global.tdtaNbthCountryChange = function (val) {
        const vn = (val || getValue('claimNbthCountry')) === 'Việt Nam';
        $('claimNbthCityDropdownWrapper').style.display = vn ? 'block' : 'none';
        $('claimNbthCityInputWrapper').style.display = vn ? 'none' : 'block';
        global.tdtaUpdateNbthWardOptions(false);
    };
    global.tdtaUpdateNbthWardOptions = function (clearIfMismatch) {
        const inp = $('claimNbthWard'), list = $('claimNbthWardList');
        if (!inp || !list) return;
        if (getValue('claimNbthCountry') !== 'Việt Nam') { inp.removeAttribute('list'); list.innerHTML = ''; inp.placeholder = 'Nhập phường/xã/khu vực nước ngoài...'; return; }
        inp.setAttribute('list', 'claimNbthWardList');
        const wards = WARDS[getValue('claimNbthCity')] || [];
        list.innerHTML = wards.map(w => `<option value="${escapeAttr(w)}"></option>`).join('');
        inp.placeholder = wards.length ? 'Gõ Mã hoặc Tên Phường/Xã...' : 'Nhập phường/xã...';
        if (clearIfMismatch && inp.value && !wards.some(w => strip(w) === strip(inp.value))) inp.value = '';
    };
    // Trường bắt buộc khối Người yêu cầu / Người bị thiệt hại (giống Giải quyết YCBT), theo thứ tự hiển thị
    global.tdtaRequiredIds = function () {
        const isOrg = nycType() === T_TC;
        const role = getValue('claimNYCRole');
        let ids = [];
        // Khối Thông tin vụ việc liên kết đang hiển thị: bắt buộc chọn vụ việc (nhập mà chưa chọn được coi là bỏ trống)
        if (linkCondition() && !link) { setValue('tdtaLinkCode', ''); ids.push('tdtaLinkCode'); }
        ids.push('claimNYCRole', 'claimNYCName');
        ids = ids.concat(isOrg ? ['claimNYCOrgCode', 'claimNYCRepName', 'claimNYCRepPosition'] : ['claimNYCBirth']);
        ids.push('claimNYCPhone');
        if (!isOrg) ids.push('claimNYCCardType', 'claimNYCCardNo');
        ids.push(getValue('claimNYCCountry') === 'Việt Nam' ? 'claimNYCCity' : 'claimNYCCityText', 'claimNYCWard', 'claimNYCAddress');
        if (role && role !== ROLE_NBTH) ids = ids.concat(role === ROLE_TC_KT ? ['claimNbthOrgName'] : ['claimNbthName', 'claimNbthBirth', 'claimNbthCardType', 'claimNbthCardNo']);
        return ids;
    };

    // ===================== Khối Thông tin vụ việc liên kết =====================
    let link = null; // { code, hoSoCode, agencyId, agency, status, requester, victim }
    const fold = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
    function linkCondition() { return getValue('caseLawsuitCase') === LINK_LAWSUIT || getValue('caseVerdictSource') === LINK_SOURCE; }
    // Kết quả tìm kiếm: toàn bộ vụ việc của toàn hệ thống, mọi trạng thái (cùng dữ liệu Tra cứu vụ việc);
    // gồm cả vụ việc đã liên kết với vụ việc tại Tòa án khác (01 vụ việc được liên kết với nhiều vụ việc tại Tòa án)
    function eligible() {
        const C = global.BTNN_CASE;
        if (!C || !C.sys) return [];
        return C.sys.rows();
    }
    // Quyền bấm Chọn vụ việc liên kết (V1 đã chốt: mọi trạng thái): null = mọi trạng thái; mảng = chỉ các trạng thái trong mảng
    const TDTA_CHOOSE_STATUSES = null;
    function tdtaCanChoose(r) {
        if (!r) return { ok: false, reason: '' };
        if (Array.isArray(TDTA_CHOOSE_STATUSES) && !TDTA_CHOOSE_STATUSES.includes(r.status))
            return { ok: false, reason: `Chỉ chọn được vụ việc có trạng thái ${TDTA_CHOOSE_STATUSES.map(s => `"${s}"`).join(', ')}` };
        return { ok: true, reason: '' };
    }
    function showLinkError(msg) {
        const inp = $('tdtaLinkCode'), err = $('tdtaLinkCodeError');
        inp.classList.toggle('is-invalid', !!msg);
        err.textContent = msg || 'Đây là trường bắt buộc';
        err.style.display = msg ? 'block' : 'none';
    }
    // [ux] Trước khi Chọn: ô nhập + Tìm kiếm / Tìm kiếm nâng cao; sau khi Chọn: ẩn ô nhập và 02 nút, hiện các trường chỉ đọc
    // Mã vụ việc | Mã hồ sơ GQBT | Trạng thái vụ việc | Cơ quan giải quyết (02 trường sau chỉ hiện khi có dữ liệu) + Bỏ chọn
    function renderLink() {
        const has = !!link, ro = isFormReadOnly;
        setValue('tdtaLinkVv', has ? link.code : '');
        setValue('tdtaLinkHoSo', has ? (link.hoSoCode || '-') : '');
        setValue('tdtaLinkStatus', has ? link.status : '');
        setValue('tdtaLinkAgency', has ? link.agency : '');
        $('tdtaLinkStatusGroup').style.display = has && link.status ? '' : 'none';
        $('tdtaLinkAgencyGroup').style.display = has && link.agency ? '' : 'none';
        $('tdtaLinkPick').style.display = has ? 'none' : '';
        $('tdtaLinkInfo').style.display = has ? '' : 'none';
        $('tdtaLinkCode').disabled = ro;
        $('tdtaBtnSearch').style.display = ro ? 'none' : '';
        $('tdtaBtnAdv').style.display = ro ? 'none' : '';
        $('tdtaBtnUnlink').style.display = ro ? 'none' : '';
    }
    global.tdtaClearLink = function (focus) {
        link = null;
        setValue('tdtaLinkCode', '');
        showLinkError('');
        renderLink();
        if (focus) $('tdtaLinkCode').focus();
    };
    function applyLinkVisibility() {
        const show = linkCondition();
        $('tdtaLinkedBlock').style.display = show ? 'block' : 'none';
        if (!show && (link || getValue('tdtaLinkCode'))) global.tdtaClearLink(false);
    }
    global.tdtaApplyLinkVisibility = applyLinkVisibility;

    // Hồ sơ Giải quyết YCBT đầy đủ (nếu có trong dữ liệu Giải quyết YCBT) để điền sẵn khối Người yêu cầu / Người bị thiệt hại
    function findClaim(hoSoCode) {
        let list = [];
        try { list = JSON.parse(localStorage.getItem('claimsList') || '[]') || []; } catch (e) { list = []; }
        return Array.isArray(list) ? list.find(c => c && c.code === hoSoCode) : null;
    }
    // Loại giấy tờ giá trị cũ (VD 'CCCD', 'Căn cước công dân') hoặc ghi nhầm Loại người yêu cầu: quy đổi theo danh mục giấy tờ tùy thân trước khi điền
    function normDocType(v) {
        if (W && typeof W.normalizePersonalDocType === 'function') return W.normalizePersonalDocType(v);
        const s = String(v || '').trim();
        if (!s || s === T_CN || s === T_TC) return '';
        return /^(CCCD|CMND|Căn cước công dân|Chứng minh nhân dân)/i.test(s) ? 'CMND/CCCD/Chứng minh quân đội' : s;
    }
    function nycFromClaim(c) {
        return {
            type: c.nycType, role: c.nycRole || c.role, name: typeof c.nyc === 'string' ? c.nyc : (c.nyc && c.nyc.name) || '',
            birth: c.nycBirth || c.nycDob || '', victimAlive: c.victimAlive || 'yes', phone: c.nycPhone || c.phone || '', email: c.nycEmail || '',
            cardType: normDocType(c.nycCardType || c.cardType), cardNo: c.nycCardNo || c.cardNo || '', cardDate: c.nycCardDate || '', cardPlace: c.nycCardPlace || '',
            orgCode: c.nycOrgCode || '', orgDocNo: c.nycOrgDocNo || '', orgDocDate: c.nycOrgDocDate || '', orgDocPlace: c.nycOrgDocPlace || '',
            repName: c.nycRepName || '', repPosition: c.nycRepPosition || '',
            country: c.nycCountry || 'Việt Nam', city: c.nycTinhThanh || '', ward: c.nycPhuongXa || '', address: c.nycAddressDetail || c.address || ''
        };
    }
    function prefillFrom(r) {
        const claim = findClaim(r.hoSoCode);
        if (claim) {
            global.fillRequester(nycFromClaim(claim));
            const role = getValue('claimNYCRole');
            global.fillNbth(role === ROLE_TC_KT ? { orgName: claim.nbthOrgName || '', orgCode: claim.nbthOrgCode || '' } : (claim.nbth || {}));
        } else {
            // Dữ liệu tra cứu chỉ có tên: điền Tên cá nhân/Tổ chức yêu cầu, Loại người yêu cầu; tên người bị thiệt hại (khi khác người yêu cầu)
            const cur = global.readRequester();
            const isOrg = /^(công ty|tổng công ty|hợp tác xã|doanh nghiệp|ngân hàng)/i.test(r.requester || '');
            global.fillRequester(Object.assign({}, cur, { type: isOrg ? T_TC : T_CN, name: r.requester || '' }));
            if (r.victim && r.victim !== r.requester) { setValue('claimNbthName', r.victim); setValue('claimNbthOrgName', r.victim); }
        }
        global.toggleNbthBlock(getValue('claimNYCRole'));
    }
    function choose(r) {
        link = { code: r.code, hoSoCode: r.hoSoCode, agencyId: r.agencyId, agency: r.agency || unitName(r.agencyId), status: r.status, requester: r.requester, victim: r.victim };
        showLinkError('');
        renderLink();
        prefillFrom(r);
        if (typeof global.tdtaRefreshCounters === 'function') global.tdtaRefreshCounters();
    }
    // [ux] Khối người yêu cầu đã có dữ liệu nhập: hỏi xác nhận trước khi ghi đè; form trống: chọn và điền luôn. Hủy bỏ: không chọn vụ việc
    function requesterHasData() {
        return ['claimNYCName', 'claimNYCBirth', 'claimNYCPhone', 'claimNYCEmail', 'claimNYCCardNo', 'claimNYCOrgCode', 'claimNYCRepName', 'claimNYCAddress', 'claimNYCWard']
            .some(id => !!getValue(id));
    }
    global.tdtaRequestChoose = function (r) {
        if (!r) return;
        if (!requesterHasData()) { choose(r); return; }
        showConfirm(`Thông tin người yêu cầu đã nhập sẽ được thay bằng dữ liệu của vụ việc ${r.code}. Tiếp tục?`, () => choose(r),
            'Xác nhận thay thông tin người yêu cầu', { yes: 'Tiếp tục', no: 'Hủy bỏ', yesClass: 'btn-primary' });
    };
    // Tìm kiếm nhanh theo Mã vụ việc (nhận cả Mã hồ sơ)
    global.tdtaQuickSearch = function () {
        const v = getValue('tdtaLinkCode');
        if (!v) { showLinkError('Đây là trường bắt buộc'); $('tdtaLinkCode').focus(); return; }
        const hit = global.BTNN_CASE && global.BTNN_CASE.sys ? global.BTNN_CASE.sys.findRow(eligible(), v) : null;
        const chk = tdtaCanChoose(hit);
        if (hit && chk.ok) { global.tdtaRequestChoose(hit); }
        else { showLinkError(hit ? chk.reason : 'Không tìm thấy vụ việc phù hợp'); $('tdtaLinkCode').focus(); }
    };
    // Dữ liệu ghi khi Lưu (khối ẩn: không lưu liên kết)
    global.tdtaLinkData = function () {
        const on = linkCondition() && !!link;
        return {
            linkedVuViec: on ? link.code : '', hoSoCode: on ? link.hoSoCode : '',
            linkedAgencyId: on ? link.agencyId || '' : '', linkedAgency: on ? link.agency : '', linkedStatus: on ? link.status : '',
            linkedRequester: on ? link.requester || '' : '', linkedVictim: on ? link.victim || '' : ''
        };
    };
    // Cập nhật: có liên kết -> Mã vụ việc theo vụ việc liên kết; bỏ liên kết với mã đang lấy từ vụ việc liên kết -> sinh mã mới; đã có bản ghi kinh phí: giữ mã
    global.tdtaApplyCode = function (rec) {
        if (!rec || rec.fundingCode) return;
        if (rec.linkedVuViec) { if (rec.code !== rec.linkedVuViec) rec.code = rec.linkedVuViec; }
        else if (openedLinkCode && rec.code === openedLinkCode) rec.code = nextCaseCodes(1)[0];
    };
    let openedLinkCode = '';
    // Mã vụ việc vụ việc không liên kết: VVBT-yyyy-xxx theo cơ chế cấp mã chung (BTNN_WF.nextVuViecCode, số đã cấp không cấp lại)
    global.nextCaseCodes = function (count) {
        return Array.from({ length: count || 1 }, () => W.nextVuViecCode());
    };

    // ---------- Popup Tìm kiếm nâng cao vụ việc ----------
    const POP_FIELDS = ['tdtaPopCode', 'tdtaPopHoSo', 'tdtaPopReq', 'tdtaPopVictim', 'tdtaPopAgency', 'tdtaPopStatus'];
    function ensureModal() {
        if ($('tdtaLookup')) return;
        const st = document.createElement('style');
        st.textContent = [
            '.tdta-bd{position:fixed;inset:0;background:rgba(15,23,42,.45);display:none;align-items:flex-start;justify-content:center;z-index:5000;padding:20px;overflow:auto;}',
            '.tdta-bd.visible{display:flex;}',
            '.tdta-modal{background:#fff;border-radius:12px;width:min(1360px,100%);box-shadow:0 20px 50px rgba(15,23,42,.3);display:flex;flex-direction:column;max-height:calc(100vh - 40px);}',
            '.tdta-head{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:15px;color:#0f172a;}',
            '.tdta-body{padding:16px 18px;overflow:auto;}',
            '.tdta-note:has(> span:empty){display:none;}',
                '.tdta-note{margin-bottom:12px;padding:8px 12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;font-size:13px;color:#1e3a8a;}',
            '.tdta-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 14px;}',
            '.tdta-grid label{display:block;font-size:13px;font-weight:600;color:#334155;margin-bottom:4px;}',
            '.tdta-grid input,.tdta-grid select{width:100%;box-sizing:border-box;height:36px;border:1px solid #cbd5e1;border-radius:6px;padding:4px 10px;font:inherit;font-size:13px;}',
            '.tdta-actions{display:flex;justify-content:flex-end;gap:8px;margin:12px 0;}',
            '.tdta-table{width:100%;border-collapse:collapse;font-size:13px;}',
            '.tdta-table th{background:#f1f5f9;text-align:left;padding:9px 10px;color:#334155;border-bottom:1px solid #e2e8f0;white-space:nowrap;}',
            '.tdta-table td{padding:9px 10px;border-bottom:1px solid #f1f5f9;vertical-align:middle;}',
            '.tdta-table-wrap{overflow-x:auto;}',
            '.tdta-table tbody tr.tdta-pick{cursor:pointer;}',
            '.tdta-table button:disabled{opacity:.5;cursor:not-allowed;}',
            '.tdta-table tbody tr:hover td{background:#f8fafc;}',
            '.tdta-table a{color:#1d4ed8;text-decoration:underline;cursor:pointer;}',
            '.tdta-badge{display:inline-block;padding:3px 9px;border-radius:999px;background:#eef2ff;color:#3730a3;font-size:12px;font-weight:600;white-space:nowrap;}',
            '.tdta-foot{display:flex;justify-content:flex-end;padding:12px 18px;border-top:1px solid #e2e8f0;}',
            '.tdta-empty{text-align:center;color:#64748b;font-style:italic;padding:24px;}'
        ].join('\n');
        document.head.appendChild(st);
        const inp = (id, label, ph) => `<div><label for="${id}">${label}</label><input id="${id}" placeholder="${ph}" autocomplete="off"></div>`;
        const box = document.createElement('div');
        box.className = 'tdta-bd';
        box.id = 'tdtaLookup';
        box.innerHTML = `
            <div class="tdta-modal" role="dialog" aria-modal="true">
                <div class="tdta-head"><strong><i class="fa-solid fa-magnifying-glass-plus"></i> Tìm kiếm vụ việc liên kết</strong>
                    <button type="button" class="btn btn-secondary" onclick="tdtaCloseLookup()" title="Đóng"><i class="fa-solid fa-xmark"></i></button></div>
                <div class="tdta-body">
                    <div class="tdta-note"><span id="tdtaPopRule"></span></div>
                    <div class="tdta-grid">
                        ${inp('tdtaPopCode', 'Mã vụ việc', 'Nhập mã vụ việc...')}
                        ${inp('tdtaPopHoSo', 'Mã hồ sơ GQBT', 'Nhập mã hồ sơ GQBT...')}
                        ${inp('tdtaPopReq', 'Tên cá nhân/Tổ chức yêu cầu', 'Nhập tên cá nhân/tổ chức yêu cầu...')}
                        ${inp('tdtaPopVictim', 'Tên cá nhân/Tổ chức bị thiệt hại', 'Nhập tên cá nhân/tổ chức bị thiệt hại...')}
                        ${inp('tdtaPopAgency', 'Cơ quan giải quyết', 'Nhập cơ quan giải quyết...')}
                        ${global.BTNN_CASE && global.BTNN_CASE.sys && global.BTNN_CASE.sys.addrFilterHtml ? global.BTNN_CASE.sys.addrFilterHtml('tdtaPop') : ''}
                        <div><label for="tdtaPopStatus">Trạng thái</label><select id="tdtaPopStatus"></select></div>
                    </div>
                    <div class="tdta-actions">
                        <button type="button" class="btn btn-secondary" onclick="tdtaLookupClear()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                        <button type="button" class="btn btn-primary" onclick="tdtaLookupSearch()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                    </div>
                    <div class="tdta-table-wrap"><table class="tdta-table" id="tdtaPopTable">
                        <thead><tr>${global.BTNN_CASE && global.BTNN_CASE.sys ? global.BTNN_CASE.sys.HEAD_HTML : ''}</tr></thead>
                        <tbody id="tdtaPopBody"></tbody>
                    </table></div>
                </div>
                <div class="tdta-foot"><button type="button" class="btn btn-secondary" onclick="tdtaCloseLookup()">Hủy bỏ</button></div>
            </div>`;
        document.body.appendChild(box);
        POP_FIELDS.slice(0, 5).forEach(id => $(id).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); global.tdtaLookupSearch(); } }));
    }
    let popRows = [];
    global.tdtaOpenLookup = function () {
        ensureModal();
        const C = global.BTNN_CASE;
        $('tdtaPopRule').textContent = Array.isArray(TDTA_CHOOSE_STATUSES) ? `${tdtaCanChoose({ status: '' }).reason}.` : '';
        const statuses = C && C.sys ? C.sys.STATUSES : [];
        $('tdtaPopStatus').innerHTML = '<option value="">Tất cả</option>' + statuses.map(s => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('');
        POP_FIELDS.forEach(id => setValue(id, ''));
        setValue('tdtaPopCode', getValue('tdtaLinkCode'));
        if (C && C.sys && C.sys.addrInit) { C.sys.addrClear('tdtaPop'); C.sys.addrInit('tdtaPop', eligible()); }
        global.tdtaLookupSearch();
        $('tdtaLookup').classList.add('visible');
    };
    global.tdtaCloseLookup = function () { const m = $('tdtaLookup'); if (m) m.classList.remove('visible'); };
    global.tdtaLookupClear = function () { POP_FIELDS.forEach(id => setValue(id, '')); const S = global.BTNN_CASE && global.BTNN_CASE.sys; if (S && S.addrClear) S.addrClear('tdtaPop'); global.tdtaLookupSearch(); };
    global.tdtaLookupSearch = function () {
        const f = { code: fold(getValue('tdtaPopCode')), hoSo: fold(getValue('tdtaPopHoSo')), req: fold(getValue('tdtaPopReq')), victim: fold(getValue('tdtaPopVictim')), agency: fold(getValue('tdtaPopAgency')) };
        const status = getValue('tdtaPopStatus');
        popRows = eligible().filter(r => {
            if (f.code && !fold(r.code).includes(f.code)) return false;
            if (f.hoSo && !(r.hoSoCodes || [r.hoSoCode]).some(h => fold(h).includes(f.hoSo))) return false;
            if (f.req && !fold(r.requester).includes(f.req)) return false;
            if (f.victim && !fold(r.victim).includes(f.victim)) return false;
            if (f.agency && !fold(r.agency).includes(f.agency)) return false;
            if (status && r.status !== status) return false;
            const SA = global.BTNN_CASE && global.BTNN_CASE.sys;
            if (SA && SA.addrMatch && !SA.addrMatch(r, 'tdtaPop')) return false;
            return true;
        });
        const S = global.BTNN_CASE && global.BTNN_CASE.sys;
        $('tdtaPopBody').innerHTML = popRows.length && S ? popRows.map((r, i) => {
            const chk = tdtaCanChoose(r);
            return `<tr class="${chk.ok ? 'tdta-pick' : ''}" ${chk.ok ? `onclick="tdtaLookupChoose(${i})"` : ''}>
                <td style="text-align:center;">${i + 1}</td>
                ${S.cellsHtml(r, i, 'tdtaLookupOpenDetail', 'tdta-badge')}
                <td style="text-align:center;"><button type="button" class="btn btn-primary btn-sm" ${chk.ok ? '' : `disabled title="${escapeAttr(chk.reason)}"`} onclick="event.stopPropagation(); tdtaLookupChoose(${i})"><i class="fa-solid fa-check"></i> Chọn</button></td>
            </tr>`;
        }).join('') : `<tr><td colspan="${S ? S.COLS : 11}" class="tdta-empty">Không tìm thấy dữ liệu phù hợp. [MSG-INF-SYS-001]</td></tr>`;
    };
    // Mã hồ sơ GQBT (HyperLink): xem chi tiết hồ sơ Giải quyết YCBT tại tab mới, không chọn vụ việc
    global.tdtaLookupOpenDetail = function (i) { const r = popRows[i]; if (r && global.BTNN_CASE) global.BTNN_CASE.sys.openRowDetail(r); };
    global.tdtaLookupChoose = function (i) {
        const r = popRows[i];
        if (!r || !tdtaCanChoose(r).ok) return;
        global.tdtaCloseLookup();
        global.tdtaRequestChoose(r);
    };

    // ===================== Mở form: nạp trạng thái khối liên kết =====================
    const baseOpen = global.openCaseForm;
    global.openCaseForm = function () {
        baseOpen.apply(this, arguments);
        if ($('formView').style.display === 'none') return;
        const rec = editingId ? cases.find(c => c.id === editingId) : null;
        openedLinkCode = rec && rec.linkedVuViec ? rec.linkedVuViec : '';
        link = rec && rec.linkedVuViec ? { code: rec.linkedVuViec, hoSoCode: rec.hoSoCode || '', agencyId: rec.linkedAgencyId || '', agency: rec.linkedAgency || '', status: rec.linkedStatus || '', requester: rec.linkedRequester || (rec.nyc && rec.nyc.name) || '', victim: rec.linkedVictim || '' } : null;
        setValue('tdtaLinkCode', '');
        showLinkError('');
        renderLink();
        applyLinkVisibility();
        // Mở khóa chung của form làm mất khóa Trạng thái người bị thiệt hại theo Tư cách: áp dụng lại
        global.toggleNbthBlock(getValue('claimNYCRole'));
        if (isFormReadOnly) document.getElementsByName('claimVictimAlive').forEach(x => { x.disabled = true; });
    };

    // ===================== Lưới danh sách + bộ lọc =====================
    function requesterName(r) { return (r.nyc && r.nyc.name) || '-'; }
    function victimName(r) {
        const role = (r.nyc && r.nyc.role) || ROLE_NBTH;
        if (role === ROLE_NBTH) return requesterName(r);
        if (role === ROLE_TC_KT) return (r.nbth && (r.nbth.orgName || r.nbth.name)) || '-';
        return (r.nbth && r.nbth.name) || '-';
    }
    function agencyName(r) { return r.linkedAgency || unitName(r.rootUnitId); }
    global.tdtaGrid = { requesterName, victimName, agencyName };
    function dateRangeInvalid() {
        const from = parseDate(getValue('filterFromDate')), to = parseDate(getValue('filterToDate'));
        const bad = !!(from && to && from > to);
        ['filterFromDate', 'filterToDate'].forEach(id => { const el = $(id); if (el) el.classList.toggle('is-invalid', bad); });
        return bad;
    }
    global.getFilteredRows = function () {
        const v = id => fold(getValue(id));
        const f = { code: v('filterCode'), hoSo: v('filterHoSo'), req: v('filterRequester'), victim: v('filterVictim'), agency: v('filterAgency') };
        const field = getValue('filterFieldGroup'), status = getValue('filterStatus'), source = getValue('filterSource');
        const from = parseDate(getValue('filterFromDate')), to = parseDate(getValue('filterToDate'));
        return visibleCases().filter(r => {
            if (f.code && !fold(r.code).includes(f.code)) return false;
            if (f.hoSo && !fold(r.hoSoCode).includes(f.hoSo)) return false;
            if (f.req && !fold(requesterName(r)).includes(f.req)) return false;
            if (f.victim && !fold(victimName(r)).includes(f.victim)) return false;
            if (field && r.fieldGroup !== field) return false;
            if (source && r.verdictSource !== source) return false;
            if (status && r.status !== status) return false;
            if (f.agency && !fold(agencyName(r)).includes(f.agency)) return false;
            const d = parseDate(r.acceptDate);
            if (from && (!d || d < from)) return false;
            if (to && (!d || d > to)) return false;
            return true;
        }).sort((a, b) => String(b.code).localeCompare(String(a.code)));
    };
    global.renderTable = function () {
        const tbody = $('courtTableBody');
        if (dateRangeInvalid()) {
            tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:#dc2626; padding:28px; font-style:italic;">Ngày thụ lý từ ngày không được lớn hơn Ngày thụ lý đến ngày. [MSG-ERR-VAL-007]</td></tr>`;
            $('resultCount').textContent = 'Hiển thị 0 bản ghi';
            $('pageInfo').textContent = 'Hiển thị 0-0 trong tổng số 0 bản ghi';
            renderPagination(1);
            return;
        }
        const rows = global.getFilteredRows();
        const total = rows.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;
        const start = (currentPage - 1) * pageSize;
        const pageRows = rows.slice(start, start + pageSize);
        if (!pageRows.length) {
            tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:var(--text-muted); padding:28px; font-style:italic;">Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</td></tr>`;
        } else {
            tbody.innerHTML = pageRows.map((r, idx) => {
                const id = escapeAttr(r.id);
                // Vụ việc "Đã có bản án/QĐ": Cập nhật / Xóa khóa mờ, tooltip "[Tên thao tác] - [Lý do]"
                const ok = typeof canEditCase === 'function' ? canEditCase(r) : true;
                const why = ' - Vụ việc đã có bản án/QĐ';
                const actEdit = ok
                    ? `<button class="icon-btn edit" title="Cập nhật" onclick="event.stopPropagation(); openCaseForm('${id}', false)"><i class="fa-solid fa-pen-to-square"></i></button>`
                    : `<button type="button" class="icon-btn edit disabled-action" aria-disabled="true" title="Cập nhật${why}" onclick="event.stopPropagation();"><i class="fa-solid fa-pen-to-square"></i></button>`;
                const actDel = ok
                    ? `<button class="icon-btn delete" title="Xóa" onclick="event.stopPropagation(); confirmDeleteCase('${id}')"><i class="fa-solid fa-trash-can"></i></button>`
                    : `<button type="button" class="icon-btn delete disabled-action" aria-disabled="true" title="Xóa${why}" onclick="event.stopPropagation();"><i class="fa-solid fa-trash-can"></i></button>`;
                return `
                    <tr onclick="openCaseForm('${id}', true)">
                        <td style="text-align:center;">${start + idx + 1}</td>
                        <td class="code-cell">${escapeHtml(r.code)}</td>
                        <td style="text-align:center;">${escapeHtml(r.hoSoCode || '-')}</td>
                        <td><strong>${escapeHtml(requesterName(r))}</strong></td>
                        <td>${escapeHtml(victimName(r))}</td>
                        <td>${escapeHtml(FIELD_GROUP_NAMES[r.fieldGroup] || r.fieldGroup || '-')}</td>
                        <td><span class="muted" style="font-size:12.5px; color:#334155;">${escapeHtml(r.verdictSource || '-')}</span></td>
                        <td style="text-align:center;">${escapeHtml(r.acceptDate || '-')}</td>
                        <td style="text-align:center;">${statusBadge(r.status)}</td>
                        <td>${escapeHtml(agencyName(r) || '-')}</td>
                        <td style="text-align:center;">
                            <div class="action-flex">
                                ${actEdit}
                                ${actDel}
                            </div>
                        </td>
                    </tr>`;
            }).join('');
        }
        $('resultCount').textContent = `Hiển thị ${total} bản ghi`;
        const end = total === 0 ? 0 : Math.min(start + pageSize, total);
        $('pageInfo').textContent = `Hiển thị ${total === 0 ? 0 : start + 1}-${end} trong tổng số ${total} bản ghi`;
        renderPagination(totalPages);
    };
    global.resetFilters = function () {
        ['filterCode', 'filterHoSo', 'filterRequester', 'filterVictim', 'filterFieldGroup', 'filterSource', 'filterStatus', 'filterAgency'].forEach(id => setValue(id, ''));
        ['filterFromDate', 'filterToDate'].forEach(id => setDate(id, ''));
        currentPage = 1;
        global.renderTable();
    };

    // ===================== Dữ liệu giả lập: Loại người yêu cầu, vụ việc liên kết, Tổ chức =====================
    const baseSeed = global.buildSeed;
    global.buildSeed = function () {
        const list = baseSeed();
        const C = global.BTNN_CASE;
        const linkTo = (rec, hoSo) => {
            const src = C ? C.CASES.find(x => x.hoSoCode === hoSo || x.code === hoSo) : null;
            const vv = W && typeof W.vuViecOf === 'function' ? W.vuViecOf(hoSo) : hoSo;
            Object.assign(rec, {
                code: vv, linkedVuViec: vv, hoSoCode: hoSo,
                linkedAgencyId: src ? src.agencyId : '', linkedAgency: src ? unitName(src.agencyId) : '', linkedStatus: src ? src.status : '',
                linkedRequester: src ? src.requester : '', linkedVictim: src ? src.victim : ''
            });
        };
        // Dữ liệu mẫu chưa có Phường/Xã (bắt buộc khi Cập nhật): lấy Phường/Xã thuộc Tỉnh/Thành phố có tên nằm trong Địa chỉ chi tiết, không có thì Phường/Xã đầu tiên của Tỉnh/Thành phố
        const seedWard = p => {
            if (!p || p.ward || (p.country && p.country !== 'Việt Nam')) return;
            const ws = WARDS[p.city] || [];
            if (!ws.length) return;
            const addr = String(p.address || '').toLowerCase();
            const hit = ws.find(w => addr.indexOf(strip(w).replace(/^(Phường|Xã)\s+/i, '').split(' - ')[0].toLowerCase()) >= 0);
            p.ward = hit || ws[0];
        };
        list.forEach(r => {
            r.nyc = Object.assign({ type: T_CN, ward: '' }, r.nyc);
            seedWard(r.nyc);
            if (r.nbth) seedWard(r.nbth);
            if (r.nyc.cardType === 'CCCD') r.nyc.cardType = 'CMND/CCCD/Chứng minh quân đội';
            if (r.nbth && r.nbth.docType === 'CCCD') r.nbth.docType = 'CMND/CCCD/Chứng minh quân đội';
            if (!r.hoSoCode) r.hoSoCode = '';
        });
        const r302 = list.find(r => r.code === 'BT-2026-302');
        if (r302) {
            linkTo(r302, 'BT-2026-030');
            // Đồng bộ hồ sơ GQ YCBT BT-2026-030 (Người yêu cầu, Lĩnh vực, Hành vi gây thiệt hại)
            Object.assign(r302.nyc, { name: 'Bùi Văn Khánh', gender: 'Nam', birth: '14/03/1979', cardNo: '001092556677', city: 'Hà Nội', ward: 'Phường Định Công', address: 'Hoàng Mai' });
            Object.assign(r302, { fieldGroup: 'hình sự', hanhVi: 'Khởi tố, tạm giam 10 ngày đối với người không thực hiện hành vi phạm tội.' });
        }
        const r308 = list.find(r => r.code === 'BT-2026-308');
        if (r308) {
            linkTo(r308, 'BT-2026-052');
            // Đồng bộ hồ sơ GQ YCBT BT-2026-052 (Người yêu cầu, Hành vi gây thiệt hại)
            Object.assign(r308.nyc, { name: 'Trần Đình Trọng', gender: 'Nam', cardNo: '001094005678', city: 'Hà Nội', ward: '00007 - Phường Cầu Giấy', address: 'Cầu Giấy' });
            r308.hanhVi = 'Thu hồi giấy phép kinh doanh ăn uống không đúng trình tự, gây đình trệ chuỗi nhà hàng.';
        }
        // Người yêu cầu là Tổ chức (minh họa khối Tổ chức): vụ việc không liên kết BT-2026-306
        const r306 = list.find(r => r.code === 'BT-2026-306');
        if (r306) {
            r306.nyc = {
                type: T_TC, name: 'Công ty TNHH Minh Phát', role: ROLE_NBTH, birth: '', victimAlive: 'yes', phone: '02633822456', email: 'lienhe@minhphat.vn',
                cardType: '', cardNo: '', cardDate: '', cardPlace: '',
                orgCode: '5800123456', orgDocNo: '5800123456', orgDocDate: '15/04/2012', orgDocPlace: 'Sở Kế hoạch và Đầu tư tỉnh Lâm Đồng',
                repName: 'Lê Minh Phát', repPosition: 'Giám đốc', country: 'Việt Nam', city: 'Lâm Đồng', ward: 'Phường Xuân Hương - Đà Lạt', address: 'Số 25 Trần Phú'
            };
        }
        // Vụ việc không liên kết: Mã vụ việc VVBT- gắn với Id vụ việc tại Tòa án qua sổ đăng ký chung (ổn định khi nạp lại dữ liệu mẫu)
        list.forEach(r => { if (W && !W.isVuViecCode(r.code)) r.code = W.vuViecOf(r.id); });
        return list;
    };

    // ===================== [ux] Cải tiến UX form Thêm mới / Cập nhật (MH02), MH03, popup =====================
    const esc = s => escapeHtml(s == null ? '' : String(s));
    const formOpen = () => { const f = $('formView'); return !!f && f.style.display === 'flex'; };
    // ---- Thông báo trực tiếp (thay toast): trong form -> khung đầu form; ngoài form -> khung đầu danh sách ----
    const NOTICE_ICON = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', warning: 'fa-triangle-exclamation' };
    function renderNotice(box, msg, type) {
        if (!box) return;
        clearTimeout(box._t);
        if (!msg) { box.style.display = 'none'; box.innerHTML = ''; return; }
        const t = NOTICE_ICON[type] ? type : 'success';
        box.className = 'tdta-notice ' + t;
        box.innerHTML = `<i class="fa-solid ${NOTICE_ICON[t]}"></i><span>${esc(msg)}</span><button type="button" class="tdta-notice-x" aria-label="Đóng thông báo" onclick="this.parentNode.style.display='none'"><i class="fa-solid fa-xmark"></i></button>`;
        box.style.display = 'flex';
    }
    global.formNotice = function (msg, type) {
        const box = $('formNotice');
        renderNotice(box, msg, type);
        if (msg && box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    global.listNotice = function (msg, type) {
        const box = $('listNotice');
        renderNotice(box, msg, type);
        if (msg && box) { box.scrollIntoView({ block: 'nearest' }); box._t = setTimeout(() => { box.style.display = 'none'; }, 15000); }
    };
    global.notify = function (msg, type) { (formOpen() ? global.formNotice : global.listNotice)(msg, type); };

    // ---- Khung báo lỗi đầu form: "Còn [n] trường chưa hợp lệ" + danh sách nhãn trường; bấm nhãn: nhảy tới trường ----
    let errItems = [];
    function labelOf(el) {
        if (/^dmgName_/.test(el.id || '')) return 'Thiệt hại khác - Tên / nội dung thiệt hại';
        const g = el.closest('.form-group');
        const lb = g && g.querySelector('.form-label');
        let t = lb ? lb.textContent : (el.getAttribute('aria-label') || el.placeholder || el.id);
        t = String(t).replace(/\*/g, '').replace(/\s+/g, ' ').trim();
        const err = g && g.querySelector('.error-message');
        const m = err && err.style.display !== 'none' ? err.textContent.trim() : '';
        return m && m !== 'Đây là trường bắt buộc' ? `${t} - ${m}` : t;
    }
    function collectErrors() {
        const body = document.querySelector('#formView .inline-form-body');
        if (!body) return [];
        const out = [];
        body.querySelectorAll('.is-invalid').forEach(el => out.push({ el, label: labelOf(el) }));
        const docsErr = $('docsError');
        if (docsErr && docsErr.style.display === 'block') out.push({ el: $('docsTableWrap') || docsErr, label: 'Tài liệu đính kèm - Vui lòng đính kèm ít nhất 01 tài liệu' });
        body.querySelectorAll('.tdta-row-err').forEach(e => {
            const tb = e.closest('tbody');
            out.push({ el: e.closest('tr') || e, label: (tb && tb.id === 'basisTableBody' ? 'Văn bản làm căn cứ yêu cầu bồi thường' : 'Tài liệu đính kèm') + ' - ' + e.textContent.trim() });
        });
        return out.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1);
    }
    global.tdtaErrSummary = function (show) {
        const box = $('formErrSummary');
        if (!box) return null;
        if (!show) { errItems = []; box.style.display = 'none'; box.innerHTML = ''; return null; }
        errItems = collectErrors();
        if (!errItems.length) { box.style.display = 'none'; box.innerHTML = ''; return null; }
        box.innerHTML = `<div class="tdta-err-head"><i class="fa-solid fa-circle-exclamation"></i> Còn ${errItems.length} trường chưa hợp lệ</div>`
            + `<ul>${errItems.map((it, i) => `<li><a href="javascript:void(0)" onclick="tdtaGoErr(${i})">${esc(it.label)}</a></li>`).join('')}</ul>`;
        box.style.display = 'block';
        return errItems[0].el;
    };
    global.tdtaGoErr = function (i) {
        const it = errItems[i];
        if (!it) return;
        it.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof it.el.focus === 'function' && /^(INPUT|SELECT|TEXTAREA)$/.test(it.el.tagName)) it.el.focus({ preventScroll: true });
    };
    // Sửa trường đang lỗi: xóa lỗi của trường ngay, cập nhật khung báo lỗi
    function clearFieldError(t) {
        if (!t || !t.classList || !t.classList.contains('is-invalid')) return;
        if (t.type === 'radio' || t.type === 'checkbox') return;
        if (!String(t.value || '').trim()) return;
        t.classList.remove('is-invalid');
        t.removeAttribute('aria-invalid');
        const g = t.closest('.form-group');
        const err = g && g.querySelector('.error-message');
        if (err && !err.classList.contains('tdta-row-err')) err.style.display = 'none';
        const box = $('formErrSummary');
        if (box && box.style.display !== 'none') global.tdtaErrSummary(true);
    }

    // ---- Hủy bỏ: form có thay đổi chưa lưu thì hỏi xác nhận (cùng popup Cảnh báo thay đổi chưa lưu của Giải quyết YCBT) ----
    let snapAtOpen = '';
    function snapshot() {
        const body = document.querySelector('#formView .inline-form-body');
        if (!body) return '';
        const vals = [];
        body.querySelectorAll('input, select, textarea').forEach(el => {
            if (el.type === 'file') return;
            vals.push((el.id || el.name) + '=' + (el.type === 'radio' || el.type === 'checkbox' ? el.checked : el.value));
        });
        const rows = l => JSON.stringify((l || []).map(d => [d.name || '', d.file || '']));
        return vals.join('|') + '#' + rows(typeof basisRows !== 'undefined' ? basisRows : []) + rows(typeof docRows !== 'undefined' ? docRows : []) + '#' + (link ? link.code : '');
    }
    global.tdtaIsDirty = function () { return formOpen() && !isFormReadOnly && snapshot() !== snapAtOpen; };
    global.tdtaCancelForm = function () {
        if (!global.tdtaIsDirty()) { closeCaseForm(); return; }
        showConfirm('Thay đổi của bạn chưa được lưu. Bạn có chắc chắn muốn Đóng không?', () => closeCaseForm(), 'Cảnh báo thay đổi chưa lưu',
            { yes: 'Có (Đóng)', no: 'Không (Quay lại)', yesClass: 'btn-danger' });
    };

    // ---- Combobox nội dung dài (Nguồn phát sinh bản án, Trường hợp khởi kiện): tooltip đủ nội dung giá trị đang chọn ----
    global.tdtaSelectHint = function (sel) {
        if (!sel) return;
        const o = sel.options[sel.selectedIndex];
        sel.title = o && o.value ? o.text : '';
    };

    // ---- Giới hạn độ dài theo kiểu dữ liệu, bộ đếm ký tự, ô điện thoại chỉ nhận số ----
    const MAXLEN = {
        caseVerdictNo: 100, claimNYCName: 255, claimNYCOrgCode: 50, claimNYCRepName: 100, claimNYCRepPosition: 100, claimNYCPhone: 20, claimNYCEmail: 255,
        claimNYCOrgDocNo: 50, claimNYCOrgDocPlace: 255, claimNYCCardNo: 20, claimNYCCardPlace: 255, claimNYCCityText: 100, claimNYCWard: 100, claimNYCAddress: 1000,
        claimNbthOrgName: 255, claimNbthOrgCode: 50, claimNbthName: 100, claimNbthPhone: 20, claimNbthEmail: 255, claimNbthCardNo: 20, claimNbthCardPlace: 255,
        claimNbthCityText: 100, claimNbthWard: 100, claimNbthAddress: 1000, claimHanhVi: 2000, claimNhanQua: 4000
    };
    const COUNTERS = ['claimHanhVi', 'claimNhanQua', 'claimNYCAddress', 'claimNbthAddress'];
    function updateCounter(id) {
        const el = $(id), c = $('cnt_' + id);
        if (el && c) c.textContent = `${el.value.length}/${el.maxLength}`;
    }
    global.tdtaRefreshCounters = function () { COUNTERS.forEach(updateCounter); };
    function setupFields() {
        Object.keys(MAXLEN).forEach(id => { const el = $(id); if (el) el.maxLength = MAXLEN[id]; });
        COUNTERS.forEach(id => {
            const el = $(id);
            if (!el || $('cnt_' + id)) return;
            const c = document.createElement('div');
            c.id = 'cnt_' + id;
            c.className = 'tdta-counter tdta-edit-only';
            c.setAttribute('aria-live', 'polite');
            el.insertAdjacentElement('afterend', c);
            el.addEventListener('input', () => updateCounter(id));
        });
        ['claimNYCPhone', 'claimNbthPhone'].forEach(id => {
            const el = $(id);
            if (!el) return;
            el.setAttribute('inputmode', 'numeric');
            el.addEventListener('input', () => { const v = el.value.replace(/\D/g, ''); if (v !== el.value) el.value = v; });
        });
        // Nhãn gắn với trường (label for): đổi nhãn dạng span còn lại trong form
        document.querySelectorAll('#formView .inline-form-body .form-group > span.form-label').forEach(sp => {
            const g = sp.parentNode;
            const ctl = g.querySelector('input:not([type=radio]):not([type=checkbox]):not([type=file]), select, textarea');
            if (!ctl || !ctl.id) return;
            const lb = document.createElement('label');
            lb.className = sp.className;
            lb.htmlFor = ctl.id;
            lb.innerHTML = sp.innerHTML;
            g.replaceChild(lb, sp);
        });
        // Datepicker mở khi focus vào ô (kể cả dùng phím Tab)
        document.querySelectorAll('#formView .inline-form-body input').forEach(el => {
            if (!el._flatpickr || el._tdtaFp) return;
            el._tdtaFp = true;
            el.addEventListener('focus', () => { if (!el.disabled && el._flatpickr) el._flatpickr.open(); });
        });
        const fv = $('formView');
        ['input', 'change'].forEach(ev => fv.addEventListener(ev, e => clearFieldError(e.target), true));
    }
    // Tên tài liệu, văn bản trong bảng: tối đa 255 ký tự
    ['renderBasisRows', 'renderDocRows'].forEach(fn => {
        const base = global[fn];
        if (typeof base !== 'function') return;
        global[fn] = function () {
            const res = base.apply(this, arguments);
            document.querySelectorAll(`#${fn === 'renderBasisRows' ? 'basisTableBody' : 'docsTableBody'} input.form-control`).forEach(el => { el.maxLength = 255; });
            const box = $('formErrSummary');
            if (box && box.style.display !== 'none') global.tdtaErrSummary(true);
            return res;
        };
    });

    // ---- Mở form: lưu ảnh chụp dữ liệu (kiểm tra thay đổi chưa lưu), tooltip combobox, bộ đếm ----
    const uxBaseOpen = global.openCaseForm;
    global.openCaseForm = function () {
        renderNotice($('formNotice'), '');
        uxBaseOpen.apply(this, arguments);
        if (!formOpen()) return;
        ['caseVerdictSource', 'caseLawsuitCase'].forEach(id => global.tdtaSelectHint($(id)));
        global.tdtaNbthCountryChange(getValue('claimNbthCountry'));
        global.tdtaRefreshCounters();
        global.tdtaErrSummary(null);
        snapAtOpen = snapshot();
    };

    // ---- Popup Tìm kiếm vụ việc liên kết: rộng ~95vw, cố định cột Thao tác, cột tên dài rút gọn + tooltip, focus ô đầu, Esc để đóng ----
    const uxBaseOpenLookup = global.tdtaOpenLookup;
    global.tdtaOpenLookup = function () {
        uxBaseOpenLookup.apply(this, arguments);
        const f = $('tdtaPopCode');
        if (f) setTimeout(() => f.focus(), 0);
    };
    const uxBaseSearch = global.tdtaLookupSearch;
    global.tdtaLookupSearch = function () {
        uxBaseSearch.apply(this, arguments);
        document.querySelectorAll('#tdtaPopBody tr').forEach(tr => {
            if (tr.children[6] && tr.children.length >= 11) tr.children[6].classList.add('tdta-lv');
            [3, 4, 5, 8, 9, 10].forEach(i => {
                const td = tr.children[i];
                if (!td || tr.children.length < 11) return;
                td.classList.add('tdta-ell');
                const inner = td.querySelector('[title]');
                td.title = inner ? inner.title : td.textContent.trim();
            });
        });
    };
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        const m = $('tdtaLookup'), cf = $('confirmOverlay');
        if (cf && cf.style.display === 'flex') return;
        if (m && m.classList.contains('visible')) { e.preventDefault(); global.tdtaCloseLookup(); const b = $('tdtaBtnAdv'); if (b) b.focus(); }
    });

    (function uxStyles() {
        const st = document.createElement('style');
        st.textContent = [
            '#formView .inline-form-body .form-label, #formView .inline-form-body .form-control, #formView .inline-form-body .radio-line, #formView .inline-form-body label { font-size:14px; }',
            '#formView .tdta-sec { background:#f8fafc; padding:16px; border:1px solid var(--border-color); border-radius:var(--border-radius-md); margin-bottom:20px; }',
            '#formView .tdta-sec .form-group { margin-bottom:14px; }',
            '#formView .form-hint { font-size:13px; color:#475569; margin-top:4px; }',
            '#formView .tdta-counter { font-size:12.5px; color:#475569; text-align:right; margin-top:2px; }',
            '#formView .error-message { color:#b91c1c; font-size:13px; }',
            '#formView .error-message:not(.tdta-row-err)::before { content:"\\f06a"; font-family:"Font Awesome 6 Free"; font-weight:900; margin-right:5px; }',
            '#formView.readonly-mode .tdta-edit-only, #formView.readonly-mode .form-hint { display:none !important; }',
            '.tdta-notice { display:flex; align-items:flex-start; gap:10px; padding:10px 14px; border-radius:8px; margin-bottom:14px; font-size:14px; border:1px solid; }',
            '.tdta-notice > span { flex:1; }',
            '.tdta-notice.success { background:#f0fdf4; border-color:#86efac; color:#14532d; }',
            '.tdta-notice.error { background:#fef2f2; border-color:#fca5a5; color:#7f1d1d; }',
            '.tdta-notice.info, .tdta-notice.warning { background:#eff6ff; border-color:#93c5fd; color:#1e3a8a; }',
            '.tdta-notice-x { background:none; border:0; cursor:pointer; color:inherit; padding:0 2px; }',
            '.tdta-err-summary { background:#fef2f2; border:1px solid #fca5a5; border-left:4px solid #dc2626; border-radius:8px; padding:12px 16px; margin-bottom:16px; color:#7f1d1d; font-size:14px; }',
            '.tdta-err-head { font-weight:700; margin-bottom:6px; }',
            '.tdta-err-summary ul { margin:0; padding-left:20px; columns:3 260px; column-gap:24px; }',
            '.tdta-err-summary a { color:#991b1b; text-decoration:underline; }',
            '#tdtaLinkedBlock input[readonly] { background:#f1f5f9; color:#334155; cursor:default; }',
            '#formView.readonly-mode .inline-form-footer > div { align-items:center; }',
            '#formView.readonly-mode #btnFormDelete { order:-1; margin-right:auto; background-color:#fff !important; color:#DC2626 !important; border:1px solid #FCA5A5 !important; }',
            '#formView.readonly-mode #btnFormDelete:hover { background-color:#FEF2F2 !important; border-color:#F87171 !important; }',
            '#formView.readonly-mode #btnFormBack { order:1; }',
            '#formView.readonly-mode #btnFormEdit { order:2; }',
            '.tdta-modal { width:95vw !important; max-width:none !important; }',
            '.tdta-table th:last-child, .tdta-table td:last-child { position:sticky; right:0; z-index:1; box-shadow:-6px 0 8px -6px rgba(15,23,42,.2); }',
            '.tdta-table th:last-child { background:#f1f5f9; }',
            '.tdta-table td:last-child { background:#fff; }',
            '.tdta-table tbody tr.tdta-pick:hover td { background:#eff6ff; }',
            '.tdta-table td.tdta-ell { max-width:160px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }',
            '.tdta-table td.tdta-lv { min-width:150px; }'
        ].join('\n');
        document.head.appendChild(st);
    })();

    // ===================== Khởi tạo =====================
    (function () {
        const st = document.createElement('style');
        st.textContent = '#tdtaLinkedBlock input[readonly]{background:#f1f5f9;color:#334155;cursor:default;}#tdtaLinkedBlock button:disabled{opacity:.55;cursor:not-allowed;}';
        document.head.appendChild(st);
    })();
    if (W && typeof W.fillPersonalDocTypeSelect === 'function') {
        W.fillPersonalDocTypeSelect('claimNYCCardType', '-- Chọn loại giấy tờ --');
        W.fillPersonalDocTypeSelect('claimNbthCardType', '-- Chọn loại giấy tờ --');
    }
    fillCountrySelect('claimNYCCountry');
    fillCountrySelect('claimNbthCountry');
    fillRoles(ROLE_NBTH);
    global.tdtaUpdateWardOptions(false);
    if (typeof flatpickr === 'function') {
        const fp = (flatpickr.l10ns && flatpickr.l10ns.vn) || 'default';
        ['#claimNYCOrgDocDate'].forEach(sel => { if (document.querySelector(sel)) flatpickr(sel, { dateFormat: 'd/m/Y', allowInput: true, locale: fp }); });
    }
    ['caseVerdictSource', 'caseLawsuitCase'].forEach(id => { const el = $(id); if (el) el.addEventListener('change', applyLinkVisibility); });
    // [ux] Sau khi trang khởi tạo datepicker: giới hạn độ dài, bộ đếm, nhãn, datepicker mở khi focus
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(setupFields, 0));
    else setupFields();
})(window);
