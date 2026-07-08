const initApp = () => {
    // Early variables initialization to avoid TDZ reference errors
    let editingRowTC = null;
    let editingRowNTC = null;

    // Current Active Workspace UI elements
    const nguoiYeuCau = document.getElementById('nguoiYeuCau');
    const uploadTaiLieuWrapper = document.getElementById('uploadTaiLieuWrapper');
    const uploadTaiLieu = document.getElementById('uploadTaiLieu');
    const giaTriKhoanVay = document.getElementById('giaTriKhoanVay');
    const coQuanTiepNhan = document.getElementById('coQuanTiepNhan');
    const loaiHinhGiaoDich = document.getElementById('loaiHinhGiaoDich');
    const loaiBienPhap = document.getElementById('loaiBienPhap');
    const loaiHopDong = document.getElementById('loaiHopDong');
    const loaiBienPhapWrapper = document.getElementById('loaiBienPhapWrapper');
    const loaiHopDongWrapper = document.getElementById('loaiHopDongWrapper');
    const soHopDong = document.getElementById('soHopDong');
    const ngayHieuLuc = document.getElementById('ngayHieuLuc');
    const quyMo = document.getElementById('quyMo');
    const tbodySoKhung = document.getElementById('tbodySoKhung');
    const tbodyTauCa = document.getElementById('tbodyTauCa');
    
    const titleBenTheChap = document.getElementById('titleBenTheChap');
    const titleBenNhanTheChap = document.getElementById('titleBenNhanTheChap');
    const btnThemTC = document.getElementById('btnThemTC');
    const btnThemNTC = document.getElementById('btnThemNTC');
    const btnLayNguoiDangKy = document.getElementById('btnLayNguoiDangKy');

    // Dynamic Title mapping for Section V (Tài sản bảo đảm)
    const titleTaiSan = document.getElementById('titleTaiSan');

    // Section III & IV titles map (Aligned with SRS Roman numerals III. & IV. & uppercase buttons)
    const tieuDeMap = {
        // Biện pháp bảo đảm
        the_chap: { t3: 'Bên thế chấp', t4: 'Bên nhận thế chấp', b3: '+ Thêm Bên thế chấp', b4: '+ Thêm Bên nhận thế chấp', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN NHẬN THẾ CHẤP' },
        bao_luu: { t3: 'Bên mua', t4: 'Bên bán', b3: '+ Thêm Bên mua', b4: '+ Thêm Bên bán', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN BÁN' },
        cam_co: { t3: 'Bên cầm cố', t4: 'Bên nhận cầm cố', b3: '+ Thêm Bên cầm cố', b4: '+ Thêm Bên nhận cầm cố', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN NHẬN CẦM CỐ' },
        dat_coc: { t3: 'Bên đặt cọc', t4: 'Bên nhận đặt cọc', b3: '+ Thêm Bên đặt cọc', b4: '+ Thêm Bên nhận đặt cọc', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN NHẬN ĐẶT CỌC' },
        ky_cuoc: { t3: 'Bên ký cược', t4: 'Bên nhận ký cược', b3: '+ Thêm Bên ký cược', b4: '+ Thêm Bên nhận ký cược', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN NHẬN KÝ CƯỢC' },
        ky_quy: { t3: 'Bên ký quỹ', t4: 'Bên có quyền trong ký quỹ', b3: '+ Thêm Bên ký quỹ', b4: '+ Thêm Bên có quyền trong ký quỹ', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN CÓ QUYỀN TRONG KÝ QUỸ' },
        // Hợp đồng
        hd_cho_thue_tc: { t3: 'Bên thuê tài chính', t4: 'Bên cho thuê tài chính', b3: '+ Thêm Bên thuê tài chính', b4: '+ Thêm Bên cho thuê tài chính', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN CHO THUÊ TÀI CHÍNH' },
        hd_thue_ts_1nam: { t3: 'Bên thuê tài sản', t4: 'Bên cho thuê tài sản', b3: '+ Thêm Bên thuê tài sản', b4: '+ Thêm Bên cho thuê tài sản', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN CHO THUÊ TÀI SẢN' },
        hd_chuyen_giao: { t3: 'Bên chuyển giao quyền', t4: 'Bên nhận chuyển giao quyền', b3: '+ Thêm Bên chuyển giao quyền', b4: '+ Thêm Bên nhận chuyển giao quyền', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN NHẬN CHUYỂN GIAO QUYỀN' },
        hd_ky_gui: { t3: 'Bên nhận ký gửi', t4: 'Bên ký gửi', b3: '+ Thêm Bên nhận ký gửi', b4: '+ Thêm Bên ký gửi', b5: 'THÊM NGƯỜI ĐĂNG KÝ LÀ BÊN KÝ GỬI' }
    };

    const tieuDeTaiSanMap = {
        bpbd: 'Tài sản bảo đảm',
        hd_cho_thue_tc: 'Tài sản cho thuê tài chính',
        hd_thue_ts_1nam: 'Tài sản thuê',
        hd_chuyen_giao: 'Quyền đòi nợ, khoản phải thu, quyền yêu cầu thanh toán khác được chuyển giao',
        hd_ky_gui: 'Hàng hóa ký gửi'
    };

    const updateTitles = () => {
        const hinhThuc = loaiHinhGiaoDich.value;
        let selectedSubtype = '';
        if (hinhThuc === 'bpbd') {
            selectedSubtype = loaiBienPhap.value;
        } else if (hinhThuc === 'hop_dong') {
            selectedSubtype = loaiHopDong.value;
        }
        
        if (tieuDeMap[selectedSubtype]) {
            if (titleBenTheChap) titleBenTheChap.innerText = tieuDeMap[selectedSubtype].t3;
            if (titleBenNhanTheChap) titleBenNhanTheChap.innerText = tieuDeMap[selectedSubtype].t4;
            if (btnThemTC) btnThemTC.innerText = tieuDeMap[selectedSubtype].b3;
            if (btnThemNTC) btnThemNTC.innerText = tieuDeMap[selectedSubtype].b4;
            if (btnLayNguoiDangKy) btnLayNguoiDangKy.innerText = tieuDeMap[selectedSubtype].b5;
        }

        // Section V Title (no Roman numeral V.)
        if (titleTaiSan) {
            if (hinhThuc === 'bpbd') {
                titleTaiSan.innerText = tieuDeTaiSanMap.bpbd;
            } else if (hinhThuc === 'hop_dong') {
                titleTaiSan.innerText = tieuDeTaiSanMap[selectedSubtype] || tieuDeTaiSanMap.bpbd;
            }
        }
    };

    // Listeners for structural changes
    uploadTaiLieu?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const actions = document.getElementById('actionsTaiLieu');
        const lnk = document.getElementById('lnkXemFileTaiLieu');
        const lbl = document.getElementById('lblFileNameTaiLieu');
        if (file) {
            const ext = file.name.split('.').pop().toLowerCase();
            if (ext !== 'pdf') {
                alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng .pdf.');
                uploadTaiLieu.value = '';
                if (lbl) lbl.innerText = 'Chưa chọn tệp';
                if (actions) actions.style.display = 'none';
                return;
            }
            if (file.size > 20 * 1024 * 1024) {
                alert('Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.');
                uploadTaiLieu.value = '';
                if (lbl) lbl.innerText = 'Chưa chọn tệp';
                if (actions) actions.style.display = 'none';
                return;
            }
            if (lbl) lbl.innerText = file.name;
            if (lnk) lnk.href = URL.createObjectURL(file);
            if (actions) actions.style.display = 'flex';
        } else {
            if (lbl) lbl.innerText = 'Chưa chọn tệp';
            if (actions) actions.style.display = 'none';
        }
    });

    document.getElementById('lnkXoaFileTaiLieu')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (uploadTaiLieu) uploadTaiLieu.value = '';
        const actions = document.getElementById('actionsTaiLieu');
        const lbl = document.getElementById('lblFileNameTaiLieu');
        if (lbl) lbl.innerText = 'Chưa chọn tệp';
        if (actions) actions.style.display = 'none';
    });

    const fileChungKhoan = document.getElementById('fileChungKhoan');
    fileChungKhoan?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const actions = document.getElementById('actionsChungKhoan');
        const lnk = document.getElementById('lnkXemFileChungKhoan');
        const lbl = document.getElementById('lblFileNameChungKhoan');
        if (file) {
            const ext = file.name.split('.').pop().toLowerCase();
            if (ext !== 'pdf') {
                alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng .pdf.');
                fileChungKhoan.value = '';
                if (lbl) lbl.innerText = 'Chưa chọn tệp';
                if (actions) actions.style.display = 'none';
                return;
            }
            if (file.size > 20 * 1024 * 1024) {
                alert('Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.');
                fileChungKhoan.value = '';
                if (lbl) lbl.innerText = 'Chưa chọn tệp';
                if (actions) actions.style.display = 'none';
                return;
            }
            if (lbl) lbl.innerText = file.name;
            if (lnk) lnk.href = URL.createObjectURL(file);
            if (actions) actions.style.display = 'flex';
        } else {
            if (lbl) lbl.innerText = 'Chưa chọn tệp';
            if (actions) actions.style.display = 'none';
        }
    });

    document.getElementById('lnkXoaFileChungKhoan')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (fileChungKhoan) fileChungKhoan.value = '';
        const actions = document.getElementById('actionsChungKhoan');
        const lbl = document.getElementById('lblFileNameChungKhoan');
        if (lbl) lbl.innerText = 'Chưa chọn tệp';
        if (actions) actions.style.display = 'none';
    });

    if (loaiHinhGiaoDich) {
        loaiHinhGiaoDich.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'hop_dong') {
                loaiBienPhapWrapper.classList.add('hidden');
                loaiHopDongWrapper.classList.remove('hidden');
            } else {
                loaiBienPhapWrapper.classList.remove('hidden');
                loaiHopDongWrapper.classList.add('hidden');
            }
            updateTitles();
            toggleNoticeColumns();
        });
    }

    if (loaiBienPhap) loaiBienPhap.addEventListener('change', updateTitles);
    if (loaiHopDong) loaiHopDong.addEventListener('change', updateTitles);

    // Toggle notice columns in grid based on transaction type (only for Biện pháp bảo đảm)
    const toggleNoticeColumns = () => {
        const isBPBD = loaiHinhGiaoDich.value === 'bpbd';
        const skNoticeHeader = document.querySelector('#tableSoKhung th:nth-child(8)');
        const skNoticeAddrHeader = document.querySelector('#tableSoKhung th:nth-child(9)');
        const ptNoticeHeader = document.querySelector('#tableTauCa th:nth-child(7)');
        const ptNoticeAddrHeader = document.querySelector('#tableTable th:nth-child(8)'); // Wait, let's locate elements safely
        
        // Hide/Show Notice columns in tables
        document.querySelectorAll('.chk-yeucau-sk, .chk-yeucau-tc').forEach(cb => {
            const td = cb.closest('td');
            if (td) {
                if (isBPBD) td.classList.remove('hidden');
                else td.classList.add('hidden');
            }
        });

        document.querySelectorAll('.chk-yeucau-sk').forEach(cb => {
            const td = cb.closest('td');
            if (td) {
                const sibling = td.nextElementSibling;
                if (sibling) {
                    if (isBPBD) sibling.classList.remove('hidden');
                    else sibling.classList.add('hidden');
                }
            }
        });

        document.querySelectorAll('.chk-yeucau-tc').forEach(cb => {
            const td = cb.closest('td');
            if (td) {
                const sibling = td.nextElementSibling;
                if (sibling) {
                    if (isBPBD) sibling.classList.remove('hidden');
                    else sibling.classList.add('hidden');
                }
            }
        });

        // Table headers (Index matching)
        const skTable = document.getElementById('tableSoKhung');
        if (skTable) {
            const th8 = skTable.querySelector('thead tr th:nth-child(8)');
            const th9 = skTable.querySelector('thead tr th:nth-child(9)');
            if (th8) isBPBD ? th8.classList.remove('hidden') : th8.classList.add('hidden');
            if (th9) isBPBD ? th9.classList.remove('hidden') : th9.classList.add('hidden');
        }

        const tcTable = document.getElementById('tableTauCa');
        if (tcTable) {
            const th7 = tcTable.querySelector('thead tr th:nth-child(7)');
            const th8 = tcTable.querySelector('thead tr th:nth-child(8)');
            if (th7) isBPBD ? th7.classList.remove('hidden') : th7.classList.add('hidden');
            if (th8) isBPBD ? th8.classList.remove('hidden') : th8.classList.add('hidden');
        }

        // Hide/Show button "Yêu cầu tất cả"
        const btnYeuCauSK = document.getElementById('btnYeuCauTatCaSK');
        const btnYeuCauTC = document.getElementById('btnYeuCauTatCaTC');
        if (btnYeuCauSK) isBPBD ? btnYeuCauSK.classList.remove('hidden') : btnYeuCauSK.classList.add('hidden');
        if (btnYeuCauTC) isBPBD ? btnYeuCauTC.classList.remove('hidden') : btnYeuCauTC.classList.add('hidden');
    };

    // Conditional File upload wrapper logic
    const toggleUploadTaiLieu = () => {
        if (!nguoiYeuCau || !uploadTaiLieuWrapper || !uploadTaiLieu) return;
        const val = nguoiYeuCau.value;
        const hinhThuc = loaiHinhGiaoDich ? loaiHinhGiaoDich.value : '';
        const bienPhap = loaiBienPhap ? loaiBienPhap.value : '';
        
        let showUpload = false;
        if (val === 'quan_tai_vien' || val === 'chi_nhanh') {
            showUpload = true;
        } else if (val === 'ben_bao_dam' && hinhThuc === 'bpbd' && ['cam_co', 'dat_coc', 'ky_cuoc', 'ky_quy'].includes(bienPhap)) {
            showUpload = true;
        }
        
        if (showUpload) {
            uploadTaiLieuWrapper.classList.remove('hidden');
            uploadTaiLieu.setAttribute('required', '');
        } else {
            uploadTaiLieuWrapper.classList.add('hidden');
            uploadTaiLieu.removeAttribute('required');
        }
    };

    if (nguoiYeuCau) {
        nguoiYeuCau.addEventListener('change', toggleUploadTaiLieu);
    }
    if (loaiHinhGiaoDich) {
        loaiHinhGiaoDich.addEventListener('change', toggleUploadTaiLieu);
    }
    if (loaiBienPhap) {
        loaiBienPhap.addEventListener('change', toggleUploadTaiLieu);
    }
    toggleUploadTaiLieu();

    // Document attachments PDF validator
    const setupFilePDFValidator = (inputEl, displayHelper) => {
        if (!inputEl) return;
        inputEl.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Check format
            const ext = file.name.split('.').pop().toLowerCase();
            if (ext !== 'pdf') {
                alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng .pdf.');
                inputEl.value = '';
                return;
            }

            // Check size (20MB)
            if (file.size > 20 * 1024 * 1024) {
                alert('Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.');
                inputEl.value = '';
                return;
            }
        });
    };
    // setupFilePDFValidator(uploadTaiLieu);

    // Format money on input
    if (giaTriKhoanVay) {
        giaTriKhoanVay.addEventListener('input', function(e) {
            let val = this.value.replace(/\./g, '').replace(/\D/g, '');
            if (val !== '') {
                this.value = Number(val).toLocaleString('vi-VN');
            } else {
                this.value = '';
            }
        });
    }

    // 2. Cascading Address Fields Logic
    const setupCascadingAddress = (countryId, wrapperId, inputSelectId) => {
        const countrySelect = document.getElementById(countryId);
        const wrapper = document.getElementById(wrapperId);
        if (!countrySelect || !wrapper) return;

        countrySelect.addEventListener('change', (e) => {
            const isVietnam = e.target.value === 'Việt Nam';
            if (isVietnam) {
                wrapper.innerHTML = `
                    <label class="form-label">Tỉnh/Thành phố <span class="required-mark">*</span></label>
                    <select class="form-select" id="${inputSelectId}">
                        <option value="" selected>Vui lòng lựa chọn Tỉnh/Thành phố</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                    </select>
                `;
            } else {
                wrapper.innerHTML = `
                    <label class="form-label">Tỉnh/Thành phố <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="${inputSelectId}" placeholder="Nhập Tỉnh/Thành phố/Bang">
                `;
            }
        });
    };

    const populateCountryDropdown = (selectId) => {
        const select = document.getElementById(selectId);
        if (select && typeof countriesList !== 'undefined') {
            select.innerHTML = '';
            // Always put 'Việt Nam' first and select it
            const vnOpt = document.createElement('option');
            vnOpt.value = 'Việt Nam';
            vnOpt.textContent = 'Việt Nam';
            vnOpt.selected = true;
            select.appendChild(vnOpt);
            
            // Add other countries sorted alphabetically
            Object.values(countriesList)
                .filter(name => name !== 'Việt Nam')
                .sort((a, b) => a.localeCompare(b, 'vi'))
                .forEach(name => {
                    const opt = document.createElement('option');
                    opt.value = name;
                    opt.textContent = name;
                    select.appendChild(opt);
                });
        }
    };
    
    populateCountryDropdown('tc_quocgia');
    populateCountryDropdown('ntc_quocgia');

    setupCascadingAddress('tc_quocgia', 'tc_tinhthanh_wrapper', 'tc_tinhthanh_select');
    setupCascadingAddress('ntc_quocgia', 'ntc_tinhthanh_wrapper', 'ntc_tinhthanh_select');
    document.getElementById('tc_quocgia')?.dispatchEvent(new Event('change'));
    document.getElementById('ntc_quocgia')?.dispatchEvent(new Event('change'));

    // 3. Grid Bên thế chấp operations
    const subFormBenTheChap = document.getElementById('subFormBenTheChap');
    const loaiChuTheTC = document.getElementById('loaiChuTheTC');
    const formChuTheWrapper = document.getElementById('formChuTheWrapper');
    const formDiaChiChung = document.getElementById('formDiaChiChung');
    const footerActionChuThe = document.getElementById('footerActionChuThe');
    const btnHuyTC = document.getElementById('btnHuyTC');
    const btnLuuTC = document.getElementById('btnLuuTC');
    const tbodyTC = document.getElementById('tbodyTC');
    const wrapperTableTC = document.getElementById('wrapperTableTC');

    btnThemTC.addEventListener('click', () => {
        subFormBenTheChap.classList.remove('hidden');
        btnThemTC.classList.add('hidden');
        btnHuyTC.classList.remove('hidden');
        loaiChuTheTC.value = 'cd_vn';
        loaiChuTheTC.dispatchEvent(new Event('change'));
        
        // Reset form inputs
        resetTCForm();
    });

    btnHuyTC.addEventListener('click', () => {
        subFormBenTheChap.classList.add('hidden');
        btnThemTC.classList.remove('hidden');
        btnHuyTC.classList.add('hidden');
        btnLuuTC.innerText = 'LƯU';
        editingRowTC = null;
    });

    const resetTCForm = () => {
        const inputs = subFormBenTheChap.querySelectorAll('input, select, textarea');
        inputs.forEach(i => {
            if (i.id !== 'loaiChuTheTC' && i.id !== 'tc_quocgia') {
                i.value = '';
                i.classList.remove('is-invalid');
                const err = i.parentElement.querySelector('.error-text');
                if (err) err.remove();
            }
        });
    };

    const renderChuTheFields = (type) => {
        let html = '';
        if (type === 'cd_vn') {
            html = `
                <div class="form-group">
                    <label class="form-label">Họ và tên <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_ten" required>
                </div>
                <div class="form-group">
                    <label class="form-label" style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 5px;">
                        <span>Số CMND/Căn cước công dân/Chứng minh quân đội <span class="required-mark">*</span></span>
                        <span class="help-link" style="font-size:11.5px; font-weight:500;" data-tooltip="Nhập số CMND/Căn cước công dân/Chứng minh quân đội hợp lệ (12 chữ số). Không chấp nhận chữ cái hay ký tự đặc biệt.">(Hướng dẫn)</span>
                    </label>
                    <input type="text" class="form-control" id="tt_sogiayto" required>
                </div>
            `;
        } else if (type === 'tc_vn') {
            html = `
                <div class="form-group">
                    <label class="form-label">Tên tổ chức <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_ten" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Mã số thuế <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_sogiayto" required>
                </div>
            `;
        } else if (type === 'nn') {
            let countryOptions = '<option value="" selected>-- Chọn quốc gia --</option>';
            if (typeof countriesList !== 'undefined') {
                Object.values(countriesList).sort((a, b) => a.localeCompare(b, 'vi')).forEach(countryName => {
                    countryOptions += `<option value="${countryName}">${countryName}</option>`;
                });
            } else {
                countryOptions += `
                    <option value="Mỹ">Mỹ</option>
                    <option value="Anh">Anh</option>
                    <option value="Nhật Bản">Nhật Bản</option>
                    <option value="Hàn Quốc">Hàn Quốc</option>
                `;
            }

            html = `
                <div class="form-group">
                    <label class="form-label">Họ và tên <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_ten" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Số Hộ chiếu <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_sogiayto" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Quốc gia cấp hộ chiếu</label>
                    <select class="form-select" id="tt_quocgiacap">
                        ${countryOptions}
                    </select>
                </div>
            `;
        } else if (type === 'ndt_nn') {
            html = `
                <div class="form-group">
                    <label class="form-label">Tên <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_ten" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Mã số thuế <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_sogiayto" required>
                </div>
            `;
        } else if (type === 'tc_khac') {
            html = `
                <div class="form-group">
                    <label class="form-label">Tên <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_ten" required>
                    <input type="hidden" id="tt_sogiayto" value="-">
                </div>
            `;
        } else if (type === 'k_qt') {
            html = `
                <div class="form-group">
                    <label class="form-label">Họ và tên <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_ten" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Thẻ cư trú <span class="required-mark">*</span></label>
                    <input type="text" class="form-control" id="tt_sogiayto" required>
                </div>
            `;
        }
        return html;
    };

    loaiChuTheTC.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
            formChuTheWrapper.innerHTML = renderChuTheFields(val);
            formChuTheWrapper.classList.remove('hidden');
            formDiaChiChung.classList.remove('hidden');
            footerActionChuThe.classList.remove('hidden');
        } else {
            formChuTheWrapper.classList.add('hidden');
            formDiaChiChung.classList.add('hidden');
            footerActionChuThe.classList.add('hidden');
        }
    });

    btnLuuTC.addEventListener('click', () => {
        // Clear errors
        subFormBenTheChap.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        subFormBenTheChap.querySelectorAll('.error-text').forEach(el => el.remove());

        let localValid = true;
        const addError = (el, text) => {
            localValid = false;
            el.classList.add('is-invalid');
            const span = document.createElement('span');
            span.className = 'error-text';
            span.innerText = text;
            el.parentElement.appendChild(span);
        };

        // Validate basic fields
        const elTen = document.getElementById('tt_ten');
        const elGiayTo = document.getElementById('tt_sogiayto');
        const elQuocGia = document.getElementById('tc_quocgia');
        const elTinhThanh = document.getElementById('tc_tinhthanh_select') || document.getElementById('tc_tinhthanh_input');
        const elDiaChi = document.getElementById('tc_diachi');

        if (elTen && !elTen.value.trim()) addError(elTen, 'Đây là trường bắt buộc');
        if (elGiayTo && !elGiayTo.value.trim()) {
            addError(elGiayTo, 'Đây là trường bắt buộc');
        } else if (elGiayTo && loaiChuTheTC.value === 'cd_vn') {
            const cleanVal = elGiayTo.value.trim();
            if (!/^\d{12}$/.test(cleanVal)) {
                addError(elGiayTo, 'Số CMND/Căn cước công dân/Chứng minh quân đội không hợp lệ (Bắt buộc 12 chữ số)');
            }
        }

        if (elQuocGia && !elQuocGia.value) addError(elQuocGia, 'Đây là trường bắt buộc');
        if (elTinhThanh && !elTinhThanh.value.trim()) addError(elTinhThanh, 'Đây là trường bắt buộc');
        if (elDiaChi && !elDiaChi.value.trim()) addError(elDiaChi, 'Đây là trường bắt buộc');

        if (!localValid) return;

        const valTen = elTen.value.trim();
        const valGiayTo = elGiayTo.value.trim();
        const valQuocGia = elQuocGia.value;
        const valTinhThanh = elTinhThanh.value.trim();
        const valDiaChi = elDiaChi.value.trim();
        const fullAddr = `${valDiaChi} - ${valTinhThanh} - ${valQuocGia}`;

        // Duplicate Check
        const rows = Array.from(tbodyTC.querySelectorAll('tr')).filter(r => r.dataset.giayTo);
        const isDuplicate = rows.some(r => r.dataset.giayTo === valGiayTo && r !== editingRowTC && valGiayTo !== '-');
        if (isDuplicate) {
            alert('Chủ thể này đã tồn tại trong danh sách. Vui lòng kiểm tra lại.');
            return;
        }

        if (editingRowTC) {
            // Update
            editingRowTC.dataset.loai = loaiChuTheTC.value;
            editingRowTC.dataset.ten = valTen;
            editingRowTC.dataset.giayTo = valGiayTo;
            editingRowTC.dataset.diachi = valDiaChi;
            editingRowTC.dataset.tinhthanh = valTinhThanh;
            editingRowTC.dataset.quocgia = valQuocGia;

            editingRowTC.children[1].innerText = loaiChuTheTC.options[loaiChuTheTC.selectedIndex].text;
            editingRowTC.children[2].innerText = valGiayTo;
            editingRowTC.children[3].innerText = valTen;
            editingRowTC.children[4].innerText = fullAddr;
            
            btnLuuTC.innerText = 'LƯU';
            editingRowTC = null;
        } else {
            // Insert
            if (tbodyTC.children.length === 1 && tbodyTC.querySelector('td[colspan]')) {
                tbodyTC.innerHTML = '';
            }

            const tr = document.createElement('tr');
            tr.dataset.loai = loaiChuTheTC.value;
            tr.dataset.ten = valTen;
            tr.dataset.giayTo = valGiayTo;
            tr.dataset.diachi = valDiaChi;
            tr.dataset.tinhthanh = valTinhThanh;
            tr.dataset.quocgia = valQuocGia;

            tr.innerHTML = `
                <td>
                    <button type="button" class="btn btn-outline-primary btn-sua-tc" style="padding: 4px 8px; font-size: 12px;">Sửa</button>
                    <button type="button" class="btn btn-danger btn-xoa-tc" style="padding: 4px 8px; font-size: 12px;">Xóa</button>
                </td>
                <td>${loaiChuTheTC.options[loaiChuTheTC.selectedIndex].text}</td>
                <td>${valGiayTo}</td>
                <td>${valTen}</td>
                <td>${fullAddr}</td>
            `;

            tr.querySelector('.btn-xoa-tc').addEventListener('click', () => {
                tr.remove();
                if (tbodyTC.children.length === 0) {
                    tbodyTC.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Chưa có dữ liệu.</td></tr>';
                }
            });

            tr.querySelector('.btn-sua-tc').addEventListener('click', () => {
                editingRowTC = tr;
                loaiChuTheTC.value = tr.dataset.loai;
                loaiChuTheTC.dispatchEvent(new Event('change'));

                // Use timeout to let fields render
                setTimeout(() => {
                    const tenInput = document.getElementById('tt_ten');
                    const giaytoInput = document.getElementById('tt_sogiayto');
                    const qgSelect = document.getElementById('tc_quocgia');
                    
                    if (tenInput) tenInput.value = tr.dataset.ten;
                    if (giaytoInput) giaytoInput.value = tr.dataset.giayTo;
                    if (qgSelect) {
                        qgSelect.value = tr.dataset.quocgia;
                        qgSelect.dispatchEvent(new Event('change'));
                        setTimeout(() => {
                            const ttField = document.getElementById('tc_tinhthanh_select') || document.getElementById('tc_tinhthanh_input');
                            if (ttField) ttField.value = tr.dataset.tinhthanh;
                        }, 20);
                    }
                    const dcInput = document.getElementById('tc_diachi');
                    if (dcInput) dcInput.value = tr.dataset.diachi;
                }, 50);

                btnLuuTC.innerText = 'CẬP NHẬT';
                subFormBenTheChap.classList.remove('hidden');
                btnThemTC.classList.add('hidden');
                btnHuyTC.classList.remove('hidden');
            });

            tbodyTC.appendChild(tr);
        }

        subFormBenTheChap.classList.add('hidden');
        wrapperTableTC.classList.remove('hidden');
        btnThemTC.classList.remove('hidden');
        btnHuyTC.classList.add('hidden');
    });

    // 4. Grid Bên nhận thế chấp operations
    const subFormBenNhanTheChap = document.getElementById('subFormBenNhanTheChap');
    const btnHuyNTC = document.getElementById('btnHuyNTC');
    const btnLuuNTC = document.getElementById('btnLuuNTC');
    const tbodyNTC = document.getElementById('tbodyNTC');
    const wrapperTableNTC = document.getElementById('wrapperTableNTC');

    btnThemNTC.addEventListener('click', () => {
        subFormBenNhanTheChap.classList.remove('hidden');
        btnThemNTC.classList.add('hidden');
        btnHuyNTC.classList.remove('hidden');
        resetNTCForm();
    });

    btnHuyNTC.addEventListener('click', () => {
        subFormBenNhanTheChap.classList.add('hidden');
        btnThemNTC.classList.remove('hidden');
        btnHuyNTC.classList.add('hidden');
        btnLuuNTC.innerText = 'LƯU';
        editingRowNTC = null;
    });

    const resetNTCForm = () => {
        document.getElementById('ntc_ten').value = '';
        document.getElementById('ntc_quocgia').value = 'Việt Nam';
        document.getElementById('ntc_quocgia').dispatchEvent(new Event('change'));
        document.getElementById('ntc_diachi').value = '';
        subFormBenNhanTheChap.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        subFormBenNhanTheChap.querySelectorAll('.error-text').forEach(el => el.remove());
    };

    btnLuuNTC.addEventListener('click', () => {
        subFormBenNhanTheChap.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        subFormBenNhanTheChap.querySelectorAll('.error-text').forEach(el => el.remove());

        let localValid = true;
        const addError = (el, text) => {
            localValid = false;
            el.classList.add('is-invalid');
            const span = document.createElement('span');
            span.className = 'error-text';
            span.innerText = text;
            el.parentElement.appendChild(span);
        };

        const elTen = document.getElementById('ntc_ten');
        const elQuocGia = document.getElementById('ntc_quocgia');
        const elTinhThanh = document.getElementById('ntc_tinhthanh_select') || document.getElementById('ntc_tinhthanh_input');
        const elDiaChi = document.getElementById('ntc_diachi');

        if (elTen && !elTen.value.trim()) addError(elTen, 'Đây là trường bắt buộc');
        if (elQuocGia && !elQuocGia.value) addError(elQuocGia, 'Đây là trường bắt buộc');
        if (elTinhThanh && !elTinhThanh.value.trim()) addError(elTinhThanh, 'Đây là trường bắt buộc');
        if (elDiaChi && !elDiaChi.value.trim()) addError(elDiaChi, 'Đây là trường bắt buộc');

        if (!localValid) return;

        const valTen = elTen.value.trim();
        const valQuocGia = elQuocGia.value;
        const valTinhThanh = elTinhThanh.value.trim();
        const valDiaChi = elDiaChi.value.trim();
        const fullAddr = `${valDiaChi} - ${valTinhThanh} - ${valQuocGia}`;

        // Duplicate Check by Name and address
        const rows = Array.from(tbodyNTC.querySelectorAll('tr')).filter(r => r.dataset.ten);
        const isDuplicate = rows.some(r => r.dataset.ten === valTen && r.dataset.diachi === valDiaChi && r !== editingRowNTC);
        if (isDuplicate) {
            alert('Chủ thể này đã tồn tại trong danh sách. Vui lòng kiểm tra lại.');
            return;
        }

        if (editingRowNTC) {
            editingRowNTC.dataset.ten = valTen;
            editingRowNTC.dataset.diachi = valDiaChi;
            editingRowNTC.dataset.tinhthanh = valTinhThanh;
            editingRowNTC.dataset.quocgia = valQuocGia;

            editingRowNTC.children[1].innerText = valTen;
            editingRowNTC.children[2].innerText = fullAddr;
            editingRowNTC.children[3].innerText = valTinhThanh;
            editingRowNTC.children[4].innerText = valQuocGia;

            btnLuuNTC.innerText = 'LƯU';
            editingRowNTC = null;
        } else {
            if (tbodyNTC.children.length === 1 && tbodyNTC.querySelector('td[colspan]')) {
                tbodyNTC.innerHTML = '';
            }

            const tr = document.createElement('tr');
            tr.dataset.ten = valTen;
            tr.dataset.diachi = valDiaChi;
            tr.dataset.tinhthanh = valTinhThanh;
            tr.dataset.quocgia = valQuocGia;

            tr.innerHTML = `
                <td>
                    <button type="button" class="btn btn-outline-primary btn-sua-ntc" style="padding: 4px 8px; font-size: 12px;">Sửa</button>
                    <button type="button" class="btn btn-danger btn-xoa-ntc" style="padding: 4px 8px; font-size: 12px;">Xóa</button>
                </td>
                <td>${valTen}</td>
                <td>${fullAddr}</td>
                <td>${valTinhThanh}</td>
                <td>${valQuocGia}</td>
            `;

            tr.querySelector('.btn-xoa-ntc').addEventListener('click', () => {
                tr.remove();
                if (tbodyNTC.children.length === 0) {
                    tbodyNTC.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Chưa có dữ liệu.</td></tr>';
                }
            });

            tr.querySelector('.btn-sua-ntc').addEventListener('click', () => {
                editingRowNTC = tr;
                elTen.value = tr.dataset.ten;
                elQuocGia.value = tr.dataset.quocgia;
                elQuocGia.dispatchEvent(new Event('change'));
                
                setTimeout(() => {
                    const ttField = document.getElementById('ntc_tinhthanh_select') || document.getElementById('ntc_tinhthanh_input');
                    if (ttField) ttField.value = tr.dataset.tinhthanh;
                }, 20);
                
                elDiaChi.value = tr.dataset.diachi;

                btnLuuNTC.innerText = 'CẬP NHẬT';
                subFormBenNhanTheChap.classList.remove('hidden');
                btnThemNTC.classList.add('hidden');
                btnHuyNTC.classList.remove('hidden');
            });

            tbodyNTC.appendChild(tr);
        }

        subFormBenNhanTheChap.classList.add('hidden');
        wrapperTableNTC.classList.remove('hidden');
        btnThemNTC.classList.remove('hidden');
        btnHuyNTC.classList.add('hidden');
    });

    // Copy Logged In User to Bên Nhận Thế Chấp
    if (btnLayNguoiDangKy) {
        btnLayNguoiDangKy.addEventListener('click', () => {
            const elTen = document.getElementById('ntc_ten');
            const elQuocGia = document.getElementById('ntc_quocgia');
            const elDiaChi = document.getElementById('ntc_diachi');

            if (elTen) elTen.value = "CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ VÀ TRUYỀN THÔNG FIS";
            if (elQuocGia) {
                elQuocGia.value = "Việt Nam";
                elQuocGia.dispatchEvent(new Event('change'));
            }
            if (elDiaChi) elDiaChi.value = "Số 10, Phố Duy Tân, Phường Dịch Vọng Hậu, Quận Cầu Giấy";

            setTimeout(() => {
                const ttField = document.getElementById('ntc_tinhthanh_select') || document.getElementById('ntc_tinhthanh_input');
                if (ttField) ttField.value = "Hà Nội";
            }, 20);

            // Open the subform and adjust buttons
            subFormBenNhanTheChap.classList.remove('hidden');
            btnThemNTC.classList.add('hidden');
            btnHuyNTC.classList.remove('hidden');
            
            // Hide this button immediately since it was clicked once
            btnLayNguoiDangKy.classList.add('hidden');
        });
    }

    // 5. Form Show/Hide based on asset categories
    const toggles = [
        { chk: 'chkSoKhung', grid: 'gridSoKhung' },
        { chk: 'chkTauCa', grid: 'gridTauCa' },
        { chk: 'chkQuyenTaiSan', grid: 'gridQuyenTaiSan' },
        { chk: 'chkHangHoa', grid: 'gridHangHoa' },
        { chk: 'chkChungKhoan', grid: 'gridChungKhoan' }
    ];

    toggles.forEach(t => {
        const chk = document.getElementById(t.chk);
        const grid = document.getElementById(t.grid);
        if (chk && grid) {
            chk.addEventListener('change', (e) => {
                if (e.target.checked) {
                    grid.classList.remove('hidden');
                    if (t.chk === 'chkTauCa') {
                        if (tbodyTauCa && tbodyTauCa.querySelectorAll('tr').length === 0) {
                            document.getElementById('btnThemTauCa')?.click();
                        }
                    }
                } else {
                    grid.classList.add('hidden');
                }
            });
        }
    });

    // Goods vs Warehouse Radio Logic
    const radioLuanchuyen = document.getElementById('radioLuanchuyen');
    const radioKhoHang = document.getElementById('radioKhoHang');
    const fieldsKhoHang = document.getElementById('fieldsKhoHang');

    if (radioLuanchuyen && radioKhoHang && fieldsKhoHang) {
        const toggleKhoHang = () => {
            if (radioKhoHang.checked) {
                fieldsKhoHang.classList.remove('hidden');
            } else {
                fieldsKhoHang.classList.add('hidden');
            }
        };
        radioLuanchuyen.addEventListener('change', toggleKhoHang);
        radioKhoHang.addEventListener('change', toggleKhoHang);
    }

    // 6. Grid Số Khung operations
    const chkAllSK = document.getElementById('chkAllSK');

    document.getElementById('btnThemSoKhung')?.addEventListener('click', () => {
        const tr = document.createElement('tr');
        const count = tbodySoKhung.querySelectorAll('tr').length + 1;
        const isBPBD = loaiHinhGiaoDich.value === 'bpbd';

        tr.innerHTML = `
            <td style="text-align: center;"><input type="checkbox" class="chk-row-sk"></td>
            <td class="stt-sk">${count}</td>
            <td>
                <select class="form-control" required>
                    <option value="Ô tô">Ô tô</option>
                    <option value="Mô tô">Mô tô</option>
                </select>
            </td>
            <td><input type="text" class="form-control" required></td>
            <td><input type="text" class="form-control" required></td>
            <td><input type="text" class="form-control"></td>
            <td><input type="text" class="form-control"></td>
            <td style="text-align: center;" class="${isBPBD ? '' : 'hidden'}"><input type="checkbox" class="chk-yeucau-sk" style="width:18px; height:18px;"></td>
            <td class="${isBPBD ? '' : 'hidden'}"><input type="text" class="form-control"></td>
            <td><button type="button" class="btn btn-danger btn-xoa-row-sk" style="padding: 4px 8px; font-size:12px;">X</button></td>
        `;
        tbodySoKhung.appendChild(tr);
    });

    chkAllSK?.addEventListener('change', (e) => {
        tbodySoKhung.querySelectorAll('.chk-row-sk').forEach(cb => cb.checked = e.target.checked);
    });

    document.getElementById('btnXoaSoKhung')?.addEventListener('click', () => {
        const checkedRows = tbodySoKhung.querySelectorAll('.chk-row-sk:checked');
        if (checkedRows.length === 0) {
            showWarning('Lỗi xóa số khung', 'Vui lòng tích chọn ít nhất một số khung để thực hiện thao tác xóa.', true, false);
            return;
        }
        tbodySoKhung.querySelectorAll('tr').forEach(tr => {
            if (tr.querySelector('.chk-row-sk')?.checked) tr.remove();
        });
        resetSKIndices();
    });

    tbodySoKhung?.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-xoa-row-sk')) {
            e.target.closest('tr').remove();
            resetSKIndices();
        }
    });

    document.getElementById('btnYeuCauTatCaSK')?.addEventListener('click', () => {
        const cbs = tbodySoKhung.querySelectorAll('.chk-yeucau-sk');
        const anyUnchecked = Array.from(cbs).some(cb => !cb.checked);
        cbs.forEach(cb => cb.checked = anyUnchecked);
    });

    const resetSKIndices = () => {
        tbodySoKhung.querySelectorAll('.stt-sk').forEach((td, i) => td.innerText = i + 1);
        if (chkAllSK) chkAllSK.checked = false;
    };

    // 7. Grid Phương Tiện operations
    const chkAllTC = document.getElementById('chkAllTC');

    document.getElementById('btnThemTauCa')?.addEventListener('click', () => {
        const tr = document.createElement('tr');
        const count = tbodyTauCa.querySelectorAll('tr').length + 1;
        const isBPBD = loaiHinhGiaoDich.value === 'bpbd';

        tr.innerHTML = `
            <td style="text-align: center;"><input type="checkbox" class="chk-row-tc"></td>
            <td class="stt-tc">${count}</td>
            <td><input type="text" class="form-control" required></td>
            <td><input type="text" class="form-control" required></td>
            <td><input type="text" class="form-control"></td>
            <td><input type="text" class="form-control"></td>
            <td style="text-align: center;" class="${isBPBD ? '' : 'hidden'}"><input type="checkbox" class="chk-yeucau-tc" style="width:18px; height:18px;"></td>
            <td class="${isBPBD ? '' : 'hidden'}"><input type="text" class="form-control"></td>
            <td><button type="button" class="btn btn-danger btn-xoa-row-tc" style="padding: 4px 8px; font-size:12px;">X</button></td>
        `;
        tbodyTauCa.appendChild(tr);
    });

    chkAllTC?.addEventListener('change', (e) => {
        tbodyTauCa.querySelectorAll('.chk-row-tc').forEach(cb => cb.checked = e.target.checked);
    });

    document.getElementById('btnXoaTauCa')?.addEventListener('click', () => {
        tbodyTauCa.querySelectorAll('tr').forEach(tr => {
            if (tr.querySelector('.chk-row-tc')?.checked) tr.remove();
        });
        resetTCIndices();
    });

    tbodyTauCa?.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-xoa-row-tc')) {
            e.target.closest('tr').remove();
            resetTCIndices();
        }
    });

    document.getElementById('btnYeuCauTatCaTC')?.addEventListener('click', () => {
        const cbs = tbodyTauCa.querySelectorAll('.chk-yeucau-tc');
        const anyUnchecked = Array.from(cbs).some(cb => !cb.checked);
        cbs.forEach(cb => cb.checked = anyUnchecked);
    });

    const resetTCIndices = () => {
        tbodyTauCa.querySelectorAll('.stt-tc').forEach((td, i) => td.innerText = i + 1);
        if (chkAllTC) chkAllTC.checked = false;
    };


    // 8. Excel Import Modal Simulation (Thành công một phần)
    const importModal = document.getElementById('importModal');
    const btnCloseImportModal = document.getElementById('btnCloseImportModal');
    const btnCancelImport = document.getElementById('btnCancelImport');
    const btnDownloadTemplateInModal = document.getElementById('btnDownloadTemplateInModal');
    const dropzoneExcel = document.getElementById('dropzoneExcel');
    const fileExcelInput = document.getElementById('fileExcelInput');
    const importProgressWrapper = document.getElementById('importProgressWrapper');
    const importProgressBar = document.getElementById('importProgressBar');
    const importProgressPercent = document.getElementById('importProgressPercent');
    const importResultWrapper = document.getElementById('importResultWrapper');
    const importSuccessSummary = document.getElementById('importSuccessSummary');
    const importErrorSummary = document.getElementById('importErrorSummary');
    const importErrorContainer = document.getElementById('importErrorContainer');
    const tbodyImportErrors = document.getElementById('tbodyImportErrors');
    const btnSubmitImport = document.getElementById('btnSubmitImport');

    let currentImportType = 'sk'; // 'sk' = Số khung, 'pt' = Phương tiện
    let importedValidRecords = [];

    const openImportModal = (type) => {
        currentImportType = type;
        document.getElementById('importModalTitle').innerText = type === 'sk' ? 'Tải lên danh sách Số khung' : 'Tải lên danh sách Phương tiện';
        
        // Reset states
        importedValidRecords = [];
        fileExcelInput.value = '';
        importProgressWrapper.classList.add('hidden');
        importResultWrapper.classList.add('hidden');
        importErrorContainer.classList.add('hidden');
        btnSubmitImport.disabled = true;
        document.getElementById('dropzoneText').innerText = 'Kéo thả tệp tin Excel (.xls, .xlsx) vào đây hoặc click để chọn tệp';
        
        importModal.classList.remove('hidden');
    };

    document.getElementById('btnImportSK')?.addEventListener('click', () => openImportModal('sk'));
    document.getElementById('btnImportPT')?.addEventListener('click', () => openImportModal('pt'));

    const closeImport = () => importModal.classList.add('hidden');
    btnCloseImportModal?.addEventListener('click', closeImport);
    btnCancelImport?.addEventListener('click', closeImport);

    // File download simulation from forms or modal
    const downloadTemplateFile = () => {
        const isBPBD = loaiHinhGiaoDich.value === 'bpbd';
        let filename = '';
        if (currentImportType === 'sk') {
            filename = isBPBD ? 'Mau_Import_SoKhung_BPBD.xlsx' : 'Mau_Import_SoKhung_HopDong.xlsx';
        } else {
            filename = isBPBD ? 'Mau_Import_PhuongTien_BPBD.xlsx' : 'Mau_Import_PhuongTien_HopDong.xlsx';
        }
        
        // Simulate download
        alert('Đang tải xuống biểu mẫu: ' + filename);
    };

    btnDownloadTemplateInModal?.addEventListener('click', downloadTemplateFile);
    document.getElementById('btnFileMauSK')?.addEventListener('click', () => { currentImportType = 'sk'; downloadTemplateFile(); });
    document.getElementById('btnFileMauPT')?.addEventListener('click', () => { currentImportType = 'pt'; downloadTemplateFile(); });

    dropzoneExcel?.addEventListener('click', () => fileExcelInput.click());
    fileExcelInput?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    fileExcelInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleExcelUpload(file);
    });

    // Drag & Drop
    dropzoneExcel?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzoneExcel.style.borderColor = 'var(--secondary-color)';
    });
    dropzoneExcel?.addEventListener('dragleave', () => {
        dropzoneExcel.style.borderColor = 'var(--border-color)';
    });
    dropzoneExcel?.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzoneExcel.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file) handleExcelUpload(file);
    });

    const handleExcelUpload = (file) => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext !== 'xls' && ext !== 'xlsx') {
            alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng Excel (.xls, .xlsx).');
            return;
        }
        if (file.size > 20 * 1024 * 1024) {
            alert('Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.');
            return;
        }

        document.getElementById('dropzoneText').innerText = file.name;
        simulateImportProgress();
    };

    const simulateImportProgress = () => {
        importProgressWrapper.classList.remove('hidden');
        importResultWrapper.classList.add('hidden');
        btnSubmitImport.disabled = true;
        
        let progress = 0;
        importProgressBar.style.width = '0%';
        importProgressPercent.innerText = '0%';

        const interval = setInterval(() => {
            progress += 10;
            importProgressBar.style.width = progress + '%';
            importProgressPercent.innerText = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(showImportResults, 200);
            }
        }, 150);
    };

    const showImportResults = () => {
        importProgressWrapper.classList.add('hidden');
        importResultWrapper.classList.remove('hidden');
        tbodyImportErrors.innerHTML = '';
        
        const isBPBD = loaiHinhGiaoDich.value === 'bpbd';

        if (currentImportType === 'sk') {
            // Simulated Số khung import
            importedValidRecords = [
                { loai: 'Ô tô', hieu: 'Toyota Camry', khung: 'TOYOTA839210', may: '2AZ-FE', bien: '30K-123.45', yeucau: true, coquan: 'Cục Cảnh sát giao thông' },
                { loai: 'Mô tô', hieu: 'Honda SH', khung: 'HONDA928371', may: 'JF56E', bien: '29H1-999.99', yeucau: false, coquan: '' },
                { loai: 'Ô tô', hieu: 'Ford Ranger', khung: 'FORD773910', may: 'EcoBlue', bien: '29C-555.22', yeucau: true, coquan: 'Phòng CSGT Hà Nội' },
                { loai: 'Ô tô', hieu: 'Mazda CX5', khung: 'MAZDA110292', may: 'SkyActiv', bien: '30E-882.11', yeucau: false, coquan: '' },
                { loai: 'Mô tô', hieu: 'Yamaha Exciter', khung: 'YAMAHA291039', may: 'G3D4E', bien: '29G1-234.56', yeucau: false, coquan: '' },
                { loai: 'Ô tô', hieu: 'Kia Morning', khung: 'KIA938102', may: 'Kappa', bien: '30A-992.83', yeucau: true, coquan: 'Cục Cảnh sát giao thông' },
                { loai: 'Ô tô', hieu: 'Hyundai Accent', khung: 'HYUNDAI88201', may: 'Kappa', bien: '30G-739.10', yeucau: false, coquan: '' }
            ];

            const errors = [
                { line: 3, msg: 'Số khung chứa ký tự không hợp lệ.' },
                { line: 5, msg: 'Nhãn hiệu, màu sơn không được để trống.' },
                { line: 8, msg: 'Cơ quan tiếp nhận thông báo không được để trống do có yêu cầu thông báo thế chấp.' }
            ];

            importSuccessSummary.innerText = `Thành công: ${importedValidRecords.length} dòng.`;
            importErrorSummary.innerText = `Lỗi: ${errors.length} dòng (Bị loại bỏ).`;

            if (errors.length > 0) {
                importErrorContainer.classList.remove('hidden');
                errors.forEach(e => {
                    tbodyImportErrors.innerHTML += `
                        <tr>
                            <td style="font-weight:600; text-align:center;">Dòng ${e.line}</td>
                            <td>Dòng ${e.line}: ${e.msg}</td>
                        </tr>
                    `;
                });
            }
        } else {
            // Simulated Phương tiện import
            importedValidRecords = [
                { hieu: 'Tàu cá HP-9028', chu: 'Bùi Văn Hán', soGCN: 'HP9028-GCN', cap: 'Cấp I', yeucau: true, coquan: 'Chi cục Thủy sản Hải Phòng' },
                { hieu: 'Sà lan SG-3829', chu: 'Công ty Vận tải Sông Biển', soGCN: 'SG3829-GCN', cap: 'Cấp II', yeucau: false, coquan: '' },
                { hieu: 'Đầu kéo lửa D19E', chu: 'Tổng công ty Đường sắt VN', soGCN: 'DSVN-190', cap: 'Cấp I', yeucau: false, coquan: '' },
                { hieu: 'Tàu cá QB-99281', chu: 'Trần Văn Nam', soGCN: 'QB99281-GCN', cap: 'Cấp III', yeucau: true, coquan: 'Chi cục Thủy sản Quảng Bình' },
                { hieu: 'Tàu vỏ gỗ ĐNa-9302', chu: 'Lê Văn Tám', soGCN: 'DNA9302-GCN', cap: 'Cấp II', yeucau: false, coquan: '' },
                { hieu: 'Máy kéo Belarus', chu: 'Hợp tác xã nông nghiệp 1', soGCN: 'BLR-9382', cap: 'Cấp I', yeucau: false, coquan: '' },
                { hieu: 'Tàu kéo biển Đà Nẵng', chu: 'Công ty Cảng Đà Nẵng', soGCN: 'DN-TUG-01', cap: 'Cấp II', yeucau: true, coquan: 'Cảng vụ Hàng hải Đà Nẵng' }
            ];

            const errors = [
                { line: 2, msg: 'Tên phương tiện không được để trống.' },
                { line: 4, msg: 'Tên/Họ tên chủ sở hữu không được để trống.' },
                { line: 9, msg: 'Số đăng ký chứa ký tự không hợp lệ.' }
            ];

            importSuccessSummary.innerText = `Thành công: ${importedValidRecords.length} dòng.`;
            importErrorSummary.innerText = `Lỗi: ${errors.length} dòng (Bị loại bỏ).`;

            if (errors.length > 0) {
                importErrorContainer.classList.remove('hidden');
                errors.forEach(e => {
                    tbodyImportErrors.innerHTML += `
                        <tr>
                            <td style="font-weight:600; text-align:center;">Dòng ${e.line}</td>
                            <td>Dòng ${e.line}: ${e.msg}</td>
                        </tr>
                    `;
                });
            }
        }

        btnSubmitImport.disabled = importedValidRecords.length === 0;
    };

    btnSubmitImport?.addEventListener('click', () => {
        const isRowBlank = (tr) => {
            const inputs = tr.querySelectorAll('input[type="text"]');
            for (let input of inputs) {
                if (input.value.trim() !== '') return false;
            }
            return true;
        };

        if (currentImportType === 'sk') {
            // Add valid records to Số Khung grid
            tbodySoKhung.querySelectorAll('tr').forEach(tr => {
                if (isRowBlank(tr) || (tr.children.length === 1 && tr.querySelector('td:not([style])'))) {
                    tr.remove();
                }
            });
            const isBPBD = loaiHinhGiaoDich.value === 'bpbd';

            importedValidRecords.forEach(r => {
                const count = tbodySoKhung.querySelectorAll('tr').length + 1;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="text-align: center;"><input type="checkbox" class="chk-row-sk"></td>
                    <td class="stt-sk">${count}</td>
                    <td>
                        <select class="form-control" required>
                            <option value="Ô tô" ${r.loai === 'Ô tô' ? 'selected' : ''}>Ô tô</option>
                            <option value="Mô tô" ${r.loai === 'Mô tô' ? 'selected' : ''}>Mô tô</option>
                        </select>
                    </td>
                    <td><input type="text" class="form-control" value="${r.hieu}" required></td>
                    <td><input type="text" class="form-control" value="${r.khung}" required></td>
                    <td><input type="text" class="form-control" value="${r.may}"></td>
                    <td><input type="text" class="form-control" value="${r.bien}"></td>
                    <td style="text-align: center;" class="${isBPBD ? '' : 'hidden'}"><input type="checkbox" class="chk-yeucau-sk" style="width:18px; height:18px;" ${r.yeucau ? 'checked' : ''}></td>
                    <td class="${isBPBD ? '' : 'hidden'}"><input type="text" class="form-control" value="${r.coquan}"></td>
                    <td><button type="button" class="btn btn-danger btn-xoa-row-sk" style="padding: 4px 8px; font-size:12px;">X</button></td>
                `;
                tbodySoKhung.appendChild(tr);
            });
            resetSKIndices();
        } else {
            // Add valid records to Phương tiện grid
            tbodyTauCa.querySelectorAll('tr').forEach(tr => {
                if (isRowBlank(tr) || (tr.children.length === 1 && tr.querySelector('td:not([style])'))) {
                    tr.remove();
                }
            });
            const isBPBD = loaiHinhGiaoDich.value === 'bpbd';

            importedValidRecords.forEach(r => {
                const count = tbodyTauCa.querySelectorAll('tr').length + 1;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="text-align: center;"><input type="checkbox" class="chk-row-tc"></td>
                    <td class="stt-tc">${count}</td>
                    <td><input type="text" class="form-control" value="${r.hieu}" required></td>
                    <td><input type="text" class="form-control" value="${r.chu}" required></td>
                    <td><input type="text" class="form-control" value="${r.soGCN}"></td>
                    <td><input type="text" class="form-control" value="${r.cap}"></td>
                    <td style="text-align: center;" class="${isBPBD ? '' : 'hidden'}"><input type="checkbox" class="chk-yeucau-tc" style="width:18px; height:18px;" ${r.yeucau ? 'checked' : ''}></td>
                    <td class="${isBPBD ? '' : 'hidden'}"><input type="text" class="form-control" value="${r.coquan}"></td>
                    <td><button type="button" class="btn btn-danger btn-xoa-row-tc" style="padding: 4px 8px; font-size:12px;">X</button></td>
                `;
                tbodyTauCa.appendChild(tr);
            });
            resetTCIndices();
        }

        closeImport();
    });


    // 9. Validation Lifecycle Modals (5 Steps)
    const warningModal = document.getElementById('warningModal');
    const warningModalTitle = document.getElementById('warningModalTitle');
    const warningModalMessage = document.getElementById('warningModalMessage');
    const warningModalHeader = document.getElementById('warningModalHeader');
    const warningModalIcon = document.getElementById('warningModalIcon');
    const c08UploadWrapper = document.getElementById('c08UploadWrapper');
    const c08ProofFile = document.getElementById('c08ProofFile');
    const btnCancelWarning = document.getElementById('btnCancelWarning');
    const btnConfirmWarning = document.getElementById('btnConfirmWarning');
    const btnCloseWarningModal = document.getElementById('btnCloseWarningModal');

    const showWarning = (title, message, isRed = true, showC08Proof = false) => {
        warningModalTitle.innerText = title;
        warningModalMessage.innerText = message;
        
        if (isRed) {
            warningModalHeader.style.backgroundColor = '#fef2f2';
            warningModalHeader.style.borderBottomColor = '#fee2e2';
            warningModalTitle.style.color = '#991b1b';
            warningModalIcon.innerText = '🔴';
            btnConfirmWarning.style.display = 'none';
        } else {
            // Yellow override Warning
            warningModalHeader.style.backgroundColor = '#fffbeb';
            warningModalHeader.style.borderBottomColor = '#fef3c7';
            warningModalTitle.style.color = '#92400e';
            warningModalIcon.innerText = '⚠️';
            btnConfirmWarning.style.display = 'inline-flex';
            btnConfirmWarning.disabled = true; // Required proof upload first
        }

        if (showC08Proof) {
            c08UploadWrapper.classList.remove('hidden');
            c08ProofFile.value = '';
            const lbl = document.getElementById('lblFileNameC08');
            if (lbl) lbl.innerText = 'Chưa chọn tệp';
            const actions = document.getElementById('actionsC08');
            if (actions) actions.style.display = 'none';
        } else {
            c08UploadWrapper.classList.add('hidden');
        }

        warningModal.classList.remove('hidden');
    };

    const closeWarning = () => warningModal.classList.add('hidden');
    btnCancelWarning?.addEventListener('click', closeWarning);
    btnCloseWarningModal?.addEventListener('click', closeWarning);

    // Watch override proof file upload to enable Warning continue
    c08ProofFile?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const actions = document.getElementById('actionsC08');
        const lnk = document.getElementById('lnkXemFileC08');
        const lbl = document.getElementById('lblFileNameC08');
        if (file) {
            const ext = file.name.split('.').pop().toLowerCase();
            if (ext !== 'pdf') {
                alert('Định dạng tệp tin không hợp lệ. Chỉ chấp nhận tệp tin định dạng .pdf.');
                c08ProofFile.value = '';
                if (lbl) lbl.innerText = 'Chưa chọn tệp';
                if (actions) actions.style.display = 'none';
                btnConfirmWarning.disabled = true;
                return;
            }
            if (file.size > 20 * 1024 * 1024) {
                alert('Dung lượng tệp tin vượt quá 20MB. Vui lòng kiểm tra lại.');
                c08ProofFile.value = '';
                if (lbl) lbl.innerText = 'Chưa chọn tệp';
                if (actions) actions.style.display = 'none';
                btnConfirmWarning.disabled = true;
                return;
            }
            if (lbl) lbl.innerText = file.name;
            if (lnk) lnk.href = URL.createObjectURL(file);
            if (actions) actions.style.display = 'flex';
            btnConfirmWarning.disabled = false;
        } else {
            if (lbl) lbl.innerText = 'Chưa chọn tệp';
            if (actions) actions.style.display = 'none';
            btnConfirmWarning.disabled = true;
        }
    });

    document.getElementById('lnkXoaFileC08')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (c08ProofFile) c08ProofFile.value = '';
        const actions = document.getElementById('actionsC08');
        const lbl = document.getElementById('lblFileNameC08');
        if (lbl) lbl.innerText = 'Chưa chọn tệp';
        if (actions) actions.style.display = 'none';
        if (btnConfirmWarning) btnConfirmWarning.disabled = true;
    });

    btnConfirmWarning?.addEventListener('click', () => {
        // Warning override approved, continue
        closeWarning();
        saveAndRedirect();
    });


    // Main validation triggering
    window.luuVaTiepTuc = function() {
        // Clear old errors
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-text').forEach(el => el.remove());

        let formValid = true;
        let firstErr = null;

        const addFormError = (el, text) => {
            formValid = false;
            el.classList.add('is-invalid');
            const span = document.createElement('span');
            span.className = 'error-text';
            span.innerText = text;
            el.parentElement.appendChild(span);
            if (!firstErr) firstErr = el;
        };

        // --- STAGE 1: Mandatory & Basic Format Checks ---
        let isUploadRequired = false;
        if (nguoiYeuCau.value === 'quan_tai_vien' || nguoiYeuCau.value === 'chi_nhanh') {
            isUploadRequired = true;
        } else if (nguoiYeuCau.value === 'ben_bao_dam' && loaiHinhGiaoDich.value === 'bpbd' && ['cam_co', 'dat_coc', 'ky_cuoc', 'ky_quy'].includes(loaiBienPhap.value)) {
            isUploadRequired = true;
        }

        if (!nguoiYeuCau.value) {
            addFormError(nguoiYeuCau, 'Đây là trường bắt buộc');
        } else if (isUploadRequired && !uploadTaiLieu.value) {
            addFormError(uploadTaiLieu, 'Vui lòng đính kèm tệp tin.');
        }

        if (!soHopDong.value.trim()) {
            addFormError(soHopDong, 'Đây là trường bắt buộc');
        }

        if (giaTriKhoanVay && giaTriKhoanVay.value.trim()) {
            const rawVal = parseFloat(giaTriKhoanVay.value.replace(/\./g, '').replace(/,/g, '.'));
            if (isNaN(rawVal) || rawVal <= 0) {
                addFormError(giaTriKhoanVay, 'Chỉ nhập giá trị là số thực >0');
            }
        }

        if (!ngayHieuLuc.value.trim()) {
            addFormError(ngayHieuLuc, 'Đây là trường bắt buộc');
        } else {
            // Validate Date (dd/mm/yyyy) and not future date
            const dateParts = ngayHieuLuc.value.trim().split('/');
            let isDateValid = false;
            let enteredDateObj = null;

            if (dateParts.length === 3) {
                const d = parseInt(dateParts[0], 10);
                const m = parseInt(dateParts[1], 10) - 1;
                const y = parseInt(dateParts[2], 10);
                enteredDateObj = new Date(y, m, d);
                
                if (enteredDateObj.getFullYear() === y && enteredDateObj.getMonth() === m && enteredDateObj.getDate() === d) {
                    isDateValid = true;
                }
            }

            if (!isDateValid) {
                addFormError(ngayHieuLuc, 'Ngày có hiệu lực sai định dạng (dd/mm/yyyy)');
            } else {
                const today = new Date();
                today.setHours(23, 59, 59, 999); // Ignore hours
                if (enteredDateObj > today) {
                    addFormError(ngayHieuLuc, 'Ngày có hiệu lực không được lớn hơn ngày hiện tại');
                }
            }
        }

        // Must have at least 1 Bên thế chấp
        const hasBaoDamOwners = Array.from(tbodyTC.querySelectorAll('tr')).some(tr => tr.dataset.giayTo);
        if (!hasBaoDamOwners) {
            alert('Vui lòng khai báo ít nhất một chủ thể Bên bảo đảm / Bên thế chấp.');
            formValid = false;
        }

        // Must have at least 1 Bên nhận thế chấp
        const hasNhanBaoDamOwners = Array.from(tbodyNTC.querySelectorAll('tr')).some(tr => tr.dataset.ten);
        if (!hasNhanBaoDamOwners) {
            alert('Vui lòng khai báo ít nhất một chủ thể Bên nhận bảo đảm / Bên nhận thế chấp.');
            formValid = false;
        }

        // Must have select at least 1 Loại tài sản
        const checkedAssets = Array.from(document.querySelectorAll('.check-group input[type="checkbox"]:checked'));
        if (checkedAssets.length === 0) {
            alert('Vui lòng tích chọn ít nhất một Loại tài sản.');
            formValid = false;
        }

        // Check required grids if asset types checked
        if (document.getElementById('chkSoKhung').checked) {
            const hasSK = tbodySoKhung.querySelectorAll('tr').length > 0;
            if (!hasSK) {
                alert('Vui lòng nhập danh sách Số khung phương tiện.');
                formValid = false;
            } else {
                // Validate required items on Số khung grid
                tbodySoKhung.querySelectorAll('tr').forEach(tr => {
                    const inputs = tr.querySelectorAll('input[required], select[required]');
                    inputs.forEach(i => {
                        if (!i.value.trim()) {
                            i.classList.add('is-invalid');
                            formValid = false;
                        }
                    });

                    // Check validation on Số khung characters (letters, numbers, hyphens only)
                    const skInput = tr.querySelector('td:nth-child(5) input');
                    if (skInput && skInput.value.trim()) {
                        const val = skInput.value.trim();
                        if (!/^[a-zA-Z0-9-]+$/.test(val)) {
                            skInput.classList.add('is-invalid');
                            alert(`Số khung ${val} chứa ký tự không hợp lệ (Chỉ nhận ký tự chữ, số và dấu -)`);
                            formValid = false;
                        }
                    }

                    // Validate Notice Address if checkbox is checked
                    const cbNotice = tr.querySelector('.chk-yeucau-sk');
                    const addrInput = tr.querySelector('td:nth-child(9) input');
                    if (cbNotice && cbNotice.checked && addrInput && !addrInput.value.trim()) {
                        addrInput.classList.add('is-invalid');
                        alert('Cơ quan tiếp nhận thông báo không được để trống do có yêu cầu thông báo thế chấp.');
                        formValid = false;
                    }
                });
            }
        }

        if (document.getElementById('chkTauCa').checked) {
            const hasPT = tbodyTauCa.querySelectorAll('tr').length > 0;
            if (!hasPT) {
                alert('Vui lòng nhập danh sách Phương tiện.');
                formValid = false;
            } else {
                tbodyTauCa.querySelectorAll('tr').forEach(tr => {
                    const inputs = tr.querySelectorAll('input[required]');
                    inputs.forEach(i => {
                        if (!i.value.trim()) {
                            i.classList.add('is-invalid');
                            formValid = false;
                        }
                    });

                    // Notice checks
                    const cbNotice = tr.querySelector('.chk-yeucau-tc');
                    const addrInput = tr.querySelector('td:nth-child(8) input');
                    if (cbNotice && cbNotice.checked && addrInput && !addrInput.value.trim()) {
                        addrInput.classList.add('is-invalid');
                        alert('Cơ quan tiếp nhận thông báo không được để trống do có yêu cầu thông báo thế chấp.');
                        formValid = false;
                    }
                });
            }
        }

        if (document.getElementById('chkQuyenTaiSan').checked) {
            const ta1 = document.querySelector('#gridQuyenTaiSan textarea:nth-of-type(1)');
            const ta2 = document.querySelector('#gridQuyenTaiSan textarea:nth-of-type(2)');
            if (ta1 && !ta1.value.trim()) addFormError(ta1, 'Đây là trường bắt buộc');
            if (ta2 && !ta2.value.trim()) addFormError(ta2, 'Đây là trường bắt buộc');
        }

        if (document.getElementById('chkHangHoa').checked) {
            const isWarehouse = document.getElementById('radioKhoHang').checked;
            const taVal = document.getElementById('hh_giaTriTenLoai');
            if (taVal && !taVal.value.trim()) addFormError(taVal, 'Đây là trường bắt buộc');

            if (isWarehouse) {
                const taAddr = document.getElementById('hh_diaChiKho');
                if (taAddr && !taAddr.value.trim()) addFormError(taAddr, 'Đây là trường bắt buộc');
            }
        }

        if (document.getElementById('chkChungKhoan').checked) {
            const timeInputs = document.querySelectorAll('#gridChungKhoan tbody input[type="number"]');
            timeInputs.forEach(ti => {
                if (!ti.value.trim()) {
                    ti.classList.add('is-invalid');
                    formValid = false;
                }
            });
        }

        // Mô tả chung check
        const elMoTaChung = document.querySelector('textarea:not([rows="2"]):not([rows="1"])');
        if (elMoTaChung && !elMoTaChung.value.trim()) {
            addFormError(elMoTaChung, 'Đây là trường bắt buộc');
        }

        // PDF file upload check
        if (document.getElementById('chkChungKhoan').checked) {
            if (fileChungKhoan && !fileChungKhoan.value) {
                alert('Vui lòng đính kèm tệp tin hồ sơ PDF.');
                formValid = false;
            }
        }

        if (!formValid) {
            if (firstErr) {
                firstErr.focus();
                firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // --- STAGE 2: Out of Jurisdiction Assets (Out of Ministry jurisdiction) ---
        // (Removed: Out-of-jurisdiction checkboxes are removed from the DOM)

        // --- STAGE 3: Blacklist THA checks ---
        const tcRows = Array.from(tbodyTC.querySelectorAll('tr'));
        const hasBlacklistedCMND = tcRows.some(tr => tr.dataset.giayTo === '111111111111');
        
        let hasBlacklistedFrame = false;
        if (document.getElementById('chkSoKhung').checked) {
            tbodySoKhung.querySelectorAll('tr').forEach(tr => {
                const inputSK = tr.querySelector('td:nth-child(5) input');
                if (inputSK && inputSK.value.trim().toUpperCase() === 'BLACKLIST123') {
                    hasBlacklistedFrame = true;
                }
            });
        }

        if (hasBlacklistedCMND || hasBlacklistedFrame) {
            showWarning('Cảnh báo Kê Biên', 'CẢNH BÁO KÊ BIÊN: Tài sản hoặc Chủ thể đang nằm trong danh sách thi hành án', true, false);
            return;
        }

        // --- STAGE 4: VSDC Securities checks ---
        let hasVSDCCode = false;
        if (document.getElementById('chkSoKhung').checked) {
            tbodySoKhung.querySelectorAll('tr').forEach(tr => {
                const inputBrand = tr.querySelector('td:nth-child(4) input');
                if (inputBrand && inputBrand.value.trim().toUpperCase() === 'VSDC999') {
                    hasVSDCCode = true;
                }
            });
        }
        if (hasVSDCCode) {
            showWarning('Mã chứng khoán đã lưu ký', 'Mã chứng khoán VSDC999 đã được lưu ký tập trung', true, false);
            return;
        }

        // --- STAGE 5: Owner mismatch C08 checks ---
        let hasC08Mismatch = false;
        if (document.getElementById('chkSoKhung').checked) {
            tbodySoKhung.querySelectorAll('tr').forEach(tr => {
                const inputSK = tr.querySelector('td:nth-child(5) input');
                if (inputSK && inputSK.value.trim().toUpperCase() === 'MISMATCH123') {
                    hasC08Mismatch = true;
                }
            });
        }

        if (hasC08Mismatch) {
            showWarning(
                'Cảnh báo C08', 
                'CẢNH BÁO: Phương tiện không thuộc sở hữu của Bên bảo đảm theo dữ liệu đăng ký xe của Cục Cảnh sát giao thông (C08). Vui lòng upload tài liệu chứng minh sở hữu (Hợp đồng mua bán, GCN đăng ký...) dưới dạng tệp PDF để tiếp tục.', 
                false, 
                true
            );
            return;
        }

        // If completely successful, save and redirect
        saveAndRedirect();
    };

    const saveAndRedirect = () => {
        // Collect and save to SessionStorage
        const rowsTC = Array.from(tbodyTC.querySelectorAll('tr'))
            .filter(tr => tr.dataset.ten)
            .map(tr => ({
                loai: tr.children[1].innerText,
                giayTo: tr.dataset.giayTo,
                ten: tr.dataset.ten,
                diaChi: tr.children[4].innerText,
                loaiVal: tr.dataset.loai,
                tinhThanh: tr.dataset.tinhthanh,
                quocGia: tr.dataset.quocgia
            }));

        const rowsNTC = Array.from(tbodyNTC.querySelectorAll('tr'))
            .filter(tr => tr.dataset.ten)
            .map(tr => ({
                ten: tr.dataset.ten,
                diaChi: tr.children[2].innerText,
                tinhThanh: tr.dataset.tinhthanh,
                quocGia: tr.dataset.quocgia
            }));

        const checkedAssetTypes = Array.from(document.querySelectorAll('.check-group input[type="checkbox"]:checked')).map(cb => cb.parentElement.querySelector('.check-label').innerText);

        // Số khung list
        const skList = [];
        if (document.getElementById('chkSoKhung').checked) {
            tbodySoKhung.querySelectorAll('tr').forEach(tr => {
                const sel = tr.querySelector('td:nth-child(3) select');
                const hieu = tr.querySelector('td:nth-child(4) input')?.value;
                const khung = tr.querySelector('td:nth-child(5) input')?.value;
                const may = tr.querySelector('td:nth-child(6) input')?.value;
                const bien = tr.querySelector('td:nth-child(7) input')?.value;
                const yeucau = tr.querySelector('.chk-yeucau-sk')?.checked;
                const coquan = tr.querySelector('td:nth-child(9) input')?.value;
                
                if (khung) {
                    skList.push({
                        loai: sel?.value || 'Ô tô',
                        hieu: hieu || '',
                        khung: khung || '',
                        may: may || '',
                        bien: bien || '',
                        yeucau: yeucau ? 'Có' : 'Không',
                        coquan: coquan || ''
                    });
                }
            });
        }

        // Phương tiện list (Tàu cá)
        const ptList = [];
        if (document.getElementById('chkTauCa').checked) {
            tbodyTauCa.querySelectorAll('tr').forEach(tr => {
                const ten = tr.querySelector('td:nth-child(3) input')?.value;
                const chuSoHuu = tr.querySelector('td:nth-child(4) input')?.value;
                const soDangKy = tr.querySelector('td:nth-child(5) input')?.value;
                const capPhuongTien = tr.querySelector('td:nth-child(6) input')?.value;
                const yeucau = tr.querySelector('.chk-yeucau-tc')?.checked;
                const coquan = tr.querySelector('td:nth-child(8) input')?.value;
                
                if (ten) {
                    ptList.push({
                        ten: ten || '',
                        chuSoHuu: chuSoHuu || '',
                        soDangKy: soDangKy || '',
                        capPhuongTien: capPhuongTien || '',
                        yeucau: yeucau ? 'Có' : 'Không',
                        coquan: coquan || ''
                    });
                }
            });
        }

        // Quyền tài sản
        let qtsInfo = null;
        if (document.getElementById('chkQuyenTaiSan').checked) {
            qtsInfo = {
                tenQuyen: document.getElementById('qts_tenQuyen')?.value || '',
                canCu: document.getElementById('qts_canCu')?.value || ''
            };
        }

        // Hàng hóa
        let hhInfo = null;
        if (document.getElementById('chkHangHoa').checked) {
            const isWarehouse = document.getElementById('radioKhoHang').checked;
            const textVal = document.getElementById('hh_giaTriTenLoai')?.value || '';
            const textAddr = document.getElementById('hh_diaChiKho')?.value || '';
            const textCode = document.getElementById('hh_soHieuKho')?.value || '';
            
            hhInfo = {
                phanLoai: isWarehouse ? 'Kho hàng' : 'Hàng hóa luân chuyển',
                giaTri: textVal,
                diaChi: isWarehouse ? textAddr : '',
                soHieu: isWarehouse ? textCode : ''
            };
        }

        const data = {
            coQuanTiepNhan: coQuanTiepNhan.value,
            nguoiYeuCau: nguoiYeuCau.options[nguoiYeuCau.selectedIndex]?.text || '',
            nguoiYeuCauVal: nguoiYeuCau.value,
            loaiHinhGiaoDich: loaiHinhGiaoDich.options[loaiHinhGiaoDich.selectedIndex]?.text || '',
            loaiHinhGiaoDichVal: loaiHinhGiaoDich.value,
            loaiBienPhap: !loaiBienPhapWrapper.classList.contains('hidden') ? loaiBienPhap.options[loaiBienPhap.selectedIndex]?.text : '',
            loaiBienPhapVal: loaiBienPhap.value,
            loaiHopDong: !loaiHopDongWrapper.classList.contains('hidden') ? loaiHopDong.options[loaiHopDong.selectedIndex]?.text : '',
            loaiHopDongVal: loaiHopDong.value,
            soHopDong: soHopDong.value.trim(),
            ngayHieuLuc: ngayHieuLuc.value.trim(),
            giaTriKhoanVay: giaTriKhoanVay.value.trim(),
            quyMo: quyMo.value ? quyMo.options[quyMo.selectedIndex].text : '',
            quyMoVal: quyMo.value,
            nuChuDoanhNghiep: document.querySelector('.check-item input[type="checkbox"]').checked ? 'Có' : 'Không',
            rowsTC: rowsTC,
            rowsNTC: rowsNTC,
            checkedAssetTypes: checkedAssetTypes,
            moTaChung: document.querySelector('textarea:not([rows="2"]):not([rows="1"])')?.value || '',
            skList: skList,
            ptList: ptList,
            qtsInfo: qtsInfo,
            hhInfo: hhInfo,
            ckInfo: (() => {
                if (document.getElementById('chkChungKhoan').checked) {
                    const inputs = document.querySelectorAll('#gridChungKhoan tbody input[type="number"]');
                    if (inputs.length >= 5) {
                        return {
                            gio: inputs[0].value || '',
                            phut: inputs[1].value || '',
                            ngay: inputs[2].value || '',
                            thang: inputs[3].value || '',
                            nam: inputs[4].value || ''
                        };
                    }
                }
                return null;
            })()
        };

        sessionStorage.setItem('reviewData', JSON.stringify(data));
        window.location.href = 'dang_ky_bpbd_review.html';
    };

    // Connection checks for draft saving
    document.querySelector('.footer-actions button:nth-child(1)')?.addEventListener('click', () => {
        // Simulate connections check
        if (navigator.onLine) {
            alert('Lưu nháp thành công! Dữ liệu của bạn đã được ghi lại tạm thời trên máy chủ.');
        } else {
            alert('Lỗi kết nối máy chủ. Không thể lưu nháp vào lúc này. Vui lòng kiểm tra lại đường truyền mạng.');
        }
    });

    // Restore state from review data if back button clicked
    if (document.referrer && !document.referrer.includes('dang_ky_bpbd_review.html')) {
        sessionStorage.removeItem('reviewData');
    }
    const rawData = sessionStorage.getItem('reviewData');
    if (rawData) {
        try {
            const data = JSON.parse(rawData);
            if (data.coQuanTiepNhan) coQuanTiepNhan.value = data.coQuanTiepNhan;
            if (data.nguoiYeuCauVal) {
                nguoiYeuCau.value = data.nguoiYeuCauVal;
                nguoiYeuCau.dispatchEvent(new Event('change'));
            }
            if (data.loaiHinhGiaoDichVal) {
                loaiHinhGiaoDich.value = data.loaiHinhGiaoDichVal;
                loaiHinhGiaoDich.dispatchEvent(new Event('change'));
            }
            if (data.loaiBienPhapVal) {
                loaiBienPhap.value = data.loaiBienPhapVal;
                loaiBienPhap.dispatchEvent(new Event('change'));
            }
            if (data.loaiHopDongVal) {
                loaiHopDong.value = data.loaiHopDongVal;
                loaiHopDong.dispatchEvent(new Event('change'));
            }
            if (data.soHopDong) soHopDong.value = data.soHopDong;
            if (data.ngayHieuLuc) ngayHieuLuc.value = data.ngayHieuLuc;
            if (data.giaTriKhoanVay) giaTriKhoanVay.value = data.giaTriKhoanVay;
            if (data.quyMoVal) quyMo.value = data.quyMoVal;

            if (data.rowsTC && data.rowsTC.length > 0) {
                tbodyTC.innerHTML = '';
                wrapperTableTC.classList.remove('hidden');
                data.rowsTC.forEach(r => {
                    const tr = document.createElement('tr');
                    tr.dataset.loai = r.loaiVal;
                    tr.dataset.ten = r.ten;
                    tr.dataset.giayTo = r.giayTo;
                    tr.dataset.diachi = r.diaChi.split(' - ')[0] || '';
                    tr.dataset.tinhthanh = r.tinhThanh;
                    tr.dataset.quocgia = r.quocGia;

                    tr.innerHTML = `
                        <td>
                            <button type="button" class="btn btn-outline-primary btn-sua-tc" style="padding: 4px 8px; font-size: 12px;">Sửa</button>
                            <button type="button" class="btn btn-danger btn-xoa-tc" style="padding: 4px 8px; font-size: 12px;">Xóa</button>
                        </td>
                        <td>${r.loai}</td>
                        <td>${r.giayTo}</td>
                        <td>${r.ten}</td>
                        <td>${r.diaChi}</td>
                    `;

                    // wire buttons
                    tr.querySelector('.btn-xoa-tc').addEventListener('click', () => {
                        tr.remove();
                        if (tbodyTC.children.length === 0) tbodyTC.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Chưa có dữ liệu.</td></tr>';
                    });
                    tr.querySelector('.btn-sua-tc').addEventListener('click', () => {
                        editingRowTC = tr;
                        loaiChuTheTC.value = tr.dataset.loai;
                        loaiChuTheTC.dispatchEvent(new Event('change'));
                        setTimeout(() => {
                            const tenInput = document.getElementById('tt_ten');
                            const giaytoInput = document.getElementById('tt_sogiayto');
                            const qgSelect = document.getElementById('tc_quocgia');
                            if (tenInput) tenInput.value = tr.dataset.ten;
                            if (giaytoInput) giaytoInput.value = tr.dataset.giayTo;
                            if (qgSelect) {
                                qgSelect.value = tr.dataset.quocgia;
                                qgSelect.dispatchEvent(new Event('change'));
                                setTimeout(() => {
                                    const ttField = document.getElementById('tc_tinhthanh_select') || document.getElementById('tc_tinhthanh_input');
                                    if (ttField) ttField.value = tr.dataset.tinhthanh;
                                }, 20);
                            }
                            const dcInput = document.getElementById('tc_diachi');
                            if (dcInput) dcInput.value = tr.dataset.diachi;
                        }, 50);
                        btnLuuTC.innerText = 'CẬP NHẬT';
                        subFormBenTheChap.classList.remove('hidden');
                        btnThemTC.classList.add('hidden');
                        btnHuyTC.classList.remove('hidden');
                    });
                    tbodyTC.appendChild(tr);
                });
                subFormBenTheChap.classList.add('hidden');
                btnThemTC.classList.remove('hidden');
            } else {
                subFormBenTheChap.classList.remove('hidden');
                btnThemTC.classList.add('hidden');
                loaiChuTheTC.dispatchEvent(new Event('change'));
            }

            if (data.rowsNTC && data.rowsNTC.length > 0) {
                tbodyNTC.innerHTML = '';
                wrapperTableNTC.classList.remove('hidden');
                data.rowsNTC.forEach(r => {
                    const tr = document.createElement('tr');
                    tr.dataset.ten = r.ten;
                    tr.dataset.diachi = r.diaChi.split(' - ')[0] || '';
                    tr.dataset.tinhthanh = r.tinhThanh;
                    tr.dataset.quocgia = r.quocGia;

                    tr.innerHTML = `
                        <td>
                            <button type="button" class="btn btn-outline-primary btn-sua-ntc" style="padding: 4px 8px; font-size: 12px;">Sửa</button>
                            <button type="button" class="btn btn-danger btn-xoa-ntc" style="padding: 4px 8px; font-size: 12px;">Xóa</button>
                        </td>
                        <td>${r.ten}</td>
                        <td>${r.diaChi}</td>
                        <td>${r.tinhThanh}</td>
                        <td>${r.quocGia}</td>
                    `;

                    tr.querySelector('.btn-xoa-ntc').addEventListener('click', () => {
                        tr.remove();
                        if (tbodyNTC.children.length === 0) tbodyNTC.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Chưa có dữ liệu.</td></tr>';
                        btnLayNguoiDangKy.classList.remove('hidden');
                    });
                    tr.querySelector('.btn-sua-ntc').addEventListener('click', () => {
                        editingRowNTC = tr;
                        document.getElementById('ntc_ten').value = tr.dataset.ten;
                        document.getElementById('ntc_quocgia').value = tr.dataset.quocgia;
                        document.getElementById('ntc_quocgia').dispatchEvent(new Event('change'));
                        setTimeout(() => {
                            const ttField = document.getElementById('ntc_tinhthanh_select') || document.getElementById('ntc_tinhthanh_input');
                            if (ttField) ttField.value = tr.dataset.tinhthanh;
                        }, 20);
                        document.getElementById('ntc_diachi').value = tr.dataset.diachi;
                        btnLuuNTC.innerText = 'CẬP NHẬT';
                        subFormBenNhanTheChap.classList.remove('hidden');
                        btnThemNTC.classList.add('hidden');
                        btnHuyNTC.classList.remove('hidden');
                    });
                    tbodyNTC.appendChild(tr);
                });
                // Hide copy button if items populated
                btnLayNguoiDangKy.classList.add('hidden');
            }

            // Restore assets checkboxes
            if (data.checkedAssetTypes) {
                document.querySelectorAll('.check-group input[type="checkbox"]').forEach(cb => {
                    const labelText = cb.parentElement.querySelector('.check-label').innerText;
                    if (data.checkedAssetTypes.includes(labelText)) {
                        cb.checked = true;
                        cb.dispatchEvent(new Event('change'));
                    }
                });
            }

            // Restore Số khung grid
            if (data.skList && data.skList.length > 0) {
                tbodySoKhung.innerHTML = '';
                const isBPBD = loaiHinhGiaoDich.value === 'bpbd';
                data.skList.forEach(r => {
                    const count = tbodySoKhung.querySelectorAll('tr').length + 1;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td style="text-align: center;"><input type="checkbox" class="chk-row-sk"></td>
                        <td class="stt-sk">${count}</td>
                        <td>
                            <select class="form-control" required>
                                <option value="Ô tô" ${r.loai === 'Ô tô' ? 'selected' : ''}>Ô tô</option>
                                <option value="Mô tô" ${r.loai === 'Mô tô' ? 'selected' : ''}>Mô tô</option>
                            </select>
                        </td>
                        <td><input type="text" class="form-control" value="${r.hieu}" required></td>
                        <td><input type="text" class="form-control" value="${r.khung}" required></td>
                        <td><input type="text" class="form-control" value="${r.may}"></td>
                        <td><input type="text" class="form-control" value="${r.bien}"></td>
                        <td style="text-align: center;" class="${isBPBD ? '' : 'hidden'}"><input type="checkbox" class="chk-yeucau-sk" style="width:18px; height:18px;" ${r.yeucau === 'Có' ? 'checked' : ''}></td>
                        <td class="${isBPBD ? '' : 'hidden'}"><input type="text" class="form-control" value="${r.coquan}"></td>
                        <td><button type="button" class="btn btn-danger btn-xoa-row-sk" style="padding: 4px 8px; font-size:12px;">X</button></td>
                    `;
                    tbodySoKhung.appendChild(tr);
                });
                resetSKIndices();
            }

            // Restore Tàu cá grid
            if (data.ptList && data.ptList.length > 0) {
                tbodyTauCa.innerHTML = '';
                const isBPBD = loaiHinhGiaoDich.value === 'bpbd';
                data.ptList.forEach(r => {
                    const count = tbodyTauCa.querySelectorAll('tr').length + 1;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td style="text-align: center;"><input type="checkbox" class="chk-row-tc"></td>
                        <td class="stt-tc">${count}</td>
                        <td><input type="text" class="form-control" value="${r.ten}" required></td>
                        <td><input type="text" class="form-control" value="${r.chuSoHuu}" required></td>
                        <td><input type="text" class="form-control" value="${r.soDangKy}"></td>
                        <td><input type="text" class="form-control" value="${r.capPhuongTien}"></td>
                        <td style="text-align: center;" class="${isBPBD ? '' : 'hidden'}"><input type="checkbox" class="chk-yeucau-tc" style="width:18px; height:18px;" ${r.yeucau === 'Có' ? 'checked' : ''}></td>
                        <td class="${isBPBD ? '' : 'hidden'}"><input type="text" class="form-control" value="${r.coquan}"></td>
                        <td><button type="button" class="btn btn-danger btn-xoa-row-tc" style="padding: 4px 8px; font-size:12px;">X</button></td>
                    `;
                    tbodyTauCa.appendChild(tr);
                });
                resetTCIndices();
            }

            // Restore Quyền tài sản
            if (data.qtsInfo) {
                const tenQuyenInput = document.getElementById('qts_tenQuyen');
                const canCuInput = document.getElementById('qts_canCu');
                if (tenQuyenInput) tenQuyenInput.value = data.qtsInfo.tenQuyen;
                if (canCuInput) canCuInput.value = data.qtsInfo.canCu;
            }

            const elMoTaChung = document.querySelector('textarea:not([rows="2"]):not([rows="1"])');
            if (data.moTaChung && elMoTaChung) {
                elMoTaChung.value = data.moTaChung;
            }

            if (data.hhInfo) {
                const radio = data.hhInfo.phanLoai === 'Kho hàng' ? radioKhoHang : radioLuanchuyen;
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }
                const taVal = document.getElementById('hh_giaTriTenLoai');
                if (taVal) taVal.value = data.hhInfo.giaTri;
                
                if (data.hhInfo.phanLoai === 'Kho hàng') {
                    const taAddr = document.getElementById('hh_diaChiKho');
                    const taCode = document.getElementById('hh_soHieuKho');
                    if (taAddr) taAddr.value = data.hhInfo.diaChi;
                    if (taCode) taCode.value = data.hhInfo.soHieu;
                }
            }

            if (data.ckInfo) {
                const inputs = document.querySelectorAll('#gridChungKhoan tbody input[type="number"]');
                if (inputs.length >= 5) {
                    inputs[0].value = data.ckInfo.gio;
                    inputs[1].value = data.ckInfo.phut;
                    inputs[2].value = data.ckInfo.ngay;
                    inputs[3].value = data.ckInfo.thang;
                    inputs[4].value = data.ckInfo.nam;
                }
            }

        } catch (e) {
            console.error('Lỗi khôi phục trạng thái form:', e);
        }
    } else {
        // Default startup triggers
        loaiHinhGiaoDich.dispatchEvent(new Event('change'));
        loaiChuTheTC.dispatchEvent(new Event('change'));
    }

    // ==========================================
    // MOCK SUBJECT DATABASE & SEARCH MODAL LOGIC
    // ==========================================
    const mockSubjectDatabase = [
        {
            type: 'cd_vn',
            typeName: 'Công dân Việt Nam',
            doc: '001092012345',
            name: 'Nguyễn Văn Định',
            country: 'Việt Nam',
            province: 'Hà Nội',
            address: 'Tòa nhà FPT, Số 17 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'
        },
        {
            type: 'cd_vn',
            typeName: 'Công dân Việt Nam',
            doc: '001092005678',
            name: 'Trần Văn Quyết',
            country: 'Việt Nam',
            province: 'Hà Nội',
            address: 'Tòa nhà FPT, Số 17 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'
        },
        {
            type: 'cd_vn',
            typeName: 'Công dân Việt Nam',
            doc: '012345678901',
            name: 'Nguyễn Văn A',
            country: 'Việt Nam',
            province: 'Hà Nội',
            address: '123 Đường Láng, Láng Thượng, Đống Đa, Hà Nội'
        },
        {
            type: 'tc_vn',
            typeName: 'Tổ chức có đăng ký kinh doanh trong nước',
            doc: '0109201234',
            name: 'Ngân hàng Thương mại Cổ phần FPT (FPT Bank)',
            country: 'Việt Nam',
            province: 'Hà Nội',
            address: 'Tòa nhà FPT, Số 17 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'
        },
        {
            type: 'tc_vn',
            typeName: 'Tổ chức có đăng ký kinh doanh trong nước',
            doc: '0101234567',
            name: 'Công ty Cổ phần Đầu tư Phát triển Công nghệ',
            country: 'Việt Nam',
            province: 'TP. Hồ Chí Minh',
            address: '789 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh'
        },
        {
            type: 'nn',
            typeName: 'Người nước ngoài',
            doc: 'B1234567',
            name: 'John Doe',
            country: 'Hoa Kỳ',
            province: 'California',
            address: '100 Pine Street, San Francisco, CA'
        },
        {
            type: 'investor_nn',
            typeName: 'Nhà đầu tư nước ngoài',
            doc: '0102030405',
            name: 'Global Investment Fund',
            country: 'Singapore',
            province: 'Singapore',
            address: '10 Collyer Quay, Singapore'
        },
        {
            type: 'tc_khac',
            typeName: 'Tổ chức khác',
            doc: '',
            name: 'Hiệp hội Cà phê Việt Nam',
            country: 'Việt Nam',
            province: 'Hà Nội',
            address: 'Số 6 Nguyễn Công Hoan, Ngọc Khánh, Ba Đình, Hà Nội'
        },
        {
            type: 'tc_khac',
            typeName: 'Tổ chức khác',
            doc: '',
            name: 'Hiệp hội Hồ tiêu Việt Nam',
            country: 'Việt Nam',
            province: 'Hà Nội',
            address: 'Số 12 Huỳnh Thúc Kháng, Láng Hạ, Đống Đa, Hà Nội'
        },
        {
            type: 'no_nation_vn',
            typeName: 'Người không quốc tịch cư trú tại Việt Nam',
            doc: 'TR0987654321',
            name: 'Alexandre Yersin',
            country: 'Việt Nam',
            province: 'Khánh Hòa',
            address: 'Xã Suối Dầu, Huyện Cam Lâm, Khánh Hòa'
        }
    ];

    const searchModal = document.getElementById('searchModal');
    const btnOpenSearch = document.getElementById('btnOpenSearch');
    const btnCloseSearchModal = document.getElementById('btnCloseSearchModal');
    const btnCancelSearch = document.getElementById('btnCancelSearch');
    const searchLoaiChuThe = document.getElementById('searchLoaiChuThe');
    const searchError = document.getElementById('searchError');
    const btnDoSearch = document.getElementById('btnDoSearch');

    const searchFieldsMap = {
        'cd_vn': ['grp_search_cccd'],
        'tc_vn': ['grp_search_mst'],
        'nn': ['grp_search_passport'],
        'ndt_nn': ['grp_search_mst'],
        'tc_khac': ['grp_search_name'],
        'k_qt': ['grp_search_residence']
    };

    if (btnOpenSearch && searchModal) {
        btnOpenSearch.addEventListener('click', () => {
            searchModal.classList.remove('hidden');
            if (searchLoaiChuThe) {
                searchLoaiChuThe.value = 'cd_vn';
                searchLoaiChuThe.dispatchEvent(new Event('change'));
            }
            ['search_cccd', 'search_mst', 'search_passport', 'search_name', 'search_residence'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            if (searchError) searchError.classList.add('hidden');
            const wrapper = document.getElementById('searchResultGridWrapper');
            if (wrapper) wrapper.classList.add('hidden');
        });
    }

    const closeSearchModal = () => {
        if (searchModal) searchModal.classList.add('hidden');
    };

    if (btnCloseSearchModal) btnCloseSearchModal.addEventListener('click', closeSearchModal);
    if (btnCancelSearch) btnCancelSearch.addEventListener('click', closeSearchModal);

    if (searchLoaiChuThe) {
        searchLoaiChuThe.addEventListener('change', (e) => {
            const val = e.target.value;
            ['search_cccd', 'search_mst', 'search_passport', 'search_name', 'search_residence'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
                const grp = document.getElementById('grp_' + id);
                if (grp) grp.classList.add('hidden');
            });

            if (searchError) searchError.classList.add('hidden');
            const wrapper = document.getElementById('searchResultGridWrapper');
            if (wrapper) wrapper.classList.add('hidden');

            const visibleGroupIds = searchFieldsMap[val] || [];
            visibleGroupIds.forEach(grpId => {
                const grp = document.getElementById(grpId);
                if (grp) grp.classList.remove('hidden');
            });
        });
    }

    const fillSubjectData = (subject) => {
        loaiChuTheTC.value = subject.type === 'investor_nn' ? 'ndt_nn' : (subject.type === 'no_nation_vn' ? 'k_qt' : subject.type);
        loaiChuTheTC.dispatchEvent(new Event('change'));

        setTimeout(() => {
            const elTen = document.getElementById('tt_ten');
            const elGiayTo = document.getElementById('tt_sogiayto');
            const elQuocGia = document.getElementById('tc_quocgia');
            const elDiaChi = document.getElementById('tc_diachi');

            if (elTen) elTen.value = subject.name;
            if (elGiayTo) elGiayTo.value = subject.doc || '-';

            // Fill passport issuing country if foreign subject
            const elQuocGiaCap = document.getElementById('tt_quocgiacap');
            if (elQuocGiaCap && (subject.type === 'nn' || subject.type === 'nn_ngoai')) {
                elQuocGiaCap.value = subject.country;
            }

            if (elQuocGia) {
                elQuocGia.value = subject.country || 'Việt Nam';
                elQuocGia.dispatchEvent(new Event('change'));
            }
            if (elDiaChi) elDiaChi.value = subject.address;

            // Fill province/state
            setTimeout(() => {
                const elTinhThanh = document.getElementById('tc_tinhthanh_select') || document.getElementById('tc_tinhthanh_input');
                if (elTinhThanh) elTinhThanh.value = subject.province;
            }, 50);

        }, 50);

        closeSearchModal();
        alert('Đã tải thông tin chủ thể thành công!');
    };

    if (btnDoSearch) {
        btnDoSearch.addEventListener('click', () => {
            const type = searchLoaiChuThe.value;
            if (searchError) searchError.classList.add('hidden');

            const visibleGroupIds = searchFieldsMap[type] || [];
            let queryObj = {};
            let hasInput = false;

            visibleGroupIds.forEach(grpId => {
                const inputId = grpId.replace('grp_', '');
                const inputEl = document.getElementById(inputId);
                if (inputEl) {
                    const val = inputEl.value.trim();
                    if (val) {
                        queryObj[inputId] = val;
                        hasInput = true;
                    }
                }
            });

            if (!hasInput) {
                if (searchError) {
                    searchError.innerText = 'Vui lòng nhập thông tin tìm kiếm.';
                    searchError.classList.remove('hidden');
                }
                const wrapper = document.getElementById('searchResultGridWrapper');
                if (wrapper) wrapper.classList.add('hidden');
                return;
            }

            // Validation for cd_vn (Công dân Việt Nam) CCCD/CMND/CMQD
            if (type === 'cd_vn') {
                const cccdVal = queryObj['search_cccd'] || '';
                if (!/^\d{12}$/.test(cccdVal)) {
                    if (searchError) {
                        searchError.innerText = 'Số CMND/Căn cước công dân/Chứng minh quân đội không hợp lệ (Bắt buộc 12 chữ số).';
                        searchError.classList.remove('hidden');
                    }
                    const wrapper = document.getElementById('searchResultGridWrapper');
                    if (wrapper) wrapper.classList.add('hidden');
                    return;
                }
            }

            const results = mockSubjectDatabase.filter(item => {
                const typeMatch = item.type === type || 
                                  (type === 'ndt_nn' && item.type === 'investor_nn') ||
                                  (type === 'k_qt' && item.type === 'no_nation_vn');
                if (!typeMatch) return false;

                let match = true;
                if (queryObj['search_cccd'] && item.doc !== queryObj['search_cccd']) {
                    match = false;
                }
                if (queryObj['search_mst'] && item.doc !== queryObj['search_mst']) {
                    match = false;
                }
                if (queryObj['search_passport'] && item.doc !== queryObj['search_passport']) {
                    match = false;
                }
                if (queryObj['search_residence'] && item.doc !== queryObj['search_residence']) {
                    match = false;
                }
                if (queryObj['search_name'] && !item.name.toLowerCase().includes(queryObj['search_name'].toLowerCase())) {
                    match = false;
                }
                return match;
            });

            if (results.length === 0) {
                if (searchError) {
                    searchError.innerText = 'Kết quả tìm kiếm không tồn tại.';
                    searchError.classList.remove('hidden');
                }
                const wrapper = document.getElementById('searchResultGridWrapper');
                if (wrapper) wrapper.classList.add('hidden');
            } else {
                // Display search result table/grid for selection (Always show grid when results are found)
                const wrapper = document.getElementById('searchResultGridWrapper');
                if (wrapper) wrapper.classList.remove('hidden');
                const tbody = document.getElementById('tbodySearchResult');
                if (tbody) {
                    tbody.innerHTML = '';
                    const showPassportCountry = (type === 'nn');
                    const thPassport = document.getElementById('searchColPassportCountry');
                    if (thPassport) {
                        thPassport.style.display = showPassportCountry ? 'table-cell' : 'none';
                    }
                    results.forEach((subject, idx) => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td style="text-align: center; padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${idx + 1}</td>
                            <td style="font-weight: 600; padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${subject.name}</td>
                            <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${subject.doc || '-'}</td>
                            <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color); display: ${showPassportCountry ? 'table-cell' : 'none'};">${subject.type === 'nn' ? (subject.country || '-') : '-'}</td>
                            <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${subject.country || '-'}</td>
                            <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${subject.province || '-'}</td>
                            <td style="padding: 10px 12px; border-bottom: 1px solid var(--border-color);">${subject.address || '-'}</td>
                            <td style="text-align: center; padding: 10px 12px; border-bottom: 1px solid var(--border-color);">
                                <button type="button" class="btn btn-primary btn-sm btn-select-subject" style="padding: 4px 10px; font-size: 12px; height: auto;">Chọn</button>
                            </td>
                        `;
                        tr.querySelector('.btn-select-subject').addEventListener('click', () => {
                            fillSubjectData(subject);
                        });
                        tbody.appendChild(tr);
                    });
                }
            }
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
