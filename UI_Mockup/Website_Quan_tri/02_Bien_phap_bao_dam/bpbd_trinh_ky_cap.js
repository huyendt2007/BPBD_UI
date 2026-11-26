/**
 * Trình ký nhiều cấp, Ký duyệt / Từ chối dùng chung - Module Biện pháp bảo đảm (Website Quản trị)
 * Theo SRS Ký duyệt hồ sơ (4.3.2.20): Quy tắc trình ký - phê duyệt, Thiết lập các cấp trình ký,
 * Màn hình Ký duyệt / Từ chối, Lịch sử trình ký, Từ chối và trình lại.
 * Cùng cách làm với Trình ký - Phê duyệt của phân hệ Bồi thường nhà nước; Biện pháp bảo đảm không có
 * khối Số, ký hiệu và ngày văn bản, khối Đóng dấu cơ quan (số, ngày của văn bản do hệ thống điền khi ký số).
 *
 * API: window.BpbdKy
 *   moThietLap(opts)      - Bước 2 popup trình ký: thiết lập các cấp trình ký (cán bộ trình)
 *   moKyDuyet(opts)       - Màn hình Ký duyệt / Từ chối (người ký ở cấp hiện hành)
 *   laNguoiKyHienHanh(key), capHienHanh(key), damBao(key, meta), ghiKyDuyet(key, yKien), ghiTuChoi(key, lyDo)
 *   lichSuHtml(key), lyDoTraLaiHtml(key, duPhong), ganChonNguoiDung(host, onChange), nguoiDung()
 * key: '<nghiệp vụ>:<mã hồ sơ>' (pdk, cctt, bs, cldk)
 */
(function () {
    'use strict';
    const STORE = 'bpbd_trinh_ky_v1';
    const USER = 'bpbd_ld_gia_lap_v1';
    const TT = 'Trung tâm Đăng ký giao dịch, tài sản tại TP. Hà Nội';
    const CUC = 'Cục Đăng ký giao dịch bảo đảm và Bồi thường nhà nước';
    // Nhóm Lãnh đạo của đơn vị người trình và đơn vị cấp trên (dữ liệu giả lập)
    const LANH_DAO = [
        { ten: 'Lê Hoàng Long', chucVu: 'Giám đốc', donVi: TT },
        { ten: 'Trần Thị Minh Nguyệt', chucVu: 'Phó Giám đốc', donVi: TT },
        { ten: 'Nguyễn Văn Lãnh Đạo', chucVu: 'Phó Giám đốc', donVi: TT },
        { ten: 'Phạm Minh Đức', chucVu: 'Cục trưởng', donVi: CUC },
        { ten: 'Hoàng Thị Lan', chucVu: 'Phó Cục trưởng', donVi: CUC }
    ];
    const MAC_DINH = 'Nguyễn Văn Lãnh Đạo';
    const CAN_BO = { ten: 'Nguyễn Văn Cán Bộ', chucVu: 'Chuyên viên', donVi: TT };
    const MSG = {
        VAL_001: 'Đây là trường bắt buộc',                                                                        // [MSG-ERR-VAL-001]
        DK_005: 'Hồ sơ đã được thay đổi trạng thái xử lý, không thể thực hiện thao tác lúc này. Vui lòng tải lại trang.', // [MSG-ERR-DK-005]
        DK_011: 'Thiết bị/tài khoản ký số chưa sẵn sàng hoặc chưa nhận chứng thư số hợp lệ.',                    // [MSG-ERR-DK-011]
        DK_013: 'Ký số không thành công. Vui lòng kiểm tra thiết bị ký số và thử lại.',                            // [MSG-ERR-DK-013]
        CHUA_DAT: 'Chưa đặt chữ ký'
    };
    const SIGN_METHODS = ['USB Token Ban Cơ yếu Chính phủ', 'SIM ký số', 'Ký số từ xa (HSM / Cloud CA)'];
    const PAGE_W = 620, PAGE_H = 877;
    const SIZES = { nho: [150, 60], vua: [200, 90], lon: [250, 110] };

    const esc = v => String(v ?? '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    const pad = n => String(n).padStart(2, '0');
    const now = () => { const d = new Date(); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
    const byName = ten => LANH_DAO.find(l => l.ten === ten);
    const nhan = ten => { const l = byName(ten); return l ? `${l.ten} - ${l.chucVu} - ${l.donVi}` : (ten || ''); };
    const viTat = ten => String(ten || '?').trim().split(/\s+/).slice(-2).map(x => x[0]).join('').toUpperCase();

    // ------------------------------------------------------------------ Lưu trữ
    function all() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
    function saveAll(s) { try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) { /* bỏ qua khi bộ nhớ đầy */ } }
    function get(key) { return all()[key] || null; }
    function put(key, r) { const s = all(); s[key] = r; saveAll(s); }

    function nguoiDung() { try { return sessionStorage.getItem(USER) || MAC_DINH; } catch (e) { return MAC_DINH; } }
    function datNguoiDung(ten) { try { sessionStorage.setItem(USER, ten); } catch (e) { /* bỏ qua */ } }

    // Hồ sơ trình trước khi có luồng nhiều cấp: coi là 01 cấp, người ký là Lãnh đạo mặc định của dữ liệu giả lập
    function damBao(key, meta) {
        let r = get(key);
        if (r) return r;
        const m = meta || {};
        r = {
            loaiTrinh: m.loaiTrinh || '', tenTep: m.tenTep || '', coVanBan: m.coVanBan !== false,
            levels: [{ leader: MAC_DINH, kyNhay: false, kySo: m.coVanBan !== false, sig: null }],
            level: 0, nguoiTrinh: m.nguoiTrinh || CAN_BO.ten, thoiDiemTrinh: m.thoiDiemTrinh || now(), noiDung: '',
            lichSu: [{ nguoi: m.nguoiTrinh || CAN_BO.ten, moTa: `${CAN_BO.chucVu} - ${CAN_BO.donVi}`, thoiDiem: m.thoiDiemTrinh || now(), hanhDong: `Trình ký đến ${MAC_DINH}`, noiDung: '', loai: 'trinh' }],
            traLaiDs: [], trangThai: 'cho', luot: 1
        };
        put(key, r);
        return r;
    }

    function laNguoiKyHienHanh(key) {
        const r = get(key);
        if (!r) return nguoiDung() === MAC_DINH;
        if (r.trangThai !== 'cho') return false;
        const lv = r.levels[r.level];
        return !!lv && lv.leader === nguoiDung();
    }

    function capHienHanh(key) {
        const r = get(key);
        if (!r) return { idx: 0, tong: 1, laCuoi: true, kySo: true, kyNhay: false, leader: MAC_DINH };
        const lv = r.levels[r.level] || {};
        return { idx: r.level, tong: r.levels.length, laCuoi: r.level === r.levels.length - 1, kySo: !!lv.kySo, kyNhay: !!lv.kyNhay, leader: lv.leader };
    }

    function luuTrinh(key, route, meta) {
        const old = get(key);
        const lichSu = old ? (old.lichSu || []) : [];
        const t = now();
        lichSu.push({ nguoi: CAN_BO.ten, moTa: `${CAN_BO.chucVu} - ${CAN_BO.donVi}`, thoiDiem: t, hanhDong: `Trình ký đến ${route.levels[0].leader}`, noiDung: route.noiDung || '', loai: 'trinh' });
        put(key, {
            loaiTrinh: meta.loaiTrinh || '', tenTep: meta.tenTep || '', coVanBan: meta.coVanBan !== false,
            levels: route.levels.map(l => ({ leader: l.leader, kyNhay: !!l.kyNhay, kySo: !!l.kySo, sig: l.sig ? { ...l.sig } : null })),
            level: 0, nguoiTrinh: CAN_BO.ten, thoiDiemTrinh: t, noiDung: route.noiDung || '',
            lichSu, traLaiDs: old ? (old.traLaiDs || []) : [], trangThai: 'cho', luot: old ? (old.luot || 1) + 1 : 1
        });
    }

    function ghiKyDuyet(key, yKien) {
        const r = get(key) || damBao(key);
        const i = r.level, lv = r.levels[i];
        const laCuoi = i === r.levels.length - 1;
        const t = now(), u = byName(nguoiDung());
        lv.daKy = t; lv.yKien = yKien || '';
        r.lichSu.push({ nguoi: nguoiDung(), moTa: u ? `${u.chucVu} - ${u.donVi}` : '', thoiDiem: t, hanhDong: laCuoi ? 'Ký duyệt' : `Ký duyệt và chuyển xử lý đến ${r.levels[i + 1].leader}`, noiDung: yKien || '', loai: 'duyet' });
        if (laCuoi) r.trangThai = 'xong'; else r.level = i + 1;
        put(key, r);
        return { laCuoi, nguoiTiep: laCuoi ? '' : r.levels[i + 1].leader, kySo: !!lv.kySo, cap: i + 1 };
    }

    function ghiTuChoi(key, lyDo) {
        const r = get(key) || damBao(key);
        const t = now(), u = byName(nguoiDung());
        r.traLaiDs = r.traLaiDs || [];
        r.traLaiDs.push({ lyDo, nguoi: nguoiDung(), thoiDiem: t });
        r.lichSu.push({ nguoi: nguoiDung(), moTa: u ? `${u.chucVu} - ${u.donVi}` : '', thoiDiem: t, hanhDong: 'Từ chối - trả lại cán bộ trình', noiDung: lyDo, loai: 'tuchoi' });
        r.trangThai = 'tralai';
        r.levels.forEach(l => { delete l.daKy; });
        put(key, r);
        return { nguoi: nguoiDung(), thoiDiem: t };
    }

    // ------------------------------------------------------------------ Giao diện chung
    function injectCss() {
        if (document.getElementById('bk-style')) return;
        const st = document.createElement('style');
        st.id = 'bk-style';
        st.textContent = `
        .bk-ov{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:12000;display:flex;align-items:stretch;justify-content:center;font-family:inherit;color:#0f172a;font-size:13.5px}
        .bk-ov.bk-ld{z-index:1500}
        .bk-full{background:#fff;display:flex;flex-direction:column;width:100%;height:100%}
        .bk-box{background:#fff;display:flex;flex-direction:column;width:min(720px,96vw);max-height:92vh;margin:auto;border-radius:10px;overflow:hidden;box-shadow:0 20px 50px rgba(15,23,42,.3)}
        .bk-head{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #e2e8f0;background:#fff}
        .bk-head h3{margin:0;font-size:16px;color:#1e3a8a}
        .bk-x{border:none;background:none;font-size:22px;color:#64748b;cursor:pointer;line-height:1}
        .bk-steps{display:flex;align-items:center;gap:10px;padding:8px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:12.5px;color:#64748b}
        .bk-step{display:inline-flex;align-items:center;gap:6px}.bk-step b{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#e2e8f0;color:#475569;font-size:12px}
        .bk-step.on{color:#1e3a8a;font-weight:700}.bk-step.on b{background:#1e3a8a;color:#fff}.bk-step.done b{background:#16a34a;color:#fff}
        .bk-line{flex:0 0 40px;height:2px;background:#cbd5e1}
        .bk-main{flex:1;display:flex;min-height:0}
        .bk-doc{flex:1;background:#e2e8f0;overflow:auto;padding:14px 18px;min-width:0}
        .bk-doc-bar{display:flex;justify-content:space-between;align-items:center;margin:0 auto 8px;width:${PAGE_W}px;font-size:12.5px;color:#334155}
        .bk-page{position:relative;width:${PAGE_W}px;height:${PAGE_H}px;margin:0 auto;background:#fff;box-shadow:0 4px 14px rgba(15,23,42,.18);font-family:'Times New Roman',serif;font-size:13px;color:#111;overflow:hidden}
        .bk-page .pg-in{padding:38px 46px}
        .bk-pg-head{display:flex;justify-content:space-between;text-align:center;font-weight:bold;font-size:12px;line-height:1.45}
        .bk-pg-title{text-align:center;font-weight:bold;font-size:15px;margin:26px 0 6px}
        .bk-pg-sub{text-align:center;font-style:italic;margin-bottom:16px}
        .bk-pg-l{height:9px;background:#e5e7eb;border-radius:3px;margin:9px 0}
        .bk-pg-sign{position:absolute;right:46px;top:640px;width:230px;text-align:center;font-weight:bold;font-size:12.5px}
        .bk-sig{position:absolute;border:2px dashed #2563eb;background:rgba(239,246,255,.92);border-radius:4px;font-family:Arial,sans-serif;font-size:11px;color:#1e3a8a;padding:4px 6px;box-sizing:border-box;cursor:move;user-select:none;overflow:hidden}
        .bk-sig.nhay{border-color:#9333ea;color:#6b21a8;background:rgba(250,245,255,.92)}
        .bk-sig.done{border-style:solid;border-color:#16a34a;color:#166534;background:rgba(240,253,244,.95)}
        .bk-sig.ro{cursor:default}
        .bk-sig .x{position:absolute;top:1px;right:3px;cursor:pointer;color:#dc2626;font-weight:bold;font-size:13px}
        .bk-sig .rs{position:absolute;right:0;bottom:0;width:12px;height:12px;cursor:nwse-resize;background:linear-gradient(135deg,transparent 50%,#2563eb 50%)}
        .bk-sig .tag{display:inline-block;margin-top:2px;padding:0 5px;border-radius:8px;background:#9333ea;color:#fff;font-size:10px}
        .bk-side{width:440px;flex:0 0 440px;border-left:1px solid #e2e8f0;overflow:auto;padding:14px 18px;background:#fff}
        .bk-side.solo{width:auto;flex:1;border-left:none}
        .bk-sec{font-weight:700;color:#1e3a8a;font-size:13px;letter-spacing:.2px;margin:4px 0 8px;text-transform:uppercase}
        .bk-note{font-size:12px;color:#64748b;margin:0 0 10px}
        .bk-lv{border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;margin-bottom:10px;background:#f8fafc}
        .bk-lv-h{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px}
        .bk-lv-h b{color:#1e3a8a}.bk-lv-h .dv{color:#475569;font-size:12px}
        .bk-tg{font-size:10.5px;padding:1px 7px;border-radius:9px;background:#dbeafe;color:#1d4ed8;font-weight:600}
        .bk-tg.cuoi{background:#fee2e2;color:#b91c1c}.bk-tg.nhay{background:#f3e8ff;color:#7e22ce}.bk-tg.so{background:#dcfce7;color:#15803d}
        .bk-tools{margin-left:auto;display:flex;gap:4px}
        .bk-ib{border:1px solid #cbd5e1;background:#fff;border-radius:5px;width:26px;height:24px;cursor:pointer;color:#334155;font-size:12px}
        .bk-ib:hover{background:#eff6ff}
        .bk-f{margin-bottom:8px}.bk-f label{display:block;font-weight:600;margin-bottom:4px;font-size:12.5px}.bk-req{color:#dc2626}
        .bk-in{width:100%;box-sizing:border-box;border:1px solid #cbd5e1;border-radius:6px;padding:7px 9px;font-size:13px;font-family:inherit;background:#fff}
        .bk-in.bad{border-color:#dc2626;box-shadow:0 0 0 2px rgba(220,38,38,.12)}
        .bk-err{color:#dc2626;font-size:12px;margin-top:3px}
        .bk-row{display:flex;align-items:center;gap:8px;margin:6px 0}
        .bk-sw{position:relative;display:inline-block;width:36px;height:20px;flex:0 0 36px}.bk-sw input{opacity:0;width:0;height:0}
        .bk-sw span{position:absolute;inset:0;background:#cbd5e1;border-radius:20px;transition:.2s;cursor:pointer}
        .bk-sw span:before{content:'';position:absolute;width:16px;height:16px;left:2px;top:2px;background:#fff;border-radius:50%;transition:.2s}
        .bk-sw input:checked+span{background:#16a34a}.bk-sw input:checked+span:before{transform:translateX(16px)}
        .bk-sw input:disabled+span{opacity:.6;cursor:not-allowed}
        .bk-sub{font-size:11.5px;color:#64748b}
        .bk-btn{padding:7px 14px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;font-weight:600;font-size:13px;display:inline-flex;align-items:center;gap:6px;font-family:inherit}
        .bk-btn.sm{padding:4px 9px;font-size:12px}
        .bk-btn.pri{background:#1e3a8a;border-color:#1e3a8a;color:#fff}.bk-btn.dan{background:#dc2626;border-color:#dc2626;color:#fff}
        .bk-btn.out{border-color:#1e3a8a;color:#1e3a8a}
        .bk-foot{display:flex;justify-content:flex-end;gap:10px;padding:12px 20px;border-top:1px solid #e2e8f0;background:#fff}
        .bk-kv{display:grid;grid-template-columns:150px 1fr;gap:6px 10px;margin-bottom:12px}.bk-kv div:nth-child(odd){color:#64748b}
        .bk-card{border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;margin-bottom:12px}
        .bk-hist{list-style:none;margin:0;padding:0}
        .bk-hist li{display:flex;gap:10px;padding:8px 0;border-bottom:1px dashed #e2e8f0}
        .bk-av{width:30px;height:30px;flex:0 0 30px;border-radius:50%;background:#1e3a8a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}
        .bk-av.cho{background:#f59e0b}.bk-av.tuchoi{background:#dc2626}.bk-av.chua{background:#cbd5e1;color:#475569}
        .bk-hist .nd{margin-top:4px;background:#f8fafc;border-left:3px solid #94a3b8;padding:4px 8px;font-size:12.5px}
        .bk-alert{border:1px solid #fca5a5;border-left:4px solid #dc2626;background:#fef2f2;border-radius:8px;padding:10px 14px;margin-bottom:12px}
        .bk-alert .t{font-weight:700;color:#b91c1c;margin-bottom:6px}
        .bk-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11.5px;font-weight:600;background:#e2e8f0;color:#334155}
        .bk-badge.ok{background:#dcfce7;color:#15803d}.bk-badge.bad{background:#fee2e2;color:#b91c1c}
        .bk-toast{position:fixed;top:18px;right:18px;z-index:13000;display:flex;flex-direction:column;gap:8px;max-width:420px}
        .bk-toast div{background:#fff;border:1px solid;border-left-width:4px;border-radius:6px;padding:10px 14px;box-shadow:0 6px 16px rgba(0,0,0,.12);font-size:13.5px}
        .bk-paper{display:flex;align-items:center;justify-content:center;height:100%;color:#475569;text-align:center;padding:40px}
        .bk-user{display:inline-flex;align-items:center;gap:8px;font-size:13px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:6px 10px;margin:0 0 10px}
        .bk-user select{border:1px solid #cbd5e1;border-radius:6px;padding:4px 8px;font-size:13px;font-family:inherit}
        .bk-auth{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:2300;display:flex;align-items:center;justify-content:center}
        `;
        document.head.appendChild(st);
    }

    function toast(message, type) {
        injectCss();
        let box = document.querySelector('.bk-toast');
        if (!box) { box = document.createElement('div'); box.className = 'bk-toast'; document.body.appendChild(box); }
        const c = { success: '#059669', error: '#dc2626', warning: '#d97706', info: '#2563eb' }[type || 'success'] || '#059669';
        const t = document.createElement('div');
        t.style.borderColor = c; t.style.borderLeftColor = c;
        t.textContent = message;
        box.appendChild(t);
        setTimeout(() => t.remove(), 4500);
    }

    // Trang văn bản trình ký (mô phỏng 01 trang A4) để đặt và hiển thị ô ký
    function trangHtml(o) {
        const lines = Array.from({ length: 22 }, (_, i) => `<div class="bk-pg-l" style="width:${[96, 88, 92, 70, 95, 84, 90, 60][i % 8]}%"></div>`).join('');
        return `<div class="pg-in">
            <div class="bk-pg-head"><div>CỤC ĐĂNG KÝ GIAO DỊCH BẢO ĐẢM<br>VÀ BỒI THƯỜNG NHÀ NƯỚC<br><u>TRUNG TÂM ĐĂNG KÝ GIAO DỊCH, TÀI SẢN</u></div><div>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br><u>Độc lập - Tự do - Hạnh phúc</u></div></div>
            <div class="bk-pg-title">${esc((o.tieuDeVanBan || o.loaiTrinh || 'VĂN BẢN TRÌNH KÝ').toUpperCase())}</div>
            <div class="bk-pg-sub">${esc(o.dongPhu || '')}</div>${lines}</div>
            <div class="bk-pg-sign">NGƯỜI CÓ THẨM QUYỀN<br><span style="font-weight:normal;font-style:italic">(Ký số, ghi rõ họ tên, chức danh)</span></div>`;
    }
    const defSig = (i, n) => i === n - 1 ? { x: 370, y: 690, w: 200, h: 90 } : { x: 40 + (i % 3) * 140, y: 790, w: 130, h: 56 };

    // ------------------------------------------------------------------ Bước 2 - Thiết lập các cấp trình ký
    function moThietLap(opts) {
        injectCss();
        const o = opts || {};
        const coVanBan = o.coVanBan !== false;
        const prev = o.keys && o.keys.length ? get(o.keys[0]) : null;
        const dungLai = prev && prev.trangThai === 'tralai';
        const S = {
            levels: dungLai ? prev.levels.map(l => ({ leader: byName(l.leader) ? l.leader : '', kyNhay: !!l.kyNhay, kySoChon: !!l.kySo, sig: coVanBan && l.sig ? { ...l.sig } : null }))
                : [{ leader: '', kyNhay: false, kySoChon: false, sig: null }],
            noiDung: dungLai ? (prev.noiDung || '') : '', loi: {}
        };
        const ov = document.createElement('div');
        ov.className = 'bk-ov';
        ov.id = 'bkSetup';
        ov.innerHTML = `<div class="${coVanBan ? 'bk-full' : 'bk-box'}">
            <div class="bk-head"><h3>${esc(o.tieuDe || 'Trình ký')}</h3><button class="bk-x" data-a="back" title="Quay lại">&times;</button></div>
            <div class="bk-steps"><span class="bk-step done"><b>✓</b>Nhập thông tin</span><span class="bk-line"></span><span class="bk-step on"><b>2</b>Thiết lập các cấp trình ký</span>
                ${o.keys && o.keys.length > 1 ? `<span style="margin-left:auto">Áp dụng cùng thiết lập cho <b>${o.keys.length}</b> hồ sơ</span>` : ''}</div>
            <div class="bk-main">
                ${coVanBan ? `<div class="bk-doc"><div class="bk-doc-bar"><span><i class="fa-regular fa-file-pdf" style="color:#dc2626"></i> <b>${esc(o.tenTep || 'Van_ban_trinh_ky.pdf')}</b> · 1 trang</span><span style="color:#64748b">Văn bản trình ký (chỉ xem)</span></div><div class="bk-page" id="bkPage">${trangHtml(o)}</div></div>` : ''}
                <div class="bk-side ${coVanBan ? '' : 'solo'}">
                    <div class="bk-sec">${coVanBan ? 'Thiết lập vị trí &amp; kích thước chữ ký' : 'Thiết lập các cấp trình ký'}</div>
                    ${coVanBan ? '<div class="bk-note">Kéo thẻ chữ ký vào vị trí và dùng góc dưới phải để kéo to/nhỏ khung chữ ký.</div>' : ''}
                    <div id="bkLevels"></div>
                    <button type="button" class="bk-btn out" data-a="add"><i class="fa-solid fa-plus"></i> Thêm cấp</button>
                    ${coVanBan ? '<div class="bk-note" style="margin-top:8px">Bấm Đặt chữ ký để sinh ô ký của cấp đó trên văn bản; kéo ô để đặt vị trí, kéo góc dưới phải để đổi kích thước.</div>' : ''}
                    <div class="bk-f" style="margin-top:12px"><label>Nội dung trình</label><textarea class="bk-in" id="bkNoiDung" rows="3" maxlength="2000" placeholder="Nhập nội dung trình Lãnh đạo...">${esc(S.noiDung)}</textarea></div>
                </div>
            </div>
            <div class="bk-foot"><button class="bk-btn" data-a="back"><i class="fa-solid fa-arrow-left"></i> Quay lại</button><button class="bk-btn pri" data-a="submit"><i class="fa-solid fa-paper-plane"></i> Trình Lãnh đạo</button></div>
        </div>`;
        document.body.appendChild(ov);
        const page = ov.querySelector('#bkPage');
        const host = ov.querySelector('#bkLevels');

        const n = () => S.levels.length;
        const kySoOf = i => i === n() - 1 ? true : !!S.levels[i].kySoChon;
        const chosen = i => S.levels.filter((l, j) => j !== i && l.leader).map(l => l.leader);

        function render() {
            host.innerHTML = S.levels.map((l, i) => {
                const last = i === n() - 1, ld = byName(l.leader);
                const opts2 = LANH_DAO.filter(x => !chosen(i).includes(x.ten)).map(x => `<option value="${esc(x.ten)}" ${x.ten === l.leader ? 'selected' : ''}>${esc(nhan(x.ten))}</option>`).join('');
                return `<div class="bk-lv" data-i="${i}">
                    <div class="bk-lv-h"><b>Cấp ${i + 1}</b>${ld ? `<span class="dv">- ${esc(ld.donVi)}</span>` : ''}
                        ${last ? '<span class="bk-tg cuoi">Cấp cuối</span>' : ''}${coVanBan && l.kyNhay ? '<span class="bk-tg nhay">Ký nháy</span>' : ''}${coVanBan && kySoOf(i) ? '<span class="bk-tg so">Ký số</span>' : ''}
                        <span class="bk-tools">${i > 0 ? `<button class="bk-ib" data-a="up" data-i="${i}" title="Lên"><i class="fa-solid fa-arrow-up"></i></button>` : ''}${!last ? `<button class="bk-ib" data-a="down" data-i="${i}" title="Xuống"><i class="fa-solid fa-arrow-down"></i></button>` : ''}${n() > 1 ? `<button class="bk-ib" data-a="del" data-i="${i}" title="Xóa cấp" style="color:#dc2626"><i class="fa-solid fa-trash"></i></button>` : ''}</span></div>
                    <div class="bk-f"><label>Lãnh đạo <span class="bk-req">*</span></label>
                        <select class="bk-in ${S.loi['ld' + i] ? 'bad' : ''}" data-f="leader" data-i="${i}"><option value="">-- Chọn Lãnh đạo --</option>${opts2}</select>
                        ${S.loi['ld' + i] ? `<div class="bk-err">${MSG.VAL_001}</div>` : ''}</div>
                    ${coVanBan ? `<label class="bk-row" style="cursor:pointer"><input type="checkbox" data-f="kyNhay" data-i="${i}" ${l.kyNhay ? 'checked' : ''}> Ký nháy</label>
                    <div class="bk-row"><label class="bk-sw"><input type="checkbox" data-f="kySo" data-i="${i}" ${kySoOf(i) ? 'checked' : ''} ${last ? 'disabled' : ''}><span></span></label><div><b>Ký số</b><div class="bk-sub">Lãnh đạo cấp này ký số văn bản khi Ký duyệt</div></div></div>
                    ${l.sig ? `<div class="bk-row" style="flex-wrap:wrap"><span class="bk-sub">Tọa độ: (${Math.round(l.sig.x)}, ${Math.round(l.sig.y)})</span>
                        <button class="bk-btn sm" data-a="size" data-s="nho" data-i="${i}">Nhỏ</button><button class="bk-btn sm" data-a="size" data-s="vua" data-i="${i}">Vừa</button><button class="bk-btn sm" data-a="size" data-s="lon" data-i="${i}">Lớn</button><button class="bk-btn sm" data-a="reset" data-i="${i}">Đặt lại</button></div>`
                        : `<button class="bk-btn sm out" data-a="sig" data-i="${i}"><i class="fa-solid fa-signature"></i> Đặt chữ ký</button>${S.loi['sig' + i] ? `<div class="bk-err">${MSG.CHUA_DAT}</div>` : ''}`}` : ''}
                </div>`;
            }).join('');
            renderSigs();
        }

        function renderSigs() {
            if (!page) return;
            page.querySelectorAll('.bk-sig').forEach(e => e.remove());
            S.levels.forEach((l, i) => {
                if (!l.sig) return;
                const last = i === n() - 1;
                const d = document.createElement('div');
                d.className = 'bk-sig' + (l.kyNhay ? ' nhay' : '');
                d.style.cssText = `left:${l.sig.x}px;top:${l.sig.y}px;width:${l.sig.w}px;height:${l.sig.h}px`;
                d.innerHTML = `<b>${last ? 'Cấp cuối' : 'Cấp ' + (i + 1)}${l.leader ? ' - ' + esc(l.leader) : ''}</b>${l.kyNhay ? '<br><span class="tag">Ký nháy</span>' : ''}<br><span style="color:#64748b">(${Math.round(l.sig.x)}, ${Math.round(l.sig.y)})</span><span class="x" title="Xóa ô ký">×</span><span class="rs"></span>`;
                d.querySelector('.x').addEventListener('mousedown', ev => { ev.stopPropagation(); l.sig = null; render(); });
                keo(d, l, ev => ev.target.classList.contains('rs'));
                page.appendChild(d);
            });
        }

        function keo(el, l, isResize) {
            el.addEventListener('mousedown', ev => {
                if (ev.target.classList.contains('x')) return;
                ev.preventDefault();
                const rs = isResize(ev), sx = ev.clientX, sy = ev.clientY, b = { ...l.sig };
                const mv = e => {
                    const dx = e.clientX - sx, dy = e.clientY - sy;
                    if (rs) { l.sig.w = Math.max(70, Math.min(PAGE_W - b.x, b.w + dx)); l.sig.h = Math.max(36, Math.min(PAGE_H - b.y, b.h + dy)); }
                    else { l.sig.x = Math.max(0, Math.min(PAGE_W - b.w, b.x + dx)); l.sig.y = Math.max(0, Math.min(PAGE_H - b.h, b.y + dy)); }
                    el.style.left = l.sig.x + 'px'; el.style.top = l.sig.y + 'px'; el.style.width = l.sig.w + 'px'; el.style.height = l.sig.h + 'px';
                };
                const up = () => { document.removeEventListener('mousemove', mv); document.removeEventListener('mouseup', up); render(); };
                document.addEventListener('mousemove', mv);
                document.addEventListener('mouseup', up);
            });
        }

        const close = () => ov.remove();
        ov.addEventListener('change', e => {
            const f = e.target.dataset.f, i = +e.target.dataset.i;
            if (!f) return;
            const l = S.levels[i];
            if (f === 'leader') { l.leader = e.target.value; if (l.leader) delete S.loi['ld' + i]; }
            if (f === 'kyNhay') l.kyNhay = e.target.checked;
            if (f === 'kySo') l.kySoChon = e.target.checked;
            render();
        });
        ov.addEventListener('click', e => {
            const b = e.target.closest('[data-a]');
            if (!b) return;
            const a = b.dataset.a, i = +b.dataset.i;
            if (a === 'back') { close(); if (o.onQuayLai) o.onQuayLai(); return; }
            if (a === 'add') { S.levels.push({ leader: '', kyNhay: false, kySoChon: false, sig: null }); render(); return; }
            if (a === 'del') { S.levels.splice(i, 1); S.loi = {}; render(); return; }
            if (a === 'up' || a === 'down') { const j = a === 'up' ? i - 1 : i + 1; [S.levels[i], S.levels[j]] = [S.levels[j], S.levels[i]]; S.loi = {}; render(); return; }
            if (a === 'sig') { S.levels[i].sig = defSig(i, n()); delete S.loi['sig' + i]; render(); if (page) page.parentElement.scrollTop = Math.max(0, S.levels[i].sig.y - 200); return; }
            if (a === 'size') { const [w, h] = SIZES[b.dataset.s]; Object.assign(S.levels[i].sig, { w, h }); render(); return; }
            if (a === 'reset') { S.levels[i].sig = defSig(i, n()); render(); return; }
            if (a === 'submit') {
                S.loi = {};
                S.levels.forEach((l, k) => {
                    if (!l.leader || !byName(l.leader)) S.loi['ld' + k] = true;
                    if (coVanBan && (k === n() - 1 || l.kyNhay) && !l.sig) S.loi['sig' + k] = true;
                });
                render();
                if (Object.keys(S.loi).length) {
                    const first = host.querySelector('.bk-in.bad, .bk-err');
                    if (first) { first.scrollIntoView({ block: 'center' }); if (first.focus) first.focus(); }
                    return;
                }
                const route = { levels: S.levels.map((l, k) => ({ leader: l.leader, kyNhay: coVanBan && l.kyNhay, kySo: coVanBan && kySoOf(k), sig: l.sig })), noiDung: ov.querySelector('#bkNoiDung').value.trim() };
                (o.keys || []).forEach(k => luuTrinh(k, route, { loaiTrinh: o.loaiTrinh, tenTep: o.tenTep, coVanBan }));
                close();
                if (o.onTrinh) o.onTrinh(route);
            }
        });
        render();
        return { close };
    }

    // ------------------------------------------------------------------ Lịch sử trình ký, Lý do bị trả lại
    function lichSuHtml(key) {
        const r = get(key);
        if (!r) return '<div class="bk-sub">Chưa có lịch sử trình ký.</div>';
        const items = r.lichSu.slice().reverse().map(h => {
            const cls = h.loai === 'tuchoi' ? 'tuchoi' : '';
            return `<li><div class="bk-av ${cls}">${esc(viTat(h.nguoi))}</div><div style="flex:1">
                <div><b>${esc(h.nguoi)}</b> <span class="bk-sub">${esc(h.thoiDiem)}</span></div>
                ${h.moTa ? `<div class="bk-sub">${esc(h.moTa)}</div>` : ''}
                <div style="margin-top:2px;color:${h.loai === 'tuchoi' ? '#b91c1c' : '#0f172a'}">${esc(h.hanhDong)}</div>
                ${h.noiDung ? `<div class="nd">${esc(h.noiDung)}</div>` : ''}</div></li>`;
        });
        const cho = r.trangThai === 'cho' ? r.levels.slice(r.level).map((l, k) => {
            const ld = byName(l.leader);
            return `<li><div class="bk-av ${k === 0 ? 'cho' : 'chua'}">${esc(viTat(l.leader))}</div><div style="flex:1"><div><b>${esc(l.leader)}</b></div>${ld ? `<div class="bk-sub">${esc(ld.chucVu)} - ${esc(ld.donVi)}</div>` : ''}${k === 0 ? '<div style="margin-top:2px;color:#b45309">Chờ ký duyệt</div>' : ''}</div></li>`;
        }).reverse() : [];
        return `<ul class="bk-hist">${cho.join('')}${items.join('')}</ul>`;
    }

    function lyDoTraLaiHtml(key, duPhong) {
        injectCss();
        const r = get(key);
        const t = r && r.traLaiDs && r.traLaiDs.length ? r.traLaiDs[r.traLaiDs.length - 1] : duPhong;
        if (!t || !t.lyDo) return '';
        return `<div class="bk-alert"><div class="t"><i class="fa-solid fa-rotate-left"></i> LÝ DO BỊ TRẢ LẠI</div>
            <div class="bk-kv" style="margin:0"><div>Lý do trả lại</div><div style="color:#b91c1c;font-weight:600">${esc(t.lyDo)}</div><div>Người trả lại</div><div>${esc(t.nguoi)}</div><div>Thời điểm trả lại</div><div>${esc(t.thoiDiem)}</div></div></div>`;
    }

    // ------------------------------------------------------------------ Khối Thông tin ký số (Biện pháp bảo đảm)
    function kySoState() { return { method: SIGN_METHODS[0], status: 'Chưa kiểm tra', certs: [], idx: 0 }; }
    function kySoHtml(K) {
        const ok = K.status === 'Chứng thư số hợp lệ', c = K.certs[K.idx];
        return `<div class="bk-sec" style="margin-top:4px">Thông tin ký số</div>
            <div class="bk-f"><label>Hình thức ký số <span class="bk-req">*</span></label>${SIGN_METHODS.map(m => `<label class="bk-row" style="margin:3px 0;cursor:pointer"><input type="radio" name="bkMethod" value="${m}" ${m === K.method ? 'checked' : ''}> ${m}</label>`).join('')}</div>
            <div class="bk-kv"><div>Trạng thái chứng thư số</div><div><span class="bk-badge ${ok ? 'ok' : (K.status === 'Chưa kiểm tra' ? '' : 'bad')}">${K.status}</span></div>
                <div>Chứng thư số <span class="bk-req">*</span></div><div><select class="bk-in" id="bkCert" ${ok ? '' : 'disabled'}>${ok ? K.certs.map((x, i) => `<option value="${i}" ${i === K.idx ? 'selected' : ''}>${esc(x.label)}</option>`).join('') : '<option>-- Chưa đọc được chứng thư số --</option>'}</select></div>
                <div>Thời hạn chứng thư số</div><div>${ok && c ? c.valid : '-'}</div></div>
            <button type="button" class="bk-btn out sm" data-a="cert"><i class="fa-solid fa-id-card"></i> Kiểm tra chứng thư số</button>`;
    }
    function certsOf(method, ten) {
        return {
            'USB Token Ban Cơ yếu Chính phủ': [{ label: `${ten} - Ban Cơ yếu Chính phủ - Số serial: 54 01 0A 3F 9C 21 7B 11`, valid: 'Từ 12/12/2025 đến 12/12/2028' }],
            'SIM ký số': [{ label: `${ten} - Viettel-CA - Số serial: 7A 22 91 0C 4D 18 E3 05`, valid: 'Từ 01/03/2026 đến 01/03/2029' }],
            'Ký số từ xa (HSM / Cloud CA)': [{ label: `${ten} - VNPT-CA SmartCA - Số serial: 19 0B 6E 72 AA 03 5D 8F`, valid: 'Từ 20/06/2026 đến 20/06/2027' }]
        }[method] || [];
    }
    // Xác thực ký số theo Hình thức ký số (hệ thống không lưu mã PIN/mã xác thực); mã "0000" giả lập ký lỗi
    function xacThuc(method, ok, fail) {
        const a = document.createElement('div');
        a.className = 'bk-auth';
        const sim = method === SIGN_METHODS[1];
        a.innerHTML = `<div class="bk-box" style="width:min(460px,94vw)"><div class="bk-head"><h3><i class="fa-solid fa-key"></i> Xác thực ký số - ${esc(method)}</h3></div>
            <div style="padding:14px 20px">${sim ? 'Vui lòng xác nhận yêu cầu ký trên điện thoại chứa SIM ký số, sau đó bấm "Đã xác nhận".'
                : `<label style="font-weight:600">${method === SIGN_METHODS[0] ? 'Nhập mã PIN USB Token' : 'Nhập mã OTP xác thực'} <span class="bk-req">*</span></label><input type="password" class="bk-in" id="bkPin" placeholder="${method === SIGN_METHODS[0] ? 'Nhập mã PIN...' : 'Nhập mã OTP...'}"><div class="bk-sub" style="margin-top:6px">Mã được nhập tại thành phần ký số, hệ thống không lưu mã. Nhập 0000 để giả lập ký lỗi.</div>`}</div>
            <div class="bk-foot"><button class="bk-btn" data-x>Hủy</button><button class="bk-btn pri" data-ok>${sim ? 'Đã xác nhận' : 'Xác thực'}</button></div></div>`;
        document.body.appendChild(a);
        a.querySelector('[data-x]').onclick = () => { a.remove(); fail(); };
        a.querySelector('[data-ok]').onclick = () => {
            const p = a.querySelector('#bkPin');
            if (p && !p.value.trim()) { p.classList.add('bad'); p.focus(); return; }
            const code = p ? p.value.trim() : '';
            a.remove();
            if (code === '0000') fail(); else ok();
        };
    }

    // ------------------------------------------------------------------ Màn hình Ký duyệt / Từ chối
    function moKyDuyet(opts) {
        injectCss();
        const o = opts || {};
        const key = o.key;
        const r = damBao(key, o.meta);
        const tuChoi = o.cheDo === 'tuchoi';
        if (!laNguoiKyHienHanh(key) || (o.conHopLe && !o.conHopLe())) { toast(o.msgKhongHopLe || MSG.DK_005, 'error'); if (o.onLoi) o.onLoi(); return; }
        const cap = capHienHanh(key);
        const coVanBan = r.coVanBan !== false;
        const canKySo = !tuChoi && coVanBan && cap.kySo;
        const K = kySoState();
        const ov = document.createElement('div');
        ov.className = 'bk-ov bk-ld';
        ov.id = 'bkKyDuyet';
        const thongTin = (o.thongTin || []).concat([['Loại trình', esc(r.loaiTrinh || '-')], ['Cán bộ trình', `${esc(r.nguoiTrinh)} - ${esc(r.thoiDiemTrinh)}`]]);
        ov.innerHTML = `<div class="bk-full">
            <div class="bk-head"><h3>${esc(o.tieuDe || (tuChoi ? `Từ chối phê duyệt hồ sơ ${o.maHoSo || ''}` : `Ký duyệt hồ sơ ${o.maHoSo || ''}`))}</h3><button class="bk-x" data-a="close" title="Đóng">&times;</button></div>
            <div class="bk-main">
                <div class="bk-doc">${coVanBan ? `<div class="bk-doc-bar"><span><i class="fa-regular fa-file-pdf" style="color:#dc2626"></i> <b>${esc(r.tenTep || o.tenTep || 'Van_ban_trinh_ky.pdf')}</b> · 1 trang</span>${o.onXemFile ? '<a href="#" data-a="file" style="color:#2563eb">Xem file</a>' : ''}</div><div class="bk-page" id="bkKdPage">${trangHtml({ loaiTrinh: r.loaiTrinh, tieuDeVanBan: o.tieuDeVanBan, dongPhu: o.dongPhu })}</div>`
                    : `<div class="bk-paper"><div><i class="fa-regular fa-file-lines" style="font-size:42px;color:#94a3b8"></i><div style="margin-top:10px;font-weight:600">Hồ sơ không có văn bản điện tử trình ký</div><div class="bk-sub">${esc(o.ghiChuGiay || 'Lãnh đạo ký duyệt trên hệ thống, không ký số.')}</div></div></div>`}</div>
                <div class="bk-side">
                    <div class="bk-sec">Thông tin tổng quan</div>
                    <div class="bk-kv">${thongTin.map(([l, v]) => `<div>${esc(l)}</div><div>${v === '' || v == null ? '-' : v}</div>`).join('')}</div>
                    <div class="bk-sec">Lịch sử trình ký</div>
                    <div class="bk-card">${lichSuHtml(key)}</div>
                    ${canKySo ? `<div class="bk-card" id="bkKySo">${kySoHtml(K)}</div>` : ''}
                    <div class="bk-f">${tuChoi ? '<label>Lý do từ chối <span class="bk-req">*</span></label><textarea class="bk-in" id="bkLyDo" rows="4" maxlength="2000" placeholder="Nhập lý do từ chối..."></textarea><div class="bk-err" id="bkLyDoErr" style="display:none">' + MSG.VAL_001 + '</div>'
                        : '<label>Ý kiến</label><textarea class="bk-in" id="bkYKien" rows="3" maxlength="2000" placeholder="Nhập ý kiến (không bắt buộc)..."></textarea>'}</div>
                </div>
            </div>
            <div class="bk-foot"><button class="bk-btn" data-a="close">Hủy bỏ</button>${tuChoi ? '<button class="bk-btn dan" data-a="tuchoi"><i class="fa-solid fa-ban"></i> Từ chối</button>' : '<button class="bk-btn pri" data-a="duyet"><i class="fa-solid fa-file-signature"></i> Ký duyệt</button>'}</div>
        </div>`;
        document.body.appendChild(ov);
        // Ô ký các cấp tại vị trí người trình đã đặt
        const page = ov.querySelector('#bkKdPage');
        if (page) r.levels.forEach((l, i) => {
            if (!l.sig) return;
            const d = document.createElement('div');
            const xong = i < r.level || r.trangThai === 'xong';
            d.className = 'bk-sig ro' + (l.kyNhay ? ' nhay' : '') + (xong ? ' done' : '');
            d.style.cssText = `left:${l.sig.x}px;top:${l.sig.y}px;width:${l.sig.w}px;height:${l.sig.h}px`;
            d.innerHTML = `<b>${i === r.levels.length - 1 ? 'Cấp cuối' : 'Cấp ' + (i + 1)} - ${esc(l.leader)}</b>${l.kyNhay ? '<br><span class="tag">Ký nháy</span>' : ''}${xong && l.daKy ? `<br>Đã ký duyệt ${esc(l.daKy)}` : ''}`;
            page.appendChild(d);
        });
        const close = () => ov.remove();
        const paintKySo = () => { const h = ov.querySelector('#bkKySo'); if (h) h.innerHTML = kySoHtml(K); };
        ov.addEventListener('change', e => {
            if (e.target.name === 'bkMethod') { K.method = e.target.value; K.status = 'Chưa kiểm tra'; K.certs = []; K.idx = 0; paintKySo(); }
            if (e.target.id === 'bkCert') { K.idx = +e.target.value || 0; paintKySo(); }
        });
        ov.addEventListener('click', e => {
            const b = e.target.closest('[data-a]');
            if (!b) return;
            const a = b.dataset.a;
            if (a === 'close') { close(); if (o.onHuy) o.onHuy(); return; }
            if (a === 'file') { e.preventDefault(); o.onXemFile(); return; }
            if (a === 'cert') {
                K.certs = certsOf(K.method, nguoiDung());
                K.status = K.certs.length ? 'Chứng thư số hợp lệ' : 'Không tìm thấy thiết bị/tài khoản ký số';
                if (!K.certs.length) toast(MSG.DK_011, 'error');
                paintKySo();
                return;
            }
            if (a === 'tuchoi') {
                const el = ov.querySelector('#bkLyDo'), lyDo = el.value.trim();
                const err = ov.querySelector('#bkLyDoErr');
                if (!lyDo) { el.classList.add('bad'); err.style.display = ''; el.focus(); return; }
                el.classList.remove('bad'); err.style.display = 'none';
                if (!laNguoiKyHienHanh(key) || (o.conHopLe && !o.conHopLe())) { toast(o.msgKhongHopLe || MSG.DK_005, 'error'); close(); if (o.onLoi) o.onLoi(); return; }
                const kq = ghiTuChoi(key, lyDo);
                close();
                if (o.onTuChoi) o.onTuChoi({ lyDo, nguoi: kq.nguoi, thoiDiem: kq.thoiDiem });
                return;
            }
            if (a === 'duyet') {
                if (!laNguoiKyHienHanh(key) || (o.conHopLe && !o.conHopLe())) { toast(o.msgKhongHopLe || MSG.DK_005, 'error'); close(); if (o.onLoi) o.onLoi(); return; }
                const yKien = (ov.querySelector('#bkYKien') || {}).value || '';
                const xong = () => { const kq = ghiKyDuyet(key, yKien.trim()); close(); if (o.onKyDuyet) o.onKyDuyet({ ...kq, hinhThucKySo: canKySo ? K.method : '' }); };
                if (!canKySo) { xong(); return; }
                if (K.status !== 'Chứng thư số hợp lệ') { toast(o.msgChungThu || MSG.DK_011, 'error'); return; }
                xacThuc(K.method, xong, () => toast(o.msgKyLoi || MSG.DK_013, 'error'));
            }
        });
        return { close };
    }

    // ------------------------------------------------------------------ Chọn tài khoản giả lập (mockup)
    function ganChonNguoiDung(host, onChange) {
        injectCss();
        if (!host || document.getElementById('bkUserPick')) return;
        const w = document.createElement('div');
        w.className = 'bk-user';
        w.id = 'bkUserPick';
        w.innerHTML = `<i class="fa-solid fa-user-tie" style="color:#1e3a8a"></i> Giả lập tài khoản đăng nhập:
            <select>${LANH_DAO.map(l => `<option value="${esc(l.ten)}" ${l.ten === nguoiDung() ? 'selected' : ''}>${esc(nhan(l.ten))}</option>`).join('')}</select>`;
        w.querySelector('select').onchange = e => { datNguoiDung(e.target.value); if (onChange) onChange(e.target.value); };
        host.insertAdjacentElement('afterbegin', w);
    }

    window.BpbdKy = {
        LANH_DAO, MAC_DINH, CAN_BO, MSG,
        nguoiDung, datNguoiDung, get, damBao, laNguoiKyHienHanh, capHienHanh, ghiKyDuyet, ghiTuChoi,
        moThietLap, moKyDuyet, lichSuHtml, lyDoTraLaiHtml, ganChonNguoiDung, toast, nhan
    };
})();
