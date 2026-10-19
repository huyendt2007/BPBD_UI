/**
 * Xử lý yêu cầu cung cấp thông tin (SRS 4.3.2.2) - dùng chung giao diện popup với pdk_xu_ly_popups.js
 *  - Tự động tra cứu theo tiêu chí hồ sơ (dữ liệu giả lập), hiển thị Kết quả tra cứu
 *  - MH04 - Popup Trình ký kết quả cung cấp thông tin (sinh PDF dự thảo Mẫu số 10d theo 4.3.2.2.7)
 *  - MH05 - Popup Từ chối yêu cầu cung cấp thông tin
 */
(function () {
    const esc = v => String(v ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    const pad = n => String(n).padStart(2, '0');
    const LEADERS = ['Lê Hoàng Long - Giám đốc Trung tâm', 'Trần Thị Minh Nguyệt - Phó Giám đốc Trung tâm', 'Nguyễn Văn Lãnh Đạo - Phó Giám đốc Trung tâm'];
    const MSG_NO_DATA = 'Kết quả thông tin bạn tra cứu: Chưa được đăng ký hoặc hiệu lực của đăng ký đối với thông tin không còn.'; // [MSG-WRN-CCTT-001]
    const MSG_ERR_STATUS = 'Hồ sơ không ở trạng thái Chờ tiếp nhận hoặc đã thay đổi trạng thái. Vui lòng tải lại trang.'; // [MSG-ERR-CCTT-002]
    const MSG_ERR_NO_RESULT = 'Chưa có kết quả tra cứu hợp lệ để thực hiện thao tác.'; // [MSG-ERR-CCTT-005]

    // Tách Loại chủ thể và giá trị định danh từ dữ liệu Khách hàng đã gửi (VD: "Công dân Việt Nam - CCCD 091000000004")
    function parseSubject(item) {
        if (item.subjectType) return { subjectType: item.subjectType, subjectValue: item.subjectValue };
        const parts = String(item.inputData || '').split(' - ');
        const subjectType = parts[0] || 'Công dân Việt Nam';
        const subjectValue = (parts[1] || '').replace(/^(CCCD|MST|Hộ chiếu|Thẻ cư trú)\s*/i, '').trim();
        return { subjectType, subjectValue };
    }

    const SUBJECT_FIELD = {
        'Công dân Việt Nam': 'Số CMND/Căn cước công dân/Chứng minh quân đội',
        'Tổ chức có đăng ký kinh doanh trong nước': 'Mã số thuế/Số đăng ký kinh doanh',
        'Người nước ngoài': 'Số Hộ chiếu',
        'Tổ chức nước ngoài': 'Mã số thuế/Số giấy phép đầu tư',
        'Tổ chức khác': 'Tên tổ chức',
        'Người không quốc tịch cư trú tại Việt Nam': 'Số thẻ cư trú'
    };

    // Các trường dữ liệu tra cứu theo tiêu chí (dùng cho MH02 Khối tra cứu và MH03 Xem chi tiết)
    function getLookupFields(item) {
        if (item.criteria === 'Số đăng ký') return [['Số đăng ký', item.inputData]];
        if (item.criteria === 'Số khung') return [['Số khung', item.inputData]];
        const s = parseSubject(item);
        return [['Loại chủ thể', s.subjectType], [SUBJECT_FIELD[s.subjectType] || 'Số giấy tờ', s.subjectValue]];
    }

    // Tự động tra cứu (dữ liệu giả lập): trả về danh sách hồ sơ từ Hồ sơ đăng ký lần đầu đến các hồ sơ liên quan, sắp xếp Thời điểm đăng ký tăng dần
    function runLookup(item) {
        const d = new Date();
        const at = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
        const hasData = item.resultType !== 'noData';
        const records = hasData ? buildLookupRecords() : [];
        return { at, hasData, records, criteria: item.criteria, input: getLookupFields(item).map(f => f[1]).join(' - ') };
    }

    // Toàn bộ hồ sơ từ Hồ sơ đăng ký lần đầu đến các hồ sơ liên quan, sắp xếp theo Thời điểm đăng ký tăng dần
    function buildLookupRecords() {
        const origin = {
            transactionType: 'Biện pháp bảo đảm', measure: 'Cầm cố tài sản', contractType: '', status: 'Hoàn thành',
            contractNo: 'HĐCC-BIDV-2025/233', contractDate: '18/04/2025',
            registrant: { name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam - Chi nhánh Thăng Long', address: 'Số 3 Phạm Hùng, Phường Cầu Giấy, Thành phố Hà Nội, Việt Nam' },
            grantors: [{ subjectType: 'Cá nhân', idNo: 'CCCD 001190003456', name: 'Trần Thị Mai', address: 'Số 18 Hoàng Quốc Việt, Phường Nghĩa Đô, Thành phố Hà Nội, Việt Nam' }],
            securedParties: [{ name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam - Chi nhánh Thăng Long', idNo: 'MST 0100150619-048', address: 'Số 3 Phạm Hùng, Phường Cầu Giấy, Thành phố Hà Nội, Việt Nam' }],
            assets: [{ assetType: 'Quyền tài sản', description: 'Quyền đòi nợ phát sinh từ Hợp đồng tiền gửi có kỳ hạn', rightName: 'Quyền đòi tiền gửi có kỳ hạn', rightBasis: 'Hợp đồng tiền gửi số TG-2025/1188 ngày 10/04/2025' }]
        };
        const list = [
            { ...origin, regNo: '1505170802', caseName: 'ĐĂNG KÝ LẦN ĐẦU', registeredAt: '20/04/2025 10:05:22', effectiveAt: '20/04/2025 10:05:22' },
            {
                ...origin, regNo: '1509124410', caseName: 'ĐĂNG KÝ THAY ĐỔI', registeredAt: '12/09/2025 14:20:10', effectiveAt: '12/09/2025 14:20:10',
                contractNo: 'HĐCC-BIDV-2025/233/PL01', contractDate: '10/09/2025'
            },
            {
                ...origin, regNo: '1602031875', caseName: 'THÔNG BÁO XỬ LÝ TÀI SẢN BẢO ĐẢM LẦN ĐẦU', registeredAt: '03/02/2026 09:15:40', effectiveAt: '03/02/2026 09:15:40',
                assets: [{ assetType: 'Quyền tài sản', description: 'Xử lý quyền đòi tiền gửi có kỳ hạn theo Hợp đồng tiền gửi số TG-2025/1188', rightName: 'Quyền đòi tiền gửi có kỳ hạn', rightBasis: 'Hợp đồng tiền gửi số TG-2025/1188 ngày 10/04/2025' }]
            }
        ];
        const toDate = s => { const m = String(s).match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/); return m ? new Date(m[3], m[2] - 1, m[1], m[4], m[5], m[6]) : 0; };
        return list
            .sort((a, b) => toDate(a.registeredAt) - toDate(b.registeredAt))
            .map(r => ({
                ...r,
                originRegNo: '1505170802', // Số đăng ký của Hồ sơ đăng ký lần đầu trong chuỗi hồ sơ
                // Các trường tóm tắt dùng cho PDF dự thảo Mẫu số 10d
                grantor: r.grantors.map(g => g.name).join(', '),
                secured: r.securedParties.map(s => s.name).join(', '),
                asset: r.assets.map(a => a.rightBasis ? `${a.description} (${a.rightBasis})` : a.description).join('; ')
            }));
    }

    function renderResult(result) {
        const head = `
            <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 18px;margin-bottom:12px;font-size:13.5px">
                <div><div style="color:#64748b;font-size:12px">Thời điểm tra cứu</div><b>${esc(result.at)}</b></div>
                <div><div style="color:#64748b;font-size:12px">Tiêu chí tra cứu thực tế</div><b>${esc(result.criteria)}</b></div>
                <div><div style="color:#64748b;font-size:12px">Dữ liệu đầu vào tra cứu</div><b>${esc(result.input)}</b></div>
            </div>`;
        if (!result.hasData) {
            return head + `<div style="padding:14px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;color:#92400e"><b>Kết quả tra cứu:</b> ${MSG_NO_DATA}</div>`;
        }
        // Danh sách hồ sơ tìm thấy: hiển thị lần lượt từng hồ sơ theo Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng
        // Tổng số hồ sơ phù hợp: đếm theo tổng số lượng hồ sơ kết quả tra cứu tìm thấy
        const totalCount = result.records.length;
        const total = `<div class="cctt-result-total" style="margin-bottom:10px;padding:9px 14px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:6px;font-size:13.5px">
                Tổng số hồ sơ phù hợp: <b>${totalCount}</b></div>`;
        return head + total + `<div class="cctt-result-records">${result.records.map((r, i) => BsPopups.renderRecord(r.regNo, r, { index: i + 1 })).join('')}</div>`;
    }

    // Chi tiết 01 hồ sơ trong PDF theo Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng
    function pdfRecord(r, index) {
        const line = (l, v) => v ? `<div>- ${l}: <b>${esc(v)}</b></div>` : '';
        const sec = t => `<div style="margin-top:6px"><b><i>${t}</i></b></div>`;
        return `<div style="margin:8px 0">
            <div><b>Hồ sơ ${index}: Đăng ký giao dịch bảo đảm / Hợp đồng - ${esc(r.regNo)} (${esc(r.caseName)})</b></div>
            ${line('Loại hình giao dịch', r.transactionType)}${line('Loại biện pháp', r.measure)}${line('Loại hợp đồng', r.contractType)}
            <div>- Trường hợp đăng ký: <b>${esc(r.caseName)}</b></div>${line('Trạng thái', r.status)}${line('Số hợp đồng', r.contractNo)}${line('Ngày có hiệu lực của hợp đồng', r.contractDate)}

            ${sec('Thông tin đăng ký')}${line('Số đăng ký', r.regNo)}${line('Thời điểm đăng ký', r.registeredAt)}${line('Thời điểm có hiệu lực', r.effectiveAt)}
            ${sec('Bên bảo đảm')}${r.grantors.map((g, i) => `<div>${i + 1}. ${esc(g.name)} - ${esc(g.subjectType)} - ${esc(g.idNo)} - Địa chỉ: ${esc(g.address)}</div>`).join('')}
            ${sec('Bên nhận bảo đảm')}${r.securedParties.map((s, i) => `<div>${i + 1}. ${esc(s.name)} - Địa chỉ: ${esc(s.address)}</div>`).join('')}
            ${sec('Tài sản bảo đảm')}${r.assets.map((a, i) => `<div>${i + 1}. ${esc(a.assetType)}: ${esc(a.description || '')}${a.rightName ? `; Tên quyền: ${esc(a.rightName)}` : ''}${a.rightBasis ? `; Căn cứ phát sinh quyền: ${esc(a.rightBasis)}` : ''}${a.frames ? '; ' + a.frames.map(f => `${esc(f.vehicleName)} ${esc(f.brandColor)}, số khung ${esc(f.frameNo)}, số máy ${esc(f.engineNo || '-')}, biển số ${esc(f.plateNo || '-')}`).join('; ') : ''}</div>`).join('')}
        </div>`;
    }

    // File PDF dự thảo kết quả cung cấp thông tin (Mẫu số 10d - mục 4.3.2.2.7)
    function buildDraft(item, result, leader) {
        const d = new Date();
        const s = parseSubject(item);
        const cb = (checked, label, value) => `<div>${checked ? '☑' : '☐'} ${label}${checked ? `: <b>${esc(value)}</b>` : ''}</div>`;
        const lookupAt = result.at.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}).*/, '$4 giờ $5 phút, ngày $1 tháng $2 năm $3');
        const lookupAtShort = result.at.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}).*/, '$1-$2-$3 $4:$5');
        return `
            <div style="position:relative;background:#fff;padding:36px 42px;font-family:'Times New Roman',serif;font-size:14px;line-height:1.55;color:#111">
                <div style="position:absolute;top:36%;left:14%;transform:rotate(-32deg);font-size:72px;font-weight:900;color:rgba(220,38,38,.1);letter-spacing:10px;pointer-events:none">DỰ THẢO</div>
                <div style="text-align:right;font-style:italic;font-size:13px">Mẫu số 10d</div>
                <table style="width:100%;border-collapse:collapse"><tr>
                    <td style="width:45%;text-align:center;font-size:13px">CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM VÀ BỒI THƯỜNG NHÀ NƯỚC<br><b>TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI</b></td>
                    <td style="text-align:center;font-size:13px"><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b></td>
                </tr></table>
                <p style="font-size:13px">Mã hồ sơ TTHC: <b>${esc(item.id)}</b></p>
                <p style="text-align:right;font-style:italic">Hà Nội, ngày ${pad(d.getDate())} tháng ${pad(d.getMonth() + 1)} năm ${d.getFullYear()}</p>
                <h3 style="text-align:center;margin:10px 0">VĂN BẢN CUNG CẤP THÔNG TIN VỀ BIỆN PHÁP BẢO ĐẢM BẰNG ĐỘNG SẢN, CÂY HẰNG NĂM, CÔNG TRÌNH TẠM</h3>
                <p>Người yêu cầu cung cấp thông tin: <b>${esc(item.requester)}</b></p>
                <p>Địa chỉ liên hệ: ${esc(item.address)}</p>
                <p style="text-align:center"><b>TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN TẠI TP. HÀ NỘI</b></p>
                <p>1. Việc tra cứu thông tin được thực hiện theo tiêu chí sau đây:</p>
                ${cb(item.criteria === 'Bên bảo đảm' && s.subjectType !== 'Tổ chức nước ngoài', 'Số giấy tờ xác định tư cách pháp lý của bên bảo đảm', s.subjectValue)}
                ${cb(item.criteria === 'Bên bảo đảm' && s.subjectType === 'Tổ chức nước ngoài', 'Tên của bên bảo đảm là tổ chức nước ngoài', s.subjectValue)}
                ${cb(item.criteria === 'Số khung', 'Số khung của phương tiện giao thông cơ giới', item.inputData)}
                ${cb(item.criteria === 'Số đăng ký', 'Số đăng ký biện pháp bảo đảm', item.inputData)}
                <p>2. Thông tin về biện pháp bảo đảm bằng động sản, cây hằng năm, công trình tạm tra cứu tại thời điểm ${esc(lookupAt)} được Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội cung cấp kèm theo Văn bản này.</p>
                <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:18px">
                    <div style="width:90px;height:90px;border:1px dashed #94a3b8;display:flex;align-items:center;justify-content:center;font-size:11px;color:#64748b;text-align:center">QR xác thực<br>(Dự thảo)</div>
                    <div style="text-align:center;width:330px"><b>NGƯỜI CÓ THẨM QUYỀN CỦA TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN</b><br><i>(Ký, ghi rõ họ và tên, chức danh, đóng dấu)</i>
                        ${leader ? `<div style="margin-top:6px">${esc(leader)}</div>` : ''}
                        <div style="margin-top:10px;padding:18px;border:1px dashed #94a3b8;color:#64748b;font-style:italic;font-size:12.5px">[VÙNG CHỜ KÝ SỐ - DẤU ĐIỆN TỬ]</div>
                    </div>
                </div>
                <div style="border-top:2px dashed #94a3b8;margin-top:30px;padding-top:18px">
                    <h3 style="text-align:center">KẾT QUẢ CUNG CẤP THÔNG TIN CÓ XÁC NHẬN CỦA CƠ QUAN ĐĂNG KÝ</h3>
                    <p>Thông tin đã được tìm thấy trong cơ sở dữ liệu của Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước thỏa mãn các tiêu chí tra cứu thông tin như sau:</p>
                    <p>- Số cung cấp thông tin: ${esc(item.id)}</p>
                    ${item.criteria === 'Số đăng ký' ? `<p>- Số đăng ký: ${esc(item.inputData)}</p>` : ''}
                    ${item.criteria === 'Bên bảo đảm' ? `<p>- ${esc(s.subjectType)}</p><p>- ${esc(SUBJECT_FIELD[s.subjectType] || 'Số giấy tờ')}: ${esc(s.subjectValue)}</p>` : ''}
                    ${item.criteria === 'Số khung' ? `<p>- Số khung: ${esc(item.inputData)}</p>` : ''}
                    <p>- Thời điểm tra cứu: ${esc(lookupAtShort)}</p>
                    <hr>
                    ${result.hasData ? result.records.map((r, i) => pdfRecord(r, i + 1) + (i < result.records.length - 1 ? '<hr style="border-style:dashed">' : '')).join('') : `<p><i>${MSG_NO_DATA}</i></p>`}
                </div>
            </div>`;
    }

    function open(html, width) {
        const ov = PdkPopups.ensureOverlay();
        ov.innerHTML = html;
        const bx = ov.querySelector('.pdk-box');
        if (bx && width) bx.style.width = `min(${width}px, 96vw)`;
        ov.classList.add('show');
        return ov;
    }

    // MH04 - Popup Trình ký kết quả cung cấp thông tin
    function openSign(item, result, onDone) {
        if (!result) { PdkPopups.toast(MSG_ERR_NO_RESULT, 'error'); return; }
        const ov = open(`
            <div class="pdk-box">
                <div class="pdk-head"><h3>Trình ký kết quả cung cấp thông tin</h3><button class="pdk-close" data-act="cancel">&times;</button></div>
                <div class="pdk-body">
                    <div class="pdk-info">
                        <div><span>Mã hồ sơ</span><b>${esc(item.id)}</b></div>
                        <div><span>Số lượng kết quả tra cứu</span><b>${result.hasData ? result.records.length : 0}</b></div>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                        <b style="color:#1e3a8a">File PDF kết quả cung cấp thông tin (dự thảo)</b>
                        <span><button class="pdk-btn link" data-act="view"><i class="fa-solid fa-arrow-up-right-from-square"></i> Xem file</button><button class="pdk-btn link" data-act="download"><i class="fa-solid fa-download"></i> Tải tệp</button></span>
                    </div>
                    <div style="max-height:48vh;overflow:auto;border:1px solid #e2e8f0;border-radius:6px;background:#e2e8f0;padding:12px;margin-bottom:14px">${buildDraft(item, result)}</div>
                    <div class="pdk-field"><label>Lãnh đạo ký <span class="req">*</span></label><select class="pdk-select" id="cctt-sg-leader"><option value="">-- Chọn Lãnh đạo --</option>${LEADERS.map(l => `<option value="${esc(l)}">${esc(l)}</option>`).join('')}</select><div class="pdk-err" id="cctt-sg-leader-err">Đây là trường bắt buộc</div></div>
                </div>
                <div class="pdk-foot"><button class="pdk-btn" data-act="cancel">Hủy</button><button class="pdk-btn primary" data-act="confirm"><i class="fa-solid fa-paper-plane"></i> Xác nhận</button></div>
            </div>`, 820);
        ov.onclick = e => {
            const act = e.target.closest('[data-act]')?.dataset.act;
            if (!act) return;
            if (act === 'cancel') PdkPopups.close(); // không lưu file PDF dự thảo vừa sinh
            if (act === 'view') {
                const tab = window.open('', '_blank');
                if (tab) { tab.document.title = `KetQuaCCTT_${item.id}.pdf`; tab.document.body.style.cssText = 'background:#e2e8f0;padding:20px'; tab.document.body.innerHTML = `<div style="max-width:850px;margin:0 auto">${buildDraft(item, result, document.getElementById('cctt-sg-leader').value)}</div>`; }
            }
            if (act === 'download') PdkPopups.toast(`Đang tải xuống file PDF dự thảo: KetQuaCCTT_${esc(item.id)}.pdf`, 'info');
            if (act !== 'confirm') return;
            if (item.status !== 'Chờ duyệt' && item.status !== 'Duyệt chờ ký') { PdkPopups.toast(MSG_ERR_STATUS, 'error'); return; } // TH1
            const sel = document.getElementById('cctt-sg-leader');
            if (!sel.value) { sel.classList.add('pdk-invalid'); document.getElementById('cctt-sg-leader-err').classList.add('show'); sel.focus(); return; } // TH3
            Object.assign(item, { status: 'Chờ ký', signLeader: sel.value, submittedBy: 'Nguyễn Văn Cán Bộ', submittedAt: result.at, lookupResult: result, draftLocked: true });
            PdkPopups.close();
            onDone(item, 'Trình duyệt yêu cầu cung cấp thông tin thành công.'); // [MSG-SUC-CCTT-003]
        };
    }

    // MH05 - Popup Từ chối yêu cầu cung cấp thông tin (không hiển thị thêm bước xác nhận)
    function openReject(item, onDone, opts = {}) {
        const ov = open(`
            <div class="pdk-box">
                <div class="pdk-head"><h3>Từ chối yêu cầu cung cấp thông tin: ${esc(item.id)}</h3><button class="pdk-close" data-act="cancel">&times;</button></div>
                <div class="pdk-body">
                    <div class="pdk-info"><div><span>Mã hồ sơ</span><b>${esc(item.id)}</b></div><div><span>Người yêu cầu</span><b>${esc(item.requester)}</b></div></div>
                    <div class="pdk-field"><label>Lý do từ chối <span class="req">*</span></label><textarea class="pdk-textarea" id="cctt-rj-reason" rows="4" maxlength="2000" placeholder="Nhập lý do từ chối..."></textarea><div class="pdk-err" id="cctt-rj-reason-err">Đây là trường bắt buộc</div></div>
                </div>
                <div class="pdk-foot"><button class="pdk-btn" data-act="cancel">Hủy</button><button class="pdk-btn danger" data-act="confirm"><i class="fa-solid fa-ban"></i> Xác nhận từ chối</button></div>
            </div>`, 620);
        ov.onclick = e => {
            const act = e.target.closest('[data-act]')?.dataset.act;
            if (act === 'cancel') PdkPopups.close();
            if (act !== 'confirm') return;
            const el = document.getElementById('cctt-rj-reason');
            el.value = el.value.trim();
            if (!el.value) { el.classList.add('pdk-invalid'); document.getElementById('cctt-rj-reason-err').classList.add('show'); el.focus(); return; }
            if (!(opts.allowed || ['Chờ duyệt']).includes(item.status)) { PdkPopups.toast(MSG_ERR_STATUS, 'error'); return; }
            const d = new Date();
            Object.assign(item, { status: 'Bị từ chối', rejectReason: el.value, rejectedBy: 'Nguyễn Văn Cán Bộ', rejectedAt: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`, refundRequested: true });
            PdkPopups.close();
            onDone(item, 'Từ chối yêu cầu cung cấp thông tin thành công.'); // [MSG-SUC-CCTT-004]
        };
    }

    window.CcttPopups = { parseSubject, getLookupFields, runLookup, renderResult, buildDraft, openSign, openReject, MSG_ERR_STATUS, MSG_ERR_NO_RESULT };
})();
