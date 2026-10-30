/*
 * Chi tiết hồ sơ hoàn trả - Prompt 2: Bước 1 (Thành lập Hội đồng) + Bước 2 (Ý kiến của Hội đồng), Stepper 04 bước, phạm vi người xem.
 * - Phạm vi người xem (giả lập, tham số ?scope= hoặc sessionStorage htMockScope, đồng bộ màn danh sách):
 *   + don_vi_chu: Đơn vị tạo hội đồng - nhập Bước 1, Bước 2, thấy toàn bộ cán bộ.
 *   + don_vi_a / don_vi_b: Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại - Bước 1, Bước 2 chỉ xem, chỉ thấy cán bộ của đơn vị.
 *   + stp: Sở Tư pháp - chỉ xem Bước 1, 2; chỉ thấy cán bộ của đơn vị thuộc phạm vi quản lý.
 *   + lanh_dao: Lãnh đạo phê duyệt (góc nhìn Lãnh đạo của trang).
 * - Nạp sau chi_tiet_ho_so_hoan_tra_tlhd.js / _dcht.js; ghi đè các hàm Bước 2 và bổ sung Ký ngoài có thông tin QĐ cho Bước 1.
 */
(function () {
    const U_CHU = 'UBND phường Việt Hưng', U_A = 'UBND Phường Bồ Đề', U_B = 'UBND phường Hải An', U_STP = 'Sở Tư pháp Hà Nội';
    const STP_UNITS = [U_A, U_CHU];
    const SCOPE_UNIT = { don_vi_chu: U_CHU, don_vi_a: U_A, don_vi_b: U_B, stp: U_STP, lanh_dao: '' };
    // Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại của dữ liệu mẫu (đồng bộ màn danh sách)
    const OFFICER_UNIT = {
        'Nguyễn Văn Đạt': U_A, 'Lê Văn Cường': U_A, 'Hoàng Văn D': U_A, 'Trần Thị Bình': U_B, 'Hoàng Thị M': U_A, 'Phạm Văn Thiếu Sót': U_A,
        'Trần Văn Lỗi': U_B, 'Vũ Văn Tài': U_A, 'Ngô Quyền': U_B, 'Nguyễn Văn Chết': U_A, 'Lưu Quốc Toàn': U_B, 'Bùi Văn Nam': U_A,
        'Phạm Quốc Huy': U_A, 'Đặng Thị Lan': U_A, 'Đỗ Thị Bình': U_A, 'Vũ Đình Trọng': U_B, 'Hoàng Văn Tuấn': U_A
    };
    const PAY_UNIT_DEMO = { 'Trần Thị Bình': U_A, 'Đặng Thị Lan': U_B };
    const PRE_SPLIT = ['Chờ thành lập hội đồng', 'Chờ duyệt QĐ thành lập', 'Bị trả lại thành lập HĐ', 'Từ chối duyệt QĐ thành lập', 'Họp hội đồng', 'Không xem xét trách nhiệm hoàn trả'];
    const REQ = 'Đây là trường bắt buộc';

    function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
    function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* bỏ qua */ } }
    const q = new URLSearchParams(location.search);
    let scope = q.get('scope') || ssGet('htMockScope') || '';
    if (!(scope in SCOPE_UNIT)) scope = (q.get('role') === 'lanh_dao' || q.get('role') === 'leader') ? 'lanh_dao' : 'don_vi_chu';
    if (q.get('role') === 'lanh_dao' && !q.get('scope')) scope = 'lanh_dao';
    ssSet('htMockScope', scope);
    let myUnit = SCOPE_UNIT[scope];
    const isOwnerScope = () => scope === 'don_vi_chu' || (scope !== 'lanh_dao' && ownerOf(activeDossier) === myUnit);
    function ownerOf(d) { return d && d.code === 'HT-2026-002' ? U_A : (d && d.ownerUnit) || U_CHU; }
    function el(id) { return document.getElementById(id); }
    function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function money(n) { return (Number(n) || 0).toLocaleString('vi-VN'); }
    function parseMoney(v) { return parseInt(String(v || '').replace(/\D/g, ''), 10) || 0; }
    function nowShort() { const d = new Date(), p = n => String(n).padStart(2, '0'); return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()); }

    // Phương thức hoàn trả: nhãn ngắn Một lần / Nhiều lần (dữ liệu cũ: Hoàn trả một lần, Khấu trừ lương, Nhiều lần...)
    function htMethod(v) { return !v ? '' : (/một lần/i.test(v) ? 'Một lần' : 'Nhiều lần'); }
    window.htMethod = htMethod;
    // Giảm/Miễn hoàn trả: giá trị chuẩn (Hoàn trả = không giảm, không miễn / Giảm mức hoàn trả / Miễn hoàn trả); không giảm, không miễn hiển thị "-"
    function xlFull(v) { return v === 'GIAM' || v === 'Giảm mức hoàn trả' ? 'Giảm mức hoàn trả' : (v === 'MIEN' || v === 'Miễn hoàn trả' ? 'Miễn hoàn trả' : 'Hoàn trả'); }
    const xlLabel = v => { const f = xlFull(v); return f === 'Hoàn trả' ? '-' : f; };
    window.htXlLabel = xlLabel;
    // Mức độ lỗi: Vô ý / Cố ý nhưng không bị truy cứu trách nhiệm hình sự / Cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội / Khác (nhập nội dung)
    const LOI_LIST = ['Vô ý', 'Cố ý nhưng không bị truy cứu trách nhiệm hình sự', 'Cố ý mà có bản án đã có hiệu lực pháp luật tuyên phạm tội', 'Khác'];
    // Dữ liệu cũ "Cố ý" đưa về "Cố ý nhưng không bị truy cứu trách nhiệm hình sự"
    const loiNorm = v => v === 'Cố ý' ? LOI_LIST[1] : v;
    window.HT_LOI_LIST = LOI_LIST;
    // Pill trạng thái dùng chung Bước 2, 3, 4 (mỗi nhóm trạng thái một màu)
    const PILL = {
        teal: ['#f0fdfa', '#0f766e', '#14b8a6'], amber: ['#fffbeb', '#b45309', '#f59e0b'], indigo: ['#eef2ff', '#4338ca', '#6366f1'], red: ['#fef2f2', '#b91c1c', '#ef4444'], tralai: ['#fef3c7', '#b45309', '#fde68a'],
        emerald: ['#ecfdf5', '#047857', '#10b981'], pink: ['#fdf2f8', '#be185d', '#ec4899'], slate: ['#f1f5f9', '#475569', '#94a3b8'], orange: ['#fff7ed', '#c2410c', '#f97316']
    };
    function pillTone(t) {
        t = String(t || '');
        if (/^Bị trả lại/.test(t)) return 'tralai';
        if (/^Chờ duyệt/.test(t)) return 'indigo';
        if (/^Chờ trả lại/.test(t)) return 'orange';
        if (/^Chờ ban hành/.test(t)) return 'amber';
        if (/^Thu (hồi )?tiền/.test(t)) return 'teal';
        if (/^(Đã ban hành|Hoàn thành)/.test(t)) return 'emerald';
        if (/^Miễn/.test(t)) return 'pink';
        if (/^Đình chỉ/.test(t)) return 'slate';
        return 'slate';
    }
    // Icon Xem chi tiết cán bộ (popup cán bộ chỉ đọc) dùng chung Bước 2/3/4.
    // Dùng span (không phải button) để admin-ui-standardizer.js không gỡ nút "Xem chi tiết" khỏi cột Thao tác.
    window.htViewOfficerBtn = function (index, fn) {
        const f = fn || 'viewOfficerInStep2';
        return '<span class="btn-action-square btn-info" role="img" tabindex="0" title="Xem chi tiết cán bộ" aria-label="Xem chi tiết cán bộ" onclick="event.stopPropagation(); ' + f + '(' + index + ')" onkeydown="if(event.key===\'Enter\'){' + f + '(' + index + ')}"><i class="fa-solid fa-eye"></i></span>';
    };
    // Icon thao tác vuông dùng chung cột Thao tác Bước 3 / Bước 4 (span, không bị admin-ui-standardizer.js gỡ / đổi icon).
    // Không được phép: hiển thị mờ, tooltip "[Tên nút] - [Lý do]".
    window.htActBtn = function (icon, title, onclick, enabled, tip, color) {
        const c = color || '#2563eb';
        const st = 'display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:6px; margin:0 2px; vertical-align:middle; ';
        return enabled
            ? '<span class="btn-action-square" role="img" tabindex="0" title="' + title + '" aria-label="' + title + '" style="' + st + 'background:' + c + '; color:#fff; cursor:pointer;" onclick="event.stopPropagation(); ' + onclick + '" onkeydown="if(event.key===\'Enter\'){' + onclick + '}"><i class="' + icon + '"></i></span>'
            : '<span class="btn-action-square" role="img" aria-disabled="true" title="' + title + (tip ? ' - ' + tip : '') + '" aria-label="' + title + '" style="' + st + 'background:#e2e8f0; color:#94a3b8; cursor:not-allowed;" onclick="event.stopPropagation();"><i class="' + icon + '"></i></span>';
    };
    window.htPill = function (text, tone) {
        const c = PILL[tone || pillTone(text)] || PILL.slate;
        return '<span class="ht-pill" style="display:inline-flex; align-items:center; gap:6px; padding:2px 10px; border-radius:999px; font-size:12px; font-weight:600; white-space:nowrap; background:' + c[0] + '; color:' + c[1] + '; border:1px solid ' + c[2] + '33;"><span style="width:7px; height:7px; border-radius:50%; background:' + c[2] + ';"></span>' + esc(text) + '</span>';
    };
    // Nút bảng cỡ nhỏ trên 01 dòng: hành động chính (nền xanh) / xem văn bản (viền xám) / đình chỉ (viền đỏ hồng)
    try {
        const st = document.createElement('style');
        st.textContent = '.ht-btn-sm{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;font-weight:500;border-radius:6px;box-shadow:0 1px 2px rgba(15,23,42,.08);white-space:nowrap;cursor:pointer;line-height:1.2;}'
            + '.ht-btn-pri{background:#2563eb;color:#fff;border:1px solid #2563eb;}.ht-btn-pri:hover{background:#1d4ed8;}'
            + '.ht-btn-out{background:#fff;color:#334155;border:1px solid #cbd5e1;}.ht-btn-out:hover{background:#f8fafc;}'
            + '.ht-btn-dc{background:#fff;color:#e11d48;border:1px solid #fda4af;}.ht-btn-dc:hover:not(:disabled){background:#e11d48;color:#fff;}'
            + '.ht-btn-dc:disabled{background:#f1f5f9;color:#94a3b8;border-color:#e2e8f0;cursor:not-allowed;box-shadow:none;}'
            + '.ht-act-cell{white-space:nowrap!important;min-width:160px;text-align:center!important;}.ht-act-cell > *{vertical-align:middle;}'
            + '.ht-note{font-size:11.5px;color:#64748b;margin-top:3px;white-space:normal;}.ht-note-i{font-size:11.5px;color:#64748b;font-style:italic;margin-top:2px;}';
        document.head.appendChild(st);
        // Popup cán bộ: Phương thức hoàn trả "Một lần" / "Nhiều lần"
        const m = document.getElementById('oMethod');
        if (m) m.innerHTML = '<option value="">-- Chọn phương thức hoàn trả --</option><option value="Một lần">Một lần</option><option value="Nhiều lần">Nhiều lần</option>';
    } catch (e) { /* bỏ qua */ }
    // ===== Dữ liệu mẫu: cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại, cây đơn vị của popup cán bộ =====
    try {
        dossiersList.forEach(d => {
            d.ownerUnit = ownerOf(d);
            // Dữ liệu mẫu lĩnh vực tố tụng hình sự: Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương ban hành QĐ hoàn trả (gán tại ht_du_lieu_mau.js)
            if (d.code === 'HT-2026-021' && !d.claimField) d.claimField = 'Trong hoạt động tố tụng hình sự';
            (d.refundOfficers || []).forEach(o => {
                if (OFFICER_UNIT[o.name]) o.agency = OFFICER_UNIT[o.name];
                // Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương: mặc định = Cơ quan trực tiếp quản lý (dữ liệu mẫu: Trần Thị Bình do UBND Phường Bồ Đề trả lương)
                if (!o.payUnit) o.payUnit = PAY_UNIT_DEMO[o.name] || o.agency;
                // Phương thức hoàn trả theo ý kiến Hội đồng: Hoàn trả một lần / Hoàn trả nhiều lần (dữ liệu cũ: Khấu trừ lương, Nhiều lần...)
                o.refundMethod = htMethod(o.refundMethod);
                o.loi = loiNorm(o.loi);
            });
            // Dữ liệu mẫu: Đỗ Thị Bình (HT-2026-008, Bước 2)
            (d.refundOfficers || []).forEach(o => { if (o.name === 'Đỗ Thị Bình' && !o.total) { o.total = 25000000; o.refundMethod = 'Một lần'; o.loi = 'Vô ý'; } });
        });
        if (typeof agencyTreeData !== 'undefined' && !agencyTreeData.some(x => x.code === 'UBND-LB')) {
            agencyTreeData.unshift(
                { code: 'UBND-LB', name: U_CHU, children: [{ code: 'UBND-BD', name: U_A }] },
                { code: 'UBND-AD', name: U_B, children: [] }
            );
        }
    } catch (e) { /* bỏ qua */ }

    // Đình chỉ cả hồ sơ (Bước 1, Bước 2 - Mẫu 39) thuộc giai đoạn trước khi tách phần đơn vị; sau khi tách (có phần đơn vị), đình chỉ ở cấp cán bộ
    const DCHT_PRE = ['Chờ duyệt QĐ đình chỉ', 'Bị trả lại QĐ đình chỉ', 'Đình chỉ xem xét hoàn trả'];
    function isSplitDossier() { return !!activeDossier && ((Array.isArray(activeDossier.htUnits) && activeDossier.htUnits.length > 0) || (!PRE_SPLIT.includes(activeDossier.status) && !DCHT_PRE.includes(activeDossier.status))); }
    function officerVisible(o) {
        if (scope === 'lanh_dao' || isOwnerScope()) return true;
        if (scope === 'stp') return STP_UNITS.includes(o.agency);
        // Cơ quan trực tiếp quản lý hoặc Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương của cán bộ
        return o.agency === myUnit || (o.payUnit || o.agency) === myUnit;
    }
    // Đơn vị ban hành QĐ hoàn trả của cán bộ: tố tụng hình sự - Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương; lĩnh vực khác - Đơn vị tạo Hội đồng (01 QĐ cho toàn bộ cán bộ)
    const isTthsD = () => /tố tụng hình sự/i.test((activeDossier && activeDossier.claimField) || '');
    const unitKeyOfO = o => (isTthsD() ? (o.payUnit || o.agency) : ownerOf(activeDossier));
    function canEditStep2() {
        return !isViewMode && currentPerspective !== 'leader' && isOwnerScope() && activeDossier.status === 'Họp hội đồng';
    }

    // ===== Stepper 04 bước =====
    const baseWorkflowStep = window.getCurrentWorkflowStep;
    window.getCurrentWorkflowStep = function () { return Math.min(4, baseWorkflowStep()); };
    const baseRenderLayout = window.renderStateLayout;
    window.renderStateLayout = function () {
        if (currentViewStep > 4) currentViewStep = 4;
        baseRenderLayout();
        const fill = el('stepProgressFill');
        if (fill) {
            const st = activeDossier.status === 'Hoàn thành' ? 4 : getCurrentWorkflowStep();
            fill.style.width = (activeDossier.status === 'Hoàn thành' ? 100 : Math.round((st - 1) / 3 * 100)) + '%';
        }
        const sel4 = el('ykhdUnitSelect4');
        if (sel4 && sel4.parentElement) sel4.parentElement.style.display = 'none';
        // Hồ sơ chưa tách phần đơn vị: lưu trạng thái hồ sơ để màn Danh sách đồng bộ (btnn_ht_status_v1)
        try {
            if (activeDossier && !isSplitDossier()) {
                const all = JSON.parse(localStorage.getItem('btnn_ht_status_v1') || '{}') || {};
                all[activeDossier.code] = { status: activeDossier.status, dcOfficers: (activeDossier.refundOfficers || []).filter(o => o && o.dcPre).map(o => o.name) };
                localStorage.setItem('btnn_ht_status_v1', JSON.stringify(all));
            }
        } catch (e) { /* bỏ qua */ }
    };

    // ===== Phạm vi người xem =====
    const baseReadonly = window.isReadonlyStep;
    window.isReadonlyStep = function (step) {
        if (step <= 2 && !isOwnerScope() && scope !== 'lanh_dao') return true;
        return baseReadonly(step);
    };
    window.ykhdGetUserUnit = function () { return (scope === 'lanh_dao' || isOwnerScope() || scope === 'stp') ? '' : myUnit; };
    const baseIsVisible = window.ykhdIsOfficerVisible;
    window.ykhdIsOfficerVisible = function (o) { return officerVisible(o) && (typeof baseIsVisible !== 'function' || baseIsVisible(o)); };
    window.closeRefundDetail = function () {
        window.location.href = 'xem_xet_trach_nhiem_hoan_tra.html?role=' + (currentPerspective === 'leader' ? 'lanh_dao' : 'chuyen_vien') + '&scope=' + scope;
    };

    // ===== Bước 1: Thành lập Hội đồng (popup Mẫu 33 chuẩn; Ký ngoài chỉ tải tệp đã ký) =====
    const baseOpen = window.tlhdOpenModal;
    window.tlhdOpenModal = function () {
        if (!isOwnerScope() && scope !== 'lanh_dao') { showToast('Chỉ đơn vị tạo Hội đồng được thành lập Hội đồng.', 'warning'); return; }
        baseOpen();
    };
    const baseRenderStep1 = window.renderStep1;
    window.renderStep1 = function () {
        baseRenderStep1();
        // Khối QĐ thành lập Hội đồng: bỏ Trích yếu, Ngày ký; badge trạng thái lớn ở góc trên phải
        ['s1SummaryReadonly', 's1SignDateReadonly'].forEach(id => { const g = el(id) && el(id).closest('.form-group'); if (g) g.style.display = 'none'; });
        const bc = el('s1OfficialStatusBadge');
        if (bc) {
            const st = activeDossier.status;
            const big = 'font-size:14px; padding:8px 16px; font-weight:800; border-radius:8px; display:inline-flex; align-items:center; gap:8px;';
            if (st === 'Chờ duyệt QĐ thành lập' || st === 'Chờ duyệt thành lập hội đồng') bc.innerHTML = '<span class="badge" style="' + big + ' background:#ede9fe; color:#6d28d9; border:1px solid #ddd6fe;"><i class="fa-solid fa-hourglass-half"></i> Chờ duyệt - QĐ thành lập hội đồng</span>';
            else if (st === 'Bị trả lại thành lập HĐ' || st === 'Từ chối duyệt QĐ thành lập') bc.innerHTML = '<span class="badge" style="' + big + ' background:#fef3c7; color:#b45309; border:1px solid #fde68a;"><i class="fa-solid fa-circle-xmark"></i> Bị trả lại - QĐ thành lập hội đồng</span>';
            else if (st !== 'Chờ thành lập hội đồng') bc.innerHTML = '<span class="badge" style="font-size:13px; padding:5px 12px; font-weight:700; border-radius:999px; display:inline-flex; align-items:center; gap:6px; background:#dcfce7; color:#15803d; border:1px solid #bbf7d0;"><i class="fa-solid fa-circle-check"></i> Đã ban hành</span>';
        }
        const cta = el('s1CreateCtaCard');
        if (!cta) return;
        const btn = cta.querySelector('button');
        if (btn && !isOwnerScope()) btn.style.display = 'none';
        // Ký ngoài: khối Quyết định thành lập chỉ hiển thị Hình thức ký và Tệp văn bản Quyết định (Xem file, Tải file)
        const card = el('s1OfficialCard'), body = card && card.querySelector('.card-body');
        if (!body) return;
        const off = activeDossier.hdPublishType === 'offline' || (activeDossier.tlhd && activeDossier.tlhd.method === 'offline');
        const pt = el('s1OfficialPublishType'), fv = el('s1FileViewerContainer');
        Array.from(body.children).forEach(ch => {
            const keep = (pt && ch.contains(pt)) || (fv && ch.contains(fv)) || ch.id === 's1ResubmitContainer';
            if (off && !keep) { ch.dataset.ht2Hide = '1'; ch.style.display = 'none'; }
            else if (ch.dataset.ht2Hide) { delete ch.dataset.ht2Hide; ch.style.display = ''; }
        });
        // Lưới 01 hàng (Hình thức ban hành ... Lãnh đạo ký): Ký ngoài chỉ giữ Hình thức ban hành
        const grid = el('s1OfficialGrid');
        if (grid) Array.from(grid.children).forEach(ch => {
            if (off && !(pt && ch.contains(pt))) { ch.dataset.ht2Hide = '1'; ch.style.display = 'none'; }
            else if (ch.dataset.ht2Hide) { delete ch.dataset.ht2Hide; ch.style.display = ''; }
        });
        const unit = el('s1OfficialIssuingUnit'), unitGroup = unit && unit.closest('.form-group');
        if (unitGroup) unitGroup.style.display = off ? 'none' : '';
        if (pt && off) pt.innerText = 'Ký ngoài';
        if (fv) fv.querySelectorAll('a').forEach(a => { if (/Tải xuống/.test(a.textContent)) a.innerHTML = '<i class="fa-solid fa-download"></i> Tải file'; });
        const audit = el('s1AuditCard');
        if (audit && off) audit.style.display = 'none';
        // Tài liệu ban hành kèm theo / không ban hành kèm theo của Quyết định thành lập Hội đồng (khối rỗng / không có quyền xem thì không hiển thị)
        let tl = el('s1TlhdTlkt');
        if (!tl) { tl = document.createElement('div'); tl.id = 's1TlhdTlkt'; tl.style.marginTop = '12px'; body.appendChild(tl); }
        tl.innerHTML = typeof tlktViewHtml === 'function' && activeDossier.tlhd ? tlktViewHtml(activeDossier.tlhd.attachments || []) : '';
    };

    // ===== Popup cán bộ: Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương =====
    // Cùng control với Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại (cây đơn vị có tìm kiếm); mặc định theo cơ quan trực tiếp quản lý, cho phép chọn lại
    let payAuto = true;
    function ensurePayField() {
        if (el('oPayUnit')) return;
        const src = el('oAgencySelectBox'), grp = src && src.closest('.form-group');
        if (!grp) return;
        grp.insertAdjacentHTML('afterend', '<div class="form-group" id="oPayUnitGroup" style="margin-bottom: 16px; position: relative;">'
            + '<span class="form-label">Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương <span style="color:red;">*</span></span>'
            + '<input type="hidden" id="oPayUnit">'
            + '<div id="oPayUnitSelectBox" style="display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-color); border-radius: 6px; padding: 8px 12px; min-height: 38px; background: #fff; cursor: pointer;" onclick="htPayToggle(event)">'
            + '<span id="oPayUnitSelectedText" style="color: var(--text-muted); font-size: 13.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">-- Chọn hoặc tìm kiếm cơ quan, tổ chức --</span><i class="fa-solid fa-chevron-down" style="color: #64748b; font-size: 12px; margin-left: 8px;"></i></div>'
            + '<div id="oPayUnitDropdownPanel" style="display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #fff; border: 1px solid var(--border-color); border-radius: 6px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); z-index: 1060; max-height: 280px; flex-direction: column;">'
            + '<div style="padding: 8px 10px; border-bottom: 1px solid var(--border-color); background: #f8fafc;"><div style="position: relative;"><i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: #94a3b8; font-size: 12px;"></i>'
            + '<input type="text" id="oPayUnitSearchInput" placeholder="Tìm theo mã hoặc tên đơn vị..." style="width: 100%; padding: 6px 10px 6px 30px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 4px; outline: none;" oninput="htPayRender(this.value)" onclick="event.stopPropagation();"></div></div>'
            + '<div id="oPayUnitListContainer" style="overflow-y: auto; max-height: 220px; padding: 4px 0;"></div></div>'
            + '<span class="invalid-feedback" id="oPayUnitError" style="display:none; color:red; font-size:12px; margin-top:4px;">Đây là trường bắt buộc</span></div>');
        document.addEventListener('click', e => {
            const p = el('oPayUnitDropdownPanel'), b = el('oPayUnitSelectBox');
            if (p && b && !p.contains(e.target) && !b.contains(e.target)) p.style.display = 'none';
        });
    }
    function setPayUnit(name, manual) {
        ensurePayField();
        const h = el('oPayUnit'), t = el('oPayUnitSelectedText');
        if (h) h.value = name || '';
        if (t) { t.innerText = name || '-- Chọn hoặc tìm kiếm cơ quan, tổ chức --'; t.style.color = name ? 'var(--text-main)' : 'var(--text-muted)'; t.style.fontWeight = name ? '500' : 'normal'; }
        if (manual) payAuto = false;
        if (name) window.ht2ClearErr('oPayUnit');
        const p = el('oPayUnitDropdownPanel'); if (p) p.style.display = 'none';
    }
    window.htPayToggle = function (e) {
        if (e) e.stopPropagation();
        const p = el('oPayUnitDropdownPanel'); if (!p) return;
        if (p.style.display === 'flex') { p.style.display = 'none'; return; }
        p.style.display = 'flex';
        const s = el('oPayUnitSearchInput'); if (s) { s.value = ''; setTimeout(() => s.focus(), 80); }
        window.htPayRender('');
    };
    window.htPayRender = function (query) {
        const box = el('oPayUnitListContainer'); if (!box) return;
        const q = String(query || '').trim().toLowerCase();
        const hit = x => x.name.toLowerCase().includes(q) || String(x.code || '').toLowerCase().includes(q);
        const tree = typeof agencyTreeData !== 'undefined' ? agencyTreeData : [];
        let h = '';
        tree.forEach(p => {
            const kids = (p.children || []).filter(hit);
            if (q && !hit(p) && !kids.length) return;
            h += '<div style="padding: 8px 12px; background: #f8fafc; font-weight: 700; font-size: 13px; color: var(--primary-color); display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #f1f5f9; cursor: pointer;" onclick="event.stopPropagation(); htPaySelect(this.dataset.n)" data-n="' + esc(p.name) + '"><i class="fa-solid fa-sitemap" style="color: #64748b; font-size: 11.5px;"></i> <span>' + esc(p.name) + '</span> <span style="font-size: 11px; background: #e2e8f0; color: #475569; padding: 1px 6px; border-radius: 4px; font-weight: 600; margin-left: auto;">' + esc(p.code) + '</span></div>';
            (q && !hit(p) ? kids : (p.children || [])).forEach(c => {
                h += '<div style="padding: 8px 12px 8px 30px; font-size: 13px; color: #334155; display: flex; align-items: center; justify-content: space-between; cursor: pointer; border-bottom: 1px solid #f8fafc;" onmouseover="this.style.backgroundColor=\'#eff6ff\'" onmouseout="this.style.backgroundColor=\'transparent\'" onclick="event.stopPropagation(); htPaySelect(this.dataset.n)" data-n="' + esc(c.name) + '"><span><i class="fa-regular fa-building" style="color: #94a3b8; font-size: 11.5px; margin-right: 6px;"></i>' + esc(c.name) + '</span> <span style="font-size: 11px; color: #94a3b8;">' + esc(c.code) + '</span></div>';
            });
        });
        box.innerHTML = h || '<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px; font-style: italic;"><i class="fa-solid fa-circle-question" style="margin-right: 6px;"></i>Không tìm thấy đơn vị nào khớp với từ khóa</div>';
    };
    window.htPaySelect = function (name) { setPayUnit(name, true); };
    // Chọn Cơ quan trực tiếp quản lý: điền mặc định Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương khi người dùng chưa chọn lại
    const baseSelectAgency = window.selectAgency;
    if (typeof baseSelectAgency === 'function') {
        window.selectAgency = function (name) {
            baseSelectAgency.apply(this, arguments);
            if (payAuto || !el('oPayUnit') || !el('oPayUnit').value) setPayUnit(name, false);
        };
    }

    // ===== Bước 2: Ý kiến của Hội đồng =====
    window.ht2ClearErr = function (id) {
        const i = el(id); if (i) i.classList.remove('is-invalid');
        const e = el(id + 'Error'); if (e) e.style.display = 'none';
        if (id === 'oAgency' || id === 'oPayUnit') { const b = el(id + 'SelectBox'); if (b) b.classList.remove('is-invalid'); }
    };
    function markErr(id, msg) {
        const i = el(id === 'oAgency' || id === 'oPayUnit' ? id + 'SelectBox' : id); if (i) i.classList.add('is-invalid');
        const e = el(id + 'Error'); if (e) { e.innerText = msg || REQ; e.style.display = 'block'; }
        return i;
    }
    function officerStatusText(o) {
        if (!isSplitDossier()) return '';
        return (typeof htStatusOf === 'function' ? htStatusOf(o) : '') || o.ctStatus || activeDossier.status;
    }
    function renderOfficerTable() {
        const body = el('ht2OfficerBody'); if (!body) return;
        const canEdit = canEditStep2();
        const list = (activeDossier.refundOfficers || []).map((o, i) => ({ o, i })).filter(x => x.o && x.o.name && officerVisible(x.o))
            .concat((activeDossier.dcPreOfficers || []).filter(o => officerVisible(o)).map(o => ({ o, i: -1 })));
        const split = isSplitDossier();
        const thSt = el('ht2ColUnitStatus'); if (thSt) thSt.style.display = split ? '' : 'none';
        // Đình chỉ tại Bước 2: chọn cán bộ (chọn tất cả = đình chỉ cả hồ sơ; chọn một phần = đình chỉ các cán bộ được chọn)
        const canDc = !split && isOwnerScope() && activeDossier.status === 'Họp hội đồng' && currentPerspective !== 'leader' && scope !== 'stp';
        const table = el('ht2OfficerTable'), headRow = table && table.querySelector('thead tr');
        let th = el('ht2DcTh');
        if (canDc && headRow && !th) { headRow.insertAdjacentHTML('afterbegin', '<th id="ht2DcTh" style="width:40px; text-align:center;"><input type="checkbox" id="ht2DcAll" title="Chọn tất cả" onchange="ht2DcAll(this.checked)"></th>'); }
        if (!canDc && th) th.remove();
        let bar = el('ht2DcBar');
        if (!bar && table) { table.insertAdjacentHTML('beforebegin', '<div id="ht2DcBar" style="display:none; justify-content:flex-end; margin-bottom:8px;"><button type="button" id="ht2DcBtn" data-admin-icon-normalized="1" class="ht-btn-sm ht-btn-dc" disabled onclick="ht2OpenDc()"><i class="fa-solid fa-ban"></i> Trình ký QĐ đình chỉ</button></div>'); bar = el('ht2DcBar'); }
        if (bar) bar.style.display = canDc && list.some(x => !x.o.dcPre) ? 'flex' : 'none';
        // Cột Thao tác luôn hiển thị: chế độ xem chỉ có Xem chi tiết cán bộ; chế độ nhập có Xem / Sửa / Xóa (cột Chọn chỉ hiển thị khi nhập)
        const showAct = true;
        const thAct = headRow && Array.from(headRow.cells).find(c => (c.innerText || c.textContent).trim() === 'Thao tác');
        if (thAct) thAct.style.display = showAct ? '' : 'none';
        let foot = table && table.tFoot;
        if (!list.length) {
            body.innerHTML = '<tr><td colspan="11" style="text-align:center; color:var(--text-muted); font-style:italic; padding:20px;">Danh sách cán bộ trống. Vui lòng bấm "Thêm người thi hành công vụ gây thiệt hại" để ghi nhận ý kiến của Hội đồng.</td></tr>';
            if (foot) foot.innerHTML = '';
            return;
        }
        const thucThu = o => { const f = xlFull(o.xl); return f === 'Miễn hoàn trả' ? 0 : (f === 'Giảm mức hoàn trả' ? (o.giam || 0) : (o.hd || o.total || 0)); };
        body.innerHTML = list.map((x, k) => {
            const o = x.o, xl = xlFull(o.xl);
            const hoan = o.ykhdDieuKienHoan ? ' <span class="badge" style="background:#fef9c3; color:#a16207; font-size:10.5px;">Hoãn hoàn trả</span>' : '';
            const dcb = o.dcPre ? ' <span class="badge" style="background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; font-size:10.5px;">Đình chỉ hoàn trả</span>' : '';
            const acts = x.i < 0 ? '-' : htViewOfficerBtn(x.i)
                + (canEdit && !o.dcPre ? ' <button type="button" class="btn-action-square btn-primary" title="Sửa cán bộ" onclick="editOfficerInStep2(' + x.i + ')"><i class="fa-solid fa-pen-to-square"></i></button>'
                    + ' <button type="button" class="btn-action-square btn-danger" title="Xóa cán bộ" onclick="deleteOfficerInStep2(' + x.i + ')"><i class="fa-solid fa-trash-can"></i></button>' : '');
            // Giảm/Miễn hoàn trả: không giảm, không miễn hiển thị "-"; Giảm / Miễn kèm lý do
            const lyDo = xl === 'Giảm mức hoàn trả' && o.lyDoGiam ? '<div class="ht-note-i">Lý do giảm: ' + esc(o.lyDoGiam) + '</div>' : (xl === 'Miễn hoàn trả' && o.lyDoMien ? '<div class="ht-note-i">Lý do miễn: ' + esc(o.lyDoMien) + '</div>' : '');
            const stText = o.dcPre ? 'Đình chỉ hoàn trả' : officerStatusText(o);
            return '<tr>' + (canDc ? '<td style="text-align:center;">' + (o.dcPre || x.i < 0 ? '' : '<input type="checkbox" class="ht2DcChk" data-idx="' + x.i + '" onchange="ht2DcSync()">') + '</td>' : '') + '<td style="text-align:center;">' + (k + 1) + '</td>'
                + '<td><strong>' + esc(o.name) + '</strong>' + hoan + dcb + '<div style="font-size:12px; color:var(--text-muted);">' + esc(o.role || '') + '</div></td>'
                + '<td>' + esc(o.agency || '') + '<div style="font-size:12px; color:var(--text-muted);">Quản lý, sử dụng, trả lương: ' + esc(o.payUnit || o.agency || '') + '</div></td>'
                + '<td>' + esc(o.loi === 'Khác' ? (o.ykhdLoiKhac || 'Khác') : (o.loi || '')) + '</td>'
                + '<td style="text-align:right; font-weight:600;">' + money(o.hd || o.total) + '</td>'
                + '<td>' + esc(xlLabel(xl)) + lyDo + '</td>'
                + '<td style="text-align:right;">' + (xl === 'Giảm mức hoàn trả' ? money(o.giam) : '-') + '</td>'
                + '<td style="white-space:nowrap;' + (xl === 'Miễn hoàn trả' ? ' text-align:center;' : '') + '">' + esc(xl === 'Miễn hoàn trả' ? '-' : (htMethod(o.refundMethod) || '-')) + '</td>'
                + (split ? '<td style="text-align:center;">' + (stText ? htPill(stText) : '') + '</td>' : '')
                + (showAct ? '<td style="text-align:center; white-space:nowrap;">' + acts + '</td>' : '') + '</tr>';
        }).join('');
        // Dòng Tổng cộng: tổng Số tiền cần hoàn trả và tổng số tiền thực tế phải thu sau giảm / miễn (không tính cán bộ đã đình chỉ tại Bước 2)
        if (table && !foot) foot = table.createTFoot();
        if (foot) {
            const act = list.filter(x => !x.o.dcPre);
            const tong = act.reduce((s, x) => s + (x.o.hd || x.o.total || 0), 0), thuc = act.reduce((s, x) => s + thucThu(x.o), 0);
            const lead = (canDc ? 1 : 0) + 4, tail = 1 + (split ? 1 : 0) + (showAct ? 1 : 0);
            foot.innerHTML = '<tr style="background:#f1f5f9; font-weight:700;"><td colspan="' + lead + '" style="text-align:right;">Tổng cộng</td><td style="text-align:right;">' + money(tong) + '</td>'
                + '<td style="font-weight:600; color:#475569;">Phải thu sau giảm / miễn</td><td style="text-align:right;">' + money(thuc) + '</td><td colspan="' + tail + '"></td></tr>';
        }
        ht2DcSync();
    }
    // ===== Đình chỉ tại Bước 2: chọn cán bộ =====
    window.ht2DcAll = function (on) { document.querySelectorAll('.ht2DcChk').forEach(c => { c.checked = on; }); ht2DcSync(); };
    // Nút Trình ký QĐ đình chỉ: khóa khi chưa chọn cán bộ; có chọn: bật, hiển thị số cán bộ đã chọn
    window.ht2DcSync = function () {
        const c = Array.from(document.querySelectorAll('.ht2DcChk')), n = c.filter(x => x.checked).length;
        const a = el('ht2DcAll'); if (a) a.checked = c.length > 0 && n === c.length;
        const b = el('ht2DcBtn'); if (b) { b.disabled = n === 0; b.innerHTML = '<i class="fa-solid fa-ban"></i> Trình ký QĐ đình chỉ' + (n ? ' (' + n + ')' : ''); }
    };
    let dcFromStep2 = false;
    window.ht2OpenDc = function () {
        const all = (activeDossier.refundOfficers || []).filter(o => o && o.name && !o.dcPre);
        const sel = Array.from(document.querySelectorAll('.ht2DcChk:checked')).map(c => activeDossier.refundOfficers[+c.dataset.idx]).filter(Boolean);
        if (!sel.length) { showToast('Vui lòng chọn ít nhất 01 cán bộ để trình ký Quyết định đình chỉ.', 'warning'); return; }
        // Chọn tất cả: đình chỉ cả hồ sơ; chọn một phần: đình chỉ các cán bộ được chọn
        activeDossier.dcPartialSel = sel.length === all.length ? null : sel.map(o => o.name);
        dcFromStep2 = true;
        try { dchtOpenModal(); } finally { dcFromStep2 = false; }
    };
    function dcNote() {
        const body = el('dchtModal'); if (!body) return;
        let n = el('ht2DcNote');
        const host = body.querySelector('.gqx-body') || body.querySelector('[id^="dcht"]');
        if (!n && host) { host.insertAdjacentHTML('afterbegin', '<div id="ht2DcNote" style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px 14px; margin-bottom:14px; font-size:13px;"></div>'); n = el('ht2DcNote'); }
        if (!n) return;
        const sel = activeDossier.dcPartialSel;
        n.innerHTML = sel && sel.length ? '<strong>Đình chỉ đối với cán bộ:</strong> ' + esc(sel.join(', ')) + '<div style="color:var(--text-muted); margin-top:2px;">Các cán bộ được đình chỉ không được phân tách về cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại khi hoàn thành Bước 2.</div>' : '<strong>Đình chỉ cả hồ sơ</strong> (toàn bộ cán bộ).';
    }
    (function wrapDcht() {
        const w = (name, fn) => { const o = window[name]; if (typeof o === 'function') window[name] = fn(o); };
        w('dchtOpenModal', o => function () {
            const st = activeDossier && activeDossier.status;
            if (!dcFromStep2 && st !== 'Bị trả lại QĐ đình chỉ') activeDossier.dcPartialSel = null;
            const r = o.apply(this, arguments); dcNote(); return r;
        });
        const keepSel = o => function () { const r = o.apply(this, arguments); if (activeDossier && activeDossier.dcht) activeDossier.dcht.partial = activeDossier.dcPartialSel || null; finishPartial(); return r; };
        w('dchtSubmitOnline', keepSel);
        w('dchtIssueOffline', keepSel);
        w('dchtFinalSign', o => function () { const r = o.apply(this, arguments); finishPartial(); return r; });
    })();
    // Ban hành QĐ đình chỉ một phần cán bộ: cán bộ được chọn Đình chỉ hoàn trả; hồ sơ trở lại trạng thái trước khi trình (Họp hội đồng)
    function finishPartial() {
        const a = activeDossier && activeDossier.dcht;
        if (!a || !a.partial || activeDossier.status !== 'Đình chỉ xem xét hoàn trả') return;
        (activeDossier.refundOfficers || []).forEach(o => { if (a.partial.includes(o.name)) o.dcPre = true; });
        activeDossier.status = a.prevStatus || 'Họp hội đồng';
        activeDossier.dcPartialSel = null;
        if (!activeDossier.timeline) activeDossier.timeline = [];
        activeDossier.timeline.unshift({ time: nowShort(), text: 'Ban hành Quyết định đình chỉ đối với cán bộ: ' + a.partial.join(', ') + '.' });
        renderStateLayout();
    }

    function renderUnitSplit() {
        const host = el('ht2UnitSplit'); if (!host) return;
        // Bảng phân tách: chỉ lĩnh vực tố tụng hình sự (lĩnh vực khác: 01 Quyết định hoàn trả cho toàn bộ cán bộ, không tách phần đơn vị)
        const units = (activeDossier.htUnits || []).filter(u => scope === 'lanh_dao' || isOwnerScope() || (activeDossier.refundOfficers || []).some(o => o && unitKeyOfO(o) === u.unit && officerVisible(o)));
        if (!isSplitDossier() || !isTthsD() || !units.length) { host.style.display = 'none'; host.innerHTML = ''; return; }
        host.style.display = 'block';
        host.innerHTML = '<div style="font-weight:700; color:var(--primary-color); font-size:14px; margin-bottom:8px;"><i class="fa-solid fa-sitemap"></i> Phân tách theo cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương</div>'
            + '<table class="dense-table" style="width:100%;"><thead><tr><th style="width:45px; text-align:center;">STT</th><th>Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương</th><th style="width:90px; text-align:center;">Số cán bộ</th><th>Cán bộ</th><th>Tài liệu đính kèm phần đơn vị</th><th style="width:170px;">Trạng thái</th></tr></thead><tbody>'
            + units.map((u, i) => {
                // Tài liệu đính kèm phần đơn vị: văn bản kiến nghị của Hội đồng (và tài liệu đính kèm Bước 2), mỗi tệp kèm Xem / Tải
                const files = (u.files && u.files.length ? u.files : (ykhdFiles('kienNghi').map(f => f.name).concat((activeDossier.ht2Tlkt || []).map(t => t.name))))
                    .filter(Boolean);
                const list = files.length ? files : ['Van_ban_kien_nghi_' + activeDossier.code + '.pdf'];
                const fileHtml = list.map(n => '<div style="display:flex; align-items:center; gap:8px; white-space:nowrap;"><i class="fa-solid fa-file-pdf" style="color:#dc2626;"></i> ' + esc(n)
                    + ' <a class="action-link" href="javascript:void(0)" title="Xem file" onclick="showToast(\'Đang mở xem tệp ' + esc(n) + '\', \'info\')"><i class="fa-solid fa-eye"></i></a>'
                    + ' <a class="action-link" href="javascript:void(0)" title="Tải file" onclick="showToast(\'Đang tải tệp ' + esc(n) + '\', \'info\')"><i class="fa-solid fa-download"></i></a></div>').join('');
                return '<tr><td style="text-align:center;">' + (i + 1) + '</td><td><strong>' + esc(u.unit) + '</strong></td><td style="text-align:center;">' + u.officers.length + '</td><td>' + esc(u.officers.join(', ')) + '</td><td>' + fileHtml + '</td><td style="text-align:center;">' + htPill(u.status || '') + '</td></tr>';
            }).join('')
            + '</tbody></table>';
    }
    window.renderStep2 = function () {
        const ro = !canEditStep2();
        const date = el('s2ConclusionDate');
        if (date) {
            if (!date.dataset.ht2Loaded || date.dataset.ht2Loaded !== activeDossier.code) {
                date.value = activeDossier.conclusionDate || (ro ? '' : new Date().toLocaleDateString('vi-VN'));
                date.dataset.ht2Loaded = activeDossier.code;
                const yk = el('ht2YKienChung'); if (yk) yk.value = activeDossier.ht2YKienChung || '';
            }
            date.disabled = ro;
        }
        const yk = el('ht2YKienChung'), ykv = el('ht2YKienChungView');
        if (yk) yk.style.display = ro ? 'none' : '';
        if (ykv) { ykv.style.display = ro ? 'block' : 'none'; ykv.innerText = activeDossier.ht2YKienChung || (yk && yk.value) || '-'; }
        const host = el('ht2Tlkt');
        if (host) {
            const list = activeDossier.ht2Tlkt || [];
            if (!ro && typeof tlktMount === 'function') {
                if (host.dataset.ht2Mounted !== activeDossier.code) {
                    tlktMount('ht2', 'ht2Tlkt', { required: false, rows: list, secClass: 'gqx-sec', titleClass: 'tlkt-sec-title', noLeader: true });
                    host.dataset.ht2Mounted = activeDossier.code;
                }
            } else {
                host.dataset.ht2Mounted = '';
                // Chế độ xem: chỉ hiển thị bảng khi có tài liệu
                host.innerHTML = typeof tlktViewHtml === 'function' && list.length ? tlktViewHtml(list, { split: false }) : ''; // Không thuộc phiếu trình: 01 bảng Tài liệu đính kèm
            }
        }
        const add = el('s2AddOfficerBtn'); if (add) add.style.display = ro ? 'none' : 'inline-flex';
        renderOfficerTable();
        ykhdRenderField('kienNghi', ro);
        const mau35 = el('ykhdTaiMau35Link'); if (mau35) mau35.style.display = ro ? 'none' : 'inline';
        renderUnitSplit();
    };

    // ===== Popup Thêm / Sửa / Xem cán bộ =====
    window.ht2OnMoneyInput = function (input, textId) {
        const n = parseMoney(input.value);
        input.value = n ? money(n) : '';
        const t = el(textId);
        if (t) t.innerText = n ? (typeof docSoTien === 'function' ? docSoTien(n) : money(n) + ' đồng') : 'Chưa nhập số tiền';
    };
    function xlValue() { const r = document.querySelector('input[name="ht2Xl"]:checked'); return r ? r.value : 'Hoàn trả'; }
    // Giảm/Miễn hoàn trả: ô tích không bắt buộc, chọn tối đa 01 (chọn ô này thì bỏ chọn ô kia)
    window.ht2OnXlChange = function (src) {
        if (src && src.checked) document.querySelectorAll('input[name="ht2Xl"]').forEach(x => { if (x !== src) x.checked = false; });
        const xl = xlValue();
        el('ht2GiamWrap').style.display = xl === 'Giảm mức hoàn trả' ? 'block' : 'none';
        el('ht2MienWrap').style.display = xl === 'Miễn hoàn trả' ? 'block' : 'none';
        el('ht2MethodWrap').style.display = xl === 'Miễn hoàn trả' ? 'none' : 'block';
        if (xl !== 'Giảm mức hoàn trả') { el('ht2Giam').value = ''; el('ht2GiamText').innerText = 'Chưa nhập số tiền'; el('ht2LyDoGiam').value = ''; ht2ClearErr('ht2Giam'); ht2ClearErr('ht2LyDoGiam'); }
        if (xl !== 'Miễn hoàn trả') { el('ht2LyDoMien').value = ''; ht2ClearErr('ht2LyDoMien'); }
        else { el('oMethod').value = ''; ht2ClearErr('oMethod'); }
    };
    function setModalReadonly(on) {
        const m = el('officerStep2Modal'); if (!m) return;
        m.querySelectorAll('input, select, textarea').forEach(x => { if (x.type !== 'hidden') x.disabled = on; });
        const box = el('oAgencySelectBox'); if (box) box.style.pointerEvents = on ? 'none' : '';
        const pbox = el('oPayUnitSelectBox'); if (pbox) pbox.style.pointerEvents = on ? 'none' : '';
        m.querySelectorAll('#oPostponeBlock .btn').forEach(b => { b.style.display = on ? 'none' : ''; });
        const save = m.querySelector('.modal-footer .btn-primary'); if (save) save.style.display = on ? 'none' : '';
    }
    const baseOpenAdd = window.openAddOfficerModal;
    window.openAddOfficerModal = function () {
        if (!canEditStep2()) { showToast('Chỉ đơn vị tạo Hội đồng được cập nhật ý kiến của Hội đồng khi hồ sơ ở trạng thái Họp hội đồng.', 'warning'); return; }
        const oldQd = el('htOffQd'); if (oldQd) oldQd.remove();
        ensurePayField(); payAuto = true;
        baseOpenAdd();
        setPayUnit('', false);
        setModalReadonly(false);
        document.querySelectorAll('input[name="ht2Xl"]').forEach(x => { x.checked = false; });
        el('oMethod').value = '';
        ht2OnXlChange();
    };
    function fillModal(o, index, title) {
        const oldQd = el('htOffQd'); if (oldQd) oldQd.remove();
        ensurePayField(); payAuto = true;
        baseOpenAdd();
        setPayUnit('', false);
        el('editOfficerIndex').value = String(index);
        el('officerModalTitle').innerHTML = title;
        el('oName').value = o.name || '';
        el('oRole').value = o.role || '';
        ensurePayField();
        if (o.agency) selectAgency(o.agency);
        setPayUnit(o.payUnit || o.agency || '', false);
        payAuto = !o.payUnit || o.payUnit === o.agency;
        el('oLoi').value = LOI_LIST.includes(loiNorm(o.loi)) ? loiNorm(o.loi) : 'Vô ý';
        ykhdOnLoiChange();
        if (el('ykhdLoiKhac')) el('ykhdLoiKhac').value = o.ykhdLoiKhac || '';
        el('oAmt').value = o.total ? money(o.total) : '';
        if (o.total) handleModalAmtInput(el('oAmt').value);
        document.querySelectorAll('input[name="ht2Xl"]').forEach(x => { x.checked = x.value === xlFull(o.xl); });
        ht2OnXlChange();
        el('ht2Giam').value = o.giam ? money(o.giam) : '';
        if (o.giam) ht2OnMoneyInput(el('ht2Giam'), 'ht2GiamText');
        el('ht2LyDoGiam').value = o.lyDoGiam || '';
        el('ht2LyDoMien').value = o.lyDoMien || '';
        el('oMethod').value = (xlFull(o.xl) === 'Miễn hoàn trả') ? '' : (htMethod(o.refundMethod) || '');
        el('oPostponeReason').value = o.ykhdDieuKienHoan || '';
        ykhdOnDieuKienHoanInput();
        if (el('oPostponeStart')) el('oPostponeStart').value = o.postponeStart || '';
        if (el('oPostponeEnd')) el('oPostponeEnd').value = o.postponeEnd || '';
        ykhdSetPostponeFiles(o.ykhdDieuKienHoan ? (o.postponeFile || '') : '');
    }
    window.editOfficerInStep2 = function (index) {
        const o = (activeDossier.refundOfficers || [])[index]; if (!o) return;
        if (!canEditStep2()) { window.viewOfficerInStep2(index); return; }
        fillModal(o, index, '<i class="fa-solid fa-user-pen"></i> Cập nhật người thi hành công vụ gây thiệt hại');
        setModalReadonly(false);
    };
    window.viewOfficerInStep2 = function (index) {
        const o = (activeDossier.refundOfficers || [])[index]; if (!o) return;
        const keep = currentPerspective;
        if (keep === 'leader') currentPerspective = 'staff';
        fillModal(o, index, '<i class="fa-solid fa-circle-info"></i> Xem chi tiết người thi hành công vụ gây thiệt hại');
        currentPerspective = keep;
        setModalReadonly(true);
        // Bước 3 / Bước 4: khối Quyết định miễn / giảm mức hoàn trả (chỉ hiển thị khi có dữ liệu)
        const qd = typeof window.htQdBlockHtml === 'function' ? window.htQdBlockHtml(index) : '';
        const mb = el('officerStep2Modal') && el('officerStep2Modal').querySelector('.modal-body');
        if (qd && mb) mb.insertAdjacentHTML('beforeend', '<div id="htOffQd">' + qd + '</div>');
    };
    window.deleteOfficerInStep2 = function (index) {
        if (!canEditStep2()) return;
        showCustomConfirm('Bạn có chắc chắn muốn xóa cán bộ này khỏi danh sách không?', () => {
            activeDossier.refundOfficers.splice(index, 1);
            renderOfficerTable();
            showToast('Xóa cán bộ thành công.', 'success');
        });
    };
    window.saveOfficerStep2 = function () {
        const m = el('officerStep2Modal');
        m.querySelectorAll('.is-invalid').forEach(x => x.classList.remove('is-invalid'));
        m.querySelectorAll('.invalid-feedback').forEach(x => { x.style.display = 'none'; });
        const errs = [];
        const need = (id, ok, msg) => { if (!ok) errs.push(markErr(id, msg) || el(id + 'Error') || {}); };
        const xl = xlValue();
        const amt = parseMoney(el('oAmt').value), giam = parseMoney(el('ht2Giam').value);
        need('oAgency', !!el('oAgency').value);
        need('oPayUnit', !!(el('oPayUnit') && el('oPayUnit').value));
        need('oName', !!el('oName').value.trim());
        need('oRole', !!el('oRole').value.trim());
        if (el('oLoi').value === 'Khác') need('ykhdLoiKhac', !!el('ykhdLoiKhac').value.trim());
        if (!el('oAmt').value.trim()) need('oAmt', false);
        else need('oAmt', amt > 0, 'Số tiền cần hoàn trả phải lớn hơn 0.');
        // Giảm mức hoàn trả chỉ áp dụng khi Mức độ lỗi là Vô ý (Mẫu 37/BTNN)
        if (xl === 'Giảm mức hoàn trả' && el('oLoi').value !== 'Vô ý') need('ht2Xl', false, 'Giảm mức hoàn trả chỉ áp dụng khi Mức độ lỗi là Vô ý.');
        if (xl === 'Giảm mức hoàn trả') {
            if (!el('ht2Giam').value.trim()) need('ht2Giam', false);
            else need('ht2Giam', giam > 0 && giam < amt, 'Số tiền sau giảm phải lớn hơn 0 và nhỏ hơn Số tiền cần hoàn trả.');
            // Giảm mức hoàn trả tối đa 30% Số tiền cần hoàn trả
            if (el('ht2Giam').value.trim() && giam > 0 && giam < amt) need('ht2Giam', amt - giam <= Math.floor(amt * 0.3), 'Mức giảm không được lớn hơn 30% Số tiền cần hoàn trả (Số tiền sau giảm tối thiểu ' + money(amt - Math.floor(amt * 0.3)) + ' đ).');
            need('ht2LyDoGiam', !!el('ht2LyDoGiam').value.trim());
        }
        if (xl === 'Miễn hoàn trả') need('ht2LyDoMien', !!el('ht2LyDoMien').value.trim());
        else need('oMethod', !!el('oMethod').value);
        const reason = el('oPostponeReason').value.trim();
        if (reason) {
            need('oPostponeStart', !!(el('oPostponeStart') && el('oPostponeStart').value.trim()));
            need('oPostponeFile', (ykhdPostponeFiles || []).length > 0);
            const s = el('oPostponeStart') ? el('oPostponeStart').value.trim() : '', e = el('oPostponeEnd') ? el('oPostponeEnd').value.trim() : '';
            if (s && e && typeof parseDateVN === 'function' && parseDateVN(e) < parseDateVN(s)) need('oPostponeEnd', false, 'Ngày kết thúc hoãn phải lớn hơn hoặc bằng ngày bắt đầu');
        }
        if (errs.length) { const first = errs[0]; if (first.focus) first.focus(); if (first.scrollIntoView) first.scrollIntoView({ block: 'center' }); return; }
        const idx = parseInt(el('editOfficerIndex').value, 10);
        const old = (activeDossier.refundOfficers || [])[idx] || {};
        const o = Object.assign({}, old, {
            name: el('oName').value.trim(), role: el('oRole').value.trim(), agency: el('oAgency').value, payUnit: el('oPayUnit') ? el('oPayUnit').value : el('oAgency').value,
            loi: el('oLoi').value, ykhdLoiKhac: el('oLoi').value === 'Khác' ? el('ykhdLoiKhac').value.trim() : '',
            total: amt, xl, giam: xl === 'Giảm mức hoàn trả' ? giam : 0,
            lyDoGiam: xl === 'Giảm mức hoàn trả' ? el('ht2LyDoGiam').value.trim() : '',
            lyDoMien: xl === 'Miễn hoàn trả' ? el('ht2LyDoMien').value.trim() : '',
            refundMethod: xl === 'Miễn hoàn trả' ? '' : el('oMethod').value,
            ykhdDieuKienHoan: reason, isPostponed: !!reason, postponeStatus: reason ? 'Đề xuất hoãn' : 'Không hoãn',
            postponeReason: reason, postponeStart: reason && el('oPostponeStart') ? el('oPostponeStart').value.trim() : '',
            postponeEnd: reason && el('oPostponeEnd') ? el('oPostponeEnd').value.trim() : '',
            postponeFile: reason ? (ykhdPostponeFiles || []).map(f => f.name).join(', ') : '',
            paid: old.paid || 0, status: 'Họp hội đồng', progressClass: 'info'
        });
        if (!Array.isArray(activeDossier.refundOfficers)) activeDossier.refundOfficers = [];
        if (idx >= 0 && activeDossier.refundOfficers[idx]) activeDossier.refundOfficers[idx] = o; else activeDossier.refundOfficers.push(o);
        closeOfficerStep2Modal();
        renderOfficerTable();
        const e = el('ht2OfficerError'); if (e) e.style.display = 'none';
        showToast(idx >= 0 ? 'Cập nhật cán bộ thành công.' : 'Thêm cán bộ thành công.', 'success');
    };

    // ===== Lưu ý kiến hội đồng =====
    function collectStep2() {
        activeDossier.conclusionDate = el('s2ConclusionDate').value.trim();
        activeDossier.ht2YKienChung = el('ht2YKienChung').value.trim();
        if (typeof tlktGet === 'function' && el('ht2Tlkt') && el('ht2Tlkt').dataset.ht2Mounted) activeDossier.ht2Tlkt = tlktGet('ht2');
    }
    function confirmBox(title, message, okText, onYes) {
        const modal = el('customConfirmModal');
        const t = modal && modal.querySelector('.modal-title'), b = el('customConfirmBtn');
        const prev = { t: t ? t.innerHTML : '', c: t ? t.style.color : '', b: b ? b.innerHTML : '', cls: b ? b.className : '' };
        if (t) { t.innerHTML = '<i class="fa-solid fa-circle-question"></i> ' + title; t.style.color = '#1e293b'; }
        if (b) { b.innerHTML = okText; b.className = 'btn btn-primary'; }
        const ob = new MutationObserver(() => {
            if (!modal.classList.contains('visible')) { ob.disconnect(); if (t) { t.innerHTML = prev.t; t.style.color = prev.c; } if (b) { b.innerHTML = prev.b; b.className = prev.cls; } }
        });
        showCustomConfirm(message, onYes);
        if (modal) ob.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }
    window.submitStep2Recommendations = function () {
        if (!canEditStep2()) return;
        ['s2ConclusionDate', 'ht2YKienChung'].forEach(ht2ClearErr);
        ykhdSetKienNghiError('');
        let first = null;
        if (!el('s2ConclusionDate').value.trim()) first = first || markErr('s2ConclusionDate');
        if (!el('ht2YKienChung').value.trim()) first = first || markErr('ht2YKienChung');
        if (first) { first.focus(); first.scrollIntoView({ block: 'center' }); return; }
        if (typeof tlktValidate === 'function' && el('ht2Tlkt').dataset.ht2Mounted && !tlktValidate('ht2')) return;
        // Cán bộ đã đình chỉ tại Bước 2 (QĐ đình chỉ một phần cán bộ): không đưa vào phần tách đơn vị
        const officers = (activeDossier.refundOfficers || []).filter(o => o && o.name && !o.dcPre);
        if (!officers.length) {
            const e = el('ht2OfficerError'); e.innerText = 'Vui lòng thêm ít nhất 01 người thi hành công vụ gây thiệt hại.'; e.style.display = 'block';
            e.scrollIntoView({ block: 'center' });
            return;
        }
        if (!ykhdFiles('kienNghi').length) {
            ykhdSetKienNghiError(REQ);
            const b = el('ykhdKienNghiUploadBtn'); if (b) { b.focus(); b.scrollIntoView({ block: 'center' }); }
            return;
        }
        collectStep2();
        // Tố tụng hình sự: phân tách theo Cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương; lĩnh vực khác: 01 khối của Đơn vị tạo Hội đồng
        const units = Array.from(new Set(officers.map(unitKeyOfO)));
        const splitMsg = isTthsD() ? 'phân tách về ' + units.length + ' cơ quan, tổ chức đang trực tiếp quản lý, sử dụng, trả lương' : 'chuyển sang ban hành 01 Quyết định hoàn trả cho toàn bộ cán bộ của hồ sơ';
        confirmBox('Xác nhận lưu ý kiến hội đồng',
            'Danh sách người thi hành công vụ gây thiệt hại sẽ được ' + splitMsg + ' và không được cập nhật ý kiến của Hội đồng. Bạn có chắc chắn muốn lưu ý kiến hội đồng?',
            'Lưu', () => {
                activeDossier.dcPreOfficers = (activeDossier.refundOfficers || []).filter(o => o && o.dcPre);
                activeDossier.refundOfficers = officers;
                const files = ykhdFiles('kienNghi').map(f => f.name).concat((activeDossier.ht2Tlkt || []).map(t => t.name));
                activeDossier.htUnits = units.map(u => ({ unit: u, status: 'Chờ ban hành QĐ hoàn trả', officers: officers.filter(o => unitKeyOfO(o) === u).map(o => o.name), files }));
                officers.forEach(o => { o.ctStatus = 'Chờ ban hành QĐ hoàn trả'; o.status = 'Chờ ban hành QĐ'; o.progressClass = 'warning'; });
                activeDossier.refundTotal = officers.reduce((s, o) => s + (o.total || 0), 0);
                if (!activeDossier.timeline) activeDossier.timeline = [];
                activeDossier.timeline.unshift({ time: nowShort(), text: 'Lưu ý kiến của Hội đồng; danh sách cán bộ được ' + splitMsg + '.' });
                switchSimulatorState(3);
                currentViewStep = 2; // hiển thị xong chuyển sang Bước 3 (switchWorkflowStep bên dưới)
                isViewMode = true; currentMode = 'view';
                renderStateLayout();
                // Sau khi lưu: tự chuyển sang Bước 3, các phần đơn vị ở trạng thái Chờ ban hành QĐ hoàn trả
                if (typeof switchWorkflowStep === "function") switchWorkflowStep(3);
                if (typeof tlhdPersistCreated === 'function') tlhdPersistCreated();
                showToast('Lưu ý kiến hội đồng thành công. Danh sách cán bộ đã được ' + splitMsg + '.', 'success');
            });
    };

    // ===== Thanh nút chân trang =====
    const baseActions = window.renderPageHeaderActions;
    window.renderPageHeaderActions = function () {
        baseActions();
        const f = el('stickyFooterActionsContainer'); if (!f) return;
        // Cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại / Sở Tư pháp: không cập nhật Bước 1, Bước 2
        const drop = re => f.querySelectorAll('button').forEach(b => { if (re.test(b.getAttribute('onclick') || '')) b.remove(); });
        if (!isOwnerScope() && scope !== 'lanh_dao') drop(/switchToEditMode\((1|2)\)|tlhdOpenModal/);
        // Sở Tư pháp: chỉ ghi nhận thu tiền / trả lại tiền; không Miễn, Giảm, Đình chỉ
        if (scope === 'stp') drop(/dchtOpenModal/);
        // Sau khi chốt ý kiến HĐ: đơn vị tạo Hội đồng Ghi nhận nộp tiền tại Bước 4 cho toàn bộ cán bộ ở mọi lĩnh vực;
        // Trình ký QĐ hoàn trả, miễn / giảm bổ sung, đình chỉ cấp cán bộ: Đơn vị ban hành QĐ hoàn trả (chi_tiet_ho_so_hoan_tra_qd.js)
        if (!isViewMode && currentViewStep === 2 && canEditStep2()) {
            f.innerHTML = '<button type="button" class="btn btn-danger" onclick="dchtOpenModal()"><i class="fa-solid fa-circle-stop"></i> Đình chỉ</button>'
                + '<button type="button" class="btn btn-primary" onclick="submitStep2Recommendations()"><i class="fa-solid fa-floppy-disk"></i> Lưu ý kiến hội đồng</button>'
                + '<button type="button" class="btn btn-secondary" onclick="closeRefundDetail()" title="Đóng màn hình"><i class="fa-solid fa-xmark"></i> Đóng</button>';
        }
    };

    // Bước 4 - Sở Tư pháp: khóa mờ Thao tác khác (Giảm mức / Miễn / Hoãn hoàn trả), giữ Ghi nhận nộp tiền
    const baseRenderStep4 = window.renderStep4;
    if (typeof baseRenderStep4 === 'function') {
        window.renderStep4 = function () {
            baseRenderStep4.apply(this, arguments);
            if (scope !== 'stp') return;
            document.querySelectorAll('#panelStep4 .more-actions-wrapper').forEach(w => {
                w.outerHTML = '<button type="button" class="action-icon-btn btn-disabled" title="Sở Tư pháp không thực hiện Miễn hoàn trả, Giảm mức hoàn trả"><i class="fa-solid fa-ellipsis-vertical"></i></button>';
            });
        };
    }

    // Đổi phạm vi người xem ngay trên trang (phục vụ giả lập / kiểm thử luồng nhiều người dùng)
    function setScope(v) {
        if (!(v in SCOPE_UNIT)) return;
        scope = v; myUnit = SCOPE_UNIT[v]; ssSet('htMockScope', v);
        currentPerspective = v === 'lanh_dao' ? 'leader' : 'staff';
        renderStateLayout();
    }
    window.ht2Api = { confirmBox, setScope, scope: () => scope, myUnit: () => myUnit, isOwnerScope, officerVisible, isSplitDossier, STP_UNITS, renderOfficerTable, renderUnitSplit };
})();
