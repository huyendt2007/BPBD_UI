/**
 * Phục hồi danh dự - Khối 3 (Tổ chức thực hiện), hình thức Đăng báo xin lỗi, cải chính công khai:
 * khối "Gửi cho UBND cấp xã nơi người bị thiệt hại cư trú" gồm Đơn vị nhận *, Ngày nhận * (inline trong trang)
 * và Tài liệu đính kèm (file này): nhập khi khối 3 đang mở, chỉ xem khi khối 3 đã khóa.
 * Dữ liệu: claim.phddStep3CommuneUnit, claim.editPhddStep3CommunePostingSendDate (Ngày nhận), claim.phddStep3CommuneFiles.
 */
(function () {
    var KEY = 'phddXa', HOST = 'phddStep3CommuneTlkt';
    function $(id) { return document.getElementById(id); }
    function curClaim() {
        try { return (typeof claimsList !== 'undefined' && typeof selectedClaimId !== 'undefined') ? claimsList.find(function (c) { return c && c.id === selectedClaimId; }) : null; } catch (e) { return null; }
    }
    var editing = false;
    // Lấy tài liệu khi lưu khối 3 (gọi từ completePhddStep3 / updatePhddStep3NoLock)
    window.phddxaGetFiles = function (claim) {
        if (editing && typeof tlktGet === 'function') return tlktGet(KEY);
        return (claim && claim.phddStep3CommuneFiles) || [];
    };
    function render() {
        var host = $(HOST), unit = $('editPhddStep3CommuneUnit');
        if (!host || !unit) return;
        var claim = curClaim();
        var rows = (claim && claim.phddStep3CommuneFiles) || [];
        // Khối 3 chế độ xem: setSection3InputsDisabled(true) ẩn ô nhập, hiển thị dạng chữ
        editing = !unit.disabled && unit.style.display !== 'none';
        if (editing && typeof tlktMount === 'function') {
            tlktMount(KEY, HOST, { required: false, rows: rows, noLeader: true, secClass: '', titleClass: 'form-label' });
        } else {
            host.innerHTML = rows.length && typeof tlktViewHtml === 'function'
                ? tlktViewHtml(rows, { split: false, title: 'Tài liệu đính kèm' })
                : '<div class="form-label" style="margin-bottom:4px;">Tài liệu đính kèm</div><div style="font-size:13px; color:#64748b;">Không có tài liệu</div>';
        }
    }
    function wrap(name) {
        var orig = window[name];
        if (typeof orig !== 'function' || orig.__phddxa) return;
        var fn = function () { var r = orig.apply(this, arguments); try { render(); } catch (e) { /* mockup */ } return r; };
        fn.__phddxa = true;
        window[name] = fn;
    }
    function init() { wrap('setSection3InputsDisabled'); wrap('renderHonorRestorationTab'); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
