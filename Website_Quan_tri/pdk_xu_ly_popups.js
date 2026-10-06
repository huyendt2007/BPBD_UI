/**
 * Popup dùng chung cho Xử lý Phiếu đăng ký (SRS 4.3.2.3):
 *  - MH03 - Popup Từ chối Phiếu đăng ký (kèm sinh dự thảo Thông báo từ chối - mục 4.3.2.3.7)
 *  - MH04 - Popup Trình ký Phiếu đăng ký (kèm sinh dự thảo Văn bản chứng nhận Mẫu số 05d - mục 4.3.2.3.6)
 * Dùng tại: kiem_tra_ho_so.html (danh sách) và xem_chi_tiet_lich_su_can_bo.html (xem chi tiết).
 *
 * API:
 *   PdkPopups.openReject(records, { mode: 'single' | 'multi', onDone(records) })
 *   PdkPopups.openSign(records, { mode: 'single' | 'multi', onDone(records) })
 *   PdkPopups.toast(message, type)
 * records: [{ id, registrationNo, type, transactionType, subtype, requester, grantor, securedParty, receivedAt, submitter, submitterAddress, pin, source }]
 */
(function () {
    const SIGN_LIMIT = 20; // Giới hạn số hồ sơ trình ký/lần (tham số cấu hình, mặc định 20)
    const LEADERS = [
        { name: 'Lê Hoàng Long', title: 'GIÁM ĐỐC' },
        { name: 'Trần Thị Minh Nguyệt', title: 'PHÓ GIÁM ĐỐC' },
        { name: 'Nguyễn Văn Lãnh Đạo', title: 'PHÓ GIÁM ĐỐC' }
    ];
    const UNIT = { parent: 'CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC', name: 'TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI', short: 'TTĐK1', place: 'Hà Nội' };
    let rejectNoticeSeq = 15;

    const esc = v => String(v ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    const pad = n => String(n).padStart(2, '0');
    const nowText = () => { const d = new Date(); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
    const regNo = r => r.registrationNo || r.id;

    function injectStyles() {
        if (document.getElementById('pdk-popup-style')) return;
        const st = document.createElement('style');
        st.id = 'pdk-popup-style';
        st.textContent = `
            .pdk-overlay{position:fixed;inset:0;background:rgba(15,23,42,.45);display:none;align-items:center;justify-content:center;z-index:2500;font-family:inherit}
            .pdk-overlay.show{display:flex}
            .pdk-box{background:#fff;border-radius:10px;width:min(820px,96vw);max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(15,23,42,.25);overflow:hidden}
            .pdk-head{padding:16px 22px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center}
            .pdk-head h3{margin:0;font-size:16px;color:#1e3a8a}
            .pdk-close{cursor:pointer;font-size:20px;color:#64748b;background:none;border:none}
            .pdk-body{padding:18px 22px;overflow-y:auto;flex:1;font-size:13.5px;color:#0f172a}
            .pdk-foot{padding:14px 22px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:10px;background:#fff}
            .pdk-btn{padding:8px 16px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;font-weight:600;font-size:13px;display:inline-flex;align-items:center;gap:6px}
            .pdk-btn.primary{background:#1e3a8a;border-color:#1e3a8a;color:#fff}
            .pdk-btn.danger{background:#dc2626;border-color:#dc2626;color:#fff}
            .pdk-btn.link{border:none;background:none;color:#2563eb;padding:4px 6px}
            .pdk-field{margin-bottom:14px}
            .pdk-field label{display:block;font-weight:700;margin-bottom:6px;color:#1e293b}
            .pdk-field .req{color:#dc2626}
            .pdk-input,.pdk-select,.pdk-textarea{width:100%;box-sizing:border-box;border:1px solid #cbd5e1;border-radius:6px;padding:8px 10px;font-size:13.5px;font-family:inherit}
            .pdk-invalid{border-color:#dc2626 !important;box-shadow:0 0 0 2px rgba(220,38,38,.12)}
            .pdk-err{color:#dc2626;font-size:12px;margin-top:4px;display:none}
            .pdk-err.show{display:block}
            .pdk-info{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;margin-bottom:14px}
            .pdk-info span{display:block;color:#64748b;font-size:12px}
            .pdk-info b{font-size:13.5px}
            .pdk-table{width:100%;border-collapse:collapse;margin-bottom:14px;font-size:13px}
            .pdk-table th,.pdk-table td{border:1px solid #e2e8f0;padding:7px 9px;text-align:left;vertical-align:middle}
            .pdk-table th{background:#f1f5f9;font-weight:700}
            .pdk-viewed{color:#059669;font-size:12px;margin-left:4px}
            .pdk-toast-wrap{position:fixed;top:20px;right:20px;z-index:3000;display:flex;flex-direction:column;gap:10px;max-width:420px}
            .pdk-toast{background:#fff;border:1px solid;border-left-width:4px;border-radius:6px;padding:12px 14px;box-shadow:0 6px 18px rgba(15,23,42,.12);font-size:13.5px;display:flex;gap:10px}
        `;
        document.head.appendChild(st);
    }

    function toast(message, type = 'success') {
        injectStyles();
        let wrap = document.getElementById('pdk-toast-wrap');
        if (!wrap) { wrap = document.createElement('div'); wrap.id = 'pdk-toast-wrap'; wrap.className = 'pdk-toast-wrap'; document.body.appendChild(wrap); }
        const color = { success: '#059669', error: '#dc2626', warn: '#d97706', info: '#2563eb' }[type] || '#2563eb';
        const box = document.createElement('div');
        box.className = 'pdk-toast';
        box.style.borderColor = color;
        box.innerHTML = `<span style="color:${color};font-weight:700">●</span><div style="flex:1">${message}</div><span style="cursor:pointer;color:#64748b" onclick="this.parentElement.remove()">&times;</span>`;
        wrap.appendChild(box);
        setTimeout(() => box.remove(), 4500);
    }

    function ensureOverlay() {
        injectStyles();
        let ov = document.getElementById('pdk-overlay');
        if (!ov) {
            ov = document.createElement('div');
            ov.id = 'pdk-overlay';
            ov.className = 'pdk-overlay';
            document.body.appendChild(ov);
        }
        return ov;
    }

    function close() {
        const ov = document.getElementById('pdk-overlay');
        if (ov) { ov.classList.remove('show'); ov.innerHTML = ''; }
    }

    function leaderOptions() {
        return '<option value="">-- Chọn Lãnh đạo --</option>' + LEADERS.map((l, i) => `<option value="${i}">${esc(l.name)} - ${l.title === 'GIÁM ĐỐC' ? 'Giám đốc' : 'Phó Giám đốc'} Trung tâm</option>`).join('');
    }

    function markInvalid(el, errId, show) {
        if (el) el.classList.toggle('pdk-invalid', show);
        const err = document.getElementById(errId);
        if (err) err.classList.toggle('show', show);
        if (show && el) el.focus();
    }

    // ---------------------------------------------------------------
    // Sinh file PDF dự thảo (mở tab mới)
    // ---------------------------------------------------------------
    function openDocTab(title, bodyHtml) {
        const tab = window.open('', '_blank');
        if (!tab) { toast('Trình duyệt đang chặn cửa sổ mới. Vui lòng cho phép popup để xem dự thảo.', 'error'); return false; }
        tab.document.title = title;
        tab.document.body.style.cssText = 'background:#e2e8f0;margin:0;padding:24px;font-family:"Times New Roman",serif';
        tab.document.body.innerHTML = `
            <div style="max-width:820px;margin:0 auto;background:#fff;padding:48px 56px;box-shadow:0 4px 18px rgba(0,0,0,.12);position:relative;line-height:1.55;font-size:15px">
                <div style="position:absolute;top:38%;left:12%;transform:rotate(-32deg);font-size:84px;font-weight:900;color:rgba(220,38,38,.1);letter-spacing:12px;pointer-events:none">DỰ THẢO</div>
                ${bodyHtml}
            </div>`;
        return true;
    }

    function headerBlock(rightTop = '') {
        return `
            ${rightTop ? `<div style="text-align:right;font-style:italic;font-size:13px">${rightTop}</div>` : ''}
            <table style="width:100%;border-collapse:collapse;margin-bottom:10px"><tr>
                <td style="width:45%;text-align:center;vertical-align:top;font-size:13.5px">${UNIT.parent}<br><b>${UNIT.name}</b><div style="width:120px;height:1px;background:#000;margin:4px auto"></div></td>
                <td style="text-align:center;vertical-align:top;font-size:13.5px"><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b><div style="width:170px;height:1px;background:#000;margin:4px auto"></div></td>
            </tr></table>`;
    }

    function signerBlock(leader) {
        return `
            <div style="display:flex;justify-content:flex-end;margin-top:36px"><div style="text-align:center;width:340px">
                <b>${leader ? leader.title : 'NGƯỜI CÓ THẨM QUYỀN CỦA TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN'}</b><br>
                <i>(Ký, ghi rõ họ và tên, chức danh, đóng dấu)</i>
                <div style="margin-top:16px;padding:22px;border:1px dashed #94a3b8;color:#64748b;font-style:italic;font-size:13px">[VÙNG CHỜ KÝ SỐ - DẤU ĐIỆN TỬ]</div>
            </div></div>`;
    }

    // Mục 4.3.2.3.7.2 - Mapping dữ liệu Thông báo từ chối
    function buildRejectDraft(r, reason, leader, noticeNo) {
        const body = `
            ${headerBlock()}
            <table style="width:100%;margin-bottom:8px;font-size:14px"><tr>
                <td style="width:45%;text-align:center">Số: ${noticeNo}/TBTC-${UNIT.short}</td>
                <td style="text-align:center;font-style:italic">${UNIT.place}, ngày ...... tháng ...... năm ......</td>
            </tr></table>
            <h3 style="text-align:center;margin:18px 0 14px">THÔNG BÁO VỀ VIỆC TỪ CHỐI TIẾP NHẬN, TỪ CHỐI GIẢI QUYẾT HỒ SƠ ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM</h3>
            <p style="text-align:center">Kính gửi: <b>${esc(r.submitter || r.requester || r.grantor)}</b></p>
            <p>Địa chỉ: ${esc(r.submitterAddress || 'Số 8 Duy Tân, Phường Cầu Giấy, Thành phố Hà Nội, Việt Nam')}</p>
            <p>Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội thông báo từ chối tiếp nhận, từ chối giải quyết hồ sơ đăng ký với các thông tin sau:</p>
            <p>- Số đăng ký: <b>${esc(regNo(r))}</b></p>
            <p>- Loại đăng ký: ${esc(r.type)}</p>
            <p>- Thời điểm tiếp nhận: ${esc(r.receivedAt || '-')}</p>
            <p>- Bên bảo đảm: ${esc(r.grantor || '-')}</p>
            <p>- Bên nhận bảo đảm: ${esc(r.securedParty || '-')}</p>
            <p>- Lý do từ chối: <b>${esc(reason)}</b></p>
            ${signerBlock(leader)}`;
        return openDocTab(`ThongBaoTuChoi_${regNo(r)}.pdf`, body);
    }

    // Mục 4.3.2.3.6 - Mẫu số 05d (lá mặt/trang ký + phần chi tiết phía sau); nội dung theo Loại đăng ký tại mục 4.3.2.3.6.4
    function buildCertificateDraft(r, leader) {
        const type = (r.type || '').toLowerCase();
        const isFirst = ['đăng ký mới', 'đăng ký lần đầu'].includes(type);
        const isNoticeFirst = type === 'thông báo xử lý tài sản' || type === 'thông báo xử lý tài sản bảo đảm lần đầu';
        const isChange = type === 'đăng ký thay đổi';
        const isDelete = type === 'xóa đăng ký';
        const isNoticeChange = type.startsWith('thay đổi thông báo');
        const isNoticeDelete = type.startsWith('xóa thông báo') || type.startsWith('xóa đăng ký thông báo');
        const detailTitle = isChange ? 'CHI TIẾT ĐĂNG KÝ THAY ĐỔI' : isDelete ? 'CHI TIẾT XÓA ĐĂNG KÝ'
            : isNoticeFirst ? 'CHI TIẾT THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM' : isNoticeChange ? 'CHI TIẾT THAY ĐỔI THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM'
            : isNoticeDelete ? 'CHI TIẾT XÓA THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM' : 'CHI TIẾT ĐĂNG KÝ';
        // Mã Pin: chỉ Đăng ký lần đầu và Thông báo xử lý lần đầu đối với tài sản chưa đăng ký biện pháp bảo đảm
        const showPin = !!r.pin && (isFirst || isNoticeFirst);
        const isPaper = (r.source || '').toLowerCase().includes('trực tiếp') || (r.source || '').toLowerCase().includes('cán bộ');
        const firstRegNo = r.firstRegNo || r.refRegNo || '';
        const relatedLine = (isChange || isDelete || isNoticeChange || isNoticeDelete || (isNoticeFirst && firstRegNo))
            ? `<p>- Số đăng ký lần đầu của hồ sơ gốc: <b>${esc(firstRegNo || 'Theo dữ liệu hồ sơ gốc')}</b></p>` : '';
        const scopeNote = isChange ? 'Toàn bộ nội dung của hồ sơ sau thay đổi (gồm cả nội dung không thay đổi; không gồm bên và tài sản đã rút bớt).'
            : isDelete ? 'Toàn bộ nội dung của hồ sơ tại thời điểm xóa đăng ký; Căn cứ xóa đăng ký theo dữ liệu Phiếu xóa đăng ký.'
            : isNoticeFirst ? 'Nội dung thông báo và các tài sản bị xử lý thuộc thông báo.'
            : isNoticeChange ? 'Toàn bộ nội dung thông báo sau thay đổi (không gồm tài sản đã rút khỏi thông báo).'
            : isNoticeDelete ? 'Toàn bộ nội dung thông báo và các tài sản thuộc thông báo tại thời điểm xóa.'
            : 'Toàn bộ nội dung Phiếu đăng ký.';
        // Thời điểm cập nhật vào CSDL và Ngày tháng năm: để trống trên dự thảo, hệ thống tự động điền khi Lãnh đạo ký số thành công
        const blankTime = '<span style="background:#FEF3C7;padding:0 4px" title="Hệ thống tự động điền khi Lãnh đạo ký số thành công">..... giờ..... phút, ngày..... tháng..... năm.....</span>';
        const body = `
            ${headerBlock('Mẫu số 05d')}
            <p style="font-size:13.5px">Mã hồ sơ TTHC: <b>${esc(r.id)}</b></p>
            <p style="text-align:right;font-style:italic">${UNIT.place}, <span style="background:#FEF3C7;padding:0 4px" title="Hệ thống tự động điền khi Lãnh đạo ký số thành công">ngày..... tháng..... năm.....</span></p>
            <h3 style="text-align:center;margin:14px 0">VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM,<br>THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM</h3>
            <p style="text-align:center"><b>${UNIT.name}<br>CHỨNG NHẬN</b></p>
            <p><b>1.</b> Nội dung của Phiếu yêu cầu đăng ký đã được cập nhật vào Cơ sở dữ liệu tại thời điểm ${blankTime}, số đăng ký <b>${esc(regNo(r))}</b></p>
            <p>1.1. Bên nhận bảo đảm: <b>${esc(r.securedParty || '-')}</b><br>Địa chỉ: ${esc(r.securedPartyAddress || 'Số 35 Hàng Vôi, Phường Hoàn Kiếm, Thành phố Hà Nội, Việt Nam')}</p>
            <p>1.2. Bên bảo đảm: <b>${esc(r.grantor || '-')}</b><br>Giấy tờ chứng minh tư cách pháp lý: ${esc(r.grantorId || 'Mã số thuế: 0109200847')}</p>
            ${showPin ? `<p>1.3. Mã Pin: <b>${esc(r.pin)}</b><br><i>(Người yêu cầu đăng ký hoàn toàn chịu trách nhiệm về việc bảo mật thông tin liên quan đến mã Pin do cơ quan đăng ký cấp).</i></p>` : ''}
            <p><b>2.</b> ${isPaper ? 'Phiếu yêu cầu đăng ký kèm theo Văn bản chứng nhận này là một phần không thể tách rời của Văn bản chứng nhận.' : 'Chi tiết thông tin thể hiện trên giao diện đăng ký trực tuyến kèm theo Văn bản chứng nhận này là một phần không thể tách rời của Văn bản chứng nhận.'}</p>
            <div style="display:flex;justify-content:space-between;align-items:flex-end">
                <div style="width:96px;height:96px;border:1px dashed #94a3b8;display:flex;align-items:center;justify-content:center;font-size:11px;color:#64748b;text-align:center">QR xác thực<br>(Dự thảo)</div>
                ${signerBlock(leader)}
            </div>
            <div style="page-break-before:always;border-top:2px dashed #94a3b8;margin-top:40px;padding-top:24px">
                <h3 style="text-align:center">${detailTitle}</h3>
                <p>- Số đăng ký: <b>${esc(regNo(r))}</b> &nbsp;|&nbsp; Thời điểm đăng ký: ${esc(r.receivedAt || '-')}</p>
                ${relatedLine}
                <p>- Loại hình giao dịch: ${esc(r.transactionType || '-')} &nbsp;|&nbsp; Loại đăng ký: ${esc(r.type)} &nbsp;|&nbsp; Loại biện pháp/Hợp đồng: ${esc(r.subtype || '-')}</p>
                <p><i>Phạm vi nội dung: ${esc(scopeNote)}</i></p>
                <p><b>Bên bảo đảm:</b> ${esc(r.grantor || '-')}</p>
                <p><b>Bên nhận bảo đảm:</b> ${esc(r.securedParty || '-')}</p>
                <p><b>${isNoticeFirst || isNoticeChange || isNoticeDelete ? 'Tài sản bị xử lý' : 'Tài sản bảo đảm'} - ${esc(r.assetType || 'Theo hồ sơ')}:</b> Chi tiết theo dữ liệu Phiếu đăng ký.</p>
                <p style="text-align:center;font-size:12px;color:#64748b">Trang 2</p>
            </div>`;
        return openDocTab(`DuThao_VanBanChungNhan_${regNo(r)}.pdf`, body);
    }

    // ---------------------------------------------------------------
    // MH03 - Popup Từ chối Phiếu đăng ký
    // ---------------------------------------------------------------
    function openReject(records, opts = {}) {
        const multi = opts.mode === 'multi';
        const ov = ensureOverlay();
        const viewed = {};
        let lastReason = '';
        ov.innerHTML = `
            <div class="pdk-box">
                <div class="pdk-head"><h3>Từ chối Phiếu đăng ký</h3><button class="pdk-close" data-act="cancel">&times;</button></div>
                <div class="pdk-body">
                    ${multi ? `
                        <div style="margin-bottom:8px"><b>Tổng số hồ sơ:</b> ${records.length}</div>
                        <table class="pdk-table">
                            <thead><tr><th style="width:50px">STT</th><th>Số đăng ký</th><th>Tên bên bảo đảm</th><th>Loại đăng ký</th><th style="width:130px;text-align:center">Thao tác</th></tr></thead>
                            <tbody>${records.map((r, i) => `<tr><td>${i + 1}</td><td><b>${esc(regNo(r))}</b></td><td>${esc(r.grantor)}</td><td>${esc(r.type)}</td>
                                <td style="text-align:center"><button class="pdk-btn link" data-act="draft-row" data-idx="${i}" title="Xem dự thảo từ chối"><i class="fa-solid fa-file-pdf"></i> Xem dự thảo</button><span class="pdk-viewed" id="pdk-rj-viewed-${i}"></span></td></tr>`).join('')}</tbody>
                        </table>` : `
                        <div class="pdk-info"><div><span>Số đăng ký</span><b>${esc(regNo(records[0]))}</b></div></div>`}
                    <div class="pdk-field">
                        <label>Lý do từ chối tiếp nhận <span class="req">*</span></label>
                        <textarea class="pdk-textarea" id="pdk-rj-reason" rows="4" maxlength="1000" placeholder="Nhập lý do từ chối hồ sơ..."></textarea>
                        <div class="pdk-err" id="pdk-rj-reason-err">Đây là trường bắt buộc</div>
                    </div>
                    ${multi ? '' : `<div style="margin:-4px 0 14px"><button class="pdk-btn" data-act="draft-single"><i class="fa-solid fa-file-pdf" style="color:#dc2626"></i> Xem dự thảo từ chối</button><span class="pdk-viewed" id="pdk-rj-viewed-0"></span></div>`}
                    <div class="pdk-field">
                        <label>Lãnh đạo ký văn bản từ chối <span class="req">*</span></label>
                        <select class="pdk-select" id="pdk-rj-leader">${leaderOptions()}</select>
                        <div class="pdk-err" id="pdk-rj-leader-err">Đây là trường bắt buộc</div>
                    </div>
                </div>
                <div class="pdk-foot"><button class="pdk-btn" data-act="cancel">Hủy</button><button class="pdk-btn danger" data-act="confirm"><i class="fa-solid fa-ban"></i> Xác nhận</button></div>
            </div>`;
        ov.classList.add('show');
        const reasonEl = document.getElementById('pdk-rj-reason');
        const leaderEl = document.getElementById('pdk-rj-leader');
        // Nếu Cán bộ sửa Lý do từ chối, dự thảo đã xem không còn đúng -> yêu cầu xem lại
        reasonEl.addEventListener('input', () => {
            if (reasonEl.value.trim() !== lastReason) {
                Object.keys(viewed).forEach(k => { delete viewed[k]; const v = document.getElementById('pdk-rj-viewed-' + k); if (v) v.textContent = ''; });
            }
        });
        const requireReason = () => {
            reasonEl.value = reasonEl.value.trim();
            const ok = !!reasonEl.value;
            markInvalid(reasonEl, 'pdk-rj-reason-err', !ok);
            return ok;
        };
        const draft = idx => {
            if (!requireReason()) return;
            const leader = leaderEl.value !== '' ? LEADERS[+leaderEl.value] : null;
            if (buildRejectDraft(records[idx], reasonEl.value, leader, rejectNoticeSeq++)) {
                viewed[idx] = true;
                lastReason = reasonEl.value;
                const v = document.getElementById('pdk-rj-viewed-' + idx);
                if (v) v.innerHTML = '✔ Đã xem';
            }
        };
        ov.onclick = e => {
            const act = e.target.closest('[data-act]')?.dataset.act;
            if (!act) return;
            if (act === 'cancel') close();
            if (act === 'draft-single') draft(0);
            if (act === 'draft-row') draft(+e.target.closest('[data-act]').dataset.idx);
            if (act === 'confirm') {
                if (!requireReason()) return;
                if (records.some((r, i) => !viewed[i])) {
                    // [MSG-ERR-DK-015]
                    toast('Vui lòng xem dự thảo Thông báo từ chối của tất cả hồ sơ trước khi xác nhận.', 'error');
                    return;
                }
                if (leaderEl.value === '') { markInvalid(leaderEl, 'pdk-rj-leader-err', true); return; }
                markInvalid(leaderEl, 'pdk-rj-leader-err', false);
                const leader = LEADERS[+leaderEl.value];
                const at = nowText();
                records.forEach(r => Object.assign(r, {
                    status: 'Chờ ký', statusClass: 'badge-info', pendingAction: 'Từ chối',
                    rejectReason: reasonEl.value, rejectLeader: leader.name, rejectedBy: 'Nguyễn Văn Cán Bộ', rejectedAt: at,
                    rejectDraftFile: `ThongBaoTuChoi_${regNo(r)}.pdf`
                }));
                close();
                if (typeof opts.onDone === 'function') opts.onDone(records, 'Đã từ chối hồ sơ thành công'); // [MSG-SUC-DK-KT-003]
            }
        };
    }

    // ---------------------------------------------------------------
    // MH04 - Popup Trình ký Phiếu đăng ký
    // ---------------------------------------------------------------
    function openSign(records, opts = {}) {
        const multi = opts.mode === 'multi';
        if (multi && records.length > SIGN_LIMIT) {
            // [MSG-WRN-DK-001]
            toast(`Chỉ được trình ký tối đa ${SIGN_LIMIT} hồ sơ/lần. Vui lòng bỏ chọn bớt hồ sơ.`, 'warn');
            return;
        }
        const ov = ensureOverlay();
        const viewed = {};
        const r0 = records[0];
        ov.innerHTML = `
            <div class="pdk-box">
                <div class="pdk-head"><h3>Trình ký Phiếu đăng ký</h3><button class="pdk-close" data-act="cancel">&times;</button></div>
                <div class="pdk-body">
                    ${multi ? `
                        <div style="margin-bottom:8px"><b>Tổng số hồ sơ trình ký:</b> ${records.length} <span style="color:#64748b">(tối đa ${SIGN_LIMIT} hồ sơ/lần)</span></div>
                        <table class="pdk-table">
                            <thead><tr><th style="width:50px">STT</th><th>Số đăng ký</th><th>Loại đăng ký</th><th>Loại hình giao dịch</th><th>Người yêu cầu</th><th style="width:130px;text-align:center">Thao tác</th></tr></thead>
                            <tbody>${records.map((r, i) => `<tr><td>${i + 1}</td><td><b>${esc(regNo(r))}</b></td><td>${esc(r.type)}</td><td>${esc(r.transactionType)}</td><td>${esc(r.requester)}</td>
                                <td style="text-align:center"><button class="pdk-btn link" data-act="draft-row" data-idx="${i}" title="Xem dự thảo Văn bản chứng nhận"><i class="fa-solid fa-file-pdf"></i> Xem dự thảo</button><span class="pdk-viewed" id="pdk-sg-viewed-${i}"></span></td></tr>`).join('')}</tbody>
                        </table>` : `
                        <div class="pdk-info">
                            <div><span>Số đăng ký</span><b>${esc(regNo(r0))}</b></div>
                            <div><span>Loại đăng ký</span><b>${esc(r0.type)}</b></div>
                            <div><span>Loại hình giao dịch</span><b>${esc(r0.transactionType)}</b></div>
                            <div><span>Người yêu cầu</span><b>${esc(r0.requester)}</b></div>
                        </div>
                        <div style="margin:-4px 0 14px"><button class="pdk-btn" data-act="draft-single"><i class="fa-solid fa-file-pdf" style="color:#dc2626"></i> Xem dự thảo Văn bản chứng nhận</button><span class="pdk-viewed" id="pdk-sg-viewed-0"></span></div>`}
                    <div class="pdk-field">
                        <label>Lãnh đạo ký <span class="req">*</span></label>
                        <select class="pdk-select" id="pdk-sg-leader">${leaderOptions()}</select>
                        <div class="pdk-err" id="pdk-sg-leader-err">Đây là trường bắt buộc</div>
                    </div>
                    <div class="pdk-field" style="margin:0"><label>Thời điểm trình ký</label><span style="color:#64748b">Hệ thống ghi nhận khi Cán bộ xác nhận trình ký thành công</span></div>
                </div>
                <div class="pdk-foot"><button class="pdk-btn" data-act="cancel">Hủy</button><button class="pdk-btn primary" data-act="confirm"><i class="fa-solid fa-paper-plane"></i> Xác nhận trình ký</button></div>
            </div>`;
        ov.classList.add('show');
        const leaderEl = document.getElementById('pdk-sg-leader');
        const draft = idx => {
            const leader = leaderEl.value !== '' ? LEADERS[+leaderEl.value] : null;
            if (buildCertificateDraft(records[idx], leader)) {
                viewed[idx] = true;
                const v = document.getElementById('pdk-sg-viewed-' + idx);
                if (v) v.innerHTML = '✔ Đã xem';
            }
        };
        ov.onclick = e => {
            const act = e.target.closest('[data-act]')?.dataset.act;
            if (!act) return;
            if (act === 'cancel') close();
            if (act === 'draft-single') draft(0);
            if (act === 'draft-row') draft(+e.target.closest('[data-act]').dataset.idx);
            if (act === 'confirm') {
                if (records.some((r, i) => !viewed[i])) {
                    // [MSG-ERR-DK-016]
                    toast('Vui lòng xem dự thảo Văn bản chứng nhận của tất cả hồ sơ trước khi trình ký.', 'error');
                    return;
                }
                if (leaderEl.value === '') { markInvalid(leaderEl, 'pdk-sg-leader-err', true); return; }
                markInvalid(leaderEl, 'pdk-sg-leader-err', false);
                const leader = LEADERS[+leaderEl.value];
                const at = nowText();
                records.forEach(r => Object.assign(r, {
                    status: 'Chờ ký', statusClass: 'badge-info', pendingAction: 'Trình ký',
                    signLeader: leader.name, submittedBy: 'Nguyễn Văn Cán Bộ', submittedAt: at, draftLocked: true,
                    certificateDraftFile: `DuThao_VanBanChungNhan_${regNo(r)}.pdf`
                }));
                close();
                if (typeof opts.onDone === 'function') opts.onDone(records, 'Đã trình ký hồ sơ thành công'); // [MSG-SUC-DK-KT-002]
            }
        };
    }

    window.PdkPopups = { openReject, openSign, toast, close, SIGN_LIMIT, ensureOverlay, esc, LEADERS };
})();
