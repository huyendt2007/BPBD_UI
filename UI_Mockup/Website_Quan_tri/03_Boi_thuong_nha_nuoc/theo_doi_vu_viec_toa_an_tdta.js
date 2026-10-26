/*
 * [tdta] Add-on màn hình Theo dõi vụ việc tại Tòa án (mockup).
 * - Khối "Thông tin vụ việc liên kết": hiển thị khi Trường hợp khởi kiện = "Đã yêu cầu cơ quan giải quyết trước khi khởi kiện..."
 *   hoặc Nguồn phát sinh bản án = "Khởi kiện theo thủ tục tố tụng dân sự sau khi giải quyết tại cơ quan trực tiếp quản lý...";
 *   Tìm kiếm theo Mã vụ việc / Tìm kiếm nâng cao (popup), chỉ trả vụ việc có trạng thái khác "Hoàn thành".
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
        setValue('claimNYCCardType', n.cardType || 'CMND/CCCD/Chứng minh quân đội');
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
            country: getValue('claimNbthCountry'), city: getValue('claimNbthCity'), ward: getValue('claimNbthWard'), address: getValue('claimNbthAddress')
        };
    };
    global.fillNbth = function (d) {
        d = d || {};
        setValue('claimNbthOrgName', d.orgName || ''); setValue('claimNbthOrgCode', d.orgCode || '');
        setValue('claimNbthName', d.name || ''); setValue('claimNbthBirth', d.dob || ''); setValue('claimNbthPhone', d.phone || ''); setValue('claimNbthEmail', d.email || '');
        setValue('claimNbthCardType', d.docType || ''); setValue('claimNbthCardNo', d.docNo || ''); setValue('claimNbthCardDate', d.docDate || ''); setValue('claimNbthCardPlace', d.docPlace || '');
        setCountry('claimNbthCountry', d.country); setValue('claimNbthCity', d.city || ''); setValue('claimNbthWard', strip(d.ward || '')); setValue('claimNbthAddress', d.address || '');
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
    function linkedElsewhere(code) {
        return cases.some(c => c && !c.deleted && c.id !== editingId && (c.linkedVuViec === code || c.code === code));
    }
    // Vụ việc được phép liên kết: thuộc phạm vi dữ liệu người dùng, trạng thái khác Hoàn thành, chưa liên kết với vụ việc tại Tòa án khác
    function eligible() {
        const C = global.BTNN_CASE;
        if (!C) return [];
        return C.casesInScope().filter(r => r.status !== STATUS_DONE && !linkedElsewhere(r.code))
            .map(r => Object.assign({}, r, { agency: unitName(r.agencyId) }));
    }
    function showLinkError(msg) {
        const inp = $('tdtaLinkCode'), err = $('tdtaLinkCodeError');
        inp.classList.toggle('is-invalid', !!msg);
        err.textContent = msg || 'Đây là trường bắt buộc';
        err.style.display = msg ? 'block' : 'none';
    }
    function renderLink() {
        const has = !!link;
        setValue('tdtaLinkCode', has ? link.code : getValue('tdtaLinkCode'));
        setValue('tdtaLinkHoSo', has ? link.hoSoCode : '');
        setValue('tdtaLinkStatus', has ? link.status : '');
        setValue('tdtaLinkAgency', has ? link.agency : '');
        $('tdtaLinkSelected').style.display = has ? 'flex' : 'none';
        $('tdtaLinkSelectedText').textContent = has ? `Đã chọn: ${link.code} - ${link.requester || '-'}` : '';
        const ro = isFormReadOnly;
        $('tdtaLinkCode').disabled = ro || has;
        $('tdtaBtnSearch').style.display = ro ? 'none' : '';
        $('tdtaBtnAdv').style.display = ro ? 'none' : '';
        $('tdtaBtnSearch').disabled = has;
        $('tdtaBtnAdv').disabled = has;
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
    function nycFromClaim(c) {
        return {
            type: c.nycType, role: c.nycRole || c.role, name: typeof c.nyc === 'string' ? c.nyc : (c.nyc && c.nyc.name) || '',
            birth: c.nycBirth || c.nycDob || '', victimAlive: c.victimAlive || 'yes', phone: c.nycPhone || c.phone || '', email: c.nycEmail || '',
            cardType: c.nycCardType || c.cardType || '', cardNo: c.nycCardNo || c.cardNo || '', cardDate: c.nycCardDate || '', cardPlace: c.nycCardPlace || '',
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
    }
    // Tìm kiếm nhanh theo Mã vụ việc (nhận cả Mã hồ sơ)
    global.tdtaQuickSearch = function () {
        const v = getValue('tdtaLinkCode');
        if (!v) { showLinkError('Đây là trường bắt buộc'); $('tdtaLinkCode').focus(); return; }
        const f = fold(v);
        const hit = eligible().find(r => fold(r.code) === f || fold(r.hoSoCode) === f);
        if (hit) { choose(hit); showToast(`Đã chọn vụ việc ${hit.code}.`, 'success'); }
        else { showLinkError('Không tìm thấy vụ việc phù hợp hoặc vụ việc đã Hoàn thành'); $('tdtaLinkCode').focus(); }
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
            '.tdta-modal{background:#fff;border-radius:12px;width:min(1180px,100%);box-shadow:0 20px 50px rgba(15,23,42,.3);display:flex;flex-direction:column;max-height:calc(100vh - 40px);}',
            '.tdta-head{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:15px;color:#0f172a;}',
            '.tdta-body{padding:16px 18px;overflow:auto;}',
            '.tdta-note{margin-bottom:12px;padding:8px 12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;font-size:13px;color:#1e3a8a;}',
            '.tdta-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 14px;}',
            '.tdta-grid label{display:block;font-size:13px;font-weight:600;color:#334155;margin-bottom:4px;}',
            '.tdta-grid input,.tdta-grid select{width:100%;box-sizing:border-box;height:36px;border:1px solid #cbd5e1;border-radius:6px;padding:4px 10px;font:inherit;font-size:13px;}',
            '.tdta-actions{display:flex;justify-content:flex-end;gap:8px;margin:12px 0;}',
            '.tdta-table{width:100%;border-collapse:collapse;font-size:13px;}',
            '.tdta-table th{background:#f1f5f9;text-align:left;padding:9px 10px;color:#334155;border-bottom:1px solid #e2e8f0;white-space:nowrap;}',
            '.tdta-table td{padding:9px 10px;border-bottom:1px solid #f1f5f9;vertical-align:middle;}',
            '.tdta-table tbody tr{cursor:pointer;}',
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
                    <div class="tdta-note"><i class="fa-solid fa-shield-halved"></i> Phạm vi dữ liệu: <b id="tdtaPopScope"></b>. Chỉ hiển thị vụ việc có trạng thái khác "Hoàn thành".</div>
                    <div class="tdta-grid">
                        ${inp('tdtaPopCode', 'Mã vụ việc', 'Nhập mã vụ việc...')}
                        ${inp('tdtaPopHoSo', 'Mã hồ sơ', 'Nhập mã hồ sơ...')}
                        ${inp('tdtaPopReq', 'Tên cá nhân/Tổ chức yêu cầu', 'Nhập tên cá nhân/tổ chức yêu cầu...')}
                        ${inp('tdtaPopVictim', 'Tên cá nhân/Tổ chức bị thiệt hại', 'Nhập tên cá nhân/tổ chức bị thiệt hại...')}
                        ${inp('tdtaPopAgency', 'Cơ quan giải quyết', 'Nhập cơ quan giải quyết...')}
                        <div><label for="tdtaPopStatus">Trạng thái</label><select id="tdtaPopStatus"></select></div>
                    </div>
                    <div class="tdta-actions">
                        <button type="button" class="btn btn-secondary" onclick="tdtaLookupClear()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
                        <button type="button" class="btn btn-primary" onclick="tdtaLookupSearch()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
                    </div>
                    <table class="tdta-table" id="tdtaPopTable">
                        <thead><tr><th style="width:50px;text-align:center;">STT</th><th>Mã vụ việc</th><th>Mã hồ sơ</th><th>Tên cá nhân/Tổ chức yêu cầu</th><th>Tên cá nhân/Tổ chức bị thiệt hại</th><th>Cơ quan giải quyết</th><th>Trạng thái</th><th style="text-align:center;">Thao tác</th></tr></thead>
                        <tbody id="tdtaPopBody"></tbody>
                    </table>
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
        $('tdtaPopScope').textContent = C ? C.scope().label : '';
        const statuses = (C ? C.STATUS_OPTIONS : []).filter(s => s !== STATUS_DONE);
        $('tdtaPopStatus').innerHTML = '<option value="">Tất cả</option>' + statuses.map(s => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('');
        POP_FIELDS.forEach(id => setValue(id, ''));
        setValue('tdtaPopCode', getValue('tdtaLinkCode'));
        global.tdtaLookupSearch();
        $('tdtaLookup').classList.add('visible');
    };
    global.tdtaCloseLookup = function () { const m = $('tdtaLookup'); if (m) m.classList.remove('visible'); };
    global.tdtaLookupClear = function () { POP_FIELDS.forEach(id => setValue(id, '')); global.tdtaLookupSearch(); };
    global.tdtaLookupSearch = function () {
        const f = { code: fold(getValue('tdtaPopCode')), hoSo: fold(getValue('tdtaPopHoSo')), req: fold(getValue('tdtaPopReq')), victim: fold(getValue('tdtaPopVictim')), agency: fold(getValue('tdtaPopAgency')) };
        const status = getValue('tdtaPopStatus');
        popRows = eligible().filter(r => {
            if (f.code && !fold(r.code).includes(f.code)) return false;
            if (f.hoSo && !fold(r.hoSoCode).includes(f.hoSo)) return false;
            if (f.req && !fold(r.requester).includes(f.req)) return false;
            if (f.victim && !fold(r.victim).includes(f.victim)) return false;
            if (f.agency && !fold(r.agency).includes(f.agency)) return false;
            if (status && r.status !== status) return false;
            return true;
        });
        $('tdtaPopBody').innerHTML = popRows.length ? popRows.map((r, i) => `<tr onclick="tdtaLookupChoose(${i})">
                <td style="text-align:center;">${i + 1}</td>
                <td style="white-space:nowrap;font-weight:600;">${escapeHtml(r.code)}</td>
                <td style="white-space:nowrap;"><a title="Mở xem chi tiết hồ sơ tại tab mới" onclick="event.stopPropagation(); BTNN_CASE.openDetail('${escapeAttr(r.hoSoCode)}')">${escapeHtml(r.hoSoCode)}</a></td>
                <td>${escapeHtml(r.requester || '-')}</td><td>${escapeHtml(r.victim || '-')}</td><td>${escapeHtml(r.agency || '-')}</td>
                <td><span class="tdta-badge">${escapeHtml(r.status)}</span></td>
                <td style="text-align:center;"><button type="button" class="btn btn-primary btn-sm" onclick="event.stopPropagation(); tdtaLookupChoose(${i})"><i class="fa-solid fa-check"></i> Chọn</button></td>
            </tr>`).join('') : '<tr><td colspan="8" class="tdta-empty">Không tìm thấy dữ liệu phù hợp. [MSG-INF-SYS-001]</td></tr>';
    };
    global.tdtaLookupChoose = function (i) {
        const r = popRows[i];
        if (!r) return;
        global.tdtaCloseLookup();
        choose(r);
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
                                <button class="icon-btn edit" title="Cập nhật" onclick="event.stopPropagation(); openCaseForm('${id}', false)"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="icon-btn delete" title="Xóa" onclick="event.stopPropagation(); confirmDeleteCase('${id}')"><i class="fa-solid fa-trash-can"></i></button>
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
        list.forEach(r => {
            r.nyc = Object.assign({ type: T_CN, ward: '' }, r.nyc);
            if (r.nyc.cardType === 'CCCD') r.nyc.cardType = 'CMND/CCCD/Chứng minh quân đội';
            if (r.nbth && r.nbth.docType === 'CCCD') r.nbth.docType = 'CMND/CCCD/Chứng minh quân đội';
            if (!r.hoSoCode) r.hoSoCode = '';
        });
        const r302 = list.find(r => r.code === 'BT-2026-302');
        if (r302) {
            linkTo(r302, 'BT-2026-030');
            Object.assign(r302.nyc, { name: 'Trần Thị Mai', birth: '14/03/1979', city: 'Đà Nẵng', ward: 'Phường Hải Châu', address: 'Số 18 Bạch Đằng' });
        }
        const r308 = list.find(r => r.code === 'BT-2026-308');
        if (r308) {
            linkTo(r308, 'BT-2026-052');
            r308.nyc = {
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
})(window);
