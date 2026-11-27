/*
 * Thanh trên cùng Website Quản trị (SRS: Tài liệu tổng hợp/04_Danh_muc_va_Phu_luc.md#quy-tac-tai-hdsd)
 * 27/11/2026 (BA chọn): lối vào tải tài liệu Hướng dẫn sử dụng (HDSD).
 *  - Icon «Trợ giúp» (dấu ?) đặt ngay trước chuông thông báo; bấm mở danh sách HDSD theo phân hệ.
 *  - Không đặt mục «Hướng dẫn sử dụng» trong menu ảnh đại diện (BA bỏ ngày 27/11/2026).
 * 27/11/2026 (BA chọn): giữ chuông thông báo; thêm biểu tượng Đổi ngôn ngữ (quả địa cầu, cờ ngôn ngữ đang dùng) ngay sau chuông.
 *   Thứ tự: Tìm nhanh | Trợ giúp | Chuông thông báo | Ngôn ngữ | Ảnh đại diện.
 * Trang khai báo trước khi nạp tệp này:
 *   <div class="lang-container" id="langContainer"></div> trong .header-controls, ngay sau .notification-container
 *   window.HDSD_DS = [{ ten: 'Bồi thường nhà nước', tep: '<đường dẫn .docx>', tai: 'HDSD_BTNN.docx' }, { ten: 'Biện pháp bảo đảm' }];
 *   Dòng không có `tep` hiển thị mờ, nhãn «Đang cập nhật», không tải được.
 */
(function () {
    var DS = window.HDSD_DS || [];
    var CO_VN = '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#DA251D"/><polygon fill="#FFFF00" points="15,4.2 16.47,8.68 21.18,8.68 17.36,11.45 18.82,15.93 15,13.16 11.18,15.93 12.64,11.45 8.82,8.68 13.53,8.68"/></svg>';
    var CO_EN = '<svg viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="3"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>';
    var NGON_NGU = [{ ma: 'vi', ten: 'Tiếng Việt', co: CO_VN }, { ma: 'en', ten: 'English', co: CO_EN }];

    function el(id) { return document.getElementById(id); }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function doc(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function ghi(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }

    function themCss() {
        if (el('hdsdCss')) return;
        var st = document.createElement('style');
        st.id = 'hdsdCss';
        st.textContent = [
            '.hdsd-container,.lang-container{position:relative;display:flex;align-items:center;justify-content:center}',
            '.hdr-icon-btn{position:relative;cursor:pointer;color:#595959;font-size:18px;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;transition:color .15s,background-color .15s}',
            '.hdr-icon-btn:hover,.hdr-icon-btn.dang-mo{color:var(--primary-color,#1d4ed8);background-color:rgba(0,0,0,.04)}',
            '.hdr-icon-btn:focus-visible{outline:2px solid var(--primary-color,#1d4ed8);outline-offset:2px}',
            '.hdr-icon-btn .lang-co{position:absolute;top:-3px;right:-5px;width:16px;height:11px;border-radius:2px;overflow:hidden;box-shadow:0 0 0 1px #fff,0 1px 2px rgba(0,0,0,.25);display:flex}',
            '.hdr-icon-btn .lang-co svg,.lang-item .lang-co svg{width:100%;height:100%;display:block}',
            '.hdr-dropdown{display:none;position:absolute;top:45px;right:0;background:#fff;border:1px solid var(--border-color,#e2e8f0);border-radius:6px;box-shadow:var(--box-shadow,0 6px 16px rgba(0,0,0,.08));z-index:1000;text-align:left;animation:fadeIn .15s ease-out}',
            '.hdr-dropdown .hdr-dd-head{padding:12px 16px;border-bottom:1px solid var(--border-color,#e2e8f0);background:#FAFBFD;border-radius:6px 6px 0 0;font-weight:600;font-size:13px;color:#1E293B}',
            '#hdsdDropdown{width:340px}',
            '#hdsdDropdown .hdsd-item{display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid #f1f5f9;font-size:12.5px;color:#1E293B;text-decoration:none}',
            '#hdsdDropdown .hdsd-item:last-child{border-bottom:none;border-radius:0 0 6px 6px}',
            '#hdsdDropdown a.hdsd-item:hover{background:#F5F8FF;color:var(--primary-color,#1d4ed8)}',
            '#hdsdDropdown .hdsd-ic{width:28px;height:28px;border-radius:50%;background:#EFF6FF;color:#2563EB;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px}',
            '#hdsdDropdown .hdsd-ten{flex:1;line-height:1.4}',
            '#hdsdDropdown .hdsd-dl{color:var(--primary-color,#1d4ed8);font-size:13px}',
            '#hdsdDropdown .hdsd-tat{color:#94a3b8;cursor:default}',
            '#hdsdDropdown .hdsd-tat .hdsd-ic{background:#f1f5f9;color:#94a3b8}',
            '#hdsdDropdown .hdsd-nhan{font-size:11px;color:#94a3b8;font-style:italic;white-space:nowrap}',
            '#langDropdown{width:200px}',
            '#langDropdown .lang-item{display:flex;align-items:center;gap:10px;padding:10px 16px;font-size:13px;color:#1E293B;cursor:pointer;border-bottom:1px solid #f1f5f9}',
            '#langDropdown .lang-item:last-child{border-bottom:none;border-radius:0 0 6px 6px}',
            '#langDropdown .lang-item:hover{background:#F5F8FF}',
            '#langDropdown .lang-item .lang-co{width:22px;height:15px;border-radius:2px;overflow:hidden;box-shadow:0 0 0 1px #e2e8f0;display:flex;flex-shrink:0}',
            '#langDropdown .lang-item .lang-ten{flex:1}',
            '#langDropdown .lang-item .fa-check{color:var(--primary-color,#1d4ed8);visibility:hidden}',
            '#langDropdown .lang-item.dang-chon{font-weight:600;color:var(--primary-color,#1d4ed8)}',
            '#langDropdown .lang-item.dang-chon .fa-check{visibility:visible}'
        ].join('\n');
        document.head.appendChild(st);
    }

    var DD = ['hdsdDropdown', 'langDropdown'];
    function dongKhac() { ['userDropdown', 'notifDropdown'].forEach(function (id) { var d = el(id); if (d) d.style.display = 'none'; }); }
    function dong(tru) {
        DD.forEach(function (id) {
            if (id === tru) return;
            var d = el(id); if (d) d.style.display = 'none';
            var nut = el(id === 'hdsdDropdown' ? 'hdsdIcon' : 'langIcon'); if (nut) nut.classList.remove('dang-mo');
        });
    }
    function mo(id) {
        dongKhac(); dong(id);
        var d = el(id); if (d) d.style.display = 'block';
        var nut = el(id === 'hdsdDropdown' ? 'hdsdIcon' : 'langIcon'); if (nut) nut.classList.add('dang-mo');
    }
    function bat(id, ev) {
        if (ev) ev.stopPropagation();
        var d = el(id); if (!d) return;
        if (d.style.display === 'block') dong(); else mo(id);
    }
    window.toggleHdsdDropdown = function (ev) { bat('hdsdDropdown', ev); };
    window.toggleLangDropdown = function (ev) { bat('langDropdown', ev); };

    function nutPhim(fn) { return ' role="button" tabindex="0" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();' + fn + '(event);}"'; }

    function ngonNguHienTai() { var m = doc('btpNgonNgu') || 'vi'; return NGON_NGU.filter(function (x) { return x.ma === m; })[0] || NGON_NGU[0]; }
    function veNgonNgu() {
        var nn = ngonNguHienTai();
        var co = el('langCoHienTai'); if (co) co.innerHTML = nn.co;
        var nut = el('langIcon'); if (nut) { nut.title = 'Ngôn ngữ: ' + nn.ten; nut.setAttribute('aria-label', 'Đổi ngôn ngữ (đang dùng ' + nn.ten + ')'); }
        document.querySelectorAll('#langDropdown .lang-item').forEach(function (x) { x.classList.toggle('dang-chon', x.getAttribute('data-ma') === nn.ma); });
    }
    window.chonNgonNgu = function (ma, ev) {
        if (ev) ev.stopPropagation();
        var nn = NGON_NGU.filter(function (x) { return x.ma === ma; })[0]; if (!nn) return;
        ghi('btpNgonNgu', ma); veNgonNgu(); dong();
        if (typeof window.showToast === 'function') window.showToast('Đã chuyển ngôn ngữ hiển thị sang ' + nn.ten + ' (giả lập trên mockup).', 'success');
    };

    function dungMenu() {
        var hc = document.querySelector('.header-controls');
        if (!hc || el('hdsdIcon')) return;
        themCss();

        // Biểu tượng Đổi ngôn ngữ (chỗ chuông thông báo cũ)
        var lang = el('langContainer');
        if (!lang) { lang = document.createElement('div'); lang.className = 'lang-container'; lang.id = 'langContainer'; var up = hc.querySelector('.user-profile'); hc.insertBefore(lang, up || null); }
        lang.innerHTML = '<div class="hdr-icon-btn" id="langIcon" onclick="toggleLangDropdown(event)"' + nutPhim('toggleLangDropdown') + '>'
            + '<i class="fa-solid fa-globe"></i><span class="lang-co" id="langCoHienTai"></span></div>'
            + '<div class="hdr-dropdown" id="langDropdown" onclick="event.stopPropagation()"><div class="hdr-dd-head">Ngôn ngữ</div>'
            + NGON_NGU.map(function (x) { return '<div class="lang-item" data-ma="' + x.ma + '" role="menuitemradio" tabindex="0" onclick="chonNgonNgu(\'' + x.ma + '\', event)" onkeydown="if(event.key===\'Enter\'){chonNgonNgu(\'' + x.ma + '\', event);}"><span class="lang-co">' + x.co + '</span><span class="lang-ten">' + esc(x.ten) + '</span><i class="fa-solid fa-check"></i></div>'; }).join('')
            + '</div>';
        veNgonNgu();

        // Icon Trợ giúp, ngay trước biểu tượng Đổi ngôn ngữ
        var rows = DS.map(function (x) {
            if (x.tep) {
                return '<a class="hdsd-item" href="' + esc(x.tep) + '" download="' + esc(x.tai || '') + '" onclick="event.stopPropagation()" title="Tải tài liệu Hướng dẫn sử dụng ' + esc(x.ten) + '">'
                    + '<span class="hdsd-ic"><i class="fa-solid fa-file-word"></i></span><span class="hdsd-ten">Hướng dẫn sử dụng ' + esc(x.ten) + '</span><i class="fa-solid fa-download hdsd-dl"></i></a>';
            }
            return '<div class="hdsd-item hdsd-tat" onclick="event.stopPropagation()"><span class="hdsd-ic"><i class="fa-solid fa-file-word"></i></span><span class="hdsd-ten">Hướng dẫn sử dụng ' + esc(x.ten) + '</span><span class="hdsd-nhan">Đang cập nhật</span></div>';
        }).join('');
        var wrap = document.createElement('div');
        wrap.className = 'hdsd-container';
        wrap.innerHTML = '<div class="hdr-icon-btn" id="hdsdIcon" title="Trợ giúp" aria-label="Trợ giúp" onclick="toggleHdsdDropdown(event)"' + nutPhim('toggleHdsdDropdown') + '>'
            + '<i class="fa-regular fa-circle-question"></i></div>'
            + '<div class="hdr-dropdown" id="hdsdDropdown" onclick="event.stopPropagation()"><div class="hdr-dd-head">Tài liệu hướng dẫn sử dụng</div>' + rows + '</div>';
        hc.insertBefore(wrap, hc.querySelector('.notification-container') || lang);
        // 27/11 (BA yêu cầu): không đặt mục «Hướng dẫn sử dụng» trong menu ảnh đại diện; chỉ dùng icon «Trợ giúp» trước chuông
    }

    // Mở menu ảnh đại diện thì đóng các danh sách của thanh trên cùng; bấm ra ngoài hoặc Esc thì đóng
    ['toggleDropdown', 'toggleNotifDropdown'].forEach(function (ten) {
        var cu = window[ten];
        if (typeof cu === 'function') window[ten] = function () { dong(); return cu.apply(this, arguments); };
    });
    window.addEventListener('click', function () { dong(); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') dong(); });

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', dungMenu); else dungMenu();
})();
