/* [hlqd] Hồ sơ mẫu Giải quyết yêu cầu bồi thường cho các Quyết định GQBT mẫu thử Hiệu lực (quyet_dinh_gqbt_hlqd.js / quan_ly_kinh_phi_hlqd.js)
 * - BT-2026-191 (QD-HL1 41/QĐ-STP, Không có hiệu lực): Chờ chi trả -> màn Tạo thông báo chi trả (MH24) chặn chọn.
 * - BT-2026-192 (QD-HL2 33/QĐ-BTP, Có hiệu lực): Chờ chi trả -> MH24 gợi ý được.
 * - BT-2026-193 (QD-HL3 38/QĐ-STP): Hoàn thành (đã chi trả).
 * - BT-2026-194 (QD-HL4 40/QĐ-STP, Không có hiệu lực, Thông báo chi trả Chờ duyệt): Chờ chi trả.
 * Nạp cùng sdxSeedClaims (quan_ly_boi_thuong_seedx.js) khi tải trang: chỉ thêm hồ sơ chưa có (theo id / Mã hồ sơ), không ghi đè dữ liệu người dùng.
 * Dùng các hàm dữ liệu mẫu của quan_ly_boi_thuong_seedx.js: sdxBase, sdxThiet, sdxXm, sdxNeg, sdxDec, sdxAppointed, sdxT, SDX_CB.
 */
var HLQD_CLAIMS_VERSION = 'hlqd_claims_v1';
function hlqdClaims() {
    var STP = 'Sở Tư pháp Thành phố Hà Nội', BTP = 'Bộ Tư pháp';
    var L = [];
    function mk(o) {
        var c = sdxBase({
            id: o.id, code: o.code, maVuViec: o.vv, requestType: 'money',
            fieldGroup: 'hành chính', date: o.date, deadline: o.deadline, requestDocDate: o.reqDate,
            nyc: o.nyc, nycBirth: o.birth, nycCardNo: o.cardNo, nycCardDate: '15/04/2021',
            nycPhone: o.phone, nycEmail: '', nycPhuongXa: o.ward, nycAddressDetail: o.addr,
            agency: o.agency, docBase: o.docBase, vanBanCanCu: [{ name: o.docBase, file: 'Van_ban_can_cu_' + o.code + '.pdf' }],
            hanhVi: o.hanhVi, nhanQua: o.nhanQua,
            status: o.status, slaText: o.slaText,
            thietHaiList: sdxThiet(o.th, o.xmDate),
            appointedOfficers: sdxAppointed(o.agency, o.thuLy),
            qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_' + o.code + '_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: o.agency }] },
            thongBaoThuLy: { signingMethod: 'Ký ngoài', issuedAt: o.thuLy, soKyHieu: o.tbNo, ngay: o.thuLy, fileName: 'Thong_bao_thu_ly_' + o.code + '.pdf' },
            files: [{ name: 'Van_ban_yeu_cau_boi_thuong_' + o.code + '.pdf', url: '#' }],
            hlqdSeed: HLQD_CLAIMS_VERSION
        });
        sdxXm(c, o.xmDate);
        sdxNeg(c, o.negDate, o.bank);
        sdxDec(c, o.decNo, o.decDate, o.signer, o.position, 'Bồi thường cho ' + o.nyc + ' số tiền ' + sdxMoney(c.xmTotalAmount) + ' đồng theo kết quả thương lượng.');
        // Quyết định Đã ban hành (Hoàn thành chi trả: trạng thái vụ việc Hoàn thành)
        c.decStatus = 'Đã ban hành';
        c.timeline = [
            sdxT('Tiếp nhận hồ sơ', o.date, 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
            sdxT('Thông báo thụ lý hồ sơ', o.thuLy, 'Ban hành Thông báo thụ lý số ' + o.tbNo + '; cử ông Nguyễn Văn Chuyên Viên giải quyết.', o.signer + ' (' + o.position + ')'),
            sdxT('Xác minh thiệt hại', o.xmDate, 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c.xmTotalAmount) + ' đồng.', SDX_CB),
            sdxT('Thương lượng bồi thường', o.negDate, 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
            sdxT('Ban hành Quyết định giải quyết bồi thường', o.decDate, 'Quyết định số ' + o.decNo + '. Vụ việc chuyển sang trạng thái [Chờ chi trả].', o.signer + ' (' + o.position + ')')
        ];
        if (o.paid) {
            c.thucthiDate = o.paid;
            c.thucthiNote = 'Đã chi trả đủ tiền bồi thường qua chuyển khoản.';
            c.timeline.push(sdxT('Hoàn thành chi trả tiền bồi thường', o.paid, 'Đã chi trả đủ tiền bồi thường. Vụ việc chuyển sang trạng thái [Hoàn thành].', SDX_CB));
        }
        L.push(c);
    }
    mk({ id: 'HLQD_191', code: 'BT-2026-191', vv: 'VVBT-2026-391', date: '18/08/2026', deadline: '16/10/2026', reqDate: '15/08/2026', thuLy: '21/08/2026', tbNo: '81/TB-STP',
        nyc: 'Trần Thị Thu Hương', birth: '12/03/1988', cardNo: '001188005511', phone: '0912191191', ward: 'Phường Giảng Võ', addr: 'Số 18 phố Kim Mã', agency: STP,
        docBase: 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 45/QĐ-XPVPHC ngày 20/07/2026', hanhVi: 'Ra quyết định xử phạt vi phạm hành chính trái pháp luật, tạm đình chỉ hoạt động kinh doanh.', nhanQua: 'Thu nhập bị mất trong thời gian tạm đình chỉ hoạt động kinh doanh.',
        status: 'Chờ chi trả', slaText: 'Chờ chi trả tiền bồi thường', th: [[2, 200000000, 180000000, 'Theo sổ sách doanh thu 03 tháng liền kề']], xmDate: '10/09/2026', negDate: '22/09/2026',
        bank: { bankAccount: '0021001122334', bankName: 'Vietcombank', bankBranch: 'Chi nhánh Ba Đình' }, decNo: '41/QĐ-STP', decDate: '05/10/2026', signer: 'Đỗ Văn Sơn', position: 'Giám đốc Sở Tư pháp' });
    mk({ id: 'HLQD_192', code: 'BT-2026-192', vv: 'VVBT-2026-392', date: '12/08/2026', deadline: '10/10/2026', reqDate: '10/08/2026', thuLy: '14/08/2026', tbNo: '52/TB-BTP',
        nyc: 'Nguyễn Văn Phúc', birth: '21/06/1979', cardNo: '001079008899', phone: '0913192192', ward: 'Phường Láng', addr: 'Số 7 phố Nguyễn Chí Thanh', agency: BTP,
        docBase: 'Bản án hành chính phúc thẩm số 18/2026/HC-PT ngày 10/07/2026', hanhVi: 'Thu hồi giấy phép hoạt động trái pháp luật.', nhanQua: 'Tài sản (trang thiết bị) bị hư hỏng do niêm phong kéo dài.',
        status: 'Chờ chi trả', slaText: 'Chờ chi trả tiền bồi thường', th: [[1, 320000000, 300000000, 'Theo biên bản định giá tài sản']], xmDate: '05/09/2026', negDate: '18/09/2026',
        bank: { bankAccount: '1903366778899', bankName: 'Techcombank', bankBranch: 'Chi nhánh Đống Đa' }, decNo: '33/QĐ-BTP', decDate: '01/10/2026', signer: 'Trần Văn Bồi Thường', position: 'Cục trưởng' });
    mk({ id: 'HLQD_193', code: 'BT-2026-193', vv: 'VVBT-2026-393', date: '20/07/2026', deadline: '17/09/2026', reqDate: '17/07/2026', thuLy: '23/07/2026', tbNo: '70/TB-STP',
        nyc: 'Lê Minh Đức', birth: '05/11/1985', cardNo: '001085006677', phone: '0914193193', ward: 'Phường Hai Bà Trưng', addr: 'Số 25 phố Lò Đúc', agency: STP,
        docBase: 'Quyết định hủy Quyết định cưỡng chế số 31/QĐ-CC ngày 02/07/2026', hanhVi: 'Cưỡng chế tháo dỡ công trình phụ trái pháp luật.', nhanQua: 'Tài sản bị hư hỏng.',
        status: 'Hoàn thành', slaText: 'Hoàn thành chi trả tiền bồi thường', th: [[1, 130000000, 120000000, 'Khấu hao theo thời gian sử dụng']], xmDate: '12/08/2026', negDate: '26/08/2026',
        bank: { bankAccount: '0451000334455', bankName: 'Vietinbank', bankBranch: 'Chi nhánh Hai Bà Trưng' }, decNo: '38/QĐ-STP', decDate: '15/09/2026', signer: 'Đỗ Văn Sơn', position: 'Giám đốc Sở Tư pháp', paid: '25/09/2026' });
    mk({ id: 'HLQD_194', code: 'BT-2026-194', vv: 'VVBT-2026-394', date: '14/08/2026', deadline: '12/10/2026', reqDate: '12/08/2026', thuLy: '18/08/2026', tbNo: '79/TB-STP',
        nyc: 'Phạm Thị Ngọc Ánh', birth: '09/09/1992', cardNo: '001192007788', phone: '0916194194', ward: 'Phường Hoàn Kiếm', addr: 'Số 40 phố Hàng Bài', agency: STP,
        docBase: 'Quyết định đình chỉ điều tra số 15/QĐ-CQĐT ngày 01/07/2026', hanhVi: 'Áp dụng biện pháp ngăn chặn trái pháp luật.', nhanQua: 'Danh dự, uy tín bị ảnh hưởng; tổn thất về tinh thần.',
        status: 'Chờ chi trả', slaText: 'Chờ chi trả tiền bồi thường', th: [[5, 100000000, 95000000, 'Theo mức lương cơ sở tại thời điểm giải quyết']], xmDate: '08/09/2026', negDate: '24/09/2026',
        bank: { bankAccount: '0021009988112', bankName: 'BIDV', bankBranch: 'Chi nhánh Hoàn Kiếm' }, decNo: '40/QĐ-STP', decDate: '02/10/2026', signer: 'Đỗ Văn Sơn', position: 'Giám đốc Sở Tư pháp' });
    return L;
}
// Thêm hồ sơ mẫu vào claimsList (chỉ hồ sơ chưa có; không ghi đè bản ghi đã có)
function hlqdSeedClaims() {
    if (typeof claimsList === 'undefined' || !Array.isArray(claimsList) || typeof sdxBase !== 'function') return 0;
    var n = 0, W = window.BTNN_WF;
    hlqdClaims().forEach(function (c) {
        try {
            if (W && typeof W.vuViecOf === 'function') {
                var reg = W.vuViecOf(c.code, { create: false });
                if (reg) c.maVuViec = reg; else if (typeof W.linkVuViec === 'function') W.linkVuViec(c.code, c.maVuViec);
            }
        } catch (e) { /* mockup */ }
        if (claimsList.some(function (x) { return x && (x.id === c.id || x.code === c.code); })) return;
        claimsList.push(c);
        n++;
    });
    return n;
}
(function () {
    if (typeof sdxSeedClaims !== 'function') return;
    var orig = sdxSeedClaims;
    sdxSeedClaims = function () { var r = orig.apply(this, arguments); try { r += hlqdSeedClaims(); } catch (e) { console.error(e); } return r; };
})();
