/**
 * nhan_du_lieu_bpbd_common.js
 * Dùng chung cho chức năng "Nhận dữ liệu hồ sơ đăng ký BPBĐ từ cơ quan đăng ký khác":
 * cấu hình theo Loại tài sản, kho dữ liệu giả lập (localStorage), kiểm tra dữ liệu dùng chung
 * cho Nhận từ file và Thêm mới/Sửa thủ công.
 * Cấu trúc cột lấy từ window.NDL_SPEC (nhan_du_lieu_bpbd_spec.js) - cùng nguồn với biểu mẫu Excel.
 * Mỗi cột có mã trường (k); dữ liệu bản ghi lưu dạng đối tượng theo mã trường nên mỗi Loại tài sản
 * có thể có bộ cột riêng (VD: Tàu bay theo Mẫu số 01b).
 */
(function () {
    const SPEC = window.NDL_SPEC;
    const STORE_KEY = 'ndl_bpbd_v11';
    const USER = 'Nguyễn Văn Quản (QTHT)';

    const LDK = { LAN_DAU: 'Đăng ký lần đầu', THAY_DOI: 'Đăng ký thay đổi', SUA_SAI: 'Sửa chữa sai sót', XOA: 'Xóa đăng ký' };

    // ---------- Tài sản bảo đảm bằng quyền sử dụng đất, tài sản gắn liền với đất (mục 5 Mẫu số 01a) ----------
    const DAT_TS = {
        QSDD: 'Quyền sử dụng đất',
        DA_CN: 'Tài sản gắn liền với đất đã được chứng nhận quyền sở hữu',
        DU_AN: 'Dự án đầu tư xây dựng nhà ở, dự án đầu tư xây dựng công trình không phải là nhà ở, dự án đầu tư nông nghiệp, dự án phát triển rừng, dự án khác có sử dụng đất',
        TL: 'Nhà ở hình thành trong tương lai, tài sản khác gắn liền với đất hình thành trong tương lai',
        CHUA_DK: 'Tài sản gắn liền với đất đã hình thành không phải là nhà ở mà pháp luật không quy định phải đăng ký quyền sở hữu và cũng chưa được đăng ký quyền sở hữu theo yêu cầu'
    };
    const QH_DONG_THOI = 'Bên bảo đảm đồng thời là người sử dụng đất', QH_KHONG = 'Bên bảo đảm không đồng thời là người sử dụng đất';
    const F = (k, h, o) => Object.assign({ k, h }, o || {});
    const GCN = [F('tenGCN', 'Tên Giấy chứng nhận', { span: 2 }), F('soPhatHanhGCN', 'Số phát hành'), F('soVaoSoGCN', 'Số vào sổ cấp giấy'), F('cqCapGCN', 'Cơ quan cấp', { span: 2 }), F('ngayCapGCN', 'Ngày cấp', { ph: 'dd/mm/yyyy' })];
    const THUA = lbl => [F('soThua', lbl, { req: true }), F('toBanDo', 'Tờ bản đồ số (nếu có)')];
    /** Mỗi nhóm: no (số mục, chỉ dùng nội bộ, không hiển thị), name, sections [{t: tiêu đề nhóm trường (trống nếu không có), fields}]; nhóm 5.4, 5.5 chia theo Quan hệ của Bên bảo đảm với đất */
    const DAT_GROUPS = [
        { no: '5.1', name: DAT_TS.QSDD, sections: [
            { t: '', fields: [F('soThua', 'Thửa đất số', { req: true }), F('toBanDo', 'Tờ bản đồ số (nếu có)'), F('mucDich', 'Mục đích sử dụng đất'), F('thoiHan', 'Thời hạn sử dụng đất')] },
            { t: '', fields: [F('diaChiThua', 'Địa chỉ thửa đất', { req: true, span: 4 })] },
            { t: 'Giấy chứng nhận đối với quyền sử dụng đất', fields: GCN }] },
        { no: '5.2', name: DAT_TS.DA_CN, sections: [
            { t: 'Giấy chứng nhận', fields: GCN },
            { t: '', fields: THUA('Số của thửa đất nơi có tài sản') }] },
        { no: '5.3', name: DAT_TS.DU_AN, sections: [
            { t: 'Giấy chứng nhận', fields: GCN },
            { t: 'Quyết định giao đất, cho thuê đất của cơ quan có thẩm quyền (đối với dự án đầu tư xây dựng nhà ở chưa được cấp Giấy chứng nhận đối với quyền sử dụng đất)', fields: [F('tenQD', 'Tên Quyết định', { span: 2 }), F('soQD', 'Số'), F('ngayCapQD', 'Ngày cấp', { ph: 'dd/mm/yyyy' }), F('cqCapQD', 'Cơ quan cấp', { span: 2 })] },
            { t: '', fields: THUA('Số của thửa đất nơi có dự án') },
            { t: '', fields: [F('tenDuAn', 'Tên dự án', { req: true, span: 2 }), F('canCuDuAn', 'Căn cứ pháp lý xác lập dự án', { span: 2 })] }] },
        { no: '5.4', name: DAT_TS.TL, byQuanHe: {
            [QH_DONG_THOI]: [
                { t: 'Giấy chứng nhận đối với quyền sử dụng đất', fields: GCN },
                { t: '', fields: THUA('Số của thửa đất nơi có tài sản') },
                { t: '', fields: [F('moTaTSGL', 'Mô tả nhà ở hình thành trong tương lai, tài sản khác gắn liền với đất hình thành trong tương lai', { req: true, area: true })] }],
            [QH_KHONG]: [
                { t: '', fields: THUA('Số của thửa đất nơi có tài sản') },
                { t: '', fields: [F('moTaTSGL', 'Mô tả nhà ở hình thành trong tương lai, tài sản khác gắn liền với đất hình thành trong tương lai', { req: true, area: true })] }] } },
        { no: '5.5', name: DAT_TS.CHUA_DK, byQuanHe: {
            [QH_DONG_THOI]: [
                { t: 'Giấy chứng nhận đối với quyền sử dụng đất', fields: GCN },
                { t: '', fields: THUA('Số của thửa đất nơi có tài sản gắn liền với đất') },
                { t: '', fields: [F('moTaTSGL', 'Mô tả tài sản gắn liền với đất', { req: true, area: true })] }],
            [QH_KHONG]: [
                { t: '', fields: THUA('Số của thửa đất nơi có tài sản gắn liền với đất') },
                { t: '', fields: [F('moTaTSGL', 'Mô tả tài sản gắn liền với đất', { req: true, area: true })] }] } }
    ];
    const SHEETS = ['HO_SO', 'BEN_BAO_DAM', 'BEN_NHAN_BAO_DAM', 'TAI_SAN'];

    const TYPES = {
        dat: {
            book: 0, code: 'QSDD',
            label: 'Quyền sử dụng đất, tài sản gắn liền với đất',
            menu: 'Nhận dữ liệu BPBĐ bằng quyền sử dụng đất, tài sản gắn liền với đất',
            icon: 'fa-solid fa-map-location-dot',
            agencies: ['Văn phòng Đăng ký đất đai thành phố Hà Nội', 'Văn phòng Đăng ký đất đai Thành phố Hồ Chí Minh', 'Văn phòng Đăng ký đất đai tỉnh Bắc Ninh'],
            prefix: 'ĐĐ',
            // Nhãn riêng của đất cho Số đăng ký, Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp
            labels: { soDK: 'Số hồ sơ đăng ký biến động', soDKLD: 'Số hồ sơ đăng ký thế chấp lần đầu' },
            assetFilterLabel: 'Thông tin tài sản', assetFilterPh: 'Số thửa, tờ bản đồ, số Giấy chứng nhận...',
            summary: o => `${o.loaiTS}: Thửa ${o.soThua || '-'}, tờ bản đồ ${o.toBanDo || '-'} - ${o.diaChiThua || ''}`,
            assetKey: o => o.soThua ? ['dat', norm(o.soThua), norm(o.toBanDo), norm(o.diaChiThua)].join('|') : '',
            assetKeyLabel: o => `Thửa ${o.soThua}, tờ bản đồ ${o.toBanDo || '-'} (${o.diaChiThua})`,
            search: o => [o.soThua, o.toBanDo, o.soPhatHanhGCN, o.soVaoSoGCN, o.diaChiThua, o.tenDuAn, o.soQD].join(' '),
            vary: (o, n) => { o.soThua = String(120 + n); return o; },
            // Form Thêm mới/Sửa: tích chọn từng loại tài sản (5.1 - 5.5 Mẫu số 01a), tích loại nào hiển thị thông tin chi tiết loại đó
            assetGroups: DAT_GROUPS,
            // Theo 5 nhóm tài sản của Mẫu số 01a
            condRules: (o, push) => {
                const tuongLai = o.loaiTS === DAT_TS.TL || o.loaiTS === DAT_TS.CHUA_DK;
                if (o.loaiTS === DAT_TS.QSDD && !o.diaChiThua) push('diaChiThua', 'Bắt buộc nhập Địa chỉ thửa đất đối với Quyền sử dụng đất.');
                if (tuongLai && !o.quanHe) push('quanHe', 'Bắt buộc chọn Bên bảo đảm đồng thời hoặc không đồng thời là người sử dụng đất.');
                if (tuongLai && !o.moTaTSGL) push('moTaTSGL', 'Bắt buộc nhập Mô tả tài sản.');
                if (o.loaiTS === DAT_TS.DU_AN) {
                    if (!o.tenDuAn) push('tenDuAn', 'Bắt buộc nhập Tên dự án đối với dự án đầu tư xây dựng.');
                    if (!o.soPhatHanhGCN && !o.soQD) push('soQD', 'Dự án phải có Giấy chứng nhận hoặc Quyết định giao đất, cho thuê đất.');
                }
                if (o.ngayCapGCN) dateRule(o.ngayCapGCN, 'ngayCapGCN', push, true);
                if (o.ngayCapQD) dateRule(o.ngayCapQD, 'ngayCapQD', push, true);
            }
        },
        taubay: {
            book: 1, code: 'TAUBAY',
            label: 'Tàu bay',
            menu: 'Nhận dữ liệu BPBĐ bằng tàu bay',
            icon: 'fa-solid fa-plane',
            agencies: ['Cục Hàng không Việt Nam'],
            // Mặc định Cơ quan đăng ký trên form Thêm mới (agencies[0])
            formUnit: true,
            // Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm chỉ nhập, hiển thị với Đăng ký lần đầu
            childrenFor: [LDK.LAN_DAU],
            prefix: 'TB',
            assetFilterLabel: 'Thông tin tàu bay', assetFilterPh: 'Số hiệu đăng ký, kiểu tàu bay, số xuất xưởng...',
            // Bộ lọc tài sản tách riêng từng trường (thay cho ô Thông tin tài sản tìm gộp)
            assetFilters: [
                { k: 'soHieu', label: 'Số hiệu đăng ký', ph: 'Nhập số hiệu đăng ký...' },
                { k: 'loaiTB', label: 'Loại tàu bay', ph: 'Nhập loại tàu bay...' },
                { k: 'kieuTB', label: 'Kiểu tàu bay', ph: 'Nhập kiểu tàu bay...' }
            ],
            summary: o => `${o.loaiTB || 'Tàu bay'} ${o.kieuTB || ''}${o.soHieu ? ' - ' + o.soHieu : ''} (S/N ${o.serial || '-'})`,
            assetKey: o => (o.nsx && o.serial) ? ['taubay', norm(o.nsx), norm(o.serial)].join('|') : '',
            assetKeyLabel: o => `tàu bay ${o.nsx} số xuất xưởng ${o.serial}`,
            search: o => [o.soHieu, o.kieuTB, o.loaiTB, o.serial, o.dongCo].join(' '),
            vary: (o, n) => { o.serial = String(o.serial || '0').replace(/\d+$/, m => String(Number(m) + n).padStart(m.length, '0')); o.soHieu = String(o.soHieu || 'VN-A000').replace(/\d+$/, m => String(Number(m) + 100 + n)); return o; },
            condRules: (o, push) => {
                if (o.namXX && !/^\d{4}$/.test(o.namXX)) push('namXX', 'Năm xuất xưởng phải gồm 04 chữ số (yyyy).');
                if (o.thoiDiemHT) dateRule(o.thoiDiemHT, 'thoiDiemHT', push, false);
            }
        },
        taubien: {
            book: 2, code: 'TAUBIEN',
            label: 'Tàu biển',
            menu: 'Nhận dữ liệu BPBĐ bằng tàu biển',
            icon: 'fa-solid fa-ship',
            agencies: ['Chi cục Hàng hải Việt Nam tại thành phố Hải Phòng', 'Chi cục Hàng hải Việt Nam tại Thành phố Hồ Chí Minh', 'Cục Hàng hải và Đường thủy Việt Nam'],
            // Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm chỉ nhập, hiển thị với Đăng ký lần đầu (theo mô hình Tàu bay)
            childrenFor: [LDK.LAN_DAU],
            prefix: 'TBI',
            assetFilterLabel: 'Thông tin tàu biển', assetFilterPh: 'Tên tàu, số IMO, số đăng ký...',
            // Bộ lọc tài sản tách riêng từng trường
            assetFilters: [
                { k: 'tenTau', label: 'Tên tàu', ph: 'Nhập tên tàu...' },
                { k: 'imo', label: 'Số IMO', ph: 'Nhập số IMO...' },
                { k: 'soDKTau', label: 'Số đăng ký tàu', ph: 'Nhập số đăng ký tàu...' }
            ],
            summary: o => `${o.loaiTau || 'Tàu biển'} ${o.tenTau || ''}${o.imo ? ' - IMO ' + o.imo : ''}`,
            assetKey: o => (o.imo || o.soDKTau) ? ['taubien', norm(o.imo || o.soDKTau)].join('|') : '',
            assetKeyLabel: o => `tàu ${o.tenTau} (${o.imo ? 'IMO ' + o.imo : 'Số đăng ký ' + o.soDKTau})`,
            search: o => [o.tenTau, o.imo, o.hoHieu, o.soDKTau].join(' '),
            vary: (o, n) => { o.tenTau = 'MẪU ' + ['STAR', 'OCEAN', 'PEARL', 'WAVE', 'SUN', 'MOON', 'SKY'][n % 7]; o.imo = String(9000001 + n); o.soDKTau = 'VN-000' + (1 + n) + '-TB'; return o; },
            condRules: (o, push) => {
                if (o.imo && !/^\d{7}$/.test(o.imo)) push('imo', 'Số IMO phải gồm 07 chữ số.');
                if (o.namDong && !/^\d{4}$/.test(o.namDong)) push('namDong', 'Năm đóng phải gồm 04 chữ số (yyyy).');
                if (o.ngayDK) dateRule(o.ngayDK, 'ngayDK', push, true);
            }
        },
        chungkhoan: {
            book: 3, code: 'CK',
            label: 'Chứng khoán đã lưu ký tập trung',
            menu: 'Nhận dữ liệu BPBĐ bằng chứng khoán đã lưu ký tập trung',
            icon: 'fa-solid fa-chart-line',
            agencies: ['Tổng công ty Lưu ký và Bù trừ chứng khoán Việt Nam'],
            prefix: 'CK',
            assetFilterLabel: 'Thông tin chứng khoán', assetFilterPh: 'Mã chứng khoán, số tài khoản lưu ký...',
            summary: o => `${o.loaiCK || ''} ${o.maCK || ''} - SL ${fmtNum(o.soLuong)} (TK ${o.tkLuuKy || '-'})`,
            assetKey: o => (o.maCK && o.tkLuuKy) ? ['ck', norm(o.maCK), norm(o.tkLuuKy)].join('|') : '',
            assetKeyLabel: o => `Mã ${o.maCK} tại tài khoản lưu ký ${o.tkLuuKy}`,
            search: o => [o.maCK, o.tcph, o.tkLuuKy, o.tvLuuKy].join(' '),
            vary: (o, n) => { o.tkLuuKy = '001C' + String(1 + n).padStart(6, '0'); return o; },
            condRules: (o, push) => {
                if (o.soLuong && !/^[1-9]\d*$/.test(o.soLuong)) push('soLuong', 'Số lượng phải là số nguyên dương, không có dấu phân cách.');
                if (o.menhGia && !/^\d+$/.test(o.menhGia)) push('menhGia', 'Mệnh giá không đúng định dạng số.');
            }
        }
    };

    // ---------- Tiện ích ----------
    function norm(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toUpperCase().replace(/[\s\-.\/]/g, ''); }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function fmtNum(s) { const n = String(s || '').replace(/\D/g, ''); return n ? Number(n).toLocaleString('vi-VN') : '-'; }
    function pad(n) { return String(n).padStart(2, '0'); }
    function nowStr() { const d = new Date(); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; }
    function parseDT(s) {
        const m = /^(\d{2})\/(\d{2})\/(\d{4})(?: (\d{2}):(\d{2}))?$/.exec(String(s || '').trim());
        if (!m) return null;
        const d = new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0));
        if (d.getDate() !== +m[1] || d.getMonth() !== +m[2] - 1 || (m[4] && (+m[4] > 23 || +m[5] > 59))) return null;
        return d;
    }
    function dateRule(v, key, push, notFuture) {
        const d = /^\d{2}\/\d{2}\/\d{4}$/.test(v) ? parseDT(v) : null;
        if (!d) push(key, 'Ngày không đúng định dạng dd/mm/yyyy.');
        else if (notFuture && d > new Date()) push(key, 'Ngày không được lớn hơn ngày hiện tại.');
    }
    function dtRule(v, key, push) {
        const d = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/.test(v) ? parseDT(v) : null;
        if (!d) { push(key, 'Không đúng định dạng dd/mm/yyyy hh:mm.'); return null; }
        return d;
    }
    // Thời điểm dạng hh:mm dd/mm/yyyy (VD: Thời điểm có hiệu lực của đất)
    function tdRule(v, key, push, notFuture) {
        const m = /^(\d{2}:\d{2}) (\d{2}\/\d{2}\/\d{4})$/.exec(v);
        const d = m ? parseDT(m[2] + ' ' + m[1]) : null;
        if (!d) push(key, 'Không đúng định dạng hh:mm dd/mm/yyyy.');
        else if (notFuture && d > new Date()) push(key, 'Thời điểm không được lớn hơn thời điểm hiện tại.');
    }
    /** Nhãn Số đăng ký, Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp theo Loại tài sản */
    const LABELS = { soDK: 'Số đăng ký', soDKLD: 'Số Giấy chứng nhận đăng ký biện pháp bảo đảm đã cấp' };
    function lbl(type, k) { return ((TYPES[type] && TYPES[type].labels) || {})[k] || LABELS[k]; }
    function splitFiles(s) { return String(s || '').split(';').map(x => x.trim()).filter(Boolean); }

    // ---------- Cấu trúc cột theo Loại tài sản ----------
    function book(type) { return SPEC.books[TYPES[type].book]; }
    function cols(type, sheet) {
        const b = book(type);
        if (sheet === 'HO_SO') return b.hoSo || SPEC.common.hoSo.concat(b.hoSoExtra || []);
        if (sheet === 'TAI_SAN') return b.taiSan;
        return b.ben || SPEC.common.ben;
    }
    function hasCol(type, sheet, k) { return cols(type, sheet).some(c => c.k === k); }
    function colOf(type, sheet, k) { return cols(type, sheet).find(c => c.k === k) || { k, h: k }; }
    function lists(type) {
        const b = book(type), out = Object.assign({}, SPEC.common.lists, b.lists);
        (b.dropLists || []).forEach(k => { delete out[k]; });
        return out;
    }
    function headerText(c) { return c.h + (c.req ? ' (*)' : ''); }
    function templatePath(type) { return 'bieu_mau_nhan_du_lieu/' + book(type).file; }
    /** Chuyển dòng Excel (mảng theo thứ tự cột) thành đối tượng theo mã trường và ngược lại */
    function toObj(type, sheet, arr) { const o = {}; cols(type, sheet).forEach((c, i) => { o[c.k] = String(arr[i] == null ? '' : arr[i]).trim(); }); return o; }
    function toRow(type, sheet, o) { return cols(type, sheet).map(c => o[c.k] || ''); }
    /** Loại đăng ký: biểu mẫu không có cột Loại đăng ký (VD: Tàu bay theo Mẫu 01b) thì mặc định là Đăng ký lần đầu */
    function loaiDK(hs) { return hs.loaiDK || LDK.LAN_DAU; }
    function soDKLanDau(hs) { return loaiDK(hs) === LDK.LAN_DAU ? hs.soDK : hs.soDKLD; }
    /** Trường của Khối Thông tin đăng ký có hiển thị theo Loại đăng ký không */
    function hsVisible(c, hs) {
        const l = loaiDK(hs);
        if (c.k === 'ma' || c.k === 'files' || c.k === 'coQuan') return false; // Cơ quan đăng ký hiển thị, kiểm tra riêng
        // Cột chỉ áp dụng cho một số Loại đăng ký (VD: Tàu bay - Hợp đồng bảo đảm chỉ có ở Mẫu 01b)
        if (c.only && c.only.indexOf(l) < 0) return false;
        if (c.k === 'soDKLD') return !!hs.loaiDK && l !== LDK.LAN_DAU;
        if (c.k === 'noiDung') return l === LDK.THAY_DOI || l === LDK.SUA_SAI;
        if (c.k === 'canCu') return l === LDK.XOA;
        if (c.k === 'soHD' || c.k === 'ngayHD') return l !== LDK.XOA;
        return true;
    }
    /** Loại đăng ký có nhập Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm không (mặc định: trừ Xóa đăng ký; Tàu bay: chỉ Đăng ký lần đầu) */
    function hasChildren(type, loai) { const only = TYPES[type].childrenFor; return only ? only.indexOf(loai) >= 0 : loai !== LDK.XOA; }
    function hsGroups(type) {
        const g = [];
        cols(type, 'HO_SO').forEach(c => { const name = c.g || 'Thông tin đăng ký'; let x = g.find(y => y.name === name); if (!x) { x = { name, cols: [] }; g.push(x); } x.cols.push(c); });
        return g;
    }

    // ---------- Kho dữ liệu giả lập ----------
    function load() {
        let st = null;
        try { st = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { st = null; }
        if (!st || !st.records) { st = seed(); save(st); }
        return st;
    }
    function save(st) { try { localStorage.setItem(STORE_KEY, JSON.stringify(st)); } catch (e) { /* bỏ qua */ } }
    function nextRecId(st) { st.seq.rec += 1; return 'NDL-' + String(st.seq.rec).padStart(6, '0'); }
    function nextLotId(st) { st.seq.lot += 1; return 'LO-2026-' + String(st.seq.lot).padStart(4, '0'); }

    // ---------- Cơ quan đăng ký theo Loại tài sản ----------
    /** Giả lập danh sách đơn vị "Hoạt động" tại Quản trị hệ thống > Quản lý đơn vị (nguồn chọn khi cấu hình) */
    const UNITS = [
        'Văn phòng Đăng ký đất đai thành phố Hà Nội', 'Văn phòng Đăng ký đất đai Thành phố Hồ Chí Minh', 'Văn phòng Đăng ký đất đai tỉnh Bắc Ninh',
        'Văn phòng Đăng ký đất đai thành phố Đà Nẵng', 'Văn phòng Đăng ký đất đai thành phố Hải Phòng',
        'Cục Hàng không Việt Nam',
        'Cục Hàng hải và Đường thủy Việt Nam', 'Chi cục Hàng hải Việt Nam tại thành phố Hải Phòng', 'Chi cục Hàng hải Việt Nam tại Thành phố Hồ Chí Minh', 'Chi cục Hàng hải Việt Nam tại thành phố Đà Nẵng',
        'Tổng công ty Lưu ký và Bù trừ chứng khoán Việt Nam',
        'Sở Tư pháp thành phố Hà Nội', 'Sở Tư pháp Thành phố Hồ Chí Minh'
    ];
    /** Cơ quan đăng ký đã cấu hình cho Loại tài sản (dùng cho hộp chọn Thêm mới/Sửa, bộ lọc, danh mục file mẫu và kiểm tra khi nhận) */
    function agencies(st, type) { return ((st && st.cfgCoQuan && st.cfgCoQuan[type]) || TYPES[type].agencies).slice(); }

    function seed() {
        const st = { v: 7, seq: { rec: 0, lot: 0 }, records: [], lots: [], cfgCoQuan: {} };
        Object.keys(TYPES).forEach(k => { st.cfgCoQuan[k] = TYPES[k].agencies.slice(); });
        const people = ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường', 'Phạm Thị Dung', 'Hoàng Văn Em', 'Vũ Thị Giang', 'Đỗ Văn Hùng'];
        Object.keys(TYPES).forEach(type => {
            const T = TYPES[type], s = book(type).samples;
            const hasLoaiDK = hasCol(type, 'HO_SO', 'loaiDK');
            const ag = T.agencies[0];
            const hs0 = toObj(type, 'HO_SO', s.HO_SO[0].r), bbd0 = toObj(type, 'BEN_BAO_DAM', s.BEN_BAO_DAM[0].r), bnbd0 = toObj(type, 'BEN_NHAN_BAO_DAM', s.BEN_NHAN_BAO_DAM[0].r);
            // Dòng tài sản mẫu của hồ sơ VD01 (lần đầu); với đất, dòng VD02 là nội dung sau thay đổi (bổ sung nhà ở)
            const ts0 = s.TAI_SAN.filter(x => x.r[0] === 'VD01').map(x => toObj(type, 'TAI_SAN', x.r));
            const tsChange = s.TAI_SAN.filter(x => x.r[0] === 'VD02').map(x => toObj(type, 'TAI_SAN', x.r));
            const lot1 = { id: nextLotId(st), loai: type, coQuan: ag, fileName: 'Du_lieu_' + T.code + '_T09_2026.xlsx', zipName: 'Dinh_kem_T09_2026.zip', congVan: ['CV_gui_du_lieu_T09_2026.pdf'], ghiChu: 'Dữ liệu tháng 09/2026', nguoiNhan: USER, thoiDiem: '01/10/2026 08:45', tong: 3, ghiNhan: 2, trung: 0, loi: 1, trangThai: 'Hiệu lực' };
            const lot2 = { id: nextLotId(st), loai: type, coQuan: ag, fileName: 'Du_lieu_' + T.code + '_dot2_T09_2026.xlsx', zipName: '', congVan: [], ghiChu: '', nguoiNhan: USER, thoiDiem: '03/10/2026 14:10', tong: 4, ghiNhan: 3, trung: 1, loi: 0, trangThai: 'Hiệu lực' };
            st.lots.push(lot1, lot2);
            const mk = (i, loai, soDK, soLD, thoiDiem, opt) => {
                const ma = 'HS' + String(i).padStart(3, '0');
                // Dòng mẫu cùng Loại đăng ký (nếu biểu mẫu có), để nội dung giả lập đúng theo từng mẫu phiếu
                const sameLoai = hasLoaiDK ? s.HO_SO.map(x => toObj(type, 'HO_SO', x.r)).find(o => o.loaiDK === loai) : null;
                const hs = Object.assign({}, sameLoai || hs0, { ma, soDK, thoiDiem, files: (opt.files || []).join('; ') });
                if (hasLoaiDK) Object.assign(hs, { loaiDK: loai, soDKLD: soLD || '', noiDung: opt.noiDung || '', canCu: opt.canCu || '' });
                if ('thoiDiemHL' in hs) hs.thoiDiemHL = thoiDiem;
                if (loai === LDK.XOA) { hs.soHD = ''; hs.ngayHD = ''; }
                const bbd = !hasChildren(type, loai) ? [] : [Object.assign({}, bbd0, { ma })];
                if (bbd.length && String(bbd0.loai || '').indexOf('Cá nhân') === 0) bbd[0].ten = opt.ten || people[i % people.length];
                const bnbd = !hasChildren(type, loai) ? [] : [Object.assign({}, bnbd0, { ma })];
                const ts = !hasChildren(type, loai) ? [] : (opt.ts || ts0.map(o => T.vary(Object.assign({}, o), opt.vary || 0))).map(o => Object.assign(o, { ma }));
                const rec = {
                    id: nextRecId(st), loai: type, coQuan: ag, hs, bbd, bnbd, ts,
                    files: (opt.files || []).map(n => ({ name: n, size: '0,4 MB', nguon: 'Tệp nén kèm file dữ liệu' })),
                    nguon: opt.lot ? 'Nhận từ file' : 'Thêm mới thủ công', loId: opt.lot ? opt.lot.id : '',
                    nguoiNhan: USER, ngayNhan: opt.lot ? opt.lot.thoiDiem : (opt.ngayNhan || '02/10/2026 10:20'),
                    trangThai: opt.huy ? 'Đã hủy' : 'Hiệu lực', lyDoHuy: opt.huy || '',
                    history: [{ t: opt.lot ? opt.lot.thoiDiem : (opt.ngayNhan || '02/10/2026 10:20'), user: USER, action: opt.lot ? 'Nhận từ file (lô ' + opt.lot.id + ')' : 'Thêm mới thủ công', reason: '' }]
                };
                if (opt.huy) rec.history.push({ t: '04/10/2026 09:00', user: USER, action: 'Hủy bản ghi', reason: opt.huy });
                st.records.push(rec);
                return rec;
            };
            const p = T.prefix + '-2026-';
            mk(1, LDK.LAN_DAU, p + '0101', '', '15/09/2026 09:30', { lot: lot1, vary: 0, files: ['HS001_phieu.pdf'] });
            if (hasLoaiDK) {
                const tdTs = tsChange.length ? tsChange.map(o => T.vary(Object.assign({}, o), 0)) : ts0.map(o => T.vary(Object.assign({}, o), 0)).concat([T.vary(Object.assign({}, ts0[0]), 9)]);
                mk(2, LDK.THAY_DOI, p + '0101-TĐ1', p + '0101', '25/09/2026 14:00', { lot: lot1, ts: tdTs, noiDung: 'Bổ sung tài sản bảo đảm', ten: people[1] });
            } else {
                mk(2, LDK.LAN_DAU, p + '0105', '', '25/09/2026 14:00', { lot: lot1, vary: 3 });
            }
            mk(3, LDK.LAN_DAU, p + '0102', '', '18/09/2026 10:05', { vary: 2, ngayNhan: '02/10/2026 10:20' });
            if (hasLoaiDK) {
                mk(4, LDK.XOA, p + '0102-XĐK', p + '0102', '28/09/2026 16:20', { lot: lot2, canCu: 'Chấm dứt nghĩa vụ được bảo đảm' });
                mk(5, LDK.THAY_DOI, p + '0055-TĐ2', p + '0055', '26/09/2026 08:15', { lot: lot2, vary: 4, noiDung: 'Thay đổi Bên nhận bảo đảm' });
            } else {
                mk(4, LDK.LAN_DAU, p + '0106', '', '28/09/2026 16:20', { lot: lot2, vary: 6 });
            }
            mk(6, LDK.LAN_DAU, p + '0103', '', '27/09/2026 11:40', { lot: lot2, vary: 5, huy: 'Nhận nhầm dữ liệu của cơ quan khác' });
            mk(7, LDK.LAN_DAU, p + '0104', '', '29/09/2026 15:30', { vary: 0, ngayNhan: '04/10/2026 16:05' });
        });
        return st;
    }

    // ---------- Chuỗi hồ sơ (liên kết các lần đăng ký) ----------
    function chainKey(coQuan, hs) { return coQuan + '|' + norm(soDKLanDau(hs)); }
    function recChain(st, rec) { return chainKey(rec.coQuan, rec.hs); }
    function active(st, type) { return st.records.filter(r => r.loai === type && r.trangThai === 'Hiệu lực'); }
    function chainRecords(st, rec) {
        const k = recChain(st, rec);
        return st.records.filter(r => r.loai === rec.loai && recChain(st, r) === k)
            .sort((a, b) => parseDT(a.hs.thoiDiem) - parseDT(b.hs.thoiDiem));
    }
    function chainState(st, rec) {
        const recs = chainRecords(st, rec).filter(r => r.trangThai === 'Hiệu lực');
        const hasBase = recs.some(r => loaiDK(r.hs) === LDK.LAN_DAU);
        const deleted = recs.some(r => loaiDK(r.hs) === LDK.XOA);
        // Nội dung hiện hành: bản ghi khác Xóa đăng ký, có tài sản (Tàu bay - Đăng ký thay đổi không nhập tài sản)
        const content = recs.filter(r => loaiDK(r.hs) !== LDK.XOA && r.ts.length);
        const latest = content.length ? content[content.length - 1] : null;
        return { hasBase, deleted, latest, status: deleted ? 'Đã xóa đăng ký' : 'Đang bảo đảm' };
    }
    function assetStatus(st, rec, o) {
        const cs = chainState(st, rec);
        if (cs.deleted) return 'Đã giải chấp';
        if (!cs.latest) return '-';
        const k = TYPES[rec.loai].assetKey(o);
        if (!k) return 'Đang bảo đảm';
        return cs.latest.ts.some(x => TYPES[rec.loai].assetKey(x) === k) ? 'Đang bảo đảm' : 'Đã giải chấp';
    }
    /** Cảnh báo động của một bản ghi đang hiệu lực */
    function warnings(st, rec) {
        const out = [];
        if (rec.trangThai !== 'Hiệu lực') return out;
        const cs = chainState(st, rec);
        if (loaiDK(rec.hs) !== LDK.LAN_DAU && !cs.hasBase) out.push(`Chưa có hồ sơ gốc theo ${lbl(rec.loai, 'soDKLD')} ${rec.hs.soDKLD}.`);
        out.push(...assetDupWarnings(st, rec.loai, rec.coQuan, rec.hs, rec.ts, rec.id));
        return out;
    }
    function assetDupWarnings(st, type, coQuan, hs, ts, selfId) {
        const T = TYPES[type], out = [], myChain = chainKey(coQuan, hs);
        ts.forEach(o => {
            const k = T.assetKey(o); if (!k) return;
            const hit = active(st, type).find(r => r.id !== selfId && recChain(st, r) !== myChain && !chainState(st, r).deleted
                && chainState(st, r).latest === r && r.ts.some(x => T.assetKey(x) === k));
            const msg = hit ? `Tài sản ${T.assetKeyLabel(o)} trùng với tài sản thuộc hồ sơ ${hit.hs.soDK} đang có hiệu lực.` : '';
            if (hit && out.indexOf(msg) < 0) out.push(msg);
        });
        return out;
    }

    // ---------- Kiểm tra dữ liệu một hồ sơ (dùng chung Nhận từ file và Thêm mới/Sửa) ----------
    /**
     * @param ctx { type, coQuan, st, selfId, pending: [{coQuan, hs}], zipNames: Set|null, source: 'file'|'form' }
     * @param pack { hs, hsLine, bbd:[{o,line}], bnbd:[...], ts:[...] }  (hs, o: đối tượng theo mã trường)
     * @return { errors:[{sheet,line,col,msg}], warnings:[string], dup:boolean }
     */
    function validate(ctx, pack) {
        const { type } = ctx, T = TYPES[type], L = lists(type);
        const errors = [], warns = [];
        const E = (sheet, line, key, msg) => errors.push({ sheet, line, col: key ? colOf(type, sheet === 'BEN_NHAN_BAO_DAM' ? 'BEN_BAO_DAM' : sheet, key).h : '', msg });
        const hs = pack.hs, hsLine = pack.hsLine, loai = loaiDK(hs);
        const formSkip = ctx.source === 'form' ? ['ma', 'stt'] : [];

        // 1. Bắt buộc, danh sách chọn, chữ IN HOA
        const checkObj = (sheet, o, line, colsDef) => {
            colsDef.forEach(c => {
                if (formSkip.indexOf(c.k) >= 0) return;
                if (sheet === 'HO_SO' && !hsVisible(c, hs) && c.k !== 'ma' && c.k !== 'files') return;
                const v = String(o[c.k] == null ? '' : o[c.k]).trim();
                if (c.req && !v) E(sheet, line, c.k, 'Bắt buộc nhập.');
                else if (c.reqFor && c.reqFor.indexOf(loai) >= 0 && !v) E(sheet, line, c.k, 'Bắt buộc nhập với ' + c.reqFor.join(', ') + '.');
                else if (v && c.list && (L[c.list] || []).indexOf(v) < 0) E(sheet, line, c.k, 'Giá trị không thuộc danh sách cho phép.');
                else if (v && c.upper && v !== v.toUpperCase()) E(sheet, line, c.k, 'Phải viết chữ IN HOA.');
            });
        };
        checkObj('HO_SO', hs, hsLine, cols(type, 'HO_SO'));
        // Cơ quan đăng ký: bắt buộc, thuộc danh sách cơ quan đăng ký đã cấu hình cho Loại tài sản (khi Sửa: chỉ kiểm tra nếu thay đổi Cơ quan đăng ký)
        if (!hs.coQuan) E('HO_SO', hsLine, 'coQuan', 'Bắt buộc nhập.');
        else if ((!ctx.selfId || hs.coQuan !== ctx.origCoQuan) && agencies(ctx.st, type).indexOf(hs.coQuan) < 0) E('HO_SO', hsLine, 'coQuan', 'Không thuộc danh sách cơ quan đăng ký đã cấu hình cho Loại tài sản.');

        // 2. Bắt buộc theo Loại đăng ký, định dạng
        if (hs.loaiDK && loai !== LDK.LAN_DAU && !hs.soDKLD) E('HO_SO', hsLine, 'soDKLD', 'Bắt buộc nhập khi Loại đăng ký khác "Đăng ký lần đầu".');
        if (hs.loaiDK && loai === LDK.LAN_DAU && hs.soDKLD && norm(hs.soDKLD) !== norm(hs.soDK)) E('HO_SO', hsLine, 'soDKLD', `Với Đăng ký lần đầu, ${lbl(type, 'soDKLD')} phải để trống hoặc trùng ${lbl(type, 'soDK')}.`);
        if (hs.loaiDK && (loai === LDK.LAN_DAU || loai === LDK.THAY_DOI) && hasCol(type, 'HO_SO', 'soHD') && hsVisible(colOf(type, 'HO_SO', 'soHD'), hs) && !hs.soHD) E('HO_SO', hsLine, 'soHD', 'Bắt buộc nhập với Đăng ký lần đầu, Đăng ký thay đổi.');
        if ((loai === LDK.THAY_DOI || loai === LDK.SUA_SAI) && !hs.noiDung) E('HO_SO', hsLine, 'noiDung', 'Bắt buộc nhập với Đăng ký thay đổi, Sửa chữa sai sót.');
        if (loai === LDK.XOA && !hs.canCu) E('HO_SO', hsLine, 'canCu', 'Bắt buộc chọn với Xóa đăng ký.');
        const push = (k, m) => E('HO_SO', hsLine, k, m);
        let dDK = null;
        if (hs.thoiDiem) { dDK = dtRule(hs.thoiDiem, 'thoiDiem', push); if (dDK && dDK > new Date()) push('thoiDiem', 'Thời điểm đăng ký không được lớn hơn thời điểm hiện tại.'); }
        if (hs.thoiDiemHL) { const dHL = dtRule(hs.thoiDiemHL, 'thoiDiemHL', push); if (dHL && dDK && dHL < dDK) push('thoiDiemHL', 'Thời điểm có hiệu lực không được nhỏ hơn Thời điểm đăng ký.'); }
        ['ngayHD', 'hieuLucHD', 'nycNgayCap', 'ngayVB'].forEach(k => { if (hs[k]) (colOf(type, 'HO_SO', k).fmt === 'hh:mm dd/mm/yyyy' ? tdRule : dateRule)(hs[k], k, push, true); });
        if (hs.nycEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hs.nycEmail)) push('nycEmail', 'Thư điện tử không đúng định dạng.');
        if (hs.nycSoGT) giayToRule(hs.nycLoaiGT, hs.nycSoGT, 'nycSoGT', push);

        // 3. Chủ thể, tài sản
        const benCols = cols(type, 'BEN_BAO_DAM');
        [['BEN_BAO_DAM', pack.bbd], ['BEN_NHAN_BAO_DAM', pack.bnbd]].forEach(([sheet, rows]) => {
            rows.forEach(({ o, line }) => {
                const P = (k, m) => E(sheet, line, k, m);
                checkObj(sheet, o, line, benCols);
                if (o.loai && o.loai.indexOf('nước ngoài') >= 0 && hasCol(type, 'BEN_BAO_DAM', 'qt') && !o.qt) P('qt', 'Bắt buộc nhập với cá nhân, tổ chức nước ngoài.');
                if (o.soGT) giayToRule(o.loaiGT, o.soGT, 'soGT', P);
                if (o.ngayCap) dateRule(o.ngayCap, 'ngayCap', P, true);
                if (o.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)) P('email', 'Thư điện tử không đúng định dạng.');
            });
        });
        const tsCols = cols(type, 'TAI_SAN');
        pack.ts.forEach(({ o, line }) => {
            checkObj('TAI_SAN', o, line, tsCols);
            T.condRules(o, (k, m) => E('TAI_SAN', line, k, m));
        });
        if (!hasChildren(type, loai)) {
            // Loại đăng ký không nhập chủ thể, tài sản (VD: Tàu bay - Đăng ký thay đổi, Xóa đăng ký)
            if (ctx.source === 'file' && (pack.bbd.length || pack.bnbd.length || pack.ts.length) && loai !== LDK.XOA)
                E('HO_SO', hsLine, '', `${loai} không nhập Bên bảo đảm, Bên nhận bảo đảm, Tài sản bảo đảm (chỉ nhập với Đăng ký lần đầu). Vui lòng xóa các dòng của hồ sơ tại sheet BEN_BAO_DAM, BEN_NHAN_BAO_DAM, TAI_SAN.`);
        } else {
            const miss = [];
            if (!pack.bbd.length) miss.push('Bên bảo đảm');
            if (!pack.bnbd.length) miss.push('Bên nhận bảo đảm');
            if (!pack.ts.length) miss.push('tài sản');
            if (miss.length) E('HO_SO', hsLine, '', 'Hồ sơ phải có ít nhất 01 Bên bảo đảm, 01 Bên nhận bảo đảm và 01 tài sản (đang thiếu: ' + miss.join(', ') + ').');
        }

        // 4. File đính kèm khai báo trong cột
        if (ctx.source === 'file') {
            splitFiles(hs.files).forEach(n => {
                if (!ctx.zipNames) E('HO_SO', hsLine, 'files', `Có khai báo tệp "${n}" nhưng chưa tải lên tệp nén (.zip).`);
                else if (!ctx.zipNames.has(n.toLowerCase())) E('HO_SO', hsLine, 'files', `Tệp "${n}" không có trong tệp nén.`);
                else if (!/\.(pdf|jpe?g|png)$/i.test(n)) E('HO_SO', hsLine, 'files', `Tệp "${n}" không đúng định dạng .pdf, .jpg, .png.`);
            });
        }

        // 5. Trùng, liên kết các lần đăng ký (chỉ khi dữ liệu chính hợp lệ)
        let dup = false;
        if (!errors.length && hs.soDK) {
            const st = ctx.st;
            const sameKey = r => r.coQuan === ctx.coQuan && norm(r.hs.soDK) === norm(hs.soDK) && loaiDK(r.hs) === loai;
            const existed = active(st, type).find(r => r.id !== ctx.selfId && sameKey(r));
            const inFile = (ctx.pending || []).find(p => p.coQuan === ctx.coQuan && norm(p.hs.soDK) === norm(hs.soDK) && loaiDK(p.hs) === loai);
            if (existed) {
                if (ctx.source === 'file') { dup = true; warns.push(`Đã tồn tại trên hệ thống (bản ghi ${existed.id}), không ghi nhận lại.`); }
                else E('HO_SO', hsLine, 'soDK', `Hồ sơ đã tồn tại trên hệ thống (trùng Cơ quan đăng ký, ${lbl(type, 'soDK')} và Loại đăng ký).`);
            } else if (inFile) {
                E('HO_SO', hsLine, 'soDK', `Trùng Cơ quan đăng ký, ${lbl(type, 'soDK')} và Loại đăng ký với hồ sơ ${inFile.hs.ma} trong cùng tệp.`);
            } else if (loai !== LDK.LAN_DAU) {
                const k = chainKey(ctx.coQuan, hs);
                const chainActive = active(st, type).filter(r => r.id !== ctx.selfId && recChain(st, r) === k)
                    .map(r => r.hs).concat((ctx.pending || []).filter(p => chainKey(p.coQuan, p.hs) === k).map(p => p.hs));
                if (chainActive.some(h => loaiDK(h) === LDK.XOA)) E('HO_SO', hsLine, 'soDKLD', `Hồ sơ gốc ${hs.soDKLD} đã được xóa đăng ký. Không thể ghi nhận thêm đăng ký thay đổi, sửa chữa sai sót hoặc xóa đăng ký.`);
                else if (!chainActive.some(h => loaiDK(h) === LDK.LAN_DAU)) warns.push(`Chưa có hồ sơ gốc theo ${lbl(type, 'soDKLD')} ${hs.soDKLD}. Hệ thống vẫn ghi nhận và tự liên kết khi nhận được hồ sơ gốc.`);
            }
            if (!errors.length && !dup) warns.push(...assetDupWarnings(st, type, ctx.coQuan, hs, pack.ts.map(x => x.o), ctx.selfId));
        }
        return { errors, warnings: warns, dup };
    }
    /** Kiểm tra số giấy tờ theo loại giấy tờ (chỉ kiểm tra định dạng số Việt Nam; mã số thuế nước ngoài có chữ cái được chấp nhận) */
    function giayToRule(loaiGT, so, key, push) {
        so = String(so || '').trim();
        if (loaiGT === 'Căn cước / Căn cước công dân' && !/^\d{12}$/.test(so)) push(key, 'Số Căn cước phải gồm đúng 12 chữ số.');
        if ((loaiGT === 'Mã số doanh nghiệp' || loaiGT === 'Mã số thuế') && /^[\d-]+$/.test(so) && !/^\d{10}$|^\d{10}-\d{3}$/.test(so))
            push(key, 'Mã số doanh nghiệp/Mã số thuế phải gồm 10 chữ số hoặc dạng 10 chữ số kèm 03 chữ số đơn vị phụ thuộc (VD: 0100000001-001).');
    }

    // ---------- UI helpers ----------
    function toast(msg, kind) {
        let el = document.getElementById('ndlToast');
        if (!el) {
            el = document.createElement('div'); el.id = 'ndlToast';
            el.style.cssText = 'position:fixed;top:16px;right:16px;z-index:20000;max-width:420px;padding:12px 16px;border-radius:8px;font-size:13px;font-weight:500;box-shadow:0 10px 15px -3px rgba(0,0,0,.15);display:none;align-items:center;gap:10px;';
            document.body.appendChild(el);
        }
        const c = { success: ['#ECFDF5', '#047857', '#A7F3D0', 'fa-circle-check'], error: ['#FEF2F2', '#B91C1C', '#FECACA', 'fa-circle-xmark'], warn: ['#FFFBEB', '#B45309', '#FDE68A', 'fa-triangle-exclamation'], info: ['#EFF6FF', '#1D4ED8', '#BFDBFE', 'fa-circle-info'] }[kind || 'info'];
        el.style.background = c[0]; el.style.color = c[1]; el.style.border = '1px solid ' + c[2];
        el.innerHTML = `<i class="fa-solid ${c[3]}"></i><span>${esc(msg)}</span>`;
        el.style.display = 'flex';
        clearTimeout(el._t); el._t = setTimeout(() => { el.style.display = 'none'; }, 4200);
    }
    function typeFromUrl() { const t = new URLSearchParams(location.search).get('loai'); return TYPES[t] ? t : 'dat'; }
    function statusBadge(s) {
        const map = { 'Hiệu lực': 'ndl-b-ok', 'Đã hủy': 'ndl-b-cancel', 'Đang bảo đảm': 'ndl-b-active', 'Đã xóa đăng ký': 'ndl-b-del', 'Đã giải chấp': 'ndl-b-del', 'Hợp lệ': 'ndl-b-ok', 'Cảnh báo': 'ndl-b-warn', 'Trùng': 'ndl-b-dup', 'Lỗi': 'ndl-b-err' };
        return `<span class="ndl-badge ${map[s] || ''}">${esc(s)}</span>`;
    }
    function loaiDKBadge(s) {
        const map = { [LDK.LAN_DAU]: 'ndl-t-new', [LDK.THAY_DOI]: 'ndl-t-chg', [LDK.SUA_SAI]: 'ndl-t-fix', [LDK.XOA]: 'ndl-t-del' };
        return `<span class="ndl-badge ${map[s] || ''}">${esc(s)}</span>`;
    }
    // CSS dùng chung cho badge
    const css = document.createElement('style');
    css.textContent = `.ndl-badge{display:inline-block;padding:3px 8px;font-size:11px;font-weight:600;border-radius:4px;line-height:1.3;white-space:nowrap;border:1px solid transparent}
    .ndl-b-ok{background:#DCFCE7;color:#15803D;border-color:#BBF7D0}.ndl-b-cancel{background:#F1F5F9;color:#64748B;border-color:#CBD5E1}
    .ndl-b-active{background:#E0F2FE;color:#0369A1;border-color:#BAE6FD}.ndl-b-del{background:#FEE2E2;color:#B91C1C;border-color:#FECACA}
    .ndl-b-warn{background:#FEF3C7;color:#B45309;border-color:#FDE68A}.ndl-b-dup{background:#EDE9FE;color:#6D28D9;border-color:#DDD6FE}.ndl-b-err{background:#FEE2E2;color:#B91C1C;border-color:#FECACA}
    .ndl-t-new{background:#ECFDF5;color:#047857;border-color:#A7F3D0}.ndl-t-chg{background:#EFF6FF;color:#1D4ED8;border-color:#BFDBFE}.ndl-t-fix{background:#F3E8FF;color:#7E22CE;border-color:#E9D5FF}.ndl-t-del{background:#FFF1F2;color:#BE123C;border-color:#FECDD3}
    .ndl-warn-ic{color:#D97706;margin-left:6px}`;
    document.head.appendChild(css);

    window.NDL = {
        SPEC, TYPES, LDK, SHEETS, USER, DAT_TS, QH_DONG_THOI, QH_KHONG,
        norm, esc, fmtNum, nowStr, parseDT, splitFiles,
        cols, hasCol, colOf, lists, headerText, lbl, templatePath, book, toObj, toRow, loaiDK, soDKLanDau, hsVisible, hsGroups, hasChildren,
        load, save, nextRecId, nextLotId, UNITS, agencies,
        chainKey, chainRecords, chainState, assetStatus, warnings, validate,
        toast, typeFromUrl, statusBadge, loaiDKBadge
    };
})();
