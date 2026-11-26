/*
 * Nhập hồ sơ hoàn trả tồn (prefix HTT) - Xem xét trách nhiệm hoàn trả. Chốt với BA 19/11/2026.
 * - Ghi nhận KẾT QUẢ CUỐI của hồ sơ xem xét hoàn trả đã làm ngoài hệ thống: không lập Hội đồng, không trình ký,
 *   không ghi nhận nộp tiền tiếp sau khi lưu. Kết quả chọn được: Hoàn thành / Miễn hoàn trả / Đình chỉ xem xét hoàn trả / Chấm dứt hoàn trả.
 * - Popup: Vụ việc bồi thường gốc (Combobox gõ ký tự để tìm; danh sách như MH02 của Lập hồ sơ hoàn trả mới; bấm Lưu kiểm trùng như MH02, báo [MSG-ERR-BTNN-HT-009]), Kết quả, Quyết định (Ký ngoài: Số, Ngày, Người ký,
 *   Đơn vị ban hành, tệp ở dòng 1 bảng Tài liệu đính kèm), bảng Người thi hành công vụ gây thiệt hại (+ Số tiền phải hoàn trả,
 *   Số tiền thực tế đã nộp, Kết quả khi Hoàn thành / Miễn hoàn trả), Tài liệu đính kèm (Hoàn thành: dòng Chứng từ nộp tiền hoàn trả bắt buộc).
 * - Lưới: dòng phụ "Hồ sơ tồn" dưới Mã hồ sơ, ô lọc "Hồ sơ tồn"; hồ sơ tồn chỉ ở Tab Đã xử lý; bấm dòng mở popup chế độ xem.
 * - Phạm vi xem: theo phạm vi dữ liệu hồ sơ hoàn trả hiện có (đơn vị lập hồ sơ và đơn vị giám sát).
 */
(function () {
    'use strict';
    var M = window.HTT = {};
    var KEY = 'btnn_hoantra_ton_v1';
    var KQ = { HT: 'Hoàn thành', MH: 'Miễn hoàn trả', DC: 'Đình chỉ xem xét hoàn trả', CD: 'Chấm dứt hoàn trả' };
    var DOC = { HT: 'Quyết định hoàn trả', MH: 'Quyết định hoàn trả (miễn hoàn trả)', DC: 'Quyết định đình chỉ việc xem xét trách nhiệm hoàn trả', CD: 'Quyết định chấm dứt việc xem xét trách nhiệm hoàn trả' };
    var R = '<span style="color:#ef4444;margin-left:2px">*</span>';
    var viewing = null;
    function el(id) { return document.getElementById(id); }
    function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function money(v) { return (+String(v || '').replace(/\D/g, '') || 0); }

    function css() {
        if (el('httCss')) return;
        var s = document.createElement('style'); s.id = 'httCss';
        s.textContent = [
            '.htt-badge{display:inline-block;white-space:nowrap;background:#e5e7eb;color:#374151;border-radius:4px;padding:2px 6px;font-size:10.5px;font-weight:600;margin-top:4px}',
            '#httModal{display:none;position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:3000;align-items:flex-start;justify-content:center;padding:30px 12px;overflow:auto}',
            '#httModal.on{display:flex}',
            '#httModal .htt-m{background:#fff;border-radius:10px;width:min(1040px,100%);box-shadow:0 20px 40px rgba(0,0,0,.25)}',
            '#httModal .htt-h{padding:14px 18px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center}',
            '#httModal .htt-h h3{font-size:16px;color:#1e3a8a;margin:0}',
            '#httModal .htt-b{padding:16px 18px}',
            '#httModal .htt-f{padding:12px 18px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px}',
            '#httModal .htt-x{cursor:pointer;color:#64748b;font-size:20px}',
            '#httModal .htt-alert{background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:6px;padding:10px 12px;font-size:13px;margin-bottom:14px;display:flex;gap:8px;line-height:1.5}',
            '#httModal .htt-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px 16px}',
            '#httModal .htt-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 16px}',
            '#httModal .htt-g>div,#httModal .htt-g2>div{display:flex;flex-direction:column;position:relative}',
            '#httModal .htt-g>div>*,#httModal .htt-g2>div>*{order:2}',
            '#httModal .htt-g>div>.form-label,#httModal .htt-g2>div>.form-label{order:0;margin-top:auto}',
            '#httModal .htt-note{font-size:12px;color:#64748b;margin-top:4px}',
            '#httModal .htt-err{display:none;color:#dc2626;font-size:12px;margin-top:4px;order:3}',
            '#httModal .htt-full{grid-column:1/-1}',
            '#httModal .htt-kn{border:1px dashed #cbd5e1;border-radius:6px;padding:12px;margin-top:14px;background:#fcfcfd}',
            '#httModal .htt-kn-h{font-size:12.5px;font-weight:600;color:#334155;margin-bottom:10px;display:flex;gap:8px;align-items:center}',
            '#httModal .htt-tag{background:#fef3c7;color:#b45309;border-radius:4px;padding:1px 6px;font-size:10.5px}',
            '#httModal table{width:100%;border-collapse:collapse;font-size:13px}',
            '#httModal th{background:#f8fafc;text-align:left;padding:9px 10px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;white-space:nowrap}',
            '#httModal td{padding:8px 10px;border-bottom:1px solid #e2e8f0;vertical-align:middle}',
            '#httModal td .form-control{min-width:130px}',
            '#httModal .htt-tl-wrap{border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#fff}',
            '#httModal .htt-tl{border:1px solid #e2e8f0;border-radius:6px;border-collapse:separate;border-spacing:0;overflow:hidden;margin-bottom:10px}',
            '#httModal .htt-tl th{text-align:center}#httModal .htt-tl th:nth-child(2){text-align:left}',
            '#httModal .htt-tl td:first-child,#httModal .htt-tl td:nth-child(3),#httModal .htt-tl td:nth-child(4){text-align:center}',
            '#httModal .htt-btn-tai{background:#1e3a8a;color:#fff;border:none;border-radius:4px;padding:7px 14px;font-weight:600;font-size:12px;cursor:pointer}',
            '#httModal .htt-ic{width:32px;height:32px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #e2e8f0;background:#fff;margin:0 2px;cursor:pointer}',
            '#httModal .htt-ic.eye{color:#cbd5e1}#httModal .htt-ic.del{color:#dc2626;background:#fef2f2;border-color:#fecaca}',
            '#httModal .htt-bb{background:#fee2e2;color:#b91c1c;font-size:10.5px;font-weight:600;border-radius:10px;padding:1px 7px;margin-left:6px}',
            '#httModal.view .htt-edit{display:none!important}',
            // [httcb] Ô Vụ việc bồi thường gốc: Combobox gõ ký tự để tìm (SRS 25/11/2026)
            '#httModal .htt-cb{position:relative}#httModal .htt-cb>input.form-control{padding-right:30px}',
            '#httModal .htt-cb-i{position:absolute;right:11px;top:11px;color:#64748b;font-size:12px;pointer-events:none}',
            '#httModal .htt-dd{display:none;position:absolute;left:0;right:0;top:100%;z-index:60;max-height:260px;overflow:auto;background:#fff;border:1px solid #cbd5e1;border-radius:6px;box-shadow:0 10px 24px rgba(15,23,42,.18);margin-top:2px}',
            '#httModal .htt-dd.on{display:block}#httModal .htt-dd>div{padding:8px 12px;font-size:13px;line-height:1.4;cursor:pointer;border-bottom:1px solid #f1f5f9}',
            // Toast báo lỗi khi popup đang mở (TH4 [MSG-ERR-BTNN-HT-009]) phải nằm trên lớp phủ của popup (z-index 3000)
            '#toastContainer{z-index:3100!important}',
            '#httModal .htt-dd>div:hover,#httModal .htt-dd>div.act{background:#eff6ff}#httModal .htt-dd>div.htt-nd{cursor:default;text-align:center;color:#64748b;font-style:italic;background:#fff}',
            '@media(max-width:900px){#httModal .htt-g{grid-template-columns:repeat(2,minmax(0,1fr))}}'
        ].join('\n');
        document.head.appendChild(s);
    }
    // ---------------------------------------------------------- Bảng Tài liệu đính kèm dùng chung
    function tlDong(r, i) {
        var ten = r.co_dinh ? '<div style="display:flex;align-items:center">' + r.ten + '<span class="htt-bb">Bắt buộc</span></div>' : '<input class="form-control" placeholder="Nhập tên tài liệu, văn bản" value="' + esc(r.ten || '') + '">';
        return '<tr><td>' + (i + 1) + '</td><td>' + ten + '</td><td><button type="button" class="htt-btn-tai htt-edit"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button></td>'
            + '<td style="white-space:nowrap"><span class="htt-ic eye" title="Xem file"><i class="fa-solid fa-eye"></i></span>' + (r.co_dinh ? '' : '<span class="htt-ic del htt-edit" title="Xóa" onclick="HTT.tlXoa(this)"><i class="fa-solid fa-trash"></i></span>') + '</td></tr>';
    }
    function tlBang(tens) {
        var rows = tens.map(function (t) { return { ten: t, co_dinh: true }; }).concat([{}]);
        return '<div class="htt-tl-wrap"><label class="form-label" style="display:flex;align-items:center;gap:6px"><i class="fa-solid fa-paperclip"></i> Tài liệu đính kèm' + R + '</label>'
            + '<div style="overflow-x:auto"><table class="htt-tl"><thead><tr><th style="width:56px">STT</th><th>Tên tài liệu, văn bản</th><th style="width:170px">File đính kèm</th><th style="width:100px">Thao tác</th></tr></thead><tbody>' + rows.map(tlDong).join('') + '</tbody></table></div>'
            + '<button type="button" class="btn btn-secondary btn-sm htt-edit" onclick="HTT.tlThem(this)"><i class="fa-solid fa-plus"></i> Thêm tài liệu</button>'
            + '<div class="htt-note htt-edit"><i class="fa-solid fa-circle-info"></i> Chấp nhận tệp .pdf, .doc, .docx, .jpg, .jpeg, .png (tối đa 50MB/tệp); ' + (tens.length > 1 ? 'các dòng ' + tens.join(', ') + ': mỗi dòng 01 tệp .pdf' : 'dòng ' + tens[0] + ': 01 tệp .pdf') + '.</div></div>';
    }
    M.tlThem = function (b) { var tb = b.closest('.htt-tl-wrap').querySelector('tbody'); tb.insertAdjacentHTML('beforeend', tlDong({}, tb.rows.length)); };
    M.tlXoa = function (x) { var tb = x.closest('tbody'); x.closest('tr').remove(); Array.prototype.forEach.call(tb.rows, function (r, i) { r.cells[0].textContent = i + 1; }); };

    // ---------------------------------------------------------- Popup
    function ensure() {
        css();
        if (el('httModal')) return;
        var m = document.createElement('div'); m.id = 'httModal';
        m.innerHTML = '<div class="htt-m"><div class="htt-h"><h3><i class="fa-solid fa-box-archive"></i> <span id="httTitle">Nhập hồ sơ hoàn trả tồn</span></h3><span class="htt-x" onclick="HTT.close()">×</span></div>'
            + '<div class="htt-b"><div class="htt-alert"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>Ghi nhận kết quả cuối của hồ sơ xem xét trách nhiệm hoàn trả đã làm ngoài hệ thống. Không lập Hội đồng, không trình ký; sau khi lưu không ghi nhận nộp tiền tiếp trên hệ thống.</div></div>'
            + '<div class="htt-g2"><div><label class="form-label">Vụ việc bồi thường gốc' + R + '</label><div class="htt-note">Vụ việc đã hoàn tất chi trả tiền bồi thường (kể cả hồ sơ tồn «Hoàn thành»), chưa có hồ sơ hoàn trả.</div><div class="htt-cb"><input type="text" class="form-control" id="httClaimTxt" placeholder="-- Chọn hoặc gõ để tìm vụ việc --" autocomplete="off" spellcheck="false" oninput="HTT.timDs()" onfocus="HTT.moDs()" onkeydown="HTT.phim(event)"><i class="fa-solid fa-chevron-down htt-cb-i"></i><input type="hidden" id="httClaim"><div class="htt-dd" id="httClaimDd"></div></div><div class="htt-err" id="httClaimErr">Đây là trường bắt buộc</div></div>'
            + '<div><label class="form-label">Kết quả xem xét trách nhiệm hoàn trả' + R + '</label><select class="form-control" id="httSt" onchange="HTT.renderForm()">' + Object.keys(KQ).map(function (k) { return '<option value="' + k + '">' + KQ[k] + '</option>'; }).join('') + '</select></div></div>'
            + '<div id="httQd"></div><div id="httCb"></div><div id="httTl" style="margin-top:14px"></div></div>'
            + '<div class="htt-f"><button class="btn btn-secondary" onclick="HTT.close()">Đóng</button><button class="btn btn-primary htt-edit" onclick="HTT.save()"><i class="fa-solid fa-floppy-disk"></i> Lưu hồ sơ hoàn trả tồn</button></div></div>';
        document.body.appendChild(m);
    }
    function unitName() {
        try { var W = window.BTNN_WF; if (W && W.getUser && W.getCurrentUserId) { var u = W.getUser(W.getCurrentUserId()); if (u) return W.unitName((W.getRootId && W.getRootId(u.unitId)) || u.unitId) || ''; } } catch (e) { }
        return 'Sở Tư pháp Hà Nội';
    }
    M.renderForm = function (d) {
        var v = el('httSt').value, money_ = v === 'HT' || v === 'MH', q = (d && d.tonQd) || {};
        el('httQd').innerHTML = '<div class="htt-kn"><div class="htt-kn-h"><i class="fa-solid fa-file-signature"></i> ' + DOC[v] + '</div><div class="htt-g">'
            + '<div><label class="form-label">Số văn bản</label><input class="form-control" id="httSo" placeholder="Nhập số, ký hiệu văn bản" value="' + esc(q.so || '') + '"><div class="htt-err" id="httSoErr">Đây là trường bắt buộc</div></div>'
            + '<div><label class="form-label">Ngày văn bản</label><input class="form-control" id="httNgay" placeholder="dd/mm/yyyy" value="' + esc(q.ngay || '') + '"><div class="htt-err" id="httNgayErr">Đây là trường bắt buộc</div></div>'
            + '<div><label class="form-label">Người ký</label><input class="form-control" id="httNk" placeholder="Nhập họ tên, chức vụ người ký" value="' + esc(q.nguoiKy || '') + '"><div class="htt-err" id="httNkErr">Đây là trường bắt buộc</div></div>'
            + '<div><label class="form-label">Đơn vị ban hành' + R + '</label><select class="form-control" id="httDv"><option>' + esc(q.donVi || unitName()) + '</option></select></div>'
            + '<div class="htt-full">' + tlBang([DOC[v]]) + '</div></div></div>';
        var cb = (d && d.refundOfficers && d.refundOfficers.length) ? d.refundOfficers : [{ name: '', position: '', agency: '', total: '', paid: '' }];
        var row = function (o, i) {
            return '<tr><td style="text-align:center">' + (i + 1) + '</td><td><input class="form-control" placeholder="Nhập họ và tên" value="' + esc(o.name) + '"></td><td><input class="form-control" placeholder="Nhập chức vụ" value="' + esc(o.position || o.role || '') + '"></td><td><input class="form-control" placeholder="Nhập cơ quan trực tiếp quản lý" value="' + esc(o.agency || '') + '"></td>'
                + (money_ ? '<td><input class="form-control" style="text-align:right" placeholder="0" value="' + (o.total ? Number(o.total).toLocaleString('vi-VN') : (v === 'MH' ? '0' : '')) + '"></td><td><input class="form-control" style="text-align:right" placeholder="0" value="' + (o.paid ? Number(o.paid).toLocaleString('vi-VN') : (v === 'MH' ? '0' : '')) + '"></td><td><select class="form-control"><option' + (v === 'HT' ? ' selected' : '') + '>Hoàn thành</option><option' + (v === 'MH' ? ' selected' : '') + '>Miễn hoàn trả</option></select></td>' : '')
                + '<td class="htt-edit" style="text-align:center"><span class="htt-ic del" title="Xóa" onclick="this.closest(\'tr\').remove()"><i class="fa-solid fa-trash"></i></span></td></tr>';
        };
        el('httCb').innerHTML = '<div style="margin-top:14px"><label class="form-label">Người thi hành công vụ gây thiệt hại' + R + '</label><div style="overflow-x:auto"><table id="httCbT"><thead><tr><th style="width:56px;text-align:center">STT</th><th>Họ và tên' + R + '</th><th>Chức vụ</th><th>Cơ quan trực tiếp quản lý' + R + '</th>'
            + (money_ ? '<th>Số tiền phải hoàn trả (đ)' + R + '</th><th>Số tiền thực tế đã nộp (đ)' + R + '</th><th>Kết quả' + R + '</th>' : '') + '<th class="htt-edit" style="width:70px;text-align:center">Thao tác</th></tr></thead><tbody>' + cb.map(row).join('') + '</tbody></table></div>'
            + '<button type="button" class="btn btn-secondary btn-sm htt-edit" style="margin-top:8px" onclick="HTT.themCb()"><i class="fa-solid fa-plus"></i> Thêm người thi hành công vụ</button></div>';
        M._row = row;
        el('httTl').innerHTML = v === 'HT' ? tlBang(['Chứng từ nộp tiền hoàn trả']) : '';
    };
    M.themCb = function () { var tb = el('httCbT').querySelector('tbody'); tb.insertAdjacentHTML('beforeend', M._row({ name: '' }, tb.rows.length)); };
    // [httcb] Danh sách Vụ việc chọn được: cùng điều kiện, cùng nguồn với popup MH02 của Lập hồ sơ hoàn trả mới (SRS mục c.2):
    // hồ sơ GQBT đã hoàn tất chi trả (kể cả hồ sơ tồn «Hoàn thành») và dòng vụ việc tại Tòa án; loại vụ việc đã có hồ sơ hoàn trả,
    // kiểm theo hồ sơ GQBT hoặc theo dòng vụ việc tại Tòa án, không theo Mã vụ việc. Sắp theo Ngày hoàn tất chi tăng dần.
    var DS = [];
    function dmy(x) { var p = String(x || '').split('/'); return p.length === 3 ? p[2] + p[1] + p[0] : ''; }
    function khongDau(x) { return String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); }
    function nhan(ma, canCu, ten) { return ma + ' - ' + canCu + (ten ? ' - ' + ten : ''); }
    function dsDuDieuKien() {
        var out = [], TA = window.HT_TOA_AN;
        try {
            var inScope = function (x) { return typeof htSourceInScope !== 'function' || htSourceInScope(x); };
            var codes = (typeof PAID_CLAIM_CODES !== 'undefined' ? PAID_CLAIM_CODES : []).concat((window.HT_SOURCE_CLAIMS || []).filter(inScope).map(function (x) { return x.claimCode; }));
            codes.filter(function (c, i, a) { return a.indexOf(c) === i && !existingRefundCodeOf(vuViecOfClaim(c), c); }).forEach(function (c) {
                var seed = getClaimSeedData(c), ma = vuViecOfClaim(c), ten = (typeof CLAIMANT_BY_CODE !== 'undefined' && CLAIMANT_BY_CODE[c]) || seed.claimant || '';
                out.push({ key: 'CQ:' + c, ma: ma, canCu: 'Hồ sơ GQBT ' + c, ten: ten, ngay: seed.paidDate, label: nhan(ma, 'Hồ sơ GQBT ' + c, ten) });
            });
            if (TA) (TA.LINES || []).filter(function (l) { return TA.thuocDien(l) && inScope({ agency: l.court.agency }) && !existingCourtRefundCodeOf(l.court.id); }).forEach(function (l) {
                var c = l.court, cc = 'Bản án/Quyết định số ' + (c.verdictNo || '');
                out.push({ key: 'TA:' + c.id, ma: c.code, canCu: cc, ten: c.nyc.name || '', ngay: l.chiTra.ngayHoanTat, label: nhan(c.code, cc, c.nyc.name || '') });
            });
        } catch (e) { }
        return out.sort(function (x, y) { return dmy(x.ngay).localeCompare(dmy(y.ngay)); });
    }
    function mucOf(key) { return DS.filter(function (x) { return x.key === key; })[0] || null; }
    // Vụ việc của lựa chọn đã có hồ sơ hoàn trả chưa (kể cả hồ sơ người dùng khác vừa khởi tạo hoặc nhập)
    function maHoSoDaCo(m) {
        return m.key.indexOf('TA:') === 0 ? existingCourtRefundCodeOf(m.key.slice(3)) : existingRefundCodeOf(vuViecOfClaim(m.key.slice(3)), m.key.slice(3));
    }
    function veDs(loc) {
        var q = khongDau(loc || ''), dd = el('httClaimDd'), sel = el('httClaim').value;
        var ds = DS.filter(function (x) { return !q || khongDau(x.label).indexOf(q) >= 0; });
        dd.innerHTML = ds.length ? ds.map(function (x) { return '<div data-k="' + esc(x.key) + '" class="' + (x.key === sel ? 'act' : '') + '" onmousedown="HTT.chon(\'' + esc(x.key) + '\')">' + esc(x.label) + '</div>'; }).join('')
            : '<div class="htt-nd">Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.</div>';
    }
    M.moDs = function () { if (el('httModal').classList.contains('view')) return; var t = el('httClaimTxt'); if (el('httClaim').value) t.select(); veDs(el('httClaim').value ? '' : t.value); el('httClaimDd').classList.add('on'); };
    M.timDs = function () { el('httClaim').value = ''; el('httClaimTxt').classList.remove('is-invalid'); el('httClaimErr').style.display = 'none'; veDs(el('httClaimTxt').value); el('httClaimDd').classList.add('on'); };
    M.chon = function (k) {
        var m = mucOf(k); if (!m) return;
        el('httClaim').value = k; el('httClaimTxt').value = m.label; el('httClaimTxt').classList.remove('is-invalid'); el('httClaimErr').style.display = 'none';
        el('httClaimDd').classList.remove('on');
    };
    M.dongDs = function () { var d = el('httClaimDd'); if (!d) return; d.classList.remove('on'); if (!el('httClaim').value && el('httClaimTxt')) el('httClaimTxt').value = ''; };
    M.phim = function (e) {
        var dd = el('httClaimDd'), it = Array.prototype.slice.call(dd.querySelectorAll('[data-k]')), i = it.findIndex(function (x) { return x.classList.contains('act'); });
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); dd.classList.add('on'); if (!it.length) return;
            if (i >= 0) it[i].classList.remove('act'); i = e.key === 'ArrowDown' ? (i + 1) % it.length : (i <= 0 ? it.length - 1 : i - 1);
            it[i].classList.add('act'); it[i].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') { e.preventDefault(); if (i >= 0) M.chon(it[i].dataset.k); else if (it.length === 1) M.chon(it[0].dataset.k); }
        else if (e.key === 'Escape') { M.dongDs(); }
    };
    document.addEventListener('mousedown', function (e) { if (el('httModal') && !e.target.closest('.htt-cb')) M.dongDs(); });
    // Làm mới danh sách (sau khi báo trùng): bỏ lựa chọn hiện tại, tính lại danh sách; các ô khác giữ nguyên
    M.lamMoiDs = function () { DS = dsDuDieuKien(); el('httClaim').value = ''; el('httClaimTxt').value = ''; veDs(''); };
    M.open = function () {
        ensure(); viewing = null;
        el('httModal').classList.remove('view');
        el('httTitle').textContent = 'Nhập hồ sơ hoàn trả tồn';
        el('httClaimTxt').disabled = false; el('httSt').disabled = false;
        M.lamMoiDs();
        el('httSt').value = 'HT';
        M.renderForm();
        el('httModal').classList.add('on');
    };
    M.close = function () { if (el('httModal')) el('httModal').classList.remove('on'); };
    // Chế độ xem: hồ sơ hoàn trả tồn đã lưu
    M.view = function (id) {
        var d = dossiersList.filter(function (x) { return x.id === id; })[0]; if (!d) return;
        ensure(); viewing = d;
        el('httTitle').textContent = 'Hồ sơ hoàn trả tồn ' + d.code;
        var tenV = d.claimant || ((typeof CLAIMANT_BY_CODE !== 'undefined' && CLAIMANT_BY_CODE[d.claimCode]) || '');
        el('httClaim').value = d.code; el('httClaimTxt').value = d.courtCaseId ? nhan(d.maVuViec || '', 'Bản án/Quyết định số ' + (d.verdictNo || ''), tenV) : (d.maVuViec ? d.maVuViec + ' - ' : '') + 'Hồ sơ GQBT ' + d.claimCode + (tenV ? ' - ' + tenV : '');
        el('httClaimDd').classList.remove('on');
        el('httSt').value = d.tonKq || 'HT';
        M.renderForm(d);
        el('httModal').classList.add('view', 'on');
        el('httModal').querySelectorAll('input,select,textarea').forEach(function (x) { x.disabled = true; });
    };
    M.save = function () {
        var bad = null;
        var chk = function (id, ok) { var e = el(id + 'Err'); if (e) e.style.display = ok ? 'none' : 'block'; el(id).classList.toggle('is-invalid', !ok); if (!ok && !bad) bad = el(id); };
        chk('httClaim', !!el('httClaim').value);
        el('httClaimTxt').classList.toggle('is-invalid', !el('httClaim').value);
        // Bảng Người thi hành công vụ: dòng có Họ và tên phải đủ Cơ quan trực tiếp quản lý (và 02 cột số tiền khi Hoàn thành / Miễn hoàn trả)
        var money0 = el('httSt').value === 'HT' || el('httSt').value === 'MH';
        el('httModal').querySelectorAll('.htt-loi').forEach(function (e) { e.remove(); });
        var coTen = false;
        Array.prototype.forEach.call(el('httCbT').querySelectorAll('tbody tr'), function (tr) {
            var i = tr.querySelectorAll('input');
            i.forEach(function (x) { x.classList.remove('is-invalid'); });
            if (!i[0].value.trim()) return;
            coTen = true;
            [i[2]].concat(money0 ? [i[3], i[4]] : []).forEach(function (x) {
                if (x && !x.value.trim()) { x.classList.add('is-invalid'); if (!bad) bad = x; }
            });
        });
        if (!coTen) {
            var e = document.createElement('div'); e.className = 'htt-loi'; e.style.cssText = 'color:#dc2626;font-size:12px;margin-top:6px';
            e.textContent = 'Vui lòng nhập tối thiểu 01 người thi hành công vụ gây thiệt hại.';
            el('httCbT').closest('div').insertAdjacentElement('afterend', e);
            bad = bad || el('httCbT').querySelector('tbody input');
        }
        if (bad) { (bad === el('httClaim') ? el('httClaimTxt') : bad).focus(); return; }
        // TH4 - Vụ việc đã có hồ sơ hoàn trả (kiểm trùng như MH02, SRS mục MH02 chức năng Lưu): báo [MSG-ERR-BTNN-HT-009], làm mới danh sách, không lưu
        var chon = mucOf(el('httClaim').value), daCo = chon ? maHoSoDaCo(chon) : '';
        if (chon && daCo) {
            try { showToast('Vụ việc ' + chon.ma + ' (' + chon.canCu + ') đã có hồ sơ xem xét trách nhiệm hoàn trả ' + daCo + '. Vụ việc này không còn đủ điều kiện lập hồ sơ xem xét trách nhiệm hoàn trả.', 'danger'); } catch (e) { }
            M.lamMoiDs();
            return;
        }
        var v = el('httSt').value, claim = chon && chon.key.indexOf('CQ:') === 0 ? chon.key.slice(3) : '', money_ = v === 'HT' || v === 'MH';
        var officers = Array.prototype.map.call(el('httCbT').querySelectorAll('tbody tr'), function (tr) {
            var i = tr.querySelectorAll('input,select');
            return { name: i[0].value.trim(), position: i[1].value.trim(), role: i[1].value.trim(), agency: i[2].value.trim(), loi: '', total: money_ ? money(i[3].value) : 0, paid: money_ ? money(i[4].value) : 0, status: money_ ? (i[5].value === 'Miễn hoàn trả' ? 'Miễn hoàn trả' : 'Hoàn tất') : '', refundMethod: '', progressClass: 'success', nextDate: '—' };
        }).filter(function (o) { return o.name; });
        var d;
        try {
            if (chon && chon.key.indexOf('TA:') === 0) {
                var lTA = (window.HT_TOA_AN.LINES || []).filter(function (l) { return l.court.id === chon.key.slice(3); })[0];
                d = Object.assign(createPendingRefundDossier(''), window.HT_TOA_AN.keThua(lTA), { officerName: '', officerRole: '', refundOfficers: [] });
            } else d = createPendingRefundDossier(claim);
        } catch (e) { d = { id: 'HT-2026-' + Date.now() % 1000, code: 'HT-2026-' + Date.now() % 1000, claimCode: claim, claimAmt: 0 }; }
        var ngay = el('httNgay').value.trim(), total = officers.reduce(function (s, o) { return s + o.total; }, 0);
        Object.assign(d, {
            ton: true, tonKq: v, status: KQ[v], loaiTrinh: '', agency: d.agency || unitName(), claimAmt: d.claimAmt || 0,
            tonQd: { so: el('httSo').value.trim(), ngay: ngay, nguoiKy: el('httNk').value.trim(), donVi: el('httDv').value },
            qdDate: ngay, refundTotal: total, refundOfficers: officers,
            payments: officers.filter(function (o) { return o.paid > 0; }).map(function (o) { return { ky: 'Hồ sơ tồn - ' + o.name, method: 'Đã nộp trước khi nhập hồ sơ tồn', amt: o.paid, date: ngay, code: '' }; }),
            dateCreated: (typeof gqToday === 'function' ? gqToday() : new Date().toLocaleDateString('vi-VN'))
        });
        try { if (claim) d.maVuViec = vuViecOfClaim(claim); if (window.BTNN_WF && BTNN_WF.linkVuViec) BTNN_WF.linkVuViec(d.code, d.maVuViec); } catch (e) { }
        dossiersList.unshift(d);
        try { saveCreatedRefundDossiers([d].concat(loadCreatedRefundDossiers().filter(function (x) { return x.code !== d.code; }))); } catch (e) { }
        M.close();
        try { renderRefundTable(); } catch (e) { }
        try { showToast('Đã lưu hồ sơ hoàn trả tồn ' + d.code + '. Trạng thái: ' + KQ[v] + '.', 'success'); } catch (e) { }
    };
    // Dòng lưới của hồ sơ tồn (xem_xet_hoan_tra_pham_vi.js): trạng thái = kết quả đã nhập; tiền = tổng phải hoàn trả / đã nộp
    M.row = function (d, sc) {
        var off = (d.refundOfficers || []).filter(function (o) { return o && o.name; }).map(function (o) { return { name: o.name, unit: o.agency || '', st: '' }; });
        var tong = d.refundTotal || 0, paid = (d.payments || []).reduce(function (s, p) { return s + (p.amt || 0); }, 0);
        return { d: d, sc: sc, chung: d.status, off: off, m: { tong: tong, paid: paid, hd: tong, conLai: Math.max(0, tong - paid), anyIssued: true, ended: off.length, n: off.length } };
    };
    M.badge = function (d) { return d && d.ton ? '<br><span class="htt-badge" title="Hồ sơ xem xét hoàn trả đã làm ngoài hệ thống, nhập kết quả cuối">Hồ sơ tồn</span>' : ''; };
    M.match = function (d) { var f = el('filterHoSoTonHt'); var v = f ? f.value : ''; return !v || (d.ton ? '1' : '0') === v; };

    // Dữ liệu mẫu: hồ sơ hoàn trả tồn Hoàn thành của vụ việc tồn BT-2026-064 (đơn vị Cục Thi hành án dân sự tỉnh Bắc Ninh)
    function seed() {
        if (typeof dossiersList === 'undefined' || dossiersList.some(function (d) { return d.code === 'HT-2025-951'; })) return;
        dossiersList.push({
            id: 'HT-2025-951', code: 'HT-2025-951', claimCode: 'BT-2025-904', maVuViec: '', ton: true, tonKq: 'HT', status: 'Hoàn thành', loaiTrinh: '',
            claimSummary: 'Ban hành quyết định thu hồi đất không đúng thẩm quyền (hồ sơ giấy năm 2025).', agency: 'Sở Tư pháp Hà Nội', claimAmt: 96000000, claimDate: '10/04/2025',
            officerName: 'Phạm Đức Long', officerRole: 'Chuyên viên', refundTotal: 24000000, refundMethod: 'Một lần', refundMonthly: 0,
            tonQd: { so: '12/QĐ-STP', ngay: '20/10/2025', nguoiKy: 'Lê Hoàng Nam - Giám đốc', donVi: 'Sở Tư pháp Hà Nội' },
            qdDate: '20/10/2025', dateCreated: '12/11/2026', hdDecision: '', hdDate: '',
            refundOfficers: [{ name: 'Phạm Đức Long', position: 'Chuyên viên', role: 'Chuyên viên', agency: 'Sở Tài nguyên và Môi trường Hà Nội', loi: '', total: 24000000, paid: 24000000, status: 'Hoàn tất', refundMethod: 'Một lần', progressClass: 'success', nextDate: '—' }],
            payments: [{ ky: 'Hồ sơ tồn - Phạm Đức Long', method: 'Đã nộp trước khi nhập hồ sơ tồn', amt: 24000000, date: '20/10/2025', code: '' }],
            gateLog: []
        });
    }
    // Hồ sơ tồn: chỉ ở Tab Đã xử lý
    function wrap(name, fn) { var o = window[name]; if (typeof o === 'function') window[name] = fn(o); }
    wrap('htInTab', function (o) { return function (tab, d) { if (d && d.ton) return tab !== 'pending'; return o.apply(this, arguments); }; });
    try { seed(); } catch (e) { console.warn('htt seed', e); }
})();
