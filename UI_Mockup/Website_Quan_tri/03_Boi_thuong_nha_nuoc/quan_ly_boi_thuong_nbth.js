/*
 * [nbth] Giải quyết YCBT (quan_ly_boi_thuong.html) - form Nhập liệu hồ sơ vụ việc (bước Thụ lý = Trình duyệt Thông báo thụ lý)
 * - Khối Người bị thiệt hại: Loại Cá nhân/Tổ chức, bộ trường như khối Người yêu cầu; bắt buộc như khối Người yêu cầu:
 *   Cá nhân: Họ và tên, Ngày sinh, Loại/Số giấy tờ thân nhân, Số điện thoại, Quốc gia, Tỉnh/Thành phố, Phường/Xã, Địa chỉ chi tiết
 *   Tổ chức: Tên tổ chức, Mã số tổ chức, Họ và tên người đại diện theo pháp luật, Chức vụ người đại diện, Số điện thoại, Quốc gia, Tỉnh/Thành phố, Phường/Xã, Địa chỉ chi tiết
 * - Tổ chức bị thiệt hại đã chấm dứt tồn tại (TCNYC_03): bổ sung địa bàn (claim.nbthOrgAddr); bắt buộc Tên tổ chức, Quốc gia, Tỉnh/Thành phố, Phường/Xã, Địa chỉ chi tiết
 * - Trình Thông báo thụ lý (openTndModal): hồ sơ thiếu thông tin -> chặn, mở form Nhập liệu, tô lỗi, focus ô lỗi đầu tiên
 * - Dữ liệu cũ (nbth không có type) -> Cá nhân. Dữ liệu mẫu: BT-2026-092 (bổ sung địa bàn), BT-2026-095 (NBTH tổ chức), BT-2026-096 (thiếu thông tin NBTH)
 * Đặt trước quan_ly_boi_thuong_cdpd.js (cdpd bọc openTndModal ngoài cùng).
 */
(function () {
    'use strict';
    var VN = 'Việt Nam', T_CN = 'Cá nhân', T_TC = 'Tổ chức';
    var SEED_VER = '20261027nbth3';
    var MSG_EMAIL = 'Địa chỉ email không đúng định dạng (ví dụ: abc@domain.com)';
    var MSG_PHONE = 'Số điện thoại không hợp lệ (độ dài 8-15 ký tự, bắt đầu bằng 0 hoặc +)';
    var CLEAR = "this.classList.remove('is-invalid'); var g=this.closest('.form-group'); if(g&&g.querySelector('.error-message')) g.querySelector('.error-message').style.display='none';";
    function el(id) { return document.getElementById(id); }
    function gv(id) { var e = el(id); return e ? String(e.value || '').trim() : ''; }
    function sv(id, v) { var e = el(id); if (e) e.value = v == null ? '' : v; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function star() { return '<span class="required">*</span>'; }
    function errDiv() { return '<div class="error-message">Đây là trường bắt buộc</div>'; }
    function fg(label, ctrl, cls, req) {
        return '<div class="form-group ' + (cls || '') + '" style="margin-bottom: 0;"><span class="form-label">' + label + (req ? star() : '') + '</span>' + ctrl + (req ? errDiv() : '') + '</div>';
    }
    function inp(id, ph) { return '<input type="text" class="form-control" id="' + id + '" placeholder="' + ph + '" oninput="' + CLEAR + '">'; }
    function addStar(id) {
        var e = el(id); if (!e) return;
        var g = e.closest('.form-group'); if (!g) return;
        var lb = g.querySelector('.form-label');
        if (lb && !lb.querySelector('.required')) lb.insertAdjacentHTML('beforeend', star());
        if (!g.querySelector('.error-message')) g.insertAdjacentHTML('beforeend', errDiv());
        if (!e.dataset.nbthClr) { e.dataset.nbthClr = '1'; e.addEventListener('input', function () { this.classList.remove('is-invalid'); var x = this.closest('.form-group').querySelector('.error-message'); if (x) x.style.display = 'none'; }); e.addEventListener('change', function () { this.classList.remove('is-invalid'); var x = this.closest('.form-group').querySelector('.error-message'); if (x) x.style.display = 'none'; }); }
    }
    // Ô Tỉnh/Thành phố: Việt Nam -> combobox (Danh mục địa bàn như khối Người yêu cầu); quốc gia khác -> nhập tự do
    function cityCtrl(p) {
        var src = el('claimNYCCity');
        var opts = src ? Array.from(src.options).filter(function (o) { return o.value; }).map(function (o) { return '<option value="' + esc(o.value) + '">' + esc(o.textContent) + '</option>'; }).join('') : '';
        opts = '<option value="">-- Chọn tỉnh/thành phố --</option>' + opts;
        return '<select class="form-control" id="' + p + 'City" onchange="nbthGqCityChange(\'' + p + '\')">' + opts + '</select>'
            + '<input type="text" class="form-control" id="' + p + 'CityText" placeholder="Nhập tỉnh/thành ngoại quốc..." style="display:none;" oninput="' + CLEAR + '">';
    }
    function wardCtrl(p) {
        return '<input type="text" class="form-control" id="' + p + 'Ward" list="' + p + 'WardList" placeholder="Gõ Mã hoặc Tên Phường/Xã..." onfocus="nbthGqWardOptions(\'' + p + '\', false)" oninput="' + CLEAR + '"><datalist id="' + p + 'WardList"></datalist>';
    }

    // ---------- Dựng DOM ----------
    function build() {
        var person = el('claimNbthPersonBlock');
        if (!person || person.dataset.nbth === '1') return;
        person.dataset.nbth = '1';
        var cols = person.children;
        var left = cols[0], right = cols[1];
        // Loại người bị thiệt hại
        var title = left.firstElementChild;
        title.insertAdjacentHTML('afterend',
            '<div class="form-group" style="margin-bottom: 0;"><span class="form-label">Loại người bị thiệt hại' + star() + '</span>'
            + '<div id="claimNbthTypeGroup" style="display: flex; gap: 24px; align-items: center; height: 38px; padding-left: 5px;">'
            + '<label style="cursor: pointer; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; font-weight: 500; color: var(--text-main);"><input type="radio" name="claimNbthType" value="Cá nhân" checked onchange="nbthGqToggleType()"> Cá nhân</label>'
            + '<label style="cursor: pointer; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; font-weight: 500; color: var(--text-main);"><input type="radio" name="claimNbthType" value="Tổ chức" onchange="nbthGqToggleType()"> Tổ chức</label>'
            + '</div></div>');
        // Họ và tên / Tên tổ chức
        var nameLb = el('claimNbthName').closest('.form-group').querySelector('.form-label');
        nameLb.innerHTML = '<span id="claimNbthNameLabel">Họ và tên</span>' + star();
        // Ngày sinh: chỉ Cá nhân
        var birthG = el('claimNbthBirth').closest('.form-group');
        birthG.classList.add('nbth-canhan-only');
        // Tổ chức: Mã số tổ chức, Người đại diện, Chức vụ
        birthG.insertAdjacentHTML('afterend',
            fg('Mã số tổ chức', inp('claimNbthPOrgCode', 'Mã số doanh nghiệp / mã số thuế / mã số khác...'), 'nbth-tochuc-only', true)
            + '<div class="grid-2 nbth-tochuc-only" style="gap: 12px; margin-bottom: 0;">'
            + fg('Họ và tên người đại diện theo pháp luật', inp('claimNbthRepName', 'Nhập họ và tên người đại diện...'), '', true)
            + fg('Chức vụ người đại diện', inp('claimNbthRepPosition', 'Nhập chức vụ...'), '', true)
            + '</div>');
        addStar('claimNbthPhone');
        // Cột phải: giấy tờ thân nhân chỉ Cá nhân; Tổ chức: giấy tờ thành lập/đăng ký
        var cardGrid = el('claimNbthCardType').closest('.grid-2');
        var cardDateGrid = el('claimNbthCardDate').closest('.grid-2');
        cardGrid.classList.add('nbth-canhan-only');
        cardDateGrid.classList.add('nbth-canhan-only');
        cardGrid.insertAdjacentHTML('beforebegin',
            fg('Số giấy tờ thành lập/đăng ký', inp('claimNbthOrgDocNo', 'Nhập số giấy tờ thành lập/đăng ký...'), 'nbth-tochuc-only', false)
            + '<div class="grid-2 nbth-tochuc-only" style="gap: 12px; margin-bottom: 0;">'
            + fg('Ngày cấp', inp('claimNbthOrgDocDate', 'dd/mm/yyyy'), '', false)
            + fg('Nơi cấp', inp('claimNbthOrgDocPlace', 'Nhập nơi cấp...'), '', false)
            + '</div>');
        // Quốc gia / Tỉnh / Phường / Địa chỉ: như khối Người yêu cầu
        var country = el('claimNbthCountry');
        country.setAttribute('onchange', "nbthGqCountryChange('claimNbth')");
        addStar('claimNbthCountry');
        var oldCity = el('claimNbthCity'), cityG = oldCity.closest('.form-group');
        cityG.innerHTML = '<span class="form-label">Tỉnh/Thành phố' + star() + '</span>' + cityCtrl('claimNbth') + errDiv();
        var oldWard = el('claimNbthWard'), wardG = oldWard.closest('.form-group');
        wardG.innerHTML = '<span class="form-label">Phường/Xã' + star() + '</span>' + wardCtrl('claimNbth') + errDiv();
        addStar('claimNbthAddress');
        // Tổ chức bị thiệt hại đã chấm dứt tồn tại: địa bàn (không có Email, Số điện thoại)
        var org = el('claimNbthOrgBlock');
        org.insertAdjacentHTML('beforeend',
            fg('Quốc gia', '<select class="form-control" id="claimNbthOrgCountry" onchange="nbthGqCountryChange(\'claimNbthOrg\')"></select>', '', true)
            + fg('Tỉnh/Thành phố', cityCtrl('claimNbthOrg'), '', true)
            + fg('Phường/Xã', wardCtrl('claimNbthOrg'), '', true)
            + fg('Địa chỉ chi tiết', '<textarea class="form-control" id="claimNbthOrgAddress" rows="2" style="width: 100%; min-height: 64px; resize: vertical;" placeholder="Nhập số nhà, tên đường/phố, thôn/xóm/ấp..." oninput="' + CLEAR + '"></textarea>', '', true));
        if (typeof fillClaimCountrySelect === 'function') { fillClaimCountrySelect('claimNbthCountry'); fillClaimCountrySelect('claimNbthOrgCountry'); }
        if (typeof flatpickr !== 'undefined') flatpickr('#claimNbthOrgDocDate', { dateFormat: 'd/m/Y', allowInput: true });
        // [E3] Câu lỗi định dạng Số điện thoại / Email (khối Người yêu cầu và Người bị thiệt hại)
        [['claimNYCPhone', MSG_PHONE], ['claimNYCEmail', MSG_EMAIL], ['claimNbthPhone', MSG_PHONE], ['claimNbthEmail', MSG_EMAIL]].forEach(function (x) {
            var e = el(x[0]), g = e && e.closest('.form-group');
            if (!g || g.querySelector('.nbth-fmt-err')) return;
            g.insertAdjacentHTML('beforeend', '<div class="error-message nbth-fmt-err">' + x[1] + '</div>');
            e.addEventListener('input', function () { this.classList.remove('is-invalid'); g.querySelectorAll('.error-message').forEach(function (m) { m.style.display = 'none'; }); });
        });
        nbthGqToggleType();
    }

    // [E3] Định dạng theo quy tắc chung: Email [BR-VAL-002] -> MSG-ERR-VAL-002; Số điện thoại [BR-VAL-003] -> MSG-ERR-VAL-003
    function emailOk(v) { return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(String(v || '').trim()); }
    function phoneOk(v, country) {
        var s = String(v || '').replace(/\s+/g, '');
        return (country || VN) === VN ? /^0\d{9,10}$/.test(s) : /^\+?[1-9]\d{7,14}$/.test(s);
    }
    // Ô có dữ liệu mà sai định dạng: tô lỗi, hiện câu lỗi định dạng; trả về ô lỗi
    function fmtCheck(id, ok) {
        var e = el(id), v = gv(id);
        if (!e || !v || ok(v)) return null;
        var g = e.closest('.form-group'), req = g && g.querySelector('.error-message:not(.nbth-fmt-err)'), m = g && g.querySelector('.nbth-fmt-err');
        if (req) req.style.display = 'none';
        if (m) m.style.display = 'block';
        e.classList.add('is-invalid');
        return e;
    }

    // [E2] Ràng buộc Loại người bị thiệt hại theo Tư cách người yêu cầu (DM_26):
    //   NGUOI_THUA_KE (TCNYC_02), NGUOI_DAI_DIEN_THUA_KE (TCNYC_06) -> khóa Cá nhân; NGUOI_DAI_DIEN (TCNYC_04), NGUOI_DUOC_UY_QUYEN (TCNYC_05) -> chọn Cá nhân/Tổ chức
    //   Bị khóa mà đang là Tổ chức -> chuyển Cá nhân, xóa trường của Tổ chức
    var LOCK_CA_NHAN = ['TCNYC_02', 'TCNYC_06'];
    function applyRoleConstraint(role) {
        var r = role || gv('claimNYCRole');
        var code = window.BTNN_WF && BTNN_WF.nycRoleCode ? BTNN_WF.nycRoleCode(r) : '';
        var locked = !!r && LOCK_CA_NHAN.indexOf(code) >= 0;
        if (locked && getType() === T_TC) {
            setType(T_CN);
            ['claimNbthPOrgCode', 'claimNbthRepName', 'claimNbthRepPosition', 'claimNbthOrgDocNo', 'claimNbthOrgDocDate', 'claimNbthOrgDocPlace'].forEach(function (i) { sv(i, ''); });
        }
        document.querySelectorAll('input[name="claimNbthType"]').forEach(function (x) { x.disabled = locked; x.title = locked ? 'Tư cách người yêu cầu này chỉ áp dụng người bị thiệt hại là Cá nhân' : ''; });
        nbthGqToggleType();
    }
    window.nbthGqApplyRoleConstraint = applyRoleConstraint;

    // ---------- Loại / địa bàn ----------
    function getType() { var r = document.querySelector('input[name="claimNbthType"]:checked'); return r && r.value === T_TC ? T_TC : T_CN; }
    function setType(t) { document.querySelectorAll('input[name="claimNbthType"]').forEach(function (r) { r.checked = r.value === (t === T_TC ? T_TC : T_CN); }); }
    window.nbthGqToggleType = function () {
        var isOrg = getType() === T_TC;
        document.querySelectorAll('#claimNbthPersonBlock .nbth-canhan-only').forEach(function (e) { e.style.display = isOrg ? 'none' : ''; });
        document.querySelectorAll('#claimNbthPersonBlock .nbth-tochuc-only').forEach(function (e) { e.style.display = isOrg ? '' : 'none'; });
        var lb = el('claimNbthNameLabel'); if (lb) lb.textContent = isOrg ? 'Tên tổ chức' : 'Họ và tên';
        var nm = el('claimNbthName'); if (nm) nm.placeholder = isOrg ? 'Nhập tên tổ chức...' : 'Nhập họ và tên...';
        if (typeof toggleNycTypeFields === 'function') { try { toggleNycTypeFields(); } catch (e) { /* bỏ qua */ } }
    };
    function isVn(p) { return (gv(p + 'Country') || VN) === VN; }
    function applyCountry(p) {
        var vn = isVn(p);
        if (el(p + 'City')) el(p + 'City').style.display = vn ? '' : 'none';
        if (el(p + 'CityText')) el(p + 'CityText').style.display = vn ? 'none' : '';
        nbthGqWardOptions(p, false);
    }
    window.nbthGqCountryChange = function (p) { sv(p + 'CityText', ''); sv(p + 'Ward', ''); applyCountry(p); };
    window.nbthGqCityChange = function (p) { var c = el(p + 'City'); if (c) c.classList.remove('is-invalid'); nbthGqWardOptions(p, true); };
    window.nbthGqWardOptions = function (p, clearIfMismatch) {
        var w = el(p + 'Ward'), list = el(p + 'WardList');
        if (!w || !list) return;
        if (!isVn(p)) { w.removeAttribute('list'); list.innerHTML = ''; w.placeholder = 'Nhập phường/xã/khu vực nước ngoài...'; return; }
        w.setAttribute('list', p + 'WardList');
        var wards = (typeof CLAIM_WARD_CATALOG !== 'undefined' && CLAIM_WARD_CATALOG[gv(p + 'City')]) || [];
        list.innerHTML = wards.map(function (x) { return '<option value="' + esc(x) + '"></option>'; }).join('');
        w.placeholder = wards.length ? 'Gõ Mã hoặc Tên Phường/Xã...' : 'Nhập phường/xã...';
        if (clearIfMismatch && w.value) { var cur = stripWardCode(w.value); if (!wards.some(function (x) { return stripWardCode(x) === cur; })) w.value = ''; }
    };
    function claimCity(v) { return typeof mapWfCityToClaimCity === 'function' ? mapWfCityToClaimCity(v) : (v || ''); }
    function fillAddr(p, a) {
        a = a || {};
        setClaimCountry(p + 'Country', a.country || VN);
        if (isVn(p)) {
            var c = claimCity(a.city), sel = el(p + 'City');
            if (sel) { if (c && !Array.from(sel.options).some(function (o) { return o.value === c; })) sel.add(new Option(c, c)); sel.value = c || ''; }
            sv(p + 'CityText', '');
        } else sv(p + 'CityText', a.city || '');
        sv(p + 'Ward', stripWardCode(a.ward || ''));
        sv(p + 'Address', a.address || '');
        applyCountry(p);
    }
    function readAddr(p) {
        var vn = isVn(p);
        return { country: gv(p + 'Country') || VN, city: vn ? gv(p + 'City') : gv(p + 'CityText'), ward: gv(p + 'Ward'), address: gv(p + 'Address') };
    }

    // ---------- Bọc hàm trang ----------
    var oFill = window.fillNbthForm;
    window.fillNbthForm = function (nbth) {
        build();
        if (typeof oFill === 'function') oFill.apply(this, arguments);
        var d = nbth || {};
        setType(d.type === T_TC ? T_TC : T_CN);
        sv('claimNbthPOrgCode', d.orgCode || '');
        sv('claimNbthRepName', d.repName || '');
        sv('claimNbthRepPosition', d.repPosition || '');
        sv('claimNbthOrgDocNo', d.orgDocNo || '');
        sv('claimNbthOrgDocDate', d.orgDocDate || '');
        sv('claimNbthOrgDocPlace', d.orgDocPlace || '');
        fillAddr('claimNbth', d);
        applyRoleConstraint();
    };
    window.collectNbthFromForm = function (role) {
        if (!role || role === NBTH_ROLE || role === NYC_ROLE_TO_CHUC_KE_THUA) return null;
        var isOrg = getType() === T_TC, a = readAddr('claimNbth');
        return {
            type: isOrg ? T_TC : T_CN,
            name: gv('claimNbthName'),
            dob: isOrg ? '' : gv('claimNbthBirth'),
            docType: isOrg ? '' : gv('claimNbthCardType'),
            docNo: isOrg ? '' : gv('claimNbthCardNo'),
            docDate: isOrg ? '' : gv('claimNbthCardDate'),
            docPlace: isOrg ? '' : gv('claimNbthCardPlace'),
            orgCode: isOrg ? gv('claimNbthPOrgCode') : '',
            repName: isOrg ? gv('claimNbthRepName') : '',
            repPosition: isOrg ? gv('claimNbthRepPosition') : '',
            orgDocNo: isOrg ? gv('claimNbthOrgDocNo') : '',
            orgDocDate: isOrg ? gv('claimNbthOrgDocDate') : '',
            orgDocPlace: isOrg ? gv('claimNbthOrgDocPlace') : '',
            phone: gv('claimNbthPhone'), email: gv('claimNbthEmail'),
            country: a.country, city: a.city, ward: a.ward, address: a.address
        };
    };
    // Danh sách ô bắt buộc theo Tư cách / Loại (dùng khi Trình duyệt Thông báo thụ lý)
    function requiredIds(role) {
        if (role === NYC_ROLE_TO_CHUC_KE_THUA) {
            return ['claimNbthOrgName', 'claimNbthOrgCountry', isVn('claimNbthOrg') ? 'claimNbthOrgCity' : 'claimNbthOrgCityText', 'claimNbthOrgWard', 'claimNbthOrgAddress'];
        }
        var addr = ['claimNbthPhone', 'claimNbthCountry', isVn('claimNbth') ? 'claimNbthCity' : 'claimNbthCityText', 'claimNbthWard', 'claimNbthAddress'];
        return getType() === T_TC
            ? ['claimNbthName', 'claimNbthPOrgCode', 'claimNbthRepName', 'claimNbthRepPosition'].concat(addr)
            : ['claimNbthName', 'claimNbthBirth', 'claimNbthCardType', 'claimNbthCardNo'].concat(addr);
    }
    // Gọi khi Lưu form Nhập liệu: định dạng Số điện thoại / Email người yêu cầu; bắt buộc + định dạng khối Người bị thiệt hại
    window.validateNbthForm = function (role) {
        build();
        document.querySelectorAll('#inlineClaimFormPanel .nbth-fmt-err').forEach(function (m) { m.style.display = 'none'; });
        var nycCountry = gv('claimNYCCountry');
        var first = fmtCheck('claimNYCPhone', function (v) { return phoneOk(v, nycCountry); });
        var nycEmailBad = fmtCheck('claimNYCEmail', emailOk);
        first = first || nycEmailBad;
        if (!role || role === NBTH_ROLE) return first;
        var block = el('claimNbthBlock');
        if (!block || block.style.display === 'none') return first;
        requiredIds(role).forEach(function (id) {
            var e = el(id); if (!e) return;
            var bad = !String(e.value || '').trim();
            e.classList.toggle('is-invalid', bad);
            var g = e.closest('.form-group'), err = g ? g.querySelector('.error-message') : null;
            if (err) err.style.display = bad ? 'block' : 'none';
            if (bad && !first) first = e;
        });
        if (role !== NYC_ROLE_TO_CHUC_KE_THUA) {
            var nbCountry = gv('claimNbthCountry');
            var p = fmtCheck('claimNbthPhone', function (v) { return phoneOk(v, nbCountry); });
            var m = fmtCheck('claimNbthEmail', emailOk);
            first = first || p || m;
        }
        return first;
    };
    var oExtra = window.collectNycExtraFromForm;
    window.collectNycExtraFromForm = function (role) {
        var r = oExtra.apply(this, arguments);
        r.nbthOrgAddr = role === NYC_ROLE_TO_CHUC_KE_THUA ? readAddr('claimNbthOrg') : null;
        return r;
    };
    var oOrgFill = window.fillNycOrgForm;
    window.fillNycOrgForm = function (claim) {
        build();
        oOrgFill.apply(this, arguments);
        fillAddr('claimNbthOrg', claim && claim.nbthOrgAddr);
    };
    var oToggle = window.toggleNbthBlock;
    window.toggleNbthBlock = function () {
        build();
        var r = oToggle.apply(this, arguments);
        applyRoleConstraint(arguments[0]);
        return r;
    };
    // Người bị thiệt hại là tổ chức: ẩn Trạng thái người bị thiệt hại (Còn sống / Đã mất) như khối Người yêu cầu
    var oOrgVictim = window.isClaimOrgVictim;
    if (typeof oOrgVictim === 'function') window.isClaimOrgVictim = function (role, type) {
        if (oOrgVictim.apply(this, arguments)) return true;
        var p = el('inlineClaimFormPanel');
        return !!(role && role !== NBTH_ROLE && role !== NYC_ROLE_TO_CHUC_KE_THUA && p && p.style.display !== 'none' && getType() === T_TC);
    };
    var oBuild = window.buildClaimFromWfRecord;
    if (typeof oBuild === 'function') window.buildClaimFromWfRecord = function (rec) {
        var c = oBuild.apply(this, arguments);
        if (c && rec) c.nbthOrgAddr = rec.nbthOrgAddr ? JSON.parse(JSON.stringify(rec.nbthOrgAddr)) : null;
        return c;
    };

    // ---------- Chặn trình Thông báo thụ lý khi thiếu thông tin người bị thiệt hại ----------
    function missing(claim) {
        var role = claim.nycRole || claim.role || NBTH_ROLE;
        if (role === NBTH_ROLE) return false;
        if (role === NYC_ROLE_TO_CHUC_KE_THUA) {
            var a = claim.nbthOrgAddr || {};
            return !claim.nbthOrgName || !a.city || !a.ward || !a.address;
        }
        var n = claim.nbth || {};
        var base = [n.name, n.phone, n.city, n.ward, n.address];
        var more = n.type === T_TC ? [n.orgCode, n.repName, n.repPosition] : [n.dob, n.docType, n.docNo];
        return base.concat(more).some(function (v) { return !String(v || '').trim(); });
    }
    window.nbthGqMissing = function (claimOrId) {
        var c = typeof claimOrId === 'object' ? claimOrId : claimsList.find(function (x) { return x.id === claimOrId; });
        return !!c && missing(c);
    };
    var oTnd = window.openTndModal;
    if (typeof oTnd === 'function') window.openTndModal = function (claimId) {
        var c = claimsList.find(function (x) { return x.id === claimId; });
        if (c && missing(c)) {
            if (typeof showToast === 'function') showToast('Vui lòng nhập đầy đủ thông tin bắt buộc của người bị thiệt hại trước khi trình Thông báo thụ lý!', 'error');
            openInlineClaimForm(claimId);
            setTimeout(function () {
                var first = validateNbthForm(c.nycRole || c.role);
                if (first) { first.scrollIntoView({ block: 'center' }); first.focus(); }
            }, 50);
            return;
        }
        return oTnd.apply(this, arguments);
    };

    // ---------- Xem chi tiết hồ sơ ----------
    window.nbthGqDetailHtml = function (nb, dF, dE) {
        var addr = joinClaimAddress(nb.address, stripWardCode(nb.ward), nb.city);
        if (nb.type === T_TC) {
            return [dF('Loại người bị thiệt hại', T_TC), dF('Tên tổ chức', '<span style="text-transform:uppercase; font-weight:700; color:var(--text-main);">' + dE(nb.name) + '</span>', 2), dF('Mã số tổ chức', dE(nb.orgCode)),
                dF('Số giấy tờ thành lập/đăng ký', dE(nb.orgDocNo)), dF('Ngày cấp', dE(nb.orgDocDate)), dF('Nơi cấp', dE(nb.orgDocPlace)),
                dF('Họ và tên người đại diện theo pháp luật', dE(nb.repName)), dF('Chức vụ người đại diện', dE(nb.repPosition)),
                dF('Số điện thoại', dE(nb.phone)), dF('Email', dE(nb.email)), dF('Quốc gia', dE(nb.country)), dF('Địa chỉ', dE(addr), 4)].join('');
        }
        return [dF('Loại người bị thiệt hại', T_CN), dF('Họ và tên', '<span style="text-transform:uppercase; font-weight:700; color:var(--text-main);">' + dE(nb.name) + '</span>', 2), dF('Ngày sinh', dE(nb.dob)),
            dF('Loại giấy tờ thân nhân', dE(normClaimDocType(nb.docType))), dF('Số giấy tờ thân nhân', dE(nb.docNo)), dF('Ngày cấp', dE(nb.docDate)), dF('Nơi cấp', dE(nb.docPlace)),
            dF('Số điện thoại', dE(nb.phone)), dF('Email', dE(nb.email)), dF('Quốc gia', dE(nb.country)), dF('Địa chỉ', dE(addr), 4)].join('');
    };
    window.nbthGqOrgAddrHtml = function (claim, dF, dE) {
        var a = claim.nbthOrgAddr || {};
        return dF('Quốc gia', dE(a.country || VN)) + dF('Địa chỉ', dE(joinClaimAddress(a.address, stripWardCode(a.ward), a.city)), 4);
    };

    // ---------- Dữ liệu mẫu ----------
    function seedList() {
        var thCode = (window.BTNN_TH && BTNN_TH.codes().filter(function (c) { return /^TH_TN/.test(c); })[0]) || 2;
        var th = function (v) { return [{ type: thCode, code: thCode, group: window.BTNN_TH ? BTNN_TH.groupOf(thCode) : '', calc: 'Thu nhập thực tế bị mất: ' + v.toLocaleString('vi-VN') + ' đ', val: v }]; };
        var base = {
            assignedOfficer: 'Nguyễn Văn Chuyên Viên', fieldGroup: 'hành chính', date: '20/10/2026',
            nycCountry: VN, hinhThucTiepNhan: 'Trực tiếp', nguonHoSo: 'Tiếp nhận mới',
            requestDocDate: '18/10/2026', applicableLaw: 'Luật Trách nhiệm bồi thường của Nhà nước năm 2017',
            status: 'Chờ tiếp nhận', advanceNum: 0, slaDays: 5, slaStatus: 'normal', slaText: 'Chờ tiếp nhận hồ sơ bồi thường',
            restoreHonor: false, requestType: 'money', victimAlive: 'yes', deadline: '20/01/2027', notifyMethod: 'Trực tiếp',
            files: [{ name: 'Van_ban_yeu_cau_boi_thuong.pdf', title: 'Văn bản yêu cầu bồi thường', url: '#' }]
        };
        return [
            Object.assign({}, base, {
                id: 'HS_NBTH_TC', code: 'BT-2026-095', seedNbth: true,
                nyc: 'Lê Minh Tuấn', nycType: T_CN, nycRole: 'Cá nhân, pháp nhân được ủy quyền hợp pháp', role: 'Cá nhân, pháp nhân được ủy quyền hợp pháp',
                nycBirth: '12/05/1985', nycCardType: 'CMND/CCCD/Chứng minh quân đội', cardType: 'CMND/CCCD/Chứng minh quân đội', nycCardNo: '001085006789', cardNo: '001085006789',
                nycPhone: '0912556677', phone: '0912556677', nycEmail: 'tuan.le@gmail.com',
                nycTinhThanh: 'TP. Hồ Chí Minh', nycPhuongXa: 'Phường Bến Thành', nycAddressDetail: 'Số 9 Lê Lợi', address: 'Số 9 Lê Lợi',
                notifyAddress: 'Số 9 Lê Lợi, Phường Bến Thành, TP. Hồ Chí Minh',
                nbth: { type: T_TC, name: 'Công ty TNHH Thương mại Phúc An', orgCode: '0316677889', repName: 'Nguyễn Phúc An', repPosition: 'Giám đốc',
                    orgDocNo: '0316677889', orgDocDate: '10/03/2018', orgDocPlace: 'Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh',
                    phone: '0909112233', email: 'lienhe@phucan.vn', country: VN, city: 'TP. Hồ Chí Minh', ward: '26737 - Phường Sài Gòn', address: 'Số 45 Nguyễn Huệ' },
                hanhVi: 'Quyết định đình chỉ hoạt động kinh doanh trái pháp luật.', nhanQua: 'Doanh nghiệp ngừng kinh doanh 1 tháng, mất thu nhập.',
                totalNum: 180000000, thietHaiList: th(180000000), agency: 'UBND TP. Hồ Chí Minh',
                timeline: [{ title: 'Nộp hồ sơ bồi thường', date: '20/10/2026', desc: 'Người được ủy quyền nộp văn bản yêu cầu bồi thường cho tổ chức bị thiệt hại.', status: 'completed' }]
            }),
            Object.assign({}, base, {
                id: 'HS_NBTH_THIEU', code: 'BT-2026-096', seedNbth: true,
                nyc: 'Trần Thị Hạnh', nycType: T_CN, nycRole: 'Người thừa kế của người bị thiệt hại', role: 'Người thừa kế của người bị thiệt hại',
                nycBirth: '02/09/1990', nycCardType: 'CMND/CCCD/Chứng minh quân đội', cardType: 'CMND/CCCD/Chứng minh quân đội', nycCardNo: '001190004455', cardNo: '001190004455',
                nycPhone: '0988123456', phone: '0988123456', nycEmail: '',
                nycTinhThanh: 'Hà Nội', nycPhuongXa: 'Phường Thanh Xuân', nycAddressDetail: 'Số 3 Nguyễn Trãi', address: 'Số 3 Nguyễn Trãi',
                notifyAddress: 'Số 3 Nguyễn Trãi, Phường Thanh Xuân, Hà Nội',
                // Tiếp nhận hồ sơ chỉ nhập Họ và tên người bị thiệt hại -> bị chặn khi trình Thông báo thụ lý
                nbth: { type: T_CN, name: 'Trần Văn Lộc', dob: '', docType: '', docNo: '', phone: '', email: '', country: VN, city: '', ward: '', address: '' },
                hanhVi: 'Tạm giữ trái pháp luật.', nhanQua: 'Người bị thiệt hại bị tạm giữ 10 ngày, mất thu nhập.',
                totalNum: 60000000, thietHaiList: th(60000000), agency: 'Công an Quận Thanh Xuân',
                timeline: [{ title: 'Nộp hồ sơ bồi thường', date: '20/10/2026', desc: 'Người thừa kế nộp văn bản yêu cầu bồi thường.', status: 'completed' }]
            })
        ];
    }
    var oSeed = window.seedNycOrgSampleClaims;
    window.seedNycOrgSampleClaims = function () {
        if (typeof oSeed === 'function') oSeed.apply(this, arguments);
        try {
            var fresh = localStorage.getItem('gqNbthSeedVersion') !== SEED_VER;
            seedList().forEach(function (s) {
                var cur = claimsList.find(function (c) { return c && (c.id === s.id || c.code === s.code); });
                if (!cur) claimsList.push(s);
                else if (fresh) Object.assign(cur, { nbth: s.nbth, thietHaiList: s.thietHaiList, nycRole: s.nycRole, role: s.role });
            });
            // Tổ chức kế thừa (BT-2026-092): bổ sung địa bàn tổ chức bị thiệt hại đã chấm dứt tồn tại
            var tc = claimsList.find(function (c) { return c && c.code === 'BT-2026-092'; });
            if (tc && (fresh || !tc.nbthOrgAddr)) tc.nbthOrgAddr = { country: VN, city: 'Hà Nội', ward: '00001 - Phường Ba Đình', address: 'Số 21 Điện Biên Phủ' };
            localStorage.setItem('gqNbthSeedVersion', SEED_VER);
        } catch (e) { /* bỏ qua lỗi dữ liệu mẫu */ }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
    document.addEventListener('DOMContentLoaded', function () { try { if (typeof saveClaimsToLocal === 'function') saveClaimsToLocal(); } catch (e) { /* bỏ qua */ } });
})();
