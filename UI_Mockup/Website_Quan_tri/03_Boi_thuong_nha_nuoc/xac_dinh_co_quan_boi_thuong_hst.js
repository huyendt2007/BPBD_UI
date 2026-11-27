/*
 * Nhập hồ sơ tồn - Xác định cơ quan giải quyết bồi thường (prefix xhst). Dựng 20/11/2026 theo yêu cầu BA, cùng nguyên tắc
 * Nhập hồ sơ tồn của Giải quyết YCBT (quan_ly_boi_thuong_hst.js):
 * - Nút "Nhập hồ sơ tồn" trên danh sách (người dùng có quyền xử lý Xác định CQGQBT; không phải Lãnh đạo / người chỉ xem).
 * - Form = MH02 Tiếp nhận (dùng lại toàn bộ khối) + khối "Trạng thái hiện tại của hồ sơ" (Trạng thái, Ngày tiếp nhận)
 *   + Nguồn hồ sơ, Số hồ sơ trên giấy, Mã hồ sơ DVC (Nguồn DVC) trong THÔNG TIN CHUNG
 *   + khối "Các bước đã giải quyết trên hồ sơ giấy" theo trạng thái (Yêu cầu bổ sung / Không thụ lý / Kết quả xác định CQGQBT).
 * - Văn bản đã ban hành trên giấy: Số, Ngày văn bản, Người ký không bắt buộc; tệp đã ký bắt buộc (dòng 1 bảng Tài liệu đính kèm).
 * - Ràng buộc ngày: Ngày tiếp nhận <= Ngày văn bản; Ngày tiếp nhận không lớn hơn ngày hiện tại.
 * - Lưu: không trình, không ký duyệt, không gửi Dịch vụ công; hồ sơ vào thẳng trạng thái đã chọn, cán bộ nhập là cán bộ chủ trì.
 *   Đã chuyển CQGQBT: không chuyển cho cơ quan nào (không tạo hồ sơ GQBT). Hồ sơ tồn Xác định CQGQBT không gửi Dịch vụ công ở mọi bước
 *   (btnn_dvc_sync.js isTonXd), kể cả các bước làm tiếp trên hệ thống.
 * - Danh sách: dòng phụ "Hồ sơ tồn" dưới Mã hồ sơ, ô lọc "Hồ sơ tồn"; Xem chi tiết: dải thông tin Hồ sơ tồn.
 */
var XHST_VERSION = '20261120xhst1';
(function () {
    'use strict';
    var X = window.XHST = {};
    var on = false, DRAFT = 'XHST_NEW';
    var ST = [
        { v: 'XM', t: 'Xác minh CQGQBT' },
        { v: 'YC', t: 'Yêu cầu bổ sung', kind: 'Yêu cầu bổ sung', doc: 'Văn bản yêu cầu bổ sung hồ sơ' },
        { v: 'KT', t: 'Không thụ lý', kind: 'Không thụ lý', doc: 'Thông báo không thụ lý hồ sơ' },
        { v: 'DC', t: 'Đã chuyển CQGQBT', kind: 'Kết quả xác định CQGQBT', doc: 'Văn bản kết quả xác định cơ quan giải quyết bồi thường' }
    ];
    var NGUON = ['Tiếp nhận mới', 'Dịch vụ công', 'Chuyển CQGQBT'];
    var HT_DVC = 'Dịch vụ công';
    var R = '<span class="required">*</span>';
    function el(id) { return document.getElementById(id); }
    function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function stOf(v) { return ST.filter(function (s) { return s.v === v; })[0] || null; }

    // ------------------------------------------------------------------ CSS
    function css() {
        if (el('xhstCss')) return;
        var s = document.createElement('style'); s.id = 'xhstCss';
        s.textContent = [
            '.xhst-top{background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:8px;padding:14px 16px;margin-bottom:20px}',
            // 26/11 (BA yêu cầu): form Nhập / Cập nhật hồ sơ tồn - thanh nút cuối form luôn cố định dưới màn hình
            '#screenForm.xhst-on .form-footer{position:sticky;bottom:0;z-index:30;background:#fff;margin-top:20px;padding:12px 0;box-shadow:0 -6px 12px -6px rgba(15,23,42,.18)}',
            '.xhst-h{font-size:13px;font-weight:700;color:#1e3a8a;text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:8px}',
            '.xhst-alert{border-radius:6px;padding:10px 12px;font-size:13px;margin-bottom:12px;display:flex;gap:8px;line-height:1.5;background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a}',
            '.xhst-alert.o{background:#f0fdf4;border-color:#bbf7d0;color:#166534}',
            '.xhst-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px 16px}',
            '.xhst-grid>div{display:flex;flex-direction:column;position:relative}',
            '.xhst-grid>div>.form-label{margin-top:auto}',
            '.xhst-full{grid-column:1/-1}',
            '.xhst-err{color:#dc2626;font-size:12px;margin-top:4px;position:absolute;top:100%;left:0;white-space:nowrap}',
            '.xhst-full>.xhst-err{position:static}',
            '.xhst-blk{border:1px solid #e2e8f0;border-radius:8px;margin-bottom:12px;background:#fff}',
            '.xhst-blk-h{padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;border-radius:8px 8px 0 0;font-weight:600;color:#1e293b;font-size:13.5px}',
            '.xhst-blk-b{padding:14px}',
            '.xhst-kn{border:1px dashed #cbd5e1;border-radius:6px;padding:12px;margin-top:24px;background:#fcfcfd}',
            '.xhst-kn-h{font-size:12.5px;font-weight:600;color:#334155;margin-bottom:10px;display:flex;gap:8px;align-items:center}',
            '.xhst-tl{width:100%;border:1px solid #e2e8f0;border-radius:6px;border-collapse:separate;border-spacing:0;overflow:hidden;margin:6px 0 10px;font-size:13px}',
            '.xhst-tl th{background:#f8fafc;padding:9px 10px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155;text-align:center}',
            '.xhst-tl th:nth-child(2){text-align:left!important}',
            '.xhst-tl td{padding:8px 10px;border-bottom:1px solid #e2e8f0;vertical-align:middle}',
            '.xhst-tl td:first-child,.xhst-tl td:nth-child(3),.xhst-tl td:nth-child(4){text-align:center}',
            '.xhst-btn-tai{background:#1e3a8a;color:#fff;border:none;border-radius:4px;padding:7px 14px;font-weight:600;font-size:12px;cursor:pointer}',
            '.xhst-btn-tai.is-invalid{outline:2px solid #dc2626}',
            '.xhst-fname{display:block;font-size:11.5px;color:#334155;margin-top:4px;word-break:break-all}',
            '.xhst-ic{width:32px;height:32px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #e2e8f0;background:#fff;margin:0 2px;cursor:pointer}',
            '.xhst-ic.eye{color:#cbd5e1}.xhst-ic.del{color:#dc2626;background:#fef2f2;border-color:#fecaca}',
            '.xhst-bb{background:#fee2e2;color:#b91c1c;font-size:10.5px;font-weight:600;border-radius:10px;padding:1px 7px;margin-left:6px}',
            '.xhst-note{font-size:12px;color:#64748b;margin-top:4px}',
            '.xhst-radios{display:flex;flex-direction:column;gap:7px;font-size:13px}.xhst-radios label{display:flex;gap:8px;align-items:flex-start;cursor:pointer}',
            '.xhst-badge{display:inline-block;white-space:nowrap;background:#e5e7eb;color:#374151;border-radius:4px;padding:2px 6px;font-size:10.5px;font-weight:600;margin-top:4px}',
            '.xhst-det-note{background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #64748b;border-radius:6px;padding:10px 14px;margin:0 0 14px;font-size:13px;color:#334155;display:flex;gap:8px;align-items:flex-start}',
            '@media(max-width:1100px){.xhst-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}'
        ].join('\n');
        document.head.appendChild(s);
    }

    // ------------------------------------------------------------------ Thành phần
    function inp(id, ph, extra) { return '<input class="form-control"' + (id ? ' id="' + id + '"' : '') + ' placeholder="' + (ph || '') + '"' + (extra || '') + '>'; }
    function fld(nhan, ctl, bb, cls) { return '<div' + (cls ? ' class="' + cls + '"' : '') + '><label class="form-label">' + nhan + (bb ? R : '') + '</label>' + ctl + '</div>'; }
    function tlDong(r, i) {
        var ten = r.co_dinh ? '<div style="display:flex;align-items:center">' + esc(r.ten) + '<span class="xhst-bb">Bắt buộc</span></div>'
            : '<input class="form-control" placeholder="Nhập tên tài liệu, văn bản" value="' + esc(r.ten || '') + '">';
        return '<tr' + (r.co_dinh ? ' data-bb="1"' : '') + '><td>' + (i + 1) + '</td><td>' + ten + '</td>'
            + '<td><button type="button" class="xhst-btn-tai" onclick="XHST.tai(this)"><i class="fa-solid fa-cloud-arrow-up"></i> Tải file</button><span class="xhst-fname"></span></td>'
            + '<td style="white-space:nowrap"><span class="xhst-ic eye" title="Xem file"><i class="fa-solid fa-eye"></i></span>' + (r.co_dinh ? '' : '<span class="xhst-ic del" title="Xóa" onclick="XHST.tlXoa(this)"><i class="fa-solid fa-trash"></i></span>') + '</td></tr>';
    }
    function tlBang(ten) {
        return '<div><label class="form-label" style="display:flex;align-items:center;gap:6px"><i class="fa-solid fa-paperclip"></i> Tài liệu đính kèm' + R + '</label>'
            + '<div style="overflow-x:auto"><table class="xhst-tl"><thead><tr><th style="width:56px">STT</th><th>Tên tài liệu, văn bản</th><th style="width:190px">File đính kèm</th><th style="width:100px">Thao tác</th></tr></thead><tbody>'
            + [{ ten: ten, co_dinh: true }, {}].map(tlDong).join('') + '</tbody></table></div>'
            + '<button type="button" class="btn btn-secondary btn-sm" onclick="XHST.tlThem(this)"><i class="fa-solid fa-plus"></i> Thêm tài liệu</button>'
            + '<div class="xhst-note"><i class="fa-solid fa-circle-info"></i> Chấp nhận tệp .pdf, .doc, .docx, .jpg, .jpeg, .png (tối đa 50MB/tệp); dòng ' + esc(ten) + ': 01 tệp .pdf.</div></div>';
    }
    X.tlThem = function (b) { var tb = b.parentNode.querySelector('tbody'); tb.insertAdjacentHTML('beforeend', tlDong({}, tb.rows.length)); };
    X.tlXoa = function (x) { var tb = x.closest('tbody'); x.closest('tr').remove(); Array.prototype.forEach.call(tb.rows, function (r, i) { r.cells[0].textContent = i + 1; }); };
    // Giả lập tải tệp: ghi tên tệp vào dòng
    X.tai = function (b) {
        var tr = b.closest('tr'), ten = tr.dataset.bb ? tr.cells[1].textContent.replace('Bắt buộc', '').trim() : ((tr.querySelector('input') || {}).value || 'Tai_lieu');
        var f = ten.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') + '.pdf';
        tr.dataset.file = f; b.nextElementSibling.textContent = f;
        b.classList.remove('is-invalid'); var e = b.parentNode.querySelector('.xhst-err'); if (e) e.remove();
        var eye = tr.querySelector('.xhst-ic.eye'); if (eye) eye.style.color = '#1e3a8a';
    };
    // Văn bản đã ban hành trên giấy: Số, Ngày văn bản, Người ký không bắt buộc; tệp đã ký ở dòng 1 bảng Tài liệu đính kèm (bắt buộc)
    function kn(title) {
        return '<div class="xhst-kn"><div class="xhst-kn-h"><i class="fa-solid fa-file-signature"></i> ' + esc(title) + '</div><div class="xhst-grid">'
            + fld('Số văn bản', inp('xhstSo', 'Nhập số, ký hiệu văn bản')) + fld('Ngày văn bản', inp('xhstNgayVb', 'dd/mm/yyyy'))
            + fld('Người ký', inp('xhstNguoiKy', 'Nhập họ tên, chức vụ người ký')) + '<div></div>'
            + '<div class="xhst-full">' + tlBang(title) + '</div></div></div>';
    }

    // ------------------------------------------------------------------ Dựng giao diện
    function ensureUi() {
        css();
        var form = el('screenForm'); if (!form || el('xhstTop')) return;
        var chung = Array.prototype.filter.call(form.querySelectorAll('.sub-section-title'), function (x) { return /THÔNG TIN CHUNG/.test(x.textContent); })[0];
        var top = document.createElement('div'); top.id = 'xhstTop'; top.className = 'xhst-top'; top.style.display = 'none';
        top.innerHTML = '<div class="xhst-h"><i class="fa-solid fa-flag"></i> Trạng thái hiện tại của hồ sơ</div>'
            + '<div class="xhst-alert"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>Nhập hồ sơ đã giải quyết trên giấy. Chỉ nhập các bước đã làm xong; bước hiện tại và các bước sau xử lý trên hệ thống như hồ sơ thường. Hồ sơ tồn không trình, không ký duyệt; khi lưu, hồ sơ vào thẳng trạng thái đã chọn.</div></div>'
            + '<div class="xhst-grid">'
            + fld('Trạng thái Xác định CQGQBT hiện tại', '<select class="form-control" id="xhstSt" onchange="XHST.render()"><option value="">-- Chọn trạng thái --</option>' + ST.map(function (s) { return '<option value="' + s.v + '">' + s.t + '</option>'; }).join('') + '</select>', true)
            + fld('Ngày tiếp nhận', inp('xhstNgayTn', 'dd/mm/yyyy'), true)
            + '</div>';
        chung.parentNode.insertBefore(top, chung);
        // Nguồn hồ sơ, Số hồ sơ trên giấy, Mã hồ sơ DVC: trong lưới THÔNG TIN CHUNG
        var ht = el('formHinhThucTiepNhan'), g = ht.closest('.form-group');
        var mk = function (id, html, before) { var d = document.createElement('div'); d.className = 'form-group'; d.id = id; d.style.display = 'none'; d.innerHTML = html; g.parentNode.insertBefore(d, before ? g : g.nextSibling); return d; };
        mk('xhstWNguon', '<span class="form-label">Nguồn hồ sơ' + R + '</span><select class="form-control" id="xhstNguon" onchange="XHST.nguonDoi()">' + NGUON.map(function (v) { return '<option>' + v + '</option>'; }).join('') + '</select>', true);
        var dvc = mk('xhstWDvc', '<span class="form-label">Mã hồ sơ DVC</span><input type="text" class="form-control" id="xhstDvc" maxlength="100" placeholder="Nhập mã hồ sơ DVC (nếu có)">');
        var gy = document.createElement('div'); gy.className = 'form-group'; gy.id = 'xhstWGiay'; gy.style.display = 'none';
        gy.innerHTML = '<span class="form-label">Số hồ sơ trên giấy</span><input type="text" class="form-control" id="xhstSoGiay" maxlength="50" placeholder="Nhập số hồ sơ trên giấy">';
        g.parentNode.insertBefore(gy, dvc);
        // Các bước đã giải quyết: cuối form, ngay trên thanh nút
        var foot = form.querySelector('.form-footer');
        var w = document.createElement('div'); w.id = 'xhstSteps'; w.style.display = 'none';
        w.innerHTML = '<div class="sub-section-title"><i class="fa-solid fa-box-archive"></i> CÁC BƯỚC ĐÃ GIẢI QUYẾT TRÊN HỒ SƠ GIẤY</div><div id="xhstNote"></div><div id="xhstBlocks"></div>';
        foot.parentNode.insertBefore(w, foot);
        var b = document.createElement('div'); b.id = 'xhstButtons'; b.style.cssText = 'display:none;gap:10px;justify-content:flex-end;width:100%';
        b.innerHTML = '<button class="btn btn-secondary" onclick="showListScreen()">Hủy bỏ</button><button class="btn btn-primary" onclick="XHST.save()"><i class="fa-solid fa-floppy-disk"></i> Lưu hồ sơ tồn</button>';
        foot.appendChild(b);
        if (window.flatpickr) try { flatpickr(el('xhstNgayTn'), { dateFormat: 'd/m/Y', allowInput: true, maxDate: 'today' }); } catch (e) { }
    }
    X.nguonDoi = function () {
        var dvc = el('xhstNguon').value === HT_DVC, ht = el('formHinhThucTiepNhan');
        el('xhstWDvc').style.display = dvc ? '' : 'none';
        if (!dvc) el('xhstDvc').value = '';
        var o = Array.prototype.filter.call(ht.options, function (x) { return x.value === HT_DVC; })[0];
        if (dvc && !o) { o = document.createElement('option'); o.value = o.textContent = HT_DVC; o.dataset.xhst = '1'; ht.appendChild(o); }
        if (dvc) ht.value = HT_DVC; else { if (o && o.dataset.xhst) o.remove(); if (!ht.value || ht.value === HT_DVC) ht.value = 'Trực tiếp'; }
        ht.disabled = dvc;
    };
    X.render = function () {
        var s = stOf(el('xhstSt').value), h = '', note = '';
        if (!s) note = 'Chọn Trạng thái Xác định CQGQBT hiện tại để hiển thị các bước cần nhập.';
        else if (s.v === 'XM') note = 'Hồ sơ đã tiếp nhận trên giấy. Không có văn bản phải nhập; khi lưu, hồ sơ ở trạng thái «Xác minh CQGQBT», cán bộ Tham mưu kết quả xác định CQGQBT tiếp trên hệ thống.';
        else if (s.v === 'YC') note = 'Khi lưu, hồ sơ ở trạng thái «Yêu cầu bổ sung». Khi nhận hồ sơ bổ sung, cán bộ dùng thao tác «Bổ sung hồ sơ» trên hệ thống như hồ sơ thường.';
        else if (s.v === 'KT') note = 'Khi lưu, hồ sơ ở trạng thái «Không thụ lý». Hồ sơ không có bước tiếp theo.';
        else note = 'Khi lưu, hồ sơ ở trạng thái «Đã chuyển CQGQBT». Hệ thống không chuyển hồ sơ cho cơ quan giải quyết bồi thường; hồ sơ không có bước tiếp theo.';
        if (s && s.v === 'YC') h = blk('Yêu cầu bổ sung hồ sơ', '<div class="xhst-grid"><div class="xhst-full"><label class="form-label">Nội dung yêu cầu bổ sung' + R + '</label><textarea class="form-control" id="xhstNd" rows="3" placeholder="Nhập nội dung yêu cầu bổ sung theo văn bản đã ban hành..."></textarea></div></div>' + kn(s.doc));
        if (s && s.v === 'KT') h = blk('Không thụ lý', '<div class="xhst-grid"><div class="xhst-full"><label class="form-label">Lý do không thụ lý' + R + '</label><textarea class="form-control" id="xhstNd" rows="3" placeholder="Nhập lý do không thụ lý theo văn bản đã ban hành..."></textarea></div></div>' + kn(s.doc));
        if (s && s.v === 'DC') h = blk('Kết quả xác định cơ quan giải quyết bồi thường', '<div class="xhst-grid">'
            + '<div class="xhst-full"><label class="form-label">Căn cứ pháp lý xác định thẩm quyền' + R + '</label>' + inp('xhstCanCu', 'Nhập căn cứ pháp lý xác định thẩm quyền...') + '</div>'
            + '<div class="xhst-full"><label class="form-label">Cơ quan giải quyết bồi thường' + R + '</label><div id="xhstCqTree"></div></div>'
            + '<div class="xhst-full"><label class="form-label">Nhận định lý do xác định cơ quan giải quyết bồi thường' + R + '</label><textarea class="form-control" id="xhstNd" rows="3" placeholder="Nhập lập luận, phân tích lý do chỉ định cơ quan giải quyết bồi thường..."></textarea></div>'
            + '</div>' + kn(s.doc));
        el('xhstNote').innerHTML = '<div class="xhst-alert' + (s && s.v === 'DC' ? ' o' : '') + '"><i class="fa-solid fa-circle-info" style="margin-top:3px"></i><div>' + note + '</div></div>';
        el('xhstBlocks').innerHTML = h;
        if (el('xhstCqTree') && BTNN_WF.mountUnitTree) BTNN_WF.mountUnitTree(el('xhstCqTree'), { inputId: 'xhstCq', value: '', placeholder: '-- Chọn cơ quan giải quyết bồi thường --', onChange: function (id) { if (id) boLoi(el('xhstCqTree')); } });
        if (window.flatpickr && el('xhstNgayVb')) try { flatpickr(el('xhstNgayVb'), { dateFormat: 'd/m/Y', allowInput: true, maxDate: 'today' }); } catch (e) { }
    };
    function blk(title, body) { return '<div class="xhst-blk"><div class="xhst-blk-h">1. ' + title + '</div><div class="xhst-blk-b">' + body + '</div></div>'; }

    function setMode(v) {
        ensureUi();
        on = !!v;
        if (el('screenForm')) el('screenForm').classList.toggle('xhst-on', on);
        var show = function (id, s, d) { var x = el(id); if (x) x.style.display = s ? (d || '') : 'none'; };
        ['xhstTop', 'xhstSteps', 'xhstWNguon', 'xhstWGiay'].forEach(function (id) { show(id, on); });
        show('xhstButtons', on, 'flex'); show('btnFormSubmit', !on);
        var cancel = el('btnFormSubmit') && el('btnFormSubmit').previousElementSibling; if (cancel) cancel.style.display = on ? 'none' : '';
        if (on) {
            show('formStatusGroup', false); show('formDvcCodeGroup', false);
            el('formScreenTitle').innerHTML = '<i class="fa-solid fa-box-archive"></i> NHẬP HỒ SƠ TỒN XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG';
            ['xhstSt', 'xhstNgayTn', 'xhstSoGiay', 'xhstDvc'].forEach(function (id) { el(id).value = ''; });
            el('xhstNguon').value = NGUON[0];
            X.nguonDoi(); X.render(); xoaLoi();
        } else {
            X._sua = null;
            show('xhstWDvc', false);
            var ht = el('formHinhThucTiepNhan'); if (ht) { ht.disabled = false; Array.prototype.slice.call(ht.options).forEach(function (o) { if (o.dataset.xhst) o.remove(); }); }
        }
    }
    X.isOn = function () { return on; };

    // Mở form: dùng lại MH02 Tiếp nhận với 01 hồ sơ nháp trong bộ nhớ (không ghi kho)
    X.open = function () {
        X._sua = null;
        requestList = requestList.filter(function (r) { return r.id !== DRAFT; });
        requestList.push({ id: DRAFT, code: '', module: 'XD', status: '', hinhThucTiepNhan: 'Trực tiếp', linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', history: [] });
        showFormScreen(DRAFT, 'accept');
        setMode(true);
        window.scrollTo(0, 0);
    };

    // ------------------------------------------------------------------ Kiểm tra
    function pd(v) { var m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(v || '').trim()); return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : null; }
    function loi(c, msg) {
        if (!c) return null;
        c.classList.add('is-invalid');
        var host = c.parentNode, e = document.createElement('div'); e.className = 'xhst-err'; e.textContent = msg;
        host.appendChild(e);
        return c;
    }
    function boLoi(c) { if (!c) return; c.classList.remove('is-invalid'); var e = c.parentNode.querySelector('.xhst-err'); if (e) e.remove(); }
    function xoaLoi() {
        document.querySelectorAll('#screenForm .xhst-err').forEach(function (e) { e.remove(); });
        document.querySelectorAll('#xhstTop .is-invalid, #xhstSteps .is-invalid, #xhstWNguon .is-invalid').forEach(function (e) { e.classList.remove('is-invalid'); });
        var vb = el('xhstVbccErr'); if (vb) vb.remove();
    }
    function kiem() {
        xoaLoi();
        var bad = [], BB = 'Đây là trường bắt buộc';
        var s = stOf(el('xhstSt').value);
        if (!s) bad.push(loi(el('xhstSt'), BB));
        var tnV = el('xhstNgayTn').value.trim(), tn = pd(tnV), today = new Date(); today.setHours(0, 0, 0, 0);
        if (!tnV) bad.push(loi(el('xhstNgayTn'), BB));
        else if (tn != null && tn > today.getTime()) bad.push(loi(el('xhstNgayTn'), 'Ngày nhập vào không được lớn hơn ngày hiện tại'));
        // Văn bản làm căn cứ: tối thiểu 01 dòng có tệp
        var coTep = typeof getCleanBasisRows === 'function' && getCleanBasisRows().some(function (r) { return r.file; });
        if (!coTep) {
            var sec = el('formBasisTableBody') ? el('formBasisTableBody').closest('table') : null;
            var host = sec ? sec.parentNode : null;
            if (host) { var e = document.createElement('div'); e.id = 'xhstVbccErr'; e.className = 'xhst-err'; e.style.position = 'static'; e.textContent = 'Vui lòng nhập tối thiểu 01 văn bản làm căn cứ có tệp đính kèm.'; host.appendChild(e); bad.push(host); }
        }
        if (s && s.kind) {
            if (!el('xhstNd').value.trim()) bad.push(loi(el('xhstNd'), BB));
            if (s.v === 'DC') {
                if (!el('xhstCanCu').value.trim()) bad.push(loi(el('xhstCanCu'), BB));
                if (!(el('xhstCq') && el('xhstCq').value)) bad.push(loi(el('xhstCqTree'), BB));
            }
            document.querySelectorAll('#xhstBlocks tr[data-bb]').forEach(function (tr) { if (!tr.dataset.file) bad.push(loi(tr.querySelector('.xhst-btn-tai'), BB)); });
            var vb = pd(el('xhstNgayVb').value);
            if (vb != null && tn != null && vb < tn) bad.push(loi(el('xhstNgayVb'), 'Ngày văn bản không được nhỏ hơn Ngày tiếp nhận.'));
        }
        return bad.filter(Boolean);
    }
    // Lưu: chạy kiểm tra chung của MH02 (saveForm) ở chế độ chặn ghi, rồi kiểm tra riêng của hồ sơ tồn
    X.save = function () {
        var item = requestList.filter(function (r) { return r.id === DRAFT; })[0]; if (!item) return;
        var qua = false, oSave = window.saveItem, oToast = window.showToast, oList = window.showListScreen, oMode = formMode;
        window.saveItem = function () { qua = true; };
        window.showToast = function () { };
        window.showListScreen = function () { };
        formMode = 'xhst';
        try { saveForm(); } finally { window.saveItem = oSave; window.showToast = oToast; window.showListScreen = oList; formMode = oMode; }
        var bad = kiem();
        if (!qua || bad.length) {
            var all = Array.prototype.slice.call(document.querySelectorAll('#screenForm .is-invalid')).concat(bad);
            all.sort(function (a, b) { return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });
            var f = all[0]; if (f) { f.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (f.focus) f.focus(); }
            return;
        }
        luu(item);
    };
    function tepCuaBang() {
        var out = [];
        document.querySelectorAll('#xhstBlocks .xhst-tl tbody tr').forEach(function (tr) {
            if (!tr.dataset.file) return;
            var ten = tr.dataset.bb ? tr.cells[1].textContent.replace('Bắt buộc', '').trim() : ((tr.querySelector('input') || {}).value || tr.dataset.file);
            out.push({ name: ten, file: tr.dataset.file });
        });
        return out;
    }
    function luu(draft) {
        var W = BTNN_WF, me = getMe(), u = W.getCurrentUser() || {}, s = stOf(el('xhstSt').value);
        // 26/11 (BA chọn): Cập nhật hồ sơ tồn - giữ Mã hồ sơ, Mã vụ việc, ngày nhập, người nhập và lịch sử cũ
        var cu = X._sua ? requestList.filter(function (r) { return r.id === X._sua; })[0] : null;
        var code = cu ? cu.code : W.nextCode('XD'), vv = cu ? (cu.maVuViec || '') : (W.nextVuViecCode ? W.nextVuViecCode() : '');
        var nguon = el('xhstNguon').value, dvc = nguon === HT_DVC ? el('xhstDvc').value.trim() : '';
        var rec = JSON.parse(JSON.stringify(draft));
        ['history', 'supplementDiff', 'supplementReceived'].forEach(function (k) { delete rec[k]; });
        // Cập nhật: bỏ dữ liệu của trạng thái cũ trước khi ghi lại theo trạng thái mới
        if (cu) ['procBasis', 'procTargetUnitId', 'procTargetAgency', 'procReason', 'procDecisionFile', 'offlineDoc', 'transfer', 'ktlReason', 'supplementReason', 'supplementHistory', 'routes', 'approval', 'returned'].forEach(function (k) { delete rec[k]; });
        var at = W.nowText(), today = W.dateText ? W.dateText() : '';
        Object.assign(rec, {
            id: cu ? cu.id : 'XD' + Date.now(), code: code, module: 'XD', loaiYeuCau: REQUEST_TYPE_XDCQ, maVuViec: vv,
            rootUnitId: W.getRootId(u.unitId) || u.unitId, currentUnitId: u.unitId, chuTri: me, createdBy: me,
            routes: [], approval: null, returned: null, history: [],
            status: W.STATUS.XAC_MINH, nguonHoSo: nguon, hinhThucTiepNhan: nguon === HT_DVC ? HT_DVC : el('formHinhThucTiepNhan').value,
            dvcDossierCode: dvc, date: el('xhstNgayTn').value.trim(), receivedAt: at,
            ton: true, hst: { st: s.v, soGiay: el('xhstSoGiay').value.trim(), nhapLuc: today, nhapBoi: W.userName(me), ver: XHST_VERSION }
        });
        if (cu) { rec.receivedAt = cu.receivedAt || at; rec.createdBy = cu.createdBy || me; rec.hst.nhapLuc = (cu.hst || {}).nhapLuc || today; rec.hst.nhapBoi = (cu.hst || {}).nhapBoi || W.userName(me); }
        W.addHistory(rec, 'Nhập hồ sơ tồn', 'Nhập hồ sơ đã giải quyết trên giấy (ngày tiếp nhận ' + rec.date + '). Trạng thái hiện tại: [' + s.t + '].');
        if (s.v === 'DC') {
            var cq = el('xhstCq').value;
            Object.assign(rec, { procBasis: el('xhstCanCu').value.trim(), procTargetUnitId: cq, procTargetAgency: W.unitName(cq), procReason: el('xhstNd').value.trim() });
        }
        W.upsertRecord(rec);
        if (vv && W.linkVuViec && !cu) W.linkVuViec(code, vv);
        var ycbt = '';
        if (s.kind) {
            var docs = tepCuaBang(), file = docs[0].file;
            var vbInfo = { so: el('xhstSo').value.trim(), ngay: el('xhstNgayVb').value.trim(), nguoiKy: el('xhstNguoiKy').value.trim() };
            // 20/11: hồ sơ tồn không chuyển cho cơ quan nào (không tạo hồ sơ GQBT tại CQGQBT đã xác định), không gửi Dịch vụ công
            if (s.v !== 'DC') {
                // Yêu cầu bổ sung / Không thụ lý: ghi văn bản như Ký ngoài (luồng chung), tắt gửi Dịch vụ công
                var dv = window.BTNN_DVC; window.BTNN_DVC = null; window.BTNN_DVC_MUTE = true;
                var res;
                try { res = W.issueXdOffline(code, s.kind, file, el('xhstNd').value.trim(), docs.slice(1).map(function (d) { return { name: d.name, file: { name: d.file }, scope: 'issued' }; })); } finally { window.BTNN_DVC = dv; window.BTNN_DVC_MUTE = false; }
                if (!res || !res.ok) { showToast((res && res.message) || 'Không lưu được hồ sơ tồn.', 'error'); return; }
                rec = res.record; ycbt = res.ycbtCode || '';
            } else {
                rec.status = W.STATUS.DA_CHUYEN; rec.procDecisionFile = file;
                rec.offlineDoc = { kind: s.kind, method: 'Ký ngoài', file: file, reason: rec.procReason, at: at, by: me, attachments: [] };
                rec.transfer = { content: '', files: [], at: at, by: me, ycbtCode: '', targetUnitId: rec.procTargetUnitId, auto: false, ton: true };
                W.addHistory(rec, 'Nhập kết quả xác định CQGQBT', 'Văn bản đã ban hành trên giấy: ' + file + '. Hồ sơ tồn: không chuyển hồ sơ cho cơ quan giải quyết bồi thường.');
            }
            rec.hst.vb = vbInfo;
            W.upsertRecord(rec);
        }
        // Dữ liệu để mở lại khi Cập nhật hồ sơ tồn và điều kiện được Cập nhật / Xóa (lịch sử không thêm dòng nào sau khi lưu)
        rec.hst.nd = el('xhstNd') ? el('xhstNd').value.trim() : '';
        rec.hst.docs = s.kind ? tepCuaBang() : [];
        if (cu) {
            rec.history = (cu.history || []).slice();
            W.addHistory(rec, 'Cập nhật hồ sơ tồn', 'Cập nhật thông tin hồ sơ tồn đã nhập. Trạng thái hiện tại: [' + rec.status + '].');
            rec.hst.capNhatLuc = today;
        }
        rec.hst.trangThai = rec.status; rec.hst.soLs = (rec.history || []).length;
        W.upsertRecord(rec);
        requestList = requestList.filter(function (r) { return r.id !== rec.id; }).concat([rec]);
        setMode(false);
        requestList = requestList.filter(function (r) { return r.id !== DRAFT; });
        showToast((cu ? 'Đã cập nhật hồ sơ tồn ' : 'Đã lưu hồ sơ tồn ') + code + '. Trạng thái: ' + rec.status + '.', 'success'); // [MSG-SUC-BTNN-HST-001]
        showListScreen();
        if (typeof switchXdTab === 'function') switchXdTab(rec.status === W.STATUS.XAC_MINH || rec.status === W.STATUS.YC_BO_SUNG ? 'pending' : 'done');
    }

    // ------------------------------------------------------------------ 26/11 (BA chọn cách A): Cập nhật / Xóa hồ sơ tồn
    // Chỉ khi hồ sơ chưa có thao tác nào sau khi nhập (lịch sử không thêm dòng, trạng thái giữ như lúc lưu) và người dùng là người đã nhập; áp dụng mọi trạng thái, kể cả Đã chuyển CQGQBT
    X.duocSua = function (r) {
        if (!r || !r.ton || !r.hst || r.hst.soLs == null) return false;
        var me = ''; try { me = getMe(); } catch (e) { }
        return (r.history || []).length === r.hst.soLs && r.status === r.hst.trangThai && r.createdBy === me;
    };
    X.edit = function (id) {
        var r = requestList.filter(function (x) { return x.id === id; })[0];
        if (!X.duocSua(r)) { showToast('Hồ sơ tồn đã có thao tác xử lý tiếp, không cập nhật được.', 'error'); return; }
        var d = JSON.parse(JSON.stringify(r)); d.id = DRAFT; d.status = ''; d.history = [];
        requestList = requestList.filter(function (x) { return x.id !== DRAFT; }); requestList.push(d);
        showFormScreen(DRAFT, 'accept');
        setMode(true);
        X._sua = id;
        var h = r.hst || {};
        el('xhstSt').value = h.st || ''; el('xhstNgayTn').value = r.date || ''; el('xhstSoGiay').value = h.soGiay || '';
        el('xhstNguon').value = r.nguonHoSo || NGUON[0]; X.nguonDoi(); el('xhstDvc').value = r.dvcDossierCode || '';
        X.render();
        if (el('xhstNd')) el('xhstNd').value = h.nd || '';
        if (el('xhstCanCu')) el('xhstCanCu').value = r.procBasis || '';
        if (el('xhstCqTree') && r.procTargetUnitId && BTNN_WF.mountUnitTree) BTNN_WF.mountUnitTree(el('xhstCqTree'), { inputId: 'xhstCq', value: r.procTargetUnitId, placeholder: '-- Chọn cơ quan giải quyết bồi thường --', onChange: function (v) { if (v) boLoi(el('xhstCqTree')); } });
        var vb = h.vb || {};
        if (el('xhstSo')) { el('xhstSo').value = vb.so || ''; el('xhstNgayVb').value = vb.ngay || ''; el('xhstNguoiKy').value = vb.nguoiKy || ''; }
        var tb = document.querySelector('#xhstBlocks .xhst-tl tbody');
        (h.docs || []).forEach(function (dc, i) {
            if (!tb) return;
            if (i > 0 && i >= tb.rows.length) tb.insertAdjacentHTML('beforeend', tlDong({}, tb.rows.length));
            var tr = tb.rows[i]; if (!tr) return;
            var o = tr.querySelector('input'); if (o && !tr.dataset.bb) o.value = dc.name || '';
            tr.dataset.file = dc.file; var fn = tr.querySelector('.xhst-fname'); if (fn) fn.textContent = dc.file;
            var eye = tr.querySelector('.xhst-ic.eye'); if (eye) eye.style.color = '#1e3a8a';
        });
        el('formScreenTitle').innerHTML = '<i class="fa-solid fa-box-archive"></i> CẬP NHẬT HỒ SƠ TỒN XÁC ĐỊNH CƠ QUAN GIẢI QUYẾT BỒI THƯỜNG';
        window.scrollTo(0, 0);
    };
    X.xoa = function (id) {
        var r = requestList.filter(function (x) { return x.id === id; })[0];
        if (!X.duocSua(r)) { showToast('Hồ sơ tồn đã có thao tác xử lý tiếp, không xóa được.', 'error'); return; }
        var lam = function () {
            BTNN_WF.removeRecord(r.code);
            requestList = requestList.filter(function (x) { return x.id !== id; });
            try { if (typeof reloadRequestList === 'function') reloadRequestList(); } catch (e) { }
            try { showListScreen(); } catch (e) { }
            try { filterData(); } catch (e) { try { renderTable(); } catch (e2) { } }
            showToast('Đã xóa hồ sơ tồn ' + r.code + '.', 'success');
        };
        var msg = 'Bạn có chắc chắn muốn xóa hồ sơ tồn ' + r.code + '? Hồ sơ đã xóa không khôi phục được.';
        if (typeof showConfirmModal === 'function') showConfirmModal(msg, lam); else if (confirm(msg)) lam();
    };

    // ------------------------------------------------------------------ Danh sách: nút, nhãn, ô lọc
    function canNhap() { try { return canCreateXd() && !isLeaderMe() && !isXdViewOnly(); } catch (e) { return false; } }
    function listUi() {
        css();
        var list = el('screenList'); if (!list) return;
        if (!el('xhstBtnWrap')) {
            var tbl = list.querySelector('.table-container');
            var wrap = document.createElement('div'); wrap.id = 'xhstBtnWrap'; wrap.style.cssText = 'display:flex;justify-content:flex-end;margin:0 0 12px';
            wrap.innerHTML = '<button class="btn btn-primary" id="xhstBtnOpen" onclick="XHST.open()"><i class="fa-solid fa-box-archive"></i> Nhập hồ sơ tồn</button>';
            tbl.parentNode.insertBefore(wrap, tbl);
        }
        el('xhstBtnWrap').style.display = canNhap() ? 'flex' : 'none';
        if (!el('filterHoSoTon')) {
            var grid = list.querySelector('.filter-grid');
            var d = document.createElement('div');
            d.innerHTML = '<span class="form-label">Hồ sơ tồn</span><select class="form-control" id="filterHoSoTon"><option value="">Tất cả</option><option value="1">Có</option><option value="0">Không</option></select>';
            grid.appendChild(d);
        }
    }
    function gan() {
        var wrap = function (name, fn) { var o = window[name]; if (typeof o === 'function') window[name] = fn(o); };
        wrap('filterData', function (o) {
            return function () {
                var r = o.apply(this, arguments), f = el('filterHoSoTon') ? el('filterHoSoTon').value : '';
                if (f) { filteredList = filteredList.filter(function (x) { return !!x.ton === (f === '1'); }); currentPage = 1; renderTable(); }
                return r;
            };
        });
        // 26/11 (BA chốt): Cập nhật hồ sơ tồn, Xóa hồ sơ tồn chỉ có ở thanh nút màn chi tiết, không có trên lưới danh sách
        wrap('resetFilters', function (o) { return function () { if (el('filterHoSoTon')) el('filterHoSoTon').value = ''; return o.apply(this, arguments); }; });
        wrap('renderTable', function (o) {
            return function () {
                var r = o.apply(this, arguments);
                document.querySelectorAll('#tableBody tr').forEach(function (tr) {
                    var td = tr.cells[1]; if (!td || td.querySelector('.xhst-badge')) return;
                    var code = td.textContent.trim(), it = requestList.filter(function (x) { return x.code === code; })[0];
                    if (it && it.ton) td.insertAdjacentHTML('beforeend', '<br><span class="xhst-badge" title="Hồ sơ đã giải quyết trên giấy, nhập vào hệ thống">Hồ sơ tồn</span>');
                });
                return r;
            };
        });
        wrap('showFormScreen', function (o) { return function (id) { if (on && id !== DRAFT) setMode(false); return o.apply(this, arguments); }; });
        wrap('showListScreen', function (o) {
            return function () {
                if (on) { setMode(false); requestList = requestList.filter(function (r) { return r.id !== DRAFT; }); }
                var r = o.apply(this, arguments); listUi(); return r;
            };
        });
        wrap('showDetailScreen', function (o) {
            return function (id) {
                var r = o.apply(this, arguments);
                try {
                    var old = el('xhstDetNote'); if (old) old.remove();
                    var c = requestList.filter(function (x) { return x.id === id; })[0];
                    // Hồ sơ tồn không chuyển cho cơ quan nào: ẩn khối Kết quả chuyển cơ quan giải quyết bồi thường
                    var tb = el('dtTransferBlock');
                    if (tb) { if (c && c.ton) tb.style.display = 'none'; else if (tb.dataset.xhstHid) tb.style.display = ''; if (c && c.ton) tb.dataset.xhstHid = '1'; else delete tb.dataset.xhstHid; }
                    if (c && c.ton) {
                        var t = el('screenDetail').querySelector('.section-title');
                        var n = document.createElement('div'); n.id = 'xhstDetNote'; n.className = 'xhst-det-note';
                        var h = c.hst || {};
                        n.innerHTML = '<i class="fa-solid fa-box-archive" style="margin-top:3px;color:#475569"></i><div><b>Hồ sơ tồn</b>: hồ sơ đã giải quyết trên giấy, nhập vào hệ thống ngày ' + esc(h.nhapLuc || '') + ' bởi ' + esc(h.nhapBoi || '') + (h.soGiay ? ', số hồ sơ trên giấy ' + esc(h.soGiay) : '') + '. Các bước đã làm trên giấy được nhập khi tạo hồ sơ; bước hiện tại và các bước sau xử lý như hồ sơ thường.</div>';
                        if (t && t.parentNode) t.parentNode.insertBefore(n, t.nextSibling);
                    }
                    // 27/11 (BA yêu cầu): thứ tự nút màn chi tiết Cập nhật hồ sơ tồn | Xóa hồ sơ tồn | Đóng (đặt ngay trước nút Đóng) khi đủ điều kiện
                    var ft = el('detailWorkflowActions');
                    if (ft && X.duocSua(c)) {
                        var dong = ft.querySelector('button');
                        var html = '<button class="btn btn-primary" id="xhstBtnSua" onclick="XHST.edit(\'' + c.id + '\')"><i class="fa-solid fa-pen-to-square"></i> Cập nhật hồ sơ tồn</button>'
                            + '<button class="btn btn-secondary" id="xhstBtnXoa" style="color:#dc2626;border-color:#fca5a5;background:#fff" onclick="XHST.xoa(\'' + c.id + '\')"><i class="fa-solid fa-trash"></i> Xóa hồ sơ tồn</button>';
                        if (dong) dong.insertAdjacentHTML('beforebegin', html); else ft.insertAdjacentHTML('beforeend', html);
                    }
                } catch (e) { console.warn('xhst', e); }
                return r;
            };
        });
    }
    // Nhập hoặc chọn giá trị thì bỏ báo lỗi của ô
    function boLoiKhiNhap(ev) { var c = ev.target; if (on && c && c.classList && c.classList.contains('is-invalid') && String(c.value || '').trim() && c.closest('#xhstTop, #xhstSteps')) boLoi(c); }
    document.addEventListener('input', boLoiKhiNhap, true);
    document.addEventListener('change', boLoiKhiNhap, true);
    document.addEventListener('change', function (ev) {
        if (!on || !el('xhstVbccErr') || !ev.target.closest || !ev.target.closest('#formBasisTableBody')) return;
        setTimeout(function () { if (getCleanBasisRows().some(function (r) { return r.file; })) el('xhstVbccErr').remove(); }, 50);
    }, true);

    // 26/11: hồ sơ tồn mẫu vừa nhập (Không thụ lý), chưa có thao tác nào sau khi nhập -> màn chi tiết có «Cập nhật hồ sơ tồn», «Xóa hồ sơ tồn».
    // Tạo 01 lần (khóa localStorage), người nhập là người dùng giả lập khi tạo; xóa rồi thì không tạo lại.
    var SEED_KEY = 'xhstSeed_20261126';
    function seedTon() {
        try {
            if (localStorage.getItem(SEED_KEY)) return;
            var W = BTNN_WF, me = W.getCurrentUserId(), all = W.loadRecords();
            if (all.some(function (r) { return r.code === 'XD-2025-901'; })) { localStorage.setItem(SEED_KEY, '1'); return; }
            var mau = all.filter(function (r) { return r.module === 'XD' && r.chuTri === me; })[0] || all.filter(function (r) { return r.module === 'XD'; })[0];
            if (!mau || !me) return;
            var u = W.getUser ? (W.getUser(me) || {}) : {};
            var rec = JSON.parse(JSON.stringify(mau));
            ['routes', 'approval', 'returned', 'procBasis', 'procTargetUnitId', 'procTargetAgency', 'procReason', 'procDecisionFile', 'offlineDoc', 'transfer', 'supplementReason', 'supplementHistory', 'supplementDiff', 'supplementReceived', 'ktlReason', 'history'].forEach(function (k) { delete rec[k]; });
            var file = 'Thong_bao_khong_thu_ly_ho_so_XD-2025-901.pdf';
            Object.assign(rec, {
                id: 'WF-XD-2025-901', code: 'XD-2025-901', maVuViec: 'VVBT-2025-901', status: W.STATUS.KHONG_THU_LY, date: '15/09/2025', receivedAt: '09:00 15/09/2025',
                chuTri: me, createdBy: me, currentUnitId: u.unitId || rec.currentUnitId, rootUnitId: (u.unitId && W.getRootId(u.unitId)) || rec.rootUnitId,
                nguonHoSo: 'Tiếp nhận mới', hinhThucTiepNhan: 'Trực tiếp', dvcDossierCode: '',
                ktlReason: 'Yêu cầu bồi thường không thuộc phạm vi trách nhiệm bồi thường của Nhà nước (hồ sơ tồn - dữ liệu mẫu).',
                procDecisionFile: file, offlineDoc: { kind: 'Không thụ lý', method: 'Ký ngoài', file: file, reason: '', at: '10:00 20/09/2025', by: me, attachments: [] },
                ton: true, history: []
            });
            W.addHistory(rec, 'Nhập hồ sơ tồn', 'Nhập hồ sơ đã giải quyết trên giấy (ngày tiếp nhận 15/09/2025). Trạng thái hiện tại: [Không thụ lý].');
            rec.hst = { st: 'KT', soGiay: '125/HS-2025', nhapLuc: '26/11/2026', nhapBoi: W.userName(me), ver: XHST_VERSION, nd: rec.ktlReason,
                docs: [{ name: 'Thông báo không thụ lý hồ sơ', file: file }], vb: { so: '45/TB-STP', ngay: '20/09/2025', nguoiKy: 'Phó Giám đốc Sở Tư pháp' },
                trangThai: W.STATUS.KHONG_THU_LY, soLs: rec.history.length };
            W.upsertRecord(rec);
            localStorage.setItem(SEED_KEY, '1');
            if (typeof reloadRequestList === 'function') reloadRequestList();
        } catch (e) { console.warn('xhst seed', e); }
    }

    gan();
    document.addEventListener('DOMContentLoaded', function () { setTimeout(function () { seedTon(); listUi(); try { renderTable(); } catch (e) { } }, 0); });
    if (document.readyState !== 'loading') setTimeout(function () { seedTon(); listUi(); try { renderTable(); } catch (e) { } }, 0);
})();
