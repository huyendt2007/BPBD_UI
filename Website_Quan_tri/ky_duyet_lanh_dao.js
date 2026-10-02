/**
 * Màn hình Ký duyệt hồ sơ của Lãnh đạo (Website Quản trị - Module Biện pháp bảo đảm)
 * Dựng theo tài liệu SRS:
 *  - Ký duyệt Phiếu đăng ký (MH01 Danh sách, MH03 Popup Ký số, MH04 Popup Từ chối, MH05 Popup Trả lại; MH02 mở màn Xem chi tiết Phiếu đăng ký)
 *  - Ký duyệt yêu cầu cung cấp thông tin (MH01 - MH05)
 *  - Ký duyệt yêu cầu cung cấp bản sao văn bản chứng nhận (MH01 - MH05)
 * Nạp sau ky_duyet_ho_so.js, ghi đè renderFilterPanel / renderTable / initViewMode của màn Lãnh đạo.
 */
(function () {
    const LEADER_NAME = 'Nguyễn Văn Lãnh Đạo';
    const OFFICERS = ['Nguyễn Văn Cán Bộ', 'Lê Anh Tuấn', 'Trần Quốc Khánh'];
    const MSG = {
        VAL_001: 'Đây là trường bắt buộc',
        VAL_007: 'Từ ngày không được lớn hơn Đến ngày',
        INF_EMPTY: 'Không tìm thấy dữ liệu phù hợp với điều kiện tìm kiếm.',
        // Phiếu đăng ký
        DK_005: 'Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.',
        DK_008: 'Vui lòng chọn ít nhất một hồ sơ để thực hiện thao tác.',
        DK_010: 'Không tìm thấy file PDF chờ ký hợp lệ.',
        DK_011: 'Thiết bị/tài khoản ký số chưa sẵn sàng hoặc chưa nhận chứng thư số hợp lệ.',
        DK_012: 'Chứng thư số không khớp với Lãnh đạo được phân công ký duyệt.',
        DK_013: 'Ký số không thành công. Vui lòng kiểm tra thiết bị ký số và thử lại.',
        DK_017: 'Không sinh được file PDF dự thảo. Vui lòng thử lại sau.',
        DK_WRN_003: (ok, total) => `Ký số thành công ${ok}/${total} hồ sơ. Các hồ sơ ký lỗi vẫn ở trạng thái Chờ ký, vui lòng kiểm tra và ký lại.`,
        DK_CFM_013: 'Bạn có chắc chắn muốn ký số hồ sơ đã chọn không?',
        DK_CFM_014: 'Bạn có chắc chắn muốn trả lại hồ sơ cho Cán bộ xử lý lại không?',
        DK_CFM_016: 'Bạn có chắc chắn muốn từ chối và ký số Thông báo từ chối cho hồ sơ đã chọn không?',
        DK_SUC_003: 'Đã từ chối hồ sơ thành công',
        DK_SUC_005: 'Ký số hồ sơ thành công',
        DK_SUC_006: 'Đã trả lại hồ sơ cho Cán bộ xử lý lại',
        // Yêu cầu cung cấp thông tin
        CCTT_008: 'Chưa chọn hồ sơ hợp lệ để ký số.',
        CCTT_009: 'Không tìm thấy file PDF hợp lệ để thực hiện thao tác.',
        CCTT_010: 'Thiết bị/tài khoản ký số chưa sẵn sàng hoặc chưa nhận chứng thư số hợp lệ.',
        CCTT_011: 'Ký số không thành công. Vui lòng kiểm tra thiết bị ký số và thử lại.',
        CCTT_012: 'Chứng thư số không khớp với Lãnh đạo được phân công ký duyệt.',
        CCTT_013: 'Hồ sơ không ở trạng thái Chờ ký hoặc đã thay đổi trạng thái. Vui lòng tải lại trang.',
        CCTT_CFM_001: 'Bạn có chắc chắn muốn từ chối yêu cầu cung cấp thông tin này không?',
        CCTT_CFM_002: 'Bạn có chắc chắn muốn ký số các yêu cầu cung cấp thông tin đã chọn không?',
        CCTT_CFM_003: 'Bạn có chắc chắn muốn trả lại hồ sơ giấy yêu cầu cung cấp thông tin này cho Cán bộ xử lý không?',
        CCTT_SUC_006: 'Từ chối yêu cầu cung cấp thông tin thành công.',
        CCTT_SUC_007: 'Ký số yêu cầu cung cấp thông tin thành công.',
        CCTT_SUC_009: 'Trả lại hồ sơ giấy yêu cầu cung cấp thông tin thành công.',
        CCTT_WRN_002: (ok, total) => `Ký số thành công ${ok}/${total} hồ sơ. Các hồ sơ ký lỗi vẫn ở trạng thái Chờ ký, vui lòng kiểm tra và ký lại.`,
        // Yêu cầu cung cấp bản sao
        BS_002: 'Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.',
        BS_003: 'Chưa có file bản sao điện tử dự thảo hợp lệ để thực hiện thao tác.',
        BS_005: 'Vui lòng chọn ít nhất một yêu cầu cung cấp bản sao hợp lệ để thực hiện thao tác.',
        BS_006: 'Thiết bị/tài khoản ký số chưa sẵn sàng hoặc chưa nhận chứng thư số hợp lệ.',
        BS_007: 'Ký số không thành công. Vui lòng kiểm tra thiết bị ký số và thử lại.',
        BS_008: 'Chứng thư số không khớp với Lãnh đạo được phân công ký duyệt.',
        BS_013: 'Hồ sơ gốc theo Số đăng ký không còn hiệu lực. Không thể ký duyệt cấp bản sao giấy.',
        BS_CFM_001: 'Bạn có chắc chắn muốn từ chối yêu cầu cung cấp bản sao này không?',
        BS_CFM_002: 'Bạn có chắc chắn muốn duyệt các yêu cầu cung cấp bản sao đã chọn không?',
        BS_CFM_003: 'Bạn có chắc chắn muốn ký số các yêu cầu cung cấp bản sao đã chọn không?',
        BS_CFM_004: 'Bạn có chắc chắn muốn trả lại hồ sơ giấy yêu cầu cung cấp bản sao này cho Cán bộ xử lý không?',
        BS_SUC_001: 'Duyệt yêu cầu cung cấp bản sao thành công.',
        BS_SUC_003: 'Ký số yêu cầu cung cấp bản sao thành công.',
        BS_SUC_004: 'Từ chối yêu cầu cung cấp bản sao thành công.',
        BS_SUC_005: 'Trả lại hồ sơ giấy yêu cầu cung cấp bản sao thành công.',
        BS_WRN_001: (ok, total) => `Ký số thành công ${ok}/${total} hồ sơ. Các hồ sơ ký lỗi vẫn ở trạng thái Chờ ký, vui lòng kiểm tra và ký lại.`
    };

    // ============================ Tiện ích chung ============================
    const esc = v => String(v ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    const pad = n => String(n).padStart(2, '0');
    const nowText = () => { const d = new Date(); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
    const fmtDate = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    function parseDt(s) {
        const m = String(s || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
        return m ? new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)) : null;
    }
    const val = id => (document.getElementById(id)?.value || '').trim();
    const low = id => val(id).toLowerCase();

    function sourceLabel(src) {
        const v = String(src || '').toLowerCase();
        if (v.includes('dịch vụ công') || v.includes('dvc')) return 'Dịch vụ công';
        if (v.includes('trực tiếp') || v.includes('quầy') || v.includes('bưu') || v.includes('cán bộ')) return 'Trực tiếp';
        return 'Trực tuyến';
    }

    function toast(message, type) {
        let box = document.getElementById('ld-toast-box');
        if (!box) {
            box = document.createElement('div');
            box.id = 'ld-toast-box';
            box.style.cssText = 'position:fixed;top:18px;right:18px;z-index:3000;display:flex;flex-direction:column;gap:8px;max-width:420px';
            document.body.appendChild(box);
        }
        const colors = { success: ['#ECFDF5', '#059669', 'fa-circle-check'], error: ['#FEF2F2', '#DC2626', 'fa-circle-exclamation'], warning: ['#FFFBEB', '#D97706', 'fa-triangle-exclamation'] };
        const [bg, fg, icon] = colors[type] || colors.success;
        const t = document.createElement('div');
        t.className = 'ld-toast';
        t.setAttribute('data-type', type || 'success');
        t.style.cssText = `background:${bg};border:1px solid ${fg};border-left:4px solid ${fg};color:#1E293B;padding:10px 14px;border-radius:6px;box-shadow:0 6px 16px rgba(0,0,0,.12);font-size:13.5px;display:flex;gap:8px;align-items:flex-start`;
        t.innerHTML = `<i class="fa-solid ${icon}" style="color:${fg};margin-top:2px"></i><span>${esc(message)}</span>`;
        box.appendChild(t);
        setTimeout(() => t.remove(), 4500);
    }

    // Modal dùng chung của màn Lãnh đạo
    function ensureModal() {
        let m = document.getElementById('ldModal');
        if (!m) {
            m = document.createElement('div');
            m.id = 'ldModal';
            m.className = 'modal-overlay';
            m.innerHTML = '<div class="modal-content modal-large" id="ldModalBox"></div>';
            document.body.appendChild(m);
        }
        return m;
    }
    function openModal(html, width) {
        const m = ensureModal();
        const box = m.querySelector('#ldModalBox');
        box.style.maxWidth = width || '900px';
        box.innerHTML = html;
        m.classList.add('active');
        return box;
    }
    function closeLdModal() { const m = document.getElementById('ldModal'); if (m) m.classList.remove('active'); }

    // Popup xác nhận (Đồng ý / Hủy)
    function confirmBox(message, onOk) {
        let c = document.getElementById('ldConfirm');
        if (!c) {
            c = document.createElement('div');
            c.id = 'ldConfirm';
            c.className = 'modal-overlay';
            c.style.zIndex = '2100';
            document.body.appendChild(c);
        }
        c.innerHTML = `<div class="modal-content" style="max-width:460px">
            <div class="modal-header"><span><i class="fa-solid fa-circle-question"></i> Xác nhận</span></div>
            <div style="padding:6px 0 4px">${esc(message)}</div>
            <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
                <button class="btn btn-outline-secondary" id="ldConfirmCancel">Hủy</button>
                <button class="btn btn-primary" id="ldConfirmOk">Đồng ý</button>
            </div></div>`;
        c.classList.add('active');
        c.querySelector('#ldConfirmCancel').onclick = () => c.classList.remove('active');
        c.querySelector('#ldConfirmOk').onclick = () => { c.classList.remove('active'); onOk(); };
    }

    function inlineError(el, show, text) {
        if (!el) return;
        el.style.borderColor = show ? '#DC2626' : '';
        let e = el.parentElement.querySelector('.ld-inline-err');
        if (!e) { e = document.createElement('div'); e.className = 'ld-inline-err'; e.style.cssText = 'color:#DC2626;font-size:12px;margin-top:4px'; el.insertAdjacentElement('afterend', e); }
        e.textContent = show ? (text || MSG.VAL_001) : '';
        if (show) el.focus();
    }

    function badgeClassOf(status) {
        if (status === 'Hoàn thành') return 'badge-success';
        if (status === 'Bị từ chối' || status === 'Bị trả lại') return 'badge-danger';
        if (status === 'Chờ ký' || status === 'Chờ duyệt') return 'badge-warning';
        return 'badge-info';
    }
    // Icon thao tác trên dòng: thao tác không áp dụng cho hồ sơ hiển thị dạng mờ (Disabled), không ẩn
    const DIRECT_ONLY_TIP = 'Chỉ áp dụng với hồ sơ có Nguồn tiếp nhận là "Trực tiếp"';
    function rowAction(cls, title, icon, onclick, enabled, tip) {
        if (enabled) return `<button class="icon-btn ${cls}" title="${title}" onclick="${onclick}"><i class="${icon}"></i></button>`;
        return `<span title="${esc(title + ' - ' + (tip || DIRECT_ONLY_TIP))}" style="display:inline-block"><button class="icon-btn ${cls}" disabled aria-disabled="true" data-disabled-action="${title}" style="opacity:.35;cursor:not-allowed;pointer-events:none"><i class="${icon}"></i></button></span>`;
    }
    const kvHtml = (l, v) => `<div class="info-group"><div class="info-label">${l}</div><div class="info-value">${v === undefined || v === null || v === '' ? '-' : v}</div></div>`;
    const fileLink = (name) => `<a href="#" class="action-link" onclick="event.preventDefault(); LeaderSign.viewFile('${esc(name)}')"><i class="fa-regular fa-file-pdf"></i> Xem file</a>`;

    // ============================ Khối Thông tin ký số (dùng chung các popup) ============================
    const SIGN_METHODS = ['USB Token Ban Cơ yếu Chính phủ', 'SIM ký số', 'Ký số từ xa (HSM / Cloud CA)'];
    const CERTS = {
        'USB Token Ban Cơ yếu Chính phủ': [{ label: `${LEADER_NAME} - Ban Cơ yếu Chính phủ - Số serial: 54 01 0A 3F 9C 21 7B 11`, valid: 'Từ 12/12/2025 đến 12/12/2028' }],
        'SIM ký số': [{ label: `${LEADER_NAME} - Viettel-CA - Số serial: 7A 22 91 0C 4D 18 E3 05`, valid: 'Từ 01/03/2026 đến 01/03/2029' }],
        'Ký số từ xa (HSM / Cloud CA)': [
            { label: `${LEADER_NAME} - Ban Cơ yếu Chính phủ (Remote Signing) - Số serial: 33 AF 10 7E 2B 90 C1 44`, valid: 'Từ 05/01/2026 đến 05/01/2029' },
            { label: `${LEADER_NAME} - VNPT-CA SmartCA - Số serial: 19 0B 6E 72 AA 03 5D 8F`, valid: 'Từ 20/06/2026 đến 20/06/2027' }
        ]
    };
    const signState = { method: SIGN_METHODS[0], certStatus: 'Chưa kiểm tra', certs: [], certIdx: 0 };
    const CERT_BADGE = { 'Chưa kiểm tra': 'badge-muted', 'Không tìm thấy thiết bị/tài khoản ký số': 'badge-danger', 'Chứng thư số không hợp lệ': 'badge-danger', 'Chứng thư số hợp lệ': 'badge-success' };

    function resetSignState() { signState.method = SIGN_METHODS[0]; signState.certStatus = 'Chưa kiểm tra'; signState.certs = []; signState.certIdx = 0; }

    function renderSignSection() {
        const ok = signState.certStatus === 'Chứng thư số hợp lệ';
        const cert = signState.certs[signState.certIdx];
        return `
            <h4 class="section-title" style="font-size:15px;margin-top:16px">Thông tin ký số</h4>
            <div class="form-group">
                <label class="form-label">Hình thức ký số <span class="required-mark">*</span></label>
                <div style="display:flex;gap:18px;flex-wrap:wrap">${SIGN_METHODS.map(m => `<label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="ldSignMethod" value="${m}" ${m === signState.method ? 'checked' : ''} onchange="LeaderSign.changeMethod(this.value)"> ${m}</label>`).join('')}</div>
            </div>
            <div class="info-grid" style="align-items:end">
                ${kvHtml('Trạng thái chứng thư số', `<span class="badge ${CERT_BADGE[signState.certStatus]}" id="ldCertStatus">${signState.certStatus}</span>`)}
                <div class="info-group" style="grid-column:span 2"><div class="info-label">Chứng thư số <span class="required-mark">*</span></div>
                    <select class="form-select" id="ldCertSelect" ${ok ? '' : 'disabled'} onchange="LeaderSign.changeCert(this.value)">
                        ${ok ? signState.certs.map((c, i) => `<option value="${i}" ${i === signState.certIdx ? 'selected' : ''}>${esc(c.label)}</option>`).join('') : '<option value="">-- Chưa đọc được chứng thư số --</option>'}
                    </select></div>
                ${kvHtml('Thời hạn chứng thư số', ok && cert ? cert.valid : '-')}
            </div>
            <div><button type="button" class="btn btn-outline-primary" onclick="LeaderSign.checkCert()"><i class="fa-solid fa-id-card"></i> Kiểm tra chứng thư số</button></div>`;
    }

    // Xác thực ký số theo Hình thức ký số (hệ thống không lưu mã PIN/mã xác thực)
    function askAuth(onSuccess, onFail) {
        let a = document.getElementById('ldAuth');
        if (!a) { a = document.createElement('div'); a.id = 'ldAuth'; a.className = 'modal-overlay'; a.style.zIndex = '2200'; document.body.appendChild(a); }
        const m = signState.method;
        const body = m === SIGN_METHODS[0]
            ? '<label class="form-label">Nhập mã PIN USB Token <span class="required-mark">*</span></label><input type="password" class="form-control" id="ldAuthInput" placeholder="Nhập mã PIN..."><div style="font-size:12px;color:var(--text-muted);margin-top:6px">Mã PIN được nhập tại thành phần ký số cục bộ, hệ thống không lưu mã PIN.</div>'
            : m === SIGN_METHODS[1]
                ? '<div style="padding:6px 0"><i class="fa-solid fa-mobile-screen-button"></i> Vui lòng xác nhận yêu cầu ký trên điện thoại chứa SIM ký số, sau đó bấm "Đã xác nhận".</div>'
                : '<label class="form-label">Nhập mã OTP xác thực <span class="required-mark">*</span></label><input type="text" class="form-control" id="ldAuthInput" placeholder="Nhập mã OTP hoặc xác nhận trên ứng dụng ký số từ xa...">';
        a.innerHTML = `<div class="modal-content" style="max-width:480px">
            <div class="modal-header"><span><i class="fa-solid fa-key"></i> Xác thực ký số - ${esc(m)}</span></div>
            ${body}
            <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
                <button class="btn btn-outline-secondary" id="ldAuthCancel">Hủy</button>
                <button class="btn btn-primary" id="ldAuthOk">${m === SIGN_METHODS[1] ? 'Đã xác nhận' : 'Xác thực'}</button>
            </div></div>`;
        a.classList.add('active');
        a.querySelector('#ldAuthCancel').onclick = () => { a.classList.remove('active'); onFail('cancel'); };
        a.querySelector('#ldAuthOk').onclick = () => {
            const inp = a.querySelector('#ldAuthInput');
            if (inp && !inp.value.trim()) { inlineError(inp, true); return; }
            a.classList.remove('active');
            // Dữ liệu mô phỏng: mã "0000" mô phỏng xác thực/ký lỗi toàn bộ; mã "1111" mô phỏng ký lỗi hồ sơ cuối danh sách
            const code = inp ? inp.value.trim() : '';
            onSuccess(code);
        };
    }

    // Ký lần lượt từng hồ sơ; Trạng thái ký số từng dòng (chỉ hiển thị khi ký nhiều hồ sơ)
    function runSigning(records, authCode, applySuccess, done) {
        const results = {};
        let i = 0;
        const isMulti = records.length > 1;
        const setRowStatus = (id, st) => {
            const cell = document.querySelector(`#ldModalBox [data-sign-status="${CSS.escape(id)}"]`);
            if (cell) cell.innerHTML = `<span class="badge ${st === 'Ký thành công' ? 'badge-success' : st === 'Ký lỗi' ? 'badge-danger' : st === 'Đang ký' ? 'badge-info' : 'badge-muted'}">${st}</span>`;
        };
        const busy = document.getElementById('ldBusy');
        if (busy) busy.style.display = 'flex';
        document.querySelectorAll('#ldModalBox button').forEach(b => b.disabled = true);
        const step = () => {
            if (i >= records.length) {
                if (busy) busy.style.display = 'none';
                document.querySelectorAll('#ldModalBox button').forEach(b => b.disabled = false);
                done(results);
                return;
            }
            const r = records[i];
            if (isMulti) setRowStatus(r.id, 'Đang ký');
            setTimeout(() => {
                const fail = authCode === '0000' || (authCode === '1111' && i === records.length - 1);
                results[r.id] = fail ? 'Ký lỗi' : 'Ký thành công';
                if (!fail) applySuccess(r);
                if (isMulti) setRowStatus(r.id, results[r.id]);
                i++;
                step();
            }, isMulti ? 350 : 250);
        };
        step();
    }

    window.LeaderSign = {
        changeMethod(m) {
            signState.method = m; signState.certStatus = 'Chưa kiểm tra'; signState.certs = []; signState.certIdx = 0;
            const holder = document.getElementById('ldSignSection'); if (holder) holder.innerHTML = renderSignSection();
        },
        changeCert(i) { signState.certIdx = +i || 0; const holder = document.getElementById('ldSignSection'); if (holder) holder.innerHTML = renderSignSection(); },
        checkCert() {
            const errMap = { pdk: MSG.DK_011, cctt: MSG.CCTT_010, copy: MSG.BS_006 };
            signState.certs = CERTS[signState.method] || [];
            if (!signState.certs.length) { signState.certStatus = 'Không tìm thấy thiết bị/tài khoản ký số'; toast(errMap[LD.popupKind] || MSG.DK_011, 'error'); }
            else { signState.certStatus = 'Chứng thư số hợp lệ'; signState.certIdx = 0; }
            const holder = document.getElementById('ldSignSection'); if (holder) holder.innerHTML = renderSignSection();
        },
        viewFile(name) {
            const w = window.open('', '_blank');
            if (w) { w.document.write(`<title>${esc(name)}</title><div style="font-family:Times New Roman;padding:40px"><h3>${esc(name)}</h3><p>Nội dung file PDF (mô phỏng).</p></div>`); w.document.close(); }
        }
    };

    // ============================ Trạng thái chung màn Lãnh đạo ============================
    const LD = {
        pdkSort: { col: 'date', order: 'asc', clicks: 0 },
        svcSort: { col: 'submittedAt', order: 'asc', clicks: 0 },
        popupKind: 'pdk',
        detailBack: false
    };
    window.LD_STATE = LD;

    function pagerRender(total, rerender) {
        const size = parseInt(document.getElementById('cb-pagesize')?.value || '20', 10);
        pageSize = size;
        const totalPages = Math.max(1, Math.ceil(total / size));
        if (currentPage > totalPages) currentPage = totalPages;
        const start = total ? (currentPage - 1) * size : 0;
        const end = Math.min(start + size, total);
        const s = document.getElementById('page-start-index'), e = document.getElementById('page-end-index'), t = document.getElementById('total-records');
        if (s) s.innerText = total ? start + 1 : 0;
        if (e) e.innerText = end;
        if (t) t.innerText = total;
        const box = document.getElementById('pagination-buttons');
        if (box) {
            const btn = (label, page, disabled, active) => `<button class="btn ${active ? 'btn-primary' : 'btn-outline-secondary'}" style="padding:4px 10px;font-size:12px;border-radius:4px" ${disabled ? 'disabled' : ''} onclick="currentPage=${page};LeaderUI.rerender()">${label}</button>`;
            let html = btn('Trang đầu', 1, !total || currentPage === 1) + btn('◀', currentPage - 1, !total || currentPage === 1);
            for (let p = 1; p <= totalPages; p++) html += btn(p, p, !total, p === currentPage && total);
            html += btn('▶', currentPage + 1, !total || currentPage === totalPages) + btn('Trang cuối', totalPages, !total || currentPage === totalPages);
            box.innerHTML = html;
        }
        LD.rerender = rerender;
        return { start, end };
    }

    function sortIcon(state, col) {
        if (state.col !== col || !state.clicks) return '<i class="fa-solid fa-sort" style="font-size:11px;margin-left:4px;color:#94A3B8"></i>';
        return state.order === 'asc' ? '<i class="fa-solid fa-sort-up" style="font-size:11px;margin-left:4px;color:var(--secondary-color)"></i>' : '<i class="fa-solid fa-sort-down" style="font-size:11px;margin-left:4px;color:var(--secondary-color)"></i>';
    }
    // Lần 1: tăng dần; Lần 2: giảm dần; Lần 3: về sắp xếp mặc định
    function cycleSort(state, col, defCol) {
        if (state.col !== col) { state.col = col; state.clicks = 1; state.order = 'asc'; }
        else if (state.clicks === 1) { state.clicks = 2; state.order = 'desc'; }
        else { state.col = defCol; state.clicks = 0; state.order = 'asc'; }
        currentPage = 1;
    }

    function dateRangeFail(fromId, toId) {
        const f = parseDt(val(fromId)), t = parseDt(val(toId));
        const bad = f && t && f > t;
        inlineError(document.getElementById(fromId), bad, MSG.VAL_007);
        return bad;
    }
    function inDateRange(dateText, fromId, toId) {
        const d = parseDt(dateText), f = parseDt(val(fromId)), t = parseDt(val(toId));
        if (f && d && d < f) return false;
        if (t && d) { t.setHours(23, 59, 59, 999); if (d > t) return false; }
        return true;
    }

    // Không hiển thị tiêu đề phía trên bảng lưới kết quả; thanh công cụ đặt bên phải
    function setListChrome(title, toolbarHtml) {
        const h = document.querySelector('#view-list .card-section h3');
        if (h) { h.innerText = title; h.style.display = 'none'; if (h.parentElement) h.parentElement.style.justifyContent = 'flex-end'; }
        const tb = document.getElementById('toolbar-choky-batch');
        if (tb) { tb.style.display = 'flex'; tb.innerHTML = toolbarHtml; }
    }

    function dateInputs(fromDefault, toDefault) {
        return `
            <div class="form-group"><label class="form-label">Từ ngày</label><div class="date-filter-wrap"><input type="text" class="form-control" id="ld-from" placeholder="dd/mm/yyyy" value="${fromDefault}"><i class="fa-regular fa-calendar-days"></i></div></div>
            <div class="form-group"><label class="form-label">Đến ngày</label><div class="date-filter-wrap"><input type="text" class="form-control" id="ld-to" placeholder="dd/mm/yyyy" value="${toDefault}"><i class="fa-regular fa-calendar-days"></i></div></div>`;
    }
    const filterButtons = `<div class="filter-action-row" style="margin-top:8px;padding-top:8px;border-top:1px solid #F1F5F9;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
        <button class="btn btn-outline-secondary" onclick="LeaderUI.resetFilter()"><i class="fa-solid fa-filter-circle-xmark"></i> Xóa bộ lọc</button>
        <button class="btn btn-primary" onclick="LeaderUI.search()"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
    </div>`;
    const officerOptions = () => `<option value="">Tất cả</option>${OFFICERS.map(o => `<option value="${o}">${o}</option>`).join('')}`;
    const firstOfMonth = () => { const d = new Date(); return fmtDate(new Date(d.getFullYear(), d.getMonth(), 1)); };
    const today = () => fmtDate(new Date());
    const threeMonthsAgo = () => { const d = new Date(); return fmtDate(new Date(d.getFullYear(), d.getMonth() - 3, d.getDate())); };

    // ============================ PHIẾU ĐĂNG KÝ ============================
    const PDK_TYPES = [
        ['Đăng ký mới', 'Đăng ký lần đầu'], ['Đăng ký thay đổi', 'Đăng ký thay đổi'], ['Xóa đăng ký', 'Xóa đăng ký'],
        ['Thông báo xử lý tài sản', 'Thông báo xử lý tài sản bảo đảm lần đầu'], ['Thay đổi thông báo xử lý tài sản', 'Thay đổi thông báo xử lý tài sản bảo đảm'], ['Xóa thông báo xử lý tài sản', 'Xóa đăng ký thông báo xử lý tài sản bảo đảm']
    ];
    const PDK_SERVICE_TYPES = ['Yêu cầu cung cấp bản sao', 'Yêu cầu cung cấp bản sao kèm thông báo', 'Yêu cầu cung cấp thông tin'];
    const typeLabel = t => (PDK_TYPES.find(x => x[0] === t) || [t, t])[1];
    const ASSET_TYPES = [
        { key: 'vehicle', label: 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)', match: /cơ giới đường bộ|xe máy chuyên dùng|số khung/i,
          fields: [['vehicleName', 'Tên phương tiện', 'select'], ['frameNo', 'Số khung'], ['engineNo', 'Số máy'], ['plateNo', 'Biển số']] },
        { key: 'ship', label: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt', match: /tàu cá|đường thủy|đường sắt/i,
          fields: [['shipName', 'Tên phương tiện, nhãn hiệu'], ['shipOwner', 'Tên/Họ tên chủ phương tiện/Chủ sở hữu'], ['shipRegNo', 'Số đăng ký phương tiện'], ['shipIssuer', 'Cơ quan cấp giấy chứng nhận'], ['shipGrade', 'Cấp phương tiện']] },
        { key: 'right', label: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản', match: /quyền tài sản/i, fields: [['rightName', 'Tên quyền'], ['rightBasis', 'Căn cứ phát sinh quyền']] },
        { key: 'goods', label: 'Tài sản bảo đảm là hàng hóa luân chuyển trong quá trình sản xuất, kinh doanh, kho hàng không phải là phương tiện giao thông cơ giới đường bộ', match: /hàng hóa luân chuyển|kho hàng/i,
          fields: [['goodsKind', 'Hàng hóa luân chuyển / Kho hàng', 'goodsSelect'], ['goodsValue', 'Giá trị hàng hóa/Tên, loại hàng hóa'], ['warehouseAddress', 'Địa chỉ kho hàng', 'warehouse'], ['warehouseNo', 'Số hiệu kho hàng/Dấu hiệu khác của vị trí kho hàng', 'warehouse']] },
        { key: 'securities', label: 'Chứng khoán đã đăng ký tập trung trở thành chứng khoán không đăng ký tập trung', match: /chứng khoán/i, fields: [['vsdcTime', 'Thời điểm đăng ký tại VSDC', 'vsdc']] },
        { key: 'crop', label: 'Cây hằng năm, công trình tạm', match: /cây hằng năm|công trình tạm/i, fields: [['description', 'Mô tả']] },
        { key: 'other', label: 'Các động sản khác (TIỀN VÀ GIẤY TỜ CÓ GIÁ, hàng tiêu dùng; kim khí quý, đá quý; NGUYÊN, NHIÊN VẬT LIỆU, NÔNG SẢN, MÁY MÓC THIẾT BỊ, CHỨNG KHOÁN KHÔNG ĐĂNG KÝ TẬP TRUNG...)', match: /động sản khác|tiền và giấy tờ có giá|tiền gửi tiết kiệm|kim khí quý/i, fields: [['description', 'Mô tả']] }
    ];
    const VEHICLE_NAMES = ['Ô tô con', 'Ô tô tải', 'Mô tô', 'Xe gắn máy', 'Xe máy chuyên dùng'];
    const assetCfg = key => ASSET_TYPES.find(a => a.key === key) || null;
    const assetKeys = t => ASSET_TYPES.filter(a => a.match.test(t || '')).map(a => a.key);
    function assetDetail(p) {
        if (p.assetDetail) return p.assetDetail;
        const n = parseInt(String(p.id).replace(/\D/g, '').slice(-3), 10) || 1;
        p.assetDetail = {
            vehicleName: VEHICLE_NAMES[n % VEHICLE_NAMES.length], frameNo: 'RLH' + String(100000 + n * 37).slice(-6) + 'VN', engineNo: 'ENG-' + String(5000 + n * 13),
            plateNo: `30${String.fromCharCode(65 + (n % 6))}-${String(100 + n).slice(-3)}.${String(10 + (n % 90)).padStart(2, '0')}`,
            shipName: `Tàu cá QN-${9000 + n} - Hyundai Marine`, shipOwner: p.customer, shipRegNo: `QN-${9000 + n}-TS`, shipIssuer: 'Chi cục Thủy sản Quảng Ninh', shipGrade: n % 2 ? 'VR-SB' : 'VR-SI',
            rightName: 'Quyền đòi nợ phát sinh từ hợp đồng', rightBasis: `Hợp đồng số ${100 + n}/HĐ-2026`,
            goodsKind: n % 2 ? 'Kho hàng' : 'Hàng hóa luân chuyển', goodsValue: `Hàng tiêu dùng trị giá ${(n % 9 + 1) * 500} triệu đồng`,
            warehouseAddress: n % 2 ? `Kho số ${n % 7 + 1}, KCN Quang Minh, Hà Nội` : '', warehouseNo: n % 2 ? `KHO-${String(n).padStart(3, '0')}` : '',
            vsdcTime: `${pad(8 + (n % 9))}:${pad(n % 60)} ${pad(n % 27 + 1)}/0${n % 9 + 1}/2026`, description: `Mô tả tài sản của hồ sơ ${p.id}`
        };
        return p.assetDetail;
    }
    function dynamicColumns() {
        const cfg = assetCfg(val('filter-loaitaisan'));
        if (!cfg) return [];
        const isWarehouse = val('dyn-goodsKind') === 'Kho hàng';
        return cfg.fields.filter(f => f[2] !== 'warehouse' || isWarehouse).map(f => ({ id: f[0], label: f[1] }));
    }

    function getPdkStore() {
        let list = [];
        try { list = JSON.parse(localStorage.getItem('custom_mock_profiles') || '[]'); } catch (e) { list = []; }
        return list.length ? list : (typeof mockProfiles !== 'undefined' ? mockProfiles : []);
    }
    function savePdk(id, patch) {
        let list = getPdkStore();
        const idx = list.findIndex(x => x.id === id);
        if (idx >= 0) list[idx] = { ...list[idx], ...patch };
        localStorage.setItem('custom_mock_profiles', JSON.stringify(list));
        if (typeof mockProfiles !== 'undefined') { const m = mockProfiles.find(x => x.id === id); if (m) Object.assign(m, patch); }
    }
    const pdkById = id => getPdkStore().find(x => x.id === id);
    const pdkRegNo = p => p.registrationNo || p.id;
    const pdkSource = p => sourceLabel(p.source || p.channel);
    const pdkFileKind = p => p.pendingAction === 'Từ chối' ? 'Thông báo từ chối' : 'Văn bản chứng nhận';
    const pdkFileName = p => pdkFileKind(p) === 'Thông báo từ chối' ? (p.rejectDraftFile || `ThongBaoTuChoi_${pdkRegNo(p)}.pdf`) : (p.certificateDraftFile || `VanBanChungNhan_${pdkRegNo(p)}.pdf`);

    function renderPdkFilter(container) {
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label">Số đăng ký</label><input type="text" class="form-control" id="ld-pdk-sdk" placeholder="Nhập số đăng ký..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Mã khách hàng</label><input type="text" class="form-control" id="ld-pdk-makh" placeholder="Nhập mã khách hàng..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Tên bên bảo đảm</label><input type="text" class="form-control" id="ld-pdk-bbd" placeholder="Nhập tên bên bảo đảm..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Tên bên nhận bảo đảm</label><input type="text" class="form-control" id="ld-pdk-bnbd" placeholder="Nhập tên bên nhận bảo đảm..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Nguồn tiếp nhận</label><select class="form-select" id="ld-pdk-source"><option value="">Tất cả</option><option>Dịch vụ công</option><option>Trực tuyến</option><option>Trực tiếp</option></select></div>
                <div class="form-group"><label class="form-label">Loại đăng ký</label><select class="form-select" id="ld-pdk-type"><option value="">Tất cả</option>${PDK_TYPES.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}</select></div>
                <div class="form-group"><label class="form-label">Loại hình giao dịch</label><select class="form-select" id="cb-loaihinh" onchange="LeaderUI.pdkTxnChange()"><option value="">Tất cả</option><option>Biện pháp bảo đảm</option><option>Hợp đồng</option></select></div>
                <div class="form-group"><label class="form-label">Loại biện pháp / Hợp đồng</label><select class="form-select" id="cb-loaibienphap"><option value="">Tất cả</option></select></div>
                <div class="form-group"><label class="form-label">Số biên lai</label><input type="text" class="form-control" id="ld-pdk-bienlai" placeholder="Nhập số biên lai..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Cán bộ xử lý</label><select class="form-select" id="ld-pdk-officer">${officerOptions()}</select></div>
                ${dateInputs(threeMonthsAgo(), today())}
                <div class="form-group" style="grid-column: 1 / span 2;"><label class="form-label">Loại tài sản</label><select class="form-select" id="filter-loaitaisan" onchange="LeaderUI.assetChange()"><option value="">Tất cả</option>${ASSET_TYPES.map(a => `<option value="${a.key}">${a.label}</option>`).join('')}</select></div>
            </div>
            <div id="ld-dynamic-filter" style="display:none;margin-top:8px;padding:8px 12px;border:1px solid #E2E8F0;border-left:3px solid #2563EB;border-radius:5px;background:#F8FAFC"><div class="grid-4-cols" id="ld-dynamic-filter-fields"></div></div>
            ${filterButtons}`;
    }

    function pdkTxnChange() {
        const sub = document.getElementById('cb-loaibienphap');
        const t = val('cb-loaihinh');
        const map = { 'Biện pháp bảo đảm': ['Thế chấp', 'Cầm cố', 'Bảo lưu quyền sở hữu', 'Ký cược', 'Ký quỹ'], 'Hợp đồng': ['Hợp đồng thuê tài sản', 'Hợp đồng cho thuê tài chính', 'Hợp đồng chuyển giao quyền đòi nợ'] };
        if (sub) sub.innerHTML = '<option value="">Tất cả</option>' + (map[t] || []).map(x => `<option>${x}</option>`).join('');
    }

    function assetChange() {
        const cfg = assetCfg(val('filter-loaitaisan'));
        const wrap = document.getElementById('ld-dynamic-filter'), fields = document.getElementById('ld-dynamic-filter-fields');
        if (!wrap || !fields) return;
        if (!cfg) { 
            wrap.style.display = 'none'; 
            fields.innerHTML = ''; 
            renderPdkTable(); 
            return; 
        }
        fields.innerHTML = cfg.fields.map(([id, label, kind]) => {
            if (kind === 'select') return `<div class="form-group"><label class="form-label">${label}</label><select class="form-select" id="dyn-${id}"><option value="">Tất cả</option>${VEHICLE_NAMES.map(v => `<option>${v}</option>`).join('')}</select></div>`;
            if (kind === 'goodsSelect') return `<div class="form-group"><label class="form-label">${label}</label><select class="form-select" id="dyn-${id}" onchange="LeaderUI.goodsChange()"><option value="">Tất cả</option><option>Hàng hóa luân chuyển</option><option>Kho hàng</option></select></div>`;
            if (kind === 'vsdc') return `<div class="form-group"><label class="form-label">${label}</label><input type="text" class="form-control" id="dyn-${id}" placeholder="HH:mm dd/MM/yyyy" autocomplete="off"></div>`;
            return `<div class="form-group ld-dyn-${kind || 'text'}" ${kind === 'warehouse' ? 'style="display:none"' : ''}><label class="form-label">${label}</label><input type="text" class="form-control" id="dyn-${id}" autocomplete="off"></div>`;
        }).join('');
        wrap.style.display = 'block';
        renderPdkTable();
    }
    function goodsChange() {
        const isWarehouse = val('dyn-goodsKind') === 'Kho hàng';
        document.querySelectorAll('#ld-dynamic-filter-fields .ld-dyn-warehouse').forEach(el => { el.style.display = isWarehouse ? '' : 'none'; if (!isWarehouse) { const i = el.querySelector('input'); if (i) i.value = ''; } });
        renderPdkTable();
    }

    function filterPdk() {
        const dyn = dynamicColumns().map(c => ({ id: c.id, value: low('dyn-' + c.id) })).filter(x => x.value);
        const txn = val('cb-loaihinh');
        const list = getPdkStore().filter(p => {
            if (p.status !== 'Chờ ký' || PDK_SERVICE_TYPES.includes(p.type)) return false;
            if (low('ld-pdk-sdk') && !String(pdkRegNo(p)).toLowerCase().includes(low('ld-pdk-sdk'))) return false;
            if (low('ld-pdk-bbd') && !(p.customer || '').toLowerCase().includes(low('ld-pdk-bbd'))) return false;
            if (low('ld-pdk-bnbd') && !(p.mortgagee || '').toLowerCase().includes(low('ld-pdk-bnbd'))) return false;
            if (low('ld-pdk-makh') && !(p.customerId || '').toLowerCase().includes(low('ld-pdk-makh'))) return false;
            if (low('ld-pdk-bienlai') && !(p.receipt || '').toLowerCase().includes(low('ld-pdk-bienlai'))) return false;
            if (val('ld-pdk-source') && pdkSource(p) !== val('ld-pdk-source')) return false;
            if (val('ld-pdk-officer') && (p.handlingOfficer || '') !== val('ld-pdk-officer')) return false;
            if (val('ld-pdk-type') && p.type !== val('ld-pdk-type')) return false;
            if (txn && p.transactionType !== txn) return false;
            if (val('cb-loaibienphap') && p.subtype !== val('cb-loaibienphap')) return false;
            if (val('filter-loaitaisan') && !assetKeys(p.assetType).includes(val('filter-loaitaisan'))) return false;
            if (dyn.length) { const d = assetDetail(p); if (!dyn.every(f => String(d[f.id] || '').toLowerCase().includes(f.value))) return false; }
            return inDateRange(p.date, 'ld-from', 'ld-to');
        });
        const s = LD.pdkSort;
        const key = { date: p => parseDt(p.date) || 0, customer: p => p.customer || '', mortgagee: p => p.mortgagee || '' }[s.col] || (p => parseDt(p.date) || 0);
        list.sort((a, b) => {
            const x = key(a), y = key(b);
            const c = typeof x === 'string' ? x.localeCompare(y, 'vi') : x - y;
            return s.order === 'desc' ? -c : c;
        });
        return list;
    }

    function renderPdkTable() {
        setListChrome('Danh sách Phiếu đăng ký chờ ký', `
            <button class="btn btn-success" onclick="LeaderUI.pdkApproveBatch()"><i class="fa-solid fa-file-signature"></i> Ký số</button>
            <button class="btn btn-danger" onclick="LeaderUI.pdkRejectBatch()"><i class="fa-solid fa-ban"></i> Từ chối</button>`);
        const dyn = dynamicColumns();
        const s = LD.pdkSort;
        document.getElementById('table-headers-container').innerHTML = `<tr>
            <th style="width:40px;text-align:center"><input type="checkbox" id="checkAll" onclick="LeaderUI.checkAll(this)"></th>
            <th style="width:50px;text-align:center">STT</th>
            <th style="cursor:pointer;width:140px" onclick="LeaderUI.sortPdk('date')">Thời điểm đăng ký ${sortIcon(s, 'date')}</th>
            <th style="width:120px">Số đăng ký</th><th style="width:80px">Mã PIN</th>
            <th style="cursor:pointer;width:220px" onclick="LeaderUI.sortPdk('customer')">Tên bên bảo đảm ${sortIcon(s, 'customer')}</th>
            <th style="cursor:pointer;width:220px" onclick="LeaderUI.sortPdk('mortgagee')">Tên bên nhận bảo đảm ${sortIcon(s, 'mortgagee')}</th>
            <th style="width:140px">Loại đăng ký</th><th style="width:120px">Loại hình GD</th><th style="width:150px">Loại biện pháp / Hợp đồng</th><th style="width:250px">Loại tài sản</th>
            ${dyn.map(c => `<th style="width:160px;min-width:140px;background:#EFF6FF;color:#1E40AF;font-weight:600">${c.label}</th>`).join('')}
            <th style="width:120px">Mã khách hàng</th><th style="width:110px">Số biên lai</th><th style="width:100px">Trạng thái</th><th style="width:170px">Người yêu cầu</th>
            <th style="width:120px">Nguồn tiếp nhận</th><th style="width:150px">Cán bộ xử lý</th><th style="text-align:center;width:130px;min-width:130px">Thao tác</th></tr>`;
        const list = filterPdk();
        const tbody = document.getElementById('table-data');
        const cols = 18 + dyn.length;
        if (!list.length) {
            tbody.innerHTML = `<tr><td colspan="${cols}" style="text-align:center;padding:30px;color:var(--text-muted)"><i>${MSG.INF_EMPTY}</i></td></tr>`;
            pagerRender(0, renderPdkTable);
            return;
        }
        const { start, end } = pagerRender(list.length, renderPdkTable);
        tbody.innerHTML = list.slice(start, end).map((p, i) => {
            const d = assetDetail(p);
            const assets = String(p.assetType || '-').split(/;\s*(?=[A-ZĐ])/).map(esc).join('<br>');
            const isDirect = pdkSource(p) === 'Trực tiếp';
            return `<tr style="cursor:pointer" onclick="LeaderUI.pdkDetail('${p.id}')">
                <td onclick="event.stopPropagation()" style="text-align:center"><input type="checkbox" class="row-checkbox" value="${p.id}"></td>
                <td style="text-align:center">${start + i + 1}</td><td>${esc(p.date)}</td>
                <td><span class="action-link" onclick="event.stopPropagation(); LeaderUI.pdkDetail('${p.id}')">${esc(pdkRegNo(p))}</span></td>
                <td><code>${['Đăng ký mới', 'Đăng ký lần đầu'].includes(p.type) ? esc(p.pin || '-') : '-'}</code></td>
                <td><b>${esc(p.customer)}</b></td><td>${esc(p.mortgagee)}</td><td>${esc(typeLabel(p.type))}</td>
                <td>${esc(p.transactionType || '-')}</td><td>${esc(p.subtype || '-')}</td><td>${assets}</td>
                ${dyn.map(c => `<td style="background:#F8FBFF">${esc(d[c.id] || '-')}</td>`).join('')}
                <td><code>${esc(p.customerId || '-')}</code></td><td><code>${esc(p.receipt || '-')}</code></td>
                <td><span class="badge ${badgeClassOf(p.status)}">${esc(p.status)}</span></td>
                <td>${esc(p.requestor || p.customer)}</td><td>${pdkSource(p)}</td><td>${esc(p.handlingOfficer || '-')}</td>
                <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">
                    ${rowAction('sign', 'Ký số', 'fa-solid fa-file-signature', `LeaderUI.pdkApprove(['${p.id}'])`, true)}
                    ${rowAction('reject', 'Từ chối', 'fa-solid fa-ban', `LeaderUI.pdkReject(['${p.id}'])`, true)}
                    ${rowAction('edit', 'Trả lại', 'fa-solid fa-reply', `LeaderUI.pdkReturn('${p.id}')`, isDirect)}
                </td></tr>`;
        }).join('');
        const ca = document.getElementById('checkAll'); if (ca) ca.checked = false;
    }

    function selectedIds() { return Array.from(document.querySelectorAll('#table-data .row-checkbox:checked')).map(c => c.value); }

    // Kiểm tra các hồ sơ còn ở trạng thái Chờ ký
    function pdkValid(ids) { return ids.map(pdkById).filter(Boolean).every(p => p.status === 'Chờ ký'); }

    // MH03 - Popup Ký số Phiếu đăng ký
    function pdkApprove(ids) {
        if (!ids.length) { toast(MSG.DK_008, 'error'); return; }
        if (!pdkValid(ids)) { toast(MSG.DK_005, 'error'); return; }
        const recs = ids.map(pdkById);
        LD.popupKind = 'pdk';
        resetSignState();
        const single = recs.length === 1;
        const p = recs[0];
        const info = single ? `
            <h4 class="section-title" style="font-size:15px;margin-top:0">Thông tin hồ sơ ký số</h4>
            <div class="info-grid">${kvHtml('Số đăng ký', `<b>${esc(pdkRegNo(p))}</b>`)}${kvHtml('Loại đăng ký', esc(typeLabel(p.type)))}${kvHtml('Người yêu cầu', esc(p.requestor || p.customer))}${kvHtml('Loại file chờ ký', pdkFileKind(p))}${kvHtml('File PDF chờ ký', fileLink(pdkFileName(p)))}</div>`
            : `<h4 class="section-title" style="font-size:15px;margin-top:0">Danh sách hồ sơ ký số</h4>
            <div style="margin-bottom:6px">Tổng số hồ sơ: <b>${recs.length}</b></div>
            <div style="overflow-x:auto"><table class="table" style="width:100%"><thead><tr><th>STT</th><th>Số đăng ký</th><th>Loại đăng ký</th><th>Người yêu cầu</th><th>Loại file chờ ký</th><th>File PDF chờ ký</th><th>Trạng thái ký số</th></tr></thead>
            <tbody>${recs.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(pdkRegNo(r))}</td><td>${esc(typeLabel(r.type))}</td><td>${esc(r.requestor || r.customer)}</td><td>${pdkFileKind(r)}</td><td>${fileLink(pdkFileName(r))}</td><td data-sign-status="${esc(r.id)}"><span class="badge badge-muted">Chưa ký</span></td></tr>`).join('')}</tbody></table></div>`;
        const box = openModal(`
            <div class="modal-header"><span><i class="fa-solid fa-file-signature"></i> Ký số Phiếu đăng ký</span><span style="cursor:pointer;font-size:20px" onclick="LeaderUI.cancelPopup()">&times;</span></div>
            ${info}
            <div id="ldSignSection">${renderSignSection()}</div>
            <div id="ldBusy" style="display:none;align-items:center;gap:8px;margin-top:12px;color:var(--primary-color)"><i class="fa-solid fa-spinner fa-spin"></i> Đang thực hiện ký số, vui lòng chờ...</div>
            <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
                <button class="btn btn-outline-secondary" onclick="LeaderUI.cancelPopup()">Hủy</button>
                <button class="btn btn-primary" id="ldSignBtn"><i class="fa-solid fa-signature"></i> Ký số</button>
            </div>`);
        let pending = recs.map(r => r.id);
        box.querySelector('#ldSignBtn').onclick = () => {
            if (signState.certStatus !== 'Chứng thư số hợp lệ') { toast(MSG.DK_011, 'error'); return; }
            const targets = pending.map(pdkById).filter(r => {
                if (!r || r.status !== 'Chờ ký') { toast(MSG.DK_005, 'error'); return false; }
                return true;
            });
            if (!targets.length) return;
            confirmBox(MSG.DK_CFM_013, () => askAuth(code => {
                runSigning(targets, code, r => {
                    const isReject = pdkFileKind(r) === 'Thông báo từ chối';
                    savePdk(r.id, isReject
                        ? { status: 'Bị từ chối', statusClass: 'badge-danger', rejectedAt: r.rejectedAt || nowText(), rejectLeader: LEADER_NAME, signedAt: nowText(), signMethod: signState.method }
                        : { status: 'Hoàn thành', statusClass: 'badge-success', signedBy: LEADER_NAME, signedAt: nowText(), signMethod: signState.method });
                }, results => {
                    const failed = Object.keys(results).filter(k => results[k] === 'Ký lỗi');
                    if (single) {
                        if (failed.length) { toast(MSG.DK_013, 'error'); return; }
                        finishPopup(MSG.DK_SUC_005);
                        return;
                    }
                    if (!failed.length) { finishPopup(MSG.DK_SUC_005); return; }
                    pending = failed;
                    toast(MSG.DK_WRN_003(targets.length - failed.length, targets.length), 'warning');
                });
            }, () => { toast(MSG.DK_013, 'error'); }));
        };
    }

    // Sinh dự thảo Thông báo từ chối (mô phỏng) theo Loại đăng ký
    function openRejectDraft(regNo, type, reason) {
        const w = window.open('', '_blank');
        if (!w) { toast(MSG.DK_017, 'error'); return false; }
        w.document.write(`<title>ThongBaoTuChoi_${esc(regNo)}.pdf</title><div style="font-family:'Times New Roman';padding:40px;max-width:760px;margin:auto;line-height:1.6">
            <div style="display:flex;justify-content:space-between;text-align:center;font-weight:bold"><div>CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM<br>VÀ BỒI THƯỜNG NHÀ NƯỚC<br>TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN</div><div>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>Độc lập - Tự do - Hạnh phúc</div></div>
            <h3 style="text-align:center;margin-top:30px">THÔNG BÁO VỀ VIỆC TỪ CHỐI TIẾP NHẬN, TỪ CHỐI GIẢI QUYẾT HỒ SƠ ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM</h3>
            <p>Số đăng ký: <b>${esc(regNo)}</b></p><p>Loại đăng ký: <b>${esc(type)}</b></p><p>Lý do từ chối: ${esc(reason)}</p>
            <p style="text-align:right;margin-top:40px"><b>GIÁM ĐỐC</b><br><i>(Ký, ghi rõ họ và tên, chức danh, đóng dấu)</i><br><br>${esc(LEADER_NAME)}</p>
            <p style="color:#B91C1C;text-align:center">DỰ THẢO - CHƯA KÝ SỐ</p></div>`);
        w.document.close();
        return true;
    }

    // MH04 - Popup Từ chối Phiếu đăng ký
    function pdkReject(ids) {
        if (!ids.length) { toast(MSG.DK_008, 'error'); return; }
        if (!pdkValid(ids)) { toast(MSG.DK_005, 'error'); return; }
        const recs = ids.map(pdkById);
        LD.popupKind = 'pdk';
        resetSignState();
        const single = recs.length === 1;
        const p = recs[0];
        const viewed = {};
        const info = single ? `
            <h4 class="section-title" style="font-size:15px;margin-top:0">Thông tin hồ sơ từ chối</h4>
            <div class="info-grid">${kvHtml('Số đăng ký', `<b>${esc(pdkRegNo(p))}</b>`)}${kvHtml('Tên bên bảo đảm', esc(p.customer))}${kvHtml('Loại đăng ký', esc(typeLabel(p.type)))}${kvHtml('Cán bộ xử lý', esc(p.handlingOfficer || '-'))}</div>`
            : `<h4 class="section-title" style="font-size:15px;margin-top:0">Danh sách hồ sơ từ chối</h4>
            <div style="margin-bottom:6px">Tổng số hồ sơ: <b>${recs.length}</b></div>
            <div style="overflow-x:auto"><table class="table" style="width:100%"><thead><tr><th>STT</th><th>Số đăng ký</th><th>Tên bên bảo đảm</th><th>Loại đăng ký</th><th>Cán bộ xử lý</th><th>Trạng thái ký số</th><th style="text-align:center">Thao tác</th></tr></thead>
            <tbody>${recs.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(pdkRegNo(r))}</td><td>${esc(r.customer)}</td><td>${esc(typeLabel(r.type))}</td><td>${esc(r.handlingOfficer || '-')}</td><td data-sign-status="${esc(r.id)}"><span class="badge badge-muted">Chưa ký</span></td>
                <td style="text-align:center"><button class="icon-btn view" title="Xem dự thảo từ chối" data-draft="${esc(r.id)}"><i class="fa-regular fa-file-pdf"></i></button></td></tr>`).join('')}</tbody></table></div>`;
        const box = openModal(`
            <div class="modal-header"><span><i class="fa-solid fa-ban"></i> Từ chối Phiếu đăng ký</span><span style="cursor:pointer;font-size:20px" onclick="LeaderUI.cancelPopup()">&times;</span></div>
            ${info}
            <div class="form-group" style="margin-top:10px"><label class="form-label">Lý do từ chối <span class="required-mark">*</span></label><textarea class="form-control" id="ldReason" rows="3" maxlength="2000" placeholder="Nhập lý do từ chối hồ sơ..."></textarea></div>
            ${single ? '<div><button type="button" class="btn btn-outline-primary" id="ldDraftBtn"><i class="fa-regular fa-file-pdf"></i> Xem dự thảo từ chối</button></div>' : ''}
            <div id="ldSignSection">${renderSignSection()}</div>
            <div id="ldBusy" style="display:none;align-items:center;gap:8px;margin-top:12px;color:var(--primary-color)"><i class="fa-solid fa-spinner fa-spin"></i> Đang thực hiện ký số, vui lòng chờ...</div>
            <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
                <button class="btn btn-outline-secondary" onclick="LeaderUI.cancelPopup()">Hủy</button>
                <button class="btn btn-danger" id="ldSignBtn"><i class="fa-solid fa-signature"></i> Ký số</button>
            </div>`);
        const reasonEl = box.querySelector('#ldReason');
        const draft = r => {
            const reason = reasonEl.value.trim();
            if (!reason) { inlineError(reasonEl, true); return; }
            inlineError(reasonEl, false);
            if (openRejectDraft(pdkRegNo(r), typeLabel(r.type), reason)) viewed[r.id] = reason;
        };
        const d1 = box.querySelector('#ldDraftBtn'); if (d1) d1.onclick = () => draft(p);
        box.querySelectorAll('[data-draft]').forEach(b => b.onclick = () => draft(pdkById(b.getAttribute('data-draft'))));
        let pending = recs.map(r => r.id);
        box.querySelector('#ldSignBtn').onclick = () => {
            const reason = reasonEl.value.trim();
            if (!reason) { inlineError(reasonEl, true); return; }
            inlineError(reasonEl, false);
            if (signState.certStatus !== 'Chứng thư số hợp lệ') { toast(MSG.DK_011, 'error'); return; }
            const targets = pending.map(pdkById);
            if (targets.some(r => !r || r.status !== 'Chờ ký')) { toast(MSG.DK_005, 'error'); return; }
            confirmBox(MSG.DK_CFM_016, () => askAuth(code => {
                // Hồ sơ chưa xem dự thảo hoặc đã sửa lý do sau lần xem gần nhất: hệ thống tự sinh file Thông báo từ chối trước khi ký
                runSigning(targets, code, r => {
                    savePdk(r.id, { status: 'Bị từ chối', statusClass: 'badge-danger', rejectReason: reason, rejectedBy: LEADER_NAME, rejectedAt: nowText(), rejectLeader: LEADER_NAME, rejectDraftFile: `ThongBaoTuChoi_${pdkRegNo(r)}.pdf`, signMethod: signState.method, emailNotified: true });
                }, results => {
                    const failed = Object.keys(results).filter(k => results[k] === 'Ký lỗi');
                    if (single) { if (failed.length) { toast(MSG.DK_013, 'error'); return; } finishPopup(MSG.DK_SUC_003); return; }
                    if (!failed.length) { finishPopup(MSG.DK_SUC_003); return; }
                    pending = failed;
                    toast(MSG.DK_WRN_003(targets.length - failed.length, targets.length), 'warning');
                });
            }, () => toast(MSG.DK_013, 'error')));
        };
    }

    // MH05 - Popup Trả lại Phiếu đăng ký (chỉ hồ sơ Nguồn tiếp nhận "Trực tiếp")
    function pdkReturn(id) {
        const p = pdkById(id);
        if (!p || p.status !== 'Chờ ký') { toast(MSG.DK_005, 'error'); return; }
        const box = openModal(`
            <div class="modal-header"><span><i class="fa-solid fa-reply"></i> Trả lại Phiếu đăng ký</span><span style="cursor:pointer;font-size:20px" onclick="LeaderUI.cancelPopup()">&times;</span></div>
            <div class="info-grid">${kvHtml('Số đăng ký', `<b>${esc(pdkRegNo(p))}</b>`)}${kvHtml('Loại đăng ký', esc(typeLabel(p.type)))}${kvHtml('Người yêu cầu', esc(p.requestor || p.customer))}${kvHtml('Nguồn tiếp nhận', pdkSource(p))}${kvHtml('Cán bộ xử lý', esc(p.handlingOfficer || '-'))}</div>
            <div class="form-group" style="margin-top:10px"><label class="form-label">Lý do trả lại <span class="required-mark">*</span></label><textarea class="form-control" id="ldReason" rows="3" maxlength="2000" placeholder="Nhập lý do trả lại hồ sơ..."></textarea></div>
            <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px">
                <button class="btn btn-outline-secondary" onclick="LeaderUI.cancelPopup()">Hủy</button>
                <button class="btn btn-primary" id="ldOkBtn">Xác nhận</button>
            </div>`, '720px');
        box.querySelector('#ldOkBtn').onclick = () => {
            const el = box.querySelector('#ldReason'); const reason = el.value.trim();
            if (!reason) { inlineError(el, true); return; }
            inlineError(el, false);
            const cur = pdkById(id);
            if (!cur || cur.status !== 'Chờ ký' || pdkSource(cur) !== 'Trực tiếp') { toast(MSG.DK_005, 'error'); return; }
            confirmBox(MSG.DK_CFM_014, () => {
                const history = [...(cur.returnHistory || []), { reason, by: LEADER_NAME, at: nowText() }];
                savePdk(id, { status: 'Bị trả lại', statusClass: 'badge-danger', returnReason: reason, returnedBy: LEADER_NAME, returnedAt: nowText(), returnHistory: history });
                finishPopup(MSG.DK_SUC_006);
            });
        };
    }

    // ============================ YÊU CẦU CUNG CẤP THÔNG TIN ============================
    const ccttList = () => (typeof leaderCcttRequests !== 'undefined' ? leaderCcttRequests : []);
    const ccttById = id => ccttList().find(x => x.id === id);
    const ccttSource = r => sourceLabel(r.source);
    const ccttPdf = r => r.pdfFile || `KetQuaCCTT_${r.id}.pdf`;
    const hasPdf = r => r.resultType !== 'noPdf';

    function renderCcttFilter(container) {
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label">Mã hồ sơ</label><input type="text" class="form-control" id="ld-cc-id" placeholder="Nhập mã hồ sơ..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Người yêu cầu</label><input type="text" class="form-control" id="ld-cc-req" placeholder="Nhập tên người yêu cầu..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Mã khách hàng</label><input type="text" class="form-control" id="ld-cc-makh" placeholder="Nhập mã khách hàng..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Nguồn tiếp nhận</label><select class="form-select" id="ld-cc-source"><option value="">Tất cả</option><option>Trực tuyến</option><option>Trực tiếp</option></select></div>
                <div class="form-group"><label class="form-label">Cán bộ xử lý</label><select class="form-select" id="ld-cc-officer">${officerOptions()}</select></div>
                <div class="form-group"><label class="form-label">Tiêu chí yêu cầu cung cấp thông tin</label><select class="form-select" id="ld-cc-criteria"><option value="">Tất cả</option><option>Số đăng ký</option><option>Bên bảo đảm</option><option>Số khung</option></select></div>
                ${dateInputs(firstOfMonth(), today())}
            </div>${filterButtons}`;
    }

    function filterCctt() {
        const list = ccttList().filter(r => {
            if (r.status !== 'Chờ ký') return false;
            if (low('ld-cc-id') && !r.id.toLowerCase().includes(low('ld-cc-id'))) return false;
            if (low('ld-cc-req') && !(r.requester || '').toLowerCase().includes(low('ld-cc-req'))) return false;
            if (low('ld-cc-makh') && !(r.customerId || '').toLowerCase().includes(low('ld-cc-makh'))) return false;
            if (val('ld-cc-source') && ccttSource(r) !== val('ld-cc-source')) return false;
            if (val('ld-cc-officer') && (r.officer || '') !== val('ld-cc-officer')) return false;
            if (val('ld-cc-criteria') && r.criteria !== val('ld-cc-criteria')) return false;
            return inDateRange(r.registeredAt, 'ld-from', 'ld-to');
        });
        return sortSvc(list);
    }
    function sortSvc(list) {
        const s = LD.svcSort;
        const col = s.col === 'registeredAt' ? 'registeredAt' : 'submittedAt';
        return list.sort((a, b) => { const c = (parseDt(a[col]) || 0) - (parseDt(b[col]) || 0); return s.order === 'desc' ? -c : c; });
    }

    function ccttAddress(r) {
        let addr = [r.addressDetail, r.ward, r.province, r.country].filter(Boolean).join(', ') || r.address || '-';
        if (addr !== '-' && !/Việt Nam/i.test(addr)) addr += ', Việt Nam';
        return addr;
    }

    function renderCcttTable() {
        setListChrome('Danh sách yêu cầu cung cấp thông tin chờ ký', `<button class="btn btn-primary" onclick="LeaderUI.ccttSignBatch()"><i class="fa-solid fa-file-signature"></i> Ký số</button>`);
        const s = LD.svcSort;
        document.getElementById('table-headers-container').innerHTML = `<tr>
            <th style="width:40px;text-align:center"><input type="checkbox" id="checkAll" onclick="LeaderUI.checkAll(this)"></th><th style="width:50px">STT</th><th style="width:170px">Mã hồ sơ</th>
            <th style="cursor:pointer;width:140px" onclick="LeaderUI.sortSvc('registeredAt')">Thời điểm đăng ký ${sortIcon(s, 'registeredAt')}</th>
            <th style="width:120px">Mã khách hàng</th><th style="width:200px">Người yêu cầu</th><th style="width:260px">Địa chỉ</th><th style="width:120px">Tiêu chí yêu cầu</th><th style="width:200px">Dữ liệu tra cứu</th>
            <th style="width:110px">Nguồn tiếp nhận</th><th style="width:150px">Cán bộ xử lý</th>
            <th style="cursor:pointer;width:140px" onclick="LeaderUI.sortSvc('submittedAt')">Thời điểm trình ký ${sortIcon(s, 'submittedAt')}</th>
            <th style="width:100px">Trạng thái</th><th style="text-align:center;width:130px;min-width:130px">Thao tác</th></tr>`;
        const list = filterCctt();
        const tbody = document.getElementById('table-data');
        if (!list.length) { tbody.innerHTML = `<tr><td colspan="14" style="text-align:center;padding:30px;color:var(--text-muted)"><i>${MSG.INF_EMPTY}</i></td></tr>`; pagerRender(0, renderCcttTable); return; }
        const { start, end } = pagerRender(list.length, renderCcttTable);
        tbody.innerHTML = list.slice(start, end).map((r, i) => {
            const direct = ccttSource(r) === 'Trực tiếp';
            return `<tr style="cursor:pointer" onclick="LeaderUI.ccttDetail('${r.id}')">
                <td onclick="event.stopPropagation()" style="text-align:center"><input type="checkbox" class="row-checkbox" value="${r.id}" ${hasPdf(r) ? '' : 'disabled title="Hồ sơ chưa có file PDF chờ ký hợp lệ"'}></td>
                <td>${start + i + 1}</td><td><span class="action-link" onclick="event.stopPropagation(); LeaderUI.ccttDetail('${r.id}')"><b>${esc(r.id)}</b></span></td>
                <td>${esc(r.registeredAt)}</td><td><code>${esc(r.customerId || '-')}</code></td><td>${esc(r.requester)}</td><td>${esc(ccttAddress(r))}</td><td>${esc(r.criteria)}</td><td>${esc(r.inputData)}</td>
                <td>${ccttSource(r)}</td><td>${esc(r.officer || '-')}</td><td>${esc(r.submittedAt || '-')}</td><td><span class="badge ${badgeClassOf(r.status)}">${esc(r.status)}</span></td>
                <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">
                    ${rowAction('sign', 'Ký số', 'fa-solid fa-file-signature', `LeaderUI.ccttSign(['${r.id}'])`, true)}
                    ${rowAction('reject', 'Từ chối', 'fa-solid fa-ban', `LeaderUI.ccttReject('${r.id}')`, direct)}
                    ${rowAction('edit', 'Trả lại', 'fa-solid fa-reply', `LeaderUI.ccttReturn('${r.id}')`, direct)}
                </td></tr>`;
        }).join('');
        const ca = document.getElementById('checkAll'); if (ca) ca.checked = false;
    }

    // Khối Thông tin chung / Thông tin trả lại (giống màn Xem chi tiết Hồ sơ đang chờ ký)
    function generalInfo(r) {
        const fields = [['Mã hồ sơ', `<b>${esc(r.id)}</b>`], ['Mã khách hàng', esc(r.customerId || '-')], ['Người yêu cầu', esc(r.requester)], ['Địa chỉ', esc(ccttAddress(r))], ['Thời điểm đăng ký', esc(r.registeredAt)], ['Trạng thái', `<span class="badge ${badgeClassOf(r.status)}">${esc(r.status)}</span>`]];
        return `<details class="cctt-general-info" style="border:1px solid var(--border-color);border-radius:8px;margin-bottom:14px">
            <style>details.cctt-general-info[open] .cgi-collapsed-only{display:none}details.cctt-general-info .cgi-chevron{transition:transform .2s}details.cctt-general-info[open] .cgi-chevron{transform:rotate(90deg)}</style>
            <summary style="cursor:pointer;padding:10px 14px;font-weight:700;color:var(--primary-color);display:flex;align-items:center;gap:10px;list-style:none">
                <i class="fa-solid fa-chevron-right cgi-chevron" style="font-size:12px"></i> Thông tin chung
                <span class="cgi-collapsed-only" style="font-weight:500;color:var(--text-muted)">${esc(r.id)}</span>
                <span class="cgi-collapsed-only badge ${badgeClassOf(r.status)}" style="margin-left:auto">${esc(r.status)}</span></summary>
            <div class="info-grid" style="padding:4px 14px 12px">${fields.map(([l, v]) => kvHtml(l, v)).join('')}</div></details>`;
    }
    // Thông tin trả lại: hiển thị lại vết lịch sử các lần trả lại khi hồ sơ được trình ký lại
    function returnHistoryBlock(r) {
        const list = (r.returnHistory || []).slice().sort((a, b) => (parseDt(b.at) || 0) - (parseDt(a.at) || 0));
        if (!list.length) return '';
        const isReturned = r.status === 'Bị trả lại';
        return `<details class="block-return-info" ${isReturned ? 'open' : ''} style="border:1px solid #FCA5A5;border-left:4px solid #DC2626;border-radius:8px;margin:12px 0;background:#fff">
            <summary style="cursor:pointer;padding:10px 14px;font-weight:700;color:#B91C1C;background:#FEF2F2;list-style:none;display:flex;align-items:center;gap:8px"><i class="fa-solid fa-rotate-left"></i> Thông tin trả lại <span class="badge badge-danger" style="margin-left:6px">${list.length} lần</span></summary>
            ${list.map((h, i) => `<div class="info-grid" style="padding:10px 14px;${i ? 'border-top:1px dashed #FCA5A5' : ''}">
                ${kvHtml('Lý do trả lại', `<span style="color:#B91C1C;font-weight:700">${esc(h.reason)}</span>`)}${kvHtml('Lãnh đạo trả lại', esc(h.by))}${kvHtml('Thời điểm trả lại', esc(h.at))}${h.resubmittedAt ? kvHtml('Thời điểm trình ký lại', esc(h.resubmittedAt)) : ''}
            </div>`).join('')}</details>`;
    }

    function ensureServiceView() {
        let v = document.getElementById('view-ld-service');
        if (!v) { v = document.createElement('div'); v.id = 'view-ld-service'; v.className = 'view-section'; document.getElementById('view-list').insertAdjacentElement('afterend', v); }
        return v;
    }
    function showServiceView(html) {
        const v = ensureServiceView();
        v.innerHTML = html;
        document.getElementById('view-list').classList.remove('active');
        const d = document.getElementById('view-detail'); if (d) d.classList.remove('active');
        v.classList.add('active');
        window.scrollTo(0, 0);
        LD.detailOpen = true;
    }
    function closeServiceView() {
        const v = document.getElementById('view-ld-service'); if (v) v.classList.remove('active');
        document.getElementById('view-list').classList.add('active');
        LD.detailOpen = false;
    }
    const stickyBar = btns => `<div class="card-section" style="position:sticky;bottom:0;z-index:40;display:flex;justify-content:flex-end;gap:10px;box-shadow:0 -4px 12px rgba(15,23,42,.08)">${btns}</div>`;

    // MH02 - Màn hình Xem chi tiết yêu cầu cung cấp thông tin chờ ký
    function ccttDetail(id) {
        const r = ccttById(id); if (!r) return;
        if (!r.lookupResult && window.CcttPopups) r.lookupResult = CcttPopups.runLookup(r);
        const segments = ['Số đăng ký', 'Bên bảo đảm', 'Số khung'].map(c => `<button type="button" class="btn ${c === r.criteria ? 'btn-primary' : 'btn-outline-secondary'}" disabled style="${c === r.criteria ? '' : 'opacity:.45'};border-radius:0">${c}</button>`).join('');
        const inputs = (window.CcttPopups ? CcttPopups.getLookupFields(r) : [['Dữ liệu tra cứu', r.inputData]]).map(([l, v]) => `<div class="form-group"><label class="form-label">${l}</label><input type="text" class="form-control" value="${esc(v || '')}" disabled style="background:#F1F5F9"></div>`).join('');
        const direct = ccttSource(r) === 'Trực tiếp';
        const pending = r.status === 'Chờ ký';
        showServiceView(`
            <div class="card-section">
                <div class="section-title"><span><i class="fa-solid fa-circle-info"></i> Xem chi tiết hồ sơ yêu cầu cung cấp thông tin: ${esc(r.id)}</span></div>
                ${generalInfo(r)}
                ${returnHistoryBlock(r)}
                <h3 class="section-title" style="font-size:15px">Khối tra cứu</h3>
                <div class="form-group"><label class="form-label">Tiêu chí yêu cầu cung cấp thông tin</label><div style="display:inline-flex;border:1px solid var(--border-color);border-radius:6px;overflow:hidden">${segments}</div></div>
                <div class="grid-4-cols">${inputs}</div>
                <h3 class="section-title" style="font-size:15px;margin-top:10px">Kết quả tra cứu</h3>
                <div>${window.CcttPopups ? CcttPopups.renderResult(r.lookupResult) : ''}</div>
                <h3 class="section-title" style="font-size:15px;margin-top:10px">File PDF chờ ký</h3>
                <div class="info-grid">${kvHtml('File PDF kết quả cung cấp thông tin', hasPdf(r) ? fileLink(ccttPdf(r)) : '-')}</div>
            </div>
            ${stickyBar(`<button class="btn btn-outline-secondary" onclick="LeaderUI.closeDetail()">Đóng</button>
                ${pending && direct ? `<button class="btn btn-outline-primary" onclick="LeaderUI.ccttReturn('${r.id}')"><i class="fa-solid fa-reply"></i> Trả lại</button>
                <button class="btn btn-danger" onclick="LeaderUI.ccttReject('${r.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : ''}
                ${pending ? `<button class="btn btn-primary" onclick="LeaderUI.ccttSign(['${r.id}'])"><i class="fa-solid fa-file-signature"></i> Ký số</button>` : ''}`)}`);
    }

    // MH03 - Popup Ký số yêu cầu cung cấp thông tin
    function ccttSign(ids) {
        if (!ids.length) { toast(MSG.CCTT_008, 'error'); return; }
        const recs = ids.map(ccttById);
        if (recs.some(r => !r || r.status !== 'Chờ ký')) { toast(MSG.CCTT_013, 'error'); return; }
        if (recs.some(r => !hasPdf(r))) { toast(MSG.CCTT_009, 'error'); return; }
        LD.popupKind = 'cctt';
        resetSignState();
        const single = recs.length === 1, r0 = recs[0];
        const info = single ? `<h4 class="section-title" style="font-size:15px;margin-top:0">Thông tin hồ sơ ký số</h4>
            <div class="info-grid">${kvHtml('Mã hồ sơ', `<b>${esc(r0.id)}</b>`)}${kvHtml('Người yêu cầu', esc(r0.requester))}${kvHtml('Tiêu chí yêu cầu', esc(r0.criteria))}${kvHtml('Dữ liệu tra cứu', esc(r0.inputData))}${kvHtml('Nguồn tiếp nhận', ccttSource(r0))}${kvHtml('File PDF chờ ký', fileLink(ccttPdf(r0)))}</div>`
            : `<h4 class="section-title" style="font-size:15px;margin-top:0">Danh sách hồ sơ ký số</h4><div style="margin-bottom:6px">Tổng số hồ sơ: <b>${recs.length}</b></div>
            <div style="overflow-x:auto"><table class="table" style="width:100%"><thead><tr><th>STT</th><th>Mã hồ sơ</th><th>Người yêu cầu</th><th>Tiêu chí yêu cầu</th><th>Dữ liệu tra cứu</th><th>Nguồn tiếp nhận</th><th>File PDF chờ ký</th><th>Trạng thái ký số</th></tr></thead>
            <tbody>${recs.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(r.id)}</td><td>${esc(r.requester)}</td><td>${esc(r.criteria)}</td><td>${esc(r.inputData)}</td><td>${ccttSource(r)}</td><td>${fileLink(ccttPdf(r))}</td><td data-sign-status="${esc(r.id)}"><span class="badge badge-muted">Chưa ký</span></td></tr>`).join('')}</tbody></table></div>`;
        signPopup('Ký số yêu cầu cung cấp thông tin', info, recs, {
            errCert: MSG.CCTT_010, errStatus: MSG.CCTT_013, errSign: MSG.CCTT_011, cfm: MSG.CCTT_CFM_002, suc: MSG.CCTT_SUC_007, wrn: MSG.CCTT_WRN_002,
            byId: ccttById,
            apply: r => { Object.assign(r, { status: 'Hoàn thành', signedBy: LEADER_NAME, signedAt: nowText(), signMethod: signState.method }); }
        });
    }

    // Popup ký số dùng chung CCTT / bản sao điện tử
    function signPopup(title, infoHtml, recs, o) {
        const box = openModal(`
            <div class="modal-header"><span><i class="fa-solid fa-file-signature"></i> ${title}</span><span style="cursor:pointer;font-size:20px" onclick="LeaderUI.cancelPopup()">&times;</span></div>
            ${infoHtml}
            <div id="ldSignSection">${renderSignSection()}</div>
            <div id="ldBusy" style="display:none;align-items:center;gap:8px;margin-top:12px;color:var(--primary-color)"><i class="fa-solid fa-spinner fa-spin"></i> Đang thực hiện ký số, vui lòng chờ...</div>
            <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px"><button class="btn btn-outline-secondary" onclick="LeaderUI.cancelPopup()">Hủy</button><button class="btn btn-primary" id="ldSignBtn"><i class="fa-solid fa-signature"></i> Ký số</button></div>`);
        const single = recs.length === 1;
        let pending = recs.map(r => r.id);
        box.querySelector('#ldSignBtn').onclick = () => {
            if (signState.certStatus !== 'Chứng thư số hợp lệ') { toast(o.errCert, 'error'); return; }
            const targets = pending.map(o.byId);
            if (targets.some(r => !r || r.status !== 'Chờ ký')) { toast(o.errStatus, 'error'); return; }
            confirmBox(o.cfm, () => askAuth(code => {
                runSigning(targets, code, o.apply, results => {
                    const failed = Object.keys(results).filter(k => results[k] === 'Ký lỗi');
                    if (single) { if (failed.length) { toast(o.errSign, 'error'); return; } finishPopup(o.suc); return; }
                    if (!failed.length) { finishPopup(o.suc); return; }
                    pending = failed;
                    toast(o.wrn(targets.length - failed.length, targets.length), 'warning');
                });
            }, () => toast(o.errSign, 'error')));
        };
    }

    // Popup Từ chối / Trả lại dùng chung CCTT / bản sao (chỉ hồ sơ Nguồn tiếp nhận "Trực tiếp")
    function reasonPopup(title, icon, infoHtml, label, placeholder, okCls, onOk) {
        const box = openModal(`
            <div class="modal-header"><span><i class="fa-solid ${icon}"></i> ${title}</span><span style="cursor:pointer;font-size:20px" onclick="LeaderUI.cancelPopup()">&times;</span></div>
            <div class="info-grid">${infoHtml}</div>
            <div class="form-group" style="margin-top:10px"><label class="form-label">${label} <span class="required-mark">*</span></label><textarea class="form-control" id="ldReason" rows="3" maxlength="2000" placeholder="${placeholder}"></textarea></div>
            <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px"><button class="btn btn-outline-secondary" onclick="LeaderUI.cancelPopup()">Hủy</button><button class="btn ${okCls}" id="ldOkBtn">Xác nhận</button></div>`, '720px');
        box.querySelector('#ldOkBtn').onclick = () => {
            const el = box.querySelector('#ldReason'); const reason = el.value.trim();
            if (!reason) { inlineError(el, true); return; }
            inlineError(el, false);
            onOk(reason);
        };
    }

    // MH04 - Popup Từ chối yêu cầu cung cấp thông tin
    function ccttReject(id) {
        const r = ccttById(id);
        if (!r || r.status !== 'Chờ ký') { toast(MSG.CCTT_013, 'error'); return; }
        reasonPopup('Từ chối yêu cầu cung cấp thông tin', 'fa-ban',
            kvHtml('Mã hồ sơ', `<b>${esc(r.id)}</b>`) + kvHtml('Số đơn giấy', esc(r.paper || '-')) + kvHtml('Người yêu cầu', esc(r.requester)) + kvHtml('Tiêu chí yêu cầu', esc(r.criteria)) + kvHtml('Dữ liệu tra cứu', esc(r.inputData)) + kvHtml('Cán bộ xử lý', esc(r.officer || '-')),
            'Lý do từ chối', 'Nhập lý do từ chối hồ sơ...', 'btn-danger', reason => {
                const cur = ccttById(id);
                if (!cur || cur.status !== 'Chờ ký' || ccttSource(cur) !== 'Trực tiếp') { toast(MSG.CCTT_013, 'error'); return; }
                confirmBox(MSG.CCTT_CFM_001, () => { Object.assign(cur, { status: 'Bị từ chối', rejectReason: reason, rejectedBy: LEADER_NAME, rejectedAt: nowText() }); finishPopup(MSG.CCTT_SUC_006); });
            });
    }
    // MH05 - Popup Trả lại yêu cầu cung cấp thông tin
    function ccttReturn(id) {
        const r = ccttById(id);
        if (!r || r.status !== 'Chờ ký') { toast(MSG.CCTT_013, 'error'); return; }
        reasonPopup('Trả lại yêu cầu cung cấp thông tin', 'fa-reply',
            kvHtml('Mã hồ sơ', `<b>${esc(r.id)}</b>`) + kvHtml('Số đơn giấy', esc(r.paper || '-')) + kvHtml('Người yêu cầu', esc(r.requester)) + kvHtml('Tiêu chí yêu cầu', esc(r.criteria)) + kvHtml('Dữ liệu tra cứu', esc(r.inputData)) + kvHtml('Cán bộ xử lý', esc(r.officer || '-')),
            'Lý do trả lại', 'Nhập lý do trả lại hồ sơ...', 'btn-primary', reason => {
                const cur = ccttById(id);
                if (!cur || cur.status !== 'Chờ ký' || ccttSource(cur) !== 'Trực tiếp') { toast(MSG.CCTT_013, 'error'); return; }
                confirmBox(MSG.CCTT_CFM_003, () => { cur.returnHistory = [...(cur.returnHistory || []), { reason, by: LEADER_NAME, at: nowText() }]; cur.status = 'Bị trả lại'; finishPopup(MSG.CCTT_SUC_009); });
            });
    }

    // ============================ YÊU CẦU CUNG CẤP BẢN SAO ============================
    const copyList = () => (typeof leaderCopyRequests !== 'undefined' ? leaderCopyRequests : []);
    const copyById = id => copyList().find(x => x.id === id);
    const copySource = r => sourceLabel(r.source);
    const isPaperCopy = r => r.copyType === 'Bản sao giấy';
    const copyFile = r => r.draftFile ? `BanSaoDienTu_${r.id}.pdf` : '';
    const copyQty = r => isPaperCopy(r) ? (parseInt(String(r.copyQty || r.quantity || 1), 10) || 1) + ' bản' : '-';

    function renderCopyFilter(container) {
        container.innerHTML = `
            <div class="grid-4-cols">
                <div class="form-group"><label class="form-label">Mã hồ sơ</label><input type="text" class="form-control" id="ld-bs-id" placeholder="Nhập mã hồ sơ..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Người yêu cầu</label><input type="text" class="form-control" id="ld-bs-req" placeholder="Nhập tên người yêu cầu..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Số đăng ký</label><input type="text" class="form-control" id="ld-bs-sdk" placeholder="Nhập số đăng ký..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Mã khách hàng</label><input type="text" class="form-control" id="ld-bs-makh" placeholder="Nhập mã khách hàng..." autocomplete="off"></div>
                <div class="form-group"><label class="form-label">Nguồn tiếp nhận</label><select class="form-select" id="ld-bs-source"><option value="">Tất cả</option><option>Dịch vụ công</option><option>Trực tuyến</option><option>Trực tiếp</option></select></div>
                <div class="form-group"><label class="form-label">Cán bộ xử lý</label><select class="form-select" id="ld-bs-officer">${officerOptions()}</select></div>
                ${dateInputs(firstOfMonth(), today())}
                <div class="form-group" style="grid-column: 1 / span 2;"><label class="form-label">Loại cung cấp bản sao</label><select class="form-select" id="ld-bs-type"><option value="">Tất cả</option><option>Bản sao điện tử</option><option>Bản sao giấy</option></select></div>
            </div>${filterButtons}`;
    }
    function filterCopy() {
        const list = copyList().filter(r => {
            if (r.status !== 'Chờ ký') return false;
            if (low('ld-bs-id') && !r.id.toLowerCase().includes(low('ld-bs-id'))) return false;
            if (low('ld-bs-req') && !(r.requester || '').toLowerCase().includes(low('ld-bs-req'))) return false;
            if (low('ld-bs-sdk') && !(r.registrationNo || '').toLowerCase().includes(low('ld-bs-sdk'))) return false;
            if (low('ld-bs-makh') && !(r.customerId || '').toLowerCase().includes(low('ld-bs-makh'))) return false;
            if (val('ld-bs-source') && copySource(r) !== val('ld-bs-source')) return false;
            if (val('ld-bs-officer') && (r.officer || '') !== val('ld-bs-officer')) return false;
            if (val('ld-bs-type') && r.copyType !== val('ld-bs-type')) return false;
            return inDateRange(r.registeredAt, 'ld-from', 'ld-to');
        });
        return sortSvc(list);
    }
    function renderCopyTable() {
        setListChrome('Danh sách yêu cầu cung cấp bản sao chờ ký', `<button class="btn btn-primary" onclick="LeaderUI.copySignBatch()"><i class="fa-solid fa-file-signature"></i> Ký số</button>`);
        const s = LD.svcSort;
        document.getElementById('table-headers-container').innerHTML = `<tr>
            <th style="width:40px;text-align:center"><input type="checkbox" id="checkAll" onclick="LeaderUI.checkAll(this)"></th><th style="width:50px">STT</th><th style="width:170px">Mã hồ sơ</th>
            <th style="cursor:pointer;width:140px" onclick="LeaderUI.sortSvc('registeredAt')">Thời điểm đăng ký ${sortIcon(s, 'registeredAt')}</th>
            <th style="width:120px">Mã khách hàng</th><th style="width:220px">Người yêu cầu</th><th style="width:120px">Số đăng ký</th><th style="width:130px">Loại cung cấp bản sao</th><th style="width:100px">Số lượng bản sao</th>
            <th style="width:110px">Nguồn tiếp nhận</th><th style="width:150px">Cán bộ xử lý</th>
            <th style="cursor:pointer;width:140px" onclick="LeaderUI.sortSvc('submittedAt')">Thời điểm trình ký ${sortIcon(s, 'submittedAt')}</th>
            <th style="width:100px">Trạng thái</th><th style="text-align:center;width:130px;min-width:130px">Thao tác</th></tr>`;
        const list = filterCopy();
        const tbody = document.getElementById('table-data');
        if (!list.length) { tbody.innerHTML = `<tr><td colspan="14" style="text-align:center;padding:30px;color:var(--text-muted)"><i>${MSG.INF_EMPTY}</i></td></tr>`; pagerRender(0, renderCopyTable); return; }
        const { start, end } = pagerRender(list.length, renderCopyTable);
        tbody.innerHTML = list.slice(start, end).map((r, i) => {
            const direct = copySource(r) === 'Trực tiếp', paper = isPaperCopy(r);
            return `<tr style="cursor:pointer" onclick="LeaderUI.copyDetail('${r.id}')">
                <td onclick="event.stopPropagation()" style="text-align:center"><input type="checkbox" class="row-checkbox" value="${r.id}" ${paper ? 'disabled title="Hồ sơ bản sao giấy thực hiện Ký duyệt trên từng dòng"' : ''}></td>
                <td>${start + i + 1}</td><td><span class="action-link" onclick="event.stopPropagation(); LeaderUI.copyDetail('${r.id}')"><b>${esc(r.id)}</b></span></td>
                <td>${esc(r.registeredAt)}</td><td><code>${esc(r.customerId || '-')}</code></td><td>${esc(r.requester)}</td><td>${esc(r.registrationNo || '-')}</td>
                <td><span class="badge ${paper ? 'badge-muted' : 'badge-info'}">${esc(r.copyType)}</span></td><td>${copyQty(r)}</td><td>${copySource(r)}</td><td>${esc(r.officer || '-')}</td>
                <td>${esc(r.submittedAt || '-')}</td><td><span class="badge ${badgeClassOf(r.status)}">${esc(r.status)}</span></td>
                <td style="text-align:center;white-space:nowrap" onclick="event.stopPropagation()">
                    ${paper ? rowAction('approve', 'Ký duyệt', 'fa-solid fa-check-double', `LeaderUI.copyApprovePaper('${r.id}')`, true)
                            : rowAction('sign', 'Ký số', 'fa-solid fa-file-signature', `LeaderUI.copySign(['${r.id}'])`, true)}
                    ${rowAction('reject', 'Từ chối', 'fa-solid fa-ban', `LeaderUI.copyReject('${r.id}')`, direct)}
                    ${rowAction('edit', 'Trả lại', 'fa-solid fa-reply', `LeaderUI.copyReturn('${r.id}')`, direct)}
                </td></tr>`;
        }).join('');
        const ca = document.getElementById('checkAll'); if (ca) ca.checked = false;
    }

    // MH02 - Màn hình Xem chi tiết yêu cầu cung cấp bản sao chờ ký
    function copyDetail(id) {
        const r = copyById(id); if (!r) return;
        const paper = isPaperCopy(r), direct = copySource(r) === 'Trực tiếp', pending = r.status === 'Chờ ký';
        showServiceView(`
            <div class="card-section">
                <div class="section-title"><span><i class="fa-solid fa-copy"></i> Xem chi tiết hồ sơ yêu cầu cung cấp bản sao: ${esc(r.id)}</span></div>
                <h3 class="section-title" style="font-size:15px">Thông tin yêu cầu cung cấp bản sao</h3>
                <div class="info-grid">${kvHtml('Mã hồ sơ', `<b>${esc(r.id)}</b>`)}${kvHtml('Người yêu cầu', esc(r.requester))}${kvHtml('Số đăng ký', `<b>${esc(r.registrationNo || '-')}</b>`)}${kvHtml('Loại cung cấp bản sao', `<span class="badge ${paper ? 'badge-muted' : 'badge-info'}">${esc(r.copyType)}</span>`)}${paper ? kvHtml('Số lượng bản sao', copyQty(r)) : ''}</div>
                ${returnHistoryBlock(r)}
                <h3 class="section-title" style="font-size:15px;margin-top:18px">Kết quả tra cứu</h3>
                <div>${window.BsPopups ? BsPopups.renderStructure(r.registrationNo) : ''}</div>
                ${paper ? '' : `<h3 class="section-title" style="font-size:15px;margin-top:18px">File bản sao điện tử chờ ký</h3><div class="info-grid">${kvHtml('File bản sao điện tử', copyFile(r) ? fileLink(copyFile(r)) : '-')}</div>`}
            </div>
            ${stickyBar(`<button class="btn btn-outline-secondary" onclick="LeaderUI.closeDetail()">Đóng</button>
                ${pending && direct ? `<button class="btn btn-outline-primary" onclick="LeaderUI.copyReturn('${r.id}')"><i class="fa-solid fa-reply"></i> Trả lại</button>
                <button class="btn btn-danger" onclick="LeaderUI.copyReject('${r.id}')"><i class="fa-solid fa-ban"></i> Từ chối</button>` : ''}
                ${pending ? (paper ? `<button class="btn btn-success" onclick="LeaderUI.copyApprovePaper('${r.id}')"><i class="fa-solid fa-check-double"></i> Ký duyệt</button>`
                                   : `<button class="btn btn-primary" onclick="LeaderUI.copySign(['${r.id}'])"><i class="fa-solid fa-file-signature"></i> Ký số</button>`) : ''}`)}`);
    }

    // MH03 - Popup Ký số yêu cầu cung cấp bản sao (Bản sao điện tử)
    function copySign(ids) {
        if (!ids.length) { toast(MSG.BS_005, 'error'); return; }
        const recs = ids.map(copyById);
        if (recs.some(r => !r || r.status !== 'Chờ ký' || isPaperCopy(r))) { toast(MSG.BS_002, 'error'); return; }
        if (recs.some(r => !copyFile(r))) { toast(MSG.BS_003, 'error'); return; }
        LD.popupKind = 'copy';
        resetSignState();
        const single = recs.length === 1, r0 = recs[0];
        const info = single ? `<h4 class="section-title" style="font-size:15px;margin-top:0">Thông tin hồ sơ ký số</h4>
            <div class="info-grid">${kvHtml('Mã hồ sơ', `<b>${esc(r0.id)}</b>`)}${kvHtml('Người yêu cầu', esc(r0.requester))}${kvHtml('Số đăng ký', esc(r0.registrationNo))}${kvHtml('Nguồn tiếp nhận', copySource(r0))}${kvHtml('File bản sao điện tử chờ ký', fileLink(copyFile(r0)))}</div>`
            : `<h4 class="section-title" style="font-size:15px;margin-top:0">Danh sách hồ sơ ký số</h4><div style="margin-bottom:6px">Tổng số hồ sơ: <b>${recs.length}</b></div>
            <div style="overflow-x:auto"><table class="table" style="width:100%"><thead><tr><th>STT</th><th>Mã hồ sơ</th><th>Người yêu cầu</th><th>Số đăng ký</th><th>Nguồn tiếp nhận</th><th>File bản sao điện tử chờ ký</th><th>Trạng thái ký số</th></tr></thead>
            <tbody>${recs.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(r.id)}</td><td>${esc(r.requester)}</td><td>${esc(r.registrationNo)}</td><td>${copySource(r)}</td><td>${fileLink(copyFile(r))}</td><td data-sign-status="${esc(r.id)}"><span class="badge badge-muted">Chưa ký</span></td></tr>`).join('')}</tbody></table></div>`;
        signPopup('Ký số yêu cầu cung cấp bản sao', info, recs, {
            errCert: MSG.BS_006, errStatus: MSG.BS_002, errSign: MSG.BS_007, cfm: MSG.BS_CFM_003, suc: MSG.BS_SUC_003, wrn: MSG.BS_WRN_001,
            byId: copyById,
            apply: r => { Object.assign(r, { status: 'Hoàn thành', signedBy: LEADER_NAME, signedAt: nowText(), signMethod: signState.method }); }
        });
    }
    // Ký duyệt bản sao giấy: xác nhận đồng ý cấp bản sao giấy, không ký số
    function copyApprovePaper(id) {
        const r = copyById(id);
        if (!r || r.status !== 'Chờ ký' || !isPaperCopy(r)) { toast(MSG.BS_002, 'error'); return; }
        if (window.BsPopups && !BsPopups.lookup(r.registrationNo)) { toast(MSG.BS_013, 'error'); return; } // [MSG-ERR-BS-013]
        confirmBox(MSG.BS_CFM_002, () => {
            Object.assign(r, { status: 'Đã duyệt - chờ trả kết quả', approvedBy: LEADER_NAME, approvedAt: nowText() });
            if (LD.detailOpen) closeServiceView();
            toast(MSG.BS_SUC_001, 'success');
            renderTable(true);
        });
    }
    function copyReject(id) {
        const r = copyById(id);
        if (!r || r.status !== 'Chờ ký') { toast(MSG.BS_002, 'error'); return; }
        reasonPopup('Từ chối yêu cầu cung cấp bản sao', 'fa-ban',
            kvHtml('Mã hồ sơ', `<b>${esc(r.id)}</b>`) + kvHtml('Người yêu cầu', esc(r.requester)) + kvHtml('Số đăng ký', esc(r.registrationNo)) + kvHtml('Loại cung cấp bản sao', esc(r.copyType)) + kvHtml('Cán bộ xử lý', esc(r.officer || '-')),
            'Lý do từ chối', 'Nhập lý do từ chối hồ sơ...', 'btn-danger', reason => {
                const cur = copyById(id);
                if (!cur || cur.status !== 'Chờ ký' || copySource(cur) !== 'Trực tiếp') { toast(MSG.BS_002, 'error'); return; }
                confirmBox(MSG.BS_CFM_001, () => { Object.assign(cur, { status: 'Bị từ chối', rejectReason: reason, rejectedBy: LEADER_NAME, rejectedAt: nowText() }); finishPopup(MSG.BS_SUC_004); });
            });
    }
    function copyReturn(id) {
        const r = copyById(id);
        if (!r || r.status !== 'Chờ ký') { toast(MSG.BS_002, 'error'); return; }
        reasonPopup('Trả lại yêu cầu cung cấp bản sao', 'fa-reply',
            kvHtml('Mã hồ sơ', `<b>${esc(r.id)}</b>`) + kvHtml('Người yêu cầu', esc(r.requester)) + kvHtml('Số đăng ký', esc(r.registrationNo)) + kvHtml('Loại cung cấp bản sao', esc(r.copyType)) + (isPaperCopy(r) ? kvHtml('Số lượng bản sao', copyQty(r)) : '') + kvHtml('Cán bộ xử lý', esc(r.officer || '-')),
            'Lý do trả lại', 'Nhập lý do trả lại hồ sơ...', 'btn-primary', reason => {
                const cur = copyById(id);
                if (!cur || cur.status !== 'Chờ ký' || copySource(cur) !== 'Trực tiếp') { toast(MSG.BS_002, 'error'); return; }
                confirmBox(MSG.BS_CFM_004, () => { cur.returnHistory = [...(cur.returnHistory || []), { reason, by: LEADER_NAME, at: nowText() }]; cur.status = 'Bị trả lại'; finishPopup(MSG.BS_SUC_005); });
            });
    }

    // ============================ Điều phối chung ============================
    function finishPopup(message) {
        closeLdModal();
        if (LD.detailOpen) closeServiceView();
        toast(message, 'success');
        if (LD.returnToPdkDetail) { sessionStorage.setItem('ldPendingToast', JSON.stringify({ message })); LD.returnToPdkDetail = false; }
        renderTable(true);
    }
    // Hủy: đóng popup, giữ nguyên trạng thái hồ sơ, quay lại màn hình đã mở popup
    function cancelPopup() {
        closeLdModal();
        if (LD.returnToPdkDetail) {
            const back = sessionStorage.getItem('ldPdkDetailUrl');
            LD.returnToPdkDetail = false;
            if (back) { window.location.href = back; return; }
        }
        // Hồ sơ đã ký thành công trong lần ký nhiều hồ sơ trước đó không còn ở danh sách Chờ ký
        if (LD.detailOpen) {
            const v = document.getElementById('view-ld-service');
            const id = v && (v.innerText.match(/:\s*([A-Z]{2,5}-[\d-]+)/) || [])[1];
            const r = id && (ccttById(id) || copyById(id));
            if (r && r.status !== 'Chờ ký') closeServiceView();
        }
        renderTable();
    }

    const workType = () => (typeof leaderWorkType !== 'undefined' ? leaderWorkType : 'registration');

    window.LeaderUI = {
        rerender() { (LD.rerender || renderTable)(); },
        search() {
            if (dateRangeFail('ld-from', 'ld-to')) return;
            currentPage = 1;
            renderTable(true);
        },
        resetFilter() { renderFilterPanel(); currentPage = 1; renderTable(true); },
        checkAll(src) { document.querySelectorAll('#table-data .row-checkbox:not(:disabled)').forEach(c => c.checked = src.checked); },
        sortPdk(col) { cycleSort(LD.pdkSort, col, 'date'); renderTable(); },
        sortSvc(col) { cycleSort(LD.svcSort, col, 'submittedAt'); renderTable(); },
        pdkTxnChange, assetChange, goodsChange,
        pdkDetail(id) {
            const p = pdkById(id);
            if (p) localStorage.setItem('leader_detail_profile', JSON.stringify(p));
            if (typeof openDetail === 'function') openDetail(id);
        },
        pdkApprove, pdkReject, pdkReturn,
        pdkApproveBatch() { pdkApprove(selectedIds()); },
        pdkRejectBatch() { pdkReject(selectedIds()); },
        ccttDetail, ccttSign, ccttReject, ccttReturn,
        ccttSignBatch() { ccttSign(selectedIds()); },
        copyDetail, copySign, copyApprovePaper, copyReject, copyReturn,
        copySignBatch() { copySign(selectedIds()); },
        closeDetail() { closeServiceView(); },
        cancelPopup
    };

    // ------------------ Ghi đè luồng render của màn Lãnh đạo ------------------
    renderFilterPanel = function () {
        if (typeof syncLeaderWorkTabs === 'function') syncLeaderWorkTabs();
        const container = document.getElementById('filter-card-container');
        if (!container) return;
        const wt = workType();
        if (wt === 'cctt') renderCcttFilter(container);
        else if (wt === 'copy') renderCopyFilter(container);
        else { renderPdkFilter(container); }
        if (typeof flatpickr !== 'undefined') {
            flatpickr('#ld-from', { dateFormat: 'd/m/Y', allowInput: true });
            flatpickr('#ld-to', { dateFormat: 'd/m/Y', allowInput: true });
        }
    };

    renderTable = function (resetPage) {
        if (resetPage) currentPage = 1;
        if (typeof syncLeaderWorkTabs === 'function') syncLeaderWorkTabs();
        updateLeaderBadges();
        const wt = workType();
        if (wt === 'cctt') renderCcttTable();
        else if (wt === 'copy') renderCopyTable();
        else renderPdkTable();
    };

    // Badge số lượng hồ sơ "Chờ ký" của từng Tab nghiệp vụ (không phụ thuộc bộ lọc; ẩn khi bằng 0; lớn hơn 99 hiển thị "99+")
    function updateLeaderBadges() {
        const setBadge = (id, n) => { const el = document.getElementById(id); if (el) { el.innerText = n > 99 ? '99+' : n; el.style.display = n ? '' : 'none'; } };
        setBadge('badge-reg-leader', getPdkStore().filter(p => p.status === 'Chờ ký' && !PDK_SERVICE_TYPES.includes(p.type)).length);
        setBadge('badge-cctt-leader', ccttList().filter(r => r.status === 'Chờ ký').length);
        setBadge('badge-copy-leader', copyList().filter(r => r.status === 'Chờ ký').length);
    }

    // Đưa dữ liệu giả lập CCTT / bản sao về khoảng thời gian mặc định của bộ lọc (từ ngày 01 của tháng hiện tại)
    function rebaseServiceDates(list) {
        const t = new Date();
        list.forEach((r, idx) => {
            ['registeredAt', 'submittedAt'].forEach(k => {
                const d = parseDt(r[k]); if (!d) return;
                const day = Math.min(t.getDate(), (idx % t.getDate()) + 1);
                r[k] = `${pad(day)}/${pad(t.getMonth() + 1)}/${t.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
            });
        });
    }

    const BASE_INIT = initViewMode;
    initViewMode = function () {
        rebaseServiceDates(ccttList());
        rebaseServiceDates(copyList());
        // Dữ liệu giả lập: hồ sơ trực tiếp đã từng bị trả lại và được Cán bộ trình ký lại (giữ vết lịch sử trả lại)
        const cc = ccttList().find(r => r.status === 'Chờ ký' && sourceLabel(r.source) === 'Trực tiếp');
        if (cc && !cc.returnHistory) cc.returnHistory = [{ reason: 'Dữ liệu tra cứu chưa khớp với Phiếu yêu cầu giấy, đề nghị kiểm tra lại số CCCD.', by: LEADER_NAME, at: cc.registeredAt, resubmittedAt: cc.submittedAt }];
        const bs = copyList().find(r => r.status === 'Chờ ký' && sourceLabel(r.source) === 'Trực tiếp');
        if (bs && !bs.returnHistory) bs.returnHistory = [{ reason: 'Số lượng bản sao chưa khớp với đơn yêu cầu giấy.', by: LEADER_NAME, at: bs.registeredAt, resubmittedAt: bs.submittedAt }];
        const ps = document.getElementById('cb-pagesize');
        if (ps) { if (!Array.from(ps.options).some(o => o.value === '20')) ps.insertAdjacentHTML('beforeend', '<option value="20">20</option>'); ps.value = '20'; ps.onchange = () => { currentPage = 1; renderTable(); }; }
        BASE_INIT();
        const h1 = document.querySelector('h1'); if (h1) h1.innerText = 'HỆ THỐNG QUẢN TRỊ - LÃNH ĐẠO KÝ DUYỆT HỒ SƠ';
        renderFilterPanel();
        renderTable(true);
        handleIncomingAction();
    };

    // Thao tác mở từ màn Xem chi tiết Phiếu đăng ký (Trả lại / Từ chối / Duyệt): mở popup tương ứng trên màn Lãnh đạo
    function handleIncomingAction() {
        const qs = new URLSearchParams(window.location.search);
        const action = qs.get('leaderAction'), id = qs.get('id');
        const t = sessionStorage.getItem('ldPendingToast');
        if (t) { sessionStorage.removeItem('ldPendingToast'); }
        if (!action || !id) return;
        if (history.replaceState) history.replaceState(null, '', window.location.pathname);
        LD.returnToPdkDetail = true;
        if (action === 'approve') pdkApprove([id]);
        else if (action === 'reject') pdkReject([id]);
        else if (action === 'return') pdkReturn(id);
    }
})();
