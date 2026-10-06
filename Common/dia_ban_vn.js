/**
 * dia_ban_vn.js - Trường Phường/Xã dùng chung cho các form địa chỉ (Danh mục Phường/Xã [DM_15]).
 * Quy tắc: Phường/Xã chỉ hiển thị (và bắt buộc) khi Quốc gia là "Việt Nam"; danh sách lọc theo Tỉnh/Thành phố đã chọn;
 * chưa chọn Tỉnh/Thành phố thì khóa mờ kèm placeholder "Vui lòng chọn Tỉnh/Thành phố trước".
 *
 * Cách dùng:
 *   DiaBanVN.bind({ id: 'tc_phuongxa', country: 'tc_quocgia', province: 'tc_tinhthanh_select', after: 'tc_tinhthanh_wrapper' });
 *   DiaBanVN.get('tc_phuongxa').value()            // đọc giá trị
 *   DiaBanVN.get('tc_phuongxa').setValue('Phường Cửa Nam')   // gán khi sửa bản ghi
 *   DiaBanVN.get('tc_phuongxa').validate()         // true/false, tô viền đỏ khi bắt buộc mà trống
 *   DiaBanVN.formatAddress(diaChi, phuongXa, tinhThanh, quocGia)  // "Địa chỉ chi tiết, Phường/Xã, Tỉnh/Thành phố, Quốc gia"
 * country/province có thể là id phần tử (string) hoặc hàm trả về giá trị; after là id/phần tử/hàm trả về phần tử để chèn ô Phường/Xã ngay sau.
 */
(function () {
    // Dữ liệu giả lập Danh mục Phường/Xã (theo địa giới sau sắp xếp đơn vị hành chính 2025), khóa là tên Tỉnh/TP đã chuẩn hóa
    const DATA = {
        'HANOI': ['Phường Ba Đình', 'Phường Ngọc Hà', 'Phường Giảng Võ', 'Phường Hoàn Kiếm', 'Phường Cửa Nam', 'Phường Hai Bà Trưng', 'Phường Đống Đa', 'Phường Láng', 'Phường Cầu Giấy', 'Phường Nghĩa Đô', 'Phường Yên Hòa', 'Phường Tây Hồ', 'Phường Thanh Xuân', 'Phường Long Biên', 'Xã Sóc Sơn', 'Xã Đông Anh'],
        'HOCHIMINH': ['Phường Sài Gòn', 'Phường Bến Thành', 'Phường Tân Định', 'Phường Cầu Ông Lãnh', 'Phường Xuân Hòa', 'Phường Bàn Cờ', 'Phường Gia Định', 'Phường Bình Thạnh', 'Phường Tân Sơn Nhất', 'Phường Thủ Đức', 'Phường Phú Nhuận', 'Xã Cần Giờ', 'Xã Củ Chi'],
        'DANANG': ['Phường Hải Châu', 'Phường Hòa Cường', 'Phường Thanh Khê', 'Phường Sơn Trà', 'Phường Ngũ Hành Sơn', 'Phường Liên Chiểu', 'Phường Cẩm Lệ', 'Xã Hòa Vang'],
        'HAIPHONG': ['Phường Hồng Bàng', 'Phường Lê Chân', 'Phường Ngô Quyền', 'Phường Hải An', 'Phường Kiến An', 'Phường Đồ Sơn', 'Xã An Dương'],
        'CANTHO': ['Phường Ninh Kiều', 'Phường Cái Khế', 'Phường Tân An', 'Phường Bình Thủy', 'Phường Cái Răng', 'Xã Phong Điền'],
        'BINHDUONG': ['Phường Thủ Dầu Một', 'Phường Phú Lợi', 'Phường Dĩ An', 'Phường Thuận An', 'Phường Bến Cát'],
        'DONGNAI': ['Phường Biên Hòa', 'Phường Trấn Biên', 'Phường Long Khánh', 'Xã Nhơn Trạch', 'Xã Long Thành'],
        'QUANGNINH': ['Phường Hạ Long', 'Phường Bãi Cháy', 'Phường Cẩm Phả', 'Phường Uông Bí', 'Phường Móng Cái'],
        'KHANHHOA': ['Phường Nha Trang', 'Phường Bắc Nha Trang', 'Phường Cam Ranh', 'Phường Ninh Hòa', 'Xã Diên Khánh'],
        'BACNINH': ['Phường Kinh Bắc', 'Phường Võ Cường', 'Phường Từ Sơn', 'Phường Bắc Giang', 'Xã Tiên Du'],
        'HUE': ['Phường Thuận Hóa', 'Phường Phú Xuân', 'Phường Kim Long', 'Phường Vỹ Dạ', 'Xã Phú Vang'],
        'NGHEAN': ['Phường Thành Vinh', 'Phường Trường Vinh', 'Phường Cửa Lò', 'Xã Diễn Châu'],
        'THANHHOA': ['Phường Hạc Thành', 'Phường Đông Sơn', 'Phường Sầm Sơn', 'Xã Hoằng Hóa']
    };
    const FALLBACK = ['Phường Trung tâm', 'Phường Đông', 'Phường Tây', 'Xã Bắc', 'Xã Nam'];

    function norm(s) {
        return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
            .toUpperCase().replace(/^\s*(THANH PHO|TP\.?|TINH)\s+/, '').replace(/[^A-Z]/g, '');
    }
    function isVN(country) { const n = norm(country); return n === 'VIETNAM' || n === 'VN'; }
    function wards(province) {
        if (!province) return [];
        const k = norm(province);
        return DATA[k] || DATA[Object.keys(DATA).find(x => k.indexOf(x) >= 0 || x.indexOf(k) >= 0)] || FALLBACK;
    }
    function formatAddress(diaChi, phuongXa, tinhThanh, quocGia) {
        return [diaChi, isVN(quocGia) ? phuongXa : '', tinhThanh, quocGia].map(x => String(x || '').trim()).filter(Boolean).join(', ');
    }

    const registry = {};
    function resolveVal(src) {
        if (typeof src === 'function') return src();
        const el = typeof src === 'string' ? document.getElementById(src) : src;
        return el ? el.value : '';
    }
    function resolveEl(src) {
        if (typeof src === 'function') return src();
        return typeof src === 'string' ? document.getElementById(src) : src;
    }

    function bind(opts) {
        const o = Object.assign({
            label: 'Phường/Xã', groupClass: 'form-group', labelClass: 'form-label', selectClass: 'form-select',
            requiredHtml: ' <span class="required-mark">*</span>', groupStyle: '', placeholder: '-- Chọn Phường/Xã --'
        }, opts);
        if (registry[o.id] && document.getElementById(o.id)) { registry[o.id].refresh(); return registry[o.id]; }
        const anchor = resolveEl(o.after);
        if (!anchor || !anchor.parentNode) return null;
        const group = document.createElement(o.groupTag || 'div');
        group.className = o.groupClass;
        group.id = o.id + '_group';
        if (o.groupStyle) group.style.cssText = o.groupStyle;
        group.innerHTML = `<label class="${o.labelClass}" for="${o.id}">${o.label}${o.requiredHtml}</label>
            <select class="${o.selectClass}" id="${o.id}"></select>`;
        anchor.parentNode.insertBefore(group, anchor.nextSibling);
        const sel = group.querySelector('select');
        let pending = '';

        const api = {
            el: group, select: sel,
            isVisible: () => group.style.display !== 'none',
            value: () => (api.isVisible() ? sel.value : ''),
            setValue: v => { pending = v || ''; api.refresh(); },
            refresh: () => {
                const vn = isVN(resolveVal(o.country));
                group.style.display = vn ? '' : 'none';
                if (!vn) { sel.value = ''; return; }
                const prov = resolveVal(o.province);
                const keep = pending || sel.value;
                const list = wards(prov);
                if (pending && list.indexOf(pending) < 0) list.unshift(pending);
                sel.disabled = !prov;
                sel.innerHTML = `<option value="">${prov ? o.placeholder : 'Vui lòng chọn Tỉnh/Thành phố trước'}</option>` + list.map(w => `<option value="${w}">${w}</option>`).join('');
                sel.value = list.indexOf(keep) >= 0 ? keep : '';
                if (prov) pending = '';
            },
            validate: () => {
                const bad = api.isVisible() && !sel.value;
                sel.classList.toggle('is-invalid', bad);
                let err = group.querySelector('.dbvn-err');
                if (bad && !err) { err = document.createElement('div'); err.className = 'dbvn-err'; err.style.cssText = 'color:#DC2626;font-size:12px;margin-top:4px;'; err.textContent = 'Trường này bắt buộc nhập'; group.appendChild(err); }
                if (!bad && err) err.remove();
                return !bad;
            },
            reset: () => { pending = ''; sel.value = ''; api.refresh(); }
        };
        // Chọn giá trị thì xóa lỗi bắt buộc; việc báo lỗi do trang thực hiện khi Lưu/Cập nhật (tránh hiển thị 2 thông báo khác nhau)
        sel.addEventListener('change', () => {
            if (sel.value) { sel.classList.remove('is-invalid'); const err = group.querySelector('.dbvn-err'); if (err) err.remove(); }
            if (o.onChange) o.onChange(sel.value);
        });
        const ids = [o.country, o.province].filter(x => typeof x === 'string');
        // Làm mới sau khi các xử lý khác của trang chạy xong (VD: trang dựng lại ô Tỉnh/Thành phố khi đổi Quốc gia)
        const later = () => setTimeout(api.refresh, 0);
        document.addEventListener('change', e => { if (e.target && ids.indexOf(e.target.id) >= 0) later(); }, true);
        document.addEventListener('input', e => { if (e.target && ids.indexOf(e.target.id) >= 0) later(); }, true);
        registry[o.id] = api;
        api.refresh();
        return api;
    }

    window.DiaBanVN = { bind, get: id => registry[id], wards, isVN, formatAddress, norm };
})();
