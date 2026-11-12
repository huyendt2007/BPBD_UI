/**
 * [ro1] 09/11/2026 - Nhân rộng thí điểm [pc1]: Phân công hồ sơ và Thiết lập các cấp trình ký theo Nhóm Lãnh đạo (Chức vụ) cho mọi phân hệ BTNN.
 * Không dùng Cấu hình luồng xử lý.
 *
 * - Nhóm Lãnh đạo, Phân công, Thu hồi, Trình ký theo các cấp tự thiết lập, Ký duyệt theo cấp: lõi tại btnn_luong_xu_ly.js (BTNN_WF)
 *   (leadersOfUnit, canAssign, assignToUnit, assignToOfficers, getRecallInfo, recall, submitForApproval(extra.levels), approve).
 * - Tệp này: giao diện dùng chung
 *   + Popup Phân công 02 hình thức "Phân công" / "Chuyển chuyên viên phụ trách trực tiếp" (Tiếp nhận hồ sơ; Cử người phục hồi danh dự - opts BTNN_WF.PHDD_ASSIGN);
 *   + Khối "Thiết lập các cấp trình ký" (levelSetup) dùng ở Bước 2 mọi popup trình ký (Thêm cấp, Xóa cấp, Lên, Xuống; mỗi cấp: Lãnh đạo, Ký nháy, Ký số, Đặt chữ ký);
 *   + Màn Ký duyệt theo cấp (decorateDecision): cấp bật Ký số hiển thị khối Ký số; không bật: gán chữ ký / chữ ký nháy.
 *
 * Nạp SAU btnn_luong_xu_ly.js (và btnn_lanh_dao_actions.js nếu trang có); trang Xác định CQGQBT nạp SAU xac_dinh_co_quan_boi_thuong.js.
 * API: window.BTNN_PCKD.
 *
 * [dd4] 12/11/2026 - Đơn vị ban hành, Văn thư và khối "Thông tin ban hành văn bản" ở Bước 2 (người dùng duyệt đặc tả 12/11/2026).
 * ===== API công bố cho popup trình của các phân hệ (Tiếp nhận, Giải quyết YCBT, QĐ GQBT, Kinh phí, Hoàn trả, Báo cáo công tác...) =====
 * 1. levelSetup(cfg) -> ui. Ngoài cfg cũ (host, page, method, userId, prev, onChange, addId, header):
 *    - cfg.soNgay: true | false | () => boolean (mặc định false). true: hiện "Số, ký hiệu văn bản", "Địa danh", "Ngày văn bản", dòng xem trước
 *      "[Địa danh], ngày dd tháng mm năm yyyy" và ô Số, ô Ngày kéo thả trên văn bản. Trang còn trường số, ngày ở Bước 1 để false (không trùng trường).
 *      "Đóng dấu cơ quan", "Đơn vị ban hành", "Văn thư xử lý", nút "Đặt lại vị trí" và ô Dấu hiện ở mọi trang (chỉ Ký số trên hệ thống).
 *    - cfg.docPos: () => ({ so: { x, y, w? } | null, ngay: { x, y, w? } | null }) (tùy chọn): vị trí dòng "Số:" và dòng "[Địa danh], ngày ..."
 *      của văn bản sinh theo mẫu, tọa độ px trong trang cfg.page (w: độ rộng tối thiểu của ô để che dòng chấm). Không có: ô Số { x: 70, y: 112 },
 *      ô Ngày { x: 420, y: 112 }. Ô Dấu mặc định trùm khoảng 1/3 bên trái ô ký cấp cuối (cấp cuối chưa đặt ô ký: theo vị trí mặc định của ô ký cấp cuối).
 *    - cfg.banHanhPrev (tùy chọn): giá trị điền sẵn lúc khởi tạo, cùng dạng tham số thứ 3 của ui.reset.
 * 2. ui.reset(prevLevels, dongDau, banHanhPrev): trình lại sau Bị trả lại - điền sẵn các cấp, ô tích "Đóng dấu cơ quan" và khối Thông tin ban hành
 *    (banHanhPrev = collect().banHanh của lần trình trước; Đơn vị ban hành lần trước không còn hợp lệ thì để trống). Gọi reset(prev) như cũ vẫn chạy.
 *    ui.setBanHanh({ soKyHieu, diaDanh, ngayVanBan, donViBanHanh, viTri }): đặt giá trị khởi tạo từ dữ liệu cũ mà không đổi các cấp, rồi vẽ lại.
 * 3. ui.validate(): thêm kiểm tra "Ngày văn bản" sai định dạng ("Ngày không hợp lệ (dd/mm/yyyy)") và "Đơn vị ban hành" bắt buộc khi tích "Đóng dấu cơ quan".
 *    Số, ký hiệu và Ngày văn bản KHÔNG bắt buộc với cán bộ trình.
 * 4. ui.collect() trả thêm:
 *    - dongDau: giá trị hiệu lực (Ký ngoài hoặc ô tích bị khóa thì false);
 *    - banHanh: { soKyHieu, diaDanh, ngayVanBan ('dd/mm/yyyy' | ''), ngayChu, dongDau, donViBanHanh (mã đơn vị cây WF | ''), donViBanHanhTen,
 *      vanThu (chuỗi "Văn thư xử lý"), viTri: { so: { x, y, w? } | null, ngay: { x, y, w? } | null, dau: { x, y, d } | null } } | null (Ký ngoài).
 *      (x, y: góc trên trái của ô, px trong trang cfg.page; w: độ rộng tối thiểu của ô; d: đường kính ô Dấu theo kích thước con dấu)
 * 5. Lưu cùng phiếu trình: signDoc.dongDau = col.dongDau, signDoc.banHanh = col.banHanh. decorateDecision(rec) đọc rec.approval.signDoc.dongDau /
 *    .banHanh để vẽ ô Số, ô Ngày, ô Dấu và các dòng Đơn vị ban hành, Văn thư xử lý ở cấp cuối. Phân hệ lưu phiếu trình riêng: toLegacy(col) trả thêm
 *    dongDau, banHanh; decorateLegacy(st) đọc st.dongDau / st.banHanh; decorateSimple(a, s) đọc s.dongDau / s.banHanh (s = st.lvCol hoặc phiếu đã lưu);
 *    simpleMount(st) gọi reset(st.prevLv, st.prevDongDau, st.prevBanHanh); prevBanHanhOf(x) lấy banHanh từ phiếu trình đã lưu.
 * 6. Hàm hỗ trợ: SEALS (con dấu giả lập: { ma, ten, donViSoHuu, donViVanThu, taiKhoanVanThu: [], trangThai, kichThuoc } - nhập 1 trong 2 hoặc cả 2 trường văn thư),
 *    sealsOf(unitId) (con dấu Hoạt động), vanThuOfSeal(seal) -> { cachVanThu, donViVanThu, donViVanThuTen, taiKhoan, text }, vanThuText(unitId)
 *    (chuỗi sau "Văn thư xử lý: ", nhiều con dấu nối bằng "; "), isVanThuOfSeal(seal, { id?, hoTen, donVi }),
 *    donViBanHanhList(leaderId), diaDanhOf(unitId), ngayHopLe('dd/mm/yyyy'), ngayChu(diaDanh, 'dd/mm/yyyy').
 */
(function (global) {
    'use strict';
    const WF = global.BTNN_WF;
    if (!WF || WF.__pckd) return;
    WF.__pckd = true;
    const esc = v => WF.esc(v);
    const ST = WF.STATUS;
    const KEY_SEED = 'btnn_pckd_seed_v1'; // dữ liệu mẫu thí điểm (khóa riêng)

    // ---------------- Nhóm Lãnh đạo (lõi BTNN_WF) ----------------
    const laNhomLanhDao = WF.laNhomLanhDao;
    const isLeaderUser = id => WF.isNhomLanhDaoUser(id);
    const leadersOfUnit = WF.leadersOfUnit;
    const isLeaderOfUnit = (userId, unitId) => !!unitId && leadersOfUnit(unitId).includes(userId);
    const usersOfUnit = WF.usersOfUnit;
    const parentOf = WF.parentUnitOf;
    const unitChainUp = WF.unitChainUp;
    const childUnitsWithLeaders = WF.childUnitsWithLeaders;
    const signLeaderCandidates = WF.signLeaderCandidates;
    function hasChildUnits(unitId) { return WF.getChildren(unitId).length > 0; }
    function label2(id) { const u = WF.getUser(id); return u ? `${u.name} - ${u.title}` : (id || ''); }
    function label3(id) { const u = WF.getUser(id); return u ? `${u.name} - ${u.title} - ${WF.unitName(u.unitId)}` : (id || ''); }
    const assignToUnit = (code, toUnitId, toLeaders, note) => WF.assignToUnit(code, toUnitId, note, toLeaders);
    const assignToOfficer = (code, chuTri, note) => WF.assignToOfficers(code, chuTri, note);
    function isPilotApproval(rec) { return !!(rec && rec.approval && rec.approval.tuThietLap); }
    function submitLevels(code, kind, content, files, opts) {
        const o = opts || {};
        return WF.submitForApproval(code, kind, content, files, { levels: o.levels, signDoc: o.signDoc || null, reason: o.reason || '', pcSig: o.signDoc && o.signDoc.pcSig });
    }

    // ---------------- Dữ liệu mẫu thí điểm: 02 hồ sơ Xác định CQGQBT Chờ phân công (Bộ Tư pháp, Sở Tư pháp Hà Nội) ----------------
    // Chỉ tạo tại Tiếp nhận hồ sơ / Xác định CQGQBT (sau khi trang đã nạp danh sách tiếp nhận), rồi tải lại tab đang mở
    function seed() {
        if (!/tiep_nhan_ycbt|xac_dinh_co_quan_boi_thuong/i.test(String(location.pathname || ''))) return;
        try { if (localStorage.getItem(KEY_SEED)) return; } catch (e) { return; }
        try {
            const mk = (root, nyc, phone, ward, addr, hanhVi, by) => {
                const code = WF.nextVuViecCode();
                WF.createPendingRecord({
                    id: 'WF-' + code, code, maVuViec: code, loaiYeuCau: WF.REQUEST_TYPE_XD, rootUnitId: root, source: 'Tiếp nhận', nguonHoSo: WF.SOURCES.TIEP_NHAN,
                    hinhThucTiepNhan: WF.RECEIVE_METHODS.TRUC_TIEP, receivedAt: WF.nowText(), date: WF.dateText(), receivedBy: WF.userName(by), createdBy: by,
                    nycName: nyc, nycPhone: phone, nycType: 'Cá nhân', nycCountry: 'Việt Nam', nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: ward, nycAddressDetail: addr,
                    linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi, pilot: 'pc1',
                    procBasis: '', procTargetAgency: '', procReason: '', procDecisionFile: '', claimCode: '-',
                    historyNote: `Chuyển lãnh đạo ${WF.unitName(root)} phân công xử lý.`
                });
            };
            mk('BTP-01', 'Phạm Văn Kiên', '0912456789', '00004 - Phường Hoàn Kiếm', 'Số 12 Hàng Bài', 'Ra quyết định thu hồi đất không đúng thẩm quyền.', 'hatt');
            mk('STP-HN', 'Đỗ Thị Hạnh', '0983112233', '00007 - Phường Cầu Giấy', 'Số 45 Trần Thái Tông', 'Từ chối cấp Phiếu lý lịch tư pháp trái quy định.', 'cv_hn2');
            localStorage.setItem(KEY_SEED, '1');
            if (typeof global.switchReceptionTab === 'function') { try { global.switchReceptionTab(receptionTab); } catch (e) { /* bỏ qua */ } }
        } catch (e) { console.warn('[pc1] Không tạo được dữ liệu mẫu thí điểm', e); }
    }
    // [ro1] Dữ liệu mẫu có Cán bộ phối hợp: Bộ -> Cục -> Phòng -> Chuyển chuyên viên (chủ trì Trần Thị Thu Hà, phối hợp Phạm Minh Đức)
    function seedPhoiHop() {
        if (!/tiep_nhan_ycbt|xac_dinh_co_quan_boi_thuong/i.test(String(location.pathname || ''))) return;
        try { if (localStorage.getItem('btnn_pckd_seed_ph_v1')) return; } catch (e) { return; }
        const me = WF.getCurrentUserId();
        try {
            const code = WF.nextVuViecCode();
            WF.createPendingRecord({
                id: 'WF-' + code, code, maVuViec: code, loaiYeuCau: WF.REQUEST_TYPE_XD, rootUnitId: 'BTP-01', source: 'Tiếp nhận', nguonHoSo: WF.SOURCES.TIEP_NHAN,
                hinhThucTiepNhan: WF.RECEIVE_METHODS.TRUC_TIEP, receivedAt: WF.nowText(), date: WF.dateText(), receivedBy: WF.userName('hatt'), createdBy: 'hatt',
                nycName: 'Vũ Minh Quân', nycPhone: '0904556677', nycType: 'Cá nhân', nycCountry: 'Việt Nam', nycTinhThanh: 'Thành phố Hà Nội', nycPhuongXa: '00001 - Phường Ba Đình', nycAddressDetail: 'Số 8 Phan Đình Phùng',
                linhVuc: 'TRONG HOẠT ĐỘNG QUẢN LÝ HÀNH CHÍNH', hanhVi: 'Thu hồi giấy phép xây dựng không đúng quy định.', pilot: 'ph1',
                procBasis: '', procTargetAgency: '', procReason: '', procDecisionFile: '', claimCode: '-', historyNote: 'Chuyển lãnh đạo Bộ Tư pháp phân công xử lý.'
            });
            WF.setCurrentUser('oanhdh'); WF.assignToUnit(code, 'CĐK-01', 'Giao Cục xử lý.', []);
            WF.setCurrentUser('cuctruong'); WF.assignToUnit(code, 'PLN-02', 'Giao Phòng xử lý.', ['tpbt']);
            WF.setCurrentUser('tpbt'); WF.assignToOfficers(code, 'hatt', 'Đồng chí Hà chủ trì, đồng chí Đức phối hợp.', ['ducpm']);
            localStorage.setItem('btnn_pckd_seed_ph_v1', '1');
        } catch (e) { console.warn('[ro1] Không tạo được dữ liệu mẫu phối hợp', e); }
        finally { if (WF.getCurrentUserId() !== me) WF.setCurrentUser(me); }
    }
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => { seed(); seedPhoiHop(); }, 0));

    // ---------------- Giao diện dùng chung: CSS, Combobox (chọn 1 / chọn nhiều, tìm kiếm) ----------------
    const CSS = `
    .pc-ov { position: fixed; inset: 0; background: rgba(15,23,42,.45); display: none; align-items: center; justify-content: center; z-index: 9500; }
    .pc-ov.open { display: flex; }
    .pc-modal { background: #fff; border-radius: 10px; width: 720px; max-width: 95vw; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 12px 32px rgba(0,0,0,.2); font-family: Inter, system-ui, sans-serif; }
    .pc-head { padding: 16px 22px 12px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
    .pc-head h3 { margin: 0; font-size: 16px; color: #1e3a8a; display: flex; gap: 8px; align-items: center; }
    .pc-x { cursor: pointer; font-size: 20px; color: #64748b; }
    .pc-body { padding: 16px 22px; overflow-y: auto; flex: 1; font-size: 13.5px; color: #1e293b; }
    .pc-foot { padding: 12px 22px 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; background: #f8fafc; border-radius: 0 0 10px 10px; }
    .pc-btn { border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; padding: 8px 14px; font: 600 13px Inter, system-ui, sans-serif; cursor: pointer; color: #334155; display: inline-flex; align-items: center; gap: 6px; }
    .pc-btn.primary { background: #1e3a8a; border-color: #1e3a8a; color: #fff; }
    .pc-btn.sm { padding: 4px 8px; font-size: 12px; font-weight: 500; }
    .pc-btn:disabled { opacity: .45; cursor: not-allowed; }
    .pc-ctx { color: #64748b; font-size: 12.5px; margin-bottom: 12px; }
    .pc-group { margin-bottom: 14px; }
    .pc-lbl { display: block; font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #334155; }
    .pc-req { color: #dc2626; margin-left: 2px; }
    .pc-hint { color: #64748b; font-size: 12px; margin-top: 4px; }
    .pc-err { color: #dc2626; font-size: 12px; margin-top: 4px; display: none; }
    .pc-input { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font: inherit; font-size: 13.5px; }
    .pc-mode { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .pc-mode label { display: flex; gap: 8px; align-items: flex-start; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 12px; cursor: pointer; }
    .pc-mode label.on { border-color: #2563eb; background: #eff6ff; }
    .pc-mode label.off { opacity: .45; cursor: not-allowed; background: #f8fafc; }
    .pc-mode b { display: block; font-size: 13.5px; color: #0f172a; }
    .pc-mode small { color: #64748b; font-size: 12px; }
    .pc-combo { position: relative; }
    .pc-cb-box { display: flex; align-items: center; justify-content: space-between; gap: 6px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; min-height: 38px; box-sizing: border-box; background: #fff; cursor: pointer; }
    .pc-combo.invalid .pc-cb-box { border-color: #dc2626; background: #fef2f2; }
    .pc-combo.disabled .pc-cb-box { background: #f1f5f9; cursor: not-allowed; color: #94a3b8; }
    .pc-cb-val { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; gap: 4px; font-size: 13.5px; }
    .pc-cb-ph { color: #94a3b8; }
    .pc-chip { background: #e0e7ff; color: #3730a3; border-radius: 999px; padding: 2px 8px; font-size: 12px; display: inline-flex; gap: 6px; align-items: center; }
    .pc-chip i { cursor: pointer; }
    .pc-cb-panel { display: none; position: absolute; left: 0; right: 0; top: calc(100% + 4px); background: #fff; border: 1px solid #cbd5e1; border-radius: 6px; box-shadow: 0 10px 25px rgba(0,0,0,.15); z-index: 9999; }
    .pc-combo.open .pc-cb-panel { display: block; }
    .pc-cb-search { padding: 8px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
    .pc-cb-search input { width: 100%; box-sizing: border-box; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font: inherit; font-size: 13px; }
    .pc-cb-list { max-height: 220px; overflow-y: auto; padding: 4px 0; }
    .pc-cb-item { padding: 7px 12px; font-size: 13px; cursor: pointer; display: flex; gap: 8px; align-items: center; }
    .pc-cb-item:hover { background: #f1f5f9; }
    .pc-cb-item.sel { background: #eff6ff; color: #1e40af; font-weight: 600; }
    .pc-cb-empty { padding: 10px; color: #94a3b8; text-align: center; font-style: italic; font-size: 13px; }
    .pc-lv { background: #fff; border: 1px solid #c7d2fe; border-left: 4px solid #4f46e5; border-radius: 8px; padding: 10px 12px; }
    .pc-lv.last { border-color: #fecaca; border-left-color: #b91c1c; }
    .pc-lv-head { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 8px; }
    .pc-lv-title { font-size: 12.5px; font-weight: 700; color: #4338ca; }
    .pc-lv.last .pc-lv-title { color: #b91c1c; }
    .pc-lv-tools { display: flex; gap: 4px; }
    .pc-lv-tools button { border: 1px solid #e2e8f0; background: #fff; border-radius: 4px; width: 26px; height: 26px; cursor: pointer; color: #475569; }
    .pc-lv-tools button:disabled { opacity: .35; cursor: not-allowed; }
    .pc-lv-tools button.del { color: #dc2626; }
    .pc-lv-opts { display: flex; gap: 18px; align-items: center; margin: 8px 0; font-size: 12.5px; }
    .pc-lv-opts label { display: inline-flex; gap: 6px; align-items: center; cursor: pointer; }
    .pc-sw { position: relative; width: 34px; height: 18px; display: inline-block; }
    .pc-sw input { opacity: 0; width: 0; height: 0; position: absolute; }
    .pc-sw span { position: absolute; inset: 0; background: #cbd5e1; border-radius: 999px; transition: .2s; }
    .pc-sw span::before { content: ''; position: absolute; width: 14px; height: 14px; left: 2px; top: 2px; background: #fff; border-radius: 50%; transition: .2s; }
    .pc-sw input:checked + span { background: #16a34a; }
    .pc-sw input:checked + span::before { transform: translateX(16px); }
    .pc-sw input:disabled + span { opacity: .7; }
    .pc-lock { color: #64748b; font-size: 11px; }
    .pc-sig-ctrls { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }
    .pc-sig { position: absolute; border: 2px dashed #4f46e5; background: rgba(238,242,255,.94); border-radius: 4px; padding: 4px 6px; font: 11px Inter, sans-serif; color: #1e293b; cursor: move; box-sizing: border-box; box-shadow: 0 4px 12px rgba(79,70,229,.18); }
    .pc-sig.last { border-color: #dc2626; background: rgba(254,242,242,.94); }
    .pc-sig .pc-sig-name { text-align: center; font-weight: 700; font-size: 12px; margin-top: 4px; }
    .pc-sig .pc-sig-tags { display: flex; justify-content: flex-end; gap: 4px; }
    .pc-tag { font-size: 9.5px; font-weight: 600; padding: 1px 6px; border-radius: 999px; background: #dbeafe; color: #1e40af; }
    .pc-tag.ks { background: #dcfce7; color: #15803d; }
    .pc-sig .sig-resize-handle { position: absolute; right: 2px; bottom: 2px; cursor: nwse-resize; font-size: 10px; color: #64748b; }
    .pc-kyblock { border: 1px solid #bbf7d0; background: #f0fdf4; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; font-size: 13px; }
    .pc-kyblock.nosign { border-color: #bfdbfe; background: #eff6ff; }
    .pc-kyblock-title { font-weight: 700; color: #0f172a; margin-bottom: 6px; display: flex; gap: 6px; align-items: center; }
    .pc-kyrow { display: grid; grid-template-columns: 120px 1fr; gap: 6px; padding: 2px 0; }
    .pc-kyrow > span:first-child { color: #64748b; }
    .ld-sigbox.pc-cur { border-color: #f59e0b !important; box-shadow: 0 0 0 3px rgba(245,158,11,.25); }
    .pc-dongdau { display: flex; gap: 8px; align-items: flex-start; padding: 10px 12px; border: 1px solid #fecaca; border-radius: 10px; background: #fff7f7; cursor: pointer; font-size: 13px; color: #0f172a; }
    .pc-dongdau input { margin-top: 3px; width: 16px; height: 16px; accent-color: #1d4ed8; flex-shrink: 0; }
    .pc-dongdau .pc-dongdau-sub { display: block; margin-top: 2px; font-size: 12px; color: #64748b; font-weight: 400; }
    .pc-dongdau.locked { cursor: not-allowed; background: #f8fafc; border-color: #e2e8f0; }
    .pc-dongdau.locked b, .pc-dongdau.locked .pc-dongdau-sub { color: #94a3b8; }
    .pc-dongdau .pc-dongdau-lock { display: block; margin-top: 6px; font-size: 12px; color: #b45309; font-weight: 500; }
    .pc-bh { border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; background: #f8fafc; display: flex; flex-direction: column; gap: 10px; }
    .pc-bh-title { font-weight: 700; font-size: 13px; color: #0f172a; display: flex; gap: 6px; align-items: center; text-transform: uppercase; }
    .pc-bh-title i { color: #b91c1c; }
    .pc-bh-f .pc-lbl { font-size: 12px; margin-bottom: 4px; }
    .pc-bh .pc-input { padding: 7px 10px; font-size: 13px; background: #fff; }
    .pc-bh .pc-input.pc-invalid { border-color: #dc2626; background: #fef2f2; }
    .pc-date { position: relative; }
    .pc-date .pc-input { padding-right: 32px; }
    .pc-date i { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; }
    .pc-bh-prev { margin-top: 6px; font: italic 13.5px 'Times New Roman', serif; color: #1e293b; background: #fff; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 5px 8px; }
    .pc-bh-vt { margin-top: 6px; font-size: 11.5px; color: #475569; }
    .pc-bh-acts { display: flex; justify-content: flex-start; }
    .pc-bhbox { position: absolute; z-index: 12; background: #fff; border: 1.5px dashed #0f766e; border-radius: 4px; padding: 2px 8px; font: 14px 'Times New Roman', Times, serif; color: #111; cursor: move; white-space: nowrap; box-sizing: border-box; box-shadow: 0 2px 8px rgba(15,118,110,.18); user-select: none; line-height: 1.5; text-align: center; }
    .pc-bhbox.ngay { font-style: italic; }
    .pc-bhbox.cho { color: #64748b; border-color: #94a3b8; background: rgba(255,255,255,.96); }
    .pc-bhbox.xem { cursor: default; box-shadow: none; }
    .pc-bhbox.xem.mo { border-color: #94a3b8; color: #64748b; }
    .pc-bhbox.xem.mo:not(.dau) { background: #f8fafc; }
    .pc-bhbox.dau.xem.mo { background: rgba(248,250,252,.45); }
    .pc-bhbox .pc-bh-tag { position: absolute; left: -1px; bottom: -18px; font: 600 9.5px Inter, system-ui, sans-serif; font-style: normal; background: #fef3c7; color: #92400e; border: 1px solid #fde68a; border-radius: 4px; padding: 0 6px; white-space: nowrap; line-height: 15px; }
    .pc-bhbox.dau { border-radius: 50%; border: 2px dashed #dc2626; background: rgba(254,242,242,.55); color: #b91c1c; display: flex; flex-direction: column; align-items: center; justify-content: center; font: 700 12px Inter, system-ui, sans-serif; white-space: normal; padding: 8px; box-shadow: none; }
    .pc-bhbox.dau small { display: block; font-weight: 500; font-size: 9.5px; color: #92400e; margin-top: 2px; }
    .pc-bh-sum { margin-top: 8px; padding-top: 8px; border-top: 1px dashed #bbf7d0; }`;
    function ensureCss() {
        if (document.getElementById('pcCss')) return;
        const st = document.createElement('style'); st.id = 'pcCss'; st.textContent = CSS;
        (document.head || document.documentElement).appendChild(st);
    }
    const fold = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
    // cfg: { multi, placeholder, options: () => [{ value, label }], onChange(value) }
    function combo(host, cfg) {
        host.classList.add('pc-combo');
        host.innerHTML = '<div class="pc-cb-box" tabindex="0"><div class="pc-cb-val"></div><i class="fa-solid fa-chevron-down" style="color:#64748b; font-size:12px;"></i></div>'
            + '<div class="pc-cb-panel"><div class="pc-cb-search"><input type="text" placeholder="Tìm kiếm..." autocomplete="off"></div><div class="pc-cb-list"></div></div>';
        const box = host.querySelector('.pc-cb-box'), valEl = host.querySelector('.pc-cb-val'), input = host.querySelector('input'), listEl = host.querySelector('.pc-cb-list');
        let val = cfg.multi ? [] : '';
        let disabled = false;
        const opts = () => (cfg.options() || []);
        const labelOf = v => { const o = opts().find(x => x.value === v); return o ? o.label : (cfg.labelOf ? cfg.labelOf(v) : v); };
        function paint() {
            if (cfg.multi) {
                valEl.innerHTML = val.length ? val.map(v => `<span class="pc-chip">${esc(labelOf(v))}<i class="fa-solid fa-xmark" data-rm="${esc(v)}"></i></span>`).join('') : `<span class="pc-cb-ph">${esc(cfg.placeholder || '')}</span>`;
            } else valEl.innerHTML = val ? `<span>${esc(labelOf(val))}</span>` : `<span class="pc-cb-ph">${esc(cfg.placeholder || '')}</span>`;
        }
        function renderList() {
            const q = fold(input.value.trim());
            const list = opts().filter(o => !q || fold(o.label).includes(q));
            listEl.innerHTML = list.length ? list.map(o => {
                const sel = cfg.multi ? val.includes(o.value) : val === o.value;
                return `<div class="pc-cb-item${sel ? ' sel' : ''}" data-v="${esc(o.value)}">${cfg.multi ? `<i class="fa-${sel ? 'solid fa-square-check' : 'regular fa-square'}"></i>` : ''}<span>${esc(o.label)}</span></div>`;
            }).join('') : `<div class="pc-cb-empty">${esc(cfg.emptyText || 'Không có dữ liệu phù hợp')}</div>`;
        }
        function setVal(v, silent) {
            val = cfg.multi ? (Array.isArray(v) ? v.slice() : []) : (v || '');
            paint(); renderList();
            if (!silent && cfg.onChange) cfg.onChange(api.get());
        }
        function open(on) {
            if (disabled) on = false;
            document.querySelectorAll('.pc-combo.open').forEach(c => { if (c !== host) c.classList.remove('open'); });
            host.classList.toggle('open', on);
            if (on) { input.value = ''; renderList(); setTimeout(() => input.focus(), 30); }
        }
        box.addEventListener('click', e => {
            const rm = e.target.getAttribute && e.target.getAttribute('data-rm');
            if (rm && !disabled) { e.stopPropagation(); setVal(val.filter(x => x !== rm)); return; }
            open(!host.classList.contains('open'));
        });
        input.addEventListener('input', renderList);
        input.addEventListener('click', e => e.stopPropagation());
        listEl.addEventListener('click', e => {
            e.stopPropagation();
            const it = e.target.closest('.pc-cb-item'); if (!it) return;
            const v = it.getAttribute('data-v');
            if (cfg.multi) setVal(val.includes(v) ? val.filter(x => x !== v) : val.concat(v));
            else { setVal(v); open(false); }
        });
        document.addEventListener('click', e => { if (!host.contains(e.target)) host.classList.remove('open'); });
        const api = {
            get: () => (cfg.multi ? val.slice() : val),
            set: (v, silent) => setVal(v, silent !== false),
            refresh: () => { if (cfg.multi) val = val.filter(v => opts().some(o => o.value === v)); else if (val && !opts().some(o => o.value === val)) val = ''; paint(); renderList(); },
            setDisabled: b => { disabled = !!b; host.classList.toggle('disabled', disabled); if (disabled) host.classList.remove('open'); },
            setInvalid: b => host.classList.toggle('invalid', !!b)
        };
        paint(); renderList();
        return api;
    }
    function toast(msg, ok) {
        if (typeof global.showToast === 'function') { try { global.showToast(msg, ok ? 'success' : 'error'); return; } catch (e) { /* bỏ qua */ } }
        alert(msg);
    }

    // ---------------- Popup Phân công (thay MH05) - dùng chung Tiếp nhận hồ sơ / Cử người phục hồi danh dự ----------------
    // opts (không bắt buộc): BTNN_WF.PHDD_ASSIGN { title, unitOf(rec), canAssign(rec, me), assignUnit(code, unit, note, leaders), assignOfficer(code, chuTri, note) }
    const A = { code: '', cb: null, mode: 'unit', unit: null, leaders: null, officer: null, phoiHop: null, opts: null };
    const TN_ASSIGN = {
        title: 'Phân công xử lý hồ sơ',
        unitOf: rec => rec.currentUnitId,
        canAssign: (rec, me) => WF.canAssign(rec, me),
        assignUnit: (code, unit, note, leaders) => WF.assignToUnit(code, unit, note, leaders),
        assignOfficer: (code, chuTri, note, phoiHop) => WF.assignToOfficers(code, chuTri, note, phoiHop)
    };
    const curUnit = () => { const r = WF.getRecord(A.code); return r ? A.opts.unitOf(r) : ''; };
    function mountAssign() {
        if (document.getElementById('pcAssignOverlay')) return;
        ensureCss();
        const wrap = document.createElement('div');
        wrap.innerHTML = `<div class="pc-ov" id="pcAssignOverlay"><div class="pc-modal">
            <div class="pc-head"><h3><i class="fa-solid fa-diagram-project"></i> <span id="pcATitle">Phân công xử lý hồ sơ</span> <span id="pcACode"></span></h3><span class="pc-x" data-pc-close>&times;</span></div>
            <div class="pc-body">
                <div class="pc-ctx" id="pcACtx"></div>
                <div class="pc-group"><span class="pc-lbl">Hình thức<span class="pc-req">*</span></span>
                    <div class="pc-mode">
                        <label id="pcAModeUnitL"><input type="radio" name="pcAMode" value="unit"><span><b>Phân công</b><small id="pcAModeUnitHint">Giao đơn vị trực thuộc cấp dưới trực tiếp</small></span></label>
                        <label id="pcAModeOffL"><input type="radio" name="pcAMode" value="officer"><span><b>Chuyển chuyên viên phụ trách trực tiếp</b><small>Giao 01 cán bộ của đơn vị đang phân công chủ trì</small></span></label>
                    </div>
                </div>
                <div id="pcAUnitBlock">
                    <div class="pc-group"><span class="pc-lbl">Đơn vị nhận<span class="pc-req">*</span></span><div id="pcAUnit"></div><div class="pc-err" id="pcAUnitErr">Đây là trường bắt buộc</div></div>
                    <div class="pc-group"><span class="pc-lbl">Lãnh đạo nhận</span><div id="pcALeaders"></div><div class="pc-hint">Để trống: giao cả Nhóm Lãnh đạo của đơn vị nhận.</div></div>
                </div>
                <div id="pcAOffBlock">
                    <div class="pc-group"><span class="pc-lbl">Cán bộ chủ trì<span class="pc-req">*</span></span><div id="pcAOfficer"></div><div class="pc-err" id="pcAOffErr">Đây là trường bắt buộc</div></div>
                    <div class="pc-group"><span class="pc-lbl">Cán bộ phối hợp</span><div id="pcAPhoiHop"></div><div class="pc-hint">Cán bộ phối hợp chỉ xem hồ sơ.</div></div>
                </div>
                <div class="pc-group"><span class="pc-lbl">Ý kiến chỉ đạo</span><textarea id="pcANote" class="pc-input" rows="3" placeholder="Nhập ý kiến chỉ đạo..."></textarea></div>
            </div>
            <div class="pc-foot"><button class="pc-btn" data-pc-close>Hủy bỏ</button><button class="pc-btn primary" id="pcASubmit"><i class="fa-solid fa-paper-plane"></i> Xác nhận</button></div>
        </div></div>`;
        document.body.appendChild(wrap);
        const ov = document.getElementById('pcAssignOverlay');
        ov.addEventListener('click', e => { if (e.target.hasAttribute && e.target.hasAttribute('data-pc-close')) ov.classList.remove('open'); });
        A.unit = combo(document.getElementById('pcAUnit'), {
            placeholder: 'Chọn đơn vị nhận...',
            options: () => { const u = curUnit(); return u ? childUnitsWithLeaders(u).map(id => ({ value: id, label: WF.unitName(id) })) : []; },
            onChange: v => { document.getElementById('pcAUnitErr').style.display = 'none'; A.unit.setInvalid(false); A.leaders.set([], true); A.leaders.setDisabled(!v); A.leaders.refresh(); }
        });
        A.leaders = combo(document.getElementById('pcALeaders'), {
            multi: true, placeholder: 'Chọn Lãnh đạo nhận (không bắt buộc)...',
            options: () => { const u = A.unit.get(); return u ? leadersOfUnit(u).map(id => ({ value: id, label: label2(id) })) : []; }
        });
        A.officer = combo(document.getElementById('pcAOfficer'), {
            placeholder: 'Chọn cán bộ chủ trì...', emptyText: 'Không tìm thấy cán bộ phù hợp',
            // [ct1] Lãnh đạo không làm cán bộ chủ trì: chỉ tài khoản Đang hoạt động của đơn vị, không thuộc Nhóm Lãnh đạo
            options: () => { const u = curUnit(); return u ? usersOfUnit(u).filter(id => !isLeaderUser(id)).map(id => ({ value: id, label: label2(id) })) : []; },
            // Đổi chủ trì sang người đang ở phối hợp: tự bỏ người đó khỏi phối hợp
            onChange: v => { document.getElementById('pcAOffErr').style.display = 'none'; A.officer.setInvalid(false); A.phoiHop.set(A.phoiHop.get().filter(x => x !== v), true); A.phoiHop.refresh(); }
        });
        A.phoiHop = combo(document.getElementById('pcAPhoiHop'), {
            multi: true, placeholder: 'Chọn cán bộ phối hợp (không bắt buộc)...',
            options: () => { const u = curUnit(); const ct = A.officer.get(); return u ? usersOfUnit(u).filter(id => id !== ct).map(id => ({ value: id, label: label2(id) })) : []; }
        });
        document.querySelectorAll('input[name="pcAMode"]').forEach(r => r.addEventListener('change', () => setMode(r.value)));
        document.getElementById('pcASubmit').addEventListener('click', submitAssign);
    }
    function setMode(mode) {
        A.mode = mode;
        document.querySelectorAll('input[name="pcAMode"]').forEach(r => { r.checked = r.value === mode; });
        document.getElementById('pcAModeUnitL').classList.toggle('on', mode === 'unit');
        document.getElementById('pcAModeOffL').classList.toggle('on', mode === 'officer');
        document.getElementById('pcAUnitBlock').style.display = mode === 'unit' ? '' : 'none';
        document.getElementById('pcAOffBlock').style.display = mode === 'officer' ? '' : 'none';
    }
    function openAssign(code, cb, opts) {
        mountAssign();
        A.opts = opts && opts.unitOf ? opts : TN_ASSIGN;
        const rec = WF.getRecord(code);
        const me = WF.getCurrentUserId();
        A.cb = cb;
        if (!rec || !A.opts.canAssign(rec, me)) { toast('Hồ sơ đã được xử lý bởi người khác. Danh sách đã được tải lại.', false); if (cb) cb(); return; }
        if (A.opts === TN_ASSIGN && WF.markViewed(rec, me)) WF.upsertRecord(rec);
        A.code = code;
        const unitNow = A.opts.unitOf(rec);
        document.getElementById('pcATitle').textContent = A.opts.title || 'Phân công xử lý hồ sơ';
        document.getElementById('pcACode').textContent = rec.maVuViec || code;
        document.getElementById('pcACtx').textContent = `Đơn vị đang phân công: ${WF.unitName(unitNow)}`;
        // Đơn vị không có đơn vị con (hoặc không có đơn vị con có Lãnh đạo): hình thức Phân công hiển thị mờ
        const canUnit = childUnitsWithLeaders(unitNow).length > 0;
        const unitL = document.getElementById('pcAModeUnitL');
        unitL.classList.toggle('off', !canUnit);
        unitL.querySelector('input').disabled = !canUnit;
        document.getElementById('pcAModeUnitHint').textContent = canUnit ? 'Giao đơn vị trực thuộc cấp dưới trực tiếp' : (hasChildUnits(unitNow) ? 'Đơn vị trực thuộc chưa có Lãnh đạo' : 'Đơn vị không có đơn vị trực thuộc');
        A.unit.set('', true); A.unit.refresh(); A.unit.setInvalid(false);
        A.leaders.set([], true); A.leaders.setDisabled(true);
        A.officer.set('', true); A.officer.refresh(); A.officer.setInvalid(false);
        A.phoiHop.set([], true); A.phoiHop.refresh();
        ['pcAUnitErr', 'pcAOffErr'].forEach(id => { document.getElementById(id).style.display = 'none'; });
        document.getElementById('pcANote').value = '';
        setMode(canUnit ? 'unit' : 'officer');
        document.getElementById('pcAssignOverlay').classList.add('open');
    }
    function submitAssign() {
        const note = document.getElementById('pcANote').value.trim();
        let res;
        if (A.mode === 'unit') {
            const u = A.unit.get();
            if (!u) { document.getElementById('pcAUnitErr').style.display = 'block'; A.unit.setInvalid(true); return; }
            res = A.opts.assignUnit(A.code, u, note, A.leaders.get());
        } else {
            const c = A.officer.get();
            if (!c) { document.getElementById('pcAOffErr').style.display = 'block'; A.officer.setInvalid(true); return; }
            res = A.opts.assignOfficer(A.code, c, note, A.phoiHop.get());
        }
        // MSG-ERR-BTNN-LXL-020 / 021: lựa chọn không còn hợp lệ -> giữ popup để chọn lại
        if (!res.ok && /LXL-02[01]/.test(res.code || '')) { toast(res.message, false); return; }
        document.getElementById('pcAssignOverlay').classList.remove('open');
        toast(res.ok ? `Đã phân công hồ sơ ${res.record.maVuViec || A.code}. Trạng thái: [${res.record.status}].` : res.message, res.ok);
        if (typeof A.cb === 'function') A.cb();
    }

    // ---------------- Khối "Thiết lập các cấp trình ký" dùng chung (Bước 2 popup trình ký) ----------------
    // cfg: { host: phần tử chứa thẻ cấp, page: trang A4 (đặt ô ký), method(): 'Ký số' | 'Ký ngoài', userId: cán bộ trình (mặc định tài khoản đang đăng nhập),
    //        prev: [{ leader, kyNhay, kySo, sig }] (trình lại: điền sẵn), onChange(levels): cập nhật dòng ký của văn bản theo Lãnh đạo cấp cuối,
    //        [dd4] soNgay, docPos, banHanhPrev: xem mục API đầu tệp }
    // levels[i]: { leader, kyNhay, kySo, kySoChon (lựa chọn của cán bộ khi chưa là cấp cuối), sig: { x, y, w, h } | null }
    const LV_HEAD_HTML = '<div style="font-weight:700; color:#0f172a; font-size:14.5px; margin-bottom:4px;"><i class="fa-solid fa-layer-group" style="color:#2563eb;"></i> THIẾT LẬP CÁC CẤP TRÌNH KÝ</div>'
        + '<div style="font-size:12px; color:#64748b;">Cấp 1 là cấp sát cán bộ trình; cấp cuối là cấp ký văn bản (bắt buộc Ký số). Ô ký bắt buộc ở cấp cuối và cấp có Ký nháy.</div>';
    // [dd1] 12/11/2026: ô tích "Đóng dấu cơ quan" (mặc định tích), chỉ khi Ký số trên hệ thống;
    //       tích: Lãnh đạo cấp cuối Ký duyệt xong, văn bản chuyển Văn thư đóng dấu, ban hành (menu Ban hành văn bản); hồ sơ giữ Chờ duyệt
    // [dd4] 12/11/2026: ô tích nằm trong khối "Thông tin ban hành văn bản" dưới nút Thêm cấp, cùng Số, ký hiệu; Địa danh; Ngày văn bản;
    //       Đơn vị ban hành; Văn thư xử lý; nút Đặt lại vị trí. Ô Số, ô Ngày, ô Dấu kéo thả trên văn bản (cùng cơ chế ô ký .pc-sig).

    // ---------------- Con dấu, Đơn vị ban hành, Văn thư (giả lập theo Cấu hình thông tin về con dấu - Quản trị hệ thống) ----------------
    // { ma, ten, donViSoHuu, donViVanThu, taiKhoanVanThu: [Họ tên], trangThai, kichThuoc (px) }.
    // donViSoHuu, donViVanThu: mã đơn vị trên cây WF; đơn vị chưa có trên cây giả lập (Văn phòng Bộ, Văn phòng Sở Tư pháp) giữ dạng tên.
    // Chốt 12/11/2026 (thay Radio "Văn thư xử lý theo"): Đơn vị văn thư và Tài khoản văn thư luôn hiện, nhập 1 trong 2 hoặc cả 2.
    // Văn thư của con dấu: có Tài khoản văn thư -> chính các tài khoản đó (nếu có cả Đơn vị văn thư thì tài khoản thuộc đơn vị đó);
    //   chỉ có Đơn vị văn thư -> các tài khoản cán bộ thuộc Đơn vị văn thư. Không xét quyền "Ban hành văn bản" (quyền mở menu do Phân quyền quy định).
    // Trường cachVanThu cũ không còn dùng (giữ đọc được dữ liệu cũ).
    const SEALS = [
        { ma: 'SEL_000', ten: 'Con dấu tròn Bộ Tư pháp', donViSoHuu: 'BTP-01', donViVanThu: 'Văn phòng Bộ', taiKhoanVanThu: [], trangThai: 'Hoạt động', kichThuoc: 150 },
        { ma: 'SEL_001', ten: 'Con dấu tròn chính Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước', donViSoHuu: 'CĐK-01', donViVanThu: 'CĐK-01-VP', taiKhoanVanThu: [], trangThai: 'Hoạt động', kichThuoc: 150 },
        { ma: 'SEL_011', ten: 'Con dấu tròn Văn phòng Cục', donViSoHuu: 'CĐK-01-VP', donViVanThu: 'CĐK-01-VP', taiKhoanVanThu: [], trangThai: 'Hoạt động', kichThuoc: 130 },
        { ma: 'SEL_021', ten: 'Con dấu Phòng Quản lý nghiệp vụ về bồi thường nhà nước', donViSoHuu: 'PLN-02', donViVanThu: '', taiKhoanVanThu: ['Đào Thị Yến'], trangThai: 'Hoạt động', kichThuoc: 120 },
        { ma: 'SEL_101', ten: 'Dấu tròn Sở Tư pháp Thành phố Hà Nội', donViSoHuu: 'STP-HN', donViVanThu: 'Văn phòng Sở Tư pháp', taiKhoanVanThu: [], trangThai: 'Hoạt động', kichThuoc: 150 },
        // 12/11/2026: con dấu UBND thành phố Hà Nội (Báo cáo công tác BTNN do Lãnh đạo UBND tỉnh ký cấp cuối) - khớp bctt_bao_cao.js, ban_hanh_van_ban.html
        { ma: 'SEL_201', ten: 'Con dấu Ủy ban nhân dân thành phố Hà Nội', donViSoHuu: 'UBND-HN', donViVanThu: 'Văn phòng UBND thành phố Hà Nội', taiKhoanVanThu: [], trangThai: 'Hoạt động', kichThuoc: 150 }
    ];
    const unitLabel = id => (WF.getUnit && WF.getUnit(id) ? WF.unitName(id) : String(id || ''));
    // Con dấu của đơn vị (mặc định chỉ con dấu Hoạt động)
    function sealsOf(unitId, all) { return unitId ? SEALS.filter(s => s.donViSoHuu === unitId && (all || s.trangThai === 'Hoạt động')) : []; }
    // text: chuỗi sau "Văn thư xử lý: " - [Tên Đơn vị văn thư] | [Họ tên], [Họ tên] | [Họ tên], [Họ tên] ([Tên Đơn vị văn thư])
    function vanThuOfSeal(s) {
        const tk = ((s && s.taiKhoanVanThu) || []).filter(Boolean);
        const dvId = (s && s.donViVanThu) || '';
        const dv = dvId ? unitLabel(dvId) : '';
        const text = tk.length ? tk.join(', ') + (dv ? ` (${dv})` : '') : dv;
        return { cachVanThu: tk.length ? 'taiKhoan' : 'donVi', donViVanThu: dvId, donViVanThuTen: dv, taiKhoan: tk.slice(), text };
    }
    // "Văn thư xử lý" của Đơn vị ban hành: Văn thư của mọi con dấu Hoạt động thuộc đơn vị (không giao đích danh)
    function vanThuText(unitId) { const out = []; sealsOf(unitId).forEach(s => { const t = vanThuOfSeal(s).text; if (!out.includes(t)) out.push(t); }); return out.join('; '); }
    // user: { id?, hoTen, donVi } - tài khoản đang xem menu Ban hành văn bản (mockup so khớp tài khoản văn thư theo họ tên hoặc mã)
    function isVanThuOfSeal(s, user) {
        if (!s || !user) return false;
        const tk = (s.taiKhoanVanThu || []).filter(Boolean);
        if (tk.length) return tk.includes(user.hoTen) || (!!user.id && tk.includes(user.id));   // có Tài khoản văn thư: chỉ các tài khoản này
        return !!s.donViVanThu && user.donVi === s.donViVanThu;                                // chỉ có Đơn vị văn thư
    }
    // Danh sách Đơn vị ban hành: đơn vị của Lãnh đạo cấp cuối và các đơn vị cấp trên có ít nhất 01 con dấu Hoạt động (gần nhất trước)
    function donViBanHanhList(leaderId) { const u = WF.getUser(leaderId); return u ? unitChainUp(u.unitId).filter(id => sealsOf(id).length > 0) : []; }
    // Địa danh: Tỉnh/Thành phố của đơn vị (cây WF), bỏ tiền tố "Thành phố ", "Tỉnh ", "TP. "
    function diaDanhOf(unitId) {
        if (!unitId) return '';
        const u = WF.getUnit ? WF.getUnit(unitId) : null;
        let t = (u && u.tinhThanh) || '';
        if (!t && WF.agencyAddress) { try { t = WF.agencyAddress(unitId).tinh || ''; } catch (e) { t = ''; } }
        return String(t).replace(/^\s*(Thành phố|Tỉnh|TP\.)\s*/i, '').trim();
    }
    function ngayHopLe(s) {
        const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(s || '').trim());
        if (!m) return false;
        const d = new Date(+m[3], +m[2] - 1, +m[1]);
        return d.getFullYear() === +m[3] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[1];
    }
    // "[Địa danh], ngày dd tháng mm năm yyyy": ngày dưới 10 và tháng 1, 2 thêm số 0; Địa danh trống thì bắt đầu "ngày"; ngày không hợp lệ: ''
    function ngayChu(diaDanh, s) {
        if (!ngayHopLe(s)) return '';
        const m = String(s).trim().split('/');
        const t = `ngày ${m[0]} tháng ${+m[1] <= 2 ? m[1] : String(+m[1])} năm ${m[2]}`;
        const dd = String(diaDanh || '').trim();
        return dd ? `${dd}, ${t}` : t;
    }
    const NGAY_CHO = diaDanh => (String(diaDanh || '').trim() ? `${String(diaDanh).trim()}, ` : '') + 'ngày … tháng … năm …';
    // Kích thước ô Dấu: Kích thước (px) của con dấu Hoạt động đầu tiên của Đơn vị ban hành; chưa có Đơn vị ban hành: mặc định 150 của cấu hình con dấu
    const D_DAU = 150;
    function dauSizeOf(unitId) { const s = sealsOf(unitId)[0]; return (s && s.kichThuoc) || D_DAU; }
    // Vẽ ô Số, ô Ngày, ô Dấu chỉ đọc theo vị trí đã lưu (màn Ký duyệt); tích Đóng dấu cơ quan: khung mờ có nhãn "Văn thư điền khi ban hành"
    function drawBhView(pg, bh, dongDau) {
        if (!pg || !bh) return;
        const vt = bh.viTri || {};
        const add = (p, cls, html, d) => {
            if (!p) return;
            const box = document.createElement('div');
            box.className = 'pc-bhbox xem ' + cls + (dongDau ? ' mo' : '');
            Object.assign(box.style, { left: p.x + 'px', top: p.y + 'px' });
            if (d) Object.assign(box.style, { width: d + 'px', height: d + 'px' });
            else if (p.w) box.style.minWidth = p.w + 'px';
            box.innerHTML = html;
            pg.appendChild(box);
        };
        // Tích: Lãnh đạo ký số văn bản chưa có số, ngày, dấu - các ô là khung mờ, nội dung "Văn thư điền khi ban hành"
        if (dongDau) {
            if (vt.so) add(vt.so, 'so cho', 'Văn thư điền khi ban hành');
            if (vt.ngay) add(vt.ngay, 'ngay cho', 'Văn thư điền khi ban hành');
            if (vt.dau) add(vt.dau, 'dau', 'Dấu cơ quan<small>Văn thư điền khi ban hành</small>', vt.dau.d || D_DAU);
            return;
        }
        // Không tích: ô Số, ô Ngày có giá trị hiển thị dạng xem trước nội dung sẽ chèn khi Lãnh đạo cấp cuối Ký duyệt
        const so = String(bh.soKyHieu || '').trim();
        const nc = bh.ngayChu || ngayChu(bh.diaDanh, bh.ngayVanBan);
        if (vt.so && so) add(vt.so, 'so', esc('Số: ' + so));
        if (vt.ngay && nc) add(vt.ngay, 'ngay', esc(nc));
    }

    function levelSetup(cfg) {
        ensureCss();
        const newBh = () => ({ so: '', diaDanh: '', diaDanhSua: false, ngay: '', donVi: '', viTri: { so: null, ngay: null, dau: null } });
        const S = { levels: [], combos: [], drag: null, dongDau: true, bh: newBh(), lastKey: null, wasLocked: false, dv: null, dvCfg: null, fp: null };
        const newLevel = () => ({ leader: '', kyNhay: false, kySo: false, kySoChon: false, sig: null });
        const defSig = (i, last) => (last ? { x: 480, y: 860, w: 245, h: 110 } : { x: 60 + (i % 2) * 210, y: 860 + Math.floor(i / 2) * 100, w: 200, h: 90 });
        const sigRequired = (l, i) => i === S.levels.length - 1 || l.kyNhay;
        const online = () => (typeof cfg.method === 'function' ? cfg.method() : 'Ký số') !== 'Ký ngoài';
        const host = () => (typeof cfg.host === 'function' ? cfg.host() : cfg.host);
        const page = () => (typeof cfg.page === 'function' ? cfg.page() : cfg.page);
        // cfg.soNgay: true - trường nhập + ô trên văn bản; 'o' - chỉ ô trên văn bản (giá trị đặt qua setBanHanh); false - không có
        const soNgayMode = () => { const v = typeof cfg.soNgay === 'function' ? cfg.soNgay() : cfg.soNgay; return v === 'o' ? 'o' : (v ? 'on' : ''); };
        const soNgayOn = () => !!soNgayMode();
        const soNgayFields = () => soNgayMode() === 'on';
        const submitterId = () => (typeof cfg.userId === 'function' ? cfg.userId() : cfg.userId) || WF.getCurrentUserId();
        const lastLeader = () => { const l = S.levels[S.levels.length - 1]; return (l && l.leader) || ''; };
        const dvList = () => donViBanHanhList(lastLeader());
        // Đơn vị của Lãnh đạo cấp cuối và mọi cấp trên không có con dấu Hoạt động: khóa ô tích, bỏ tích (không chặn trình)
        const locked = () => !!lastLeader() && dvList().length === 0;
        const ddOn = () => online() && !locked() && !!S.dongDau;
        function normalizeLast() { const n = S.levels.length; S.levels.forEach((l, i) => { l.kySo = i === n - 1 ? true : !!l.kySoChon; }); }
        // Địa danh mặc định: Tỉnh/Thành phố của Đơn vị ban hành; không tích: đơn vị Lãnh đạo cấp cuối; chưa chọn: đơn vị cán bộ trình
        function diaDanhDefault() {
            const lu = WF.getUser(lastLeader()), su = WF.getUser(submitterId());
            return diaDanhOf(ddOn() && S.bh.donVi ? S.bh.donVi : (lu ? lu.unitId : (su ? su.unitId : '')));
        }
        // Lãnh đạo cấp cuối đổi (chọn, thêm, xóa, đổi thứ tự cấp): tính lại Đơn vị ban hành về đơn vị gần nhất; Địa danh theo mặc định khi chưa sửa tay
        function syncBh() {
            const key = lastLeader(), list = dvList();
            // Ô tích bị khóa thì bỏ tích; đổi Lãnh đạo cấp cuối làm ô tích được mở khóa lại thì trở về mặc định Tích
            const lk = !!key && list.length === 0;
            if (lk) S.dongDau = false; else if (S.wasLocked) S.dongDau = true;
            S.wasLocked = lk;
            if (key !== S.lastKey) { S.lastKey = key; S.bh.donVi = list[0] || ''; }
            else if (S.bh.donVi && !list.includes(S.bh.donVi)) S.bh.donVi = '';
            if (!S.bh.diaDanhSua) S.bh.diaDanh = diaDanhDefault();
        }
        // Giá trị điền sẵn (trình lại / dữ liệu cũ): Đơn vị ban hành lần trước không còn hợp lệ thì để trống; lần trước không tích thì theo mặc định
        function applyBanHanh(b) {
            if (!b) return;
            if (typeof b.soKyHieu === 'string') S.bh.so = b.soKyHieu;
            if (typeof b.ngayVanBan === 'string') S.bh.ngay = b.ngayVanBan;
            const vt = b.viTri || {};
            ['so', 'ngay', 'dau'].forEach(k => { if (vt[k] && typeof vt[k].x === 'number') S.bh.viTri[k] = { x: vt[k].x, y: vt[k].y }; });
            if (b.donViBanHanh !== undefined) { S.lastKey = lastLeader(); const list = dvList(); S.bh.donVi = b.donViBanHanh ? (list.includes(b.donViBanHanh) ? b.donViBanHanh : '') : (list[0] || ''); }
            if (typeof b.diaDanh === 'string') { S.bh.diaDanh = b.diaDanh; S.bh.diaDanhSua = b.diaDanh.trim() !== diaDanhDefault(); }
        }
        // dongDau: trình lại điền theo lần trình trước; trình lần đầu mặc định tích. banHanhPrev: collect().banHanh lần trước
        function reset(prev, dongDau, banHanhPrev) {
            const p = Array.isArray(prev) ? prev : [];
            S.levels = p.length ? p.map((l, i) => ({ leader: l.leader || '', kyNhay: !!l.kyNhay, kySo: !!l.kySo, kySoChon: i < p.length - 1 && !!l.kySo, sig: l.sig ? Object.assign({}, l.sig) : null })) : [newLevel()];
            const b = banHanhPrev || null;
            S.dongDau = typeof dongDau === 'boolean' ? dongDau : (b && typeof b.dongDau === 'boolean' ? b.dongDau : true);
            normalizeLast();
            S.bh = newBh(); S.lastKey = null; S.wasLocked = false;
            if (b) applyBanHanh(b);
        }
        function bhHtml() {
            const f = soNgayFields();
            return `<div class="pc-bh" data-bh="blk">
                <div class="pc-bh-title"><i class="fa-solid fa-stamp"></i> Thông tin ban hành văn bản</div>
                ${f ? `<div class="pc-bh-f"><span class="pc-lbl">Số, ký hiệu văn bản</span><input type="text" class="pc-input" data-bh="so" maxlength="50" placeholder="Nhập số, ký hiệu văn bản" autocomplete="off"></div>
                <div class="pc-bh-f"><span class="pc-lbl">Địa danh</span><input type="text" class="pc-input" data-bh="dia" maxlength="100" placeholder="Nhập địa danh" autocomplete="off"></div>
                <div class="pc-bh-f"><span class="pc-lbl">Ngày văn bản</span><div class="pc-date"><input type="text" class="pc-input" data-bh="ngay" maxlength="10" placeholder="dd/mm/yyyy" autocomplete="off"><i class="fa-regular fa-calendar-days"></i></div><div class="pc-err" data-err="ngay">Ngày không hợp lệ (dd/mm/yyyy)</div><div class="pc-bh-prev" data-bh="prev" style="display:none;"></div></div>` : ''}
                <label class="pc-dongdau" data-bh="ddl"><input type="checkbox" data-act="dd"><span><b>Đóng dấu cơ quan</b><span class="pc-dongdau-sub">Sau khi Lãnh đạo cấp cuối Ký duyệt, văn bản chuyển Văn thư đóng dấu và ban hành.</span><span class="pc-dongdau-lock" data-bh="lock" style="display:none;">Đơn vị của Lãnh đạo cấp cuối và các đơn vị cấp trên chưa có con dấu Hoạt động.</span><span class="pc-dongdau-lock" data-bh="nodau" style="display:none;">Đơn vị của Lãnh đạo cấp cuối không có con dấu. Văn bản do đơn vị này ban hành thì bỏ tích Đóng dấu cơ quan.</span></span></label>
                <div class="pc-bh-f" data-bh="dvg"><span class="pc-lbl">Đơn vị ban hành<span class="pc-req">*</span></span><div data-bh="dv"></div><div class="pc-err" data-err="dv">Đây là trường bắt buộc</div><div class="pc-bh-vt" data-bh="vt"></div></div>
                <div class="pc-bh-acts"><button type="button" class="pc-btn sm" data-bh="reset" title="Đưa ô Số, ô Ngày và ô Dấu về vị trí mặc định"><i class="fa-solid fa-rotate-left"></i> Đặt lại vị trí</button></div>
            </div>`;
        }
        function render() {
            const w = host(); if (!w) return;
            const n = S.levels.length;
            const on = online();
            const cand = signLeaderCandidates(submitterId());
            S.combos.length = 0;
            w.innerHTML = S.levels.map((l, i) => {
                const last = i === n - 1;
                const req = sigRequired(l, i);
                return `<div class="pc-lv${last ? ' last' : ''}" data-i="${i}">
                    <div class="pc-lv-head"><span class="pc-lv-title">Cấp ${i + 1}${last ? ' - Cấp cuối' : ''}</span>
                        <span class="pc-lv-tools"><button type="button" title="Lên" data-act="up" ${i === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-up"></i></button><button type="button" title="Xuống" data-act="down" ${last ? 'disabled' : ''}><i class="fa-solid fa-arrow-down"></i></button>${n > 1 ? '<button type="button" class="del" title="Xóa cấp" data-act="del"><i class="fa-solid fa-trash"></i></button>' : ''}</span></div>
                    <span class="pc-lbl" style="font-size:12px;">Lãnh đạo<span class="pc-req">*</span></span>
                    <div class="pc-lv-leader"></div><div class="pc-err" data-err="leader">Đây là trường bắt buộc</div>
                    <div class="pc-lv-opts">
                        <label><input type="checkbox" data-act="kn" ${l.kyNhay ? 'checked' : ''}> Ký nháy</label>
                        ${on ? `<label title="${last ? 'Cấp cuối bắt buộc Ký số' : ''}"><span class="pc-sw"><input type="checkbox" data-act="ks" ${l.kySo ? 'checked' : ''} ${last ? 'disabled' : ''}><span></span></span> Ký số ${last ? '<i class="fa-solid fa-lock pc-lock"></i>' : ''}</label>` : ''}
                    </div>
                    <div class="pc-sig-ctrls">${l.sig
                        ? `<span style="font-size:11px; color:#94a3b8; margin-right:4px;">Đã đặt ô ký</span><button type="button" class="pc-btn sm" data-act="sz" data-w="160" data-h="75">Nhỏ</button><button type="button" class="pc-btn sm" data-act="sz" data-w="200" data-h="90">Vừa</button><button type="button" class="pc-btn sm" data-act="sz" data-w="260" data-h="115">Lớn</button><button type="button" class="pc-btn sm" data-act="reset"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button>`
                        : `<button type="button" class="btn btn-secondary btn-sm" data-act="place" style="font-size:12px;"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button>${req ? '<span style="font-size:11px; color:#b45309; margin-left:6px;">Bắt buộc</span>' : ''}`}</div>
                    <div class="pc-err" data-err="sig">Chưa đặt chữ ký</div>
                </div>`;
            }).join('') + '<button type="button"' + (cfg.addId ? ' id="' + cfg.addId + '"' : '') + ' class="btn btn-secondary btn-sm pc-add-level" style="align-self:flex-start; font-size:12.5px;"><i class="fa-solid fa-plus"></i> Thêm cấp</button>'
                + (on ? bhHtml() : '');
            w.style.display = 'flex'; w.style.flexDirection = 'column'; w.style.gap = '10px';
            // Tiêu đề vùng bên phải của Bước 2: "Thiết lập các cấp trình ký"
            const side = w.parentElement;
            if (cfg.header !== false && side && !side.getAttribute('data-pc-head')) {
                const h = Array.from(side.children).find(c => c !== w && c.children.length <= 3 && /THIẾT LẬP VỊ TRÍ|KÉO Ô KÝ|Kéo ô ký|LÃNH ĐẠO CÁC CẤP|VỊ TRÍ CHỮ KÝ/.test(c.textContent || ''));
                if (h) { h.innerHTML = LV_HEAD_HTML; side.setAttribute('data-pc-head', '1'); }
            }
            w.querySelectorAll('.pc-lv').forEach(card => {
                const i = Number(card.getAttribute('data-i'));
                const c = combo(card.querySelector('.pc-lv-leader'), {
                    placeholder: 'Chọn Lãnh đạo...',
                    options: () => cand.filter(id => id === S.levels[i].leader || !S.levels.some((x, k) => k !== i && x.leader === id)).map(id => ({ value: id, label: label3(id) })),
                    labelOf: label3,
                    onChange: v => { S.levels[i].leader = v; c.setInvalid(false); card.querySelector('[data-err="leader"]').style.display = 'none'; S.combos.forEach(x => x.refresh()); renderSigs(); }
                });
                c.set(S.levels[i].leader, true);
                S.combos.push(c);
                card.addEventListener('click', e => {
                    const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'INPUT') return;
                    const act = b.getAttribute('data-act');
                    const L = S.levels;
                    if (act === 'up' && i > 0) { [L[i - 1], L[i]] = [L[i], L[i - 1]]; }
                    else if (act === 'down' && i < L.length - 1) { [L[i + 1], L[i]] = [L[i], L[i + 1]]; }
                    else if (act === 'del' && L.length > 1) { L.splice(i, 1); }
                    else if (act === 'place' || act === 'reset') { L[i].sig = defSig(i, i === L.length - 1); }
                    else if (act === 'sz') { L[i].sig.w = Number(b.getAttribute('data-w')); L[i].sig.h = Number(b.getAttribute('data-h')); }
                    else return;
                    normalizeLast(); render(); renderSigs();
                    if (act === 'place') { const bx = page() && page().querySelector(`.pc-sig[data-i="${i}"]`); if (bx && bx.scrollIntoView) bx.scrollIntoView({ block: 'center' }); }
                });
                card.querySelectorAll('input[type="checkbox"]').forEach(inp => inp.addEventListener('change', () => {
                    const act = inp.getAttribute('data-act');
                    if (act === 'kn') S.levels[i].kyNhay = inp.checked;
                    if (act === 'ks' && i !== S.levels.length - 1) S.levels[i].kySoChon = inp.checked;
                    normalizeLast(); render(); renderSigs();
                }));
            });
            const add = w.querySelector('.pc-add-level');
            if (add) add.addEventListener('click', () => { S.levels.push(newLevel()); normalizeLast(); render(); renderSigs(); });
            if (on) bindBh(w); else { S.dv = null; if (S.fp) { try { S.fp.destroy(); } catch (e) { /* bỏ qua */ } S.fp = null; } }
            syncBh(); updateBhUi();
        }
        // ---- Khối "Thông tin ban hành văn bản" ----
        function bindBh(w) {
            const q = s => w.querySelector(`[data-bh="${s}"]`);
            const so = q('so'), dia = q('dia'), ngay = q('ngay');
            if (so) { so.value = S.bh.so; so.addEventListener('input', () => { S.bh.so = so.value; renderBhBoxes(); }); }
            if (dia) { dia.value = S.bh.diaDanh; dia.addEventListener('input', () => { S.bh.diaDanh = dia.value; S.bh.diaDanhSua = true; paintPrev(); renderBhBoxes(); }); }
            if (ngay) bindNgay(ngay, w.querySelector('[data-err="ngay"]'));
            else if (S.fp) { try { S.fp.destroy(); } catch (e) { /* bỏ qua */ } S.fp = null; }
            const dd = w.querySelector('[data-act="dd"]');
            if (dd) dd.addEventListener('change', () => { S.dongDau = dd.checked; refreshBh(); });
            const dvHost = q('dv');
            S.dvCfg = {
                placeholder: 'Chọn đơn vị ban hành...', emptyText: 'Không có đơn vị có con dấu Hoạt động',
                options: () => dvList().map(id => ({ value: id, label: WF.unitName(id) })), labelOf: id => WF.unitName(id),
                onChange: v => { S.bh.donVi = v; if (S.dv) S.dv.setInvalid(false); const e = w.querySelector('[data-err="dv"]'); if (e) e.style.display = 'none'; refreshBh(); }
            };
            S.dv = dvHost ? combo(dvHost, S.dvCfg) : null;
            const rs = q('reset');
            if (rs) rs.addEventListener('click', () => { S.bh.viTri = { so: null, ngay: null, dau: null }; renderBhBoxes(); });
        }
        // Ô ngày: flatpickr (d/m/Y) nếu trang có; giữ chữ cán bộ gõ để báo "Ngày không hợp lệ (dd/mm/yyyy)" (flatpickr tự đổi ngày sai)
        function bindNgay(inp, err) {
            if (S.fp) { try { S.fp.destroy(); } catch (e) { /* bỏ qua */ } S.fp = null; }
            const apply = () => {
                S.bh.ngay = inp.value.trim();
                const bad = !!S.bh.ngay && !ngayHopLe(S.bh.ngay);
                if (err) err.style.display = bad ? 'block' : 'none';
                inp.classList.toggle('pc-invalid', bad);
                paintPrev(); renderBhBoxes();
            };
            inp.addEventListener('input', e => { if (e.isTrusted) inp._tho = inp.value; const v = inp.value.trim(); S.bh.ngay = v; if (!v || ngayHopLe(v)) apply(); });
            inp.addEventListener('blur', () => setTimeout(() => { const tho = inp._tho; inp._tho = null; if (tho != null && tho.trim() && !ngayHopLe(tho.trim())) inp.value = tho; apply(); }, 0));
            if (typeof global.flatpickr === 'function') {
                try {
                    const fl = global.flatpickr, vn = fl.l10ns && fl.l10ns.vn;
                    S.fp = fl(inp, Object.assign({ dateFormat: 'd/m/Y', allowInput: true, disableMobile: true, onChange: () => { if (inp._tho == null) apply(); } }, vn ? { locale: vn } : {}));
                    if (S.fp && S.fp.calendarContainer) S.fp.calendarContainer.addEventListener('mousedown', () => { inp._tho = null; });
                } catch (e) { S.fp = null; }
            }
            if (S.fp && ngayHopLe(S.bh.ngay)) S.fp.setDate(S.bh.ngay, false, 'd/m/Y');
            inp.value = S.bh.ngay;
            const bad = !!S.bh.ngay && !ngayHopLe(S.bh.ngay);
            if (err) err.style.display = bad ? 'block' : 'none';
            inp.classList.toggle('pc-invalid', bad);
        }
        function paintPrev() {
            const w = host(); const el = w && w.querySelector('[data-bh="prev"]'); if (!el) return;
            const t = ngayChu(S.bh.diaDanh, S.bh.ngay);
            el.textContent = t; el.style.display = t ? '' : 'none';
        }
        function updateBhUi() {
            const w = host(); const blk = w && w.querySelector('[data-bh="blk"]'); if (!blk) return;
            const lk = locked(), on = ddOn(), lead = lastLeader();
            const dd = blk.querySelector('[data-act="dd"]');
            if (dd) { dd.checked = !lk && !!S.dongDau; dd.disabled = lk; }
            const ddl = blk.querySelector('[data-bh="ddl"]'); if (ddl) ddl.classList.toggle('locked', lk);
            const lock = blk.querySelector('[data-bh="lock"]'); if (lock) lock.style.display = lk ? '' : 'none';
            // 12/11/2026: đơn vị của Lãnh đạo cấp cuối không có con dấu (ví dụ Phòng) nhưng cấp trên có: nhắc bỏ tích nếu văn bản do đơn vị này ban hành
            const nodau = blk.querySelector('[data-bh="nodau"]');
            if (nodau) { const lu = lead ? WF.getUser(lead) : null; nodau.style.display = (!lk && online() && lu && lu.unitId && !sealsOf(lu.unitId).length) ? '' : 'none'; }
            const dvg = blk.querySelector('[data-bh="dvg"]'); if (dvg) dvg.style.display = on ? '' : 'none';
            if (S.dv) {
                S.dvCfg.placeholder = lead ? 'Chọn đơn vị ban hành...' : 'Chọn Lãnh đạo cấp cuối trước';
                S.dv.setDisabled(!lead);
                S.dv.set(S.bh.donVi, true);
                S.dv.refresh();
            }
            const vt = blk.querySelector('[data-bh="vt"]');
            if (vt) { const t = on && S.bh.donVi ? vanThuText(S.bh.donVi) : ''; vt.textContent = t ? 'Văn thư xử lý: ' + t : ''; vt.style.display = t ? '' : 'none'; }
            const dia = blk.querySelector('[data-bh="dia"]');
            if (dia && document.activeElement !== dia && dia.value !== S.bh.diaDanh) dia.value = S.bh.diaDanh;
            const rs = blk.querySelector('[data-bh="reset"]'); if (rs) rs.parentElement.style.display = (soNgayOn() || on) ? '' : 'none';
            paintPrev();
        }
        // ---- Ô Số, ô Ngày, ô Dấu trên văn bản: chỉ di chuyển, không đổi kích thước; không bắt buộc kéo ----
        function lastSig() { const n = S.levels.length; const l = S.levels[n - 1]; return (l && l.sig) || defSig(Math.max(0, n - 1), true); }
        function docDefaults() {
            let d = null;
            if (typeof cfg.docPos === 'function') { try { d = cfg.docPos(); } catch (e) { d = null; } }
            d = d || {};
            return { so: d.so || { x: 70, y: 112 }, ngay: d.ngay || { x: 420, y: 112 } };
        }
        // Ô Dấu mặc định trùm khoảng 1/3 bên trái ô ký cấp cuối
        const dauD = () => dauSizeOf(ddOn() ? S.bh.donVi : '');
        function dauDefault() { const s = lastSig(), d = dauD(); return { x: Math.max(10, Math.round(s.x + s.w / 3 - d)), y: Math.max(10, Math.round(s.y + s.h / 2 - d / 2)) }; }
        function posOf(k, defs) { const p = S.bh.viTri[k]; if (p) return p; return k === 'dau' ? dauDefault() : (defs || docDefaults())[k]; }
        // Tích Đóng dấu cơ quan: ô Số, ô Ngày, ô Dấu luôn hiển thị (chưa nhập: khung chờ mờ, nhãn "Văn thư điền khi ban hành");
        // không tích: ô Số, ô Ngày chỉ hiển thị khi đã nhập giá trị
        function renderBhBoxes() {
            const pg = page(); if (!pg) return;
            pg.querySelectorAll('.pc-bhbox').forEach(b => b.remove());
            if (!online()) return;
            if (getComputedStyle(pg).position === 'static') pg.style.position = 'relative';
            const on = ddOn(), sn = soNgayOn();
            const defs = docDefaults();
            const tag = on ? '<span class="pc-bh-tag">Văn thư điền khi ban hành</span>' : '';
            const add = (k, cls, html, minW) => {
                const p = posOf(k, defs);
                const box = document.createElement('div');
                box.className = 'pc-bhbox ' + cls;
                box.setAttribute('data-bh', k);
                box.title = 'Kéo để đặt vị trí';
                Object.assign(box.style, { left: p.x + 'px', top: p.y + 'px' });
                if (k === 'dau') Object.assign(box.style, { width: dauD() + 'px', height: dauD() + 'px' });
                else if (minW) box.style.minWidth = minW + 'px';
                box.innerHTML = html;
                box.addEventListener('mousedown', e => {
                    if (e.button !== 0) return;
                    e.preventDefault(); e.stopPropagation();
                    const r = box.getBoundingClientRect();
                    S.drag = { bh: k, box, ox: e.clientX - r.left, oy: e.clientY - r.top };
                });
                pg.appendChild(box);
            };
            if (sn) {
                const so = String(S.bh.so || '').trim();
                if (so || on) add('so', 'so' + (so ? '' : ' cho'), tag + esc('Số: ' + (so || '……')), defs.so.w || 0);
                const nc = ngayChu(S.bh.diaDanh, S.bh.ngay);
                if (nc || on) add('ngay', 'ngay' + (nc ? '' : ' cho'), tag + esc(nc || NGAY_CHO(S.bh.diaDanh)), defs.ngay.w || 0);
            }
            if (on) add('dau', 'dau', 'Dấu cơ quan');
        }
        function refreshBh() { syncBh(); updateBhUi(); renderBhBoxes(); }
        function setBanHanh(b) {
            applyBanHanh(b || {});
            const w = host(), blk = w && w.querySelector('[data-bh="blk"]');
            if (blk) {
                const so = blk.querySelector('[data-bh="so"]'); if (so) so.value = S.bh.so;
                const ng = blk.querySelector('[data-bh="ngay"]'); if (ng) { if (S.fp && ngayHopLe(S.bh.ngay)) S.fp.setDate(S.bh.ngay, false, 'd/m/Y'); ng.value = S.bh.ngay; }
                const dia = blk.querySelector('[data-bh="dia"]'); if (dia) dia.value = S.bh.diaDanh;
            }
            refreshBh();
        }
        function renderSigs() {
            const pg = page(); if (!pg) return;
            pg.querySelectorAll('.pc-sig').forEach(b => b.remove());
            const n = S.levels.length;
            S.levels.forEach((l, i) => {
                if (!l.sig) return;
                const box = document.createElement('div');
                box.className = 'pc-sig' + (i === n - 1 ? ' last' : '');
                box.setAttribute('data-i', i);
                Object.assign(box.style, { left: l.sig.x + 'px', top: l.sig.y + 'px', width: l.sig.w + 'px', height: l.sig.h + 'px', zIndex: 10 });
                box.innerHTML = `<div class="pc-sig-tags">${l.kyNhay ? '<span class="pc-tag">Ký nháy</span>' : ''}${l.kySo ? '<span class="pc-tag ks">Ký số</span>' : ''}</div><div class="pc-sig-name">${esc(sigTitle(S.levels, i))}</div><div class="sig-resize-handle"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>`;
                box.addEventListener('mousedown', e => {
                    if (e.button !== 0) return;
                    e.preventDefault(); e.stopPropagation();
                    const rs = e.target.closest('.sig-resize-handle');
                    const r = box.getBoundingClientRect();
                    S.drag = rs ? { i, box, mode: 'r', sx: e.clientX, sy: e.clientY, w: l.sig.w, h: l.sig.h } : { i, box, mode: 'm', ox: e.clientX - r.left, oy: e.clientY - r.top };
                });
                pg.appendChild(box);
            });
            refreshBh();
            if (typeof cfg.onChange === 'function') { try { cfg.onChange(S.levels); } catch (e) { /* bỏ qua */ } }
        }
        document.addEventListener('mousemove', e => {
            const d = S.drag; if (!d) return;
            const pg = page(); if (!pg) return;
            const pr = pg.getBoundingClientRect();
            // Ô Số, ô Ngày, ô Dấu: chỉ di chuyển, giữ trong phạm vi trang
            if (d.bh) {
                const x = Math.round(Math.max(4, Math.min(e.clientX - pr.left - d.ox, pg.clientWidth - d.box.offsetWidth - 4)));
                const y = Math.round(Math.max(4, Math.min(e.clientY - pr.top - d.oy, pg.clientHeight - d.box.offsetHeight - 4)));
                S.bh.viTri[d.bh] = { x, y };
                Object.assign(d.box.style, { left: x + 'px', top: y + 'px' });
                return;
            }
            const sig = S.levels[d.i] && S.levels[d.i].sig; if (!sig) return;
            if (d.mode === 'r') {
                sig.w = Math.max(140, Math.min(380, Math.round(d.w + e.clientX - d.sx)));
                sig.h = Math.max(50, Math.min(180, Math.round(d.h + e.clientY - d.sy)));
            } else {
                sig.x = Math.round(Math.max(10, Math.min(e.clientX - pr.left - d.ox, pg.clientWidth - d.box.offsetWidth - 10)));
                sig.y = Math.round(Math.max(10, Math.min(e.clientY - pr.top - d.oy, pg.clientHeight - d.box.offsetHeight - 10)));
            }
            Object.assign(d.box.style, { left: sig.x + 'px', top: sig.y + 'px', width: sig.w + 'px', height: sig.h + 'px' });
            // Ô Dấu đang ở vị trí mặc định: đi theo ô ký cấp cuối
            if (d.i === S.levels.length - 1 && !S.bh.viTri.dau) { const db = pg.querySelector('.pc-bhbox.dau'); if (db) { const p = dauDefault(); db.style.left = p.x + 'px'; db.style.top = p.y + 'px'; } }
        });
        document.addEventListener('mouseup', () => { S.drag = null; });
        // Kiểm tra lần lượt: cấp chưa chọn Lãnh đạo, ô ký bắt buộc chưa đặt (cấp cuối, cấp Ký nháy; Ký ngoài không cần ô ký),
        // Ngày văn bản sai định dạng, Đơn vị ban hành bắt buộc khi tích Đóng dấu cơ quan; báo lỗi tại chỗ
        function validate(opt) {
            const o = opt || {};
            const w = host(); if (!w) return false;
            const cards = w.querySelectorAll('.pc-lv');
            const needSig = o.sig !== false && online();
            let first = null;
            cards.forEach((card, i) => {
                const l = S.levels[i]; if (!l) return;
                const bad = !l.leader;
                card.querySelector('[data-err="leader"]').style.display = bad ? 'block' : 'none';
                if (S.combos[i]) S.combos[i].setInvalid(bad);
                if (bad && !first) first = card;
            });
            cards.forEach((card, i) => {
                const l = S.levels[i]; if (!l) return;
                const bad = needSig && sigRequired(l, i) && !l.sig;
                card.querySelector('[data-err="sig"]').style.display = bad ? 'block' : 'none';
                if (bad && !first) first = card;
            });
            const blk = online() ? w.querySelector('[data-bh="blk"]') : null;
            if (blk) {
                const ng = blk.querySelector('[data-bh="ngay"]'), ne = blk.querySelector('[data-err="ngay"]');
                if (ng) { const bad = !!S.bh.ngay && !ngayHopLe(S.bh.ngay); if (ne) ne.style.display = bad ? 'block' : 'none'; ng.classList.toggle('pc-invalid', bad); if (bad && !first) first = ng; }
                const badDv = ddOn() && !S.bh.donVi;
                const de = blk.querySelector('[data-err="dv"]'); if (de) de.style.display = badDv ? 'block' : 'none';
                if (S.dv) S.dv.setInvalid(badDv);
                if (badDv && !first) first = blk.querySelector('[data-bh="dvg"]');
            }
            if (first && first.scrollIntoView) first.scrollIntoView({ block: 'center' });
            return !first;
        }
        function collect() {
            const levels = S.levels.map((l, i, arr) => ({ leader: l.leader, kyNhay: !!l.kyNhay, kySo: i === arr.length - 1 ? true : !!l.kySo }));
            const pcSig = S.levels.map(l => (l.sig ? Object.assign({}, l.sig) : null));
            const dd = ddOn(), sn = soNgayOn();
            let banHanh = null;
            if (online()) {
                const defs = docDefaults();
                const cp = (p, w) => (p ? Object.assign({ x: p.x, y: p.y }, w ? { w } : {}) : null);
                const ngay = ngayHopLe(S.bh.ngay) ? String(S.bh.ngay).trim() : '';
                const dia = String(S.bh.diaDanh || '').trim();
                banHanh = {
                    soKyHieu: sn ? String(S.bh.so || '').trim() : '', diaDanh: dia, ngayVanBan: sn ? ngay : '', ngayChu: sn ? ngayChu(dia, ngay) : '',
                    dongDau: dd, donViBanHanh: dd ? S.bh.donVi : '', donViBanHanhTen: dd && S.bh.donVi ? WF.unitName(S.bh.donVi) : '', vanThu: dd && S.bh.donVi ? vanThuText(S.bh.donVi) : '',
                    viTri: { so: sn ? cp(posOf('so', defs), defs.so.w) : null, ngay: sn ? cp(posOf('ngay', defs), defs.ngay.w) : null, dau: dd ? Object.assign(cp(posOf('dau')), { d: dauD() }) : null }
                };
            }
            return { levels, pcSig, dongDau: dd, banHanh, assignees: levels.map(l => l.leader), path: levels.map(l => { const u = WF.getUser(l.leader); return u ? u.unitId : ''; }) };
        }
        reset(cfg.prev, undefined, cfg.banHanhPrev);
        return { reset, render, renderSigs, validate, collect, setBanHanh, refreshBanHanh: refreshBh, state: S, get levels() { return S.levels; } };
    }
    // ---- Bộ chuyển đổi cho phân hệ lưu phiếu trình riêng (Xem xét hoàn trả, Quyết định GQBT, Kinh phí):
    // levels cũ dạng [{ unitId, unit, kyNhay, kySo, leaders: [{ id, label }] }] + assignees + coords; bổ sung pcLevels / pcSig / tuThietLap
    function toLegacy(col) {
        const levels = col.levels.map((l, i) => ({ unitId: col.path[i], unit: WF.unitName(col.path[i]), kyNhay: !!l.kyNhay, kySo: !!l.kySo, leaders: [{ id: l.leader, label: WF.userLabel(l.leader) }] }));
        const coords = col.levels.map((l, i) => Object.assign({ level: i + 1, unitId: col.path[i], placed: !!col.pcSig[i] }, col.pcSig[i] || {}));
        return { levels, assignees: col.assignees.slice(), coords, enableNhay: !!col.levels[0].kyNhay, pcLevels: col.levels, pcSig: col.pcSig, tuThietLap: true, dongDau: !!col.dongDau, banHanh: col.banHanh || null };
    }
    // [dd4] Thông tin ban hành văn bản đã lưu của phiếu trình (trình lại): x = phiếu trình riêng / signDoc / rec.approval
    function prevBanHanhOf(x) { return x ? (x.banHanh || (x.signDoc && x.signDoc.banHanh) || (x.approval && x.approval.signDoc && x.approval.signDoc.banHanh) || null) : null; }
    function prevFromLegacy(st) {
        if (!st || !st.tuThietLap || !Array.isArray(st.pcLevels)) return null;
        return st.pcLevels.map((l, i) => Object.assign({}, l, { sig: (st.pcSig || [])[i] || null }));
    }
    // Cách ký của cấp hiện hành: "ký số" / "gán chữ ký nháy" / "gán chữ ký"
    function howText(st) { const l = st && st.tuThietLap ? (st.pcLevels || [])[st.level || 0] : null; return l ? (l.kySo ? 'ký số' : (l.kyNhay ? 'gán chữ ký nháy' : 'gán chữ ký')) : ''; }
    function decorateLegacy(st, mode, ctx) {
        if (!st || !st.tuThietLap || !Array.isArray(st.pcLevels)) return;
        const lv = Math.min(st.level || 0, st.pcLevels.length - 1);
        const approval = { levels: st.pcLevels, level: lv, steps: st.pcLevels.slice(0, lv).map(() => ({ action: 'Ký duyệt' })), path: (st.levels || []).map(l => l.unitId), signDoc: { pcSig: st.pcSig || [], dongDau: !!st.dongDau, banHanh: st.banHanh || null } };
        decorateDecision({ approval }, mode, ctx);
    }
    // Cán bộ trình của cơ quan rootId: tài khoản đang đăng nhập nếu thuộc cây đơn vị; ngược lại tài khoản không thuộc Nhóm Lãnh đạo đầu tiên của cơ quan (giả lập)
    function submitterFor(rootId) {
        const me = WF.getCurrentUserId(), u = WF.getUser(me);
        if (!rootId || (u && (WF.getRootId(u.unitId) || u.unitId) === rootId)) return me;
        const x = WF.usersInUnitTree(rootId).find(v => !isLeaderUser(v.id));
        return x ? x.id : me;
    }
    // Khối thiết lập cấp theo prefix (mỗi popup 01 khối): cfg như levelSetup
    const LEGACY_UI = {};
    function legacyUi(prefix, cfg) {
        if (!LEGACY_UI[prefix]) LEGACY_UI[prefix] = levelSetup(cfg);
        return LEGACY_UI[prefix];
    }
    // ---- Popup lưu Lãnh đạo từng cấp dạng mã tài khoản (st.levels = [{ unitId, leaders: [id] }], st.assignees, st.placed, st.coords):
    // gắn khối thiết lập cấp vào hostId / pageId; thu thập -> cập nhật st theo các cấp đã thiết lập
    function simpleMount(st, prefix, hostId, pageId, userId) {
        const first = !st.ui;
        st.ui = legacyUi(prefix, { host: () => document.getElementById(hostId), page: () => document.getElementById(pageId), method: () => 'Ký số', userId });
        if (first) st.ui.reset(st.prevLv || null, st.prevDongDau, st.prevBanHanh || null);
        st.ui.render(); st.ui.renderSigs();
        return true;
    }
    // null: không dùng khối thiết lập cấp; false: còn lỗi; col: các cấp đã thiết lập
    function simpleCollect(st) {
        if (!st || !st.ui) return null;
        if (!st.ui.validate()) return false;
        const col = st.ui.collect();
        st.assignees = col.assignees.slice();
        st.levels = col.path.map((u, i) => ({ unitId: u, leaders: [col.assignees[i]] }));
        st.placed = {}; st.coords = {};
        col.pcSig.forEach((s, i) => { if (s) { st.placed[i] = true; st.coords[i] = Object.assign({}, s); } });
        st.lvCol = col;
        return col;
    }
    // sign: dữ liệu lần trình đã lưu { tuThietLap, pcLevels, pcSig }
    function prevFromSign(s) { return s && s.tuThietLap && Array.isArray(s.pcLevels) ? s.pcLevels.map((l, i) => Object.assign({}, l, { sig: (s.pcSig || [])[i] || null })) : null; }
    function decorateSimple(a, s, mode, ctx) {
        if (!a || !s || !s.tuThietLap || !Array.isArray(s.pcLevels)) return;
        decorateDecision({ approval: { levels: s.pcLevels, level: a.level || 0, steps: (a.steps || []).slice(0, a.level || 0).map(() => ({ action: 'Ký duyệt' })), path: a.path || [], signDoc: { pcSig: s.pcSig || [], dongDau: !!s.dongDau, banHanh: s.banHanh || null } } }, mode, ctx);
    }
    function howOf(s, level) { const l = s && s.tuThietLap ? (s.pcLevels || [])[level] : null; return l ? (l.kySo ? 'ký số' : (l.kyNhay ? 'gán chữ ký nháy' : 'gán chữ ký')) : ''; }
    // Thiết lập đã lưu của phiếu trình (trình lại sau Bị trả lại): levels + vị trí ô ký
    function prevLevelsOf(approval) {
        const a = approval;
        if (!a || !a.tuThietLap || !Array.isArray(a.levels)) return null;
        const pc = (a.signDoc && a.signDoc.pcSig) || [];
        return a.levels.map((l, i) => Object.assign({}, l, { sig: pc[i] ? Object.assign({}, pc[i]) : null }));
    }

    // ---------------- Ký duyệt: ô ký theo các cấp tự thiết lập + khối Ký số / Gán chữ ký ----------------
    function sigTitle(levels, i) { const l = levels[i] || {}; return (i === levels.length - 1 ? 'Cấp cuối' : 'Cấp ' + (i + 1)) + (l.leader ? ' - ' + WF.userName(l.leader) : ''); }
    // [dd4] Thêm dòng vào khối "Thông tin tổng quan" của vùng phải (dòng mẫu: phần tử có 02 phần tử con nhãn - giá trị); không có khối: false
    function addSummaryRows(hostEl, rows) {
        if (!hostEl) return false;
        hostEl.querySelectorAll('.pc-bh-row').forEach(r => r.remove());
        const t = Array.from(hostEl.querySelectorAll('*')).find(e => e.children.length <= 1 && /^Thông tin tổng quan$/i.test((e.textContent || '').trim()));
        const box = t && t.parentElement;
        const tpl = box && Array.from(box.children).filter(c => c !== t && c.children.length === 2).pop();
        if (!tpl) return false;
        let after = tpl;
        rows.forEach(([k, v]) => {
            const r = tpl.cloneNode(false); r.classList.add('pc-bh-row');
            const c1 = tpl.children[0].cloneNode(false), c2 = tpl.children[1].cloneNode(false);
            c1.textContent = k;
            if (v === 'Chưa có') c2.innerHTML = '<i>Chưa có</i>'; else c2.textContent = v;
            r.appendChild(c1); r.appendChild(c2);
            after.parentNode.insertBefore(r, after.nextSibling);
            after = r;
        });
        return true;
    }
    // ctx (không bắt buộc): { page: trang A4 xem văn bản, scroller, right: vùng phải, before: phần tử chèn khối Ký số phía trước, title: tiêu đề popup }
    // Mặc định: popup Ký duyệt dùng chung (btnn_lanh_dao_actions.js)
    function decorateDecision(rec, mode, ctx) {
        ensureCss();
        const c0 = ctx || {};
        const a = rec.approval;
        const levels = a.levels || [];
        const pcSig = (a.signDoc && a.signDoc.pcSig) || [];
        // [dd4] Thông tin ban hành văn bản lưu cùng phiếu trình (signDoc.banHanh) và lựa chọn Đóng dấu cơ quan (signDoc.dongDau)
        const bh = (a.signDoc && a.signDoc.banHanh) || null;
        const dongDau = !!(a.signDoc && a.signDoc.dongDau);
        const page = c0.page !== undefined ? c0.page : document.querySelector('#ldDPreview .ld-a4');
        if (page) {
            if (getComputedStyle(page).position === 'static') page.style.position = 'relative';
            page.querySelectorAll('.ld-sigbox, .pc-bhbox').forEach(b => b.remove());
            // Ô Số, ô Ngày, ô Dấu theo vị trí cán bộ đặt khi trình
            drawBhView(page, bh, dongDau);
            levels.forEach((l, i) => {
                const c = pcSig[i];
                if (!c) return;
                const sOk = (a.steps || []).filter(s => /Ký duyệt|Phê duyệt/.test((s && (s.action || s.result)) || ''));
                const done = sOk[i] || null;
                const div = document.createElement('div');
                div.className = 'ld-sigbox' + (i === levels.length - 1 ? ' agency' : '') + (done ? ' done' : '') + (i === a.level && !done ? ' pc-cur' : '');
                Object.assign(div.style, { position: 'absolute', left: c.x + 'px', top: c.y + 'px', width: c.w + 'px', height: c.h + 'px', boxSizing: 'border-box', border: '2px dashed ' + (i === levels.length - 1 ? '#dc2626' : '#2563eb'), background: i === levels.length - 1 ? 'rgba(254,242,242,.9)' : 'rgba(239,246,255,.9)', borderRadius: '4px', fontSize: '11px', padding: '4px 6px' });
                const tags = (l.kyNhay ? '<span class="pc-tag">Ký nháy</span>' : '') + (l.kySo ? '<span class="pc-tag ks">Ký số</span>' : '');
                const doneTxt = done ? `<br><span style="color:#16a34a;">✔ ${l.kySo ? 'Đã ký số' : (l.kyNhay ? 'Đã gán chữ ký nháy' : 'Đã gán chữ ký')} ${esc(done.at || '')}</span>` : '';
                div.innerHTML = `<div style="float:right; display:flex; gap:3px;">${tags}</div><strong>${esc(sigTitle(levels, i))}</strong>${doneTxt}`;
                page.appendChild(div);
            });
            // Cuộn vùng xem văn bản tới ô ký của cấp đang ký duyệt
            const prv = c0.scroller || document.getElementById('ldDPreview');
            const cur = page.querySelector('.pc-cur');
            if (prv && cur) setTimeout(() => { prv.scrollTop = Math.max(0, cur.offsetTop + page.offsetTop - prv.clientHeight / 2); }, 50);
        }
        const blockHost = c0.right || document.getElementById('ldDRight');
        const old = blockHost && blockHost.querySelector('#pcKyBlock'); if (old) old.remove();
        const old2 = document.getElementById('pcKyBlock'); if (old2) old2.remove();
        if (blockHost) blockHost.querySelectorAll('.pc-bh-row').forEach(r => r.remove());
        if (mode === 'reject') return;
        const lv = a.level;
        const l = levels[lv] || {};
        const last = lv === levels.length - 1;
        const hasBox = !!pcSig[lv];
        const meU = WF.getUser(l.leader) || {};
        // [dd1] Phiếu trình tích "Đóng dấu cơ quan": cấp cuối Ký duyệt xong thì văn bản chuyển Văn thư đóng dấu, ban hành
        // [dd4] Không tích, có Số / Ngày: Ký duyệt thì hệ thống chèn số, ngày vào văn bản rồi ký số
        const coSoNgay = !!(bh && (String(bh.soKyHieu || '').trim() || bh.ngayVanBan));
        const nextTxt = last ? (dongDau ? 'chuyển Văn thư đóng dấu, ban hành văn bản' : 'ban hành văn bản theo Loại trình') : `chuyển ${WF.userName(levels[lv + 1].leader)} - ${WF.unitName(a.path[lv + 1])} (Cấp ${lv + 2 === levels.length ? 'cuối' : lv + 2})`;
        const block = document.createElement('div');
        block.id = 'pcKyBlock';
        const row = (k, v) => `<div class="pc-kyrow"><span>${k}</span><span>${v}</span></div>`;
        // Cấp cuối: dòng "Đóng dấu cơ quan"; phiếu trình tích thêm Đơn vị ban hành, Văn thư xử lý, Số / Ngày dự kiến - đặt ở khối Thông tin tổng quan
        // vùng phải; màn Ký duyệt của phân hệ không có khối Thông tin tổng quan thì đặt trong khối Ký số
        const sumRows = !last ? [] : [['Đóng dấu cơ quan', dongDau ? 'Có - sau khi Ký duyệt, văn bản chuyển Văn thư ban hành' : 'Không']].concat(dongDau && bh ? [
            ['Đơn vị ban hành', bh.donViBanHanhTen || (bh.donViBanHanh ? unitLabel(bh.donViBanHanh) : '--')],
            ['Văn thư xử lý', bh.vanThu || vanThuText(bh.donViBanHanh) || '--'],
            ['Số, ký hiệu dự kiến', String(bh.soKyHieu || '').trim() || 'Chưa có'],
            ['Ngày văn bản dự kiến', bh.ngayVanBan || 'Chưa có']] : []);
        const inSum = sumRows.length > 0 && addSummaryRows(blockHost, sumRows);
        const sumHtml = inSum || !sumRows.length ? '' : sumRows.map(r => row(esc(r[0]), r[1] === 'Chưa có' ? '<i>Chưa có</i>' : esc(r[1]))).join('');
        if (l.kySo) {
            block.className = 'pc-kyblock';
            block.innerHTML = `<div class="pc-kyblock-title"><i class="fa-solid fa-file-signature" style="color:#15803d;"></i> Ký số - ${esc(sigTitle(levels, lv))}</div>`
                + row('Chứng thư số', esc(`${meU.name || ''} - ${meU.title || ''} (chứng thư số của tài khoản)`))
                + row('Vị trí ký', hasBox ? `Ô ký ${esc(sigTitle(levels, lv))}${l.kyNhay ? ' (Ký nháy)' : ''} - Trang 1` : 'Không đặt ô ký trên văn bản')
                + sumHtml
                + (last && !dongDau && coSoNgay
                    ? `<div class="pc-hint" style="margin-top:6px;">Bấm <b>Ký duyệt</b>: hệ thống chèn số, ký hiệu và ngày văn bản vào văn bản, sau đó ký số văn bản bằng chứng thư số của Lãnh đạo${hasBox ? ' tại ô ký đã đặt' : ''} và ban hành văn bản theo Loại trình.</div>`
                    : `<div class="pc-hint" style="margin-top:6px;">Bấm <b>Ký duyệt</b>: hệ thống ký số văn bản bằng chứng thư số của Lãnh đạo${hasBox ? ' tại ô ký đã đặt' : ''}, sau đó ${esc(nextTxt)}.</div>`);
        } else {
            block.className = 'pc-kyblock nosign';
            block.innerHTML = `<div class="pc-kyblock-title"><i class="fa-solid fa-pen-nib" style="color:#1d4ed8;"></i> ${l.kyNhay ? 'Gán chữ ký nháy' : 'Gán chữ ký'} - ${esc(sigTitle(levels, lv))}</div>`
                + row('Vị trí ký', hasBox ? `Ô ký ${esc(sigTitle(levels, lv))} - Trang 1` : 'Không đặt ô ký trên văn bản')
                + `<div class="pc-hint" style="margin-top:6px;">Cấp này không ký số. Bấm <b>Ký duyệt</b>: ${hasBox ? `hệ thống gán ${l.kyNhay ? 'chữ ký nháy' : 'chữ ký'} của Lãnh đạo vào ô ký, ` : ''}${esc(nextTxt)}.</div>`;
        }
        const before = c0.before !== undefined ? c0.before : document.getElementById('ldDContext');
        if (blockHost) { if (before && before.parentNode === blockHost) blockHost.insertBefore(block, before); else blockHost.insertBefore(block, blockHost.firstChild); }
        const t = c0.title !== undefined ? c0.title : document.getElementById('ldDTitle');
        if (t) t.innerHTML += ` <span style="font-size:12px; font-weight:600; color:#64748b;">(${esc(sigTitle(levels, lv).split(' - ')[0])}/${levels.length} cấp)</span>`;
    }

    // ---------------- Ghi đè BTNN_LD ----------------
    function patchLd() {
        const LD = global.BTNN_LD;
        if (!LD || LD.__pckd) return;
        LD.__pckd = true;
        LD.isLeaderUser = isLeaderUser;
        const origActed = LD.leaderActedOn;
        LD.leaderActedOn = function (rec, userId, pattern) {
            const re = pattern && /Phân công cán bộ|Chuyển đơn vị/.test(pattern.source) ? new RegExp(pattern.source + '|^Phân công$|Chuyển chuyên viên phụ trách trực tiếp|Phân công phục hồi danh dự') : pattern;
            return origActed(rec, userId, re);
        };
        LD.openAssign = function (code, cb, opts) { return openAssign(code, cb, opts); };
        const origOpenDecision = LD.openDecision;
        LD.openDecision = function (code, mode, cb) {
            origOpenDecision(code, mode, cb);
            const rec = WF.getRecord(code);
            const ov = document.getElementById('ldDecideOverlay');
            if (isPilotApproval(rec) && ov && ov.classList.contains('open')) decorateDecision(rec, mode === 'reject' ? 'reject' : 'approve');
        };
    }
    patchLd();
    document.addEventListener('DOMContentLoaded', patchLd);

    // ---------------- Thanh Người dùng giả lập: nhóm tài khoản thí điểm ----------------
    const PILOT_USERS = ['oanhdh', 'khoiml', 'cuctruong', 'cucpho', 'cv_cuc1', 'tpbt', 'ptp_bt', 'canbonv', 'hatt',
        'gdso_hn', 'pgdso_hn', 'cv_so_hn1', 'tp_hctp_hn', 'pp_hctp_hn', 'cv_hn1', 'cv_hn2', 'ct_ubndhn'];
    const SHORT_UNIT = { 'BTP-01': 'Bộ', 'CĐK-01': 'Cục', 'PLN-02': 'Phòng BTNN (Cục)', 'STP-HN': 'Sở TP Hà Nội', 'STP-HN-HCTP': 'Phòng HCTP (Sở)', 'UBND-HN': 'UBND TP Hà Nội' };
    function enhanceSwitcher() {
        const sel = document.querySelector('#wfUserSwitcher select');
        if (!sel || sel.querySelector('optgroup[data-pc]')) return;
        const cur = WF.getCurrentUserId();
        const g = document.createElement('optgroup');
        g.label = 'Phân công - Trình ký (★ Nhóm Lãnh đạo)';
        g.setAttribute('data-pc', '1');
        g.innerHTML = PILOT_USERS.filter(id => WF.getUser(id)).map(id => { const u = WF.getUser(id); return `<option value="${esc(id)}">${isLeaderUser(id) ? '★ ' : ''}${esc(u.name)} - ${esc(u.title)} - ${esc(SHORT_UNIT[u.unitId] || WF.unitName(u.unitId))}</option>`; }).join('');
        sel.insertBefore(g, sel.firstChild);
        if (PILOT_USERS.includes(cur)) {
            sel.querySelectorAll('option').forEach(o => { o.selected = false; });
            const o = g.querySelector(`option[value="${cur}"]`); if (o) o.selected = true;
        }
        sel.style.maxWidth = '380px';
    }
    document.addEventListener('DOMContentLoaded', () => { setTimeout(enhanceSwitcher, 0); setTimeout(enhanceSwitcher, 400); });

    // ---------------- Trang Xác định CQGQBT: Bước 2 popup Trình ký - Thiết lập các cấp trình ký ----------------
    function initXdPage() {
        if (typeof global.xsGoStep2 !== 'function' || typeof global.openSignSubmitModal !== 'function' || typeof global.xsSubmit !== 'function') return;
        ensureCss();
        const X = { item: null, ui: null };
        const getItem = id => { try { return (typeof requestList !== 'undefined' ? requestList : []).find(r => r.id === id) || null; } catch (e) { return null; } };
        const curXs = () => { try { return xsState; } catch (e) { return null; } };

        // Lãnh đạo / Chuyên viên: Lãnh đạo theo Chức vụ; [ct1] Lãnh đạo không làm cán bộ chủ trì, Lãnh đạo được giao phối hợp vẫn thấy hồ sơ
        if (typeof global.isLeaderMe === 'function') global.isLeaderMe = function () { return isLeaderUser(WF.getCurrentUserId()); };
        if (typeof global.xdInTab === 'function') {
            const origInTab = global.xdInTab;
            global.xdInTab = function (tab, item) {
                const me = WF.getCurrentUserId();
                // Lãnh đạo được giao phối hợp: tab theo trạng thái hồ sơ như cán bộ chủ trì
                if (isLeaderUser(me) && item && WF.isPhoiHop(item, me) && !WF.canApprove(item, me)) {
                    try { return tab === 'pending' ? XD_PENDING_STATES.includes(item.status) : XD_DONE_STATES.includes(item.status); } catch (e) { /* bỏ qua */ }
                }
                return origInTab(tab, item);
            };
        }
        if (typeof global.isVisibleToMe === 'function') {
            const origVis = global.isVisibleToMe;
            global.isVisibleToMe = function (rec) {
                if (origVis(rec)) return true;
                if (!rec || rec.module !== 'XD' || [ST.CHO_PHAN_CONG, ST.DANG_PHAN_CONG].includes(rec.status) || !rec.approval) return false;
                const me = WF.getCurrentUserId();
                return (rec.approval.assignees || []).includes(me) || (rec.approval.steps || []).some(s => s.userId === me);
            };
        }
        function wrapEl() {
            let w = document.getElementById('pcLvWrap');
            if (!w) {
                const agency = document.getElementById('xsPanelAgencyCard');
                w = document.createElement('div');
                w.id = 'pcLvWrap';
                w.style.cssText = 'display:flex; flex-direction:column; gap:10px;';
                if (agency && agency.parentNode) agency.parentNode.appendChild(w);
            }
            return w;
        }
        // [dd4] Vị trí dòng "Số: ......" và dòng "......, ngày ... tháng ... năm ..." của văn bản trình ký (tọa độ trong trang A4 xsA4Page)
        function xdDocPos() {
            const pg = document.getElementById('xsA4Page');
            if (!pg || !pg.offsetWidth) return null;
            const pr = pg.getBoundingClientRect();
            const k = pr.width / pg.offsetWidth || 1;
            const leaf = re => Array.from(pg.querySelectorAll('div')).find(d => !d.closest('.pc-bhbox, .pc-sig, .sig-drag-box') && d.children.length === 0 && re.test((d.textContent || '').trim()));
            const at = el => {
                if (!el) return null;
                const r = document.createRange(); r.selectNodeContents(el);
                const b = r.getBoundingClientRect();
                return b.width ? { x: Math.round((b.left - pr.left) / k) - 9, y: Math.round((b.top - pr.top) / k) - 4, w: Math.round(b.width / k) + 18 } : null;
            };
            return { so: at(leaf(/^Số:/)), ngay: at(leaf(/ngày .+ tháng .+ năm/)) };
        }
        X.ui = levelSetup({
            host: wrapEl, page: () => document.getElementById('xsA4Page'), addId: 'pcAddLevel',
            // Popup trình Xác định CQGQBT không có trường số, ngày ở Bước 1: nhập Số, ký hiệu, Địa danh, Ngày văn bản ở Bước 2
            soNgay: true, docPos: xdDocPos,
            method: () => (curXs() || {}).method,
            onChange: levels => {
                // Dòng ký của văn bản theo Lãnh đạo cấp cuối; dòng đơn vị dưới tên cơ quan khi cấp cuối thuộc đơn vị trực thuộc của đơn vị tiếp nhận
                const lastL = levels[levels.length - 1];
                const u = lastL && WF.getUser(lastL.leader);
                const nm = document.getElementById('xsA4SignerName'); if (nm) nm.textContent = u ? u.name.toUpperCase() : '';
                const tt = document.getElementById('xsA4SignerTitle'); if (tt) tt.textContent = u ? u.title.toUpperCase() : '';
                const root = X.item && X.item.rootUnitId;
                const un = document.getElementById('xsA4Unit');
                if (un) un.textContent = u && root && u.unitId !== root && WF.getRootId(u.unitId) === root ? WF.unitName(u.unitId).toUpperCase() : '';
            }
        });

        const origOpen = global.openSignSubmitModal;
        global.openSignSubmitModal = function (id, kind) {
            origOpen.apply(this, arguments);
            const xs = curXs();
            if (!xs || xs.id !== id || xs.kind !== kind) return;
            const item = getItem(id);
            X.item = item;
            const a = item && item.approval;
            // Trình lại sau Bị trả lại: điền sẵn thiết lập lần trước, cho sửa
            const prev = item && item.status === ST.BI_TRA_LAI && a && a.kind === kind ? prevLevelsOf(a) : null;
            X.ui.reset(prev, prev && a.signDoc ? a.signDoc.dongDau : undefined, prev && a.signDoc ? a.signDoc.banHanh || null : null);
            const tab = document.querySelector('#xsStep2Tab span:last-child');
            if (tab) tab.textContent = 'Thiết lập các cấp trình ký';
            const old = document.getElementById('pcLvWrap'); if (old) old.innerHTML = '';
        };

        function hideLegacy() {
            ['xsPanelRoomCard', 'xsPanelMidCards', 'xsPanelAgencyCard', 'xsSigBoxRoom', 'xsSigBoxAgency', 'xsA4RoomSigPlaceholder'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
            document.querySelectorAll('#xsA4Page .xs-mid-sig').forEach(b => { b.style.display = 'none'; });
            const head = document.querySelector('#xsStep2Body .xs-side > div:first-child');
            if (head && !head.getAttribute('data-pc')) {
                head.setAttribute('data-pc', '1');
                head.innerHTML = '<div style="font-weight:700; color:#0f172a; font-size:14.5px; margin-bottom:4px;"><i class="fa-solid fa-layer-group" style="color:#2563eb;"></i> THIẾT LẬP CÁC CẤP TRÌNH KÝ</div>'
                    + '<div style="font-size:12px; color:#64748b;">Cấp 1 là cấp sát cán bộ trình; cấp cuối là cấp ký văn bản (bắt buộc Ký số). Ô ký bắt buộc ở cấp cuối và cấp có Ký nháy.</div>';
            }
        }
        const origStep2 = global.xsGoStep2;
        global.xsGoStep2 = function () {
            origStep2.apply(this, arguments);
            const xs = curXs();
            if (!xs || xs.step !== 2) return;
            hideLegacy();
            X.ui.render();
            X.ui.renderSigs();
        };

        const origSubmit = global.xsSubmit;
        global.xsSubmit = function (confirmed) {
            const xs = curXs();
            if (!xs || xs.method === 'Ký ngoài') return origSubmit.apply(this, arguments);
            xs.skipLeaders = true;
            const data = xsCollect();
            xs.skipLeaders = false;
            if (!data) return;
            if (!X.ui.validate()) return;
            const item = getItem(xs.id);
            if (!item) return;
            const isKq = xs.kind === XD_KIND.KQ;
            const procSnap = isKq ? applyXdProcDraft(item) : null;
            const col = X.ui.collect();
            const n = col.levels.length;
            // Tọa độ ô ký theo khóa cũ (room / l[i] / agency) để màn xem văn bản cũ vẫn đọc được
            const legacy = { room: { x: 60, y: 860, w: 220, h: 90 }, agency: { x: 480, y: 860, w: 245, h: 110 } };
            col.pcSig.forEach((s, i) => { if (!s) return; legacy[i === n - 1 ? 'agency' : (i === 0 ? 'room' : 'l' + i)] = Object.assign({}, s); });
            const signDoc = { method: 'Ký số', file: xs.file, enableRoomSig: !!col.pcSig[0] && n > 1, sigCoords: legacy, pcSig: col.pcSig, dongDau: col.dongDau, banHanh: col.banHanh };
            const keepId = xs.fileObj ? (xs.fileKeepId || (typeof tlktKeep === 'function' ? tlktKeep(xs.fileObj) : '')) : (xs.fileKeepId || '');
            Object.assign(signDoc, { fileKeepId: keepId, fileSize: xs.fileSize || '', fileNote: xs.fileNote || '' });
            if (typeof tlktGet === 'function') signDoc.attachments = tlktGet('xs');
            const res = submitLevels(item.code, data.kind, data.content || 'Kính trình Lãnh đạo xem xét, ký duyệt.', [{ name: xs.file }], { levels: col.levels, signDoc, reason: data.reason });
            if (!res.ok) { if (isKq) revertXdProcDraft(item, procSnap); showToast(res.message, 'error'); return; }
            try { xdProcDraft = null; } catch (e) { /* bỏ qua */ }
            if (data.kind === XD_KIND.YCBS) res.record.supplementReason = data.reason;
            if (data.kind === XD_KIND.KTL) res.record.ktlReason = data.reason;
            const h = (res.record.history || [])[res.record.history.length - 1];
            if (h && signDoc.attachments && signDoc.attachments.length) h.attachments = signDoc.attachments;
            WF.upsertRecord(res.record);
            closeXdModal('signSubmitModal');
            afterSubmitted(item.code, `Đã trình ký hồ sơ ${item.code} tới ${WF.userName(col.levels[0].leader)} (Cấp 1/${n}). Trạng thái: [Chờ duyệt] - Loại trình: ${data.kind}.`);
        };
    }
    // Ghi đè các hàm của trang Xác định CQGQBT ngay khi nạp (tệp nạp sau xac_dinh_co_quan_boi_thuong.js), chỉ 01 lần
    let xdInited = false;
    function initXdOnce() { if (xdInited || typeof global.xsGoStep2 !== 'function') return; xdInited = true; initXdPage(); }
    initXdOnce();
    document.addEventListener('DOMContentLoaded', initXdOnce);

    global.BTNN_PCKD = {
        laNhomLanhDao, isLeaderUser, leadersOfUnit, isLeaderOfUnit, usersOfUnit, parentOf, unitChainUp, childUnitsWithLeaders, signLeaderCandidates,
        canAssign: WF.canAssign, assignersOf: WF.assignersOf, assignToUnit, assignToOfficer, getRecallInfo: WF.getRecallInfo, recall: WF.recall, markViewed: WF.markViewed,
        receptionPendingItems: WF.receptionPendingItems, submitLevels, approve: WF.approve, isPilotApproval, openAssign, combo, label2, label3,
        levelSetup, prevLevelsOf, decorateDecision, sigTitle, ensureCss, toast,
        toLegacy, prevFromLegacy, howText, decorateLegacy, submitterFor, legacyUi, simpleMount, simpleCollect, prevFromSign, decorateSimple, howOf,
        // [dd4] Đơn vị ban hành, con dấu, Văn thư, ngày văn bản
        SEALS, sealsOf, vanThuOfSeal, vanThuText, isVanThuOfSeal, donViBanHanhList, diaDanhOf, ngayHopLe, ngayChu, prevBanHanhOf, drawBhView
    };
})(window);
