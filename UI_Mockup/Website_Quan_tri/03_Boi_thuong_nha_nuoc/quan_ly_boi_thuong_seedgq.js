/*
 * Dữ liệu mẫu (giả lập) bổ sung - Giải quyết yêu cầu bồi thường (prefix sgq, Mã hồ sơ BT-2026-601 .. BT-2026-612)
 * Dùng chung bộ dựng hồ sơ của quan_ly_boi_thuong_seedxm.js (sxmBuild, SXM_WF, sxmSeedSubmit) -> nạp sau tệp seedxm.
 * - Chờ tiếp nhận: Cá nhân (601), Tổ chức (602) - cán bộ chủ trì mặc định Nguyễn Văn Chuyên Viên
 * - Xác minh thiệt hại (603), Thương lượng (604), Chờ ban hành QĐ (605), Chờ chi trả (606): đủ dữ liệu các bước trước
 *   (Thông báo thụ lý, Quyết định cử người, kết quả xác minh, biên bản thương lượng, Quyết định giải quyết bồi thường), cán bộ được cử: Nguyễn Văn Chuyên Viên
 * - Chờ duyệt theo Loại trình: Thông báo thụ lý hồ sơ (607), Thông báo Yêu cầu bổ sung (608), Thông báo Không thụ lý (609)
 * - Bị trả lại theo Loại trình: Thông báo thụ lý hồ sơ (610), Thông báo Yêu cầu bổ sung (611), Thông báo Không thụ lý (612)
 * Mã vụ việc VVBT- do ensureClaimsVuViec() của trang cấp theo sổ đăng ký chung (không trùng mã đã cấp).
 * Phiên bản dữ liệu mẫu: ?v= của tệp này tham gia gqSeedVersion() của trang -> đổi phiên bản thì nạp lại dữ liệu mẫu.
 */
var SGQ_VERSION = '20261029gq2';
var SGQ_CB = 'Nguyễn Văn Chuyên Viên';

(function () {
    if (typeof SXM_PERSONS === 'undefined' || typeof sxmBuild !== 'function') { console.warn('seedgq: thiếu quan_ly_boi_thuong_seedxm.js'); return; }
    Object.assign(SXM_PERSONS, {
        g1: { nyc: 'Vương Thị Thu Trang', nycBirth: '08/05/1987', nycCardNo: '001187006601', nycCardDate: '12/07/2021', nycPhone: '0912601601', nycEmail: 'thutrang.vuong@gmail.com', nycPhuongXa: 'Phường Kim Liên', nycAddressDetail: 'Số 14 ngõ 4B Đặng Văn Ngữ' },
        g3: { nyc: 'Khúc Văn Hiếu', nycBirth: '21/03/1980', nycCardNo: '001080005603', nycCardDate: '02/10/2021', nycPhone: '0903603603', nycEmail: 'khucvanhieu@gmail.com', nycPhuongXa: 'Phường Yên Hòa', nycAddressDetail: 'Số 7 Trung Kính' },
        g4: { nyc: 'Lục Thị Hồng Nhung', nycBirth: '15/09/1992', nycCardNo: '001192007604', nycCardDate: '25/04/2022', nycPhone: '0936604604', nycEmail: 'hongnhung.luc@gmail.com', nycPhuongXa: 'Phường Định Công', nycAddressDetail: 'Số 33 Định Công Thượng' },
        g5: { nyc: 'Mạc Đăng Khoa', nycBirth: '02/12/1976', nycCardNo: '001076004605', nycCardDate: '17/01/2022', nycPhone: '0983605605', nycEmail: 'macdangkhoa@gmail.com', nycPhuongXa: 'Phường Ngọc Hà', nycAddressDetail: 'Số 52 Hoàng Hoa Thám' },
        g6: { nyc: 'Nông Thị Bảo Ngân', nycBirth: '11/06/1989', nycCardNo: '001189003606', nycCardDate: '09/09/2021', nycPhone: '0977606606', nycEmail: 'baongan.nong@gmail.com', nycPhuongXa: 'Phường Phương Liệt', nycAddressDetail: 'Số 18 Trường Chinh' },
        g7: { nyc: 'Quách Văn Tuấn', nycBirth: '29/08/1983', nycCardNo: '001083002607', nycCardDate: '30/03/2021', nycPhone: '0913607607', nycEmail: 'quachtuan83@gmail.com', nycPhuongXa: 'Phường Hoàng Liệt', nycAddressDetail: 'Số 21 Linh Đường' },
        g8: { nyc: 'Thân Thị Diệu Linh', nycBirth: '04/01/1994', nycCardNo: '001194008608', nycCardDate: '06/06/2022', nycPhone: '0948608608', nycEmail: 'dieulinh.than@gmail.com', nycPhuongXa: 'Phường Văn Miếu - Quốc Tử Giám', nycAddressDetail: 'Số 9 Văn Miếu' },
        g9: { nyc: 'Ứng Văn Phong', nycBirth: '19/10/1978', nycCardNo: '001078001609', nycCardDate: '13/12/2021', nycPhone: '0966609609', nycEmail: 'ungvanphong@gmail.com', nycPhuongXa: 'Phường Khương Đình', nycAddressDetail: 'Số 40 Khương Đình' },
        g10: { nyc: 'Viên Thị Mỹ Hạnh', nycBirth: '23/07/1990', nycCardNo: '001190005610', nycCardDate: '20/05/2021', nycPhone: '0985610610', nycEmail: 'myhanh.vien@gmail.com', nycPhuongXa: 'Phường Láng', nycAddressDetail: 'Số 61 Chùa Láng' },
        g11: { nyc: 'Xa Văn Thắng', nycBirth: '07/02/1982', nycCardNo: '001082009611', nycCardDate: '28/08/2021', nycPhone: '0903611611', nycEmail: 'xavanthang@gmail.com', nycPhuongXa: 'Phường Thanh Liệt', nycAddressDetail: 'Số 5 Kim Giang' },
        g12: { nyc: 'Ninh Thị Thanh Tâm', nycBirth: '16/11/1986', nycCardNo: '001186004612', nycCardDate: '03/02/2022', nycPhone: '0976612612', nycEmail: 'thanhtam.ninh@gmail.com', nycPhuongXa: 'Phường Bồ Đề', nycAddressDetail: 'Số 88 Nguyễn Văn Cừ' }
    });
    Object.assign(SXM_ORGS, {
        go2: { nyc: 'Công ty TNHH Xây dựng Minh Đạt', nycOrgCode: '0109876602', nycRepName: 'Lê Minh Đạt', nycRepPosition: 'Giám đốc', nycPhone: '02437602602', nycEmail: 'lienhe@minhdat.vn', nycPhuongXa: 'Phường Tây Mỗ', nycAddressDetail: 'Số 15 Đại Mỗ' }
    });

    // Loại trình "Tiếp nhận hồ sơ" (Thông báo thụ lý - Mẫu 04/BTNN) và "Yêu cầu bổ sung" (Mẫu 03/BTNN)
    SXM_WF_TEXT.tn = { title: 'Thông báo thụ lý hồ sơ yêu cầu bồi thường', form: 'Mẫu số 04/BTNN', reason: 'Hồ sơ yêu cầu bồi thường hợp lệ, thuộc thẩm quyền giải quyết.', file: 'Mau_04_BTNN_Thong_bao_thu_ly_' };
    SXM_WF_TEXT.ycbs = { title: 'Văn bản yêu cầu bổ sung hồ sơ', form: 'Mẫu số 03/BTNN', reason: 'Đề nghị bổ sung bản sao văn bản làm căn cứ yêu cầu bồi thường có chứng thực và giấy tờ chứng minh thiệt hại.', file: 'Mau_03_BTNN_Yeu_cau_bo_sung_' };

    var DOC = 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 61/QĐ-XPHC ngày 12/08/2026';
    var HV = 'Xử phạt vi phạm hành chính, tạm giữ tang vật, phương tiện trái pháp luật.';
    var NQ = 'Tang vật, phương tiện bị hư hỏng; mất thu nhập trong thời gian bị tạm giữ.';
    // Hồ sơ trình qua kho luồng (Chờ duyệt / Bị trả lại)
    [
        { id: 'SGQ_CD_TN', code: 'BT-2026-607', who: 'g7', k: [6], base: 'tiep-nhan', kind: 'Tiếp nhận hồ sơ', result: 'Cử người giải quyết bồi thường', mode: 'submit', t: 'tn' },
        { id: 'SGQ_CD_YCBS', code: 'BT-2026-608', who: 'g8', k: [6], base: 'tiep-nhan', kind: 'Yêu cầu bổ sung', result: 'Yêu cầu bổ sung', mode: 'submit', t: 'ycbs' },
        { id: 'SGQ_CD_KTL', code: 'BT-2026-609', who: 'g9', k: [7], base: 'tiep-nhan', kind: 'Không thụ lý', result: 'Không thụ lý', mode: 'submit', t: 'ktl' },
        { id: 'SGQ_TL_TN', code: 'BT-2026-610', who: 'g10', k: [8], base: 'tiep-nhan', kind: 'Tiếp nhận hồ sơ', result: 'Cử người giải quyết bồi thường', mode: 'reject', t: 'tn', rejectReason: 'Thông báo thụ lý chưa ghi đủ thời hạn giải quyết theo Điều 47 Luật TNBTCNN; đề nghị bổ sung.' },
        { id: 'SGQ_TL_YCBS', code: 'BT-2026-611', who: 'g11', k: [8], base: 'tiep-nhan', kind: 'Yêu cầu bổ sung', result: 'Yêu cầu bổ sung', mode: 'reject', t: 'ycbs', rejectReason: 'Nội dung yêu cầu bổ sung chưa nêu rõ thời hạn người yêu cầu bồi thường phải bổ sung hồ sơ.' },
        { id: 'SGQ_TL_KTL', code: 'BT-2026-612', who: 'g12', k: [9], base: 'tiep-nhan', kind: 'Không thụ lý', result: 'Không thụ lý', mode: 'reject', t: 'ktl', rejectReason: 'Căn cứ không thụ lý chưa phù hợp: văn bản làm căn cứ yêu cầu bồi thường còn trong thời hiệu; đề nghị kiểm tra lại.' }
    ].forEach(function (p) { if (!SXM_WF.some(function (x) { return x.id === p.id; })) SXM_WF.push(p); });

    // Hồ sơ trạng thái xử lý (không qua phiếu trình)
    function sgqClaims() {
        var L = [];
        var ctn = function (c) { c.assignedOfficer = SGQ_CB; c.assignedOfficerPosition = 'Chuyên viên'; c.assignedOfficerUnit = c.agency; c.sgqSeed = SGQ_VERSION; return c; };
        L.push(ctn(sxmBuild({ id: 'SGQ_CTN1', code: 'BT-2026-601', who: 'g1', stage: 'tiep-nhan', k: [1], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: SXM_TH_A })));
        L.push(ctn(sxmBuild({ id: 'SGQ_CTN2', code: 'BT-2026-602', who: 'go2', stage: 'tiep-nhan', k: [2], hinhThuc: 'Qua dịch vụ bưu chính',
            docBase: 'Quyết định hủy Quyết định đình chỉ thi công xây dựng số 88/QĐ-UBND ngày 05/08/2026',
            hanhVi: 'Đình chỉ thi công công trình xây dựng đã được cấp phép không đúng quy định.', nhanQua: 'Công trình chậm tiến độ, phát sinh chi phí thuê máy móc, nhân công.', th: SXM_TH_B })));
        L.push(sxmBuild({ id: 'SGQ_XM', code: 'BT-2026-603', who: 'g3', stage: 'xac-minh', k: [5, 3], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: SXM_TH_C }));
        L.push(sxmBuild({ id: 'SGQ_TL', code: 'BT-2026-604', who: 'g4', stage: 'thuong-luong', k: [7, 5, 2], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: SXM_TH_A }));
        L.push(sxmBuild({ id: 'SGQ_QD', code: 'BT-2026-605', who: 'g5', stage: 'cho-qd', k: [9, 7, 4, 2], bank: ['0011000605605', 'Vietcombank', 'Chi nhánh Hà Nội'], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: SXM_TH_C }));
        L.push(sxmBuild({ id: 'SGQ_CT', code: 'BT-2026-606', who: 'g6', stage: 'cho-thuc-thi', k: [11, 9, 6, 4, 2], bank: ['1500205606606', 'Agribank', 'Chi nhánh Đống Đa'], docBase: DOC, hanhVi: HV, nhanQua: NQ, th: SXM_TH_A }));
        L.forEach(function (c) { c.sgqSeed = SGQ_VERSION; });
        return L;
    }
    // Dữ liệu đã trình (lưu cùng hồ sơ) của hồ sơ Chờ duyệt / Bị trả lại Loại trình Thông báo thụ lý / Yêu cầu bổ sung
    function sgqDecorate(c) {
        var p = SXM_WF.find(function (x) { return x.id === c.id; });
        if (!p || c.id.indexOf('SGQ_') !== 0) return c;
        c.sgqSeed = SGQ_VERSION;
        // Cán bộ được phân công xử lý hồ sơ (bước trước Cử người): cán bộ giả lập mặc định
        c.assignedOfficer = SGQ_CB; c.assignedOfficerPosition = 'Chuyên viên'; c.assignedOfficerUnit = c.agency;
        var d = c.date;
        if (p.t === 'tn') c.thongBaoThuLy = { soKyHieu: '', ngay: '', noiNhan: [], fileName: SXM_WF_TEXT.tn.file + c.code + '.pdf', formNo: 'Mẫu số 04/BTNN', signingMethod: 'Ký số', submittedAt: d };
        if (p.t === 'ycbs') {
            c.additionRequestContent = SXM_WF_TEXT.ycbs.reason;
            c.rejectType = 'Yêu cầu bổ sung'; c.rejectReason = SXM_WF_TEXT.ycbs.reason;
            c.trinhDuyet = { type: 'Yêu cầu bổ sung', docNumber: '', docDate: '', reason: SXM_WF_TEXT.ycbs.reason, file: { name: SXM_WF_TEXT.ycbs.file + c.code + '.pdf' }, submitContent: 'Kính trình Lãnh đạo ký duyệt văn bản yêu cầu bổ sung hồ sơ.', submitDate: d, submitOfficer: SGQ_CB };
        }
        return c;
    }
    var origClaims = sxmClaims, origWf = sxmWfClaims;
    sxmClaims = function () { return origClaims().concat(sgqClaims()); };
    sxmWfClaims = function () { return origWf().map(sgqDecorate); };
})();
