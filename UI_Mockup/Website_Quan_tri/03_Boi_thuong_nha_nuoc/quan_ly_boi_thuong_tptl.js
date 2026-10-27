/*
 * [tptl] Thành phần tham gia thương lượng (Giải quyết yêu cầu bồi thường > Thương lượng > Đồng ý thương lượng) - 02 khối:
 * 1. Cơ quan, tổ chức tham gia thương lượng (Thành phần, Đơn vị, Họ và tên, Chức vụ, Không tham gia / Lý do):
 *    - Thành phần bắt buộc (dòng cố định, Thành phần + Đơn vị điền sẵn, không xóa):
 *      + Cơ quan giải quyết bồi thường = đơn vị gốc của tài khoản đăng nhập (= Cơ quan giải quyết bồi thường của hồ sơ).
 *      + Bộ Tư pháp (Cấp đơn vị = Trung ương) / Sở Tư pháp cùng Tỉnh/Thành phố (Cấp đơn vị = Địa phương).
 *      + Lĩnh vực phát sinh thiệt hại = Trong hoạt động tố tụng hình sự: thêm Viện kiểm sát nhân dân tối cao (Trung ương) / Viện kiểm sát nhân dân Tỉnh/Thành phố (Địa phương).
 *      + Cơ quan giải quyết trùng Bộ Tư pháp / Sở Tư pháp / Viện kiểm sát cần có: gộp 01 dòng, ghi đủ vai trò.
 *      + Mỗi dòng: nhập Họ và tên + Chức vụ, hoặc tích Không tham gia -> khóa Họ và tên, Chức vụ; bắt buộc Lý do không tham gia.
 *    - Thành phần khác (không bắt buộc): nút Thêm thành phần; dòng trống bỏ qua khi lưu; dòng đã nhập bắt buộc Đơn vị + Họ và tên.
 * 2. Người yêu cầu bồi thường / người đại diện / người bảo vệ quyền lợi ích hợp pháp (Họ và tên, Số giấy tờ, Địa chỉ): dùng bảng tlpt* hiện có.
 * Lưu: negotiation.tlParticipants = { capDonVi, toTungHinhSu, agencies: [...], requesters: [...], seed? };
 *      giữ tương thích: negotiation.participants = cơ quan có tham gia [{ name, position, unit }], negotiation.claimantParticipants = requesters.
 * Dữ liệu mẫu (TPTL_SEED_VER): mọi hồ sơ mẫu có kết quả Đồng ý thương lượng được gắn tlParticipants theo quy tắc (không đụng bản ghi người dùng đã lưu,
 *      bản ghi người dùng tạo); bổ sung 05 hồ sơ mẫu BT-2026-571..575 (Trung ương / Địa phương x hình sự / không hình sự) theo Mã hồ sơ.
 * Dữ liệu người dùng cũ (chưa có tlParticipants): màn xem hiển thị danh sách cũ; mở form: dòng cũ trùng Đơn vị dòng bắt buộc điền vào dòng đó, còn lại vào Thành phần khác.
 * Nạp sau quan_ly_boi_thuong_seedxm.js, quan_ly_boi_thuong_lth.js, quan_ly_boi_thuong_ktlc.js.
 */
(function () {
    var TPTL_SEED_VER = '20261027tptl3';
    var ROLE = { CQGQ: 'Cơ quan giải quyết bồi thường', BTP: 'Bộ Tư pháp', STP: 'Sở Tư pháp', VKS: 'Viện kiểm sát' };
    var CAP_TW = 'Trung ương', CAP_DP = 'Địa phương';
    var ERR = '<div class="error-message" style="color:#dc2626; font-size:11px; display:none;">Đây là trường bắt buộc</div>';
    var CHIP = 'display:inline-block; padding:1px 8px; border-radius:10px; font-size:11.5px; font-weight:600; background:#e0f2fe; color:#075985; margin:0 4px 2px 0;';
    var st = { claimId: null, agencies: [] };
    var blockBad = false;

    function el(id) { return document.getElementById(id); }
    function E(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function W() { return window.BTNN_WF || null; }
    function fold(s) {
        return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase()
            .replace(/\btp\.\s*/g, 'thanh pho ').replace(/[,.]/g, ' ').replace(/\s+/g, ' ').trim();
    }
    function isTTHS(claim) { return !!claim && String(claim.fieldGroup || '').trim().toLowerCase() === 'hình sự'; }
    function resolveRoot(t) {
        var w = W(); if (!w || !t) return null;
        try { var u = typeof resolveClaimAgencyUnit === 'function' ? resolveClaimAgencyUnit(t) : null; if (u) return w.getUnit(w.getRootId(u.id) || u.id); } catch (e) { /* mockup */ }
        var f = fold(t);
        return w.getRootUnits().find(function (x) { return fold(x.name) === f; }) || null;
    }
    // Tài khoản đang đăng nhập (ô "Cán bộ đang đăng nhập" của thanh giả lập) và đơn vị gốc
    function loginInfo() {
        var w = W(); if (!w) return null;
        var id = ''; try { id = typeof gqActingUserId === 'function' ? gqActingUserId() : w.getCurrentUserId(); } catch (e) { id = w.getCurrentUserId(); }
        var u = w.getUser(id); if (!u) return null;
        var root = w.getRootId(u.unitId) || u.unitId;
        return { userId: u.id, userName: u.name, rootId: root, rootName: w.unitName(root) };
    }
    // Cơ quan giải quyết bồi thường của hồ sơ (đơn vị gốc trên Cơ cấu tổ chức; không khớp thì giữ tên trên hồ sơ)
    function claimCq(claim) {
        var u = resolveRoot(claim && claim.agency);
        if (u) return { id: u.id, name: u.name };
        return { id: '', name: (claim && claim.agency) || 'Cơ quan giải quyết bồi thường' };
    }
    // Cơ quan giải quyết bồi thường = đơn vị gốc của tài khoản đang đăng nhập (useLogin).
    // Mockup: tài khoản giả lập không thuộc Cơ quan giải quyết bồi thường của hồ sơ -> lấy theo hồ sơ, kèm chú thích (src = 'claim').
    // Dữ liệu mẫu (useLogin = false): lấy theo Cơ quan giải quyết bồi thường của hồ sơ.
    function cqgqOf(claim, useLogin) {
        var cq = claimCq(claim);
        if (!useLogin) return Object.assign(cq, { src: 'seed' });
        var me = loginInfo();
        if (me && (!claim || (cq.id && cq.id === me.rootId))) return { id: me.rootId, name: me.rootName, src: 'login', login: me };
        return Object.assign(cq, { src: 'claim', login: me });
    }
    // Cấp đơn vị: thuộc tính Cấp đơn vị của đơn vị gốc (ktlcCapOf); chưa khai báo thì suy theo tên
    function capOf(unitId, name) {
        try { if (unitId && typeof ktlcCapOf === 'function') { var c = ktlcCapOf(unitId); if (c) return c; } } catch (e) { /* mockup */ }
        return /^Bộ\s|tối cao|Chính phủ|Trung ương/i.test(name || '') ? CAP_TW : CAP_DP;
    }
    // Tỉnh/Thành phố của đơn vị: thực tế lấy theo thuộc tính Tỉnh/Thành phố của đơn vị trên Cơ cấu tổ chức; mockup suy theo tên đơn vị
    var CITIES = ['Hà Nội', 'Hồ Chí Minh', 'Hải Phòng', 'Đà Nẵng', 'Cần Thơ', 'Huế'];
    var PROVS = ['Lâm Đồng', 'Khánh Hòa', 'Bình Định', 'Bắc Ninh', 'Quảng Ninh', 'Nghệ An', 'Thanh Hóa', 'Đồng Nai', 'Gia Lai', 'Đắk Lắk'];
    var HN_WARDS = ['Nghĩa Đô', 'Cầu Giấy', 'Tây Hồ', 'Thanh Xuân', 'Hoàng Mai', 'Long Biên', 'Ba Đình', 'Đống Đa', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Hà Đông', 'Thanh Trì', 'Mê Linh'];
    function provinceOf(name) {
        var s = String(name || '').replace(/\bTP\.\s*/g, 'Thành phố ');
        var parts = s.split(','), last = parts[parts.length - 1].trim();
        var m = /(Thành phố|thành phố|Tỉnh|tỉnh)\s+(.+)$/.exec(last);
        if (!m && parts.length > 1) m = /(Thành phố|Tỉnh|tỉnh)\s+(.+)$/.exec(s);
        if (m) {
            var nm = m[2].trim();
            var isProv = /ỉnh/.test(m[1]) || PROVS.indexOf(nm) >= 0;
            if (!/ỉnh/.test(m[1]) && /^thành phố/.test(m[1]) && parts.length === 1 && CITIES.indexOf(nm) < 0 && !isProv) m = null; // "thành phố Nha Trang" (cấp huyện)
            else return (isProv ? 'tỉnh ' : 'Thành phố ') + nm;
        }
        var f = fold(s), i;
        for (i = 0; i < CITIES.length; i++) if (f.indexOf(fold(CITIES[i])) >= 0) return 'Thành phố ' + CITIES[i];
        for (i = 0; i < PROVS.length; i++) if (f.indexOf(fold(PROVS[i])) >= 0) return 'tỉnh ' + PROVS[i];
        for (i = 0; i < HN_WARDS.length; i++) if (f.indexOf(fold(HN_WARDS[i])) >= 0) return 'Thành phố Hà Nội';
        return '';
    }
    function rootByName(name) {
        var w = W(); if (!w) return null;
        var f = fold(name);
        return w.getRootUnits().find(function (x) { return fold(x.name) === f; }) || null;
    }
    // Danh sách thành phần bắt buộc theo Cấp đơn vị và Lĩnh vực phát sinh thiệt hại (thứ tự: Cơ quan giải quyết bồi thường, Bộ/Sở Tư pháp, Viện kiểm sát)
    function requiredRows(claim, useLogin) {
        var w = W();
        var cq = cqgqOf(claim, useLogin);
        var cap = capOf(cq.id, cq.name);
        var prov = provinceOf(cq.name);
        var tp = null;
        if (cap === CAP_TW) tp = (w && w.getRootUnits().find(function (x) { return /^BTP/.test(x.id); })) || { id: '', name: 'Bộ Tư pháp' };
        else {
            var stpId = ''; try { stpId = cq.id && w && w.stpOfUnit ? w.stpOfUnit(cq.id) : ''; } catch (e) { stpId = ''; }
            var stpName = 'Sở Tư pháp' + (prov ? ' ' + prov : '');
            tp = stpId ? { id: stpId, name: w.unitName(stpId) } : (rootByName(stpName) || { id: '', name: stpName });
        }
        var rows = [{ role: 'CQGQ', roles: [ROLE.CQGQ], unitId: cq.id, unit: cq.name }];
        var tpRole = cap === CAP_TW ? ROLE.BTP : ROLE.STP;
        if ((cq.id && tp.id && cq.id === tp.id) || fold(cq.name) === fold(tp.name)) rows[0].roles.push(tpRole);
        else rows.push({ role: 'TP', roles: [tpRole], unitId: tp.id, unit: tp.name });
        if (isTTHS(claim)) {
            var vksName = cap === CAP_TW ? 'Viện kiểm sát nhân dân tối cao' : ('Viện kiểm sát nhân dân' + (prov ? ' ' + prov : ''));
            var vks = rootByName(vksName) || { id: '', name: vksName };
            if ((cq.id && vks.id && cq.id === vks.id) || fold(cq.name) === fold(vks.name)) rows[0].roles.push(ROLE.VKS);
            else rows.push({ role: 'VKS', roles: [ROLE.VKS], unitId: vks.id, unit: vks.name });
        }
        rows.forEach(function (r) { r.required = true; r.roleLabel = r.roles.join('; '); r.name = ''; r.position = ''; r.absent = false; r.absentReason = ''; });
        return { cap: cap, tths: isTTHS(claim), rows: rows, cq: cq };
    }
    function sameUnit(text, row) {
        if (!text) return false;
        if (fold(text) === fold(row.unit)) return true;
        var u = resolveRoot(text);
        return !!(u && row.unitId && u.id === row.unitId);
    }
    // Ghép dữ liệu đã lưu / dữ liệu cũ vào danh sách thành phần bắt buộc hiện hành
    function buildAgencies(claim, neg, isAgree, useLogin) {
        var req = requiredRows(claim, useLogin);
        var rows = req.rows, khac = [];
        var saved = isAgree && neg && neg.tlParticipants && Array.isArray(neg.tlParticipants.agencies) ? neg.tlParticipants.agencies : null;
        if (saved) {
            saved.forEach(function (a) {
                if (a.required) {
                    var r = rows.find(function (x) { return x.role === a.role && !x._used; }) || rows.find(function (x) { return !x._used && sameUnit(a.unit, x); });
                    if (r) { r._used = true; r.name = a.name || ''; r.position = a.position || ''; r.absent = !!a.absent; r.absentReason = a.absentReason || ''; return; }
                }
                if (a.absent) return;
                khac.push({ role: 'KHAC', required: false, unit: a.unit || '', name: a.name || '', position: a.position || '' });
            });
        } else {
            // Chưa có kết quả thương lượng: chỉ tạo các dòng bắt buộc (Họ và tên, Chức vụ trống)
            var legacy = isAgree && neg && Array.isArray(neg.participants) ? neg.participants : [];
            legacy.forEach(function (p) {
                if (!p || !(p.name || p.unit || p.position)) return;
                var r = rows.find(function (x) { return !x._used && !x.name && sameUnit(p.unit, x); });
                if (r) { r._used = true; r.name = p.name || ''; r.position = p.position || ''; return; }
                khac.push({ role: 'KHAC', required: false, unit: p.unit || '', name: p.name || '', position: p.position || '' });
            });
        }
        rows.forEach(function (r) { delete r._used; });
        return { cap: req.cap, tths: req.tths, cq: req.cq, agencies: rows.concat(khac) };
    }
    function roleChips(a) {
        if (!a.required) return '<span style="color:#64748b;">Thành phần khác</span>';
        return String(a.roleLabel || '').split('; ').filter(Boolean).map(function (r) { return '<span class="tptl-role" style="' + CHIP + '">' + E(r) + '</span>'; }).join('');
    }

    // ======================= Form nhập =======================
    function sync() {
        st.agencies.forEach(function (a, i) {
            var n = el('tptlName_' + i), p = el('tptlPos_' + i), u = el('tptlUnit_' + i), ab = el('tptlAbs_' + i), rs = el('tptlReason_' + i);
            if (u && !a.required) a.unit = u.value.trim();
            if (ab) a.absent = ab.checked;
            if (n && !a.absent) a.name = n.value.trim();
            if (p && !a.absent) a.position = p.value.trim();
            if (rs) a.absentReason = rs.value.trim();
        });
    }
    function rowHtml(a, i, stt) {
        var dis = a.absent ? ' disabled' : '';
        var unit = a.required
            ? '<div style="font-weight:600;" id="tptlUnitText_' + i + '">' + E(a.unit) + '</div>'
            : '<input type="text" class="form-control form-control-sm" id="tptlUnit_' + i + '" value="' + E(a.unit) + '" placeholder="Nhập đơn vị..." oninput="ptClearErr(this)">' + ERR;
        var abs = a.required
            ? '<label style="display:flex; align-items:center; gap:6px; margin:0; font-weight:500; cursor:pointer;"><input type="checkbox" id="tptlAbs_' + i + '"' + (a.absent ? ' checked' : '') + ' onchange="tptlToggleAbsent(' + i + ', this.checked)"> Không tham gia</label>'
              + '<div id="tptlReasonBox_' + i + '" style="margin-top:6px; display:' + (a.absent ? 'block' : 'none') + ';"><textarea class="form-control form-control-sm" id="tptlReason_' + i + '" rows="2" style="font-family:inherit;" placeholder="Nhập lý do không tham gia..." oninput="ptClearErr(this)">' + E(a.absentReason) + '</textarea>' + ERR + '</div>'
            : '<span style="color:#94a3b8;">--</span>';
        var act = a.required ? '' : '<button type="button" class="btn btn-sm btn-outline-danger" id="tptlDel_' + i + '" onclick="tptlRemoveRow(' + i + ')" title="Xóa"><i class="fa-solid fa-trash"></i> Xóa</button>';
        return '<tr data-tptl-idx="' + i + '"' + (a.required ? ' data-required="1" data-role="' + E(a.role) + '"' : '') + '>'
            + '<td style="text-align:center;">' + stt + '</td>'
            + '<td>' + roleChips(a) + '</td>'
            + '<td>' + unit + '</td>'
            + '<td><input type="text" class="form-control form-control-sm" id="tptlName_' + i + '" value="' + E(a.absent ? '' : a.name) + '" placeholder="Nhập họ và tên..." oninput="ptClearErr(this)"' + dis + '>' + ERR + '</td>'
            + '<td><input type="text" class="form-control form-control-sm" id="tptlPos_' + i + '" value="' + E(a.absent ? '' : a.position) + '" placeholder="Nhập chức vụ..." oninput="ptClearErr(this)"' + dis + '>' + ERR + '</td>'
            + '<td>' + abs + '</td>'
            + '<td style="text-align:center;">' + act + '</td></tr>';
    }
    function grpRow(t, note, n) {
        return '<tr class="tptl-group"><td colspan="' + n + '" style="background:#e2e8f0; font-weight:700; font-size:12.5px; color:#0f172a;">' + t
            + (note ? ' <span style="font-weight:400; color:#475569;">' + note + '</span>' : '') + '</td></tr>';
    }
    // Chú thích nguồn Cơ quan giải quyết bồi thường của form (đơn vị đăng nhập / giả lập lấy theo hồ sơ)
    function srcNote(cq) {
        if (!cq) return '';
        var me = cq.login;
        if (cq.src === 'login') return '<div id="tptlSrcNote" data-src="login" style="font-size:12px; color:#475569; margin-top:4px;">Đơn vị đang đăng nhập: ' + E(cq.name) + ' (tài khoản ' + E(me.userName) + '). Thành phần bắt buộc xác định theo Cấp đơn vị của đơn vị này.</div>';
        return '<div id="tptlSrcNote" data-src="claim" style="font-size:12px; color:#92400e; background:#fffbeb; border:1px dashed #f59e0b; padding:4px 8px; margin-top:4px;">Giả lập: tài khoản đang đăng nhập' + (me ? ' (' + E(me.userName) + ' - ' + E(me.rootName) + ')' : '') + ' không thuộc Cơ quan giải quyết bồi thường của hồ sơ; mockup lấy theo Cơ quan giải quyết bồi thường của hồ sơ (' + E(cq.name) + '). Chọn Cán bộ đang đăng nhập thuộc cơ quan này để thử theo đơn vị đăng nhập.</div>';
    }
    function capNote() {
        return '(Cấp đơn vị: ' + E(st.cap || '--') + '; Lĩnh vực ' + (st.tths ? 'tố tụng hình sự: có Viện kiểm sát' : 'không thuộc tố tụng hình sự') + ')';
    }
    function render() {
        var wrap = el('tptlAgWrap'); if (!wrap) return;
        var reqRows = '', khacRows = '', stt = 0;
        st.agencies.forEach(function (a, i) { stt++; if (a.required) reqRows += rowHtml(a, i, stt); else khacRows += rowHtml(a, i, stt); });
        wrap.innerHTML = '<table class="custom-table pt-table" id="tptlAgTable" style="background:white; font-size:12.5px; margin:0;">'
            + '<thead><tr style="background-color:#f8fafc;"><th style="width:46px; text-align:center;">STT</th><th style="width:15%;">Thành phần</th><th style="width:20%;">Đơn vị</th><th>Họ và tên</th><th style="width:15%;">Chức vụ</th><th style="width:21%;">Không tham gia / Lý do không tham gia</th><th style="width:76px; text-align:center;">Thao tác</th></tr></thead>'
            + '<tbody>' + grpRow('Thành phần bắt buộc', capNote(), 7) + reqRows + grpRow('Thành phần khác', '(không bắt buộc)', 7)
            + (khacRows || '<tr><td colspan="7" style="text-align:center; color:#94a3b8; font-style:italic;">Chưa có thành phần khác. Bấm "Thêm thành phần" để bổ sung.</td></tr>')
            + '</tbody></table>'
            + '<div style="margin-top:8px;"><button type="button" class="btn btn-secondary btn-sm" id="tptlAddBtn" onclick="tptlAddRow()"><i class="fa-solid fa-plus"></i> Thêm thành phần</button></div>';
    }
    window.tptlToggleAbsent = function (i, on) {
        sync();
        var a = st.agencies[i]; if (!a) return;
        a.absent = !!on;
        if (on) { a.name = ''; a.position = ''; }
        render();
        var f = el(on ? 'tptlReason_' + i : 'tptlName_' + i); if (f) f.focus();
    };
    window.tptlAddRow = function () {
        sync();
        st.agencies.push({ role: 'KHAC', required: false, unit: '', name: '', position: '' });
        render();
        var f = el('tptlUnit_' + (st.agencies.length - 1)); if (f) f.focus();
    };
    window.tptlRemoveRow = function (i) {
        sync();
        var a = st.agencies[i]; if (!a || a.required) return;
        var doRemove = function () { sync(); st.agencies.splice(i, 1); render(); };
        if (!a.unit && !a.name && !a.position) { doRemove(); return; }
        showConfirmModal('Bạn có chắc chắn muốn xóa thành viên "' + (a.name || ('dòng ' + (i + 1))) + '" khỏi danh sách Thành phần tham gia không?', doRemove,
            { title: 'Xác nhận xóa thành viên', btnYesText: 'Xóa', btnNoText: 'Hủy', btnYesClass: 'btn-danger' });
    };
    // Kiểm tra khối 1: dòng bắt buộc (Họ và tên + Chức vụ, hoặc Không tham gia + Lý do); dòng khác đã nhập: Đơn vị + Họ và tên
    function validate() {
        sync();
        var ok = true;
        var chk = function (id, bad) { var f = el(id); if (typeof fieldErr === 'function') fieldErr(f, bad); if (bad) ok = false; };
        st.agencies.forEach(function (a, i) {
            if (a.required) {
                if (a.absent) chk('tptlReason_' + i, !a.absentReason);
                else { chk('tptlName_' + i, !a.name); chk('tptlPos_' + i, !a.position); }
            } else {
                var any = !!(a.unit || a.name || a.position);
                chk('tptlUnit_' + i, any && !a.unit);
                chk('tptlName_' + i, any && !a.name);
            }
        });
        return ok;
    }
    function values() {
        sync();
        return st.agencies.filter(function (a) { return a.required || a.unit || a.name || a.position; }).map(function (a) {
            return a.required
                ? { role: a.role, roleLabel: a.roleLabel, required: true, unit: a.unit, name: a.absent ? '' : a.name, position: a.absent ? '' : a.position, absent: !!a.absent, absentReason: a.absent ? a.absentReason : '' }
                : { role: 'KHAC', required: false, unit: a.unit, name: a.name, position: a.position, absent: false, absentReason: '' };
        });
    }
    function mountForm(claim) {
        var host = el('ptTableWrap_tl');
        var box = host ? host.parentElement : null;
        if (!box || !claim) return;
        var neg = claim.negotiation || {};
        var isAgree = typeof tlParticipationOf === 'function' ? (tlParticipationOf(neg) || 'DONG_Y') === 'DONG_Y' : true;
        var b = buildAgencies(claim, neg, isAgree, true);
        st = { claimId: claim.id, agencies: b.agencies, cap: b.cap, tths: b.tths, cq: b.cq };
        box.id = 'tptlBox';
        box.innerHTML = '<span class="form-label" style="color:#166534; font-weight:700; margin:0;">Thành phần tham gia thương lượng</span>'
            + '<div style="font-weight:600; font-size:12.5px; color:#1e293b; margin-top:8px;">1. Cơ quan, tổ chức tham gia thương lượng <span class="required">*</span></div>'
            + srcNote(b.cq)
            + '<div id="tptlAgWrap" style="margin-top:6px;"></div>'
            + '<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-top:14px;">'
            + '<span style="font-weight:600; font-size:12.5px; color:#1e293b;">2. Người yêu cầu bồi thường / người đại diện / người bảo vệ quyền lợi ích hợp pháp <span class="required">*</span></span></div>'
            + '<div id="tlptNycWrap" style="margin-top:6px;"></div>'
            + '<div style="margin-top:8px;"><button type="button" class="btn btn-secondary btn-sm" id="tlptAddNycBtn" onclick="tlptAddRow()"><i class="fa-solid fa-plus"></i> Thêm người</button></div>'
            + '<div class="error-message" id="tlptNycErr" style="color:#dc2626; font-size:12px; display:none;">Đây là trường bắt buộc</div>';
        render();
        if (typeof tlptRender === 'function') tlptRender();
    }
    // Bảng khối 2: đổi chữ hướng dẫn khi bảng trống theo tên nút mới
    var origTlptRender = window.tlptRender;
    if (typeof origTlptRender === 'function') window.tlptRender = function () {
        var r = origTlptRender.apply(this, arguments);
        var t = document.querySelector('#tlptNycTable tbody td[colspan]');
        if (t) t.textContent = 'Chưa có thành viên. Bấm "Thêm người" để bổ sung.';
        return r;
    };

    // ======================= Dữ liệu lưu =======================
    function setParticipants(neg, d, seed) {
        var ag = d.agencies.map(function (a) {
            return { role: a.role, roleLabel: a.roleLabel || '', required: !!a.required, unit: a.unit || '', name: a.absent ? '' : (a.name || ''), position: a.absent ? '' : (a.position || ''), absent: !!a.absent, absentReason: a.absent ? (a.absentReason || '') : '' };
        });
        neg.tlParticipants = { capDonVi: d.cap, toTungHinhSu: !!d.tths, agencies: ag, requesters: (d.requesters || []).map(function (p) { return { name: p.name || '', idNo: p.idNo || '', address: p.address || '' }; }) };
        if (seed) neg.tlParticipants.seed = seed;
        // Tương thích các màn / chức năng đang đọc danh sách phẳng
        neg.participants = ag.filter(function (a) { return !a.absent && a.name; }).map(function (a) { return { name: a.name, position: a.position, unit: a.unit }; });
        neg.claimantParticipants = neg.tlParticipants.requesters.slice();
    }

    // ======================= Dữ liệu mẫu =======================
    // Tên mẫu theo vai trò (dòng bắt buộc chưa khớp được dữ liệu cũ)
    var NAMES = {
        CQGQ: { name: 'Phạm Quốc Hùng', position: 'Trưởng phòng' },
        BTP: { name: 'Trần Văn Bồi Thường', position: 'Trưởng phòng Quản lý nghiệp vụ về bồi thường nhà nước' },
        'STP-HN': { name: 'Vũ Thị Thanh', position: 'Trưởng phòng Hành chính tư pháp' },
        'STP-HP': { name: 'Nguyễn Thị Thu Hương', position: 'Phó Trưởng phòng Hành chính tư pháp' },
        'STP-HCM': { name: 'Châu Ngọc Ánh', position: 'Chuyên viên Phòng Hành chính tư pháp' },
        STP: { name: 'Hoàng Minh Tuấn', position: 'Phó Trưởng phòng Hành chính tư pháp' },
        VKSTC: { name: 'Đặng Quang Vinh', position: 'Kiểm sát viên cao cấp' },
        VKS: { name: 'Đỗ Minh Quang', position: 'Kiểm sát viên' }
    };
    // Cấu hình riêng theo Mã hồ sơ: absent = vai trò Không tham gia (kèm lý do), khac = thành phần khác thêm, more = khối 2 thêm
    var LAWYER = { name: 'Nguyễn Minh Tâm', idNo: '001085012345', address: 'Văn phòng Luật sư Minh Tâm, Đoàn Luật sư Thành phố Hà Nội' };
    var CFG = {
        'BT-2026-002': { absent: { VKS: 'Viện kiểm sát nhân dân Thành phố Hà Nội có văn bản đề nghị vắng mặt do trùng lịch xét xử; ý kiến bằng văn bản gửi kèm hồ sơ.' }, khac: [{ unit: 'Công an Thành phố Hà Nội', name: 'Lê Văn Hải', position: 'Phó Trưởng phòng' }], more: [LAWYER] },
        'BT-2026-003-A': { absent: { TP: 'Sở Tư pháp Thành phố Hà Nội có văn bản cử cán bộ nhưng vắng mặt do trùng lịch công tác; có ý kiến bằng văn bản.' } },
        'BT-2026-022': { khac: [{ unit: 'UBND quận Cầu Giấy, Thành phố Hà Nội', name: 'Bùi Đức Thắng', position: 'Chủ tịch UBND' }] },
        'BT-2026-067': { more: [{ name: 'Trần Thu Trang', idNo: '001190045678', address: 'Công ty Luật TNHH Trang Lê, Đoàn Luật sư Thành phố Hà Nội' }] },
        'BT-2026-571': { absent: { TP: 'Bộ Tư pháp có văn bản tham gia ý kiến, không cử người tham dự do trùng lịch họp Hội đồng.' }, khac: [{ unit: 'Bộ Công an', name: 'Lê Hữu Phước', position: 'Phó Cục trưởng' }], more: [{ name: 'Phan Văn Khải', idNo: '001080067812', address: 'Văn phòng Luật sư Phan Khải, Đoàn Luật sư Thành phố Hà Nội' }] },
        'BT-2026-575': { khac: [{ unit: 'Sở Tài chính tỉnh Lâm Đồng', name: 'Ngô Đình Lộc', position: 'Phó Giám đốc Sở' }] }
    };
    function sampleName(r, claim) {
        if (r.role === 'CQGQ') return NAMES.CQGQ;
        if (r.role === 'TP') return r.unitId && NAMES[r.unitId] ? NAMES[r.unitId] : (/^Bộ/.test(r.unit) ? NAMES.BTP : NAMES.STP);
        if (r.role === 'VKS') return /tối cao/.test(r.unit) ? NAMES.VKSTC : NAMES.VKS;
        return NAMES.CQGQ;
    }
    function isSample(claim) { return !!claim && !claim.userCreated; }
    // Gắn tlParticipants cho hồ sơ mẫu có kết quả Đồng ý thương lượng (gồm bản nháp); không đụng dữ liệu người dùng đã lưu (không có cờ seed)
    function seedClaim(claim) {
        var neg = claim && claim.negotiation;
        if (!neg || !isSample(claim)) return false;
        if (typeof tlParticipationOf === 'function' && tlParticipationOf(neg) !== 'DONG_Y') return false;
        if (neg.tlParticipants && (!neg.tlParticipants.seed || neg.tlParticipants.seed === TPTL_SEED_VER)) return false;
        var cfg = CFG[claim.code] || {};
        // Dữ liệu cũ của bản ghi mẫu: khớp Đơn vị vào dòng bắt buộc, dòng còn lại (có Chức vụ / Đơn vị) vào Thành phần khác
        var legacy = neg.tlParticipants && neg.tlParticipants.legacy ? neg.tlParticipants.legacy : (Array.isArray(neg.participants) ? neg.participants.slice() : []);
        var b = buildAgencies(claim, { participants: legacy.filter(function (p) { return p && (p.position || p.unit); }) }, true);
        // Mỗi đơn vị bắt buộc chỉ 01 đại diện: bỏ dòng cũ cùng đơn vị với dòng bắt buộc
        var reqRows = b.agencies.filter(function (a) { return a.required; });
        b.agencies = b.agencies.filter(function (a) { return a.required || !reqRows.some(function (r) { return sameUnit(a.unit, r); }); });
        b.agencies.forEach(function (a) {
            if (!a.required) return;
            if (cfg.absent && cfg.absent[a.role]) { a.absent = true; a.absentReason = cfg.absent[a.role]; a.name = ''; a.position = ''; return; }
            if (!a.name) { var s = sampleName(a, claim); a.name = s.name; a.position = s.position; }
            if (!a.position) a.position = 'Chuyên viên';
        });
        (cfg.khac || []).forEach(function (k) { b.agencies.push(Object.assign({ role: 'KHAC', required: false, absent: false, absentReason: '' }, k)); });
        var req = (Array.isArray(neg.claimantParticipants) && neg.claimantParticipants.length ? neg.claimantParticipants.slice()
            : [{ name: claim.nycRepName || claim.nyc || '', idNo: claim.nycCardNo || claim.cardNo || '', address: claim.nycAddressDetail || claim.address || '' }]);
        (cfg.more || []).forEach(function (m) { if (!req.some(function (p) { return p.name === m.name; })) req.push(m); });
        setParticipants(neg, { cap: b.cap, tths: b.tths, agencies: b.agencies, requesters: req }, TPTL_SEED_VER);
        neg.tlParticipants.legacy = legacy;
        return true;
    }
    // Người dùng giả lập bổ sung (đơn vị Trung ương chưa có cán bộ trên Cơ cấu tổ chức mẫu) -> hiện trong ô "Cán bộ đang đăng nhập"
    var EXTRA_USERS = [
        { id: 'tt_tandtc', name: 'Trịnh Minh Đức', unitId: 'TANDTC', title: 'Thẩm tra viên', email: 'tt_tandtc@toaan.gov.vn' },
        { id: 'cv_btc', name: 'Phùng Thị Lan', unitId: 'BTC', title: 'Chuyên viên Vụ Pháp chế', email: 'cv_btc@mof.gov.vn' }
    ];
    (function () {
        var w = W();
        if (!w || !Array.isArray(w.USERS)) return;
        EXTRA_USERS.forEach(function (u) { if (w.getUnit(u.unitId) && !w.getUser(u.id)) w.USERS.push(u); });
    })();
    // Hồ sơ mẫu thử thành phần bắt buộc: cử thêm cán bộ thuộc đúng Cơ quan giải quyết bồi thường (giữ cán bộ mẫu đã cử)
    var APPOINT = {
        'BT-2026-571': 'ksv_vkstc1', 'BT-2026-572': 'tt_tandtc', 'BT-2026-573': 'cv_btc', 'BT-2026-574': 'cb_cahm1', 'BT-2026-575': 'cv_ubndld1',
        'BT-2026-002': 'tk_tandhn1', 'BT-2026-010': 'cv_tand1', 'BT-2026-023': 'ksv_vkshp1', 'BT-2026-192': 'canbonv',
        'BT-2026-504': 'cv_hn1', 'BT-2026-505': 'cv_hn1', 'BT-2026-003-A': 'cv_cg1'
    };
    function appointClaim(c) {
        var w = W(), uid = c && APPOINT[c.code];
        var u = uid && w ? w.getUser(uid) : null;
        if (!u || !isSample(c)) return false;
        if (!Array.isArray(c.appointedOfficers) || !c.appointedOfficers.length) {
            // Hồ sơ mẫu cũ chỉ có cán bộ được cử dạng assignedOfficer: chuyển sang danh sách cán bộ được cử
            var cur = typeof getClaimAppointedOfficers === 'function' ? getClaimAppointedOfficers(c) : [];
            if (!cur.length) return false;
            c.appointedOfficers = cur.map(function (o) { return Object.assign({}, o); });
        }
        if (c.appointedOfficers.some(function (o) { return o && o.name === u.name; })) return false;
        c.appointedOfficers.push({ userId: u.id, name: u.name, position: u.title, email: u.email, unit: w.unitName(u.unitId), appointedAt: c.appointedOfficers[0].appointedAt || '' });
        return true;
    }
    function seedAll() {
        var n = 0;
        try { (claimsList || []).forEach(function (c) { if (seedClaim(c)) n++; if (appointClaim(c)) n++; }); } catch (e) { console.warn('tptl seed', e); }
        return n;
    }
    // 05 hồ sơ mẫu bổ sung: phủ Trung ương / Địa phương x tố tụng hình sự / không hình sự (thêm theo Mã hồ sơ, không ghi đè)
    var PERSONS = {
        tp1: { nyc: 'Hoàng Văn Thái', nycBirth: '14/06/1978', nycCardNo: '001078005571', nycCardDate: '12/04/2021', nycPhone: '0912571571', nycEmail: 'hoangvanthai78@gmail.com', nycPhuongXa: 'Phường Ba Đình', nycAddressDetail: 'Số 18 Phan Đình Phùng' },
        tp2: { nyc: 'Lương Thị Bích Ngọc', nycBirth: '02/12/1986', nycCardNo: '001186003572', nycCardDate: '20/05/2021', nycPhone: '0983572572', nycEmail: 'bichngoc.luong@gmail.com', nycPhuongXa: 'Phường Hoàn Kiếm', nycAddressDetail: 'Số 7 Lý Thường Kiệt' },
        tp3: { nyc: 'Vương Đình Khoa', nycBirth: '25/03/1975', nycCardNo: '001075002573', nycCardDate: '08/06/2021', nycPhone: '0904573573', nycEmail: 'vuongdinhkhoa@gmail.com', nycPhuongXa: 'Phường Đống Đa', nycAddressDetail: 'Số 120 Tây Sơn' },
        tp4: { nyc: 'Mạc Văn Toàn', nycBirth: '11/09/1990', nycCardNo: '001090004574', nycCardDate: '15/07/2021', nycPhone: '0977574574', nycEmail: 'macvantoan90@gmail.com', nycPhuongXa: 'Phường Hoàng Mai', nycAddressDetail: 'Số 25 Giải Phóng' },
        tp5: { nyc: 'K\'Brơi Ha Nhi', nycBirth: '30/01/1988', nycCardNo: '068188001575', nycCardDate: '22/08/2021', nycPhone: '0263575575', nycEmail: 'kbroihanhi@gmail.com', nycPhuongXa: 'Phường Xuân Hương - Đà Lạt', nycAddressDetail: 'Số 9 Trần Phú' }
    };
    function newClaims() {
        if (typeof sxmBuild !== 'function' || typeof SXM_PERSONS === 'undefined' || typeof SXM_TH_A === 'undefined') return [];
        Object.keys(PERSONS).forEach(function (k) { if (!SXM_PERSONS[k]) SXM_PERSONS[k] = PERSONS[k]; });
        var L = [];
        var add = function (o) { try { var c = sxmBuild(o); c.tptlSeed = TPTL_SEED_VER; L.push(c); } catch (e) { console.warn('tptl build', o.code, e); } };
        add({ id: 'TPTL_TW_HS_QD', code: 'BT-2026-571', who: 'tp1', stage: 'cho-qd', k: [20, 18, 14, 10], agency: 'Viện kiểm sát nhân dân tối cao', fieldGroup: 'hình sự',
            docBase: 'Quyết định đình chỉ vụ án số 05/QĐ-VKSTC-V1 ngày 12/07/2026 (người bị thiệt hại không thực hiện hành vi phạm tội)',
            hanhVi: 'Phê chuẩn quyết định khởi tố bị can, tạm giam 04 tháng đối với người không thực hiện hành vi phạm tội.', nhanQua: 'Mất thu nhập trong thời gian bị tạm giam; chi phí thuê luật sư.', th: SXM_TH_A });
        add({ id: 'TPTL_TW_HS_TL', code: 'BT-2026-572', who: 'tp2', stage: 'thuong-luong', k: [9, 7, 3], agency: 'Tòa án nhân dân tối cao', fieldGroup: 'hình sự',
            docBase: 'Quyết định giám đốc thẩm số 12/2026/HS-GĐT ngày 20/08/2026 (tuyên không phạm tội)',
            hanhVi: 'Kết án oan người không thực hiện hành vi phạm tội.', nhanQua: 'Chấp hành án phạt tù 08 tháng; mất thu nhập, tổn thất tinh thần.', th: SXM_TH_A });
        add({ id: 'TPTL_TW_HC_TL', code: 'BT-2026-573', who: 'tp3', stage: 'thuong-luong', k: [10, 8, 4], agency: 'Bộ Tài chính', fieldGroup: 'hành chính',
            docBase: 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 88/QĐ-BTC ngày 01/08/2026',
            hanhVi: 'Xử phạt vi phạm hành chính, đình chỉ hoạt động kinh doanh không đúng thẩm quyền.', nhanQua: 'Ngừng kinh doanh 30 ngày, mất thu nhập.', th: SXM_TH_A });
        add({ id: 'TPTL_DP_HS_TL', code: 'BT-2026-574', who: 'tp4', stage: 'thuong-luong', k: [8, 6, 2], agency: 'Công an quận Hoàng Mai', fieldGroup: 'hình sự',
            docBase: 'Quyết định đình chỉ điều tra số 21/QĐ-CSĐT ngày 15/08/2026 (hành vi không cấu thành tội phạm)',
            hanhVi: 'Tạm giữ, tạm giam 02 tháng trái pháp luật.', nhanQua: 'Mất thu nhập trong thời gian bị tạm giam; tài sản bị tạm giữ hư hỏng.', th: SXM_TH_A });
        add({ id: 'TPTL_DP_HC_CT', code: 'BT-2026-575', who: 'tp5', stage: 'cho-thuc-thi', k: [26, 22, 18, 14, 10], agency: 'UBND tỉnh Lâm Đồng', fieldGroup: 'hành chính', bank: ['5101205575575', 'Agribank', 'Chi nhánh Lâm Đồng'],
            docBase: 'Quyết định hủy Quyết định thu hồi đất số 145/QĐ-UBND ngày 10/06/2026',
            hanhVi: 'Thu hồi đất trồng cà phê không đúng trình tự, thủ tục.', nhanQua: 'Mất hoa lợi vụ thu hoạch, chi phí cải tạo vườn cây.', th: SXM_TH_A });
        return L;
    }
    var origSdx = window.sdxSeedClaims;
    window.sdxSeedClaims = function () {
        var r = typeof origSdx === 'function' ? origSdx.apply(this, arguments) : 0;
        try {
            newClaims().forEach(function (c) {
                if (claimsList.some(function (x) { return x && (x.id === c.id || x.code === c.code); })) return;
                claimsList.push(c);
            });
        } catch (e) { console.warn('tptl seed claims', e); }
        return r;
    };
    // Gắn tlParticipants sau khi trang đã nạp / gộp dữ liệu mẫu (trước khi lưu claimsList)
    var origVv = window.ensureClaimsVuViec;
    if (typeof origVv === 'function') window.ensureClaimsVuViec = function () {
        var r = origVv.apply(this, arguments);
        seedAll();
        return r;
    };
    window.addEventListener('load', function () {
        setTimeout(function () { if (seedAll()) { try { saveClaimsToLocal(); } catch (e) { /* mockup */ } } }, 50);
    });

    // ======================= Màn xem =======================
    function readHtml(neg) {
        var tp = neg && neg.tlParticipants;
        var sub = function (t) { return '<span style="font-weight:600; font-size:12.5px; color:#1e293b; display:block; margin:6px 0 4px;">' + t + '</span>'; };
        var empty = function (n) { return '<tr><td colspan="' + n + '" style="text-align:center; color:#94a3b8; font-style:italic;">Chưa có thông tin</td></tr>'; };
        var agRows = '', note = '';
        var row = function (a, i) {
            var tt = a.absent ? '<span style="color:#b45309; font-weight:600;">Không tham gia</span> – Lý do: ' + E(a.absentReason || '--') : (a.legacy ? '--' : 'Tham gia');
            return '<tr' + (a.absent ? ' data-absent="1"' : '') + (a.required ? ' data-role="' + E(a.role) + '"' : '') + '><td style="text-align:center;">' + i + '</td>'
                + '<td>' + (a.legacy ? '--' : roleChips(a)) + '</td>'
                + '<td style="font-weight:600;">' + E(a.unit || '--') + '</td>'
                + '<td style="font-weight:600;">' + E(a.absent ? '--' : (a.name || '--')) + '</td><td>' + E(a.absent ? '--' : (a.position || '--')) + '</td><td>' + tt + '</td></tr>';
        };
        var reqs;
        if (tp && Array.isArray(tp.agencies)) {
            var n = 0, r1 = '', r2 = '';
            tp.agencies.forEach(function (a) { n++; if (a.required) r1 += row(a, n); else r2 += row(a, n); });
            var nt = '(Cấp đơn vị: ' + E(tp.capDonVi || '--') + '; Lĩnh vực ' + (tp.toTungHinhSu ? 'tố tụng hình sự: có Viện kiểm sát' : 'không thuộc tố tụng hình sự') + ')';
            agRows = grpRow('Thành phần bắt buộc', nt, 6) + (r1 || empty(6)) + grpRow('Thành phần khác', '', 6) + (r2 || empty(6));
            reqs = tp.requesters || [];
        } else {
            // Dữ liệu người dùng lưu trước khi áp dụng 02 khối: danh sách phẳng; nội dung text (không Chức vụ, Đơn vị) hiển thị nguyên văn
            var list = Array.isArray(neg && neg.participants) ? neg.participants : [];
            var txt = list.filter(function (p) { return p && p.name && !p.position && !p.unit; }).map(function (p) { return p.name; });
            var rows = list.filter(function (p) { return p && (p.position || p.unit); });
            agRows = rows.map(function (p, i) { return row({ unit: p.unit, name: p.name, position: p.position, legacy: true }, i + 1); }).join('') || (txt.length ? '' : empty(6));
            if (txt.length) note = '<div id="tptlLegacyNote" style="font-size:12.5px; margin:4px 0 8px;"><span style="color:#64748b;">Thành phần tham gia (dữ liệu cũ):</span> ' + E(txt.join('; ')) + '</div>';
            reqs = Array.isArray(neg && neg.claimantParticipants) ? neg.claimantParticipants : [];
        }
        var nycRows = reqs.map(function (p, i) { return '<tr><td style="text-align:center;">' + (i + 1) + '</td><td style="font-weight:600;">' + E(p.name) + '</td><td>' + E(p.idNo || '--') + '</td><td>' + E(p.address || '--') + '</td></tr>'; }).join('');
        var title = typeof vxmTitle === 'function' ? vxmTitle('fa-users', 'Thành phần tham gia thương lượng') : '<div style="font-weight:700;">Thành phần tham gia thương lượng</div>';
        return '<div id="tptlRead" style="margin:0 0 12px;">' + title
            + sub('1. Cơ quan, tổ chức tham gia thương lượng')
            + (agRows ? '<table class="custom-table" id="tlParticipantsRead" style="background:white; font-size:12.5px;"><thead><tr style="background-color:#f8fafc;"><th style="width:46px; text-align:center;">STT</th><th style="width:17%;">Thành phần</th><th style="width:22%;">Đơn vị</th><th>Họ và tên</th><th style="width:16%;">Chức vụ</th><th style="width:22%;">Tình trạng tham gia</th></tr></thead><tbody>' + agRows + '</tbody></table>' : '')
            + note
            + sub('2. Người yêu cầu bồi thường / người đại diện / người bảo vệ quyền lợi ích hợp pháp')
            + '<table class="custom-table" id="tlptNycRead" style="background:white; font-size:12.5px;"><thead><tr style="background-color:#f8fafc;"><th style="width:46px; text-align:center;">STT</th><th>Họ và tên</th><th style="width:26%;">Số giấy tờ</th><th style="width:34%;">Địa chỉ</th></tr></thead><tbody>' + (nycRows || empty(4)) + '</tbody></table>'
            + '</div>';
    }
    // Nội dung ghi Lịch sử xử lý
    function historyText(neg) {
        var tp = neg && neg.tlParticipants; if (!tp) return '';
        var ag = tp.agencies.map(function (a) {
            return a.absent ? a.unit + ': Không tham gia (Lý do: ' + a.absentReason + ')' : [a.name, a.position, a.unit].filter(Boolean).join(' - ');
        });
        var rq = tp.requesters.map(function (p) { return p.name; });
        return 'Thành phần tham gia thương lượng: (1) Cơ quan, tổ chức: ' + (ag.join('; ') || '--') + '; (2) Người yêu cầu bồi thường / người đại diện / người bảo vệ quyền lợi ích hợp pháp: ' + (rq.join('; ') || '--') + '.';
    }

    // ======================= Gắn vào luồng Thương lượng =======================
    var inRead = false;
    var origPRH = window.tlptParticipantsReadHtml;
    if (typeof origPRH === 'function') window.tlptParticipantsReadHtml = function (neg) {
        return inRead ? readHtml(neg) : origPRH.apply(this, arguments); // Phục hồi danh dự (ctvv) giữ bảng cũ
    };
    var origTRH = window.tlReadHtml;
    if (typeof origTRH === 'function') window.tlReadHtml = function (claim) {
        seedClaim(claim);
        inRead = true;
        try { return origTRH.apply(this, arguments); } finally { inRead = false; }
    };
    var origTLR = window.tlRenderEditBlock;
    if (typeof origTLR === 'function') window.tlRenderEditBlock = function (claim) {
        seedClaim(claim);
        var r = origTLR.apply(this, arguments);
        try { mountForm(claim); } catch (e) { console.warn('tptl', e); }
        return r;
    };
    var origTLS = window.tlSubmit;
    if (typeof origTLS === 'function') window.tlSubmit = function () {
        var chk = document.querySelector('input[name="tlDecision"]:checked');
        var agree = !!(chk && chk.value === 'DONG_Y' && el('tptlAgWrap'));
        blockBad = agree ? !validate() : false;
        if (agree && typeof ptState !== 'undefined') ptState.tl = []; // bảng cũ a) đã thay bằng khối 1
        var res;
        try { res = origTLS.apply(this, arguments); } finally { blockBad = false; }
        // Focus ô lỗi đầu tiên theo thứ tự hiển thị (gồm ô lỗi của khối Thành phần tham gia)
        var first = agree ? document.querySelector('#tlAgreeBlock .is-invalid') : null;
        if (first && first.focus) first.focus();
        return res;
    };
    var origSave = window.tlSave;
    if (typeof origSave === 'function') window.tlSave = function (claim, neg) {
        if (neg && neg.participation === 'DONG_Y' && el('tptlAgWrap')) {
            if (blockBad) {
                showToast('Vui lòng nhập đầy đủ các trường bắt buộc của kết quả thương lượng.', 'error');
                var f = document.querySelector('#tlAgreeBlock .is-invalid'); if (f) f.focus();
                return;
            }
            setParticipants(neg, { cap: st.cap, tths: st.tths, agencies: values(), requesters: neg.claimantParticipants || [] });
        }
        var r = origSave.apply(this, arguments);
        var txt = historyText(neg);
        if (txt && claim && claim.negotiation === neg && Array.isArray(claim.timeline) && claim.timeline.length) {
            var lt = claim.timeline[claim.timeline.length - 1];
            if (lt && lt.title === 'Thương lượng bồi thường' && lt.desc.indexOf('Thành phần tham gia thương lượng:') < 0) {
                lt.desc += ' ' + txt;
                try { persistXmTlData(claim); saveClaimsToLocal(); showCaseDetail(claim.id, false); } catch (e) { /* mockup */ }
            }
        }
        return r;
    };
    window.TPTL = { version: TPTL_SEED_VER, requiredRows: requiredRows, provinceOf: provinceOf, state: function () { return st; }, seedClaim: seedClaim, seedAll: seedAll, readHtml: readHtml };
})();
