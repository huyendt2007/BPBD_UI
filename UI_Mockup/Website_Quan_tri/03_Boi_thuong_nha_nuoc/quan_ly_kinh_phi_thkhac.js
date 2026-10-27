/*
 * [th7] Add-on Quản lý kinh phí bồi thường: khoản thiệt hại của bản ghi tạo từ Theo dõi vụ việc tại Tòa án (thiệt hại 02 cấp DM_27).
 * - Vụ việc Tòa án lưu thiệt hại theo mục chi tiết (TH_xx_nn) hoặc dòng VII. Các thiệt hại khác (TH_KHAC_xx); dữ liệu cũ theo 06 loại (taiSan...).
 * - courtCaseDamageMap: cộng số tiền theo nhóm vào 06 khoản cũ; nhóm VII cộng vào khoản "Các thiệt hại khác" (thietHaiKhac).
 * - renderKinhPhiDamageGrids: thêm dòng "Các thiệt hại khác" khi khoản thietHaiKhac có số tiền; tổng duyệt vẫn cộng các dòng như cũ.
 * Nạp sau quan_ly_kinh_phi_boi_thuong.js và quan_ly_kinh_phi_kptb.js.
 */
(function () {
    'use strict';
    if (typeof COURT_DAMAGE_KEYS === 'undefined' || typeof DAMAGE_LABELS === 'undefined') return;
    var KHAC = 'thietHaiKhac';
    if (COURT_DAMAGE_KEYS.indexOf(KHAC) < 0) COURT_DAMAGE_KEYS.push(KHAC);
    DAMAGE_LABELS[KHAC] = 'Các thiệt hại khác';
    var GROUP_KEY = { TS: 'taiSan', TN: 'thuNhap', CHET: 'tuVong', SK: 'sucKhoe', TT: 'tinhThan', CPK: 'chiPhiKhac', KHAC: KHAC };

    function keyOf(d) {
        if (!d) return '';
        if (COURT_DAMAGE_KEYS.indexOf(d.key) >= 0) return d.key;
        var m = String(d.code || d.key || d.group || '').match(/^TH_(TS|TN|CHET|SK|TT|CPK|KHAC)(_|$)/);
        return m ? GROUP_KEY[m[1]] : '';
    }
    window.courtCaseDamageMap = function (c) {
        var out = {};
        COURT_DAMAGE_KEYS.forEach(function (k) { out[k] = 0; });
        ((c && c.damages) || []).forEach(function (d) { var k = keyOf(d); if (k) out[k] += Number(d.amount) || 0; });
        return out;
    };

    var orig = window.renderKinhPhiDamageGrids;
    if (typeof orig !== 'function') return;
    window.renderKinhPhiDamageGrids = function (claim) {
        orig.apply(this, arguments);
        var amount = Number(claim && claim.selectedDamages && claim.selectedDamages[KHAC]) || 0;
        var tbody = document.getElementById('kpDamageUnifiedBody');
        if (!(amount > 0) || !tbody) return;
        var label = DAMAGE_LABELS[KHAC];
        var tr = document.createElement('tr');
        tr.innerHTML = '<td style="text-align:center; vertical-align:middle;">' + (tbody.querySelectorAll('tr').length + 1) + '</td>'
            + '<td style="font-weight:600; vertical-align:middle;">' + label + '</td>'
            + '<td style="text-align:right; font-weight:700; background-color:#F8FAFC; vertical-align:middle; padding-right:15px;">' + amount.toLocaleString('vi-VN') + ' VNĐ</td>'
            + '<td style="vertical-align:middle; text-align:right;"><input type="text" class="form-control kp-approve-input" data-key="' + KHAC + '" data-max="' + amount + '" data-label="' + label + '" value="' + amount.toLocaleString('vi-VN') + '" readonly style="font-weight:700; text-align:right; background-color:#F1F5F9; max-width:180px; display:block; margin-left:auto; height:26px; padding:2px 6px; font-size:12.5px;"></td>';
        tbody.appendChild(tr);
        if (typeof calculateKinhPhiApproveTotal === 'function') calculateKinhPhiApproveTotal();
    };
})();
