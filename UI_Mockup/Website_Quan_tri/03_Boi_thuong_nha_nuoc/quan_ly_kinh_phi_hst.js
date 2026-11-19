/*
 * Giả lập Kinh phí cho hồ sơ tồn (prefix kphst) - chốt BA 19/11/2026, mockup giả lập (SRS Kinh phí do người phụ trách cập nhật).
 * - Hồ sơ tồn "Chờ chi trả" tại Giải quyết YCBT: bản ghi Chi trả tiền bồi thường theo dõi tiếp như bản ghi thường
 *   (Cập nhật chi trả, Trả lại ngân sách nhà nước); khoản đã chi trước khi nhập ghi vào Lịch sử chi trả, ghi chú "Hồ sơ tồn".
 * - Hồ sơ tồn "Hoàn thành": không có bản ghi Kinh phí (Giải quyết YCBT không đồng bộ sang).
 * - Lưới: dòng phụ "Hồ sơ tồn" dưới Mã hồ sơ GQBT.
 */
(function () {
    'use strict';
    var GHI_CHU = 'Hồ sơ tồn - đã chi trước khi nhập hồ sơ vào hệ thống';
    function tonClaims() {
        try { var l = JSON.parse(localStorage.getItem('claimsList') || '[]'); return (Array.isArray(l) ? l : []).filter(function (c) { return c && c.ton; }); } catch (e) { return []; }
    }
    function apply() {
        if (typeof proposalsList === 'undefined' || !Array.isArray(proposalsList)) return;
        var ton = tonClaims(), map = {};
        ton.forEach(function (c) { map[c.code] = c; });
        // Dữ liệu mẫu: hồ sơ tồn BT-2025-903 (Chờ chi trả) -> bản ghi Chi trả tiền bồi thường tạo khi lưu hồ sơ tồn
        var c903 = map['BT-2025-903'];
        if (c903 && !proposalsList.some(function (p) { return p && p.ycbtCode === 'BT-2025-903' && p.type === 'Chi trả tiền bồi thường'; })) {
            proposalsList.unshift({
                id: 'P_TB_HST_CT', code: 'KP-2025-903', type: 'Chi trả tiền bồi thường', ycbtCode: 'BT-2025-903', decId: 'HST_CT', origin: 'Quyết định giải quyết bồi thường',
                nycName: c903.nyc || '', nycRole: 'Người bị thiệt hại', amount: 96000000, user: 'Nguyễn Văn Chuyên Viên', date: '12/11/2026', status: 'Chờ chi trả',
                source: '', cqCap: '', agency: c903.agency || 'Sở Tư pháp Hà Nội', baseDecisionNo: '103/QĐ-STP', baseDecisionDate: '20/06/2025', notes: '', files: [],
                kptbDec: { decId: 'HST_CT', claimCode: 'BT-2025-903', nycName: c903.nyc || '', unitName: c903.agency || '', decNo: '103/QĐ-STP', issueDate: '20/06/2025', total: 96000000, advance: 0, net: 96000000, recipient: { name: c903.nyc || '' }, payout: { method: 'Nhận qua chuyển khoản' }, at: '12/11/2026' },
                kptbHistory: [{ at: '09:00 12/11/2026', userName: 'Nguyễn Văn Chuyên Viên', action: 'Tạo bản ghi', note: 'Tạo từ Nhập hồ sơ tồn (hồ sơ BT-2025-903, Quyết định giải quyết bồi thường số 103/QĐ-STP ngày 20/06/2025, Ký ngoài); Thông báo chi trả đã ban hành trên giấy; trạng thái Chờ chi trả.' }],
                kptbNotice: { signMethod: 'Ký ngoài', signedFile: 'Thong_bao_chi_tra_BT-2025-903_da_ky.pdf', issuedAt: '01/07/2025' },
                noticeReceivedDate: '01/07/2025', noticeLatest: { no: '21/TB-STP', date: '01/07/2025', deadline: '01/07/2028' }
            });
        }
        // Hồ sơ tồn Hoàn thành: không tạo bản ghi Kinh phí
        for (var i = proposalsList.length - 1; i >= 0; i--) {
            var it = proposalsList[i], c = map[it && it.ycbtCode];
            if (!c) continue;
            if (c.status === 'Hoàn thành' && !(it.payHistory || []).some(function (h) { return h && h.tonSau; })) { proposalsList.splice(i, 1); continue; }
            it.ton = true;
            if (it.type === 'Chi trả tiền bồi thường' && !it.tonInit) {
                it.tonInit = true;
                var daChi = c.code === 'BT-2025-903' ? 40000000 : 0;
                if (daChi && !Array.isArray(it.payHistory)) it.payHistory = [{ no: 1, payDate: '15/09/2025', amount: daChi, method: 'Chuyển khoản', recName: c.nyc || '', files: [], note: GHI_CHU, at: '12/11/2026', by: 'Nguyễn Văn Chuyên Viên', ton: true }];
            }
        }
    }
    function badge() {
        var codes = {};
        tonClaims().forEach(function (c) { codes[c.code] = 1; });
        document.querySelectorAll('a[href*="quan_ly_boi_thuong.html?id="]').forEach(function (a) {
            if (!codes[a.textContent.trim()] || a.parentNode.querySelector('.kphst-badge')) return;
            var b = document.createElement('span');
            b.className = 'kphst-badge'; b.textContent = 'Hồ sơ tồn'; b.title = 'Hồ sơ đã giải quyết trên giấy, nhập vào hệ thống';
            b.style.cssText = 'display:inline-block;white-space:nowrap;background:#e5e7eb;color:#374151;border-radius:4px;padding:2px 6px;font-size:10.5px;font-weight:600;margin-top:4px;text-decoration:none';
            a.parentNode.appendChild(document.createElement('br')); a.parentNode.appendChild(b);
        });
    }
    var o = window.renderProposalsTable;
    if (typeof o === 'function') window.renderProposalsTable = function () { try { apply(); } catch (e) { console.warn('kphst', e); } var r = o.apply(this, arguments); try { badge(); } catch (e) { } return r; };
})();
