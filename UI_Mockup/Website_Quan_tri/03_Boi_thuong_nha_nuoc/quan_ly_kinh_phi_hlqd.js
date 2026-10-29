/* [hlqd] Chặn chi trả khi Quyết định giải quyết bồi thường "Không có hiệu lực" (quan_ly_kinh_phi_boi_thuong.html)
 * - Hiệu lực của Quyết định lấy từ kho Quyết định GQBT ('btnn_qd_gqbt_v2', trường hieuLuc) hoặc kho dùng chung 'btnn_qd_hieu_luc_v1'
 *   (do quyet_dinh_gqbt_hlqd.js ghi). Bản ghi Chi trả tiền bồi thường khớp Quyết định theo decId, không có thì theo Mã hồ sơ GQBT.
 * - Quyết định Không có hiệu lực: Trình thông báo chi trả / Cập nhật chi trả bị chặn
 *   + Lưới: khóa mờ + tooltip; Footer chi tiết: ẩn; gọi trực tiếp hàm: thông báo, không mở.
 *   + Nhãn "QĐ không có hiệu lực" dưới trạng thái ở lưới, cạnh trạng thái + khối cảnh báo ở màn chi tiết.
 *   + Không có hiệu lực là trạng thái cuối của Quyết định (không cập nhật lại), bản ghi giữ nguyên trạng thái và bị chặn chi trả.
 * - Thông báo chi trả Chờ duyệt: chặn Ký duyệt (lưới, Footer, kptbLdOpen 'approve', openApproveModal, kptbLdSubmit); Từ chối vẫn cho phép.
 * - Bản ghi Chi trả tiền bồi thường chỉ được tạo khi Quyết định chuyển Có hiệu lực (quyet_dinh_gqbt_hlqd.js); Quyết định Đã ban hành chưa cập nhật (qdhlPending) chưa chi trả.
 * - Màn Tạo thông báo chi trả (MH24): loại Quyết định Không có hiệu lực / Đã ban hành chưa cập nhật hiệu lực khỏi gợi ý / Tìm kiếm nâng cao (kpcdEligibleDecs);
 *   nhập mã trực tiếp: báo lỗi dưới ô (kpcdTbSearch); Tiếp tục / Trình ký bản nháp: chặn (kpcdTbContinue, kptbOpenSign(null, draft)).
 * - Add-on độc lập: chỉ bọc hàm sẵn có (kptbOpenSign, kptbOpenPay, kpuxOpenPay, payProposalDirect, renderProposalsTable, kpdtRender, kptbImportAndSeed).
 * - Dữ liệu mẫu (bổ sung nếu thiếu, theo Mã bản ghi): Chi trả tiền bồi thường của QD-HL1 (Chờ thông báo chi trả - bị chặn),
 *   QD-HL2 (Chờ thông báo chi trả - Có hiệu lực), QD-HL3 (Hoàn thành).
 */
(function () {
    'use strict';
    var QD_KEY = 'btnn_qd_gqbt_v2';
    var MAP_KEY = 'btnn_qd_hieu_luc_v1';
    var OFF = 'Không có hiệu lực';
    var PAY_TYPE = 'Chi trả tiền bồi thường';
    var MSG = 'Quyết định giải quyết bồi thường không có hiệu lực, không thực hiện chi trả.';
    var LABEL = 'QĐ không có hiệu lực';
    var MSG_PENDING = 'Quyết định giải quyết bồi thường chưa được cập nhật trạng thái Có hiệu lực, không thực hiện chi trả.';
    // Ký duyệt: Thông báo chi trả đang Chờ duyệt mà Quyết định chuyển Không có hiệu lực (Từ chối vẫn cho phép)
    var BLOCK_ACTS = ['Trình thông báo chi trả', 'Cập nhật chi trả', 'Ký duyệt'];

    function rj(k, fb) { try { var raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fb; } catch (e) { return fb; } }
    function wj(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
    function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function list() { return typeof proposalsList !== 'undefined' && Array.isArray(proposalsList) ? proposalsList : []; }
    function find(id) { return list().find(function (p) { return p && (p.id === id || p.code === id); }) || null; }

    // Thông tin hiệu lực Quyết định của bản ghi Chi trả tiền bồi thường: { decNo, hieuLuc, reason, at } | null
    function decInfo(item) {
        if (!item || item.type !== PAY_TYPE) return null;
        var decs = rj(QD_KEY, []);
        decs = Array.isArray(decs) ? decs : [];
        var d = (item.decId && decs.find(function (x) { return x && x.id === item.decId; }))
            || (!item.decId && item.ycbtCode && decs.find(function (x) { return x && x.claimCode === item.ycbtCode && x.status === 'Đã ban hành'; })) || null;
        if (d) {
            var h = (d.hieuLucHistory || [])[(d.hieuLucHistory || []).length - 1] || {};
            return { decNo: d.decNo || '', status: d.status, hieuLuc: d.hieuLuc === OFF ? OFF : 'Có hiệu lực', reason: h.reason || '', at: h.at || '' };
        }
        var map = rj(MAP_KEY, {}) || {};
        if (item.decId && map[item.decId]) return map[item.decId];
        var k = Object.keys(map).find(function (id) { return map[id] && map[id].claimCode === item.ycbtCode && map[id].status === 'Đã ban hành'; });
        return k ? map[k] : null;
    }
    function blocked(item) { var i = decInfo(item); return !!i && ['Đã hủy', 'Hủy quyết định'].indexOf(i.status) < 0 && i.hieuLuc === OFF; }
    window.kphlBlocked = blocked;

    function css() {
        if (document.getElementById('kphlCss')) return;
        var st = document.createElement('style');
        st.id = 'kphlCss';
        st.textContent = [
            '.kphl-sub { margin-top: 4px; } .kphl-sub .badge { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; font-size: 11px; white-space: nowrap; }',
            '.kphl-alert { background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #dc2626; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; color: #7f1d1d; font-size: 13px; line-height: 1.7; }',
            '.kphl-alert b { color: #b91c1c; }',
            '.kphl-off { opacity: 0.35 !important; cursor: not-allowed !important; }'
        ].join('\n');
        document.head.appendChild(st);
    }
    function guard(id) {
        var it = find(id);
        if (it && blocked(it)) { if (typeof showToast === 'function') showToast(MSG, 'warning'); return true; }
        return false;
    }
    // Bọc hàm mở Trình thông báo chi trả / Cập nhật chi trả (đánh dấu để không bọc lặp)
    function wrapGlobal(name) {
        var f = window[name];
        if (typeof f !== 'function' || f.__kphl) return;
        var w = function (id, x) {
            // kptbOpenSign(null, draft): bản nháp từ màn Tạo thông báo chi trả; kptbLdOpen(id, 'reject'): Từ chối vẫn cho phép
            if (name === 'kptbLdOpen') { if (x !== 'reject' && guard(id)) return; return f.apply(this, arguments); }
            if (name === 'openApproveModal') { if (guard(id)) return; return f.apply(this, arguments); }
            if (guard(id)) return;
            if (x && typeof x === 'object' && blocked(x)) { if (typeof showToast === 'function') showToast(MSG, 'warning'); return; }
            return f.apply(this, arguments);
        };
        w.__kphl = true;
        try { window[name] = w; } catch (e) { /* bỏ qua */ }
    }
    function install() {
        ['kptbOpenSign', 'kptbOpenPay', 'kpuxOpenPay', 'payProposalDirect', 'kptbLdOpen', 'openApproveModal'].forEach(wrapGlobal);
        // Ký duyệt tại màn Ký duyệt / Từ chối đang mở (Quyết định chuyển Không có hiệu lực sau khi mở màn)
        var sub = window.kptbLdSubmit;
        if (typeof sub === 'function' && !sub.__kphl) {
            var ws = function () {
                var c = null; try { c = kptbLd; } catch (e) { /* bỏ qua */ }
                if (c && c.approve && guard(c.id)) return;
                return sub.apply(this, arguments);
            };
            ws.__kphl = true;
            window.kptbLdSubmit = ws;
        }
        installKpcd();
    }
    // ---------------- Màn Tạo thông báo chi trả (MH24) + popup Tìm kiếm nâng cao Quyết định ----------------
    // Quyết định chưa được chi trả theo hiệu lực: Không có hiệu lực -> MSG; Đã ban hành chưa cập nhật hiệu lực -> MSG_PENDING; còn lại ""
    function decMsg(d) {
        if (!d) return "";
        var m = (rj(MAP_KEY, {}) || {})[d.id];
        var hl = d.hieuLuc || (m && m.hieuLuc) || "";
        if (hl === OFF) return MSG;
        if (hl !== "Có hiệu lực" && d.status === "Đã ban hành" && (d.qdhlPending || (m && m.pending))) return MSG_PENDING;
        return "";
    }
    // [p8] Bản sao tối thiểu hồ sơ GQ YCBT mẫu (dùng khi claimsList trống / chưa có hồ sơ, tức chưa mở trang Giải quyết YCBT).
    // PHẢI ĐỒNG BỘ với seed GQ YCBT: quan_ly_boi_thuong_hlqd.js (hlqdClaims) và Quyết định mẫu: quyet_dinh_gqbt_hlqd.js (qdhlSeedDefs).
    // claimsList có hồ sơ thì luôn ưu tiên dữ liệu đó; không ghi bản sao vào claimsList.
    var CLAIM_COPY = {
        'BT-2026-191': { status: 'Chờ chi trả', vv: 'VVBT-2026-191', nyc: 'Trần Thị Thu Hương', decNo: '41/QĐ-STP', decDate: '05/10/2026', amount: 180000000, unitId: 'STP-HN' },
        'BT-2026-192': { status: 'Chờ chi trả', vv: 'VVBT-2026-192', nyc: 'Nguyễn Văn Phúc', decNo: '33/QĐ-BTP', decDate: '01/10/2026', amount: 300000000, unitId: 'BTP-01' },
        'BT-2026-193': { status: 'Hoàn thành', vv: 'VVBT-2026-193', nyc: 'Lê Minh Đức', decNo: '38/QĐ-STP', decDate: '15/09/2026', amount: 120000000, unitId: 'STP-HN' },
        'BT-2026-194': { status: 'Chờ chi trả', vv: 'VVBT-2026-194', nyc: 'Phạm Thị Ngọc Ánh', decNo: '40/QĐ-STP', decDate: '02/10/2026', amount: 95000000, unitId: 'STP-HN' }
    };
    function claimStored(code) {
        var l = rj('claimsList', []);
        return Array.isArray(l) && l.some(function (c) { return c && c.code === code; });
    }
    // Quyết định mẫu (định dạng kho 'btnn_qd_gqbt_v2') khi kho Quyết định chưa có (chưa mở màn Quyết định GQBT)
    function decCopy(s) {
        var c = CLAIM_COPY[s.claimCode] || {};
        return {
            id: s.decId, claimCode: s.claimCode, nycName: s.nycName, nycAddress: s.nycAddress, unitId: s.unitId, unitName: s.unitName,
            status: 'Đã ban hành', decNo: s.decNo, issueDate: s.issueDate, total: s.total, advance: s.advance, net: s.net,
            recipient: JSON.parse(JSON.stringify(s.recipient || {})), payout: JSON.parse(JSON.stringify(s.payout || {})),
            hieuLuc: s.hieuLuc, kpcdClaimStatus: c.status || '', hlqdCopy: true
        };
    }
    function installKpcd() {
        var ad = window.kpcdAllDecs;
        if (typeof ad === 'function' && !ad.__kphl) {
            var wa = function () {
                var list = ad.apply(this, arguments) || [];
                SEED_DECS.forEach(function (s) { if (!list.some(function (d) { return d && (d.id === s.decId || (d.claimCode === s.claimCode && d.status === 'Đã ban hành')); })) list.push(decCopy(s)); });
                return list;
            };
            wa.__kphl = true;
            window.kpcdAllDecs = wa;
        }
        var cs = window.kpcdClaimStatus;
        if (typeof cs === 'function' && !cs.__kphl) {
            var wcs = function (d) {
                var r = cs.apply(this, arguments);
                if (!r && d && CLAIM_COPY[d.claimCode] && !claimStored(d.claimCode)) r = CLAIM_COPY[d.claimCode].status;
                return r;
            };
            wcs.__kphl = true;
            window.kpcdClaimStatus = wcs;
        }
        var vv = window.kpcdTbVv;
        if (typeof vv === 'function' && !vv.__kphl) {
            var wv = function (code) { return vv.apply(this, arguments) || (CLAIM_COPY[code] && !claimStored(code) ? CLAIM_COPY[code].vv : ''); };
            wv.__kphl = true;
            window.kpcdTbVv = wv;
        }
        // Loại Quyết định Không có hiệu lực khỏi danh sách gợi ý và Tìm kiếm nâng cao
        var el = window.kpcdEligibleDecs;
        if (typeof el === 'function' && !el.__kphl) {
            var we = function () { return (el.apply(this, arguments) || []).filter(function (d) { return !decMsg(d); }); };
            we.__kphl = true;
            window.kpcdEligibleDecs = we;
        }
        // Nhập mã trực tiếp Quyết định Không có hiệu lực: báo lỗi dưới ô tìm kiếm
        var se = window.kpcdTbSearch;
        if (typeof se === 'function' && !se.__kphl) {
            var ws2 = function () {
                var inp = document.getElementById('kpcdTbDecInput');
                var v = inp ? String(inp.value || '').trim().toLowerCase() : '';
                if (v && typeof kpcdAllDecs === 'function') {
                    var d = kpcdAllDecs().find(function (x) { return x && x.status === 'Đã ban hành' && decMsg(x) && (String(x.claimCode || '').toLowerCase() === v || String(x.decNo || '').toLowerCase() === v || String(x.id || '').toLowerCase() === v); });
                    if (d) {
                        var er = document.getElementById('kpcdTbDecInputErr'); if (er) er.innerText = decMsg(d);
                        if (typeof qdtuMark === 'function') qdtuMark('kpcdTbDecInput', true);
                        inp.focus();
                        return;
                    }
                }
                return se.apply(this, arguments);
            };
            ws2.__kphl = true;
            window.kpcdTbSearch = ws2;
        }
        // Tiếp tục: Quyết định đã chọn chuyển Không có hiệu lực (cập nhật ở màn khác)
        var co = window.kpcdTbContinue;
        if (typeof co === 'function' && !co.__kphl) {
            var wc = function () {
                var id = ''; try { id = kpcdTbState && kpcdTbState.decId; } catch (e) { /* bỏ qua */ }
                var d = id && typeof kpcdAllDecs === 'function' ? kpcdAllDecs().find(function (x) { return x.id === id; }) : null;
                if (d && decMsg(d)) { if (typeof showToast === 'function') showToast(decMsg(d), 'warning'); return; }
                return co.apply(this, arguments);
            };
            wc.__kphl = true;
            window.kpcdTbContinue = wc;
        }
    }

    // Lưới: khóa mờ Trình thông báo chi trả / Cập nhật chi trả + nhãn dưới trạng thái
    function rowItem(tr) {
        for (var i = 0; i < tr.cells.length; i++) {
            var t = (tr.cells[i].innerText || '').trim();
            if (/^KP-\d{4}-\d+/.test(t)) { var it = find(t.split(/\s/)[0]); if (it) return it; }
        }
        return null;
    }
    function decorateTable() {
        var tbody = document.getElementById('proposalsTableBody'); if (!tbody) return;
        css();
        Array.prototype.forEach.call(tbody.rows, function (tr) {
            if (tr.cells.length < 3) return;
            var item = rowItem(tr);
            if (!item || !blocked(item)) return;
            Array.prototype.forEach.call(tr.querySelectorAll('button'), function (b) {
                var t = (b.getAttribute('title') || '').split(':')[0].trim();
                // Nút đã khóa theo trạng thái: giữ nguyên tooltip lý do sẵn có
                if (BLOCK_ACTS.indexOf(t) < 0 || b.classList.contains('is-off') || b.getAttribute('aria-disabled') === 'true' || b.style.pointerEvents === 'none' || (b.style.opacity && parseFloat(b.style.opacity) < 1)) return;
                b.removeAttribute('onclick');
                b.onclick = function (e) { e.stopPropagation(); };
                b.classList.add('is-off', 'kphl-off');
                b.setAttribute('aria-disabled', 'true');
                b.setAttribute('title', t + ': ' + MSG);
            });
            var stCell = tr.cells[tr.cells.length - 2];
            if (stCell && !stCell.querySelector('.kphl-sub')) stCell.insertAdjacentHTML('beforeend', '<div class="kphl-sub"><span class="badge">' + LABEL + '</span></div>');
        });
    }
    // Màn chi tiết: ẩn nút ở Footer + nhãn cạnh trạng thái + khối cảnh báo
    function decorateDetail(item) {
        if (!item || !blocked(item)) return;
        css();
        var foot = document.getElementById('kpdtFoot');
        if (foot) Array.prototype.forEach.call(foot.querySelectorAll('button'), function (b) { if (BLOCK_ACTS.indexOf((b.textContent || '').trim()) >= 0) b.remove(); });
        var hs = document.getElementById('kpdtHeadStatus');
        if (hs && !hs.querySelector('.kphl-sub')) hs.insertAdjacentHTML('beforeend', '<span class="kphl-sub" style="margin-left:8px;"><span class="badge">' + LABEL + '</span></span>');
        var body = document.getElementById('kpdtBody');
        var info = decInfo(item) || {};
        if (body && !body.querySelector('.kphl-alert')) {
            body.insertAdjacentHTML('afterbegin', '<div class="kphl-alert"><b><i class="fa-solid fa-circle-exclamation"></i> QUYẾT ĐỊNH GIẢI QUYẾT BỒI THƯỜNG KHÔNG CÓ HIỆU LỰC</b><br>'
                + 'Quyết định số ' + esc(info.decNo || item.baseDecisionNo || '-') + (info.at ? ' - cập nhật lúc ' + esc(info.at) : '') + '.'
                + (info.reason ? '<br>Lý do: ' + esc(info.reason) : '')
                + '<br>Không thực hiện Trình thông báo chi trả / Cập nhật chi trả.</div>');
        }
    }

    // ---------------- Dữ liệu mẫu ----------------
    var SEED_DECS = [
        { decId: 'QD-HL1', code: 'KP-2026-191', claimCode: 'BT-2026-191', nycName: 'Trần Thị Thu Hương', nycAddress: 'Số 18 phố Kim Mã, Phường Giảng Võ, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Thành phố Hà Nội', decNo: '41/QĐ-STP', issueDate: '05/10/2026', total: 180000000, advance: 0, net: 180000000,
            recipient: { name: 'Trần Thị Thu Hương', idNo: '001188005511', account: '0021001122334', bank: 'Vietcombank', branch: 'Chi nhánh Ba Đình' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Trần Thị Thu Hương', account: '0021001122334', bank: 'Vietcombank', branch: 'Chi nhánh Ba Đình' }, at: '10:00 05/10/2026', hieuLuc: OFF,
            reason: 'Người yêu cầu bồi thường đã khởi kiện yêu cầu Tòa án giải quyết yêu cầu bồi thường trong thời hạn; Quyết định chưa phát sinh hiệu lực thi hành.', hlAt: '09:30 20/10/2026' },
        { decId: 'QD-HL2', code: 'KP-2026-192', claimCode: 'BT-2026-192', nycName: 'Nguyễn Văn Phúc', nycAddress: 'Số 7 phố Nguyễn Chí Thanh, Phường Láng, Thành phố Hà Nội', unitId: 'BTP-01', unitName: 'Bộ Tư pháp', decNo: '33/QĐ-BTP', issueDate: '01/10/2026', total: 300000000, advance: 0, net: 300000000,
            recipient: { name: 'Nguyễn Văn Phúc', idNo: '001079008899', account: '1903366778899', bank: 'Techcombank', branch: 'Chi nhánh Đống Đa' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Nguyễn Văn Phúc', account: '1903366778899', bank: 'Techcombank', branch: 'Chi nhánh Đống Đa' }, at: '15:00 01/10/2026', hieuLuc: 'Có hiệu lực',
            reason: 'Đã rà soát, xác định thông tin người nhận tiền bồi thường chính xác; Quyết định tiếp tục có hiệu lực.', hlAt: '15:00 15/10/2026' },
        { decId: 'QD-HL3', code: 'KP-2026-193', claimCode: 'BT-2026-193', nycName: 'Lê Minh Đức', nycAddress: 'Số 25 phố Lò Đúc, Phường Hai Bà Trưng, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Thành phố Hà Nội', decNo: '38/QĐ-STP', issueDate: '15/09/2026', total: 120000000, advance: 0, net: 120000000,
            recipient: { name: 'Lê Minh Đức', idNo: '001085006677', account: '0451000334455', bank: 'Vietinbank', branch: 'Chi nhánh Hai Bà Trưng' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Lê Minh Đức', account: '0451000334455', bank: 'Vietinbank', branch: 'Chi nhánh Hai Bà Trưng' }, at: '14:00 15/09/2026', hieuLuc: 'Có hiệu lực', reason: '', hlAt: '' },
        { decId: 'QD-HL4', code: 'KP-2026-194', claimCode: 'BT-2026-194', nycName: 'Phạm Thị Ngọc Ánh', nycAddress: 'Số 40 phố Hàng Bài, Phường Hoàn Kiếm, Thành phố Hà Nội', unitId: 'STP-HN', unitName: 'Sở Tư pháp Thành phố Hà Nội', decNo: '40/QĐ-STP', issueDate: '02/10/2026', total: 95000000, advance: 0, net: 95000000,
            recipient: { name: 'Phạm Thị Ngọc Ánh', idNo: '001192007788', account: '0021009988112', bank: 'BIDV', branch: 'Chi nhánh Hoàn Kiếm' },
            payout: { method: 'Nhận qua chuyển khoản', accHolder: 'Phạm Thị Ngọc Ánh', account: '0021009988112', bank: 'BIDV', branch: 'Chi nhánh Hoàn Kiếm' }, at: '09:00 02/10/2026', hieuLuc: OFF,
            reason: 'Cơ quan có thẩm quyền yêu cầu tạm dừng thi hành Quyết định để xem xét lại.', hlAt: '14:00 21/10/2026' }
    ];
    function seed() {
        if (typeof kptbBuildRecord !== 'function') return;
        var arr = list(), n = 0;
        // Kho dùng chung hiệu lực: bổ sung khi chưa có (màn Quyết định GQBT chưa mở)
        var map = rj(MAP_KEY, {}) || {}, mch = false;
        SEED_DECS.forEach(function (s) {
            if (!map[s.decId]) { map[s.decId] = { claimCode: s.claimCode, decNo: s.decNo, status: 'Đã ban hành', hieuLuc: s.hieuLuc, reason: s.reason, at: s.hlAt }; mch = true; }
            if (arr.some(function (p) { return p && (p.decId === s.decId || p.code === s.code); })) return;
            var dec = {}; Object.keys(s).forEach(function (k) { if (['code', 'hieuLuc', 'reason', 'hlAt'].indexOf(k) < 0) dec[k] = s[k]; });
            var W = window.BTNN_WF; if (W && W.unitName) { var un = W.unitName(dec.unitId); if (un && un !== dec.unitId) dec.unitName = un; }
            var it = kptbBuildRecord(dec, { code: s.code });
            // [p8] QD-HL2 (Có hiệu lực): giữ "Chờ thông báo chi trả" để tạo được Thông báo chi trả tại MH24 (không vướng chặn trùng)
            // Thông báo chi trả đã trình (Ký số), Chờ duyệt; Quyết định sau đó chuyển Không có hiệu lực
            if (s.decId === 'QD-HL4' && typeof kptbLevels === 'function') {
                var levels = kptbLevels(s.claimCode);
                if (levels.length) {
                    var assignees = levels.map(function (lv) { return lv.leaders[0] || ''; });
                    it.kptbNotice = { signMethod: 'Ký số', docNo: '36/TB-STP', docDate: '20/10/2026', time: '', place: '', assignees: assignees, docFile: { name: 'Mau_32_BTNN_Thong_bao_chi_tra_BT-2026-194.doc', generated: true } };
                    it.kptbApproval = { kind: 'Thông báo chi trả', path: levels.map(function (l) { return l.unitId; }), assignees: assignees, level: 0, steps: [], content: 'Kính trình Lãnh đạo ký Thông báo chi trả tiền bồi thường.', submittedBy: 'canbonv', submittedAt: '10:00 20/10/2026', pending: true, attachments: [] };
                    it.status = 'Chờ duyệt';
                    it.user = 'Nguyễn Văn Cán Bộ';
                    it.kptbHistory.push({ at: '10:00 20/10/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Trình ký', note: 'Thông báo chi trả. Nội dung: Kính trình Lãnh đạo ký Thông báo chi trả tiền bồi thường.' });
                }
            }
            if (s.decId === 'QD-HL3') {
                it.status = 'Hoàn thành';
                it.user = 'Nguyễn Văn Cán Bộ';
                it.kptbNotice = { signMethod: 'Ký ngoài', docNo: '30/TB-STP', docDate: '18/09/2026', signedFile: 'Thong_bao_chi_tra_BT-2026-193_da_ky.pdf', issuedAt: '09:00 18/09/2026' };
                it.noticeReceivedDate = '18/09/2026';
                it.kptbPayment = { method: 'Nhận qua chuyển khoản', accHolder: 'Lê Minh Đức', account: '0451000334455', bank: 'Vietinbank', branch: 'Chi nhánh Hai Bà Trưng', payDate: '25/09/2026', amount: 120000000, files: [{ name: 'Ủy nhiệm chi', file: { name: 'UNC_KP-2026-193.pdf' } }], at: '10:00 25/09/2026', by: 'canbonv' };
                it.payoutDate = '25/09/2026';
                it.payoutAmountReal = 120000000;
                it.kptbHistory.push({ at: '09:00 18/09/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Ban hành Thông báo chi trả (Ký ngoài)', note: 'Tệp đã ký: Thong_bao_chi_tra_BT-2026-193_da_ky.pdf.' });
                it.kptbHistory.push({ at: '10:00 25/09/2026', userId: 'canbonv', userName: 'Nguyễn Văn Cán Bộ', action: 'Cập nhật chi trả', note: 'Ngày chi trả 25/09/2026; số tiền 120.000.000 đồng; Nhận qua chuyển khoản.' });
            }
            arr.unshift(it);
            n++;
        });
        if (mch) wj(MAP_KEY, map);
        if (n && typeof saveProposalsToLocal === 'function') saveProposalsToLocal();
    }

    // ---------------- Bọc chức năng sẵn có ----------------
    if (typeof kptbImportAndSeed === 'function') {
        var origSeed = kptbImportAndSeed;
        kptbImportAndSeed = function () { var r = origSeed.apply(this, arguments); try { seed(); } catch (e) { console.error(e); } return r; };
    }
    if (typeof renderProposalsTable === 'function') {
        var origRender = renderProposalsTable;
        renderProposalsTable = function () { install(); var r = origRender.apply(this, arguments); try { decorateTable(); } catch (e) { console.error(e); } return r; };
    }
    if (typeof kpdtRender === 'function') {
        var origDt = kpdtRender;
        kpdtRender = function (item) { var r = origDt.apply(this, arguments); try { decorateDetail(item); } catch (e) { console.error(e); } return r; };
    }
    install();
    var boot = function () { try { install(); decorateTable(); if (typeof kpdtIsOpen === 'function' && kpdtIsOpen() && typeof kpdtFind === 'function') { var it = kpdtFind(kpdtCurId); if (it) decorateDetail(it); } } catch (e) { console.error(e); } };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 30); }); else setTimeout(boot, 30);
    // Quyết định đổi hiệu lực ở tab khác: vẽ lại danh sách
    window.addEventListener('storage', function (e) { if ((e.key === QD_KEY || e.key === MAP_KEY) && typeof renderProposalsTable === 'function') { try { renderProposalsTable(); } catch (x) { /* bỏ qua */ } } });
})();
