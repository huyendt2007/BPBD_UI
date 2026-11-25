/*
 * Xem xét trách nhiệm hoàn trả - Vụ việc tại Tòa án (SRS 23/11/2026, neo ht-nguon-toa-an, ht-noi-thu-ly; QDDA_040).
 * - Mỗi dòng vụ việc tại Tòa án (Theo dõi vụ việc tại Tòa án) "Đã có bản án/QĐ" có bản ghi Chi trả tiền bồi thường "Hoàn thành"
 *   hoặc "Trả lại ngân sách nhà nước" một phần là 01 vụ việc tại Tòa án, có tối đa 01 hồ sơ hoàn trả; nhiều dòng có thể cùng Mã vụ việc.
 * - Phạm vi dữ liệu: Cơ quan bị khởi kiện của dòng là đơn vị gốc của người dùng (giả lập: đơn vị của thanh giả lập Hoàn trả).
 * - Dữ liệu mẫu (giả): 02 dòng vụ việc tại Tòa án cùng Mã vụ việc VVBT-2026-951, Cơ quan bị khởi kiện UBND phường Việt Hưng:
 *   + TA-VVBT-2026-951: chi trả Hoàn thành, đã có hồ sơ hoàn trả HT-2026-049 (Họp hội đồng) - hiện ở MH01;
 *   + TA-VVBT-2026-951-2: chi trả Trả lại ngân sách nhà nước một phần, chưa có hồ sơ hoàn trả - chọn được ở MH02.
 * - Dùng chung: xem_xet_trach_nhiem_hoan_tra.html, chi_tiet_ho_so_hoan_tra.html (nạp sau ht_du_lieu_mau.js),
 *   theo_doi_vu_viec_toa_an.html (chỉ hàm banGhiToaAn: mở chi tiết dòng mẫu theo tham số ?id=).
 */
(function () {
    'use strict';
    var TOA = 'Thụ lý tại Tòa án', CQ = 'Thụ lý tại CQGQBT';
    var U_CHU = 'UBND phường Việt Hưng';
    var VV = 'VVBT-2026-951';
    // Lĩnh vực phát sinh thiệt hại của dòng vụ việc tại Tòa án (giá trị ô chọn) -> tên theo DM_22
    var LINH_VUC = {
        'hành chính': 'Trong hoạt động quản lý hành chính', 'hình sự': 'Trong hoạt động tố tụng hình sự', 'dân sự': 'Trong hoạt động tố tụng dân sự',
        'tố tụng hành chính': 'Trong hoạt động tố tụng hành chính', 'thi hành án hình sự': 'Trong hoạt động thi hành án hình sự', 'thi hành án dân sự': 'Trong hoạt động thi hành án dân sự'
    };
    var NYC = {
        name: 'Hoàng Thị Mai Anh', role: 'Người bị thiệt hại', gender: 'Nữ', birth: '12/06/1983', victimAlive: 'yes', phone: '', email: '',
        cardType: 'CMND/CCCD/Chứng minh quân đội', cardNo: '001183005927', cardDate: '15/04/2021', cardPlace: 'Cục Cảnh sát QLHC về trật tự xã hội',
        country: 'Việt Nam', city: 'Hà Nội', ward: '00127 - Phường Việt Hưng', address: 'Số 27 ngõ 9 phố Việt Hưng'
    };
    var VB_CAN_CU = [{ name: 'Quyết định số 35/QĐ-UBND ngày 12/12/2025 của UBND phường Việt Hưng về việc hủy Quyết định cưỡng chế số 118/QĐ-UBND', file: '' }];
    function ban(id, o) {
        return Object.assign({
            id: id, code: VV, noiThuLy: TOA, requestKind: 'money', originalKind: 'money', linkedCode: null, hoSoCode: '',
            rootUnitId: 'UBND-VH', agency: U_CHU, status: 'Đã có bản án/QĐ', fieldGroup: 'hành chính',
            nyc: Object.assign({}, NYC), nbth: null, honorForms: null,
            nhanQua: 'Thiệt hại phát sinh trực tiếp từ hành vi trái pháp luật của người thi hành công vụ.',
            vanBanCanCu: VB_CAN_CU.map(function (x) { return Object.assign({}, x); }),
            createdBy: 'cv_vh1', createdByName: 'Phan Thị Hằng'
        }, o);
    }
    // Dòng vụ việc tại Tòa án (định dạng của Theo dõi vụ việc tại Tòa án) kèm bản ghi Chi trả tiền bồi thường tạo từ dòng (quy tắc 9)
    var LINES = [
        {
            court: ban('TA-VVBT-2026-951', {
                verdictSource: 'Khởi kiện yêu cầu bồi thường theo thủ tục tố tụng dân sự (Khoản 1 Điều 52)',
                lawsuitCase: 'Khởi kiện thẳng ra Tòa án, chưa từng yêu cầu cơ quan giải quyết (điểm a khoản 1 Điều 52)',
                acceptDate: '05/03/2026', verdictNo: '12/2026/DS-ST', effectiveDate: '14/08/2026',
                hanhVi: 'Ra quyết định cưỡng chế tháo dỡ công trình phụ khi chưa giao quyết định cưỡng chế cho người có tài sản.',
                damages: [{ key: 'taiSan', label: '1. Tài sản bị xâm phạm', calc: 'Giá trị công trình phụ bị tháo dỡ theo chứng thư thẩm định giá', amount: 92000000 }],
                docs: [{ name: 'Bản án dân sự sơ thẩm có hiệu lực', file: 'Ban_an_12_2026_DS_ST.pdf' }],
                createdAt: '09:20 07/03/2026',
                history: [{ at: '09:20 07/03/2026', userName: 'Phan Thị Hằng', action: 'Thêm mới vụ việc', note: 'Trạng thái: Đã thụ lý.' },
                    { at: '15:10 18/08/2026', userName: 'Phan Thị Hằng', action: 'Cập nhật vụ việc', note: 'Chuyển trạng thái: Đang giải quyết → Đã có bản án/QĐ.' }]
            }),
            chiTra: { code: 'KP-2026-151', status: 'Hoàn thành', soTienQd: 92000000, daChi: 92000000, ngayHoanTat: '10/09/2026' }
        },
        {
            court: ban('TA-VVBT-2026-951-2', {
                verdictSource: 'Khởi kiện theo thủ tục tố tụng dân sự sau khi giải quyết tại cơ quan trực tiếp quản lý người thi hành công vụ gây thiệt hại (Khoản 2 Điều 52)',
                lawsuitCase: 'Đã yêu cầu cơ quan giải quyết trước khi khởi kiện (điểm b khoản 1 và khoản 2 Điều 52)',
                // [hta2] Vụ việc liên kết (quy tắc 15 Theo dõi vụ việc tại Tòa án): lưu Mã hồ sơ, Cơ quan giải quyết tại thời điểm chọn
                linkedCode: VV, hoSoCode: 'BT-2026-047', linkedAgency: U_CHU,
                acceptDate: '20/04/2026', verdictNo: '20/2026/DS-ST', effectiveDate: '22/09/2026',
                hanhVi: 'Thu giữ máy móc phục vụ kinh doanh quá thời hạn tạm giữ trong cùng đợt cưỡng chế.',
                damages: [{ key: 'thuNhap', label: '2. Thu nhập thực tế bị mất/giảm sút', calc: 'Thu nhập bị mất 06 tháng x 8.000.000 đồng', amount: 48000000 }],
                docs: [{ name: 'Bản án dân sự sơ thẩm có hiệu lực', file: 'Ban_an_20_2026_DS_ST.pdf' }],
                createdAt: '10:05 22/04/2026',
                history: [{ at: '10:05 22/04/2026', userName: 'Phan Thị Hằng', action: 'Thêm mới vụ việc', note: 'Trạng thái: Đã thụ lý.' },
                    { at: '16:30 25/09/2026', userName: 'Phan Thị Hằng', action: 'Cập nhật vụ việc', note: 'Chuyển trạng thái: Đang giải quyết → Đã có bản án/QĐ.' }]
            }),
            // Trả lại ngân sách nhà nước một phần: Số tiền làm căn cứ = Số tiền đã chi thực tế; Ngày hoàn tất chi trả = Ngày trả lại ngân sách nhà nước
            chiTra: { code: 'KP-2026-158', status: 'Trả lại ngân sách nhà nước', motPhan: true, soTienQd: 48000000, daChi: 36000000, traLai: 12000000, ngayHoanTat: '30/10/2026' }
        }
    ];
    function clone(o) { return JSON.parse(JSON.stringify(o)); }
    function line(id) { return LINES.find(function (l) { return l.court.id === id; }) || null; }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

    var H = window.HT_TOA_AN = {
        TOA: TOA, CQ: CQ, VV: VV, LINES: LINES,
        line: line,
        linhVuc: function (fg) { return LINH_VUC[fg] || fg || ''; },
        // Nơi thụ lý của hồ sơ hoàn trả: hệ thống lưu khi khởi tạo; hồ sơ cũ chưa có -> Thụ lý tại CQGQBT
        noiThuLy: function (d) { return d && (d.noiThuLy === TOA || d.courtCaseId) ? TOA : CQ; },
        laToaAn: function (d) { return H.noiThuLy(d) === TOA; },
        // Badge Nơi thụ lý: dùng chung btnn_noi_thu_ly.js (Tòa án màu tím, CQGQBT màu xanh ngọc) như Tra cứu vụ việc, Kinh phí
        badge: function (v) {
            if (window.BTNN_NTL && typeof BTNN_NTL.badge === 'function') return BTNN_NTL.badge(v);
            var toa = v === TOA;
            return '<span style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;border:1px solid '
                + (toa ? '#ddd6fe;background:#f5f3ff;color:#6d28d9' : '#a5f3fc;background:#ecfeff;color:#0e7490') + ';">' + esc(v) + '</span>';
        },
        // Mở MH03 - Xem chi tiết vụ việc của Theo dõi vụ việc tại Tòa án, đúng dòng; trong khung quản trị thì menu trái chuyển tới Theo dõi vụ việc tại Tòa án
        url: function (id) { return 'theo_doi_vu_viec_toa_an.html?id=' + encodeURIComponent(id); },
        moChiTiet: function (id, ev) {
            if (ev) { ev.preventDefault(); ev.stopPropagation(); }
            var url = H.url(id);
            try {
                if (window.parent && window.parent !== window && typeof window.parent.openAdminModule === 'function') { window.parent.openAdminModule(url, 'theo_doi_vu_viec_toa_an.html'); return false; }
            } catch (e) { /* bỏ qua */ }
            window.location.href = url;
            return false;
        },
        // Liên kết Số bản án/Quyết định (hoặc nhãn), dạng văn bản khi không có quyền xem vụ việc tại Tòa án
        soBanAnHtml: function (id, so, coLink) {
            if (!so) return '-';
            if (!coLink) return '<span style="font-weight:600;">' + esc(so) + '</span>';
            return '<a href="' + esc(H.url(id)) + '" onclick="return HT_TOA_AN.moChiTiet(\'' + esc(id) + '\', event);" style="color:var(--secondary-color); text-decoration:underline; font-weight:700; white-space:nowrap;" title="Mở chi tiết vụ việc tại Tòa án">' + esc(so) + '</a>';
        },
        // Vụ việc tại Tòa án thuộc diện lập hồ sơ (ht-nguon-toa-an): Đã có bản án/QĐ; chi trả Hoàn thành hoặc Trả lại ngân sách nhà nước một phần
        thuocDien: function (l) {
            if (!l || l.court.status !== 'Đã có bản án/QĐ') return false;
            return l.chiTra.status === 'Hoàn thành' || (l.chiTra.status === 'Trả lại ngân sách nhà nước' && l.chiTra.motPhan);
        },
        // Dữ liệu kế thừa khi khởi tạo hồ sơ (MH02 - Khởi tạo hồ sơ, dòng Thụ lý tại Tòa án)
        keThua: function (l) {
            var c = l.court;
            return {
                noiThuLy: TOA, courtCaseId: c.id, maVuViec: c.code, claimCode: '', gqbtQdNo: '',
                verdictNo: c.verdictNo, verdictDate: c.effectiveDate, claimDate: c.effectiveDate,
                claimant: c.nyc.name, claimantName: c.nyc.name, victimName: (c.nbth && c.nbth.name) || c.nyc.name,
                claimField: H.linhVuc(c.fieldGroup), claimAct: c.hanhVi, claimSummary: '',
                agency: c.agency, claimAmt: l.chiTra.daChi, claimPaymentDate: l.chiTra.ngayHoanTat,
                // [hta2] Thông tin riêng của vụ việc tại Tòa án hiển thị ở khối II (SRS 24/11/2026)
                verdictSource: c.verdictSource || '', lawsuitCase: c.lawsuitCase || '', acceptDate: c.acceptDate || '',
                coQuanBiKhoiKien: c.agency, linkedHoSoCode: (c.linkedCode && c.hoSoCode) || '',
                vanBanCanCuToaAn: (c.vanBanCanCu || []).map(function (x) { return x && x.name; }).filter(Boolean)
            };
        },
        // Theo dõi vụ việc tại Tòa án: bản ghi dòng mẫu để mở chi tiết theo ?id= (không lưu vào danh sách)
        banGhiToaAn: function (id) { var l = line(id); return l ? clone(l.court) : null; }
    };

    // ===== Hồ sơ hoàn trả mẫu của dòng TA-VVBT-2026-951 (Họp hội đồng, đã thêm 02 người thi hành công vụ gây thiệt hại) =====
    if (typeof dossiersList === 'undefined') return;
    var l1 = LINES[0];
    var p2 = function (n) { return String(n).padStart(2, '0'); };
    var t = new Date(); t.setDate(t.getDate() - 6);
    var ngayTao = p2(t.getDate()) + '/' + p2(t.getMonth() + 1) + '/' + t.getFullYear();
    var OF = function (name, agency, role, total, method) {
        return { name: name, agency: agency, role: role, loi: 'Vô ý', total: total, paid: 0, nextDate: '—', status: 'Họp hội đồng', refundMethod: method, progressClass: 'info', isPostponed: false };
    };
    var officers = [OF('Trương Văn Khánh', U_CHU, 'Phó Chủ tịch UBND phường', 30000000, 'Nhiều lần'), OF('Đặng Minh Tuấn', 'UBND Phường Bồ Đề', 'Công chức địa chính - xây dựng', 20000000, 'Một lần')];
    var base = Object.assign({
        id: 'HT-2026-049', code: 'HT-2026-049', status: 'Họp hội đồng', dateCreated: ngayTao,
        hdDecision: '81/QĐ-UBND', hdDate: '25/09/2026', hdLoi: '', refundOfficers: officers, payments: [],
        ht2YKienChung: 'Hội đồng đã họp, xem xét hồ sơ và ý kiến của người thi hành công vụ gây thiệt hại; chờ lưu ý kiến của Hội đồng.'
    }, H.keThua(l1));
    if (typeof addMockDossier === 'function') {
        addMockDossier(Object.assign(base, { qdStatus: null, qdNo: '', qdDate: '', qdSigner: '', qdSummary: '', qdFileName: '', conclusionFile: '', timeline: [], refundTotal: 50000000 }));
    } else if (!dossiersList.some(function (d) { return d.id === base.id; })) {
        dossiersList.push(Object.assign(base, {
            officerName: officers.map(function (o) { return o.name; }).join(', '), officerRole: officers.map(function (o) { return o.role; }).join(', '),
            deadlineDate: '', daysLeft: null, refundTotal: 50000000, refundMethod: '', refundMonthly: 0, qdDate: ''
        }));
    }
})();
