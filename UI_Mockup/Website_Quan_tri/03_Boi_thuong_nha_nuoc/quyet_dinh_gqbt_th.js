/*
 * Quyết định giải quyết bồi thường - dữ liệu mẫu bổ sung đủ các trường hợp (09/11/2026).
 * Bổ sung các trường hợp chưa có trong dữ liệu mẫu (QD-01..QD-12, QD-HL1..5, QD-GQL1..3, QD-RT1, QD-LD1):
 *  - QD-TH1: Đã ban hành bằng Ký ngoài, chờ cập nhật hiệu lực
 *  - QD-TH2: Có hiệu lực; có tạm ứng; người nhận tiền là người được ủy quyền (khác người yêu cầu); chi trả tiền mặt
 *  - QD-TH3: Có hiệu lực; Quyết định sửa chữa, bổ sung lần 1 Có hiệu lực
 *  - QD-TH4: Có hiệu lực; Quyết định sửa chữa, bổ sung lần 1 đã ban hành, chờ cập nhật hiệu lực
 *  - QD-TH5: Có hiệu lực; 02 lần sửa chữa, bổ sung (lần 1 Có hiệu lực, lần 2 Không có hiệu lực)
 *  - QD-TH6: Hủy quyết định bằng Ký ngoài (Quyết định hủy ban hành trực tiếp)
 *  - QD-TH7: Bị trả lại tại cấp cuối (cấp 1 đã Ký duyệt, Lãnh đạo Sở Từ chối)
 * Quyết định Có hiệu lực / đã hủy: ghi hàng đợi liên thông Kinh phí (kptbNotifyIssued) để phân hệ Kinh phí tạo bản ghi Chi trả khi tải trang.
 */
(function () {
    'use strict';
    var KEY = 'btnn_qd_th_seed_v1';
    var ON = 'Có hiệu lực', OFF = 'Không có hiệu lực';
    function h(at, uid, action, note) { return { at: at, userId: uid, userName: W.userName(uid), action: action, note: note || '' }; }
    function hl(at, uid, from, to, reason) { return { at: at, userId: uid, userName: W.userName(uid), from: from, to: to, reason: reason || '', docs: [] }; }
    function rec(name, idNo, account, bank, branch) { return { name: name, idNo: idNo, account: account || '', bank: bank || '', branch: branch || '' }; }

    function defs() {
        var HN = 'STP-HN';
        return [
            // 1. Đã ban hành bằng Ký ngoài, chờ cập nhật hiệu lực
            seedDec({ id: 'QD-TH1', claimCode: 'BT-2026-581', nycName: 'Hoàng Văn Thắng', nycAddress: 'Số 9 phố Hàng Bài, Phường Hoàn Kiếm, Thành phố Hà Nội', unitId: HN, leaderId: 'gdso_hn', approvedBy: 'gdso_hn',
                status: ST.DA_BH, decNo: '81/QĐ-STP', issueDate: '02/11/2026', signedFile: 'QD_81_GQBT_ky_ngoai.pdf', signMethod: 'Ký ngoài', lastKind: KIND_QD,
                items: seedItems([['Thu nhập thực tế bị mất/giảm sút', 95000000, 90000000, 90000000]]), recipient: rec('Hoàng Văn Thắng', '001080005810', '0011005810581', 'Vietcombank', 'Chi nhánh Hoàn Kiếm'),
                history: [h('16:00 02/11/2026', 'cv_hn1', 'Ban hành văn bản', 'Ký ngoài. Số 81/QĐ-STP ngày 02/11/2026; người ký: Phạm Quang Huy - Giám đốc Sở. Quyết định chuyển [Đã ban hành].')],
                createdBy: 'cv_hn1', updatedAt: '2026-11-02T16:00:00.000Z' }),
            // 2. Có hiệu lực; tạm ứng 30 triệu; người nhận là người được ủy quyền; chi trả tiền mặt (không có tài khoản)
            seedDec({ id: 'QD-TH2', claimCode: 'BT-2026-582', nycName: 'Nguyễn Thị Hạnh', nycAddress: 'Số 45 phố Tây Sơn, Phường Đống Đa, Thành phố Hà Nội', unitId: HN, leaderId: 'gdso_hn', approvedBy: 'gdso_hn',
                status: ST.DA_BH, hieuLuc: ON, decNo: '82/QĐ-STP', issueDate: '20/10/2026', signedFile: 'QD_82_GQBT_ky_so.pdf', signMethod: 'Ký số', lastKind: KIND_QD, advance: 30000000,
                items: seedItems([['Thiệt hại về sức khỏe', 140000000, 130000000, 130000000], ['Thiệt hại về tinh thần', 40000000, 30000000, 30000000]]),
                recipient: rec('Nguyễn Văn Tuấn (người được ủy quyền)', '001085005820', '', '', ''),
                history: [h('10:00 20/10/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 82/QĐ-STP ngày 20/10/2026.'),
                    h('09:00 22/10/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định chuyển từ [Đã ban hành] sang [Có hiệu lực].')],
                hieuLucHistory: [hl('09:00 22/10/2026', 'cv_hn1', ST.DA_BH, ON)], createdBy: 'cv_hn1', updatedAt: '2026-10-22T09:00:00.000Z' }),
            // 3. Có hiệu lực; sửa chữa, bổ sung lần 1 Có hiệu lực
            seedDec({ id: 'QD-TH3', claimCode: 'BT-2026-583', nycName: 'Trần Văn Khải', nycAddress: 'Số 12 phố Láng Hạ, Phường Láng, Thành phố Hà Nội', unitId: HN, leaderId: 'gdso_hn', approvedBy: 'gdso_hn',
                status: ST.DA_BH, hieuLuc: ON, decNo: '83/QĐ-STP', issueDate: '05/10/2026', signedFile: 'QD_83_GQBT_ky_so.pdf', signMethod: 'Ký số', lastKind: KIND_SC,
                items: seedItems([['Tài sản bị xâm phạm', 260000000, 250000000, 250000000]]), recipient: rec('Trần Văn Khải', '001078005830', '0021005830583', 'BIDV', 'Chi nhánh Đống Đa'),
                amendments: [{ kind: KIND_SC, content: 'Sửa chữa số tài khoản nhận tiền bồi thường tại Điều 2 từ "0021005830538" thành "0021005830583" do sai sót khi soạn thảo.', effectiveDate: 'kể từ ngày ký',
                    decNo: '91/QĐ-STP', issueDate: '15/10/2026', signMethod: 'Ký số', signedFile: 'QD_SCBS_91_BT-2026-583.pdf', submittedBy: 'cv_hn1', submittedAt: '09:00 13/10/2026', approvedBy: 'gdso_hn', at: '10:00 15/10/2026', hieuLuc: ON, hlAt: '08:30 16/10/2026' }],
                history: [h('10:00 05/10/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 83/QĐ-STP ngày 05/10/2026.'),
                    h('08:30 06/10/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định chuyển từ [Đã ban hành] sang [Có hiệu lực].'),
                    h('09:00 13/10/2026', 'cv_hn1', 'Trình ' + KIND_SC, 'Nội dung sửa chữa, bổ sung: Sửa chữa số tài khoản nhận tiền bồi thường tại Điều 2. Trình ' + W.userLabel('gdso_hn') + '.'),
                    h('10:00 15/10/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Sửa chữa, bổ sung QĐ. Quyết định sửa chữa, bổ sung lần 1 số 91/QĐ-STP ban hành.'),
                    h('08:30 16/10/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định sửa chữa, bổ sung lần 1 chuyển [Có hiệu lực].')],
                hieuLucHistory: [hl('08:30 06/10/2026', 'cv_hn1', ST.DA_BH, ON), Object.assign(hl('08:30 16/10/2026', 'cv_hn1', ST.DA_BH, ON), { scN: 1 })],
                createdBy: 'cv_hn1', updatedAt: '2026-10-16T08:30:00.000Z' }),
            // 4. Có hiệu lực; sửa chữa, bổ sung lần 1 đã ban hành, chờ cập nhật hiệu lực
            seedDec({ id: 'QD-TH4', claimCode: 'BT-2026-584', nycName: 'Lê Thị Ngân', nycAddress: 'Số 30 phố Nguyễn Trãi, Phường Thanh Xuân, Thành phố Hà Nội', unitId: HN, leaderId: 'gdso_hn', approvedBy: 'gdso_hn',
                status: ST.DA_BH, hieuLuc: '', decNo: '84/QĐ-STP', issueDate: '08/10/2026', signedFile: 'QD_84_GQBT_ky_so.pdf', signMethod: 'Ký số', lastKind: KIND_SC,
                items: seedItems([['Thu nhập thực tế bị mất/giảm sút', 120000000, 110000000, 110000000]]), recipient: rec('Lê Thị Ngân', '001190005840', '1903005840584', 'Techcombank', 'Chi nhánh Thanh Xuân'),
                amendments: [{ kind: KIND_SC, content: 'Bổ sung thông tin chi nhánh ngân hàng nhận tiền bồi thường tại Điều 2.', effectiveDate: 'kể từ ngày ký',
                    decNo: '96/QĐ-STP', issueDate: '04/11/2026', signMethod: 'Ký số', signedFile: 'QD_SCBS_96_BT-2026-584.pdf', submittedBy: 'cv_hn1', submittedAt: '09:00 03/11/2026', approvedBy: 'gdso_hn', at: '15:00 04/11/2026' }],
                scPending: { n: 1, at: '15:00 04/11/2026', prevHieuLuc: ON },
                history: [h('10:00 08/10/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 84/QĐ-STP ngày 08/10/2026.'),
                    h('09:00 09/10/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định chuyển từ [Đã ban hành] sang [Có hiệu lực].'),
                    h('09:00 03/11/2026', 'cv_hn1', 'Trình ' + KIND_SC, 'Nội dung sửa chữa, bổ sung: Bổ sung thông tin chi nhánh ngân hàng nhận tiền bồi thường tại Điều 2. Trình ' + W.userLabel('gdso_hn') + '.'),
                    h('15:00 04/11/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Sửa chữa, bổ sung QĐ. Quyết định sửa chữa, bổ sung lần 1 số 96/QĐ-STP ban hành, chờ cập nhật hiệu lực.')],
                hieuLucHistory: [hl('09:00 09/10/2026', 'cv_hn1', ST.DA_BH, ON)], createdBy: 'cv_hn1', updatedAt: '2026-11-04T15:00:00.000Z' }),
            // 5. Có hiệu lực; 02 lần sửa chữa, bổ sung: lần 1 Có hiệu lực, lần 2 Không có hiệu lực
            seedDec({ id: 'QD-TH5', claimCode: 'BT-2026-585', nycName: 'Phạm Quốc Toàn', nycAddress: 'Số 8 phố Trần Duy Hưng, Phường Yên Hòa, Thành phố Hà Nội', unitId: HN, leaderId: 'gdso_hn', approvedBy: 'gdso_hn',
                status: ST.DA_BH, hieuLuc: ON, decNo: '85/QĐ-STP', issueDate: '25/09/2026', signedFile: 'QD_85_GQBT_ky_so.pdf', signMethod: 'Ký số', lastKind: KIND_SC,
                items: seedItems([['Tài sản bị xâm phạm', 180000000, 170000000, 170000000]]), recipient: rec('Phạm Quốc Toàn', '001083005850', '0451005850585', 'Vietinbank', 'Chi nhánh Cầu Giấy'),
                amendments: [
                    { kind: KIND_SC, content: 'Sửa chữa ngày sinh của người yêu cầu bồi thường tại Điều 1.', effectiveDate: 'kể từ ngày ký', decNo: '88/QĐ-STP', issueDate: '05/10/2026', signMethod: 'Ký số',
                        signedFile: 'QD_SCBS_88_BT-2026-585.pdf', submittedBy: 'cv_hn1', submittedAt: '09:00 03/10/2026', approvedBy: 'gdso_hn', at: '10:00 05/10/2026', hieuLuc: ON, hlAt: '09:00 06/10/2026' },
                    { kind: KIND_SC, content: 'Sửa chữa họ và tên người nhận tiền bồi thường tại Điều 2.', effectiveDate: 'kể từ ngày ký', decNo: '93/QĐ-STP', issueDate: '20/10/2026', signMethod: 'Ký ngoài',
                        signedFile: 'QD_SCBS_93_BT-2026-585_ky_ngoai.pdf', submittedBy: 'cv_hn1', submittedAt: '16:00 20/10/2026', approvedBy: 'gdso_hn', at: '16:00 20/10/2026',
                        hieuLuc: OFF, hlAt: '10:00 27/10/2026', hlReason: 'Thông tin người nhận tiền tại Quyết định gốc đã đúng; Quyết định sửa chữa, bổ sung lần 2 ban hành do nhầm hồ sơ.', scbfVoid: true }
                ],
                history: [h('10:00 25/09/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 85/QĐ-STP ngày 25/09/2026.'),
                    h('09:00 26/09/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định chuyển từ [Đã ban hành] sang [Có hiệu lực].'),
                    h('10:00 05/10/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Sửa chữa, bổ sung QĐ. Quyết định sửa chữa, bổ sung lần 1 số 88/QĐ-STP ban hành.'),
                    h('09:00 06/10/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định sửa chữa, bổ sung lần 1 chuyển [Có hiệu lực].'),
                    h('16:00 20/10/2026', 'cv_hn1', 'Ban hành văn bản', 'Sửa chữa, bổ sung QĐ (Ký ngoài). Quyết định sửa chữa, bổ sung lần 2 số 93/QĐ-STP ban hành.'),
                    h('10:00 27/10/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định sửa chữa, bổ sung lần 2 chuyển [Không có hiệu lực]. Lý do cập nhật trạng thái: Thông tin người nhận tiền tại Quyết định gốc đã đúng; Quyết định sửa chữa, bổ sung lần 2 ban hành do nhầm hồ sơ. Bỏ lần sửa chữa, bổ sung; Quyết định giữ nội dung và trạng thái trước sửa chữa [Có hiệu lực].')],
                hieuLucHistory: [hl('09:00 26/09/2026', 'cv_hn1', ST.DA_BH, ON), Object.assign(hl('09:00 06/10/2026', 'cv_hn1', ST.DA_BH, ON), { scN: 1 }),
                    Object.assign(hl('10:00 27/10/2026', 'cv_hn1', ST.DA_BH, OFF, 'Thông tin người nhận tiền tại Quyết định gốc đã đúng; Quyết định sửa chữa, bổ sung lần 2 ban hành do nhầm hồ sơ.'), { scN: 2 })],
                createdBy: 'cv_hn1', updatedAt: '2026-10-27T10:00:00.000Z' }),
            // 6. Hủy quyết định bằng Ký ngoài
            seedDec({ id: 'QD-TH6', claimCode: 'BT-2026-586', nycName: 'Đặng Thị Lan', nycAddress: 'Số 15 phố Kim Mã, Phường Giảng Võ, Thành phố Hà Nội', unitId: HN, leaderId: 'gdso_hn', approvedBy: 'gdso_hn',
                status: ST.DA_HUY, hieuLuc: ON, decNo: '86/QĐ-STP', issueDate: '15/09/2026', signedFile: 'QD_86_GQBT_ky_so.pdf', signMethod: 'Ký số', lastKind: KIND_HUY,
                items: seedItems([['Thu nhập thực tế bị mất/giảm sút', 75000000, 70000000, 70000000]]), recipient: rec('Đặng Thị Lan', '001192005860', '0011005860586', 'Vietcombank', 'Chi nhánh Ba Đình'),
                cancel: { kind: KIND_HUY, content: 'Quyết định được ban hành khi vụ việc chưa đủ căn cứ xác định thiệt hại theo kết luận kiểm tra của Thanh tra Sở.', decNo: '99/QĐ-STP',
                    draftDoc: { source: 'uploaded', uploadedName: 'QD_huy_99_ky_ngoai.pdf' }, signMethod: 'Ký ngoài', approvedBy: 'cv_hn1', issuer: 'cv_hn1', signer: 'Phạm Quang Huy - Giám đốc Sở', at: '16:00 30/10/2026', signedFile: 'QD_huy_99_ky_ngoai.pdf' },
                history: [h('10:00 15/09/2026', 'gdso_hn', 'Phê duyệt cấp cuối', 'Quyết định GQBT. Quyết định chuyển [Đã ban hành]. Số 86/QĐ-STP ngày 15/09/2026.'),
                    h('09:00 16/09/2026', 'cv_hn1', 'Cập nhật hiệu lực QĐ', 'Quyết định chuyển từ [Đã ban hành] sang [Có hiệu lực].'),
                    h('16:00 30/10/2026', 'cv_hn1', 'Ban hành văn bản', 'Hủy QĐ (Ký ngoài). Quyết định hủy số 99/QĐ-STP; người ký: Phạm Quang Huy - Giám đốc Sở. Quyết định chuyển [Hủy quyết định].')],
                hieuLucHistory: [hl('09:00 16/09/2026', 'cv_hn1', ST.DA_BH, ON)], createdBy: 'cv_hn1', updatedAt: '2026-10-30T16:00:00.000Z' }),
            // 7. Bị trả lại tại cấp cuối: Lãnh đạo Phòng (cấp 1) đã Ký duyệt, Lãnh đạo Sở (cấp cuối) Từ chối
            seedDec({ id: 'QD-TH7', claimCode: 'BT-2026-587', nycName: 'Vũ Đình Hải', nycAddress: 'Số 22 phố Giải Phóng, Phường Bạch Mai, Thành phố Hà Nội', unitId: HN, leaderId: 'tp_hctp_hn',
                status: ST.TRA_LAI, wfKind: KIND_QD, wfSubmittedAt: '08:30 04/11/2026', signMethod: 'Ký số',
                items: seedItems([['Tài sản bị xâm phạm', 210000000, 200000000, 200000000]]), recipient: rec('Vũ Đình Hải', '001081005870', '0123005870587', 'Agribank', 'Chi nhánh Hai Bà Trưng'),
                returned: { reason: 'Mức bồi thường tài sản chưa trừ giá trị tài sản đã được hoàn trả; đề nghị rà soát lại Bảng nội dung đề xuất bồi thường.', by: 'gdso_hn', at: '14:00 05/11/2026', kind: KIND_QD },
                history: [h('08:30 04/11/2026', 'cv_hn1', 'Trình ký duyệt', 'Trình ' + W.userLabel('tp_hctp_hn') + ' ký duyệt.'),
                    h('16:00 04/11/2026', 'tp_hctp_hn', 'Phê duyệt', 'Quyết định GQBT: phê duyệt cấp ' + W.unitName('STP-HN-HCTP') + '; chuyển ' + W.userLabel('gdso_hn') + '.'),
                    h('14:00 05/11/2026', 'gdso_hn', 'Từ chối phê duyệt', 'Quyết định GQBT: Mức bồi thường tài sản chưa trừ giá trị tài sản đã được hoàn trả; đề nghị rà soát lại Bảng nội dung đề xuất bồi thường.')],
                createdBy: 'cv_hn1', updatedAt: '2026-11-05T14:00:00.000Z' })
        ];
    }

    function ensure() {
        try {
            var done = false;
            try { done = localStorage.getItem(KEY) === '1'; } catch (e) { /* bỏ qua */ }
            if (done) return;
            var changed = false;
            defs().forEach(function (s) {
                if (decisions.some(function (o) { return o && (o.id === s.id || o.claimCode === s.claimCode); })) return;
                decisions.push(s);
                changed = true;
                // Có hiệu lực (kể cả đã hủy sau khi có hiệu lực): liên thông Kinh phí tạo bản ghi Chi trả
                // Hàm liên thông gốc (kptbNotifyIssued đã bọc chỉ cho Quyết định đang Có hiệu lực; QD-TH4 đã Có hiệu lực trước khi có Quyết định sửa chữa, bổ sung chờ cập nhật hiệu lực)
                var notify = typeof qdhlOrigNotify === 'function' && qdhlOrigNotify ? qdhlOrigNotify : (typeof kptbNotifyIssued === 'function' ? kptbNotifyIssued : null);
                if (notify && (s.hieuLuc === ON || (s.scPending && s.scPending.prevHieuLuc === ON))) notify(s);
            });
            try { localStorage.setItem(KEY, '1'); } catch (e) { /* bỏ qua */ }
            if (changed) { saveDecisions(); if (typeof qdhlSyncMap === 'function') qdhlSyncMap(); }
        } catch (e) { console.error(e); }
    }

    if (typeof ctqdEnsureSeeds === 'function') {
        var prev = ctqdEnsureSeeds;
        ctqdEnsureSeeds = function () { var r = prev.apply(this, arguments); ensure(); return r; };
    } else {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(ensure, 0); });
    }
})();
