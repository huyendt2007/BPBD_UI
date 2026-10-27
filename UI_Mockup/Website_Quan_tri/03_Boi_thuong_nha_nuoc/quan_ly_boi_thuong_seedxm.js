/*
 * Dữ liệu mẫu (giả lập) bổ sung đủ các Trạng thái vụ việc - Giải quyết yêu cầu bồi thường (prefix sxm, Mã hồ sơ BT-2026-501 .. BT-2026-522)
 * - Xác minh thiệt hại: Tổ chức mới vào bước (501); Cá nhân, Cả hai (có PHDD), đã lưu dở kết quả xác minh lần 1 (502); Cá nhân mới vào bước (503)
 * - Thương lượng: mới vào bước (504); Tổ chức, đã nhập dở biên bản thương lượng (505)
 * - Chờ chi trả: Cá nhân (506), Tổ chức (507) - đã ban hành Quyết định giải quyết bồi thường
 * - Chờ duyệt theo Nội dung trình: Hoãn GQBT (508), Không thụ lý (509), Tiếp tục GQBT (510), Cử người GQBT (511), Hủy QĐ (512), Sửa chữa, bổ sung QĐ (513)
 * - Bị từ chối theo Nội dung trình: Tạm đình chỉ (514), Không thụ lý (515), Hoãn GQBT (516), Cử người GQBT (517), Quyết định GQBT (518),
 *   Chuyển CQGQBT (519), Tiếp tục GQBT (520), Hủy QĐ (521), Sửa chữa, bổ sung QĐ (522)
 * Cơ chế nạp:
 * - Bổ sung vào claimsList sau sdxSeedClaims() theo id / Mã hồ sơ (chỉ thêm bản ghi chưa có, không ghi đè bản ghi đã có).
 * - Mã vụ việc VVBT- do ensureClaimsVuViec() của trang cấp theo sổ đăng ký chung (btnn_vuviec_registry_v1); không cố định số để không trùng mã đã cấp.
 * - Ngày tiếp nhận tính lùi từ hôm nay (không trước ngày 01 của tháng hiện tại -> qua bộ lọc Ngày tiếp nhận mặc định); không có ngày sau hôm nay.
 * - Chờ duyệt / Bị từ chối: trình (và từ chối) phiếu trình qua kho luồng dùng chung khi tải trang nếu hồ sơ luồng chưa ở bước trình.
 * - Dời ngày tiếp nhận các hồ sơ Thương lượng / Chờ chi trả mẫu đã có (HS1, HS2, HS3, HS3_A, HS3_B, SDX_TCPH3, HDCV_HGQ_TT) về gần hôm nay;
 *   giữ nguyên trạng thái và nội dung nghiệp vụ.
 */
var SXM_VERSION = '20261027th6'; // [th2c] dữ liệu thiệt hại theo mục chi tiết DM_27
var SXM_KEY_WF = 'btnn_gq_seedxm_wf_v1';
var SXM_STP = 'Sở Tư pháp Hà Nội';

function sxmFmt(d) { return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); }
function sxmToday() { var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
// Ngày trong quy trình: hôm nay - k ngày, không trước ngày 01 của tháng hiện tại
function sxmD(k) {
    var t = sxmToday();
    var d = new Date(t.getFullYear(), t.getMonth(), t.getDate() - k);
    var m1 = new Date(t.getFullYear(), t.getMonth(), 1);
    return sxmFmt(d < m1 ? m1 : d);
}
// Ngày trước khi tiếp nhận (ngày văn bản yêu cầu): không giới hạn đầu tháng
function sxmRaw(k) { var t = sxmToday(); return sxmFmt(new Date(t.getFullYear(), t.getMonth(), t.getDate() - k)); }
function sxmParse(s) { var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(s || '')); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
function sxmAddDays(s, n) { var d = sxmParse(s); return d ? sxmFmt(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)) : s; }

// Người yêu cầu bồi thường mẫu
var SXM_PERSONS = {
    p1: { nyc: 'Nguyễn Thị Thanh Hà', nycBirth: '12/04/1985', nycCardNo: '001185009502', nycCardDate: '15/06/2021', nycPhone: '0912502502', nycEmail: 'thanhha.nguyen@gmail.com', nycPhuongXa: 'Phường Láng', nycAddressDetail: 'Số 12 ngõ 75 Láng Hạ' },
    p2: { nyc: 'Trịnh Văn Long', nycBirth: '03/09/1979', nycCardNo: '001079006503', nycCardDate: '22/02/2022', nycPhone: '0904503503', nycEmail: 'trinhlong79@gmail.com', nycPhuongXa: 'Phường Hoàn Kiếm', nycAddressDetail: 'Số 8 Hàng Bông' },
    p3: { nyc: 'Phạm Thị Mai Anh', nycBirth: '27/01/1993', nycCardNo: '001193004504', nycCardDate: '10/03/2021', nycPhone: '0936504504', nycEmail: 'maianh.pham@gmail.com', nycPhuongXa: 'Phường Đống Đa', nycAddressDetail: 'Số 45 Tôn Đức Thắng' },
    p4: { nyc: 'Lê Quang Huy', nycBirth: '18/11/1981', nycCardNo: '001081007506', nycCardDate: '05/08/2021', nycPhone: '0983506506', nycEmail: 'lequanghuy81@gmail.com', nycPhuongXa: 'Phường Ba Đình', nycAddressDetail: 'Số 20 Đội Cấn' },
    p5: { nyc: 'Đoàn Thị Ngọc Lan', nycBirth: '09/07/1988', nycCardNo: '001188003508', nycCardDate: '14/04/2022', nycPhone: '0977508508', nycEmail: 'ngoclan.doan@gmail.com', nycPhuongXa: 'Phường Thanh Xuân', nycAddressDetail: 'Số 3 ngõ 41 Nguyễn Trãi' },
    p6: { nyc: 'Cao Minh Tâm', nycBirth: '30/05/1975', nycCardNo: '001075002509', nycCardDate: '19/12/2021', nycPhone: '0913509509', nycEmail: 'caominhtam@gmail.com', nycPhuongXa: 'Phường Hai Bà Trưng', nycAddressDetail: 'Số 66 Lò Đúc' },
    p7: { nyc: 'Hồ Thị Kim Oanh', nycBirth: '22/02/1990', nycCardNo: '001190008510', nycCardDate: '02/09/2021', nycPhone: '0948510510', nycEmail: 'kimoanh.ho@gmail.com', nycPhuongXa: 'Phường Tây Hồ', nycAddressDetail: 'Số 15 Xuân Diệu' },
    p8: { nyc: 'Mai Xuân Trường', nycBirth: '14/10/1983', nycCardNo: '001083001511', nycCardDate: '28/07/2022', nycPhone: '0966511511', nycEmail: 'maixuantruong@gmail.com', nycPhuongXa: 'Phường Hoàng Mai', nycAddressDetail: 'Số 9 ngõ 120 Lĩnh Nam' },
    p9: { nyc: 'Tạ Thị Bích Ngọc', nycBirth: '06/12/1991', nycCardNo: '001191005512', nycCardDate: '11/11/2021', nycPhone: '0985512512', nycEmail: 'bichngoc.ta@gmail.com', nycPhuongXa: 'Phường Long Biên', nycAddressDetail: 'Số 27 Nguyễn Văn Cừ' },
    p10: { nyc: 'Đinh Công Thành', nycBirth: '25/03/1978', nycCardNo: '001078009513', nycCardDate: '07/05/2021', nycPhone: '0903513513', nycEmail: 'dinhcongthanh@gmail.com', nycPhuongXa: 'Phường Cầu Giấy', nycAddressDetail: 'Số 101 Trần Duy Hưng' },
    p11: { nyc: 'Lương Văn Đạt', nycBirth: '17/08/1986', nycCardNo: '001086004514', nycCardDate: '23/03/2022', nycPhone: '0919514514', nycEmail: 'luongvandat@gmail.com', nycPhuongXa: 'Phường Nghĩa Đô', nycAddressDetail: 'Số 5 ngõ 2 Hoàng Quốc Việt' },
    p12: { nyc: 'Vương Thị Hồng', nycBirth: '01/06/1980', nycCardNo: '001180006515', nycCardDate: '16/10/2021', nycPhone: '0972515515', nycEmail: 'vuonghong80@gmail.com', nycPhuongXa: 'Phường Kim Liên', nycAddressDetail: 'Số 18 Phạm Ngọc Thạch' },
    p13: { nyc: 'Kiều Văn Nghĩa', nycBirth: '29/09/1977', nycCardNo: '001077003516', nycCardDate: '04/01/2022', nycPhone: '0934516516', nycEmail: 'kieuvannghia@gmail.com', nycPhuongXa: 'Phường Thịnh Liệt', nycAddressDetail: 'Số 7 Giải Phóng' },
    p14: { nyc: 'Nông Thị Hải Yến', nycBirth: '13/03/1994', nycCardNo: '001194002517', nycCardDate: '20/06/2022', nycPhone: '0961517517', nycEmail: 'haiyen.nong@gmail.com', nycPhuongXa: 'Phường Yên Hòa', nycAddressDetail: 'Số 33 Yên Hòa' },
    p15: { nyc: 'Quách Văn Phúc', nycBirth: '08/08/1982', nycCardNo: '001082008518', nycCardDate: '30/09/2021', nycPhone: '0917518518', nycEmail: 'quachphuc82@gmail.com', nycPhuongXa: 'Phường Phương Liệt', nycAddressDetail: 'Số 14 Trường Chinh' },
    p16: { nyc: 'La Thị Thu Hương', nycBirth: '21/04/1987', nycCardNo: '001187001519', nycCardDate: '12/02/2022', nycPhone: '0988519519', nycEmail: 'thuhuong.la@gmail.com', nycPhuongXa: 'Phường Ô Chợ Dừa', nycAddressDetail: 'Số 2 ngõ 180 Xã Đàn' },
    p17: { nyc: 'Bạch Văn Sơn', nycBirth: '15/12/1976', nycCardNo: '001076005520', nycCardDate: '25/11/2021', nycPhone: '0905520520', nycEmail: 'bachvanson@gmail.com', nycPhuongXa: 'Phường Văn Miếu', nycAddressDetail: 'Số 40 Quốc Tử Giám' },
    p18: { nyc: 'Ninh Thị Phương', nycBirth: '04/05/1989', nycCardNo: '001189007521', nycCardDate: '09/07/2022', nycPhone: '0942521521', nycEmail: 'ninhphuong89@gmail.com', nycPhuongXa: 'Phường Giảng Võ', nycAddressDetail: 'Số 11 Giảng Võ' },
    p19: { nyc: 'Âu Đức Mạnh', nycBirth: '19/02/1984', nycCardNo: '001084009522', nycCardDate: '18/08/2021', nycPhone: '0976522522', nycEmail: 'auducmanh@gmail.com', nycPhuongXa: 'Phường Bạch Mai', nycAddressDetail: 'Số 6 ngõ 191 Bạch Mai' }
};
var SXM_ORGS = {
    o1: { nyc: 'Công ty TNHH Thương mại Dịch vụ An Khang', nycOrgCode: '0108765501', nycRepName: 'Nguyễn Đức An', nycRepPosition: 'Giám đốc', nycPhone: '02437501501', nycEmail: 'lienhe@ankhang.vn', nycPhuongXa: 'Phường Cầu Giấy', nycAddressDetail: 'Tầng 3, số 22 Duy Tân' },
    o2: { nyc: 'Công ty Cổ phần Vận tải Hồng Phúc', nycOrgCode: '0105432505', nycRepName: 'Trần Hồng Phúc', nycRepPosition: 'Tổng Giám đốc', nycPhone: '02438505505', nycEmail: 'info@hongphucvt.vn', nycPhuongXa: 'Phường Hoàng Mai', nycAddressDetail: 'Số 168 Tam Trinh' },
    o3: { nyc: 'Hợp tác xã Nông nghiệp Xuân Phương', nycOrgCode: '0106677507', nycRepName: 'Đỗ Văn Xuân', nycRepPosition: 'Giám đốc', nycPhone: '02437507507', nycEmail: 'htxxuanphuong@gmail.com', nycPhuongXa: 'Phường Xuân Phương', nycAddressDetail: 'Số 12 Phương Canh' }
};
function sxmOrg(o) {
    return Object.assign({ nycType: 'Tổ chức', nycCardNo: '', cardNo: '', nycCardDate: '', nycBirth: '', nycOrgDocNo: '', nycOrgDocDate: '', nycOrgDocPlace: '', notifyMethod: 'Qua thư điện tử', notifyAddress: o.nycEmail }, o);
}

// Bước đã qua: tiếp nhận -> thụ lý / cử người -> xác minh -> thương lượng -> ban hành QĐ
var SXM_STAGES = ['tiep-nhan', 'cu-nguoi', 'xac-minh', 'thuong-luong', 'cho-qd', 'cho-thuc-thi'];
var SXM_STAGE_STATUS = { 'tiep-nhan': 'Chờ tiếp nhận', 'cu-nguoi': 'Cử người giải quyết bồi thường', 'xac-minh': 'Xác minh thiệt hại', 'thuong-luong': 'Thương lượng', 'cho-qd': 'Chờ ban hành QĐ', 'cho-thuc-thi': 'Chờ chi trả' };
var SXM_SLA = { 'tiep-nhan': 'Chờ tiếp nhận hồ sơ bồi thường', 'cu-nguoi': 'Chờ Thủ trưởng cử người giải quyết bồi thường', 'xac-minh': 'Đang xác minh thiệt hại', 'thuong-luong': 'Đang thương lượng việc bồi thường', 'cho-qd': 'Chờ ban hành quyết định giải quyết bồi thường', 'cho-thuc-thi': 'Chờ chi trả tiền bồi thường' };

// o: { id, code, who (SXM_PERSONS / SXM_ORGS key), stage, k: [tiếp nhận, thụ lý, xác minh, thương lượng, QĐ] (số ngày lùi từ hôm nay),
//      agency, requestType, fieldGroup, hanhVi, nhanQua, docBase, th: [[type, đề nghị, xác minh, ghi chú]], xmDraft, tlDraft, bank }
function sxmBuild(o) {
    var who = SXM_PERSONS[o.who] ? Object.assign({}, SXM_PERSONS[o.who]) : sxmOrg(SXM_ORGS[o.who]);
    var k = o.k, d0 = sxmD(k[0]), reach = SXM_STAGES.indexOf(o.stage);
    var agency = o.agency || SXM_STP;
    var c = sdxBase(Object.assign(who, {
        id: o.id, code: o.code, maVuViec: '', requestType: o.requestType || 'money', sxmSeed: SXM_VERSION,
        fieldGroup: o.fieldGroup || 'hành chính', date: d0, deadline: sxmAddDays(d0, 60), requestDocDate: sxmRaw(k[0] + 3),
        hinhThucTiepNhan: o.hinhThuc || 'Trực tiếp', agency: agency,
        docBase: o.docBase, vanBanCanCu: [{ name: o.docBase, file: 'Van_ban_can_cu_' + o.code + '.pdf' }],
        hanhVi: o.hanhVi, nhanQua: o.nhanQua,
        status: SXM_STAGE_STATUS[o.stage], slaDays: 10, slaText: SXM_SLA[o.stage],
        thietHaiList: sdxThiet(o.th.map(function (r) { return reach >= 3 ? r : [r[0], r[1], undefined, undefined, r[4]]; }), reach >= 3 ? sxmD(k[2]) : ''),
        files: [{ name: 'Van_ban_yeu_cau_boi_thuong_' + o.code + '.pdf', url: '#' }]
    }));
    // [lth] Loại thiệt hại bổ sung tại bước Xác minh (không có trong yêu cầu): o.bs = [[type, Mức xác minh, Nội dung diễn giải]]
    (o.bs || []).forEach(function (b) { c.thietHaiList.push(sxmBs(b, reach >= 3 ? sxmD(k[2]) : '')); });
    if (who.nycType === 'Tổ chức') { c.nycCardNo = ''; c.cardNo = ''; }
    if (c.requestType === 'both') {
        Object.assign(c, { phddStatus: 'Đang thực hiện', phddForm: 'Tổ chức trực tiếp xin lỗi và cải chính công khai', phddFormApology: true, phddFormNews: false });
    }
    var vt = c.nycType === 'Tổ chức' ? 'Tổ chức nộp' : 'Tiếp nhận';
    c.timeline = [sdxT('Tiếp nhận hồ sơ', d0, vt + ' văn bản yêu cầu bồi thường ' + (c.hinhThucTiepNhan === 'Trực tiếp' ? 'trực tiếp' : String(c.hinhThucTiepNhan).toLowerCase()) + '.', 'Hệ thống / Người nộp đơn')];
    if (reach >= 1) {
        c.timeline.push(sdxT('Trình Tiếp nhận hồ sơ', d0, 'Cán bộ kiểm tra tính hợp lệ của hồ sơ, trình Lãnh đạo tiếp nhận.', SDX_CB));
        c.timeline.push(sdxT('Tiếp nhận hồ sơ (Phê duyệt)', d0, 'Lãnh đạo phê duyệt tiếp nhận hồ sơ. Hồ sơ chuyển sang trạng thái [Cử người giải quyết bồi thường].', 'Trần Văn Bồi Thường (Trưởng phòng)'));
    }
    if (reach >= 2) {
        var d1 = sxmD(k[1]), no = (60 + Number(o.code.slice(-3)) % 100) + '/TB-STP';
        c.appointedOfficers = sdxAppointed(agency, d1);
        c.qdCuNguoi = { signedFile: 'QD_cu_nguoi_giai_quyet_' + o.code + '_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: agency }] };
        c.thongBaoThuLy = { signingMethod: 'Ký số', issuedAt: d1, soKyHieu: no, ngay: d1, fileName: 'Thong_bao_thu_ly_' + o.code + '.pdf' };
        c.timeline.push(sdxT('Thông báo thụ lý hồ sơ', d1, 'Lãnh đạo ký số Thông báo thụ lý số ' + no + ' (Mẫu 05/BTNN).', 'Lê Hoàng Nam (Cục trưởng)'));
        c.timeline.push(sdxT('Cử người giải quyết bồi thường', d1, 'Quyết định cử ông Nguyễn Văn Chuyên Viên giải quyết bồi thường (Mẫu 06/BTNN). Hồ sơ chuyển sang trạng thái [Xác minh thiệt hại].', 'Lê Hoàng Nam (Cục trưởng)'));
    }
    if (reach >= 3) {
        sdxXm(c, sxmD(k[2]));
        // [xmbc] Thỏa thuận kéo dài thời gian xác minh có Đến ngày (BT-2026-504); tài liệu "Báo cáo kết quả xác minh" của dữ liệu cũ được quy đổi vào khối Báo cáo xác minh
        if (o.code === 'BT-2026-504') { c.xmExtend = { on: true, from: sxmD(k[2] + 5), to: sxmD(k[2]) }; c.xmTimeExtension = 'Từ ngày ' + c.xmExtend.from + ' đến ngày ' + c.xmExtend.to; }
        c.timeline.push(sdxT('Xác minh thiệt hại', sxmD(k[2]), 'Hoàn thành xác minh thiệt hại thực tế. Tổng Mức xác minh: ' + sdxMoney(c.xmTotalAmount) + ' đ. Hồ sơ chuyển sang trạng thái [Thương lượng].', SDX_CB));
    }
    if (reach >= 4) {
        sdxNeg(c, sxmD(k[3]), o.bank ? { bankAccount: o.bank[0], bankName: o.bank[1], bankBranch: o.bank[2] } : null);
        c.timeline.push(sdxT('Thương lượng bồi thường', sxmD(k[3]), 'Thương lượng thành công, lập Biên bản thương lượng. Hồ sơ chuyển sang trạng thái [Chờ ban hành QĐ].', SDX_CB));
    }
    if (reach >= 5) {
        var qd = (100 + Number(o.code.slice(-3)) % 100) + '/QĐ-STP';
        sdxDec(c, qd, sxmD(k[4]), 'Lê Hoàng Nam', 'Cục trưởng');
        c.timeline.push(sdxT('Ban hành Quyết định giải quyết bồi thường', sxmD(k[4]), 'Lãnh đạo ký số Quyết định giải quyết bồi thường số ' + qd + '. Hồ sơ chuyển sang trạng thái [Chờ chi trả].', 'Lê Hoàng Nam (Cục trưởng)'));
    }
    return c;
}
// [lth] 01 loại thiệt hại bổ sung tại bước Xác minh: Mức đề xuất = 0, cờ bs / bsStep phân biệt với loại theo yêu cầu
function sxmBs(b, xmDate) {
    var it = { type: b[0], code: b[0], group: window.BTNN_TH ? BTNN_TH.groupOf(b[0]) : '', calc: '', val: 0, bs: true, bsStep: 'xm', bsXm: b[1] };
    if (xmDate) {
        Object.assign(it, { xmVal: b[1], xmNote: b[2] || '', xmDate: xmDate, xmPlace: 'Trụ sở cơ quan giải quyết bồi thường', xmMembers: 'Tổ xác minh thiệt hại',
            xmMethodText: 'Làm việc trực tiếp với người yêu cầu bồi thường, đối chiếu chứng từ phát sinh', xmCalculation: 'Theo chứng từ thực tế' });
    }
    return it;
}
// Lưu dở kết quả xác minh (lần 1, chưa Hoàn thành xác minh)
function sxmXmDraft(c, dk) {
    var d = sxmD(dk);
    var members = 'Nguyễn Văn Chuyên Viên - Chuyên viên - ' + c.agency + '; ' + c.nyc + ' - Người yêu cầu bồi thường';
    var done = 0;
    // Lần 1 đã lưu (chưa bấm Hoàn thành xác minh): mục thu nhập mới tạm tính, chờ chứng từ bổ sung
    var notes = { 1: ['Đối chiếu hóa đơn, chứng từ; khấu hao theo thời gian sử dụng', 'Giá trị còn lại theo hóa đơn mua sắm', 0.9],
        2: ['Tạm tính theo mức lương tối thiểu vùng; chờ bảng lương, xác nhận thu nhập', 'Thu nhập bình quân tháng x số tháng bị tạm giam', 0.75],
        5: ['Tạm tính theo mức lương cơ sở x số ngày bị tạm giam', 'Theo Điều 27 Luật TNBTCNN', 1], 6: ['Theo chứng từ chi phí đi lại, thuê luật sư', 'Theo chứng từ thực tế', 1] };
    c.thietHaiList.forEach(function (it) {
        var n = notes[window.BTNN_TH && BTNN_TH.group(it.type) ? BTNN_TH.group(it.type).no : it.type] || ['Đối chiếu chứng từ', 'Theo chứng từ thực tế', 1];
        it.xmVal = it.bs ? (Number(it.bsXm) || 0) : Math.round(it.val * n[2]);
        it.xmNote = it.bs ? 'Bổ sung khi xác minh: chi phí khám, điều trị có hóa đơn, chứng từ' : n[0];
        it.xmDate = d; it.xmPlace = 'Trụ sở ' + c.agency; it.xmMembers = members;
        it.xmMethodText = 'Đối chiếu hóa đơn, chứng từ và làm việc trực tiếp với người yêu cầu bồi thường';
        it.xmCalculation = n[1];
        done += it.xmVal;
    });
    var parts = [{ name: SDX_CB, position: 'Chuyên viên', unit: c.agency }, { name: 'Phạm Quốc Hùng', position: 'Trưởng phòng', unit: c.agency }];
    // [xmbc] Báo cáo xác minh thiệt hại (trả cho người yêu cầu bồi thường) tách khỏi tài liệu kèm theo khác (nội bộ)
    var report = [{ name: 'Bao_cao_xac_minh_thiet_hai_lan_1_' + c.code + '.pdf', url: '#', title: 'Báo cáo xác minh thiệt hại (lần 1)', size: '415 KB', shareNyc: true, dvcSync: false }];
    var files = [{ name: 'Bien_ban_xac_minh_thiet_hai_lan_1_' + c.code + '.pdf', url: '#', title: 'Biên bản xác minh thiệt hại (lần 1)', size: '342 KB' },
        { name: 'Hoa_don_chung_tu_tai_san_' + c.code + '.pdf', url: '#', title: 'Hóa đơn, chứng từ chứng minh thiệt hại tài sản', size: '518 KB' }];
    c.xmHistory = [{
        lan: 1, at: d + ' 16:30', by: SDX_CB,
        items: c.thietHaiList.map(function (it) {
            return { type: it.type, name: it.name || sdxThName(it.type), bs: !!it.bs, reqVal: Number(it.val) || 0, xmVal: it.xmVal !== undefined ? it.xmVal : 0, xmNote: it.xmNote || '', xmDate: it.xmDate || '', xmPlace: it.xmPlace || '', xmMembers: it.xmMembers || '', xmMethodText: it.xmMethodText || '', xmCalculation: it.xmCalculation || '' };
        }),
        participants: parts, total: done,
        timeExtension: 'Từ ngày ' + sxmRaw(20), xmExtend: { on: true, from: sxmRaw(20), to: '' }, // [xmbc] kéo dài: Từ ngày ở quá khứ, không có Đến ngày
        otherInfo: 'Đang chờ người yêu cầu bồi thường cung cấp bảng lương, xác nhận thu nhập để xác minh mục thu nhập bị mất.',
        reportFiles: report, files: files, completed: false
    }];
    c.xmRequiredDocs = { thuly: 'Thong_bao_thu_ly_' + c.code + '.pdf', cuNguoi: 'QD_cu_nguoi_giai_quyet_' + c.code + '_da_ky.pdf' };
    c.xmTotalAmount = done;
    c.xmTimeExtension = c.xmHistory[0].timeExtension;
    c.xmOtherRelatedInfo = c.xmHistory[0].otherInfo;
    c.verificationParticipants = parts;
    c.xmFiles = files;
    c.xmReportFiles = report;
    c.xmExtend = c.xmHistory[0].xmExtend;
    c.timeline.push({ title: 'Lưu kết quả xác minh thiệt hại', date: d, desc: 'Lưu kết quả xác minh thiệt hại lần 1. Tổng Mức xác minh hiện hành: ' + sdxMoney(done) + ' đ.', status: 'completed', officer: SDX_CB });
    return c;
}
// Nhập dở biên bản thương lượng: đã gửi giấy mời, kết quả mới có ở một phần hạng mục
function sxmTlDraft(c, dk) {
    var d = sxmD(dk);
    c.negotiation = {
        participation: 'DONG_Y', decision: 'Đồng ý thương lượng', date: d, place: 'Phòng họp số 2 - ' + c.agency,
        participants: sdxOfficials(c.agency), claimantParticipants: [{ name: c.nycRepName || c.nyc, idNo: c.nycCardNo || '', address: c.nycAddressDetail || '' }],
        items: c.verifiedItems.map(function (v, i) {
            // [tlst] Bản nháp có đủ 03 Trạng thái thương lượng: Thành công / Không thành công / Không tiếp tục thương lượng; các mục còn lại chưa chọn
            var b = { key: v.key, label: v.label, proposed: v.proposed, verified: v.verified };
            if (i === 0) return Object.assign(b, { agreed: v.verified, status: 'Thành công', reason: '' });
            if (i === 1) return Object.assign(b, { agreed: 0, status: 'Không thành công', reason: 'Hai bên chưa thống nhất mức bồi thường do khác biệt về giá trị thẩm định.' });
            if (i === 2) return Object.assign(b, { agreed: 0, status: 'Không tiếp tục thương lượng', reason: 'Người yêu cầu bồi thường đề nghị không tiếp tục thương lượng mục này.' });
            return Object.assign(b, { agreed: '', status: '', reason: '' });
        }),
        payment: { method: '', receiverName: '', receiverIdNo: '', receiverAddress: '', bankUser: '', bankAccount: '', bankName: '', bankBranch: '' },
        otherRights: '', otherRequests: 'Người yêu cầu bồi thường đề nghị thương lượng tiếp mục còn lại sau khi bổ sung chứng từ.',
        docs: [{ name: 'Giấy mời tham gia thương lượng', file: 'Giay_moi_thuong_luong_' + c.code + '.pdf' }],
        savedAt: d + ' 10:15', savedBy: SDX_CB, draft: true,
        // [tltt] Thông tin thỏa thuận khác: có tích cả 02 thỏa thuận; [t89] kéo dài thương lượng chỉ có Từ ngày (demo không có Đến ngày)
        extend: { on: true, from: d, to: '' },
        earlyEffect: { on: true, text: 'kể từ ngày ký' }
    };
    c.timeline.push({ title: 'Tổ chức thương lượng (lần 1)', date: d, desc: 'Gửi Giấy mời và tổ chức thương lượng lần 1; đã thống nhất 01 hạng mục, các hạng mục còn lại thương lượng tiếp.', status: 'completed', officer: SDX_CB });
    return c;
}

// Dữ liệu Hoãn giải quyết / Tạm đình chỉ đã ban hành (trước khi trình Tiếp tục giải quyết)
function sxmPaused(c, type, dk, prev) {
    var d = sxmD(dk), vv = c.code;
    if (type === 'hgq') {
        var f = 'Mau_22_BTNN_Quyet_dinh_hoan_' + vv + '_da_ky.pdf';
        var reason = 'Chờ kết quả giám định tài sản của tổ chức thẩm định giá.';
        c.hoanGiaiQuyet = { reason: reason, fromDate: d, toDate: sxmAddDays(d, 20), days: 20, docNumber: '52/QĐ-STP', docDate: d, fileName: f, signedFile: f, formNo: 'Mẫu số 22/BTNN', signingMethod: 'Ký số', previousStatus: prev, issuedAt: d };
        c.specialStatusLogs = [{ type: 'Hoãn giải quyết', docNo: '52/QĐ-STP', docDate: d, signMode: 'Ký số', startDate: d, endDate: sxmAddDays(d, 20), previousStatus: prev, reason: reason, files: [{ name: f, size: '296 KB', url: '#' }], attachments: [], createdAt: d }];
        c.status = 'Hoãn giải quyết'; c.slaStatus = 'warning'; c.slaText = 'Tạm dừng tính thời hạn xử lý do phát sinh hoãn giải quyết';
        c.timeline.push(sdxT('Ký duyệt Quyết định hoãn giải quyết bồi thường', d, 'Lãnh đạo ký số Quyết định số 52/QĐ-STP. Vụ việc chuyển sang trạng thái [Hoãn giải quyết].', 'Lê Hoàng Nam (Cục trưởng)'));
    } else {
        var tf = 'Quyet_dinh_tam_dinh_chi_' + vv + '_da_ky.pdf';
        var tr = 'Chờ kết quả giải quyết vụ án hành chính có liên quan tại Tòa án nhân dân TP. Hà Nội.';
        c.tamDinhChi = { reason: tr, date: d, docNumber: '18/QĐ-STP', docDate: d, fileName: tf, signedFile: tf, formNo: '', signingMethod: 'Ký số', previousStatus: prev, issuedAt: d };
        c.specialStatusLogs = [{ type: 'Tạm đình chỉ', docNo: '18/QĐ-STP', docDate: d, signMode: 'Ký số', startDate: d, endDate: '', previousStatus: prev, reason: tr, files: [{ name: tf, size: '352 KB', url: '#' }], attachments: [], createdAt: d }];
        c.status = 'Tạm đình chỉ'; c.slaStatus = 'warning'; c.slaText = 'Tạm dừng tính thời hạn xử lý do tạm đình chỉ';
        c.timeline.push(sdxT('Ký duyệt Quyết định tạm đình chỉ giải quyết bồi thường', d, 'Lãnh đạo ký số Quyết định số 18/QĐ-STP. Vụ việc chuyển sang trạng thái [Tạm đình chỉ].', 'Lê Hoàng Nam (Cục trưởng)'));
    }
    c.specialStatusPreviousStatus = prev; c.hgqPrevStatus = prev;
    return c;
}

var SXM_DOC = {
    hgq: 'Ngày 15/08/2026, Tòa án nhân dân Thành phố Hà Nội tuyên hủy Quyết định cưỡng chế số 205/QĐ-CC',
    ktl: 'Bản án hành chính số 41/2026/HC-ST ngày 02/09/2026 của Tòa án nhân dân Thành phố Hà Nội'
};
// [th2c] Thiệt hại theo mục chi tiết DM_27 (02-03 nhóm, nhiều mục / nhóm): [mã mục, Số tiền yêu cầu, Mức xác minh, Nội dung diễn giải]
var SXM_TH_A = [['TH_TS_02', 70000000, 65000000, 'Theo báo giá sửa chữa của gara được cấp phép'], ['TH_TS_04', 50000000, 45000000, 'Theo giá thuê tài sản cùng loại trên thị trường'], ['TH_TN_01', 45000000, 42000000, 'Theo bảng lương 03 tháng liền kề'], ['TH_CPK_01', 5000000, 5000000], ['TH_CPK_03', 3000000, 3000000]];
var SXM_TH_B = [['TH_TS_01', 160000000, 150000000, 'Theo chứng thư thẩm định giá'], ['TH_TS_03', 100000000, 90000000, 'Theo biên bản giám định hư hỏng'], ['TH_TN_04', 90000000, 85000000, 'Theo báo cáo tài chính quý gần nhất'], ['TH_CPK_01', 9000000, 9000000], ['TH_CPK_02', 6000000, 6000000]];
var SXM_TH_C = [['TH_TN_01', 60000000, 55000000, 'Theo bảng lương 06 tháng liền kề'], ['TH_TT_04', 30000000, 30000000, 'Theo mức lương cơ sở'], ['TH_CPK_01', 4000000, 4000000], ['TH_CPK_02', 2000000, 2000000]];

// Hồ sơ trạng thái xử lý (không qua phiếu trình)
function sxmClaims() {
    var L = [];
    // Xác minh thiệt hại - Tổ chức, mới vào bước xác minh
    L.push(sxmBuild({ id: 'SXM_XM1', code: 'BT-2026-501', who: 'o1', stage: 'xac-minh', k: [2, 1], hinhThuc: 'Qua dịch vụ bưu chính',
        docBase: 'Quyết định hủy Quyết định đình chỉ hoạt động kinh doanh số 77/QĐ-UBND ngày 10/08/2026',
        hanhVi: 'Đình chỉ hoạt động kinh doanh cửa hàng trái pháp luật trong 45 ngày.', nhanQua: 'Doanh nghiệp ngừng kinh doanh, hàng hóa tồn kho bị hư hỏng, phát sinh chi phí thuê kho.', th: SXM_TH_B }));
    // Thương lượng - Cá nhân, mới vào bước thương lượng
    L.push(sxmBuild({ id: 'SXM_TL1', code: 'BT-2026-504', who: 'p3', stage: 'thuong-luong', k: [3, 2, 1],
        docBase: 'Quyết định hủy Quyết định thu hồi giấy phép kinh doanh số 19/QĐ-UBND ngày 05/08/2026',
        hanhVi: 'Thu hồi giấy phép kinh doanh dịch vụ ăn uống không đúng thẩm quyền.', nhanQua: 'Cửa hàng ngừng hoạt động 02 tháng, mất thu nhập.', th: SXM_TH_A.concat([['TH_KHAC_504A', 4000000, 3500000, 'Theo hợp đồng và hóa đơn thuê kho', 'Chi phí thuê kho bảo quản hàng hóa trong thời gian bị thu hồi giấy phép']]),
        bs: [['TH_CPK_02', 1500000, 'Bổ sung khi xác minh: chi phí gửi đơn thư có biên lai bưu chính']] }));
    // Chờ chi trả - Cá nhân, đã ban hành QĐ giải quyết bồi thường
    L.push(sxmBuild({ id: 'SXM_CTT1', code: 'BT-2026-506', who: 'p4', stage: 'cho-thuc-thi', k: [4, 4, 3, 2, 1], bank: ['0451000506506', 'Vietcombank', 'Chi nhánh Ba Đình'],
        docBase: 'Quyết định hủy Quyết định tịch thu phương tiện số 33/QĐ-XPHC ngày 01/08/2026',
        hanhVi: 'Tịch thu xe ô tô tải trái pháp luật trong xử phạt vi phạm hành chính.', nhanQua: 'Xe bị hư hỏng do lưu giữ ngoài trời, mất thu nhập vận chuyển hàng hóa.', th: SXM_TH_A }));
    // Xác minh thiệt hại - Cá nhân, Cả hai (có Phục hồi danh dự), đã lưu dở kết quả xác minh lần 1
    L.push(sxmXmDraft(sxmBuild({ id: 'SXM_XM2', code: 'BT-2026-502', who: 'p1', stage: 'xac-minh', k: [7, 5], requestType: 'both', fieldGroup: 'hình sự',
        docBase: 'Quyết định đình chỉ điều tra số 15/QĐ-CSĐT ngày 20/08/2026 (người bị thiệt hại không thực hiện hành vi phạm tội)',
        hanhVi: 'Khởi tố, tạm giam 03 tháng đối với người không thực hiện hành vi phạm tội.', nhanQua: 'Mất thu nhập trong thời gian bị tạm giam; tài sản bị kê biên hư hỏng; danh dự, uy tín bị xâm phạm.',
        th: [['TH_TS_02', 50000000], ['TH_TS_06', 30000000], ['TH_TN_01', 54000000], ['TH_TT_04', 36000000], ['TH_CPK_01', 4000000], ['TH_CPK_03', 3000000], ['TH_KHAC_502A', 6000000, undefined, undefined, 'Chi phí thuê kho bảo quản tài sản bị kê biên']], bs: [['TH_SK_01', 12000000]] }), 2));
    // Thương lượng - Tổ chức, đã nhập dở biên bản thương lượng
    L.push(sxmTlDraft(sxmBuild({ id: 'SXM_TL2', code: 'BT-2026-505', who: 'o2', stage: 'thuong-luong', k: [8, 7, 4], fieldGroup: 'thi hành án dân sự', agency: SXM_STP,
        docBase: 'Quyết định hủy Quyết định cưỡng chế kê biên tài sản số 64/QĐ-CCTHADS ngày 12/08/2026',
        hanhVi: 'Kê biên, tạm giữ 05 xe tải vượt quá giá trị nghĩa vụ phải thi hành án.', nhanQua: 'Ngừng khai thác 05 xe tải, phải thuê phương tiện thay thế để thực hiện hợp đồng.', th: SXM_TH_B }), 1));
    // Chờ chi trả - Tổ chức
    L.push(sxmBuild({ id: 'SXM_CTT2', code: 'BT-2026-507', who: 'o3', stage: 'cho-thuc-thi', k: [9, 8, 6, 4, 2], bank: ['1200205507507', 'Agribank', 'Chi nhánh Từ Liêm'],
        docBase: 'Quyết định hủy Quyết định thu hồi đất số 120/QĐ-UBND ngày 25/07/2026',
        hanhVi: 'Thu hồi đất sản xuất nông nghiệp của hợp tác xã không đúng trình tự, thủ tục.', nhanQua: 'Mất hoa màu vụ thu, chi phí cải tạo lại đất sản xuất.', th: SXM_TH_A }));
    // Xác minh thiệt hại - Cá nhân, mới vào bước xác minh
    L.push(sxmBuild({ id: 'SXM_XM3', code: 'BT-2026-503', who: 'p2', stage: 'xac-minh', k: [10, 8], hinhThuc: 'Dịch vụ công trực tuyến', fieldGroup: 'tố tụng dân sự',
        docBase: 'Quyết định hủy Quyết định áp dụng biện pháp khẩn cấp tạm thời số 08/2026/QĐ-BPKCTT ngày 18/08/2026',
        hanhVi: 'Áp dụng biện pháp khẩn cấp tạm thời phong tỏa tài khoản trái pháp luật.', nhanQua: 'Không thanh toán được khoản vay đến hạn, phát sinh lãi phạt.', th: SXM_TH_C }));
    return L;
}

// Hồ sơ Chờ duyệt / Bị từ chối theo Nội dung trình (trình qua kho luồng khi tải trang)
// base: bước đã qua trước khi trình; pause: dữ liệu Hoãn/Tạm đình chỉ đã ban hành
var SXM_WF = [
    { id: 'SXM_CD_HGQ', code: 'BT-2026-508', who: 'p5', k: [5, 4], base: 'xac-minh', kind: 'Hoãn giải quyết bồi thường', result: 'Hoãn giải quyết', mode: 'submit', t: 'hgq' },
    { id: 'SXM_TC_TDC', code: 'BT-2026-514', who: 'p6', k: [5, 4, 2], base: 'thuong-luong', kind: 'Tạm đình chỉ giải quyết bồi thường', result: 'Tạm đình chỉ', mode: 'reject', t: 'tdc', rejectReason: 'Đề nghị bổ sung văn bản của Tòa án về việc thụ lý vụ án hành chính có liên quan.' },
    { id: 'SXM_CD_KTL', code: 'BT-2026-509', who: 'p7', k: [11], base: 'tiep-nhan', kind: 'Không thụ lý', result: 'Không thụ lý', mode: 'submit', t: 'ktl' },
    { id: 'SXM_TC_KTL', code: 'BT-2026-515', who: 'p8', k: [11], base: 'tiep-nhan', kind: 'Không thụ lý', result: 'Không thụ lý', mode: 'reject', t: 'ktl', rejectReason: 'Lý do không thụ lý chưa phù hợp: đề nghị kiểm tra lại thời hiệu tính từ ngày nhận bản án.' },
    { id: 'SXM_CD_TTGQ', code: 'BT-2026-510', who: 'p9', k: [12, 11, 9], base: 'thuong-luong', pause: ['hgq', 6], kind: 'Tiếp tục giải quyết bồi thường', result: 'Thương lượng', mode: 'submit', t: 'ttgq' },
    { id: 'SXM_TC_HGQ', code: 'BT-2026-516', who: 'p10', k: [12, 10], base: 'xac-minh', kind: 'Hoãn giải quyết bồi thường', result: 'Hoãn giải quyết', mode: 'reject', t: 'hgq', rejectReason: 'Thời hạn hoãn đề nghị chưa có căn cứ; bổ sung văn bản của tổ chức thẩm định giá.' },
    { id: 'SXM_CD_CN', code: 'BT-2026-511', who: 'p11', k: [13], base: 'cu-nguoi', kind: 'Cử người giải quyết bồi thường', result: 'Xác minh thiệt hại', mode: 'submit', t: 'cn' },
    { id: 'SXM_TC_CN', code: 'BT-2026-517', who: 'p12', k: [13], base: 'cu-nguoi', kind: 'Cử người giải quyết bồi thường', result: 'Xác minh thiệt hại', mode: 'reject', t: 'cn', rejectReason: 'Đề nghị cử thêm 01 cán bộ có chuyên môn thẩm định giá tham gia giải quyết.' },
    { id: 'SXM_TC_QD', code: 'BT-2026-518', who: 'p13', k: [14, 13, 10, 7], base: 'cho-qd', kind: 'Quyết định GQBT', result: 'Chờ chi trả', mode: 'reject', t: 'qd', rejectReason: 'Số tiền bồi thường tại dự thảo chưa khớp Biên bản thương lượng; đề nghị rà soát lại.' },
    { id: 'SXM_TC_CQ', code: 'BT-2026-519', who: 'p14', k: [15, 14], base: 'xac-minh', kind: 'Chuyển CQGQBT', result: '', mode: 'reject', t: 'cq', rejectReason: 'Chưa đủ căn cứ xác định cơ quan giải quyết bồi thường khác; đề nghị làm rõ cơ quan quản lý người thi hành công vụ.' },
    { id: 'SXM_CD_HUY', code: 'BT-2026-512', who: 'p15', k: [15, 14, 11, 8, 5], base: 'cho-thuc-thi', kind: 'Hủy QĐ', result: 'Chờ ban hành QĐ', mode: 'submit', t: 'huy' },
    { id: 'SXM_CD_SUA', code: 'BT-2026-513', who: 'p16', k: [16, 15, 12, 9, 6], base: 'cho-thuc-thi', kind: 'Sửa chữa, bổ sung QĐ', result: 'Chờ chi trả', mode: 'submit', t: 'sua' },
    { id: 'SXM_TC_TTGQ', code: 'BT-2026-520', who: 'p17', k: [16, 15, 12], base: 'thuong-luong', pause: ['tdc', 8], kind: 'Tiếp tục giải quyết bồi thường', result: 'Thương lượng', mode: 'reject', t: 'ttgq', rejectReason: 'Chưa có văn bản của Tòa án về kết quả giải quyết vụ án hành chính có liên quan.' },
    { id: 'SXM_TC_HUY', code: 'BT-2026-521', who: 'p18', k: [17, 16, 13, 10, 7], base: 'cho-thuc-thi', kind: 'Hủy QĐ', result: 'Chờ ban hành QĐ', mode: 'reject', t: 'huy', rejectReason: 'Căn cứ hủy Quyết định chưa rõ; đề nghị bổ sung văn bản của cơ quan có thẩm quyền.' },
    { id: 'SXM_TC_SUA', code: 'BT-2026-522', who: 'p19', k: [17, 16, 13, 10, 7], base: 'cho-thuc-thi', kind: 'Sửa chữa, bổ sung QĐ', result: 'Chờ chi trả', mode: 'reject', t: 'sua', rejectReason: 'Nội dung sửa chữa chưa nêu rõ điều khoản được sửa đổi.' }
];
var SXM_WF_TEXT = {
    hgq: { title: 'Quyết định hoãn giải quyết bồi thường', form: 'Mẫu số 22/BTNN', reason: 'Chờ kết quả định giá tài sản của tổ chức thẩm định giá.', file: 'Du_thao_QD_hoan_giai_quyet_' },
    tdc: { title: 'Quyết định tạm đình chỉ giải quyết bồi thường', form: '', reason: 'Chờ kết quả giải quyết vụ án hành chính có liên quan.', file: 'Du_thao_QD_tam_dinh_chi_' },
    ktl: { title: 'Thông báo không thụ lý hồ sơ', form: 'Mẫu số 04/BTNN', reason: 'Thời hiệu yêu cầu bồi thường đã hết (Điểm b Khoản 2 Điều 43)', file: 'Mau_04_BTNN_Thong_bao_khong_thu_ly_' },
    ttgq: { title: 'Quyết định tiếp tục giải quyết bồi thường', form: 'Mẫu số 23/BTNN', reason: 'Lý do hoãn / tạm đình chỉ không còn.', file: 'Du_thao_QD_tiep_tuc_giai_quyet_' },
    cn: { title: 'Quyết định cử người giải quyết bồi thường', form: 'Mẫu số 06/BTNN', reason: 'Cử cán bộ giải quyết bồi thường.', file: 'Mau_06_BTNN_Quyet_dinh_cu_nguoi_GQBT_' },
    qd: { title: 'Quyết định giải quyết bồi thường', form: 'Mẫu số 18/BTNN', reason: 'Ban hành Quyết định giải quyết bồi thường theo kết quả thương lượng.', file: 'Du_thao_QD_GQBT_' },
    cq: { title: 'Văn bản chuyển cơ quan giải quyết bồi thường', form: '', reason: 'Yêu cầu bồi thường thuộc thẩm quyền giải quyết của cơ quan khác.', file: 'Van_ban_chuyen_CQGQBT_' },
    huy: { title: 'Quyết định hủy Quyết định giải quyết bồi thường', form: 'Mẫu số 20/BTNN', reason: 'Quyết định giải quyết bồi thường có sai sót về căn cứ xác định thiệt hại.', file: 'Du_thao_QD_huy_QD_GQBT_' },
    sua: { title: 'Quyết định sửa chữa, bổ sung Quyết định giải quyết bồi thường', form: 'Mẫu số 21/BTNN', reason: 'Sửa lỗi chính tả tên người được bồi thường và số tài khoản nhận tiền.', file: 'Du_thao_QD_sua_chua_bo_sung_' }
};
function sxmWfClaims() {
    return SXM_WF.map(function (p) {
        var c = sxmBuild({ id: p.id, code: p.code, who: p.who, stage: p.base, k: p.k, agency: SXM_STP,
            docBase: p.t === 'ktl' ? SXM_DOC.ktl : 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số ' + (40 + Number(p.code.slice(-2))) + '/QĐ-XPHC ngày 06/08/2026',
            hanhVi: p.t === 'ktl' ? 'Áp dụng biện pháp ngăn chặn trái pháp luật trong hoạt động tố tụng hành chính.' : 'Xử phạt vi phạm hành chính, tạm giữ tang vật, phương tiện trái pháp luật.',
            nhanQua: 'Tang vật, phương tiện bị hư hỏng; mất thu nhập trong thời gian bị tạm giữ.', th: SXM_TH_A });
        if (p.pause) sxmPaused(c, p.pause[0], p.pause[1], 'Thương lượng');
        c.sxmWf = { kind: p.kind, mode: p.mode };
        return c;
    });
}

// Dời ngày của 01 hồ sơ mẫu đã có (trừ ngày sinh, ngày cấp giấy tờ, văn bản làm căn cứ): ngày tiếp nhận về gần hôm nay - k, không có ngày sau hôm nay
var SXM_KEEP_KEYS = ['nycBirth', 'nycCardDate', 'nycOrgDocDate', 'docBase', 'vanBanCanCu', 'officerCardDate', 'cardDate'];
function sxmShiftRecord(c, k) {
    var from = sxmParse(c.date), target = sxmParse(sxmD(k)), today = sxmToday();
    if (!from || !target) return;
    var re = /\b(\d{2})\/(\d{2})\/(\d{4})\b/g, max = from;
    var walk = function (v, fn) {
        if (typeof v === 'string') return fn(v);
        if (Array.isArray(v)) return v.map(function (x) { return walk(x, fn); });
        if (v && typeof v === 'object') { Object.keys(v).forEach(function (key) { if (SXM_KEEP_KEYS.indexOf(key) < 0) v[key] = walk(v[key], fn); }); return v; }
        return v;
    };
    walk(c, function (s) { s.replace(re, function (m) { var d = sxmParse(m); if (d && d > max && d <= today) max = d; return m; }); return s; });
    var day = 86400000;
    var delta = Math.min(Math.round((target - from) / day), Math.round((today - max) / day));
    if (delta <= 0) return;
    walk(c, function (s) {
        return s.replace(re, function (m) {
            var d = sxmParse(m);
            if (!d || d > today) return m; // hạn xử lý trong tương lai giữ nguyên
            return sxmFmt(new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta));
        });
    });
}
// Hồ sơ HS* (ngày được trang gán lại khi tải): đặt Ngày tiếp nhận / lịch sử như cơ chế gán ngày của trang, hạn xử lý sau 30 ngày
function sxmSetHsDate(c, k) {
    var d = sxmD(k);
    c.date = d;
    c.deadline = sxmAddDays(d, 30);
    (c.timeline || []).forEach(function (t) { t.date = d; });
}
var SXM_EXISTING = [['HS1', 6, 'hs'], ['HS2', 8, 'hs'], ['HS3', 10, 'hs'], ['HS3_A', 12, 'hs'], ['HS3_B', 14, 'hs'], ['SDX_TCPH3', 7, 'all'], ['HDCV_HGQ_TT', 9, 'all']];

// 1) Bổ sung hồ sơ mẫu ngay sau dữ liệu mẫu seedx (trước khi đồng bộ kho luồng / cấp Mã vụ việc)
function sxmSeedClaims() {
    if (typeof claimsList === 'undefined' || !Array.isArray(claimsList)) return 0;
    var n = 0;
    // Mã vụ việc: để trống, ensureClaimsVuViec() của trang cấp theo sổ đăng ký chung (sau các hồ sơ mẫu đã có -> không trùng, không đổi mã đã cấp)
    sxmClaims().concat(sxmWfClaims()).forEach(function (c) {
        if (claimsList.some(function (x) { return x && (x.id === c.id || x.code === c.code); })) return;
        claimsList.push(c);
        n++;
    });
    return n;
}
(function () {
    var orig = window.sdxSeedClaims;
    window.sdxSeedClaims = function () {
        var r = typeof orig === 'function' ? orig.apply(this, arguments) : 0;
        try { sxmSeedClaims(); } catch (e) { console.warn('seedxm', e); }
        return r;
    };
    // 2) Dời ngày hồ sơ Thương lượng / Chờ chi trả mẫu đã có (chạy sau bước gán ngày HS* của trang, trước khi lưu claimsList)
    var origVv = window.ensureClaimsVuViec, shifted = false;
    window.ensureClaimsVuViec = function () {
        if (!shifted && typeof claimsList !== 'undefined' && Array.isArray(claimsList)) {
            shifted = true;
            try {
                SXM_EXISTING.forEach(function (e) {
                    var c = claimsList.find(function (x) { return x && x.id === e[0]; });
                    if (!c) return;
                    var st = canonicalClaimStatus(c.status);
                    if (st !== 'Thương lượng' && st !== 'Chờ chi trả') return; // người dùng đã thao tác chuyển trạng thái: giữ nguyên
                    if (e[2] === 'hs') sxmSetHsDate(c, e[1]); else sxmShiftRecord(c, e[1]);
                });
            } catch (err) { console.warn('seedxm shift', err); }
        }
        return typeof origVv === 'function' ? origVv.apply(this, arguments) : undefined;
    };
})();

// 3) Trình (và từ chối) phiếu trình mẫu qua kho luồng dùng chung -> Chờ duyệt / Bị từ chối theo Nội dung trình
function sxmReadDone() { try { return JSON.parse(localStorage.getItem(SXM_KEY_WF) || '{}') || {}; } catch (e) { return {}; } }
function sxmSeedSubmit() {
    var W = typeof gqW === 'function' ? gqW() : null;
    if (!W || typeof claimsList === 'undefined') return false;
    var done = sxmReadDone(), changed = false, me = W.getCurrentUserId(), today = sxmFmt(sxmToday());
    SXM_WF.forEach(function (p) {
        try {
            var c = claimsList.find(function (x) { return x && x.id === p.id; });
            if (!c) return;
            var rec0 = gqRecord(c);
            // Đã trình mẫu trước đó (hoặc người dùng đã xử lý tiếp): không trình lại
            if (rec0 && (done[p.code] || rec0.status === 'Chờ duyệt' || rec0.status === 'Bị từ chối' || rec0.approval || rec0.returned)) {
                // Tải lại trang (claimsList dựng lại từ dữ liệu mẫu): bổ sung lịch sử trình / từ chối theo hồ sơ luồng
                var dOf = function (at) { var m = /(\d{2}\/\d{2}\/\d{4})/.exec(String(at || '')); return m ? m[1] : today; };
                (rec0.history || []).forEach(function (h) {
                    var title = h.action === 'Trình phê duyệt' ? 'Trình Lãnh đạo: ' + p.kind : (h.action === 'Từ chối phê duyệt' ? 'Lãnh đạo từ chối: ' + p.kind : '');
                    if (!title || c.timeline.some(function (t) { return t.title === title; })) return;
                    c.timeline.push({ title: title, date: dOf(h.at), desc: title.indexOf('Trình') === 0 ? 'Trình Lãnh đạo ký duyệt ' + SXM_WF_TEXT[p.t].title + '. Hồ sơ chuyển sang trạng thái [Chờ duyệt].' : 'Lý do: ' + p.rejectReason + '. Hồ sơ chuyển sang trạng thái [Bị từ chối].', status: 'active', officer: h.userName || '' });
                    changed = true;
                });
                return;
            }
            var rec = gqEnsureRecord(c);
            if (!rec) return;
            // Hồ sơ luồng Cử người tự tạo với cán bộ chủ trì mặc định của đơn vị gốc: gán cán bộ giả lập mặc định (cùng luồng phê duyệt các hồ sơ mẫu khác)
            var acting = gqActingUserId();
            if (acting && rec.chuTri !== acting && typeof W.loadRecords === 'function' && typeof W.saveRecords === 'function') {
                var all = W.loadRecords() || [];
                var r = all.find(function (x) { return x && x.code === c.code; });
                if (r) { r.chuTri = acting; W.saveRecords(all); rec = W.getRecord(c.code); }
            }
            var assignees = gqSignLevels(c).map(function (lv) { return (lv.leaders && lv.leaders[0] && lv.leaders[0].id) || ''; });
            var T = SXM_WF_TEXT[p.t];
            var fileName = T.file + (c.maVuViec || c.code) + '.pdf';
            var content = 'Kính trình Lãnh đạo xem xét, ký duyệt ' + T.title.charAt(0).toLowerCase() + T.title.slice(1) + '.';
            var draftDoc = { source: 'uploaded', formNo: T.form, docTitle: T.title, generatedName: '', uploadedName: fileName, bodyHtml: '' };
            var signDoc = { method: 'Ký số', file: fileName, enableRoomSig: true, sigCoords: [], docSrc: 'upload', docFileMeta: { name: fileName, size: '286 KB', note: '', keepId: '' }, submitContent: content, attachments: [{ name: 'Tài liệu kèm theo phiếu trình', file: { id: '', name: 'Tai_lieu_kem_theo_' + c.code + '.pdf', size: '164 KB' } }] };
            var extra = { assignee: assignees[0] || '', assignees: assignees, reason: T.reason, resultStatus: p.result, draftDoc: draftDoc, signDoc: signDoc };
            var patch = {};
            var prev = canonicalClaimStatus(c.status);
            if (p.t === 'hgq') { Object.assign(signDoc, { reason: T.reason, fromDate: today, toDate: sxmAddDays(today, 20), days: 20 }); patch.hgqPrevStatus = prev; patch.hoanGiaiQuyet = { reason: T.reason, fromDate: today, toDate: sxmAddDays(today, 20), days: 20, fileName: fileName, formNo: T.form, signingMethod: 'Ký số', previousStatus: prev, submittedAt: gqNow() }; }
            if (p.t === 'tdc') { Object.assign(signDoc, { reason: T.reason, date: today }); patch.hgqPrevStatus = prev; patch.tamDinhChi = { reason: T.reason, date: today, fileName: fileName, formNo: '', signingMethod: 'Ký số', previousStatus: prev, submittedAt: gqNow() }; }
            if (p.t === 'ttgq') { var loai = c.hoanGiaiQuyet ? 'hgq' : 'tdc'; Object.assign(signDoc, { loai: loai, restoreStatus: p.result }); patch.tiepTucGiaiQuyet = { loai: loai, fileName: fileName, formNo: T.form, signingMethod: 'Ký số', restoreStatus: p.result, submittedAt: gqNow() }; }
            if (p.t === 'ktl') { Object.assign(signDoc, { docNumber: '', docDate: '', noiNhan: '' }); patch = { ktlReasonCode: 'KTL_02', ktlDetail: 'Văn bản yêu cầu bồi thường nộp sau 03 năm kể từ ngày nhận bản án.', rejectType: 'Không thụ lý', rejectReason: T.reason }; }
            if (p.t === 'cn') extra.action = { type: 'cuNguoi', officers: [rec.chuTri] };
            if (p.t === 'cq') extra.action = { type: 'transfer', targetUnitId: 'STP-HCM', content: T.reason, files: [] };
            W.setCurrentUser(rec.chuTri);
            var res = W.submitForApproval(c.code, p.kind, content, [], extra);
            if (!res || !res.ok) { console.warn('seedxm submit', p.code, res && res.message); return; }
            c.status = 'Chờ duyệt';
            c.timeline.push({ title: 'Trình Lãnh đạo: ' + p.kind, date: today, desc: 'Trình Lãnh đạo ký duyệt ' + T.title + '. Hồ sơ chuyển sang trạng thái [Chờ duyệt].', status: 'active', officer: SDX_CB });
            if (p.mode === 'reject' && assignees[0]) {
                W.setCurrentUser(assignees[0]);
                var rr = W.rejectApproval(c.code, p.rejectReason);
                if (rr && rr.ok) {
                    c.status = 'Bị từ chối';
                    c.wfReturned = rr.record.returned || null;
                    c.timeline.push({ title: 'Lãnh đạo từ chối: ' + p.kind, date: today, desc: 'Lý do: ' + p.rejectReason + '. Hồ sơ chuyển sang trạng thái [Bị từ chối].', status: 'active' });
                }
            }
            try { gqRecMap[c.code] = W.getRecord(c.code); } catch (e) { /* mockup */ }
            if (typeof gqSaveData === 'function') gqSaveData(c, patch);
            done[p.code] = SXM_VERSION;
            changed = true;
        } catch (e) { console.warn('seedxm submit', p.code, e); } finally { if (W.getCurrentUserId() !== me) W.setCurrentUser(me); }
    });
    try { localStorage.setItem(SXM_KEY_WF, JSON.stringify(done)); } catch (e) { /* mockup */ }
    return changed;
}
function sxmInit() {
    var changed = false;
    try { changed = sxmSeedSubmit(); } catch (e) { console.warn('seedxm', e); }
    if (changed) {
        try { saveClaimsToLocal(); } catch (e) { /* mockup */ }
        try { renderClaimsTable(); } catch (e) { /* mockup */ }
    }
}
if (document.readyState === 'complete') setTimeout(sxmInit, 0); else window.addEventListener('load', function () { setTimeout(sxmInit, 0); });
