/**
 * Xử lý yêu cầu cung cấp bản sao (SRS 4.3.2.5) - dùng chung giao diện popup với pdk_xu_ly_popups.js
 *  - Dữ liệu hồ sơ gốc giả lập tra cứu theo Số đăng ký
 *  - Khối II. Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng (theo 4.1.12.7.2.1)
 *  - MH03a - Popup Trình ký bản sao điện tử (sinh PDF dự thảo theo 4.3.2.18.6), MH03b - Popup Trình ký bản sao giấy
 *  - MH04 - Popup Từ chối yêu cầu cung cấp bản sao, Popup xác nhận [MSG-CFM-BS-005]
 */
(function () {
    const esc = v => String(v ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    const LEADERS = [
        'Lê Hoàng Long - Giám đốc Trung tâm',
        'Trần Thị Minh Nguyệt - Phó Giám đốc Trung tâm',
        'Nguyễn Văn Lãnh Đạo - Phó Giám đốc Trung tâm'
    ];

    const base = {
        transactionType: 'Biện pháp bảo đảm', measure: 'Thế chấp tài sản', contractType: '', caseName: 'ĐĂNG KÝ LẦN ĐẦU',
        pdfTitle: 'VĂN BẢN CHỨNG NHẬN ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM - BẢN SAO ĐIỆN TỬ', status: 'Hoàn thành',
        agency: 'Trung tâm Đăng ký giao dịch, tài sản tại TP Hà Nội'
    };
    const DB = {
        '1505156438': {
            ...base, contractNo: 'HĐTC-VCB-2025/089', contractDate: '12/05/2025', registeredAt: '15/05/2025 09:30:15', effectiveAt: '15/05/2025 09:30:15',
            registrant: { name: 'Ngân hàng TMCP Ngoại thương Việt Nam - Chi nhánh Sở Giao Dịch', address: 'Số 11 Láng Hạ, Phường Thành Công, TP Hà Nội, Việt Nam' },
            grantors: [{ subjectType: 'Cá nhân', idNo: 'CCCD 001085002134', name: 'Nguyễn Văn Nam', address: 'Số 45 Trần Hưng Đạo, Phường Cửa Nam, TP Hà Nội, Việt Nam' }],
            securedParties: [{ name: 'Ngân hàng TMCP Ngoại thương Việt Nam - Chi nhánh Sở Giao Dịch', idNo: 'MST 0100112437-001', address: 'Số 11 Láng Hạ, Phường Thành Công, TP Hà Nội, Việt Nam' }],
            assets: [
                {
                    type: 'road',
                    groupTitle: 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)',
                    subTitle: 'Số khung',
                    items: [
                        { vehicleName: 'Xe ô tô con 5 chỗ', brandColor: 'Toyota Camry 2.5Q, màu bạc', frameNo: 'RLGBF3FK7MN012345', engineNo: '2AR-5872134', plateNo: '30H-123.45' }
                    ]
                },
                {
                    type: 'vehicle',
                    groupTitle: 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt',
                    subTitle: 'Phương tiện',
                    items: [
                        { vehicleName: 'Tàu cá vỏ gỗ QB-90827-TS', subInfo: 'Máy chính Yanmar 6HA2M-WDT, công suất 150CV', owner: 'Nguyễn Văn Nam', regNo: 'QB-90827-TS', issuer: 'Chi cục Thủy sản tỉnh Quảng Bình', grade: 'Tàu cá nhóm II (chiều dài từ 12 m đến dưới 15 m)' }
                    ]
                },
                {
                    type: 'rights',
                    groupTitle: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
                    name: 'Quyền đòi nợ trị giá 3,0 tỷ VNĐ',
                    basis: 'Phát sinh từ Hợp đồng mua bán hàng hóa số 01/2026/HĐMB ngày 15/01/2026 giữa bên bảo đảm và Công ty TNHH Thương mại ABC'
                }
            ]
        },
        '1505170855': {
            ...base, contractNo: 'HĐTC-ANVIET-2025/017', contractDate: '03/03/2025', registeredAt: '05/03/2025 14:12:40', effectiveAt: '05/03/2025 14:12:40',
            registrant: { name: 'Công ty Luật TNHH An Việt', address: 'Số 45 phố Nguyễn Thị Định, Phường Yên Hòa, TP Hà Nội, Việt Nam' },
            grantors: [{ subjectType: 'Tổ chức', idNo: 'MST 0106543210', name: 'Công ty Cổ phần Thương mại Minh Phát', address: 'Số 120 Nguyễn Trãi, Phường Thanh Xuân, TP Hà Nội, Việt Nam' }],
            securedParties: [{ name: 'Ngân hàng TMCP Kỹ thương Việt Nam - Chi nhánh Hà Nội', idNo: 'MST 0100230800-005', address: 'Số 6 Quang Trung, Phường Cửa Nam, TP Hà Nội, Việt Nam' }],
            assets: [
                {
                    type: 'road',
                    groupTitle: 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)',
                    subTitle: 'Số khung',
                    items: [
                        { vehicleName: 'Xe ô tô tải', brandColor: 'Hyundai Mighty EX8, màu trắng', frameNo: 'KMFGA17BPMC100231', engineNo: 'D4GA-MC100231', plateNo: '29H-456.78' }
                    ]
                }
            ]
        },
        '1505170802': {
            ...base, measure: 'Cầm cố tài sản', contractNo: 'HĐCC-BIDV-2025/233', contractDate: '18/04/2025', registeredAt: '20/04/2025 10:05:22', effectiveAt: '20/04/2025 10:05:22',
            registrant: { name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam - Chi nhánh Thăng Long', address: 'Số 3 Phạm Hùng, Phường Cầu Giấy, TP Hà Nội, Việt Nam' },
            grantors: [{ subjectType: 'Cá nhân', idNo: 'CCCD 001190003456', name: 'Trần Thị Mai', address: 'Số 18 Hoàng Quốc Việt, Phường Nghĩa Đô, TP Hà Nội, Việt Nam' }],
            securedParties: [{ name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam - Chi nhánh Thăng Long', idNo: 'MST 0100150619-048', address: 'Số 3 Phạm Hùng, Phường Cầu Giấy, TP Hà Nội, Việt Nam' }],
            assets: [
                {
                    type: 'rights',
                    groupTitle: 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản',
                    name: 'Quyền đòi nợ phát sinh từ Hợp đồng tiền gửi có kỳ hạn',
                    basis: 'Hợp đồng tiền gửi số TG-2025/1188 ngày 10/04/2025'
                }
            ]
        }
    };

    function lookup(regNo) { return DB[String(regNo || '').trim()] || null; }

    const box = 'border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:12px';
    const th = 'border:1px solid #e2e8f0;padding:8px 10px;background:#f1f5f9;text-align:left;font-size:12.5px;color:#334155';
    const td = 'border:1px solid #e2e8f0;padding:8px 10px;font-size:12.5px';
    const kv = (label, value) => value ? `<div><div style="color:#64748b;font-size:12px">${label}</div><b>${esc(value)}</b></div>` : '';
    const grid = items => `<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 18px;margin-bottom:12px">${items.join('')}</div>`;
    const title = t => `<div style="font-weight:700;color:#1e3a8a;margin:12px 0 10px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;display:flex;align-items:center;gap:8px">${t}</div>`;

    // Hiển thị danh mục tài sản bảo đảm chuẩn SRS (phân loại theo nhóm, không hiển thị cột Mô tả thừa ở phương tiện)
    function renderAssetsHtml(assets) {
        if (!assets || !assets.length) return '<div style="color:#64748b;font-style:italic;padding:10px 0">Không có thông tin tài sản bảo đảm.</div>';

        // Nhóm các tài sản theo nhóm danh mục chuẩn SRS để không bị lặp tiêu đề nhóm
        const groups = [];
        const groupMap = {};

        assets.forEach(a => {
            let cat = 'other';
            let titleText = a.groupTitle || a.assetType || 'Tài sản bảo đảm khác';

            if (a.type === 'road' || a.frames || a.assetType === 'Phương tiện giao thông' || (titleText && titleText.includes('cơ giới đường bộ'))) {
                cat = 'road';
                titleText = a.groupTitle || 'Phương tiện giao thông cơ giới đường bộ, xe máy chuyên dùng CÓ số khung (ô tô, mô tô, xe gắn máy...)';
            } else if (a.type === 'vehicle' || (titleText && (titleText.includes('tàu cá') || titleText.includes('đường thủy') || titleText.includes('đường sắt')))) {
                cat = 'vehicle';
                titleText = a.groupTitle || 'Tài sản bảo đảm là tàu cá; phương tiện giao thông đường thủy nội địa; phương tiện giao thông đường sắt, đường thủy, đường sắt';
            } else if (a.type === 'rights' || a.assetType === 'Quyền tài sản' || (titleText && titleText.includes('quyền tài sản'))) {
                cat = 'rights';
                titleText = a.groupTitle || 'Tài sản bảo đảm là quyền tài sản hoặc một phần quyền tài sản';
            }

            const groupKey = cat + '::' + titleText;
            if (!groupMap[groupKey]) {
                groupMap[groupKey] = {
                    cat,
                    titleText,
                    subTitle: a.subTitle || (cat === 'road' ? 'Số khung' : (cat === 'vehicle' ? 'Phương tiện' : '')),
                    items: []
                };
                groups.push(groupMap[groupKey]);
            }

            if (cat === 'road') {
                const subItems = a.items || a.frames || [a];
                subItems.forEach(it => {
                    if (it.frameNo || it.vehicleName || it.brandColor || it.name) {
                        groupMap[groupKey].items.push(it);
                    }
                });
            } else if (cat === 'vehicle') {
                const subItems = a.items || [a];
                subItems.forEach(it => {
                    if (it.regNo || it.registrationNo || it.vehicleName || it.name || it.owner) {
                        groupMap[groupKey].items.push(it);
                    }
                });
            } else {
                groupMap[groupKey].items.push(a);
            }
        });

        return groups.map(g => {
            if (g.cat === 'road') {
                return `
                    <div style="border:1px solid #e2e8f0;border-radius:8px;background:#fff;overflow:hidden;margin-bottom:14px">
                        <div style="background:#f8fafc;padding:11px 16px;font-weight:700;color:#1e3a8a;border-bottom:1px solid #e2e8f0;font-size:13.5px">${esc(g.titleText)}</div>
                        <div style="padding:14px 16px">
                            <div style="font-weight:700;color:#1e3a8a;margin-bottom:8px;font-size:13px">${esc(g.subTitle || 'Số khung')}</div>
                            <div style="overflow-x:auto">
                                <table style="width:100%;border-collapse:collapse;font-size:12.5px">
                                    <thead>
                                        <tr style="background:#f1f5f9">
                                            <th style="${th};width:50px;text-align:center">STT</th>
                                            <th style="${th}">TÊN PHƯƠNG TIỆN</th>
                                            <th style="${th}">NHÃN HIỆU, MÀU SƠN</th>
                                            <th style="${th}">SỐ KHUNG</th>
                                            <th style="${th}">SỐ MÁY</th>
                                            <th style="${th}">BIỂN SỐ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${g.items.map((it, idx) => `
                                            <tr>
                                                <td style="${td};text-align:center">${idx + 1}</td>
                                                <td style="${td}">${esc(it.vehicleName || it.name || '')}</td>
                                                <td style="${td}">${esc(it.brandColor || '')}</td>
                                                <td style="${td}"><code>${esc(it.frameNo || '')}</code></td>
                                                <td style="${td}"><code>${esc(it.engineNo || '-')}</code></td>
                                                <td style="${td}">${esc(it.plateNo || '-')}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            } else if (g.cat === 'vehicle') {
                return `
                    <div style="border:1px solid #e2e8f0;border-radius:8px;background:#fff;overflow:hidden;margin-bottom:14px">
                        <div style="background:#f8fafc;padding:11px 16px;font-weight:700;color:#1e3a8a;border-bottom:1px solid #e2e8f0;font-size:13.5px">${esc(g.titleText)}</div>
                        <div style="padding:14px 16px">
                            <div style="font-weight:700;color:#1e3a8a;margin-bottom:8px;font-size:13px">${esc(g.subTitle || 'Phương tiện')}</div>
                            <div style="overflow-x:auto">
                                <table style="width:100%;border-collapse:collapse;font-size:12.5px">
                                    <thead>
                                        <tr style="background:#f1f5f9">
                                            <th style="${th};width:50px;text-align:center">STT</th>
                                            <th style="${th}">TÊN PHƯƠNG TIỆN, NHÃN HIỆU</th>
                                            <th style="${th}">TÊN/HỌ TÊN CHỦ PHƯƠNG TIỆN/CHỦ SỞ HỮU</th>
                                            <th style="${th}">SỐ ĐĂNG KÝ</th>
                                            <th style="${th}">CƠ QUAN CẤP GIẤY CHỨNG NHẬN</th>
                                            <th style="${th}">CẤP PHƯƠNG TIỆN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${g.items.map((it, idx) => `
                                            <tr>
                                                <td style="${td};text-align:center">${idx + 1}</td>
                                                <td style="${td}">${esc(it.vehicleName || it.name || '')}${it.subInfo ? `<br><span style="color:#64748b;font-size:12px">${esc(it.subInfo)}</span>` : ''}</td>
                                                <td style="${td}">${esc(it.owner || it.ownerName || '-')}</td>
                                                <td style="${td}">${esc(it.regNo || it.registrationNo || '-')}</td>
                                                <td style="${td}">${esc(it.issuer || it.certificateAgency || '-')}</td>
                                                <td style="${td}">${esc(it.grade || it.vehicleLevel || '-')}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            } else if (g.cat === 'rights') {
                return `
                    <div style="border:1px solid #e2e8f0;border-radius:8px;background:#fff;overflow:hidden;margin-bottom:14px">
                        <div style="background:#f8fafc;padding:11px 16px;font-weight:700;color:#1e3a8a;border-bottom:1px solid #e2e8f0;font-size:13.5px">${esc(g.titleText)}</div>
                        <div style="padding:14px 16px;display:flex;flex-direction:column;gap:10px">
                            ${g.items.map(it => {
                                const name = it.rightName || it.name || it.description || '';
                                const basis = it.rightBasis || it.basis || '';
                                return `
                                    <div style="border:1px solid #e2e8f0;border-radius:6px;padding:14px 16px;background:#f8fafc">
                                        <div style="font-weight:700;color:#0f172a;margin-bottom:4px;font-size:13.5px">${esc(name)}</div>
                                        ${basis ? `<div style="color:#475569;font-size:13px;line-height:1.5">${esc(basis)}</div>` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div style="border:1px solid #e2e8f0;border-radius:8px;background:#fff;overflow:hidden;margin-bottom:14px">
                        <div style="background:#f8fafc;padding:11px 16px;font-weight:700;color:#1e3a8a;border-bottom:1px solid #e2e8f0;font-size:13.5px">${esc(g.titleText)}</div>
                        <div style="padding:14px 16px;display:flex;flex-direction:column;gap:10px">
                            ${g.items.map(it => `
                                <div style="border:1px solid #e2e8f0;border-radius:6px;padding:14px 16px;background:#f8fafc">
                                    <div style="font-weight:700;color:#0f172a;margin-bottom:4px">${esc(it.name || it.description || '')}</div>
                                    <div style="color:#475569;font-size:13px">${esc(it.basis || it.rightBasis || '')}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }).join('');
    }

    // Khối Kết quả tra cứu hồ sơ gốc (SRS 4.3.2.5.3)
    function renderStructure(regNo) {
        const rec = lookup(regNo);
        if (!rec) return `<div style="padding:14px;border:1px solid #fecaca;background:#fef2f2;color:#991b1b;border-radius:6px">Không tìm thấy hồ sơ gốc theo Số đăng ký ${esc(regNo)}.</div>`;
        return renderRecord(regNo, rec);
    }

    // Hiển thị 01 hồ sơ theo Cấu trúc chi tiết danh sách hồ sơ đăng ký giao dịch bảo đảm / hợp đồng (dùng chung cho Kết quả tra cứu CCTT)
    // opts.index: số thứ tự hồ sơ trong danh sách kết quả (hiển thị "Hồ sơ [n]" + Trường hợp đăng ký trên dòng tiêu đề)
    function renderRecord(regNo, rec, opts = {}) {
        return `
            <div style="${box}">
                <div style="background:#eff6ff;padding:9px 14px;font-weight:700;color:#1e3a8a;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    ${opts.index ? `<span class="record-index" style="background:#1e3a8a;color:#fff;border-radius:4px;padding:2px 9px;font-size:12.5px">Hồ sơ ${opts.index}</span>` : ''}
                    <span>Đăng ký giao dịch bảo đảm / Hợp đồng - ${esc(regNo)}</span>
                    ${opts.index ? `<span style="margin-left:auto;background:#fff;border:1px solid #bfdbfe;border-radius:4px;padding:2px 9px;font-size:12.5px;text-transform:uppercase">${esc(rec.caseName)}</span>` : ''}
                </div>
                <div style="padding:12px 14px;font-size:13.5px">
                    ${grid([kv('Loại hình giao dịch', rec.transactionType), kv('Loại biện pháp', rec.measure), kv('Loại hợp đồng', rec.contractType), `<div><div style="color:#64748b;font-size:12px">Trường hợp đăng ký</div><b style="text-transform:uppercase">${esc(rec.caseName)}</b></div>`, kv('Trạng thái', rec.status), kv('Số hợp đồng', rec.contractNo), kv('Ngày có hiệu lực của hợp đồng', rec.contractDate)])}
                    ${title('Thông tin đăng ký')}
                    ${grid([kv('Số đăng ký', regNo), kv('Thời điểm đăng ký', rec.registeredAt), kv('Thời điểm có hiệu lực', rec.effectiveAt)])}
                    ${title('Bên bảo đảm')}
                    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:12px"><thead><tr><th style="${th}">STT</th><th style="${th}">Loại chủ thể</th><th style="${th}">Số giấy tờ chứng minh tư cách pháp lý</th><th style="${th}">Tên</th><th style="${th}">Địa chỉ</th></tr></thead>
                    <tbody>${rec.grantors.map((g, i) => `<tr><td style="${td}">${i + 1}</td><td style="${td}">${esc(g.subjectType)}</td><td style="${td}">${esc(g.idNo)}</td><td style="${td}"><b>${esc(g.name)}</b></td><td style="${td}">${esc(g.address)}</td></tr>`).join('')}</tbody></table>
                    ${title('Bên nhận bảo đảm')}
                    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:12px"><thead><tr><th style="${th}">STT</th><th style="${th}">Tên</th><th style="${th}">Địa chỉ</th></tr></thead>
                    <tbody>${rec.securedParties.map((s, i) => `<tr><td style="${td}">${i + 1}</td><td style="${td}"><b>${esc(s.name)}</b></td><td style="${td}">${esc(s.address)}</td></tr>`).join('')}</tbody></table>
                    ${title('<i class="fa-solid fa-car"></i> Tài sản bảo đảm')}
                    ${renderAssetsHtml(rec.assets)}
                </div>
            </div>`;
    }

    // PDF dự thảo Bản sao điện tử (Quy tắc 4.3.2.18.6)
    function buildDraftSheet(item, leaderTitle) {
        const rec = lookup(item.registrationNo);
        if (!rec) return '';
        const grantors = rec.grantors.map(g => `${esc(g.name)} (${esc(g.idNo)}; Địa chỉ: ${esc(g.address)})`).join('<br>');
        const secured = rec.securedParties.map(s => `${esc(s.name)} (${esc(s.idNo)}; Địa chỉ: ${esc(s.address)})`).join('<br>');
        const assets = rec.assets.map((a, i) => {
            if (a.type === 'road') {
                return `${i + 1}. ${esc(a.groupTitle)}: ${a.items.map(f => `${esc(f.vehicleName)} ${esc(f.brandColor)}, số khung ${esc(f.frameNo)}, số máy ${esc(f.engineNo)}, biển số ${esc(f.plateNo)}`).join('; ')}`;
            }
            if (a.type === 'vehicle') {
                return `${i + 1}. ${esc(a.groupTitle)}: ${a.items.map(f => `${esc(f.vehicleName)} (${esc(f.subInfo || '')}), chủ sở hữu ${esc(f.owner)}, số ĐK ${esc(f.regNo)}`).join('; ')}`;
            }
            return `${i + 1}. ${esc(a.groupTitle || a.assetType || '')}: ${esc(a.name || a.description || '')}${a.basis ? ' - ' + esc(a.basis) : ''}`;
        }).join('<br>');
        const row = (l, v) => `<tr><td style="width:190px;vertical-align:top;padding:3px 0">• ${l}</td><td style="padding:3px 0"><b>${v}</b></td></tr>`;
        return `
            <div style="position:relative;background:#fff;padding:36px 42px;font-family:'Times New Roman',serif;font-size:14px;line-height:1.5;color:#111">
                <div style="position:absolute;top:40%;left:14%;transform:rotate(-32deg);font-size:72px;font-weight:900;color:rgba(220,38,38,.1);letter-spacing:10px;pointer-events:none">DỰ THẢO</div>
                <div style="text-align:center">
                    <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><i>Độc lập - Tự do - Hạnh phúc</i>
                    <div style="width:160px;height:1px;background:#333;margin:4px auto 12px"></div>
                    <div style="font-size:12.5px">CỤC ĐĂNG KÝ QUỐC GIA GIAO DỊCH BẢO ĐẢM</div>
                    <b style="color:#1e3a8a">${esc(base.agency.toUpperCase())}</b>
                    <div style="font-size:18px;font-weight:900;margin:10px 0 4px">BẢN SAO ĐIỆN TỬ</div>
                    <b>${esc(rec.pdfTitle)}</b><br><i style="font-size:13px">Trích xuất từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm</i>
                </div>
                <p style="margin:14px 0 4px"><b>1. THÔNG TIN YÊU CẦU CẤP BẢN SAO</b></p>
                <table style="width:100%">${row('Mã hồ sơ yêu cầu:', esc(item.id))}${row('Thời điểm tiếp nhận:', esc(item.registeredAt))}${row('Người yêu cầu cấp bản sao:', esc(item.requester))}</table>
                <p style="margin:12px 0 4px"><b>2. NỘI DUNG VĂN BẢN CHỨNG NHẬN CỦA HỒ SƠ GỐC</b></p>
                <table style="width:100%">${row('Số đăng ký hồ sơ gốc:', esc(item.registrationNo))}${row('Thời điểm đăng ký:', esc(rec.registeredAt))}${row('Bên bảo đảm:', grantors)}${row('Bên nhận bảo đảm:', secured)}${row('Tài sản bảo đảm:', assets)}${row('Hợp đồng bảo đảm:', `Số ${esc(rec.contractNo)}, ký ngày ${esc(rec.contractDate)}`)}</table>
                <p style="margin:12px 0 4px"><b>3. VÙNG KÝ SAO ĐIỆN TỬ CỦA CƠ QUAN ĐĂNG KÝ</b></p>
                <p style="font-style:italic">"Xác nhận bản sao điện tử được trích xuất đúng từ Cơ sở dữ liệu quốc gia về biện pháp bảo đảm đối với hồ sơ đăng ký số ${esc(item.registrationNo)}, đăng ký lúc ${esc(rec.registeredAt)} tại ${esc(rec.agency)}."</p>
                <div style="display:flex;justify-content:flex-end"><div style="text-align:center;width:300px">
                    <i>Hà Nội, ngày ... tháng ... năm ......</i><br><b>${esc(leaderTitle || 'GIÁM ĐỐC / PHÓ GIÁM ĐỐC')}</b>
                    <div style="margin-top:12px;padding:20px;border:1px dashed #94a3b8;color:#64748b;font-style:italic;font-size:12.5px">[KHUNG CHỜ CHỮ KÝ SỐ VÀ DẤU ĐIỆN TỬ]</div>
                </div></div>
            </div>`;
    }

    const leaderSelect = id => `<select class="pdk-select" id="${id}"><option value="">-- Chọn Lãnh đạo --</option>${LEADERS.map(l => `<option value="${esc(l)}">${esc(l)}</option>`).join('')}</select>`;
    const now = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; };
    const qtyText = item => `${String(item.quantity || 1).padStart(2, '0')} bản`;

    function open(html, width) {
        const ov = PdkPopups.ensureOverlay();
        ov.innerHTML = html;
        const bx = ov.querySelector('.pdk-box');
        if (bx && width) bx.style.width = `min(${width}px, 96vw)`;
        ov.classList.add('show');
        return ov;
    }

    function requireLeader(selId, errId) {
        const sel = document.getElementById(selId);
        const ok = !!sel.value;
        sel.classList.toggle('pdk-invalid', !ok);
        document.getElementById(errId).classList.toggle('show', !ok);
        if (!ok) sel.focus();
        return ok;
    }

    // MH03a / MH03b - Popup Trình ký (phân biệt theo Loại cung cấp bản sao)
    function openSign(item, onDone) {
        if (item.copyType === 'Bản sao giấy') {
            const ov = open(`
                <div class="pdk-box">
                    <div class="pdk-head"><h3>Trình ký yêu cầu cung cấp bản sao giấy: ${esc(item.id)}</h3><button class="pdk-close" data-act="cancel">&times;</button></div>
                    <div class="pdk-body">
                        <div class="pdk-info">
                            <div><span>Mã hồ sơ</span><b>${esc(item.id)}</b></div>
                            <div><span>Số đăng ký hồ sơ gốc</span><b>${esc(item.registrationNo)}</b></div>
                            <div><span>Người yêu cầu</span><b>${esc(item.requester)}</b></div>
                            <div><span>Số lượng bản sao</span><b>${qtyText(item)}</b></div>
                        </div>
                        <div class="pdk-field"><label>Lãnh đạo ký duyệt <span class="req">*</span></label>${leaderSelect('bs-sg-leader')}<div class="pdk-err" id="bs-sg-leader-err">Đây là trường bắt buộc</div></div>
                    </div>
                    <div class="pdk-foot"><button class="pdk-btn" data-act="cancel">Hủy</button><button class="pdk-btn primary" data-act="confirm"><i class="fa-solid fa-paper-plane"></i> Xác nhận trình ký</button></div>
                </div>`, 650);
            ov.onclick = e => {
                const act = e.target.closest('[data-act]')?.dataset.act;
                if (act === 'cancel') PdkPopups.close();
                if (act === 'confirm' && requireLeader('bs-sg-leader', 'bs-sg-leader-err')) {
                    Object.assign(item, { status: 'Chờ ký', assignedLeader: document.getElementById('bs-sg-leader').value, submittedBy: 'Nguyễn Văn Cán Bộ', submittedAt: now() });
                    PdkPopups.close();
                    onDone(item, 'Trình yêu cầu cung cấp bản sao thành công.'); // [MSG-SUC-BS-002]
                }
            };
            return;
        }
        let zoom = 1;
        const ov = open(`
            <div class="pdk-box">
                <div class="pdk-head"><h3>Trình ký yêu cầu cung cấp bản sao điện tử: ${esc(item.id)}</h3><button class="pdk-close" data-act="cancel">&times;</button></div>
                <div class="pdk-body" style="padding:24px">
                    <div style="font-weight:700;color:#1e3a8a;margin-bottom:8px">I. THÔNG TIN TRÌNH KÝ</div>
                    <div class="pdk-info">
                        <div><span>Mã hồ sơ</span><b>${esc(item.id)}</b></div>
                        <div><span>Số đăng ký hồ sơ gốc</span><b>${esc(item.registrationNo)}</b></div>
                        <div style="grid-column:1/-1"><span>Người yêu cầu</span><b>${esc(item.requester)}</b></div>
                    </div>
                    <div class="pdk-field"><label>Lãnh đạo ký <span class="req">*</span></label>${leaderSelect('bs-se-leader')}<div class="pdk-err" id="bs-se-leader-err">Đây là trường bắt buộc</div></div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin:6px 0">
                        <div style="font-weight:700;color:#1e3a8a">II. KHỐI DỰ THẢO BẢN SAO ĐIỆN TỬ</div>
                        <div style="display:flex;gap:6px;align-items:center">
                            <button class="pdk-btn" data-act="zoom-out" title="Thu nhỏ">−</button><span id="bs-zoom-label" style="font-size:12px;min-width:40px;text-align:center">100%</span><button class="pdk-btn" data-act="zoom-in" title="Phóng to">+</button>
                            <button class="pdk-btn link" data-act="view"><i class="fa-solid fa-arrow-up-right-from-square"></i> Xem file</button>
                            <button class="pdk-btn link" data-act="download"><i class="fa-solid fa-download"></i> Tải tệp</button>
                        </div>
                    </div>
                    <div style="max-height:55vh;overflow:auto;border:1px solid #e2e8f0;border-radius:6px;background:#e2e8f0;padding:12px"><div id="bs-draft-sheet">${buildDraftSheet(item)}</div></div>
                </div>
                <div class="pdk-foot"><button class="pdk-btn" data-act="cancel">Hủy</button><button class="pdk-btn primary" data-act="confirm"><i class="fa-solid fa-paper-plane"></i> Xác nhận trình ký</button></div>
            </div>`, 800);
        ov.onclick = e => {
            const act = e.target.closest('[data-act]')?.dataset.act;
            if (!act) return;
            if (act === 'cancel') PdkPopups.close(); // không lưu file PDF dự thảo vừa sinh
            if (act === 'zoom-in' || act === 'zoom-out') {
                zoom = Math.min(1.6, Math.max(0.6, +(zoom + (act === 'zoom-in' ? 0.1 : -0.1)).toFixed(1)));
                document.getElementById('bs-draft-sheet').style.zoom = zoom;
                document.getElementById('bs-zoom-label').textContent = Math.round(zoom * 100) + '%';
            }
            if (act === 'view') {
                const tab = window.open('', '_blank');
                if (tab) { tab.document.title = `Du_thao_Ban_sao_dien_tu_${item.id}.pdf`; tab.document.body.style.cssText = 'background:#e2e8f0;padding:20px'; tab.document.body.innerHTML = `<div style="max-width:850px;margin:0 auto">${buildDraftSheet(item)}</div>`; }
            }
            if (act === 'download') PdkPopups.toast(`Đang tải xuống file PDF dự thảo: Du_thao_Ban_sao_dien_tu_${esc(item.id)}.pdf`, 'info');
            if (act === 'confirm' && requireLeader('bs-se-leader', 'bs-se-leader-err')) {
                Object.assign(item, { status: 'Chờ ký', assignedLeader: document.getElementById('bs-se-leader').value, submittedBy: 'Nguyễn Văn Cán Bộ', submittedAt: now(), draftFile: `Du_thao_Ban_sao_dien_tu_${item.id}.pdf`, draftLocked: true });
                PdkPopups.close();
                onDone(item, 'Trình yêu cầu cung cấp bản sao thành công.'); // [MSG-SUC-BS-002]
            }
        };
    }

    // MH04 - Popup Từ chối yêu cầu cung cấp bản sao (không hiển thị thêm bước xác nhận)
    function openReject(item, onDone, opts = {}) {
        const ov = open(`
            <div class="pdk-box">
                <div class="pdk-head"><h3>Từ chối yêu cầu cung cấp bản sao: ${esc(item.id)}</h3><button class="pdk-close" data-act="cancel">&times;</button></div>
                <div class="pdk-body">
                    <div class="pdk-info"><div><span>Mã hồ sơ</span><b>${esc(item.id)}</b></div><div><span>Người yêu cầu</span><b>${esc(item.requester)}</b></div></div>
                    <div class="pdk-field"><label>Lý do từ chối <span class="req">*</span></label><textarea class="pdk-textarea" id="bs-rj-reason" rows="4" maxlength="1000" placeholder="Nhập lý do từ chối..."></textarea><div class="pdk-err" id="bs-rj-reason-err">Đây là trường bắt buộc</div></div>
                </div>
                <div class="pdk-foot"><button class="pdk-btn" data-act="cancel">Hủy</button><button class="pdk-btn danger" data-act="confirm"><i class="fa-solid fa-ban"></i> Xác nhận từ chối</button></div>
            </div>`, 620);
        ov.onclick = e => {
            const act = e.target.closest('[data-act]')?.dataset.act;
            if (act === 'cancel') PdkPopups.close();
            if (act !== 'confirm') return;
            const el = document.getElementById('bs-rj-reason');
            el.value = el.value.trim();
            if (!el.value) { el.classList.add('pdk-invalid'); document.getElementById('bs-rj-reason-err').classList.add('show'); el.focus(); return; }
            if (!(opts.allowed || ['Chờ duyệt']).includes(item.status)) {
                PdkPopups.toast('Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.', 'error'); // [MSG-ERR-BS-002]
                return;
            }
            Object.assign(item, { status: 'Bị từ chối', rejectReason: el.value, rejectedBy: 'Nguyễn Văn Cán Bộ', rejectedAt: now(), refundRequested: true });
            PdkPopups.close();
            onDone(item, 'Từ chối yêu cầu cung cấp bản sao thành công.'); // [MSG-SUC-BS-004]
        };
    }

    // Popup xác nhận trả kết quả bản sao giấy [MSG-CFM-BS-005]
    function openConfirmReturn(item, onDone) {
        const ov = open(`
            <div class="pdk-box">
                <div class="pdk-head"><h3>Xác nhận trả kết quả</h3><button class="pdk-close" data-act="no">&times;</button></div>
                <div class="pdk-body"><p style="margin:0">Xác nhận đã trả kết quả bản sao giấy cho Khách hàng?</p><p style="color:#64748b;margin:6px 0 0">Hồ sơ: <b>${esc(item.id)}</b></p></div>
                <div class="pdk-foot"><button class="pdk-btn" data-act="no">Không</button><button class="pdk-btn primary" data-act="yes">Có</button></div>
            </div>`, 480);
        ov.onclick = e => {
            const act = e.target.closest('[data-act]')?.dataset.act;
            if (act === 'no') PdkPopups.close();
            if (act === 'yes') {
                Object.assign(item, { status: 'Hoàn thành', returnedBy: 'Nguyễn Văn Cán Bộ', returnedResultAt: now() });
                PdkPopups.close();
                onDone(item, 'Xác nhận trả kết quả bản sao giấy thành công.'); // [MSG-SUC-BS-006]
            }
        };
    }

    window.BsPopups = { lookup, renderStructure, renderRecord, buildDraftSheet, openSign, openReject, openConfirmReturn };
})();
