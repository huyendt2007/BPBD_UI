/* Chuông thông báo và tên menu của nhóm «Báo cáo công tác BTNN» trên HomePageBTNN.html (04/11/2026, nhanhl2).
 * Tách khỏi HomePageBTNN.html để khi gộp nhánh main không xung đột: trang chủ chỉ cần một dòng <script src="bctt_chuong.js"> đặt cuối trang.
 * Đọc dữ liệu dùng chung của hai trang (localStorage bctt_bao_cao_v1) và vai trò giả lập đang chọn ở từng trang:
 * - Báo cáo công tác BTNN (bctt_role_v1):
 *   + Lãnh đạo UBND tỉnh nhận thông báo báo cáo đã gửi Bộ Tư pháp (06/11/2026: bỏ thông báo báo cáo bị Bộ Tư pháp trả lại vì không còn luồng trả lại).
 *   + Lãnh đạo Phòng, Lãnh đạo Sở: báo cáo đến lượt mình ký duyệt (kể cả khi Lãnh đạo cấp trên trả về).
 * - Tổng hợp báo cáo Công tác BTNN (bctt_role_v1_bo): 06/11/2026 bỏ quy trình rà soát (phân công, rà soát, ký duyệt yêu cầu điều chỉnh) nên không còn thông báo;
 *   báo cáo tổng hợp của Bộ không trình ký nên không có thông báo ký.
 * Bấm thông báo mở thẳng báo cáo (?mo=); tối đa 10 thông báo, mới nhất trước; ba thông báo mẫu có sẵn giữ nguyên. */
(function () {
    'use strict';
    var NOTIF_MAU = 3, NOTIF_TOI_DA = 10;
    var UID_SO = { cb_stp: 'cv_hn1', ld_phong: 'tp_hctp_hn', ld_so: 'gdso_hn' };
    var UID_BO = { ld_cuc: 'cuctruong', ld_phong_btp: 'tpbt', cb_btp: 'canbonv', cb_btp2: 'hatt', ld_bo: 'oanhdh' };
    var TEN_MENU_CU = 'Xử lý báo cáo Công tác BTNN', TEN_MENU = 'Tổng hợp báo cáo Công tác BTNN';
    var KY = { thuc_te: 'Báo cáo năm số liệu thực tế', chinh_thuc: 'Số liệu thống kê năm chính thức' };
    var SO = ['bao_cao_cong_tac_btnn.html', 'Báo cáo công tác BTNN'], BO = ['xu_ly_bao_cao_cong_tac_btnn.html', TEN_MENU];

    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function so(s) { var m = /(\d{2})\/(\d{2})\/(\d{4})(?: (\d{2}):(\d{2}))?/.exec(String(s || '')); return m ? +(m[3] + m[2] + m[1] + (m[4] || '00') + (m[5] || '00')) : 0; }
    function nam(r) { return 'năm <b style="color:var(--primary-color);">' + esc(r.year) + '</b> (' + esc(KY[r.period] || r.period) + ')'; }
    // Thời điểm đến lượt cấp hiện hành: lúc cấp trước duyệt; cấp đầu thì lúc trình
    function denLuot(t) { var i = t.current || 0; return (i > 0 && t.levels[i - 1].at) || t.at || ''; }
    // Đang trong luồng ký: `Chờ duyệt`, hoặc `Bị trả lại` (06/11/2026: trước là `Yêu cầu điều chỉnh`) do Lãnh đạo cấp trên trả về Lãnh đạo cấp dưới (reject.traVe)
    function choKy(r) { return !!r.submit && Array.isArray(r.submit.levels) && (r.status === 'Chờ duyệt' || (r.status === 'Bị trả lại' && !!r.reject && !!r.reject.traVe)); }
    function biTraVe(r) { return r.status === 'Bị trả lại' && !!r.reject && !!r.reject.traVe && r.submit.current + 1 < r.reject.level; }

    // Việc chờ của một vai trò ở hai trang (vt: vai trò trang Báo cáo công tác BTNN, vb: vai trò trang Tổng hợp báo cáo Công tác BTNN).
    // Dùng cho chuông thông báo của trang chủ và khối «Báo cáo công tác BTNN» của trang Bàn làm việc Lãnh đạo (05/11/2026).
    // Mỗi việc: icon, màu, noiDung (HTML của thông báo), ngan (tóm tắt cho thẻ), at, url, tieuDe, r (báo cáo).
    function layViec(vt, vb) {
        var db = null;
        try { db = JSON.parse(localStorage.getItem('bctt_bao_cao_v1') || 'null'); } catch (e) { db = null; }
        var ds = [];
        function them(icon, nen, mau, noiDung, at, trang, ts, nhan) {
            var ngan = String(noiDung).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            ds.push({ icon: icon, nen: nen, mau: mau, noiDung: noiDung, ngan: ngan, at: at, url: trang[0] + '?' + ts, tieuDe: trang[1], nhan: nhan || ngan, r: ds.__r });
        }
        (db && Array.isArray(db.reports) ? db.reports : []).forEach(function (r) {
            if (!r) return;
            ds.__r = r;
            // ---- Báo cáo công tác BTNN (Sở Tư pháp Hà Nội)
            if (r.unitId === 'STP-HN' && vt !== 'ubnd') {
                var mo = 'mo=' + encodeURIComponent(r.id), pc = r.phanCongSo || {};
                var ly = String((r.returned && r.returned.reason) || ''), ngan = ly.length > 90 ? ly.slice(0, 88) + '…' : ly;
                var traBo = !!r.returned && !r.reject && ['Bị trả lại', 'Đang phân công', 'Yêu cầu điều chỉnh'].indexOf(r.status) >= 0;
                // 06/11/2026: bỏ luồng Bộ Tư pháp trả lại báo cáo nên không còn thông báo bị trả lại, phân công xử lý
                if (vt === 'ld_ubnd' && r.status === 'Đã gửi BTP') them('fa-paper-plane', '#ECFDF5', '#047857', 'Báo cáo công tác BTNN ' + nam(r) + ' của ' + esc(r.unitName) + ' <b>đã gửi Bộ Tư pháp</b>.', (r.issued && r.issued.at) || r.sentAt, SO, mo, 'Đã gửi Bộ Tư pháp');
                else if (choKy(r) && UID_SO[vt]) {
                    var l = r.submit.levels[r.submit.current];
                    if (l && l.leaderId === UID_SO[vt]) them('fa-file-signature', '#F5F3FF', '#7C3AED', biTraVe(r)
                        ? 'Báo cáo công tác BTNN ' + nam(r) + ' <b>bị Lãnh đạo cấp trên trả lại</b>, đang chờ bạn ký duyệt lại hoặc từ chối (Cấp ' + l.level + ').'
                        : 'Báo cáo công tác BTNN ' + nam(r) + ' <b>đang chờ bạn ký duyệt</b> (Cấp ' + l.level + ').', biTraVe(r) ? r.reject.at : denLuot(r.submit), SO, mo, (biTraVe(r) ? 'Chờ ký duyệt lại' : 'Chờ ký duyệt') + ' (Cấp ' + l.level + ')');
                }
            }
            // 06/11/2026 (yêu cầu khách hàng): bỏ quy trình rà soát báo cáo các Sở của Bộ Tư pháp nên không còn thông báo phân công, rà soát, ký duyệt yêu cầu điều chỉnh
        });
        delete ds.__r;
        return ds.sort(function (x, y) { return so(y.at) - so(x.at); });
    }

    function thongBaoBctt() {
        var vt = 'cb_stp', vb = 'ld_cuc';
        try { vt = localStorage.getItem('bctt_role_v1') || vt; vb = localStorage.getItem('bctt_role_v1_bo') || vb; } catch (e) { /* bỏ qua */ }
        var xem = layViec(vt, vb).slice(0, NOTIF_TOI_DA);
        var wrap = document.getElementById('notifItemsWrapper');
        if (wrap) {
            wrap.querySelectorAll('.notif-bctt').forEach(function (x) { x.remove(); });
            wrap.insertAdjacentHTML('afterbegin', xem.map(function (x) {
                return '<div class="notif-item notif-bctt" style="display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid #f1f5f9;cursor:pointer;transition:background 0.2s;" onclick="clickNotifItem(\'' + x.url + '\', \'' + x.tieuDe + '\', \'Báo cáo công tác BTNN\')">'
                    + '<div style="width:32px;height:32px;border-radius:50%;background-color:' + x.nen + ';display:flex;align-items:center;justify-content:center;color:' + x.mau + ';flex-shrink:0;"><i class="fa-solid ' + x.icon + '" style="font-size:14px;"></i></div>'
                    + '<div style="flex-grow:1;"><p style="font-size:12.5px;color:#1E293B;margin:0 0 4px;line-height:1.4;font-weight:normal;">' + x.noiDung + '</p>'
                    + '<span style="font-size:11px;color:var(--text-muted);"><i class="fa-regular fa-clock"></i> ' + esc(x.at) + '</span></div></div>';
            }).join(''));
        }
        var badge = document.getElementById('notifBadge');
        if (badge && badge.style.display !== 'none') badge.textContent = NOTIF_MAU + xem.length;
    }

    // Tên menu trang của Bộ Tư pháp: «Tổng hợp báo cáo Công tác BTNN» (đổi lúc chạy để không sửa dòng menu của nhánh main)
    function doiTenMenu() {
        try {
            /* global menuData */
            if (typeof menuData !== 'undefined') (function duyet(ds) { (ds || []).forEach(function (m) { if (m.title === TEN_MENU_CU) m.title = TEN_MENU; duyet(m.children); }); })(menuData);
        } catch (e) { /* bỏ qua */ }
        var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (x) { return /^(SCRIPT|STYLE|TEXTAREA)$/.test(x.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } }), n, sua = [];
        while ((n = w.nextNode())) if (n.nodeValue.indexOf(TEN_MENU_CU) >= 0) sua.push(n);
        sua.forEach(function (x) { x.nodeValue = x.nodeValue.split(TEN_MENU_CU).join(TEN_MENU); });
        document.querySelectorAll('[title="' + TEN_MENU_CU + '"]').forEach(function (x) { x.title = TEN_MENU; });
    }

    // Mở chuông thì tính lại thông báo (bọc hàm sẵn có của trang chủ)
    function bocChuong() {
        var goc = window.toggleNotifDropdown;
        if (typeof goc !== 'function' || goc.__bctt) return;
        var moi = function () { thongBaoBctt(); return goc.apply(this, arguments); };
        moi.__bctt = true; window.toggleNotifDropdown = moi;
    }

    // Vị trí menu (05/11/2026, nhanhl2): nhóm «Báo cáo công tác BTNN» chuyển ra ngay dưới mục «Hỏi đáp», cùng cấp với «Hỏi đáp».
    // Đổi trong menuData lúc tệp này nạp (trước DOMContentLoaded, lúc trang chủ vẽ menu) để không sửa khối menu của nhánh main.
    function doiViTriMenu() {
        try {
            if (typeof menuData === 'undefined') return;
            var nhom = null, noiHoiDap = null;
            (function duyet(ds) {
                (ds || []).forEach(function (m, i) {
                    if (!nhom && m.title === 'Báo cáo công tác BTNN' && m.children) nhom = { ds: ds, i: i };
                    if (!noiHoiDap && m.title === 'Hỏi đáp' && m.children) noiHoiDap = ds;
                    duyet(m.children);
                });
            })(menuData);
            if (!nhom || !noiHoiDap) return;
            var muc = nhom.ds.splice(nhom.i, 1)[0];
            var j = noiHoiDap.findIndex(function (m) { return m.title === 'Hỏi đáp'; });
            noiHoiDap.splice(j + 1, 0, muc);
        } catch (e) { /* bỏ qua: menu giữ nguyên vị trí cũ */ }
    }
    // 05/11/2026 (nhanhl2, yêu cầu sau): nhóm «Báo cáo công tác BTNN» trở lại nhóm «Nghiệp vụ quản lý nhà nước về công tác BTNN»,
    // ngay trên «Thông tin đầu mối thực hiện công tác BTNN» — đúng vị trí trong menuData gốc, nên không gọi doiViTriMenu() nữa.
    // doiViTriMenu();

    function chay() { doiTenMenu(); bocChuong(); thongBaoBctt(); setTimeout(doiTenMenu, 800); }
    window.thongBaoBctt = thongBaoBctt;
    // Cho trang Bàn làm việc Lãnh đạo: vai trò ứng với người dùng giả lập của luồng BTNN (cùng mã người dùng) và việc chờ của người đó
    window.BCTT_VIEC = {
        UID_SO: UID_SO, UID_BO: UID_BO, SO: SO, BO: BO,
        vaiTro: function (uid) {
            var vt = '', vb = '', k;
            for (k in UID_SO) if (UID_SO[k] === uid) vt = k;
            for (k in UID_BO) if (UID_BO[k] === uid) vb = k;
            return { vt: vt, vb: vb };
        },
        cua: function (uid) { var v = this.vaiTro(uid); return v.vt || v.vb ? layViec(v.vt || '-', v.vb || '-') : []; }
    };
    window.addEventListener('storage', function (e) { if (!e.key || e.key === 'bctt_bao_cao_v1' || e.key === 'bctt_role_v1' || e.key === 'bctt_role_v1_bo') thongBaoBctt(); });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', chay); else chay();
})();
