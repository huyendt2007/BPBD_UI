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
            agency: 'UBND phường Bạch Mai',
            docBase: 'Quyết định hủy Quyết định xử phạt vi phạm hành chính số 112/QĐ-XPHC ngày 20/08/2026',
            vanBanCanCu: [{ name: 'Quyết định hủy Quyết định xử phạt số 112/QĐ-XPHC', file: 'QD_huy_112_XPHC.pdf' }],
            hanhVi: 'Ra quyết định xử phạt vi phạm hành chính và tạm giữ phương tiện không đúng thẩm quyền.',
            nhanQua: 'Không sử dụng được phương tiện kinh doanh 45 ngày; danh dự bị ảnh hưởng tại nơi cư trú do thông tin xử phạt công khai.',
            status: 'Hoàn thành', slaText: 'Đã hoàn thành chi trả và phục hồi danh dự',
            thietHaiList: sdxThiet([[1, 60000000, 55000000], [2, 45000000, 40000000], [6, 8000000, 8000000]], '06/10/2026'),
            appointedOfficers: sdxAppointed('UBND phường Bạch Mai', '02/10/2026'),
            qdCuNguoi: { signedFile: 'QD_cu_nguoi_giai_quyet_BT-2026-416_da_ky.pdf', officers: [{ name: SDX_CB, position: 'Chuyên viên', unit: 'UBND phường Bạch Mai' }] },
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
            time: '09:00 22/10/2026', place: 'Hội trường UBND phường Bạch Mai', reply: '12/10/2026', done: '22/10/2026',
            participants: [
                { name: 'Trần Quốc Hưng', position: 'Chủ tịch', unit: 'UBND phường Bạch Mai' },
                { name: 'Lê Văn Bình', position: 'Người thi hành công vụ gây thiệt hại', unit: 'UBND phường Bạch Mai' },
                { name: 'Phạm Thị Hòa', position: 'Đại diện Tổ dân phố số 5', unit: 'Phường Hoàng Mai' }
            ],
            result: 'Đã tổ chức trực tiếp xin lỗi và cải chính công khai tại Hội trường UBND phường Bạch Mai, có đại diện nơi cư trú của người bị thiệt hại tham dự.'
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
        // ===== Vụ việc đã hoàn tất chi trả là nguồn của hồ sơ Xem xét trách nhiệm hoàn trả (01 vụ việc - 01 hồ sơ hoàn trả) =====
        // HT-2026-001..028 (trừ HT-2026-007 - vụ việc BT-2026-193) và nguồn lập hồ sơ mới BT-2026-101..106 (ht_du_lieu_mau.js HT_SOURCE_CLAIMS):
        // cùng Mã vụ việc, Cơ quan giải quyết, Người yêu cầu, Lĩnh vực, Số tiền với hồ sơ hoàn trả; trạng thái Hoàn thành (đã chi trả)
        // [số, Mã hồ sơ, Mã vụ việc, Người yêu cầu, Cơ quan giải quyết, Lĩnh vực, Số tiền bồi thường, Ngày hoàn tất chi trả, Hành vi gây thiệt hại]
        var HTP_ROWS = [
        [1, 'BT-2026-801', 'VVBT-2026-701', 'Nguyễn Hữu Lâm', 'Sở Tư pháp Hà Nội', 'hành chính', 150000000, '16/07/2026', 'Cưỡng chế tháo dỡ nhà ở khi chưa có quyết định hành chính có hiệu lực pháp luật.'],
        [2, 'BT-2026-802', 'VVBT-2026-702', 'Đặng Thị Hoa', 'UBND Tỉnh Lâm Đồng', 'hành chính', 180000000, '20/07/2026', 'Thu hồi đất nông nghiệp vượt quá hạn mức quy định gây thiệt hại cây trồng.'],
        [3, 'BT-2026-803', 'VVBT-2026-703', 'Trịnh Quốc Bảo', 'Sở Tư pháp Hà Nội', 'hành chính', 150000000, '16/07/2026', 'Công chức tư pháp cố ý gây khó dễ, trì hoãn cấp giấy đăng ký kết hôn.'],
        [4, 'BT-2026-804', 'VVBT-2026-704', 'Công ty TNHH Xây dựng Phú Thịnh', 'Sở Tư pháp Hà Nội', 'hành chính', 150000000, '16/07/2026', 'Trì hoãn giải quyết thủ tục hành chính làm lỡ hạn nhập học của trẻ.'],
        [5, 'BT-2026-805', 'VVBT-2026-705', 'Lò Văn Tâm', 'UBND Tỉnh Lâm Đồng', 'hành chính', 180000000, '20/07/2026', 'Cưỡng chế kê biên nhà xưởng của bên thứ ba không liên quan vụ án.'],
        [6, 'BT-2026-806', 'VVBT-2026-706', 'Hà Thị Liên', 'UBND Tỉnh Lâm Đồng', 'hành chính', 180000000, '20/07/2026', 'Tạm giữ phương tiện vận tải quá thời hạn gây thiệt hại kinh tế.'],
        [8, 'BT-2026-808', 'VVBT-2026-708', 'Vũ Ngọc Ánh', 'Sở Tư pháp Hà Nội', 'hành chính', 120000000, '15/06/2026', 'Thu hồi đất không đúng thẩm quyền của UBND phường.'],
        [9, 'BT-2026-809', 'VVBT-2026-709', 'Phí Văn Đức', 'Sở Tư pháp Hà Nội', 'hành chính', 90000000, '01/07/2026', 'Làm hư hỏng phương tiện khi niêm phong kho vật chứng.'],
        [10, 'BT-2026-810', 'VVBT-2026-710', 'Tống Thị Hằng', 'UBND Tỉnh Lâm Đồng', 'hành chính', 60000000, '12/07/2026', 'Ban hành quyết định xử phạt vi phạm hành chính sai cá nhân gây thiệt hại.'],
        [11, 'BT-2026-811', 'VVBT-2026-711', 'Lưu Đình Nam', 'Sở Tư pháp Hà Nội', 'hành chính', 70000000, '05/06/2026', 'Người thi hành công vụ không có lỗi do chấp hành đúng quyết định của cấp trên.'],
        [12, 'BT-2026-812', 'VVBT-2026-712', 'Mai Thị Thu', 'Sở Tư pháp Hà Nội', 'hành chính', 100000000, '10/05/2026', 'Cán bộ thi hành công vụ đã chết trong quá trình xem xét nghĩa vụ hoàn trả.'],
        [13, 'BT-2026-813', 'VVBT-2026-713', 'Cù Văn Hải', 'Sở Tư pháp Hà Nội', 'hành chính', 140000000, '02/08/2026', 'Chậm thực hiện nghĩa vụ theo bản án hành chính đã có hiệu lực pháp luật.'],
        [14, 'BT-2026-814', 'VVBT-2026-714', 'Đoàn Thị Vân', 'UBND Tỉnh Lâm Đồng', 'hành chính', 85000000, '15/08/2026', 'Tước quyền sử dụng giấy phép lái xe sai lỗi hành chính gây gián đoạn kinh doanh.'],
        [15, 'BT-2026-815', 'VVBT-2026-715', 'Lương Đức Mạnh', 'UBND TP Hải Phòng', 'hành chính', 160000000, '18/07/2026', 'Cưỡng chế sai chỉ giới xây dựng cấp phép.'],
        [16, 'BT-2026-816', 'VVBT-2026-716', 'Nghiêm Thị Hà', 'Sở Tư pháp Hà Nội', 'hành chính', 220000000, '20/07/2026', 'Giám định tài sản không đúng tiêu chuẩn gây bồi thường chênh lệch.'],
        [17, 'BT-2026-817', 'VVBT-2026-717', 'Kiều Thị Thơ', 'UBND Tỉnh Lâm Đồng', 'hành chính', 110000000, '05/08/2026', 'Tịch thu nông sản khi không đủ căn cứ vi phạm.'],
        [18, 'BT-2026-818', 'VVBT-2026-718', 'Thái Văn Lộc', 'Sở Tư pháp Hà Nội', 'hành chính', 95000000, '12/07/2026', 'Chậm giải tỏa phong tỏa tài sản sau khi có quyết định hủy bỏ biện pháp khẩn cấp.'],
        [19, 'BT-2026-819', 'VVBT-2026-719', 'Ninh Văn Hiển', 'UBND phường Ba Đình', 'hành chính', 65000000, '10/06/2026', 'Thực hiện biện pháp khẩn cấp trong tình thế phòng cháy chữa cháy cấp thiết.'],
        [20, 'BT-2026-820', 'VVBT-2026-720', 'Âu Thị Phượng', 'UBND Tỉnh Lâm Đồng', 'hành chính', 80000000, '22/05/2026', 'Cán bộ ban hành quyết định đã từ trần, cơ quan ban hành QĐ đình chỉ việc xem xét trách nhiệm hoàn trả theo Luật BTNN.'],
        [21, 'BT-2026-821', 'VVBT-2026-721', 'Hứa Văn Kiên', 'Sở Tư pháp Hà Nội', 'hình sự', 200000000, '10/05/2026', 'Cán bộ ký ban hành quyết định thu hồi đất không đúng thẩm quyền gây thiệt hại cho người dân.'],
        [22, 'BT-2026-822', 'VVBT-2026-722', 'Bế Văn Thuận', 'Sở Tư pháp Hà Nội', 'hành chính', 40000000, '20/06/2026', 'Thu giữ phương tiện vi phạm quá thời hạn tạm giữ theo quy định.'],
        [23, 'BT-2026-823', 'VVBT-2026-723', 'La Văn Sinh', 'Sở Tư pháp Hà Nội', 'hành chính', 60000000, '20/06/2026', 'Ban hành quyết định xử phạt vi phạm hành chính sai đối tượng.'],
        [24, 'BT-2026-824', 'VVBT-2026-724', 'Mông Thị Hiền', 'Sở Tư pháp Hà Nội', 'hành chính', 35000000, '20/06/2026', 'Chậm cấp giấy chứng nhận quyền sử dụng đất gây thiệt hại.'],
        [25, 'BT-2026-825', 'VVBT-2026-725', 'Quản Văn Tư', 'Sở Tư pháp Hà Nội', 'hành chính', 180000000, '20/06/2026', 'Cưỡng chế thu hồi đất không đúng trình tự, thủ tục.'],
        [26, 'BT-2026-826', 'VVBT-2026-726', 'Công ty Cổ phần Thương mại An Phú', 'Sở Tư pháp Hà Nội', 'hành chính', 120000000, '20/06/2026', 'Ra quyết định tạm giữ hành chính trái pháp luật; văn bản làm căn cứ bị hủy bỏ một phần.'],
        [27, 'BT-2026-827', 'VVBT-2026-727', 'Viên Văn Trí', 'Sở Tư pháp Hà Nội', 'hình sự', 260000000, '20/06/2026', 'Giải phóng mặt bằng sai quy hoạch, ban hành nhiều quyết định thu hồi đất trái pháp luật tại 03 địa bàn.'],
        [28, 'BT-2026-828', 'VVBT-2026-728', 'Đào Văn Chính', 'Sở Tư pháp Hà Nội', 'hình sự', 150000000, '20/06/2026', 'Tạm giữ, tạm giam trái pháp luật trong giai đoạn điều tra; người bị tạm giam được tuyên không phạm tội.']
,
        [101, 'BT-2026-101', 'VVBT-2026-731', 'Đặng Văn Hưng', 'UBND phường Việt Hưng', 'hành chính', 95000000, '05/08/2026', 'Ban hành quyết định thu hồi đất không đúng thẩm quyền.'],
        [102, 'BT-2026-102', 'VVBT-2026-732', 'Công ty TNHH Minh Khang', 'UBND phường Việt Hưng', 'hành chính', 240000000, '12/08/2026', 'Ra quyết định đình chỉ hoạt động kinh doanh trái pháp luật.'],
        [103, 'BT-2026-103', 'VVBT-2026-733', 'Trịnh Thị Lan', 'UBND phường Việt Hưng', 'hành chính', 68000000, '20/08/2026', 'Cưỡng chế phá dỡ công trình sai chỉ giới được cấp phép.'],
        [104, 'BT-2026-104', 'VVBT-2026-734', 'Hồ Minh Trí', 'UBND phường Việt Hưng', 'hành chính', 132000000, '28/08/2026', 'Chậm thực hiện bản án hành chính đã có hiệu lực pháp luật.'],
        [105, 'BT-2026-105', 'VVBT-2026-735', 'Lưu Thị Phương', 'UBND phường Việt Hưng', 'hành chính', 54000000, '03/09/2026', 'Từ chối đăng ký hộ tịch trái pháp luật.'],
        [106, 'BT-2026-106', 'VVBT-2026-736', 'Tôn Văn Kiên', 'UBND phường Cầu Giấy', 'hành chính', 77000000, '15/08/2026', 'Cấp giấy chứng nhận quyền sử dụng đất sai đối tượng.']
        ];
        var htpD = function (s, k) { var p = s.split('/'); var d = new Date(+p[2], +p[1] - 1, +p[0] - k); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };
        var htpSigner = function (ag) {
            if (/^Sở Tư pháp/.test(ag)) return ['Phạm Quang Huy', 'Giám đốc Sở Tư pháp', 'STP'];
            if (/^UBND tỉnh|^UBND Tỉnh|^UBND TP/.test(ag)) return ['Kha Văn Sang', 'Chủ tịch UBND tỉnh, thành phố', 'UBND'];
            return ['Trần Quốc Hưng', 'Chủ tịch UBND phường', 'UBND'];
        };
        HTP_ROWS.forEach(function (r) {
            var n = r[0], paid = r[7], dec = htpD(paid, 20), neg = htpD(paid, 28), xm = htpD(paid, 35), thuLy = htpD(paid, 55), recv = htpD(paid, 60);
            var sg = htpSigner(r[4]), org = /^(Công ty|Hợp tác xã)/.test(r[3]);
            var c = sdxBase({
                id: 'SDX_HTP' + n, code: r[1], maVuViec: r[2], requestType: 'money', fieldGroup: r[5],
                date: recv, deadline: htpD(recv, -60), requestDocDate: htpD(recv, 3),
                nyc: r[3], nycType: org ? 'Tổ chức' : 'Cá nhân', nycOrgCode: org ? '0108' + String(700000 + n) : '', nycRepName: org ? 'Nguyễn Văn Đại' : '', nycRepPosition: org ? 'Giám đốc' : '',
                nycBirth: org ? '' : '15/0' + (1 + n % 9) + '/198' + (n % 10), nycCardNo: org ? '' : '0010' + String(80000000 + n * 137), nycCardDate: org ? '' : '12/05/2021',
                nycPhone: '09' + String(12000000 + n * 731).slice(0, 8), nycPhuongXa: '', nycAddressDetail: 'Số ' + (10 + n) + ' phố Trần Phú',
                agency: r[4],
                docBase: 'Văn bản hủy bỏ văn bản làm căn cứ yêu cầu bồi thường số ' + (30 + n) + '/QĐ-HB',
                vanBanCanCu: [{ name: 'Văn bản hủy bỏ văn bản làm căn cứ yêu cầu bồi thường số ' + (30 + n) + '/QĐ-HB', file: 'Van_ban_huy_bo_' + r[1] + '.pdf' }],
                hanhVi: r[8], nhanQua: 'Thiệt hại thực tế phát sinh trực tiếp từ hành vi trái pháp luật của người thi hành công vụ.',
                status: 'Hoàn thành', slaText: 'Đã hoàn thành chi trả tiền bồi thường',
                thietHaiList: sdxThiet([[1, r[6], r[6]]], xm),
                appointedOfficers: sdxAppointed(r[4], thuLy),
                thongBaoThuLy: { signingMethod: 'Ký số', issuedAt: thuLy, soKyHieu: (100 + n) + '/TB-' + sg[2], ngay: thuLy, fileName: 'Thong_bao_thu_ly_' + r[1] + '.pdf' },
                files: [{ name: 'Van_ban_yeu_cau_boi_thuong_' + r[1] + '.pdf', url: '#' }]
            });
            sdxXm(c, xm);
            sdxNeg(c, neg, null, '');
            sdxDec(c, (200 + n) + '/QĐ-' + sg[2], dec, sg[0], sg[1]);
            c.thucthiDate = paid;
            c.thucthiNote = 'Đã chi trả đủ ' + sdxMoney(c.xmTotalAmount) + ' đồng.';
            c.timeline = [
                sdxT('Tiếp nhận hồ sơ', recv, 'Tiếp nhận văn bản yêu cầu bồi thường trực tiếp.', 'Hệ thống / Người nộp đơn'),
                sdxT('Thông báo thụ lý hồ sơ', thuLy, 'Ban hành Thông báo thụ lý; cử ông Nguyễn Văn Chuyên Viên giải quyết.', sg[0] + ' (' + sg[1] + ')'),
                sdxT('Xác minh thiệt hại', xm, 'Hoàn thành báo cáo xác minh thiệt hại: ' + sdxMoney(c.xmTotalAmount) + ' đồng.', SDX_CB),
                sdxT('Thương lượng bồi thường', neg, 'Thương lượng thành công, lập Biên bản thương lượng.', SDX_CB),
                sdxT('Ban hành Quyết định giải quyết bồi thường', dec, 'Quyết định số ' + c.decNo + '.', sg[0] + ' (' + sg[1] + ')'),
                sdxT('Hoàn thành chi trả tiền bồi thường', paid, 'Đã chi trả đủ tiền bồi thường. Vụ việc chuyển sang trạng thái [Hoàn thành].', SDX_CB)
            ];
            L.push(c);
        });
        // ===== Vụ việc của các bản ghi Kinh phí bồi thường mẫu (quan_ly_kinh_phi_*.js): Người yêu cầu, Số tiền, Trạng thái khớp bản ghi Kinh phí =====
        // [Mã hồ sơ, Mã vụ việc, Người yêu cầu, Cơ quan giải quyết, Lĩnh vực, Số tiền yêu cầu, Trạng thái, Ngày tiếp nhận, Số QĐ GQBT, Ngày QĐ, Ngày hoàn tất chi trả]
        var KPC_ROWS = [
            ['BT-2026-024', 'VVBT-2026-024', 'Bùi Thị Ngọc', 'Sở Tư pháp Hà Nội', 'hành chính', 175000000, 'Chờ chi trả', '20/07/2026', '214/QĐ-STP', '15/09/2026', ''],
            ['BT-2026-025', 'VVBT-2026-025', 'Dương Đình Trọng', 'Sở Tư pháp Hà Nội', 'hành chính', 150000000, 'Xác minh thiệt hại', '01/09/2026', '', '', ''],
            ['BT-2026-028', 'VVBT-2026-028', 'Hoàng Văn Thái', 'Tòa án nhân dân Thành phố Hà Nội', 'hình sự', 180000000, 'Xác minh thiệt hại', '01/09/2026', '', '', ''],
            ['BT-2026-075', 'VVBT-2026-075', 'Lê Thị Thu Hà', 'Sở Tư pháp Hà Nội', 'hành chính', 75000000, 'Chờ chi trả', '10/08/2026', '275/QĐ-STP', '10/10/2026', ''],
            ['BT-2026-076', 'VVBT-2026-076', 'Trịnh Văn Quang', 'Sở Tư pháp Hà Nội', 'hành chính', 128000000, 'Chờ chi trả', '11/08/2026', '276/QĐ-STP', '12/10/2026', ''],
            ['BT-2026-077', 'VVBT-2026-077', 'Phan Thị Ngọc', 'Sở Tư pháp Hà Nội', 'hành chính', 92000000, 'Hoàn thành', '05/08/2026', '277/QĐ-STP', '01/10/2026', '12/10/2026'],
            ['BT-2026-078', 'VVBT-2026-078', 'Ngô Thị Lan', 'Sở Tư pháp Hà Nội', 'hành chính', 66000000, 'Đình chỉ giải quyết', '02/08/2026', '278/QĐ-STP', '02/10/2026', '10/10/2026'],
            ['BT-2026-087', 'VVBT-2026-087', 'Lý Thị Hồng', 'Sở Tư pháp Hà Nội', 'hành chính', 83000000, 'Chờ chi trả', '20/08/2026', '287/QĐ-STP', '20/10/2026', ''],
            ['BT-2026-089', 'VVBT-2026-089', 'Đỗ Minh Khôi', 'Sở Tư pháp Hà Nội', 'hành chính', 48000000, 'Dừng giải quyết', '03/08/2026', '289/QĐ-STP', '03/10/2026', '11/10/2026'],
            ['BT-2023-021', 'VVBT-2023-021', 'Vũ Đức Thắng', 'Sở Tư pháp Hà Nội', 'hành chính', 64000000, 'Hoàn thành', '10/01/2023', '21/QĐ-STP', '20/03/2023', ''],
            ['BT-2023-041', 'VVBT-2023-041', 'Lê Thị Hạnh', 'Sở Tư pháp Hà Nội', 'hành chính', 85000000, 'Chờ chi trả', '15/02/2023', '12/QĐ-STP', '05/05/2023', ''],
            ['BT-2023-047', 'VVBT-2023-047', 'Đinh Công Tráng', 'Sở Tư pháp Hà Nội', 'hành chính', 56000000, 'Chờ chi trả', '20/03/2023', '47/QĐ-STP', '30/05/2023', ''],
            ['BT-2023-058', 'VVBT-2023-058', 'Hoàng Văn Lâm', 'Sở Tư pháp Hà Nội', 'hành chính', 47000000, 'Chờ chi trả', '15/08/2023', '58/QĐ-STP', '25/10/2023', ''],
            // Trả lại ngân sách nhà nước một phần (KP-2026-130): đã chi 60.000.000, trả lại 30.000.000; nguồn lập hồ sơ hoàn trả (ht_du_lieu_mau.js HT_SOURCE_CLAIMS)
            ['BT-2023-063', 'VVBT-2023-063', 'Phùng Thị Xuân', 'UBND phường Việt Hưng', 'hành chính', 90000000, 'Hoàn thành', '10/03/2023', '63/QĐ-UBND', '20/06/2023', '15/03/2026'],
            // Chi trả nhiều lần (KP-2026-131): đã chi lần 1 40.000.000 / 100.000.000, bản ghi Kinh phí còn Chờ chi trả
            ['BT-2026-097', 'VVBT-2026-097', 'Tạ Thị Hòa', 'Sở Tư pháp Hà Nội', 'hành chính', 100000000, 'Chờ chi trả', '05/08/2026', '297/QĐ-STP', '08/10/2026', ''],
            ['BT-2026-171', 'VVBT-2026-751', 'Lê Thị Minh Thu', 'Sở Tư pháp Thành phố Hà Nội', 'hành chính', 120000000, 'Cử người giải quyết bồi thường', '02/10/2026', '', '', ''],
            ['BT-2026-172', 'VVBT-2026-752', 'Công ty TNHH Thương mại Phú Thịnh', 'Sở Tư pháp Thành phố Hà Nội', 'hành chính', 260000000, 'Xác minh thiệt hại', '28/09/2026', '', '', ''],
            ['BT-2026-173', 'VVBT-2026-753', 'Trịnh Văn Hải', 'Sở Tư pháp Thành phố Hà Nội', 'hành chính', 200000000, 'Thương lượng', '25/09/2026', '', '', ''],
            ['BT-2026-174', 'VVBT-2026-754', 'Đặng Văn Sơn', 'Sở Tư pháp Thành phố Hà Nội', 'hành chính', 150000000, 'Chờ ban hành QĐ', '20/09/2026', '', '', '']
        ];
        // Mã hồ sơ -> [Ngày trả lại ngân sách nhà nước, Mã kinh phí, Số tiền trả lại (bỏ trống = toàn bộ)]
        var KPC_TLNS = { 'BT-2023-021': ['05/10/2026', 'KP-2026-125'], 'BT-2023-063': ['22/10/2026', 'KP-2026-130', 30000000] };
        KPC_ROWS.forEach(function (r, k) {
            var st = r[6], recv = r[7], decDate = r[9], paid = r[10];
            var stage = ['Cử người giải quyết bồi thường'].indexOf(st) >= 0 ? 1 : (st === 'Xác minh thiệt hại' ? 2 : (st === 'Thương lượng' ? 3 : (st === 'Chờ ban hành QĐ' ? 4 : 5)));
            var xm = stage >= 3 ? htpD(recv, -20) : '', org = /^(Công ty|Hợp tác xã)/.test(r[2]);
            var sg = /^Tòa án/.test(r[3]) ? ['Vương Minh Khang', 'Chánh án', 'TA'] : (/^UBND phường/.test(r[3]) ? ['Trần Quốc Hưng', 'Chủ tịch UBND phường', 'UBND'] : ['Phạm Quang Huy', 'Giám đốc Sở Tư pháp', 'STP']);
            var c = sdxBase({
                id: 'SDX_KPC' + (k + 1), code: r[0], maVuViec: r[1], requestType: 'money', fieldGroup: r[4],
                date: recv, deadline: htpD(recv, -60), requestDocDate: htpD(recv, 3),
                nyc: r[2], nycType: org ? 'Tổ chức' : 'Cá nhân', nycOrgCode: org ? '0105566778' : '', nycRepName: org ? 'Nguyễn Văn Đại' : '', nycRepPosition: org ? 'Giám đốc' : '',
                nycBirth: org ? '' : '10/0' + (1 + k % 9) + '/198' + (k % 10), nycCardNo: org ? '' : '0010' + String(85000000 + k * 211), nycCardDate: org ? '' : '12/05/2021',
                nycPhone: '09' + String(13000000 + k * 977).slice(0, 8), nycPhuongXa: '', nycAddressDetail: 'Số ' + (5 + k) + ' phố Đội Cấn',
                agency: r[3],
                docBase: 'Văn bản làm căn cứ yêu cầu bồi thường số ' + (60 + k) + '/QĐ-HB',
                vanBanCanCu: [{ name: 'Văn bản làm căn cứ yêu cầu bồi thường số ' + (60 + k) + '/QĐ-HB', file: 'Van_ban_can_cu_' + r[0] + '.pdf' }],
                hanhVi: 'Ra quyết định hành chính trái pháp luật gây thiệt hại về tài sản.', nhanQua: 'Thiệt hại thực tế phát sinh trực tiếp từ hành vi trái pháp luật của người thi hành công vụ.',
                status: st, slaText: st,
                thietHaiList: sdxThiet([stage >= 3 ? [1, r[5], r[5]] : [1, r[5]]], xm),
                appointedOfficers: sdxAppointed(r[3], htpD(recv, -5)),
                thongBaoThuLy: { signingMethod: 'Ký số', issuedAt: htpD(recv, -5), soKyHieu: (300 + k) + '/TB-' + sg[2], ngay: htpD(recv, -5), fileName: 'Thong_bao_thu_ly_' + r[0] + '.pdf' },
                files: [{ name: 'Van_ban_yeu_cau_boi_thuong_' + r[0] + '.pdf', url: '#' }]
            });
            if (stage >= 3) { sdxXm(c, xm); sdxNeg(c, htpD(xm, -7), null, ''); }
            if (r[8]) sdxDec(c, r[8], decDate, sg[0], sg[1]);
            if (paid) { c.thucthiDate = paid; c.thucthiNote = 'Đã chi trả ' + sdxMoney(r[5]) + ' đồng.'; }
            // Bản ghi Chi trả tiền bồi thường đã Trả lại ngân sách nhà nước (quan_ly_kinh_phi_kpux.js): Trạng thái Giải quyết YCBT Hoàn thành
            var sq = KPC_TLNS[r[0]];
            if (sq && sq[2] && sq[2] < r[5]) {
                // Trả lại một phần: vụ việc tính là đã chi trả theo Số tiền đã chi thực tế; Ngày hoàn tất chi trả = Ngày trả lại ngân sách nhà nước
                var paidReal = r[5] - sq[2];
                c.sungQuy = true; c.moneyPaid = true; c.thucthiDate = sq[0];
                c.thucthiNote = 'Đã chi trả ' + sdxMoney(paidReal) + ' đồng; trả lại ngân sách nhà nước ' + sdxMoney(sq[2]) + ' đồng (' + sq[1] + ').';
                c.slaText = 'Đã trả lại ngân sách nhà nước một phần';
                c.timeline = [
                    sdxT('Chi trả tiền bồi thường', paid, 'Đã chi trả ' + sdxMoney(paidReal) + ' đồng (' + sq[1] + ').', SDX_CB),
                    sdxT('Trả lại ngân sách nhà nước', sq[0], 'Phần còn lại ' + sdxMoney(sq[2]) + ' đồng người yêu cầu không nhận trong thời hạn, đã nộp trả vào ngân sách nhà nước (' + sq[1] + '). Trạng thái Giải quyết YCBT chuyển Hoàn thành.', SDX_CB)];
            } else if (sq) {
                c.sungQuy = true;
                c.thucthiNote = 'Đã trả lại ngân sách nhà nước số tiền ' + sdxMoney(r[5]) + ' đồng (' + sq[1] + ').';
                c.slaText = 'Đã trả lại ngân sách nhà nước';
                c.timeline = [sdxT('Trả lại ngân sách nhà nước', sq[0], 'Người yêu cầu không nhận tiền bồi thường trong thời hạn; đã nộp trả ' + sdxMoney(r[5]) + ' đồng vào ngân sách nhà nước (' + sq[1] + '). Trạng thái Giải quyết YCBT chuyển Hoàn thành.', SDX_CB)];
            }
            L.push(c);
        });
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
