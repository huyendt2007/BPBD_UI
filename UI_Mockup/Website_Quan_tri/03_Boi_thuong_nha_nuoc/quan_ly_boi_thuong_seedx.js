/*
 * Dữ liệu mẫu (giả lập) các trạng thái kết thúc - Giải quyết yêu cầu bồi thường (prefix sdx)
 * Mỗi vụ việc có đủ dữ liệu các bước đã qua để màn Xem chi tiết hiển thị đầy đủ (khối các bước, lịch sử xử lý, văn bản đã ban hành):
 * - Từ chối phục hồi danh dự: Chỉ PHDD (BT-2026-401); Cả hai - nhánh tiền Hoàn thành (BT-2026-402); Cả hai - nhánh tiền Thương lượng (BT-2026-403)
 * - Hoàn thành: Chỉ tiền (BT-2026-404); Chỉ PHDD (BT-2026-405); Cả hai (BT-2026-406)
 * - Đình chỉ giải quyết: Ký số có Số/Ngày quyết định, chọn Thu hồi (BT-2026-407); Ký ngoài không Số/Ngày, chọn Không thu hồi (BT-2026-408)
 * - Đã chuyển CQGQBT: thao tác Chuyển CQGQBT sau Cử người (BT-2026-409); Không thụ lý lý do KTL_01 (BT-2026-410)
 * - Không thụ lý: KTL_02 Ký số (BT-2026-411); KTL_05 Ký ngoài (BT-2026-412)
 * Nạp khi tải trang: quan_ly_boi_thuong.html gọi sdxSeedClaims() sau seedNycOrgSampleClaims(); chỉ thêm vụ việc chưa có (theo id / Mã hồ sơ),
 * không ghi đè bản ghi đã có. Ngày mẫu lập theo tháng 10/2026; mở ở tháng khác thì toàn bộ ngày được dời cùng số tháng
 * (Thời điểm tiếp nhận luôn thuộc tháng hiện tại -> qua bộ lọc Ngày tiếp nhận mặc định).
 */
var SDX_BASE = { y: 2026, m: 10 };
var SDX_CB = 'Nguyễn Văn Chuyên Viên';
// Thu hồi kinh phí bồi thường đã chi của vụ việc Đình chỉ mẫu (khoản đã chi: KP-2026-901 / KP-2026-907 - quan_ly_kinh_phi_kpdc.js)
var SDX_DC_THUHOI = {
    'BT-2026-407': { thuHoi: 'Thu hồi', thuHoiReason: '' },
    'BT-2026-408': { thuHoi: 'Không thu hồi', thuHoiReason: 'Người yêu cầu bồi thường đã sử dụng khoản tạm ứng để khắc phục thiệt hại thực tế phát sinh; không có khả năng hoàn trả.' }
};
var SDX_TH = ['Tài sản bị xâm phạm', 'Thu nhập thực tế bị mất/giảm sút', 'Vật chất do người bị thiệt hại chết', 'Vật chất do sức khỏe bị xâm phạm', 'Thiệt hại về tinh thần', 'Các chi phí hợp lý khác'];
// [th2c] Tên thiệt hại: mã mục chi tiết DM_27 (TH_xx_nn) hoặc loại cũ 1..6
function sdxThName(t) { return (window.BTNN_TH && BTNN_TH.codeOf(t) && !/^[1-6]$/.test(String(t))) ? BTNN_TH.name(t) : SDX_TH[t - 1]; }

function sdxMoney(n) { return Number(n || 0).toLocaleString('vi-VN'); }
// Danh sách thiệt hại: [type, đề nghị, xác minh (undefined = chưa xác minh), ghi chú xác minh]
function sdxThiet(rows, xmDate) {
    return rows.map(function (r) {
        var it = { type: r[0], calc: (r[4] || sdxThName(r[0])) + ': ' + sdxMoney(r[1]) + ' đ', val: r[1] };
        if (r[4]) { it.name = r[4]; if (window.BTNN_TH) BTNN_TH.setName(r[0], r[4]); } // [th2c] dòng VII. Các thiệt hại khác: tên tự nhập
        if (r[2] !== undefined) {
            it.xmVal = r[2];
            it.xmNote = r[3] || 'Xác minh đúng thực tế';
            it.xmDate = xmDate;
            it.xmPlace = 'Trụ sở cơ quan giải quyết bồi thường';
            it.xmMembers = 'Tổ xác minh thiệt hại';
            it.xmMethodText = 'Đối chiếu hóa đơn, chứng từ và làm việc trực tiếp với người yêu cầu bồi thường';
            it.xmCalculation = 'Theo giá trị thực tế tại thời điểm xác minh';
        }
        return it;
    });
}
function sdxOfficials(agency) {
    return [{ name: 'Phạm Quốc Hùng', position: 'Trưởng phòng', unit: agency }, { name: SDX_CB, position: 'Chuyên viên', unit: agency }];
}
function sdxAppointed(agency, at) {
    return [{ userId: '', name: SDX_CB, position: 'Chuyên viên', email: 'chuyenvien@btnn.gov.vn', unit: agency, appointedAt: at }];
}
// Kết quả xác minh thiệt hại (cấu trúc như form Cập nhật kết quả xác minh)
function sdxXm(c, xmDate, other) {
    var total = (c.thietHaiList || []).reduce(function (s, it) { return s + (Number(it.xmVal) || 0); }, 0);
    c.xmTotalAmount = total;
    c.xmTimeExtension = 'Không có thỏa thuận kéo dài thời gian xác minh.';
    c.xmOtherRelatedInfo = other || 'Đã đối soát biên bản thiệt hại thực tế giữa cơ quan giải quyết bồi thường và người yêu cầu bồi thường.';
    c.xmFiles = [{ name: 'Bien_ban_xac_minh_thiet_hai_' + c.code + '.pdf', url: '#' }, { name: 'Bao_cao_ket_qua_xac_minh_' + c.code + '.pdf', url: '#' }];
    c.verificationParticipants = sdxOfficials(c.agency);
    c.verifiedItems = (c.thietHaiList || []).map(function (it) { return { key: it.type, label: it.name || sdxThName(it.type), proposed: it.val, verified: it.xmVal, note: it.xmNote || '' }; });
    return c;
}
// Thương lượng thành công theo Mức xác minh (cấu trúc như form Cập nhật kết quả thương lượng)
function sdxNeg(c, date, pay, rights) {
    var nycRow = { name: c.nyc, idNo: c.nycCardNo || c.cardNo || '', address: c.address || '' };
    var bank = pay && pay.bankAccount;
    c.negotiation = {
        participation: 'DONG_Y', decision: 'Đồng ý thương lượng', date: date,
        place: 'Phòng họp - ' + c.agency,
        participants: sdxOfficials(c.agency), claimantParticipants: [nycRow],
        items: c.verifiedItems.map(function (v) { return { key: v.key, label: v.label, proposed: v.proposed, verified: v.verified, agreed: v.verified, status: 'Thành công', reason: '' }; }),
        payment: {
            method: bank ? 'Nhận qua chuyển khoản' : 'Nhận tiền mặt', receiverName: nycRow.name, receiverIdNo: nycRow.idNo, receiverAddress: nycRow.address,
            bankUser: bank ? nycRow.name : '', bankAccount: bank ? pay.bankAccount : '', bankName: bank ? pay.bankName : '', bankBranch: bank ? (pay.bankBranch || '') : ''
        },
        otherRights: rights || '',
        otherRequests: 'Hai bên thống nhất thời hạn chi trả theo Quyết định giải quyết bồi thường.',
        docs: [{ name: 'Biên bản thương lượng', file: 'Bien_ban_thuong_luong_' + c.code + '.pdf' }, { name: 'Giấy mời tham gia thương lượng', file: 'Giay_moi_thuong_luong_' + c.code + '.pdf' }],
        savedAt: date + ' 16:00', savedBy: SDX_CB
    };
    return c;
}
// Quyết định giải quyết bồi thường đã ban hành
function sdxDec(c, no, date, signer, position, content) {
    var amount = c.xmTotalAmount;
    return Object.assign(c, {
        decStatus: 'Hoàn thành', decNo: no, decDate: date, decPublishDate: date, decEffectiveDate: date,
        decSigner: signer, decPosition: position, decAmount: amount,
        decContent: content || ('Bồi thường cho ' + c.nyc + ' số tiền ' + sdxMoney(amount) + ' đồng theo kết quả thương lượng.'),
        decFile: 'QD_GQBT_' + c.code + '_da_ky.pdf'
    });
}
function sdxFund(code, type, amount, date, payoutDate, c, notes) {
    var p = (c.negotiation && c.negotiation.payment) || {};
    return {
        code: code, type: type, amount: amount, approvedAmount: amount, date: date, status: 'Hoàn thành',
        source: 'Ngân sách nhà nước', cqCap: c.agency, payoutDate: payoutDate, payoutAmountReal: amount,
        payoutMethod: p.method || 'Nhận tiền mặt', payoutRecName: c.nyc, payoutBankUser: p.bankAccount ? String(c.nyc).toUpperCase() : '',
        payoutBankAccount: p.bankAccount || '', payoutBankName: p.bankName || '', payoutBankBranch: p.bankBranch || '', notes: notes || ''
    };
}
// Thông báo tổ chức thực hiện phục hồi danh dự (Mẫu số 26/BTNN) đã ban hành
function sdxM26(c, o) {
    var forms = { apology: !!c.phddFormApology, news: !!c.phddFormNews };
    if (!forms.apology && !forms.news) forms.apology = true;
    var vv = c.maVuViec || c.code;
    var file = 'Mau_26_BTNN_Thong_bao_phuc_hoi_danh_du_' + vv + '_da_ky.pdf';
    c.ctvvM26 = {
        state: 'Đã ban hành', method: o.method || 'Ký số', docSrc: 'gen', formNo: 'Mẫu số 26/BTNN',
        docNumber: o.no, docDate: o.date, signedBy: o.signer, signerTitle: o.title,
        forms: forms, agency6: c.agency, time: forms.apology ? (o.time || '') : '', place: forms.apology ? (o.place || '') : '',
        paper: forms.news ? (o.paper || '') : '', portal: false, portalAgency: '',
        noiNhan: ['- ' + (c.nyc ? 'Người bị thiệt hại (' + c.nyc + ');' : 'Như trên;'), '- Lưu: VT, HSVV.'],
        signedFile: file, signedSize: '286 KB', signedFileId: '', attachments: [], issuedAt: o.date, submittedAt: o.submitted || o.date
    };
    Object.assign(c, {
        phddStep1No: o.no, phddStep1Date: o.date, phddStep1Signer: o.signer, phddStep1Position: o.title, phddStep1SendDate: o.send || o.date,
        phddStep1Files: [{ name: file, size: '286 KB', title: 'Thông báo tổ chức thực hiện phục hồi danh dự (đã ký)' }], phddStep1File: file
    });
    return c;
}
// Ý kiến phản hồi của người bị thiệt hại
function sdxReply(c, date, opinion, file) {
    return Object.assign(c, {
        phddStep2ReceiveDate: date, phddStep2Opinion: opinion,
        phddStep2Files: [{ name: file, size: '214 KB', title: opinion === 'Từ chối' ? 'Văn bản từ chối quyền được phục hồi danh dự' : 'Văn bản ý kiến của người bị thiệt hại' }],
        phddStep2File: file
    });
}
// Thông tin chung người yêu cầu / hồ sơ
function sdxBase(o) {
    var c = Object.assign({
        assignedOfficer: SDX_CB, nycType: 'Cá nhân', nycRole: 'Người bị thiệt hại', role: 'Người bị thiệt hại',
        nycCountry: 'Việt Nam', nycTinhThanh: 'Hà Nội', nycCardType: 'CCCD', cardType: 'CCCD', nycCardPlace: 'Cục Cảnh sát QLHC về TTXH',
        nguonHoSo: 'Tiếp nhận mới', hinhThucTiepNhan: 'Trực tiếp', notifyMethod: 'Qua dịch vụ bưu chính',
        applicableLaw: 'Luật Trách nhiệm bồi thường của Nhà nước năm 2017', victimAlive: 'yes',
        advanceNum: 0, slaDays: 0, slaStatus: 'normal', restoreHonor: false, sdxSeed: true
    }, o);
    c.nycCardNo = c.nycCardNo || c.cardNo;
    c.cardNo = c.cardNo || c.nycCardNo;
    c.phone = c.phone || c.nycPhone;
    c.address = c.address || c.nycAddressDetail;
    c.notifyAddress = c.notifyAddress || (c.nycAddressDetail + ', ' + c.nycPhuongXa + ', ' + c.nycTinhThanh);
    c.totalNum = (c.thietHaiList || []).reduce(function (s, it) { return s + (Number(it.val) || 0); }, 0);
    if (c.requestType === 'honor') { c.restoreHonor = true; c.phddStarted = true; }
    if (c.requestType === 'both') { c.restoreHonor = true; c.phddStarted = true; }
    return c;
}
function sdxT(title, date, desc, officer) { return { title: title, date: date, desc: desc, status: 'completed', officer: officer }; }
function sdxP(title, date, desc) { return { title: title, date: date, desc: desc }; }

function sdxClaims() {
    var L = [];
    // ===== 1. Từ chối phục hồi danh dự - Chỉ yêu cầu phục hồi danh dự =====
    var c1 = sdxBase({
        id: 'SDX_TCPH1', code: 'BT-2026-401', maVuViec: 'VVBT-2026-401', requestType: 'honor',
        fieldGroup: 'hình sự', date: '01/10/2026', deadline: '30/11/2026', requestDocDate: '28/09/2026',
        nyc: 'Đỗ Thị Lan', nycBirth: '14/03/1985', nycCardNo: '001185009871', nycCardDate: '20/04/2021',
        nycPhone: '0912401401', nycEmail: 'dothilan85@gmail.com', nycPhuongXa: 'Phường Văn Miếu - Quốc Tử Giám', nycAddressDetail: 'Số 12 ngõ 46 Quốc Tử Giám',
        agency: 'Công an quận Đống Đa',
        docBase: 'Quyết định đình chỉ điều tra số 15/QĐ-CQĐT ngày 10/08/2026 (người bị tạm giữ không thực hiện hành vi phạm tội)',
        vanBanCanCu: [{ name: 'Quyết định đình chỉ điều tra số 15/QĐ-CQĐT', file: 'QD_15_CQDT_dinh_chi_dieu_tra.pdf' }],
        hanhVi: 'Tạm giữ hình sự 03 ngày đối với người không thực hiện hành vi phạm tội.',
        nhanQua: 'Danh dự, uy tín bị ảnh hưởng tại nơi cư trú và nơi làm việc.',
        status: 'Từ chối phục hồi danh dự', phddStatus: 'Từ chối phục hồi danh dự', slaText: 'Người bị thiệt hại từ chối quyền được phục hồi danh dự',
        phddForm: 'Trực tiếp xin lỗi và cải chính công khai', phddFormApology: true, phddFormNews: false,
        appointedOfficers: sdxAppointed('Công an quận Đống Đa', '05/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-401_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'Công an quận Đống Đa' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '05/10/2026', soKyHieu: '102/TB-CAQ', ngay: '05/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-401.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_phuc_hoi_danh_du_BT-2026-401.pdf', url: '#' }],
        timeline: [
            sdxT('Tiếp nhận hồ sơ', '01/10/2026', 'Tiếp nhận văn bản yêu cầu phục hồi danh dự trực tiếp tại trụ sở.', 'Hệ thống / Người nộp đơn'),
            sdxT('Thông báo thụ lý hồ sơ', '05/10/2026', 'Ban hành Thông báo thụ lý số 102/TB-CAQ; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Nguyễn Hữu Thắng (Trưởng Công an quận)')
        ]
    });
    sdxM26(c1, { no: '41/TB-CAQ', date: '09/10/2026', send: '10/10/2026', signer: 'Nguyễn Hữu Thắng', title: 'Trưởng Công an quận', time: '05/11/2026 08:30', place: 'Hội trường Công an quận Đống Đa' });
    sdxReply(c1, '16/10/2026', 'Từ chối', 'Van_ban_tu_choi_phuc_hoi_danh_du_BT-2026-401.pdf');
    c1.phddTimeline = [
        sdxP('Thụ lý hồ sơ', '05/10/2026', 'Thủ trưởng cơ quan giải quyết bồi thường thụ lý hồ sơ, cử người giải quyết. Bắt đầu tiến trình phục hồi danh dự.'),
        sdxP('Ban hành Thông báo tổ chức thực hiện phục hồi danh dự', '09/10/2026', 'Lãnh đạo ký số Thông báo số 41/TB-CAQ (Mẫu số 26/BTNN).'),
        sdxP('Ghi nhận ý kiến phản hồi', '16/10/2026', 'Người bị thiệt hại có văn bản từ chối quyền được phục hồi danh dự (Khoản 5 Điều 57). Vụ việc chuyển sang trạng thái [Từ chối phục hồi danh dự].')
    ];
    L.push(c1);

    // ===== 2. Từ chối phục hồi danh dự - Cả hai, nhánh Giải quyết YCBT Hoàn thành =====
    var c2 = sdxBase({
        id: 'SDX_TCPH2', code: 'BT-2026-402', maVuViec: 'VVBT-2026-402', requestType: 'both',
        fieldGroup: 'hình sự', date: '01/10/2026', deadline: '30/11/2026', requestDocDate: '29/09/2026',
        nyc: 'Phan Văn Quang', nycBirth: '02/09/1979', nycCardNo: '001079004402', nycCardDate: '11/06/2021',
        nycPhone: '0904402402', nycEmail: '', nycPhuongXa: 'Phường Hoàng Liệt', nycAddressDetail: 'Số 8 ngõ 1 Linh Đàm',
        agency: 'Tòa án nhân dân khu vực 3 - Hà Nội',
        docBase: 'Bản án hình sự phúc thẩm số 41/2026/HS-PT ngày 15/08/2026 tuyên bị cáo không phạm tội',
        vanBanCanCu: [{ name: 'Bản án hình sự phúc thẩm số 41/2026/HS-PT', file: 'Ban_an_41_2026_HS_PT.pdf' }],
        hanhVi: 'Tạm giam 02 tháng đối với người không thực hiện hành vi phạm tội.',
        nhanQua: 'Mất thu nhập trong thời gian bị tạm giam, tổn thất tinh thần, chi phí đi lại.',
        status: 'Hoàn thành', phddStatus: 'Từ chối phục hồi danh dự', slaText: 'Đã chi trả tiền bồi thường; người bị thiệt hại từ chối phục hồi danh dự',
        phddForm: 'Trực tiếp xin lỗi và cải chính công khai', phddFormApology: true, phddFormNews: false,
        thietHaiList: sdxThiet([[2, 36000000, 36000000], [5, 108000000, 100000000, 'Áp dụng mức lương cơ sở tại thời điểm giải quyết'], [6, 36000000, 30000000, 'Chi phí có hóa đơn, chứng từ hợp lệ']], '08/10/2026'),
        appointedOfficers: sdxAppointed('Tòa án nhân dân khu vực 3 - Hà Nội', '03/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-402_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'Tòa án nhân dân khu vực 3 - Hà Nội' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '03/10/2026', soKyHieu: '58/TB-TA', ngay: '03/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-402.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-402.pdf', url: '#' }]
    });
    sdxXm(c2, '08/10/2026');
    sdxNeg(c2, '13/10/2026', { bankAccount: '0011004402402', bankName: 'Vietcombank', bankBranch: 'Chi nhánh Hoàng Mai' });
    sdxDec(c2, '45/QĐ-TA', '16/10/2026', 'Lê Thanh Bình', 'Chánh án');
    c2.fundRequests = [sdxFund('KP-2026-402', 'Cấp kinh phí bồi thường', c2.xmTotalAmount, '17/10/2026', '22/10/2026', c2, 'Chi trả toàn bộ tiền bồi thường theo Quyết định số 45/QĐ-TA.')];
    c2.thucthiDate = '22/10/2026';
    c2.thucthiNote = 'Đã chi trả đủ ' + sdxMoney(c2.xmTotalAmount) + ' đồng qua chuyển khoản.';
    c2.timeline = [
        sdxT('Tiếp nhận hồ sơ', '01/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
        sdxT('Thông báo thụ lý hồ sơ', '03/10/2026', 'Ban hành Thông báo thụ lý số 58/TB-TA; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Lê Thanh Bình (Chánh án)'),
        sdxT('Xác minh thiệt hại', '08/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c2.xmTotalAmount) + ' đồng.', SDX_CB),
        sdxT('Thương lượng bồi thường', '13/10/2026', 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
        sdxT('Ban hành Quyết định giải quyết bồi thường', '16/10/2026', 'Quyết định số 45/QĐ-TA.', 'Lê Thanh Bình (Chánh án)'),
        sdxT('Hoàn thành chi trả tiền bồi thường', '22/10/2026', 'Đã chi trả ' + sdxMoney(c2.xmTotalAmount) + ' đồng. Nhánh Giải quyết YCBT chuyển sang trạng thái [Hoàn thành].', SDX_CB)
    ];
    sdxM26(c2, { no: '22/TB-TA', date: '08/10/2026', send: '09/10/2026', signer: 'Lê Thanh Bình', title: 'Chánh án', time: '30/10/2026 09:00', place: 'Trụ sở Tòa án nhân dân khu vực 3 - Hà Nội' });
    sdxReply(c2, '15/10/2026', 'Từ chối', 'Van_ban_tu_choi_phuc_hoi_danh_du_BT-2026-402.pdf');
    c2.phddTimeline = [
        sdxP('Ban hành Thông báo tổ chức thực hiện phục hồi danh dự', '08/10/2026', 'Lãnh đạo ký số Thông báo số 22/TB-TA (Mẫu số 26/BTNN).'),
        sdxP('Ghi nhận ý kiến phản hồi', '15/10/2026', 'Người bị thiệt hại có văn bản từ chối quyền được phục hồi danh dự (Khoản 5 Điều 57). Nhánh Phục hồi danh dự chuyển sang trạng thái [Từ chối phục hồi danh dự].')
    ];
    L.push(c2);

    // ===== 3. Cả hai - nhánh Phục hồi danh dự Từ chối, nhánh Giải quyết YCBT đang Thương lượng (Tab Chờ xử lý) =====
    var c3 = sdxBase({
        id: 'SDX_TCPH3', code: 'BT-2026-403', maVuViec: 'VVBT-2026-403', requestType: 'both',
        fieldGroup: 'hành chính', date: '02/10/2026', deadline: '01/12/2026', requestDocDate: '30/09/2026',
        nyc: 'Trần Thị Hồng Nhung', nycBirth: '21/11/1990', nycCardNo: '001190007403', nycCardDate: '05/01/2022',
        nycPhone: '0983403403', nycEmail: 'hongnhung.tran@gmail.com', nycPhuongXa: 'Phường Nghĩa Đô', nycAddressDetail: 'Số 25 ngõ 165 Hoàng Quốc Việt',
        agency: 'UBND phường Nghĩa Đô',
        docBase: 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 88/QĐ-XPHC ngày 20/08/2026',
        vanBanCanCu: [{ name: 'Quyết định hủy Quyết định xử phạt số 88/QĐ-XPHC', file: 'QD_huy_88_XPHC.pdf' }],
        hanhVi: 'Xử phạt vi phạm hành chính và tịch thu hàng hóa trái pháp luật.',
        nhanQua: 'Hàng hóa bị hư hỏng, mất thu nhập kinh doanh 01 tháng; uy tín bị ảnh hưởng.',
        status: 'Thương lượng', phddStatus: 'Từ chối phục hồi danh dự', slaDays: 8, slaText: 'Đang thương lượng việc bồi thường',
        phddForm: 'Đăng báo xin lỗi và cải chính công khai', phddFormApology: false, phddFormNews: true,
        thietHaiList: sdxThiet([[1, 60000000, 55000000, 'Theo biên bản tạm giữ và hóa đơn nhập hàng'], [2, 25000000, 25000000], [6, 5000000, 5000000]], '12/10/2026'),
        appointedOfficers: sdxAppointed('UBND phường Nghĩa Đô', '05/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-403_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'UBND phường Nghĩa Đô' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '05/10/2026', soKyHieu: '77/TB-UBND', ngay: '05/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-403.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-403.pdf', url: '#' }]
    });
    sdxXm(c3, '12/10/2026');
    c3.timeline = [
        sdxT('Tiếp nhận hồ sơ', '02/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
        sdxT('Thông báo thụ lý hồ sơ', '05/10/2026', 'Ban hành Thông báo thụ lý số 77/TB-UBND; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Đặng Văn Hưng (Chủ tịch UBND phường)'),
        sdxT('Xác minh thiệt hại', '12/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c3.xmTotalAmount) + ' đồng. Hồ sơ chuyển sang [Thương lượng].', SDX_CB)
    ];
    sdxM26(c3, { no: '31/TB-UBND', date: '09/10/2026', send: '10/10/2026', signer: 'Đặng Văn Hưng', title: 'Chủ tịch UBND phường', paper: 'Báo Pháp luật Việt Nam' });
    sdxReply(c3, '19/10/2026', 'Từ chối', 'Van_ban_tu_choi_phuc_hoi_danh_du_BT-2026-403.pdf');
    c3.phddTimeline = [
        sdxP('Ban hành Thông báo tổ chức thực hiện phục hồi danh dự', '09/10/2026', 'Lãnh đạo ký số Thông báo số 31/TB-UBND (Mẫu số 26/BTNN).'),
        sdxP('Ghi nhận ý kiến phản hồi', '19/10/2026', 'Người bị thiệt hại có văn bản từ chối quyền được phục hồi danh dự (Khoản 5 Điều 57). Nhánh Phục hồi danh dự chuyển sang trạng thái [Từ chối phục hồi danh dự]; nhánh Giải quyết YCBT tiếp tục.')
    ];
    L.push(c3);

    // ===== 4. Hoàn thành - Chỉ yêu cầu bồi thường thiệt hại (có tạm ứng) =====
    var c4 = sdxBase({
        id: 'SDX_HT1', code: 'BT-2026-404', maVuViec: 'VVBT-2026-404', requestType: 'money',
        fieldGroup: 'hành chính', date: '01/10/2026', deadline: '30/11/2026', requestDocDate: '26/09/2026',
        nyc: 'Vũ Đình Khoa', nycBirth: '08/07/1982', nycCardNo: '001082005404', nycCardDate: '17/03/2021',
        nycPhone: '0915404404', nycEmail: 'vudinhkhoa@gmail.com', nycPhuongXa: 'Phường Cầu Giấy', nycAddressDetail: 'Số 40 Trần Thái Tông',
        hinhThucTiepNhan: 'Qua dịch vụ bưu chính',
        agency: 'UBND phường Cầu Giấy',
        docBase: 'Quyết định hủy Quyết định cưỡng chế tháo dỡ công trình số 112/QĐ-CC ngày 05/08/2026',
        vanBanCanCu: [{ name: 'Quyết định hủy Quyết định cưỡng chế số 112/QĐ-CC', file: 'QD_huy_112_CC.pdf' }],
        hanhVi: 'Cưỡng chế tháo dỡ mái che, biển hiệu cửa hàng trái pháp luật.',
        nhanQua: 'Tài sản bị hư hỏng, cửa hàng phải ngừng kinh doanh 01 tháng.',
        status: 'Hoàn thành', slaText: 'Hoàn thành chi trả tiền bồi thường', advanceNum: 50000000,
        thietHaiList: sdxThiet([[1, 160000000, 150000000, 'Khấu hao theo thời gian sử dụng'], [2, 96000000, 90000000, 'Theo sổ sách doanh thu 03 tháng liền kề'], [6, 64000000, 60000000, 'Chi phí thuê kho, vận chuyển có chứng từ']], '09/10/2026'),
        appointedOfficers: sdxAppointed('UBND phường Cầu Giấy', '03/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-404_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'UBND phường Cầu Giấy' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '03/10/2026', soKyHieu: '64/TB-UBND', ngay: '03/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-404.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-404.pdf', url: '#' }]
    });
    sdxXm(c4, '09/10/2026');
    sdxNeg(c4, '14/10/2026', { bankAccount: '1903404404404', bankName: 'Techcombank', bankBranch: 'Chi nhánh Cầu Giấy' });
    sdxDec(c4, '112/QĐ-UBND', '19/10/2026', 'Nguyễn Minh Tuấn', 'Chủ tịch UBND phường');
    c4.fundRequests = [
        sdxFund('KP-2026-404', 'Cấp tạm ứng', 50000000, '06/10/2026', '08/10/2026', c4, 'Tạm ứng kinh phí bồi thường theo đề nghị của người yêu cầu bồi thường.'),
        sdxFund('KP-2026-405', 'Cấp kinh phí bồi thường', c4.xmTotalAmount - 50000000, '20/10/2026', '23/10/2026', c4, 'Chi trả phần còn lại (tổng ' + sdxMoney(c4.xmTotalAmount) + ' đồng trừ 50.000.000 đồng đã tạm ứng).')
    ];
    c4.thucthiDate = '23/10/2026';
    c4.thucthiNote = 'Đã chi trả đủ qua chuyển khoản, khấu trừ 50.000.000 đồng đã tạm ứng.';
    c4.timeline = [
        sdxT('Tiếp nhận hồ sơ', '01/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường qua dịch vụ bưu chính.', 'Hệ thống / Người nộp đơn'),
        sdxT('Thông báo thụ lý hồ sơ', '03/10/2026', 'Ban hành Thông báo thụ lý số 64/TB-UBND; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Nguyễn Minh Tuấn (Chủ tịch UBND phường)'),
        sdxT('Tạm ứng kinh phí bồi thường', '08/10/2026', 'Đã chi tạm ứng 50.000.000 đồng.', SDX_CB),
        sdxT('Xác minh thiệt hại', '09/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c4.xmTotalAmount) + ' đồng.', SDX_CB),
        sdxT('Thương lượng bồi thường', '14/10/2026', 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
        sdxT('Ban hành Quyết định giải quyết bồi thường', '19/10/2026', 'Quyết định số 112/QĐ-UBND.', 'Nguyễn Minh Tuấn (Chủ tịch UBND phường)'),
        sdxT('Hoàn thành chi trả tiền bồi thường', '23/10/2026', 'Đã chi trả đủ tiền bồi thường. Vụ việc chuyển sang trạng thái [Hoàn thành].', SDX_CB)
    ];
    L.push(c4);

    // ===== 5. Hoàn thành - Chỉ yêu cầu phục hồi danh dự =====
    var c5 = sdxBase({
        id: 'SDX_HT2', code: 'BT-2026-405', maVuViec: 'VVBT-2026-405', requestType: 'honor',
        fieldGroup: 'hình sự', date: '02/10/2026', deadline: '01/12/2026', requestDocDate: '30/09/2026',
        nyc: 'Hoàng Minh Đức', nycBirth: '19/05/1976', nycCardNo: '001076003405', nycCardDate: '09/09/2021',
        nycPhone: '0936405405', nycEmail: '', nycPhuongXa: 'Phường Ngọc Hà', nycAddressDetail: 'Số 7 ngõ 158 Ngọc Hà',
        agency: 'Viện kiểm sát nhân dân khu vực 1 - Hà Nội',
        docBase: 'Quyết định đình chỉ vụ án số 09/QĐ-VKS ngày 25/08/2026 (bị can không thực hiện hành vi phạm tội)',
        vanBanCanCu: [{ name: 'Quyết định đình chỉ vụ án số 09/QĐ-VKS', file: 'QD_09_VKS_dinh_chi_vu_an.pdf' }],
        hanhVi: 'Khởi tố bị can đối với người không thực hiện hành vi phạm tội.',
        nhanQua: 'Danh dự, uy tín bị ảnh hưởng tại nơi cư trú.',
        status: 'Hoàn thành', phddStatus: 'Hoàn thành', slaText: 'Đã hoàn thành phục hồi danh dự',
        phddForm: 'Trực tiếp xin lỗi và cải chính công khai', phddFormApology: true, phddFormNews: false,
        appointedOfficers: sdxAppointed('Viện kiểm sát nhân dân khu vực 1 - Hà Nội', '05/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-405_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'Viện kiểm sát nhân dân khu vực 1 - Hà Nội' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '05/10/2026', soKyHieu: '19/TB-VKS', ngay: '05/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-405.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_phuc_hoi_danh_du_BT-2026-405.pdf', url: '#' }],
        timeline: [
            sdxT('Tiếp nhận hồ sơ', '02/10/2026', 'Tiếp nhận văn bản yêu cầu phục hồi danh dự trực tiếp.', 'Hệ thống / Người nộp đơn'),
            sdxT('Thông báo thụ lý hồ sơ', '05/10/2026', 'Ban hành Thông báo thụ lý số 19/TB-VKS; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Trịnh Văn Long (Viện trưởng)')
        ]
    });
    sdxM26(c5, { no: '27/TB-VKS', date: '07/10/2026', send: '08/10/2026', signer: 'Trịnh Văn Long', title: 'Viện trưởng', time: '20/10/2026 09:00', place: 'Hội trường UBND phường Ngọc Hà' });
    sdxReply(c5, '12/10/2026', 'Đồng ý thực hiện', 'Van_ban_dong_y_phuc_hoi_danh_du_BT-2026-405.pdf');
    Object.assign(c5, {
        phddStep3Saved: true, phddStep3Agency: 'Viện kiểm sát nhân dân khu vực 1 - Hà Nội', phddStep3DateExp: '20/10/2026', phddStep3DirectVenue: 'Hội trường UBND phường Ngọc Hà',
        phddStep3Member_coquan: true, phddStep3Member_totung: false, phddStep3Member_canhan: false,
        phddStep3Participants: [{ name: 'Trịnh Văn Long', position: 'Viện trưởng', unit: 'Viện kiểm sát nhân dân khu vực 1 - Hà Nội' }, { name: 'Lê Thị Thu', position: 'Phó Chủ tịch', unit: 'UBND phường Ngọc Hà' }, { name: SDX_CB, position: 'Chuyên viên', unit: 'Viện kiểm sát nhân dân khu vực 1 - Hà Nội' }],
        phddStep3Claimants: [{ name: 'Hoàng Minh Đức', idNo: '001076003405', address: 'Số 7 ngõ 158 Ngọc Hà, Phường Ngọc Hà, Hà Nội' }],
        phddUploadedFiles: [{ name: 'Bien_ban_to_chuc_xin_loi_cai_chinh_BT-2026-405.pdf', size: '342 KB' }, { name: 'Danh_sach_thanh_phan_tham_du_BT-2026-405.pdf', size: '128 KB' }],
        phddStep4DateAct: '20/10/2026', phddStep4VenueAct: 'Hội trường UBND phường Ngọc Hà',
        phddStep4ResultDesc: 'Đã tổ chức trực tiếp xin lỗi và cải chính công khai tại nơi cư trú của người bị thiệt hại.'
    });
    c5.phddTimeline = [
        sdxP('Thụ lý hồ sơ', '05/10/2026', 'Thủ trưởng cơ quan giải quyết bồi thường thụ lý hồ sơ, cử người giải quyết. Bắt đầu tiến trình phục hồi danh dự.'),
        sdxP('Ban hành Thông báo tổ chức thực hiện phục hồi danh dự', '07/10/2026', 'Lãnh đạo ký số Thông báo số 27/TB-VKS (Mẫu số 26/BTNN).'),
        sdxP('Ghi nhận ý kiến phản hồi', '12/10/2026', 'Người bị thiệt hại đồng ý thực hiện phục hồi danh dự (Khoản 2 Điều 57).'),
        sdxP('Hoàn thành phục hồi danh dự', '20/10/2026', 'Đã tổ chức trực tiếp xin lỗi và cải chính công khai. Vụ việc chuyển sang trạng thái [Hoàn thành].')
    ];
    L.push(c5);

    // ===== 6. Hoàn thành - Cả hai (đăng báo xin lỗi, cải chính công khai) =====
    var c6 = sdxBase({
        id: 'SDX_HT3', code: 'BT-2026-406', maVuViec: 'VVBT-2026-406', requestType: 'both',
        fieldGroup: 'thi hành án dân sự', date: '01/10/2026', deadline: '30/11/2026', requestDocDate: '27/09/2026',
        nyc: 'Ngô Thị Hà', nycBirth: '30/12/1980', nycCardNo: '001180006406', nycCardDate: '22/02/2022',
        nycPhone: '0977406406', nycEmail: 'ngothiha80@gmail.com', nycPhuongXa: 'Phường Bồ Đề', nycAddressDetail: 'Số 15 ngõ 72 Nguyễn Văn Cừ',
        agency: 'Thi hành án dân sự TP. Hà Nội',
        docBase: 'Quyết định hủy Quyết định kê biên tài sản số 35/QĐ-THADS ngày 12/08/2026',
        vanBanCanCu: [{ name: 'Quyết định hủy Quyết định kê biên số 35/QĐ-THADS', file: 'QD_huy_35_THADS.pdf' }],
        hanhVi: 'Kê biên, niêm phong tài sản không thuộc sở hữu của người phải thi hành án.',
        nhanQua: 'Không sử dụng được tài sản kinh doanh 02 tháng; uy tín bị ảnh hưởng do thông tin kê biên công khai.',
        status: 'Hoàn thành', phddStatus: 'Hoàn thành', slaText: 'Đã hoàn thành chi trả và phục hồi danh dự',
        phddForm: 'Đăng báo xin lỗi và cải chính công khai', phddFormApology: false, phddFormNews: true,
        thietHaiList: sdxThiet([[1, 120000000, 120000000], [2, 90000000, 90000000], [6, 30000000, 30000000]], '07/10/2026'),
        appointedOfficers: sdxAppointed('Thi hành án dân sự TP. Hà Nội', '03/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-406_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'Thi hành án dân sự TP. Hà Nội' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '03/10/2026', soKyHieu: '211/TB-THADS', ngay: '03/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-406.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-406.pdf', url: '#' }]
    });
    sdxXm(c6, '07/10/2026');
    sdxNeg(c6, '12/10/2026', null, 'Đăng báo xin lỗi, cải chính công khai.');
    sdxDec(c6, '76/QĐ-THADS', '15/10/2026', 'Phạm Đức Toàn', 'Thủ trưởng cơ quan thi hành án dân sự');
    c6.fundRequests = [sdxFund('KP-2026-406', 'Cấp kinh phí bồi thường', c6.xmTotalAmount, '16/10/2026', '21/10/2026', c6, 'Chi trả tiền mặt tại trụ sở cơ quan giải quyết bồi thường.')];
    c6.thucthiDate = '21/10/2026';
    c6.thucthiNote = 'Đã chi trả đủ ' + sdxMoney(c6.xmTotalAmount) + ' đồng bằng tiền mặt.';
    c6.timeline = [
        sdxT('Tiếp nhận hồ sơ', '01/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
        sdxT('Thông báo thụ lý hồ sơ', '03/10/2026', 'Ban hành Thông báo thụ lý số 211/TB-THADS; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Phạm Đức Toàn (Thủ trưởng)'),
        sdxT('Xác minh thiệt hại', '07/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c6.xmTotalAmount) + ' đồng.', SDX_CB),
        sdxT('Thương lượng bồi thường', '12/10/2026', 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
        sdxT('Ban hành Quyết định giải quyết bồi thường', '15/10/2026', 'Quyết định số 76/QĐ-THADS.', 'Phạm Đức Toàn (Thủ trưởng)'),
        sdxT('Hoàn thành chi trả tiền bồi thường', '21/10/2026', 'Đã chi trả đủ tiền bồi thường. Nhánh Giải quyết YCBT chuyển sang trạng thái [Hoàn thành].', SDX_CB)
    ];
    sdxM26(c6, { no: '35/TB-THADS', date: '08/10/2026', send: '09/10/2026', signer: 'Phạm Đức Toàn', title: 'Thủ trưởng cơ quan thi hành án dân sự', paper: 'Báo Pháp luật Việt Nam; Báo Hà Nội mới' });
    sdxReply(c6, '13/10/2026', 'Đồng ý thực hiện', 'Van_ban_dong_y_phuc_hoi_danh_du_BT-2026-406.pdf');
    Object.assign(c6, {
        phddStep3Saved: true, phddStep3NewsLevel: 'Trung ương', phddStep3NewsNameCentral: 'Báo Pháp luật Việt Nam', phddStep3NewsNameLocal: 'Báo Hà Nội mới',
        phddStep3NewsCentral: 'Báo Pháp luật Việt Nam', phddStep3NewsLocal: 'Báo Hà Nội mới',
        phddStep3NewsNumbers: 'Báo Pháp luật Việt Nam số 291, 292, 293 (ngày 19, 20, 21/10/2026); Báo Hà Nội mới số 10215, 10216, 10217 (ngày 19, 20, 21/10/2026)',
        phddStep4DateAct: '21/10/2026', phddStep4NewsCentralAct: 'Báo Pháp luật Việt Nam', phddStep4NewsLocalAct: 'Báo Hà Nội mới',
        phddStep4NewsNumbers: 'Đăng 03 số liên tiếp trên mỗi báo, từ ngày 19/10/2026 đến ngày 21/10/2026',
        phddUploadedFiles: [{ name: 'Ban_chup_bai_dang_xin_loi_cai_chinh_BT-2026-406.pdf', size: '1,2 MB' }, { name: 'Hop_dong_dang_bao_BT-2026-406.pdf', size: '310 KB' }],
        phddStep4ResultDesc: 'Đã đăng báo xin lỗi và cải chính công khai trên 03 số liên tiếp của Báo Pháp luật Việt Nam và Báo Hà Nội mới.'
    });
    c6.phddTimeline = [
        sdxP('Ban hành Thông báo tổ chức thực hiện phục hồi danh dự', '08/10/2026', 'Lãnh đạo ký số Thông báo số 35/TB-THADS (Mẫu số 26/BTNN).'),
        sdxP('Ghi nhận ý kiến phản hồi', '13/10/2026', 'Người bị thiệt hại đồng ý thực hiện phục hồi danh dự (Khoản 2 Điều 57).'),
        sdxP('Hoàn thành phục hồi danh dự', '21/10/2026', 'Đã đăng báo xin lỗi, cải chính công khai 03 số liên tiếp. Nhánh Phục hồi danh dự chuyển sang trạng thái [Hoàn thành].')
    ];
    L.push(c6);

    // ===== 7. Đình chỉ giải quyết - Ký số (có Số, Ngày quyết định) =====
    var dc02 = 'Người yêu cầu bồi thường rút toàn bộ yêu cầu bồi thường (Điểm b Khoản 1 Điều 51)';
    var c7 = sdxBase({
        id: 'SDX_DC1', code: 'BT-2026-407', maVuViec: 'VVBT-2026-407', requestType: 'money',
        fieldGroup: 'hành chính', date: '02/10/2026', deadline: '01/12/2026', requestDocDate: '29/09/2026',
        nyc: 'Lâm Văn Tài', nycBirth: '11/01/1987', nycCardNo: '001087001407', nycCardDate: '14/05/2021',
        nycPhone: '0868407407', nycEmail: '', nycPhuongXa: 'Phường Tây Hồ', nycAddressDetail: 'Số 18 ngõ 52 Tô Ngọc Vân',
        agency: 'UBND phường Tây Hồ',
        docBase: 'Quyết định hủy Quyết định thu hồi giấy phép kinh doanh số 21/QĐ-UBND ngày 18/08/2026',
        hanhVi: 'Thu hồi giấy phép kinh doanh dịch vụ ăn uống trái pháp luật.',
        nhanQua: 'Ngừng kinh doanh 45 ngày, mất thu nhập và phát sinh chi phí thuê mặt bằng.',
        status: 'Đình chỉ giải quyết', specialStatusPreviousStatus: 'Xác minh thiệt hại', slaStatus: 'danger', slaText: 'Vụ việc đã đình chỉ giải quyết',
        thietHaiList: sdxThiet([[2, 75000000, 70000000, 'Theo tờ khai thuế 03 tháng liền kề'], [6, 30000000, 30000000, 'Chi phí thuê mặt bằng có hợp đồng, chứng từ']], '09/10/2026'),
        appointedOfficers: sdxAppointed('UBND phường Tây Hồ', '05/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-407_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'UBND phường Tây Hồ' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '05/10/2026', soKyHieu: '81/TB-UBND', ngay: '05/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-407.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-407.pdf', url: '#' }, { name: 'Don_rut_yeu_cau_boi_thuong_BT-2026-407.pdf', url: '#' }]
    });
    sdxXm(c7, '09/10/2026');
    var f7 = 'Mau_25_BTNN_Quyet_dinh_dinh_chi_VVBT-2026-407_da_ky.pdf';
    c7.dinhChi = { reasonCode: 'DCGQ_02', reasonText: dc02, detail: 'Ngày 12/10/2026, ông Lâm Văn Tài có đơn rút toàn bộ yêu cầu bồi thường.', docNumber: '25/QĐ-UBND', docDate: '15/10/2026', noiNhan: ['- Như Điều 4;', '- Ông Lâm Văn Tài;', '- Lưu: VT, HSVV.'], advance: null, fileName: 'Mau_25_BTNN_Quyet_dinh_dinh_chi_VVBT-2026-407.doc', signedFile: f7, formNo: 'Mẫu số 25/BTNN', signingMethod: 'Ký số', submittedAt: '13/10/2026 09:30', issuedAt: '15/10/2026', attachments: [{ name: 'Đơn rút yêu cầu bồi thường', file: { name: 'Don_rut_yeu_cau_boi_thuong_BT-2026-407.pdf', size: '210 KB', id: '' } }] };
    Object.assign(c7.dinhChi, SDX_DC_THUHOI['BT-2026-407']);
    c7.specialStatusLogs = [{ type: 'Đình chỉ giải quyết', docNo: '25/QĐ-UBND', docDate: '15/10/2026', signMode: 'Ký số', startDate: '15/10/2026', endDate: '', previousStatus: 'Xác minh thiệt hại', reason: dc02 + ': Ngày 12/10/2026, ông Lâm Văn Tài có đơn rút toàn bộ yêu cầu bồi thường.', files: [{ name: f7, size: '318 KB', url: '#' }], createdAt: '15/10/2026' }];
    c7.timeline = [
        sdxT('Tiếp nhận hồ sơ', '02/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
        sdxT('Thông báo thụ lý hồ sơ', '05/10/2026', 'Ban hành Thông báo thụ lý số 81/TB-UBND; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Võ Thanh Sơn (Chủ tịch UBND phường)'),
        sdxT('Xác minh thiệt hại', '09/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c7.xmTotalAmount) + ' đồng.', SDX_CB),
        sdxT('Trình ký Quyết định đình chỉ giải quyết', '13/10/2026', 'Trình Lãnh đạo ký duyệt Mẫu 25/BTNN. Căn cứ: ' + dc02 + '.', SDX_CB),
        sdxT('Ký duyệt Quyết định đình chỉ giải quyết', '15/10/2026', 'Lãnh đạo ký số Quyết định số 25/QĐ-UBND. Vụ việc chuyển sang trạng thái [Đình chỉ giải quyết].', 'Võ Thanh Sơn (Chủ tịch UBND phường)')
    ];
    L.push(c7);

    // ===== 8. Đình chỉ giải quyết - Ký ngoài (không nhập Số, Ngày quyết định) =====
    var dc04 = 'Văn bản được xem xét lại không còn là văn bản làm căn cứ yêu cầu bồi thường (Khoản 2 Điều 50)';
    var c8 = sdxBase({
        id: 'SDX_DC2', code: 'BT-2026-408', maVuViec: 'VVBT-2026-408', requestType: 'money',
        fieldGroup: 'hành chính', date: '01/10/2026', deadline: '30/11/2026', requestDocDate: '25/09/2026',
        nyc: 'Trương Thị Mai', nycBirth: '25/06/1984', nycCardNo: '001184002408', nycCardDate: '30/07/2021',
        nycPhone: '0945408408', nycEmail: 'truongmai84@gmail.com', nycPhuongXa: 'Phường Thanh Xuân', nycAddressDetail: 'Số 9 ngõ 214 Nguyễn Xiển',
        hinhThucTiepNhan: 'Qua dịch vụ bưu chính',
        agency: 'UBND phường Thanh Xuân',
        docBase: 'Quyết định giải quyết khiếu nại số 47/QĐ-GQKN ngày 01/09/2026 (hủy Quyết định xử phạt số 66/QĐ-XPHC)',
        hanhVi: 'Xử phạt vi phạm hành chính, buộc tháo dỡ phần công trình phụ trợ.',
        nhanQua: 'Thiệt hại vật liệu xây dựng và chi phí thuê nhân công tháo dỡ.',
        status: 'Đình chỉ giải quyết', specialStatusPreviousStatus: 'Thương lượng', slaStatus: 'danger', slaText: 'Vụ việc đã đình chỉ giải quyết',
        thietHaiList: sdxThiet([[1, 85000000, 80000000, 'Theo biên bản kiểm đếm vật liệu'], [6, 15000000, 15000000, 'Chi phí thuê nhân công có hợp đồng']], '08/10/2026'),
        appointedOfficers: sdxAppointed('UBND phường Thanh Xuân', '03/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-408_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'UBND phường Thanh Xuân' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '03/10/2026', soKyHieu: '70/TB-UBND', ngay: '03/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-408.pdf' },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-408.pdf', url: '#' }]
    });
    sdxXm(c8, '08/10/2026');
    sdxNeg(c8, '14/10/2026', { bankAccount: '2108408408408', bankName: 'BIDV', bankBranch: 'Chi nhánh Thanh Xuân' });
    var f8 = 'QD_dinh_chi_giai_quyet_BT-2026-408_ky_ngoai.pdf';
    c8.dinhChi = { reasonCode: 'DCGQ_04', reasonText: dc04, detail: 'Quyết định giải quyết khiếu nại số 47/QĐ-GQKN bị hủy theo Quyết định số 102/QĐ-UBND ngày 16/10/2026 của UBND Thành phố.', docNumber: '', docDate: '', advance: null, fileName: f8, signedFile: f8, formNo: 'Mẫu số 25/BTNN', signingMethod: 'Ký ngoài', issuedAt: '20/10/2026 10:15', attachments: [] };
    Object.assign(c8.dinhChi, SDX_DC_THUHOI['BT-2026-408']);
    c8.specialStatusLogs = [{ type: 'Đình chỉ giải quyết', docNo: '', docDate: '', signMode: 'Ký ngoài', startDate: '20/10/2026', endDate: '', previousStatus: 'Thương lượng', reason: dc04 + ': ' + c8.dinhChi.detail, files: [{ name: f8, size: '402 KB', url: '#' }], createdAt: '20/10/2026' }];
    c8.timeline = [
        sdxT('Tiếp nhận hồ sơ', '01/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường qua dịch vụ bưu chính.', 'Hệ thống / Người nộp đơn'),
        sdxT('Thông báo thụ lý hồ sơ', '03/10/2026', 'Ban hành Thông báo thụ lý số 70/TB-UBND; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Bùi Quang Vinh (Chủ tịch UBND phường)'),
        sdxT('Xác minh thiệt hại', '08/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c8.xmTotalAmount) + ' đồng.', SDX_CB),
        sdxT('Thương lượng bồi thường', '14/10/2026', 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
        sdxT('Ban hành Quyết định đình chỉ giải quyết (Ký ngoài)', '20/10/2026', 'Ban hành văn bản Mẫu 25/BTNN đã ký ngoài hệ thống (' + f8 + '). Căn cứ: ' + dc04 + '. Vụ việc chuyển sang trạng thái [Đình chỉ giải quyết].', SDX_CB)
    ];
    L.push(c8);

    // ===== 9. Đã chuyển CQGQBT - thao tác Chuyển CQGQBT (sau Cử người giải quyết bồi thường) =====
    var c9 = sdxBase({
        id: 'SDX_CH1', code: 'BT-2026-409', maVuViec: 'VVBT-2026-409', requestType: 'money',
        fieldGroup: 'thi hành án dân sự', date: '02/10/2026', deadline: '01/12/2026', requestDocDate: '30/09/2026',
        nyc: 'Bùi Văn Hải', nycBirth: '03/04/1978', nycCardNo: '001078008409', nycCardDate: '12/10/2021',
        nycPhone: '0904409409', nycEmail: '', nycPhuongXa: 'Phường Hoàng Mai', nycAddressDetail: 'Số 66 Tam Trinh',
        agency: 'UBND phường Hoàng Mai',
        docBase: 'Quyết định hủy Quyết định cưỡng chế thi hành án số 18/QĐ-CCTHA ngày 20/08/2026',
        hanhVi: 'Cưỡng chế giao tài sản không đúng đối tượng phải thi hành án.',
        nhanQua: 'Mất quyền sử dụng kho hàng 02 tháng, hàng hóa hư hỏng.',
        status: 'Đã chuyển CQGQBT', slaText: 'Đã chuyển cơ quan giải quyết bồi thường',
        thietHaiList: sdxThiet([[1, 140000000], [2, 60000000]]),
        appointedOfficers: sdxAppointed('UBND phường Hoàng Mai', '05/10/2026'),
        qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-409_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'UBND phường Hoàng Mai' }] },
        thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: '05/10/2026', soKyHieu: '88/TB-UBND', ngay: '05/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-409.pdf' },
        transferRequest: {
            via: 'Chuyển CQGQBT', prevStatus: 'Cử người giải quyết bồi thường', targetName: 'Thi hành án dân sự TP. Hà Nội',
            content: 'Hành vi gây thiệt hại do Chấp hành viên cơ quan thi hành án dân sự thực hiện; chuyển hồ sơ để Thi hành án dân sự TP. Hà Nội giải quyết theo thẩm quyền (Điều 39 Luật Trách nhiệm bồi thường của Nhà nước).',
            docNo: '215/UBND-TP', docDate: '09/10/2026', signedFile: 'Van_ban_chuyen_ho_so_VVBT-2026-409_da_ky.pdf',
            files: [{ name: 'Ho_so_yeu_cau_boi_thuong_BT-2026-409.pdf' }, { name: 'Bien_ban_giao_nhan_ho_so_BT-2026-409.pdf' }],
            at: '09/10/2026'
        },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-409.pdf', url: '#' }],
        timeline: [
            sdxT('Tiếp nhận hồ sơ', '02/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
            sdxT('Thông báo thụ lý hồ sơ', '05/10/2026', 'Ban hành Thông báo thụ lý số 88/TB-UBND; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Lại Văn Phúc (Chủ tịch UBND phường)'),
            sdxT('Trình Chuyển CQGQBT', '07/10/2026', 'Trình Lãnh đạo chuyển hồ sơ đến Thi hành án dân sự TP. Hà Nội.', SDX_CB),
            sdxT('Đã chuyển CQGQBT', '09/10/2026', 'Lãnh đạo ký duyệt văn bản chuyển hồ sơ số 215/UBND-TP. Hồ sơ chuyển đến Thi hành án dân sự TP. Hà Nội.', 'Lại Văn Phúc (Chủ tịch UBND phường)')
        ]
    });
    L.push(c9);

    // ===== 10. Đã chuyển CQGQBT - Không thụ lý lý do KTL_01 =====
    var k1 = 'Yêu cầu bồi thường không thuộc thẩm quyền giải quyết của mình (Điểm a Khoản 2 Điều 43)';
    var f10 = 'Mau_04_BTNN_Thong_bao_khong_thu_ly_VVBT-2026-410_da_ky.pdf';
    var c10 = sdxBase({
        assignedOfficer: '',
        id: 'SDX_CH2', code: 'BT-2026-410', maVuViec: 'VVBT-2026-410', requestType: 'money',
        fieldGroup: 'hành chính', date: '05/10/2026', deadline: '04/12/2026', requestDocDate: '02/10/2026',
        nyc: 'Đinh Công Sơn', nycBirth: '17/08/1983', nycCardNo: '001083006410', nycCardDate: '08/12/2021',
        nycPhone: '0989410410', nycEmail: 'dinhcongson@gmail.com', nycPhuongXa: 'Phường Long Biên', nycAddressDetail: 'Số 21 ngõ 12 Ngọc Lâm',
        agency: 'UBND phường Long Biên',
        docBase: 'Quyết định hủy Quyết định tạm giữ phương tiện số 30/QĐ-TGPT ngày 10/09/2026',
        hanhVi: 'Tạm giữ phương tiện vận tải quá thời hạn quy định.',
        nhanQua: 'Không khai thác được phương tiện vận tải 40 ngày.',
        status: 'Đã chuyển CQGQBT', slaText: 'Không thụ lý - chuyển cơ quan có thẩm quyền',
        thietHaiList: sdxThiet([[2, 48000000], [6, 7000000]]),
        ktlReasonCode: 'KTL_01', ktlReasonName: k1,
        ktlDetail: 'Người thi hành công vụ gây thiệt hại thuộc Công an phường Long Biên.',
        rejectType: 'Đã chuyển CQGQBT', rejectReason: k1 + ': Người thi hành công vụ gây thiệt hại thuộc Công an phường Long Biên.',
        rejectDate: '09/10/2026', rejectOfficer: 'Kiều Văn Nam (Chủ tịch UBND phường)', signingMethod: 'online',
        signedFile: f10, ktlDocNumber: '09/TB-UBND', ktlDocDate: '09/10/2026',
        rejectionLog: [{ date: '09/10/2026', officer: 'Kiều Văn Nam (Chủ tịch UBND phường)', action: 'Không thụ lý', reason: k1, method: 'Ký số', docNumber: '09/TB-UBND', docDate: '09/10/2026', file: f10 }],
        transferRequest: {
            via: 'Không thụ lý', mode: 'CQ', targetName: 'Công an phường Long Biên',
            content: 'Không thụ lý do không thuộc thẩm quyền; chuyển hồ sơ để Công an phường Long Biên giải quyết theo thẩm quyền (Khoản 2 Điều 43 Luật Trách nhiệm bồi thường của Nhà nước).',
            docNo: '09/TB-UBND', docDate: '09/10/2026', signedFile: f10,
            files: [{ name: 'Ho_so_yeu_cau_boi_thuong_BT-2026-410.pdf' }],
            at: '09/10/2026'
        },
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-410.pdf', url: '#' }],
        timeline: [
            sdxT('Tiếp nhận hồ sơ', '05/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
            sdxT('Trình Không thụ lý hồ sơ', '07/10/2026', 'Trình Lãnh đạo ký Thông báo không thụ lý (Mẫu 04/BTNN), lý do KTL_01, kèm chuyển cơ quan có thẩm quyền.', SDX_CB),
            sdxT('Đã chuyển CQGQBT', '09/10/2026', 'Lãnh đạo ký số Thông báo không thụ lý số 09/TB-UBND. Hồ sơ chuyển đến Công an phường Long Biên.', 'Kiều Văn Nam (Chủ tịch UBND phường)')
        ]
    });
    L.push(c10);

    // ===== 11. Không thụ lý - KTL_02 (Ký số) =====
    var k2 = 'Thời hiệu yêu cầu bồi thường đã hết (Điểm b Khoản 2 Điều 43)';
    var f11 = 'Mau_04_BTNN_Thong_bao_khong_thu_ly_VVBT-2026-411_da_ky.pdf';
    var c11 = sdxBase({
        assignedOfficer: '',
        id: 'SDX_KTL1', code: 'BT-2026-411', maVuViec: 'VVBT-2026-411', requestType: 'money',
        fieldGroup: 'hành chính', date: '06/10/2026', deadline: '05/12/2026', requestDocDate: '03/10/2026',
        nyc: 'Phùng Văn Lộc', nycBirth: '09/02/1970', nycCardNo: '001070005411', nycCardDate: '19/01/2021',
        nycPhone: '0913411411', nycEmail: '', nycPhuongXa: 'Phường Ba Đình', nycAddressDetail: 'Số 5 ngõ 30 Phan Đình Phùng',
        agency: 'UBND phường Ba Đình',
        docBase: 'Quyết định hủy Quyết định xử phạt số 15/QĐ-XPHC ngày 12/03/2022',
        hanhVi: 'Xử phạt vi phạm hành chính trái pháp luật.',
        nhanQua: 'Nộp tiền phạt và chi phí khắc phục hậu quả.',
        status: 'Không thụ lý', slaText: 'Không thụ lý hồ sơ',
        thietHaiList: sdxThiet([[1, 30000000], [6, 5000000]]),
        ktlReasonCode: 'KTL_02', ktlReasonName: k2,
        ktlDetail: 'Văn bản làm căn cứ yêu cầu bồi thường có hiệu lực từ ngày 12/03/2022; đến ngày nộp hồ sơ đã quá 03 năm theo Điều 6 Luật Trách nhiệm bồi thường của Nhà nước.',
        rejectType: 'Không thụ lý', rejectReason: k2 + ': Đã quá 03 năm kể từ ngày văn bản làm căn cứ có hiệu lực.',
        rejectDate: '13/10/2026', rejectOfficer: 'Hà Minh Quân (Chủ tịch UBND phường)', signingMethod: 'online',
        signedFile: f11, ktlDocNumber: '17/TB-UBND', ktlDocDate: '13/10/2026',
        rejectionLog: [{ date: '13/10/2026', officer: 'Hà Minh Quân (Chủ tịch UBND phường)', action: 'Không thụ lý', reason: k2, method: 'Ký số', docNumber: '17/TB-UBND', docDate: '13/10/2026', file: f11 }],
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-411.pdf', url: '#' }],
        timeline: [
            sdxT('Tiếp nhận hồ sơ', '06/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
            sdxT('Trình Không thụ lý hồ sơ', '09/10/2026', 'Trình Lãnh đạo ký Thông báo không thụ lý (Mẫu 04/BTNN), lý do KTL_02.', SDX_CB),
            sdxT('Không thụ lý', '13/10/2026', 'Lãnh đạo ký số Thông báo không thụ lý số 17/TB-UBND. Vụ việc chuyển sang trạng thái [Không thụ lý].', 'Hà Minh Quân (Chủ tịch UBND phường)')
        ]
    });
    L.push(c11);

    // ===== 12. Không thụ lý - KTL_05 (Ký ngoài, không Số/Ngày văn bản) =====
    var k5 = 'Hồ sơ không đầy đủ theo quy định tại Điều 41 của Luật này mà người yêu cầu bồi thường không bổ sung trong thời hạn quy định tại khoản 3 Điều 42 của Luật này (Điểm đ Khoản 2 Điều 43)';
    var f12 = 'Thong_bao_khong_thu_ly_BT-2026-412_ky_ngoai.pdf';
    var c12 = sdxBase({
        assignedOfficer: '',
        id: 'SDX_KTL2', code: 'BT-2026-412', maVuViec: 'VVBT-2026-412', requestType: 'money',
        fieldGroup: 'hành chính', date: '01/10/2026', deadline: '30/11/2026', requestDocDate: '28/09/2026',
        nyc: 'Lương Thị Thu', nycBirth: '06/06/1992', nycCardNo: '001192004412', nycCardDate: '27/04/2022',
        nycPhone: '0966412412', nycEmail: 'luongthu92@gmail.com', nycPhuongXa: 'Phường Hai Bà Trưng', nycAddressDetail: 'Số 3 ngõ 105 Bạch Mai',
        hinhThucTiepNhan: 'Qua dịch vụ bưu chính',
        agency: 'UBND phường Hai Bà Trưng',
        docBase: 'Chưa cung cấp văn bản làm căn cứ yêu cầu bồi thường',
        hanhVi: 'Cưỡng chế thu hồi biển quảng cáo.',
        nhanQua: 'Thiệt hại biển quảng cáo và chi phí lắp đặt lại.',
        status: 'Không thụ lý', slaText: 'Không thụ lý hồ sơ',
        thietHaiList: sdxThiet([[1, 18000000]]),
        bosungLogs: [{ date: '03/10/2026', sender: SDX_CB, content: 'Bổ sung văn bản làm căn cứ yêu cầu bồi thường và tài liệu chứng minh thiệt hại.' }],
        ktlReasonCode: 'KTL_05', ktlReasonName: k5,
        ktlDetail: 'Đã có Thông báo yêu cầu bổ sung hồ sơ ngày 03/10/2026; hết thời hạn bổ sung người yêu cầu bồi thường không bổ sung văn bản làm căn cứ yêu cầu bồi thường.',
        rejectType: 'Không thụ lý', rejectReason: k5,
        rejectDate: '20/10/2026', rejectOfficer: SDX_CB, signingMethod: 'offline',
        signedFile: f12, ktlDocNumber: '', ktlDocDate: '',
        rejectionLog: [{ date: '20/10/2026', officer: SDX_CB, action: 'Không thụ lý', reason: k5, method: 'Ký ngoài', docNumber: '', docDate: '', file: f12 }],
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-412.pdf', url: '#' }],
        timeline: [
            sdxT('Tiếp nhận hồ sơ', '01/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường qua dịch vụ bưu chính.', 'Hệ thống / Người nộp đơn'),
            sdxT('Yêu cầu bổ sung', '03/10/2026', 'Ban hành Thông báo yêu cầu bổ sung hồ sơ (Mẫu 03/BTNN).', SDX_CB),
            sdxT('Ban hành Thông báo không thụ lý (Ký ngoài)', '20/10/2026', 'Ban hành văn bản Mẫu 04/BTNN đã ký ngoài hệ thống (' + f12 + '). Vụ việc chuyển sang trạng thái [Không thụ lý].', SDX_CB)
        ]
    });
    L.push(c12);
    return L;
}
// Dời toàn bộ ngày dd/mm/yyyy của dữ liệu mẫu theo số tháng chênh lệch với tháng 10/2026
function sdxShiftDates(list) {
    var now = new Date();
    var delta = (now.getFullYear() - SDX_BASE.y) * 12 + (now.getMonth() + 1 - SDX_BASE.m);
    if (!delta) return list;
    var json = JSON.stringify(list).replace(/\b(\d{2})\/(\d{2})\/(\d{4})\b/g, function (s, d, m, y) {
        var t = new Date(+y, +m - 1 + delta, 1);
        var last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
        return String(Math.min(+d, last)).padStart(2, '0') + '/' + String(t.getMonth() + 1).padStart(2, '0') + '/' + t.getFullYear();
    });
    return JSON.parse(json);
}
// Thêm dữ liệu mẫu vào claimsList (chỉ vụ việc chưa có; không ghi đè bản ghi đã có)
function sdxSeedClaims() {
    if (typeof claimsList === 'undefined' || !Array.isArray(claimsList)) return 0;
    var n = 0;
    var W = window.BTNN_WF;
    sdxShiftDates(sdxClaims()).forEach(function (c) {
        // Giữ Mã vụ việc mẫu trong sổ đăng ký trước khi hệ thống cấp mã cho hồ sơ chưa có (tránh cấp trùng)
        try {
            if (W && typeof W.vuViecOf === 'function') {
                var reg = W.vuViecOf(c.code, { create: false });
                if (reg) c.maVuViec = reg; else W.linkVuViec(c.code, c.maVuViec);
            }
        } catch (e) { /* mockup */ }
        var ex = claimsList.find(function (x) { return x && (x.id === c.id || x.code === c.code); });
        if (ex) {
            // Bổ sung lựa chọn Thu hồi kinh phí bồi thường đã chi cho vụ việc Đình chỉ mẫu đã lưu (chưa có lựa chọn)
            var th = SDX_DC_THUHOI[c.code];
            if (th && ex.code === c.code && ex.dinhChi && ex.dinhChi.thuHoi === undefined) Object.assign(ex.dinhChi, th);
            return;
        }
        claimsList.push(c);
        n++;
    });
    return n;
}
