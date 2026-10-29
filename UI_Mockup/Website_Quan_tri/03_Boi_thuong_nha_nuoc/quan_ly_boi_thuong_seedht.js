/**
 * Dữ liệu mẫu bổ sung: vụ việc Hoàn thành có đủ thông tin Phục hồi danh dự.
 * - BT-2026-416: Yêu cầu cả hai, Trực tiếp xin lỗi và cải chính công khai (Hoàn thành cả 2 nhánh).
 * - BT-2026-417: Yêu cầu cả hai, Trực tiếp xin lỗi + Đăng báo xin lỗi, cải chính công khai (Hoàn thành cả 2 nhánh).
 * - Hồ sơ mẫu Hoàn thành có Phục hồi danh dự nhưng chưa có thông tin các bước (BT-2026-008, 012, 066, 067):
 *   bổ sung Thông báo Mẫu 26, ý kiến phản hồi, tổ chức thực hiện, kết quả (chỉ hồ sơ mẫu, không đụng hồ sơ người dùng tạo).
 * Nạp kèm quan_ly_boi_thuong_seedx.js (dùng các hàm sdx*), đặt sau seedx.
 */
(function () {
    if (typeof sdxClaims !== 'function' || typeof sdxSeedClaims !== 'function') return;

    // Đăng báo: Gửi cho UBND cấp xã nơi người bị thiệt hại cư trú (Đơn vị nhận, Ngày nhận, Tài liệu đính kèm)
    function communeXa(c, date) {
        var vv = c.maVuViec || c.code;
        var ward = String(c.nycPhuongXa || '').replace(/^\d+\s*-\s*/, '');
        c.phddStep3CommunePostingCheck = true;
        c.phddStep3CommuneUnit = ward ? 'UBND ' + ward : 'UBND cấp xã nơi người bị thiệt hại cư trú';
        c.editPhddStep3CommunePostingSendDate = date || '';
        c.phddStep3CommuneFiles = [{ name: 'Phiếu gửi tờ báo đăng xin lỗi, cải chính công khai cho UBND cấp xã', file: { id: 'xa_' + vv, name: 'Phieu_gui_UBND_xa_' + vv + '.pdf', size: 186000, type: 'application/pdf' } }];
        return c;
    }
    // Thông tin các bước Phục hồi danh dự theo hình thức (apology: trực tiếp xin lỗi; news: đăng báo)
    function phddDone(c, o) {
        var apology = !!o.apology, news = !!o.news;
        c.restoreHonor = true; c.phddStarted = true; c.phddStatus = 'Hoàn thành';
        c.phddFormApology = apology; c.phddFormNews = news;
        c.phddForm = apology && news ? 'Trực tiếp xin lỗi và cải chính công khai; Đăng báo xin lỗi và cải chính công khai'
            : (news ? 'Đăng báo xin lỗi và cải chính công khai' : 'Trực tiếp xin lỗi và cải chính công khai');
        var vv = c.maVuViec || c.code;
        sdxM26(c, { no: o.no, date: o.date, send: o.send, signer: o.signer, title: o.title, time: o.time, place: o.place, paper: o.paper });
        sdxReply(c, o.reply, 'Đồng ý thực hiện', 'Van_ban_dong_y_phuc_hoi_danh_du_' + vv + '.pdf');
        var files = [];
        var step = { phddStep3Saved: true, phddStep3Agency: c.agency, phddStep4DateAct: o.done };
        if (apology) {
            Object.assign(step, {
                phddStep3DateExp: o.time ? o.time.split(' ').pop() : o.done, phddStep3DirectVenue: o.place,
                phddStep3Member_coquan: true, phddStep3Member_totung: !!o.totung, phddStep3Member_canhan: true,
                phddStep3Participants: o.participants || [{ name: o.signer, position: o.title, unit: c.agency }],
                phddStep3Claimants: [{ name: c.nyc, idNo: c.nycCardNo || '', address: c.notifyAddress || c.nycAddressDetail || '' }],
                phddStep4VenueAct: o.place
            });
            files.push({ name: 'Bien_ban_to_chuc_xin_loi_cai_chinh_' + vv + '.pdf', size: '356 KB' });
            files.push({ name: 'Danh_sach_thanh_phan_tham_du_' + vv + '.pdf', size: '124 KB' });
        }
        if (news) {
            Object.assign(step, {
                phddStep3NewsLevel: o.newsLevel || 'Trung ương', phddStep3NewsNameCentral: o.newsCentral || '', phddStep3NewsNameLocal: o.newsLocal || '',
                phddStep3NewsCentral: o.newsCentral || '', phddStep3NewsLocal: o.newsLocal || '', phddStep3NewsNumbers: o.newsNumbers || '',
                phddStep4NewsCentralAct: o.newsCentral || '', phddStep4NewsLocalAct: o.newsLocal || '',
                phddStep4NewsNumbers: o.newsActNumbers || o.newsNumbers || ''
            });
            communeXa(c, o.done);
            files.push({ name: 'Ban_chup_bai_dang_xin_loi_cai_chinh_' + vv + '.pdf', size: '1,1 MB' });
        }
        step.phddUploadedFiles = files;
        step.phddStep4ResultDesc = o.result;
        Object.assign(c, step);
        c.phddTimeline = [
            sdxP('Ban hành Thông báo tổ chức thực hiện phục hồi danh dự', o.date, 'Lãnh đạo ký số Thông báo số ' + o.no + ' (Mẫu số 26/BTNN).'),
            sdxP('Ghi nhận ý kiến phản hồi', o.reply, 'Người bị thiệt hại đồng ý thực hiện phục hồi danh dự (Khoản 2 Điều 57).'),
            sdxP('Hoàn thành phục hồi danh dự', o.done, o.result + ' Nhánh Phục hồi danh dự chuyển sang trạng thái [Hoàn thành].')
        ];
        return c;
    }

    function newClaims() {
        var L = [];
        // ===== Hoàn thành - Cả hai, Trực tiếp xin lỗi và cải chính công khai =====
        var a = sdxBase({
            id: 'SDX_HT4', code: 'BT-2026-416', maVuViec: 'VVBT-2026-416', requestType: 'both',
            fieldGroup: 'hành chính', date: '01/10/2026', deadline: '30/11/2026', requestDocDate: '28/09/2026',
            nyc: 'Đinh Văn Khoa', nycBirth: '14/03/1979', nycCardNo: '001079004416', nycCardDate: '18/06/2021',
            nycPhone: '0912416416', nycEmail: 'dinhvankhoa79@gmail.com', nycPhuongXa: 'Phường Hoàng Mai', nycAddressDetail: 'Số 23 ngõ 91 Tam Trinh',
            agency: 'UBND phường Hoàng Mai',
            docBase: 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 112/QĐ-XPHC ngày 20/08/2026',
            vanBanCanCu: [{ name: 'Quyết định hủy Quyết định xử phạt số 112/QĐ-XPHC', file: 'QD_huy_112_XPHC.pdf' }],
            hanhVi: 'Ra quyết định xử phạt vi phạm hành chính và tạm giữ phương tiện không đúng thẩm quyền.',
            nhanQua: 'Không sử dụng được phương tiện kinh doanh 45 ngày; danh dự bị ảnh hưởng tại nơi cư trú do thông tin xử phạt công khai.',
            status: 'Hoàn thành', slaText: 'Đã hoàn thành chi trả và phục hồi danh dự',
            thietHaiList: sdxThiet([[1, 60000000, 55000000], [2, 45000000, 40000000], [6, 8000000, 8000000]], '06/10/2026'),
            appointedOfficers: sdxAppointed('UBND phường Hoàng Mai', '02/10/2026'),
            qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-416_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'UBND phường Hoàng Mai' }] },
            thongBaoThuLy: { signingMethod: 'Ký số', issuedAt: '02/10/2026', soKyHieu: '58/TB-UBND', ngay: '02/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-416.pdf' },
            files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-416.pdf', url: '#' }]
        });
        sdxXm(a, '06/10/2026');
        sdxNeg(a, '10/10/2026', null, 'Trực tiếp xin lỗi, cải chính công khai tại nơi cư trú.');
        sdxDec(a, '64/QĐ-UBND', '13/10/2026', 'Trần Quốc Hưng', 'Chủ tịch UBND phường');
        a.fundRequests = [sdxFund('KP-2026-416', 'Cấp kinh phí bồi thường', a.xmTotalAmount, '14/10/2026', '19/10/2026', a, 'Chi trả qua chuyển khoản.')];
        a.thucthiDate = '19/10/2026';
        a.thucthiNote = 'Đã chi trả đủ ' + sdxMoney(a.xmTotalAmount) + ' đồng qua chuyển khoản.';
        a.timeline = [
            sdxT('Tiếp nhận hồ sơ', '01/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
            sdxT('Thông báo thụ lý hồ sơ', '02/10/2026', 'Ban hành Thông báo thụ lý số 58/TB-UBND; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Trần Quốc Hưng (Chủ tịch UBND phường)'),
            sdxT('Xác minh thiệt hại', '06/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(a.xmTotalAmount) + ' đồng.', SDX_CB),
            sdxT('Thương lượng bồi thường', '10/10/2026', 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
            sdxT('Ban hành Quyết định giải quyết bồi thường', '13/10/2026', 'Quyết định số 64/QĐ-UBND.', 'Trần Quốc Hưng (Chủ tịch UBND phường)'),
            sdxT('Hoàn thành chi trả tiền bồi thường', '19/10/2026', 'Đã chi trả đủ tiền bồi thường. Nhánh Giải quyết YCBT chuyển sang trạng thái [Hoàn thành].', SDX_CB)
        ];
        phddDone(a, {
            apology: true, no: '61/TB-UBND', date: '07/10/2026', send: '08/10/2026', signer: 'Trần Quốc Hưng', title: 'Chủ tịch UBND phường',
            time: '09:00 22/10/2026', place: 'Hội trường UBND phường Hoàng Mai', reply: '12/10/2026', done: '22/10/2026',
            participants: [
                { name: 'Trần Quốc Hưng', position: 'Chủ tịch', unit: 'UBND phường Hoàng Mai' },
                { name: 'Lê Văn Bình', position: 'Người thi hành công vụ gây thiệt hại', unit: 'UBND phường Hoàng Mai' },
                { name: 'Phạm Thị Hòa', position: 'Đại diện Tổ dân phố số 5', unit: 'Phường Hoàng Mai' }
            ],
            result: 'Đã tổ chức trực tiếp xin lỗi và cải chính công khai tại Hội trường UBND phường Hoàng Mai, có đại diện nơi cư trú của người bị thiệt hại tham dự.'
        });
        L.push(a);

        // ===== Hoàn thành - Cả hai, Trực tiếp xin lỗi + Đăng báo xin lỗi, cải chính công khai (tố tụng hình sự) =====
        var b = sdxBase({
            id: 'SDX_HT5', code: 'BT-2026-417', maVuViec: 'VVBT-2026-417', requestType: 'both',
            fieldGroup: 'hình sự', date: '02/10/2026', deadline: '01/12/2026', requestDocDate: '29/09/2026',
            nyc: 'Vũ Thị Lan Anh', nycBirth: '08/11/1985', nycCardNo: '001185005417', nycCardDate: '03/04/2022',
            nycPhone: '0983417417', nycEmail: 'vulananh85@gmail.com', nycPhuongXa: 'Phường Thanh Xuân', nycAddressDetail: 'Số 9 ngõ 214 Nguyễn Trãi',
            agency: 'Tòa án nhân dân TP. Hà Nội',
            docBase: 'Bản án hình sự phúc thẩm số 245/2026/HS-PT ngày 10/08/2026 tuyên bị cáo không phạm tội',
            vanBanCanCu: [{ name: 'Bản án hình sự phúc thẩm số 245/2026/HS-PT', file: 'Ban_an_245_2026_HS_PT.pdf' }],
            hanhVi: 'Kết án oan đối với người không thực hiện hành vi phạm tội; bị tạm giam 120 ngày.',
            nhanQua: 'Mất thu nhập trong thời gian bị tạm giam; danh dự, uy tín bị ảnh hưởng nghiêm trọng do thông tin vụ án được đăng tải trên báo chí.',
            status: 'Hoàn thành', slaText: 'Đã hoàn thành chi trả và phục hồi danh dự',
            thietHaiList: sdxThiet([[2, 96000000, 96000000], [5, 180000000, 180000000], [6, 15000000, 12000000]], '07/10/2026'),
            appointedOfficers: sdxAppointed('Tòa án nhân dân TP. Hà Nội', '03/10/2026'),
            qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-417_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Thẩm tra viên', unit: 'Tòa án nhân dân TP. Hà Nội' }] },
            thongBaoThuLy: { signingMethod: 'Ký số', issuedAt: '03/10/2026', soKyHieu: '402/TB-TA', ngay: '03/10/2026', fileName: 'Thong_bao_thu_ly_BT-2026-417.pdf' },
            files: [{ name: 'Van_ban_yeu_cau_boi_thuong_BT-2026-417.pdf', url: '#' }]
        });
        sdxXm(b, '07/10/2026');
        sdxNeg(b, '11/10/2026', null, 'Trực tiếp xin lỗi, cải chính công khai và đăng báo xin lỗi, cải chính công khai.');
        sdxDec(b, '88/QĐ-TA', '14/10/2026', 'Nguyễn Hữu Chính', 'Chánh án');
        b.fundRequests = [sdxFund('KP-2026-417', 'Cấp kinh phí bồi thường', b.xmTotalAmount, '15/10/2026', '20/10/2026', b, 'Chi trả tiền mặt tại trụ sở cơ quan giải quyết bồi thường.')];
        b.thucthiDate = '20/10/2026';
        b.thucthiNote = 'Đã chi trả đủ ' + sdxMoney(b.xmTotalAmount) + ' đồng bằng tiền mặt.';
        b.timeline = [
            sdxT('Tiếp nhận hồ sơ', '02/10/2026', 'Tiếp nhận văn bản yêu cầu bồi thường qua dịch vụ bưu chính.', 'Hệ thống / Người nộp đơn'),
            sdxT('Thông báo thụ lý hồ sơ', '03/10/2026', 'Ban hành Thông báo thụ lý số 402/TB-TA; cử ông Nguyễn Văn Chuyên Viên giải quyết.', 'Nguyễn Hữu Chính (Chánh án)'),
            sdxT('Xác minh thiệt hại', '07/10/2026', 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(b.xmTotalAmount) + ' đồng.', SDX_CB),
            sdxT('Thương lượng bồi thường', '11/10/2026', 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
            sdxT('Ban hành Quyết định giải quyết bồi thường', '14/10/2026', 'Quyết định số 88/QĐ-TA.', 'Nguyễn Hữu Chính (Chánh án)'),
            sdxT('Hoàn thành chi trả tiền bồi thường', '20/10/2026', 'Đã chi trả đủ tiền bồi thường. Nhánh Giải quyết YCBT chuyển sang trạng thái [Hoàn thành].', SDX_CB)
        ];
        phddDone(b, {
            apology: true, news: true, totung: true, no: '96/TB-TA', date: '08/10/2026', send: '09/10/2026', signer: 'Nguyễn Hữu Chính', title: 'Chánh án',
            time: '14:00 23/10/2026', place: 'Hội trường UBND phường Thanh Xuân', reply: '13/10/2026', done: '25/10/2026',
            participants: [
                { name: 'Nguyễn Hữu Chính', position: 'Chánh án', unit: 'Tòa án nhân dân TP. Hà Nội' },
                { name: 'Đỗ Minh Tuấn', position: 'Kiểm sát viên', unit: 'Viện kiểm sát nhân dân TP. Hà Nội' },
                { name: 'Hà Thị Nga', position: 'Phó Chủ tịch', unit: 'UBND phường Thanh Xuân' }
            ],
            newsLevel: 'Trung ương', newsCentral: 'Báo Công lý', newsLocal: 'Báo Hà Nội mới',
            newsNumbers: 'Báo Công lý số 125, 126, 127 (ngày 23, 24, 25/10/2026); Báo Hà Nội mới số 10220, 10221, 10222 (ngày 23, 24, 25/10/2026)',
            newsActNumbers: 'Đăng 03 số liên tiếp trên mỗi báo, từ ngày 23/10/2026 đến ngày 25/10/2026',
            result: 'Đã tổ chức trực tiếp xin lỗi và cải chính công khai tại Hội trường UBND phường Thanh Xuân, đồng thời đăng báo xin lỗi, cải chính công khai 03 số liên tiếp trên Báo Công lý và Báo Hà Nội mới.'
        });
        L.push(b);
        return L;
    }

    // Bổ sung các bước Phục hồi danh dự cho hồ sơ mẫu Hoàn thành chưa có thông tin (không đụng hồ sơ người dùng tạo)
    var FILL = {
        'BT-2026-008': { apology: true, no: '45/TB-STP', date: '08/10/2026', send: '09/10/2026', signer: 'Phạm Văn Hùng', title: 'Giám đốc Sở Tư pháp', time: '09:00 20/10/2026', place: 'Hội trường UBND phường nơi người bị thiệt hại cư trú', reply: '12/10/2026', done: '20/10/2026', result: 'Đã tổ chức trực tiếp xin lỗi và cải chính công khai tại nơi cư trú của người bị thiệt hại.' },
        'BT-2026-012': { news: true, no: '52/TB-THADS', date: '07/10/2026', send: '08/10/2026', signer: 'Trần Văn Thắng', title: 'Cục trưởng', reply: '11/10/2026', done: '18/10/2026', newsLevel: 'Trung ương', newsCentral: 'Báo Pháp luật Việt Nam', newsLocal: 'Báo Hà Nội mới', newsNumbers: 'Báo Pháp luật Việt Nam số 286, 287, 288; Báo Hà Nội mới số 10208, 10209, 10210', result: 'Đã đăng báo xin lỗi và cải chính công khai 03 số liên tiếp trên Báo Pháp luật Việt Nam và Báo Hà Nội mới.' },
        'BT-2026-066': { apology: true, no: '33/TB-CA', date: '06/10/2026', send: '07/10/2026', signer: 'Nguyễn Đức Mạnh', title: 'Giám đốc Công an tỉnh', time: '08:30 16/10/2026', place: 'Hội trường UBND xã nơi người bị thiệt hại cư trú', reply: '10/10/2026', done: '16/10/2026', totung: true, result: 'Đã tổ chức trực tiếp xin lỗi và cải chính công khai tại nơi cư trú của người bị thiệt hại.' },
        'BT-2026-067': { apology: true, news: true, totung: true, no: '71/TB-TA', date: '07/10/2026', send: '08/10/2026', signer: 'Nguyễn Hữu Chính', title: 'Chánh án', time: '14:00 19/10/2026', place: 'Hội trường UBND phường nơi người bị thiệt hại cư trú', reply: '11/10/2026', done: '21/10/2026', newsLevel: 'Trung ương', newsCentral: 'Báo Công lý', newsLocal: 'Báo Hà Nội mới', newsNumbers: 'Báo Công lý số 118, 119, 120; Báo Hà Nội mới số 10211, 10212, 10213', result: 'Đã tổ chức trực tiếp xin lỗi, cải chính công khai và đăng báo xin lỗi, cải chính công khai 03 số liên tiếp.' }
    };
    function fillExisting() {
        if (typeof claimsList === 'undefined' || !Array.isArray(claimsList)) return 0;
        var n = 0;
        claimsList.forEach(function (c) {
            if (!c || c.userCreated) return;
            var o = FILL[c.code];
            if (o && !c.phddStep3Saved && c.status === 'Hoàn thành') { phddDone(c, o); n++; return; }
            // Hồ sơ mẫu Đăng báo đã tổ chức thực hiện nhưng chưa có thông tin Gửi cho UBND cấp xã (VD BT-2026-406)
            if (c.phddFormNews && c.phddStep3Saved && !c.phddStep3CommuneUnit) { communeXa(c, c.phddStep4DateAct); n++; }
        });
        return n;
    }

    var origClaims = sdxClaims;
    window.sdxClaims = function () {
        var L = origClaims.apply(this, arguments);
        newClaims().forEach(function (c) { if (!L.some(function (x) { return x.code === c.code; })) L.push(c); });
        return L;
    };
    var origSeed = window.sdxSeedClaims;
    window.sdxSeedClaims = function () {
        var n = origSeed.apply(this, arguments);
        return n + fillExisting();
    };
})();
